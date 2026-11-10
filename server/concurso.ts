/**
 * El concurso bíblico de la semana (shared/concurso.ts). Las preguntas salen del banco del
 * servidor (jerusalen-banco.ts): las mismas 10 para todos cada semana. El servidor guarda la hora
 * de cada pregunta, corrige y lleva el tiempo; el teléfono solo muestra.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { BANCO } from "./jerusalen-banco";
import { CONCURSO_PREGUNTAS, CONCURSO_PREMIOS, CONCURSO_SEGUNDOS, type ConcursoEstado, type ConcursoRespuesta } from "@shared/concurso";
import { diaClave, evento, forgetJer, personajeDe, type PersonajeFila } from "./jerusalen";
import { semanaClave } from "./misiones";
import { sumarGozo } from "./gozo";

export const CONCURSO_SQL = `
CREATE TABLE IF NOT EXISTS "game_contest_entries" (
  "week_key" text NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "n" integer NOT NULL DEFAULT 0,
  "correct" integer NOT NULL DEFAULT 0,
  "ms" integer NOT NULL DEFAULT 0,
  "asked_at" timestamp,
  "finished_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("week_key", "character_id")
);
CREATE INDEX IF NOT EXISTS "idx_contest_week" ON "game_contest_entries" ("week_key", "correct" DESC, "ms" ASC);
CREATE TABLE IF NOT EXISTS "game_contest_awards" (
  "week_key" text PRIMARY KEY,
  "awarded_at" timestamp NOT NULL DEFAULT now()
);`;

function semilla(texto: string): number {
  let x = 2166136261;
  for (const ch of texto) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return x || 1;
}
function mezclar<T>(lista: T[], seed: number): T[] {
  const a = lista.slice();
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Las 10 preguntas de la semana (las mismas para todos). */
function preguntasDe(semana: string) {
  return mezclar(BANCO, semilla(`concurso:${semana}`)).slice(0, CONCURSO_PREGUNTAS);
}
/** Las opciones de una pregunta, en un orden fijo para esa semana. */
function opcionesDe(semana: string, q: (typeof BANCO)[number]): string[] {
  return mezclar([q.correcta, ...q.falsas], semilla(`opciones:${semana}:${q.id}`));
}

function diasRestantes(dia = diaClave()): number {
  const d = new Date(`${dia}T12:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  return 7 - dow;
}
function semanaAnterior(semana: string): string {
  const d = new Date(`${semana}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return semanaClave(d.toISOString().slice(0, 10));
}

const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null }) =>
  (r.name && r.name !== "__propio__" ? r.name : null) || r.display_name || r.username || "Un vecino";

async function tabla(semana: string, yo: number, limite = 10) {
  const { rows } = await pool.query(
    `SELECT e.character_id, e.correct, e.ms, c.name, c.user_id, u.display_name, u.username
       FROM game_contest_entries e
       JOIN game_characters c ON c.id = e.character_id
       JOIN users u ON u.id = c.user_id
      WHERE e.week_key = $1 AND e.finished_at IS NOT NULL AND u.is_active = true
      ORDER BY e.correct DESC, e.ms ASC, e.finished_at ASC
      LIMIT $2`,
    [semana, limite],
  );
  return rows.map((r, i) => ({
    puesto: i + 1,
    nombre: nombreDe(r),
    aciertos: Number(r.correct),
    segundos: Math.round(Number(r.ms) / 100) / 10,
    isMe: Number(r.character_id) === yo,
    userId: Number(r.user_id),
    characterId: Number(r.character_id),
  }));
}

/** Al empezar una semana nueva, la anterior premia a sus tres primeros (una sola vez). */
async function premiarSemanaAnterior(semana: string) {
  const antes = semanaAnterior(semana);
  const { rows } = await pool.query(`INSERT INTO game_contest_awards (week_key) VALUES ($1) ON CONFLICT DO NOTHING RETURNING 1`, [antes]);
  if (!rows.length) return;
  const top = await tabla(antes, 0, CONCURSO_PREMIOS.length);
  for (let i = 0; i < top.length; i++) {
    await sumarGozo(top[i].characterId, CONCURSO_PREMIOS[i]);
    const lugar = ["el primer lugar", "el segundo lugar", "el tercer lugar"][i];
    await evento(top[i].userId, `concurso:${antes}`, `ganó ${lugar} del concurso bíblico de la semana en Jerusalén en línea`).catch(() => null);
  }
  forgetJer();
}

async function estadoDe(ch: PersonajeFila): Promise<ConcursoEstado> {
  const semana = semanaClave();
  await premiarSemanaAnterior(semana).catch((err) => console.error("[concurso] premiar:", err));
  const [{ rows }, top, campeones] = await Promise.all([
    pool.query(
      `SELECT n, correct, ms, finished_at, asked_at, EXTRACT(EPOCH FROM (now() - asked_at)) AS pasados
         FROM game_contest_entries WHERE week_key = $1 AND character_id = $2`,
      [semana, ch.id],
    ),
    tabla(semana, ch.id),
    tabla(semanaAnterior(semana), ch.id, CONCURSO_PREMIOS.length),
  ]);
  const e = rows[0];
  let pregunta: ConcursoEstado["pregunta"] = null;
  // la pregunta solo se manda cuando su reloj ya corre (así nadie la lee antes)
  if (e && !e.finished_at && e.asked_at) {
    const q = preguntasDe(semana)[Number(e.n)];
    // los segundos que le quedan (si se volvió a abrir la ventana, el reloj sigue donde iba)
    const quedan = Math.max(0, Math.ceil(CONCURSO_SEGUNDOS - (Number(e.pasados) || 0)));
    if (q) pregunta = { n: Number(e.n) + 1, texto: q.pregunta, opciones: opcionesDe(semana, q), segundos: quedan };
  }
  return {
    semana,
    diasRestantes: diasRestantes(),
    mio: e
      ? { respondidas: Number(e.n), aciertos: Number(e.correct), segundos: Math.round(Number(e.ms) / 100) / 10, terminado: !!e.finished_at, esperando: !e.finished_at && !e.asked_at }
      : null,
    pregunta,
    tabla: top.map(({ userId, characterId, ...f }) => f),
    campeones: campeones.length ? { semana: semanaAnterior(semana), nombres: campeones.map((c) => c.nombre) } : null,
  };
}

export function registerConcursoRoutes(app: Express) {
  async function jugador(req: Request, res: Response): Promise<PersonajeFila | null> {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    const ch = await personajeDe(req.user!.id);
    if (!ch) {
      res.status(404).json({ message: "Primero crea tu personaje." });
      return null;
    }
    return ch;
  }
  const ultimo = new Map<number, number>();
  const frenar = (id: number, ms = 700) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  app.get("/api/jerusalen/concurso", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDe(ch));
    } catch (err) {
      console.error("[concurso] estado:", err);
      res.sendStatus(500);
    }
  });

  // empezar (una vez por semana): la primera pregunta corre desde ahora
  app.post("/api/jerusalen/concurso/empezar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id)) return res.status(429).json({ message: "Espera un momento" });
      const { rows } = await pool.query(
        `INSERT INTO game_contest_entries (week_key, character_id, asked_at) VALUES ($1, $2, now()) ON CONFLICT DO NOTHING RETURNING 1`,
        [semanaClave(), ch.id],
      );
      if (!rows.length) return res.status(409).json({ message: "Ya empezaste el concurso de esta semana." });
      res.json(await estadoDe(ch));
    } catch (err) {
      console.error("[concurso] empezar:", err);
      res.sendStatus(500);
    }
  });

  // pedir la siguiente pregunta: su reloj empieza ahora (no mientras se lee la explicación de la anterior)
  app.post("/api/jerusalen/concurso/siguiente", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      await pool.query(
        `UPDATE game_contest_entries SET asked_at = now() WHERE week_key = $1 AND character_id = $2 AND finished_at IS NULL AND asked_at IS NULL`,
        [semanaClave(), ch.id],
      );
      res.json(await estadoDe(ch));
    } catch (err) {
      console.error("[concurso] siguiente:", err);
      res.sendStatus(500);
    }
  });

  // responder la pregunta que toca: el servidor mide el tiempo (fuera de tiempo, no cuenta)
  app.post("/api/jerusalen/concurso/responder", async (req: Request, res: Response) => {
    const opcion = typeof req.body?.opcion === "string" ? req.body.opcion : "";
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id, 400)) return res.status(429).json({ message: "Espera un momento" });
      const semana = semanaClave();
      const { rows } = await pool.query(
        `SELECT n, finished_at, asked_at, EXTRACT(EPOCH FROM (now() - asked_at)) * 1000 AS pasados
           FROM game_contest_entries WHERE week_key = $1 AND character_id = $2`,
        [semana, ch.id],
      );
      const e = rows[0];
      if (!e) return res.status(409).json({ message: "Primero empieza el concurso." });
      if (e.finished_at) return res.status(409).json({ message: "Ya terminaste el concurso de esta semana." });
      if (!e.asked_at) return res.status(409).json({ message: "Primero pide la siguiente pregunta." });
      const n = Number(e.n);
      const q = preguntasDe(semana)[n];
      if (!q) return res.status(409).json({ message: "Ya terminaste el concurso de esta semana." });
      const pasados = Math.max(0, Math.round(Number(e.pasados) || 0));
      const aTiempo = pasados <= (CONCURSO_SEGUNDOS + 3) * 1000;
      const correcta = aTiempo && opcion === q.correcta;
      // la pregunta cuenta su tiempo (como mucho los 20 s); la siguiente corre desde ahora
      const ms = Math.min(pasados, CONCURSO_SEGUNDOS * 1000);
      const ultima = n + 1 >= CONCURSO_PREGUNTAS;
      const { rows: up } = await pool.query(
        `UPDATE game_contest_entries
            SET n = n + 1, correct = correct + $4, ms = ms + $5, asked_at = NULL,
                finished_at = CASE WHEN $6 THEN now() ELSE NULL END
          WHERE week_key = $1 AND character_id = $2 AND n = $3 AND finished_at IS NULL
          RETURNING 1`,
        [semana, ch.id, n, correcta ? 1 : 0, ms, ultima],
      );
      if (!up.length) return res.status(409).json({ message: "Esa pregunta ya se respondió." });
      if (ultima) forgetJer();
      const out: ConcursoRespuesta = { correcta, aTiempo, respuesta: q.correcta, explica: q.explica, ref: q.ref, estado: await estadoDe(ch) };
      res.json(out);
    } catch (err) {
      console.error("[concurso] responder:", err);
      res.sendStatus(500);
    }
  });
}
