/**
 * Piezas 3D dibujadas en código. Cada estructura se arma con figuras simples (cajas, cilindros,
 * esferas, tornos) pintadas por vértice y se une en UNA sola malla: así el celular dibuja todo
 * el templo con pocas llamadas a la tarjeta de video.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const C = {
  piedra: "#e3d5b6",
  piedraOsc: "#cdbb95",
  piedraClara: "#efe4c9",
  junta: "#b9a37a",
  arena: "#d9c49a",
  tierra: "#b79a6a",
  cedro: "#8a5a32",
  cedroOsc: "#5e3a1f",
  oro: "#e2b33c",
  oroOsc: "#b88a1e",
  bronce: "#b8763b",
  bronceOsc: "#7d4a22",
  lino: "#f5f1e6",
  linoSombra: "#ddd6c4",
  azul: "#27468f",
  purpura: "#5b2a6e",
  carmesi: "#b3242f",
  verdeOliva: "#5f6f2c",
  hoja: "#4f7a37",
  hojaClara: "#6f9a48",
  agua: "#5aa7c8",
  ceniza: "#4a4440",
  brasa: "#ff7a1a",
  piel: "#c98c5f",
  pielClara: "#e0a77a",
  pielOsc: "#9c6440",
  pelo: "#3b2a1e",
  peloCanoso: "#d9d4cc",
  negro: "#1d1a17",
  blanco: "#ffffff",
} as const;

const tmpColor = new THREE.Color();
const tmpMatrix = new THREE.Matrix4();
const tmpQuat = new THREE.Quaternion();
const tmpEuler = new THREE.Euler();
const tmpScale = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

export type Tf = {
  x?: number; y?: number; z?: number;
  rx?: number; ry?: number; rz?: number;
  sx?: number; sy?: number; sz?: number;
};

export function matrixOf(t: Tf = {}): THREE.Matrix4 {
  tmpPos.set(t.x || 0, t.y || 0, t.z || 0);
  tmpEuler.set(t.rx || 0, t.ry || 0, t.rz || 0);
  tmpQuat.setFromEuler(tmpEuler);
  tmpScale.set(t.sx ?? 1, t.sy ?? 1, t.sz ?? 1);
  return tmpMatrix.clone().compose(tmpPos, tmpQuat, tmpScale);
}

/** Junta figuras pintadas en una geometría (con color por vértice). */
export class GeoBuilder {
  private parts: THREE.BufferGeometry[] = [];

  add(geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, t?: Tf | THREE.Matrix4, jitter = 0) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    geo.dispose();
    if (t) g.applyMatrix4(t instanceof THREE.Matrix4 ? t : matrixOf(t));
    for (const name of Object.keys(g.attributes)) if (name !== "position" && name !== "normal") g.deleteAttribute(name);
    if (!g.attributes.normal) g.computeVertexNormals();
    tmpColor.set(color);
    const n = g.attributes.position.count;
    const colors = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const k = jitter ? 1 + (Math.random() - 0.5) * jitter : 1;
      colors[i * 3] = tmpColor.r * k;
      colors[i * 3 + 1] = tmpColor.g * k;
      colors[i * 3 + 2] = tmpColor.b * k;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    this.parts.push(g);
    return this;
  }

  box(w: number, h: number, d: number, color: THREE.ColorRepresentation, t?: Tf, jitter = 0) {
    return this.add(new THREE.BoxGeometry(w, h, d), color, t, jitter);
  }

  cyl(rTop: number, rBottom: number, h: number, color: THREE.ColorRepresentation, t?: Tf, seg = 12, open = false) {
    return this.add(new THREE.CylinderGeometry(rTop, rBottom, h, seg, 1, open), color, t);
  }

  sphere(r: number, color: THREE.ColorRepresentation, t?: Tf, ws = 10, hs = 8, phiLen = Math.PI * 2, thetaLen = Math.PI) {
    return this.add(new THREE.SphereGeometry(r, ws, hs, 0, phiLen, 0, thetaLen), color, t);
  }

  cone(r: number, h: number, color: THREE.ColorRepresentation, t?: Tf, seg = 10) {
    return this.add(new THREE.ConeGeometry(r, h, seg), color, t);
  }

  torus(r: number, tube: number, color: THREE.ColorRepresentation, t?: Tf, rs = 6, ts = 16) {
    return this.add(new THREE.TorusGeometry(r, tube, rs, ts), color, t);
  }

  lathe(points: [number, number][], color: THREE.ColorRepresentation, t?: Tf, seg = 16) {
    return this.add(new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg), color, t);
  }

  /** Agrega una geometría que ya trae posición, normal y color (sin índice). */
  raw(geo: THREE.BufferGeometry) {
    this.parts.push(geo);
    return this;
  }

  /** Agrega una figura plana (por ejemplo un arco) ya armada como geometría de three. */
  shape(geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, t?: Tf) {
    return this.add(geo, color, t);
  }

  get empty() {
    return this.parts.length === 0;
  }

  build(): THREE.BufferGeometry {
    const merged = mergeGeometries(this.parts, false) || new THREE.BufferGeometry();
    for (const p of this.parts) p.dispose();
    this.parts = [];
    merged.computeBoundingSphere();
    return merged;
  }
}

// Materiales compartidos: mate (Lambert) y brillante para el oro y el bronce (Phong).
let matte: THREE.MeshLambertMaterial | null = null;
let shiny: THREE.MeshPhongMaterial | null = null;

export function matteMat() {
  if (!matte) matte = new THREE.MeshLambertMaterial({ vertexColors: true });
  return matte;
}

export function shinyMat() {
  if (!shiny) shiny = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 70, specular: new THREE.Color("#7a5a20") });
  return shiny;
}

/** Arma un grupo con una malla mate y otra brillante (si hay piezas de metal). */
export function meshPair(matteB: GeoBuilder, shinyB?: GeoBuilder, shadows = true): THREE.Group {
  const g = new THREE.Group();
  if (!matteB.empty) {
    const m = new THREE.Mesh(matteB.build(), matteMat());
    m.castShadow = shadows;
    m.receiveShadow = true;
    g.add(m);
  }
  if (shinyB && !shinyB.empty) {
    const s = new THREE.Mesh(shinyB.build(), shinyMat());
    s.castShadow = shadows;
    s.receiveShadow = true;
    g.add(s);
  }
  return g;
}

export function disposeGroup(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
  });
}
