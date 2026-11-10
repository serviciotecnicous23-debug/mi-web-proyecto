/**
 * La ciudad de Jerusalén en línea (etapa 2): se camina por la plaza, los barrios y las calles,
 * se entra al templo por la escalinata y cada personaje tiene su casa en su barrio.
 *
 * Corre en el navegador como el templo y usa sus mismas piezas (figuras, gente en grupo, caminos,
 * letreros y sonido). El servidor no simula nada: solo da la casa y el resumen del barrio.
 * Todos viven el mismo día y la misma hora (el reloj común) y las mismas fiestas.
 */
import * as THREE from "three";
import { BlobShadows, Crowd, Figure, newRig, randomVisitor, type CrowdHandle, type FigureLook, type Rig } from "../three/characters";
import { ItemRenderer } from "../three/items";
import { Fx } from "../three/fx";
import { NavGrid, collide } from "../three/nav";
import { Overlay, Ring } from "../three/overlay";
import { fadeMaterials } from "../three/structures";
import type { TempleAudio } from "../audio";
import { gameStore, type CiudadHud, type EdificioId, type Modal } from "../store";
import { escalonRank } from "../online";
import type { Circle, Rect, V2 } from "../layout";
import type { ItemType } from "../data";
import { fechaDe, relojEnLinea, type Fecha, type FiestaHoy } from "@shared/calendario";
import { CONSEJOS_ANCIANOS, NIVELES_CASA, areaDeBarrio, nombreDeBarrio, type CasaVista, type CiudadEstado } from "@shared/ciudad";
import * as P from "./plano";
import { buildCiudad, construirAreaDetalle, construirAreaSilueta, construirEnramadas, liberar, type CasaDibujo, type CiudadVisual } from "./escenario";

const DAWN = 0.2;
const DUSK = 0.8;
const HOURS: [number, number, string][] = [
  [0.26, 0.34, "Sacrificio de la mañana"],
  [0.64, 0.72, "Sacrificio de la tarde"],
];
const PLAYER_R = 0.3;
const RANK_LOOK: FigureLook[] = ["aprendiz", "sacerdote", "turno", "principal", "sumo"];

const dist = (ax: number, az: number, bx: number, bz: number) => Math.hypot(ax - bx, az - bz);
function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}

export type CiudadOpts = {
  muted: boolean;
  music: boolean;
  /** El sonido se comparte con el templo para que la música no se corte al pasar de un lugar a otro. */
  audio: TempleAudio;
  /** Dónde aparece: al pie de la escalinata (si sale del templo) o en la puerta de su casa. */
  llegada: "templo" | "casa";
  /** Pide entrar al templo (la pantalla cambia de mundo). */
  alTemplo: () => void;
};

/** Otro barrio que se ve: sus casas (de lejos, siluetas; al entrar en su área, completo). */
export type BarrioVisto = { n: number; area: number; casas: { parcela: number; nivel: number; personajeId?: number; nombre?: string }[]; detalle: boolean };

type ZonaId = "templo" | "casa" | "anuncios" | "ancianos" | "palacio" | "escuela" | "mercado";
type Zona = { id: ZonaId; x: number; z: number; r: number; ring: Ring; inside: boolean };

type Npc = {
  handle: CrowdHandle;
  rig: Rig;
  path: V2[];
  speed: number;
  wait: number;
  kind: "paseo" | "anciano" | "nino" | "guardia" | "alumno" | "peregrino";
  item?: ItemType;
  home?: V2;
  yaw?: number;
};

export class CiudadWorld {
  estado: CiudadEstado;
  readonly audio: TempleAudio;
  private opts: CiudadOpts;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(40, 1, 0.3, 900);
  private sun = new THREE.DirectionalLight("#fff3d6", 2.6);
  private hemi = new THREE.HemisphereLight("#cfe3ff", "#b9a27a", 1.2);
  private fireLight = new THREE.PointLight("#ff9a4a", 0, 16, 1.4);
  private vis: CiudadVisual;
  private crowd = new Crowd(40);
  private shadows = new BlobShadows(80);
  private items = new ItemRenderer(24);
  private fx = new Fx();
  private nav!: NavGrid;
  private overlay: Overlay;
  private rects: Rect[] = [];
  private circles: Circle[] = [];
  private fijos = P.obstaculosFijos();
  private relleno = P.rectsDeRelleno(P.rellenoDeCasas());

  private player: { fig: Figure; rig: Rig; vx: number; vz: number; step: number };
  private npcs: Npc[] = [];
  private zonas: Zona[] = [];
  private barrios = new Map<number, BarrioVisto>();
  private ventanas: THREE.Mesh[] = [];
  private enramadasArea: THREE.Group | null = null;
  private pidiendo = new Set<number>();
  private letreros: { el: HTMLDivElement; p: THREE.Vector3; r: number }[] = [];
  private etiquetasCasas: { el: HTMLDivElement; p: THREE.Vector3; mia: boolean }[] = [];

  private raf = 0;
  private last = 0;
  private running = true;
  private paused = false;
  private w = 1;
  private h = 1;
  private ratio = 1;
  private maxRatio = 1;
  private minRatio = 1;
  private fpsAcc = 0;
  private fpsFrames = 0;
  private goodFor = 0;
  private frameGaps: number[] = [];
  private resizeObs: ResizeObserver;
  private time = 0;
  private hudT = 0;
  private slowT = 0;
  private hora: number | null = null;
  private stepAlt = false;
  private hoyDia = 0;
  private fecha: Fecha;
  private consejo = Math.floor(Math.random() * CONSEJOS_ANCIANOS.length);
  private entrando = false;
  private shadowKey = "";
  private shadowDirty = true;
  private camTarget = new THREE.Vector3();
  private camDist = 21;
  private camTh = 0.36;
  private camPh = 0.98;
  private skyTmp = { a: new THREE.Color(), b: new THREE.Color(), c: new THREE.Color() };

  // entrada
  private keys = new Set<string>();
  private joy = { on: false, id: -1, ox: 0, oy: 0, x: 0, y: 0 };

  constructor(container: HTMLElement, estado: CiudadEstado, opts: CiudadOpts) {
    this.container = container;
    this.estado = estado;
    this.opts = opts;
    this.audio = opts.audio;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    this.renderer = new THREE.WebGLRenderer({ antialias: !coarse || (window.devicePixelRatio || 1) < 2, powerPreference: "high-performance" });
    this.maxRatio = Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2);
    this.minRatio = Math.min(this.maxRatio, (window.devicePixelRatio || 1) >= 2 ? 1.3 : 1);
    this.ratio = this.maxRatio;
    this.renderer.setPixelRatio(this.ratio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    const canvas = this.renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none;outline:none";
    canvas.setAttribute("aria-label", "Jerusalén en línea: la ciudad");
    container.appendChild(canvas);

    this.sun.castShadow = true;
    const sm = coarse ? 1024 : 2048;
    this.sun.shadow.mapSize.set(sm, sm);
    const sc = this.sun.shadow.camera;
    sc.left = -22;
    sc.right = 22;
    sc.top = 22;
    sc.bottom = -22;
    sc.near = 1;
    sc.far = 100;
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.normalBias = 0.035;
    this.scene.add(this.sun, this.sun.target, this.hemi, this.fireLight);
    this.scene.fog = new THREE.Fog("#e9dcc0", 85, 330);

    // el templo dibujado aquí usa los mismos materiales que se vuelven transparentes adentro
    for (const m of fadeMaterials) {
      m.opacity = 1;
      m.depthWrite = true;
    }
    this.vis = buildCiudad();
    this.scene.add(this.vis.root, this.crowd.group, this.shadows.mesh, this.items.group, this.fx.group);
    if (coarse) this.fx.density = 0.7;
    this.overlay = new Overlay(container, this.camera);

    // mi barrio completo; los otros, siluetas hasta que se entra en su área
    this.barrios.set(estado.barrio.n, { n: estado.barrio.n, area: estado.barrio.area, casas: estado.barrio.casas, detalle: true });
    this.dibujarAreas();

    // el aprendiz con su vestidura según su escalón
    const look = RANK_LOOK[Math.max(1, Math.min(4, escalonRank(estado.yo.escalon)))];
    const pf = new Figure(look);
    const casa = P.parcelaDe(estado.barrio.n, estado.yo.parcela);
    const [sx, sz] = opts.llegada === "templo" ? P.LLEGADA_TEMPLO : casa.umbral;
    const pr = newRig(sx, sz);
    pr.yaw = opts.llegada === "templo" ? Math.PI / 2 : casa.dir === 1 ? 0 : Math.PI;
    pr.y = P.alturaCiudad(sx, sz);
    this.player = { fig: pf, rig: pr, vx: 0, vz: 0, step: 0 };
    this.scene.add(pf.root);
    this.camTarget.set(sx, pr.y, sz);

    this.crearZonas();
    this.crearLetreros();
    this.crearGente();

    this.fecha = fechaDe(relojEnLinea().dia);
    this.hoyDia = this.fecha.numero;
    this.syncFiesta();

    canvas.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerUp);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();

    const yo = estado.yo;
    if (yo.subio !== null) gameStore.toast(`¡Tu casa creció! Ahora es ${NIVELES_CASA[yo.subio].nombre.toLowerCase()}`, "gold");
    else if (opts.llegada === "templo") gameStore.toast(`Jerusalén: tu casa está en ${estado.barrio.nombre}, casa ${yo.parcela + 1}`, "info");
    const hoy = this.fiestaHoy();
    if (hoy) gameStore.toast(`${hoy.fiesta.icono} Hoy en Jerusalén: ${hoy.fiesta.nombre}`, hoy.fiesta.solemne ? "info" : "gold");
    this.pushHud();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  // ================================================================ API para la pantalla
  setMuted(m: boolean) {
    this.audio.setMuted(m);
  }

  setMusic(on: boolean) {
    this.audio.setMusic(on);
  }

  setPaused(p: boolean) {
    this.paused = p;
  }

  /** Llega el estado de la ciudad otra vez (al volver a entrar o al refrescar). */
  actualizar(estado: CiudadEstado) {
    const antes = this.barrios.get(estado.barrio.n);
    this.estado = estado;
    const cambio = !antes || JSON.stringify(antes.casas.map((c) => [c.parcela, c.nivel])) !== JSON.stringify(estado.barrio.casas.map((c) => [c.parcela, c.nivel]));
    this.barrios.set(estado.barrio.n, { n: estado.barrio.n, area: estado.barrio.area, casas: estado.barrio.casas, detalle: true });
    if (cambio) this.dibujarAreas();
    this.pushHud();
  }

  /** Lleva al aprendiz a un lugar de la ciudad (con «Ir a…»). */
  irA(lugar: "casa" | "templo" | "plaza" | "puerta" | "palacio" | "escuela") {
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const destinos: Record<typeof lugar, [V2, number]> = {
      casa: [casa.umbral, casa.dir === 1 ? 0 : Math.PI],
      templo: [P.LLEGADA_TEMPLO, -Math.PI / 2],
      plaza: [[54, 0], -Math.PI / 2],
      puerta: [[70.5, 0], Math.PI / 2],
      palacio: [[17, 17.4], 0],
      escuela: [[17, -19], Math.PI],
    };
    const [[x, z], yaw] = destinos[lugar];
    const r = this.player.rig;
    r.x = x;
    r.z = z;
    r.y = P.alturaCiudad(x, z);
    r.yaw = yaw;
    this.player.vx = this.player.vz = 0;
    // el círculo donde aparece no se dispara solo
    for (const zn of this.zonas) zn.inside = dist(x, z, zn.x, zn.z) < zn.r;
    this.camTarget.set(x, r.y, z);
    this.shadowDirty = true;
    this.audio.page();
  }

  fiestaHoy(): FiestaHoy | null {
    return this.fecha.fiestas[0] ?? null;
  }

  // ================================================================ ciclo
  private frame = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    const raw = Math.max(0, (now - this.last) / 1000);
    const dt = Math.min(0.05, raw);
    this.last = now;
    this.time += dt;
    const live = !this.paused && !gameStore.busy;
    if (live) this.simulate(dt);
    this.animate(dt, live, now);
    this.renderer.render(this.scene, this.camera);
    this.adapt(raw);
    this.hudT += dt;
    if (this.hudT > 0.1) {
      this.hudT = 0;
      this.pushHud();
    }
  };

  /** Si el equipo no da abasto, baja un poco la resolución (como en el templo). */
  private adapt(raw: number) {
    if (document.hidden || gameStore.busy || raw > 0.5) {
      this.fpsAcc = 0;
      this.fpsFrames = 0;
      this.frameGaps.length = 0;
      return;
    }
    this.fpsAcc += raw;
    this.fpsFrames++;
    this.frameGaps.push(raw);
    if (this.fpsAcc < 3) return;
    const mean = this.fpsAcc / this.fpsFrames;
    let v = 0;
    for (const g of this.frameGaps) v += (g - mean) * (g - mean);
    const sd = Math.sqrt(v / this.frameGaps.length);
    const fps = 1 / mean;
    this.fpsAcc = 0;
    this.fpsFrames = 0;
    this.frameGaps.length = 0;
    const steady = sd < mean * 0.2;
    const set = (r: number) => {
      this.ratio = r;
      this.renderer.setPixelRatio(r);
      this.resize();
      this.goodFor = 0;
    };
    if (fps < 38 && !steady && this.ratio > this.minRatio + 0.01) set(Math.max(this.minRatio, this.ratio - 0.15));
    else if (fps > 52 || steady) {
      this.goodFor += 3;
      if (this.goodFor >= 6 && this.ratio < this.maxRatio) set(Math.min(this.maxRatio, this.ratio + 0.15));
    } else this.goodFor = 0;
  }

  private resize() {
    const r = this.container.getBoundingClientRect();
    this.w = Math.max(1, Math.round(r.width));
    this.h = Math.max(1, Math.round(r.height));
    this.renderer.setSize(this.w, this.h, false);
    this.camera.aspect = this.w / this.h;
    this.camera.fov = this.camera.aspect < 0.85 ? 52 : this.camera.aspect < 1.2 ? 46 : 40;
    this.camera.updateProjectionMatrix();
    this.overlay.resize(this.w, this.h);
    const px = (this.h * this.ratio) / (2 * Math.tan((this.camera.fov * Math.PI) / 360));
    this.fx.setScale(px);
  }

  private reloj() {
    return relojEnLinea();
  }

  private simulate(dt: number) {
    const reloj = this.reloj();
    if (reloj.dia !== this.hoyDia) {
      this.hoyDia = reloj.dia;
      this.fecha = fechaDe(reloj.dia);
      this.syncFiesta();
      const f = this.fiestaHoy();
      if (f && f.dia === 1) {
        gameStore.toast(`${f.fiesta.icono} Empieza en Jerusalén: ${f.fiesta.nombre}`, f.fiesta.solemne ? "info" : "gold");
        if (f.fiesta.id === "trompetas" || f.fiesta.id === "lunaNueva") this.audio.trumpet(true);
      }
    }
    // las trompetas del templo llaman a la hora del sacrificio (Números 10:10)
    const h = HOURS.findIndex(([a, b]) => reloj.hora >= a && reloj.hora < b);
    if (this.hora === null) this.hora = h;
    else if (h !== this.hora) {
      if (h >= 0) {
        this.audio.trumpet();
        gameStore.toast(`Suenan las trompetas en el templo: ${HOURS[h][2].toLowerCase()}`, "info");
      }
      this.hora = h;
    }
    this.movePlayer(dt);
    this.updateZonas();
    this.updateGente(dt);
    this.slowT += dt;
    if (this.slowT > 0.5) {
      this.slowT = 0;
      this.mirarAreas();
    }
  }

  // ---------------------------------------------------------------- el aprendiz
  private inputVector(): [number, number] {
    let x = 0, y = 0;
    if (this.keys.has("arrowleft") || this.keys.has("a")) x -= 1;
    if (this.keys.has("arrowright") || this.keys.has("d")) x += 1;
    if (this.keys.has("arrowup") || this.keys.has("w")) y += 1;
    if (this.keys.has("arrowdown") || this.keys.has("s")) y -= 1;
    if (this.joy.on) {
      x += this.joy.x;
      y += this.joy.y;
    }
    const m = Math.hypot(x, y);
    if (m > 1) {
      x /= m;
      y /= m;
    }
    return [x, y];
  }

  private movePlayer(dt: number) {
    const p = this.player;
    const r = p.rig;
    const [ix, iy] = this.inputVector();
    const th = 0.36;
    const fx = -Math.cos(th), fz = -Math.sin(th);
    const rx = -fz, rz = fx;
    const dx = rx * ix + fx * iy;
    const dz = rz * ix + fz * iy;
    const sp = 5.4;
    const k = Math.min(1, dt * 12);
    p.vx += (dx * sp - p.vx) * k;
    p.vz += (dz * sp - p.vz) * k;
    const ox = r.x, oz = r.z;
    let nx = r.x + p.vx * dt, nz = r.z + p.vz * dt;
    [nx, nz] = collide(nx, nz, PLAYER_R, this.rects, this.circles);
    if (!P.caminable(nx, nz)) {
      if (P.caminable(nx, oz)) nz = oz;
      else if (P.caminable(ox, nz)) nx = ox;
      else {
        nx = ox;
        nz = oz;
      }
    }
    const moved = Math.hypot(nx - ox, nz - oz);
    r.x = nx;
    r.z = nz;
    r.y = P.alturaCiudad(nx, nz);
    const speedNow = moved / Math.max(dt, 1e-4);
    r.moving += (Math.min(1, speedNow / 3) - r.moving) * Math.min(1, dt * 10);
    r.phase += moved * 7.2;
    if (Math.hypot(p.vx, p.vz) > 0.3) r.yaw = turn(r.yaw, Math.atan2(p.vx, p.vz), dt * 12);
    p.step += moved;
    if (p.step > 0.62) {
      p.step = 0;
      this.stepAlt = !this.stepAlt;
      this.audio.footstep(this.stepAlt);
      if (escalonRank(this.estado.yo.escalon) >= 4) this.audio.bells();
    }
  }

  // ---------------------------------------------------------------- lugares (círculos)
  private crearZonas() {
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const def: [ZonaId, V2, number, string][] = [
      ["templo", P.ENTRADA_TEMPLO, 1.3, "#ffd25a"],
      ["casa", casa.umbral, 0.8, "#ffe08a"],
      ["anuncios", P.ANUNCIOS, 1.1, "#ffffff"],
      ["ancianos", P.ANCIANOS, 1.4, "#e8c66a"],
      ["palacio", P.PALACIO_PUERTA, 1.2, "#c9a8f0"],
      ["escuela", P.ESCUELA_PUERTA, 1.2, "#8fe08a"],
      ["mercado", P.MERCADO, 1.0, "#f0b45a"],
    ];
    for (const [id, [x, z], r, color] of def) {
      const ring = new Ring(r, color, false);
      ring.set(x, P.alturaCiudad(x, z), z);
      this.scene.add(ring.mesh);
      const pr = this.player.rig;
      this.zonas.push({ id, x, z, r, ring, inside: dist(pr.x, pr.z, x, z) < r });
    }
  }

  private updateZonas() {
    const r = this.player.rig;
    for (const z of this.zonas) {
      const inside = dist(r.x, r.z, z.x, z.z) < z.r;
      const entered = inside && !z.inside;
      z.inside = inside;
      if (!entered || gameStore.busy) continue;
      this.audio.page();
      switch (z.id) {
        case "templo":
          if (!this.entrando) {
            this.entrando = true;
            this.audio.trumpet();
            this.opts.alTemplo();
          }
          break;
        case "casa":
          this.abrir({ kind: "casa" });
          break;
        case "anuncios":
          this.abrir({ kind: "anuncios" });
          break;
        case "ancianos":
          this.consejo = (this.consejo + 1) % CONSEJOS_ANCIANOS.length;
          this.abrir({ kind: "ancianos", n: this.consejo });
          break;
        case "palacio":
        case "escuela":
        case "mercado":
          this.abrir({ kind: "edificio", id: z.id as EdificioId });
          break;
      }
    }
  }

  private abrir(m: Modal) {
    this.keys.clear();
    this.joy.on = false;
    this.overlay.joystick(false);
    gameStore.push(m);
  }

  /** La pantalla vuelve a dejar entrar al templo (si falló el cambio de mundo). */
  volverAPermitirTemplo() {
    this.entrando = false;
  }

  // ---------------------------------------------------------------- las casas de cada área
  /** El barrio que se ve en cada área: el propio en la suya; en las otras, el primero de esa área. */
  private barrioDeArea(area: number): number {
    if (areaDeBarrio(this.estado.barrio.n) === area) return this.estado.barrio.n;
    return area;
  }

  /** Vuelve a dibujar las casas de las cuatro áreas y arma otra vez los choques y los caminos. */
  private dibujarAreas() {
    for (const m of this.ventanas) {
      m.parent?.remove(m);
      m.geometry.dispose();
    }
    this.ventanas = [];
    if (this.enramadasArea) {
      this.vis.enramadas.remove(this.enramadasArea);
      liberar(this.enramadasArea);
      this.enramadasArea = null;
    }
    const casasRects: Rect[] = [];
    for (let area = 1; area <= P.AREA_RECT.length; area++) {
      const g = this.vis.areas[area - 1];
      for (const c of [...g.children]) {
        g.remove(c);
        liberar(c);
      }
      const n = this.barrioDeArea(area);
      const b = this.barrios.get(n);
      const casas = b?.casas ?? [];
      if (b?.detalle) {
        const dib: CasaDibujo[] = casas.map((c) => ({ parcela: c.parcela, nivel: c.nivel, personajeId: c.personajeId ?? c.parcela }));
        const { grupo, ventanas } = construirAreaDetalle(area, dib);
        g.add(grupo);
        if (ventanas) {
          this.vis.ventanas.add(ventanas);
          this.ventanas.push(ventanas);
        }
        if (n === this.estado.barrio.n) {
          this.enramadasArea = construirEnramadas(area, dib);
          this.vis.enramadas.add(this.enramadasArea);
        }
      } else g.add(construirAreaSilueta(area, casas));
      for (const c of casas) casasRects.push(P.casaRect(P.PARCELAS[area - 1][c.parcela], c.nivel));
    }
    this.rects = [...this.fijos.rects, ...this.relleno, ...casasRects];
    this.circles = this.fijos.circles;
    this.nav = new NavGrid(this.rects, this.circles, 0.3, { ...P.LIMITES, cell: 1, walkable: P.caminable });
    this.crearEtiquetasCasas();
    this.shadowDirty = true;
    this.syncNoche(true);
  }

  /** Al entrar en el área de otro barrio, se piden sus casas para verlas completas. */
  private mirarAreas() {
    const r = this.player.rig;
    const area = P.areaEn(r.x, r.z);
    if (!area) return;
    const n = this.barrioDeArea(area);
    const b = this.barrios.get(n);
    if (b?.detalle || this.pidiendo.has(n)) return;
    this.pidiendo.add(n);
    void fetch(`/api/jerusalen/ciudad/barrio/${n}`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { n: number; area: number; casas: CasaVista[] } | null) => {
        if (!this.running) return;
        this.barrios.set(n, { n, area, casas: data?.casas ?? [], detalle: true });
        this.dibujarAreas();
      })
      .catch(() => null)
      .finally(() => this.pidiendo.delete(n));
  }

  /** Siluetas de los otros barrios (las manda la pantalla con lo que trae el servidor). */
  verOtros(otros: { n: number; area: number; casas: { parcela: number; nivel: number }[] }[]) {
    let cambio = false;
    for (const o of otros) {
      if (o.n === this.estado.barrio.n || this.barrios.get(o.n)?.detalle) continue;
      this.barrios.set(o.n, { n: o.n, area: o.area, casas: o.casas, detalle: false });
      cambio = true;
    }
    if (cambio) this.dibujarAreas();
  }

  private crearEtiquetasCasas() {
    for (const e of this.etiquetasCasas) this.overlay.remove(e.el);
    this.etiquetasCasas = [];
    for (let area = 1; area <= P.AREA_RECT.length; area++) {
      const b = this.barrios.get(this.barrioDeArea(area));
      if (!b?.detalle) continue;
      for (const c of b.casas) {
        const p = P.PARCELAS[area - 1][c.parcela];
        const mia = b.n === this.estado.barrio.n && c.parcela === this.estado.yo.parcela;
        const nombre = mia ? "Tu casa" : c.nombre ? `Casa de ${c.nombre}` : null;
        if (!nombre) continue;
        const [, , hh] = P.CASA_MEDIDA[Math.max(0, Math.min(3, c.nivel))];
        // el nombre lo escribió una persona: va como texto, nunca como HTML
        const el = this.overlay.make("tpl-tag");
        el.textContent = nombre;
        el.style.display = "none";
        if (mia) el.style.background = "rgba(180,120,10,.85)";
        this.etiquetasCasas.push({ el, p: new THREE.Vector3(p.x, P.SUELO + hh + (c.nivel >= 3 ? 2.2 : 0.9), p.z), mia });
      }
    }
  }

  private crearLetreros() {
    const L = this.vis.letreros;
    const def: [string, THREE.Vector3, number][] = [
      ["La casa de Jehová", L.templo, 34],
      ["El palacio del rey", L.palacio, 34],
      ["La escuela de los profetas", L.escuela, 30],
      ["La puerta de la ciudad", L.puerta, 30],
      ["El púlpito de la plaza", L.plaza, 22],
    ];
    for (const [t, p, r] of def) {
      const el = this.overlay.make("tpl-tag", t);
      el.style.display = "none";
      this.letreros.push({ el, p, r });
    }
  }

  // ---------------------------------------------------------------- la gente de la ciudad
  private crearGente() {
    // los ancianos sentados a la puerta (Rut 4:1-2): cinco de cada lado
    for (const sg of [-1, 1])
      for (let i = 0; i < 5; i++) {
        const z = sg * (4.9 + i * 1.25);
        this.npc("anciano", [73.65, z], { yaw: -Math.PI / 2, sit: true });
      }
    // niños que juegan en la plaza (Zacarías 8:5)
    for (const [x, z] of [[53.5, 1.4], [54.6, 5.2], [58.4, 4.6]] as V2[]) this.npc("nino", [x, z], {});
    // guardias a la puerta del palacio y alumnos en los bancos de la escuela
    for (const x of [15.4, 18.6]) this.npc("guardia", [x, 19.4], { yaw: Math.PI });
    for (const x of [10.2, 11.8, 23.4]) this.npc("alumno", [x, -22.05], { yaw: 0, sit: true });
    // gente que pasea por la plaza y las calles
    for (let i = 0; i < 7; i++) this.npc("paseo", P.PASEO[i * 3 % P.PASEO.length], {});
  }

  private npc(kind: Npc["kind"], at: V2, o: { yaw?: number; sit?: boolean }) {
    let look = randomVisitor(kind === "peregrino");
    if (kind === "anciano") look = { variant: "anciano", colors: { ...randomVisitor().colors, hair: "#d9d4cc" }, scale: 0.97 };
    if (kind === "nino") look = { variant: "nino", colors: randomVisitor().colors, scale: 0.74 };
    if (kind === "guardia") look = { variant: "hombre", colors: { robe: "#7a2f2f", accent: "#b8763b", head: "#5b3a2a", skin: randomVisitor().colors.skin, hair: "#2b1d14" }, scale: 1.04 };
    if (kind === "alumno") look = { variant: "hombre", colors: { robe: "#8a7a5a", accent: "#4a3a2a", head: "#d8c8a6", skin: randomVisitor().colors.skin, hair: "#3b2a1e" }, scale: 1 };
    const handle = this.crowd.add(look.variant, look.colors);
    if (!handle) return null;
    const rig = newRig(at[0], at[1], look.scale);
    rig.y = P.alturaCiudad(at[0], at[1]) + (o.sit && kind === "anciano" ? 0.22 : 0);
    if (o.yaw !== undefined) rig.yaw = o.yaw;
    if (o.sit) rig.pose = "sit";
    const n: Npc = { handle, rig, path: [], speed: kind === "nino" ? 1.6 : 1.2 + Math.random() * 0.5, wait: Math.random() * 3, kind, home: at, yaw: o.yaw };
    this.npcs.push(n);
    return n;
  }

  private quitarNpc(n: Npc) {
    this.crowd.remove(n.handle);
    this.npcs.splice(this.npcs.indexOf(n), 1);
  }

  /** Lo que lleva la gente según la fiesta: corderos en la Pascua, gavillas en los panes y las primicias. */
  private cargaDeFiesta(): ItemType | undefined {
    const f = this.fiestaHoy()?.fiesta.ofrenda;
    if (f === "cordero") return "cordero";
    if (f === "cereal") return "cereal";
    if (f === "palomas") return "palomas";
    return undefined;
  }

  private syncFiesta() {
    const f = this.fiestaHoy()?.fiesta;
    this.vis.enramadas.visible = f?.id === "tabernaculos";
    // peregrinos de tierras lejanas en Pentecostés y en los tabernáculos (1 Reyes 8:41-43)
    const quiere = f?.peregrinos ? 6 : 0;
    const hay = this.npcs.filter((n) => n.kind === "peregrino");
    for (let i = hay.length; i < quiere; i++) this.npc("peregrino", P.PASEO[(i * 5 + 2) % P.PASEO.length], {});
    for (let i = quiere; i < hay.length; i++) this.quitarNpc(hay[i]);
    const carga = this.cargaDeFiesta();
    for (const n of this.npcs) if (n.kind === "paseo" || n.kind === "peregrino") n.item = carga && Math.random() < 0.6 ? carga : undefined;
    this.audio.layers.event = !!f && !f.solemne && f.id !== "lunaNueva";
  }

  private walk(r: Rig, path: V2[], speed: number, dt: number): boolean {
    if (!path.length) {
      r.moving = Math.max(0, r.moving - dt * 6);
      return true;
    }
    const [tx, tz] = path[0];
    const dx = tx - r.x, dz = tz - r.z;
    const d = Math.hypot(dx, dz);
    const step = speed * dt;
    if (d <= step || d < 0.02) {
      r.x = tx;
      r.z = tz;
      path.shift();
      r.phase += (d * 7.2) / r.scale;
    } else {
      r.x += (dx / d) * step;
      r.z += (dz / d) * step;
      r.phase += (step * 7.2) / r.scale;
      r.yaw = turn(r.yaw, Math.atan2(dx, dz), dt * 10);
    }
    r.moving = Math.min(1, r.moving + dt * 6);
    r.y = P.alturaCiudad(r.x, r.z);
    return path.length === 0;
  }

  private updateGente(dt: number) {
    const solemne = !!this.fiestaHoy()?.fiesta.solemne;
    for (const n of this.npcs) {
      const r = n.rig;
      r.t += dt;
      switch (n.kind) {
        case "anciano":
        case "alumno":
        case "guardia":
          r.moving = 0;
          if (n.yaw !== undefined) r.yaw = turn(r.yaw, n.yaw, dt * 3);
          break;
        case "nino": {
          // juegan alrededor del pozo, corriendo de un lado a otro
          if (solemne) {
            r.pose = "sit";
            r.moving = 0;
            break;
          }
          r.pose = n.wait > 0 ? "play" : "idle";
          if (n.wait > 0) {
            n.wait -= dt;
            r.moving = Math.max(0, r.moving - dt * 6);
            if (n.wait <= 0) {
              const a = Math.random() * Math.PI * 2, rad = 2.2 + Math.random() * 2.8;
              n.path = [[P.POZO[0] + Math.cos(a) * rad, P.POZO[1] + Math.sin(a) * rad]];
            }
          } else if (this.walk(r, n.path, n.speed, dt)) n.wait = 1.5 + Math.random() * 3;
          break;
        }
        default: {
          if (n.wait > 0) {
            n.wait -= dt;
            r.moving = Math.max(0, r.moving - dt * 6);
            if (n.wait <= 0) {
              // en las fiestas con ofrenda, muchos suben al templo con su ofrenda
              const alTemplo = !!n.item && Math.random() < 0.5;
              const [tx, tz] = alTemplo ? [P.LLEGADA_TEMPLO[0] + 0.6, (Math.random() - 0.5) * 3] : P.PASEO[Math.floor(Math.random() * P.PASEO.length)];
              n.path = this.nav.path(r.x, r.z, tx, tz);
            }
          } else if (this.walk(r, n.path, n.speed * (solemne ? 0.75 : 1), dt)) n.wait = 2 + Math.random() * 5;
        }
      }
    }
  }

  // ================================================================ dibujo
  private animate(dt: number, live: boolean, now: number) {
    this.updateSky();
    this.updateCamera(dt);
    this.shadows.begin();
    this.items.begin();
    const p = this.player;
    if (!live) p.rig.moving = Math.max(0, p.rig.moving - dt * 6);
    p.rig.t += dt;
    p.fig.update(p.rig);
    this.shadows.add(p.rig.x, p.rig.y, p.rig.z, 1.1);
    for (const n of this.npcs) {
      if (!live) n.rig.t += dt;
      this.crowd.update(n.handle, n.rig);
      this.shadows.add(n.rig.x, n.rig.y, n.rig.z, n.rig.scale);
      if (n.item) {
        const r = n.rig;
        this.items.add(n.item, r.x + Math.sin(r.yaw) * 0.36 * r.scale, r.y + 0.6 * r.scale, r.z + Math.cos(r.yaw) * 0.36 * r.scale, r.yaw, 0.95);
      }
    }
    this.crowd.flush();
    this.shadows.end();
    this.items.end();
    this.efectos(dt);
    this.fx.update(dt);
    this.updateLabels(dt);
    this.overlay.update(now);
    this.ambiente();
    this.audio.update();
    if (this.shadowDirty) {
      this.renderer.shadowMap.needsUpdate = true;
      this.shadowDirty = false;
    }
  }

  private noche() {
    const t = this.reloj().hora;
    return t < DAWN || t > DUSK;
  }

  private nocheAntes: boolean | null = null;
  private syncNoche(force = false) {
    const t = this.reloj().hora;
    const encendidas = t < DAWN + 0.02 || t > DUSK - 0.04;
    if (!force && encendidas === this.nocheAntes) return;
    this.nocheAntes = encendidas;
    for (const m of this.ventanas) m.visible = encendidas;
    this.audio.layers.night = this.noche();
  }

  private efectos(dt: number) {
    // el fuego del altar no se apaga (Levítico 6:13): se ve el humo sobre el monte
    this.fx.incense("humo", this.vis.humo, dt, 1.2);
    this.syncNoche();
    const t = this.reloj().hora;
    if (t < DAWN + 0.02 || t > DUSK - 0.05) {
      // braseros de la plaza, de la puerta y del palacio, solo los cercanos
      const r = this.player.rig;
      let near = 0;
      for (let i = 0; i < this.vis.fuegos.length; i++) {
        const f = this.vis.fuegos[i];
        const d = dist(r.x, r.z, f.x, f.z);
        if (d > 40) continue;
        this.fx.flame(`f${i}`, f, dt, 1.8);
        if (d < 14) near = Math.max(near, 1 - d / 14);
      }
      const flick = 0.85 + Math.sin(this.time * 17) * 0.06 + Math.sin(this.time * 7.3) * 0.08;
      this.fireLight.intensity = 10 * near * flick;
      if (near > 0) {
        const f = this.vis.fuegos.reduce((a, b) => (dist(r.x, r.z, a.x, a.z) < dist(r.x, r.z, b.x, b.z) ? a : b));
        this.fireLight.position.copy(f).add(new THREE.Vector3(0, 0.6, 0));
      }
    } else this.fireLight.intensity = 0;
  }

  private ambiente() {
    const lx = this.camTarget.x, lz = this.camTarget.z;
    const near = (x: number, z: number, r: number) => Math.max(0, 1 - dist(lx, lz, x, z) / r);
    const crowd = (this.npcs.length + 4) * (0.35 + 0.65 * near(56, 0, 30));
    const water = near(P.POZO[0], P.POZO[1], 6) * 0.6;
    this.audio.ambience({ crowd, fire: 0, water, night: this.noche(), day: this.hoyDia });
  }

  private updateCamera(dt: number) {
    const r = this.player.rig;
    const portrait = this.camera.aspect < 0.85;
    const d0 = portrait ? 24 : this.camera.aspect < 1.2 ? 22 : 20.5;
    const focus = new THREE.Vector3(r.x + this.player.vx * 0.22, r.y, r.z + this.player.vz * 0.22);
    const k = 1 - Math.exp(-dt * 5);
    this.camTarget.lerp(focus, k);
    this.camDist += (d0 - this.camDist) * (1 - Math.exp(-dt * 3));
    this.camTh = turn(this.camTh, 0.36, 1 - Math.exp(-dt * 3));
    this.camPh += (0.98 - this.camPh) * (1 - Math.exp(-dt * 3));
    const d = this.camDist;
    this.camera.position.set(
      this.camTarget.x + Math.cos(this.camTh) * Math.cos(this.camPh) * d,
      this.camTarget.y + Math.sin(this.camPh) * d,
      this.camTarget.z + Math.sin(this.camTh) * Math.cos(this.camPh) * d,
    );
    this.camera.lookAt(this.camTarget.x, this.camTarget.y + 0.8, this.camTarget.z);
    this.vis.sky.position.copy(this.camera.position);
    this.vis.stars.position.copy(this.camera.position);
  }

  private updateSky() {
    const t = this.reloj().hora;
    const u = this.vis.skyUniforms;
    const e = t >= 0.22 && t <= 0.78 ? Math.sin((Math.PI * (t - 0.22)) / 0.56) : -Math.min(1, Math.min(Math.abs(t - 0.22), Math.abs(t - 0.78), t + 0.22, 1.22 - t) * 4);
    const day = THREE.MathUtils.smoothstep(e, -0.08, 0.28);
    const warm = 1 - THREE.MathUtils.smoothstep(e, 0.05, 0.45);
    const az = Math.PI * Math.min(1, Math.max(0, (t - 0.22) / 0.56));
    const sunDir = new THREE.Vector3(Math.cos(az), Math.max(0.12, Math.sin(az) * 0.95), 0.42).normalize();
    const moonDir = new THREE.Vector3(-0.4, 0.8, -0.3).normalize();
    const dir = day > 0.15 ? sunDir : moonDir;
    u.sunDir.value.copy(sunDir);
    const { a, b, c } = this.skyTmp;
    a.set("#0d1534").lerp(b.set("#5d9bd6"), day);
    if (warm > 0 && day > 0.05) a.lerp(c.set("#e08a5c"), warm * 0.35 * day);
    u.top.value.copy(a);
    a.set("#26304f").lerp(b.set("#f1e3c2"), day);
    if (warm > 0 && day > 0.05) a.lerp(c.set("#ffb26b"), warm * 0.55 * day);
    u.horizon.value.copy(a);
    u.night.value = 1 - day;
    (this.scene.fog as THREE.Fog).color.copy(a);
    (this.vis.stars.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - day * 1.6);
    this.sun.color.set("#fff3d6").lerp(b.set("#ffb066"), warm * day).lerp(c.set("#9db4ff"), 1 - day);
    this.sun.intensity = 0.55 + 2.35 * day;
    this.hemi.color.set("#40507e").lerp(b.set("#cfe3ff"), day);
    this.hemi.groundColor.set("#2a2620").lerp(b.set("#b9a27a"), day);
    this.hemi.intensity = 0.75 + 0.6 * day;
    this.renderer.toneMappingExposure = 0.95 + 0.12 * day;
    const gx = Math.round(this.camTarget.x / 2) * 2, gz = Math.round(this.camTarget.z / 2) * 2;
    this.sun.target.position.set(gx, P.SUELO, gz);
    this.sun.position.set(gx + dir.x * 50, P.SUELO + dir.y * 50, gz + dir.z * 50);
    this.sun.target.updateMatrixWorld();
    const key = `${gx},${gz},${Math.round(dir.x * 60)},${Math.round(dir.y * 60)}`;
    if (key !== this.shadowKey) {
      this.shadowKey = key;
      this.shadowDirty = true;
    }
    this.vis.clouds.rotation.y += 0.00008;
  }

  private updateLabels(dt: number) {
    const r = this.player.rig;
    for (const z of this.zonas) {
      const u = z.ring.mat.uniforms;
      const near = Math.max(0, 1 - dist(r.x, r.z, z.x, z.z) / 9);
      u.uTime.value = this.time;
      u.uPulse.value += (Math.max(near, z.id === "casa" ? 0.6 : 0.25) - u.uPulse.value) * Math.min(1, dt * 4);
      u.uOpacity.value = 0.45 + 0.5 * u.uPulse.value;
    }
    for (const l of this.letreros) {
      if (dist(r.x, r.z, l.p.x, l.p.z) < l.r) this.overlay.place(l.el, l.p);
      else l.el.style.display = "none";
    }
    for (const e of this.etiquetasCasas) {
      const d = dist(r.x, r.z, e.p.x, e.p.z);
      if (d < (e.mia ? 30 : 7)) this.overlay.place(e.el, e.p);
      else e.el.style.display = "none";
    }
    // la flecha del borde señala tu casa cuando no se ve (la primera vez y desde lejos)
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const lejos = dist(r.x, r.z, casa.x, casa.z) > 16 && !gameStore.busy && this.time < 40 && this.opts.llegada === "templo";
    this.overlay.pointTo(lejos ? new THREE.Vector3(casa.x, P.SUELO + 1, casa.z) : null);
  }

  // ================================================================ marcador
  private lugar(): string {
    const r = this.player.rig;
    if (P.enEscalinata(r.x, r.z)) return "Escalinata del templo";
    const area = P.areaEn(r.x, r.z);
    if (area) return nombreDeBarrio(this.barrioDeArea(area));
    if (P.cercaDe(r.x, r.z, P.PLAZA, 0)) return r.x > 70 ? "La puerta de la ciudad" : "La plaza";
    if (P.cercaDe(r.x, r.z, P.PALACIO, 4)) return "El palacio del rey";
    if (P.cercaDe(r.x, r.z, P.ESCUELA, 4)) return "La escuela de los profetas";
    return "Las calles de Jerusalén";
  }

  private aviso(): string {
    const r = this.player.rig;
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    if (dist(r.x, r.z, P.ENTRADA_TEMPLO[0], P.ENTRADA_TEMPLO[1]) < 9) return "Sube por la escalinata para entrar al templo y servir";
    if (dist(r.x, r.z, casa.umbral[0], casa.umbral[1]) < 7) return "Párate en el círculo de tu puerta para entrar a tu casa";
    if (dist(r.x, r.z, P.ANUNCIOS[0], P.ANUNCIOS[1]) < 6) return "El púlpito de la plaza: los anuncios de la ciudad";
    if (dist(r.x, r.z, P.ANCIANOS[0], P.ANCIANOS[1]) < 6) return "Los ancianos de la ciudad están sentados a la puerta";
    const t = this.reloj().hora;
    const h = HOURS.findIndex(([a, b]) => t >= a && t < b);
    if (h >= 0) return `${HOURS[h][2]}: el pueblo sube al templo con sus ofrendas`;
    return "Entra al templo para servir: cada deber suma mérito y hace crecer tu casa";
  }

  private faseNombre(t: number) {
    const h = HOURS.findIndex(([a, b]) => t >= a && t < b);
    if (h >= 0) return HOURS[h][2];
    if (t < DAWN) return "Noche";
    if (t < 0.26) return "Amanecer";
    if (t < 0.45) return "Mañana";
    if (t < 0.6) return "Mediodía";
    if (t < DUSK - 0.04) return "Tarde";
    if (t <= DUSK) return "Anochecer";
    return "Noche";
  }

  private pushHud() {
    const e = this.estado;
    const t = this.reloj().hora;
    const fh = this.fiestaHoy();
    const f = fh?.fiesta;
    const hud: CiudadHud = {
      nombre: e.yo.nombre,
      escalon: e.yo.escalon,
      barrio: e.barrio.nombre,
      casa: e.yo.parcela + 1,
      nivel: e.yo.nivel,
      lugar: this.lugar(),
      aviso: this.aviso(),
      fecha: this.fecha.texto,
      fiesta: fh && f ? { id: f.id, nombre: f.nombre, icono: f.icono, dia: fh.dia, de: f.duracion, solemne: !!f.solemne, merito: f.merito } : null,
      hora: t,
      fase: this.faseNombre(t),
    };
    gameStore.setCiudad(hud);
  }

  // ================================================================ entrada
  private onPointerDown = (e: PointerEvent) => {
    this.audio.ensure();
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const rect = this.container.getBoundingClientRect();
    this.joy.on = true;
    this.joy.id = e.pointerId;
    this.joy.ox = e.clientX - rect.left;
    this.joy.oy = e.clientY - rect.top;
    this.joy.x = 0;
    this.joy.y = 0;
    this.overlay.joystick(true, this.joy.ox, this.joy.oy, this.joy.ox, this.joy.oy);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.joy.on || e.pointerId !== this.joy.id) return;
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    let dx = x - this.joy.ox, dy = y - this.joy.oy;
    const R = 52;
    const m = Math.hypot(dx, dy);
    if (m > R) {
      dx = (dx / m) * R;
      dy = (dy / m) * R;
    }
    const dead = 6;
    this.joy.x = m < dead ? 0 : dx / R;
    this.joy.y = m < dead ? 0 : -dy / R;
    this.overlay.joystick(true, this.joy.ox, this.joy.oy, this.joy.ox + dx, this.joy.oy + dy);
  };

  private onPointerUp = (e: PointerEvent) => {
    if (e.pointerId !== this.joy.id) return;
    this.joy.on = false;
    this.joy.x = this.joy.y = 0;
    this.overlay.joystick(false);
  };

  private onKeyDown = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(k)) {
      if (gameStore.busy) return;
      this.keys.add(k);
      this.audio.ensure();
      e.preventDefault();
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key.toLowerCase());
  };

  private onBlur = () => {
    this.keys.clear();
    this.joy.on = false;
    this.overlay.joystick(false);
  };

  private onVisibility = () => {
    if (document.hidden) this.audio.suspend();
    else {
      this.audio.resume();
      this.last = performance.now();
    }
  };

  // ================================================================ cierre
  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    const canvas = this.renderer.domElement;
    canvas.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerUp);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.resizeObs.disconnect();
    for (const z of this.zonas) z.ring.dispose();
    this.player.fig.dispose();
    this.crowd.dispose();
    this.shadows.dispose();
    this.items.dispose();
    this.fx.dispose();
    liberar(this.vis.root);
    this.overlay.dispose();
    gameStore.setCiudad(null);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }
}

