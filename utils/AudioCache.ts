export class AudioCache {
  private static CACHE_NAME = 'adesua-audio-cache-v5';

  /**
   * getAudio
   * Checks if audio for the given text exists in the cache.
   * Returns the Blob if found, null otherwise.
   */
  static async getAudio(text: string, voiceId: string): Promise<Blob | null> {
    try {
      if (!('caches' in window)) return null;
      
      const cache = await caches.open(this.CACHE_NAME);
      const key = this.generateKey(text, voiceId);
      const response = await cache.match(key);
      
      if (response) {
        console.log(`[AudioCache] Hit for "${text}"`);
        return await response.blob();
      }
      return null;
    } catch (e) {
      console.error('[AudioCache] Get failed', e);
      return null;
    }
  }

  /**
   * saveAudio
   * Saves the audio blob to the cache.
   */
  static async saveAudio(text: string, voiceId: string, audioBlob: Blob): Promise<void> {
    try {
      if (!('caches' in window)) return;

      const cache = await caches.open(this.CACHE_NAME);
      const key = this.generateKey(text, voiceId);
      
      // Create a fake response to store
      const response = new Response(audioBlob, {
        headers: { 'Content-Type': 'audio/mpeg' }
      });
      
      await cache.put(key, response);
      console.log(`[AudioCache] Saved "${text}"`);
    } catch (e) {
      console.error('[AudioCache] Save failed', e);
    }
  }

  /**
   * Pre-warm cache with a list of texts
   */
  static async preWarm(texts: string[], voiceId: string, voiceFetcher: (text: string) => Promise<Blob | null>) {
    console.log(`[AudioCache] Pre-warming ${texts.length} items for voice ${voiceId}...`);
    let count = 0;
    for (const text of texts) {
        // Check if exists first
        const exists = await this.getAudio(text, voiceId);
        if (!exists) {
            try {
                const blob = await voiceFetcher(text);
                if (blob) {
                    await this.saveAudio(text, voiceId, blob);
                    count++;
                }
            } catch (e) {
                console.warn(`[AudioCache] Failed to warm "${text}"`, e);
            }
        }
    }
    console.log(`[AudioCache] Pre-warming complete. Added ${count} new items.`);
  }

  static async clear() {
      if ('caches' in window) {
          await caches.delete(this.CACHE_NAME);
          console.log('[AudioCache] Cleared.');
      }
  }

  private static generateKey(text: string, voiceId: string): string {
    // Sanitize text for URL
    const safeText = encodeURIComponent(text.toLowerCase());
    return `https://cache.local/audio/${voiceId}/${safeText}`;
  }
}
