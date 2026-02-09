/**
 * PiperService.ts - Offline Text-to-Speech using Piper TTS
 * 
 * Piper is a fast, local neural TTS that runs entirely in the browser via WebAssembly.
 * Perfect for phonics applications - works offline, consistent voice, no API calls.
 * 
 * Model size: ~30-50MB per voice
 * Supports: English (US/UK), Spanish, French, Italian, Portuguese, Hindi, Japanese, Mandarin
 */

import { predict, TtsSession, stored, download, type VoiceId, type ProgressCallback } from '@mintplex-labs/piper-tts-web';

// Recommended voice for phonics (clear, child-friendly American English)
const DEFAULT_VOICE: VoiceId = 'en_US-lessac-medium';

// Voice options - all work offline once downloaded
export const PIPER_VOICES: Record<VoiceId, { name: string; lang: string; gender: string; size: string }> = {
  // American English - Best for phonics
  'en_US-lessac-medium': { name: 'Lessac (US)', lang: 'en-US', gender: 'female', size: '46MB' },
  'en_US-ryan-medium': { name: 'Ryan (US)', lang: 'en-US', gender: 'male', size: '58MB' },
  'en_US-amy-medium': { name: 'Amy (US)', lang: 'en-US', gender: 'female', size: '46MB' },
  
  // British English
  'en_GB-alan-medium': { name: 'Alan (UK)', lang: 'en-GB', gender: 'male', size: '55MB' },
  'en_GB-southern_english_female-medium': { name: 'Southern (UK)', lang: 'en-GB', gender: 'female', size: '46MB' },
};

export class PiperService {
  private static currentVoice: VoiceId = DEFAULT_VOICE;
  private static isModelLoaded: boolean = false;
  private static isLoading: boolean = false;
  private static currentAudio: HTMLAudioElement | null = null;
  private static ttsSession: TtsSession | null = null;

  /**
   * Initialize Piper TTS and download/load the voice model
   * This only needs to be called once, then works offline
   */
  static async initialize(voiceId: VoiceId = DEFAULT_VOICE): Promise<void> {
    if (this.isLoading) {
      console.log('[Piper] Already loading model...');
      return;
    }

    if (this.isModelLoaded && this.currentVoice === voiceId) {
      console.log('[Piper] Model already loaded');
      return;
    }

    this.isLoading = true;
    console.log(`[Piper] Loading voice model: ${voiceId}...`);

    try {
      // Check if voice is already stored locally
      const storedVoices = await stored();
      
      if (!storedVoices.includes(voiceId)) {
        console.log(`[Piper] Downloading voice model (${PIPER_VOICES[voiceId]?.size || 'unknown'})...`);
        // Download and store the voice model
        const progressCallback: ProgressCallback = (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          console.log(`[Piper] Download progress: ${percent}%`);
        };
        await download(voiceId, progressCallback);
      }

      // Create TTS session
      this.ttsSession = await TtsSession.create({
        voiceId: voiceId,
        progress: (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          console.log(`[Piper] Loading model: ${percent}%`);
        }
      });

      this.currentVoice = voiceId;
      this.isModelLoaded = true;
      console.log('[Piper] Voice model ready!');

    } catch (error) {
      console.error('[Piper] Failed to initialize:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Play text using Piper TTS
   * Works completely offline after initialization
   */
  static async play(text: string, options?: { 
    voiceId?: VoiceId;
    speed?: number;
    onComplete?: () => void;
  }): Promise<void> {
    
    this.stop();

    const voiceId = options?.voiceId || this.currentVoice;

    // Initialize if needed
    if (!this.isModelLoaded || this.currentVoice !== voiceId) {
      await this.initialize(voiceId);
    }

    try {
      console.log(`[Piper] Synthesizing: "${text}"`);
      
      let blob: Blob;
      
      // Use existing session or create new prediction
      if (this.ttsSession && this.ttsSession.ready) {
        blob = await this.ttsSession.predict(text);
      } else {
        // Fallback to predict function
        blob = await predict({ text, voiceId: voiceId });
      }
      
      // Convert to blob URL and play
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      this.currentAudio = audio;

      // Apply speed if specified
      if (options?.speed) {
        audio.playbackRate = options.speed;
      }

      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          this.currentAudio = null;
          options?.onComplete?.();
          resolve();
        };

        audio.onerror = (e) => {
          URL.revokeObjectURL(url);
          this.currentAudio = null;
          reject(e);
        };

        audio.play().catch(reject);
      });

    } catch (error) {
      console.error('[Piper] Synthesis failed:', error);
      throw error;
    }
  }

  /**
   * Stop current playback
   */
  static stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  /**
   * Check if a voice is already stored locally (available offline)
   */
  static async isVoiceAvailableOffline(voiceId: VoiceId): Promise<boolean> {
    try {
      const storedVoices = await stored();
      return storedVoices.includes(voiceId);
    } catch {
      return false;
    }
  }

  /**
   * Get list of available offline voices
   */
  static async getStoredVoices(): Promise<VoiceId[]> {
    try {
      return await stored();
    } catch {
      return [];
    }
  }

  /**
   * Preload multiple voices for offline use
   */
  static async preloadVoices(voiceIds: VoiceId[]): Promise<void> {
    for (const voiceId of voiceIds) {
      await this.initialize(voiceId);
    }
  }

  /**
   * Check if Piper is ready to use
   */
  static get isReady(): boolean {
    return this.isModelLoaded;
  }

  /**
   * Get current voice ID
   */
  static get currentVoiceId(): VoiceId {
    return this.currentVoice;
  }
}
