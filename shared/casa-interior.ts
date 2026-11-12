/**
 * La casa por dentro (Jerusalén en línea): cada nivel de la casa tiene su plano (la tienda, la casa de
 * adobe con su despensa, la casa de piedra con patio y terrado, y la casa con aposento alto) y se
 * amuebla con lo que se compra en el mercado. Se camina por dentro como en el templo, se remodela
 * (poner, girar, mover y guardar los muebles) y los vecinos pueden entrar a verla.
 *
 * El plano es una cuadrícula de celdas (CELDA metros). Cada mueble ocupa celdas (ancho × fondo, que
 * se cambian al girarlo). Las esteras y alfombras van en el piso (capa 0) y los demás muebles pueden
 * ir encima de ellas, pero no encima de otro mueble. El servidor valida igual que la pantalla.
 *
 * «Con sabiduría se edificará la casa, Y con prudencia se afirmará; Y con ciencia se llenarán las
 * cámaras De todo bien preciado y agradable.» (Proverbios 24:3-4)
 */
import type { Articulo } from "./mercado";

/** Lado de una celda en metros. */
export const CELDA = 0.6;
/** Altura del piso de arriba (terrado y aposento alto). */
export const ALTURA_PISO = 2.7;

export type Mueble = Articulo & {
  categoria: "mueble";
  /** Celdas que ocupa sin girar: ancho (x) y fondo (z). */
  w: number;
  d: number;
  /** 0: va en el piso (estera, alfombra); 1: mueble (puede ir sobre una alfombra). */
  capa: 0 | 1;
  /** Da luz de noche. */
  luz?: boolean;
  /** Nivel de casa que pide para comprarlo y ponerlo. */
  nivelMin?: number;
};

/** Los muebles que se venden en el mercado. */
const MUEBLES_DEL_MERCADO: Mueble[] = [
  { id: "estera", categoria: "mueble", nombre: "Estera de juncos", icono: "🎋", precio: 10, w: 2, d: 1, capa: 0, detalle: "Para sentarse en el piso a comer y a conversar." },
  { id: "alfombra", categoria: "mueble", nombre: "Alfombra de lana", icono: "🟧", precio: 45, w: 2, d: 2, capa: 0, detalle: "Lana teñida de rojo y ocre; los muebles van encima." },
  { id: "cojines", categoria: "mueble", nombre: "Cojines de lana", icono: "🛋️", precio: 15, w: 1, d: 1, capa: 1, detalle: "Para recibir a las visitas con comodidad." },
  { id: "mesa", categoria: "mueble", nombre: "Mesa baja", icono: "🪵", precio: 35, w: 2, d: 1, capa: 1, detalle: "De madera de acacia, para comer en familia." },
  { id: "silla", categoria: "mueble", nombre: "Silla", icono: "🪑", precio: 25, w: 1, d: 1, capa: 1, detalle: "«…cama, mesa, silla y candelero…» (2 Reyes 4:10)." },
  { id: "lecho", categoria: "mueble", nombre: "Lecho", icono: "🛏️", precio: 60, w: 2, d: 1, capa: 1, detalle: "Cama de madera con su manta de lana." },
  { id: "arcon", categoria: "mueble", nombre: "Arcón de cedro", icono: "🧳", precio: 45, w: 1, d: 1, capa: 1, detalle: "Para guardar los mantos y lo de valor." },
  { id: "tinaja", categoria: "mueble", nombre: "Tinaja de agua", icono: "🏺", precio: 20, w: 1, d: 1, capa: 1, detalle: "Agua fresca para lavarse los pies al entrar." },
  { id: "vasijas", categoria: "mueble", nombre: "Vasijas de aceite", icono: "🫙", precio: 22, w: 1, d: 1, capa: 1, detalle: "El aceite de la casa, para las lámparas y el pan." },
  { id: "cesta", categoria: "mueble", nombre: "Cesta de frutos", icono: "🧺", precio: 12, w: 1, d: 1, capa: 1, detalle: "Higos, uvas y granadas de la cosecha." },
  { id: "planta", categoria: "mueble", nombre: "Maceta con hierbas", icono: "🪴", precio: 18, w: 1, d: 1, capa: 1, detalle: "Menta y eneldo junto a la ventana." },
  { id: "lampara-casa", categoria: "mueble", nombre: "Lámpara de aceite", icono: "🪔", precio: 30, w: 1, d: 1, capa: 1, luz: true, detalle: "Sobre un banquito: alumbra de noche." },
  { id: "candelero", categoria: "mueble", nombre: "Candelero de casa", icono: "🕯️", precio: 50, w: 1, d: 1, capa: 1, luz: true, detalle: "Una lámpara en lo alto de su pie: «alumbra a todos los que están en casa» (Mateo 5:15)." },
  { id: "molino", categoria: "mueble", nombre: "Molino de mano", icono: "🪨", precio: 40, w: 1, d: 1, capa: 1, detalle: "Dos piedras para moler el grano de cada día." },
  { id: "banco-cedro", categoria: "mueble", nombre: "Banco de cedro", icono: "🪵", precio: 40, w: 2, d: 1, capa: 1, detalle: "Para sentarse junto a la pared." },
  { id: "mesa-pan", categoria: "mueble", nombre: "Mesa con el pan", icono: "🍞", precio: 55, w: 2, d: 1, capa: 1, detalle: "Panes recién horneados para compartir." },
  { id: "telar-casa", categoria: "mueble", nombre: "Telar de la casa", icono: "🧶", precio: 70, w: 2, d: 1, capa: 1, detalle: "«Busca lana y lino, Y con voluntad trabaja con sus manos» (Proverbios 31:13)." },
  { id: "palomar", categoria: "mueble", nombre: "Palomar", icono: "🕊️", precio: 40, w: 1, d: 1, capa: 1, nivelMin: 2, detalle: "Palomas para la ofrenda (Levítico 1:14). Pide casa con patio." },
  { id: "estante", categoria: "mueble", nombre: "Estante de rollos", icono: "📜", precio: 90, w: 2, d: 1, capa: 1, nivelMin: 1, detalle: "Rollos de las Escrituras para leer en casa. Pide casa de adobe o mayor." },
  { id: "brasero", categoria: "mueble", nombre: "Brasero", icono: "🔥", precio: 65, w: 1, d: 1, capa: 1, luz: true, nivelMin: 1, detalle: "Brasas para las noches frías (Jeremías 36:22). Pide casa de adobe o mayor." },
];

/**
 * Las piezas finas del artesano (shared/taller.ts): con 4 iguales, el artesano hace la dorada. No se venden: se hacen.
 * Tienen el mismo tamaño que el mueble de donde salen y cuentan como él en los juegos de muebles y en lo que ayudan.
 */
const NOMBRE_FINO: Record<string, string> = {
  estera: "Estera tejida con oro",
  alfombra: "Alfombra bordada de oro",
  cojines: "Cojines bordados de oro",
  mesa: "Mesa baja dorada",
  silla: "Silla dorada",
  lecho: "Lecho dorado",
  arcon: "Arcón de cedro dorado",
  tinaja: "Tinaja con asas de oro",
  vasijas: "Vasijas con bordes de oro",
  cesta: "Cesta tejida con oro",
  planta: "Maceta de hierbas dorada",
  "lampara-casa": "Lámpara de oro",
  candelero: "Candelero de casa dorado",
  molino: "Molino de mano con aro de oro",
  "banco-cedro": "Banco de cedro dorado",
  "mesa-pan": "Mesa con el pan, dorada",
  "telar-casa": "Telar de la casa, dorado",
  palomar: "Palomar dorado",
  estante: "Estante de rollos dorado",
  brasero: "Brasero dorado",
};
/** Cuánto vale una pieza fina comparada con la pieza de donde sale (4 piezas y el jornal del artesano). */
export const VALOR_FINA = 6;
export const MUEBLES_FINOS: Mueble[] = MUEBLES_DEL_MERCADO.map((m) => ({
  ...m,
  id: `${m.id}-oro`,
  nombre: NOMBRE_FINO[m.id] ?? `${m.nombre} dorado`,
  precio: m.precio * VALOR_FINA,
  detalle: `Pieza fina del artesano, hecha con 4 de «${m.nombre}». No se vende: se hace.`,
  exclusivo: "taller",
  fina: m.id,
}));

/** Todos los muebles de las casas: los del mercado y las piezas finas. */
export const MUEBLES: Mueble[] = [...MUEBLES_DEL_MERCADO, ...MUEBLES_FINOS];

export function mueble(id: string): Mueble | undefined {
  return MUEBLES.find((m) => m.id === id);
}

/** El mueble de donde sale (el mismo si no es una pieza fina): para los juegos de muebles y lo que ayudan. */
export function muebleBase(id: string): string {
  return mueble(id)?.fina ?? id;
}

/**
 * Piezas que solo hay en los edificios de la ciudad (la escuela de los profetas y el palacio del rey):
 * no se venden ni se ponen en las casas. Se dibujan con el mismo sistema que los muebles.
 */
export const PIEZAS_EDIFICIO: Mueble[] = [
  { id: "atril", categoria: "mueble", nombre: "Atril del maestro", icono: "📖", precio: 0, w: 1, d: 1, capa: 1, detalle: "Donde el maestro abre el rollo para enseñar." },
  { id: "trono", categoria: "mueble", nombre: "El trono del rey", icono: "👑", precio: 0, w: 2, d: 2, capa: 1, detalle: "Un gran trono de marfil cubierto de oro, con sus gradas (1 Reyes 10:18-19)." },
  { id: "columna", categoria: "mueble", nombre: "Columna de cedro", icono: "🏛️", precio: 0, w: 1, d: 1, capa: 1, detalle: "El pórtico de columnas (1 Reyes 7:6)." },
  { id: "pupitre", categoria: "mueble", nombre: "Mesa del escriba", icono: "✒️", precio: 0, w: 2, d: 1, capa: 1, detalle: "Rollos, tinta y cálamo para copiar la ley." },
  { id: "olla", categoria: "mueble", nombre: "La olla grande", icono: "🍲", precio: 0, w: 1, d: 1, capa: 1, luz: true, detalle: "«Pon una olla grande, y haz potaje para los hijos de los profetas» (2 Reyes 4:38)." },
  // las salas en ruinas (shared/restauracion.ts): lo que se quita al restaurarlas
  { id: "escombros", categoria: "mueble", nombre: "Escombros", icono: "🪨", precio: 0, w: 1, d: 1, capa: 1, detalle: "Piedras y tierra del techo caído." },
  { id: "viga-caida", categoria: "mueble", nombre: "Viga caída", icono: "🪵", precio: 0, w: 2, d: 1, capa: 1, detalle: "Una viga del techo, en el piso." },
  { id: "estante-roto", categoria: "mueble", nombre: "Estante roto", icono: "🪚", precio: 0, w: 2, d: 1, capa: 1, detalle: "Un estante caído, con las tablas sueltas." },
  { id: "vasija-rota", categoria: "mueble", nombre: "Vasija rota", icono: "🏺", precio: 0, w: 1, d: 1, capa: 0, detalle: "Pedazos de barro por el piso." },
  { id: "rollos-tirados", categoria: "mueble", nombre: "Rollos tirados", icono: "📜", precio: 0, w: 1, d: 1, capa: 0, detalle: "Rollos y tablillas fuera de su lugar." },
  { id: "polvo", categoria: "mueble", nombre: "Polvo", icono: "💨", precio: 0, w: 2, d: 2, capa: 0, detalle: "Tierra y polvo de mucho tiempo." },
  // y lo que se pone
  { id: "arpa", categoria: "mueble", nombre: "Arpa de los levitas", icono: "🪕", precio: 0, w: 1, d: 1, capa: 1, detalle: "«Alabadle con salterio y arpa» (Salmo 150:3)." },
  { id: "pila", categoria: "mueble", nombre: "Fuente de bronce", icono: "⛲", precio: 0, w: 1, d: 1, capa: 1, detalle: "«Harás también una fuente de bronce, con su base de bronce, para lavar» (Éxodo 30:18)." },
  { id: "pozo-patio", categoria: "mueble", nombre: "Pozo del patio", icono: "🪣", precio: 0, w: 2, d: 2, capa: 1, detalle: "Un pozo con su brocal de piedra y su roldana." },
  { id: "sacos", categoria: "mueble", nombre: "Sacos de grano", icono: "🌾", precio: 0, w: 1, d: 1, capa: 1, detalle: "Las rentas del grano, guardadas en los depósitos del rey." },
];

/** Un mueble de las casas o una pieza de los edificios (para dibujarlos). */
export function pieza(id: string): Mueble | undefined {
  return mueble(id) ?? PIEZAS_EDIFICIO.find((m) => m.id === id);
}

/** Cuántos se pueden tener de un mismo mueble. */
export const MAX_POR_MUEBLE = 12;

// ---------------------------------------------------------------- los planos
export type Cuarto = {
  id: string;
  nombre: string;
  /** Primera celda y tamaño (en celdas). */
  x: number;
  z: number;
  w: number;
  d: number;
  /** 0: planta baja; 1: arriba (terrado o aposento alto). */
  piso: 0 | 1;
  /** Sin techo: patio o terrado (con pretil). */
  cielo?: boolean;
};

/** Un borde abierto entre dos celdas (una puerta o un paso entre cuartos): la celda y su lado. */
export type Abertura = { x: number; z: number; lado: "N" | "S" | "E" | "O"; piso: 0 | 1 };

export type Plano = {
  /** Tamaño total de la cuadrícula (celdas). */
  W: number;
  D: number;
  cuartos: Cuarto[];
  aberturas: Abertura[];
  /** La puerta de la calle (celda de adentro, lado S). */
  puerta: [number, number];
  /** El horno de la casa (celda, planta baja). */
  horno: [number, number];
  /** La higuera del patio (celda, planta baja), en las casas con patio. */
  arbol?: [number, number];
  /** La escalera al piso de arriba: celdas que ocupa (planta baja), dónde se sube y dónde se llega. */
  escalera?: { celdas: [number, number][]; abajo: [number, number]; arriba: [number, number] };
  /** Cuántos muebles caben. */
  maxMuebles: number;
};

const puertaS = (x: number, z: number): Abertura[] => [
  { x, z, lado: "S", piso: 0 },
  { x: x + 1, z, lado: "S", piso: 0 },
];

/** El patio y los cuartos de la casa de piedra (la casa de cuatro espacios): planta baja. */
const CUARTOS_PIEDRA: Cuarto[] = [
  { id: "ancho", nombre: "El cuarto del fondo", x: 0, z: 0, w: 14, d: 4, piso: 0 },
  { id: "oeste", nombre: "El cuarto del oeste", x: 0, z: 4, w: 4, d: 8, piso: 0 },
  { id: "patio", nombre: "El patio", x: 4, z: 4, w: 6, d: 8, piso: 0, cielo: true },
  { id: "este", nombre: "El cuarto del este", x: 10, z: 4, w: 4, d: 8, piso: 0 },
];
const PASOS_PIEDRA: Abertura[] = [
  { x: 6, z: 4, lado: "N", piso: 0 },
  { x: 7, z: 4, lado: "N", piso: 0 },
  { x: 4, z: 7, lado: "O", piso: 0 },
  { x: 4, z: 8, lado: "O", piso: 0 },
  { x: 9, z: 7, lado: "E", piso: 0 },
  { x: 9, z: 8, lado: "E", piso: 0 },
  ...puertaS(6, 11),
];
/** La escalera de piedra del patio sube al terrado (llega a su borde sur, que se deja sin pretil). */
const ESCALERA_PIEDRA = { celdas: [[9, 4], [9, 5], [9, 6], [9, 7]] as [number, number][], abajo: [9, 8] as [number, number], arriba: [9, 3] as [number, number] };
const LLEGADA_TERRADO: Abertura = { x: 9, z: 3, lado: "S", piso: 1 };

export const PLANOS: Plano[] = [
  // 0 · la tienda: un solo espacio
  {
    W: 8,
    D: 6,
    cuartos: [{ id: "tienda", nombre: "La tienda", x: 0, z: 0, w: 8, d: 6, piso: 0 }],
    aberturas: puertaS(3, 5),
    puerta: [3, 5],
    horno: [6, 1],
    maxMuebles: 10,
  },
  // 1 · la casa de adobe: el cuarto grande y la despensa
  {
    W: 13,
    D: 7,
    cuartos: [
      { id: "casa", nombre: "El cuarto de la casa", x: 0, z: 0, w: 10, d: 7, piso: 0 },
      { id: "despensa", nombre: "La despensa", x: 10, z: 0, w: 3, d: 4, piso: 0 },
    ],
    aberturas: [{ x: 9, z: 1, lado: "E", piso: 0 }, { x: 9, z: 2, lado: "E", piso: 0 }, ...puertaS(4, 6)],
    puerta: [4, 6],
    horno: [8, 1],
    maxMuebles: 18,
  },
  // 2 · la casa de piedra con patio: cuatro espacios y el terrado con su pretil (Deuteronomio 22:8)
  {
    W: 14,
    D: 12,
    cuartos: [...CUARTOS_PIEDRA, { id: "terrado", nombre: "El terrado", x: 0, z: 0, w: 14, d: 4, piso: 1, cielo: true }],
    aberturas: [...PASOS_PIEDRA, LLEGADA_TERRADO],
    puerta: [6, 11],
    horno: [5, 5],
    arbol: [4, 11],
    escalera: ESCALERA_PIEDRA,
    maxMuebles: 28,
  },
  // 3 · con aposento alto: sobre el terrado, el aposento de paredes (2 Reyes 4:10)
  {
    W: 14,
    D: 12,
    cuartos: [
      ...CUARTOS_PIEDRA,
      { id: "aposento", nombre: "El aposento alto", x: 0, z: 0, w: 6, d: 4, piso: 1 },
      { id: "terrado", nombre: "El terrado", x: 6, z: 0, w: 8, d: 4, piso: 1, cielo: true },
    ],
    aberturas: [...PASOS_PIEDRA, LLEGADA_TERRADO, { x: 6, z: 1, lado: "O", piso: 1 }, { x: 6, z: 2, lado: "O", piso: 1 }],
    puerta: [6, 11],
    horno: [5, 5],
    arbol: [4, 11],
    escalera: ESCALERA_PIEDRA,
    maxMuebles: 40,
  },
];

export function planoDe(nivel: number): Plano {
  return PLANOS[Math.max(0, Math.min(PLANOS.length - 1, Math.floor(nivel) || 0))];
}

/** El cuarto de una celda (o null si está afuera). */
export function cuartoEn(plano: Plano, x: number, z: number, piso: 0 | 1): Cuarto | null {
  return plano.cuartos.find((c) => c.piso === piso && x >= c.x && x < c.x + c.w && z >= c.z && z < c.z + c.d) ?? null;
}

/** ¿Está abierto ese borde (puerta o paso)? */
export function abierto(plano: Plano, x: number, z: number, lado: Abertura["lado"], piso: 0 | 1): boolean {
  return plano.aberturas.some((a) => a.piso === piso && a.x === x && a.z === z && a.lado === lado);
}

const clave = (x: number, z: number, piso: number) => `${piso}:${x},${z}`;

/** Celdas que no se pueden amueblar: la entrada, el horno, la escalera y donde se sube o se llega. */
export function celdasFijas(plano: Plano): Set<string> {
  const s = new Set<string>();
  const [px, pz] = plano.puerta;
  s.add(clave(px, pz, 0));
  s.add(clave(px + 1, pz, 0));
  s.add(clave(plano.horno[0], plano.horno[1], 0));
  if (plano.arbol) s.add(clave(plano.arbol[0], plano.arbol[1], 0));
  if (plano.escalera) {
    for (const [x, z] of plano.escalera.celdas) s.add(clave(x, z, 0));
    s.add(clave(plano.escalera.abajo[0], plano.escalera.abajo[1], 0));
    s.add(clave(plano.escalera.arriba[0], plano.escalera.arriba[1], 1));
  }
  return s;
}

// ---------------------------------------------------------------- los muebles puestos
/** Un mueble puesto: cuál, su primera celda, cuántos cuartos de vuelta (0-3) y en qué piso. */
export type Colocado = { m: string; x: number; z: number; r: 0 | 1 | 2 | 3; p: 0 | 1 };

/** Ancho y fondo según la vuelta. */
export function medidas(mu: Mueble, r: number): [number, number] {
  return r % 2 === 1 ? [mu.d, mu.w] : [mu.w, mu.d];
}

/** Las celdas que ocupa un mueble puesto. */
export function celdasDe(c: Colocado, mu: Mueble): [number, number][] {
  const [w, d] = medidas(mu, c.r);
  const out: [number, number][] = [];
  for (let i = 0; i < w; i++) for (let j = 0; j < d; j++) out.push([c.x + i, c.z + j]);
  return out;
}

/** Por qué no se puede poner ese mueble ahí (o null si se puede), con los demás ya puestos. */
export function porQueNoCabe(plano: Plano, nivel: number, c: Colocado, otros: Colocado[]): string | null {
  const mu = mueble(c.m);
  if (!mu) return "Ese mueble no existe.";
  if ((mu.nivelMin ?? 0) > nivel) return `${mu.nombre} pide una casa más grande.`;
  const fijas = celdasFijas(plano);
  const celdas = celdasDe(c, mu);
  for (const [x, z] of celdas) {
    if (!cuartoEn(plano, x, z, c.p)) return "No cabe ahí: se sale de la casa.";
    if (fijas.has(clave(x, z, c.p))) return "Ahí no: es el paso de la entrada, el horno, la higuera o la escalera.";
  }
  // un mueble no se cruza con una pared: todas sus celdas deben quedar en el mismo cuarto
  const cuarto = cuartoEn(plano, celdas[0][0], celdas[0][1], c.p);
  if (celdas.some(([x, z]) => cuartoEn(plano, x, z, c.p) !== cuarto)) return "No cabe ahí: quedaría atravesando una pared.";
  const mias = new Set(celdas.map(([x, z]) => clave(x, z, c.p)));
  for (const o of otros) {
    const om = mueble(o.m);
    if (!om || o.p !== c.p || om.capa !== mu.capa) continue;
    if (celdasDe(o, om).some(([x, z]) => mias.has(clave(x, z, o.p)))) return mu.capa === 0 ? "Ahí ya hay otra estera o alfombra." : "Ahí ya hay otro mueble.";
  }
  return null;
}

/** Revisa toda la casa amueblada (lo que manda la pantalla) contra lo que el jugador tiene. */
export function validarInterior(nivel: number, lista: unknown, tengo: Record<string, number>): { ok: true; items: Colocado[] } | { ok: false; error: string } {
  const plano = planoDe(nivel);
  if (!Array.isArray(lista)) return { ok: false, error: "Faltan los muebles." };
  if (lista.length > plano.maxMuebles) return { ok: false, error: `En tu casa caben ${plano.maxMuebles} muebles (crece tu casa para poner más).` };
  const usados: Record<string, number> = {};
  const items: Colocado[] = [];
  const pisos = new Set(plano.cuartos.map((c) => c.piso));
  for (const raw of lista) {
    const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const m = typeof o.m === "string" ? o.m : "";
    const r = Number(o.r);
    const p = Number(o.p ?? 0);
    const x = Number(o.x);
    const z = Number(o.z);
    if (!mueble(m)) return { ok: false, error: "Hay un mueble que no existe." };
    if (![0, 1, 2, 3].includes(r) || ![0, 1].includes(p) || !Number.isInteger(x) || !Number.isInteger(z)) return { ok: false, error: "Un mueble quedó mal puesto." };
    if (!pisos.has(p as 0 | 1)) return { ok: false, error: "Tu casa no tiene piso de arriba todavía." };
    usados[m] = (usados[m] || 0) + 1;
    if (usados[m] > (tengo[m] || 0)) return { ok: false, error: `No tienes tantos: ${mueble(m)!.nombre}.` };
    const c: Colocado = { m, x, z, r: r as Colocado["r"], p: p as Colocado["p"] };
    const no = porQueNoCabe(plano, nivel, c, items);
    if (no) return { ok: false, error: no };
    items.push(c);
  }
  return { ok: true, items };
}

/** Lee lo guardado (columna `interior`): solo lo que tiene forma de mueble puesto. */
export function leerInterior(v: unknown): Colocado[] {
  if (!Array.isArray(v)) return [];
  const out: Colocado[] = [];
  for (const raw of v) {
    const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
    if (!o || typeof o.m !== "string" || !mueble(o.m)) continue;
    const r = Number(o.r), p = Number(o.p ?? 0), x = Number(o.x), z = Number(o.z);
    if (![0, 1, 2, 3].includes(r) || ![0, 1].includes(p) || !Number.isInteger(x) || !Number.isInteger(z)) continue;
    out.push({ m: o.m, x, z, r: r as Colocado["r"], p: p as Colocado["p"] });
  }
  return out;
}

/** Lee el inventario de muebles (columna `muebles`): cuántos tiene de cada uno. */
export function leerMuebles(v: unknown): Record<string, number> {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const out: Record<string, number> = {};
  for (const [k, n] of Object.entries(o)) if (mueble(k)) out[k] = Math.max(0, Math.floor(Number(n) || 0));
  return out;
}

/** El primer lugar libre para un mueble nuevo (cerca del centro del cuarto más grande del piso). */
export function lugarLibre(plano: Plano, nivel: number, m: string, otros: Colocado[], piso: 0 | 1 = 0): Colocado | null {
  const cuartos = plano.cuartos.filter((c) => c.piso === piso).sort((a, b) => b.w * b.d - a.w * a.d);
  for (const cu of cuartos) {
    const cx = cu.x + cu.w / 2, cz = cu.z + cu.d / 2;
    const celdas: [number, number][] = [];
    for (let x = cu.x; x < cu.x + cu.w; x++) for (let z = cu.z; z < cu.z + cu.d; z++) celdas.push([x, z]);
    celdas.sort((a, b) => Math.hypot(a[0] - cx, a[1] - cz) - Math.hypot(b[0] - cx, b[1] - cz));
    for (const [x, z] of celdas)
      for (const r of [0, 1] as const) {
        const c: Colocado = { m, x, z, r, p: piso };
        if (!porQueNoCabe(plano, nivel, c, otros)) return c;
      }
  }
  return null;
}

// ---------------------------------------------------------------- respuestas de la API
export type InteriorEstado = {
  personajeId: number;
  /** De quién es la casa. */
  dueno: string;
  esMia: boolean;
  nivel: number;
  nombreNivel: string;
  letrero: string | null;
  interior: Colocado[];
  /** Solo para el dueño: cuántos tiene de cada mueble. */
  muebles: Record<string, number>;
  /** Bendiciones que recibió la casa (en total). */
  bendiciones: number;
  /** Si quien mira ya bendijo hoy esta casa. */
  yaBendije: boolean;
  gozo: number;
};

/** El versículo de la casa amueblada. */
export const VERSO_CAMARAS = {
  text: "Con sabiduría se edificará la casa, Y con prudencia se afirmará; Y con ciencia se llenarán las cámaras De todo bien preciado y agradable.",
  ref: "Proverbios 24:3-4",
};
