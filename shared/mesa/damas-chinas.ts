/**
 * Las damas chinas (2 a 6): el tablero de la estrella de seis puntas, con 121 hoyos y 10 canicas por jugador.
 *
 * - Cada uno empieza en una punta de la estrella y gana quien lleva sus diez canicas a la punta de enfrente.
 * - En su turno se mueve una canica: un paso a un hoyo vecino libre, o saltos sobre una canica vecina (de cualquier
 *   color) al hoyo libre de atrás, encadenando tantos saltos como se pueda. No se mezclan paso y saltos.
 * - Una canica que ya llegó a su meta no puede salir de ella.
 * - Para que nadie trabe la meta de otro: gana quien tiene su meta llena (aunque quede una canica ajena dentro) con
 *   por lo menos una suya.
 * - Si se juegan muchísimas jugadas sin ganador, gana quien más avanzó.
 * - Los compañeros de la computadora buscan los mejores saltos encadenados (el difícil piensa dos jugadas).
 *
 * El tablero usa coordenadas cúbicas (x + y + z = 0): es la unión de dos triángulos grandes, x, y, z ≥ −4 y
 * x, y, z ≤ 4; el hexágono del centro tiene 61 hoyos y cada punta, 10.
 */
import {
  anotar, copiar, entero, mal, pensar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";

export type Celda = { i: number; x: number; y: number; z: number; px: number; py: number; punta: number | null };

/** Las seis puntas, en el sentido del reloj desde abajo: cada una es «el eje y el signo» de sus hoyos (≥ 5). */
export const PUNTAS: { eje: 0 | 1 | 2; signo: 1 | -1; nombre: string }[] = [
  { eje: 2, signo: 1, nombre: "abajo" },
  { eje: 0, signo: -1, nombre: "abajo a la izquierda" },
  { eje: 1, signo: 1, nombre: "arriba a la izquierda" },
  { eje: 2, signo: -1, nombre: "arriba" },
  { eje: 0, signo: 1, nombre: "arriba a la derecha" },
  { eje: 1, signo: -1, nombre: "abajo a la derecha" },
];
export const enfrente = (punta: number) => (punta + 3) % 6;

/** Qué punta tiene cada asiento según cuántos juegan. */
export const PUNTAS_POR_JUGADORES: Record<number, number[]> = {
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 4],
  5: [0, 1, 2, 3, 4],
  6: [0, 1, 2, 3, 4, 5],
};

const DIRS: [number, number, number][] = [
  [1, -1, 0],
  [1, 0, -1],
  [0, 1, -1],
  [-1, 1, 0],
  [-1, 0, 1],
  [0, -1, 1],
];

function construir(): { celdas: Celda[]; indice: Map<string, number>; vecinos: number[][]; saltos: [number, number][][] } {
  const celdas: Celda[] = [];
  const indice = new Map<string, number>();
  for (let z = -8; z <= 8; z++)
    for (let x = -8; x <= 8; x++) {
      const y = -x - z;
      if (y < -8 || y > 8) continue;
      const enA = x >= -4 && y >= -4 && z >= -4;
      const enB = x <= 4 && y <= 4 && z <= 4;
      if (!enA && !enB) continue;
      const c = [x, y, z];
      const punta = PUNTAS.findIndex((p) => p.signo * c[p.eje] >= 5);
      const i = celdas.length;
      // en la pantalla: x a la derecha, y hacia abajo (z crece hacia abajo)
      celdas.push({ i, x, y, z, px: Math.sqrt(3) * (x + z / 2), py: 1.5 * z, punta: punta >= 0 ? punta : null });
      indice.set(`${x},${z}`, i);
    }
  const en = (x: number, z: number) => indice.get(`${x},${z}`);
  const vecinos = celdas.map((c) => DIRS.map(([dx, , dz]) => en(c.x + dx, c.z + dz) ?? -1));
  const saltos = celdas.map((c) =>
    DIRS.map(([dx, , dz]) => {
      const m = en(c.x + dx, c.z + dz);
      const f = en(c.x + 2 * dx, c.z + 2 * dz);
      return [m ?? -1, m != null && f != null ? f : -1] as [number, number];
    }),
  );
  return { celdas, indice, vecinos, saltos };
}

const T = construir();
export const CELDAS: Celda[] = T.celdas;
export const VECINOS = T.vecinos;
export const HOYOS = CELDAS.length;
export const celdaEn = (x: number, z: number) => T.indice.get(`${x},${z}`) ?? -1;
export const hoyosDePunta = (p: number) => CELDAS.filter((c) => c.punta === p).map((c) => c.i);
const coord = (c: Celda) => [c.x, c.y, c.z];
/** Cuánto ha avanzado un hoyo hacia la punta `meta` (−8 a 8; los de la meta van de 5 a 8). */
export const avance = (i: number, meta: number) => PUNTAS[meta].signo * coord(CELDAS[i])[PUNTAS[meta].eje];
/** Qué tan lejos está un hoyo de la línea del centro hacia la meta (para no irse por los costados). */
const lado = (i: number, meta: number) => {
  const c = coord(CELDAS[i]);
  const e = PUNTAS[meta].eje;
  const [b, d] = [0, 1, 2].filter((k) => k !== e);
  return Math.abs(c[b] - c[d]);
};

export const DAMAS_CHINAS = { canicas: 10, turnoMs: 45_000, prepararMs: 2500, maxJugadasPorJugador: 90 } as const;

// ---------------------------------------------------------------- el estado
export type EvDamasChinas =
  | { t: "mueve"; a: number; desde: number; camino: number[]; saltos: boolean; llego: boolean }
  | { t: "turno"; a: number }
  | { t: "llego"; a: number }
  | { t: "fin" };

export type EstadoDamasChinas = ConEventos<EvDamasChinas> & {
  juego: "damas-chinas";
  n: number;
  bots: (Nivel | null)[];
  puntas: number[];
  /** Quién ocupa cada hoyo (−1 = libre). */
  hoyos: number[];
  turno: number;
  turnoHasta: number;
  botEn: number | null;
  ausente: number[];
  fase: "preparar" | "jugando" | "fin";
  empiezaEn: number;
  jugadas: number;
  ganador: number | null;
  /** La última canica que movió cada uno (y de dónde venía), para que no vaya y venga. */
  ultima: ({ desde: number; hasta: number } | null)[];
  terminoAt: number | null;
};

export type JugadaDamasChinas = { t: "mover"; desde: number; camino: number[] };

export type DamasChinasVista = {
  juego: "damas-chinas";
  fase: EstadoDamasChinas["fase"];
  turno: number;
  yo: number | null;
  puntas: number[];
  hoyos: number[];
  restanteMs: number;
  turnoMs: number;
  ganador: number | null;
  /** Cuántas canicas tiene cada uno en su meta. */
  enMeta: number[];
  eventos: EstadoDamasChinas["eventos"];
};

// ---------------------------------------------------------------- las jugadas
export type MovDC = { desde: number; camino: number[] };

/** Todas las jugadas de una canica: los pasos y los saltos encadenados (cada destino una vez, por el camino más corto). */
export function movimientosDe(hoyos: number[], desde: number, meta: number): MovDC[] {
  const out: MovDC[] = [];
  const enMeta = CELDAS[desde].punta === meta;
  const vale = (i: number) => !enMeta || CELDAS[i].punta === meta;
  for (const v of VECINOS[desde]) if (v >= 0 && hoyos[v] < 0 && vale(v)) out.push({ desde, camino: [v] });
  const visto = new Set<number>([desde]);
  const cola: { en: number; camino: number[] }[] = [{ en: desde, camino: [] }];
  while (cola.length) {
    const { en, camino } = cola.shift()!;
    for (const [m, f] of T.saltos[en]) {
      // la canica que salta ya no está en su hoyo de salida: ni se salta sobre él ni se cae en él
      if (m < 0 || f < 0 || m === desde || hoyos[m] < 0 || hoyos[f] >= 0 || visto.has(f)) continue;
      visto.add(f);
      const c = [...camino, f];
      if (vale(f)) out.push({ desde, camino: c });
      cola.push({ en: f, camino: c });
    }
  }
  return out;
}

export function todasLasJugadas(e: Pick<EstadoDamasChinas, "hoyos" | "puntas">, a: number): MovDC[] {
  const meta = enfrente(e.puntas[a]);
  const out: MovDC[] = [];
  e.hoyos.forEach((q, i) => {
    if (q === a) out.push(...movimientosDe(e.hoyos, i, meta));
  });
  return out;
}

/** ¿Es una jugada válida? (un paso, o saltos de a uno sobre una canica a un hoyo libre). */
export function jugadaValida(hoyos: number[], a: number, meta: number, j: MovDC): boolean {
  if (hoyos[j.desde] !== a || !j.camino.length || j.camino.length > 40) return false;
  const enMeta = CELDAS[j.desde].punta === meta;
  const fin = j.camino[j.camino.length - 1];
  if (enMeta && CELDAS[fin].punta !== meta) return false;
  if (j.camino.length === 1 && VECINOS[j.desde].includes(j.camino[0])) return hoyos[j.camino[0]] < 0;
  let en = j.desde;
  const visto = new Set([en]);
  for (const f of j.camino) {
    if (!Number.isInteger(f) || f < 0 || f >= HOYOS || visto.has(f) || hoyos[f] >= 0) return false;
    const s = T.saltos[en].find(([, ff]) => ff === f);
    if (!s || s[0] === j.desde || hoyos[s[0]] < 0) return false;
    visto.add(f);
    en = f;
  }
  return true;
}

export function metaLlena(hoyos: number[], a: number, meta: number): boolean {
  const h = hoyosDePunta(meta);
  return h.every((i) => hoyos[i] >= 0) && h.some((i) => hoyos[i] === a);
}

/** Cuánto vale la posición para el asiento `a` (más es mejor). */
function valor(hoyos: number[], a: number, meta: number): number {
  let suma = 0;
  let peor = 99;
  let costados = 0;
  for (let i = 0; i < HOYOS; i++) {
    if (hoyos[i] !== a) continue;
    const v = avance(i, meta);
    suma += v;
    if (v < peor) peor = v;
    if (CELDAS[i].punta !== meta) costados += lado(i, meta);
  }
  // los huecos vacíos más hondos de la meta, que hay que llenar primero
  let hondo = 0;
  for (const i of hoyosDePunta(meta)) if (hoyos[i] < 0) hondo -= (avance(i, meta) - 4) * 0.15;
  return suma - 0.35 * (8 - peor) - 0.08 * costados + hondo;
}

function aplicarMov(hoyos: number[], j: MovDC): number[] {
  const h = [...hoyos];
  const fin = j.camino[j.camino.length - 1];
  h[fin] = h[j.desde];
  h[j.desde] = -1;
  return h;
}

export function decidirDamasChinas(e: Pick<EstadoDamasChinas, "hoyos" | "puntas" | "ultima">, a: number, nivel: Nivel, azar: Azar): MovDC | null {
  const meta = enfrente(e.puntas[a]);
  const jugadas = todasLasJugadas(e, a);
  if (!jugadas.length) return null;
  const base = valor(e.hoyos, a, meta);
  const ult = e.ultima[a];
  const puntuar = (j: MovDC, h: number[]) => {
    let v = valor(h, a, meta) - base;
    if (metaLlena(h, a, meta)) v += 1000;
    if (ult && j.desde === ult.hasta && j.camino[j.camino.length - 1] === ult.desde) v -= 1.5;
    return v;
  };
  const l = jugadas.map((j) => {
    const h = aplicarMov(e.hoyos, j);
    let v = puntuar(j, h);
    if (nivel === "dificil" && v < 1000) {
      // la siguiente jugada propia (si los demás no tocan nada): prepara las escaleras de saltos
      let mejor = 0;
      const sig = todasLasJugadas({ hoyos: h, puntas: e.puntas }, a);
      const b2 = valor(h, a, meta);
      for (const j2 of sig) {
        const h2 = aplicarMov(h, j2);
        const v2 = valor(h2, a, meta) - b2 + (metaLlena(h2, a, meta) ? 500 : 0);
        if (v2 > mejor) mejor = v2;
      }
      v += 0.55 * mejor;
    }
    return { j, v };
  });
  l.sort((x, y) => y.v - x.v);
  if (nivel === "facil") {
    // a veces se le escapa la mejor: elige entre las buenas
    const buenas = l.filter((x) => x.v > 0).slice(0, 6);
    const de = buenas.length ? buenas : l.slice(0, 4);
    return de[entero(azar, de.length)].j;
  }
  if (nivel === "normal") {
    const cerca = l.filter((x) => x.v >= l[0].v - 0.6).slice(0, 3);
    return cerca[entero(azar, cerca.length)].j;
  }
  const empatadas = l.filter((x) => x.v >= l[0].v - 1e-9);
  return empatadas[entero(azar, empatadas.length)].j;
}

// ---------------------------------------------------------------- jugar
function mover(e: EstadoDamasChinas, a: number, j: MovDC, t: number, azar: Azar): string | null {
  const meta = enfrente(e.puntas[a]);
  if (!jugadaValida(e.hoyos, a, meta, j)) return "Esa jugada no se puede.";
  e.hoyos = aplicarMov(e.hoyos, j);
  const fin = j.camino[j.camino.length - 1];
  e.ultima[a] = { desde: j.desde, hasta: fin };
  e.jugadas += 1;
  const saltos = !(j.camino.length === 1 && VECINOS[j.desde].includes(j.camino[0]));
  anotar(e, t, { t: "mueve", a, desde: j.desde, camino: [...j.camino], saltos, llego: CELDAS[fin].punta === meta && CELDAS[j.desde].punta !== meta });
  if (metaLlena(e.hoyos, a, meta)) {
    e.ganador = a;
    anotar(e, t, { t: "llego", a });
    terminar(e, t);
    return null;
  }
  if (e.jugadas >= DAMAS_CHINAS.maxJugadasPorJugador * e.n) {
    terminar(e, t);
    return null;
  }
  pasar(e, t + 380 + j.camino.length * 330, azar);
  return null;
}

function pasar(e: EstadoDamasChinas, t: number, azar: Azar) {
  // el siguiente que pueda mover (si nadie puede, se termina)
  for (let k = 1; k <= e.n; k++) {
    const s = (e.turno + k) % e.n;
    if (todasLasJugadas(e, s).length) {
      e.turno = s;
      e.turnoHasta = t + DAMAS_CHINAS.turnoMs;
      const nivel = e.bots[s];
      e.botEn = nivel ? t + pensar(nivel, azar, 0.9) : e.ausente[s] >= 2 ? t + 900 : null;
      anotar(e, t, { t: "turno", a: s });
      return;
    }
  }
  terminar(e, t);
}

function terminar(e: EstadoDamasChinas, t: number) {
  e.fase = "fin";
  e.terminoAt = t;
  e.botEn = null;
  anotar(e, t, { t: "fin" });
}

function correr(e: EstadoDamasChinas, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 400 && e.fase !== "fin"; vueltas++) {
    if (e.fase === "preparar") {
      if (ahora < e.empiezaEn) break;
      e.fase = "jugando";
      e.turnoHasta = e.empiezaEn + DAMAS_CHINAS.turnoMs;
      const nivel = e.bots[e.turno];
      e.botEn = nivel ? e.empiezaEn + pensar(nivel, azar, 0.9) : null;
      anotar(e, e.empiezaEn, { t: "turno", a: e.turno });
      cambio = true;
      continue;
    }
    const en = Math.min(e.botEn ?? Infinity, e.turnoHasta);
    if (en > ahora) break;
    cambio = true;
    const a = e.turno;
    const porBot = e.botEn != null && e.botEn <= e.turnoHasta;
    if (!porBot) e.ausente[a] += 1;
    const j = decidirDamasChinas(e, a, porBot ? e.bots[a] ?? "normal" : "normal", azar);
    if (j) mover(e, a, j, en, azar);
    else pasar(e, en, azar);
  }
  return cambio;
}

export const damasChinas: ModuloMesa<EstadoDamasChinas, JugadaDamasChinas, DamasChinasVista> & {
  vistaPara(e: EstadoDamasChinas, asiento: number | null, ahora: number): DamasChinasVista;
  jugadaDeBot(e: EstadoDamasChinas, asiento: number, nivel: Nivel, azar: Azar): JugadaDamasChinas | null;
} = {
  id: "damas-chinas",
  min: 2,
  max: 6,

  estadoInicial(cfg: ConfigMesa<Record<string, never>>, azar: Azar, ahora: number): EstadoDamasChinas {
    const n = Math.max(2, Math.min(6, cfg.bots.length));
    const puntas = PUNTAS_POR_JUGADORES[n];
    const hoyos = new Array<number>(HOYOS).fill(-1);
    puntas.forEach((p, a) => {
      for (const i of hoyosDePunta(p)) hoyos[i] = a;
    });
    return {
      juego: "damas-chinas",
      n,
      bots: [...cfg.bots].slice(0, n),
      puntas: [...puntas],
      hoyos,
      turno: entero(azar, n),
      turnoHasta: ahora + DAMAS_CHINAS.prepararMs + DAMAS_CHINAS.turnoMs,
      botEn: null,
      ausente: new Array<number>(n).fill(0),
      fase: "preparar",
      empiezaEn: ahora + DAMAS_CHINAS.prepararMs,
      jugadas: 0,
      ganador: null,
      ultima: new Array(n).fill(null),
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: (e) => (e.fase === "jugando" ? e.turno : null),

  jugadasValidas(e, a) {
    if (e.fase !== "jugando" || a !== e.turno) return [];
    return todasLasJugadas(e, a).map((j) => ({ t: "mover", ...j }));
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (o.t !== "mover" || typeof o.desde !== "number" || !Array.isArray(o.camino)) return null;
    const camino = o.camino.slice(0, 40).filter((v): v is number => typeof v === "number" && Number.isInteger(v));
    if (!Number.isInteger(o.desde) || !camino.length || camino.length !== o.camino.length) return null;
    return { t: "mover", desde: o.desde, camino };
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoDamasChinas> {
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (e.fase !== "jugando") return mal(e.fase === "fin" ? "La partida terminó." : "Todavía no empieza.");
    if (a !== e.turno) return mal("No es tu turno.");
    const motivo = mover(e, a, { desde: j.desde, camino: j.camino }, ahora, azar);
    if (motivo) return mal(motivo);
    e.ausente[a] = 0;
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
    const enMeta = e.puntas.map((p, a) => hoyosDePunta(enfrente(p)).filter((i) => e.hoyos[i] === a).length);
    const suma = e.puntas.map((p, a) => e.hoyos.reduce((s, q, i) => (q === a ? s + avance(i, enfrente(p)) : s), 0));
    const valor = enMeta.map((m, a) => (a === e.ganador ? 10_000 : m * 100 + suma[a]));
    const puestos = puestosPor(valor);
    const titulo = e.ganador != null ? `¡@${e.ganador} llevó sus diez canicas a la meta!` : "Se jugaron muchas jugadas: gana quien más avanzó.";
    return { puestos, puntos: enMeta, titulo, detalle: enMeta.map((m, a) => (a === e.ganador ? "¡llegó con todas!" : `${m} de 10 en la meta`)) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    if (a < e.n) e.bots[a] = nivel;
    if (!nivel) e.ausente[a] = 0;
    return e;
  },

  vistaPara(e, yo, ahora): DamasChinasVista {
    return {
      juego: "damas-chinas",
      fase: e.fase,
      turno: e.turno,
      yo: yo != null && yo >= 0 && yo < e.n ? yo : null,
      puntas: [...e.puntas],
      hoyos: [...e.hoyos],
      restanteMs: e.fase === "jugando" ? Math.max(0, e.turnoHasta - ahora) : e.fase === "preparar" ? Math.max(0, e.empiezaEn - ahora) : 0,
      turnoMs: DAMAS_CHINAS.turnoMs,
      ganador: e.ganador,
      enMeta: e.puntas.map((p, a) => hoyosDePunta(enfrente(p)).filter((i) => e.hoyos[i] === a).length),
      eventos: e.eventos,
    };
  },

  jugadaDeBot(e, a, nivel, azar) {
    if (e.fase !== "jugando" || a !== e.turno) return null;
    const j = decidirDamasChinas(e, a, nivel, azar);
    return j ? { t: "mover", ...j } : null;
  },
};
