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

// ---------------------------------------------------------------- textura de las superficies
/**
 * La textura de todo lo que se arma con GeoBuilder, calculada en la tarjeta de video (sin imágenes que bajar): según
 * el color de cada cara se sabe si es piedra o estuco (vetas, manchas y relieve), madera (veta), hojas, tela (trama)
 * o metal (cepillado). Se mira la posición en el mundo, así que no hacen falta coordenadas de textura, y se apaga de
 * a poco a lo lejos (para que no titile). En equipos modestos va más simple y sin relieve.
 */
let detalleBajo = (() => {
  try {
    const nucleos = navigator.hardwareConcurrency || 4;
    const memoria = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    const tactil = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    return tactil && (nucleos <= 4 || memoria <= 3);
  } catch {
    return false;
  }
})();
export function configurarDetalle(bajo: boolean) {
  detalleBajo = bajo;
}

const DETALLE_PARS = `
varying vec3 vMundo;
float dHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float dRuido(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(dHash(i), dHash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(dHash(i + vec3(0.0, 1.0, 0.0)), dHash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
             mix(mix(dHash(i + vec3(0.0, 0.0, 1.0)), dHash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(dHash(i + vec3(0.0, 1.0, 1.0)), dHash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
}
`;

const DETALLE_COLOR = `
#include <color_fragment>
float dLejos = 1.0 - smoothstep(22.0, 70.0, length(vViewPosition)) * 0.8;
// el color como se ve (los colores de las caras están en espacio lineal)
vec3 dc = sqrt(max(diffuseColor.rgb, vec3(0.0)));
float dMx = max(dc.r, max(dc.g, dc.b));
float dMn = min(dc.r, min(dc.g, dc.b));
float dSat = (dMx - dMn) / max(dMx, 0.001);
float dLum = dot(dc, vec3(0.299, 0.587, 0.114));
#ifdef DETALLE_METAL
float dVerde = 0.0; float dMadera = 0.0; float dPiedra = 0.0; float dTela = 0.0; float dMetal = 1.0;
#else
float dVerde = step(dc.r * 1.04, dc.g) * step(dc.b, dc.g) * step(0.12, dSat);
// madera: marrón anaranjado, no muy clara
float dMadera = (1.0 - dVerde) * step(0.3, dSat) * step(dLum, 0.5) * step(dc.r * 0.42, dc.g) * step(dc.g, dc.r * 0.88) * step(dc.b, dc.g * 0.85);
float dPiedra = (1.0 - dVerde) * (1.0 - dMadera) * step(dSat, 0.42) * step(0.25, dLum);
float dTela = (1.0 - dVerde) * (1.0 - dMadera) * (1.0 - dPiedra);
float dMetal = 0.0;
#endif
vec3 dp = vMundo;
#ifdef DETALLE_BAJO
float dH = dRuido(dp * 2.1);
#else
float dH = dPiedra * (dRuido(dp * 0.9) * 0.65 + dRuido(dp * 3.2) * 0.35)
         + dMadera * (dRuido(dp * vec3(1.4, 5.5, 1.4)) * 0.55 + dRuido(dp * vec3(5.5, 1.0, 5.5)) * 0.45)
         + dVerde * dRuido(dp * 5.5)
         + dTela * dRuido(dp * 11.0)
         + dMetal * dRuido(dp * vec3(22.0, 1.5, 22.0));
#endif
float dAmp = (dPiedra * 0.15 + dMadera * 0.17 + dVerde * 0.24 + dTela * 0.06 + dMetal * 0.1) * dLejos;
diffuseColor.rgb *= 1.0 + (dH - 0.5) * dAmp;
// manchas de tiempo y de lluvia en la piedra
diffuseColor.rgb *= 1.0 - dPiedra * smoothstep(0.62, 0.94, dRuido(dp * 0.3 + 3.7)) * 0.1 * dLejos;
`;

const DETALLE_RELIEVE = `
#include <normal_fragment_maps>
#ifndef DETALLE_BAJO
{
  vec3 dPv = -vViewPosition;
  vec3 dPx = dFdx(dPv);
  vec3 dPy = dFdy(dPv);
  float dHx = dFdx(dH);
  float dHy = dFdy(dH);
  vec3 dR1 = cross(dPy, normal);
  vec3 dR2 = cross(normal, dPx);
  float dDet = dot(dPx, dR1);
  vec3 dGrad = sign(dDet) * (dHx * dR1 + dHy * dR2);
  float dFuerza = (dPiedra * 0.24 + dMadera * 0.14 + dVerde * 0.2 + dTela * 0.05 + dMetal * 0.1) * dLejos;
  normal = normalize(abs(dDet) * normal - dGrad * dFuerza);
}
#endif
`;

function conDetalle<M extends THREE.MeshLambertMaterial | THREE.MeshPhongMaterial>(mat: M, metal: boolean): M {
  mat.onBeforeCompile = (shader) => {
    if (metal) shader.defines = { ...(shader.defines ?? {}), DETALLE_METAL: "" };
    if (detalleBajo) shader.defines = { ...(shader.defines ?? {}), DETALLE_BAJO: "" };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMundo;")
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
vec4 dMundo = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
dMundo = instanceMatrix * dMundo;
#endif
vMundo = (modelMatrix * dMundo).xyz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${DETALLE_PARS}`)
      .replace("#include <color_fragment>", DETALLE_COLOR)
      .replace("#include <normal_fragment_maps>", DETALLE_RELIEVE);
  };
  mat.customProgramCacheKey = () => `templo-detalle-${metal ? "metal" : "mate"}-${detalleBajo ? "bajo" : "alto"}`;
  return mat;
}

// Materiales compartidos: mate (Lambert) y brillante para el oro y el bronce (Phong), los dos con textura.
let matte: THREE.MeshLambertMaterial | null = null;
let shiny: THREE.MeshPhongMaterial | null = null;

export function matteMat() {
  if (!matte) matte = conDetalle(new THREE.MeshLambertMaterial({ vertexColors: true }), false);
  return matte;
}

export function shinyMat() {
  if (!shiny) shiny = conDetalle(new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 70, specular: new THREE.Color("#7a5a20") }), true);
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
