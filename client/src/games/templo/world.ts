/**
 * El mundo de "El aprendiz del templo": une el escenario, los personajes, el servicio del
 * templo y la historia. Corre en el navegador; el servidor solo guarda la partida y el puntaje.
 *
 * Ciclo del juego: el pueblo trae ofrendas a la puerta → el aprendiz las recibe y las presenta
 * en el altar (con fuego y pureza) → la gente se alegra y deja Gozo → con el Gozo se restaura
 * el templo y se llama a los levitas → Azarías enseña y pregunta → se sube de rango hasta ser
 * sumo sacerdote y entrar, el Día de la Expiación, al Lugar Santísimo.
 */
import * as THREE from "three";
import {
  DIALOGUES, HELPERS, ITEMS, LESSONS, LESSON_ORDER, QUIZZES, RANKS, STATIONS, UPGRADES, quizById, upgradeCost,
  type HelperId, type ItemType, type StationId, type UpgradeId,
} from "./data";
import {
  CHOIR_FLOOR, CHOIR_SPOTS, DOOR_RECT, GATE_RECT, HELPER_HOME, MAX_QUEUE, OUTER, OUTER_GATE, POS, PRAY_SPOTS, STATIC_CIRCLES,
  STATIC_RECTS, TEMPLE, VEIL_RECT, WAIT_SPOTS, floorHeight, insideTemple, queueSlot, type Rect, type V2,
} from "./layout";
import { GAME_SLUG, applyOffline, genBonus, gloria, nuevaGeneracion, progressView, sanitize, saveLocal, saveRemote, submitScore, type PileId, type SaveData } from "./state";
import {
  ADORNOS, COPA, LOGROS, copas, dailyReward, daySeed, goalDef, jornadaReward, logroNivel, makeGoals, parSeconds, starsFor, todayKey,
  type GoalKind, type StatKey,
} from "./progress";
import { gameStore, type Hud, type Modal } from "./store";
import { buildWorld, disposeWorld, fadeMaterials, type WorldVisual } from "./three/structures";
import {
  BlobShadows, Crowd, Figure, childColors, instrument, leviteColors, newRig, nobleColors, randomVisitor,
  type CrowdHandle, type FigureLook, type Rig,
} from "./three/characters";
import { ITEM_HEIGHT, ItemRenderer, isOffering, itemGroup } from "./three/items";
import { Fx } from "./three/fx";
import { NavGrid, collide, walkableArea } from "./three/nav";
import { Overlay, Ring } from "./three/overlay";
import { TempleAudio } from "./audio";
import type { DeberId } from "@shared/jerusalen";
import type { OnlineHooks } from "./online";
import { fechaDe, relojEnLinea, type Fecha, type FiestaHoy } from "@shared/calendario";
import { casoPorId, elegirCaso } from "./casos";
import { Entrada, vibrar } from "./motor/entrada";
import { lineasDe, lineasFin, lineasInicio, pasosDeParte, type PasoInst } from "./instruccion";
import { RedCiudad } from "./ciudad/red";
import { Presencia } from "./motor/presencia";
import { RED_TICK_MS } from "@shared/ciudad";
import { haciaElPiso } from "./motor/camara";

// ---------------------------------------------------------------- reglas
const DAY = 240; // segundos de juego por día
const DAWN = 0.2;
const DUSK = 0.8;
const HOURS: [number, number, string][] = [
  [0.26, 0.34, "Sacrificio de la mañana"],
  [0.64, 0.72, "Sacrificio de la tarde"],
];
const PILE_CAP: Record<PileId, number> = { lena: 10, aceite: 8, pan: 12, incienso: 8, diezmo: 12 };
const PILE_EVERY: Record<"lena" | "aceite" | "pan" | "incienso", number> = { lena: 2.3, aceite: 3.1, pan: 2.9, incienso: 3.5 };
const OFFER_GOZO: Record<string, number> = { cordero: 8, palomas: 4, cereal: 5 };
const LAMPS = 7;
const BREAD = 12;
const INCENSE_MAX = 4;
const PLAYER_R = 0.3;
const OUTER_BLOCK: Rect = [OUTER.maxX - 0.1, -OUTER_GATE.halfWidth - 0.3, OUTER.maxX + 2, OUTER_GATE.halfWidth + 0.3];

const ALTAR_TOP = new THREE.Vector3(POS.altar[0], 1.75, POS.altar[1]);
const BASIN_TOP = new THREE.Vector3(POS.gozoBasin[0], 1.15, POS.gozoBasin[1]);
const RANK_LOOK: FigureLook[] = ["aprendiz", "sacerdote", "turno", "principal", "sumo"];

type StackItem = { type: ItemType; vid: number };
type Carrier = { items: StackItem[]; hidden: number; cap: number };

type VState =
  | "toQueue" | "queue" | "toWait" | "waiting" | "cheer" | "leaving" | "toDrop" | "dropping"
  | "toBench" | "seated" | "toPray" | "praying" | "follow" | "toKing" | "visiting";
type Visitor = {
  id: number;
  kind: "ofrenda" | "diezmo" | "pregunta" | "orante" | "nino" | "noble";
  handle: CrowdHandle;
  rig: Rig;
  speed: number;
  path: V2[];
  state: VState;
  item: ItemType | null;
  wait: number;
  timer: number;
  parent?: Visitor;
  child?: Visitor;
  bubble?: HTMLDivElement;
  gift?: number;
  /** Trae un caso para juzgar (desde principal de los sacerdotes). */
  caso?: string;
};

type HelperState = "idle" | "toSrc" | "load" | "toDst" | "unload" | "toWash" | "wash" | "stand";
type HelperE = { id: HelperId; n: number; handle: CrowdHandle; rig: Rig; carry: Carrier; path: V2[]; state: HelperState; timer: number; washes: number; waited?: number; prop?: THREE.Group; bubble?: HTMLDivElement };

type Flyer = {
  kind: "orb" | "item";
  type?: ItemType;
  from: THREE.Vector3;
  to: THREE.Vector3 | (() => THREE.Vector3);
  t: number;
  dur: number;
  arc: number;
  s?: number;
  onArrive?: () => void;
};

type ZoneId =
  | "reception" | "basin" | "altar" | "lena" | "fuente" | "aceite" | "pan" | "incienso" | "candelero" | "mesa"
  | "altarIncienso" | "diezmo" | "camaras" | "ensenanza" | "azarias" | "expiacion" | "ciudad";
type Zone = { id: ZoneId; x: number; z: number; r: number; color: string; ring: Ring | null; on: boolean; inside: boolean };

type Pad = { key: string; kind: "station" | "helper"; id: string; cost: number; x: number; z: number; name: string; ring: Ring; label: HTMLDivElement; pop: number };

export type WorldOptions = {
  loggedIn: boolean;
  muted: boolean;
  music: boolean;
  online?: OnlineHooks;
  /** Jerusalén en línea: aparece arriba de la escalinata (viene de la ciudad). */
  spawn?: "ciudad";
  /** El sonido compartido con la ciudad (no se cierra al salir del templo). */
  audio?: TempleAudio;
  /**
   * Jerusalén en línea: la instrucción del sacerdote (partes terminadas, si es obligatoria porque
   * no conoce el templo, el nombre para Azarías y cómo avisar al servidor de cada parte).
   */
  instruccion?: { partes: number; obligatoria: boolean; nombre: string; alTerminarParte: (parte: number) => Promise<boolean> };
};

/** Jerusalén en línea: al pie de la escalinata se sale a la ciudad; quien vuelve aparece arriba. */
const SALIDA_CIUDAD: V2 = [39.4, 0];
const LLEGADA_CIUDAD: V2 = [36.0, 0];

/** En el templo en línea, lo que cuenta como deber para el mérito. */
const DEBER_DE: Partial<Record<string, DeberId>> = { ofrendas: "ofrendas", lena: "lena", aceite: "aceite", panes: "panes", incienso: "incienso", diezmos: "diezmos", orantes: "orantes" };

const STATION_IDS = STATIONS.map((s) => s.id);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const dist = (ax: number, az: number, bx: number, bz: number) => Math.hypot(ax - bx, az - bz);
function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}
/** Distancia del punto al borde del altar de bronce (con su rampa). */
function altarGap(x: number, z: number) {
  const box = (minX: number, minZ: number, maxX: number, maxZ: number) => Math.hypot(Math.max(minX - x, 0, x - maxX), Math.max(minZ - z, 0, z - maxZ));
  const [ax, az] = POS.altar;
  return Math.min(box(ax - 1.75, az - 1.75, ax + 1.75, az + 1.75), box(ax - 0.75, az + 1.75, ax + 0.75, az + 3.5));
}
const easeOutBack = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export class TempleWorld {
  readonly s: SaveData;
  private opts: WorldOptions;
  /** Modo en línea (Jerusalén): sin levitas, sin compras y sin guardar la partida local. */
  private online: OnlineHooks | null = null;
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(40, 1, 0.3, 900);
  private sun = new THREE.DirectionalLight("#fff3d6", 2.6);
  private hemi = new THREE.HemisphereLight("#cfe3ff", "#b9a27a", 1.2);
  private fireLight = new THREE.PointLight("#ff8a3a", 0, 13, 1.4);
  private lampLight = new THREE.PointLight("#ffcf7a", 0, 9, 1.4);
  private holyLight = new THREE.PointLight("#fff2c8", 0, 12, 1.2);
  private vis: WorldVisual;
  private crowd = new Crowd(64);
  private shadows = new BlobShadows(170);
  private items = new ItemRenderer(120);
  private fx = new Fx();
  private nav: NavGrid;
  private overlay: Overlay;
  audio: TempleAudio;

  private player: { fig: Figure; rig: Rig; carry: Carrier; vx: number; vz: number; step: number };
  private azarias: { fig: Figure; rig: Rig; bubble: HTMLDivElement };
  private king: { fig: Figure; rig: Rig; path: V2[]; state: "in" | "stay" | "out"; timer: number; nobles: Visitor[] } | null = null;
  private visitors: Visitor[] = [];
  private queue: Visitor[] = [];
  private waitTaken: (number | null)[] = WAIT_SPOTS.map(() => null);
  private prayTaken: (number | null)[] = PRAY_SPOTS.map(() => null);
  private helpers: HelperE[] = [];
  private flyers: Flyer[] = [];
  private pads: Pad[] = [];
  private zones: Record<ZoneId, Zone>;
  private vid = 0;

  private raf = 0;
  private last = 0;
  private running = true;
  private paused = false;
  private w = 1;
  private h = 1;
  private ratio = 1;
  private maxRatio = 1;
  private fpsAcc = 0;
  private fpsFrames = 0;
  private goodFor = 0;
  private resizeObs: ResizeObserver;
  private unsub: () => void;

  // Jerusalén en línea: los demás sacerdotes que sirven ahora (presencia por WebSocket)
  private red: RedCiudad | null = null;
  private presencia: Presencia | null = null;
  private redEnvioT = 0;
  private redUltimo = { x: 0, z: 0, ry: 0, a: 0, t: 0 };
  private redInicio: ReturnType<typeof setTimeout> | null = null;

  // Jerusalén en línea: la instrucción del sacerdote (Azarías lleva al nuevo por el templo)
  private inst: { parte: number; pasos: PasoInst[]; i: number; fase: "inicio" | "ir" | "hablar" | "tarea" | "pregunta" | "fin" } | null = null;
  private instPartes = 0;
  private instPendiente = false;
  private instOk = false;
  private instDeber = false;
  private azaRuta: V2[] = [];

  // entrada (toques, ratón y teclado: motor/entrada.ts) y el camino al punto tocado
  private entrada!: Entrada;
  private ruta: V2[] = [];
  private rutaAtasco = 0;
  private marca: Ring | null = null;
  private marcaT = 0;

  // tiempos
  private timers = { hud: 0, save: 0, remote: 0, score: 0, slow: 0, spawn: 2.5, pick: 0, hand: 0, present: 0, pay: 0, payOrb: 0, quizCool: 20, examCool: 0, fireWarn: 0, purityWarn: 0, carryWarn: 0, wash: 0, collect: 0, question: 25, caso: 150 };
  private piles: Record<string, number> = { lena: 0, aceite: 0, pan: 0, incienso: 0 };
  private prodAcc: Record<string, number> = {};
  private rising = new Map<StationId, number>();
  private doors = { gate: 0, holy: 0 };
  private fade = 1;
  private hour = -1;
  private prayer = false;
  private pascua = 0;
  private coinStreak = 0;
  private stepAlt = false;
  // avance sin fin y comunidad
  private fireRun = 0;
  private logrosReady = false;
  private eventQueue: { tipo: string; valor: number | string }[] = [];
  private eventTimer = 0;
  private liga: Hud["liga"] = null;
  private ligaTimer = 4;
  private pileWait: Record<string, number> = {};
  private adornoRise = new Map<string, number>();
  private choirExtra: CrowdHandle[] = [];
  private coinTime = 0;
  private remoteDirty = false;
  private lastScore = -1;
  private shadowKey = "";
  private shadowDirty = true;
  private ceremony = 0;
  private finale: { phase: "prep" | "tear" | "done"; t: number } | null = null;
  private examQuizzes: string[] = [];
  private examOk: boolean[] = [];
  private objective: { text: string; target: THREE.Vector3 | null; zone: ZoneId | null; pad: string | null } = { text: "", target: null, zone: null, pad: null };
  private arrow: THREE.Mesh;
  private gozoHeap: THREE.InstancedMesh;
  private heapLabel: HTMLDivElement;
  private pillarTags: HTMLDivElement[];
  private camTarget = new THREE.Vector3(POS.start[0], 0, POS.start[1]);
  private time = 0;
  // calendario hebreo y fiestas (shared/calendario.ts) y juicios del sacerdote (casos.ts)
  private fecha!: Fecha;
  private primicia = -1;
  private enramadas = false;
  private ultimoJuicio = true;
  // Jerusalén en línea: el letrero de la salida a la ciudad y si ya se está saliendo
  private cityTag: HTMLDivElement | null = null;
  private leaving = false;

  constructor(container: HTMLElement, save: SaveData, opts: WorldOptions) {
    this.container = container;
    this.s = save;
    this.opts = opts;
    this.online = opts.online || null;
    this.fecha = fechaDe(save.day);
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    this.renderer = new THREE.WebGLRenderer({ antialias: !coarse || (window.devicePixelRatio || 1) < 2, powerPreference: "high-performance" });
    this.maxRatio = Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2);
    // en pantallas finas (celulares) nunca se baja de una resolución que se vea nítida
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
    canvas.setAttribute("aria-label", "El aprendiz del templo");
    container.appendChild(canvas);

    // luces
    this.sun.castShadow = true;
    const sm = coarse ? 1024 : 2048;
    this.sun.shadow.mapSize.set(sm, sm);
    const sc = this.sun.shadow.camera;
    sc.left = -19;
    sc.right = 19;
    sc.top = 19;
    sc.bottom = -19;
    sc.near = 1;
    sc.far = 90;
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.normalBias = 0.035;
    this.scene.add(this.sun, this.sun.target, this.hemi, this.fireLight, this.lampLight, this.holyLight);
    this.scene.fog = new THREE.Fog("#e9dcc0", 70, 300);

    // escenario y personajes
    this.vis = buildWorld();
    this.scene.add(this.vis.root, this.crowd.group, this.shadows.mesh, this.items.group, this.fx.group);
    if (coarse) this.fx.density = 0.7;
    this.fireLight.position.set(POS.altar[0], 2.6, POS.altar[1]);
    this.lampLight.position.copy(this.vis.stations.candelero.anchors.light);
    this.holyLight.position.copy(this.vis.holiestLightPos);
    this.navObstacles = this.navRects();
    this.nav = new NavGrid(this.navObstacles, STATIC_CIRCLES);
    this.overlay = new Overlay(container, this.camera);
    this.audio = opts.audio ?? new TempleAudio(opts.muted, opts.music);

    const pf = new Figure(RANK_LOOK[this.s.rank]);
    const inicio = opts.spawn === "ciudad" ? LLEGADA_CIUDAD : POS.start;
    const pr = newRig(inicio[0], inicio[1]);
    pr.y = floorHeight(inicio[0], inicio[1]);
    pr.yaw = -Math.PI / 2;
    this.camTarget.set(inicio[0], 0, inicio[1]);
    this.player = { fig: pf, rig: pr, carry: { items: [], hidden: 0, cap: 3 }, vx: 0, vz: 0, step: 0 };
    this.scene.add(pf.root);
    const af = new Figure("azarias");
    const ar = newRig(POS.azarias[0], POS.azarias[1], 1.02);
    ar.yaw = Math.PI / 2;
    ar.hunch = 0.06;
    this.azarias = { fig: af, rig: ar, bubble: this.overlay.make("tpl-bub gold", "?") };
    this.scene.add(af.root);

    // flecha del objetivo y montón de gozo
    this.arrow = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.6, 14).rotateX(Math.PI), new THREE.MeshBasicMaterial({ color: "#ffd25a", toneMapped: false }));
    this.arrow.visible = false;
    this.scene.add(this.arrow);
    this.gozoHeap = new THREE.InstancedMesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: "#ffd66b", toneMapped: false }), 28);
    this.gozoHeap.count = 0;
    this.scene.add(this.gozoHeap);
    this.heapLabel = this.overlay.make("tpl-heap", "");
    this.heapLabel.style.display = "none";
    this.pillarTags = ["Jaquín", "Boaz"].map((n) => {
      const el = this.overlay.make("tpl-tag", n);
      el.style.display = "none";
      return el;
    });
    this.cityTag = this.overlay.make("tpl-tag", "Salir a la ciudad");
    this.cityTag.style.display = "none";

    this.zones = this.makeZones();
    for (const k of Object.keys(this.piles)) this.piles[k] = this.s.piles[k as PileId] || 0;
    this.applyCapacity();
    this.syncStations(true);
    for (const h of HELPERS) for (let n = 0; n < (this.s.helpers[h.id] || 0); n++) this.spawnHelper(h.id, n);
    if (this.s.story.pascuaInicio && !this.s.story.pascua) this.pascua = 150;
    this.refreshPads();

    // entrada y tamaño
    this.entrada = new Entrada(container, canvas, this.overlay, { ocupado: () => gameStore.busy, alPrimerToque: () => this.audio.ensure() });
    this.marca = new Ring(0.55, "#ffffff", false);
    this.marca.mesh.visible = false;
    this.scene.add(this.marca.mesh);
    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("pagehide", this.onPageHide);
    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    this.unsub = gameStore.onClosed(this.onModalClosed);

    if (this.online) {
      gameStore.toast("Templo en línea: aquí no hay levitas que ayuden. Cada deber suma mérito.", "info");
      this.instPartes = opts.instruccion?.partes ?? 0;
      // los demás que sirven ahora: se conecta un momento después (la ciudad cierra antes su conexión)
      this.presencia = new Presencia(this.scene, this.overlay, this.shadows, (x, z) => floorHeight(x, z));
      this.red = new RedCiudad({
        onInfo: (v) => this.presencia?.alInfo(v),
        onVecinos: (l) => this.presencia?.alVecinos(l),
        onFrase: () => undefined,
        onBarrio: () => undefined,
        onFuera: (motivo) => gameStore.toast(motivo, "warn"),
        onEstado: (e) => {
          if (e === "conectado") this.redUltimo.t = 0;
        },
      });
      this.redInicio = setTimeout(() => this.red?.conectar(), 1200);
      // quien no conoce el templo empieza (o sigue) la instrucción al entrar
      this.instPendiente = !!opts.instruccion?.obligatoria && this.instPartes < 3;
    } else {
      // al volver: lo que hicieron los levitas mientras tanto
      const off = applyOffline(this.s);
      if (off.gained > 0) gameStore.push({ kind: "offline", gained: off.gained, minutes: off.minutes, away: off.away, leftToday: off.leftToday });
      if (!this.s.story.intro) {
        this.s.story.intro = true;
        this.dialog("intro");
      }
    }
    const hoy = this.fiestaHoy();
    if (hoy) gameStore.toast(`${hoy.fiesta.icono} Hoy: ${hoy.fiesta.nombre}. ${hoy.fiesta.efecto}`, hoy.fiesta.solemne ? "info" : "gold");
    this.syncEnramadas();
    this.updateObjective();
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
    if (p) this.persist();
  }

  /** Respuesta a una pregunta (la pantalla muestra la explicación). */
  answer(quizId: string, choice: number, source: "azarias" | "pueblo" | "examen" | "instruccion", step = 0): boolean {
    const q = quizById(quizId);
    const correct = !!q && q.correcta === choice;
    const first = correct && this.s.quizzes[quizId] !== true;
    if (correct) this.s.quizzes[quizId] = true;
    else if (this.s.quizzes[quizId] !== true) this.s.quizzes[quizId] = false;
    const p = this.playerChest();
    if (correct) {
      vibrar(15);
      this.audio.correct();
      if (first) {
        this.s.sabiduria += 1;
        this.overlay.float("+1 sabiduría", p.clone().add(new THREE.Vector3(0, 0.5, 0)), "blue");
      }
      this.track("preguntas");
      if (source === "pueblo") this.track("pueblo");
      const bonus = this.online ? 0 : source === "pueblo" ? 15 + 6 * this.s.rank : source === "azarias" ? 8 + 4 * this.s.rank : 0;
      if (bonus) this.giveGozo(bonus, p);
      this.fx.sparkle(p, 18, 0.5);
    } else this.audio.wrong();
    if (source === "azarias") {
      this.s.pendingQuiz = null;
      this.timers.quizCool = correct ? 55 : 22;
    }
    if (source === "examen") this.examOk[step] = correct;
    if (source === "instruccion") this.instOk = correct;
    this.persist();
    this.pushHud();
    return correct;
  }

  buyUpgrade(id: UpgradeId): boolean {
    const def = UPGRADES.find((u) => u.id === id);
    if (!def) return false;
    const lvl = this.s.upgrades[id] || 0;
    if (lvl >= def.max || !def.requiere(progressView(this.s))) return false;
    const cost = upgradeCost(def, lvl);
    if (this.s.gozo < cost) return false;
    this.s.gozo -= cost;
    this.s.upgrades[id] = lvl + 1;
    this.applyCapacity();
    vibrar([25, 40, 25]);
    this.audio.build();
    this.fx.sparkle(this.playerChest(), 30, 0.6);
    this.persist();
    this.pushHud();
    return true;
  }

  /** Jerusalén en línea: salir a la ciudad (con el botón del marcador o por la escalinata). */
  salirACiudad() {
    if (this.leaving || !this.online?.toCity) return;
    this.leaving = true;
    this.audio.page();
    this.online.toCity();
  }

  // ---------------------------------------------------------------- instrucción del sacerdote
  /** Empieza (o repasa) una parte de la instrucción del sacerdote. */
  empezarInstruccion(parte = Math.min(3, this.instPartes + 1)) {
    if (!this.online || this.finale) return;
    const pasos = pasosDeParte(parte);
    if (!pasos.length) return;
    this.instPendiente = false;
    this.instDeber = false;
    this.inst = { parte, pasos, i: 0, fase: "inicio" };
    gameStore.push({ kind: "dialog", id: `inst:inicio:${parte}`, lines: lineasInicio(parte, this.opts.instruccion?.nombre || "sacerdote") });
    this.updateObjective();
    this.pushHud();
  }

  /** Deja la instrucción (solo si no es obligatoria; Azarías vuelve a su lugar). */
  dejarInstruccion() {
    if (!this.inst) return;
    this.inst = null;
    this.azaVolver();
    this.updateObjective();
    this.pushHud();
  }

  /** Partes terminadas de la instrucción (0 a 3). */
  get partesInstruccion(): number {
    return this.instPartes;
  }

  /** ¿La instrucción es obligatoria para este sacerdote? */
  get instruccionObligatoria(): boolean {
    return !!this.opts.instruccion?.obligatoria && this.instPartes < 3;
  }

  /** Si no se pudo llegar a la ciudad, se puede volver a intentar. */
  permitirSalida() {
    this.leaving = false;
  }

  /**
   * Devuelve lo que llevas: la leña, el aceite, los panes o el incienso vuelven a su lugar, y las
   * ofrendas del pueblo vuelven a sus familias (esperan otra vez en la puerta). Así nunca se queda
   * trabado: si el fuego se apagó con ofrendas en las manos, se devuelven, se trae leña y se reciben de nuevo.
   */
  dropCarry() {
    const c = this.player.carry;
    if (!c.items.length) return;
    if (isOffering(c.items[0].type)) {
      this.devolverOfrendas();
      return;
    }
    const from = this.playerChest();
    for (const it of c.items) {
      const key = it.type === "lena" ? "lena" : it.type === "aceite" ? "aceite" : it.type === "pan" ? "pan" : it.type === "incienso" ? "incienso" : "diezmo";
      const pos = this.pileSpot(key as PileId);
      if (key === "diezmo") this.s.piles.diezmo = Math.min(PILE_CAP.diezmo, (this.s.piles.diezmo || 0) + 1);
      else this.piles[key] = Math.min(PILE_CAP[key as PileId], this.piles[key] + 1);
      this.flyers.push({ kind: "item", type: it.type, from: from.clone(), to: new THREE.Vector3(pos[0], 0.3, pos[1]), t: 0, dur: 0.5, arc: 1.4 });
    }
    c.items = [];
    c.hidden = 0;
    this.audio.drop();
    this.pushHud();
  }

  /** Las ofrendas vuelven a sus familias: vuelven a la fila de la puerta con su ofrenda. */
  private devolverOfrendas() {
    const c = this.player.carry;
    const from = this.playerChest();
    let devueltas = 0;
    // en orden inverso, para que la fila quede como llegaron
    for (const it of [...c.items].reverse()) {
      const v = this.visitors.find((x) => x.id === it.vid);
      if (!v || (v.state !== "waiting" && v.state !== "toWait")) continue;
      if (v.wait >= 0) {
        this.waitTaken[v.wait] = null;
        v.wait = -1;
      }
      v.item = it.type;
      v.rig.pose = "idle";
      v.state = "toQueue";
      this.queue.unshift(v);
      const [qx, qz] = queueSlot(0);
      v.path = this.nav.path(v.rig.x, v.rig.z, qx, qz);
      this.flyers.push({ kind: "item", type: it.type, from: from.clone(), to: this.headPos(v.rig), t: 0, dur: 0.45, arc: 1.1 });
      devueltas++;
    }
    c.items = [];
    c.hidden = 0;
    this.audio.drop();
    gameStore.toast(
      this.s.altarFuel <= 0
        ? "Devolviste las ofrendas: las familias esperan en la puerta. Trae leña de la leñera, enciende el fuego y vuelve a recibirlas."
        : devueltas
          ? "Devolviste las ofrendas: las familias esperan en la puerta para volver a dártelas."
          : "Esas familias ya se habían ido.",
      "info",
    );
    this.pushHud();
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
    this.timers.hud += dt;
    if (this.timers.hud > 0.1) {
      this.timers.hud = 0;
      this.pushHud();
    }
  };

  /**
   * Si el equipo de verdad no da abasto, baja un poco la resolución, y la vuelve a subir apenas
   * puede. No cuenta las ceremonias ni las ventanas (son momentos cortos), y un ritmo parejo y
   * bajo (el teléfono en ahorro de batería fija 30 cuadros) no es sobrecarga: ahí no se toca la
   * calidad. Nunca baja de una resolución nítida.
   */
  private adapt(raw: number) {
    if (document.hidden || gameStore.busy || this.ceremony > 0 || this.finale || raw > 0.5) {
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
  private frameGaps: number[] = [];
  private minRatio = 1;

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

  // ================================================================ simulación
  private simulate(dt: number) {
    const s = this.s;
    s.playSeconds += dt;
    this.online?.tick(dt);
    // día y noche
    const prev = s.time;
    if (this.online) {
      // Jerusalén en línea: el mismo día y la misma hora para todos
      const reloj = relojEnLinea();
      s.day = reloj.dia;
      s.time = reloj.hora;
    } else {
      s.time += dt / DAY;
      if (s.time >= 1) {
        s.time -= 1;
        s.day += 1;
      }
    }
    if (s.day !== this.fecha.numero) {
      this.fecha = fechaDe(s.day);
      this.syncEnramadas();
    }
    this.dayEvents(prev, s.time);
    const T = this.timers as unknown as Record<string, number>;
    for (const k of Object.keys(T)) {
      if (k === "hud" || k === "save" || k === "remote" || k === "score" || k === "slow") continue;
      T[k] = Math.max(0, T[k] - dt);
    }

    this.movePlayer(dt);
    this.instTick(dt);
    this.enviarPosicion(dt);
    this.produce(dt);
    this.consume(dt);
    this.updateZones(dt);
    this.updatePads(dt);
    this.spawnVisitors(dt);
    this.updateVisitors(dt);
    this.updateHelpers(dt);
    this.updateKing(dt);
    this.updateFlyers(dt);
    this.updateFinale(dt);
    if (this.pascua > 0) {
      this.pascua -= dt;
      if (this.pascua <= 0) {
        this.pascua = 0;
        s.story.pascua = true;
        this.dialog("pascuaFin");
        this.refreshPads();
        this.audio.trumpet(true);
      }
    }

    this.timers.slow += dt;
    if (this.timers.slow > 0.5) {
      this.timers.slow = 0;
      this.storyTriggers();
      this.refreshPads();
      this.updateObjective();
    }
    this.timers.save += dt;
    if (this.timers.save > 5) {
      this.timers.save = 0;
      this.persist();
    }
    this.timers.remote += dt;
    if (this.opts.loggedIn && this.timers.remote > 45 && this.remoteDirty) {
      this.timers.remote = 0;
      this.remoteDirty = false;
      void saveRemote(this.s);
    }
    // avisos de la comunidad (de a uno, sin apurar al servidor) y la tabla de la semana
    this.eventTimer -= dt;
    if (this.eventTimer <= 0 && this.eventQueue.length) {
      this.eventTimer = 3.2;
      const ev = this.eventQueue.shift()!;
      void this.sendEvent(ev.tipo, ev.valor);
    }
    this.ligaTimer -= dt;
    if (this.ligaTimer <= 0) {
      this.ligaTimer = 120;
      void this.fetchLiga();
    }
    this.timers.score += dt;
    if (this.opts.loggedIn && this.timers.score > 90) {
      this.timers.score = 0;
      this.sendScore();
    }
  }

  private sendScore() {
    if (this.online) return;
    const g = gloria(this.s);
    if (g > this.lastScore) {
      this.lastScore = g;
      void submitScore(this.s);
    }
  }

  private persist() {
    // el templo en línea no se guarda: la partida local queda como estaba
    if (this.online) return;
    this.s.piles = { ...this.s.piles, lena: this.piles.lena, aceite: this.piles.aceite, pan: this.piles.pan, incienso: this.piles.incienso };
    this.s.savedAt = Date.now();
    saveLocal(this.s);
    this.remoteDirty = true;
  }

  // ---------------------------------------------------------------- tiempo del día
  private isNight(t = this.s.time) {
    return t < DAWN || t > DUSK;
  }

  private hourIndex(t = this.s.time) {
    return HOURS.findIndex(([a, b]) => t >= a && t < b);
  }

  private isSabbath() {
    return this.s.day % 7 === 0;
  }

  private lampsLit() {
    return !!this.s.built.candelero && this.isNight() && this.s.lampOil > 0;
  }

  private phaseName() {
    const t = this.s.time;
    const h = this.hourIndex(t);
    if (h >= 0) return HOURS[h][2];
    if (t < DAWN) return "Noche";
    if (t < 0.26) return "Amanecer";
    if (t < 0.45) return "Mañana";
    if (t < 0.6) return "Mediodía";
    if (t < DUSK - 0.04) return "Tarde";
    if (t <= DUSK) return "Anochecer";
    return "Noche";
  }

  private dayEvents(prev: number, now: number) {
    const s = this.s;
    const crossed = (mark: number) => (prev < mark && now >= mark) || (prev > now && (prev < mark || now >= mark));
    // anochecer: ¿están llenas las siete lámparas?
    if (crossed(DUSK) && s.built.candelero) {
      s.lampWatch = s.lampOil >= LAMPS - 0.01;
      if (s.lampWatch) for (let i = 0; i < 4; i++) setTimeout(() => this.running && this.audio.lamp(), i * 160);
      gameStore.toast(s.lampWatch ? "Anochece: las siete lámparas arden delante de Jehová" : "Anochece: llena las lámparas del candelero", s.lampWatch ? "gold" : "warn");
    }
    // amanecer
    if (crossed(DAWN)) {
      if (s.built.candelero && s.lampWatch) {
        const bonus = Math.round(5 * LAMPS * (1 + s.rank) * (1 + 0.2 * (s.upgrades.abundancia || 0)));
        this.giveGozo(bonus, this.vis.stations.candelero.anchors.light);
        gameStore.toast(`Las lámparas ardieron toda la noche (Levítico 24:3): +${bonus} de gozo`, "gold");
        this.track("noche");
      }
      s.lampWatch = false;
      if (this.isSabbath() && s.built.mesa) {
        if (s.bread >= BREAD) {
          const bonus = 60 + 30 * s.rank;
          this.giveGozo(bonus, this.vis.stations.mesa.anchors.pan5);
          gameStore.toast(`Día de reposo: los sacerdotes comen los panes en el lugar santo (Levítico 24:9). +${bonus}`, "gold");
        } else gameStore.toast("Día de reposo: pon doce panes nuevos en la mesa (Levítico 24:8)", "info");
        s.bread = 0;
      }
      this.anunciarFiesta();
      this.alegriaDeLaManana();
    }
    // horas del sacrificio y del incienso
    const h = this.hourIndex(now);
    if (h !== this.hour) {
      if (h >= 0) this.startHour(h);
      else if (this.hour >= 0) this.endHour();
      this.hour = h;
    }
  }

  private startHour(h: number) {
    const s = this.s;
    if (!s.built.altar) return;
    this.audio.trumpet();
    if (this.fiestaHoy()?.fiesta.id === "trompetas") setTimeout(() => this.running && this.audio.trumpet(true), 700);
    gameStore.toast(this.online ? `${HOURS[h][2]}: el pueblo trae sus ofrendas` : `${HOURS[h][2]}: las ofrendas valen el doble`, "gold");
    if (s.built.altarIncienso) {
      if (s.incense >= 1) {
        s.incense -= 1;
        this.prayer = true;
        this.audio.pray();
        const n = Math.min(PRAY_SPOTS.length, this.online ? 6 : 6 + s.rank * 2);
        for (let i = 0; i < n; i++) setTimeout(() => this.running && this.spawnOrante(), i * 380);
        if (!s.story.horaIncienso) {
          s.story.horaIncienso = true;
          gameStore.toast("«Toda la multitud del pueblo estaba fuera orando a la hora del incienso» (Lucas 1:10)", "info");
        }
      } else gameStore.toast("Llegó la hora del incienso y el altar de oro estaba vacío", "warn");
    }
    if (h === 1 && s.built.ensenanza && !s.story.bendicion) {
      s.story.bendicion = true;
      this.dialog("bendicion");
      this.teach("bendicion");
    }
  }

  private endHour() {
    if (!this.prayer) return;
    this.prayer = false;
    const value = Math.round(4 * this.mult(false));
    let n = 0;
    for (const v of this.visitors)
      if (v.kind === "orante" && (v.state === "praying" || v.state === "toPray")) {
        this.s.lifetimeGozo += value;
        this.emitGozo(this.headPos(v.rig), value, "basin");
        this.cheer(v);
        n++;
      }
    if (n) this.track("orantes", n);
  }

  // ---------------------------------------------------------------- capacidades
  private fuelMax() {
    return 6 + 2 * (this.s.upgrades.fuego || 0);
  }

  private purityMax() {
    return 5 + 3 * (this.s.upgrades.agua || 0);
  }

  private speed() {
    // arranque más ágil y casi el mismo tope (estudio de 2026-11-09: 4,4 + 0,35 por nivel)
    return 4.4 + 0.35 * (this.s.upgrades.paso || 0);
  }

  private applyCapacity() {
    this.player.carry.cap = 3 + (this.s.upgrades.brazos || 0);
    this.s.purity = Math.min(this.s.purity, this.purityMax());
  }

  private maxQueue() {
    return Math.min(MAX_QUEUE, 4 + (this.s.upgrades.familias || 0) + (this.s.helpers.portero ? 2 : 0));
  }

  /** Cuánto gozo deja cada persona bendecida. */
  private mult(withHour = true) {
    const s = this.s;
    let bonus = 1 + 0.1 * s.rank + 0.1 * (s.helpers.cantor || 0) + genBonus(s);
    if (this.lampsLit()) bonus += 0.25;
    if (s.built.mesa && s.bread >= BREAD) bonus += 0.25;
    if (s.built.altarIncienso && s.incense > 0) bonus += 0.2;
    let m = (1 + 0.2 * (s.upgrades.abundancia || 0)) * bonus;
    if (withHour && this.hourIndex() >= 0) m *= 2;
    if (this.pascua > 0) m *= 1.5;
    if (this.isSabbath()) m *= 1.25;
    // las fiestas alegran al pueblo; un juicio injusto lo entristece
    const f = this.fiestaHoy();
    if (f) m *= f.fiesta.gozo;
    if (s.tristeza > 0) m *= 1 - 0.15 * s.tristeza;
    return m;
  }

  private diligence() {
    return 1 + 0.15 * (this.s.upgrades.diligencia || 0);
  }

  // ---------------------------------------------------------------- jugador
  /** Un toque corto en el piso: el aprendiz va caminando solo hasta ahí (por el camino más corto). */
  private irAlToque() {
    const t = this.entrada.tomarToque();
    if (!t || this.finale || this.ceremony > 0) return;
    const r = this.player.rig;
    const u = t.x / this.w, v = t.y / this.h;
    let p = haciaElPiso(this.camera, u, v, r.y);
    if (!p) return;
    // segunda vuelta con la altura del piso tocado (la escalinata y las gradas no están a la misma altura)
    p = haciaElPiso(this.camera, u, v, floorHeight(p[0], p[1])) ?? p;
    let [x, z] = p;
    if (!walkableArea(x, z)) return;
    const o = this.obstacles();
    [x, z] = collide(x, z, PLAYER_R, o.rects, o.circles);
    this.ruta = this.nav.path(r.x, r.z, x, z);
    this.rutaAtasco = 0;
    if (this.marca) {
      this.marca.set(x, floorHeight(x, z), z);
      this.marca.mesh.visible = true;
      this.marcaT = 0.9;
    }
  }

  private camBasis(): { fx: number; fz: number; rx: number; rz: number } {
    const th = 0.36;
    const fx = -Math.cos(th), fz = -Math.sin(th);
    return { fx, fz, rx: -fz, rz: fx };
  }

  private obstacles(): { rects: Rect[]; circles: typeof STATIC_CIRCLES } {
    // En el juego local la puerta del gran atrio no deja bajar la escalinata. En Jerusalén en línea
    // la escalinata lleva a la ciudad: quien vuelve aparece arriba y tiene que poder entrar.
    const rects = this.online?.toCity ? [...STATIC_RECTS] : [...STATIC_RECTS, OUTER_BLOCK];
    if (!this.s.built.santuario) rects.push(DOOR_RECT);
    if (!this.s.finale) rects.push(VEIL_RECT);
    if (!this.s.built.puertas) rects.push(GATE_RECT);
    return { rects, circles: STATIC_CIRCLES };
  }

  private navRects(): Rect[] {
    const rects = [...STATIC_RECTS];
    if (!this.s.built.santuario) rects.push(DOOR_RECT);
    if (!this.s.finale) rects.push(VEIL_RECT);
    if (!this.s.built.puertas) rects.push(GATE_RECT);
    return rects;
  }

  private movePlayer(dt: number) {
    const p = this.player;
    const r = p.rig;
    this.irAlToque();
    let [ix, iy] = this.entrada.vector();
    if (this.finale || this.ceremony > 0) {
      ix = iy = 0;
      this.ruta = [];
    }
    let dx = 0, dz = 0;
    if (Math.hypot(ix, iy) > 0.01) {
      // el joystick o el teclado mandan (y cortan el camino al punto tocado)
      this.ruta = [];
      const b = this.camBasis();
      dx = b.rx * ix + b.fx * iy;
      dz = b.rz * ix + b.fz * iy;
    } else if (this.ruta.length) {
      const [tx, tz] = this.ruta[0];
      const ex = tx - r.x, ez = tz - r.z;
      const d = Math.hypot(ex, ez);
      if (d < 0.3) this.ruta.shift();
      else {
        dx = ex / d;
        dz = ez / d;
      }
      // si algo lo traba más de un segundo, deja de insistir
      this.rutaAtasco = Math.hypot(p.vx, p.vz) < 0.4 ? this.rutaAtasco + dt : 0;
      if (this.rutaAtasco > 1.2) this.ruta = [];
    }
    if (this.marca && this.marcaT > 0) {
      this.marcaT -= dt;
      if (this.marcaT <= 0 || !this.ruta.length) this.marca.mesh.visible = false;
    }
    const sp = this.speed() * (this.entrada.corre ? 1.35 : 1);
    const k = Math.min(1, dt * 14);
    p.vx += (dx * sp - p.vx) * k;
    p.vz += (dz * sp - p.vz) * k;
    const ox = r.x, oz = r.z;
    let nx = r.x + p.vx * dt, nz = r.z + p.vz * dt;
    const o = this.obstacles();
    [nx, nz] = collide(nx, nz, PLAYER_R, o.rects, o.circles);
    if (!walkableArea(nx, nz)) {
      if (walkableArea(nx, oz)) nz = oz;
      else if (walkableArea(ox, nz)) nx = ox;
      else {
        nx = ox;
        nz = oz;
      }
    }
    const moved = Math.hypot(nx - ox, nz - oz);
    r.x = nx;
    r.z = nz;
    r.y = floorHeight(nx, nz);
    const speedNow = moved / Math.max(dt, 1e-4);
    r.moving += (Math.min(1, speedNow / 3) - r.moving) * Math.min(1, dt * 10);
    r.phase += moved * 7.2;
    if (Math.hypot(p.vx, p.vz) > 0.3) r.yaw = turn(r.yaw, Math.atan2(p.vx, p.vz), dt * 12);
    r.carrying = p.carry.items.length > 0;
    // pasos sobre la piedra y, como sumo sacerdote, las campanillas del manto (Éxodo 28:35)
    p.step += moved;
    if (p.step > 0.62) {
      p.step = 0;
      this.stepAlt = !this.stepAlt;
      this.audio.footstep(this.stepAlt);
      if (this.s.rank >= 4 && !this.finale) this.audio.bells();
    }
  }

  playerChest() {
    const r = this.player.rig;
    return new THREE.Vector3(r.x + Math.sin(r.yaw) * 0.3, r.y + 0.75, r.z + Math.cos(r.yaw) * 0.3);
  }

  private stackTop(c: Carrier, rig: Rig) {
    let y = rig.y + 0.62 * rig.scale;
    for (let i = 0; i < c.items.length - c.hidden; i++) y += ITEM_HEIGHT[c.items[i].type];
    return new THREE.Vector3(rig.x + Math.sin(rig.yaw) * 0.38, y + 0.1, rig.z + Math.cos(rig.yaw) * 0.38);
  }

  private headPos(r: Rig) {
    return new THREE.Vector3(r.x, r.y + 1.35 * r.scale, r.z);
  }

  private canTake(c: Carrier, t: ItemType) {
    return c.items.length < c.cap && (c.items.length === 0 || itemGroup(c.items[0].type) === itemGroup(t));
  }

  private warnCarry(text: string) {
    if (this.timers.carryWarn > 0) return;
    this.timers.carryWarn = 3.5;
    gameStore.toast(text, "warn");
  }

  // ---------------------------------------------------------------- talleres
  private produce(dt: number) {
    const s = this.s;
    const add = (id: "lena" | "aceite" | "pan" | "incienso", built: boolean) => {
      if (!built || this.piles[id] >= PILE_CAP[id]) return;
      const acc = (this.prodAcc[id] || 0) + dt;
      if (acc >= PILE_EVERY[id]) {
        this.prodAcc[id] = 0;
        this.piles[id] += 1;
      } else this.prodAcc[id] = acc;
    };
    add("lena", !!s.built.lenera);
    add("aceite", !!s.built.prensa);
    add("pan", !!s.built.horno);
    add("incienso", !!s.built.camIncienso);
  }

  private consume(dt: number) {
    const s = this.s;
    // el fuego del altar se va consumiendo
    if (s.built.altar && s.altarFuel > 0) {
      const burn = 1 / (24 + 4 * (s.upgrades.fuego || 0));
      s.altarFuel = Math.max(0, s.altarFuel - burn * dt);
      this.fireRun += dt;
      const run = Math.floor(this.fireRun);
      if (run > (s.stats.fuegoMax || 0)) s.stats.fuegoMax = run;
      for (const g of s.jornada.goals) if (g.kind === "fuegoVivo") g.progress = Math.max(g.progress, Math.min(g.target, run));
      if (!s.daily.done) for (const g of s.daily.goals) if (g.kind === "fuegoVivo") g.progress = Math.max(g.progress, Math.min(g.target, run));
      if (s.altarFuel === 0) {
        this.fireRun = 0;
        this.audio.fireOut();
        if (s.story.primerFuego && !s.story.fuegoApagado) {
          s.story.fuegoApagado = true;
          this.dialog("fuegoApagado");
        } else gameStore.toast("¡Se apagó el fuego del altar! Trae leña", "warn");
      }
    }
    // las lámparas arden de la tarde a la mañana
    if (s.built.candelero && this.isNight() && s.lampOil > 0) {
      s.lampOil = Math.max(0, s.lampOil - (LAMPS / (DAY * 0.4)) * dt);
      if (s.lampOil === 0 && s.lampWatch) {
        s.lampWatch = false;
        gameStore.toast("Se apagaron las lámparas antes de la mañana", "warn");
      }
    }
  }

  private pileSpot(id: PileId): V2 {
    return id === "lena" ? POS.lenaPile : id === "aceite" ? POS.prensaPile : id === "pan" ? POS.hornoPile : id === "incienso" ? POS.camInciensoPile : POS.diezmoPile;
  }

  // ---------------------------------------------------------------- zonas
  private makeZones(): Record<ZoneId, Zone> {
    const z = (id: ZoneId, p: V2, r: number, color: string, ring = true): Zone => {
      const zone: Zone = { id, x: p[0], z: p[1], r, color, ring: null, on: false, inside: false };
      if (ring) {
        zone.ring = new Ring(r, color, false);
        zone.ring.set(p[0], floorHeight(p[0], p[1]), p[1]);
        zone.ring.mesh.visible = false;
        this.scene.add(zone.ring.mesh);
      }
      return zone;
    };
    return {
      reception: z("reception", POS.reception, 1.05, "#ffd25a"),
      basin: z("basin", POS.gozoBasin, 1.45, "#ffe08a", false),
      altar: z("altar", POS.altar, 3.25, "#ff8a3a"),
      lena: z("lena", POS.lenaPile, 1.0, "#c08a4a"),
      fuente: z("fuente", POS.fuente, 3.35, "#6fc3ff"),
      aceite: z("aceite", POS.prensaPile, 1.0, "#b7c25a"),
      pan: z("pan", POS.hornoPile, 1.0, "#f0b45a"),
      incienso: z("incienso", POS.camInciensoPile, 1.0, "#c9a8f0"),
      candelero: z("candelero", POS.candeleroSpot, 0.72, "#ffd25a"),
      mesa: z("mesa", POS.mesaSpot, 0.72, "#ffd25a"),
      altarIncienso: z("altarIncienso", POS.altarInciensoSpot, 0.72, "#e4c8ff"),
      diezmo: z("diezmo", POS.diezmoPile, 1.15, "#e8c66a"),
      camaras: z("camaras", POS.camarasDoor, 1.15, "#7fb0ff"),
      ensenanza: z("ensenanza", POS.ensenanzaSpot, 0.95, "#8fe08a"),
      azarias: z("azarias", POS.azarias, 1.7, "#ffffff", false),
      expiacion: z("expiacion", POS.expiacionSpot, 0.85, "#ffffff"),
      ciudad: z("ciudad", SALIDA_CIUDAD, 1.2, "#ffe08a"),
    };
  }

  private zoneOn(id: ZoneId): boolean {
    const s = this.s;
    switch (id) {
      case "reception":
      case "basin":
        return !!s.built.puertas;
      case "altar":
        return !!s.built.altar;
      case "lena":
        return !!s.built.lenera;
      case "fuente":
        return !!s.built.fuente;
      case "aceite":
        return !!s.built.prensa;
      case "pan":
        return !!s.built.horno;
      case "incienso":
        return !!s.built.camIncienso;
      case "candelero":
        return !!s.built.candelero;
      case "mesa":
        return !!s.built.mesa;
      case "altarIncienso":
        return !!s.built.altarIncienso;
      case "diezmo":
        return !!s.story.pascua;
      case "camaras":
        return !!s.built.camaras;
      case "ensenanza":
        return !!s.built.ensenanza;
      case "azarias":
        return true;
      case "expiacion":
        // la primera vez es la historia; después, una vez al año en el Día de la Expiación (Hebreos 9:7)
        if (this.online || s.rank < 4 || this.finale) return false;
        if (!s.finale) return !!s.story.rango4;
        return this.fiestaHoy()?.fiesta.id === "expiacion" && !s.story[`expiacion${this.fecha.anio}`];
      case "ciudad":
        return !!this.online?.toCity;
    }
  }

  private updateZones(dt: number) {
    const r = this.player.rig;
    const c = this.player.carry;
    for (const z of Object.values(this.zones)) {
      z.on = this.zoneOn(z.id);
      const zx = z.id === "azarias" ? this.azarias.rig.x : z.x;
      const zz = z.id === "azarias" ? this.azarias.rig.z : z.z;
      // el altar se toca desde cualquier lado (se mide al borde, no al centro)
      const inside = z.on && (z.id === "altar" ? altarGap(r.x, r.z) < 1.15 : dist(r.x, r.z, zx, zz) < z.r);
      const entered = inside && !z.inside;
      z.inside = inside;
      if (!inside) {
        this.pileWait[z.id] = 0;
        continue;
      }
      switch (z.id) {
        case "reception":
          this.receive(c, r, true);
          break;
        case "basin":
          this.collectGozo();
          break;
        case "altar":
          this.atAltar(c, entered);
          break;
        case "lena":
        case "aceite":
        case "pan":
        case "incienso":
          if (this.settled(z.id, dt)) this.takeFromPile(z.id, c, r);
          break;
        case "diezmo":
          this.takeDiezmo(c, r);
          break;
        case "fuente":
          this.wash(r);
          break;
        case "candelero":
          this.deliver(c, "aceite", () => this.s.lampOil < LAMPS - 0.02, () => (this.s.lampOil = Math.min(LAMPS, this.s.lampOil + 1)), this.vis.stations.candelero.anchors.lamp3, 2);
          break;
        case "mesa":
          this.deliver(c, "pan", () => this.s.bread < BREAD, () => {
            this.s.bread += 1;
            if (this.s.bread === BREAD) {
              gameStore.toast("Doce panes delante de Jehová: uno por cada tribu", "gold");
              this.fx.sparkle(this.vis.stations.mesa.anchors.pan5, 30, 0.6);
            }
          }, this.vis.stations.mesa.anchors[`pan${Math.min(11, this.s.bread)}`], 2);
          break;
        case "altarIncienso":
          this.deliver(c, "incienso", () => this.s.incense < INCENSE_MAX, () => (this.s.incense += 1), this.vis.stations.altarIncienso.anchors.top, 3);
          break;
        case "camaras":
          this.deliver(c, "diezmo", () => true, () => {
            this.s.abundance += 1;
            this.syncHeaps();
          }, new THREE.Vector3(POS.camarasDoor[0], 0.6, POS.camarasDoor[1] - 1), 0, true);
          break;
        case "ensenanza":
          if (entered) this.askQuestioner();
          break;
        case "azarias":
          if (entered) this.talkAzarias();
          break;
        case "expiacion":
          if (entered) {
            if (this.s.finale) this.expiacionAnual();
            else this.startFinale();
          }
          break;
        case "ciudad":
          if (entered) this.salirACiudad();
          break;
      }
    }
  }

  /**
   * Para cargar de un montón hay que detenerse un momento sobre él (al pasar caminando no se
   * recoge nada). Si ya llevas de eso mismo, sigue cargando sin esperar.
   */
  private settled(id: string, dt: number) {
    const c = this.player.carry;
    if (c.items.length && itemGroup(c.items[0].type) === id) return true;
    const slow = Math.hypot(this.player.vx, this.player.vz) < 1.4;
    this.pileWait[id] = slow ? (this.pileWait[id] || 0) + dt : 0;
    return this.pileWait[id] > 0.35;
  }

  /** ¿Hace falta llevar esto? (si el lugar ya está lleno, no se carga). */
  private needed(id: "lena" | "aceite" | "pan" | "incienso", carrying: number) {
    const s = this.s;
    switch (id) {
      case "lena":
        return !s.built.altar || s.altarFuel + carrying < this.fuelMax() - 0.95;
      case "aceite":
        return !s.built.candelero || s.lampOil + carrying < LAMPS - 0.02;
      case "pan":
        return !s.built.mesa || s.bread + carrying < BREAD;
      case "incienso":
        return !s.built.altarIncienso || s.incense + carrying < INCENSE_MAX;
    }
  }

  /** Recibir en la puerta la ofrenda del primero de la fila. */
  private receive(c: Carrier, rig: Rig, isPlayer: boolean) {
    if (isPlayer && this.timers.hand > 0) return;
    const v = this.queue[0];
    if (!v || v.state !== "queue" || !v.item) return;
    const [sx, sz] = queueSlot(0);
    if (dist(v.rig.x, v.rig.z, sx, sz) > 0.4) return;
    if (!this.canTake(c, v.item)) {
      if (isPlayer && c.items.length && !isOffering(c.items[0].type)) this.warnCarry(`Llevas ${ITEMS[c.items[0].type].nombre}: entrégala antes de recibir ofrendas`);
      return;
    }
    if (isPlayer) this.timers.hand = 0.22;
    const item = v.item;
    v.item = null;
    v.rig.carrying = false;
    c.items.push({ type: item, vid: v.id });
    c.hidden++;
    const from = new THREE.Vector3(v.rig.x + Math.sin(v.rig.yaw) * 0.35, v.rig.y + 0.75, v.rig.z + Math.cos(v.rig.yaw) * 0.35);
    this.flyers.push({ kind: "item", type: item, from, to: () => this.stackTop(c, rig), t: 0, dur: 0.32, arc: 0.7, onArrive: () => (c.hidden = Math.max(0, c.hidden - 1)) });
    if (isPlayer || dist(rig.x, rig.z, this.player.rig.x, this.player.rig.z) < 8) {
      vibrar(10);
      this.audio.pickup(c.items.length, "ofrenda");
      if (item === "cordero" && Math.random() < 0.7) this.audio.bleat(isPlayer ? 1 : 0.5);
      else if (item === "palomas" && Math.random() < 0.7) this.audio.coo(isPlayer ? 1 : 0.5);
      else if (item === "cereal") this.audio.flour();
    }
    this.queue.shift();
    if (isPlayer) this.track("familias");
    this.goWait(v);
  }

  private atAltar(c: Carrier, entered: boolean) {
    const s = this.s;
    if (!c.items.length) return;
    const top = c.items[c.items.length - 1];
    if (top.type === "lena") {
      if (this.timers.pick > 0) return;
      if (s.altarFuel > this.fuelMax() - 0.95) {
        if (entered) gameStore.toast("El altar ya tiene toda la leña que cabe", "info");
        return;
      }
      this.timers.pick = 0.13;
      c.items.pop();
      const wasOut = s.altarFuel <= 0;
      s.altarFuel = Math.min(this.fuelMax(), s.altarFuel + 1);
      this.flyers.push({ kind: "item", type: "lena", from: this.stackTop(c, this.player.rig), to: ALTAR_TOP.clone(), t: 0, dur: 0.35, arc: 1.2, onArrive: () => this.fx.burst(ALTAR_TOP, 0.4) });
      vibrar(10);
      this.audio.pickup(c.items.length + 1, "lena");
      this.track("lena");
      if (wasOut) {
        this.audio.ignite();
        if (!s.story.primerFuego) {
          s.story.primerFuego = true;
          this.dialog("primerFuego");
          this.timers.spawn = 0.5;
        }
      }
      return;
    }
    if (!isOffering(top.type)) {
      if (entered) this.warnCarry(`El altar no recibe ${ITEMS[top.type].nombre}`);
      return;
    }
    if (s.altarFuel <= 0) {
      if (this.timers.fireWarn <= 0) {
        this.timers.fireWarn = 4;
        gameStore.toast("El fuego está apagado: toca «Devolver» (las familias esperan en la puerta), trae leña de la leñera y enciende el fuego", "warn");
      }
      return;
    }
    if (s.built.fuente && s.purity < 1) {
      if (this.timers.purityWarn <= 0) {
        this.timers.purityWarn = 4;
        if (!s.story.purezaVacia) {
          s.story.purezaVacia = true;
          this.dialog("purezaVacia");
        } else gameStore.toast("Lávate en el mar de bronce antes de presentar más ofrendas", "warn");
      }
      return;
    }
    if (this.timers.present > 0) return;
    this.timers.present = 0.3;
    c.items.pop();
    if (s.built.fuente) s.purity = Math.max(0, s.purity - 1);
    this.present(top, this.stackTop(c, this.player.rig));
  }

  /** Presentar una ofrenda en el altar: la persona se alegra y deja gozo. */
  private present(it: StackItem, from: THREE.Vector3) {
    const s = this.s;
    s.ofrendas += 1;
    s.served += 1;
    s.altarFuel = Math.max(0.05, s.altarFuel - 0.25);
    let amount = Math.max(1, Math.round((OFFER_GOZO[it.type] || 4) * this.mult()));
    // las primicias: la primera ofrenda del día es para Jehová y vale cinco veces más
    if (this.fiestaHoy()?.fiesta.id === "primicias" && this.primicia !== s.day) {
      this.primicia = s.day;
      amount *= 5;
      gameStore.toast("Las primicias para Jehová: la primera ofrenda del día vale cinco veces más", "gold");
    }
    s.lifetimeGozo += amount;
    this.track("ofrendas");
    this.track(it.type === "cordero" ? "corderos" : it.type === "palomas" ? "palomas" : "cereal");
    const v = this.visitors.find((x) => x.id === it.vid);
    this.flyers.push({
      kind: "item", type: it.type, from, to: ALTAR_TOP.clone(), t: 0, dur: 0.38, arc: 1.4,
      onArrive: () => {
        this.fx.burst(ALTAR_TOP, 1);
        vibrar(18);
        this.audio.offering(it.type);
        this.overlay.float(`+${amount}`, ALTAR_TOP.clone().add(new THREE.Vector3(0, 0.8, 0)));
        this.emitGozo(ALTAR_TOP.clone().add(new THREE.Vector3(0, 0.5, 0)), amount, "basin");
        if (v && (v.state === "waiting" || v.state === "toWait")) this.cheer(v);
      },
    });
    if (!s.story.primeraOfrenda) {
      s.story.primeraOfrenda = true;
      this.dialog("primeraOfrenda");
      this.teach("ofrendas");
    }
  }

  private takeFromPile(id: "lena" | "aceite" | "pan" | "incienso", c: Carrier, rig: Rig) {
    if (this.timers.pick > 0 || this.piles[id] <= 0) return;
    if (!this.canTake(c, id)) {
      if (c.items.length && itemGroup(c.items[0].type) !== id) this.warnCarry(`Llevas ${ITEMS[c.items[0].type].plural}: llévalo a su lugar o devuélvelo`);
      return;
    }
    if (!this.needed(id, c.items.length)) {
      const place = id === "lena" ? "El altar ya tiene toda la leña que cabe" : id === "aceite" ? "Las siete lámparas ya están llenas" : id === "pan" ? "La mesa ya tiene sus doce panes" : "El altar de oro ya tiene su incienso";
      this.warnCarry(`${place}: no hace falta cargar más`);
      return;
    }
    this.timers.pick = 0.11;
    this.piles[id] -= 1;
    c.items.push({ type: id, vid: 0 });
    c.hidden++;
    const [px, pz] = this.pileSpot(id);
    this.flyers.push({ kind: "item", type: id, from: new THREE.Vector3(px, 0.3, pz), to: () => this.stackTop(c, rig), t: 0, dur: 0.26, arc: 0.6, onArrive: () => (c.hidden = Math.max(0, c.hidden - 1)) });
    vibrar(10);
    this.audio.pickup(c.items.length, id);
  }

  private takeDiezmo(c: Carrier, rig: Rig) {
    const have = this.s.piles.diezmo || 0;
    if (this.timers.pick > 0 || have <= 0) return;
    if (!this.canTake(c, "diezmo")) {
      if (c.items.length) this.warnCarry(`Llevas ${ITEMS[c.items[0].type].plural}: entrégalo antes de cargar diezmos`);
      return;
    }
    this.timers.pick = 0.13;
    this.s.piles.diezmo = have - 1;
    c.items.push({ type: "diezmo", vid: 0 });
    c.hidden++;
    this.flyers.push({ kind: "item", type: "diezmo", from: new THREE.Vector3(POS.diezmoPile[0], 0.4, POS.diezmoPile[1]), to: () => this.stackTop(c, rig), t: 0, dur: 0.28, arc: 0.6, onArrive: () => (c.hidden = Math.max(0, c.hidden - 1)) });
    vibrar(10);
    this.audio.pickup(c.items.length, "diezmo");
  }

  /** Entregar en un lugar del Lugar Santo o en las cámaras. */
  private deliver(c: Carrier, type: ItemType, room: () => boolean, apply: () => void, to: THREE.Vector3, gozoEach: number, tithe = false) {
    if (this.timers.pick > 0 || !c.items.length) return;
    const top = c.items[c.items.length - 1];
    if (top.type !== type) return;
    if (!room()) return;
    this.timers.pick = 0.15;
    c.items.pop();
    apply();
    const amount = tithe ? Math.round(6 * this.mult(false)) : gozoEach;
    this.flyers.push({
      kind: "item", type, from: this.stackTop(c, this.player.rig), to: to.clone(), t: 0, dur: 0.32, arc: 0.9,
      onArrive: () => {
        this.fx.sparkle(to, 10, 0.25, 0.8);
        if (amount > 0) {
          this.s.lifetimeGozo += amount;
          this.giveGozo(amount, to);
        }
      },
    });
    this.track(type === "aceite" ? "aceite" : type === "pan" ? "panes" : type === "incienso" ? "incienso" : "diezmos");
    if (type === "aceite") this.audio.lamp();
    else if (type === "diezmo") this.audio.sack();
    else if (type === "incienso") {
      vibrar(10);
      this.audio.pickup(c.items.length + 2, "incienso");
    }
    else this.audio.drop();
  }

  private wash(r: Rig) {
    const s = this.s;
    if (!s.built.fuente || this.timers.wash > 0) return;
    if (s.purity >= this.purityMax() - 0.01) return;
    s.purity = this.purityMax();
    this.timers.wash = 1.2;
    this.fx.splash(new THREE.Vector3(r.x, r.y + 0.6, r.z), 34);
    this.fx.splash(this.vis.stations.fuente.anchors.water, 16);
    vibrar(8);
    this.audio.water();
    this.overlay.float("Pureza llena", this.headPos(r), "blue");
    this.track("lavar");
  }

  private collectGozo() {
    const s = this.s;
    if (this.timers.collect > 0 || s.gozoPile < 1) return;
    this.timers.collect = 0.4;
    const total = Math.floor(s.gozoPile);
    s.gozoPile -= total;
    const n = Math.min(14, Math.max(3, Math.ceil(total / 6)));
    const each = total / n;
    for (let i = 0; i < n; i++)
      this.flyers.push({
        kind: "orb", from: BASIN_TOP.clone().add(new THREE.Vector3(rand(-0.3, 0.3), rand(0, 0.3), rand(-0.3, 0.3))), to: () => this.playerChest(), t: -i * 0.045, dur: 0.45, arc: 1.0,
        onArrive: () => {
          s.gozo += each;
          this.coin();
        },
      });
    this.overlay.float(`+${total}`, this.headPos(this.player.rig));
    if (!s.story.recogio) s.story.recogio = true;
    this.track("gozo", total);
  }

  private coin() {
    const now = this.time;
    this.coinStreak = now - this.coinTime < 0.45 ? this.coinStreak + 1 : 0;
    this.coinTime = now;
    this.audio.coin(this.coinStreak);
  }

  /** Gozo directo al aprendiz (lecciones, preguntas, lámparas...). */
  private giveGozo(amount: number, from: THREE.Vector3) {
    const n = Math.min(10, Math.max(2, Math.ceil(amount / 8)));
    for (let i = 0; i < n; i++)
      this.flyers.push({ kind: "orb", from: from.clone(), to: () => this.playerChest(), t: -i * 0.06, dur: 0.7, arc: 1.6, onArrive: () => {
        this.s.gozo += amount / n;
        this.coin();
      } });
    this.overlay.float(`+${Math.round(amount)}`, from.clone().add(new THREE.Vector3(0, 0.4, 0)));
  }

  /** Luces de gozo que vuelan hasta la fuente del gozo, junto a la puerta. */
  private emitGozo(from: THREE.Vector3, amount: number, to: "basin") {
    const n = Math.min(7, Math.max(2, Math.round(amount / 4)));
    for (let i = 0; i < n; i++)
      this.flyers.push({
        kind: "orb", from: from.clone(), to: BASIN_TOP.clone().add(new THREE.Vector3(rand(-0.25, 0.25), 0.1, rand(-0.25, 0.25))), t: -i * 0.07, dur: 0.95 + Math.random() * 0.3, arc: 3 + Math.random() * 1.5,
        onArrive: () => (this.s.gozoPile += amount / n),
      });
    void to;
  }

  // ---------------------------------------------------------------- círculos para restaurar y llamar levitas
  private refreshPads() {
    const s = this.s;
    const view = progressView(s);
    const want = new Map<string, Omit<Pad, "ring" | "label" | "pop">>();
    for (const def of this.online ? [] : STATIONS) {
      if (s.built[def.id] || !def.requiere(view)) continue;
      want.set(`st:${def.id}`, { key: `st:${def.id}`, kind: "station", id: def.id, cost: def.costo, x: def.pad[0], z: def.pad[1], name: def.nombre });
    }
    for (const def of this.online ? [] : HELPERS) {
      const have = s.helpers[def.id] || 0;
      if (have >= def.costos.length || !def.requiere(view)) continue;
      want.set(`he:${def.id}`, { key: `he:${def.id}`, kind: "helper", id: def.id, cost: def.costos[have], x: def.pad[0], z: def.pad[1], name: def.nombre });
    }
    // quitar los que ya no van
    this.pads = this.pads.filter((p) => {
      const keep = want.has(p.key) && want.get(p.key)!.cost === p.cost;
      if (!keep) {
        this.scene.remove(p.ring.mesh);
        p.ring.dispose();
        this.overlay.remove(p.label);
      }
      return keep;
    });
    for (const [key, d] of want) {
      if (this.pads.some((p) => p.key === key)) continue;
      const ring = new Ring(0.95, d.kind === "station" ? "#ffd25a" : "#9ad1ff", true);
      ring.set(d.x, floorHeight(d.x, d.z), d.z);
      this.scene.add(ring.mesh);
      const label = this.overlay.make("tpl-pad", "");
      this.pads.push({ ...d, ring, label, pop: 0 });
      this.fx.sparkle(new THREE.Vector3(d.x, floorHeight(d.x, d.z) + 0.2, d.z), 16, 0.8, 1);
    }
  }

  private updatePads(dt: number) {
    const s = this.s;
    const r = this.player.rig;
    for (const p of this.pads) {
      const on = dist(r.x, r.z, p.x, p.z) < 0.95;
      p.pop += ((on ? 1 : 0) - p.pop) * Math.min(1, dt * 10);
      if (!on) continue;
      const paid = s.padPaid[p.key] || 0;
      const need = p.cost - paid;
      if (need <= 0.0001) {
        this.completePad(p);
        return;
      }
      if (s.gozo <= 0.0001) continue;
      const rate = Math.max(18, p.cost / 1.3);
      const amt = Math.min(need, rate * dt, s.gozo);
      s.gozo -= amt;
      s.padPaid[p.key] = paid + amt;
      this.timers.payOrb -= dt;
      if (this.timers.payOrb <= 0) {
        this.timers.payOrb = 0.07;
        this.flyers.push({ kind: "orb", from: this.playerChest(), to: new THREE.Vector3(p.x, floorHeight(p.x, p.z) + 0.15, p.z), t: 0, dur: 0.35, arc: 0.8, s: 0.7 });
        this.audio.payTick(paid / Math.max(1, p.cost));
      }
      if (s.padPaid[p.key] >= p.cost - 0.0001) {
        this.completePad(p);
        return;
      }
    }
  }

  private completePad(p: Pad) {
    const s = this.s;
    delete s.padPaid[p.key];
    if (p.kind === "station") this.buildStation(p.id as StationId);
    else this.hireHelper(p.id as HelperId, new THREE.Vector3(p.x, 0, p.z));
    this.refreshPads();
    this.persist();
    this.sendScore();
  }

  private buildStation(id: StationId) {
    const s = this.s;
    s.built[id] = true;
    this.rising.set(id, 0);
    const def = STATIONS.find((d) => d.id === id)!;
    const center = new THREE.Vector3(def.pad[0], floorHeight(def.pad[0], def.pad[1]), def.pad[1]);
    const st = this.vis.stations[id];
    st.built.visible = true;
    st.built.scale.y = 0.01;
    this.fx.dust(center, 2.2, 50);
    this.fx.sparkle(center.clone().add(new THREE.Vector3(0, 0.6, 0)), 50, 1.4, 2);
    vibrar([25, 40, 25]);
    this.audio.build();
    this.shadowDirty = true;
    if (id === "puertas" || id === "santuario") {
      this.navObstacles = this.navRects();
      this.nav.rebuild(this.navObstacles, STATIC_CIRCLES);
    }
    if (def.dialogo) this.dialog(def.dialogo);
    this.teach(def.leccion);
    if (id === "fuente") s.purity = this.purityMax();
    if (id === "altar") gameStore.toast("Ahora carga leña en la leñera y llévala al altar", "info");
  }

  private hireHelper(id: HelperId, at: THREE.Vector3) {
    const s = this.s;
    const n = s.helpers[id] || 0;
    s.helpers[id] = n + 1;
    this.spawnHelper(id, n, [at.x, at.z]);
    const def = HELPERS.find((h) => h.id === id)!;
    this.fx.sparkle(at.clone().add(new THREE.Vector3(0, 0.5, 0)), 40, 0.8, 2);
    vibrar([20, 30, 20]);
    this.audio.hire();
    gameStore.toast(`Llegó: ${def.nombre}. ${def.tarea}`, "gold");
    if (id === "cantor") this.audio.layers.cantores = s.helpers.cantor || 0;
  }

  // ---------------------------------------------------------------- el pueblo
  private spawnVisitors(dt: number) {
    const s = this.s;
    if (!s.built.puertas || !s.story.primerFuego) return;
    if (this.timers.spawn > 0) return;
    let every = 7.2 * Math.pow(0.88, s.upgrades.familias || 0) * (s.helpers.portero ? 0.8 : 1);
    if (this.isNight()) every *= 2.2;
    every *= this.fiestaHoy()?.fiesta.gente ?? 1;
    if (this.pascua > 0) every *= 0.45;
    this.timers.spawn = every * rand(0.75, 1.25);
    if (this.visitors.length >= 46) return;
    const r = Math.random();
    const bearers = this.visitors.filter((v) => v.kind === "diezmo").length;
    if (s.story.pascua && r < 0.28 && bearers < 3) return void this.spawnBearer();
    const asking = this.visitors.some((v) => v.kind === "pregunta");
    // un caso para juzgar: llega cada tanto desde principal de los sacerdotes (Deuteronomio 17:8-9)
    if (!this.online && s.rank >= 3 && s.built.ensenanza && !asking && this.timers.caso <= 0) {
      this.timers.caso = 240;
      this.timers.question = Math.max(this.timers.question, 30);
      return void this.spawnQuestioner(true);
    }
    if (!this.online && s.built.ensenanza && !asking && this.timers.question <= 0 && r < 0.5) {
      this.timers.question = 40;
      return void this.spawnQuestioner();
    }
    if (this.queue.length < this.maxQueue()) this.spawnOffering();
    void dt;
  }

  private newVisitor(kind: Visitor["kind"], x: number, z: number, forced?: { variant: Parameters<Crowd["add"]>[0]; colors: Parameters<Crowd["add"]>[1]; scale: number }): Visitor | null {
    const look = forced || randomVisitor((this.s.stats.jornadas || 0) >= 16 || !!this.fiestaHoy()?.fiesta.peregrinos);
    if (kind === "pregunta" && look.variant === "nino") look.variant = "hombre";
    const handle = this.crowd.add(look.variant, look.colors);
    if (!handle) return null;
    const rig = newRig(x, z, look.scale);
    rig.y = floorHeight(x, z);
    rig.yaw = -Math.PI / 2;
    const v: Visitor = { id: ++this.vid, kind, handle, rig, speed: rand(1.9, 2.4), path: [], state: "toQueue", item: null, wait: -1, timer: 0 };
    this.visitors.push(v);
    // a veces viene un niño con su papá o su mamá
    if ((kind === "ofrenda" || kind === "orante") && look.variant !== "nino" && Math.random() < 0.22) {
      const ch = this.crowd.add("nino", childColors());
      if (ch) {
        const cr = newRig(x + 0.6, z + 0.4, 0.74);
        cr.y = rig.y;
        const child: Visitor = { id: ++this.vid, kind: "nino", handle: ch, rig: cr, speed: v.speed + 0.4, path: [], state: "follow", item: null, wait: -1, timer: 0, parent: v };
        v.child = child;
        this.visitors.push(child);
      }
    }
    return v;
  }

  private spawnOffering() {
    const z = rand(-1.8, 1.8);
    const v = this.newVisitor("ofrenda", POS.spawnOut[0], z);
    if (!v) return;
    const r = Math.random();
    const pref = this.fiestaHoy()?.fiesta.ofrenda;
    const r2 = Math.random();
    v.item = pref && r < 0.6 ? pref : r2 < 0.4 ? "palomas" : r2 < 0.75 ? "cordero" : "cereal";
    v.rig.carrying = true;
    this.queue.push(v);
    const slot = queueSlot(this.queue.length - 1);
    v.path = this.nav.path(v.rig.x, v.rig.z, slot[0], slot[1]);
    v.state = "toQueue";
  }

  private spawnBearer() {
    const v = this.newVisitor("diezmo", POS.spawnOut[0], rand(-1.8, 1.8));
    if (!v) return;
    v.item = "diezmo";
    v.rig.carrying = true;
    v.path = this.nav.path(v.rig.x, v.rig.z, POS.diezmoDrop[0], POS.diezmoDrop[1]);
    v.state = "toDrop";
  }

  private spawnQuestioner(conCaso = false) {
    const v = this.newVisitor("pregunta", POS.spawnOut[0], rand(-1.8, 1.8));
    if (!v) return;
    if (conCaso) v.caso = elegirCaso(this.s.rank, (id) => !!this.s.story[`caso:${id}`])?.id;
    v.path = this.nav.path(v.rig.x, v.rig.z, POS.ensenanzaBench[0], POS.ensenanzaBench[1]);
    v.state = "toBench";
  }

  private spawnOrante() {
    const spot = this.prayTaken.findIndex((x) => x === null);
    if (spot < 0 || this.visitors.length >= 52) return;
    const v = this.newVisitor("orante", rand(31, 34), rand(-2, 2));
    if (!v) return;
    this.prayTaken[spot] = v.id;
    v.wait = spot;
    const [x, z] = PRAY_SPOTS[spot];
    v.path = this.nav.path(v.rig.x, v.rig.z, x, z);
    v.state = "toPray";
  }

  private goWait(v: Visitor) {
    let spot = this.waitTaken.findIndex((x) => x === null);
    let target: V2;
    if (spot >= 0) {
      this.waitTaken[spot] = v.id;
      target = WAIT_SPOTS[spot];
    } else {
      spot = -1;
      target = [rand(22, 27), rand(3, 8.5)];
    }
    v.wait = spot;
    v.path = this.nav.path(v.rig.x, v.rig.z, target[0], target[1]);
    v.state = "toWait";
  }

  private cheer(v: Visitor) {
    if (v.wait >= 0) {
      if (v.kind === "orante") this.prayTaken[v.wait] = null;
      else this.waitTaken[v.wait] = null;
      v.wait = -1;
    }
    v.state = "cheer";
    v.timer = 1.5;
    v.rig.pose = "cheer";
    this.fx.sparkle(this.headPos(v.rig), 14, 0.35, 1.2);
    if (v.child) {
      v.child.rig.pose = "cheer";
      v.child.timer = 1.5;
    }
  }

  private leave(v: Visitor) {
    v.rig.pose = "idle";
    v.state = "leaving";
    v.path = this.nav.path(v.rig.x, v.rig.z, POS.spawnOut[0] + 0.5, rand(-1.6, 1.6));
  }

  private despawn(v: Visitor) {
    this.crowd.remove(v.handle);
    if (v.bubble) this.overlay.remove(v.bubble);
    const qi = this.queue.indexOf(v);
    if (qi >= 0) this.queue.splice(qi, 1);
    if (v.wait >= 0) {
      if (v.kind === "orante") this.prayTaken[v.wait] = null;
      else this.waitTaken[v.wait] = null;
    }
    this.visitors.splice(this.visitors.indexOf(v), 1);
    if (v.child) this.despawn(v.child);
  }

  /** Camina siguiendo el camino; devuelve true al llegar. */
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
    r.y = floorHeight(r.x, r.z);
    return path.length === 0;
  }

  /** Va derecho hacia un punto, deslizándose por los obstáculos (para quien sigue a otro). */
  private follow(r: Rig, tx: number, tz: number, speed: number, dt: number) {
    const dx = tx - r.x, dz = tz - r.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.02) return;
    const step = Math.min(d, speed * dt * Math.min(1.6, 0.6 + d));
    let nx = r.x + (dx / d) * step, nz = r.z + (dz / d) * step;
    [nx, nz] = collide(nx, nz, 0.22, this.navObstacles, STATIC_CIRCLES);
    if (!walkableArea(nx, nz)) return;
    const moved = Math.hypot(nx - r.x, nz - r.z);
    r.x = nx;
    r.z = nz;
    r.y = floorHeight(nx, nz);
    r.phase += (moved * 7.2) / r.scale;
    r.yaw = turn(r.yaw, Math.atan2(dx, dz), dt * 10);
    r.moving = Math.min(1, r.moving + dt * 6);
  }
  private navObstacles: Rect[] = [];

  private face(r: Rig, yaw: number, dt: number) {
    r.yaw = turn(r.yaw, yaw, dt * 6);
  }

  private updateVisitors(dt: number) {
    const WEST = -Math.PI / 2;
    for (let i = this.visitors.length - 1; i >= 0; i--) {
      const v = this.visitors[i];
      if (!v) continue;
      const r = v.rig;
      r.t += dt;
      switch (v.state) {
        case "toQueue":
        case "queue": {
          const idx = this.queue.indexOf(v);
          const slot = queueSlot(Math.max(0, idx));
          if (v.path.length) v.path[v.path.length - 1] = slot;
          if (v.state === "toQueue") {
            if (this.walk(r, v.path, v.speed, dt)) {
              if (dist(r.x, r.z, slot[0], slot[1]) < 0.3) v.state = "queue";
              else v.path = [slot];
            }
          } else {
            if (dist(r.x, r.z, slot[0], slot[1]) > 0.04) {
              v.path = [slot];
              this.walk(r, v.path, v.speed, dt);
            } else {
              r.moving = Math.max(0, r.moving - dt * 6);
              this.face(r, WEST, dt);
            }
          }
          r.carrying = !!v.item;
          break;
        }
        case "toWait":
          if (this.walk(r, v.path, v.speed, dt)) v.state = "waiting";
          break;
        case "waiting":
          this.face(r, WEST, dt);
          r.pose = Math.sin(r.t * 0.6 + v.id) > 0.85 ? "bow" : "idle";
          break;
        case "cheer":
          v.timer -= dt;
          r.moving = 0;
          if (v.timer <= 0) this.leave(v);
          break;
        case "leaving":
          if (this.walk(r, v.path, v.speed * 1.1, dt)) {
            if (v.kind === "nino" && v.parent) break;
            this.despawn(v);
          }
          break;
        case "toDrop":
          if (this.walk(r, v.path, v.speed, dt)) v.state = "dropping";
          break;
        case "dropping":
          this.face(r, Math.atan2(POS.diezmoPile[0] - r.x, POS.diezmoPile[1] - r.z), dt);
          if ((this.s.piles.diezmo || 0) < PILE_CAP.diezmo && v.item) {
            const it = v.item;
            v.item = null;
            r.carrying = false;
            this.s.piles.diezmo = (this.s.piles.diezmo || 0) + 1;
            this.flyers.push({ kind: "item", type: it, from: this.headPos(r).add(new THREE.Vector3(0, -0.5, 0)), to: new THREE.Vector3(POS.diezmoPile[0], 0.4, POS.diezmoPile[1]), t: 0, dur: 0.4, arc: 0.8 });
            this.cheer(v);
            v.timer = 0.9;
          }
          break;
        case "toBench":
          if (this.walk(r, v.path, v.speed, dt)) {
            v.state = "seated";
            r.pose = "sit";
            v.bubble = this.overlay.make(v.caso ? "tpl-bub gold" : "tpl-bub", v.caso ? "⚖" : "?");
          }
          break;
        case "seated":
          this.face(r, 0, dt);
          break;
        case "toPray":
          if (this.walk(r, v.path, v.speed, dt)) {
            v.state = "praying";
            r.pose = "kneel";
          }
          break;
        case "praying":
          this.face(r, WEST, dt);
          if (!this.prayer) this.cheer(v);
          break;
        case "follow": {
          const p = v.parent;
          if (!p || !this.visitors.includes(p)) {
            this.despawn(v);
            break;
          }
          if (p.state === "cheer") {
            r.pose = "cheer";
            r.moving = 0;
            break;
          }
          r.pose = p.rig.pose === "kneel" ? "kneel" : "idle";
          const bx = p.rig.x - Math.sin(p.rig.yaw) * 0.45 + Math.cos(p.rig.yaw) * 0.38;
          const bz = p.rig.z - Math.cos(p.rig.yaw) * 0.45 - Math.sin(p.rig.yaw) * 0.38;
          if (dist(r.x, r.z, bx, bz) > 0.12) this.follow(r, bx, bz, Math.max(v.speed, p.speed * 1.25), dt);
          else {
            r.moving = Math.max(0, r.moving - dt * 6);
            this.face(r, p.rig.yaw, dt);
          }
          break;
        }
        default:
          break;
      }
      if (v.state !== "cheer" && v.state !== "seated" && v.state !== "praying" && v.state !== "follow" && r.pose === "cheer") r.pose = "idle";
    }
  }

  // ---------------------------------------------------------------- enseñanza
  private askQuestioner() {
    const v = this.visitors.find((x) => x.kind === "pregunta" && x.state === "seated");
    if (!v) return;
    if (v.caso && casoPorId(v.caso)) {
      gameStore.push({ kind: "juicio", casoId: v.caso });
      return;
    }
    const q = this.pickQuiz();
    if (!q) return;
    (v as Visitor & { quiz?: string }).quiz = q;
    gameStore.push({ kind: "quiz", quizId: q, source: "pueblo" });
  }

  private finishQuestioner(alegre = true) {
    const v = this.visitors.find((x) => x.kind === "pregunta" && x.state === "seated");
    if (!v) return;
    if (v.bubble) this.overlay.remove(v.bubble);
    v.bubble = undefined;
    v.rig.pose = "idle";
    // tras un juicio injusto se va triste, sin alegrarse
    if (alegre) this.cheer(v);
    else this.leave(v);
  }

  private pickQuiz(): string | null {
    const learned = new Set(LESSON_ORDER.filter((l) => this.s.lessons.includes(l)).map((l) => LESSONS[l]?.quiz).filter(Boolean) as string[]);
    const open = QUIZZES.filter((q) => this.s.quizzes[q.id] !== true);
    const pref = open.filter((q) => learned.has(q.id));
    const pool = pref.length ? pref : open.length ? open : QUIZZES;
    return pool[Math.floor(Math.random() * pool.length)]?.id || null;
  }

  // ---------------------------------------------------------------- Azarías
  private rankReady() {
    if (this.online) return false;
    const next = this.s.rank + 1;
    return next <= 4 && RANKS[next].requiere(progressView(this.s));
  }

  private talkAzarias() {
    // en línea, Azarías trae las preguntas difíciles del servidor
    if (this.online) return this.online.ask();
    if (this.rankReady()) return this.startRankUp();
    if (this.s.pendingQuiz) {
      gameStore.push({ kind: "quiz", quizId: this.s.pendingQuiz, source: "azarias" });
      return;
    }
    if (this.timers.quizCool <= 0) {
      const q = this.pickQuiz();
      if (q) {
        this.s.pendingQuiz = q;
        gameStore.push({ kind: "quiz", quizId: q, source: "azarias" });
        return;
      }
    }
    const next = RANKS[this.s.rank + 1];
    gameStore.toast(next ? `Azarías: «${next.requisito}»` : "Azarías: «Sirve con gozo en la casa de Jehová»", "info");
  }

  private startRankUp() {
    const next = this.s.rank + 1;
    if (next === 4) {
      if (this.timers.examCool > 0) {
        gameStore.toast("Azarías: «Repasa tu Libro del aprendiz y vuelve en un momento»", "info");
        return;
      }
      const pool = LESSON_ORDER.map((l) => LESSONS[l]?.quiz).filter((q): q is string => !!q && this.s.lessons.some((l) => LESSONS[l]?.quiz === q));
      const base = pool.length >= 3 ? pool : QUIZZES.map((q) => q.id);
      const pick: string[] = [];
      while (pick.length < 3) {
        const q = base[Math.floor(Math.random() * base.length)];
        if (!pick.includes(q)) pick.push(q);
      }
      this.examQuizzes = pick;
      this.examOk = [false, false, false];
      this.dialog("examen");
      pick.forEach((q, i) => gameStore.push({ kind: "quiz", quizId: q, source: "examen", step: i }));
      return;
    }
    this.applyRank(next);
  }

  private finishExam() {
    if (this.examOk.every(Boolean)) this.applyRank(4);
    else {
      this.timers.examCool = 30;
      gameStore.toast("Azarías: «Casi. Repasa tu Libro del aprendiz y vuelve a intentarlo»", "info");
    }
  }

  private applyRank(next: number) {
    const s = this.s;
    s.rank = next;
    s.story[`rango${next}`] = true;
    this.player.fig.setLook(RANK_LOOK[next]);
    this.ceremony = 1;
    vibrar([30, 60, 30, 60, 60]);
    this.audio.rank();
    this.fx.sparkle(this.playerChest(), 80, 1.0, 2.4);
    this.dialog(`rango${next}`);
    if (next === 1) this.teach("sacerdote");
    if (next === 4) this.teach("sumo");
    gameStore.push({ kind: "rank", rank: next });
    this.postEvent("rango", next);
    this.refreshPads();
    this.persist();
    this.sendScore();
  }

  // ---------------------------------------------------------------- levitas
  private helperHome(id: HelperId, n: number): V2 {
    if (id === "cantor") return CHOIR_SPOTS[n] || CHOIR_SPOTS[0];
    return HELPER_HOME[id] || POS.start;
  }

  private spawnHelper(id: HelperId, n: number, at?: V2) {
    const def = HELPERS.find((h) => h.id === id)!;
    const handle = this.crowd.add("levita", leviteColors(def.sash));
    if (!handle) return;
    const home = this.helperHome(id, n);
    const start = id === "cantor" ? home : at || home;
    const rig = newRig(start[0], start[1], 1);
    rig.y = floorHeight(start[0], start[1]);
    const h: HelperE = { id, n, handle, rig, carry: { items: [], hidden: 0, cap: id === "lenero" ? 4 : 3 }, path: [], state: "idle", timer: 0.4, washes: 0 };
    if (id === "cantor") {
      rig.y = CHOIR_FLOOR;
      rig.yaw = Math.PI;
      rig.pose = "play";
      h.state = "stand";
      h.prop = instrument(n % 3);
      this.scene.add(h.prop);
      this.audio.layers.cantores = this.s.helpers.cantor || 0;
    }
    if (id === "portero") {
      h.state = "stand";
      rig.yaw = Math.PI / 2;
    }
    this.helpers.push(h);
  }

  private fetchDef(id: HelperId): { src: PileId; from: V2; to: V2; item: ItemType } | null {
    switch (id) {
      case "lenero":
        return { src: "lena", from: [POS.lenaPile[0] + 0.7, POS.lenaPile[1] + 0.3], to: [4.95, -2.35], item: "lena" };
      case "aceitero":
        return { src: "aceite", from: [POS.prensaPile[0] + 0.7, POS.prensaPile[1] - 0.2], to: [-7.0, 1.2], item: "aceite" };
      case "panadero":
        return { src: "pan", from: [POS.hornoPile[0] + 0.7, POS.hornoPile[1] - 0.2], to: [-7.0, -1.2], item: "pan" };
      case "incensario":
        return { src: "incienso", from: [POS.camInciensoPile[0] + 0.7, POS.camInciensoPile[1] + 0.2], to: [-9.0, 0.7], item: "incienso" };
      case "conanias":
        return { src: "diezmo", from: [POS.diezmoPile[0] - 0.6, POS.diezmoPile[1] - 0.4], to: [POS.camarasDoor[0] + 0.8, POS.camarasDoor[1]], item: "diezmo" };
      default:
        return null;
    }
  }

  private pileCount(id: PileId) {
    return id === "diezmo" ? this.s.piles.diezmo || 0 : this.piles[id] || 0;
  }

  private destRoom(id: HelperId): number {
    const s = this.s;
    switch (id) {
      case "lenero":
        return s.built.altar ? Math.floor(this.fuelMax() - s.altarFuel - 0.5) : 0;
      case "aceitero":
        return Math.floor(LAMPS - s.lampOil + 0.02);
      case "panadero":
        return BREAD - s.bread;
      case "incensario":
        return INCENSE_MAX - s.incense;
      case "conanias":
        return 99;
      default:
        return 0;
    }
  }

  private updateHelpers(dt: number) {
    const dil = this.diligence();
    const speed = 2.7 * dil;
    for (const h of this.helpers) {
      const r = h.rig;
      r.t += dt;
      h.timer -= dt;
      r.carrying = h.carry.items.length > 0;
      if (h.state === "stand") {
        r.moving = 0;
        continue;
      }
      if (h.id === "ayudante") {
        this.updateAyudante(h, dt, speed, dil);
        continue;
      }
      const f = this.fetchDef(h.id);
      if (!f) continue;
      switch (h.state) {
        case "idle": {
          const home = this.helperHome(h.id, h.n);
          if (!this.walk(r, h.path, speed, dt)) break;
          if (h.timer > 0) break;
          h.timer = 0.6;
          if (h.carry.items.length && this.destRoom(h.id) > 0) {
            h.path = this.nav.path(r.x, r.z, f.to[0], f.to[1]);
            h.state = "toDst";
          } else if (!h.carry.items.length && this.pileCount(f.src) > 0 && this.destRoom(h.id) > 0) {
            h.path = this.nav.path(r.x, r.z, f.from[0], f.from[1]);
            h.state = "toSrc";
          } else if (dist(r.x, r.z, home[0], home[1]) > 0.3) h.path = this.nav.path(r.x, r.z, home[0], home[1]);
          break;
        }
        case "toSrc":
          if (this.walk(r, h.path, speed, dt)) {
            h.state = "load";
            h.timer = 0;
          }
          break;
        case "load":
          if (h.timer > 0) break;
          if (h.carry.items.length < Math.min(h.carry.cap, this.destRoom(h.id)) && this.pileCount(f.src) > 0) {
            h.timer = 0.25 / dil;
            if (f.src === "diezmo") this.s.piles.diezmo = (this.s.piles.diezmo || 0) - 1;
            else this.piles[f.src] -= 1;
            h.carry.items.push({ type: f.item, vid: 0 });
            h.carry.hidden++;
            const [px, pz] = this.pileSpot(f.src);
            const c = h.carry;
            this.flyers.push({ kind: "item", type: f.item, from: new THREE.Vector3(px, 0.3, pz), to: () => this.stackTop(c, r), t: 0, dur: 0.26, arc: 0.6, onArrive: () => (c.hidden = Math.max(0, c.hidden - 1)) });
          } else if (h.carry.items.length) {
            h.path = this.nav.path(r.x, r.z, f.to[0], f.to[1]);
            h.state = "toDst";
          } else h.state = "idle";
          break;
        case "toDst":
          if (this.walk(r, h.path, speed, dt)) {
            h.state = "unload";
            h.timer = 0;
          }
          break;
        case "unload": {
          if (h.timer > 0) break;
          if (!h.carry.items.length) {
            h.state = "idle";
            h.timer = 0.2;
            break;
          }
          if (this.destRoom(h.id) <= 0) {
            if (h.timer < -2) h.state = "idle";
            break;
          }
          h.timer = 0.3 / dil;
          const it = h.carry.items.pop()!;
          const from = this.stackTop(h.carry, r);
          this.helperDeliver(h.id, it.type, from);
          break;
        }
        default:
          h.state = "idle";
      }
    }
  }

  private helperDeliver(id: HelperId, type: ItemType, from: THREE.Vector3) {
    const s = this.s;
    let to: THREE.Vector3;
    this.track(type === "lena" ? "lena" : type === "aceite" ? "aceite" : type === "pan" ? "panes" : type === "incienso" ? "incienso" : "diezmos", 1, false);
    switch (id) {
      case "lenero":
        s.altarFuel = Math.min(this.fuelMax(), s.altarFuel + 1);
        to = ALTAR_TOP.clone();
        if (!s.story.primerFuego && s.built.altar) s.story.primerFuego = true;
        break;
      case "aceitero":
        s.lampOil = Math.min(LAMPS, s.lampOil + 1);
        to = this.vis.stations.candelero.anchors.lamp3.clone();
        break;
      case "panadero":
        s.bread = Math.min(BREAD, s.bread + 1);
        to = this.vis.stations.mesa.anchors[`pan${Math.min(11, s.bread - 1)}`].clone();
        break;
      case "incensario":
        s.incense = Math.min(INCENSE_MAX, s.incense + 1);
        to = this.vis.stations.altarIncienso.anchors.top.clone();
        break;
      default: {
        s.abundance += 1;
        const amount = Math.round(6 * this.mult(false));
        s.lifetimeGozo += amount;
        s.gozoPile += amount;
        to = new THREE.Vector3(POS.camarasDoor[0], 0.6, POS.camarasDoor[1] - 1);
        this.syncHeaps();
      }
    }
    this.flyers.push({ kind: "item", type, from, to, t: 0, dur: 0.32, arc: 0.8 });
  }

  private updateAyudante(h: HelperE, dt: number, speed: number, dil: number) {
    const r = h.rig;
    const s = this.s;
    const recv: V2 = [POS.reception[0] + 0.1, POS.reception[1] - 0.85];
    const altarSpot: V2 = [5.3, 1.3];
    const washSpot: V2 = [2.9, 7.0];
    switch (h.state) {
      case "idle": {
        if (!this.walk(r, h.path, speed, dt) || h.timer > 0) break;
        h.timer = 0.5;
        if (h.washes >= 4 && s.built.fuente) {
          h.path = this.nav.path(r.x, r.z, washSpot[0], washSpot[1]);
          h.state = "toWash";
        } else if (h.carry.items.length) {
          h.path = this.nav.path(r.x, r.z, altarSpot[0], altarSpot[1]);
          h.state = "toDst";
        } else if (this.queue[0] && this.queue[0].state === "queue" && s.altarFuel > 0) {
          h.path = this.nav.path(r.x, r.z, recv[0], recv[1]);
          h.state = "toSrc";
        } else {
          const home = this.helperHome("ayudante", 0);
          if (dist(r.x, r.z, home[0], home[1]) > 0.3) h.path = this.nav.path(r.x, r.z, home[0], home[1]);
        }
        break;
      }
      case "toSrc":
        if (this.walk(r, h.path, speed, dt)) {
          h.state = "load";
          h.timer = 0.3;
        }
        break;
      case "load": {
        this.face(r, Math.PI / 2, dt);
        if (h.timer > 0) break;
        const before = h.carry.items.length;
        if (before < h.carry.cap) this.receive(h.carry, r, false);
        if (h.carry.items.length > before) {
          h.timer = 0.45 / dil;
          h.waited = 0;
          break;
        }
        h.waited = (h.waited || 0) + 0.2;
        h.timer = 0.2;
        if (h.carry.items.length && (h.carry.items.length >= h.carry.cap || h.waited > 1.6)) {
          h.path = this.nav.path(r.x, r.z, altarSpot[0], altarSpot[1]);
          h.state = "toDst";
        } else if (!h.carry.items.length && h.waited > 3) h.state = "idle";
        break;
      }
      case "toDst":
        if (this.walk(r, h.path, speed, dt)) {
          h.state = "unload";
          h.timer = 0.2;
        }
        break;
      case "unload":
        this.face(r, Math.atan2(POS.altar[0] - r.x, POS.altar[1] - r.z), dt);
        if (h.timer > 0) break;
        if (!h.carry.items.length) {
          h.state = "idle";
          break;
        }
        if (s.altarFuel <= 0) {
          h.timer = 0.5;
          break;
        }
        h.timer = 0.5 / dil;
        this.present(h.carry.items.pop()!, this.stackTop(h.carry, r));
        h.washes++;
        break;
      case "toWash":
        if (this.walk(r, h.path, speed, dt)) {
          h.state = "wash";
          h.timer = 1.2;
          this.fx.splash(new THREE.Vector3(r.x, 0.8, r.z), 20);
        }
        break;
      case "wash":
        this.face(r, Math.atan2(POS.fuente[0] - r.x, POS.fuente[1] - r.z), dt);
        if (h.timer <= 0) {
          h.washes = 0;
          h.state = "idle";
        }
        break;
      default:
        h.state = "idle";
    }
  }

  // ---------------------------------------------------------------- el rey Ezequías
  private startKingVisit() {
    const s = this.s;
    s.story.visitaRey = true;
    s.kingOfrendas = s.ofrendas;
    const fig = new Figure("rey");
    const rig = newRig(POS.spawnOut[0], 0, 1.05);
    this.scene.add(fig.root);
    const nobles: Visitor[] = [];
    for (let i = 0; i < 2; i++) {
      const v = this.newVisitor("noble", POS.spawnOut[0] + 1 + i, i ? 0.8 : -0.8, { variant: "noble", colors: nobleColors(), scale: 1 });
      if (v) {
        v.state = "toKing";
        nobles.push(v);
      }
    }
    this.king = { fig, rig, path: this.nav.path(rig.x, rig.z, POS.rey[0], POS.rey[1]), state: "in", timer: 0, nobles };
    gameStore.toast("¡Viene el rey Ezequías con los príncipes!", "gold");
    this.audio.king();
  }

  private updateKing(dt: number) {
    const k = this.king;
    if (!k) return;
    const r = k.rig;
    r.t += dt;
    if (k.state === "in") {
      if (this.walk(r, k.path, 2.0, dt)) {
        k.state = "stay";
        k.timer = 14;
        this.dialog("visitaRey");
        // el pueblo trae sacrificios y alabanzas (2 Crónicas 29:31)
        for (let i = 0; i < 6; i++) setTimeout(() => this.running && this.queue.length < MAX_QUEUE && this.spawnOffering(), 300 + i * 450);
      }
    } else if (k.state === "stay") {
      this.face(r, Math.atan2(POS.altar[0] - r.x, POS.altar[1] - r.z), dt);
      k.timer -= dt;
      r.pose = Math.sin(r.t * 0.7) > 0.6 ? "bow" : "idle";
      if (k.timer <= 0) {
        k.state = "out";
        r.pose = "idle";
        k.path = this.nav.path(r.x, r.z, POS.spawnOut[0] + 0.5, 0);
      }
    } else if (this.walk(r, k.path, 2.2, dt)) {
      this.scene.remove(k.fig.root);
      k.fig.dispose();
      for (const n of k.nobles) if (this.visitors.includes(n)) this.despawn(n);
      this.king = null;
      return;
    }
    // los príncipes lo siguen
    k.nobles.forEach((n, i) => {
      const side = i ? 1 : -1;
      const bx = r.x - Math.sin(r.yaw) * 1.0 + Math.cos(r.yaw) * 0.7 * side;
      const bz = r.z - Math.cos(r.yaw) * 1.0 - Math.sin(r.yaw) * 0.7 * side;
      if (dist(n.rig.x, n.rig.z, bx, bz) > 0.15) this.follow(n.rig, bx, bz, 2.6, dt);
      else {
        n.rig.moving = Math.max(0, n.rig.moving - dt * 6);
        this.face(n.rig, r.yaw, dt);
      }
      n.rig.pose = r.pose;
    });
  }

  // ---------------------------------------------------------------- presencia en el templo en línea
  /** Lo que lleva en las manos, para verlo sobre su cabeza (índice de ACTIVIDADES). */
  private actividad(): number {
    const t = this.player.carry.items[0]?.type;
    if (!t) return 0;
    if (t === "lena") return 1;
    if (t === "aceite") return 2;
    if (t === "pan") return 3;
    if (t === "incienso") return 4;
    if (t === "diezmo") return 6;
    return 5;
  }

  private enviarPosicion(dt: number) {
    if (!this.red) return;
    this.redEnvioT += dt;
    if (this.redEnvioT < RED_TICK_MS / 1000) return;
    this.redEnvioT = 0;
    const r = this.player.rig;
    const u = this.redUltimo;
    const a = this.actividad();
    const now = performance.now();
    const movio = Math.hypot(r.x - u.x, r.z - u.z) > 0.05 || Math.abs(r.yaw - u.ry) > 0.08 || a !== u.a;
    if (!movio && now - u.t < 4000) return;
    this.red.enviar({ t: "pos", x: Math.round(r.x * 100) / 100, z: Math.round(r.z * 100) / 100, ry: Math.round(r.yaw * 100) / 100, m: r.moving > 0.3 ? 1 : 0, l: "templo", a });
    u.x = r.x;
    u.z = r.z;
    u.ry = r.yaw;
    u.a = a;
    u.t = now;
  }

  // ---------------------------------------------------------------- instrucción del sacerdote (por dentro)
  private instPaso(): PasoInst | null {
    return this.inst ? this.inst.pasos[this.inst.i] ?? null : null;
  }

  /** Azarías camina al lugar del paso y espera a un costado. */
  private instGuiar() {
    const p = this.instPaso();
    if (!p) return;
    const a = this.azarias.rig;
    let [x, z] = [p.donde[0] - 1.1, p.donde[1] + (p.donde[1] >= 0 ? -1.0 : 1.0)];
    if (!walkableArea(x, z)) [x, z] = p.donde;
    this.azaRuta = this.nav.path(a.x, a.z, x, z);
  }

  private azaVolver() {
    const a = this.azarias.rig;
    this.azaRuta = this.nav.path(a.x, a.z, POS.azarias[0], POS.azarias[1]);
  }

  /** Dónde se hace la tarea del paso (según lo que lleva el aprendiz). */
  private instDondeTarea(p: PasoInst): V2 {
    const lleva = this.player.carry.items[0]?.type;
    switch (p.tarea?.deber ?? p.tarea?.cargar) {
      case "lena":
        return p.tarea?.deber && lleva === "lena" ? POS.altar : POS.lenaPile;
      case "ofrendas":
        return lleva && isOffering(lleva) ? POS.altar : POS.reception;
      case "aceite":
        return lleva === "aceite" ? POS.candeleroSpot : POS.prensaPile;
      case "panes":
        return lleva === "pan" ? POS.mesaSpot : POS.hornoPile;
      case "incienso":
        return lleva === "incienso" ? POS.altarInciensoSpot : POS.camInciensoPile;
      default:
        return p.donde;
    }
  }

  /** Antes de pedir un servicio, se hace lugar (las lámparas llenas no reciben más aceite). */
  private instHacerLugar(p: PasoInst) {
    const s = this.s;
    switch (p.tarea?.deber) {
      case "lena":
        if (s.altarFuel > this.fuelMax() - 1) s.altarFuel = Math.max(0, this.fuelMax() - 2);
        break;
      case "aceite":
        if (s.lampOil > LAMPS - 1) s.lampOil = LAMPS - 2;
        break;
      case "panes":
        if (s.bread > BREAD - 1) s.bread = BREAD - 2;
        break;
      case "incienso":
        if (s.incense > INCENSE_MAX - 1) s.incense = INCENSE_MAX - 2;
        break;
    }
  }

  private instTareaHecha(p: PasoInst): boolean {
    if (p.tarea?.cargar) return this.player.carry.items[0]?.type === p.tarea.cargar;
    return this.instDeber;
  }

  private instTick(dt: number) {
    if (this.azaRuta.length && this.walk(this.azarias.rig, this.azaRuta, 3.8, dt)) this.azaRuta = [];
    const it = this.inst;
    const p = this.instPaso();
    if (!it || !p || gameStore.busy) return;
    const r = this.player.rig;
    if (it.fase === "ir" && dist(r.x, r.z, p.donde[0], p.donde[1]) < 2.6) {
      it.fase = "hablar";
      this.audio.page();
      gameStore.push({ kind: "dialog", id: `inst:paso:${p.id}`, lines: lineasDe(p) });
    } else if (it.fase === "tarea" && this.instTareaHecha(p)) this.instPreguntar();
  }

  private instPreguntar() {
    const it = this.inst;
    const p = this.instPaso();
    if (!it || !p) return;
    it.fase = "pregunta";
    this.instOk = false;
    gameStore.push({ kind: "quiz", quizId: p.pregunta, source: "instruccion" });
  }

  private instDialogoCerrado(id: string) {
    const it = this.inst;
    if (id.startsWith("inst:fin:")) {
      const parte = Number(id.slice(9));
      this.inst = null;
      // quien está obligado sigue con la parte siguiente; quien repasa, termina aquí
      if (this.opts.instruccion?.obligatoria && parte < 3) this.empezarInstruccion(parte + 1);
      else this.azaVolver();
      this.pushHud();
      return;
    }
    if (!it) return;
    if (id.startsWith("inst:inicio:")) {
      it.fase = "ir";
      this.instGuiar();
    } else if (id.startsWith("inst:paso:")) {
      const p = this.instPaso();
      if (!p) return;
      if (p.tarea && !this.instTareaHecha(p)) {
        it.fase = "tarea";
        this.instHacerLugar(p);
      } else this.instPreguntar();
    }
    this.updateObjective();
    this.pushHud();
  }

  private instPreguntaCerrada() {
    const it = this.inst;
    if (!it || it.fase !== "pregunta") return;
    if (!this.instOk) {
      // se lee la explicación y se responde otra vez
      gameStore.toast("Azarías: «Léelo con calma y responde otra vez»", "info");
      this.instPreguntar();
      return;
    }
    it.i++;
    this.instDeber = false;
    if (it.i >= it.pasos.length) {
      void this.instTerminarParte();
      return;
    }
    it.fase = "ir";
    this.instGuiar();
    this.updateObjective();
    this.pushHud();
  }

  private async instTerminarParte() {
    const it = this.inst;
    if (!it) return;
    it.fase = "fin";
    const parte = it.parte;
    const ok = (await this.opts.instruccion?.alTerminarParte(parte)) ?? false;
    if (ok) this.instPartes = Math.max(this.instPartes, parte);
    vibrar([25, 40, 25]);
    this.audio.rank();
    this.fx.sparkle(this.playerChest(), 30, 0.6);
    gameStore.push({ kind: "dialog", id: `inst:fin:${parte}`, lines: lineasFin(parte, this.opts.instruccion?.nombre || "sacerdote") });
    this.pushHud();
  }

  // ---------------------------------------------------------------- historia
  private dialog(id: string) {
    const lines = DIALOGUES[id];
    if (lines) gameStore.push({ kind: "dialog", id, lines });
  }

  private teach(lessonId: string) {
    if (!LESSONS[lessonId]) return;
    const first = !this.s.lessons.includes(lessonId);
    if (first) this.s.lessons.push(lessonId);
    gameStore.push({ kind: "lesson", lessonId });
    const q = LESSONS[lessonId].quiz;
    if (q && this.s.quizzes[q] !== true && !this.s.pendingQuiz) this.s.pendingQuiz = q;
  }

  private storyTriggers() {
    const s = this.s;
    if (this.online) {
      if (this.instPendiente && !gameStore.busy && this.timers.slow === 0 && this.s.playSeconds > 2.5) this.empezarInstruccion();
      this.audio.layers.night = this.isNight();
      this.audio.setRadio(document.documentElement.classList.contains("radio-mini-open"));
      this.audio.layers.event = this.hourIndex() >= 0 || this.fiestaFestiva();
      return;
    }
    this.ensureJornada();
    this.ensureDaily();
    this.checkGoals();
    this.checkLogros();
    this.syncAdornos();
    if (s.built.fuente && !s.story.levitas) {
      s.story.levitas = true;
      this.dialog("levitas");
      this.teach("levitas");
    }
    if (this.rankReady() && !s.story[`listo${s.rank + 1}`]) {
      s.story[`listo${s.rank + 1}`] = true;
      this.dialog("rangoListo");
    }
    if (!s.story.visitaRey && s.built.coro && (s.helpers.cantor || 0) >= 1 && !this.king && !gameStore.busy) this.startKingVisit();
    if (s.story.visitaRey && !this.king && s.rank >= 2 && !s.story.pascuaInicio && s.ofrendas >= s.kingOfrendas + 12) {
      s.story.pascuaInicio = true;
      this.pascua = 150;
      this.dialog("pascua");
      this.audio.trumpet(true);
    }
    // si Azarías no tiene pregunta, prepara una cada tanto
    if (!s.pendingQuiz && this.timers.quizCool <= 0 && s.built.altar && s.lessons.length > 2) {
      const q = this.pickQuiz();
      if (q) s.pendingQuiz = q;
    }
    this.audio.layers.night = this.isNight();
    this.audio.setRadio(document.documentElement.classList.contains("radio-mini-open"));
    this.audio.layers.event = this.pascua > 0 || this.hourIndex() >= 0 || this.fiestaFestiva();
  }

  private onModalClosed = (m: Modal) => {
    if (m.kind === "dialog" && m.id.startsWith("inst:")) this.instDialogoCerrado(m.id);
    if (m.kind === "quiz" && m.source === "instruccion") this.instPreguntaCerrada();
    if (m.kind === "quiz" && m.source === "examen" && m.step === 2) this.finishExam();
    if (m.kind === "quiz" && m.source === "pueblo") this.finishQuestioner();
    if (m.kind === "juicio") this.finishQuestioner(this.ultimoJuicio);
    if (m.kind === "rank") this.ceremony = 0;
    if (m.kind === "dialog" && m.id === "expiacion" && this.finale) {
      this.finale.phase = "tear";
      this.finale.t = 0;
      this.audio.veilTear();
    }
    if (m.kind === "finale") {
      this.finale = null;
      this.player.fig.setLook(RANK_LOOK[this.s.rank]);
      this.navObstacles = this.navRects();
      this.nav.rebuild(this.navObstacles, STATIC_CIRCLES);
    }
    this.updateObjective();
  };

  // ---------------------------------------------------------------- avance sin fin
  /** Cuenta algo que pasó: avanza la jornada, el desafío del día y las cuentas de los logros. */
  private track(kind: GoalKind | StatKey, n = 1, byPlayer = true) {
    const s = this.s;
    if (byPlayer && this.inst && this.inst.fase !== "pregunta" && this.instPaso()?.tarea?.deber === kind) this.instDeber = true;
    if (this.online) {
      const deber = DEBER_DE[kind];
      if (deber && byPlayer) this.online.duty(deber, n);
      return;
    }
    const stat: StatKey | null = kind === "noche" ? "noches" : kind === "fuegoVivo" ? null : (kind as StatKey);
    if (stat) s.stats[stat] = (s.stats[stat] || 0) + n;
    if (!byPlayer) {
      // lo que hace un levita cuenta para la jornada solo si es justo su tarea
      const helperFor: Partial<Record<string, HelperId>> = { lena: "lenero", aceite: "aceitero", panes: "panadero", incienso: "incensario", diezmos: "conanias" };
      const h = helperFor[kind];
      if (!h || !(s.helpers[h] || 0)) return;
    }
    for (const g of s.jornada.goals) if (g.kind === kind && g.progress < g.target) g.progress = Math.min(g.target, g.progress + n);
    if (!s.daily.done) for (const g of s.daily.goals) if (g.kind === kind && g.progress < g.target) g.progress = Math.min(g.target, g.progress + n);
  }

  /** La primera jornada empieza después de la primera ofrenda (antes va la enseñanza inicial). */
  private ensureJornada() {
    const s = this.s;
    if (!s.story.primeraOfrenda || s.jornada.goals.length) return;
    this.startJornada(Math.max(1, (s.stats.jornadas || 0) + 1));
  }

  private startJornada(n: number) {
    const s = this.s;
    s.jornada = { n, goals: makeGoals(n, progressView(s), n * 7919 + 17), startedAt: s.playSeconds, stars: s.jornada.stars };
    if (n > 1 || s.stats.jornadas) gameStore.toast(`Jornada ${n}: ${s.jornada.goals.map((g) => goalDef(g.kind).texto(g.target)).join(" · ")}`, "info");
  }

  private checkGoals() {
    const s = this.s;
    if (s.jornada.goals.length && s.jornada.goals.every((g) => g.progress >= g.target)) this.completeJornada();
    if (!s.daily.done && s.daily.goals.length && s.daily.goals.every((g) => g.progress >= g.target)) this.completeDaily();
  }

  private completeJornada() {
    const s = this.s;
    const j = s.jornada;
    const seconds = Math.max(0, s.playSeconds - j.startedAt);
    const stars = starsFor(j.goals, seconds);
    const reward = jornadaReward(j.n, stars);
    s.stats.jornadas = (s.stats.jornadas || 0) + 1;
    s.stats.estrellas = (s.stats.estrellas || 0) + stars;
    const starsStr = j.stars + String(stars);
    s.lifetimeGozo += reward;
    this.giveGozo(reward, this.playerChest());
    const adorno = ADORNOS.find((a) => a.jornada === s.stats.jornadas) || null;
    if (adorno) this.adornoRise.set(adorno.id, 0);
    gameStore.push({ kind: "jornada", n: j.n, stars, reward, adorno: adorno ? adorno.id : null, seconds });
    this.audio.jornada(stars);
    this.fx.sparkle(this.playerChest(), 50, 0.9, 2.2);
    if (j.n % 10 === 0) this.postEvent("jornada", j.n);
    s.jornada = { n: j.n + 1, goals: [], startedAt: s.playSeconds, stars: starsStr };
    this.startJornada(j.n + 1);
    this.persist();
    this.sendScore();
  }

  /** Un desafío nuevo cada día (el mismo para todos ese día). */
  private ensureDaily() {
    const s = this.s;
    const key = todayKey();
    if (s.daily.key === key || !s.story.primeraOfrenda) return;
    s.daily = { ...s.daily, key, goals: makeGoals(0, progressView(s), daySeed(key), true), done: false };
  }

  private completeDaily() {
    const s = this.s;
    const d = s.daily;
    d.done = true;
    const yesterday = todayKey(new Date(Date.now() - 86400000));
    d.streak = d.lastDone === yesterday ? d.streak + 1 : d.lastDone === d.key ? d.streak : 1;
    d.lastDone = d.key;
    s.stats.racha = Math.max(s.stats.racha || 0, d.streak);
    const reward = dailyReward(d.streak);
    s.lifetimeGozo += reward;
    this.giveGozo(reward, this.playerChest());
    this.audio.jornada(3);
    gameStore.toast(`¡Desafío del día cumplido! Racha de ${d.streak} ${d.streak === 1 ? "día" : "días"} seguidos · +${reward} de gozo`, "gold");
    if ([7, 30, 100, 365].includes(d.streak)) this.postEvent("racha", d.streak);
    this.persist();
  }

  private storyFlag(id: string) {
    const s = this.s;
    if (id === "puertas") return !!s.built.puertas;
    if (id === "todo") return STATION_IDS.every((st) => s.built[st]);
    if (id === "levitasTodos") return HELPERS.every((h) => (s.helpers[h.id] || 0) >= h.costos.length);
    return !!s.story[id];
  }

  private checkLogros() {
    const s = this.s;
    s.stats.dias = Math.max(s.stats.dias || 0, s.day);
    const nuevos: string[] = [];
    for (const def of LOGROS) {
      const lv = logroNivel(def, s.stats, (id) => this.storyFlag(id));
      const had = s.logros[def.id] || 0;
      if (lv <= had) continue;
      s.logros[def.id] = lv;
      nuevos.push(def.historia ? `🏆 ${def.nombre}` : `🏆 ${def.nombre} · copa de ${COPA[lv - 1]}`);
      if (lv === 3 && this.logrosReady) this.postEvent("copa", def.id);
      if (this.logrosReady) this.audio.logro(def.historia ? 3 : lv);
    }
    if (!nuevos.length) {
      this.logrosReady = true;
      return;
    }
    if (!this.logrosReady && nuevos.length > 2) gameStore.toast(`🏆 Ganaste ${nuevos.length} logros: míralos en tu Libro`, "gold");
    else for (const n of nuevos.slice(0, 3)) gameStore.toast(`Logro: ${n.replace("🏆 ", "")}`, "gold");
    this.logrosReady = true;
    this.persist();
  }

  /** Un logro para la actividad de la comunidad (se manda de a uno). */
  private postEvent(tipo: string, valor: number | string) {
    if (!this.opts.loggedIn) return;
    this.eventQueue.push({ tipo, valor });
  }

  private async sendEvent(tipo: string, valor: number | string) {
    try {
      await saveRemote(this.s);
      await fetch(`/api/juegos/${GAME_SLUG}/logro`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, valor }),
      });
    } catch {
      /* sin conexión: no pasa nada */
    }
  }

  /** Quién va primero esta semana y tu puesto (cada dos minutos, solo con cuenta). */
  private async fetchLiga() {
    if (!this.opts.loggedIn) return;
    try {
      const res = await fetch(`/api/juegos/${GAME_SLUG}/ranking?periodo=semana`, { credentials: "include" });
      if (!res.ok) return;
      const b = await res.json();
      const top = b?.top?.[0];
      this.liga = { lider: top ? String(top.name) : null, liderPuntos: top ? Number(top.score) : 0, puesto: b?.mine ? Number(b.mine.rank) : null, puntos: b?.mine ? Number(b.mine.best) : 0 };
    } catch {
      /* sin conexión */
    }
  }

  /** Muestra los adornos ganados y, al ganar uno, lo levanta con brillo. */
  private syncAdornos() {
    const done = this.s.stats.jornadas || 0;
    for (const a of ADORNOS) {
      const g = this.vis.adornos[a.id];
      if (!g) continue;
      const on = done >= a.jornada;
      if (on && !g.visible) {
        g.visible = true;
        if (!this.adornoRise.has(a.id)) g.scale.y = 1;
        this.shadowDirty = true;
      }
      if (a.id === "cantores" && on && !this.choirExtra.length) {
        for (let i = 0; i < 3; i++) {
          const h = this.crowd.add("levita", leviteColors(["#5b2a6e", "#2f5aa8", "#a33b2c"][i]));
          if (h) this.choirExtra.push(h);
        }
      }
    }
  }

  // ---------------------------------------------------------------- calendario hebreo y fiestas
  /** La fiesta de hoy (la principal), o null. */
  fiestaHoy(): FiestaHoy | null {
    return this.fecha?.fiestas[0] || null;
  }

  private fiestaFestiva() {
    const f = this.fiestaHoy();
    return !!f && !f.fiesta.solemne && f.fiesta.id !== "lunaNueva";
  }

  /** Al amanecer: si empieza una fiesta, se anuncia (la primera vez, con su enseñanza). */
  private anunciarFiesta() {
    const f = this.fiestaHoy();
    if (!f) return;
    const d = f.fiesta;
    if (!this.online) this.track("fiestas");
    if (d.id === "lunaNueva" || d.id === "trompetas") this.audio.trumpet(true);
    if (f.dia > 1) {
      if (f.ultimo) gameStore.toast(`${d.icono} Último día: ${d.nombre}`, "gold");
      return;
    }
    const clave = `fiesta:${d.id}`;
    if (!this.online && d.id !== "lunaNueva" && !this.s.story[clave]) {
      this.s.story[clave] = true;
      gameStore.push({ kind: "fiesta", id: d.id });
    } else gameStore.toast(`${d.icono} ${d.nombre}: ${d.efecto}`, d.solemne ? "info" : "gold");
  }

  /** La tristeza del pueblo pasa con las mañanas (Salmo 30:5). */
  private alegriaDeLaManana() {
    const s = this.s;
    if (!(s.tristeza > 0)) return;
    s.tristeza -= 1;
    gameStore.toast(s.tristeza ? "La tristeza del pueblo va pasando" : "«Y a la mañana vendrá la alegría» (Salmo 30:5): el pueblo vuelve a alegrarse", "info");
  }

  /** Las enramadas del gran atrio se levantan en la fiesta de los tabernáculos. */
  private syncEnramadas() {
    const f = this.fiestaHoy();
    const on = !!f && (f.fiesta.id === "tabernaculos" || f.fiesta.id === "asamblea");
    if (on === this.enramadas) return;
    this.enramadas = on;
    const g = this.vis.adornos.enramadas;
    if (g) g.visible = on;
    this.shadowDirty = true;
  }

  /** Una vez al año, en el Día de la Expiación, el sumo sacerdote vuelve a entrar al Lugar Santísimo (Hebreos 9:7). */
  private expiacionAnual() {
    const s = this.s;
    s.story[`expiacion${this.fecha.anio}`] = true;
    const premio = Math.round(500 * (1 + genBonus(s)));
    s.lifetimeGozo += premio;
    this.giveGozo(premio, this.playerChest());
    vibrar([30, 60, 30, 60, 60]);
    this.audio.rank();
    this.fx.sparkle(this.playerChest(), 80, 1.0, 2.4);
    gameStore.push({
      kind: "dialog",
      id: "expiacionAnual",
      lines: [
        { quien: "azarias", texto: "Hoy es el Día de la Expiación. Una vez al año, el sumo sacerdote entra con la sangre al Lugar Santísimo por los pecados del pueblo.", ref: "Levítico 16:34" },
        { quien: "azarias", texto: "Pero no lo olvides: Cristo entró una vez para siempre con su propia sangre, y por él tenemos libertad para acercarnos a Dios.", ref: "Hebreos 9:12; 10:19" },
      ],
    });
    this.persist();
    this.pushHud();
  }

  // ---------------------------------------------------------------- juicios del sacerdote
  /** Sentencia de un caso. Justa: gozo (más si se examinó la pista clave). Injusta: tristeza del pueblo. */
  juzgar(casoId: string, opcion: number, pistas: number[]): { justa: boolean; gozo: number; clave: boolean } {
    const c = casoPorId(casoId);
    const s = this.s;
    if (!c) return { justa: false, gozo: 0, clave: false };
    const justa = !!c.opciones[opcion]?.justa;
    const clave = pistas.some((i) => !!c.pistas[i]?.clave);
    let gozo = 0;
    if (justa) {
      gozo = Math.round((40 + 25 * s.rank) * (clave ? 1.5 : 1) * (1 + genBonus(s)));
      s.lifetimeGozo += gozo;
      this.giveGozo(gozo, this.playerChest());
      vibrar(15);
      this.audio.correct();
      this.fx.sparkle(this.playerChest(), 30, 0.6);
      s.story[`caso:${c.id}`] = true;
      this.track("juicios");
      if (s.tristeza > 0) s.tristeza -= 1;
    } else {
      s.tristeza = Math.min(3, (s.tristeza || 0) + 1);
      this.audio.wrong();
    }
    this.ultimoJuicio = justa;
    this.persist();
    this.pushHud();
    return { justa, gozo, clave };
  }

  // ---------------------------------------------------------------- el Día de la Expiación
  private startFinale() {
    if (this.finale) return;
    this.finale = { phase: "prep", t: 0 };
    const r = this.player.rig;
    this.player.fig.setLook("lino");
    this.fx.splash(new THREE.Vector3(r.x, r.y + 0.8, r.z), 40);
    this.fx.sparkle(this.playerChest(), 60, 0.7, 2);
    vibrar(8);
    this.audio.water();
    this.dialog("expiacion");
  }

  private updateFinale(dt: number) {
    const f = this.finale;
    if (!f || f.phase !== "tear") return;
    f.t += dt;
    if (f.t > 4.2 && f.phase === "tear") {
      f.phase = "done";
      this.s.finale = true;
      this.s.story.finale = true;
      this.teach("expiacion");
      gameStore.push({ kind: "finale" });
      this.postEvent("final", 1);
      this.persist();
      this.sendScore();
      if (this.opts.loggedIn) void saveRemote(this.s);
    }
  }

  // ---------------------------------------------------------------- objetivo
  private updateObjective() {
    const s = this.s;
    const c = this.player.carry;
    const o = this.objective;
    const set = (text: string, target: V2 | THREE.Vector3 | null, zone: ZoneId | null = null, pad: string | null = null) => {
      o.text = text;
      o.zone = zone;
      o.pad = pad;
      if (!target) o.target = null;
      else if (target instanceof THREE.Vector3) o.target = target;
      else o.target = new THREE.Vector3(target[0], floorHeight(target[0], target[1]), target[1]);
    };
    const padFor = (key: string) => this.pads.find((p) => p.key === key);
    const carrying = c.items.length ? c.items[0].type : null;
    if (this.finale) return set("El Día de la Expiación", null);
    if (this.inst) {
      const it = this.inst;
      const p = this.instPaso();
      if (p && it.fase === "ir") return set(`Instrucción ${it.parte}/3: sigue a Azarías a ${p.lugar}`, p.donde, null);
      if (p && it.fase === "tarea" && p.tarea) return set(`Instrucción: ${p.tarea.texto}`, this.instDondeTarea(p), null);
    }
    if (!s.built.puertas) return set("Párate en el círculo dorado de la puerta para abrir el templo", POS.reception, null, "st:puertas");
    if (!s.built.lenera) return set("Restaura la leñera: párate en su círculo dorado", STATIONS[1].pad, null, "st:lenera");
    if (!s.built.altar) return set("Restaura el altar de bronce", STATIONS[2].pad, null, "st:altar");
    if (s.altarFuel <= 0) {
      if (carrying === "lena") return set(s.story.primerFuego ? "¡Aviva el fuego! Lleva la leña al altar" : "Lleva la leña al altar para encenderlo", POS.altar, "altar");
      return set(s.story.primerFuego ? "¡Se apagó el fuego! Carga leña en la leñera" : "Carga leña en la leñera", POS.lenaPile, "lena");
    }
    if (carrying && isOffering(carrying) && s.built.fuente && s.purity < 1) return set("Lávate en el mar de bronce para seguir presentando ofrendas", POS.fuente, "fuente");
    if (this.rankReady()) return set(`Ve con Azarías: estás listo para ser ${RANKS[s.rank + 1].nombre.toLowerCase()}`, POS.azarias, "azarias");
    if (s.rank >= 4 && s.story.rango4 && !s.finale) return set("Párate frente al altar del incienso: es el Día de la Expiación", POS.expiacionSpot, "expiacion");
    if (s.finale && this.zoneOn("expiacion")) return set("Hoy es el Día de la Expiación: entra una vez al año al Lugar Santísimo", POS.expiacionSpot, "expiacion");
    if (carrying) {
      switch (itemGroup(carrying)) {
        case "ofrenda":
          return set("Presenta las ofrendas en el altar", POS.altar, "altar");
        case "lena":
          return set("Lleva la leña al altar", POS.altar, "altar");
        case "aceite":
          return set("Lleva el aceite al candelero de oro", POS.candeleroSpot, "candelero");
        case "pan":
          return set("Pon los panes en la mesa de oro", POS.mesaSpot, "mesa");
        case "incienso":
          return set("Lleva el incienso al altar de oro", POS.altarInciensoSpot, "altarIncienso");
        case "diezmo":
          return set("Guarda los diezmos en las cámaras", POS.camarasDoor, "camaras");
      }
    }
    if (this.online) {
      if (s.lampOil < LAMPS - 0.5 && s.time > 0.6 && s.time < DUSK) return set("Llena las siete lámparas antes de que anochezca", POS.prensaPile, "aceite");
      if (this.queue.length >= 3) return set("Recibe las ofrendas del pueblo en la puerta", POS.reception, "reception");
      if (this.online.ready()) return set("Azarías tiene una pregunta difícil para ti", POS.azarias, "azarias");
      if (this.queue.length) return set("Recibe las ofrendas del pueblo en la puerta", POS.reception, "reception");
      return set("Sirve en el templo: cada deber suma mérito a tu temporada", null);
    }
    if (this.visitors.some((v) => v.caso && v.state === "seated")) return set("Un caso espera tu juicio en el lugar de enseñanza", POS.ensenanzaSpot, "ensenanza");
    if (!s.story.primeraOfrenda) return set("Recibe la ofrenda en la puerta del atrio", POS.reception, "reception");
    if (s.gozoPile >= 1 && !s.story.recogio) return set("Recoge el gozo en la fuente dorada, junto a la puerta", POS.gozoBasin, "basin");
    if (s.pendingQuiz && s.lessons.length > 1 && s.sabiduria < 2) return set("Azarías tiene una pregunta para ti", POS.azarias, "azarias");
    if (s.built.candelero && s.lampOil < LAMPS - 0.5 && (s.time > 0.6 && s.time < DUSK)) return set("Llena las siete lámparas antes de que anochezca", POS.prensaPile, "aceite");
    // el siguiente círculo para restaurar
    const pads = this.pads.filter((p) => p.kind === "station").sort((a, b) => a.cost - b.cost);
    const next = pads[0];
    if (next) {
      const need = next.cost - (s.padPaid[next.key] || 0);
      if (s.gozo >= need) return set(`Restaura: ${next.name}`, [next.x, next.z], null, next.key);
      return set(`Junta ${Math.ceil(need - s.gozo)} de gozo para restaurar: ${next.name}`, s.gozoPile >= 5 ? POS.gozoBasin : POS.reception, s.gozoPile >= 5 ? "basin" : "reception");
    }
    const helperPad = this.pads.find((p) => p.kind === "helper" && s.gozo >= p.cost - (s.padPaid[p.key] || 0));
    if (helperPad) return set(`Llama a: ${helperPad.name}`, [helperPad.x, helperPad.z], null, helperPad.key);
    const nextRank = RANKS[s.rank + 1];
    if (nextRank) return set(nextRank.requisito, s.pendingQuiz ? POS.azarias : null, s.pendingQuiz ? "azarias" : null);
    if (padFor("he:cantor")) return set("Llama más cantores", null);
    return set(s.finale ? "El camino está abierto: sigue sirviendo con gozo" : "Sirve con gozo en la casa de Jehová", null);
  }

  // ================================================================ dibujo
  private animate(dt: number, live: boolean, now: number) {
    const s = this.s;
    this.updateSky();
    this.updateCamera(dt);
    this.updateFade(dt);
    this.animateStations(dt);
    this.animateAdornos(dt);

    // personajes
    this.shadows.begin();
    this.items.begin();
    const p = this.player;
    if (!live) p.rig.moving = Math.max(0, p.rig.moving - dt * 6);
    p.rig.t += dt;
    p.rig.pose = this.ceremony > 0 ? "offer" : this.finale ? "idle" : "idle";
    p.fig.update(p.rig);
    this.shadows.add(p.rig.x, p.rig.y, p.rig.z, 1.1);
    this.drawStack(p.carry, p.rig, p.vx, p.vz);

    const a = this.azarias;
    a.rig.t += dt;
    const dA = dist(a.rig.x, a.rig.z, p.rig.x, p.rig.z);
    if (!this.azaRuta.length) this.face(a.rig, dA < 7 ? Math.atan2(p.rig.x - a.rig.x, p.rig.z - a.rig.z) : Math.PI / 2, dt);
    a.rig.pose = this.rankReady() ? "offer" : "idle";
    a.fig.update(a.rig);
    this.shadows.add(a.rig.x, a.rig.y, a.rig.z, 1.1);
    const mark = this.online ? (this.online.ready() ? "?" : "") : this.rankReady() ? "★" : s.pendingQuiz ? "?" : "";
    if (mark && !this.finale) {
      if (a.bubble.textContent !== mark) a.bubble.textContent = mark;
      this.overlay.place(a.bubble, this.headPos(a.rig).add(new THREE.Vector3(0, 0.55, 0)));
    } else a.bubble.style.display = "none";

    this.presencia?.animar(dt, p.rig);
    if (this.king) {
      this.king.fig.update(this.king.rig);
      this.shadows.add(this.king.rig.x, this.king.rig.y, this.king.rig.z, 1.15);
    }
    for (const v of this.visitors) {
      if (!live) v.rig.moving = Math.max(0, v.rig.moving - dt * 6);
      if (!live) v.rig.t += dt;
      this.crowd.update(v.handle, v.rig);
      this.shadows.add(v.rig.x, v.rig.y, v.rig.z, v.rig.scale);
      if (v.item) this.items.add(v.item, v.rig.x + Math.sin(v.rig.yaw) * 0.36 * v.rig.scale, v.rig.y + 0.6 * v.rig.scale, v.rig.z + Math.cos(v.rig.yaw) * 0.36 * v.rig.scale, v.rig.yaw, 0.95);
      if (v.bubble) this.overlay.place(v.bubble, this.headPos(v.rig).add(new THREE.Vector3(0, 0.3, 0)));
    }
    for (const h of this.helpers) {
      if (!live) h.rig.t += dt;
      this.crowd.update(h.handle, h.rig);
      this.shadows.add(h.rig.x, h.rig.y, h.rig.z, 1);
      this.drawStack(h.carry, h.rig, 0, 0);
      if (h.prop) {
        h.prop.position.set(h.rig.x + Math.sin(h.rig.yaw) * 0.32, h.rig.y + 0.38 + Math.sin(h.rig.t * 6) * 0.02, h.rig.z + Math.cos(h.rig.yaw) * 0.32);
        h.prop.rotation.y = h.rig.yaw;
      }
    }
    this.crowd.flush();
    this.shadows.end();

    this.drawPiles();
    this.drawFlyers(dt, live);
    this.items.end();

    this.effects(dt);
    this.fx.update(dt);
    this.updateAmbience();
    this.updateLabels(dt);
    this.updateArrow();
    this.overlay.update(now);
    this.audio.update();
    if (this.shadowDirty) {
      this.renderer.shadowMap.needsUpdate = true;
      this.shadowDirty = false;
    }
  }

  private drawStack(c: Carrier, r: Rig, vx: number, vz: number) {
    const n = c.items.length - c.hidden;
    if (n <= 0) return;
    let y = r.y + 0.6 * r.scale;
    const fx = Math.sin(r.yaw), fz = Math.cos(r.yaw);
    for (let i = 0; i < n; i++) {
      const it = c.items[i];
      const lag = i * 0.012;
      const wob = Math.sin(r.t * 3 + i * 0.6) * 0.008 * i * r.moving;
      this.items.add(it.type, r.x + fx * 0.38 - vx * lag + wob, y, r.z + fz * 0.38 - vz * lag, r.yaw + (i % 2 ? 0.08 : -0.06));
      y += ITEM_HEIGHT[it.type];
    }
  }

  private drawPiles() {
    const grid = (t: ItemType, cx: number, cz: number, n: number, cols: number, rows: number, dx: number, dz: number, h: number, y0 = 0, yaw = 0) => {
      for (let i = 0; i < n; i++) {
        const per = cols * rows;
        const layer = Math.floor(i / per), k = i % per;
        const col = k % cols, row = Math.floor(k / cols);
        this.items.add(t, cx + (col - (cols - 1) / 2) * dx, y0 + layer * h, cz + (row - (rows - 1) / 2) * dz, yaw + (layer % 2) * 0.1);
      }
    };
    const s = this.s;
    if (s.built.lenera) grid("lena", POS.lenaPile[0], POS.lenaPile[1], this.piles.lena, 2, 2, 0.5, 0.24, 0.15);
    if (s.built.prensa) grid("aceite", POS.prensaPile[0], POS.prensaPile[1], this.piles.aceite, 3, 3, 0.28, 0.28, 0.3);
    if (s.built.horno) grid("pan", POS.hornoPile[0], POS.hornoPile[1], this.piles.pan, 3, 2, 0.34, 0.34, 0.075);
    if (s.built.camIncienso) grid("incienso", POS.camInciensoPile[0], POS.camInciensoPile[1], this.piles.incienso, 3, 3, 0.3, 0.3, 0.15);
    if (s.story.pascua) grid("diezmo", POS.diezmoPile[0], POS.diezmoPile[1], s.piles.diezmo || 0, 3, 2, 0.38, 0.36, 0.3, 0.16);
    // leña sobre el altar
    if (s.built.altar) {
      const logs = Math.min(8, Math.ceil(s.altarFuel));
      for (let i = 0; i < logs; i++) {
        const layer = Math.floor(i / 2), side = i % 2 ? 1 : -1;
        const along = layer % 2 === 0;
        this.items.add("lena", POS.altar[0] + (along ? 0 : side * 0.35), 1.5 + layer * 0.1, POS.altar[1] + (along ? side * 0.35 : 0), along ? 0 : Math.PI / 2, 1.5);
      }
    }
    // doce panes en dos hileras
    if (s.built.mesa) for (let i = 0; i < s.bread; i++) this.items.add("pan", ...(this.vis.stations.mesa.anchors[`pan${i}`].toArray() as [number, number, number]), 0, 0.9);
  }

  private updateFlyers(dt: number) {
    for (let i = this.flyers.length - 1; i >= 0; i--) {
      const f = this.flyers[i];
      f.t += dt;
      if (f.t >= f.dur) {
        this.flyers.splice(i, 1);
        f.onArrive?.();
      }
    }
  }

  private drawFlyers(dt: number, live: boolean) {
    const pos = new THREE.Vector3();
    for (const f of this.flyers) {
      if (f.t < 0) continue;
      const k = Math.min(1, f.t / f.dur);
      const to = typeof f.to === "function" ? f.to() : f.to;
      pos.lerpVectors(f.from, to, k);
      pos.y += Math.sin(k * Math.PI) * f.arc;
      if (f.kind === "orb") this.fx.orb(pos.x, pos.y, pos.z, f.s || 1);
      else if (f.type) this.items.add(f.type, pos.x, pos.y - 0.1, pos.z, k * 4, 1);
    }
    void dt;
    void live;
  }

  private effects(dt: number) {
    const s = this.s;
    const night = this.isNight();
    // fuego del altar
    const fuel = s.built.altar ? s.altarFuel : 0;
    const ratio = fuel > 0 ? 0.35 + 0.65 * Math.min(1, fuel / this.fuelMax()) : 0;
    this.fx.fire("altar", this.vis.stations.altar.anchors.fire, ratio, dt, 0.95);
    const flick = 0.85 + Math.sin(this.time * 17) * 0.06 + Math.sin(this.time * 7.3) * 0.08;
    this.fireLight.intensity = fuel > 0 ? (night ? 26 : 12) * ratio * flick : 0;
    // las siete lámparas
    const lit = this.lampsLit() || (!!s.built.candelero && this.finale !== null);
    this.lampLight.intensity = lit ? 9 * flick : 0;
    if (lit) for (let i = 0; i < LAMPS; i++) this.fx.flame(`lamp${i}`, this.vis.stations.candelero.anchors[`lamp${i}`], dt, 0.8);
    // antorchas de noche
    if (night || s.time > DUSK - 0.05) {
      for (let i = 0; i < this.vis.torches.length; i++) this.fx.flame(`t${i}`, this.vis.torches[i], dt, 1.6);
      if (this.vis.adornos.braseros?.visible) for (let i = 0; i < this.vis.braseros.length; i++) this.fx.flame(`b${i}`, this.vis.braseros[i], dt, 2.2);
    }
    // incienso
    if (s.built.altarIncienso && (s.incense > 0 || this.prayer)) this.fx.incense("inc", this.vis.stations.altarIncienso.anchors.top, dt, this.prayer ? 3 : 0.8);
    // horno y prensa
    if (s.built.horno) {
      const g = this.vis.ovenGlow.material as THREE.MeshBasicMaterial;
      g.color.setRGB(1, 0.45 + 0.1 * Math.sin(this.time * 9), 0.12);
      if (this.piles.pan < PILE_CAP.pan) this.fx.incense("oven", new THREE.Vector3(POS.horno[0] - 0.4, 1.65, POS.horno[1]), dt, 0.5);
    }
    if (s.built.prensa && this.piles.aceite < PILE_CAP.aceite) this.vis.millstone.rotation.y += dt * 0.9;
    // fuente del gozo
    if (s.gozoPile >= 1) this.fx.shimmer("basin", BASIN_TOP, dt, 0.35, 5 + Math.min(20, s.gozoPile / 10));
    // ceremonia: lluvia de luz sobre el aprendiz
    if (this.ceremony > 0) this.fx.rain(new THREE.Vector3(this.player.rig.x, this.player.rig.y, this.player.rig.z), dt);
    // Lugar Santísimo
    const f = this.finale;
    if (f || s.finale) {
      const open = s.finale ? 1 : f && f.phase === "tear" ? Math.min(1, Math.max(0, (f.t - 1.3) / 1.6)) : 0;
      const tearK = s.finale ? 0 : f && f.phase === "tear" ? Math.min(1, f.t / 1.2) : 0;
      const tear = this.vis.veil.tear;
      tear.visible = tearK > 0 && open < 1;
      tear.scale.y = Math.max(0.0001, tearK);
      tear.position.y = TEMPLE.floor + (TEMPLE.height - 0.05) * (1 - tearK / 2);
      this.vis.veil.left.scale.z = 1 - 0.8 * open;
      this.vis.veil.right.scale.z = 1 - 0.8 * open;
      this.vis.holiest.visible = open > 0 || !!f;
      this.holyLight.intensity = (f ? 14 : 5) * open;
      if (f && f.phase !== "prep") this.fx.cloud(new THREE.Vector3(POS.arca[0] + 0.6, TEMPLE.floor + 0.3, 0), dt, 2.2);
      if (f && f.phase === "prep") this.fx.incense("cens", this.playerChest().add(new THREE.Vector3(-0.2, -0.3, -0.2)), dt, 2);
    } else {
      this.vis.holiest.visible = false;
      this.holyLight.intensity = 0;
    }
  }

  /** Lo que se oye depende de dónde estás: el fuego cerca del altar, el agua junto al mar, el pueblo en la puerta. */
  private updateAmbience() {
    const s = this.s;
    const lx = this.camTarget.x, lz = this.camTarget.z;
    const near = (x: number, z: number, r: number) => Math.max(0, 1 - dist(lx, lz, x, z) / r);
    const fuel = s.built.altar ? s.altarFuel : 0;
    const fire = fuel > 0 ? near(POS.altar[0], POS.altar[1], 13) * (0.45 + 0.55 * Math.min(1, fuel / this.fuelMax())) : 0;
    const water = s.built.fuente ? near(POS.fuente[0], POS.fuente[1], 8) : 0;
    const crowd = this.visitors.length * (0.35 + 0.65 * near(22, 0, 26));
    const night = this.isNight();
    this.audio.ambience({ crowd, fire, water, night, day: s.day });
    const lambs = this.queue.filter((v) => v.item === "cordero").length;
    if (near(18, 0, 16) > 0) this.audio.ambientBleat(lambs);
  }

  private animateAdornos(dt: number) {
    for (const [id, t0] of this.adornoRise) {
      const g = this.vis.adornos[id];
      if (!g) {
        this.adornoRise.delete(id);
        continue;
      }
      const t = t0 + dt;
      const k = Math.min(1, t / 1.1);
      g.visible = true;
      g.scale.y = Math.max(0.01, easeOutBack(k));
      if (t0 === 0) this.fx.sparkle(this.playerChest(), 30, 1.2, 2);
      this.shadowDirty = true;
      if (k >= 1) {
        g.scale.y = 1;
        this.adornoRise.delete(id);
      } else this.adornoRise.set(id, t);
    }
    // el coro de Asaf: tres levitas más tocando atrás de la plataforma
    this.choirExtra.forEach((h, i) => {
      const rig = this.choirRigs[i] || (this.choirRigs[i] = newRig(6.9 + i * 1.3, 11.6, 1));
      rig.y = CHOIR_FLOOR;
      rig.yaw = Math.PI;
      rig.pose = "play";
      rig.t += dt;
      this.crowd.update(h, rig);
    });
  }
  private choirRigs: Rig[] = [];

  private animateStations(dt: number) {
    for (const [id, t0] of this.rising) {
      const t = t0 + dt;
      const st = this.vis.stations[id];
      const k = Math.min(1, t / 0.9);
      st.built.scale.y = Math.max(0.01, easeOutBack(k));
      st.ruin.visible = k < 0.35;
      this.shadowDirty = true;
      if (k >= 1) {
        st.built.scale.y = 1;
        this.rising.delete(id);
      } else this.rising.set(id, t);
    }
    // puertas
    const gateT = this.s.built.puertas ? 1 : 0;
    const holyT = this.s.built.santuario ? 1 : 0;
    const moveDoor = (cur: number, target: number) => cur + (target - cur) * Math.min(1, dt * 2.5);
    const g = moveDoor(this.doors.gate, gateT), hD = moveDoor(this.doors.holy, holyT);
    if (Math.abs(g - this.doors.gate) > 1e-4 || Math.abs(hD - this.doors.holy) > 1e-4) this.shadowDirty = true;
    this.doors.gate = g;
    this.doors.holy = hD;
    this.vis.gateDoors.forEach((d, i) => (d.rotation.y = -(i === 0 ? -1 : 1) * (Math.PI / 2) * g));
    this.vis.holyDoors.forEach((d, i) => (d.rotation.y = -(i === 0 ? -1 : 1) * (Math.PI / 2) * 0.92 * hD));
  }

  /** Muestra lo restaurado y lo abandonado según la partida. */
  private syncStations(initial = false) {
    for (const id of STATION_IDS) {
      const st = this.vis.stations[id];
      const built = !!this.s.built[id];
      st.built.visible = built;
      st.built.scale.y = 1;
      st.ruin.visible = !built;
    }
    if (initial) {
      this.doors.gate = this.s.built.puertas ? 1 : 0;
      this.doors.holy = this.s.built.santuario ? 1 : 0;
    }
    this.syncHeaps();
    this.shadowDirty = true;
  }

  private syncHeaps() {
    const a = this.s.abundance;
    this.vis.heaps.forEach((hp, i) => {
      const k = Math.min(1.6, Math.max(0, (a - i * 6) / 20));
      hp.scale.setScalar(k > 0 ? 0.3 + k : 0.001);
      hp.visible = k > 0;
    });
    this.shadowDirty = true;
  }

  private updateFade(dt: number) {
    const r = this.player.rig;
    const inside = insideTemple(r.x, r.z) || !!this.finale;
    const target = inside ? 0.08 : 1;
    const prev = this.fade;
    this.fade += (target - this.fade) * Math.min(1, dt * 6);
    if (Math.abs(this.fade - prev) > 0.002) {
      for (const m of fadeMaterials) {
        m.opacity = this.fade;
        m.depthWrite = this.fade > 0.95;
      }
      const cast = this.fade > 0.5;
      for (const m of this.vis.fadeMeshes) if (m.castShadow !== cast) {
        m.castShadow = cast;
        this.shadowDirty = true;
      }
    }
    // techo del Lugar Santísimo: solo se abre al final (y después, cuando entras)
    const hr = this.vis.holiestRoof.material as THREE.MeshLambertMaterial;
    const holyOpen = !!this.finale || (this.s.finale && inside);
    const ht = holyOpen ? 0.06 : 1;
    const nv = hr.opacity + (ht - hr.opacity) * Math.min(1, dt * 4);
    if (Math.abs(nv - hr.opacity) > 0.002) {
      hr.opacity = nv;
      hr.depthWrite = nv > 0.95;
      this.vis.holiestRoof.castShadow = nv > 0.5;
    }
  }

  private updateCamera(dt: number) {
    const r = this.player.rig;
    const portrait = this.camera.aspect < 0.85;
    // más cerca que antes (el aprendiz se ve el doble en el teléfono) y con el acercamiento del jugador
    let dist = (portrait ? 18.5 : this.camera.aspect < 1.2 ? 17.5 : 16) * (insideTemple(r.x, r.z) ? 0.8 : 1) * this.entrada.zoom;
    let th = 0.36, ph = 0.98;
    const focus = new THREE.Vector3(r.x + this.player.vx * 0.22, r.y, r.z + this.player.vz * 0.22);
    if (this.ceremony > 0) {
      dist = 6.5;
      ph = 0.42;
      th = 0.36 + this.time * 0.35;
      focus.set(r.x, r.y + 0.4, r.z);
    } else if (this.finale) {
      // desde arriba (el techo se vuelve transparente), mirando el velo y el Lugar Santísimo
      dist = this.finale.phase === "prep" ? 11.5 : 10;
      ph = 1.0;
      th = 0.62;
      focus.set(TEMPLE.veilX + (this.finale.phase === "prep" ? 1.4 : -0.4), TEMPLE.floor, 0);
    } else if (this.king && this.king.state === "stay" && gameStore.busy) {
      focus.set(this.king.rig.x, 0, this.king.rig.z);
      dist *= 0.7;
    }
    const k = 1 - Math.exp(-dt * (this.ceremony > 0 || this.finale ? 2.5 : 5));
    this.camTarget.lerp(focus, k);
    this.camDist += (dist - this.camDist) * (1 - Math.exp(-dt * 3));
    this.camTh = turn(this.camTh, th, 1 - Math.exp(-dt * 3));
    this.camPh += (ph - this.camPh) * (1 - Math.exp(-dt * 3));
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
  private camDist = 17.5;
  private camTh = 0.36;
  private camPh = 0.98;

  private skyTmp = { a: new THREE.Color(), b: new THREE.Color(), c: new THREE.Color() };
  private updateSky() {
    const t = this.s.time;
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
    // cielo
    a.set("#0d1534").lerp(b.set("#5d9bd6"), day);
    if (warm > 0 && day > 0.05) a.lerp(c.set("#e08a5c"), warm * 0.35 * day);
    u.top.value.copy(a);
    a.set("#26304f").lerp(b.set("#f1e3c2"), day);
    if (warm > 0 && day > 0.05) a.lerp(c.set("#ffb26b"), warm * 0.55 * day);
    u.horizon.value.copy(a);
    u.night.value = 1 - day;
    (this.scene.fog as THREE.Fog).color.copy(a);
    (this.vis.stars.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - day * 1.6);
    // luces
    this.sun.color.set("#fff3d6").lerp(b.set("#ffb066"), warm * day).lerp(c.set("#9db4ff"), 1 - day);
    this.sun.intensity = 0.55 + 2.35 * day;
    this.hemi.color.set("#40507e").lerp(b.set("#cfe3ff"), day);
    this.hemi.groundColor.set("#2a2620").lerp(b.set("#b9a27a"), day);
    this.hemi.intensity = 0.75 + 0.6 * day;
    this.renderer.toneMappingExposure = 0.95 + 0.12 * day;
    // la sombra sigue a la cámara (en pasos para que no tiemble)
    const gx = Math.round(this.camTarget.x / 2) * 2, gz = Math.round(this.camTarget.z / 2) * 2;
    this.sun.target.position.set(gx, 0, gz);
    this.sun.position.set(gx + dir.x * 45, dir.y * 45, gz + dir.z * 45);
    this.sun.target.updateMatrixWorld();
    const key = `${gx},${gz},${Math.round(dir.x * 60)},${Math.round(dir.y * 60)}`;
    if (key !== this.shadowKey) {
      this.shadowKey = key;
      this.shadowDirty = true;
    }
    this.vis.clouds.rotation.y += 0.00008;
  }

  private updateLabels(dt: number) {
    const s = this.s;
    for (const p of this.pads) {
      const paid = s.padPaid[p.key] || 0;
      const need = Math.ceil(p.cost - paid);
      const afford = s.gozo >= need;
      const html = p.cost <= 0 ? `${p.name}<small>¡Párate aquí!</small>` : `${p.kind === "helper" ? "Llamar: " : ""}${p.name}<small>✦ ${need}${afford ? "" : ` · tienes ${Math.floor(s.gozo)}`}</small>`;
      if (p.label.innerHTML !== html) p.label.innerHTML = html;
      p.label.classList.toggle("off", !afford);
      this.overlay.place(p.label, new THREE.Vector3(p.x, floorHeight(p.x, p.z) + 1.5, p.z), 0, 1 + p.pop * 0.15);
      p.ring.mat.uniforms.uProgress.value = p.cost > 0 ? paid / p.cost : 0;
      p.ring.mat.uniforms.uTime.value = this.time;
      p.ring.mat.uniforms.uOpacity.value = 0.75 + p.pop * 0.25;
    }
    // círculos de servicio: brillan los que sirven ahora
    const carrying = this.player.carry.items.length ? itemGroup(this.player.carry.items[0].type) : null;
    const relevant = (id: ZoneId) => {
      if (this.objective.zone === id) return 1;
      switch (id) {
        case "altar":
          return carrying === "lena" || carrying === "ofrenda" ? 0.8 : 0;
        case "reception":
          return !carrying || carrying === "ofrenda" ? (this.queue[0]?.state === "queue" ? 0.6 : 0.2) : 0;
        case "lena":
          return !carrying && s.altarFuel < 2 ? 0.6 : 0;
        case "fuente":
          return s.purity < 2 ? 0.7 : 0;
        case "candelero":
          return carrying === "aceite" ? 0.8 : 0;
        case "mesa":
          return carrying === "pan" ? 0.8 : 0;
        case "altarIncienso":
          return carrying === "incienso" ? 0.8 : 0;
        case "camaras":
          return carrying === "diezmo" ? 0.8 : 0;
        case "ensenanza":
          return this.visitors.some((v) => v.state === "seated") ? 0.8 : 0;
        case "expiacion":
          return 1;
        default:
          return 0;
      }
    };
    for (const z of Object.values(this.zones)) {
      if (!z.ring) continue;
      z.ring.mesh.visible = z.on && !this.finale;
      if (!z.ring.mesh.visible) continue;
      const rel = relevant(z.id);
      const u = z.ring.mat.uniforms;
      u.uTime.value = this.time;
      u.uPulse.value += (rel - u.uPulse.value) * Math.min(1, dt * 5);
      u.uOpacity.value = 0.35 + 0.6 * u.uPulse.value;
    }
    // montón de gozo
    const heap = Math.min(28, Math.ceil(s.gozoPile / 4));
    for (let i = 0; i < heap; i++) {
      const ring = i < 9 ? 0 : i < 17 ? 1 : i < 23 ? 2 : 3;
      const idx = ring === 0 ? i : ring === 1 ? i - 9 : ring === 2 ? i - 17 : i - 23;
      const per = [9, 8, 6, 5][ring];
      const rad = [0.36, 0.27, 0.17, 0.07][ring];
      const ang = (idx / per) * Math.PI * 2 + ring * 0.4;
      const m = new THREE.Matrix4().makeTranslation(BASIN_TOP.x + Math.cos(ang) * rad, BASIN_TOP.y - 0.1 + ring * 0.11 + Math.sin(this.time * 2 + i) * 0.01, BASIN_TOP.z + Math.sin(ang) * rad);
      this.gozoHeap.setMatrixAt(i, m);
    }
    this.gozoHeap.count = heap;
    this.gozoHeap.instanceMatrix.needsUpdate = true;
    if (s.gozoPile >= 1) {
      const t = `✦ ${Math.floor(s.gozoPile)}`;
      if (this.heapLabel.textContent !== t) this.heapLabel.textContent = t;
      this.overlay.place(this.heapLabel, BASIN_TOP.clone().add(new THREE.Vector3(0, 0.75, 0)));
    } else this.heapLabel.style.display = "none";
    // Jaquín y Boaz (al acercarse)
    const r = this.player.rig;
    if (this.cityTag) {
      if (this.zones.ciudad.on && dist(r.x, r.z, SALIDA_CIUDAD[0], SALIDA_CIUDAD[1]) < 9) this.overlay.place(this.cityTag, new THREE.Vector3(SALIDA_CIUDAD[0], floorHeight(SALIDA_CIUDAD[0], 0) + 1.3, 0));
      else this.cityTag.style.display = "none";
    }
    const near = dist(r.x, r.z, -2.95, 0) < 5.5 && !this.finale;
    [this.vis.pillarLabels.jaquin, this.vis.pillarLabels.boaz].forEach((pos, i) => {
      if (near) this.overlay.place(this.pillarTags[i], pos);
      else this.pillarTags[i].style.display = "none";
    });
  }

  private updateArrow() {
    const o = this.objective;
    let target = o.target;
    if (o.pad) {
      const p = this.pads.find((x) => x.key === o.pad);
      if (p) target = new THREE.Vector3(p.x, floorHeight(p.x, p.z), p.z);
    }
    const r = this.player.rig;
    const show = !!target && !gameStore.busy && !this.finale && dist(r.x, r.z, target.x, target.z) > 1.4;
    this.arrow.visible = show;
    if (show && target) {
      this.arrow.position.set(target.x, target.y + 2.3 + Math.sin(this.time * 4) * 0.18, target.z);
      this.arrow.rotation.y += 0.04;
    }
    this.overlay.pointTo(show && target ? target : null);
  }

  // ================================================================ marcador
  /** Lo que la pantalla muestra de la instrucción en curso. */
  private hudInstruccion() {
    const it = this.inst;
    const p = this.instPaso();
    if (!it || !p) return null;
    return { parte: it.parte, paso: it.i + 1, de: it.pasos.length, lugar: p.lugar, obligatoria: this.instruccionObligatoria };
  }

  private pushHud() {
    const s = this.s;
    const c = this.player.carry;
    const hour = this.hourIndex();
    const events: string[] = [];
    const fh = this.fiestaHoy();
    if (fh) {
      const d = fh.fiesta;
      const extra = this.online ? (d.merito > 1.01 ? ` · mérito ×${d.merito.toLocaleString("es-419")}` : "") : d.gozo > 1.01 ? ` · gozo ×${d.gozo.toLocaleString("es-419")}` : "";
      events.push(`${d.icono} ${d.corto}${d.duracion > 1 ? ` · día ${fh.dia} de ${d.duracion}` : ""}${extra}`);
    }
    if (this.pascua > 0) events.push(`La Pascua de Ezequías · gozo ×1,5 · ${Math.ceil(this.pascua)} s`);
    if (hour >= 0 && s.built.altar) events.push(this.online ? HOURS[hour][2] : `${HOURS[hour][2]} · gozo ×2`);
    if (this.prayer) events.push("El pueblo ora a la hora del incienso");
    const hud: Hud = {
      sacerdotes: this.presencia ? this.presencia.cuantos + 1 : 0,
      instruccion: this.hudInstruccion(),
      gozo: Math.floor(s.gozo),
      sabiduria: s.sabiduria,
      rank: s.rank,
      fuel: s.altarFuel,
      fuelMax: this.fuelMax(),
      fireUnlocked: !!s.built.altar,
      purity: s.purity,
      purityMax: this.purityMax(),
      purityUnlocked: !!s.built.fuente,
      lamps: s.built.candelero ? s.lampOil : null,
      lampsLit: this.lampsLit(),
      bread: s.built.mesa ? s.bread : null,
      incense: s.built.altarIncienso ? s.incense : null,
      time: s.time,
      day: s.day,
      phase: this.phaseName(),
      sabbath: this.isSabbath(),
      objective: this.objective.text,
      carrying: c.items.length ? { type: c.items[0].type, count: c.items.length, cap: c.cap } : null,
      canDrop: c.items.length > 0,
      event: events.length ? events.join(" · ") : null,
      rankReady: this.rankReady(),
      built: STATION_IDS.filter((id) => s.built[id]).length,
      total: STATION_IDS.length,
      gloria: gloria(s),
      mult: Math.round(this.mult() * 10) / 10,
      finale: s.finale,
      jornada: s.jornada.goals.length
        ? { n: s.jornada.n, goals: s.jornada.goals.map((g) => ({ ...g })), elapsed: s.playSeconds - s.jornada.startedAt, par: parSeconds(s.jornada.goals) }
        : null,
      daily: s.daily.goals.length ? { goals: s.daily.goals.map((g) => ({ ...g })), done: s.daily.done, streak: s.daily.streak } : null,
      liga: this.liga,
      copas: copas(s.logros),
      fecha: this.fecha.texto,
      fiesta: fh ? { id: fh.fiesta.id, nombre: fh.fiesta.nombre, icono: fh.fiesta.icono, dia: fh.dia, de: fh.fiesta.duracion, solemne: !!fh.fiesta.solemne } : null,
      tristeza: s.tristeza || 0,
      gen: s.gen || 1,
    };
    gameStore.setHud(hud);
  }

  // ================================================================ entrada (motor/entrada.ts)
  private onVisibility = () => {
    if (document.hidden) {
      this.persist();
      if (this.opts.loggedIn) void saveRemote(this.s);
      this.audio.suspend();
    } else {
      this.audio.resume();
      this.last = performance.now();
      // si cambió de aplicación un rato, los levitas siguieron sirviendo (en línea no hay levitas)
      const off = this.online ? { gained: 0, minutes: 0, away: 0, leftToday: 0 } : applyOffline(this.s);
      if (off.gained > 0) {
        this.persist();
        gameStore.push({ kind: "offline", gained: off.gained, minutes: off.minutes, away: off.away, leftToday: off.leftToday });
        this.pushHud();
      }
    }
  };

  private onPageHide = () => {
    this.persist();
    if (this.opts.loggedIn) void saveRemote(this.s);
  };

  // ================================================================ cierre
  /**
   * Nueva generación: guarda la partida nueva (aquí y, con cuenta, en el servidor) y la devuelve
   * para levantar el templo otra vez desde las ruinas. Solo después del Día de la Expiación.
   */
  startNewGeneration(): SaveData {
    if (this.online || !this.s.finale) return sanitize(JSON.parse(JSON.stringify(this.s)));
    this.running = false;
    for (const k of Object.keys(this.piles)) this.piles[k] = 0;
    Object.assign(this.s, nuevaGeneracion(this.s));
    this.persist();
    if (this.opts.loggedIn) {
      void saveRemote(this.s);
      void fetch(`/api/juegos/${GAME_SLUG}/logro`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "generacion", valor: this.s.gen }),
      }).catch(() => null);
    }
    return sanitize(JSON.parse(JSON.stringify(this.s)));
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.persist();
    if (this.opts.loggedIn) void saveRemote(this.s);
    this.unsub();
    const canvas = this.renderer.domElement;
    if (this.redInicio) clearTimeout(this.redInicio);
    this.red?.cerrar();
    this.presencia?.destruir();
    this.entrada.destruir();
    this.marca?.dispose();
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("pagehide", this.onPageHide);
    this.resizeObs.disconnect();
    for (const p of this.pads) p.ring.dispose();
    for (const z of Object.values(this.zones)) z.ring?.dispose();
    for (const h of this.helpers) h.prop?.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
    this.player.fig.dispose();
    this.azarias.fig.dispose();
    this.king?.fig.dispose();
    this.crowd.dispose();
    this.shadows.dispose();
    this.items.dispose();
    this.fx.dispose();
    this.arrow.geometry.dispose();
    (this.arrow.material as THREE.Material).dispose();
    this.gozoHeap.geometry.dispose();
    (this.gozoHeap.material as THREE.Material).dispose();
    disposeWorld(this.vis);
    this.overlay.dispose();
    // el sonido compartido con la ciudad lo cierra la pantalla
    if (!this.opts.audio) this.audio.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }
}
