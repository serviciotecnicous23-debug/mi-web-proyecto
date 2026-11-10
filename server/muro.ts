/**
 * El muro caído (shared/muro.ts): cada deber aceptado pone una piedra en el tramo que se está
 * levantando. Al completarse un tramo, quienes pusieron al menos 10 piedras en él reciben gozo y la
 * comunidad lo ve. Todo se suma de una vez en la base (sin carreras entre quienes sirven a la vez).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { MURO_APORTE_MINIMO, MURO_META, MURO_PREMIO_GOZO, MURO_TRAMOS, type MuroEstado } from "@shared/muro";
import { evento, personajeDe } from "./jerusalen";
import { sumarGozo } from "./gozo";

export const MURO_SQL = `
CREATE TABLE IF NOT EXISTS "game_city_wall" (
  "id" integer PRIMARY KEY,
  "built" integer NOT NULL DEFAULT 0,
  "progress" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
INSERT INTO "game_city_wall" ("id") VALUES (1) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS "game_wall_contributions" (
  "tramo" integer NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "n" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("tramo", "character_id")
);`;

const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null }) =>
  (r.name && r.name !== "__propio__" ? r.name : null) || r.display_name || r.username || "Un vecino";

/** Pone las piedras de unos deberes en el muro; si se completa un tramo, reparte el premio. */
export async function aportarAlMuro(ch: { id: number; user_id: number }, n: number): Promise<{ titulo: string; premio: number; gozo?: number }[]> {
  if (n <= 0) return [];
  const { rows } = await pool.query(
    `UPDATE game_city_wall SET progress = progress + $1, updated_at = now() WHERE id = 1 AND built < $2 RETURNING built, progress`,
    [n, MURO_TRAMOS],
  );
  if (!rows.length) return [];
  const tramo = Number(rows[0].built);
  await pool.query(
    `INSERT INTO game_wall_contributions (tramo, character_id, n) VALUES ($1, $2, $3)
     ON CONFLICT (tramo, character_id) DO UPDATE SET n = game_wall_contributions.n + EXCLUDED.n`,
    [tramo, ch.id, n],
  );
  const out: { titulo: string; premio: number; gozo?: number }[] = [];
  // ¿se completó el tramo? (solo uno lo levanta, aunque lleguen dos a la vez)
  for (;;) {
    const { rows: up } = await pool.query(
      `UPDATE game_city_wall SET built = built + 1, progress = progress - $1, updated_at = now()
        WHERE id = 1 AND progress >= $1 AND built < $2 RETURNING built`,
      [MURO_META, MURO_TRAMOS],
    );
    if (!up.length) break;
    const hecho = Number(up[0].built) - 1;
    const { rows: ayudaron } = await pool.query(
      `SELECT w.character_id, c.user_id FROM game_wall_contributions w JOIN game_characters c ON c.id = w.character_id
        WHERE w.tramo = $1 AND w.n >= $2`,
      [hecho, MURO_APORTE_MINIMO],
    );
    for (const a of ayudaron) {
      await sumarGozo(Number(a.character_id), MURO_PREMIO_GOZO);
      if (Number(a.character_id) === ch.id) out.push({ titulo: `¡Se levantó el tramo ${hecho + 1} del muro!`, premio: 0, gozo: MURO_PREMIO_GOZO });
    }
    await evento(ch.user_id, `muro:${hecho}`, `puso la última piedra del tramo ${hecho + 1} del muro de Jerusalén en línea`).catch(() => null);
  }
  return out;
}

async function estadoMuro(yo: number): Promise<MuroEstado> {
  const { rows } = await pool.query(`SELECT built, progress FROM game_city_wall WHERE id = 1`);
  const construidos = Math.min(MURO_TRAMOS, Number(rows[0]?.built || 0));
  const progreso = construidos >= MURO_TRAMOS ? 0 : Math.min(MURO_META, Number(rows[0]?.progress || 0));
  const [{ rows: mias }, { rows: top }] = await Promise.all([
    pool.query(`SELECT n FROM game_wall_contributions WHERE tramo = $1 AND character_id = $2`, [construidos, yo]),
    pool.query(
      `SELECT w.n, c.name, u.display_name, u.username FROM game_wall_contributions w
         JOIN game_characters c ON c.id = w.character_id JOIN users u ON u.id = c.user_id
        WHERE w.tramo = $1 AND u.is_active = true ORDER BY w.n DESC LIMIT 5`,
      [construidos],
    ),
  ]);
  return {
    tramos: MURO_TRAMOS,
    meta: MURO_META,
    construidos,
    progreso,
    mias: Number(mias[0]?.n || 0),
    top: top.map((r) => ({ nombre: nombreDe(r), n: Number(r.n) })),
  };
}

export function registerMuroRoutes(app: Express) {
  app.get("/api/jerusalen/muro", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      const ch = await personajeDe(req.user!.id);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoMuro(ch?.id ?? 0));
    } catch (err) {
      console.error("[muro] estado:", err);
      res.sendStatus(500);
    }
  });
}
