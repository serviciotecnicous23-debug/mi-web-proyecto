/**
 * Los logros de Jerusalén en línea (shared/logros-en-linea.ts): se calculan de las tablas que ya
 * existen (muro, pedidos, reuniones, concurso, estudios, cátedras y ofrenda del barrio). Los ve cualquiera con
 * sesión al visitar una casa o tocar a un vecino.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { ORDEN_LOGROS, type LogroId, type LogrosDe } from "@shared/logros-en-linea";
import { esAdmin, personajeDe } from "./jerusalen";
import { semanaClave } from "./misiones";
import { LOGRO_PATIO_GANAR, LOGRO_PATIO_JUGAR } from "@shared/juegos-grupo";

const PIDE: Record<LogroId, number> = { constructor: 30, buenVecino: 5, maestro: 3, campeon: 1, estudioso: 3, discipulo: 30, sabio: 1, consejero: 5, vencedor: 5, fiel: 2, siervoFiel: 7, mensajero: 10, alegriaPatio: LOGRO_PATIO_JUGAR, coronaPatio: LOGRO_PATIO_GANAR };

const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null }) =>
  (r.name && r.name !== "__propio__" ? r.name : null) || r.display_name || r.username || "Un vecino";

/** Lo que lleva un personaje en cada logro (cada consulta por separado: si una tabla falta, ese da 0). */
async function lleva(id: number): Promise<Record<LogroId, number>> {
  const uno = async (sql: string, params: unknown[]) => {
    try {
      const { rows } = await pool.query(sql, params);
      return Number(rows[0]?.n || 0);
    } catch {
      return 0;
    }
  };
  // De a seis consultas a la vez (no doce): la base de Render es pequeña y la de prueba admite diez conexiones.
  const enTandas = async (consultas: (() => Promise<number>)[]) => {
    const out: number[] = [];
    for (let i = 0; i < consultas.length; i += 6) out.push(...(await Promise.all(consultas.slice(i, i + 6).map((f) => f()))));
    return out;
  };
  const [constructor, buenVecino, maestro, campeon, estudioso, discipulo, sabio, consejero, vencedor, fiel, siervoFiel, mensajero, alegriaPatio, coronaPatio] = await enTandas([
    () => uno(`SELECT COALESCE(sum(n), 0)::int AS n FROM game_wall_contributions WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    () => uno(`SELECT count(*)::int AS n FROM game_help_gifts WHERE donor_character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    () => uno(
      `SELECT COALESCE(max(c), 0)::int AS n FROM (SELECT count(a.character_id) AS c FROM game_house_meetings m
         LEFT JOIN game_meeting_attendance a ON a.meeting_id = m.id WHERE m.host_character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1) GROUP BY m.id) t`,
      [id],
    ),
    () => uno(
      `SELECT count(*)::int AS n FROM (
         SELECT character_id, rank() OVER (PARTITION BY week_key ORDER BY correct DESC, ms ASC, finished_at ASC) AS r
           FROM game_contest_entries WHERE finished_at IS NOT NULL AND week_key < $2) t
        WHERE t.character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1) AND t.r <= 3`,
      [id, semanaClave()],
    ),
    // los estudios son de la persona (cualquiera de sus personajes)
    () => uno(
      `SELECT count(DISTINCT s.study_id)::int AS n FROM game_studies s
         JOIN game_characters c2 ON c2.id = s.character_id
         JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game
        WHERE yo.id = $1 AND s.approved_at IS NOT NULL`,
      [id],
    ),
    // las lecciones distintas aprendidas en todas las cátedras (las guarda el titular de la persona)
    () => uno(`SELECT COALESCE(sum(jsonb_array_length(seen)), 0)::int AS n FROM game_catedras WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    // «¿Quién es sabio?»: las veces que subió las quince gradas (lo guarda el titular de la persona)
    () => uno(`SELECT COALESCE(max(ganadas), 0)::int AS n FROM game_sabio WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    // los consejos acertados que dio a sus amigos y vecinos en el concurso
    () => uno(`SELECT COALESCE(max(consejos_buenos), 0)::int AS n FROM game_sabio WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    // los duelos de sabios que ganó
    () => uno(`SELECT COALESCE(max(duelos_ganados), 0)::int AS n FROM game_sabio WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    () => uno(`SELECT count(*)::int AS n FROM game_barrio_aportes WHERE character_id IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1) AND premiado = true`, [id]),
    // la mejor racha de servicio de la persona (la guarda su titular: server/racha.ts)
    () => uno(`SELECT COALESCE(max(mejor), 0)::int AS n FROM game_racha WHERE titular IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    // los recados cumplidos en la calle de los siervos (también del titular: server/personajes.ts)
    () => uno(`SELECT count(*)::int AS n FROM game_recados WHERE titular IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1) AND done_at IS NOT NULL`, [id]),
    // el patio de los juegos (server/juegos-grupo.ts): las partidas en grupo jugadas y ganadas (las guarda el titular)
    () => uno(`SELECT count(*)::int AS n FROM game_juegos_jugadores WHERE titular IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
    () => uno(`SELECT count(*)::int AS n FROM game_juegos_jugadores WHERE gano AND titular IN (SELECT c2.id FROM game_characters c2 JOIN game_characters yo ON yo.user_id = c2.user_id AND yo.game = c2.game WHERE yo.id = $1)`, [id]),
  ]);
  return { constructor, buenVecino, maestro, campeon, estudioso, discipulo, sabio, consejero, vencedor, fiel, siervoFiel, mensajero, alegriaPatio, coronaPatio };
}

export async function logrosDe(id: number, nombre: string): Promise<LogrosDe> {
  const l = await lleva(id);
  return {
    personajeId: id,
    nombre,
    logros: ORDEN_LOGROS.map((k) => ({ id: k, tiene: l[k] >= PIDE[k], lleva: Math.min(l[k], PIDE[k]), pide: PIDE[k] })),
  };
}

export function registerLogrosEnLineaRoutes(app: Express) {
  // los míos (con lo que llevo de cada uno)
  app.get("/api/jerusalen/logros", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const ch = await personajeDe(req.user!.id);
      if (!ch) return res.status(404).json({ message: "Primero crea tu personaje." });
      const { rows: p } = await pool.query(
        `SELECT c.name, u.display_name, u.username FROM game_characters c JOIN users u ON u.id = c.user_id WHERE c.id = $1`,
        [ch.id],
      );
      res.setHeader("Cache-Control", "no-store");
      res.json(await logrosDe(ch.id, nombreDe(p[0] ?? {})));
    } catch (err) {
      console.error("[logros] míos:", err);
      res.sendStatus(500);
    }
  });

  // los de otro personaje (los ven los vecinos)
  app.get("/api/jerusalen/logros/de/:personajeId", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);
    try {
      const { rows: p } = await pool.query(
        `SELECT c.id, c.name, u.display_name, u.username, u.is_active FROM game_characters c JOIN users u ON u.id = c.user_id WHERE c.id = $1`,
        [id],
      );
      if (!p[0] || (p[0].is_active === false && !esAdmin(req))) return res.sendStatus(404);
      res.setHeader("Cache-Control", "no-store");
      res.json(await logrosDe(id, nombreDe(p[0])));
    } catch (err) {
      console.error("[logros] de:", err);
      res.sendStatus(500);
    }
  });
}
