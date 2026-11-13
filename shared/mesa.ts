/**
 * El marco de los juegos de mesa del patio (plan del 13 de noviembre de 2026): ajedrez, damas, dominó, parchís, lotería,
 * generala… Cada juego es un MÓDULO PURO (sin red ni base) con esta interfaz, y la sala del patio
 * (server/juegos-grupo.ts) pone lo demás: los asientos (personas y compañeros de la computadora), los turnos, el reloj
 * de cada jugada, los espectadores, la vuelta si alguien se cae, los premios con su tope y los avisos por la red.
 *
 * - Lo decide el servidor: valida cada jugada con `jugadasValidas` (o `esValida`), la aplica con `aplicar` y mira si
 *   terminó con `terminado`.
 * - Cada uno ve solo lo suyo: `vistaPara(estado, asiento)` no manda lo oculto (las cartas o las fichas de los demás).
 *   Con `asiento = null` es la vista de quien mira la partida.
 * - Los compañeros de la computadora juegan con `jugadaDeBot(estado, asiento, nivel, azar)`, después de «pensar» un
 *   rato (`pensarMs`).
 * - El azar llega de afuera (`Azar`, con semilla): así las pruebas son repetibles y nada se decide en el teléfono.
 *
 * Para agregar un juego: su módulo en `shared/mesa/<juego>.ts`, una línea en `shared/mesa/index.ts` y su pantalla en
 * `client/src/games/templo/mesa/` (y su línea en `PANTALLAS_MESA`).
 */
import type { Verso } from "./ciudad";

export type NivelBot = "facil" | "normal" | "dificil";

export const NIVELES_BOT: Record<NivelBot, { nombre: string; icono: string; detalle: string }> = {
  facil: { nombre: "Fácil", icono: "🌱", detalle: "Juega tranquilo y a veces se equivoca." },
  normal: { nombre: "Normal", icono: "🌿", detalle: "Piensa sus jugadas, pero no todas." },
  dificil: { nombre: "Difícil", icono: "🌳", detalle: "Juega con cuidado: hay que pensar para ganarle." },
};

export const esNivelBot = (v: unknown): v is NivelBot => v === "facil" || v === "normal" || v === "dificil";

/** Los nombres de los compañeros de la computadora (siempre con 🤖: nunca se hacen pasar por personas). */
export const NOMBRES_BOT = ["Rubén", "Débora", "Caleb", "Rut", "Josué", "Ana", "Samuel", "Miriam", "Gedeón", "Ester", "Natán", "Lidia"] as const;
export const nombreDeBot = (i: number) => `${NOMBRES_BOT[((i % NOMBRES_BOT.length) + NOMBRES_BOT.length) % NOMBRES_BOT.length]} 🤖`;

/** Un número al azar en [0, 1). Llega de afuera para que todo sea repetible. */
export type Azar = () => number;

/** Azar con semilla (mulberry32): el mismo número da la misma partida. */
export function azarConSemilla(semilla: number): Azar {
  let a = semilla >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const entre = (azar: Azar, a: number, b: number) => a + (b - a) * azar();
export const alAzar = <T>(azar: Azar, l: readonly T[]): T => l[Math.floor(azar() * l.length)];

/** Un asiento de la mesa: el número, el nombre y si es un compañero de la computadora (con su nivel). */
export type AsientoMesa = { n: number; nombre: string; bot: NivelBot | null };

/** Cómo terminó: quiénes ganaron (asientos), los puntos de cada asiento y una línea por asiento. */
export type ResultadoMesa = { ganadores: number[]; puntos: number[]; detalle: string[]; titulo: string };

export interface JuegoDeMesa<E = unknown, J = unknown, V = unknown> {
  id: string;
  nombre: string;
  icono: string;
  /** Una línea para la lista. */
  corto: string;
  /** Cómo se juega (para la sala). */
  como: string[];
  verso: Verso;
  min: number;
  max: number;
  /** «turnos»: juega uno a la vez (`turnoDe`). «todos»: todos juegan a la vez (`pendientes`), como en la lotería. */
  modo: "turnos" | "todos";
  /** Cuánto tiene cada uno para su jugada; al vencer, juega solo (`jugadaPorTiempo` o la primera válida). */
  relojMs: number;
  /** Cuánto «piensa» un compañero de la computadora antes de jugar (ms, por nivel). */
  pensarMs?: Partial<Record<NivelBot, [number, number]>>;
  estadoInicial(asientos: AsientoMesa[], azar: Azar, opciones?: Record<string, unknown>): E;
  /** Modo «turnos»: el asiento que juega ahora (null si terminó). */
  turnoDe(e: E): number | null;
  /** Modo «todos»: los asientos que todavía deben jugar en esta vuelta. */
  pendientes?(e: E): number[];
  jugadasValidas(e: E, asiento: number): J[];
  /** Más rápido que buscar en `jugadasValidas` (para juegos con muchas jugadas). */
  esValida?(e: E, asiento: number, j: J): boolean;
  aplicar(e: E, asiento: number, j: J, azar: Azar): E;
  terminado(e: E): ResultadoMesa | null;
  vistaPara(e: E, asiento: number | null): V;
  jugadaDeBot(e: E, asiento: number, nivel: NivelBot, azar: Azar): J;
  jugadaPorTiempo?(e: E, asiento: number, azar: Azar): J;
}

/** Dos jugadas son la misma si tienen lo mismo (las jugadas son datos simples: números, textos, listas). */
export const mismaJugada = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** ¿Vale esta jugada para este asiento ahora? */
export function jugadaValida<E, J>(juego: JuegoDeMesa<E, J, unknown>, e: E, asiento: number, j: J): boolean {
  if (juego.esValida) return juego.esValida(e, asiento, j);
  return juego.jugadasValidas(e, asiento).some((x) => mismaJugada(x, j));
}

/** ¿Quiénes tienen que jugar ahora? (en «turnos», el del turno; en «todos», los que faltan) */
export function quienesJuegan<E>(juego: JuegoDeMesa<E, unknown, unknown>, e: E): number[] {
  if (juego.terminado(e)) return [];
  if (juego.modo === "todos") return juego.pendientes ? juego.pendientes(e) : [];
  const t = juego.turnoDe(e);
  return t === null ? [] : [t];
}

/** Lo que manda la sala a cada uno sobre la mesa (la vista del juego va en `vista`). */
export type MesaVista = {
  id: string;
  vista: unknown;
  asientos: { n: number; nombre: string; bot: NivelBot | null; yo: boolean }[];
  miAsiento: number | null;
  /** Los asientos que juegan ahora (uno en «turnos»; varios en «todos»). */
  juegan: number[];
  /** Mis jugadas posibles (solo si me toca). */
  jugadas: unknown[];
  /** Cuánto falta para que el turno se juegue solo (ms). */
  relojMs: number | null;
  /** La última jugada (para animarla). */
  ultima: { asiento: number; jugada: unknown; n: number } | null;
  resultado: ResultadoMesa | null;
};
