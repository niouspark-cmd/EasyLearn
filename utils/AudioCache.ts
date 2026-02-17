export class AudioCache {
  private static CACHE_NAME = 'adesua-offline-v9'; // FORCE UPDATE

  /**
   * Generates a cache key for text-to-speech audio
   */
  private static getKey(text: string, voiceId: string): string {
    return `tts-${voiceId}-${text.toLowerCase().trim()}`;
  }

  /**
   * Retrieves audio blob from cache if it exists
   */
  static async getAudio(text: string, voiceId: string): Promise<Blob | null> {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(this.getKey(text, voiceId));
      if (response) {
        return await response.blob();
      }
    } catch (e) {
      console.warn('AudioCache read error:', e);
    }
    return null;
  }

  /**
   * Saves audio blob to cache
   */
  static async saveAudio(text: string, voiceId: string, blob: Blob): Promise<void> {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = new Response(blob, {
        headers: { 'Content-Type': 'audio/mpeg' }
      });
      await cache.put(this.getKey(text, voiceId), response);
    } catch (e) {
      console.warn('AudioCache write error:', e);
    }
  }

  /**
   * Retrieves generic cached audio by URL
   */
  static async getCachedAudio(url: string): Promise<Blob | null> {
      try {
          const cache = await caches.open(this.CACHE_NAME);
          const response = await cache.match(url);
          if (response) {
              return await response.blob();
          }
      } catch (e) {
          console.warn('AudioCache (URL) read error:', e);
      }
      return null;
  }

  /**
   * Saves generic audio by URL
   */
  static async saveLocalAudio(url: string, blob: Blob): Promise<void> {
      try {
          const cache = await caches.open(this.CACHE_NAME);
          const response = new Response(blob, {
            headers: { 'Content-Type': 'audio/mpeg' }
          });
          await cache.put(url, response);
      } catch (e) {
          console.warn('AudioCache (URL) write error:', e);
      }
  }
  
  /**
   * Pre-warms a list of URLs by fetching them and saving to cache
   * Does this silently in the background
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
}
