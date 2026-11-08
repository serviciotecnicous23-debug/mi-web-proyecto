/**
 * Pantalla de "El aprendiz del templo": portada, marcador, medidores, diálogos, lecciones,
 * preguntas, mejoras, Libro del aprendiz, ceremonia de cada rango y final.
 * El mundo 3D (world.ts) se descarga al abrir el juego y corre en el navegador.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, BookOpen, Check, ChevronRight, CircleHelp, Crown, Droplets, Flame, Loader2, Lock, Maximize2, Minimize2, Music,
  Pause, Play, ScrollText, Sparkles, Star, Sun, Trophy, Volume2, VolumeX, Wheat, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { Leaderboard } from "@/components/games/GameShell";
import type { GameDef } from "@/games/registry";
import {
  HELPERS, HOW_TO, ITEMS, LESSONS, LESSON_ORDER, QUIZZES, RANKS, SPEAKERS, STATIONS, UPGRADES, quizById, upgradeCost, type Line,
} from "./data";
import { gameStore, useGame, type Hud, type Modal } from "./store";
import { GAME_SLUG, clearLocal, gloria, loadLocal, loadRemote, newSave, progressView, type SaveData } from "./state";
import { Portrait, TemploCover } from "./Portrait";
import type { TempleWorld } from "./world";

const GAME_HEIGHT = "min(calc(100dvh - var(--app-nav-h, 64px) - var(--app-tabbar-h, 0px) - 76px), 900px)";
const WorldCtx = createContext<TempleWorld | null>(null);
const useWorld = () => useContext(WorldCtx);

function readPref(key: string, def: boolean) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? def : v === "1";
  } catch {
    return def;
  }
}
function writePref(key: string, v: boolean) {
  try {
    localStorage.setItem(key, v ? "1" : "0");
  } catch {
    /* modo privado */
  }
}

type Phase = "loading" | "title" | "starting" | "playing" | "error";

export default function TemploGame({ game }: { game: GameDef }) {
  const { user } = useAuth();
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const worldMod = useRef<Promise<typeof import("./world")> | null>(null);
  const [world, setWorld] = useState<TempleWorld | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [save, setSave] = useState<SaveData | null>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(() => readPref("juegos-silencio", false));
  const [music, setMusic] = useState(() => readPref("templo-musica", true));
  const [full, setFull] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);

  // Se busca la partida (en el teléfono y, con cuenta, en el servidor) y se descarga el mundo.
  useEffect(() => {
    let cancelled = false;
    worldMod.current = import("./world");
    worldMod.current.catch(() => !cancelled && setPhase("error"));
    (async () => {
      const local = loadLocal();
      const remote = user ? await loadRemote() : null;
      if (cancelled) return;
      let chosen = local;
      if (remote && (!local || remote.savedAt > local.savedAt + 1000)) chosen = remote;
      setSave(chosen);
      setPhase("title");
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // al salir de la página se guarda todo y se libera la tarjeta de video
  const worldRef = useRef<TempleWorld | null>(null);
  worldRef.current = world;
  useEffect(() => {
    return () => {
      worldRef.current?.destroy();
      worldRef.current = null;
      gameStore.reset();
    };
  }, []);

  const start = useCallback(
    async (fresh: boolean) => {
      if (!boxRef.current || !worldMod.current) return;
      setPhase("starting");
      try {
        const mod = await worldMod.current;
        if (fresh) clearLocal();
        const s = fresh || !save ? newSave() : save;
        gameStore.reset();
        const w = new mod.TempleWorld(boxRef.current, s, { loggedIn: !!user, muted, music });
        w.audio.ensure();
        // solo en desarrollo: acceso para revisar el juego desde la consola
        if (import.meta.env.DEV) (window as unknown as { __templo?: TempleWorld }).__templo = w;
        setWorld(w);
        setPhase("playing");
        wrapRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch (err) {
        console.error("[templo]", err);
        setPhase("error");
      }
    },
    [save, user, muted, music],
  );

  const togglePause = useCallback(
    (p?: boolean) => {
      const next = p ?? !paused;
      setPaused(next);
      world?.setPaused(next);
      world?.audio.click();
    },
    [paused, world],
  );

  // teclado: P o Esc pausa; L abre el libro; M las mejoras
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (gameStore.busy) return;
      if (k === "p" || k === "escape") togglePause();
      else if (k === "l" && !paused) gameStore.push({ kind: "book" });
      else if (k === "m" && !paused) gameStore.push({ kind: "upgrades" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, togglePause]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleMute = () => {
    const n = !muted;
    setMuted(n);
    writePref("juegos-silencio", n);
    world?.setMuted(n);
  };
  const toggleMusic = () => {
    const n = !music;
    setMusic(n);
    writePref("templo-musica", n);
    world?.setMusic(n);
  };
  const toggleFull = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (immersive) setImmersive(false);
      else if (wrapRef.current?.requestFullscreen) await wrapRef.current.requestFullscreen();
      else setImmersive(true);
    } catch {
      setImmersive((v) => !v);
    }
  };

  const big = full || immersive;
  return (
    <WorldCtx.Provider value={world}>
      <div
        ref={wrapRef}
        className={`select-none overflow-hidden bg-[#1a1408] ${big ? "fixed inset-0 z-[60] rounded-none" : "relative w-full rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-950/30"}`}
        style={big ? undefined : { height: GAME_HEIGHT, minHeight: 460, scrollMarginTop: "calc(var(--app-nav-h, 64px) + 8px)" }}
        data-testid="templo-box"
      >
        <div ref={boxRef} className="absolute inset-0" />
        {phase === "playing" && world && <HudLayer paused={paused} onPause={() => togglePause(true)} big={big} onFull={() => void toggleFull()} />}
        {phase === "playing" && paused && (
          <PauseMenu
            onResume={() => togglePause(false)}
            muted={muted}
            music={music}
            big={big}
            onMute={toggleMute}
            onMusic={toggleMusic}
            onFull={() => void toggleFull()}
          />
        )}
        {phase === "playing" && world && <ModalLayer />}
        {phase !== "playing" && (
          <TitleScreen
            game={game}
            phase={phase}
            save={save}
            loggedIn={!!user}
            confirmNew={confirmNew}
            setConfirmNew={setConfirmNew}
            onStart={start}
            muted={muted}
            onMute={toggleMute}
          />
        )}
      </div>
    </WorldCtx.Provider>
  );
}

// ================================================================ portada
function TitleScreen(props: {
  game: GameDef;
  phase: Phase;
  save: SaveData | null;
  loggedIn: boolean;
  confirmNew: boolean;
  setConfirmNew: (v: boolean) => void;
  onStart: (fresh: boolean) => void;
  muted: boolean;
  onMute: () => void;
}) {
  const { game, phase, save, loggedIn, confirmNew, setConfirmNew, onStart } = props;
  const has = !!save && (save.ofrendas > 0 || Object.keys(save.built).length > 0);
  const built = save ? STATIONS.filter((s) => save.built[s.id]).length : 0;
  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-[radial-gradient(ellipse_at_50%_0%,#5b2a6e_0%,#2b1a3a_45%,#120c08_100%)] text-white">
      <div className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-4 px-5 py-6 text-center">
        <TemploCover className="w-full max-w-sm rounded-2xl shadow-2xl ring-1 ring-amber-300/40" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">{game.tagline}</p>
          <h2 className="mt-1 font-serif text-3xl font-black tracking-tight sm:text-4xl">{game.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">{game.description}</p>
        </div>
        {phase === "loading" || phase === "starting" ? (
          <div className="flex items-center gap-2 text-sm text-amber-100">
            <Loader2 className="h-5 w-5 animate-spin" /> {phase === "starting" ? "Abriendo las puertas del templo…" : "Preparando el templo…"}
          </div>
        ) : phase === "error" ? (
          <div className="space-y-2">
            <p className="font-semibold">No se pudo cargar el juego.</p>
            <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
          </div>
        ) : confirmNew ? (
          <div className="w-full max-w-xs space-y-2 rounded-xl border border-amber-300/30 bg-black/40 p-4">
            <p className="text-sm">¿Empezar desde el principio? Se borra la partida de este teléfono{loggedIn ? " y la de tu cuenta" : ""}.</p>
            <div className="flex justify-center gap-2">
              <Button variant="secondary" onClick={() => setConfirmNew(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => onStart(true)} data-testid="button-templo-confirm-new">
                Sí, empezar de nuevo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-xs flex-col gap-2">
            {has && save ? (
              <>
                <Button size="lg" className="rounded-full bg-amber-500 text-lg font-bold text-amber-950 hover:bg-amber-400" onClick={() => onStart(false)} data-testid="button-templo-continue">
                  <Play className="mr-2 h-5 w-5 fill-current" /> Continuar
                </Button>
                <p className="text-xs text-amber-100/90">
                  Día {save.day} · {RANKS[save.rank].nombre} · {built}/{STATIONS.length} lugares restaurados · Gloria {gloria(save).toLocaleString("es-419")}
                </p>
                <button type="button" className="text-xs text-white/60 underline underline-offset-2 hover:text-white" onClick={() => setConfirmNew(true)}>
                  Empezar de nuevo
                </button>
              </>
            ) : (
              <Button size="lg" className="rounded-full bg-amber-500 text-lg font-bold text-amber-950 hover:bg-amber-400" onClick={() => onStart(false)} data-testid="button-templo-start">
                <Play className="mr-2 h-5 w-5 fill-current" /> Comenzar
              </Button>
            )}
          </div>
        )}
        <ul className="max-w-sm space-y-1 text-left text-xs text-white/75">
          {HOW_TO.slice(0, 4).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-amber-300">✦</span> {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/60">
          <button type="button" onClick={props.onMute} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">
            {props.muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />} {props.muted ? "Sin sonido" : "Con sonido (mejor con audífonos)"}
          </button>
          <span>{loggedIn ? "Tu avance se guarda en este teléfono y en tu cuenta." : "Tu avance se guarda en este teléfono."}</span>
          {!loggedIn && (
            <Link href={loginUrl()} className="font-semibold text-amber-300 underline">
              Inicia sesión para guardarlo en tu cuenta
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ================================================================ marcador
const fmt = (n: number) => Math.floor(n).toLocaleString("es-419");

function Meter({ icon, label, value, max, color, testid }: { icon: React.ReactNode; label: string; value: number; max: number; color: string; testid?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const low = pct < 25;
  return (
    <div className={`flex items-center gap-1.5 rounded-full bg-black/45 py-0.5 pl-1 pr-2 backdrop-blur-sm ${low ? "ring-1 ring-red-400/80" : ""}`} title={label} data-testid={testid}>
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${low ? "animate-pulse" : ""}`} style={{ background: color }}>
        {icon}
      </span>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/20 sm:w-20">
        <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function Dots({ icon, label, value, max, color, lit }: { icon: React.ReactNode; label: string; value: number; max: number; color: string; lit?: boolean }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-black/45 py-0.5 pl-1 pr-2 backdrop-blur-sm" title={label}>
      <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: color }}>
        {icon}
      </span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: i < Math.round(value) ? (lit ? "#ffe38a" : color) : "rgba(255,255,255,.22)", boxShadow: lit && i < Math.round(value) ? "0 0 6px #ffcf5a" : undefined }} />
        ))}
      </div>
    </div>
  );
}

function DayClock({ hud }: { hud: Hud }) {
  const night = hud.time < 0.2 || hud.time > 0.8;
  const a = hud.time * Math.PI * 2 - Math.PI / 2;
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black/45 py-0.5 pl-0.5 pr-2.5 text-[11px] font-semibold text-white backdrop-blur-sm" data-testid="templo-clock">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill={night ? "#1b2140" : "#7fb5e6"} />
        <path d="M1 12 A11 11 0 0 0 23 12 Z" fill={night ? "#0d1022" : "#d9c49a"} opacity="0.85" />
        <circle cx={12 + Math.cos(a + Math.PI) * 7} cy={12 + Math.sin(a + Math.PI) * 7} r="3" fill={night ? "#e8ecff" : "#ffd66b"} />
      </svg>
      <span>
        Día {hud.day} · {hud.phase}
        {hud.sabbath && <span className="ml-1 rounded bg-amber-400/90 px-1 text-[10px] text-amber-950">Reposo</span>}
      </span>
    </div>
  );
}

function HudLayer({ paused, onPause, big, onFull }: { paused: boolean; onPause: () => void; big: boolean; onFull: () => void }) {
  const { hud, toasts, modal } = useGame();
  const world = useWorld();
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ topH: 96, wide: false });
  const [hint, setHint] = useState(true);
  const prevGozo = useRef(hud.gozo);
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (hud.gozo > prevGozo.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 180);
      prevGozo.current = hud.gozo;
      return () => clearTimeout(t);
    }
    prevGozo.current = hud.gozo;
  }, [hud.gozo]);
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 14000);
    return () => clearTimeout(t);
  }, []);
  // el objetivo va debajo del marcador en el celular y arriba al centro en pantallas anchas
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const w = rootRef.current?.clientWidth || 0;
      const h = topRef.current?.offsetHeight || 96;
      setLayout((l) => (l.topH !== h || l.wide !== w >= 960 ? { topH: h, wide: w >= 960 } : l));
    });
    if (rootRef.current) ro.observe(rootRef.current);
    if (topRef.current) ro.observe(topRef.current);
    return () => ro.disconnect();
  }, []);
  const open = (m: Modal) => {
    world?.audio.page();
    gameStore.push(m);
  };
  const c = hud.carrying;
  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10 text-white">
      {/* arriba */}
      <div ref={topRef} className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/55 via-black/25 to-transparent p-2 pb-4 sm:p-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className={`flex items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-1 pl-1.5 pr-3 font-black text-amber-950 shadow-lg transition-transform ${bump ? "scale-110" : ""}`} title="Gozo" data-testid="templo-gozo">
              <Sparkles className="h-4 w-4" />
              <span className="tabular-nums">{fmt(hud.gozo)}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-sky-200 py-1 pl-1.5 pr-3 font-black text-sky-950 shadow-lg" title="Sabiduría">
              <ScrollText className="h-4 w-4" />
              <span className="tabular-nums">{hud.sabiduria}</span>
            </div>
            <button
              type="button"
              className={`pointer-events-auto flex items-center gap-1 rounded-full py-1 pl-1.5 pr-3 text-xs font-bold shadow-lg ${hud.rankReady ? "animate-pulse bg-white text-amber-900" : "bg-black/50 text-white"}`}
              onClick={() => open({ kind: "book" })}
              title="Tu rango"
              data-testid="templo-rank"
            >
              <Crown className="h-4 w-4 text-amber-400" />
              {RANKS[hud.rank].nombre}
              {hud.rankReady && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {hud.fireUnlocked && <Meter icon={<Flame className="h-3 w-3" />} label="Fuego del altar" value={hud.fuel} max={hud.fuelMax} color="#f97316" testid="templo-fuego" />}
            {hud.purityUnlocked && <Meter icon={<Droplets className="h-3 w-3" />} label="Pureza (lávate en el mar de bronce)" value={hud.purity} max={hud.purityMax} color="#38bdf8" testid="templo-pureza" />}
            {hud.lamps !== null && <Dots icon={<Sun className="h-3 w-3" />} label="Aceite de las siete lámparas" value={hud.lamps} max={7} color="#eab308" lit={hud.lampsLit} />}
            {hud.bread !== null && (
              <div className="flex items-center gap-1 rounded-full bg-black/45 py-0.5 pl-1 pr-2 text-[11px] font-bold backdrop-blur-sm" title="Panes en la mesa">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-700">
                  <Wheat className="h-3 w-3" />
                </span>
                {hud.bread}/12
              </div>
            )}
            {hud.incense !== null && <Dots icon={<span className="text-[10px]">🌿</span>} label="Incienso en el altar de oro" value={hud.incense} max={4} color="#a78bfa" />}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="pointer-events-auto flex gap-1">
            <IconBtn label="Mejoras (M)" onClick={() => open({ kind: "upgrades" })} testid="button-templo-mejoras">
              <Sparkles className="h-5 w-5" />
            </IconBtn>
            <IconBtn label="Libro del aprendiz (L)" onClick={() => open({ kind: "book" })} testid="button-templo-libro">
              <BookOpen className="h-5 w-5" />
            </IconBtn>
            <IconBtn label={big ? "Salir de pantalla completa" : "Pantalla completa"} onClick={onFull}>
              {big ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </IconBtn>
            <IconBtn label="Pausa (P)" onClick={onPause} testid="button-templo-pausa">
              <Pause className="h-5 w-5" />
            </IconBtn>
          </div>
          <DayClock hud={hud} />
          <div className="rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm" title="Gloria del templo (tu puntaje)">
            <Trophy className="mr-1 inline h-3 w-3 text-amber-300" />
            {fmt(hud.gloria)}
            {hud.mult > 1.05 && <span className="ml-1 text-amber-300">· gozo ×{hud.mult.toLocaleString("es-419")}</span>}
          </div>
        </div>
      </div>

      {/* objetivo y evento */}
      {!modal && !paused && (
        <div className="absolute inset-x-0 flex flex-col items-center gap-1 px-3" style={{ top: layout.wide ? 12 : layout.topH + 2 }}>
          {hud.objective && (
            <div className="max-w-[94%] rounded-2xl border border-amber-200/50 bg-[#2b1d0c]/80 px-3 py-1.5 text-center text-[13px] font-semibold leading-snug shadow-lg backdrop-blur sm:max-w-md" data-testid="templo-objetivo">
              <ChevronRight className="-mt-0.5 mr-0.5 inline h-4 w-4 text-amber-300" />
              {hud.objective}
            </div>
          )}
          {hud.event && <div className="animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-0.5 text-xs font-black text-amber-950 shadow-lg">{hud.event}</div>}
        </div>
      )}

      {/* abajo: lo que llevas, avisos y ayuda */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 p-3 pb-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-[92%] rounded-xl px-3 py-1.5 text-center text-[13px] font-semibold shadow-lg sm:max-w-lg ${t.tone === "gold" ? "bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950" : t.tone === "warn" ? "bg-red-50 text-red-900" : "bg-white/95 text-stone-800"}`}
          >
            {t.text}
          </div>
        ))}
        {c && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/55 py-1 pl-2 pr-1 text-sm font-bold backdrop-blur" data-testid="templo-carga">
            <span className="text-lg">{ITEMS[c.type].icono}</span>
            <span className="tabular-nums">
              {c.count}/{c.cap}
            </span>
            {hud.canDrop ? (
              <button type="button" className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs hover:bg-white/25" onClick={() => world?.dropCarry()} data-testid="button-templo-soltar">
                Soltar
              </button>
            ) : (
              <span className="pr-2 text-xs text-white/70">{c.count >= c.cap ? "¡lleno!" : ""}</span>
            )}
          </div>
        )}
        {hint && !modal && (
          <div className="rounded-full bg-black/45 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
            Toca y arrastra para caminar · computadora: flechas o W A S D
          </div>
        )}
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children, testid }: { label: string; onClick: () => void; children: React.ReactNode; testid?: string }) {
  const world = useWorld();
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        world?.audio.click();
        onClick();
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur hover:bg-black/70 active:scale-95"
      data-testid={testid}
    >
      {children}
    </button>
  );
}

function PauseMenu(props: { onResume: () => void; muted: boolean; music: boolean; big: boolean; onMute: () => void; onMusic: () => void; onFull: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xs space-y-3 rounded-2xl border border-amber-300/30 bg-[#20160a]/95 p-5 text-center text-white shadow-2xl">
        <h3 className="font-serif text-2xl font-black">En pausa</h3>
        <Button size="lg" className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={props.onResume} data-testid="button-templo-seguir">
          <Play className="mr-2 h-5 w-5 fill-current" /> Seguir sirviendo
        </Button>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Button variant="secondary" onClick={props.onMute}>
            {props.muted ? <VolumeX className="mr-1 h-4 w-4" /> : <Volume2 className="mr-1 h-4 w-4" />} {props.muted ? "Sin sonido" : "Sonido"}
          </Button>
          <Button variant="secondary" onClick={props.onMusic} className={props.music ? "" : "opacity-60"}>
            <Music className="mr-1 h-4 w-4" /> {props.music ? "Música" : "Sin música"}
          </Button>
          <Button variant="secondary" onClick={() => gameStore.push({ kind: "help" })}>
            <CircleHelp className="mr-1 h-4 w-4" /> Ayuda
          </Button>
          <Button variant="secondary" onClick={props.onFull}>
            {props.big ? <Minimize2 className="mr-1 h-4 w-4" /> : <Maximize2 className="mr-1 h-4 w-4" />} Pantalla
          </Button>
        </div>
        <p className="text-xs text-white/60">Tu avance se guarda solo. Puedes cerrar cuando quieras.</p>
        <Button asChild variant="ghost" className="w-full text-white/80 hover:text-white">
          <Link href="/juegos">
            <ArrowLeft className="mr-1 h-4 w-4" /> Volver a los juegos
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ================================================================ ventanas
const modalKeys = new WeakMap<Modal, number>();
let modalSeq = 0;

function ModalLayer() {
  const { modal } = useGame();
  if (!modal) return null;
  let key = modalKeys.get(modal);
  if (!key) {
    key = ++modalSeq;
    modalKeys.set(modal, key);
  }
  const bottom = modal.kind === "dialog" || modal.kind === "rank";
  return (
    <div className={`pointer-events-auto absolute inset-0 z-50 flex justify-center p-2 sm:p-4 ${bottom ? "items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent" : "items-center bg-black/55 backdrop-blur-[2px]"}`}>
      <ModalBody key={key} modal={modal} />
    </div>
  );
}

function ModalBody({ modal }: { modal: Modal }) {
  switch (modal.kind) {
    case "dialog":
      return <DialogView lines={modal.lines} />;
    case "lesson":
      return <LessonView lessonId={modal.lessonId} />;
    case "quiz":
      return <QuizView quizId={modal.quizId} source={modal.source} step={modal.step ?? 0} />;
    case "upgrades":
      return <UpgradesView />;
    case "book":
      return <BookView />;
    case "help":
      return <HelpView />;
    case "offline":
      return <OfflineView gained={modal.gained} minutes={modal.minutes} />;
    case "rank":
      return <RankView rank={modal.rank} />;
    case "finale":
      return <FinaleView />;
  }
}

function Card({ children, title, onClose, wide, testid }: { children: React.ReactNode; title?: React.ReactNode; onClose?: () => void; wide?: boolean; testid?: string }) {
  return (
    <div
      className={`relative flex max-h-full w-full ${wide ? "max-w-2xl" : "max-w-md"} flex-col overflow-hidden rounded-2xl border border-amber-300/40 bg-[#fffaf0] text-stone-800 shadow-2xl dark:bg-[#1f1a12] dark:text-stone-100`}
      data-testid={testid}
    >
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2.5 dark:border-amber-900/50 dark:from-amber-950/60 dark:to-transparent">
          <div className="font-serif text-lg font-bold text-amber-900 dark:text-amber-200">{title}</div>
          {onClose && (
            <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-black/10" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}

function VerseBox({ text, refName }: { text: string; refName: string }) {
  return (
    <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-3 py-2 font-serif text-[15px] italic leading-relaxed text-stone-700 dark:bg-amber-950/30 dark:text-stone-200">
      «{text}»
      <footer className="mt-1 text-xs font-semibold not-italic text-amber-800 dark:text-amber-300">{refName} (RVR1960)</footer>
    </blockquote>
  );
}

function DialogView({ lines }: { lines: Line[] }) {
  const world = useWorld();
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const line = lines[i];
  useEffect(() => setShown(0), [i]);
  useEffect(() => {
    if (shown >= line.texto.length) return;
    const t = setTimeout(() => {
      setShown((n) => Math.min(line.texto.length, n + 2));
      if (shown % 6 === 0) world?.audio.blip(line.quien);
    }, 22);
    return () => clearTimeout(t);
  }, [shown, line, world]);
  const next = useCallback(() => {
    if (shown < line.texto.length) setShown(line.texto.length);
    else if (i < lines.length - 1) {
      world?.audio.click();
      setI(i + 1);
    } else {
      world?.audio.click();
      gameStore.close();
    }
  }, [shown, line, i, lines.length, world]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next]);
  return (
    <div
      role="dialog"
      className="mb-2 w-full max-w-2xl cursor-pointer rounded-2xl border-2 border-amber-300/70 bg-[#fffaf0]/97 p-3 text-stone-800 shadow-2xl sm:p-4 dark:bg-[#1f1a12]/97 dark:text-stone-100"
      onClick={next}
      data-testid="templo-dialogo"
    >
      <div className="flex gap-3">
        <Portrait who={line.quien} size={64} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">{SPEAKERS[line.quien]}</p>
          <p className="mt-0.5 min-h-[3.5em] font-serif text-[15.5px] leading-relaxed sm:text-base">
            {line.texto.slice(0, shown)}
            <span className="opacity-0">{line.texto.slice(shown)}</span>
          </p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-amber-800/80 dark:text-amber-300/80">{line.ref || ""}</span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300">
              {i + 1}/{lines.length} {i < lines.length - 1 ? "Siguiente" : "Continuar"} <ChevronRight className="h-4 w-4 animate-pulse" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonView({ lessonId }: { lessonId: string }) {
  const world = useWorld();
  const l = LESSONS[lessonId];
  useEffect(() => world?.audio.page(), [world]);
  if (!l) return null;
  const n = LESSON_ORDER.indexOf(lessonId) + 1;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> Libro del aprendiz · Lección {n} de {LESSON_ORDER.length}
        </span>
      }
      testid="templo-leccion"
    >
      <div className="space-y-3 p-4">
        <h3 className="font-serif text-2xl font-black text-amber-900 dark:text-amber-200">{l.titulo}</h3>
        <p className="text-[15px] leading-relaxed">{l.texto}</p>
        <VerseBox text={l.verso.text} refName={l.verso.ref} />
        <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-950/30">
          <p className="mb-1 text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">Para hoy</p>
          <p className="mb-2 text-sm">{l.hoy.texto}</p>
          <p className="font-serif text-sm italic text-stone-700 dark:text-stone-300">
            «{l.hoy.verso.text}» <span className="not-italic font-semibold text-sky-800 dark:text-sky-300">— {l.hoy.verso.ref}</span>
          </p>
        </div>
        {l.quiz && <p className="text-xs text-stone-500">Azarías te hará una pregunta sobre esto: búscalo junto al pórtico (verás un «?»).</p>}
        <Button
          className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
          onClick={() => {
            world?.audio.click();
            gameStore.close();
          }}
          data-testid="button-templo-leccion"
        >
          <Check className="mr-1 h-4 w-4" /> Guardar en mi libro
        </Button>
      </div>
    </Card>
  );
}

function QuizView({ quizId, source, step }: { quizId: string; source: "azarias" | "pueblo" | "examen"; step: number }) {
  const world = useWorld();
  const q = quizById(quizId);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(false);
  const [first] = useState(() => !!world && world.s.quizzes[quizId] !== true);
  if (!q) return null;
  const title = source === "azarias" ? "Azarías te pregunta" : source === "pueblo" ? "Alguien del pueblo pregunta" : `Examen del sumo sacerdote · ${step + 1} de 3`;
  const choose = (k: number) => {
    if (picked !== null || !world) return;
    setPicked(k);
    setOk(world.answer(q.id, k, source, step));
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          {source === "pueblo" ? <Portrait who="conanias" size={28} /> : <Portrait who="azarias" size={28} />} {title}
        </span>
      }
      testid="templo-pregunta"
    >
      <div className="space-y-3 p-4">
        <p className="font-serif text-lg font-bold leading-snug">{q.pregunta}</p>
        <div className="space-y-2">
          {q.opciones.map((o, k) => {
            const isRight = k === q.correcta;
            const state = picked === null ? "" : isRight ? "right" : picked === k ? "wrong" : "dim";
            return (
              <button
                key={k}
                type="button"
                disabled={picked !== null}
                onClick={() => choose(k)}
                className={`w-full rounded-xl border-2 px-3 py-2.5 text-left text-[15px] font-semibold transition ${
                  state === "right"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : state === "wrong"
                      ? "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200"
                      : state === "dim"
                        ? "border-stone-200 opacity-50 dark:border-stone-700"
                        : "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent dark:hover:bg-amber-950/30"
                }`}
                data-testid={`templo-opcion-${k}`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-900 dark:bg-amber-900 dark:text-amber-100">{"ABC"[k]}</span>
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className={`rounded-xl p-3 ${ok ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-amber-50 dark:bg-amber-950/30"}`}>
            <p className="font-bold">{ok ? (first ? "¡Correcto! +1 de sabiduría" : "¡Correcto!") : `La respuesta es: ${q.opciones[q.correcta]}`}</p>
            <p className="mt-1 text-sm">{q.explica}</p>
            <p className="mt-1 text-xs font-semibold text-amber-800 dark:text-amber-300">{q.ref}</p>
            <Button
              className="mt-3 w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
              onClick={() => {
                world?.audio.click();
                gameStore.close();
              }}
              data-testid="button-templo-pregunta-seguir"
            >
              Continuar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function UpgradesView() {
  const world = useWorld();
  const { hud } = useGame();
  const [, force] = useState(0);
  if (!world) return null;
  const s = world.s;
  const view = progressView(s);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Mejoras · ✦ {fmt(hud.gozo)}
        </span>
      }
      onClose={() => gameStore.close()}
      testid="templo-mejoras"
    >
      <div className="space-y-2 p-3">
        {UPGRADES.map((u) => {
          const lvl = s.upgrades[u.id] || 0;
          const max = lvl >= u.max;
          const open = u.requiere(view);
          const cost = upgradeCost(u, lvl);
          const can = open && !max && hud.gozo >= cost;
          return (
            <div key={u.id} className={`flex items-center gap-3 rounded-xl border p-2.5 ${open ? "border-amber-200 bg-white dark:border-amber-900 dark:bg-transparent" : "border-stone-200 opacity-60 dark:border-stone-700"}`}>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{u.nombre}</p>
                <p className="text-xs text-stone-600 dark:text-stone-400">{open ? u.efecto : "Se abre más adelante en la historia"}</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: u.max }, (_, i) => (
                    <span key={i} className={`h-1.5 w-4 rounded-full ${i < lvl ? "bg-amber-500" : "bg-stone-200 dark:bg-stone-700"}`} />
                  ))}
                </div>
              </div>
              {open && !max && (
                <Button
                  size="sm"
                  disabled={!can}
                  className="min-w-[84px] rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
                  onClick={() => {
                    if (world.buyUpgrade(u.id)) force((n) => n + 1);
                  }}
                  data-testid={`button-mejora-${u.id}`}
                >
                  ✦ {fmt(cost)}
                </Button>
              )}
              {max && <span className="text-xs font-bold text-emerald-700">Completo</span>}
              {!open && <Lock className="h-4 w-4 text-stone-400" />}
            </div>
          );
        })}
        <p className="px-1 pt-1 text-xs text-stone-500">Los levitas se llaman parándote en los círculos azules del atrio.</p>
      </div>
    </Card>
  );
}

function BookView() {
  const world = useWorld();
  const { user } = useAuth();
  const [tab, setTab] = useState<"lecciones" | "rangos" | "servicio" | "gloria">("lecciones");
  const [lesson, setLesson] = useState<string | null>(null);
  const [board, setBoard] = useState<Parameters<typeof Leaderboard>[0]["board"]>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (tab !== "gloria" || !user) return;
    setLoading(true);
    fetch(`/api/juegos/${GAME_SLUG}/ranking`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => setBoard(b))
      .finally(() => setLoading(false));
  }, [tab, user]);
  if (!world) return null;
  const s = world.s;
  if (lesson && LESSONS[lesson]) {
    const l = LESSONS[lesson];
    return (
      <Card title={<span className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> {l.titulo}</span>} onClose={() => setLesson(null)} wide>
        <div className="space-y-3 p-4">
          <p className="text-[15px] leading-relaxed">{l.texto}</p>
          <VerseBox text={l.verso.text} refName={l.verso.ref} />
          <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-950/30">
            <p className="mb-1 text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">Para hoy</p>
            <p className="mb-2 text-sm">{l.hoy.texto}</p>
            <p className="font-serif text-sm italic">«{l.hoy.verso.text}» <span className="not-italic font-semibold">— {l.hoy.verso.ref}</span></p>
          </div>
          <Button variant="secondary" className="w-full" onClick={() => setLesson(null)}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Volver al libro
          </Button>
        </div>
      </Card>
    );
  }
  const answered = QUIZZES.filter((q) => s.quizzes[q.id] === true).length;
  const helpers = HELPERS.reduce((a, h) => a + (s.helpers[h.id] || 0), 0);
  const hours = Math.floor(s.playSeconds / 3600), mins = Math.floor((s.playSeconds % 3600) / 60);
  return (
    <Card title={<span className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Libro del aprendiz</span>} onClose={() => gameStore.close()} wide testid="templo-libro">
      <div className="flex gap-1 border-b border-amber-200/60 px-3 pt-2 text-sm dark:border-amber-900/50">
        {(
          [
            ["lecciones", "Lecciones"],
            ["rangos", "Rangos"],
            ["servicio", "Mi servicio"],
            ["gloria", "Tabla de gloria"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              world.audio.page();
              setTab(id);
            }}
            className={`rounded-t-lg px-3 py-1.5 font-semibold ${tab === id ? "bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-3">
        {tab === "lecciones" && (
          <>
            <p className="mb-2 text-xs text-stone-500">
              {s.lessons.length} de {LESSON_ORDER.length} lecciones · {answered} de {QUIZZES.length} preguntas respondidas bien
            </p>
            <ol className="grid gap-1.5 sm:grid-cols-2">
              {LESSON_ORDER.map((id, i) => {
                const open = s.lessons.includes(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      disabled={!open}
                      onClick={() => {
                        world.audio.page();
                        setLesson(id);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-sm ${open ? "border-amber-200 bg-white hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent dark:hover:bg-amber-950/30" : "border-dashed border-stone-200 text-stone-400 dark:border-stone-700"}`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${open ? "bg-amber-500 text-amber-950" : "bg-stone-200 dark:bg-stone-700"}`}>{i + 1}</span>
                      {open ? LESSONS[id].titulo : "Por descubrir"}
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        )}
        {tab === "rangos" && (
          <ol className="space-y-2">
            {RANKS.map((r, i) => (
              <li key={r.nombre} className={`flex gap-3 rounded-xl border p-2.5 ${i === s.rank ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30" : "border-stone-200 dark:border-stone-700"} ${i > s.rank ? "opacity-70" : ""}`}>
                <Portrait who={`rank${i}` as "rank0"} size={48} />
                <div className="min-w-0">
                  <p className="font-bold">
                    {r.nombre} {i < s.rank && <Check className="inline h-4 w-4 text-emerald-600" />} {i === s.rank && <span className="text-xs text-amber-700">(ahora)</span>}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400">{r.ropa}</p>
                  {i === s.rank + 1 && <p className="mt-1 text-xs font-semibold text-amber-800 dark:text-amber-300">Para llegar: {r.requisito}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
        {tab === "servicio" && (
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {(
              [
                ["Días de servicio", s.day],
                ["Ofrendas presentadas", s.ofrendas],
                ["Lugares restaurados", `${STATIONS.filter((x) => s.built[x.id]).length}/${STATIONS.length}`],
                ["Levitas que ayudan", helpers],
                ["Sabiduría", s.sabiduria],
                ["Gozo recibido", fmt(s.lifetimeGozo)],
                ["Gloria del templo", fmt(gloria(s))],
                ["Tiempo sirviendo", hours ? `${hours} h ${mins} min` : `${mins} min`],
                ["Diezmos guardados", s.abundance],
              ] as [string, string | number][]
            ).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-amber-200 bg-white p-2.5 dark:border-amber-900 dark:bg-transparent">
                <p className="text-xs text-stone-500">{k}</p>
                <p className="text-lg font-black">{v}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "gloria" &&
          (user ? (
            <Leaderboard board={board} loading={loading} />
          ) : (
            <p className="py-4 text-center text-sm">
              <Link href={loginUrl()} className="font-semibold text-amber-700 underline">
                Inicia sesión
              </Link>{" "}
              para aparecer en la tabla de gloria.
            </p>
          ))}
      </div>
    </Card>
  );
}

function HelpView() {
  return (
    <Card title={<span className="flex items-center gap-2"><CircleHelp className="h-5 w-5" /> Cómo se juega</span>} onClose={() => gameStore.close()}>
      <ul className="space-y-2 p-4 text-[15px]">
        {HOW_TO.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="text-amber-500">✦</span>
            {h}
          </li>
        ))}
        <li className="flex gap-2">
          <span className="text-amber-500">✦</span>Mañana y tarde, en la hora del sacrificio, las ofrendas valen el doble. Llena las siete lámparas antes de que anochezca.
        </li>
      </ul>
    </Card>
  );
}

function OfflineView({ gained, minutes }: { gained: number; minutes: number }) {
  return (
    <Card title="Mientras no estabas">
      <div className="space-y-3 p-4 text-center">
        <Portrait who="conanias" size={72} />
        <p className="text-[15px]">
          Durante {minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`} los levitas siguieron sirviendo en la casa de Jehová.
        </p>
        <p className="text-3xl font-black text-amber-600">+{fmt(gained)} de gozo</p>
        <p className="text-xs text-stone-500">«Para ministrar en la casa de Jehová, en los atrios y en las cámaras» (1 Crónicas 23:28)</p>
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => gameStore.close()}>
          ¡Gracias, hermanos!
        </Button>
      </div>
    </Card>
  );
}

function RankView({ rank }: { rank: number }) {
  const world = useWorld();
  const r = RANKS[rank];
  const verse = useMemo(() => {
    const id = rank === 1 ? "sacerdote" : rank === 4 ? "sumo" : null;
    return id ? LESSONS[id].verso : { ref: "Números 10:8", text: "Y los hijos de Aarón, los sacerdotes, tocarán las trompetas; y las tendréis por estatuto perpetuo por vuestras generaciones." };
  }, [rank]);
  return (
    <div className="mb-2 w-full max-w-md overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-[#fffaf0] text-center text-stone-800 shadow-2xl dark:from-amber-950 dark:to-[#1f1a12] dark:text-stone-100" data-testid="templo-rango">
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-950">Nuevo rango</div>
      <div className="space-y-2 p-4">
        <div className="flex justify-center">
          <Portrait who={`rank${rank}` as "rank0"} size={88} />
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-300">Ahora eres</p>
        <h3 className="font-serif text-3xl font-black text-amber-800 dark:text-amber-200">{r.nombre}</h3>
        <p className="text-sm">{r.ropa}</p>
        <VerseBox text={verse.text} refName={verse.ref} />
        <Button
          className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
          onClick={() => {
            world?.audio.click();
            gameStore.close();
          }}
          data-testid="button-templo-rango"
        >
          ¡Gloria a Dios! Seguir sirviendo
        </Button>
      </div>
    </div>
  );
}

function FinaleView() {
  const world = useWorld();
  const { user } = useAuth();
  if (!world) return null;
  const s = world.s;
  return (
    <Card title={<span className="flex items-center gap-2"><Crown className="h-5 w-5" /> El camino está abierto</span>} testid="templo-final">
      <div className="space-y-3 p-4 text-center">
        <Portrait who="rank4" size={84} />
        <p className="text-[15px] leading-relaxed">
          Serviste {s.day} días en la casa de Jehová, presentaste {fmt(s.ofrendas)} ofrendas del pueblo y guardaste {s.sabiduria} respuestas de sabiduría. Del atrio llegaste al Lugar Santísimo.
        </p>
        <VerseBox text="Así que, hermanos, teniendo libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo, por el camino nuevo y vivo que él nos abrió a través del velo, esto es, de su carne." refName="Hebreos 10:19-20" />
        <p className="text-2xl font-black text-amber-600">Gloria del templo: {fmt(gloria(s))}</p>
        <p className="text-xs text-stone-500">{user ? "Tu gloria ya está en la tabla de la comunidad." : "Inicia sesión para entrar a la tabla de gloria."} Puedes seguir sirviendo: el velo quedó abierto.</p>
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => gameStore.close()} data-testid="button-templo-final">
          Seguir sirviendo
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            gameStore.close();
            gameStore.push({ kind: "book" });
          }}
        >
          <Trophy className="mr-1 h-4 w-4" /> Ver mi libro y la tabla de gloria
        </Button>
      </div>
    </Card>
  );
}
