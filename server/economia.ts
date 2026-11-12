/**
 * La economía de Jerusalén en línea (shared/economia.ts): los puestos de los vecinos, el diezmo, el
 * tesoro del templo (la provisión para los nuevos y los premios de las casas más bendecidas) y lo que
 * el mercader ya compró en el día. Todo se cuenta en la base: nada se simula en el servidor.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { capacidadAlfoli } from "@shared/ciudad";
import { ventajasDeColumna } from "@shared/obras";
import { ventajasDeBarrio } from "./barrio-obras";
import { BIEN_MERCADO_NOMBRE, type BienMercado } from "@shared/mercado";
import {
  PREMIO_CASAS, PROVISION, PUESTOS_MAX, PUESTO_CANTIDAD_MAX, PUESTO_HORAS, diezmoDe, rangoPrecio, precioMercaderHoy, type PuestoVista, type PuestosEstado,
  type TesoroEstado, type VentaNueva,
} from "@shared/economia";
import { diaClave, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, recoger } from "./ciudad";
import { anotarGasto, sumarGozo } from "./gozo";
import { semanaClave } from "./misiones";
import { precioVentaHoy } from "@shared/mercado";

export const ECONOMIA_SQL = `
CREATE TABLE IF NOT EXISTS "game_treasury" (
  "id" integer PRIMARY KEY,
  "balance" bigint NOT NULL DEFAULT 0,
  "total_in" bigint NOT NULL DEFAULT 0,
  "total_out" bigint NOT NULL DEFAULT 0
);
INSERT INTO "game_treasury" ("id") VALUES (1) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS "game_treasury_log" (
  "id" serial PRIMARY KEY,
  "kind" text NOT NULL,
  "character_id" integer,
  "amount" integer NOT NULL,
  "note" text,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_market_listings" (
  "id" serial PRIMARY KEY,
  "seller_character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "good" text NOT NULL,
  "quantity" integer NOT NULL,
  "price" integer NOT NULL,
  "sold" integer NOT NULL DEFAULT 0,
  "notified" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "expires_at" timestamp NOT NULL,
  "closed_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_market_listings_open" ON "game_market_listings" ("closed_at", "good", "price");
CREATE INDEX IF NOT EXISTS "idx_market_listings_seller" ON "game_market_listings" ("seller_character_id", "closed_at");
CREATE TABLE IF NOT EXISTS "game_market_daily" (
  "day_key" text NOT NULL,
  "good" text NOT NULL,
  "sold" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("day_key", "good")
);
CREATE TABLE IF NOT EXISTS "game_provision" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "day_key" text NOT NULL,
  "amount" integer NOT NULL,
  PRIMARY KEY ("character_id", "day_key")
);
CREATE TABLE IF NOT EXISTS "game_house_awards" (
  "week_key" text PRIMARY KEY,
  "paid_at" timestamp NOT NULL DEFAULT now()
);`;

const BIENES: BienMercado[] = ["harina", "aceite", "corderos"];
const esBien = (v: unknown): v is BienMercado => typeof v === "string" && (BIENES as string[]).includes(v);

// ---------------------------------------------------------------- el tesoro del templo
/** Algo entra al tesoro (el diezmo). */
export async function alTesoro(kind: string, characterId: number | null, amount: number, note: string) {
  const n = Math.floor(amount);
  if (n <= 0) return;
  await pool.query(`UPDATE game_treasury SET balance = balance + $1, total_in = total_in + $1 WHERE id = 1`, [n]);
  await pool.query(`INSERT INTO game_treasury_log (kind, character_id, amount, note) VALUES ($1, $2, $3, $4)`, [kind, characterId, n, note]);
}

/** Sale del tesoro (todo o nada): true si había. */
export async function delTesoro(kind: string, characterId: number | null, amount: number, note: string): Promise<boolean> {
  const n = Math.floor(amount);
  if (n <= 0) return true;
  const { rows } = await pool.query(`UPDATE game_treasury SET balance = balance - $1, total_out = total_out + $1 WHERE id = 1 AND balance >= $1 RETURNING balance`, [n]);
  if (!rows.length) return false;
  await pool.query(`INSERT INTO game_treasury_log (kind, character_id, amount, note) VALUES ($1, $2, $3, $4)`, [kind, characterId, -n, note]);
  return true;
}

async function saldoTesoro(): Promise<{ balance: number; entro: number; salio: number }> {
  const { rows } = await pool.query(`SELECT balance, total_in, total_out FROM game_treasury WHERE id = 1`);
  return { balance: Number(rows[0]?.balance || 0), entro: Number(rows[0]?.total_in || 0), salio: Number(rows[0]?.total_out || 0) };
}

// ---------------------------------------------------------------- lo que el mercader compró hoy
export async function vendidosHoy(): Promise<Record<BienMercado, number>> {
  const { rows } = await pool.query(`SELECT good, sold FROM game_market_daily WHERE day_key = $1`, [diaClave()]);
  const out: Record<BienMercado, number> = { harina: 0, aceite: 0, corderos: 0 };
  for (const r of rows) {
    const g: unknown = r.good;
    if (esBien(g)) out[g] = Number(r.sold || 0);
  }
  return out;
}

export async function contarVentaMercader(b: BienMercado, n: number) {
  if (n <= 0) return;
  await pool.query(
    `INSERT INTO game_market_daily (day_key, good, sold) VALUES ($1, $2, $3) ON CONFLICT (day_key, good) DO UPDATE SET sold = game_market_daily.sold + $3`,
    [diaClave(), b, n],
  );
}

/** Lo que paga hoy el mercader por cada cosa (el doble de lo buscado, menos lo ya comprado en la ciudad). */
export async function preciosMercaderHoy(): Promise<Record<BienMercado, number>> {
  const v = await vendidosHoy();
  const dia = diaClave();
  return { harina: precioMercaderHoy(precioVentaHoy("harina", dia), v.harina), aceite: precioMercaderHoy(precioVentaHoy("aceite", dia), v.aceite), corderos: precioMercaderHoy(precioVentaHoy("corderos", dia), v.corderos) };
}

// ---------------------------------------------------------------- los puestos
/** Cierra los puestos vencidos y devuelve lo que quedó a sus dueños. */
async function cerrarVencidos() {
  const { rows } = await pool.query(
    `UPDATE game_market_listings SET closed_at = now() WHERE closed_at IS NULL AND expires_at <= now() RETURNING seller_character_id, good, quantity`,
  );
  for (const r of rows) if (Number(r.quantity) > 0 && esBien(r.good)) await devolver(Number(r.seller_character_id), r.good, Number(r.quantity));
}

/** Vuelve al alfolí lo que no se vendió (aunque se pase de su capacidad: era suyo). */
async function devolver(characterId: number, b: BienMercado, n: number) {
  await enFilaCasa(characterId, async () => {
    const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [characterId]);
    const bienes = leerBienes(rows[0]?.goods);
    bienes[b] += n;
    await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [characterId, JSON.stringify(bienes)]);
  });
}

function vista(r: Record<string, unknown>, yo: number): PuestoVista {
  return {
    id: Number(r.id),
    vendedor: String(r.vendedor || "Un vecino"),
    vendedorId: Number(r.seller_character_id),
    bien: r.good as BienMercado,
    cantidad: Number(r.quantity),
    precio: Number(r.price),
    quedan: Math.max(0, Math.floor(Number(r.quedan) || 0)),
    mio: Number(r.seller_character_id) === yo,
  };
}

async function estadoPuestos(ch: PersonajeFila): Promise<PuestosEstado> {
  const nombreSql = `COALESCE(c.name, NULLIF(u.display_name, ''), u.username)`;
  const [{ rows: abiertos }, { rows: mios }, { rows: nuevas }, { rows: c }, { rows: h }, tesoro, mercader] = await Promise.all([
    pool.query(
      `SELECT l.*, ${nombreSql} AS vendedor, EXTRACT(EPOCH FROM (l.expires_at - now()))::int AS quedan FROM game_market_listings l
         JOIN game_characters c ON c.id = l.seller_character_id JOIN users u ON u.id = c.user_id
        WHERE l.closed_at IS NULL AND l.expires_at > now() AND l.seller_character_id <> $1 AND u.is_active = true
        ORDER BY l.good, l.price, l.created_at LIMIT 60`,
      [ch.casa],
    ),
    pool.query(
      `SELECT l.*, ${nombreSql} AS vendedor, EXTRACT(EPOCH FROM (l.expires_at - now()))::int AS quedan FROM game_market_listings l
         JOIN game_characters c ON c.id = l.seller_character_id JOIN users u ON u.id = c.user_id
        WHERE l.closed_at IS NULL AND l.seller_character_id = $1 ORDER BY l.created_at`,
      [ch.casa],
    ),
    // lo vendido desde el último aviso (se calcula con lo de antes y queda marcado como avisado)
    pool.query(
      `UPDATE game_market_listings l SET notified = l.sold
         FROM (SELECT id, sold - notified AS n FROM game_market_listings WHERE seller_character_id = $1 AND sold > notified) v
        WHERE l.id = v.id
        RETURNING l.good, v.n, l.price`,
      [ch.casa],
    ),
    pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]),
    pool.query(`SELECT level, goods, obras, barrio FROM game_houses WHERE character_id = $1`, [ch.casa]),
    saldoTesoro(),
    preciosMercaderHoy(),
  ]);
  const bienes = leerBienes(h[0]?.goods);
  const cap = capacidadAlfoli(Number(h[0]?.level || 0)) + ventajasDeColumna(h[0]?.obras).alfoli + (await ventajasDeBarrio(Number(h[0]?.barrio || 0))).alfoli;
  const ventasNuevas: VentaNueva[] = nuevas
    .filter((r) => esBien(r.good))
    .map((r) => {
      const total = Number(r.n) * Number(r.price);
      const diezmo = diezmoDe(total);
      return { bien: r.good as BienMercado, cantidad: Number(r.n), ganado: total - diezmo, diezmo };
    });
  const precios = Object.fromEntries(BIENES.map((b) => [b, { ...rangoPrecio(b), mercader: mercader[b] }])) as PuestosEstado["precios"];
  return {
    abiertos: abiertos.map((r) => vista(r, ch.casa)),
    mios: mios.map((r) => vista(r, ch.casa)),
    ventasNuevas,
    gozo: Number(c[0]?.gozo || 0),
    bienes: { harina: Math.floor(bienes.harina), aceite: Math.floor(bienes.aceite), corderos: Math.floor(bienes.corderos) },
    libre: { harina: Math.max(0, cap - Math.floor(bienes.harina)), aceite: Math.max(0, cap - Math.floor(bienes.aceite)), corderos: Math.max(0, cap - Math.floor(bienes.corderos)) },
    tesoro: tesoro.balance,
    precios,
  };
}

// ---------------------------------------------------------------- las casas más bendecidas de la semana
function diasDeLaSemana(semana: string): string[] {
  const d = new Date(`${semana}T12:00:00Z`);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d.getTime() + i * 86400000);
    return x.toISOString().slice(0, 10);
  });
}

async function casasBendecidas(semana: string, limite: number): Promise<{ personajeId: number; nombre: string; bendiciones: number }[]> {
  const { rows } = await pool.query(
    `SELECT b.house_character_id AS id, count(*)::int AS n, COALESCE(c.name, NULLIF(u.display_name, ''), u.username) AS nombre
       FROM game_house_blessings b
       JOIN game_characters c ON c.id = b.house_character_id JOIN users u ON u.id = c.user_id
      WHERE b.day_key = ANY($1::text[]) AND u.is_active = true
      GROUP BY b.house_character_id, c.name, u.display_name, u.username
      ORDER BY n DESC, min(b.day_key) ASC LIMIT $2`,
    [diasDeLaSemana(semana), limite],
  );
  return rows.map((r) => ({ personajeId: Number(r.id), nombre: String(r.nombre), bendiciones: Number(r.n) }));
}

/** Una vez por semana: los premios de la semana pasada a las tres casas más bendecidas (si el tesoro alcanza). */
async function premiarCasasSemanaAnterior() {
  const hoy = diaClave();
  const esta = semanaClave(hoy);
  const anterior = semanaClave(new Date(new Date(`${esta}T12:00:00Z`).getTime() - 3 * 86400000).toISOString().slice(0, 10));
  const { rows } = await pool.query(`INSERT INTO game_house_awards (week_key) VALUES ($1) ON CONFLICT DO NOTHING RETURNING 1`, [anterior]);
  if (!rows.length) return;
  const top = await casasBendecidas(anterior, PREMIO_CASAS.length);
  for (const [i, c] of top.entries()) {
    const premio = PREMIO_CASAS[i];
    if (await delTesoro("premio-casa", c.personajeId, premio, `Premio a la casa más bendecida (${i + 1}.º lugar)`)) await sumarGozo(c.personajeId, premio, "premio-casa");
  }
}

// ---------------------------------------------------------------- las rutas
export function registerEconomiaRoutes(app: Express) {
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
    const { rows } = await pool.query(`SELECT 1 FROM game_houses WHERE character_id = $1`, [ch.casa]);
    if (!rows.length) {
      res.status(409).json({ message: "Primero entra a la ciudad: ahí recibes tu casa." });
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

  app.get("/api/jerusalen/puestos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      await cerrarVencidos();
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoPuestos(ch));
    } catch (err) {
      console.error("[economia] puestos:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Abrir un puesto: lo que se pone a la venta sale del alfolí (vuelve si no se vende).
  app.post("/api/jerusalen/puestos", async (req: Request, res: Response) => {
    const bien = req.body?.bien;
    const cantidad = Math.floor(Number(req.body?.cantidad));
    const precio = Math.floor(Number(req.body?.precio));
    if (!esBien(bien)) return res.status(400).json({ message: "Elige qué vender." });
    const r = rangoPrecio(bien);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > PUESTO_CANTIDAD_MAX) return res.status(400).json({ message: `Pon entre 1 y ${PUESTO_CANTIDAD_MAX}.` });
    if (!Number.isInteger(precio) || precio < r.min || precio > r.max) return res.status(400).json({ message: `El precio de ${BIEN_MERCADO_NOMBRE[bien]} va de ${r.min} a ${r.max} de gozo por unidad.` });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await cerrarVencidos();
      const { rows: abiertos } = await pool.query(`SELECT count(*)::int AS n FROM game_market_listings WHERE seller_character_id = $1 AND closed_at IS NULL`, [ch.casa]);
      if (Number(abiertos[0]?.n || 0) >= PUESTOS_MAX) return res.status(409).json({ message: `Ya tienes ${PUESTOS_MAX} puestos abiertos: espera a que se vendan o cierra uno.` });
      await recoger(ch.casa);
      const ok = await enFilaCasa(ch.casa, async () => {
        const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const bienes = leerBienes(rows[0]?.goods);
        if (Math.floor(bienes[bien]) < cantidad) return false;
        bienes[bien] -= cantidad;
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(bienes)]);
        await pool.query(
          `INSERT INTO game_market_listings (seller_character_id, good, quantity, price, expires_at) VALUES ($1, $2, $3, $4, now() + ($5 || ' hours')::interval)`,
          [ch.casa, bien, cantidad, precio, String(PUESTO_HORAS)],
        );
        return true;
      });
      if (!ok) return res.status(409).json({ message: `No tienes tanto: en tu alfolí no hay ${cantidad} de ${BIEN_MERCADO_NOMBRE[bien]}.` });
      res.json(await estadoPuestos(ch));
    } catch (err) {
      console.error("[economia] abrir puesto:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Comprar en el puesto de un vecino: el gozo pasa al vendedor (menos el diezmo, que va al tesoro).
  app.post("/api/jerusalen/puestos/:id/comprar", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pide = Math.max(1, Math.min(PUESTO_CANTIDAD_MAX, Math.floor(Number(req.body?.cantidad) || 1)));
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Puesto no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await cerrarVencidos();
      const { rows: L } = await pool.query(`SELECT seller_character_id, good, quantity FROM game_market_listings WHERE id = $1 AND closed_at IS NULL AND expires_at > now()`, [id]);
      if (!L.length) return res.status(404).json({ message: "Ese puesto ya cerró." });
      if (Number(L[0].seller_character_id) === ch.casa) return res.status(400).json({ message: "Es tu propio puesto." });
      const bien = L[0].good as BienMercado;
      await recoger(ch.casa);
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; total?: number; n?: number; vendedor?: number }> => {
        const { rows } = await pool.query(`SELECT level, goods, obras, barrio FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const bienes = leerBienes(rows[0]?.goods);
        const extra = ventajasDeColumna(rows[0]?.obras).alfoli + (await ventajasDeBarrio(Number(rows[0]?.barrio || 0))).alfoli;
        const libre = capacidadAlfoli(Number(rows[0]?.level || 0)) + extra - Math.floor(bienes[bien]);
        if (libre <= 0) return { status: 409, message: "Tu alfolí está lleno de eso: lleva algo al templo o al horno primero." };
        // se compra lo que se pidió, si cabe en el alfolí y si queda en el puesto
        const n = Math.min(pide, libre, Math.max(1, Number(L[0].quantity)));
        // se aparta del puesto (de una vez, sin carreras)
        const { rows: r } = await pool.query(
          `UPDATE game_market_listings SET quantity = quantity - $2, sold = sold + $2, closed_at = CASE WHEN quantity - $2 = 0 THEN now() ELSE NULL END
            WHERE id = $1 AND closed_at IS NULL AND expires_at > now() AND quantity >= $2 RETURNING price, seller_character_id`,
          [id, n],
        );
        if (!r.length) return { status: 409, message: "Ya no quedan tantos en ese puesto." };
        const total = n * Number(r[0].price);
        const { rows: pago } = await pool.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, total]);
        if (!pago.length) {
          await pool.query(`UPDATE game_market_listings SET quantity = quantity + $2, sold = sold - $2, closed_at = NULL WHERE id = $1`, [id, n]);
          return { status: 409, message: `Te falta gozo: ${n} cuestan ${total}.` };
        }
        bienes[bien] += n;
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(bienes)]);
        return { status: 200, total, n, vendedor: Number(r[0].seller_character_id) };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      const diezmo = diezmoDe(out.total!);
      // el termómetro: sale lo que pagó el que compra y entra lo del vendedor (la diferencia es el diezmo)
      anotarGasto("vecinos", out.total!);
      await sumarGozo(out.vendedor!, out.total! - diezmo, "vecinos");
      await alTesoro("diezmo", out.vendedor!, diezmo, `Diezmo de una venta de ${BIEN_MERCADO_NOMBRE[bien]} entre vecinos`);
      res.json({ ...(await estadoPuestos(ch)), comprado: { bien, cantidad: out.n, total: out.total } });
    } catch (err) {
      console.error("[economia] comprar en un puesto:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/puestos/:id/cerrar", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Puesto no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(
        `UPDATE game_market_listings SET closed_at = now() WHERE id = $1 AND seller_character_id = $2 AND closed_at IS NULL RETURNING good, quantity`,
        [id, ch.casa],
      );
      if (!rows.length) return res.status(404).json({ message: "Ese puesto ya cerró." });
      if (Number(rows[0].quantity) > 0 && esBien(rows[0].good)) await devolver(ch.casa, rows[0].good, Number(rows[0].quantity));
      res.json(await estadoPuestos(ch));
    } catch (err) {
      console.error("[economia] cerrar puesto:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // ---------------------------------------------------------------- el tesoro del templo
  async function provisionDe(ch: PersonajeFila): Promise<TesoroEstado["provision"]> {
    const [{ rows: c }, { rows: ya }] = await Promise.all([
      pool.query(`SELECT gozo, created_at FROM game_characters WHERE id = $1`, [ch.casa]),
      pool.query(`SELECT 1 FROM game_provision WHERE character_id = $1 AND day_key = $2`, [ch.casa, diaClave()]),
    ]);
    const gozo = Number(c[0]?.gozo || 0);
    const dias = c[0]?.created_at ? (Date.now() - new Date(c[0].created_at).getTime()) / 86400000 : 999;
    if (ya.length) return { puede: false, ya: true, motivo: "Ya recibiste la provisión de hoy.", gozo: PROVISION.gozo };
    if (dias > PROVISION.dias) return { puede: false, ya: false, motivo: `La provisión es para los primeros ${PROVISION.dias} días en Jerusalén.`, gozo: PROVISION.gozo };
    if (gozo >= PROVISION.siTieneMenosDe) return { puede: false, ya: false, motivo: `La provisión es para quien tiene menos de ${PROVISION.siTieneMenosDe} de gozo.`, gozo: PROVISION.gozo };
    return { puede: true, ya: false, motivo: null, gozo: PROVISION.gozo };
  }

  async function estadoTesoro(ch: PersonajeFila): Promise<TesoroEstado> {
    await premiarCasasSemanaAnterior().catch((e) => console.error("[economia] premios de las casas:", e));
    const [saldo, { rows: log }, casas, provision] = await Promise.all([
      saldoTesoro(),
      pool.query(`SELECT kind, amount, note, created_at FROM game_treasury_log ORDER BY id DESC LIMIT 8`),
      casasBendecidas(semanaClave(diaClave()), 5),
      provisionDe(ch),
    ]);
    return {
      ...saldo,
      ultimos: log.map((r) => ({ texto: String(r.note || r.kind), cuanto: Math.abs(Number(r.amount)), entra: Number(r.amount) > 0, cuando: new Date(r.created_at).toISOString() })),
      casas,
      premios: PREMIO_CASAS,
      provision,
    };
  }

  app.get("/api/jerusalen/tesoro", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoTesoro(ch));
    } catch (err) {
      console.error("[economia] tesoro:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/tesoro/provision", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa, 1200)) return res.status(429).json({ message: "Espera un momento" });
      const p = await provisionDe(ch);
      if (!p.puede) return res.status(409).json({ message: p.motivo });
      const { rows } = await pool.query(`INSERT INTO game_provision (character_id, day_key, amount) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING 1`, [ch.casa, diaClave(), PROVISION.gozo]);
      if (!rows.length) return res.status(409).json({ message: "Ya recibiste la provisión de hoy." });
      if (!(await delTesoro("provision", ch.casa, PROVISION.gozo, "Provisión para un vecino que empieza"))) {
        await pool.query(`DELETE FROM game_provision WHERE character_id = $1 AND day_key = $2`, [ch.casa, diaClave()]);
        return res.status(409).json({ message: "El tesoro está vacío por ahora: el diezmo de las ventas lo vuelve a llenar." });
      }
      await sumarGozo(ch.casa, PROVISION.gozo, "provision");
      res.json(await estadoTesoro(ch));
    } catch (err) {
      console.error("[economia] provisión:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
