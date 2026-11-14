/**
 * El parchís, con las reglas españolas, en la mesa del patio (shared/mesa.ts). El tablero es propio, «el estadio»:
 * una pista redonda de 68 casillas, un anillo por dentro con el camino de llegada de cada color y la corona de laurel en
 * el centro, que es la meta (1 Corintios 9:24-25). Nada en forma de cruz.
 *
 * - De 2 a 4 jugadores, cada uno con su color (amarillo, azul, rojo y verde, en el orden de la vuelta) y 4 fichas en su
 *   casa (o 2, en la partida corta). Con dos jugadores se sientan frente a frente.
 * - Para sacar una ficha de casa hay que sacar un 5, y con un 5 es obligatorio sacarla si se puede. Si en la salida ya
 *   hay dos fichas y alguna es de otro color, la que sale se come a la ajena que llegó última.
 * - Cada ficha da una vuelta (de su salida a su entrada, 63 casillas) y entra por su camino de llegada (7 casillas) hasta
 *   la meta, con el número justo: lo que sobra no se cuenta.
 * - Caer donde hay una sola ficha de otro color la come (vuelve a su casa) y da 20 para contar con una ficha. En los 12
 *   seguros no se come: ahí caben dos fichas de distinto color. En ninguna casilla caben más de dos.
 * - Dos fichas del mismo color en una casilla de la pista son una barrera: ninguna ficha pasa ni cae ahí. Con un 6 hay
 *   que abrir una barrera propia si se puede.
 * - Llegar a la meta da 10 para contar. La cuenta de 20 o de 10 se juega entera con una ficha; si ninguna puede, se
 *   pierde.
 * - Con un 6 se vuelve a tirar; con tres seises seguidos, la última ficha que se movió vuelve a casa (si todavía está en
 *   la pista) y el turno pasa.
 * - Si el dado no deja mover ninguna ficha, el turno pasa solo (o se vuelve a tirar, si fue un 6).
 * - Gana quien mete primero todas sus fichas en la meta.
 *
 * Las jugadas: `{ t: "tirar" }` (el dado lo tira el servidor, con el azar que llega de afuera) y `{ f, n }`, la ficha
 * que se mueve y la cuenta que se juega (el número del dado, 20 o 10). Cada jugada anota sus eventos (el dado, el
 * camino de la ficha, la comida, la llegada) para que la pantalla los anime en orden, y `esperaMs` dice cuánto tardan:
 * la sala espera eso antes de que juegue la computadora.
 */
import type { Verso } from "../ciudad";
import type { AsientoMesa, Azar, JuegoDeMesa, NivelBot, ResultadoMesa } from "../mesa";

export const PARCHIS = {
  casillas: 68,
  /** La salida de cada color (amarillo, azul, rojo, verde): un seguro de su color. */
  salida: [5, 22, 39, 56],
  /** La última casilla de la pista de cada color, antes de su camino de llegada (también es un seguro). */
  entrada: [68, 17, 34, 51],
  seguros: [5, 12, 17, 22, 29, 34, 39, 46, 51, 56, 63, 68],
  /** Las casillas del camino de llegada. */
  pasillo: 7,
  /** El número para sacar una ficha de casa. */
  sacar: 5,
  /** Lo que se cuenta al comer y al llegar a la meta. */
  comer: 20,
  llegar: 10,
  /** Un tope por si una partida no termina nunca (gana quien avanzó más). */
  maxTiradas: 1500,
} as const;

/** Dónde está una ficha: en casa, en la pista (0 = su salida … 63 = su entrada), en su camino (64–70) o en la meta. */
export const CASA = -1;
export const ULTIMA_PISTA = 63;
export const META = ULTIMA_PISTA + PARCHIS.pasillo + 1; // 71

export const NOMBRES_COLOR = ["amarillo", "azul", "rojo", "verde"] as const;

/** Los colores de los asientos: con dos, frente a frente; con tres, los tres primeros de la vuelta. */
export const coloresDe = (n: number): number[] => (n === 2 ? [0, 2] : n === 3 ? [0, 1, 2] : [0, 1, 2, 3]);

/** La casilla de la pista (1–68) donde queda una ficha de ese color con ese avance (0–63); null si no está en la pista. */
export function casillaDe(color: number, pos: number): number | null {
  if (pos < 0 || pos > ULTIMA_PISTA) return null;
  return ((PARCHIS.salida[color] - 1 + pos) % PARCHIS.casillas) + 1;
}
export const esSeguro = (casilla: number) => (PARCHIS.seguros as readonly number[]).includes(casilla);
/** Lo que avanzó una ficha (0 en casa, 72 en la meta): para medir quién va adelante. */
export const avanceDe = (pos: number) => (pos === CASA ? 0 : pos === META ? META + 1 : pos + 1);

/** Lo que tarda en la pantalla cada cosa que pasa (ms): la sala espera eso antes de que juegue la computadora. */
export const ANIMA = {
  dado: 900,
  /** El salto de la casa a la salida. */
  sale: 450,
  /** Cada casilla del camino de una ficha (más rápido en las cuentas largas). */
  paso: 170,
  pasoLargo: 85,
  asentar: 220,
  come: 950,
  meta: 1000,
  sin: 900,
  pierde: 700,
  tres: 1300,
  turno: 150,
} as const;
export const pasoMs = (casillas: number) => (casillas >= 10 ? ANIMA.pasoLargo : ANIMA.paso);
/** Lo que tarda en verse una ficha que va de `desde` a `hasta` (saltando casilla por casilla y asentándose). */
export const msDeMover = (desde: number, hasta: number) =>
  (desde === CASA ? ANIMA.sale : (hasta - desde) * pasoMs(hasta - desde)) + ANIMA.asentar;

// ---------------------------------------------------------------- el estado
export type Cuenta = { n: number; tipo: "dado" | "comer" | "meta" };
export type EvParchis =
  | { t: "dado"; a: number; v: number }
  | { t: "mueve"; a: number; f: number; desde: number; hasta: number; cuenta: Cuenta; barrera: boolean }
  | { t: "come"; a: number; f: number; victima: number; vf: number; desde: number }
  | { t: "meta"; a: number; f: number; quedan: number }
  | { t: "sin"; a: number; v: number }
  | { t: "pierde"; a: number; cuenta: Cuenta }
  | { t: "tres"; a: number; f: number | null; desde: number | null }
  | { t: "turno"; a: number; otra: boolean }
  | { t: "fin"; a: number | null };

export const EVENTOS_PARCHIS = 32;

export type EstadoParchis = {
  asientos: AsientoMesa[];
  /** El color (0–3) de cada asiento. */
  colores: number[];
  nFichas: number;
  /** Dónde está cada ficha de cada asiento. */
  fichas: number[][];
  turno: number;
  /** «tirar»: le toca tirar el dado; «mover»: elegir la ficha para la cuenta; «fin»: terminó. */
  fase: "tirar" | "mover" | "fin";
  dado: number | null;
  /** Lo que hay que contar ahora (el dado, 20 o 10). */
  cuenta: Cuenta | null;
  /** Seises seguidos en este turno. */
  seises: number;
  /** Después de esta cuenta vuelve a tirar (sacó un 6). */
  repite: boolean;
  /** La última ficha que movió en este turno (para los tres seises). */
  ultima: number | null;
  ganador: number | null;
  tiradas: number;
  /** Cuántas fichas comió y cuántas le comieron a cada uno (para el final). */
  comio: number[];
  comidas: number[];
  /** El orden en que llegó cada ficha a su casilla (en la salida se come a la ajena que llegó última). */
  orden: number;
  llegada: number[][];
  ev: number;
  eventos: (EvParchis & { n: number })[];
  /** Lo que tarda la pantalla en mostrar la última jugada. */
  animaMs: number;
};

export type JugadaMover = { f: number; n: number };
export type JugadaParchis = { t: "tirar" } | JugadaMover;

export type VistaParchis = Omit<EstadoParchis, "asientos" | "orden" | "llegada" | "animaMs">;

export const esTirar = (j: unknown): j is { t: "tirar" } => !!j && typeof j === "object" && (j as { t?: unknown }).t === "tirar";
export const esMover = (j: unknown): j is JugadaMover =>
  !!j && typeof j === "object" && Number.isInteger((j as JugadaMover).f) && Number.isInteger((j as JugadaMover).n);

const copiar = (e: EstadoParchis): EstadoParchis => ({
  ...e,
  asientos: e.asientos.map((x) => ({ ...x })),
  colores: [...e.colores],
  fichas: e.fichas.map((l) => [...l]),
  cuenta: e.cuenta ? { ...e.cuenta } : null,
  comio: [...e.comio],
  comidas: [...e.comidas],
  llegada: e.llegada.map((l) => [...l]),
  eventos: [...e.eventos],
});

function anotar(e: EstadoParchis, x: EvParchis, ms: number) {
  e.ev += 1;
  e.eventos.push({ ...x, n: e.ev });
  if (e.eventos.length > EVENTOS_PARCHIS) e.eventos.splice(0, e.eventos.length - EVENTOS_PARCHIS);
  e.animaMs += ms;
}

// ---------------------------------------------------------------- las casillas
type Ocupa = { a: number; f: number };
/** Quiénes están en cada casilla de la pista. */
export function mapaDePista(e: Pick<EstadoParchis, "fichas" | "colores">): Map<number, Ocupa[]> {
  const m = new Map<number, Ocupa[]>();
  e.fichas.forEach((l, a) =>
    l.forEach((pos, f) => {
      const c = casillaDe(e.colores[a], pos);
      if (c === null) return;
      const x = m.get(c);
      if (x) x.push({ a, f });
      else m.set(c, [{ a, f }]);
    }),
  );
  return m;
}
const esBarrera = (o: Ocupa[] | undefined) => !!o && o.length >= 2 && o[0].a === o[1].a;

/** Las fichas de un asiento que forman barrera en la pista. */
export function fichasEnBarrera(e: Pick<EstadoParchis, "fichas" | "colores">, a: number, mapa = mapaDePista(e)): Set<number> {
  const out = new Set<number>();
  for (const o of mapa.values()) if (esBarrera(o) && o[0].a === a) o.forEach((x) => out.add(x.f));
  return out;
}

export type Destino = { hasta: number; come: Ocupa | null; barrera: boolean };

/** Adónde llega esa ficha con esa cuenta (null si no puede): sin pasar barreras, con el número justo y sin llenar casillas. */
export function destinoDe(e: EstadoParchis, a: number, f: number, cuenta: Cuenta, mapa = mapaDePista(e)): Destino | null {
  const pos = e.fichas[a][f];
  const color = e.colores[a];
  if (pos === META) return null;
  if (pos === CASA) {
    if (cuenta.tipo !== "dado" || cuenta.n !== PARCHIS.sacar) return null;
    const ahi = mapa.get(PARCHIS.salida[color]) ?? [];
    if (ahi.length < 2) return { hasta: 0, come: null, barrera: ahi.length === 1 && ahi[0].a === a };
    const ajenas = ahi.filter((o) => o.a !== a);
    // dos fichas mías en la salida: no se puede sacar
    if (!ajenas.length) return null;
    // la que sale se come a la ajena que llegó última
    const v = ajenas.reduce((m, o) => (e.llegada[o.a][o.f] > e.llegada[m.a][m.f] ? o : m));
    return { hasta: 0, come: v, barrera: ahi.some((o) => o.a === a) };
  }
  const hasta = pos + cuenta.n;
  if (hasta > META) return null;
  // ninguna barrera en el camino (en la pista)
  for (let p = pos + 1; p < hasta && p <= ULTIMA_PISTA; p++) if (esBarrera(mapa.get(casillaDe(color, p)!))) return null;
  if (hasta <= ULTIMA_PISTA) {
    const c = casillaDe(color, hasta)!;
    const ahi = mapa.get(c) ?? [];
    if (ahi.length >= 2) return null;
    if (ahi.length === 1 && ahi[0].a !== a) return { hasta, come: esSeguro(c) ? null : ahi[0], barrera: false };
    return { hasta, come: null, barrera: ahi.length === 1 };
  }
  // en el camino de llegada caben dos por casilla; en la meta, todas
  if (hasta < META && e.fichas[a].filter((p, k) => k !== f && p === hasta).length >= 2) return null;
  return { hasta, come: null, barrera: false };
}

/** Las fichas que pueden jugar la cuenta de ahora, con las obligaciones: con un 5 se saca, con un 6 se abre la barrera. */
export function movimientos(e: EstadoParchis, a: number): (JugadaMover & { d: Destino })[] {
  const cuenta = e.cuenta;
  if (!cuenta || e.fase !== "mover" || a !== e.turno) return [];
  const mapa = mapaDePista(e);
  const todos: (JugadaMover & { d: Destino })[] = [];
  e.fichas[a].forEach((_, f) => {
    const d = destinoDe(e, a, f, cuenta, mapa);
    if (d) todos.push({ f, n: cuenta.n, d });
  });
  if (cuenta.tipo === "dado" && cuenta.n === PARCHIS.sacar) {
    const salir = todos.filter((x) => e.fichas[a][x.f] === CASA);
    if (salir.length) return salir;
  }
  if (cuenta.tipo === "dado" && cuenta.n === 6) {
    const enBarrera = fichasEnBarrera(e, a, mapa);
    const abrir = todos.filter((x) => enBarrera.has(x.f));
    if (abrir.length) return abrir;
  }
  return todos;
}

// ---------------------------------------------------------------- jugar
function siguienteTurno(e: EstadoParchis) {
  e.turno = (e.turno + 1) % e.asientos.length;
  e.fase = "tirar";
  e.cuenta = null;
  e.seises = 0;
  e.repite = false;
  e.ultima = null;
  anotar(e, { t: "turno", a: e.turno, otra: false }, ANIMA.turno);
}

/** Terminó una cuenta: sigue la que quedó (20 o 10), vuelve a tirar (sacó 6) o pasa el turno. */
function cerrarCuenta(e: EstadoParchis) {
  if (e.fase === "fin") return;
  if (e.cuenta) {
    e.fase = "mover";
    return;
  }
  if (e.repite) {
    e.repite = false;
    e.fase = "tirar";
    anotar(e, { t: "turno", a: e.turno, otra: true }, ANIMA.turno);
    return;
  }
  siguienteTurno(e);
}

/** Se acabó la partida (ganó alguien, o se llegó al tope de tiradas y gana quien avanzó más). */
function terminar(e: EstadoParchis, ganador: number | null) {
  e.fase = "fin";
  e.cuenta = null;
  e.ganador = ganador ?? masAdelante(e);
  anotar(e, { t: "fin", a: e.ganador }, 0);
}
const avanceTotal = (e: EstadoParchis, a: number) => e.fichas[a].reduce((s, p) => s + avanceDe(p), 0);
function masAdelante(e: EstadoParchis): number {
  let mejor = 0;
  for (let a = 1; a < e.asientos.length; a++) if (avanceTotal(e, a) > avanceTotal(e, mejor)) mejor = a;
  return mejor;
}

/** Una cuenta nueva (20 o 10): si ninguna ficha la puede jugar, se pierde. */
function nuevaCuenta(e: EstadoParchis, a: number, cuenta: Cuenta) {
  e.cuenta = cuenta;
  e.fase = "mover";
  if (!movimientos(e, a).length) {
    anotar(e, { t: "pierde", a, cuenta }, ANIMA.pierde);
    e.cuenta = null;
  }
}

function tirar(e: EstadoParchis, azar: Azar) {
  const a = e.turno;
  const v = 1 + Math.min(5, Math.floor(azar() * 6));
  e.dado = v;
  e.tiradas += 1;
  anotar(e, { t: "dado", a, v }, ANIMA.dado);
  if (v === 6) {
    e.seises += 1;
    if (e.seises >= 3) {
      // tres seises: la última ficha que movió vuelve a casa (si sigue en la pista)
      const f = e.ultima;
      const pos = f === null ? CASA : e.fichas[a][f];
      const vuelve = f !== null && pos >= 0 && pos <= ULTIMA_PISTA;
      if (vuelve) e.fichas[a][f] = CASA;
      anotar(e, { t: "tres", a, f: vuelve ? f : null, desde: vuelve ? pos : null }, ANIMA.tres);
      if (e.tiradas >= PARCHIS.maxTiradas) return terminar(e, null);
      return siguienteTurno(e);
    }
  }
  e.repite = v === 6;
  e.cuenta = { n: v, tipo: "dado" };
  e.fase = "mover";
  if (e.tiradas >= PARCHIS.maxTiradas) return terminar(e, null);
  if (!movimientos(e, a).length) {
    anotar(e, { t: "sin", a, v }, ANIMA.sin);
    e.cuenta = null;
    cerrarCuenta(e);
  }
}

function mover(e: EstadoParchis, a: number, m: JugadaMover & { d: Destino }) {
  const cuenta = e.cuenta!;
  const desde = e.fichas[a][m.f];
  const { hasta, come } = m.d;
  e.fichas[a][m.f] = hasta;
  e.orden += 1;
  e.llegada[a][m.f] = e.orden;
  e.ultima = m.f;
  e.cuenta = null;
  anotar(e, { t: "mueve", a, f: m.f, desde, hasta, cuenta, barrera: m.d.barrera }, msDeMover(desde, hasta));
  if (come) {
    const vdesde = e.fichas[come.a][come.f];
    e.fichas[come.a][come.f] = CASA;
    e.comio[a] += 1;
    e.comidas[come.a] += 1;
    anotar(e, { t: "come", a, f: m.f, victima: come.a, vf: come.f, desde: vdesde }, ANIMA.come);
  }
  if (hasta === META) {
    const quedan = e.fichas[a].filter((p) => p !== META).length;
    anotar(e, { t: "meta", a, f: m.f, quedan }, ANIMA.meta);
    if (!quedan) return terminar(e, a);
  }
  if (come) nuevaCuenta(e, a, { n: PARCHIS.comer, tipo: "comer" });
  else if (hasta === META) nuevaCuenta(e, a, { n: PARCHIS.llegar, tipo: "meta" });
  cerrarCuenta(e);
}

export function aplicarParchis(e0: EstadoParchis, a: number, j: JugadaParchis, azar: Azar): EstadoParchis {
  if (e0.fase === "fin" || a !== e0.turno) return e0;
  if (esTirar(j)) {
    if (e0.fase !== "tirar") return e0;
    const e = copiar(e0);
    e.animaMs = 0;
    tirar(e, azar);
    return e;
  }
  if (!esMover(j) || e0.fase !== "mover" || !e0.cuenta || j.n !== e0.cuenta.n) return e0;
  const m = movimientos(e0, a).find((x) => x.f === j.f);
  if (!m) return e0;
  const e = copiar(e0);
  e.animaMs = 0;
  mover(e, a, m);
  return e;
}

export function jugadasParchis(e: EstadoParchis, a: number): JugadaParchis[] {
  if (e.fase === "fin" || a !== e.turno) return [];
  if (e.fase === "tirar") return [{ t: "tirar" }];
  return movimientos(e, a).map(({ f, n }) => ({ f, n }));
}

export function estadoInicialParchis(asientos: AsientoMesa[], nFichas = 4): EstadoParchis {
  const n = asientos.length;
  const fichas = Array.from({ length: n }, () => new Array<number>(nFichas).fill(CASA));
  return {
    asientos: asientos.map((x) => ({ ...x })),
    colores: coloresDe(n),
    nFichas,
    fichas,
    turno: 0,
    fase: "tirar",
    dado: null,
    cuenta: null,
    seises: 0,
    repite: false,
    ultima: null,
    ganador: null,
    tiradas: 0,
    comio: new Array<number>(n).fill(0),
    comidas: new Array<number>(n).fill(0),
    orden: 0,
    llegada: fichas.map((l) => l.map(() => 0)),
    ev: 1,
    eventos: [{ t: "turno", a: 0, otra: false, n: 1 }],
    animaMs: 600,
  };
}

// ---------------------------------------------------------------- la computadora
/**
 * Qué tan a tiro queda una ficha en esa casilla de la pista: las fichas ajenas que están detrás, a 1–6 casillas (y que no
 * se meten antes a su camino), cada una con la probabilidad de sacar ese número; un poco más por las cuentas de 20 y 10.
 */
export function riesgo(e: EstadoParchis, a: number, casilla: number, sin: Ocupa | null = null): number {
  if (esSeguro(casilla)) return 0;
  let r = 0;
  let ahi = 0;
  e.fichas.forEach((l, b) => {
    l.forEach((pos, q) => {
      if (sin && sin.a === b && sin.f === q) return;
      const c = casillaDe(e.colores[b], pos);
      if (c === null) return;
      if (c === casilla) ahi += 1;
      if (b === a) return;
      const d = (casilla - c + PARCHIS.casillas) % PARCHIS.casillas;
      if (!d || pos + d > ULTIMA_PISTA) return;
      if (d <= 6) r += 1 / 6;
      else if (d === PARCHIS.comer || d === PARCHIS.llegar) r += 0.05;
    });
  });
  // en una casilla con dos fichas (una barrera) nadie puede caer
  return ahi >= 2 ? 0 : Math.min(1, r);
}

/** Lo que vale cada ficha en peligro (las que avanzaron más, más). */
const pesoFicha = (pos: number) => 0.6 + avanceDe(pos) / 72;

/** Cuánto tengo a tiro (la suma de mis fichas en peligro, con su peso). */
function peligroDe(e: EstadoParchis, a: number): number {
  let s = 0;
  e.fichas[a].forEach((pos) => {
    const c = casillaDe(e.colores[a], pos);
    if (c !== null) s += riesgo(e, a, c) * pesoFicha(pos);
  });
  return s;
}

/** Cuántas fichas ajenas quedan detrás de esa casilla, a menos de 7 (una barrera ahí las frena). */
function frenadas(e: EstadoParchis, a: number, casilla: number): number {
  let n = 0;
  e.fichas.forEach((l, b) => {
    if (b === a) return;
    l.forEach((pos) => {
      const c = casillaDe(e.colores[b], pos);
      if (c === null) return;
      const d = (casilla - c + PARCHIS.casillas) % PARCHIS.casillas;
      if (d > 0 && d <= 6 && pos + d <= ULTIMA_PISTA) n += 1;
    });
  });
  return n;
}

function puntuar(e: EstadoParchis, a: number, m: JugadaMover & { d: Destino }, nivel: NivelBot): number {
  const desde = e.fichas[a][m.f];
  const { hasta, come } = m.d;
  const color = e.colores[a];
  let v = 0;
  if (come) v += 70 + avanceDe(e.fichas[come.a][come.f]) * 0.6;
  if (hasta === META) v += 60;
  else if (hasta > ULTIMA_PISTA && desde <= ULTIMA_PISTA) v += 30; // entra a su camino: ya nadie la come
  if (desde === CASA) v += 35;
  v += (hasta - Math.max(desde, 0)) * 0.12;
  if (nivel === "facil") return v;
  const cHasta = casillaDe(color, hasta);
  const cDesde = casillaDe(color, desde);
  if (cHasta !== null && esSeguro(cHasta)) v += 12;
  if (m.d.barrera) v += 6 + (nivel === "dificil" && cHasta !== null ? frenadas(e, a, cHasta) * 4 : 0);
  // no dejarla a tiro y sacarla del peligro (en una barrera no la pueden comer)
  if (cHasta !== null && !m.d.barrera) v -= riesgo(e, a, cHasta, come) * pesoFicha(hasta) * (nivel === "dificil" ? 45 : 30);
  if (cDesde !== null) v += riesgo(e, a, cDesde) * pesoFicha(desde) * (nivel === "dificil" ? 30 : 18);
  if (nivel === "dificil") {
    // las demás fichas: al abrir una barrera o dejar sola a una compañera, que no queden a tiro
    const antes = peligroDe(e, a) - (cDesde !== null ? riesgo(e, a, cDesde) * pesoFicha(desde) : 0);
    const sig = copiar(e);
    sig.fichas[a][m.f] = hasta;
    if (come) sig.fichas[come.a][come.f] = CASA;
    const despues = peligroDe(sig, a) - (cHasta !== null ? riesgo(sig, a, cHasta) * pesoFicha(hasta) : 0);
    v -= (despues - antes) * 35;
  }
  return v;
}

export function jugadaBotParchis(e: EstadoParchis, a: number, nivel: NivelBot, azar: Azar): JugadaParchis {
  if (e.fase === "tirar") return { t: "tirar" };
  const ms = movimientos(e, a);
  if (!ms.length) return { t: "tirar" };
  if (ms.length === 1) return { f: ms[0].f, n: ms[0].n };
  // el fácil a veces juega cualquiera (pero si puede comer, casi siempre come)
  if (nivel === "facil" && azar() < 0.5 && !ms.some((m) => m.d.come)) {
    const m = ms[Math.floor(azar() * ms.length)];
    return { f: m.f, n: m.n };
  }
  const ruido = nivel === "facil" ? 14 : nivel === "normal" ? 6 : 1.5;
  let mejor = ms[0];
  let mejorV = -Infinity;
  for (const m of ms) {
    const v = puntuar(e, a, m, nivel) + azar() * ruido;
    if (v > mejorV) {
      mejorV = v;
      mejor = m;
    }
  }
  return { f: mejor.f, n: mejor.n };
}

// ---------------------------------------------------------------- el juego
const VERSO_PARCHIS: Verso = {
  text: "¿No sabéis que los que corren en el estadio, todos a la verdad corren, pero uno solo se lleva el premio? Corred de tal manera que lo obtengáis.",
  ref: "1 Corintios 9:24",
};

const enMeta = (e: EstadoParchis, a: number) => e.fichas[a].filter((p) => p === META).length;

export const PARCHIS_MESA: JuegoDeMesa<EstadoParchis, JugadaParchis, VistaParchis> = {
  id: "parchis",
  nombre: "Parchís",
  icono: "🟡",
  corto: "Cuatro fichas, un dado y la vuelta al estadio: come, haz barreras y llega a la corona.",
  como: [
    "Cada uno tiene sus fichas en casa. Para sacar una a la pista hay que sacar un 5 (y con un 5 es obligatorio sacarla).",
    "Toca el dado y mueve una ficha esas casillas en la vuelta del estadio. Al terminar la vuelta entra por su camino de llegada hasta la corona del centro, con el número justo.",
    "Si caes donde hay una ficha de otro color, te la comes: vuelve a su casa y tú cuentas 20 con una ficha. En los seguros (los aros) no se come. Al llegar a la corona cuentas 10.",
    "Dos fichas del mismo color en una casilla son una barrera: nadie pasa. Con un 6 hay que abrirla.",
    "Con un 6 tiras otra vez; con tres seises seguidos, la última ficha que moviste vuelve a casa. Gana quien mete todas sus fichas.",
  ],
  verso: VERSO_PARCHIS,
  min: 2,
  max: 4,
  modo: "turnos",
  relojMs: 25_000,
  pensarMs: { facil: [600, 1200], normal: [450, 950], dificil: [400, 850] },
  ancha: true,
  opciones: [
    {
      id: "fichas",
      nombre: "Fichas de cada uno",
      valores: [
        { id: "4", nombre: "4 (la de siempre)" },
        { id: "2", nombre: "2 (más corta)" },
      ],
      inicial: "4",
    },
  ],
  estadoInicial(asientos, _azar, opciones) {
    return estadoInicialParchis(asientos, opciones?.fichas === "2" ? 2 : 4);
  },
  turnoDe: (e) => (e.fase === "fin" ? null : e.turno),
  jugadasValidas: jugadasParchis,
  esValida(e, a, j) {
    if (e.fase === "fin" || a !== e.turno) return false;
    if (esTirar(j)) return e.fase === "tirar";
    return esMover(j) && e.fase === "mover" && !!e.cuenta && j.n === e.cuenta.n && movimientos(e, a).some((x) => x.f === j.f);
  },
  aplicar: (e, a, j, azar) => aplicarParchis(e, a, j, azar),
  porQueNo(e, a, j) {
    if (e.fase === "fin") return "La partida terminó.";
    if (a !== e.turno) return "Todavía no es tu turno.";
    if (esTirar(j)) return e.fase === "tirar" ? null : "Ya tiraste: elige la ficha que mueves.";
    if (!esMover(j)) return "Esa jugada no vale.";
    if (e.fase === "tirar") return "Primero toca el dado.";
    if (!e.cuenta || j.n !== e.cuenta.n) return `Ahora se cuentan ${e.cuenta?.n ?? 0}.`;
    if (j.f < 0 || j.f >= e.nFichas) return "Esa ficha no existe.";
    return movimientos(e, a).some((x) => x.f === j.f) ? null : "Esa ficha no puede moverse con ese número.";
  },
  terminado(e): ResultadoMesa | null {
    if (e.fase !== "fin") return null;
    const nombre = (i: number) => e.asientos[i]?.nombre ?? `Asiento ${i + 1}`;
    const ganadores = e.ganador === null ? [] : [e.ganador];
    const puntos = e.asientos.map((_, a) => avanceTotal(e, a));
    const detalle = e.asientos.map((_, a) => {
      const m = enMeta(e, a);
      const color = NOMBRES_COLOR[e.colores[a]];
      if (m === e.nFichas) return `${color} · ¡todas en la corona!`;
      const comio = e.comio[a] ? ` · comió ${e.comio[a]}` : "";
      return `${color} · ${m} de ${e.nFichas} en la corona${comio}`;
    });
    const g = e.ganador;
    const titulo =
      g === null
        ? "La partida terminó."
        : enMeta(e, g) === e.nFichas
          ? `¡${nombre(g)} llegó a la corona con todas sus fichas!`
          : `Se acabaron las tiradas: gana ${nombre(g)}, que avanzó más.`;
    return { ganadores, puntos, detalle, titulo };
  },
  vistaPara(e) {
    // en el parchís todo está a la vista
    return {
      colores: e.colores,
      nFichas: e.nFichas,
      fichas: e.fichas,
      turno: e.turno,
      fase: e.fase,
      dado: e.dado,
      cuenta: e.cuenta,
      seises: e.seises,
      repite: e.repite,
      ultima: e.ultima,
      ganador: e.ganador,
      tiradas: e.tiradas,
      comio: e.comio,
      comidas: e.comidas,
      ev: e.ev,
      eventos: e.eventos,
    };
  },
  jugadaDeBot: (e, a, nivel, azar) => jugadaBotParchis(e, a, nivel, azar),
  jugadaPorTiempo: (e, a, azar) => jugadaBotParchis(e, a, "normal", azar),
  cambiarAsiento: (e, a, nuevo) => ({ ...e, asientos: e.asientos.map((x, i) => (i === a ? { ...nuevo } : x)) }),
  esperaMs: (e) => e.animaMs,
};
