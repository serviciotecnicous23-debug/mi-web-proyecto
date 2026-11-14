// El carné de la academia dibujado en un lienzo (canvas) de alta resolución, con el diseño de Avivando el Fuego:
// fondo oscuro con brasas, borde dorado, el logo, la foto, los datos y el QR. Lo que se ve en pantalla es la misma
// imagen que se descarga: sin «fotos» de la página (que podían salir en blanco), así que el PDF y la imagen salen
// siempre nítidos. Tamaño de tarjeta de identificación (CR80): 85,6 × 54 mm.
import { ACLARACION_DOCUMENTOS, LEMA, NOMBRE_ACADEMIA, type CarneVista } from "@shared/academia";

/** 85,6 × 54 mm a unos 300 puntos por pulgada. */
export const LIENZO = { ancho: 1012, alto: 638, mm: { ancho: 85.6, alto: 54 } } as const;

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";
const DORADO = "#e9b85c";
const NARANJA = "#ff7a1a";

const cache = new Map<string, Promise<HTMLImageElement | null>>();
/** Una imagen de la misma web (o un data URL) lista para dibujar; null si no carga. */
function imagen(src: string | null): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  let p = cache.get(src);
  if (!p) {
    p = new Promise((resolve) => {
      const img = new Image();
      if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
    cache.set(src, p);
  }
  return p;
}

function redondeado(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Corta un texto en líneas que caben en `ancho` (como mucho `max` líneas, la última con «…»). */
function lineas(ctx: CanvasRenderingContext2D, texto: string, ancho: number, max: number): string[] {
  const palabras = texto.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let actual = "";
  for (const p of palabras) {
    const prueba = actual ? `${actual} ${p}` : p;
    if (ctx.measureText(prueba).width <= ancho) actual = prueba;
    else {
      if (actual) out.push(actual);
      actual = p;
    }
  }
  if (actual) out.push(actual);
  if (out.length > max) {
    const corte = out.slice(0, max);
    let ultima = corte[max - 1];
    while (ctx.measureText(`${ultima}…`).width > ancho && ultima.length > 1) ultima = ultima.slice(0, -1);
    corte[max - 1] = `${ultima}…`;
    return corte;
  }
  return out;
}

/** El fondo común: oscuro, con brasas, el borde dorado y la franja de fuego abajo. */
function fondo(ctx: CanvasRenderingContext2D, W: number, H: number) {
  redondeado(ctx, 0, 0, W, H, 44);
  ctx.save();
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#160b05");
  g.addColorStop(0.55, "#2a1207");
  g.addColorStop(1, "#3b1606");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // el resplandor del fuego, arriba a la derecha y abajo a la izquierda
  for (const [x, y, r, a] of [
    [W * 0.92, H * 0.05, W * 0.55, 0.32],
    [W * 0.05, H * 1.05, W * 0.45, 0.22],
  ] as const) {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(255,122,26,${a})`);
    rg.addColorStop(1, "rgba(255,122,26,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);
  }
  // brasas: puntos de luz que no cambian entre una vez y otra
  let s = 7;
  const azar = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 42; i++) {
    const x = azar() * W;
    const y = azar() * H * 0.9;
    const r = 1.2 + azar() * 2.6;
    ctx.fillStyle = `rgba(255,${150 + Math.round(azar() * 70)},60,${0.12 + azar() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // la franja de fuego
  const f = ctx.createLinearGradient(0, 0, W, 0);
  f.addColorStop(0, "#b45309");
  f.addColorStop(0.45, NARANJA);
  f.addColorStop(1, "#fbbf24");
  ctx.fillStyle = f;
  ctx.fillRect(0, H - 16, W, 16);
  ctx.restore();
  // el borde dorado
  redondeado(ctx, 10, 10, W - 20, H - 20, 36);
  ctx.strokeStyle = "rgba(233,184,92,0.75)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function encabezado(ctx: CanvasRenderingContext2D, logo: HTMLImageElement | null, subtitulo: string) {
  if (logo) ctx.drawImage(logo, 44, 34, 92, 92);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 33px ${SERIF}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(NOMBRE_ACADEMIA.toUpperCase(), logo ? 152 : 48, 78);
  ctx.fillStyle = DORADO;
  ctx.font = `20px ${SANS}`;
  ctx.fillText(subtitulo, logo ? 154 : 50, 110);
  // la línea bajo el encabezado
  const l = ctx.createLinearGradient(44, 0, 968, 0);
  l.addColorStop(0, "rgba(233,184,92,0.9)");
  l.addColorStop(1, "rgba(233,184,92,0)");
  ctx.fillStyle = l;
  ctx.fillRect(44, 140, 924, 2);
}

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
const fechaCorta = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "numeric" });

/** El frente del carné. */
export async function dibujarFrente(c: CarneVista): Promise<HTMLCanvasElement> {
  const { ancho: W, alto: H } = LIENZO;
  const lienzo = document.createElement("canvas");
  lienzo.width = W;
  lienzo.height = H;
  const ctx = lienzo.getContext("2d")!;
  const [logo, foto, qr] = await Promise.all([imagen("/icons/logo-transparent.png?v4"), imagen(c.foto), imagen(c.qr)]);
  fondo(ctx, W, H);
  encabezado(ctx, logo, "Carné de estudiante · Instituto de formación ministerial");

  // la foto (o las iniciales)
  const fx = 48, fy = 170, fw = 196, fh = 244;
  ctx.save();
  redondeado(ctx, fx, fy, fw, fh, 22);
  ctx.clip();
  if (foto) {
    const r = Math.max(fw / foto.width, fh / foto.height);
    const w = foto.width * r, h = foto.height * r;
    ctx.drawImage(foto, fx + (fw - w) / 2, fy + (fh - h) / 2, w, h);
  } else {
    const g = ctx.createLinearGradient(fx, fy, fx + fw, fy + fh);
    g.addColorStop(0, "#7c2d12");
    g.addColorStop(1, "#c2410c");
    ctx.fillStyle = g;
    ctx.fillRect(fx, fy, fw, fh);
    ctx.fillStyle = "#ffedd5";
    ctx.font = `bold 84px ${SERIF}`;
    ctx.textAlign = "center";
    ctx.fillText(iniciales(c.nombre), fx + fw / 2, fy + fh / 2 + 30);
    ctx.textAlign = "left";
  }
  ctx.restore();
  redondeado(ctx, fx, fy, fw, fh, 22);
  ctx.strokeStyle = DORADO;
  ctx.lineWidth = 4;
  ctx.stroke();

  // los datos
  const tx = 276, anchoTexto = 440;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 42px ${SERIF}`;
  const nombre = lineas(ctx, c.nombre, anchoTexto, 2);
  nombre.forEach((l, i) => ctx.fillText(l, tx, 214 + i * 48));
  let y = 214 + nombre.length * 48 + 10;
  ctx.fillStyle = DORADO;
  ctx.font = `bold 19px ${SANS}`;
  ctx.fillText("MATRÍCULA", tx, y);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 36px ${SANS}`;
  ctx.fillText(c.numero, tx, y + 40);
  ctx.fillStyle = "#fed7aa";
  ctx.font = `21px ${SANS}`;
  ctx.fillText(`Promoción ${c.promocion} · desde el ${fechaCorta(c.desde)}`, tx, y + 74);
  y += 116;
  ctx.fillStyle = NARANJA;
  ctx.font = `bold 25px ${SANS}`;
  lineas(ctx, c.estatus.texto, anchoTexto, 2).forEach((l, i) => ctx.fillText(l, tx, y + i * 31));
  if (c.estatus.honores) {
    const by = y + (lineas(ctx, c.estatus.texto, anchoTexto, 2).length * 31) - 4;
    ctx.font = `bold 18px ${SANS}`;
    const t = "CUADRO DE HONOR";
    const w = ctx.measureText(t).width + 28;
    redondeado(ctx, tx, by, w, 34, 17);
    ctx.fillStyle = "rgba(233,184,92,0.2)";
    ctx.fill();
    ctx.strokeStyle = DORADO;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = DORADO;
    ctx.fillText(t, tx + 14, by + 24);
  }

  // el QR sobre blanco
  const qx = 744, qy = 172, qs = 220;
  redondeado(ctx, qx, qy, qs, qs, 18);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  if (qr) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qr, qx + 14, qy + 14, qs - 28, qs - 28);
    ctx.imageSmoothingEnabled = true;
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 20px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText(c.codigo, qx + qs / 2, qy + qs + 32);
  ctx.fillStyle = "#fed7aa";
  ctx.font = `16px ${SANS}`;
  ctx.fillText("Escanéalo para verificar", qx + qs / 2, qy + qs + 56);
  ctx.textAlign = "left";

  // el pie
  const sitio = c.verificar.replace(/^https?:\/\//, "").split("/academia/")[0];
  ctx.fillStyle = "rgba(254,215,170,0.85)";
  ctx.font = `17px ${SANS}`;
  ctx.fillText(`Verifica este carné en ${sitio}/academia/verificar`, 48, H - 40);
  return lienzo;
}

/** El reverso del carné. */
export async function dibujarReverso(c: CarneVista): Promise<HTMLCanvasElement> {
  const { ancho: W, alto: H } = LIENZO;
  const lienzo = document.createElement("canvas");
  lienzo.width = W;
  lienzo.height = H;
  const ctx = lienzo.getContext("2d")!;
  const logo = await imagen("/icons/logo-transparent.png?v4");
  fondo(ctx, W, H);
  encabezado(ctx, logo, "Ministerio Avivando el Fuego");
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = `25px ${SERIF}`;
  lineas(ctx, `Este carné acredita que ${c.nombre} es estudiante de la ${NOMBRE_ACADEMIA}, matrícula ${c.numero}.`, 820, 3).forEach((l, i) =>
    ctx.fillText(l, W / 2, 214 + i * 34),
  );
  ctx.fillStyle = DORADO;
  ctx.font = `italic 30px ${SERIF}`;
  ctx.fillText(`«${LEMA.frase}»`, W / 2, 352);
  ctx.font = `bold 19px ${SANS}`;
  ctx.fillText(LEMA.ref.toUpperCase(), W / 2, 384);
  ctx.fillStyle = "#fed7aa";
  ctx.font = `19px ${SANS}`;
  lineas(ctx, "Para saber si es válido, escanea el código QR del frente: muestra el nombre, la matrícula y el estatus de hoy.", 820, 2).forEach((l, i) =>
    ctx.fillText(l, W / 2, 444 + i * 27),
  );
  ctx.fillStyle = "rgba(254,215,170,0.75)";
  ctx.font = `16px ${SANS}`;
  ctx.fillText(ACLARACION_DOCUMENTOS, W / 2, H - 52);
  ctx.textAlign = "left";
  return lienzo;
}

/** Descarga un archivo hecho en el navegador (sin abrir otra pestaña). */
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

const archivo = (c: CarneVista, ext: string) => `carne-${c.numero}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-") + `.${ext}`;

/** La imagen del frente (para el teléfono). */
export async function descargarCarneImagen(c: CarneVista): Promise<void> {
  const frente = await dibujarFrente(c);
  const blob = await new Promise<Blob | null>((r) => frente.toBlob(r, "image/png"));
  if (!blob) throw new Error("No se pudo hacer la imagen.");
  bajar(archivo(c, "png"), blob);
}

/** El PDF para imprimir: una hoja carta con el frente y el reverso a tamaño real y las marcas de corte. */
export async function descargarCarnePdf(c: CarneVista): Promise<void> {
  const [frente, reverso, { jsPDF }] = await Promise.all([dibujarFrente(c), dibujarReverso(c), import("jspdf")]);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
  const { ancho: w, alto: h } = LIENZO.mm;
  const x = (215.9 - w) / 2;
  const y1 = 40;
  const y2 = y1 + h + 16;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text(`${NOMBRE_ACADEMIA} · Carné de estudiante`, 107.95, 20, { align: "center" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(90);
  pdf.text("Imprímelo al 100 % (tamaño real). Recorta el frente y el reverso por las marcas y pégalos espalda con espalda.", 107.95, 27, { align: "center" });
  pdf.addImage(frente.toDataURL("image/png"), "PNG", x, y1, w, h);
  pdf.addImage(reverso.toDataURL("image/png"), "PNG", x, y2, w, h);
  // marcas de corte en las esquinas
  pdf.setDrawColor(120);
  pdf.setLineWidth(0.2);
  for (const yy of [y1, y2]) {
    for (const [cx, cy] of [[x, yy], [x + w, yy], [x, yy + h], [x + w, yy + h]] as const) {
      const dx = cx === x ? -1 : 1;
      const dy = cy === yy ? -1 : 1;
      pdf.line(cx + dx * 1.5, cy, cx + dx * 6, cy);
      pdf.line(cx, cy + dy * 1.5, cx, cy + dy * 6);
    }
  }
  pdf.setFontSize(8.5);
  pdf.text("Frente", x, y1 - 3);
  pdf.text("Reverso", x, y2 - 3);
  pdf.text(`Verifica en ${c.verificar}`, 107.95, y2 + h + 14, { align: "center" });
  bajar(archivo(c, "pdf"), pdf.output("blob"));
}

/** Imprime el carné a tamaño real (frente y reverso), en una ventana aparte. */
export async function imprimirCarne(c: CarneVista): Promise<void> {
  const [frente, reverso] = await Promise.all([dibujarFrente(c), dibujarReverso(c)]);
  const w = window.open("", "_blank");
  if (!w) throw new Error("El navegador no dejó abrir la ventana para imprimir.");
  const { ancho, alto } = LIENZO.mm;
  w.document.write(`<!DOCTYPE html><html><head><title>${NOMBRE_ACADEMIA} · Carné</title><style>
    body { margin: 0; padding: 12mm; font-family: Arial, sans-serif; color: #333; }
    img { display: block; width: ${ancho}mm; height: ${alto}mm; margin: 0 auto 8mm; }
    p { text-align: center; font-size: 11px; }
    @page { size: letter portrait; margin: 10mm; }
  </style></head><body>
    <p>Recorta el frente y el reverso y pégalos espalda con espalda.</p>
    <img src="${frente.toDataURL("image/png")}" alt="Frente del carné" />
    <img src="${reverso.toDataURL("image/png")}" alt="Reverso del carné" />
  </body></html>`);
  w.document.close();
  let impreso = false;
  const imprimir = () => {
    if (impreso) return;
    impreso = true;
    w.focus();
    w.print();
  };
  w.onload = imprimir;
  setTimeout(imprimir, 900);
}
