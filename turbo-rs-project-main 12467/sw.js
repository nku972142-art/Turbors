// Cache version for the app shell
// Update when index.html or icons change
var CACHE_NAME = 'turbors-shell-v3';
var SHELL = ['/', '/index.html', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // Stale-while-revalidate for images
  if (url.pathname.indexOf('/images/') === 0) {
    e.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(e.request).then(function (cached) {
          var fetchPromise = fetch(e.request).then(function (res) {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(function () { return cached; });
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Network-first with cache fallback for HTML shell
  if (url.pathname === '/' || url.pathname.indexOf('/index.html') !== -1) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return caches.match(e.request); })
    );
  }
});
