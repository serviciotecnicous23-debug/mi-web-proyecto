import { useEffect, useMemo, useRef, useState } from "react";
import { RichText } from "@/components/media/RichText";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  useClubSummary, useCheckMemoryVerse, useCreateChallenge, useEndChallenge, useJoinChallenge,
} from "@/hooks/use-club";
import {
  useBibleNotes, useCreateReadingClubComment, useCreateReadingClubPost, useDeleteReadingClubPost,
  useReadingClubComments, useReadingClubLikedPosts, useReadingClubPosts, useToggleReadingClubPostLike,
  useWhatsappLink,
} from "@/hooks/use-users";
import { BIBLE_BOOKS } from "@shared/schema";
import { BIBLE_BOOK_CHAPTERS, bibleBookLabel } from "@shared/bible";
import { CHALLENGE_PRESETS, CLUB_BADGES, addDays, type ClubBadgeType, type ClubChallengeSummary, type ClubSummary } from "@shared/club";
import { SiWhatsapp } from "react-icons/si";
import {
  BookOpen, Check, ChevronRight, Flame, Heart, Loader2, MessageCircle, PenLine, Plus, Send, Sparkles,
  StickyNote, Target, Trash2, Trophy, Users,
} from "lucide-react";

type OpenChapter = (book: string, chapter: number) => void;

const WEEKDAY = ["D", "L", "M", "X", "J", "V", "S"];
const LEADER_ROLES = new Set(["admin", "director", "staff_global"]);

function initials(name?: string | null) {
  return (name || "?").split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function timeAgo(date?: string | Date | null) {
  if (!date) return "";
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  } catch {
    return "";
  }
}

function prettyDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("es", { day: "numeric", month: "long", timeZone: "UTC" });
}

// ---------------------------------------------------------------------------
// Tu camino en la Palabra: racha, últimos 7 días y la lectura sugerida.
// ---------------------------------------------------------------------------
function StreakHero({ summary, onOpenChapter }: { summary: ClubSummary; onOpenChapter: OpenChapter }) {
  const { streak, suggested, totalChapters } = summary;
  const status = streak.readToday
    ? "Hoy ya leíste. ¡Bien hecho!"
    : streak.current > 0
      ? "Lee hoy para mantener tu racha."
      : "Empieza hoy tu racha de lectura.";
  return (
    <Card className="overflow-hidden border-primary/25 bg-linear-to-br from-primary/15 via-primary/5 to-transparent">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center gap-4">
            <div
              className={`relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 ${streak.readToday ? "bg-linear-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30" : "bg-muted text-muted-foreground"}`}
              aria-label={`Racha de ${streak.current} días`}
            >
              <Flame className="w-7 h-7" />
              <span className="text-xl font-bold leading-none mt-0.5" data-testid="text-streak">{streak.current}</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Tu racha</p>
              <p className="text-2xl font-bold leading-tight">
                {streak.current === 1 ? "1 día" : `${streak.current} días`} seguidos
              </p>
              <p className="text-sm text-muted-foreground">{status}</p>
            </div>
          </div>

          <div className="sm:ml-auto flex flex-col gap-3">
            <div className="flex items-center gap-1.5" aria-label="Últimos 7 días">
              {streak.last7.map((read, i) => {
                const day = addDays(summary.today, i - 6);
                const weekday = WEEKDAY[new Date(`${day}T12:00:00Z`).getUTCDay()];
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">{weekday}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${read ? "bg-orange-500 text-white" : "border border-dashed border-muted-foreground/40"} ${i === 6 ? "ring-2 ring-primary/40" : ""}`}
                      title={`${prettyDate(day)}: ${read ? "leíste" : "sin lectura"}`}
                    >
                      {read ? <Check className="w-3.5 h-3.5" /> : null}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Mejor racha: <strong>{streak.best}</strong> · Capítulos leídos: <strong>{totalChapters}</strong>
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl bg-background/60 border p-3">
          <BookOpen className="w-5 h-5 text-primary shrink-0 hidden sm:block" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{bibleBookLabel(suggested.book)} {suggested.chapter}</p>
            <p className="text-xs text-muted-foreground truncate">{suggested.reason}</p>
          </div>
          <Button className="min-h-11" onClick={() => onOpenChapter(suggested.book, suggested.chapter)} data-testid="button-read-suggested">
            Leer ahora <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Cuenta sola: al leer un capítulo completo en la Biblia de la web se registra tu lectura. No hay que marcar nada.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Desafíos de hoy: se completan con la actividad real del día.
// ---------------------------------------------------------------------------
function DailyChallenges({
  summary, onOpenChapter, onGoTo,
}: {
  summary: ClubSummary;
  onOpenChapter: OpenChapter;
  onGoTo: (section: "compartir" | "versiculo") => void;
}) {
  const [, navigate] = useLocation();
  const done = summary.daily.filter((d) => d.done).length;
  const challengeReading = summary.challenges.flatMap((c) => (c.joined && c.status === "activo" ? c.todayReading : [])).find((r) => !r.read);
  const action = (id: string) => {
    switch (id) {
      case "leer":
      case "reflexion":
        return { label: id === "leer" ? "Leer" : "Ir a la Biblia", run: () => onOpenChapter(summary.suggested.book, summary.suggested.chapter) };
      case "desafio":
        return challengeReading ? { label: "Leer", run: () => onOpenChapter(challengeReading.book, challengeReading.chapter) } : null;
      case "compartir":
        return { label: "Escribir", run: () => onGoTo("compartir") };
      case "orar":
        return { label: "Ir al muro", run: () => navigate("/oracion") };
      case "versiculo":
        return { label: "Practicar", run: () => onGoTo("versiculo") };
      default:
        return null;
    }
  };
  return (
    <section aria-labelledby="club-hoy">
      <div className="flex items-center justify-between mb-3">
        <h3 id="club-hoy" className="font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> Desafíos de hoy
        </h3>
        <Badge variant={done === summary.daily.length ? "default" : "secondary"} data-testid="badge-daily-progress">
          {done} de {summary.daily.length}
        </Badge>
      </div>
      <Progress value={(done / summary.daily.length) * 100} className="h-2 mb-3" aria-label="Desafíos de hoy completados" />
      <Card>
        <CardContent className="p-0 divide-y">
          {summary.daily.map((d) => {
            const a = !d.done ? action(d.id) : null;
            return (
              <div key={d.id} className="flex items-center gap-3 p-3 sm:p-4" data-testid={`daily-${d.id}`}>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${d.done ? "bg-green-500 text-white" : "border-2 border-muted-foreground/30"}`}
                  aria-label={d.done ? "Completado" : "Pendiente"}
                >
                  {d.done && <Check className="w-4 h-4" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${d.done ? "text-muted-foreground line-through" : ""}`}>{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
                {a && (
                  <Button variant="outline" size="sm" className="min-h-10 shrink-0" onClick={a.run}>
                    {a.label}
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
      {done === summary.daily.length && (
        <p className="mt-3 text-sm text-center font-medium text-green-700 dark:text-green-400">
          🏆 ¡Completaste todos los desafíos de hoy!
        </p>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desafíos del club: lectura en grupo, como los "planes con amigos".
// ---------------------------------------------------------------------------
function ChallengeCard({ c, onOpenChapter }: { c: ClubChallengeSummary; onOpenChapter: OpenChapter }) {
  const { toast } = useToast();
  const join = useJoinChallenge();
  const end = useEndChallenge();
  const [confirmEnd, setConfirmEnd] = useState(false);
  const pct = c.totalChapters ? Math.round((c.myCompleted / c.totalChapters) * 100) : 0;
  const behind = Math.max(0, c.expectedByToday - c.myCompleted);
  const statusLabel =
    c.status === "proximo" ? `Empieza el ${prettyDate(c.startDate)}`
      : c.status === "terminado" ? "Terminado"
        : `Día ${c.dayNumber} de ${c.totalDays}`;

  const toggleJoin = () =>
    join.mutate(
      { id: c.id, join: !c.joined },
      {
        onSuccess: () => toast({ title: c.joined ? "Saliste del desafío" : "¡Te uniste al desafío!", description: c.title }),
        onError: () => toast({ title: "No se pudo actualizar", variant: "destructive" }),
      },
    );

  return (
    <Card className={c.joined ? "border-primary/30" : ""} data-testid={`challenge-${c.id}`}>
      <CardContent className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-semibold leading-snug">{c.title}</h4>
            {c.description && <p className="text-sm text-muted-foreground mt-1">{c.description}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              {c.totalChapters} capítulos · {c.chaptersPerDay === 1 ? "1 por día" : `${c.chaptersPerDay} por día`} · hasta el {prettyDate(c.endDate)}
            </p>
          </div>
          <Badge variant={c.status === "activo" ? "default" : "secondary"} className="shrink-0">{statusLabel}</Badge>
        </div>

        {c.joined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span>Tu avance: <strong>{c.myCompleted}</strong> de {c.totalChapters}</span>
              <span className="font-semibold text-primary">{pct}%</span>
            </div>
            <Progress value={pct} className="h-2.5" aria-label={`Avance en ${c.title}`} />
            {c.status === "activo" && (
              <p className={`text-xs ${behind === 0 ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"}`}>
                {behind === 0 ? "✓ Vas al día" : `Te ${behind === 1 ? "falta 1 capítulo" : `faltan ${behind} capítulos`} para ir al día`}
              </p>
            )}
          </div>
        )}

        {c.status === "activo" && c.todayReading.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Lectura de hoy</p>
            <div className="flex flex-wrap gap-2">
              {c.todayReading.map((r) => (
                <button
                  key={`${r.book}-${r.chapter}`}
                  onClick={() => onOpenChapter(r.book, r.chapter)}
                  className={`min-h-10 px-3 rounded-lg border text-sm inline-flex items-center gap-1.5 transition-colors ${r.read ? "bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300" : "hover:border-primary hover:bg-primary/5"}`}
                  aria-label={`${r.read ? "Leído: " : "Leer "}${bibleBookLabel(r.book)} ${r.chapter}`}
                >
                  {r.read ? <Check className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  {bibleBookLabel(r.book)} {r.chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex -space-x-2">
              {c.members.map((m) => (
                <Avatar
                  key={m.userId}
                  className={`w-8 h-8 border-2 ${m.readToday ? "border-green-500" : "border-background"}`}
                  title={`${m.displayName}: ${m.completed} capítulos${m.readToday ? " · leyó hoy" : ""}`}
                >
                  {m.avatarUrl && <AvatarImage src={m.avatarUrl} alt="" />}
                  <AvatarFallback className="text-[10px]">{initials(m.displayName)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5 inline mr-1" />
              {c.memberCount === 0
                ? "Sé el primero en unirte"
                : `${c.memberCount} ${c.memberCount === 1 ? "participante" : "participantes"} · ${c.membersReadToday} leyeron hoy`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {c.canManage && c.status !== "terminado" && (
              <Button variant="ghost" size="sm" className="min-h-10 text-muted-foreground" onClick={() => setConfirmEnd(true)}>
                Terminar
              </Button>
            )}
            {c.status !== "terminado" && (
              <Button
                variant={c.joined ? "outline" : "default"}
                className="min-h-11"
                onClick={toggleJoin}
                disabled={join.isPending}
                data-testid={`button-join-${c.id}`}
              >
                {join.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {c.joined ? "Salir" : "Unirme"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog open={confirmEnd} onOpenChange={setConfirmEnd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Terminar este desafío?</AlertDialogTitle>
            <AlertDialogDescription>
              "{c.title}" dejará de mostrarse en el club. Lo que cada uno leyó sigue contando en su racha.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => end.mutate(c.id, { onSuccess: () => toast({ title: "Desafío terminado" }) })}>
              Terminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function CreateChallengeDialog({ open, onOpenChange, today }: { open: boolean; onOpenChange: (v: boolean) => void; today: string }) {
  const { toast } = useToast();
  const create = useCreateChallenge();
  const [presetId, setPresetId] = useState<string>(CHALLENGE_PRESETS[0].id);
  const [book, setBook] = useState("Juan");
  const [title, setTitle] = useState<string>(CHALLENGE_PRESETS[0].title);
  const [description, setDescription] = useState<string>(CHALLENGE_PRESETS[0].description);
  const [perDay, setPerDay] = useState<number>(CHALLENGE_PRESETS[0].chaptersPerDay);
  const [startDate, setStartDate] = useState(today);
  const [notifyAll, setNotifyAll] = useState(true);
  const custom = presetId === "libro";

  const choosePreset = (id: string) => {
    setPresetId(id);
    const preset = CHALLENGE_PRESETS.find((p) => p.id === id);
    if (preset) {
      setTitle(preset.title);
      setDescription(preset.description);
      setPerDay(preset.chaptersPerDay);
    } else {
      setTitle(`${bibleBookLabel(book)} en ${BIBLE_BOOK_CHAPTERS[book]} días`);
      setDescription("");
      setPerDay(1);
    }
  };

  const totalChapters = custom
    ? BIBLE_BOOK_CHAPTERS[book] ?? 0
    : (CHALLENGE_PRESETS.find((p) => p.id === presetId)?.books ?? []).reduce((n, b) => n + (BIBLE_BOOK_CHAPTERS[b] ?? 0), 0);
  const days = Math.ceil(totalChapters / Math.max(1, perDay));

  const submit = () =>
    create.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        presetId: custom ? undefined : presetId,
        books: custom ? [book] : undefined,
        chaptersPerDay: perDay,
        startDate,
        notifyAll,
      },
      {
        onSuccess: () => {
          toast({ title: "Desafío creado", description: notifyAll ? "Se avisó a los miembros en la campana." : undefined });
          onOpenChange(false);
        },
        onError: (err: any) => toast({ title: "No se pudo crear", description: String(err?.message || "").replace(/^\d+:\s*/, ""), variant: "destructive" }),
      },
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo desafío del club</DialogTitle>
          <DialogDescription>La lectura de cada participante se cuenta sola al leer en la Biblia de la web.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Lectura</Label>
            <Select value={presetId} onValueChange={choosePreset}>
              <SelectTrigger data-testid="select-challenge-preset"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CHALLENGE_PRESETS.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                <SelectItem value="libro">Un libro a elección…</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {custom && (
            <div className="space-y-1.5">
              <Label>Libro</Label>
              <Select value={book} onValueChange={(b) => { setBook(b); setTitle(`${bibleBookLabel(b)} en ${Math.ceil((BIBLE_BOOK_CHAPTERS[b] ?? 1) / perDay)} días`); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {BIBLE_BOOKS.map((b) => <SelectItem key={b} value={b}>{bibleBookLabel(b)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="challenge-title">Título</Label>
            <Input id="challenge-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="challenge-desc">Descripción (opcional)</Label>
            <Textarea id="challenge-desc" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="challenge-start">Empieza</Label>
              <Input id="challenge-start" type="date" value={startDate} min={addDays(today, -7)} max={addDays(today, 90)} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="challenge-perday">Capítulos por día</Label>
              <Input id="challenge-perday" type="number" min={1} max={10} value={perDay} onChange={(e) => setPerDay(Math.min(10, Math.max(1, Number(e.target.value) || 1)))} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{totalChapters} capítulos · {days} {days === 1 ? "día" : "días"}</p>
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <Checkbox checked={notifyAll} onCheckedChange={(v) => setNotifyAll(v === true)} className="mt-0.5" />
            <span>Avisar a los miembros en la campana de la web (no se envían correos)</span>
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={submit} disabled={create.isPending || title.trim().length < 3} data-testid="button-create-challenge">
            {create.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Crear desafío
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ClubChallenges({ summary, onOpenChapter }: { summary: ClubSummary; onOpenChapter: OpenChapter }) {
  const [creating, setCreating] = useState(false);
  return (
    <section aria-labelledby="club-desafios">
      <div className="flex items-center justify-between mb-3 gap-2">
        <h3 id="club-desafios" className="font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" /> Desafíos del club
        </h3>
        {summary.canCreateChallenges && (
          <Button size="sm" variant="outline" className="min-h-10" onClick={() => setCreating(true)} data-testid="button-new-challenge">
            <Plus className="w-4 h-4 mr-1" /> Crear desafío
          </Button>
        )}
      </div>
      {summary.challenges.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Trophy className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              {summary.canCreateChallenges
                ? "Aún no hay desafíos. Crea el primero y lean juntos un libro de la Biblia."
                : "Aún no hay desafíos activos. Pronto el ministerio lanzará uno."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {summary.challenges.map((c) => <ChallengeCard key={c.id} c={c} onOpenChapter={onOpenChapter} />)}
        </div>
      )}
      {summary.community.chaptersThisWeek > 0 && (
        <p className="mt-3 text-xs text-center text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 inline mr-1 text-primary" />
          Esta semana la comunidad leyó {summary.community.chaptersThisWeek} capítulos
          ({summary.community.readersThisWeek} {summary.community.readersThisWeek === 1 ? "lector" : "lectores"}).
        </p>
      )}
      {summary.canCreateChallenges && <CreateChallengeDialog open={creating} onOpenChange={setCreating} today={summary.today} />}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Versículo de la semana: el servidor comprueba las palabras.
// ---------------------------------------------------------------------------
function MemoryVerse({ summary, onOpenChapter }: { summary: ClubSummary; onOpenChapter: OpenChapter }) {
  const verse = summary.memoryVerse;
  const check = useCheckMemoryVerse();
  const [answers, setAnswers] = useState<string[]>(() => Array(verse.blankCount).fill(""));
  const [wrong, setWrong] = useState<number[]>([]);
  useEffect(() => {
    setAnswers(Array(verse.blankCount).fill(""));
    setWrong([]);
  }, [verse.week, verse.blankCount]);

  const submit = () =>
    check.mutate(answers, {
      onSuccess: (r) => setWrong(r.correct ? [] : r.wrong),
    });

  return (
    <Card className="border-amber-300/50 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/10">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">🧠 Versículo de la semana</p>
          <button className="text-xs text-primary hover:underline min-h-10 px-2 -mr-2" onClick={() => onOpenChapter(verse.book, verse.chapter)}>
            {verse.ref}
          </button>
        </div>
        {verse.done ? (
          <div className="space-y-2">
            <p className="text-base italic leading-relaxed">“{verse.fullText}”</p>
            <p className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Lo completaste esta semana. El lunes llega uno nuevo.
            </p>
          </div>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <p className="text-base leading-loose">
              {verse.parts.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <input
                    key={i}
                    value={answers[part.blank] ?? ""}
                    onChange={(e) => {
                      const next = [...answers];
                      next[part.blank] = e.target.value;
                      setAnswers(next);
                      setWrong((w) => w.filter((x) => x !== part.blank));
                    }}
                    aria-label={`Palabra ${part.blank + 1} de ${verse.blankCount}`}
                    className={`inline-block align-baseline mx-0.5 my-0.5 px-1.5 h-10 rounded-md border bg-background text-base text-center ${wrong.includes(part.blank) ? "border-destructive ring-1 ring-destructive" : "border-input"}`}
                    style={{ width: `${Math.max(4, verse.blankLengths[part.blank] ?? 6) + 2}ch` }}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck={false}
                  />
                ),
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="min-h-11" disabled={check.isPending || answers.some((a) => !a.trim())} data-testid="button-check-verse">
                {check.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Comprobar
              </Button>
              {wrong.length > 0 && (
                <p className="text-sm text-destructive" role="status">
                  Revisa {wrong.length === 1 ? "la palabra marcada" : "las palabras marcadas"}. Puedes releer {verse.ref}.
                </p>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Reflexiones del club (ya existían en el servidor, pero no se mostraban).
// ---------------------------------------------------------------------------
function PostComments({ postId }: { postId: number }) {
  const { data: comments = [], isLoading } = useReadingClubComments(postId);
  const create = useCreateReadingClubComment();
  const [text, setText] = useState("");
  return (
    <div className="mt-3 space-y-2 border-t pt-3">
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        comments.map((c: any) => (
          <div key={c.id} className="flex gap-2">
            <Avatar className="w-7 h-7">
              {c.user?.avatarUrl && <AvatarImage src={c.user.avatarUrl} alt="" />}
              <AvatarFallback className="text-[10px]">{initials(c.user?.displayName || c.displayName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium">
                {c.user?.displayName || c.displayName || "Miembro"} <span className="font-normal text-muted-foreground">· {timeAgo(c.createdAt)}</span>
              </p>
              <RichText text={c.content} className="text-sm" compact maxEmbeds={1} />
            </div>
          </div>
        ))
      )}
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          create.mutate({ postId, content: text.trim() }, { onSuccess: () => setText("") });
        }}
      >
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe un comentario…" maxLength={1000} className="min-h-10" aria-label="Comentario" />
        <Button type="submit" size="icon" className="min-h-10 min-w-10" disabled={!text.trim() || create.isPending} aria-label="Enviar comentario">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

function Reflections({ defaultRef, onOpenChapter }: { defaultRef: { book: string; chapter: number }; onOpenChapter: OpenChapter }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: posts = [], isLoading } = useReadingClubPosts();
  const { data: liked = [] } = useReadingClubLikedPosts();
  const toggleLike = useToggleReadingClubPostLike();
  const createPost = useCreateReadingClubPost();
  const deletePost = useDeleteReadingClubPost();
  const [book, setBook] = useState(defaultRef.book);
  const [chapter, setChapter] = useState(defaultRef.chapter);
  const [content, setContent] = useState("");
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [visible, setVisible] = useState(10);
  const likedSet = useMemo(() => new Set<number>((liked as any[]).map((l: any) => (typeof l === "number" ? l : l.postId))), [liked]);
  const isLeader = LEADER_ROLES.has(user?.role || "");

  const publish = () =>
    createPost.mutate(
      { book, chapter, content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          toast({ title: "Reflexión publicada", description: "Gracias por compartir con el club." });
        },
        onError: () => toast({ title: "No se pudo publicar", variant: "destructive" }),
      },
    );

  return (
    <section aria-labelledby="club-reflexiones">
      <h3 id="club-reflexiones" className="font-semibold flex items-center gap-2 mb-3">
        <MessageCircle className="w-5 h-5 text-primary" /> Reflexiones del club
      </h3>
      <Card className="mb-3">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={book} onValueChange={(b) => { setBook(b); setChapter(1); }}>
              <SelectTrigger className="w-44 min-h-10" aria-label="Libro"><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-72">
                {BIBLE_BOOKS.map((b) => <SelectItem key={b} value={b}>{bibleBookLabel(b)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={1}
              max={BIBLE_BOOK_CHAPTERS[book] ?? 1}
              value={chapter}
              onChange={(e) => setChapter(Math.min(BIBLE_BOOK_CHAPTERS[book] ?? 1, Math.max(1, Number(e.target.value) || 1)))}
              className="w-20 min-h-10"
              aria-label="Capítulo"
            />
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`¿Qué te habló Dios en ${bibleBookLabel(book)} ${chapter}?`}
            rows={3}
            maxLength={2000}
            aria-label="Tu reflexión"
            data-testid="input-club-reflection"
          />
          <div className="flex justify-end">
            <Button className="min-h-11" onClick={publish} disabled={!content.trim() || createPost.isPending} data-testid="button-publish-reflection">
              {createPost.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PenLine className="w-4 h-4 mr-2" />}
              Compartir reflexión
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-2">{[0, 1].map((i) => <Skeleton key={i} className="h-24 w-full" />)}</div>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">Aún no hay reflexiones. ¡Comparte la primera!</p>
      ) : (
        <div className="space-y-3">
          {(posts as any[]).slice(0, visible).map((p) => {
            const mine = p.userId === user?.id;
            return (
              <Card key={p.id} data-testid={`club-post-${p.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-9 h-9">
                      {p.user?.avatarUrl && <AvatarImage src={p.user.avatarUrl} alt="" />}
                      <AvatarFallback className="text-xs">{initials(p.user?.displayName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">{p.user?.displayName || "Miembro"}</span>
                        <span className="text-xs text-muted-foreground">{timeAgo(p.createdAt)}</span>
                        <button onClick={() => onOpenChapter(p.book, p.chapter)} className="ml-auto min-h-10 px-1 -my-2 flex items-center">
                          <Badge variant="outline" className="text-xs hover:border-primary">{bibleBookLabel(p.book)} {p.chapter}</Badge>
                        </button>
                      </div>
                      <p className="text-sm mt-1.5 whitespace-pre-wrap break-words leading-relaxed">{p.content}</p>
                      <div className="flex items-center gap-1 mt-2 -ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`min-h-9 ${likedSet.has(p.id) ? "text-red-500" : "text-muted-foreground"}`}
                          onClick={() => toggleLike.mutate(p.id)}
                          aria-pressed={likedSet.has(p.id)}
                          aria-label="Me gusta"
                        >
                          <Heart className={`w-4 h-4 mr-1 ${likedSet.has(p.id) ? "fill-current" : ""}`} /> {p.likeCount || 0}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="min-h-9 text-muted-foreground"
                          onClick={() => setOpenComments(openComments === p.id ? null : p.id)}
                          aria-expanded={openComments === p.id}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" /> {p.commentCount || 0}
                        </Button>
                        {(mine || isLeader) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="min-h-9 text-muted-foreground ml-auto"
                            onClick={() => deletePost.mutate(p.id)}
                            aria-label="Borrar reflexión"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {openComments === p.id && <PostComments postId={p.id} />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {posts.length > visible && (
            <Button variant="outline" className="w-full min-h-11" onClick={() => setVisible((v) => v + 10)}>
              Ver más reflexiones
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Insignias y diario personal.
// ---------------------------------------------------------------------------
function Badges({ summary }: { summary: ClubSummary }) {
  const earned = new Map<ClubBadgeType, { count: number; earnedAt: string | null }>();
  for (const b of summary.badges) {
    const prev = earned.get(b.type);
    earned.set(b.type, { count: (prev?.count ?? 0) + 1, earnedAt: prev?.earnedAt ?? b.earnedAt });
  }
  return (
    <section aria-labelledby="club-insignias">
      <h3 id="club-insignias" className="font-semibold flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-primary" /> Insignias
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {(Object.keys(CLUB_BADGES) as ClubBadgeType[]).map((type) => {
          const badge = CLUB_BADGES[type];
          const got = earned.get(type);
          return (
            <Card key={type} className={got ? "border-primary/30 bg-primary/5" : "opacity-60"}>
              <CardContent className="p-3 text-center">
                <div className={`text-3xl ${got ? "" : "grayscale"}`} aria-hidden="true">{badge.icon}</div>
                <p className="text-sm font-medium mt-1">{badge.label}{got && got.count > 1 ? ` ×${got.count}` : ""}</p>
                <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{got ? `Ganada ${timeAgo(got.earnedAt)}` : badge.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Journal({ onOpenChapter }: { onOpenChapter: OpenChapter }) {
  const { data: notes = [] } = useBibleNotes();
  const recent = [...(notes as any[])].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 10);
  return (
    <details className="group rounded-xl border bg-card">
      <summary className="cursor-pointer list-none p-4 flex items-center gap-2 font-semibold">
        <StickyNote className="w-5 h-5 text-primary" /> Mi diario espiritual
        <span className="text-xs font-normal text-muted-foreground">({notes.length} {notes.length === 1 ? "nota" : "notas"} privadas)</span>
        <ChevronRight className="w-4 h-4 ml-auto transition-transform group-open:rotate-90" />
      </summary>
      <div className="px-4 pb-4 space-y-2">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no tienes notas. En la Biblia, toca un versículo y elige «Nota»: solo tú las ves.
          </p>
        ) : (
          recent.map((note) => (
            <button
              key={note.id}
              onClick={() => onOpenChapter(note.book, note.chapter)}
              className="w-full text-left rounded-lg border p-3 hover:border-primary/50 transition-colors"
            >
              <span className="text-xs font-medium text-primary">{bibleBookLabel(note.book)} {note.chapter}:{note.verse}</span>
              <span className="text-xs text-muted-foreground"> · {timeAgo(note.createdAt)}</span>
              <p className="text-sm mt-1 line-clamp-3">{note.content}</p>
            </button>
          ))
        )}
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------

export function ClubTab({ onOpenChapter }: { onOpenChapter: OpenChapter }) {
  const { data: summary, isLoading, isError, refetch } = useClubSummary();
  const { data: whatsapp } = useWhatsappLink();
  const shareRef = useRef<HTMLDivElement | null>(null);
  const verseRef = useRef<HTMLDivElement | null>(null);

  const goTo = (section: "compartir" | "versiculo") =>
    (section === "compartir" ? shareRef : verseRef).current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }
  if (isError || !summary) {
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-3">
          <p className="text-muted-foreground">No se pudo cargar el club.</p>
          <Button variant="outline" onClick={() => refetch()}>Reintentar</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StreakHero summary={summary} onOpenChapter={onOpenChapter} />
      <DailyChallenges summary={summary} onOpenChapter={onOpenChapter} onGoTo={goTo} />
      <ClubChallenges summary={summary} onOpenChapter={onOpenChapter} />
      <div ref={verseRef} className="scroll-mt-24">
        <MemoryVerse summary={summary} onOpenChapter={onOpenChapter} />
      </div>
      <div ref={shareRef} className="scroll-mt-24">
        <Reflections defaultRef={summary.suggested} onOpenChapter={onOpenChapter} />
      </div>
      <Badges summary={summary} />
      <Journal onOpenChapter={onOpenChapter} />
      {whatsapp?.link && (
        <a
          href={whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-green-300/60 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 p-4 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors min-h-11"
          data-testid="link-club-whatsapp"
        >
          <SiWhatsapp className="w-6 h-6 text-green-600 shrink-0" />
          <span className="flex-1 text-sm">
            <strong className="text-green-700 dark:text-green-300">Grupo de WhatsApp del club</strong>
            <span className="block text-xs text-muted-foreground">Para animarse entre semana fuera de la web.</span>
          </span>
          <ChevronRight className="w-4 h-4 text-green-600" />
        </a>
      )}
    </div>
  );
}
