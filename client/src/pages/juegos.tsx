/**
 * Juegos: la sala (/juegos) y cada juego (/juegos/:slug). Se juegan en el navegador, sin
 * descargar nada; los puntajes de quien inicia sesión entran a la tabla de los mejores.
 */
import { Suspense, lazy, useEffect, useState, type ComponentType, type LazyExoticComponent } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Flame, Gamepad2, Loader2, Medal, Sparkles, Trophy, Users, Wifi } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameShell } from "@/components/games/GameShell";
import { GAMES_LIST, findGame, type GameDef } from "@/games/registry";
import { TemploCover } from "@/games/templo/Portrait";

// Los juegos con pantalla propia se descargan solo al abrirlos (y una sola vez).
const lazyGames = new Map<string, LazyExoticComponent<ComponentType<{ game: GameDef }>>>();
function lazyGame(g: GameDef) {
  let c = lazyGames.get(g.slug);
  if (!c && g.component) {
    c = lazy(g.component);
    lazyGames.set(g.slug, c);
  }
  return c;
}

function GameCover({ colors, cover }: { colors: [string, string]; cover?: GameDef["cover"] }) {
  if (cover === "templo") {
    return (
      <div className="relative h-36 overflow-hidden rounded-t-xl bg-[#2b2a6e]">
        <TemploCover className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="relative h-36 overflow-hidden rounded-t-xl" style={{ background: `radial-gradient(circle at 50% 120%, ${colors[0]}, ${colors[1]} 60%, #0b0a1f)` }}>
      <svg viewBox="0 0 40 52" className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_18px_rgba(251,146,60,0.8)]" aria-hidden="true">
        <defs>
          <linearGradient id="portada-llama" x1="30%" y1="100%" x2="20%" y2="0%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="35%" stopColor="#ea580c" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <path d="M20,3 C22.5,8 31,15 31,25 C31,36.5 26,45 20,48 C14,45 9,36.5 9,25 C9,15 17.5,8 20,3 Z" fill="url(#portada-llama)" />
        <path d="M20,15 C21.5,19.5 25.5,23 25.5,29.5 C25.5,35.5 23,40 20,42 C17,40 14.5,35.5 14.5,29.5 C14.5,23 18.5,19.5 20,15 Z" fill="#fde68a" opacity="0.85" />
      </svg>
      {[12, 30, 70, 85, 55].map((x, i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-amber-100/80" style={{ left: `${x}%`, top: `${15 + ((i * 17) % 50)}%` }} />
      ))}
    </div>
  );
}

function Sala() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Para toda la familia
        </p>
        <h1 className="flex items-center justify-center gap-2 text-3xl font-black sm:text-4xl">
          <Gamepad2 className="h-9 w-9 text-primary" /> Juegos
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Juegos cristianos para disfrutar y aprender. Se juegan aquí mismo, en el celular o la computadora, sin descargar nada.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES_LIST.map((g) => (
          <Link key={g.slug} href={`/juegos/${g.slug}`} className="group block rounded-xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg" data-testid={`card-game-${g.slug}`}>
            <GameCover colors={g.colors} cover={g.cover} />
            <div className="p-4">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="text-lg font-bold group-hover:text-primary">{g.title}</h2>
                {g.badge && <Badge className="text-[10px]">{g.badge}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{g.description}</p>
              <p className="mt-3 text-sm font-semibold text-primary">Jugar →</p>
            </div>
          </Link>
        ))}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          <Gamepad2 className="mb-2 h-8 w-8 opacity-60" />
          <p className="font-semibold text-foreground">Vienen más juegos</p>
          <p className="mt-1 text-sm">Preguntas bíblicas, versículos para armar y aventuras. ¿Cuál te gustaría? Cuéntanos en Contacto.</p>
        </div>
      </div>

      <ComunidadJuegos />

      <div className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
          <Wifi className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p><b>Livianos.</b> Se descargan una sola vez y corren en tu teléfono: gastan muy pocos datos.</p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
          <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p><b>Tabla de los mejores.</b> Inicia sesión y tus puntajes compiten con los de la comunidad.</p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p><b>Sanos y con propósito.</b> Sin anuncios ni compras; cada partida termina con un versículo.</p>
        </div>
      </div>
    </div>
  );
}

type Lider = { name: string; score: number; meta?: { rango?: number; jornada?: number; copas?: number } | null } | null;
type Comunidad = {
  juegos: { slug: string; jugando: number; jugadores: number; lider?: Lider; liderSemana?: Lider }[];
  actividad: { id: number; game: string; name: string; text: string; createdAt: string; cheers: number; cheeredByMe: boolean; isMine: boolean }[];
};

function haceRato(iso: string) {
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m} min`;
  const h = Math.round(m / 60);
  return h < 24 ? `hace ${h} h` : `hace ${Math.round(h / 24)} d`;
}

/** La comunidad de los juegos: quién juega ahora, quién va primero y lo último que lograron. */
function ComunidadJuegos() {
  const { user } = useAuth();
  const [data, setData] = useState<Comunidad | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/juegos/comunidad", { credentials: "include" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => alive && setData(d))
        .catch(() => null);
    void load();
    const t = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [user]);
  const cheer = async (id: number) => {
    setData((d) => (d ? { ...d, actividad: d.actividad.map((a) => (a.id === id ? { ...a, cheeredByMe: true, cheers: a.cheers + 1 } : a)) } : d));
    try {
      await fetch(`/api/juegos/actividad/${id}/aplauso`, { method: "POST", credentials: "include" });
    } catch {
      /* sin conexión */
    }
  };
  if (!data) return null;
  const titulo = (slug: string) => GAMES_LIST.find((g) => g.slug === slug)?.title || slug;
  return (
    <section className="mt-10 rounded-2xl border bg-card p-4 sm:p-5" data-testid="juegos-comunidad">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-black">
        <Users className="h-5 w-5 text-primary" /> Comunidad de juegos
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.juegos.map((j) => (
          <div key={j.slug} className="rounded-xl border p-3">
            <p className="font-bold">{titulo(j.slug)}</p>
            <p className="text-xs text-muted-foreground">
              {j.jugando > 0 ? (
                <>
                  <Flame className="mr-1 inline h-3.5 w-3.5 text-orange-500" />
                  {j.jugando} jugando ahora · {j.jugadores} en la tabla
                </>
              ) : (
                <>
                  <Trophy className="mr-1 inline h-3.5 w-3.5 text-amber-500" />
                  {j.jugadores === 0 ? "Sé el primero en la tabla" : `${j.jugadores} ${j.jugadores === 1 ? "persona" : "personas"} en la tabla`}
                </>
              )}
            </p>
            {user && (j.liderSemana || j.lider) && (
              <div className="mt-2 space-y-1 text-sm">
                {j.liderSemana && (
                  <p>
                    <Medal className="mr-1 inline h-4 w-4 text-yellow-500" /> 1.º esta semana: <b>{j.liderSemana.name}</b>{" "}
                    <span className="text-muted-foreground">({j.liderSemana.score.toLocaleString("es-419")})</span>
                  </p>
                )}
                {j.lider && (
                  <p>
                    <Trophy className="mr-1 inline h-4 w-4 text-amber-500" /> 1.º de siempre: <b>{j.lider.name}</b>{" "}
                    <span className="text-muted-foreground">({j.lider.score.toLocaleString("es-419")})</span>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {user ? (
        data.actividad.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-bold">Lo último que lograron</p>
            <ul className="space-y-1.5">
              {data.actividad.map((a) => (
                <li key={a.id} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span className="min-w-0 flex-1">
                    <b>{a.name}</b> {a.text} <span className="text-xs text-muted-foreground">· {titulo(a.game)} · {haceRato(a.createdAt)}</span>
                  </span>
                  <button
                    type="button"
                    disabled={a.cheeredByMe || a.isMine}
                    onClick={() => void cheer(a.id)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${a.cheeredByMe || a.isMine ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:opacity-90"}`}
                    title={a.isMine ? "Tu logro" : "Aplaudir"}
                  >
                    🙌 {a.cheers}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          <Link href={loginUrl()} className="font-semibold text-primary underline">
            Inicia sesión
          </Link>{" "}
          para ver quién va primero, aplaudir los logros de la comunidad y aparecer en las tablas.
        </p>
      )}
    </section>
  );
}

export default function JuegosPage() {
  const [isGame, params] = useRoute<{ slug: string }>("/juegos/:slug");
  const game = isGame ? findGame(params?.slug) : undefined;

  useEffect(() => {
    document.title = game ? `${game.title} · Juegos · Avivando el Fuego` : "Juegos · Avivando el Fuego";
  }, [game]);

  if (isGame && !game) {
    return (
      <Layout>
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <h1 className="mb-2 text-2xl font-bold">Ese juego no existe</h1>
          <Button asChild variant="outline">
            <Link href="/juegos">Ver los juegos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (!game) {
    return (
      <Layout>
        <Sala />
      </Layout>
    );
  }

  const Custom = lazyGame(game);
  return (
    <Layout>
      <div className={`mx-auto px-3 py-3 sm:py-5 ${Custom ? "max-w-6xl" : "max-w-3xl"}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/juegos">
              <ArrowLeft className="mr-1 h-4 w-4" /> Juegos
            </Link>
          </Button>
          <h1 className="truncate text-lg font-bold">{game.title}</h1>
          <span className="w-20" aria-hidden="true" />
        </div>
        {Custom ? (
          <Suspense
            fallback={
              <div className="flex h-[60vh] items-center justify-center rounded-2xl border bg-[#1a1408] text-amber-100">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Preparando el juego…
              </div>
            }
          >
            <Custom game={game} />
          </Suspense>
        ) : (
          <GameShell game={game} />
        )}
      </div>
    </Layout>
  );
}
