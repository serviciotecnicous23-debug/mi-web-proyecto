import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  useCourse, useCourseMaterials, useCourseSessions, useMyEnrollments,
  useCourseAnnouncements, useCourseSchedule,
  useCreateCourseSession, useUpdateCourseSession, useDeleteCourseSession,
  useCreateCourseMaterial, useUpdateCourseMaterial, useDeleteCourseMaterial,
  useCreateCourseAnnouncement, useUpdateCourseAnnouncement, useDeleteCourseAnnouncement,
  useCreateCourseScheduleEntry, useUpdateCourseScheduleEntry, useDeleteCourseScheduleEntry,
  useCourseEnrollments,
} from "@/hooks/use-users";
import { Layout } from "@/components/layout";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Loader2, BookOpen, Calendar, Clock, Video, FileText, Link as LinkIcon,
  Music, Presentation, ExternalLink, ArrowLeft, Users, Bell, MapPin,
  CheckCircle2, GraduationCap, Timer, Megaphone, CalendarDays, Plus,
  Trash2, Edit3, Save, X, AlertCircle, Eye, MoreVertical, Pin, PinOff,
  UserCheck, Send,
} from "lucide-react";
import {
  COURSE_CATEGORIES, MATERIAL_TYPES, DAYS_OF_WEEK, MEETING_PLATFORMS,
  ENROLLMENT_STATUSES,
} from "@shared/schema";
import type { CourseMaterial, CourseSession, CourseScheduleEntry, CourseAnnouncement } from "@shared/schema";
import LiveClassroom from "@/components/LiveClassroom";

const materialIcons: Record<string, any> = {
  documento: FileText,
  video: Video,
  enlace: LinkIcon,
  audio: Music,
  presentacion: Presentation,
};

export default function AulaVirtual({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: course, isLoading } = useCourse(courseId);
  const { data: materials } = useCourseMaterials(courseId);
  const { data: sessions } = useCourseSessions(courseId);
  const { data: myEnrollments } = useMyEnrollments();
  const { data: announcements } = useCourseAnnouncements(courseId);
  const { data: schedule } = useCourseSchedule(courseId);
  const { data: enrolledStudents } = useCourseEnrollments(courseId);

  // Mutations
  const createSession = useCreateCourseSession();
  const updateSession = useUpdateCourseSession();
  const deleteSession = useDeleteCourseSession();
  const createMaterial = useCreateCourseMaterial();
  const updateMaterial = useUpdateCourseMaterial();
  const deleteMaterial = useDeleteCourseMaterial();
  const createAnnouncement = useCreateCourseAnnouncement();
  const updateAnnouncement = useUpdateCourseAnnouncement();
  const deleteAnnouncement = useDeleteCourseAnnouncement();
  const createScheduleEntry = useCreateCourseScheduleEntry();
  const updateScheduleEntry = useUpdateCourseScheduleEntry();
  const deleteScheduleEntry = useDeleteCourseScheduleEntry();

  if (authLoading) {
    return <Layout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }
  if (!user) { setLocation("/login"); return null; }

  const myEnrollment = myEnrollments?.find((e: any) => e.courseId === courseId);
  const isEnrolled = myEnrollment && (myEnrollment.status === "aprobado" || myEnrollment.status === "completado");
  const isTeacher = course?.teacherId === user?.id;
  const isAdmin = user?.role === "admin";
  const canManage = isTeacher || isAdmin;
  const hasAccess = isEnrolled || isTeacher || isAdmin;

  if (isLoading) {
    return <Layout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }

  if (!course) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Curso no encontrado</h2>
          <Link href="/mis-capacitaciones">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> Volver</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!hasAccess) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Acceso Restringido</h2>
          <p className="text-muted-foreground mb-4">Debes estar inscrito y aprobado en este curso para acceder al aula virtual.</p>
          <Link href={`/capacitaciones/${courseId}`}>
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> Ver Detalles del Curso</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const now = new Date();
  const upcomingSessions = sessions?.filter((s: CourseSession) => !s.isCompleted && new Date(s.sessionDate) >= now)
    .sort((a: CourseSession, b: CourseSession) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()) || [];
  const pastSessions = sessions?.filter((s: CourseSession) => s.isCompleted || new Date(s.sessionDate) < now)
    .sort((a: CourseSession, b: CourseSession) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()) || [];
  const completedSessions = sessions?.filter((s: CourseSession) => s.isCompleted)?.length || 0;
  const totalSessions = sessions?.length || 0;
  const progress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const nextSession = upcomingSessions[0];
  const todayDay = now.getDay();
  const todaySchedule = schedule?.filter((s: CourseScheduleEntry) => s.dayOfWeek === todayDay && s.isActive) || [];
  const approvedStudents = enrolledStudents?.filter((e: any) => e.status === "aprobado" || e.status === "completado")?.length || 0;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Link href="/mis-capacitaciones">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <Badge variant="secondary">
                  {COURSE_CATEGORIES[course.category as keyof typeof COURSE_CATEGORIES] || course.category}
                </Badge>
                {canManage && <Badge variant="outline" className="text-xs border-primary text-primary">{isAdmin ? "Admin" : "Maestro"}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">Aula Virtual {canManage && "· Modo Gestion"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canManage && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                <span>{approvedStudents} estudiante(s)</span>
              </div>
            )}
            {isTeacher && (
              <Link href="/maestro">
                <Button variant="outline" size="sm">Panel del Maestro</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress}%</p>
                  <p className="text-xs text-muted-foreground">Progreso del Curso</p>
                </div>
              </div>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{completedSessions} de {totalSessions} sesiones completadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{nextSession ? nextSession.title : "Sin sesiones"}</p>
                  <p className="text-xs text-muted-foreground">
                    {nextSession
                      ? new Date(nextSession.sessionDate).toLocaleDateString("es", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                      : "No hay proximas clases"}
                  </p>
                </div>
              </div>
              {nextSession?.meetingUrl && (
                <a href={nextSession.meetingUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block">
                  <Button className="w-full" size="sm"><Video className="w-4 h-4 mr-1" /> Unirse a Clase</Button>
                </a>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  {isTeacher ? (
                    <>
                      <p className="text-sm font-semibold">Maestro</p>
                      <p className="text-xs text-muted-foreground">Eres el maestro de este curso</p>
                    </>
                  ) : isAdmin ? (
                    <>
                      <p className="text-sm font-semibold">Administrador</p>
                      <p className="text-xs text-muted-foreground">Control total del curso</p>
                    </>
                  ) : myEnrollment ? (
                    <>
                      <Badge variant={myEnrollment.status === "aprobado" ? "default" : "secondary"}>
                        {ENROLLMENT_STATUSES[myEnrollment.status as keyof typeof ENROLLMENT_STATUSES]}
                      </Badge>
                      {myEnrollment.grade && (
                        <p className="text-xs mt-1">Calificacion: <span className="font-semibold">{myEnrollment.grade}</span></p>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Classes Alert */}
        {todaySchedule.length > 0 && (
          <Card className="mb-6 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-primary" />
                <p className="font-semibold text-sm">Clases de Hoy</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {todaySchedule.map((s: CourseScheduleEntry) => (
                  <div key={s.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s.startTime} - {s.endTime}</span>
                    {s.description && <span className="text-xs text-muted-foreground">({s.description})</span>}
                    {s.meetingUrl && (
                      <a href={s.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline"><Video className="w-3 h-3 mr-1" /> Unirse</Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Classroom Section */}
        <div className="mb-6">
          <LiveClassroom
            courseId={courseId}
            courseTitle={course.title}
            canManage={canManage}
            userName={user?.displayName || user?.username || "Estudiante"}
            userEmail={user?.email || ""}
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="sessions"><Calendar className="w-4 h-4 mr-1" /> Sesiones</TabsTrigger>
            <TabsTrigger value="schedule"><CalendarDays className="w-4 h-4 mr-1" /> Horario</TabsTrigger>
            <TabsTrigger value="materials"><FileText className="w-4 h-4 mr-1" /> Materiales</TabsTrigger>
            <TabsTrigger value="announcements">
              <Megaphone className="w-4 h-4 mr-1" /> Anuncios
              {announcements && announcements.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs h-5 w-5 p-0 flex items-center justify-center rounded-full">{announcements.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ===== SESSIONS TAB ===== */}
          <TabsContent value="sessions">
            <div className="space-y-4">
              {canManage && (
                <CreateSessionDialog courseId={courseId} onSubmit={createSession.mutate} isPending={createSession.isPending} />
              )}

              {upcomingSessions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" /> Proximas Clases
                    </CardTitle>
                    <CardDescription>{upcomingSessions.length} sesion(es) programada(s)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((s: CourseSession) => (
                      <SessionCard
                        key={s.id}
                        session={s}
                        isUpcoming
                        canManage={canManage}
                        courseId={courseId}
                        onUpdate={updateSession.mutate}
                        onDelete={deleteSession.mutate}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {pastSessions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Clases Anteriores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pastSessions.map((s: CourseSession) => (
                      <SessionCard
                        key={s.id}
                        session={s}
                        isUpcoming={false}
                        canManage={canManage}
                        courseId={courseId}
                        onUpdate={updateSession.mutate}
                        onDelete={deleteSession.mutate}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {!sessions?.length && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No hay sesiones programadas aun.</p>
                    {canManage && <p className="text-xs text-muted-foreground mt-1">Usa el boton "Nueva Sesion" para crear la primera clase.</p>}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ===== SCHEDULE TAB ===== */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" /> Horario Semanal
                    </CardTitle>
                    <CardDescription>Horario regular de clases para este curso</CardDescription>
                  </div>
                  {canManage && (
                    <CreateScheduleDialog courseId={courseId} onSubmit={createScheduleEntry.mutate} isPending={createScheduleEntry.isPending} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {schedule && schedule.length > 0 ? (
                  <div className="space-y-2">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const dayEntries = schedule.filter((s: CourseScheduleEntry) => s.dayOfWeek === day && s.isActive);
                      if (dayEntries.length === 0) return null;
                      return (
                        <div key={day} className={`flex flex-wrap items-start gap-3 p-3 rounded-md ${day === todayDay ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'}`}>
                          <div className="w-24 shrink-0 pt-1">
                            <p className={`font-semibold text-sm ${day === todayDay ? 'text-primary' : ''}`}>
                              {DAYS_OF_WEEK[day as keyof typeof DAYS_OF_WEEK]}
                            </p>
                            {day === todayDay && <Badge variant="default" className="text-xs mt-1">Hoy</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-2 flex-1">
                            {dayEntries.map((entry: CourseScheduleEntry) => (
                              <ScheduleEntryCard
                                key={entry.id}
                                entry={entry}
                                courseId={courseId}
                                canManage={canManage}
                                onUpdate={updateScheduleEntry.mutate}
                                onDelete={deleteScheduleEntry.mutate}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No hay horario semanal configurado para este curso.</p>
                    {canManage && <p className="text-xs text-muted-foreground mt-1">Usa el boton "Agregar Horario" para configurar las clases semanales.</p>}
                    {!canManage && <p className="text-xs text-muted-foreground mt-1">El maestro aun no ha configurado el horario.</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== MATERIALS TAB ===== */}
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" /> Materiales y Recursos
                    </CardTitle>
                    <CardDescription>{materials?.length || 0} recurso(s) disponible(s)</CardDescription>
                  </div>
                  {canManage && (
                    <CreateMaterialDialog courseId={courseId} onSubmit={createMaterial.mutate} isPending={createMaterial.isPending} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {materials && materials.length > 0 ? (
                  <div className="space-y-2">
                    {materials.map((m: CourseMaterial) => (
                      <MaterialCard
                        key={m.id}
                        material={m}
                        courseId={courseId}
                        canManage={canManage}
                        onUpdate={updateMaterial.mutate}
                        onDelete={deleteMaterial.mutate}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No hay materiales disponibles aun.</p>
                    {canManage && <p className="text-xs text-muted-foreground mt-1">Agrega documentos, videos, enlaces y mas para tus estudiantes.</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== ANNOUNCEMENTS TAB ===== */}
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-primary" /> Anuncios del Curso
                    </CardTitle>
                    <CardDescription>Comunicaciones y avisos importantes</CardDescription>
                  </div>
                  {canManage && (
                    <CreateAnnouncementDialog courseId={courseId} onSubmit={createAnnouncement.mutate} isPending={createAnnouncement.isPending} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {announcements && announcements.length > 0 ? (
                  <div className="space-y-4">
                    {announcements.map((a: CourseAnnouncement & { author: { username: string; displayName: string | null } }) => (
                      <AnnouncementCard
                        key={a.id}
                        announcement={a}
                        courseId={courseId}
                        canManage={canManage}
                        onUpdate={updateAnnouncement.mutate}
                        onDelete={deleteAnnouncement.mutate}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No hay anuncios publicados.</p>
                    {canManage && <p className="text-xs text-muted-foreground mt-1">Publica un anuncio para comunicarte con tus estudiantes.</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

// ========== SESSION CARD ==========
function SessionCard({
  session, isUpcoming, canManage, courseId, onUpdate, onDelete,
}: {
  session: CourseSession; isUpcoming: boolean; canManage: boolean; courseId: number;
  onUpdate: (data: any) => void; onDelete: (data: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(session.title);
  const [description, setDescription] = useState(session.description || "");
  const [meetingUrl, setMeetingUrl] = useState(session.meetingUrl || "");
  const [meetingPlatform, setMeetingPlatform] = useState(session.meetingPlatform || "zoom");
  const [duration, setDuration] = useState(session.duration?.toString() || "60");
  const [sessionDate, setSessionDate] = useState(
    new Date(session.sessionDate).toISOString().slice(0, 16)
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const sessionDateObj = new Date(session.sessionDate);
  const now = new Date();
  const isHappeningNow = isUpcoming && sessionDateObj <= now && session.duration
    ? now <= new Date(sessionDateObj.getTime() + session.duration * 60000)
    : false;
  const timeUntil = isUpcoming ? getTimeUntil(sessionDateObj) : null;

  const handleSave = () => {
    onUpdate({
      id: session.id,
      courseId,
      updates: {
        title, description: description || undefined,
        meetingUrl: meetingUrl || undefined,
        meetingPlatform,
        duration: parseInt(duration) || 60,
        sessionDate,
      },
    });
    setEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate({ id: session.id, courseId, updates: { isCompleted: !session.isCompleted } });
  };

  if (editing && canManage) {
    return (
      <div className="p-4 rounded-md border-2 border-primary/30 bg-primary/5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary flex items-center gap-1"><Edit3 className="w-4 h-4" /> Editando Sesion</p>
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="w-4 h-4" /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Titulo</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre de la sesion" />
          </div>
          <div>
            <Label className="text-xs">Fecha y Hora</Label>
            <Input type="datetime-local" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Duracion (min)</Label>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" max="480" />
          </div>
          <div>
            <Label className="text-xs">Plataforma</Label>
            <Select value={meetingPlatform} onValueChange={setMeetingPlatform}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(MEETING_PLATFORMS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">URL de Reunion</Label>
            <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://zoom.us/j/..." />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Descripción</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción de la sesion..." rows={2} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Guardar</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-md ${isHappeningNow ? 'bg-primary/10 border border-primary/30' : session.isCompleted ? 'bg-muted/30' : 'bg-muted/50'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="font-semibold text-sm">{session.title}</p>
          {isHappeningNow && <Badge variant="default">En Vivo</Badge>}
          {session.isCompleted && <Badge variant="secondary">Completada</Badge>}
        </div>
        <p className="text-xs text-muted-foreground">
          {sessionDateObj.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
        {session.duration && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Timer className="w-3 h-3" /> Duracion: {session.duration} min
          </p>
        )}
        {session.description && <p className="text-xs text-muted-foreground mt-1">{session.description}</p>}
        {isUpcoming && timeUntil && !isHappeningNow && (
          <p className="text-xs text-primary mt-1 font-medium">{timeUntil}</p>
        )}
        {session.meetingPlatform && (
          <Badge variant="outline" className="text-xs mt-1">
            {MEETING_PLATFORMS[session.meetingPlatform as keyof typeof MEETING_PLATFORMS] || session.meetingPlatform}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        {session.meetingUrl && (isUpcoming || isHappeningNow) && (
          <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant={isHappeningNow ? "default" : "outline"}>
              <Video className="w-4 h-4 mr-1" /> {isHappeningNow ? "Unirse Ahora" : "Enlace"}
            </Button>
          </a>
        )}
        {canManage && (
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={handleToggleComplete} title={session.isCompleted ? "Marcar como pendiente" : "Marcar como completada"}>
              <CheckCircle2 className={`w-4 h-4 ${session.isCompleted ? 'text-green-500' : 'text-muted-foreground'}`} />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}><Edit3 className="w-4 h-4" /></Button>
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="destructive" onClick={() => { onDelete({ id: session.id, courseId }); setConfirmDelete(false); }}>
                  Si, eliminar
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>No</Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(true)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== CREATE SESSION DIALOG ==========
function CreateSessionDialog({ courseId, onSubmit, isPending }: { courseId: number; onSubmit: (data: any) => void; isPending: boolean }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("zoom");

  const handleSubmit = () => {
    if (!title.trim() || !sessionDate) return;
    onSubmit({
      courseId, title: title.trim(),
      description: description.trim() || undefined,
      sessionDate,
      duration: parseInt(duration) || 60,
      meetingUrl: meetingUrl.trim() || undefined,
      meetingPlatform,
    });
    setTitle(""); setDescription(""); setSessionDate(""); setDuration("60"); setMeetingUrl(""); setMeetingPlatform("zoom");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nueva Sesion</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Nueva Sesion</DialogTitle>
          <DialogDescription>Programa una nueva clase para el curso</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Titulo *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Clase 1 - Introduccion" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Fecha y Hora *</Label>
              <Input type="datetime-local" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
            </div>
            <div>
              <Label>Duracion (min)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" max="480" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Plataforma</Label>
              <Select value={meetingPlatform} onValueChange={setMeetingPlatform}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(MEETING_PLATFORMS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>URL de Reunion</Label>
              <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://zoom.us/j/..." />
            </div>
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción de la sesion..." rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !sessionDate || isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
            Crear Sesion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ========== SCHEDULE ENTRY CARD ==========
function ScheduleEntryCard({
  entry, courseId, canManage, onUpdate, onDelete,
}: {
  entry: CourseScheduleEntry; courseId: number; canManage: boolean;
  onUpdate: (data: any) => void; onDelete: (data: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [startTime, setStartTime] = useState(entry.startTime);
  const [endTime, setEndTime] = useState(entry.endTime);
  const [specificDate, setSpecificDate] = useState(entry.specificDate || "");
  const [description, setDescription] = useState(entry.description || "");
  const [meetingUrl, setMeetingUrl] = useState(entry.meetingUrl || "");
  const [meetingPlatform, setMeetingPlatform] = useState(entry.meetingPlatform || "zoom");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    onUpdate({
      id: entry.id, courseId,
      updates: {
        startTime, endTime,
        specificDate: specificDate || undefined,
        description: description || undefined,
        meetingUrl: meetingUrl || undefined,
        meetingPlatform,
      },
    });
    setEditing(false);
  };

  if (editing && canManage) {
    return (
      <div className="p-3 rounded-md border-2 border-primary/30 bg-primary/5 space-y-2 w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-primary"><Edit3 className="w-3 h-3 inline mr-1" />Editando Horario</p>
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="w-3 h-3" /></Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Hora Inicio</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Hora Fin</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div>
          <Label className="text-xs">Fecha Especifica</Label>
          <Input type="date" value={specificDate} onChange={(e) => setSpecificDate(e.target.value)} className="h-8" />
        </div>
        <div>
          <Label className="text-xs">Plataforma</Label>
          <Select value={meetingPlatform} onValueChange={setMeetingPlatform}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(MEETING_PLATFORMS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">URL de Reunion</Label>
          <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://..." className="h-8" />
        </div>
        <div>
          <Label className="text-xs">Descripción</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción..." className="h-8" />
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="h-7 text-xs" onClick={handleSave}><Save className="w-3 h-3 mr-1" /> Guardar</Button>
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-background group">
      <Clock className="w-4 h-4 text-primary shrink-0" />
      <span className="text-sm font-medium">{entry.startTime} - {entry.endTime}</span>
      {entry.specificDate && <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">{entry.specificDate}</span>}
      {entry.description && <span className="text-xs text-muted-foreground">- {entry.description}</span>}
      {entry.meetingUrl && (
        <a href={entry.meetingUrl} target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline" className="h-7 text-xs">
            <Video className="w-3 h-3 mr-1" />
            {MEETING_PLATFORMS[entry.meetingPlatform as keyof typeof MEETING_PLATFORMS] || "Enlace"}
          </Button>
        </a>
      )}
      {canManage && (
        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(true)}><Edit3 className="w-3 h-3" /></Button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => { onDelete({ id: entry.id, courseId }); setConfirmDelete(false); }}>Si</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setConfirmDelete(false)}>No</Button>
            </div>
          ) : (
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setConfirmDelete(true)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
          )}
        </div>
      )}
    </div>
  );
}

// ========== CREATE SCHEDULE DIALOG ==========
function CreateScheduleDialog({ courseId, onSubmit, isPending }: { courseId: number; onSubmit: (data: any) => void; isPending: boolean }) {
  const [open, setOpen] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState("1");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [specificDate, setSpecificDate] = useState("");
  const [description, setDescription] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("zoom");

  const handleSubmit = () => {
    onSubmit({
      courseId,
      dayOfWeek: parseInt(dayOfWeek),
      startTime, endTime,
      specificDate: specificDate || undefined,
      description: description.trim() || undefined,
      meetingUrl: meetingUrl.trim() || undefined,
      meetingPlatform,
    });
    setDayOfWeek("1"); setStartTime("09:00"); setEndTime("10:00"); setSpecificDate(""); setDescription(""); setMeetingUrl(""); setMeetingPlatform("zoom");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" /> Agregar Horario</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Horario Semanal</DialogTitle>
          <DialogDescription>Configura un horario recurrente de clase</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Dia de la Semana *</Label>
            <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(DAYS_OF_WEEK).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Fecha Especifica</Label>
            <Input type="date" value={specificDate} onChange={(e) => setSpecificDate(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Opcional: fecha exacta para este horario</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Hora Inicio *</Label>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
              <Label>Hora Fin *</Label>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Plataforma</Label>
              <Select value={meetingPlatform} onValueChange={setMeetingPlatform}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(MEETING_PLATFORMS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>URL de Reunion</Label>
              <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div>
            <Label>Descripción</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Clase principal, Taller practico..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ========== MATERIAL CARD ==========
function MaterialCard({
  material, courseId, canManage, onUpdate, onDelete,
}: {
  material: CourseMaterial; courseId: number; canManage: boolean;
  onUpdate: (data: any) => void; onDelete: (data: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(material.title);
  const [description, setDescription] = useState(material.description || "");
  const [fileUrl, setFileUrl] = useState(material.fileUrl || "");
  const [fileDataBase64, setFileDataBase64] = useState<string | null>(material.fileData || null);
  const [uploadMode, setUploadMode] = useState<"enlace" | "archivo">("enlace");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(material.fileName || "");
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(material.fileSize || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [materialType, setMaterialType] = useState(material.materialType);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const Icon = materialIcons[material.materialType] || FileText;

  const handleSave = () => {
    onUpdate({
      id: material.id, courseId,
      updates: {
        title, description: description || undefined,
        fileUrl: uploadMode === "enlace" ? fileUrl || undefined : fileUrl,
        fileName: uploadMode === "archivo" ? uploadedFileName : undefined,
        fileSize: uploadMode === "archivo" ? uploadedFileSize : undefined,
        fileData: uploadMode === "archivo" ? fileDataBase64 : undefined,
        materialType,
      },
    });
    setEditing(false);
  };

  if (editing && canManage) {
    return (
      <div className="p-4 rounded-md border-2 border-primary/30 bg-primary/5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary flex items-center gap-1"><Edit3 className="w-4 h-4" /> Editando Material</p>
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="w-4 h-4" /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Titulo</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo del material" />
          </div>
          <div>
            <Label className="text-xs">Tipo</Label>
            <Select value={materialType} onValueChange={setMaterialType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(MATERIAL_TYPES).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">URL del Recurso</Label>
            <Input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Descripción</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del material..." rows={2} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Guardar</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/50 group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm">{material.title}</p>
          {material.description && <p className="text-xs text-muted-foreground truncate">{material.description}</p>}
          <Badge variant="outline" className="text-xs mt-1">
            {MATERIAL_TYPES[material.materialType as keyof typeof MATERIAL_TYPES] || material.materialType}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {(material.fileData || material.fileUrl) && (
          material.fileData ? (
            <Button size="sm" variant="outline" onClick={() => {
              const link = document.createElement('a');
              link.href = material.fileData!;
              link.download = material.fileName || 'archivo';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}><ExternalLink className="w-4 h-4 mr-1" /> {material.fileName || "Descargar"}</Button>
          ) : (
            <a href={material.fileUrl!} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline"><ExternalLink className="w-4 h-4 mr-1" /> {material.fileName || "Abrir"}</Button>
            </a>
          )
        )}
        {canManage && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}><Edit3 className="w-4 h-4" /></Button>
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="destructive" onClick={() => { onDelete({ id: material.id, courseId }); setConfirmDelete(false); }}>Si</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>No</Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(true)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== CREATE MATERIAL DIALOG ==========
function CreateMaterialDialog({ courseId, onSubmit, isPending }: { courseId: number; onSubmit: (data: any) => void; isPending: boolean }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileDataBase64, setFileDataBase64] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<"enlace" | "archivo">("enlace");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [materialType, setMaterialType] = useState("documento");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      courseId, title: title.trim(),
      description: description.trim() || undefined,
      fileUrl: fileUrl ? (uploadMode === "enlace" ? fileUrl.trim() : fileUrl) : undefined,
      fileName: uploadedFileName || undefined,
      fileSize: uploadedFileSize || undefined,
      fileData: fileDataBase64 || undefined,
      materialType,
    });
    setTitle(""); setDescription(""); setFileUrl(""); setFileDataBase64(null);
    setUploadMode("enlace"); setUploadedFileName(""); setUploadedFileSize(null);
    setMaterialType("documento");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Agregar Material</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar Material</DialogTitle>
          <DialogDescription>Agrega un recurso para tus estudiantes</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Titulo *</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre del material" />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={materialType} onValueChange={setMaterialType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(MATERIAL_TYPES).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Modo de subida</Label>
            <Select value={uploadMode} onValueChange={v => setUploadMode(v as "enlace"|"archivo")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="enlace">Usar enlace</SelectItem>
                <SelectItem value="archivo">Subir archivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {uploadMode === "enlace" ? (
            <div>
              <Label>URL del Recurso</Label>
              <Input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://drive.google.com/... o enlace directo" />
            </div>
          ) : (
            <div>
              <Label>Archivo</Label>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (f.size > 20 * 1024 * 1024) {
                    toast({ title: "Archivo muy grande", description: "20MB max.", variant: "destructive" });
                    return;
                  }
                  setUploadingFile(true);
                  try {
                    const formData = new FormData();
                    formData.append("file", f);
                    const res = await fetch("/api/upload/library-file", { method: "POST", body: formData, credentials: "include" });
                    if (!res.ok) throw new Error("Error al subir archivo");
                    const data = await res.json();
                    setFileDataBase64(data.fileData || null);
                    setFileUrl(data.fileData ? "uploaded" : data.fileUrl);
                    setUploadedFileName(f.name);
                    setUploadedFileSize(f.size);
                    toast({ title: "Archivo subido", description: f.name });
                  } catch (err: any) {
                    toast({ title: "Error", description: err.message, variant: "destructive" });
                  } finally {
                    setUploadingFile(false);
                  }
                }}
              />
              {uploadingFile && <p className="text-xs text-muted-foreground">Cargando...</p>}
              {fileUrl && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    {uploadedFileName || fileUrl}
                  </a>
                  <Button size="icon" variant="ghost" onClick={() => {
                    setFileUrl(""); setFileDataBase64(null); setUploadedFileName(""); setUploadedFileSize(null);
                  }} title="Eliminar adjunto">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          )}
          <div>
            <Label>Descripción</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción breve del material..." rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ========== ANNOUNCEMENT CARD ==========
function AnnouncementCard({
  announcement, courseId, canManage, onUpdate, onDelete,
}: {
  announcement: CourseAnnouncement & { author: { username: string; displayName: string | null } };
  courseId: number; canManage: boolean;
  onUpdate: (data: any) => void; onDelete: (data: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(announcement.title);
  const [content, setContent] = useState(announcement.content);
  const [editFileUrl, setEditFileUrl] = useState(announcement.fileUrl || "");
  const [editFileName, setEditFileName] = useState(announcement.fileName || "");
  const [editFileSize, setEditFileSize] = useState<number | null>(announcement.fileSize || null);
  const [editFileData, setEditFileData] = useState<string | null>(announcement.fileData || null);
  const [editUploadingFile, setEditUploadingFile] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    onUpdate({
      id: announcement.id, courseId,
      updates: { title, content,
        fileUrl: editFileUrl || undefined,
        fileName: editFileName || undefined,
        fileSize: editFileSize || undefined,
        fileData: editFileData || undefined,
      },
    });
    setEditing(false);
  };

  const handleTogglePin = () => {
    onUpdate({
      id: announcement.id, courseId,
      updates: { isPinned: !announcement.isPinned },
    });
  };

  if (editing && canManage) {
    return (
      <div className="p-4 rounded-md border-2 border-primary/30 bg-primary/5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary flex items-center gap-1"><Edit3 className="w-4 h-4" /> Editando Anuncio</p>
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="w-4 h-4" /></Button>
        </div>
        <div>
          <Label className="text-xs">Titulo</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label className="text-xs">Contenido</Label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
        </div>
        <div>
          <Label className="text-xs">Adjuntar archivo</Label>
          <Input
            type="file"
            ref={editFileInputRef}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 20 * 1024 * 1024) {
                toast({ title: "Archivo muy grande", description: "Tamaño máximo 20MB", variant: "destructive" });
                return;
              }
              setEditUploadingFile(true);
              try {
                const formData = new FormData();
                formData.append("file", f);
                const res = await fetch("/api/upload/library-file", { method: "POST", body: formData, credentials: "include" });
                if (!res.ok) throw new Error("Error al subir archivo");
                const data = await res.json();
                setEditFileData(data.fileData || null);
                setEditFileUrl(data.fileData ? "uploaded" : data.fileUrl);
                setEditFileName(f.name);
                setEditFileSize(f.size);
                toast({ title: "Archivo subido", description: f.name });
              } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
              } finally {
                setEditUploadingFile(false);
              }
            }}
          />
          {editUploadingFile && <p className="text-xs text-muted-foreground">Cargando...</p>}
        </div>
        {editFileUrl && (
          <p className="text-sm mt-1">
            <a href={editFileUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {editFileName || editFileUrl}
            </a>
          </p>
        )}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Guardar</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-md ${announcement.isPinned ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'} group`}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {announcement.isPinned && <MapPin className="w-4 h-4 text-primary shrink-0" />}
          <h3 className="font-semibold text-sm">{announcement.title}</h3>
          {announcement.isPinned && <Badge variant="secondary" className="text-xs">Fijado</Badge>}
        </div>
        {canManage && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleTogglePin} title={announcement.isPinned ? "Desfijar" : "Fijar"}>
              {announcement.isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            </Button>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(true)}><Edit3 className="w-3.5 h-3.5" /></Button>
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => { onDelete({ id: announcement.id, courseId }); setConfirmDelete(false); }}>Si</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setConfirmDelete(false)}>No</Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setConfirmDelete(true)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
            )}
          </div>
        )}
      </div>
      <p className="text-sm whitespace-pre-wrap mb-3">{announcement.content}</p>
      {(announcement.fileData || announcement.fileUrl) && (
        <p className="mt-2">
          {announcement.fileData ? (
            <button className="underline text-sm text-primary" onClick={() => {
              const link = document.createElement('a');
              link.href = announcement.fileData!;
              link.download = announcement.fileName || 'archivo';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              {announcement.fileName || "Descargar adjunto"}
            </button>
          ) : (
            <a href={announcement.fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              {announcement.fileName || announcement.fileUrl}
            </a>
          )}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium">{announcement.author.displayName || announcement.author.username}</span>
        <span>·</span>
        <span>{announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}</span>
      </div>
    </div>
  );
}

// ========== CREATE ANNOUNCEMENT DIALOG ==========
function CreateAnnouncementDialog({ courseId, onSubmit, isPending }: { courseId: number; onSubmit: (data: any) => void; isPending: boolean }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileDataBase64, setFileDataBase64] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSubmit({
      courseId, title: title.trim(),
      content: content.trim(),
      isPinned,
      fileUrl: fileUrl || undefined,
      fileName: uploadedFileName || undefined,
      fileSize: uploadedFileSize || undefined,
      fileData: fileDataBase64 || undefined,
    });
    setTitle(""); setContent(""); setIsPinned(false);
    setFileUrl(""); setFileDataBase64(null); setUploadedFileName(""); setUploadedFileSize(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nuevo Anuncio</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Publicar Anuncio</DialogTitle>
          <DialogDescription>Comunica algo importante a tus estudiantes</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Titulo *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo del anuncio" />
          </div>
          <div>
            <Label>Contenido *</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el contenido del anuncio..." rows={4} />
          </div>
          <div>
            <Label>Adjuntar archivo</Label>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 20 * 1024 * 1024) {
                  toast({ title: "Archivo muy grande", description: "Tamaño máximo 20MB", variant: "destructive" });
                  return;
                }
                setUploadingFile(true);
                try {
                  const formData = new FormData();
                  formData.append("file", f);
                  const res = await fetch("/api/upload/library-file", { method: "POST", body: formData, credentials: "include" });
                  if (!res.ok) throw new Error("Error al subir archivo");
                  const data = await res.json();
                  setFileDataBase64(data.fileData || null);
                  setFileUrl(data.fileData ? "uploaded" : data.fileUrl);
                  setUploadedFileName(f.name);
                  setUploadedFileSize(f.size);
                  toast({ title: "Archivo subido", description: f.name });
                } catch (err: any) {
                  toast({ title: "Error", description: err.message, variant: "destructive" });
                } finally {
                  setUploadingFile(false);
                }
              }}
            />
            {uploadingFile && <p className="text-xs text-muted-foreground">Cargando...</p>}
          </div>
          {fileUrl && (
            <p className="text-sm mt-1">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {uploadedFileName || fileUrl}
              </a>
            </p>
          )}
          <div className="flex items-center gap-3">
            <Switch checked={isPinned} onCheckedChange={setIsPinned} id="pin-switch" />
            <Label htmlFor="pin-switch" className="text-sm cursor-pointer">Fijar anuncio (aparece primero)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !content.trim() || isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Send className="w-4 h-4 mr-1" />}
            Publicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ========== UTILITY ==========
function getTimeUntil(date: Date): string | null {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `En ${days} dia(s) y ${hours} hora(s)`;
  if (hours > 0) return `En ${hours} hora(s) y ${minutes} minuto(s)`;
  return `En ${minutes} minuto(s)`;
}
