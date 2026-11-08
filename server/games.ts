/**
 * Juegos: puntajes, partidas guardadas y la comunidad de jugadores (tabla de la semana y de
 * siempre, actividad con aplausos y quién juega ahora). Los juegos corren en el navegador; aquí
 * solo se guardan filas pequeñas, y lo que ven todos se guarda en memoria unos segundos para
 * que muchas personas mirando la tabla no carguen la base.
 */
import type { Express, Request, Response } from "express";
import { z } from "zod";
import { pool } from "./db";
import { aliasPublico } from "./private-fields";
import { GAMES, copaText, eventText, isGameSlug, weekKey, TEMPLO_LOGROS_NOMBRES } from "@shared/games";

export const GAME_SCORES_SQL = `
CREATE TABLE IF NOT EXISTS "game_scores" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "best_score" integer NOT NULL DEFAULT 0,
  "last_score" integer,
  "plays" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_game_scores_user_game" ON "game_scores" ("user_id", "game");
CREATE INDEX IF NOT EXISTS "idx_game_scores_board" ON "game_scores" ("game", "best_score" DESC);
ALTER TABLE "game_scores" ADD COLUMN IF NOT EXISTS "meta" jsonb;
CREATE TABLE IF NOT EXISTS "game_scores_week" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "week" text NOT NULL,
  "start_score" integer NOT NULL DEFAULT 0,
  "best_score" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("user_id", "game", "week")
);
CREATE INDEX IF NOT EXISTS "idx_game_scores_week_board" ON "game_scores_week" ("game", "week");
CREATE TABLE IF NOT EXISTS "game_events" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "key" text NOT NULL,
  "text" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_game_events_user_key" ON "game_events" ("user_id", "game", "key");
CREATE INDEX IF NOT EXISTS "idx_game_events_recent" ON "game_events" ("created_at" DESC);
CREATE TABLE IF NOT EXISTS "game_event_cheers" (
  "event_id" integer NOT NULL REFERENCES "game_events"("id") ON DELETE CASCADE,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "created_at" timestamp DEFAULT now(),
  PRIMARY KEY ("event_id", "user_id")
);`;

export const GAME_SAVES_SQL = `
CREATE TABLE IF NOT EXISTS "game_saves" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "data" jsonb NOT NULL,
  "updated_at" timestamp DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_game_saves_user_game" ON "game_saves" ("user_id", "game");`;

/** Una partida guardada no pasa de 32 KB (la del templo pesa unos 4 KB). */
const MAX_SAVE_BYTES = 32 * 1024;

const lastSubmit = new Map<string, number>();
const lastSave = new Map<string, number>();
const lastEvent = new Map<number, number>();
const lastCheer = new Map<number, number>();

const metaSchema = z
  .object({
    rango: z.number().int().min(0).max(10).optional(),
    jornada: z.number().int().min(0).max(1_000_000).optional(),
    copas: z.number().int().min(0).max(100_000).optional(),
    gen: z.number().int().min(1).max(99).optional(),
  })
  .strict();

const scoreSchema = z.object({
  score: z.number().int().min(0),
  seconds: z.number().min(0).max(1e9),
  meta: metaSchema.optional(),
});

// ---------------------------------------------------------------- memoria corta
const cache = new Map<string, { at: number; value: unknown }>();
async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < ttlMs) return hit.value as T;
  const value = await fn();
  cache.set(key, { at: Date.now(), value });
  if (cache.size > 300) cache.clear();
  return value;
}
function forget(prefix: string) {
  for (const k of [...cache.keys()]) if (k.startsWith(prefix)) cache.delete(k);
}
/** Para otros módulos (Jerusalén en línea publica en la misma actividad). */
export function forgetGameCache(prefix: string) {
  forget(prefix);
}

const PARECE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function publicName(r: { display_name?: string | null; username?: string | null; user_id?: number | string }) {
  if (r.display_name) return r.display_name;
  const u = r.username || "";
  return PARECE_CORREO.test(u) ? aliasPublico(null, Number(r.user_id)) : u || "Miembro";
}

type Meta = { rango?: number; jornada?: number; copas?: number; gen?: number } | null;
type Row = { rank: number; name: string; avatarUrl: string | null; score: number; userId: number; meta: Meta };

// ---------------------------------------------------------------- tablas
async function topAll(game: string): Promise<Row[]> {
  return cached(`top:${game}:siempre`, 20_000, async () => {
    const { rows } = await pool.query(
      `SELECT gs.user_id, gs.best_score, gs.meta, u.display_name, u.username, u.avatar_url
         FROM game_scores gs JOIN users u ON u.id = gs.user_id
        WHERE gs.game = $1 AND gs.best_score > 0 AND u.is_active IS NOT FALSE
        ORDER BY gs.best_score DESC, gs.updated_at ASC
        LIMIT 10`,
      [game],
    );
    return rows.map((r, i) => ({ rank: i + 1, name: publicName(r), avatarUrl: r.avatar_url || null, score: Number(r.best_score), userId: Number(r.user_id), meta: r.meta || null }));
  });
}

async function topWeek(game: string, week: string, gain: boolean): Promise<Row[]> {
  return cached(`top:${game}:${week}`, 20_000, async () => {
    const pts = gain ? "(w.best_score - w.start_score)" : "w.best_score";
    const { rows } = await pool.query(
      `SELECT w.user_id, ${pts} AS pts, gs.meta, u.display_name, u.username, u.avatar_url
         FROM game_scores_week w
         JOIN users u ON u.id = w.user_id
         LEFT JOIN game_scores gs ON gs.user_id = w.user_id AND gs.game = w.game
        WHERE w.game = $1 AND w.week = $2 AND ${pts} > 0 AND u.is_active IS NOT FALSE
        ORDER BY pts DESC, w.updated_at ASC
        LIMIT 10`,
      [game, week],
    );
    return rows.map((r, i) => ({ rank: i + 1, name: publicName(r), avatarUrl: r.avatar_url || null, score: Number(r.pts), userId: Number(r.user_id), meta: r.meta || null }));
  });
}

async function board(game: string, me: number | null, periodo: "semana" | "siempre") {
  const info = GAMES[game];
  const week = weekKey();
  const gain = info.weekly === "gain";
  const top = periodo === "semana" ? await topWeek(game, week, gain) : await topAll(game);
  let mine: { best: number; rank: number; plays: number } | null = null;
  if (me) {
    if (periodo === "semana") {
      const pts = gain ? "(best_score - start_score)" : "best_score";
      const { rows: m } = await pool.query(
        `SELECT ${pts} AS pts,
                (SELECT count(*)::int + 1 FROM game_scores_week o WHERE o.game = $1 AND o.week = $2 AND ${gain ? "(o.best_score - o.start_score)" : "o.best_score"} > ${pts}) AS rank
           FROM game_scores_week WHERE game = $1 AND week = $2 AND user_id = $3`,
        [game, week, me],
      );
      if (m[0] && Number(m[0].pts) > 0) mine = { best: Number(m[0].pts), rank: Number(m[0].rank), plays: 0 };
    } else {
      const { rows: m } = await pool.query(
        `SELECT best_score, plays,
                (SELECT count(*)::int + 1 FROM game_scores o WHERE o.game = $1 AND o.best_score > g.best_score) AS rank
           FROM game_scores g WHERE g.game = $1 AND g.user_id = $2`,
        [game, me],
      );
      if (m[0]) mine = { best: Number(m[0].best_score), rank: Number(m[0].rank), plays: Number(m[0].plays) };
    }
  }
  return {
    periodo,
    week,
    top: top.map(({ userId, ...r }) => ({ ...r, isMe: me !== null && userId === me })),
    mine,
  };
}

async function playingNow(game: string): Promise<number> {
  return cached(`ahora:${game}`, 30_000, async () => {
    const table = GAMES[game].saves ? "game_saves" : "game_scores";
    const { rows } = await pool.query(`SELECT count(*)::int AS n FROM ${table} WHERE game = $1 AND updated_at > now() - interval '4 minutes'`, [game]);
    return Number(rows[0]?.n || 0);
  });
}

async function playersTotal(game: string): Promise<number> {
  return cached(`total:${game}`, 60_000, async () => {
    const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_scores WHERE game = $1 AND best_score > 0`, [game]);
    return Number(rows[0]?.n || 0);
  });
}

type Activity = { id: number; game: string; name: string; avatarUrl: string | null; text: string; createdAt: string; cheers: number; userId: number };
async function recentActivity(game: string | null): Promise<Activity[]> {
  return cached(`actividad:${game || "todos"}`, 15_000, async () => {
    const { rows } = await pool.query(
      `SELECT e.id, e.game, e.text, e.created_at, e.user_id, u.display_name, u.username, u.avatar_url,
              (SELECT count(*)::int FROM game_event_cheers c WHERE c.event_id = e.id) AS cheers
         FROM game_events e JOIN users u ON u.id = e.user_id
        WHERE ($1::text IS NULL OR e.game = $1) AND u.is_active IS NOT FALSE
        ORDER BY e.created_at DESC
        LIMIT 30`,
      [game],
    );
    return rows.map((r) => ({
      id: Number(r.id),
      game: r.game,
      name: publicName(r),
      avatarUrl: r.avatar_url || null,
      text: r.text,
      createdAt: new Date(r.created_at).toISOString(),
      cheers: Number(r.cheers),
      userId: Number(r.user_id),
    }));
  });
}

async function withMyCheers(items: Activity[], me: number) {
  if (!items.length) return [];
  const { rows } = await pool.query(`SELECT event_id FROM game_event_cheers WHERE user_id = $1 AND event_id = ANY($2::int[])`, [me, items.map((i) => i.id)]);
  const mine = new Set(rows.map((r) => Number(r.event_id)));
  return items.map(({ userId, ...i }) => ({ ...i, cheeredByMe: mine.has(i.id), isMine: userId === me }));
}

export function registerGameRoutes(app: Express) {
  // Partida guardada (solo juegos largos y solo la de uno mismo)
  app.get("/api/juegos/:slug/partida", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug) || !GAMES[slug].saves) return res.sendStatus(404);
    try {
      const { rows } = await pool.query(`SELECT data, updated_at FROM game_saves WHERE user_id = $1 AND game = $2`, [req.user!.id, slug]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ data: rows[0]?.data ?? null, updatedAt: rows[0]?.updated_at ?? null });
    } catch (err) {
      console.error("[juegos] leer partida:", err);
      res.sendStatus(500);
    }
  });

  app.put("/api/juegos/:slug/partida", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug) || !GAMES[slug].saves) return res.sendStatus(404);
    const data = req.body?.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) return res.status(400).json({ message: "Partida no válida" });
    const json = JSON.stringify(data);
    if (json.length > MAX_SAVE_BYTES) return res.status(413).json({ message: "La partida es demasiado grande" });
    const me = req.user!.id;
    const key = `${me}:${slug}`;
    const now = Date.now();
    // Se guarda cada tanto (y al cerrar): más seguido no hace falta y no carga el servidor.
    if (now - (lastSave.get(key) || 0) < 4000) return res.status(429).json({ message: "Espera un momento" });
    lastSave.set(key, now);
    if (lastSave.size > 5000) lastSave.clear();
    try {
      await pool.query(
        `INSERT INTO game_saves (user_id, game, data, updated_at) VALUES ($1, $2, $3::jsonb, now())
         ON CONFLICT (user_id, game) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
        [me, slug, json],
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("[juegos] guardar partida:", err);
      res.sendStatus(500);
    }
  });

  // La tabla de los mejores: para miembros (muestra nombres de la comunidad).
  app.get("/api/juegos/:slug/ranking", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug)) return res.sendStatus(404);
    const periodo = req.query.periodo === "semana" ? "semana" : "siempre";
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json(await board(slug, req.user!.id, periodo));
    } catch (err) {
      console.error("[juegos] ranking:", err);
      res.sendStatus(500);
    }
  });

  // Puntaje de una partida (o la gloria acumulada de un juego largo)
  app.post("/api/juegos/:slug/puntaje", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug)) return res.sendStatus(404);
    const info = GAMES[slug];
    try {
      const { score, seconds, meta } = scoreSchema.parse(req.body);
      const me = req.user!.id;
      const key = `${me}:${slug}`;
      const now = Date.now();
      if (now - (lastSubmit.get(key) || 0) < 3000) return res.status(429).json({ message: "Espera un momento antes de mandar otro puntaje" });
      lastSubmit.set(key, now);
      if (lastSubmit.size > 5000) lastSubmit.clear();
      // Un puntaje imposible (muy alto o en muy poco tiempo) no entra a la tabla.
      const secs = Math.min(seconds, info.maxSeconds ?? 6 * 60 * 60);
      if (score > info.maxScore || score > Math.max(30, secs * info.maxPointsPerSecond)) {
        return res.status(400).json({ message: "Ese puntaje no parece de una partida real" });
      }
      const { rows: prev } = await pool.query(`SELECT best_score FROM game_scores WHERE user_id = $1 AND game = $2`, [me, slug]);
      const prevBest = prev[0] ? Number(prev[0].best_score) : 0;
      await pool.query(
        `INSERT INTO game_scores (user_id, game, best_score, last_score, plays, meta, updated_at)
         VALUES ($1, $2, $3, $3, 1, $4::jsonb, now())
         ON CONFLICT (user_id, game) DO UPDATE
            SET best_score = GREATEST(game_scores.best_score, EXCLUDED.best_score),
                last_score = EXCLUDED.last_score,
                plays = game_scores.plays + 1,
                meta = COALESCE(EXCLUDED.meta, game_scores.meta),
                updated_at = CASE WHEN EXCLUDED.best_score > game_scores.best_score THEN now() ELSE game_scores.updated_at END`,
        [me, slug, score, meta ? JSON.stringify(meta) : null],
      );
      // Tabla de la semana: en los juegos largos cuenta lo ganado desde que empezó la semana.
      await pool.query(
        `INSERT INTO game_scores_week (user_id, game, week, start_score, best_score, updated_at)
         VALUES ($1, $2, $3, $4, $5, now())
         ON CONFLICT (user_id, game, week) DO UPDATE
            SET best_score = GREATEST(game_scores_week.best_score, EXCLUDED.best_score),
                updated_at = now()`,
        [me, slug, weekKey(), info.weekly === "gain" ? Math.min(prevBest, score) : 0, score],
      );
      forget(`top:${slug}`);
      res.json(await board(slug, me, "siempre"));
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Puntaje no válido" });
      console.error("[juegos] puntaje:", err);
      res.sendStatus(500);
    }
  });

  // Un logro para la actividad de la comunidad. El texto lo arma el servidor; cada logro, una sola vez.
  app.post("/api/juegos/:slug/logro", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug) || !GAMES[slug].events) return res.sendStatus(404);
    const tipo = String(req.body?.tipo || "");
    const valor = req.body?.valor;
    let text: string | null = null;
    let key = "";
    if (tipo === "copa" && typeof valor === "string" && Object.prototype.hasOwnProperty.call(TEMPLO_LOGROS_NOMBRES, valor)) {
      text = copaText(slug, valor);
      key = `copa:${valor}`;
    } else if (typeof valor === "number") {
      text = eventText(slug, tipo, valor);
      key = `${tipo}:${valor}`;
    }
    if (!text) return res.status(400).json({ message: "Logro no válido" });
    const me = req.user!.id;
    const now = Date.now();
    if (now - (lastEvent.get(me) || 0) < 2500) return res.status(429).json({ message: "Espera un momento" });
    lastEvent.set(me, now);
    if (lastEvent.size > 5000) lastEvent.clear();
    try {
      const { rows } = await pool.query(
        `INSERT INTO game_events (user_id, game, key, text) VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, game, key) DO NOTHING RETURNING id`,
        [me, slug, key, text],
      );
      forget("actividad:");
      res.json({ ok: true, nuevo: rows.length > 0 });
    } catch (err) {
      console.error("[juegos] logro:", err);
      res.sendStatus(500);
    }
  });

  // Actividad reciente de la comunidad (de un juego o de todos)
  app.get("/api/juegos/actividad", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const juego = typeof req.query.juego === "string" && isGameSlug(req.query.juego) ? req.query.juego : null;
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json({ items: await withMyCheers(await recentActivity(juego), req.user!.id) });
    } catch (err) {
      console.error("[juegos] actividad:", err);
      res.sendStatus(500);
    }
  });

  // Aplaudir un logro de otra persona (una vez por logro)
  app.post("/api/juegos/actividad/:id/aplauso", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Logro no válido" });
    const me = req.user!.id;
    const now = Date.now();
    if (now - (lastCheer.get(me) || 0) < 600) return res.status(429).json({ message: "Espera un momento" });
    lastCheer.set(me, now);
    if (lastCheer.size > 5000) lastCheer.clear();
    try {
      const { rows: ev } = await pool.query(`SELECT user_id FROM game_events WHERE id = $1`, [id]);
      if (!ev[0]) return res.sendStatus(404);
      if (Number(ev[0].user_id) === me) return res.status(400).json({ message: "No puedes aplaudir tu propio logro" });
      await pool.query(`INSERT INTO game_event_cheers (event_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [id, me]);
      const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_event_cheers WHERE event_id = $1`, [id]);
      forget("actividad:");
      res.json({ cheers: Number(rows[0].n) });
    } catch (err) {
      console.error("[juegos] aplauso:", err);
      res.sendStatus(500);
    }
  });

  // Cuántos juegan ahora (público: solo un número, sin nombres)
  app.get("/api/juegos/:slug/ahora", async (req: Request, res: Response) => {
    const slug = String(req.params.slug);
    if (!isGameSlug(slug)) return res.sendStatus(404);
    try {
      res.setHeader("Cache-Control", "public, max-age=30");
      res.json({ jugando: await playingNow(slug), jugadores: await playersTotal(slug) });
    } catch (err) {
      console.error("[juegos] ahora:", err);
      res.sendStatus(500);
    }
  });

  // La sala de juegos: cuántos juegan y, para miembros, quién va primero y lo último que pasó.
  app.get("/api/juegos/comunidad", async (req: Request, res: Response) => {
    try {
      const member = req.isAuthenticated();
      const juegos = await Promise.all(
        Object.keys(GAMES).map(async (slug) => {
          const base = { slug, jugando: await playingNow(slug), jugadores: await playersTotal(slug) };
          if (!member) return base;
          const semana = await topWeek(slug, weekKey(), GAMES[slug].weekly === "gain");
          const siempre = await topAll(slug);
          const strip = (r?: Row) => (r ? { name: r.name, avatarUrl: r.avatarUrl, score: r.score, meta: r.meta } : null);
          return { ...base, lider: strip(siempre[0]), liderSemana: strip(semana[0]) };
        }),
      );
      const actividad = member ? (await withMyCheers(await recentActivity(null), req.user!.id)).slice(0, 12) : [];
      res.setHeader("Cache-Control", "no-store");
      res.json({ juegos, actividad });
    } catch (err) {
      console.error("[juegos] comunidad:", err);
      res.sendStatus(500);
    }
  });
}
