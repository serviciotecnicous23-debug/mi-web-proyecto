/**
 * Juegos: la sala (/juegos) y cada juego (/juegos/:slug). Se juegan en el navegador, sin
 * descargar nada; los puntajes de quien inicia sesión entran a la tabla de los mejores.
 */
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Gamepad2, Sparkles, Trophy, Users, Wifi } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameShell } from "@/components/games/GameShell";
import { GAMES_LIST, findGame } from "@/games/registry";

function GameCover({ colors }: { colors: [string, string] }) {
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
            <GameCover colors={g.colors} />
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

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-3 py-3 sm:py-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/juegos">
              <ArrowLeft className="mr-1 h-4 w-4" /> Juegos
            </Link>
          </Button>
          <h1 className="truncate text-lg font-bold">{game.title}</h1>
          <span className="w-20" aria-hidden="true" />
        </div>
        <GameShell game={game} />
      </div>
    </Layout>
  );
}
