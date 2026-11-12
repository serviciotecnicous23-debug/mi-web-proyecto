/**
 * El termómetro del gozo (solo la administración): cuánto gozo entró y salió cada día y de dónde (server/gozo.ts,
 * tabla `game_gozo_dia`), cuánto gozo tiene la gente guardado y el tesoro del templo. Sirve para equilibrar la
 * economía con números: si entra mucho más de lo que sale, el gozo pierde su valor y hay que sumar en qué gastarlo.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { esAdmin } from "./jerusalen";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import type { TermometroGozo } from "@shared/obras";

export function registerTermometroRoutes(app: Express) {
  app.get("/api/jerusalen/admin/gozo", async (req: Request, res: Response) => {
    try {
      if (!esAdmin(req)) return res.sendStatus(403);
      const dias = Math.max(1, Math.min(60, Math.floor(Number(req.query.dias) || 14)));
      const [{ rows: filas }, { rows: gente }, { rows: tesoro }] = await Promise.all([
        pool.query(
          `SELECT dia, fuente, entra::float AS entra, sale::float AS sale, veces FROM game_gozo_dia
            WHERE dia >= to_char((now() AT TIME ZONE 'America/Chicago')::date - $1::int + 1, 'YYYY-MM-DD')
            ORDER BY dia DESC, (entra + sale) DESC`,
          [dias],
        ),
        // el gozo de cada persona lo guarda su titular (el primer personaje)
        pool.query(
          `WITH t AS (
             SELECT c.gozo FROM game_characters c
              WHERE c.game = $1 AND c.id = (SELECT MIN(c2.id) FROM game_characters c2 WHERE c2.user_id = c.user_id AND c2.game = c.game)
           )
           SELECT count(*)::int AS personas, COALESCE(sum(gozo), 0)::float AS total, COALESCE(max(gozo), 0)::int AS maximo,
                  COALESCE(percentile_cont(0.5) WITHIN GROUP (ORDER BY gozo), 0)::float AS mediana,
                  count(*) FILTER (WHERE gozo >= 1000)::int AS con_mil
             FROM t`,
          [JERUSALEN_JUEGO],
        ),
        pool.query(`SELECT balance FROM game_treasury WHERE id = 1`).catch(() => ({ rows: [] as { balance: number }[] })),
      ]);
      const porDia = new Map<string, TermometroGozo["dias"][number]>();
      for (const f of filas) {
        const d = porDia.get(f.dia) ?? { dia: String(f.dia), entra: 0, sale: 0, fuentes: [] };
        d.entra += Number(f.entra);
        d.sale += Number(f.sale);
        d.fuentes.push({ fuente: String(f.fuente), entra: Number(f.entra), sale: Number(f.sale), veces: Number(f.veces) });
        porDia.set(f.dia, d);
      }
      const g = gente[0] ?? {};
      const out: TermometroGozo = {
        dias: [...porDia.values()],
        guardado: {
          personas: Number(g.personas || 0),
          total: Math.round(Number(g.total || 0)),
          mediana: Math.round(Number(g.mediana || 0)),
          maximo: Number(g.maximo || 0),
          conMil: Number(g.con_mil || 0),
        },
        tesoro: Number(tesoro[0]?.balance || 0),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[termómetro] gozo:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
