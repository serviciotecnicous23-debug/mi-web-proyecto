// Los PDF del certificado y del expediente hechos en el servidor (server/academia-pdf.ts): la hoja, las imágenes, los
// nombres de archivo y varias páginas cuando hace falta. npx tsx --test server/academia-pdf.test.ts
// (con PDF_SALIDA=<carpeta> deja los archivos para mirarlos)
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { toDataURL } from "qrcode";
import type { DocumentoAcademia } from "@shared/academia";
import type { AlumnoDetalle } from "@shared/academia-direccion";
import { archivoDelCertificado, archivoDelExpediente, certificadoPdf, expedientePdf } from "./academia-pdf";

const salida = process.env.PDF_SALIDA;
function guardar(nombre: string, b: Buffer) {
  if (!salida) return;
  fs.mkdirSync(salida, { recursive: true });
  fs.writeFileSync(path.join(salida, nombre), b);
}
const texto = (b: Buffer) => b.toString("latin1");
const imagenes = (b: Buffer) => (texto(b).match(/\/Subtype \/Image/g) || []).length;
const paginas = (b: Buffer) => (texto(b).match(/\/Type \/Page\b(?!s)/g) || []).length;

async function documento(extra: Partial<DocumentoAcademia> = {}): Promise<DocumentoAcademia> {
  const verificar = "https://ministerioavivandoelfuego.com/academia/verificar/A-7K2M-9QX4";
  return {
    codigo: "A-7K2M-9QX4",
    tipo: "materia",
    ref: "n2-panorama-nt",
    titulo: "Panorama del Nuevo Testamento",
    nivel: { n: 2, nombre: "Discipulado" },
    nombre: "María José Pérez Ñáñez",
    nota: 94,
    honores: false,
    via: "cursada",
    emitido: "2026-11-15T03:30:00.000Z",
    revocado: null,
    motivo: null,
    verificar,
    qr: await toDataURL(verificar, { margin: 1, width: 240 }),
    ...extra,
  };
}

test("el certificado de una materia: A4 apaisado, con el logo, el sello y el QR", async () => {
  const pdf = await certificadoPdf(await documento());
  guardar("certificado-materia.pdf", pdf);
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(/\/MediaBox \[0 0 841\.8\d* 595\.2\d*\]/.test(texto(pdf)), "la hoja no es A4 apaisada");
  // el logo (con su máscara de transparencia), el sello y el QR
  assert.ok(imagenes(pdf) >= 3, `${imagenes(pdf)} imágenes`);
  assert.equal(paginas(pdf), 1);
  assert.ok(pdf.length > 5_000 && pdf.length < 400_000, `${pdf.length} bytes`);
});

test("el diploma del nivel, el revocado y un nombre muy largo también salen", async () => {
  const nivel = await certificadoPdf(await documento({ tipo: "nivel", ref: "1", titulo: "Certificado en Fundamentos de la Fe", nivel: { n: 1, nombre: "Fundamentos de la fe" }, honores: true, nota: 92 }));
  guardar("diploma-nivel.pdf", nivel);
  assert.equal(nivel.subarray(0, 5).toString(), "%PDF-");
  const revocado = await certificadoPdf(await documento({ revocado: "2026-11-20T00:00:00.000Z", motivo: "Prueba", nombre: "María de los Ángeles Guadalupe Fernández de la Concepción Rodríguez Villalobos" }));
  guardar("certificado-revocado.pdf", revocado);
  assert.equal(paginas(revocado), 1);
  const conQr = await certificadoPdf(await documento());
  const sinQr = await certificadoPdf(await documento({ qr: null }));
  assert.equal(imagenes(conQr) - imagenes(sinQr), 1, "el QR es una imagen más");
});

test("los nombres de archivo", () => {
  assert.equal(archivoDelCertificado({ tipo: "materia", ref: "n1-salvacion", codigo: "A-7K2M-9QX4" }), "academia-n1-salvacion-a-7k2m-9qx4.pdf");
  assert.equal(archivoDelCertificado({ tipo: "nivel", ref: "1", codigo: "N-ABCD-EFGH" }), "academia-nivel-1-n-abcd-efgh.pdf");
  assert.equal(archivoDelExpediente("AAF-2026-00042"), "expediente-aaf-2026-00042.pdf");
  assert.equal(archivoDelExpediente(null), "expediente-academia.pdf");
});

function detalle(materias: number): AlumnoDetalle {
  const m = Array.from({ length: materias }, (_, i) => ({
    id: `m${i}`,
    titulo: `Materia de prueba número ${i + 1} con un título bastante largo para que ocupe dos líneas en la tabla`,
    nivel: 1 + (i % 2),
    inscrita: "2026-10-01T12:00:00.000Z",
    estado: (i % 3 === 0 ? "aprobada" : "en-curso") as any,
    lecciones: 3,
    de: 4,
    versiculo: true,
    intentos: 1,
    mejor: 88,
    nota: i % 3 === 0 ? 88 : null,
    aprobada: i % 3 === 0 ? "2026-11-01T12:00:00.000Z" : null,
  }));
  return {
    fila: {
      userId: 7, nombre: "María José Pérez Ñáñez", matricula: "AAF-2026-00042", promocion: 2026, pais: "Estados Unidos", ciudad: "Houston", iglesia: "",
      estatus: { clave: "activo", texto: "Estudiante · Nivel 2 · Discipulado", nivel: 2, honores: true },
      materias, aprobadas: 1, enCurso: [], lecciones: 10, desde: "2026-09-01T12:00:00.000Z",
    } as any,
    ficha: null,
    materias: m as any,
    niveles: [{ n: 1, nombre: "Fundamentos de la fe", pacto: "2026-10-20T12:00:00.000Z", completado: "2026-10-21T12:00:00.000Z", promedio: 91 }],
    certificados: [],
    actividad: [],
    mentor: { userId: 3, nombre: "Pastor de prueba" },
    puede: { contacto: false, revisar: false, documentos: false, mentores: false },
  };
}

test("el expediente: hoja carta, y varias páginas cuando tiene muchas materias", async () => {
  const corto = await expedientePdf(detalle(3));
  guardar("expediente-corto.pdf", corto);
  assert.equal(corto.subarray(0, 5).toString(), "%PDF-");
  assert.ok(/\/MediaBox \[0 0 612\.?\d* 792\.?\d*\]/.test(texto(corto)), "la hoja no es carta");
  assert.equal(paginas(corto), 1);
  const largo = await expedientePdf(detalle(40));
  guardar("expediente-largo.pdf", largo);
  assert.ok(paginas(largo) >= 2, `${paginas(largo)} páginas`);
});
