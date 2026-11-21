/**
 * Los PDF del certificado y del expediente, hechos en el servidor (docs/academia.md, «Los documentos»).
 *
 * Antes se armaban en el navegador y se bajaban con un enlace hecho en la página (blob): en el iPhone, en la web
 * instalada como app y en los navegadores de Facebook, Instagram o WhatsApp eso abre una vista sin descarga y sin salida
 * (lo mismo que pasaba con el carné). Ahora cada PDF tiene su dirección, su tipo y su nombre (Content-Disposition), y
 * el diseño es el mismo de siempre, dibujado con jsPDF: texto de verdad, nítido y liviano, nunca una captura de pantalla.
 *
 * - El certificado (A4 apaisado): borde dorado, el logo, el nombre, la materia o el nivel, la nota, las líneas de las
 *   firmas, el sello, el QR de la verificación y la aclaración de que no es un título universitario oficial.
 * - El expediente (carta, varias páginas si hace falta): los datos del alumno, sus materias, sus niveles y sus
 *   certificados.
 * - Las fechas, en el día de la sede (Texas), no en el del servidor.
 */
import fs from "node:fs";
import type { Response } from "express";
import path from "node:path";
import sharp from "sharp";
import { ACLARACION_DOCUMENTOS, NOMBRE_ACADEMIA, calificacion, type DocumentoAcademia } from "@shared/academia";
import type { AlumnoDetalle } from "@shared/academia-direccion";

const ZONA = "America/Chicago";

/** Manda un PDF para descargar, con su nombre (Content-Disposition) y sin guardarlo en cachés: es de una persona. */
export function enviarPdf(res: Response, pdf: Buffer, archivo: string) {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${archivo}"`);
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Length", String(pdf.length));
  res.end(pdf);
}

async function jsPDF(): Promise<any> {
  const mod: any = await import("jspdf");
  return mod.jsPDF ?? mod.default?.jsPDF ?? mod.default;
}

const iconos = new Map<string, Promise<string | null>>();
/** Un ícono de la web (client/public/icons), achicado a `lado` píxeles como máximo, como data URL PNG; null si no está. */
function icono(nombre: string, lado: number): Promise<string | null> {
  const clave = `${nombre}|${lado}`;
  let p = iconos.get(clave);
  if (!p) {
    p = (async () => {
      const archivo = [path.join(process.cwd(), "client", "public", "icons", nombre), path.join(process.cwd(), "dist", "public", "icons", nombre)].find((x) =>
        fs.existsSync(x),
      );
      if (!archivo) return null;
      const png = await sharp(archivo).resize(lado, lado, { fit: "inside", withoutEnlargement: true }).png().toBuffer();
      return `data:image/png;base64,${png.toString("base64")}`;
    })().catch((err) => {
      console.error(`[academia] pdf: el ícono ${nombre}:`, err);
      iconos.delete(clave);
      return null;
    });
    iconos.set(clave, p);
  }
  return p;
}

// ---------------------------------------------------------------- el certificado

type Color = [number, number, number];
const MARRON: Color = [120, 53, 15]; // #78350f
const AMBAR: Color = [146, 64, 14]; // #92400e
const COBRE: Color = [180, 83, 9]; // #b45309
const DORADO: Color = [245, 158, 11]; // #f59e0b
const OCRE: Color = [161, 98, 7]; // #a16207
const AZUL: Color = [30, 58, 95]; // #1e3a5f
const LINEA: Color = [217, 119, 6]; // #d97706
const CREMA: Color = [255, 251, 235]; // #fffbeb

type Estilo = "normal" | "bold" | "italic" | "bolditalic";
type Trozo = { t: string; estilo?: Estilo; color?: Color; tam?: number };

/**
 * El nombre del archivo del certificado: academia-n1-salvacion-<código>.pdf, academia-nivel-1-<código>.pdf o
 * academia-especialidad-evangelismo-misiones-<código>.pdf.
 */
export const archivoDelCertificado = (d: Pick<DocumentoAcademia, "tipo" | "ref" | "codigo">) =>
  `academia-${d.tipo === "materia" ? d.ref : `${d.tipo}-${d.ref}`}-${d.codigo}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-") + ".pdf";

/** El certificado de una materia, el diploma de un nivel o el certificado de una especialidad, en PDF (A4 apaisado). */
export async function certificadoPdf(d: DocumentoAcademia): Promise<Buffer> {
  const [JsPDF, logo, sello] = await Promise.all([jsPDF(), icono("logo-transparent.png", 260), icono("icon-192.png", 160)]);
  const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  pdf.setProperties({ title: `${NOMBRE_ACADEMIA} · ${d.titulo} · ${d.nombre}`, subject: `Código de verificación ${d.codigo}`, author: NOMBRE_ACADEMIA, creator: NOMBRE_ACADEMIA });
  const W = 297;
  const H = 210;
  const cx = W / 2;
  const color = (c: Color) => pdf.setTextColor(c[0], c[1], c[2]);
  const fuente = (estilo: Estilo, tam: number) => {
    pdf.setFont("times", estilo);
    pdf.setFontSize(tam);
  };
  /** Texto centrado de verdad, también con espacio entre letras. */
  const centrado = (t: string, y: number, estilo: Estilo, tam: number, c: Color, espacio = 0) => {
    fuente(estilo, tam);
    color(c);
    const ancho = pdf.getTextWidth(t) + espacio * Math.max(0, t.length - 1);
    pdf.text(t, cx - ancho / 2, y, espacio ? { charSpace: espacio } : undefined);
  };
  /** Una línea con partes en otro estilo (la nota en negrita), centrada. */
  const mixta = (trozos: Trozo[], y: number, tam: number, c: Color) => {
    const medir = (z: Trozo) => {
      fuente(z.estilo ?? "normal", z.tam ?? tam);
      return pdf.getTextWidth(z.t);
    };
    let x = cx - trozos.reduce((s, z) => s + medir(z), 0) / 2;
    for (const z of trozos) {
      const w = medir(z);
      color(z.color ?? c);
      pdf.text(z.t, x, y);
      x += w;
    }
  };

  // el fondo, los bordes y las esquinas doradas
  pdf.setFillColor(CREMA[0], CREMA[1], CREMA[2]);
  pdf.rect(0, 0, W, H, "F");
  pdf.setDrawColor(COBRE[0], COBRE[1], COBRE[2]);
  pdf.setLineWidth(1.2);
  pdf.roundedRect(8, 8, W - 16, H - 16, 4, 4, "S");
  pdf.setDrawColor(232, 180, 107);
  pdf.setLineWidth(0.35);
  pdf.roundedRect(13, 13, W - 26, H - 26, 2, 2, "S");
  pdf.setDrawColor(DORADO[0], DORADO[1], DORADO[2]);
  pdf.setLineWidth(1.1);
  const L = 22;
  const e = 10.6;
  for (const [x, y, dx, dy] of [[e, e, 1, 1], [W - e, e, -1, 1], [e, H - e, 1, -1], [W - e, H - e, -1, -1]] as const) {
    pdf.line(x, y, x + dx * L, y);
    pdf.line(x, y, x, y + dy * L);
  }
  if (d.revocado) {
    fuente("bold", 76);
    pdf.setTextColor(245, 200, 197);
    const t = "REVOCADO";
    const w = pdf.getTextWidth(t);
    const a = (18 * Math.PI) / 180;
    pdf.text(t, cx - (w / 2) * Math.cos(a), H / 2 + 10 + (w / 2) * Math.sin(a), { angle: 18 });
  }

  // el encabezado
  if (logo) pdf.addImage(logo, "PNG", cx - 9, 17, 18, 18);
  centrado("AVIVANDO EL FUEGO", 42, "bold", 20, AMBAR, 1);
  centrado(`${NOMBRE_ACADEMIA} · Instituto de formación ministerial`, 48, "normal", 10.5, OCRE, 0.2);
  pdf.setDrawColor(LINEA[0], LINEA[1], LINEA[2]);
  pdf.setLineWidth(0.3);
  pdf.line(cx - 35, 52, cx + 35, 52);

  const esNivel = d.tipo === "nivel";
  const esEspecialidad = d.tipo === "especialidad";
  // «Certificado en Fundamentos de la Fe», «Diploma de Obrero Cristiano», «Certificado de Especialidad en …»
  const [cabeza, ...resto] = esNivel || esEspecialidad ? d.titulo.split(" ") : ["Certificado"];
  const subtitulo = esNivel || esEspecialidad ? resto.join(" ") : "de materia aprobada";
  centrado(cabeza.toUpperCase(), 64, "normal", 26, MARRON, 2);
  centrado(subtitulo, 71, "italic", 13, AMBAR);
  centrado("Se certifica que", 82, "normal", 12, MARRON);

  // el nombre, achicado si no entra
  let tam = 28;
  fuente("bolditalic", tam);
  while (tam > 16 && pdf.getTextWidth(d.nombre) > 205) {
    tam -= 1;
    fuente("bolditalic", tam);
  }
  centrado(d.nombre, 95, "bolditalic", tam, AZUL);
  pdf.setDrawColor(LINEA[0], LINEA[1], LINEA[2]);
  pdf.setLineWidth(0.5);
  pdf.line(cx - 92, 99.5, cx + 92, 99.5);

  const nivelTexto = d.nivel ? `Nivel ${d.nivel.n} · ${d.nivel.nombre}` : "";
  const nota = d.nota == null ? "-" : String(d.nota);
  let y = 110;
  if (esEspecialidad) {
    mixta([{ t: "completó la " }, { t: `Especialidad en ${d.especialidad?.nombre ?? ""}`.trim(), estilo: "bold" }, { t: ": sus cinco materias y el trabajo final," }], y, 12, MARRON);
    y += 7;
    mixta([{ t: "con una nota de " }, { t: nota, estilo: "bold", color: COBRE, tam: 13 }, d.honores ? { t: ", con honores", estilo: "bold", color: COBRE } : { t: "" }, { t: "." }], y, 12, MARRON);
  } else if (esNivel) {
    mixta([{ t: "completó el " }, { t: nivelTexto, estilo: "bold" }, { t: `: sus materias, el examen integral y ${d.nivel?.n === 1 ? "el pacto" : "las actividades del nivel"},` }], y, 12, MARRON);
    y += 7;
    mixta([{ t: "con un promedio de " }, { t: nota, estilo: "bold", color: COBRE, tam: 13 }, d.honores ? { t: ", con honores", estilo: "bold", color: COBRE } : { t: "" }, { t: "." }], y, 12, MARRON);
  } else {
    centrado("aprobó la materia", y, "normal", 12, MARRON);
    y += 9;
    fuente("bold", 18);
    const lineas = pdf.splitTextToSize(`«${d.titulo}»`, 230) as string[];
    for (const l of lineas) {
      centrado(l, y, "bold", 18, COBRE);
      y += 7.5;
    }
    y += 0.5;
    if (nivelTexto) {
      centrado(`del ${nivelTexto},`, y, "normal", 11, MARRON);
      y += 6;
    } else if (d.especialidad) {
      centrado(`de la Especialidad en ${d.especialidad.nombre},`, y, "normal", 11, MARRON);
      y += 6;
    }
    mixta(
      [
        { t: "con una calificación de " },
        { t: nota, estilo: "bold", color: COBRE, tam: 12 },
        { t: d.nota != null ? ` (${calificacion(d.nota)})` : "" },
        { t: d.via === "suficiencia" ? ", aprobada por suficiencia." : "." },
      ],
      y,
      11,
      MARRON,
    );
  }
  const fecha = new Date(d.emitido).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: ZONA });
  centrado(`Otorgado el ${fecha}`, Math.max(y + 10, 141), "normal", 10.5, AMBAR);

  // las firmas, el sello y el QR
  const firma = (x: number, titulo: string, sub: string) => {
    pdf.setDrawColor(214, 160, 110);
    pdf.setLineWidth(0.45);
    pdf.line(x - 32, 176, x + 32, 176);
    fuente("bold", 11);
    color(AZUL);
    pdf.text(titulo, x, 181.5, { align: "center" });
    fuente("normal", 8.5);
    color(AMBAR);
    pdf.text(sub, x, 186, { align: "center" });
  };
  firma(72, "Dirección académica", NOMBRE_ACADEMIA);
  if (sello) pdf.addImage(sello, "PNG", cx - 5.5, 162, 11, 11);
  firma(cx, "Avivando el Fuego", "Ministerio");
  const qx = 239;
  if (d.qr) pdf.addImage(d.qr, "PNG", qx - 13, 150, 26, 26);
  const sitio = d.verificar.replace(/^https?:\/\//, "").split("/academia/")[0];
  fuente("normal", 7.5);
  color(AMBAR);
  pdf.text(`Verifica en ${sitio}/academia/verificar`, qx, 180.5, { align: "center" });
  fuente("bold", 9.5);
  color(MARRON);
  pdf.text(d.codigo, qx, 185.5, { align: "center" });

  centrado(ACLARACION_DOCUMENTOS, 194.5, "italic", 8.5, OCRE);
  return Buffer.from(pdf.output("arraybuffer"));
}

// ---------------------------------------------------------------- el expediente

const fechaCorta = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric", timeZone: ZONA }) : "";
const ESTADO: Record<string, string> = { aprobada: "Aprobada", "en-curso": "En curso", disponible: "Sin empezar", "en-preparacion": "En preparación" };

/** El nombre del archivo del expediente: expediente-aaf-2026-00042.pdf. */
export const archivoDelExpediente = (matricula: string | null) =>
  `expediente-${matricula || "academia"}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-") + ".pdf";

/** El expediente académico (kárdex) en PDF: hoja carta, con varias páginas si hace falta. */
export async function expedientePdf(d: AlumnoDetalle): Promise<Buffer> {
  const JsPDF = await jsPDF();
  const pdf = new JsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
  pdf.setProperties({ title: `${NOMBRE_ACADEMIA} · Expediente de ${d.fila.nombre}`, author: NOMBRE_ACADEMIA, creator: NOMBRE_ACADEMIA });
  const M = 16;
  const ANCHO = 215.9 - M * 2;
  const ALTO = 279.4;
  let y = M;

  const pie = () => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(120);
    pdf.text(`${ACLARACION_DOCUMENTOS} Expediente al ${fechaCorta(new Date().toISOString())}.`, M, ALTO - 10);
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
  pdf.text(`Matrícula ${a.matricula} · Promoción ${a.promocion} · Inscrito desde el ${fechaCorta(a.desde)}`, M, y);
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
        fechaCorta(m.aprobada),
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
      niveles.map((n) => [`Nivel ${n.n} · ${n.nombre}`, n.completado ? fechaCorta(n.completado) : "En curso", n.promedio != null ? String(n.promedio) : ""]),
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
      d.certificados.map((c) => [c.titulo, c.codigo, fechaCorta(c.emitido), c.revocado ? "Revocado" : "Válido"]),
    );
  }

  pie();
  return Buffer.from(pdf.output("arraybuffer"));
}
