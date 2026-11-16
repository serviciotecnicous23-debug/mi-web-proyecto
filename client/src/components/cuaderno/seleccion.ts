/**
 * Lo que el alumno seleccionó dentro de un texto armado con bloques ([data-bloque]): el texto EXACTO de cada bloque que
 * toca la selección, nada más. Antes se tomaba solo el primer bloque y, si la selección terminaba fuera de él, se
 * guardaba el bloque entero hasta el final: en el teléfono, donde las manijas de la selección caen fácil en el espacio
 * entre párrafos, se guardaba de más; y una selección que empezaba fuera de los bloques dejaba viva la anterior.
 */
export type ParteSeleccion = { bloque: number; texto: string };
export type SeleccionExacta = { partes: ParteSeleccion[]; texto: string; palabras: number; rect: DOMRect };

/** Espacios de más fuera; los saltos de línea quedan como uno solo. */
export function limpiarTexto(t: string): string {
  return t.replace(/[ \t\r\f\v ]+/g, " ").replace(/ *\n[ \n]*/g, "\n").trim();
}

/** Lo seleccionado dentro de `caja`, recortado a ella y repartido por bloques (null si no toca ningún bloque). */
export function seleccionExacta(sel: Selection | null, caja: HTMLElement | null): SeleccionExacta | null {
  if (!sel || sel.isCollapsed || !sel.rangeCount || !caja) return null;
  const r = sel.getRangeAt(0);
  if (!r.intersectsNode(caja)) return null;
  const rango = r.cloneRange();
  if (!caja.contains(r.startContainer)) rango.setStart(caja, 0);
  if (!caja.contains(r.endContainer)) rango.setEnd(caja, caja.childNodes.length);
  if (rango.collapsed) return null;
  const partes: ParteSeleccion[] = [];
  for (const el of Array.from(caja.querySelectorAll<HTMLElement>("[data-bloque]"))) {
    // solo los bloques de más adentro, y los que toca la selección
    if (el.querySelector("[data-bloque]") || !rango.intersectsNode(el)) continue;
    const parte = document.createRange();
    parte.selectNodeContents(el);
    if (rango.compareBoundaryPoints(Range.START_TO_START, parte) > 0) parte.setStart(rango.startContainer, rango.startOffset);
    if (rango.compareBoundaryPoints(Range.END_TO_END, parte) < 0) parte.setEnd(rango.endContainer, rango.endOffset);
    const texto = limpiarTexto(parte.toString());
    const bloque = Number(el.getAttribute("data-bloque"));
    if (texto.length >= 2 && Number.isInteger(bloque)) partes.push({ bloque, texto });
  }
  if (!partes.length) return null;
  const texto = partes.map((p) => p.texto).join("\n\n");
  return { partes, texto, palabras: texto.split(/\s+/).filter(Boolean).length, rect: rango.getBoundingClientRect() };
}

/** El comienzo de lo seleccionado, para mostrarlo en la barra antes de guardarlo. */
export function vistaPrevia(texto: string, letras = 72): string {
  const una = texto.replace(/\s+/g, " ").trim();
  return una.length > letras ? `${una.slice(0, letras).replace(/\s+\S*$/, "")}…` : una;
}
