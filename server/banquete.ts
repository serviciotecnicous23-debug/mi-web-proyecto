/**
 * El banquete en tu casa (shared/banquete.ts): abrir la casa 20 minutos con pan y aceite (una vez por día) y sentarse
 * a la mesa de un vecino. Para sentarse hay que estar de verdad en su puerta: el servidor mira la presencia de la
 * ciudad (server/ciudad-red.ts) y el umbral de la casa (shared/parcelas.ts). Nada se simula.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, forgetJer, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { anotarGasto, sumarGozo } from "./gozo";
import { guisoDeHoy } from "./casa-usar";
import { USOS_CASA } from "@shared/casa-interior";
import { sumarALaCopa } from "./barrio-juntos";
import { difundirAlBarrio, ubicacionDe } from "./ciudad-red";
import { enFilaCasa, leerBienes, recoger } from "./ciudad";
import { parcelaDe } from "@shared/parcelas";
import { BANQUETE, type BanqueteVista, type BanquetesEstado, type SentarseRespuesta } from "@shared/banquete";

export const BANQUETE_SQL = `
CREATE TABLE IF NOT EXISTS "game_banquetes" (
  "id" serial PRIMARY KEY,
  "anfitrion" integer NOT NULL,
  "barrio" integer NOT NULL,
  "parcela" integer NOT NULL,
  "dia" text NOT NULL,
  "termina" timestamp NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_banquete_dia" ON "game_banquetes" ("anfitrion", "dia");
CREATE TABLE IF NOT EXISTS "game_banquete_invitados" (
  "banquete_id" integer NOT NULL,
  "titular" integer NOT NULL,
  "dia" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("banquete_id", "titular")
);
CREATE INDEX IF NOT EXISTS "idx_banquete_invitados_dia" ON "game_banquete_invitados" ("titular", "dia");`;

/** Los banquetes (con su anfitrión), con lo que ve quien pregunta. Los segundos se cuentan en SQL (sin la hora del teléfono). */
async function banquetes(ch: PersonajeFila, donde: string, params: unknown[]): Promise<BanqueteVista[]> {
  const { rows } = await pool.query(
    `SELECT b.id, b.anfitrion, b.barrio, b.parcela, GREATEST(0, EXTRACT(EPOCH FROM (b.termina - now())))::int AS faltan,
            (SELECT count(*)::int FROM game_banquete_invitados i WHERE i.banquete_id = b.id) AS invitados,
            EXISTS (SELECT 1 FROM game_banquete_invitados i WHERE i.banquete_id = b.id AND i.titular = $1) AS sentado,
            c.name, c.user_id, u.display_name, u.username,
            (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual
       FROM game_banquetes b JOIN game_characters c ON c.id = b.anfitrion JOIN users u ON u.id = c.user_id
      WHERE u.is_active IS NOT FALSE
        AND NOT EXISTS (SELECT 1 FROM user_blocks k WHERE (k.blocker_id = $2 AND k.blocked_id = c.user_id) OR (k.blocker_id = c.user_id AND k.blocked_id = $2))
        AND ${donde}
      ORDER BY b.termina DESC LIMIT 12`,
    [ch.casa, ch.user_id, ...params],
  );
  return rows.map((r) => ({
    id: Number(r.id),
    anfitrionId: Number(r.anfitrion),
    anfitrion: nombreDe({ ...r, name: r.actual ?? r.name }),
    barrio: Number(r.barrio),
    parcela: Number(r.parcela),
    faltan: Number(r.faltan),
    invitados: Number(r.invitados),
    mio: Number(r.anfitrion) === ch.casa,
    sentado: r.sentado === true,
  }));
}

async function estadoBanquetes(ch: PersonajeFila): Promise<BanquetesEstado> {
  const hoy = diaClave();
  const [{ rows: casa }, mios, { rows: s }] = await Promise.all([
    pool.query(`SELECT h.barrio, c.gozo FROM game_characters c LEFT JOIN game_houses h ON h.character_id = c.id WHERE c.id = $1`, [ch.casa]),
    banquetes(ch, `b.anfitrion = $3 AND b.dia = $4`, [ch.casa, hoy]),
    pool.query(`SELECT count(*)::int AS n FROM game_banquete_invitados WHERE titular = $1 AND dia = $2`, [ch.casa, hoy]),
  ]);
  const barrio = casa[0]?.barrio ? Number(casa[0].barrio) : 0;
  const activos = (await banquetes(ch, `b.termina > now()`, [])).sort((a, b) => Number(b.barrio === barrio) - Number(a.barrio === barrio));
  const mio = mios[0] ?? null;
  return {
    mio,
    puedoAbrir: !mio && !!barrio,
    motivo: mio ? "Hoy ya abriste tu casa para un banquete: mañana puedes otra vez." : !barrio ? "Primero entra a la ciudad: allí está tu casa." : null,
    activos,
    sentadasHoy: Number(s[0]?.n || 0),
    gozo: Number(casa[0]?.gozo || 0),
  };
}

export function registerBanqueteRoutes(app: Express) {
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

  app.get("/api/jerusalen/banquetes", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoBanquetes(ch));
    } catch (err) {
      console.error("[banquete] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // abrir mi casa para un banquete (una vez por día)
  app.post("/api/jerusalen/banquete", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await recoger(ch.casa);
      const hoy = diaClave();
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; barrio?: number }> => {
        const { rows } = await pool.query(`SELECT barrio, plot, goods FROM game_houses WHERE character_id = $1`, [ch.casa]);
        if (!rows[0]) return { status: 409, message: "Primero entra a la ciudad: allí está tu casa." };
        const bienes = leerBienes(rows[0].goods);
        if (Math.floor(bienes.harina) < BANQUETE.harina || Math.floor(bienes.aceite) < BANQUETE.aceite) {
          return { status: 409, message: `Para el banquete hacen falta ${BANQUETE.harina} de flor de harina y ${BANQUETE.aceite} de aceite en tu alfolí.` };
        }
        bienes.harina -= BANQUETE.harina;
        bienes.aceite -= BANQUETE.aceite;
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const { rows: ya } = await client.query(`SELECT 1 FROM game_banquetes WHERE anfitrion = $1 AND dia = $2`, [ch.casa, hoy]);
          if (ya.length) {
            await client.query("ROLLBACK");
            return { status: 409, message: "Hoy ya abriste tu casa para un banquete: mañana puedes otra vez." };
          }
          const { rows: pago } = await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, BANQUETE.gozo]);
          if (!pago.length) {
            await client.query("ROLLBACK");
            return { status: 409, message: `Te falta gozo: el banquete cuesta ${BANQUETE.gozo}.` };
          }
          await client.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(bienes)]);
          await client.query(
            `INSERT INTO game_banquetes (anfitrion, barrio, parcela, dia, termina) VALUES ($1, $2, $3, $4, now() + ($5 || ' minutes')::interval)`,
            [ch.casa, Number(rows[0].barrio), Number(rows[0].plot), hoy, String(BANQUETE.minutos)],
          );
          await client.query("COMMIT");
        } catch (e) {
          await client.query("ROLLBACK").catch(() => null);
          throw e;
        } finally {
          client.release();
        }
        return { status: 200, barrio: Number(rows[0].barrio) };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      anotarGasto("banquete", BANQUETE.gozo);
      const nombre = nombreDe(ch);
      difundirAlBarrio(out.barrio!, () => ({ t: "banquete", anfitrion: nombre, abierto: true }));
      res.json(await estadoBanquetes(ch));
    } catch (err) {
      console.error("[banquete] abrir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // sentarse a la mesa de un banquete (parado en la puerta de esa casa)
  app.post("/api/jerusalen/banquete/:bid/sentarse", async (req: Request, res: Response) => {
    const bid = Number(req.params.bid);
    if (!Number.isInteger(bid) || bid <= 0) return res.status(400).json({ message: "Ese banquete no existe." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const [b] = await banquetes(ch, `b.id = $3`, [bid]);
      if (!b) return res.status(404).json({ message: "Ese banquete no existe." });
      if (b.mio) return res.status(409).json({ message: "Es tu banquete: tus vecinos se sientan a tu mesa." });
      if (b.faltan <= 0) return res.status(409).json({ message: "Ese banquete ya terminó." });
      if (b.sentado) return res.status(409).json({ message: "Ya te sentaste a esta mesa." });
      // de verdad en su puerta (la presencia de la ciudad)
      const pos = ubicacionDe(ch.id);
      const [ux, uz] = parcelaDe(b.barrio, b.parcela).umbral;
      if (!pos || (pos.x - ux) ** 2 + (pos.z - uz) ** 2 > BANQUETE.cerca ** 2) {
        return res.status(409).json({ message: `Ve a la puerta de la casa de ${b.anfitrion} para sentarte a su mesa.` });
      }
      const hoy = diaClave();
      const { rows: n } = await pool.query(`SELECT count(*)::int AS n FROM game_banquete_invitados WHERE titular = $1 AND dia = $2`, [ch.casa, hoy]);
      if (Number(n[0]?.n || 0) >= BANQUETE.sentadasPorDia) return res.status(409).json({ message: `Hoy ya te sentaste a ${BANQUETE.sentadasPorDia} mesas: mañana hay más banquetes.` });
      // un lugar en la mesa (si queda): en una sola consulta, para que no se pase de los invitados
      const { rows: ok } = await pool.query(
        `INSERT INTO game_banquete_invitados (banquete_id, titular, dia)
         SELECT $1, $2, $3 WHERE (SELECT count(*) FROM game_banquete_invitados WHERE banquete_id = $1) < $4
         ON CONFLICT DO NOTHING RETURNING 1`,
        [bid, ch.casa, hoy, BANQUETE.maxInvitados],
      );
      if (!ok.length) return res.status(409).json({ message: "La mesa ya está llena: ¡llegó mucha gente!" });
      // si el anfitrión cocinó hoy el guiso en su fogón (la casa viva), cada invitado gana un poco más
      const guiso = await guisoDeHoy(b.anfitrionId);
      const ganado = BANQUETE.gozoInvitado + (guiso ? USOS_CASA.cocinar.banquete : 0);
      await sumarGozo(ch.casa, ganado, "banquete-invitado");
      await pool.query(`UPDATE game_houses SET offered = offered + $2 WHERE character_id = $1`, [b.anfitrionId, BANQUETE.honraPorInvitado]);
      forgetJer();
      await sumarALaCopa(ch.id, "banquete", 1);
      const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      const [despues] = await banquetes(ch, `b.id = $3`, [bid]);
      const r: SentarseRespuesta = { gozo: ganado, gozoTotal: Number(g[0]?.gozo || 0), honra: BANQUETE.honraPorInvitado, banquete: despues ?? b, ...(guiso ? { guiso: true } : {}) };
      res.json(r);
    } catch (err) {
      console.error("[banquete] sentarse:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
