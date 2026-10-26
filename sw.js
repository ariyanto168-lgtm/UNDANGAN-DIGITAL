const CACHE_NAME = 'wedding-invitation-v1.2';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './Logoundangandigital.png'
];

// Install Service Worker & Simpan Cache Baru
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Memaksa service worker baru langsung aktif
});

// Aktivasi Service Worker & Hapus Cache Lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Segera ambil alih kontrol halaman
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
