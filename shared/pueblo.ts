/**
 * Las casas del pueblo (pedido de Luis: «casas del pueblo en las parcelas vacías y mensajes en tu barrio»): en las
 * parcelas que todavía no tienen dueño viven familias del pueblo de Jerusalén (no son jugadores: son vecinos del
 * juego, como los ancianos de la puerta). Así ningún barrio se ve vacío. Cuando llega un vecino nuevo, recibe una
 * parcela libre y la familia del pueblo se muda a otra (la parcela sigue siendo de quien llega).
 *
 * Los mensajes del pueblo: cada día, una o dos familias del pueblo de tu barrio piden algo (harina, aceite o un
 * cordero para su ofrenda) en el tablero del barrio, y los vecinos les dan de su alfolí. Quien ayuda gana gozo y
 * puntos para la copa de su barrio; al completar el pedido, la familia da las gracias en la charla del barrio.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { Verso } from "./ciudad";
import type { BienAyuda } from "./ayuda";

export type FamiliaPueblo = { nombre: string; oficio: string; icono: string };

/** Las familias del pueblo: cuarenta, con nombres del Antiguo Testamento (el juego es en los días del rey Ezequías); ninguna es un personaje del juego. */
export const FAMILIAS_PUEBLO: FamiliaPueblo[] = [
  { nombre: "Hanoc", oficio: "el alfarero", icono: "🏺" },
  { nombre: "Ana", oficio: "la tejedora", icono: "🧵" },
  { nombre: "Bezaleel", oficio: "el carpintero", icono: "🪚" },
  { nombre: "Noemí", oficio: "la viuda", icono: "🕯️" },
  { nombre: "Elcana", oficio: "el pastor", icono: "🐑" },
  { nombre: "Abigail", oficio: "la panadera", icono: "🍞" },
  { nombre: "Jonatán", oficio: "el herrero", icono: "⚒️" },
  { nombre: "Débora", oficio: "la que cuida las viñas", icono: "🍇" },
  { nombre: "Simeón", oficio: "el anciano", icono: "🧓" },
  { nombre: "Miriam", oficio: "la cantora", icono: "🎶" },
  { nombre: "Gedeón", oficio: "el que trilla el trigo", icono: "🌾" },
  { nombre: "Jael", oficio: "la que cose tiendas", icono: "⛺" },
  { nombre: "Josías", oficio: "el escriba", icono: "📜" },
  { nombre: "Raquel", oficio: "la que hace aceite", icono: "🫒" },
  { nombre: "Booz", oficio: "el que siembra cebada", icono: "🌱" },
  { nombre: "Sara", oficio: "la abuela", icono: "👵" },
  { nombre: "Jetro", oficio: "el que cuida camellos", icono: "🐪" },
  { nombre: "Séfora", oficio: "la que saca agua del pozo", icono: "💧" },
  { nombre: "Rebeca", oficio: "la que hila lino", icono: "🧶" },
  { nombre: "Lea", oficio: "la de las higueras", icono: "🌳" },
  { nombre: "Manoa", oficio: "el labrador", icono: "🌿" },
  { nombre: "Asaf", oficio: "el músico", icono: "🎵" },
  { nombre: "Jabes", oficio: "el que ora por su casa", icono: "🙏" },
  { nombre: "Tamar", oficio: "la que hace pan dulce", icono: "🍯" },
  { nombre: "Isaí", oficio: "el que cuida los rebaños", icono: "🐐" },
  { nombre: "Obed", oficio: "el que guarda el granero", icono: "🏡" },
  { nombre: "Mical", oficio: "la de las flores", icono: "🌸" },
  { nombre: "Penina", oficio: "la que hace tortas", icono: "🍞" },
  { nombre: "Ismael", oficio: "el que cuida los burros", icono: "🐴" },
  { nombre: "Itai", oficio: "el que repara casas", icono: "🧱" },
  { nombre: "Ada", oficio: "la que tiñe telas", icono: "🎨" },
  { nombre: "Ezer", oficio: "el que hace canastas", icono: "🧺" },
  { nombre: "Dina", oficio: "la que cuida las gallinas", icono: "🐔" },
  { nombre: "Matán", oficio: "el que hace sandalias", icono: "👡" },
  { nombre: "Hanán", oficio: "el que hace lámparas", icono: "🕯️" },
  { nombre: "Zilpa", oficio: "la que vende sal", icono: "🧂" },
  { nombre: "Nabot", oficio: "el que planta olivos", icono: "🫒" },
  { nombre: "Rizpa", oficio: "la que teje mantas", icono: "🧣" },
  { nombre: "Abner", oficio: "el que trae leña", icono: "🪵" },
  { nombre: "Orfa", oficio: "la que muele el trigo", icono: "🌾" },
];

/** Parte de las parcelas libres tiene una casa del pueblo (las demás quedan con su huerto). */
export const PARTE_PUEBLO = 0.65;

function semilla(texto: string): number {
  let x = 2166136261;
  for (const ch of texto) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return x || 1;
}

/** Si en esa parcela libre vive una familia del pueblo (siempre la misma para ese barrio y parcela). */
export function casaDelPueblo(barrio: number, parcela: number): { familia: FamiliaPueblo; nivel: number } | null {
  const s = semilla(`pueblo:${barrio}:${parcela}`);
  if ((s % 1000) / 1000 >= PARTE_PUEBLO) return null;
  return { familia: FAMILIAS_PUEBLO[(s >>> 10) % FAMILIAS_PUEBLO.length], nivel: (s >>> 4) % 3 };
}

// ---------------------------------------------------------------- los pedidos del pueblo
export type PedidoPuebloDef = { bien: BienAyuda; texto: string; gracias: string; verso: Verso };

export const PEDIDOS_PUEBLO: PedidoPuebloDef[] = [
  {
    bien: "harina",
    texto: "No nos alcanza la harina para el pan de esta semana.",
    gracias: "¡Gracias, vecinos! Hoy hay pan en nuestra mesa.",
    verso: { text: "El pan nuestro de cada día, dánoslo hoy.", ref: "Mateo 6:11" },
  },
  {
    bien: "aceite",
    texto: "Se nos acabó el aceite de la lámpara; la casa queda a oscuras.",
    gracias: "¡Gracias! Nuestra lámpara vuelve a dar luz.",
    verso: { text: "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.", ref: "Salmo 119:105" },
  },
  {
    bien: "corderos",
    texto: "Queremos presentar una ofrenda en el templo, pero no tenemos cordero.",
    gracias: "¡Gracias! Mañana subimos al templo con nuestra ofrenda.",
    verso: { text: "Honra a Jehová con tus bienes, Y con las primicias de todos tus frutos;", ref: "Proverbios 3:9" },
  },
  {
    bien: "harina",
    texto: "Esperamos visitas de lejos y queremos hornear tortas para ellos.",
    gracias: "¡Gracias! Las visitas comerán con alegría.",
    verso: { text: "No os olvidéis de la hospitalidad,", ref: "Hebreos 13:2" },
  },
  {
    bien: "aceite",
    texto: "Uno de los nuestros está enfermo; pedimos aceite para cuidarlo.",
    gracias: "¡Gracias! Oren con nosotros por su salud.",
    verso: { text: "Y la oración de fe salvará al enfermo,", ref: "Santiago 5:15" },
  },
];

/** Pedidos del pueblo por barrio y por día, cuánto piden y el gozo por cada cosa dada. */
export const PEDIDOS_PUEBLO_DIA = 2;
export const PUEBLO_MIN = 3;
export const PUEBLO_MAX = 6;
export const GOZO_PUEBLO = 1;
export const VERSO_PUEBLO: Verso = { text: "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.", ref: "Gálatas 6:2" };

/** Una mezcla final del número de cada casa, para que casas vecinas (la 7 y la 8) no queden con turnos parecidos. */
function mezclar(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

export type PedidoPuebloDia = { parcela: number; familia: FamiliaPueblo; def: number; cantidad: number };

/**
 * Los pedidos del pueblo de hoy en un barrio: qué familia (de sus casas del pueblo), qué pide y cuánto.
 * Cada casa tiene su turno, su pedido y su cantidad del día, que no dependen de cuántas parcelas libres quedan: si un
 * vecino nuevo se muda al barrio, los otros pedidos siguen iguales (solo se va el de la familia que le dejó el lugar).
 * `conAvance`: las parcelas que ya recibieron algo hoy; su pedido se sigue mostrando aunque ya no le toque el turno,
 * para que lo dado no se pierda de vista.
 */
export function pedidosDelPuebloHoy(dia: string, barrio: number, libres: number[], conAvance: number[] = []): PedidoPuebloDia[] {
  const casas = libres
    .map((p) => ({ p, c: casaDelPueblo(barrio, p), h: mezclar(semilla(`pedido:${dia}:${barrio}:${p}`)) }))
    .filter((x) => x.c)
    .sort((a, b) => a.h - b.h || a.p - b.p);
  const pedidoDe = (x: (typeof casas)[number]): PedidoPuebloDia => ({
    parcela: x.p,
    familia: x.c!.familia,
    def: (x.h >>> 3) % PEDIDOS_PUEBLO.length,
    cantidad: PUEBLO_MIN + ((x.h >>> 9) % (PUEBLO_MAX - PUEBLO_MIN + 1)),
  });
  const out: PedidoPuebloDia[] = [];
  // en el turno del día: dos familias distintas (de nombre) que no piden lo mismo
  for (const x of casas) {
    if (out.length >= PEDIDOS_PUEBLO_DIA) break;
    const p = pedidoDe(x);
    if (out.some((o) => o.familia.nombre === p.familia.nombre || o.def === p.def)) continue;
    out.push(p);
  }
  const avance = new Set(conAvance);
  for (const x of casas) if (avance.has(x.p) && !out.some((o) => o.parcela === x.p)) out.push(pedidoDe(x));
  return out.sort((a, b) => a.parcela - b.parcela);
}

// ---------------------------------------------------------------- respuestas de la API
export type PedidoPuebloVista = {
  parcela: number;
  familia: FamiliaPueblo;
  bien: BienAyuda;
  texto: string;
  gracias: string;
  verso: Verso;
  cantidad: number;
  recibido: number;
  cumplido: boolean;
  /** Lo que di yo hoy a este pedido. */
  miAporte: number;
};
export type PuebloEstado = {
  pedidos: PedidoPuebloVista[];
  /** Lo que tengo en mi alfolí para dar. */
  bienes: Record<BienAyuda, number>;
  /** El gozo que todavía puedo ganar hoy ayudando (a vecinos y al pueblo). */
  gozoQueda: number;
  /** Cuántas familias del pueblo viven en mi barrio. */
  familias: number;
};
