/**
 * Motor común del templo y la ciudad: la entrada (toques, ratón, teclado y mandos).
 *
 * Cada jugador elige en la pausa cómo moverse (motor/controles.ts):
 * - «Joystick donde toques»: se apoya el dedo en cualquier lugar y se arrastra; más allá del
 *   borde, el aprendiz corre.
 * - «Joystick fijo»: siempre en la esquina de abajo (a la derecha para zurdos).
 * - «Botones de flechas»: las flechas de la pantalla mandan las mismas teclas que el teclado.
 * - «Solo tocar para ir»: sin joystick.
 * En todos: un toque corto en el piso lleva al aprendiz hasta ahí (se puede apagar), pellizcar con
 * dos dedos o la rueda del ratón acercan la cámara, el teclado (flechas o W A S D, Mayús para
 * correr, + y − para acercar) y los mandos (palanca o cruceta para caminar; B, gatillo derecho o
 * apretar la palanca para correr; LB y RB para acercar; Start para la pausa).
 * Vibración corta en las acciones, donde el teléfono la permite (se puede apagar).
 */
import type { Overlay } from "../three/overlay";
import { alCambiarControles, leerControles, type Controles } from "./controles";

export type Toque = { x: number; y: number };

const RADIO = 56;
const RADIO_GRANDE = 72;
const MUERTA = 8;
const TOQUE_MS = 260;
const TOQUE_PX = 12;
const MANDO_MUERTA = 0.18;
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
  // el navegador no deja vibrar hasta que la persona toque la página (y lo anota como error)
  const activo = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
  if (activo && !activo.hasBeenActive) return;
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* sin vibración */
  }
}

/** Un dedo (o el ratón) apoyado: dónde empezó, dónde está y cuándo se apoyó. */
type Dedo = { id: number; x0: number; y0: number; x: number; y: number; t0: number };

export class Entrada {
  private teclas = new Set<string>();
  private dedos = new Map<number, Dedo>();
  /** El dedo que mueve el joystick, y el centro del joystick (el dedo o la esquina fija). */
  private joy: Dedo | null = null;
  private ox = 0;
  private oy = 0;
  /** Un dedo que solo puede ser un toque corto (sin joystick en ese esquema o fuera del fijo). */
  private soloToque: Dedo | null = null;
  private pellizco: { d0: number; z0: number } | null = null;
  private toque: Toque | null = null;
  /** Acercamiento de la cámara (menos = más cerca). Se recuerda entre partidas. */
  zoom = leerNumero("templo-zoom", 1);
  /** El dedo llegó más allá del borde del joystick: correr. */
  private corriendo = false;
  private jx = 0;
  private jy = 0;
  private c: Controles = leerControles();
  private quitarOyente: () => void;
  private obs: ResizeObserver | null = null;
  private w = 0;
  private h = 0;
  // mando
  private mandoCorre = false;
  private mandoStart = false;
  private mandoT = 0;

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
    this.quitarOyente = alCambiarControles((c) => {
      this.c = c;
      this.soltar();
    });
    const r = contenedor.getBoundingClientRect();
    this.w = r.width;
    this.h = r.height;
    if (typeof ResizeObserver !== "undefined") {
      this.obs = new ResizeObserver(() => {
        const rr = this.contenedor.getBoundingClientRect();
        this.w = rr.width;
        this.h = rr.height;
        if (!this.joy) this.dibujarReposo();
      });
      this.obs.observe(contenedor);
    }
    this.dibujarReposo();
  }

  /** Los controles que eligió el jugador. */
  get controles(): Controles {
    return this.c;
  }

  private radio() {
    return this.c.grande ? RADIO_GRANDE : RADIO;
  }

  /** Centro del joystick fijo: en la esquina de abajo, a la izquierda (o a la derecha para zurdos). */
  private baseFija(): [number, number] {
    const m = this.radio() * 1.55 + 14;
    return [this.c.zurdo ? this.w - m : m, this.h - m];
  }

  /** El joystick fijo se ve siempre, más tenue cuando no se usa. */
  private dibujarReposo() {
    if (this.c.esquema !== "fijo") {
      this.overlay.joystick(false);
      return;
    }
    const [bx, by] = this.baseFija();
    this.overlay.joystick(true, bx, by, bx, by, 0.45, this.radio() / RADIO);
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
    const m = this.leerMando();
    if (m) {
      x += m[0];
      y += m[1];
    }
    const largo = Math.hypot(x, y);
    if (largo > 1) {
      x /= largo;
      y /= largo;
    }
    return [x, y];
  }

  /** El mando (si hay uno): palanca izquierda o cruceta, correr, acercar y pausa. */
  private leerMando(): [number, number] | null {
    let pads: (Gamepad | null)[] = [];
    try {
      pads = navigator.getGamepads ? [...navigator.getGamepads()] : [];
    } catch {
      return null;
    }
    const g = pads.find((p) => p && p.connected);
    const ahora = performance.now();
    const dt = this.mandoT ? Math.min(0.1, (ahora - this.mandoT) / 1000) : 0;
    this.mandoT = ahora;
    if (!g) {
      this.mandoCorre = false;
      return null;
    }
    const b = (i: number) => !!g.buttons[i]?.pressed;
    let x = g.axes[0] || 0,
      y = -(g.axes[1] || 0);
    if (Math.hypot(x, y) < MANDO_MUERTA) x = y = 0;
    if (b(12)) y += 1;
    if (b(13)) y -= 1;
    if (b(14)) x -= 1;
    if (b(15)) x += 1;
    this.mandoCorre = b(1) || b(7) || b(10);
    if (!this.opciones.ocupado()) {
      if (b(4)) this.ponerZoom(this.zoom / (1 + 0.6 * dt));
      if (b(5)) this.ponerZoom(this.zoom * (1 + 0.6 * dt));
    }
    const start = b(9);
    if (start && !this.mandoStart) window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    this.mandoStart = start;
    if (x || y) this.opciones.alPrimerToque?.();
    return [x, y];
  }

  /** ¿Corre? (Mayús, el dedo más allá del borde del joystick o el botón del mando). */
  get corre(): boolean {
    return this.teclas.has("shift") || this.corriendo || this.mandoCorre;
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
      this.soloToque = null;
      this.soltarJoystick();
      return;
    }
    if (this.dedos.size !== 1) return;
    this.jx = this.jy = 0;
    this.corriendo = false;
    if (this.c.esquema === "flotante") {
      this.joy = d;
      this.ox = x;
      this.oy = y;
      this.overlay.joystick(true, x, y, x, y, 1, this.radio() / RADIO);
    } else if (this.c.esquema === "fijo") {
      const [bx, by] = this.baseFija();
      if (Math.hypot(x - bx, y - by) <= this.radio() * 1.9) {
        this.joy = d;
        this.ox = bx;
        this.oy = by;
        this.moverJoystick(d);
      } else this.soloToque = d;
    } else this.soloToque = d;
  };

  private moverJoystick(d: Dedo) {
    const R = this.radio();
    let dx = d.x - this.ox,
      dy = d.y - this.oy;
    const m = Math.hypot(dx, dy);
    this.corriendo = m > R * 1.45;
    if (m > R) {
      dx = (dx / m) * R;
      dy = (dy / m) * R;
    }
    this.jx = m < MUERTA ? 0 : dx / R;
    this.jy = m < MUERTA ? 0 : -dy / R;
    this.overlay.joystick(true, this.ox, this.oy, this.ox + dx, this.oy + dy, 1, R / RADIO);
  }

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
    if (this.joy === d) this.moverJoystick(d);
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
    const corto = performance.now() - d.t0 < TOQUE_MS && Math.hypot(d.x - d.x0, d.y - d.y0) < TOQUE_PX;
    const puedeIr = (this.c.esquema === "tocar" || this.c.tocarParaIr) && !this.opciones.ocupado();
    if (this.joy === d) {
      // en el joystick fijo, tocarlo sin arrastrar no es «ir al punto»
      if (corto && puedeIr && this.c.esquema === "flotante") this.toque = { x: d.x, y: d.y };
      this.soltarJoystick();
    } else if (this.soloToque === d) {
      if (corto && puedeIr) this.toque = { x: d.x, y: d.y };
      this.soloToque = null;
    }
  };

  private onCancel = (e: PointerEvent) => {
    this.dedos.delete(e.pointerId);
    if (this.dedos.size < 2) this.pellizco = null;
    if (this.soloToque?.id === e.pointerId) this.soloToque = null;
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
    this.dibujarReposo();
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

  /** Suelta todo (al perder el foco, al abrir una ventana, al cambiar los controles). */
  soltar = () => {
    this.teclas.clear();
    this.dedos.clear();
    this.pellizco = null;
    this.soloToque = null;
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
    this.quitarOyente();
    this.obs?.disconnect();
  }
}
