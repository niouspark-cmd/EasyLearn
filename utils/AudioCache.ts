export class AudioCache {
  private static CACHE_NAME = 'adesua-audio-cache-v6';

  /**
   * getAudio
   * For API calls (ElevenLabs)
   */
  static async getAudio(text: string, voiceId: string): Promise<Blob | null> {
    const key = this.generateKey(text, voiceId);
    return this.getFromCache(key);
  }

  /**
   * getCachedAudio
   * For local asset URLs
   */
  static async getCachedAudio(url: string): Promise<Blob | null> {
      return this.getFromCache(url);
  }

  private static async getFromCache(key: string): Promise<Blob | null> {
    try {
      if (!('caches' in window)) return null;
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(key);
      if (response) return await response.blob();
      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * saveAudio
   * For API calls (ElevenLabs)
   */
  static async saveAudio(text: string, voiceId: string, audioBlob: Blob): Promise<void> {
    const key = this.generateKey(text, voiceId);
    await this.putInCache(key, audioBlob);
  }

  /**
   * saveLocalAudio
   * For local asset URLs
   */
  static async saveLocalAudio(url: string, audioBlob: Blob): Promise<void> {
      await this.putInCache(url, audioBlob);
  }

  private static async putInCache(key: string, audioBlob: Blob): Promise<void> {
    try {
      if (!('caches' in window)) return;
      const cache = await caches.open(this.CACHE_NAME);
      const response = new Response(audioBlob, {
        headers: { 'Content-Type': 'audio/mpeg' }
      });
      await cache.put(key, response);
    } catch (e) {
      console.error('[AudioCache] Save failed', e);
    }
  }

  /**
   * Pre-warm cache with a list of texts (API)
   */
  static async preWarm(texts: string[], voiceId: string, voiceFetcher: (text: string) => Promise<Blob | null>) {
    console.log(`[AudioCache] Pre-warming ${texts.length} items...`);
    for (const text of texts) {
        const exists = await this.getAudio(text, voiceId);
        if (!exists) {
            const blob = await voiceFetcher(text);
            if (blob) await this.saveAudio(text, voiceId, blob);
        }
    }
  }

  /**
   * Pre-warm local assets (Background caching)
   */
  static async preWarmLocal(urls: string[]) {
      console.log(`[AudioCache] Background caching ${urls.length} local assets...`);
      const cache = await caches.open(this.CACHE_NAME);
      
      // Batch download to avoid overloading network
      const batchSize = 5;
      for (let i = 0; i < urls.length; i += batchSize) {
          const batch = urls.slice(i, i + batchSize);
          await Promise.all(batch.map(async (url) => {
              try {
                  const exists = await cache.match(url);
                  if (!exists) {
                      const response = await fetch(url);
                      if (response.ok) {
                          await cache.put(url, response);
                      }
                  }
              } catch (e) {
                  // Silent fail for background caching
              }
          }));
      }
      console.log(`[AudioCache] Local assets cached.`);
  }

  static async clear() {
      if ('caches' in window) {
          await caches.delete(this.CACHE_NAME);
      }
  }

  private static generateKey(text: string, voiceId: string): string {
    return `https://cache.local/audio/${voiceId}/${encodeURIComponent(text.toLowerCase())}`;
  }
}
