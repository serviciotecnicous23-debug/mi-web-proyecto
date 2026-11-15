/**
 * Los campos de afuera de los muros (docs/guion-del-juego.md, cap. 8: «más vida por estación»): parcelas de trigo y de
 * cebada en terrazas al norte, al sur y al poniente de la ciudad (como el valle de Refaim, donde se recogían espigas:
 * Isaías 17:5), con los muretes de piedra seca de cada terraza y una torre de guarda en medio de los campos (Isaías 5:2).
 * Cambian con la estación del año de Jerusalén (shared/anio.ts):
 *  - la siembra: la tierra recién arada, con sus surcos;
 *  - el invierno: el brote verde en hileras sobre la tierra mojada;
 *  - la siega de la cebada: la cebada madura (dorada pálida) y el trigo verde y alto;
 *  - la siega del trigo: el trigo dorado, con el viento que pasa en olas, y la cebada ya segada (rastrojo y gavillas);
 *  - el verano: el rastrojo, con las gavillas del trigo;
 *  - la cosecha: el rastrojo seco.
 *
 * Solo se ve: no choca con nada ni tapa un paso. La mies es una sola malla por cultivo que se alza en la tarjeta de
 * video (su alto y sus colores son uniformes), así que cambiar de estación no arma nada de nuevo. El viento de las olas
 * usa el mismo reloj de los materiales (`tiempoMateriales`). El suelo vivo no pone matas ni piedras dentro de los campos
 * (`enCampo`).
 */
import * as THREE from "three";
import type { EstacionId } from "@shared/anio";
import { C, GeoBuilder, matteMat, tiempoMateriales } from "../three/builder";
import { CASAS_DE_AFUERA, alturaSuelo } from "./escenario";

type V2 = [number, number];
/** Una parcela: su esquina de adentro `o`, el largo a lo largo de la terraza (`u`) y el hondo hacia afuera (`v`). */
export type ParcelaDeCampo = { o: V2; u: V2; v: V2; largo: number; hondo: number; cultivo: "trigo" | "cebada" };
type Terraza = { o: V2; u: V2; v: V2; largo: number; torre: boolean };

/** El azar con semilla: los campos salen iguales cada vez (y en cada teléfono). */
function azar(semilla: number) {
  let s = semilla;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

const HONDO = 7.4; // el hondo de cada parcela (hacia afuera)
const PASO_TERRAZA = 10.5; // de una terraza a la siguiente (con el sendero y el murete)

/** Las terrazas: filas de parcelas a lo largo del muro, una detrás de otra hacia afuera (cada una más abajo). */
const TERRAZAS: Terraza[] = [
  // al norte: a lo largo de x, hacia afuera es -z
  ...[0, 1, 2].map((k): Terraza => ({ o: [-36, -77 - k * PASO_TERRAZA], u: [1, 0], v: [0, -1], largo: 110, torre: k === 1 })),
  // al sur: a lo largo de x, hacia afuera es +z
  ...[0, 1, 2].map((k): Terraza => ({ o: [-36, 77 + k * PASO_TERRAZA], u: [1, 0], v: [0, 1], largo: 110, torre: k === 1 })),
  // al poniente, detrás del templo: a lo largo de z, hacia afuera es -x
  ...[0, 1, 2].map((k): Terraza => ({ o: [-25.5 - k * PASO_TERRAZA, -72], u: [0, 1], v: [-1, 0], largo: 144, torre: k === 1 })),
];

const punto = (o: V2, u: V2, v: V2, s: number, t: number): V2 => [o[0] + u[0] * s + v[0] * t, o[1] + u[1] * s + v[1] * t];

/** Si una casa de las laderas cae dentro de la parcela (con un margen), la parcela no va. */
function chocaConCasa(p: ParcelaDeCampo): boolean {
  for (const c of CASAS_DE_AFUERA) {
    const dx = c.x - p.o[0], dz = c.z - p.o[1];
    const s = dx * p.u[0] + dz * p.u[1], t = dx * p.v[0] + dz * p.v[1];
    const r = Math.max(c.w, c.d) / 2 + 1.5;
    if (s > -r && s < p.largo + r && t > -r && t < p.hondo + r) return true;
  }
  return false;
}

let cache: ParcelaDeCampo[] | null = null;
/** Las parcelas de los campos (siempre las mismas: el azar tiene semilla y las casas de las laderas también). */
export function parcelasDeCampo(): ParcelaDeCampo[] {
  if (cache) return cache;
  const r = azar(5_17_5);
  const out: ParcelaDeCampo[] = [];
  for (const tz of TERRAZAS) {
    // la torre de guarda va al principio de la terraza del medio: ahí no hay parcela
    let s = tz.torre ? 7 : 0.6 + r() * 2;
    while (s < tz.largo - 6) {
      const largo = Math.min(11 + r() * 6, tz.largo - s);
      const p: ParcelaDeCampo = { o: punto(tz.o, tz.u, tz.v, s, 0.9), u: tz.u, v: tz.v, largo, hondo: HONDO, cultivo: r() < 0.58 ? "trigo" : "cebada" };
      if (!chocaConCasa(p)) out.push(p);
      s += largo + 1.1 + r() * 0.8;
    }
  }
  // las casas de las laderas se arman con la ciudad: si todavía no están, no se guarda (se vuelve a calcular)
  if (CASAS_DE_AFUERA.length) cache = out;
  return out;
}

/** Si el punto cae dentro de un campo (con un margen de medio metro): ahí el suelo vivo no pone matas ni piedras. */
export function enCampo(x: number, z: number): boolean {
  for (const p of parcelasDeCampo()) {
    const dx = x - p.o[0], dz = z - p.o[1];
    const s = dx * p.u[0] + dz * p.u[1], t = dx * p.v[0] + dz * p.v[1];
    if (s > -0.5 && s < p.largo + 0.5 && t > -0.5 && t < p.hondo + 0.5) return true;
  }
  return false;
}

// ---------------------------------------------------------------- la mies y la tierra (una malla de cada una)

/** Cómo está la mies de un cultivo en una estación (null: no hay, se ve la tierra). */
type Mies = { alto: number; color: string; color2: string; espigas: number; hileras: number };
const BROTE: Mies = { alto: 0.13, color: "#5f8a32", color2: "#8fb04f", espigas: 0, hileras: 1 };
const VERDE_ALTO: Mies = { alto: 0.62, color: "#6f9238", color2: "#a2bb5e", espigas: 0.15, hileras: 0 };
const CEBADA_MADURA: Mies = { alto: 0.72, color: "#bfa45e", color2: "#e6d394", espigas: 0.55, hileras: 0 };
const TRIGO_DORADO: Mies = { alto: 0.95, color: "#cf953a", color2: "#f2c968", espigas: 1, hileras: 0 };
type Tierra = { a: string; b: string };
const ARADA: Tierra = { a: "#5e4129", b: "#86623e" };
const RASTROJO: Tierra = { a: "#b49762", b: "#d9c18b" };

const ESTADOS: Record<EstacionId, { tierra: Tierra; trigo: Mies | null; cebada: Mies | null; gavillasTrigo: boolean; gavillasCebada: boolean }> = {
  siembra: { tierra: ARADA, trigo: null, cebada: null, gavillasTrigo: false, gavillasCebada: false },
  invierno: { tierra: ARADA, trigo: BROTE, cebada: BROTE, gavillasTrigo: false, gavillasCebada: false },
  cebada: { tierra: ARADA, trigo: VERDE_ALTO, cebada: CEBADA_MADURA, gavillasTrigo: false, gavillasCebada: false },
  trigo: { tierra: RASTROJO, trigo: TRIGO_DORADO, cebada: null, gavillasTrigo: false, gavillasCebada: true },
  verano: { tierra: RASTROJO, trigo: null, cebada: null, gavillasTrigo: true, gavillasCebada: false },
  cosecha: { tierra: RASTROJO, trigo: null, cebada: null, gavillasTrigo: false, gavillasCebada: false },
};

const RUIDO_GLSL = `
float campoHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
`;

/**
 * La tierra de los campos: los surcos (claros y oscuros a lo largo de la parcela) con su grano. Los colores son
 * uniformes, así la siembra, el invierno y el rastrojo son la misma malla.
 */
function materialTierra(): { mat: THREE.MeshLambertMaterial; u: { uTierraA: { value: THREE.Color }; uTierraB: { value: THREE.Color } } } {
  const u = { uTierraA: { value: new THREE.Color(ARADA.a) }, uTierraB: { value: new THREE.Color(ARADA.b) } };
  const mat = new THREE.MeshLambertMaterial({ color: "#ffffff" });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute float aSurco;\nvarying float vSurco;\nvarying vec2 vCampo;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvSurco = aSurco;\nvCampo = position.xz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nuniform vec3 uTierraA;\nuniform vec3 uTierraB;\nvarying float vSurco;\nvarying vec2 vCampo;\n${RUIDO_GLSL}`)
      .replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `float surco = 0.5 + 0.5 * cos(vSurco * 6.2832 / 0.55);
vec3 tierraCol = mix(uTierraA, uTierraB, smoothstep(0.2, 0.8, surco));
tierraCol *= 0.9 + 0.16 * campoHash(floor(vCampo * 6.0)) - 0.05 * campoHash(floor(vCampo * 1.3) + 3.0);
vec4 diffuseColor = vec4( tierraCol, opacity );`,
      );
  };
  mat.customProgramCacheKey = () => "templo-campo-tierra";
  return { mat, u };
}

type UniformesMies = {
  uAlto: { value: number };
  uColor: { value: THREE.Color };
  uColor2: { value: THREE.Color };
  uEspigas: { value: number };
  uHileras: { value: number };
  uTierraA: { value: THREE.Color };
};

/**
 * La mies: la malla se arma al ras de la tierra y se alza en la tarjeta de video (`uAlto`). Arriba, las olas del viento
 * (más claras donde pasa la ráfaga, y las puntas se mecen), el grano, las espigas que brillan cuando está madura y, si
 * es el brote, las hileras verdes con la tierra entre una y otra. Los costados (los tallos) son más oscuros abajo, y el
 * borde de arriba es un serrucho de espigas para que el campo no termine en una línea recta.
 */
function materialMies(): { mat: THREE.MeshLambertMaterial; u: UniformesMies } {
  const u: UniformesMies = {
    uAlto: { value: 0 },
    uColor: { value: new THREE.Color("#cf953a") },
    uColor2: { value: new THREE.Color("#f2c968") },
    uEspigas: { value: 0 },
    uHileras: { value: 0 },
    uTierraA: { value: new THREE.Color(ARADA.a) },
  };
  const mat = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u, { uTiempo: tiempoMateriales });
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
attribute float aArriba;
attribute float aPunta;
attribute float aSurco;
uniform float uAlto;
uniform float uTiempo;
varying float vArriba;
varying float vSurco;
varying vec2 vCampo;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
float miesAlto = uAlto * (0.9 + 0.1 * sin(position.x * 1.7 + position.z * 1.3));
transformed.y += aArriba * miesAlto + aPunta * uAlto * 0.24;
float miesOla = sin(dot(position.xz, vec2(0.33, 0.12)) - uTiempo * 1.5);
transformed.x += aArriba * miesOla * 0.06 * uAlto;
transformed.y += aArriba * miesOla * 0.025 * uAlto;
vArriba = aArriba;
vSurco = aSurco;
vCampo = position.xz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec3 uTierraA;
uniform float uEspigas;
uniform float uHileras;
uniform float uTiempo;
varying float vArriba;
varying float vSurco;
varying vec2 vCampo;
${RUIDO_GLSL}`,
      )
      .replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `float ola1 = 0.5 + 0.5 * sin(dot(vCampo, vec2(0.33, 0.12)) - uTiempo * 1.5);
float ola2 = 0.5 + 0.5 * sin(dot(vCampo, vec2(-0.09, 0.41)) * 1.7 - uTiempo * 0.9);
float grano = campoHash(floor(vCampo * 9.0));
float mancha = campoHash(floor(vCampo * 0.9) + 7.0);
float hilera = 0.5 + 0.5 * cos(vSurco * 6.2832 / 0.5);
vec3 miesCol = mix(uColor, uColor2, clamp(ola1 * 0.5 + ola2 * 0.22 + mancha * 0.28, 0.0, 1.0));
miesCol *= 0.9 + 0.14 * grano - 0.05 * hilera;
miesCol += uEspigas * step(0.87, grano) * vec3(0.13, 0.1, 0.04);
miesCol = mix(miesCol, uTierraA, uHileras * (1.0 - smoothstep(0.3, 0.62, hilera)));
miesCol *= mix(0.6, 1.0, vArriba);
vec4 diffuseColor = vec4( miesCol, opacity );`,
      );
  };
  mat.customProgramCacheKey = () => "templo-campo-mies";
  return { mat, u };
}

/** Lo que se arma una vez: la tierra, la mies de cada cultivo, las gavillas y los muretes. */
function armarMallas(coarse: boolean) {
  const paso = coarse ? 2.6 : 1.7;
  const tierra = { pos: [] as number[], surco: [] as number[] };
  const mies = { trigo: { pos: [] as number[], nor: [] as number[], arriba: [] as number[], punta: [] as number[], surco: [] as number[] }, cebada: { pos: [] as number[], nor: [] as number[], arriba: [] as number[], punta: [] as number[], surco: [] as number[] } };
  const gavillas = { trigo: new GeoBuilder(), cebada: new GeoBuilder() };
  const r = azar(9_44);
  const Y = (x: number, z: number) => alturaSuelo(x, z) + 0.07;

  for (const p of parcelasDeCampo()) {
    const nu = Math.max(2, Math.ceil(p.largo / paso)), nv = Math.max(2, Math.ceil(p.hondo / paso));
    const en = (i: number, j: number) => {
      const s = (i / nu) * p.largo, t = (j / nv) * p.hondo;
      const [x, z] = punto(p.o, p.u, p.v, s, t);
      return { x, y: Y(x, z), z, t };
    };
    const m = mies[p.cultivo];
    // la tierra y el techo de la mies: la misma rejilla, que sigue el suelo
    for (let i = 0; i < nu; i++)
      for (let j = 0; j < nv; j++) {
        const a = en(i, j), b = en(i + 1, j), c = en(i + 1, j + 1), d = en(i, j + 1);
        // los dos triángulos, siempre mirando arriba (según hacia dónde gira u × v)
        const arriba = p.u[0] * p.v[1] - p.u[1] * p.v[0] < 0;
        const tris = arriba ? [a, b, c, a, c, d] : [a, c, b, a, d, c];
        for (const q of tris) {
          tierra.pos.push(q.x, q.y, q.z);
          tierra.surco.push(q.t);
          m.pos.push(q.x, q.y + 0.01, q.z);
          m.nor.push(0, 1, 0);
          m.arriba.push(1);
          m.punta.push(0);
          m.surco.push(q.t);
        }
      }
    // los costados de la mies (los tallos) y, arriba, el serrucho de las espigas
    const borde: { i0: number; j0: number; i1: number; j1: number; n: number; nx: number; nz: number }[] = [
      { i0: 0, j0: 0, i1: nu, j1: 0, n: nu, nx: -p.v[0], nz: -p.v[1] },
      { i0: nu, j0: 0, i1: nu, j1: nv, n: nv, nx: p.u[0], nz: p.u[1] },
      { i0: nu, j0: nv, i1: 0, j1: nv, n: nu, nx: p.v[0], nz: p.v[1] },
      { i0: 0, j0: nv, i1: 0, j1: 0, n: nv, nx: -p.u[0], nz: -p.u[1] },
    ];
    for (const e of borde) {
      for (let k = 0; k < e.n; k++) {
        const f0 = k / e.n, f1 = (k + 1) / e.n;
        const A = en(Math.round(e.i0 + (e.i1 - e.i0) * f0), Math.round(e.j0 + (e.j1 - e.j0) * f0));
        const B = en(Math.round(e.i0 + (e.i1 - e.i0) * f1), Math.round(e.j0 + (e.j1 - e.j0) * f1));
        // el costado: abajo (aArriba 0) en la tierra, arriba (aArriba 1) se alza con la mies
        const quad: [typeof A, number][] = [
          [A, 0], [B, 0], [B, 1],
          [A, 0], [B, 1], [A, 1],
        ];
        for (const [q, up] of quad) {
          m.pos.push(q.x, q.y, q.z);
          m.nor.push(e.nx, 0, e.nz);
          m.arriba.push(up);
          m.punta.push(0);
          m.surco.push(q.t);
        }
        if (coarse) continue;
        // el serrucho: dientes de espigas de 25 a 40 cm de ancho, de alto distinto
        const largoTramo = Math.hypot(B.x - A.x, B.z - A.z);
        const dientes = Math.max(1, Math.round(largoTramo / 0.32));
        for (let d = 0; d < dientes; d++) {
          const g0 = d / dientes, g1 = (d + 1) / dientes, gm = (g0 + g1) / 2;
          const lerp = (g: number) => ({ x: A.x + (B.x - A.x) * g, y: A.y + (B.y - A.y) * g, z: A.z + (B.z - A.z) * g, t: A.t + (B.t - A.t) * g });
          const p0 = lerp(g0), p1 = lerp(g1), pm = lerp(gm);
          const alto = 0.45 + r() * 0.55;
          for (const [q, pu] of [[p0, 0], [p1, 0], [pm, alto]] as [ReturnType<typeof lerp>, number][]) {
            m.pos.push(q.x, q.y, q.z);
            m.nor.push(e.nx, 0.3, e.nz);
            m.arriba.push(1);
            m.punta.push(pu);
            m.surco.push(q.t);
          }
        }
      }
    }
    // las gavillas, en hileras dentro de la parcela (se ven cuando ya se segó)
    const gb = gavillas[p.cultivo];
    const color = p.cultivo === "trigo" ? "#d6aa55" : "#d9c487";
    for (let s = 1.8; s < p.largo - 1; s += 3.2)
      for (let t = 1.6; t < p.hondo - 1; t += 2.6) {
        if (r() < 0.35) continue;
        const [x, z] = punto(p.o, p.u, p.v, s + (r() - 0.5) * 0.8, t + (r() - 0.5) * 0.6);
        const y = alturaSuelo(x, z) + 0.02, k = 0.85 + r() * 0.3;
        // el atado de tallos, la soga que lo ata y las espigas abiertas arriba (Génesis 37:7)
        gb.cone(0.3 * k, 0.78 * k, color, { x, y: y + 0.39 * k, z, ry: r() * 6 }, 7);
        gb.cyl(0.14 * k, 0.15 * k, 0.07 * k, "#8a6a34", { x, y: y + 0.5 * k, z }, 7);
        gb.cone(0.24 * k, 0.32 * k, new THREE.Color(color).multiplyScalar(1.08), { x, y: y + 0.86 * k, z, rx: Math.PI, ry: r() * 6 }, 7);
      }
  }

  // los muretes de piedra seca al borde de afuera de cada terraza, y la torre de guarda de la terraza del medio
  const piedra = new GeoBuilder();
  const tonos = [C.piedra, C.piedraOsc, "#a89a80", "#b9ab8f"];
  for (const tz of TERRAZAS) {
    const ang = Math.atan2(-tz.u[1], tz.u[0]);
    for (let s = 0.7; s < tz.largo; s += 1.45) {
      const [x, z] = punto(tz.o, tz.u, tz.v, s, 0.9 + HONDO + 0.75);
      const h = 0.42 + r() * 0.24;
      piedra.box(1.5, h, 0.55, new THREE.Color(tonos[Math.floor(r() * tonos.length)]).multiplyScalar(0.92 + r() * 0.12), { x, y: alturaSuelo(x, z) + h / 2 - 0.12, z, ry: ang + (r() - 0.5) * 0.06 });
      if (r() < 0.45) piedra.box(0.5 + r() * 0.4, 0.2, 0.4, tonos[Math.floor(r() * tonos.length)], { x: x + (r() - 0.5), y: alturaSuelo(x, z) + h - 0.04, z: z + (r() - 0.5) * 0.2, ry: r() * 3 });
    }
    if (tz.torre) {
      // la torre de guarda: piedras del campo en redondo, con su enramada arriba (Isaías 1:8)
      const [x, z] = punto(tz.o, tz.u, tz.v, 3.4, 0.9 + HONDO / 2);
      const y = alturaSuelo(x, z) - 0.1;
      for (let k = 0; k < 5; k++) piedra.cyl(1.25 - k * 0.04, 1.3 - k * 0.04, 0.5, new THREE.Color(tonos[k % tonos.length]).multiplyScalar(0.9 + r() * 0.1), { x, y: y + 0.25 + k * 0.5, z }, 12);
      piedra.box(0.6, 1.0, 0.1, "#3a2a1c", { x: x + tz.v[0] * -1.22, y: y + 0.55, z: z + tz.v[1] * -1.22, ry: ang });
      for (const [dx, dz] of [[-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8]]) piedra.cyl(0.05, 0.06, 1.3, C.cedroOsc, { x: x + dx, y: y + 2.5 + 0.65, z: z + dz }, 5);
      piedra.box(2.1, 0.14, 2.1, "#7d8a4a", { x, y: y + 3.85, z, ry: 0.1 });
      piedra.box(1.9, 0.1, 1.9, "#9a8a5a", { x, y: y + 3.95, z, ry: 0.5 });
    }
  }
  return { tierra, mies, gavillas, piedra };
}

function geometria(d: { pos: number[]; nor?: number[]; arriba?: number[]; punta?: number[]; surco: number[] }): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(d.pos, 3));
  if (d.nor) g.setAttribute("normal", new THREE.Float32BufferAttribute(d.nor, 3));
  else g.computeVertexNormals();
  if (d.arriba) g.setAttribute("aArriba", new THREE.Float32BufferAttribute(d.arriba, 1));
  if (d.punta) g.setAttribute("aPunta", new THREE.Float32BufferAttribute(d.punta, 1));
  g.setAttribute("aSurco", new THREE.Float32BufferAttribute(d.surco, 1));
  g.computeBoundingSphere();
  return g;
}

/** Los campos de afuera, con su estación. */
export class Campos {
  readonly grupo = new THREE.Group();
  private estacion: EstacionId | null = null;
  private tierraU: ReturnType<typeof materialTierra>["u"];
  private mies: Record<"trigo" | "cebada", { malla: THREE.Mesh; u: UniformesMies }>;
  private gavillas: Record<"trigo" | "cebada", THREE.Mesh | null>;
  private liberar: (() => void)[] = [];

  constructor(coarse: boolean) {
    this.grupo.name = "campos";
    const m = armarMallas(coarse);
    const t = materialTierra();
    this.tierraU = t.u;
    const tierra = new THREE.Mesh(geometria(m.tierra), t.mat);
    tierra.receiveShadow = true;
    this.grupo.add(tierra);
    const hacerMies = (d: (typeof m.mies)["trigo"]) => {
      const mm = materialMies();
      const malla = new THREE.Mesh(geometria(d), mm.mat);
      malla.receiveShadow = true;
      malla.visible = false;
      this.grupo.add(malla);
      this.liberar.push(() => (malla.geometry.dispose(), mm.mat.dispose()));
      return { malla, u: mm.u };
    };
    this.mies = { trigo: hacerMies(m.mies.trigo), cebada: hacerMies(m.mies.cebada) };
    const hacerGavillas = (b: GeoBuilder) => {
      if (b.empty) return null;
      const malla = new THREE.Mesh(b.build(), matteMat());
      malla.castShadow = !coarse;
      malla.receiveShadow = true;
      malla.visible = false;
      this.grupo.add(malla);
      this.liberar.push(() => malla.geometry.dispose());
      return malla;
    };
    this.gavillas = { trigo: hacerGavillas(m.gavillas.trigo), cebada: hacerGavillas(m.gavillas.cebada) };
    const piedra = new THREE.Mesh(m.piedra.build(), matteMat());
    piedra.receiveShadow = true;
    this.grupo.add(piedra);
    this.liberar.push(() => (tierra.geometry.dispose(), t.mat.dispose(), piedra.geometry.dispose()));
  }

  /** Pone los campos como están en esta estación (solo hace algo si cambió). */
  setEstacion(id: EstacionId) {
    if (id === this.estacion) return;
    this.estacion = id;
    const e = ESTADOS[id];
    this.tierraU.uTierraA.value.set(e.tierra.a);
    this.tierraU.uTierraB.value.set(e.tierra.b);
    for (const cultivo of ["trigo", "cebada"] as const) {
      const mies = e[cultivo];
      const { malla, u } = this.mies[cultivo];
      malla.visible = !!mies;
      if (mies) {
        u.uAlto.value = mies.alto;
        u.uColor.value.set(mies.color);
        u.uColor2.value.set(mies.color2);
        u.uEspigas.value = mies.espigas;
        u.uHileras.value = mies.hileras;
        u.uTierraA.value.set(e.tierra.a);
      }
    }
    if (this.gavillas.trigo) this.gavillas.trigo.visible = e.gavillasTrigo;
    if (this.gavillas.cebada) this.gavillas.cebada.visible = e.gavillasCebada;
  }

  dispose() {
    for (const f of this.liberar) f();
    this.liberar = [];
  }
}
