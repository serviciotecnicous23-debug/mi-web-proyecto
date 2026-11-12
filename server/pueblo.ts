/**
 * Las casas del pueblo y sus pedidos (shared/pueblo.ts): cada día, una o dos familias del pueblo que viven en las
 * parcelas libres de un barrio piden harina, aceite o un cordero, y los vecinos les dan de su alfolí. Quien ayuda
 * gana gozo (con el mismo tope del día que la ayuda a los vecinos), cumple su encargo de ayudar y suma para la copa
 * de su barrio. Al completar un pedido, la familia da las gracias en el tablero del barrio.
 *
 * Qué familia pide y cuánto se calcula igual para todos (shared/pueblo.ts); aquí se guarda lo recibido y quién dio.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, personajeDe, type PersonajeFila } from "./jerusalen";
import { casasDelBarrio, enFilaCasa, leerBienes, recoger } from "./ciudad";
import { avanzarMision } from "./misiones";
import { sumarGozo } from "./gozo";
import { sumarALaCopa } from "./barrio-juntos";
import { AYUDA_GOZO, AYUDA_GOZO_DIA } from "@shared/ayuda";
import { CASAS_POR_BARRIO } from "@shared/ciudad";
import { GOZO_PUEBLO, PEDIDOS_PUEBLO, PUEBLO_MAX, casaDelPueblo, pedidosDelPuebloHoy, type PedidoPuebloVista, type PuebloEstado } from "@shared/pueblo";

export const PUEBLO_SQL = `
CREATE TABLE IF NOT EXISTS "game_pueblo_pedidos" (
  "dia" text NOT NULL,
  "barrio" integer NOT NULL,
  "parcela" integer NOT NULL,
  "recibido" integer NOT NULL DEFAULT 0,
  "done_at" timestamp,
  PRIMARY KEY ("dia", "barrio", "parcela")
);
CREATE TABLE IF NOT EXISTS "game_pueblo_dones" (
  "id" serial PRIMARY KEY,
  "dia" text NOT NULL,
  "barrio" integer NOT NULL,
  "parcela" integer NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "cantidad" integer NOT NULL,
  "gozo" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_game_pueblo_dones_titular" ON "game_pueblo_dones" ("titular", "dia");`;

type Vecino = PersonajeFila & { barrio: number };

/** Las parcelas libres de un barrio (donde viven las familias del pueblo). */
async function libresDe(barrio: number): Promise<number[]> {
  const ocupadas = new Set((await casasDelBarrio(barrio)).map((c) => c.parcela));
  return Array.from({ length: CASAS_POR_BARRIO }, (_, i) => i).filter((p) => !ocupadas.has(p));
}

/** Los pedidos del pueblo de hoy en un barrio, con lo que ya recibieron y lo que dio cada uno. */
async function pedidosDe(barrio: number, titular: number): Promise<PedidoPuebloVista[]> {
  const dia = diaClave();
  const { rows } = await pool.query(`SELECT parcela, recibido, done_at FROM game_pueblo_pedidos WHERE dia = $1 AND barrio = $2`, [dia, barrio]);
  const guardados = new Map(rows.map((r) => [Number(r.parcela), r]));
  // los que ya recibieron algo hoy siguen a la vista aunque cambien las parcelas libres del barrio
  const conAvance = rows.filter((r) => Number(r.recibido) > 0).map((r) => Number(r.parcela));
  const hoy = pedidosDelPuebloHoy(dia, barrio, await libresDe(barrio), conAvance);
  if (!hoy.length) return [];
  const { rows: mios } = await pool.query(
    `SELECT parcela, COALESCE(sum(cantidad), 0)::int AS n FROM game_pueblo_dones WHERE dia = $1 AND barrio = $2 AND titular = $3 GROUP BY parcela`,
    [dia, barrio, titular],
  );
  const mio = new Map(mios.map((r) => [Number(r.parcela), Number(r.n)]));
  return hoy.map((p) => {
    const def = PEDIDOS_PUEBLO[p.def];
    const g = guardados.get(p.parcela);
    return {
      parcela: p.parcela,
      familia: p.familia,
      bien: def.bien,
      texto: def.texto,
      gracias: def.gracias,
      verso: def.verso,
      cantidad: p.cantidad,
      recibido: Math.min(p.cantidad, Number(g?.recibido || 0)),
      cumplido: !!g?.done_at,
      miAporte: mio.get(p.parcela) ?? 0,
    };
  });
}

/** El gozo que ya ganó hoy ayudando (a vecinos y al pueblo: el mismo tope). */
async function gozoDeAyudaHoy(titular: number): Promise<number> {
  const dia = diaClave();
  const { rows } = await pool.query(
    `SELECT (SELECT COALESCE(sum(gozo), 0) FROM game_help_gifts WHERE donor_character_id = $1 AND day_key = $2)
          + (SELECT COALESCE(sum(gozo), 0) FROM game_pueblo_dones WHERE titular = $1 AND dia = $2) AS g`,
    [titular, dia],
  );
  return Number(rows[0]?.g || 0);
}

export function registerPuebloRoutes(app: Express) {
  async function vecino(req: Request, res: Response): Promise<Vecino | null> {
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
    const { rows } = await pool.query(`SELECT barrio FROM game_houses WHERE character_id = $1`, [ch.casa]);
    if (!rows.length) {
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa." });
      return null;
    }
    return { ...ch, barrio: Number(rows[0].barrio) };
  }

  async function estado(v: Vecino): Promise<PuebloEstado> {
    const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [v.casa]);
    const b = leerBienes(rows[0]?.goods);
    return {
      pedidos: await pedidosDe(v.barrio, v.casa),
      bienes: { harina: Math.floor(b.harina), aceite: Math.floor(b.aceite), corderos: Math.floor(b.corderos) },
      gozoQueda: Math.max(0, AYUDA_GOZO_DIA - (await gozoDeAyudaHoy(v.casa))),
      familias: (await libresDe(v.barrio)).filter((p) => casaDelPueblo(v.barrio, p)).length,
    };
  }

  // Los pedidos del pueblo de hoy en mi barrio (el tablero del barrio).
  app.get("/api/jerusalen/pueblo", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estado(v));
    } catch (err) {
      console.error("[pueblo] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  const ultimo = new Map<number, number>();
  // Dar de mi alfolí a una familia del pueblo de mi barrio.
  app.post("/api/jerusalen/pueblo/:parcela/dar", async (req: Request, res: Response) => {
    try {
      // primero la sesión (como las demás rutas: sin sesión, 401), después lo que se pide
      const v = await vecino(req, res);
      if (!v) return;
      const parcela = Math.floor(Number(req.params.parcela));
      const cantidad = Math.floor(Number(req.body?.cantidad));
      if (!Number.isInteger(parcela) || parcela < 0 || parcela >= CASAS_POR_BARRIO || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > PUEBLO_MAX)
        return res.status(400).json({ message: "Cantidad no válida" });
      const ahora = Date.now();
      if (ahora - (ultimo.get(v.casa) ?? 0) < 800) return res.status(429).json({ message: "Espera un momento" });
      ultimo.set(v.casa, ahora);
      if (ultimo.size > 5000) ultimo.clear();
      const dia = diaClave();
      const p = (await pedidosDe(v.barrio, v.casa)).find((x) => x.parcela === parcela);
      if (!p) return res.status(404).json({ message: "Esa familia no pide nada hoy." });
      // 1) se reserva en el pedido (así dos vecinos no dan de más)
      await pool.query(`INSERT INTO game_pueblo_pedidos (dia, barrio, parcela) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [dia, v.barrio, parcela]);
      const { rows: reserva } = await pool.query(
        `UPDATE game_pueblo_pedidos SET recibido = recibido + $4 WHERE dia = $1 AND barrio = $2 AND parcela = $3 AND done_at IS NULL AND recibido + $4 <= $5 RETURNING recibido`,
        [dia, v.barrio, parcela, cantidad, p.cantidad],
      );
      if (!reserva.length) return res.status(409).json({ message: "Ese pedido ya está cumplido o pide menos de eso." });
      // 2) se descuenta del alfolí de quien da (en su fila)
      await recoger(v.casa);
      const tenia = await enFilaCasa(v.casa, async () => {
        const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [v.casa]);
        const b = leerBienes(rows[0]?.goods);
        if (Math.floor(b[p.bien]) < cantidad) return false;
        b[p.bien] -= cantidad;
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [v.casa, JSON.stringify(b)]);
        return true;
      });
      if (!tenia) {
        await pool.query(`UPDATE game_pueblo_pedidos SET recibido = recibido - $4 WHERE dia = $1 AND barrio = $2 AND parcela = $3`, [dia, v.barrio, parcela, cantidad]);
        return res.status(409).json({ message: "No tienes tanto en tu alfolí." });
      }
      // 3) el gozo (con el tope de la ayuda del día), el encargo de ayudar y la copa del barrio
      const gozo = Math.max(0, Math.min(cantidad * GOZO_PUEBLO * AYUDA_GOZO, AYUDA_GOZO_DIA - (await gozoDeAyudaHoy(v.casa))));
      await pool.query(`INSERT INTO game_pueblo_dones (dia, barrio, parcela, titular, cantidad, gozo) VALUES ($1, $2, $3, $4, $5, $6)`, [dia, v.barrio, parcela, v.casa, cantidad, gozo]);
      if (gozo) await sumarGozo(v.casa, gozo, "pueblo");
      await sumarALaCopa(v.id, "pueblo", cantidad);
      const { rows: cumplido } = await pool.query(
        `UPDATE game_pueblo_pedidos SET done_at = now() WHERE dia = $1 AND barrio = $2 AND parcela = $3 AND done_at IS NULL AND recibido >= $4 RETURNING parcela`,
        [dia, v.barrio, parcela, p.cantidad],
      );
      const misiones = await avanzarMision(v, "ayuda", 1).catch(() => []);
      const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [v.casa]);
      res.json({ ...(await estado(v)), dio: { cantidad, gozo, cumplido: cumplido.length > 0, gracias: cumplido.length ? p.gracias : null }, misiones, gozoTotal: Number(g[0]?.gozo || 0) });
    } catch (err) {
      console.error("[pueblo] dar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
