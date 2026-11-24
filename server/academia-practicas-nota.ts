/**
 * Las prácticas en la nota de la materia (docs/academia-practicas.md, «La nota»):
 * - entran solo cuando la materia tiene la práctica de todas sus lecciones (se anota el día en que quedó completa);
 * - valen para quien empezó la materia desde ese día: quien ya la cursaba termina con la fórmula de antes;
 * - la Administración puede sacarlas de la nota de una materia y cambiar los pesos de cada nivel (por defecto,
 *   `PESOS_CON_PRACTICAS`).
 * El componente es el promedio de la mejor práctica que cuenta de cada lección (la que falta cuenta 0).
 */
import { pool } from "./db";
import { PESOS_NIVEL, pesosDe, type MateriaDef, type NivelN, type Pesos } from "@shared/academia-base";
import { PESOS_CON_PRACTICAS, componentePracticas, problemaDePesos } from "@shared/practicas";
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

/** Si las prácticas entran en la nota de este alumno en esta materia. */
export async function practicasCuentan(userId: number | null, m: Pick<MateriaDef, "id">): Promise<boolean> {
  if (!userId || !materiaConPracticas(m.id)) return false;
  const c = (await cargar()).config.get(m.id);
  if (!c || !c.cuenta) return false;
  const { rows } = await pool.query(`SELECT inicio_at FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  // sin inscribirse todavía: cuando se inscriba, empieza con la fórmula nueva
  if (!rows[0]) return true;
  return new Date(rows[0].inicio_at).getTime() >= c.desde.getTime();
}

/** Los pesos de la nota de la materia para este alumno (con prácticas o con la fórmula de antes). */
export async function pesosDeAlumno(userId: number | null, m: Pick<MateriaDef, "id" | "nivel">): Promise<Pesos> {
  if (await practicasCuentan(userId, m)) return pesosConPracticas((m.nivel ?? 3) as NivelN);
  return pesosDe(m);
}

/** El componente «Prácticas» (0–100) de un alumno en una materia. */
export async function componentePracticasDe(userId: number, m: MateriaDef): Promise<number> {
  const ids = m.lecciones.map((l) => l.id);
  if (!ids.length) return 0;
  const { rows } = await pool.query(`SELECT leccion_id, mejor FROM academia_practicas_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`, [userId, ids]);
  const mejor = new Map((rows as any[]).map((r) => [String(r.leccion_id), r.mejor == null ? null : Number(r.mejor)]));
  return componentePracticas(ids.map((id) => mejor.get(id) ?? null));
}
