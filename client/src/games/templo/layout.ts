/**
 * Plano del juego (metros, vista desde arriba): x crece hacia el oriente, z hacia el sur.
 * El templo mira al oriente: al occidente el Lugar Santísimo; delante, el pórtico con Jaquín
 * (al sur, a la derecha) y Boaz (al norte), el altar de bronce y, al sureste, el mar de bronce
 * (1 Reyes 7:21, 39). En el Lugar Santo, el candelero al sur y la mesa al norte (Éxodo 26:35).
 * El pueblo se queda en el gran atrio y entrega sus ofrendas en la puerta del atrio de los
 * sacerdotes (2 Crónicas 4:9).
 */
export type V2 = [number, number];
export type Rect = [number, number, number, number]; // minX, minZ, maxX, maxZ
export type Circle = [number, number, number]; // x, z, radio

/** Atrio de los sacerdotes (cara interior de los muros). */
export const COURT = { minX: -16, maxX: 16, minZ: -13, maxZ: 13, wall: 0.8 };
/** Gran atrio, donde espera el pueblo. */
export const OUTER = { minX: 16.8, maxX: 33, minZ: -11, maxZ: 11 };
export const GATE = { halfWidth: 2.2, towerMinX: 15.3, towerMaxX: 17.5, towerHalf: 3.7 };
export const OUTER_GATE = { x: 33, halfWidth: 2.6 };
/** Desde aquí baja la escalinata hacia la ciudad. */
export const STAIRS_X = 34.3;

/** El edificio del templo. */
export const TEMPLE = {
  backX: -14.2, // cara interior del muro occidental
  veilX: -11.3,
  frontX: -4.9, // cara interior de la fachada
  porchX: -2.4, // borde del pórtico (allí empiezan las gradas)
  stepsX: -1.2, // pie de las gradas
  halfW: 3.8, // medio ancho interior
  wall: 0.4,
  annex: 1.6, // cámaras laterales (1 Reyes 6:5)
  doorHalf: 1.15,
  height: 6.4,
  floor: 0.45, // el templo está sobre una plataforma
};

/** Interior caminable del Lugar Santo. */
export const HOLY = { minX: TEMPLE.veilX + 0.35, maxX: TEMPLE.frontX, minZ: -TEMPLE.halfW + 0.3, maxZ: TEMPLE.halfW - 0.3 };

export const POS = {
  start: [10.5, 1.5] as V2,
  // puerta y pueblo
  reception: [14.3, 0] as V2,
  gozoBasin: [13.2, 3.1] as V2,
  diezmoPile: [13.2, -3.1] as V2,
  diezmoDrop: [14.6, -2.0] as V2,
  spawnOut: [38.5, 0] as V2,
  portero: [15.0, 2.75] as V2,
  // altar y fuente
  altar: [3.0, 0] as V2,
  ashes: [5.6, -1.3] as V2,
  fuente: [0.4, 8.6] as V2,
  azarias: [-0.4, -3.6] as V2,
  // talleres del atrio
  lenera: [7.6, -11.3] as V2,
  lenaPile: [7.6, -9.0] as V2,
  prensa: [-5.6, 11.1] as V2,
  prensaPile: [-5.6, 9.0] as V2,
  horno: [-10.6, 11.1] as V2,
  hornoPile: [-10.6, 9.0] as V2,
  camIncienso: [-9.0, -11.4] as V2,
  camInciensoPile: [-9.0, -9.3] as V2,
  camaras: [-0.2, -11.7] as V2,
  camarasDoor: [-0.2, -9.5] as V2,
  coro: [7.6, 10.7] as V2,
  // Lugar Santo
  candelero: [-7.6, 2.7] as V2,
  candeleroSpot: [-7.6, 1.45] as V2,
  mesa: [-7.6, -2.7] as V2,
  mesaSpot: [-7.6, -1.45] as V2,
  altarIncienso: [-10.2, 0] as V2,
  altarInciensoSpot: [-9.15, 0] as V2,
  expiacionSpot: [-6.1, 0] as V2,
  arca: [-12.8, 0] as V2,
  // gran atrio
  ensenanza: [24.2, 8.3] as V2,
  ensenanzaSpot: [24.2, 6.6] as V2,
  ensenanzaBench: [24.2, 5.0] as V2,
  rey: [6.6, 3.4] as V2,
};

/** Fila del pueblo: empieza en la puerta y sigue hacia el oriente. */
export function queueSlot(i: number): V2 {
  return [15.9 + i * 1.18, 0];
}
export const MAX_QUEUE = 12;

/** Donde esperan los que ya entregaron su ofrenda (miran hacia el altar). */
export const WAIT_SPOTS: V2[] = [];
for (const z of [3.5, 4.7, 5.9, 7.1, 8.3]) for (const x of [18.2, 19.5, 20.8]) WAIT_SPOTS.push([x, z]);

/** Donde ora el pueblo a la hora del incienso (Lucas 1:10). */
export const PRAY_SPOTS: V2[] = [];
for (const z of [-4.4, -5.8, -7.2]) for (const x of [19.8, 21.2, 22.6, 24.0, 25.4, 26.8]) PRAY_SPOTS.push([x, z]);

/** Los diez lavatorios de bronce: cinco al sur y cinco al norte de la casa (1 Reyes 7:39). */
export const LAVERS: V2[] = [];
for (const x of [-13.2, -11.5, -9.8, -8.1, -6.4]) {
  LAVERS.push([x, 6.7]);
  LAVERS.push([x, -6.7]);
}

/** Lugar de los cantores sobre la plataforma del coro. */
export const CHOIR_SPOTS: V2[] = [
  [6.3, 10.9],
  [7.6, 10.9],
  [8.9, 10.9],
];
export const CHOIR_FLOOR = 0.6;

/** Puestos de ayudantes cuando descansan. */
export const HELPER_HOME: Record<string, V2> = {
  lenero: [9.8, -8.2],
  ayudante: [6.4, 2.6],
  portero: POS.portero,
  aceitero: [-3.0, 10.0],
  panadero: [-13.2, 9.2],
  incensario: [-12.2, -9.0],
  conanias: [3.0, -9.1],
};

// ---------------------------------------------------------------- obstáculos
const T = TEMPLE;
const outerHalf = T.halfW + T.wall; // cara exterior de los muros laterales

export const STATIC_RECTS: Rect[] = [
  // muros del atrio de los sacerdotes (con la puerta oriental)
  [COURT.minX - COURT.wall, COURT.minZ - COURT.wall, COURT.maxX + COURT.wall, COURT.minZ],
  [COURT.minX - COURT.wall, COURT.maxZ, COURT.maxX + COURT.wall, COURT.maxZ + COURT.wall],
  [COURT.minX - COURT.wall, COURT.minZ, COURT.minX, COURT.maxZ],
  [COURT.maxX, COURT.minZ, COURT.maxX + COURT.wall, -GATE.halfWidth],
  [COURT.maxX, GATE.halfWidth, COURT.maxX + COURT.wall, COURT.maxZ],
  // torres de la puerta
  [GATE.towerMinX, -GATE.towerHalf, GATE.towerMaxX, -GATE.halfWidth],
  [GATE.towerMinX, GATE.halfWidth, GATE.towerMaxX, GATE.towerHalf],
  // muros del gran atrio
  [OUTER.minX, OUTER.minZ - 0.8, OUTER.maxX + 0.8, OUTER.minZ],
  [OUTER.minX, OUTER.maxZ, OUTER.maxX + 0.8, OUTER.maxZ + 0.8],
  [OUTER.maxX, OUTER.minZ, OUTER.maxX + 0.8, -OUTER_GATE.halfWidth],
  [OUTER.maxX, OUTER_GATE.halfWidth, OUTER.maxX + 0.8, OUTER.maxZ],
  // el templo: muros, cámaras laterales y fachada (la puerta del Lugar Santo es aparte)
  [T.backX - T.wall - T.annex, -outerHalf - T.annex, T.frontX + T.wall, -T.halfW],
  [T.backX - T.wall - T.annex, T.halfW, T.frontX + T.wall, outerHalf + T.annex],
  [T.backX - T.wall - T.annex, -T.halfW, T.backX, T.halfW],
  [T.frontX, -T.halfW, T.frontX + T.wall, -T.doorHalf],
  [T.frontX, T.doorHalf, T.frontX + T.wall, T.halfW],
  // paredes del pórtico
  [T.frontX + T.wall, -outerHalf, T.porchX, -T.halfW + 0.15],
  [T.frontX + T.wall, T.halfW - 0.15, T.porchX, outerHalf],
  // altar de bronce y su rampa al sur (Éxodo 20:26)
  [POS.altar[0] - 1.75, POS.altar[1] - 1.75, POS.altar[0] + 1.75, POS.altar[1] + 1.75],
  [POS.altar[0] - 0.75, POS.altar[1] + 1.75, POS.altar[0] + 0.75, POS.altar[1] + 3.5],
  // talleres
  [POS.lenera[0] - 1.9, POS.lenera[1] - 1.2, POS.lenera[0] + 1.9, POS.lenera[1] + 1.2],
  [POS.prensa[0] - 1.6, POS.prensa[1] - 1.2, POS.prensa[0] + 1.6, POS.prensa[1] + 1.2],
  [POS.horno[0] - 1.6, POS.horno[1] - 1.2, POS.horno[0] + 1.6, POS.horno[1] + 1.2],
  [POS.camIncienso[0] - 1.6, POS.camIncienso[1] - 1.2, POS.camIncienso[0] + 1.6, POS.camIncienso[1] + 1.2],
  [POS.camaras[0] - 4.0, POS.camaras[1] - 1.2, POS.camaras[0] + 4.0, POS.camaras[1] + 1.25],
  [POS.coro[0] - 2.6, POS.coro[1] - 1.4, POS.coro[0] + 2.6, POS.coro[1] + 1.4],
  [POS.coro[0] - 1.0, POS.coro[1] - 2.35, POS.coro[0] + 1.0, POS.coro[1] - 1.4], // gradas del coro
  [POS.ensenanza[0] - 2.2, POS.ensenanza[1] - 0.7, POS.ensenanza[0] + 2.2, POS.ensenanza[1] + 1.4],
];

export const STATIC_CIRCLES: Circle[] = [
  [POS.fuente[0], POS.fuente[1], 2.25],
  [POS.gozoBasin[0], POS.gozoBasin[1], 0.55],
  [POS.ashes[0], POS.ashes[1], 0.45],
  // Jaquín y Boaz
  [-2.95, 2.55, 0.5],
  [-2.95, -2.55, 0.5],
  // muebles del Lugar Santo
  [POS.candelero[0], POS.candelero[1], 0.55],
  [POS.mesa[0], POS.mesa[1], 0.75],
  [POS.altarIncienso[0], POS.altarIncienso[1], 0.5],
  ...LAVERS.map(([x, z]) => [x, z, 0.5] as Circle),
];

/** Obstáculos que dependen del avance: la puerta del Lugar Santo y el velo. */
export const DOOR_RECT: Rect = [T.frontX - 0.05, -T.doorHalf, T.frontX + T.wall, T.doorHalf];
export const VEIL_RECT: Rect = [T.veilX - 0.15, -T.halfW, T.veilX + 0.15, T.halfW];
export const GATE_RECT: Rect = [COURT.maxX - 0.2, -GATE.halfWidth, COURT.maxX + 0.4, GATE.halfWidth];

/** Altura del piso: el templo está sobre una plataforma con gradas. */
export function floorHeight(x: number, z: number): number {
  // escalinata de subida al monte, al oriente del gran atrio
  if (x > STAIRS_X) return -(x - STAIRS_X) * 0.379;
  if (Math.abs(z) > T.halfW + T.wall + 0.05) return 0;
  if (x <= T.porchX) return x >= T.backX - T.wall ? T.floor : 0;
  if (x < T.stepsX) return (T.floor * (T.stepsX - x)) / (T.stepsX - T.porchX);
  return 0;
}

export function insideRect(x: number, z: number, r: Rect, pad = 0) {
  return x > r[0] - pad && x < r[2] + pad && z > r[1] - pad && z < r[3] + pad;
}

/** ¿Está dentro del templo (pórtico o Lugar Santo)? Se usa para ocultar el techo. */
export function insideTemple(x: number, z: number) {
  return x < T.porchX + 0.2 && x > T.backX - 0.2 && Math.abs(z) < T.halfW + 0.2;
}
