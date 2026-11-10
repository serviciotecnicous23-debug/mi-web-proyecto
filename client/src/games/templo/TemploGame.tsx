/**
 * Pantalla de "El aprendiz del templo": portada, marcador, medidores, diálogos, lecciones,
 * preguntas, mejoras, Libro del aprendiz, ceremonia de cada rango y final.
 * El mundo 3D (world.ts) se descarga al abrir el juego y corre en el navegador.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, BookOpen, Check, ChevronRight, CircleHelp, Clock, Crown, Droplets, Flame, Gift, Loader2, Lock, Maximize2, Medal, Minimize2, Music,
  Pause, Play, Route, ScrollText, Sparkles, Sprout, Star, Sun, Trophy, Undo2, Users, Volume2, VolumeX, Wheat, Award, Landmark, LogOut, Timer, CalendarDays, Scale, Search, Home,
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
import { GAME_SLUG, clearLocal, gloria, loadLocal, loadRemote, newSave, progressView, saveRemote, type SaveData } from "./state";
import { Portrait, TemploCover } from "./Portrait";
import { ADORNOS, COPA, LOGROS, goalDef, logroNivel, parSeconds, type Goal } from "./progress";
import type { TempleWorld } from "./world";
import {
  ESCALONES, MERITO_TURNO, NOMBRE_PROPIO, PREGUNTAS_DIA, SEGUNDOS_PREGUNTA, escalonNombre,
  type JerusalenEstado, type JerusalenPregunta, type JerusalenRespuesta,
} from "@shared/jerusalen";
import { OnlineSession, adminQuitarCargo, adminRevisar, crearPersonaje, entrarCiudad, escalonRank, fetchEstado, onlineSave, renombrarPersonaje } from "./online";
import { FIESTA, FIESTAS, fechaDe, fechaDeFiesta, proximaFiesta, type FiestaId } from "@shared/calendario";
import { ALEGRIA, ESCUCHAR, INQUIRIR, casoPorId } from "./casos";
import { Card, VerseBox, fmt, hace } from "./ui";
import { TempleAudio } from "./audio";
import type { CiudadWorld } from "./ciudad/mundo";
import { CiudadCtx, CiudadHudLayer, CiudadModal } from "./CiudadUI";
import type { CiudadEstado } from "@shared/ciudad";

const GAME_HEIGHT = "min(calc(100dvh - var(--app-nav-h, 64px) - var(--app-tabbar-h, 0px) - var(--radio-mini-h, 0px) - 76px), 900px)";
const WorldCtx = createContext<TempleWorld | null>(null);
const useWorld = () => useContext(WorldCtx);
/** La sesión del templo en línea (null en el modo local). */
const SessionCtx = createContext<OnlineSession | null>(null);

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
  // Jerusalén en línea: el estado de la cuenta, la sala y la sesión mientras se juega en línea
  const [estado, setEstado] = useState<JerusalenEstado | null>(null);
  const [lobby, setLobby] = useState(false);
  const [session, setSession] = useState<OnlineSession | null>(null);
  const sessionRef = useRef<OnlineSession | null>(null);
  sessionRef.current = session;
  const online = !!session;
  // La ciudad (etapa 2): su mundo, lo último que dijo el servidor y el aviso mientras se cambia
  // de lugar. El sonido es uno solo para el templo y la ciudad (la música no se corta).
  const cityMod = useRef<Promise<typeof import("./ciudad/mundo")> | null>(null);
  const [city, setCity] = useState<CiudadWorld | null>(null);
  const cityRef = useRef<CiudadWorld | null>(null);
  cityRef.current = city;
  const [ciudadEstado, setCiudadEstado] = useState<CiudadEstado | null>(null);
  const [cambio, setCambio] = useState<string | null>(null);
  const audioRef = useRef<TempleAudio | null>(null);
  const irACiudadRef = useRef<(llegada: "templo" | "casa", e?: JerusalenEstado) => Promise<boolean>>(async () => false);
  const irAlTemploRef = useRef<() => Promise<void>>(async () => undefined);
  const ciudadCtx = useMemo(() => ({ city, estado: ciudadEstado, setEstado: setCiudadEstado }), [city, ciudadEstado]);

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
      if (!user) {
        setEstado(null);
        return;
      }
      // El servidor revisa el cargo de la historia con la partida de la cuenta: si la de este
      // teléfono es más nueva, se guarda primero para que cuente.
      if (local && (!remote || local.savedAt > remote.savedAt + 1000)) await saveRemote(local);
      const r = await fetchEstado();
      if (!cancelled && r.ok && r.data) setEstado(r.data);
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
      sessionRef.current?.close();
      worldRef.current?.destroy();
      worldRef.current = null;
      cityRef.current?.destroy();
      cityRef.current = null;
      audioRef.current?.dispose();
      audioRef.current = null;
      gameStore.reset();
    };
  }, []);

  /** El templo en línea: desde la sala o al volver de la ciudad (aparece arriba de la escalinata). */
  const crearTemplo = useCallback(
    async (enLinea: JerusalenEstado, desdeCiudad: boolean): Promise<TempleWorld | null> => {
      if (!boxRef.current || !worldMod.current) return null;
      const mod = await worldMod.current;
      if (!boxRef.current) return null;
      gameStore.reset();
      const ses = sessionRef.current ?? new OnlineSession(enLinea);
      sessionRef.current = ses;
      ses.hooks.toCity = () => void irACiudadRef.current("templo");
      if (!audioRef.current) audioRef.current = new TempleAudio(muted, music);
      const w = new mod.TempleWorld(boxRef.current, onlineSave(ses.hooks.rank), {
        loggedIn: false, muted, music, online: ses.hooks, audio: audioRef.current, spawn: desdeCiudad ? "ciudad" : undefined,
      });
      setSession(ses);
      setLobby(false);
      return w;
    },
    [muted, music],
  );

  const start = useCallback(
    async (fresh: boolean, given?: SaveData, enLinea?: JerusalenEstado) => {
      if (!boxRef.current || !worldMod.current) return;
      setPhase("starting");
      try {
        const mod = await worldMod.current;
        gameStore.reset();
        let w: TempleWorld;
        if (enLinea) {
          // el templo en línea: ya restaurado, sin levitas y sin tocar la partida local
          const t = await crearTemplo(enLinea, false);
          if (!t) return;
          w = t;
        } else {
          if (fresh) clearLocal();
          const s = given ?? (fresh || !save ? newSave() : save);
          w = new mod.TempleWorld(boxRef.current, s, { loggedIn: !!user, muted, music });
        }
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
    [save, user, muted, music, crearTemplo],
  );

  // Nueva generación: el mundo guarda la partida nueva y el templo se levanta otra vez desde las ruinas.
  const startGeneration = useCallback(() => {
    if (!world) return;
    const next = world.startNewGeneration();
    world.destroy();
    setWorld(null);
    setPaused(false);
    setSave(next);
    void start(false, next);
  }, [world, start]);

  // Jerusalén en línea: del templo a la ciudad por la escalinata, o desde la sala a la puerta de tu casa.
  const irACiudad = useCallback(
    async (llegada: "templo" | "casa", enLinea?: JerusalenEstado): Promise<boolean> => {
      if (!boxRef.current) return false;
      setCambio(llegada === "templo" ? "Saliendo a la ciudad…" : "Llegando a Jerusalén…");
      if (!cityMod.current) cityMod.current = import("./ciudad/mundo");
      const [r, mod] = await Promise.all([entrarCiudad(), cityMod.current.catch(() => null)]);
      if (!r.ok || !r.data || !mod || !boxRef.current) {
        setCambio(null);
        gameStore.toast(r.data?.message || "No se pudo llegar a la ciudad. Revisa tu conexión.", "warn");
        worldRef.current?.permitirSalida();
        return false;
      }
      let ses = sessionRef.current;
      if (!ses && enLinea) {
        ses = new OnlineSession(enLinea);
        sessionRef.current = ses;
        setSession(ses);
      }
      if (ses) {
        ses.hooks.toCity = () => void irACiudadRef.current("templo");
        // lo que falte de los deberes del templo se manda ya
        void ses.flush(true);
      }
      worldRef.current?.destroy();
      worldRef.current = null;
      setWorld(null);
      cityRef.current?.destroy();
      gameStore.reset();
      if (!audioRef.current) audioRef.current = new TempleAudio(muted, music);
      const c = new mod.CiudadWorld(boxRef.current, r.data, { muted, music, audio: audioRef.current, llegada, alTemplo: () => void irAlTemploRef.current() });
      c.verOtros(r.data.otros);
      c.audio.ensure();
      // solo en desarrollo: acceso para revisar la ciudad desde la consola
      if (import.meta.env.DEV) (window as unknown as { __ciudad?: CiudadWorld }).__ciudad = c;
      cityRef.current = c;
      setCity(c);
      setCiudadEstado(r.data);
      setPaused(false);
      setLobby(false);
      setPhase("playing");
      setCambio(null);
      return true;
    },
    [muted, music],
  );
  irACiudadRef.current = irACiudad;

  // De la ciudad al templo por la escalinata: el mismo sacerdote y la misma sesión.
  const irAlTemplo = useCallback(async () => {
    const e = sessionRef.current?.estado;
    if (!e) return;
    setCambio("Entrando al templo…");
    const c = cityRef.current;
    const w = await crearTemplo(e, true);
    if (!w) {
      setCambio(null);
      c?.volverAPermitirTemplo();
      return;
    }
    c?.destroy();
    cityRef.current = null;
    setCity(null);
    w.audio.ensure();
    if (import.meta.env.DEV) (window as unknown as { __templo?: TempleWorld }).__templo = w;
    worldRef.current = w;
    setWorld(w);
    setPaused(false);
    setCambio(null);
  }, [crearTemplo]);
  irAlTemploRef.current = irAlTemplo;

  // Salir de Jerusalén en línea: se mandan los deberes que faltan y se vuelve a la sala.
  const exitOnline = useCallback(() => {
    sessionRef.current?.close();
    sessionRef.current = null;
    setSession(null);
    worldRef.current?.destroy();
    worldRef.current = null;
    setWorld(null);
    cityRef.current?.destroy();
    cityRef.current = null;
    setCity(null);
    setCiudadEstado(null);
    audioRef.current?.dispose();
    audioRef.current = null;
    setPaused(false);
    gameStore.reset();
    setPhase("title");
    setLobby(true);
    void fetchEstado().then((r) => {
      if (r.ok && r.data) setEstado(r.data);
    });
  }, []);

  const togglePause = useCallback(
    (p?: boolean) => {
      const next = p ?? !paused;
      setPaused(next);
      world?.setPaused(next);
      city?.setPaused(next);
      (world ?? city)?.audio.click();
    },
    [paused, world, city],
  );

  // teclado: P o Esc pausa; L abre el libro; M las mejoras; en línea, T la temporada
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (gameStore.busy) return;
      if (k === "p" || k === "escape") togglePause();
      else if (paused) return;
      else if (online) {
        if (k === "t") gameStore.push({ kind: "temporada" });
        else if (city && k === "h") gameStore.push({ kind: "casa" });
        else if (city && k === "i") gameStore.push({ kind: "irA" });
        else if (city && k === "f") gameStore.push({ kind: "frases" });
        else if (city && k === "v") gameStore.push({ kind: "vecinos" });
      } else if (k === "l") gameStore.push({ kind: "book" });
      else if (k === "m") gameStore.push({ kind: "upgrades" });
      else if (k === "c") gameStore.push({ kind: "comunidad" });
      else if (k === "j") gameStore.push({ kind: "camino" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, togglePause, online, city]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // En el iPhone no hay pantalla completa de verdad: se ocupa toda la pantalla. El gesto o el
  // botón de «atrás» del teléfono vuelve a la vista normal en lugar de salir del juego.
  useEffect(() => {
    if (!immersive) return;
    window.history.pushState({ ...(window.history.state || {}), templo: "pantalla" }, "");
    const onPop = () => setImmersive(false);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (window.history.state?.templo === "pantalla") window.history.back();
    };
  }, [immersive]);

  const toggleMute = () => {
    const n = !muted;
    setMuted(n);
    writePref("juegos-silencio", n);
    world?.setMuted(n);
    city?.setMuted(n);
  };
  const toggleMusic = () => {
    const n = !music;
    setMusic(n);
    writePref("templo-musica", n);
    world?.setMusic(n);
    city?.setMusic(n);
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
  // En pantalla completa los botones respetan la cámara, la isla y la barra del teléfono
  // (zonas seguras). En la vista normal el juego está dentro de la página y no hace falta.
  const coarse = typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)").matches;
  const safe = (
    big
      ? {
          "--tpl-st": `max(env(safe-area-inset-top, 0px), ${coarse ? "12px" : "0px"})`,
          "--tpl-sb": "env(safe-area-inset-bottom, 0px)",
          "--tpl-sl": "env(safe-area-inset-left, 0px)",
          "--tpl-sr": "env(safe-area-inset-right, 0px)",
        }
      : { "--tpl-st": "0px", "--tpl-sb": "0px", "--tpl-sl": "0px", "--tpl-sr": "0px" }
  ) as React.CSSProperties;
  return (
    <WorldCtx.Provider value={world}>
      <SessionCtx.Provider value={session}>
       <CiudadCtx.Provider value={ciudadCtx}>
        <div
          ref={wrapRef}
          className={`select-none overflow-hidden bg-[#1a1408] ${big ? "fixed inset-0 z-[60] rounded-none" : "relative w-full rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-950/30"}`}
          style={big ? safe : { ...safe, height: GAME_HEIGHT, minHeight: 460, scrollMarginTop: "calc(var(--app-nav-h, 64px) + 8px)" }}
          data-testid="templo-box"
          data-pantalla={big ? "completa" : "normal"}
        >
          <div ref={boxRef} className="absolute inset-0" />
          {phase === "playing" && world && <HudLayer paused={paused} onPause={() => togglePause(true)} big={big} onFull={() => void toggleFull()} online={online} />}
          {phase === "playing" && city && <CiudadHudLayer paused={paused} onPause={() => togglePause(true)} big={big} onFull={() => void toggleFull()} />}
          {phase === "playing" && paused && (
            <PauseMenu
              onResume={() => togglePause(false)}
              gen={world?.s.gen || 1}
              rangoMax={world ? Math.max(world.s.rank, world.s.rangoMax || 0) : 0}
              canGen={!online && !!world?.s.finale}
              onGen={startGeneration}
              muted={muted}
              music={music}
              big={big}
              onMute={toggleMute}
              onMusic={toggleMusic}
              onFull={() => void toggleFull()}
              online={online}
              onExitOnline={exitOnline}
            />
          )}
          {phase === "playing" && (world || city) && <ModalLayer />}
          {cambio && (
            <div className="absolute inset-0 z-[70] flex flex-col items-center justify-center gap-3 bg-[#0c0a08]/90 text-white" data-testid="templo-cambio">
              <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
              <p className="font-serif text-lg font-bold">{cambio}</p>
            </div>
          )}
          {phase !== "playing" &&
            (lobby && estado ? (
              <OnlineLobby
                estado={estado}
                phase={phase}
                onBack={() => setLobby(false)}
                onEnter={(e) => void start(false, undefined, e)}
                onCiudad={(e) => void irACiudad("casa", e)}
                onEstado={setEstado}
              />
            ) : (
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
                estado={estado}
                onOnline={() => setLobby(true)}
              />
            ))}
        </div>
       </CiudadCtx.Provider>
      </SessionCtx.Provider>
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
  estado: JerusalenEstado | null;
  onOnline: () => void;
}) {
  const { game, phase, save, loggedIn, confirmNew, setConfirmNew, onStart } = props;
  const has = !!save && (save.ofrendas > 0 || Object.keys(save.built).length > 0 || (save.gen || 1) > 1 || (save.stats.jornadas || 0) > 0);
  const [ahora, setAhora] = useState<number | null>(null);
  useEffect(() => {
    fetch(`/api/juegos/${GAME_SLUG}/ahora`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setAhora(Number(d.jugando) || 0))
      .catch(() => null);
  }, []);
  const built = save ? STATIONS.filter((s) => save.built[s.id]).length : 0;
  return (
    <div
      className="absolute inset-0 z-30 overflow-y-auto bg-[radial-gradient(ellipse_at_50%_0%,#5b2a6e_0%,#2b1a3a_45%,#120c08_100%)] text-white"
      style={{ paddingTop: "var(--tpl-st, 0px)", paddingBottom: "var(--tpl-sb, 0px)" }}
    >
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
                  Día {save.day} ({fechaDe(save.day).texto}) · {RANKS[save.rank].nombre} · {built}/{STATIONS.length} lugares restaurados · Gloria {gloria(save).toLocaleString("es-419")}
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
        {phase === "title" && !confirmNew && loggedIn && props.estado && <EnLineaEntrada estado={props.estado} onOnline={props.onOnline} />}
        {ahora !== null && ahora > 0 && (
          <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-100">
            🔥 {ahora} {ahora === 1 ? "persona sirviendo" : "personas sirviendo"} en el templo ahora
          </p>
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
        <span title={`Día ${hud.day} de servicio`}>{hud.fecha}</span> · {hud.phase}
        {hud.sabbath && <span className="ml-1 rounded bg-amber-400/90 px-1 text-[10px] text-amber-950">Reposo</span>}
      </span>
    </div>
  );
}

function HudLayer({ paused, onPause, big, onFull, online }: { paused: boolean; onPause: () => void; big: boolean; onFull: () => void; online: boolean }) {
  const { hud, toasts, modal, online: oh } = useGame();
  const world = useWorld();
  const [hint, setHint] = useState(true);
  const [fsHint, setFsHint] = useState(false);
  const score = online ? oh?.merito ?? 0 : hud.gozo;
  const prevScore = useRef(score);
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (score > prevScore.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 180);
      prevScore.current = score;
      return () => clearTimeout(t);
    }
    prevScore.current = score;
  }, [score]);
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 14000);
    return () => clearTimeout(t);
  }, []);
  // al entrar a pantalla completa, unos segundos se explica cómo volver
  useEffect(() => {
    if (!big) {
      setFsHint(false);
      return;
    }
    setFsHint(true);
    const t = setTimeout(() => setFsHint(false), 6000);
    return () => clearTimeout(t);
  }, [big]);
  const open = (m: Modal) => {
    world?.audio.page();
    gameStore.push(m);
  };
  const c = hud.carrying;
  const lados = { paddingLeft: "calc(0.5rem + var(--tpl-sl, 0px))", paddingRight: "calc(0.5rem + var(--tpl-sr, 0px))" };
  const sombra = "[text-shadow:0_1px_2px_rgba(0,0,0,.85)]";
  const factor = oh?.factor ?? 1;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white">
      {/* arriba (en pantalla completa, por debajo de la cámara y de la barra del teléfono) */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/55 via-black/25 to-transparent pb-4"
        style={{ ...lados, paddingTop: "calc(0.5rem + var(--tpl-st, 0px))" }}
        data-testid="templo-hud-arriba"
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {online ? (
              <>
                <div
                  className={`flex items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-1 pl-1.5 pr-3 font-black text-amber-950 shadow-lg transition-transform ${bump ? "scale-110" : ""}`}
                  title="Mérito de la temporada"
                  data-testid="templo-merito"
                >
                  <Award className="h-4 w-4" />
                  <span className="tabular-nums">{fmt(oh?.merito ?? 0)}</span>
                </div>
                <button
                  type="button"
                  className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/50 py-1 pl-1.5 pr-3 text-xs font-bold text-white shadow-lg"
                  onClick={() => open({ kind: "temporada" })}
                  title="Tu escalón en la temporada"
                  data-testid="templo-escalon"
                >
                  <Crown className="h-4 w-4 text-amber-400" />
                  {escalonNombre(oh?.escalon)}
                </button>
              </>
            ) : (
              <>
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
                  {hud.gen > 1 && <span className="rounded-full bg-emerald-400/90 px-1.5 text-[10px] font-black text-emerald-950">{hud.gen}.ª gen.</span>}
                  {hud.rankReady && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                </button>
              </>
            )}
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
            {online ? (
              <>
                <IconBtn label="Salir a la ciudad" onClick={() => world?.salirACiudad()} testid="button-templo-ciudad">
                  <Home className="h-5 w-5" />
                </IconBtn>
                <IconBtn label="Temporada (T)" onClick={() => open({ kind: "temporada" })} testid="button-templo-temporada" className="hidden sm:flex">
                  <Trophy className="h-5 w-5" />
                </IconBtn>
              </>
            ) : (
              <>
                <IconBtn label="Comunidad (C)" onClick={() => open({ kind: "comunidad" })} testid="button-templo-comunidad">
                  <Users className="h-5 w-5" />
                </IconBtn>
                <IconBtn label="Mejoras (M)" onClick={() => open({ kind: "upgrades" })} testid="button-templo-mejoras">
                  <Sparkles className="h-5 w-5" />
                </IconBtn>
                <IconBtn label="Libro del aprendiz (L)" onClick={() => open({ kind: "book" })} testid="button-templo-libro">
                  <BookOpen className="h-5 w-5" />
                </IconBtn>
              </>
            )}
            <IconBtn label={big ? "Salir de pantalla completa" : "Pantalla completa"} onClick={onFull} testid="button-templo-pantalla" active={big}>
              {big ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </IconBtn>
            <IconBtn label="Pausa (P)" onClick={onPause} testid="button-templo-pausa">
              <Pause className="h-5 w-5" />
            </IconBtn>
          </div>
          {fsHint && (
            <div className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold text-amber-950 shadow-lg" data-testid="templo-pantalla-ayuda">
              Para volver a la vista normal, toca <Minimize2 className="-mt-0.5 inline h-3 w-3" />
            </div>
          )}
          <DayClock hud={hud} />
          {online ? (
            <div
              className="rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm"
              title="La primera hora de deberes del día cuenta completa; las dos siguientes, la mitad"
              data-testid="templo-hoy"
            >
              Hoy {Math.floor((oh?.hoySeg || 0) / 60)} min · <span className={factor >= 1 ? "text-emerald-300" : factor > 0 ? "text-amber-300" : "text-red-300"}>{factor >= 1 ? "mérito completo" : factor > 0 ? "mérito a la mitad" : "turno terminado"}</span>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm" title="Gloria del templo (tu puntaje)">
                <Trophy className="mr-1 inline h-3 w-3 text-amber-300" />
                {fmt(hud.gloria)}
                {hud.mult > 1.05 && <span className="ml-1 text-amber-300">· gozo ×{hud.mult.toLocaleString("es-419")}</span>}
              </div>
              {hud.tristeza > 0 && (
                <div
                  className="rounded-full bg-slate-700/85 px-2.5 py-0.5 text-[11px] font-semibold text-slate-100 backdrop-blur-sm"
                  title="Un juicio injusto entristeció al pueblo: el gozo baja hasta que vuelva la alegría (pasa con las mañanas)"
                  data-testid="templo-tristeza"
                >
                  😔 Pueblo triste · gozo −{15 * hud.tristeza} %
                </div>
              )}
              {hud.liga && (hud.liga.lider || hud.liga.puesto) && (
                <button
                  type="button"
                  className="pointer-events-auto rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm hover:bg-black/60"
                  onClick={() => open({ kind: "comunidad" })}
                  title="Tabla de la semana"
                  data-testid="templo-liga"
                >
                  <Medal className="mr-1 inline h-3 w-3 text-amber-300" />
                  {hud.liga.puesto ? `Vas ${hud.liga.puesto}.º esta semana` : "Esta semana"}
                  {hud.liga.lider && hud.liga.puesto !== 1 && <span className="text-white/75"> · 1.º {hud.liga.lider.split(" ")[0]}</span>}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* abajo: avisos (lo que hace el aprendiz, la hora del sacrificio, la jornada), lo que llevas y ayuda.
          Van abajo y transparentes para no tapar el templo. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1" style={{ ...lados, paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))" }} data-testid="templo-hud-abajo">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-[92%] rounded-xl px-3 py-1.5 text-center text-[13px] font-semibold shadow-lg sm:max-w-lg ${t.tone === "gold" ? "bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950" : t.tone === "warn" ? "bg-red-50 text-red-900" : "bg-white/95 text-stone-800"}`}
          >
            {t.text}
          </div>
        ))}
        {!modal && !paused && (
          <>
            {hud.event && (
              <div className={`max-w-[94%] rounded-full bg-amber-500/25 px-3 py-0.5 text-center text-[11px] font-bold leading-tight text-amber-100 backdrop-blur-[2px] sm:max-w-lg ${sombra}`} data-testid="templo-evento">
                {hud.event}
              </div>
            )}
            {hud.objective && (
              <div className={`max-w-[94%] rounded-full bg-black/30 px-3 py-1 text-center text-[12px] font-semibold leading-tight text-white backdrop-blur-[2px] sm:max-w-md ${sombra}`} data-testid="templo-objetivo">
                <ChevronRight className="-mt-0.5 mr-0.5 inline h-3.5 w-3.5 text-amber-300" />
                {hud.objective}
              </div>
            )}
            {hud.jornada && <JornadaStrip hud={hud} onOpen={() => open({ kind: "camino" })} />}
          </>
        )}
        {c && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/55 py-1 pl-2 pr-1 text-sm font-bold backdrop-blur" data-testid="templo-carga">
            <span className="text-lg">{ITEMS[c.type].icono}</span>
            <span className="tabular-nums">
              {c.count}/{c.cap}
            </span>
            {hud.canDrop ? (
              <button type="button" className="flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-amber-950 shadow hover:bg-amber-300" onClick={() => world?.dropCarry()} data-testid="button-templo-soltar">
                <Undo2 className="h-3.5 w-3.5" /> Devolver
              </button>
            ) : (
              <span className="pr-2 text-xs text-white/70">{c.count >= c.cap ? "¡lleno!" : ""}</span>
            )}
          </div>
        )}
        {hint && !modal && (
          <div className="rounded-full bg-black/35 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
            Toca y arrastra para caminar · computadora: flechas o W A S D
          </div>
        )}
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children, testid, active, className = "flex" }: { label: string; onClick: () => void; children: React.ReactNode; testid?: string; active?: boolean; className?: string }) {
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
      className={`${className} h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur active:scale-95 ${active ? "bg-amber-400 text-amber-950 ring-2 ring-white/70 hover:bg-amber-300" : "bg-black/50 text-white hover:bg-black/70"}`}
      data-testid={testid}
    >
      {children}
    </button>
  );
}

function PauseMenu(props: {
  onResume: () => void;
  gen: number;
  rangoMax: number;
  canGen: boolean;
  onGen: () => void;
  muted: boolean;
  music: boolean;
  big: boolean;
  onMute: () => void;
  onMusic: () => void;
  onFull: () => void;
  online: boolean;
  onExitOnline: () => void;
}) {
  const [askGen, setAskGen] = useState(false);
  const margen = {
    paddingTop: "calc(0.75rem + var(--tpl-st, 0px))",
    paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))",
    paddingLeft: "calc(0.75rem + var(--tpl-sl, 0px))",
    paddingRight: "calc(0.75rem + var(--tpl-sr, 0px))",
  };
  if (askGen) {
    const next = props.gen + 1;
    const extra = Math.round(100 * 0.25 * Math.min(4, next - 1));
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={margen}>
        <div className="max-h-full w-full max-w-sm space-y-3 overflow-y-auto rounded-2xl border border-amber-300/30 bg-[#20160a]/95 p-5 text-white shadow-2xl" data-testid="templo-generacion">
          <h3 className="flex items-center justify-center gap-2 font-serif text-2xl font-black">
            <Sprout className="h-6 w-6 text-emerald-300" /> {next}.ª generación
          </h3>
          <p className="text-center text-sm italic text-amber-100/90">«Generación a generación celebrará tus obras» (Salmo 145:4)</p>
          <p className="text-sm text-white/85">El templo vuelve a las ruinas y empiezas otra vez la historia como aprendiz de Azarías. Es opcional: también puedes seguir sirviendo como estás.</p>
          <ul className="space-y-1.5 rounded-xl bg-white/5 p-3 text-[13px] leading-snug">
            <li>👑 Tu cargo de <b>{RANKS[props.rangoMax]?.nombre}</b> queda en tu historial y en la tabla.</li>
            <li>🏆 Te quedas con tus copas, logros, jornadas con sus estrellas y adornos.</li>
            <li>📖 También tu libro de versículos, la racha del desafío del día y tu gloria (nunca baja).</li>
            <li>✨ Ganas <b>+{extra} % de gozo</b> para siempre y un regalo de gozo para empezar.</li>
            <li className="text-white/70">🔄 Vuelven a empezar: los lugares restaurados, los levitas, las mejoras, el cargo de esta generación y las preguntas.</li>
          </ul>
          <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={props.onGen} data-testid="button-templo-generacion-si">
            <Sprout className="mr-2 h-5 w-5" /> Empezar la {next}.ª generación
          </Button>
          <Button variant="ghost" className="w-full text-white/80 hover:text-white" onClick={() => setAskGen(false)}>
            Seguir como estoy
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={margen}>
      <div className="max-h-full w-full max-w-xs space-y-3 overflow-y-auto rounded-2xl border border-amber-300/30 bg-[#20160a]/95 p-5 text-center text-white shadow-2xl" data-testid="templo-pausa">
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
          <Button variant="secondary" className="col-span-2" onClick={() => gameStore.push({ kind: "help" })}>
            <CircleHelp className="mr-1 h-4 w-4" /> Ayuda
          </Button>
          <Button variant="secondary" className="col-span-2" onClick={props.onFull} data-testid="button-pausa-pantalla">
            {props.big ? <Minimize2 className="mr-1 h-4 w-4" /> : <Maximize2 className="mr-1 h-4 w-4" />} {props.big ? "Salir de pantalla completa" : "Pantalla completa"}
          </Button>
        </div>
        {props.canGen && (
          <Button variant="secondary" className="w-full" onClick={() => setAskGen(true)} data-testid="button-templo-generacion">
            <Sprout className="mr-1 h-4 w-4 text-emerald-600" /> Nueva generación {props.gen > 1 ? `(vas en la ${props.gen}.ª)` : "(opcional)"}
          </Button>
        )}
        {props.online ? (
          <>
            <p className="text-xs text-white/60">Tus deberes se mandan solos cada 15 segundos. Tu partida de la historia no cambia.</p>
            <Button variant="ghost" className="w-full text-white/80 hover:text-white" onClick={props.onExitOnline} data-testid="button-en-linea-salir">
              <LogOut className="mr-1 h-4 w-4" /> Salir de Jerusalén en línea
            </Button>
          </>
        ) : (
          <p className="text-xs text-white/60">Tu avance se guarda solo. Puedes cerrar cuando quieras.</p>
        )}
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
    <div
      className={`pointer-events-auto absolute inset-0 z-50 flex justify-center p-2 sm:p-4 ${bottom ? "items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent" : "items-center bg-black/55 backdrop-blur-[2px]"}`}
      style={{
        paddingTop: "calc(0.5rem + var(--tpl-st, 0px))",
        paddingBottom: "calc(0.5rem + var(--tpl-sb, 0px))",
        paddingLeft: "calc(0.5rem + var(--tpl-sl, 0px))",
        paddingRight: "calc(0.5rem + var(--tpl-sr, 0px))",
      }}
    >
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
      return <OfflineView gained={modal.gained} minutes={modal.minutes} away={modal.away} leftToday={modal.leftToday} />;
    case "rank":
      return <RankView rank={modal.rank} />;
    case "finale":
      return <FinaleView />;
    case "camino":
      return <CaminoView />;
    case "jornada":
      return <JornadaView n={modal.n} stars={modal.stars} reward={modal.reward} adorno={modal.adorno} seconds={modal.seconds} />;
    case "comunidad":
      return <ComunidadView />;
    case "temporada":
      return <TemporadaView />;
    case "dificil":
      return <DificilView q={modal.q} />;
    case "fiesta":
      return <FiestaView id={modal.id} />;
    case "juicio":
      return <JuicioView casoId={modal.casoId} />;
    case "casa":
    case "anuncios":
    case "ancianos":
    case "edificio":
    case "irA":
    case "frases":
    case "vecinos":
    case "vecino":
    case "visita":
      return <CiudadModal modal={modal} />;
  }
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
  const order = useMemo(() => {
    const o = [0, 1, 2];
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
    }
    return o;
  }, [quizId]);
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
          {order.map((k, pos) => {
            const o = q.opciones[k];
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
                data-testid={`templo-opcion-${pos}`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-900 dark:bg-amber-900 dark:text-amber-100">{"ABC"[pos]}</span>
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
  const [tab, setTab] = useState<"lecciones" | "logros" | "rangos" | "servicio" | "gloria" | "fiestas">("lecciones");
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
      <div className="flex gap-1 overflow-x-auto border-b border-amber-200/60 px-3 pt-2 text-sm dark:border-amber-900/50">
        {(
          [
            ["lecciones", "Lecciones"],
            ["rangos", "Rangos"],
            ["servicio", "Mi servicio"],
            ["gloria", "Tabla de gloria"],
            ["logros", "Logros"],
            ["fiestas", "Fiestas"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              world.audio.page();
              setTab(id);
            }}
            className={`shrink-0 whitespace-nowrap rounded-t-lg px-3 py-1.5 font-semibold ${tab === id ? "bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`}
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
        {tab === "logros" && <LogrosTab />}
        {tab === "fiestas" && <FiestasTab />}
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

function OfflineView({ gained, minutes, away, leftToday }: { gained: number; minutes: number; away?: number; leftToday?: number }) {
  const tiempo = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);
  const tope = away !== undefined && away > minutes + 1;
  return (
    <Card title="Mientras no estabas">
      <div className="space-y-3 p-4 text-center" data-testid="templo-ausencia">
        <Portrait who="conanias" size={72} />
        <p className="text-[15px]">Durante {tiempo(minutes)} los levitas siguieron sirviendo en la casa de Jehová.</p>
        <p className="text-3xl font-black text-amber-600">+{fmt(gained)} de gozo</p>
        {tope && (
          <p className="rounded-xl bg-amber-50 p-2 text-xs text-stone-600 dark:bg-amber-950/30 dark:text-stone-300">
            Estuviste fuera {tiempo(away!)}. Para que todos crezcan parejo, los levitas sirven sin ti hasta 2 horas cada vez y 3 horas por día{leftToday !== undefined ? ` (hoy les quedan ${tiempo(leftToday)})` : ""}.
          </p>
        )}
        <p className="text-[11px] text-stone-500">La primera hora rinde completa y la segunda, la mitad. Tu servicio en el templo sigue contando siempre.</p>
        <p className="text-xs text-stone-500">«para ministrar en la casa de Jehová, en los atrios, en las cámaras» (1 Crónicas 23:28)</p>
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

// ================================================================ avance sin fin
const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

function GoalLine({ g, dark = false }: { g: Goal; dark?: boolean }) {
  const def = goalDef(g.kind);
  const pct = Math.min(100, (g.progress / g.target) * 100);
  const done = g.progress >= g.target;
  const fire = g.kind === "fuegoVivo";
  return (
    <div className="flex items-center gap-2">
      <span className="w-5 text-center">{done ? "✅" : def.icono}</span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[12.5px] font-semibold ${dark ? "text-stone-800 dark:text-stone-100" : ""}`}>{def.texto(g.target)}</p>
        <div className={`mt-0.5 h-1.5 overflow-hidden rounded-full ${dark ? "bg-stone-200 dark:bg-stone-700" : "bg-white/20"}`}>
          <div className={`h-full rounded-full ${done ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className={`shrink-0 text-[11px] font-bold tabular-nums ${dark ? "text-stone-600 dark:text-stone-300" : "text-white/85"}`}>
        {fire ? `${mmss(g.progress)}/${mmss(g.target)}` : `${g.progress.toLocaleString("es-419")}/${g.target.toLocaleString("es-419")}`}
      </span>
    </div>
  );
}

/** Estrellas que se llevarían si la jornada terminara ahora. */
function liveStars(elapsed: number, par: number) {
  return elapsed <= par ? 3 : elapsed <= par * 2 ? 2 : 1;
}

/** Números cortos para la barra de la jornada: 350, 1,2 mil, 12 mil. */
function corto(n: number) {
  if (n < 1000) return String(Math.ceil(n));
  if (n < 10000) return `${(n / 1000).toFixed(1).replace(".", ",").replace(",0", "")} mil`;
  return `${Math.floor(n / 1000)} mil`;
}

/** Una meta en la barra corta: su icono y lo que falta, con una rayita que se llena. */
function GoalChip({ g }: { g: Goal }) {
  const def = goalDef(g.kind);
  const done = g.progress >= g.target;
  const left = Math.max(0, g.target - g.progress);
  const pct = Math.min(100, (g.progress / g.target) * 100);
  return (
    <span className="relative flex items-center gap-1 whitespace-nowrap pb-1">
      <span>{done ? "✅" : def.icono}</span>
      {!done && <span className="tabular-nums">{g.kind === "fuegoVivo" ? mmss(left) : corto(left)}</span>}
      <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-full bg-white/20">
        <span className={`block h-full rounded-full ${done ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
      </span>
    </span>
  );
}

function JornadaStrip({ hud, onOpen }: { hud: Hud; onOpen: () => void }) {
  const j = hud.jornada!;
  const stars = liveStars(j.elapsed, j.par);
  const next = stars === 3 ? j.par - j.elapsed : stars === 2 ? j.par * 2 - j.elapsed : 0;
  const resumen = `Jornada ${j.n}: ${j.goals.map((g) => `${goalDef(g.kind).texto(g.target)} (${Math.floor(g.progress)} de ${g.target})`).join("; ")}`;
  // Al empezar cada jornada se ve completa unos segundos; después queda en una sola línea para no tapar el templo.
  if (j.elapsed >= 8)
    return (
      <button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto flex max-w-[94%] items-center gap-2.5 rounded-full border border-amber-300/40 bg-black/35 px-3 py-1 text-[12px] font-bold shadow-lg backdrop-blur-[2px] hover:bg-black/50"
        data-testid="templo-jornada"
        aria-label={resumen}
        title={resumen}
      >
        <span className="flex items-center gap-1 text-amber-200">
          <Route className="h-3.5 w-3.5" /> {j.n}
        </span>
        <span className="flex items-center">
          {[1, 2, 3].map((k) => (
            <Star key={k} className={`h-3 w-3 ${k <= stars ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
          ))}
          {next > 0 && <span className="ml-1 text-[11px] font-semibold tabular-nums text-white/70">{mmss(next)}</span>}
        </span>
        <span className="h-3.5 w-px shrink-0 bg-white/25" />
        {j.goals.map((g) => (
          <GoalChip key={g.kind} g={g} />
        ))}
      </button>
    );
  return (
    <button
      type="button"
      onClick={onOpen}
      className="pointer-events-auto w-[94%] max-w-sm rounded-2xl border border-amber-300/40 bg-black/40 px-3 py-1.5 text-left shadow-lg backdrop-blur-[2px] hover:bg-black/55"
      data-testid="templo-jornada"
    >
      <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-black uppercase tracking-wider text-amber-200">
        <span className="flex items-center gap-1">
          <Route className="h-3.5 w-3.5" /> Jornada {j.n}
        </span>
        <span className="flex items-center gap-1 normal-case tracking-normal">
          {[1, 2, 3].map((k) => (
            <Star key={k} className={`h-3.5 w-3.5 ${k <= stars ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
          ))}
          {next > 0 && <span className="ml-1 font-semibold text-white/70">{mmss(next)}</span>}
        </span>
      </div>
      <div className="space-y-1">
        {j.goals.map((g) => (
          <GoalLine key={g.kind} g={g} />
        ))}
      </div>
    </button>
  );
}

function CaminoView() {
  const world = useWorld();
  const { hud } = useGame();
  const nowRef = useRef<HTMLDivElement>(null);
  // al abrir, la jornada de ahora queda en el centro (sin mover la página)
  useEffect(() => {
    const el = nowRef.current;
    let p = el?.parentElement || null;
    while (p && !(p.scrollHeight > p.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(p).overflowY))) p = p.parentElement;
    if (!el || !p) return;
    p.scrollTop += el.getBoundingClientRect().top - p.getBoundingClientRect().top - p.clientHeight / 2 + el.clientHeight / 2;
  }, []);
  if (!world) return null;
  const s = world.s;
  const done = s.stats.jornadas || 0;
  const starsStr = s.jornada.stars || "";
  const current = hud.jornada;
  const totalStars = s.stats.estrellas || 0;
  // el camino: las últimas hechas, la de ahora y las que vienen
  const first = Math.max(1, (current?.n || done + 1) - 6);
  const last = (current?.n || done + 1) + 6;
  const nodes: number[] = [];
  for (let n = last; n >= first; n--) nodes.push(n);
  return (
    <Card title={<span className="flex items-center gap-2"><Route className="h-5 w-5" /> Camino del servicio</span>} onClose={() => gameStore.close()} wide testid="templo-camino">
      <div className="space-y-3 p-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30"><p className="text-lg font-black">{done}</p>jornadas</div>
          <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30"><p className="text-lg font-black">{totalStars} ★</p>estrellas</div>
          <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30"><p className="text-lg font-black">{hud.copas}</p>puntos de copas</div>
        </div>
        {hud.daily && (
          <div className={`rounded-xl border p-3 ${hud.daily.done ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30" : "border-sky-300 bg-sky-50 dark:bg-sky-950/30"}`} data-testid="templo-desafio">
            <p className="mb-2 flex items-center justify-between text-sm font-black">
              <span>📅 Desafío del día {hud.daily.done && "· ¡cumplido!"}</span>
              <span className="text-xs font-bold text-orange-600">🔥 {hud.daily.streak} {hud.daily.streak === 1 ? "día" : "días"} seguidos</span>
            </p>
            <div className="space-y-1.5">
              {hud.daily.goals.map((g) => (
                <GoalLine key={g.kind} g={g} dark />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-stone-500">El mismo desafío para todos hoy. Cumplirlo varios días seguidos da más gozo.</p>
          </div>
        )}
        <div className="relative mx-auto max-w-sm py-1">
          {nodes.map((n, i) => {
            const isDone = n <= done;
            const isNow = current && n === current.n;
            const st = isDone ? Number(starsStr[n - 1] || 0) : 0;
            const gift = ADORNOS.find((a) => a.jornada === n);
            const left = i % 4 === 0 ? "ml-[10%]" : i % 4 === 1 ? "ml-[38%]" : i % 4 === 2 ? "ml-[62%]" : "ml-[34%]";
            return (
              <div key={n} ref={isNow ? nowRef : undefined} className={`${left} relative mb-2 w-fit`}>
                <div
                  className={`flex h-12 w-12 flex-col items-center justify-center rounded-full border-4 text-sm font-black shadow ${
                    isNow ? "animate-pulse border-amber-400 bg-amber-300 text-amber-950" : isDone ? "border-amber-300 bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100" : "border-stone-300 bg-stone-100 text-stone-400 dark:border-stone-600 dark:bg-stone-800"
                  }`}
                >
                  {n}
                  {isDone && <span className="-mt-0.5 text-[9px] leading-none text-amber-600">{"★".repeat(st)}</span>}
                </div>
                {gift && (
                  <span className={`absolute top-2 flex w-24 items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300 ${i % 4 === 2 ? "right-full mr-2 justify-end text-right" : "left-full ml-2"}`}>
                    <Gift className="h-3.5 w-3.5 shrink-0" /> {gift.nombre}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {current && (
          <div className="rounded-xl border border-amber-300 bg-white p-3 dark:bg-transparent">
            <p className="mb-2 text-sm font-black">Ahora: jornada {current.n}</p>
            <div className="space-y-1.5">
              {current.goals.map((g) => (
                <GoalLine key={g.kind} g={g} dark />
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-[11px] text-stone-500">
              <Clock className="h-3 w-3" /> Tres estrellas si la terminas en {mmss(parSeconds(current.goals))}; dos, en {mmss(parSeconds(current.goals) * 2)}.
            </p>
          </div>
        )}
        <div>
          <p className="mb-1 text-sm font-black">Adornos del templo</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {ADORNOS.map((a) => (
              <li key={a.id} className={`rounded-lg border px-2.5 py-1.5 text-xs ${done >= a.jornada ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30" : "border-dashed border-stone-300 text-stone-500 dark:border-stone-700"}`}>
                <b>{done >= a.jornada ? "✔ " : `Jornada ${a.jornada}: `}{a.nombre}</b>
                {done >= a.jornada && <span className="block text-stone-600 dark:text-stone-300">{a.texto}</span>}
              </li>
            ))}
            <li className="rounded-lg border border-dashed border-stone-300 px-2.5 py-1.5 text-xs text-stone-500 dark:border-stone-700">Desde la jornada 16 llegan peregrinos de tierras lejanas (1 Reyes 8:41-43).</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

function JornadaView({ n, stars, reward, adorno, seconds }: { n: number; stars: number; reward: number; adorno: string | null; seconds: number }) {
  const world = useWorld();
  const a = adorno ? ADORNOS.find((x) => x.id === adorno) : null;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= stars) return;
    const t = setTimeout(() => setShown((k) => k + 1), 330);
    return () => clearTimeout(t);
  }, [shown, stars]);
  return (
    <Card title={<span className="flex items-center gap-2"><Route className="h-5 w-5" /> ¡Jornada {n} cumplida!</span>} testid="templo-jornada-fin">
      <div className="space-y-3 p-4 text-center">
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((k) => (
            <Star
              key={k}
              className={`h-12 w-12 transition-all duration-300 ${k <= shown ? "scale-110 fill-amber-400 text-amber-500 drop-shadow-[0_0_10px_rgba(251,191,36,.8)]" : "scale-90 text-stone-300"}`}
            />
          ))}
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-300">La hiciste en {mmss(seconds)}.</p>
        <p className="text-3xl font-black text-amber-600">+{reward.toLocaleString("es-419")} de gozo</p>
        {a && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-left dark:bg-emerald-950/30">
            <p className="flex items-center gap-1 font-black"><Gift className="h-4 w-4" /> Nuevo adorno: {a.nombre}</p>
            <p className="mt-1 text-sm">{a.texto}</p>
          </div>
        )}
        <Button
          className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
          onClick={() => {
            world?.audio.click();
            gameStore.close();
          }}
          data-testid="button-templo-jornada-siguiente"
        >
          Siguiente jornada <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function LogrosTab() {
  const world = useWorld();
  if (!world) return null;
  const s = world.s;
  const story = (id: string) => (id === "puertas" ? !!s.built.puertas : !!s.story[id]);
  const cup = ["#cd7f32", "#c0c0c8", "#f2b632"];
  let got = 0;
  for (const d of LOGROS) if ((s.logros[d.id] || 0) > 0) got++;
  return (
    <div>
      <p className="mb-2 text-xs text-stone-500">
        {got} de {LOGROS.length} logros · copas de bronce, plata y oro
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {LOGROS.map((d) => {
          const lv = s.logros[d.id] || logroNivel(d, s.stats, story);
          const v = d.stat ? s.stats[d.stat] || 0 : 0;
          const next = d.niveles && lv < 3 ? d.niveles[lv] : null;
          return (
            <li key={d.id} className={`flex items-center gap-3 rounded-xl border p-2.5 ${lv ? "border-amber-300 bg-amber-50 dark:bg-amber-950/30" : "border-stone-200 dark:border-stone-700"}`}>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl" style={{ background: lv ? cup[(d.historia ? 3 : lv) - 1] + "33" : "rgba(120,120,120,.12)" }}>
                {d.icono}
                {lv > 0 && <Trophy className="absolute -bottom-1 -right-1 h-5 w-5 drop-shadow" style={{ color: cup[(d.historia ? 3 : lv) - 1] }} fill="currentColor" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.nombre}</p>
                <p className="text-[11px] text-stone-600 dark:text-stone-400">{d.texto}</p>
                {d.stat && d.niveles && (
                  <p className="mt-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    {lv ? `Copa de ${COPA[lv - 1]}` : "Sin copa"}
                    {next !== null && ` · ${Math.min(v, next).toLocaleString("es-419")}/${next.toLocaleString("es-419")} ${d.unidad || ""} para ${COPA[lv]}`}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ================================================================ comunidad
type BoardRow = { rank: number; name: string; avatarUrl: string | null; score: number; isMe: boolean; meta?: { rango?: number; jornada?: number; copas?: number; gen?: number } | null };
type BoardData = { top: BoardRow[]; mine: { best: number; rank: number } | null; week?: string };
type ActivityItem = { id: number; game: string; name: string; avatarUrl: string | null; text: string; createdAt: string; cheers: number; cheeredByMe: boolean; isMine: boolean };

function ComunidadView() {
  const { user } = useAuth();
  const world = useWorld();
  const [tab, setTab] = useState<"semana" | "siempre" | "actividad">("semana");
  const [board, setBoard] = useState<BoardData | null>(null);
  const [items, setItems] = useState<ActivityItem[] | null>(null);
  const [ahora, setAhora] = useState<{ jugando: number; jugadores: number } | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`/api/juegos/${GAME_SLUG}/ahora`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setAhora)
      .catch(() => null);
  }, []);
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const url = tab === "actividad" ? `/api/juegos/actividad?juego=${GAME_SLUG}` : `/api/juegos/${GAME_SLUG}/ranking?periodo=${tab}`;
    fetch(url, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (tab === "actividad") setItems(d?.items || []);
        else setBoard(d);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [tab, user]);
  const cheer = async (it: ActivityItem) => {
    if (it.cheeredByMe || it.isMine) return;
    world?.audio.coin(3);
    setItems((list) => (list || []).map((x) => (x.id === it.id ? { ...x, cheeredByMe: true, cheers: x.cheers + 1 } : x)));
    try {
      await fetch(`/api/juegos/actividad/${it.id}/aplauso`, { method: "POST", credentials: "include" });
    } catch {
      /* sin conexión */
    }
  };
  return (
    <Card title={<span className="flex items-center gap-2"><Users className="h-5 w-5" /> Comunidad del templo</span>} onClose={() => gameStore.close()} wide testid="templo-comunidad">
      <div className="p-3">
        <p className="mb-2 text-center text-xs text-stone-600 dark:text-stone-300">
          {ahora ? (
            ahora.jugando > 0 ? (
              <>
                <b className="text-orange-600">🔥 {ahora.jugando}</b> {ahora.jugando === 1 ? "persona sirviendo" : "personas sirviendo"} ahora · {ahora.jugadores} en la tabla
              </>
            ) : (
              <>
                <b className="text-orange-600">🏆 {ahora.jugadores}</b> {ahora.jugadores === 1 ? "persona" : "personas"} en la tabla de gloria
              </>
            )
          ) : (
            "…"
          )}
        </p>
        {!user ? (
          <p className="py-6 text-center text-sm">
            <Link href={loginUrl()} className="font-semibold text-amber-700 underline">
              Inicia sesión
            </Link>{" "}
            para ver la tabla de la semana, quién va primero y lo que logra la comunidad.
          </p>
        ) : (
          <>
            <div className="mb-2 flex gap-1 text-sm">
              {(
                [
                  ["semana", "Esta semana"],
                  ["siempre", "De siempre"],
                  ["actividad", "Actividad"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex-1 rounded-lg px-2 py-1.5 font-semibold ${tab === id ? "bg-amber-400 text-amber-950" : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {loading && (
              <div className="flex justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            )}
            {!loading && tab !== "actividad" && board && (
              <div>
                {tab === "semana" && <p className="mb-1 text-[11px] text-stone-500">Cuenta la gloria ganada desde el lunes. Se reinicia cada semana.</p>}
                {board.top.length ? (
                  <ol className="divide-y rounded-lg border dark:divide-stone-700 dark:border-stone-700">
                    {board.top.map((r) => (
                      <li key={r.rank} className={`flex items-center gap-2 px-3 py-2 text-sm ${r.isMe ? "bg-amber-50 font-semibold dark:bg-amber-950/30" : ""}`}>
                        <span className={`w-6 text-center font-black ${r.rank === 1 ? "text-yellow-500" : r.rank === 2 ? "text-slate-400" : r.rank === 3 ? "text-amber-700" : "text-stone-400"}`}>{r.rank}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{r.isMe ? `${r.name} (tú)` : r.name}</span>
                          {r.meta && (
                            <span className="block truncate text-[11px] font-normal text-stone-500">
                              {RANKS[r.meta.rango ?? 0]?.nombre}
                              {r.meta.jornada ? ` · jorn. ${r.meta.jornada}` : ""}
                              {r.meta.gen && r.meta.gen > 1 ? ` · ${r.meta.gen}.ª gen.` : ""}
                              {r.meta.copas ? ` · 🏆 ${r.meta.copas}` : ""}
                            </span>
                          )}
                        </span>
                        <span className="tabular-nums">{r.score.toLocaleString("es-419")}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="py-4 text-center text-sm text-stone-500">{tab === "semana" ? "Esta semana nadie ha sumado gloria todavía. ¡Sé el primero!" : "Todavía nadie está en la tabla."}</p>
                )}
                {board.mine && !board.top.some((r) => r.isMe) && (
                  <p className="mt-2 text-center text-xs text-stone-500">
                    Tú: <b>{board.mine.best.toLocaleString("es-419")}</b> · puesto {board.mine.rank}
                  </p>
                )}
              </div>
            )}
            {!loading && tab === "actividad" && items && (
              <ul className="space-y-1.5">
                {items.length ? (
                  items.map((it) => (
                    <li key={it.id} className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm dark:border-stone-700">
                      <span className="min-w-0 flex-1">
                        <b>{it.name}</b> {it.text}
                        <span className="block text-[11px] text-stone-500">{hace(it.createdAt)}</span>
                      </span>
                      <button
                        type="button"
                        disabled={it.cheeredByMe || it.isMine}
                        onClick={() => void cheer(it)}
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${it.cheeredByMe ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" : it.isMine ? "bg-stone-100 text-stone-400 dark:bg-stone-800" : "bg-amber-400 text-amber-950 hover:bg-amber-300"}`}
                        title={it.isMine ? "Tu logro" : "Aplaudir"}
                        data-testid={`templo-aplauso-${it.id}`}
                      >
                        🙌 {it.cheers}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-center text-sm text-stone-500">Todavía no hay logros de la comunidad. Los rangos, las copas de oro y cada diez jornadas aparecen aquí.</li>
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

// ================================================================ Jerusalén en línea
/** En la portada: la entrada al templo en línea, o por qué todavía no se abre. */
function EnLineaEntrada({ estado, onOnline }: { estado: JerusalenEstado; onOnline: () => void }) {
  const r = estado.requisito;
  if (estado.cuentaAprobada && r.puedeEntrar)
    return (
      <button
        type="button"
        onClick={onOnline}
        className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-sky-200/40 bg-sky-400/15 px-4 py-2.5 text-left shadow-lg backdrop-blur hover:bg-sky-400/25"
        data-testid="button-templo-en-linea"
      >
        <Landmark className="h-6 w-6 shrink-0 text-sky-200" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold">Jerusalén en línea</span>
          <span className="block text-[11px] text-white/75">
            El templo y la ciudad · temporada {estado.temporada.n}
            {estado.temporada.dePrueba ? " (de prueba)" : ""}
            {estado.enLinea > 0 ? ` · ${estado.enLinea} sirviendo ahora` : ""}
          </span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0" />
      </button>
    );
  const texto = !estado.cuentaAprobada
    ? "Jerusalén en línea se abre cuando tu cuenta esté aprobada."
    : r.rango < 1
      ? "Jerusalén en línea se abre cuando llegues a sacerdote en la historia."
      : `Jerusalén en línea: ${r.motivo || "no se pudo comprobar tu partida."}`;
  return (
    <p className="flex max-w-xs items-start gap-1.5 text-left text-[11px] text-white/65" data-testid="templo-en-linea-cerrado">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {texto}
    </p>
  );
}

function NameChip({ label, title, active, onClick }: { label: string; title?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-sky-300 text-sky-950" : "bg-white/10 text-white hover:bg-white/20"}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

/** La sala del modo en línea: tu sacerdote, entrar al templo y la temporada. */
function OnlineLobby({
  estado,
  phase,
  onBack,
  onEnter,
  onCiudad,
  onEstado,
}: {
  estado: JerusalenEstado;
  phase: Phase;
  onBack: () => void;
  onEnter: (e: JerusalenEstado) => void;
  onCiudad: (e: JerusalenEstado) => void;
  onEstado: (e: JerusalenEstado) => void;
}) {
  const p = estado.personaje;
  const t = estado.temporada;
  const [nombre, setNombre] = useState(NOMBRE_PROPIO);
  const [cambiar, setCambiar] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const starting = phase === "starting";
  const guardar = async () => {
    setBusy(true);
    setError(null);
    const r = p ? await renombrarPersonaje(nombre) : await crearPersonaje(nombre);
    setBusy(false);
    if (r.ok && r.data) {
      onEstado(r.data);
      setCambiar(false);
    } else setError(r.data?.message || "No se pudo guardar. Intenta de nuevo.");
  };
  const ref = estado.nombres.find((x) => x.nombre === nombre)?.ref;
  return (
    <div
      className="absolute inset-0 z-30 overflow-y-auto bg-[radial-gradient(ellipse_at_50%_0%,#21436b_0%,#18233a_45%,#0c0a08_100%)] text-white"
      style={{ paddingTop: "var(--tpl-st, 0px)", paddingBottom: "var(--tpl-sb, 0px)", paddingLeft: "var(--tpl-sl, 0px)", paddingRight: "var(--tpl-sr, 0px)" }}
      data-testid="templo-en-linea"
    >
      <div className="mx-auto flex min-h-full max-w-lg flex-col gap-3 px-4 py-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <button type="button" onClick={onBack} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 font-semibold hover:bg-white/20" data-testid="button-en-linea-volver">
            <ArrowLeft className="h-4 w-4" /> Portada
          </button>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-right font-semibold">
            Temporada {t.n}
            {t.dePrueba ? " · de prueba" : ""} · {t.diasRestantes === 1 ? "último día" : `quedan ${t.diasRestantes} días`}
          </span>
        </div>
        {estado.jerusalen && (
          <div className="rounded-xl border border-amber-200/30 bg-amber-400/10 px-3 py-2 text-center text-xs text-amber-50" data-testid="templo-jerusalen-hoy">
            <CalendarDays className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
            Hoy en Jerusalén: <b>{estado.jerusalen.fecha}</b>
            {estado.jerusalen.fiesta ? (
              <>
                {" · "}
                {estado.jerusalen.fiesta.icono} <b>{estado.jerusalen.fiesta.nombre}</b>
                {estado.jerusalen.fiesta.de > 1 ? ` (día ${estado.jerusalen.fiesta.dia} de ${estado.jerusalen.fiesta.de})` : ""}
                {estado.jerusalen.fiesta.merito > 1.01 ? ` · el servicio vale ×${estado.jerusalen.fiesta.merito.toLocaleString("es-419")}` : ""}
              </>
            ) : estado.jerusalen.proxima ? (
              <> · {estado.jerusalen.proxima.icono} {estado.jerusalen.proxima.nombre} en {estado.jerusalen.proxima.enMinutos} min</>
            ) : null}
          </div>
        )}
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200">Jerusalén en línea</p>
          <h2 className="mt-1 font-serif text-3xl font-black">El templo y la ciudad</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
            Sirve en el templo junto con la comunidad y vive en Jerusalén: tienes una casa en un barrio que crece con tu servicio. En el templo no hay levitas que trabajen por ti, las preguntas son más difíciles y los cargos del sacerdocio se ganan por mérito en cada temporada.
          </p>
        </header>
        {!p || cambiar ? (
          <section className="space-y-2.5 rounded-2xl border border-sky-200/30 bg-black/30 p-4" data-testid="templo-personaje-nuevo">
            <h3 className="font-bold">{p ? "Cambia el nombre de tu sacerdote" : "Tu sacerdote en línea"}</h3>
            <p className="text-xs text-white/70">Elige el nombre de un sacerdote fiel de la Biblia o usa el de tu cuenta. Así te verá la comunidad.</p>
            <div className="flex flex-wrap gap-1.5">
              <NameChip label="Mi nombre" active={nombre === NOMBRE_PROPIO} onClick={() => setNombre(NOMBRE_PROPIO)} />
              {estado.nombres.map((n) => (
                <NameChip key={n.nombre} label={n.nombre} title={n.ref} active={nombre === n.nombre} onClick={() => setNombre(n.nombre)} />
              ))}
            </div>
            {nombre !== NOMBRE_PROPIO && ref && (
              <p className="text-[11px] text-sky-100/85">
                {nombre}: {ref}
              </p>
            )}
            {error && <p className="rounded-lg bg-red-500/20 px-2 py-1 text-xs text-red-100">{error}</p>}
            <div className="flex gap-2">
              {p && (
                <Button variant="secondary" onClick={() => setCambiar(false)}>
                  Cancelar
                </Button>
              )}
              <Button className="flex-1 rounded-full bg-sky-300 font-bold text-sky-950 hover:bg-sky-200" disabled={busy} onClick={() => void guardar()} data-testid="button-personaje-guardar">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-1 h-4 w-4" />} {p ? "Guardar" : "Consagrarme como sacerdote"}
              </Button>
            </div>
          </section>
        ) : (
          <section className="space-y-3 rounded-2xl border border-sky-200/30 bg-black/30 p-4" data-testid="templo-mi-sacerdote">
            <div className="flex items-center gap-3">
              <Portrait who={`rank${escalonRank(estado.mio?.escalon)}` as "rank0"} size={56} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-black">{p.nombre}</p>
                <p className="text-xs text-sky-100">
                  {escalonNombre(estado.mio?.escalon)}
                  {estado.mio?.cargo && t.dePrueba ? " (de prueba)" : ""} · {fmt(estado.mio?.merito || 0)} de mérito
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 text-[11px] text-white/70 underline underline-offset-2 hover:text-white"
                onClick={() => {
                  setNombre(p.propio ? NOMBRE_PROPIO : p.nombre);
                  setCambiar(true);
                }}
              >
                Cambiar nombre
              </button>
            </div>
            <Button size="lg" className="w-full rounded-full bg-amber-500 text-lg font-bold text-amber-950 hover:bg-amber-400" disabled={starting} onClick={() => onEnter(estado)} data-testid="button-en-linea-entrar">
              {starting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5 fill-current" />} Entrar al templo
            </Button>
            <Button size="lg" variant="secondary" className="w-full rounded-full font-bold" disabled={starting} onClick={() => onCiudad(estado)} data-testid="button-en-linea-ciudad">
              <Home className="mr-2 h-5 w-5" /> Ir a mi casa en la ciudad
            </Button>
            {estado.enLinea > 0 && <p className="text-center text-xs text-amber-100">🔥 {estado.enLinea} sirviendo en el templo en línea ahora</p>}
          </section>
        )}
        <section className="overflow-hidden rounded-2xl bg-[#fffaf0] text-stone-800 shadow-2xl dark:bg-[#1f1a12] dark:text-stone-100">
          <div className="flex items-center gap-2 border-b border-amber-200/60 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2.5 font-serif text-lg font-bold text-amber-900 dark:border-amber-900/50 dark:from-amber-950/60 dark:to-transparent dark:text-amber-200">
            <Trophy className="h-5 w-5" /> Temporada sacerdotal {t.n}
          </div>
          <div className="p-3">
            <TemporadaPanel estado={estado} onEstado={onEstado} />
          </div>
        </section>
      </div>
    </div>
  );
}

/** La temporada: tu mérito, cómo va el día, la escalera del sacerdocio con quién tiene cada cargo y la tabla. */
function TemporadaPanel({ estado, onEstado }: { estado: JerusalenEstado; onEstado?: (e: JerusalenEstado) => void }) {
  const mio = estado.mio;
  const prueba = estado.temporada.dePrueba ? " (de prueba)" : "";
  const [busy, setBusy] = useState(false);
  const quitar = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Quitar el cargo a ${nombre}? Pasará al siguiente de la lista.`)) return;
    setBusy(true);
    const r = await adminQuitarCargo(id);
    setBusy(false);
    if (r.ok && r.data) onEstado?.(r.data);
  };
  const revisar = async () => {
    setBusy(true);
    const r = await adminRevisar();
    setBusy(false);
    if (r.ok && r.data) onEstado?.(r.data);
  };
  const min = Math.floor((mio?.hoy.segundos || 0) / 60);
  const f = mio?.hoy.factor ?? 1;
  return (
    <div className="space-y-3 text-sm" data-testid="templo-temporada-panel">
      {mio ? (
        <>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30">
              <p className="text-lg font-black" data-testid="temporada-merito">{fmt(mio.merito)}</p>mérito
            </div>
            <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30">
              <p className="text-lg font-black">{mio.puesto ? `${mio.puesto}.º` : "—"}</p>puesto
            </div>
            <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30">
              <p className="text-sm font-black leading-tight">{escalonNombre(mio.escalon)}</p>
              {mio.cargo ? `cargo${prueba}` : "escalón"}
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 p-2.5 text-xs dark:border-stone-700" data-testid="temporada-hoy">
            <p>
              <b>Hoy:</b> {min} min de servicio ·{" "}
              <span className={f >= 1 ? "font-semibold text-emerald-700 dark:text-emerald-300" : f > 0 ? "font-semibold text-amber-700 dark:text-amber-300" : "font-semibold text-red-700 dark:text-red-300"}>
                {f >= 1 ? "el mérito cuenta completo" : f > 0 ? "el mérito cuenta la mitad" : "tu turno de hoy terminó"}
              </span>
            </p>
            <p className="mt-0.5 text-stone-500">
              Preguntas difíciles: {mio.hoy.preguntas} de {mio.hoy.preguntasMax} · Constancia: {mio.hoy.constancia ? "cumplida ✓" : "10 minutos de servicio"} · {mio.aciertos} {mio.aciertos === 1 ? "acierto" : "aciertos"} en la temporada
            </p>
          </div>
          {mio.diasSinServir !== null && (
            <p className="rounded-xl bg-red-50 p-2.5 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">
              Llevas {mio.diasSinServir} días sin servir. Si llegas a 7, tu cargo pasa al siguiente de la lista.
            </p>
          )}
          {mio.perdio && <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30">{mio.perdio}</p>}
        </>
      ) : (
        <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30">Consagra a tu sacerdote para empezar a sumar mérito en esta temporada.</p>
      )}

      <div>
        <p className="mb-1 font-black">La escalera del sacerdocio</p>
        <ol className="space-y-1.5">
          {[...ESCALONES].reverse().map((e) => {
            const fila = estado.escalera.find((x) => x.id === e.id);
            const yo = mio?.escalon === e.id;
            return (
              <li key={e.id} className={`rounded-xl border p-2.5 ${yo ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30" : "border-stone-200 dark:border-stone-700"}`} data-testid={`escalon-${e.id}`}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-bold">
                    {e.nombre}
                    {e.cupo ? prueba : ""} {yo && <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">(tú)</span>}
                  </p>
                  <span className="shrink-0 text-[11px] text-stone-500">{e.cupo ? `${fila?.titulares.length || 0} de ${e.cupo}` : "sin cupo"}</span>
                </div>
                {fila ? (
                  fila.titulares.length ? (
                    <ul className="mt-1 flex flex-wrap gap-1">
                      {fila.titulares.map((h) => (
                        <li key={h.personajeId} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${h.isMe ? "bg-amber-200 font-bold text-amber-900" : "bg-stone-100 dark:bg-stone-800"}`}>
                          {h.nombre}
                          {h.persona && h.persona !== h.nombre && <span className="text-stone-500"> · {h.persona}</span>}
                          {estado.esAdmin && (
                            <button type="button" disabled={busy} onClick={() => void quitar(h.personajeId, h.nombre)} className="ml-0.5 font-bold text-red-600" title="Quitar el cargo (administración)">
                              ✕
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-0.5 text-xs text-stone-500">Vacante: se reparte al cerrar la temporada.</p>
                  )
                ) : (
                  <p className="mt-0.5 text-xs text-stone-500">{e.como}</p>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div>
        <p className="mb-1 font-black">Mérito de la temporada</p>
        {estado.tabla.length ? (
          <ol className="divide-y rounded-lg border dark:divide-stone-700 dark:border-stone-700" data-testid="temporada-tabla">
            {estado.tabla.map((r) => (
              <li key={r.personajeId} className={`flex items-center gap-2 px-3 py-1.5 text-sm ${r.isMe ? "bg-amber-50 font-semibold dark:bg-amber-950/30" : ""}`}>
                <span className={`w-6 text-center font-black ${r.puesto === 1 ? "text-yellow-500" : r.puesto === 2 ? "text-slate-400" : r.puesto === 3 ? "text-amber-700" : "text-stone-400"}`}>{r.puesto}</span>
                <span className="min-w-0 flex-1 truncate">
                  {r.isMe ? `${r.nombre} (tú)` : r.nombre}
                  {r.persona && r.persona !== r.nombre && <span className="text-xs font-normal text-stone-500"> · {r.persona}</span>}
                </span>
                <span className="tabular-nums">{fmt(r.merito)}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="py-2 text-center text-xs text-stone-500">Nadie ha sumado mérito todavía en esta temporada. ¡Sé el primero!</p>
        )}
      </div>

      <details className="rounded-xl bg-stone-50 p-3 text-xs dark:bg-stone-900/40">
        <summary className="cursor-pointer font-bold">Cómo se gana el mérito y los cargos</summary>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Deberes del templo: presentar las ofrendas, avivar el fuego, llenar las lámparas, poner los panes y el incienso, y guardar los diezmos.</li>
          <li>Constancia: 10 minutos de servicio en el día suman 60.</li>
          <li>Preguntas difíciles de Azarías: 30 por acierto, 20 segundos para responder, {PREGUNTAS_DIA} por día y sin repetirse en la temporada.</li>
          <li>La primera hora de cada día cuenta completa; las dos siguientes, la mitad; después tu turno del día termina. Así quien tiene poco tiempo también puede llegar arriba.</li>
          <li>Con {MERITO_TURNO} de mérito eres sacerdote de turno. Al cerrar la temporada se reparten los cargos: 1 sumo sacerdote, 3 principales y 12 jefes de turno, entre quienes sirvieron en los últimos 7 días. Para ser sumo sacerdote hay que haberlo sido en la historia.</li>
          <li>Quien tiene un cargo y pasa 7 días sin servir lo pierde, y el cargo pasa al siguiente de la lista.</li>
          <li>Mientras no se abran el palacio del rey y la escuela de los profetas, los cargos son de prueba.</li>
        </ul>
      </details>
      {estado.esAdmin && (
        <Button variant="secondary" size="sm" disabled={busy} onClick={() => void revisar()} data-testid="button-temporada-revisar">
          Revisar la temporada ahora (administración)
        </Button>
      )}
    </div>
  );
}

function TemporadaView() {
  const [estado, setEstado] = useState<JerusalenEstado | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let vivo = true;
    void fetchEstado().then((r) => {
      if (!vivo) return;
      if (r.ok && r.data) setEstado(r.data);
      else setError(true);
    });
    return () => {
      vivo = false;
    };
  }, []);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Trophy className="h-5 w-5" /> Temporada sacerdotal {estado ? estado.temporada.n : ""}
        </span>
      }
      onClose={() => gameStore.close()}
      wide
      testid="templo-temporada"
    >
      <div className="p-3">
        {estado ? (
          <TemporadaPanel estado={estado} onEstado={setEstado} />
        ) : error ? (
          <p className="py-6 text-center text-sm">No se pudo cargar la temporada. Revisa tu conexión.</p>
        ) : (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>
    </Card>
  );
}

/** Pregunta difícil: llega sin la respuesta, hay 20 segundos y el servidor corrige. */
function DificilView({ q }: { q: JerusalenPregunta }) {
  const session = useContext(SessionCtx);
  const world = useWorld();
  const [left, setLeft] = useState(q.segundos);
  const [picked, setPicked] = useState<string | null>(null);
  const [res, setRes] = useState<JerusalenRespuesta | null>(null);
  const [fallo, setFallo] = useState(false);
  const sent = useRef(false);
  const send = useCallback(
    async (op: string) => {
      if (sent.current) return;
      sent.current = true;
      setPicked(op);
      const r = session ? await session.answer(q, op) : null;
      if (!r) {
        setFallo(true);
        return;
      }
      setRes(r);
      if (r.correcta) world?.audio.correct();
      else world?.audio.wrong();
    },
    [session, q, world],
  );
  useEffect(() => {
    if (picked !== null) return;
    if (left <= 0) {
      void send("");
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, picked, send]);
  const cerrar = () => {
    world?.audio.click();
    gameStore.close();
  };
  const tarde = picked === "";
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Portrait who="azarias" size={28} /> Pregunta difícil de Azarías
        </span>
      }
      testid="templo-dificil"
    >
      <div className="space-y-3 p-4">
        {!res && !fallo && (
          <div className="flex items-center gap-2">
            <Timer className={`h-4 w-4 ${left <= 5 ? "text-red-600" : "text-amber-700"}`} />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
              <div className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${left <= 5 ? "bg-red-500" : "bg-amber-500"}`} style={{ width: `${Math.max(0, (left / SEGUNDOS_PREGUNTA) * 100)}%` }} />
            </div>
            <span className="w-7 text-right text-sm font-black tabular-nums" data-testid="templo-dificil-tiempo">
              {Math.max(0, left)}
            </span>
          </div>
        )}
        <p className="font-serif text-lg font-bold leading-snug">{q.pregunta}</p>
        <div className="space-y-2">
          {q.opciones.map((o, i) => {
            const state = !res ? (picked === o ? "picked" : "") : o === res.respuesta ? "right" : picked === o ? "wrong" : "dim";
            return (
              <button
                key={o}
                type="button"
                disabled={picked !== null}
                onClick={() => void send(o)}
                className={`w-full rounded-xl border-2 px-3 py-2.5 text-left text-[15px] font-semibold transition ${
                  state === "right"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : state === "wrong"
                      ? "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200"
                      : state === "picked"
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                        : state === "dim"
                          ? "border-stone-200 opacity-50 dark:border-stone-700"
                          : "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent dark:hover:bg-amber-950/30"
                }`}
                data-testid={`templo-dificil-opcion-${i}`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-900 dark:bg-amber-900 dark:text-amber-100">{"ABCD"[i]}</span>
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && !res && !fallo && (
          <p className="flex items-center gap-2 text-sm text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Azarías revisa tu respuesta…
          </p>
        )}
        {fallo && (
          <div className="space-y-2 rounded-xl bg-red-50 p-3 text-sm dark:bg-red-950/30">
            <p>No se pudo enviar la respuesta. Revisa tu conexión.</p>
            <Button className="w-full" variant="secondary" onClick={cerrar}>
              Continuar
            </Button>
          </div>
        )}
        {res && (
          <div className={`rounded-xl p-3 ${res.correcta ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-amber-50 dark:bg-amber-950/30"}`} data-testid="templo-dificil-resultado">
            <p className="font-bold">
              {res.correcta
                ? res.ganado
                  ? `¡Correcto! +${res.ganado} de mérito`
                  : "¡Correcto! Tu turno de hoy ya terminó: mañana vuelve a sumar mérito."
                : tarde || !res.aTiempo
                  ? `Se acabó el tiempo. La respuesta era: ${res.respuesta}`
                  : `La respuesta es: ${res.respuesta}`}
            </p>
            <p className="mt-1 text-sm">{res.explica}</p>
            <p className="mt-1 text-xs font-semibold text-amber-800 dark:text-amber-300">{res.ref}</p>
            <Button className="mt-3 w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={cerrar} data-testid="button-templo-dificil-seguir">
              Continuar
            </Button>
          </div>
        )}
        {!res && !fallo && <p className="text-[11px] text-stone-500">Un acierto suma mérito a tu temporada. Cada pregunta sale una sola vez por temporada.</p>}
      </div>
    </Card>
  );
}

// ================================================================ fiestas y juicios
/** Al empezar una fiesta por primera vez: qué es, la ley y su cumplimiento en Cristo. */
function FiestaView({ id }: { id: FiestaId }) {
  const world = useWorld();
  const f = FIESTA[id];
  if (!f) return null;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <span aria-hidden="true">{f.icono}</span> {f.nombre}
        </span>
      }
      testid="templo-fiesta"
    >
      <div className="space-y-3 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
          <CalendarDays className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
          {fechaDeFiesta(f)}
        </p>
        <p className="text-[15px] leading-relaxed">{f.efecto}</p>
        <VerseBox text={f.ley.text} refName={f.ley.ref} />
        <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-950/30">
          <p className="mb-1 text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">En Cristo</p>
          <p className="font-serif text-sm italic text-stone-700 dark:text-stone-300">
            «{f.cristo.text}» <span className="not-italic font-semibold text-sky-800 dark:text-sky-300">— {f.cristo.ref}</span>
          </p>
          <p className="mt-2 text-sm">{f.hoy}</p>
        </div>
        <Button
          className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
          onClick={() => {
            world?.audio.click();
            gameStore.close();
          }}
          data-testid="button-templo-fiesta"
        >
          {f.solemne ? "Servir con reverencia" : "¡Que se alegre el pueblo!"}
        </Button>
      </div>
    </Card>
  );
}

/**
 * Un caso para el sacerdote, en tres pasos: escuchar a las partes, inquirir (examinar hasta dos
 * pistas) y dictar sentencia. Si no es justa, Azarías muestra lo que pasó después.
 */
function JuicioView({ casoId }: { casoId: string }) {
  const world = useWorld();
  const c = casoPorId(casoId);
  const [paso, setPaso] = useState<"escuchar" | "inquirir" | "sentencia" | "fin">("escuchar");
  const [abiertas, setAbiertas] = useState<number[]>([]);
  const [eleccion, setEleccion] = useState<number | null>(null);
  const [res, setRes] = useState<{ justa: boolean; gozo: number; clave: boolean } | null>(null);
  const orden = useMemo(() => {
    const o = [0, 1, 2];
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
    }
    return o;
  }, [casoId]);
  if (!c) return null;
  const abrir = (i: number) => {
    if (abiertas.includes(i) || abiertas.length >= 2) return;
    world?.audio.page();
    setAbiertas([...abiertas, i]);
  };
  const dictar = (k: number) => {
    if (!world || eleccion !== null) return;
    setEleccion(k);
    setRes(world.juzgar(c.id, k, abiertas));
    setPaso("fin");
  };
  const justa = c.opciones.find((o) => o.justa);
  const pasos = [
    ["escuchar", "1. Escuchar"],
    ["inquirir", "2. Inquirir"],
    ["sentencia", "3. Sentencia"],
  ] as const;
  const indice = paso === "fin" ? 3 : pasos.findIndex(([p]) => p === paso);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Scale className="h-5 w-5" /> {c.titulo}
        </span>
      }
      testid="templo-juicio"
    >
      <div className="space-y-3 p-4">
        <div className="flex gap-1 text-[11px] font-bold">
          {pasos.map(([p, label], i) => (
            <span key={p} className={`flex-1 rounded-full px-2 py-1 text-center ${i < indice ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : i === indice ? "bg-amber-400 text-amber-950" : "bg-stone-100 text-stone-500 dark:bg-stone-800"}`}>
              {label}
            </span>
          ))}
        </div>

        {paso === "escuchar" && (
          <>
            <p className="text-xs text-stone-500">Llegó un caso difícil a los sacerdotes (Deuteronomio 17:8-9). Escucha primero a las partes.</p>
            <ul className="space-y-2">
              {c.partes.map((p) => (
                <li key={p.quien} className="rounded-xl border border-amber-200 bg-white p-3 dark:border-amber-900 dark:bg-transparent">
                  <p className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">{p.quien}</p>
                  <p className="mt-0.5 font-serif text-[15px] leading-relaxed">—{p.dice}</p>
                </li>
              ))}
            </ul>
            <VerseBox text={ESCUCHAR.text} refName={ESCUCHAR.ref} />
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => setPaso("inquirir")} data-testid="button-juicio-inquirir">
              <Search className="mr-1 h-4 w-4" /> Inquirir bien
            </Button>
          </>
        )}

        {paso === "inquirir" && (
          <>
            <p className="text-sm">
              Antes de juzgar, examina <b>hasta dos cosas</b>. Te quedan <b data-testid="juicio-quedan">{2 - abiertas.length}</b>.
            </p>
            <ul className="space-y-2">
              {c.pistas.map((p, i) => {
                const abierta = abiertas.includes(i);
                return (
                  <li key={p.nombre}>
                    <button
                      type="button"
                      disabled={abierta || abiertas.length >= 2}
                      onClick={() => abrir(i)}
                      className={`w-full rounded-xl border-2 px-3 py-2 text-left text-sm transition ${abierta ? "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30" : abiertas.length >= 2 ? "border-stone-200 opacity-50 dark:border-stone-700" : "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent"}`}
                      data-testid={`juicio-pista-${i}`}
                    >
                      <span className="flex items-center gap-2 font-bold">
                        <Search className="h-4 w-4 shrink-0" /> {p.nombre}
                      </span>
                      {abierta && <span className="mt-1 block text-[13px] leading-snug text-stone-700 dark:text-stone-200">{p.revela}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <VerseBox text={INQUIRIR.text} refName={INQUIRIR.ref} />
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={!abiertas.length} onClick={() => setPaso("sentencia")} data-testid="button-juicio-sentencia">
              <Scale className="mr-1 h-4 w-4" /> {abiertas.length ? "Dictar sentencia" : "Examina al menos una cosa"}
            </Button>
          </>
        )}

        {paso === "sentencia" && (
          <>
            <p className="text-sm font-semibold">¿Qué dictas?</p>
            <div className="space-y-2">
              {orden.map((k, pos) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => dictar(k)}
                  className="w-full rounded-xl border-2 border-amber-200 bg-white px-3 py-2.5 text-left text-[15px] font-semibold transition hover:border-amber-400 hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent dark:hover:bg-amber-950/30"
                  data-testid={`juicio-opcion-${pos}`}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-900 dark:bg-amber-900 dark:text-amber-100">{"ABC"[pos]}</span>
                  {c.opciones[k].texto}
                </button>
              ))}
            </div>
          </>
        )}

        {paso === "fin" && res && eleccion !== null && (
          <div className="space-y-3" data-testid="juicio-resultado">
            {res.justa ? (
              <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                <p className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-200">
                  <Scale className="h-5 w-5" /> Juicio justo · +{fmt(res.gozo)} de gozo
                </p>
                {res.clave && <p className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">Inquiriste bien: encontraste lo que mostraba la verdad (+50 %).</p>}
                <p className="mt-2 text-sm">{c.opciones[eleccion].despues}</p>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-900/50">
                <div className="flex items-start gap-3">
                  <Portrait who="azarias" size={48} />
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">Azarías te muestra lo que pasó después</p>
                    <p className="mt-1 text-sm leading-relaxed">{c.opciones[eleccion].despues}</p>
                  </div>
                </div>
                <p className="mt-3 rounded-lg bg-white/70 p-2 text-sm font-semibold text-slate-700 dark:bg-black/20 dark:text-slate-200">
                  😔 El pueblo quedó triste: el gozo baja hasta que vuelva la alegría, y la tristeza pasa con las mañanas.
                </p>
                {justa && (
                  <p className="mt-2 text-sm">
                    <b>La sentencia justa era:</b> {justa.texto}
                  </p>
                )}
              </div>
            )}
            <VerseBox text={c.ley.text} refName={c.ley.ref} />
            {!res.justa && <p className="text-center font-serif text-xs italic text-stone-500">«{ALEGRIA.text}» ({ALEGRIA.ref})</p>}
            <Button
              className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
              onClick={() => {
                world?.audio.click();
                gameStore.close();
              }}
              data-testid="button-juicio-seguir"
            >
              Seguir sirviendo
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

/** En el Libro del aprendiz: la fecha de hoy, la próxima fiesta y las fiestas del año. */
function FiestasTab() {
  const world = useWorld();
  if (!world) return null;
  const s = world.s;
  const hoy = fechaDe(s.day);
  const prox = proximaFiesta(s.day);
  return (
    <div className="space-y-3" data-testid="templo-fiestas">
      <div className="grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30">
          <p className="text-base font-black">{hoy.texto}</p>
          hoy · año {hoy.anio} · día {s.day} de servicio
        </div>
        <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/30">
          <p className="text-base font-black">{prox ? `${prox.fiesta.icono} ${prox.enDias === 1 ? "mañana" : `en ${prox.enDias} días`}` : "—"}</p>
          {prox ? `próxima: ${prox.fiesta.nombre}` : "próxima fiesta"}
        </div>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400">
        Cada día de servicio es un día del año hebreo, y el año empieza en Abib (Éxodo 12:2). En las fiestas de Levítico 23 el templo se llena de gente y de gozo.
      </p>
      <ul className="space-y-2">
        {FIESTAS.map((f) => {
          const ahora = hoy.fiestas.some((x) => x.fiesta.id === f.id);
          const vivida = !!s.story[`fiesta:${f.id}`];
          return (
            <li key={f.id} className={`rounded-xl border p-2.5 ${ahora ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30" : "border-stone-200 dark:border-stone-700"}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-bold">
                  <span aria-hidden="true">{f.icono}</span> {f.nombre} {ahora && <span className="text-xs text-amber-700 dark:text-amber-300">(hoy)</span>}
                </p>
                {vivida && <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Ya la celebraste" />}
              </div>
              <p className="text-[11px] font-semibold text-stone-500">{fechaDeFiesta(f)}</p>
              <p className="mt-0.5 text-xs">{f.efecto}</p>
              <p className="mt-1 font-serif text-xs italic text-stone-700 dark:text-stone-300">
                «{f.ley.text}» <span className="not-italic font-semibold">— {f.ley.ref}</span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="text-[11px] text-stone-500">Más adelante, en la ciudad, las fiestas también se vivirán en el palacio del rey y en la escuela de los profetas, cada uno a su manera.</p>
    </div>
  );
}
