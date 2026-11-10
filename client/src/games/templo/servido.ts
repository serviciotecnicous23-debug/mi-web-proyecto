/**
 * Lo que el personaje sirvió hace poco, en este teléfono: el maestro de su cátedra le enseña sobre eso
 * («hoy llenaste las lámparas: ¿sabes qué aceite se usaba?»). Es solo una pista para elegir la lección:
 * el servidor no premia distinto por ella.
 */
const CLAVE = "jer-servido";
const VALE_MS = 12 * 3600_000;

type Anotado = Record<string, { k: string; t: number }[]>;

function leer(): Anotado {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE) || "{}") as unknown;
    return v && typeof v === "object" ? (v as Anotado) : {};
  } catch {
    return {};
  }
}

/** Un deber cumplido (el más reciente va primero; sin repetir). */
export function anotarServido(personajeId: number | undefined, deber: string) {
  if (!personajeId || !deber) return;
  try {
    const todo = leer();
    const ahora = Date.now();
    const lista = (todo[personajeId] || []).filter((x) => x.k !== deber && ahora - x.t < VALE_MS);
    todo[personajeId] = [{ k: deber, t: ahora }, ...lista].slice(0, 8);
    localStorage.setItem(CLAVE, JSON.stringify(todo));
  } catch {
    /* sin almacenamiento: sin pista */
  }
}

/** Los deberes servidos en las últimas horas, del más reciente al más viejo. */
export function servidoReciente(personajeId: number | undefined): string[] {
  if (!personajeId) return [];
  const ahora = Date.now();
  return (leer()[personajeId] || []).filter((x) => ahora - x.t < VALE_MS).map((x) => x.k);
}
