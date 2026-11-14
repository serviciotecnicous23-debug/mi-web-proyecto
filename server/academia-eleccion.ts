/**
 * Qué preguntas trae cada intento de un examen de la academia (sin base de datos: se prueba en academia-eleccion.test.ts).
 *
 * - El examen sale REPARTIDO según la tabla de especificaciones: por lección en el final de una materia, por materia en
 *   el integral de un nivel. Cada grupo pone su parte y lo que sobra se turna entre intentos.
 * - Primero van las preguntas que todavía no salieron en intentos anteriores (`vistas`).
 * - Sin azar del servidor: la misma semilla (persona, intento y examen) da siempre el mismo examen.
 */
import type { PreguntaObjetiva } from "./academia/tipos";
import type { ClaveEscrita } from "./academia-correccion";
import { numeroDe } from "./orden-examen";

/** Un número estable por texto y semilla, para ordenar sin azar del servidor. */
export const mezcla = (id: string, semilla: number) => (numeroDe(id) ^ Math.imul(semilla | 0, 2654435761)) >>> 0;

const primeroLasNuevas = (vistas: Set<string>, semilla: number) => (a: { id: string }, b: { id: string }) =>
  Number(vistas.has(a.id)) - Number(vistas.has(b.id)) || mezcla(a.id, semilla) - mezcla(b.id, semilla);

/** Las preguntas objetivas del intento, repartidas por grupo (la lección, salvo que se diga otra cosa). */
export function elegirFinal(
  banco: PreguntaObjetiva[],
  vistas: Set<string>,
  n: number,
  semilla: number,
  grupo: (p: PreguntaObjetiva) => string = (p) => String(p.leccion).padStart(3, "0"),
): string[] {
  const porGrupo = new Map<string, PreguntaObjetiva[]>();
  for (const p of banco) porGrupo.set(grupo(p), [...(porGrupo.get(grupo(p)) ?? []), p]);
  const grupos = [...porGrupo.keys()].sort();
  const G = grupos.length;
  if (!G) return [];
  const base = Math.floor(n / G);
  const resto = n % G;
  const desde = Math.abs(semilla) % G;
  const elegidas: PreguntaObjetiva[] = [];
  const sobrantes: PreguntaObjetiva[] = [];
  grupos.forEach((g, k) => {
    const cupo = base + ((k - desde + G) % G < resto ? 1 : 0);
    const orden = [...(porGrupo.get(g) ?? [])].sort(primeroLasNuevas(vistas, semilla));
    elegidas.push(...orden.slice(0, cupo));
    sobrantes.push(...orden.slice(cupo));
  });
  if (elegidas.length < n) {
    sobrantes.sort(primeroLasNuevas(vistas, semilla));
    elegidas.push(...sobrantes.slice(0, n - elegidas.length));
  }
  return elegidas.sort((a, b) => mezcla(a.id, semilla + 7) - mezcla(b.id, semilla + 7)).map((p) => p.id);
}

/** Las preguntas escritas del intento; con `grupo`, de grupos distintos mientras se pueda (el integral: materias distintas). */
export function elegirEscritas(escritas: ClaveEscrita[], vistas: Set<string>, n: number, semilla: number, grupo?: (e: ClaveEscrita) => string): string[] {
  const orden = [...escritas].sort(primeroLasNuevas(vistas, semilla));
  if (!grupo) return orden.slice(0, n).map((e) => e.id);
  const out: ClaveEscrita[] = [];
  const usados = new Set<string>();
  for (const e of orden) {
    if (out.length >= n) break;
    if (usados.has(grupo(e))) continue;
    usados.add(grupo(e));
    out.push(e);
  }
  for (const e of orden) {
    if (out.length >= n) break;
    if (!out.includes(e)) out.push(e);
  }
  return out.map((e) => e.id);
}
