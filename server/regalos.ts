/**
 * Los regalos entre vecinos (shared/regalos.ts): comprarle algo del mercado a un vecino o amigo y mandárselo con una
 * frase de la lista. Se paga y se entrega de una vez (en una transacción): el gozo sale de quien regala (con el 10 %
 * al tesoro, como toda compra) y lo regalado entra en el armario, el arcón o las semillas de quien lo recibe. Le llega
 * un aviso en vivo si está en la ciudad, y lo ve en Tu casa → Vecinos.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { anotarGasto } from "./gozo";
import { alTesoro } from "./economia";
import { avisarA } from "./ciudad-red";
import { relacionesDe } from "./sabio";
import { DIEZMO } from "@shared/economia";
import { articulo, enTemporada, precioHoy } from "@shared/mercado";
import { MAX_POR_MUEBLE, leerMuebles, mueble } from "@shared/casa-interior";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import {
  CATEGORIAS_REGALO, FRASES_REGALO, REGALOS_A_LA_MISMA, REGALOS_POR_DIA, type ParaRegalar, type RegaloRecibido, type RegalosEstado,
} from "@shared/regalos";

export const REGALOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_regalos" (
  "id" serial PRIMARY KEY,
  "de_titular" integer NOT NULL,
  "para_titular" integer NOT NULL,
  "articulo" text NOT NULL,
  "frase" text NOT NULL,
  "precio" integer NOT NULL,
  "dia" text NOT NULL,
  "visto_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_regalos_para" ON "game_regalos" ("para_titular", "created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_regalos_de_dia" ON "game_regalos" ("de_titular", "dia");`;

/** Las semillas se regalan de a 5. */
const SEMILLAS_POR_REGALO = 5;
const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

/** El dueño de una casa (su titular), con su cuenta y su nombre de ahora. */
async function personaDeCasa(personajeId: number): Promise<{ titular: number; userId: number; nombre: string } | null> {
  const { rows } = await pool.query(
    `SELECT t.id AS titular, t.user_id, u.display_name, u.username, u.is_active,
            (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = t.user_id AND c5.game = t.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual
       FROM game_characters c
       JOIN game_characters t ON t.id = (SELECT MIN(c2.id) FROM game_characters c2 WHERE c2.user_id = c.user_id AND c2.game = c.game)
       JOIN users u ON u.id = t.user_id
      WHERE c.id = $1 AND c.game = $2`,
    [personajeId, JERUSALEN_JUEGO],
  );
  const r = rows[0];
  if (!r || r.is_active === false) return null;
  return { titular: Number(r.titular), userId: Number(r.user_id), nombre: nombreDe({ ...r, name: r.actual }) };
}

async function enviadosHoy(titular: number, para?: number): Promise<{ total: number; aEsa: number }> {
  const { rows } = await pool.query(
    `SELECT count(*)::int AS total, count(*) FILTER (WHERE para_titular = $3)::int AS a_esa FROM game_regalos WHERE de_titular = $1 AND dia = $2`,
    [titular, diaClave(), para ?? 0],
  );
  return { total: Number(rows[0]?.total || 0), aEsa: Number(rows[0]?.a_esa || 0) };
}

/** Si se le puede regalar a esa persona (amigo o vecino, sin bloqueos, no uno mismo). */
async function permitido(ch: PersonajeFila, otro: { titular: number; userId: number }): Promise<string | null> {
  if (otro.userId === ch.user_id) return "No te puedes regalar a ti mismo.";
  const r = await relacionesDe(ch.casa, ch.user_id);
  if (r.bloqueados.has(otro.userId)) return "No puedes regalarle a esa persona.";
  if (!r.vecinos.has(otro.userId) && !r.amigos.has(otro.userId)) return "Solo puedes regalarles a tus vecinos del barrio y a tus amigos.";
  return null;
}

async function estadoRegalos(ch: PersonajeFila): Promise<RegalosEstado> {
  const [{ rows }, hoy, { rows: g }] = await Promise.all([
    pool.query(
      `SELECT r.id, r.articulo, r.frase, r.created_at, r.visto_at, c.name, c.user_id, u.display_name, u.username,
              (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual
         FROM game_regalos r JOIN game_characters c ON c.id = r.de_titular JOIN users u ON u.id = c.user_id
        WHERE r.para_titular = $1 AND u.is_active IS NOT FALSE
          AND NOT EXISTS (SELECT 1 FROM user_blocks b WHERE (b.blocker_id = $2 AND b.blocked_id = c.user_id) OR (b.blocker_id = c.user_id AND b.blocked_id = $2))
        ORDER BY r.created_at DESC LIMIT 20`,
      [ch.casa, ch.user_id],
    ),
    enviadosHoy(ch.casa),
    pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]),
  ]);
  const recibidos: RegaloRecibido[] = rows.map((r) => ({
    id: Number(r.id),
    de: nombreDe({ ...r, name: r.actual ?? r.name }),
    articulo: String(r.articulo),
    frase: String(r.frase),
    cuando: new Date(r.created_at).toISOString(),
    nuevo: !r.visto_at,
  }));
  return { recibidos, nuevos: recibidos.filter((x) => x.nuevo).length, quedanHoy: Math.max(0, REGALOS_POR_DIA - hoy.total), gozo: Number(g[0]?.gozo || 0) };
}

export function registerRegalosRoutes(app: Express) {
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

  app.get("/api/jerusalen/regalos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoRegalos(ch));
    } catch (err) {
      console.error("[regalos] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/regalos/vistos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      await pool.query(`UPDATE game_regalos SET visto_at = now() WHERE para_titular = $1 AND visto_at IS NULL`, [ch.casa]);
      res.json(await estadoRegalos(ch));
    } catch (err) {
      console.error("[regalos] vistos:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // para elegir qué regalarle a alguien (por el personaje de su casa): lo que ya tiene y si se puede
  app.get("/api/jerusalen/regalos/para/:pid", async (req: Request, res: Response) => {
    const pid = Number(req.params.pid);
    if (!Number.isInteger(pid) || pid <= 0) return res.status(400).json({ message: "Esa persona no existe." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const otro = await personaDeCasa(pid);
      if (!otro) return res.status(404).json({ message: "Esa persona no está en Jerusalén." });
      const [motivo, hoy, { rows }, { rows: g }] = await Promise.all([
        permitido(ch, otro),
        enviadosHoy(ch.casa, otro.titular),
        pool.query(`SELECT c.armario, c.muebles, h.level FROM game_characters c LEFT JOIN game_houses h ON h.character_id = c.id WHERE c.id = $1`, [otro.titular]),
        pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]),
      ]);
      const muebles = leerMuebles(rows[0]?.muebles);
      const nivel = Number(rows[0]?.level || 0);
      // lo que no se le puede regalar: lo que ya tiene (adornos y ropa) y los muebles que ya tiene completos
      // (los muebles que su casa todavía no admite los filtra la pantalla con `nivel`)
      const tiene = [...lista(rows[0]?.armario), ...Object.entries(muebles).filter(([, n]) => n >= MAX_POR_MUEBLE).map(([id]) => id)];
      const sinCupo = hoy.total >= REGALOS_POR_DIA ? `Hoy ya mandaste ${REGALOS_POR_DIA} regalos: mañana puedes mandar más.` : hoy.aEsa >= REGALOS_A_LA_MISMA ? `Hoy ya le mandaste ${REGALOS_A_LA_MISMA} regalos a ${otro.nombre}.` : null;
      const out: ParaRegalar = {
        personajeId: pid,
        nombre: otro.nombre,
        puede: !motivo && !sinCupo,
        motivo: motivo ?? sinCupo,
        tiene: [...new Set(tiene)],
        nivel,
        quedanHoy: Math.max(0, REGALOS_POR_DIA - hoy.total),
        gozo: Number(g[0]?.gozo || 0),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[regalos] para:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // mandar un regalo: { para (el personaje de su casa), articulo, frase }
  app.post("/api/jerusalen/regalos", async (req: Request, res: Response) => {
    const para = Number(req.body?.para);
    const a = articulo(String(req.body?.articulo || ""));
    const frase = String(req.body?.frase || "");
    if (!Number.isInteger(para) || para <= 0) return res.status(400).json({ message: "¿A quién le regalas?" });
    if (!a || !(CATEGORIAS_REGALO as readonly string[]).includes(a.categoria)) return res.status(400).json({ message: "Eso no se puede regalar." });
    if (a.exclusivo) return res.status(403).json({ message: "Eso no se vende: se gana. No se puede regalar." });
    if (!enTemporada(a)) return res.status(409).json({ message: "Esa prenda es de temporada: hoy no se vende." });
    if (!(FRASES_REGALO as readonly string[]).includes(frase)) return res.status(400).json({ message: "Elige una frase de la lista." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const otro = await personaDeCasa(para);
      if (!otro) return res.status(404).json({ message: "Esa persona no está en Jerusalén." });
      const motivo = await permitido(ch, otro);
      if (motivo) return res.status(403).json({ message: motivo });
      const hoy = await enviadosHoy(ch.casa, otro.titular);
      if (hoy.total >= REGALOS_POR_DIA) return res.status(409).json({ message: `Hoy ya mandaste ${REGALOS_POR_DIA} regalos: mañana puedes mandar más.` });
      if (hoy.aEsa >= REGALOS_A_LA_MISMA) return res.status(409).json({ message: `Hoy ya le mandaste ${REGALOS_A_LA_MISMA} regalos a ${otro.nombre}.` });
      const cantidad = a.categoria === "semilla" ? SEMILLAS_POR_REGALO : 1;
      const costo = precioHoy(a, diaClave()) * cantidad;
      const client = await pool.connect();
      let error: { status: number; message: string } | null = null;
      try {
        await client.query("BEGIN");
        // lo que ya tiene quien lo recibe (con su fila trabada)
        const { rows: r } = await client.query(
          `SELECT c.armario, c.muebles, h.level FROM game_characters c LEFT JOIN game_houses h ON h.character_id = c.id WHERE c.id = $1 FOR UPDATE OF c`,
          [otro.titular],
        );
        if ((a.categoria === "adorno" || a.categoria === "ropa") && lista(r[0]?.armario).includes(a.id)) error = { status: 409, message: `${otro.nombre} ya tiene eso.` };
        if (a.categoria === "mueble") {
          const mu = mueble(a.id)!;
          if ((mu.nivelMin ?? 0) > Number(r[0]?.level || 0)) error = { status: 409, message: `${mu.nombre} pide una casa más grande que la de ${otro.nombre}.` };
          else if ((leerMuebles(r[0]?.muebles)[a.id] || 0) >= MAX_POR_MUEBLE) error = { status: 409, message: `${otro.nombre} ya tiene ${MAX_POR_MUEBLE} de ese mueble.` };
        }
        if (!error) {
          const { rows: pago } = await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, costo]);
          if (!pago.length) error = { status: 409, message: `Te falta gozo: cuesta ${costo}.` };
        }
        if (!error) {
          if (a.categoria === "semilla") {
            await client.query(`UPDATE game_characters SET semillas = jsonb_set(COALESCE(semillas, '{}'::jsonb), ARRAY[$2::text], to_jsonb(COALESCE((semillas->>$2)::int, 0) + $3)) WHERE id = $1`, [otro.titular, a.id, cantidad]);
          } else if (a.categoria === "mueble") {
            await client.query(`UPDATE game_characters SET muebles = jsonb_set(COALESCE(muebles, '{}'::jsonb), ARRAY[$2::text], to_jsonb(COALESCE((muebles->>$2)::int, 0) + 1)) WHERE id = $1`, [otro.titular, a.id]);
          } else {
            await client.query(`UPDATE game_characters SET armario = COALESCE(armario, '[]'::jsonb) || to_jsonb($2::text) WHERE id = $1`, [otro.titular, a.id]);
          }
          await client.query(`INSERT INTO game_regalos (de_titular, para_titular, articulo, frase, precio, dia) VALUES ($1, $2, $3, $4, $5, $6)`, [
            ch.casa, otro.titular, a.id, frase, costo, diaClave(),
          ]);
          await client.query("COMMIT");
        } else await client.query("ROLLBACK");
      } catch (e) {
        await client.query("ROLLBACK").catch(() => null);
        throw e;
      } finally {
        client.release();
      }
      if (error) return res.status(error.status).json({ message: error.message });
      anotarGasto("regalos", costo);
      await alTesoro("regalo", ch.casa, Math.floor(costo * DIEZMO), "El 10 % de un regalo entre vecinos").catch(() => null);
      const nombre = nombreDe(ch);
      const que = a.categoria === "semilla" ? `${cantidad} × ${a.nombre.toLowerCase()}` : a.nombre;
      avisarA(otro.userId, { t: "regalo", r: { de: nombre, articulo: que, frase } });
      res.json({ ...(await estadoRegalos(ch)), regalado: { para: otro.nombre, articulo: que, costo } });
    } catch (err) {
      console.error("[regalos] regalar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
