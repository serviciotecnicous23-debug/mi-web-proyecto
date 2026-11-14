// El expediente académico (kárdex) en PDF, hecho con su texto (no con una «foto» de la página, que podía salir en
// blanco): hoja carta, con los datos del alumno, sus materias, sus niveles y sus certificados, y varias páginas si
// hace falta. Para descargarlo, imprimirlo o mandarlo.
import { ACLARACION_DOCUMENTOS, NOMBRE_ACADEMIA } from "@shared/academia";
import type { AlumnoDetalle } from "@shared/academia-direccion";

const fecha = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : "");
const ESTADO: Record<string, string> = { aprobada: "Aprobada", "en-curso": "En curso", disponible: "Sin empezar", "en-preparacion": "En preparación" };

export async function descargarExpedientePdf(d: AlumnoDetalle): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
  const M = 16;
  const ANCHO = 215.9 - M * 2;
  const ALTO = 279.4;
  let y = M;

  const pie = () => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(120);
    pdf.text(`${ACLARACION_DOCUMENTOS} Expediente al ${fecha(new Date().toISOString())}.`, M, ALTO - 10);
    pdf.text(`Página ${pdf.getNumberOfPages()}`, 215.9 - M, ALTO - 10, { align: "right" });
  };
  const espacio = (alto: number) => {
    if (y + alto > ALTO - 18) {
      pie();
      pdf.addPage();
      y = M;
    }
  };
  const titulo = (t: string) => {
    espacio(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12.5);
    pdf.setTextColor(180, 83, 9);
    pdf.text(t, M, y + 5);
    pdf.setDrawColor(234, 179, 8);
    pdf.setLineWidth(0.4);
    pdf.line(M, y + 7.5, M + ANCHO, y + 7.5);
    y += 12;
  };
  /** Una tabla sencilla: encabezado y filas, con el ancho de cada columna en mm. */
  const tabla = (cols: { t: string; w: number; derecha?: boolean }[], filas: string[][]) => {
    const fila = (celdas: string[], negrita: boolean) => {
      pdf.setFont("helvetica", negrita ? "bold" : "normal");
      pdf.setFontSize(9.5);
      const partes = celdas.map((c, i) => pdf.splitTextToSize(c, cols[i].w - 2) as string[]);
      const alto = Math.max(...partes.map((p) => p.length)) * 4.4 + 2.4;
      espacio(alto);
      let x = M;
      partes.forEach((p, i) => {
        pdf.setTextColor(negrita ? 90 : 30);
        pdf.text(p, cols[i].derecha ? x + cols[i].w - 1 : x + 1, y + 4.2, cols[i].derecha ? { align: "right" } : undefined);
        x += cols[i].w;
      });
      y += alto;
      pdf.setDrawColor(225);
      pdf.setLineWidth(0.2);
      pdf.line(M, y, M + ANCHO, y);
    };
    fila(cols.map((c) => c.t), true);
    for (const f of filas) fila(f, false);
    y += 4;
  };

  // el encabezado
  pdf.setFillColor(42, 18, 7);
  pdf.rect(0, 0, 215.9, 30, "F");
  pdf.setFillColor(255, 122, 26);
  pdf.rect(0, 30, 215.9, 1.6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(255, 255, 255);
  pdf.text(NOMBRE_ACADEMIA.toUpperCase(), M, 14);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(233, 184, 92);
  pdf.text("Expediente académico", M, 22);
  y = 42;

  const a = d.fila;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.setTextColor(20);
  pdf.text(a.nombre, M, y);
  y += 6.5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(70);
  pdf.text(`Matrícula ${a.matricula} · Promoción ${a.promocion} · Inscrito desde el ${fecha(a.desde)}`, M, y);
  y += 5.5;
  pdf.text(`Estatus: ${a.estatus.texto}${a.estatus.honores ? " · Cuadro de honor" : ""}`, M, y);
  y += 5.5;
  if (d.mentor) {
    pdf.text(`Mentor: ${d.mentor.nombre}`, M, y);
    y += 5.5;
  }
  y += 4;

  // las materias
  titulo("Materias");
  const suficiencia = new Set(d.certificados.filter((c) => c.tipo === "materia" && c.via === "suficiencia").map((c) => c.ref));
  if (d.materias.length) {
    tabla(
      [
        { t: "Materia", w: 74 },
        { t: "Nivel", w: 14 },
        { t: "Lecciones", w: 20, derecha: true },
        { t: "Estado", w: 26 },
        { t: "Nota", w: 16, derecha: true },
        { t: "Aprobada", w: ANCHO - 150 },
      ],
      d.materias.map((m) => [
        m.titulo + (suficiencia.has(m.id) ? " (por suficiencia)" : ""),
        m.nivel ? String(m.nivel) : "",
        `${m.lecciones}/${m.de}`,
        ESTADO[m.estado] ?? m.estado,
        m.estado === "aprobada" && m.nota != null ? String(m.nota) : "",
        fecha(m.aprobada),
      ]),
    );
  } else {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Todavía no se inscribió en ninguna materia.", M, y + 4);
    y += 10;
  }

  // los niveles
  const niveles = d.niveles.filter((n) => n.pacto || n.completado);
  if (niveles.length) {
    titulo("Niveles");
    tabla(
      [
        { t: "Nivel", w: 90 },
        { t: "Completado", w: 40 },
        { t: "Promedio", w: ANCHO - 130, derecha: true },
      ],
      niveles.map((n) => [`Nivel ${n.n} · ${n.nombre}`, n.completado ? fecha(n.completado) : "En curso", n.promedio != null ? String(n.promedio) : ""]),
    );
  }

  // los certificados
  if (d.certificados.length) {
    titulo("Certificados");
    tabla(
      [
        { t: "Documento", w: 92 },
        { t: "Código", w: 38 },
        { t: "Emitido", w: 28 },
        { t: "Estado", w: ANCHO - 158 },
      ],
      d.certificados.map((c) => [c.titulo, c.codigo, fecha(c.emitido), c.revocado ? "Revocado" : "Válido"]),
    );
  }

  pie();
  const nombre = `expediente-${a.matricula}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-") + ".pdf";
  const url = URL.createObjectURL(pdf.output("blob"));
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
