/**
 * «Repaso del día» (shared/repaso-del-dia.ts, docs/academia-auditoria.md): las preguntas del repaso de las lecciones que
 * el alumno ya terminó vuelven en días espaciados (1, 3, 7, 21 y 60), de a lo más 10 por día y mezcladas entre materias.
 * Acertada, pasa a la caja siguiente; fallada, vuelve mañana; después de la última, queda dominada. No pone nota: es
 * práctica de recuperación espaciada para no olvidar. Solo usa las preguntas del repaso (nunca las del examen final) y
 * se calcula al pedirlo (nada corre de fondo).
 */
import type { Express } from "express";
import { pool } from "./db";
import { leccionPorId } from "@shared/academia";
import {
  CAJA_PREGUNTA_DOMINADA, PREGUNTAS_POR_DIA, intercalar, siguientePregunta, type PreguntaDelDia, type RepasoDelDia, type RespuestaDelDia,
} from "@shared/repaso-del-dia";
import { BANCOS } from "./academia/index";
import type { PreguntaObjetiva } from "./academia/tipos";
import { enFila, frenar, inscritoDe, marcarEstudio, preguntasRetiradas } from "./academia-comun";
import { numeroDe, opcionesDeExamen } from "./orden-examen";

/** Cada pregunta de repaso de la academia, con su materia y su lección. */
const PREGUNTAS = new Map<string, { p: PreguntaObjetiva; materiaId: string; leccionId: string }>();
for (const [materiaId, banco] of BANCOS) {
  for (const [leccionId, lista] of Object.entries(banco.repaso)) for (const p of lista) PREGUNTAS.set(p.id, { p, materiaId, leccionId });
}

/** Las opciones de la pregunta en este repaso (otro orden cada vez que vuelve). */
const opcionesDe = (p: PreguntaObjetiva, userId: number, vueltas: number) =>
  opcionesDeExamen(p.id, p.correcta, p.falsas, numeroDe(`${userId}:repaso-del-dia:${vueltas}`) | 0, 0);

/**
 * Agrega al repaso espaciado las preguntas de las lecciones terminadas que todavía no están. Vuelven al día siguiente de
 * terminar la lección; lo atrasado (lecciones terminadas antes de que existiera el repaso del día) se reparte de a 10 por
 * día, empezando por lo más viejo, para que nadie encuentre cientos de preguntas de golpe.
 */
async function sembrar(userId: number): Promise<void> {
  const { rows } = await pool.query(
    `SELECT l.leccion_id, (l.completada_at + interval '1 day' <= now()) AS atrasada
       FROM academia_lecciones l
      WHERE l.user_id = $1 AND l.completada_at IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM academia_repaso_preguntas r WHERE r.user_id = l.user_id AND r.leccion_id = l.leccion_id)
      ORDER BY l.completada_at`,
    [userId],
  );
  if (!rows.length) return;
  const { rows: ya } = await pool.query(
    `SELECT count(*)::int AS n FROM academia_repaso_preguntas WHERE user_id = $1 AND dominada_at IS NULL AND proximo_at <= now() + interval '1 day'`,
    [userId],
  );
  let atrasadas = Number(ya[0]?.n ?? 0);
  const ids: string[] = [];
  const materias: string[] = [];
  const lecciones: string[] = [];
  const esperas: number[] = [];
  for (const r of rows as { leccion_id: string; atrasada: boolean }[]) {
    const l = leccionPorId(r.leccion_id);
    if (!l || !l.materia.disponible) continue;
    for (const p of BANCOS.get(l.materia.id)?.repaso[r.leccion_id] ?? []) {
      ids.push(p.id);
      materias.push(l.materia.id);
      lecciones.push(r.leccion_id);
      esperas.push(r.atrasada ? Math.floor(atrasadas++ / PREGUNTAS_POR_DIA) : 0);
    }
  }
  if (!ids.length) return;
  await pool.query(
    `INSERT INTO academia_repaso_preguntas (user_id, pregunta_id, materia_id, leccion_id, proximo_at)
     SELECT $1, x.id, x.materia, x.leccion, GREATEST(l.completada_at + interval '1 day', now() + make_interval(days => x.espera))
       FROM unnest($2::text[], $3::text[], $4::text[], $5::int[]) AS x(id, materia, leccion, espera)
       JOIN academia_lecciones l ON l.user_id = $1 AND l.leccion_id = x.leccion
     ON CONFLICT (user_id, pregunta_id) DO NOTHING`,
    [userId, ids, materias, lecciones, esperas],
  );
}

/** El repaso de hoy: las que tocan (de a lo más 10, intercaladas por materia) y cómo va el alumno. */
async function repasoDe(userId: number): Promise<RepasoDelDia> {
  await enFila(userId, () => sembrar(userId));
  const { rows } = await pool.query(
    `SELECT pregunta_id, materia_id, caja, vueltas FROM academia_repaso_preguntas
      WHERE user_id = $1 AND dominada_at IS NULL AND proximo_at <= now()
      ORDER BY proximo_at, pregunta_id LIMIT 300`,
    [userId],
  );
  // las preguntas que ya no están en el banco o que la Administración retiró por el análisis de preguntas, fuera
  const retiradas = await preguntasRetiradas();
  const fuera = (rows as any[]).map((r) => String(r.pregunta_id)).filter((id) => !PREGUNTAS.has(id) || retiradas.has(id));
  if (fuera.length) await pool.query(`DELETE FROM academia_repaso_preguntas WHERE user_id = $1 AND pregunta_id = ANY($2::text[])`, [userId, fuera]);
  const lista = (rows as any[])
    .filter((r) => !fuera.includes(String(r.pregunta_id)))
    .map((r) => ({ id: String(r.pregunta_id), materiaId: String(r.materia_id), caja: Number(r.caja), vueltas: Number(r.vueltas) }));
  const preguntas: PreguntaDelDia[] = intercalar(lista, PREGUNTAS_POR_DIA).map((x) => {
    const q = PREGUNTAS.get(x.id)!;
    const l = leccionPorId(q.leccionId);
    return {
      id: x.id,
      texto: q.p.texto,
      opciones: opcionesDe(q.p, userId, x.vueltas),
      materia: { id: q.materiaId, titulo: l?.materia.titulo ?? q.materiaId },
      leccion: { id: q.leccionId, titulo: l?.leccion.titulo ?? "", n: (l?.indice ?? 0) + 1 },
      caja: x.caja,
    };
  });
  const { rows: c } = await pool.query(
    `SELECT count(*)::int AS total,
            (count(*) FILTER (WHERE dominada_at IS NOT NULL))::int AS dominadas,
            (count(*) FILTER (WHERE dominada_at IS NULL AND proximo_at <= now()))::int AS pendientes,
            (count(*) FILTER (WHERE ultima_at >= date_trunc('day', now())))::int AS hoy,
            min(proximo_at) FILTER (WHERE dominada_at IS NULL AND proximo_at > now()) AS proxima
       FROM academia_repaso_preguntas WHERE user_id = $1`,
    [userId],
  );
  const f = c[0] ?? {};
  return {
    preguntas,
    pendientes: Number(f.pendientes ?? 0),
    total: Number(f.total ?? 0),
    dominadas: Number(f.dominadas ?? 0),
    hoy: Number(f.hoy ?? 0),
    proxima: f.proxima ? new Date(f.proxima).toISOString() : null,
  };
}

export function registerAcademiaRepasoDiaRoutes(app: Express) {
  app.get("/api/academia/repaso-del-dia", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await repasoDe(a.userId));
    } catch (err) {
      console.error("[academia] repaso del día:", err);
      res.sendStatus(500);
    }
  });

  // Responder una pregunta del repaso del día: dice si estuvo bien, con la explicación y la cita, y cuándo vuelve.
  app.post("/api/academia/repaso-del-dia/:preguntaId", async (req, res) => {
    const opcion = Math.floor(Number(req.body?.opcion));
    if (!Number.isInteger(opcion) || opcion < 0 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida." });
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      if (frenar(`rdd:${a.userId}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const id = String(req.params.preguntaId || "");
      const q = PREGUNTAS.get(id);
      if (!q) return res.status(404).json({ message: "Esa pregunta no está en tu repaso." });
      const out = await enFila(a.userId, async (): Promise<RespuestaDelDia | { error: number; message: string }> => {
        const { rows } = await pool.query(
          `SELECT caja, vueltas, dominada_at, (proximo_at <= now()) AS toca FROM academia_repaso_preguntas WHERE user_id = $1 AND pregunta_id = $2`,
          [a.userId, id],
        );
        const f = rows[0];
        if (!f) return { error: 404, message: "Esa pregunta no está en tu repaso." };
        if (f.dominada_at) return { error: 409, message: "Esa pregunta ya está dominada." };
        if (!f.toca) return { error: 409, message: "Esa pregunta todavía no toca repasarla." };
        const opciones = opcionesDe(q.p, a.userId, Number(f.vueltas));
        if (opcion >= opciones.length) return { error: 400, message: "Respuesta no válida." };
        const bien = opciones[opcion] === q.p.correcta;
        const sig = siguientePregunta(Number(f.caja), bien);
        await pool.query(
          `UPDATE academia_repaso_preguntas
              SET caja = $3::int, vueltas = vueltas + 1, aciertos = aciertos + $4::int, fallos = fallos + $5::int, ultima_at = now(),
                  proximo_at = CASE WHEN $6::int IS NULL THEN proximo_at ELSE now() + make_interval(days => $6::int) END,
                  dominada_at = CASE WHEN $3::int >= $7::int THEN now() ELSE NULL END
            WHERE user_id = $1 AND pregunta_id = $2`,
          [a.userId, id, sig.caja, bien ? 1 : 0, bien ? 0 : 1, sig.dias, CAJA_PREGUNTA_DOMINADA],
        );
        await marcarEstudio(a.userId);
        return { bien, correcta: q.p.correcta, explica: q.p.explica, ref: q.p.ref, caja: sig.caja, dias: sig.dias, dominada: sig.caja >= CAJA_PREGUNTA_DOMINADA };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] repaso del día (respuesta):", err);
      res.sendStatus(500);
    }
  });
}
