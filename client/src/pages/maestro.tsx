import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  useCourses, useCourse, useCourseMaterials, useCourseSessions,
  useCourseEnrollments, useCreateCourseMaterial, useDeleteCourseMaterial,
  useCreateCourseSession, useUpdateCourseSession, useDeleteCourseSession,
  useUpdateEnrollment, useUpdateCourse, useCreateCourse,
  useCourseAnnouncements, useCreateCourseAnnouncement, useDeleteCourseAnnouncement,
  useCourseSchedule, useCreateCourseScheduleEntry, useDeleteCourseScheduleEntry,
} from "@/hooks/use-users";
import { Layout } from "@/components/layout";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2, BookOpen, Users, FileText, Calendar, Plus, Trash2, Save,
  CheckCircle2, XCircle, Video, GraduationCap, Pencil, Clock,
  Bell, Megaphone, CalendarDays, MapPin, Download,
} from "lucide-react";
import { MATERIAL_TYPES, ENROLLMENT_STATUSES, ENROLLMENT_MODES, COURSE_CATEGORIES, DAYS_OF_WEEK, MEETING_PLATFORMS } from "@shared/schema";
import type { Course, CourseMaterial, CourseSession, Enrollment, CourseAnnouncement, CourseScheduleEntry } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Inline Certificate Preview for Maestro panel
function MaestroCertificatePreview({ cert, containerId }: { cert: any; containerId: string }) {
  const studentName = cert.studentName || "Estudiante";
  const courseName = cert.courseName || "Curso";
  const teacherName = cert.teacherName || "";
  const grade = cert.grade;
  const issuedDate = cert.issuedAt
    ? format(new Date(cert.issuedAt), "dd 'de' MMMM 'de' yyyy", { locale: es })
    : format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });
  const code = cert.verificationCode || cert.certificateCode || "";

  return (
    <div id={containerId} style={{
      width: "700px", minHeight: "495px",
      background: "linear-gradient(135deg, #fffbeb 0%, #fff 50%, #fef3c7 100%)",
      border: "3px solid #b45309", borderRadius: "8px", position: "relative", overflow: "hidden",
      fontFamily: "'Georgia', 'Times New Roman', serif", boxSizing: "border-box",
    }}>
      <div style={{ position: "absolute", top: 8, left: 8, right: 8, bottom: 8, border: "2px solid #d97706", borderRadius: 4, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, bottom: 16, border: "1px solid #f59e0b", borderRadius: 2, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, padding: "32px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #dc2626, #991b1b)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" /></svg>
          </div>
        </div>
        <h1 style={{ fontSize: "1.4em", color: "#92400e", margin: "0 0 2px", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase" }}>Avivando el Fuego</h1>
        <p style={{ fontSize: "0.75em", color: "#a16207", margin: "0 0 4px", letterSpacing: 1 }}>Ministerio Evangel\u00edstico Internacional</p>
        <div style={{ width: 160, height: 1, background: "linear-gradient(to right, transparent, #d97706, transparent)", margin: "10px auto" }} />
        <h2 style={{ fontSize: "1.5em", color: "#78350f", margin: "6px 0", fontWeight: "normal", letterSpacing: 3, textTransform: "uppercase" }}>Certificado</h2>
        <p style={{ fontSize: "0.8em", color: "#92400e", margin: "2px 0 12px", fontStyle: "italic" }}>de Finalizaci\u00f3n</p>
        <p style={{ fontSize: "0.85em", color: "#78350f" }}>Se certifica que</p>
        <div style={{ margin: "8px 0", padding: "6px 0", borderBottom: "2px solid #d97706" }}>
          <p style={{ fontSize: "1.7em", color: "#1e3a5f", fontStyle: "italic", margin: 0, fontWeight: "bold" }}>{studentName}</p>
        </div>
        <p style={{ fontSize: "0.85em", color: "#78350f", margin: "10px 0 4px" }}>ha completado satisfactoriamente el curso</p>
        <p style={{ fontSize: "1.3em", color: "#b45309", fontWeight: "bold", margin: "4px 0 10px" }}>\u00ab{courseName}\u00bb</p>
        {grade && <p style={{ fontSize: "0.85em", color: "#78350f", margin: "4px 0" }}>Calificaci\u00f3n: <strong style={{ color: "#b45309" }}>{grade}</strong></p>}
        <p style={{ fontSize: "0.75em", color: "#92400e", margin: "6px 0 14px" }}>Otorgado el {issuedDate}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 16 }}>
          {teacherName && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 160, borderTop: "1px solid #92400e", margin: "0 auto", paddingTop: 4 }}>
                <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a5f", fontSize: "0.85em" }}>{teacherName}</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.65em", color: "#92400e" }}>Instructor</p>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 160, borderTop: "1px solid #92400e", margin: "0 auto", paddingTop: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a5f", fontSize: "0.85em" }}>Avivando el Fuego</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.65em", color: "#92400e" }}>Ministerio</p>
            </div>
          </div>
        </div>
        {code && (
          <div style={{ marginTop: 12, padding: "4px 12px", background: "rgba(180,83,9,0.08)", borderRadius: 4, display: "inline-block" }}>
            <p style={{ fontSize: "0.6em", color: "#92400e", margin: 0 }}>C\u00f3digo: <strong>{code}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MaestroPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  if (authLoading) {
    return <Layout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }
  if (!user || (user.role !== "obrero" && user.role !== "admin")) {
    setLocation("/");
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2" data-testid="text-maestro-title">
            <GraduationCap className="w-7 h-7 text-primary" /> Panel del Maestro
          </h1>
          <p className="text-muted-foreground text-sm">Gestiona tus clases, materiales y estudiantes</p>
        </div>

        {!selectedCourseId ? (
          <CourseList userId={user.id} onSelect={setSelectedCourseId} />
        ) : (
          <CourseManager courseId={selectedCourseId} onBack={() => setSelectedCourseId(null)} />
        )}
      </div>
    </Layout>
  );
}

function CourseList({ userId, onSelect }: { userId: number; onSelect: (id: number) => void }) {
  const { data: courses, isLoading, isError, error } = useCourses({ teacher: userId });
  const { toast } = useToast();

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }, [isError, error, toast]);
  const createCourse = useCreateCourse();
  const [createDialog, setCreateDialog] = useState(false);
  const [createForm, setCreateForm] = useState({ title: "", description: "", category: "general", maxStudents: "" });

  function handleCreateCourse() {
    if (!createForm.title.trim() || !createForm.description.trim()) return;
    createCourse.mutate({
      title: createForm.title.trim(),
      description: createForm.description.trim(),
      category: createForm.category,
      teacherId: userId,
      maxStudents: createForm.maxStudents ? parseInt(createForm.maxStudents) : undefined,
    }, {
      onSuccess: () => {
        setCreateDialog(false);
        setCreateForm({ title: "", description: "", category: "general", maxStudents: "" });
      },
    });
  }

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold" data-testid="text-my-courses-heading">Mis Cursos</h2>
        <Button size="sm" onClick={() => setCreateDialog(true)} data-testid="button-create-course">
          <Plus className="w-4 h-4 mr-1" /> Crear Curso
        </Button>
      </div>

      {!courses?.length ? (
        <Card><CardContent className="py-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No tienes cursos aun. Crea tu primer curso para comenzar.</p>
        </CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c: Course) => (
            <Card key={c.id} className={`cursor-pointer hover-elevate ${(c as any).pendingCount > 0 ? "border-destructive border-2" : ""}`} onClick={() => onSelect(c.id)} data-testid={`card-teacher-course-${c.id}`}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary">{COURSE_CATEGORIES[c.category as keyof typeof COURSE_CATEGORIES] || c.category}</Badge>
                  <div className="flex items-center gap-2">
                    {(c as any).pendingCount > 0 && (
                      <Badge variant="destructive" className="animate-pulse">{(c as any).pendingCount} solicitud(es)</Badge>
                    )}
                    <Badge variant={c.isActive ? "default" : "outline"}>{c.isActive ? "Activo" : "Inactivo"}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{c.title}</CardTitle>
                <CardDescription className="line-clamp-2">{c.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Crear Nuevo Curso</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Titulo *</Label>
              <Input
                value={createForm.title}
                onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Nombre del curso"
                data-testid="input-create-course-title"
              />
            </div>
            <div>
              <Label>Descripción *</Label>
              <Textarea
                value={createForm.description}
                onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Describe el contenido y objetivos del curso"
                data-testid="input-create-course-description"
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={createForm.category} onValueChange={v => setCreateForm(f => ({ ...f, category: v }))}>
                <SelectTrigger data-testid="select-create-course-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COURSE_CATEGORIES).map(([key, label]) => (
                    <SelectItem key={key} value={key} data-testid={`select-category-${key}`}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Maximo de Estudiantes (opcional)</Label>
              <Input
                type="number"
                min="1"
                value={createForm.maxStudents}
                onChange={e => setCreateForm(f => ({ ...f, maxStudents: e.target.value }))}
                placeholder="Sin limite"
                data-testid="input-create-course-max-students"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialog(false)} data-testid="button-cancel-create-course">Cancelar</Button>
            <Button
              onClick={handleCreateCourse}
              disabled={!createForm.title.trim() || !createForm.description.trim() || createCourse.isPending}
              data-testid="button-submit-create-course"
            >
              {createCourse.isPending ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Plus className="w-4 h-4 mr-1" />}
              Crear Curso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CourseManager({ courseId, onBack }: { courseId: number; onBack: () => void }) {
  const { data: course } = useCourse(courseId);
  const { data: materials } = useCourseMaterials(courseId);
  const { data: sessions } = useCourseSessions(courseId);
  const { data: enrollmentsList } = useCourseEnrollments(courseId);
  const createMaterial = useCreateCourseMaterial();
  const deleteMaterial = useDeleteCourseMaterial();
  const createSession = useCreateCourseSession();
  const updateSession = useUpdateCourseSession();
  const deleteSession = useDeleteCourseSession();
  const updateEnrollment = useUpdateEnrollment();
  const updateCourse = useUpdateCourse();
  const { data: courseAnnouncements } = useCourseAnnouncements(courseId);
  const createAnnouncement = useCreateCourseAnnouncement();
  const deleteAnnouncement = useDeleteCourseAnnouncement();
  const { data: courseScheduleData } = useCourseSchedule(courseId);
  const createScheduleEntry = useCreateCourseScheduleEntry();
  const deleteScheduleEntry = useDeleteCourseScheduleEntry();

  const [materialDialog, setMaterialDialog] = useState(false);
  const [sessionDialog, setSessionDialog] = useState(false);
  const [gradeDialog, setGradeDialog] = useState<any>(null);
  const [certPreview, setCertPreview] = useState<any>(null);
  const [loadingCert, setLoadingCert] = useState<number | null>(null);
  const [materialForm, setMaterialForm] = useState({ title: "", description: "", fileUrl: "", materialType: "documento" });
  const [sessionForm, setSessionForm] = useState({ title: "", description: "", sessionDate: "", duration: "", meetingUrl: "", meetingPlatform: "zoom" });
  const [gradeForm, setGradeForm] = useState({ grade: "", observations: "" });
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({ title: "", content: "", isPinned: false });
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ dayOfWeek: "1", startTime: "09:00", endTime: "10:00", meetingUrl: "", meetingPlatform: "zoom", description: "" });

  if (!course) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  function handleAddMaterial() {
    createMaterial.mutate({
      courseId,
      title: materialForm.title,
      description: materialForm.description || undefined,
      fileUrl: materialForm.fileUrl || undefined,
      materialType: materialForm.materialType,
      sortOrder: (materials?.length || 0),
    }, {
      onSuccess: () => {
        setMaterialDialog(false);
        setMaterialForm({ title: "", description: "", fileUrl: "", materialType: "documento" });
      },
    });
  }

  function handleAddSession() {
    createSession.mutate({
      courseId,
      title: sessionForm.title,
      description: sessionForm.description || undefined,
      sessionDate: sessionForm.sessionDate,
      duration: sessionForm.duration ? parseInt(sessionForm.duration) : undefined,
      meetingUrl: sessionForm.meetingUrl || undefined,
      meetingPlatform: sessionForm.meetingPlatform,
    }, {
      onSuccess: () => {
        setSessionDialog(false);
        setSessionForm({ title: "", description: "", sessionDate: "", duration: "", meetingUrl: "", meetingPlatform: "zoom" });
      },
    });
  }

  function handleAddAnnouncement() {
    createAnnouncement.mutate({
      courseId,
      title: announcementForm.title,
      content: announcementForm.content,
      isPinned: announcementForm.isPinned,
    }, {
      onSuccess: () => {
        setAnnouncementDialog(false);
        setAnnouncementForm({ title: "", content: "", isPinned: false });
      },
    });
  }

  function handleAddScheduleEntry() {
    createScheduleEntry.mutate({
      courseId,
      dayOfWeek: parseInt(scheduleForm.dayOfWeek),
      startTime: scheduleForm.startTime,
      endTime: scheduleForm.endTime,
      meetingUrl: scheduleForm.meetingUrl || undefined,
      meetingPlatform: scheduleForm.meetingPlatform,
      description: scheduleForm.description || undefined,
    }, {
      onSuccess: () => {
        setScheduleDialog(false);
        setScheduleForm({ dayOfWeek: "1", startTime: "09:00", endTime: "10:00", meetingUrl: "", meetingPlatform: "zoom", description: "" });
      },
    });
  }

  function handleGrade(enrollment: any) {
    setGradeDialog(enrollment);
    setGradeForm({ grade: enrollment.grade || "", observations: enrollment.observations || "" });
  }

  function submitGrade() {
    if (!gradeDialog) return;
    updateEnrollment.mutate({
      id: gradeDialog.id,
      courseId,
      updates: { grade: gradeForm.grade || null, observations: gradeForm.observations || null },
    }, {
      onSuccess: () => setGradeDialog(null),
    });
  }

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4" onClick={onBack} data-testid="button-back-courses-list">
        <BookOpen className="w-4 h-4 mr-1" /> Volver a mis cursos
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold">{course.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge variant="secondary">{COURSE_CATEGORIES[course.category as keyof typeof COURSE_CATEGORIES] || course.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {(course as any).enrolledCount || 0}{course.maxStudents ? `/${course.maxStudents}` : ""} inscritos
            </span>
            {(course as any).pendingCount > 0 && (
              <Badge variant="destructive" className="text-xs animate-pulse">{(course as any).pendingCount} pendiente(s)</Badge>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="students" data-testid="tab-students">
            <Users className="w-4 h-4 mr-1" /> Estudiantes
            {enrollmentsList?.filter((e: any) => e.status === "solicitado").length > 0 && (
              <Badge variant="destructive" className="ml-1">{enrollmentsList.filter((e: any) => e.status === "solicitado").length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="materials" data-testid="tab-materials"><FileText className="w-4 h-4 mr-1" /> Materiales</TabsTrigger>
          <TabsTrigger value="sessions" data-testid="tab-sessions"><Calendar className="w-4 h-4 mr-1" /> Sesiones</TabsTrigger>
          <TabsTrigger value="config" data-testid="tab-config"><Pencil className="w-4 h-4 mr-1" /> Configuración</TabsTrigger>
          <TabsTrigger value="schedule" data-testid="tab-schedule"><CalendarDays className="w-4 h-4 mr-1" /> Horario</TabsTrigger>
          <TabsTrigger value="announcements" data-testid="tab-announcements"><Megaphone className="w-4 h-4 mr-1" /> Anuncios</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estudiantes Inscritos</CardTitle>
              <CardDescription>Gestiona inscripciones, califica y agrega observaciones</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Certificate Preview Card */}
              {certPreview && (
                <div className="mb-4 p-4 border-2 border-orange-300 rounded-lg bg-orange-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h5 className="font-semibold text-orange-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Certificado de {certPreview.studentName}
                    </h5>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={async () => {
                        const el = document.getElementById("maestro-cert-preview");
                        if (!el) return;
                        try {
                          const html2canvas = (await import("html2canvas")).default;
                          const { jsPDF } = await import("jspdf");
                          const origStyle = el.getAttribute("style") || "";
                          el.style.width = "700px";
                          el.style.minHeight = "495px";
                          el.style.overflow = "visible";
                          el.style.transform = "none";
                          const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#fffbeb", logging: false, width: 700, height: el.scrollHeight, windowWidth: 800 });
                          el.setAttribute("style", origStyle);
                          const imgData = canvas.toDataURL("image/png");
                          const pdfW = 297;
                          const pdfH = (canvas.height / canvas.width) * pdfW;
                          const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [pdfW, pdfH] });
                          pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
                          pdf.save(`certificado-${(certPreview?.studentName || "estudiante").replace(/\s+/g, "-").toLowerCase()}.pdf`);
                        } catch (err) { console.error("PDF error:", err); }
                      }}>
                        <Download className="w-4 h-4 mr-1" /> Descargar PDF
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setCertPreview(null)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto flex justify-center">
                    <MaestroCertificatePreview cert={certPreview} containerId="maestro-cert-preview" />
                  </div>
                </div>
              )}

              {!enrollmentsList?.length ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No hay estudiantes inscritos.</p>
              ) : (
                <div className="space-y-3">
                  {enrollmentsList.map((e: any) => (
                    <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`student-enrollment-${e.id}`}>
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src={e.user.avatarUrl} />
                          <AvatarFallback className="text-xs">
                            {(e.user.displayName || e.user.username || "?").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-sm">{e.user.displayName || e.user.username}</p>
                          <p className="text-xs text-muted-foreground">@{e.user.username}</p>
                          {e.user.email && <p className="text-xs text-muted-foreground">{e.user.email}</p>}
                          {e.user.country && <p className="text-xs text-muted-foreground">{e.user.country}{e.user.cargo ? ` · ${e.user.cargo}` : ""}</p>}
                          {e.grade && <p className="text-xs mt-1">Calificacion: <span className="font-semibold">{e.grade}</span></p>}
                          {e.observations && <p className="text-xs text-muted-foreground mt-1">{e.observations}</p>}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={e.status === "aprobado" ? "default" : e.status === "completado" ? "secondary" : e.status === "rechazado" ? "destructive" : "outline"}>
                          {ENROLLMENT_STATUSES[e.status as keyof typeof ENROLLMENT_STATUSES]}
                        </Badge>
                        {e.status === "solicitado" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "aprobado" } })} data-testid={`button-approve-${e.id}`}>
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Aprobar
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "rechazado" } })} data-testid={`button-reject-${e.id}`}>
                              <XCircle className="w-4 h-4 mr-1" /> Rechazar
                            </Button>
                          </>
                        )}
                        {(e.status === "aprobado" || e.status === "completado") && (
                          <Button size="sm" variant="ghost" onClick={() => handleGrade(e)} data-testid={`button-grade-${e.id}`}>
                            <Pencil className="w-4 h-4 mr-1" /> Calificar
                          </Button>
                        )}
                        {e.status === "aprobado" && (
                          <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "completado" } })} data-testid={`button-complete-${e.id}`}>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Completar
                          </Button>
                        )}
                        {e.status === "completado" && (
                          <>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" /> Certificado generado
                            </Badge>
                            <Button size="sm" variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50" onClick={async () => {
                              setLoadingCert(e.id);
                              try {
                                const res = await fetch(`/api/certificates/by-enrollment/${e.id}`, { credentials: "include" });
                                if (res.ok) { setCertPreview(await res.json()); }
                                else { alert("Certificado aún no generado."); }
                              } catch { alert("Error al cargar certificado"); }
                              setLoadingCert(null);
                            }} disabled={loadingCert === e.id}>
                              {loadingCert === e.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <GraduationCap className="w-4 h-4 mr-1" />}
                              Ver Certificado
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "aprobado" } })} data-testid={`button-revert-${e.id}`} title="Revertir a Aprobado">
                              <XCircle className="w-4 h-4 mr-1" /> Revertir
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-lg">Materiales del Curso</CardTitle>
                <CardDescription>Agrega documentos, videos y recursos</CardDescription>
              </div>
              <Button size="sm" onClick={() => setMaterialDialog(true)} data-testid="button-add-material">
                <Plus className="w-4 h-4 mr-1" /> Agregar Material
              </Button>
            </CardHeader>
            <CardContent>
              {!materials?.length ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No hay materiales agregados.</p>
              ) : (
                <div className="space-y-2">
                  {materials.map((m: CourseMaterial) => (
                    <div key={m.id} className="flex items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`material-row-${m.id}`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{m.title}</p>
                        {m.description && <p className="text-xs text-muted-foreground">{m.description}</p>}
                        <Badge variant="outline" className="text-xs mt-1">{MATERIAL_TYPES[m.materialType as keyof typeof MATERIAL_TYPES]}</Badge>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteMaterial.mutate({ id: m.id, courseId })} data-testid={`button-delete-material-${m.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-lg">Sesiones de Clase</CardTitle>
                <CardDescription>Programa clases y agrega enlaces de reunion</CardDescription>
              </div>
              <Button size="sm" onClick={() => setSessionDialog(true)} data-testid="button-add-session">
                <Plus className="w-4 h-4 mr-1" /> Nueva Sesion
              </Button>
            </CardHeader>
            <CardContent>
              {!sessions?.length ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No hay sesiones programadas.</p>
              ) : (
                <div className="space-y-2">
                  {sessions.map((s: CourseSession) => (
                    <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`session-row-${s.id}`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{s.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(s.sessionDate).toLocaleDateString("es", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          {s.duration ? ` - ${s.duration}min` : ""}
                        </p>
                        {s.meetingUrl && <p className="text-xs text-primary truncate">{s.meetingUrl}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {s.isCompleted ? (
                          <Badge variant="secondary">Completada</Badge>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => updateSession.mutate({ id: s.id, courseId, updates: { isCompleted: true } })} data-testid={`button-complete-session-${s.id}`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => deleteSession.mutate({ id: s.id, courseId })} data-testid={`button-delete-session-${s.id}`}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <CourseConfig course={course} onUpdate={(updates) => updateCourse.mutate({ id: courseId, updates })} />
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-lg">Horario Semanal</CardTitle>
                <CardDescription>Configura los dias y horas regulares de clase</CardDescription>
              </div>
              <Button size="sm" onClick={() => setScheduleDialog(true)} data-testid="button-add-schedule">
                <Plus className="w-4 h-4 mr-1" /> Agregar Horario
              </Button>
            </CardHeader>
            <CardContent>
              {!courseScheduleData?.length ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No hay horario configurado.</p>
              ) : (
                <div className="space-y-2">
                  {courseScheduleData
                    .sort((a: CourseScheduleEntry, b: CourseScheduleEntry) => a.dayOfWeek - b.dayOfWeek)
                    .map((entry: CourseScheduleEntry) => (
                    <div key={entry.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`schedule-entry-row-${entry.id}`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{DAYS_OF_WEEK[entry.dayOfWeek as keyof typeof DAYS_OF_WEEK]}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.startTime} - {entry.endTime}
                        </p>
                        {entry.description && <p className="text-xs text-muted-foreground mt-1">{entry.description}</p>}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {entry.meetingPlatform && (
                            <Badge variant="outline" className="text-xs">{MEETING_PLATFORMS[entry.meetingPlatform as keyof typeof MEETING_PLATFORMS] || entry.meetingPlatform}</Badge>
                          )}
                          {entry.meetingUrl && <p className="text-xs text-primary truncate">{entry.meetingUrl}</p>}
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteScheduleEntry.mutate({ id: entry.id, courseId })} data-testid={`button-delete-schedule-${entry.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-lg">Anuncios del Curso</CardTitle>
                <CardDescription>Publica comunicaciones para tus estudiantes</CardDescription>
              </div>
              <Button size="sm" onClick={() => setAnnouncementDialog(true)} data-testid="button-add-announcement">
                <Plus className="w-4 h-4 mr-1" /> Nuevo Anuncio
              </Button>
            </CardHeader>
            <CardContent>
              {!courseAnnouncements?.length ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No hay anuncios publicados.</p>
              ) : (
                <div className="space-y-2">
                  {courseAnnouncements.map((a: CourseAnnouncement) => (
                    <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`announcement-row-${a.id}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-sm">{a.title}</p>
                          {a.isPinned && <MapPin className="w-3 h-3 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{a.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {a.createdAt ? new Date(a.createdAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : ""}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteAnnouncement.mutate({ id: a.id, courseId })} data-testid={`button-delete-announcement-${a.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={materialDialog} onOpenChange={setMaterialDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Agregar Material</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titulo</Label><Input value={materialForm.title} onChange={e => setMaterialForm(f => ({ ...f, title: e.target.value }))} data-testid="input-material-title" /></div>
            <div><Label>Descripción</Label><Textarea value={materialForm.description} onChange={e => setMaterialForm(f => ({ ...f, description: e.target.value }))} data-testid="input-material-description" /></div>
            <div><Label>URL del Recurso</Label><Input value={materialForm.fileUrl} onChange={e => setMaterialForm(f => ({ ...f, fileUrl: e.target.value }))} placeholder="https://..." data-testid="input-material-url" /></div>
            <div><Label>Tipo</Label>
              <Select value={materialForm.materialType} onValueChange={v => setMaterialForm(f => ({ ...f, materialType: v }))}>
                <SelectTrigger data-testid="select-material-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(MATERIAL_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddMaterial} disabled={!materialForm.title || createMaterial.isPending} data-testid="button-submit-material">
              {createMaterial.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />} Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={sessionDialog} onOpenChange={setSessionDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nueva Sesion de Clase</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titulo</Label><Input value={sessionForm.title} onChange={e => setSessionForm(f => ({ ...f, title: e.target.value }))} data-testid="input-session-title" /></div>
            <div><Label>Descripción</Label><Textarea value={sessionForm.description} onChange={e => setSessionForm(f => ({ ...f, description: e.target.value }))} data-testid="input-session-description" /></div>
            <div><Label>Fecha y Hora</Label><Input type="datetime-local" value={sessionForm.sessionDate} onChange={e => setSessionForm(f => ({ ...f, sessionDate: e.target.value }))} data-testid="input-session-date" /></div>
            <div><Label>Duracion (minutos)</Label><Input type="number" value={sessionForm.duration} onChange={e => setSessionForm(f => ({ ...f, duration: e.target.value }))} data-testid="input-session-duration" /></div>
            <div><Label>Enlace de Reunion</Label><Input value={sessionForm.meetingUrl} onChange={e => setSessionForm(f => ({ ...f, meetingUrl: e.target.value }))} placeholder="https://zoom.us/j/..." data-testid="input-session-url" /></div>
            <div><Label>Plataforma</Label>
              <Select value={sessionForm.meetingPlatform} onValueChange={v => setSessionForm(f => ({ ...f, meetingPlatform: v }))}>
                <SelectTrigger data-testid="select-session-platform"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="google_meet">Google Meet</SelectItem>
                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSession} disabled={!sessionForm.title || !sessionForm.sessionDate || createSession.isPending} data-testid="button-submit-session">
              {createSession.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Calendar className="w-4 h-4 mr-1" />} Programar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!gradeDialog} onOpenChange={(open) => !open && setGradeDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Calificar Estudiante</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Estudiante: <span className="font-medium text-foreground">{gradeDialog?.user?.displayName || gradeDialog?.user?.username}</span></p>
            <div><Label>Calificacion</Label><Input value={gradeForm.grade} onChange={e => setGradeForm(f => ({ ...f, grade: e.target.value }))} placeholder="Ej: Aprobado, 9/10, Excelente" data-testid="input-grade" /></div>
            <div><Label>Observaciones</Label><Textarea value={gradeForm.observations} onChange={e => setGradeForm(f => ({ ...f, observations: e.target.value }))} placeholder="Notas sobre el desempeno del estudiante..." data-testid="input-observations" /></div>
          </div>
          <DialogFooter>
            <Button onClick={submitGrade} disabled={updateEnrollment.isPending} data-testid="button-submit-grade">
              {updateEnrollment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />} Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Agregar Horario de Clase</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Dia de la Semana</Label>
              <Select value={scheduleForm.dayOfWeek} onValueChange={v => setScheduleForm(f => ({ ...f, dayOfWeek: v }))}>
                <SelectTrigger data-testid="select-schedule-day"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(DAYS_OF_WEEK).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Hora de Inicio</Label><Input type="time" value={scheduleForm.startTime} onChange={e => setScheduleForm(f => ({ ...f, startTime: e.target.value }))} data-testid="input-schedule-start" /></div>
            <div><Label>Hora de Fin</Label><Input type="time" value={scheduleForm.endTime} onChange={e => setScheduleForm(f => ({ ...f, endTime: e.target.value }))} data-testid="input-schedule-end" /></div>
            <div><Label>Enlace de Reunion</Label><Input value={scheduleForm.meetingUrl} onChange={e => setScheduleForm(f => ({ ...f, meetingUrl: e.target.value }))} placeholder="https://zoom.us/j/..." data-testid="input-schedule-url" /></div>
            <div><Label>Plataforma</Label>
              <Select value={scheduleForm.meetingPlatform} onValueChange={v => setScheduleForm(f => ({ ...f, meetingPlatform: v }))}>
                <SelectTrigger data-testid="select-schedule-platform"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="google_meet">Google Meet</SelectItem>
                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Descripción</Label><Input value={scheduleForm.description} onChange={e => setScheduleForm(f => ({ ...f, description: e.target.value }))} data-testid="input-schedule-description" /></div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddScheduleEntry} disabled={!scheduleForm.startTime || !scheduleForm.endTime || createScheduleEntry.isPending} data-testid="button-submit-schedule">
              {createScheduleEntry.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />} Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={announcementDialog} onOpenChange={setAnnouncementDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nuevo Anuncio</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titulo</Label><Input value={announcementForm.title} onChange={e => setAnnouncementForm(f => ({ ...f, title: e.target.value }))} data-testid="input-announcement-title" /></div>
            <div><Label>Contenido</Label><Textarea value={announcementForm.content} onChange={e => setAnnouncementForm(f => ({ ...f, content: e.target.value }))} data-testid="input-announcement-content" /></div>
            <div className="flex flex-wrap items-center gap-2">
              <Label>Fijar anuncio</Label>
              <Button
                type="button"
                size="sm"
                variant={announcementForm.isPinned ? "default" : "outline"}
                className="toggle-elevate"
                onClick={() => setAnnouncementForm(f => ({ ...f, isPinned: !f.isPinned }))}
                data-testid="button-toggle-pin"
              >
                <MapPin className="w-4 h-4 mr-1" /> {announcementForm.isPinned ? "Fijado" : "No fijado"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAnnouncement} disabled={!announcementForm.title || !announcementForm.content || createAnnouncement.isPending} data-testid="button-submit-announcement">
              {createAnnouncement.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Megaphone className="w-4 h-4 mr-1" />} Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CourseConfig({ course, onUpdate }: { course: Course; onUpdate: (updates: any) => void }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [enrollmentStatus, setEnrollmentStatus] = useState((course as any).enrollmentStatus || "open");
  const [enrollmentOpenDate, setEnrollmentOpenDate] = useState(
    (course as any).enrollmentOpenDate ? new Date((course as any).enrollmentOpenDate).toISOString().slice(0, 16) : ""
  );
  const [enrollmentCloseDate, setEnrollmentCloseDate] = useState(
    (course as any).enrollmentCloseDate ? new Date((course as any).enrollmentCloseDate).toISOString().slice(0, 16) : ""
  );

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Configuración del Curso</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div><Label>Titulo</Label><Input value={title} onChange={e => setTitle(e.target.value)} data-testid="input-course-title-config" /></div>
        <div><Label>Descripción</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} className="min-h-[100px]" data-testid="input-course-description-config" /></div>
        <div>
          <Label>Estado de Inscripciones</Label>
          <Select value={enrollmentStatus} onValueChange={setEnrollmentStatus}>
            <SelectTrigger data-testid="select-enrollment-status"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(ENROLLMENT_MODES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {enrollmentStatus === "scheduled" && (
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Fecha Apertura</Label><Input type="datetime-local" value={enrollmentOpenDate} onChange={e => setEnrollmentOpenDate(e.target.value)} /></div>
            <div><Label>Fecha Cierre</Label><Input type="datetime-local" value={enrollmentCloseDate} onChange={e => setEnrollmentCloseDate(e.target.value)} /></div>
          </div>
        )}
        {enrollmentStatus === "open" && (
          <div><Label>Fecha de Cierre Automatico (opcional)</Label><Input type="datetime-local" value={enrollmentCloseDate} onChange={e => setEnrollmentCloseDate(e.target.value)} /></div>
        )}
        <Button onClick={() => onUpdate({ title, description, enrollmentStatus, enrollmentOpenDate: enrollmentOpenDate || null, enrollmentCloseDate: enrollmentCloseDate || null })} data-testid="button-save-course-config">
          <Save className="w-4 h-4 mr-1" /> Guardar Cambios
        </Button>
      </CardContent>
    </Card>
  );
}
