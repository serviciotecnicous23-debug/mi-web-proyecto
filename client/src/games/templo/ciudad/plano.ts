/**
 * Plano de la ciudad de Jerusalén en línea (metros, vista desde arriba): las mismas coordenadas
 * del templo, con x hacia el oriente y z hacia el sur. El monte del templo queda al poniente y su
 * escalinata baja a la plaza; al oriente, la puerta de la ciudad con los ancianos (Rut 4:1-2). El
 * palacio está al sur del monte y la escuela de los profetas al norte. Alrededor, cuatro barrios
 * de 40 parcelas: dos calles con dos filas de casas cada una.
 */
import { AREAS, AREA_RECT, CASAS_POR_BARRIO, LIMITES_CIUDAD, areaDeBarrio, areaEn as areaDeCiudad } from "@shared/ciudad";
import type { Circle, Rect, V2 } from "../layout";
import { CALLE_SIERVOS, PERSONAJES_CIUDAD, ZONA_SIERVOS } from "@shared/personajes";

/** Altura de las calles (la explanada del templo está en 0). */
export const SUELO = -3.4;
/** Donde se puede caminar (lo comparte el servidor, que recorta la presencia a estos límites). */
export const LIMITES = LIMITES_CIUDAD;
export { AREA_RECT };

/** El monte del templo con sus muros de contención (no se sube sino por la escalinata). */
export const MONTE: Rect = [-17.7, -14.7, 34.7, 14.7];
/** La escalinata que sube al gran atrio. */
export const ESCALINATA = { x0: 34.3, x1: 43.3, half: 2.7, pendiente: 0.379 };
/** El círculo para entrar al templo (arriba de la escalinata). */
export const ENTRADA_TEMPLO: V2 = [36.4, 0];
/** Donde aparece quien sale del templo (al pie de la escalinata). */
export const LLEGADA_TEMPLO: V2 = [41.8, 0];

export const PLAZA: Rect = [38, -12, 74, 12];
export const MURO_ORIENTE = 76;
export const PUERTA = { half: 3 };
export const POZO: V2 = [56, 3.2];
export const PULPITO: V2 = [58, -8.6];
export const ANUNCIOS: V2 = [58, -6.1];
export const ANCIANOS: V2 = [72.4, 0];
/** Los cuatro puestos del mercado, a los dos lados del pozo (dejan libre la entrada de la casa de la sabiduría). */
export const PUESTOS: V2[] = [[48.0, 9.4], [52.5, 9.4], [59.5, 9.4], [64.0, 9.4]];
export const MERCADO: V2 = [56, 8.6];

/** El palacio del rey (1 Reyes 7:1-12): el cuerpo, el pórtico de columnas y la puerta. */
export const PALACIO: Rect = [4, 22.5, 30, 34];
export const PALACIO_PORTICO: Rect = [6, 20, 28, 22.5];
export const PALACIO_PUERTA: V2 = [17, 21.2];
/** La escuela de los profetas (2 Reyes 6:1-2) y el monte para orar. */
export const ESCUELA: Rect = [8, -33, 26, -23];
export const ESCUELA_PUERTA: V2 = [17, -22.2];
export const MONTE_ORACION: Rect = [-6, -36, 3.5, -21];
/** El lugar de oración: al pie del monte, del lado de la escuela (el monte no se camina). */
export const ORACION_PUNTO: V2 = [5.4, -28.5];
/**
 * La cámara de los sacerdotes (2 Crónicas 31:11): al pie del monte, junto a la escalinata, del lado
 * norte (así no tapa a quien baja del templo). Su puerta mira a la plaza.
 */
export const CAMARA: Rect = [35.0, -11.6, 40.0, -4.4];
export const CAMARA_PUERTA: V2 = [41.2, -8.0];
/**
 * La casa de la sabiduría (Proverbios 9:1), donde se juega «¿Quién es sabio?»: del otro lado de la
 * escalinata, frente a la cámara. La sala, la grada con sus escalones y las siete columnas miran a la plaza.
 */
export const SABIDURIA: Rect = [35.0, 4.4, 40.0, 11.6];
export const SABIDURIA_GRADA: Rect = [40.0, 4.0, 41.7, 12.0];
export const SABIDURIA_PUERTA: V2 = [42.7, 8.0];
/** Las siete columnas de su pórtico. */
export const SABIDURIA_COLUMNAS: V2[] = Array.from({ length: 7 }, (_, i) => [40.95, 4.65 + (i * 6.7) / 6] as V2);

// ---------------------------------------------------------------- la historia de la temporada (shared/capitulos.ts)
/**
 * Las tres torres nuevas del muro oriental (2 Crónicas 32:5): dónde está cada una a lo largo del muro (z), en el orden
 * en que se levantan (primero la de la Ciudad de David, el barrio que se llena primero).
 */
export const TORRES_NUEVAS: number[] = [40, -27, -51];
/** Medio lado de cada torre nueva y su centro en x (sale un poco hacia afuera del muro). */
export const TORRE_MEDIO = 1.9;
export const TORRE_X = 76.6;
/**
 * El conducto de Ezequías (2 Reyes 20:20): entra por el muro del oriente desde la fuente de Gihón, va por la calle
 * entre la Ciudad de David y la calle de los siervos, y baja por la calle del poniente hasta el estanque de Siloé.
 */
export const CONDUCTO: V2[] = [[75.2, 48.0], [36.8, 48.0], [36.8, 64.6]];
export const GIHON: V2 = [80.6, 48.0];
/** El estanque de Siloé, en el rincón del sur (al occidente de la Ciudad de David). */
export const ESTANQUE: Rect = [32.8, 64.8, 37.4, 70.2];
/** Donde está el Rabsaces con los suyos, afuera de la puerta (se ve por la puerta abierta). */
export const RABSACES: V2 = [82.5, 0.4];
/** Donde ora el rey Ezequías: arriba de la escalinata, ante la casa de Jehová. */
export const REY_ORA: V2 = [33.4, 0];


/** Una parcela: su rectángulo, el centro de la casa, hacia dónde mira la puerta y el umbral. */
export type Parcela = {
  n: number;
  area: number;
  rect: Rect;
  /** Centro de la casa (en el fondo de la parcela). */
  x: number;
  z: number;
  /** La puerta mira a +z (1) o a -z (-1). */
  dir: 1 | -1;
  /** Delante de la puerta. */
  umbral: V2;
};

const ANCHO = 3.6;
const FONDO = 5;
/** Filas de cada área: desde el borde de arriba (z0), [inicio, fin, la puerta mira a]. */
const FILAS: [number, number, 1 | -1][] = [
  [0, 5, 1],
  [9, 14, -1],
  [14.5, 19.5, 1],
  [23.5, 28.5, -1],
];
/** Las calles de dentro de cada área (desde z0). */
export const CALLES_DE_AREA: [number, number][] = [
  [5, 9],
  [19.5, 23.5],
];

/** Por dónde se llega a cada área desde la plaza (para numerar primero las parcelas cercanas). */
const ENTRADA_AREA: V2[] = [[38, 18], [38, -18], [32, 40], [32, -40]];

function parcelasDeArea(area: number): Parcela[] {
  const [x0, z0] = AREA_RECT[area - 1];
  const out: Omit<Parcela, "n">[] = [];
  for (const [a, b, dir] of FILAS) {
    for (let i = 0; i < 10; i++) {
      const px0 = x0 + i * ANCHO, px1 = px0 + ANCHO;
      const pz0 = z0 + a, pz1 = z0 + b;
      // la casa va al fondo (lejos de la calle) y deja un patio delante de la puerta
      const back = dir === 1 ? pz0 : pz1;
      const cz = back + dir * 1.95;
      const cx = (px0 + px1) / 2;
      out.push({ area, rect: [px0, pz0, px1, pz1], x: cx, z: cz, dir, umbral: [cx, cz + dir * 2.35] });
    }
  }
  const [ex, ez] = ENTRADA_AREA[area - 1];
  out.sort((p, q) => Math.hypot(p.x - ex, p.z - ez) - Math.hypot(q.x - ex, q.z - ez));
  return out.map((p, n) => ({ ...p, n }));
}

/** Las 40 parcelas de cada área (la 0 es la más cercana a la plaza). */
export const PARCELAS: Parcela[][] = Array.from({ length: AREAS }, (_, i) => parcelasDeArea(i + 1));

export function parcelaDe(barrio: number, n: number): Parcela {
  const lista = PARCELAS[areaDeBarrio(barrio) - 1];
  return lista[Math.max(0, Math.min(CASAS_POR_BARRIO - 1, n))];
}

/** Medidas de la casa según su nivel (ancho en x, fondo en z, alto de las paredes). */
export const CASA_MEDIDA: [number, number, number][] = [
  [2.7, 2.5, 1.85],
  [3.0, 3.2, 2.45],
  [3.2, 3.5, 2.8],
  [3.2, 3.5, 2.8],
];

/** El rectángulo que choca de una casa (sin el patio). */
export function casaRect(p: Parcela, nivel: number): Rect {
  const [w, d] = CASA_MEDIDA[Math.max(0, Math.min(3, nivel))];
  return [p.x - w / 2, p.z - d / 2, p.x + w / 2, p.z + d / 2];
}

/** ¿En qué área de barrio está el punto? (0 = ninguna: plaza, calles, edificios). */
export const areaEn = areaDeCiudad;

const dentro = (x: number, z: number, r: Rect, pad = 0) => x > r[0] - pad && x < r[2] + pad && z > r[1] - pad && z < r[3] + pad;

/** ¿Está sobre la escalinata? */
export function enEscalinata(x: number, z: number) {
  return x >= ESCALINATA.x0 && x <= ESCALINATA.x1 && Math.abs(z) < ESCALINATA.half;
}

/** Altura del piso: las calles a nivel y la escalinata que sube al templo. */
export function alturaCiudad(x: number, z: number): number {
  if (enEscalinata(x, z)) return Math.max(SUELO, -(x - ESCALINATA.x0) * ESCALINATA.pendiente);
  return SUELO;
}

/** ¿Se puede pisar? (dentro de la ciudad, fuera del monte, salvo por la escalinata). */
export function caminable(x: number, z: number): boolean {
  if (x < LIMITES.minX || x > LIMITES.maxX || z < LIMITES.minZ || z > LIMITES.maxZ) return false;
  if (enEscalinata(x, z)) return x >= ESCALINATA.x0 + 1.4;
  if (dentro(x, z, MONTE)) return false;
  if (dentro(x, z, MONTE_ORACION)) return false;
  return true;
}

/** Obstáculos fijos de la ciudad (los edificios, el pozo, los puestos y los bancos). */
export function obstaculosFijos(): { rects: Rect[]; circles: Circle[] } {
  const rects: Rect[] = [
    PALACIO,
    ESCUELA,
    CAMARA,
    SABIDURIA,
    SABIDURIA_GRADA,
    // barandas de la escalinata: se sube y se baja por el frente
    [ESCALINATA.x0, -ESCALINATA.half - 0.35, ESCALINATA.x1, -ESCALINATA.half],
    [ESCALINATA.x0, ESCALINATA.half, ESCALINATA.x1, ESCALINATA.half + 0.35],
    // el púlpito de madera (Nehemías 8:4)
    [PULPITO[0] - 1.6, PULPITO[1] - 1.1, PULPITO[0] + 1.6, PULPITO[1] + 1.1],
    // los puestos del mercado
    ...PUESTOS.map(([x, z]) => [x - 1.35, z - 0.9, x + 1.35, z + 0.9] as Rect),
    // los bancos de los ancianos, a los lados de la puerta
    [72.6, 4.2, 74.6, 10.5],
    [72.6, -10.5, 74.6, -4.2],
    // torres de la puerta
    [74.6, PUERTA.half, 78, PUERTA.half + 4],
    [74.6, -PUERTA.half - 4, 78, -PUERTA.half],
    // las torres nuevas del muro (se ven desde sus cimientos) y el estanque de Siloé
    ...TORRES_NUEVAS.map((z) => [TORRE_X - TORRE_MEDIO, z - TORRE_MEDIO, TORRE_X + TORRE_MEDIO, z + TORRE_MEDIO] as Rect),
    ESTANQUE,
  ];
  const circles: Circle[] = [
    [POZO[0], POZO[1], 1.15],
    // columnas del pórtico del palacio (1 Reyes 7:6)
    ...[7, 10, 13, 21, 24, 27].map((x) => [x, 20.6, 0.32] as Circle),
    // olivos y palmeras de las calles
    ...ARBOLES.map(([x, z]) => [x, z, 0.45] as Circle),
  ];
  return { rects, circles };
}

/** Árboles en las calles y en la plaza. */
export const ARBOLES: V2[] = [
  [44.6, 11.2], [44.6, -11.2], [69.5, 7.5], [69.5, -7.5], [35, 30], [35, -30], [35, 55], [35, -55], [-1, 17.5], [1, -18.5],
];

/** Lugares por donde pasea la gente de la ciudad (de uno a otro, por los caminos). */
export const PASEO: V2[] = [
  [48, 0], [64, -2], [66, 6], [52, -5], [60, 5], [45, -9], [69, -9], [35, 16], [35, -16], [20, 16.6], [12, -18], [56, 15], [56, -15],
  [35, 44], [35, -44], [72, 25], [72, -25], [56, 25], [56, -25], [14, 37], [14, -37],
];

/** Para encontrar una parcela por su umbral (visitas y la puerta de la propia casa). */
export function cercaDeUmbral(x: number, z: number, barrio: number, max = 1.1): Parcela | null {
  const lista = PARCELAS[areaDeBarrio(barrio) - 1];
  let best: Parcela | null = null;
  let bd = max;
  for (const p of lista) {
    const d = Math.hypot(p.umbral[0] - x, p.umbral[1] - z);
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return best;
}

/** Relleno de casas sin dueño (siluetas) fuera de los barrios y en las laderas, para que la ciudad se vea llena. */
export function rellenoDeCasas(): { x: number; z: number; w: number; d: number; h: number }[] {
  const out: { x: number; z: number; w: number; d: number; h: number }[] = [];
  let seed = 911;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const libre = (x: number, z: number, w: number, d: number) => {
    const rr: Rect = [x - w / 2 - 0.6, z - d / 2 - 0.6, x + w / 2 + 0.6, z + d / 2 + 0.6];
    const toca = (q: Rect) => rr[0] < q[2] && rr[2] > q[0] && rr[1] < q[3] && rr[3] > q[1];
    if (out.some((o) => toca([o.x - o.w / 2, o.z - o.d / 2, o.x + o.w / 2, o.z + o.d / 2]))) return false;
    // la calle de los siervos de Dios y sus casas quedan libres
    if (toca(ZONA_SIERVOS)) return false;
    return true;
  };
  // franjas junto a los muros de la ciudad: entre los barrios del oriente y en los bordes del sur y del norte
  const franjas: Rect[] = [
    [38, 50, 74, 69.5],
    [38, -69.5, 74, -50],
  ];
  for (const f of franjas) {
    for (let k = 0; k < 90 && out.length < 400; k++) {
      const w = 2.6 + r() * 1.6, d = 2.6 + r() * 1.4, h = 2.2 + r() * 1.8;
      const x = f[0] + w / 2 + r() * (f[2] - f[0] - w), z = f[1] + d / 2 + r() * (f[3] - f[1] - d);
      if (libre(x, z, w, d)) out.push({ x, z, w, d, h });
    }
  }
  return out;
}

/** Las casas de la calle de los siervos chocan: la casa, los muros de su patio y la abertura del patio libre. */
export function rectsDeSiervos(): Rect[] {
  const out: Rect[] = [];
  for (const p of PERSONAJES_CIUDAD) {
    const [w, d] = CASA_MEDIDA[p.casa.nivel];
    const { x, z, dir } = p.casa;
    out.push([x - w / 2, z - d / 2, x + w / 2, z + d / 2]);
    const za = z + dir * (d / 2), zb = z + dir * (d / 2 + 1.15);
    const z0 = Math.min(za, zb), z1 = Math.max(za, zb);
    for (const sg of [-1, 1]) out.push([x + sg * (w / 2 - 0.05) - 0.12, z0, x + sg * (w / 2 - 0.05) + 0.12, z1]);
    const largo = w * 0.34;
    out.push([x - w / 2, zb - 0.12, x - w / 2 + largo, zb + 0.12]);
    out.push([x + w / 2 - largo, zb - 0.12, x + w / 2, zb + 0.12]);
  }
  return out;
}
/** Adonde lleva «Ir a… la calle de los siervos». */
export const CALLE_SIERVOS_PUNTO: V2 = [(CALLE_SIERVOS.x0 + CALLE_SIERVOS.x1) / 2, CALLE_SIERVOS.z];

/** El relleno de casas también choca. */
export function rectsDeRelleno(lista: { x: number; z: number; w: number; d: number }[]): Rect[] {
  return lista.map((o) => [o.x - o.w / 2, o.z - o.d / 2, o.x + o.w / 2, o.z + o.d / 2] as Rect);
}

/** ¿El punto está cerca de un rectángulo? (para los letreros de los edificios). */
export function cercaDe(x: number, z: number, r: Rect, pad: number) {
  return dentro(x, z, r, pad);
}
