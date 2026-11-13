/**
 * Los dichos de los ancianos (shared/dichos.ts): cada día los ancianos de la puerta dicen un dicho, el mismo para
 * todos. Quien se sienta a escucharlo (el servidor mira que esté junto a ellos en la ciudad) lo guarda en su álbum y
 * gana un poco de gozo, una vez por día. Los que falten se los puede enseñar su mentor (server/mentores.ts). Se guardan
 * por persona (en su titular, el primer personaje).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, personajeDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { ubicacionDe } from "./ciudad-red";
import { CERCA_ANCIANOS, DICHOS, GOZO_DICHO, LUGAR_ANCIANOS, dicho, dichoDelDia, leerDichos, type DichoEscuchado, type DichosEstado } from "@shared/dichos";

export const DICHOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_dichos" (
  "titular" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "ids" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "escuchado" text,
  "updated_at" timestamp NOT NULL DEFAULT now()
);`;

/** Los dichos que tiene una persona (por su titular), en el orden de la lista. */
export async function dichosDe(titular: number): Promise<string[]> {
  const { rows } = await pool.query(`SELECT ids FROM game_dichos WHERE titular = $1`, [titular]);
  return leerDichos(rows[0]?.ids);
}

/** Guarda un dicho (si no lo tenía). Devuelve si era nuevo. */
export async function agregarDicho(titular: number, id: string): Promise<boolean> {
  if (!dicho(id)) return false;
  const { rows } = await pool.query(
    `INSERT INTO game_dichos (titular, ids) VALUES ($1, jsonb_build_array($2::text))
     ON CONFLICT (titular) DO UPDATE SET ids = game_dichos.ids || jsonb_build_array($2::text), updated_at = now()
       WHERE NOT (game_dichos.ids @> jsonb_build_array($2::text))
     RETURNING 1`,
    [titular, id],
  );
  return rows.length > 0;
}

async function estadoDichos(titular: number, hoy = diaClave()): Promise<DichosEstado> {
  const { rows } = await pool.query(`SELECT ids, escuchado FROM game_dichos WHERE titular = $1`, [titular]);
  const tengo = leerDichos(rows[0]?.ids);
  const d = dichoDelDia(hoy);
  const escuchado = rows[0]?.escuchado === hoy;
  return { hoy: { id: d.id, tema: d.tema, dicho: escuchado || tengo.includes(d.id) ? d : null }, escuchado, tengo, total: DICHOS.length };
}

export function registerDichosRoutes(app: Express) {
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

  app.get("/api/jerusalen/dichos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDichos(ch.casa));
    } catch (err) {
      console.error("[dichos] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Sentarse con los ancianos a escuchar el dicho de hoy: hay que estar junto a ellos, en la puerta de la ciudad.
  app.post("/api/jerusalen/dichos/escuchar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimo.get(ch.casa) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimo.set(ch.casa, now);
      if (ultimo.size > 5000) ultimo.clear();
      const yo = ubicacionDe(ch.id);
      if (!yo || yo.canal === "templo") return res.status(409).json({ message: "Los ancianos se sientan a la puerta de la ciudad: ve con ellos." });
      if (Math.hypot(yo.x - LUGAR_ANCIANOS[0], yo.z - LUGAR_ANCIANOS[1]) > CERCA_ANCIANOS) return res.status(409).json({ message: "Acércate a los ancianos, a la puerta de la ciudad, para escucharlos." });
      const hoy = diaClave();
      const d = dichoDelDia(hoy);
      // una vez por día: se marca primero (si dos pedidos llegan juntos, solo uno da el gozo)
      const { rows: marca } = await pool.query(
        `INSERT INTO game_dichos (titular, escuchado) VALUES ($1, $2)
         ON CONFLICT (titular) DO UPDATE SET escuchado = $2, updated_at = now() WHERE game_dichos.escuchado IS DISTINCT FROM $2
         RETURNING 1`,
        [ch.casa, hoy],
      );
      const primeraVez = marca.length > 0;
      const nuevo = await agregarDicho(ch.casa, d.id);
      let gozo = 0;
      let gozoTotal: number | null = null;
      if (primeraVez) {
        gozo = GOZO_DICHO;
        await sumarGozo(ch.casa, gozo, "dichos");
        const { rows } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
        gozoTotal = Number(rows[0]?.gozo ?? 0);
      }
      res.json({ ...(await estadoDichos(ch.casa, hoy)), dicho: d, nuevo, gozo, gozoTotal } satisfies DichoEscuchado);
    } catch (err) {
      console.error("[dichos] escuchar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
