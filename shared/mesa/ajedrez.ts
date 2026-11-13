/**
 * El ajedrez, con sus reglas completas: el enroque, la captura al paso, la coronación (dama, torre, alfil o caballo), el
 * jaque, el jaque mate, el ahogado y las tablas (50 jugadas sin comer ni mover un peón, tres veces la misma posición o sin
 * piezas para dar mate). La computadora busca con alfa-beta, mira las capturas hasta que se calman y piensa con un
 * límite de tiempo (para no frenar al servidor).
 *
 * El tablero: 64 números, la casilla (fila, col) es `fila * 8 + col`, con la fila 0 arriba (la octava, la de las negras).
 * 0 vacía; las blancas (asiento 0) en positivo y las negras (asiento 1) en negativo: 1 peón, 2 caballo, 3 alfil, 4 torre,
 * 5 dama y 6 rey. La jugada se escribe «e2e4» (de dónde a dónde), y al coronar con la pieza: «e7e8q» (q dama, r torre,
 * b alfil, n caballo).
 */
import type { AsientoMesa, Azar, JuegoDeMesa, NivelBot, ResultadoMesa } from "../mesa";

export const PEON = 1;
export const CABALLO = 2;
export const ALFIL = 3;
export const TORRE = 4;
export const DAMA = 5;
export const REY = 6;

export type JugadaAjedrez = string;
export type FinAjedrez = { ganador: 0 | 1 | null; como: "mate" | "ahogado" | "50" | "repeticion" | "material" | "largo" };
export type EstadoAjedrez = {
  t: number[];
  turno: 0 | 1;
  asientos: AsientoMesa[];
  /** Los enroques que quedan: «KQkq» (K y Q las blancas, k y q las negras). */
  enroques: string;
  /** La casilla donde se puede comer al paso (null si no). */
  alPaso: number | null;
  /** Medias jugadas sin comer ni mover un peón (a las 100, tablas). */
  medio: number;
  jugadas: number;
  /** Cuántas veces se vio cada posición (a las tres, tablas). */
  repes: Record<string, number>;
  ultima: { de: number; a: number; come: boolean; jaque: boolean; enroque: boolean; corona: number } | null;
  /** Las piezas que comió cada lado (el tipo, del 1 al 5). */
  comidas: [number[], number[]];
  fin: FinAjedrez | null;
};
export type VistaAjedrez = {
  t: number[];
  turno: 0 | 1;
  ultima: EstadoAjedrez["ultima"];
  /** La casilla del rey en jaque (del que juega ahora), o null. */
  jaque: number | null;
  comidas: [number[], number[]];
  fin: FinAjedrez | null;
};

type Pos = { t: number[]; turno: 0 | 1; enroques: string; alPaso: number | null };
type Mov = { de: number; a: number; corona: number; alPaso: boolean; enroque: boolean; come: number };

const SALTOS_CABALLO = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
] as const;
const PASOS_REY = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;
const DIAGONALES = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
] as const;
const RECTAS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;
const dentro = (f: number, c: number) => f >= 0 && f < 8 && c >= 0 && c < 8;
const signo = (lado: 0 | 1) => (lado === 0 ? 1 : -1);

export const nombreCasilla = (i: number) => `${"abcdefgh"[i & 7]}${8 - (i >> 3)}`;
export const casillaDe = (s: string) => (8 - Number(s[1])) * 8 + "abcdefgh".indexOf(s[0]);
const LETRA_CORONA: Record<number, string> = { [DAMA]: "q", [TORRE]: "r", [ALFIL]: "b", [CABALLO]: "n" };
const CORONA_DE: Record<string, number> = { q: DAMA, r: TORRE, b: ALFIL, n: CABALLO };
const texto = (m: Mov) => `${nombreCasilla(m.de)}${nombreCasilla(m.a)}${m.corona ? LETRA_CORONA[m.corona] : ""}`;

export function tableroInicial(): number[] {
  const fila = [TORRE, CABALLO, ALFIL, DAMA, REY, ALFIL, CABALLO, TORRE];
  const t = Array(64).fill(0);
  for (let c = 0; c < 8; c++) {
    t[c] = -fila[c];
    t[8 + c] = -PEON;
    t[48 + c] = PEON;
    t[56 + c] = fila[c];
  }
  return t;
}

/** Una posición escrita en FEN (para las pruebas y los problemas). */
export function desdeFen(fen: string): Pos {
  const [tab, turno, enroques, alPaso] = fen.trim().split(/\s+/);
  const t: number[] = [];
  const piezas: Record<string, number> = { p: PEON, n: CABALLO, b: ALFIL, r: TORRE, q: DAMA, k: REY };
  for (const ch of tab.replace(/\//g, "")) {
    if (/\d/.test(ch)) for (let k = 0; k < Number(ch); k++) t.push(0);
    else t.push(ch === ch.toUpperCase() ? piezas[ch.toLowerCase()] : -piezas[ch]);
  }
  return { t, turno: turno === "b" ? 1 : 0, enroques: enroques === "-" ? "" : enroques, alPaso: alPaso && alPaso !== "-" ? casillaDe(alPaso) : null };
}

/** ¿Ataca algún pieza de `por` la casilla `i`? */
export function atacada(t: number[], i: number, por: 0 | 1): boolean {
  const s = signo(por);
  const f0 = i >> 3;
  const c0 = i & 7;
  // un peón blanco ataca hacia arriba: la casilla la atacan los peones blancos de la fila de abajo
  const pf = por === 0 ? f0 + 1 : f0 - 1;
  for (const dc of [-1, 1]) if (dentro(pf, c0 + dc) && t[pf * 8 + c0 + dc] === s * PEON) return true;
  for (const [df, dc] of SALTOS_CABALLO) if (dentro(f0 + df, c0 + dc) && t[(f0 + df) * 8 + c0 + dc] === s * CABALLO) return true;
  for (const [df, dc] of PASOS_REY) if (dentro(f0 + df, c0 + dc) && t[(f0 + df) * 8 + c0 + dc] === s * REY) return true;
  for (const [df, dc] of DIAGONALES) {
    let f = f0 + df;
    let c = c0 + dc;
    while (dentro(f, c)) {
      const v = t[f * 8 + c];
      if (v) {
        if (v === s * ALFIL || v === s * DAMA) return true;
        break;
      }
      f += df;
      c += dc;
    }
  }
  for (const [df, dc] of RECTAS) {
    let f = f0 + df;
    let c = c0 + dc;
    while (dentro(f, c)) {
      const v = t[f * 8 + c];
      if (v) {
        if (v === s * TORRE || v === s * DAMA) return true;
        break;
      }
      f += df;
      c += dc;
    }
  }
  return false;
}

const reyDe = (t: number[], lado: 0 | 1) => t.indexOf(signo(lado) * REY);
export const enJaque = (t: number[], lado: 0 | 1) => {
  const r = reyDe(t, lado);
  return r >= 0 && atacada(t, r, (1 - lado) as 0 | 1);
};

/** Las jugadas posibles sin mirar si dejan al rey en jaque (eso se mira después). */
function pseudo(p: Pos, soloCapturas = false): Mov[] {
  const { t, turno } = p;
  const s = signo(turno);
  const out: Mov[] = [];
  const add = (de: number, a: number, extra: Partial<Mov> = {}) => {
    const come = extra.alPaso ? PEON : Math.abs(t[a]);
    if (soloCapturas && !come && !extra.corona) return;
    out.push({ de, a, corona: 0, alPaso: false, enroque: false, come, ...extra });
  };
  for (let i = 0; i < 64; i++) {
    const v = t[i] * s;
    if (v <= 0) continue;
    const f0 = i >> 3;
    const c0 = i & 7;
    if (v === PEON) {
      const df = turno === 0 ? -1 : 1;
      const inicio = turno === 0 ? 6 : 1;
      const fondo = turno === 0 ? 0 : 7;
      const f1 = f0 + df;
      const coronas = (a: number, extra: Partial<Mov> = {}) => {
        if (f1 === fondo) for (const k of [DAMA, CABALLO, TORRE, ALFIL]) add(i, a, { ...extra, corona: k });
        else add(i, a, extra);
      };
      if (dentro(f1, c0) && !t[f1 * 8 + c0]) {
        coronas(f1 * 8 + c0);
        const f2 = f0 + 2 * df;
        if (f0 === inicio && !t[f2 * 8 + c0] && !soloCapturas) add(i, f2 * 8 + c0);
      }
      for (const dc of [-1, 1]) {
        const c = c0 + dc;
        if (!dentro(f1, c)) continue;
        const a = f1 * 8 + c;
        if (t[a] * s < 0) coronas(a);
        else if (a === p.alPaso) add(i, a, { alPaso: true });
      }
      continue;
    }
    if (v === CABALLO || v === REY) {
      for (const [df, dc] of v === CABALLO ? SALTOS_CABALLO : PASOS_REY) {
        const f = f0 + df;
        const c = c0 + dc;
        if (dentro(f, c) && t[f * 8 + c] * s <= 0) add(i, f * 8 + c);
      }
      if (v === REY && !soloCapturas) {
        // el enroque: el rey y la torre sin mover, nada en medio, y el rey ni en jaque ni pasando por casillas atacadas
        const otro = (1 - turno) as 0 | 1;
        const base = turno === 0 ? 56 : 0;
        const [corto, largo] = turno === 0 ? ["K", "Q"] : ["k", "q"];
        if (i === base + 4 && !atacada(t, i, otro)) {
          if (p.enroques.includes(corto) && t[base + 7] === s * TORRE && !t[base + 5] && !t[base + 6] && !atacada(t, base + 5, otro) && !atacada(t, base + 6, otro))
            add(i, base + 6, { enroque: true });
          if (p.enroques.includes(largo) && t[base] === s * TORRE && !t[base + 1] && !t[base + 2] && !t[base + 3] && !atacada(t, base + 3, otro) && !atacada(t, base + 2, otro))
            add(i, base + 2, { enroque: true });
        }
      }
      continue;
    }
    const dirs = v === ALFIL ? DIAGONALES : v === TORRE ? RECTAS : [...DIAGONALES, ...RECTAS];
    for (const [df, dc] of dirs) {
      let f = f0 + df;
      let c = c0 + dc;
      while (dentro(f, c)) {
        const x = t[f * 8 + c];
        if (x * s > 0) break;
        add(i, f * 8 + c);
        if (x) break;
        f += df;
        c += dc;
      }
    }
  }
  return out;
}

/** La posición después de la jugada (no mira si es legal). */
function hacer(p: Pos, m: Mov): Pos {
  const t = [...p.t];
  const s = signo(p.turno);
  let v = t[m.de];
  t[m.de] = 0;
  if (m.alPaso) t[m.a + (p.turno === 0 ? 8 : -8)] = 0;
  if (m.corona) v = s * m.corona;
  t[m.a] = v;
  if (m.enroque) {
    const base = p.turno === 0 ? 56 : 0;
    if (m.a === base + 6) {
      t[base + 5] = t[base + 7];
      t[base + 7] = 0;
    } else {
      t[base + 3] = t[base];
      t[base] = 0;
    }
  }
  let enroques = p.enroques;
  if (enroques) {
    const quitar = (k: string) => (enroques = enroques.replace(k, ""));
    if (Math.abs(p.t[m.de]) === REY) {
      if (p.turno === 0) {
        quitar("K");
        quitar("Q");
      } else {
        quitar("k");
        quitar("q");
      }
    }
    for (const x of [m.de, m.a]) {
      if (x === 63) quitar("K");
      if (x === 56) quitar("Q");
      if (x === 7) quitar("k");
      if (x === 0) quitar("q");
    }
  }
  const salto = Math.abs(p.t[m.de]) === PEON && Math.abs(m.a - m.de) === 16;
  return { t, turno: (1 - p.turno) as 0 | 1, enroques, alPaso: salto ? (m.a + m.de) / 2 : null };
}

function legales(p: Pos): Mov[] {
  return pseudo(p).filter((m) => !enJaque(hacer(p, m).t, p.turno));
}

/** Las jugadas que valen, escritas («e2e4», «e7e8q»). */
export const jugadasDe = (p: Pos) => legales(p).map(texto);

/** ¿Quedan piezas para dar mate? (rey contra rey, o con un solo caballo o alfil, o alfiles del mismo color, no alcanzan) */
function sinMaterial(t: number[]): boolean {
  const otras = t.map((v, i) => ({ v: Math.abs(v), i })).filter((x) => x.v && x.v !== REY);
  if (otras.some((x) => x.v === PEON || x.v === TORRE || x.v === DAMA)) return false;
  if (otras.length <= 1) return true;
  return otras.every((x) => x.v === ALFIL) && new Set(otras.map((x) => ((x.i >> 3) + (x.i & 7)) % 2)).size === 1;
}

const clave = (p: Pos) => `${p.t.join(",")}|${p.turno}|${p.enroques}|${p.alPaso ?? "-"}`;
const pos = (e: EstadoAjedrez): Pos => ({ t: e.t, turno: e.turno, enroques: e.enroques, alPaso: e.alPaso });
export const JUGADAS_MAX = 400;

// ---------------------------------------------------------------- la computadora
const VALOR = [0, 100, 320, 330, 500, 900, 0];
// las tablas de casillas (desde las blancas, con la octava fila arriba)
const T_PEON = [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0];
const T_CABALLO = [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50];
const T_ALFIL = [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20];
const T_TORRE = [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0];
const T_DAMA = [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20];
const T_REY = [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20];
const T_REY_FINAL = [-50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50];
const TABLAS = [[], T_PEON, T_CABALLO, T_ALFIL, T_TORRE, T_DAMA, T_REY];

/** Lo que vale la posición para el que juega (en centésimos de peón). */
function valorar(p: Pos): number {
  let v = 0;
  let piezas = 0;
  for (const x of p.t) if (Math.abs(x) >= CABALLO && Math.abs(x) <= DAMA) piezas += VALOR[Math.abs(x)];
  const final = piezas <= 1600;
  for (let i = 0; i < 64; i++) {
    const x = p.t[i];
    if (!x) continue;
    const k = Math.abs(x);
    const casilla = x > 0 ? i : (7 - (i >> 3)) * 8 + (i & 7);
    const tabla = k === REY && final ? T_REY_FINAL : TABLAS[k];
    const s = VALOR[k] + tabla[casilla];
    v += x > 0 ? s : -s;
  }
  return p.turno === 0 ? v : -v;
}

const MATE = 100_000;
const CORTE = Symbol("corte");
type Busqueda = { hasta: number; n: number };

const orden = (a: Mov, b: Mov) => b.come * 10 + b.corona * 9 - (a.come * 10 + a.corona * 9);

function calma(p: Pos, a: number, b: number, hondo: number, bq: Busqueda): number {
  if ((++bq.n & 1023) === 0 && Date.now() > bq.hasta) throw CORTE;
  const quieto = valorar(p);
  if (quieto >= b) return quieto;
  if (quieto > a) a = quieto;
  if (hondo <= 0) return quieto;
  const ms = pseudo(p, true).sort(orden);
  for (const m of ms) {
    const q = hacer(p, m);
    if (enJaque(q.t, p.turno)) continue;
    const v = -calma(q, -b, -a, hondo - 1, bq);
    if (v >= b) return v;
    if (v > a) a = v;
  }
  return a;
}

function negamax(p: Pos, hondo: number, a: number, b: number, ply: number, bq: Busqueda): number {
  if ((++bq.n & 1023) === 0 && Date.now() > bq.hasta) throw CORTE;
  if (hondo <= 0) return calma(p, a, b, 6, bq);
  const ms = pseudo(p).sort(orden);
  let hubo = false;
  let mejor = -Infinity;
  for (const m of ms) {
    const q = hacer(p, m);
    if (enJaque(q.t, p.turno)) continue;
    hubo = true;
    const v = -negamax(q, hondo - 1, -b, -a, ply + 1, bq);
    if (v > mejor) mejor = v;
    if (mejor > a) a = mejor;
    if (a >= b) break;
  }
  if (!hubo) return enJaque(p.t, p.turno) ? -MATE + ply : 0;
  return mejor;
}

const HONDO: Record<NivelBot, number> = { facil: 1, normal: 3, dificil: 6 };
const TIEMPO: Record<NivelBot, number> = { facil: 40, normal: 160, dificil: 380 };
/** El fácil a veces juega cualquier cosa, y elige entre jugadas «parecidas» (hasta tantos centésimos de la mejor). */
const AL_AZAR: Record<NivelBot, number> = { facil: 0.3, normal: 0.04, dificil: 0 };
const MARGEN: Record<NivelBot, number> = { facil: 160, normal: 25, dificil: 0 };

export function mejorJugadaAjedrez(p: Pos, nivel: NivelBot, azar: Azar): string {
  const ms = legales(p);
  if (!ms.length) return "";
  if (ms.length === 1 || azar() < AL_AZAR[nivel]) return texto(ms[Math.floor(azar() * ms.length)]);
  const bq: Busqueda = { hasta: Date.now() + TIEMPO[nivel], n: 0 };
  let puntos = new Map<Mov, number>(ms.map((m) => [m, 0]));
  let raiz = [...ms].sort(orden);
  for (let hondo = 1; hondo <= HONDO[nivel]; hondo++) {
    try {
      const estos = new Map<Mov, number>();
      let a = -Infinity;
      for (const m of raiz) {
        // con margen, se miran también las jugadas casi tan buenas (para elegir entre ellas)
        const v = -negamax(hacer(p, m), hondo - 1, -Infinity, -(a - MARGEN[nivel] - 1), 1, bq);
        estos.set(m, v);
        if (v > a) a = v;
      }
      puntos = estos;
      raiz = [...raiz].sort((x, y) => (estos.get(y) ?? 0) - (estos.get(x) ?? 0));
      if (a >= MATE - 100) break;
    } catch (err) {
      if (err !== CORTE) throw err;
      break;
    }
  }
  const mejor = Math.max(...puntos.values());
  const buenas = [...puntos].filter(([, v]) => v >= mejor - MARGEN[nivel]).map(([m]) => m);
  return texto(buenas[Math.floor(azar() * buenas.length)]);
}

// ---------------------------------------------------------------- el juego
function fin(e: EstadoAjedrez, p: Pos): FinAjedrez | null {
  const ms = legales(p);
  if (!ms.length) return enJaque(p.t, p.turno) ? { ganador: (1 - p.turno) as 0 | 1, como: "mate" } : { ganador: null, como: "ahogado" };
  if (e.medio >= 100) return { ganador: null, como: "50" };
  if ((e.repes[clave(p)] ?? 0) >= 3) return { ganador: null, como: "repeticion" };
  if (sinMaterial(p.t)) return { ganador: null, como: "material" };
  if (e.jugadas >= JUGADAS_MAX) return { ganador: null, como: "largo" };
  return null;
}

const TABLAS_TEXTO: Record<FinAjedrez["como"], string> = {
  mate: "¡Jaque mate!",
  ahogado: "Tablas: el rey quedó ahogado (sin jugadas y sin jaque).",
  "50": "Tablas: 50 jugadas sin comer ni mover un peón.",
  repeticion: "Tablas: la misma posición tres veces.",
  material: "Tablas: no quedan piezas para dar mate.",
  largo: "Tablas: la partida fue demasiado larga.",
};

export function estadoDesde(p: Pos, asientos: AsientoMesa[]): EstadoAjedrez {
  const e: EstadoAjedrez = { ...p, asientos, medio: 0, jugadas: 0, repes: { [clave(p)]: 1 }, ultima: null, comidas: [[], []], fin: null };
  return { ...e, fin: fin(e, p) };
}

export const AJEDREZ: JuegoDeMesa<EstadoAjedrez, JugadaAjedrez, VistaAjedrez> = {
  id: "ajedrez",
  nombre: "Ajedrez",
  icono: "♟️",
  corto: "El juego de la estrategia: da jaque mate al rey.",
  como: [
    "Dos jugadores: blancas y negras. Empiezan las blancas. Cada pieza se mueve a su manera; toca una tuya y verás adónde puede ir.",
    "Se vale el enroque, comer al paso y coronar el peón que llega al fondo (dama, torre, alfil o caballo).",
    "Gana quien da jaque mate: el rey atacado y sin escape. Hay tablas si un rey queda ahogado, con la misma posición tres veces, con 50 jugadas sin comer ni mover un peón o sin piezas para dar mate.",
  ],
  verso: { text: "Porque con ingenio harás la guerra, Y en la multitud de consejeros está la victoria.", ref: "Proverbios 24:6" },
  min: 2,
  max: 2,
  modo: "turnos",
  relojMs: 60_000,
  pensarMs: { facil: [700, 1500], normal: [900, 1800], dificil: [800, 1600] },
  estadoInicial: (asientos) => estadoDesde({ t: tableroInicial(), turno: 0, enroques: "KQkq", alPaso: null }, asientos),
  turnoDe: (e) => (e.fin ? null : e.turno),
  jugadasValidas: (e, a) => (e.fin || a !== e.turno ? [] : jugadasDe(pos(e))),
  aplicar(e, a, j) {
    if (e.fin || a !== e.turno) return e;
    const p = pos(e);
    const m = legales(p).find((x) => texto(x) === j);
    if (!m) return e;
    const q = hacer(p, m);
    const peon = Math.abs(e.t[m.de]) === PEON;
    const comidas: [number[], number[]] = [[...e.comidas[0]], [...e.comidas[1]]];
    if (m.come) comidas[e.turno].push(m.come);
    const k = clave(q);
    const sig: EstadoAjedrez = {
      ...e,
      ...q,
      medio: m.come || peon ? 0 : e.medio + 1,
      jugadas: e.jugadas + 1,
      repes: { ...e.repes, [k]: (e.repes[k] ?? 0) + 1 },
      ultima: { de: m.de, a: m.a, come: !!m.come, jaque: enJaque(q.t, q.turno), enroque: m.enroque, corona: m.corona },
      comidas,
      fin: null,
    };
    return { ...sig, fin: fin(sig, q) };
  },
  terminado(e): ResultadoMesa | null {
    if (!e.fin) return null;
    const nombre = (n: number) => e.asientos[n]?.nombre ?? `Asiento ${n + 1}`;
    const g = e.fin.ganador;
    if (g !== null)
      return { ganadores: [g], puntos: [g === 0 ? 1 : 0, g === 1 ? 1 : 0], detalle: [0, 1].map((n) => (n === g ? "¡Jaque mate!" : "Recibió el mate")), titulo: `¡Jaque mate! Ganó ${nombre(g)}.` };
    return { ganadores: [], puntos: [0, 0], detalle: ["Tablas", "Tablas"], titulo: TABLAS_TEXTO[e.fin.como] };
  },
  vistaPara: (e) => ({ t: e.t, turno: e.turno, ultima: e.ultima, jaque: !e.fin && enJaque(e.t, e.turno) ? reyDe(e.t, e.turno) : e.fin?.como === "mate" ? reyDe(e.t, e.turno) : null, comidas: e.comidas, fin: e.fin }),
  jugadaDeBot: (e, _a, nivel, azar) => mejorJugadaAjedrez(pos(e), nivel, azar),
  // si se acaba el reloj, se juega una jugada sensata (no una cualquiera)
  jugadaPorTiempo: (e, _a, azar) => mejorJugadaAjedrez(pos(e), "normal", azar),
};

export { CORONA_DE };
