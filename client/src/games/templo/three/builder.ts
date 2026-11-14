/**
 * Piezas 3D dibujadas en código. Cada estructura se arma con figuras simples (cajas, cilindros,
 * esferas, tornos) pintadas por vértice y se une en UNA sola malla: así el celular dibuja todo
 * el templo con pocas llamadas a la tarjeta de video.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { conFuegos } from "./luces";

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

  /** Une todo en una geometría. Con `oclusion` (por defecto) lo de abajo de los costados queda un poco más oscuro. */
  build(oclusion = true): THREE.BufferGeometry {
    const merged = mergeGeometries(this.parts, false) || new THREE.BufferGeometry();
    for (const p of this.parts) p.dispose();
    this.parts = [];
    if (oclusion) hornearOclusion(merged);
    merged.computeBoundingSphere();
    return merged;
  }
}

/** Para los personajes: sin oclusión horneada (les ensuciaría el ruedo y los pies). */
export class GeoFigura extends GeoBuilder {
  build(): THREE.BufferGeometry {
    return super.build(false);
  }
}

/**
 * La oclusión horneada (docs/guia-visual.md, sección 3): en las caras de los costados (no en los pisos ni en las mesas),
 * lo que está cerca del suelo de la malla se oscurece un poco, como en los rincones de verdad. Así todo queda asentado en
 * el piso aunque el aparato no calcule la oclusión en pantalla. Cuesta solo al armar la malla.
 */
const OCLUSION_ALTO = 0.5;
const OCLUSION_MIN = 0.68;
function hornearOclusion(g: THREE.BufferGeometry) {
  const pos = g.attributes.position, nor = g.attributes.normal, col = g.attributes.color;
  if (!pos || !nor || !col) return;
  let yMin = Infinity;
  for (let i = 0; i < pos.count; i++) yMin = Math.min(yMin, pos.getY(i));
  for (let i = 0; i < pos.count; i++) {
    // las caras de arriba y de abajo no (el piso no se oscurece entero)
    if (Math.abs(nor.getY(i)) > 0.75) continue;
    const h = pos.getY(i) - yMin;
    if (h >= OCLUSION_ALTO) continue;
    const s = h / OCLUSION_ALTO;
    const k = OCLUSION_MIN + (1 - OCLUSION_MIN) * s * s * (3 - 2 * s);
    col.setXYZ(i, col.getX(i) * k, col.getY(i) * k, col.getZ(i) * k);
  }
  col.needsUpdate = true;
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
/**
 * El reloj de los materiales (el viento en las hojas y el brillo del agua): lo avanza el mundo que se dibuja. Lo usan
 * también la hierba de la ciudad (ciudad/suelo-vivo.ts), para que todo se mezca con el mismo viento.
 */
export const tiempoMateriales = { value: 0 };
export function avanzarMateriales(dt: number) {
  tiempoMateriales.value = (tiempoMateriales.value + dt) % 3600;
}

export function configurarDetalle(bajo: boolean) {
  detalleBajo = bajo;
}

/** Las ondas del agua: la inclinación de la superficie en (q = x, z del mundo) al tiempo w. */
const ONDAS = `
vec2 ondasAgua(vec2 q, float w) {
  float gx = cos(q.x * 9.0 + w * 3.1 + sin(q.y * 6.0 + w)) * 0.6 + cos((q.x + q.y) * 14.0 - w * 4.2) * 0.4;
  float gz = cos(q.y * 8.0 - w * 2.7 + sin(q.x * 5.0 - w * 0.8)) * 0.6 + cos((q.x - q.y) * 12.0 + w * 3.6) * 0.4;
  return vec2(gx, gz);
}
`;

const DETALLE_PARS = `
varying vec3 vMundo;
uniform float uTiempo;
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
// lo acostado (un piso, una mesa): el metal pulido y la tierra apisonada van más lisos
#ifdef FLAT_SHADED
float dAcostada = 0.0;
#else
float dAcostada = step(0.85, dot(normalize(vNormal), normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0))));
#endif
float dAmp = (dPiedra * 0.15 + dMadera * 0.17 + dVerde * 0.24 + dTela * 0.06 + dMetal * 0.1 * (1.0 - 0.6 * dAcostada)) * dLejos;
diffuseColor.rgb *= 1.0 + (dH - 0.5) * dAmp;
// el agua (azul claro): un brillo que se mueve
float dAgua = (1.0 - dMetal) * step(dc.r * 1.25, dc.b) * step(dc.g * 0.95, dc.b) * step(0.45, dLum) * step(0.25, dSat);
diffuseColor.rgb *= 1.0 + dAgua * (sin(uTiempo * 2.2 + dp.x * 3.1 + sin(dp.z * 2.7 + uTiempo * 1.3) * 1.5) * 0.09 + 0.03);
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
  // la tela acostada (la tierra apisonada de un piso, una alfombra) casi sin relieve: con la luz baja de una lámpara se
  // veía ondulada como la arena; y el metal acostado (el piso de oro) pulido, no arrugado
  float dFuerza = (dPiedra * 0.24 + dMadera * 0.14 + dVerde * 0.2 + dTela * 0.05 * (1.0 - 0.8 * dAcostada) + dMetal * 0.1 * (1.0 - 0.85 * dAcostada)) * dLejos;
  normal = normalize(abs(dDet) * normal - dGrad * dFuerza);
}
#endif
// el agua acostada (la superficie de un pozo, una fuente o un estanque): ondas que se mueven y le cambian la normal
float dAguaN = dAgua * step(0.85, dot(normal, normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0))));
#ifndef DETALLE_BAJO
if (dAguaN > 0.0) {
  vec2 dOnda = ondasAgua(vMundo.xz, uTiempo);
  normal = normalize(normal + mat3(viewMatrix) * vec3(dOnda.x, 0.0, dOnda.y) * 0.14 * dLejos);
}
#endif
`;

/**
 * El brillo del agua (docs/guia-visual.md, sección 7): el cielo que se refleja, más fuerte a ras del agua, y el destello
 * del sol en las ondas. Solo en el agua acostada que reconoce DETALLE_COLOR.
 */
const DETALLE_AGUA = `
#if NUM_DIR_LIGHTS > 0
if (dAguaN > 0.0) {
  vec3 dV = normalize(vViewPosition);
  vec3 dL = directionalLights[0].direction;
  float dEsp = pow(max(dot(normal, normalize(dL + dV)), 0.0), 90.0);
  float dFres = pow(1.0 - max(dot(normal, dV), 0.0), 4.0);
  vec3 dSol = directionalLights[0].color;
  outgoingLight = mix(outgoingLight, outgoingLight * 0.55 + vec3(0.62, 0.74, 0.86) * dSol * 0.45, clamp(dFres * 0.85 + 0.12, 0.0, 1.0) * dAguaN);
  outgoingLight += dSol * dEsp * 1.25 * dAguaN;
}
#endif
#include <opaque_fragment>
`;

function conDetalle<M extends THREE.MeshLambertMaterial | THREE.MeshPhongMaterial>(mat: M, metal: boolean): M {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTiempo = tiempoMateriales;
    if (metal) shader.defines = { ...(shader.defines ?? {}), DETALLE_METAL: "" };
    if (detalleBajo) shader.defines = { ...(shader.defines ?? {}), DETALLE_BAJO: "" };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMundo;\nuniform float uTiempo;")
      .replace(
        "#include <project_vertex>",
        `#if defined(USE_COLOR) && !defined(DETALLE_METAL)
{
  // el viento mueve un poco las hojas (lo verde)
  vec3 vc = sqrt(max(color.rgb, vec3(0.0)));
  float vMx = max(vc.r, max(vc.g, vc.b));
  float vHoja = step(vc.r * 1.04, vc.g) * step(vc.b, vc.g) * step(0.12, (vMx - min(vc.r, min(vc.g, vc.b))) / max(vMx, 0.001));
  vec4 vW = modelMatrix * vec4(transformed, 1.0);
  transformed.x += sin(uTiempo * 1.6 + vW.x * 0.7 + vW.z * 0.5) * 0.03 * vHoja;
  transformed.z += cos(uTiempo * 1.3 + vW.z * 0.6 + vW.x * 0.3) * 0.022 * vHoja;
}
#endif
#include <project_vertex>
vec4 dMundo = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
dMundo = instanceMatrix * dMundo;
#endif
vMundo = (modelMatrix * dMundo).xyz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${DETALLE_PARS}\n${ONDAS}`)
      .replace("#include <color_fragment>", DETALLE_COLOR)
      .replace("#include <normal_fragment_maps>", DETALLE_RELIEVE)
      .replace("#include <opaque_fragment>", DETALLE_AGUA);
  };
  mat.customProgramCacheKey = () => `templo-detalle-${metal ? "metal" : "mate"}-${detalleBajo ? "bajo" : "alto"}`;
  return mat;
}

/** El agua que tiene su propio material con brillo (el mar de bronce): las mismas ondas que el agua de siempre. */
export function conOndas<M extends THREE.MeshPhongMaterial>(mat: M): M {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTiempo = tiempoMateriales;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMundoO;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvMundoO = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vMundoO;\nuniform float uTiempo;\n${ONDAS}`)
      .replace(
        "#include <normal_fragment_maps>",
        "#include <normal_fragment_maps>\n{ vec2 o = ondasAgua(vMundoO.xz, uTiempo); normal = normalize(normal + mat3(viewMatrix) * vec3(o.x, 0.0, o.y) * 0.12); }",
      );
  };
  mat.customProgramCacheKey = () => "templo-agua-ondas";
  return mat;
}

// Materiales compartidos: mate (Lambert) y brillante para el oro y el bronce (Phong), los dos con textura.
let matte: THREE.MeshLambertMaterial | null = null;
let shiny: THREE.MeshPhongMaterial | null = null;

export function matteMat() {
  if (!matte) matte = conFuegos(conDetalle(new THREE.MeshLambertMaterial({ vertexColors: true }), false), "detalle");
  return matte;
}

export function shinyMat() {
  if (!shiny) shiny = shinyMatPropio();
  return shiny;
}

/** Un metal como el compartido pero propio (lo que se mueve con su dueño, como el oro de la ropa de los personajes). */
export function shinyMatPropio() {
  return conFuegos(conDetalle(new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 70, specular: new THREE.Color("#7a5a20") }), true), "metal");
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
