const cacheName = "games";

self.addEventListener("install", (e) => {
  console.log("[Service Worker]", "installed", e);
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker]", "activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("[Service Worker]", "clear old cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function fetchListener(e) {
  var request = e.request;
  if (request.url.indexOf("media.rawg.io") > -1) {
    e.respondWith(
      caches.match(request).then(function (response) {
        if (response) {
          console.log('loaded image from cache');
          return response;
        }
        return fetch(request)
          .then((res) => {
            const clone = res.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(request, clone);
            });
            return res;
          })
          .catch((err) => caches.match(request).then((res) => res));
      })
    );
  }
});
