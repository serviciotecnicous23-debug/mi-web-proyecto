/**
 * La lotería bíblica (2 a 12): la lotería de siempre con 54 figuras propias de la Biblia.
 *
 * - Cada asiento recibe una tabla de 4 × 4 con 16 figuras distintas (al azar, del servidor).
 * - El cantor saca las cartas de la baraja revuelta, una cada pocos segundos («lento», «normal» o «rápido»), y anima
 *   cada una con su copla y su versículo. El orden de la baraja nunca sale del servidor.
 * - Cada uno marca en su tabla las figuras que ya salieron (con su frijolito), cuando quiera: no hay que ser el más
 *   rápido en marcar, pero sí en cantar.
 * - Quien completa la figura de la partida (una línea, las cuatro esquinas, el centro o la tabla llena) canta
 *   «¡Lotería!». El servidor lo comprueba: si es verdad, gana (y quien también la completa en el segundo y medio que
 *   sigue, empata); si no, es una «lotería falsa» y espera dos cartas sin poder cantar.
 * - Si se acaba la baraja y nadie canta en 20 segundos, gana quien quedó más cerca.
 * - Los compañeros de la computadora marcan con su ritmo (a veces se les pasa una y la marcan después) y cantan cuando
 *   la completan; los difíciles, rapidísimo.
 */
import {
  anotar, copiar, entero, entre, mal, mezclar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";
import { TOTAL_CARTAS } from "./loteria-cartas";

export type ModoLoteria = "linea" | "esquinas" | "centro" | "llena";
export type RitmoLoteria = "lento" | "normal" | "rapido";
export type OpcionesLoteria = { modo: ModoLoteria; ritmo: RitmoLoteria };

export const MODOS_LOTERIA: Record<ModoLoteria, { nombre: string; explica: string }> = {
  linea: { nombre: "Una línea", explica: "Cuatro en fila: de lado, de arriba abajo o en diagonal." },
  esquinas: { nombre: "Las cuatro esquinas", explica: "Las cuatro figuras de las esquinas." },
  centro: { nombre: "El centro", explica: "Las cuatro figuras del centro de la tabla." },
  llena: { nombre: "La tabla llena", explica: "Las dieciséis figuras de la tabla." },
};
export const RITMOS_LOTERIA: Record<RitmoLoteria, { nombre: string; ms: number }> = {
  lento: { nombre: "Lento", ms: 8000 },
  normal: { nombre: "Normal", ms: 6000 },
  rapido: { nombre: "Rápido", ms: 4200 },
};
export const esModoLoteria = (x: unknown): x is ModoLoteria => typeof x === "string" && x in MODOS_LOTERIA;
export const esRitmoLoteria = (x: unknown): x is RitmoLoteria => typeof x === "string" && x in RITMOS_LOTERIA;

export const LOTERIA = {
  lado: 4,
  casillas: 16,
  prepararMs: 4000,
  /** Lo que dura el «¡Lotería!» en la pantalla: quien también la completa en ese rato, empata. */
  revelarMs: 1600,
  /** Después de la última carta, lo que se espera a que alguien cante. */
  finalMs: 20_000,
  /** Una lotería falsa: tantas cartas sin poder cantar. */
  castigoCartas: 2,
} as const;

const FILAS = [0, 1, 2, 3].map((f) => [0, 1, 2, 3].map((c) => f * 4 + c));
const COLUMNAS = [0, 1, 2, 3].map((c) => [0, 1, 2, 3].map((f) => f * 4 + c));
export const PATRONES_LOTERIA: Record<ModoLoteria, number[][]> = {
  linea: [...FILAS, ...COLUMNAS, [0, 5, 10, 15], [3, 6, 9, 12]],
  esquinas: [[0, 3, 12, 15]],
  centro: [[5, 6, 9, 10]],
  llena: [[...Array(16).keys()]],
};

/** El patrón completo de la tabla (si hay uno) y cuánto falta para el más cercano. */
export function patronCompleto(marcas: boolean[], modo: ModoLoteria): number[] | null {
  return PATRONES_LOTERIA[modo].find((p) => p.every((k) => marcas[k])) ?? null;
}
export function faltanLoteria(marcas: boolean[], modo: ModoLoteria): number {
  return Math.min(...PATRONES_LOTERIA[modo].map((p) => p.filter((k) => !marcas[k]).length));
}

// ---------------------------------------------------------------- el estado (solo el servidor lo tiene entero)
export type FaseLoteria = "preparar" | "cantando" | "revelar" | "fin";
export type EvLoteria = { t: "carta"; carta: number; i: number } | { t: "loteria"; a: number } | { t: "falsa"; a: number } | { t: "fin" };
type Pendiente = { a: number; k: number; en: number };

export type EstadoLoteria = ConEventos<EvLoteria> & {
  juego: "loteria";
  n: number;
  bots: (Nivel | null)[];
  modo: ModoLoteria;
  ritmoMs: number;
  /** La baraja revuelta (índices de CARTAS_LOTERIA): solo se ve lo que ya salió. */
  baraja: number[];
  cantadas: number;
  /** Cuándo sale la primera carta (las siguientes, cada `ritmoMs`). */
  inicio: number;
  tablas: number[][];
  marcas: boolean[][];
  /** Hasta qué carta (cuántas cantadas) no puede cantar quien cantó una falsa. */
  castigo: number[];
  fase: FaseLoteria;
  revelarHasta: number | null;
  finEn: number | null;
  ganadores: number[];
  patron: (number[] | null)[];
  /** Las marcas que van a poner los compañeros de la computadora, y cuándo cantan. */
  pend: Pendiente[];
  gritos: (number | null)[];
  terminoAt: number | null;
};

export type JugadaLoteria = { t: "marcar"; k: number } | { t: "loteria" };

export type LoteriaVista = {
  juego: "loteria";
  fase: FaseLoteria;
  modo: ModoLoteria;
  ritmoMs: number;
  /** Milisegundos para la próxima carta (o para empezar, o para terminar). */
  restanteMs: number;
  cantadas: number;
  total: number;
  /** La última carta (índice de CARTAS_LOTERIA) y todas las que salieron, en orden. */
  actual: number | null;
  salidas: number[];
  /** Mi asiento y mi tabla (null si solo miro). */
  yo: number | null;
  tabla: number[] | null;
  marcas: boolean[] | null;
  /** Cartas que me faltan de castigo (0 = puedo cantar). */
  castigo: number;
  /** Las tablas de todos (en la lotería se ven), con cuánto le falta a cada uno. */
  jugadores: { a: number; tabla: number[]; marcas: boolean[]; faltan: number; gano: boolean; patron: number[] | null }[];
  ganadores: number[];
  eventos: EstadoLoteria["eventos"];
};

// ---------------------------------------------------------------- el ritmo de los compañeros
const MARCA_BOT: Record<Nivel, { p: number; a: number; b: number; nota: number }> = {
  facil: { p: 0.8, a: 1300, b: 3800, nota: 0.35 },
  normal: { p: 0.93, a: 750, b: 2300, nota: 0.6 },
  dificil: { p: 0.99, a: 380, b: 1150, nota: 0.9 },
};
const GRITO_BOT: Record<Nivel, [number, number]> = { facil: [1100, 2700], normal: [650, 1500], dificil: [260, 800] };

function programarMarcas(e: EstadoLoteria, a: number, t: number, azar: Azar, nueva: number | null) {
  const nivel = e.bots[a];
  if (!nivel) return;
  const r = MARCA_BOT[nivel];
  const yaVa = new Set(e.pend.filter((p) => p.a === a).map((p) => p.k));
  if (nueva != null) {
    const k = e.tablas[a].indexOf(nueva);
    if (k >= 0 && !e.marcas[a][k] && !yaVa.has(k) && azar() < r.p) {
      e.pend.push({ a, k, en: Math.round(t + entre(azar, r.a, r.b)) });
      yaVa.add(k);
    }
  }
  // a veces se da cuenta de una que se le pasó
  const salidas = new Set(e.baraja.slice(0, e.cantadas));
  const pasadas = e.tablas[a].map((c, k) => (salidas.has(c) && !e.marcas[a][k] && !yaVa.has(k) && c !== nueva ? k : -1)).filter((k) => k >= 0);
  if (pasadas.length && (nueva == null || azar() < r.nota)) {
    const k = pasadas[entero(azar, pasadas.length)];
    e.pend.push({ a, k, en: Math.round(t + entre(azar, r.a, r.b) * 1.4) });
  }
}

function programarGrito(e: EstadoLoteria, a: number, t: number, azar: Azar) {
  const nivel = e.bots[a];
  if (!nivel || e.gritos[a] != null || e.ganadores.includes(a)) return;
  if (!patronCompleto(e.marcas[a], e.modo)) return;
  const [x, y] = GRITO_BOT[nivel];
  e.gritos[a] = Math.round(t + entre(azar, x, y));
}

// ---------------------------------------------------------------- jugar
function cantar(e: EstadoLoteria, a: number, t: number): string | null {
  if (e.fase !== "cantando" && e.fase !== "revelar") return "Ahora no se puede cantar lotería.";
  if (e.ganadores.includes(a)) return null;
  if (e.cantadas < e.castigo[a]) return "Espera: cantaste una lotería falsa.";
  const p = patronCompleto(e.marcas[a], e.modo);
  if (!p) {
    if (e.fase === "revelar") return "Ya no alcanzas: la lotería ya se cantó.";
    e.castigo[a] = e.cantadas + LOTERIA.castigoCartas;
    anotar(e, t, { t: "falsa", a });
    return null;
  }
  e.ganadores.push(a);
  e.patron[a] = p;
  e.gritos[a] = null;
  if (e.fase === "cantando") {
    e.fase = "revelar";
    e.revelarHasta = t + LOTERIA.revelarMs;
  }
  anotar(e, t, { t: "loteria", a });
  return null;
}

function marcar(e: EstadoLoteria, a: number, k: number, t: number, azar: Azar | null): string | null {
  if (e.fase !== "cantando" && e.fase !== "revelar") return "La partida no está corriendo.";
  if (!Number.isInteger(k) || k < 0 || k >= LOTERIA.casillas) return "Esa casilla no existe.";
  if (e.marcas[a][k]) return null;
  const carta = e.tablas[a][k];
  if (!e.baraja.slice(0, e.cantadas).includes(carta)) return "Esa figura todavía no ha salido.";
  e.marcas[a][k] = true;
  if (azar) programarGrito(e, a, t, azar);
  return null;
}

/** Lo que pasa a su hora: sale una carta, marca o canta un compañero, se acaba el «¡Lotería!» o la baraja. */
function siguienteHora(e: EstadoLoteria): { en: number; que: "carta" | "pend" | "grito" | "revelar" | "final"; i?: number } | null {
  if (e.fase === "fin") return null;
  let mejor: { en: number; que: "carta" | "pend" | "grito" | "revelar" | "final"; i?: number } | null = null;
  const ver = (en: number | null, que: "carta" | "pend" | "grito" | "revelar" | "final", i?: number) => {
    if (en != null && (!mejor || en < mejor.en)) mejor = { en, que, i };
  };
  if (e.fase === "preparar" || (e.fase === "cantando" && e.cantadas < TOTAL_CARTAS)) ver(e.inicio + e.cantadas * e.ritmoMs, "carta");
  if (e.fase === "cantando" && e.cantadas >= TOTAL_CARTAS) ver(e.finEn, "final");
  if (e.fase === "revelar") ver(e.revelarHasta, "revelar");
  e.pend.forEach((p, i) => ver(p.en, "pend", i));
  e.gritos.forEach((g, i) => ver(g, "grito", i));
  return mejor;
}

function terminarYa(e: EstadoLoteria, t: number) {
  e.fase = "fin";
  e.terminoAt = t;
  e.pend = [];
  e.gritos = e.gritos.map(() => null);
  anotar(e, t, { t: "fin" });
}

function correr(e: EstadoLoteria, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 2000; vueltas++) {
    const h = siguienteHora(e);
    if (!h || h.en > ahora) break;
    cambio = true;
    const t = h.en;
    if (h.que === "carta") {
      if (e.fase === "preparar") e.fase = "cantando";
      const carta = e.baraja[e.cantadas];
      e.cantadas += 1;
      anotar(e, t, { t: "carta", carta, i: e.cantadas });
      if (e.cantadas >= TOTAL_CARTAS) e.finEn = t + LOTERIA.finalMs;
      for (let a = 0; a < e.n; a++) programarMarcas(e, a, t, azar, carta);
    } else if (h.que === "pend") {
      const p = e.pend.splice(h.i!, 1)[0];
      if (e.bots[p.a]) marcar(e, p.a, p.k, t, azar);
    } else if (h.que === "grito") {
      e.gritos[h.i!] = null;
      if (e.bots[h.i!]) cantar(e, h.i!, t);
    } else {
      terminarYa(e, t);
    }
  }
  return cambio;
}

// ---------------------------------------------------------------- el módulo
export const loteria: ModuloMesa<EstadoLoteria, JugadaLoteria, LoteriaVista, OpcionesLoteria> & {
  vistaPara(e: EstadoLoteria, asiento: number | null, ahora: number): LoteriaVista;
  jugadaDeBot(e: EstadoLoteria, asiento: number, nivel: Nivel, azar: Azar): JugadaLoteria | null;
} = {
  id: "loteria",
  min: 2,
  max: 12,

  estadoInicial(cfg: ConfigMesa<OpcionesLoteria>, azar: Azar, ahora: number): EstadoLoteria {
    const n = cfg.bots.length;
    const modo = cfg.opciones?.modo && esModoLoteria(cfg.opciones.modo) ? cfg.opciones.modo : "linea";
    const ritmo = cfg.opciones?.ritmo && esRitmoLoteria(cfg.opciones.ritmo) ? cfg.opciones.ritmo : "normal";
    const todas = [...Array(TOTAL_CARTAS).keys()];
    const tablas: number[][] = [];
    for (let a = 0; a < n; a++) {
      let t: number[];
      do t = mezclar(todas, azar).slice(0, LOTERIA.casillas);
      while (tablas.some((o) => o.every((x, i) => x === t[i])));
      tablas.push(t);
    }
    return {
      juego: "loteria",
      n,
      bots: [...cfg.bots],
      modo,
      ritmoMs: RITMOS_LOTERIA[ritmo].ms,
      baraja: mezclar(todas, azar),
      cantadas: 0,
      inicio: ahora + LOTERIA.prepararMs,
      tablas,
      marcas: tablas.map(() => new Array<boolean>(LOTERIA.casillas).fill(false)),
      castigo: new Array<number>(n).fill(0),
      fase: "preparar",
      revelarHasta: null,
      finEn: null,
      ganadores: [],
      patron: new Array(n).fill(null),
      pend: [],
      gritos: new Array(n).fill(null),
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: () => null,

  jugadasValidas(e, a) {
    if (e.fase !== "cantando" && e.fase !== "revelar") return [];
    const salidas = new Set(e.baraja.slice(0, e.cantadas));
    const out: JugadaLoteria[] = [];
    e.tablas[a].forEach((c, k) => {
      if (salidas.has(c) && !e.marcas[a][k]) out.push({ t: "marcar", k });
    });
    if (!e.ganadores.includes(a)) out.push({ t: "loteria" });
    return out;
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (o.t === "loteria") return { t: "loteria" };
    if (o.t === "marcar" && typeof o.k === "number" && Number.isInteger(o.k) && o.k >= 0 && o.k < LOTERIA.casillas) return { t: "marcar", k: o.k };
    return null;
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoLoteria> {
    if (a < 0 || a >= e0.n) return mal("No tienes tabla en esta partida.");
    const e = copiar(e0);
    correr(e, ahora, azar);
    const motivo = j.t === "marcar" ? marcar(e, a, j.k, ahora, null) : cantar(e, a, ahora);
    if (motivo) return mal(motivo);
    return { ok: true, e };
  },

  alTiempo(e0, ahora, azar) {
    const h = siguienteHora(e0);
    if (!h || h.en > ahora) return null;
    const e = copiar(e0);
    return correr(e, ahora, azar) ? e : null;
  },

  proximoCambio(e, ahora) {
    const h = siguienteHora(e);
    return h ? Math.max(0, h.en - ahora) : null;
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    const faltan = e.marcas.map((m) => faltanLoteria(m, e.modo));
    const marcas = e.marcas.map((m) => m.filter(Boolean).length);
    // quien ganó, primero; después, quien quedó más cerca (y con más figuras marcadas)
    const valor = e.marcas.map((_, a) => (e.ganadores.includes(a) ? 1000 : 100 - faltan[a]));
    const puestos = puestosPor(valor, e.ganadores.length ? undefined : marcas);
    const n = e.ganadores.length;
    const titulo =
      n === 0 ? "Nadie cantó lotería: gana quien quedó más cerca." : n === 1 ? `¡Lotería de @${e.ganadores[0]}!` : `¡Lotería doble! Empatan ${e.ganadores.map((a) => `@${a}`).join(" y ")}.`;
    return {
      puestos,
      puntos: marcas,
      titulo,
      detalle: e.marcas.map((_, a) => (e.ganadores.includes(a) ? "¡Lotería!" : faltan[a] === 1 ? "le faltó una" : `le faltaron ${faltan[a]}`)),
    };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    if (!nivel) {
      e.pend = e.pend.filter((p) => p.a !== a);
      e.gritos[a] = null;
    }
    return e;
  },

  vistaPara(e, yo, ahora): LoteriaVista {
    const soy = yo != null && yo >= 0 && yo < e.n ? yo : null;
    return {
      juego: "loteria",
      fase: e.fase,
      modo: e.modo,
      ritmoMs: e.ritmoMs,
      restanteMs:
        e.fase === "preparar" || e.fase === "cantando"
          ? Math.max(0, (e.cantadas < TOTAL_CARTAS ? e.inicio + e.cantadas * e.ritmoMs : e.finEn ?? ahora) - ahora)
          : e.fase === "revelar"
            ? Math.max(0, (e.revelarHasta ?? ahora) - ahora)
            : 0,
      cantadas: e.cantadas,
      total: TOTAL_CARTAS,
      actual: e.cantadas ? e.baraja[e.cantadas - 1] : null,
      salidas: e.baraja.slice(0, e.cantadas),
      yo: soy,
      tabla: soy != null ? e.tablas[soy] : null,
      marcas: soy != null ? e.marcas[soy] : null,
      castigo: soy != null ? Math.max(0, e.castigo[soy] - e.cantadas) : 0,
      jugadores: e.tablas.map((tabla, a) => ({
        a,
        tabla,
        marcas: e.marcas[a],
        faltan: faltanLoteria(e.marcas[a], e.modo),
        gano: e.ganadores.includes(a),
        patron: e.patron[a],
      })),
      ganadores: [...e.ganadores],
      eventos: e.eventos,
    };
  },

  jugadaDeBot(e, a) {
    if (e.fase !== "cantando" && e.fase !== "revelar") return null;
    if (!e.ganadores.includes(a) && patronCompleto(e.marcas[a], e.modo)) return { t: "loteria" };
    const salidas = new Set(e.baraja.slice(0, e.cantadas));
    const k = e.tablas[a].findIndex((c, i) => salidas.has(c) && !e.marcas[a][i]);
    return k >= 0 ? { t: "marcar", k } : null;
  },
};
