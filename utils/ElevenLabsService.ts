
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { AudioCache } from './AudioCache';
import { STATIC_ASSETS, getPhonemeData, PHONICS_WORDS } from './phoneticMap';
import { LETTER_IMAGES } from './letterImages';
import { PiperService } from './PiperService';

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const VOICE_ID = 'hpp4J3VqNfWAUOO0d1Us';
const MODEL_ID = 'eleven_flash_v2_5';
const USE_PIPER_PRIMARY = true; // Still use Piper for fallback if needed

// LOCKED voice settings for maximum consistency across all API calls
const VOICE_SETTINGS_LOCKED = {
    stability: 0.95,           // Maximum stability for voice consistency
    similarity_boost: 0.95,    // Maximum similarity to base voice
    style: 0.0,                // Zero style variation
    use_speaker_boost: true
};

export class ElevenLabsService {
  private static client: ElevenLabsClient | null = null;
  private static currentAudio: HTMLAudioElement | null = null;

  static stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    // Stop offline Piper
    PiperService.stop();
    // Stop native browser speech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
  }

  /**
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
          const assetPath = `/phonics_audio/${lowerText.replace(/ /g, '_')}.mp3?v=10`;
          await this.playLocalFile(assetPath, lowerText, options);
          return;
      }

      // 2. TRY PIPER OFFLINE TTS (if enabled)
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
        // Stop any previous local playback before starting new one
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

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
            if (this.currentAudio === audio) this.currentAudio = null;
        };
        
        audio.onerror = async (e) => {
            if (audioUrl.startsWith('blob:')) URL.revokeObjectURL(audioUrl);
            // Only trigger fallback if this is still the active audio
            if (this.currentAudio === audio) {
                await triggerFallback(e);
            }
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
              let fullUrl = '';
              if (filename.startsWith('/')) {
                   fullUrl = encodeURI(`${filename}${extension}`);
              } else {
                   fullUrl = encodeURI(`/assets/audio/phonemes/${filename}${extension}`);
              }
              urls.push(fullUrl);
          }
      });

      // 3. Word images (PNGs)
      PHONICS_WORDS.forEach(word => {
          urls.push(`/assets/images/words/${word.toLowerCase()}.png`);
      });

      // 4. Curriculum sorted audio (optional, mostly covered by phonemes)
      // Skipped for now as most are mapped in phoneticMap

      // 5. Letter images (Curriculum & Failbacks)
      Object.values(LETTER_IMAGES).forEach(item => {
          if (item.imageUrl) {
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

          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          this.currentAudio = audio;

          if (options?.rate) audio.playbackRate = options.rate;

          audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
              options?.onComplete?.();
              this.currentAudio = null;
          };

          audio.onerror = (e) => {
              console.error("[ElevenLabs] Playback error", e);
              this.fallbackSpeak(text, options);
          };

          await audio.play();

      } catch (error) {
          console.error("[ElevenLabs] Error:", error);
          this.fallbackSpeak(text, options);
      }
  }

  private static fallbackSpeak(text: string, options?: { onComplete?: () => void }) {
      console.warn("[TTS] Using Browser SpeechSynthesis Fallback");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => {
          options?.onComplete?.();
          this.currentAudio = null;
      };
      window.speechSynthesis.speak(utterance);
  }
}
