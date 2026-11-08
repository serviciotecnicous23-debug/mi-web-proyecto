/**
 * Puntajes de los juegos. Los juegos corren en el navegador; aquí solo se guarda el mejor
 * puntaje de cada persona por juego (una fila) y se arma la tabla de los mejores.
 * Una escritura pequeña por partida terminada: no carga el servidor.
 */
import type { Express, Request, Response } from "express";
import { z } from "zod";
import { pool } from "./db";
import { GAMES, isGameSlug } from "@shared/games";

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
CREATE INDEX IF NOT EXISTS "idx_game_scores_board" ON "game_scores" ("game", "best_score" DESC);`;

const lastSubmit = new Map<string, number>();

const scoreSchema = z.object({
  score: z.number().int().min(0),
  seconds: z.number().min(0).max(6 * 60 * 60),
});

async function board(game: string, me: number | null) {
  const { rows } = await pool.query(
    `SELECT gs.user_id, gs.best_score, u.display_name, u.username, u.avatar_url
       FROM game_scores gs JOIN users u ON u.id = gs.user_id
      WHERE gs.game = $1 AND gs.best_score > 0
      ORDER BY gs.best_score DESC, gs.updated_at ASC
      LIMIT 10`,
    [game],
  );
  let mine: { best: number; rank: number; plays: number } | null = null;
  if (me) {
    const { rows: m } = await pool.query(
      `SELECT best_score, plays,
              (SELECT count(*)::int + 1 FROM game_scores o WHERE o.game = $1 AND o.best_score > g.best_score) AS rank
         FROM game_scores g WHERE g.game = $1 AND g.user_id = $2`,
      [game, me],
    );
    if (m[0]) mine = { best: Number(m[0].best_score), rank: Number(m[0].rank), plays: Number(m[0].plays) };
  }
  return {
    top: rows.map((r, i) => ({
      rank: i + 1,
      name: r.display_name || r.username,
      avatarUrl: r.avatar_url || null,
      score: Number(r.best_score),
      isMe: me !== null && Number(r.user_id) === me,
    })),
    mine,
  };
}

export function registerGameRoutes(app: Express) {
  // La tabla de los mejores: para miembros (muestra nombres de la comunidad).
  app.get("/api/juegos/:slug/ranking", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug)) return res.sendStatus(404);
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json(await board(slug, req.user!.id));
    } catch (err) {
      console.error("[juegos] ranking:", err);
      res.sendStatus(500);
    }
  });

  // Puntaje de una partida terminada
  app.post("/api/juegos/:slug/puntaje", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slug = String(req.params.slug);
    if (!isGameSlug(slug)) return res.sendStatus(404);
    const info = GAMES[slug];
    try {
      const { score, seconds } = scoreSchema.parse(req.body);
      const me = req.user!.id;
      const key = `${me}:${slug}`;
      const now = Date.now();
      if (now - (lastSubmit.get(key) || 0) < 3000) return res.status(429).json({ message: "Espera un momento antes de mandar otro puntaje" });
      lastSubmit.set(key, now);
      if (lastSubmit.size > 5000) lastSubmit.clear();
      // Un puntaje imposible (muy alto o en muy poco tiempo) no entra a la tabla.
      if (score > info.maxScore || score > Math.max(30, seconds * info.maxPointsPerSecond)) {
        return res.status(400).json({ message: "Ese puntaje no parece de una partida real" });
      }
      await pool.query(
        `INSERT INTO game_scores (user_id, game, best_score, last_score, plays, updated_at)
         VALUES ($1, $2, $3, $3, 1, now())
         ON CONFLICT (user_id, game) DO UPDATE
            SET best_score = GREATEST(game_scores.best_score, EXCLUDED.best_score),
                last_score = EXCLUDED.last_score,
                plays = game_scores.plays + 1,
                updated_at = CASE WHEN EXCLUDED.best_score > game_scores.best_score THEN now() ELSE game_scores.updated_at END`,
        [me, slug, score],
      );
      res.json(await board(slug, me));
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Puntaje no válido" });
      console.error("[juegos] puntaje:", err);
      res.sendStatus(500);
    }
  });
}
