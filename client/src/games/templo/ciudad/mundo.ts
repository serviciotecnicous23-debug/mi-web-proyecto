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
import {
  BIEN, CONSEJOS_ANCIANOS, FRASE_CADA_MS, NIVELES_CASA, RED_TICK_MS, areaDeBarrio, fraseRapida, nombreDeBarrio, type Bien, type CasaPrivada, type CasaVista,
  type CiudadEstado, type VecinoInfo,
} from "@shared/ciudad";
import type { EscalonId } from "@shared/jerusalen";
import { RedCiudad, type EstadoRed } from "./red";
import { CAMINOS, MENSAJES, ORACION_SEGUNDOS, type Camino } from "@shared/caminos";
import { PUESTOS_MERCADO, coloresDeIds, type MercadoEstado } from "@shared/mercado";
import type { ReunionesEstado } from "@shared/reuniones";
import { ACTIVIDADES_CIUDAD, ACTIVIDAD_CIUDAD_TEXTO } from "@shared/ciudad";
import { Entrada, vibrar } from "../motor/entrada";
import { haciaElPiso } from "../motor/camara";
import * as P from "./plano";
import { buildCiudad, construirAreaDetalle, construirAreaSilueta, construirEnramadas, construirMuroCaido, liberar, type CasaDibujo, type CiudadVisual } from "./escenario";
import type { MuroEstado } from "@shared/muro";

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
  /** Pide entrar a tu casa por dentro (la ciudad se duerme mientras tanto). */
  alEntrarCasa?: () => void;
  /** Los deberes de los caminos nuevos van a la sesión en línea (se mandan juntos cada 15 s). */
  online?: { duty: (kind: string, n: number) => void; tick: (dt: number) => void };
  /** Avisa al servidor que se completó un paso de los primeros pasos del camino. */
  alPaso?: (parte: number) => Promise<boolean>;
};

/** Los primeros pasos de cada camino nuevo: qué deber completa cada paso. */
const PASOS_CAMINO: Record<"profecia" | "realeza", string[]> = { profecia: ["memoria", "oracion", "mensaje"], realeza: ["audiencia", "pan", "ley"] };
/** Donde esperan los pobres de la ciudad (junto a la puerta y en la plaza). */
const POBRES: V2[] = [[71.2, -9.6], [71.2, 9.6], [47.0, -10.4]];

/** Otro barrio que se ve: sus casas (de lejos, siluetas; al entrar en su área, completo). */
export type BarrioVisto = { n: number; area: number; casas: { parcela: number; nivel: number; personajeId?: number; nombre?: string; adornos?: string[]; letrero?: string | null }[]; detalle: boolean };

type ZonaId = "templo" | "casa" | "anuncios" | "ancianos" | "palacio" | "escuela" | "mercado" | "puesto0" | "puesto1" | "puesto2" | "puesto3";
type Zona = { id: ZonaId; x: number; z: number; r: number; ring: Ring; inside: boolean };

/** Un vecino que se ve: su figura (con la vestidura de su escalón), adónde va y su letrero. */
type Vecino = {
  id: number;
  fig: Figure;
  look: FigureLook;
  rig: Rig;
  /** Dónde está, hacia dónde mira, si anda y qué hace (índice de ACTIVIDADES_CIUDAD). */
  obj: { x: number; z: number; ry: number; m: number; a?: number };
  etiqueta: HTMLDivElement;
  burbuja: HTMLDivElement | null;
  burbujaHasta: number;
};

/** Un vecino para la lista de la pantalla. */
export type VecinoVisto = { id: number; nombre: string; escalon: EscalonId; barrio: number; casa: number; u: number; distancia: number };

type Npc = {
  handle: CrowdHandle;
  rig: Rig;
  path: V2[];
  speed: number;
  wait: number;
  kind: "paseo" | "anciano" | "nino" | "guardia" | "alumno" | "peregrino" | "siervo" | "mercader";
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
  private etiquetasCasas: { el: HTMLDivElement; p: THREE.Vector3; mia: boolean; reunion?: boolean }[] = [];
  /** Las reuniones de ahora (clave «barrio:parcela»): su etiqueta y un círculo violeta en la puerta. */
  private reuniones = new Map<string, { id: number; anfitrion: string; titulo: string; ring: Ring | null }>();
  private reunionesVistas = new Set<number>();
  private reunionesT = 27;
  /** El muro caído: su dibujo (se rehace al cambiar) y lo último que se vio. */
  private muroGrupo: THREE.Group | null = null;
  private muroClave = "";
  private muroConstruidos = -1;
  private muroT = 59;
  // la presencia de los vecinos (WebSocket)
  private red!: RedCiudad;
  private redEstado: EstadoRed = "conectando";
  private infos = new Map<number, VecinoInfo>();
  private vecinos = new Map<number, Vecino>();
  private ocultos = new Set<number>();
  private envioT = 0;
  private ultimoEnvio = { x: 0, z: 0, ry: 0, t: 0, a: 0 };
  private frasesRecientes: { id: number; nombre: string; texto: string; hasta: number }[] = [];
  private fraseSeq = 0;
  private miBurbuja: { el: HTMLDivElement; hasta: number } | null = null;
  private ultimaFrase = 0;
  // los caminos nuevos: el mensaje que lleva el profeta, el pan del siervo del rey y la oración en el monte
  private mensaje: { x: number; z: number; text: string; ref: string; ring: Ring } | null = null;
  private panesQueLleva = 0;
  private oracionT = 0;
  private oracionEspera = 0;
  private pobres: { at: V2; label: HTMLDivElement; espera: number }[] = [];
  /** Las etiquetas de los cuatro mercaderes de la plaza. */
  private mercaderes: { el: HTMLDivElement; p: THREE.Vector3 }[] = [];
  private pasos = 0;
  // tus siervos (solo los ves tú) y la casa del vecino que se visita
  private siervos: Npc[] = [];
  private visitaParcela: string | null = null;

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

  // entrada (toques, ratón y teclado: motor/entrada.ts) y el camino al punto tocado
  private entrada!: Entrada;
  private ruta: V2[] = [];
  private rutaAtasco = 0;
  private marca: Ring | null = null;
  private marcaT = 0;

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
    const look = this.lookDe(estado.yo.escalon, estado.yo.camino);
    const pf = new Figure(look);
    pf.setRopa(estado.yo.ropa);
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

    this.entrada = new Entrada(container, canvas, this.overlay, { ocupado: () => gameStore.busy, alPrimerToque: () => this.audio.ensure() });
    this.marca = new Ring(0.55, "#ffffff", false);
    this.marca.mesh.visible = false;
    this.scene.add(this.marca.mesh);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();

    const yo = estado.yo;
    const pv = estado.privada;
    if (pv.recogido) {
      const partes = (Object.keys(pv.recogido) as Bien[]).filter((b) => pv.recogido![b] > 0).map((b) => `${pv.recogido![b]} de ${BIEN[b].nombre.toLowerCase()}`);
      if (partes.length) gameStore.toast(`Mientras no estabas, tus siervos prepararon ${partes.join(", ")}`, "gold");
    }
    if (pv.nuevasBendiciones.length) {
      const n = pv.nuevasBendiciones;
      gameStore.toast(`${n.slice(0, 2).join(" y ")}${n.length > 2 ? ` y ${n.length - 2} más` : ""} ${n.length === 1 ? "dejó" : "dejaron"} una bendición en tu casa`, "gold");
    }
    if (yo.subio !== null) gameStore.toast(`¡Tu casa creció! Ahora es ${NIVELES_CASA[yo.subio].nombre.toLowerCase()}`, "gold");
    else if (opts.llegada === "templo") gameStore.toast(`Jerusalén: tu casa está en ${estado.barrio.nombre}, casa ${yo.parcela + 1}`, "info");
    const hoy = this.fiestaHoy();
    if (hoy) gameStore.toast(`${hoy.fiesta.icono} Hoy en Jerusalén: ${hoy.fiesta.nombre}`, hoy.fiesta.solemne ? "info" : "gold");
    this.red = new RedCiudad({
      onInfo: (v) => this.alInfo(v),
      onVecinos: (l) => this.alVecinos(l),
      onFrase: (de, id) => this.alFrase(de, id),
      onBarrio: (n, casas) => this.alBarrio(n, casas),
      onFuera: (motivo) => gameStore.toast(motivo, "warn"),
      onEstado: (e) => {
        this.redEstado = e;
        // al conectarse, se manda la posición enseguida
        if (e === "conectado") this.ultimoEnvio.t = 0;
      },
    });
    this.red.conectar();
    this.pasos = estado.yo.pasos ?? 0;
    // el guía del camino recibe al nuevo
    if (estado.yo.camino !== "sacerdocio" && this.pasos < 3 && opts.llegada === "casa") {
      const guia = estado.yo.camino === "profecia" ? "Isaías hijo de Amoz" : "Eliaquim hijo de Hilcías, mayordomo del palacio";
      const lugar = CAMINOS[estado.yo.camino].lugar;
      gameStore.push({
        kind: "dialog",
        id: "camino:inicio",
        lines: [
          { quien: "narrador", texto: `${guia} te recibe en Jerusalén: «Bienvenido, ${estado.yo.nombre}. Tu servicio está en ${lugar}.»` },
          {
            quien: "narrador",
            texto:
              estado.yo.camino === "profecia"
                ? "«El profeta escucha a Dios, guarda su Palabra y la lleva al pueblo con amor. Ven a la escuela: te enseñaré tus primeros pasos.»"
                : "«El siervo del rey juzga con verdad, cuida a los pobres y guarda la ley. Ven al palacio: te enseñaré tus primeros pasos.»",
          },
        ],
      });
    }
    this.pushHud();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  // ================================================================ vecinos (presencia)
  private alInfo(v: VecinoInfo) {
    const antes = this.infos.get(v.id);
    this.infos.set(v.id, v);
    const vec = this.vecinos.get(v.id);
    if (!vec) return;
    vec.etiqueta.textContent = v.nombre;
    if (!antes || antes.escalon !== v.escalon || antes.camino !== v.camino) {
      const look = this.lookDe(v.escalon, v.camino);
      if (look !== vec.look) {
        vec.fig.setLook(look);
        vec.look = look;
      }
    }
    vec.fig.setRopa(v.ropa);
  }

  private lookDe(e: EscalonId | undefined, camino?: Camino): FigureLook {
    if (camino === "profecia") return "profeta";
    if (camino === "realeza") return "oficial";
    return RANK_LOOK[Math.max(1, Math.min(4, escalonRank(e ?? "sacerdote")))];
  }

  private alVecinos(l: [number, number, number, number, number, number?][]) {
    const vistos = new Set<number>();
    for (const [id, x, z, ry, m, a] of l) {
      if (this.ocultos.has(id)) continue;
      vistos.add(id);
      const v = this.vecinos.get(id) ?? this.crearVecino(id, x, z, ry);
      v.obj.x = x;
      v.obj.z = z;
      v.obj.ry = ry;
      v.obj.m = m;
      v.obj.a = a ?? 0;
    }
    for (const id of [...this.vecinos.keys()]) if (!vistos.has(id)) this.quitarVecino(id);
    // quien dejó de venir en las listas ya no está oculto (por si se desbloquea)
    for (const id of [...this.ocultos]) if (!l.some((x) => x[0] === id)) this.ocultos.delete(id);
  }

  private crearVecino(id: number, x: number, z: number, ry: number): Vecino {
    const info = this.infos.get(id);
    const look = this.lookDe(info?.escalon, info?.camino);
    const fig = new Figure(look);
    fig.setRopa(info?.ropa);
    this.scene.add(fig.root);
    const rig = newRig(x, z);
    rig.y = P.alturaCiudad(x, z);
    rig.yaw = ry;
    // el nombre lo escribió una persona: va como texto, nunca como HTML
    const etiqueta = this.overlay.make("tpl-tag");
    etiqueta.textContent = info?.nombre ?? "Vecino";
    etiqueta.style.display = "none";
    const v: Vecino = { id, fig, look, rig, obj: { x, z, ry, m: 0 }, etiqueta, burbuja: null, burbujaHasta: 0 };
    this.vecinos.set(id, v);
    return v;
  }

  private quitarVecino(id: number) {
    const v = this.vecinos.get(id);
    if (!v) return;
    this.scene.remove(v.fig.root);
    v.fig.dispose();
    this.overlay.remove(v.etiqueta);
    this.overlay.remove(v.burbuja);
    this.vecinos.delete(id);
  }

  private textoDeFrase(id: string): string | null {
    const f = fraseRapida(id);
    if (!f) return null;
    return f.ref ? `«${f.texto}» ${f.ref}` : f.texto;
  }

  private alFrase(de: number, id: string) {
    const texto = this.textoDeFrase(id);
    if (!texto) return;
    const largo = !!fraseRapida(id)?.ref;
    const nombre = this.infos.get(de)?.nombre ?? "Un vecino";
    const v = this.vecinos.get(de);
    if (v) {
      if (!v.burbuja) v.burbuja = this.overlay.make("tpl-frase");
      v.burbuja.textContent = texto;
      v.burbujaHasta = performance.now() + (largo ? 7000 : 4500);
    }
    this.frasesRecientes.push({ id: ++this.fraseSeq, nombre, texto, hasta: performance.now() + (largo ? 8000 : 6000) });
    if (this.frasesRecientes.length > 3) this.frasesRecientes.shift();
    this.audio.blip("narrador");
  }

  private alBarrio(n: number, casas: CasaVista[]) {
    if (n !== this.estado.barrio.n) return;
    const mia = casas.find((c) => c.esMia);
    this.estado = {
      ...this.estado,
      yo: mia && mia.nivel > this.estado.yo.nivel ? { ...this.estado.yo, nivel: mia.nivel } : this.estado.yo,
      barrio: { ...this.estado.barrio, casas, libres: Math.max(0, 40 - casas.length) },
    };
    this.barrios.set(n, { n, area: this.estado.barrio.area, casas, detalle: true });
    this.dibujarAreas();
  }

  /** Decir una frase rápida o un versículo (la oyen los vecinos que te ven). */
  decir(id: string): boolean {
    const texto = this.textoDeFrase(id);
    const now = performance.now();
    if (!texto || now - this.ultimaFrase < FRASE_CADA_MS) return false;
    this.ultimaFrase = now;
    this.red.enviar({ t: "frase", id });
    vibrar(10);
    if (!this.miBurbuja) this.miBurbuja = { el: this.overlay.make("tpl-frase mia"), hasta: 0 };
    this.miBurbuja.el.textContent = texto;
    this.miBurbuja.hasta = now + (fraseRapida(id)?.ref ? 7000 : 4500);
    this.audio.click();
    return true;
  }

  /** Los vecinos que se ven ahora, del más cercano al más lejano. */
  listaVecinos(): VecinoVisto[] {
    const r = this.player.rig;
    return [...this.vecinos.values()]
      .map((v) => {
        const i = this.infos.get(v.id);
        return {
          id: v.id,
          nombre: i?.nombre ?? "Vecino",
          escalon: i?.escalon ?? "sacerdote",
          barrio: i?.barrio ?? 0,
          casa: i?.casa ?? 0,
          u: i?.u ?? 0,
          distancia: dist(r.x, r.z, v.rig.x, v.rig.z),
        };
      })
      .sort((a, b) => a.distancia - b.distancia);
  }

  /** Datos de un vecino (aunque ya no se vea). */
  vecinoInfo(id: number): VecinoInfo | null {
    return this.infos.get(id) ?? null;
  }

  /** Después de bloquear: deja de verse ya (el servidor tampoco lo manda más). */
  ocultarVecino(id: number) {
    this.ocultos.add(id);
    this.quitarVecino(id);
  }

  /** Cómo va la conexión con los vecinos. */
  get estadoRed(): EstadoRed {
    return this.redEstado;
  }

  private enviarPosicion(dt: number) {
    this.envioT += dt;
    if (this.envioT < RED_TICK_MS / 1000) return;
    this.envioT = 0;
    const r = this.player.rig;
    const u = this.ultimoEnvio;
    const now = performance.now();
    const a = this.actividad();
    const movio = Math.hypot(r.x - u.x, r.z - u.z) > 0.05 || Math.abs(r.yaw - u.ry) > 0.08 || a !== u.a;
    if (!movio && now - u.t < 4000) return;
    this.red.enviar({ t: "pos", x: Math.round(r.x * 100) / 100, z: Math.round(r.z * 100) / 100, ry: Math.round(r.yaw * 100) / 100, m: r.moving > 0.3 ? 1 : 0, a });
    u.x = r.x;
    u.z = r.z;
    u.ry = r.yaw;
    u.t = now;
    u.a = a;
  }

  /** Lo que estoy haciendo (índice de ACTIVIDADES_CIUDAD): lo ven los vecinos junto a mi nombre. */
  private actividad(): number {
    const m = gameStore.getSnapshot().modal;
    if (m?.kind === "mercado") return 1;
    if (m?.kind === "casa") return 2;
    if (m?.kind === "estudios") return 3;
    if (m?.kind === "escuela") return 4;
    if (m?.kind === "palacio") return 5;
    if (this.oracionT > 0) return 6;
    if (this.panesQueLleva > 0) return 7;
    if (this.mensaje) return 8;
    return 0;
  }

  private animarVecinos(dt: number) {
    for (const v of this.vecinos.values()) {
      const r = v.rig;
      const dx = v.obj.x - r.x, dz = v.obj.z - r.z;
      const d = Math.hypot(dx, dz);
      if (d > 10) {
        // se fue lejos de golpe (por ejemplo con «Ir a…»)
        r.x = v.obj.x;
        r.z = v.obj.z;
      } else {
        const k = Math.min(1, dt * 9);
        r.x += dx * k;
        r.z += dz * k;
        r.phase += d * k * 7.2;
      }
      const anda = v.obj.m || d > 0.12 ? Math.min(1, 0.5 + d) : 0;
      r.moving += (anda - r.moving) * Math.min(1, dt * 8);
      r.yaw = turn(r.yaw, v.obj.ry, dt * 10);
      r.y = P.alturaCiudad(r.x, r.z);
      r.t += dt;
      v.fig.update(r);
      this.shadows.add(r.x, r.y, r.z, 1.05);
    }
  }

  private letrerosDeVecinos(now: number) {
    const r = this.player.rig;
    for (const v of this.vecinos.values()) {
      const cabeza = new THREE.Vector3(v.rig.x, v.rig.y + 1.95, v.rig.z);
      const cerca = dist(r.x, r.z, v.rig.x, v.rig.z) < 16;
      if (cerca) {
        // el nombre y lo que está haciendo (el nombre lo escribió una persona: siempre como texto)
        const info = this.infos.get(v.id);
        const icono = ACTIVIDADES_CIUDAD[v.obj.a ?? 0] ?? "";
        const texto = `${info?.nombre ?? "Vecino"}${icono ? ` ${icono}` : ""}`;
        if (v.etiqueta.textContent !== texto) {
          v.etiqueta.textContent = texto;
          v.etiqueta.title = icono ? ACTIVIDAD_CIUDAD_TEXTO[v.obj.a ?? 0] : "";
        }
        this.overlay.place(v.etiqueta, cabeza);
      } else v.etiqueta.style.display = "none";
      if (v.burbuja) {
        if (now < v.burbujaHasta) this.overlay.place(v.burbuja, cabeza.clone().add(new THREE.Vector3(0, 0.62, 0)));
        else {
          this.overlay.remove(v.burbuja);
          v.burbuja = null;
        }
      }
    }
    if (this.miBurbuja) {
      if (now < this.miBurbuja.hasta) this.overlay.place(this.miBurbuja.el, new THREE.Vector3(r.x, r.y + 2.4, r.z));
      else this.miBurbuja.el.style.display = "none";
    }
    this.frasesRecientes = this.frasesRecientes.filter((f) => f.hasta > now);
  }

  /** El vecino más cercano, si está a un par de pasos. */
  private vecinoCerca(): { id: number; nombre: string } | null {
    const r = this.player.rig;
    let best: Vecino | null = null;
    let bd = 2.6;
    for (const v of this.vecinos.values()) {
      const d = dist(r.x, r.z, v.rig.x, v.rig.z);
      if (d < bd) {
        bd = d;
        best = v;
      }
    }
    return best ? { id: best.id, nombre: this.infos.get(best.id)?.nombre ?? "Vecino" } : null;
  }

  // ================================================================ caminos nuevos (escuela y palacio)
  /** Pasos hechos de los primeros pasos del camino (0 a 3). */
  get partesCamino(): number {
    return this.pasos;
  }

  /** ¿Lleva un mensaje para entregar? */
  get mensajeEnCurso(): boolean {
    return !!this.mensaje;
  }

  /** Panes que lleva para los pobres. */
  get panes(): number {
    return this.panesQueLleva;
  }

  /** Un deber del camino (va a la sesión en línea) y, si toca, el paso siguiente de los primeros pasos. */
  deber(kind: string, n = 1) {
    this.opts.online?.duty(kind, n);
    vibrar(15);
    this.audio.correct();
    const c = this.estado.yo.camino;
    if (c === "sacerdocio" || this.pasos >= 3) return;
    if (PASOS_CAMINO[c][this.pasos] !== kind) return;
    const parte = this.pasos + 1;
    this.pasos = parte;
    void this.opts.alPaso?.(parte);
    gameStore.toast(parte >= 3 ? "¡Completaste tus primeros pasos! (+50 de mérito)" : `Primer paso ${parte} de 3 cumplido`, "gold");
    this.pushHud();
  }

  /** El profeta toma un mensaje en la escuela: se marca una casa de la ciudad para llevarlo. */
  tomarMensaje() {
    if (this.mensaje) return;
    const barrio = 1 + Math.floor(Math.random() * 4);
    const casa = P.parcelaDe(barrio, Math.floor(Math.random() * 40));
    const m = MENSAJES[Math.floor(Math.random() * MENSAJES.length)];
    const ring = new Ring(0.9, "#ffd25a", false);
    ring.set(casa.umbral[0], P.alturaCiudad(casa.umbral[0], casa.umbral[1]), casa.umbral[1]);
    this.scene.add(ring.mesh);
    this.mensaje = { x: casa.umbral[0], z: casa.umbral[1], text: m.text, ref: m.ref, ring };
    gameStore.toast(`Isaías: «Lleva este mensaje a la casa marcada en ${nombreDeBarrio(barrio)}»`, "info");
    this.pushHud();
  }

  /** El siervo del rey toma pan del palacio para los pobres (hasta 3). */
  tomarPan() {
    this.panesQueLleva = 3;
    this.player.rig.carrying = true;
    gameStore.toast("Eliaquim: «Lleva este pan a los pobres que esperan junto a la puerta y en la plaza»", "info");
    this.pushHud();
  }

  private crearPobres() {
    if (this.estado.yo.camino !== "realeza" || this.pobres.length) return;
    for (const at of POBRES) {
      const n = this.npc("paseo", at, { yaw: Math.PI / 2, sit: true });
      if (n) n.wait = 1e9;
      const label = this.overlay.make("tpl-tag");
      label.textContent = "🙏";
      this.pobres.push({ at, label, espera: 0 });
    }
  }

  private updateCaminos(dt: number) {
    const c = this.estado.yo.camino;
    if (c === "sacerdocio") return;
    const r = this.player.rig;
    // el mensaje: se entrega al llegar a la puerta marcada
    // (aunque se abra la visita de esa casa: el mensaje se entrega al llegar a su puerta)
    if (this.mensaje && dist(r.x, r.z, this.mensaje.x, this.mensaje.z) < 1.6) {
      const m = this.mensaje;
      this.scene.remove(m.ring.mesh);
      m.ring.dispose();
      this.mensaje = null;
      this.fx.sparkle(new THREE.Vector3(r.x, r.y + 1.2, r.z), 20, 0.5);
      gameStore.toast(`Entregaste el mensaje: «${m.text}» (${m.ref})`, "gold");
      this.deber("mensaje");
    }
    // la oración en el monte (solo el profeta)
    if (c === "profecia") {
      if (this.oracionEspera > 0) this.oracionEspera -= dt;
      const enMonte = r.x > P.MONTE_ORACION[0] && r.x < P.MONTE_ORACION[2] && r.z > P.MONTE_ORACION[1] && r.z < P.MONTE_ORACION[3];
      const quieto = Math.hypot(this.player.vx, this.player.vz) < 0.3;
      if (enMonte && quieto && this.oracionEspera <= 0 && !gameStore.busy) {
        this.oracionT += dt;
        if (this.oracionT >= ORACION_SEGUNDOS) {
          this.oracionT = 0;
          this.oracionEspera = 20;
          this.fx.sparkle(new THREE.Vector3(r.x, r.y + 1.8, r.z), 26, 0.6);
          gameStore.toast("Oraste en el monte de la oración · +2 de mérito", "gold");
          this.deber("oracion");
        }
      } else if (!enMonte || !quieto) this.oracionT = 0;
    }
    // el pan para los pobres (solo el siervo del rey)
    if (c === "realeza") {
      this.crearPobres();
      for (const p of this.pobres) {
        if (p.espera > 0) p.espera -= dt;
        const cabeza = new THREE.Vector3(p.at[0], P.alturaCiudad(p.at[0], p.at[1]) + 1.7, p.at[1]);
        if (dist(r.x, r.z, p.at[0], p.at[1]) < 16) this.overlay.place(p.label, cabeza);
        else p.label.style.display = "none";
        if (this.panesQueLleva > 0 && p.espera <= 0 && dist(r.x, r.z, p.at[0], p.at[1]) < 1.8 && !gameStore.busy) {
          this.panesQueLleva--;
          p.espera = 25;
          if (!this.panesQueLleva) r.carrying = false;
          this.fx.sparkle(cabeza, 14, 0.4);
          gameStore.toast("Diste pan a un pobre: «El ojo misericordioso será bendito» (Proverbios 22:9) · +2", "gold");
          this.deber("pan");
        }
      }
    }
  }

  /** El aviso de los caminos nuevos (lo que toca hacer ahora), o null. */
  private avisoCamino(): string | null {
    const c = this.estado.yo.camino;
    if (c === "sacerdocio") return null;
    if (this.mensaje) return `Lleva el mensaje a la casa marcada con el círculo dorado`;
    if (this.panesQueLleva) return `Llevas ${this.panesQueLleva} ${this.panesQueLleva === 1 ? "pan" : "panes"}: dáselos a los pobres (🙏) de la puerta y la plaza`;
    if (c === "profecia" && this.oracionT > 0) return `Orando en el monte… ${Math.ceil(ORACION_SEGUNDOS - this.oracionT)} s`;
    if (this.pasos < 3) {
      const t =
        c === "profecia"
          ? ["Ve a la escuela de los profetas y memoriza un versículo", "Ora en el monte de la oración, al sur de la escuela (quédate quieto)", "Toma un mensaje en la escuela y llévalo a la casa marcada"]
          : ["Ve al palacio del rey y atiende una audiencia", "Toma pan en el palacio y dáselo a un pobre de la ciudad", "Copia la ley en el palacio"];
      return `Primeros pasos ${this.pasos + 1}/3: ${t[this.pasos]}`;
    }
    return c === "profecia" ? "Sirve como profeta: memoriza en la escuela, ora en el monte y lleva mensajes" : "Sirve al rey: audiencias, pan para los pobres y la copia de la ley";
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
    this.player.fig.setRopa(estado.yo.ropa);
    const firma = (l: BarrioVisto["casas"]) => JSON.stringify(l.map((c) => [c.parcela, c.nivel, c.adornos ?? [], c.letrero ?? null]));
    const cambio = !antes || firma(antes.casas) !== firma(estado.barrio.casas);
    this.barrios.set(estado.barrio.n, { n: estado.barrio.n, area: estado.barrio.area, casas: estado.barrio.casas, detalle: true });
    if (cambio) this.dibujarAreas();
    this.pushHud();
  }

  /** Lleva al aprendiz a un lugar de la ciudad (con «Ir a…»). */
  irA(lugar: "casa" | "templo" | "plaza" | "mercado" | "puerta" | "palacio" | "escuela") {
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const destinos: Record<typeof lugar, [V2, number]> = {
      casa: [casa.umbral, casa.dir === 1 ? 0 : Math.PI],
      templo: [P.LLEGADA_TEMPLO, -Math.PI / 2],
      plaza: [[54, 0], -Math.PI / 2],
      // frente al sembrador (el primer puesto), fuera de su círculo, mirando al puesto
      mercado: [[P.PUESTOS[0][0], P.PUESTOS[0][1] - 3.8], 0],
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
    this.ruta = [];
    // el círculo donde aparece no se dispara solo
    for (const zn of this.zonas) zn.inside = dist(x, z, zn.x, zn.z) < zn.r;
    this.camTarget.set(x, r.y, z);
    this.shadowDirty = true;
    this.ultimoEnvio.t = 0;
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
    this.opts.online?.tick(dt);
    this.enviarPosicion(dt);
    this.updateZonas();
    this.updateCaminos(dt);
    this.updateGente(dt);
    this.slowT += dt;
    if (this.slowT > 0.5) {
      this.slowT = 0;
      this.mirarAreas();
    }
    // las reuniones en las casas: cada 30 s se mira cuáles hay
    this.reunionesT += dt;
    if (this.reunionesT > 30) {
      this.reunionesT = 0;
      void this.mirarReuniones();
    }
    for (const r of this.reuniones.values()) if (r.ring) r.ring.mat.uniforms.uTime.value = this.time;
    // el muro caído: cada minuto se mira cuánto se levantó
    this.muroT += dt;
    if (this.muroT > 60) {
      this.muroT = 0;
      void this.mirarMuro();
    }
  }

  /** El muro caído al norte de la puerta: se redibuja cuando crece, y avisa cuando se levanta un tramo. */
  private async mirarMuro() {
    const res = await fetch("/api/jerusalen/muro", { credentials: "include", cache: "no-store" }).catch(() => null);
    if (!res?.ok || !this.running) return;
    const m = (await res.json().catch(() => null)) as MuroEstado | null;
    if (!m || !this.running) return;
    if (this.muroConstruidos >= 0 && m.construidos > this.muroConstruidos) {
      gameStore.toast(`🧱 ¡Se levantó el tramo ${m.construidos} del muro! Cada deber pone una piedra en el siguiente.`, "gold");
      this.audio.trumpet();
    }
    this.muroConstruidos = m.construidos;
    // se redibuja por tramos y de a décimos de avance (no en cada piedra)
    const clave = `${m.construidos}:${Math.floor((m.progreso / m.meta) * 10)}`;
    if (clave === this.muroClave) return;
    this.muroClave = clave;
    if (this.muroGrupo) {
      this.vis.root.remove(this.muroGrupo);
      liberar(this.muroGrupo);
    }
    this.muroGrupo = construirMuroCaido(m.construidos, m.progreso / m.meta);
    this.vis.root.add(this.muroGrupo);
    this.shadowDirty = true;
  }

  /** Las reuniones de ahora: etiqueta y círculo en cada casa abierta, y un aviso cuando abre una de tu barrio. */
  private async mirarReuniones() {
    const res = await fetch("/api/jerusalen/reuniones", { credentials: "include", cache: "no-store" }).catch(() => null);
    if (!res?.ok || !this.running) return;
    const d = (await res.json().catch(() => null)) as ReunionesEstado | null;
    if (!d || !this.running) return;
    const ahora = new Map<string, { id: number; anfitrion: string; titulo: string; barrio: number; parcela: number }>();
    for (const r of d.activas) if (r.faltan > 0) ahora.set(`${r.barrio}:${r.parcela}`, r);
    let cambio = false;
    for (const [k, v] of this.reuniones) {
      if (ahora.has(k)) continue;
      if (v.ring) {
        this.scene.remove(v.ring.mesh);
        v.ring.dispose();
      }
      this.reuniones.delete(k);
      cambio = true;
    }
    for (const [k, r] of ahora) {
      if (this.reuniones.has(k)) continue;
      const p = P.parcelaDe(r.barrio, r.parcela);
      const ring = new Ring(0.85, "#b98cff", false);
      ring.set(p.umbral[0], P.alturaCiudad(p.umbral[0], p.umbral[1]), p.umbral[1]);
      ring.mat.uniforms.uOpacity.value = 0.85;
      this.scene.add(ring.mesh);
      this.reuniones.set(k, { id: r.id, anfitrion: r.anfitrion, titulo: r.titulo, ring });
      cambio = true;
      // un vecino de tu barrio acaba de abrir su casa (se avisa una vez, y no al entrar a la ciudad)
      if (!this.reunionesVistas.has(r.id)) {
        this.reunionesVistas.add(r.id);
        if (r.barrio === this.estado.barrio.n && this.time > 5) {
          gameStore.toast(`📖 ${r.anfitrion} abrió su casa para estudiar «${r.titulo}». Ve a su puerta (círculo violeta).`, "gold");
        }
      }
    }
    if (cambio) this.crearEtiquetasCasas();
  }

  /** Lleva a la puerta de la casa de un vecino (para ir a su reunión): al llegar se abre la visita. */
  irACasaDe(barrio: number, parcela: number) {
    const p = P.parcelaDe(barrio, parcela);
    const [x, z] = p.umbral;
    const r = this.player.rig;
    r.x = x;
    r.z = z;
    r.y = P.alturaCiudad(x, z);
    r.yaw = p.dir === 1 ? Math.PI : 0;
    this.player.vx = this.player.vz = 0;
    this.ruta = [];
    for (const zn of this.zonas) zn.inside = dist(x, z, zn.x, zn.z) < zn.r;
    this.visitaParcela = null;
    this.camTarget.set(x, r.y, z);
    this.shadowDirty = true;
    this.ultimoEnvio.t = 0;
    this.audio.page();
  }

  // ---------------------------------------------------------------- el aprendiz
  /** Un toque corto en el piso: el aprendiz va caminando solo hasta ahí (por el camino más corto). */
  private irAlToque() {
    const t = this.entrada.tomarToque();
    if (!t) return;
    const r = this.player.rig;
    const u = t.x / this.w, v = t.y / this.h;
    let p = haciaElPiso(this.camera, u, v, P.SUELO);
    if (!p) return;
    // segunda vuelta con la altura del piso tocado (el monte y la escalinata están más arriba)
    p = haciaElPiso(this.camera, u, v, P.alturaCiudad(p[0], p[1])) ?? p;
    let [x, z] = p;
    if (!P.caminable(x, z)) return;
    [x, z] = collide(x, z, PLAYER_R, this.rects, this.circles);
    this.ruta = this.nav.path(r.x, r.z, x, z);
    this.rutaAtasco = 0;
    if (this.marca) {
      this.marca.set(x, P.alturaCiudad(x, z), z);
      this.marca.mesh.visible = true;
      this.marcaT = 0.9;
    }
  }

  private movePlayer(dt: number) {
    const p = this.player;
    const r = p.rig;
    this.irAlToque();
    const [ix, iy] = this.entrada.vector();
    let dx = 0, dz = 0;
    if (Math.hypot(ix, iy) > 0.01) {
      // el joystick o el teclado mandan (y cortan el camino al punto tocado)
      this.ruta = [];
      const th = 0.36;
      const fx = -Math.cos(th), fz = -Math.sin(th);
      const rx = -fz, rz = fx;
      dx = rx * ix + fx * iy;
      dz = rz * ix + fz * iy;
    } else if (this.ruta.length) {
      const [tx, tz] = this.ruta[0];
      const ex = tx - r.x, ez = tz - r.z;
      const d = Math.hypot(ex, ez);
      if (d < 0.3) this.ruta.shift();
      else {
        dx = ex / d;
        dz = ez / d;
      }
      this.rutaAtasco = Math.hypot(p.vx, p.vz) < 0.4 ? this.rutaAtasco + dt : 0;
      if (this.rutaAtasco > 1.2) this.ruta = [];
    }
    if (this.marca && this.marcaT > 0) {
      this.marcaT -= dt;
      if (this.marcaT <= 0 || !this.ruta.length) this.marca.mesh.visible = false;
    }
    // la ciudad es grande: un poco más rápido que en el templo, y se puede correr
    const sp = 5.6 * (this.entrada.corre ? 1.3 : 1);
    const k = Math.min(1, dt * 14);
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
      // delante de cada puesto: su mercader
      ...P.PUESTOS.map(([x, z], i) => [`puesto${i}` as ZonaId, [x, z - 1.75] as V2, 0.75, "#f0b45a"] as [ZonaId, V2, number, string]),
    ];
    for (const [id, [x, z], r, color] of def) {
      const ring = new Ring(r, color, false);
      ring.set(x, P.alturaCiudad(x, z), z);
      this.scene.add(ring.mesh);
      const pr = this.player.rig;
      this.zonas.push({ id, x, z, r, ring, inside: dist(pr.x, pr.z, x, z) < r });
    }
  }

  /** La casa del vecino en cuyo umbral está parado (para visitarla). */
  private visitaCerca(): { personajeId: number; nombre: string; clave: string } | null {
    const r = this.player.rig;
    const area = P.areaEn(r.x, r.z);
    if (!area) return null;
    const n = this.barrioDeArea(area);
    const b = this.barrios.get(n);
    if (!b?.detalle) return null;
    const p = P.cercaDeUmbral(r.x, r.z, n, 0.75);
    if (!p) return null;
    const c = b.casas.find((x) => x.parcela === p.n);
    if (!c || c.personajeId === undefined || c.personajeId === this.estado.yo.personajeId) return null;
    return { personajeId: c.personajeId, nombre: c.nombre ?? "un vecino", clave: `${n}:${p.n}` };
  }

  private updateZonas() {
    const r = this.player.rig;
    const v = this.visitaCerca();
    if (v && v.clave !== this.visitaParcela && !gameStore.busy) {
      this.audio.page();
      this.abrir({ kind: "visita", personajeId: v.personajeId, nombre: v.nombre });
    }
    this.visitaParcela = v?.clave ?? null;
    for (const z of this.zonas) {
      const inside = dist(r.x, r.z, z.x, z.z) < z.r;
      const entered = inside && !z.inside;
      z.inside = inside;
      if (!entered || gameStore.busy) continue;
      this.audio.page();
      switch (z.id) {
        case "templo":
          if (this.estado.yo.camino !== "sacerdocio") {
            gameStore.toast(`Solo los sacerdotes sirven dentro del templo. Tu servicio está en ${CAMINOS[this.estado.yo.camino].lugar}.`, "info");
            break;
          }
          if (!this.entrando) {
            this.entrando = true;
            this.audio.trumpet();
            this.opts.alTemplo();
          }
          break;
        case "casa":
          // la puerta de tu casa: se entra (lo demás de la casa está en «Huerto, horno y más» adentro)
          if (this.opts.alEntrarCasa) {
            this.entrada.soltar();
            this.ruta = [];
            vibrar(12);
            this.opts.alEntrarCasa();
          } else this.abrir({ kind: "casa" });
          break;
        case "anuncios":
          this.abrir({ kind: "anuncios" });
          break;
        case "ancianos":
          this.consejo = (this.consejo + 1) % CONSEJOS_ANCIANOS.length;
          this.abrir({ kind: "ancianos", n: this.consejo });
          break;
        case "escuela":
          // la escuela de los profetas: los profetas tienen su servicio; los demás, los estudios
          this.abrir(this.estado.yo.camino === "profecia" ? { kind: "escuela" } : { kind: "estudios" });
          break;
        case "palacio":
          this.abrir(this.estado.yo.camino === "realeza" ? { kind: "palacio" } : { kind: "edificio", id: "palacio" });
          break;
        case "mercado":
          this.abrir({ kind: "mercado" });
          break;
        case "puesto0":
        case "puesto1":
        case "puesto2":
        case "puesto3": {
          const pu = PUESTOS_MERCADO[Number(z.id.slice(6))];
          this.abrir({ kind: "mercado", tab: pu.tab });
          break;
        }
      }
    }
  }

  private abrir(m: Modal) {
    this.entrada.soltar();
    this.ruta = [];
    vibrar(12);
    gameStore.push(m);
  }

  /** La pantalla vuelve a dejar entrar al templo (si falló el cambio de mundo). */
  volverAPermitirTemplo() {
    this.entrando = false;
  }

  /** La figura con la que se ve el jugador (para la casa por dentro). */
  lookJugador(): FigureLook {
    return this.lookDe(this.estado.yo.escalon, this.estado.yo.camino);
  }

  /**
   * Mientras se está dentro de una casa, la ciudad se duerme: no se dibuja, no se mueve y no se ve
   * (la conexión con los vecinos sigue abierta). Al salir, despierta en la misma puerta.
   */
  dormir(on: boolean) {
    const canvas = this.renderer.domElement;
    if (on) {
      if (!this.running) return;
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.entrada.soltar();
      this.ruta = [];
      canvas.style.display = "none";
      this.overlay.layer.style.display = "none";
    } else {
      if (this.running) return;
      canvas.style.display = "block";
      this.overlay.layer.style.display = "";
      this.running = true;
      this.last = performance.now();
      this.shadowDirty = true;
      this.ultimoEnvio.t = 0;
      this.raf = requestAnimationFrame(this.frame);
      this.pushHud();
    }
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
        const dib: CasaDibujo[] = casas.map((c) => ({ parcela: c.parcela, nivel: c.nivel, personajeId: c.personajeId ?? c.parcela, adornos: c.adornos, letrero: !!c.letrero }));
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
    this.dibujarSiervos();
    this.shadowDirty = true;
    this.syncNoche(true);
  }

  /** Tus siervos trabajan en el patio de tu casa: solo los ves tú (los vecinos ven la casa, nunca a los siervos). */
  private dibujarSiervos() {
    if (!this.player) return;
    for (const s of this.siervos) this.quitarNpc(s);
    this.siervos = [];
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const lista = this.estado.privada?.siervos ?? [];
    lista.forEach((tarea, i) => {
      // en fila en el patio, entre la casa y la calle, mirando a la casa
      const x = casa.x - 1.25 + (i % 4) * 0.85;
      const z = casa.z + casa.dir * 3.35;
      const n = this.npc("siervo", [x, z], { yaw: casa.dir === 1 ? Math.PI : 0 });
      if (!n) return;
      n.rig.pose = tarea === "harina" ? "kneel" : tarea === "aceite" ? "bow" : "idle";
      n.item = tarea === "corderos" ? "cordero" : tarea === "aceite" ? "aceite" : "cereal";
      this.siervos.push(n);
    });
  }

  /** Lo de tu casa cambió (siervos, alfolí u ofrendas). */
  /** Lo que cambió en el mercado: el gozo, la ropa (en la figura) y los adornos y el letrero de la casa. */
  alMercado(m: MercadoEstado) {
    const ropa = coloresDeIds(m.ropa);
    const casas = this.estado.barrio.casas.map((c) => (c.personajeId === this.estado.yo.personajeId ? { ...c, adornos: m.adornos, letrero: m.letrero } : c));
    const antes = JSON.stringify(this.estado.barrio.casas.find((c) => c.personajeId === this.estado.yo.personajeId) ?? null);
    const bienes = { ...this.estado.privada.bienes, ...m.bienes };
    this.estado = { ...this.estado, yo: { ...this.estado.yo, gozo: m.gozo, ropa }, barrio: { ...this.estado.barrio, casas }, privada: { ...this.estado.privada, bienes } };
    this.player.fig.setRopa(ropa);
    if (antes !== JSON.stringify(casas.find((c) => c.personajeId === this.estado.yo.personajeId) ?? null)) {
      this.barrios.set(this.estado.barrio.n, { n: this.estado.barrio.n, area: this.estado.barrio.area, casas, detalle: true });
      this.dibujarAreas();
    }
    this.pushHud();
  }

  actualizarPrivada(p: CasaPrivada, nivel?: number) {
    const antes = this.estado.privada?.siervos.join(",");
    this.estado = { ...this.estado, privada: p, yo: nivel !== undefined ? { ...this.estado.yo, nivel } : this.estado.yo };
    if (nivel !== undefined) {
      const b = this.barrios.get(this.estado.barrio.n);
      if (b) b.casas = b.casas.map((c) => (c.parcela === this.estado.yo.parcela ? { ...c, nivel } : c));
      this.dibujarAreas();
    } else if (antes !== p.siervos.join(",")) this.dibujarSiervos();
    this.pushHud();
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
        const base = mia ? (c.letrero ? `Tu casa · ${c.letrero}` : "Tu casa") : c.nombre ? (c.letrero ? `${c.letrero} · ${c.nombre}` : `Casa de ${c.nombre}`) : null;
        const reunion = this.reuniones.has(`${b.n}:${c.parcela}`);
        const nombre = base && reunion ? `📖 ${base} · reunión` : base;
        if (!nombre) continue;
        const [, , hh] = P.CASA_MEDIDA[Math.max(0, Math.min(3, c.nivel))];
        // el nombre lo escribió una persona: va como texto, nunca como HTML
        const el = this.overlay.make("tpl-tag");
        el.textContent = nombre;
        el.style.display = "none";
        if (mia) el.style.background = "rgba(180,120,10,.85)";
        if (reunion) el.style.background = "rgba(109,59,190,.9)";
        this.etiquetasCasas.push({ el, p: new THREE.Vector3(p.x, P.SUELO + hh + (c.nivel >= 3 ? 2.2 : 0.9), p.z), mia, reunion });
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
      ["El mercado", new THREE.Vector3(P.MERCADO[0], P.SUELO + 3.1, P.PUESTOS[0][1]), 20],
      ["El muro caído: cada deber pone una piedra", new THREE.Vector3(P.MURO_ORIENTE - 1.5, P.SUELO + 6.4, 19), 26],
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
    // los mercaderes, detrás de sus puestos, mirando a la plaza
    P.PUESTOS.forEach(([x, z], i) => {
      const n = this.npc("mercader", [x, z + 0.35], { yaw: Math.PI });
      if (n) n.wait = 1e9;
      const el = this.overlay.make("tpl-tag");
      el.textContent = `${PUESTOS_MERCADO[i].icono} ${PUESTOS_MERCADO[i].nombre}`;
      el.style.display = "none";
      this.mercaderes.push({ el, p: new THREE.Vector3(x, P.SUELO + 2.0, z + 0.35) });
    });
  }

  private npc(kind: Npc["kind"], at: V2, o: { yaw?: number; sit?: boolean }) {
    let look = randomVisitor(kind === "peregrino");
    if (kind === "anciano") look = { variant: "anciano", colors: { ...randomVisitor().colors, hair: "#d9d4cc" }, scale: 0.97 };
    if (kind === "nino") look = { variant: "nino", colors: randomVisitor().colors, scale: 0.74 };
    if (kind === "guardia") look = { variant: "hombre", colors: { robe: "#7a2f2f", accent: "#b8763b", head: "#5b3a2a", skin: randomVisitor().colors.skin, hair: "#2b1d14" }, scale: 1.04 };
    if (kind === "alumno") look = { variant: "hombre", colors: { robe: "#8a7a5a", accent: "#4a3a2a", head: "#d8c8a6", skin: randomVisitor().colors.skin, hair: "#3b2a1e" }, scale: 1 };
    if (kind === "mercader") look = { variant: "hombre", colors: { ...randomVisitor().colors, robe: ["#9a6a3a", "#5a6a8a", "#8a4a5a", "#6a7a4a"][this.mercaderes.length % 4], head: "#e8dcc0" }, scale: 1.02 };
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
        case "siervo":
          r.moving = 0;
          if (n.yaw !== undefined) r.yaw = turn(r.yaw, n.yaw, dt * 3);
          if (r.pose === "bow" && Math.sin(r.t * 1.6) > 0.96) r.pose = "offer";
          else if (r.pose === "offer" && Math.sin(r.t * 1.6) < 0.2) r.pose = "bow";
          break;
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
        if (n.kind === "siervo") this.items.add(n.item, r.x + Math.sin(r.yaw) * 0.55, r.y + 0.02, r.z + Math.cos(r.yaw) * 0.55, r.yaw + 0.6, 1.1);
        else this.items.add(n.item, r.x + Math.sin(r.yaw) * 0.36 * r.scale, r.y + 0.6 * r.scale, r.z + Math.cos(r.yaw) * 0.36 * r.scale, r.yaw, 0.95);
      }
    }
    this.animarVecinos(dt);
    this.crowd.flush();
    this.shadows.end();
    this.items.end();
    this.efectos(dt);
    this.fx.update(dt);
    this.updateLabels(dt);
    this.letrerosDeVecinos(now);
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
    const d0 = (portrait ? 19.5 : this.camera.aspect < 1.2 ? 18.5 : 17) * this.entrada.zoom;
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
      if (d < (e.mia ? 30 : e.reunion ? 24 : 7)) this.overlay.place(e.el, e.p);
      else e.el.style.display = "none";
    }
    for (const mc of this.mercaderes) {
      if (dist(r.x, r.z, mc.p.x, mc.p.z) < 9) this.overlay.place(mc.el, mc.p);
      else mc.el.style.display = "none";
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
    const camino = this.avisoCamino();
    if (camino) return camino;
    const r = this.player.rig;
    const casa = P.parcelaDe(this.estado.barrio.n, this.estado.yo.parcela);
    const cerca = this.vecinoCerca();
    if (cerca) return `${cerca.nombre} está cerca: salúdale con las frases rápidas`;
    const area = P.areaEn(r.x, r.z);
    if (area) {
      const b = this.barrios.get(this.barrioDeArea(area));
      const p = b?.detalle ? P.cercaDeUmbral(r.x, r.z, this.barrioDeArea(area), 3) : null;
      const c = p ? b!.casas.find((x) => x.parcela === p.n && x.personajeId !== this.estado.yo.personajeId) : null;
      if (c?.nombre) return `La casa de ${c.nombre}: párate en su puerta para visitarla`;
    }
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
      camino: this.estado.yo.camino,
      fecha: this.fecha.texto,
      fiesta: fh && f ? { id: f.id, nombre: f.nombre, icono: f.icono, dia: fh.dia, de: f.duracion, solemne: !!f.solemne, merito: f.merito } : null,
      hora: t,
      fase: this.faseNombre(t),
      vecinos: this.vecinos.size,
      red: this.redEstado,
      frases: this.frasesRecientes.map(({ id, nombre, texto }) => ({ id, nombre, texto })),
      cerca: this.vecinoCerca(),
      gozo: e.yo.gozo ?? 0,
    };
    gameStore.setCiudad(hud);
  }

  // ================================================================ entrada (motor/entrada.ts)
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
    this.entrada.destruir();
    this.marca?.dispose();
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.resizeObs.disconnect();
    this.red.cerrar();
    for (const id of [...this.vecinos.keys()]) this.quitarVecino(id);
    if (this.mensaje) {
      this.scene.remove(this.mensaje.ring.mesh);
      this.mensaje.ring.dispose();
    }
    for (const p of this.pobres) this.overlay.remove(p.label);
    for (const r of this.reuniones.values()) if (r.ring) r.ring.dispose();
    for (const mc of this.mercaderes) this.overlay.remove(mc.el);
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

