/**
 * El huerto de la casa en 3D (Jerusalén en línea, shared/huerto.ts): se sale a él por la puerta del huerto de la casa
 * por dentro. Tiene sus surcos (tantos como dice el servidor: la casa y la obra «ensanchar»), el pozo del camino o el
 * del barrio (o la cisterna de la casa), el granero, los olivos y la higuera.
 *
 * Se camina como en la casa y cada tarea se hace con su gesto, nunca sola al acercarse:
 * - deslizar el dedo a lo largo del surco para arar con la azada, sembrar, abonar y segar con la hoz;
 * - mantener apretado para regar con el cántaro, para sacar agua del pozo y para guardar las gavillas en el granero;
 * - tocar cada mala hierba para arrancarla y cada ave para espantarla.
 * Al terminar el gesto se le pide la tarea al servidor (server/huerto.ts), que decide; la escena muestra lo que él dice.
 * Las plantas crecen por etapas, las hierbas salen y las aves llegan con el tiempo (con los segundos que dice el
 * servidor), y la lluvia del calendario cae también aquí.
 */
import * as THREE from "three";
import { BlobShadows, Figure, newRig, type FigureLook, type Rig } from "../three/characters";
import { NavGrid, collide } from "../three/nav";
import { Overlay, Ring } from "../three/overlay";
import { C, GeoBuilder, avanzarMateriales, disposeGroup, matteMat, meshPair } from "../three/builder";
import type { TempleAudio } from "../audio";
import { gameStore, type AccionHuertoHud, type HuertoHud } from "../store";
import type { Circle, Rect, V2 } from "../layout";
import { relojEnLinea } from "@shared/calendario";
import { diaEnJerusalen } from "@shared/anio";
import { ETAPAS, HERRAMIENTAS, NOMBRE_CALIDAD, NOMBRE_FUENTE, etapaDe, type SemillaId } from "@shared/huerto";
import { articulo, type MercadoEstado, type Parcela, type RopaVista } from "@shared/mercado";
import { Entrada, vibrar } from "../motor/entrada";
import { haciaElPiso } from "../motor/camara";
import { Lluvia } from "../ciudad/clima";

// ---------------------------------------------------------------- el plano del huerto (metros)
const LARGO = 4.8;
const ANCHO = 0.62;
const SEP = 1.3;
const TRAMOS = 12;
/**
 * El muro de la casa con su puerta va al fondo (norte); el campo baja hacia la cámara (sur): el primer surco es el más
 * cerca de la casa.
 */
const Z0 = -1.35;
const ZCASA = -3.6;
const PUERTA: V2 = [0, -3.08];
const POZO: V2 = [-4.35, -0.75];
const GRANERO: V2 = [4.75, -0.4];
/** Donde se apilan las gavillas segadas mientras nadie las lleva al granero. */
const GAVILLAS: V2 = [3.0, -2.6];
const PLAYER_R = 0.22;
/** Del pasillo de atrás del surco (entre el surco y la casa): ahí se pone quien trabaja, mirando a la cámara. */
const PASILLO = ANCHO / 2 + 0.37;

const zSurco = (i: number) => Z0 + i * SEP;
const xTramo = (k: number) => -LARGO / 2 + ((k + 0.5) * LARGO) / TRAMOS;

export type AccionHuerto = "arar" | "sembrar" | "regar" | "llenar" | "hierbas" | "aves" | "abonar" | "cosechar" | "granero";
export type RespuestaHuerto = MercadoEstado & {
  message?: string;
  cosecha?: { bien: "harina" | "aceite"; cuanto: number; estrellas: number; comidas: number; hoz: number; rincon?: number };
  gozoHuerto?: number;
  tareasCumplidas?: { titulo: string; icono: string; gozo: number }[];
  tareasTodas?: number;
  quitadas?: number;
  espantadas?: string;
  guardado?: { harina: number; aceite: number };
  quedan?: { harina: number; aceite: number };
};

export type HuertoOpts = {
  audio: TempleAudio;
  look: FigureLook;
  ropa?: RopaVista;
  /** El nivel de la casa: el muro con la puerta se ve como la casa (la tienda, adobe o piedra). */
  nivel: number;
  alSalir: () => void;
  /** Pide la tarea al servidor; vuelve el estado nuevo, o null si no se pudo (el mensaje ya se mostró). */
  pedir: (accion: AccionHuerto, body: Record<string, unknown>) => Promise<RespuestaHuerto | null>;
};

type GestoDeslizar = { tipo: "deslizar"; accion: "arar" | "sembrar" | "abonar" | "cosechar"; surco: number; extra: Record<string, unknown>; tramos: boolean[]; ultimo: number | null; dedoX: number | null };
type GestoMantener = { tipo: "mantener"; accion: "regar" | "llenar" | "granero"; surco: number | null; progreso: number; apretado: boolean };
type GestoTocar = { tipo: "tocar"; accion: "hierbas" | "aves"; surco: number };
type Gesto = (GestoDeslizar | GestoMantener | GestoTocar) & { terminado: boolean };

type SurcoVisual = { g: THREE.Group; tramos: THREE.Group[]; hierbas: THREE.Group[]; firma: string };
type Ave = {
  g: THREE.Group;
  alas: THREE.Object3D[];
  surco: number;
  x: number;
  y: number;
  z: number;
  t: number;
  estado: "llega" | "come" | "vuela";
  desde: THREE.Vector3;
  vel: THREE.Vector3;
};
type Particula = { o: THREE.Object3D; v: THREE.Vector3; vida: number; max: number; gira?: number; cae?: boolean; encoge?: boolean; /** su forma es compartida: no se libera */ compartida?: boolean };

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}

const tiempo = (s: number) => {
  const m = Math.floor(s / 60);
  return m >= 1 ? `${m} min` : `${Math.max(1, Math.ceil(s))} s`;
};

function malla(b: GeoBuilder, sombra = true): THREE.Mesh {
  const m = new THREE.Mesh(b.build(), matteMat());
  m.castShadow = sombra;
  m.receiveShadow = true;
  return m;
}

// ---------------------------------------------------------------- herramientas y lo que se lleva (en la mano)
/** La azada: el mango de madera y la hoja de hierro (o de madera endurecida), como una «L» (la hoja hacia adelante). */
function herramientaAzada(hierro: boolean): THREE.Group {
  const b = new GeoBuilder();
  b.cyl(0.018, 0.022, 1.05, C.cedro, { y: -0.2, z: 0.08, rx: 0.15 }, 6);
  b.box(0.16, 0.05, 0.12, hierro ? "#6f7378" : "#8a6a42", { y: -0.72, z: 0.2, rx: 0.55 });
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}
/** La hoz: el mango corto y la hoja curva (de piedra o de hierro). */
function herramientaHoz(hierro: boolean): THREE.Group {
  const b = new GeoBuilder();
  b.cyl(0.02, 0.022, 0.24, C.cedroOsc, { y: -0.05 }, 6);
  b.add(new THREE.TorusGeometry(0.13, 0.014, 4, 12, Math.PI * 1.1), hierro ? "#8a8f96" : "#9c9384", { y: -0.24, z: 0.11, ry: Math.PI / 2, rz: -0.3 });
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}
/** El cántaro de barro (o el grande), con agua o vacío. */
function herramientaCantaro(grande: boolean): THREE.Group {
  const k = grande ? 1.25 : 1;
  const b = new GeoBuilder();
  b.lathe([[0, 0], [0.07 * k, 0], [0.12 * k, 0.08 * k], [0.11 * k, 0.2 * k], [0.05 * k, 0.27 * k], [0.055 * k, 0.32 * k], [0, 0.32 * k]], "#b8673a", { y: -0.3 * k, z: 0.06 }, 10);
  b.torus(0.04 * k, 0.012, "#a35a32", { y: -0.06 * k, z: 0.06, rx: Math.PI / 2 }, 4, 10);
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}
/** La bolsa de las semillas (o la canasta del abono). */
function herramientaBolsa(abono: boolean): THREE.Group {
  const b = new GeoBuilder();
  if (abono) {
    b.cyl(0.11, 0.08, 0.12, "#a8844f", { y: -0.1, z: 0.05 }, 10, true);
    b.cyl(0.1, 0.1, 0.02, "#3b2a1a", { y: -0.06, z: 0.05 }, 10);
    b.torus(0.1, 0.008, "#8a6a42", { y: -0.02, z: 0.05, rz: Math.PI / 2 }, 3, 10);
  } else {
    b.sphere(0.09, "#d8c49a", { y: -0.1, z: 0.04, sy: 1.15 }, 8, 6);
    b.cyl(0.03, 0.05, 0.06, "#c9b48a", { y: -0.01, z: 0.04 }, 8);
  }
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}
/** Las gavillas a cuestas (o las cestas de olivas). */
function cargaDeGavillas(aceite: boolean): THREE.Group {
  const b = new GeoBuilder();
  if (aceite) {
    b.cyl(0.16, 0.12, 0.2, "#a8844f", { y: 0.55, z: -0.24 }, 10, true);
    for (let i = 0; i < 7; i++) b.sphere(0.035, i % 2 ? "#3b2a3f" : "#556b2f", { x: Math.cos(i) * 0.08, y: 0.64, z: -0.24 + Math.sin(i) * 0.08 }, 5, 4);
  } else {
    for (const dx of [-0.09, 0.09]) {
      b.cyl(0.07, 0.06, 0.6, "#d8b54a", { x: dx, y: 0.62, z: -0.24, rz: dx * 1.4 }, 8);
      b.torus(0.07, 0.012, "#8a6a42", { x: dx, y: 0.62, z: -0.24, rx: Math.PI / 2 }, 3, 8);
      b.cone(0.09, 0.14, "#e6c35a", { x: dx * 1.6, y: 0.95, z: -0.24, rz: dx * 1.4 }, 8);
    }
  }
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}

// ---------------------------------------------------------------- las plantas, las hierbas y las aves
/** Lo que hay en un tramo del surco según la semilla y su etapa (Marcos 4:28). */
function plantasDelTramo(b: GeoBuilder, s: SemillaId, e: number, k: number, z: number, rnd: () => number) {
  const x = xTramo(k);
  if (s === "olivo") {
    // tres olivos por surco
    if (k % 4 !== 1) return;
    const xo = x + 0.2;
    const alto = [0.16, 0.32, 0.56, 0.74, 0.8][e];
    b.cyl(0.012 + e * 0.008, 0.02 + e * 0.012, alto, "#6e5a43", { x: xo, y: alto / 2, z, rz: (rnd() - 0.5) * 0.15 }, 6);
    if (e === 0) {
      for (const sg of [-1, 1]) b.box(0.05, 0.01, 0.02, "#7b8a5c", { x: xo + sg * 0.03, y: alto, z, rz: sg * 0.5 });
      return;
    }
    const copas = e === 1 ? 1 : e === 2 ? 2 : 3;
    const r = [0, 0.12, 0.2, 0.26, 0.28][e];
    for (let i = 0; i < copas; i++)
      b.add(new THREE.IcosahedronGeometry(r, 0), rnd() < 0.5 ? "#7b8a5c" : "#8a9a6a", { x: xo + (rnd() - 0.5) * r, y: alto + r * 0.5 + i * r * 0.35, z: z + (rnd() - 0.5) * r * 0.8, sy: 0.75 });
    if (e === 3) for (let i = 0; i < 8; i++) b.sphere(0.018, "#f4efe2", { x: xo + (rnd() - 0.5) * r * 1.6, y: alto + r * (0.3 + rnd() * 0.8), z: z + (rnd() - 0.5) * r * 1.4 }, 4, 3);
    if (e === 4) for (let i = 0; i < 12; i++) b.sphere(0.024, rnd() < 0.65 ? "#3b2a3f" : "#556b2f", { x: xo + (rnd() - 0.5) * r * 1.7, y: alto + r * (0.15 + rnd() * 0.9), z: z + (rnd() - 0.5) * r * 1.5, sy: 1.25 }, 5, 4);
    return;
  }
  const cebada = s === "cebada";
  for (const dz of [-0.14, 0.14]) {
    for (let i = 0; i < 2; i++) {
      const xx = x + (i === 0 ? -0.1 : 0.1) + (rnd() - 0.5) * 0.06;
      const zz = z + dz + (rnd() - 0.5) * 0.05;
      if (e === 0) {
        b.sphere(0.028, "#5a4228", { x: xx, y: 0.06, z: zz, sy: 0.5 }, 5, 3);
        b.sphere(0.012, "#d9c27a", { x: xx + 0.02, y: 0.075, z: zz }, 4, 3);
        continue;
      }
      if (e === 1) {
        for (let h = 0; h < 3; h++) b.cone(0.012, 0.1 + rnd() * 0.04, "#7fb04a", { x: xx + (h - 1) * 0.02, y: 0.11, z: zz, rz: (h - 1) * 0.3 }, 4);
        continue;
      }
      if (e === 2) {
        for (let h = 0; h < 4; h++) b.cone(0.014, 0.26 + rnd() * 0.06, "#5f9a3a", { x: xx + (h - 1.5) * 0.02, y: 0.18, z: zz, rz: (h - 1.5) * 0.22, rx: (rnd() - 0.5) * 0.3 }, 4);
        continue;
      }
      const maduro = e === 4;
      const caña = maduro ? (cebada ? "#e3cf86" : "#d8b54a") : "#8fb04a";
      const espiga = maduro ? (cebada ? "#ecdc98" : "#e6c35a") : "#a9c25a";
      const alto = maduro ? 0.52 : 0.44;
      for (let h = 0; h < 3; h++) {
        const inclina = (h - 1) * 0.16 + (maduro ? 0.18 : 0);
        const hx = xx + (h - 1) * 0.025;
        b.cyl(0.006, 0.008, alto, caña, { x: hx + Math.sin(inclina) * alto * 0.5, y: alto / 2 + 0.04, z: zz, rz: -inclina }, 4);
        const tx = hx + Math.sin(inclina) * alto, ty = 0.04 + Math.cos(inclina) * alto;
        b.sphere(0.022, espiga, { x: tx, y: ty + 0.03, z: zz, sx: 0.75, sy: 2.4, rz: -inclina }, 5, 4);
        // las barbas de la cebada
        if (cebada) b.cyl(0.002, 0.002, 0.14, espiga, { x: tx + Math.sin(inclina) * 0.08, y: ty + 0.12, z: zz, rz: -inclina }, 3);
      }
      if (!maduro) b.cone(0.012, 0.2, "#5f9a3a", { x: xx, y: 0.12, z: zz + 0.02, rz: 0.3 }, 4);
    }
  }
}

/** Una mala hierba (un cardo: espinosa, con su flor morada), lista para arrancarse de un toque. */
function malaHierba(rnd: () => number): THREE.Group {
  const b = new GeoBuilder();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + rnd();
    b.cone(0.022, 0.2 + rnd() * 0.08, i % 2 ? "#3f6b2a" : "#4d7a32", { x: Math.cos(a) * 0.03, y: 0.1, z: Math.sin(a) * 0.03, rx: Math.sin(a) * 0.55, rz: -Math.cos(a) * 0.55 }, 4);
  }
  b.cyl(0.008, 0.01, 0.26, "#4d7a32", { y: 0.13 }, 4);
  b.sphere(0.035, "#8a4a9a", { y: 0.28, sy: 0.8 }, 6, 4);
  b.sphere(0.03, "#5a7a32", { y: 0.25 }, 6, 3, Math.PI * 2, Math.PI / 2);
  const g = new THREE.Group();
  g.add(malla(b, false));
  return g;
}

/** Un ave (un gorrión): cuerpo, cabeza, pico, cola y dos alas que se mueven. */
function construirAve(rnd: () => number): { g: THREE.Group; alas: THREE.Object3D[] } {
  const g = new THREE.Group();
  const b = new GeoBuilder();
  const plumas = rnd() < 0.5 ? "#7a6a58" : "#8a7560";
  b.sphere(0.06, plumas, { sx: 1.35, sy: 1, sz: 1 }, 8, 6);
  b.sphere(0.05, "#d8c8a8", { x: 0.01, y: -0.02, sx: 1.2, sy: 0.7, sz: 0.85 }, 6, 4);
  b.sphere(0.04, plumas, { x: 0.07, y: 0.045 }, 8, 6);
  b.cone(0.014, 0.04, "#e0a030", { x: 0.115, y: 0.04, rz: -Math.PI / 2 }, 5);
  for (const sg of [-1, 1]) b.sphere(0.008, C.negro, { x: 0.095, y: 0.055, z: sg * 0.028 }, 4, 3);
  b.box(0.08, 0.012, 0.05, "#5a4a3a", { x: -0.1, y: 0.02, rz: 0.35 });
  for (const sg of [-1, 1]) b.cyl(0.004, 0.004, 0.05, "#c08a40", { x: 0.0, y: -0.07, z: sg * 0.02 }, 3);
  g.add(malla(b, false));
  const alas: THREE.Object3D[] = [];
  for (const sg of [-1, 1]) {
    const ab = new GeoBuilder();
    ab.box(0.09, 0.01, 0.07, "#5f5040", { z: sg * 0.035 });
    const ala = malla(ab, false);
    ala.position.set(-0.005, 0.03, sg * 0.04);
    g.add(ala);
    alas.push(ala);
  }
  return { g, alas };
}

// ---------------------------------------------------------------- el mundo del huerto
export class HuertoWorld {
  private _estado: MercadoEstado;
  private recibido = performance.now();
  readonly audio: TempleAudio;
  private opts: HuertoOpts;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  private hemi = new THREE.HemisphereLight("#fff1d8", "#6a5a3a", 1.1);
  private sol = new THREE.DirectionalLight("#fff0d0", 1.5);
  private suelo: THREE.Mesh;
  private estaticos = new THREE.Group();
  private surcos: SurcoVisual[] = [];
  private gavillasG = new THREE.Group();
  private efectos = new THREE.Group();
  private particulas: Particula[] = [];
  private aves: Ave[] = [];
  private cubo: THREE.Group | null = null;
  private overlay: Overlay;
  private entrada: Entrada;
  private sombras = new BlobShadows(4);
  private lluvia: Lluvia;
  private player: { fig: Figure; rig: Rig; vx: number; vz: number; step: number };
  private puerta: { ring: Ring; etiqueta: HTMLDivElement; inside: boolean };
  private etiquetas: { el: HTMLDivElement; p: THREE.Vector3 }[] = [];
  private rects: Rect[] = [];
  private circles: Circle[] = [];
  private nav: NavGrid | null = null;
  private ruta: V2[] = [];
  private marca: Ring;
  private marcaT = 0;
  private stepAlt = false;
  private camTarget = new THREE.Vector3();
  private camDist = 9;
  private camPh = 0.95;
  private gesto: Gesto | null = null;
  private capa: HTMLDivElement;
  private esperando = false;
  private llevando = false;
  private enMano: { id: string; g: THREE.Group } | null = null;
  private carga: THREE.Group | null = null;
  private avisoTemporal: { texto: string; hasta: number } | null = null;
  private refrescoEn = 0;
  private ultimoRefresco = 0;
  /** Donde termina el campo, hacia la cámara. */
  private zSur = 0;
  private raf = 0;
  private last = 0;
  private running = true;
  private paused = false;
  private time = 0;
  private hudT = 0;
  private relojT = 0;
  private w = 1;
  private h = 1;
  private resizeObs: ResizeObserver;

  constructor(container: HTMLElement, estado: MercadoEstado, opts: HuertoOpts) {
    this.container = container;
    this._estado = estado;
    this.opts = opts;
    this.audio = opts.audio;
    this.audio.lugar("huerto");
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    this.renderer = new THREE.WebGLRenderer({ antialias: !coarse || (window.devicePixelRatio || 1) < 2, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const canvas = this.renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none;outline:none;position:absolute;inset:0";
    canvas.setAttribute("aria-label", "El huerto de tu casa");
    container.appendChild(canvas);

    // la capa de los gestos: mientras se hace una tarea, el dedo trabaja el surco (no mueve al personaje)
    this.capa = document.createElement("div");
    this.capa.style.cssText = "position:absolute;inset:0;touch-action:none;display:none;z-index:2;cursor:crosshair";
    this.capa.setAttribute("data-testid", "huerto-capa-gesto");
    container.appendChild(this.capa);
    this.capa.addEventListener("pointerdown", this.onGestoDown);
    this.capa.addEventListener("pointermove", this.onGestoMove);
    this.capa.addEventListener("pointerup", this.onGestoUp);
    this.capa.addEventListener("pointercancel", this.onGestoUp);

    // la luz del día (y de noche, la luna) y su sombra
    this.sol.castShadow = true;
    this.sol.shadow.mapSize.set(coarse ? 1024 : 2048, coarse ? 1024 : 2048);
    const sc = this.sol.shadow.camera;
    sc.left = -11;
    sc.right = 11;
    sc.top = 11;
    sc.bottom = -11;
    sc.near = 1;
    sc.far = 50;
    this.sol.shadow.bias = -0.0006;
    this.sol.shadow.normalBias = 0.03;
    this.sol.position.set(7, 15, 9);
    this.scene.add(this.hemi, this.sol, this.sol.target);

    this.suelo = new THREE.Mesh(new THREE.PlaneGeometry(80, 80).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: this.colorDelCampo() }));
    this.suelo.position.y = -0.02;
    this.suelo.receiveShadow = true;
    this.scene.add(this.suelo);
    this.lluvia = new Lluvia(coarse, 0);
    this.scene.add(this.lluvia.group);

    this.zSur = zSurco(Math.max(1, estado.huerto.length) - 1) + 1.6;
    this.construirEscenario();
    this.scene.add(this.estaticos, this.gavillasG, this.efectos, this.sombras.mesh);
    this.overlay = new Overlay(container, this.camera);

    // quien sale de la casa: aparece en la puerta del huerto, mirando al campo
    const fig = new Figure(opts.look);
    fig.setRopa(opts.ropa);
    const rig = newRig(PUERTA[0], PUERTA[1] + 0.7);
    rig.yaw = 0;
    this.player = { fig, rig, vx: 0, vz: 0, step: 0 };
    this.scene.add(fig.root);
    this.camTarget.set(rig.x, 0, rig.z + 1.5);

    const ring = new Ring(0.45, "#ffe08a", true);
    ring.set(PUERTA[0], 0.02, PUERTA[1]);
    this.scene.add(ring.mesh);
    this.puerta = { ring, etiqueta: this.overlay.make("tpl-pad", "🏠 Volver a la casa"), inside: false };
    this.marca = new Ring(0.4, "#ffffff", false);
    this.marca.mesh.visible = false;
    this.scene.add(this.marca.mesh);
    // los letreros del pozo y del granero
    for (const [texto, x, z, y] of [
      [`🏺 ${NOMBRE_FUENTE[estado.labranza?.fuente ?? "pozo"]}`, POZO[0], POZO[1], 1.7],
      [estado.labranza?.granero ? "🌾 El granero (con tu granero de las obras)" : "🌾 El granero", GRANERO[0], GRANERO[1], 2.5],
    ] as [string, number, number, number][]) {
      const el = this.overlay.make("tpl-tag", texto);
      this.etiquetas.push({ el, p: new THREE.Vector3(x, y, z) });
    }

    this.dibujarTodo();
    this.reconstruirChoques();
    this.entrada = new Entrada(container, canvas, this.overlay, { ocupado: () => gameStore.busy || !!this.gesto, alPrimerToque: () => this.audio.ensure() });
    document.addEventListener("visibilitychange", this.onVisibility);
    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    const lab = estado.labranza;
    if (lab && lab.gavillas.harina + lab.gavillas.aceite > 0) this.aviso("Tienes gavillas segadas junto al camino: llévalas al granero.", 6000);
    else this.aviso("Camina hasta un surco y elige qué hacer. Cada tarea se hace con tu dedo.", 6000);
    this.pushHud();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  get estado(): MercadoEstado {
    return this._estado;
  }

  // ================================================================ el escenario fijo
  /** El color del campo según la estación del año (verde en las lluvias, dorado en la siega, seco en verano). */
  private colorDelCampo(): string {
    const e = diaEnJerusalen().estacion.id;
    return e === "invierno" || e === "siembra" ? "#86a052" : e === "cebada" ? "#93a555" : e === "trigo" ? "#b8a95e" : e === "verano" ? "#c2ae72" : "#a89a5c";
  }

  private construirEscenario() {
    const g = this.estaticos;
    for (const c of [...g.children]) {
      g.remove(c);
      disposeGroup(c);
    }
    this.rects = [];
    this.circles = [];
    const n = this._estado.huerto.length;
    const zS = this.zSur;
    const m = new GeoBuilder();
    const s = new GeoBuilder();
    const rnd = mulberry32(7);
    const lab = this._estado.labranza;
    // la tierra del campo y los caminos
    const finCampo = zSurco(n - 1) + 0.75;
    m.box(LARGO + 1.4, 0.03, finCampo - (Z0 - 0.75), "#8e7350", { x: 0, y: 0.0, z: (finCampo + Z0 - 0.75) / 2 }, 0.04);
    for (const sx of [-1, 1]) m.box(1.0, 0.025, zS - ZCASA, "#c7b38a", { x: sx * (LARGO / 2 + 1.25), y: 0.005, z: (zS + ZCASA) / 2 }, 0.03);
    m.box(LARGO + 3.6, 0.025, 1.1, "#c7b38a", { x: 0, y: 0.005, z: ZCASA + 0.85 }, 0.03);
    // piedras sueltas y matas en los bordes
    for (let i = 0; i < 40; i++) {
      const x = (rnd() - 0.5) * 12.4, z = ZCASA + rnd() * (zS - ZCASA);
      if (Math.abs(x) < LARGO / 2 + 0.6 && z > Z0 - 0.7 && z < finCampo + 0.2) continue;
      if (rnd() < 0.5) m.sphere(0.05 + rnd() * 0.06, "#b9ab8f", { x, y: 0.02, z, sy: 0.6 }, 5, 3);
      else for (let k = 0; k < 4; k++) m.cone(0.02, 0.12 + rnd() * 0.1, rnd() < 0.5 ? "#7a8f45" : "#a3a060", { x: x + (rnd() - 0.5) * 0.1, y: 0.07, z: z + (rnd() - 0.5) * 0.1, rz: (rnd() - 0.5) * 0.6 }, 4);
    }
    // el cerco de piedra alrededor (oeste, este y norte)
    const piedras = (x0: number, z0: number, x1: number, z1: number) => {
      const largo = Math.hypot(x1 - x0, z1 - z0);
      const pasos = Math.max(1, Math.round(largo / 0.42));
      for (let i = 0; i < pasos; i++) {
        const t = (i + 0.5) / pasos;
        const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
        m.box(0.44, 0.32 + rnd() * 0.08, 0.36, rnd() < 0.5 ? C.piedraOsc : "#c4b28e", { x, y: 0.17, z, ry: Math.atan2(z1 - z0, x1 - x0) + (rnd() - 0.5) * 0.15 }, 0.06);
        if (rnd() < 0.7) m.box(0.34, 0.2, 0.3, rnd() < 0.5 ? C.piedraClara : C.piedra, { x: x + (rnd() - 0.5) * 0.06, y: 0.42, z, ry: Math.atan2(z1 - z0, x1 - x0) + (rnd() - 0.5) * 0.25 }, 0.06);
      }
      this.rects.push([Math.min(x0, x1) - 0.22, Math.min(z0, z1) - 0.22, Math.max(x0, x1) + 0.22, Math.max(z0, z1) + 0.22]);
    };
    piedras(-6.4, zS + 0.6, 6.4, zS + 0.6);
    piedras(-6.4, ZCASA, -6.4, zS + 0.6);
    piedras(6.4, ZCASA, 6.4, zS + 0.6);
    // el muro de la casa con la puerta (como la casa: tienda, adobe o piedra)
    const nivel = this.opts.nivel;
    const colMuro = nivel === 0 ? "#3d3128" : nivel === 1 ? "#c9a77c" : "#d9ccb0";
    const alto = nivel === 0 ? 1.9 : 2.5;
    for (const sx of [-1, 1]) {
      const x0 = sx * 0.62, x1 = sx * 6.6;
      m.box(Math.abs(x1 - x0), alto, 0.3, colMuro, { x: (x0 + x1) / 2, y: alto / 2, z: ZCASA - 0.15 }, 0.03);
      this.rects.push([Math.min(x0, x1), ZCASA - 0.3, Math.max(x0, x1), ZCASA]);
    }
    m.box(1.24, alto - 2.0 + 0.2, 0.3, colMuro, { x: 0, y: 2.0 + (alto - 2.0 + 0.2) / 2 - 0.1, z: ZCASA - 0.15 });
    // el techo de la casa asoma detrás del muro
    if (nivel === 0) m.box(13.4, 0.12, 2.2, "#2a211b", { x: 0, y: alto + 0.15, z: ZCASA - 1.2, rx: -0.25 });
    else m.box(13.4, 0.18, 2.6, nivel === 1 ? "#b8946a" : "#cbbd9e", { x: 0, y: alto + 0.05, z: ZCASA - 1.45 });
    if (nivel === 0) {
      // la tienda: el pelo de cabra con sus postes y las cuerdas
      for (let x = -6; x <= 6; x += 2) m.cyl(0.05, 0.06, 2.2, "#6a4a2a", { x, y: 1.1, z: ZCASA }, 6);
      for (let x = -6; x < 6; x += 2) m.box(2.0, 0.06, 0.32, "#2a211b", { x: x + 1, y: 1.4, z: ZCASA - 0.16 });
    } else {
      // las piedras y las vigas del muro, y dos ventanitas
      for (let x = -6; x <= 6; x += 1.2) if (Math.abs(x) > 0.8) m.box(1.1, 0.05, 0.31, nivel === 1 ? "#b8946a" : "#cbbd9e", { x, y: 0.6 + (Math.round(x * 3) % 2) * 0.7, z: ZCASA - 0.15 });
      for (const x of [-3.4, 3.4]) {
        m.box(0.6, 0.48, 0.05, "#6b4a2e", { x, y: 1.75, z: ZCASA + 0.02 });
        m.box(0.44, 0.34, 0.04, "#2a1d12", { x, y: 1.75, z: ZCASA + 0.04 });
      }
    }
    // la puerta: dos postes, el dintel y la luz de la casa adentro
    for (const sx of [-1, 1]) m.box(0.14, 2.05, 0.36, C.cedroOsc, { x: sx * 0.62, y: 1.02, z: ZCASA - 0.15 });
    m.box(1.4, 0.16, 0.38, C.cedroOsc, { x: 0, y: 2.1, z: ZCASA - 0.15 });
    m.box(1.1, 1.98, 0.05, "#3a2414", { x: 0, y: 0.99, z: ZCASA - 0.34 });
    s.box(1.02, 1.9, 0.02, "#ffcf7a", { x: 0, y: 0.98, z: ZCASA - 0.31 });
    m.box(1.0, 0.05, 0.5, "#8f8a82", { x: 0, y: 0.02, z: ZCASA - 0.05 });
    // la higuera junto a la puerta y las herramientas apoyadas en el muro
    {
      const [x, z] = [-2.6, -2.8];
      m.cyl(0.08, 0.12, 1.6, "#6b4a2e", { x, y: 0.8, z }, 8);
      for (const [dx, dy, dz, r] of [[0, 1.85, 0, 0.6], [0.35, 1.6, 0.18, 0.42], [-0.32, 1.65, -0.14, 0.46], [0.05, 2.15, -0.1, 0.4]])
        m.sphere(r, dy > 2 ? C.hojaClara : C.hoja, { x: x + dx, y: dy, z: z + dz }, 10, 8);
      for (let i = 0; i < 8; i++) m.sphere(0.045, "#6a3a5a", { x: x + Math.cos(i * 1.7) * 0.45, y: 1.55 + (i % 3) * 0.16, z: z + Math.sin(i * 1.7) * 0.38 }, 6, 5);
      this.circles.push([x, z, 0.25]);
      for (let i = 0; i < 3; i++) m.cyl(0.018, 0.02, 1.1, C.cedro, { x: 1.6 + i * 0.22, y: 0.55, z: ZCASA + 0.08, rz: 0.15 - i * 0.12, rx: 0.12 }, 6);
      m.box(0.16, 0.05, 0.12, "#6f7378", { x: 1.68, y: 0.06, z: ZCASA + 0.2, rx: -0.4 });
    }
    // el pozo (o la cisterna de la casa)
    this.construirPozo(m, s, lab?.fuente === "cisterna");
    // el granero (más grande con el granero de las obras)
    this.construirGranero(m, lab?.granero ?? false);
    // los olivos a los lados, junto a la casa (Salmos 52:8)
    const olivos: [number, number][] = [[-5.4, ZCASA + 0.9], [5.5, ZCASA + 0.95], [-5.5, zS - 0.2], [5.45, zS - 0.1]];
    for (const [x, z] of olivos) {
      for (let k = 0; k < 3; k++) m.cyl(0.07, 0.12, 1.1, "#6e5a43", { x: x + (k - 1) * 0.08, y: 0.5, z: z + (k % 2) * 0.06, rz: (k - 1) * 0.28, rx: (rnd() - 0.5) * 0.2 }, 6);
      for (let k = 0; k < 6; k++) m.add(new THREE.IcosahedronGeometry(0.48 + rnd() * 0.18, 0), rnd() < 0.5 ? "#7b8a5c" : "#8a9a6a", { x: x + (rnd() - 0.5) * 1.0, y: 1.35 + rnd() * 0.45, z: z + (rnd() - 0.5) * 0.8, sy: 0.72 });
      for (let k = 0; k < 10; k++) m.sphere(0.03, rnd() < 0.6 ? "#3b2a3f" : "#556b2f", { x: x + (rnd() - 0.5) * 1.1, y: 1.15 + rnd() * 0.6, z: z + 0.35 + rnd() * 0.15 }, 4, 3);
      this.circles.push([x, z, 0.3]);
    }
    g.add(meshPair(m, s));
    this.renderer.shadowMap.needsUpdate = true;
  }

  private construirPozo(m: GeoBuilder, s: GeoBuilder, cisterna: boolean) {
    const [x, z] = POZO;
    const r = cisterna ? 0.62 : 0.48;
    m.cyl(r, r + 0.05, 0.62, C.piedra, { x, y: 0.31, z }, 14);
    m.cyl(r + 0.06, r + 0.06, 0.07, C.piedraClara, { x, y: 0.65, z }, 14);
    m.cyl(r - 0.07, r - 0.07, 0.02, C.agua, { x, y: 0.55, z }, 14);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      m.box(0.2, 0.1, 0.12, i % 2 ? C.piedraOsc : C.piedra, { x: x + Math.cos(a) * (r + 0.02), y: 0.2 + (i % 3) * 0.14, z: z + Math.sin(a) * (r + 0.02), ry: -a }, 0.05);
    }
    for (const sg of [-1, 1]) m.box(0.08, 1.2, 0.08, C.cedroOsc, { x: x + sg * (r + 0.04), y: 1.0, z });
    m.box(2 * r + 0.22, 0.07, 0.07, C.cedroOsc, { x, y: 1.62, z });
    m.cyl(0.07, 0.07, 0.36, C.cedro, { x, y: 1.5, z, rz: Math.PI / 2 }, 10);
    // el pilón para el agua
    m.box(0.9, 0.3, 0.38, C.piedraOsc, { x: x + 0.15, y: 0.15, z: z + r + 0.45 }, 0.04);
    m.box(0.76, 0.02, 0.26, C.agua, { x: x + 0.15, y: 0.29, z: z + r + 0.45 });
    if (cisterna) {
      // la tapa de la cisterna, apoyada, y el balde de bronce
      m.box(0.75, 0.05, 0.75, C.cedroOsc, { x: x - r - 0.25, y: 0.35, z, rz: 1.2 });
      s.cyl(0.06, 0.05, 0.12, C.bronce, { x: x + 0.35, y: 0.73, z: z - 0.3 }, 10);
    }
    // el cubo que baja y sube (se mueve al sacar agua)
    const cb = new GeoBuilder();
    cb.cyl(0.08, 0.065, 0.14, cisterna ? C.bronce : "#7a5634", { y: 0 }, 10);
    cb.box(0.006, 0.6, 0.006, "#cdbb95", { y: 0.37 });
    this.cubo = new THREE.Group();
    this.cubo.add(malla(cb, false));
    this.cubo.position.set(x, 0.85, z);
    this.estaticos.add(this.cubo);
    this.circles.push([x, z, r + 0.12]);
  }

  private construirGranero(m: GeoBuilder, grande: boolean) {
    const [x, z] = GRANERO;
    const w = grande ? 2.2 : 1.8, d = grande ? 2.2 : 1.8, h = grande ? 2.1 : 1.8;
    m.box(w, h, d, C.piedra, { x, y: h / 2, z }, 0.04);
    for (let k = 1; k < 5; k++) m.box(w + 0.02, 0.03, d + 0.02, C.junta, { x, y: (h * k) / 5, z });
    m.box(w + 0.2, 0.14, d + 0.2, C.cedroOsc, { x, y: h + 0.07, z });
    m.box(w + 0.1, 0.08, d + 0.1, "#cdbb95", { x, y: h + 0.18, z });
    // la puerta hacia el campo (al oeste)
    const xp = x - w / 2 - 0.01;
    m.box(0.05, 1.45, 0.86, "#7a4a26", { x: xp, y: 0.73, z: z + 0.1 });
    for (const dz of [-0.24, 0.24]) m.box(0.04, 1.3, 0.3, "#8f5a30", { x: xp - 0.02, y: 0.72, z: z + 0.1 + dz });
    m.box(0.12, 0.12, 1.06, C.cedroOsc, { x: xp, y: 1.5, z: z + 0.1 });
    // sacos y tinajas junto a la puerta
    for (const [dz, k] of [[-0.85, 1], [0.95, 0.9]] as [number, number][]) m.sphere(0.2 * k, "#d8c27a", { x: xp - 0.3, y: 0.14 * k, z: z + dz, sx: 1.2, sy: 0.75 }, 7, 5);
    const tinajas = grande ? 3 : 1;
    for (let i = 0; i < tinajas; i++) m.lathe([[0, 0], [0.12, 0], [0.22, 0.24], [0.18, 0.52], [0.1, 0.64], [0, 0.64]], "#b8673a", { x: x + w / 2 + 0.25, y: 0, z: z - 0.6 + i * 0.6 }, 10);
    this.rects.push([x - w / 2 - 0.05, z - d / 2 - 0.05, x + w / 2 + 0.05 + (tinajas ? 0.45 : 0), z + d / 2 + 0.05]);
  }

  // ================================================================ los surcos
  /** Cómo está un surco ahora en la pantalla (con el tiempo que pasó desde lo que dijo el servidor). */
  private ahoraDe(n: number): { p: Parcela; faltan: number; etapa: number; hierbas: number; aves: boolean; avesPronto: number | null } {
    const p = this._estado.huerto[n];
    const pasado = (performance.now() - this.recibido) / 1000;
    const faltan = p.semilla ? Math.max(0, (p.faltan ?? 0) - pasado) : 0;
    const etapa = p.semilla ? etapaDe(p.total ? 1 - faltan / p.total : 1) : 0;
    const hierbas = Math.min(3, (p.hierbas ?? 0) + (p.semilla && p.hierbaEn != null && pasado >= p.hierbaEn ? 1 : 0));
    let aves = !!p.aves && (p.avesHasta == null || pasado < p.avesHasta);
    if (!p.aves && p.semilla && p.avesEn != null && pasado >= p.avesEn) aves = true;
    return { p, faltan, etapa, hierbas, aves, avesPronto: !p.aves && p.avesEn != null ? Math.max(0, p.avesEn - pasado) : null };
  }

  private dibujarTodo() {
    const n = this._estado.huerto.length;
    while (this.surcos.length > n) {
      const sv = this.surcos.pop()!;
      this.scene.remove(sv.g);
      disposeGroup(sv.g);
    }
    for (let i = 0; i < n; i++) this.dibujarSurco(i);
    this.dibujarGavillas();
  }

  /** Vuelve a dibujar un surco si cambió lo que se ve (la tierra, lo sembrado y su etapa, el riego, el abono, las hierbas). */
  private dibujarSurco(i: number, forzar = false) {
    const a = this.ahoraDe(i);
    const p = a.p;
    const firma = `${p.semilla}|${a.etapa}|${p.arado ? 1 : 0}|${p.regado ? 1 : 0}|${p.abono ? 1 : 0}|${a.hierbas}`;
    const antes = this.surcos[i];
    if (antes && antes.firma === firma && !forzar) return;
    if (antes) {
      this.scene.remove(antes.g);
      disposeGroup(antes.g);
    }
    const z = zSurco(i);
    const g = new THREE.Group();
    const rnd = mulberry32(1000 + i * 31 + (p.plantado ? p.plantado.length : 0));
    // la tierra
    const b = new GeoBuilder();
    const arado = !!p.arado || !!p.semilla;
    const mojado = !!p.regado;
    const tierra = arado ? (mojado ? "#4f3b28" : "#6b5033") : "#a98d62";
    b.box(LARGO + 0.25, 0.06, ANCHO + 0.2, tierra, { y: 0.03, z }, 0.05);
    if (arado) {
      for (const dz of [-0.15, 0.15]) b.box(LARGO + 0.1, 0.09, 0.17, mojado ? "#45331f" : "#5d4529", { y: 0.075, z: z + dz }, 0.07);
      b.box(LARGO + 0.1, 0.02, 0.06, mojado ? "#3a2b1b" : "#4e3a22", { y: 0.065, z });
      if (mojado) for (let k = 0; k < 6; k++) b.sphere(0.06 + rnd() * 0.05, "#5d6f82", { x: (rnd() - 0.5) * LARGO, y: 0.058, z: z + (rnd() - 0.5) * 0.3, sy: 0.08 }, 6, 3);
      if (p.abono) for (let k = 0; k < 26; k++) b.sphere(0.02 + rnd() * 0.015, "#2e2116", { x: (rnd() - 0.5) * LARGO, y: 0.12, z: z + (rnd() - 0.5) * 0.42, sy: 0.6 }, 4, 3);
    } else {
      // sin arar: tierra dura, rastrojo seco y piedritas
      for (let k = 0; k < 18; k++) b.cone(0.012, 0.08 + rnd() * 0.06, rnd() < 0.5 ? "#c9b26a" : "#b39a5a", { x: (rnd() - 0.5) * LARGO, y: 0.1, z: z + (rnd() - 0.5) * 0.4, rz: (rnd() - 0.5) * 0.8 }, 3);
      for (let k = 0; k < 8; k++) b.sphere(0.03 + rnd() * 0.02, "#b9ab8f", { x: (rnd() - 0.5) * LARGO, y: 0.07, z: z + (rnd() - 0.5) * 0.4, sy: 0.6 }, 4, 3);
    }
    g.add(malla(b));
    // lo sembrado, por tramos (al segar, cada tramo cae por su lado)
    const tramos: THREE.Group[] = [];
    for (let k = 0; k < TRAMOS; k++) {
      const tg = new THREE.Group();
      if (p.semilla) {
        const pb = new GeoBuilder();
        plantasDelTramo(pb, p.semilla, a.etapa, k, z, rnd);
        if (!pb.empty) tg.add(malla(pb));
      }
      g.add(tg);
      tramos.push(tg);
    }
    // las malas hierbas (cada una se arranca con un toque)
    const hierbas: THREE.Group[] = [];
    const lugares: [number, number][] = [[2, -0.29], [7, 0.29], [10, -0.29]];
    for (let h = 0; h < a.hierbas; h++) {
      const hg = malaHierba(rnd);
      const [k, dz] = lugares[h];
      hg.position.set(xTramo(k) + 0.08, 0.04, z + dz);
      hg.rotation.y = rnd() * 6;
      g.add(hg);
      hierbas.push(hg);
    }
    this.scene.add(g);
    this.surcos[i] = { g, tramos, hierbas, firma };
    this.renderer.shadowMap.needsUpdate = true;
  }

  /** Las aves que están: llegan volando, picotean y se van al espantarlas (o al comer). */
  private actualizarAves() {
    const n = this._estado.huerto.length;
    for (let i = 0; i < n; i++) {
      const a = this.ahoraDe(i);
      const tiene = this.aves.filter((x) => x.surco === i && x.estado !== "vuela");
      if (a.aves && !tiene.length) {
        const rnd = mulberry32(Math.floor(performance.now()) + i);
        const cuantas = a.etapa >= 4 ? 3 : 2;
        for (let k = 0; k < cuantas; k++) {
          const { g, alas } = construirAve(rnd);
          const x = xTramo(2 + Math.floor(rnd() * 8)) + (rnd() - 0.5) * 0.2;
          const z = zSurco(i) + (rnd() - 0.5) * 0.3;
          const desde = new THREE.Vector3(x + (rnd() - 0.5) * 6, 4 + rnd() * 2, z - 6 - rnd() * 3);
          g.position.copy(desde);
          this.scene.add(g);
          this.aves.push({ g, alas, surco: i, x, y: a.etapa >= 3 ? 0.4 : 0.1, z, t: rnd() * 2, estado: "llega", desde, vel: new THREE.Vector3() });
        }
        if (this.opts.audio) this.audio.coo(0.6);
        this.pedirRefresco();
      } else if (!a.aves && tiene.length) {
        for (const av of tiene) this.espantarAve(av, false);
        // las de la siembra se fueron porque comieron
        if (a.p.avesHasta != null) {
          this.aviso(`🐦 Las aves se comieron parte de la semilla del surco ${i + 1} (Mateo 13:4). La próxima vez, espántalas.`, 5000);
          this.pedirRefresco();
        }
      }
    }
  }

  private espantarAve(av: Ave, conSonido = true) {
    if (av.estado === "vuela") return;
    av.estado = "vuela";
    av.t = 0;
    const a = Math.random() * Math.PI * 2;
    av.vel.set(Math.cos(a) * 2.2, 3.2 + Math.random(), -2.6 + Math.sin(a) * 1.2);
    if (conSonido) {
      this.audio.page();
      vibrar(12);
    }
  }

  private updateAves(dt: number) {
    for (let i = this.aves.length - 1; i >= 0; i--) {
      const av = this.aves[i];
      av.t += dt;
      const aleteo = Math.sin(av.t * 38) * 0.9;
      if (av.estado === "llega") {
        const k = Math.min(1, av.t / 1.4);
        const e = 1 - (1 - k) * (1 - k);
        av.g.position.set(av.desde.x + (av.x - av.desde.x) * e, av.desde.y + (av.y - av.desde.y) * e, av.desde.z + (av.z - av.desde.z) * e);
        av.g.rotation.y = Math.atan2(-(av.z - av.desde.z), av.x - av.desde.x);
        for (const al of av.alas) al.rotation.x = aleteo * (al.position.z > 0 ? 1 : -1);
        if (k >= 1) {
          av.estado = "come";
          av.t = Math.random();
        }
      } else if (av.estado === "come") {
        // salta y picotea
        const salto = Math.max(0, Math.sin(av.t * 5)) * 0.05;
        av.g.position.set(av.x + Math.sin(av.t * 0.7) * 0.15, av.y + salto, av.z);
        av.g.rotation.z = Math.max(0, Math.sin(av.t * 9)) * 0.5;
        av.g.rotation.y = Math.sin(av.t * 0.5) * 2.5;
        for (const al of av.alas) al.rotation.x = 0;
      } else {
        av.g.position.addScaledVector(av.vel, dt);
        av.vel.y += 0.6 * dt;
        av.g.rotation.y = Math.atan2(-av.vel.z, av.vel.x);
        for (const al of av.alas) al.rotation.x = aleteo * (al.position.z > 0 ? 1 : -1);
        if (av.t > 3) {
          this.scene.remove(av.g);
          disposeGroup(av.g);
          this.aves.splice(i, 1);
        }
      }
    }
  }

  /** Las gavillas (o cestas de olivas) segadas que esperan junto al camino para ir al granero. */
  private dibujarGavillas() {
    for (const c of [...this.gavillasG.children]) {
      this.gavillasG.remove(c);
      disposeGroup(c);
    }
    const lab = this._estado.labranza;
    if (!lab || this.llevando) return;
    const harina = Math.min(12, lab.gavillas.harina);
    const aceite = Math.min(6, lab.gavillas.aceite);
    if (!harina && !aceite) return;
    const b = new GeoBuilder();
    const [x0, z0] = GAVILLAS;
    for (let i = 0; i < harina; i++) {
      const x = x0 + (i % 4) * 0.22 - 0.33, z = z0 + Math.floor(i / 4) * 0.2 - 0.2, y = 0.12 + Math.floor(i / 8) * 0.2;
      b.cyl(0.07, 0.065, 0.42, "#d8b54a", { x, y, z, rx: Math.PI / 2 }, 8);
      b.torus(0.07, 0.012, "#8a6a42", { x, y, z, ry: Math.PI / 2 }, 3, 8);
      b.cone(0.09, 0.14, "#e6c35a", { x, y, z: z - 0.27, rx: -Math.PI / 2 }, 8);
    }
    for (let i = 0; i < aceite; i++) {
      const x = x0 + 0.75 + (i % 2) * 0.34, z = z0 + Math.floor(i / 2) * 0.32 - 0.3;
      b.cyl(0.15, 0.11, 0.2, "#a8844f", { x, y: 0.1, z }, 10, true);
      for (let k = 0; k < 6; k++) b.sphere(0.035, k % 2 ? "#3b2a3f" : "#556b2f", { x: x + Math.cos(k) * 0.07, y: 0.19, z: z + Math.sin(k) * 0.07 }, 5, 4);
    }
    this.gavillasG.add(malla(b));
  }

  // ================================================================ lo que hay cerca y las tareas
  private cercaDe(): NonNullable<HuertoHud["cerca"]> | null {
    const r = this.player.rig;
    const lab = this._estado.labranza;
    const est = this._estado;
    const total = lab ? lab.gavillas.harina + lab.gavillas.aceite : 0;
    // el granero (con las gavillas a cuestas o pendientes)
    const puertaGranero: V2 = [GRANERO[0] - 1.25, GRANERO[1] + 0.1];
    if (Math.hypot(r.x - puertaGranero[0], r.z - puertaGranero[1]) < 1.35) {
      const acciones: AccionHuertoHud[] = [];
      if (this.llevando) acciones.push({ id: "granero", nombre: "Guardar las gavillas en el granero", icono: "🌾" });
      else if (total) acciones.push({ id: "granero", nombre: "Guardar las gavillas", icono: "🌾", no: "Primero carga las gavillas que están junto al camino." });
      return {
        tipo: "granero",
        titulo: "El granero",
        estado: `Cabe en tu alfolí: ${lab?.libre.harina ?? 0} de harina y ${lab?.libre.aceite ?? 0} de aceite.${total ? ` Segadas: ${total}.` : ""}`,
        acciones,
      };
    }
    if (total && !this.llevando && Math.hypot(r.x - GAVILLAS[0] - 0.2, r.z - GAVILLAS[1]) < 1.3) {
      return {
        tipo: "gavillas",
        titulo: lab?.gavillas.aceite && !lab.gavillas.harina ? "Las cestas de olivas" : "Las gavillas segadas",
        estado: `${lab?.gavillas.harina ? `${lab.gavillas.harina} de harina` : ""}${lab?.gavillas.harina && lab?.gavillas.aceite ? " y " : ""}${lab?.gavillas.aceite ? `${lab.gavillas.aceite} de aceite` : ""}: llévalas al granero.`,
        acciones: [{ id: "cargar", nombre: "Cargar las gavillas", icono: "🧺" }],
      };
    }
    // el pozo
    if (Math.hypot(r.x - POZO[0], r.z - POZO[1]) < 1.45 && lab) {
      const lleno = lab.agua >= lab.carga;
      const tope = lab.pozo.max !== null && lab.pozo.hoy >= lab.pozo.max;
      return {
        tipo: "pozo",
        titulo: NOMBRE_FUENTE[lab.fuente],
        estado: `Tu cántaro: ${lab.agua} de ${lab.carga} riegos.${lab.pozo.max !== null ? ` Hoy sacaste ${lab.pozo.hoy} de ${lab.pozo.max} cántaros.` : " Sin tope de cántaros."}`,
        acciones: [{ id: "llenar", nombre: "Sacar agua y llenar el cántaro", icono: "🏺", ...(lleno ? { no: "Tu cántaro ya está lleno." } : tope ? { no: "Por hoy ya sacaste todos los cántaros del pozo." } : {}) }],
      };
    }
    // el surco más cercano
    let mejor = -1;
    let dist = 0.95;
    for (let i = 0; i < est.huerto.length; i++) {
      const z = zSurco(i);
      const dx = Math.max(0, Math.abs(r.x) - LARGO / 2);
      const dz = Math.max(0, Math.abs(r.z - z) - ANCHO / 2);
      const d = Math.hypot(dx, dz);
      if (d < dist) {
        dist = d;
        mejor = i;
      }
    }
    if (mejor >= 0) return this.cercaSurco(mejor);
    if (Math.hypot(r.x - PUERTA[0], r.z - PUERTA[1]) < 1.4) return { tipo: "puerta", titulo: "La puerta de la casa", estado: "Párate en el círculo para volver a la casa.", acciones: [] };
    return null;
  }

  private cercaSurco(i: number): NonNullable<HuertoHud["cerca"]> {
    const a = this.ahoraDe(i);
    const p = a.p;
    const lab = this._estado.labranza;
    const acciones: AccionHuertoHud[] = [];
    let estado: string;
    const titulo = `Surco ${i + 1}${p.semilla ? ` · ${articulo(p.semilla)?.icono ?? ""} ${p.semilla === "olivo" ? "olivos" : p.semilla}` : ""}`;
    if (!p.semilla) {
      if (!p.arado) {
        estado = "Tierra dura: hay que ararla con la azada antes de sembrar.";
        acciones.push({ id: "arar", nombre: lab?.herramientas.azada === 2 ? "Arar con la azada de hierro" : "Arar con la azada", icono: "⛏️" });
      } else {
        estado = "Arado y listo para sembrar.";
        const tengo = (["trigo", "cebada", "olivo"] as const).filter((s) => (this._estado.semillas[s] || 0) > 0);
        const cultivo = diaEnJerusalen().estacion.cultivo;
        if (!tengo.length) acciones.push({ id: "sembrar", nombre: "Sembrar", icono: "🌱", no: "No tienes semillas: cómpralas al sembrador del mercado." });
        for (const s of tengo)
          acciones.push({
            id: "sembrar",
            nombre: `Sembrar ${s === "olivo" ? "olivos" : s} (${this._estado.semillas[s]})${cultivo === s ? " · de la estación" : ""}`,
            icono: articulo(s)?.icono ?? "🌱",
            extra: { semilla: s },
          });
      }
    } else {
      const etapa = ETAPAS[p.semilla][a.etapa];
      const cuidados = [p.regado ? (p.lluvia ? "🌧️ regado por la lluvia" : p.cisterna ? "💧 regado por la cisterna" : "💧 regado") : "sin regar", p.abono ? "🐑 abonado" : null, a.hierbas ? `🌿 ${a.hierbas} ${a.hierbas === 1 ? "mala hierba" : "malas hierbas"}` : "sin hierbas", a.aves ? "🐦 ¡hay aves!" : null]
        .filter(Boolean)
        .join(" · ");
      const listo = a.faltan <= 0;
      const estrellas = Math.max(0, Number(p.regado) + Number(!a.hierbas) + Number(!!p.abono));
      estado = `${etapa}${listo ? "" : ` · ${tiempo(a.faltan)}`}${/[!.]$/.test(etapa) && listo ? "" : "."} ${cuidados}.${estrellas ? ` ${"⭐".repeat(estrellas)}` : ""}`;
      if (a.aves) acciones.push({ id: "aves", nombre: "Espantar las aves", icono: "🐦" });
      if (a.hierbas) acciones.push({ id: "hierbas", nombre: `Arrancar las malas hierbas (${a.hierbas})`, icono: "🌿" });
      if (!listo && !p.regado) acciones.push({ id: "regar", nombre: "Regar con el cántaro", icono: "💧", ...(lab && lab.agua < 1 ? { no: "Tu cántaro está vacío: llénalo en el pozo." } : {}) });
      if (!listo && !p.abono)
        acciones.push({
          id: "abonar",
          nombre: "Abonar con lo del redil",
          icono: "🐑",
          ...(lab && lab.abono.hay < 1 ? { no: lab.abono.ovejas ? `Tu redil todavía no tiene abono${lab.abono.proxima ? `: sale en ${tiempo(lab.abono.proxima)}` : ""}.` : "Hacen falta ovejas en tu redil (Tu casa → Oficios)." } : {}),
        });
      if (listo) {
        acciones.push({ id: "cosechar", nombre: lab?.herramientas.hoz === 2 ? "Segar con la hoz de hierro" : "Segar con la hoz", icono: "🌾" });
        if (lab && lab.rincones.hoy < lab.rincones.max) acciones.push({ id: "cosechar", nombre: "Segar y dejar el rincón para el pobre", icono: "🤲", extra: { rincon: true } });
      }
    }
    return { tipo: "surco", n: i, titulo, estado, acciones };
  }

  /** Empieza una tarea (desde un botón de la pantalla): el gesto, o cargar las gavillas. */
  empezar(accion: string, extra: Record<string, unknown> = {}) {
    if (this.gesto || this.esperando) return;
    const cerca = this.cercaDe();
    const r = this.player.rig;
    this.ruta = [];
    this.player.vx = this.player.vz = 0;
    if (accion === "cargar") {
      this.llevando = true;
      this.dibujarGavillas();
      const lab = this._estado.labranza;
      this.carga = cargaDeGavillas(!!lab && lab.gavillas.aceite > 0 && !lab.gavillas.harina);
      this.player.fig.aLaEspalda(this.carga);
      this.audio.pickup(0);
      this.aviso("Lleva las gavillas al granero (a la derecha) y guárdalas allí.", 5000);
      this.pushHud();
      return;
    }
    if (accion === "llenar") {
      this.empezarMantener("llenar", null);
      r.yaw = Math.atan2(POZO[0] - r.x, POZO[1] - r.z);
      this.ponerEnMano("cantaro");
      return;
    }
    if (accion === "granero") {
      if (!this.llevando) return;
      this.empezarMantener("granero", null);
      r.yaw = Math.atan2(GRANERO[0] - r.x, GRANERO[1] - r.z);
      return;
    }
    const n = cerca?.tipo === "surco" ? cerca.n ?? -1 : -1;
    if (n < 0) return;
    // el personaje se pone en el pasillo de atrás del surco, mirando al surco (y a la cámara: así no lo tapa)
    r.z = zSurco(n) - PASILLO;
    r.x = Math.max(-LARGO / 2, Math.min(LARGO / 2, r.x));
    r.yaw = 0;
    if (accion === "arar" || accion === "sembrar" || accion === "abonar" || accion === "cosechar") {
      this.gesto = { tipo: "deslizar", accion, surco: n, extra, tramos: Array(TRAMOS).fill(false), ultimo: null, dedoX: null, terminado: false };
      this.ponerEnMano(accion === "arar" ? "azada" : accion === "cosechar" ? "hoz" : accion === "abonar" ? "abono" : "semillas");
    } else if (accion === "regar") {
      this.empezarMantener("regar", n);
      this.ponerEnMano("cantaro");
    } else if (accion === "hierbas" || accion === "aves") {
      this.gesto = { tipo: "tocar", accion, surco: n, terminado: false };
      this.ponerEnMano(null);
      const hay = accion === "hierbas" ? (this.surcos[n]?.hierbas.length ?? 0) : this.aves.filter((a) => a.surco === n && a.estado !== "vuela").length;
      if (!hay) {
        void this.completar();
        return;
      }
    } else return;
    this.capa.style.display = "block";
    this.audio.page();
    this.pushHud();
  }

  private empezarMantener(accion: "regar" | "llenar" | "granero", surco: number | null) {
    this.gesto = { tipo: "mantener", accion, surco, progreso: 0, apretado: false, terminado: false };
    this.capa.style.display = "block";
    this.audio.page();
    this.pushHud();
  }

  /** Deja la tarea a medias (lo que se hizo con el dedo se deshace). */
  cancelar() {
    if (!this.gesto || this.gesto.terminado) return;
    this.terminarGesto();
    if (this.surcos.length) for (let i = 0; i < this.surcos.length; i++) this.dibujarSurco(i, true);
    this.player.rig.pose = "idle";
    this.pushHud();
  }

  private terminarGesto() {
    this.gesto = null;
    this.capa.style.display = "none";
    this.limpiarEfectos();
    this.ponerEnMano(null);
  }

  private limpiarEfectos() {
    for (const c of [...this.efectos.children]) {
      this.efectos.remove(c);
      disposeGroup(c);
    }
  }

  private ponerEnMano(id: "azada" | "hoz" | "cantaro" | "semillas" | "abono" | null) {
    if ((this.enMano?.id ?? null) === id) return;
    if (this.enMano) {
      this.player.fig.enMano(null);
      disposeGroup(this.enMano.g);
      this.enMano = null;
    }
    if (!id) return;
    const lab = this._estado.labranza;
    const g =
      id === "azada"
        ? herramientaAzada(lab?.herramientas.azada === 2)
        : id === "hoz"
          ? herramientaHoz(lab?.herramientas.hoz === 2)
          : id === "cantaro"
            ? herramientaCantaro(lab?.herramientas.cantaro === 2)
            : herramientaBolsa(id === "abono");
    this.player.fig.enMano(g);
    this.enMano = { id, g };
  }

  // ---------------------------------------------------------------- los gestos con el dedo
  private puntoDe(e: PointerEvent): [number, number] | null {
    const rc = this.container.getBoundingClientRect();
    return haciaElPiso(this.camera, (e.clientX - rc.left) / this.w, (e.clientY - rc.top) / this.h, 0.08);
  }

  private onGestoDown = (e: PointerEvent) => {
    const g = this.gesto;
    if (!g || g.terminado) return;
    e.preventDefault();
    try {
      this.capa.setPointerCapture(e.pointerId);
    } catch {
      /* sin captura */
    }
    this.audio.ensure();
    if (g.tipo === "deslizar") this.marcarTramo(e);
    else if (g.tipo === "mantener") g.apretado = true;
    else this.tocarObjeto(e);
  };

  private onGestoMove = (e: PointerEvent) => {
    const g = this.gesto;
    if (!g || g.terminado || g.tipo !== "deslizar" || !(e.buttons & 1 || e.pointerType === "touch")) return;
    this.marcarTramo(e);
  };

  private onGestoUp = () => {
    const g = this.gesto;
    if (!g) return;
    if (g.tipo === "deslizar") g.ultimo = null;
    else if (g.tipo === "mantener") g.apretado = false;
  };

  private marcarTramo(e: PointerEvent) {
    const g = this.gesto;
    if (!g || g.tipo !== "deslizar" || g.terminado) return;
    const pt = this.puntoDe(e);
    if (!pt) return;
    const [x, z] = pt;
    if (Math.abs(z - zSurco(g.surco)) > 1.0 || Math.abs(x) > LARGO / 2 + 0.45) return;
    const k = Math.max(0, Math.min(TRAMOS - 1, Math.floor(((x + LARGO / 2) / LARGO) * TRAMOS)));
    g.dedoX = Math.max(-LARGO / 2, Math.min(LARGO / 2, x));
    const desde = g.ultimo ?? k;
    const [a, b] = desde < k ? [desde, k] : [k, desde];
    for (let t = a; t <= b; t++) {
      if (g.tramos[t]) continue;
      g.tramos[t] = true;
      this.efectoTramo(g, t);
    }
    g.ultimo = k;
    const hechos = g.tramos.filter(Boolean).length;
    if (hechos >= TRAMOS - 2) void this.completar();
    this.pushHud();
  }

  /** Lo que se ve en cada tramo mientras se trabaja: la tierra volteada, la semilla, el abono o la mies segada. */
  private efectoTramo(g: GestoDeslizar, k: number) {
    const z = zSurco(g.surco);
    const x = xTramo(k);
    const b = new GeoBuilder();
    const rnd = mulberry32(k * 97 + g.surco);
    if (g.accion === "arar") {
      for (const dz of [-0.15, 0.15]) b.box(LARGO / TRAMOS + 0.02, 0.1, 0.18, "#5d4529", { x, y: 0.08, z: z + dz }, 0.08);
      b.box(LARGO / TRAMOS + 0.02, 0.07, ANCHO + 0.18, "#6b5033", { x, y: 0.035, z });
      this.polvo(x, z, "#8a6a42", 5);
      this.audio.footstep(k % 2 === 0);
    } else if (g.accion === "sembrar") {
      for (let i = 0; i < 6; i++) b.sphere(0.014, "#e0c98a", { x: x + (rnd() - 0.5) * 0.36, y: 0.13, z: z + (rnd() - 0.5) * 0.36 }, 4, 3);
      this.semillasAlAire(x, z, "#e0c98a");
    } else if (g.accion === "abonar") {
      for (let i = 0; i < 8; i++) b.sphere(0.022, "#2e2116", { x: x + (rnd() - 0.5) * 0.38, y: 0.13, z: z + (rnd() - 0.5) * 0.4, sy: 0.6 }, 4, 3);
      this.semillasAlAire(x, z, "#3b2a1a");
    } else {
      // segar: el tramo cae y queda el rastrojo
      const sv = this.surcos[g.surco];
      const t = sv?.tramos[k];
      if (t) t.visible = false;
      const s = this._estado.huerto[g.surco]?.semilla;
      if (s === "olivo") {
        if (k % 4 === 1) for (let i = 0; i < 6; i++) this.particula(b2Oliva(), x + 0.2, 0.9, z, (Math.random() - 0.5) * 0.6, 0.4, (Math.random() - 0.5) * 0.6, 1.0);
        if (k % 4 === 1) {
          b.cyl(0.03, 0.05, 0.8, "#6e5a43", { x: x + 0.2, y: 0.4, z }, 6);
          for (let i = 0; i < 3; i++) b.add(new THREE.IcosahedronGeometry(0.26, 0), "#7b8a5c", { x: x + 0.2 + (rnd() - 0.5) * 0.3, y: 0.95 + i * 0.08, z: z + (rnd() - 0.5) * 0.2, sy: 0.75 });
        }
      } else {
        for (const dz of [-0.14, 0.14]) for (let i = 0; i < 3; i++) b.cyl(0.006, 0.006, 0.07, "#c9a64a", { x: x + (i - 1) * 0.1, y: 0.1, z: z + dz }, 3);
        for (let i = 0; i < 3; i++) this.particula(b2Espiga(), x + (Math.random() - 0.5) * 0.3, 0.45, z + (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.8, 0.9, 0.6 + Math.random() * 0.4, 0.9, 6);
      }
      this.audio.flour();
    }
    if (!b.empty) {
      const m = malla(b, false);
      this.efectos.add(m);
    }
    vibrar(8);
  }

  /** Tocar una mala hierba o un ave (la más cercana al dedo, en la pantalla). */
  private tocarObjeto(e: PointerEvent) {
    const g = this.gesto;
    if (!g || g.tipo !== "tocar" || g.terminado) return;
    const rc = this.container.getBoundingClientRect();
    const px = e.clientX - rc.left, py = e.clientY - rc.top;
    const v = new THREE.Vector3();
    const enPantalla = (o: THREE.Object3D) => {
      o.getWorldPosition(v);
      v.y += 0.1;
      v.project(this.camera);
      return Math.hypot((v.x * 0.5 + 0.5) * this.w - px, (-v.y * 0.5 + 0.5) * this.h - py);
    };
    const radio = Math.max(46, Math.min(this.w, this.h) * 0.09);
    if (g.accion === "hierbas") {
      const sv = this.surcos[g.surco];
      const lista = sv?.hierbas.filter((h) => h.visible) ?? [];
      let mejor: THREE.Group | null = null;
      let d0 = radio;
      for (const h of lista) {
        const d = enPantalla(h);
        if (d < d0) {
          d0 = d;
          mejor = h;
        }
      }
      if (!mejor) return;
      // la hierba sale de raíz y vuela a un lado
      mejor.visible = false;
      const copia = mejor.clone();
      copia.visible = true;
      this.scene.add(copia);
      this.particulas.push({ o: copia, v: new THREE.Vector3((Math.random() - 0.5) * 1.5, 2.6, 1.2), vida: 0, max: 1.1, gira: 6, cae: true, encoge: true });
      this.polvo(mejor.position.x, mejor.position.z, "#6b5033", 4);
      this.audio.pickup(1);
      vibrar(15);
      this.player.rig.x = Math.max(-LARGO / 2, Math.min(LARGO / 2, mejor.position.x));
      if (!lista.some((h) => h !== mejor)) void this.completar();
    } else {
      const lista = this.aves.filter((a) => a.surco === g.surco && a.estado !== "vuela");
      let mejor: Ave | null = null;
      let d0 = radio * 1.2;
      for (const a of lista) {
        const d = enPantalla(a.g);
        if (d < d0) {
          d0 = d;
          mejor = a;
        }
      }
      if (!mejor) return;
      this.espantarAve(mejor);
      this.player.rig.pose = "wave";
      this.player.rig.x = Math.max(-LARGO / 2, Math.min(LARGO / 2, mejor.x));
      if (!lista.some((a) => a !== mejor)) void this.completar();
    }
    this.pushHud();
  }

  /** El gesto llegó al final: se le pide la tarea al servidor. */
  private async completar() {
    const g = this.gesto;
    if (!g || g.terminado) return;
    g.terminado = true;
    this.esperando = true;
    this.pushHud();
    const accion: AccionHuerto = g.accion;
    const body: Record<string, unknown> = g.tipo === "deslizar" ? { surco: g.surco, ...g.extra } : g.tipo === "tocar" ? { surco: g.surco } : g.surco !== null ? { surco: g.surco } : {};
    const antes = this._estado;
    const d = await this.opts.pedir(accion, body);
    if (!this.running) return;
    this.esperando = false;
    this.terminarGesto();
    this.player.rig.pose = "idle";
    if (!d) {
      // no se pudo: se vuelve a dibujar como estaba
      this.ponerEstado(antes, true);
      this.pushHud();
      return;
    }
    if (accion === "granero") {
      this.llevando = false;
      this.player.fig.aLaEspalda(null);
      if (this.carga) disposeGroup(this.carga);
      this.carga = null;
    }
    this.ponerEstado(d, true);
    this.alTerminar(accion, d);
    this.pushHud();
  }

  /** Lo que se dice y se ve al terminar cada tarea. */
  private alTerminar(accion: AccionHuerto, d: RespuestaHuerto) {
    const r = this.player.rig;
    const lab = d.labranza;
    const p = new THREE.Vector3(r.x, 1.9, r.z);
    switch (accion) {
      case "arar":
        gameStore.toast("⛏️ Surco arado: ya puedes sembrarlo.", "info");
        break;
      case "sembrar":
        gameStore.toast("🌱 Sembrado. Cuídalo: riégalo, arráncale las hierbas y espanta las aves que vienen por la semilla.", "gold");
        this.audio.sack();
        break;
      case "regar":
        gameStore.toast(`💧 Regado: crece más rápido y da una gavilla más. Te ${lab?.agua === 1 ? "queda 1 riego" : `quedan ${lab?.agua ?? 0} riegos`}.`, "info");
        break;
      case "llenar":
        gameStore.toast(`🏺 Cántaro lleno: ${lab?.agua ?? 0} riegos.`, "info");
        this.audio.water();
        break;
      case "hierbas":
        gameStore.toast(`🌿 Arrancaste ${d.quitadas ?? 1} ${(d.quitadas ?? 1) === 1 ? "mala hierba" : "malas hierbas"}: el surco quedó limpio.`, "info");
        break;
      case "aves":
        gameStore.toast("🐦 ¡Espantaste las aves!", "info");
        break;
      case "abonar":
        gameStore.toast("🐑 Abonado con lo de tu redil: una estrella más (Lucas 13:8).", "info");
        break;
      case "cosechar": {
        const c = d.cosecha;
        if (c) {
          const cosa = c.bien === "aceite" ? (c.cuanto === 1 ? "cesta de olivas" : "cestas de olivas") : c.cuanto === 1 ? "gavilla" : "gavillas";
          gameStore.toast(
            `🌾 ${NOMBRE_CALIDAD[c.estrellas] ?? "Cosecha"} ${"⭐".repeat(c.estrellas)}: ${c.cuanto} ${cosa}${c.comidas ? ` (las aves se comieron ${c.comidas})` : ""}${c.hoz ? " · +1 por la hoz de hierro" : ""}. Llévalas al granero.`,
            "gold",
          );
          if (c.rincon) gameStore.toast(`🤲 Dejaste el rincón para el pobre y el extranjero: +${c.rincon} de gozo (Levítico 23:22).`, "gold");
          // la cosecha se carga a cuestas enseguida
          this.llevando = true;
          this.dibujarGavillas();
          this.carga = cargaDeGavillas(c.bien === "aceite");
          this.player.fig.aLaEspalda(this.carga);
          this.audio.coin(2);
        }
        break;
      }
      case "granero": {
        const gu = d.guardado ?? { harina: 0, aceite: 0 };
        const q = d.quedan ?? { harina: 0, aceite: 0 };
        gameStore.toast(`🌾 Guardaste en el alfolí ${gu.harina ? `${gu.harina} de flor de harina` : ""}${gu.harina && gu.aceite ? " y " : ""}${gu.aceite ? `${gu.aceite} de aceite` : ""}${q.harina + q.aceite ? `. No cupo todo: quedan ${q.harina + q.aceite} junto al camino.` : "."}`, "gold");
        this.audio.offering();
        break;
      }
    }
    for (const t of d.tareasCumplidas ?? []) gameStore.toast(`✅ ${t.icono} ${t.titulo}: +${t.gozo} de gozo`, "gold");
    if (d.tareasTodas) gameStore.toast(`🎉 Las tres tareas del huerto de hoy: +${d.tareasTodas} de gozo de más`, "gold");
    if (d.gozoHuerto) {
      this.overlay.float(`+${d.gozoHuerto} de gozo`, p);
      this.audio.correct();
    }
    vibrar(20);
  }

  /** Lo que dijo el servidor: se dibuja de nuevo lo que cambió. */
  ponerEstado(m: MercadoEstado, forzar = false) {
    const cambiaN = m.huerto.length !== this._estado.huerto.length;
    const fuente = m.labranza?.fuente !== this._estado.labranza?.fuente || m.labranza?.granero !== this._estado.labranza?.granero;
    this._estado = m;
    this.recibido = performance.now();
    if (cambiaN || fuente) {
      this.zSur = zSurco(Math.max(1, m.huerto.length) - 1) + 1.6;
      this.construirEscenario();
      this.reconstruirChoques();
    }
    for (let i = 0; i < m.huerto.length; i++) this.dibujarSurco(i, forzar);
    while (this.surcos.length > m.huerto.length) {
      const sv = this.surcos.pop()!;
      this.scene.remove(sv.g);
      disposeGroup(sv.g);
    }
    this.dibujarGavillas();
    this.actualizarAves();
    this.pushHud();
  }

  /** Pedir otra vez el estado al servidor un momento después (las aves llegaron, salió una hierba...). */
  private pedirRefresco() {
    if (!this.refrescoEn) this.refrescoEn = performance.now() + 1800;
  }

  private async refrescar() {
    this.refrescoEn = 0;
    if (performance.now() - this.ultimoRefresco < 9000 || this.gesto || this.esperando) return;
    this.ultimoRefresco = performance.now();
    try {
      const r = await fetch("/api/jerusalen/mercado", { credentials: "include", cache: "no-store" });
      if (!r.ok || !this.running) return;
      const d = (await r.json()) as MercadoEstado;
      if (!this.gesto && !this.esperando) this.ponerEstado(d);
    } catch {
      /* sin conexión: se sigue con lo que hay */
    }
  }

  // ---------------------------------------------------------------- partículas
  private particula(o: THREE.Object3D, x: number, y: number, z: number, vx: number, vy: number, vz: number, max: number, gira = 0) {
    o.position.set(x, y, z);
    this.scene.add(o);
    this.particulas.push({ o, v: new THREE.Vector3(vx, vy, vz), vida: 0, max, gira, cae: true });
  }

  private polvo(x: number, z: number, color: string, n: number) {
    for (let i = 0; i < n; i++) {
      const b = new GeoBuilder();
      b.sphere(0.03 + Math.random() * 0.03, color, {}, 4, 3);
      const o = malla(b, false);
      this.particula(o, x + (Math.random() - 0.5) * 0.3, 0.1, z + (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.6, 0.6 + Math.random() * 0.5, (Math.random() - 0.5) * 0.6, 0.6);
    }
  }

  private semillasAlAire(x: number, z: number, color: string) {
    const r = this.player.rig;
    for (let i = 0; i < 5; i++) {
      const b = new GeoBuilder();
      b.sphere(0.014, color, {}, 4, 3);
      this.particula(malla(b, false), r.x + 0.15, 0.9, r.z - 0.2, (x - r.x) * 0.9 + (Math.random() - 0.5) * 0.4, 1.2 + Math.random() * 0.6, (z - r.z) * 1.4 + (Math.random() - 0.5) * 0.3, 0.75);
    }
  }

  private gotas(x: number, z: number) {
    const r = this.player.rig;
    for (let i = 0; i < 2; i++) {
      const o = new THREE.Mesh(gotaGeo(), gotaMat());
      this.particula(o, r.x + 0.12, 0.85, r.z - 0.35, (x - r.x) * 0.6 + (Math.random() - 0.5) * 0.4, 0.2, (z - r.z) * 1.1 + (Math.random() - 0.5) * 0.2, 0.55);
      this.particulas[this.particulas.length - 1].compartida = true;
    }
  }

  private updateParticulas(dt: number) {
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const pa = this.particulas[i];
      pa.vida += dt;
      if (pa.cae) pa.v.y -= 6.5 * dt;
      pa.o.position.addScaledVector(pa.v, dt);
      if (pa.gira) pa.o.rotation.z += pa.gira * dt;
      if (pa.encoge) pa.o.scale.setScalar(Math.max(0.05, 1 - pa.vida / pa.max));
      if (pa.o.position.y < 0.03 && pa.cae) {
        pa.o.position.y = 0.03;
        pa.v.set(0, 0, 0);
      }
      if (pa.vida >= pa.max) {
        this.scene.remove(pa.o);
        if (!pa.compartida) disposeGroup(pa.o);
        this.particulas.splice(i, 1);
      }
    }
  }

  // ================================================================ caminar
  private reconstruirChoques() {
    const n = this._estado.huerto.length;
    const rects = this.rects.slice();
    // los surcos no se pisan: se camina por los pasillos de en medio
    for (let i = 0; i < n; i++) rects.push([-LARGO / 2, zSurco(i) - ANCHO / 2 + 0.02, LARGO / 2, zSurco(i) + ANCHO / 2 - 0.02]);
    this.rectsTodos = rects;
    this.nav = new NavGrid(rects, this.circles, PLAYER_R + 0.03, {
      minX: -6.2,
      maxX: 6.2,
      minZ: ZCASA + 0.1,
      maxZ: this.zSur + 0.3,
      cell: 0.15,
      walkable: (x, z) => x > -6.2 && x < 6.2 && z > ZCASA + 0.1 && z < this.zSur + 0.3,
    });
  }
  private rectsTodos: Rect[] = [];

  /** Caminar solo hasta el pozo, el granero, las gavillas, la puerta o un surco. */
  irA(lugar: "pozo" | "granero" | "gavillas" | "puerta" | number) {
    if (this.gesto) return;
    const r = this.player.rig;
    const destino: V2 =
      lugar === "pozo"
        ? [POZO[0] + 0.95, POZO[1] + 0.5]
        : lugar === "granero"
          ? [GRANERO[0] - 1.45, GRANERO[1] + 0.1]
          : lugar === "gavillas"
            ? [GAVILLAS[0] - 0.6, GAVILLAS[1] + 0.2]
            : lugar === "puerta"
              ? [PUERTA[0], PUERTA[1]]
              : [Math.max(-LARGO / 2 + 0.3, Math.min(LARGO / 2 - 0.3, r.x)), zSurco(lugar) - PASILLO];
    this.ruta = this.nav?.path(r.x, r.z, destino[0], destino[1]) ?? [destino];
    this.marca.set(destino[0], 0.03, destino[1]);
    this.marca.mesh.visible = true;
    this.marcaT = 1.4;
  }

  private irAlToque() {
    const t = this.entrada.tomarToque();
    if (!t) return;
    const p = haciaElPiso(this.camera, t.x / this.w, t.y / this.h, 0);
    if (!p) return;
    let [x, z] = p;
    // tocar un surco lleva a su pasillo de atrás
    for (let i = 0; i < this._estado.huerto.length; i++) {
      if (Math.abs(z - zSurco(i)) < ANCHO / 2 + 0.05 && Math.abs(x) < LARGO / 2 + 0.05) {
        z = zSurco(i) - PASILLO;
        break;
      }
    }
    x = Math.max(-6.1, Math.min(6.1, x));
    z = Math.max(ZCASA + 0.2, Math.min(this.zSur + 0.2, z));
    [x, z] = collide(x, z, PLAYER_R, this.rectsTodos, this.circles);
    const r = this.player.rig;
    this.ruta = this.nav?.path(r.x, r.z, x, z) ?? [[x, z]];
    this.marca.set(x, 0.03, z);
    this.marca.mesh.visible = true;
    this.marcaT = 0.9;
  }

  private movePlayer(dt: number) {
    const p = this.player;
    const r = p.rig;
    this.irAlToque();
    const [ix, iy] = this.entrada.vector();
    let dx = 0, dz = 0;
    if (Math.hypot(ix, iy) > 0.01) {
      this.ruta = [];
      dx = ix;
      dz = -iy;
    } else if (this.ruta.length) {
      const [tx, tz] = this.ruta[0];
      const ex = tx - r.x, ez = tz - r.z;
      const d = Math.hypot(ex, ez);
      if (d < 0.18) this.ruta.shift();
      else {
        dx = ex / d;
        dz = ez / d;
      }
    }
    if (this.marcaT > 0) {
      this.marcaT -= dt;
      if (this.marcaT <= 0 || !this.ruta.length) this.marca.mesh.visible = false;
    }
    const sp = 2.5 * (this.entrada.corre ? 1.35 : 1) * (this.llevando ? 0.85 : 1);
    const k = Math.min(1, dt * 14);
    p.vx += (dx * sp - p.vx) * k;
    p.vz += (dz * sp - p.vz) * k;
    const ox = r.x, oz = r.z;
    let nx = r.x + p.vx * dt, nz = r.z + p.vz * dt;
    nx = Math.max(-6.15, Math.min(6.15, nx));
    nz = Math.max(ZCASA + 0.15, Math.min(this.zSur + 0.25, nz));
    [nx, nz] = collide(nx, nz, PLAYER_R, this.rectsTodos, this.circles);
    const moved = Math.hypot(nx - ox, nz - oz);
    r.x = nx;
    r.z = nz;
    r.moving += (Math.min(1, moved / Math.max(dt, 1e-4) / 2) - r.moving) * Math.min(1, dt * 10);
    r.phase += moved * 7.6;
    r.carrying = false;
    if (Math.hypot(p.vx, p.vz) > 0.25) r.yaw = turn(r.yaw, Math.atan2(p.vx, p.vz), dt * 12);
    p.step += moved;
    if (p.step > 0.5) {
      p.step = 0;
      this.stepAlt = !this.stepAlt;
      this.audio.footstep(this.stepAlt);
    }
    // la puerta de la casa: se vuelve al pisar su círculo
    const dentro = Math.hypot(r.x - PUERTA[0], r.z - PUERTA[1]) < 0.45;
    if (dentro && !this.puerta.inside) {
      this.puerta.inside = true;
      if (this.llevando) {
        this.aviso("Primero guarda las gavillas en el granero: si no, se quedan junto al camino.", 3500);
        this.llevando = false;
        this.player.fig.aLaEspalda(null);
        if (this.carga) disposeGroup(this.carga);
        this.carga = null;
        this.dibujarGavillas();
      }
      this.audio.page();
      this.opts.alSalir();
      return;
    }
    if (!dentro) this.puerta.inside = false;
  }

  /** Mientras se hace el gesto: el personaje trabaja (y sigue al dedo a lo largo del surco). */
  private animarGesto(dt: number) {
    const g = this.gesto;
    const r = this.player.rig;
    r.moving += (0 - r.moving) * Math.min(1, dt * 8);
    if (!g) return;
    if (g.tipo === "deslizar") {
      if (g.dedoX !== null) {
        const nx = r.x + (g.dedoX - r.x) * Math.min(1, dt * 6);
        r.phase += Math.abs(nx - r.x) * 7.6;
        r.moving = Math.min(1, Math.abs(nx - r.x) / Math.max(dt, 1e-4) / 2);
        r.x = nx;
      }
      r.pose = g.accion === "arar" || g.accion === "cosechar" ? "play" : Math.sin(this.time * 7) > 0 ? "bow" : "offer";
      r.yaw = 0;
    } else if (g.tipo === "mantener") {
      if (g.apretado && !g.terminado) {
        const dur = g.accion === "regar" ? 1.6 : g.accion === "llenar" ? 2.0 : 1.4;
        g.progreso = Math.min(1, g.progreso + dt / dur);
        if (g.accion === "regar" && g.surco !== null) {
          if (Math.random() < dt * 30) this.gotas(r.x + (Math.random() - 0.5) * 0.6, zSurco(g.surco));
        } else if (g.accion === "llenar" && this.cubo) {
          this.cubo.position.y = 0.85 - Math.sin(g.progreso * Math.PI) * 0.55;
          if (Math.random() < dt * 4) this.audio.water();
        } else if (g.accion === "granero" && Math.random() < dt * 5) {
          const b = new GeoBuilder();
          b.cyl(0.05, 0.045, 0.3, "#d8b54a", { rx: Math.PI / 2 }, 6);
          this.particula(malla(b, false), r.x, 1.0, r.z, (GRANERO[0] - 1.0 - r.x) * 1.3, 1.4, (GRANERO[1] - r.z) * 1.3, 0.8, 4);
        }
        if (g.progreso >= 1) void this.completar();
        this.pushHud();
      }
      r.pose = g.accion === "llenar" ? (g.apretado ? "kneel" : "idle") : "offer";
    } else {
      r.pose = g.accion === "hierbas" ? "kneel" : r.pose === "wave" ? "wave" : "point";
    }
  }

  // ================================================================ ciclo
  private frame = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.time += dt;
    avanzarMateriales(dt);
    const live = !this.paused && !gameStore.busy;
    if (live && !this.gesto && !this.esperando) this.movePlayer(dt);
    else {
      this.entrada.tomarToque();
      this.animarGesto(dt);
    }
    if (!this.gesto && !this.esperando && this.player.rig.pose !== "idle" && this.player.rig.moving > 0.1) this.player.rig.pose = "idle";
    // cada segundo: crecen las plantas, salen las hierbas y llegan las aves (con los tiempos del servidor)
    this.relojT += dt;
    if (this.relojT > 1) {
      this.relojT = 0;
      for (let i = 0; i < this.surcos.length; i++) {
        const antes = this.surcos[i]?.firma;
        if (this.gesto && "surco" in this.gesto && this.gesto.surco === i) continue;
        this.dibujarSurco(i);
        if (antes !== this.surcos[i]?.firma && this.ahoraDe(i).faltan <= 0 && this._estado.huerto[i].semilla) this.pedirRefresco();
      }
      this.actualizarAves();
    }
    if (this.refrescoEn && now > this.refrescoEn) void this.refrescar();
    this.animate(dt, now);
    this.renderer.render(this.scene, this.camera);
    this.hudT += dt;
    if (this.hudT > 0.15) {
      this.hudT = 0;
      this.pushHud();
    }
  };

  private animate(dt: number, now: number) {
    const r = this.player.rig;
    r.t += dt;
    if (this.llevando && !this.gesto) r.hunch = 0.1;
    else r.hunch = 0;
    this.player.fig.update(r);
    this.updateAves(dt);
    this.updateParticulas(dt);
    this.sombras.begin();
    this.sombras.add(r.x, 0, r.z, 0.85);
    this.sombras.end();
    this.updateLuz();
    this.lluvia.setLluvia(!!this._estado.labranza?.llueve);
    this.lluvia.update(dt, this.camTarget.x, this.camTarget.z);
    this.updateCamera(dt);
    this.updateEtiquetas(dt);
    this.overlay.update(now);
  }

  private tmpColor = new THREE.Color();
  private fondo = new THREE.Color();

  private updateLuz() {
    const t = relojEnLinea().hora;
    const e = t >= 0.22 && t <= 0.78 ? Math.sin((Math.PI * (t - 0.22)) / 0.56) : -0.4;
    const dia = THREE.MathUtils.smoothstep(e, -0.08, 0.3);
    const lluvia = this.lluvia.intensidad;
    const c = this.tmpColor;
    this.hemi.intensity = (1.0 + 0.35 * dia) * (1 - lluvia * 0.2);
    this.hemi.color.set("#8a86b0").lerp(c.set("#fff1d8"), dia);
    this.hemi.groundColor.set("#4a4030").lerp(c.set("#6a5a3a"), dia);
    this.sol.intensity = (0.15 + 1.45 * dia) * (1 - lluvia * 0.55);
    this.sol.color.set("#9db4ff").lerp(c.set("#fff0d0"), dia);
    // el cielo: de día, celeste; al amanecer y al atardecer, dorado; de noche, azul oscuro; con lluvia, gris
    this.fondo.set("#141a30").lerp(c.set(t < 0.3 || t > 0.7 ? "#e8b98a" : "#a9cbe8"), dia).lerp(c.set("#8d96a0"), lluvia * 0.7 * dia);
    this.scene.background = this.fondo;
    this.renderer.toneMappingExposure = 0.95 + 0.12 * dia;
  }

  private updateCamera(dt: number) {
    const portrait = this.camera.aspect < 0.85;
    const r = this.player.rig;
    const g = this.gesto;
    let focus: THREE.Vector3;
    let d0: number;
    let ph: number;
    if (g && (g.tipo !== "mantener" || g.accion === "regar") && "surco" in g && g.surco !== null) {
      // de cerca y desde arriba: el surco entero a lo ancho de la pantalla
      focus = new THREE.Vector3(0, 0, zSurco(g.surco) + (portrait ? 0.7 : 0.25));
      d0 = portrait ? 7.4 : 5.2;
      ph = 1.12;
    } else if (g && g.tipo === "mantener" && g.accion === "llenar") {
      focus = new THREE.Vector3(POZO[0] + 0.4, 0.4, POZO[1] + 0.3);
      d0 = portrait ? 5.2 : 4.2;
      ph = 0.85;
    } else if (g && g.tipo === "mantener" && g.accion === "granero") {
      focus = new THREE.Vector3(GRANERO[0] - 0.9, 0.5, GRANERO[1] + 0.2);
      d0 = portrait ? 6 : 4.8;
      ph = 0.8;
    } else {
      focus = new THREE.Vector3(Math.max(-3.6, Math.min(3.6, r.x)), 0, Math.max(ZCASA + 1.3, Math.min(this.zSur - 0.6, r.z)) + (portrait ? 0.8 : 0.3));
      d0 = (portrait ? 9.6 : 8.0) * this.entrada.zoom;
      ph = 0.92;
    }
    const k = 1 - Math.exp(-dt * 4.5);
    this.camTarget.lerp(focus, k);
    this.camDist += (d0 - this.camDist) * (1 - Math.exp(-dt * 4));
    this.camPh += (ph - this.camPh) * (1 - Math.exp(-dt * 4));
    const d = this.camDist;
    this.camera.position.set(this.camTarget.x, this.camTarget.y + Math.sin(this.camPh) * d, this.camTarget.z + Math.cos(this.camPh) * d);
    this.camera.lookAt(this.camTarget.x, this.camTarget.y + 0.3, this.camTarget.z);
    this.sol.position.set(this.camTarget.x + 7, 15, this.camTarget.z + 9);
    this.sol.target.position.set(this.camTarget.x, 0, this.camTarget.z);
  }

  private updateEtiquetas(dt: number) {
    const r = this.player.rig;
    const u = this.puerta.ring.mat.uniforms;
    const cerca = Math.max(0, 1 - Math.hypot(r.x - PUERTA[0], r.z - PUERTA[1]) / 4);
    u.uTime.value = this.time;
    u.uPulse.value += (Math.max(cerca, 0.35) - u.uPulse.value) * Math.min(1, dt * 4);
    u.uOpacity.value = 0.5 + 0.45 * u.uPulse.value;
    if (!this.gesto && Math.hypot(r.x - PUERTA[0], r.z - PUERTA[1]) < 3.2) this.overlay.place(this.puerta.etiqueta, new THREE.Vector3(PUERTA[0], 0.9, PUERTA[1]));
    else this.puerta.etiqueta.style.display = "none";
    for (const e of this.etiquetas) {
      if (!this.gesto && Math.hypot(r.x - e.p.x, r.z - e.p.z) < 5) this.overlay.place(e.el, e.p);
      else e.el.style.display = "none";
    }
  }

  // ================================================================ pantalla
  private aviso(texto: string, ms = 4200) {
    this.avisoTemporal = { texto, hasta: performance.now() + ms };
    this.pushHud();
  }

  private textoGesto(g: Gesto): string {
    if (g.tipo === "deslizar") {
      const que = g.accion === "arar" ? "arar con la azada" : g.accion === "sembrar" ? "esparcir la semilla" : g.accion === "abonar" ? "echar el abono" : "segar con la hoz";
      return `Desliza el dedo a lo largo del surco, de punta a punta, para ${que}.`;
    }
    if (g.tipo === "mantener")
      return g.accion === "regar"
        ? "Mantén apretado sobre el surco para regarlo con tu cántaro."
        : g.accion === "llenar"
          ? "Mantén apretado: baja el cubo, sácalo y llena tu cántaro."
          : "Mantén apretado para guardar las gavillas en el granero.";
    return g.accion === "hierbas" ? "Toca cada mala hierba para arrancarla de raíz." : "Toca las aves para espantarlas.";
  }

  private progresoGesto(g: Gesto): number {
    if (g.tipo === "deslizar") return g.tramos.filter(Boolean).length / (TRAMOS - 2);
    if (g.tipo === "mantener") return g.progreso;
    if (g.accion === "hierbas") {
      const sv = this.surcos[g.surco];
      const total = sv?.hierbas.length || 1;
      return 1 - (sv?.hierbas.filter((h) => h.visible).length ?? 0) / total;
    }
    const total = Math.max(1, this.aves.filter((a) => a.surco === g.surco).length);
    return 1 - this.aves.filter((a) => a.surco === g.surco && a.estado !== "vuela").length / total;
  }

  private textoAviso(cerca: HuertoHud["cerca"]): string {
    if (this.esperando) return "Guardando lo que hiciste…";
    // mientras se hace un gesto, lo dice su panel
    if (this.gesto) return "";
    if (this.avisoTemporal && performance.now() < this.avisoTemporal.hasta) return this.avisoTemporal.texto;
    if (this.llevando) return "Llevas las gavillas: ve al granero (a la derecha) y guárdalas.";
    if (cerca) return cerca.acciones.length ? "Elige qué hacer abajo: cada tarea se hace con tu dedo." : cerca.estado;
    const est = this._estado;
    const lab = est.labranza;
    if (lab && lab.gavillas.harina + lab.gavillas.aceite > 0) return "Hay gavillas junto al camino: cárgalas y llévalas al granero.";
    const listos = est.huerto.filter((_, i) => this.ahoraDe(i).faltan <= 0 && est.huerto[i].semilla).length;
    if (listos) return `${listos === 1 ? "Un surco está listo" : `${listos} surcos están listos`} para segar: camina hasta él.`;
    if (est.huerto.some((_, i) => this.ahoraDe(i).aves)) return "🐦 ¡Llegaron aves a tu huerto! Ve a espantarlas.";
    if (est.huerto.some((p) => !p.semilla && !p.arado)) return "Camina hasta un surco: primero se ara con la azada.";
    return "Camina por los pasillos entre los surcos y elige qué hacer en cada uno.";
  }

  private pushHud() {
    const g = this.gesto;
    const cerca = g || this.esperando ? null : this.cercaDe();
    const hud: HuertoHud = {
      cerca,
      gesto: g ? { accion: g.accion, texto: this.textoGesto(g), progreso: Math.min(1, this.progresoGesto(g)) } : null,
      aviso: this.textoAviso(cerca),
      esperando: this.esperando,
      llevando: this.llevando,
    };
    gameStore.setHuerto(hud);
  }

  /** Las herramientas (para la pantalla de mejorarlas). */
  get herramientas() {
    return HERRAMIENTAS;
  }

  // ================================================================ tamaño, pausa y cierre
  private resize() {
    const r = this.container.getBoundingClientRect();
    this.w = Math.max(1, Math.round(r.width));
    this.h = Math.max(1, Math.round(r.height));
    this.renderer.setSize(this.w, this.h, false);
    this.camera.aspect = this.w / this.h;
    this.camera.fov = this.camera.aspect < 0.85 ? 52 : this.camera.aspect < 1.2 ? 46 : 42;
    this.camera.updateProjectionMatrix();
    this.overlay.resize(this.w, this.h);
  }

  setPaused(p: boolean) {
    this.paused = p;
  }

  private onVisibility = () => {
    if (!document.hidden) this.last = performance.now();
  };

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    const canvas = this.renderer.domElement;
    this.entrada.destruir();
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.resizeObs.disconnect();
    this.capa.remove();
    this.puerta.ring.dispose();
    this.overlay.remove(this.puerta.etiqueta);
    for (const e of this.etiquetas) this.overlay.remove(e.el);
    this.marca.dispose();
    this.player.fig.dispose();
    this.sombras.dispose();
    this.lluvia.dispose();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry && m.geometry !== _gotaGeo) m.geometry.dispose();
    });
    (this.suelo.material as THREE.Material).dispose();
    this.overlay.dispose();
    gameStore.setHuerto(null);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }
}

// ---------------------------------------------------------------- piezas sueltas (las que vuelan)
let _gotaGeo: THREE.SphereGeometry | null = null;
let _gotaMat: THREE.MeshBasicMaterial | null = null;
function gotaGeo() {
  return (_gotaGeo ??= new THREE.SphereGeometry(0.025, 5, 4));
}
function gotaMat() {
  return (_gotaMat ??= new THREE.MeshBasicMaterial({ color: "#8fc8ea", transparent: true, opacity: 0.85 }));
}
function b2Oliva(): THREE.Object3D {
  const b = new GeoBuilder();
  b.sphere(0.03, Math.random() < 0.6 ? "#3b2a3f" : "#556b2f", { sy: 1.25 }, 5, 4);
  return malla(b, false);
}
function b2Espiga(): THREE.Object3D {
  const b = new GeoBuilder();
  b.cyl(0.006, 0.006, 0.3, "#d8b54a", {}, 3);
  b.sphere(0.02, "#e6c35a", { y: 0.17, sy: 2 }, 4, 3);
  return malla(b, false);
}
