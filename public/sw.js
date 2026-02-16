const CACHE_NAME = 'adesua-offline-v8'; // FORCE UPDATE

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
             console.log('[SW] Deleting old cache:', cache);
             return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache static assets, images, and audio
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return from cache
      }

      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses for our assets
        if (
          networkResponse && 
          networkResponse.status === 200 && 
          (
            // Internal App Assets
            url.pathname.includes('/assets/') || 
            url.pathname.includes('/phonics_audio/') ||
            url.pathname.endsWith('.js') ||
            url.pathname.endsWith('.css') ||
            // Files
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.mp3') ||
            url.pathname.endsWith('.wav') ||
            // External Image Services (Pexels, Unsplash, etc.)
            url.hostname.includes('pexels.com') ||
            url.hostname.includes('unsplash.com') ||
            networkResponse.headers.get('content-type')?.includes('image/')
          )
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If offline and not in cache, fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});
