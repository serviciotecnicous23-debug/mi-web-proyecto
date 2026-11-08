/**
 * Motor liviano para los juegos de la web (sin librerías): dibuja en un <canvas>, se adapta a
 * cualquier pantalla (celular o computadora), lee teclado y toques, pausa solo cuando la
 * pestaña no se ve y hace sonidos sintetizados (sin descargar archivos de audio).
 *
 * Todo corre en el navegador de quien juega: el servidor solo entrega los archivos una vez.
 */

export type GameInput = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  action: boolean;
  /** Dedo o ratón, en coordenadas del juego (null si no hay). */
  pointerX: number | null;
  pointerY: number | null;
  pointerDown: boolean;
  /** Se tocó o hizo clic en este cuadro. */
  tapped: boolean;
};

export type SoundName = "catch" | "bonus" | "hit" | "life" | "level" | "over" | "tap";

export type GameApi = {
  sound: (name: SoundName) => void;
  vibrate: (ms: number) => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setLevel: (level: number) => void;
  gameOver: (finalScore: number) => void;
};

export interface GameScene {
  /** Tamaño lógico (se escala para llenar la pantalla manteniendo la proporción). */
  readonly width: number;
  readonly height: number;
  init(api: GameApi): void;
  update(dt: number, input: GameInput): void;
  render(ctx: CanvasRenderingContext2D, time: number): void;
}

export type GameEvents = {
  onScore?: (score: number) => void;
  onLives?: (lives: number) => void;
  onLevel?: (level: number) => void;
  onGameOver?: (finalScore: number) => void;
};

// ---------------------------------------------------------------- sonido
class Sounds {
  private ctx: AudioContext | null = null;
  muted = false;

  unlock() {
    if (this.ctx || typeof window === "undefined") return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctx) this.ctx = new Ctx();
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain = 0.08, slideTo?: number, delay = 0) {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  play(name: SoundName) {
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    switch (name) {
      case "catch":
        this.tone(660, 0.09, "triangle", 0.07, 990);
        break;
      case "bonus":
        this.tone(784, 0.08, "triangle", 0.07);
        this.tone(988, 0.08, "triangle", 0.07, undefined, 0.07);
        this.tone(1319, 0.14, "triangle", 0.07, undefined, 0.14);
        break;
      case "hit":
        this.tone(220, 0.25, "sawtooth", 0.06, 90);
        break;
      case "life":
        this.tone(523, 0.1, "sine", 0.08);
        this.tone(784, 0.18, "sine", 0.08, undefined, 0.09);
        break;
      case "level":
        [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.12, "square", 0.04, undefined, i * 0.08));
        break;
      case "over":
        [392, 330, 262].forEach((f, i) => this.tone(f, 0.22, "triangle", 0.07, undefined, i * 0.18));
        break;
      case "tap":
        this.tone(440, 0.05, "sine", 0.04);
        break;
    }
  }

  close() {
    void this.ctx?.close().catch(() => {});
    this.ctx = null;
  }
}

// ---------------------------------------------------------------- motor
export class GameRunner {
  private ctx: CanvasRenderingContext2D;
  private raf = 0;
  private last = 0;
  private running = false;
  private paused = false;
  private over = false;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private dpr = 1;
  private keys = new Set<string>();
  private pointer = { x: null as number | null, y: null as number | null, down: false, tapped: false };
  private sounds = new Sounds();
  private resizeObserver: ResizeObserver | null = null;
  private cleanup: Array<() => void> = [];
  private canvas: HTMLCanvasElement;
  private scene: GameScene;
  private events: GameEvents;

  constructor(canvas: HTMLCanvasElement, scene: GameScene, events: GameEvents = {}) {
    this.canvas = canvas;
    this.scene = scene;
    this.events = events;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Este navegador no puede dibujar el juego");
    this.ctx = ctx;
    this.bindInput();
    this.fit();
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      this.resizeObserver = new ResizeObserver(() => this.fit());
      this.resizeObserver.observe(canvas.parentElement);
    }
    const onVisibility = () => {
      if (document.hidden) this.last = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);
    this.cleanup.push(() => document.removeEventListener("visibilitychange", onVisibility));
    this.scene.init(this.api());
    this.draw(0);
  }

  private api(): GameApi {
    return {
      sound: (n) => this.sounds.play(n),
      vibrate: (ms) => {
        try {
          navigator.vibrate?.(ms);
        } catch {
          /* nada */
        }
      },
      setScore: (s) => this.events.onScore?.(s),
      setLives: (l) => this.events.onLives?.(l),
      setLevel: (l) => this.events.onLevel?.(l),
      gameOver: (s) => {
        this.over = true;
        this.running = false;
        this.sounds.play("over");
        this.events.onGameOver?.(s);
      },
    };
  }

  /** El lienzo llena su caja; el juego se centra con su proporción. */
  private fit() {
    const box = this.canvas.parentElement?.getBoundingClientRect();
    if (!box || !box.width || !box.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.canvas.width = Math.round(box.width * this.dpr);
    this.canvas.height = Math.round(box.height * this.dpr);
    this.canvas.style.width = `${box.width}px`;
    this.canvas.style.height = `${box.height}px`;
    this.scale = Math.min(box.width / this.scene.width, box.height / this.scene.height);
    this.offsetX = (box.width - this.scene.width * this.scale) / 2;
    this.offsetY = (box.height - this.scene.height * this.scale) / 2;
    if (!this.running) this.draw(performance.now());
  }

  private toGame(clientX: number, clientY: number) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: (clientX - r.left - this.offsetX) / this.scale,
      y: (clientY - r.top - this.offsetY) / this.scale,
    };
  }

  private bindInput() {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "a", "d", "w", "s", "enter"].includes(k)) {
        this.keys.add(k);
        if (this.running) e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase());
    const blur = () => this.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    const pDown = (e: PointerEvent) => {
      const p = this.toGame(e.clientX, e.clientY);
      this.pointer = { x: p.x, y: p.y, down: true, tapped: true };
      this.canvas.setPointerCapture?.(e.pointerId);
    };
    const pMove = (e: PointerEvent) => {
      const p = this.toGame(e.clientX, e.clientY);
      this.pointer.x = p.x;
      this.pointer.y = p.y;
    };
    const pUp = () => {
      this.pointer.down = false;
    };
    this.canvas.addEventListener("pointerdown", pDown);
    this.canvas.addEventListener("pointermove", pMove);
    this.canvas.addEventListener("pointerup", pUp);
    this.canvas.addEventListener("pointercancel", pUp);
    this.cleanup.push(() => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      this.canvas.removeEventListener("pointerdown", pDown);
      this.canvas.removeEventListener("pointermove", pMove);
      this.canvas.removeEventListener("pointerup", pUp);
      this.canvas.removeEventListener("pointercancel", pUp);
    });
  }

  private input(): GameInput {
    const k = this.keys;
    const input: GameInput = {
      left: k.has("arrowleft") || k.has("a"),
      right: k.has("arrowright") || k.has("d"),
      up: k.has("arrowup") || k.has("w"),
      down: k.has("arrowdown") || k.has("s"),
      action: k.has(" ") || k.has("enter"),
      pointerX: this.pointer.x,
      pointerY: this.pointer.y,
      pointerDown: this.pointer.down,
      tapped: this.pointer.tapped,
    };
    this.pointer.tapped = false;
    return input;
  }

  private draw(time: number) {
    const { ctx } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#07060c";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(this.dpr * this.scale, 0, 0, this.dpr * this.scale, this.offsetX * this.dpr, this.offsetY * this.dpr);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, this.scene.width, this.scene.height);
    ctx.clip();
    this.scene.render(ctx, time);
    ctx.restore();
  }

  private frame = (time: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    if (this.paused || document.hidden) {
      this.last = 0;
      return;
    }
    const dt = this.last ? Math.min((time - this.last) / 1000, 1 / 20) : 1 / 60;
    this.last = time;
    this.scene.update(dt, this.input());
    if (this.running) this.draw(time);
  };

  /** Arranca (debe llamarse desde un toque o clic: así el navegador deja sonar el audio). */
  start() {
    this.sounds.unlock();
    this.over = false;
    this.paused = false;
    this.running = true;
    this.last = 0;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.frame);
  }

  restart() {
    this.scene.init(this.api());
    this.start();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    if (this.over) return;
    this.paused = false;
    this.last = 0;
  }

  get isPaused() {
    return this.paused;
  }

  setMuted(muted: boolean) {
    this.sounds.muted = muted;
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.cleanup.forEach((fn) => fn());
    this.sounds.close();
  }
}
