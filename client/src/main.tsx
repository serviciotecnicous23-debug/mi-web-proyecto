import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// ========== SENTRY ERROR MONITORING ==========
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance monitoring: 20% of transactions in production
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
    // Session replay: 10% normal, 100% on error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // Sentry 11 recoge por defecto cookies, cuerpos de peticiones y datos de
    // usuario; esto mantiene lo que enviaba Sentry 10 sin `sendDefaultPii`.
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: {
        request: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
        response: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
      },
      httpBodies: [],
      urlQueryParams: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
      genAI: { inputs: false, outputs: false },
      databaseQueryData: false,
      queues: false,
      graphQL: { document: false, variables: false },
    },
  });
  console.log("[sentry] Client monitoring initialized");
}

// Register PWA service worker for offline support and fast loading
if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log("SW registered:", registration.scope);

        // When a new SW is found, force it to activate and reload
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "activated" && navigator.serviceWorker.controller) {
                // New version activated — reload to get fresh content
                console.log("New SW activated, reloading for fresh content...");
                window.location.reload();
              }
            });
          }
        });

        // Check for SW updates frequently (every 5 minutes)
        setInterval(() => registration.update(), 5 * 60 * 1000);

        // Also check for updates immediately
        registration.update();
      },
      (error) => {
        console.log("SW registration failed:", error);
      }
    );
  });
}

// Tras una publicación, una pestaña abierta con la versión anterior puede pedir un
// trozo de código que ya no existe (PDF, capturas…): recargar trae la versión nueva.
// Como mucho una vez por minuto, para no entrar en bucle si falla la red.
window.addEventListener("vite:preloadError", (event) => {
  try {
    const last = Number(sessionStorage.getItem("avivando:recarga-version") || 0);
    if (Date.now() - last < 60_000) return;
    sessionStorage.setItem("avivando:recarga-version", String(Date.now()));
  } catch {
    // Sin sessionStorage (modo privado estricto): mejor no recargar que arriesgar un bucle.
    return;
  }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);
