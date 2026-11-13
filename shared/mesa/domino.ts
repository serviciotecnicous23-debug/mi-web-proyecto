/**
 * El dominó (doble seis, como se juega en Latinoamérica): de 2 a 4 jugadores, y con 4, por parejas (los asientos 0 y 2
 * contra 1 y 3). Cada uno recibe 7 fichas; con menos de 4 el resto queda en el pozo y quien no puede jugar roba. La
 * primera mano la abre el doble seis (o el doble más alto, o la ficha más alta); las demás, quien ganó la anterior.
 * Gana la mano quien se queda sin fichas (dominó) o, si nadie puede jugar (tranque), quien tiene menos puntos; se anota la
 * suma de las fichas que les quedan a los demás. Gana la partida quien llega primero a la meta (100).
 *
 * La jugada: { f: [a, b], lado: "izq" | "der" }, "robar", "pasar" o "seguir" (la mano siguiente, después de ver cómo terminó).
 */
import type { AsientoMesa, Azar, JuegoDeMesa, NivelBot, ResultadoMesa } from "../mesa";

export type Ficha = [number, number];
export type JugadaColocar = { f: Ficha; lado: "izq" | "der" };
export type JugadaDomino = JugadaColocar | "robar" | "pasar" | "seguir";
/** Una ficha en la mesa, con sus números en el orden de la fila (de izquierda a derecha). */
export type EnMesa = { izq: number; der: number; quien: number; n: number };
export type FinMano = { ganador: number | null; equipo: number | null; puntos: number; como: "domino" | "tranque" | "empate"; manos: Ficha[][] };
export type EstadoDomino = {
  asientos: AsientoMesa[];
  parejas: boolean;
  manos: Ficha[][];
  pozo: Ficha[];
  mesa: EnMesa[];
  turno: number;
  /** Pases seguidos (si pasan todos, hay tranque). */
  pases: number;
  /** Lo que se sabe: a quién le faltan qué números (porque pasó o robó con esos extremos). */
  faltan: number[][];
  /** Los puntos de cada equipo (por parejas, 2 equipos; si no, uno por asiento). */
  puntos: number[];
  meta: number;
  mano: number;
  /** La ficha con la que hay que abrir la primera mano (null: cualquiera). */
  abre: Ficha | null;
  fase: "jugando" | "finMano" | "fin";
  finMano: FinMano | null;
  colocadas: number;
};
export type VistaDomino = {
  mesa: EnMesa[];
  miMano: Ficha[];
  cuantas: number[];
  pozo: number;
  turno: number;
  puntos: number[];
  meta: number;
  mano: number;
  parejas: boolean;
  fase: EstadoDomino["fase"];
  finMano: FinMano | null;
  abre: Ficha | null;
};

export const META_DOMINO = 100;

export function todasLasFichas(): Ficha[] {
  const out: Ficha[] = [];
  for (let a = 0; a <= 6; a++) for (let b = a; b <= 6; b++) out.push([a, b]);
  return out;
}

const igual = (x: Ficha, y: Ficha) => (x[0] === y[0] && x[1] === y[1]) || (x[0] === y[1] && x[1] === y[0]);
const pips = (f: Ficha) => f[0] + f[1];
const sumaMano = (m: Ficha[]) => m.reduce((s, f) => s + pips(f), 0);
export const equipoDe = (e: { parejas: boolean }, asiento: number) => (e.parejas ? asiento % 2 : asiento);
export const extremos = (mesa: EnMesa[]): [number, number] | null => (mesa.length ? [mesa[0].izq, mesa[mesa.length - 1].der] : null);

function mezclar<T>(l: T[], azar: Azar): T[] {
  const a = [...l];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Reparte una mano nueva: 7 fichas a cada uno y el resto al pozo. */
function repartir(e: Omit<EstadoDomino, "manos" | "pozo" | "mesa" | "turno" | "pases" | "faltan" | "abre" | "fase" | "finMano" | "colocadas">, azar: Azar, empieza: number | null): EstadoDomino {
  const n = e.asientos.length;
  const fichas = mezclar(todasLasFichas(), azar);
  const manos = Array.from({ length: n }, (_, i) => fichas.slice(i * 7, i * 7 + 7));
  const pozo = n < 4 ? fichas.slice(n * 7) : [];
  let turno = empieza ?? 0;
  let abre: Ficha | null = null;
  if (empieza === null) {
    // la primera mano: el doble más alto que haya en las manos (el doble seis si está); si no hay dobles, la ficha más alta
    let mejor = -1;
    manos.forEach((m, i) =>
      m.forEach((f) => {
        // cualquier doble va antes que cualquier ficha que no lo es
        const valor = f[0] === f[1] ? 1000 + f[0] : pips(f) * 10 + Math.max(...f);
        if (valor > mejor) {
          mejor = valor;
          turno = i;
          abre = f;
        }
      }),
    );
  }
  return { ...e, manos, pozo, mesa: [], turno, pases: 0, faltan: Array.from({ length: n }, () => []), abre, fase: "jugando", finMano: null, colocadas: 0 };
}

/** Dónde puede ir una ficha: los lados que le sirven (con la mesa vacía, a la derecha). */
function lados(mesa: EnMesa[], f: Ficha): ("izq" | "der")[] {
  const x = extremos(mesa);
  if (!x) return ["der"];
  const out: ("izq" | "der")[] = [];
  if (f[0] === x[0] || f[1] === x[0]) out.push("izq");
  if ((f[0] === x[1] || f[1] === x[1]) && !(x[0] === x[1] && out.length)) out.push("der");
  return out;
}

export function colocaciones(e: EstadoDomino, asiento: number): JugadaColocar[] {
  const out: JugadaColocar[] = [];
  for (const f of e.manos[asiento]) {
    if (e.abre && !igual(f, e.abre)) continue;
    for (const lado of lados(e.mesa, f)) out.push({ f, lado });
  }
  return out;
}

function siguiente(e: EstadoDomino, a: number) {
  return (a + 1) % e.asientos.length;
}

/** Cierra la mano: quién ganó, cuántos puntos y si alguien llegó a la meta. */
function cerrarMano(e: EstadoDomino, ganador: number | null, como: FinMano["como"]): EstadoDomino {
  const manos = e.manos.map((m) => [...m]);
  const total = manos.reduce((s, m, i) => s + (i === ganador ? 0 : sumaMano(m)), 0);
  const puntos = [...e.puntos];
  let equipo: number | null = null;
  if (ganador !== null) {
    equipo = equipoDe(e, ganador);
    puntos[equipo] += total;
  }
  const finMano: FinMano = { ganador, equipo, puntos: ganador !== null ? total : 0, como, manos };
  const fin = puntos.some((p) => p >= e.meta);
  return { ...e, puntos, finMano, fase: fin ? "fin" : "finMano", turno: ganador ?? e.turno };
}

function tranque(e: EstadoDomino): EstadoDomino {
  // gana quien tiene menos puntos en la mano (por parejas, cuenta el equipo con menos entre los dos)
  const n = e.asientos.length;
  const valor = (i: number) => (e.parejas ? sumaMano(e.manos[i]) + sumaMano(e.manos[(i + 2) % 4]) : sumaMano(e.manos[i]));
  let mejor = Infinity;
  let quien: number[] = [];
  for (let i = 0; i < n; i++) {
    const v = valor(i);
    if (v < mejor) {
      mejor = v;
      quien = [i];
    } else if (v === mejor) quien.push(i);
  }
  const equipos = new Set(quien.map((i) => equipoDe(e, i)));
  if (equipos.size > 1) return cerrarMano(e, null, "empate");
  // dentro del equipo ganador, el que tiene menos
  const g = quien.sort((x, y) => sumaMano(e.manos[x]) - sumaMano(e.manos[y]))[0];
  return cerrarMano(e, g, "tranque");
}

export function aplicarDomino(e: EstadoDomino, a: number, j: JugadaDomino, azar: Azar): EstadoDomino {
  if (j === "seguir") {
    if (e.fase !== "finMano") return e;
    const base = { asientos: e.asientos, parejas: e.parejas, puntos: e.puntos, meta: e.meta, mano: e.mano + 1 };
    return repartir(base, azar, e.finMano?.ganador ?? e.turno);
  }
  if (e.fase !== "jugando" || a !== e.turno) return e;
  const x = extremos(e.mesa);
  if (j === "robar") {
    if (!e.pozo.length) return e;
    const faltan = e.faltan.map((l) => [...l]);
    if (x) for (const v of x) if (!faltan[a].includes(v)) faltan[a].push(v);
    const manos = e.manos.map((m, i) => (i === a ? [...m, e.pozo[0]] : m));
    return { ...e, manos, pozo: e.pozo.slice(1), faltan };
  }
  if (j === "pasar") {
    const faltan = e.faltan.map((l) => [...l]);
    if (x) for (const v of x) if (!faltan[a].includes(v)) faltan[a].push(v);
    const pases = e.pases + 1;
    const sig = { ...e, pases, faltan, turno: siguiente(e, a) };
    return pases >= e.asientos.length ? tranque(sig) : sig;
  }
  const { f, lado } = j;
  const mano = e.manos[a];
  const k = mano.findIndex((y) => igual(y, f));
  if (k < 0) return e;
  const mesa = [...e.mesa];
  if (!x) mesa.push({ izq: f[0], der: f[1], quien: a, n: e.colocadas });
  else if (lado === "izq") mesa.unshift(f[1] === x[0] ? { izq: f[0], der: f[1], quien: a, n: e.colocadas } : { izq: f[1], der: f[0], quien: a, n: e.colocadas });
  else mesa.push(f[0] === x[1] ? { izq: f[0], der: f[1], quien: a, n: e.colocadas } : { izq: f[1], der: f[0], quien: a, n: e.colocadas });
  const manos = e.manos.map((m, i) => (i === a ? m.filter((_, q) => q !== k) : m));
  const sig: EstadoDomino = { ...e, manos, mesa, abre: null, pases: 0, turno: siguiente(e, a), colocadas: e.colocadas + 1 };
  if (!manos[a].length) return cerrarMano(sig, a, "domino");
  return sig;
}

export function jugadasDomino(e: EstadoDomino, a: number): JugadaDomino[] {
  if (e.fase === "finMano") return a === e.turno ? ["seguir"] : [];
  if (e.fase !== "jugando" || a !== e.turno) return [];
  const c = colocaciones(e, a);
  if (c.length) return c;
  return e.pozo.length ? ["robar"] : ["pasar"];
}

// ---------------------------------------------------------------- la computadora
function jugadaBot(e: EstadoDomino, a: number, nivel: NivelBot, azar: Azar): JugadaDomino {
  const js = jugadasDomino(e, a);
  if (js.length === 1 || typeof js[0] === "string") return js[0];
  const cs = js as JugadaColocar[];
  if (nivel === "facil") return cs[Math.floor(azar() * cs.length)];
  const n = e.asientos.length;
  const rival = siguiente(e, a);
  const companero = e.parejas ? (a + 2) % 4 : -1;
  const puntuar = (c: JugadaColocar) => {
    let v = pips(c.f) * 2 + (c.f[0] === c.f[1] ? 6 : 0);
    if (nivel === "dificil") {
      const sig = aplicarDomino(e, a, c, azar);
      const x = extremos(sig.mesa);
      if (x) {
        const resto = sig.manos[a];
        // mantener opciones: cuántas de mis fichas sirven en los extremos que quedan
        v += resto.filter((f) => x.some((y) => f[0] === y || f[1] === y)).length * 3;
        // tranquear al rival que sigue: dejarle números que no tiene
        for (const y of x) if (e.faltan[rival]?.includes(y)) v += 7;
        // no cerrarle el paso al compañero
        if (companero >= 0) for (const y of x) if (e.faltan[companero]?.includes(y)) v -= 4;
      }
      if (!sig.manos[a].length) v += 1000;
      void n;
    }
    return v + azar() * 0.5;
  };
  return cs.reduce((m, c) => (puntuar(c) > puntuar(m) ? c : m), cs[0]);
}

// ---------------------------------------------------------------- el juego
export const DOMINO: JuegoDeMesa<EstadoDomino, JugadaDomino, VistaDomino> = {
  id: "domino",
  nombre: "Dominó",
  icono: "🁫",
  corto: "Doble seis, de 2 a 4, y por parejas con 4: a 100 puntos.",
  como: [
    "Cada uno recibe 7 fichas. La primera mano la abre el doble seis (o el doble más alto). Luego se juega por turnos, poniendo una ficha que case con una punta.",
    "Si no tienes ficha que case, robas del pozo (con menos de 4 jugadores) o pasas.",
    "Gana la mano quien se queda sin fichas, o si nadie puede jugar (tranque), quien tiene menos puntos. Se anota lo que les queda a los demás.",
    "Con 4 jugadores se juega por parejas: los de enfrente son compañeros. Gana quien llega primero a 100.",
  ],
  verso: { text: "Mejores son dos que uno; porque tienen mejor paga de su trabajo.", ref: "Eclesiastés 4:9" },
  min: 2,
  max: 4,
  modo: "turnos",
  relojMs: 25_000,
  pensarMs: { facil: [700, 1400], normal: [800, 1600], dificil: [900, 1800] },
  estadoInicial(asientos, azar) {
    const parejas = asientos.length === 4;
    return repartir({ asientos, parejas, puntos: parejas ? [0, 0] : asientos.map(() => 0), meta: META_DOMINO, mano: 1 }, azar, null);
  },
  turnoDe: (e) => (e.fase === "fin" ? null : e.turno),
  jugadasValidas: jugadasDomino,
  aplicar: aplicarDomino,
  terminado(e): ResultadoMesa | null {
    if (e.fase !== "fin") return null;
    const n = e.asientos.length;
    const nombre = (i: number) => e.asientos[i]?.nombre ?? `Asiento ${i + 1}`;
    const mejor = Math.max(...e.puntos);
    const equipos = e.puntos.map((p, i) => (p === mejor ? i : -1)).filter((i) => i >= 0);
    const ganadores = Array.from({ length: n }, (_, i) => i).filter((i) => equipos.includes(equipoDe(e, i)));
    const puntos = Array.from({ length: n }, (_, i) => e.puntos[equipoDe(e, i)]);
    const titulo = e.parejas ? `¡Ganó la pareja de ${ganadores.map(nombre).join(" y ")}!` : `¡Ganó ${ganadores.map(nombre).join(" y ")}!`;
    return { ganadores, puntos, detalle: puntos.map((p, i) => `${p} puntos${ganadores.includes(i) ? " · ¡a la meta!" : ""}`), titulo };
  },
  vistaPara(e, a) {
    const destapar = e.fase !== "jugando" || a === null;
    return {
      mesa: e.mesa,
      miMano: a !== null ? e.manos[a] : [],
      cuantas: e.manos.map((m) => m.length),
      pozo: e.pozo.length,
      turno: e.turno,
      puntos: e.puntos,
      meta: e.meta,
      mano: e.mano,
      parejas: e.parejas,
      fase: e.fase,
      finMano: destapar ? e.finMano : null,
      abre: e.abre,
    };
  },
  jugadaDeBot: (e, a, nivel, azar) => jugadaBot(e, a, nivel, azar),
  jugadaPorTiempo: (e, a, azar) => jugadaBot(e, a, "normal", azar),
};
