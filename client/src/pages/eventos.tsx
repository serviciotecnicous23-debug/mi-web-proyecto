import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, useEventRsvps, useMyEventRsvp, useRsvpEvent, useCancelRsvp } from "@/hooks/use-users";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Calendar, MapPin, Clock, Plus, Pencil, Trash2, Users, CheckCircle, HelpCircle, XCircle, ExternalLink, Video, Bell, Link2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveStreamEmbed, isEmbeddableUrl } from "@/components/LiveStreamEmbed";
import LiveRoom from "@/components/LiveRoom";
import type { Event } from "@shared/schema";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr) >= new Date();
}

function isPast(dateStr: string) {
  return new Date(dateStr) < new Date();
}

function toDatetimeLocal(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function monthName(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", { month: "long" });
}

function weekdayName(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", { weekday: "long" });
}

/* Cuenta regresiva en vivo hacia la fecha del evento */
function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days, hours, minutes };
}

const emptyForm = {
  title: "",
  description: "",
  eventDate: "",
  eventEndDate: "",
  location: "",
  meetingUrl: "",
  meetingPlatform: "",
};

export default function Eventos() {
  const { data: events, isLoading } = useEvents();
  const { user } = useAuth();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [detailEvent, setDetailEvent] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyForm);

  const upcoming = (events?.filter((e: Event) => isUpcoming(e.eventDate as any)) || []).sort(
    (a: Event, b: Event) => new Date(a.eventDate as any).getTime() - new Date(b.eventDate as any).getTime(),
  );
  const past = (events?.filter((e: Event) => isPast(e.eventDate as any)) || []).sort(
    (a: Event, b: Event) => new Date(b.eventDate as any).getTime() - new Date(a.eventDate as any).getTime(),
  );

  const featured = upcoming[0];
  const restUpcoming = upcoming.slice(1);

  const isAdmin = user?.role === "admin";

  function canManage(event: Event) {
    if (!user) return false;
    return isAdmin || event.createdBy === user.id;
  }

  function handleCreateOpen() {
    setForm(emptyForm);
    setCreateOpen(true);
  }

  function handleEditOpen(event: Event) {
    setForm({
      title: event.title,
      description: event.description,
      eventDate: toDatetimeLocal(event.eventDate as any),
      eventEndDate: toDatetimeLocal(event.eventEndDate as any),
      location: event.location,
      meetingUrl: (event as any).meetingUrl || "",
      meetingPlatform: (event as any).meetingPlatform || "",
    });
    setEditingEvent(event);
    setEditOpen(true);
  }

  function handleCreate() {
    if (!form.title || !form.description || !form.eventDate || !form.location) return;
    const eventDateISO = new Date(form.eventDate).toISOString();
    const eventEndDateISO = form.eventEndDate ? new Date(form.eventEndDate).toISOString() : null;
    createEvent.mutate(
      {
        title: form.title,
        description: form.description,
        eventDate: eventDateISO,
        eventEndDate: eventEndDateISO,
        location: form.location,
        meetingUrl: form.meetingUrl || null,
        meetingPlatform: form.meetingPlatform || null,
        isPublished: true,
      },
      {
        onSuccess: () => {
          setCreateOpen(false);
          setForm(emptyForm);
        },
      },
    );
  }

  function handleUpdate() {
    if (!editingEvent || !form.title || !form.description || !form.eventDate || !form.location) return;
    const eventDateISO = new Date(form.eventDate).toISOString();
    const eventEndDateISO = form.eventEndDate ? new Date(form.eventEndDate).toISOString() : null;
    updateEvent.mutate(
      {
        id: editingEvent.id,
        updates: {
          title: form.title,
          description: form.description,
          eventDate: eventDateISO,
          eventEndDate: eventEndDateISO,
          location: form.location,
          meetingUrl: form.meetingUrl || null,
          meetingPlatform: form.meetingPlatform || null,
        },
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingEvent(null);
          setForm(emptyForm);
        },
      },
    );
  }

  function handleDelete(event: Event) {
    if (!confirm("¿Está seguro de que desea eliminar este evento?")) return;
    deleteEvent.mutate(event.id);
  }

  const marqueeText = upcoming.length
    ? upcoming.map((e: Event) => `${new Date(e.eventDate as any).getDate()} ${monthName(e.eventDate as any)} — ${e.title}`).join("  ·  ")
    : "Pronto anunciaremos nuevos eventos";

  return (
    <Layout>
      {/* ═══ PORTADA DE CARTELERA ══════════════════════════════════ */}
      <section className="relative overflow-hidden section-aurora py-16 md:py-24">
        <p
          className="heading-display pointer-events-none absolute -left-4 bottom-0 select-none text-[clamp(8rem,26vw,24rem)] leading-none text-foreground/[0.04]"
          aria-hidden
        >
          {new Date().getFullYear()}
        </p>
        <div className="relative mx-auto max-w-7xl px-4">
          <span className="glass-pill mb-6 inline-block text-xs">Calendario del ministerio</span>
          <h1 className="heading-display text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.88]" data-testid="text-eventos-title">
            Carte<span className="fire-text">lera</span>
            <span className="accent-serif">.</span>
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="accent-serif max-w-xl text-lg text-muted-foreground md:text-xl">
              Encuentros, retiros, vigilias y campañas del ministerio.
              Ven y sé parte de lo que Dios está haciendo.
            </p>
            {user && (
              <Button className="fire-btn-primary h-12 shrink-0 px-6" onClick={handleCreateOpen} data-testid="button-create-event">
                <Plus className="mr-2 h-4 w-4" />
                Publicar evento
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Cinta de anuncios */}
      <div className="marquee-strip border-y bg-card/60 py-3">
        <div className="marquee-track font-display text-sm font-bold uppercase tracking-[0.22em] text-primary">
          <span className="mx-8">{marqueeText}</span>
          <span className="mx-8">{marqueeText}</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:pt-14">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-md" />
            ))}
          </div>
        ) : !events?.length ? (
          <div className="hud-frame rounded-md py-20 text-center">
            <p className="heading-display text-5xl text-foreground/15 md:text-7xl">Próximamente</p>
            <p className="accent-serif mx-auto mt-4 max-w-md text-muted-foreground">
              Pronto anunciaremos nuevos eventos. Mantente atento a nuestras redes sociales.
            </p>
          </div>
        ) : (
          <>
            {/* ═══ PÓSTER PRINCIPAL ══════════════════════════════ */}
            {featured && (
              <FeaturedPoster
                event={featured}
                canManage={canManage(featured)}
                onEdit={() => handleEditOpen(featured)}
                onDelete={() => handleDelete(featured)}
                onViewDetails={() => setDetailEvent(featured)}
                user={user}
              />
            )}

            {/* ═══ MURO DE PÓSTERS ═══════════════════════════════ */}
            {restUpcoming.length > 0 && (
              <div className="mt-14">
                <div className="mb-7 flex items-end justify-between gap-4">
                  <h2 className="heading-display text-3xl md:text-5xl" data-testid="text-upcoming-title">
                    También <span className="fire-text">viene</span>
                  </h2>
                  <p className="data-label hidden md:block">
                    {restUpcoming.length} {restUpcoming.length === 1 ? "evento más" : "eventos más"}
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {restUpcoming.map((event: Event) => (
                    <PosterCard
                      key={event.id}
                      event={event}
                      canManage={canManage(event)}
                      onEdit={() => handleEditOpen(event)}
                      onDelete={() => handleDelete(event)}
                      onViewDetails={() => setDetailEvent(event)}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ═══ SALA EN VIVO ══════════════════════════════════ */}
            {user && (
              <div className="mt-14">
                <div className="hud-frame rounded-md p-5 md:p-7">
                  <p className="data-label mb-2">Transmisión de eventos</p>
                  <h2 className="heading-display mb-5 text-2xl md:text-3xl">Sala de evento en vivo</h2>
                  <LiveRoom
                    context="event"
                    contextId="main"
                    roomTitle="Sala de Evento en Vivo"
                    canManage={user.role === "admin" || user.role === "maestro"}
                    userName={user.displayName || user.username}
                    userEmail={user.email}
                    startLabel="Iniciar transmisión de evento"
                    joinLabel="Unirse al evento en vivo"
                    startDescription="Se creará una sala de video para transmitir el evento. Todos los usuarios recibirán una notificación automática."
                  />
                </div>
              </div>
            )}

            {/* ═══ ARCHIVO ═══════════════════════════════════════ */}
            {past.length > 0 && (
              <div className="mt-16">
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="heading-display text-2xl text-muted-foreground md:text-3xl" data-testid="text-past-title">
                    Archivo
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                  <p className="data-label">{past.length} {past.length === 1 ? "evento" : "eventos"}</p>
                </div>
                <div className="divide-y rounded-md border bg-card/40">
                  {past.map((event: Event) => (
                    <ArchiveRow
                      key={event.id}
                      event={event}
                      canManage={canManage(event)}
                      onEdit={() => handleEditOpen(event)}
                      onDelete={() => handleDelete(event)}
                      onViewDetails={() => setDetailEvent(event)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <EventFormDialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open) createEvent.reset();
        }}
        title="Crear evento"
        form={form}
        setForm={setForm}
        onSubmit={handleCreate}
        isPending={createEvent.isPending}
        errorMessage={createEvent.error?.message || null}
        submitLabel="Crear"
      />

      <EventFormDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) {
            setEditingEvent(null);
            updateEvent.reset();
          }
        }}
        title="Editar evento"
        form={form}
        setForm={setForm}
        onSubmit={handleUpdate}
        isPending={updateEvent.isPending}
        errorMessage={updateEvent.error?.message || null}
        submitLabel="Guardar"
      />

      {detailEvent && (
        <EventDetailDialog
          event={detailEvent}
          open={!!detailEvent}
          onOpenChange={(open) => { if (!open) setDetailEvent(null); }}
          user={user}
        />
      )}
    </Layout>
  );
}

/* ── Póster principal: el siguiente gran encuentro ───────────────── */
function FeaturedPoster({
  event,
  canManage,
  onEdit,
  onDelete,
  onViewDetails,
  user,
}: {
  event: Event;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  user: any;
}) {
  const countdown = useCountdown(event.eventDate as any);
  const meetingUrl = (event as any).meetingUrl;
  const day = new Date(event.eventDate as any).getDate();

  return (
    <div
      className="relative overflow-hidden rounded-md border border-orange-400/25 bg-[#0a0405] text-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
      data-testid={`card-event-${event.id}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,91,0,0.3),transparent_38%),radial-gradient(circle_at_88%_85%,rgba(255,197,77,0.12),transparent_34%)]" aria-hidden />
      <div className="absolute inset-0 hero-grid-bg opacity-20" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-1.5 fire-gradient" aria-hidden />

      <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
        {/* Fecha gigante de cartel */}
        <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-0">
          <p className="heading-display fire-text text-[clamp(5.5rem,14vw,12rem)] leading-[0.85]">{day}</p>
          <div>
            <p className="accent-serif text-2xl capitalize text-orange-100 md:text-3xl">{monthName(event.eventDate as any)}</p>
            <p className="data-label mt-1 capitalize">{weekdayName(event.eventDate as any)} · {formatTime(event.eventDate as any)}</p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-orange-300/30 bg-orange-500/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-orange-100">
              Próximo gran encuentro
            </span>
            {meetingUrl && (
              <Badge variant="secondary" className="gap-1">
                <Video className="h-3 w-3" />
                Virtual
              </Badge>
            )}
            {canManage && (
              <span className="ml-auto flex gap-1">
                <Button size="icon" variant="ghost" className="text-orange-100 hover:bg-white/10" onClick={onEdit} data-testid={`button-edit-event-${event.id}`}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-orange-100 hover:bg-white/10" onClick={onDelete} data-testid={`button-delete-event-${event.id}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </span>
            )}
          </div>

          <h3
            className="heading-display mt-4 cursor-pointer break-words text-[clamp(2rem,6vw,4.6rem)] leading-[0.95] transition hover:opacity-90 [overflow-wrap:anywhere]"
            onClick={onViewDetails}
            data-testid={`text-event-title-${event.id}`}
          >
            {event.title}
          </h3>

          <p className="accent-serif mt-4 max-w-2xl whitespace-pre-wrap text-base text-orange-50/80 md:text-lg" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {event.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <p className="flex items-center gap-2 text-sm text-orange-50/80">
              <MapPin className="h-4 w-4 text-orange-300" />
              {event.location}
            </p>
            <p className="flex items-center gap-2 text-sm capitalize text-orange-50/80">
              <Calendar className="h-4 w-4 text-orange-300" />
              {formatDate(event.eventDate as any)}
            </p>
            {event.eventEndDate && (
              <p className="flex items-center gap-2 text-sm text-orange-50/80">
                <Clock className="h-4 w-4 text-orange-300" />
                Hasta las {formatTime(event.eventEndDate as any)}
              </p>
            )}
          </div>

          {/* Cuenta regresiva */}
          <div className="mt-6 flex gap-3">
            {[
              { value: countdown.days, label: countdown.days === 1 ? "día" : "días" },
              { value: countdown.hours, label: "horas" },
              { value: countdown.minutes, label: "min" },
            ].map((item) => (
              <div key={item.label} className="min-w-[4.6rem] rounded-md border border-orange-300/20 bg-black/40 px-4 py-3 text-center backdrop-blur">
                <p className="font-display text-3xl font-black leading-none md:text-4xl">{item.value}</p>
                <p className="data-label mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="fire-btn-primary h-11 px-6" onClick={onViewDetails}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver detalles
            </Button>
            {meetingUrl && (
              <Button
                variant="outline"
                className="h-11 border-orange-300/30 bg-white/10 px-6 text-white hover:bg-white/20"
                onClick={() => window.open(meetingUrl, "_blank")}
              >
                <Video className="mr-2 h-4 w-4" />
                Unirse
              </Button>
            )}
          </div>

          {user && (
            <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4">
              <EventRsvpButton event={event} user={user} light />
            </div>
          )}

          {meetingUrl && isEmbeddableUrl(meetingUrl, (event as any).meetingPlatform) && (
            <div className="mt-5">
              <LiveStreamEmbed
                url={meetingUrl}
                platformHint={(event as any).meetingPlatform}
                title={event.title}
                compact
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Póster vertical del muro ────────────────────────────────────── */
function PosterCard({
  event,
  canManage,
  onEdit,
  onDelete,
  onViewDetails,
  user,
}: {
  event: Event;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  user: any;
}) {
  const meetingUrl = (event as any).meetingUrl;
  const day = new Date(event.eventDate as any).getDate();

  return (
    <div
      className="hud-frame group relative flex flex-col rounded-md bg-card/60 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(249,115,22,0.14)] md:p-6"
      data-testid={`card-event-${event.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="heading-display fire-text text-6xl leading-none md:text-7xl">{day}</p>
          <p className="accent-serif mt-1 text-lg capitalize text-muted-foreground">
            {monthName(event.eventDate as any)} · {formatTime(event.eventDate as any)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {meetingUrl && (
            <Badge variant="secondary" className="gap-1">
              <Video className="h-3 w-3" />
              Virtual
            </Badge>
          )}
          {canManage && (
            <>
              <Button size="icon" variant="ghost" onClick={onEdit} data-testid={`button-edit-event-${event.id}`}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={onDelete} data-testid={`button-delete-event-${event.id}`}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <h3
        className="mt-4 cursor-pointer font-display text-xl font-bold leading-snug transition-colors hover:text-primary"
        onClick={onViewDetails}
        data-testid={`text-event-title-${event.id}`}
      >
        {event.title}
      </h3>
      <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-sm text-muted-foreground">{event.description}</p>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="line-clamp-1">{event.location}</span>
      </p>

      {user && (
        <div className="mt-3 border-t pt-3">
          <EventRsvpButton event={event} user={user} />
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <Button size="sm" variant="outline" onClick={onViewDetails} className="gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          Ver detalles
        </Button>
        {meetingUrl && (
          <Button size="sm" variant="default" className="gap-1" onClick={() => window.open(meetingUrl, "_blank")}>
            <Video className="h-3.5 w-3.5" />
            Unirse
          </Button>
        )}
      </div>
    </div>
  );
}

/* ── Fila del archivo de eventos pasados ─────────────────────────── */
function ArchiveRow({
  event,
  canManage,
  onEdit,
  onDelete,
  onViewDetails,
}: {
  event: Event;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}) {
  const d = new Date(event.eventDate as any);
  return (
    <div className="flex items-center gap-4 px-4 py-4 opacity-70 transition hover:opacity-100 md:px-6" data-testid={`card-event-${event.id}`}>
      <p className="accent-serif w-24 shrink-0 text-lg capitalize text-muted-foreground md:w-28">
        {d.getDate()} {d.toLocaleDateString("es-ES", { month: "short" })} {d.getFullYear()}
      </p>
      <div className="min-w-0 flex-1">
        <p
          className="cursor-pointer truncate font-display font-bold transition-colors hover:text-primary"
          onClick={onViewDetails}
          data-testid={`text-event-title-${event.id}`}
        >
          {event.title}
        </p>
        <p className="truncate text-sm text-muted-foreground">{event.location}</p>
      </div>
      <Button size="sm" variant="ghost" onClick={onViewDetails} className="hidden gap-1 sm:flex">
        <ExternalLink className="h-3.5 w-3.5" />
        Ver
      </Button>
      {canManage && (
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={onEdit} data-testid={`button-edit-event-${event.id}`}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete} data-testid={`button-delete-event-${event.id}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function EventFormDialog({
  open,
  onOpenChange,
  title,
  form,
  setForm,
  onSubmit,
  isPending,
  errorMessage,
  submitLabel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  form: typeof emptyForm;
  setForm: (form: typeof emptyForm) => void;
  onSubmit: () => void;
  isPending: boolean;
  errorMessage: string | null;
  submitLabel: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-event-form" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="event-title">Título</Label>
            <Input
              id="event-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Nombre del evento"
              data-testid="input-event-title"
            />
          </div>
          <div>
            <Label htmlFor="event-description">Descripción</Label>
            <Textarea
              id="event-description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descripción del evento"
              data-testid="input-event-description"
            />
          </div>
          <div>
            <Label htmlFor="event-date">Fecha y hora</Label>
            <Input
              id="event-date"
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              data-testid="input-event-date"
            />
          </div>
          <div>
            <Label htmlFor="event-end-date">Fecha y hora de fin (opcional)</Label>
            <Input
              id="event-end-date"
              type="datetime-local"
              value={form.eventEndDate}
              onChange={(e) => setForm({ ...form, eventEndDate: e.target.value })}
              data-testid="input-event-end-date"
            />
          </div>
          <div>
            <Label htmlFor="event-location">Ubicación</Label>
            <Input
              id="event-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lugar del evento"
              data-testid="input-event-location"
            />
          </div>
          <div>
            <Label htmlFor="event-meeting-url">Enlace de reunión (Zoom, Google Meet, etc.) — opcional</Label>
            <Input
              id="event-meeting-url"
              value={form.meetingUrl}
              onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })}
              placeholder="https://zoom.us/j/..."
              data-testid="input-event-meeting-url"
            />
          </div>
          <div>
            <Label htmlFor="event-meeting-platform">Plataforma</Label>
            <select
              id="event-meeting-platform"
              value={form.meetingPlatform}
              onChange={(e) => setForm({ ...form, meetingPlatform: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              data-testid="select-event-meeting-platform"
            >
              <option value="">Selecciona una plataforma</option>
              <option value="zoom">Zoom</option>
              <option value="google_meet">Google Meet</option>
              <option value="youtube">YouTube Live</option>
              <option value="facebook">Facebook Live</option>
              <option value="teams">Microsoft Teams</option>
              <option value="presencial">Presencial</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        {errorMessage && (
          <div className="rounded-md bg-destructive/15 border border-destructive/30 px-4 py-3 text-sm text-destructive" data-testid="event-form-error">
            {errorMessage}
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={isPending || !form.title || !form.description || !form.eventDate || !form.location}
            data-testid="button-submit-event"
          >
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EventRsvpButton({ event, user, light = false }: { event: Event; user: any; light?: boolean }) {
  const rsvpEvent = useRsvpEvent();
  const cancelRsvp = useCancelRsvp();
  const { data: myRsvp } = useMyEventRsvp(event.id);
  const { data: rsvpData } = useEventRsvps(event.id);

  if (!user) return null;

  const isPastEvent = new Date(event.eventDate as any) < new Date();
  if (isPastEvent) return null;

  const attendeeCount = rsvpData?.count || 0;
  const currentStatus = myRsvp?.status;

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-2 text-sm ${light ? "text-orange-50/80" : "text-muted-foreground"}`}>
        <Users className="h-3.5 w-3.5" />
        <span>{attendeeCount} {attendeeCount === 1 ? "confirmado" : "confirmados"}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={currentStatus === "confirmado" ? "default" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "confirmado" })}
          disabled={rsvpEvent.isPending}
          className={`gap-1 ${light && currentStatus !== "confirmado" ? "border-orange-300/30 bg-white/10 text-white hover:bg-white/20" : ""}`}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Asistiré
        </Button>
        <Button
          size="sm"
          variant={currentStatus === "tal_vez" ? "default" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "tal_vez" })}
          disabled={rsvpEvent.isPending}
          className={`gap-1 ${light && currentStatus !== "tal_vez" ? "border-orange-300/30 bg-white/10 text-white hover:bg-white/20" : ""}`}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Tal vez
        </Button>
        <Button
          size="sm"
          variant={currentStatus === "no_asistire" ? "destructive" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "no_asistire" })}
          disabled={rsvpEvent.isPending}
          className={`gap-1 ${light && currentStatus !== "no_asistire" ? "border-orange-300/30 bg-white/10 text-white hover:bg-white/20" : ""}`}
        >
          <XCircle className="h-3.5 w-3.5" />
          No asistiré
        </Button>
        {currentStatus && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => cancelRsvp.mutate(event.id)}
            disabled={cancelRsvp.isPending}
            className={`gap-1 ${light ? "text-orange-50/70 hover:bg-white/10" : "text-muted-foreground"}`}
          >
            Cancelar
          </Button>
        )}
      </div>
      {currentStatus === "confirmado" && (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <Bell className="h-3 w-3" />
          Recordatorio activado. Recibirás una notificación.
        </div>
      )}
    </div>
  );
}

function EventDetailDialog({
  event,
  open,
  onOpenChange,
  user,
}: {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}) {
  const { data: rsvpData } = useEventRsvps(event.id);
  const meetingUrl = (event as any).meetingUrl;
  const meetingPlatform = (event as any).meetingPlatform;

  const platformLabels: Record<string, string> = {
    zoom: "Zoom",
    google_meet: "Google Meet",
    youtube: "YouTube Live",
    facebook: "Facebook Live",
    teams: "Microsoft Teams",
    presencial: "Presencial",
    otro: "Enlace",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" data-testid="dialog-event-detail">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium capitalize">{formatDate(event.eventDate as any)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {formatTime(event.eventDate as any)}
              {event.eventEndDate && ` - ${formatTime(event.eventEndDate as any)}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>

          {meetingUrl && (
            <div className="space-y-3">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Video className="h-4 w-4 text-primary" />
                  <span>{platformLabels[meetingPlatform] || "Enlace de reunión"}</span>
                </div>
                <a
                  href={meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline break-all"
                >
                  <Link2 className="h-3.5 w-3.5 flex-shrink-0" />
                  {meetingUrl}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
                <Button
                  size="sm"
                  className="w-full mt-2 gap-2"
                  onClick={() => window.open(meetingUrl, "_blank")}
                >
                  <Video className="h-4 w-4" />
                  Unirse a la reunión
                </Button>
              </div>
              {isEmbeddableUrl(meetingUrl, meetingPlatform) && (
                <LiveStreamEmbed
                  url={meetingUrl}
                  platformHint={meetingPlatform}
                  title={event.title}
                />
              )}
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Descripción</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          </div>

          {user && new Date(event.eventDate as any) >= new Date() && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Confirmar asistencia
              </h4>
              <EventRsvpButton event={event} user={user} />
            </div>
          )}

          {rsvpData?.rsvps && rsvpData.rsvps.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Asistentes ({rsvpData.count} confirmados)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {rsvpData.rsvps.map((rsvp: any) => (
                  <div key={rsvp.id} className="flex items-center gap-2 text-sm">
                    {rsvp.user?.avatarUrl ? (
                      <img src={rsvp.user.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {(rsvp.user?.displayName || rsvp.user?.username || "?")[0].toUpperCase()}
                      </div>
                    )}
                    <span>{rsvp.user?.displayName || rsvp.user?.username}</span>
                    <Badge variant={rsvp.status === "confirmado" ? "default" : rsvp.status === "tal_vez" ? "secondary" : "outline"} className="ml-auto text-[10px]">
                      {rsvp.status === "confirmado" ? "Confirmado" : rsvp.status === "tal_vez" ? "Tal vez" : "No asistirá"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
