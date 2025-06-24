const CACHE_NAME = 'ai-agent-v1';
const urlsToCache = [
  'agent_app_pwa.html',
  'manifest.json',
  'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js',
  'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch content from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});