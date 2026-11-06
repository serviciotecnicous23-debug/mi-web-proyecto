import { Link } from "wouter";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Circle,
  Flame,
  GraduationCap,
  Heart,
  MessageSquare,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useClubSummary } from "@/hooks/use-club";
import { useMyEnrollments } from "@/hooks/use-users";
import { bibleBookLabel } from "@shared/bible";

/**
 * "Hoy": el Inicio de quien tiene cuenta, como en las apps (YouVersion, Hallow, Church
 * Center). Lo personal primero: la lectura del día, los desafíos, las clases y lo que
 * viene. La portada promocional sigue siendo para los visitantes.
 */
export type TodayAgendaItem = { key: string; d: string; t: string; s: string; href: string };

const QUICK = [
  { href: "/biblioteca", label: "Biblia", icon: BookOpen },
  { href: "/capacitaciones", label: "Clases", icon: GraduationCap },
  { href: "/oracion", label: "Oración", icon: Heart },
  { href: "/comunidad", label: "Comunidad", icon: MessageSquare },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/en-vivo", label: "En vivo", icon: Video },
];

const INICIAL_DIA = ["D", "L", "M", "M", "J", "V", "S"];

function saludo(hora: number) {
  if (hora < 12) return "Buenos días";
  if (hora < 19) return "Buenas tardes";
  return "Buenas noches";
}

function plural(n: number, uno: string, varios: string) {
  return `${n} ${n === 1 ? uno : varios}`;
}

export function MemberToday({ agenda }: { agenda: TodayAgendaItem[] }) {
  const { user } = useAuth();
  const active = !!user?.isActive;
  const { data: club } = useClubSummary(active);
  const { data: enrollments } = useMyEnrollments();

  const now = new Date();
  const nombre = (user?.displayName || user?.username || "").trim().split(/\s+/)[0];
  const fecha = now.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });
  const lista = Array.isArray(enrollments) ? (enrollments as any[]) : [];
  const clases = lista.filter((e) => e.status === "aprobado").slice(0, 2);
  const pendientes = lista.filter((e) => e.status === "solicitado").length;
  const completadas = lista.filter((e) => e.status === "completado").length;
  const hechos = club ? club.daily.filter((d) => d.done).length : 0;

  // Inicial del día de cada uno de los últimos 7 (el último es hoy).
  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    return INICIAL_DIA[d.getDay()];
  });

  return (
    <section className="today" aria-labelledby="today-title" data-testid="member-today">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-10 space-y-4">
        <header className="pb-1">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/90 font-mono first-letter:uppercase">{fecha}</p>
          <h1 id="today-title" className="heading-display font-display text-3xl md:text-4xl mt-1">
            {saludo(now.getHours())}
            {nombre ? (
              <>
                , <span className="fire-text">{nombre}</span>
              </>
            ) : null}
          </h1>
        </header>

        {!active && (
          <div className="today-card text-sm text-muted-foreground" data-testid="today-pending">
            Tu cuenta está pendiente de aprobación. Mientras tanto puedes leer la Biblia, escuchar la radio y ver
            los eventos del ministerio.
          </div>
        )}

        {active && club && (
          <div className="today-card today-card--fire" data-testid="today-reading">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="today-flame" aria-hidden="true">
                  <Flame className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Tu racha</p>
                  <p className="text-2xl font-bold leading-tight whitespace-nowrap">{plural(club.streak.current, "día", "días")}</p>
                </div>
              </div>
              <ol
                className="flex gap-1.5"
                aria-label={`Leíste ${club.streak.last7.filter(Boolean).length} de los últimos 7 días`}
              >
                {club.streak.last7.map((leido, i) => (
                  <li key={i} className={`today-day${leido ? " today-day--on" : ""}`} aria-hidden="true">
                    {dias[i]}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-black/25 p-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {club.streak.readToday ? "Ya leíste hoy. Sigue cuando quieras" : club.suggested.reason}
                </p>
                <p className="font-semibold truncate">
                  {bibleBookLabel(club.suggested.book)} {club.suggested.chapter}
                </p>
              </div>
              <Link href={`/biblioteca?libro=${encodeURIComponent(club.suggested.book)}&cap=${club.suggested.chapter}`}>
                <Button className="fire-btn-primary min-h-11 shrink-0" data-testid="button-today-read">
                  Leer ahora
                </Button>
              </Link>
            </div>
          </div>
        )}

        {active && club && club.daily.length > 0 && (
          <div className="today-card" data-testid="today-challenges">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Desafíos de hoy</h2>
              <span className="text-xs text-muted-foreground">
                {hechos} de {club.daily.length}
              </span>
            </div>
            <ul className="space-y-2.5">
              {club.daily.map((d) => (
                <li key={d.id} className="flex items-start gap-2.5">
                  {d.done ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-label="Hecho" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-label="Pendiente" />
                  )}
                  <span className={d.done ? "text-muted-foreground line-through decoration-1" : ""}>{d.title}</span>
                </li>
              ))}
            </ul>
            <Link href="/biblioteca?tab=club" className="today-link mt-3">
              Ver el Club de lectura <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="today-card" data-testid="today-classes">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Mis clases</h2>
            <Link href="/mis-capacitaciones" className="today-link">
              Ver todas
            </Link>
          </div>
          {clases.length > 0 ? (
            <ul className="space-y-1">
              {clases.map((e) => (
                <li key={e.id}>
                  <Link href={`/aula/${e.courseId}`} className="today-row">
                    <GraduationCap className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{e.course?.title || "Mi clase"}</span>
                      <span className="block text-xs text-muted-foreground">Ir al aula</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              {pendientes > 0
                ? `Tienes ${plural(pendientes, "solicitud", "solicitudes")} esperando aprobación. `
                : completadas > 0
                  ? `Completaste ${plural(completadas, "curso", "cursos")}. ¿Seguimos con otro? `
                  : "Aún no estás en ninguna clase. "}
              <Link href="/capacitaciones" className="text-primary underline underline-offset-2">
                Ver capacitaciones
              </Link>
            </p>
          )}
        </div>

        <div className="today-card" data-testid="today-agenda">
          <h2 className="mb-2 font-semibold">Próximas actividades</h2>
          <ul className="space-y-1">
            {agenda.map((a) => (
              <li key={a.key}>
                <Link href={a.href} className="today-row">
                  <span className="today-date">{a.d}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{a.t}</span>
                    <span className="block truncate text-xs text-muted-foreground">{a.s}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Accesos rápidos" className="grid grid-cols-3 gap-3" data-testid="today-quick">
          {QUICK.map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.href} href={q.href} className="today-quick">
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span>{q.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
