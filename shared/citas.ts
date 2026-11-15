// Las citas bíblicas («Juan 3:16», «1 Juan 5:11-13»): leerlas, mostrarlas con sus tildes y enlazarlas a la Biblioteca.
// Es liviano a propósito: lo usan la academia, el cuaderno y la Biblioteca sin cargar el catálogo de la academia.
import { BIBLE_BOOK_CHAPTERS, bibleBookLabel } from "./bible";

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const LIBROS = new Map(Object.keys(BIBLE_BOOK_CHAPTERS).map((k) => [sinTildes(k).toLowerCase(), k]));

export type Cita = { libro: string; capitulo: number; desde: number; hasta: number };

/** «Juan 3:16», «1 Juan 5:11-13», «Gálatas 5:16-25» → libro guardado (sin tilde), capítulo y versículos. */
export function parsearCita(ref: string): Cita | null {
  const m = /^\s*((?:[123]\s+)?[A-Za-zÁÉÍÓÚÑáéíóúñü]+)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?\s*$/.exec(ref);
  if (!m) return null;
  const libro = LIBROS.get(sinTildes(m[1].replace(/\s+/g, " ")).toLowerCase());
  if (!libro) return null;
  const capitulo = Number(m[2]);
  const desde = Number(m[3]);
  const hasta = m[4] ? Number(m[4]) : desde;
  if (capitulo < 1 || capitulo > BIBLE_BOOK_CHAPTERS[libro] || desde < 1 || hasta < desde) return null;
  return { libro, capitulo, desde, hasta };
}

/** La cita escrita para mostrar, con las tildes de la RV1960 («Galatas» → «Gálatas»). */
export function citaVisible(c: Cita): string {
  return `${bibleBookLabel(c.libro)} ${c.capitulo}:${c.desde}${c.hasta > c.desde ? `-${c.hasta}` : ""}`;
}

/** El capítulo en la Biblioteca de la web. */
export function enlaceBiblia(c: Cita): string {
  return `/biblioteca?libro=${encodeURIComponent(c.libro)}&cap=${c.capitulo}`;
}
