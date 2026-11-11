/**
 * El público de «¿Quién es sabio?» (shared/sabio.ts), en memoria: quién mira cada partida y los aplausos de
 * los últimos segundos. No se guarda en la base y no se inventa nada: son las personas que están mirando.
 */
import { APLAUSOS, type AplausoId, type PublicoVista } from "@shared/sabio";

/** Quien no volvió a pedir la partida en este tiempo ya no cuenta como público. */
const MIRANDO_MS = 8_000;
/** Los aplausos se ven estos segundos. */
const APLAUSO_MS = 20_000;
/** Un aplauso cada tanto por persona. */
const APLAUSO_CADA_MS = 2_500;
/** Una sala sin nadie por este tiempo se olvida. */
const SALA_MS = 5 * 60_000;

type Sala = {
  /** La cuenta de quien juega (para que solo esa persona lea su público). */
  duenio: number | null;
  mirando: Map<number, number>;
  /** El nombre con que se ve cada uno (su personaje), para sentarlo en el estudio. */
  nombres: Map<number, string>;
  aplausos: { tipo: AplausoId; at: number }[];
  ultimoDe: Map<number, number>;
  ultimo: number;
  tocada: number;
};

const salas = new Map<number, Sala>();
const TIPOS = new Set<string>(APLAUSOS.map((a) => a.id));

function sala(partida: number): Sala {
  let s = salas.get(partida);
  if (!s) {
    s = { duenio: null, mirando: new Map(), nombres: new Map(), aplausos: [], ultimoDe: new Map(), ultimo: 0, tocada: Date.now() };
    salas.set(partida, s);
  }
  s.tocada = Date.now();
  return s;
}

function limpiar(s: Sala, ahora: number) {
  for (const [u, t] of s.mirando)
    if (ahora - t > MIRANDO_MS) {
      s.mirando.delete(u);
      s.nombres.delete(u);
    }
  while (s.aplausos.length && ahora - s.aplausos[0].at > APLAUSO_MS) s.aplausos.shift();
}

/** Quien juega: su cuenta (solo ella lee el público de su partida). */
export function registrarDuenio(partida: number, cuenta: number) {
  sala(partida).duenio = cuenta;
}
export function duenioDe(partida: number): number | null {
  return salas.get(partida)?.duenio ?? null;
}

/** Alguien está mirando la partida (vuelve a pedirla cada segundo y medio). */
export function marcarMirando(partida: number, cuenta: number, nombre?: string) {
  const s = sala(partida);
  s.mirando.set(cuenta, Date.now());
  if (nombre) s.nombres.set(cuenta, nombre);
}

export function publicoDe(partida: number): PublicoVista {
  const s = salas.get(partida);
  if (!s) return { mirando: 0, aplausos: {}, ultimo: 0 };
  const ahora = Date.now();
  limpiar(s, ahora);
  const aplausos: Partial<Record<AplausoId, number>> = {};
  for (const a of s.aplausos) aplausos[a.tipo] = (aplausos[a.tipo] ?? 0) + 1;
  const nombres = [...s.mirando.keys()].map((u) => s.nombres.get(u)).filter((n): n is string => !!n).slice(0, 12);
  return { mirando: s.mirando.size, aplausos, ultimo: s.ultimo, nombres };
}

/** Un aplauso del público. Solo puede aplaudir quien está mirando, y no muy seguido. */
export function aplaudir(partida: number, cuenta: number, tipo: string): "ok" | "rapido" | "no" {
  if (!TIPOS.has(tipo)) return "no";
  const s = salas.get(partida);
  if (!s || !s.mirando.has(cuenta)) return "no";
  const ahora = Date.now();
  if (ahora - (s.ultimoDe.get(cuenta) ?? 0) < APLAUSO_CADA_MS) return "rapido";
  s.ultimoDe.set(cuenta, ahora);
  s.aplausos.push({ tipo: tipo as AplausoId, at: ahora });
  if (s.aplausos.length > 200) s.aplausos.shift();
  s.ultimo++;
  return "ok";
}

// las salas viejas se olvidan solas
setInterval(() => {
  const ahora = Date.now();
  for (const [id, s] of salas) if (ahora - s.tocada > SALA_MS) salas.delete(id);
}, 60_000).unref?.();
