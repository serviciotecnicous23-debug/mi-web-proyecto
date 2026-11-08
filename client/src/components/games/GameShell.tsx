/**
 * El marco de cada juego: pantalla de inicio, marcador, vidas, pausa, sonido, pantalla
 * completa, fin de partida con un versículo, mejor puntaje (guardado en el teléfono) y la
 * tabla de los mejores de la comunidad (si la persona inició sesión).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Heart, Loader2, Maximize2, Minimize2, Pause, Play, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { GameRunner } from "@/games/engine";
import type { GameDef, Verse } from "@/games/registry";

type Board = {
  top: { rank: number; name: string; avatarUrl: string | null; score: number; isMe: boolean }[];
  mine: { best: number; rank: number; plays: number } | null;
};

type Phase = "loading" | "intro" | "playing" | "paused" | "over" | "error";

const GAME_HEIGHT = "min(calc(100dvh - var(--app-nav-h, 64px) - var(--app-tabbar-h, 0px) - 84px), 780px)";

const bestKey = (slug: string) => `juego-mejor:${slug}`;
function readBest(slug: string): number {
  try {
    return Number(localStorage.getItem(bestKey(slug))) || 0;
  } catch {
    return 0;
  }
}
function writeBest(slug: string, score: number) {
  try {
    localStorage.setItem(bestKey(slug), String(score));
  } catch {
    /* modo privado: no se guarda */
  }
}
function readMuted(): boolean {
  try {
    return localStorage.getItem("juegos-silencio") === "1";
  } catch {
    return false;
  }
}

export function Leaderboard({ board, loading }: { board: Board | null; loading?: boolean }) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!board?.top.length) return <p className="py-3 text-center text-sm text-muted-foreground">Todavía nadie está en la tabla. ¡Sé el primero!</p>;
  return (
    <div>
      <ol className="divide-y rounded-lg border">
        {board.top.map((r) => (
          <li key={r.rank} className={`flex items-center gap-3 px-3 py-2 text-sm ${r.isMe ? "bg-primary/10 font-semibold" : ""}`}>
            <span className={`w-6 text-center font-bold ${r.rank === 1 ? "text-yellow-500" : r.rank === 2 ? "text-slate-400" : r.rank === 3 ? "text-amber-700" : "text-muted-foreground"}`}>
              {r.rank}
            </span>
            <Avatar className="h-7 w-7">
              {r.avatarUrl && <AvatarImage src={r.avatarUrl} alt="" />}
              <AvatarFallback className="text-[10px]">{r.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1 truncate">{r.isMe ? `${r.name} (tú)` : r.name}</span>
            <span className="tabular-nums">{r.score.toLocaleString("es-419")}</span>
          </li>
        ))}
      </ol>
      {board.mine && !board.top.some((r) => r.isMe) && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Tu mejor puntaje: <b>{board.mine.best.toLocaleString("es-419")}</b> · puesto {board.mine.rank}
        </p>
      )}
    </div>
  );
}

export function GameShell({ game }: { game: GameDef }) {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<GameRunner | null>(null);
  const startedAt = useRef(0);
  const userRef = useRef(user);
  userRef.current = user;
  const [phase, setPhase] = useState<Phase>("loading");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [best, setBest] = useState(() => readBest(game.slug));
  const [muted, setMuted] = useState(readMuted);
  const [full, setFull] = useState(false);
  const [result, setResult] = useState<{ score: number; newBest: boolean; verse: Verse } | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [boardLoading, setBoardLoading] = useState(false);
  const [boardNote, setBoardNote] = useState<string | null>(null);

  const loadBoard = useCallback(async () => {
    if (!userRef.current) return;
    setBoardLoading(true);
    try {
      const res = await fetch(`/api/juegos/${game.slug}/ranking`, { credentials: "include" });
      if (res.ok) setBoard(await res.json());
    } finally {
      setBoardLoading(false);
    }
  }, [game.slug]);

  const finish = useCallback(
    async (final: number) => {
      const seconds = (Date.now() - startedAt.current) / 1000;
      const prev = readBest(game.slug);
      const newBest = final > prev;
      if (newBest) writeBest(game.slug, final);
      setBest(Math.max(prev, final));
      setResult({ score: final, newBest, verse: game.verses[Math.floor(Math.random() * game.verses.length)] });
      setPhase("over");
      setBoardNote(null);
      if (!userRef.current) return;
      setBoardLoading(true);
      try {
        const res = await fetch(`/api/juegos/${game.slug}/puntaje`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: final, seconds: Math.round(seconds * 10) / 10 }),
        });
        if (res.ok) setBoard(await res.json());
        else {
          const body = await res.json().catch(() => null);
          setBoardNote(body?.message || "No se pudo guardar el puntaje.");
          void loadBoard();
        }
      } catch {
        setBoardNote("Sin conexión: el puntaje no se guardó en la tabla.");
      } finally {
        setBoardLoading(false);
      }
    },
    [game, loadBoard],
  );
  const finishRef = useRef(finish);
  finishRef.current = finish;

  // Se descarga el juego y se prepara el lienzo
  useEffect(() => {
    let cancelled = false;
    let runner: GameRunner | null = null;
    setPhase("loading");
    if (!game.load) {
      setPhase("error");
      return;
    }
    game
      .load()
      .then((scene) => {
        if (cancelled || !canvasRef.current) return;
        runner = new GameRunner(canvasRef.current, scene, {
          onScore: setScore,
          onLives: setLives,
          onLevel: setLevel,
          onGameOver: (s) => void finishRef.current(s),
        });
        runner.setMuted(readMuted());
        runnerRef.current = runner;
        setPhase("intro");
      })
      .catch(() => !cancelled && setPhase("error"));
    return () => {
      cancelled = true;
      runner?.destroy();
      runnerRef.current = null;
    };
  }, [game]);

  useEffect(() => {
    if (user) void loadBoard();
  }, [user, loadBoard]);

  const start = useCallback(() => {
    const r = runnerRef.current;
    if (!r) return;
    setResult(null);
    startedAt.current = Date.now();
    if (phase === "intro") r.start();
    else r.restart();
    setPhase("playing");
    // Que el juego quede entero a la vista (entre la barra de arriba y la de abajo).
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [phase]);

  const pause = useCallback(() => {
    runnerRef.current?.pause();
    setPhase("paused");
  }, []);
  const resume = useCallback(() => {
    runnerRef.current?.resume();
    setPhase("playing");
  }, []);

  // Teclado: Enter/Espacio empieza, P o Esc pausa
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((phase === "intro" || phase === "over") && (k === "enter" || k === " ")) {
        e.preventDefault();
        start();
      } else if (phase === "playing" && (k === "p" || k === "escape")) pause();
      else if (phase === "paused" && (k === "p" || k === "enter" || k === " ")) {
        e.preventDefault();
        resume();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start, pause, resume]);

  // Si se va a otra pestaña en medio de la partida, queda en pausa.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden && phase === "playing") pause();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [phase, pause]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    runnerRef.current?.setMuted(next);
    try {
      localStorage.setItem("juegos-silencio", next ? "1" : "0");
    } catch {
      /* nada */
    }
  };

  const toggleFull = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await boxRef.current?.requestFullscreen?.();
    } catch {
      /* el celular no lo permite: se juega igual */
    }
  };

  const overlay = "absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 overflow-y-auto bg-black/70 p-5 text-center text-white backdrop-blur-sm";

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      className={`relative mx-auto select-none overflow-hidden bg-[#07060c] outline-none ${full ? "h-full w-full max-w-none rounded-none" : "rounded-2xl border border-orange-500/30 shadow-2xl shadow-orange-950/40"}`}
      style={
        full
          ? undefined
          : {
              // Alto: lo que queda entre la barra de arriba y la de abajo; ancho: según la proporción del juego.
              height: GAME_HEIGHT,
              width: `min(100%, calc(${GAME_HEIGHT} * ${game.aspect}))`,
              minHeight: 420,
              scrollMarginTop: "calc(var(--app-nav-h, 64px) + 8px)",
              scrollMarginBottom: "calc(var(--app-tabbar-h, 0px) + 8px)",
            }
      }
      data-testid="game-box"
    >
      <canvas ref={canvasRef} className="block h-full w-full touch-none" aria-label={`Juego: ${game.title}`} />

      {/* Marcador */}
      {(phase === "playing" || phase === "paused") && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-b from-black/60 to-transparent px-3 py-2 text-white">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-orange-200/80">Puntos</p>
            <p className="text-2xl font-black tabular-nums leading-none" data-testid="game-score">{score}</p>
          </div>
          <div className="flex gap-1" aria-label={`${lives} vidas`}>
            {[0, 1, 2].map((i) => (
              <Heart key={i} className={`h-5 w-5 ${i < lives ? "fill-red-500 text-red-500" : "text-white/30"}`} />
            ))}
          </div>
          <div className="pointer-events-auto flex items-center gap-1">
            <span className="mr-1 rounded-full bg-white/10 px-2 py-0.5 text-xs">Nivel {level}</span>
            <button type="button" onClick={toggleMute} className="rounded-full p-1.5 hover:bg-white/10" aria-label={muted ? "Activar sonido" : "Silenciar"}>
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button type="button" onClick={pause} className="rounded-full p-1.5 hover:bg-white/10" aria-label="Pausa" data-testid="button-game-pause">
              <Pause className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {phase === "loading" && (
        <div className={overlay}>
          <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
          <p className="text-sm text-white/80">Preparando el juego…</p>
        </div>
      )}

      {phase === "error" && (
        <div className={overlay}>
          <p className="font-semibold">No se pudo cargar el juego.</p>
          <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
        </div>
      )}

      {phase === "intro" && (
        <div className={overlay}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{game.tagline}</p>
          <h2 className="text-3xl font-black">{game.title}</h2>
          <ul className="max-w-xs space-y-1 text-left text-sm text-white/85">
            {game.howTo.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
          {best > 0 && (
            <p className="flex items-center gap-1 text-sm text-yellow-300">
              <Trophy className="h-4 w-4" /> Tu mejor puntaje: {best}
            </p>
          )}
          <Button size="lg" className="rounded-full px-10 text-lg" onClick={start} data-testid="button-game-start">
            <Play className="mr-2 h-5 w-5 fill-current" /> Jugar
          </Button>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={toggleMute}>
              {muted ? <VolumeX className="mr-1 h-4 w-4" /> : <Volume2 className="mr-1 h-4 w-4" />} {muted ? "Sin sonido" : "Con sonido"}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => void toggleFull()}>
              {full ? <Minimize2 className="mr-1 h-4 w-4" /> : <Maximize2 className="mr-1 h-4 w-4" />} {full ? "Salir" : "Pantalla completa"}
            </Button>
          </div>
        </div>
      )}

      {phase === "paused" && (
        <div className={overlay}>
          <h2 className="text-2xl font-black">En pausa</h2>
          <Button size="lg" className="rounded-full px-8" onClick={resume} data-testid="button-game-resume">
            <Play className="mr-2 h-5 w-5 fill-current" /> Seguir
          </Button>
          <Button variant="secondary" onClick={start}>
            <RotateCcw className="mr-2 h-4 w-4" /> Empezar de nuevo
          </Button>
        </div>
      )}

      {phase === "over" && result && (
        <div className={overlay} data-testid="game-over">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Fin de la partida</p>
          <p className="text-5xl font-black tabular-nums" data-testid="game-final-score">{result.score}</p>
          {result.newBest ? (
            <p className="flex items-center gap-1 font-semibold text-yellow-300">
              <Trophy className="h-5 w-5" /> ¡Nuevo récord personal!
            </p>
          ) : (
            <p className="text-sm text-white/70">Tu mejor puntaje: {best}</p>
          )}
          <blockquote className="max-w-xs rounded-xl border border-orange-300/30 bg-orange-500/10 px-4 py-3 text-sm italic text-orange-50">
            «{result.verse.text}»
            <footer className="mt-1 text-xs not-italic text-orange-200">{result.verse.ref}</footer>
          </blockquote>
          <Button size="lg" className="rounded-full px-8" onClick={start} data-testid="button-game-again">
            <RotateCcw className="mr-2 h-5 w-5" /> Jugar otra vez
          </Button>
          <div className="w-full max-w-xs text-left text-white">
            {user ? (
              <>
                <p className="mb-1 flex items-center gap-1 text-sm font-semibold">
                  <Trophy className="h-4 w-4 text-yellow-400" /> Los mejores de la comunidad
                </p>
                {boardNote && <p className="mb-1 text-xs text-orange-200">{boardNote}</p>}
                <div className="rounded-lg bg-white/95 text-foreground dark:bg-card">
                  <Leaderboard board={board} loading={boardLoading} />
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-white/80">
                <Link href={loginUrl()} className="font-semibold text-orange-300 underline">Inicia sesión</Link> para guardar tus puntajes
                y aparecer en la tabla de los mejores.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
