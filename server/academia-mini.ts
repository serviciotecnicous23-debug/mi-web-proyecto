/**
 * Las mini pruebas (docs/academia.md, «Las mini pruebas»): en las materias del Nivel 2 en adelante, una cada 3
 * lecciones (`miniPruebasDe`): 6 preguntas de un banco de 18, 45 segundos cada una, sin escritas. Hay 3 intentos, cada
 * uno con preguntas nuevas, y cuenta el mejor: el componente «mini» de la materia es el promedio de sus mini pruebas.
 * Muestran la revisión completa al terminar (sirven para aprender) y no admiten pedidos de revisión (no hay escritas).
 * Usan el mismo motor que el examen final (`rutasDeEvaluacion`).
 */
import type { Express } from "express";
import { pool } from "./db";
import { APRUEBA, MEDIDA_MINI, MINI_PRUEBA, materiaPorId, miniPruebasDe, type ExamenEstado, type MateriaDef } from "@shared/academia";
import { BANCOS } from "./academia/index";
import { asegurarAlumno, asegurarMateria, claveMini, estaInscrito, marcarEstudio, recalcularMateria } from "./academia-comun";
import { estadoBase, filaDe, rutasDeEvaluacion, type Evaluacion } from "./academia-examen";

/** Lo que falta para dar una mini prueba, cuántos intentos quedan y su mejor nota. */
export async function estadoMini(userId: number, m: MateriaDef, n: number, lecciones: number[]): Promise<ExamenEstado> {
  const f = await filaDe(userId, claveMini(m.id, n));
  const ids = lecciones.map((k) => `${m.id}-${k}`);
  const { rows: mat } = await pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const { rows: lec } = await pool.query(
    `SELECT count(*)::int AS n FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND completada_at IS NOT NULL`,
    [userId, ids],
  );
  const base = estadoBase(f, MEDIDA_MINI, APRUEBA);
  const falta: string[] = [];
  if (!(await estaInscrito(userId))) falta.push("inscribirte en la academia");
  else if (!mat[0]) falta.push("inscribirte en esta materia");
  const pendientes = ids.length - Number(lec[0]?.n ?? 0);
  if (pendientes > 0) {
    const desde = lecciones[0];
    const hasta = lecciones[lecciones.length - 1];
    falta.push(`completar ${pendientes === 1 ? "1 lección" : `${pendientes} lecciones`} (de la ${desde} a la ${hasta})`);
  }
  const usados = Number(f.intentos || 0);
  const cerrado =
    !base.enCurso && usados >= MINI_PRUEBA.intentos
      ? `Ya usaste los ${MINI_PRUEBA.intentos} intentos: cuenta tu mejor nota${base.mejor != null ? `, ${base.mejor}` : ""}.`
      : null;
  return { ...base, espera: 0, falta, aprobado: false, repasar: [], cerrado };
}

/** Una mini prueba como evaluación (null si la materia no la tiene). */
export function evaluacionMini(m: MateriaDef, n: number): Evaluacion | null {
  const grupo = miniPruebasDe(m).find((g) => g.n === n);
  const preguntas = BANCOS.get(m.id)?.mini?.[n];
  if (!grupo || !preguntas?.length) return null;
  return {
    clave: claveMini(m.id, n),
    medida: MEDIDA_MINI,
    aprueba: APRUEBA,
    final: preguntas,
    escritas: [],
    estado: (userId) => estadoMini(userId, m, n, grupo.lecciones),
    alEmpezar: async (userId) => {
      await asegurarAlumno(userId);
      await asegurarMateria(userId, m.id);
      await marcarEstudio(userId);
    },
    // la mejor nota entra en la de la materia; sin fallos ni esperas (los intentos ya están contados)
    alCerrar: async (userId) => {
      await recalcularMateria(userId, m);
      return { aprobada: true, materia: null, sinEspera: true };
    },
    yaAprobado: "",
    revisionCompleta: true,
    apelable: "Las mini pruebas no tienen respuestas escritas: no se pide su revisión. Tienes 3 intentos y cuenta el mejor.",
  };
}

export function registerAcademiaMiniRoutes(app: Express) {
  rutasDeEvaluacion(app, "/api/academia/mini/:materiaId/:n", (req, res) => {
    const m = materiaPorId(String(req.params.materiaId || ""));
    const ev = m && m.disponible ? evaluacionMini(m, Number(req.params.n)) : null;
    if (!ev) {
      res.status(404).json({ message: "Esa mini prueba no existe." });
      return null;
    }
    return ev;
  });
}
