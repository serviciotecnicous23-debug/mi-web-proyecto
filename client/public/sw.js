/// <reference lib="webworker" />

// Cambiar el número cuando cambie este archivo: así se borran las cachés viejas.
const CACHE_NAME = "avivando-app-v6";
const OFFLINE_URL = "/offline.html";
const STATIC_ASSETS = [
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-192.png",
  OFFLINE_URL,
];

// Instalar: guardar lo básico y activarse enseguida.
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

// Activar: borrar las cachés de versiones anteriores y tomar el control.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // la radio, Google Fonts, etc.: el navegador decide

  // API, archivos subidos e íconos: siempre de la red (la caché solo si no hay conexión).
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/uploads/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  // Páginas: primero la red. Cada página se guarda con su propia dirección (cada una
  // tiene su título y su canónica); sin conexión se usa esa, la portada o la página
  // "Sin conexión".
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || (await caches.match("/")) || caches.match(OFFLINE_URL))
    );
    return;
  }

  // Archivos de Vite con huella (/assets/xxx-HASH.js): primero la caché, nunca cambian.
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok && event.request.method === "GET") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Lo demás: primero la red, la caché si no hay conexión.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && event.request.method === "GET") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ========== AVISOS PUSH ==========
self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.body || "",
      icon: data.icon || "/icons/maskable-192.png",
      badge: data.badge || "/icons/favicon-16.png",
      tag: data.tag || "default",
      data: { url: data.url || "/" },
      vibrate: [200, 100, 200],
      actions: [
        { action: "open", title: "Abrir" },
        { action: "close", title: "Cerrar" },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title || "Avivando el Fuego", options));
  } catch (err) {
    console.error("Push event error:", err);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") return;

  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          // Navegar DENTRO de la app (sin recargar): así la radio no se corta.
          client.postMessage({ type: "avivando:navigate", url });
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
