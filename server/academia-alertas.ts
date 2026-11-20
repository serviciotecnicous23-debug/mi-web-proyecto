/**
 * Las alertas de muchos alumnos a la vez y las tendencias de la academia para el panel (docs/academia-panel.md, parte 3).
 * Usan las mismas reglas que el perfil de cada alumno (alertasDe en shared/academia-perfil.ts), con pocas consultas
 * para todos: los días sin estudiar, los finales reprobados, el promedio de los últimos exámenes, las lecciones
 * detenidas y quién no empezó. Las de solo saber (el repaso, el mentor y lo que espera revisión) quedan en el perfil.
 */
import { pool } from "./db";
import { APRUEBA, leccionPorId, materiaPorId } from "@shared/academia";
import type { AlumnoFila, AlertasFila, SemanaPanel } from "@shared/academia-direccion";
import { alertasDe, diasEntre, lunesDe, sumarDias, type AlertaPerfil } from "@shared/academia-perfil";
import { diaTexas } from "./academia-comun";

const DIA = 86_400_000;

/** Las alertas de cada alumno (las que piden actuar o mirar), por su id. */
export async function alertasEnLote(filas: AlumnoFila[]): Promise<Map<number, AlertaPerfil[]>> {
  const out = new Map<number, AlertaPerfil[]>();
  const ids = filas.map((f) => f.userId);
  if (!ids.length) return out;
  const ahora = Date.now();
  // de una en una, para no ocupar muchas conexiones a la vez
  const { rows: mats } = await pool.query(`SELECT user_id, materia_id, estado FROM academia_materias WHERE user_id = ANY($1::int[])`, [ids]);
  const { rows: ints } = await pool.query(
    `SELECT user_id, clave, nota, cerrado_at FROM academia_intentos
      WHERE user_id = ANY($1::int[]) AND (clave LIKE '%:final' OR clave LIKE '%:mini-%' OR clave LIKE '%:integral')
      ORDER BY cerrado_at DESC`,
    [ids],
  );
  const { rows: abiertas } = await pool.query(
    `SELECT user_id, leccion_id, COALESCE(abierta_at, vista_at) AS desde FROM academia_lecciones
      WHERE user_id = ANY($1::int[]) AND completada_at IS NULL AND COALESCE(abierta_at, vista_at) < now() - interval '14 days'`,
    [ids],
  );
  const enCursoDe = new Map<number, Set<string>>();
  for (const r of mats as any[]) {
    if (r.estado === "aprobada") continue;
    const u = Number(r.user_id);
    if (!enCursoDe.has(u)) enCursoDe.set(u, new Set());
    enCursoDe.get(u)!.add(String(r.materia_id));
  }
  const intentosDe = new Map<number, any[]>();
  for (const r of ints as any[]) {
    const u = Number(r.user_id);
    if (!intentosDe.has(u)) intentosDe.set(u, []);
    intentosDe.get(u)!.push(r);
  }
  const abiertasDe = new Map<number, { titulo: string; materia: string; dias: number }[]>();
  for (const r of abiertas as any[]) {
    const u = Number(r.user_id);
    const l = leccionPorId(r.leccion_id);
    if (!l || !enCursoDe.get(u)?.has(l.materia.id)) continue;
    if (!abiertasDe.has(u)) abiertasDe.set(u, []);
    abiertasDe.get(u)!.push({ titulo: l.leccion.titulo, materia: l.materia.titulo, dias: Math.floor((ahora - Date.parse(r.desde)) / DIA) });
  }
  for (const f of filas) {
    const u = f.userId;
    const enCurso = [...(enCursoDe.get(u) ?? [])];
    const suyos = intentosDe.get(u) ?? [];
    const reprobadas = enCurso
      .map((mid) => ({ titulo: materiaPorId(mid)?.titulo ?? mid, veces: suyos.filter((r) => r.clave === `${mid}:final` && Number(r.nota) < APRUEBA).length }))
      .filter((x) => x.veces > 0);
    const alertas = alertasDe({
      diasSinEstudiar: Math.max(0, Math.floor((ahora - Date.parse(f.ultima)) / DIA)),
      enCurso: enCurso.map((mid) => materiaPorId(mid)?.titulo ?? mid),
      lecciones: f.lecciones,
      diasInscrito: Math.max(0, Math.floor((ahora - Date.parse(f.desde)) / DIA)),
      reprobadas,
      notasRecientes: suyos.map((r) => Number(r.nota)),
      abiertas: abiertasDe.get(u) ?? [],
      minutosSemanas: [],
      metaSemanal: 0,
      repasoVencido: 0,
      sinMentorEnNivel1: false,
      porRevisar: { escritas: 0, actividades: 0 },
    }).filter((a) => a.gravedad !== "info");
    if (alertas.length) out.set(u, alertas);
  }
  return out;
}

/** El resumen de las alertas de un alumno para la lista: cuántas de cada prioridad y sus títulos. */
export function resumenAlertas(alertas: AlertaPerfil[] | undefined): AlertasFila | undefined {
  if (!alertas?.length) return undefined;
  return { alta: alertas.filter((a) => a.gravedad === "alta").length, media: alertas.filter((a) => a.gravedad === "media").length, titulos: alertas.map((a) => a.titulo) };
}

/** Las últimas `n` semanas de la academia (de lunes a domingo): inscripciones, lecciones, minutos y materias aprobadas. */
export async function tendenciasDe(ids: number[], n = 12): Promise<SemanaPanel[]> {
  const hoy = diaTexas();
  const primera = sumarDias(lunesDe(hoy), -(n - 1) * 7);
  const semanas: SemanaPanel[] = Array.from({ length: n }, (_, i) => ({ inicio: sumarDias(primera, i * 7), inscripciones: 0, lecciones: 0, minutos: 0, aprobadas: 0 }));
  if (!ids.length) return semanas;
  const k = (dia: string) => {
    const x = Math.floor(diasEntre(primera, dia) / 7);
    return x >= 0 && x < n ? x : -1;
  };
  const desde = new Date(Date.parse(`${primera}T00:00:00Z`) - DIA);
  const sumar = (filas: any[], campo: keyof Omit<SemanaPanel, "inicio">, valor = (_r: any) => 1) => {
    for (const r of filas) {
      const i = k(r.dia ?? diaTexas(new Date(r.fecha)));
      if (i >= 0) semanas[i][campo] += valor(r);
    }
  };
  const { rows: ins } = await pool.query(`SELECT created_at AS fecha FROM academia_inscripciones WHERE user_id = ANY($1::int[]) AND created_at >= $2`, [ids, desde]);
  sumar(ins as any[], "inscripciones");
  const { rows: lec } = await pool.query(`SELECT completada_at AS fecha FROM academia_lecciones WHERE user_id = ANY($1::int[]) AND completada_at >= $2`, [ids, desde]);
  sumar(lec as any[], "lecciones");
  const { rows: est } = await pool.query(`SELECT dia, minutos FROM academia_estudio WHERE user_id = ANY($1::int[]) AND dia >= $2`, [ids, primera]);
  sumar(est as any[], "minutos", (r) => Number(r.minutos));
  const { rows: apr } = await pool.query(`SELECT aprobada_at AS fecha FROM academia_materias WHERE user_id = ANY($1::int[]) AND aprobada_at >= $2`, [ids, desde]);
  sumar(apr as any[], "aprobadas");
  return semanas;
}

/** Hasta dónde llegan los inscritos en una materia: cuántos completaron cada lección. */
export async function embudoDe(materiaId: string, ids: number[]): Promise<{ n: number; titulo: string; completaron: number }[]> {
  const m = materiaPorId(materiaId);
  if (!m) return [];
  const conteo = new Map<string, number>();
  if (ids.length) {
    const { rows } = await pool.query(
      `SELECT leccion_id, count(*)::int AS n FROM academia_lecciones WHERE user_id = ANY($1::int[]) AND completada_at IS NOT NULL AND leccion_id = ANY($2::text[]) GROUP BY leccion_id`,
      [ids, m.lecciones.map((l) => l.id)],
    );
    for (const r of rows as any[]) conteo.set(String(r.leccion_id), Number(r.n));
  }
  return m.lecciones.map((l, i) => ({ n: i + 1, titulo: l.titulo, completaron: conteo.get(l.id) ?? 0 }));
}
