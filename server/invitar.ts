/**
 * Invita a un amigo (shared/invitar.ts): el código de cada persona, usarlo (cuenta nueva y aprobada, en sus primeros 14
 * días) y el premio cuando el amigo juega 3 días distintos. Los días se anotan al entrar a Jerusalén (`diaJugado`, desde
 * server/regreso.ts). El premio se da una sola vez (se marca primero, con `premiado_at IS NULL`).
 */
import type { Express, Request, Response } from "express";
import { randomInt } from "node:crypto";
import { pool } from "./db";
import { nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { avisarA } from "./ciudad-red";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { ALFABETO_CODIGO, INVITAR, LARGO_CODIGO, PRENDA_AMIGO, normalizarCodigo, type InvitarEstado } from "@shared/invitar";

export const INVITAR_SQL = `
CREATE TABLE IF NOT EXISTS "game_invitar_codigos" (
  "user_id" integer PRIMARY KEY,
  "codigo" text NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_invitaciones" (
  "invitado_user" integer PRIMARY KEY,
  "invitador_user" integer NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "premiado_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_invitaciones_invitador" ON "game_invitaciones" ("invitador_user");
CREATE TABLE IF NOT EXISTS "game_dias_jugados" (
  "titular" integer NOT NULL,
  "dia" text NOT NULL,
  PRIMARY KEY ("titular", "dia")
);`;

/** El titular de una cuenta (su primer personaje): guarda la casa, el gozo y los días jugados. */
async function titularDe(userId: number): Promise<number | null> {
  const { rows } = await pool.query(`SELECT MIN(id) AS id FROM game_characters WHERE user_id = $1 AND game = $2`, [userId, JERUSALEN_JUEGO]);
  return rows[0]?.id ? Number(rows[0].id) : null;
}

async function diasDe(userId: number): Promise<number> {
  const { rows } = await pool.query(
    `SELECT count(*)::int AS n FROM game_dias_jugados WHERE titular = (SELECT MIN(id) FROM game_characters WHERE user_id = $1 AND game = $2)`,
    [userId, JERUSALEN_JUEGO],
  );
  return Number(rows[0]?.n || 0);
}

/** El nombre con que juega ahora una cuenta. */
async function nombreDeCuenta(userId: number): Promise<string> {
  const { rows } = await pool.query(
    `SELECT u.display_name, u.username,
            (SELECT c.name FROM game_characters c WHERE c.user_id = u.id AND c.game = $2 ORDER BY c.selected_at DESC NULLS LAST, c.slot LIMIT 1) AS name
       FROM users u WHERE u.id = $1`,
    [userId, JERUSALEN_JUEGO],
  );
  return rows[0] ? nombreDe(rows[0]) : "Un amigo";
}

/** El código de una persona (se crea la primera vez que lo pide). */
async function codigoDe(userId: number): Promise<string> {
  const { rows } = await pool.query(`SELECT codigo FROM game_invitar_codigos WHERE user_id = $1`, [userId]);
  if (rows[0]) return String(rows[0].codigo);
  for (let i = 0; i < 8; i++) {
    const codigo = Array.from({ length: LARGO_CODIGO }, () => ALFABETO_CODIGO[randomInt(ALFABETO_CODIGO.length)]).join("");
    const { rows: r } = await pool.query(`INSERT INTO game_invitar_codigos (user_id, codigo) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING codigo`, [userId, codigo]);
    if (r[0]) return String(r[0].codigo);
    const { rows: ya } = await pool.query(`SELECT codigo FROM game_invitar_codigos WHERE user_id = $1`, [userId]);
    if (ya[0]) return String(ya[0].codigo);
  }
  throw new Error("no se pudo crear el código");
}

/** La prenda al armario (una sola vez). */
async function darPrenda(titular: number) {
  await pool.query(`UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`, [titular, PRENDA_AMIGO.id]);
}

/**
 * Si el invitado ya jugó sus 3 días, el premio para los dos (una sola vez): el amigo gana gozo y la faja; quien lo invitó,
 * gozo (si no pasó de `maxPremiados`) y la faja. A los dos les llega el aviso en vivo.
 */
export async function revisarPremio(invitadoUser: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT invitador_user FROM game_invitaciones WHERE invitado_user = $1 AND premiado_at IS NULL`, [invitadoUser]);
  if (!rows[0]) return false;
  if ((await diasDe(invitadoUser)) < INVITAR.dias) return false;
  const { rows: m } = await pool.query(`UPDATE game_invitaciones SET premiado_at = now() WHERE invitado_user = $1 AND premiado_at IS NULL RETURNING invitador_user`, [invitadoUser]);
  if (!m[0]) return false;
  const invitador = Number(m[0].invitador_user);
  const [tInvitado, tInvitador, nInvitado, nInvitador, { rows: c }] = await Promise.all([
    titularDe(invitadoUser),
    titularDe(invitador),
    nombreDeCuenta(invitadoUser),
    nombreDeCuenta(invitador),
    pool.query(`SELECT count(*)::int AS n FROM game_invitaciones WHERE invitador_user = $1 AND premiado_at IS NOT NULL`, [invitador]),
  ]);
  if (tInvitado) {
    await sumarGozo(tInvitado, INVITAR.gozoInvitado, "invitar");
    await darPrenda(tInvitado);
    avisarA(invitadoUser, { t: "amigo", nombre: nInvitador, gozo: INVITAR.gozoInvitado });
  }
  if (tInvitador) {
    const conGozo = Number(c[0]?.n || 0) <= INVITAR.maxPremiados;
    if (conGozo) await sumarGozo(tInvitador, INVITAR.gozoQuienInvita, "invitar");
    await darPrenda(tInvitador);
    avisarA(invitador, { t: "amigo", nombre: nInvitado, gozo: conGozo ? INVITAR.gozoQuienInvita : 0 });
  }
  return true;
}

/** Un día jugado en Jerusalén (desde la visita de server/regreso.ts): si es nuevo, se mira si toca el premio del amigo. */
export async function diaJugado(titular: number, userId: number, hoy: string): Promise<void> {
  const { rows } = await pool.query(`INSERT INTO game_dias_jugados (titular, dia) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING 1`, [titular, hoy]);
  if (rows.length) await revisarPremio(userId);
}

/** Si alguna vez invitó a un amigo que jugó sus 3 días (el título «Buen amigo»). */
export async function esBuenAmigo(userId: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT 1 FROM game_invitaciones WHERE invitador_user = $1 AND premiado_at IS NOT NULL LIMIT 1`, [userId]);
  return rows.length > 0;
}

/** Si todavía puede usar un código (y si no, por qué). */
async function puedeUsar(userId: number): Promise<string | null> {
  const [{ rows: ya }, { rows: u }] = await Promise.all([
    pool.query(`SELECT 1 FROM game_invitaciones WHERE invitado_user = $1`, [userId]),
    pool.query(`SELECT EXTRACT(EPOCH FROM (now() - created_at))::int AS s FROM users WHERE id = $1`, [userId]),
  ]);
  if (ya.length) return "Ya entraste con la invitación de un amigo.";
  const s = Number(u[0]?.s ?? 0);
  if (s > INVITAR.diasParaUsar * 86400) return `Los códigos son para las cuentas nuevas (los primeros ${INVITAR.diasParaUsar} días).`;
  return null;
}

async function estadoInvitar(ch: PersonajeFila): Promise<InvitarEstado> {
  const [codigo, { rows: inv }, { rows: me }, motivo] = await Promise.all([
    codigoDe(ch.user_id),
    pool.query(
      `SELECT i.invitado_user, i.created_at, i.premiado_at, u.display_name, u.username,
              (SELECT c.name FROM game_characters c WHERE c.user_id = u.id AND c.game = $2 ORDER BY c.selected_at DESC NULLS LAST, c.slot LIMIT 1) AS name,
              (SELECT count(*)::int FROM game_dias_jugados d WHERE d.titular = (SELECT MIN(c2.id) FROM game_characters c2 WHERE c2.user_id = u.id AND c2.game = $2)) AS dias
         FROM game_invitaciones i JOIN users u ON u.id = i.invitado_user
        WHERE i.invitador_user = $1 AND u.is_active IS NOT FALSE
        ORDER BY i.created_at DESC LIMIT 30`,
      [ch.user_id, JERUSALEN_JUEGO],
    ),
    pool.query(`SELECT invitador_user, premiado_at FROM game_invitaciones WHERE invitado_user = $1`, [ch.user_id]),
    puedeUsar(ch.user_id),
  ]);
  return {
    codigo,
    invitados: inv.map((r) => ({ nombre: nombreDe(r), dias: Math.min(INVITAR.dias, Number(r.dias || 0)), premiado: !!r.premiado_at, cuando: new Date(r.created_at).toISOString() })),
    premiados: inv.filter((r) => r.premiado_at).length,
    meInvito: me[0] ? { nombre: await nombreDeCuenta(Number(me[0].invitador_user)), dias: Math.min(INVITAR.dias, await diasDe(ch.user_id)), premiado: !!me[0].premiado_at } : null,
    puedeUsar: !motivo,
    motivo,
  };
}

export function registerInvitarRoutes(app: Express) {
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
  const frenar = (id: number, ms = 800) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  app.get("/api/jerusalen/invitar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      // por si ya jugó sus días y el premio no salió (lo mira para el invitado: sale una sola vez)
      await revisarPremio(ch.user_id).catch(() => false);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoInvitar(ch));
    } catch (err) {
      console.error("[invitar] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // usar el código de quien me invitó: { codigo }
  app.post("/api/jerusalen/invitar/usar", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const codigo = normalizarCodigo(req.body?.codigo);
    if (!codigo) return res.status(400).json({ message: "Ese código no está bien escrito: son 6 letras y números." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.user_id)) return res.status(429).json({ message: "Espera un momento" });
      const motivo = await puedeUsar(ch.user_id);
      if (motivo) return res.status(409).json({ message: motivo });
      const { rows } = await pool.query(
        `SELECT k.user_id, u.is_active FROM game_invitar_codigos k JOIN users u ON u.id = k.user_id WHERE k.codigo = $1`,
        [codigo],
      );
      if (!rows[0] || rows[0].is_active === false) return res.status(404).json({ message: "No encontramos ese código." });
      const invitador = Number(rows[0].user_id);
      if (invitador === ch.user_id) return res.status(400).json({ message: "Ese es tu propio código: compártelo con un amigo." });
      const { rows: b } = await pool.query(
        `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1) LIMIT 1`,
        [ch.user_id, invitador],
      );
      if (b.length) return res.status(403).json({ message: "No puedes usar ese código." });
      // dos amigos no se invitan el uno al otro (cada uno cobraría dos veces)
      const { rows: vuelta } = await pool.query(`SELECT 1 FROM game_invitaciones WHERE invitado_user = $1 AND invitador_user = $2`, [invitador, ch.user_id]);
      if (vuelta.length) return res.status(409).json({ message: "Tú invitaste a esa persona: no pueden invitarse el uno al otro." });
      const { rows: ok } = await pool.query(
        `INSERT INTO game_invitaciones (invitado_user, invitador_user) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING 1`,
        [ch.user_id, invitador],
      );
      if (!ok.length) return res.status(409).json({ message: "Ya entraste con la invitación de un amigo." });
      // si ya jugó sus 3 días, el premio sale enseguida
      await revisarPremio(ch.user_id).catch(() => false);
      res.json({ ...(await estadoInvitar(ch)), usado: await nombreDeCuenta(invitador) });
    } catch (err) {
      console.error("[invitar] usar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
