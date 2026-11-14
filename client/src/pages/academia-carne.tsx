// El carné digital de la academia: acredita la matrícula y se verifica con su QR (server/academia-matricula.ts).
// Estilos en línea para que el PDF (tamaño tarjeta, 85,6 × 54 mm) salga igual que en pantalla.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, IdCard, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { NOMBRE_ACADEMIA, type CarneVista } from "@shared/academia";
import { useCarne } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { DocumentoAjustado, descargarPdf, imprimirDocumento } from "@/components/academia/documento";
import { FotoCarne } from "@/components/academia/foto-carne";

const ANCHO_CARNE = 540;
const fechaCorta = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "numeric" });
const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

export function Carne({ c }: { c: CarneVista }) {
  const [sinFoto, setSinFoto] = useState(!c.foto);
  const sitio = c.verificar.replace(/^https?:\/\//, "").split("/academia/")[0];
  return (
    <div
      id="carne-academia"
      data-testid="carne-academia"
      style={{
        width: `${ANCHO_CARNE}px`,
        height: "340px",
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "linear-gradient(160deg, #fffbeb 0%, #ffffff 55%, #fef3c7 100%)",
        border: "2px solid #b45309",
        boxSizing: "border-box",
        color: "#78350f",
        boxShadow: "0 6px 24px rgba(180,83,9,0.18)",
      }}
    >
      <div style={{ height: "78px", background: "linear-gradient(135deg, #78350f 0%, #b45309 60%, #f59e0b 100%)", display: "flex", alignItems: "center", gap: "12px", padding: "0 20px", color: "#ffffff" }}>
        <img src="/icons/logo-transparent.png?v4" alt="" crossOrigin="anonymous" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
        <div>
          <div style={{ fontWeight: "bold", letterSpacing: "2px", fontSize: "15px", textTransform: "uppercase" }}>{NOMBRE_ACADEMIA}</div>
          <div style={{ fontSize: "11px", opacity: 0.92 }}>Carné de estudiante · Instituto de formación ministerial</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "18px", padding: "18px 20px 0" }}>
        <div style={{ width: "104px", height: "128px", borderRadius: "12px", overflow: "hidden", background: "#fde68a", border: "2px solid #d97706", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {!sinFoto && c.foto ? (
            <img src={c.foto} alt="" crossOrigin="anonymous" onError={() => setSinFoto(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "40px", fontWeight: "bold", color: "#92400e" }}>{iniciales(c.nombre)}</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "21px", fontWeight: "bold", color: "#1e3a5f", lineHeight: 1.2 }} data-testid="carne-nombre">{c.nombre}</div>
          <div style={{ marginTop: "8px", fontSize: "11px", color: "#a16207", textTransform: "uppercase", letterSpacing: "1px" }}>Matrícula</div>
          <div style={{ fontSize: "17px", fontWeight: "bold", letterSpacing: "1px" }} data-testid="carne-numero">{c.numero}</div>
          <div style={{ marginTop: "4px", fontSize: "12px" }}>Promoción {c.promocion}</div>
          <div style={{ marginTop: "8px", fontSize: "13px", fontWeight: "bold", color: "#b45309", lineHeight: 1.3 }} data-testid="carne-estatus">{c.estatus.texto}</div>
          {c.estatus.honores && <div style={{ fontSize: "11px", color: "#b45309", marginTop: "2px" }}>Cuadro de honor</div>}
        </div>
        <div style={{ width: "96px", textAlign: "center", flexShrink: 0 }}>
          <img src={c.qr} alt="Código QR de verificación" style={{ width: "92px", height: "92px", imageRendering: "pixelated", display: "block", margin: "0 auto" }} data-testid="carne-qr" />
          <div style={{ fontSize: "9px", fontWeight: "bold", marginTop: "3px", whiteSpace: "nowrap" }} data-testid="carne-codigo">{c.codigo}</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "20px", right: "20px", fontSize: "9.5px", color: "#a16207", display: "flex", justifyContent: "space-between", gap: "8px" }}>
        <span>Desde el {fechaCorta(c.desde)}</span>
        <span>Verifica en {sitio}/academia/verificar</span>
      </div>
    </div>
  );
}

export default function AcademiaCarne() {
  const qc = useQueryClient();
  const q = useCarne();
  const [generando, setGenerando] = useState(false);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    const sinMatricula = q.error?.status === 409;
    const sinSesion = q.error?.status === 401;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <IdCard className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-5">{sinMatricula ? "Tu carné se entrega al inscribirte en la academia." : q.error?.message ?? "No se pudo cargar tu carné."}</p>
          {sinMatricula && <Link href="/academia/inscripcion?volver=%2Facademia%2Fcarne"><Button className="fire-btn-primary h-12 px-7">Inscribirme en la academia</Button></Link>}
          {sinSesion && <a href={loginUrl("/academia/carne")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>}
        </div>
      </Layout>
    );
  }
  const c = q.data;
  const pdf = async () => {
    setGenerando(true);
    try {
      await descargarPdf(`carne-${c.numero}.pdf`.toLowerCase(), { id: "carne-academia", ancho: ANCHO_CARNE, mm: 85.6, fondo: "#ffffff" });
    } catch {
      imprimirDocumento("carne-academia");
    } finally {
      setGenerando(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-5 flex items-center gap-3"><IdCard className="w-8 h-8 text-orange-500" /> Mi carné</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button onClick={pdf} disabled={generando} className="fire-btn-primary" data-testid="carne-pdf"><Download className="w-4 h-4 mr-1.5" /> {generando ? "Generando…" : "Descargar PDF"}</Button>
          <Button variant="outline" onClick={() => imprimirDocumento("carne-academia")}><FileText className="w-4 h-4 mr-1.5" /> Imprimir</Button>
        </div>
        <div className="max-w-[540px]">
          <DocumentoAjustado ancho={ANCHO_CARNE}>
            <Carne key={c.foto ?? "sin-foto"} c={c} />
          </DocumentoAjustado>
        </div>
        <div className="max-w-[540px] mt-6">
          <FotoCarne
            foto={c.foto}
            propia={c.fotoPropia}
            iniciales={iniciales(c.nombre)}
            alGuardar={() => void qc.invalidateQueries({ queryKey: ["academia"] })}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
          <span>
            El QR lleva a <Link href={`/academia/verificar/${c.codigo}`} className="underline">la verificación de tu carné</Link>: muestra tu nombre, tu matrícula y
            tu estatus de hoy, sin notas.
          </span>
        </p>
      </div>
    </Layout>
  );
}
