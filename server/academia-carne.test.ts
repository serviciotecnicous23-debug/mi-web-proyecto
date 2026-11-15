// El carné hecho en el servidor (server/academia-carne.ts): las dos caras en PNG de 1012 × 638 a 300 ppp, la foto, el
// QR que se lee módulo por módulo, el PDF carta y la huella de cada versión.
// npx tsx --test server/academia-carne.test.ts   (con CARNE_SALIDA=<carpeta> deja los archivos para mirarlos)
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { create as crearQr } from "qrcode";
import { carpetaDeLetras, dibujarCarne, huellaDelCarne, LIENZO, nombreDeArchivo, pdfDelCarne, vistaDelCarne, type DatosCarne } from "./academia-carne";

const BASE: DatosCarne = {
  numero: "AAF-2026-00042",
  promocion: 2026,
  desde: "2026-11-14T03:30:00.000Z", // 13 de noviembre en Texas
  estatus: { clave: "activo", texto: "Estudiante · Nivel 2 · Discipulado", nivel: 2, honores: false },
  nombre: "María José Pérez Ñáñez",
  foto: null,
  fotoPropia: false,
  codigo: "C-7K2M-9QX4",
  verificar: "https://ministerioavivandoelfuego.com/academia/verificar/C-7K2M-9QX4",
};

const salida = process.env.CARNE_SALIDA;
function guardar(nombre: string, b: Buffer) {
  if (!salida) return;
  fs.mkdirSync(salida, { recursive: true });
  fs.writeFileSync(path.join(salida, nombre), b);
}

/** El color de un punto de la imagen. */
async function punto(png: Buffer, x: number, y: number): Promise<[number, number, number]> {
  const px = await sharp(png).extract({ left: x, top: y, width: 1, height: 1 }).removeAlpha().raw().toBuffer();
  return [px[0], px[1], px[2]];
}

test("la letra del carné está (Liberation Sans de pdfjs-dist)", () => {
  const carpeta = carpetaDeLetras();
  assert.ok(carpeta, "no se encontró la carpeta de la letra");
  for (const v of ["Regular", "Bold", "Italic", "BoldItalic"]) assert.ok(fs.existsSync(path.join(carpeta!, `LiberationSans-${v}.ttf`)), v);
});

test("las dos caras son PNG de 1012 × 638 a 300 ppp", async () => {
  const caras = await dibujarCarne(BASE);
  for (const [que, b] of Object.entries(caras)) {
    assert.equal(b.subarray(1, 4).toString(), "PNG", que);
    const m = await sharp(b).metadata();
    assert.equal(m.width, LIENZO.ancho, que);
    assert.equal(m.height, LIENZO.alto, que);
    assert.equal(m.density, 300, que);
    assert.ok(b.length > 20_000 && b.length < 1_500_000, `${que}: ${b.length} bytes`);
    guardar(`${que}.png`, b);
  }
  // las esquinas quedan transparentes (la tarjeta es redondeada) y el centro del fondo es oscuro
  const esquina = await sharp(caras.frente).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  assert.equal(esquina[3], 0);
  const [r, g, b] = await punto(caras.reverso, 500, 300);
  assert.ok(r < 120 && g < 70 && b < 40, `fondo: ${r},${g},${b}`);
});

test("sin foto van las iniciales; con foto, la foto dentro del marco", async () => {
  const sin = await dibujarCarne(BASE);
  const [r0, g0, b0] = await punto(sin.frente, 60, 190); // el degradado naranja oscuro de las iniciales
  assert.ok(r0 > 100 && g0 < 80 && b0 < 40, `iniciales: ${r0},${g0},${b0}`);
  // una foto azul de 600 × 750 guardada como data URL (como las de antes)
  const azul = await sharp({ create: { width: 600, height: 750, channels: 3, background: { r: 30, g: 90, b: 200 } } }).webp().toBuffer();
  const con = await dibujarCarne({ ...BASE, foto: `data:image/webp;base64,${azul.toString("base64")}` });
  const [r, g, b] = await punto(con.frente, 168, 326);
  assert.ok(b > 150 && r < 80, `foto: ${r},${g},${b}`);
  guardar("frente-con-foto.png", con.frente);
  // un enlace de afuera no se lee: quedan las iniciales
  const fuera = await dibujarCarne({ ...BASE, foto: "https://ejemplo.com/foto.jpg" });
  const [r2, g2, b2] = await punto(fuera.frente, 60, 190);
  assert.ok(r2 > 100 && g2 < 80 && b2 < 40, `enlace de afuera: ${r2},${g2},${b2}`);
});

test("el QR dibujado es el de la dirección de verificación, módulo por módulo", async () => {
  const { frente } = await dibujarCarne(BASE);
  const q = crearQr(BASE.verificar, { errorCorrectionLevel: "M" });
  const n = q.modules.size;
  const lado = 236 - 16; // el cuadro blanco menos su margen (como en el dibujo)
  const tam = Math.floor(lado / (n + 2));
  const x0 = Math.round(728 + 8 + (lado - tam * n) / 2);
  const y0 = Math.round(176 + 8 + (lado - tam * n) / 2);
  const raw = await sharp(frente).removeAlpha().raw().toBuffer();
  let malos = 0;
  for (let f = 0; f < n; f++) {
    for (let c = 0; c < n; c++) {
      const x = x0 + c * tam + Math.floor(tam / 2);
      const y = y0 + f * tam + Math.floor(tam / 2);
      const oscuro = raw[(y * LIENZO.ancho + x) * 3] < 128;
      if (oscuro !== !!q.modules.get(f, c)) malos++;
    }
  }
  assert.equal(malos, 0);
  assert.ok(tam >= 4, `módulo de ${tam} px`);
});

test("nombres largos, honores y estatus largos no rompen el dibujo", async () => {
  const caras = await dibujarCarne({
    ...BASE,
    nombre: "María de los Ángeles Guadalupe Fernández de la Concepción Rodríguez Villalobos",
    estatus: { clave: "egresado", texto: "Egresado del Nivel 2 · Discipulado · Estudiante del Nivel 3 · Formación de obreros", nivel: 3, honores: true },
  });
  guardar("frente-largo.png", caras.frente);
  guardar("reverso-largo.png", caras.reverso);
  assert.equal((await sharp(caras.frente).metadata()).width, LIENZO.ancho);
  // el estatus real más largo (en pausa en el Nivel 3)
  const pausa = await dibujarCarne({ ...BASE, estatus: { clave: "pausa", texto: "Estudiante en pausa · Nivel 3 · Formación de obreros", nivel: 3, honores: true } });
  guardar("frente-pausa.png", pausa.frente);
});

test("el PDF es una hoja carta con las dos caras", async () => {
  const caras = await dibujarCarne(BASE);
  const pdf = await pdfDelCarne(BASE, caras);
  guardar("carne.pdf", pdf);
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  const texto = pdf.toString("latin1");
  assert.ok(/\/MediaBox \[0 0 612\.?\d* 792\.?\d*\]/.test(texto), "la hoja no es carta");
  assert.equal((texto.match(/\/Subtype \/Image/g) || []).length, 2);
  assert.ok(pdf.length < 1_200_000, `${pdf.length} bytes`);
});

test("la huella cambia con lo que se dibuja, y las direcciones la llevan", () => {
  const h = huellaDelCarne(7, BASE);
  assert.equal(h, huellaDelCarne(7, { ...BASE }));
  assert.match(h, /^[0-9a-f]{16}$/);
  assert.notEqual(h, huellaDelCarne(8, BASE));
  assert.notEqual(h, huellaDelCarne(7, { ...BASE, foto: "/files/abcdefghijklmnop1234/foto.webp" }));
  assert.notEqual(h, huellaDelCarne(7, { ...BASE, estatus: { ...BASE.estatus, texto: "Estudiante en pausa · Nivel 2" } }));
  assert.notEqual(h, huellaDelCarne(7, { ...BASE, nombre: "Otra Persona" }));
  const v = vistaDelCarne(7, BASE);
  assert.equal(v.archivos.frente, `/api/academia/carne/frente.png?v=${h}`);
  assert.equal(v.archivos.reverso, `/api/academia/carne/reverso.png?v=${h}`);
  assert.equal(v.archivos.pdf, `/api/academia/carne/carne.pdf?v=${h}`);
  assert.equal(v.archivos.nombre, "carne-aaf-2026-00042");
  assert.equal(nombreDeArchivo("AAF-2026-00042"), "carne-aaf-2026-00042");
});
