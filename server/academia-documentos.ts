/**
 * Los documentos de la academia (docs/academia.md, «Los documentos»): el certificado del nivel completo y el de cada
 * especialidad completa (sus cinco materias y su trabajo final). Salen solos, con un código verificable
 * (AAF-XXXX-XXXX) y un QR que lleva a la verificación pública. Desde el 23-nov-2026 cada materia aprobada da su
 * insignia (en la vitrina del alumno) y no un certificado; los certificados de materia emitidos antes siguen valiendo.
 *
 * - El alumno ve sus documentos completos, con la nota o el promedio; la Dirección académica también.
 * - La verificación pública dice si el documento es válido, de quién es, qué es y cuándo se emitió, sin notas.
 * - Cada documento guarda el nombre del alumno del día en que se emitió, como un diploma impreso: el de su ficha de
 *   inscripción (server/academia-inscripcion.ts).
 */
import type { Express, Request } from "express";
import { randomBytes } from "node:crypto";
import { toDataURL } from "qrcode";
import { pool } from "./db";
import {
  ACLARACION_DOCUMENTOS, ESPECIALIDADES, HONORES, NIVELES, NOMBRE_ACADEMIA, PATRON_CODIGO, codigoDe, materiaPorId, normalizarCodigo, puedeRevisar,
  tituloEspecialidad, type DocumentoAcademia, type EspecialidadDef, type MateriaDef, type NivelDef, type TipoDocumento, type VerificacionAcademia,
} from "@shared/academia";
import { alumnoDe, enlaceVerificar, frenar, nombreAcademico } from "./academia-comun";
import { verificacionDeCarne } from "./academia-matricula";
import { archivoDelCertificado, certificadoPdf, enviarPdf } from "./academia-pdf";

export { enlaceVerificar } from "./academia-comun";

type FilaDocumento = {
  codigo: string;
  user_id: number;
  tipo: TipoDocumento;
  ref: string;
  titulo: string;
  nombre: string;
  nota: number | null;
  honores: boolean;
  via: string;
  emitido_at: string;
  revocado_at: string | null;
  motivo: string | null;
};

/** Guarda un documento si todavía no existe (uno por alumno, tipo y materia o nivel). Devuelve su código. */
async function emitir(userId: number, tipo: TipoDocumento, ref: string, titulo: string, nota: number | null, honores: boolean, via = "cursada"): Promise<string> {
  const ya = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = $2 AND ref = $3`, [userId, tipo, ref]);
  if (ya.rows[0]) return ya.rows[0].codigo as string;
  const nombre = await nombreAcademico(userId);
  for (let intento = 0; intento < 5; intento++) {
    const codigo = codigoDe(randomBytes(5));
    try {
      const { rows } = await pool.query(
        `INSERT INTO academia_certificados (codigo, user_id, tipo, ref, titulo, nombre, nota, honores, via)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (user_id, tipo, ref) DO NOTHING RETURNING codigo`,
        [codigo, userId, tipo, ref, titulo, nombre, nota, honores, via],
      );
      if (rows[0]) return rows[0].codigo as string;
      // otra petición lo emitió al mismo tiempo
      const otro = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = $2 AND ref = $3`, [userId, tipo, ref]);
      if (otro.rows[0]) return otro.rows[0].codigo as string;
    } catch (err: any) {
      if (err?.code !== "23505") throw err; // (un código repetido: se prueba con otro)
    }
  }
  throw new Error("No se pudo emitir el documento.");
}

/** El certificado del nivel completo, con su promedio. */
export function emitirNivel(userId: number, nv: NivelDef, promedio: number | null): Promise<string> {
  return emitir(userId, "nivel", String(nv.n), nv.recibe, promedio, promedio != null && promedio >= HONORES);
}

/**
 * El certificado de una especialidad completa, con su nota (el promedio de sus materias y del trabajo final). Si ya
 * existe y vale, se le pone la nota de hoy: una entrega mejor del trabajo final la sube.
 */
export async function emitirEspecialidad(userId: number, e: EspecialidadDef, nota: number): Promise<string> {
  const codigo = await emitir(userId, "especialidad", e.id, tituloEspecialidad(e.nombre), nota, nota >= HONORES);
  await pool.query(`UPDATE academia_certificados SET nota = $2, honores = $3 WHERE codigo = $1 AND revocado_at IS NULL`, [codigo, nota, nota >= HONORES]);
  return codigo;
}

/** El código del documento de una materia, de un nivel o de una especialidad, si ya existe. */
export async function codigoDocumento(userId: number, tipo: TipoDocumento, ref: string): Promise<string | null> {
  const { rows } = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = $2 AND ref = $3`, [userId, tipo, ref]);
  return (rows[0]?.codigo as string) ?? null;
}

/** Emite los certificados de nivel que falten de lo ya completado (por ejemplo, lo que se completó antes de que existieran). */
export async function asegurarDocumentos(userId: number): Promise<void> {
  const [{ rows: nivs }, { rows: docs }] = await Promise.all([
    pool.query(`SELECT nivel, promedio FROM academia_niveles WHERE user_id = $1 AND completado_at IS NOT NULL`, [userId]),
    pool.query(`SELECT tipo, ref FROM academia_certificados WHERE user_id = $1`, [userId]),
  ]);
  const hay = new Set(docs.map((d: any) => `${d.tipo}:${d.ref}`));
  for (const r of nivs) {
    const nv = NIVELES.find((x) => x.n === Number(r.nivel));
    if (nv && !hay.has(`nivel:${nv.n}`)) await emitirNivel(userId, nv, r.promedio == null ? null : Number(r.promedio));
  }
}

function nivelDelDocumento(f: FilaDocumento): NivelDef | undefined {
  if (f.tipo === "nivel") return NIVELES.find((x) => String(x.n) === f.ref);
  if (f.tipo === "especialidad") return undefined;
  const m = materiaPorId(f.ref);
  return m?.nivel ? NIVELES.find((x) => x.n === m.nivel) : undefined;
}

/** La especialidad del documento: la del certificado de especialidad o la de la materia de una especialidad. */
function especialidadDelDocumento(f: FilaDocumento): EspecialidadDef | undefined {
  const id = f.tipo === "especialidad" ? f.ref : f.tipo === "materia" ? materiaPorId(f.ref)?.especialidad : undefined;
  return id ? ESPECIALIDADES.find((x) => x.id === id) : undefined;
}

/** Lo que dice la verificación pública que es el documento. */
function nombreDelDocumento(f: FilaDocumento): string {
  if (f.tipo === "nivel" || f.tipo === "especialidad") return f.titulo;
  return `Certificado de la materia «${f.titulo}»`;
}

async function vistaDe(f: FilaDocumento, conQr: boolean): Promise<DocumentoAcademia> {
  const nv = nivelDelDocumento(f);
  const es = especialidadDelDocumento(f);
  const verificar = enlaceVerificar(f.codigo);
  return {
    codigo: f.codigo,
    tipo: f.tipo,
    ref: f.ref,
    titulo: f.titulo,
    nivel: nv ? { n: nv.n, nombre: nv.nombre } : null,
    especialidad: es ? { id: es.id, nombre: es.nombre } : null,
    nombre: f.nombre,
    nota: f.nota == null ? null : Number(f.nota),
    honores: !!f.honores,
    via: f.via,
    emitido: new Date(f.emitido_at).toISOString(),
    revocado: f.revocado_at ? new Date(f.revocado_at).toISOString() : null,
    motivo: f.motivo,
    verificar,
    qr: conQr ? await toDataURL(verificar, { margin: 1, width: 240, errorCorrectionLevel: "M", color: { dark: "#1c1917", light: "#ffffff" } }) : null,
  };
}

const COLUMNAS = `codigo, user_id, tipo, ref, titulo, nombre, nota, honores, via, emitido_at, revocado_at, motivo`;

async function porCodigo(codigo: string): Promise<FilaDocumento | null> {
  const { rows } = await pool.query(`SELECT ${COLUMNAS} FROM academia_certificados WHERE codigo = $1`, [codigo]);
  return (rows[0] as FilaDocumento) ?? null;
}

function ipDe(req: Request): string {
  return String(req.ip || req.socket.remoteAddress || "?");
}

export function registerAcademiaDocumentosRoutes(app: Express) {
  // Mis documentos (emite los que falten de lo ya aprobado).
  app.get("/api/academia/certificados", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      await asegurarDocumentos(a.userId);
      const { rows } = await pool.query(`SELECT ${COLUMNAS} FROM academia_certificados WHERE user_id = $1 ORDER BY emitido_at, id`, [a.userId]);
      res.setHeader("Cache-Control", "no-store");
      res.json(await Promise.all(rows.map((r: FilaDocumento) => vistaDe(r, false))));
    } catch (err) {
      console.error("[academia] certificados:", err);
      res.sendStatus(500);
    }
  });

  // Un documento completo, con su QR: para su dueño y para la Dirección académica.
  app.get("/api/academia/certificado/:codigo", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const f = await porCodigo(normalizarCodigo(String(req.params.codigo || "")));
      if (!f || (f.user_id !== a.userId && !puedeRevisar(a.acceso.role))) return res.status(404).json({ message: "No encontramos ese documento." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(f, true));
    } catch (err) {
      console.error("[academia] certificado:", err);
      res.sendStatus(500);
    }
  });

  // El mismo documento en PDF, hecho en el servidor y con su nombre de archivo (se descarga en cualquier teléfono).
  app.get("/api/academia/certificado/:codigo/pdf", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const f = await porCodigo(normalizarCodigo(String(req.params.codigo || "")));
      if (!f || (f.user_id !== a.userId && !puedeRevisar(a.acceso.role))) return res.status(404).json({ message: "No encontramos ese documento." });
      if (frenar(`acp:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const d = await vistaDe(f, true);
      enviarPdf(res, await certificadoPdf(d), archivoDelCertificado(d));
    } catch (err) {
      console.error("[academia] certificado (pdf):", err);
      if (!res.headersSent) res.status(500).json({ message: "No se pudo preparar el PDF. Inténtalo en unos minutos." });
    }
  });

  // La verificación pública: cualquiera, sin cuenta (es lo que abre el QR). Sin notas.
  app.get("/api/academia/verificar/:codigo", async (req, res) => {
    try {
      if (frenar(`av:${ipDe(req)}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const codigo = normalizarCodigo(String(req.params.codigo || ""));
      if (!PATRON_CODIGO.test(codigo)) return res.status(404).json({ message: "Ese código no tiene el formato de la academia (AAF-XXXX-XXXX)." });
      const f = await porCodigo(codigo);
      if (!f) {
        // ¿es el código de un carné de estudiante?
        const carne = await verificacionDeCarne(codigo);
        if (carne) {
          res.setHeader("Cache-Control", "no-store");
          return res.json(carne);
        }
        return res.status(404).json({ message: "No encontramos un documento con ese código." });
      }
      const nv = nivelDelDocumento(f);
      const es = especialidadDelDocumento(f);
      const out: VerificacionAcademia = {
        valido: !f.revocado_at,
        codigo: f.codigo,
        tipo: f.tipo,
        documento: nombreDelDocumento(f),
        nivel: nv ? `Nivel ${nv.n} · ${nv.nombre}` : null,
        especialidad: es && f.tipo === "materia" ? es.nombre : null,
        nombre: f.nombre,
        emitido: new Date(f.emitido_at).toISOString(),
        honores: !!f.honores,
        revocado: f.revocado_at ? new Date(f.revocado_at).toISOString() : null,
        academia: NOMBRE_ACADEMIA,
        aclaracion: ACLARACION_DOCUMENTOS,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] verificar:", err);
      res.sendStatus(500);
    }
  });
}
