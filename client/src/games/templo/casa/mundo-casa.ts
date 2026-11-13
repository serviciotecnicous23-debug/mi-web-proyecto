/**
 * La casa por dentro (Jerusalén en línea): se entra por la puerta de la casa en la ciudad, se camina
 * por sus cuartos como en el templo y se remodela (poner, mover, girar y guardar los muebles). Los
 * vecinos pueden entrar a verla. El plano y las reglas están en shared/casa-interior.ts; el servidor
 * solo guarda dónde quedó cada mueble.
 *
 * Se ve como una casa de muñecas: los muros del lado de la cámara son bajos para ver adentro, y el
 * piso de arriba (terrado y aposento alto) se muestra cuando se sube por la escalera del patio.
 *
 * El mismo motor dibuja la escuela de los profetas y el palacio del rey por dentro (opts.edificio,
 * casa/edificios.ts): su plano, sus piezas fijas, sus personas y sus estaciones de servicio.
 */
import * as THREE from "three";
import { BlobShadows, Crowd, Figure, newRig, randomVisitor, type CrowdHandle, type FigureLook, type Rig } from "../three/characters";
import { NavGrid, collide } from "../three/nav";
import { Overlay, Ring } from "../three/overlay";
import { C, GeoBuilder, disposeGroup, meshPair, avanzarMateriales } from "../three/builder";
import type { TempleAudio } from "../audio";
import { gameStore, type CasaHud } from "../store";
import type { Circle, Rect, V2 } from "../layout";
import { relojEnLinea } from "@shared/calendario";
import {
  ALTURA_PISO, CELDA, abierto, celdasDe, celdasFijas, cuartoEn, lugarLibre, medidas, mueble, pieza, planoDe, porQueNoCabe, type Colocado, type Cuarto, type InteriorEstado, type Plano,
} from "@shared/casa-interior";
import type { Camino } from "@shared/caminos";
import { estacionesPara, type EdificioDef, type EstacionDef } from "./edificios";
import type { SalaDef, SalaEstado } from "@shared/restauracion";
import { Entrada, vibrar } from "../motor/entrada";
import { haciaElPiso } from "../motor/camara";
import { LLAMA, construirMueble } from "./muebles3d";

const PLAYER_R = 0.22;
/** Muros que no tapan la vista (los del fondo y los costados) y los del lado de la cámara (bajos). */
const MURO = 2.3;
/** Los muros de los costados (norte-sur): a media altura, para ver los cuartos sin perder la forma. */
const COSTADO = 1.45;
const BAJO = 0.34;
const GROSOR = 0.12;
const PRETIL = 0.55;

type Lado = "N" | "S" | "E" | "O";
const LADOS: [Lado, number, number][] = [
  ["N", 0, -1],
  ["S", 0, 1],
  ["O", -1, 0],
  ["E", 1, 0],
];
const OPUESTO: Record<Lado, Lado> = { N: "S", S: "N", E: "O", O: "E" };

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}

export type CasaOpts = {
  audio: TempleAudio;
  /** La figura y la ropa de quien entra (el dueño o el vecino que visita). */
  look: FigureLook;
  ropa?: { manto?: string; faja?: string };
  /** Los siervos de la casa (solo en la propia): qué prepara cada uno. */
  siervos?: string[];
  alSalir: () => void;
  /** El horno de la casa (solo el dueño): abre «Tu casa» en el huerto y el horno. */
  alHorno?: () => void;
  /** Entrar ya en el modo remodelar (después de comprar un mueble). */
  remodelar?: boolean;
  /** Un edificio de la ciudad (la escuela o el palacio) en vez de una casa. */
  edificio?: EdificioDef;
  /** Quien entra al edificio: su nombre y su camino (para el saludo y las estaciones). */
  quien?: { nombre: string; camino: Camino };
  /** Se pisó una estación del edificio. */
  alEstacion?: (id: string) => void;
  /**
   * La gran restauración (shared/restauracion.ts): las salas nuevas del edificio, cómo va cada una para esta persona,
   * y qué hacer al terminar un trabajo (el servidor lo cuenta) o al pisar lo de cada día de una sala restaurada.
   * `guia`: la sala que toca en el tutorial del primer día (la primera del edificio de tu camino, si falta).
   */
  restauracion?: {
    salas: SalaDef[];
    estado: SalaEstado[];
    guia: string | null;
    trabajar: (sala: string, trabajo: string) => Promise<SalaEstado[] | null>;
    diario: (sala: string) => void;
  };
  /** La estación que toca ahora en los primeros pasos (para resaltarla), o «salir». */
  siguiente?: () => string | null;
};

type ZonaId = "salir" | "horno" | "subir" | "bajar" | `est:${string}` | `trab:${string}` | `diar:${string}`;
type Zona = { id: ZonaId; x: number; z: number; piso: 0 | 1; r: number; ring: Ring; inside: boolean; etiqueta: HTMLDivElement };
type Siervo = { handle: CrowdHandle; rig: Rig; base: V2; tarea: string };
type Llama = { x: number; y: number; z: number; piso: 0 | 1; glow: THREE.Sprite; fuerza: number };

let glowTex: THREE.Texture | null = null;
function texturaBrillo(): THREE.Texture {
  if (glowTex) return glowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,226,150,1)");
  grad.addColorStop(0.35, "rgba(255,170,70,0.55)");
  grad.addColorStop(1, "rgba(255,140,40,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

export class CasaWorld {
  estado: InteriorEstado;
  readonly audio: TempleAudio;
  private opts: CasaOpts;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  private hemi = new THREE.HemisphereLight("#fff1d8", "#7a5a3a", 1.1);
  private sol = new THREE.DirectionalLight("#fff0d0", 1.4);
  private luces: THREE.PointLight[] = [];
  private plano: Plano;
  private fijas: Set<string>;
  private pisos: [THREE.Group, THREE.Group] = [new THREE.Group(), new THREE.Group()];
  private suelo: THREE.Mesh;
  private mueblesGrupo = new THREE.Group();
  private mallas: THREE.Group[] = [];
  private items: Colocado[];
  private guardado: Colocado[];
  private crowd = new Crowd(16);
  private sombras = new BlobShadows(12);
  private overlay: Overlay;
  private entrada: Entrada;
  private player: { fig: Figure; rig: Rig; vx: number; vz: number; step: number };
  private piso: 0 | 1 = 0;
  private vistaPiso: 0 | 1 = 0;
  private rects: [Rect[], Rect[]] = [[], []];
  private circles: [Circle[], Circle[]] = [[], []];
  private nav: [NavGrid | null, NavGrid | null] = [null, null];
  private zonas: Zona[] = [];
  private siervos: Siervo[] = [];
  private llamas: Llama[] = [];
  private remodelando = false;
  private sel = -1;
  private marcaSel: THREE.Group;
  private rejillas: [THREE.Group | null, THREE.Group | null] = [null, null];
  private ruta: V2[] = [];
  private marca: Ring;
  private marcaT = 0;
  private stepAlt = false;
  private camTarget = new THREE.Vector3();
  private camDist = 9;
  private camPh = 0.95;
  private cuartoActual = "";
  private avisoTemporal: { texto: string; hasta: number } | null = null;
  /** Edificio: sus estaciones para quien entra, la que toca ahora y los nombres de sus personas. */
  private estaciones: EstacionDef[] = [];
  private siguienteId: string | null = null;
  private etiquetasPersonas: { el: HTMLDivElement; rig: Rig }[] = [];
  /** La restauración: las salas del edificio y cómo van, lo fijo del edificio y el trabajo que se está haciendo. */
  private resto: { salas: SalaDef[]; estado: Map<string, SalaEstado> } | null = null;
  private base: Colocado[] = [];
  private trabajando: { zona: string; sala: string; trabajo: string; desde: number; segundos: number } | null = null;
  private esperandoTrabajo = false;
  /** Al caminar solo hasta un círculo (con su botón), los otros círculos del camino no se disparan. */
  private destinoZona: string | null = null;
  private personasResto: { handle: import("../three/characters").CrowdHandle; rig: Rig }[] = [];

  private raf = 0;
  private last = 0;
  private running = true;
  private paused = false;
  private time = 0;
  private hudT = 0;
  private w = 1;
  private h = 1;
  private ratio = 1;
  private resizeObs: ResizeObserver;

  constructor(container: HTMLElement, estado: InteriorEstado, opts: CasaOpts) {
    this.container = container;
    this.estado = estado;
    this.opts = opts;
    this.audio = opts.audio;
    this.plano = opts.edificio?.plano ?? planoDe(estado.nivel);
    if (opts.edificio && opts.quien) this.estaciones = estacionesPara(opts.edificio, opts.quien.camino);
    this.fijas = celdasFijas(this.plano);
    this.items = estado.interior.map((c) => ({ ...c }));
    this.guardado = estado.interior.map((c) => ({ ...c }));
    // la restauración: lo fijo del edificio más lo que hay en cada sala nueva (ruinas o restaurado, según vaya)
    if (opts.edificio && opts.restauracion) {
      this.resto = { salas: opts.restauracion.salas, estado: new Map(opts.restauracion.estado.map((e) => [e.id, e])) };
      this.base = this.items.map((c) => ({ ...c }));
      this.items = [...this.base, ...this.piezasResto()];
    }

    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    this.renderer = new THREE.WebGLRenderer({ antialias: !coarse || (window.devicePixelRatio || 1) < 2, powerPreference: "high-performance" });
    this.ratio = Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2);
    this.renderer.setPixelRatio(this.ratio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    const canvas = this.renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none;outline:none;position:absolute;inset:0";
    canvas.setAttribute("aria-label", opts.edificio ? `${opts.edificio.nombre} por dentro` : estado.esMia ? "Tu casa por dentro" : `La casa de ${estado.dueno} por dentro`);
    container.appendChild(canvas);

    // luz: la del cielo que entra por el patio y las ventanas, y las lámparas de la casa
    this.sol.castShadow = true;
    this.sol.shadow.mapSize.set(coarse ? 1024 : 2048, coarse ? 1024 : 2048);
    const sc = this.sol.shadow.camera;
    sc.left = -9;
    sc.right = 9;
    sc.top = 9;
    sc.bottom = -9;
    sc.near = 1;
    sc.far = 40;
    this.sol.shadow.bias = -0.0006;
    this.sol.shadow.normalBias = 0.03;
    this.sol.position.set(6, 14, 8);
    this.scene.add(this.hemi, this.sol, this.sol.target);
    for (let i = 0; i < 4; i++) {
      const l = new THREE.PointLight("#ffb766", 0, 6, 1.6);
      this.luces.push(l);
      this.scene.add(l);
    }

    // el piso de afuera (la calle) para que no quede vacío alrededor
    this.suelo = new THREE.Mesh(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: "#b79a6a" }));
    this.suelo.position.y = -0.07;
    this.suelo.receiveShadow = true;
    this.scene.add(this.suelo);

    this.construirCasa();
    this.scene.add(this.pisos[0], this.pisos[1], this.mueblesGrupo, this.crowd.group, this.sombras.mesh);
    this.marcaSel = new THREE.Group();
    this.scene.add(this.marcaSel);
    this.overlay = new Overlay(container, this.camera);

    // quien entra: aparece en la puerta mirando hacia adentro
    const pf = new Figure(opts.look);
    pf.setRopa(opts.ropa);
    const [px, pz] = this.plano.puerta;
    const pr = newRig(this.wx(px + 1), this.wz(pz + 0.2));
    pr.yaw = Math.PI;
    this.player = { fig: pf, rig: pr, vx: 0, vz: 0, step: 0 };
    this.scene.add(pf.root);
    this.camTarget.set(pr.x, 0, pr.z - 1);

    this.marca = new Ring(0.4, "#ffffff", false);
    this.marca.mesh.visible = false;
    this.scene.add(this.marca.mesh);
    this.crearZonas();
    this.crearZonasResto();
    this.dibujarMuebles();
    this.crearSiervos();
    this.ponerPersonasResto();
    this.mostrarPiso(0);

    this.entrada = new Entrada(container, canvas, this.overlay, { ocupado: () => gameStore.busy, alPrimerToque: () => this.audio.ensure() });
    document.addEventListener("visibilitychange", this.onVisibility);
    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    if (opts.remodelar && estado.esMia) this.remodelar(true);
    // el maestro del edificio recibe a quien entra
    if (opts.edificio && opts.quien) this.aviso(opts.edificio.saludo(opts.quien.nombre, opts.quien.camino), 10000);
    this.pushHud();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  // ================================================================ el plano en el mundo
  private wx(x: number) {
    return (x - this.plano.W / 2) * CELDA;
  }
  private wz(z: number) {
    return (z - this.plano.D / 2) * CELDA;
  }
  private yPiso(p: 0 | 1) {
    return p === 1 ? ALTURA_PISO : 0;
  }
  /** La celda que queda bajo un punto del mundo. */
  private celda(x: number, z: number): [number, number] {
    return [Math.floor(x / CELDA + this.plano.W / 2), Math.floor(z / CELDA + this.plano.D / 2)];
  }

  private estilo(): "tienda" | "adobe" | "piedra" {
    if (this.opts.edificio) return this.opts.edificio.estilo;
    return this.estado.nivel === 0 ? "tienda" : this.estado.nivel === 1 ? "adobe" : "piedra";
  }

  /** Pisos, muros, pretil, horno, escalera e higuera (lo que no se mueve). */
  private construirCasa() {
    const pl = this.plano;
    const est = this.estilo();
    const colMuro = est === "tienda" ? "#4a3a2e" : est === "adobe" ? "#c9a77c" : "#d9ccb0";
    const colMuroBajo = est === "tienda" ? "#5a4636" : est === "adobe" ? "#b8946a" : "#cbbd9e";
    const alto = est === "tienda" ? 1.75 : MURO;
    for (const p of [0, 1] as const) {
      const g = new GeoBuilder();
      const cuartos = pl.cuartos.filter((c) => c.piso === p);
      if (!cuartos.length) continue;
      const y0 = this.yPiso(p);
      for (const cu of cuartos) {
        const colPiso = cu.cielo ? (p === 1 ? "#d8c7a4" : "#bfa274") : est === "tienda" ? "#a88a5a" : est === "adobe" ? "#b39466" : "#cdbf9f";
        const gr = p === 1 ? 0.18 : 0.07;
        g.box(cu.w * CELDA, gr, cu.d * CELDA, colPiso, { x: this.wx(cu.x + cu.w / 2), y: y0 - gr / 2, z: this.wz(cu.z + cu.d / 2) }, 0.05);
        // losas de piedra (casa de piedra, cuartos con techo)
        if (est === "piedra" && !cu.cielo)
          for (let i = 0; i < cu.w; i += 2) for (let j = 0; j < cu.d; j += 2) if ((i + j) % 4 === 0) g.box(CELDA * 1.9, 0.004, CELDA * 1.9, "#c2b392", { x: this.wx(cu.x + i + 1), y: y0 + 0.002, z: this.wz(cu.z + j + 1) });
      }
      // los muros: cada borde de un cuarto que no da al mismo cuarto ni es una puerta
      const vistos = new Set<string>();
      for (const cu of cuartos)
        for (let x = cu.x; x < cu.x + cu.w; x++)
          for (let z = cu.z; z < cu.z + cu.d; z++)
            for (const [lado, dx, dz] of LADOS) {
              const nx = x + dx, nz = z + dz;
              const otro = cuartoEn(pl, nx, nz, p);
              if (otro === cu) continue;
              const k = lado === "N" || lado === "S" ? `H${lado === "N" ? x : x},${lado === "N" ? z : z + 1}` : `V${lado === "O" ? x : x + 1},${z}`;
              if (vistos.has(k)) continue;
              vistos.add(k);
              if (abierto(pl, x, z, lado, p) || abierto(pl, nx, nz, OPUESTO[lado], p)) {
                // la puerta de la calle: dos postes y el umbral
                if (p === 0 && lado === "S" && !otro) g.box(CELDA, 0.04, GROSOR * 1.6, "#8f8a82", { x: this.wx(x + 0.5), y: 0.02, z: this.wz(z + 1) });
                continue;
              }
              let h: number;
              if (p === 1 && cu.cielo && (!otro || otro.cielo)) h = PRETIL;
              else if (lado === "N" || lado === "S") h = lado === "N" && !otro ? alto : BAJO;
              else h = cu.cielo && otro?.cielo ? PRETIL : est === "tienda" ? alto : COSTADO;
              const color = h >= COSTADO - 0.01 ? colMuro : colMuroBajo;
              if (lado === "N" || lado === "S") {
                const zz = this.wz(lado === "N" ? z : z + 1);
                g.box(CELDA + GROSOR, h, GROSOR, color, { x: this.wx(x + 0.5), y: y0 + h / 2, z: zz }, 0.04);
                this.rects[p].push([this.wx(x) - GROSOR / 2, zz - GROSOR / 2, this.wx(x + 1) + GROSOR / 2, zz + GROSOR / 2]);
              } else {
                const xx = this.wx(lado === "O" ? x : x + 1);
                g.box(GROSOR, h, CELDA + GROSOR, color, { x: xx, y: y0 + h / 2, z: this.wz(z + 0.5) }, 0.04);
                this.rects[p].push([xx - GROSOR / 2, this.wz(z) - GROSOR / 2, xx + GROSOR / 2, this.wz(z + 1) + GROSOR / 2]);
              }
              // una ventanita con su marco en el muro alto del fondo
              if (lado === "N" && h >= alto - 0.01 && !otro && est !== "tienda" && x % 4 === 2) {
                g.box(CELDA * 0.56, 0.42, 0.03, "#6b4a2e", { x: this.wx(x + 0.5), y: y0 + 1.5, z: this.wz(z) + GROSOR / 2 + 0.012 });
                g.box(CELDA * 0.4, 0.28, 0.035, "#3a2a1c", { x: this.wx(x + 0.5), y: y0 + 1.5, z: this.wz(z) + GROSOR / 2 + 0.02 });
              }
            }
      // la tienda: los postes de pelo de cabra
      if (est === "tienda" && p === 0) {
        for (const [x, z] of [[0, 0], [pl.W, 0], [0, pl.D], [pl.W, pl.D], [pl.W / 2, pl.D / 2]] as V2[])
          g.cyl(0.05, 0.06, x === pl.W / 2 ? 2.3 : 1.9, "#6a4a2a", { x: this.wx(x), y: (x === pl.W / 2 ? 2.3 : 1.9) / 2, z: this.wz(z) }, 8);
        for (let x = 0; x < pl.W; x += 2) g.box(CELDA * 2, 0.08, GROSOR + 0.01, "#2f241c", { x: this.wx(x + 1), y: 1.35, z: this.wz(0) });
      }
      if (p === 0) {
        // la puerta de la calle no deja salir caminando: se sale por el círculo
        const [px, pz] = pl.puerta;
        this.rects[0].push([this.wx(px) - 0.2, this.wz(pz + 1) + 0.18, this.wx(px + 2) + 0.2, this.wz(pz + 1) + 0.5]);
        this.construirHorno(g);
        if (pl.arbol) this.construirHiguera(g);
        if (pl.escalera) this.construirEscalera(g);
      } else if (pl.escalera) {
        // la llegada de la escalera arriba no tiene pretil, pero tampoco se baja caminando
        const [ax, az] = pl.escalera.arriba;
        this.rects[1].push([this.wx(ax), this.wz(az + 1) + 0.12, this.wx(ax + 1), this.wz(az + 1) + 0.45]);
      }
      this.pisos[p].add(meshPair(g));
    }
  }

  private construirHorno(g: GeoBuilder) {
    const [hx, hz] = this.plano.horno;
    const x = this.wx(hx + 0.5), z = this.wz(hz + 0.5);
    g.lathe([[0, 0], [0.27, 0], [0.28, 0.28], [0.22, 0.5], [0.13, 0.58], [0.08, 0.6], [0, 0.6]], "#a8603a", { x, z }, 14);
    g.box(0.18, 0.16, 0.06, "#2a1a10", { x, y: 0.18, z: z + 0.25 });
    g.sphere(0.06, C.brasa, { x, y: 0.16, z: z + 0.2 }, 6, 5);
    this.circles[0].push([x, z, 0.3]);
    this.agregarLlama(x, 0.25, z + 0.22, 0, 0.8);
  }

  private construirHiguera(g: GeoBuilder) {
    const [ax, az] = this.plano.arbol!;
    const x = this.wx(ax + 0.5), z = this.wz(az + 0.5);
    g.cyl(0.07, 0.1, 1.5, "#6b4a2e", { x, y: 0.75, z }, 8);
    for (const [dx, dy, dz, r] of [[0, 1.75, 0, 0.55], [0.3, 1.55, 0.15, 0.4], [-0.28, 1.6, -0.12, 0.42], [0.05, 2.05, -0.1, 0.36]])
      g.sphere(r, dy > 1.9 ? C.hojaClara : C.hoja, { x: x + dx, y: dy, z: z + dz }, 10, 8);
    for (let i = 0; i < 6; i++) g.sphere(0.045, "#6a3a5a", { x: x + Math.cos(i * 1.7) * 0.4, y: 1.5 + (i % 3) * 0.15, z: z + Math.sin(i * 1.7) * 0.35 }, 6, 5);
    this.circles[0].push([x, z, 0.2]);
  }

  private construirEscalera(g: GeoBuilder) {
    const e = this.plano.escalera!;
    const xs = e.celdas.map((c) => c[0]), zs = e.celdas.map((c) => c[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs) + 1, z0 = Math.min(...zs), z1 = Math.max(...zs) + 1;
    const n = 9;
    const largo = (z1 - z0) * CELDA;
    for (let i = 0; i < n; i++) {
      const h = (ALTURA_PISO * (i + 1)) / n;
      const zz = this.wz(z1) - (largo * (i + 0.5)) / n;
      g.box((x1 - x0) * CELDA - 0.04, h, largo / n + 0.01, i % 2 ? "#b3a586" : "#c2b392", { x: this.wx((x0 + x1) / 2), y: h / 2, z: zz }, 0.03);
    }
    this.rects[0].push([this.wx(x0), this.wz(z0), this.wx(x1), this.wz(z1)]);
  }

  private agregarLlama(x: number, y: number, z: number, piso: 0 | 1, fuerza = 1) {
    const mat = new THREE.SpriteMaterial({ map: texturaBrillo(), color: "#ffffff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const glow = new THREE.Sprite(mat);
    glow.scale.set(0.55, 0.55, 0.55);
    glow.position.set(x, y + this.yPiso(piso), z);
    this.scene.add(glow);
    this.llamas.push({ x, y: y + this.yPiso(piso), z, piso, glow, fuerza });
  }

  // ================================================================ los muebles
  /** Vuelve a dibujar todos los muebles (después de remodelar) y sus luces. */
  private dibujarMuebles() {
    for (const m of this.mallas) {
      this.mueblesGrupo.remove(m);
      disposeGroup(m);
    }
    this.mallas = [];
    // las llamas de los muebles se rehacen; las fijas (el horno) quedan
    for (const l of this.llamas.splice(1)) {
      this.scene.remove(l.glow);
      l.glow.material.dispose();
    }
    for (const c of this.items) {
      const mu = pieza(c.m);
      const g = construirMueble(c.m);
      if (!mu || !g) {
        this.mallas.push(new THREE.Group());
        continue;
      }
      const [w, d] = medidas(mu, c.r);
      const cx = this.wx(c.x + w / 2), cz = this.wz(c.z + d / 2);
      g.position.set(cx, this.yPiso(c.p), cz);
      g.rotation.y = -c.r * (Math.PI / 2);
      g.visible = c.p === 0 || this.vistaPiso === 1;
      this.mueblesGrupo.add(g);
      this.mallas.push(g);
      if (mu.luz) {
        // la pieza fina alumbra como el mueble de donde sale (shared/taller.ts)
        const base = mu.fina ?? c.m;
        const h = LLAMA[base] ?? 0.4;
        this.agregarLlama(cx, h, cz, c.p, base === "brasero" ? 1.1 : 0.75);
      }
    }
    this.reconstruirChoques();
    this.marcarSeleccion();
    this.renderer.shadowMap.needsUpdate = true;
  }

  /** Los muebles también estorban al caminar (las esteras y alfombras no). */
  private reconstruirChoques() {
    const fijosR = this.rectsFijos ?? (this.rectsFijos = [this.rects[0].slice(), this.rects[1].slice()]);
    const fijosC = this.circlesFijos ?? (this.circlesFijos = [this.circles[0].slice(), this.circles[1].slice()]);
    this.rects = [fijosR[0].slice(), fijosR[1].slice()];
    this.circles = [fijosC[0].slice(), fijosC[1].slice()];
    for (const c of this.items) {
      const mu = pieza(c.m);
      if (!mu || mu.capa === 0) continue;
      const [w, d] = medidas(mu, c.r);
      this.rects[c.p].push([this.wx(c.x) + 0.06, this.wz(c.z) + 0.06, this.wx(c.x + w) - 0.06, this.wz(c.z + d) - 0.06]);
    }
    for (const s of this.siervos) this.circles[0].push([s.rig.x, s.rig.z, 0.18]);
    const pl = this.plano;
    for (const p of [0, 1] as const) {
      if (!pl.cuartos.some((c) => c.piso === p)) continue;
      this.nav[p] = new NavGrid(this.rects[p], this.circles[p], PLAYER_R + 0.04, {
        minX: this.wx(0) - 0.3,
        maxX: this.wx(pl.W) + 0.3,
        minZ: this.wz(0) - 0.3,
        maxZ: this.wz(pl.D) + 0.3,
        cell: 0.15,
        walkable: (x, z) => {
          const [cx, cz] = this.celda(x, z);
          return !!cuartoEn(pl, cx, cz, p);
        },
      });
    }
  }
  private rectsFijos: [Rect[], Rect[]] | null = null;
  private circlesFijos: [Circle[], Circle[]] | null = null;

  // ================================================================ los siervos (en tu casa)
  private crearSiervos() {
    if (this.opts.edificio) {
      this.crearPersonas(this.opts.edificio);
      return;
    }
    const tareas = this.estado.esMia ? (this.opts.siervos ?? []).slice(0, 4) : [];
    if (!tareas.length) return;
    const lugarDe = (t: string, i: number): [V2, number, Rig["pose"]] => {
      const buscar = (ids: string[]) => this.items.find((c) => c.p === 0 && ids.includes(c.m));
      const junto = (c: Colocado | undefined): V2 | null => {
        if (!c) return null;
        const mu = mueble(c.m)!;
        const [w, d] = medidas(mu, c.r);
        return [this.wx(c.x + w / 2), this.wz(c.z + d) + 0.32];
      };
      const [hx, hz] = this.plano.horno;
      const horno: V2 = [this.wx(hx + 0.5) - 0.1 + i * 0.12, this.wz(hz + 1.6)];
      if (t === "harina") return [junto(buscar(["molino"])) ?? horno, Math.PI, "kneel"];
      if (t === "aceite") return [junto(buscar(["vasijas", "tinaja"])) ?? [horno[0] + 0.5, horno[1]], Math.PI, "bow"];
      return [[this.wx(this.plano.puerta[0] + 1) + (i % 2 ? 0.8 : -0.8), this.wz(this.plano.puerta[1] - 0.6)], 0, "idle"];
    };
    tareas.forEach((t, i) => {
      const look = randomVisitor();
      const h = this.crowd.add(look.variant, { ...look.colors, robe: ["#8a7a5a", "#7a6a4a", "#9a8a6a", "#6a5a3a"][i % 4] });
      if (!h) return;
      const [[x, z], yaw, pose] = lugarDe(t, i);
      const rig = newRig(x, z, look.scale);
      rig.yaw = yaw;
      rig.pose = pose;
      this.siervos.push({ handle: h, rig, base: [x, z], tarea: t });
    });
    this.reconstruirChoques();
  }

  /** Las personas del edificio (el maestro, los alumnos, el pueblo), cada una en su lugar. */
  private crearPersonas(e: EdificioDef) {
    for (const pd of e.personas) {
      const base = randomVisitor();
      const colors = { ...base.colors, robe: pd.manto, head: pd.cabeza ?? base.colors.head, hair: pd.variante === "anciano" ? "#d9d4cc" : base.colors.hair };
      const h = this.crowd.add(pd.variante, colors);
      if (!h) continue;
      const x = this.wx(pd.x), z = this.wz(pd.z);
      const rig = newRig(x, z, pd.variante === "nino" ? 0.74 : pd.variante === "anciano" ? 0.97 : 1);
      rig.yaw = pd.yaw;
      rig.pose = pd.pose;
      rig.y = pd.alto ?? 0;
      this.siervos.push({ handle: h, rig, base: [x, z], tarea: pd.trabaja ? "trabaja" : "" });
      if (pd.nombre) {
        const el = this.overlay.make("tpl-tag");
        el.textContent = pd.nombre;
        el.style.display = "none";
        this.etiquetasPersonas.push({ el, rig });
      }
    }
    this.reconstruirChoques();
  }

  // ================================================================ los lugares (círculos)
  private crearZonas() {
    const pl = this.plano;
    const [px, pz] = pl.puerta;
    const def: [ZonaId, number, number, 0 | 1, number, string, string][] = [["salir", this.wx(px + 1), this.wz(pz + 0.55), 0, 0.45, "#ffe08a", this.opts.edificio ? "Salir a la ciudad" : "Salir a la calle"]];
    for (const s of this.estaciones) def.push([`est:${s.id}`, this.wx(s.x), this.wz(s.z), 0, 0.42, s.color, `${s.icono} ${s.nombre}`]);
    if (this.estado.esMia) {
      const [hx, hz] = pl.horno;
      def.push(["horno", this.wx(hx + 0.5), this.wz(hz + 1.5), 0, 0.36, "#ffb36b", "El horno"]);
    }
    if (pl.escalera) {
      const [ax, az] = pl.escalera.abajo;
      const [bx, bz] = pl.escalera.arriba;
      def.push(["subir", this.wx(ax + 0.5), this.wz(az + 0.5), 0, 0.36, "#bfe3ff", "Subir al terrado"]);
      def.push(["bajar", this.wx(bx + 0.5), this.wz(bz + 0.5), 1, 0.36, "#bfe3ff", "Bajar al patio"]);
    }
    for (const [id, x, z, piso, r, color, texto] of def) {
      const ring = new Ring(r, color, true);
      ring.set(x, this.yPiso(piso) + 0.02, z);
      this.scene.add(ring.mesh);
      const etiqueta = this.overlay.make("tpl-pad", texto);
      this.zonas.push({ id, x, z, piso, r, ring, inside: false, etiqueta });
    }
    // aparece en la puerta: ese círculo no se dispara solo
    const salir = this.zonas[0];
    const r = this.player.rig;
    salir.inside = Math.hypot(r.x - salir.x, r.z - salir.z) < salir.r + 0.3;
  }

  private updateZonas() {
    if (this.remodelando) return;
    const r = this.player.rig;
    for (const z of this.zonas) {
      const dentro = z.piso === this.piso && Math.hypot(r.x - z.x, r.z - z.z) < z.r;
      if (dentro && !z.inside) {
        z.inside = true;
        // caminando solo hacia otro círculo, este no se dispara (se pasa por encima)
        if (!this.destinoZona || this.destinoZona === z.id) {
          this.destinoZona = null;
          this.alPisar(z.id);
        }
      } else if (!dentro) z.inside = false;
    }
  }

  private alPisar(id: ZonaId) {
    this.audio.page();
    vibrar(15);
    if (id === "salir") this.opts.alSalir();
    else if (id === "horno") this.opts.alHorno?.();
    else if (id === "subir" || id === "bajar") this.cambiarDePiso(id === "subir" ? 1 : 0);
    else if (id.startsWith("est:")) this.opts.alEstacion?.(id.slice(4));
    else if (id.startsWith("trab:")) this.empezarTrabajo(id);
    else if (id.startsWith("diar:")) this.opts.restauracion?.diario(id.slice(5));
  }

  // ================================================================ la restauración (shared/restauracion.ts)
  /** Lo que se ve en cada sala: si está restaurada, todo lo puesto; si no, lo que falta quitar y lo ya puesto. */
  private piezasResto(): Colocado[] {
    if (!this.resto) return [];
    const out: Colocado[] = [];
    for (const s of this.resto.salas) {
      const e = this.resto.estado.get(s.id);
      if (e?.hecha) {
        for (const t of s.trabajos) out.push(...t.pone);
        out.push(...s.extra);
        continue;
      }
      for (const t of s.trabajos) {
        const n = Math.min(t.veces, e?.progreso[t.id] ?? 0);
        out.push(...t.quita.slice(Math.round((t.quita.length * n) / t.veces)));
        out.push(...t.pone.slice(0, Math.round((t.pone.length * n) / t.veces)));
      }
    }
    return out.map((c) => ({ ...c }));
  }

  /** La sala que toca en el tutorial y su primer trabajo sin hacer (para que brille). */
  private zonaGuia(): string | null {
    const id = this.opts.restauracion?.guia;
    if (!this.resto || !id) return null;
    const s = this.resto.salas.find((x) => x.id === id);
    const e = this.resto.estado.get(id);
    if (!s || !e || e.hecha || !e.abierta) return null;
    const t = s.trabajos.find((x) => (e.progreso[x.id] ?? 0) < x.veces);
    return t ? `trab:${s.id}:${t.id}` : null;
  }

  /** Los círculos de los trabajos (en las salas abiertas) y lo de cada día (en las restauradas). */
  private crearZonasResto() {
    if (!this.resto) return;
    for (const z of this.zonas.filter((zz) => zz.id.startsWith("trab:") || zz.id.startsWith("diar:"))) {
      this.scene.remove(z.ring.mesh);
      z.ring.dispose();
      this.overlay.remove(z.etiqueta);
    }
    this.zonas = this.zonas.filter((zz) => !zz.id.startsWith("trab:") && !zz.id.startsWith("diar:"));
    const r = this.player.rig;
    for (const s of this.resto.salas) {
      const e = this.resto.estado.get(s.id);
      if (!e?.abierta) continue;
      const lista: [ZonaId, number, number, string, string][] = [];
      if (e.hecha) lista.push([`diar:${s.id}`, s.diario.x, s.diario.z, e.diarioHoy ? "#b9b0a0" : "#ffd25a", `${s.diario.icono} ${s.diario.nombre}${e.diarioHoy ? " ✓" : ""}`]);
      else
        for (const t of s.trabajos) {
          const n = e.progreso[t.id] ?? 0;
          if (n >= t.veces) continue;
          lista.push([`trab:${s.id}:${t.id}`, t.x, t.z, "#7fd0ff", `${t.icono} ${t.nombre} (${n}/${t.veces})`]);
        }
      for (const [id, cx, cz, color, texto] of lista) {
        const x = this.wx(cx), z = this.wz(cz);
        const ring = new Ring(0.42, color, true);
        ring.set(x, 0.02, z);
        this.scene.add(ring.mesh);
        const etiqueta = this.overlay.make("tpl-pad", texto);
        this.zonas.push({ id, x, z, piso: 0, r: 0.42, ring, inside: Math.hypot(r.x - x, r.z - z) < 0.72, etiqueta });
      }
    }
  }

  /** La gente que vuelve a trabajar en las salas restauradas. */
  private ponerPersonasResto() {
    if (!this.resto) return;
    for (const p of this.personasResto) {
      this.crowd.remove(p.handle);
      const i = this.siervos.findIndex((x) => x.handle === p.handle);
      if (i >= 0) this.siervos.splice(i, 1);
    }
    this.personasResto = [];
    for (const s of this.resto.salas) {
      if (!this.resto.estado.get(s.id)?.hecha) continue;
      for (const pd of s.personas) {
        const look = randomVisitor();
        const h = this.crowd.add(pd.variante, { ...look.colors, robe: pd.manto, hair: pd.variante === "anciano" ? "#d9d4cc" : look.colors.hair });
        if (!h) continue;
        const x = this.wx(pd.x), z = this.wz(pd.z);
        const rig = newRig(x, z, pd.variante === "nino" ? 0.74 : pd.variante === "anciano" ? 0.97 : 1);
        rig.yaw = pd.yaw;
        rig.pose = pd.pose;
        this.siervos.push({ handle: h, rig, base: [x, z], tarea: pd.trabaja ? "trabaja" : "" });
        this.personasResto.push({ handle: h, rig });
      }
    }
    this.reconstruirChoques();
  }

  /** Llega lo que dice el servidor de las salas: se redibuja lo que cambió. */
  ponerRestauracion(estado: SalaEstado[]) {
    if (!this.resto) return;
    const antes = new Map(this.resto.estado);
    this.resto.estado = new Map(estado.map((e) => [e.id, e]));
    this.items = [...this.base, ...this.piezasResto()];
    this.dibujarMuebles();
    this.crearZonasResto();
    const nuevaHecha = estado.some((e) => e.hecha && !antes.get(e.id)?.hecha);
    if (nuevaHecha) {
      this.ponerPersonasResto();
      this.audio.trumpet?.(true);
    }
    this.pushHud();
  }

  private empezarTrabajo(zona: string) {
    if (!this.resto || this.esperandoTrabajo) return;
    const [, sala, trabajo] = zona.split(":");
    const s = this.resto.salas.find((x) => x.id === sala);
    const t = s?.trabajos.find((x) => x.id === trabajo);
    if (!t) return;
    this.ruta = [];
    this.player.vx = this.player.vz = 0;
    this.trabajando = { zona, sala, trabajo, desde: performance.now(), segundos: t.segundos };
  }

  /** Mientras se trabaja: hay que quedarse en el círculo; al cumplir el tiempo, el servidor cuenta la vez. */
  private updateTrabajo(now: number) {
    const tr = this.trabajando;
    if (!tr) return;
    const z = this.zonas.find((zz) => zz.id === tr.zona);
    const r = this.player.rig;
    if (!z || Math.hypot(r.x - z.x, r.z - z.z) > z.r + 0.2) {
      this.trabajando = null;
      r.pose = "idle";
      this.aviso("Te moviste: el trabajo se detuvo. Vuelve al círculo para seguir.", 2600);
      return;
    }
    // trabaja con las manos
    r.pose = Math.sin(now * 0.008) > 0 ? "kneel" : "offer";
    if (now - tr.desde < tr.segundos * 1000) return;
    this.trabajando = null;
    this.esperandoTrabajo = true;
    r.pose = "idle";
    void this.opts.restauracion!.trabajar(tr.sala, tr.trabajo).then((estado) => {
      this.esperandoTrabajo = false;
      if (!this.running || !estado) return;
      this.ponerRestauracion(estado);
      vibrar(25);
      // si sigue en el mismo círculo y falta, sigue trabajando solo
      const zz = this.zonas.find((x) => x.id === tr.zona);
      if (zz && Math.hypot(this.player.rig.x - zz.x, this.player.rig.z - zz.z) < zz.r) this.empezarTrabajo(tr.zona);
    });
  }

  /** Caminar solo hasta un círculo cualquiera (los de la restauración incluidos). */
  irAZona(id: string) {
    const z = this.zonas.find((zz) => zz.id === id);
    if (!z || this.remodelando) return;
    const r = this.player.rig;
    this.ruta = this.nav[this.piso]?.path(r.x, r.z, z.x, z.z) ?? [[z.x, z.z]];
    this.destinoZona = z.id;
    this.marca.set(z.x, this.yPiso(this.piso) + 0.02, z.z);
    this.marca.mesh.visible = true;
    this.marcaT = 1.4;
  }

  /** Caminar solo hasta una estación del edificio (o hasta la puerta, con «salir»). */
  irAEstacion(id: string) {
    const z = this.zonas.find((zz) => zz.id === (id === "salir" ? "salir" : `est:${id}`));
    if (!z || this.remodelando) return;
    const r = this.player.rig;
    this.ruta = this.nav[this.piso]?.path(r.x, r.z, z.x, z.z) ?? [[z.x, z.z]];
    this.destinoZona = z.id;
    this.marca.set(z.x, this.yPiso(this.piso) + 0.02, z.z);
    this.marca.mesh.visible = true;
    this.marcaT = 1.4;
  }

  private cambiarDePiso(p: 0 | 1) {
    const e = this.plano.escalera;
    if (!e) return;
    const [x, z] = p === 1 ? e.arriba : e.abajo;
    const r = this.player.rig;
    r.x = this.wx(x + 0.5);
    r.z = this.wz(z + 0.5) + (p === 1 ? -0.05 : 0.05);
    r.yaw = p === 1 ? Math.PI : 0;
    this.player.vx = this.player.vz = 0;
    this.ruta = [];
    this.piso = p;
    for (const zn of this.zonas) zn.inside = zn.piso === p && Math.hypot(r.x - zn.x, r.z - zn.z) < zn.r + 0.3;
    this.mostrarPiso(p);
    this.aviso(p === 1 ? (this.estado.nivel >= 3 ? "Estás en el terrado: el aposento alto está al oeste." : "Estás en el terrado, con su pretil (Deuteronomio 22:8).") : "Bajaste al patio.");
  }

  /** El piso de arriba se ve solo cuando se está (o se remodela) arriba: si no, taparía la planta baja. */
  private mostrarPiso(p: 0 | 1) {
    this.vistaPiso = p;
    this.pisos[1].visible = p === 1;
    for (let i = 0; i < this.items.length; i++) if (this.mallas[i]) this.mallas[i].visible = this.items[i].p === 0 || p === 1;
    for (const l of this.llamas) l.glow.visible = l.piso === 0 || p === 1;
    for (const z of this.zonas) z.ring.mesh.visible = z.piso === p && !this.remodelando;
    for (const [i, rj] of this.rejillas.entries()) if (rj) rj.visible = this.remodelando && i === p;
    this.renderer.shadowMap.needsUpdate = true;
  }

  // ================================================================ remodelar (solo el dueño)
  get remodelandoAhora() {
    return this.remodelando;
  }

  get interior(): Colocado[] {
    return this.items.map((c) => ({ ...c }));
  }

  get cambios(): boolean {
    return JSON.stringify(this.items) !== JSON.stringify(this.guardado);
  }

  remodelar(on: boolean) {
    if (!this.estado.esMia) return;
    this.remodelando = on;
    this.sel = -1;
    this.ruta = [];
    this.marca.mesh.visible = false;
    if (on && !this.rejillas[0]) this.crearRejillas();
    this.mostrarPiso(on ? this.vistaPiso : this.piso);
    this.marcarSeleccion();
    this.pushHud();
  }

  /** La cuadrícula del modo remodelar: celdas libres en blanco y las fijas (entrada, horno, escalera) en rojo. */
  private crearRejillas() {
    const pl = this.plano;
    for (const p of [0, 1] as const) {
      const cuartos = pl.cuartos.filter((c) => c.piso === p);
      if (!cuartos.length) continue;
      const g = new THREE.Group();
      const pts: number[] = [];
      const y = this.yPiso(p) + 0.012;
      const rojas = new GeoBuilder();
      for (const cu of cuartos) {
        for (let i = 0; i <= cu.w; i++) pts.push(this.wx(cu.x + i), y, this.wz(cu.z), this.wx(cu.x + i), y, this.wz(cu.z + cu.d));
        for (let j = 0; j <= cu.d; j++) pts.push(this.wx(cu.x), y, this.wz(cu.z + j), this.wx(cu.x + cu.w), y, this.wz(cu.z + j));
        for (let x = cu.x; x < cu.x + cu.w; x++)
          for (let z = cu.z; z < cu.z + cu.d; z++) if (this.fijas.has(`${p}:${x},${z}`)) rojas.box(CELDA * 0.9, 0.006, CELDA * 0.9, "#d9534f", { x: this.wx(x + 0.5), y: y + 0.004, z: this.wz(z + 0.5) });
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      g.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.32, depthWrite: false })));
      if (!rojas.empty) g.add(new THREE.Mesh(rojas.build(), new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45, depthWrite: false })));
      g.visible = false;
      this.scene.add(g);
      this.rejillas[p] = g;
    }
  }

  /** El recuadro verde sobre el mueble elegido. */
  private marcarSeleccion() {
    for (const ch of [...this.marcaSel.children]) {
      this.marcaSel.remove(ch);
      const m = ch as THREE.Mesh;
      m.geometry?.dispose();
      (m.material as THREE.Material | undefined)?.dispose();
    }
    if (!this.remodelando || this.sel < 0) return;
    const c = this.items[this.sel];
    const mu = c && mueble(c.m);
    if (!c || !mu) return;
    const [w, d] = medidas(mu, c.r);
    const geo = new THREE.BoxGeometry(w * CELDA - 0.04, 0.05, d * CELDA - 0.04);
    const caja = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: "#7ef0a0", transparent: true, opacity: 0.4, depthWrite: false }));
    caja.position.set(this.wx(c.x + w / 2), this.yPiso(c.p) + 0.03, this.wz(c.z + d / 2));
    const borde = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w * CELDA, 0.9, d * CELDA)), new THREE.LineBasicMaterial({ color: "#3ccf6e" }));
    borde.position.set(caja.position.x, this.yPiso(c.p) + 0.45, caja.position.z);
    this.marcaSel.add(caja, borde);
  }

  /** Un mueble del arcón a la casa: al lugar libre más cerca del centro del piso que se ve. */
  elegirNuevo(m: string): boolean {
    if (!this.remodelando) return false;
    const mu = mueble(m);
    if (!mu) return false;
    if ((this.disponibles()[m] || 0) <= 0) return false;
    if (this.items.length >= this.plano.maxMuebles) {
      this.aviso(`En tu casa caben ${this.plano.maxMuebles} muebles: crece tu casa sirviendo para poner más.`);
      return false;
    }
    if ((mu.nivelMin ?? 0) > this.estado.nivel) {
      this.aviso(`${mu.nombre} pide una casa más grande.`);
      return false;
    }
    const c = lugarLibre(this.plano, this.estado.nivel, m, this.items, this.vistaPiso);
    if (!c) {
      this.aviso(this.vistaPiso === 1 ? "No queda lugar libre arriba: prueba en la planta baja." : "No queda lugar libre: guarda algún mueble o prueba arriba.");
      return false;
    }
    this.items.push(c);
    this.sel = this.items.length - 1;
    this.audio.page();
    this.dibujarMuebles();
    this.aviso(`${mu.icono} ${mu.nombre}: toca el piso donde lo quieras, o gíralo.`);
    this.pushHud();
    return true;
  }

  girar() {
    if (this.sel < 0) return;
    const c = this.items[this.sel];
    const mu = mueble(c.m);
    if (!mu) return;
    const otros = this.items.filter((_, i) => i !== this.sel);
    const r = ((c.r + 1) % 4) as Colocado["r"];
    const [w0, d0] = medidas(mu, c.r);
    const [w1, d1] = medidas(mu, r);
    // girar sobre su centro; si no cabe, probar corrido una celda
    const cx = c.x + w0 / 2, cz = c.z + d0 / 2;
    const base = { x: Math.round(cx - w1 / 2), z: Math.round(cz - d1 / 2) };
    const intentos: [number, number][] = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
    let razon: string | null = null;
    for (const [dx, dz] of intentos) {
      const n: Colocado = { ...c, r, x: base.x + dx, z: base.z + dz };
      const no = porQueNoCabe(this.plano, this.estado.nivel, n, otros);
      if (!no) {
        this.items[this.sel] = n;
        this.audio.page();
        this.dibujarMuebles();
        this.pushHud();
        return;
      }
      razon ??= no;
    }
    this.aviso(razon ?? "No se puede girar ahí.");
  }

  /** Guardar el mueble elegido en el arcón (sale de la casa, sigue siendo tuyo). */
  guardarSeleccion() {
    if (this.sel < 0) return;
    this.items.splice(this.sel, 1);
    this.sel = -1;
    this.audio.page();
    this.dibujarMuebles();
    this.pushHud();
  }

  deseleccionar() {
    this.sel = -1;
    this.marcarSeleccion();
    this.pushHud();
  }

  verPiso(p: 0 | 1) {
    if (!this.plano.cuartos.some((c) => c.piso === p)) return;
    this.sel = -1;
    this.mostrarPiso(p);
    this.marcarSeleccion();
    this.pushHud();
  }

  revertir() {
    this.items = this.guardado.map((c) => ({ ...c }));
    this.sel = -1;
    this.dibujarMuebles();
    this.pushHud();
  }

  /** Lo que guardó el servidor (después de «Listo»). */
  confirmar(estado: InteriorEstado) {
    this.estado = estado;
    this.guardado = estado.interior.map((c) => ({ ...c }));
    this.items = estado.interior.map((c) => ({ ...c }));
    this.sel = -1;
    this.dibujarMuebles();
    this.pushHud();
  }

  /** Bendición dejada (visita): se cuenta en la pantalla. */
  bendecida(bendiciones: number) {
    this.estado = { ...this.estado, bendiciones, yaBendije: true };
    this.pushHud();
  }

  private disponibles(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const [k, n] of Object.entries(this.estado.muebles)) out[k] = n;
    for (const c of this.items) out[c.m] = (out[c.m] || 0) - 1;
    return out;
  }

  /** Un toque en el modo remodelar: elegir un mueble (tocándolo) o llevar el elegido a esa celda. */
  private toqueRemodelar() {
    const t = this.entrada.tomarToque();
    if (!t) return;
    const u = t.x / this.w, v = t.y / this.h;
    // primero, el mueble que se tocó de verdad (los altos, como el telar, se tocan arriba)
    const tocado = this.muebleTocado(u, v);
    const p = haciaElPiso(this.camera, u, v, this.yPiso(this.vistaPiso));
    const celda = p ? this.celda(p[0], p[1]) : null;
    const enCasa = !!celda && !!cuartoEn(this.plano, celda[0], celda[1], this.vistaPiso);
    const aqui = (capa: 0 | 1) =>
      celda
        ? this.items.findIndex((c) => {
            const mu = mueble(c.m);
            return !!mu && mu.capa === capa && c.p === this.vistaPiso && celdasDe(c, mu).some(([x, z]) => x === celda[0] && z === celda[1]);
          })
        : -1;
    const elegir = (i: number) => {
      this.sel = i;
      this.audio.page();
      this.marcarSeleccion();
      this.pushHud();
    };
    if (this.sel < 0) {
      const i = tocado >= 0 ? tocado : aqui(1) >= 0 ? aqui(1) : aqui(0);
      if (i >= 0) elegir(i);
      return;
    }
    const c = this.items[this.sel];
    const mu = mueble(c.m)!;
    if (tocado === this.sel) return;
    // tocar otro mueble lo elige (una alfombra no: el mueble se pone encima)
    const esAlfombra = (i: number) => mueble(this.items[i].m)?.capa === 0;
    if (tocado >= 0 && !(mu.capa === 1 && esAlfombra(tocado))) return elegir(tocado);
    if (!enCasa || !celda) {
      this.deseleccionar();
      return;
    }
    if (celdasDe(c, mu).some(([x, z]) => x === celda[0] && z === celda[1])) return;
    const otro = aqui(mu.capa);
    if (otro >= 0 && otro !== this.sel) return elegir(otro);
    const [w, d] = medidas(mu, c.r);
    const n: Colocado = { ...c, x: celda[0] - Math.floor((w - 1) / 2), z: celda[1] - Math.floor((d - 1) / 2), p: this.vistaPiso };
    const no = porQueNoCabe(this.plano, this.estado.nivel, n, this.items.filter((_, i) => i !== this.sel));
    if (no) {
      this.aviso(no);
      vibrar([10, 40, 10]);
      return;
    }
    this.items[this.sel] = n;
    this.audio.page();
    this.dibujarMuebles();
    this.pushHud();
  }

  private rayo = new THREE.Raycaster();
  /** El mueble que queda bajo un toque (por sus mallas), o -1. */
  private muebleTocado(u: number, v: number): number {
    this.rayo.setFromCamera(new THREE.Vector2(u * 2 - 1, -(v * 2 - 1)), this.camera);
    const visibles = this.mallas.filter((m, i) => m.visible && this.items[i]?.p === this.vistaPiso);
    const hits = this.rayo.intersectObjects(visibles, true);
    for (const h of hits) {
      let o: THREE.Object3D | null = h.object;
      while (o && !this.mallas.includes(o as THREE.Group)) o = o.parent;
      const i = o ? this.mallas.indexOf(o as THREE.Group) : -1;
      if (i >= 0) return i;
    }
    return -1;
  }

  // ================================================================ caminar
  private irAlToque() {
    const t = this.entrada.tomarToque();
    if (!t) return;
    const p = haciaElPiso(this.camera, t.x / this.w, t.y / this.h, this.yPiso(this.piso));
    if (!p) return;
    let [x, z] = p;
    const [cx, cz] = this.celda(x, z);
    if (!cuartoEn(this.plano, cx, cz, this.piso)) return;
    [x, z] = collide(x, z, PLAYER_R, this.rects[this.piso], this.circles[this.piso]);
    const r = this.player.rig;
    this.ruta = this.nav[this.piso]?.path(r.x, r.z, x, z) ?? [[x, z]];
    this.destinoZona = null;
    this.marca.set(x, this.yPiso(this.piso) + 0.02, z);
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
      // la cámara mira desde el sur: adelante es el norte
      this.ruta = [];
      this.destinoZona = null;
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
    const sp = 2.6 * (this.entrada.corre ? 1.35 : 1);
    const k = Math.min(1, dt * 14);
    p.vx += (dx * sp - p.vx) * k;
    p.vz += (dz * sp - p.vz) * k;
    const ox = r.x, oz = r.z;
    let nx = r.x + p.vx * dt, nz = r.z + p.vz * dt;
    [nx, nz] = collide(nx, nz, PLAYER_R, this.rects[this.piso], this.circles[this.piso]);
    const dentro = (x: number, z: number) => {
      const [cx, cz] = this.celda(x, z);
      return !!cuartoEn(this.plano, cx, cz, this.piso);
    };
    if (!dentro(nx, nz)) {
      if (dentro(nx, oz)) nz = oz;
      else if (dentro(ox, nz)) nx = ox;
      else {
        nx = ox;
        nz = oz;
      }
    }
    const moved = Math.hypot(nx - ox, nz - oz);
    r.x = nx;
    r.z = nz;
    r.y = this.yPiso(this.piso);
    r.moving += (Math.min(1, moved / Math.max(dt, 1e-4) / 2) - r.moving) * Math.min(1, dt * 10);
    r.phase += moved * 7.6;
    if (Math.hypot(p.vx, p.vz) > 0.25) r.yaw = turn(r.yaw, Math.atan2(p.vx, p.vz), dt * 12);
    p.step += moved;
    if (p.step > 0.5) {
      p.step = 0;
      this.stepAlt = !this.stepAlt;
      this.audio.footstep(this.stepAlt);
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
    if (live) {
      if (this.remodelando) this.toqueRemodelar();
      else if (!this.trabajando) this.movePlayer(dt);
      else this.entrada.tomarToque();
      this.updateZonas();
      this.updateTrabajo(now);
    } else this.entrada.tomarToque();
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
    this.player.fig.root.visible = !this.remodelando || this.vistaPiso === this.piso;
    this.player.fig.update(r);
    for (const s of this.siervos) {
      s.rig.t += dt;
      // trabajan: se inclinan y vuelven, cada uno a su ritmo
      if (s.rig.pose === "bow" && Math.sin(s.rig.t * 1.4) > 0.95) s.rig.pose = "offer";
      else if (s.rig.pose === "offer" && Math.sin(s.rig.t * 1.4) < 0.1) s.rig.pose = "bow";
      this.crowd.update(s.handle, s.rig);
    }
    this.crowd.flush();
    this.sombras.begin();
    if (this.player.fig.root.visible) this.sombras.add(r.x, r.y, r.z, 0.85);
    for (const s of this.siervos) this.sombras.add(s.rig.x, 0, s.rig.z, 0.8);
    this.sombras.end();
    this.updateLuz(now);
    this.updateCamera(dt);
    this.updateEtiquetas(dt);
    this.overlay.update(now);
  }

  private tmpColor = new THREE.Color();
  private fondo = new THREE.Color();

  private updateLuz(now: number) {
    const t = relojEnLinea().hora;
    const e = t >= 0.22 && t <= 0.78 ? Math.sin((Math.PI * (t - 0.22)) / 0.56) : -0.4;
    const dia = THREE.MathUtils.smoothstep(e, -0.08, 0.3);
    const c = this.tmpColor;
    // de noche la casa queda en penumbra, pero se ve para jugar (y las lámparas alumbran)
    this.hemi.intensity = 1.0 + 0.3 * dia;
    this.hemi.color.set("#8a86b0").lerp(c.set("#fff1d8"), dia);
    this.hemi.groundColor.set("#5a4a3a").lerp(c.set("#7a5a3a"), dia);
    this.sol.intensity = 0.15 + 1.35 * dia;
    this.sol.color.set("#9db4ff").lerp(c.set("#fff0d0"), dia);
    this.fondo.set("#141221").lerp(c.set("#d9c9a6"), dia);
    this.scene.background = this.fondo;
    (this.suelo.material as THREE.MeshLambertMaterial).color.set("#3a3326").lerp(c.set("#b79a6a"), dia);
    this.renderer.toneMappingExposure = 0.95 + 0.12 * dia;
    // las llamas más cercanas encienden las luces de verdad; todas brillan y titilan
    const visibles = this.llamas.filter((l) => l.piso === 0 || this.vistaPiso === 1);
    visibles.sort((a, b) => Math.hypot(a.x - this.camTarget.x, a.z - this.camTarget.z) - Math.hypot(b.x - this.camTarget.x, b.z - this.camTarget.z));
    for (let i = 0; i < this.luces.length; i++) {
      const l = this.luces[i];
      const ll = visibles[i];
      if (!ll) {
        l.intensity = 0;
        continue;
      }
      const tit = 0.9 + 0.1 * Math.sin(now * 0.012 + i * 2.1) * Math.sin(now * 0.007 + i);
      l.position.set(ll.x, ll.y + 0.15, ll.z);
      l.intensity = (0.5 + 1.9 * (1 - dia)) * ll.fuerza * tit;
    }
    for (const [i, ll] of this.llamas.entries()) {
      const tit = 0.85 + 0.15 * Math.sin(now * 0.013 + i * 1.7);
      const m = ll.glow.material as THREE.SpriteMaterial;
      m.opacity = (0.35 + 0.6 * (1 - dia)) * tit;
    }
  }

  private updateCamera(dt: number) {
    const pl = this.plano;
    const portrait = this.camera.aspect < 0.85;
    const ancho = pl.W * CELDA, fondo = pl.D * CELDA;
    let focus: THREE.Vector3;
    let d0: number;
    let ph: number;
    if (this.remodelando) {
      // desde arriba, toda la casa (o el piso de arriba) a la vista
      const cs = pl.cuartos.filter((c) => c.piso === this.vistaPiso);
      const x0 = Math.min(...cs.map((c) => c.x)), x1 = Math.max(...cs.map((c) => c.x + c.w));
      const z0 = Math.min(...cs.map((c) => c.z)), z1 = Math.max(...cs.map((c) => c.z + c.d));
      // el panel de remodelar tapa la parte de abajo: la casa se corre hacia arriba de la pantalla
      const alto = this.h > 0 ? Math.min(1, 420 / this.h) : 0.5;
      const corrimiento = (portrait ? (z1 - z0) * CELDA * 0.62 + 0.8 : (z1 - z0) * CELDA * 0.18 + 0.3) * (0.6 + alto * 0.6);
      focus = new THREE.Vector3(this.wx((x0 + x1) / 2), this.yPiso(this.vistaPiso), this.wz((z0 + z1) / 2) + corrimiento);
      const tam = Math.max((x1 - x0) * CELDA * (portrait ? 1.55 : 1), (z1 - z0) * CELDA * (portrait ? 1.05 : 1.25));
      d0 = tam * (portrait ? 1.55 : 1.3) + 2.2;
      ph = 1.22;
    } else {
      const r = this.player.rig;
      const mx = Math.max(0, ancho / 2 - (portrait ? 1.6 : 2.6)), mz = Math.max(0, fondo / 2 - 2.2);
      // en el teléfono (vertical) el centro va un poco al sur: el muro del fondo queda arriba y no sobra cielo
      const sur = portrait ? 1.0 : 0.3;
      focus = new THREE.Vector3(Math.max(-mx, Math.min(mx, r.x)), r.y, Math.min(fondo / 2, Math.max(-mz, Math.min(mz, r.z)) + sur));
      d0 = (portrait ? 10.5 : 8.6) * this.entrada.zoom * (this.opts.edificio ? 1.1 : this.estado.nivel === 0 ? 0.85 : 1);
      // un poco más desde arriba en los edificios: sus salas son más hondas
      ph = this.opts.edificio ? 1.02 : 0.98;
    }
    const k = 1 - Math.exp(-dt * 5);
    this.camTarget.lerp(focus, k);
    this.camDist += (d0 - this.camDist) * (1 - Math.exp(-dt * 4));
    this.camPh += (ph - this.camPh) * (1 - Math.exp(-dt * 4));
    const d = this.camDist;
    this.camera.position.set(this.camTarget.x, this.camTarget.y + Math.sin(this.camPh) * d, this.camTarget.z + Math.cos(this.camPh) * d);
    this.camera.lookAt(this.camTarget.x, this.camTarget.y + 0.4, this.camTarget.z);
  }

  private updateEtiquetas(dt: number) {
    const r = this.player.rig;
    const sig = this.siguienteId;
    const lejos = this.opts.edificio ? 6.5 : 3.2;
    for (const z of this.zonas) {
      const u = z.ring.mat.uniforms;
      const cerca = z.piso === this.piso ? Math.max(0, 1 - Math.hypot(r.x - z.x, r.z - z.z) / 4) : 0;
      const guia = this.zonaGuia();
      const esSig = guia ? z.id === guia : !!sig && (z.id === `est:${sig}` || (sig === "salir" && z.id === "salir"));
      u.uTime.value = this.time;
      u.uPulse.value += (Math.max(cerca, esSig ? 0.75 + 0.25 * Math.sin(this.time * 4) : 0.35) - u.uPulse.value) * Math.min(1, dt * 4);
      u.uOpacity.value = 0.5 + 0.45 * u.uPulse.value;
      const ver = !this.remodelando && z.piso === this.vistaPiso && (esSig || Math.hypot(r.x - z.x, r.z - z.z) < lejos);
      if (ver) this.overlay.place(z.etiqueta, new THREE.Vector3(z.x, this.yPiso(z.piso) + 0.9, z.z));
      else z.etiqueta.style.display = "none";
    }
    for (const pe of this.etiquetasPersonas) {
      if (Math.hypot(r.x - pe.rig.x, r.z - pe.rig.z) < 7) this.overlay.place(pe.el, new THREE.Vector3(pe.rig.x, pe.rig.y + 2.1, pe.rig.z));
      else pe.el.style.display = "none";
    }
  }

  // ================================================================ pantalla
  private aviso(texto: string, ms = 4200) {
    this.avisoTemporal = { texto, hasta: performance.now() + ms };
    this.pushHud();
  }

  /** Lo que se dice dentro de un edificio: la estación cercana, la puerta o el siguiente paso. */
  private avisoEdificio(): string {
    const r = this.player.rig;
    const salir = this.zonas[0];
    if (Math.hypot(r.x - salir.x, r.z - salir.z) < 1.4) return "Párate en el círculo de la puerta para salir a la ciudad";
    const tr = this.trabajando;
    if (tr) {
      const s = this.resto?.salas.find((x) => x.id === tr.sala);
      const t = s?.trabajos.find((x) => x.id === tr.trabajo);
      const pct = Math.min(100, Math.round(((performance.now() - tr.desde) / (tr.segundos * 1000)) * 100));
      return `${t?.icono ?? "🧱"} ${t?.nombre ?? "Trabajando"}… ${pct} % (quédate en el círculo)`;
    }
    if (this.esperandoTrabajo) return "Listo: guardando tu trabajo…";
    const guia = this.zonaGuia();
    if (guia) {
      const [, sala, trabajo] = guia.split(":");
      const s = this.resto!.salas.find((x) => x.id === sala)!;
      const t = s.trabajos.find((x) => x.id === trabajo)!;
      return `${s.icono} Restaura ${s.nombre.toLowerCase()}: ${t.icono} ${t.nombre} (el círculo azul que brilla). Párate en él unos segundos.`;
    }
    const sig = this.siguienteId;
    if (sig === "salir") return "Lo que sigue es afuera: sal a la ciudad y sigue la flecha del borde de la pantalla.";
    for (const s of this.estaciones) if (Math.hypot(r.x - this.wx(s.x), r.z - this.wz(s.z)) < 1.3) return `${s.icono} ${s.nombre}: ${s.ayuda}`;
    const s = sig ? this.estaciones.find((x) => x.id === sig) : null;
    if (s) return `Tu siguiente paso: ${s.icono} ${s.nombre} (el círculo que brilla). Tócalo abajo para ir.`;
    return "Toca el piso para caminar. Párate en un círculo para servir, o tócalo abajo para ir.";
  }

  private textoAviso(): string {
    if (this.avisoTemporal && performance.now() < this.avisoTemporal.hasta) return this.avisoTemporal.texto;
    if (this.remodelando) {
      if (this.sel >= 0) return "Toca el piso para moverlo, o usa «Girar» y «Guardar en el arcón».";
      return "Toca un mueble para moverlo, o saca uno del arcón (abajo).";
    }
    if (this.opts.edificio) return this.avisoEdificio();
    const r = this.player.rig;
    const salir = this.zonas[0];
    if (this.piso === 0 && Math.hypot(r.x - salir.x, r.z - salir.z) < 1.4) return "Párate en el círculo de la puerta para salir a la calle";
    if (!this.estado.esMia) return this.estado.yaBendije ? `Ya dejaste tu bendición en la casa de ${this.estado.dueno}.` : `Estás de visita en la casa de ${this.estado.dueno}: déjale una bendición.`;
    if (!this.items.length) return "Tu casa está vacía: compra muebles en el mercado y toca «Remodelar» para ponerlos.";
    return "Toca el piso para caminar. «Remodelar» para mover tus muebles.";
  }

  private pushHud() {
    const r = this.player?.rig;
    let lugar = "";
    if (r) {
      const [cx, cz] = this.celda(r.x, r.z);
      const cu: Cuarto | null = cuartoEn(this.plano, cx, cz, this.piso);
      lugar = cu?.nombre ?? this.cuartoActual;
      this.cuartoActual = lugar;
    }
    const sel = this.sel >= 0 ? this.items[this.sel] : null;
    const mu = sel ? mueble(sel.m) : null;
    const e = this.opts.edificio;
    if (e) this.siguienteId = this.opts.siguiente?.() ?? null;
    const sig = this.siguienteId;
    const pisos = [...new Set(this.plano.cuartos.map((c) => c.piso))].sort() as (0 | 1)[];
    const hud: CasaHud = {
      dueno: this.estado.dueno,
      esMia: this.estado.esMia,
      nivel: this.estado.nivel,
      nombreNivel: this.estado.nombreNivel,
      letrero: this.estado.letrero,
      lugar,
      aviso: this.textoAviso(),
      remodelando: this.remodelando,
      seleccion: mu ? { m: mu.id, nombre: mu.nombre, icono: mu.icono } : null,
      colocados: this.items.length,
      max: this.plano.maxMuebles,
      disponibles: this.disponibles(),
      piso: this.remodelando ? this.vistaPiso : this.piso,
      pisos,
      cambios: this.cambios,
      bendiciones: this.estado.bendiciones,
      yaBendije: this.estado.yaBendije,
      edificio: e
        ? {
            id: e.id,
            nombre: e.nombre,
            icono: e.icono,
            maestro: e.maestro,
            estaciones: this.estaciones.map((s) => ({ id: s.id, nombre: s.nombre, icono: s.icono, siguiente: s.id === sig })),
            siguiente: sig,
            resto: this.hudResto(),
          }
        : undefined,
    };
    gameStore.setCasa(hud);
  }

  /** Las salas de la restauración para la pantalla: cómo va cada una y sus círculos para ir. */
  private hudResto(): NonNullable<CasaHud["edificio"]>["resto"] {
    if (!this.resto) return undefined;
    const guia = this.zonaGuia();
    return this.resto.salas.map((s) => {
      const e = this.resto!.estado.get(s.id);
      const hechos = s.trabajos.reduce((a, t) => a + Math.min(t.veces, e?.progreso[t.id] ?? 0), 0);
      return {
        id: s.id,
        nombre: s.nombre,
        icono: s.icono,
        hecha: !!e?.hecha,
        abierta: !!e?.abierta,
        hechos,
        total: s.trabajos.reduce((a, t) => a + t.veces, 0),
        zonas: e?.hecha
          ? [{ id: `diar:${s.id}`, nombre: s.diario.nombre, icono: s.diario.icono, hecho: !!e.diarioHoy, guia: false }]
          : e?.abierta
            ? s.trabajos
                .filter((t) => (e.progreso[t.id] ?? 0) < t.veces)
                .map((t) => ({ id: `trab:${s.id}:${t.id}`, nombre: `${t.nombre} (${e.progreso[t.id] ?? 0}/${t.veces})`, icono: t.icono, hecho: false, guia: `trab:${s.id}:${t.id}` === guia }))
            : [],
      };
    });
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

  /** Mientras otra escena ocupa toda la pantalla (el aula del edificio), este no se dibuja ni se mueve. */
  dormir(on: boolean) {
    const canvas = this.renderer.domElement;
    if (on) {
      if (!this.running) return;
      this.running = false;
      cancelAnimationFrame(this.raf);
      canvas.style.visibility = "hidden";
      this.overlay.layer.style.display = "none";
    } else {
      // (si ya se salió del edificio, el lienzo no está: no se vuelve a encender)
      if (this.running || !canvas.isConnected) return;
      canvas.style.visibility = "";
      this.overlay.layer.style.display = "";
      this.running = true;
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
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
    for (const z of this.zonas) {
      z.ring.dispose();
      this.overlay.remove(z.etiqueta);
    }
    for (const pe of this.etiquetasPersonas) this.overlay.remove(pe.el);
    this.marca.dispose();
    for (const s of this.siervos) this.crowd.remove(s.handle);
    this.personasResto = [];
    this.trabajando = null;
    this.player.fig.dispose();
    this.crowd.dispose();
    this.sombras.dispose();
    for (const l of this.llamas) l.glow.material.dispose();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
    });
    (this.suelo.material as THREE.Material).dispose();
    this.overlay.dispose();
    gameStore.setCasa(null);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }
}
