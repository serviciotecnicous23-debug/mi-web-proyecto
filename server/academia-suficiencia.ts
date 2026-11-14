/**
 * El examen de suficiencia (docs/academia.md, «Equivalencias»): la única manera de aprobar una materia sin cursarla.
 * - 25 preguntas repartidas por todas sus lecciones (del banco del examen final), 2 respuestas escritas y el versículo
 *   de memoria aprendido antes de empezar.
 * - Se aprueba con las dos partes a la vez: 85 la objetiva y 75 la escrita (más que el final). Una sola oportunidad por
 *   materia, y solo si todavía no se dio su examen final: si no aprueba, la cursa.
 * - La materia queda «aprobada por suficiencia» (`via`), con la nota del examen, y su certificado lo dice.
 * - En los Niveles 1 y 2 se pueden aprobar todas así (el examen integral del nivel se da igual); en los Niveles 3 a 5,
 *   como máximo la mitad.
 * - El resultado no muestra las preguntas con su respuesta: salen del banco del final, que se da si no aprueba.
 */
import type { Express } from "express";
import { pool } from "./db";
import { NIVELES, SUFICIENCIA, apruebaSuficiencia, materiaPorId, medallaDe, requisitosMateria, type ExamenEstado, type MateriaDef } from "@shared/academia";
import { BANCOS } from "./academia/index";
import { asegurarAlumno, asegurarMateria, claveFinal, estaInscrito, marcarEstudio, medidaSuficiencia } from "./academia-comun";
import { emitirMateria } from "./academia-documentos";
import { estadoBase, filaDe, rutasDeEvaluacion, type Evaluacion } from "./academia-examen";
import { nivelesCompletos } from "./academia-inscripcion";

export const claveSuficiencia = (materiaId: string) => `${materiaId}:suficiencia`;

/** Cuántas materias de un nivel se pueden aprobar por suficiencia o convalidación (null: todas). */
export function topeSuficiencia(m: MateriaDef): number | null {
  if (!m.nivel || m.nivel <= 2) return null;
  const nv = NIVELES.find((n) => n.n === m.nivel);
  return nv ? Math.floor(nv.materias.length * SUFICIENCIA.topeNivelesAltos) : null;
}

async function estadoSuficiencia(userId: number, m: MateriaDef): Promise<ExamenEstado> {
  const medida = medidaSuficiencia(m);
  const f = await filaDe(userId, claveSuficiencia(m.id));
  const [{ rows: mat }, { rows: fin }, { rows: v }, completos, inscrito] = await Promise.all([
    pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]),
    pool.query(`SELECT intentos FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, claveFinal(m.id)]),
    pool.query(`SELECT aprendido_at FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]),
    nivelesCompletos(userId),
    estaInscrito(userId),
  ]);
  const base = estadoBase(f, medida, SUFICIENCIA.apruebaObjetiva);
  const aprobada = mat[0]?.estado === "aprobada";
  const falta: string[] = [];
  if (!inscrito) falta.push("inscribirte en la academia");
  else {
    falta.push(...requisitosMateria(m, completos));
    if (!mat[0]) falta.push("inscribirte en esta materia (para aprender su versículo)");
    else if (m.memoria && !v[0]?.aprendido_at) falta.push("aprender el versículo de memoria");
  }
  let cerrado: string | null = null;
  if (!aprobada && !base.enCurso) {
    if (Number(f.intentos || 0) >= SUFICIENCIA.intentos) cerrado = "La suficiencia se da una sola vez por materia: ahora se cursa, lección por lección.";
    else if (Number(fin[0]?.intentos || 0) > 0) cerrado = "Ya diste el examen final de esta materia: la suficiencia es para quien todavía no la cursó.";
    else {
      const tope = topeSuficiencia(m);
      if (tope != null) {
        const ids = NIVELES.find((n) => n.n === m.nivel)!.materias.map((x) => x.id);
        const { rows } = await pool.query(
          `SELECT count(*)::int AS n FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada' AND via IN ('suficiencia', 'convalidada') AND materia_id = ANY($2::text[])`,
          [userId, ids],
        );
        if (Number(rows[0]?.n ?? 0) >= tope) cerrado = `En el Nivel ${m.nivel} se pueden aprobar por suficiencia o convalidación como máximo ${tope} materias, y ya llegaste a ese tope.`;
      }
    }
  }
  return { ...base, espera: 0, falta: aprobada ? [] : falta, aprobado: aprobada, repasar: [], cerrado };
}

/** Deja la materia aprobada por suficiencia, con la nota del examen, y emite su certificado (o lo vuelve a dar por válido). */
export async function aprobarPorSuficiencia(userId: number, m: MateriaDef, nota: number): Promise<void> {
  await asegurarMateria(userId, m.id);
  const { rows: v } = await pool.query(`SELECT puntaje FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  await pool.query(
    `UPDATE academia_materias SET estado = 'aprobada', via = 'suficiencia', nota = $3, componentes = $4::jsonb, aprobada_at = COALESCE(aprobada_at, now())
      WHERE user_id = $1 AND materia_id = $2 AND (estado <> 'aprobada' OR via = 'suficiencia')`,
    [userId, m.id, nota, JSON.stringify({ final: nota, versiculo: Number(v[0]?.puntaje ?? 0) })],
  );
  const { rows: c } = await pool.query(`SELECT codigo FROM academia_certificados WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`, [userId, m.id]);
  if (!c.length) await emitirMateria(userId, m, nota, "suficiencia");
}

/** El examen de suficiencia de una materia como evaluación (las mismas rutas que el examen final). */
export function evaluacionSuficiencia(m: MateriaDef): Evaluacion {
  const banco = BANCOS.get(m.id)!;
  return {
    clave: claveSuficiencia(m.id),
    medida: medidaSuficiencia(m),
    aprueba: SUFICIENCIA.apruebaObjetiva,
    final: banco.final,
    escritas: banco.escritas,
    estado: (userId) => estadoSuficiencia(userId, m),
    alEmpezar: async (userId) => {
      await asegurarAlumno(userId);
      await asegurarMateria(userId, m.id);
      await marcarEstudio(userId);
    },
    alCerrar: async (userId, nota, partes) => {
      const ok = apruebaSuficiencia(partes.objetiva, partes.escrita);
      if (ok) await aprobarPorSuficiencia(userId, m, nota);
      return { aprobada: ok, materia: ok ? { nota, aprobada: true, medalla: medallaDe(nota) } : null, examenAprobado: ok, sinEspera: true };
    },
    yaAprobado: "Ya aprobaste esta materia.",
    revisionCompleta: false,
  };
}

export function registerAcademiaSuficienciaRoutes(app: Express) {
  rutasDeEvaluacion(app, "/api/academia/suficiencia/:materiaId", (req, res) => {
    const m = materiaPorId(String(req.params.materiaId || ""));
    if (!m || !m.disponible || !BANCOS.has(m.id)) {
      res.status(404).json({ message: "Esa materia no tiene examen de suficiencia." });
      return null;
    }
    return evaluacionSuficiencia(m);
  });
}
