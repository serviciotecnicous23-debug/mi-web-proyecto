/**
 * El arca de Joás (shared/arca.ts): una obra de toda la ciudad por temporada. Se echa gozo en una transacción con el arca
 * trabada (`FOR UPDATE`): nadie pasa de lo que falta ni de lo que puede dar en el día. La meta se fija la primera vez de
 * cada temporada por la gente que sirvió en los últimos 7 días. Al llenarse se avisa en vivo a toda la ciudad.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, esAdmin, evento, nombreDe, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { anotarGasto } from "./gozo";
import { difundirATodos } from "./ciudad-red";
import { sumarALaCopa } from "./barrio-juntos";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import {
  ARCA_MAXIMO_DIA, ARCA_MINIMO, ARCA_TITULO_DESDE, NOMBRES_EN_EL_LIBRO, cuantoSeEcha, metaDelArca, type ArcaEstado, type ArcaVista,
} from "@shared/arca";

export const ARCA_SQL = `
CREATE TABLE IF NOT EXISTS "game_arca" (
  "temporada" integer PRIMARY KEY,
  "meta" integer NOT NULL,
  "aportado" integer NOT NULL DEFAULT 0,
  "llena_at" timestamp,
  "causa" text
);
CREATE TABLE IF NOT EXISTS "game_arca_aportes" (
  "id" serial PRIMARY KEY,
  "temporada" integer NOT NULL,
  "titular" integer NOT NULL,
  "gozo" integer NOT NULL,
  "dia" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_arca_aportes" ON "game_arca_aportes" ("temporada", "titular");`;

/** El arca de la temporada: la meta se fija la primera vez (por las personas que sirvieron en los últimos 7 días). */
async function asegurarArca(temporada: number): Promise<void> {
  const { rows } = await pool.query(`SELECT 1 FROM game_arca WHERE temporada = $1`, [temporada]);
  if (rows.length) return;
  const { rows: a } = await pool.query(
    `SELECT count(DISTINCT c.user_id)::int AS n FROM game_characters c JOIN users u ON u.id = c.user_id
      WHERE c.game = $1 AND u.is_active = true AND c.last_duty_at > now() - interval '7 days'`,
    [JERUSALEN_JUEGO],
  );
  await pool.query(`INSERT INTO game_arca (temporada, meta) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [temporada, metaDelArca(Number(a[0]?.n || 0))]);
}

const vista = (r: Record<string, unknown>): ArcaVista => ({ temporada: Number(r.temporada), aportado: Number(r.aportado), meta: Number(r.meta), llena: !!r.llena_at });

/** Lo que ve la ciudad del arca de esta temporada (en memoria 30 s; se olvida al llenarse). */
let cache: { at: number; v: ArcaVista } | null = null;
export async function vistaArca(): Promise<ArcaVista> {
  const t = temporadaDe().n;
  if (cache && cache.v.temporada === t && Date.now() - cache.at < 30_000) return cache.v;
  await asegurarArca(t);
  const { rows } = await pool.query(`SELECT * FROM game_arca WHERE temporada = $1`, [t]);
  const v = rows[0] ? vista(rows[0]) : { temporada: t, aportado: 0, meta: metaDelArca(0), llena: false };
  cache = { at: Date.now(), v };
  return v;
}

/** Si dio 50 o más en el arca de alguna temporada que la ciudad llenó (el título «Dador alegre»). */
export async function esDadorAlegre(titular: number): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT 1 FROM game_arca_aportes a JOIN game_arca g ON g.temporada = a.temporada
      WHERE a.titular = $1 AND g.llena_at IS NOT NULL GROUP BY a.temporada HAVING sum(a.gozo) >= $2 LIMIT 1`,
    [titular, ARCA_TITULO_DESDE],
  );
  return rows.length > 0;
}

/** Una línea para los chismes de la ciudad: cómo va el arca. */
export async function noticiaDelArca(): Promise<string | null> {
  const v = await vistaArca();
  if (v.llena) return "¡La ciudad llenó el arca de Joás! Sube a ver las lámparas de oro en la escalinata del templo.";
  if (v.aportado <= 0) return "Pusieron un arca a la puerta del templo: cada uno echa su gozo hasta llenarla, como en los días del rey Joás.";
  const quedan = temporadaDe().diasRestantes;
  return `El arca de Joás, arriba de la escalinata, ya lleva ${v.aportado.toLocaleString("es")} de ${v.meta.toLocaleString("es")} de gozo. ¡Faltan ${quedan} ${quedan === 1 ? "día" : "días"}!`;
}

async function estadoArca(ch: PersonajeFila, admin: boolean): Promise<ArcaEstado> {
  const t = temporadaDe();
  await asegurarArca(t.n);
  const [{ rows: a }, { rows: yo }, { rows: n }, { rows: libro }, { rows: ant }, { rows: g }] = await Promise.all([
    pool.query(`SELECT * FROM game_arca WHERE temporada = $1`, [t.n]),
    pool.query(
      `SELECT COALESCE(sum(gozo) FILTER (WHERE dia = $3), 0)::int AS hoy, COALESCE(sum(gozo), 0)::int AS mio FROM game_arca_aportes WHERE temporada = $1 AND titular = $2`,
      [t.n, ch.casa, diaClave()],
    ),
    pool.query(`SELECT count(DISTINCT titular)::int AS n FROM game_arca_aportes WHERE temporada = $1`, [t.n]),
    pool.query(
      `SELECT a.titular, sum(a.gozo)::int AS gozo, c.name, c.user_id, u.display_name, u.username,
              (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual
         FROM game_arca_aportes a JOIN game_characters c ON c.id = a.titular JOIN users u ON u.id = c.user_id
        WHERE a.temporada = $1 AND u.is_active IS NOT FALSE
          AND NOT EXISTS (SELECT 1 FROM user_blocks b WHERE (b.blocker_id = $2 AND b.blocked_id = c.user_id) OR (b.blocker_id = c.user_id AND b.blocked_id = $2))
        GROUP BY a.titular, c.name, c.user_id, c.game, u.display_name, u.username
        ORDER BY gozo DESC, min(a.created_at) ASC LIMIT $3`,
      [t.n, ch.user_id, NOMBRES_EN_EL_LIBRO],
    ),
    pool.query(`SELECT * FROM game_arca WHERE temporada < $1 ORDER BY temporada DESC LIMIT 4`, [t.n]),
    pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]),
  ]);
  const r = a[0] ?? { temporada: t.n, aportado: 0, meta: metaDelArca(0), llena_at: null, causa: null };
  const hoy = Number(yo[0]?.hoy || 0);
  return {
    ...vista(r),
    quedanDias: t.diasRestantes,
    hoy,
    quedaHoy: Math.max(0, ARCA_MAXIMO_DIA - hoy),
    mio: Number(yo[0]?.mio || 0),
    gozo: Number(g[0]?.gozo || 0),
    dadores: Number(n[0]?.n || 0),
    libro: libro.map((x) => ({ nombre: nombreDe({ ...x, name: x.actual ?? x.name }), gozo: Number(x.gozo), esMio: Number(x.titular) === ch.casa })),
    causa: typeof r.causa === "string" && r.causa.trim() ? r.causa.trim() : null,
    anteriores: ant.map(vista),
    admin,
  };
}

export function registerArcaRoutes(app: Express) {
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

  app.get("/api/jerusalen/arca", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoArca(ch, esAdmin(req)));
    } catch (err) {
      console.error("[arca] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // echar gozo en el arca: { gozo }
  app.post("/api/jerusalen/arca/dar", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const pide = Math.floor(Number(req.body?.gozo));
    if (!Number.isInteger(pide) || pide < 1) return res.status(400).json({ message: `Echa al menos ${ARCA_MINIMO} de gozo.` });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const t = temporadaDe().n;
      await asegurarArca(t);
      const client = await pool.connect();
      let out: { status: number; message?: string; dado?: number; llena?: boolean; vista?: ArcaVista };
      try {
        await client.query("BEGIN");
        const { rows: a } = await client.query(`SELECT * FROM game_arca WHERE temporada = $1 FOR UPDATE`, [t]);
        const arca = a[0];
        const { rows: h } = await client.query(`SELECT COALESCE(sum(gozo), 0)::int AS hoy FROM game_arca_aportes WHERE temporada = $1 AND titular = $2 AND dia = $3`, [t, ch.casa, diaClave()]);
        const { rows: g } = await client.query(`SELECT gozo FROM game_characters WHERE id = $1 FOR UPDATE`, [ch.casa]);
        const falta = Math.max(0, Number(arca?.meta || 0) - Number(arca?.aportado || 0));
        const quedaHoy = Math.max(0, ARCA_MAXIMO_DIA - Number(h[0]?.hoy || 0));
        const gozo = Number(g[0]?.gozo || 0);
        // lo mínimo es 10 (o lo que falte, si falta menos)
        const minimo = Math.min(ARCA_MINIMO, falta);
        const n = cuantoSeEcha(pide, { falta, quedaHoy, gozo });
        if (!arca || arca.llena_at || falta <= 0) out = { status: 409, message: "¡El arca ya está llena! Gracias: en la próxima temporada habrá otra." };
        else if (pide < minimo) out = { status: 400, message: `Echa al menos ${minimo} de gozo.` };
        else if (quedaHoy < minimo) out = { status: 409, message: `Hoy ya echaste ${ARCA_MAXIMO_DIA} de gozo en el arca: mañana puedes dar más. Así el arca es de todos.` };
        else if (gozo < minimo || n < minimo) out = { status: 409, message: `Te falta gozo: tienes ${gozo}.` };
        else {
          await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1`, [ch.casa, n]);
          await client.query(`INSERT INTO game_arca_aportes (temporada, titular, gozo, dia) VALUES ($1, $2, $3, $4)`, [t, ch.casa, n, diaClave()]);
          const { rows: u } = await client.query(
            `UPDATE game_arca SET aportado = aportado + $2, llena_at = CASE WHEN aportado + $2 >= meta THEN now() ELSE NULL END WHERE temporada = $1 RETURNING *`,
            [t, n],
          );
          out = { status: 200, dado: n, llena: !!u[0]?.llena_at, vista: vista(u[0]) };
        }
        if (out.status === 200) await client.query("COMMIT");
        else await client.query("ROLLBACK");
      } catch (e) {
        await client.query("ROLLBACK").catch(() => null);
        throw e;
      } finally {
        client.release();
      }
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      anotarGasto("arca", out.dado!);
      await sumarALaCopa(ch.id, "arca", out.dado! / 10).catch(() => null);
      cache = null;
      if (out.llena && out.vista) {
        // ¡la ciudad llenó el arca! a todos los que están en la ciudad, para celebrarlo
        difundirATodos(() => ({ t: "arca", arca: out.vista! }));
        await evento(ch.user_id, `arca:${t}`, "echó la última ofrenda en el arca de Joás: ¡la ciudad la llenó!").catch(() => null);
      }
      res.json({ ...(await estadoArca(ch, esAdmin(req))), dado: out.dado, llenaAhora: !!out.llena });
    } catch (err) {
      console.error("[arca] dar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // la causa real del arca de esta temporada (solo la administración): { causa } (vacía la quita)
  app.post("/api/jerusalen/admin/arca", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      if (!esAdmin(req)) return res.sendStatus(403);
      const causa = typeof req.body?.causa === "string" ? req.body.causa.trim().slice(0, 300) : "";
      const t = temporadaDe().n;
      await asegurarArca(t);
      await pool.query(`UPDATE game_arca SET causa = $2 WHERE temporada = $1`, [t, causa || null]);
      const ch = await personajeDe(req.user!.id);
      res.json(ch ? await estadoArca(ch, true) : { ok: true });
    } catch (err) {
      console.error("[arca] causa:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
