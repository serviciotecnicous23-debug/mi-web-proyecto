/**
 * Los documentos de la academia (docs/academia.md, «Los documentos»): el certificado de cada materia aprobada y el del
 * nivel completo. Salen solos, con un código verificable (AAF-XXXX-XXXX) y un QR que lleva a la verificación pública.
 *
 * - El alumno ve sus documentos completos, con la nota o el promedio; la Dirección académica también.
 * - La verificación pública dice si el documento es válido, de quién es, qué es y cuándo se emitió, sin notas.
 * - Cada documento guarda el nombre del alumno del día en que se emitió, como un diploma impreso.
 */
import type { Express, Request } from "express";
import { randomBytes } from "node:crypto";
import { toDataURL } from "qrcode";
import { pool } from "./db";
import { resolveSiteUrl } from "@shared/site";
import {
  ACLARACION_DOCUMENTOS, HONORES, NIVELES, NOMBRE_ACADEMIA, PATRON_CODIGO, codigoDe, materiaPorId, normalizarCodigo, puedeRevisar,
  type DocumentoAcademia, type MateriaDef, type NivelDef, type TipoDocumento, type VerificacionAcademia,
} from "@shared/academia";
import { alumnoDe, frenar } from "./academia-comun";

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

const SITIO = resolveSiteUrl(process.env.SITE_URL);
export const enlaceVerificar = (codigo: string) => `${SITIO}/academia/verificar/${codigo}`;

async function nombreDe(userId: number): Promise<string> {
  const { rows } = await pool.query(`SELECT display_name, username FROM users WHERE id = $1`, [userId]);
  return String(rows[0]?.display_name || rows[0]?.username || "Estudiante").trim();
}

/** Guarda un documento si todavía no existe (uno por alumno, tipo y materia o nivel). Devuelve su código. */
async function emitir(userId: number, tipo: TipoDocumento, ref: string, titulo: string, nota: number | null, honores: boolean, via = "cursada"): Promise<string> {
  const ya = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = $2 AND ref = $3`, [userId, tipo, ref]);
  if (ya.rows[0]) return ya.rows[0].codigo as string;
  const nombre = await nombreDe(userId);
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

/** El certificado de una materia aprobada (los honores son del nivel: el promedio de sus materias). */
export function emitirMateria(userId: number, m: MateriaDef, nota: number, via = "cursada"): Promise<string> {
  return emitir(userId, "materia", m.id, m.titulo, nota, false, via);
}

/** El certificado del nivel completo, con su promedio. */
export function emitirNivel(userId: number, nv: NivelDef, promedio: number | null): Promise<string> {
  return emitir(userId, "nivel", String(nv.n), nv.recibe, promedio, promedio != null && promedio >= HONORES);
}

/** El código del documento de una materia o de un nivel, si ya existe. */
export async function codigoDocumento(userId: number, tipo: TipoDocumento, ref: string): Promise<string | null> {
  const { rows } = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = $2 AND ref = $3`, [userId, tipo, ref]);
  return (rows[0]?.codigo as string) ?? null;
}

/** Emite los documentos que falten de lo ya aprobado (por ejemplo, lo que se aprobó antes de que existieran). */
export async function asegurarDocumentos(userId: number): Promise<void> {
  const [{ rows: mats }, { rows: nivs }, { rows: docs }] = await Promise.all([
    pool.query(`SELECT materia_id, nota, via FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada'`, [userId]),
    pool.query(`SELECT nivel, promedio FROM academia_niveles WHERE user_id = $1 AND completado_at IS NOT NULL`, [userId]),
    pool.query(`SELECT tipo, ref FROM academia_certificados WHERE user_id = $1`, [userId]),
  ]);
  const hay = new Set(docs.map((d: any) => `${d.tipo}:${d.ref}`));
  for (const r of mats) {
    const m = materiaPorId(r.materia_id);
    if (m && !hay.has(`materia:${m.id}`)) await emitirMateria(userId, m, Number(r.nota ?? 0), r.via || "cursada");
  }
  for (const r of nivs) {
    const nv = NIVELES.find((x) => x.n === Number(r.nivel));
    if (nv && !hay.has(`nivel:${nv.n}`)) await emitirNivel(userId, nv, r.promedio == null ? null : Number(r.promedio));
  }
}

function nivelDelDocumento(f: FilaDocumento): NivelDef | undefined {
  if (f.tipo === "nivel") return NIVELES.find((x) => String(x.n) === f.ref);
  const m = materiaPorId(f.ref);
  return m?.nivel ? NIVELES.find((x) => x.n === m.nivel) : undefined;
}

async function vistaDe(f: FilaDocumento, conQr: boolean): Promise<DocumentoAcademia> {
  const nv = nivelDelDocumento(f);
  const verificar = enlaceVerificar(f.codigo);
  return {
    codigo: f.codigo,
    tipo: f.tipo,
    ref: f.ref,
    titulo: f.titulo,
    nivel: nv ? { n: nv.n, nombre: nv.nombre } : null,
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

  // La verificación pública: cualquiera, sin cuenta (es lo que abre el QR). Sin notas.
  app.get("/api/academia/verificar/:codigo", async (req, res) => {
    try {
      if (frenar(`av:${ipDe(req)}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const codigo = normalizarCodigo(String(req.params.codigo || ""));
      if (!PATRON_CODIGO.test(codigo)) return res.status(404).json({ message: "Ese código no tiene el formato de la academia (AAF-XXXX-XXXX)." });
      const f = await porCodigo(codigo);
      if (!f) return res.status(404).json({ message: "No encontramos un documento con ese código." });
      const nv = nivelDelDocumento(f);
      const out: VerificacionAcademia = {
        valido: !f.revocado_at,
        codigo: f.codigo,
        tipo: f.tipo,
        documento: f.tipo === "nivel" ? f.titulo : `Certificado de la materia «${f.titulo}»`,
        nivel: nv ? `Nivel ${nv.n} · ${nv.nombre}` : null,
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
