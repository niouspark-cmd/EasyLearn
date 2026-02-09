
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { AudioCache } from './AudioCache';
import { STATIC_ASSETS, getPhonemeData } from './phoneticMap';

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const VOICE_ID = 'hpp4J3VqNfWAUOO0d1Us'; // Updated to user's preferred voice
const MODEL_ID = 'eleven_flash_v2_5'; // Faster model, adequate for words

export class ElevenLabsService {
  private static client = new ElevenLabsClient({ apiKey: API_KEY });
  private static currentAudio: HTMLAudioElement | null = null;
  private static audioContext: AudioContext | null = null;

  /**
   * Play text using ElevenLabs TTS with Smart Caching.
   * NOW HYBRID: Checks for static local assets first.
   */
  static async play(text: string, options?: { onBoundary?: (event: { textOffset: number }) => void, onComplete?: () => void, rate?: number }): Promise<void> {
      
      this.stop();
      const lowerText = text.toLowerCase();

      // 0. CHECK STATIC ASSETS (The "Gold Standard" List)
      // If the requested text matches a known static phoneme (e.g. "a", "sh", "ch"), play the local file.
      // This bypasses API latency and cost, and guarantees correct pronunciation.
      if (STATIC_ASSETS.includes(lowerText)) {
          const phonemeData = getPhonemeData(lowerText);
          const filename = phonemeData ? phonemeData.trigger : lowerText;
          
          console.log(`[ElevenLabs] Attempting Static Asset: "${lowerText}" -> File: "${filename}"`);
          // Check if filename already includes an extension, otherwise default to .mp3
          const extension = filename.includes('.') ? '' : '.mp3';
          const assetPath = `/assets/audio/phonemes/${filename}${extension}`;
          
          try {
            const audio = new Audio(assetPath);
            this.currentAudio = audio;
            
            if (options?.rate) audio.playbackRate = options.rate;
            
            audio.onended = () => {
                console.log(`[ElevenLabs] Static Playback Ended: "${lowerText}"`);
                options?.onComplete?.();
                this.currentAudio = null;
            };
            
            audio.onerror = (e) => {
                console.warn(`[ElevenLabs] Static asset FAILED using path: "${assetPath}"`, e);
                // Fallback to API logic if file missing (though it shouldn't be)
                this.playFromApi(text, options);
            };

            console.log(`[ElevenLabs] Calling audio.play() for: "${assetPath}"`);
            await audio.play();
            console.log(`[ElevenLabs] audio.play() Promise resolved for: "${assetPath}"`);
            return;
          } catch (e) {
            console.error(`[ElevenLabs] Static playback EXCEPTION for "${assetPath}"`, e);
            // Fallback
          }
      } else {
        console.log(`[ElevenLabs] "${lowerText}" NOT in static assets list.`);
      }

      // If not static, or static failed, use API
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
             console.log(`[ElevenLabs] Cache miss. Fetching from API...`);
             
             // Use direct fetch to avoid SDK potentially escaping SSML
             // URL for stream (or regular)
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
                     voice_settings: {
                         stability: 0.4,
                         similarity_boost: 0.75,
                         style: 0.0,
                         use_speaker_boost: true
                     }
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
                     voice_settings: {
                         stability: 0.4,
                         similarity_boost: 0.75,
                         style: 0.0,
                         use_speaker_boost: true
                     }
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
      u.rate = 0.85;
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
