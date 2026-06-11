import { useState } from "react";
import { Layout } from "@/components/layout";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, useEventRsvps, useMyEventRsvp, useRsvpEvent, useCancelRsvp } from "@/hooks/use-users";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
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
import { Loader2, Calendar, MapPin, Clock, Plus, Pencil, Trash2, Users, CheckCircle, HelpCircle, XCircle, ExternalLink, Video, Bell, BellOff, Link2 } from "lucide-react";
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

  const upcoming = events?.filter((e: Event) => isUpcoming(e.eventDate as any)) || [];
  const past = events?.filter((e: Event) => isPast(e.eventDate as any)) || [];

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
    // Convert datetime-local value to ISO string for the server
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
    if (!confirm("Esta seguro que desea eliminar este evento?")) return;
    deleteEvent.mutate(event.id);
  }

  return (
    <Layout>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 fire-gradient opacity-10 dark:opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-primary font-medium mb-2">Calendario del Ministerio</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-eventos-title">
            Eventos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Encuentros, retiros, vigilias y actividades del ministerio. Ven y se parte de lo que Dios esta haciendo.
          </p>
          {user && (
            <Button className="mt-6" onClick={handleCreateOpen} data-testid="button-create-event">
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
            </Button>
          )}
        </div>
      </section>

      {/* Sala en Vivo para Eventos */}
      {user && (
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <LiveRoom
            context="event"
            contextId="main"
            roomTitle="Sala de Evento en Vivo"
            canManage={user.role === "admin" || user.role === "maestro"}
            userName={user.displayName || user.username}
            userEmail={user.email}
            startLabel="Iniciar Transmision de Evento"
            joinLabel="Unirse al Evento en Vivo"
            startDescription="Se creara una sala de video para transmitir el evento. Todos los usuarios recibiran una notificacion automatica."
          />
        </section>
      )}

      <section className="max-w-4xl mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-4 pt-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-24 rounded-md shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : !events?.length ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos programados</h3>
              <p className="text-muted-foreground">
                Pronto anunciaremos nuevos eventos. Mantente atento a nuestras redes sociales.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" data-testid="text-upcoming-title">
                  <Calendar className="h-5 w-5 text-primary" />
                  Proximos Eventos
                </h2>
                <div className="space-y-4">
                  {upcoming.map((event: Event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="upcoming"
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

            {past.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" data-testid="text-past-title">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Eventos Pasados
                </h2>
                <div className="space-y-4">
                  {past.map((event: Event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="past"
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
          </>
        )}
      </section>

      <EventFormDialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open) createEvent.reset();
        }}
        title="Crear Evento"
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
        title="Editar Evento"
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
            <Label htmlFor="event-title">Titulo</Label>
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
            <Label htmlFor="event-date">Fecha y Hora</Label>
            <Input
              id="event-date"
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              data-testid="input-event-date"
            />
          </div>
          <div>
            <Label htmlFor="event-end-date">Fecha y Hora de Fin (opcional)</Label>
            <Input
              id="event-end-date"
              type="datetime-local"
              value={form.eventEndDate}
              onChange={(e) => setForm({ ...form, eventEndDate: e.target.value })}
              data-testid="input-event-end-date"
            />
          </div>
          <div>
            <Label htmlFor="event-location">Ubicacion</Label>
            <Input
              id="event-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lugar del evento"
              data-testid="input-event-location"
            />
          </div>
          <div>
            <Label htmlFor="event-meeting-url">Enlace de Reunion (Zoom, Google Meet, etc.) - opcional</Label>
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

function EventRsvpButton({ event, user }: { event: Event; user: any }) {
  const rsvpEvent = useRsvpEvent();
  const cancelRsvp = useCancelRsvp();
  const { data: myRsvp } = useMyEventRsvp(event.id);
  const { data: rsvpData } = useEventRsvps(event.id);

  if (!user) return null;

  const isPast = new Date(event.eventDate as any) < new Date();
  if (isPast) return null;

  const attendeeCount = rsvpData?.count || 0;
  const currentStatus = myRsvp?.status;

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-3.5 w-3.5" />
        <span>{attendeeCount} {attendeeCount === 1 ? "confirmado" : "confirmados"}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={currentStatus === "confirmado" ? "default" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "confirmado" })}
          disabled={rsvpEvent.isPending}
          className="gap-1"
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Asistire
        </Button>
        <Button
          size="sm"
          variant={currentStatus === "tal_vez" ? "default" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "tal_vez" })}
          disabled={rsvpEvent.isPending}
          className="gap-1"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Tal vez
        </Button>
        <Button
          size="sm"
          variant={currentStatus === "no_asistire" ? "destructive" : "outline"}
          onClick={() => rsvpEvent.mutate({ eventId: event.id, status: "no_asistire" })}
          disabled={rsvpEvent.isPending}
          className="gap-1"
        >
          <XCircle className="h-3.5 w-3.5" />
          No asistire
        </Button>
        {currentStatus && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => cancelRsvp.mutate(event.id)}
            disabled={cancelRsvp.isPending}
            className="gap-1 text-muted-foreground"
          >
            Cancelar
          </Button>
        )}
      </div>
      {currentStatus === "confirmado" && (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <Bell className="h-3 w-3" />
          Recordatorio activado. Recibiras una notificacion.
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
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatDate(event.eventDate as any)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {formatTime(event.eventDate as any)}
              {event.eventEndDate && ` - ${formatTime(event.eventEndDate as any)}`}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>

          {/* Meeting Link */}
          {meetingUrl && (
            <div className="space-y-3">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Video className="h-4 w-4 text-primary" />
                  <span>{platformLabels[meetingPlatform] || "Enlace de Reunion"}</span>
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
                  Unirse a la Reunion
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

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-1">Descripción</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          </div>

          {/* RSVP Section */}
          {user && new Date(event.eventDate as any) >= new Date() && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Confirmar Asistencia
              </h4>
              <EventRsvpButton event={event} user={user} />
            </div>
          )}

          {/* Attendees list */}
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
                      {rsvp.status === "confirmado" ? "Confirmado" : rsvp.status === "tal_vez" ? "Tal vez" : "No asistira"}
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

function EventCard({
  event,
  variant,
  canManage,
  onEdit,
  onDelete,
  onViewDetails,
  user,
}: {
  event: Event;
  variant: "upcoming" | "past";
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  user: any;
}) {
  const isPastEvent = variant === "past";
  const meetingUrl = (event as any).meetingUrl;

  return (
    <Card className={isPastEvent ? "opacity-70" : "hover:shadow-md transition-shadow"} data-testid={`card-event-${event.id}`}>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0 text-center md:text-left md:min-w-[100px]">
            <div className={`text-3xl font-bold ${isPastEvent ? "text-muted-foreground" : "fire-text"}`}>
              {new Date(event.eventDate as any).getDate()}
            </div>
            <div className="text-sm text-muted-foreground capitalize">
              {new Date(event.eventDate as any).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3
                className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                onClick={onViewDetails}
                data-testid={`text-event-title-${event.id}`}
              >
                {event.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {!isPastEvent && (
                  <Badge variant="default">Proximo</Badge>
                )}
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
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap line-clamp-2">{event.description}</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(event.eventDate as any)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTime(event.eventDate as any)}</span>
                {event.eventEndDate && (
                  <span> - {formatTime(event.eventEndDate as any)}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* RSVP for upcoming events */}
            {!isPastEvent && user && (
              <EventRsvpButton event={event} user={user} />
            )}

            {/* View Details Button */}
            <div className="mt-3">
              <Button size="sm" variant="outline" onClick={onViewDetails} className="gap-1">
                <ExternalLink className="h-3.5 w-3.5" />
                Ver Detalles
              </Button>
              {meetingUrl && !isPastEvent && (
                <Button
                  size="sm"
                  variant="default"
                  className="gap-1 ml-2"
                  onClick={() => window.open(meetingUrl, "_blank")}
                >
                  <Video className="h-3.5 w-3.5" />
                  Unirse
                </Button>
              )}
            </div>

            {/* Live Stream Embed for upcoming events with embeddable meeting URLs */}
            {meetingUrl && !isPastEvent && isEmbeddableUrl(meetingUrl, (event as any).meetingPlatform) && (
              <div className="mt-3">
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
      </CardContent>
    </Card>
  );
}
