/** Los bytes de un archivo: de esta web, de un data: URL (archivos viejos) o de afuera. */
export async function loadBytes(url: string): Promise<ArrayBuffer> {
  if (url.startsWith("data:")) {
    const comma = url.indexOf(",");
    const meta = url.slice(5, comma);
    const payload = url.slice(comma + 1);
    if (/;base64/i.test(meta)) {
      const bin = atob(payload);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return bytes.buffer;
    }
    return new TextEncoder().encode(decodeURIComponent(payload)).buffer as ArrayBuffer;
  }
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`No se pudo abrir el archivo (${res.status})`);
  return res.arrayBuffer();
}

export async function loadText(url: string): Promise<string> {
  const buf = await loadBytes(url);
  return new TextDecoder("utf-8").decode(buf);
}

/** Dirección completa (con el dominio) de un archivo de esta web. */
export function absoluteUrl(url: string): string {
  try {
    return new URL(url, window.location.origin).toString();
  } catch {
    return url;
  }
}

/** El visor de Office necesita leer el archivo desde internet (no sirve en localhost). */
export function canUseOfficeViewer(url: string): boolean {
  if (url.startsWith("data:") || url.startsWith("blob:")) return false;
  try {
    const u = new URL(url, window.location.origin);
    return u.protocol === "https:" && !/^(localhost|127\.|\[::1\]|192\.168\.|10\.)/.test(u.hostname) && !u.hostname.endsWith(".localhost");
  } catch {
    return false;
  }
}

export function officeViewerUrl(url: string): string {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl(url))}`;
}

/** Visor de Google para documentos de otras webs que no dejan leerlos directamente. */
export function googleViewerUrl(url: string): string {
  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(absoluteUrl(url))}`;
}

/** Descarga con el nombre original (también para data: URL). */
export function downloadFile(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url.startsWith("/files/") ? `${url}${url.includes("?") ? "&" : "?"}download=1` : url;
  a.download = name || "archivo";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
