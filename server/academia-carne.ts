/**
 * El carné de la academia hecho en el servidor (docs/academia.md, «La matrícula y el estatus»): la imagen del frente y
 * del reverso (PNG) y el PDF para imprimir (hoja carta con las dos caras a tamaño real y marcas de corte).
 *
 * Por qué en el servidor: el carné dibujado en el teléfono se descargaba con un enlace hecho en la página (blob). En el
 * iPhone, en la web instalada como app y en los navegadores de Facebook, Instagram o WhatsApp eso abre una vista sin
 * descarga y sin salida. Ahora cada archivo tiene su dirección, su tipo y su nombre (Content-Disposition): se ve, se
 * guarda (manteniendo el dedo sobre la imagen) y se descarga igual en todos lados, y la página no dibuja nada.
 *
 * - El diseño es el de Avivando el Fuego: fondo oscuro con brasas, borde dorado, el logo, la foto, los datos y el QR,
 *   en 1012 × 638 (85,6 × 54 mm, la tarjeta CR80, a 300 puntos por pulgada).
 * - Se dibuja con @napi-rs/canvas (Skia, sin librerías del sistema) y la letra Liberation Sans que trae pdfjs-dist,
 *   así que no depende de las fuentes de la máquina. La foto se lee solo de los archivos de la propia web.
 * - Cada versión del carné (nombre, matrícula, estatus, foto y código) tiene su huella: las direcciones llevan
 *   ?v=<huella>, el navegador las guarda sin volver a pedirlas y el servidor recuerda las últimas que dibujó.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import type { Express, Request, Response } from "express";
import type { Image, SKRSContext2D } from "@napi-rs/canvas";
import { create as crearQr } from "qrcode";
import sharp from "sharp";
import { pool } from "./db";
import { isOwnFileUrl } from "./file-storage";
import { ACLARACION_DOCUMENTOS, LEMA, NOMBRE_ACADEMIA, type CarneVista } from "@shared/academia";
import { enlaceVerificar, inscritoDe, nombreAcademico } from "./academia-comun";
import { matriculaDe } from "./academia-matricula";

/** 85,6 × 54 mm a unos 300 puntos por pulgada. */
export const LIENZO = { ancho: 1012, alto: 638, mm: { ancho: 85.6, alto: 54 }, ppp: 300 } as const;
/** Cambia si cambia el dibujo: así las direcciones viejas (guardadas en los navegadores) dejan de valer. */
const DISENO = "carne-servidor-1";
const LETRA = "Carne Sans";
const DORADO = "#e9b85c";
const NARANJA = "#ff7a1a";
/** La foto más grande que se lee (las del carné pesan unos 60 KB; las de perfil, unos cientos). */
const FOTO_MAXIMA = 12 * 1024 * 1024;

/** Lo que lleva el carné: lo que ve la página, sin las direcciones de los archivos. */
export type DatosCarne = Omit<CarneVista, "archivos">;
export type CarasCarne = { frente: Buffer; reverso: Buffer };

// ---------------------------------------------------------------- los datos y la huella

/** Los datos del carné de un alumno matriculado. */
export async function datosDelCarne(userId: number): Promise<DatosCarne> {
  const m = await matriculaDe(userId);
  if (!m) throw new Error("El alumno no está matriculado.");
  const { rows } = await pool.query(
    `SELECT a.carne_codigo, COALESCE(i.foto_url, u.avatar_url) AS foto, (i.foto_url IS NOT NULL) AS foto_propia
       FROM academia_alumnos a JOIN users u ON u.id = a.user_id LEFT JOIN academia_inscripciones i ON i.user_id = a.user_id
      WHERE a.user_id = $1`,
    [userId],
  );
  const r = rows[0];
  return {
    ...m,
    nombre: await nombreAcademico(userId),
    foto: r?.foto || null,
    fotoPropia: !!r?.foto_propia,
    codigo: r.carne_codigo,
    verificar: enlaceVerificar(r.carne_codigo),
  };
}

/** La huella de esta versión del carné: cambia si cambia algo de lo que se dibuja. */
export function huellaDelCarne(userId: number, d: DatosCarne): string {
  const partes = [DISENO, userId, d.nombre, d.numero, d.promocion, d.desde, d.estatus.texto, d.estatus.honores, d.codigo, d.verificar, d.foto];
  return createHash("sha256").update(JSON.stringify(partes)).digest("hex").slice(0, 16);
}

/** El nombre de los archivos: carne-aaf-2026-00042. */
export const nombreDeArchivo = (numero: string) => `carne-${numero}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-+$/, "");

/** Lo que recibe la página: los datos y la dirección de cada archivo con la huella de esta versión. */
export function vistaDelCarne(userId: number, d: DatosCarne): CarneVista {
  const v = huellaDelCarne(userId, d);
  return {
    ...d,
    archivos: {
      frente: `/api/academia/carne/frente.png?v=${v}`,
      reverso: `/api/academia/carne/reverso.png?v=${v}`,
      pdf: `/api/academia/carne/carne.pdf?v=${v}`,
      nombre: nombreDeArchivo(d.numero),
    },
  };
}

// ---------------------------------------------------------------- el lienzo, la letra, el logo y la foto

type Modulo = typeof import("@napi-rs/canvas");
let modulo: Promise<Modulo> | null = null;

/** La carpeta con la letra Liberation Sans (la trae pdfjs-dist, que la usa para dibujar los PDF). */
export function carpetaDeLetras(): string | null {
  const candidatas: string[] = [];
  try {
    candidatas.push(path.join(path.dirname(createRequire(import.meta.url).resolve("pdfjs-dist/package.json")), "standard_fonts"));
  } catch {
    // (sin pdfjs-dist resoluble desde aquí: se prueba con la carpeta del proyecto)
  }
  candidatas.push(path.join(process.cwd(), "node_modules", "pdfjs-dist", "standard_fonts"));
  return candidatas.find((d) => fs.existsSync(path.join(d, "LiberationSans-Regular.ttf"))) ?? null;
}

/** El lienzo de Skia, con la letra ya registrada (se carga la primera vez que se dibuja un carné). */
function lienzo(): Promise<Modulo> {
  modulo ??= (async () => {
    const importado: any = await import("@napi-rs/canvas");
    // (desde el paquete CommonJS de producción puede llegar dentro de `default`)
    const m: Modulo = importado.createCanvas ? importado : importado.default;
    const carpeta = carpetaDeLetras();
    if (!carpeta) console.warn("[academia] carné: no encontré la letra Liberation Sans (pdfjs-dist/standard_fonts)");
    else for (const v of ["Regular", "Bold", "Italic", "BoldItalic"]) m.GlobalFonts.registerFromPath(path.join(carpeta, `LiberationSans-${v}.ttf`), LETRA);
    return m;
  })().catch((err) => {
    modulo = null;
    throw err;
  });
  return modulo;
}

let logo: Promise<Image | null> | null = null;
/** El logo del ministerio, reducido una sola vez (el original pesa 1,5 MB). */
function logoDelMinisterio(m: Modulo): Promise<Image | null> {
  logo ??= (async () => {
    const archivo = [
      path.join(process.cwd(), "client", "public", "icons", "logo-transparent.png"),
      path.join(process.cwd(), "dist", "public", "icons", "logo-transparent.png"),
    ].find((p) => fs.existsSync(p));
    if (!archivo) return null;
    const png = await sharp(archivo).resize(184, 184, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    return m.loadImage(png);
  })().catch((err) => {
    console.error("[academia] carné: el logo:", err);
    logo = null;
    return null;
  });
  return logo;
}

/** Los bytes de una foto guardada en la web (/files/…, el almacenamiento S3/R2 de la web o un data URL antiguo). */
async function bytesDeFoto(url: string): Promise<Buffer | null> {
  const propio = /^\/files\/([A-Za-z0-9_-]{16,40})(?:\/|$)/.exec(url);
  if (propio) {
    const { rows } = await pool.query(`SELECT size, mime FROM stored_files WHERE id = $1`, [propio[1]]);
    if (!rows[0] || Number(rows[0].size) > FOTO_MAXIMA || !String(rows[0].mime).startsWith("image/")) return null;
    const { rows: partes } = await pool.query(`SELECT data FROM stored_file_chunks WHERE file_id = $1 ORDER BY idx`, [propio[1]]);
    return partes.length ? Buffer.concat(partes.map((p: any) => Buffer.from(p.data))) : null;
  }
  if (url.startsWith("data:image/")) {
    const coma = url.indexOf(",");
    if (coma < 0 || !url.slice(0, coma).endsWith(";base64") || url.length > FOTO_MAXIMA * 1.4) return null;
    return Buffer.from(url.slice(coma + 1), "base64");
  }
  // Solo el almacenamiento de la web (isOwnFileUrl compara con su dirección fija): nunca un enlace de afuera.
  if (!/^https:\/\//.test(url) || !isOwnFileUrl(url)) return null;
  const r = await fetch(url, { signal: AbortSignal.timeout(6000), redirect: "error" });
  if (!r.ok || Number(r.headers.get("content-length") || 0) > FOTO_MAXIMA) return null;
  const b = Buffer.from(await r.arrayBuffer());
  return b.length > FOTO_MAXIMA ? null : b;
}

/** La foto lista para el marco del carné (240 × 300, girada según la cámara), o null para dibujar las iniciales. */
async function fotoDelCarne(m: Modulo, url: string | null, ancho: number, alto: number): Promise<Image | null> {
  if (!url) return null;
  try {
    const bytes = await bytesDeFoto(url);
    if (!bytes) return null;
    const jpg = await sharp(bytes, { failOn: "none" })
      .rotate()
      .resize(ancho, alto, { fit: "cover", position: "centre" })
      .flatten({ background: "#7c2d12" })
      .jpeg({ quality: 92 })
      .toBuffer();
    return await m.loadImage(jpg);
  } catch (err) {
    console.warn("[academia] carné: no se pudo leer la foto:", (err as Error)?.message ?? err);
    return null;
  }
}

// ---------------------------------------------------------------- el dibujo

function redondeado(ctx: SKRSContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Corta un texto en líneas que caben en `ancho` (como mucho `max` líneas, la última con «…»). */
function lineas(ctx: SKRSContext2D, texto: string, ancho: number, max: number): string[] {
  const out: string[] = [];
  let actual = "";
  for (const p of texto.split(/\s+/).filter(Boolean)) {
    const prueba = actual ? `${actual} ${p}` : p;
    if (ctx.measureText(prueba).width <= ancho) actual = prueba;
    else {
      if (actual) out.push(actual);
      actual = p;
    }
  }
  if (actual) out.push(actual);
  if (out.length <= max) return out;
  const corte = out.slice(0, max);
  let ultima = corte[max - 1];
  while (ctx.measureText(`${ultima}…`).width > ancho && ultima.length > 1) ultima = ultima.slice(0, -1);
  corte[max - 1] = `${ultima.trimEnd()}…`;
  return corte;
}

/** Como `lineas`, pero corta entre las partes separadas por « · » («Estudiante · Nivel 1» / «Fundamentos de la fe»). */
function lineasPorPartes(ctx: SKRSContext2D, texto: string, ancho: number, max: number): string[] {
  const out: string[] = [];
  let actual = "";
  for (const parte of texto.split(" · ")) {
    const prueba = actual ? `${actual} · ${parte}` : parte;
    if (!actual || ctx.measureText(prueba).width <= ancho) actual = prueba;
    else {
      out.push(actual);
      actual = parte;
    }
  }
  if (actual) out.push(actual);
  const todas = out.flatMap((l) => (ctx.measureText(l).width <= ancho ? [l] : lineas(ctx, l, ancho, 99)));
  if (todas.length <= max) return todas;
  // lo que sobra va en la última línea, cortado con «…»
  return [...todas.slice(0, max - 1), ...lineas(ctx, todas.slice(max - 1).join(" "), ancho, 1)];
}

type Medida = { px: number; max: number; alto: number };
/**
 * El texto completo en la medida más grande que cabe (probando de mayor a menor); con la última, si aun así no cabe,
 * se corta con «…». `partes` corta entre las partes separadas por « · » antes que entre palabras.
 */
function encajar(ctx: SKRSContext2D, texto: string, ancho: number, peso: string, medidas: Medida[], partes = false) {
  for (const [i, m] of medidas.entries()) {
    ctx.font = `${peso}${m.px}px "${LETRA}"`;
    const todas = partes ? lineasPorPartes(ctx, texto, ancho, 99) : lineas(ctx, texto, ancho, 99);
    if (todas.length <= m.max) return { ...m, lineas: todas };
    if (i === medidas.length - 1) return { ...m, lineas: partes ? lineasPorPartes(ctx, texto, ancho, m.max) : lineas(ctx, texto, ancho, m.max) };
  }
  throw new Error("sin medidas");
}

/** El fondo común: oscuro, con brasas, el borde dorado y la franja de fuego abajo. */
function fondo(ctx: SKRSContext2D, W: number, H: number) {
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
  const azar = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 42; i++) {
    const x = azar() * W;
    const y = azar() * H * 0.9;
    const r = 1.2 + azar() * 2.6;
    ctx.fillStyle = `rgba(255,${150 + Math.round(azar() * 70)},60,${(0.12 + azar() * 0.3).toFixed(3)})`;
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

function encabezado(ctx: SKRSContext2D, logoImg: Image | null, subtitulo: string) {
  if (logoImg) ctx.drawImage(logoImg, 44, 34, 92, 92);
  const x = logoImg ? 152 : 48;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 33px "${LETRA}"`;
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(NOMBRE_ACADEMIA.toUpperCase(), x, 78);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = DORADO;
  ctx.font = `20px "${LETRA}"`;
  ctx.fillText(subtitulo, x + 2, 110);
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
/** La fecha en el día de la sede (Texas), no en el del servidor. */
const fechaCorta = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "America/Chicago" });

/** El código QR dibujado módulo por módulo (nítido, sin suavizar), dentro del cuadro blanco de `lado`. */
function qr(ctx: SKRSContext2D, texto: string, x: number, y: number, lado: number) {
  const q = crearQr(texto, { errorCorrectionLevel: "M" });
  const n = q.modules.size;
  const tam = Math.floor(lado / (n + 2)); // con un módulo de margen a cada lado
  const x0 = Math.round(x + (lado - tam * n) / 2);
  const y0 = Math.round(y + (lado - tam * n) / 2);
  ctx.fillStyle = "#1c1917";
  for (let f = 0; f < n; f++) for (let c = 0; c < n; c++) if (q.modules.get(f, c)) ctx.fillRect(x0 + c * tam, y0 + f * tam, tam, tam);
}

function frente(m: Modulo, d: DatosCarne, logoImg: Image | null, foto: Image | null) {
  const { ancho: W, alto: H } = LIENZO;
  const c = m.createCanvas(W, H);
  const ctx = c.getContext("2d");
  fondo(ctx, W, H);
  encabezado(ctx, logoImg, "Carné de estudiante · Instituto de formación ministerial");

  // la foto (o las iniciales)
  const fx = 48, fy = 176, fw = 240, fh = 300;
  ctx.save();
  redondeado(ctx, fx, fy, fw, fh, 22);
  ctx.clip();
  if (foto) ctx.drawImage(foto, fx, fy, fw, fh);
  else {
    const g = ctx.createLinearGradient(fx, fy, fx + fw, fy + fh);
    g.addColorStop(0, "#7c2d12");
    g.addColorStop(1, "#c2410c");
    ctx.fillStyle = g;
    ctx.fillRect(fx, fy, fw, fh);
    ctx.fillStyle = "#ffedd5";
    ctx.font = `bold 84px "${LETRA}"`;
    ctx.textAlign = "center";
    ctx.fillText(iniciales(d.nombre), fx + fw / 2, fy + fh / 2 + 30);
    ctx.textAlign = "left";
  }
  ctx.restore();
  redondeado(ctx, fx, fy, fw, fh, 22);
  ctx.strokeStyle = DORADO;
  ctx.lineWidth = 4;
  ctx.stroke();

  // los datos
  const tx = 320, anchoTexto = 384;
  ctx.fillStyle = "#ffffff";
  const nombre = encajar(ctx, d.nombre, anchoTexto, "bold ", [
    { px: 40, max: 2, alto: 46 },
    { px: 34, max: 2, alto: 40 },
    { px: 30, max: 3, alto: 35 },
    { px: 26, max: 3, alto: 30 },
    { px: 23, max: 3, alto: 27 },
  ]);
  nombre.lineas.forEach((l, i) => ctx.fillText(l, tx, 226 + i * nombre.alto));
  let y = 226 + nombre.lineas.length * nombre.alto + 14;
  ctx.fillStyle = DORADO;
  ctx.font = `bold 19px "${LETRA}"`;
  ctx.letterSpacing = "2px";
  ctx.fillText("MATRÍCULA", tx, y);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 36px "${LETRA}"`;
  ctx.fillText(d.numero, tx, y + 40);
  ctx.fillStyle = "#fed7aa";
  ctx.font = `21px "${LETRA}"`;
  ctx.fillText(`Promoción ${d.promocion} · desde el ${fechaCorta(d.desde)}`, tx, y + 74);
  y += 116;
  ctx.fillStyle = NARANJA;
  const estatus = encajar(ctx, d.estatus.texto, anchoTexto, "bold ", [
    { px: 25, max: 2, alto: 31 },
    { px: 22, max: 2, alto: 28 },
    { px: 20, max: 3, alto: 25 },
  ], true);
  estatus.lineas.forEach((l, i) => ctx.fillText(l, tx, y + i * estatus.alto));
  if (d.estatus.honores) {
    const by = y + estatus.lineas.length * estatus.alto - 4;
    ctx.font = `bold 18px "${LETRA}"`;
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
  const qx = 728, qy = 176, qs = 236;
  redondeado(ctx, qx, qy, qs, qs, 18);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  qr(ctx, d.verificar, qx + 8, qy + 8, qs - 16);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 20px "${LETRA}"`;
  ctx.textAlign = "center";
  ctx.fillText(d.codigo, qx + qs / 2, qy + qs + 32);
  ctx.fillStyle = "#fed7aa";
  ctx.font = `16px "${LETRA}"`;
  ctx.fillText("Escanéalo para verificar", qx + qs / 2, qy + qs + 56);
  ctx.textAlign = "left";

  // el pie
  const sitio = d.verificar.replace(/^https?:\/\//, "").split("/academia/")[0];
  ctx.fillStyle = "rgba(254,215,170,0.85)";
  ctx.font = `17px "${LETRA}"`;
  ctx.fillText(`Verifica este carné en ${sitio}/academia/verificar`, 48, H - 40);
  return c;
}

function reverso(m: Modulo, d: DatosCarne, logoImg: Image | null) {
  const { ancho: W, alto: H } = LIENZO;
  const c = m.createCanvas(W, H);
  const ctx = c.getContext("2d");
  fondo(ctx, W, H);
  encabezado(ctx, logoImg, "Ministerio Avivando el Fuego");
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  const acredita = encajar(ctx, `Este carné acredita que ${d.nombre} es estudiante de la ${NOMBRE_ACADEMIA}, matrícula ${d.numero}.`, 820, "", [
    { px: 25, max: 3, alto: 34 },
    { px: 22, max: 4, alto: 29 },
  ]);
  acredita.lineas.forEach((l, i) => ctx.fillText(l, W / 2, 206 + i * acredita.alto));
  ctx.fillStyle = DORADO;
  ctx.font = `italic 30px "${LETRA}"`;
  ctx.fillText(`«${LEMA.frase}»`, W / 2, 352);
  ctx.font = `bold 19px "${LETRA}"`;
  ctx.letterSpacing = "2px";
  ctx.fillText(LEMA.ref.toUpperCase(), W / 2, 384);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "#fed7aa";
  ctx.font = `19px "${LETRA}"`;
  lineas(ctx, "Para saber si es válido, escanea el código QR del frente: muestra el nombre, la matrícula y el estatus de hoy.", 820, 2).forEach((l, i) =>
    ctx.fillText(l, W / 2, 444 + i * 27),
  );
  ctx.fillStyle = "rgba(254,215,170,0.75)";
  ctx.font = `16px "${LETRA}"`;
  ctx.fillText(ACLARACION_DOCUMENTOS, W / 2, H - 52);
  ctx.textAlign = "left";
  return c;
}

/** Dibuja el frente y el reverso en PNG (con 300 puntos por pulgada anotados: se imprimen a tamaño real). */
export async function dibujarCarne(d: DatosCarne): Promise<CarasCarne> {
  const m = await lienzo();
  const [logoImg, foto] = await Promise.all([logoDelMinisterio(m), fotoDelCarne(m, d.foto, 240, 300)]);
  const [f, r] = await Promise.all([
    frente(m, d, logoImg, foto).encode("png", { resolution: LIENZO.ppp }),
    reverso(m, d, logoImg).encode("png", { resolution: LIENZO.ppp }),
  ]);
  return { frente: f, reverso: r };
}

/** El PDF para imprimir: una hoja carta con el frente y el reverso a tamaño real y las marcas de corte. */
export async function pdfDelCarne(d: DatosCarne, caras: CarasCarne): Promise<Buffer> {
  const mod: any = await import("jspdf");
  const JsPDF = mod.jsPDF ?? mod.default?.jsPDF ?? mod.default;
  // JPEG sobre blanco (las esquinas redondeadas no salen negras): el PDF pesa poco
  const [fj, rj] = await Promise.all(
    [caras.frente, caras.reverso].map((b) => sharp(b).flatten({ background: "#ffffff" }).jpeg({ quality: 92 }).toBuffer()),
  );
  const pdf = new JsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
  pdf.setProperties({ title: `${NOMBRE_ACADEMIA} · Carné de ${d.nombre}`, subject: `Carné de estudiante ${d.numero}`, author: NOMBRE_ACADEMIA, creator: NOMBRE_ACADEMIA });
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
  pdf.addImage(`data:image/jpeg;base64,${fj.toString("base64")}`, "JPEG", x, y1, w, h);
  pdf.addImage(`data:image/jpeg;base64,${rj.toString("base64")}`, "JPEG", x, y2, w, h);
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
  pdf.text(`Verifica en ${d.verificar}`, 107.95, y2 + h + 14, { align: "center" });
  return Buffer.from(pdf.output("arraybuffer"));
}

// ---------------------------------------------------------------- lo hecho, en memoria

type Hecho = CarasCarne & { pdf?: Buffer };
const hechos = new Map<string, Hecho>();
const enCurso = new Map<string, Promise<Hecho>>();
/** Los últimos carnés dibujados (cada uno pesa ~1 MB con su PDF). */
const GUARDADOS = 16;

function carneHecho(huella: string, d: DatosCarne): Promise<Hecho> {
  const ya = hechos.get(huella);
  if (ya) {
    hechos.delete(huella); // (queda como el más reciente)
    hechos.set(huella, ya);
    return Promise.resolve(ya);
  }
  let p = enCurso.get(huella);
  if (!p) {
    p = dibujarCarne(d)
      .then((h: Hecho) => {
        hechos.set(huella, h);
        while (hechos.size > GUARDADOS) hechos.delete(hechos.keys().next().value as string);
        return h;
      })
      .finally(() => enCurso.delete(huella));
    enCurso.set(huella, p);
  }
  return p;
}

const disposicion = (tipo: "inline" | "attachment", archivo: string) => `${tipo}; filename="${archivo}"`;

/** Un carné de muestra (nadie de verdad) para la comprobación de salud. */
const MUESTRA: DatosCarne = {
  numero: "AAF-2026-00000",
  promocion: 2026,
  desde: "2026-01-01T12:00:00.000Z",
  estatus: { clave: "activo", texto: "Estudiante · Nivel 1 · Fundamentos de la fe", nivel: 1, honores: false },
  nombre: "Carné de muestra",
  foto: null,
  fotoPropia: false,
  codigo: "C-MUES-TRA0",
  verificar: enlaceVerificar("C-MUES-TRA0"),
};
type Salud = { ok: boolean; letra: boolean; logo: boolean; frente: number; reverso: number; pdf: number; ms: number; error?: string };
let salud: { cuando: number; p: Promise<Salud> } | null = null;

async function comprobarSalud(): Promise<Salud> {
  const t = Date.now();
  try {
    const m = await lienzo();
    const logoImg = await logoDelMinisterio(m);
    const caras = await dibujarCarne(MUESTRA);
    const pdf = await pdfDelCarne(MUESTRA, caras);
    const bien = caras.frente.subarray(1, 4).toString() === "PNG" && pdf.subarray(0, 5).toString() === "%PDF-";
    return { ok: bien, letra: m.GlobalFonts.has(LETRA), logo: !!logoImg, frente: caras.frente.length, reverso: caras.reverso.length, pdf: pdf.length, ms: Date.now() - t };
  } catch (err) {
    console.error("[academia] carné (salud):", err);
    return { ok: false, letra: false, logo: false, frente: 0, reverso: 0, pdf: 0, ms: Date.now() - t, error: String((err as Error)?.message ?? err).slice(0, 200) };
  }
}

async function enviarArchivo(req: Request, res: Response, que: "frente" | "reverso" | "pdf") {
  try {
    const a = await inscritoDe(req, res);
    if (!a) return;
    const d = await datosDelCarne(a.userId);
    const huella = huellaDelCarne(a.userId, d);
    const etag = `"${huella}-${que}"`;
    // con la huella de hoy en la dirección, el navegador lo guarda sin volver a pedirlo; sin ella, pregunta cada vez
    res.setHeader("Cache-Control", req.query.v === huella ? "private, max-age=31536000, immutable" : "private, no-cache");
    res.setHeader("ETag", etag);
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.headers["if-none-match"] === etag) return res.status(304).end();
    const hecho = await carneHecho(huella, d);
    const base = nombreDeArchivo(d.numero);
    let cuerpo: Buffer;
    if (que === "pdf") {
      hecho.pdf ??= await pdfDelCarne(d, hecho);
      cuerpo = hecho.pdf;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", disposicion(req.query.ver === "1" ? "inline" : "attachment", `${base}.pdf`));
    } else {
      cuerpo = hecho[que];
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Disposition", disposicion(req.query.descargar === "1" ? "attachment" : "inline", `${base}-${que}.png`));
    }
    res.setHeader("Content-Length", String(cuerpo.length));
    res.end(cuerpo);
  } catch (err) {
    console.error(`[academia] carné (${que}):`, err);
    if (!res.headersSent) res.status(500).json({ message: "No se pudo preparar el carné. Inténtalo en unos minutos." });
  }
}

export function registerAcademiaCarneRoutes(app: Express) {
  // Mi carné digital: los datos y las direcciones de sus archivos (pide la inscripción).
  app.get("/api/academia/carne", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(vistaDelCarne(a.userId, await datosDelCarne(a.userId)));
    } catch (err) {
      console.error("[academia] carne:", err);
      res.sendStatus(500);
    }
  });

  // La salud del carné en este servidor, sin datos de nadie: dibuja un carné de muestra (lienzo nativo, letra, logo,
  // sharp y jsPDF) y dice si salió. Sirve para comprobar cada despliegue sin entrar con una cuenta. Se guarda 10 minutos.
  app.get("/api/academia/carne/salud", async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (!salud || Date.now() - salud.cuando > 10 * 60_000) salud = { cuando: Date.now(), p: comprobarSalud() };
    const r = await salud.p;
    if (!r.ok) salud = null; // (si falló, la próxima vez se vuelve a probar)
    res.status(r.ok ? 200 : 503).json(r);
  });

  // Los archivos del carné. Las imágenes se muestran (y con ?descargar=1 se descargan); el PDF se descarga (con ?ver=1
  // se abre para imprimirlo).
  app.get("/api/academia/carne/frente.png", (req, res) => enviarArchivo(req, res, "frente"));
  app.get("/api/academia/carne/reverso.png", (req, res) => enviarArchivo(req, res, "reverso"));
  app.get("/api/academia/carne/carne.pdf", (req, res) => enviarArchivo(req, res, "pdf"));
}
