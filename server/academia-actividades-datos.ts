/**
 * Las actividades del nivel en la base: la tabla y su lectura (shared/academia-actividades.ts tiene las reglas).
 * Aparte de las rutas (server/academia-actividades.ts) para que el cierre del nivel (server/academia-nivel.ts) las lea
 * sin importar las rutas, que a su vez cierran el nivel.
 */
import { pool } from "./db";
import {
  ACTIVIDADES_NIVEL, PASOS_CONSOLIDACION, RUBRICA_PROYECTO, RUBRICA_SERMON, resumirActividades, type ActividadVista, type DefensaProyecto,
  type EvaluacionSermon, type ResumenActividades,
} from "@shared/academia-actividades";
import { diaTexas } from "./academia-comun";

export const ACTIVIDADES_SQL = `
CREATE TABLE IF NOT EXISTS academia_actividades (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nivel integer NOT NULL,
  tipo text NOT NULL,
  fecha text NOT NULL,
  hasta text,
  persona text,
  resultado text,
  lugar text,
  lider text,
  detalle text NOT NULL,
  estado text NOT NULL DEFAULT 'pendiente',
  revisor_id integer REFERENCES users(id) ON DELETE SET NULL,
  revisada_at timestamp,
  motivo text,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS academia_actividades_alumno ON academia_actividades (user_id, nivel);
CREATE INDEX IF NOT EXISTS academia_actividades_estado ON academia_actividades (estado, created_at);
-- el Nivel 3: las horas de la práctica, el pasaje y el enlace de la enseñanza grabada y los pasos de la consolidación
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS horas numeric(4,1);
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS titulo text;
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS enlace text;
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS pasos jsonb;
-- el Nivel 4: la nota del sermón (de 0 a 100) y su evaluación con la rúbrica (los puntos de cada criterio y quién evaluó)
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS nota integer;
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS evaluacion jsonb;
-- el Nivel 5: la defensa del proyecto final (cuándo, dónde, ante qué profesores) y las evaluaciones de los profesores
ALTER TABLE academia_actividades ADD COLUMN IF NOT EXISTS defensa jsonb;
`;

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
const PASOS = new Set<string>(PASOS_CONSOLIDACION.map((p) => p.id));

/** La evaluación guardada (jsonb) de un sermón: los puntos de cada criterio y quién evaluó. */
function evaluacionDe(v: unknown): EvaluacionSermon | null {
  const e = typeof v === "string" ? (() => { try { return JSON.parse(v); } catch { return null; } })() : v;
  if (!e || typeof e !== "object" || !(e as any).rubrica) return null;
  const rubrica = {} as EvaluacionSermon["rubrica"];
  for (const c of RUBRICA_SERMON) rubrica[c.id] = Number((e as any).rubrica[c.id] ?? 0);
  return { rubrica, evaluador: String((e as any).evaluador ?? "") };
}

/** La defensa guardada (jsonb) del proyecto final, con las evaluaciones de los profesores si ya las tiene. */
export function defensaDe(v: unknown): DefensaProyecto | null {
  const d = typeof v === "string" ? (() => { try { return JSON.parse(v); } catch { return null; } })() : v;
  if (!d || typeof d !== "object" || typeof (d as any).fecha !== "string" || typeof (d as any).hora !== "string") return null;
  const x = d as any;
  const evaluaciones = Array.isArray(x.evaluaciones)
    ? x.evaluaciones.map((e: any) => {
        const rubrica = {} as Record<(typeof RUBRICA_PROYECTO)[number]["id"], number>;
        for (const c of RUBRICA_PROYECTO) rubrica[c.id] = Number(e?.rubrica?.[c.id] ?? 0);
        return { evaluador: String(e?.evaluador ?? ""), rubrica, nota: Number(e?.nota ?? 0) };
      })
    : null;
  return {
    fecha: x.fecha,
    hora: x.hora,
    lugar: x.lugar ?? null,
    enlace: x.enlace ?? null,
    profesores: Array.isArray(x.profesores) ? x.profesores.map(String) : [],
    evaluaciones,
  };
}

/** Los pasos guardados (jsonb): solo los del plan, en su orden. */
function pasosDe(v: unknown): ActividadVista["pasos"] {
  const lista = typeof v === "string" ? (() => { try { return JSON.parse(v); } catch { return null; } })() : v;
  return Array.isArray(lista) ? (lista.filter((p) => typeof p === "string" && PASOS.has(p)) as ActividadVista["pasos"]) : null;
}

export function actividadDe(r: any): ActividadVista {
  return {
    id: Number(r.id),
    tipo: r.tipo,
    nivel: Number(r.nivel),
    fecha: String(r.fecha),
    hasta: r.hasta ?? null,
    persona: r.persona ?? null,
    resultado: r.resultado ?? null,
    lugar: r.lugar ?? null,
    lider: r.lider ?? null,
    horas: r.horas == null ? null : Number(r.horas),
    titulo: r.titulo ?? null,
    enlace: r.enlace ?? null,
    pasos: pasosDe(r.pasos),
    nota: r.nota == null ? null : Number(r.nota),
    evaluacion: evaluacionDe(r.evaluacion),
    defensa: defensaDe(r.defensa),
    detalle: String(r.detalle),
    estado: r.estado,
    motivo: r.motivo ?? null,
    revisada: iso(r.revisada_at),
    creada: iso(r.created_at)!,
  };
}

/** Las actividades de un alumno en un nivel, de la más nueva a la más vieja. */
export async function actividadesDe(userId: number, nivel: number): Promise<ActividadVista[]> {
  const { rows } = await pool.query(`SELECT * FROM academia_actividades WHERE user_id = $1 AND nivel = $2 ORDER BY fecha DESC, id DESC`, [userId, nivel]);
  return rows.map(actividadDe);
}

/**
 * Las personas que acompaña un mentor (Nivel 5): las que terminaron el Nivel 1 mientras las acompañaba (o, si las eligió
 * antes de que se guardara desde cuándo, cuando sea) y las que siguen en él.
 */
export async function acompanamientoDe(mentorId: number): Promise<{ terminaron: number; enCurso: number; pedido: string | null }> {
  const [{ rows }, { rows: yo }] = await Promise.all([
    pool.query(
      `SELECT count(*) FILTER (WHERE n.completado_at IS NOT NULL AND (a.mentor_desde IS NULL OR n.completado_at >= a.mentor_desde))::int AS terminaron,
              count(*) FILTER (WHERE n.completado_at IS NULL)::int AS en_curso
         FROM academia_alumnos a
         LEFT JOIN academia_niveles n ON n.user_id = a.user_id AND n.nivel = 1
        WHERE a.mentor_user_id = $1`,
      [mentorId],
    ),
    // si pidió a quién acompañar y todavía espera (se borra cuando la Administración le da a todos los que pide)
    pool.query(`SELECT acompanar_pedido_at FROM academia_alumnos WHERE user_id = $1`, [mentorId]),
  ]);
  const pedido = yo[0]?.acompanar_pedido_at ? new Date(yo[0].acompanar_pedido_at).toISOString() : null;
  return { terminaron: Number(rows[0]?.terminaron ?? 0), enCurso: Number(rows[0]?.en_curso ?? 0), pedido };
}

/** El avance de un alumno en las actividades de un nivel (null si el nivel no pide actividades). */
export async function resumenDe(userId: number, nivel: number): Promise<ResumenActividades | null> {
  const pide = ACTIVIDADES_NIVEL[nivel as 1 | 2 | 3 | 4 | 5];
  if (!pide) return null;
  return resumirActividades(pide, await actividadesDe(userId, nivel), diaTexas(), pide.acompanar ? await acompanamientoDe(userId) : undefined);
}
