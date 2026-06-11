import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  useAdminUsers, useToggleUserActive, useDeleteUser, useUpdateUserRole,
  useAdminMessages, useToggleMessageRead, useDeleteMessage,
  useMemberPosts, useDeleteMemberPost,
  useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent,
  useAllSiteContent, useUpdateSiteContent,
  useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse,
  useCourseEnrollments, useUpdateEnrollment,
  useTeacherRequests, useUpdateTeacherRequest, useDeleteTeacherRequest,
  useUpdateUserInfo, useWhatsappLink, useUpdateWhatsappLink,
  useLiveStreamConfig, useUpdateLiveStream,
  useAdminUserDetail,
} from "@/hooks/use-users";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { RadioLibraryAdmin } from "@/components/admin/RadioLibraryAdmin";
import { isAdminRole } from "@/lib/utils";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Loader2, Search, CheckCircle2, XCircle, UserPlus, Users, Mail,
  MessageSquare, Trash2, Eye, EyeOff, Clock, Calendar,
  Plus, Pencil, FileText, Save, X, GraduationCap, BookOpen, Radio, Download,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ROLES, COURSE_CATEGORIES, ENROLLMENT_STATUSES, ENROLLMENT_MODES, TEACHER_REQUEST_STATUSES, MINISTRY_POSITIONS, MINISTRY_COUNTRIES } from "@shared/schema";
import type { Event as EventType, SiteContent, Course } from "@shared/schema";
import { SiWhatsapp } from "react-icons/si";
import { ChevronDown, ChevronRight, Shield, Upload } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Inline Certificate Preview for Admin panel
function CertificatePreview({ cert, containerId }: { cert: any; containerId: string }) {
  const studentName = cert.studentName || "Estudiante";
  const courseName = cert.courseName || "Curso";
  const teacherName = cert.teacherName || "";
  const grade = cert.grade;
  const customMessage = cert.customMessage || "";
  const signatureUrl = cert.signatureUrl || "";
  const issuedDate = cert.issuedDateOverride
    ? cert.issuedDateOverride
    : cert.issuedAt
      ? format(new Date(cert.issuedAt), "dd 'de' MMMM 'de' yyyy", { locale: es })
      : format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });
  const code = cert.verificationCode || cert.certificateCode || "";

  return (
    <div id={containerId} style={{
      width: "700px", minHeight: "495px",
      background: "linear-gradient(135deg, #fffbeb 0%, #ffffff 40%, #fef3c7 70%, #fff7ed 100%)",
      border: "4px solid #b45309", borderRadius: "12px", position: "relative", overflow: "hidden",
      fontFamily: "'Georgia', 'Times New Roman', serif", boxSizing: "border-box",
      boxShadow: "0 4px 24px rgba(180,83,9,0.12)",
    }}>
      {/* Decorative corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 70, height: 70, borderTop: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderTopLeftRadius: 12, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 70, height: 70, borderTop: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderTopRightRadius: 12, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 70, height: 70, borderBottom: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderBottomLeftRadius: 12, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 70, height: 70, borderBottom: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderBottomRightRadius: 12, pointerEvents: "none" }} />
      {/* Inner border */}
      <div style={{ position: "absolute", top: 10, left: 10, right: 10, bottom: 10, border: "1.5px solid #d9770633", borderRadius: 6, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "32px 40px", textAlign: "center" }}>
        {/* Logo del ministerio */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 6 }}>
          <img
            src="/icons/logo-transparent.png?v4"
            alt="Logo Avivando el Fuego"
            crossOrigin="anonymous"
            style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(180,83,9,0.18))" }}
          />
        </div>
        <h1 style={{ fontSize: "1.4em", color: "#92400e", margin: "0 0 2px", fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase" }}>Avivando el Fuego</h1>
        <p style={{ fontSize: "0.75em", color: "#a16207", margin: "0 0 4px", letterSpacing: 1 }}>Ministerio Evangelístico Internacional</p>
        <div style={{ width: 160, height: 1, background: "linear-gradient(to right, transparent, #d97706, transparent)", margin: "10px auto" }} />
        <h2 style={{ fontSize: "1.5em", color: "#78350f", margin: "6px 0", fontWeight: "normal", letterSpacing: 3, textTransform: "uppercase" }}>Certificado</h2>
        <p style={{ fontSize: "0.8em", color: "#92400e", margin: "2px 0 12px", fontStyle: "italic" }}>de Finalización</p>
        <p style={{ fontSize: "0.85em", color: "#78350f" }}>Se certifica que</p>
        <div style={{ margin: "8px 0", padding: "6px 0", borderBottom: "2px solid #d97706" }}>
          <p style={{ fontSize: "1.7em", color: "#1e3a5f", fontStyle: "italic", margin: 0, fontWeight: "bold" }}>{studentName}</p>
        </div>
        <p style={{ fontSize: "0.85em", color: "#78350f", margin: "10px 0 4px" }}>ha completado satisfactoriamente el curso</p>
        <p style={{ fontSize: "1.3em", color: "#b45309", fontWeight: "bold", margin: "4px 0 10px" }}>«{courseName}»</p>
        {grade && <p style={{ fontSize: "0.85em", color: "#78350f", margin: "4px 0" }}>Calificación: <strong style={{ color: "#b45309" }}>{grade}</strong></p>}
        {customMessage && <p style={{ fontSize: "0.75em", color: "#78350f", margin: "4px 30px", fontStyle: "italic", lineHeight: 1.4 }}>{customMessage}</p>}
        <p style={{ fontSize: "0.75em", color: "#92400e", margin: "6px 0 14px" }}>Otorgado el {issuedDate}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 16, alignItems: "flex-end" }}>
          {teacherName && (
            <div style={{ textAlign: "center" }}>
              {signatureUrl && <img src={signatureUrl} alt="Firma" crossOrigin="anonymous" style={{ width: 120, height: 50, objectFit: "contain", margin: "0 auto 4px" }} />}
              <div style={{ width: 160, borderTop: "2px solid #b4530966", margin: "0 auto", paddingTop: 4 }}>
                <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a5f", fontSize: "0.85em" }}>{teacherName}</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.65em", color: "#92400e" }}>Instructor</p>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <img
              src="/icons/icon-192.png?v4"
              alt=""
              crossOrigin="anonymous"
              style={{ width: 28, height: 28, objectFit: "contain", margin: "0 auto 4px", opacity: 0.7 }}
            />
            <div style={{ width: 160, borderTop: "2px solid #b4530966", margin: "0 auto", paddingTop: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a5f", fontSize: "0.85em" }}>Avivando el Fuego</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.65em", color: "#92400e" }}>Ministerio</p>
            </div>
          </div>
        </div>
        {code && (
          <div style={{ marginTop: 12, padding: "4px 12px", background: "rgba(180,83,9,0.08)", borderRadius: 4, display: "inline-block" }}>
            <p style={{ fontSize: "0.6em", color: "#92400e", margin: 0 }}>Código: <strong>{code}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

const CONTENT_SECTIONS = [
  { key: "home_hero", label: "Inicio - Hero Principal", description: "Texto principal y versiculo de la pagina de inicio" },
  { key: "home_cta", label: "Inicio - Llamado a la Accion", description: "Seccion final de la pagina de inicio" },
  { key: "historia_intro", label: "Historia - Introduccion", description: "Texto introductorio de la pagina de historia" },
  { key: "en_vivo_info", label: "En Vivo - Información", description: "Información sobre transmisiones en vivo" },
  { key: "footer_info", label: "Pie de Pagina", description: "Información del pie de pagina" },
  { key: "anuncio_general", label: "Anuncio General", description: "Anuncio visible en la pagina de inicio" },
];

function LiveStreamAdmin() {
  const { data: config, isLoading } = useLiveStreamConfig();
  const updateLive = useUpdateLiveStream();
  const [sourceType, setSourceType] = useState("radio");
  const [sourceUrl, setSourceUrl] = useState("");
  const [radioUrl, setRadioUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (config) {
      setSourceType(config.sourceType || "radio");
      setSourceUrl(config.sourceUrl || "");
      setRadioUrl(config.radioUrl || "");
      setTitle(config.title || "");
      setIsLive(config.isLive || false);
    }
  }, [config]);

  const handleSave = () => {
    updateLive.mutate({ sourceType, sourceUrl, radioUrl, title, isLive });
  };

  const handleQuickSwitch = (type: string) => {
    if (type === "radio") {
      updateLive.mutate({ sourceType: "radio", sourceUrl: "", radioUrl, title: "", isLive: false });
    } else {
      setSourceType(type);
      setIsLive(true);
    }
  };

  const handleGoLive = () => {
    if (sourceUrl.trim()) {
      updateLive.mutate({ sourceType, sourceUrl, radioUrl, title, isLive: true });
    }
  };

  if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" /> Control de Transmision En Vivo
          </CardTitle>
          <CardDescription>
            Administra la senal de radio y las transmisiones en vivo. Cambia entre radio y plataformas de streaming.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-semibold mb-2 block">Cambio Rapido de Fuente</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={sourceType === "radio" && !isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("radio")}
                data-testid="button-quick-radio"
              >
                <Radio className="w-4 h-4 mr-1" /> Volver a Radio
              </Button>
              <Button
                variant={sourceType === "youtube" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("youtube")}
                data-testid="button-quick-youtube"
              >
                YouTube Live
              </Button>
              <Button
                variant={sourceType === "facebook" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("facebook")}
                data-testid="button-quick-facebook"
              >
                Facebook Live
              </Button>
              <Button
                variant={sourceType === "tiktok" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("tiktok")}
                data-testid="button-quick-tiktok"
              >
                TikTok Live
              </Button>
              <Button
                variant={sourceType === "restream" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("restream")}
                data-testid="button-quick-restream"
              >
                Restream
              </Button>
              <Button
                variant={sourceType === "hls" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("hls")}
                data-testid="button-quick-hls"
              >
                HLS Stream
              </Button>
              <Button
                variant={sourceType === "custom" && isLive ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSwitch("custom")}
                data-testid="button-quick-custom"
              >
                Otra Plataforma
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <Label>URL de la Radio (senal de relleno 24/7)</Label>
              <Input
                value={radioUrl}
                onChange={(e) => setRadioUrl(e.target.value)}
                placeholder="https://stream.example.com/radio.mp3"
                data-testid="input-radio-url"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL del stream de audio (MP3/AAC). Se reproduce cuando no hay transmision en vivo.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={isLive}
                onCheckedChange={setIsLive}
                data-testid="switch-is-live"
              />
              <Label>Activar transmision en vivo (desactiva la radio temporal)</Label>
            </div>

            {isLive && (
              <>
                <div>
                  <Label>Tipo de Fuente</Label>
                  <Select value={sourceType} onValueChange={setSourceType}>
                    <SelectTrigger data-testid="select-source-type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube Live</SelectItem>
                      <SelectItem value="facebook">Facebook Live</SelectItem>
                      <SelectItem value="tiktok">TikTok Live</SelectItem>
                      <SelectItem value="restream">Restream.io (retransmision)</SelectItem>
                      <SelectItem value="hls">HLS Stream (m3u8)</SelectItem>
                      <SelectItem value="custom">Otra Plataforma (iframe)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>URL de la Transmision</Label>
                  <Input
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder={
                      sourceType === "youtube" ? "https://youtube.com/watch?v=XXXXX o https://youtube.com/live/XXXXX" :
                      sourceType === "facebook" ? "https://www.facebook.com/user/videos/XXXXX" :
                      sourceType === "tiktok" ? "https://www.tiktok.com/@user/live" :
                      sourceType === "restream" ? "https://player.restream.io/player/xxxxxxxx" :
                      sourceType === "hls" ? "https://tu-servidor.com/live/stream.m3u8" :
                      "https://..."
                    }
                    data-testid="input-source-url"
                  />
                  {sourceType === "restream" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Usa Restream.io para retransmitir a YouTube, Facebook y TikTok al mismo tiempo. Pega aqui la URL del player embebible que Restream te proporciona.
                    </p>
                  )}
                  {sourceType === "hls" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Pega la URL del stream HLS (.m3u8). Puedes obtenerla de servicios como Restream, Castr, o tu propio servidor RTMP con nginx-rtmp.
                    </p>
                  )}
                </div>

                <div>
                  <Label>Titulo de la Transmision (opcional)</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Culto Dominical, Noche de Avivamiento..."
                    data-testid="input-stream-title"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 border-t pt-4 flex-wrap">
            <Button onClick={handleSave} disabled={updateLive.isPending} data-testid="button-save-live">
              {updateLive.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
              Guardar Configuración
            </Button>
            {isLive && sourceUrl.trim() && (
              <Button onClick={handleGoLive} disabled={updateLive.isPending} variant="destructive" data-testid="button-go-live">
                <Radio className="h-4 w-4 mr-1" /> Transmitir Ahora
              </Button>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isLive ? "bg-red-500" : "bg-green-500"}`} />
              {isLive ? `En vivo por ${sourceType === "youtube" ? "YouTube" : sourceType === "facebook" ? "Facebook" : sourceType === "tiktok" ? "TikTok" : sourceType === "restream" ? "Restream" : sourceType === "hls" ? "HLS Stream" : "Otra plataforma"}` : "Radio activa"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminCourseEnrollments({ courseId, updateEnrollment }: { courseId: number; updateEnrollment: any }) {
  const { data: enrollmentsList, isLoading } = useCourseEnrollments(courseId);
  const [certPreview, setCertPreview] = useState<any>(null);
  const [loadingCert, setLoadingCert] = useState<number | null>(null);
  const [editingCert, setEditingCert] = useState(false);
  const [certEdits, setCertEdits] = useState<Record<string, string>>({});
  const [savingCert, setSavingCert] = useState(false);
  const [uploadingSignature, setUploadingSignature] = useState(false);

  const viewCertificate = async (enrollmentId: number) => {
    setLoadingCert(enrollmentId);
    try {
      const res = await fetch(`/api/certificates/by-enrollment/${enrollmentId}`, { credentials: "include" });
      if (res.ok) {
        const cert = await res.json();
        setCertPreview(cert);
        setEditingCert(false);
        setCertEdits({});
      } else {
        alert("Certificado aún no generado. Intenta marcar como 'Completar y Certificar' primero.");
      }
    } catch { alert("Error al cargar certificado"); }
    setLoadingCert(null);
  };

  const openCertEditor = () => {
    if (!certPreview) return;
    setCertEdits({
      studentName: certPreview.studentNameOverride || certPreview.studentName || "",
      courseName: certPreview.courseNameOverride || certPreview.courseName || "",
      teacherName: certPreview.teacherName || "",
      grade: certPreview.grade || "",
      customMessage: certPreview.customMessage || "",
      issuedDateOverride: certPreview.issuedDateOverride || "",
      signatureUrl: certPreview.signatureUrl || "",
    });
    setEditingCert(true);
  };

  const saveCertChanges = async () => {
    if (!certPreview?.id) return;
    setSavingCert(true);
    try {
      const res = await fetch(`/api/certificates/${certPreview.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          studentNameOverride: certEdits.studentName || null,
          courseNameOverride: certEdits.courseName || null,
          teacherName: certEdits.teacherName || null,
          grade: certEdits.grade || null,
          customMessage: certEdits.customMessage || null,
          issuedDateOverride: certEdits.issuedDateOverride || null,
          signatureUrl: certEdits.signatureUrl || null,
        }),
      });
      if (res.ok) {
        const updatedCert = await res.json();
        setCertPreview(updatedCert);
        setEditingCert(false);
        setCertEdits({});
      } else {
        alert("Error al guardar cambios");
      }
    } catch { alert("Error de conexión al guardar"); }
    setSavingCert(false);
  };

  const uploadSignature = async (file: File) => {
    setUploadingSignature(true);
    try {
      const formData = new FormData();
      formData.append("signature", file);
      const res = await fetch("/api/upload/signature", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        setCertEdits(prev => ({ ...prev, signatureUrl: url }));
      } else {
        alert("Error al subir la firma");
      }
    } catch { alert("Error de conexión al subir firma"); }
    setUploadingSignature(false);
  };

  const downloadCertPdf = async () => {
    const el = document.getElementById("admin-cert-preview");
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
    } catch (err) {
      console.error("PDF error:", err);
    }
  };

  if (isLoading) return <div className="py-4 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (!enrollmentsList?.length) return <p className="text-muted-foreground text-sm py-4 text-center mt-3 border-t">No hay inscripciones en este curso.</p>;

  return (
    <div className="mt-4 pt-3 border-t space-y-2">
      <h4 className="text-sm font-semibold mb-2">Inscripciones del Curso</h4>

      {/* Certificate Preview Card */}
      {certPreview && (
        <div className="mb-4 p-4 border-2 border-orange-300 rounded-lg bg-orange-50/50">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h5 className="font-semibold text-orange-700 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Certificado de {certPreview.studentName}
            </h5>
            <div className="flex gap-2">
              {!editingCert && (
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50" onClick={openCertEditor}>
                  <Pencil className="w-4 h-4 mr-1" /> Editar Certificado
                </Button>
              )}
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={downloadCertPdf}>
                <Download className="w-4 h-4 mr-1" /> Descargar PDF
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setCertPreview(null); setEditingCert(false); setCertEdits({}); }}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Certificate Editor Panel */}
          {editingCert && (
            <div className="mb-4 p-4 border rounded-lg bg-white dark:bg-gray-900 space-y-3">
              <h6 className="font-semibold text-sm flex items-center gap-2 text-blue-700">
                <Pencil className="w-4 h-4" /> Editar Certificado
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Nombre del Estudiante</Label>
                  <Input value={certEdits.studentName || ""} onChange={(e) => setCertEdits(p => ({ ...p, studentName: e.target.value }))} placeholder="Nombre completo" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Nombre del Curso</Label>
                  <Input value={certEdits.courseName || ""} onChange={(e) => setCertEdits(p => ({ ...p, courseName: e.target.value }))} placeholder="Nombre del curso" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Nombre del Instructor</Label>
                  <Input value={certEdits.teacherName || ""} onChange={(e) => setCertEdits(p => ({ ...p, teacherName: e.target.value }))} placeholder="Nombre del instructor" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Calificación</Label>
                  <Input value={certEdits.grade || ""} onChange={(e) => setCertEdits(p => ({ ...p, grade: e.target.value }))} placeholder="Ej: 95" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Fecha de Emisión (personalizada)</Label>
                  <Input value={certEdits.issuedDateOverride || ""} onChange={(e) => setCertEdits(p => ({ ...p, issuedDateOverride: e.target.value }))} placeholder="Ej: 15 de febrero de 2026" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Firma del Instructor</Label>
                  <div className="flex gap-2 items-center">
                    {certEdits.signatureUrl && (
                      <img src={certEdits.signatureUrl} alt="Firma" className="h-10 object-contain border rounded p-1" />
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadSignature(file);
                        }}
                      />
                      <Button size="sm" variant="outline" asChild disabled={uploadingSignature}>
                        <span>
                          <Upload className="w-3 h-3 mr-1" />
                          {uploadingSignature ? "Subiendo..." : certEdits.signatureUrl ? "Cambiar" : "Cargar Firma"}
                        </span>
                      </Button>
                    </label>
                    {certEdits.signatureUrl && (
                      <Button size="sm" variant="ghost" onClick={() => setCertEdits(p => ({ ...p, signatureUrl: "" }))}>
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Mensaje Personalizado (opcional)</Label>
                <Textarea value={certEdits.customMessage || ""} onChange={(e) => setCertEdits(p => ({ ...p, customMessage: e.target.value }))} placeholder="Ej: Por su destacada participación..." rows={2} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={saveCertChanges} disabled={savingCert}>
                  {savingCert ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                  Guardar Cambios
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setEditingCert(false); setCertEdits({}); }}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto flex justify-center">
            <CertificatePreview
              cert={editingCert ? { ...certPreview, studentName: certEdits.studentName, courseName: certEdits.courseName, teacherName: certEdits.teacherName, grade: certEdits.grade, customMessage: certEdits.customMessage, signatureUrl: certEdits.signatureUrl, issuedDateOverride: certEdits.issuedDateOverride } : certPreview}
              containerId="admin-cert-preview"
            />
          </div>
        </div>
      )}

      {enrollmentsList.map((e: any) => (
        <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`admin-enrollment-${e.id}`}>
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={e.user.avatarUrl} />
              <AvatarFallback className="text-xs">
                {(e.user.displayName || e.user.username || "?").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm">{e.user.displayName || e.user.username}</p>
              <p className="text-xs text-muted-foreground">@{e.user.username} - {ROLES[e.user.role as keyof typeof ROLES]}</p>
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
                <Button size="sm" variant="outline" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "aprobado" } })} data-testid={`button-admin-approve-enrollment-${e.id}`}>
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Aprobar
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "rechazado" } })} data-testid={`button-admin-reject-enrollment-${e.id}`}>
                  <XCircle className="w-4 h-4 mr-1" /> Rechazar
                </Button>
              </>
            )}
            {e.status === "aprobado" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "completado" } })} data-testid={`button-admin-complete-enrollment-${e.id}`}>
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Completar y Certificar
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "solicitado" } })} data-testid={`button-admin-revert-approved-${e.id}`}>
                  <XCircle className="w-4 h-4 mr-1" /> Revertir
                </Button>
              </>
            )}
            {e.status === "completado" && (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">Certificado Generado</Badge>
                <Button size="sm" variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50" onClick={() => viewCertificate(e.id)} disabled={loadingCert === e.id}>
                  {loadingCert === e.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <GraduationCap className="w-4 h-4 mr-1" />}
                  Ver Certificado
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateEnrollment.mutate({ id: e.id, courseId, updates: { status: "aprobado" } })} data-testid={`button-admin-revert-enrollment-${e.id}`}>
                  <XCircle className="w-4 h-4 mr-1" /> Revertir
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: users, isLoading: isLoadingUsers } = useAdminUsers();
  const toggleActive = useToggleUserActive();
  const deleteUser = useDeleteUser();
  const updateUserRole = useUpdateUserRole();
  const { data: contactMessages, isLoading: isLoadingMessages } = useAdminMessages();
  const toggleMessageRead = useToggleMessageRead();
  const deleteMessage = useDeleteMessage();
  const { data: posts, isLoading: isLoadingPosts } = useMemberPosts();
  const deleteMemberPost = useDeleteMemberPost();
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { data: siteContentList } = useAllSiteContent();
  const updateSiteContent = useUpdateSiteContent();
  const { data: allCourses, isLoading: isLoadingCourses } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const updateEnrollment = useUpdateEnrollment();
  const { data: teacherRequestsList } = useTeacherRequests();
  const updateTeacherRequest = useUpdateTeacherRequest();
  const deleteTeacherRequest = useDeleteTeacherRequest();
  const updateUserInfo = useUpdateUserInfo();
  const { data: whatsappData } = useWhatsappLink();
  const updateWhatsappLink = useUpdateWhatsappLink();
  const [search, setSearch] = useState("");
  const [editingUserInfo, setEditingUserInfo] = useState<number | null>(null);
  const [userInfoForm, setUserInfoForm] = useState({ cargo: "", country: "" });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: userDetail, isLoading: isLoadingDetail } = useAdminUserDetail(selectedUserId);
  const [whatsappLinkEdit, setWhatsappLinkEdit] = useState(false);
  const [whatsappLinkValue, setWhatsappLinkValue] = useState("");
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "", description: "", location: "", eventDate: "", eventEndDate: "", imageUrl: "", isPublished: true,
  });

  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [contentForm, setContentForm] = useState({ title: "", content: "" });

  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "", description: "", category: "general", imageUrl: "", maxStudents: "", teacherId: "", isActive: true,
    enrollmentStatus: "open", enrollmentOpenDate: "", enrollmentCloseDate: "",
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdminRole(user.role))) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !isAdminRole(user?.role)) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const pendingUsers = users?.filter((u: any) => !u.isActive) || [];
  const activeUsers = users?.filter((u: any) => u.isActive) || [];
  const unreadMessages = contactMessages?.filter((m: any) => !m.isRead) || [];
  const obreros = users?.filter((u: any) => u.isActive) || [];

  const filteredUsers = users?.filter(
    (u: any) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      (u.displayName && u.displayName.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
      (u.phone && u.phone.includes(search))
  );

  function openNewEventDialog() {
    setEditingEvent(null);
    setEventForm({ title: "", description: "", location: "", eventDate: "", eventEndDate: "", imageUrl: "", isPublished: true });
    setEventDialogOpen(true);
  }

  function openEditEventDialog(event: EventType) {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate ? new Date(event.eventDate as any).toISOString().slice(0, 16) : "",
      eventEndDate: event.eventEndDate ? new Date(event.eventEndDate as any).toISOString().slice(0, 16) : "",
      imageUrl: event.imageUrl || "",
      isPublished: event.isPublished,
    });
    setEventDialogOpen(true);
  }

  async function handleEventSubmit() {
    const data = {
      title: eventForm.title,
      description: eventForm.description,
      location: eventForm.location,
      eventDate: eventForm.eventDate,
      eventEndDate: eventForm.eventEndDate || null,
      imageUrl: eventForm.imageUrl || null,
      isPublished: eventForm.isPublished,
    };
    if (editingEvent) {
      await updateEvent.mutateAsync({ id: editingEvent.id, updates: data });
    } else {
      await createEvent.mutateAsync(data);
    }
    setEventDialogOpen(false);
  }

  function openContentEditor(key: string) {
    const existing = siteContentList?.find((c: SiteContent) => c.sectionKey === key);
    setEditingContent(key);
    setContentForm({ title: existing?.title || "", content: existing?.content || "" });
  }

  async function handleContentSave() {
    if (!editingContent) return;
    await updateSiteContent.mutateAsync({
      key: editingContent,
      data: { title: contentForm.title || null, content: contentForm.content || null },
    });
    setEditingContent(null);
  }

  function openNewCourseDialog() {
    setEditingCourse(null);
    setCourseForm({ title: "", description: "", category: "general", imageUrl: "", maxStudents: "", teacherId: "", isActive: true, enrollmentStatus: "open", enrollmentOpenDate: "", enrollmentCloseDate: "" });
    setCourseDialogOpen(true);
  }

  function openEditCourseDialog(course: Course) {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      imageUrl: course.imageUrl || "",
      maxStudents: course.maxStudents ? String(course.maxStudents) : "",
      teacherId: course.teacherId ? String(course.teacherId) : "",
      isActive: course.isActive,
      enrollmentStatus: (course as any).enrollmentStatus || "open",
      enrollmentOpenDate: (course as any).enrollmentOpenDate ? new Date((course as any).enrollmentOpenDate).toISOString().slice(0, 16) : "",
      enrollmentCloseDate: (course as any).enrollmentCloseDate ? new Date((course as any).enrollmentCloseDate).toISOString().slice(0, 16) : "",
    });
    setCourseDialogOpen(true);
  }

  async function handleCourseSubmit() {
    const data: any = {
      title: courseForm.title,
      description: courseForm.description,
      category: courseForm.category,
      imageUrl: courseForm.imageUrl || null,
      maxStudents: courseForm.maxStudents ? parseInt(courseForm.maxStudents) : null,
      teacherId: courseForm.teacherId && courseForm.teacherId !== "none" ? parseInt(courseForm.teacherId) : null,
      isActive: courseForm.isActive,
      enrollmentStatus: courseForm.enrollmentStatus,
      enrollmentOpenDate: courseForm.enrollmentOpenDate || null,
      enrollmentCloseDate: courseForm.enrollmentCloseDate || null,
    };
    if (editingCourse) {
      await updateCourse.mutateAsync({ id: editingCourse.id, updates: data });
    } else {
      await createCourse.mutateAsync(data);
    }
    setCourseDialogOpen(false);
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-admin-title">Panel de Administración</h1>
            <p className="text-muted-foreground mt-1">Gestiona miembros, cursos, eventos, contenido y mensajes del ministerio.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" /> Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold" data-testid="text-total-users">{users?.length || 0}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Activos
              </CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600" data-testid="text-active-users">{activeUsers.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Cursos
              </CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold" data-testid="text-total-courses">{allCourses?.length || 0}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Eventos
              </CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold" data-testid="text-total-events">{allEvents?.length || 0}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Mensajes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-unread-messages">
                {unreadMessages.length} <span className="text-sm font-normal text-muted-foreground">sin leer</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={pendingUsers.length > 0 ? "pending" : "courses"}>
          <TabsList className="mb-4 flex-wrap">
            <TabsTrigger value="pending" className="gap-2" data-testid="tab-pending">
              <UserPlus className="h-4 w-4" /> Solicitudes
              {pendingUsers.length > 0 && <Badge variant="destructive" className="ml-1">{pendingUsers.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2" data-testid="tab-courses">
              <GraduationCap className="h-4 w-4" /> Cursos
              {allCourses && (() => { const pc = allCourses.reduce((s: number, c: any) => s + ((c as any).pendingCount || 0), 0); return pc > 0 ? <Badge variant="destructive" className="ml-1">{pc}</Badge> : null; })()}
            </TabsTrigger>
            <TabsTrigger value="teacher-requests" className="gap-2" data-testid="tab-teacher-requests">
              <BookOpen className="h-4 w-4" /> Maestros
              {teacherRequestsList?.filter((r: any) => r.status === "solicitado").length > 0 && (
                <Badge variant="destructive" className="ml-1">{teacherRequestsList.filter((r: any) => r.status === "solicitado").length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2" data-testid="tab-events">
              <Calendar className="h-4 w-4" /> Eventos
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2" data-testid="tab-content">
              <FileText className="h-4 w-4" /> Contenido
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2" data-testid="tab-users">
              <Users className="h-4 w-4" /> Miembros
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2" data-testid="tab-messages">
              <Mail className="h-4 w-4" /> Contacto
              {unreadMessages.length > 0 && <Badge variant="destructive" className="ml-1">{unreadMessages.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2" data-testid="tab-posts">
              <MessageSquare className="h-4 w-4" /> Publicaciones
            </TabsTrigger>
            <TabsTrigger value="radio-library" className="gap-2" data-testid="tab-radio-library">
              <Upload className="h-4 w-4" /> Biblioteca Radio
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2" data-testid="tab-live">
              <Radio className="h-4 w-4" /> En Vivo
            </TabsTrigger>
          </TabsList>

          {/* Solicitudes Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes</CardTitle>
                <CardDescription>Usuarios que solicitan unirse al ministerio.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingUsers ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : pendingUsers.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground">No hay solicitudes pendientes.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Rol Solicitado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.map((u: any) => (
                        <TableRow key={u.id} data-testid={`row-pending-${u.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/5 text-primary text-xs">
                                  {u.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-semibold">{u.displayName || u.username}</span>
                                <span className="text-xs text-muted-foreground">@{u.username}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{ROLES[u.role as keyof typeof ROLES] || u.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-ES') : '-'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" onClick={() => toggleActive.mutate(u.id)} disabled={toggleActive.isPending} data-testid={`button-approve-${u.id}`}>
                                <CheckCircle2 className="h-4 w-4 mr-1" /> Aprobar
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteUser.mutate(u.id)} disabled={deleteUser.isPending} data-testid={`button-reject-${u.id}`}>
                                <XCircle className="h-4 w-4 mr-1" /> Rechazar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cursos Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gestión de Cursos</CardTitle>
                    <CardDescription>Crea cursos y asigna maestros.</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={openNewCourseDialog} data-testid="button-new-course">
                      <Plus className="h-4 w-4 mr-1" /> Nuevo Curso
                    </Button>
                    <Button variant="outline" onClick={async () => {
                      try {
                        const res = await fetch("/api/certificates/backfill", { method: "POST", credentials: "include" });
                        const data = await res.json();
                        alert(data.message || "Certificados generados");
                      } catch { alert("Error al generar certificados"); }
                    }} data-testid="button-backfill-certs">
                      <GraduationCap className="h-4 w-4 mr-1" /> Generar Certificados Retroactivos
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingCourses ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : !allCourses?.length ? (
                  <div className="p-12 text-center text-muted-foreground">
                    No hay cursos creados. Haz clic en "Nuevo Curso" para crear uno.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allCourses.map((course: Course) => {
                      const teacher = users?.find((u: any) => u.id === course.teacherId);
                      const isExpanded = expandedCourse === course.id;
                      return (
                        <Card key={course.id} data-testid={`admin-course-${course.id}`}>
                          <CardContent className="pt-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="font-semibold">{course.title}</span>
                                  <Badge variant="secondary">{COURSE_CATEGORIES[course.category as keyof typeof COURSE_CATEGORIES] || course.category}</Badge>
                                  {!course.isActive && <Badge variant="outline">Inactivo</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                                  {teacher && <span>Maestro: {teacher.displayName || teacher.username}</span>}
                                  {!teacher && <span className="text-primary">Sin maestro asignado</span>}
                                  <span>Inscritos: {(course as any).enrolledCount || 0}{course.maxStudents ? `/${course.maxStudents}` : ""}</span>
                                  {(course as any).pendingCount > 0 && (
                                    <Badge variant="destructive" className="text-xs animate-pulse">{(course as any).pendingCount} solicitud(es) pendiente(s)</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant={(course as any).pendingCount > 0 ? "default" : "ghost"} size="sm" onClick={() => setExpandedCourse(isExpanded ? null : course.id)} data-testid={`button-expand-enrollments-${course.id}`}>
                                  {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                                  Inscripciones {(course as any).pendingCount > 0 && `(${(course as any).pendingCount})`}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => openEditCourseDialog(course)} data-testid={`button-edit-course-${course.id}`}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteCourse.mutate(course.id)} disabled={deleteCourse.isPending} data-testid={`button-delete-course-${course.id}`}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            {isExpanded && (
                              <AdminCourseEnrollments courseId={course.id} updateEnrollment={updateEnrollment} />
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teacher Requests Tab */}
          <TabsContent value="teacher-requests">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes de Maestros</CardTitle>
                <CardDescription>Obreros que solicitan ensenar un curso. Al aprobar, el obrero se asigna automaticamente como maestro del curso.</CardDescription>
              </CardHeader>
              <CardContent>
                {!teacherRequestsList?.length ? (
                  <div className="p-12 text-center text-muted-foreground">No hay solicitudes de maestros.</div>
                ) : (
                  <div className="space-y-3">
                    {teacherRequestsList.map((req: any) => (
                      <div key={req.id} className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-md bg-muted/50" data-testid={`teacher-request-${req.id}`}>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{req.user.displayName || req.user.username}</p>
                          <p className="text-xs text-muted-foreground">@{req.user.username} - {ROLES[req.user.role as keyof typeof ROLES]}</p>
                          <p className="text-sm mt-1">Curso: <span className="font-semibold">{req.course.title}</span></p>
                          {req.message && <p className="text-sm text-muted-foreground mt-1 italic">"{req.message}"</p>}
                          <span className="text-xs text-muted-foreground">{req.createdAt ? new Date(req.createdAt).toLocaleString('es-ES') : ''}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={req.status === "aprobado" ? "default" : req.status === "rechazado" ? "destructive" : "outline"}>
                            {TEACHER_REQUEST_STATUSES[req.status as keyof typeof TEACHER_REQUEST_STATUSES]}
                          </Badge>
                          {req.status === "solicitado" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => updateTeacherRequest.mutate({ id: req.id, updates: { status: "aprobado" } })} data-testid={`button-approve-teacher-${req.id}`}>
                                <CheckCircle2 className="w-4 h-4 mr-1" /> Aprobar
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => updateTeacherRequest.mutate({ id: req.id, updates: { status: "rechazado" } })} data-testid={`button-reject-teacher-${req.id}`}>
                                <XCircle className="w-4 h-4 mr-1" /> Rechazar
                              </Button>
                            </>
                          )}
                          <Button size="icon" variant="ghost" onClick={() => deleteTeacherRequest.mutate(req.id)} data-testid={`button-delete-teacher-request-${req.id}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eventos Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gestión de Eventos</CardTitle>
                    <CardDescription>Crea, edita y gestiona los eventos del ministerio.</CardDescription>
                  </div>
                  <Button onClick={openNewEventDialog} data-testid="button-new-event">
                    <Plus className="h-4 w-4 mr-1" /> Nuevo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingEvents ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : !allEvents?.length ? (
                  <div className="p-12 text-center text-muted-foreground">No hay eventos creados.</div>
                ) : (
                  <div className="space-y-3">
                    {allEvents.map((event: EventType) => {
                      const isPast = new Date(event.eventDate as any) < new Date();
                      return (
                        <Card key={event.id} className={isPast ? "opacity-60" : ""} data-testid={`admin-event-${event.id}`}>
                          <CardContent className="pt-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="font-semibold">{event.title}</span>
                                  {!event.isPublished && <Badge variant="secondary">Borrador</Badge>}
                                  {isPast && <Badge variant="outline">Pasado</Badge>}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(event.eventDate as any).toLocaleDateString("es-ES")}</span>
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={() => openEditEventDialog(event)} data-testid={`button-edit-event-${event.id}`}><Pencil className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteEvent.mutate(event.id)} disabled={deleteEvent.isPending} data-testid={`button-delete-event-${event.id}`}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Contenido</CardTitle>
                <CardDescription>Modifica el contenido de las secciones del sitio web.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CONTENT_SECTIONS.map((section) => {
                    const existing = siteContentList?.find((c: SiteContent) => c.sectionKey === section.key);
                    const isEditing = editingContent === section.key;
                    return (
                      <Card key={section.key} data-testid={`content-section-${section.key}`}>
                        <CardContent className="pt-4">
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-semibold">{section.label}</h4>
                                <div className="flex items-center gap-1">
                                  <Button size="sm" onClick={handleContentSave} disabled={updateSiteContent.isPending} data-testid={`button-save-content-${section.key}`}>
                                    <Save className="h-4 w-4 mr-1" /> Guardar
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingContent(null)}><X className="h-4 w-4" /></Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div><Label>Titulo</Label><Input value={contentForm.title} onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })} data-testid={`input-content-title-${section.key}`} /></div>
                                <div><Label>Contenido</Label><Textarea value={contentForm.content} onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })} className="resize-none" rows={4} data-testid={`textarea-content-${section.key}`} /></div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="font-semibold">{section.label}</h4>
                                <p className="text-xs text-muted-foreground">{section.description}</p>
                                {existing?.title && <p className="text-sm mt-1"><span className="text-muted-foreground">Titulo:</span> {existing.title}</p>}
                                {existing?.content && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{existing.content}</p>}
                                {!existing?.title && !existing?.content && <p className="text-xs text-muted-foreground mt-1 italic">Sin contenido personalizado</p>}
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => openContentEditor(section.key)} data-testid={`button-edit-content-${section.key}`}><Pencil className="h-4 w-4" /></Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Miembros Tab - with role management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Miembros del Ministerio</CardTitle>
                    <CardDescription>Gestiona miembros, cambia roles, estados, cargos y paises.</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-users" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingUsers ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email / Telefono</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Cargo / Pais</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.map((u: any) => (
                        <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                {u.avatarUrl && <AvatarImage src={u.avatarUrl} alt={u.displayName || u.username} />}
                                <AvatarFallback className="bg-primary/5 text-primary text-xs">
                                  {(u.displayName || u.username).slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-semibold">{u.displayName || u.username}</span>
                                <span className="text-xs text-muted-foreground">@{u.username}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              {u.email ? (
                                <span className="text-xs text-muted-foreground truncate max-w-[180px]" title={u.email}>{u.email}</span>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                              {u.phone && (
                                <span className="text-xs text-muted-foreground">{u.phone}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {u.id === user?.id ? (
                              <Badge variant="default">{ROLES[u.role as keyof typeof ROLES]}</Badge>
                            ) : (
                              <Select value={u.role} onValueChange={(role) => updateUserRole.mutate({ id: u.id, role })}>
                                <SelectTrigger className="w-[140px]" data-testid={`select-role-${u.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(ROLES).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUserInfo === u.id ? (
                              <div className="space-y-1">
                                <Select value={userInfoForm.cargo || "none"} onValueChange={(v) => setUserInfoForm(f => ({ ...f, cargo: v === "none" ? "" : v }))}>
                                  <SelectTrigger className="w-[160px]" data-testid={`select-cargo-${u.id}`}>
                                    <SelectValue placeholder="Cargo..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">Sin cargo</SelectItem>
                                    {MINISTRY_POSITIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <Select value={userInfoForm.country || "none"} onValueChange={(v) => setUserInfoForm(f => ({ ...f, country: v === "none" ? "" : v }))}>
                                  <SelectTrigger className="w-[160px]" data-testid={`select-country-${u.id}`}>
                                    <SelectValue placeholder="Pais..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">Sin pais</SelectItem>
                                    {MINISTRY_COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-1">
                                  <Button size="sm" variant="outline" onClick={() => {
                                    updateUserInfo.mutate({ id: u.id, cargo: userInfoForm.cargo || null, country: userInfoForm.country || null });
                                    setEditingUserInfo(null);
                                  }} data-testid={`button-save-info-${u.id}`}>
                                    <Save className="w-3 h-3 mr-1" /> Guardar
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingUserInfo(null)}>
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1">
                                {u.cargo && <Badge variant="secondary" className="text-xs">{u.cargo}</Badge>}
                                {u.country && <span className="text-xs text-muted-foreground">{u.country}</span>}
                                {!u.cargo && !u.country && <span className="text-xs text-muted-foreground">-</span>}
                                <Button size="sm" variant="ghost" className="w-fit p-0 h-auto text-xs text-muted-foreground" onClick={() => {
                                  setEditingUserInfo(u.id);
                                  setUserInfoForm({ cargo: u.cargo || "", country: u.country || "" });
                                }} data-testid={`button-edit-info-${u.id}`}>
                                  <Pencil className="w-3 h-3 mr-1" /> Editar
                                </Button>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {u.isActive ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Clock className="h-4 w-4 text-primary" />}
                              <span className={`text-sm ${u.isActive ? "text-green-700 dark:text-green-400" : "text-primary"}`}>
                                {u.isActive ? "Activo" : "Pendiente"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => setSelectedUserId(u.id)} data-testid={`button-view-detail-${u.id}`}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => toggleActive.mutate(u.id)} disabled={u.id === user?.id || toggleActive.isPending} data-testid={`button-toggle-${u.id}`}>
                                {u.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                              </Button>
                              {u.id !== user?.id && (
                                <Button variant="ghost" size="icon" onClick={() => deleteUser.mutate(u.id)} disabled={deleteUser.isPending} data-testid={`button-delete-user-${u.id}`}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers?.length === 0 && (
                        <TableRow><TableCell colSpan={6} className="h-24 text-center">No se encontraron usuarios.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* WhatsApp Group Link Management */}
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <SiWhatsapp className="h-5 w-5 text-green-500" />
                  <CardTitle>Enlace de Grupo WhatsApp</CardTitle>
                </div>
                <CardDescription>Configura el enlace del grupo de WhatsApp del Club de Lectura. Los miembros podran verlo y unirse desde la seccion de Biblioteca.</CardDescription>
              </CardHeader>
              <CardContent>
                {whatsappLinkEdit ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Input
                      placeholder="https://chat.whatsapp.com/..."
                      value={whatsappLinkValue}
                      onChange={(e) => setWhatsappLinkValue(e.target.value)}
                      className="flex-1"
                      data-testid="input-whatsapp-link"
                    />
                    <Button size="sm" onClick={() => {
                      updateWhatsappLink.mutate(whatsappLinkValue);
                      setWhatsappLinkEdit(false);
                    }} disabled={updateWhatsappLink.isPending} data-testid="button-save-whatsapp">
                      <Save className="w-4 h-4 mr-1" /> Guardar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setWhatsappLinkEdit(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-wrap">
                    {whatsappData?.link ? (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-green-600 dark:text-green-400 truncate">{whatsappData.link}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay enlace configurado.</p>
                    )}
                    <Button size="sm" variant="outline" onClick={() => {
                      setWhatsappLinkValue(whatsappData?.link || "");
                      setWhatsappLinkEdit(true);
                    }} data-testid="button-edit-whatsapp">
                      <Pencil className="w-4 h-4 mr-1" /> {whatsappData?.link ? "Editar" : "Agregar"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Dialog open={!!selectedUserId} onOpenChange={(open) => { if (!open) setSelectedUserId(null); }}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {isLoadingDetail ? (
                  <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : userDetail ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3" data-testid="text-user-detail-name">
                        <Avatar className="h-14 w-14 border-2 border-primary/20">
                          {userDetail.user.avatarUrl && <AvatarImage src={userDetail.user.avatarUrl} alt={userDetail.user.displayName || userDetail.user.username} />}
                          <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {(userDetail.user.displayName || userDetail.user.username).slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-xl">{userDetail.user.displayName || userDetail.user.username}</span>
                          <p className="text-sm text-muted-foreground font-normal">@{userDetail.user.username} · ID: {userDetail.user.id}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" data-testid="badge-user-role">
                              {ROLES[userDetail.user.role as keyof typeof ROLES] || userDetail.user.role}
                            </Badge>
                            <Badge variant={userDetail.user.isActive ? "outline" : "destructive"} data-testid="badge-user-status">
                              {userDetail.user.isActive ? "Activo" : "Pendiente"}
                            </Badge>
                            {userDetail.user.emailVerified ? (
                              <Badge variant="outline" className="text-green-600 border-green-300">Email Verificado</Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-600 border-amber-300">Email No Verificado</Badge>
                            )}
                          </div>
                        </div>
                      </DialogTitle>
                      <DialogDescription>Información completa del usuario en el sistema</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Datos del Perfil */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><Users className="h-4 w-4" /> Datos del Perfil</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div data-testid="text-user-country">
                              <span className="text-muted-foreground block text-xs mb-0.5">Pais</span>
                              <span className="font-medium">{userDetail.user.country || "No especificado"}</span>
                            </div>
                            <div data-testid="text-user-cargo">
                              <span className="text-muted-foreground block text-xs mb-0.5">Cargo</span>
                              <span className="font-medium">{userDetail.user.cargo || "Sin cargo"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Email</span>
                              <span className="font-medium">{userDetail.user.email || "No registrado"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Telefono</span>
                              <span className="font-medium">{userDetail.user.phone || "No registrado"}</span>
                            </div>
                            <div className="col-span-2" data-testid="text-user-bio">
                              <span className="text-muted-foreground block text-xs mb-0.5">Biografia</span>
                              <span className="font-medium">{userDetail.user.bio || "Sin biografia"}</span>
                            </div>
                            <div data-testid="text-user-registered">
                              <span className="text-muted-foreground block text-xs mb-0.5">Fecha de Registro</span>
                              <span className="font-medium">{userDetail.user.createdAt ? new Date(userDetail.user.createdAt).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" }) : "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Nombre de Usuario</span>
                              <span className="font-medium font-mono text-xs">@{userDetail.user.username}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Redes Sociales */}
                      {(userDetail.user.facebook || userDetail.user.instagram || userDetail.user.youtube || userDetail.user.tiktok || userDetail.user.twitter || userDetail.user.website) && (
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2"><Eye className="h-4 w-4" /> Redes Sociales</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {userDetail.user.facebook && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">Facebook:</span>
                                  <a href={userDetail.user.facebook.startsWith("http") ? userDetail.user.facebook : `https://${userDetail.user.facebook}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.facebook}</a>
                                </div>
                              )}
                              {userDetail.user.instagram && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">Instagram:</span>
                                  <a href={userDetail.user.instagram.startsWith("http") ? userDetail.user.instagram : `https://instagram.com/${userDetail.user.instagram}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.instagram}</a>
                                </div>
                              )}
                              {userDetail.user.youtube && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">YouTube:</span>
                                  <a href={userDetail.user.youtube.startsWith("http") ? userDetail.user.youtube : `https://${userDetail.user.youtube}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.youtube}</a>
                                </div>
                              )}
                              {userDetail.user.tiktok && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">TikTok:</span>
                                  <a href={userDetail.user.tiktok.startsWith("http") ? userDetail.user.tiktok : `https://tiktok.com/@${userDetail.user.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.tiktok}</a>
                                </div>
                              )}
                              {userDetail.user.twitter && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">Twitter/X:</span>
                                  <a href={userDetail.user.twitter.startsWith("http") ? userDetail.user.twitter : `https://x.com/${userDetail.user.twitter}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.twitter}</a>
                                </div>
                              )}
                              {userDetail.user.website && (
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-xs">Sitio Web:</span>
                                  <a href={userDetail.user.website.startsWith("http") ? userDetail.user.website : `https://${userDetail.user.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs truncate">{userDetail.user.website}</a>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Credenciales del Sistema */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4" /> Credenciales del Sistema</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Usuario de Acceso</span>
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{userDetail.user.username}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Contrasena</span>
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground">••••••••</span>
                              <p className="text-[10px] text-muted-foreground mt-1">La contrasena esta cifrada y no se puede visualizar por seguridad.</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Verificacion de Email</span>
                              {userDetail.user.emailVerified ? (
                                <Badge variant="outline" className="text-green-600 border-green-300 text-xs"><CheckCircle2 className="h-3 w-3 mr-1" />Verificado</Badge>
                              ) : (
                                <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>
                              )}
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-xs mb-0.5">Estado de Cuenta</span>
                              {userDetail.user.isActive ? (
                                <Badge variant="outline" className="text-green-600 border-green-300 text-xs"><CheckCircle2 className="h-3 w-3 mr-1" />Activa</Badge>
                              ) : (
                                <Badge variant="outline" className="text-red-600 border-red-300 text-xs"><XCircle className="h-3 w-3 mr-1" />Inactiva</Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Inscripciones */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Inscripciones en Cursos ({userDetail.enrollments?.length || 0})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {userDetail.enrollments?.length > 0 ? (
                            <div className="space-y-2">
                              {userDetail.enrollments.map((e: any) => (
                                <div key={e.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0" data-testid={`enrollment-${e.id}`}>
                                  <div>
                                    <span className="font-medium">{e.courseName}</span>
                                    <p className="text-xs text-muted-foreground">
                                      Inscrito: {e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString("es") : "N/A"}
                                    </p>
                                  </div>
                                  <Badge variant={e.status === "aprobado" ? "default" : e.status === "completado" ? "outline" : "secondary"}>
                                    {ENROLLMENT_STATUSES[e.status as keyof typeof ENROLLMENT_STATUSES] || e.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No tiene inscripciones.</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Certificados */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><Download className="h-4 w-4" /> Certificados ({userDetail.certificates?.length || 0})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {userDetail.certificates?.length > 0 ? (
                            <div className="space-y-2">
                              {userDetail.certificates.map((c: any) => (
                                <div key={c.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                                  <div>
                                    <span className="font-medium">{c.course?.title || "Curso"}</span>
                                    <p className="text-xs text-muted-foreground">
                                      Codigo: {c.certificateCode}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    {c.grade && <Badge variant="secondary" className="text-xs">Nota: {c.grade}</Badge>}
                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                      {c.issuedAt ? new Date(c.issuedAt).toLocaleDateString("es") : ""}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No tiene certificados.</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Publicaciones */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Publicaciones en Comunidad ({userDetail.posts?.length || 0})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {userDetail.posts?.length > 0 ? (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {userDetail.posts.slice(0, 10).map((p: any) => (
                                <div key={p.id} className="text-sm border-b pb-2 last:border-0" data-testid={`post-${p.id}`}>
                                  <p className="line-clamp-2">{p.content}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString("es") : ""}
                                  </p>
                                </div>
                              ))}
                              {userDetail.posts.length > 10 && (
                                <p className="text-xs text-muted-foreground">...y {userDetail.posts.length - 10} publicaciones mas.</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No tiene publicaciones.</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Asistencia */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Asistencia ({userDetail.attendance?.length || 0} registros)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {userDetail.attendance?.length > 0 ? (
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {userDetail.attendance.slice(0, 10).map((a: any) => (
                                <div key={a.id} className="flex items-center justify-between text-sm" data-testid={`attendance-${a.id}`}>
                                  <span className="text-muted-foreground">{a.createdAt ? new Date(a.createdAt).toLocaleDateString("es") : ""}</span>
                                  <Badge variant={a.status === "presente" ? "outline" : a.status === "ausente" ? "destructive" : "secondary"}>
                                    {a.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No tiene registros de asistencia.</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedUserId(null)} data-testid="button-close-detail">Cerrar</Button>
                    </DialogFooter>
                  </>
                ) : null}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Contacto Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes de Contacto</CardTitle>
                <CardDescription>Mensajes recibidos a traves del formulario de contacto.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingMessages ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : !contactMessages?.length ? (
                  <div className="p-12 text-center text-muted-foreground">No hay mensajes de contacto.</div>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map((msg: any) => (
                      <Card key={msg.id} className={msg.isRead ? "opacity-60" : ""} data-testid={`card-message-${msg.id}`}>
                        <CardContent className="pt-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold">{msg.name}</span>
                                <span className="text-xs text-muted-foreground">({msg.email})</span>
                                {!msg.isRead && <Badge variant="default">Nuevo</Badge>}
                              </div>
                              <div className="text-sm font-medium text-primary mb-1">{msg.subject}</div>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.content}</p>
                              <span className="text-xs text-muted-foreground mt-2 block">{msg.createdAt ? new Date(msg.createdAt).toLocaleString('es-ES') : ''}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" onClick={() => toggleMessageRead.mutate(msg.id)} data-testid={`button-toggle-read-${msg.id}`}>
                                {msg.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteMessage.mutate(msg.id)} data-testid={`button-delete-message-${msg.id}`}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publicaciones Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Publicaciones de Miembros</CardTitle>
                <CardDescription>Mensajes publicados por los miembros en la comunidad.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPosts ? (
                  <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                ) : !posts?.length ? (
                  <div className="p-12 text-center text-muted-foreground">No hay publicaciones aun.</div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post: any) => (
                      <Card key={post.id} data-testid={`card-post-${post.id}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="bg-primary/5 text-primary text-xs">
                                    {(post.user?.username || '??').slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">{post.user?.displayName || post.user?.username || 'Usuario'}</span>
                                <span className="text-xs text-muted-foreground">{post.createdAt ? new Date(post.createdAt).toLocaleString('es-ES') : ''}</span>
                              </div>
                              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteMemberPost.mutate(post.id)} data-testid={`button-delete-post-${post.id}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biblioteca Radio Tab */}
          <TabsContent value="radio-library">
            <RadioLibraryAdmin />
          </TabsContent>

          {/* En Vivo Tab */}
          <TabsContent value="live">
            <LiveStreamAdmin />
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Editar Evento" : "Nuevo Evento"}</DialogTitle>
            <DialogDescription>{editingEvent ? "Modifica los detalles del evento." : "Completa los datos para crear un nuevo evento."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Titulo *</Label><Input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} data-testid="input-event-title" /></div>
            <div><Label>Descripción *</Label><Textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="resize-none" rows={3} data-testid="input-event-description" /></div>
            <div><Label>Ubicacion *</Label><Input value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} data-testid="input-event-location" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Fecha y Hora Inicio *</Label><Input type="datetime-local" value={eventForm.eventDate} onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })} data-testid="input-event-date" /></div>
              <div><Label>Fecha y Hora Fin</Label><Input type="datetime-local" value={eventForm.eventEndDate} onChange={(e) => setEventForm({ ...eventForm, eventEndDate: e.target.value })} data-testid="input-event-end-date" /></div>
            </div>
            <div><Label>URL de Imagen (opcional)</Label><Input value={eventForm.imageUrl} onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })} data-testid="input-event-image" /></div>
            <div className="flex items-center gap-3">
              <Switch checked={eventForm.isPublished} onCheckedChange={(checked) => setEventForm({ ...eventForm, isPublished: checked })} data-testid="switch-event-published" />
              <Label>Publicar evento</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEventDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleEventSubmit} disabled={!eventForm.title || !eventForm.description || !eventForm.location || !eventForm.eventDate || createEvent.isPending || updateEvent.isPending} data-testid="button-submit-event">
              {createEvent.isPending || updateEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {editingEvent ? "Guardar Cambios" : "Crear Evento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Dialog */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Editar Curso" : "Nuevo Curso"}</DialogTitle>
            <DialogDescription>{editingCourse ? "Modifica los detalles del curso." : "Completa los datos para crear un nuevo curso de capacitacion."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Titulo *</Label><Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} data-testid="input-course-title" /></div>
            <div><Label>Descripción *</Label><Textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} className="resize-none" rows={3} data-testid="input-course-description" /></div>
            <div><Label>Categoria</Label>
              <Select value={courseForm.category} onValueChange={(v) => setCourseForm({ ...courseForm, category: v })}>
                <SelectTrigger data-testid="select-course-category"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(COURSE_CATEGORIES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Maestro Asignado</Label>
              <Select value={courseForm.teacherId} onValueChange={(v) => setCourseForm({ ...courseForm, teacherId: v })}>
                <SelectTrigger data-testid="select-course-teacher"><SelectValue placeholder="Sin asignar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin asignar</SelectItem>
                  {obreros.map((u: any) => (
                    <SelectItem key={u.id} value={String(u.id)}>{u.displayName || u.username} ({ROLES[u.role as keyof typeof ROLES]})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Inscripciones</Label>
              <Select value={courseForm.enrollmentStatus} onValueChange={(v) => setCourseForm({ ...courseForm, enrollmentStatus: v })}>
                <SelectTrigger data-testid="select-enrollment-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(ENROLLMENT_MODES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {courseForm.enrollmentStatus === "scheduled" && (
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Fecha Apertura</Label><Input type="datetime-local" value={courseForm.enrollmentOpenDate} onChange={(e) => setCourseForm({ ...courseForm, enrollmentOpenDate: e.target.value })} data-testid="input-enrollment-open" /></div>
                <div><Label>Fecha Cierre</Label><Input type="datetime-local" value={courseForm.enrollmentCloseDate} onChange={(e) => setCourseForm({ ...courseForm, enrollmentCloseDate: e.target.value })} data-testid="input-enrollment-close" /></div>
              </div>
            )}
            {courseForm.enrollmentStatus === "open" && (
              <div>
                <Label>Fecha de Cierre Automatico (opcional)</Label>
                <Input type="datetime-local" value={courseForm.enrollmentCloseDate} onChange={(e) => setCourseForm({ ...courseForm, enrollmentCloseDate: e.target.value })} data-testid="input-enrollment-close-auto" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Max Estudiantes</Label><Input type="number" value={courseForm.maxStudents} onChange={(e) => setCourseForm({ ...courseForm, maxStudents: e.target.value })} placeholder="Ilimitado" data-testid="input-course-max-students" /></div>
              <div><Label>URL de Imagen</Label><Input value={courseForm.imageUrl} onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })} placeholder="https://..." data-testid="input-course-image" /></div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={courseForm.isActive} onCheckedChange={(checked) => setCourseForm({ ...courseForm, isActive: checked })} data-testid="switch-course-active" />
              <Label>Curso activo (visible para estudiantes)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCourseDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCourseSubmit} disabled={!courseForm.title || !courseForm.description || createCourse.isPending || updateCourse.isPending} data-testid="button-submit-course">
              {createCourse.isPending || updateCourse.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {editingCourse ? "Guardar Cambios" : "Crear Curso"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
