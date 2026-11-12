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

import { MUEBLES, VALOR_FINA } from "./casa-interior";
import { TRAJES_SABIOS } from "./sabio";
import { PRENDAS_CAPITULOS } from "./capitulos";
import { PRENDA_REGRESO } from "./regreso";
import { diaEnJerusalen, factorPrecio, mediodiaDe, type DiaJerusalen, type EstacionId } from "./anio";

export type Categoria = "semilla" | "adorno" | "ropa" | "letrero" | "mueble";
export type TabMercado = Categoria | "vender" | "vecinos" | "intercambio" | "taller";
export type Articulo = {
  id: string;
  categoria: Categoria;
  nombre: string;
  icono: string;
  precio: number;
  detalle: string;
  color?: string;
  /**
   * No se vende: se gana. «sabio»: los trajes de los sabios, en la casa de la sabiduría (shared/sabio.ts); «temporada»:
   * las prendas de la historia de la temporada (shared/capitulos.ts); «regreso»: el mejor vestido, al volver a
   * Jerusalén después de una semana o más (shared/regreso.ts); «taller»: las piezas finas, que hace el artesano con 4
   * iguales (shared/taller.ts).
   */
  exclusivo?: "sabio" | "temporada" | "regreso" | "taller";
  /** Una pieza fina del artesano (shared/taller.ts): el artículo de donde sale (con 4 iguales). */
  fina?: string;
  /** De temporada: solo se vende en su estación o en los días de sus eventos del año (shared/anio.ts). Quien la compra, la guarda. */
  deTemporada?: { estacion: EstacionId } | { eventos: string[] };
};

/** La ropa del año: cada estación y cada fiesta grande trae su prenda, que solo se vende en su tiempo. */
export const ROPA_DEL_ANIO: Articulo[] = [
  { id: "manto-lagar", categoria: "ropa", nombre: "Manto del lagar", icono: "🍇", precio: 70, detalle: "Color vino nuevo, de la cosecha de las uvas.", color: "#6d2a4a", deTemporada: { estacion: "cosecha" } },
  { id: "faja-lluvia-temprana", categoria: "ropa", nombre: "Faja de la lluvia temprana", icono: "🌦️", precio: 40, detalle: "Gris azul, como las nubes del tiempo de la siembra.", color: "#6f93ab", deTemporada: { estacion: "siembra" } },
  { id: "manto-invierno", categoria: "ropa", nombre: "Manto de lana gruesa", icono: "🧣", precio: 70, detalle: "Abriga en el frío del invierno de Jerusalén.", color: "#4a4f63", deTemporada: { estacion: "invierno" } },
  { id: "faja-almendro", categoria: "ropa", nombre: "Faja de flor de almendro", icono: "🌸", precio: 40, detalle: "Rosa pálido, como el almendro, que florece primero (Jeremías 1:11).", color: "#efc7d6", deTemporada: { estacion: "cebada" } },
  { id: "manto-trigo", categoria: "ropa", nombre: "Manto de trigo dorado", icono: "🌾", precio: 70, detalle: "Dorado como los campos en la siega del trigo.", color: "#d6ad52", deTemporada: { estacion: "trigo" } },
  { id: "faja-higo", categoria: "ropa", nombre: "Faja color higo", icono: "☀️", precio: 40, detalle: "Morada, como los higos maduros del verano.", color: "#6e3b5c", deTemporada: { estacion: "verano" } },
  { id: "faja-luna-nueva", categoria: "ropa", nombre: "Faja de la luna nueva", icono: "🌙", precio: 30, detalle: "Plateada. Solo el primer día de cada mes hebreo.", color: "#b9c2cf", deTemporada: { eventos: ["lunaNueva"] } },
  { id: "faja-pascua", categoria: "ropa", nombre: "Faja de la Pascua", icono: "🐑", precio: 50, detalle: "Roja, en memoria del cordero de la Pascua. En la Pascua y los panes sin levadura.", color: "#a3243b", deTemporada: { eventos: ["pascua", "panes"] } },
  { id: "manto-alba", categoria: "ropa", nombre: "Manto del alba", icono: "🌅", precio: 90, detalle: "Color del amanecer del domingo de Resurrección. Solo en la Semana Santa.", color: "#f2a65a", deTemporada: { eventos: ["semanaSanta"] } },
  { id: "faja-palmas", categoria: "ropa", nombre: "Faja de ramas de palma", icono: "🌿", precio: 50, detalle: "Verde, como las enramadas de la fiesta (Levítico 23:40). En los tabernáculos.", color: "#4f7d3a", deTemporada: { eventos: ["tabernaculos", "asamblea"] } },
  { id: "manto-profecia", categoria: "ropa", nombre: "Manto de la profecía", icono: "⭐", precio: 90, detalle: "Marfil, para celebrar la profecía del niño (Isaías 9:6). Solo el 24 y el 25 de diciembre.", color: "#efe6cf", deTemporada: { eventos: ["navidad"] } },
  { id: "faja-anio-nuevo", categoria: "ropa", nombre: "Faja del año nuevo", icono: "🎉", precio: 40, detalle: "Turquesa, para empezar el año. Solo el 1 de enero.", color: "#3aa3a0", deTemporada: { eventos: ["anioNuevo"] } },
];

/** La ropa que siempre se vende (los vecinos la ven). */
const ROPA_DE_SIEMPRE: Articulo[] = [
  { id: "manto-lana", categoria: "ropa", nombre: "Manto de lana", icono: "🧥", precio: 30, detalle: "Manto sobre los hombros, color lana.", color: "#d9c9a8" },
  { id: "manto-cielo", categoria: "ropa", nombre: "Manto azul cielo", icono: "🧥", precio: 50, detalle: "Manto sobre los hombros, azul cielo.", color: "#7fb2d9" },
  { id: "manto-olivo", categoria: "ropa", nombre: "Manto verde olivo", icono: "🧥", precio: 50, detalle: "Manto sobre los hombros, verde olivo.", color: "#7a8a4a" },
  { id: "manto-granate", categoria: "ropa", nombre: "Manto granate", icono: "🧥", precio: 70, detalle: "Manto sobre los hombros, granate.", color: "#8a2f3a" },
  { id: "faja-ocre", categoria: "ropa", nombre: "Faja ocre", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, ocre.", color: "#c98a2b" },
  { id: "faja-azul", categoria: "ropa", nombre: "Faja azul", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, azul.", color: "#2f5aa8" },
  { id: "faja-verde", categoria: "ropa", nombre: "Faja verde", icono: "🎗️", precio: 20, detalle: "Faja en la cintura, verde.", color: "#3d7a4a" },
];

/**
 * La ropa fina del artesano (shared/taller.ts): con 4 iguales del fardo hace la misma prenda con su orla de oro, que se
 * ve en la ciudad. No se vende: se hace. Vale como las 4 prendas y el jornal del artesano.
 */
export const ROPA_FINA: Articulo[] = [...ROPA_DE_SIEMPRE, ...ROPA_DEL_ANIO].map((a) => ({
  id: `${a.id}-oro`,
  categoria: "ropa",
  nombre: `${a.nombre} ${a.id.startsWith("manto-") ? "bordado" : "bordada"} de oro`,
  icono: a.icono,
  precio: a.precio * VALOR_FINA,
  detalle: `Pieza fina del artesano, hecha con 4 de «${a.nombre}»: lleva su orla de oro. No se vende: se hace.`,
  color: a.color,
  exclusivo: "taller",
  fina: a.id,
}));

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
  ...ROPA_DE_SIEMPRE,
  // la ropa del año: solo en su estación o en su fiesta
  ...ROPA_DEL_ANIO,
  // los trajes de los sabios: no se venden, se ganan en «¿Quién es sabio?» (shared/sabio.ts, TRAJES_SABIOS)
  ...TRAJES_SABIOS.map((t): Articulo => ({
    id: t.id,
    categoria: "ropa",
    nombre: t.nombre,
    icono: t.id.startsWith("manto") ? "🥻" : "🎖️",
    precio: 0,
    detalle: `Traje de los sabios: ${t.requisito.toLowerCase()} en la casa de la sabiduría.`,
    color: t.color,
    exclusivo: "sabio",
  })),
  // las prendas de la historia de la temporada: tampoco se venden (shared/capitulos.ts, PRENDAS_CAPITULOS)
  ...PRENDAS_CAPITULOS.map((t): Articulo => ({
    id: t.id,
    categoria: "ropa",
    nombre: t.nombre,
    icono: t.id.startsWith("manto") ? "🥻" : "🎖️",
    precio: 0,
    detalle: `De la historia de la temporada: ${t.requisito.toLowerCase()}.`,
    color: t.color,
    exclusivo: "temporada",
  })),
  // el mejor vestido: tampoco se vende, se recibe al volver a Jerusalén después de una semana o más (shared/regreso.ts)
  {
    id: PRENDA_REGRESO.id,
    categoria: "ropa",
    nombre: PRENDA_REGRESO.nombre,
    icono: "🥻",
    precio: 0,
    detalle: "Se recibe al volver a Jerusalén después de una semana o más: «Sacad el mejor vestido, y vestidle» (Lucas 15:22).",
    color: PRENDA_REGRESO.color,
    exclusivo: "regreso",
  },
  // la ropa fina del artesano: tampoco se vende (shared/taller.ts)
  ...ROPA_FINA,
  // el letrero de la casa
  { id: "letrero", categoria: "letrero", nombre: "Letrero de la casa", icono: "🪧", precio: 40, detalle: "Ponle nombre a tu casa: lo ven los vecinos." },
  // los muebles de la casa por dentro (shared/casa-interior.ts)
  ...MUEBLES,
];

export function articulo(id: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.id === id);
}

/** ¿Se vende hoy? La ropa de temporada solo en su estación o en los días de sus eventos. */
export function enTemporada(a: Articulo, d: DiaJerusalen = diaEnJerusalen()): boolean {
  const t = a.deTemporada;
  if (!t) return true;
  return "estacion" in t ? d.estacion.id === t.estacion : d.eventos.some((e) => t.eventos.includes(e.evento.id));
}

export type TiempoDeVenta = { hoy: boolean; /** si hoy se vende: días que quedan, contando hoy */ quedan: number | null; /** si no: en cuántos días vuelve */ vuelve: number | null };

/** Cuándo se vende cada prenda de temporada (una sola vuelta por los días que vienen). */
export function calendarioDeTemporada(t = Date.now(), hasta = 400): Record<string, TiempoDeVenta> {
  const de = ARTICULOS.filter((a) => a.deTemporada);
  const out: Record<string, TiempoDeVenta> = {};
  const base = mediodiaDe(diaEnJerusalen(t).iso);
  for (let i = 0; i <= hasta; i++) {
    const d = diaEnJerusalen(base + i * 86_400_000);
    let falta = false;
    for (const a of de) {
      const si = enTemporada(a, d);
      const o = (out[a.id] ??= { hoy: si, quedan: null, vuelve: null });
      if (o.hoy && o.quedan === null) {
        if (!si) o.quedan = i;
        else falta = true;
      } else if (!o.hoy && o.vuelve === null) {
        if (si) o.vuelve = i;
        else falta = true;
      }
    }
    if (!falta) break;
  }
  return out;
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
  // la ropa de temporada no entra en las ofertas (las ofertas de cada día quedan como antes)
  const lista = ARTICULOS.filter((a) => a.categoria !== "letrero" && !a.exclusivo && !a.deTemporada);
  const a = x % lista.length;
  const b = (a + 1 + ((x >>> 8) % (lista.length - 1))) % lista.length;
  return [lista[a].id, lista[b].id];
}

export function precioHoy(a: Articulo, dia: string): number {
  return ofertasDelDia(dia).includes(a.id) ? Math.max(1, Math.round(a.precio * 0.7)) : a.precio;
}

export type BienMercado = "harina" | "aceite" | "corderos";
/** El nombre de cada bien en una frase («de flor de harina»). */
export const BIEN_MERCADO_NOMBRE: Record<BienMercado, string> = { harina: "flor de harina", aceite: "aceite", corderos: "corderos" };

/**
 * Lo que más buscan hoy los mercaderes (lo pagan al doble): el mismo para todos. Depende de la estación del año
 * (shared/anio.ts): lo que escasea se busca más seguido (la harina en invierno, el aceite en verano) y lo que abunda,
 * menos (la harina en la siega del trigo). Conviene guardar en el alfolí y vender cuando lo buscan.
 */
export function demandaDelDia(dia: string): BienMercado {
  let x = 2166136261;
  for (const ch of `demanda:${dia}`) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  const bienes = ["harina", "aceite", "corderos"] as const;
  const d = diaEnJerusalen(mediodiaDe(dia));
  const pesos = bienes.map((b) => factorPrecio(b, d) ** 4);
  let r = ((x % 100000) / 100000) * pesos.reduce((a, p) => a + p, 0);
  for (let i = 0; i < bienes.length; i++) {
    r -= pesos[i];
    if (r < 0) return bienes[i];
  }
  return bienes[bienes.length - 1];
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
  { tab: "vender", nombre: "El mercader", icono: "⚖️", dice: "Te compro lo de tu alfolí con pesa cabal. Si quieres más, véndeselo a tus vecinos en «Vecinos»." },
];

/** Cómo se ve la ropa de alguien: los colores del manto y la faja, y si son finos (con su orla de oro). */
export type RopaVista = { manto?: string; faja?: string; mantoOro?: true; fajaOro?: true };

/** Los colores de la ropa elegida (para dibujarla). */
export function coloresDeIds(r: { manto?: string | null; faja?: string | null } | null | undefined): RopaVista {
  const out: RopaVista = {};
  const m = r?.manto ? articulo(r.manto) : undefined;
  const f = r?.faja ? articulo(r.faja) : undefined;
  if (m?.categoria === "ropa" && m.color) {
    out.manto = m.color;
    if (m.fina) out.mantoOro = true;
  }
  if (f?.categoria === "ropa" && f.color) {
    out.faja = f.color;
    if (f.fina) out.fajaOro = true;
  }
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
/** Cuántas a la vez caben en el horno (con el horno de barro de las obras de la casa, shared/obras.ts, caben más). */
export const HORNO_MAX = 3;
export const HORNO_GRANDE = 5;

/** Lo preparado y lo que está en el horno (de la columna `preparadas` de la casa). */
export function leerPreparadas(v: unknown): { preparadas: Preparadas; horno: { receta: RecetaId; cantidad: number; listo: string } | null } {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const n = (x: unknown) => Math.max(0, Math.floor(Number(x) || 0));
  const h = o.horno && typeof o.horno === "object" && !Array.isArray(o.horno) ? (o.horno as Record<string, unknown>) : {};
  const receta = h.receta === "tortas" || h.receta === "aceitePuro" ? h.receta : null;
  return {
    preparadas: { tortas: n(o.tortas), aceitePuro: n(o.aceitePuro) },
    horno: receta && typeof h.listo === "string" ? { receta, cantidad: Math.max(1, Math.min(HORNO_GRANDE, n(h.cantidad))), listo: h.listo } : null,
  };
}

/** Para guardar otra vez la columna (lo preparado y, si hay, lo del horno). */
export function guardarPreparadas(p: Preparadas, horno: { receta: RecetaId; cantidad: number; listo: string } | null): string {
  return JSON.stringify(horno ? { ...p, horno } : p);
}

// ---------------------------------------------------------------- respuestas de la API
export type Parcela = {
  semilla: "trigo" | "cebada" | "olivo" | null;
  plantado: string | null;
  regado: boolean;
  listo: boolean;
  faltan: number;
  /** la regó la lluvia del día en que se sembró */
  lluvia?: boolean;
  /** la regó la cisterna de la casa al sembrarla (shared/obras.ts) */
  cisterna?: boolean;
};
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
  /** Lo que paga hoy el mercader por cada uno (baja cuando ya compró mucho en la ciudad). */
  precios: Record<BienMercado, number>;
  /** Cuánto le compró hoy el mercader a toda la ciudad. */
  vendidosHoy: Record<BienMercado, number>;
  /** Los muebles útiles puestos dentro de la casa (molino, vasijas, tinaja). */
  ayudas: string[];
  /** Las ofrendas preparadas y lo que está en el horno (`faltan` en segundos). */
  preparadas: Preparadas;
  horno: { receta: RecetaId; cantidad: number; faltan: number } | null;
  /** Cuántas caben en el horno (con el horno de barro de las obras, más). */
  hornoMax: number;
  /** La casa tiene cisterna: lo que se siembra queda regado. */
  cisterna: boolean;
  /** El fardo: las copias de ropa guardadas para vender o para el artesano (shared/taller.ts). */
  fardo: Record<string, number>;
};
