/**
 * El taller (fase 3 de la economía del gozo, docs/guion-del-juego.md, capítulo 7), inspirado en Adopt Me!:
 *
 * - **El artesano**: con 4 iguales hace la pieza fina, dorada, sin nada al azar. Los muebles se juntan de los que tienes
 *   (primero los guardados; si faltan, los saca de tu casa y al terminar pone la pieza fina en ese lugar) y la ropa, del
 *   fardo. Cobra su jornal en gozo (el 10 % va al tesoro del templo), tarda unas horas y pide estudios aprobados en la
 *   escuela.
 * - **Los oficios de la casa**: el redil (los corderos que llevas del alfolí se quedan como ovejas y dan lana) y el telar
 *   (puesto dentro de tu casa, teje con la lana cojines, mantos y alfombras).
 * - **El fardo**: copias de la ropa, compradas en su tiempo, para venderlas o para llevarlas al artesano.
 * - **El intercambio**: los puestos de cosas entre vecinos (lana, ropa, muebles guardados y piezas finas). Lo de
 *   temporada, fuera de su tiempo, solo se consigue de otro jugador.
 *
 * Pesa cabal (Proverbios 11:1): precios dentro de un rango fijo y nada al azar.
 */
import { ARTICULOS, articulo, enTemporada, type Articulo } from "./mercado";
import type { Colocado } from "./casa-interior";
import { diaEnJerusalen, type DiaJerusalen } from "./anio";

type Verso = { text: string; ref: string };

export const VERSO_ARTESANO: Verso = {
  text: "y los ha llenado de sabiduría de corazón, para que hagan toda obra de arte y de invención, y de bordado en azul, en púrpura, en carmesí, en lino fino y en telar, para que hagan toda labor, e inventen todo diseño.",
  ref: "Éxodo 35:35",
};
export const VERSO_REDIL: Verso = { text: "Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños;", ref: "Proverbios 27:23" };
export const VERSO_TELAR: Verso = { text: "Busca lana y lino, Y con voluntad trabaja con sus manos.", ref: "Proverbios 31:13" };
export const VERSO_INTERCAMBIO: Verso = { text: "Hace telas, y vende, Y da cintas al mercader.", ref: "Proverbios 31:24" };
export const VERSO_TIEMPO: Verso = { text: "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.", ref: "Eclesiastés 3:1" };

const HORA = 3_600_000;
const entero = (x: unknown) => Math.max(0, Math.floor(Number(x) || 0));
const fecha = (x: unknown): string | null => (typeof x === "string" && Number.isFinite(new Date(x).getTime()) ? x : null);

// ---------------------------------------------------------------- el artesano: la pieza fina
/** Cuántas iguales pide el artesano para una pieza fina. */
export const IGUALES = 4;
/** Cuántas copias de cada prenda caben en el fardo. */
export const FARDO_MAX = 4;

/** La pieza fina que sale de un artículo (si tiene). */
export function finaDe(id: string): Articulo | undefined {
  const f = articulo(`${id}-oro`);
  return f?.fina === id ? f : undefined;
}

/** Lo que se puede llevar al artesano: los muebles del mercado y la ropa que se vende. */
export const PARA_EL_ARTESANO: Articulo[] = ARTICULOS.filter((a) => !a.exclusivo && (a.categoria === "mueble" || a.categoria === "ropa") && !!finaDe(a.id));

/** Estudios aprobados en la escuela que pide cada pieza fina (las más caras, más). */
export function estudiosDeFina(base: Articulo): number {
  return base.precio >= 60 ? 3 : base.precio >= 30 ? 2 : 1;
}
/** El jornal del artesano, en gozo: el doble de lo que vale una pieza. */
export function jornalDeFina(base: Articulo): number {
  return base.precio * 2;
}
/** Las horas que tarda el artesano (de 1 a 6). */
export function horasDeFina(base: Articulo): number {
  return Math.max(1, Math.min(6, Math.ceil(base.precio / 15)));
}

/** Por qué no se puede llevar al artesano ahora (o null si se puede). */
export function porQueNoFina(
  base: Articulo,
  c: { tengo: number; estudios: number; ocupado: boolean; gozo: number; cabe: boolean },
): string | null {
  if (!finaDe(base.id)) return "Esa pieza no la hace el artesano.";
  if (c.ocupado) return "El artesano está haciendo otra pieza tuya: espera a que la termine.";
  if (c.tengo < IGUALES) {
    const falta = IGUALES - c.tengo;
    return base.categoria === "ropa"
      ? `Pide ${IGUALES} iguales en tu fardo: te ${falta === 1 ? "falta 1" : `faltan ${falta}`}.`
      : `Pide ${IGUALES} iguales: te ${falta === 1 ? "falta 1" : `faltan ${falta}`}.`;
  }
  const est = estudiosDeFina(base);
  if (c.estudios < est) return `Pide ${est === 1 ? "un estudio aprobado" : `${est} estudios aprobados`} en la escuela (tienes ${c.estudios}).`;
  if (!c.cabe) return "Ya no te cabe otra pieza fina igual.";
  const j = jornalDeFina(base);
  if (c.gozo < j) return `El jornal del artesano es de ${j} de gozo (tienes ${c.gozo}).`;
  return null;
}

// ---------------------------------------------------------------- el redil: las ovejas dan lana
/** Cuántas ovejas caben en el redil según la casa (la tienda, adobe, piedra y aposento alto). */
export const OVEJAS_MAX = [2, 3, 4, 6];
export function ovejasMax(nivel: number): number {
  return OVEJAS_MAX[Math.max(0, Math.min(3, Math.floor(nivel)))] ?? 2;
}
/** Cada oveja da 1 de lana cada 8 horas, y se junta hasta 3 (un día): hay que trasquilarlas. */
export const LANA_HORAS = 8;
export const LANA_TOPE_POR_OVEJA = 3;

export type Redil = { ovejas: number; desde: string | null; pendiente: number };

/** La lana que tienen las ovejas ahora (`asentado`: el redil al día, para guardarlo). */
export function lanaDelRedil(r: Redil, ahora = Date.now()): { lista: number; tope: number; proxima: number | null; asentado: Redil } {
  const ovejas = entero(r.ovejas);
  const tope = ovejas * LANA_TOPE_POR_OVEJA;
  if (!ovejas || !r.desde) return { lista: Math.min(tope, entero(r.pendiente)), tope, proxima: ovejas ? LANA_HORAS * 3600 : null, asentado: { ovejas, desde: ovejas ? new Date(ahora).toISOString() : null, pendiente: Math.min(tope, entero(r.pendiente)) } };
  const desde = new Date(r.desde).getTime();
  const vueltas = Math.max(0, Math.floor((ahora - desde) / (LANA_HORAS * HORA)));
  const lista = Math.min(tope, entero(r.pendiente) + vueltas * ovejas);
  const lleno = lista >= tope;
  const nuevoDesde = lleno ? ahora : desde + vueltas * LANA_HORAS * HORA;
  return {
    lista,
    tope,
    proxima: lleno ? null : Math.max(1, Math.ceil((nuevoDesde + LANA_HORAS * HORA - ahora) / 1000)),
    asentado: { ovejas, desde: new Date(nuevoDesde).toISOString(), pendiente: lista },
  };
}

// ---------------------------------------------------------------- el telar: la lana se teje
export type RecetaTelarId = "cojines" | "manto-lana" | "alfombra";
export const TELAR: Record<RecetaTelarId, { nombre: string; icono: string; lana: number; minutos: number; da: string }> = {
  cojines: { nombre: "Cojines de lana", icono: "🛋️", lana: 2, minutos: 30, da: "cojines" },
  "manto-lana": { nombre: "Manto de lana", icono: "🧥", lana: 3, minutos: 60, da: "manto-lana" },
  alfombra: { nombre: "Alfombra de lana", icono: "🟧", lana: 5, minutos: 120, da: "alfombra" },
};
export const RECETAS_TELAR = Object.keys(TELAR) as RecetaTelarId[];
export function esRecetaTelar(v: unknown): v is RecetaTelarId {
  return typeof v === "string" && v in TELAR;
}
/** El telar de la casa: hay que tenerlo puesto dentro (también vale el dorado). */
export const MUEBLE_TELAR = "telar-casa";

// ---------------------------------------------------------------- lo guardado en la casa (columna `oficios`)
export type ArtesanoGuardado = { pieza: string; desde: string; lista: string; /** dónde estaba el mueble que sacó de la casa */ lugar?: Colocado };
export type TelarGuardado = { receta: RecetaTelarId; desde: string; lista: string };
export type OficiosGuardados = { redil: Redil; lana: number; telar: TelarGuardado | null; artesano: ArtesanoGuardado | null };

export function leerOficios(v: unknown): OficiosGuardados {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const r = o.redil && typeof o.redil === "object" && !Array.isArray(o.redil) ? (o.redil as Record<string, unknown>) : {};
  const t = o.telar && typeof o.telar === "object" && !Array.isArray(o.telar) ? (o.telar as Record<string, unknown>) : null;
  const a = o.artesano && typeof o.artesano === "object" && !Array.isArray(o.artesano) ? (o.artesano as Record<string, unknown>) : null;
  const telar = t && esRecetaTelar(t.receta) && fecha(t.desde) && fecha(t.lista) ? { receta: t.receta, desde: t.desde as string, lista: t.lista as string } : null;
  let artesano: ArtesanoGuardado | null = null;
  if (a && typeof a.pieza === "string" && articulo(a.pieza)?.fina && fecha(a.desde) && fecha(a.lista)) {
    artesano = { pieza: a.pieza, desde: a.desde as string, lista: a.lista as string };
    const l = a.lugar && typeof a.lugar === "object" ? (a.lugar as Record<string, unknown>) : null;
    if (l && typeof l.m === "string" && [0, 1, 2, 3].includes(Number(l.r)) && [0, 1].includes(Number(l.p)) && Number.isInteger(l.x) && Number.isInteger(l.z)) {
      artesano.lugar = { m: l.m, x: Number(l.x), z: Number(l.z), r: Number(l.r) as Colocado["r"], p: Number(l.p) as Colocado["p"] };
    }
  }
  return { redil: { ovejas: entero(r.ovejas), desde: fecha(r.desde), pendiente: entero(r.pendiente) }, lana: entero(o.lana), telar, artesano };
}

/** El fardo (columna `fardo`): cuántas copias hay de cada prenda. */
export function leerFardo(v: unknown): Record<string, number> {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const out: Record<string, number> = {};
  for (const [k, n] of Object.entries(o)) {
    const a = articulo(k);
    const c = entero(n);
    if (a?.categoria === "ropa" && c > 0) out[k] = c;
  }
  return out;
}

// ---------------------------------------------------------------- el intercambio: los puestos de cosas
export const LANA = "lana";
/** Puestos de cosas abiertos por persona, cuánto duran y cuánto cabe en uno. */
export const PUESTOS_COSAS_MAX = 3;
export const PUESTO_COSAS_HORAS = 48;
export const COSAS_POR_PUESTO = 4;
export const LANA_POR_PUESTO = 30;
/** La lana, por unidad. */
export const LANA_PRECIO = { min: 1, max: 6 };

/** El nombre y el dibujo de cada cosa (la lana o un artículo). */
export function nombreDeCosa(id: string): string {
  return id === LANA ? "Lana" : articulo(id)?.nombre ?? id;
}
export function iconoDeCosa(id: string): string {
  return id === LANA ? "🧶" : articulo(id)?.icono ?? "📦";
}

/**
 * Lo que se puede poner en un puesto de cosas y su rango de precio por unidad (null si no se puede): la lana, la ropa y
 * los muebles que se venden en el mercado, y las piezas finas. Lo que se vende siempre no pasa de su precio del mercado;
 * la ropa de temporada, fuera de su tiempo, vale de 1 a 3 veces su precio; las piezas finas, de 4 a 8 veces la pieza de
 * donde salen. Lo que no se vende (los trajes de los sabios, las prendas de la historia, el mejor vestido) no se cambia.
 */
export function rangoDeCosa(id: string, d: DiaJerusalen = diaEnJerusalen()): { min: number; max: number; fueraDeTiempo: boolean } | null {
  if (id === LANA) return { ...LANA_PRECIO, fueraDeTiempo: false };
  const a = articulo(id);
  if (!a || (a.categoria !== "ropa" && a.categoria !== "mueble")) return null;
  if (a.fina) {
    const b = articulo(a.fina);
    return b ? { min: b.precio * 4, max: b.precio * 8, fueraDeTiempo: false } : null;
  }
  if (a.exclusivo) return null;
  if (a.deTemporada && !enTemporada(a, d)) return { min: a.precio, max: a.precio * 3, fueraDeTiempo: true };
  return { min: Math.max(1, Math.ceil(a.precio / 2)), max: a.precio, fueraDeTiempo: false };
}

// ---------------------------------------------------------------- respuestas de la API
export type TallerEstado = {
  gozo: number;
  nivel: number;
  estudios: number;
  /** Cuántos tiene de cada mueble y cuántos de esos están puestos en la casa. */
  muebles: Record<string, number>;
  puestos: Record<string, number>;
  armario: string[];
  fardo: Record<string, number>;
  /** La pieza que está haciendo el artesano (`faltan` y `total` en segundos). */
  artesano: { pieza: string; faltan: number; total: number } | null;
  /** La pieza fina que terminó desde la última vez (para avisar). */
  terminada: string | null;
  redil: { ovejas: number; max: number; lista: number; tope: number; proxima: number | null };
  lana: number;
  lanaMax: number;
  corderos: number;
  tieneTelar: boolean;
  telar: { receta: RecetaTelarId; faltan: number; total: number } | null;
  /** Lo que terminó de tejer el telar desde la última vez (para avisar). */
  tejido: RecetaTelarId | null;
};

export type CosaPuesto = {
  id: number;
  vendedor: string;
  vendedorId: number;
  cosa: string;
  cantidad: number;
  precio: number;
  /** Segundos que faltan para que cierre (lo calcula el servidor). */
  quedan: number;
  mio: boolean;
  /** Ropa de temporada fuera de su tiempo: hoy no se vende en el mercado. */
  fueraDeTiempo: boolean;
};
export type CosaVendida = { cosa: string; cantidad: number; ganado: number; diezmo: number };
export type ParaVender = { cosa: string; tengo: number; min: number; max: number; fueraDeTiempo: boolean; de: "lana" | "fardo" | "armario" | "muebles" };
export type CosasEstado = {
  abiertos: CosaPuesto[];
  mios: CosaPuesto[];
  ventasNuevas: CosaVendida[];
  gozo: number;
  /** Lo que puedes poner en un puesto (cuántos tienes y el rango de precio). */
  paraVender: ParaVender[];
  /** Cuántos más te caben de cada cosa que venden tus vecinos. */
  caben: Record<string, number>;
};
