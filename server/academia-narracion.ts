// La narración grabada de una lección (docs/academia.md, «La voz de las lecciones»): la página la recibe solo si la
// grabación se hizo con el contenido de hoy (la misma huella). Si la lección cambió o no tiene grabación, la página lee
// con la voz del aparato, como antes.
import { huellaDeLeccion, type LeccionNarrable, type NarracionVista } from "@shared/narracion";
import { NARRACIONES } from "./academia/narraciones";

/**
 * Dónde están los audios: por defecto en la web (client/public/voz/academia/). Con NARRACION_URL_BASE (por ejemplo un
 * almacenamiento como Cloudflare R2) se sirven desde allí, con el mismo nombre de archivo.
 */
const BASE = (process.env.NARRACION_URL_BASE || "/voz/academia").replace(/\/+$/, "");

// el contenido no cambia mientras corre el servidor: la huella de cada lección se calcula una sola vez
const huellas = new Map<string, string>();

export function narracionDe(leccionId: string, leccion: LeccionNarrable): NarracionVista | null {
  const n = NARRACIONES[leccionId];
  if (!n) return null;
  let huella = huellas.get(leccionId);
  if (!huella) {
    huella = huellaDeLeccion(leccion);
    huellas.set(leccionId, huella);
  }
  if (huella !== n.huella) return null;
  return { url: `${BASE}/${n.archivo}`, segundos: n.segundos, marcas: n.marcas };
}
