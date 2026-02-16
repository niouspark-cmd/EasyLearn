
/**
 * GroqService.ts
 * 
 * Uses Groq (Llama 3) to generate dynamic phonetic breakdowns for words built by the user.
 * This allows the app to "read" any word the child constructs, even nonsense words,
 * with proper phonemic segmentation (e.g. "cuh... ah... tuh... cat").
 */

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''; // Use environment variable
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class GroqService {
    
    /**
     * Converts a word into a segmented phonetic string for TTS.
     * Example: "cat" -> "kuh... æ... tuh... cat"
     */
    static async getPhoneticSegment(word: string): Promise<string> {
        if (!word) return "";

        try {
            console.log(`[Groq] Generating phonetics for: "${word}"`);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [
                        {
                            role: "system",
                            content: `You are a phonics engine for children. 
                            Task: Break the user's word into individual phoneme sounds followed by the full word.
                            Format: "sound... sound... sound... word"
                            Rules:
                            1. Use widely understood phonetic spellings (e.g., "kuh" for c, "ah" for a).
                            2. Use ellipses (...) for 0.5s pauses.
                            3. Be brief. ONLY output the string.
                            
                            Example:
                            Input: "cat"
                            Output: "kuh... ah... tuh... cat"
                            
                            Input: "ship"
                            Output: "shih... ip... ship"
                            `
                        },
                        {
                            role: "user",
                            content: word
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 50
                })
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Groq API Error: ${err}`);
            }

            const data = await response.json();
            const result = data.choices[0]?.message?.content || word;
            
            // Clean up any quotes or extra text if the model hallucinated
            const cleanResult = result.replace(/["']/g, '').trim();
            
            console.log(`[Groq] Result: "${cleanResult}"`);
            return cleanResult;

        } catch (e) {
            console.error("[Groq] Generation failed", e);
            // Fallback: Just return the word itself for standard TTS
            return word;
        }
    }

    /**
     * Transcribes audio using Groq Whisper (Speech-to-Text).
     * Used to verify pronunciation.
     */
    static async transcribeAudio(audioBlob: Blob, target?: string): Promise<string> {
        if (!audioBlob) return "";

        try {
            console.log(`[Groq] Transcribing audio blob (${audioBlob.size} bytes)...`);

            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.webm'); 
            // Switch to full large model for better accuracy on short segments/phonemes
            formData.append('model', 'whisper-large-v3'); 
            
            // optimize prompt for phonics
            const contextPrompt = target 
                ? `The user is saying the phonetic sound for "${target}". Phonics context: Sss, Ah, Tuh, Puh. Letter names: A, B, C.`
                : 'Phonetic sounds: Sss, Ah, Tuh, Puh, Ih, Nnn. Letters: S, A, T, P, I, N. One word.';
                
            formData.append('prompt', contextPrompt);
            formData.append('response_format', 'json');

            const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: formData
            });

            if (!response.ok) {
                const err = await response.text();
                console.error(`[Groq] Whisper API Error: ${response.status}`, err);
                throw new Error(`Groq Whisper API Error: ${err}`);
            }

            const data = await response.json();
            let text = data.text || "";
            
            console.log(`[Groq] Raw Transcription: "${text}"`);
            
            // Only trim whitespace, preserve characters that might be relevant
            return text.trim();

        } catch (e) {
            console.error("[Groq] Transcription failed", e);
            throw e; // Rethrow to allow fallback in hybrid logic
        }
    }
}
