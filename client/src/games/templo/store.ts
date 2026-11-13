/**
 * Puente entre el mundo 3D y la pantalla (React). El mundo publica aquí el marcador unas diez
 * veces por segundo y pide ventanas (diálogos, lecciones, preguntas...). La pantalla se suscribe.
 */
import type { TabMercado } from "@shared/mercado";
import { useSyncExternalStore } from "react";
import type { EscalonId, JerusalenPregunta } from "@shared/jerusalen";
import type { FiestaId } from "@shared/calendario";
import type { ItemType, Line } from "./data";
import type { Goal } from "./progress";

/** Marcador del modo en línea: mérito de la temporada, escalón y cómo va el día. */
export type OnlineHud = {
  merito: number;
  ganado: number;
  escalon: EscalonId;
  hoySeg: number;
  factor: number;
  pregunta: "lista" | "espera" | "cargando" | "abierta" | "agotada";
  enviando: boolean;
  /** Sacerdotes sirviendo juntos según el servidor (con 2 o más, mérito ×1,2). */
  juntos: number;
  /** El gozo de la persona según el último envío (null hasta el primero). */
  gozoTotal: number | null;
  /** Puesto en la tabla de su camino (null si todavía no tiene mérito). */
  puesto: number | null;
  /** Lo ganado en el último envío de servicio (para el aviso «+mérito · +gozo»). */
  ultimo: { merito: number; gozo: number; at: number } | null;
};

export type Hud = {
  /** Jerusalén en línea: cuántos sacerdotes se ven ahora en el templo, contándote (con 2 o más, sirven juntos). */
  sacerdotes: number;
  /** Jerusalén en línea: la instrucción del sacerdote en curso (parte, paso y si es obligatoria). */
  instruccion: { parte: number; paso: number; de: number; lugar: string; obligatoria: boolean } | null;
  gozo: number;
  sabiduria: number;
  rank: number;
  fuel: number;
  fuelMax: number;
  fireUnlocked: boolean;
  purity: number;
  purityMax: number;
  purityUnlocked: boolean;
  /** Aceite en las siete lámparas (null si aún no hay candelero). */
  lamps: number | null;
  lampsLit: boolean;
  /** Panes en la mesa (de 12). */
  bread: number | null;
  /** Porciones de incienso en el altar de oro. */
  incense: number | null;
  time: number;
  day: number;
  phase: string;
  sabbath: boolean;
  objective: string;
  carrying: { type: ItemType; count: number; cap: number } | null;
  canDrop: boolean;
  event: string | null;
  rankReady: boolean;
  built: number;
  total: number;
  gloria: number;
  mult: number;
  finale: boolean;
  /** Generación (1 la primera vez; sube al empezar otra vez la historia). */
  gen: number;
  /** Jornada actual: objetivos y tiempo (para las estrellas). */
  jornada: { n: number; goals: Goal[]; elapsed: number; par: number } | null;
  /** Desafío del día. */
  daily: { goals: Goal[]; done: boolean; streak: number } | null;
  /** Tabla de la semana: quién va primero y tu puesto. */
  liga: { lider: string | null; liderPuntos: number; puesto: number | null; puntos: number } | null;
  copas: number;
  /** Fecha hebrea de hoy («14 de Abib») y la fiesta, si la hay. */
  fecha: string;
  fiesta: { id: FiestaId; nombre: string; icono: string; dia: number; de: number; solemne: boolean } | null;
  /** Tristeza del pueblo por un juicio injusto (0 a 3). */
  tristeza: number;
};

/** Marcador de la ciudad (Jerusalén en línea, etapa 2). */
export type CiudadHud = {
  /** El camino del personaje (para el nombre del escalón). */
  camino: "sacerdocio" | "profecia" | "realeza";
  nombre: string;
  escalon: EscalonId;
  /** Nombre del barrio y número de la casa (desde 1). */
  barrio: string;
  casa: number;
  nivel: number;
  /** Dónde está ahora («La plaza», «Ciudad de David», «Escalinata del templo»...). */
  lugar: string;
  /** Lo que hay cerca o lo que conviene hacer. */
  aviso: string;
  fecha: string;
  fiesta: { id: FiestaId; nombre: string; icono: string; dia: number; de: number; solemne: boolean; merito: number } | null;
  hora: number;
  fase: string;
  /** Vecinos que se ven (hasta 20) y cómo va la conexión con ellos. */
  vecinos: number;
  red: "conectando" | "conectado" | "fuera";
  /** Las últimas frases que dijeron los vecinos. */
  frases: { id: number; nombre: string; texto: string }[];
  /** El vecino que está a un par de pasos. */
  cerca: { id: number; nombre: string } | null;
  /** El gozo de Jerusalén en línea (se gana sirviendo aquí y se gasta en el mercado). */
  gozo: number;
};

export type EdificioId = "palacio" | "escuela" | "mercado";

export type Modal =
  | { kind: "dialog"; id: string; lines: Line[] }
  | { kind: "lesson"; lessonId: string }
  | { kind: "quiz"; quizId: string; source: "azarias" | "pueblo" | "examen" | "instruccion"; step?: number }
  | { kind: "instruccion" }
  | { kind: "estudios"; id?: string }
  | { kind: "misiones" }
  | { kind: "avisos" }
  | { kind: "calendario" }
  | { kind: "upgrades" }
  | { kind: "book" }
  | { kind: "help" }
  | { kind: "offline"; gained: number; minutes: number; away?: number; leftToday?: number }
  | { kind: "rank"; rank: number }
  | { kind: "finale" }
  | { kind: "camino" }
  | { kind: "jornada"; n: number; stars: number; reward: number; adorno: string | null; seconds: number }
  | { kind: "comunidad" }
  | { kind: "temporada" }
  | { kind: "dificil"; q: JerusalenPregunta }
  | { kind: "fiesta"; id: FiestaId }
  | { kind: "juicio"; casoId: string }
  | { kind: "casa"; pestana?: "casa" | "obras" | "huerto" | "oficios" | "adornos" | "vecinos" | "album" }
  | { kind: "anuncios" }
  | { kind: "ancianos"; n: number }
  | { kind: "edificio"; id: EdificioId }
  | { kind: "mercado"; tab?: TabMercado }
  /** El arca de Joás, a la puerta del templo (shared/arca.ts). */
  | { kind: "arca" }
  | { kind: "tesoro" }
  | { kind: "concurso" }
  | { kind: "escuela"; tab?: "memoria" | "discernir" }
  | { kind: "palacio"; tab?: "audiencia" | "ley" }
  | { kind: "irA" }
  | { kind: "mapa" }
  | { kind: "catedra"; area: import("@shared/catedras").CatedraArea }
  | { kind: "frases" }
  | { kind: "vecinos" }
  | { kind: "vecino"; id: number }
  /** «Tu barrio»: la charla, los vecinos y el emblema y el lema (el barrio como clan). */
  | { kind: "barrio"; pestana?: "charla" | "vecinos" | "emblema" | "copa" | "obras" | "pueblo" }
  /** «¿Quién es sabio?», el concurso de la casa de la sabiduría (pantalla completa). */
  | { kind: "sabio" }
  /** Un personaje de la calle de los siervos (shared/personajes.ts): su charla, sus chismes y el recado del día. */
  | { kind: "personaje"; id: string }
  /** La historia de la temporada (shared/capitulos.ts). */
  | { kind: "capitulos" }
  /** Los mentores para los nuevos (MentoresUI.tsx). */
  | { kind: "mentores" }
  /** El libro de la restauración (shared/restauracion.ts). */
  | { kind: "libro" }
  | { kind: "visita"; personajeId: number; nombre: string }
  | { kind: "registro"; personajeId: number; nombre?: string; volver?: Modal };

/** La casa por dentro (casa/mundo-casa.ts): lo que muestra la pantalla mientras se está adentro. */
export type CasaHud = {
  dueno: string;
  esMia: boolean;
  nivel: number;
  nombreNivel: string;
  letrero: string | null;
  /** El cuarto donde está el personaje. */
  lugar: string;
  aviso: string;
  remodelando: boolean;
  /** El mueble elegido en el modo remodelar. */
  seleccion: { m: string; nombre: string; icono: string } | null;
  colocados: number;
  max: number;
  /** Cuántos quedan en el arcón de cada mueble (los que se tienen y no están puestos). */
  disponibles: Record<string, number>;
  piso: 0 | 1;
  pisos: (0 | 1)[];
  cambios: boolean;
  bendiciones: number;
  yaBendije: boolean;
  /** Dentro de un edificio de la ciudad (la escuela, el palacio o la cámara): sus estaciones y su maestro. */
  edificio?: {
    id: "escuela" | "palacio" | "camara";
    nombre: string;
    icono: string;
    maestro: string;
    estaciones: { id: string; nombre: string; icono: string; siguiente: boolean }[];
    /** La estación que toca en los primeros pasos, o «salir» si lo que sigue es afuera. */
    siguiente: string | null;
    /** La gran restauración: las salas nuevas del edificio, cómo va cada una y sus círculos (para tocarlos e ir). */
    resto?: { id: string; nombre: string; icono: string; hecha: boolean; abierta: boolean; hechos: number; total: number; zonas: { id: string; nombre: string; icono: string; hecho: boolean; guia: boolean }[] }[];
  };
};

type Snapshot = { hud: Hud; modal: Modal | null; toasts: { id: number; text: string; tone: "gold" | "info" | "warn" }[]; online: OnlineHud | null; ciudad: CiudadHud | null; casa: CasaHud | null };

const emptyHud: Hud = {
  sacerdotes: 0,
  instruccion: null,
  gozo: 0, sabiduria: 0, rank: 0, fuel: 0, fuelMax: 6, fireUnlocked: false, purity: 5, purityMax: 5, purityUnlocked: false,
  lamps: null, lampsLit: false, bread: null, incense: null, time: 0.2, day: 1, phase: "", sabbath: false, objective: "",
  carrying: null, canDrop: false, event: null, rankReady: false, built: 0, total: 14, gloria: 0, mult: 1, finale: false,
  jornada: null, daily: null, liga: null, copas: 0, gen: 1, fecha: "1 de Abib", fiesta: null, tristeza: 0,
};

class GameStore {
  private snap: Snapshot = { hud: emptyHud, modal: null, toasts: [], online: null, ciudad: null, casa: null };
  private queue: Modal[] = [];
  private listeners = new Set<() => void>();
  private closeHandlers = new Set<(m: Modal) => void>();
  private toastSeq = 0;

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getSnapshot = () => this.snap;

  private emit() {
    for (const fn of this.listeners) fn();
  }

  setHud(hud: Hud) {
    this.snap = { ...this.snap, hud };
    this.emit();
  }

  setOnline(online: OnlineHud | null) {
    this.snap = { ...this.snap, online };
    this.emit();
  }

  setCiudad(ciudad: CiudadHud | null) {
    this.snap = { ...this.snap, ciudad };
    this.emit();
  }

  setCasa(casa: CasaHud | null) {
    this.snap = { ...this.snap, casa };
    this.emit();
  }

  /** Ventanas en fila: se muestran de a una. */
  push(modal: Modal) {
    if (!this.snap.modal) this.snap = { ...this.snap, modal };
    else this.queue.push(modal);
    this.emit();
  }

  /** Pone una ventana adelante de la fila (por ejemplo, la pregunta justo después de su lección). */
  pushFront(modal: Modal) {
    if (!this.snap.modal) this.snap = { ...this.snap, modal };
    else this.queue.unshift(modal);
    this.emit();
  }

  /**
   * Cambia la ventana de ahora por otra sin darla por cerrada (para volver a ella después, como el registro
   * de un vecino que se abre desde su casa). Solo para ventanas que no esperan su cierre (no la historia).
   */
  reemplazar(modal: Modal) {
    this.snap = { ...this.snap, modal };
    this.emit();
  }

  close() {
    const closed = this.snap.modal;
    this.snap = { ...this.snap, modal: this.queue.shift() || null };
    this.emit();
    if (closed) for (const fn of this.closeHandlers) fn(closed);
  }

  /** Avisa cuando se cierra una ventana (para seguir la historia). */
  onClosed(fn: (m: Modal) => void) {
    this.closeHandlers.add(fn);
    return () => {
      this.closeHandlers.delete(fn);
    };
  }

  get busy() {
    return !!this.snap.modal;
  }

  toast(text: string, tone: "gold" | "info" | "warn" = "info") {
    const id = ++this.toastSeq;
    this.snap = { ...this.snap, toasts: [...this.snap.toasts.slice(-2), { id, text, tone }] };
    this.emit();
    setTimeout(() => {
      this.snap = { ...this.snap, toasts: this.snap.toasts.filter((t) => t.id !== id) };
      this.emit();
    }, 3200);
  }

  reset() {
    this.queue = [];
    this.closeHandlers.clear();
    this.snap = { hud: emptyHud, modal: null, toasts: [], online: this.snap.online, ciudad: null, casa: null };
    this.emit();
  }
}

export const gameStore = new GameStore();

export function useGame() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getSnapshot, gameStore.getSnapshot);
}
