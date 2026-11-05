import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { isAdminRole, isTeacherOrAdminRole } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  useCourses, useCreateEnrollment, useMyEnrollments,
  useCarteleraAnnouncements, useCreateCarteleraAnnouncement,
  useUpdateCarteleraAnnouncement, useDeleteCarteleraAnnouncement,
  useAllCourseAnnouncements, useAllUpcomingSessions,
  useAllSchedules, useCarteleraStats,
} from "@/hooks/use-users";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2, Search, BookOpen, Users, Clock, GraduationCap,
  Megaphone, CalendarDays, LayoutDashboard, Plus, Pin, Trash2,
  Video, ArrowRight, Bell, Calendar, CheckCircle, AlertTriangle,
  Pencil, X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardGridSkeleton } from "@/components/SkeletonScreens";
import { COURSE_CATEGORIES, ENROLLMENT_STATUSES, CARTELERA_CATEGORIES, DAYS_OF_WEEK, MEETING_PLATFORMS } from "@shared/schema";
import type { Course } from "@shared/schema";
import { useLocation } from "wouter";

export default function Capacitaciones() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("cartelera");
  const [lastSeen, setLastSeen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cartelera_last_seen") || "";
    }
    return "";
  });
  const { data: carteleraAnns } = useCarteleraAnnouncements();

  // Solo miembros con sesión. Se espera a saber si hay sesión: antes mandaba a
  // /login mientras cargaba y, como sí había sesión, de ahí a la portada.
  useEffect(() => {
    if (!authLoading && !user) {
      navigate(loginUrl());
    }
  }, [user, authLoading, navigate]);

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  const isAdmin = isAdminRole(user.role);
  const isTeacher = isTeacherOrAdminRole(user.role);
  const canManage = isTeacher;
  const unseen = carteleraAnns?.some((a: any) => !lastSeen || new Date(a.createdAt) > new Date(lastSeen));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "cartelera" && carteleraAnns?.length) {
      const latest = carteleraAnns[0].createdAt;
      setLastSeen(latest);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartelera_last_seen", latest);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold mb-2" data-testid="text-capacitaciones-title">Capacitaciones</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Centro de formación ministerial — Cursos, sesiones, horarios y anuncios en un solo lugar.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg mb-6">
            <TabsTrigger value="cartelera" className="flex-1 min-w-[120px] gap-1.5 relative">
              <LayoutDashboard className="w-4 h-4" /> Cartelera
              {unseen && <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs">Nuevo</span>}
            </TabsTrigger>
            <TabsTrigger value="cursos" className="flex-1 min-w-[120px] gap-1.5">
              <BookOpen className="w-4 h-4" /> Cursos
            </TabsTrigger>
            <TabsTrigger value="sesiones" className="flex-1 min-w-[120px] gap-1.5">
              <Video className="w-4 h-4" /> Sesiones
            </TabsTrigger>
            <TabsTrigger value="horarios" className="flex-1 min-w-[120px] gap-1.5">
              <CalendarDays className="w-4 h-4" /> Horarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cartelera">
            <CarteleraCentralTab canManage={canManage} user={user} />
          </TabsContent>
          <TabsContent value="cursos">
            <CursosTab user={user} />
          </TabsContent>
          <TabsContent value="sesiones">
            <SesionesTab />
          </TabsContent>
          <TabsContent value="horarios">
            <HorariosTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

// ========== STAT CARD ==========
function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ========== CARTELERA CENTRAL TAB ==========
function CarteleraCentralTab({ canManage, user }: { canManage: boolean; user: any }) {
  const { data: stats, isLoading: statsLoading } = useCarteleraStats();
  const { data: carteleraAnns, isLoading: cartLoading } = useCarteleraAnnouncements();
  const { data: courseAnns, isLoading: courseAnnsLoading } = useAllCourseAnnouncements();
  const createAnn = useCreateCarteleraAnnouncement();
  const updateAnn = useUpdateCarteleraAnnouncement();
  const deleteAnn = useDeleteCarteleraAnnouncement();
  const [annFilter, setAnnFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 space-y-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={BookOpen} label="Cursos Totales" value={stats.totalCourses} color="text-blue-600 bg-blue-100" />
          <StatCard icon={CheckCircle} label="Cursos Activos" value={stats.activeCourses} color="text-green-600 bg-green-100" />
          <StatCard icon={Users} label="Estudiantes" value={stats.totalStudents} color="text-purple-600 bg-purple-100" />
          <StatCard icon={Video} label="Sesiones" value={stats.totalSessions} color="text-orange-600 bg-orange-100" />
        </div>
      ) : null}

      <Separator />

      {/* Announcement Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" /> Tablero de Anuncios
          </h2>
          <p className="text-sm text-muted-foreground">Anuncios de la cartelera central y de todas las aulas</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={annFilter} onValueChange={setAnnFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="cartelera">Solo Cartelera</SelectItem>
              <SelectItem value="courses">Solo de Aulas</SelectItem>
              {Object.entries(CARTELERA_CATEGORIES).map(([k, v]) => (
                <SelectItem key={k} value={`cat_${k}`}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {canManage && <CreateCarteleraAnnouncementDialog onSubmit={createAnn.mutate} isPending={createAnn.isPending} />}
        </div>
      </div>

      {/* Combined Announcements */}
      {(cartLoading || courseAnnsLoading) ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-16 ml-auto" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(annFilter === "all" || annFilter === "cartelera" || annFilter.startsWith("cat_")) &&
            carteleraAnns?.filter((a: any) => {
              if (annFilter.startsWith("cat_")) return a.category === annFilter.replace("cat_", "");
              return true;
            }).map((ann: any) => (
              <CarteleraAnnouncementCard
                key={`cart-${ann.id}`}
                announcement={ann}
                canManage={canManage}
                currentUserId={user?.id}
                onUpdate={(data: any) => updateAnn.mutate({ id: ann.id, data })}
                onDelete={() => deleteAnn.mutate(ann.id)}
              />
            ))
          }
          {(annFilter === "all" || annFilter === "courses") &&
            courseAnns?.map((ann: any) => (
              <CourseAnnouncementCard key={`course-${ann.id}`} announcement={ann} />
            ))
          }
          {(!carteleraAnns?.length && !courseAnns?.length) && (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay anuncios publicados aun.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function CarteleraAnnouncementCard({ announcement, canManage, currentUserId, onUpdate, onDelete }: {
  announcement: any; canManage: boolean; currentUserId?: number;
  onUpdate: (data: any) => void; onDelete: () => void;
}) {
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(announcement.title);
  const [editContent, setEditContent] = useState(announcement.content);
  const [editCategory, setEditCategory] = useState(announcement.category);
  const [editExpiresAt, setEditExpiresAt] = useState(announcement.expiresAt ? announcement.expiresAt.slice(0, 10) : "");
  const [editFileUrl, setEditFileUrl] = useState(announcement.fileUrl || "");
  const [editFileName, setEditFileName] = useState(announcement.fileName || "");
  const [editFileSize, setEditFileSize] = useState<number | null>(announcement.fileSize || null);
  const [editFileData, setEditFileData] = useState<string | null>(announcement.fileData || null);
  const [editUploadingFile, setEditUploadingFile] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const isUrgent = announcement.category === "urgente";
  const catLabel = CARTELERA_CATEGORIES[announcement.category as keyof typeof CARTELERA_CATEGORIES] || announcement.category;

  const handleEditSave = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setEditError("Título y contenido son obligatorios.");
      return;
    }
    onUpdate({
      title: editTitle.trim(),
      content: editContent.trim(),
      category: editCategory,
      expiresAt: editExpiresAt || undefined,
      fileUrl: editFileUrl || undefined,
      fileName: editFileName || undefined,
      fileSize: editFileSize || undefined,
      fileData: editFileData || undefined,
    });
    setEditing(false);
    setEditError(null);
  };

  return (
    <Card className={`border-l-4 ${isUrgent ? "border-l-red-500 bg-red-50/50 dark:bg-red-950/20" : announcement.isPinned ? "border-l-yellow-500 bg-yellow-50/30 dark:bg-yellow-950/10" : "border-l-primary"} sm:rounded-md rounded-none`}> 
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {announcement.isPinned && <Pin className="w-3.5 h-3.5 text-yellow-600" />}
              {isUrgent && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
              <Badge variant={isUrgent ? "destructive" : "secondary"} className="text-[10px] px-1.5 py-0">{catLabel}</Badge>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">Cartelera Central</Badge>
            </div>
            {editing ? (
              <div className="space-y-2">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="text-base font-semibold" aria-label="Editar título" />
                <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={3} aria-label="Editar contenido" />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={editCategory} onValueChange={setEditCategory}>
                    <SelectTrigger className="w-full sm:w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(CARTELERA_CATEGORIES).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="date" value={editExpiresAt} onChange={e => setEditExpiresAt(e.target.value)} className="w-full sm:w-36" aria-label="Editar fecha de expiración" />
                </div>
                <div>
                  <Label>Adjuntar archivo</Label>
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
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <a href={editFileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                      {editFileName || editFileUrl}
                    </a>
                    <Button size="icon" variant="ghost" onClick={() => {
                      setEditFileUrl(""); setEditFileName(""); setEditFileSize(null); setEditFileData(null);
                    }} title="Eliminar adjunto">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                {editError && <span className="text-xs text-red-600">{editError}</span>}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button size="sm" onClick={handleEditSave} variant="default">Guardar</Button>
                  <Button size="sm" onClick={() => { setEditing(false); setEditError(null); }} variant="outline">Cancelar</Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-base wrap-break-word">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap wrap-break-word">{announcement.content}</p>
                {(announcement.fileData || announcement.fileUrl) && (
                  <p className="mt-2">
                    {announcement.fileData ? (
                      <button className="text-sm underline text-primary" onClick={() => {
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
                      <a href={announcement.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                        {announcement.fileName || announcement.fileUrl}
                      </a>
                    )}
                  </p>
                )}
              </>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Avatar className="w-5 h-5">
                <AvatarImage src={announcement.author?.avatarUrl} />
                <AvatarFallback className="text-[9px]">
                  {(announcement.author?.displayName || announcement.author?.username || "?").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{announcement.author?.displayName || announcement.author?.username}</span>
              <span>·</span>
              <span>{new Date(announcement.createdAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}</span>
              {announcement.expiresAt && (
                <>
                  <span>·</span>
                  <span className="text-orange-600">Expira: {new Date(announcement.expiresAt).toLocaleDateString("es", { day: "numeric", month: "short" })}</span>
                </>
              )}
            </div>
          </div>
          {canManage && !editing && (
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onUpdate({ isPinned: !announcement.isPinned })}>
                <Pin className={`w-3.5 h-3.5 ${announcement.isPinned ? "text-yellow-600 fill-yellow-600" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditing(true)}>
                <Pencil className="w-3.5 h-3.5 text-primary" />
              </Button>
              {confirmDelete ? (
                <div className="flex gap-1">
                  <Button size="sm" variant="destructive" className="h-7 text-xs px-2" onClick={onDelete}>Si</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setConfirmDelete(false)}>No</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setConfirmDelete(true)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CourseAnnouncementCard({ announcement }: { announcement: any }) {
  return (
    <Card className="border-l-4 border-l-blue-400">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {announcement.isPinned && <Pin className="w-3.5 h-3.5 text-yellow-600" />}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200">
            {announcement.courseName}
          </Badge>
        </div>
        <h3 className="font-semibold text-base">{announcement.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{announcement.content}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Avatar className="w-5 h-5">
            <AvatarImage src={announcement.author?.avatarUrl} />
            <AvatarFallback className="text-[9px]">
              {(announcement.author?.displayName || announcement.author?.username || "?").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{announcement.author?.displayName || announcement.author?.username}</span>
          <span>·</span>
          <span>{new Date(announcement.createdAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}</span>
          <Link href={`/capacitaciones/${announcement.courseId}`}>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600">
              Ir al aula <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateCarteleraAnnouncementDialog({ onSubmit, isPending }: { onSubmit: (data: any) => void; isPending: boolean }) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isPinned, setIsPinned] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileDataBase64, setFileDataBase64] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<"enlace" | "archivo">("enlace");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const validate = () => {
    const errs: { title?: string; content?: string } = {};
    if (!title.trim()) errs.title = "El título es obligatorio.";
    if (!content.trim()) errs.content = "El contenido es obligatorio.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // file is optional; only include if present
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      isPinned,
      expiresAt: expiresAt || undefined,
      fileUrl: fileUrl ? (uploadMode === "enlace" ? fileUrl.trim() : fileUrl) : undefined,
      fileName: uploadedFileName || undefined,
      fileSize: uploadedFileSize || undefined,
      fileData: fileDataBase64 || undefined,
    });
    setTitle(""); setContent(""); setCategory("general"); setIsPinned(false); setExpiresAt("");
    setFileUrl(""); setFileDataBase64(null); setUploadedFileName(""); setUploadedFileSize(null);
    setUploadMode("enlace");
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nuevo Anuncio</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Anuncio de Cartelera</DialogTitle>
          <DialogDescription>Este anuncio será visible en la Cartelera Central, no en aulas individuales.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Título *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del anuncio" aria-invalid={!!errors.title} />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
          </div>
          <div>
            <Label>Contenido *</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el contenido del anuncio..." rows={4} aria-invalid={!!errors.content} />
            {errors.content && <span className="text-xs text-red-600">{errors.content}</span>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CARTELERA_CATEGORIES).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fecha de Expiración</Label>
              <Input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Modo de archivo</Label>
            <Select value={uploadMode} onValueChange={v => setUploadMode(v as "enlace"|"archivo")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="archivo">Subir archivo</SelectItem>
                <SelectItem value="enlace">Usar enlace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {uploadMode === "enlace" ? (
            <div>
              <Label>URL del archivo</Label>
              <Input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." />
            </div>
          ) : (
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
          )}
          {fileUrl && (
            <p className="text-sm mt-1">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {uploadedFileName || fileUrl}
              </a>
            </p>
          )}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="pin-ann" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="rounded" />
            <Label htmlFor="pin-ann" className="text-sm cursor-pointer">Fijar anuncio (aparecerá primero)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Megaphone className="w-4 h-4 mr-1" />}
            Publicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ========== CURSOS TAB ==========
function CursosTab({ user }: { user: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { data: courses, isLoading, isError, error } = useCourses({ search: searchQuery, category: categoryFilter !== "all" ? categoryFilter : undefined });
  const { data: myEnrollments } = useMyEnrollments();
  const { toast } = useToast();

  // show any query error (including session expiration)
  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }, [isError, error, toast]);
  const createEnrollment = useCreateEnrollment();

  const enrollmentMap = new Map<number, string>();
  if (myEnrollments) {
    myEnrollments.forEach((e: any) => { enrollmentMap.set(e.courseId, e.status); });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cursos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" data-testid="input-search-courses" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-category-filter">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {Object.entries(COURSE_CATEGORIES).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : !courses?.length ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron cursos disponibles.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course: Course) => {
            const enrollmentStatus = enrollmentMap.get(course.id);
            return (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow" data-testid={`card-course-${course.id}`}>
                {course.imageUrl && (
                  <div className="h-40 overflow-hidden rounded-t-md">
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {COURSE_CATEGORIES[course.category as keyof typeof COURSE_CATEGORIES] || course.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1" data-testid={`text-capacity-${course.id}`}>
                      <Users className="w-3 h-3" /> {(course as any).enrolledCount || 0}{course.maxStudents ? `/${course.maxStudents}` : ""} inscritos
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2" data-testid={`text-course-title-${course.id}`}>{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                  {(course as any).teacher && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={(course as any).teacher.avatarUrl} />
                        <AvatarFallback className="text-[9px]">
                          {((course as any).teacher.displayName || (course as any).teacher.username || "?").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        Maestro: {(course as any).teacher.displayName || (course as any).teacher.username}
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {enrollmentStatus ? (
                      <Badge
                        variant={enrollmentStatus === "aprobado" ? "default" : enrollmentStatus === "completado" ? "secondary" : "outline"}
                        data-testid={`badge-enrollment-${course.id}`}
                      >
                        {ENROLLMENT_STATUSES[enrollmentStatus as keyof typeof ENROLLMENT_STATUSES] || enrollmentStatus}
                      </Badge>
                    ) : (course as any).enrollmentStatus === "closed" ? (
                      <Badge variant="destructive" className="text-xs">Inscripciones Cerradas</Badge>
                    ) : (course as any).enrollmentStatus === "scheduled" ? (
                      <Badge variant="outline" className="text-xs">Inscripciones Programadas</Badge>
                    ) : user?.isActive ? (
                      <Button size="sm" onClick={() => createEnrollment.mutate(course.id)} disabled={createEnrollment.isPending} data-testid={`button-enroll-${course.id}`}>
                        {createEnrollment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <GraduationCap className="w-4 h-4 mr-1" />}
                        Inscribirse
                      </Button>
                    ) : !user ? (
                      <Link href="/login"><Button size="sm" variant="outline">Inicia sesión para inscribirte</Button></Link>
                    ) : null}
                    <Link href={`/capacitaciones/${course.id}`}>
                      <Button size="sm" variant="ghost" data-testid={`button-view-course-${course.id}`}>
                        Ver detalles <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ========== SESIONES TAB ==========
function SesionesTab() {
  const { data: sessions, isLoading } = useAllUpcomingSessions();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sessions?.filter((s: any) => {
    if (statusFilter === "all") return true;
    return s.status === statusFilter;
  }) || [];

  const grouped = filtered.reduce((acc: Record<string, any[]>, s: any) => {
    const key = s.courseName || "Sin Curso";
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" /> Todas las Sesiones
          </h2>
          <p className="text-sm text-muted-foreground">Sesiones de todas las aulas de clase</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="programada">Programadas</SelectItem>
            <SelectItem value="en_vivo">En Vivo</SelectItem>
            <SelectItem value="completada">Completadas</SelectItem>
            <SelectItem value="cancelada">Canceladas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : Object.keys(grouped).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No hay sesiones registradas.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(Object.entries(grouped) as [string, any[]][]).map(([courseName, courseSessions]) => (
            <Card key={courseName}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> {courseName}
                  <Badge variant="outline" className="ml-auto text-xs">{courseSessions.length} sesiones</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {courseSessions.map((session: any) => {
                  const statusColors: Record<string, string> = {
                    programada: "bg-blue-100 text-blue-700",
                    en_vivo: "bg-green-100 text-green-700 animate-pulse",
                    completada: "bg-gray-100 text-gray-600",
                    cancelada: "bg-red-100 text-red-600",
                  };
                  const statusLabels: Record<string, string> = {
                    programada: "Programada", en_vivo: "En Vivo", completada: "Completada", cancelada: "Cancelada",
                  };
                  return (
                    <div key={session.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Badge className={`text-[10px] shrink-0 ${statusColors[session.status] || "bg-gray-100"}`}>
                        {statusLabels[session.status] || session.status}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{session.title}</p>
                        {session.description && <p className="text-xs text-muted-foreground truncate">{session.description}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-medium">
                          {session.scheduledAt ? new Date(session.scheduledAt).toLocaleDateString("es", { day: "numeric", month: "short" }) : "Sin fecha"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {session.scheduledAt ? new Date(session.scheduledAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }) : ""}
                          {session.duration ? ` · ${session.duration} min` : ""}
                        </p>
                      </div>
                      {session.meetingUrl && (
                        <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="h-7 text-xs shrink-0">
                            <Video className="w-3 h-3 mr-1" />
                            {MEETING_PLATFORMS[session.meetingPlatform as keyof typeof MEETING_PLATFORMS] || "Unirse"}
                          </Button>
                        </a>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ========== HORARIOS TAB ==========
function HorariosTab() {
  const { data: schedules, isLoading } = useAllSchedules();

  const byDay = (schedules || []).reduce((acc: Record<number, any[]>, s: any) => {
    const day = s.dayOfWeek ?? 0;
    if (!acc[day]) acc[day] = [];
    acc[day].push(s);
    return acc;
  }, {} as Record<number, any[]>);

  const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" /> Horarios de Todas las Aulas
        </h2>
        <p className="text-sm text-muted-foreground">Vista consolidada de todos los horarios semanales</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : !schedules?.length ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No hay horarios configurados.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dayOrder.map((dayNum) => {
            const entries = byDay[dayNum] || [];
            if (!entries.length) return null;
            const dayName = DAYS_OF_WEEK[dayNum as keyof typeof DAYS_OF_WEEK] || `Dia ${dayNum}`;
            const today = new Date().getDay();
            const isToday = dayNum === today;

            return (
              <Card key={dayNum} className={`${isToday ? "ring-2 ring-primary shadow-lg" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4" /> {dayName}
                    </span>
                    {isToday && <Badge className="text-[10px] bg-primary">Hoy</Badge>}
                    <Badge variant="outline" className="text-[10px]">{entries.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {entries.sort((a: any, b: any) => (a.startTime || "").localeCompare(b.startTime || "")).map((entry: any) => (
                    <div key={entry.id} className="p-2 rounded bg-muted/40 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-medium text-xs">{entry.startTime} - {entry.endTime}</span>
                      </div>
                      <p className="text-xs font-medium text-primary/80">{entry.courseName}</p>
                      {entry.specificDate && (
                        <p className="text-[10px] bg-primary/10 text-primary w-fit px-1.5 py-0.5 rounded">{entry.specificDate}</p>
                      )}
                      {entry.description && <p className="text-[10px] text-muted-foreground">{entry.description}</p>}
                      {entry.meetingUrl && (
                        <a href={entry.meetingUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <Button size="sm" variant="outline" className="h-6 text-[10px] w-full">
                            <Video className="w-3 h-3 mr-1" />
                            {MEETING_PLATFORMS[entry.meetingPlatform as keyof typeof MEETING_PLATFORMS] || "Enlace"}
                          </Button>
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
