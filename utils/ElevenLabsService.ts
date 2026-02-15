
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { AudioCache } from './AudioCache';
import { STATIC_ASSETS, getPhonemeData, PHONICS_WORDS } from './phoneticMap';
import { LETTER_IMAGES } from './letterImages';
import { PiperService } from './PiperService';

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const VOICE_ID = 'hpp4J3VqNfWAUOO0d1Us'; // Updated to user's preferred voice
const MODEL_ID = 'eleven_flash_v2_5'; // Faster model, adequate for words

// LOCKED voice settings for maximum consistency across all API calls
const VOICE_SETTINGS_LOCKED = {
    stability: 0.95,           // Maximum stability for voice consistency
    similarity_boost: 0.95,    // Maximum similarity to base voice
    style: 0.0,                // Zero style variation
    use_speaker_boost: true
};

// Feature flag: Use Piper offline TTS as primary (recommended for phonics)
const USE_PIPER_PRIMARY = true;

export class ElevenLabsService {
  private static client = new ElevenLabsClient({ apiKey: API_KEY });
  private static currentAudio: HTMLAudioElement | null = null;
  private static audioContext: AudioContext | null = null;

  /**
   * Play text using TTS with Smart Caching.
   * Priority: 
   * 1) Static Assets (phonemes/digraphs)
   * 2) High-Quality Phonics Audio (pre-downloaded words)
   * 3) Piper Offline TTS
   * 4) ElevenLabs API
   */
  static async play(text: string, options?: { onBoundary?: (event: { textOffset: number }) => void, onComplete?: () => void, rate?: number }): Promise<void> {
      
      this.stop();
      const lowerText = text.toLowerCase().trim();

      // 0. CHECK STATIC PHONEMES (s, a, t, etc.)
      if (STATIC_ASSETS.includes(lowerText)) {
          const phonemeData = getPhonemeData(lowerText);
          const filename = phonemeData ? phonemeData.trigger : lowerText;
          
          console.log(`[TTS] Static Asset: "${lowerText}" -> File: "${filename}"`);
          const extension = filename.includes('.') ? '' : '.mp3';
          
          let assetPath = '';
          if (filename.startsWith('/')) {
              assetPath = `${filename}${extension}`;
          } else {
              assetPath = `/assets/audio/phonemes/${filename}${extension}`;
          }
          
          await this.playLocalFile(assetPath, lowerText, options);
          return;
      }

      // 1. CHECK HI-QUALITY PHONICS AUDIO (The "Final Level" words)
      if (PHONICS_WORDS.includes(lowerText)) {
          console.log(`[TTS] High-Quality Phonics Audio match: "${lowerText}"`);
          const assetPath = `/phonics_audio/${lowerText.replace(/ /g, '_')}.mp3`;
          await this.playLocalFile(assetPath, lowerText, options);
          return;
      }

      // 2. TRY PIPER OFFLINE TTS (if enabled)
      // This provides consistent, offline neural TTS for blended words
      if (USE_PIPER_PRIMARY) {
          try {
              console.log(`[TTS] Trying Piper offline TTS for: "${text}"`);
              await PiperService.play(text, { 
                  speed: options?.rate || 0.9, // Slightly slower for phonics
                  onComplete: options?.onComplete 
              });
              console.log(`[TTS] Piper playback complete: "${text}"`);
              return;
          } catch (piperError) {
              console.warn(`[TTS] Piper failed, falling back to ElevenLabs:`, piperError);
              // Continue to API fallback
          }
      }

      // 3. FALLBACK: ElevenLabs API with LOCKED settings
      await this.playFromApi(text, options);
  }

  /**
   * Helper to play a local audio file with fallback
   */
  private static async playLocalFile(assetPath: string, text: string, options?: any): Promise<void> {
    let hasFallbackTriggered = false;
    const triggerFallback = async (e: any) => {
        if (hasFallbackTriggered) return;
        hasFallbackTriggered = true;
        console.warn(`[TTS] Local asset FAILED: "${assetPath}"`, e);
        await this.fallbackPlay(text, options);
    };

    try {
        // 1. Try Cache First
        const encodedPath = encodeURI(assetPath);
        let audioUrl = encodedPath;
        const cachedBlob = await AudioCache.getCachedAudio(encodedPath);
        
        if (cachedBlob) {
            console.log(`[TTS] Playing from local cache: ${encodedPath}`);
            audioUrl = URL.createObjectURL(cachedBlob);
        } else {
            // 2. Not in cache? Fetch and save in background
            fetch(encodedPath).then(async res => {
                if (res.ok) {
                    const blob = await res.blob();
                    await AudioCache.saveLocalAudio(encodedPath, blob);
                }
            }).catch(() => {});
        }

        const audio = new Audio(audioUrl);
        this.currentAudio = audio;
        
        if (options?.rate) audio.playbackRate = options.rate;
        
        audio.onended = () => {
            if (audioUrl.startsWith('blob:')) URL.revokeObjectURL(audioUrl);
            console.log(`[TTS] Local Playback Ended: "${text}"`);
            options?.onComplete?.();
            this.currentAudio = null;
        };
        
        audio.onerror = async (e) => {
            if (audioUrl.startsWith('blob:')) URL.revokeObjectURL(audioUrl);
            await triggerFallback(e);
        };

        await audio.play();
    } catch (e) {
        console.error(`[TTS] Local playback EXCEPTION: "${assetPath}"`, e);
        await triggerFallback(e);
    }
  }

  /**
   * Mass pre-warm of all phonics assets for offline use
   */
  static async preWarmStaticAssets() {
      const urls: string[] = [];
      
      // 1. Word assets
      PHONICS_WORDS.forEach(word => {
          urls.push(`/phonics_audio/${word.toLowerCase().replace(/ /g, '_')}.mp3`);
      });

      // 2. Phoneme assets
      STATIC_ASSETS.forEach(key => {
          const data = getPhonemeData(key);
          if (data) {
              const filename = data.trigger;
              const extension = filename.includes('.') ? '' : '.mp3';
              // Use encodeURI to handle spaces and special characters in paths
              const fullUrl = encodeURI(`/assets/audio/phonemes/${filename}${extension}`);
              urls.push(fullUrl);
          }
      });

      // 3. Word images (PNGs)
      PHONICS_WORDS.forEach(word => {
          urls.push(`/assets/images/words/${word.toLowerCase()}.png`);
      });

      // 4. Curriculum sorted audio
      const baseCurr = '/assets/audio/curriculum_sorted/';
      const levels = [
          'Level 1 - Golden Letters (SATPIN)',
          'Level 2 - The Alphabet (CVC)',
          'Level 3 - Digraphs',
          'Level 4 - Vowel Teams',
          'Level 5 - Other Sounds'
      ];
      
      // 5. External letter images (Fallbacks)
      Object.values(LETTER_IMAGES).forEach(item => {
          if (item.imageUrl.startsWith('http')) {
              urls.push(item.imageUrl);
          }
      });

      console.log(`[TTS] Starting background pre-warm of ${urls.length} assets...`);
      await AudioCache.preWarmLocal(urls);
  }

  /**
   * Fallback play when static assets fail
   */
  private static async fallbackPlay(text: string, options?: { onBoundary?: (event: { textOffset: number }) => void, onComplete?: () => void, rate?: number }): Promise<void> {
      if (USE_PIPER_PRIMARY) {
          try {
              await PiperService.play(text, { 
                  speed: options?.rate || 0.9,
                  onComplete: options?.onComplete 
              });
              return;
          } catch {
              // Fall through to API
          }
      }
      await this.playFromApi(text, options);
  }

  private static async playFromApi(text: string, options?: { onBoundary?: (event: { textOffset: number }) => void, onComplete?: () => void, rate?: number }) {
      if (!API_KEY) {
           console.warn("ElevenLabs Key missing. Falling back.");
           this.fallbackSpeak(text, options);
           return;
      }

      try {
          // 1. Check Cache
          let blob = await AudioCache.getAudio(text, VOICE_ID);

          if (!blob) {
             // 2. Fetch if miss
             console.log(`[ElevenLabs] Cache miss. Fetching from API with LOCKED voice settings...`);
             
             const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;
             
             const optionsFetch = {
                 method: 'POST',
                 headers: {
                     'xi-api-key': API_KEY,
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     text: text,
                     model_id: MODEL_ID,
                     voice_settings: VOICE_SETTINGS_LOCKED  // Use locked settings
                 })
             };

             const response = await fetch(url, optionsFetch);

             if (!response.ok) {
                 const errText = await response.text();
                 throw new Error(`ElevenLabs API Error: ${response.status} ${errText}`);
             }

             // Get Blob
             blob = await response.blob();
              
              // 3. Save to Cache
              await AudioCache.saveAudio(text, VOICE_ID, blob);
          } else {
              console.log(`[ElevenLabs] Playing from Cache: "${text}"`);
          }

          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          this.currentAudio = audio;
          
          // Apply Rate (Client-side)
          if (options?.rate) {
              audio.playbackRate = options.rate;
          }

          // Simulate Word Boundaries
          if (options?.onBoundary) {
              audio.ontimeupdate = () => {
                  const duration = audio.duration;
                  if (duration > 0) {
                      const limit = text.length;
                      const progress = audio.currentTime / duration;
                      const offset = Math.floor(progress * limit);
                      options.onBoundary?.({ textOffset: offset });
                  }
              };
          }

          audio.onended = () => {
              options?.onComplete?.();
              this.currentAudio = null;
          };
          
          await audio.play();

      } catch (e) {
          console.error("ElevenLabs TTS Failed:", e);
          this.fallbackSpeak(text, options);
      }
  }

  /**
   * Fetches audio blob directly (for pre-warming).
   * Now uses LOCKED voice settings for consistency.
   */
  static async fetchAudioBlob(text: string): Promise<Blob | null> {
      if (!API_KEY) return null;
      try {
             const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;
             
             const response = await fetch(url, {
                 method: 'POST',
                 headers: {
                     'xi-api-key': API_KEY,
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     text: text,
                     model_id: MODEL_ID,
                     voice_settings: VOICE_SETTINGS_LOCKED  // Use locked settings
                 })
             });

             if (!response.ok) {
                 console.error(`[ElevenLabs] Fetch Error: ${response.status}`);
                 return null;
             }

             return await response.blob();
      } catch (e) {
          console.error("[ElevenLabs] Fetch failed", e);
          return null;
      }
  }

  static stop() {
      if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio = null;
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  private static fallbackSpeak(text: string, options?: { onBoundary?: (event: any) => void, onComplete?: () => void }) {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      
      const u = new SpeechSynthesisUtterance(text);
      
      // Try to find a consistent female voice for fallback
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        (v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Microsoft Zira')) && 
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) u.voice = preferredVoice;
      
      u.rate = 0.85;
      u.pitch = 1.1; // Slightly higher/playful for kids
      
      if (options?.onComplete) u.onend = options.onComplete;
      window.speechSynthesis.speak(u);
  }

  /**
   * Transcribe audio (ASR)
   * Uses browser native Web Speech API since ElevenLabs is TTS-focused.
   */
  static async transcribeFromMic(onRecognized: (text: string) => void): Promise<any> {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
          alert("Browser does not support Speech Recognition.");
          return null;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
          const last = event.results.length - 1;
          const text = event.results[last][0].transcript;
          console.log("Recognized:", text);
          onRecognized(text);
      };

      recognition.start();
      return recognition;
  }

  static async transcribe(audioBlob: Blob): Promise<string> {
      console.warn("File transcription not supported by ElevenLabs/Browser directly.");
      return "Transcription unavailable (Browser-only mode)";
  }
}
