/**
 * Puente entre el mundo 3D y la pantalla (React). El mundo publica aquí el marcador unas diez
 * veces por segundo y pide ventanas (diálogos, lecciones, preguntas...). La pantalla se suscribe.
 */
import { useSyncExternalStore } from "react";
import type { EscalonId, JerusalenPregunta } from "@shared/jerusalen";
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
};

export type Hud = {
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
};

export type Modal =
  | { kind: "dialog"; id: string; lines: Line[] }
  | { kind: "lesson"; lessonId: string }
  | { kind: "quiz"; quizId: string; source: "azarias" | "pueblo" | "examen"; step?: number }
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
  | { kind: "dificil"; q: JerusalenPregunta };

type Snapshot = { hud: Hud; modal: Modal | null; toasts: { id: number; text: string; tone: "gold" | "info" | "warn" }[]; online: OnlineHud | null };

const emptyHud: Hud = {
  gozo: 0, sabiduria: 0, rank: 0, fuel: 0, fuelMax: 6, fireUnlocked: false, purity: 5, purityMax: 5, purityUnlocked: false,
  lamps: null, lampsLit: false, bread: null, incense: null, time: 0.2, day: 1, phase: "", sabbath: false, objective: "",
  carrying: null, canDrop: false, event: null, rankReady: false, built: 0, total: 14, gloria: 0, mult: 1, finale: false,
  jornada: null, daily: null, liga: null, copas: 0, gen: 1,
};

class GameStore {
  private snap: Snapshot = { hud: emptyHud, modal: null, toasts: [], online: null };
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
    this.snap = { hud: emptyHud, modal: null, toasts: [], online: this.snap.online };
    this.emit();
  }
}

export const gameStore = new GameStore();

export function useGame() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getSnapshot, gameStore.getSnapshot);
}
