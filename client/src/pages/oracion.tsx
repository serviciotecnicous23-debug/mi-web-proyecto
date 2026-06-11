import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2, Pencil, ExternalLink, Video, Calendar, Users, CheckCircle, HelpCircle, XCircle, Bell, Clock, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiveStreamEmbed, isEmbeddableUrl } from "@/components/LiveStreamEmbed";
import LiveRoom from "@/components/LiveRoom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePrayerAttendees, useMyPrayerAttendance, useAttendPrayer, useCancelPrayerAttendance } from "@/hooks/use-users";

const createPrayerSchema = z.object({
  title: z.string().min(3, "Minimo 3 caracteres"),
  description: z.string().optional(),
  meetingUrl: z.string().url("URL invalida").optional().or(z.literal("")),
  meetingPlatform: z.string().default("zoom"),
  scheduledDate: z.string().optional(),
});

type PrayerActivity = {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  meetingUrl: string | null;
  meetingPlatform: string | null;
  scheduledDate: string | null;
  isActive: boolean;
  createdAt: string;
  user?: { displayName: string; username: string; avatarUrl: string | null };
};

export default function OracionPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editActivity, setEditActivity] = useState<PrayerActivity | null>(null);

  const { data: activities = [], isLoading } = useQuery<PrayerActivity[]>({
    queryKey: ["/api/prayer-activities"],
  });

  const form = useForm<z.infer<typeof createPrayerSchema>>({
    resolver: zodResolver(createPrayerSchema),
    defaultValues: { title: "", description: "", meetingUrl: "", meetingPlatform: "zoom", scheduledDate: "" },
  });

  const editForm = useForm<z.infer<typeof createPrayerSchema>>({
    resolver: zodResolver(createPrayerSchema),
    defaultValues: { title: "", description: "", meetingUrl: "", meetingPlatform: "zoom", scheduledDate: "" },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createPrayerSchema>) => {
      const body: any = { ...data };
      if (body.scheduledDate) {
        body.scheduledDate = new Date(body.scheduledDate).toISOString();
      } else {
        delete body.scheduledDate;
      }
      if (!body.meetingUrl) delete body.meetingUrl;
      if (!body.description) delete body.description;
      const res = await apiRequest("POST", "/api/prayer-activities", body);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-activities"] });
      toast({ title: "Actividad creada", description: "La actividad de oracion ha sido publicada." });
      form.reset();
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "No se pudo crear la actividad.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: z.infer<typeof createPrayerSchema> }) => {
      const body: any = { ...data };
      if (body.scheduledDate) {
        body.scheduledDate = new Date(body.scheduledDate).toISOString();
      } else {
        body.scheduledDate = null;
      }
      if (!body.meetingUrl) body.meetingUrl = null;
      if (!body.description) body.description = null;
      const res = await apiRequest("PATCH", `/api/prayer-activities/${id}`, body);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-activities"] });
      toast({ title: "Actividad actualizada", description: "La actividad ha sido editada exitosamente." });
      setEditActivity(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "No se pudo editar la actividad.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/prayer-activities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-activities"] });
      toast({ title: "Eliminada", description: "La actividad ha sido eliminada." });
    },
    onError: (error: Error) => {
      toast({ title: "Error al eliminar", description: error.message || "No se pudo eliminar la actividad.", variant: "destructive" });
    },
  });

  function getPlatformLabel(platform: string | null) {
    switch (platform) {
      case "zoom": return "Zoom";
      case "google_meet": return "Google Meet";
      case "youtube": return "YouTube Live";
      case "facebook": return "Facebook Live";
      default: return "Enlace";
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-oracion-title">Oracion</h1>
            <p className="text-muted-foreground mt-1">Actividades de oracion, reuniones y enlaces en vivo</p>
          </div>
          {user && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-prayer">
                  <Plus className="w-4 h-4 mr-1" /> Nueva Actividad
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Crear Actividad de Oracion</DialogTitle>
                  <DialogDescription>Comparte una actividad de oracion con la comunidad.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
                    <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titulo</FormLabel>
                        <FormControl><Input placeholder="Vigilia de oracion..." {...field} data-testid="input-prayer-title" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl><Textarea placeholder="Detalles de la actividad..." className="resize-none" {...field} data-testid="input-prayer-description" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="meetingPlatform" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plataforma</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger data-testid="select-prayer-platform"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="zoom">Zoom</SelectItem>
                            <SelectItem value="google_meet">Google Meet</SelectItem>
                            <SelectItem value="youtube">YouTube Live</SelectItem>
                            <SelectItem value="facebook">Facebook Live</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="meetingUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enlace de Reunion</FormLabel>
                        <FormControl><Input type="url" placeholder="https://zoom.us/j/..." {...field} data-testid="input-prayer-url" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="scheduledDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha y Hora</FormLabel>
                        <FormControl><Input type="datetime-local" {...field} data-testid="input-prayer-date" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <DialogFooter>
                      <DialogClose asChild><Button variant="outline" type="button">Cancelar</Button></DialogClose>
                      <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-prayer">
                        {createMutation.isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                        Publicar
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Sala en Vivo de Oracion */}
        {user && (
          <div className="mb-6">
            <LiveRoom
              context="prayer"
              contextId="main"
              roomTitle="Sala de Oracion en Vivo"
              canManage={user.role === "admin" || user.role === "maestro"}
              userName={user.displayName || user.username}
              userEmail={user.email}
              startLabel="Iniciar Sala de Oracion"
              joinLabel="Unirse a la Sala de Oracion"
              startDescription="Se creara una sala de video para la reunion de oracion. Todos los usuarios recibiran una notificacion."
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : activities.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No hay actividades de oracion</p>
              <p className="text-muted-foreground text-sm mt-1">Se la primera persona en crear una actividad.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {activities.map((activity) => (
              <PrayerActivityCard
                key={activity.id}
                activity={activity}
                user={user}
                deleteMutation={deleteMutation}
                getPlatformLabel={getPlatformLabel}
                onEdit={(a) => {
                  setEditActivity(a);
                  editForm.reset({
                    title: a.title,
                    description: a.description || "",
                    meetingUrl: a.meetingUrl || "",
                    meetingPlatform: a.meetingPlatform || "zoom",
                    scheduledDate: a.scheduledDate ? new Date(a.scheduledDate).toISOString().slice(0, 16) : "",
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Edit Activity Dialog */}
        <Dialog open={!!editActivity} onOpenChange={(open) => { if (!open) setEditActivity(null); }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Actividad de Oracion</DialogTitle>
              <DialogDescription>Modifica los datos de la actividad.</DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit((d) => editActivity && updateMutation.mutate({ id: editActivity.id, data: d }))} className="space-y-4">
                <FormField control={editForm.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl><Input placeholder="Vigilia de oracion..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={editForm.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl><Textarea placeholder="Detalles de la actividad..." className="resize-none" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={editForm.control} name="meetingPlatform" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="google_meet">Google Meet</SelectItem>
                        <SelectItem value="youtube">YouTube Live</SelectItem>
                        <SelectItem value="facebook">Facebook Live</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={editForm.control} name="meetingUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enlace de Reunion</FormLabel>
                    <FormControl><Input type="url" placeholder="https://zoom.us/j/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={editForm.control} name="scheduledDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha y Hora</FormLabel>
                    <FormControl><Input type="datetime-local" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setEditActivity(null)}>Cancelar</Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                    Guardar Cambios
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

function PrayerActivityCard({ activity, user, deleteMutation, getPlatformLabel, onEdit }: {
  activity: PrayerActivity;
  user: any;
  deleteMutation: any;
  getPlatformLabel: (p: string | null) => string;
  onEdit: (activity: PrayerActivity) => void;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const { data: attendeesData } = usePrayerAttendees(activity.id);
  const { data: myAttendance } = useMyPrayerAttendance(activity.id);
  const attendMutation = useAttendPrayer();
  const cancelMutation = useCancelPrayerAttendance();

  const count = attendeesData?.count || { confirmado: 0, tal_vez: 0 };
  const totalAttendees = (count.confirmado || 0) + (count.tal_vez || 0);
  const currentStatus = myAttendance?.status;

  const platformLabels: Record<string, string> = {
    zoom: "Zoom",
    google_meet: "Google Meet",
    youtube: "YouTube Live",
    facebook: "Facebook Live",
    otro: "Enlace",
  };

  return (
    <>
      <Card data-testid={`card-prayer-${activity.id}`}>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <CardTitle className="text-lg cursor-pointer hover:text-primary transition-colors" onClick={() => setDetailOpen(true)}>
                {activity.title}
              </CardTitle>
              {activity.isActive && <Badge variant="secondary">Activa</Badge>}
              {totalAttendees > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Users className="w-3 h-3" />
                  {totalAttendees} {totalAttendees === 1 ? "asistente" : "asistentes"}
                </Badge>
              )}
            </div>
            <CardDescription className="flex flex-wrap items-center gap-2">
              {activity.user && (
                <span className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    {activity.user.avatarUrl && <AvatarImage src={activity.user.avatarUrl} />}
                    <AvatarFallback className="text-[10px]">
                      {(activity.user.displayName || activity.user.username).slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {activity.user.displayName || activity.user.username}
                </span>
              )}
              {activity.scheduledDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activity.scheduledDate).toLocaleString("es")}
                </span>
              )}
            </CardDescription>
          </div>
          {user && (user.role === "admin" || user.id === activity.userId) && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(activity)}
                data-testid={`button-edit-prayer-${activity.id}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMutation.mutate(activity.id)}
                disabled={deleteMutation.isPending}
                data-testid={`button-delete-prayer-${activity.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        {(activity.description || activity.meetingUrl) && (
          <CardContent className="space-y-3">
            {activity.description && <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-2">{activity.description}</p>}
            {activity.meetingUrl && (
              <div className="space-y-3">
                <a href={activity.meetingUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" data-testid={`button-join-prayer-${activity.id}`}>
                    <Video className="w-4 h-4 mr-1" />
                    Unirse a {getPlatformLabel(activity.meetingPlatform)}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </a>
                {isEmbeddableUrl(activity.meetingUrl, activity.meetingPlatform) && (
                  <LiveStreamEmbed
                    url={activity.meetingUrl}
                    platformHint={activity.meetingPlatform}
                    title={activity.title}
                    compact
                  />
                )}
              </div>
            )}
          </CardContent>
        )}
        {user && (
          <CardFooter className="flex flex-col items-start gap-3 border-t pt-4">
            {/* Attendance count */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{count.confirmado || 0} {(count.confirmado || 0) === 1 ? "confirmado" : "confirmados"}</span>
            </div>
            {/* Attendance buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={currentStatus === "confirmado" ? "default" : "outline"}
                className="gap-1"
                onClick={() => attendMutation.mutate({ activityId: activity.id, status: "confirmado" })}
                disabled={attendMutation.isPending}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Asistiré
              </Button>
              <Button
                size="sm"
                variant={currentStatus === "tal_vez" ? "default" : "outline"}
                className="gap-1"
                onClick={() => attendMutation.mutate({ activityId: activity.id, status: "tal_vez" })}
                disabled={attendMutation.isPending}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Tal vez
              </Button>
              <Button
                size="sm"
                variant={currentStatus === "no_asistire" ? "destructive" : "outline"}
                className="gap-1"
                onClick={() => attendMutation.mutate({ activityId: activity.id, status: "no_asistire" })}
                disabled={attendMutation.isPending}
              >
                <XCircle className="w-3.5 h-3.5" />
                No asistiré
              </Button>
              {currentStatus && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-muted-foreground"
                  onClick={() => cancelMutation.mutate(activity.id)}
                  disabled={cancelMutation.isPending}
                >
                  Cancelar
                </Button>
              )}
            </div>
            {/* Reminder text */}
            {currentStatus === "confirmado" && (
              <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                <Bell className="h-3 w-3" />
                Recordatorio activado. Recibirás una notificación.
              </div>
            )}
            {/* View details button */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDetailOpen(true)} className="gap-1">
                <ExternalLink className="h-3.5 w-3.5" />
                Ver Detalles
              </Button>
              {activity.meetingUrl && (
                <Button
                  size="sm"
                  variant="default"
                  className="gap-1"
                  onClick={() => window.open(activity.meetingUrl!, "_blank")}
                >
                  <Video className="h-3.5 w-3.5" />
                  Unirse
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" data-testid={`dialog-prayer-detail-${activity.id}`}>
          <DialogHeader>
            <DialogTitle className="text-xl">{activity.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Date & Time */}
            {activity.scheduledDate && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {new Date(activity.scheduledDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(activity.scheduledDate).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </>
            )}

            {/* Meeting Link */}
            {activity.meetingUrl && (
              <div className="space-y-3">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Video className="h-4 w-4 text-primary" />
                    <span>{platformLabels[activity.meetingPlatform || ""] || "Enlace de Reunión"}</span>
                  </div>
                  <a
                    href={activity.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline break-all"
                  >
                    <Link2 className="h-3.5 w-3.5 flex-shrink-0" />
                    {activity.meetingUrl}
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                  <Button
                    size="sm"
                    className="w-full mt-2 gap-2"
                    onClick={() => window.open(activity.meetingUrl!, "_blank")}
                  >
                    <Video className="h-4 w-4" />
                    Unirse a la Reunión
                  </Button>
                </div>
                {isEmbeddableUrl(activity.meetingUrl, activity.meetingPlatform) && (
                  <LiveStreamEmbed
                    url={activity.meetingUrl}
                    platformHint={activity.meetingPlatform}
                    title={activity.title}
                  />
                )}
              </div>
            )}

            {/* Description */}
            {activity.description && (
              <div>
                <h4 className="text-sm font-medium mb-1">Descripción</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{activity.description}</p>
              </div>
            )}

            {/* RSVP Section */}
            {user && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Confirmar Asistencia
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>{count.confirmado || 0} {(count.confirmado || 0) === 1 ? "confirmado" : "confirmados"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={currentStatus === "confirmado" ? "default" : "outline"}
                    onClick={() => attendMutation.mutate({ activityId: activity.id, status: "confirmado" })}
                    disabled={attendMutation.isPending}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Asistiré
                  </Button>
                  <Button
                    size="sm"
                    variant={currentStatus === "tal_vez" ? "default" : "outline"}
                    onClick={() => attendMutation.mutate({ activityId: activity.id, status: "tal_vez" })}
                    disabled={attendMutation.isPending}
                    className="gap-1"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    Tal vez
                  </Button>
                  <Button
                    size="sm"
                    variant={currentStatus === "no_asistire" ? "destructive" : "outline"}
                    onClick={() => attendMutation.mutate({ activityId: activity.id, status: "no_asistire" })}
                    disabled={attendMutation.isPending}
                    className="gap-1"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    No asistiré
                  </Button>
                  {currentStatus && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => cancelMutation.mutate(activity.id)}
                      disabled={cancelMutation.isPending}
                      className="gap-1 text-muted-foreground"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
                {currentStatus === "confirmado" && (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 mt-2">
                    <Bell className="h-3 w-3" />
                    Recordatorio activado. Recibirás una notificación.
                  </div>
                )}
              </div>
            )}

            {/* Attendees list */}
            {attendeesData?.attendees && attendeesData.attendees.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Asistentes ({count.confirmado || 0} confirmados)
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {attendeesData.attendees.map((att: any) => (
                    <div key={att.id} className="flex items-center gap-2 text-sm">
                      {att.user?.avatarUrl ? (
                        <img src={att.user.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {(att.user?.displayName || att.user?.username || "?")[0].toUpperCase()}
                        </div>
                      )}
                      <span>{att.user?.displayName || att.user?.username}</span>
                      <Badge
                        variant={att.status === "confirmado" ? "default" : att.status === "tal_vez" ? "secondary" : "outline"}
                        className="ml-auto text-[10px]"
                      >
                        {att.status === "confirmado" ? "Confirmado" : att.status === "tal_vez" ? "Tal vez" : "No asistirá"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
