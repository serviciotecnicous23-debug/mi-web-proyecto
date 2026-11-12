/**
 * La racha de servicio de Jerusalén en línea (reglas en shared/racha.ts). La lleva el servidor por persona (su
 * titular, el primer personaje): se marca cuando cumple un encargo del día (server/misiones.ts) o termina el
 * recado de la calle de los siervos (server/personajes.ts). Cada día de racha da su gozo una sola vez.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, personajeDe } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { HITOS_RACHA, diaDespues, esReposo, gozoDeRacha, pasoDeRacha, rachaViva, type RachaVista } from "@shared/racha";
import { personajeCiudad, recadoDelDia } from "@shared/personajes";

export const RACHA_SQL = `
CREATE TABLE IF NOT EXISTS "game_racha" (
  "titular" integer PRIMARY KEY,
  "actual" integer NOT NULL DEFAULT 0,
  "mejor" integer NOT NULL DEFAULT 0,
  "ultimo" text,
  "total" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp NOT NULL DEFAULT now()
);`;

/** El titular de la persona (su primer personaje): guarda su casa, su gozo y su racha. */
export async function titularDe(characterId: number): Promise<number> {
  const { rows } = await pool.query(
    `SELECT MIN(c2.id) AS t FROM game_characters c2 JOIN game_characters c ON c.user_id = c2.user_id AND c.game = c2.game WHERE c.id = $1`,
    [characterId],
  );
  return Number(rows[0]?.t ?? characterId);
}

export type RachaMarcada = { actual: number; gozo: number; hito: { dias: number; gozo: number; titulo: string } | null };

/** Marca que hoy sirvió. Devuelve el día de racha que se sumó (con su gozo, ya dado) o null si hoy ya contaba. */
export async function marcarServicio(characterId: number): Promise<RachaMarcada | null> {
  const titular = await titularDe(characterId);
  const hoy = diaClave();
  const { rows } = await pool.query(`SELECT actual, ultimo FROM game_racha WHERE titular = $1`, [titular]);
  const ultimo: string | null = rows[0]?.ultimo ?? null;
  const paso = pasoDeRacha(ultimo, hoy);
  if (paso === "igual") return null;
  const actual = paso === "sigue" ? Number(rows[0]?.actual ?? 0) + 1 : 1;
  // una sola fila por persona: si dos encargos se cumplen a la vez, solo uno suma el día
  const { rows: hecho } = await pool.query(
    `INSERT INTO game_racha (titular, actual, mejor, ultimo, total) VALUES ($1, $2, $2, $3, 1)
     ON CONFLICT (titular) DO UPDATE SET actual = $2, mejor = GREATEST(game_racha.mejor, $2), ultimo = $3, total = game_racha.total + 1, updated_at = now()
       WHERE game_racha.ultimo IS DISTINCT FROM $3
     RETURNING actual`,
    [titular, actual, hoy],
  );
  if (!hecho.length) return null;
  const hito = HITOS_RACHA.find((h) => h.dias === actual) ?? null;
  const gozo = gozoDeRacha(actual) + (hito?.gozo ?? 0);
  await sumarGozo(titular, gozo, "racha");
  return { actual, gozo, hito };
}

/** El aviso del día de racha (va con los encargos cumplidos: la pantalla lo muestra con su gozo). */
export function avisoDeRacha(r: RachaMarcada): { titulo: string; premio: number; gozo: number } {
  const dias = `${r.actual} ${r.actual === 1 ? "día" : "días"}`;
  return { titulo: r.hito ? `🔥 ${r.hito.titulo} Racha de servicio: ${dias}` : `🔥 Racha de servicio: ${dias}`, premio: 0, gozo: r.gozo };
}

export async function rachaVista(characterId: number): Promise<RachaVista> {
  const titular = await titularDe(characterId);
  const hoy = diaClave();
  const { rows } = await pool.query(`SELECT actual, mejor, ultimo FROM game_racha WHERE titular = $1`, [titular]);
  const ultimo: string | null = rows[0]?.ultimo ?? null;
  const actual = rachaViva(ultimo, hoy) ? Number(rows[0]?.actual ?? 0) : 0;
  const hoyServido = ultimo === hoy;
  const reposoHoy = esReposo(hoy);
  const manana = recadoDelDia(diaDespues(hoy), titular);
  return {
    actual,
    mejor: Number(rows[0]?.mejor ?? 0),
    hoy: hoyServido,
    reposoHoy,
    enPeligro: actual > 0 && !hoyServido && !reposoHoy,
    gozoSiguiente: gozoDeRacha(actual + 1),
    proximoHito: HITOS_RACHA.find((h) => h.dias > actual) ?? null,
    manana: { quien: personajeCiudad(manana.cadena[0])?.nombre ?? "", recado: manana.titulo },
  };
}

export function registerRachaRoutes(app: Express) {
  app.get("/api/jerusalen/racha", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      const ch = await personajeDe(req.user!.id);
      if (!ch) return res.status(404).json({ message: "Primero crea tu personaje." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await rachaVista(ch.id));
    } catch (err) {
      console.error("[racha] vista:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
