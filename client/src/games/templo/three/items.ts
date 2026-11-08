/**
 * Las cosas que se cargan y se apilan: leña, aceite, panes, incienso, corderos, palomas,
 * ofrendas de flor de harina y diezmos. Cada tipo es una sola malla con muchas copias.
 */
import * as THREE from "three";
import { C, GeoBuilder, matteMat } from "./builder";
import type { ItemType } from "../data";

/** Alto de cada cosa cuando se apila. */
export const ITEM_HEIGHT: Record<ItemType, number> = {
  lena: 0.14,
  aceite: 0.3,
  pan: 0.075,
  incienso: 0.15,
  cordero: 0.34,
  palomas: 0.27,
  cereal: 0.17,
  diezmo: 0.3,
};

export const OFFERINGS: ItemType[] = ["cordero", "palomas", "cereal"];
export const isOffering = (t: ItemType) => t === "cordero" || t === "palomas" || t === "cereal";
/** Lo que se puede llevar junto: las ofrendas del pueblo van juntas; lo demás, cada cosa por su lado. */
export const itemGroup = (t: ItemType) => (isOffering(t) ? "ofrenda" : t);

function itemGeometry(t: ItemType): THREE.BufferGeometry {
  const b = new GeoBuilder();
  switch (t) {
    case "lena":
      for (const [x, y, z] of [[0, 0.05, -0.055], [0, 0.05, 0.055], [0, 0.105, 0]]) {
        b.cyl(0.05, 0.055, 0.42, "#8a5a32", { x, y, z, rz: Math.PI / 2 }, 7);
        b.cyl(0.046, 0.046, 0.43, "#d2a679", { x, y, z, rz: Math.PI / 2 }, 7);
      }
      b.torus(0.085, 0.008, "#6b5a3a", { x: 0.1, y: 0.075, z: 0, ry: Math.PI / 2 }, 4, 12);
      break;
    case "aceite":
      b.lathe([[0, 0], [0.07, 0], [0.11, 0.06], [0.12, 0.15], [0.09, 0.23], [0.045, 0.27], [0.055, 0.3], [0, 0.3]], "#b8673a", undefined, 12);
      b.cyl(0.042, 0.042, 0.01, "#5f6b1f", { y: 0.297 }, 10);
      b.torus(0.045, 0.012, "#a35a31", { x: 0.1, y: 0.2, ry: Math.PI / 2 }, 4, 10);
      b.torus(0.12, 0.008, "#8a4a2a", { y: 0.15, rx: Math.PI / 2 }, 4, 16);
      break;
    case "pan":
      b.lathe([[0, 0], [0.14, 0], [0.16, 0.025], [0.14, 0.055], [0.08, 0.072], [0, 0.074]], "#d39a52", undefined, 14);
      b.box(0.2, 0.006, 0.014, "#a8702e", { y: 0.072, ry: 0.4 });
      b.box(0.2, 0.006, 0.014, "#a8702e", { y: 0.072, ry: -0.4 });
      break;
    case "incienso":
      b.lathe([[0, 0], [0.08, 0], [0.12, 0.05], [0.13, 0.08], [0.11, 0.075], [0, 0.04]], C.oro, undefined, 12);
      b.sphere(0.085, "#f6f0e2", { y: 0.075, sy: 0.6 }, 10, 6);
      for (let k = 0; k < 5; k++) b.sphere(0.022, "#e8d9a8", { x: Math.cos(k * 1.3) * 0.06, y: 0.11, z: Math.sin(k * 1.3) * 0.06 }, 5, 4);
      b.box(0.012, 0.09, 0.012, "#5f7a3a", { x: 0.03, y: 0.14, z: -0.02, rz: 0.3 });
      break;
    case "cordero": {
      // corderito sin defecto (Éxodo 12:5): lana blanca, cara clara y patitas oscuras
      for (const [x, y, z, r] of [[0, 0.17, 0, 0.12], [0.08, 0.18, 0.03, 0.09], [-0.08, 0.18, -0.02, 0.09], [0.02, 0.24, -0.06, 0.08], [-0.03, 0.23, 0.07, 0.08]] as number[][])
        b.sphere(r, "#f7f3ea", { x, y, z }, 8, 6);
      b.sphere(0.075, "#f1e2cf", { x: 0, y: 0.25, z: 0.15, sz: 1.15 }, 10, 8);
      b.sphere(0.05, "#f7f3ea", { x: 0, y: 0.31, z: 0.13 }, 6, 5);
      for (const sg of [-1, 1]) {
        b.sphere(0.012, "#1d1a17", { x: sg * 0.035, y: 0.27, z: 0.215 }, 5, 4);
        b.box(0.07, 0.025, 0.035, "#e8cdb4", { x: sg * 0.085, y: 0.27, z: 0.12, rz: sg * -0.5 });
        for (const fz of [-0.08, 0.08]) b.cyl(0.018, 0.016, 0.1, "#3b2f2a", { x: sg * 0.06, y: 0.05, z: fz }, 5);
      }
      b.sphere(0.03, "#f7f3ea", { x: 0, y: 0.2, z: -0.15 }, 5, 4);
      break;
    }
    case "palomas":
      b.lathe([[0, 0], [0.13, 0], [0.16, 0.08], [0.17, 0.12], [0.15, 0.12], [0.13, 0.04], [0, 0.03]], "#a8814e", undefined, 12);
      for (const k of [0.05, 0.09]) b.torus(0.155, 0.008, "#8a6a3e", { y: k, rx: Math.PI / 2 }, 4, 14);
      b.add(new THREE.TorusGeometry(0.15, 0.01, 4, 14, Math.PI), "#8a6a3e", { y: 0.12, ry: Math.PI / 2 });
      for (const sg of [-1, 1]) {
        b.sphere(0.06, "#fbfbf8", { x: sg * 0.06, y: 0.15, z: 0, sz: 1.4 }, 8, 6);
        b.sphere(0.04, "#fbfbf8", { x: sg * 0.06, y: 0.2, z: 0.06 }, 8, 6);
        b.cone(0.012, 0.03, "#e3a04a", { x: sg * 0.06, y: 0.2, z: 0.1, rx: Math.PI / 2 }, 5);
        b.sphere(0.008, "#1d1a17", { x: sg * 0.06 + sg * 0.03, y: 0.21, z: 0.075 }, 4, 3);
        b.box(0.02, 0.05, 0.1, "#e9e7e0", { x: sg * 0.06 + sg * 0.05, y: 0.15, z: -0.01, rz: sg * 0.4 });
      }
      break;
    case "cereal":
      // flor de harina con aceite e incienso (Levítico 2:1)
      b.lathe([[0, 0], [0.1, 0], [0.15, 0.05], [0.17, 0.1], [0.155, 0.1], [0.13, 0.06], [0, 0.05]], "#c27b45", undefined, 14);
      b.sphere(0.13, "#f6f1e4", { y: 0.09, sy: 0.45 }, 12, 6);
      b.cyl(0.04, 0.05, 0.01, "#d9b44a", { x: 0.03, y: 0.145, z: 0.02 }, 8);
      b.sphere(0.025, "#efe2b8", { x: -0.04, y: 0.15, z: -0.03 }, 5, 4);
      break;
    case "diezmo":
      b.lathe([[0, 0], [0.12, 0], [0.15, 0.08], [0.15, 0.17], [0.11, 0.24], [0.05, 0.26], [0.07, 0.3], [0, 0.3]], "#cdb98c", undefined, 12);
      b.torus(0.055, 0.012, "#7a5a32", { y: 0.255, rx: Math.PI / 2 }, 4, 10);
      for (let k = 0; k < 4; k++) b.sphere(0.02, "#d9b44a", { x: Math.cos(k * 1.6) * 0.06, y: 0.29, z: Math.sin(k * 1.6) * 0.04 }, 4, 3);
      break;
  }
  return b.build();
}

const tmp = new THREE.Matrix4();
const q = new THREE.Quaternion();
const e = new THREE.Euler();
const p = new THREE.Vector3();
const sc = new THREE.Vector3();

export class ItemRenderer {
  group = new THREE.Group();
  private meshes = {} as Record<ItemType, THREE.InstancedMesh>;
  private counts = {} as Record<ItemType, number>;

  constructor(cap = 110) {
    for (const t of Object.keys(ITEM_HEIGHT) as ItemType[]) {
      const m = new THREE.InstancedMesh(itemGeometry(t), matteMat(), cap);
      m.count = 0;
      m.frustumCulled = false;
      m.castShadow = false;
      m.receiveShadow = true;
      this.meshes[t] = m;
      this.counts[t] = 0;
      this.group.add(m);
    }
  }

  begin() {
    for (const t in this.counts) this.counts[t as ItemType] = 0;
  }

  add(t: ItemType, x: number, y: number, z: number, yaw = 0, s = 1, tilt = 0) {
    const mesh = this.meshes[t];
    const n = this.counts[t];
    if (n >= mesh.instanceMatrix.count) return;
    e.set(tilt, yaw, 0, "YXZ");
    q.setFromEuler(e);
    p.set(x, y, z);
    sc.set(s, s, s);
    tmp.compose(p, q, sc);
    mesh.setMatrixAt(n, tmp);
    this.counts[t] = n + 1;
  }

  end() {
    for (const t of Object.keys(this.meshes) as ItemType[]) {
      const m = this.meshes[t];
      m.count = this.counts[t];
      m.instanceMatrix.needsUpdate = true;
    }
  }

  dispose() {
    for (const m of Object.values(this.meshes)) m.geometry.dispose();
  }
}
