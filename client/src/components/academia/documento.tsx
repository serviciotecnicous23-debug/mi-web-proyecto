// El documento de la academia (certificado de materia o de nivel), con el mismo diseño del certificado de la Escuela
// (pages/certificados.tsx): estilos en línea para que el PDF salga igual que en pantalla. Lleva el QR de la verificación
// pública y la aclaración de que no es un título universitario oficial (shared/academia.ts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ACLARACION_DOCUMENTOS, NOMBRE_ACADEMIA, calificacion, type DocumentoAcademia } from "@shared/academia";

const ANCHO = 800;

/** «Certificado en Fundamentos de la Fe» → «Certificado» y «en Fundamentos de la Fe». */
function partirTitulo(titulo: string): [string, string] {
  const [cabeza, ...resto] = titulo.split(" ");
  return [cabeza, resto.join(" ")];
}

export function DocumentoVista({ d }: { d: DocumentoAcademia }) {
  const fecha = format(new Date(d.emitido), "dd 'de' MMMM 'de' yyyy", { locale: es });
  const esNivel = d.tipo === "nivel";
  const [cabeza, subtitulo] = esNivel ? partirTitulo(d.titulo) : ["Certificado", "de materia aprobada"];
  const sitio = d.verificar.replace(/^https?:\/\//, "").split("/academia/")[0];
  const nivelTexto = d.nivel ? `Nivel ${d.nivel.n} · ${d.nivel.nombre}` : "";
  const esquina = (pos: Record<string, string>) => (
    <div style={{ position: "absolute", width: "80px", height: "80px", pointerEvents: "none", ...pos }} />
  );
  return (
    <div
      id="documento-academia"
      data-testid="documento-academia"
      style={{
        width: `${ANCHO}px`,
        minHeight: "566px",
        background: "linear-gradient(135deg, #fffbeb 0%, #ffffff 40%, #fef3c7 70%, #fff7ed 100%)",
        border: "4px solid #b45309",
        borderRadius: "12px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: "0 4px 24px rgba(180,83,9,0.12)",
        color: "#78350f",
      }}
    >
      {esquina({ top: "0", left: "0", borderTop: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderTopLeftRadius: "12px" })}
      {esquina({ top: "0", right: "0", borderTop: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderTopRightRadius: "12px" })}
      {esquina({ bottom: "0", left: "0", borderBottom: "4px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderBottomLeftRadius: "12px" })}
      {esquina({ bottom: "0", right: "0", borderBottom: "4px solid #f59e0b", borderRight: "4px solid #f59e0b", borderBottomRightRadius: "12px" })}
      <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", bottom: "12px", border: "1.5px solid #d9770633", borderRadius: "6px", pointerEvents: "none" }} />
      {d.revocado && (
        <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 2 }}>
          <span style={{ transform: "rotate(-18deg)", fontSize: "5em", fontWeight: "bold", color: "rgba(185,28,28,0.28)", letterSpacing: "8px" }}>REVOCADO</span>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, padding: "30px 50px 22px", textAlign: "center" }}>
        <img src="/icons/logo-transparent.png?v4" alt="Logo Avivando el Fuego" crossOrigin="anonymous" style={{ width: "64px", height: "64px", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(180,83,9,0.18))" }} />
        <h1 style={{ fontSize: "1.5em", color: "#92400e", margin: "2px 0 2px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase" }}>Avivando el Fuego</h1>
        <p style={{ fontSize: "0.85em", color: "#a16207", margin: "0", letterSpacing: "1px" }}>{NOMBRE_ACADEMIA} · Instituto de formación ministerial</p>
        <div style={{ width: "200px", height: "1px", background: "linear-gradient(to right, transparent, #d97706, transparent)", margin: "10px auto" }} />

        <h2 style={{ fontSize: "1.8em", color: "#78350f", margin: "4px 0 0", fontWeight: "normal", letterSpacing: "3px", textTransform: "uppercase" }}>{cabeza}</h2>
        <p style={{ fontSize: "0.95em", color: "#92400e", margin: "2px 0 12px", fontStyle: "italic" }}>{subtitulo}</p>

        <p style={{ fontSize: "0.95em", margin: "0" }}>Se certifica que</p>
        <div style={{ margin: "6px 60px", padding: "6px 0", borderBottom: "2px solid #d97706" }}>
          <p style={{ fontSize: "1.9em", color: "#1e3a5f", fontStyle: "italic", margin: "0", fontWeight: "bold" }} data-testid="documento-nombre">{d.nombre}</p>
        </div>

        {esNivel ? (
          <p style={{ fontSize: "0.95em", margin: "10px 30px 0", lineHeight: "1.5" }}>
            completó el <strong>{nivelTexto}</strong>: sus materias, el examen integral y el pacto, con un promedio de{" "}
            <strong style={{ color: "#b45309", fontSize: "1.1em" }}>{d.nota ?? "—"}</strong>
            {d.honores && <strong style={{ color: "#b45309" }}>, con honores</strong>}.
          </p>
        ) : (
          <>
            <p style={{ fontSize: "0.95em", margin: "10px 0 2px" }}>aprobó la materia</p>
            <p style={{ fontSize: "1.4em", color: "#b45309", fontWeight: "bold", margin: "2px 20px 4px" }}>«{d.titulo}»</p>
            <p style={{ fontSize: "0.9em", margin: "0" }}>
              {nivelTexto ? `del ${nivelTexto}, ` : ""}con una calificación de{" "}
              <strong style={{ color: "#b45309", fontSize: "1.1em" }}>{d.nota ?? "—"}</strong>
              {d.nota != null ? ` (${calificacion(d.nota)})` : ""}
              {d.via === "suficiencia" ? ", aprobada por suficiencia" : ""}.
            </p>
          </>
        )}
        <p style={{ fontSize: "0.85em", color: "#92400e", margin: "8px 0 0" }}>Otorgado el {fecha}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "18px", padding: "0 6px" }}>
          <div style={{ width: "200px", textAlign: "center" }}>
            <div style={{ borderTop: "2px solid #b4530966", paddingTop: "6px" }}>
              <p style={{ margin: "0", fontWeight: "bold", color: "#1e3a5f", fontSize: "0.9em" }}>Dirección académica</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.72em", color: "#92400e" }}>{NOMBRE_ACADEMIA}</p>
            </div>
          </div>
          <div style={{ width: "200px", textAlign: "center" }}>
            <img src="/icons/icon-192.png?v=6" alt="" crossOrigin="anonymous" style={{ width: "32px", height: "32px", objectFit: "contain", margin: "0 auto 4px", opacity: 0.7 }} />
            <div style={{ borderTop: "2px solid #b4530966", paddingTop: "6px" }}>
              <p style={{ margin: "0", fontWeight: "bold", color: "#1e3a5f", fontSize: "0.9em" }}>Avivando el Fuego</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.72em", color: "#92400e" }}>Ministerio</p>
            </div>
          </div>
          <div style={{ width: "200px", textAlign: "center" }}>
            {d.qr && <img src={d.qr} alt="Código QR de verificación" style={{ width: "86px", height: "86px", margin: "0 auto", display: "block", imageRendering: "pixelated" }} data-testid="documento-qr" />}
            <p style={{ margin: "4px 0 0", fontSize: "0.68em", color: "#92400e" }}>Verifica en {sitio}/academia/verificar</p>
            <p style={{ margin: "1px 0 0", fontSize: "0.78em", color: "#78350f", fontWeight: "bold", letterSpacing: "1px" }}>{d.codigo}</p>
          </div>
        </div>

        <p style={{ fontSize: "0.68em", color: "#a16207", margin: "14px 0 0", fontStyle: "italic" }}>{ACLARACION_DOCUMENTOS}</p>
      </div>
    </div>
  );
}

/** Muestra el documento a su tamaño real o, en pantallas angostas, achicado para que entre entero. */
export function DocumentoAjustado({ children, ancho = ANCHO }: { children: ReactNode; ancho?: number }) {
  const caja = useRef<HTMLDivElement>(null);
  const hoja = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);
  const [alto, setAlto] = useState<number | null>(null);
  useEffect(() => {
    const medir = () => {
      const disponible = caja.current?.clientWidth ?? ancho;
      const s = Math.min(1, disponible / ancho);
      setEscala(s);
      setAlto((hoja.current?.scrollHeight ?? 566) * s);
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (caja.current) ro.observe(caja.current);
    return () => ro.disconnect();
  }, [ancho]);
  return (
    <div ref={caja} className="w-full" style={{ height: alto ?? undefined }}>
      <div ref={hoja} id="documento-escala" style={{ width: `${ancho}px`, transform: `scale(${escala})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

/** Qué capturar para el PDF: el certificado (A4 apaisado) o el carné (tamaño tarjeta, 85,6 × 54 mm). */
export type OpcionesPdf = { id?: string; ancho?: number; mm?: number; fondo?: string };

/** Descarga el documento en PDF a tamaño real, aunque en pantalla se vea achicado. */
export async function descargarPdf(archivo: string, op: OpcionesPdf = {}): Promise<void> {
  const el = document.getElementById(op.id ?? "documento-academia");
  const escala = document.getElementById("documento-escala");
  if (!el) return;
  const ancho = op.ancho ?? ANCHO;
  const antes = escala?.style.transform ?? "";
  if (escala) escala.style.transform = "none";
  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: op.fondo ?? "#fffbeb", logging: false, width: ancho, height: el.scrollHeight, windowWidth: ancho + 100 });
    const pdfAncho = op.mm ?? 297;
    const pdfAlto = (canvas.height / canvas.width) * pdfAncho;
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [pdfAncho, pdfAlto] });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfAncho, pdfAlto);
    pdf.save(archivo);
  } finally {
    if (escala) escala.style.transform = antes;
  }
}

/** Abre el documento solo, para imprimirlo en una hoja apaisada. */
export function imprimirDocumento(id = "documento-academia"): void {
  const el = document.getElementById(id);
  if (!el) return;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>${NOMBRE_ACADEMIA}</title><style>
    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
    @media print { body { margin: 0; } @page { size: landscape; margin: 0; } }
  </style></head><body>`);
  w.document.write(el.outerHTML);
  w.document.write(`</body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 500);
}
