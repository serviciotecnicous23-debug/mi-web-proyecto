/**
 * Personajes con proporciones tiernas (cabeza grande, túnica larga).
 * - El pueblo y los levitas se dibujan "en grupo" (instancias): una malla por tipo de persona,
 *   y los colores de cada uno (túnica, manto, velo, piel y cabello) se pintan en la tarjeta de video.
 * - El aprendiz, Azarías y el rey Ezequías tienen mallas propias con sus vestiduras (Éxodo 28).
 */
import * as THREE from "three";
import { C, GeoBuilder, matrixOf, shinyMat, type Tf } from "./builder";

// ---------------------------------------------------------------- pose y animación
export type Pose = "idle" | "walk" | "cheer" | "kneel" | "play" | "sit" | "bow" | "offer";

export type Rig = {
  x: number;
  y: number;
  z: number;
  yaw: number;
  phase: number; // avanza al caminar
  moving: number; // 0..1
  carrying: boolean;
  pose: Pose;
  t: number; // reloj propio (para que no se muevan todos igual)
  scale: number;
  hunch?: number;
};

export function newRig(x = 0, z = 0, scale = 1): Rig {
  return { x, y: 0, z, yaw: 0, phase: Math.random() * 6, moving: 0, carrying: false, pose: "idle", t: Math.random() * 10, scale };
}

type PoseOut = { bob: number; tilt: number; sway: number; armL: number; armR: number; outL: number; outR: number; footL: number; footR: number; liftL: number; liftR: number; drop: number };
const po: PoseOut = { bob: 0, tilt: 0, sway: 0, armL: 0, armR: 0, outL: 0, outR: 0, footL: 0, footR: 0, liftL: 0, liftR: 0, drop: 0 };

/** Calcula la pose del momento (balanceo al caminar, brazos al cargar, alegría, oración...). */
export function computePose(r: Rig): PoseOut {
  const w = r.moving;
  const s = Math.sin(r.phase);
  const breathe = Math.sin(r.t * 2.1) * 0.012;
  po.bob = Math.abs(s) * 0.05 * w + breathe;
  po.tilt = (r.hunch || 0) + w * 0.06;
  po.sway = s * 0.05 * w;
  po.footL = s * 0.1 * w;
  po.footR = -s * 0.1 * w;
  po.liftL = Math.max(0, Math.cos(r.phase)) * 0.05 * w;
  po.liftR = Math.max(0, -Math.cos(r.phase)) * 0.05 * w;
  po.drop = 0;
  const swing = s * 0.6 * w;
  po.armL = -swing + Math.sin(r.t * 1.3) * 0.04;
  po.armR = swing - Math.sin(r.t * 1.3) * 0.04;
  po.outL = 0.08;
  po.outR = 0.08;
  if (r.carrying) {
    po.armL = po.armR = -1.15 + Math.sin(r.phase * 2) * 0.03 * w;
    po.outL = po.outR = -0.12;
  }
  switch (r.pose) {
    case "cheer": {
      const j = Math.abs(Math.sin(r.t * 7));
      po.bob += j * 0.22;
      po.armL = po.armR = -2.7 + Math.sin(r.t * 14) * 0.15;
      po.outL = po.outR = 0.35;
      break;
    }
    case "kneel":
      po.drop = 0.26;
      po.tilt = 0.32 + Math.max(0, Math.sin(r.t * 0.9)) * 0.35;
      po.armL = po.armR = -1.3;
      po.outL = po.outR = -0.32;
      break;
    case "sit":
      po.drop = 0.24;
      po.tilt = 0.05;
      po.armL = po.armR = -0.7;
      po.outL = po.outR = -0.15;
      break;
    case "play":
      po.armL = -1.0 + Math.sin(r.t * 6) * 0.12;
      po.armR = -0.9 + Math.sin(r.t * 6 + 1.6) * 0.25;
      po.outL = po.outR = -0.2;
      po.bob += Math.abs(Math.sin(r.t * 3)) * 0.03;
      break;
    case "bow":
      po.tilt = 0.45;
      po.armL = po.armR = -0.4;
      break;
    case "offer":
      po.armL = po.armR = -1.9;
      po.outL = po.outR = -0.05;
      break;
    default:
      break;
  }
  return po;
}

// ---------------------------------------------------------------- materiales y piezas
/** Material del pueblo: elige el color de cada pieza según su "casilla" (túnica, manto, velo, piel, cabello). */
function crowdMaterial() {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
attribute float slot;
attribute vec3 c0; attribute vec3 c1; attribute vec3 c2; attribute vec3 c3; attribute vec3 c4;`,
      )
      .replace(
        "#include <color_vertex>",
        `#include <color_vertex>
vec3 sc = color;
if (slot < 0.5) sc = c0; else if (slot < 1.5) sc = c1; else if (slot < 2.5) sc = c2; else if (slot < 3.5) sc = c3; else if (slot < 4.5) sc = c4;
vColor.rgb = sc;`,
      );
  };
  mat.customProgramCacheKey = () => "templo-pueblo";
  return mat;
}

/** Como GeoBuilder, pero cada pieza guarda su casilla de color (5 = color fijo). */
class SlotBuilder {
  private parts: THREE.BufferGeometry[] = [];
  add(geo: THREE.BufferGeometry, slot: number, fixed: THREE.ColorRepresentation = "#ffffff", t?: Tf) {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    geo.dispose();
    if (t) g.applyMatrix4(matrixOf(t));
    for (const name of Object.keys(g.attributes)) if (name !== "position" && name !== "normal") g.deleteAttribute(name);
    const n = g.attributes.position.count;
    const c = new THREE.Color(fixed);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.setAttribute("slot", new THREE.BufferAttribute(new Float32Array(n).fill(slot), 1));
    this.parts.push(g);
    return this;
  }
  build() {
    const merged = mergeAll(this.parts);
    this.parts = [];
    return merged;
  }
}

function mergeAll(parts: THREE.BufferGeometry[]) {
  // unión sencilla (todas las piezas tienen los mismos atributos)
  let total = 0;
  for (const p of parts) total += p.attributes.position.count;
  const out = new THREE.BufferGeometry();
  for (const name of Object.keys(parts[0].attributes)) {
    const size = parts[0].attributes[name].itemSize;
    const arr = new Float32Array(total * size);
    let off = 0;
    for (const p of parts) {
      arr.set(p.attributes[name].array as Float32Array, off);
      off += p.attributes[name].count * size;
    }
    out.setAttribute(name, new THREE.BufferAttribute(arr, size));
  }
  for (const p of parts) p.dispose();
  out.computeBoundingSphere();
  return out;
}

const SKIN = 3, ROBE = 0, ACCENT = 1, HEAD = 2, HAIR = 4, FIXED = 5;
/** Casquete abierto al frente (para que el cabello o el velo no tapen la cara). */
const OPEN_START = Math.PI / 2 + 0.72;
const OPEN_LEN = Math.PI * 2 - 1.44;
const EYE = "#1d1a17";

function face(b: SlotBuilder, headY: number, r: number, big = 1) {
  for (const sg of [-1, 1]) {
    b.add(new THREE.SphereGeometry(0.03 * big, 8, 6), FIXED, EYE, { x: sg * 0.075, y: headY + 0.02, z: r * 0.88, sz: 0.55 });
    b.add(new THREE.SphereGeometry(0.01 * big, 5, 4), FIXED, "#ffffff", { x: sg * 0.075 - 0.01, y: headY + 0.035, z: r * 0.9 + 0.012 });
    b.add(new THREE.SphereGeometry(0.035, 6, 5), SKIN, "#fff", { x: sg * r * 0.98, y: headY - 0.01, z: 0, sz: 0.6 }); // orejas
  }
  b.add(new THREE.SphereGeometry(0.03, 6, 5), SKIN, "#fff", { x: 0, y: headY - 0.025, z: r * 0.98 });
  b.add(new THREE.SphereGeometry(0.04, 8, 6), FIXED, "#e3907a", { x: -0.11, y: headY - 0.05, z: r * 0.8, sz: 0.4, sy: 0.6 }); // mejillas
  b.add(new THREE.SphereGeometry(0.04, 8, 6), FIXED, "#e3907a", { x: 0.11, y: headY - 0.05, z: r * 0.8, sz: 0.4, sy: 0.6 });
}

function robe(b: SlotBuilder, hem: number, top: number, slot = ROBE) {
  b.add(new THREE.LatheGeometry([[0, 0.05], [hem, 0.05], [hem - 0.01, 0.2], [hem - 0.04, 0.42], [0.19, 0.58], [0.18, 0.68], [0.12, top], [0, top + 0.01]].map(([x, y]) => new THREE.Vector2(x, y)), 14), slot);
}

export type CrowdVariant = "hombre" | "mujer" | "nino" | "anciano" | "levita" | "noble";

function bodyGeometry(v: CrowdVariant): THREE.BufferGeometry {
  const b = new SlotBuilder();
  const headY = 0.97, r = 0.2;
  if (v === "mujer") robe(b, 0.27, 0.75);
  else if (v === "nino") robe(b, 0.23, 0.74);
  else robe(b, 0.25, 0.75);
  // cinto o faja
  b.add(new THREE.TorusGeometry(0.205, v === "levita" ? 0.04 : 0.026, 5, 16), ACCENT, "#fff", { y: 0.43, rx: Math.PI / 2 });
  if (v === "levita") {
    b.add(new THREE.BoxGeometry(0.06, 0.26, 0.02), ACCENT, "#fff", { x: 0.08, y: 0.3, z: 0.2, rz: 0.1 });
    b.add(new THREE.BoxGeometry(0.06, 0.22, 0.02), ACCENT, "#fff", { x: 0.15, y: 0.31, z: 0.17, rz: -0.08 });
  }
  // manto sobre los hombros
  if (v === "hombre" || v === "anciano" || v === "noble") {
    b.add(new THREE.LatheGeometry([[0.225, 0.4], [0.222, 0.56], [0.2, 0.7], [0.14, 0.77], [0.1, 0.78]].map(([x, y]) => new THREE.Vector2(x, y)), 14), ACCENT);
    if (v === "noble") for (let k = 0; k < 10; k++) b.add(new THREE.SphereGeometry(0.018, 4, 3), FIXED, C.oro, { x: Math.cos((k / 10) * 6.28) * 0.227, y: 0.41, z: Math.sin((k / 10) * 6.28) * 0.227 });
  }
  if (v === "mujer") b.add(new THREE.TorusGeometry(0.21, 0.035, 5, 16), ACCENT, "#fff", { y: 0.46, rx: Math.PI / 2 });
  // cuello y cabeza
  b.add(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 8), SKIN, "#fff", { y: 0.78 });
  b.add(new THREE.SphereGeometry(r, 14, 10), SKIN, "#fff", { y: headY });
  face(b, headY, r, v === "nino" ? 1.15 : 1);
  // cejas
  for (const sg of [-1, 1]) b.add(new THREE.BoxGeometry(0.06, 0.014, 0.01), HAIR, "#fff", { x: sg * 0.075, y: headY + 0.07, z: r * 0.875, rz: sg * -0.12 });
  switch (v) {
    case "hombre":
    case "anciano": {
      // turbante de tela con cordón y paño atrás
      b.add(new THREE.SphereGeometry(r + 0.018, 14, 6, 0, Math.PI * 2, 0, 1.12), HEAD, "#fff", { y: headY + 0.01 });
      b.add(new THREE.SphereGeometry(r + 0.016, 14, 8, OPEN_START, OPEN_LEN, 0, 1.85), HEAD, "#fff", { y: headY + 0.01 });
      b.add(new THREE.BoxGeometry(0.34, 0.3, 0.04), HEAD, "#fff", { y: headY - 0.14, z: -0.17, rx: 0.12 });
      b.add(new THREE.TorusGeometry(r + 0.01, 0.018, 5, 16), ACCENT, "#fff", { y: headY + 0.085, rx: Math.PI / 2 + 0.06 });
      if (v === "anciano") {
        b.add(new THREE.ConeGeometry(0.13, 0.34, 10), HAIR, "#fff", { y: headY - 0.2, z: 0.1, rx: Math.PI + 0.25 });
        b.add(new THREE.SphereGeometry(0.12, 10, 8), HAIR, "#fff", { y: headY - 0.09, z: 0.1, sx: 1.2, sy: 0.8, sz: 0.8 });
      } else b.add(new THREE.SphereGeometry(0.12, 10, 8), HAIR, "#fff", { y: headY - 0.1, z: 0.1, sx: 1.15, sy: 0.85, sz: 0.75 });
      break;
    }
    case "noble": {
      for (let k = 0; k < 3; k++) b.add(new THREE.TorusGeometry(r + 0.02 - k * 0.025, 0.04, 6, 16), HEAD, "#fff", { y: headY + 0.125 + k * 0.05, rx: Math.PI / 2 });
      b.add(new THREE.SphereGeometry(r * 0.75, 10, 6, 0, Math.PI * 2, 0, 1.4), HEAD, "#fff", { y: headY + 0.12 });
      b.add(new THREE.SphereGeometry(0.03, 6, 5), FIXED, C.oro, { y: headY + 0.13, z: r + 0.02 });
      b.add(new THREE.SphereGeometry(0.12, 10, 8), HAIR, "#fff", { y: headY - 0.1, z: 0.1, sx: 1.15, sy: 0.85, sz: 0.75 });
      break;
    }
    case "mujer": {
      // velo que enmarca la cara y cae por la espalda
      b.add(new THREE.SphereGeometry(r + 0.025, 14, 6, 0, Math.PI * 2, 0, 1.1), HEAD, "#fff", { y: headY + 0.005 });
      b.add(new THREE.SphereGeometry(r + 0.022, 14, 9, OPEN_START, OPEN_LEN, 0, 2.0), HEAD, "#fff", { y: headY + 0.005 });
      b.add(new THREE.LatheGeometry([[0.2, 0.5], [0.23, 0.62], [0.24, 0.8], [0.22, 0.92]].map(([x, y]) => new THREE.Vector2(x, y)), 14, Math.PI * 0.6, Math.PI * 0.8), HEAD, "#fff");
      b.add(new THREE.BoxGeometry(0.2, 0.03, 0.03), HAIR, "#fff", { y: headY + 0.12, z: r * 0.92 });
      for (const sg of [-1, 1]) b.add(new THREE.SphereGeometry(0.018, 5, 4), FIXED, C.oro, { x: sg * 0.2, y: headY - 0.07, z: 0.01 });
      break;
    }
    case "nino": {
      b.add(new THREE.SphereGeometry(r + 0.012, 14, 6, 0, Math.PI * 2, 0, 1.15), HAIR, "#fff", { y: headY + 0.012 });
      b.add(new THREE.SphereGeometry(r + 0.01, 14, 8, OPEN_START, OPEN_LEN, 0, 1.7), HAIR, "#fff", { y: headY + 0.012 });
      b.add(new THREE.SphereGeometry(0.06, 6, 5), HAIR, "#fff", { y: headY + 0.19, z: 0.06 });
      break;
    }
    case "levita": {
      b.add(new THREE.SphereGeometry(r + 0.012, 14, 6, 0, Math.PI * 2, 0, 1.15), HAIR, "#fff", { y: headY + 0.01 });
      b.add(new THREE.SphereGeometry(r + 0.01, 14, 8, OPEN_START, OPEN_LEN, 0, 1.7), HAIR, "#fff", { y: headY + 0.01 });
      b.add(new THREE.TorusGeometry(r + 0.012, 0.022, 5, 16), ACCENT, "#fff", { y: headY + 0.11, rx: Math.PI / 2 });
      b.add(new THREE.SphereGeometry(0.11, 10, 8), HAIR, "#fff", { y: headY - 0.11, z: 0.1, sx: 1.1, sy: 0.7, sz: 0.7 });
      break;
    }
  }
  return b.build();
}

function armGeometry(): THREE.BufferGeometry {
  const b = new SlotBuilder();
  b.add(new THREE.CylinderGeometry(0.06, 0.078, 0.3, 8), ROBE, "#fff", { y: -0.14 });
  b.add(new THREE.SphereGeometry(0.062, 8, 6), ROBE, "#fff", { y: 0 });
  b.add(new THREE.SphereGeometry(0.055, 8, 6), SKIN, "#fff", { y: -0.33 });
  return b.build();
}

function footGeometry(): THREE.BufferGeometry {
  const b = new SlotBuilder();
  b.add(new THREE.BoxGeometry(0.095, 0.05, 0.16), FIXED, "#6a4a2c", { y: 0.025, z: 0.02 });
  b.add(new THREE.SphereGeometry(0.045, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), SKIN, "#fff", { y: 0.04, z: 0.04, sz: 1.3 });
  return b.build();
}

// ---------------------------------------------------------------- el pueblo (instancias)
const tmpM = new THREE.Matrix4();
const tmpB = new THREE.Matrix4();
const tmpL = new THREE.Matrix4();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpV = new THREE.Vector3();
const tmpS = new THREE.Vector3();
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);

export type CrowdColors = { robe: string; accent: string; head: string; skin: string; hair: string };

class SlotPool {
  mesh: THREE.InstancedMesh;
  used: boolean[];
  attrs: THREE.InstancedBufferAttribute[];
  constructor(geo: THREE.BufferGeometry, mat: THREE.Material, cap: number) {
    this.attrs = [0, 1, 2, 3, 4].map((i) => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3);
      geo.setAttribute(`c${i}`, a);
      return a;
    });
    this.mesh = new THREE.InstancedMesh(geo, mat, cap);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    this.used = new Array(cap).fill(false);
  }
  alloc(): number {
    const i = this.used.indexOf(false);
    if (i < 0) return -1;
    this.used[i] = true;
    if (i + 1 > this.mesh.count) this.mesh.count = i + 1;
    return i;
  }
  free(i: number) {
    if (i < 0) return;
    this.used[i] = false;
    this.mesh.setMatrixAt(i, ZERO);
    let c = this.mesh.count;
    while (c > 0 && !this.used[c - 1]) c--;
    this.mesh.count = c;
  }
  setColors(i: number, cols: THREE.Color[]) {
    cols.forEach((c, k) => {
      this.attrs[k].setXYZ(i, c.r, c.g, c.b);
      this.attrs[k].needsUpdate = true;
    });
  }
}

export type CrowdHandle = { variant: CrowdVariant; body: number; arms: [number, number]; feet: [number, number] };

export class Crowd {
  group = new THREE.Group();
  private bodies: Record<CrowdVariant, SlotPool>;
  private arms: SlotPool;
  private feet: SlotPool;
  private mat = crowdMaterial();

  constructor(cap = 64) {
    const variants: CrowdVariant[] = ["hombre", "mujer", "nino", "anciano", "levita", "noble"];
    this.bodies = {} as Record<CrowdVariant, SlotPool>;
    for (const v of variants) {
      const pool = new SlotPool(bodyGeometry(v), this.mat, v === "levita" ? 16 : v === "noble" ? 6 : cap);
      this.bodies[v] = pool;
      this.group.add(pool.mesh);
    }
    this.arms = new SlotPool(armGeometry(), this.mat, cap * 4);
    this.feet = new SlotPool(footGeometry(), this.mat, cap * 4);
    this.group.add(this.arms.mesh, this.feet.mesh);
  }

  add(variant: CrowdVariant, colors: CrowdColors): CrowdHandle | null {
    const body = this.bodies[variant].alloc();
    if (body < 0) return null;
    const a1 = this.arms.alloc(), a2 = this.arms.alloc(), f1 = this.feet.alloc(), f2 = this.feet.alloc();
    const cols = [colors.robe, colors.accent, colors.head, colors.skin, colors.hair].map((h) => new THREE.Color(h));
    this.bodies[variant].setColors(body, cols);
    for (const a of [a1, a2]) this.arms.setColors(a, cols);
    for (const f of [f1, f2]) this.feet.setColors(f, cols);
    return { variant, body, arms: [a1, a2], feet: [f1, f2] };
  }

  remove(h: CrowdHandle) {
    this.bodies[h.variant].free(h.body);
    this.arms.free(h.arms[0]);
    this.arms.free(h.arms[1]);
    this.feet.free(h.feet[0]);
    this.feet.free(h.feet[1]);
  }

  update(h: CrowdHandle, r: Rig) {
    const p = computePose(r);
    const s = r.scale;
    // cuerpo
    tmpE.set(p.tilt, r.yaw, p.sway, "YXZ");
    tmpQ.setFromEuler(tmpE);
    tmpV.set(r.x, r.y + (p.bob - p.drop) * s, r.z);
    tmpS.set(s, s, s);
    tmpB.compose(tmpV, tmpQ, tmpS);
    this.bodies[h.variant].mesh.setMatrixAt(h.body, tmpB);
    // brazos (se cuelgan del hombro)
    for (let k = 0; k < 2; k++) {
      const sg = k === 0 ? -1 : 1;
      tmpE.set(k === 0 ? p.armL : p.armR, 0, sg * (k === 0 ? p.outL : p.outR), "XYZ");
      tmpQ.setFromEuler(tmpE);
      tmpV.set(sg * 0.215, 0.68, 0);
      tmpS.set(1, 1, 1);
      tmpL.compose(tmpV, tmpQ, tmpS);
      tmpM.multiplyMatrices(tmpB, tmpL);
      this.arms.mesh.setMatrixAt(h.arms[k], tmpM);
    }
    // pies
    tmpE.set(0, r.yaw, 0);
    tmpQ.setFromEuler(tmpE);
    tmpV.set(r.x, r.y - p.drop * s * 0.2, r.z);
    tmpS.set(s, s, s);
    tmpB.compose(tmpV, tmpQ, tmpS);
    for (let k = 0; k < 2; k++) {
      const sg = k === 0 ? -1 : 1;
      tmpL.makeTranslation(sg * 0.085, k === 0 ? p.liftL : p.liftR, k === 0 ? p.footL : p.footR);
      tmpM.multiplyMatrices(tmpB, tmpL);
      this.feet.mesh.setMatrixAt(h.feet[k], tmpM);
    }
  }

  flush() {
    for (const pool of Object.values(this.bodies)) pool.mesh.instanceMatrix.needsUpdate = true;
    this.arms.mesh.instanceMatrix.needsUpdate = true;
    this.feet.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    for (const pool of Object.values(this.bodies)) pool.mesh.geometry.dispose();
    this.arms.mesh.geometry.dispose();
    this.feet.mesh.geometry.dispose();
    this.mat.dispose();
  }
}

// colores del pueblo
const ROBES = ["#d9c7a0", "#b7884f", "#8f5a3a", "#6d7a4a", "#5a6f8f", "#9a4b3a", "#c9b48a", "#e0d6c2", "#a36b3f", "#7f8a6a"];
const ACCENTS = ["#7a2f2f", "#2f4a7a", "#c99a3b", "#4d6b2a", "#8a5a2a", "#5b3a6e", "#d4c4a0", "#3b5a5a", "#a8442f"];
const HEADS = ["#efe6d2", "#d8c8a6", "#b9a27a", "#8f3b2f", "#3f5a7a", "#e6dcc6", "#c9b07a"];
const SKINS = ["#c98c5f", "#b97a4f", "#d9a274", "#a86b45", "#e0b08a", "#8f5a3a"];
const HAIRS = ["#2b1d14", "#3b2a1e", "#1d1712", "#4a3526", "#6b4a32"];
const GREYS = ["#d9d4cc", "#bfb8ae", "#e8e4dc"];
const pk = <X>(a: readonly X[]) => a[Math.floor(Math.random() * a.length)];

const EXOTIC_ROBES = ["#f4f1ea", "#2a3f7a", "#7a1f3d", "#1f6b5c", "#c4632a", "#e8d36a"];
const EXOTIC_HEADS = ["#e04a2a", "#f2b632", "#2e9e8f", "#7d3c98", "#ffffff", "#1d4fa8"];
const EXOTIC_SKINS = ["#6b4226", "#8f5a3a", "#f0c8a0", "#5a3a22", "#d9a274"];

/** Una persona del pueblo; con `exotic`, a veces llega gente de tierras lejanas (1 Reyes 8:41-43). */
export function randomVisitor(exotic = false): { variant: CrowdVariant; colors: CrowdColors; scale: number } {
  const r = Math.random();
  const variant: CrowdVariant = r < 0.42 ? "hombre" : r < 0.82 ? "mujer" : r < 0.92 ? "anciano" : "nino";
  const far = exotic && variant !== "nino" && Math.random() < 0.28;
  const colors: CrowdColors = {
    robe: far ? pk(EXOTIC_ROBES) : pk(ROBES),
    accent: far ? pk(EXOTIC_HEADS) : pk(ACCENTS),
    head: far ? pk(EXOTIC_HEADS) : pk(HEADS),
    skin: far ? pk(EXOTIC_SKINS) : pk(SKINS),
    hair: variant === "anciano" ? pk(GREYS) : pk(HAIRS),
  };
  const scale = variant === "nino" ? 0.74 : variant === "mujer" ? 0.95 : variant === "anciano" ? 0.97 : 1;
  return { variant, colors, scale };
}

export function childColors(): CrowdColors {
  return { robe: pk(ROBES), accent: pk(ACCENTS), head: pk(HEADS), skin: pk(SKINS), hair: pk(HAIRS) };
}

export function leviteColors(sash: string): CrowdColors {
  return { robe: pk(["#efe6d2", "#e6dcc6", "#f2ead8"]), accent: sash, head: sash, skin: pk(SKINS), hair: pk(HAIRS) };
}

export function nobleColors(): CrowdColors {
  return { robe: pk(["#2f4a7a", "#7a2f2f", "#3b5a5a", "#5b3a6e"]), accent: pk(["#c99a3b", "#a8442f", "#d4c4a0"]), head: pk(["#efe6d2", "#c99a3b", "#e6dcc6"]), skin: pk(SKINS), hair: pk(HAIRS) };
}

// ---------------------------------------------------------------- personajes con vestiduras propias
export type FigureLook = "aprendiz" | "sacerdote" | "turno" | "principal" | "sumo" | "lino" | "azarias" | "rey";

const STONES = ["#b3242f", "#c9c24a", "#2e8b57", "#1f9e6e", "#2a4fbf", "#e8f4ff", "#e07a2a", "#8c8c8c", "#7d3c98", "#e6c84a", "#1d1a17", "#4f7a37"];

function figureParts(look: FigureLook) {
  const m = new GeoBuilder(), s = new GeoBuilder();
  const armM = new GeoBuilder(), armS = new GeoBuilder();
  const armLM = new GeoBuilder(), armLS = new GeoBuilder();
  const skin = look === "azarias" ? "#c48a5e" : look === "rey" ? "#bf8457" : "#d39a6c";
  const hair = look === "azarias" ? "#ece8e0" : look === "rey" ? "#2b1d14" : "#3b2a1e";
  const old = look === "azarias";
  const priestly = look !== "aprendiz" && look !== "rey";
  const high = look === "sumo" || look === "azarias";
  const linen = look === "lino" ? "#ffffff" : "#fbf8ef";
  const headY = 0.97, r = 0.2;
  const lathe = (pts: number[][], col: THREE.ColorRepresentation, t?: Tf, seg = 16) => m.lathe(pts as [number, number][], col, t, seg);

  // túnica
  let robeCol: string = linen;
  if (look === "aprendiz") robeCol = "#e2d3b4";
  if (look === "rey") robeCol = C.purpura;
  lathe([[0, 0.05], [0.26, 0.05], [0.25, 0.2], [0.22, 0.42], [0.19, 0.58], [0.18, 0.68], [0.12, 0.75], [0, 0.76]], robeCol);
  if (high) {
    // manto del efod, todo de azul, con campanillas de oro y granadas en el borde (Éxodo 28:31-35)
    lathe([[0.265, 0.2], [0.24, 0.42], [0.205, 0.58], [0.192, 0.7], [0.13, 0.765], [0.0, 0.77]], C.azul);
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2;
      const gold = k % 2 === 0;
      (gold ? s : m).sphere(gold ? 0.022 : 0.026, gold ? C.oro : pick3(k), { x: Math.cos(a) * 0.268, y: 0.19, z: Math.sin(a) * 0.268 }, 6, 5);
    }
    // efod de oro, azul, púrpura y carmesí, con su cinto
    lathe([[0.215, 0.36], [0.205, 0.5], [0.196, 0.62], [0.19, 0.7]], C.oro, undefined, 16);
    for (const [y, c] of [[0.39, C.azul], [0.44, C.purpura], [0.49, C.carmesi]] as [number, string][]) m.torus(0.214, 0.012, c, { y, rx: Math.PI / 2 }, 4, 18);
    s.torus(0.218, 0.025, C.oro, { y: 0.43, rx: Math.PI / 2 }, 5, 18);
    // hombreras con piedras de ónice (Éxodo 28:9-12)
    for (const sg of [-1, 1]) {
      s.box(0.1, 0.03, 0.14, C.oro, { x: sg * 0.13, y: 0.735, z: 0 });
      m.sphere(0.035, "#17463a", { x: sg * 0.13, y: 0.76, z: 0.02 }, 8, 6);
    }
    // pectoral con doce piedras en cuatro hileras (Éxodo 28:15-21)
    s.box(0.17, 0.19, 0.02, C.oro, { y: 0.6, z: 0.205, rx: -0.12 });
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 3; col++)
        m.box(0.035, 0.03, 0.02, STONES[row * 3 + col], { x: (col - 1) * 0.048, y: 0.665 - row * 0.042, z: 0.218 - row * 0.005, rx: -0.12 });
    for (const sg of [-1, 1]) s.cyl(0.006, 0.006, 0.14, C.oro, { x: sg * 0.08, y: 0.71, z: 0.17, rx: 0.6 }, 4); // cadenillas
  } else if (priestly) {
    // cinto de lino torcido, azul, púrpura y carmesí (Éxodo 39:29)
    const sash: [number, string][] = look === "lino" ? [[0.43, "#ffffff"], [0.46, "#f4f1ea"], [0.49, "#ffffff"]] : [[0.42, C.azul], [0.45, C.purpura], [0.48, C.carmesi]];
    for (const [y, c] of sash) m.torus(0.208, 0.016, c, { y, rx: Math.PI / 2 }, 5, 18);
    m.box(0.05, 0.3, 0.015, look === "lino" ? "#ffffff" : C.carmesi, { x: 0.07, y: 0.28, z: 0.21, rz: 0.06 });
    m.box(0.05, 0.26, 0.015, look === "lino" ? "#f4f1ea" : C.azul, { x: 0.13, y: 0.3, z: 0.19, rz: -0.08 });
  } else if (look === "aprendiz") {
    m.torus(0.206, 0.022, "#8a6a42", { y: 0.43, rx: Math.PI / 2 }, 5, 16);
    m.box(0.03, 0.2, 0.02, "#8a6a42", { x: 0.09, y: 0.33, z: 0.2 });
  } else if (look === "rey") {
    // manto carmesí con orla de oro
    lathe([[0.27, 0.12], [0.25, 0.4], [0.225, 0.58], [0.2, 0.7], [0.14, 0.77], [0.1, 0.78]], C.carmesi);
    s.torus(0.27, 0.014, C.oro, { y: 0.13, rx: Math.PI / 2 }, 4, 20);
    s.torus(0.21, 0.024, C.oro, { y: 0.45, rx: Math.PI / 2 }, 5, 18);
  }
  // cuello y cabeza
  m.cyl(0.06, 0.07, 0.08, skin, { y: 0.78 }, 8);
  m.sphere(r, skin, { y: headY }, 16, 12);
  for (const sg of [-1, 1]) {
    m.sphere(0.03, EYE, { x: sg * 0.075, y: headY + 0.02, z: r * 0.88, sz: 0.55 }, 8, 6);
    m.sphere(0.01, "#ffffff", { x: sg * 0.075 - 0.01, y: headY + 0.035, z: r * 0.9 + 0.012 }, 5, 4);
    m.sphere(0.035, skin, { x: sg * r * 0.98, y: headY - 0.01, z: 0, sz: 0.6 }, 6, 5);
    m.box(0.065, 0.016, 0.01, old ? "#f2efe8" : hair, { x: sg * 0.075, y: headY + 0.07, z: r * 0.875, rz: sg * -0.12 });
    m.sphere(0.04, "#e3907a", { x: sg * 0.11, y: headY - 0.05, z: r * 0.8, sz: 0.4, sy: 0.6 }, 8, 6);
  }
  m.sphere(0.03, skin, { y: headY - 0.025, z: r * 0.98 }, 6, 5);
  // barba y cabello
  if (old) {
    m.cone(0.14, 0.42, hair, { y: headY - 0.25, z: 0.1, rx: Math.PI + 0.22 }, 12);
    m.sphere(0.13, hair, { y: headY - 0.09, z: 0.1, sx: 1.2, sy: 0.8, sz: 0.8 }, 10, 8);
  } else if (look === "rey") {
    m.sphere(0.12, hair, { y: headY - 0.1, z: 0.1, sx: 1.15, sy: 0.85, sz: 0.75 }, 10, 8);
    m.cone(0.08, 0.16, hair, { y: headY - 0.2, z: 0.12, rx: Math.PI + 0.3 }, 8);
  }
  m.sphere(r + 0.012, hair, { y: headY + 0.012 }, 16, 6, Math.PI * 2, 1.15);
  m.add(new THREE.SphereGeometry(r + 0.01, 16, 8, OPEN_START, OPEN_LEN, 0, 1.7), hair, { y: headY + 0.01 });
  // tocados
  if (high) {
    // mitra de lino con la lámina de oro: SANTIDAD A JEHOVÁ (Éxodo 28:36-38)
    for (let k = 0; k < 4; k++) m.torus(r + 0.02 - k * 0.012, 0.045, linen, { y: headY + 0.135 + k * 0.06, rx: Math.PI / 2 }, 6, 18);
    m.sphere(r * 0.86, linen, { y: headY + 0.29 }, 14, 8, Math.PI * 2, 1.45);
    s.box(0.13, 0.045, 0.02, C.oro, { y: headY + 0.165, z: r + 0.055 });
    m.torus(r + 0.04, 0.008, C.azul, { y: headY + 0.165, rx: Math.PI / 2 }, 4, 18);
  } else if (priestly) {
    // tiara de lino (Éxodo 28:40)
    for (let k = 0; k < 2; k++) m.torus(r + 0.015 - k * 0.02, 0.04, linen, { y: headY + 0.135 + k * 0.055, rx: Math.PI / 2 }, 6, 18);
    m.sphere(r * 0.9, linen, { y: headY + 0.16 }, 14, 8, Math.PI * 2, 1.35);
  } else if (look === "rey") {
    s.cyl(r + 0.03, r + 0.02, 0.08, C.oro, { y: headY + 0.13 }, 16, true);
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      s.cone(0.03, 0.08, C.oro, { x: Math.cos(a) * (r + 0.025), y: headY + 0.21, z: Math.sin(a) * (r + 0.025) }, 5);
    }
    m.sphere(0.025, C.carmesi, { y: headY + 0.14, z: r + 0.04 }, 6, 5);
  }
  // brazos: manga y mano
  const sleeve = high ? C.azul : robeCol;
  for (const [bm, bs] of [[armM, armS], [armLM, armLS]] as [GeoBuilder, GeoBuilder][]) {
    bm.cyl(0.06, 0.078, 0.3, sleeve, { y: -0.14 }, 8);
    bm.sphere(0.062, sleeve, {}, 8, 6);
    if (high) bm.cyl(0.075, 0.078, 0.05, linen, { y: -0.29 }, 8);
    bm.sphere(0.055, skin, { y: -0.33 }, 8, 6);
    void bs;
  }
  // trompeta de plata (sacerdote de turno) e incensario de oro (principal)
  if (look === "turno") {
    armS.cyl(0.012, 0.012, 0.42, "#dfe4ea", { y: -0.36, z: 0.15, rx: 1.2 }, 6);
    armS.cone(0.045, 0.1, "#dfe4ea", { y: -0.44, z: 0.36, rx: -1.94 }, 10);
  }
  if (look === "principal" || look === "lino") {
    for (const dx of [-0.02, 0.02]) armLS.cyl(0.004, 0.004, 0.22, C.oro, { x: dx, y: -0.45, z: 0 }, 3);
    armLS.lathe([[0, 0], [0.05, 0.005], [0.07, 0.05], [0.065, 0.07], [0, 0.05]], C.oro, { y: -0.62 }, 10);
  }
  if (look === "rey") armS.cyl(0.012, 0.012, 0.7, C.oro, { y: -0.4, z: 0.08, rx: 0.2 }, 6);
  return { m, s, armM, armS, armLM, armLS };
}

function pick3(k: number) {
  return [C.azul, C.purpura, C.carmesi][Math.floor(k / 2) % 3];
}

/** Personaje con malla propia (aprendiz, Azarías, el rey). */
export class Figure {
  root = new THREE.Group();
  private body = new THREE.Group();
  private armL = new THREE.Group();
  private armR = new THREE.Group();
  private footL = new THREE.Group();
  private footR = new THREE.Group();
  look: FigureLook | null = null;

  constructor(look: FigureLook) {
    this.root.add(this.body, this.footL, this.footR);
    this.body.add(this.armL, this.armR);
    this.armL.position.set(-0.215, 0.68, 0);
    this.armR.position.set(0.215, 0.68, 0);
    const fb = new GeoBuilder();
    fb.box(0.095, 0.05, 0.16, "#6a4a2c", { y: 0.025, z: 0.02 });
    fb.sphere(0.045, "#d39a6c", { y: 0.04, z: 0.04, sz: 1.3 }, 6, 4, Math.PI * 2, Math.PI / 2);
    const fg = fb.build();
    for (const f of [this.footL, this.footR]) {
      const mesh = new THREE.Mesh(fg, matteFor());
      f.add(mesh);
    }
    this.footL.position.x = -0.085;
    this.footR.position.x = 0.085;
    this.setLook(look);
  }

  setLook(look: FigureLook) {
    if (this.look === look) return;
    this.look = look;
    for (const g of [this.body, this.armL, this.armR]) {
      for (const c of [...g.children]) {
        if (c === this.armL || c === this.armR) continue;
        g.remove(c);
        (c as THREE.Mesh).geometry?.dispose();
      }
    }
    const p = figureParts(look);
    const put = (g: THREE.Group, mb: GeoBuilder, sb: GeoBuilder) => {
      if (!mb.empty) g.add(new THREE.Mesh(mb.build(), matteFor()));
      if (!sb.empty) g.add(new THREE.Mesh(sb.build(), shinyMat()));
    };
    put(this.body, p.m, p.s);
    put(this.armR, p.armM, p.armS);
    put(this.armL, p.armLM, p.armLS);
    this.root.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = true;
    });
  }

  update(r: Rig) {
    const p = computePose(r);
    const s = r.scale;
    this.root.position.set(r.x, r.y, r.z);
    this.root.rotation.y = r.yaw;
    this.root.scale.setScalar(s);
    this.body.position.y = p.bob - p.drop;
    this.body.rotation.set(p.tilt, 0, p.sway);
    this.armL.rotation.set(p.armL, 0, -p.outL);
    this.armR.rotation.set(p.armR, 0, p.outR);
    this.footL.position.set(-0.085, p.liftL, p.footL);
    this.footR.position.set(0.085, p.liftR, p.footR);
  }

  dispose() {
    this.root.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
  }
}

let figMat: THREE.MeshLambertMaterial | null = null;
function matteFor() {
  if (!figMat) figMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  return figMat;
}

// ---------------------------------------------------------------- instrumentos de los cantores
export function instrument(kind: number): THREE.Group {
  const g = new THREE.Group();
  const m = new GeoBuilder(), s = new GeoBuilder();
  if (kind === 0) {
    // arpa (kinnor)
    m.box(0.04, 0.4, 0.04, C.cedro, { x: -0.1, y: 0.2, rz: 0.15 });
    m.box(0.04, 0.4, 0.04, C.cedro, { x: 0.1, y: 0.2, rz: -0.15 });
    m.box(0.3, 0.04, 0.05, C.cedroOsc, { y: 0.4 });
    m.box(0.2, 0.08, 0.08, C.cedro, { y: 0.02 });
    for (let k = 0; k < 6; k++) m.box(0.006, 0.36, 0.006, "#f0e6c8", { x: -0.08 + k * 0.032, y: 0.21 });
  } else if (kind === 1) {
    // címbalos de bronce
    s.cyl(0.11, 0.11, 0.015, C.bronce, { x: -0.1, y: 0.1, rz: 1.2 }, 14);
    s.cyl(0.11, 0.11, 0.015, C.bronce, { x: 0.1, y: 0.1, rz: -1.2 }, 14);
  } else {
    // salterio (nebel)
    m.lathe([[0, 0], [0.12, 0.02], [0.14, 0.12], [0.08, 0.24], [0, 0.24]], C.cedro, { y: 0, sz: 0.4 }, 10);
    m.box(0.03, 0.34, 0.03, C.cedroOsc, { y: 0.4 });
    for (let k = 0; k < 4; k++) m.box(0.005, 0.4, 0.005, "#f0e6c8", { x: -0.03 + k * 0.02, y: 0.3, z: 0.03 });
  }
  if (!m.empty) g.add(new THREE.Mesh(m.build(), matteFor()));
  if (!s.empty) g.add(new THREE.Mesh(s.build(), shinyMat()));
  return g;
}

// ---------------------------------------------------------------- sombras redondas bajo los pies
export class BlobShadows {
  mesh: THREE.InstancedMesh;
  private n = 0;
  constructor(cap = 160) {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 2, 32, 32, 31);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(0.6, "rgba(0,0,0,0.28)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    const geo = new THREE.PlaneGeometry(0.75, 0.75).rotateX(-Math.PI / 2);
    this.mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }), cap);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    this.mesh.count = 0;
  }
  begin() {
    this.n = 0;
  }
  add(x: number, y: number, z: number, s = 1) {
    if (this.n >= this.mesh.instanceMatrix.count) return;
    tmpM.makeScale(s, 1, s);
    tmpM.setPosition(x, y + 0.012, z);
    this.mesh.setMatrixAt(this.n++, tmpM);
  }
  end() {
    this.mesh.count = this.n;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
  dispose() {
    this.mesh.geometry.dispose();
    const mat = this.mesh.material as THREE.MeshBasicMaterial;
    mat.map?.dispose();
    mat.dispose();
  }
}
