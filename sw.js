const CACHE_NAME = 'wedding-invitation-v1.1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './Logoundangandigital.png'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache
        }
        return fetch(event.request); // Ambil dari jaringan
      })
  );
});
