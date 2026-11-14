/**
 * La matrícula, el estatus y el carné de la academia (docs/academia.md, «La matrícula y el estatus»).
 *
 * - Matricularse es aceptar el reglamento académico y el código de honor (shared/academia.ts, REGLAMENTO y
 *   CODIGO_HONOR). Da un número correlativo (AAF-año-número) y una promoción; sin matrícula se lee, pero no se guarda
 *   el avance (academia-comun.ts, matriculadoDe).
 * - El estatus sale del avance real (estatusDe): aspirante, activo, en pausa, egresado, graduado; sin notas.
 * - El carné digital acredita la matrícula. Su QR lleva un código al azar (no el número de matrícula, que es
 *   correlativo y permitiría recorrer los nombres de todos) y se verifica en la misma página de los certificados.
 */
import type { Express } from "express";
import { randomBytes } from "node:crypto";
import { toDataURL } from "qrcode";
import { pool } from "./db";
import {
  ACLARACION_DOCUMENTOS, CODIGO_HONOR, HONORES, NIVELES, NOMBRE_ACADEMIA, REGLAMENTO, codigoDe, estatusDe, numeroMatricula,
  type CarneVista, type EstatusVista, type MatriculaInfo, type VerificacionAcademia,
} from "@shared/academia";
import { alumnoDe, asegurarAlumno, diaTexas, enFila, enlaceVerificar, frenar, matriculadoDe } from "./academia-comun";

/** El estatus del alumno hoy, a partir de su avance. */
export async function estatusVista(userId: number): Promise<EstatusVista> {
  const [{ rows: al }, { rows: niv }, { rows: lec }] = await Promise.all([
    pool.query(`SELECT estatus, nivel, EXTRACT(EPOCH FROM now() - ultima_at)::float / 86400 AS dias FROM academia_alumnos WHERE user_id = $1`, [userId]),
    pool.query(`SELECT nivel, promedio FROM academia_niveles WHERE user_id = $1 AND completado_at IS NOT NULL`, [userId]),
    pool.query(`SELECT count(*)::int AS n FROM academia_lecciones WHERE user_id = $1 AND completada_at IS NOT NULL`, [userId]),
  ]);
  const completados = niv.map((r: any) => Number(r.nivel));
  const ultimo = completados.length ? Math.max(...completados) : 0;
  const siguiente = NIVELES.find((n) => n.n === ultimo + 1);
  return estatusDe({
    retirado: al[0]?.estatus === "retirado",
    nivelActual: Number(al[0]?.nivel ?? 1),
    completados,
    honores: niv.some((r: any) => r.promedio != null && Number(r.promedio) >= HONORES),
    lecciones: Number(lec[0]?.n || 0),
    diasSinEstudiar: Number(al[0]?.dias ?? 0),
    siguienteDisponible: !!siguiente?.materias.some((m) => m.disponible),
  });
}

/** La matrícula del alumno, o null si todavía no se matriculó. */
export async function matriculaDe(userId: number): Promise<MatriculaInfo | null> {
  const { rows } = await pool.query(
    `SELECT matricula, promocion, reglamento_at FROM academia_alumnos WHERE user_id = $1 AND matricula IS NOT NULL AND reglamento_at IS NOT NULL`,
    [userId],
  );
  if (!rows[0]) return null;
  return {
    numero: rows[0].matricula as string,
    promocion: Number(rows[0].promocion),
    desde: new Date(rows[0].reglamento_at).toISOString(),
    estatus: await estatusVista(userId),
  };
}

/** Matricula al alumno (si ya lo está, devuelve su matrícula de siempre). */
async function matricular(userId: number): Promise<MatriculaInfo> {
  const ya = await matriculaDe(userId);
  if (ya) return ya;
  await asegurarAlumno(userId);
  const { rows: s } = await pool.query(`SELECT nextval('academia_matricula_seq')::int AS n`);
  const anio = Number(diaTexas().slice(0, 4));
  const numero = numeroMatricula(anio, Number(s[0].n));
  for (let intento = 0; intento < 5; intento++) {
    try {
      await pool.query(
        `UPDATE academia_alumnos
            SET matricula = $2, promocion = $3, reglamento_at = now(), honor_at = now(), reglamento_version = $4,
                carne_codigo = COALESCE(carne_codigo, $5), estatus = CASE WHEN estatus = 'retirado' THEN 'activo' ELSE estatus END
          WHERE user_id = $1 AND matricula IS NULL`,
        [userId, numero, anio, REGLAMENTO.version, codigoDe(randomBytes(5))],
      );
      break;
    } catch (err: any) {
      if (err?.code !== "23505") throw err; // (un código de carné repetido: se prueba con otro)
    }
  }
  const out = await matriculaDe(userId);
  if (!out) throw new Error("No se pudo matricular.");
  return out;
}

/** La verificación pública de un carné por su código (null si el código no es de un carné). */
export async function verificacionDeCarne(codigo: string): Promise<VerificacionAcademia | null> {
  const { rows } = await pool.query(
    `SELECT a.user_id, a.matricula, a.reglamento_at, u.display_name, u.username
       FROM academia_alumnos a JOIN users u ON u.id = a.user_id
      WHERE a.carne_codigo = $1 AND a.matricula IS NOT NULL AND a.reglamento_at IS NOT NULL`,
    [codigo],
  );
  const r = rows[0];
  if (!r) return null;
  const estatus = await estatusVista(Number(r.user_id));
  const nv = NIVELES.find((x) => x.n === estatus.nivel);
  return {
    valido: estatus.clave !== "retirado",
    codigo,
    tipo: "carne",
    documento: "Carné de estudiante",
    nivel: nv ? `Nivel ${nv.n} · ${nv.nombre}` : null,
    nombre: String(r.display_name || r.username || "Estudiante"),
    emitido: new Date(r.reglamento_at).toISOString(),
    honores: estatus.honores,
    revocado: null,
    matricula: r.matricula as string,
    estatus: estatus.texto,
    academia: NOMBRE_ACADEMIA,
    aclaracion: ACLARACION_DOCUMENTOS,
  };
}

export function registerAcademiaMatriculaRoutes(app: Express) {
  // Mi matrícula (null si todavía no me matriculé) y la versión del reglamento vigente.
  app.get("/api/academia/matricula", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      res.setHeader("Cache-Control", "no-store");
      res.json({ matricula: await matriculaDe(a.userId), reglamento: REGLAMENTO.version, honor: CODIGO_HONOR });
    } catch (err) {
      console.error("[academia] matricula:", err);
      res.sendStatus(500);
    }
  });

  // Matricularme: aceptar el reglamento académico y el código de honor.
  app.post("/api/academia/matricula", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      if (req.body?.reglamento !== true || req.body?.honor !== true) {
        return res.status(400).json({ message: "Para matricularte, acepta el reglamento académico y el código de honor." });
      }
      if (frenar(`am:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const m = await enFila(a.userId, () => matricular(a.userId));
      res.setHeader("Cache-Control", "no-store");
      res.json(m);
    } catch (err) {
      console.error("[academia] matricularse:", err);
      res.sendStatus(500);
    }
  });

  // Mi carné digital, con su QR de verificación.
  app.get("/api/academia/carne", async (req, res) => {
    try {
      const a = await matriculadoDe(req, res);
      if (!a) return;
      const m = (await matriculaDe(a.userId))!;
      const { rows } = await pool.query(
        `SELECT a.carne_codigo, u.display_name, u.username, u.avatar_url FROM academia_alumnos a JOIN users u ON u.id = a.user_id WHERE a.user_id = $1`,
        [a.userId],
      );
      const r = rows[0];
      const verificar = enlaceVerificar(r.carne_codigo);
      const out: CarneVista = {
        ...m,
        nombre: String(r.display_name || r.username || "Estudiante"),
        foto: r.avatar_url || null,
        codigo: r.carne_codigo,
        verificar,
        qr: await toDataURL(verificar, { margin: 1, width: 240, errorCorrectionLevel: "M", color: { dark: "#1c1917", light: "#ffffff" } }),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] carne:", err);
      res.sendStatus(500);
    }
  });
}
