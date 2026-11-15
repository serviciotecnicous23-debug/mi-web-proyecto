// Las descargas de la academia (el carné, el certificado y el expediente): los archivos se hacen en el servidor y se
// bajan con un enlace de verdad, con su nombre (server/academia-carne.ts y server/academia-pdf.ts). Este módulo dice
// dónde se abrió la página, para que la descarga nunca deje al teléfono en una pantalla sin salida.

/**
 * Dónde se abrió la página. En el navegador de una app (Facebook, Instagram, WhatsApp…) las descargas a veces no
 * funcionan; en el iPhone con la web instalada, una descarga en la misma ventana se queda sin salida (se abre aparte).
 */
export function entornoDeDescarga() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return { enApp: false, iosInstalada: false, tactil: false };
  const ua = navigator.userAgent || "";
  const enApp = /FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|TikTok|musical_ly|Snapchat|; wv\)/i.test(ua);
  const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const instalada = (navigator as Navigator & { standalone?: boolean }).standalone === true || !!window.matchMedia?.("(display-mode: standalone)").matches;
  const tactil = !!window.matchMedia?.("(pointer: coarse)").matches;
  return { enApp, iosInstalada: ios && instalada, tactil };
}

/** Los atributos del enlace de descarga: en el iPhone con la web instalada se abre aparte, con su botón para volver. */
export function atributosDeDescarga(): { target?: string; rel?: string } {
  return entornoDeDescarga().iosInstalada ? { target: "_blank", rel: "noopener" } : {};
}

/** El aviso para quien abrió la página en el navegador de una app. */
export const AVISO_NAVEGADOR_DE_APP =
  "Estás en el navegador de una app (Facebook, Instagram, WhatsApp…), donde a veces las descargas no funcionan. Si no se descarga, abre esta página en Chrome o Safari: toca el menú (⋮ o ···) y elige «Abrir en el navegador».";
