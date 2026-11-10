/**
 * La partida del templo guardada en la cuenta: un resumen para saber cuál de dos partidas está más
 * avanzada (lo usan el servidor, al guardar un respaldo, y el teléfono, al elegir cuál cargar).
 *
 * Una partida que sigue a otra nunca retrocede: la generación, el cargo más alto, los lugares
 * restaurados, los días y el tiempo jugado solo crecen. Una nueva generación sube la generación
 * aunque el templo vuelva a las ruinas. «Empezar de nuevo» sí retrocede: por eso el servidor guarda
 * la más avanzada como respaldo y se puede recuperar.
 */

export type ResumenPartida = {
  gen: number;
  /** Cargo más alto en la historia (0 aprendiz … 4 sumo sacerdote). */
  rango: number;
  lugares: number;
  dia: number;
  segundos: number;
  /** Para comparar: más alto = más avanzada. */
  peso: number;
};

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

export function resumenPartida(data: unknown): ResumenPartida | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const d = data as Record<string, unknown>;
  const gen = Math.max(1, Math.min(99, Math.floor(num(d.gen) || 1)));
  const rango = Math.max(0, Math.min(4, Math.round(Math.max(num(d.rank), num(d.rangoMax)))));
  const built = d.built && typeof d.built === "object" && !Array.isArray(d.built) ? Object.values(d.built as Record<string, unknown>).filter(Boolean).length : 0;
  const lugares = Math.max(0, Math.min(99, built));
  const dia = Math.max(0, Math.floor(num(d.day)));
  const segundos = Math.max(0, Math.floor(num(d.playSeconds)));
  const peso = gen * 1e9 + rango * 1e8 + lugares * 1e6 + Math.min(999_999, segundos);
  return { gen, rango, lugares, dia, segundos, peso };
}

/**
 * Cómo se relacionan dos partidas:
 * - "igual": son la misma.
 * - "a" / "b": una sigue a la otra y esa está más avanzada en todo.
 * - "distintas": cada una va adelante en algo (se jugaron por separado): hay que preguntar.
 */
export function compararPartidas(a: ResumenPartida, b: ResumenPartida): "igual" | "a" | "b" | "distintas" {
  if (a.gen !== b.gen) {
    // una nueva generación sigue a la anterior: el templo vuelve a las ruinas, pero los días, el
    // tiempo jugado y el cargo más alto se quedan
    const [alta, baja, quien] = a.gen > b.gen ? [a, b, "a" as const] : [b, a, "b" as const];
    return alta.dia >= baja.dia && alta.segundos >= baja.segundos && alta.rango >= baja.rango ? quien : "distintas";
  }
  const campos: (keyof ResumenPartida)[] = ["rango", "lugares", "dia", "segundos"];
  let aGana = false,
    bGana = false;
  for (const k of campos) {
    if (a[k] > b[k]) aGana = true;
    else if (b[k] > a[k]) bGana = true;
  }
  if (!aGana && !bGana) return "igual";
  if (aGana && !bGana) return "a";
  if (bGana && !aGana) return "b";
  return "distintas";
}
