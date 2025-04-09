const CACHE_NAME = "contatos-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/pages/home.html",
  "/pages/login.html",
  "/pages/sign.html",
  "/manifest.json",
  "/tailwind.config.js",
  "/package-lock.json",
  "/package.json",
  "/public/img/android/android-launchericon-192-192.png",
  "/public/img/android/android-launchericon-512-512.png",
  "/public/css/app.css",
  "/public/css/output.css",
  "/components/NoteCard.js",
  "/public/js/helpers/functions.js",
  "/public/js/validators/login.js",
  "/public/js/validators/signIn.js",
  "/public/js/index.js",
  "/service-worker.js",
  "/public/js/",
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Intercepta requisições e retorna do cache se possível
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o Service Worker e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});
