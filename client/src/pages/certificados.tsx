import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Download, CheckCircle, Clock, Search, FileText, X } from "lucide-react";
import { useState, useCallback } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "@/hooks/use-auth";

// ========== CERTIFICATE VISUAL COMPONENT ==========
function CertificateView({
  cert,
}: {
  cert: any;
}) {
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
    <div
      id="certificate-content"
      style={{
        width: "800px",
        minHeight: "566px",
        background: "linear-gradient(135deg, #fffbeb 0%, #ffffff 40%, #fef3c7 70%, #fff7ed 100%)",
        border: "4px solid #b45309",
        borderRadius: "12px",
        padding: "0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: "0 4px 24px rgba(180,83,9,0.12)",
      }}
    >
      {/* Decorative corner accents */}
      <div style={{ position: "absolute", top: "0", left: "0", width: "80px", height: "80px", borderTop: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderTopLeftRadius: "12px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "0", right: "0", width: "80px", height: "80px", borderTop: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderTopRightRadius: "12px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0", left: "0", width: "80px", height: "80px", borderBottom: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderBottomLeftRadius: "12px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0", right: "0", width: "80px", height: "80px", borderBottom: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderBottomRightRadius: "12px", pointerEvents: "none" }} />

      {/* Inner border */}
      <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", bottom: "12px", border: "1.5px solid #d9770633", borderRadius: "6px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "40px 50px", textAlign: "center" }}>
        {/* Logo del ministerio */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "6px" }}>
          <img
            src="/icons/logo-transparent.png?v4"
            alt="Logo Avivando el Fuego"
            crossOrigin="anonymous"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 8px rgba(180,83,9,0.18))",
            }}
          />
        </div>

        <h1 style={{ fontSize: "1.6em", color: "#92400e", margin: "0 0 2px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase" }}>
          Avivando el Fuego
        </h1>
        <p style={{ fontSize: "0.85em", color: "#a16207", margin: "0 0 6px", letterSpacing: "1px" }}>
          Ministerio Evangelístico Internacional
        </p>

        <div style={{ width: "200px", height: "1px", background: "linear-gradient(to right, transparent, #d97706, transparent)", margin: "12px auto" }} />

        <h2 style={{ fontSize: "1.8em", color: "#78350f", margin: "8px 0", fontWeight: "normal", letterSpacing: "3px", textTransform: "uppercase" }}>
          Certificado
        </h2>
        <p style={{ fontSize: "0.9em", color: "#92400e", margin: "2px 0 16px", fontStyle: "italic" }}>
          de Finalización
        </p>

        <p style={{ fontSize: "0.95em", color: "#78350f", margin: "0" }}>Se certifica que</p>

        <div style={{ margin: "10px 0", padding: "8px 0", borderBottom: "2px solid #d97706" }}>
          <p style={{ fontSize: "2em", color: "#1e3a5f", fontStyle: "italic", margin: "0", fontWeight: "bold" }}>
            {studentName}
          </p>
        </div>

        <p style={{ fontSize: "0.95em", color: "#78350f", margin: "12px 0 4px" }}>
          ha completado satisfactoriamente el curso
        </p>

        <p style={{ fontSize: "1.5em", color: "#b45309", fontWeight: "bold", margin: "6px 0 12px" }}>
          «{courseName}»
        </p>

        {customMessage && (
          <p style={{ fontSize: "0.85em", color: "#78350f", margin: "0 40px 10px", fontStyle: "italic", lineHeight: "1.4" }}>
            {customMessage}
          </p>
        )}

        {grade && (
          <p style={{ fontSize: "0.95em", color: "#78350f", margin: "4px 0" }}>
            Calificación obtenida: <strong style={{ color: "#b45309", fontSize: "1.1em" }}>{grade}</strong>
          </p>
        )}

        <p style={{ fontSize: "0.85em", color: "#92400e", margin: "8px 0 16px" }}>
          Otorgado el {issuedDate}
        </p>

        {/* Signatures */}
        <div style={{ display: "flex", justifyContent: "center", gap: "80px", marginTop: "20px", alignItems: "flex-end" }}>
          {teacherName && (
            <div style={{ textAlign: "center" }}>
              {signatureUrl && (
                <img
                  src={signatureUrl}
                  alt="Firma"
                  crossOrigin="anonymous"
                  style={{ width: "120px", height: "50px", objectFit: "contain", margin: "0 auto 4px" }}
                />
              )}
              <div style={{ width: "180px", borderTop: "2px solid #b4530966", margin: "0 auto", paddingTop: "6px" }}>
                <p style={{ margin: "0", fontWeight: "bold", color: "#1e3a5f", fontSize: "0.95em" }}>{teacherName}</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.75em", color: "#92400e" }}>Instructor</p>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <img
              src="/icons/icon-192.png?v=6"
              alt=""
              crossOrigin="anonymous"
              style={{ width: "32px", height: "32px", objectFit: "contain", margin: "0 auto 4px", opacity: 0.7 }}
            />
            <div style={{ width: "180px", borderTop: "2px solid #b4530966", margin: "0 auto", paddingTop: "6px" }}>
              <p style={{ margin: "0", fontWeight: "bold", color: "#1e3a5f", fontSize: "0.95em" }}>Avivando el Fuego</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.75em", color: "#92400e" }}>Ministerio</p>
            </div>
          </div>
        </div>

        {code && (
          <div style={{ marginTop: "16px", padding: "6px 16px", background: "rgba(180,83,9,0.08)", borderRadius: "4px", display: "inline-block" }}>
            <p style={{ fontSize: "0.7em", color: "#92400e", margin: "0" }}>
              Código de verificación: <strong>{code}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function CertificadosPage() {
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const { data: certificates = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/certificates/mine"],
    enabled: !!user,
  });

  // Los documentos de la Academia Avivando el Fuego (si la persona puede verla; si no, no se muestran).
  const { data: documentosAcademia = [] } = useQuery<any[]>({
    queryKey: ["academia", "certificados"],
    queryFn: async () => {
      const res = await fetch("/api/academia/certificados", { credentials: "include" });
      return res.ok ? res.json() : [];
    },
    enabled: !!user,
    retry: false,
  });

  const handleVerify = async () => {
    if (!verifyCode.trim()) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      // Los códigos de la academia (AAF-XXXX-XXXX) se verifican en la academia; los demás, en la Escuela.
      if (/^\s*aaf/i.test(verifyCode)) {
        const res = await fetch(`/api/academia/verificar/${encodeURIComponent(verifyCode.trim())}`);
        const d = await res.json().catch(() => null);
        if (!res.ok || !d) setVerifyResult({ error: d?.message || "Documento no encontrado" });
        else if (!d.valido) setVerifyResult({ error: "Ese documento de la academia fue revocado." });
        else setVerifyResult({ studentName: d.nombre, courseName: `${d.documento}${d.honores ? ", con honores" : ""}${d.nivel ? ` (${d.nivel})` : ""}`, issuedAt: d.emitido, academia: d.academia });
      } else {
        const res = await fetch(`/api/certificates/verify/${verifyCode.trim()}`);
        if (res.ok) {
          setVerifyResult(await res.json());
        } else {
          setVerifyResult({ error: "Certificado no encontrado" });
        }
      }
    } catch {
      setVerifyResult({ error: "Error al verificar" });
    }
    setVerifying(false);
  };

  const downloadPdf = useCallback(async () => {
    const element = document.getElementById("certificate-content");
    if (!element) return;
    setGeneratingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Force the element to its natural fixed size for consistent capture
      const origStyle = element.getAttribute("style") || "";
      element.style.width = "800px";
      element.style.minHeight = "566px";
      element.style.maxHeight = "none";
      element.style.overflow = "visible";
      element.style.transform = "none";

      const canvas = await html2canvas(element, {
        scale: 2, useCORS: true, backgroundColor: "#fffbeb", logging: false,
        width: 800,
        height: element.scrollHeight,
        windowWidth: 900,
      });

      // Restore original style
      element.setAttribute("style", origStyle);

      const imgData = canvas.toDataURL("image/png");

      // Use mm units with a standard landscape A4-like ratio to avoid multi-page issues
      const pdfWidth = 297; // mm (A4 landscape width)
      const pdfHeight = (canvas.height / canvas.width) * pdfWidth;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const certName = selectedCert?.courseName || "certificado";
      pdf.save(`certificado-${certName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      handlePrint();
    }
    setGeneratingPdf(false);
  }, [selectedCert]);

  const handlePrint = () => {
    const element = document.getElementById("certificate-content");
    if (!element) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Certificado</title><style>
      body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
      @media print { body { margin: 0; } @page { size: landscape; margin: 0; } }
    </style></head><body>`);
    w.document.write(element.outerHTML);
    w.document.write(`</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <p>Inicia sesión para ver tus certificados</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            <Award className="h-8 w-8" /> Mis Certificados
          </h1>
          <p className="text-muted-foreground">Certificados obtenidos por cursos completados</p>
        </div>

        {/* Selected Certificate Preview + PDF */}
        {selectedCert && (
          <Card className="border-orange-300 border-2">
            <CardHeader className="flex flex-row flex-wrap justify-between items-start gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" /> {selectedCert.courseName}
                </CardTitle>
                <CardDescription>Código: {selectedCert.verificationCode || selectedCert.certificateCode}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={downloadPdf} disabled={generatingPdf} className="bg-orange-600 hover:bg-orange-700">
                  <Download className="h-4 w-4 mr-1" />
                  {generatingPdf ? "Generando..." : "Descargar PDF"}
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <FileText className="h-4 w-4 mr-1" /> Imprimir
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCert(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto flex justify-center py-4">
                <CertificateView cert={selectedCert} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certificates Grid */}
        {isLoading ? (
          <div className="text-center py-10"><Clock className="h-8 w-8 animate-spin text-muted-foreground mx-auto" /></div>
        ) : certificates.length === 0 ? (
          <Card>
            <CardContent className="text-center py-10">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">Aún no tienes certificados.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cuando un maestro o administrador marque tu curso como <Badge variant="secondary" className="mx-1">Completado</Badge> tu certificado aparecerá aquí automáticamente.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert: any) => (
              <Card
                key={cert.id}
                className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-orange-400 hover:border-l-orange-600"
                onClick={() => setSelectedCert(cert)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2.5 shrink-0">
                      <Award className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{cert.courseName || cert.course?.title || "Curso"}</h3>
                      {cert.teacherName && (
                        <p className="text-sm text-muted-foreground truncate">Instructor: {cert.teacherName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {cert.issuedAt ? format(new Date(cert.issuedAt), "dd MMM yyyy", { locale: es }) : ""}
                    </span>
                    {cert.grade && <Badge variant="secondary">Nota: {cert.grade}</Badge>}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                    <CheckCircle className="h-3 w-3" /> Verificado
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Academia Avivando el Fuego */}
        {documentosAcademia.length > 0 && (
          <div data-testid="certificados-academia">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><Award className="h-5 w-5 text-orange-600" /> De la Academia Avivando el Fuego</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentosAcademia.map((d: any) => (
                <a key={d.codigo} href={`/academia/certificado/${d.codigo}`} className="block">
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-orange-400 hover:border-l-orange-600 h-full">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold">{d.titulo}</h3>
                      {d.nivel && <p className="text-sm text-muted-foreground">Nivel {d.nivel.n} · {d.nivel.nombre}</p>}
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground">{format(new Date(d.emitido), "dd MMM yyyy", { locale: es })}</span>
                        {d.nota != null && <Badge variant="secondary">{d.tipo === "nivel" ? "Promedio" : "Nota"}: {d.nota}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 tracking-wider">{d.codigo}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Search className="h-4 w-4" /> Verificar un Certificado</CardTitle>
            <CardDescription>Ingresa el código de verificación para comprobar la autenticidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Ej: CERT-ABC123… o AAF-XXXX-XXXX"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />
              <Button onClick={handleVerify} disabled={verifying}>
                {verifying ? "Verificando..." : "Verificar"}
              </Button>
            </div>
            {verifyResult && (
              <div className="mt-4">
                {verifyResult.error ? (
                  <p className="text-red-500 text-sm">{verifyResult.error}</p>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">{verifyResult.academia ? `Documento válido · ${verifyResult.academia}` : "Certificado Válido"}</span>
                    </div>
                    <p className="text-sm"><strong>Estudiante:</strong> {verifyResult.studentName || verifyResult.certificate?.studentName}</p>
                    <p className="text-sm"><strong>Curso:</strong> {verifyResult.courseName || verifyResult.certificate?.courseName}</p>
                    {(verifyResult.grade || verifyResult.certificate?.grade) && (
                      <p className="text-sm"><strong>Calificación:</strong> {verifyResult.grade || verifyResult.certificate?.grade}</p>
                    )}
                    <p className="text-sm"><strong>Fecha:</strong> {(verifyResult.issuedAt || verifyResult.certificate?.issuedAt)
                      ? format(new Date(verifyResult.issuedAt || verifyResult.certificate?.issuedAt), "dd/MM/yyyy") : "—"}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
