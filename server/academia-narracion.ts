// La narración grabada de una lección (docs/academia.md, «La voz de las lecciones»): la página la recibe solo si la
// grabación se hizo con el contenido de hoy (la misma huella). Si la lección cambió o no tiene grabación, la página lee
// con la voz del aparato, como antes.
import { leccionPorId } from "@shared/academia";
import { huellaDeLeccion, type LeccionNarrable, type NarracionVista } from "@shared/narracion";
import { CONTENIDO } from "./academia/index";
import { NARRACIONES } from "./academia/narraciones";

/**
 * Dónde están los audios: por defecto en la web (client/public/voz/academia/). Con NARRACION_URL_BASE (por ejemplo un
 * almacenamiento como Cloudflare R2) se sirven desde allí, con el mismo nombre de archivo.
 */
const BASE = (process.env.NARRACION_URL_BASE || "/voz/academia").replace(/\/+$/, "");

/** La lección como la narra la voz (sin el texto de la Biblia, que no entra en la huella). */
function narrable(leccionId: string): LeccionNarrable | null {
  const l = leccionPorId(leccionId);
  const c = CONTENIDO.get(leccionId);
  if (!l || !c) return null;
  return { materia: l.materia.titulo, titulo: l.leccion.titulo, n: l.indice + 1, objetivos: c.objetivos, paraEmpezar: c.paraEmpezar, bloques: c.bloques, ideaClave: c.ideaClave, paraLaVida: c.paraLaVida };
}

// el contenido no cambia mientras corre el servidor: si cada grabación vale se calcula una sola vez
const vale = new Map<string, boolean>();
function grabacionQueVale(leccionId: string) {
  const n = NARRACIONES[leccionId];
  if (!n) return null;
  let ok = vale.get(leccionId);
  if (ok === undefined) {
    const l = narrable(leccionId);
    ok = !!l && huellaDeLeccion(l) === n.huella;
    vale.set(leccionId, ok);
  }
  return ok ? n : null;
}

export function narracionDe(leccionId: string): NarracionVista | null {
  const n = grabacionQueVale(leccionId);
  return n ? { url: `${BASE}/${n.archivo}`, segundos: n.segundos, marcas: n.marcas } : null;
}

/** Los minutos de la narración de una lección (para la lista de la materia), o null si no tiene. */
export function minutosDeNarracion(leccionId: string): number | null {
  const n = grabacionQueVale(leccionId);
  return n ? Math.max(1, Math.round(n.segundos / 60)) : null;
}
