/**
 * Los pedidos del barrio (shared/ayuda.ts). Dar mueve bienes de un alfolí a otro: primero se reserva
 * la cantidad en el pedido (para que dos vecinos no den de más), después se descuenta de quien da y
 * se suma a quien pidió, cada casa en su propia fila (nunca una dentro de la otra, para no trabarse).
 * Si a quien pidió no le cabe todo en el alfolí, lo que sobra vuelve a quien dio.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { capacidadAlfoli } from "@shared/ciudad";
import { ventajasDeColumna } from "@shared/obras";
import { AYUDA_GOZO, AYUDA_GOZO_DIA, AYUDA_HORAS, AYUDA_MAX, AYUDA_MIN, type AyudaDada, type AyudaEstado, type BienAyuda, type PedidoVista } from "@shared/ayuda";
import { diaClave, evento, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, recoger } from "./ciudad";
import { avanzarMision } from "./misiones";
import { sumarGozo } from "./gozo";

export const AYUDA_SQL = `
CREATE TABLE IF NOT EXISTS "game_help_requests" (
  "id" serial PRIMARY KEY,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "plot" integer NOT NULL,
  "good" text NOT NULL,
  "amount" integer NOT NULL,
  "received" integer NOT NULL DEFAULT 0,
  "day_key" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "expires_at" timestamp NOT NULL,
  "done_at" timestamp
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_help_request_day" ON "game_help_requests" ("character_id", "day_key");
CREATE INDEX IF NOT EXISTS "idx_help_requests_barrio" ON "game_help_requests" ("barrio", "expires_at");
CREATE TABLE IF NOT EXISTS "game_help_gifts" (
  "id" serial PRIMARY KEY,
  "request_id" integer NOT NULL REFERENCES "game_help_requests"("id") ON DELETE CASCADE,
  "donor_character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "amount" integer NOT NULL,
  "gozo" integer NOT NULL DEFAULT 0,
  "day_key" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_help_gifts_donor" ON "game_help_gifts" ("donor_character_id", "day_key");`;

const BIENES_AYUDA: BienAyuda[] = ["harina", "aceite", "corderos"];
const esBien = (v: unknown): v is BienAyuda => typeof v === "string" && (BIENES_AYUDA as string[]).includes(v);

const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null }) =>
  (r.name && r.name !== "__propio__" ? r.name : null) || r.display_name || r.username || "Un vecino";

async function pedidos(yo: number, where: string, params: unknown[]): Promise<PedidoVista[]> {
  const { rows } = await pool.query(
    `SELECT r.id, r.character_id, r.plot, r.good, r.amount, r.received, r.done_at,
            GREATEST(0, EXTRACT(EPOCH FROM (r.expires_at - now())))::int AS faltan,
            c.name, u.display_name, u.username
       FROM game_help_requests r
       JOIN game_characters c ON c.id = r.character_id
       JOIN users u ON u.id = c.user_id
      WHERE ${where}
      ORDER BY r.created_at ASC
      LIMIT 20`,
    [yo, ...params],
  );
  return rows.map((r) => ({
    id: Number(r.id),
    personajeId: Number(r.character_id),
    nombre: nombreDe(r),
    bien: (esBien(r.good) ? r.good : "harina") as BienAyuda,
    cantidad: Number(r.amount),
    recibido: Number(r.received),
    faltan: Number(r.faltan),
    cumplido: !!r.done_at,
    mio: Number(r.character_id) === yo,
    parcela: Number(r.plot),
  }));
}

export function registerAyudaRoutes(app: Express) {
  async function jugador(req: Request, res: Response): Promise<(PersonajeFila & { barrio: number; plot: number }) | null> {
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
    const { rows } = await pool.query(`SELECT barrio, plot FROM game_houses WHERE character_id = $1`, [ch.casa]);
    if (!rows.length) {
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa." });
      return null;
    }
    return { ...ch, barrio: Number(rows[0].barrio), plot: Number(rows[0].plot) };
  }
  const ultimo = new Map<number, number>();
  const frenar = (id: number, ms = 800) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  // el tope de gozo de ayudar es uno solo: a los vecinos y a las familias del pueblo (server/pueblo.ts)
  async function estado(ch: PersonajeFila & { barrio: number }): Promise<AyudaEstado> {
    const hoy = diaClave();
    const [mios, abiertos, { rows: casa }, { rows: dado }] = await Promise.all([
      pedidos(ch.casa, `r.character_id = $1 AND r.day_key = $2`, [hoy]),
      pedidos(ch.casa, `r.barrio = $2 AND r.character_id <> $1 AND r.done_at IS NULL AND r.expires_at > now()`, [ch.barrio]),
      pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.casa]),
      pool.query(`SELECT ((SELECT COALESCE(sum(gozo), 0) FROM game_help_gifts WHERE donor_character_id = $1 AND day_key = $2) + (SELECT COALESCE(sum(gozo), 0) FROM game_pueblo_dones WHERE titular = $1 AND dia = $2))::int AS g`, [ch.casa, hoy]),
    ]);
    const b = leerBienes(casa[0]?.goods);
    return {
      mio: mios[0] ?? null,
      pedidos: abiertos,
      bienes: { harina: Math.floor(b.harina), aceite: Math.floor(b.aceite), corderos: Math.floor(b.corderos) },
      gozoQueda: Math.max(0, AYUDA_GOZO_DIA - Number(dado[0]?.g || 0)),
    };
  }

  app.get("/api/jerusalen/ayuda", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      await recoger(ch.casa);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estado(ch));
    } catch (err) {
      console.error("[ayuda] estado:", err);
      res.sendStatus(500);
    }
  });

  // pedir ayuda al barrio (una vez por día)
  app.post("/api/jerusalen/ayuda", async (req: Request, res: Response) => {
    const bien = req.body?.bien;
    const cantidad = Math.floor(Number(req.body?.cantidad));
    if (!esBien(bien) || !Number.isInteger(cantidad) || cantidad < AYUDA_MIN || cantidad > AYUDA_MAX) {
      return res.status(400).json({ message: `Pide harina, aceite o corderos, de ${AYUDA_MIN} a ${AYUDA_MAX}.` });
    }
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const { rows } = await pool.query(
        `INSERT INTO game_help_requests (character_id, barrio, plot, good, amount, day_key, expires_at)
         VALUES ($1, $2, $3, $4, $5, $6, now() + ($7 || ' hours')::interval)
         ON CONFLICT (character_id, day_key) DO NOTHING RETURNING id`,
        [ch.casa, ch.barrio, ch.plot, bien, cantidad, diaClave(), String(AYUDA_HORAS)],
      );
      if (!rows.length) return res.status(409).json({ message: "Hoy ya pediste ayuda al barrio. Vuelve mañana." });
      res.json(await estado(ch));
    } catch (err) {
      console.error("[ayuda] pedir:", err);
      res.sendStatus(500);
    }
  });

  // dar de mi alfolí a un pedido del barrio
  app.post("/api/jerusalen/ayuda/:pedido/dar", async (req: Request, res: Response) => {
    const id = Math.floor(Number(req.params.pedido));
    const cantidad = Math.floor(Number(req.body?.cantidad));
    if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > AYUDA_MAX) {
      return res.status(400).json({ message: "Cantidad no válida" });
    }
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const { rows: pr } = await pool.query(`SELECT character_id, barrio FROM game_help_requests WHERE id = $1`, [id]);
      if (!pr.length) return res.status(404).json({ message: "Ese pedido no existe." });
      const quien = Number(pr[0].character_id);
      if (quien === ch.casa) return res.status(409).json({ message: "Es tu propio pedido." });
      if (Number(pr[0].barrio) !== ch.barrio) return res.status(409).json({ message: "Solo se ayuda a los vecinos del propio barrio." });
      // 1) se reserva en el pedido (así dos vecinos no dan de más)
      const { rows: reserva } = await pool.query(
        `UPDATE game_help_requests SET received = received + $2
          WHERE id = $1 AND done_at IS NULL AND expires_at > now() AND received + $2 <= amount
          RETURNING good, amount, received`,
        [id, cantidad],
      );
      if (!reserva.length) return res.status(409).json({ message: "Ese pedido ya está cumplido, venció o pide menos de eso." });
      const bien = (esBien(reserva[0].good) ? reserva[0].good : "harina") as BienAyuda;
      const devolverReserva = (n: number) => pool.query(`UPDATE game_help_requests SET received = received - $2 WHERE id = $1`, [id, n]);
      // 2) se descuenta de quien da (en su fila)
      await recoger(ch.casa);
      const tenia = await enFilaCasa(ch.casa, async () => {
        const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const b = leerBienes(rows[0]?.goods);
        if (Math.floor(b[bien]) < cantidad) return false;
        b[bien] -= cantidad;
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(b)]);
        return true;
      });
      if (!tenia) {
        await devolverReserva(cantidad);
        return res.status(409).json({ message: "No tienes tanto en tu alfolí." });
      }
      // 3) se suma a quien pidió (en su fila), hasta lo que le cabe
      await recoger(quien);
      const entra = await enFilaCasa(quien, async () => {
        const { rows } = await pool.query(`SELECT goods, level, obras FROM game_houses WHERE character_id = $1`, [quien]);
        const b = leerBienes(rows[0]?.goods);
        const cabe = Math.max(0, Math.floor(capacidadAlfoli(Number(rows[0]?.level || 0)) + ventajasDeColumna(rows[0]?.obras).alfoli - b[bien]));
        const n = Math.min(cantidad, cabe);
        if (n > 0) {
          b[bien] += n;
          await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [quien, JSON.stringify(b)]);
        }
        return n;
      });
      // lo que no cupo vuelve a quien dio (y deja de contar en el pedido)
      const sobra = cantidad - entra;
      if (sobra > 0) {
        await enFilaCasa(ch.casa, async () => {
          const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.casa]);
          const b = leerBienes(rows[0]?.goods);
          b[bien] += sobra;
          await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(b)]);
        });
        await devolverReserva(sobra);
      }
      if (entra <= 0) return res.status(409).json({ message: "Al alfolí de tu vecino ya no le cabe más: no se dio nada." });
      // 4) el pedido cumplido, el gozo de quien ayudó (con su tope del día) y su encargo
      const hoy = diaClave();
      const { rows: cumplido } = await pool.query(
        `UPDATE game_help_requests SET done_at = now() WHERE id = $1 AND done_at IS NULL AND received >= amount RETURNING character_id`,
        [id],
      );
      const { rows: dado } = await pool.query(`SELECT ((SELECT COALESCE(sum(gozo), 0) FROM game_help_gifts WHERE donor_character_id = $1 AND day_key = $2) + (SELECT COALESCE(sum(gozo), 0) FROM game_pueblo_dones WHERE titular = $1 AND dia = $2))::int AS g`, [ch.casa, hoy]);
      const gozo = Math.max(0, Math.min(entra * AYUDA_GOZO, AYUDA_GOZO_DIA - Number(dado[0]?.g || 0)));
      await pool.query(`INSERT INTO game_help_gifts (request_id, donor_character_id, amount, gozo, day_key) VALUES ($1, $2, $3, $4, $5)`, [id, ch.casa, entra, gozo, hoy]);
      await sumarGozo(ch.casa, gozo, "ayuda");
      if (cumplido.length) {
        const { rows: u } = await pool.query(`SELECT user_id FROM game_characters WHERE id = $1`, [quien]);
        if (u[0]) await evento(Number(u[0].user_id), `ayuda:${id}`, "recibió la ayuda de su barrio para su ofrenda en Jerusalén en línea").catch(() => null);
      }
      const misiones = await avanzarMision(ch, "ayuda", 1).catch(() => []);
      const out: AyudaDada = { dado: entra, gozo, cumplido: cumplido.length > 0, estado: await estado(ch), ...(misiones.length ? { misiones } : {}) };
      res.json(out);
    } catch (err) {
      console.error("[ayuda] dar:", err);
      res.sendStatus(500);
    }
  });
}
