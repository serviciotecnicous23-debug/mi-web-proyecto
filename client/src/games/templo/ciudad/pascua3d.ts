/**
 * Lo que se ve en la ciudad de la segunda historia de la temporada, «La gran Pascua de Ezequías» (shared/capitulos.ts;
 * las cuentas las da el servidor):
 * - Capítulo 1, «Las puertas abiertas»: lo inmundo que los sacerdotes sacaron al atrio, en montones dentro del gran atrio
 *   (se acaban con la meta), y los levitas que lo llevan en cestos por la escalinata, la plaza y la puerta hasta el
 *   torrente de Cedrón, donde crece el montón (2 Crónicas 29:16).
 * - Capítulo 2, «El cántico de Jehová»: los levitas con címbalos, salterios y arpas y los sacerdotes con trompetas en la
 *   escalinata, más cuanto más avanza la meta (2 Crónicas 29:25-28). De cerca se oye lo que cantan y suenan las trompetas.
 * - Capítulo 3, «Las cartas del rey»: el correo que pregona la carta del rey junto a la puerta (2 Crónicas 30:6-9), los
 *   peregrinos que entran por la puerta y sus tiendas en el monte de los Olivos (más con la meta; se quedan para la fiesta).
 * - Capítulo 4, «La gran Pascua»: los altares que Acaz puso en los rincones de la ciudad (2 Crónicas 28:24) se van
 *   quitando con la meta y van a dar al torrente de Cedrón (2 Crónicas 30:14). En la fiesta final, el gran regocijo:
 *   la plaza de fiesta, los cantores y el pueblo que se alegra.
 * Solo se dibuja la temporada en que se cuenta esta historia. Todo con figuras simples en pocas mallas, como el resto de
 * la ciudad. Nada con forma de cruz.
 */
import * as THREE from "three";
import { C, GeoBuilder, matteMat } from "../three/builder";
import { Crowd, Figure, leviteColors, newRig, randomVisitor, type CrowdColors, type CrowdHandle, type CrowdVariant, type Rig } from "../three/characters";
import type { Overlay } from "../three/overlay";
import { alturaSuelo, liberar, meshes } from "./escenario";
import * as P from "./plano";
import { construirFiesta, genteDeFiesta, mulberry32, vary, type EscenaDeHistoria, type TomaDeCine } from "./capitulos3d";
import { PASCUA_EZEQUIAS, arcoDeTemporada, type CapitulosVista } from "@shared/capitulos";

const Y = P.SUELO;

/** Lo que hay que dibujar, sacado de lo que dice el servidor. */
export type EstadoPascua = {
  /** Esta temporada cuenta esta historia (si no, no se dibuja nada). */
  activa: boolean;
  /** El capítulo de esta semana (0 si no hay). */
  hoy: number;
  /** El avance (0 a 1) de cada capítulo. */
  limpieza: number;
  cantico: number;
  cartas: number;
  pascua: number;
  fiesta: "no" | "semana" | "fiesta" | "vivo";
};

const NADA: EstadoPascua = { activa: false, hoy: 0, limpieza: 0, cantico: 0, cartas: 0, pascua: 0, fiesta: "no" };

const avance = (c: { meta: number | null; puntos: number; cumplido: boolean } | undefined) =>
  !c ? 0 : c.cumplido ? 1 : c.meta ? Math.max(0, Math.min(1, c.puntos / c.meta)) : 0;

export function estadoDePascua(v: CapitulosVista | null): EstadoPascua {
  if (!v || arcoDeTemporada(v.temporada)?.id !== PASCUA_EZEQUIAS.id) return NADA;
  const c = (n: number) => v.capitulos.find((x) => x.n === n);
  const hoy = v.hoy?.n ?? 0;
  return {
    activa: true,
    hoy,
    limpieza: avance(c(1)),
    cantico: avance(c(2)),
    cartas: avance(c(3)),
    pascua: avance(c(4)),
    fiesta: hoy === 4 ? (v.fiesta.momento === "vivo" ? "vivo" : v.fiesta.momento === "fiesta" ? "fiesta" : "semana") : "no",
  };
}

// ---------------------------------------------------------------- los lugares
const MONTONES = P.MONTONES_ATRIO;
const CEDRON = P.CEDRON;
const ALTARES = P.ALTARES_ACAZ;
const CORREO = P.CORREO_REY;
/** Las tiendas de los peregrinos en el monte de los Olivos (donde en la otra historia acampaban los asirios). */
const MONTE_TIENDAS = { x0: 116, x1: 152, z0: -48, z1: 34 };

/** El piso de un punto: el gran atrio arriba, la escalinata, la plaza y, afuera de la puerta, la ladera del Cedrón. */
function piso(x: number, z: number): number {
  if (x < P.ESCALINATA.x0) return 0;
  if (x > P.MURO_ORIENTE) return alturaSuelo(x, z);
  return P.alturaCiudad(x, z);
}

/** Lo que cantan los levitas en la escalinata (los salmos, RVR1960). */
const CANTOS: { text: string; ref: string }[] = [
  { text: "Alabadle con címbalos resonantes; Alabadle con címbalos de júbilo.", ref: "Salmo 150:5" },
  { text: "Cantad a Jehová cántico nuevo; Cantad a Jehová, toda la tierra.", ref: "Salmo 96:1" },
  { text: "Alabadle a son de bocina; Alabadle con salterio y arpa.", ref: "Salmo 150:3" },
  { text: "Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza; Alabadle, bendecid su nombre.", ref: "Salmo 100:4" },
];

/** Lo que pregona el correo del rey (la carta de 2 Crónicas 30, RVR1960). */
const PREGONES: { text: string; ref: string }[] = [
  { text: "Hijos de Israel, volveos a Jehová el Dios de Abraham, de Isaac, y de Israel,", ref: "2 Crónicas 30:6" },
  { text: "No endurezcáis, pues, ahora vuestra cerviz como vuestros padres; someteos a Jehová, y venid a su santuario,", ref: "2 Crónicas 30:8" },
  { text: "porque Jehová vuestro Dios es clemente y misericordioso, y no apartará de vosotros su rostro, si vosotros os volviereis a él.", ref: "2 Crónicas 30:9" },
];

// ---------------------------------------------------------------- los caminos
type Camino = { puntos: [number, number][]; largos: number[]; total: number };
function camino(puntos: [number, number][]): Camino {
  const largos = puntos.slice(1).map((b, i) => Math.hypot(b[0] - puntos[i][0], b[1] - puntos[i][1]));
  return { puntos, largos, total: largos.reduce((a, b) => a + b, 0) };
}
/** El punto a cierta distancia del principio, y hacia dónde se camina. */
function enCamino(c: Camino, d: number): { x: number; z: number; yaw: number } {
  let resto = ((d % c.total) + c.total) % c.total;
  for (let i = 0; i < c.largos.length; i++) {
    const a = c.puntos[i], b = c.puntos[i + 1];
    if (resto <= c.largos[i]) {
      const k = c.largos[i] ? resto / c.largos[i] : 0;
      return { x: a[0] + (b[0] - a[0]) * k, z: a[1] + (b[1] - a[1]) * k, yaw: Math.atan2(b[0] - a[0], b[1] - a[1]) };
    }
    resto -= c.largos[i];
  }
  const u = c.puntos[c.puntos.length - 1];
  return { x: u[0], z: u[1], yaw: 0 };
}

/** De los montones del atrio al Cedrón por el carril del sur, y de vuelta por el del norte (sin tocar el arca de Joás). */
const IDA: [number, number][] = [[30.4, 1.2], [33.4, 1.2], [34.6, 1.2], [43.6, 1.2], [75.4, 1.2], [79.2, 1.1], [86.0, 1.1], [90.0, 1.2]];
const VUELTA: [number, number][] = [[90.0, 0.2], [86.0, -1.3], [79.2, -1.3], [75.4, -1.3], [43.6, -1.3], [42.0, -0.5], [34.6, -0.5], [33.4, -0.5], [30.4, -0.5]];
const CESTOS = camino([...IDA, ...VUELTA, IDA[0]]);
/** Hasta aquí del camino los levitas llevan el cesto lleno (de vuelta van con las manos libres). */
const LARGO_IDA = camino(IDA).total;

/** Los peregrinos: de sus tiendas, por la puerta, hasta la plaza, y de vuelta (cada uno por su carril). */
function caminoPeregrino(i: number): Camino {
  const zg = -2.1 + ((i * 7) % 9) * 0.52;
  const zp = -6 + ((i * 5) % 11) * 1.2;
  const xp = 52 + ((i * 3) % 7) * 2.2;
  return camino([[88, zg * 1.6], [79.5, zg], [75.6, zg], [68, zg + (zp - zg) * 0.4], [xp, zp], [68, zg + (zp - zg) * 0.4 + 0.5], [75.6, zg + 0.4], [79.5, zg + 0.4], [88, zg * 1.6 + 0.4], [88, zg * 1.6]]);
}

// ---------------------------------------------------------------- las piezas
/** Un montón de lo inmundo: piedras sucias, tablas rotas, ceniza y cacharros quebrados (como los escombros del templo). */
function monton(b: GeoBuilder, rnd: () => number, cx: number, y: number, cz: number, ancho: number, piezas: number) {
  for (let i = 0; i < piezas; i++) {
    const s = 0.18 + rnd() * 0.36;
    b.box(s * (0.8 + rnd() * 0.8), s * (0.4 + rnd() * 0.4), s * (0.8 + rnd() * 0.6), vary(rnd, ["#8f8576", "#7a6a55", "#a39783", "#5e5246"][i % 4], 0.08), {
      x: cx + (rnd() - 0.5) * ancho, y: y + s * 0.22, z: cz + (rnd() - 0.5) * ancho, rx: (rnd() - 0.5) * 0.8, ry: rnd() * Math.PI, rz: (rnd() - 0.5) * 0.8,
    });
  }
  for (let i = 0; i < Math.ceil(piezas / 4); i++) b.box(0.7 + rnd() * 0.7, 0.05, 0.16, vary(rnd, C.cedroOsc, 0.1), { x: cx + (rnd() - 0.5) * ancho, y: y + 0.05, z: cz + (rnd() - 0.5) * ancho, ry: rnd() * Math.PI, rz: (rnd() - 0.5) * 0.3 });
  // cacharros quebrados
  for (let i = 0; i < Math.ceil(piezas / 5); i++) b.cyl(0.12, 0.16, 0.14, vary(rnd, "#a0603a", 0.08), { x: cx + (rnd() - 0.5) * ancho, y: y + 0.06, z: cz + (rnd() - 0.5) * ancho, rx: 1.2 + rnd(), rz: rnd() }, 7);
  b.cyl(ancho * 0.55, ancho * 0.62, 0.03, vary(rnd, C.ceniza, 0.1), { x: cx, y: y + 0.015, z: cz }, 12);
}

function construirMontones(quedan: number): THREE.Group {
  const g = new THREE.Group();
  if (quedan <= 0) return g;
  const b = new GeoBuilder();
  MONTONES.slice(0, quedan).forEach(([x, z], i) => monton(b, mulberry32(3100 + i), x, 0, z, 1.9, 14));
  meshes(g, b, null, true);
  return g;
}

/** El montón en el torrente de Cedrón: crece con lo que sacan del templo y, en la Pascua, con los altares quitados. */
function construirCedron(k: number, altares: number): THREE.Group {
  const g = new THREE.Group();
  const b = new GeoBuilder();
  const rnd = mulberry32(2930);
  const [cx, cz] = CEDRON;
  const y = alturaSuelo(cx, cz);
  const r = 1.6 + 2.4 * k;
  // el montón de tierra (media esfera aplastada) y, sobre él, lo que sacaron del templo
  b.add(new THREE.IcosahedronGeometry(r, 1), vary(rnd, "#9a8a74", 0.05), { x: cx, y: y + r * 0.12, z: cz, sy: 0.45 });
  const encima = (d: number) => y + r * 0.12 + r * 0.45 * Math.sqrt(Math.max(0, 1 - (d / r) ** 2));
  const piezas = Math.round(14 + 30 * k);
  for (let i = 0; i < piezas; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r * 0.85;
    const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, sy = encima(d);
    const s = 0.2 + rnd() * 0.4;
    if (i % 6 === 5) b.box(0.8 + rnd() * 0.6, 0.06, 0.16, vary(rnd, C.cedroOsc, 0.1), { x, y: sy + 0.04, z, ry: rnd() * Math.PI, rz: (rnd() - 0.5) * 0.3 });
    else if (i % 6 === 4) b.cyl(0.13, 0.17, 0.15, vary(rnd, "#a0603a", 0.08), { x, y: sy + 0.06, z, rx: 1.2 + rnd(), rz: rnd() }, 7);
    else b.box(s * (0.8 + rnd() * 0.8), s * (0.4 + rnd() * 0.4), s * (0.8 + rnd() * 0.6), vary(rnd, ["#8f8576", "#7a6a55", "#a39783", "#5e5246"][i % 4], 0.08), { x, y: sy + s * 0.15, z, rx: (rnd() - 0.5) * 0.8, ry: rnd() * Math.PI, rz: (rnd() - 0.5) * 0.8 });
  }
  // los altares quebrados que echaron al torrente (2 Crónicas 30:14)
  for (let i = 0; i < altares; i++) {
    const a = (i / Math.max(1, altares)) * Math.PI * 2 + 0.4;
    b.box(0.7, 0.45, 0.6, vary(rnd, "#6b645a", 0.06), { x: cx + Math.cos(a) * r * 0.78, y: encima(r * 0.78) + 0.18, z: cz + Math.sin(a) * r * 0.78, rx: (rnd() - 0.5) * 0.9, ry: rnd() * 3, rz: 0.6 + rnd() * 0.5 });
  }
  meshes(g, b, null, true);
  return g;
}

/** Un altar de piedra sin labrar, con manchas de ceniza (nada más: ni imágenes ni figuras). */
function altar(b: GeoBuilder, rnd: () => number, x: number, z: number) {
  b.box(1.0, 0.24, 1.0, vary(rnd, "#8c8274", 0.05), { x, y: Y + 0.12, z });
  b.box(0.8, 0.62, 0.8, vary(rnd, "#9c917f", 0.06), { x, y: Y + 0.55, z, ry: (rnd() - 0.5) * 0.12 });
  b.box(0.9, 0.1, 0.9, vary(rnd, "#857a69", 0.05), { x, y: Y + 0.9, z });
  b.box(0.5, 0.03, 0.5, vary(rnd, C.ceniza, 0.08), { x, y: Y + 0.96, z });
  for (let k = 0; k < 3; k++) b.box(0.12 + rnd() * 0.1, 0.02, 0.1 + rnd() * 0.1, "#3a332d", { x: x + (rnd() - 0.5) * 0.7, y: Y + 0.012, z: z + (rnd() - 0.5) * 0.7 });
}

function construirAltares(quedan: number): THREE.Group {
  const g = new THREE.Group();
  if (quedan <= 0) return g;
  const b = new GeoBuilder();
  const rnd = mulberry32(2824);
  ALTARES.slice(0, quedan).forEach(([x, z]) => altar(b, rnd, x, z));
  meshes(g, b, null, true);
  return g;
}

type Instrumento = "cimbalos" | "arpa" | "salterio" | "trompeta";
/** Donde se ponen los cantores en la escalinata: de abajo hacia arriba, a los dos lados (el medio queda libre para subir). */
const CANTORES: { x: number; z: number; que: Instrumento }[] = [];
{
  const tipos: Instrumento[] = ["cimbalos", "arpa", "salterio", "trompeta"];
  let i = 0;
  for (const x of [42.0, 40.7, 39.4, 38.1]) for (const z of [-1.6, 1.6, -2.3, 2.3]) CANTORES.push({ x, z, que: tipos[i++ % tipos.length] });
}

/** Los instrumentos de David y las trompetas, en las manos de cada cantor (quietos: los cantores no caminan). */
function construirInstrumentos(n: number): THREE.Group {
  const g = new THREE.Group();
  if (n <= 0) return g;
  const b = new GeoBuilder();
  const s = new GeoBuilder();
  for (const c of CANTORES.slice(0, n)) {
    const y = P.alturaCiudad(c.x, c.z);
    // miran a la plaza (al oriente): lo que tienen en las manos queda un poco hacia el oriente
    const fx = c.x + 0.34;
    if (c.que === "cimbalos") {
      for (const dz of [-0.13, 0.13]) s.cyl(0.11, 0.11, 0.02, C.bronce, { x: fx, y: y + 1.02, z: c.z + dz, rx: Math.PI / 2 }, 14);
    } else if (c.que === "arpa") {
      // el arco del arpa y sus cuerdas (todas paralelas: nada que se cruce)
      b.add(new THREE.TorusGeometry(0.24, 0.025, 5, 12, Math.PI * 0.9), C.cedro, { x: fx, y: y + 1.02, z: c.z, ry: Math.PI / 2, rz: Math.PI * 0.55 });
      for (let k = 0; k < 4; k++) b.cyl(0.004, 0.004, 0.26 + k * 0.05, "#efe4c9", { x: fx, y: y + 0.92 + k * 0.012, z: c.z - 0.12 + k * 0.08 }, 3);
    } else if (c.que === "salterio") {
      b.box(0.08, 0.36, 0.3, C.cedroOsc, { x: fx, y: y + 0.98, z: c.z, rz: 0.35 });
      for (let k = 0; k < 4; k++) b.box(0.01, 0.32, 0.006, "#efe4c9", { x: fx - 0.045, y: y + 0.98, z: c.z - 0.1 + k * 0.066, rz: 0.35 });
    } else {
      // la trompeta de plata, hacia la plaza (Números 10:2)
      s.cone(0.09, 0.62, "#dcdcd4", { x: fx + 0.28, y: y + 1.42, z: c.z, rz: Math.PI / 2 + 0.25 }, 10);
      s.cyl(0.018, 0.018, 0.2, "#dcdcd4", { x: fx - 0.06, y: y + 1.36, z: c.z, rz: Math.PI / 2 + 0.25 }, 6);
    }
  }
  meshes(g, b, s, true);
  return g;
}

/** Las tiendas de los peregrinos en el monte: de colores, y de noche con sus fogatas. */
function construirTiendas(n: number): { grupo: THREE.Group; fogatas: THREE.Mesh | null } {
  const g = new THREE.Group();
  if (n <= 0) return { grupo: g, fogatas: null };
  const b = new GeoBuilder();
  const fuegos = new GeoBuilder();
  const rnd = mulberry32(3033);
  const COLORES = ["#c9455a", "#e8c56a", "#3f8f8a", "#d9c7a0", "#b7884f", "#6e3b5c", "#f2efe6", "#5a6f8f"];
  let fogatas = 0;
  for (let i = 0; i < n; i++) {
    const x = MONTE_TIENDAS.x0 + rnd() * (MONTE_TIENDAS.x1 - MONTE_TIENDAS.x0), z = MONTE_TIENDAS.z0 + rnd() * (MONTE_TIENDAS.z1 - MONTE_TIENDAS.z0);
    const y = alturaSuelo(x, z);
    const r = 1.1 + rnd() * 0.7, h = 1.8 + rnd() * 0.9;
    const col = vary(rnd, COLORES[i % COLORES.length], 0.05);
    // tienda de dos aguas (pocas caras): un prisma y su franja de otro color
    b.cone(r, h, col, { x, y: y + h / 2, z, ry: rnd() * Math.PI }, 4);
    b.cyl(r * 0.72, r * 0.8, 0.22, vary(rnd, COLORES[(i + 3) % COLORES.length], 0.05), { x, y: y + h * 0.3, z }, 4);
    if (i % 3 === 0) {
      const fx = x + r + 1.0, fz = z + (rnd() - 0.5) * 1.6;
      const fy = alturaSuelo(fx, fz);
      for (let k = 0; k < 5; k++) b.box(0.2, 0.12, 0.2, "#6b6258", { x: fx + Math.cos(k * 1.26) * 0.4, y: fy + 0.06, z: fz + Math.sin(k * 1.26) * 0.4 });
      fuegos.add(new THREE.IcosahedronGeometry(0.28, 1), "#ffb347", { x: fx, y: fy + 0.26, z: fz, sy: 1.4 });
      fogatas++;
    }
  }
  meshes(g, b, null, true);
  let fogatasMesh: THREE.Mesh | null = null;
  if (fogatas) {
    fogatasMesh = new THREE.Mesh(fuegos.build(), new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }));
    fogatasMesh.visible = false;
    g.add(fogatasMesh);
  }
  return { grupo: g, fogatas: fogatasMesh };
}

// ---------------------------------------------------------------- la escena
type Persona = { handle: CrowdHandle; rig: Rig; hace: "cesto" | "toca" | "trompeta" | "peregrino" | "canta" | "alaba"; d: number; camino?: Camino; cesto?: THREE.Mesh };
type Etiqueta = { el: HTMLDivElement; p: THREE.Vector3; r: number };
type Burbuja = { el: HTMLDivElement | null; hasta: number; siguiente: number; i: number };

/** El cesto que lleva cada levita (una malla chica que sigue sus manos). */
function cestoGeo(): THREE.BufferGeometry {
  const b = new GeoBuilder();
  b.cyl(0.21, 0.16, 0.2, "#a07a45", { y: 0 }, 9);
  b.add(new THREE.IcosahedronGeometry(0.17, 0), "#7d7062", { y: 0.1, sy: 0.45 });
  return b.build();
}

export class EscenaPascua implements EscenaDeHistoria {
  group = new THREE.Group();
  private crowd = new Crowd(32);
  private montones: THREE.Group | null = null;
  private cedron: THREE.Group | null = null;
  private altares: THREE.Group | null = null;
  private instrumentos: THREE.Group | null = null;
  private tiendas: THREE.Group | null = null;
  private fogatas: THREE.Mesh | null = null;
  private fiesta: THREE.Group | null = null;
  private correo: { fig: Figure; rig: Rig } | null = null;
  private claves = { montones: "", cedron: "", altares: "", instrumentos: "", tiendas: "", fiesta: "", gente: "", correo: "" };
  private gente: Persona[] = [];
  private etiquetas: Etiqueta[] = [];
  private etiquetaCantores: Etiqueta | null = null;
  private etiquetaCorreo: Etiqueta | null = null;
  private canto: Burbuja = { el: null, hasta: 0, siguiente: 0, i: 0 };
  private pregon: Burbuja = { el: null, hasta: 0, siguiente: 0, i: 0 };
  private trompetaEn = 20;
  private estado: EstadoPascua = NADA;
  private cestoGeo = cestoGeo();
  tapaNueva = false;

  constructor(
    private overlay: Overlay,
    private sombra: (x: number, y: number, z: number, s: number) => void,
    /** Al tocar el letrero de la fiesta (abre la historia para dar gracias). */
    private alTocarFiesta: () => void,
    /** Para que suenen las trompetas de los sacerdotes (2 Crónicas 29:26). */
    private trompeta: () => void,
  ) {
    this.group.add(this.crowd.group);
  }

  ponerVista(v: CapitulosVista | null): boolean {
    return this.poner(estadoDePascua(v));
  }

  tomaDeCapitulo(n: number): TomaDeCine | null {
    const e = this.estado;
    if (!e.activa) return null;
    if (n === 1) return e.limpieza < 0.6 ? { x: 47, z: 2.5, mx: 37, mz: 0.5, alto: 0.5 } : { x: 86, z: CEDRON[1], mx: CEDRON[0], mz: CEDRON[1], segundos: 9, alto: 1.1 };
    if (n === 2) return { x: 48, z: 0.5, mx: 39, mz: 0, alto: 0.5 };
    if (n === 3) return e.cartas < 0.35 ? { x: 65, z: -1.5, mx: CORREO[0], mz: CORREO[1] } : { x: 72, z: 0, mx: 130, mz: -6, segundos: 9, alto: 0.6 };
    if (e.fiesta === "fiesta" || e.fiesta === "vivo") return { x: 57, z: -1, mx: 44, mz: -3 };
    // el altar que queda más cerca de la plaza (o la plaza, si ya no queda ninguno)
    const quedan = this.altaresQueQuedan(e);
    if (!quedan) return { x: 57, z: -1, mx: 44, mz: -3 };
    const [ax, az] = ALTARES[quedan - 1];
    return { x: ax + (56 - ax) * 0.25, z: az * 0.7, mx: ax, mz: az, alto: 0.85 };
  }

  private altaresQueQuedan(e: EstadoPascua): number {
    if (!e.activa) return 0;
    if (e.hoy < 4) return ALTARES.length;
    return Math.max(0, Math.ceil(ALTARES.length * (1 - e.pascua) - 1e-9));
  }

  /** Pone lo que hay que dibujar. Devuelve si cambió algo que da sombra. */
  private poner(e: EstadoPascua): boolean {
    this.estado = e;
    let cambio = false;
    const montones = e.activa ? Math.max(0, Math.ceil(MONTONES.length * (1 - e.limpieza) - 1e-9)) : 0;
    if (`${montones}` !== this.claves.montones) {
      this.claves.montones = `${montones}`;
      this.montones = this.cambiar(this.montones, construirMontones(montones));
      cambio = true;
    }
    const quitados = ALTARES.length - this.altaresQueQuedan(e);
    const k = Math.min(1, 0.25 + 0.55 * e.limpieza + 0.2 * e.pascua);
    const cc = e.activa ? `${Math.round(k * 20)}:${e.hoy >= 4 ? quitados : 0}` : "no";
    if (cc !== this.claves.cedron) {
      this.claves.cedron = cc;
      this.cedron = this.cambiar(this.cedron, e.activa ? construirCedron(k, e.hoy >= 4 ? quitados : 0) : null);
      cambio = true;
    }
    const altares = this.altaresQueQuedan(e);
    if (`${altares}` !== this.claves.altares) {
      this.claves.altares = `${altares}`;
      this.altares = this.cambiar(this.altares, construirAltares(altares));
      cambio = true;
    }
    const cantores = e.activa && e.hoy === 2 ? Math.min(CANTORES.length, 4 + Math.round(e.cantico * (CANTORES.length - 4))) : 0;
    if (`${cantores}` !== this.claves.instrumentos) {
      this.claves.instrumentos = `${cantores}`;
      this.instrumentos = this.cambiar(this.instrumentos, construirInstrumentos(cantores));
    }
    const tiendas = e.activa && e.hoy >= 3 ? Math.round(6 + e.cartas * 40) : 0;
    if (`${tiendas}` !== this.claves.tiendas) {
      this.claves.tiendas = `${tiendas}`;
      const t = construirTiendas(tiendas);
      this.tiendas = this.cambiar(this.tiendas, t.grupo);
      this.fogatas = t.fogatas;
      cambio = true;
    }
    const cf = e.fiesta === "fiesta" || e.fiesta === "vivo" ? "si" : "no";
    if (cf !== this.claves.fiesta) {
      this.claves.fiesta = cf;
      this.fiesta = this.cambiar(this.fiesta, cf === "si" ? construirFiesta() : null);
      cambio = true;
    }
    const correo = e.activa && e.hoy === 3 ? "si" : "no";
    if (correo !== this.claves.correo) {
      this.claves.correo = correo;
      this.ponerCorreo(correo === "si");
    }
    const cestos = e.activa && e.hoy === 1 && e.limpieza < 1 ? 4 : 0;
    const peregrinos = e.activa && e.hoy >= 3 ? 2 + Math.round(e.cartas * 8) : 0;
    const cg = `${cestos}:${cantores}:${peregrinos}:${e.fiesta}`;
    if (cg !== this.claves.gente) {
      this.claves.gente = cg;
      this.ponerGente(cestos, cantores, peregrinos, e);
    }
    this.ponerEtiquetas(e, montones, altares, tiendas);
    return cambio;
  }

  private cambiar(viejo: THREE.Group | null, nuevo: THREE.Group | null): THREE.Group | null {
    if (viejo) {
      this.group.remove(viejo);
      liberar(viejo);
    }
    if (nuevo) this.group.add(nuevo);
    return nuevo;
  }

  private ponerCorreo(si: boolean) {
    if (this.correo) {
      this.group.remove(this.correo.fig.root);
      this.correo.fig.dispose();
      this.correo = null;
    }
    if (!si) return;
    // el correo del rey, con su faja, mirando a la plaza
    const fig = new Figure("oficial");
    fig.setRopa({ manto: "#6b4a2f", faja: "#b5562f" });
    const rig = newRig(CORREO[0], CORREO[1], 1);
    rig.y = Y;
    rig.yaw = -Math.PI / 2;
    rig.pose = "talk";
    this.group.add(fig.root);
    this.correo = { fig, rig };
  }

  private ponerGente(cestos: number, cantores: number, peregrinos: number, e: EstadoPascua) {
    for (const p of this.gente) {
      this.crowd.remove(p.handle);
      if (p.cesto) this.group.remove(p.cesto);
    }
    this.gente = [];
    const agregar = (x: number, z: number, yaw: number, hace: Persona["hace"], look: { variant: CrowdVariant; colors: CrowdColors; scale: number }) => {
      const handle = this.crowd.add(look.variant, look.colors);
      if (!handle) return null;
      const rig = newRig(x, z, look.scale);
      rig.y = piso(x, z);
      rig.yaw = yaw;
      const p: Persona = { handle, rig, hace, d: 0 };
      this.gente.push(p);
      return p;
    };
    const levita = (sash: string) => ({ variant: "levita" as const, colors: leviteColors(sash), scale: 1 });
    // los levitas que sacan lo inmundo en cestos: repartidos por el camino de ida y vuelta
    for (let i = 0; i < cestos; i++) {
      const p = agregar(IDA[0][0], IDA[0][1], 0, "cesto", levita("#1e4d8c"));
      if (!p) continue;
      p.camino = CESTOS;
      p.d = (i / cestos) * CESTOS.total;
      p.cesto = new THREE.Mesh(this.cestoGeo, matteMat());
      this.group.add(p.cesto);
    }
    // los cantores con los instrumentos de David y los sacerdotes con trompetas (vestidos de lino)
    for (const c of CANTORES.slice(0, cantores)) {
      const p = agregar(c.x, c.z, Math.PI / 2, c.que === "trompeta" ? "trompeta" : "toca", levita(c.que === "trompeta" ? "#f5f1e6" : "#1e4d8c"));
      if (p) p.rig.pose = c.que === "trompeta" ? "offer" : "play";
    }
    // los peregrinos que entran por la puerta
    for (let i = 0; i < peregrinos; i++) {
      const look = randomVisitor(false);
      const c = caminoPeregrino(i);
      const p = agregar(c.puntos[0][0], c.puntos[0][1], -Math.PI / 2, "peregrino", look);
      if (!p) continue;
      p.camino = c;
      p.d = (i / Math.max(1, peregrinos)) * c.total;
      p.rig.carrying = i % 3 === 0;
    }
    // el gran regocijo: los cantores en la escalinata y el pueblo que se alegra en la plaza
    if (e.fiesta === "fiesta" || e.fiesta === "vivo") {
      for (const g of genteDeFiesta()) agregar(g.x, g.z, g.yaw, g.hace, g.hace === "canta" ? levita("#1e4d8c") : randomVisitor());
    }
  }

  private ponerEtiquetas(e: EstadoPascua, montones: number, altares: number, tiendas: number) {
    for (const t of this.etiquetas) this.overlay.remove(t.el);
    this.etiquetas = [];
    this.etiquetaCantores = null;
    this.etiquetaCorreo = null;
    if (e.hoy !== 2 && this.canto.el) {
      this.overlay.remove(this.canto.el);
      this.canto.el = null;
    }
    if (e.hoy !== 3 && this.pregon.el) {
      this.overlay.remove(this.pregon.el);
      this.pregon.el = null;
    }
    if (!e.activa) return;
    const pon = (texto: string, p: THREE.Vector3, r: number) => {
      const el = this.overlay.make("tpl-tag");
      el.textContent = texto;
      el.style.display = "none";
      const t = { el, p, r };
      this.etiquetas.push(t);
      return t;
    };
    if (e.hoy === 1) {
      // al pie de la escalinata, por donde bajan los levitas con los cestos (desde la plaza se ve; el atrio queda arriba)
      pon(
        montones > 0 ? `Los levitas sacan lo inmundo del templo (${Math.round(e.limpieza * 100)} % limpio)` : "¡La casa de Jehová está limpia! (2 Crónicas 29:18)",
        new THREE.Vector3(43.4, Y + 2.3, 2.6),
        20,
      );
    }
    pon("El torrente de Cedrón (2 Crónicas 29:16)", new THREE.Vector3(CEDRON[0], alturaSuelo(CEDRON[0], CEDRON[1]) + 3.2, CEDRON[1]), 26);
    ALTARES.slice(0, altares).forEach(([x, z]) =>
      pon(e.hoy >= 4 ? "Un altar de Acaz: esta semana lo quitan (2 Crónicas 30:14)" : "Un altar de los días de Acaz (2 Crónicas 28:24)", new THREE.Vector3(x, Y + 1.7, z), 9),
    );
    if (e.hoy === 2) this.etiquetaCantores = pon("Los levitas con los instrumentos de David (2 Crónicas 29:25)", new THREE.Vector3(40.6, P.alturaCiudad(40.6, 0) + 2.6, 0), 18);
    if (e.hoy === 3) this.etiquetaCorreo = pon("El correo del rey (2 Crónicas 30:6)", new THREE.Vector3(CORREO[0], Y + 2.5, CORREO[1]), 20);
    if (tiendas > 0) pon(`Tiendas de peregrinos de todo Israel: ${tiendas}`, new THREE.Vector3(128, alturaSuelo(128, -6) + 4.5, -6), 80);
    if (e.fiesta === "fiesta" || e.fiesta === "vivo") {
      const t = pon(e.fiesta === "vivo" ? "🎉 ¡La gran alabanza! Toca para dar gracias" : "🎉 El gran regocijo: toca para dar gracias", new THREE.Vector3(P.PULPITO[0], Y + 4.2, P.PULPITO[1]), 28);
      t.el.style.pointerEvents = "auto";
      t.el.style.cursor = "pointer";
      t.el.style.background = "rgba(200,90,20,.92)";
      t.el.addEventListener("click", () => this.alTocarFiesta());
    }
  }

  ocluyentes(): THREE.Object3D[] {
    return [];
  }

  /** Una burbuja que aparece cada tanto si el jugador está cerca (lo que cantan los levitas, lo que pregona el correo). */
  private burbuja(b: Burbuja, cerca: boolean, now: number, lineas: { text: string; ref: string }[], quien: string, donde: THREE.Vector3) {
    if (b.el && (now > b.hasta || !cerca)) {
      this.overlay.remove(b.el);
      b.el = null;
    }
    if (cerca && !b.el && now > b.siguiente) {
      const l = lineas[b.i++ % lineas.length];
      const el = this.overlay.make("tpl-frase npc");
      const span = document.createElement("span");
      span.className = "tpl-habla";
      span.textContent = `${quien}: «${l.text}» (${l.ref})`;
      el.appendChild(span);
      b.el = el;
      b.hasta = now + 6500;
      b.siguiente = now + 12000;
    }
    if (b.el && !this.overlay.place(b.el, donde)) b.el.style.display = "none";
  }

  /** Cada cuadro: caminan los levitas con sus cestos y los peregrinos, tocan los cantores y de noche arden las fogatas. */
  animar(dt: number, now: number, jx: number, jz: number, noche: boolean) {
    const e = this.estado;
    if (this.fogatas) this.fogatas.visible = noche;
    for (const p of this.gente) {
      const r = p.rig;
      r.t += dt;
      if (p.camino) {
        // caminar por su camino (1,25 m por segundo)
        p.d += dt * 1.25;
        const q = enCamino(p.camino, p.d);
        const paso = Math.hypot(q.x - r.x, q.z - r.z);
        r.x = q.x;
        r.z = q.z;
        r.y = piso(q.x, q.z);
        r.yaw = q.yaw;
        r.moving = 1;
        r.phase += (paso * 7.2) / r.scale;
        r.pose = "walk";
        if (p.hace === "cesto") {
          // de ida lleva el cesto lleno; de vuelta, las manos libres
          const enIda = p.d % p.camino.total < LARGO_IDA;
          r.carrying = enIda;
          if (p.cesto) {
            p.cesto.visible = enIda;
            p.cesto.position.set(r.x + Math.sin(r.yaw) * 0.34 * r.scale, r.y + 0.86 * r.scale, r.z + Math.cos(r.yaw) * 0.34 * r.scale);
            p.cesto.rotation.y = r.yaw;
          }
        }
      } else if (p.hace === "toca") r.pose = "play";
      else if (p.hace === "trompeta") r.pose = Math.sin(r.t * 0.7 + r.z) > 0.2 ? "offer" : "idle";
      else if (p.hace === "canta") r.pose = e.fiesta === "vivo" ? (Math.sin(r.t * 3) > 0 ? "cheer" : "clap") : "talk";
      else if (p.hace === "alaba") r.pose = e.fiesta === "vivo" || Math.sin(r.t * 0.9 + r.z) > 0.2 ? "cheer" : "clap";
      this.crowd.update(p.handle, r);
      this.sombra(r.x, r.y, r.z, r.scale);
    }
    this.crowd.flush();
    if (this.correo) {
      this.correo.rig.t += dt;
      this.correo.fig.update(this.correo.rig);
      this.sombra(this.correo.rig.x, this.correo.rig.y, this.correo.rig.z, 1);
    }
    // lo que cantan los levitas en la escalinata, y las trompetas de los sacerdotes cada tanto
    if (e.activa && e.hoy === 2) {
      const cerca = Math.hypot(jx - 41, jz) < 20;
      this.burbuja(this.canto, cerca, now, CANTOS, "Los levitas cantan", new THREE.Vector3(40.4, P.alturaCiudad(40.4, 0) + 3.0, 0));
      this.trompetaEn -= dt;
      if (this.trompetaEn <= 0) {
        this.trompetaEn = 75;
        if (Math.hypot(jx - 41, jz) < 34) this.trompeta();
      }
    }
    // lo que pregona el correo del rey junto a la puerta
    if (e.activa && e.hoy === 3) {
      const cerca = Math.hypot(jx - CORREO[0], jz - CORREO[1]) < 20;
      this.burbuja(this.pregon, cerca, now, PREGONES, "El correo del rey pregona", new THREE.Vector3(CORREO[0], Y + 2.4, CORREO[1]));
    }
    for (const t of this.etiquetas) {
      if ((t === this.etiquetaCantores && this.canto.el) || (t === this.etiquetaCorreo && this.pregon.el)) {
        t.el.style.display = "none";
        continue;
      }
      if (Math.hypot(jx - t.p.x, jz - t.p.z) < t.r) this.overlay.place(t.el, t.p);
      else t.el.style.display = "none";
    }
  }

  destroy() {
    for (const t of this.etiquetas) this.overlay.remove(t.el);
    this.overlay.remove(this.canto.el);
    this.overlay.remove(this.pregon.el);
    if (this.correo) this.correo.fig.dispose();
    for (const g of [this.montones, this.cedron, this.altares, this.instrumentos, this.tiendas, this.fiesta]) if (g) liberar(g);
    for (const p of this.gente) if (p.cesto) this.group.remove(p.cesto);
    this.cestoGeo.dispose();
    this.crowd.dispose();
  }
}

/** Para probar el armado fuera del navegador (cuántos vértices suma cada pieza). */
export const piezasDePascua = { construirMontones, construirCedron, construirAltares, construirInstrumentos, construirTiendas };
