/**
 * La generala (2 a 8): cinco dados, hasta tres tiros por turno, y la planilla de once casillas.
 *
 * - En cada turno se tiran los cinco dados; después se pueden guardar los que se quieran y volver a tirar el resto, hasta
 *   tres tiros en total. Al final se anota en una casilla libre de la planilla (o se tacha una, con cero).
 * - Las casillas: del 1 al 6 (la suma de esos dados), escalera (1-2-3-4-5 o 2-3-4-5-6) 20, full (tres y dos) 30, póker
 *   (cuatro iguales) 40, generala (cinco iguales) 50 y doble generala 100 (solo con la generala ya anotada). Si se
 *   arma en el primer tiro es «servida» y vale 5 más; la generala servida gana la partida en el acto.
 * - Son 11 vueltas; gana quien suma más.
 * - Los dados los tira el servidor. Los compañeros de la computadora eligen qué guardar contando las probabilidades de
 *   verdad (el difícil, de los dos tiros que le quedan; el normal, de uno; el fácil, a ojo y a veces se equivoca).
 */
import {
  anotar, copiar, entero, mal, pensar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";

export const CATEGORIAS_GENERALA = ["1", "2", "3", "4", "5", "6", "escalera", "full", "poker", "generala", "doble"] as const;
export type CatGenerala = (typeof CATEGORIAS_GENERALA)[number];
export const esCatGenerala = (x: unknown): x is CatGenerala => typeof x === "string" && (CATEGORIAS_GENERALA as readonly string[]).includes(x);

export const NOMBRE_CAT_GENERALA: Record<CatGenerala, string> = {
  "1": "Al 1",
  "2": "Al 2",
  "3": "Al 3",
  "4": "Al 4",
  "5": "Al 5",
  "6": "Al 6",
  escalera: "Escalera",
  full: "Full",
  poker: "Póker",
  generala: "Generala",
  doble: "Doble generala",
};
export const EXPLICA_CAT_GENERALA: Record<CatGenerala, string> = {
  "1": "La suma de los unos.",
  "2": "La suma de los doses.",
  "3": "La suma de los treses.",
  "4": "La suma de los cuatros.",
  "5": "La suma de los cincos.",
  "6": "La suma de los seises.",
  escalera: "1-2-3-4-5 o 2-3-4-5-6: 20 (servida, 25).",
  full: "Tres iguales y dos iguales: 30 (servido, 35).",
  poker: "Cuatro iguales: 40 (servido, 45).",
  generala: "Cinco iguales: 50. ¡Servida gana la partida!",
  doble: "Otra generala, con la primera ya anotada: 100.",
};

export const GENERALA = { dados: 5, tiros: 3, rondas: CATEGORIAS_GENERALA.length, turnoMs: 40_000, prepararMs: 2500, servida: 5 } as const;

/** Lo que vale una casilla con estos dados (sin contar la servida; la doble pide la generala anotada con 50). */
export function puntosGenerala(cat: CatGenerala, dados: number[], servida = false, generalaAnotada = false): number {
  const cuenta = [0, 0, 0, 0, 0, 0, 0];
  for (const d of dados) cuenta[d]++;
  const extra = servida ? GENERALA.servida : 0;
  const max = Math.max(...cuenta);
  switch (cat) {
    case "escalera": {
      const s = [...dados].sort((a, b) => a - b).join("");
      return s === "12345" || s === "23456" ? 20 + extra : 0;
    }
    case "full":
      return cuenta.includes(3) && cuenta.includes(2) ? 30 + extra : 0;
    case "poker":
      return max >= 4 ? 40 + extra : 0;
    case "generala":
      return max === 5 ? 50 : 0;
    case "doble":
      return max === 5 && generalaAnotada ? 100 : 0;
    default: {
      const v = Number(cat);
      return cuenta[v] * v;
    }
  }
}

// ---------------------------------------------------------------- el estado
export type EvGenerala =
  | { t: "tiro"; a: number; dados: number[]; quedan: boolean[]; tiro: number }
  | { t: "anoto"; a: number; cat: CatGenerala; puntos: number; servida: boolean }
  | { t: "servida"; a: number }
  | { t: "turno"; a: number }
  | { t: "fin" };

export type EstadoGenerala = ConEventos<EvGenerala> & {
  juego: "generala";
  n: number;
  bots: (Nivel | null)[];
  turno: number;
  tiros: number;
  dados: number[];
  guardados: boolean[];
  /** La planilla: null = libre; un número = anotado (0 = tachado). */
  planilla: (number | null)[][];
  /** Cuándo se acaba el turno (y entonces se juega solo), y cuándo juega el compañero. */
  turnoHasta: number;
  botEn: number | null;
  /** Turnos que se le acabó el reloj seguidos (a los 2, juega solo hasta que vuelva). */
  ausente: number[];
  fase: "preparar" | "jugando" | "fin";
  empiezaEn: number;
  servida: number | null;
  terminoAt: number | null;
};

export type JugadaGenerala = { t: "tirar"; guardar: boolean[] } | { t: "anotar"; cat: CatGenerala };

export type GeneralaVista = {
  juego: "generala";
  fase: EstadoGenerala["fase"];
  turno: number;
  yo: number | null;
  ronda: number;
  rondas: number;
  tiros: number;
  dados: number[];
  guardados: boolean[];
  restanteMs: number;
  turnoMs: number;
  planilla: (number | null)[][];
  totales: number[];
  /** Lo que valdría cada casilla libre de quien juega, con estos dados. */
  posibles: Partial<Record<CatGenerala, number>> | null;
  servida: number | null;
  ganadores: number[];
  eventos: EstadoGenerala["eventos"];
};

const total = (fila: (number | null)[]) => fila.reduce<number>((s, x) => s + (x ?? 0), 0);
const generalaAnotada = (fila: (number | null)[]) => (fila[CATEGORIAS_GENERALA.indexOf("generala")] ?? 0) > 0;
const libres = (fila: (number | null)[]) => CATEGORIAS_GENERALA.filter((_, i) => fila[i] == null);

function posibles(e: EstadoGenerala): Partial<Record<CatGenerala, number>> | null {
  if (e.fase !== "jugando" || e.tiros === 0) return null;
  const fila = e.planilla[e.turno];
  const out: Partial<Record<CatGenerala, number>> = {};
  for (const c of libres(fila)) out[c] = puntosGenerala(c, e.dados, e.tiros === 1, generalaAnotada(fila));
  return out;
}

// ---------------------------------------------------------------- la cabeza de los compañeros (las probabilidades de verdad)
/** Lo que se espera sacar en cada casilla jugando bien (para no gastar las grandes en poco). */
const BASE: Record<CatGenerala, number> = { "1": 2, "2": 4.2, "3": 6.5, "4": 8.8, "5": 11.2, "6": 13.6, escalera: 12, full: 17, poker: 14, generala: 9, doble: 3 };

/**
 * Una mano se cuenta por caras (cuántos 1, cuántos 2…) y se guarda como un número en base 6: así sumar lo que se guarda
 * y lo que sale es sumar dos números (cada cara tiene como mucho 5 dados, no hay que llevar).
 */
type Cuenta = number[];
const POT6 = [1, 6, 36, 216, 1296, 7776];
const claveDe = (c: Cuenta) => c.reduce((s, x, i) => s + x * POT6[i], 0);
const cuentaDe = (k: number): Cuenta => POT6.map((p) => Math.floor(k / p) % 6);
const FACT = [1, 1, 2, 6, 24, 120];
/** Todas las salidas de `m` dados (sin orden) con su probabilidad. */
const SALIDAS: { k: number; p: number }[][] = [];
for (let m = 0; m <= 5; m++) {
  const l: { k: number; p: number }[] = [];
  const rec = (i: number, quedan: number, c: Cuenta) => {
    if (i === 5) {
      const cc = [...c, quedan];
      l.push({ k: claveDe(cc), p: FACT[m] / cc.reduce((s, x) => s * FACT[x], 1) / 6 ** m });
      return;
    }
    for (let x = 0; x <= quedan; x++) rec(i + 1, quedan - x, [...c, x]);
  };
  rec(0, m, []);
  SALIDAS.push(l);
}
const aDados = (c: Cuenta) => c.flatMap((x, i) => new Array<number>(x).fill(i + 1));
/** Lo que se puede guardar de una mano (sin repetir): la clave y cuántos dados son. */
function partes(c: Cuenta): { k: number; m: number }[] {
  const out: { k: number; m: number }[] = [];
  const rec = (i: number, k: number, m: number) => {
    if (i === 6) {
      out.push({ k, m });
      return;
    }
    for (let x = 0; x <= c[i]; x++) rec(i + 1, k + x * POT6[i], m + x);
  };
  rec(0, 0, 0);
  return out;
}

/** El valor de anotar ahora la mejor casilla (y cuál). */
function mejorCasilla(fila: (number | null)[], dados: number[], servida: boolean, peso: number): { cat: CatGenerala; valor: number; puntos: number } {
  let mejor: { cat: CatGenerala; valor: number; puntos: number } | null = null;
  const gen = generalaAnotada(fila);
  for (const cat of libres(fila)) {
    const puntos = puntosGenerala(cat, dados, servida, gen);
    const valor = puntos - peso * BASE[cat] + (cat === "generala" && puntos ? 40 : 0);
    if (!mejor || valor > mejor.valor) mejor = { cat, valor, puntos };
  }
  return mejor ?? { cat: "1", valor: 0, puntos: 0 };
}

/** Qué guardar (o si anotar ya) con los tiros que quedan: cuenta las probabilidades de los dados que faltan. */
export function decidirGenerala(fila: (number | null)[], dados: number[], tiros: number, nivel: Nivel, azar: Azar, pesoPrueba?: number): JugadaGenerala {
  if (tiros === 0) return { t: "tirar", guardar: [false, false, false, false, false] };
  const peso = pesoPrueba ?? (nivel === "facil" ? 0.4 : 1);
  const ahora = mejorCasilla(fila, dados, tiros === 1, peso);
  if (tiros >= GENERALA.tiros) return { t: "anotar", cat: ahora.cat };
  if (nivel === "facil") {
    // a ojo: guarda el número que más se repite (o la escalera si casi está), y anota si ya tiene algo bueno
    if (ahora.puntos >= 30 || (ahora.valor > 6 && azar() < 0.5)) return { t: "anotar", cat: ahora.cat };
    const cuenta = [0, 0, 0, 0, 0, 0, 0];
    for (const d of dados) cuenta[d]++;
    let cara = 6;
    for (let v = 6; v >= 1; v--) if (cuenta[v] > cuenta[cara]) cara = v;
    if (azar() < 0.15) cara = 1 + entero(azar, 6);
    return { t: "tirar", guardar: dados.map((d) => d === cara) };
  }
  const memo0 = new Map<number, number>();
  const v0 = (k: number) => {
    let v = memo0.get(k);
    if (v === undefined) {
      v = mejorCasilla(fila, aDados(cuentaDe(k)), false, peso).valor;
      memo0.set(k, v);
    }
    return v;
  };
  const esperado = (g: { k: number; m: number }, siguiente: (k: number) => number) => {
    let s = 0;
    for (const o of SALIDAS[5 - g.m]) s += o.p * siguiente(g.k + o.k);
    return s;
  };
  const memo1 = new Map<number, number>();
  const v1 = (k: number) => {
    let v = memo1.get(k);
    if (v === undefined) {
      v = v0(k);
      for (const g of partes(cuentaDe(k))) v = Math.max(v, esperado(g, v0));
      memo1.set(k, v);
    }
    return v;
  };
  const quedan = GENERALA.tiros - tiros;
  const siguiente = nivel === "dificil" && quedan >= 2 ? v1 : v0;
  const mano: Cuenta = [0, 0, 0, 0, 0, 0];
  for (const d of dados) mano[d - 1]++;
  let mejor: { k: number; v: number } | null = null;
  for (const g of partes(mano)) {
    if (g.m === 5) continue;
    const v = esperado(g, siguiente) + (nivel === "normal" ? (azar() - 0.5) * 7 : 0);
    if (!mejor || v > mejor.v) mejor = { k: g.k, v };
  }
  if (!mejor || ahora.valor >= mejor.v) return { t: "anotar", cat: ahora.cat };
  // de lo que guarda (por caras), a qué dados (los primeros de cada valor)
  const falta = cuentaDe(mejor.k);
  return { t: "tirar", guardar: dados.map((d) => (falta[d - 1] > 0 ? (falta[d - 1]--, true) : false)) };
}

// ---------------------------------------------------------------- jugar
function tirar(e: EstadoGenerala, guardar: boolean[], t: number, azar: Azar): string | null {
  if (e.tiros >= GENERALA.tiros) return "Ya tiraste tres veces: anota en una casilla.";
  const quedan = e.tiros === 0 ? [false, false, false, false, false] : guardar.map(Boolean);
  if (quedan.every(Boolean)) return "Guardaste los cinco dados: anota en una casilla.";
  e.dados = e.dados.map((d, i) => (quedan[i] ? d : 1 + entero(azar, 6)));
  e.guardados = quedan;
  e.tiros += 1;
  anotar(e, t, { t: "tiro", a: e.turno, dados: [...e.dados], quedan, tiro: e.tiros });
  if (e.tiros === 1 && e.dados.every((d) => d === e.dados[0])) {
    e.servida = e.turno;
    const i = CATEGORIAS_GENERALA.indexOf("generala");
    if (e.planilla[e.turno][i] == null) e.planilla[e.turno][i] = 50;
    anotar(e, t, { t: "servida", a: e.turno });
    terminar(e, t);
  }
  return null;
}

function anotarCasilla(e: EstadoGenerala, cat: CatGenerala, t: number, azar: Azar): string | null {
  if (e.tiros === 0) return "Primero tira los dados.";
  const i = CATEGORIAS_GENERALA.indexOf(cat);
  const fila = e.planilla[e.turno];
  if (fila[i] != null) return "Esa casilla ya está anotada.";
  const servida = e.tiros === 1;
  const puntos = puntosGenerala(cat, e.dados, servida, generalaAnotada(fila));
  fila[i] = puntos;
  anotar(e, t, { t: "anoto", a: e.turno, cat, puntos, servida: servida && puntos > 0 && (cat === "escalera" || cat === "full" || cat === "poker") });
  pasarTurno(e, t, azar);
  return null;
}

function pasarTurno(e: EstadoGenerala, t: number, azar: Azar) {
  if (e.planilla.every((f) => f.every((x) => x != null))) {
    terminar(e, t);
    return;
  }
  let sig = e.turno;
  for (let k = 0; k < e.n; k++) {
    sig = (sig + 1) % e.n;
    if (e.planilla[sig].some((x) => x == null)) break;
  }
  e.turno = sig;
  e.tiros = 0;
  e.dados = [0, 0, 0, 0, 0];
  e.guardados = [false, false, false, false, false];
  e.turnoHasta = t + GENERALA.turnoMs;
  programarBot(e, t, azar);
  anotar(e, t, { t: "turno", a: sig });
}

function programarBot(e: EstadoGenerala, t: number, azar: Azar) {
  const nivel = e.bots[e.turno];
  e.botEn = nivel ? t + pensar(nivel, azar, e.tiros === 0 ? 0.7 : 1) : e.ausente[e.turno] >= 2 ? t + 900 : null;
}

function terminar(e: EstadoGenerala, t: number) {
  e.fase = "fin";
  e.terminoAt = t;
  e.botEn = null;
  anotar(e, t, { t: "fin" });
}

function jugarSolo(e: EstadoGenerala, t: number, azar: Azar, nivel: Nivel) {
  const quien = e.turno;
  const j = decidirGenerala(e.planilla[quien], e.dados, e.tiros, nivel, azar);
  if (j.t === "tirar") tirar(e, j.guardar, t, azar);
  else anotarCasilla(e, j.cat, t, azar);
  if (e.fase === "jugando" && e.turno === quien) {
    e.turnoHasta = t + GENERALA.turnoMs;
    programarBot(e, t, azar);
  }
}

function correr(e: EstadoGenerala, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 500 && e.fase !== "fin"; vueltas++) {
    if (e.fase === "preparar") {
      if (ahora < e.empiezaEn) break;
      e.fase = "jugando";
      e.turnoHasta = e.empiezaEn + GENERALA.turnoMs;
      programarBot(e, e.empiezaEn, azar);
      anotar(e, e.empiezaEn, { t: "turno", a: e.turno });
      cambio = true;
      continue;
    }
    const en = Math.min(e.botEn ?? Infinity, e.turnoHasta);
    if (en > ahora) break;
    cambio = true;
    const quien = e.turno;
    if (e.botEn != null && e.botEn <= e.turnoHasta) {
      jugarSolo(e, e.botEn, azar, e.bots[quien] ?? "normal");
    } else {
      // se le acabó el reloj: juega solo (como un compañero normal) y, si le pasa dos veces, sigue solo hasta que vuelva
      e.ausente[quien] += 1;
      const t = e.turnoHasta;
      while (e.fase === "jugando" && e.turno === quien) jugarSolo(e, t, azar, "normal");
    }
  }
  return cambio;
}

// ---------------------------------------------------------------- el módulo
export const generala: ModuloMesa<EstadoGenerala, JugadaGenerala, GeneralaVista> & {
  vistaPara(e: EstadoGenerala, asiento: number | null, ahora: number): GeneralaVista;
  jugadaDeBot(e: EstadoGenerala, asiento: number, nivel: Nivel, azar: Azar): JugadaGenerala | null;
} = {
  id: "generala",
  min: 2,
  max: 8,

  estadoInicial(cfg: ConfigMesa<Record<string, never>>, azar: Azar, ahora: number): EstadoGenerala {
    const n = cfg.bots.length;
    return {
      juego: "generala",
      n,
      bots: [...cfg.bots],
      turno: entero(azar, n),
      tiros: 0,
      dados: [0, 0, 0, 0, 0],
      guardados: [false, false, false, false, false],
      planilla: Array.from({ length: n }, () => new Array<number | null>(GENERALA.rondas).fill(null)),
      turnoHasta: ahora + GENERALA.prepararMs + GENERALA.turnoMs,
      botEn: null,
      ausente: new Array<number>(n).fill(0),
      fase: "preparar",
      empiezaEn: ahora + GENERALA.prepararMs,
      servida: null,
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: (e) => (e.fase === "jugando" ? e.turno : null),

  jugadasValidas(e, a) {
    if (e.fase !== "jugando" || a !== e.turno) return [];
    const out: JugadaGenerala[] = [];
    if (e.tiros < GENERALA.tiros) out.push({ t: "tirar", guardar: e.tiros === 0 ? [false, false, false, false, false] : [...e.guardados] });
    if (e.tiros > 0) for (const cat of libres(e.planilla[a])) out.push({ t: "anotar", cat });
    return out;
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (o.t === "anotar" && esCatGenerala(o.cat)) return { t: "anotar", cat: o.cat };
    if (o.t === "tirar") {
      const g = Array.isArray(o.guardar) ? o.guardar.slice(0, 5).map((v) => v === true) : [];
      while (g.length < 5) g.push(false);
      return { t: "tirar", guardar: g };
    }
    return null;
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoGenerala> {
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (e.fase !== "jugando") return mal(e.fase === "fin" ? "La partida terminó." : "Todavía no empieza.");
    if (a !== e.turno) return mal("No es tu turno.");
    e.ausente[a] = 0;
    const motivo = j.t === "tirar" ? tirar(e, j.guardar, ahora, azar) : anotarCasilla(e, j.cat, ahora, azar);
    if (motivo) return mal(motivo);
    if (e.fase === "jugando" && e.turno === a) {
      e.turnoHasta = ahora + GENERALA.turnoMs;
      programarBot(e, ahora, azar);
    }
    return { ok: true, e };
  },

  alTiempo(e0, ahora, azar) {
    const p = this.proximoCambio(e0, ahora);
    if (p == null || p > 0) return null;
    const e = copiar(e0);
    return correr(e, ahora, azar) ? e : null;
  },

  proximoCambio(e, ahora) {
    if (e.fase === "fin") return null;
    if (e.fase === "preparar") return Math.max(0, e.empiezaEn - ahora);
    return Math.max(0, Math.min(e.botEn ?? Infinity, e.turnoHasta) - ahora);
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    const totales = e.planilla.map(total);
    const valor = totales.map((t, a) => (e.servida === a ? 100_000 : t));
    const puestos = puestosPor(valor);
    const primeros = puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0);
    const titulo =
      e.servida != null
        ? `¡Generala servida! Gana @${e.servida}.`
        : primeros.length === 1
          ? `¡Ganó @${primeros[0]} con ${totales[primeros[0]]} puntos!`
          : `¡Empate! ${primeros.map((a) => `@${a}`).join(" y ")}, con ${totales[primeros[0]]}.`;
    return { puestos, puntos: totales, titulo, detalle: totales.map((t, a) => (e.servida === a ? "¡generala servida!" : `${t} puntos`)) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    if (!nivel) e.ausente[a] = 0;
    return e;
  },

  vistaPara(e, yo, ahora): GeneralaVista {
    const totales = e.planilla.map(total);
    const fin = this.terminado(e);
    return {
      juego: "generala",
      fase: e.fase,
      turno: e.turno,
      yo: yo != null && yo >= 0 && yo < e.n ? yo : null,
      ronda: Math.min(GENERALA.rondas, e.planilla[e.turno].filter((x) => x != null).length + 1),
      rondas: GENERALA.rondas,
      tiros: e.tiros,
      dados: [...e.dados],
      guardados: [...e.guardados],
      restanteMs: e.fase === "jugando" ? Math.max(0, e.turnoHasta - ahora) : e.fase === "preparar" ? Math.max(0, e.empiezaEn - ahora) : 0,
      turnoMs: GENERALA.turnoMs,
      planilla: e.planilla.map((f) => [...f]),
      totales,
      posibles: posibles(e),
      servida: e.servida,
      ganadores: fin ? fin.puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0) : [],
      eventos: e.eventos,
    };
  },

  jugadaDeBot(e, a, nivel, azar) {
    if (e.fase !== "jugando" || a !== e.turno) return null;
    return decidirGenerala(e.planilla[a], e.dados, e.tiros, nivel, azar);
  },
};
