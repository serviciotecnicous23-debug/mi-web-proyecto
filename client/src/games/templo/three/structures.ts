/**
 * El escenario: el monte del templo, los atrios, la casa de Jehová y cada lugar de servicio.
 * Cada lugar tiene dos versiones: abandonado (como lo dejó el rey Acaz, 2 Crónicas 29:6-7)
 * y restaurado. Todo se dibuja con figuras simples pintadas por vértice y unidas en pocas mallas.
 */
import * as THREE from "three";
import { C, GeoBuilder, conOndas, matteMat, shinyMat } from "./builder";
import { CHOIR_FLOOR, COURT, GATE, LAVERS, OUTER, OUTER_GATE, POS, TEMPLE as T } from "../layout";
import type { StationId } from "../data";

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
let rnd = mulberry32(715);
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
const dustTone = new THREE.Color("#8a7d6a");
/** El mismo color, apagado y polvoriento (para lo abandonado). */
function dusty(hex: string, k = 0.55): THREE.Color {
  return new THREE.Color(hex).lerp(dustTone, k);
}

const fadeMatte = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true });
const fadeShiny = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 70, specular: new THREE.Color("#7a5a20"), transparent: true });
export const fadeMaterials = [fadeMatte, fadeShiny];

type MeshOpts = { cast?: boolean; receive?: boolean; fade?: boolean };
function addMeshes(parent: THREE.Object3D, m: GeoBuilder | null, s?: GeoBuilder | null, o: MeshOpts = {}): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  const mk = (b: GeoBuilder, mat: THREE.Material) => {
    const mesh = new THREE.Mesh(b.build(), mat);
    mesh.castShadow = o.cast ?? true;
    mesh.receiveShadow = o.receive ?? true;
    parent.add(mesh);
    out.push(mesh);
  };
  if (m && !m.empty) mk(m, o.fade ? fadeMatte : matteMat());
  if (s && !s.empty) mk(s, o.fade ? fadeShiny : shinyMat());
  return out;
}

/** Rampa (cuña): baja en +z, alta en -z. */
function wedge(w: number, h: number, d: number): THREE.BufferGeometry {
  const x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2;
  const A = [x0, 0, z1], B = [x1, 0, z1], Cc = [x1, 0, z0], D = [x0, 0, z0], E = [x0, h, z0], F = [x1, h, z0];
  const tris = [A, B, F, A, F, E, D, E, F, D, F, Cc, A, E, D, B, Cc, F, A, D, Cc, A, Cc, B];
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(tris.flat(), 3));
  g.computeVertexNormals();
  return g;
}

/**
 * El enlosado (docs/guia-visual.md, sección 7): losas de piedra en hileras trabadas, de largos distintos (no una
 * cuadrícula de baño), cada una con su bisel (los bordes agarran la luz), su tono, una inclinación apenas distinta (con el
 * sol bajo cada losa brilla distinto) y la junta más sucia. `tono(x, z)` oscurece o aclara cada punto: la sombra junto a
 * los muros y el desgaste del camino. Las hileras van a lo largo del lado más largo.
 */
export function tiles(
  minX: number, minZ: number, maxX: number, maxZ: number, size: number, palette: string[], y: number, gap: number, jitter: number,
  tono?: (x: number, z: number) => number,
) {
  // el azar compartido avanza como antes, así lo que se arma después queda igual; las losas tienen su propio azar
  const nx = Math.max(1, Math.round((maxX - minX) / size));
  const nz = Math.max(1, Math.round((maxZ - minZ) / size));
  for (let i = 0; i < nx * nz * 2; i++) rnd();
  const az = mulberry32((Math.round(minX * 131 + minZ * 977 + maxX * 37 + maxZ * 613 + size * 1009 + y * 7919) | 0) + 1);
  const porX = maxX - minX >= maxZ - minZ;
  const [u0, u1, v0, v1] = porX ? [minX, maxX, minZ, maxZ] : [minZ, maxZ, minX, maxX];
  const pos: number[] = [], nor: number[] = [], col: number[] = [];
  const c = new THREE.Color();
  const alto = y + 0.01, bajo = y - 0.016;
  const bisel = Math.min(0.055, size * 0.05);
  // un punto (u, alto, v) en el mundo
  const P = (u: number, h: number, v: number) => (porX ? [u, h, v] : [v, h, u]);
  const cara = (pts: number[][], n: number[] | null, cols: number[]) => {
    const [a, b, cc, d] = pts;
    // la normal de la cara (o la que se le da) y el orden para que mire hacia arriba
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [cc[0] - a[0], cc[1] - a[1], cc[2] - a[2]];
    let fn = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    const orden = fn[1] < 0 ? [0, 3, 2, 0, 2, 1] : [0, 1, 2, 0, 2, 3];
    if (fn[1] < 0) fn = fn.map((q) => -q);
    const l = Math.hypot(fn[0], fn[1], fn[2]) || 1;
    const nn = n ?? fn.map((q) => q / l);
    for (const i of orden) {
      pos.push(...[a, b, cc, d][i]);
      nor.push(...nn);
      const k = cols[i] * (tono ? tono([a, b, cc, d][i][0], [a, b, cc, d][i][2]) : 1);
      col.push(c.r * k, c.g * k, c.b * k);
    }
  };
  const losa = (ua: number, va: number, ub: number, vb: number) => {
    const xa = ua + gap, xb = ub - gap, za = va + gap, zb = vb - gap;
    if (xb - xa < bisel * 2.5 || zb - za < bisel * 2.5) return;
    c.set(palette[Math.floor(az() * palette.length)]);
    const r = az();
    // algunas losas más gastadas y otras repuestas (más claras)
    const f = (1 + (az() - 0.5) * jitter * 1.8) * (r < 0.08 ? 0.88 : r > 0.95 ? 1.06 : 1);
    const ia = xa + bisel, ib = xb - bisel, ja = za + bisel, jb = zb - bisel;
    // la cara de arriba, apenas inclinada
    const tu = (az() - 0.5) * 0.07, tv = (az() - 0.5) * 0.07;
    const tn = porX ? [tu, 1, tv] : [tv, 1, tu];
    const tl = Math.hypot(tn[0], tn[1], tn[2]);
    cara([P(ia, alto, ja), P(ib, alto, ja), P(ib, alto, jb), P(ia, alto, jb)], tn.map((q) => q / tl), [f, f, f, f]);
    // los cuatro biseles: abajo, en la junta, más oscuros
    const o = f * 0.86;
    cara([P(xa, bajo, za), P(xb, bajo, za), P(ib, alto, ja), P(ia, alto, ja)], null, [o, o, f, f]);
    cara([P(ib, alto, jb), P(ia, alto, jb), P(xa, bajo, zb), P(xb, bajo, zb)], null, [f, f, o, o]);
    cara([P(xa, bajo, za), P(ia, alto, ja), P(ia, alto, jb), P(xa, bajo, zb)], null, [o, f, f, o]);
    cara([P(ib, alto, ja), P(xb, bajo, za), P(xb, bajo, zb), P(ib, alto, jb)], null, [f, o, o, f]);
  };
  // las hileras (de ancho apenas distinto) y en cada una losas de largo distinto: las juntas no se alinean
  let v = v0;
  while (v < v1 - 1e-6) {
    let w = size * (0.8 + az() * 0.4);
    if (v1 - (v + w) < size * 0.45) w = v1 - v;
    let u = u0;
    let primera = true;
    while (u < u1 - 1e-6) {
      let l = size * (primera ? 0.45 + az() * 1.3 : 0.95 + az() * 1.05);
      primera = false;
      if (u1 - (u + l) < size * 0.5) l = u1 - u;
      losa(u, v, u + l, v + w);
      u += l;
    }
    v += w;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  return g;
}

/**
 * Un piso liso (la tierra apisonada, el yeso del terrado) con su tono: la cara de arriba en cuadritos de `paso`, con
 * manchas suaves (la tierra pisada nunca es pareja) y la sombra junto a los muros que da `tono(x, z)`.
 */
export function pisoConTono(minX: number, minZ: number, maxX: number, maxZ: number, color: string, y: number, paso: number, tono?: (x: number, z: number) => number) {
  const nx = Math.max(1, Math.round((maxX - minX) / paso)), nz = Math.max(1, Math.round((maxZ - minZ) / paso));
  const sx = (maxX - minX) / nx, sz = (maxZ - minZ) / nz;
  const pos: number[] = [], nor: number[] = [], col: number[] = [];
  const c = new THREE.Color(color);
  // las manchas: dos ondas cruzadas (sin azar, así no cambia lo que se arma después)
  const k = (x: number, z: number) => (1 + Math.sin(x * 2.3 + z * 1.1) * 0.025 + Math.sin(x * 0.9 - z * 3.1 + 1.7) * 0.02) * (tono ? tono(x, z) : 1);
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < nz; j++) {
      const x0 = minX + i * sx, x1 = x0 + sx, z0 = minZ + j * sz, z1 = z0 + sz;
      for (const [x, z] of [[x0, z0], [x0, z1], [x1, z1], [x0, z0], [x1, z1], [x1, z0]]) {
        pos.push(x, y, z);
        nor.push(0, 1, 0);
        const f = k(x, z);
        col.push(c.r * f, c.g * f, c.b * f);
      }
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  return g;
}

export type Course = { h: number; color: string; len: number; inset?: number };
/** Muro de sillares: hileras de bloques con juntas alternadas. Corre a lo largo de x o de z. */
export function blockWall(b: GeoBuilder, axis: "x" | "z", from: number, to: number, at: number, thick: number, courses: Course[], y0 = 0) {
  const L = to - from;
  let y = y0;
  courses.forEach((c, ci) => {
    const nBlocks = Math.max(1, Math.round(L / c.len));
    const bl = L / nBlocks;
    const off = ci % 2 ? bl / 2 : 0;
    const th = thick - (c.inset || 0);
    let s = from;
    const cuts: number[] = [from];
    for (let i = 0; i < nBlocks; i++) {
      const e = from + off + bl * (i + 1);
      if (e < to - 0.05) cuts.push(e);
    }
    cuts.push(to);
    for (let i = 0; i < cuts.length - 1; i++) {
      s = cuts[i];
      const e = cuts[i + 1];
      const len = e - s - 0.035;
      if (len <= 0.02) continue;
      const mid = (s + e) / 2;
      const col = vary(c.color, 0.07);
      if (axis === "x") b.box(len, c.h - 0.035, th, col, { x: mid, y: y + c.h / 2, z: at });
      else b.box(th, c.h - 0.035, len, col, { x: at, y: y + c.h / 2, z: mid });
    }
    // junta (núcleo un poco más delgado)
    if (axis === "x") b.box(L, c.h, th - 0.05, C.junta, { x: (from + to) / 2, y: y + c.h / 2, z: at });
    else b.box(th - 0.05, c.h, L, C.junta, { x: at, y: y + c.h / 2, z: (from + to) / 2 });
    y += c.h;
  });
  return y;
}

/** Muro del atrio: tres hileras de piedras labradas y una de vigas de cedro (1 Reyes 6:36). */
function courtWall(b: GeoBuilder, axis: "x" | "z", from: number, to: number, at: number, thick: number, low = false) {
  const stone = low ? [0.55, 0.55] : [0.78, 0.78, 0.78];
  const courses: Course[] = stone.map((h, i) => ({ h, color: i === 0 ? C.piedraOsc : C.piedra, len: 1.5 }));
  courses.push({ h: 0.3, color: C.cedro, len: 3.2, inset: 0.06 });
  const top = blockWall(b, axis, from, to, at, thick, courses);
  // remate
  if (axis === "x") b.box(to - from, 0.1, thick + 0.08, C.piedraClara, { x: (from + to) / 2, y: top + 0.05, z: at });
  else b.box(thick + 0.08, 0.1, to - from, C.piedraClara, { x: at, y: top + 0.05, z: (from + to) / 2 });
  return top + 0.1;
}

/** Escombros: piedras, tablas y polvo. */
function rubble(b: GeoBuilder, cx: number, cz: number, w: number, d: number, count: number, colors: string[] = [C.piedraOsc, C.piedra, C.tierra]) {
  for (let i = 0; i < count; i++) {
    const s = rr(0.18, 0.55);
    b.box(s * rr(0.8, 1.6), s * rr(0.4, 0.8), s * rr(0.8, 1.4), dusty(pick(colors), rr(0.2, 0.5)), {
      x: cx + rr(-w / 2, w / 2), y: s * 0.25, z: cz + rr(-d / 2, d / 2), rx: rr(-0.4, 0.4), ry: rr(0, Math.PI), rz: rr(-0.4, 0.4),
    });
  }
  // tablas rotas y polvo
  for (let i = 0; i < Math.ceil(count / 4); i++)
    b.box(rr(0.8, 1.6), 0.06, 0.18, dusty(C.cedro, 0.4), { x: cx + rr(-w / 2, w / 2), y: 0.05, z: cz + rr(-d / 2, d / 2), ry: rr(0, Math.PI), rz: rr(-0.15, 0.15) });
  b.cyl(Math.max(w, d) * 0.55, Math.max(w, d) * 0.62, 0.03, dusty(C.arena, 0.4), { x: cx, y: 0.015, z: cz }, 14);
  // maleza
  for (let i = 0; i < Math.ceil(count / 3); i++) b.cone(rr(0.08, 0.16), rr(0.18, 0.34), pick([C.hoja, C.verdeOliva]), { x: cx + rr(-w / 2, w / 2), y: 0.1, z: cz + rr(-d / 2, d / 2) }, 5);
}

/** Leño (cilindro con las puntas claras). */
function log(b: GeoBuilder, x: number, y: number, z: number, len: number, r: number, ry = 0) {
  b.cyl(r, r, len, vary(C.cedro, 0.12), { x, y, z, rz: Math.PI / 2, ry }, 7);
  const cx = Math.cos(ry), sz = -Math.sin(ry);
  b.cyl(r * 0.92, r * 0.92, 0.012, "#d2a679", { x: x + (cx * len) / 2, y, z: z + (sz * len) / 2, rz: Math.PI / 2, ry }, 7);
  b.cyl(r * 0.92, r * 0.92, 0.012, "#d2a679", { x: x - (cx * len) / 2, y, z: z - (sz * len) / 2, rz: Math.PI / 2, ry }, 7);
}

export function jar(b: GeoBuilder, x: number, y: number, z: number, s = 1, color: string = "#b8673a") {
  b.lathe(
    [[0, 0], [0.09 * s, 0], [0.15 * s, 0.08 * s], [0.17 * s, 0.2 * s], [0.13 * s, 0.32 * s], [0.07 * s, 0.38 * s], [0.08 * s, 0.42 * s], [0, 0.42 * s]],
    vary(color, 0.08),
    { x, y, z },
    10,
  );
}

// ---------------------------------------------------------------- tipos públicos
export type StationVisual = {
  built: THREE.Group;
  ruin: THREE.Group;
  anchors: Record<string, THREE.Vector3>;
  parts: Record<string, THREE.Object3D>;
};

export type SkyUniforms = {
  top: { value: THREE.Color };
  horizon: { value: THREE.Color };
  sunDir: { value: THREE.Vector3 };
  sunColor: { value: THREE.Color };
  night: { value: number };
};

export type WorldVisual = {
  root: THREE.Group;
  fadeMeshes: THREE.Mesh[];
  stations: Record<StationId, StationVisual>;
  gateDoors: THREE.Object3D[];
  holyDoors: THREE.Object3D[];
  veil: { left: THREE.Object3D; right: THREE.Object3D; tear: THREE.Mesh };
  holiest: THREE.Group;
  holiestRoof: THREE.Mesh;
  holiestLightPos: THREE.Vector3;
  water: THREE.Mesh;
  torches: THREE.Vector3[];
  sky: THREE.Mesh;
  skyUniforms: SkyUniforms;
  stars: THREE.Points;
  clouds: THREE.Group;
  heaps: THREE.Object3D[];
  ovenGlow: THREE.Mesh;
  millstone: THREE.Object3D;
  pillarLabels: { jaquin: THREE.Vector3; boaz: THREE.Vector3 };
  /** Adornos que se ganan con las jornadas (ocultos hasta entonces). */
  adornos: Record<string, THREE.Group>;
  braseros: THREE.Vector3[];
};

// ---------------------------------------------------------------- terreno y ciudad
function groundHeight(x: number, z: number): number {
  const minX = COURT.minX - COURT.wall - 0.6, maxX = OUTER.maxX + 1.4, maxZ = COURT.maxZ + COURT.wall + 0.6;
  const dx = Math.max(0, minX - x, x - maxX);
  const dz = Math.max(0, Math.abs(z) - maxZ);
  const d = Math.hypot(dx, dz);
  if (d === 0) return -3.4;
  let h = -3.2 - d * 0.1 + Math.sin(x * 0.11) * Math.cos(z * 0.13) * 0.8;
  // valle del Cedrón (al oriente) y monte de los Olivos
  h -= 7 * Math.exp(-((x - 54) ** 2) / 90);
  h += 16 * THREE.MathUtils.smoothstep(x, 60, 115);
  // la ciudad de David baja hacia el sur
  if (z > 0) h -= z * 0.03;
  return h;
}

function buildTerrain(root: THREE.Group) {
  const geo = new THREE.PlaneGeometry(320, 300, 96, 90);
  geo.rotateX(-Math.PI / 2);
  geo.translate(18, 0, 0);
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  const dry = new THREE.Color("#bba774"), grass = new THREE.Color("#7f8f4a"), olive = new THREE.Color("#6b7d45"), rock = new THREE.Color("#a89678");
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const h = groundHeight(x, z);
    p.setY(i, h);
    const n = Math.sin(x * 0.37 + z * 0.21) * 0.5 + Math.cos(x * 0.13 - z * 0.29) * 0.5;
    c.copy(dry).lerp(grass, THREE.MathUtils.clamp(0.35 + n * 0.35, 0, 1));
    if (x > 62) c.lerp(olive, 0.6);
    if (h < -9) c.lerp(rock, 0.4);
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, matteMat());
  mesh.receiveShadow = true;
  root.add(mesh);

  // muro de contención del monte (la plataforma)
  const b = new GeoBuilder();
  const minX = COURT.minX - COURT.wall - 0.5, maxX = OUTER.maxX + 1.3, maxZ = COURT.maxZ + COURT.wall + 0.5;
  const depth = 6;
  blockWall(b, "x", minX, maxX, -maxZ, 0.8, Array.from({ length: 6 }, (_, i) => ({ h: depth / 6, color: i % 2 ? C.piedraOsc : C.piedra, len: 2.2 })), -depth);
  blockWall(b, "x", minX, maxX, maxZ, 0.8, Array.from({ length: 6 }, (_, i) => ({ h: depth / 6, color: i % 2 ? C.piedraOsc : C.piedra, len: 2.2 })), -depth);
  blockWall(b, "z", -maxZ, maxZ, minX, 0.8, Array.from({ length: 6 }, (_, i) => ({ h: depth / 6, color: i % 2 ? C.piedraOsc : C.piedra, len: 2.2 })), -depth);
  blockWall(b, "z", -maxZ, maxZ, maxX, 0.8, Array.from({ length: 6 }, (_, i) => ({ h: depth / 6, color: i % 2 ? C.piedraOsc : C.piedra, len: 2.2 })), -depth);
  // relleno de la plataforma entre el atrio exterior y el borde
  b.box(maxX - minX, 0.2, 2 * maxZ, C.piedraOsc, { x: (minX + maxX) / 2, y: -0.12, z: 0 });
  // escalinata de subida al monte, frente a la puerta oriental
  for (let i = 0; i < 9; i++) b.box(1.0, 0.36, 5.4 - i * 0.05, vary(C.piedra, 0.05), { x: maxX + 0.5 + i * 0.95, y: -0.18 - i * 0.36, z: 0 });
  addMeshes(root, b, null, { cast: false });

  // la ciudad: casas de techo plano en las laderas
  const city = new GeoBuilder();
  const housePal = ["#dcc9a2", "#d2bd95", "#e4d6b6", "#c7b08a", "#d9c09a"];
  const placeHouse = (x: number, z: number) => {
    const w = rr(2.2, 4.4), d = rr(2.2, 4.2), h = rr(2.2, 3.8);
    const gy = groundHeight(x, z);
    const col = pick(housePal);
    city.box(w, h, d, vary(col, 0.05), { x, y: gy + h / 2 - 0.3, z });
    city.box(w + 0.1, 0.2, 0.12, vary(col, 0.08), { x, y: gy + h - 0.2, z: z - d / 2 });
    city.box(w + 0.1, 0.2, 0.12, vary(col, 0.08), { x, y: gy + h - 0.2, z: z + d / 2 });
    city.box(0.5, 1.0, 0.04, "#4a3826", { x: x + rr(-w / 4, w / 4), y: gy + 0.2, z: z + d / 2 + 0.02 });
    if (rnd() < 0.7) city.box(0.32, 0.32, 0.04, "#3b2e22", { x: x + rr(-w / 3, w / 3), y: gy + h * 0.65, z: z + d / 2 + 0.02 });
    if (rnd() < 0.35) city.box(rr(0.9, 1.6), 0.08, rr(0.9, 1.6), pick(["#8f3b2f", "#c99a3b", "#5d7a3a"]), { x: x + rr(-w / 4, w / 4), y: gy + h - 0.05, z: z + rr(-d / 4, d / 4) }); // toldo o tela secándose
  };
  for (let i = 0; i < 170; i++) {
    const side = rnd();
    let x: number, z: number;
    if (side < 0.45) {
      x = rr(-58, 44);
      z = rr(20, 72);
    } else if (side < 0.75) {
      x = rr(-58, 40);
      z = -rr(20, 64);
    } else {
      x = -rr(24, 70);
      z = rr(-18, 18);
    }
    placeHouse(x, z);
  }
  addMeshes(root, city, null, { cast: false });

  // árboles: olivos en el monte de los Olivos y palmeras en la ciudad
  const trees = new GeoBuilder();
  for (let i = 0; i < 150; i++) {
    const x = rr(64, 120), z = rr(-70, 70);
    oliveTree(trees, x, groundHeight(x, z), z, rr(0.9, 1.4));
  }
  for (let i = 0; i < 40; i++) {
    const x = rr(-55, 45), z = (rnd() < 0.5 ? 1 : -1) * rr(18, 60);
    if (rnd() < 0.5) palmTree(trees, x, groundHeight(x, z), z, rr(0.8, 1.2));
    else oliveTree(trees, x, groundHeight(x, z), z, rr(0.8, 1.2));
  }
  addMeshes(root, trees, null, { cast: false });

  // montañas lejanas
  const hills = new GeoBuilder();
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + rr(-0.1, 0.1);
    const r = rr(170, 210);
    hills.add(new THREE.IcosahedronGeometry(1, 1), vary("#8f9467", 0.1), { x: Math.cos(a) * r + 20, y: -12, z: Math.sin(a) * r, sx: rr(30, 55), sy: rr(14, 30), sz: rr(25, 45) });
  }
  addMeshes(root, hills, null, { cast: false, receive: false });
}

export function oliveTree(b: GeoBuilder, x: number, y: number, z: number, s: number) {
  b.cyl(0.1 * s, 0.18 * s, 1.1 * s, "#6e5a43", { x, y: y + 0.55 * s, z, rz: rr(-0.15, 0.15) }, 6);
  for (let k = 0; k < 3; k++)
    b.add(new THREE.IcosahedronGeometry(0.55 * s, 0), vary("#7b8a5c", 0.1), { x: x + rr(-0.4, 0.4) * s, y: y + (1.2 + rr(0, 0.4)) * s, z: z + rr(-0.4, 0.4) * s, sy: 0.7 });
}

export function palmTree(b: GeoBuilder, x: number, y: number, z: number, s: number) {
  const lean = rr(-0.18, 0.18);
  for (let k = 0; k < 6; k++) b.cyl(0.11 * s, 0.13 * s, 0.6 * s, k % 2 ? "#8a6d4a" : "#7a5f3f", { x: x + lean * k * 0.6 * s, y: y + (0.3 + k * 0.58) * s, z, rz: -lean }, 7);
  const tx = x + lean * 6 * 0.6 * s, ty = y + 3.6 * s;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    b.box(1.4 * s, 0.04, 0.28 * s, vary(C.hoja, 0.12), { x: tx + Math.cos(a) * 0.6 * s, y: ty - 0.15 * s, z: z + Math.sin(a) * 0.6 * s, ry: -a, rz: -0.45 });
  }
  b.sphere(0.16 * s, "#6b4a2b", { x: tx, y: ty, z }, 6, 4);
}

// ---------------------------------------------------------------- atrios, muros y puertas
/** Cuánto oscurece un muro el piso a esta distancia (la sombra de rincón, docs/guia-visual.md, sección 3). */
function sombraDeMuro(d: number, alcance = 1.1, fuerza = 0.26) {
  if (d >= alcance) return 1;
  const s = 1 - Math.max(0, d) / alcance;
  return 1 - fuerza * s * s;
}

/** La distancia de un punto a un rectángulo (cero adentro). */
function aRect(x: number, z: number, x0: number, z0: number, x1: number, z1: number) {
  return Math.hypot(Math.max(0, x0 - x, x - x1), Math.max(0, z0 - z, z - z1));
}

/**
 * El tono del piso de los atrios: la sombra junto a los muros (no en las puertas) y junto a la casa de Jehová, y el
 * camino gastado de la puerta del gran atrio hasta las gradas del pórtico y alrededor del altar (la piedra pisada se
 * pule y se aclara).
 */
function tonoAtrios(x: number, z: number): number {
  let k = 1;
  if (x <= COURT.maxX) {
    const lados = [x - COURT.minX, z - COURT.minZ, COURT.maxZ - z];
    if (Math.abs(z) > GATE.halfWidth) lados.push(COURT.maxX - x);
    k *= sombraDeMuro(Math.min(...lados));
    k *= sombraDeMuro(aRect(x, z, T.backX - T.wall - 0.4, -(T.halfW + T.wall + T.annex) - 0.1, T.porchX, T.halfW + T.wall + T.annex + 0.1), 0.9, 0.22);
  } else if (x >= OUTER.minX) {
    const lados = [z - OUTER.minZ, OUTER.maxZ - z];
    if (Math.abs(z) > GATE.halfWidth) lados.push(x - OUTER.minX);
    if (Math.abs(z) > OUTER_GATE.halfWidth) lados.push(OUTER.maxX - x);
    k *= sombraDeMuro(Math.min(...lados));
  } else k *= sombraDeMuro(GATE.halfWidth - Math.abs(z), 0.8, 0.2);
  // el camino gastado
  const camino = x > T.stepsX ? 1 - THREE.MathUtils.smoothstep(Math.abs(z), 1.2, 2.2) : 0;
  const altar = 1 - THREE.MathUtils.smoothstep(Math.hypot(x - POS.altar[0], z - POS.altar[1]), 3, 4.6);
  return k * (1 + 0.055 * Math.max(camino, altar * 0.8));
}

function buildCourts(root: THREE.Group, out: Partial<WorldVisual>) {
  const m = new GeoBuilder();
  const s = new GeoBuilder();
  // pisos
  m.raw(tiles(COURT.minX, COURT.minZ, COURT.maxX, COURT.maxZ, 1.0, [C.piedra, C.piedraClara, C.piedra, "#e8dcc0"], 0.0, 0.03, 0.08, tonoAtrios));
  // la junta, con la tierra de años (más oscura que la de los muros)
  m.box(COURT.maxX - COURT.minX, 0.06, COURT.maxZ - COURT.minZ, "#a89167", { x: 0, y: -0.035, z: 0 });
  m.raw(tiles(OUTER.minX, OUTER.minZ, OUTER.maxX, OUTER.maxZ, 1.4, ["#d8c69e", "#cfbb92", "#e0d0ac"], 0.0, 0.04, 0.08, tonoAtrios));
  m.box(OUTER.maxX - OUTER.minX, 0.06, OUTER.maxZ - OUTER.minZ, "#9d8765", { x: (OUTER.minX + OUTER.maxX) / 2, y: -0.035, z: 0 });
  m.raw(tiles(COURT.maxX, -GATE.halfWidth, OUTER.minX, GATE.halfWidth, 0.8, [C.piedra, C.piedraClara], 0.0, 0.03, 0.06, tonoAtrios));
  m.box(OUTER.minX - COURT.maxX, 0.06, GATE.halfWidth * 2, "#a89167", { x: (COURT.maxX + OUTER.minX) / 2, y: -0.035, z: 0 });

  // muros del atrio de los sacerdotes
  const w = COURT.wall;
  courtWall(m, "x", COURT.minX - w, COURT.maxX + w, COURT.minZ - w / 2, w);
  courtWall(m, "x", COURT.minX - w, COURT.maxX + w, COURT.maxZ + w / 2, w);
  courtWall(m, "z", COURT.minZ, COURT.maxZ, COURT.minX - w / 2, w);
  // el muro oriental es bajo (deja ver la puerta y el pueblo)
  courtWall(m, "z", COURT.minZ, -GATE.towerHalf, COURT.maxX + w / 2, w, true);
  courtWall(m, "z", GATE.towerHalf, COURT.maxZ, COURT.maxX + w / 2, w, true);
  // muros del gran atrio
  courtWall(m, "x", OUTER.minX, OUTER.maxX + 0.8, OUTER.minZ - 0.4, 0.8);
  courtWall(m, "x", OUTER.minX, OUTER.maxX + 0.8, OUTER.maxZ + 0.4, 0.8);
  courtWall(m, "z", OUTER.minZ, -OUTER_GATE.halfWidth - 1.1, OUTER.maxX + 0.4, 0.8, true);
  courtWall(m, "z", OUTER_GATE.halfWidth + 1.1, OUTER.maxZ, OUTER.maxX + 0.4, 0.8, true);

  // torres de la puerta oriental del atrio
  const towerH = 2.75;
  for (const sg of [-1, 1]) {
    const zc = sg * (GATE.halfWidth + GATE.towerHalf) / 2;
    const zl = GATE.towerHalf - GATE.halfWidth;
    blockWall(m, "z", zc - zl / 2, zc + zl / 2, (GATE.towerMinX + GATE.towerMaxX) / 2, GATE.towerMaxX - GATE.towerMinX,
      Array.from({ length: 5 }, (_, i) => ({ h: (towerH - 0.4) / 5, color: i === 0 ? C.piedraOsc : C.piedra, len: 1.2 })));
    m.box(GATE.towerMaxX - GATE.towerMinX + 0.2, 0.35, zl + 0.2, C.cedro, { x: (GATE.towerMinX + GATE.towerMaxX) / 2, y: towerH - 0.2, z: zc });
    for (const dx of [-0.75, 0.75]) for (const dz of [-0.45, 0.45]) m.box(0.26, 0.24, 0.26, C.piedraClara, { x: (GATE.towerMinX + GATE.towerMaxX) / 2 + dx, y: towerH + 0.12, z: zc + dz });
    // remate de piedra con un filo de oro
    m.box(GATE.towerMaxX - GATE.towerMinX + 0.16, 0.08, zl + 0.16, C.piedraClara, { x: (GATE.towerMinX + GATE.towerMaxX) / 2, y: towerH + 0.04, z: zc });
    s.box(GATE.towerMaxX - GATE.towerMinX + 0.2, 0.04, 0.05, C.oro, { x: (GATE.towerMinX + GATE.towerMaxX) / 2, y: towerH - 0.06, z: zc + (zl / 2 + 0.09) });
    s.box(GATE.towerMaxX - GATE.towerMinX + 0.2, 0.04, 0.05, C.oro, { x: (GATE.towerMinX + GATE.towerMaxX) / 2, y: towerH - 0.06, z: zc - (zl / 2 + 0.09) });
  }
  // puerta del gran atrio (al oriente)
  for (const sg of [-1, 1]) {
    const zc = sg * (OUTER_GATE.halfWidth + 0.55);
    blockWall(m, "z", zc - 0.55, zc + 0.55, OUTER.maxX + 0.4, 1.2, Array.from({ length: 4 }, () => ({ h: 0.9, color: C.piedra, len: 1.1 })));
    m.box(1.4, 0.3, 1.4, C.cedro, { x: OUTER.maxX + 0.4, y: 3.75, z: zc });
  }

  // pórticos (columnas) en el gran atrio, al norte y al sur
  for (const sg of [-1, 1]) {
    const zc = sg * (OUTER.maxZ - 0.95);
    for (let x = OUTER.minX + 1.4; x < OUTER.maxX - 0.6; x += 2.4) {
      m.cyl(0.2, 0.24, 3.6, vary(C.piedraClara, 0.04), { x, y: 1.8, z: zc }, 10);
      m.box(0.6, 0.18, 0.6, C.piedraOsc, { x, y: 0.09, z: zc });
      m.box(0.56, 0.16, 0.56, C.piedraClara, { x, y: 3.66, z: zc });
    }
    m.box(OUTER.maxX - OUTER.minX - 0.4, 0.26, 2.1, C.cedro, { x: (OUTER.minX + OUTER.maxX) / 2, y: 3.86, z: sg * (OUTER.maxZ - 0.75) });
    m.box(OUTER.maxX - OUTER.minX - 0.4, 0.08, 2.3, C.piedraClara, { x: (OUTER.minX + OUTER.maxX) / 2, y: 4.02, z: sg * (OUTER.maxZ - 0.75) });
  }

  // fuente del gozo junto a la puerta (allí se junta la luz que deja el pueblo)
  m.cyl(0.32, 0.42, 0.7, C.piedraClara, { x: POS.gozoBasin[0], y: 0.35, z: POS.gozoBasin[1] }, 12);
  m.cyl(0.5, 0.5, 0.08, C.piedraOsc, { x: POS.gozoBasin[0], y: 0.04, z: POS.gozoBasin[1] }, 12);
  s.lathe([[0, 0], [0.3, 0.02], [0.52, 0.16], [0.6, 0.3], [0.56, 0.32], [0.45, 0.2], [0, 0.12]], C.oro, { x: POS.gozoBasin[0], y: 0.7, z: POS.gozoBasin[1] }, 18);
  // tarima de los diezmos
  m.box(1.5, 0.12, 1.2, C.cedroOsc, { x: POS.diezmoPile[0], y: 0.06, z: POS.diezmoPile[1] });
  for (let k = 0; k < 3; k++) m.box(1.5, 0.04, 0.16, C.cedro, { x: POS.diezmoPile[0], y: 0.14, z: POS.diezmoPile[1] - 0.45 + k * 0.45 });

  // lugar de las cenizas, al oriente del altar (Levítico 1:16)
  m.cyl(0.25, 0.55, 0.32, "#5b5550", { x: POS.ashes[0], y: 0.16, z: POS.ashes[1] }, 10);
  m.cyl(0.62, 0.66, 0.06, C.piedraOsc, { x: POS.ashes[0], y: 0.03, z: POS.ashes[1] }, 12);

  // los diez lavatorios sobre basas con ruedas (1 Reyes 7:27-39)
  for (const [x, z] of LAVERS) {
    s.box(0.62, 0.5, 0.62, C.bronce, { x, y: 0.47, z });
    m.box(0.66, 0.06, 0.66, C.bronceOsc, { x, y: 0.72, z });
    m.box(0.66, 0.06, 0.66, C.bronceOsc, { x, y: 0.22, z });
    for (const [dx, dz] of [[-0.33, 0], [0.33, 0], [0, -0.33], [0, 0.33]]) s.box(dx ? 0.02 : 0.3, 0.24, dz ? 0.02 : 0.3, C.oroOsc, { x: x + dx, y: 0.47, z: z + dz }); // tableros con querubines
    for (const [dx, dz] of [[-0.24, -0.32], [0.24, -0.32], [-0.24, 0.32], [0.24, 0.32]]) m.cyl(0.13, 0.13, 0.05, C.bronceOsc, { x: x + dx, y: 0.13, z: z + dz, rx: Math.PI / 2 }, 10);
    s.lathe([[0, 0], [0.18, 0.02], [0.32, 0.12], [0.36, 0.24], [0.33, 0.25], [0.2, 0.14], [0, 0.1]], C.bronce, { x, y: 0.75, z }, 14);
  }

  // antorchas (braseros) alrededor de los atrios
  const torches: THREE.Vector3[] = [];
  const torchSpots: [number, number][] = [
    [14.6, -12.2], [14.6, 12.2], [3.5, -12.3], [3.5, 12.3], [-13.6, -12.3], [-13.6, 12.3],
    [19.5, -9.6], [19.5, 9.6], [31.6, -9.6], [31.6, 9.6],
  ];
  for (const [x, z] of torchSpots) {
    m.box(0.36, 0.1, 0.36, C.piedraOsc, { x, y: 0.05, z });
    s.cyl(0.035, 0.05, 2.2, C.bronceOsc, { x, y: 1.15, z }, 6);
    s.lathe([[0, 0], [0.08, 0], [0.2, 0.12], [0.24, 0.2], [0.2, 0.2], [0, 0.1]], C.bronce, { x, y: 2.22, z }, 10);
    torches.push(new THREE.Vector3(x, 2.48, z));
  }
  out.torches = torches;

  // árboles en el gran atrio (Salmo 92:13)
  const tr = new GeoBuilder();
  palmTree(tr, 31.4, 0, -6.4, 1.05);
  palmTree(tr, 31.4, 0, 6.4, 0.95);
  oliveTree(tr, 28.6, 0, -9.3, 1.1);
  oliveTree(tr, 28.8, 0, 9.4, 1.0);
  addMeshes(root, tr, null, { cast: true });

  addMeshes(root, m, s, { cast: true });

  // hojas de la puerta del atrio (de cedro con clavos de bronce): cerradas hasta que se abren
  const doors: THREE.Object3D[] = [];
  for (const sg of [-1, 1]) {
    const piv = new THREE.Group();
    piv.position.set(GATE.towerMinX + 0.12, 0, sg * GATE.halfWidth);
    const dm = new GeoBuilder(), ds = new GeoBuilder();
    const lz = -sg * GATE.halfWidth / 2;
    dm.box(0.12, 2.5, GATE.halfWidth - 0.04, C.cedro, { x: 0, y: 1.25, z: lz });
    for (let k = 0; k < 4; k++) dm.box(0.15, 0.1, GATE.halfWidth - 0.1, C.cedroOsc, { x: 0, y: 0.4 + k * 0.6, z: lz });
    for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) ds.sphere(0.035, C.bronce, { x: 0.08, y: 0.4 + r * 0.6, z: lz + (q - 1) * 0.6 }, 5, 4);
    addMeshes(piv, dm, ds);
    root.add(piv);
    doors.push(piv);
  }
  out.gateDoors = doors;
}

// ---------------------------------------------------------------- la casa de Jehová
function buildTemple(root: THREE.Group, out: Partial<WorldVisual>) {
  const solid = new GeoBuilder(), solidS = new GeoBuilder();
  const fade = new GeoBuilder(), fadeS = new GeoBuilder();
  const F = T.floor;
  const H = T.height;
  const outerHalf = T.halfW + T.wall;
  const westX = T.backX - T.wall; // cara exterior del muro occidental
  const annexW = T.annex;
  const annexH = 4.6;

  // plataforma y gradas (sin gradas para el altar, pero sí para la casa)
  solid.box(T.porchX - (westX - annexW) + 0.1, F, 2 * (outerHalf + annexW) + 0.1, C.piedraOsc, { x: (T.porchX + westX - annexW) / 2, y: F / 2, z: 0 });
  for (let i = 0; i < 3; i++) {
    const h = (F * (i + 1)) / 3;
    const x0 = T.stepsX - ((T.stepsX - T.porchX) * i) / 3;
    solid.box((T.stepsX - T.porchX) / 3 + 0.02, h, 2 * outerHalf, vary(C.piedraClara, 0.04), { x: x0 - (T.stepsX - T.porchX) / 6, y: h / 2, z: 0 });
  }
  // piso de oro del interior (1 Reyes 6:30)
  solidS.box(T.frontX - T.backX, 0.02, 2 * T.halfW, C.oroOsc, { x: (T.frontX + T.backX) / 2, y: F + 0.01, z: 0 });
  for (let x = T.backX + 0.6; x < T.frontX; x += 1.2) solidS.box(0.03, 0.025, 2 * T.halfW, C.oro, { x, y: F + 0.015, z: 0 });
  // piso del pórtico
  solid.raw(tiles(T.frontX + T.wall, -T.halfW, T.porchX, T.halfW, 0.7, [C.piedraClara, C.piedra], F + 0.005, 0.025, 0.05));

  // muros exteriores de sillares
  const wallCourses = (n: number, total: number): Course[] => Array.from({ length: n }, (_, i) => ({ h: total / n, color: i % 3 === 2 ? C.piedraClara : C.piedra, len: 1.7 }));
  // norte (sólido) y sur (se desvanece)
  blockWall(solid, "x", westX, T.frontX + T.wall, -T.halfW - T.wall / 2, T.wall, wallCourses(8, H), F);
  blockWall(fade, "x", westX, T.frontX + T.wall, T.halfW + T.wall / 2, T.wall, wallCourses(8, H), F);
  // occidente (sólido)
  blockWall(solid, "z", -T.halfW, T.halfW, T.backX - T.wall / 2, T.wall, wallCourses(8, H), F);
  // fachada: a los lados de la puerta y encima (se desvanece)
  blockWall(fade, "z", -T.halfW, -T.doorHalf, T.frontX + T.wall / 2, T.wall, wallCourses(8, H), F);
  blockWall(fade, "z", T.doorHalf, T.halfW, T.frontX + T.wall / 2, T.wall, wallCourses(8, H), F);
  const doorH = 3.4;
  fade.box(T.wall, H - doorH, 2 * T.doorHalf, C.piedra, { x: T.frontX + T.wall / 2, y: F + doorH + (H - doorH) / 2, z: 0 });
  fadeS.box(T.wall + 0.06, 0.22, 2 * T.doorHalf + 0.5, C.oro, { x: T.frontX + T.wall / 2, y: F + doorH + 0.11, z: 0 }); // dintel
  // ventanas anchas por dentro y estrechas por fuera (1 Reyes 6:4), arriba de las cámaras
  for (let x = westX + 1.4; x < T.frontX - 0.5; x += 1.9) {
    solid.box(0.34, 0.8, 0.05, "#2e2418", { x, y: F + annexH + 1.05, z: -outerHalf - 0.02 });
    fade.box(0.34, 0.8, 0.05, "#2e2418", { x, y: F + annexH + 1.05, z: outerHalf + 0.02 });
  }
  // franjas de cedro (una hilera de vigas)
  solid.box(T.frontX + T.wall - westX, 0.22, 0.05, C.cedro, { x: (T.frontX + T.wall + westX) / 2, y: F + H - 0.6, z: -outerHalf - 0.02 });
  fade.box(T.frontX + T.wall - westX, 0.22, 0.05, C.cedro, { x: (T.frontX + T.wall + westX) / 2, y: F + H - 0.6, z: outerHalf + 0.02 });

  // cámaras laterales de tres pisos (1 Reyes 6:5-6)
  const annex = (b: GeoBuilder, axis: "x" | "z", from: number, to: number, at: number, faceSign: number) => {
    const courses: Course[] = Array.from({ length: 6 }, (_, i) => ({ h: annexH / 6, color: i % 2 ? C.piedraClara : C.piedra, len: 1.5 }));
    blockWall(b, axis, from, to, at, annexW, courses, F);
    for (let fl = 0; fl < 3; fl++) {
      const y = F + 0.75 + fl * (annexH / 3);
      for (let p = from + 0.9; p < to - 0.4; p += 1.6) {
        if (axis === "x") b.box(0.3, 0.42, 0.05, "#3a2c1e", { x: p, y, z: at + faceSign * (annexW / 2 + 0.01) });
        else b.box(0.05, 0.42, 0.3, "#3a2c1e", { x: at + faceSign * (annexW / 2 + 0.01), y, z: p });
      }
      if (fl > 0) {
        if (axis === "x") b.box(to - from, 0.08, 0.1, C.piedraClara, { x: (from + to) / 2, y: F + fl * (annexH / 3), z: at + faceSign * (annexW / 2 + 0.03) });
        else b.box(0.1, 0.08, to - from, C.piedraClara, { x: at + faceSign * (annexW / 2 + 0.03), y: F + fl * (annexH / 3), z: (from + to) / 2 });
      }
    }
    // techo con pretil
    if (axis === "x") {
      b.box(to - from, 0.14, annexW, C.cedroOsc, { x: (from + to) / 2, y: F + annexH + 0.07, z: at });
      b.box(to - from, 0.3, 0.12, C.piedraClara, { x: (from + to) / 2, y: F + annexH + 0.25, z: at + faceSign * (annexW / 2 - 0.06) });
    } else {
      b.box(annexW, 0.14, to - from, C.cedroOsc, { x: at, y: F + annexH + 0.07, z: (from + to) / 2 });
      b.box(0.12, 0.3, to - from, C.piedraClara, { x: at + faceSign * (annexW / 2 - 0.06), y: F + annexH + 0.25, z: (from + to) / 2 });
    }
  };
  annex(solid, "x", westX - annexW, T.frontX + T.wall, -outerHalf - annexW / 2, -1);
  annex(fade, "x", westX - annexW, T.frontX + T.wall, outerHalf + annexW / 2, 1);
  annex(solid, "z", -outerHalf, outerHalf, westX - annexW / 2, -1);

  // techo de cedro con pretil y cornisa dorada (se desvanece)
  fade.box(T.frontX + T.wall - westX, 0.22, 2 * outerHalf, C.cedroOsc, { x: (T.frontX + T.wall + westX) / 2, y: F + H + 0.11, z: 0 });
  for (let x = westX + 0.5; x < T.frontX + T.wall; x += 1.1) fade.box(0.16, 0.06, 2 * outerHalf - 0.2, C.cedro, { x, y: F + H + 0.25, z: 0 });
  fadeS.box(T.frontX + T.wall - westX + 0.1, 0.1, 0.1, C.oro, { x: (T.frontX + T.wall + westX) / 2, y: F + H, z: outerHalf + 0.05 });
  fadeS.box(T.frontX + T.wall - westX + 0.1, 0.1, 0.1, C.oro, { x: (T.frontX + T.wall + westX) / 2, y: F + H, z: -outerHalf - 0.05 });
  fade.box(T.frontX + T.wall - westX, 0.36, 0.14, C.piedraClara, { x: (T.frontX + T.wall + westX) / 2, y: F + H + 0.4, z: outerHalf - 0.07 });
  fade.box(T.frontX + T.wall - westX, 0.36, 0.14, C.piedraClara, { x: (T.frontX + T.wall + westX) / 2, y: F + H + 0.4, z: -outerHalf + 0.07 });

  // interior cubierto de oro con querubines, palmeras y botones de flores (1 Reyes 6:29)
  const carve = (b: GeoBuilder, axis: "x" | "z", from: number, to: number, at: number, faceSign: number) => {
    const len = to - from;
    if (axis === "x") b.box(len, H - 0.1, 0.03, C.oro, { x: (from + to) / 2, y: F + H / 2, z: at + faceSign * 0.016 });
    else b.box(0.03, H - 0.1, len, C.oro, { x: at + faceSign * 0.016, y: F + H / 2, z: (from + to) / 2 });
    let k = 0;
    for (let p = from + 0.45; p < to - 0.3; p += 0.75, k++) {
      for (const [row, y] of [[0, F + 1.3], [1, F + 3.5]] as [number, number][]) {
        // pieza en el plano de la pared (rot: giro dentro de ese plano)
        const put = (dx: number, dy: number, w: number, h: number, rot = 0) => {
          if (axis === "x") b.box(w, h, 0.03, C.oroOsc, { x: p + dx, y: y + dy, z: at + faceSign * 0.045, rz: rot });
          else b.box(0.03, h, w, C.oroOsc, { x: at + faceSign * 0.045, y: y + dy, z: p + dx, rx: -rot });
        };
        const motif = (k + row) % 3;
        if (motif === 0) {
          // palmera: tronco y abanico de hojas
          put(0, -0.05, 0.05, 0.8);
          for (const a of [-1.15, -0.6, 0, 0.6, 1.15]) put(Math.sin(a) * 0.13, 0.42 + Math.cos(a) * 0.12, 0.035, 0.3, -a);
        } else if (motif === 1) {
          // querubín con las alas hacia arriba
          put(0, 0.02, 0.12, 0.3);
          put(0, 0.26, 0.1, 0.1, 0.785);
          put(-0.15, 0.18, 0.05, 0.38, 0.72);
          put(0.15, 0.18, 0.05, 0.38, -0.72);
        } else {
          // flor abierta
          put(0, 0, 0.1, 0.1, 0.785);
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            put(Math.cos(a) * 0.13, Math.sin(a) * 0.13, 0.06, 0.09, a + Math.PI / 2);
          }
        }
      }
    }
  };
  carve(solidS, "x", T.backX, T.frontX, -T.halfW, 1);
  carve(fadeS, "x", T.backX, T.frontX, T.halfW, -1);
  carve(solidS, "z", -T.halfW, T.halfW, T.backX, 1);
  // cara interior de la fachada
  fadeS.box(0.03, H - 0.1, 2 * T.halfW, C.oro, { x: T.frontX - 0.016, y: F + H / 2, z: 0 });
  // vigas del techo vistas desde adentro (con el techo)
  for (let x = T.backX + 0.5; x < T.frontX; x += 1.0) fade.box(0.18, 0.2, 2 * T.halfW, C.cedro, { x, y: F + H - 0.1, z: 0 });

  // pórtico: paredes laterales altas, dintel y techo (todo se desvanece cuando entras)
  const porchTop = 8.4;
  const porchLen = T.porchX - (T.frontX + T.wall);
  for (const sg of [-1, 1]) {
    blockWall(fade, "x", T.frontX + T.wall, T.porchX, sg * (T.halfW + T.wall / 2 - 0.08), T.wall + 0.16, wallCourses(10, porchTop - F), F);
    fadeS.box(porchLen + 0.06, 0.12, 0.08, C.oro, { x: (T.frontX + T.wall + T.porchX) / 2, y: porchTop - 0.5, z: sg * (outerHalf + 0.01) });
  }
  fade.box(0.45, porchTop - 6.2, 2 * outerHalf, C.piedra, { x: T.porchX - 0.22, y: (porchTop + 6.2) / 2, z: 0 }); // dintel del pórtico
  fadeS.box(0.06, 0.18, 2 * outerHalf, C.oro, { x: T.porchX + 0.02, y: 6.3, z: 0 });
  for (let k = 0; k < 9; k++) fadeS.sphere(0.07, C.carmesi, { x: T.porchX + 0.03, y: 6.75, z: -outerHalf + 0.5 + k * ((2 * outerHalf - 1) / 8) }, 6, 5); // granadas en la cadena
  fadeS.box(0.05, 0.05, 2 * outerHalf, C.oroOsc, { x: T.porchX + 0.03, y: 6.95, z: 0 });
  fade.box(porchLen + 0.5, 0.25, 2 * outerHalf + 0.2, C.cedroOsc, { x: (T.frontX + T.wall + T.porchX) / 2, y: porchTop + 0.12, z: 0 });
  fade.box(porchLen + 0.6, 0.35, 0.16, C.piedraClara, { x: (T.frontX + T.wall + T.porchX) / 2, y: porchTop + 0.42, z: outerHalf + 0.05 });
  fade.box(porchLen + 0.6, 0.35, 0.16, C.piedraClara, { x: (T.frontX + T.wall + T.porchX) / 2, y: porchTop + 0.42, z: -outerHalf - 0.05 });
  fade.box(0.16, 0.35, 2 * outerHalf + 0.2, C.piedraClara, { x: T.porchX + 0.25, y: porchTop + 0.42, z: 0 });

  // Jaquín (al sur, a la derecha) y Boaz (al norte), de bronce (1 Reyes 7:15-22)
  for (const sg of [1, -1]) {
    const x = -2.95, z = sg * 2.55;
    solid.box(1.0, 0.3, 1.0, C.piedraClara, { x, y: F + 0.15, z });
    solidS.cyl(0.4, 0.42, 3.4, C.bronce, { x, y: F + 0.3 + 1.7, z }, 18);
    for (let k = 0; k < 6; k++) solidS.box(0.02, 3.3, 0.06, C.bronceOsc, { x: x + Math.cos((k / 6) * Math.PI * 2) * 0.41, y: F + 0.3 + 1.7, z: z + Math.sin((k / 6) * Math.PI * 2) * 0.41, ry: -(k / 6) * Math.PI * 2 });
    const cy = F + 3.7;
    solidS.lathe([[0.4, 0], [0.55, 0.15], [0.62, 0.45], [0.58, 0.8], [0.45, 0.95], [0, 0.95]], C.bronce, { x, y: cy, z }, 18);
    solidS.torus(0.6, 0.035, C.bronceOsc, { x, y: cy + 0.3, z, rx: Math.PI / 2 }, 6, 24); // red
    solidS.torus(0.6, 0.035, C.bronceOsc, { x, y: cy + 0.6, z, rx: Math.PI / 2 }, 6, 24);
    for (let row = 0; row < 2; row++)
      for (let k = 0; k < 14; k++) {
        const a = (k / 14) * Math.PI * 2 + row * 0.22;
        solidS.sphere(0.065, "#a3452e", { x: x + Math.cos(a) * 0.62, y: cy + 0.3 + row * 0.3, z: z + Math.sin(a) * 0.62 }, 6, 5); // granadas
      }
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      solidS.cone(0.12, 0.42, C.bronce, { x: x + Math.cos(a) * 0.32, y: cy + 1.1, z: z + Math.sin(a) * 0.32, rz: Math.cos(a) * 0.5, rx: -Math.sin(a) * 0.5 }, 6); // lirios
    }
  }
  out.pillarLabels = { jaquin: new THREE.Vector3(-2.95, F + 5.1, 2.55), boaz: new THREE.Vector3(-2.95, F + 5.1, -2.55) };

  addMeshes(root, solid, solidS, { cast: true });
  const fadeMeshes = addMeshes(root, fade, fadeS, { cast: true, fade: true });
  out.fadeMeshes = fadeMeshes;

  // puertas del Lugar Santo: de ciprés cubiertas de oro, con querubines y palmeras (1 Reyes 6:34-35)
  const doors: THREE.Object3D[] = [];
  for (const sg of [-1, 1]) {
    const piv = new THREE.Group();
    piv.position.set(T.frontX + T.wall + 0.02, F, sg * T.doorHalf);
    const dm = new GeoBuilder(), ds = new GeoBuilder();
    const lz = -sg * T.doorHalf / 2;
    ds.box(0.08, doorH, T.doorHalf - 0.03, C.oro, { x: 0, y: doorH / 2, z: lz });
    for (const y of [0.95, 2.45]) {
      // tablero enmarcado con una flor abierta (1 Reyes 6:32)
      ds.box(0.1, 0.05, 0.7, C.oroOsc, { x: 0, y: y + 0.58, z: lz });
      ds.box(0.1, 0.05, 0.7, C.oroOsc, { x: 0, y: y - 0.58, z: lz });
      ds.box(0.1, 1.16, 0.05, C.oroOsc, { x: 0, y, z: lz + 0.35 });
      ds.box(0.1, 1.16, 0.05, C.oroOsc, { x: 0, y, z: lz - 0.35 });
      ds.cyl(0.08, 0.08, 0.04, C.oroOsc, { x: 0.05, y, z: lz, rz: Math.PI / 2 }, 12);
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        ds.sphere(0.055, C.oroOsc, { x: 0.05, y: y + Math.sin(a) * 0.16, z: lz + Math.cos(a) * 0.16 }, 6, 5);
      }
    }
    dm.box(0.04, doorH - 0.1, 0.06, C.cedroOsc, { x: -0.03, y: doorH / 2, z: -sg * 0.03 });
    addMeshes(piv, dm, ds);
    root.add(piv);
    doors.push(piv);
  }
  out.holyDoors = doors;

  // el velo: azul, púrpura, carmesí y lino, con querubines (2 Crónicas 3:14)
  const veilH = H - 0.05;
  const stripe = [C.azul, C.purpura, C.carmesi, C.lino];
  const mkVeil = (sg: number) => {
    const piv = new THREE.Group();
    piv.position.set(T.veilX, F, sg * T.halfW);
    const vm = new GeoBuilder(), vs = new GeoBuilder();
    const n = 12;
    const w = T.halfW / n;
    for (let i = 0; i < n; i++) {
      const lz = -sg * (i + 0.5) * w;
      vm.box(0.06, veilH, w + 0.002, stripe[i % 4], { x: 0, y: veilH / 2, z: lz });
    }
    for (let r = 0; r < 4; r++)
      for (let q = 0; q < 3; q++) {
        const lz = -sg * (0.6 + q * 1.15);
        const y = 0.9 + r * 1.45;
        // querubín bordado: cuerpo, cabeza y alas hacia arriba
        vs.box(0.07, 0.3, 0.12, C.oro, { x: 0.01, y, z: lz });
        vs.box(0.07, 0.1, 0.1, C.oro, { x: 0.01, y: y + 0.24, z: lz, rx: 0.785 });
        vs.box(0.07, 0.38, 0.06, C.oro, { x: 0.01, y: y + 0.14, z: lz - 0.16, rx: -0.72 });
        vs.box(0.07, 0.38, 0.06, C.oro, { x: 0.01, y: y + 0.14, z: lz + 0.16, rx: 0.72 });
      }
    vs.box(0.08, 0.1, T.halfW, C.oro, { x: 0, y: veilH - 0.05, z: -sg * T.halfW / 2 });
    addMeshes(piv, vm, vs, { cast: false });
    root.add(piv);
    return piv;
  };
  const left = mkVeil(-1), right = mkVeil(1);
  const tear = new THREE.Mesh(new THREE.BoxGeometry(0.1, veilH, 0.06), new THREE.MeshBasicMaterial({ color: "#fff6d5", toneMapped: false }));
  tear.position.set(T.veilX + 0.05, F + veilH, 0);
  tear.scale.y = 0.0001;
  tear.visible = false;
  root.add(tear);
  out.veil = { left, right, tear };

  // Lugar Santísimo: el arca con el propiciatorio y los dos grandes querubines (1 Reyes 6:23-28; 8:6-8)
  const holiest = new THREE.Group();
  const hm = new GeoBuilder(), hs = new GeoBuilder();
  const [ax, az] = POS.arca;
  hs.box(0.68, 0.62, 1.12, C.oro, { x: ax, y: F + 0.31, z: az });
  hs.box(0.74, 0.06, 1.18, C.oroOsc, { x: ax, y: F + 0.65, z: az }); // propiciatorio
  for (const sg of [-1, 1]) {
    // querubines del propiciatorio, mirándose
    hs.sphere(0.09, C.oro, { x: ax, y: F + 0.88, z: az + sg * 0.38 }, 8, 6);
    hs.cone(0.12, 0.26, C.oro, { x: ax, y: F + 0.78, z: az + sg * 0.38 }, 8);
    hs.box(0.5, 0.04, 0.3, C.oro, { x: ax, y: F + 0.95, z: az + sg * 0.2, rx: sg * 0.5 });
    // varas que se ven desde el Lugar Santo
    hs.cyl(0.03, 0.03, 2.4, C.oroOsc, { x: ax + 0.6, y: F + 0.3, z: az + sg * 0.42, rz: Math.PI / 2 }, 6);
    // grandes querubines de olivo cubiertos de oro, de cara a la casa
    const cz = sg * 1.9;
    hs.lathe([[0, 0], [0.42, 0], [0.36, 0.8], [0.26, 1.7], [0.18, 2.1], [0, 2.15]], C.oro, { x: ax, y: F, z: cz }, 14);
    hs.sphere(0.22, C.oro, { x: ax, y: F + 2.35, z: cz }, 10, 8);
    hs.box(0.12, 0.08, 1.95, C.oro, { x: ax, y: F + 2.55, z: cz - sg * 0.95, rx: sg * 0.18 }); // ala hacia el centro
    hs.box(0.12, 0.08, 1.95, C.oro, { x: ax, y: F + 2.55, z: cz + sg * 0.95, rx: -sg * 0.18 }); // ala hacia la pared
    for (let k = 0; k < 5; k++) {
      hs.box(0.1, 0.06, 0.4, C.oroOsc, { x: ax, y: F + 2.42 - k * 0.04, z: cz - sg * (0.3 + k * 0.33) });
      hs.box(0.1, 0.06, 0.4, C.oroOsc, { x: ax, y: F + 2.42 - k * 0.04, z: cz + sg * (0.3 + k * 0.33) });
    }
  }
  hm.box(0.02, 0.02, 0.02, C.oro, { x: ax, y: F, z: az });
  addMeshes(holiest, hm, hs, { cast: false });
  holiest.visible = false;
  root.add(holiest);
  const hr = new GeoBuilder();
  hr.box(T.veilX - T.backX + 0.02, 0.2, 2 * T.halfW + 0.02, C.cedroOsc, { x: (T.veilX + T.backX) / 2, y: F + 4.6, z: 0 });
  for (let x = T.backX + 0.4; x < T.veilX; x += 0.7) hr.box(0.12, 0.06, 2 * T.halfW, C.oroOsc, { x, y: F + 4.73, z: 0 });
  hr.box(0.24, H - 4.6, 2 * T.halfW, C.piedra, { x: T.veilX - 0.12, y: F + 4.6 + (H - 4.6) / 2, z: 0 });
  const holiestRoof = new THREE.Mesh(hr.build(), fadeMatte.clone());
  holiestRoof.castShadow = true;
  holiestRoof.receiveShadow = true;
  root.add(holiestRoof);
  out.holiestRoof = holiestRoof;
  out.holiest = holiest;
  out.holiestLightPos = new THREE.Vector3(ax + 0.4, F + 2.2, az);
}

// ---------------------------------------------------------------- lugares de servicio
function station(): StationVisual {
  return { built: new THREE.Group(), ruin: new THREE.Group(), anchors: {}, parts: {} };
}

function buildAltar(): StationVisual {
  const st = station();
  const [x, z] = POS.altar;
  const top = 1.5;
  const m = new GeoBuilder(), s = new GeoBuilder();
  s.box(3.5, 0.28, 3.5, C.bronceOsc, { x, y: 0.14, z });
  s.box(3.2, 0.62, 3.2, C.bronce, { x, y: 0.28 + 0.31, z });
  // el enrejado de bronce a media altura (Éxodo 27:4-5)
  s.box(3.32, 0.2, 3.32, C.bronceOsc, { x, y: 0.98, z });
  for (let k = -7; k <= 7; k++) {
    s.box(0.04, 0.2, 3.36, C.bronce, { x: x + k * 0.22, y: 0.98, z });
    s.box(3.36, 0.2, 0.04, C.bronce, { x, y: 0.98, z: z + k * 0.22 });
  }
  s.box(3.2, 0.32, 3.2, C.bronce, { x, y: 1.24, z });
  s.box(3.42, 0.1, 3.42, C.oroOsc, { x, y: 1.43, z });
  // cuernos en las cuatro esquinas
  for (const dx of [-1.5, 1.5]) for (const dz of [-1.5, 1.5]) s.cone(0.16, 0.42, C.bronce, { x: x + dx, y: top + 0.18, z: z + dz, rx: dz * 0.12, rz: -dx * 0.12 }, 8);
  m.box(2.9, 0.06, 2.9, "#3a3330", { x, y: top - 0.01, z });
  // anillos y argollas
  for (const dx of [-1.62, 1.62]) s.torus(0.12, 0.025, C.bronceOsc, { x: x + dx, y: 0.7, z, ry: Math.PI / 2 }, 5, 12);
  // rampa al sur: no se sube por gradas (Éxodo 20:26)
  m.add(wedge(1.5, top, 1.75), vary(C.piedra, 0.03), { x, y: 0, z: z + 1.75 + 0.875 });
  s.box(0.06, 0.08, 2.0, C.bronceOsc, { x: x - 0.75, y: top / 2 + 0.05, z: z + 2.6, rx: 0.7 });
  s.box(0.06, 0.08, 2.0, C.bronceOsc, { x: x + 0.75, y: top / 2 + 0.05, z: z + 2.6, rx: 0.7 });
  // utensilios: calderos, palas y garfios (2 Crónicas 4:16)
  s.lathe([[0, 0], [0.16, 0], [0.22, 0.12], [0.22, 0.26], [0, 0.22]], C.bronce, { x: x + 2.2, y: 0, z: z + 1.4 }, 10);
  s.box(0.05, 0.05, 0.9, C.bronceOsc, { x: x + 2.25, y: 0.5, z: z + 1.0, rx: 1.0 });
  addMeshes(st.built, m, s);
  st.anchors.fire = new THREE.Vector3(x, top + 0.05, z);
  st.anchors.offer = new THREE.Vector3(x, top + 0.35, z);

  // abandonado: el mismo altar sucio, frío y lleno de basura (2 Crónicas 29:16)
  const r = new GeoBuilder();
  r.box(3.5, 0.28, 3.5, dusty(C.bronceOsc), { x, y: 0.14, z });
  r.box(3.2, 1.0, 3.2, dusty(C.bronce, 0.65), { x, y: 0.78, z });
  r.box(3.3, 0.12, 3.3, dusty(C.bronceOsc), { x, y: 1.3, z });
  r.cone(0.16, 0.42, dusty(C.bronce), { x: x - 1.5, y: 1.55, z: z - 1.5 }, 8);
  r.cone(0.16, 0.3, dusty(C.bronce), { x: x + 1.5, y: 1.5, z: z + 1.5, rz: 0.6 }, 8);
  r.add(wedge(1.5, top, 1.75), dusty(C.piedra, 0.4), { x, y: 0, z: z + 2.625 });
  rubble(r, x + 0.6, z - 2.4, 3.2, 1.2, 9);
  rubble(r, x + 2.4, z + 0.2, 1.2, 2.6, 6);
  addMeshes(st.ruin, r);
  return st;
}

function ox(b: GeoBuilder, x: number, z: number, face: number, color: THREE.ColorRepresentation) {
  const cx = Math.cos(face), sz = Math.sin(face);
  const ry = -face;
  b.box(0.82, 0.46, 0.42, color, { x: x - cx * 0.05, y: 0.62, z: z - sz * 0.05, ry });
  b.box(0.3, 0.3, 0.3, color, { x: x + cx * 0.48, y: 0.72, z: z + sz * 0.48, ry });
  for (const sg of [-1, 1]) {
    b.cone(0.04, 0.2, "#d8c9a8", { x: x + cx * 0.52 - sz * sg * 0.15, y: 0.92, z: z + sz * 0.52 + cx * sg * 0.15, rx: cx * sg * 0.6, rz: sz * sg * -0.6 }, 5);
    for (const fb of [-0.28, 0.28]) b.box(0.12, 0.42, 0.12, color, { x: x + cx * fb - sz * sg * 0.13, y: 0.2, z: z + sz * fb + cx * sg * 0.13, ry });
  }
}

function buildSea(out: Partial<WorldVisual>): StationVisual {
  const st = station();
  const [x, z] = POS.fuente;
  const s = new GeoBuilder();
  // doce bueyes: tres miran a cada punto cardinal, con las ancas hacia adentro (1 Reyes 7:25)
  for (let q = 0; q < 4; q++) {
    const base = (q * Math.PI) / 2;
    for (const d of [-0.42, 0, 0.42]) {
      const a = base + d;
      ox(s, x + Math.cos(a) * 1.45, z + Math.sin(a) * 1.45, base, C.bronce);
    }
  }
  const brim: [number, number][] = [[0, 0.95], [1.0, 0.97], [1.6, 1.12], [2.0, 1.45], [2.15, 1.85], [2.2, 2.1], [2.38, 2.22], [2.32, 2.29], [2.1, 2.2], [2.05, 1.9], [1.85, 1.5], [1.45, 1.27], [0.9, 1.15], [0, 1.14]];
  s.lathe(brim, C.bronce, { x, y: 0, z }, 28);
  for (let k = 0; k < 28; k++) {
    const a = (k / 28) * Math.PI * 2;
    s.sphere(0.06, C.bronceOsc, { x: x + Math.cos(a) * 2.2, y: 1.72, z: z + Math.sin(a) * 2.2 }, 5, 4); // botones (1 Reyes 7:24)
  }
  addMeshes(st.built, null, s);
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(2.08, 32).rotateX(-Math.PI / 2),
    conOndas(new THREE.MeshPhongMaterial({ color: "#4f9fc4", shininess: 110, specular: new THREE.Color("#ffffff"), transparent: true, opacity: 0.92 })),
  );
  water.position.set(x, 1.98, z);
  st.built.add(water);
  out.water = water;
  st.anchors.water = new THREE.Vector3(x, 2.0, z);

  // abandonado: Acaz quitó el mar de sobre los bueyes y lo puso sobre un enlosado (2 Reyes 16:17)
  const r = new GeoBuilder();
  r.box(3.2, 0.9, 3.2, dusty(C.piedra, 0.35), { x, y: 0.45, z });
  r.lathe(brim.map(([a, b]) => [a, b - 0.05] as [number, number]), dusty("#5f6b4c", 0.3), { x, y: 0, z }, 28);
  rubble(r, x + 2.6, z - 1.4, 1.6, 1.6, 5);
  addMeshes(st.ruin, r);
  return st;
}

function buildLenera(): StationVisual {
  const st = station();
  const [x, z] = POS.lenera;
  const m = new GeoBuilder();
  for (const dx of [-1.75, 1.75]) for (const dz of [-1.05, 1.05]) m.box(0.18, 2.3, 0.18, C.cedroOsc, { x: x + dx, y: 1.15, z: z + dz });
  m.box(4.2, 0.12, 2.8, C.cedro, { x, y: 2.42, z: z - 0.05, rx: -0.12 });
  for (let k = 0; k < 7; k++) m.box(4.3, 0.05, 0.22, C.cedroOsc, { x, y: 2.5 + (k - 3) * 0.04 * -1, z: z - 1.2 + k * 0.4, rx: -0.12 });
  m.box(3.6, 2.0, 0.08, C.cedroOsc, { x, y: 1.0, z: z - 1.08 });
  // leña apilada adentro
  for (let row = 0; row < 5; row++)
    for (let k = 0; k < 9; k++) log(m, x - 1.4 + k * 0.35 + (row % 2) * 0.17, 0.12 + row * 0.22, z - 0.4, 1.0, 0.1, Math.PI / 2);
  // tronco para partir con su hacha
  m.cyl(0.26, 0.3, 0.45, "#7d5a3c", { x: x + 1.2, y: 0.22, z: z + 0.7 }, 10);
  m.box(0.05, 0.6, 0.05, C.cedroOsc, { x: x + 1.25, y: 0.7, z: z + 0.7, rz: 0.5 });
  m.box(0.18, 0.12, 0.04, "#8d8d8d", { x: x + 1.08, y: 0.94, z: z + 0.7, rz: 0.5 });
  addMeshes(st.built, m);
  st.anchors.pile = new THREE.Vector3(POS.lenaPile[0], 0, POS.lenaPile[1]);

  const r = new GeoBuilder();
  r.box(0.18, 1.2, 0.18, dusty(C.cedroOsc), { x: x - 1.75, y: 0.6, z: z - 1.05 });
  r.box(0.18, 0.7, 0.18, dusty(C.cedroOsc), { x: x + 1.75, y: 0.35, z: z - 1.05, rz: 0.3 });
  r.box(4.2, 0.1, 2.6, dusty(C.cedro), { x, y: 0.4, z, rx: 0.15, rz: 0.12 });
  for (let k = 0; k < 6; k++) log(r, x + rr(-1.6, 1.6), 0.1, z + rr(-0.8, 1.2), rr(0.6, 1.1), 0.09, rr(0, Math.PI));
  rubble(r, x, z + 0.4, 3.6, 2.0, 6);
  addMeshes(st.ruin, r);
  return st;
}

function buildPrensa(out: Partial<WorldVisual>): StationVisual {
  const st = station();
  const [x, z] = POS.prensa;
  const m = new GeoBuilder();
  // pila de piedra para machacar las olivas
  m.lathe([[0, 0], [0.95, 0], [1.0, 0.55], [0.85, 0.6], [0.8, 0.35], [0, 0.32]], vary(C.piedraOsc, 0.04), { x, y: 0, z }, 22);
  m.cyl(0.12, 0.12, 1.4, C.cedroOsc, { x, y: 0.9, z }, 8);
  // olivas, cántaros y una canasta
  for (let k = 0; k < 16; k++) m.sphere(0.05, pick(["#3e4a1f", "#5a2f4a", "#4d5a24"]), { x: x + rr(-0.6, 0.6), y: 0.38, z: z + rr(-0.6, 0.6) }, 5, 4);
  for (let k = 0; k < 4; k++) jar(m, x + 1.25, 0, z - 0.8 + k * 0.42, 1.1);
  m.cyl(0.32, 0.26, 0.3, "#9b7a4a", { x: x - 1.25, y: 0.15, z: z + 0.5 }, 12);
  for (let k = 0; k < 10; k++) m.sphere(0.05, pick(["#3e4a1f", "#5a2f4a"]), { x: x - 1.25 + rr(-0.2, 0.2), y: 0.32, z: z + 0.5 + rr(-0.2, 0.2) }, 5, 4);
  // prensa de viga al fondo
  m.box(0.3, 1.4, 0.3, C.piedraOsc, { x: x - 1.1, y: 0.7, z: z - 0.95 });
  m.box(2.6, 0.16, 0.18, C.cedro, { x: x + 0.1, y: 1.15, z: z - 0.95, rz: -0.08 });
  m.box(0.34, 0.34, 0.34, C.piedra, { x: x + 1.2, y: 0.7, z: z - 0.95 });
  addMeshes(st.built, m);
  // la muela que gira cuando hay trabajo
  const mill = new THREE.Group();
  mill.position.set(x, 0, z);
  const mb = new GeoBuilder();
  mb.cyl(0.42, 0.42, 0.26, vary(C.piedra, 0.03), { x: 0.42, y: 0.75, z: 0, rx: Math.PI / 2 }, 16);
  mb.box(1.8, 0.08, 0.08, C.cedroOsc, { x: 0.6, y: 0.75, z: 0 });
  addMeshes(mill, mb);
  st.built.add(mill);
  st.parts.mill = mill;
  out.millstone = mill;
  st.anchors.pile = new THREE.Vector3(POS.prensaPile[0], 0, POS.prensaPile[1]);

  const r = new GeoBuilder();
  r.lathe([[0, 0], [0.95, 0], [1.0, 0.35], [0.85, 0.4], [0.8, 0.2], [0, 0.2]], dusty(C.piedraOsc), { x, y: 0, z }, 18);
  r.cyl(0.42, 0.42, 0.26, dusty(C.piedra), { x: x + 1.1, y: 0.13, z: z + 0.6 }, 14);
  for (let k = 0; k < 3; k++) r.lathe([[0, 0], [0.12, 0], [0.17, 0.12], [0.1, 0.22]], dusty("#b8673a", 0.3), { x: x + rr(-1, 1), y: 0.05, z: z + rr(-1, 1), rz: Math.PI / 2 }, 8);
  rubble(r, x, z, 2.6, 2.0, 6);
  addMeshes(st.ruin, r);
  return st;
}

function buildHorno(out: Partial<WorldVisual>): StationVisual {
  const st = station();
  const [x, z] = POS.horno;
  const m = new GeoBuilder();
  // horno de barro con cúpula
  m.cyl(0.95, 1.0, 0.5, "#b07a52", { x: x - 0.4, y: 0.25, z }, 18);
  m.sphere(0.95, "#c08a5e", { x: x - 0.4, y: 0.5, z }, 18, 10, Math.PI * 2, Math.PI / 2);
  m.cyl(0.18, 0.2, 0.2, "#8a5a3a", { x: x - 0.4, y: 1.5, z }, 10);
  m.cyl(0.36, 0.36, 0.1, "#3a2416", { x: x - 0.4, y: 0.62, z: z - 0.92, rx: Math.PI / 2 }, 14);
  // mesa de amasar con la masa y las tortas
  m.box(1.5, 0.08, 0.8, C.cedro, { x: x + 0.95, y: 0.8, z: z + 0.1 });
  for (const dx of [-0.65, 0.65]) for (const dz of [-0.3, 0.3]) m.box(0.08, 0.8, 0.08, C.cedroOsc, { x: x + 0.95 + dx, y: 0.4, z: z + 0.1 + dz });
  m.sphere(0.2, "#efe2c4", { x: x + 0.7, y: 0.88, z: z + 0.1, sy: 0.5 }, 10, 6);
  for (let k = 0; k < 3; k++) m.cyl(0.13, 0.14, 0.04, "#d3a05f", { x: x + 1.15 + (k % 2) * 0.12, y: 0.86 + k * 0.04, z: z + 0.15 }, 12);
  // sacos de flor de harina y leña
  for (let k = 0; k < 2; k++) m.lathe([[0, 0], [0.24, 0], [0.28, 0.25], [0.2, 0.5], [0.1, 0.56], [0, 0.56]], "#d8c8a4", { x: x + 0.6 + k * 0.5, y: 0, z: z - 0.75 }, 10);
  for (let k = 0; k < 5; k++) log(m, x - 1.55, 0.1 + (k % 3) * 0.17, z + 0.6 + Math.floor(k / 3) * 0.2, 0.7, 0.07, 0);
  addMeshes(st.built, m);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(0.3, 14), new THREE.MeshBasicMaterial({ color: "#ff8a2a", toneMapped: false }));
  glow.position.set(x - 0.4, 0.62, z - 0.975);
  glow.rotation.y = Math.PI;
  st.built.add(glow);
  out.ovenGlow = glow;
  st.anchors.pile = new THREE.Vector3(POS.hornoPile[0], 0, POS.hornoPile[1]);
  st.anchors.mouth = new THREE.Vector3(x - 0.4, 0.7, z - 1.0);

  const r = new GeoBuilder();
  r.cyl(0.95, 1.0, 0.45, dusty("#b07a52"), { x: x - 0.4, y: 0.22, z }, 16);
  r.sphere(0.95, dusty("#c08a5e"), { x: x - 0.4, y: 0.45, z, rz: 0.5 }, 14, 8, Math.PI, Math.PI / 2);
  rubble(r, x + 0.6, z, 2.4, 2.0, 7, ["#b07a52", C.piedraOsc, C.tierra]);
  addMeshes(st.ruin, r);
  return st;
}

function smallHouse(b: GeoBuilder, x: number, z: number, w: number, d: number, h: number, doorSide: number, color: string = C.piedra) {
  blockWall(b, "x", x - w / 2, x + w / 2, z, d, Array.from({ length: 4 }, (_, i) => ({ h: h / 4, color: i === 0 ? C.piedraOsc : color, len: 1.1 })));
  b.box(w + 0.2, 0.16, d + 0.2, C.cedroOsc, { x, y: h + 0.08, z });
  b.box(w + 0.24, 0.2, 0.1, C.piedraClara, { x, y: h + 0.26, z: z + doorSide * (d / 2 + 0.05) });
  b.box(0.8, 1.5, 0.06, "#2c2117", { x, y: 0.75, z: z + doorSide * (d / 2 + 0.02) });
  b.box(0.96, 0.12, 0.08, C.cedro, { x, y: 1.55, z: z + doorSide * (d / 2 + 0.04) });
}

function buildCamIncienso(): StationVisual {
  const st = station();
  const [x, z] = POS.camIncienso;
  const m = new GeoBuilder(), s = new GeoBuilder();
  smallHouse(m, x, z - 0.2, 3.0, 1.8, 2.5, 1);
  // toldo y mesa con el mortero y las especias aromáticas (Éxodo 30:34)
  m.box(3.0, 0.06, 1.0, C.carmesi, { x, y: 2.1, z: z + 1.05, rx: 0.25 });
  m.box(1.6, 0.07, 0.6, C.cedro, { x: x + 0.3, y: 0.75, z: z + 1.0 });
  for (const dx of [-0.7, 0.7]) m.box(0.07, 0.75, 0.5, C.cedroOsc, { x: x + 0.3 + dx, y: 0.37, z: z + 1.0 });
  s.lathe([[0, 0], [0.12, 0], [0.16, 0.14], [0.13, 0.16], [0, 0.08]], C.bronce, { x: x - 0.25, y: 0.79, z: z + 1.0 }, 10);
  m.box(0.04, 0.25, 0.04, C.cedroOsc, { x: x - 0.22, y: 0.98, z: z + 1.0, rz: 0.3 });
  const spice = ["#f3eedf", "#c99a4a", "#7a5a3a", "#9aa65a"];
  spice.forEach((c, i) => {
    m.lathe([[0, 0], [0.09, 0], [0.12, 0.08], [0, 0.06]], "#b8673a", { x: x + 0.15 + i * 0.3, y: 0.79, z: z + 1.05 }, 8);
    m.sphere(0.08, c, { x: x + 0.15 + i * 0.3, y: 0.86, z: z + 1.05, sy: 0.5 }, 7, 5);
  });
  for (let k = 0; k < 5; k++) m.box(0.06, 0.32, 0.06, "#6f7a3a", { x: x - 1.2 + k * 0.25, y: 1.85, z: z + 0.75 }); // hierbas colgadas
  addMeshes(st.built, m, s);
  st.anchors.pile = new THREE.Vector3(POS.camInciensoPile[0], 0, POS.camInciensoPile[1]);

  const r = new GeoBuilder();
  blockWall(r, "x", x - 1.5, x + 1.5, z - 0.2, 1.8, [{ h: 0.6, color: C.piedraOsc, len: 1.1 }, { h: 0.5, color: C.piedra, len: 1.1 }]);
  rubble(r, x, z + 1.0, 2.6, 1.2, 8);
  addMeshes(st.ruin, r);
  return st;
}

function buildCamaras(out: Partial<WorldVisual>): StationVisual {
  const st = station();
  const [x, z] = POS.camaras;
  const m = new GeoBuilder();
  const w = 8.0, d = 2.3, h = 3.0;
  blockWall(m, "x", x - w / 2, x + w / 2, z, d, Array.from({ length: 5 }, (_, i) => ({ h: h / 5, color: i === 0 ? C.piedraOsc : i === 4 ? C.piedraClara : C.piedra, len: 1.3 })));
  m.box(w + 0.3, 0.2, d + 0.3, C.cedroOsc, { x, y: h + 0.1, z });
  m.box(w + 0.3, 0.26, 0.12, C.piedraClara, { x, y: h + 0.32, z: z + d / 2 + 0.1 });
  m.box(w, 0.2, 0.05, C.cedro, { x, y: h - 0.6, z: z + d / 2 + 0.03 });
  for (const dx of [-3, -1, 1, 3]) {
    m.box(0.9, 1.7, 0.06, "#2a1f15", { x: x + dx, y: 0.85, z: z + d / 2 + 0.02 });
    m.box(1.1, 0.14, 0.1, C.cedro, { x: x + dx, y: 1.75, z: z + d / 2 + 0.05 });
  }
  addMeshes(st.built, m);
  // montones de diezmos que crecen con la abundancia (2 Crónicas 31:6)
  const heaps: THREE.Object3D[] = [];
  const heapSpots: [number, number, string][] = [
    [x - 2.0, z + 1.85, "#d9b44a"], [x + 2.0, z + 1.85, "#c79a3c"], [x - 3.4, z + 1.75, "#a8763c"], [x + 3.4, z + 1.75, "#d9b44a"],
  ];
  for (const [hx, hz, col] of heapSpots) {
    const g = new THREE.Group();
    g.position.set(hx, 0, hz);
    const hb = new GeoBuilder();
    hb.cone(0.6, 0.7, col, { y: 0.35 }, 12);
    for (let k = 0; k < 4; k++) hb.sphere(0.09, pick(["#7a2f3a", "#4d6b2a", "#d17a2a"]), { x: rr(-0.4, 0.4), y: 0.12, z: rr(-0.3, 0.4) }, 6, 4);
    addMeshes(g, hb);
    g.scale.setScalar(0.001);
    st.built.add(g);
    heaps.push(g);
  }
  out.heaps = heaps;
  st.anchors.door = new THREE.Vector3(POS.camarasDoor[0], 0, POS.camarasDoor[1]);

  const r = new GeoBuilder();
  blockWall(r, "x", x - w / 2, x + w / 2, z, d, [{ h: 0.8, color: C.piedraOsc, len: 1.3 }, { h: 0.8, color: C.piedra, len: 1.3 }, { h: 0.5, color: C.piedra, len: 1.3 }]);
  rubble(r, x, z + 1.8, 7.0, 1.4, 12);
  addMeshes(st.ruin, r);
  return st;
}

function buildCoro(): StationVisual {
  const st = station();
  const [x, z] = POS.coro;
  const m = new GeoBuilder(), s = new GeoBuilder();
  const w = 5.2, d = 2.8;
  blockWall(m, "x", x - w / 2, x + w / 2, z, d, [{ h: CHOIR_FLOOR, color: C.piedraClara, len: 1.2 }]);
  m.raw(tiles(x - w / 2, z - d / 2, x + w / 2, z + d / 2, 0.7, [C.piedraClara, C.piedra], CHOIR_FLOOR + 0.002, 0.02, 0.05));
  for (let i = 0; i < 3; i++) m.box(2.0, (CHOIR_FLOOR * (i + 1)) / 3, 0.3, vary(C.piedra, 0.04), { x, y: (CHOIR_FLOOR * (i + 1)) / 6, z: z - d / 2 - 0.15 - (2 - i) * 0.3 });
  // pared baja con arpas y salterios de David colgados (2 Crónicas 29:25-26)
  m.box(w, 1.1, 0.25, C.piedra, { x, y: CHOIR_FLOOR + 0.55, z: z + d / 2 - 0.12 });
  m.box(w + 0.1, 0.1, 0.32, C.cedro, { x, y: CHOIR_FLOOR + 1.12, z: z + d / 2 - 0.12 });
  for (const dx of [-1.8, 1.8]) {
    s.box(0.05, 0.7, 0.05, C.oroOsc, { x: x + dx - 0.2, y: CHOIR_FLOOR + 0.6, z: z + d / 2 - 0.35, rz: 0.2 });
    s.box(0.05, 0.7, 0.05, C.oroOsc, { x: x + dx + 0.2, y: CHOIR_FLOOR + 0.6, z: z + d / 2 - 0.35, rz: -0.2 });
    s.box(0.5, 0.05, 0.05, C.oroOsc, { x: x + dx, y: CHOIR_FLOOR + 0.94, z: z + d / 2 - 0.35 });
    for (let k = 0; k < 5; k++) m.box(0.01, 0.6, 0.01, "#f0e6c8", { x: x + dx - 0.16 + k * 0.08, y: CHOIR_FLOOR + 0.62, z: z + d / 2 - 0.35 });
  }
  addMeshes(st.built, m, s);
  const r = new GeoBuilder();
  blockWall(r, "x", x - w / 2, x + w / 2, z, d, [{ h: 0.3, color: C.piedraOsc, len: 1.2 }]);
  rubble(r, x, z, 4.6, 2.4, 10);
  addMeshes(st.ruin, r);
  return st;
}

function buildEnsenanza(): StationVisual {
  const st = station();
  const [x, z] = POS.ensenanza;
  const m = new GeoBuilder();
  m.box(4.6, 0.18, 2.4, C.piedraOsc, { x, y: 0.09, z: z + 0.3 });
  for (const dx of [-1.9, -0.65, 0.65, 1.9]) {
    m.cyl(0.16, 0.19, 2.8, vary(C.piedraClara, 0.03), { x: x + dx, y: 1.58, z: z - 0.55 }, 10);
    m.box(0.42, 0.14, 0.42, C.piedraClara, { x: x + dx, y: 3.02, z: z - 0.55 });
  }
  m.box(4.8, 0.24, 2.6, C.cedro, { x, y: 3.2, z: z + 0.3 });
  m.box(4.6, 2.8, 0.25, C.piedra, { x, y: 1.6, z: z + 1.4 });
  // asiento del maestro y bancas para el pueblo
  m.box(1.0, 0.5, 0.6, C.piedraClara, { x, y: 0.43, z: z + 0.85 });
  m.box(1.0, 0.8, 0.12, C.piedraClara, { x, y: 0.95, z: z + 1.15 });
  m.box(1.6, 0.36, 0.42, C.cedro, { x, y: 0.18, z: POS.ensenanzaBench[1] });
  // rollos de la ley sobre un atril
  m.box(0.5, 0.06, 0.36, C.cedroOsc, { x: x + 1.3, y: 0.95, z: z + 0.6, rx: -0.3 });
  m.box(0.08, 0.9, 0.08, C.cedroOsc, { x: x + 1.3, y: 0.47, z: z + 0.6 });
  m.cyl(0.05, 0.05, 0.42, "#efe2c4", { x: x + 1.3, y: 1.02, z: z + 0.55, rz: Math.PI / 2 }, 8);
  addMeshes(st.built, m);
  const r = new GeoBuilder();
  for (let k = 0; k < 4; k++) r.cyl(0.16, 0.19, rr(0.6, 1.6), dusty(C.piedraClara), { x: x + rr(-2, 2), y: 0.2, z: z + rr(-0.6, 0.8), rz: Math.PI / 2, ry: rr(0, Math.PI) }, 10);
  rubble(r, x, z, 4.2, 2.0, 8);
  addMeshes(st.ruin, r);
  return st;
}

function buildPuertas(): StationVisual {
  // Las puertas abiertas son las hojas de la puerta (se animan aparte); aquí solo hay escombros en la entrada.
  const st = station();
  const r = new GeoBuilder();
  rubble(r, POS.reception[0] - 1.2, 0, 2.0, 3.6, 8);
  addMeshes(st.ruin, r);
  return st;
}

function buildSantuario(): StationVisual {
  // Las puertas del Lugar Santo se abren aparte; aquí, la basura que sacaron del templo (2 Crónicas 29:16).
  const st = station();
  const r = new GeoBuilder();
  for (let k = 0; k < 10; k++) r.box(rr(0.2, 0.5), rr(0.1, 0.3), rr(0.2, 0.5), dusty(pick([C.cedro, C.piedraOsc, C.tierra])), { x: -3.6 + rr(-0.6, 0.6), y: T.floor + 0.1, z: rr(-2.6, 2.6), ry: rr(0, 3) });
  addMeshes(st.ruin, r);
  return st;
}

function buildCandelero(): StationVisual {
  const st = station();
  const [x, z] = POS.candelero;
  const F = T.floor;
  const s = new GeoBuilder();
  s.lathe([[0, 0], [0.34, 0], [0.32, 0.05], [0.18, 0.13], [0.09, 0.22], [0.06, 0.32], [0, 0.32]], C.oro, { x, y: F, z }, 16);
  s.cyl(0.045, 0.05, 1.3, C.oro, { x, y: F + 0.32 + 0.65, z }, 10);
  for (const y of [0.6, 0.95, 1.18, 1.37]) s.sphere(0.07, C.oro, { x, y: F + y, z }, 8, 6);
  const radii = [0.44, 0.3, 0.16];
  const top = F + 1.62;
  for (const r of radii) {
    s.add(new THREE.TorusGeometry(r, 0.032, 6, 18, Math.PI), C.oro, { x, y: top, z, rz: Math.PI });
    // copas en forma de flor de almendro (Éxodo 25:33)
    for (const a of [0.35, 0.75]) {
      const ang = Math.PI + a * (Math.PI / 2);
      s.sphere(0.045, C.oroOsc, { x: x + Math.cos(ang) * r, y: top + Math.sin(ang) * r, z }, 6, 5);
      s.sphere(0.045, C.oroOsc, { x: x - Math.cos(ang) * r, y: top + Math.sin(ang) * r, z }, 6, 5);
    }
  }
  const lamps: THREE.Vector3[] = [];
  for (const dx of [-0.44, -0.3, -0.16, 0, 0.16, 0.3, 0.44]) {
    s.lathe([[0, 0], [0.05, 0], [0.08, 0.04], [0.075, 0.06], [0, 0.04]], C.oro, { x: x + dx, y: top, z }, 10);
    lamps.push(new THREE.Vector3(x + dx, top + 0.1, z));
  }
  addMeshes(st.built, null, s);
  lamps.forEach((v, i) => (st.anchors[`lamp${i}`] = v));
  st.anchors.light = new THREE.Vector3(x, top + 0.4, z - 0.6);
  const r = new GeoBuilder();
  for (let k = 0; k < 6; k++) r.box(rr(0.15, 0.4), 0.08, rr(0.15, 0.4), dusty(C.cedro), { x: x + rr(-0.6, 0.6), y: F + 0.04, z: z + rr(-0.5, 0.4), ry: rr(0, 3) });
  addMeshes(st.ruin, r);
  return st;
}

function buildMesa(): StationVisual {
  const st = station();
  const [x, z] = POS.mesa;
  const F = T.floor;
  const s = new GeoBuilder();
  const topY = F + 0.78;
  s.box(1.15, 0.05, 0.6, C.oro, { x, y: topY, z });
  s.box(1.19, 0.06, 0.04, C.oroOsc, { x, y: topY + 0.05, z: z - 0.3 }); // cornisa de oro alrededor (Éxodo 25:24-25)
  s.box(1.19, 0.06, 0.04, C.oroOsc, { x, y: topY + 0.05, z: z + 0.3 });
  s.box(0.04, 0.06, 0.6, C.oroOsc, { x: x - 0.58, y: topY + 0.05, z });
  s.box(0.04, 0.06, 0.6, C.oroOsc, { x: x + 0.58, y: topY + 0.05, z });
  for (const dx of [-0.52, 0.52]) for (const dz of [-0.25, 0.25]) s.box(0.06, 0.76, 0.06, C.oro, { x: x + dx, y: F + 0.38, z: z + dz });
  s.box(1.05, 0.06, 0.5, C.oroOsc, { x, y: F + 0.3, z });
  addMeshes(st.built, null, s);
  // dos hileras de seis panes (Levítico 24:6)
  for (let i = 0; i < 12; i++) {
    const row = i < 6 ? -1 : 1;
    st.anchors[`pan${i}`] = new THREE.Vector3(x + row * 0.27, topY + 0.05 + (i % 6) * 0.075, z);
  }
  st.anchors.incenseL = new THREE.Vector3(x - 0.27, topY + 0.56, z);
  st.anchors.incenseR = new THREE.Vector3(x + 0.27, topY + 0.56, z);
  const r = new GeoBuilder();
  for (let k = 0; k < 6; k++) r.box(rr(0.15, 0.4), 0.08, rr(0.15, 0.4), dusty(C.cedro), { x: x + rr(-0.6, 0.6), y: F + 0.04, z: z + rr(-0.4, 0.5), ry: rr(0, 3) });
  addMeshes(st.ruin, r);
  return st;
}

function buildAltarIncienso(): StationVisual {
  const st = station();
  const [x, z] = POS.altarIncienso;
  const F = T.floor;
  const s = new GeoBuilder();
  s.box(0.52, 0.92, 0.52, C.oro, { x, y: F + 0.46, z });
  s.box(0.6, 0.06, 0.6, C.oroOsc, { x, y: F + 0.95, z });
  s.box(0.58, 0.05, 0.58, C.oroOsc, { x, y: F + 0.06, z });
  for (const dx of [-0.24, 0.24]) for (const dz of [-0.24, 0.24]) s.cone(0.05, 0.14, C.oro, { x: x + dx, y: F + 1.05, z: z + dz }, 6);
  for (const dz of [-0.27, 0.27]) s.torus(0.05, 0.012, C.oroOsc, { x, y: F + 0.75, z: z + dz }, 4, 10);
  addMeshes(st.built, null, s);
  st.anchors.top = new THREE.Vector3(x, F + 1.0, z);
  const r = new GeoBuilder();
  for (let k = 0; k < 5; k++) r.box(rr(0.15, 0.4), 0.08, rr(0.15, 0.4), dusty(C.cedro), { x: x + rr(-0.5, 0.5), y: F + 0.04, z: z + rr(-0.6, 0.6), ry: rr(0, 3) });
  addMeshes(st.ruin, r);
  return st;
}

// ---------------------------------------------------------------- cielo
function buildSky(out: Partial<WorldVisual>) {
  const uniforms: SkyUniforms = {
    top: { value: new THREE.Color("#5d9bd6") },
    horizon: { value: new THREE.Color("#f1e3c2") },
    sunDir: { value: new THREE.Vector3(0.3, 0.8, 0.4).normalize() },
    sunColor: { value: new THREE.Color("#fff1c9") },
    night: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir; uniform vec3 sunColor; uniform float night; varying vec3 vDir;
      void main(){
        float h = clamp(vDir.y, -0.2, 1.0);
        vec3 col = mix(horizon, top, smoothstep(-0.02, 0.55, h));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        col += sunColor * (pow(s, 600.0) * 2.5 + pow(s, 12.0) * 0.35) * (1.0 - night * 0.6);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 24, 16), mat);
  sky.frustumCulled = false;
  out.sky = sky;
  out.skyUniforms = uniforms;

  const n = 650;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = rnd(), v = rr(0.08, 1);
    const a = u * Math.PI * 2;
    const r = Math.sqrt(1 - v * v);
    pos[i * 3] = Math.cos(a) * r * 400;
    pos[i * 3 + 1] = v * 400;
    pos[i * 3 + 2] = Math.sin(a) * r * 400;
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: "#fffaf0", size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false }));
  stars.frustumCulled = false;
  out.stars = stars;

  const clouds = new THREE.Group();
  const cb = new GeoBuilder();
  for (let i = 0; i < 9; i++) {
    const a = rr(0, Math.PI * 2), r = rr(90, 160);
    const cx = Math.cos(a) * r, cz = Math.sin(a) * r, cy = rr(55, 75);
    for (let k = 0; k < 5; k++) cb.add(new THREE.IcosahedronGeometry(rr(5, 9), 1), "#ffffff", { x: cx + rr(-10, 10), y: cy + rr(-2, 2), z: cz + rr(-5, 5), sy: 0.55 });
  }
  const cm = new THREE.Mesh(cb.build(), new THREE.MeshLambertMaterial({ vertexColors: true, emissive: new THREE.Color("#b9c4d6"), emissiveIntensity: 0.55, fog: false, transparent: true, opacity: 0.9 }));
  clouds.add(cm);
  out.clouds = clouds;
}

// ---------------------------------------------------------------- adornos que se ganan con las jornadas
const TRIBUS = ["#b3242f", "#c9c24a", "#2e8b57", "#1f9e6e", "#2a4fbf", "#e8f4ff", "#e07a2a", "#8c8c8c", "#7d3c98", "#e6c84a", "#1d1a17", "#4f7a37"];

function buildAdornos(root: THREE.Group, out: Partial<WorldVisual>) {
  const groups: Record<string, THREE.Group> = {};
  const make = (id: string, fill: (m: GeoBuilder, s: GeoBuilder) => void) => {
    const g = new THREE.Group();
    const m = new GeoBuilder(), s = new GeoBuilder();
    fill(m, s);
    addMeshes(g, m, s, { cast: true });
    g.visible = false;
    root.add(g);
    groups[id] = g;
  };
  // palmeras en las esquinas del atrio (Salmo 92:13)
  make("palmeras", (m) => {
    for (const [x, z] of [[-15.0, 12.0], [-15.0, -12.0], [11.2, 12.2], [11.2, -12.2], [-6.2, 12.3], [-6.2, -12.3]] as [number, number][]) {
      m.cyl(0.42, 0.5, 0.36, C.piedraOsc, { x, y: 0.18, z }, 10);
      palmTree(m, x, 0.3, z, 0.85);
    }
  });
  // estandartes de las doce tribus en el gran atrio (Números 2:2)
  make("estandartes", (m, s) => {
    for (let i = 0; i < 12; i++) {
      const side = i < 6 ? -1 : 1;
      const x = OUTER.minX + 1.6 + (i % 6) * 2.4;
      const z = side * (OUTER.maxZ - 1.9);
      m.cyl(0.04, 0.05, 3.3, C.cedroOsc, { x, y: 1.65, z }, 6);
      s.sphere(0.07, C.oro, { x, y: 3.34, z }, 6, 5);
      m.box(0.04, 0.95, 0.7, TRIBUS[i], { x, y: 2.75, z: z - side * 0.37 });
      m.box(0.05, 0.12, 0.72, C.oroOsc, { x, y: 2.28, z: z - side * 0.37 });
    }
  });
  // lirios y granados en macetas de piedra (1 Reyes 7:19-20)
  make("lirios", (m) => {
    for (const [x, z] of [[13.6, 7.4], [13.6, -7.4], [13.6, 10.2], [13.6, -10.2], [5.4, 6.2], [5.4, -6.2], [-1.6, 5.6], [-1.8, -5.8]] as [number, number][]) {
      m.cyl(0.32, 0.26, 0.5, C.piedraClara, { x, y: 0.25, z }, 10);
      m.cyl(0.3, 0.3, 0.04, C.tierra, { x, y: 0.5, z }, 10);
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        m.cyl(0.012, 0.012, 0.45, C.hoja, { x: x + Math.cos(a) * 0.12, y: 0.72, z: z + Math.sin(a) * 0.12 }, 4);
        m.cone(0.07, 0.14, "#fbfbf6", { x: x + Math.cos(a) * 0.12, y: 0.98, z: z + Math.sin(a) * 0.12, rx: Math.PI }, 6);
      }
      for (let k = 0; k < 3; k++) m.sphere(0.06, "#a3452e", { x: x + (k - 1) * 0.12, y: 0.62, z: z + 0.18 }, 6, 5);
    }
  });
  // braseros de bronce (más luz de noche)
  const braseros: THREE.Vector3[] = [];
  make("braseros", (m, s) => {
    for (const [x, z] of [[9.0, -4.6], [9.0, 4.6], [-0.6, 3.6], [-0.6, -6.2], [22.0, 0.0 + 4.0], [26.0, -3.6]] as [number, number][]) {
      m.box(0.5, 0.12, 0.5, C.piedraOsc, { x, y: 0.06, z });
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2;
        s.cyl(0.03, 0.03, 1.1, C.bronceOsc, { x: x + Math.cos(a) * 0.18, y: 0.6, z: z + Math.sin(a) * 0.18, rx: Math.sin(a) * 0.2, rz: -Math.cos(a) * 0.2 }, 5);
      }
      s.lathe([[0, 0], [0.12, 0], [0.3, 0.16], [0.34, 0.24], [0.3, 0.24], [0, 0.12]], C.bronce, { x, y: 1.12, z }, 12);
      braseros.push(new THREE.Vector3(x, 1.4, z));
    }
  });
  out.braseros = braseros;
  // toldos para los peregrinos, junto a los muros del gran atrio
  make("toldos", (m) => {
    const telas = [C.carmesi, C.azul, "#d9b44a", C.purpura];
    for (let i = 0; i < 4; i++) {
      const x = OUTER.minX + 3.4 + i * 3.4;
      const side = i % 2 ? 1 : -1;
      const z = side * (OUTER.maxZ - 3.2);
      for (const dx of [-0.9, 0.9]) m.cyl(0.035, 0.035, 2.4, C.cedroOsc, { x: x + dx, y: 1.2, z: z - side * 0.2 }, 5);
      m.box(2.2, 0.05, 1.4, telas[i], { x, y: 2.42, z: z + side * 0.35, rx: side * 0.2 });
    }
  });
  // corral de los corderos junto a la puerta del gran atrio (Éxodo 12:5)
  make("rebano", (m) => {
    const cx = OUTER.maxX - 2.2, cz = -6.6;
    for (const [dx, dz, len, rot] of [[0, -1.2, 3.0, 0], [0, 1.2, 3.0, 0], [-1.5, 0, 2.4, Math.PI / 2], [1.5, -0.6, 1.2, Math.PI / 2]] as [number, number, number, number][]) {
      m.box(len, 0.06, 0.06, C.cedro, { x: cx + dx, y: 0.55, z: cz + dz, ry: rot });
      m.box(len, 0.06, 0.06, C.cedro, { x: cx + dx, y: 0.3, z: cz + dz, ry: rot });
    }
    for (const [dx, dz] of [[-1.5, -1.2], [1.5, -1.2], [-1.5, 1.2], [1.5, 1.2], [0, -1.2], [0, 1.2]] as [number, number][]) m.box(0.1, 0.7, 0.1, C.cedroOsc, { x: cx + dx, y: 0.35, z: cz + dz });
    for (let k = 0; k < 5; k++) {
      const x = cx - 0.9 + (k % 3) * 0.8, z = cz - 0.5 + Math.floor(k / 3) * 0.8;
      for (const [ox, oy, oz, r] of [[0, 0.32, 0, 0.2], [0.13, 0.33, 0.03, 0.15], [-0.13, 0.33, -0.02, 0.15]] as number[][]) m.sphere(r, "#f7f3ea", { x: x + ox, y: oy, z: z + oz }, 8, 6);
      m.sphere(0.1, "#f1e2cf", { x: x + 0.24, y: 0.4, z }, 8, 6);
      for (const lx of [-0.1, 0.1]) for (const lz of [-0.08, 0.08]) m.cyl(0.025, 0.025, 0.18, "#3b2f2a", { x: x + lx, y: 0.09, z: z + lz }, 4);
    }
    m.box(0.8, 0.25, 0.4, C.cedro, { x: cx + 0.9, y: 0.12, z: cz + 0.8 }); // pesebre
  });
  // pórtico adornado de oro (2 Crónicas 3:4-6)
  make("oro", (m, s) => {
    const F = T.floor;
    for (const sg of [-1, 1]) {
      s.box(0.12, 0.14, 2.1, C.oro, { x: T.porchX + 0.05, y: 6.05, z: sg * 2.6 });
      for (let k = 0; k < 4; k++) s.sphere(0.09, [C.carmesi, C.azul, "#2e8b57", C.oro][k], { x: T.porchX + 0.08, y: 6.05, z: sg * (1.9 + k * 0.45) }, 8, 6);
      s.torus(0.5, 0.05, C.oro, { x: -2.95, y: F + 0.35, z: sg * 2.55, rx: Math.PI / 2 }, 6, 20);
    }
    s.box(0.1, 0.12, 2 * (T.halfW + T.wall), C.oro, { x: T.porchX + 0.04, y: 7.2, z: 0 });
    for (let k = 0; k < 7; k++) s.sphere(0.11, C.oro, { x: T.porchX + 0.06, y: 7.6, z: -3 + k }, 8, 6);
    m.box(0.02, 0.02, 0.02, C.oro, { x: 0, y: -1, z: 0 });
  });
  // enramadas de la fiesta de los tabernáculos junto a los muros del gran atrio (Levítico 23:40-42)
  make("enramadas", (m) => {
    for (const x of [19.6, 24.4, 29.2])
      for (const side of [-1, 1]) {
        const z = side * 9.85;
        for (const dx of [-0.75, 0.75]) for (const dz of [-0.55, 0.55]) m.cyl(0.04, 0.05, 1.9, C.cedroOsc, { x: x + dx, y: 0.95, z: z + dz }, 5);
        m.box(1.75, 0.07, 1.35, C.hoja, { x, y: 1.93, z });
        for (let k = 0; k < 7; k++) m.cone(0.13, 0.55, k % 2 ? "#5f8f3f" : C.hoja, { x: x - 0.8 + k * 0.27, y: 2.08, z: z + (k % 2 ? 0.25 : -0.25), rz: k % 2 ? 1.2 : -1.2 }, 5);
      }
  });
  out.adornos = groups;
}

// ---------------------------------------------------------------- todo junto
export function buildWorld(): WorldVisual {
  rnd = mulberry32(715);
  const root = new THREE.Group();
  const out: Partial<WorldVisual> = {};
  buildTerrain(root);
  buildCourts(root, out);
  buildTemple(root, out);
  const stations = {
    puertas: buildPuertas(),
    lenera: buildLenera(),
    altar: buildAltar(),
    fuente: buildSea(out),
    santuario: buildSantuario(),
    prensa: buildPrensa(out),
    candelero: buildCandelero(),
    horno: buildHorno(out),
    mesa: buildMesa(),
    camIncienso: buildCamIncienso(),
    altarIncienso: buildAltarIncienso(),
    coro: buildCoro(),
    camaras: buildCamaras(out),
    ensenanza: buildEnsenanza(),
  } as Record<StationId, StationVisual>;
  for (const st of Object.values(stations)) {
    root.add(st.built);
    root.add(st.ruin);
  }
  out.stations = stations;
  buildAdornos(root, out);
  buildSky(out);
  root.add(out.sky!);
  root.add(out.stars!);
  root.add(out.clouds!);
  out.root = root;
  return out as WorldVisual;
}

/** El cielo, las estrellas y las nubes (los usa también la ciudad de Jerusalén en línea). */
export function buildCielo(): Pick<WorldVisual, "sky" | "skyUniforms" | "stars" | "clouds"> {
  const out: Partial<WorldVisual> = {};
  buildSky(out);
  return { sky: out.sky!, skyUniforms: out.skyUniforms!, stars: out.stars!, clouds: out.clouds! };
}

/**
 * El templo restaurado tal como se ve desde la ciudad (Jerusalén en línea): los atrios, la casa
 * de Jehová y sus lugares de servicio, con las puertas abiertas. Va en las mismas coordenadas
 * que el templo, así que la escalinata termina donde empieza la plaza.
 */
export function buildTemploParaCiudad(): THREE.Group {
  rnd = mulberry32(715);
  const root = new THREE.Group();
  const out: Partial<WorldVisual> = {};
  buildCourts(root, out);
  buildTemple(root, out);
  const lugares = [
    buildPuertas(), buildLenera(), buildAltar(), buildSea(out), buildSantuario(), buildPrensa(out), buildHorno(out),
    buildCamIncienso(), buildCamaras(out), buildCoro(), buildEnsenanza(),
  ];
  for (const st of lugares) {
    root.add(st.built);
    st.ruin.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
  }
  // las puertas del atrio y del Lugar Santo están abiertas
  out.gateDoors?.forEach((d, i) => (d.rotation.y = -(i === 0 ? -1 : 1) * (Math.PI / 2)));
  out.holyDoors?.forEach((d, i) => (d.rotation.y = -(i === 0 ? -1 : 1) * (Math.PI / 2) * 0.92));
  return root;
}

export function disposeWorld(w: WorldVisual) {
  w.root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (mat && !Array.isArray(mat) && mat !== matteMat() && mat !== shinyMat() && !fadeMaterials.includes(mat as never)) mat.dispose();
  });
}
