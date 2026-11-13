/**
 * Las damas (a la española): tablero de 8 × 8, 12 fichas por lado en las casillas oscuras. Los peones avanzan y comen
 * en diagonal hacia adelante; al llegar al fondo se coronan y son damas, que vuelan por la diagonal (avanzan, retroceden
 * y comen a distancia). Comer es obligatorio, y hay que comer la mayor cantidad de fichas posible.
 *
 * El tablero: 64 números, la casilla (fila, columna) es `fila * 8 + col`, la fila 0 arriba. 0 vacía; 1 peón blanco, 2
 * dama blanca (asiento 0, abajo, sube); −1 peón negro, −2 dama negra (asiento 1, arriba, baja).
 * La jugada es el camino de la ficha: [desde, hasta] o [desde, salto1, salto2, …] cuando come.
 */
import type { AsientoMesa, Azar, JuegoDeMesa, NivelBot, ResultadoMesa } from "../mesa";

export type JugadaDamas = number[];
export type EstadoDamas = {
  t: number[];
  turno: 0 | 1;
  asientos: AsientoMesa[];
  /** Jugadas seguidas solo con damas y sin comer (a las 50, tablas). */
  quietas: number;
  jugadas: number;
  ultima: { camino: number[]; comidas: number[]; corona: boolean } | null;
  /** Quién ganó (null: sigue o tablas); `tablas` si terminó sin ganador. */
  ganador: 0 | 1 | null;
  tablas: boolean;
};
export type VistaDamas = { t: number[]; turno: 0 | 1; ultima: EstadoDamas["ultima"]; fichas: [number, number]; fin: boolean };

const DIAG = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
] as const;
const dentro = (f: number, c: number) => f >= 0 && f < 8 && c >= 0 && c < 8;
const mia = (v: number, lado: 0 | 1) => (lado === 0 ? v > 0 : v < 0);
const suya = (v: number, lado: 0 | 1) => (lado === 0 ? v < 0 : v > 0);
/** Hacia dónde avanza cada lado (en filas). */
const ADELANTE = [-1, 1] as const;
export const QUIETAS_TABLAS = 50;
export const JUGADAS_MAX = 300;

export function tableroInicial(): number[] {
  const t = Array(64).fill(0);
  for (let f = 0; f < 8; f++)
    for (let c = 0; c < 8; c++) {
      if ((f + c) % 2 === 0) continue;
      if (f < 3) t[f * 8 + c] = -1;
      else if (f > 4) t[f * 8 + c] = 1;
    }
  return t;
}

/** Todas las comidas más largas que puede hacer la ficha de `desde` (caminos con al menos un salto). */
function comidasDesde(t: number[], desde: number, lado: 0 | 1): number[][] {
  const v = t[desde];
  const dama = Math.abs(v) === 2;
  const out: number[][] = [];
  const comidas = new Set<number>();
  t[desde] = 0; // la ficha que come no estorba en su propio camino
  const buscar = (pos: number, camino: number[]) => {
    let siguio = false;
    const f0 = pos >> 3;
    const c0 = pos & 7;
    for (const [df, dc] of DIAG) {
      if (!dama && df !== ADELANTE[lado]) continue; // el peón come solo hacia adelante
      if (dama) {
        let f = f0 + df;
        let c = c0 + dc;
        while (dentro(f, c) && t[f * 8 + c] === 0) {
          f += df;
          c += dc;
        }
        if (!dentro(f, c)) continue;
        const x = f * 8 + c;
        if (!suya(t[x], lado) || comidas.has(x)) continue;
        let f2 = f + df;
        let c2 = c + dc;
        while (dentro(f2, c2) && t[f2 * 8 + c2] === 0) {
          const y = f2 * 8 + c2;
          comidas.add(x);
          siguio = true;
          buscar(y, [...camino, y]);
          comidas.delete(x);
          f2 += df;
          c2 += dc;
        }
      } else {
        const f2 = f0 + 2 * df;
        const c2 = c0 + 2 * dc;
        if (!dentro(f2, c2)) continue;
        const x = (f0 + df) * 8 + (c0 + dc);
        const y = f2 * 8 + c2;
        if (!suya(t[x], lado) || comidas.has(x) || t[y] !== 0) continue;
        comidas.add(x);
        siguio = true;
        buscar(y, [...camino, y]);
        comidas.delete(x);
      }
    }
    if (!siguio && camino.length > 1) out.push(camino);
  };
  buscar(desde, [desde]);
  t[desde] = v;
  return out;
}

/** Las jugadas que valen para un lado: si puede comer, solo las comidas más largas; si no, los pasos. */
export function jugadasDamas(t: number[], lado: 0 | 1): number[][] {
  const tt = [...t];
  let comer: number[][] = [];
  let largo = 0;
  for (let i = 0; i < 64; i++) {
    if (!mia(tt[i], lado)) continue;
    for (const camino of comidasDesde(tt, i, lado)) {
      if (camino.length > largo) {
        largo = camino.length;
        comer = [camino];
      } else if (camino.length === largo) comer.push(camino);
    }
  }
  if (comer.length) return comer;
  const pasos: number[][] = [];
  for (let i = 0; i < 64; i++) {
    const v = tt[i];
    if (!mia(v, lado)) continue;
    const dama = Math.abs(v) === 2;
    for (const [df, dc] of DIAG) {
      if (!dama && df !== ADELANTE[lado]) continue;
      let f = (i >> 3) + df;
      let c = (i & 7) + dc;
      while (dentro(f, c) && tt[f * 8 + c] === 0) {
        pasos.push([i, f * 8 + c]);
        if (!dama) break;
        f += df;
        c += dc;
      }
    }
  }
  return pasos;
}

/** Las fichas que se comen en un camino (la de en medio de cada tramo). */
function comidasDe(t: number[], camino: number[], lado: 0 | 1): number[] {
  const out: number[] = [];
  for (let k = 1; k < camino.length; k++) {
    const a = camino[k - 1];
    const b = camino[k];
    const df = Math.sign((b >> 3) - (a >> 3));
    const dc = Math.sign((b & 7) - (a & 7));
    let f = (a >> 3) + df;
    let c = (a & 7) + dc;
    while (f * 8 + c !== b) {
      if (suya(t[f * 8 + c], lado)) out.push(f * 8 + c);
      f += df;
      c += dc;
    }
  }
  return out;
}

/** Mueve la ficha por su camino, quita las comidas y corona al llegar al fondo. */
function mover(t: number[], camino: number[], lado: 0 | 1): { t: number[]; comidas: number[]; corona: boolean } {
  const n = [...t];
  const comidas = comidasDe(t, camino, lado);
  const desde = camino[0];
  const hasta = camino[camino.length - 1];
  let v = n[desde];
  n[desde] = 0;
  for (const x of comidas) n[x] = 0;
  const fondo = lado === 0 ? 0 : 7;
  const corona = Math.abs(v) === 1 && hasta >> 3 === fondo;
  if (corona) v = lado === 0 ? 2 : -2;
  n[hasta] = v;
  return { t: n, comidas, corona };
}

const fichas = (t: number[]): [number, number] => [t.filter((v) => v > 0).length, t.filter((v) => v < 0).length];

// ---------------------------------------------------------------- la computadora
/** Lo que vale la posición para `lado`: las fichas, las damas, lo que avanzaron los peones y el centro. */
function valor(t: number[], lado: 0 | 1): number {
  let v = 0;
  for (let i = 0; i < 64; i++) {
    const x = t[i];
    if (!x) continue;
    const f = i >> 3;
    const c = i & 7;
    let p = Math.abs(x) === 2 ? 320 : 100;
    if (Math.abs(x) === 1) p += (x > 0 ? 7 - f : f) * 6; // el peón que avanza vale más
    if (c >= 2 && c <= 5 && f >= 2 && f <= 5) p += 6; // el centro
    if (Math.abs(x) === 1 && ((x > 0 && f === 7) || (x < 0 && f === 0))) p += 8; // la fila de atrás cuida la coronación
    v += x > 0 ? p : -p;
  }
  return lado === 0 ? v : -v;
}

const CORTE = Symbol("corte");
const GANA = 1_000_000;

function negamax(t: number[], lado: 0 | 1, hondo: number, a: number, b: number, hasta: number, cuenta: { n: number }): number {
  if ((++cuenta.n & 127) === 0 && Date.now() > hasta) throw CORTE;
  const js = jugadasDamas(t, lado);
  if (!js.length) return -GANA - hondo;
  // si hay que comer, se sigue mirando un poco más aunque se acabe la hondura (para no dejar una ficha colgada)
  const come = comidasDe(t, js[0], lado).length > 0;
  if (hondo <= 0 && (!come || hondo <= -4)) return valor(t, lado);
  let mejor = -Infinity;
  for (const j of js) {
    const v = -negamax(mover(t, j, lado).t, (1 - lado) as 0 | 1, hondo - 1, -b, -a, hasta, cuenta);
    if (v > mejor) mejor = v;
    if (mejor > a) a = mejor;
    if (a >= b) break;
  }
  return mejor;
}

const HONDO: Record<NivelBot, number> = { facil: 2, normal: 4, dificil: 8 };
const TIEMPO: Record<NivelBot, number> = { facil: 30, normal: 120, dificil: 300 };
const ACIERTA: Record<NivelBot, number> = { facil: 0.55, normal: 0.88, dificil: 1 };

export function mejorJugadaDamas(t: number[], lado: 0 | 1, nivel: NivelBot, azar: Azar): number[] {
  const js = jugadasDamas(t, lado);
  if (js.length <= 1) return js[0];
  if (azar() > ACIERTA[nivel]) return js[Math.floor(azar() * js.length)];
  const hasta = Date.now() + TIEMPO[nivel];
  const cuenta = { n: 0 };
  let elegidas = [js[0]];
  for (let hondo = 1; hondo <= HONDO[nivel]; hondo++) {
    try {
      let mejor = -Infinity;
      let estas: number[][] = [];
      for (const j of js) {
        const v = -negamax(mover(t, j, lado).t, (1 - lado) as 0 | 1, hondo - 1, -Infinity, Infinity, hasta, cuenta);
        if (v > mejor) {
          mejor = v;
          estas = [j];
        } else if (v === mejor) estas.push(j);
      }
      elegidas = estas;
      if (mejor >= GANA) break;
    } catch (err) {
      if (err !== CORTE) throw err;
      break;
    }
  }
  return elegidas[Math.floor(azar() * elegidas.length)];
}

// ---------------------------------------------------------------- el juego
export const DAMAS: JuegoDeMesa<EstadoDamas, JugadaDamas, VistaDamas> = {
  id: "damas",
  nombre: "Damas",
  icono: "⚫",
  corto: "Avanza, come y corona: la dama vuela por la diagonal.",
  como: [
    "Cada uno tiene 12 fichas en las casillas oscuras. Empiezan las blancas.",
    "Los peones avanzan en diagonal, de una casilla, y comen saltando hacia adelante. Se puede comer varias seguidas.",
    "Comer es obligatorio, y hay que comer la mayor cantidad de fichas posible.",
    "El peón que llega al fondo se corona: la dama vuela por la diagonal, adelante y atrás, y come a distancia.",
    "Gana quien deja al otro sin fichas o sin jugadas. Con 50 jugadas solo de damas y sin comer, son tablas.",
  ],
  verso: { text: "He aquí, yo vengo pronto; retén lo que tienes, para que ninguno tome tu corona.", ref: "Apocalipsis 3:11" },
  min: 2,
  max: 2,
  modo: "turnos",
  relojMs: 45_000,
  pensarMs: { facil: [800, 1600], normal: [1000, 2000], dificil: [1200, 2400] },
  estadoInicial: (asientos) => ({ t: tableroInicial(), turno: 0, asientos, quietas: 0, jugadas: 0, ultima: null, ganador: null, tablas: false }),
  turnoDe: (e) => (e.ganador !== null || e.tablas ? null : e.turno),
  jugadasValidas: (e, a) => (e.ganador !== null || e.tablas || a !== e.turno ? [] : jugadasDamas(e.t, e.turno)),
  aplicar(e, a, j) {
    if (a !== e.turno) return e;
    const lado = e.turno;
    const desde = e.t[j[0]];
    const m = mover(e.t, j, lado);
    const quietas = m.comidas.length || Math.abs(desde) === 1 ? 0 : e.quietas + 1;
    const otro = (1 - lado) as 0 | 1;
    const sinJugadas = jugadasDamas(m.t, otro).length === 0;
    const jugadas = e.jugadas + 1;
    return {
      ...e,
      t: m.t,
      turno: otro,
      quietas,
      jugadas,
      ultima: { camino: j, comidas: m.comidas, corona: m.corona },
      ganador: sinJugadas ? lado : null,
      tablas: !sinJugadas && (quietas >= QUIETAS_TABLAS || jugadas >= JUGADAS_MAX),
    };
  },
  terminado(e): ResultadoMesa | null {
    const nombre = (n: number) => e.asientos[n]?.nombre ?? `Asiento ${n + 1}`;
    const [b, n] = fichas(e.t);
    if (e.ganador !== null) {
      const g = e.ganador;
      const sinFichas = (g === 0 ? n : b) === 0;
      return {
        ganadores: [g],
        puntos: [b, n],
        detalle: [0, 1].map((x) => (x === g ? (sinFichas ? "¡Comió todas las fichas!" : "¡Dejó al otro sin jugadas!") : "Perdió esta vez")),
        titulo: `¡Ganó ${nombre(g)}!`,
      };
    }
    if (e.tablas) return { ganadores: [], puntos: [b, n], detalle: ["Tablas", "Tablas"], titulo: "¡Tablas! Nadie pudo ganar." };
    return null;
  },
  vistaPara: (e) => ({ t: e.t, turno: e.turno, ultima: e.ultima, fichas: fichas(e.t), fin: e.ganador !== null || e.tablas }),
  jugadaDeBot: (e, a, nivel, azar) => mejorJugadaDamas(e.t, a as 0 | 1, nivel, azar),
  jugadaPorTiempo: (e, a, azar) => mejorJugadaDamas(e.t, a as 0 | 1, "normal", azar),
};
