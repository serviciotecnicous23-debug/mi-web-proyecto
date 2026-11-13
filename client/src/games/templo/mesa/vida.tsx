/**
 * Lo que da vida a todas las mesas del patio: los colores de cada asiento, la gente sentada (los compañeros de la
 * computadora con 🤖), el reloj del turno como un anillo que se vacía, el confeti al ganar, el sello grande
 * («¡Lotería!», «¡Basta!»), el botón del sonido y la manera de animar solo lo nuevo que pasó.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { oirSonidoMesa, ponerSonidoMesa, sonidoMesaApagado } from "./mesa-sonido";
import "./mesa.css";

/** Un color por asiento (se ven bien sobre papel y sobre el paño). */
export const COLORES_ASIENTO = ["#d9483a", "#2f7fd0", "#2e9e5b", "#e0a21a", "#8a54b8", "#e06aa0", "#1fa3a3", "#7a5230", "#5b6bd6", "#c4632a", "#4d8f2a", "#9a3a5a"];
export const colorDe = (a: number) => COLORES_ASIENTO[((a % COLORES_ASIENTO.length) + COLORES_ASIENTO.length) % COLORES_ASIENTO.length];

export type PropsMesa<V, J> = {
  vista: V;
  /** El nombre de cada asiento (los compañeros ya traen su 🤖). */
  nombres: string[];
  bots: boolean[];
  /** Manda una jugada al servidor (devuelve si se pudo, y por qué no). */
  jugar: (j: J) => Promise<{ ok: boolean; message?: string }>;
  /** Cuándo llegó la vista (para contar el reloj en el teléfono). */
  recibidaEn: number;
};

/** La hora del teléfono, cada `ms`. */
export function useAhora(ms = 250) {
  const [t, setT] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setT(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return t;
}

/** Lo que falta de un plazo que llegó con la vista. */
export const quedaMs = (restanteMs: number, recibidaEn: number, ahora: number) => Math.max(0, restanteMs - (ahora - recibidaEn));

/**
 * Llama a `alNuevo` con cada evento que todavía no se vio (en orden). Al abrir la pantalla no repite lo viejo:
 * solo anima lo que pasa de ahí en adelante.
 */
export function useEventosNuevos<E extends { n: number }>(eventos: E[], alNuevo: (e: E) => void) {
  const visto = useRef<number | null>(null);
  const fn = useRef(alNuevo);
  fn.current = alNuevo;
  useEffect(() => {
    const ult = eventos.length ? eventos[eventos.length - 1].n : 0;
    if (visto.current == null) {
      visto.current = ult;
      return;
    }
    for (const e of eventos) if (e.n > visto.current) fn.current(e);
    visto.current = Math.max(visto.current, ult);
  }, [eventos]);
}

export function useSonidoMesa() {
  return useSyncExternalStore(oirSonidoMesa, () => !sonidoMesaApagado(), () => true);
}

export function BotonSonido() {
  const si = useSonidoMesa();
  return (
    <button
      type="button"
      onClick={() => ponerSonidoMesa(!si)}
      aria-pressed={si}
      aria-label={si ? "Apagar los sonidos de la mesa" : "Prender los sonidos de la mesa"}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-700 shadow ring-1 ring-black/10 transition hover:bg-white dark:bg-stone-800 dark:text-stone-200"
      data-testid="mesa-sonido"
    >
      {si ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}

/** El anillo del reloj (se vacía, y se pone rojo al final). */
export function RelojAnillo({ ms, total, tam = 34, children }: { ms: number; total: number; tam?: number; children?: React.ReactNode }) {
  const r = tam / 2 - 3;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, ms / Math.max(1, total)));
  const color = p < 0.25 ? "#dc2626" : p < 0.5 ? "#e0a21a" : "#2e9e5b";
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: tam, height: tam }} aria-label={`${Math.ceil(ms / 1000)} segundos`} role="timer">
      <svg width={tam} height={tam} className="absolute inset-0 -rotate-90">
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="rgba(255,255,255,.75)" stroke="rgba(0,0,0,.12)" strokeWidth="3" />
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} style={{ transition: "stroke-dashoffset .25s linear, stroke .3s" }} />
      </svg>
      <span className="relative text-[11px] font-black tabular-nums text-stone-800">{children ?? Math.ceil(ms / 1000)}</span>
    </span>
  );
}

/** Una persona sentada a la mesa: su inicial y su color, el 🤖 si es compañero de la computadora, y si es su turno. */
export function Asiento({ nombre, a, bot, activo, yo, extra, tam = 34 }: { nombre: string; a: number; bot?: boolean; activo?: boolean; yo?: boolean; extra?: React.ReactNode; tam?: number }) {
  const limpio = nombre.replace(/\s*🤖\s*$/u, "");
  const inicial = limpio.trim().charAt(0).toUpperCase() || "?";
  return (
    <div className={`flex min-w-0 items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-2 transition ${activo ? "bg-amber-200/90 shadow ring-2 ring-amber-400 dark:bg-amber-700/60" : "bg-white/70 dark:bg-stone-800/70"}`} data-testid={`mesa-asiento-${a}`}>
      <span className={`relative flex shrink-0 items-center justify-center rounded-full font-black text-white shadow-inner ${activo ? "mesa-late" : ""}`} style={{ width: tam, height: tam, background: `radial-gradient(circle at 35% 30%, ${colorDe(a)}cc, ${colorDe(a)})`, fontSize: tam * 0.42 }}>
        {inicial}
        {bot && (
          <span className="absolute -bottom-1 -right-1 rounded-full bg-white px-[2px] text-[11px] leading-none shadow" aria-label="compañero de la computadora">
            🤖
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className={`block truncate text-[12px] font-bold leading-tight ${yo ? "text-amber-900 dark:text-amber-200" : "text-stone-800 dark:text-stone-100"}`}>
          {limpio}
          {yo ? " (tú)" : ""}
        </span>
        {extra != null && <span className="block truncate text-[11px] leading-tight text-stone-600 dark:text-stone-300">{extra}</span>}
      </span>
    </div>
  );
}

/** El sello grande que cruza la pantalla un momento. */
export function Sello({ texto, sub, color = "#d9483a", llave }: { texto: string; sub?: string; color?: string; llave: number | string }) {
  return (
    <div key={llave} className="mesa-sello text-center" role="status" aria-live="assertive">
      <div className="whitespace-nowrap rounded-2xl border-[5px] px-5 py-2 font-serif text-4xl font-black tracking-wide shadow-2xl sm:text-5xl" style={{ color, borderColor: color, background: "rgba(255,250,235,.93)", textShadow: "0 2px 0 rgba(0,0,0,.12)" }}>
        {texto}
      </div>
      {sub && <div className="mt-1 rounded-full bg-black/65 px-3 py-1 text-sm font-bold text-white">{sub}</div>}
    </div>
  );
}

/** El confeti: papelitos de colores que caen (cuadritos, tiras y círculos). */
export function Confeti({ disparo, duracion = 3200 }: { disparo: number; duracion?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!disparo) return;
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const c = cv.getContext("2d");
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = (cv.width = cv.clientWidth * dpr);
    const h = (cv.height = cv.clientHeight * dpr);
    const colores = ["#f1c232", "#d9483a", "#2f7fd0", "#2e9e5b", "#8a54b8", "#e06aa0", "#ffffff"];
    const piezas = Array.from({ length: 140 }, () => ({
      x: w * (0.15 + Math.random() * 0.7),
      y: h * (0.25 + Math.random() * 0.2),
      vx: (Math.random() - 0.5) * 14 * dpr,
      vy: (-8 - Math.random() * 10) * dpr,
      g: (0.28 + Math.random() * 0.18) * dpr,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      t: (5 + Math.random() * 6) * dpr,
      forma: Math.floor(Math.random() * 3),
      c: colores[Math.floor(Math.random() * colores.length)],
    }));
    const inicio = performance.now();
    let id = 0;
    const paso = (ahora: number) => {
      const t = ahora - inicio;
      c.clearRect(0, 0, w, h);
      for (const p of piezas) {
        p.vy += p.g;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        c.save();
        c.globalAlpha = Math.max(0, 1 - Math.max(0, t - duracion * 0.7) / (duracion * 0.3));
        c.translate(p.x, p.y);
        c.rotate(p.r);
        c.fillStyle = p.c;
        if (p.forma === 0) c.fillRect(-p.t / 2, -p.t / 2, p.t, p.t * 0.7);
        else if (p.forma === 1) c.fillRect(-p.t / 2, -p.t / 6, p.t * 1.4, p.t / 3);
        else {
          c.beginPath();
          c.arc(0, 0, p.t / 2.4, 0, Math.PI * 2);
          c.fill();
        }
        c.restore();
      }
      if (t < duracion) id = requestAnimationFrame(paso);
      else c.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [disparo, duracion]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-40 h-full w-full" aria-hidden="true" />;
}

/** Avisa a la banda sonora qué juego está abierto (y al cerrar, que ya no). */
export function useMusicaDeJuego(juego: string) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("jer-musica", { detail: juego }));
    return () => {
      window.dispatchEvent(new CustomEvent("jer-musica", { detail: null }));
    };
  }, [juego]);
}

/** El aviso de un error de la jugada (se borra solo). */
export function useAvisoCorto(ms = 2600): [string | null, (m: string | null) => void] {
  const [m, setM] = useState<string | null>(null);
  useEffect(() => {
    if (!m) return;
    const id = setTimeout(() => setM(null), ms);
    return () => clearTimeout(id);
  }, [m, ms]);
  return [m, setM];
}

export function AvisoMesa({ texto }: { texto: string | null }) {
  if (!texto) return null;
  return (
    <p className="mesa-pop rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-center text-[13px] font-semibold text-amber-900 shadow dark:bg-amber-950/60 dark:text-amber-100" role="status" data-testid="mesa-aviso">
      {texto}
    </p>
  );
}

/** Pone los nombres en el título del final («¡Lotería de @2!» → «¡Lotería de Ana!»). */
export const conNombres = (titulo: string, nombres: string[]) => titulo.replace(/@(\d+)/g, (_, i) => nombres[Number(i)] ?? "alguien");

/**
 * Al terminar la partida, la banda sonora da su golpe final («victoria» o «derrota»): una vez, solo si se estaba
 * jugando (no al abrir un tablero que ya terminó) y nunca para quien solo mira.
 */
export function useGolpeFinal(fin: boolean, gane: boolean, juego: boolean) {
  const antes = useRef(fin);
  useEffect(() => {
    if (fin && !antes.current && juego) window.dispatchEvent(new CustomEvent("jer-golpe", { detail: gane ? "victoria" : "derrota" }));
    antes.current = fin;
  }, [fin, gane, juego]);
}
