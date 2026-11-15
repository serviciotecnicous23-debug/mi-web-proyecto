/**
 * El salón del alumno (docs/academia.md, «El salón»): su espacio en la academia. Casi todo sale de lo que la academia
 * ya sabe (lo que sigue, los versículos, las mini pruebas, el cuaderno, los documentos); lo nuevo es el **tiempo de
 * estudio**: el temporizador de enfoque suma los minutos de cada día (el día de Texas), con una meta por semana que
 * elige el alumno. Se guarda en la cuenta (se ve igual en todos los equipos) y se borra con ella.
 */
import type { Express } from "express";
import { pool } from "./db";
import { alumnoDe, diaTexas, frenar } from "./academia-comun";
import { ESTUDIO, META_ESTUDIO, type EstudioVista } from "@shared/academia-salon";

export const SALON_SQL = `
CREATE TABLE IF NOT EXISTS "academia_estudio" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "dia" text NOT NULL,
  "minutos" integer NOT NULL DEFAULT 0,
  "sesiones" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("user_id", "dia")
);
CREATE TABLE IF NOT EXISTS "academia_estudio_meta" (
  "user_id" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "minutos_semana" integer NOT NULL DEFAULT 120
);
`;

/** Un día de Texas (YYYY-MM-DD) movido `k` días (la cuenta se hace sobre la fecha: los cambios de horario no la mueven). */
export function moverDia(dia: string, k: number): string {
  const [y, m, d] = dia.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d) + k * 86_400_000).toISOString().slice(0, 10);
}

/** Los últimos `n` días de Texas, del más viejo a hoy, en YYYY-MM-DD. */
export function ultimosDias(n: number, hoy = new Date()): string[] {
  const h = diaTexas(hoy);
  return Array.from({ length: n }, (_, k) => moverDia(h, k - (n - 1)));
}

/** Días seguidos con estudio, contando desde hoy (o desde ayer, si hoy todavía no estudió). */
export function rachaDe(dias: Set<string>, hoy = new Date()): number {
  let dia = diaTexas(hoy);
  if (!dias.has(dia)) dia = moverDia(dia, -1);
  let racha = 0;
  while (dias.has(dia)) {
    racha++;
    dia = moverDia(dia, -1);
  }
  return racha;
}

async function vistaDe(userId: number): Promise<EstudioVista> {
  const dias = ultimosDias(7);
  const [{ rows }, { rows: meta }, { rows: todos }] = await Promise.all([
    pool.query(`SELECT dia, minutos FROM academia_estudio WHERE user_id = $1 AND dia = ANY($2::text[])`, [userId, dias]),
    pool.query(`SELECT minutos_semana FROM academia_estudio_meta WHERE user_id = $1`, [userId]),
    pool.query(`SELECT dia FROM academia_estudio WHERE user_id = $1 AND minutos > 0 ORDER BY dia DESC LIMIT 400`, [userId]),
  ]);
  const por = new Map(rows.map((r: any) => [r.dia as string, Number(r.minutos)]));
  const semana = dias.map((dia) => ({ dia, minutos: por.get(dia) ?? 0 }));
  return {
    hoy: semana[semana.length - 1]?.minutos ?? 0,
    semana,
    totalSemana: semana.reduce((s, d) => s + d.minutos, 0),
    meta: Number(meta[0]?.minutos_semana ?? META_ESTUDIO.porDefecto),
    racha: rachaDe(new Set(todos.map((r: any) => r.dia as string))),
  };
}

export function registerAcademiaSalonRoutes(app: Express) {
  // Mi tiempo de estudio: hoy, la semana, la meta y los días seguidos.
  app.get("/api/academia/estudio", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(a.userId));
    } catch (err) {
      console.error("[academia] estudio:", err);
      res.sendStatus(500);
    }
  });

  // Sumar minutos de estudio (lo manda el temporizador al terminar una sesión o al pararla).
  app.post("/api/academia/estudio", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const minutos = Number(req.body?.minutos);
      if (!Number.isInteger(minutos) || minutos < 1 || minutos > ESTUDIO.porAviso) return res.status(400).json({ message: `Se suman de 1 a ${ESTUDIO.porAviso} minutos por vez.` });
      if (frenar(`ae:${a.userId}`, 20_000)) return res.status(429).json({ message: "Espera un momento antes de sumar más minutos." });
      const dia = diaTexas();
      await pool.query(
        `INSERT INTO academia_estudio (user_id, dia, minutos, sesiones) VALUES ($1, $2, LEAST($3::int, $4::int), 1)
         ON CONFLICT (user_id, dia) DO UPDATE SET minutos = LEAST(academia_estudio.minutos + $3::int, $4::int), sesiones = academia_estudio.sesiones + 1`,
        [a.userId, dia, minutos, ESTUDIO.porDia],
      );
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(a.userId));
    } catch (err) {
      console.error("[academia] estudio (sumar):", err);
      res.sendStatus(500);
    }
  });

  // Mi meta de estudio por semana.
  app.post("/api/academia/estudio/meta", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const meta = Number(req.body?.meta);
      if (!Number.isInteger(meta) || meta < META_ESTUDIO.min || meta > META_ESTUDIO.max) {
        return res.status(400).json({ message: `La meta va de ${META_ESTUDIO.min} minutos a ${META_ESTUDIO.max / 60} horas por semana.` });
      }
      await pool.query(
        `INSERT INTO academia_estudio_meta (user_id, minutos_semana) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET minutos_semana = EXCLUDED.minutos_semana`,
        [a.userId, meta],
      );
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(a.userId));
    } catch (err) {
      console.error("[academia] estudio (meta):", err);
      res.sendStatus(500);
    }
  });
}
