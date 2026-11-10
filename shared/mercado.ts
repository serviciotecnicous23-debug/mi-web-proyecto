/**
 * El gozo de Jerusalén en línea y el mercado de la plaza:
 * - El gozo se gana sirviendo (cada deber, preguntas, encargos, estudios, la ofrenda del barrio) y
 *   vendiendo a los mercaderes lo que dan el huerto y los siervos.
 * - Se gasta en el mercado: semillas para el huerto de la casa, adornos para la casa, ropa (un manto
 *   y una faja que ven los vecinos) y el letrero con el nombre de la casa.
 * - Cada día hay dos ofertas (30 % menos), las mismas para todos.
 * - El huerto: parcelas según el nivel de la casa; se siembra, se riega una vez (crece más rápido
 *   y da uno más) y se cosecha al alfolí, para ofrecerlo en el templo (honra) o venderlo (gozo).
 * «El peso falso es abominación a Jehová; Mas la pesa cabal le agrada» (Proverbios 11:1): precios fijos.
 */

import { MUEBLES } from "./casa-interior";

export type Categoria = "semilla" | "adorno" | "ropa" | "letrero" | "mueble";
export type TabMercado = Categoria | "vender";
export type Articulo = { id: string; categoria: Categoria; nombre: string; icono: string; precio: number; detalle: string; color?: string };

export const ARTICULOS: Articulo[] = [
  // semillas
  { id: "trigo", categoria: "semilla", nombre: "Semilla de trigo", icono: "🌾", precio: 5, detalle: "Crece en 40 min y da 4 de flor de harina." },
  { id: "cebada", categoria: "semilla", nombre: "Semilla de cebada", icono: "🌱", precio: 3, detalle: "Crece en 25 min y da 3 de flor de harina." },
  { id: "olivo", categoria: "semilla", nombre: "Brote de olivo", icono: "🫒", precio: 8, detalle: "Crece en 60 min y da 3 de aceite." },
  // adornos de la casa
  { id: "maceta", categoria: "adorno", nombre: "Maceta con flores", icono: "🌸", precio: 20, detalle: "Alegra la puerta de tu casa." },
  { id: "cantaro", categoria: "adorno", nombre: "Cántaro de agua", icono: "🏺", precio: 15, detalle: "Agua fresca para quien llega." },
  { id: "banco", categoria: "adorno", nombre: "Banco de piedra", icono: "🪨", precio: 30, detalle: "Para sentarse a conversar con los vecinos." },
  { id: "lampara", categoria: "adorno", nombre: "Lámpara de aceite", icono: "🪔", precio: 40, detalle: "Alumbra la puerta de noche." },
  { id: "toldo", categoria: "adorno", nombre: "Toldo de colores", icono: "⛺", precio: 50, detalle: "Sombra en el patio para los días de calor." },
  { id: "telar", categoria: "adorno", nombre: "Telar", icono: "🧶", precio: 60, detalle: "Para tejer el lino de la casa." },
  { id: "parra", categoria: "adorno", nombre: "Parra", icono: "🍇", precio: 80, detalle: "«…cada uno debajo de su vid y debajo de su higuera…» (Miqueas 4:4)." },
  { id: "higuera", categoria: "adorno", nombre: "Higuera", icono: "🌳", precio: 100, detalle: "Da sombra y fruto junto a la casa." },
  { id: "palmera", categoria: "adorno", nombre: "Palmera", icono: "🌴", precio: 120, detalle: "Alta y verde, se ve desde lejos." },
  // ropa (los vecinos la ven)
  { id: "manto-lana", categoria: "ropa", nombre: "Manto de lana", icono: "🧥", precio: 30, detalle: "Manto sobre los hombros, color lana.", color: "#d9c9a8" },
  { id: "manto-cielo", categoria: "ropa", nombre: "Manto azul cielo", icono: "🧥", precio: 50, detalle: "Manto sobre los hombros, azul cielo.", color: "#7fb2d9" },
  { id: "manto-olivo", categoria: "ropa", nombre: "Manto verde olivo", icono: "🧥", precio: 50, detalle: "Manto sobre los hombros, verde olivo.", color: "#7a8a4a" },
  { id: "manto-granate", categoria: "ropa", nombre: "Manto granate", icono: "🧥", precio: 70, detalle: "Manto sobre los hombros, granate.", color: "#8a2f3a" },
  { id: "faja-ocre", categoria: "ropa", nombre: "Faja ocre", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, ocre.", color: "#c98a2b" },
  { id: "faja-azul", categoria: "ropa", nombre: "Faja azul", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, azul.", color: "#2f5aa8" },
  { id: "faja-verde", categoria: "ropa", nombre: "Faja verde", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, verde.", color: "#3d7a4a" },
  // el letrero de la casa
  { id: "letrero", categoria: "letrero", nombre: "Letrero de la casa", icono: "🪧", precio: 40, detalle: "Ponle nombre a tu casa: lo ven los vecinos." },
  // los muebles de la casa por dentro (shared/casa-interior.ts)
  ...MUEBLES,
];

export function articulo(id: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.id === id);
}

/** Nombres para el letrero (de la lista, para que todos sean buenos). */
export const LETREROS = [
  "Casa de paz", "Casa de oración", "Casa de alabanza", "Betel", "Casa de pan", "Casa del buen pastor",
  "Casa de la esperanza", "Casa de la luz", "Casa de fe", "Casa de gozo", "Casa de amor", "Casa de misericordia",
];

/** Gozo que se gana. */
export const GOZO = { deber: 1, acierto: 3, encargo: 10, encargosTodos: 15, seccion: 5, estudio: 25, barrio: 20 };

/** Lo que pagan los mercaderes por cada bien del alfolí. */
export const PRECIO_VENTA: Record<"harina" | "aceite" | "corderos", number> = { harina: 1, aceite: 2, corderos: 6 };

/** Las semillas: minutos para crecer, qué dan y cuánto. Regar una vez: 25 % más rápido y uno más. */
export const SEMILLAS: Record<"trigo" | "cebada" | "olivo", { minutos: number; da: "harina" | "aceite"; cuanto: number }> = {
  trigo: { minutos: 40, da: "harina", cuanto: 4 },
  cebada: { minutos: 25, da: "harina", cuanto: 3 },
  olivo: { minutos: 60, da: "aceite", cuanto: 3 },
};

/** Parcelas del huerto según el nivel de la casa (tienda 2 … aposento alto 5). */
export function parcelasHuerto(nivel: number): number {
  return Math.max(2, Math.min(5, 2 + nivel));
}

/** Adornos que caben según el nivel de la casa. */
export function lugaresAdornos(nivel: number): number {
  return Math.max(2, Math.min(8, 2 + nivel * 2));
}

/** Las dos ofertas del día (las mismas para todos): 30 % menos. */
export function ofertasDelDia(dia: string): string[] {
  let x = 2166136261;
  for (const ch of dia) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  const lista = ARTICULOS.filter((a) => a.categoria !== "letrero");
  const a = x % lista.length;
  const b = (a + 1 + ((x >>> 8) % (lista.length - 1))) % lista.length;
  return [lista[a].id, lista[b].id];
}

export function precioHoy(a: Articulo, dia: string): number {
  return ofertasDelDia(dia).includes(a.id) ? Math.max(1, Math.round(a.precio * 0.7)) : a.precio;
}

export type BienMercado = "harina" | "aceite" | "corderos";

/** Lo que más buscan hoy los mercaderes (lo pagan al doble): el mismo para todos. Conviene pensar si venderlo u ofrecerlo. */
export function demandaDelDia(dia: string): BienMercado {
  let x = 2166136261;
  for (const ch of `demanda:${dia}`) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return (["harina", "aceite", "corderos"] as const)[x % 3];
}

/** Lo que paga hoy el mercader por cada uno. */
export function precioVentaHoy(b: BienMercado, dia: string): number {
  return PRECIO_VENTA[b] * (demandaDelDia(dia) === b ? 2 : 1);
}

/** Los cuatro puestos de la plaza (de oeste a este) y lo que vende cada mercader. */
export const PUESTOS_MERCADO: { tab: Categoria | "vender"; nombre: string; icono: string; dice: string }[] = [
  { tab: "semilla", nombre: "El sembrador", icono: "🌾", dice: "Semillas de trigo y cebada, y brotes de olivo para tu huerto." },
  { tab: "adorno", nombre: "El alfarero", icono: "🏺", dice: "Macetas, cántaros, lámparas, y muebles para amueblar tu casa por dentro." },
  { tab: "ropa", nombre: "El tejedor", icono: "🧵", dice: "Mantos y fajas teñidos: tus vecinos los verán." },
  { tab: "vender", nombre: "El mercader", icono: "⚖️", dice: "Te compro lo de tu alfolí con pesa cabal." },
];

/** Los colores de la ropa elegida (para dibujarla). */
export function coloresDeIds(r: { manto?: string | null; faja?: string | null } | null | undefined): { manto?: string; faja?: string } {
  const out: { manto?: string; faja?: string } = {};
  const m = r?.manto ? articulo(r.manto) : undefined;
  const f = r?.faja ? articulo(r.faja) : undefined;
  if (m?.categoria === "ropa" && m.color) out.manto = m.color;
  if (f?.categoria === "ropa" && f.color) out.faja = f.color;
  return out;
}

// ---------------------------------------------------------------- el horno de la casa: preparar las ofrendas
/**
 * Con lo del alfolí se preparan ofrendas que valen más honra que los bienes sueltos (tardan en el
 * horno: hay que volver a sacarlas). En las fiestas del cereal, las tortas valen el doble.
 */
export type RecetaId = "tortas" | "aceitePuro";
export type Preparadas = Record<RecetaId, number>;
export const RECETAS: Record<RecetaId, { nombre: string; icono: string; pide: Partial<Record<BienMercado, number>>; minutos: number; honra: number; verso: { text: string; ref: string } }> = {
  tortas: {
    nombre: "Tortas amasadas con aceite",
    icono: "🫓",
    pide: { harina: 3, aceite: 1 },
    minutos: 10,
    honra: 14,
    verso: { text: "Cuando ofrecieres ofrenda cocida en horno, será de tortas de flor de harina sin levadura amasadas con aceite, y hojaldres sin levadura untadas con aceite.", ref: "Levítico 2:4" },
  },
  aceitePuro: {
    nombre: "Aceite puro para las lámparas",
    icono: "🪔",
    pide: { aceite: 3 },
    minutos: 15,
    honra: 12,
    verso: { text: "Y mandarás a los hijos de Israel que te traigan aceite puro de olivas machacadas, para el alumbrado, para hacer arder continuamente las lámparas.", ref: "Éxodo 27:20" },
  },
};
/** Cuántas a la vez caben en el horno. */
export const HORNO_MAX = 3;

/** Lo preparado y lo que está en el horno (de la columna `preparadas` de la casa). */
export function leerPreparadas(v: unknown): { preparadas: Preparadas; horno: { receta: RecetaId; cantidad: number; listo: string } | null } {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const n = (x: unknown) => Math.max(0, Math.floor(Number(x) || 0));
  const h = o.horno && typeof o.horno === "object" && !Array.isArray(o.horno) ? (o.horno as Record<string, unknown>) : {};
  const receta = h.receta === "tortas" || h.receta === "aceitePuro" ? h.receta : null;
  return {
    preparadas: { tortas: n(o.tortas), aceitePuro: n(o.aceitePuro) },
    horno: receta && typeof h.listo === "string" ? { receta, cantidad: Math.max(1, Math.min(HORNO_MAX, n(h.cantidad))), listo: h.listo } : null,
  };
}

/** Para guardar otra vez la columna (lo preparado y, si hay, lo del horno). */
export function guardarPreparadas(p: Preparadas, horno: { receta: RecetaId; cantidad: number; listo: string } | null): string {
  return JSON.stringify(horno ? { ...p, horno } : p);
}

// ---------------------------------------------------------------- respuestas de la API
export type Parcela = { semilla: "trigo" | "cebada" | "olivo" | null; plantado: string | null; regado: boolean; listo: boolean; faltan: number };
export type MercadoEstado = {
  dia: string;
  gozo: number;
  ofertas: string[];
  semillas: Record<string, number>;
  armario: string[];
  ropa: { manto: string | null; faja: string | null };
  adornos: string[];
  lugares: number;
  huerto: Parcela[];
  letrero: string | null;
  tieneLetrero: boolean;
  bienes: { harina: number; aceite: number; corderos: number };
  /** El nivel de la casa (algunos muebles piden una casa más grande). */
  nivel: number;
  /** Cuántos tiene de cada mueble (los pone en la casa por dentro). */
  muebles: Record<string, number>;
  /** Lo que el mercader paga al doble hoy. */
  demanda: BienMercado;
  /** Las ofrendas preparadas y lo que está en el horno (`faltan` en segundos). */
  preparadas: Preparadas;
  horno: { receta: RecetaId; cantidad: number; faltan: number } | null;
};
