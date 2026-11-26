/**
 * Las prácticas en la nota de la materia (docs/academia-practicas.md, «La nota»):
 * - entran cuando la materia tiene la práctica de todas sus lecciones, para todo el que todavía no la aprobó, y son
 *   obligatorias: sin la práctica que cuenta de cada lección no se presenta el examen final;
 * - quien ya aprobó la materia conserva su nota tal como quedó: puede practicar todo lo que quiera sin que cambie (al
 *   aprobar, se guardan los pesos con que aprobó: `pesos_aprobada`);
 * - la Administración puede sacarlas de la nota de una materia y cambiar los pesos de cada nivel (por defecto,
 *   `PESOS_CON_PRACTICAS`).
 * El componente es el promedio de la mejor práctica que cuenta de cada lección (la que falta cuenta 0).
 */
import { pool } from "./db";
import { PESOS_NIVEL, pesosDe, type MateriaDef, type NivelN, type Pesos } from "@shared/academia-base";
import { PESOS_CON_PRACTICAS, PRACTICAS, componentePracticas, extraDeLecciones, problemaDePesos } from "@shared/practicas";
import { materiaConPracticas, materiasConPracticas } from "./academia/practicas/index";

export const PRACTICAS_NOTA_SQL = `
CREATE TABLE IF NOT EXISTS academia_practicas_config (
  materia_id text PRIMARY KEY,
  cuenta boolean NOT NULL DEFAULT true,
  desde timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  por integer
);
CREATE TABLE IF NOT EXISTS academia_practicas_pesos (
  nivel integer PRIMARY KEY,
  pesos jsonb NOT NULL,
  updated_at timestamp NOT NULL DEFAULT now(),
  por integer
);
ALTER TABLE "academia_materias" ADD COLUMN IF NOT EXISTS "pesos_aprobada" jsonb;
ALTER TABLE "academia_materias" ADD COLUMN IF NOT EXISTS "nota_base" integer;
ALTER TABLE "academia_materias" ADD COLUMN IF NOT EXISTS "extra" integer NOT NULL DEFAULT 0;
`;

type Config = { cuenta: boolean; desde: Date };
let cache: { hasta: number; config: Map<string, Config>; pesos: Map<number, Pesos> } | null = null;
let sembrado: Promise<void> | null = null;

/** Anota el día en que cada materia quedó con todas sus prácticas (una vez por arranque; nunca cambia una fecha ya puesta). */
export function asegurarConfig(): Promise<void> {
  if (!sembrado) {
    sembrado = (async () => {
      const ids = materiasConPracticas();
      if (ids.length) await pool.query(`INSERT INTO academia_practicas_config (materia_id) SELECT unnest($1::text[]) ON CONFLICT (materia_id) DO NOTHING`, [ids]);
    })().catch((e) => {
      sembrado = null;
      throw e;
    });
  }
  return sembrado;
}

async function cargar() {
  if (cache && Date.now() < cache.hasta) return cache;
  await asegurarConfig();
  const [{ rows: c }, { rows: p }] = await Promise.all([
    pool.query(`SELECT materia_id, cuenta, desde FROM academia_practicas_config`),
    pool.query(`SELECT nivel, pesos FROM academia_practicas_pesos`),
  ]);
  const config = new Map<string, Config>((c as any[]).map((r) => [String(r.materia_id), { cuenta: !!r.cuenta, desde: new Date(r.desde) }]));
  const pesos = new Map<number, Pesos>();
  for (const r of p as any[]) {
    const n = Number(r.nivel) as NivelN;
    if (PESOS_NIVEL[n] && !problemaDePesos(r.pesos, PESOS_NIVEL[n])) pesos.set(n, r.pesos as Pesos);
  }
  cache = { hasta: Date.now() + 30_000, config, pesos };
  return cache;
}

/** Después de un cambio en el panel: que se lea otra vez. */
export function olvidarConfig() {
  cache = null;
}

/** Los pesos de un nivel cuando las prácticas cuentan (los del panel o los de siempre). */
export async function pesosConPracticas(nivel: NivelN): Promise<Pesos> {
  const c = await cargar();
  return c.pesos.get(nivel) ?? PESOS_CON_PRACTICAS[nivel];
}

/** Cómo está una materia: si tiene todas sus prácticas, si cuentan y desde cuándo. */
export async function configDe(materiaId: string): Promise<{ completa: boolean; cuenta: boolean; desde: string | null }> {
  const completa = materiaConPracticas(materiaId);
  const c = (await cargar()).config.get(materiaId);
  return { completa, cuenta: completa && (c?.cuenta ?? true), desde: c ? c.desde.toISOString() : null };
}

/** Si la materia tiene todas sus prácticas y la Administración las dejó en la nota. */
async function cuentanEnLaMateria(m: Pick<MateriaDef, "id">): Promise<boolean> {
  if (!materiaConPracticas(m.id)) return false;
  const c = (await cargar()).config.get(m.id);
  return c ? c.cuenta : true;
}

/** Unos pesos guardados que todavía sirven (los de quien aprobó con prácticas). */
function pesosGuardados(p: unknown, nivel: NivelN): Pesos | null {
  if (!p || typeof p !== "object") return null;
  const base = PESOS_NIVEL[nivel];
  const claves = Object.keys(base) as (keyof Pesos)[];
  const v = p as Partial<Pesos>;
  if (!claves.every((k) => Number.isInteger(v[k]) && (v[k] as number) >= 0)) return null;
  return claves.reduce((a, k) => a + (v[k] as number), 0) === 100 ? (v as Pesos) : null;
}

/**
 * Los pesos de la nota de la materia para este alumno:
 * - si la aprobó con prácticas, los pesos con que aprobó (su nota no cambia);
 * - si la aprobó antes de que la materia tuviera prácticas, la fórmula de antes (tampoco cambia);
 * - si todavía no la aprobó (o no se inscribió), con prácticas cuando la materia las tiene todas.
 */
export async function pesosDeAlumno(userId: number | null, m: Pick<MateriaDef, "id" | "nivel">): Promise<Pesos> {
  const nivel = (m.nivel ?? 3) as NivelN;
  if (userId) {
    const { rows } = await pool.query(`SELECT estado, pesos_aprobada FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
    const f = rows[0];
    const guardados = f ? pesosGuardados(f.pesos_aprobada, nivel) : null;
    if (guardados) return guardados;
    if (f?.estado === "aprobada") return pesosDe(m);
  }
  if (await cuentanEnLaMateria(m)) return pesosConPracticas(nivel);
  return pesosDe(m);
}

/** Si las prácticas entran en la nota de este alumno en esta materia. */
export async function practicasCuentan(userId: number | null, m: Pick<MateriaDef, "id" | "nivel">): Promise<boolean> {
  return (await pesosDeAlumno(userId, m)).practicas > 0;
}

/** Si el alumno ya aprobó la materia (por cualquier vía). */
export async function materiaAprobadaPor(userId: number, materiaId: string): Promise<boolean> {
  const { rows } = await pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, materiaId]);
  return rows[0]?.estado === "aprobada";
}

/** Si las prácticas son obligatorias para este alumno: cuentan en su nota y todavía no aprobó la materia. */
export async function practicasObligatorias(userId: number, m: Pick<MateriaDef, "id" | "nivel">): Promise<boolean> {
  if (await materiaAprobadaPor(userId, m.id)) return false;
  return practicasCuentan(userId, m);
}

/** Cómo está la materia del alumno: estado, vía, la nota (con los puntos extra), la nota sin ellos y los puntos extra. */
export async function materiaDelAlumno(userId: number, materiaId: string): Promise<{ estado: string | null; via: string | null; nota: number | null; base: number | null; extra: number }> {
  const { rows } = await pool.query(`SELECT estado, via, nota, nota_base, extra FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, materiaId]);
  const r = rows[0];
  if (!r) return { estado: null, via: null, nota: null, base: null, extra: 0 };
  const nota = r.nota == null ? null : Number(r.nota);
  return { estado: r.estado ?? null, via: r.via ?? null, nota, base: r.nota_base == null ? nota : Number(r.nota_base), extra: Number(r.extra ?? 0) };
}

/** El reto de dominio (los puntos extra) se abre con la materia aprobada por el curso (no por suficiencia ni convalidada). */
export async function retoAbierto(userId: number, m: Pick<MateriaDef, "id">): Promise<boolean> {
  if (!materiaConPracticas(m.id)) return false;
  const x = await materiaDelAlumno(userId, m.id);
  return x.estado === "aprobada" && x.via !== "suficiencia" && x.via !== "convalidada";
}

/** Los puntos extra de la materia: lo que le falta para 100, en la parte de las lecciones con el reto dominado. */
export async function extraDe(userId: number, m: MateriaDef, base: number): Promise<number> {
  const ids = m.lecciones.map((l) => l.id);
  if (!ids.length || !materiaConPracticas(m.id)) return 0;
  const { rows } = await pool.query(
    `SELECT count(*)::int AS n FROM academia_practicas_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND reto_mejor >= $3`,
    [userId, ids, PRACTICAS.retoDomina],
  );
  return extraDeLecciones(base, Number(rows[0]?.n ?? 0), ids.length);
}

/** Cuántas lecciones de la materia no tienen todavía su práctica que cuenta terminada. */
export async function leccionesSinPractica(userId: number, m: MateriaDef): Promise<number> {
  const ids = m.lecciones.map((l) => l.id);
  if (!ids.length) return 0;
  const { rows } = await pool.query(
    `SELECT count(*)::int AS n FROM academia_practicas_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND mejor IS NOT NULL`,
    [userId, ids],
  );
  return ids.length - Number(rows[0]?.n ?? 0);
}

/** El componente «Prácticas» (0–100) de un alumno en una materia. */
export async function componentePracticasDe(userId: number, m: MateriaDef): Promise<number> {
  const ids = m.lecciones.map((l) => l.id);
  if (!ids.length) return 0;
  const { rows } = await pool.query(`SELECT leccion_id, mejor FROM academia_practicas_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`, [userId, ids]);
  const mejor = new Map((rows as any[]).map((r) => [String(r.leccion_id), r.mejor == null ? null : Number(r.mejor)]));
  return componentePracticas(ids.map((id) => mejor.get(id) ?? null));
}
