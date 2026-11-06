import { useQuery } from "@tanstack/react-query";
import type { FileType, MediaKind, MediaProvider } from "@shared/media";

/** Lo que devuelve el servidor para un enlace (server/link-preview.ts). */
export interface LinkPreview {
  url: string;
  finalUrl: string;
  provider: MediaProvider;
  kind: MediaKind;
  title?: string;
  description?: string;
  author?: string;
  authorUrl?: string;
  thumbnail?: string;
  siteName?: string;
  favicon?: string;
  embedUrl?: string;
  aspect: number;
  height?: number;
  fileType?: FileType;
  start?: number;
}

// Las tarjetas de una misma página piden su vista previa juntas: se reúnen 60 ms y se
// hace UNA petición (la lista de Comunidad puede traer 20 enlaces).
type Waiter = (value: LinkPreview | null) => void;
const queue = new Map<string, Waiter[]>();
let timer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  timer = null;
  const batch = Array.from(queue.entries()).slice(0, 24);
  for (const [url] of batch) queue.delete(url);
  if (queue.size) timer = setTimeout(flush, 60);
  let previews: Record<string, LinkPreview | null> = {};
  try {
    const res = await fetch("/api/link-previews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ urls: batch.map(([url]) => url) }),
    });
    if (res.ok) previews = (await res.json()).previews || {};
  } catch {
    /* sin vista previa: la tarjeta usa lo que sabe del enlace */
  }
  for (const [url, waiters] of batch) {
    for (const resolve of waiters) resolve(previews[url] ?? null);
  }
}

export function fetchLinkPreview(url: string): Promise<LinkPreview | null> {
  return new Promise((resolve) => {
    const waiters = queue.get(url);
    if (waiters) waiters.push(resolve);
    else queue.set(url, [resolve]);
    if (!timer) timer = setTimeout(flush, 60);
  });
}

/** Solo enlaces de afuera (no los archivos de esta web ni los data: URL). */
export function wantsPreview(url: string | null | undefined): url is string {
  return !!url && /^https?:\/\//i.test(url) && !url.startsWith(window.location.origin + "/files/");
}

export function useLinkPreview(url: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ["link-preview", url],
    queryFn: () => fetchLinkPreview(url!),
    enabled: enabled && wantsPreview(url),
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });
}
