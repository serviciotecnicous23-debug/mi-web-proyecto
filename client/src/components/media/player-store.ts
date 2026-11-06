import { useEffect, useRef, useSyncExternalStore } from "react";
import type { MediaKind, MediaProvider } from "@shared/media";

/**
 * Lo que suena en la ventanita flotante (MediaDock, en App.tsx, fuera de las páginas):
 * así un video sigue mientras la persona navega por la web, como la radio.
 */
export interface DockItem {
  key: string;
  url: string;
  embedUrl: string;
  provider: MediaProvider;
  kind: MediaKind;
  title?: string;
  author?: string;
  aspect: number;
  start?: number;
  /** Página donde se estaba viendo, para "volver". */
  returnTo?: string;
}

let current: DockItem | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDock() {
  return current;
}

export function setDock(item: DockItem | null) {
  current = item;
  listeners.forEach((l) => l());
}

export function useDock() {
  return useSyncExternalStore(subscribe, getDock, getDock);
}

/** Segundo en el que va la ventanita (para traer el video de vuelta sin empezar de cero). */
export const dockClock = { seconds: 0 };

/** Un solo reproductor a la vez: avisa a las demás tarjetas, a la ventanita y a la radio. */
export const MEDIA_PLAY_EVENT = "avivando:media-play";

export function announcePlay(key: string) {
  window.dispatchEvent(new CustomEvent(MEDIA_PLAY_EVENT, { detail: { key } }));
}

export function useOnOtherPlay(key: string, stop: () => void) {
  const stopRef = useRef(stop);
  stopRef.current = stop;
  useEffect(() => {
    const onPlay = (e: Event) => {
      const other = (e as CustomEvent<{ key: string }>).detail?.key;
      if (other !== key) stopRef.current();
    };
    window.addEventListener(MEDIA_PLAY_EVENT, onPlay);
    return () => window.removeEventListener(MEDIA_PLAY_EVENT, onPlay);
  }, [key]);
}

/** Se puede seguir el segundo exacto (y continuar en la ventanita donde iba). */
export function canResume(provider: MediaProvider) {
  return provider === "youtube" || provider === "vimeo";
}

/** Dirección final del reproductor: dominio (Twitch), origen (YouTube) y segundo de inicio. */
export function buildEmbedSrc(embedUrl: string, provider: MediaProvider, start?: number): string {
  let src = embedUrl.replace("{parent}", window.location.hostname);
  try {
    if (provider === "youtube") {
      const u = new URL(src);
      u.searchParams.set("origin", window.location.origin);
      if (start && start > 1) u.searchParams.set("start", String(Math.floor(start)));
      src = u.toString();
    } else if (provider === "vimeo" && start && start > 1) {
      src = `${src.split("#")[0]}#t=${Math.floor(start)}s`;
    }
  } catch {
    /* se usa tal cual */
  }
  return src;
}

/**
 * Lleva la cuenta del segundo en el que va un video de YouTube o Vimeo (sus reproductores
 * lo cuentan por mensajes). Devuelve una referencia que siempre tiene el último segundo.
 */
export function useEmbedClock(iframe: HTMLIFrameElement | null, provider: MediaProvider, onTime?: (s: number) => void) {
  const seconds = useRef(0);
  const onTimeRef = useRef(onTime);
  onTimeRef.current = onTime;
  useEffect(() => {
    if (!iframe || !canResume(provider)) return;
    let origin = "*";
    try {
      origin = new URL(iframe.src).origin;
    } catch {
      /* nada */
    }
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;
      let data: any = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      let t: number | undefined;
      if (provider === "youtube" && data?.event === "infoDelivery" && typeof data.info?.currentTime === "number") t = data.info.currentTime;
      if (provider === "vimeo" && (data?.event === "timeupdate" || data?.event === "playProgress") && typeof data.data?.seconds === "number") t = data.data.seconds;
      if (t != null) {
        seconds.current = t;
        onTimeRef.current?.(t);
      }
    };
    const hello = () => {
      try {
        if (provider === "youtube") iframe.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), origin);
        if (provider === "vimeo") iframe.contentWindow?.postMessage(JSON.stringify({ method: "addEventListener", value: "timeupdate" }), origin);
      } catch {
        /* nada */
      }
    };
    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", hello);
    const timer = window.setInterval(hello, 3000);
    hello();
    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", hello);
      window.clearInterval(timer);
    };
  }, [iframe, provider]);
  return seconds;
}

export const IFRAME_ALLOW = "autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write; web-share";
