// El certificado de la academia en PDF, dibujado directo con jsPDF (texto de verdad, no una captura de la pantalla): sale
// nítido, liviano y nunca en blanco, también en el teléfono. Mismo diseño que DocumentoVista (documento.tsx): A4
// apaisado, borde dorado, el logo, el nombre, la materia o el nivel, la nota, las líneas de las firmas, el QR de la
// verificación y la aclaración de que no es un título universitario oficial.
import { ACLARACION_DOCUMENTOS, NOMBRE_ACADEMIA, calificacion, type DocumentoAcademia } from "@shared/academia";

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

/** Una imagen de la web como data URL (null si no carga: el PDF sale igual, sin ella). */
async function imagenComoDato(src: string): Promise<string | null> {
  try {
    const r = await fetch(src);
    if (!r.ok) return null;
    const b = await r.blob();
    return await new Promise((ok) => {
      const fr = new FileReader();
      fr.onload = () => ok(String(fr.result));
      fr.onerror = () => ok(null);
      fr.readAsDataURL(b);
    });
  } catch {
    return null;
  }
}

function bajar(nombre: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function descargarCertificadoPdf(d: DocumentoAcademia, archivo: string): Promise<void> {
  const [{ jsPDF }, logo, sello] = await Promise.all([import("jspdf"), imagenComoDato("/icons/logo-transparent.png?v4"), imagenComoDato("/icons/icon-192.png?v=6")]);
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
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
  const [cabeza, ...resto] = esNivel ? d.titulo.split(" ") : ["Certificado"];
  const subtitulo = esNivel ? resto.join(" ") : "de materia aprobada";
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
  if (esNivel) {
    mixta([{ t: "completó el " }, { t: nivelTexto, estilo: "bold" }, { t: ": sus materias, el examen integral y el pacto," }], y, 12, MARRON);
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
  const fecha = new Date(d.emitido).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
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
  bajar(archivo, pdf.output("blob"));
}
