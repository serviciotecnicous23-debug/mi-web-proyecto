// El resaltado del lugar que se está escuchando (lo usan la voz del aparato y la voz grabada).
// No toca las clases del bloque: el cuaderno pinta las suyas.

export function resaltar(el: HTMLElement | null, si: boolean) {
  if (!el) return;
  el.style.backgroundColor = si ? "rgba(249, 115, 22, 0.10)" : "";
  el.style.boxShadow = si ? "0 0 0 8px rgba(249, 115, 22, 0.10)" : "";
  el.style.borderRadius = si ? "10px" : "";
  el.style.transition = "background-color .3s, box-shadow .3s";
}

/** El elemento de la página de un lugar del guion: «-1», «0», «-2»… (data-bloque) o «titulo», «objetivos», «vida» (data-narra). */
export function elementoDeLugar(caja: HTMLElement | null, lugar: string): HTMLElement | null {
  if (!caja) return null;
  const selector = /^-?\d+$/.test(lugar) ? `[data-bloque="${lugar}"]` : `[data-narra="${lugar}"]`;
  return caja.querySelector<HTMLElement>(selector);
}

/** Lo lleva a la vista si quedó fuera (arriba, debajo del menú y del reproductor, o abajo). */
export function llevarALaVista(el: HTMLElement, margenArriba = 80) {
  const r = el.getBoundingClientRect();
  if (r.top < margenArriba || r.bottom > window.innerHeight - 80) el.scrollIntoView({ block: "center", behavior: "smooth" });
}
