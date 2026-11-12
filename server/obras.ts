/**
 * Las obras de la casa (shared/obras.ts): ver cómo va tu casa, empezar una obra y sus estrellas. Una obra se paga con
 * gozo y con flor de harina (y a veces aceite) del alfolí, de una sola vez y en una transacción; tarda unas horas y se
 * hace una a la vez. Cuando llega su hora, queda edificada: la ven los vecinos y da su ventaja (la usan el mercado, el
 * huerto, el horno y el alfolí). Nada se simula aquí: se mira la hora en que termina.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { evento, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, olvidarBarrio, recoger } from "./ciudad";
import { alTesoro } from "./economia";
import { anotarGasto } from "./gozo";
import { titularEstudios } from "./estudios";
import { ventajasDeBarrio } from "./barrio-obras";
import { DIEZMO } from "@shared/economia";
import { nombreDeBarrio } from "@shared/ciudad";
import {
  OBRAS, asentarObras, costoDeObra, estrellasDeFila, leerObras, obra, obrasHechas, porQueNoSePuede, ventajasDeObras,
  type ObraId, type ObrasEstado, type ObrasGuardadas,
} from "@shared/obras";

export const OBRAS_SQL = `ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "obras" jsonb NOT NULL DEFAULT '{}'::jsonb;`;

/** Cuántos estudios aprobó la persona (los guarda su primer personaje: server/estudios.ts). */
export async function estudiosAprobados(userId: number): Promise<number> {
  const t = await titularEstudios(userId);
  if (!t) return 0;
  const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_studies WHERE character_id = $1 AND approved_at IS NOT NULL`, [t]);
  return Number(rows[0]?.n || 0);
}

/** Guarda como edificada la obra que ya terminó (una vez) y la avisa a la comunidad. Devuelve cuál terminó. */
async function asentar(ch: PersonajeFila, g: ObrasGuardadas, barrio: number): Promise<{ g: ObrasGuardadas; terminada: ObraId | null }> {
  const nueva = asentarObras(g);
  if (!nueva || !g.curso) return { g, terminada: null };
  const id = g.curso.id;
  // solo si sigue igual (otra petición pudo asentarla primero)
  const { rows } = await pool.query(
    `UPDATE game_houses SET obras = $2::jsonb WHERE character_id = $1 AND obras->'curso'->>'id' = $3 AND obras->'curso'->>'lista' = $4 RETURNING 1`,
    [ch.casa, JSON.stringify(nueva), id, g.curso.lista],
  );
  if (!rows.length) return { g: nueva, terminada: null };
  olvidarBarrio(barrio);
  const o = obra(id);
  if (o) await evento(ch.user_id, `obra:${ch.casa}:${id}`, `edificó ${o.nombre.charAt(0).toLowerCase()}${o.nombre.slice(1)} en su casa de ${nombreDeBarrio(barrio)}`).catch(() => null);
  return { g: nueva, terminada: id };
}

async function estadoObras(ch: PersonajeFila): Promise<ObrasEstado> {
  const [{ rows }, estudios] = await Promise.all([
    pool.query(
      `SELECT h.obras, h.level, h.goods, h.adornos, h.letrero, h.interior, h.barrio, c.gozo
         FROM game_houses h JOIN game_characters c ON c.id = h.character_id WHERE h.character_id = $1`,
      [ch.casa],
    ),
    estudiosAprobados(ch.user_id),
  ]);
  const r = rows[0] ?? {};
  const { g, terminada } = await enFilaCasa(ch.casa, () => asentar(ch, leerObras(r.obras), Number(r.barrio || 0)));
  const nivel = Number(r.level || 0);
  const hechas = obrasHechas(g);
  const bienes = leerBienes(r.goods);
  const ahora = Date.now();
  return {
    obras: OBRAS.map((o) => {
      if (hechas.includes(o.id)) return { id: o.id, estado: "hecha", motivo: null };
      if (g.curso?.id === o.id) return { id: o.id, estado: "en-obra", motivo: null };
      const motivo = porQueNoSePuede(o, { nivel, estudios, hechas, curso: g.curso });
      return { id: o.id, estado: motivo ? "bloqueada" : "se-puede", motivo };
    }),
    hechas,
    curso: g.curso
      ? {
          id: g.curso.id,
          faltan: Math.max(0, Math.ceil((new Date(g.curso.lista).getTime() - ahora) / 1000)),
          total: Math.round((new Date(g.curso.lista).getTime() - new Date(g.curso.desde).getTime()) / 1000),
          rapido: g.curso.rapido === true,
        }
      : null,
    terminada,
    gozo: Number(r.gozo || 0),
    harina: Math.floor(bienes.harina),
    aceite: Math.floor(bienes.aceite),
    nivel,
    estudios,
    estrellas: estrellasDeFila({ ...r, obras: g }, Date.now(), (await ventajasDeBarrio(Number(r.barrio || 0))).estrellas),
    ventajas: ventajasDeObras(hechas),
  };
}

export function registerObrasRoutes(app: Express) {
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
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa." });
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

  app.get("/api/jerusalen/casa/obras", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoObras(ch));
    } catch (err) {
      console.error("[obras] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // empezar una obra: { obra, rapido? } (con más obreros: la mitad más de gozo y la mitad del tiempo)
  app.post("/api/jerusalen/casa/obras", async (req: Request, res: Response) => {
    const o = obra(String(req.body?.obra || ""));
    if (!o) return res.status(400).json({ message: "Esa obra no existe." });
    const rapido = req.body?.rapido === true;
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const estudios = await estudiosAprobados(ch.user_id);
      // primero lo que trajeron los siervos al alfolí (recoger va en su propia fila de la casa)
      await recoger(ch.casa);
      const costo = costoDeObra(o, rapido);
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; barrio?: number }> => {
        const { rows } = await pool.query(`SELECT obras, level, goods, barrio FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const antes = leerObras(rows[0]?.obras);
        const g = asentarObras(antes) ?? antes;
        const nivel = Number(rows[0]?.level || 0);
        const motivo = porQueNoSePuede(o, { nivel, estudios, hechas: g.hechas, curso: g.curso });
        if (motivo) return { status: 409, message: motivo };
        const bienes = leerBienes(rows[0]?.goods);
        if (Math.floor(bienes.harina) < costo.harina || Math.floor(bienes.aceite) < costo.aceite) {
          const pide = [costo.harina ? `${costo.harina} de flor de harina` : "", costo.aceite ? `${costo.aceite} de aceite` : ""].filter(Boolean).join(" y ");
          return { status: 409, message: `Para el pan de los obreros hacen falta ${pide} en tu alfolí: cosecha tu huerto o pon a tus siervos a trabajar.` };
        }
        bienes.harina -= costo.harina;
        bienes.aceite -= costo.aceite;
        const ahora = Date.now();
        const curso = { id: o.id, desde: new Date(ahora).toISOString(), lista: new Date(ahora + costo.horas * 3_600_000).toISOString(), ...(rapido ? { rapido: true } : {}) };
        // el gozo y lo del alfolí se pagan juntos: o todo o nada
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const { rows: pago } = await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, costo.gozo]);
          if (!pago.length) {
            await client.query("ROLLBACK");
            return { status: 409, message: `Te falta gozo: ${rapido ? "con más obreros " : ""}cuesta ${costo.gozo}. Sirve, estudia y cumple tus encargos para juntarlo.` };
          }
          await client.query(`UPDATE game_houses SET goods = $2::jsonb, obras = $3::jsonb WHERE character_id = $1`, [
            ch.casa, JSON.stringify(bienes), JSON.stringify({ hechas: g.hechas, curso }),
          ]);
          await client.query("COMMIT");
        } catch (e) {
          await client.query("ROLLBACK").catch(() => null);
          throw e;
        } finally {
          client.release();
        }
        return { status: 200, barrio: Number(rows[0]?.barrio || 0) };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      anotarGasto("obras", costo.gozo);
      await alTesoro("obra", ch.casa, Math.floor(costo.gozo * DIEZMO), "El 10 % de una obra de casa").catch(() => null);
      if (out.barrio) olvidarBarrio(out.barrio);
      res.json({ ...(await estadoObras(ch)), empezada: o.id, costo: costo.gozo });
    } catch (err) {
      console.error("[obras] empezar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
