/**
 * Lo que comparten los juegos de grupo tradicionales del patio (pedido de Luis, 13 de noviembre de 2026): la lotería
 * bíblica, la generala, las escaleras de Jacob, las damas chinas, la memoria bíblica y el «Basta» bíblico.
 *
 * Cada juego es un módulo puro (sin red, sin base, sin reloj propio): recibe la hora y el azar desde afuera, así el
 * servidor decide todo y las pruebas pueden jugar partidas enteras en un instante.
 * - `estadoInicial` arma la partida (los asientos, quiénes son compañeros de la computadora y las opciones).
 * - `jugadasValidas` y `aplicar` dicen qué se puede hacer y lo hacen (lo que llega por la red se lee con `leerJugada`).
 * - `alTiempo` pone la partida al día con la hora: el cantor canta otra carta, se acaba el reloj del turno, o le toca
 *   jugar a un compañero de la computadora. `proximoCambio` dice cuándo hará falta volver a mirar.
 * - `terminado` dice quién ganó, y `vistaPara(asiento)` arma lo que ve cada uno (lo oculto nunca se manda).
 * - `jugadaDeBot(nivel)` es la jugada de un compañero de la computadora: solo con lo que un jugador podría saber.
 *
 * El estado es un objeto simple (listas y números), que se copia entero en cada jugada: nada se pisa sin querer.
 */

export type Nivel = "facil" | "normal" | "dificil";
export const NIVELES: Nivel[] = ["facil", "normal", "dificil"];
export const NOMBRE_NIVEL: Record<Nivel, string> = { facil: "Fácil", normal: "Normal", dificil: "Difícil" };
export const esNivel = (x: unknown): x is Nivel => x === "facil" || x === "normal" || x === "dificil";

/** Un número al azar en [0, 1). El servidor usa Math.random; las pruebas, un azar con semilla. */
export type Azar = () => number;

/** Un azar con semilla (xorshift32): la misma semilla da la misma partida. */
export function azarCon(semilla: number): Azar {
  let s = semilla >>> 0 || 0x9e3779b9;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

export const entero = (azar: Azar, n: number) => Math.min(n - 1, Math.floor(azar() * n));
export const entre = (azar: Azar, a: number, b: number) => a + (b - a) * azar();
export const elegir = <T>(azar: Azar, l: readonly T[]): T => l[entero(azar, l.length)];

export function mezclar<T>(l: readonly T[], azar: Azar): T[] {
  const out = [...l];
  for (let i = out.length - 1; i > 0; i--) {
    const j = entero(azar, i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Un número fijo a partir de varios (para que un compañero «recuerde» siempre lo mismo de una misma carta). */
export function mezclaFija(...n: number[]): number {
  let h = 2166136261;
  for (const x of n) {
    h ^= x | 0;
    h = Math.imul(h, 16777619);
    h ^= h >>> 13;
  }
  return (h >>> 0) / 4294967296;
}

export const copiar = <T>(x: T): T => (typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x)));

/** Cómo terminó la partida (puestos y puntos por asiento). */
export type FinMesa = {
  /** El puesto de cada asiento: 1 = ganó (en un empate, comparten el puesto). */
  puestos: number[];
  /** Los puntos de cada asiento (o lo que se mida en ese juego). */
  puntos: number[];
  /** Una línea para todos: quién ganó. */
  titulo: string;
  /** Lo de cada asiento en pocas palabras («3 parejas», «llegó a la 100»). */
  detalle: string[];
};

export type Aplicado<E> = { ok: true; e: E } | { ok: false; motivo: string };
export const mal = <E>(motivo: string): Aplicado<E> => ({ ok: false, motivo });

/** La configuración de una partida: cuántos asientos y quiénes son compañeros de la computadora (y su nivel). */
export type ConfigMesa<O> = { bots: (Nivel | null)[]; opciones?: Partial<O> };

export interface ModuloMesa<E, J, V, O = Record<string, never>> {
  id: string;
  min: number;
  max: number;
  estadoInicial(cfg: ConfigMesa<O>, azar: Azar, ahora: number): E;
  /** El asiento que tiene el turno (null si todos juegan a la vez o ya terminó). */
  turnoDe(e: E): number | null;
  jugadasValidas(e: E, asiento: number, ahora: number): J[];
  /** Lee una jugada que llegó por la red (null si no tiene la forma de una jugada de este juego). */
  leerJugada(x: unknown): J | null;
  aplicar(e: E, asiento: number, j: J, ahora: number, azar: Azar): Aplicado<E>;
  /** Pone la partida al día con la hora; null si no cambió nada. */
  alTiempo(e: E, ahora: number, azar: Azar): E | null;
  /** Dentro de cuántos milisegundos cambia algo solo (null si nada cambia sin que alguien juegue). */
  proximoCambio(e: E, ahora: number): number | null;
  terminado(e: E): FinMesa | null;
  /** Quien llega tarde o se cae: un compañero de la computadora juega por ese asiento (o la persona vuelve con null). */
  ponerBot(e: E, asiento: number, nivel: Nivel | null): E;
}

// ---------------------------------------------------------------- el ritmo de los compañeros de la computadora
/** Lo que tarda un compañero en pensar una jugada (dudan un poco, y más los fáciles). */
export function pensar(nivel: Nivel, azar: Azar, base = 1): number {
  const [a, b] = nivel === "facil" ? [1300, 3200] : nivel === "normal" ? [900, 2300] : [650, 1600];
  return Math.round(entre(azar, a, b) * base);
}

/** Los compañeros de la computadora: siempre con 🤖, nunca se hacen pasar por personas. */
export const NOMBRES_BOT = ["Rubén", "Débora", "Simeón", "Ana", "Josías", "Priscila", "Bernabé", "Lidia", "Gedeón", "Febe", "Caleb", "Abigail"];
export const nombreDeBot = (i: number) => `${NOMBRES_BOT[((i % NOMBRES_BOT.length) + NOMBRES_BOT.length) % NOMBRES_BOT.length]} 🤖`;

// ---------------------------------------------------------------- los eventos (para animar en la pantalla)
/**
 * Lo que pasó, en orden y con número: la pantalla anima solo lo que todavía no vio (un dado que rueda, una ficha que
 * salta, una carta que se da vuelta). Se guardan los últimos.
 */
export const EVENTOS_GUARDADOS = 24;
export type ConEventos<Ev> = { ev: number; eventos: (Ev & { n: number; at: number })[] };
type EventoDe<S> = S extends { eventos: (infer X)[] } ? X : never;
type SinNumero<T> = T extends unknown ? Omit<T, "n" | "at"> : never;
export function anotar<S extends { ev: number; eventos: { n: number; at: number }[] }>(e: S, ahora: number, x: SinNumero<EventoDe<S>>) {
  e.ev += 1;
  e.eventos.push({ ...(x as object), n: e.ev, at: ahora } as EventoDe<S>);
  if (e.eventos.length > EVENTOS_GUARDADOS) e.eventos.splice(0, e.eventos.length - EVENTOS_GUARDADOS);
}

/** Los puestos a partir de una medida (más es mejor), con empates que comparten puesto. */
export function puestosPor(valores: number[], desempate?: number[]): number[] {
  const idx = valores.map((_, i) => i);
  const clave = (i: number) => [valores[i], desempate ? desempate[i] : 0] as const;
  idx.sort((a, b) => clave(b)[0] - clave(a)[0] || clave(b)[1] - clave(a)[1]);
  const puestos = new Array<number>(valores.length).fill(0);
  idx.forEach((i, k) => {
    const prev = k > 0 ? idx[k - 1] : -1;
    puestos[i] = prev >= 0 && clave(prev)[0] === clave(i)[0] && clave(prev)[1] === clave(i)[1] ? puestos[prev] : k + 1;
  });
  return puestos;
}
