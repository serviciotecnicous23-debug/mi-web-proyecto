/**
 * Motor común del templo y la ciudad: la entrada (toques, ratón y teclado).
 *
 * - Joystick flotante: se apoya el dedo en cualquier lugar y se arrastra. Si se arrastra más allá
 *   del borde, el aprendiz corre.
 * - Tocar para ir: un toque corto (sin arrastrar) marca un punto del piso; el mundo busca el
 *   camino y el aprendiz va solo hasta ahí.
 * - Pellizcar con dos dedos (o la rueda del ratón) acerca y aleja la cámara.
 * - Teclado: flechas o W A S D; Mayús para correr.
 * - Vibración corta en las acciones, donde el teléfono la permite (se puede apagar).
 */
import type { Overlay } from "../three/overlay";

export type Toque = { x: number; y: number };

const RADIO = 56;
const MUERTA = 8;
const TOQUE_MS = 260;
const TOQUE_PX = 12;
export const ZOOM_MIN = 0.7;
export const ZOOM_MAX = 1.4;

function leerNumero(clave: string, def: number) {
  try {
    const v = Number(localStorage.getItem(clave));
    return Number.isFinite(v) && v > 0 ? v : def;
  } catch {
    return def;
  }
}

function guardar(clave: string, v: string) {
  try {
    localStorage.setItem(clave, v);
  } catch {
    /* modo privado */
  }
}

/** ¿El jugador quiere vibración? (se apaga en la pausa). */
export function vibracionActiva(): boolean {
  try {
    return localStorage.getItem("templo-vibrar") !== "0";
  } catch {
    return true;
  }
}

export function setVibracion(on: boolean) {
  guardar("templo-vibrar", on ? "1" : "0");
}

/** Una vibración corta (10 a 30 ms) donde el teléfono la permite. */
export function vibrar(ms: number | number[]) {
  if (!vibracionActiva()) return;
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* sin vibración */
  }
}

type Dedo = { id: number; x0: number; y0: number; x: number; y: number; t0: number };

export class Entrada {
  private teclas = new Set<string>();
  private dedos = new Map<number, Dedo>();
  private joy: Dedo | null = null;
  private pellizco: { d0: number; z0: number } | null = null;
  private toque: Toque | null = null;
  /** Acercamiento de la cámara (menos = más cerca). Se recuerda entre partidas. */
  zoom = leerNumero("templo-zoom", 1);
  /** El dedo llegó más allá del borde del joystick: correr. */
  private corriendo = false;
  private jx = 0;
  private jy = 0;

  constructor(
    private contenedor: HTMLElement,
    private lienzo: HTMLElement,
    private overlay: Overlay,
    private opciones: { ocupado: () => boolean; alPrimerToque?: () => void },
  ) {
    lienzo.addEventListener("pointerdown", this.onDown);
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onCancel);
    lienzo.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.soltar);
  }

  /** Hacia dónde empuja el jugador: (x, y) en la pantalla, largo hasta 1. */
  vector(): [number, number] {
    let x = 0,
      y = 0;
    if (this.teclas.has("arrowleft") || this.teclas.has("a")) x -= 1;
    if (this.teclas.has("arrowright") || this.teclas.has("d")) x += 1;
    if (this.teclas.has("arrowup") || this.teclas.has("w")) y += 1;
    if (this.teclas.has("arrowdown") || this.teclas.has("s")) y -= 1;
    x += this.jx;
    y += this.jy;
    const m = Math.hypot(x, y);
    if (m > 1) {
      x /= m;
      y /= m;
    }
    return [x, y];
  }

  /** ¿Corre? (Mayús, o el dedo más allá del borde del joystick). */
  get corre(): boolean {
    return this.teclas.has("shift") || this.corriendo;
  }

  /** ¿Hay alguien empujando (para cortar el «ir solo»)? */
  get empuja(): boolean {
    const [x, y] = this.vector();
    return Math.hypot(x, y) > 0.05;
  }

  /** Un toque corto en la pantalla (para ir caminando hasta ahí). Se entrega una sola vez. */
  tomarToque(): Toque | null {
    const t = this.toque;
    this.toque = null;
    return t;
  }

  private rel(e: PointerEvent): [number, number] {
    const r = this.contenedor.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  private onDown = (e: PointerEvent) => {
    this.opciones.alPrimerToque?.();
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const [x, y] = this.rel(e);
    const d: Dedo = { id: e.pointerId, x0: x, y0: y, x, y, t0: performance.now() };
    this.dedos.set(e.pointerId, d);
    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch {
      /* el puntero ya se soltó: se sigue sin captura */
    }
    e.preventDefault();
    if (this.dedos.size === 2) {
      // dos dedos: pellizcar (se suelta el joystick)
      const [a, b] = [...this.dedos.values()];
      this.pellizco = { d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, z0: this.zoom };
      this.soltarJoystick();
      return;
    }
    if (this.dedos.size === 1) {
      this.joy = d;
      this.jx = this.jy = 0;
      this.corriendo = false;
      this.overlay.joystick(true, x, y, x, y);
    }
  };

  private onMove = (e: PointerEvent) => {
    const d = this.dedos.get(e.pointerId);
    if (!d) return;
    const [x, y] = this.rel(e);
    d.x = x;
    d.y = y;
    if (this.pellizco && this.dedos.size >= 2) {
      const [a, b] = [...this.dedos.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      this.ponerZoom(this.pellizco.z0 * (this.pellizco.d0 / dist));
      return;
    }
    if (this.joy !== d) return;
    let dx = x - d.x0,
      dy = y - d.y0;
    const m = Math.hypot(dx, dy);
    this.corriendo = m > RADIO * 1.45;
    if (m > RADIO) {
      dx = (dx / m) * RADIO;
      dy = (dy / m) * RADIO;
    }
    this.jx = m < MUERTA ? 0 : dx / RADIO;
    this.jy = m < MUERTA ? 0 : -dy / RADIO;
    this.overlay.joystick(true, d.x0, d.y0, d.x0 + dx, d.y0 + dy);
  };

  private onUp = (e: PointerEvent) => {
    const d = this.dedos.get(e.pointerId);
    if (!d) return;
    this.dedos.delete(e.pointerId);
    if (this.pellizco) {
      if (this.dedos.size < 2) {
        this.pellizco = null;
        guardar("templo-zoom", String(Math.round(this.zoom * 100) / 100));
      }
      return;
    }
    if (this.joy === d) {
      const corto = performance.now() - d.t0 < TOQUE_MS && Math.hypot(d.x - d.x0, d.y - d.y0) < TOQUE_PX;
      if (corto && !this.opciones.ocupado()) this.toque = { x: d.x, y: d.y };
      this.soltarJoystick();
    }
  };

  private onCancel = (e: PointerEvent) => {
    this.dedos.delete(e.pointerId);
    if (this.dedos.size < 2) this.pellizco = null;
    if (this.joy?.id === e.pointerId) this.soltarJoystick();
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.ponerZoom(this.zoom * (e.deltaY > 0 ? 1.08 : 1 / 1.08));
    guardar("templo-zoom", String(Math.round(this.zoom * 100) / 100));
  };

  private ponerZoom(z: number) {
    this.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
  }

  private soltarJoystick() {
    this.joy = null;
    this.jx = this.jy = 0;
    this.corriendo = false;
    this.overlay.joystick(false);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    const k = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "shift"].includes(k)) {
      if (this.opciones.ocupado()) return;
      this.teclas.add(k);
      this.opciones.alPrimerToque?.();
      if (k !== "shift") e.preventDefault();
    }
    if (k === "+" || k === "=") this.ponerZoom(this.zoom / 1.1);
    if (k === "-") this.ponerZoom(this.zoom * 1.1);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.teclas.delete(e.key.toLowerCase());
  };

  /** Suelta todo (al perder el foco, al abrir una ventana). */
  soltar = () => {
    this.teclas.clear();
    this.dedos.clear();
    this.pellizco = null;
    this.soltarJoystick();
  };

  destruir() {
    this.lienzo.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onCancel);
    this.lienzo.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.soltar);
  }
}
