/**
 * El cuatro en raya: dos jugadores dejan caer sus fichas en un tablero de 7 columnas y 6 filas; gana quien junta cuatro
 * en línea. La computadora busca con alfa-beta (más hondo cuanto más difícil) y mira las ventanas de cuatro.
 */
import type { AsientoMesa, Azar, JuegoDeMesa, NivelBot, ResultadoMesa } from "../mesa";

export const COLUMNAS = 7;
export const FILAS = 6;
/** null: vacía; 0 o 1: la ficha de ese asiento. La casilla (fila, col) es `fila * 7 + col`, con la fila 0 abajo. */
export type Ficha = 0 | 1 | null;
export type EstadoCuatro = { t: Ficha[]; turno: 0 | 1; asientos: AsientoMesa[]; jugadas: number; linea: number[] | null; ganador: 0 | 1 | null };
/** La jugada: la columna (0 a 6). */
export type JugadaCuatro = number;
export type VistaCuatro = { t: Ficha[]; turno: 0 | 1; linea: number[] | null };

const DIRS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
] as const;

/** La fila donde cae una ficha en esa columna (null si está llena). */
export function filaLibre(t: readonly Ficha[], col: number): number | null {
  for (let f = 0; f < FILAS; f++) if (t[f * COLUMNAS + col] === null) return f;
  return null;
}

/** Las casillas de la línea de cuatro (o más) que pasa por `i`, si la hay. */
export function lineaPor(t: readonly Ficha[], i: number): number[] | null {
  const quien = t[i];
  if (quien === null) return null;
  const f0 = Math.floor(i / COLUMNAS);
  const c0 = i % COLUMNAS;
  for (const [df, dc] of DIRS) {
    const l = [i];
    for (const s of [1, -1]) {
      let f = f0 + df * s;
      let c = c0 + dc * s;
      while (f >= 0 && f < FILAS && c >= 0 && c < COLUMNAS && t[f * COLUMNAS + c] === quien) {
        l.push(f * COLUMNAS + c);
        f += df * s;
        c += dc * s;
      }
    }
    if (l.length >= 4) return l.sort((a, b) => a - b);
  }
  return null;
}

const libres = (t: readonly Ficha[]) => [3, 2, 4, 1, 5, 0, 6].filter((c) => filaLibre(t, c) !== null);

// ---------------------------------------------------------------- la computadora
/** Las 69 ventanas de cuatro casillas del tablero. */
const VENTANAS: number[][] = (() => {
  const v: number[][] = [];
  for (let f = 0; f < FILAS; f++)
    for (let c = 0; c < COLUMNAS; c++)
      for (const [df, dc] of DIRS) {
        const w: number[] = [];
        for (let k = 0; k < 4; k++) {
          const ff = f + df * k;
          const cc = c + dc * k;
          if (ff < 0 || ff >= FILAS || cc < 0 || cc >= COLUMNAS) break;
          w.push(ff * COLUMNAS + cc);
        }
        if (w.length === 4) v.push(w);
      }
  return v;
})();

function valor(t: readonly Ficha[], yo: 0 | 1): number {
  let v = 0;
  for (let f = 0; f < FILAS; f++) {
    if (t[f * COLUMNAS + 3] === yo) v += 3;
    else if (t[f * COLUMNAS + 3] === 1 - yo) v -= 3;
  }
  for (const w of VENTANAS) {
    let mias = 0;
    let suyas = 0;
    for (const i of w) {
      if (t[i] === yo) mias++;
      else if (t[i] !== null) suyas++;
    }
    if (mias && suyas) continue;
    if (mias === 3) v += 5;
    else if (mias === 2) v += 2;
    else if (suyas === 3) v -= 4;
    else if (suyas === 2) v -= 1;
  }
  return v;
}

const GANA = 1_000_000;
/** Se acabó el tiempo de pensar: la búsqueda se corta (y se usa la de la vuelta anterior). */
const CORTE = Symbol("corte");

function negamax(t: Ficha[], quien: 0 | 1, hondo: number, a: number, b: number, vacias: number, hasta: number, cuenta: { n: number }): number {
  if (vacias === 0) return 0;
  if (hondo === 0) return valor(t, quien);
  if ((++cuenta.n & 255) === 0 && Date.now() > hasta) throw CORTE;
  let mejor = -Infinity;
  for (const c of libres(t)) {
    const f = filaLibre(t, c)!;
    const i = f * COLUMNAS + c;
    t[i] = quien;
    let v: number;
    try {
      v = lineaPor(t, i) ? GANA + hondo : -negamax(t, (1 - quien) as 0 | 1, hondo - 1, -b, -a, vacias - 1, hasta, cuenta);
    } finally {
      t[i] = null;
    }
    if (v > mejor) mejor = v;
    if (mejor > a) a = mejor;
    if (a >= b) break;
  }
  return mejor;
}

const HONDO: Record<NivelBot, number> = { facil: 2, normal: 5, dificil: 9 };
/** Lo más que piensa (ms): así nunca frena al servidor. */
const TIEMPO: Record<NivelBot, number> = { facil: 30, normal: 120, dificil: 280 };
const ACIERTA: Record<NivelBot, number> = { facil: 0.45, normal: 0.85, dificil: 1 };

export function mejorColumna(t: readonly Ficha[], quien: 0 | 1, nivel: NivelBot, azar: Azar): number {
  const cols = libres(t);
  if (cols.length === 1) return cols[0];
  const tt = [...t];
  // ganar ya, o tapar al otro: hasta el fácil lo ve casi siempre
  for (const yo of [quien, (1 - quien) as 0 | 1]) {
    for (const c of cols) {
      const i = filaLibre(tt, c)! * COLUMNAS + c;
      tt[i] = yo;
      const gana = !!lineaPor(tt, i);
      tt[i] = null;
      if (gana && (yo === quien || nivel !== "facil" || azar() < 0.7)) return c;
    }
  }
  if (azar() > ACIERTA[nivel]) return cols[Math.floor(azar() * cols.length)];
  const vacias = tt.filter((x) => x === null).length;
  const hasta = Date.now() + TIEMPO[nivel];
  const cuenta = { n: 0 };
  let elegidas: number[] = [cols[0]];
  // cada vuelta mira una jugada más hondo; si se acaba el tiempo, queda la última vuelta completa
  for (let hondo = 1; hondo <= HONDO[nivel]; hondo++) {
    try {
      let mejor = -Infinity;
      let estas: number[] = [];
      for (const c of cols) {
        const i = filaLibre(tt, c)! * COLUMNAS + c;
        tt[i] = quien;
        let v: number;
        try {
          v = -negamax(tt, (1 - quien) as 0 | 1, hondo - 1, -Infinity, Infinity, vacias - 1, hasta, cuenta);
        } finally {
          tt[i] = null;
        }
        if (v > mejor) {
          mejor = v;
          estas = [c];
        } else if (v === mejor) estas.push(c);
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
export const CUATRO_EN_RAYA: JuegoDeMesa<EstadoCuatro, JugadaCuatro, VistaCuatro> = {
  id: "cuatro-en-raya",
  nombre: "Cuatro en raya",
  icono: "🔴",
  corto: "Deja caer tus fichas y junta cuatro en línea.",
  como: [
    "Dos jugadores, por turnos, dejan caer una ficha en una de las 7 columnas: cae hasta abajo.",
    "Gana quien junta cuatro en línea: de lado, de arriba abajo o en diagonal.",
    "Si se llena el tablero sin línea, es empate.",
  ],
  verso: { text: "Cuatro cosas son de las más pequeñas de la tierra, Y las mismas son más sabias que los sabios", ref: "Proverbios 30:24" },
  min: 2,
  max: 2,
  modo: "turnos",
  relojMs: 30_000,
  pensarMs: { facil: [700, 1500], normal: [900, 1900], dificil: [1100, 2300] },
  estadoInicial: (asientos) => ({ t: Array(COLUMNAS * FILAS).fill(null), turno: 0, asientos, jugadas: 0, linea: null, ganador: null }),
  turnoDe: (e) => (e.ganador !== null || e.jugadas >= COLUMNAS * FILAS ? null : e.turno),
  jugadasValidas: (e, a) => (e.ganador !== null || a !== e.turno ? [] : libres(e.t).sort((x, y) => x - y)),
  aplicar(e, a, col) {
    const f = filaLibre(e.t, col);
    if (f === null || a !== e.turno) return e;
    const t = [...e.t];
    const i = f * COLUMNAS + col;
    t[i] = e.turno;
    const linea = lineaPor(t, i);
    return { ...e, t, turno: (1 - e.turno) as 0 | 1, jugadas: e.jugadas + 1, linea, ganador: linea ? e.turno : null };
  },
  terminado(e): ResultadoMesa | null {
    const nombre = (n: number) => e.asientos[n]?.nombre ?? `Asiento ${n + 1}`;
    if (e.ganador !== null) {
      const g = e.ganador;
      return {
        ganadores: [g],
        puntos: [g === 0 ? 1 : 0, g === 1 ? 1 : 0],
        detalle: [0, 1].map((n) => (n === g ? "¡Cuatro en línea!" : "Perdió esta vez")),
        titulo: `¡Ganó ${nombre(g)}!`,
      };
    }
    if (e.jugadas >= COLUMNAS * FILAS) return { ganadores: [], puntos: [0, 0], detalle: ["Empate", "Empate"], titulo: "¡Empate! El tablero se llenó." };
    return null;
  },
  vistaPara: (e) => ({ t: e.t, turno: e.turno, linea: e.linea }),
  jugadaDeBot: (e, a, nivel, azar) => mejorColumna(e.t, a as 0 | 1, nivel, azar),
  jugadaPorTiempo: (e, a, azar) => mejorColumna(e.t, a as 0 | 1, "normal", azar),
};
