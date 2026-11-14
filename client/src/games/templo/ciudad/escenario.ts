/**
 * El escenario de la ciudad: el monte del templo con su escalinata, las murallas y la puerta, la
 * plaza con el púlpito de Esdras, el palacio del rey, la escuela de los profetas y los barrios.
 * Todo se dibuja con figuras simples pintadas por vértice y unidas en pocas mallas, como el templo.
 *
 * Cada casa tiene cuatro formas según su nivel: tienda, casa de adobe, casa de piedra con patio y
 * casa con aposento alto. El barrio propio (y el que se visita) va completo; los demás, de lejos,
 * como siluetas.
 */
import { MURO_DESDE_Z, MURO_TRAMOS, MURO_TRAMO_LARGO } from "@shared/muro";
import { CALLE_SIERVOS, PERSONAJES_CIUDAD } from "@shared/personajes";
import * as THREE from "three";
import { C, GeoBuilder, matteMat, shinyMat } from "../three/builder";
import { blockWall, buildCielo, buildTemploParaCiudad, jar, oliveTree, palmTree, tiles, type Course } from "../three/structures";
import type { SkyUniforms } from "../three/structures";
import {
  AREA_RECT, ARBOLES, CALLES_DE_AREA, CAMARA, CASA_MEDIDA, ESCALINATA, ESCUELA, LIMITES, MONTE_ORACION, MURO_ORIENTE, ORACION_PUNTO, PALACIO,
  PALACIO_PORTICO, PARCELAS, PLAZA, POZO, PUERTA, PUESTOS, PULPITO, SABIDURIA, SABIDURIA_COLUMNAS, SUELO, rellenoDeCasas, type Parcela,
} from "./plano";

// ---------------------------------------------------------------- utilidades
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rnd = mulberry32(2026);
const rr = (a: number, b: number) => a + (b - a) * rnd();
function pick<X>(arr: readonly X[]): X {
  return arr[Math.floor(rnd() * arr.length)];
}
function vary(hex: string, amt = 0.06): THREE.Color {
  const c = new THREE.Color(hex);
  const k = 1 + (rnd() - 0.5) * 2 * amt;
  c.r = Math.min(1, c.r * k);
  c.g = Math.min(1, c.g * k);
  c.b = Math.min(1, c.b * k);
  return c;
}

export function meshes(parent: THREE.Object3D, m: GeoBuilder | null, s?: GeoBuilder | null, cast = true, receive = true) {
  const out: THREE.Mesh[] = [];
  if (m && !m.empty) {
    const mesh = new THREE.Mesh(m.build(), matteMat());
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    parent.add(mesh);
    out.push(mesh);
  }
  if (s && !s.empty) {
    const mesh = new THREE.Mesh(s.build(), shinyMat());
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    parent.add(mesh);
    out.push(mesh);
  }
  return out;
}

/** Material de las ventanas encendidas de noche (luz propia, sin sombra). */
let glowMat: THREE.MeshBasicMaterial | null = null;
function ventanaMat() {
  if (!glowMat) glowMat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  return glowMat;
}

const Y = SUELO;

// ---------------------------------------------------------------- tipos públicos
/** `pueblo`: la casa es de una familia del pueblo (shared/pueblo.ts), no de un vecino. */
export type CasaDibujo = {
  parcela: number;
  nivel: number;
  personajeId: number;
  adornos?: string[];
  letrero?: boolean;
  pueblo?: boolean;
  /** las obras de la casa (shared/obras.ts) */
  obras?: string[];
  /** las ovejas de su redil (shared/taller.ts) */
  ovejas?: number;
  /** su huertito (shared/huerto.ts): lo sembrado en cada surco y su etapa (-1 arado, -2 sin arar) */
  huerto?: { s: "trigo" | "cebada" | "olivo" | null; e: number }[];
};

export type CiudadVisual = {
  root: THREE.Group;
  sky: THREE.Mesh;
  skyUniforms: SkyUniforms;
  stars: THREE.Points;
  clouds: THREE.Group;
  /** Las casas de cada área (se cambian cuando llega el resumen del barrio). */
  areas: THREE.Group[];
  /** Las ventanas encendidas de las casas (se ven de noche). */
  ventanas: THREE.Group;
  /** Las ventanas y lamparitas de la calle de los siervos (se ven de noche). */
  ventanasSiervos: THREE.Mesh | null;
  /** Enramadas de la fiesta de los tabernáculos (Nehemías 8:16). */
  enramadas: THREE.Group;
  /** Fuegos de los braseros y de la puerta (de noche). */
  fuegos: THREE.Vector3[];
  /** Lo grande que se vuelve transparente si tapa al jugador (el palacio, la escuela y su monte, la cámara, la puerta). */
  ocluyentes: THREE.Group[];
  /** Donde sube el humo del altar, sobre el monte. */
  humo: THREE.Vector3;
  /** Lugares para poner letreros. */
  letreros: { templo: THREE.Vector3; palacio: THREE.Vector3; escuela: THREE.Vector3; camara: THREE.Vector3; sabiduria: THREE.Vector3; puerta: THREE.Vector3; plaza: THREE.Vector3 };
};

// ---------------------------------------------------------------- terreno
/** La altura del terreno de afuera de la ciudad (el valle del Cedrón y el monte de los Olivos). */
export function alturaTerreno(x: number, z: number): number {
  const dx = Math.max(0, LIMITES.minX - 16 - x, x - (MURO_ORIENTE + 3));
  const dz = Math.max(0, Math.abs(z) - (LIMITES.maxZ + 3));
  const d = Math.hypot(dx, dz);
  let h = Y - 0.04;
  if (d > 0) {
    const k = Math.min(1, d / 12);
    h = Y - 0.04 - d * 0.05 + Math.sin(x * 0.11) * Math.cos(z * 0.13) * 0.7 * k;
    // el valle del Cedrón al oriente y, detrás, el monte de los Olivos
    h -= 8 * Math.exp(-((x - 96) ** 2) / 110) * Math.min(1, dx / 8);
    h += 20 * THREE.MathUtils.smoothstep(x, 108, 175);
  }
  return h;
}

/** La malla del terreno (buildTerreno): 520 × 480 m en 110 × 100 cuadros, corrida 40 m al oriente. */
const TERRENO = { x0: -220, z0: -240, dx: 520 / 110, dz: 480 / 100, nx: 110, nz: 100 };

/**
 * La altura del suelo de afuera tal como se dibuja: los dos triángulos de cada cuadro de la malla del terreno. En el
 * valle del Cedrón, que es hondo y angosto, los triángulos quedan más altos que alturaTerreno: lo que se pone ahí con
 * esta altura no queda enterrado.
 */
export function alturaSuelo(x: number, z: number): number {
  const fx = (x - TERRENO.x0) / TERRENO.dx, fz = (z - TERRENO.z0) / TERRENO.dz;
  const ix = Math.max(0, Math.min(TERRENO.nx - 1, Math.floor(fx))), iz = Math.max(0, Math.min(TERRENO.nz - 1, Math.floor(fz)));
  const u = fx - ix, v = fz - iz;
  const X = (i: number) => TERRENO.x0 + i * TERRENO.dx, Z = (j: number) => TERRENO.z0 + j * TERRENO.dz;
  const ha = alturaTerreno(X(ix), Z(iz)), hb = alturaTerreno(X(ix), Z(iz + 1)), hc = alturaTerreno(X(ix + 1), Z(iz + 1)), hd = alturaTerreno(X(ix + 1), Z(iz));
  return u + v <= 1 ? ha + u * (hd - ha) + v * (hb - ha) : hc + (1 - u) * (hb - hc) + (1 - v) * (hd - hc);
}

function buildTerreno(root: THREE.Group) {
  const geo = new THREE.PlaneGeometry(520, 480, TERRENO.nx, TERRENO.nz);
  geo.rotateX(-Math.PI / 2);
  geo.translate(40, 0, 0);
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  const tierra = new THREE.Color("#b9a173"), seca = new THREE.Color("#c8b285"), pasto = new THREE.Color("#7f8f4a"), olivo = new THREE.Color("#6b7d45");
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const h = alturaTerreno(x, z);
    p.setY(i, h);
    const n = Math.sin(x * 0.37 + z * 0.21) * 0.5 + Math.cos(x * 0.13 - z * 0.29) * 0.5;
    const enCiudad = x > LIMITES.minX - 16 && x < MURO_ORIENTE + 2 && Math.abs(z) < LIMITES.maxZ + 2;
    if (enCiudad) c.copy(tierra).lerp(seca, THREE.MathUtils.clamp(0.5 + n * 0.4, 0, 1));
    else {
      c.copy(seca).lerp(pasto, THREE.MathUtils.clamp(0.35 + n * 0.35, 0, 1));
      if (x > 105) c.lerp(olivo, 0.6);
    }
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, matteMat());
  mesh.receiveShadow = true;
  root.add(mesh);

  // olivos en el monte de los Olivos y colinas lejanas
  const t = new GeoBuilder();
  for (let i = 0; i < 160; i++) {
    const x = rr(104, 180), z = rr(-120, 120);
    oliveTree(t, x, alturaTerreno(x, z), z, rr(0.9, 1.5));
  }
  for (let i = 0; i < 60; i++) {
    const a = rr(0, Math.PI * 2), r = rr(95, 150);
    const x = 35 + Math.cos(a) * r, z = Math.sin(a) * r * 1.1;
    if (x > 80 && x < 104) continue;
    if (Math.abs(z) < LIMITES.maxZ + 6 && x > LIMITES.minX - 18 && x < MURO_ORIENTE + 4) continue;
    oliveTree(t, x, alturaTerreno(x, z), z, rr(0.8, 1.3));
  }
  meshes(root, t, null, false);
  const hills = new GeoBuilder();
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + rr(-0.1, 0.1);
    const r = rr(200, 240);
    hills.add(new THREE.IcosahedronGeometry(1, 1), vary("#8f9467", 0.1), { x: Math.cos(a) * r + 40, y: -14, z: Math.sin(a) * r, sx: rr(30, 55), sy: rr(14, 30), sz: rr(25, 45) });
  }
  meshes(root, hills, null, false, false);
}

// ---------------------------------------------------------------- el monte del templo
function buildMonte(root: THREE.Group) {
  const b = new GeoBuilder();
  const minX = -17.3, maxX = 34.3, maxZ = 14.3;
  const alto = -Y;
  const hileras = (n: number): Course[] => Array.from({ length: n }, (_, i) => ({ h: alto / n, color: i % 2 ? C.piedraOsc : C.piedra, len: 2.2 }));
  // muros de contención (1 Reyes 7:12) y el relleno de la explanada
  blockWall(b, "x", minX, maxX, -maxZ, 0.8, hileras(4), Y);
  blockWall(b, "x", minX, maxX, maxZ, 0.8, hileras(4), Y);
  blockWall(b, "z", -maxZ, maxZ, minX, 0.8, hileras(4), Y);
  blockWall(b, "z", -maxZ, -ESCALINATA.half, maxX, 0.8, hileras(4), Y);
  blockWall(b, "z", ESCALINATA.half, maxZ, maxX, 0.8, hileras(4), Y);
  b.box(maxX - minX, alto - 0.12, 2 * maxZ, C.piedraOsc, { x: (minX + maxX) / 2, y: Y + (alto - 0.12) / 2, z: 0 });
  b.box(maxX - minX + 0.2, 0.2, 2 * maxZ + 0.2, C.piedraOsc, { x: (minX + maxX) / 2, y: -0.12, z: 0 });
  // la escalinata que sube del pueblo al gran atrio, con sus barandas
  for (let i = 0; i < 10; i++) {
    const top = -i * 0.36;
    const h = top - Y;
    b.box(1.0, h, 5.4 - i * 0.05, vary(C.piedra, 0.05), { x: maxX + 0.5 + i * 0.95, y: Y + h / 2, z: 0 });
    for (const sg of [-1, 1]) b.box(1.0, h + 0.62, 0.32, vary(C.piedraClara, 0.04), { x: maxX + 0.5 + i * 0.95, y: Y + (h + 0.62) / 2, z: sg * (ESCALINATA.half + 0.16) });
  }
  meshes(root, b, null, true);
  // el templo restaurado, con sus atrios y sus lugares de servicio
  root.add(buildTemploParaCiudad());
}

// ---------------------------------------------------------------- murallas y la puerta
function muro(b: GeoBuilder, axis: "x" | "z", from: number, to: number, at: number, alto = 5.2, grueso = 1.2) {
  const len = to - from;
  const mid = (from + to) / 2;
  if (axis === "x") b.box(len, alto, grueso, vary(C.piedra, 0.03), { x: mid, y: Y + alto / 2, z: at });
  else b.box(grueso, alto, len, vary(C.piedra, 0.03), { x: at, y: Y + alto / 2, z: mid });
  // hilera de piedra más oscura abajo y almenas arriba
  if (axis === "x") b.box(len + 0.04, 0.9, grueso + 0.06, C.piedraOsc, { x: mid, y: Y + 0.45, z: at });
  else b.box(grueso + 0.06, 0.9, len + 0.04, C.piedraOsc, { x: at, y: Y + 0.45, z: mid });
  for (let p = from + 0.7; p < to - 0.4; p += 2.2) {
    if (axis === "x") b.box(1.0, 0.7, grueso, vary(C.piedraClara, 0.04), { x: p, y: Y + alto + 0.35, z: at });
    else b.box(grueso, 0.7, 1.0, vary(C.piedraClara, 0.04), { x: at, y: Y + alto + 0.35, z: p });
    // el remate de cada almena, un poco más ancho
    if (axis === "x") b.box(1.12, 0.09, grueso + 0.1, C.piedraOsc, { x: p, y: Y + alto + 0.745, z: at });
    else b.box(grueso + 0.1, 0.09, 1.12, C.piedraOsc, { x: at, y: Y + alto + 0.745, z: p });
  }
  // la cornisa: una hilera que sobresale bajo las almenas (la silueta del muro de cerca)
  if (axis === "x") b.box(len + 0.1, 0.2, grueso + 0.2, C.piedraClara, { x: mid, y: Y + alto - 0.1, z: at });
  else b.box(grueso + 0.2, 0.2, len + 0.1, C.piedraClara, { x: at, y: Y + alto - 0.1, z: mid });
}

function buildMurallas(root: THREE.Group, puerta: THREE.Group, fuegos: THREE.Vector3[]) {
  const b = new GeoBuilder(), s = new GeoBuilder();
  // la puerta va en su grupo: si tapa al jugador (al pasar bajo el arco), se aclara como los edificios
  const pb = new GeoBuilder(), ps = new GeoBuilder();
  const N = -72, S = 72, O = -21, E = MURO_ORIENTE;
  muro(b, "z", N, -PUERTA.half - 4, E);
  // al norte de la puerta, el tramo caído se dibuja aparte (construirMuroCaido) y crece con el servicio de todos
  muro(b, "z", MURO_DESDE_Z + MURO_TRAMOS * MURO_TRAMO_LARGO, S, E);
  muro(b, "x", O, E + 0.6, N);
  muro(b, "x", O, E + 0.6, S);
  muro(b, "z", N, S, O);
  // torres de las esquinas
  for (const [x, z] of [[E, N], [E, S], [O, N], [O, S]] as [number, number][]) {
    b.box(4, 7, 4, vary(C.piedra, 0.03), { x, y: Y + 3.5, z });
    for (const dx of [-1.4, 0, 1.4]) for (const dz of [-1.4, 1.4]) b.box(0.8, 0.7, 0.8, C.piedraClara, { x: x + dx, y: Y + 7.35, z: z + dz });
  }
  // la puerta oriental: dos torres, el arco y las hojas de cedro abiertas
  for (const sg of [-1, 1]) {
    const zc = sg * (PUERTA.half + 2);
    pb.box(3.6, 7.6, 4, vary(C.piedra, 0.03), { x: E + 0.6, y: Y + 3.8, z: zc });
    pb.box(3.8, 0.9, 4.2, C.piedraOsc, { x: E + 0.6, y: Y + 0.45, z: zc });
    for (const dz of [-1.4, 0, 1.4]) pb.box(0.8, 0.7, 0.8, C.piedraClara, { x: E - 0.9, y: Y + 7.95, z: zc + dz });
    // la cornisa de la torre, bajo sus almenas
    pb.box(3.8, 0.22, 4.2, C.piedraClara, { x: E + 0.6, y: Y + 7.5, z: zc });
    pb.box(0.08, 0.9, 0.5, "#2e2418", { x: E - 1.22, y: Y + 5.2, z: zc }); // tronera
    // hoja de la puerta, abierta hacia adentro
    pb.box(0.16, 4.2, PUERTA.half - 0.1, C.cedro, { x: E - 1.0 - (PUERTA.half - 0.1) / 2, y: Y + 2.1, z: sg * (PUERTA.half - 0.1), ry: Math.PI / 2 });
    for (let k = 0; k < 4; k++) ps.sphere(0.05, C.bronce, { x: E - 1.0 - 0.4 - k * 0.6, y: Y + 1.3 + (k % 2) * 1.4, z: sg * (PUERTA.half - 0.2) }, 5, 4);
    fuegos.push(new THREE.Vector3(E - 1.6, Y + 3.4, sg * (PUERTA.half + 0.3)));
  }
  pb.box(3.6, 1.6, 2 * PUERTA.half + 0.2, vary(C.piedra, 0.03), { x: E + 0.6, y: Y + 5.4, z: 0 });
  ps.box(0.06, 0.18, 2 * PUERTA.half, C.oroOsc, { x: E - 1.22, y: Y + 4.7, z: 0 });
  // el dintel de la puerta: una piedra que sobresale sobre el paso
  pb.box(0.5, 0.3, 2 * PUERTA.half + 0.6, C.piedraOsc, { x: E - 1.3, y: Y + 4.45, z: 0 });
  // antorcheros a los lados de la puerta
  for (const sg of [-1, 1]) {
    ps.cyl(0.04, 0.05, 0.9, C.bronceOsc, { x: E - 1.6, y: Y + 2.9, z: sg * (PUERTA.half + 0.3) }, 6);
    ps.lathe([[0, 0], [0.07, 0], [0.16, 0.1], [0.18, 0.16], [0.15, 0.16], [0, 0.08]], C.bronce, { x: E - 1.6, y: Y + 3.33, z: sg * (PUERTA.half + 0.3) }, 10);
  }
  meshes(root, b, s, true);
  meshes(puerta, pb, ps, true);
}

/**
 * El muro caído al norte de la puerta (shared/muro.ts): los tramos levantados, el que se está
 * levantando (con su andamio, más alto según las piedras) y los caídos (escombros).
 */
export function construirMuroCaido(construidos: number, progreso: number): THREE.Group {
  const grupo = new THREE.Group();
  const b = new GeoBuilder();
  const E = MURO_ORIENTE, alto = 5.2, grueso = 1.2;
  rnd = mulberry32(3205);
  for (let i = 0; i < MURO_TRAMOS; i++) {
    const z0 = MURO_DESDE_Z + i * MURO_TRAMO_LARGO, zc = z0 + MURO_TRAMO_LARGO / 2;
    if (i < construidos) {
      // levantado: piedra nueva, un poco más clara, con su almena
      b.box(grueso, alto, MURO_TRAMO_LARGO + 0.02, vary("#d8c9a6", 0.03), { x: E, y: Y + alto / 2, z: zc });
      b.box(grueso + 0.06, 0.9, MURO_TRAMO_LARGO + 0.04, C.piedraOsc, { x: E, y: Y + 0.45, z: zc });
      b.box(grueso, 0.7, 1.0, vary(C.piedraClara, 0.04), { x: E, y: Y + alto + 0.35, z: zc });
      b.box(grueso + 0.1, 0.09, 1.12, C.piedraOsc, { x: E, y: Y + alto + 0.745, z: zc });
      b.box(grueso + 0.2, 0.2, MURO_TRAMO_LARGO + 0.02, C.piedraClara, { x: E, y: Y + alto - 0.1, z: zc });
    } else if (i === construidos) {
      // en obra: tan alto como las piedras juntadas, con andamio de cedro y piedras listas al pie
      const h = 1.0 + (alto - 1.0) * Math.max(0, Math.min(1, progreso));
      b.box(grueso, h, MURO_TRAMO_LARGO, vary(C.piedra, 0.03), { x: E, y: Y + h / 2, z: zc });
      for (const dz of [-0.9, 0.9]) for (const dx of [-1.0, -2.2]) b.cyl(0.06, 0.07, alto + 0.6, C.cedroOsc, { x: E + dx, y: Y + (alto + 0.6) / 2, z: zc + dz }, 5);
      for (let k = 1; k <= 3; k++) b.box(1.5, 0.08, MURO_TRAMO_LARGO + 0.4, C.cedro, { x: E - 1.6, y: Y + k * 1.7, z: zc });
      for (let k = 0; k < 6; k++) b.box(0.5, 0.35, 0.35, vary(C.piedra, 0.06), { x: E - 2.6 - rr(0, 1.2), y: Y + 0.18, z: zc + rr(-1, 1), ry: rr(0, 1) });
      b.cyl(0.25, 0.3, 0.4, "#8a6a42", { x: E - 3.2, y: Y + 0.2, z: zc + 0.6 }, 8); // el cesto de la mezcla
    } else {
      // caído: lo que queda del muro y las piedras rodadas
      b.box(grueso, 1.0, MURO_TRAMO_LARGO, vary(C.piedraOsc, 0.05), { x: E, y: Y + 0.5, z: zc });
      for (let k = 0; k < 5; k++) b.box(rr(0.4, 0.8), rr(0.3, 0.6), rr(0.4, 0.8), vary(C.piedra, 0.07), { x: E - rr(0.8, 2.2), y: Y + 0.2, z: zc + rr(-0.9, 0.9), rx: rr(0, 0.6), ry: rr(0, 1.5) });
    }
  }
  meshes(grupo, b, null, true);
  return grupo;
}

// ---------------------------------------------------------------- la plaza
function buildPlaza(root: THREE.Group, fuegos: THREE.Vector3[]) {
  const m = new GeoBuilder(), s = new GeoBuilder();
  const [x0, z0, x1, z1] = PLAZA;
  m.raw(tiles(x0, z0, x1, z1, 1.5, ["#d8c69e", "#cfbb92", "#e0d0ac", "#d4c094"], Y + 0.012, 0.05, 0.08));
  m.box(x1 - x0, 0.05, z1 - z0, "#a99472", { x: (x0 + x1) / 2, y: Y - 0.02, z: (z0 + z1) / 2 });
  // el pozo de la plaza
  const [px, pz] = POZO;
  m.cyl(1.0, 1.08, 0.85, C.piedra, { x: px, y: Y + 0.42, z: pz }, 16, true);
  m.cyl(0.92, 0.92, 0.05, "#3d5f70", { x: px, y: Y + 0.55, z: pz }, 16);
  m.torus(1.02, 0.09, C.piedraClara, { x: px, y: Y + 0.86, z: pz, rx: Math.PI / 2 }, 6, 20);
  for (const sg of [-1, 1]) m.box(0.14, 1.7, 0.14, C.cedroOsc, { x: px + sg * 0.85, y: Y + 1.5, z: pz });
  m.box(1.9, 0.12, 0.12, C.cedroOsc, { x: px, y: Y + 2.32, z: pz });
  m.cyl(0.12, 0.12, 0.16, C.cedro, { x: px, y: Y + 2.15, z: pz, rz: Math.PI / 2 }, 10);
  jar(m, px + 1.3, Y, pz + 0.4, 1.4);
  jar(m, px + 1.5, Y, pz - 0.3, 1.1, "#a85f35");
  // el púlpito de madera de Esdras (Nehemías 8:4), con gradas al sur
  const [ux, uz] = PULPITO;
  m.box(3.2, 1.2, 2.2, C.cedro, { x: ux, y: Y + 0.6, z: uz });
  for (let k = 0; k < 4; k++) m.box(3.3, 0.06, 0.12, C.cedroOsc, { x: ux, y: Y + 0.2 + k * 0.3, z: uz + 1.11 });
  for (let k = 0; k < 3; k++) m.box(1.0, 0.3 * (k + 1), 0.4, vary(C.cedro, 0.05), { x: ux + 1.0, y: Y + 0.15 * (k + 1), z: uz + 1.9 - k * 0.4 });
  m.box(0.5, 1.0, 0.4, C.cedroOsc, { x: ux, y: Y + 1.7, z: uz - 0.3 });
  m.box(0.7, 0.06, 0.5, C.cedro, { x: ux, y: Y + 2.22, z: uz - 0.28, rx: 0.3 });
  m.cyl(0.05, 0.05, 0.62, "#efe4c9", { x: ux, y: Y + 2.3, z: uz - 0.3, rz: Math.PI / 2 }, 8); // rollo de la ley
  for (const sg of [-1, 1]) m.cyl(0.08, 0.08, 0.7, C.cedroOsc, { x: ux + sg * 0.33, y: Y + 2.3, z: uz - 0.3, rz: Math.PI / 2 }, 8);
  // los cuatro puestos del mercado, abiertos: el sembrador, el alfarero, el tejedor y el mercader
  const telas = [C.carmesi, C.azul, "#d9b44a", "#5d7a3a"];
  PUESTOS.forEach(([x, z], i) => {
    for (const dx of [-1.25, 1.25]) for (const dz of [-0.8, 0.8]) m.cyl(0.05, 0.06, 2.3, C.cedroOsc, { x: x + dx, y: Y + 1.15, z: z + dz }, 6);
    m.box(2.7, 0.08, 1.9, telas[i], { x, y: Y + 2.34, z, rx: 0.12 });
    m.box(2.5, 0.85, 0.6, C.cedro, { x, y: Y + 0.42, z: z - 0.5 });
    const cy = Y + 0.85, cz = z - 0.5;
    if (i === 0) {
      // canastas de grano: trigo, cebada y olivas
      for (let k = 0; k < 3; k++) {
        m.cyl(0.24, 0.2, 0.3, "#a8844a", { x: x - 0.8 + k * 0.8, y: cy + 0.15, z: cz }, 10);
        m.sphere(0.23, vary(["#e2c46a", "#cdb06a", "#6f7a3a"][k], 0.05), { x: x - 0.8 + k * 0.8, y: cy + 0.3, z: cz, sy: 0.4 }, 10, 6);
      }
      for (let k = 0; k < 3; k++) m.cyl(0.02, 0.02, 0.5, "#d9b44a", { x: x + 1.05, y: Y + 0.3, z: z + 0.25 + k * 0.08, rz: 0.15 * (k - 1) }, 4); // gavillas
    } else if (i === 1) {
      // cántaros, macetas y lámparas de barro
      for (let k = 0; k < 3; k++) jar(m, x - 0.85 + k * 0.42, cy, cz, 0.75, ["#b8673a", "#a85a32", "#c27a48"][k]);
      for (let k = 0; k < 3; k++) m.lathe([[0, 0], [0.07, 0.005], [0.09, 0.04], [0.06, 0.06], [0, 0.055]], "#b0643a", { x: x + 0.45 + k * 0.22, y: cy, z: cz, sx: 1.4 }, 10);
      jar(m, x + 1.0, Y, z + 0.5, 1.2);
    } else if (i === 2) {
      // telas dobladas de colores y un manto colgado
      const col = ["#7fb2d9", "#8a2f3a", "#7a8a4a", "#d9c9a8", "#c98a2b"];
      for (let k = 0; k < 5; k++) m.box(0.36, 0.1, 0.32, col[k], { x: x - 0.9 + k * 0.45, y: cy + 0.05, z: cz });
      for (let k = 0; k < 3; k++) m.box(0.34, 0.1, 0.3, col[(k + 2) % 5], { x: x - 0.68 + k * 0.45, y: cy + 0.15, z: cz });
      m.box(2.3, 0.03, 0.03, C.cedroOsc, { x, y: Y + 2.05, z: z + 0.6 });
      m.box(0.6, 0.9, 0.03, "#7fb2d9", { x: x - 0.5, y: Y + 1.6, z: z + 0.6 });
      m.box(0.6, 0.9, 0.03, "#8a2f3a", { x: x + 0.4, y: Y + 1.6, z: z + 0.6 });
    } else {
      // la balanza de pesa cabal (Proverbios 11:1) y los sacos del mercader
      m.cyl(0.025, 0.03, 0.5, C.bronceOsc, { x, y: cy + 0.25, z: cz }, 6);
      m.box(0.6, 0.025, 0.025, C.bronce, { x, y: cy + 0.5, z: cz });
      for (const dx of [-0.28, 0.28]) {
        m.cyl(0.004, 0.004, 0.2, C.bronceOsc, { x: x + dx, y: cy + 0.4, z: cz }, 3);
        m.cyl(0.11, 0.08, 0.03, C.bronce, { x: x + dx, y: cy + 0.3, z: cz }, 10);
      }
      for (let k = 0; k < 2; k++) m.sphere(0.2, vary("#c9b48a", 0.06), { x: x - 0.75 + k * 1.5, y: cy + 0.16, z: cz, sy: 1.1 }, 8, 6);
      for (let k = 0; k < 3; k++) m.sphere(0.25, vary("#b8a074", 0.06), { x: x - 0.7 + k * 0.6, y: Y + 0.3, z: z + 0.45, sy: 1.15 }, 8, 6);
    }
  });
  // braseros en las esquinas (de noche se encienden)
  for (const [x, z] of [[40.6, -10.4], [40.6, 10.4], [71.4, -10.4], [71.4, 10.4]] as [number, number][]) {
    m.box(0.5, 0.12, 0.5, C.piedraOsc, { x, y: Y + 0.06, z });
    s.cyl(0.04, 0.05, 1.6, C.bronceOsc, { x, y: Y + 0.9, z }, 6);
    s.lathe([[0, 0], [0.1, 0], [0.24, 0.12], [0.28, 0.2], [0.24, 0.2], [0, 0.1]], C.bronce, { x, y: Y + 1.7, z }, 10);
    fuegos.push(new THREE.Vector3(x, Y + 2.0, z));
  }
  // los bancos de piedra de los ancianos, junto a la puerta (Rut 4:1-2)
  for (const sg of [-1, 1]) {
    m.box(1.0, 0.46, 6.2, C.piedraClara, { x: 74.0, y: Y + 0.23, z: sg * 7.35 });
    m.box(0.4, 1.0, 6.2, C.piedra, { x: 74.55, y: Y + 0.5, z: sg * 7.35 });
  }
  // árboles de las calles
  const t = new GeoBuilder();
  ARBOLES.forEach(([x, z], i) => {
    m.cyl(0.55, 0.62, 0.36, C.piedraOsc, { x, y: Y + 0.18, z }, 10);
    if (i % 2) palmTree(t, x, Y + 0.3, z, 0.9);
    else oliveTree(t, x, Y + 0.3, z, 1.15);
  });
  meshes(root, m, s, true);
  meshes(root, t, null, true);
}

// ---------------------------------------------------------------- el palacio del rey (1 Reyes 7:1-12)
function buildPalacio(root: THREE.Group, fuegos: THREE.Vector3[]) {
  const m = new GeoBuilder(), s = new GeoBuilder();
  const [x0, z0, x1, z1] = PALACIO;
  const W = x1 - x0, D = z1 - z0, H = 6.4;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  // tres hileras de piedras labradas y una de vigas de cedro (1 Reyes 7:12)
  const hileras: Course[] = [
    { h: 1.6, color: C.piedraOsc, len: 2.4 },
    { h: 1.6, color: C.piedraClara, len: 2.4 },
    { h: 1.6, color: C.piedra, len: 2.4 },
    { h: 0.4, color: C.cedro, len: 3.4, inset: 0.08 },
    { h: 1.2, color: C.piedraClara, len: 2.4 },
  ];
  blockWall(m, "x", x0, x1, z0 + 0.4, 0.8, hileras, Y);
  blockWall(m, "x", x0, x1, z1 - 0.4, 0.8, hileras, Y);
  blockWall(m, "z", z0 + 0.8, z1 - 0.8, x0 + 0.4, 0.8, hileras, Y);
  blockWall(m, "z", z0 + 0.8, z1 - 0.8, x1 - 0.4, 0.8, hileras, Y);
  m.box(W - 1.4, 0.3, D - 1.4, C.cedroOsc, { x: cx, y: Y + H - 0.2, z: cz });
  for (let x = x0 + 0.6; x < x1 - 0.2; x += 1.6) m.box(1.0, 0.7, 0.9, C.piedraClara, { x, y: Y + H + 0.35, z: z0 + 0.4 });
  for (let x = x0 + 0.6; x < x1 - 0.2; x += 1.6) m.box(1.0, 0.7, 0.9, C.piedraClara, { x, y: Y + H + 0.35, z: z1 - 0.4 });
  // el pórtico del trono, más alto, en el centro (1 Reyes 7:7)
  m.box(9, 2.4, 7, vary(C.piedraClara, 0.03), { x: cx, y: Y + H + 1.2, z: cz });
  m.box(9.4, 0.3, 7.4, C.cedro, { x: cx, y: Y + H + 2.5, z: cz });
  s.box(9.5, 0.12, 0.12, C.oro, { x: cx, y: Y + H + 2.3, z: cz - 3.6 });
  // ventanas en tres hileras, frente a frente (1 Reyes 7:4)
  for (const fila of [0, 1, 2]) for (let x = x0 + 2.0; x < x1 - 1.5; x += 2.6) {
    if (fila === 0 && Math.abs(x - cx) < 2.2) continue;
    m.box(0.55, 0.9, 0.06, "#2e2418", { x, y: Y + 1.6 + fila * 1.6, z: z0 - 0.02 });
  }
  // el pórtico de columnas de cedro (1 Reyes 7:6) y la gran puerta
  const [px0, pz0, px1, pz1] = PALACIO_PORTICO;
  m.box(px1 - px0, 0.25, pz1 - pz0, vary(C.piedraClara, 0.03), { x: (px0 + px1) / 2, y: Y + 0.12, z: (pz0 + pz1) / 2 });
  for (const x of [7, 10, 13, 21, 24, 27]) {
    m.cyl(0.3, 0.34, 4.2, C.cedro, { x, y: Y + 2.35, z: 20.6 }, 12);
    m.box(0.8, 0.2, 0.8, C.piedraClara, { x, y: Y + 0.35, z: 20.6 });
    s.box(0.74, 0.16, 0.74, C.oroOsc, { x, y: Y + 4.5, z: 20.6 });
  }
  m.box(px1 - px0 + 0.4, 0.35, pz1 - pz0 + 0.6, C.cedroOsc, { x: (px0 + px1) / 2, y: Y + 4.75, z: (pz0 + pz1) / 2 });
  m.box(px1 - px0 + 0.5, 0.18, 0.2, C.piedraClara, { x: (px0 + px1) / 2, y: Y + 5.0, z: pz0 - 0.2 });
  m.box(2.8, 3.8, 0.16, C.cedro, { x: 17, y: Y + 1.9, z: z0 - 0.05 });
  for (let r = 0; r < 5; r++) for (let q = 0; q < 4; q++) s.sphere(0.05, C.bronce, { x: 16 + q * 0.66, y: Y + 0.5 + r * 0.72, z: z0 - 0.14 }, 5, 4);
  s.box(3.2, 0.2, 0.2, C.oro, { x: 17, y: Y + 3.95, z: z0 - 0.1 });
  // estandartes del rey
  for (const x of [x0 + 0.6, x1 - 0.6]) {
    m.cyl(0.05, 0.06, 3.4, C.cedroOsc, { x, y: Y + H + 1.7, z: z0 + 0.4 }, 6);
    m.box(0.05, 1.3, 0.9, C.purpura, { x, y: Y + H + 2.6, z: z0 - 0.08 });
    s.sphere(0.09, C.oro, { x, y: Y + H + 3.45, z: z0 + 0.4 }, 6, 5);
  }
  // palmeras en maceteros a los lados de la puerta
  const t = new GeoBuilder();
  for (const x of [14.2, 19.8]) {
    m.cyl(0.42, 0.5, 0.5, C.piedraClara, { x, y: Y + 0.25, z: 19.2 }, 10);
    palmTree(t, x, Y + 0.45, 19.2, 0.75);
  }
  meshes(root, m, s, true);
  meshes(root, t, null, true);
  for (const x of [15.4, 18.6]) fuegos.push(new THREE.Vector3(x, Y + 3.0, 19.9));
}

// ---------------------------------------------------------------- la escuela de los profetas (2 Reyes 6:1-2)
function buildEscuela(root: THREE.Group) {
  const m = new GeoBuilder();
  const [x0, z0, x1, z1] = ESCUELA;
  const W = x1 - x0, D = z1 - z0;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  // zócalo de piedra y paredes de vigas: cada uno trajo una viga (2 Reyes 6:2)
  m.box(W, 0.8, D, C.piedraOsc, { x: cx, y: Y + 0.4, z: cz });
  for (let k = 0; k < 9; k++) {
    const y = Y + 1.0 + k * 0.3;
    m.cyl(0.16, 0.16, W, vary(C.cedro, 0.1), { x: cx, y, z: z0 + 0.2, rz: Math.PI / 2 }, 7);
    m.cyl(0.16, 0.16, W, vary(C.cedro, 0.1), { x: cx, y, z: z1 - 0.2, rz: Math.PI / 2 }, 7);
    m.cyl(0.16, 0.16, D, vary(C.cedro, 0.1), { x: x0 + 0.2, y, z: cz, rx: Math.PI / 2 }, 7);
    m.cyl(0.16, 0.16, D, vary(C.cedro, 0.1), { x: x1 - 0.2, y, z: cz, rx: Math.PI / 2 }, 7);
  }
  m.box(W - 0.4, 2.7, D - 0.4, "#5e4a35", { x: cx, y: Y + 2.15, z: cz });
  // techo de vigas con un alero corto (que no tape la calle ni el lugar de oración)
  m.box(W + 0.6, 0.25, D + 0.7, C.cedroOsc, { x: cx, y: Y + 3.75, z: cz + 0.1 });
  for (let x = x0 - 0.2; x < x1 + 0.3; x += 0.9) m.cyl(0.09, 0.09, D + 0.8, vary(C.cedro, 0.1), { x, y: Y + 3.95, z: cz + 0.1, rx: Math.PI / 2 }, 6);
  // ventanas en el frente (la luz de la lámpara se ve de noche por ellas)
  for (const x of [10.2, 12.8, 21.2, 23.8]) {
    m.box(0.9, 0.7, 0.06, "#2a1d12", { x, y: Y + 2.15, z: z1 + 0.03 });
    m.box(1.05, 0.08, 0.1, C.cedro, { x, y: Y + 1.78, z: z1 + 0.05 });
  }
  // un portal sobre la puerta: dos postes y su techito
  for (const x of [15.7, 18.3]) m.cyl(0.08, 0.09, 2.6, C.cedroOsc, { x, y: Y + 1.3, z: z1 + 1.15 }, 7);
  m.box(3.2, 0.14, 1.5, C.cedro, { x: 17, y: Y + 2.65, z: z1 + 0.62, rx: -0.12 });
  // la puerta, los bancos del frente y el estante de los rollos
  m.box(1.6, 2.4, 0.14, "#3b2a1c", { x: 17, y: Y + 1.6, z: z1 + 0.02 });
  for (const x of [11, 23]) m.box(3.2, 0.45, 0.55, C.cedro, { x, y: Y + 0.22, z: z1 + 0.9 });
  m.box(2.2, 1.6, 0.5, C.cedroOsc, { x: 20.6, y: Y + 1.6, z: z1 + 0.32 });
  for (let r = 0; r < 3; r++) for (let q = 0; q < 6; q++) m.cyl(0.07, 0.07, 0.42, "#efe4c9", { x: 19.8 + q * 0.32, y: Y + 1.05 + r * 0.45, z: z1 + 0.5, rx: Math.PI / 2 }, 8);
  jar(m, 13.6, Y, z1 + 0.6, 1.3, "#a85f35");
  meshes(root, m, null, true);

  // el monte para orar, con olivos y una roca
  const h = new GeoBuilder();
  const [hx0, hz0, hx1, hz1] = MONTE_ORACION;
  const hx = (hx0 + hx1) / 2, hz = (hz0 + hz1) / 2;
  h.add(new THREE.IcosahedronGeometry(1, 2), vary("#9c9064", 0.05), { x: hx, y: Y - 0.4, z: hz, sx: (hx1 - hx0) / 2 + 1, sy: 3.2, sz: (hz1 - hz0) / 2 + 1 });
  h.add(new THREE.IcosahedronGeometry(0.9, 0), "#a89678", { x: hx + 0.6, y: Y + 2.6, z: hz + 0.5, sx: 1.3, sy: 0.7 });
  for (const [dx, dz] of [[-2.2, -4], [2.6, -3], [-2.6, 3.6], [2.2, 4.6]] as [number, number][]) oliveTree(h, hx + dx, Y + 1.4, hz + dz, 1.05);
  // el lugar de oración al pie del monte: una piedra plana y una estera para arrodillarse
  const [ox, oz] = ORACION_PUNTO;
  h.add(new THREE.IcosahedronGeometry(0.55, 1), "#b3a587", { x: ox - 0.95, y: Y + 0.12, z: oz, sx: 1.2, sy: 0.35, sz: 0.9 });
  h.box(0.9, 0.03, 0.55, "#a8874c", { x: ox - 0.1, y: Y + 0.02, z: oz });
  meshes(root, h, null, true);
}

// ---------------------------------------------------------------- la cámara de los sacerdotes (2 Crónicas 31:11)
function buildCamara(root: THREE.Group, fuegos: THREE.Vector3[]) {
  const m = new GeoBuilder();
  const [x0, z0, x1, z1] = CAMARA;
  const W = x1 - x0, D = z1 - z0;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const H = 3.1;
  // muros de piedra labrada contra el muro del monte, con sus hiladas
  m.box(W, H, D, vary(C.piedraClara, 0.02), { x: cx, y: Y + H / 2, z: cz });
  for (let k = 1; k < 6; k++) m.box(W + 0.02, 0.03, D + 0.02, vary(C.junta, 0.04), { x: cx, y: Y + (H * k) / 6, z: cz });
  m.box(W + 0.12, 0.3, D + 0.12, C.piedraOsc, { x: cx, y: Y + 0.15, z: cz });
  // techo plano de cedro con su pretil (Deuteronomio 22:8)
  m.box(W + 0.3, 0.16, D + 0.3, C.cedroOsc, { x: cx, y: Y + H + 0.08, z: cz });
  for (const sg of [-1, 1]) {
    m.box(W + 0.3, 0.34, 0.14, C.piedra, { x: cx, y: Y + H + 0.33, z: cz + sg * (D / 2 + 0.08) });
    m.box(0.14, 0.34, D + 0.3, C.piedra, { x: cx + sg * (W / 2 + 0.08), y: Y + H + 0.33, z: cz });
  }
  // el frente que mira a la plaza: la puerta, dos ventanas altas y el pórtico de dos pilares
  m.box(1.4, 2.3, 0.1, "#3b2a1c", { x: x1 + 0.03, y: Y + 1.15, z: cz, ry: Math.PI / 2 });
  m.box(1.7, 0.18, 0.16, C.cedro, { x: x1 + 0.06, y: Y + 2.4, z: cz, ry: Math.PI / 2 });
  for (const dz of [-2.4, 2.4]) {
    m.box(0.8, 0.6, 0.06, "#2a1d12", { x: x1 + 0.03, y: Y + 2.05, z: cz + dz, ry: Math.PI / 2 });
    m.box(0.95, 0.08, 0.1, C.cedro, { x: x1 + 0.05, y: Y + 1.72, z: cz + dz, ry: Math.PI / 2 });
  }
  for (const dz of [-1.3, 1.3]) {
    m.cyl(0.16, 0.19, 2.75, C.piedra, { x: x1 + 1.0, y: Y + 1.375, z: cz + dz }, 10);
    m.box(0.42, 0.14, 0.42, C.piedraOsc, { x: x1 + 1.0, y: Y + 2.8, z: cz + dz });
  }
  m.box(1.25, 0.18, 3.2, C.cedroOsc, { x: x1 + 0.55, y: Y + 2.95, z: cz });
  m.box(1.05, 0.05, 2.9, "#d7c7a2", { x: x1 + 0.52, y: Y + 0.03, z: cz });
  // las tinajas del aceite y del agua para lavarse, a los lados del pórtico
  jar(m, x1 + 0.45, Y, z0 + 0.55, 1.25, "#a85f35");
  jar(m, x1 + 0.4, Y, z1 - 0.55, 1.15);
  jar(m, x1 + 0.85, Y, z1 - 0.95, 0.9, "#b8673a");
  // dos lamparillas de aceite junto a la puerta: de noche se ven encendidas
  for (const dz of [-0.95, 0.95]) {
    m.box(0.3, 0.05, 0.2, C.cedro, { x: x1 + 0.12, y: Y + 1.95, z: cz + dz });
    m.lathe([[0, 0], [0.07, 0.005], [0.09, 0.04], [0.06, 0.06], [0, 0.055]], "#b0643a", { x: x1 + 0.14, y: Y + 1.98, z: cz + dz, sx: 1.4 }, 10);
    fuegos.push(new THREE.Vector3(x1 + 0.16, Y + 2.1, cz + dz));
  }
  meshes(root, m, null, true);
}

// ---------------------------------------------------------------- la casa de la sabiduría (Proverbios 9:1)
function buildSabiduria(root: THREE.Group, fuegos: THREE.Vector3[]) {
  const m = new GeoBuilder();
  const [x0, z0, x1, z1] = SABIDURIA;
  const W = x1 - x0, D = z1 - z0;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const H = 3.9;
  const ORO = "#d9a72b", MARMOL = "#efe7d6", PURPURA = "#4b2a7a";
  // la sala, de piedra clara con sus hiladas y una franja de oro arriba
  m.box(W, H, D, vary(C.piedraClara, 0.02), { x: cx, y: Y + H / 2, z: cz });
  for (let k = 1; k < 7; k++) m.box(W + 0.02, 0.03, D + 0.02, vary(C.junta, 0.04), { x: cx, y: Y + (H * k) / 7, z: cz });
  m.box(W + 0.06, 0.22, D + 0.06, ORO, { x: cx, y: Y + H - 0.45, z: cz });
  m.box(W + 0.12, 0.32, D + 0.12, C.piedraOsc, { x: cx, y: Y + 0.16, z: cz });
  // techo plano de cedro con su pretil (Deuteronomio 22:8)
  m.box(W + 0.3, 0.16, D + 0.3, C.cedroOsc, { x: cx, y: Y + H + 0.08, z: cz });
  for (const sg of [-1, 1]) {
    m.box(W + 0.3, 0.34, 0.14, C.piedra, { x: cx, y: Y + H + 0.33, z: cz + sg * (D / 2 + 0.08) });
    m.box(0.14, 0.34, D + 0.3, C.piedra, { x: cx + sg * (W / 2 + 0.08), y: Y + H + 0.33, z: cz });
  }
  // la grada con tres escalones que suben desde la plaza
  for (let s = 0; s < 3; s++) {
    const w = 1.7 - s * 0.42;
    m.box(w, 0.15, D + 0.8 - s * 0.2, vary(C.piedra, 0.02), { x: x1 + w / 2, y: Y + 0.075 + s * 0.15, z: cz });
  }
  const top = Y + 0.45;
  // las siete columnas de mármol, con basa y capitel de oro
  for (const [xc, zc] of SABIDURIA_COLUMNAS) {
    m.box(0.42, 0.12, 0.42, ORO, { x: xc, y: top + 0.06, z: zc });
    m.cyl(0.15, 0.18, 3.1, MARMOL, { x: xc, y: top + 0.12 + 1.55, z: zc }, 12);
    m.box(0.46, 0.16, 0.46, ORO, { x: xc, y: top + 3.3, z: zc });
  }
  // el arquitrabe y el remate escalonado sobre las columnas
  m.box(1.5, 0.3, D + 0.3, MARMOL, { x: x1 + 0.75, y: top + 3.53, z: cz });
  m.box(1.52, 0.1, D + 0.32, ORO, { x: x1 + 0.75, y: top + 3.72, z: cz });
  m.box(1.2, 0.35, D - 0.8, MARMOL, { x: x1 + 0.6, y: top + 3.95, z: cz });
  m.box(0.8, 0.3, D - 2.4, MARMOL, { x: x1 + 0.4, y: top + 4.27, z: cz });
  // la puerta grande, de cedro con chapas de oro
  m.box(1.7, 2.7, 0.1, "#3b2a1c", { x: x1 + 0.03, y: top + 1.35, z: cz, ry: Math.PI / 2 });
  for (const dz of [-0.42, 0.42]) m.box(0.62, 2.4, 0.04, "#5a3d22", { x: x1 + 0.07, y: top + 1.3, z: cz + dz, ry: Math.PI / 2 });
  m.box(1.9, 0.18, 0.16, ORO, { x: x1 + 0.06, y: top + 2.8, z: cz, ry: Math.PI / 2 });
  // dos estandartes de púrpura con su orla de oro, a los extremos del pórtico
  for (const zz of [z0 + 0.75, z1 - 0.75]) {
    m.box(0.05, 1.7, 0.62, PURPURA, { x: x1 + 0.08, y: top + 2.0, z: zz });
    m.box(0.06, 0.09, 0.64, ORO, { x: x1 + 0.09, y: top + 1.2, z: zz });
  }
  // dos candeleros altos junto a la puerta: de noche se ven encendidos
  for (const dz of [-1.3, 1.3]) {
    m.cyl(0.04, 0.07, 1.5, ORO, { x: x1 + 0.42, y: top + 0.75, z: cz + dz }, 8);
    m.lathe([[0, 0], [0.1, 0.01], [0.14, 0.06], [0.1, 0.09], [0, 0.08]], ORO, { x: x1 + 0.42, y: top + 1.5, z: cz + dz }, 10);
    fuegos.push(new THREE.Vector3(x1 + 0.42, top + 1.66, cz + dz));
  }
  meshes(root, m, null, true);
}

// ---------------------------------------------------------------- las casas
const ADOBES = ["#c9a06a", "#c29563", "#d1a874", "#bf9a68"];
const PIEDRAS = ["#ddd0b0", "#d6c7a4", "#e3d7b8", "#cfc09c"];
const TELAS_TIENDA = ["#3b2f2a", "#4a3a2e", "#43352b", "#2f2723"];

/** Una casa en coordenadas propias (la puerta mira a +z, el centro en 0). */
/**
 * Lo que dice que en la casa vive gente (pedido de Luis: que se vean más los detalles, las cosas pequeñas). Cambia de
 * casa en casa (con su semilla): la alfombra puesta a airear sobre el pretil, la ropa tendida en el terrado, el lino
 * secándose (Josué 2:6), la leña apilada, la contraventana abierta, los desagües del techo, una maceta en la puerta y,
 * de noche, una lamparita encendida junto a la puerta.
 */
function vidaDeCasa(m: GeoBuilder, v: GeoBuilder, w: number, d: number, h: number, muro: string) {
  const techo = h + 0.14;
  // desagües de madera en el borde del techo (atrás y a un costado)
  m.box(0.08, 0.06, 0.32, C.cedroOsc, { x: rr(-w / 3, w / 3), y: h + 0.02, z: -d / 2 - 0.16 });
  if (rnd() < 0.6) m.box(0.32, 0.06, 0.08, C.cedroOsc, { x: (rnd() < 0.5 ? -1 : 1) * (w / 2 + 0.16), y: h + 0.02, z: rr(-d / 4, d / 4) });
  // una alfombra a airear sobre el pretil del frente
  if (rnd() < 0.55) {
    const x = rr(-w / 4, w / 4), col = pick([C.carmesi, "#8f5a3a", C.azul, "#c98a2b", "#5b2a6e"]);
    m.box(0.95, 0.62, 0.03, col, { x, y: h + 0.16, z: d / 2 + 0.1 });
    m.box(0.95, 0.06, 0.035, "#e2c27a", { x, y: h - 0.08, z: d / 2 + 0.1 });
    m.box(0.95, 0.06, 0.035, "#e2c27a", { x, y: h + 0.36, z: d / 2 + 0.1 });
    m.box(0.2, 0.2, 0.036, "#e2c27a", { x, y: h + 0.14, z: d / 2 + 0.1, rz: Math.PI / 4 });
  }
  // la ropa tendida en el terrado
  if (rnd() < 0.45) {
    const z = rr(-d / 4, d / 6), x0 = -w / 2 + 0.3, x1 = w / 2 - 0.3;
    for (const x of [x0, x1]) m.cyl(0.025, 0.025, 1.0, C.cedroOsc, { x, y: techo + 0.5, z }, 5);
    m.box(x1 - x0, 0.015, 0.015, "#cdbb95", { x: (x0 + x1) / 2, y: techo + 0.96, z });
    const n = 2 + Math.floor(rnd() * 2);
    for (let k = 0; k < n; k++) {
      const x = x0 + ((k + 0.7) / (n + 0.4)) * (x1 - x0);
      m.box(0.34, rr(0.38, 0.55), 0.02, pick([C.lino, "#d9c7a0", "#7fb2d9", "#c98a2b", "#8a2f3a"]), { x, y: techo + 0.72, z });
    }
  }
  // lino secándose en manojos sobre el terrado (Josué 2:6)
  if (rnd() < 0.3) for (let k = 0; k < 4; k++) m.box(0.42, 0.07, 0.12, "#d8c27a", { x: rr(-w / 2 + 0.4, w / 2 - 0.4), y: techo + 0.05, z: rr(-d / 2 + 0.3, -0.1), ry: rr(-0.4, 0.4) });
  // leña apilada contra un costado
  if (rnd() < 0.5) {
    const sx = rnd() < 0.5 ? -1 : 1, z = rr(-d / 4, d / 5);
    for (let k = 0; k < 7; k++) {
      const fila = k < 4 ? 0 : k < 6 ? 1 : 2;
      const enFila = fila === 0 ? k : fila === 1 ? k - 4 : 0;
      m.cyl(0.06, 0.06, 0.62, k % 2 ? "#7a5634" : "#8f6a42", { x: sx * (w / 2 + 0.2), y: 0.06 + fila * 0.11, z: z - 0.2 + enFila * 0.13 + fila * 0.06, rx: Math.PI / 2 }, 6);
    }
  }
  // la contraventana de la ventana, abierta
  if (rnd() < 0.55) m.box(0.22, 0.42, 0.03, C.cedro, { x: w * 0.26 + 0.33, y: h * 0.62, z: d / 2 + 0.12, ry: 0.65 });
  // una maceta con hierbas junto a la puerta
  if (rnd() < 0.5) {
    const x = -w * 0.18 - 0.62;
    m.lathe([[0, 0], [0.1, 0], [0.13, 0.2], [0.11, 0.22], [0, 0.21]], vary("#b0643a", 0.06), { x, z: d / 2 + 0.22 });
    for (let k = 0; k < 4; k++) m.cone(0.05, 0.28, pick([C.hoja, C.hojaClara]), { x: x + rr(-0.05, 0.05), y: 0.32, z: d / 2 + 0.22 + rr(-0.05, 0.05), rz: rr(-0.3, 0.3) }, 5);
  }
  // de noche, una lamparita en un nicho junto a la puerta
  if (rnd() < 0.5) {
    m.box(0.22, 0.2, 0.08, vary(muro, 0.05), { x: -w * 0.18 + 0.58, y: 1.25, z: d / 2 + 0.05 });
    v.sphere(0.06, "#ffcf7a", { x: -w * 0.18 + 0.58, y: 1.27, z: d / 2 + 0.1 }, 6, 5);
  }
}

function casaLocal(m: GeoBuilder, v: GeoBuilder, nivel: number, seed: number, obras: ReadonlySet<string> = new Set()) {
  rnd = mulberry32(seed);
  const [w, d, h] = CASA_MEDIDA[nivel];
  if (nivel === 0) {
    // tienda de pelo de cabra (Cantares 1:5), a franjas, con el frente levantado sobre dos varas
    const franjas = [pick(TELAS_TIENDA), pick(["#7a6450", "#86705a", "#6e5a47"])];
    const alto = h + 0.1, alero = 0.45, fr = d / 2;
    const L = Math.hypot(fr, alto - alero), a = Math.atan2(alto - alero, fr);
    const n = 5;
    for (let k = 0; k < n; k++) {
      const x = -w / 2 + (w / n) * (k + 0.5);
      // la falda de atrás baja casi hasta el suelo; el frente queda alzado como alero
      m.box(w / n + 0.01, 0.05, L, franjas[k % 2], { x, y: (alto + alero) / 2, z: -d / 4, rx: -a });
      m.box(w / n + 0.01, 0.05, fr + 0.45, franjas[k % 2], { x, y: alto - 0.32, z: (fr + 0.45) / 2 - 0.02, rx: 0.42 });
    }
    m.box(w + 0.06, 0.07, 0.09, "#2f2723", { y: alto + 0.02 }); // la cumbrera
    for (const sg of [-1, 1]) {
      // costados de atrás (del suelo al techo) y varas del frente
      m.box(0.05, alero + 0.45, d / 2, franjas[0], { x: sg * w / 2, y: (alero + 0.45) / 2, z: -d / 4 });
      m.cyl(0.035, 0.035, alto - 0.5, C.cedroOsc, { x: sg * (w / 2 - 0.08), y: (alto - 0.5) / 2, z: fr + 0.32 }, 5);
      m.box(0.02, 0.02, 1.0, "#cdbb95", { x: sg * (w / 2 + 0.25), y: 0.45, z: fr + 0.62, rx: 0.75 }); // cuerdas
      m.box(0.08, 0.1, 0.08, C.cedroOsc, { x: sg * (w / 2 + 0.25), y: 0.05, z: fr + 0.95 });
    }
    m.cyl(0.04, 0.04, alto, C.cedroOsc, { y: alto / 2, z: 0 }, 5);
    // adentro, en la sombra: esteras y una cortina del fondo
    m.box(w - 0.2, 0.03, d - 0.3, "#8a6f4a", { y: 0.02, z: -0.05 });
    m.box(w - 0.4, 0.75, 0.04, "#3a2e25", { y: 0.38, z: -d / 2 + 0.2 });
    // alfombra, fogón y cántaro delante
    m.box(1.3, 0.03, 0.8, pick([C.carmesi, "#8f5a3a", C.azul]), { y: 0.02, z: fr + 0.55 });
    for (let k = 0; k < 6; k++) m.box(0.15, 0.12, 0.15, C.piedraOsc, { x: 0.95 + Math.cos(k) * 0.26, y: 0.06, z: fr + 1.05 + Math.sin(k) * 0.26 });
    if (!obras.has("cisterna")) jar(m, -1.0, 0, fr + 0.75, 0.9);
    // lo de cada día en la tienda: el odre colgado de la vara, una cesta con frutos, leña y, de noche, la lámpara
    if (rnd() < 0.6) m.sphere(0.13, "#6e4a2c", { x: -(w / 2 - 0.08), y: alto - 0.95, z: fr + 0.32, sy: 1.4, sz: 0.8 }, 7, 6);
    if (rnd() < 0.6) {
      const cx = rr(-0.4, 0.3), cz = fr + 0.95;
      m.lathe([[0, 0], [0.16, 0.02], [0.2, 0.16], [0.18, 0.18], [0, 0.17]], "#c9a96a", { x: cx, z: cz }, 10);
      for (let k = 0; k < 5; k++) m.sphere(0.055, pick(["#6b3a5a", "#7a8a4a", "#b3242f", "#d9a03a"]), { x: cx + rr(-0.09, 0.09), y: 0.19, z: cz + rr(-0.09, 0.09) }, 6, 5);
    }
    if (rnd() < 0.5) for (let k = 0; k < 5; k++) m.cyl(0.05, 0.05, 0.55, k % 2 ? "#7a5634" : "#8f6a42", { x: w / 2 + 0.3, y: 0.05 + (k > 2 ? 0.1 : 0), z: fr - 0.2 + (k % 3) * 0.12, rx: Math.PI / 2 }, 6);
    if (rnd() < 0.55) v.sphere(0.06, "#ffcf7a", { x: rr(-0.4, 0.4), y: 0.32, z: -0.1 }, 6, 5);
    return;
  }
  const piedra = nivel >= 2;
  const muro = piedra ? pick(PIEDRAS) : pick(ADOBES);
  m.box(w, h, d, vary(muro, 0.03), { y: h / 2 });
  if (piedra) for (let k = 1; k < 5; k++) m.box(w + 0.02, 0.03, d + 0.02, vary(C.junta, 0.04), { y: (h * k) / 5 });
  else m.box(w + 0.03, 0.22, d + 0.03, vary("#a9875a", 0.05), { y: 0.11 });
  // techo plano con pretil (Deuteronomio 22:8)
  m.box(w + 0.16, 0.14, d + 0.16, piedra ? C.cedroOsc : "#8a6a4a", { y: h + 0.07 });
  for (const sg of [-1, 1]) {
    m.box(w + 0.16, 0.32, 0.12, vary(muro, 0.04), { y: h + 0.3, z: sg * (d / 2 + 0.02) });
    m.box(0.12, 0.32, d + 0.16, vary(muro, 0.04), { x: sg * (w / 2 + 0.02), y: h + 0.3 });
  }
  // puerta y ventana
  m.box(0.75, 1.55, 0.06, piedra ? C.cedro : "#5e4630", { x: -w * 0.18, y: 0.78, z: d / 2 + 0.02 });
  m.box(0.95, 0.12, 0.09, piedra ? C.piedraClara : "#8a6a4a", { x: -w * 0.18, y: 1.6, z: d / 2 + 0.03 });
  m.box(0.45, 0.42, 0.05, "#2e2418", { x: w * 0.26, y: h * 0.62, z: d / 2 + 0.02 });
  v.box(0.36, 0.33, 0.02, "#ffcf7a", { x: w * 0.26, y: h * 0.62, z: d / 2 + 0.05 });
  if (piedra) for (let k = 0; k < 3; k++) m.box(0.03, 0.42, 0.06, C.cedroOsc, { x: w * 0.26 - 0.12 + k * 0.12, y: h * 0.62, z: d / 2 + 0.06 }); // celosía
  if (!obras.has("cisterna")) jar(m, w * 0.42, 0, d / 2 + 0.3, 1.0);
  vidaDeCasa(m, v, w, d, h, muro);
  if (!piedra) {
    // escalera de mano al terrado
    for (const dz of [-0.22, 0.22]) m.box(0.06, h + 0.5, 0.06, C.cedroOsc, { x: w / 2 + 0.18, y: (h + 0.5) / 2, z: dz, rz: -0.08 });
    for (let k = 0; k < 6; k++) m.box(0.05, 0.04, 0.46, C.cedro, { x: w / 2 + 0.18 - k * 0.015, y: 0.35 + k * 0.4, z: 0 });
    return;
  }
  // patio con muro bajo, higuera y vid (Miqueas 4:4)
  const pf = d / 2, pz1 = d / 2 + 1.15;
  for (const sg of [-1, 1]) m.box(0.22, 0.75, pz1 - pf, vary(muro, 0.04), { x: sg * (w / 2 - 0.05), y: 0.37, z: (pf + pz1) / 2 });
  m.box(w * 0.34, 0.75, 0.22, vary(muro, 0.04), { x: -w / 2 + w * 0.17 - 0.05, y: 0.37, z: pz1 });
  m.box(w * 0.34, 0.75, 0.22, vary(muro, 0.04), { x: w / 2 - w * 0.17 + 0.05, y: 0.37, z: pz1 });
  m.cyl(0.08, 0.12, 1.3, "#6e5a43", { x: w / 2 - 0.55, y: 0.65, z: pf + 0.6 }, 6);
  for (let k = 0; k < 3; k++) m.add(new THREE.IcosahedronGeometry(0.48, 0), vary("#5f7f3a", 0.1), { x: w / 2 - 0.55 + rr(-0.25, 0.25), y: 1.45 + rr(0, 0.3), z: pf + 0.6 + rr(-0.25, 0.25), sy: 0.75 });
  for (let k = 0; k < 5; k++) m.box(0.14, 0.12, 0.14, pick([C.hoja, C.hojaClara, "#6b3a5a"]), { x: -w / 2 + 0.1, y: 0.82, z: pf + 0.25 + k * 0.2 });
  if (nivel < 3) return;
  // el aposento alto sobre el terrado (2 Reyes 4:10)
  const aw = 1.8, ad = 1.9, ah = 1.55;
  const ax = -w / 2 + aw / 2 + 0.1, az = -d / 2 + ad / 2 + 0.1;
  m.box(aw, ah, ad, vary(muro, 0.03), { x: ax, y: h + 0.14 + ah / 2, z: az });
  m.box(aw + 0.14, 0.12, ad + 0.14, C.cedroOsc, { x: ax, y: h + 0.14 + ah + 0.06, z: az });
  m.box(0.6, 1.1, 0.05, C.cedro, { x: ax + 0.3, y: h + 0.14 + 0.55, z: az + ad / 2 + 0.02 });
  m.box(0.34, 0.3, 0.05, "#2e2418", { x: ax - 0.45, y: h + 0.14 + 1.05, z: az + ad / 2 + 0.02 });
  v.box(0.26, 0.22, 0.02, "#ffd88a", { x: ax - 0.45, y: h + 0.14 + 1.05, z: az + ad / 2 + 0.05 });
}

/**
 * Dónde van los adornos de cada casa (en sus coordenadas: la puerta mira a +z). Primero el suelo
 * (junto a la puerta y en el patio) y luego el terrado (Josué 2:6: el lino de Rahab en su terrado).
 */
type LugarAdorno = { x: number; z: number; ry: number; alto: 0 | 1 | 2 | 3 };
const LUGARES_ADORNO: LugarAdorno[][] = [
  // la tienda: a los dos lados
  [{ x: -1.6, z: -0.6, ry: -Math.PI / 2, alto: 0 }, { x: 1.6, z: -0.6, ry: Math.PI / 2, alto: 0 }],
  // la casa de adobe: junto a la puerta, bajo la ventana y en el terrado
  [{ x: -1.3, z: 1.95, ry: 0, alto: 0 }, { x: 0.6, z: 1.95, ry: 0, alto: 0 }, { x: -0.75, z: -0.6, ry: 0, alto: 1 }, { x: 0.75, z: -0.6, ry: 0, alto: 1 }],
  // la casa de piedra: en el patio y en el terrado
  [
    { x: -1.12, z: 2.2, ry: 0, alto: 0 }, { x: 0.62, z: 2.0, ry: 0, alto: 0 },
    { x: -0.85, z: -0.8, ry: 0, alto: 1 }, { x: 0.85, z: -0.8, ry: 0, alto: 1 }, { x: -0.85, z: 0.85, ry: 0, alto: 1 }, { x: 0.85, z: 0.85, ry: 0, alto: 1 },
  ],
  // con aposento alto (en la esquina de atrás del terrado) y uno más sobre su techo
  [
    { x: -1.12, z: 2.2, ry: 0, alto: 0 }, { x: 0.62, z: 2.0, ry: 0, alto: 0 },
    { x: 1.0, z: -1.05, ry: 0, alto: 1 }, { x: 1.0, z: 0.4, ry: 0, alto: 1 }, { x: -1.05, z: 1.05, ry: 0, alto: 1 }, { x: 0.12, z: 1.12, ry: 0, alto: 1 },
    { x: 1.05, z: 1.3, ry: 0, alto: 1 }, { x: -0.6, z: -0.7, ry: 0, alto: 2 },
  ],
];
/** Los árboles y lo grande van al suelo si hay lugar; lo demás, donde toque. */
const GRANDES = new Set(["higuera", "palmera", "parra", "telar", "toldo"]);

/** Lo alto de la torre del terrado (shared/obras.ts), sobre el terrado. */
const TORRE_ALTO = 2.2;

function adornosDeCasa(m: GeoBuilder, v: GeoBuilder, nivel: number, ids: string[], obras: ReadonlySet<string> = new Set()) {
  // con la torre (casa con aposento alto), el lugar de la esquina de atrás pasa a lo alto de la torre
  const lugares = LUGARES_ADORNO[nivel].map((l) => (nivel >= 3 && obras.has("torre") && l.alto === 1 && l.x === 1.0 && l.z === -1.05 ? { ...l, alto: 3 as const } : l));
  const [, , h] = CASA_MEDIDA[nivel];
  const suelo = lugares.filter((l) => l.alto === 0);
  const arriba = lugares.filter((l) => l.alto > 0);
  // primero lo grande en el suelo, después lo demás donde quede
  const orden = [...ids.filter((id) => GRANDES.has(id)), ...ids.filter((id) => !GRANDES.has(id))];
  for (const id of orden.slice(0, lugares.length)) {
    const l = (GRANDES.has(id) ? suelo.shift() : arriba.shift()) ?? suelo.shift() ?? arriba.shift();
    if (!l) break;
    const y = l.alto === 0 ? 0 : l.alto === 1 ? h + 0.14 : l.alto === 2 ? h + 0.14 + 1.55 + 0.12 : h + 0.14 + TORRE_ALTO + 0.1;
    // un árbol que no cupo en el suelo va en una maceta grande en el terrado
    adorno(m, v, id, l.x, y, l.z, l.ry, l.alto > 0 && (id === "higuera" || id === "palmera" || id === "parra") ? 0.55 : 1);
  }
}

/**
 * Las ovejas del redil de la casa (shared/taller.ts), en sus coordenadas (la puerta mira a +z): pastan a la orilla de la
 * calle, del lado contrario a la puerta, para no tapar las obras del patio. Se ven hasta 3, sencillas (son muchas casas).
 */
const LUGARES_OVEJA: [number, number, number][] = [
  [1.22, 3.28, 0.35],
  [0.72, 3.46, -0.5],
  [1.58, 3.56, 2.7],
];
function ovejasDeCasa(m: GeoBuilder, n: number) {
  for (const [x, z, ry] of LUGARES_OVEJA.slice(0, Math.max(0, Math.min(3, n)))) {
    const c = Math.cos(ry), sn = Math.sin(ry);
    // lo que va hacia la cabeza (+x local de la oveja), girado
    const at = (dx: number, dz: number) => ({ x: x + dx * c + dz * sn, z: z - dx * sn + dz * c });
    // el vellón (una esfera baja), la cabeza oscura y las patas de dos en dos
    m.sphere(0.15, vary("#efe9dc", 0.04), { ...at(0, 0), y: 0.23, sx: 1.4, sy: 0.92, ry }, 6, 4);
    m.box(0.12, 0.1, 0.11, "#3d3229", { ...at(0.22, 0), y: 0.28, ry });
    for (const dx of [0.11, -0.11]) m.box(0.035, 0.15, 0.17, "#4a3d31", { ...at(dx, 0), y: 0.075, ry });
  }
}

/**
 * El huertito de la casa (shared/huerto.ts), en sus coordenadas (la puerta mira a +z): un cantero con borde de piedras a
 * la orilla de la calle, del lado contrario a las ovejas, con un surco por cada surco del huerto (hasta 4) y lo sembrado
 * en su etapa, para que los vecinos vean cómo va. Sencillo: son muchas casas.
 */
function huertitoDeCasa(m: GeoBuilder, surcos: { s: "trigo" | "cebada" | "olivo" | null; e: number }[]) {
  const x0 = -1.76, x1 = -0.88, z0 = 3.1, z1 = 3.72;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  // el borde de piedras y la tierra
  m.box(x1 - x0 + 0.08, 0.06, z1 - z0 + 0.08, vary(C.piedraOsc, 0.05), { x: cx, y: 0.03, z: cz });
  m.box(x1 - x0 - 0.04, 0.07, z1 - z0 - 0.04, "#6b5033", { x: cx, y: 0.04, z: cz });
  const n = Math.max(1, Math.min(4, surcos.length));
  const paso = (z1 - z0 - 0.08) / n;
  surcos.slice(0, 4).forEach((p, i) => {
    const z = z0 + 0.04 + paso * (i + 0.5);
    const arado = p.s !== null || p.e === -1;
    m.box(x1 - x0 - 0.1, 0.03, paso * 0.6, arado ? "#4e3a22" : "#a98d62", { x: cx, y: 0.09, z });
    if (!p.s) return;
    const e = Math.max(0, Math.min(4, p.e));
    if (p.s === "olivo") {
      // un olivito por surco
      const alto = [0.08, 0.16, 0.26, 0.34, 0.36][e];
      m.cyl(0.012, 0.018, alto, "#6e5a43", { x: cx, y: 0.1 + alto / 2, z }, 4);
      if (e > 0) m.sphere(0.05 + e * 0.016, e === 4 ? "#5f6b4a" : "#7b8a5c", { x: cx, y: 0.1 + alto, z, sy: 0.8 }, 5, 4);
      if (e === 4) for (const dx of [-0.05, 0.04, 0.0]) m.sphere(0.018, "#3b2a3f", { x: cx + dx, y: 0.06 + alto, z: z + 0.05 }, 4, 3);
      return;
    }
    // seis matas de trigo o cebada: verdes al brotar, doradas al madurar (con su espiga)
    const alto = [0.02, 0.08, 0.15, 0.22, 0.26][e];
    const color = e === 4 ? (p.s === "cebada" ? "#ecd98e" : "#e0bd4e") : e === 3 ? "#a9c25a" : "#79a84c";
    for (let k = 0; k < 6; k++) {
      const x = x0 + 0.08 + k * ((x1 - x0 - 0.16) / 5);
      if (e === 0) m.sphere(0.016, "#d9c27a", { x, y: 0.11, z }, 4, 3);
      else {
        m.cone(0.028, alto, color, { x, y: 0.1 + alto / 2, z }, 4);
        if (e >= 3) m.sphere(0.022, e === 4 ? "#f0cf62" : "#c2d46a", { x, y: 0.1 + alto, z, sy: 1.8 }, 4, 3);
      }
    }
  });
}

/**
 * Las obras de la casa (shared/obras.ts), en sus coordenadas (la puerta mira a +z). Cada una tiene su lugar según la
 * casa (tienda, adobe, piedra con patio o aposento alto), medido para no chocar con lo que ya tiene: la cisterna toma
 * el lugar de la tinaja, el horno y el huerto nuevo van al frente del patio, el granero y la torre al terrado.
 */
function obrasDeCasa(m: GeoBuilder, v: GeoBuilder, nivel: number, obras: ReadonlySet<string>) {
  const [w, d, h] = CASA_MEDIDA[nivel];
  const fr = d / 2;
  const techo = h + 0.14;
  const tienda = nivel === 0, patio = nivel >= 2;
  const puertaX = tienda ? 0 : -w * 0.18;
  const pz1 = fr + 1.15; // el frente del patio (casa de piedra)
  /** Una hoja de portón con su bisagra en (hx, hz), abierta hacia la calle `a` radianes; `s` dice de qué lado está. */
  const hoja = (hx: number, hz: number, s: number, largo: number, alto: number, a: number) => {
    const dx = -s * Math.cos(a), dz = Math.sin(a);
    const t = { x: hx + (dx * largo) / 2, y: alto / 2 + 0.06, z: hz + (dz * largo) / 2, ry: Math.atan2(-dz, dx) };
    m.box(largo, alto, 0.05, vary(C.cedro, 0.05), t);
    m.box(largo * 0.92, 0.07, 0.07, C.cedroOsc, { ...t, y: alto * 0.78 });
    m.box(largo * 0.92, 0.07, 0.07, C.cedroOsc, { ...t, y: alto * 0.28 });
  };

  // ------------------------------------------------ el cerco de piedra con su portón
  if (obras.has("cerco")) {
    if (!patio) {
      const z = 2.96, x0 = 1.7, hueco = 0.46, alto = 0.42;
      for (const sg of [-1, 1]) {
        m.box(x0 - hueco, alto, 0.18, vary(C.piedraOsc, 0.05), { x: sg * (hueco + (x0 - hueco) / 2), y: alto / 2, z });
        m.box(0.18, alto, z - fr - 0.05, vary(C.piedraOsc, 0.05), { x: sg * x0, y: alto / 2, z: (z + fr + 0.05) / 2 });
        for (let k = 0; k < 4; k++) m.box(0.2, 0.07, 0.22, vary(C.piedraClara, 0.06), { x: sg * (hueco + 0.16 + (k * (x0 - hueco - 0.25)) / 3), y: alto + 0.035, z });
        m.box(0.12, alto + 0.36, 0.12, C.cedroOsc, { x: sg * hueco, y: (alto + 0.36) / 2, z });
        hoja(sg * hueco, z + 0.06, sg, hueco - 0.05, 0.62, 1.05);
      }
    } else {
      // la casa con patio ya tiene su muro: el portón de madera en la entrada y piedras de remate
      for (const sg of [-1, 1]) {
        m.box(0.16, 1.05, 0.16, C.cedroOsc, { x: sg * 0.6, y: 0.52, z: pz1 });
        hoja(sg * 0.6, pz1 + 0.06, sg, 0.54, 0.85, 1.15);
        if (!obras.has("ensanchar")) for (let k = 0; k < 4; k++) m.box(0.22, 0.07, 0.26, vary(C.piedraClara, 0.05), { x: sg * (0.75 + k * 0.28), y: 0.785, z: pz1 });
      }
    }
  }

  // ------------------------------------------------ ensanchar el huerto: surcos con estacas y cuerdas (Isaías 54:2)
  if (obras.has("ensanchar")) {
    const surcos = (x0: number, x1: number, z0: number, z1: number, y = 0) => {
      m.box(x1 - x0, 0.12, z1 - z0, "#6e5638", { x: (x0 + x1) / 2, y: y + 0.06, z: (z0 + z1) / 2 });
      const n = Math.max(2, Math.round((x1 - x0) / 0.2));
      for (let k = 0; k < n; k++) {
        for (const zz of z1 - z0 > 0.3 ? [z0 + (z1 - z0) * 0.3, z0 + (z1 - z0) * 0.72] : [(z0 + z1) / 2]) {
          m.cone(0.075, 0.24, pick([C.hoja, C.hojaClara, C.verdeOliva]), { x: x0 + (k + 0.5) * ((x1 - x0) / n), y: y + 0.24, z: zz }, 5);
        }
      }
      for (const x of [x0 + 0.03, x1 - 0.03]) m.cyl(0.015, 0.02, 0.4, C.cedroOsc, { x, y: y + 0.2, z: z0 + 0.03 }, 5);
      m.box(x1 - x0, 0.01, 0.01, "#cdbb95", { x: (x0 + x1) / 2, y: y + 0.36, z: z0 + 0.03 });
    };
    if (tienda) surcos(-1.6, -1.05, 2.35, 2.86);
    else if (!patio) surcos(-1.62, -0.78, 2.42, 2.84);
    else for (const sg of [-1, 1]) surcos(sg > 0 ? 0.64 : -1.6, sg > 0 ? 1.6 : -0.64, pz1 - 0.1, pz1 + 0.1, 0.75);
  }

  // ------------------------------------------------ la cisterna (en el lugar de la tinaja de la puerta)
  if (obras.has("cisterna")) {
    const [x, z] = tienda ? [-1.0, 2.05] : patio ? [1.2, 2.02] : [1.22, 1.97];
    const r = 0.24;
    m.cyl(r, r + 0.03, 0.42, vary(C.piedra, 0.04), { x, y: 0.21, z }, 12);
    m.cyl(r + 0.035, r + 0.035, 0.05, C.piedraClara, { x, y: 0.43, z }, 12);
    m.cyl(r - 0.05, r - 0.05, 0.02, C.agua, { x, y: 0.4, z }, 12);
    for (const sg of [-1, 1]) m.box(0.05, 0.78, 0.05, C.cedroOsc, { x: x + sg * (r + 0.02), y: 0.6, z });
    m.box(2 * r + 0.14, 0.05, 0.05, C.cedroOsc, { x, y: 0.99, z });
    m.cyl(0.05, 0.05, 0.04, C.bronce, { x, y: 0.93, z, rx: Math.PI / 2 }, 10);
    m.box(0.008, 0.36, 0.008, "#cdbb95", { x, y: 0.74, z });
    m.cyl(0.07, 0.055, 0.12, C.bronceOsc, { x, y: 0.52, z }, 10);
    m.box(0.36, 0.03, 0.36, C.cedroOsc, { x: x - r - 0.06, y: 0.22, z, rz: 1.25 }); // la tapa, apoyada
  }

  // ------------------------------------------------ el horno de barro (con sus brasas de noche)
  if (obras.has("horno")) {
    const [x, z] = tienda ? [-0.36, 2.66] : patio ? [-1.05, 2.64] : [1.2, 2.6];
    const r = 0.24;
    m.sphere(r, vary("#a86a42", 0.05), { x, y: 0.02, z, sy: 1.1 }, 10, 5, Math.PI * 2, Math.PI / 2);
    m.cyl(r + 0.02, r + 0.03, 0.05, "#8a5a3a", { x, y: 0.025, z }, 12);
    m.box(0.16, 0.13, 0.06, "#2e2418", { x, y: 0.09, z: z + r - 0.03 });
    v.box(0.1, 0.06, 0.02, "#ff9a3a", { x, y: 0.08, z: z + r });
    m.cyl(0.03, 0.035, 0.12, "#8a5a3a", { x: x + 0.05, y: r + 0.06, z: z - 0.05 }, 6);
    const lx = x + (tienda || patio ? 0.34 : -0.34);
    for (let k = 0; k < 3; k++) m.cyl(0.035, 0.035, 0.36, k % 2 ? "#7a5634" : "#8f6a42", { x: lx, y: 0.04 + (k > 1 ? 0.07 : 0), z: z - 0.08 + (k % 2) * 0.08, rx: Math.PI / 2 }, 6);
  }

  // ------------------------------------------------ el emparrado del patio: una vid sobre varas (Salmos 128:3)
  if (obras.has("emparrado") && !tienda) {
    const xs = patio ? 1.55 : 1.62, z0 = patio ? 1.9 : fr + 0.12, z1 = patio ? 2.85 : 2.86, y0 = patio ? 0.75 : 0, top = patio ? 2.45 : 2.25;
    for (const sx of [-1, 1]) for (const zz of [z0, z1]) m.cyl(0.035, 0.045, top - y0, C.cedroOsc, { x: sx * xs, y: (y0 + top) / 2, z: zz }, 6);
    for (const sx of [-1, 1]) m.box(0.06, 0.06, z1 - z0 + 0.1, C.cedroOsc, { x: sx * xs, y: top, z: (z0 + z1) / 2 });
    for (let k = 0; k <= 5; k++) m.box(2 * xs + 0.1, 0.04, 0.05, C.cedro, { y: top + 0.04, z: z0 + (k * (z1 - z0)) / 5 });
    for (let k = 0; k < 10; k++) m.add(new THREE.IcosahedronGeometry(0.28, 0), vary("#5f7f3a", 0.12), { x: rr(-xs + 0.12, xs - 0.12), y: top + 0.13 + rr(-0.03, 0.06), z: rr(z0, z1), sy: 0.42 });
    // los racimos: un cono de uvas colgando (de lejos se ve igual y pesa poco)
    for (let k = 0; k < 5; k++) m.cone(0.07, 0.2, "#5b2a5e", { x: rr(-xs + 0.25, xs - 0.25), y: top - 0.12, z: rr(z0 + 0.12, z1 - 0.12), rx: Math.PI }, 5);
    m.cyl(0.03, 0.045, top - y0, "#5d4532", { x: -xs + 0.08, y: (y0 + top) / 2, z: z1 - 0.06, rz: 0.04 }, 5);
  }

  // ------------------------------------------------ el pórtico con columnas (casa de piedra; 1 Reyes 7:6)
  const portico = obras.has("portico") && patio;
  if (portico) {
    const z = fr + 0.12;
    for (const sg of [-1, 1]) {
      const x = puertaX + sg * 0.5;
      m.cyl(0.11, 0.13, 1.92, vary(C.piedraClara, 0.03), { x, y: 0.12 + 0.96, z }, 12);
      m.box(0.32, 0.12, 0.32, C.piedra, { x, y: 0.06, z });
      m.box(0.3, 0.12, 0.3, C.piedraClara, { x, y: 2.1, z });
    }
    m.box(1.36, 0.2, 0.42, vary(C.piedraClara, 0.03), { x: puertaX, y: 2.26, z: fr + 0.1 });
    m.box(1.42, 0.06, 0.46, C.piedraOsc, { x: puertaX, y: 2.39, z: fr + 0.1 });
    m.box(0.9, 0.08, 0.3, C.piedraOsc, { x: puertaX, y: 0.04, z: fr + 0.17 });
    m.box(0.7, 0.08, 0.16, C.piedra, { x: puertaX, y: 0.12, z: fr + 0.1 });
  }

  // ------------------------------------------------ las lámparas en la puerta (de noche se encienden)
  if (obras.has("lamparas")) {
    const lampara = (x: number, y: number, z: number) => {
      m.lathe([[0, 0], [0.07, 0.005], [0.09, 0.04], [0.06, 0.06], [0, 0.055]], "#b0643a", { x, y, z, sx: 1.4 }, 10);
      v.sphere(0.05, "#ffcf7a", { x: x + 0.08, y: y + 0.09, z, sy: 1.5 }, 6, 5);
    };
    if (tienda) {
      const alto = h + 0.1;
      for (const sg of [-1, 1]) {
        const x = sg * (w / 2 - 0.08), z = fr + 0.38;
        m.box(0.015, 0.3, 0.015, "#5a3d26", { x, y: alto - 0.66, z });
        lampara(x, alto - 0.86, z);
      }
    } else {
      const sep = portico ? 0.5 : 0.62, z = portico ? fr + 0.25 : fr + 0.06;
      for (const sg of [-1, 1]) {
        const x = puertaX + sg * sep;
        m.box(0.07, 0.07, 0.2, C.cedroOsc, { x, y: 1.42, z: z + 0.06 });
        lampara(x, 1.46, z + 0.14);
      }
    }
  }

  // ------------------------------------------------ la puerta de cedro labrada, con su aldaba de bronce
  if (obras.has("puerta") && !tienda) {
    const z = fr + 0.05;
    for (const sg of [-1, 1]) m.box(0.1, 1.68, 0.1, C.cedroOsc, { x: puertaX + sg * 0.43, y: 0.84, z });
    m.box(1.06, 0.16, 0.13, C.cedroOsc, { x: puertaX, y: 1.72, z });
    m.box(0.72, 1.5, 0.03, "#7a4a26", { x: puertaX, y: 0.78, z: z + 0.01 });
    for (let r = 0; r < 3; r++) for (const sg of [-1, 1]) m.box(0.26, 0.36, 0.02, "#8f5a30", { x: puertaX + sg * 0.17, y: 0.32 + r * 0.46, z: z + 0.03 });
    m.torus(0.05, 0.012, C.bronce, { x: puertaX + 0.2, y: 0.92, z: z + 0.05 }, 4, 10);
    m.sphere(0.025, C.bronceOsc, { x: puertaX + 0.2, y: 0.97, z: z + 0.045 }, 6, 5);
  }

  // ------------------------------------------------ las palabras en los postes de la puerta (Deuteronomio 6:9)
  if (obras.has("palabras") && !tienda) {
    const x = puertaX + 0.47, z = fr + 0.08;
    m.box(0.07, 0.26, 0.05, C.oro, { x, y: 1.2, z, rz: 0.25 });
    m.cyl(0.012, 0.012, 0.2, C.lino, { x, y: 1.2, z: z + 0.03, rz: 0.25 }, 6);
  }

  // ------------------------------------------------ el granero en el terrado: tinajas grandes y sacos de grano
  if (obras.has("granero") && !tienda) {
    // dónde caben en cada terrado (sin tocar los lugares de los adornos, el aposento ni la torre)
    const LUGAR: Record<number, { tinajas: [number, number, number][]; sacos: [number, number, number][] }> = {
      1: { tinajas: [[0.58, 0.73, 1], [0.98, 0.75, 0.95], [0.78, 1.05, 1.05]], sacos: [[0.46, 1.15, 0.4], [1.1, 1.13, -0.3]] },
      2: { tinajas: [[-0.2, -0.02, 1], [0.2, 0, 0.95], [0, 0.3, 1.05]], sacos: [[-0.3, 0.4, 0.4], [0.32, 0.38, -0.3]] },
      3: { tinajas: [[1.3, -0.35, 1], [1.3, 0.02, 0.95], [0.95, -0.3, 1.05]], sacos: [[0.88, 0.04, 0.4]] },
    };
    const l = LUGAR[Math.min(3, nivel)];
    for (const [x, z, k] of l.tinajas)
      m.lathe([[0, 0], [0.12 * k, 0], [0.22 * k, 0.22 * k], [0.18 * k, 0.48 * k], [0.1 * k, 0.6 * k], [0, 0.6 * k]], vary("#b8673a", 0.07), { x, y: techo, z }, 8);
    for (const [x, z, ry] of l.sacos) m.sphere(0.15, "#d8c27a", { x, y: techo + 0.1, z, sx: 1.25, sy: 0.7, ry }, 6, 4);
  }

  // ------------------------------------------------ la fuente del patio (Cantares 4:15)
  if (obras.has("fuente") && patio) {
    const x = 0.6, z = 2.62, r = 0.26;
    m.cyl(r, r + 0.03, 0.3, vary(C.piedraClara, 0.03), { x, y: 0.15, z }, 12);
    m.cyl(r - 0.04, r - 0.04, 0.02, C.agua, { x, y: 0.29, z }, 12);
    m.cyl(0.05, 0.07, 0.42, C.piedra, { x, y: 0.5, z }, 10);
    m.lathe([[0, 0], [0.04, 0], [0.12, 0.06], [0.13, 0.08], [0, 0.07]], C.piedraClara, { x, y: 0.7, z }, 12);
    m.cyl(0.1, 0.1, 0.012, C.agua, { x, y: 0.775, z }, 12);
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + 0.4;
      m.box(0.012, 0.44, 0.012, "#8fd0ea", { x: x + Math.cos(a) * 0.12, y: 0.53, z: z + Math.sin(a) * 0.12 });
    }
  }

  // ------------------------------------------------ la torre del terrado (casa con aposento alto; Lucas 14:28)
  if (obras.has("torre") && nivel >= 3) {
    const x = 1.0, z = -1.05, lado = 0.9, alto = TORRE_ALTO;
    m.box(lado, alto, lado, vary(C.piedra, 0.03), { x, y: techo + alto / 2, z });
    for (let k = 1; k < 4; k++) m.box(lado + 0.02, 0.03, lado + 0.02, vary(C.junta, 0.04), { x, y: techo + (alto * k) / 4, z });
    m.box(lado + 0.1, 0.1, lado + 0.1, C.piedraOsc, { x, y: techo + alto + 0.05, z });
    for (const dx of [-1, 1]) for (const dz of [-1, 1]) m.box(0.22, 0.26, 0.22, vary(C.piedra, 0.04), { x: x + dx * (lado / 2 - 0.06), y: techo + alto + 0.23, z: z + dz * (lado / 2 - 0.06) });
    m.box(0.12, 0.42, 0.04, "#2e2418", { x, y: techo + alto * 0.62, z: z + lado / 2 + 0.01 });
    v.box(0.08, 0.34, 0.02, "#ffd88a", { x, y: techo + alto * 0.62, z: z + lado / 2 + 0.03 });
    const px = x - lado / 2 + 0.08, pz = z - lado / 2 + 0.08;
    m.cyl(0.015, 0.015, 0.75, C.cedroOsc, { x: px, y: techo + alto + 0.47, z: pz }, 5);
    m.cone(0.11, 0.34, C.carmesi, { x: px + 0.18, y: techo + alto + 0.72, z: pz, rz: -Math.PI / 2, sz: 0.12 }, 8);
  }
}

/** Un adorno suelto, en el origen y mirando a +z (para la foto del mercado): lo de barro y madera, y su luz. */
export function construirAdornoSuelto(id: string): THREE.Group {
  const m = new GeoBuilder(), v = new GeoBuilder();
  adorno(m, v, id, 0, 0, 0, 0, 1);
  const g = new THREE.Group();
  if (!m.empty) g.add(new THREE.Mesh(m.build(), matteMat()));
  if (!v.empty) g.add(new THREE.Mesh(v.build(), ventanaMat()));
  return g;
}

function adorno(m: GeoBuilder, v: GeoBuilder, id: string, x: number, y: number, z: number, ry: number, s: number) {
  const c = Math.cos(ry), sn = Math.sin(ry);
  // una pieza del adorno, girada con él alrededor de su lugar
  const P = (dx: number, dy: number, dz: number, extra: { rx?: number; rz?: number; sx?: number; sy?: number; sz?: number } = {}) => ({
    x: x + (dx * c + dz * sn) * s,
    y: y + dy * s,
    z: z + (-dx * sn + dz * c) * s,
    ry,
    ...extra,
  });
  const maceta = (escala: number) => {
    m.lathe([[0, 0], [0.13 * escala, 0], [0.17 * escala, 0.24 * escala], [0.15 * escala, 0.27 * escala], [0, 0.26 * escala]], vary("#b0643a", 0.06), P(0, 0, 0));
    m.cyl(0.155 * escala, 0.155 * escala, 0.02, "#5a3d26", P(0, 0.25 * escala, 0), 10);
  };
  switch (id) {
    case "maceta": {
      maceta(1);
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        m.sphere(0.065, pick(["#d9476a", "#f0c04a", "#e86fa8", "#ffffff", "#d95b3a"]), P(Math.cos(a) * 0.09, 0.36 + (k % 2) * 0.05, Math.sin(a) * 0.09), 6, 5);
      }
      m.sphere(0.12, vary(C.hoja, 0.1), P(0, 0.3, 0, { sy: 0.6 }), 8, 6);
      break;
    }
    case "cantaro":
      jar(m, P(0, 0, 0).x, y, P(0, 0, 0).z, 1.15 * s, "#a85a32");
      m.cyl(0.03, 0.03, 0.2, "#6a4a2c", P(0.18, 0.12, 0, { rz: 0.4 }), 5); // el cucharón
      break;
    case "banco": {
      m.box(0.9, 0.1, 0.34, vary(C.piedraClara, 0.04), P(0, 0.42, 0));
      for (const dx of [-0.32, 0.32]) m.box(0.16, 0.37, 0.28, vary(C.piedra, 0.05), P(dx, 0.185, 0));
      break;
    }
    case "lampara": {
      // una columnita con su lámpara de barro (de noche se enciende)
      m.cyl(0.05, 0.07, 0.95, C.piedraOsc, P(0, 0.475, 0), 8);
      m.box(0.2, 0.05, 0.2, C.piedra, P(0, 0.97, 0));
      m.lathe([[0, 0], [0.07, 0.005], [0.09, 0.04], [0.06, 0.06], [0, 0.055]], "#b0643a", P(0, 1.0, 0, { sx: 1.4 }), 10);
      v.sphere(0.045, "#ffcf7a", P(0.1, 1.09, 0, { sy: 1.5 }), 6, 5);
      break;
    }
    case "toldo": {
      // cuatro varas y una tela a franjas (sombra en el patio o en el terrado)
      for (const dx of [-0.55, 0.55]) for (const dz of [-0.4, 0.4]) m.cyl(0.025, 0.03, 1.5, C.cedroOsc, P(dx, 0.75, dz), 5);
      const telas = [C.carmesi, "#f0e2c0", C.azul, "#f0e2c0", C.carmesi];
      telas.forEach((col, k) => m.box(1.25, 0.03, 0.2, col, P(0, 1.52, -0.4 + k * 0.2)));
      break;
    }
    case "telar": {
      // el telar de dos varas con el lino a medio tejer
      for (const dx of [-0.42, 0.42]) m.box(0.06, 1.25, 0.06, C.cedroOsc, P(dx, 0.625, 0));
      m.box(0.96, 0.06, 0.07, C.cedro, P(0, 1.22, 0));
      m.box(0.96, 0.06, 0.07, C.cedro, P(0, 0.2, 0));
      for (let k = 0; k < 9; k++) m.box(0.012, 0.98, 0.012, "#efe6d2", P(-0.36 + k * 0.09, 0.71, 0.01));
      m.box(0.78, 0.36, 0.02, pick([C.azul, C.carmesi, "#e9dcc0", C.purpura]), P(0, 0.42, 0.02));
      m.box(0.22, 0.05, 0.3, "#8a6a42", P(0, 0.05, 0.25)); // la cesta del hilo
      break;
    }
    case "parra": {
      // la vid sobre su emparrado (Miqueas 4:4)
      for (const dx of [-0.5, 0.5]) m.cyl(0.035, 0.045, 1.75, C.cedroOsc, P(dx, 0.875, 0), 5);
      m.box(1.1, 0.05, 0.05, C.cedroOsc, P(0, 1.75, 0));
      for (let k = 0; k < 4; k++) m.box(0.05, 0.04, 0.8, C.cedro, P(-0.42 + k * 0.28, 1.78, 0));
      m.cyl(0.035, 0.05, 1.7, "#5d4532", P(-0.45, 0.85, 0.08, { rz: 0.08 }), 5);
      for (let k = 0; k < 7; k++) m.add(new THREE.IcosahedronGeometry(0.22, 0), vary("#5f7f3a", 0.12), P(-0.5 + k * 0.17, 1.86 + rr(-0.04, 0.06), rr(-0.25, 0.25), { sy: 0.45 }));
      for (let k = 0; k < 4; k++) {
        const gx = -0.36 + k * 0.24;
        for (let q = 0; q < 4; q++) m.sphere(0.035, "#5b2a5e", P(gx + rr(-0.03, 0.03), 1.66 - q * 0.05, 0.12 + rr(-0.03, 0.03)), 5, 4);
      }
      break;
    }
    case "higuera": {
      m.cyl(0.07, 0.11, 1.1, "#6e5a43", P(0, 0.55, 0, { rz: 0.06 }), 6);
      for (let k = 0; k < 4; k++) m.add(new THREE.IcosahedronGeometry(0.42, 0), vary("#4f6f32", 0.1), P(rr(-0.3, 0.3), 1.35 + rr(0, 0.35), rr(-0.3, 0.3), { sy: 0.78 }));
      for (let k = 0; k < 6; k++) m.sphere(0.04, "#6b3a5a", P(rr(-0.4, 0.4), 1.2 + rr(0, 0.4), rr(-0.4, 0.4)), 5, 4);
      if (s < 1) maceta(2.2);
      break;
    }
    case "palmera": {
      const t = P(0, 0, 0);
      palmTree(m, t.x, y, t.z, 0.5 * s);
      if (s < 1) maceta(2.2);
      break;
    }
  }
}

/** El letrero con el nombre de la casa: una tabla de cedro junto a la puerta (el nombre lo dice la etiqueta). */
function letreroDeCasa(m: GeoBuilder, nivel: number) {
  const [w, d] = CASA_MEDIDA[nivel];
  const x = nivel === 0 ? 0.95 : w * 0.05, z = d / 2 + (nivel === 0 ? 1.55 : 0.6);
  for (const dx of [-0.32, 0.32]) m.cyl(0.03, 0.035, 1.25, C.cedroOsc, { x: x + dx, y: 0.62, z }, 5);
  m.box(0.82, 0.36, 0.05, C.cedro, { x, y: 1.15, z });
  m.box(0.74, 0.28, 0.02, "#e8d7b0", { x, y: 1.15, z: z + 0.03 });
  for (let k = 0; k < 3; k++) m.box(0.5 - k * 0.1, 0.025, 0.01, "#5a3d26", { x, y: 1.22 - k * 0.07, z: z + 0.045 });
}

/** Parcela libre: un huerto con su muro bajo, esperando la tienda de un sacerdote nuevo. */
function parcelaLibre(m: GeoBuilder, p: Parcela) {
  rnd = mulberry32(p.area * 100 + p.n);
  const [x0, z0, x1, z1] = p.rect;
  const atras = p.dir === 1 ? z0 + 0.15 : z1 - 0.15;
  const frente = p.dir === 1 ? z1 - 0.9 : z0 + 0.9;
  const largo = Math.abs(frente - atras);
  const mz = (atras + frente) / 2;
  // muro bajo de piedras (atrás y a los lados; el frente queda abierto a la calle)
  m.box(x1 - x0 - 0.2, 0.28, 0.2, vary(C.piedraOsc, 0.06), { x: (x0 + x1) / 2, y: Y + 0.14, z: atras });
  for (const x of [x0 + 0.15, x1 - 0.15]) m.box(0.2, 0.28, largo, vary(C.piedraOsc, 0.06), { x, y: Y + 0.14, z: mz });
  if (rnd() < 0.3) {
    // un olivo joven o una higuera
    const x = (x0 + x1) / 2 + rr(-0.5, 0.5), z = mz + rr(-0.4, 0.4);
    m.cyl(0.06, 0.09, 0.9, "#6e5a43", { x, y: Y + 0.45, z }, 6);
    for (let k = 0; k < 2; k++) m.add(new THREE.IcosahedronGeometry(0.42, 0), vary(pick(["#7b8a5c", "#5f7f3a"]), 0.1), { x: x + rr(-0.2, 0.2), y: Y + 1.05 + rr(0, 0.2), z: z + rr(-0.2, 0.2), sy: 0.75 });
  } else {
    // surcos con hortalizas: el lomo de tierra removida y, en cada surco, una sola clase de mata
    const filas = 4;
    for (let k = 0; k < filas; k++) {
      const z = atras + (p.dir === 1 ? 1 : -1) * (0.55 + k * (largo - 0.8) / (filas - 1));
      m.cyl(0.17, 0.17, x1 - x0 - 0.8, vary("#7d6444", 0.05), { x: (x0 + x1) / 2, y: Y - 0.09, z, rz: Math.PI / 2 }, 8);
      const clase = Math.floor(rnd() * 3);
      for (let q = 0; q < 5; q++) hortaliza(m, x0 + 0.6 + q * ((x1 - x0 - 1.2) / 4) + rr(-0.05, 0.05), Y + 0.07, z + rr(-0.03, 0.03), clase, rr(0.8, 1.15));
    }
  }
}

/** Una hoja: un rombo fino que sale del centro (x, y, z) hacia `a`, levantado `sube` sobre el suelo. */
function hojaDeMata(m: GeoBuilder, x: number, y: number, z: number, a: number, sube: number, largo: number, ancho: number, color: THREE.ColorRepresentation) {
  const c = Math.cos(sube) * largo * 0.5;
  m.add(new THREE.OctahedronGeometry(1, 0), color, { x: x + Math.cos(a) * c, y: y + Math.sin(sube) * largo * 0.5, z: z - Math.sin(a) * c, ry: a, rz: sube, sx: largo * 0.5, sy: 0.014, sz: ancho * 0.5 });
}

/**
 * Una mata de hortaliza con sus hojas (docs/guia-visual.md, sección 7; antes eran cubos): 0 la lechuga en roseta, 1 la
 * cebolla con sus hojas derechas y 2 la calabacera con hojas anchas a ras del suelo y, a veces, su fruto.
 */
function hortaliza(m: GeoBuilder, x: number, y: number, z: number, clase: number, s: number) {
  if (clase === 0) {
    for (let k = 0; k < 6; k++) hojaDeMata(m, x, y, z, (k / 6) * Math.PI * 2 + rr(0, 0.5), rr(0.35, 0.65), rr(0.16, 0.21) * s, 0.13 * s, vary(k % 2 ? "#7fae4f" : "#94bf5c", 0.06));
    return;
  }
  if (clase === 1) {
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + rr(0, 0.8), inc = rr(0.08, 0.32), h = rr(0.2, 0.3) * s;
      m.cone(0.016 * s, h, vary("#5d8a4f", 0.08), { x: x + Math.cos(a) * Math.sin(inc) * h * 0.5, y: y + Math.cos(inc) * h * 0.5, z: z - Math.sin(a) * Math.sin(inc) * h * 0.5, ry: a, rz: -inc }, 4);
    }
    return;
  }
  for (let k = 0; k < 3; k++) hojaDeMata(m, x, y, z, (k / 3) * Math.PI * 2 + rr(0, 0.9), rr(0.1, 0.28), rr(0.22, 0.28) * s, rr(0.17, 0.21) * s, vary("#4f7f3a", 0.08));
  if (rnd() < 0.5) m.sphere(0.055 * s, "#d9a03a", { x: x + rr(-0.12, 0.12), y: y + 0.03, z: z + rr(-0.12, 0.12), sx: 1.4 }, 5, 4);
}

/** El suelo de las parcelas (un poco más oscuro que la calle) y el de las calles del barrio. */
function suelosDeArea(m: GeoBuilder, area: number) {
  const [x0, z0, x1] = AREA_RECT[area - 1];
  for (const p of PARCELAS[area - 1]) {
    const [a, b, c, d] = p.rect;
    m.box(c - a - 0.12, 0.03, d - b - 0.12, vary("#a98f62", 0.04), { x: (a + c) / 2, y: Y + 0.0, z: (b + d) / 2 });
  }
  for (const [a, b] of CALLES_DE_AREA) m.box(x1 - x0, 0.02, b - a - 0.3, vary("#c7b38a", 0.03), { x: (x0 + x1) / 2, y: Y + 0.0, z: z0 + (a + b) / 2 });
}

/**
 * Lo que el barrio gana con su nivel en la copa de los barrios (shared/barrio-juntos.ts), en sus calles: 1 lámparas
 * encendidas (de noche brillan), 2 olivos en los extremos, 3 una fuente, 4 estandartes y 5 un arco de piedra a la
 * entrada (del lado de la plaza). Solo se ven; no estorban el paso.
 */
function adornosDeBarrio(m: GeoBuilder, v: GeoBuilder, area: number, nivel: number) {
  if (nivel <= 0) return;
  const [x0, z0, x1] = AREA_RECT[area - 1];
  // la entrada desde la plaza: las áreas del oriente (1 y 2) la tienen al poniente; las otras, al oriente
  const entrada = area <= 2 ? x0 : x1;
  const haciaDentro = area <= 2 ? 1 : -1;
  CALLES_DE_AREA.forEach(([a, b], k) => {
    const za = z0 + a, zb = z0 + b, zc = (za + zb) / 2;
    // 1: lámparas a los dos lados de la calle
    for (let x = x0 + 3; x <= x1 - 3; x += 9) {
      adorno(m, v, "lampara", x, Y, za + 0.35, 0, 1.25);
      adorno(m, v, "lampara", x + 4.5, Y, zb - 0.35, Math.PI, 1.25);
    }
    // 2: olivos en los extremos de la calle (junto a las orillas: el medio queda libre)
    if (nivel >= 2) for (const x of [x0 + 1.2, x1 - 1.2]) for (const z of [za + 0.6, zb - 0.6]) oliveTree(m, x, Y, z, 0.62);
    // 3: la fuente, en medio de la segunda calle
    if (nivel >= 3 && k === 1) {
      const fx = (x0 + x1) / 2;
      m.cyl(0.95, 1.0, 0.42, vary(C.piedraClara, 0.03), { x: fx, y: Y + 0.21, z: zc }, 16);
      m.cyl(0.8, 0.8, 0.05, "#5fa7c9", { x: fx, y: Y + 0.4, z: zc }, 16);
      m.cyl(0.14, 0.18, 0.9, C.piedra, { x: fx, y: Y + 0.75, z: zc }, 10);
      m.cyl(0.38, 0.3, 0.12, C.piedraClara, { x: fx, y: Y + 1.2, z: zc }, 12);
      m.cyl(0.3, 0.3, 0.03, "#7cc0de", { x: fx, y: Y + 1.27, z: zc }, 12);
      v.sphere(0.06, "#bfe8ff", { x: fx, y: Y + 1.4, z: zc }, 6, 5);
    }
    // 4: estandartes cerca de las dos puntas de la calle (más adentro que el arco y los olivos)
    if (nivel >= 4)
      for (const x of [x0 + 2.6, x1 - 2.6])
        for (const z of [za + 0.25, zb - 0.25]) {
          m.cyl(0.045, 0.055, 2.7, C.cedroOsc, { x, y: Y + 1.35, z }, 6);
          m.box(0.6, 0.05, 0.05, C.cedroOsc, { x, y: Y + 2.62, z });
          m.box(0.55, 1.05, 0.03, k === 0 ? C.purpura : C.azul, { x, y: Y + 2.05, z });
          m.box(0.55, 0.12, 0.035, C.oro, { x, y: Y + 1.5, z });
          m.sphere(0.07, C.oro, { x, y: Y + 2.75, z }, 6, 5);
        }
    // 5: el arco de piedra sobre la primera calle, a la entrada del barrio
    if (nivel >= 5 && k === 0) {
      const x = entrada + haciaDentro * 0.45;
      for (const z of [za + 0.1, zb - 0.1]) {
        m.box(0.7, 3.3, 0.7, vary(C.piedraClara, 0.03), { x, y: Y + 1.65, z });
        m.box(0.85, 0.2, 0.85, C.piedra, { x, y: Y + 0.1, z });
      }
      m.box(0.8, 0.55, zb - za + 0.6, vary(C.piedraClara, 0.03), { x, y: Y + 3.55, z: zc });
      m.box(0.9, 0.14, zb - za + 0.8, C.piedra, { x, y: Y + 3.9, z: zc });
      m.box(0.82, 0.1, zb - za - 0.6, C.oro, { x, y: Y + 3.3, z: zc });
      v.sphere(0.07, "#ffcf7a", { x: x + haciaDentro * 0.5, y: Y + 3.1, z: za + 0.6 }, 6, 5);
      v.sphere(0.07, "#ffcf7a", { x: x + haciaDentro * 0.5, y: Y + 3.1, z: zb - 0.6 }, 6, 5);
    }
  });
}

/**
 * Las obras del barrio (shared/barrio-obras.ts) en sus calles, en lugares que no chocan con los adornos del nivel del
 * barrio (lámparas, olivos, fuente, estandartes y arco): el pozo en medio de la primera calle, los bancos y la placa a
 * la entrada, el horno y el granero al fondo, y los árboles a lo largo de la segunda calle, entre las lámparas.
 */
function obrasDelBarrio3D(m: GeoBuilder, v: GeoBuilder, area: number, obras: ReadonlySet<string>) {
  if (!obras.size) return;
  const [x0, z0, x1] = AREA_RECT[area - 1];
  const entrada = area <= 2 ? x0 : x1;
  const fondo = area <= 2 ? x1 : x0;
  const dentro = area <= 2 ? 1 : -1;
  const [c1, c2] = CALLES_DE_AREA.map(([a, b]) => ({ za: z0 + a, zb: z0 + b, zc: z0 + (a + b) / 2 }));
  const xm = (x0 + x1) / 2;
  // el pozo del barrio: brocal de piedra, dos postes, el travesaño con la polea y un techito
  if (obras.has("pozo")) {
    const x = xm, z = c1.zc;
    m.cyl(0.62, 0.66, 0.6, vary(C.piedra, 0.03), { x, y: Y + 0.3, z }, 14);
    m.cyl(0.68, 0.68, 0.08, C.piedraClara, { x, y: Y + 0.62, z }, 14);
    m.cyl(0.5, 0.5, 0.02, C.agua, { x, y: Y + 0.56, z }, 14);
    for (const s of [-1, 1]) m.box(0.1, 1.6, 0.1, C.cedroOsc, { x: x + s * 0.66, y: Y + 1.1, z });
    m.box(1.5, 0.08, 0.08, C.cedroOsc, { x, y: Y + 1.86, z });
    m.cyl(0.07, 0.07, 0.08, C.bronce, { x, y: Y + 1.78, z, rx: Math.PI / 2 }, 10);
    m.box(0.012, 0.9, 0.012, "#cdbb95", { x, y: Y + 1.3, z });
    m.cyl(0.11, 0.09, 0.18, C.bronceOsc, { x, y: Y + 0.86, z }, 10);
    for (const s of [-1, 1]) m.box(1.7, 0.05, 0.62, C.cedro, { x, y: Y + 2.06, z: z + s * 0.27, rx: s * 0.42 });
  }
  // los bancos de los ancianos: a la entrada, a los dos lados de la primera calle (Rut 4:2)
  if (obras.has("bancos")) {
    for (const z of [c1.za + 0.55, c1.zb - 0.55]) {
      const x = entrada + dentro * 5.5;
      m.box(1.5, 0.12, 0.42, vary(C.piedraClara, 0.04), { x, y: Y + 0.46, z });
      for (const dx of [-0.55, 0.55]) m.box(0.22, 0.4, 0.34, vary(C.piedra, 0.05), { x: x + dx, y: Y + 0.2, z });
    }
  }
  // el horno del barrio: un horno grande de barro al fondo de la segunda calle, con sus brasas de noche
  if (obras.has("horno")) {
    const x = fondo - dentro * 2.2, z = c2.zc, r = 0.72;
    m.sphere(r, vary("#a86a42", 0.04), { x, y: Y + 0.05, z, sy: 1.05 }, 12, 6, Math.PI * 2, Math.PI / 2);
    m.cyl(r + 0.05, r + 0.08, 0.12, "#8a5a3a", { x, y: Y + 0.06, z }, 12);
    m.box(0.42, 0.34, 0.1, "#2e2418", { x: x - dentro * (r - 0.05), y: Y + 0.22, z, ry: Math.PI / 2 });
    v.box(0.3, 0.16, 0.04, "#ff9a3a", { x: x - dentro * (r + 0.01), y: Y + 0.18, z, ry: Math.PI / 2 });
    m.cyl(0.08, 0.1, 0.3, "#8a5a3a", { x: x + dentro * 0.1, y: Y + r + 0.15, z }, 8);
    for (let k = 0; k < 5; k++) m.cyl(0.05, 0.05, 0.6, k % 2 ? "#7a5634" : "#8f6a42", { x: x + dentro * (r + 0.35), y: Y + 0.06 + (k > 2 ? 0.1 : 0), z: z - 0.2 + (k % 3) * 0.16, rx: Math.PI / 2 }, 6);
  }
  // los árboles de la calle: a lo largo de la segunda calle, entre las lámparas (Salmos 1:3)
  if (obras.has("arboles")) {
    const arbol = (x: number, z: number) => {
      m.cyl(0.09, 0.13, 1.2, "#6e5a43", { x, y: Y + 0.6, z }, 6);
      for (let k = 0; k < 3; k++) m.add(new THREE.IcosahedronGeometry(0.5, 0), vary("#4f7a37", 0.1), { x: x + rr(-0.25, 0.25), y: Y + 1.45 + rr(0, 0.3), z: z + rr(-0.2, 0.2), sy: 0.8 });
      for (let k = 0; k < 4; k++) m.sphere(0.06, "#b3242f", { x: x + rr(-0.4, 0.4), y: Y + 1.3 + rr(0, 0.4), z: z + rr(-0.3, 0.3) }, 5, 4);
    };
    for (const dx of [7.5, 16.5, 25.5]) arbol(x0 + dx, c2.za + 0.55);
    for (const dx of [12, 21, 30]) arbol(x0 + dx, c2.zb - 0.55);
  }
  // el granero del barrio: redondo, de piedra, con techo de cono, al fondo de la primera calle (Hechos 2:44)
  if (obras.has("granero")) {
    const x = fondo - dentro * 2.2, z = c1.zc;
    m.cyl(0.85, 0.9, 1.7, vary(C.piedra, 0.03), { x, y: Y + 0.85, z }, 14);
    for (let k = 1; k < 4; k++) m.cyl(0.91, 0.91, 0.03, vary(C.junta, 0.04), { x, y: Y + k * 0.42, z }, 14);
    m.cone(1.05, 0.9, "#9a7a4a", { x, y: Y + 2.15, z }, 14);
    m.box(0.5, 0.8, 0.08, C.cedro, { x: x - dentro * 0.86, y: Y + 0.4, z, ry: Math.PI / 2 });
    for (const dz of [-0.55, 0.55]) m.sphere(0.2, "#d8c27a", { x: x - dentro * 1.15, y: Y + 0.16, z: z + dz, sx: 1.2, sy: 0.75 }, 7, 5);
  }
  // la placa de los constructores: una piedra grande a la entrada, con los nombres en oro (Nehemías 3)
  if (obras.has("placa")) {
    const x = entrada + dentro * 4.2, z = c1.zb - 0.45;
    m.box(1.15, 0.2, 0.42, C.piedraOsc, { x, y: Y + 0.1, z });
    m.box(1.0, 1.35, 0.26, vary(C.piedraClara, 0.03), { x, y: Y + 0.87, z });
    m.box(1.06, 0.1, 0.3, C.piedra, { x, y: Y + 1.58, z });
    for (let k = 0; k < 5; k++) m.box(0.72 - (k % 2) * 0.14, 0.035, 0.01, C.oro, { x, y: Y + 1.32 - k * 0.17, z: z - 0.135 });
  }
}

/** Las casas de un área, completas: cada parcela con su casa (o libre), las ventanas de noche y los adornos del barrio. */
export function construirAreaDetalle(area: number, casas: CasaDibujo[], nivelBarrio = 0, obrasBarrio: readonly string[] = []): { grupo: THREE.Group; ventanas: THREE.Mesh | null } {
  const grupo = new THREE.Group();
  const m = new GeoBuilder();
  const v = new GeoBuilder();
  suelosDeArea(m, area);
  const porParcela = new Map(casas.map((c) => [c.parcela, c]));
  for (const p of PARCELAS[area - 1]) {
    const c = porParcela.get(p.n);
    if (!c) {
      parcelaLibre(m, p);
      continue;
    }
    const lm = new GeoBuilder(), lv = new GeoBuilder();
    const nivel = Math.max(0, Math.min(3, c.nivel));
    const obras = new Set(c.obras ?? []);
    casaLocal(lm, lv, nivel, c.personajeId * 7919 + c.nivel, obras);
    // lo que compró en el mercado: los adornos y el letrero (los ven los vecinos)
    if (c.adornos?.length) adornosDeCasa(lm, lv, nivel, c.adornos, obras);
    // la familia del pueblo tiene su cántaro junto a la puerta (en el primer lugar de adorno del suelo)
    if (c.pueblo) {
      const l = LUGARES_ADORNO[nivel].find((x) => x.alto === 0);
      if (l) adorno(lm, lv, "cantaro", l.x, 0, l.z, l.ry, 1);
    }
    if (c.letrero) letreroDeCasa(lm, nivel);
    // lo que edificó con su gozo (shared/obras.ts): va al final, para no cambiar el azar de lo de antes
    if (obras.size) obrasDeCasa(lm, lv, nivel, obras);
    const mat = new THREE.Matrix4().makeRotationY(p.dir === 1 ? 0 : Math.PI).setPosition(p.x, Y, p.z);
    // las ovejas de su redil (shared/taller.ts) pastan en la calle: van con el suelo del barrio, no con la casa
    // (la casa se aclara cuando tapa al jugador; las ovejas no)
    if (c.ovejas) {
      const lo = new GeoBuilder();
      ovejasDeCasa(lo, c.ovejas);
      const go = lo.build();
      go.applyMatrix4(mat);
      m.raw(go);
    }
    // su huertito (shared/huerto.ts), también con el suelo del barrio: así no se aclara con la casa
    if (c.huerto?.length) {
      const lh = new GeoBuilder();
      huertitoDeCasa(lh, c.huerto);
      const gh = lh.build();
      gh.applyMatrix4(mat);
      m.raw(gh);
    }
    const g = lm.build();
    g.applyMatrix4(mat);
    // cada casa en su malla: si tapa al jugador, se aclara solo esa (mundo.ts)
    const casa = new THREE.Mesh(g, matteMat());
    casa.castShadow = true;
    casa.receiveShadow = true;
    casa.userData.ocluye = true;
    grupo.add(casa);
    if (!lv.empty) {
      const gv = lv.build();
      gv.applyMatrix4(mat);
      v.raw(gv);
    }
  }
  adornosDeBarrio(m, v, area, nivelBarrio);
  obrasDelBarrio3D(m, v, area, new Set(obrasBarrio));
  meshes(grupo, m, null, true);
  let ventanas: THREE.Mesh | null = null;
  if (!v.empty) {
    ventanas = new THREE.Mesh(v.build(), ventanaMat());
    ventanas.visible = false;
  }
  return { grupo, ventanas };
}

/** Las casas de un área de lejos: solo bultos del tamaño de cada casa. */
export function construirAreaSilueta(area: number, casas: { parcela: number; nivel: number }[]): THREE.Group {
  const grupo = new THREE.Group();
  const m = new GeoBuilder();
  suelosDeArea(m, area);
  rnd = mulberry32(area * 31);
  const porParcela = new Map(casas.map((c) => [c.parcela, c.nivel]));
  for (const p of PARCELAS[area - 1]) {
    const nivel = porParcela.get(p.n);
    if (nivel === undefined) continue;
    const [w, d, h] = CASA_MEDIDA[Math.max(0, Math.min(3, nivel))];
    if (nivel === 0) {
      m.cyl(1.25, 1.25, w, vary("#4a3d33", 0.08), { x: p.x, y: Y + 0.62, z: p.z, rx: -Math.PI / 2, rz: Math.PI / 2 }, 3);
      continue;
    }
    m.box(w, h, d, vary(nivel >= 2 ? "#cdbf9e" : "#bf9e70", 0.05), { x: p.x, y: Y + h / 2, z: p.z });
    m.box(w + 0.14, 0.4, d + 0.14, vary("#a7916c", 0.04), { x: p.x, y: Y + h + 0.1, z: p.z });
    if (nivel >= 3) m.box(1.8, 1.5, 1.9, vary("#cdbf9e", 0.05), { x: p.x - 0.6, y: Y + h + 0.9, z: p.z - p.dir * 0.7 });
  }
  meshes(grupo, m, null, false);
  return grupo;
}

/** Casas sin dueño del resto de la ciudad (siluetas sencillas). */
function buildRelleno(root: THREE.Group) {
  const m = new GeoBuilder();
  rnd = mulberry32(77);
  const pal = ["#d2bd95", "#dcc9a2", "#c7b08a", "#d9c09a", "#cdb894"];
  for (const o of rellenoDeCasas()) {
    const col = pick(pal);
    m.box(o.w, o.h, o.d, vary(col, 0.05), { x: o.x, y: Y + o.h / 2, z: o.z });
    m.box(o.w + 0.12, 0.25, o.d + 0.12, vary(col, 0.08), { x: o.x, y: Y + o.h + 0.05, z: o.z });
    if (rnd() < 0.35) m.box(rr(0.9, 1.6), 0.06, rr(0.9, 1.6), pick(["#8f3b2f", "#c99a3b", "#5d7a3a"]), { x: o.x + rr(-0.5, 0.5), y: Y + o.h + 0.2, z: o.z + rr(-0.5, 0.5) });
  }
  // casas detrás del templo, al poniente, y fuera de los muros en las laderas
  for (let i = 0; i < 90; i++) {
    const x = rr(-20, -8), z = rr(-70, 70);
    if (Math.abs(z) < 16) continue;
    const w = rr(2.4, 4), d = rr(2.4, 4), h = rr(2.2, 3.6);
    m.box(w, h, d, vary(pick(pal), 0.05), { x, y: Y + h / 2, z });
  }
  for (let i = 0; i < 70; i++) {
    const a = rr(0, Math.PI * 2), r = rr(80, 110);
    const x = 30 + Math.cos(a) * r, z = Math.sin(a) * r;
    if (x > 78 && x < 110) continue;
    if (Math.abs(z) < 75 && x > -24 && x < 80) continue;
    const w = rr(2.4, 4.2), d = rr(2.4, 4), h = rr(2.2, 3.8);
    const gy = alturaTerreno(x, z);
    m.box(w, h, d, vary(pick(pal), 0.05), { x, y: gy + h / 2 - 0.3, z });
  }
  meshes(root, m, null, false);
}

/**
 * La calle de los siervos de Dios (shared/personajes.ts): el empedrado con sus bordillos, las siete casas de piedra
 * con su patio (las de Azarías y Eliaquim con aposento alto), bancos de piedra y olivos. Devuelve las ventanas y las
 * lamparitas, que se encienden de noche.
 */
function buildCalleSiervos(root: THREE.Group): THREE.Mesh | null {
  const m = new GeoBuilder();
  const luz = new GeoBuilder();
  rnd = mulberry32(4071);
  const { x0, x1, z, ancho } = CALLE_SIERVOS;
  m.raw(tiles(x0, z - ancho / 2, x1, z + ancho / 2, 0.9, ["#d8c7a2", "#cdb994", "#e0d0ae", "#c9b48c"], Y + 0.02, 0.03, 0.06));
  for (const sg of [-1, 1]) m.box(x1 - x0, 0.1, 0.18, C.piedraOsc, { x: (x0 + x1) / 2, y: Y + 0.05, z: z + sg * (ancho / 2) });
  for (const p of PERSONAJES_CIUDAD) {
    const lm = new GeoBuilder(), lv = new GeoBuilder();
    casaLocal(lm, lv, p.casa.nivel, 9100 + Math.round(p.casa.x * 13));
    const mat = new THREE.Matrix4().makeRotationY(p.casa.dir === 1 ? 0 : Math.PI).setPosition(p.casa.x, Y, p.casa.z);
    const g = lm.build();
    g.applyMatrix4(mat);
    m.raw(g);
    if (!lv.empty) {
      const gv = lv.build();
      gv.applyMatrix4(mat);
      luz.raw(gv);
    }
  }
  rnd = mulberry32(4072);
  // bancos de piedra en los huecos del lado sur, mirando a la calle
  for (const bx of [51, 59]) {
    m.box(1.6, 0.12, 0.42, C.piedraClara, { x: bx, y: Y + 0.44, z: z + ancho / 2 + 0.35 });
    for (const dx of [-0.6, 0.6]) m.box(0.22, 0.4, 0.36, C.piedraOsc, { x: bx + dx, y: Y + 0.2, z: z + ancho / 2 + 0.35 });
  }
  // olivos en los huecos del lado norte
  for (const ox of [47, 63]) oliveTree(m, ox, Y, z - ancho / 2 - 2.2, 0.9);
  meshes(root, m, null, true);
  return luz.empty ? null : new THREE.Mesh(luz.build(), ventanaMat());
}

/** Enramadas sobre los terrados y en la plaza (Nehemías 8:16); solo se ven en la fiesta. */
export function construirEnramadas(area: number, casas: CasaDibujo[]): THREE.Group {
  const g = new THREE.Group();
  const m = new GeoBuilder();
  rnd = mulberry32(415 + area);
  const enramada = (x: number, y: number, z: number, s = 1) => {
    for (const dx of [-0.65, 0.65]) for (const dz of [-0.5, 0.5]) m.cyl(0.035, 0.045, 1.6 * s, C.cedroOsc, { x: x + dx * s, y: y + 0.8 * s, z: z + dz * s }, 5);
    m.box(1.5 * s, 0.06, 1.2 * s, C.hoja, { x, y: y + 1.62 * s, z });
    for (let k = 0; k < 6; k++) m.cone(0.12 * s, 0.5 * s, k % 2 ? "#5f8f3f" : C.hoja, { x: x - 0.65 * s + k * 0.26 * s, y: y + 1.76 * s, z: z + (k % 2 ? 0.22 : -0.22) * s, rz: k % 2 ? 1.2 : -1.2 }, 5);
  };
  const porParcela = new Map(casas.map((c) => [c.parcela, c]));
  for (const p of PARCELAS[area - 1]) {
    const c = porParcela.get(p.n);
    if (!c) continue;
    const [, , h] = CASA_MEDIDA[Math.max(0, Math.min(3, c.nivel))];
    if (c.nivel === 0) enramada(p.x + 0.9, Y, p.z + p.dir * 2.0, 0.8);
    else enramada(p.x + (c.nivel >= 3 ? 0.55 : 0), Y + h + 0.14, p.z + p.dir * 0.35, 0.78);
  }
  meshes(g, m, null, true);
  return g;
}

function enramadasDePlaza(): THREE.Group {
  const g = new THREE.Group();
  const m = new GeoBuilder();
  for (const [x, z] of [[46, -4], [46, 4], [52, -10.4], [64, -10.4], [68, 4], [68, -4]] as [number, number][]) {
    for (const dx of [-0.75, 0.75]) for (const dz of [-0.55, 0.55]) m.cyl(0.04, 0.05, 1.9, C.cedroOsc, { x: x + dx, y: Y + 0.95, z: z + dz }, 5);
    m.box(1.75, 0.07, 1.35, C.hoja, { x, y: Y + 1.93, z });
    for (let k = 0; k < 7; k++) m.cone(0.13, 0.55, k % 2 ? "#5f8f3f" : C.hoja, { x: x - 0.8 + k * 0.27, y: Y + 2.08, z: z + (k % 2 ? 0.25 : -0.25), rz: k % 2 ? 1.2 : -1.2 }, 5);
  }
  meshes(g, m, null, true);
  return g;
}

// ---------------------------------------------------------------- todo junto
export function buildCiudad(): CiudadVisual {
  rnd = mulberry32(2026);
  const root = new THREE.Group();
  const fuegos: THREE.Vector3[] = [];
  buildTerreno(root);
  buildMonte(root);
  const puerta = new THREE.Group();
  puerta.name = "puerta";
  root.add(puerta);
  buildMurallas(root, puerta, fuegos);
  buildPlaza(root, fuegos);
  // cada edificio grande en su grupo: si tapa al jugador, se vuelve transparente (mundo.ts)
  const palacio = new THREE.Group();
  palacio.name = "palacio";
  const escuela = new THREE.Group();
  escuela.name = "escuela";
  const camara = new THREE.Group();
  camara.name = "camara";
  const sabiduria = new THREE.Group();
  sabiduria.name = "sabiduria";
  root.add(palacio, escuela, camara, sabiduria);
  buildPalacio(palacio, fuegos);
  buildEscuela(escuela);
  buildCamara(camara, fuegos);
  buildSabiduria(sabiduria, fuegos);
  buildRelleno(root);
  const ventanasSiervos = buildCalleSiervos(root);
  if (ventanasSiervos) {
    ventanasSiervos.visible = false;
    root.add(ventanasSiervos);
  }
  const cielo = buildCielo();
  root.add(cielo.sky, cielo.stars, cielo.clouds);
  const areas = AREA_RECT.map(() => {
    const g = new THREE.Group();
    root.add(g);
    return g;
  });
  const ventanas = new THREE.Group();
  root.add(ventanas);
  const enramadas = new THREE.Group();
  enramadas.add(enramadasDePlaza());
  enramadas.visible = false;
  root.add(enramadas);
  return {
    root,
    ...cielo,
    areas,
    ventanas,
    ventanasSiervos,
    enramadas,
    fuegos,
    ocluyentes: [palacio, escuela, camara, sabiduria, puerta],
    humo: new THREE.Vector3(3.0, 1.8, 0),
    letreros: {
      templo: new THREE.Vector3(ESCALINATA.x0 + 0.6, 1.6, 0),
      palacio: new THREE.Vector3(17, Y + 9.6, 28),
      escuela: new THREE.Vector3(17, Y + 5.2, -28),
      camara: new THREE.Vector3((CAMARA[0] + CAMARA[2]) / 2 + 1, Y + 4.6, (CAMARA[1] + CAMARA[3]) / 2),
      sabiduria: new THREE.Vector3(SABIDURIA[2] + 0.8, Y + 5.9, (SABIDURIA[1] + SABIDURIA[3]) / 2),
      puerta: new THREE.Vector3(MURO_ORIENTE, Y + 9.0, 0),
      plaza: new THREE.Vector3(PULPITO[0], Y + 3.2, PULPITO[1]),
    },
  };
}

/** Libera las mallas de un grupo (al cambiar las casas de un área o al salir). */
export function liberar(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | undefined;
    if (mat && !Array.isArray(mat) && mat !== matteMat() && mat !== shinyMat() && mat !== glowMat) mat.dispose();
  });
}
