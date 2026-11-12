/**
 * El álbum (shared/album.ts): todo lo que una persona tuvo alguna vez queda anotado (la ropa del armario y del fardo, los
 * adornos y los muebles). Se anota al entrar a Jerusalén (desde server/regreso.ts, como mucho cada 2 minutos) y al abrir
 * el álbum. Los títulos salen del álbum, del arca de Joás y de los amigos invitados; el elegido lo ven los vecinos.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { personajeDe, type PersonajeFila } from "./jerusalen";
import { refrescarFicha } from "./ciudad-red";
import { esDadorAlegre } from "./arca";
import { esBuenAmigo } from "./invitar";
import { EN_EL_ALBUM, leerAlbum, nombreDeTitulo, titulosGanados, type AlbumEstado, type TituloId } from "@shared/album";

export const ALBUM_SQL = `
CREATE TABLE IF NOT EXISTS "game_album" (
  "titular" integer PRIMARY KEY,
  "ids" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "titulo" text;`;

/** Anota en el álbum lo que tiene ahora (sin borrar lo de antes). Devuelve todo lo anotado. */
export async function anotarAlbum(titular: number): Promise<string[]> {
  const { rows } = await pool.query(`SELECT c.armario, c.fardo, c.muebles, a.ids FROM game_characters c LEFT JOIN game_album a ON a.titular = c.id WHERE c.id = $1`, [titular]);
  const r = rows[0];
  if (!r) return [];
  const antes = new Set(leerAlbum(r.ids));
  const ahora = new Set<string>();
  const obj = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
  for (const id of Array.isArray(r.armario) ? r.armario : []) if (typeof id === "string") ahora.add(id);
  for (const [id, n] of Object.entries(obj(r.fardo))) if (Number(n) > 0) ahora.add(id);
  for (const [id, n] of Object.entries(obj(r.muebles))) if (Number(n) > 0) ahora.add(id);
  const nuevos = [...ahora].filter((id) => EN_EL_ALBUM.has(id) && !antes.has(id));
  if (!nuevos.length && r.ids) return [...antes];
  const todo = [...new Set([...antes, ...nuevos])];
  await pool.query(
    `INSERT INTO game_album (titular, ids) VALUES ($1, $2::jsonb)
     ON CONFLICT (titular) DO UPDATE SET ids = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements_text(game_album.ids || EXCLUDED.ids) AS t(x)), updated_at = now()`,
    [titular, JSON.stringify(todo)],
  );
  return todo;
}

async function estadoAlbum(ch: PersonajeFila): Promise<AlbumEstado> {
  const [tengo, dador, amigo, { rows }] = await Promise.all([
    anotarAlbum(ch.casa),
    esDadorAlegre(ch.casa),
    esBuenAmigo(ch.user_id),
    pool.query(`SELECT titulo FROM game_characters WHERE id = $1`, [ch.casa]),
  ]);
  const titulos = titulosGanados(new Set(tengo), { dador, amigo });
  const elegido = rows[0]?.titulo as string | null;
  return { tengo, titulos, titulo: elegido && (titulos as string[]).includes(elegido) ? (elegido as TituloId) : null };
}

export function registerAlbumRoutes(app: Express) {
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

  app.get("/api/jerusalen/album", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoAlbum(ch));
    } catch (err) {
      console.error("[album] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // elegir el título que se muestra: { titulo } (null para no mostrar ninguno)
  app.post("/api/jerusalen/album/titulo", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const pide = req.body?.titulo ?? null;
    if (pide !== null && !nombreDeTitulo(pide)) return res.status(400).json({ message: "Ese título no existe." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimo.get(ch.casa) || 0) < 800) return res.status(429).json({ message: "Espera un momento" });
      ultimo.set(ch.casa, now);
      if (ultimo.size > 5000) ultimo.clear();
      const e = await estadoAlbum(ch);
      if (pide !== null && !(e.titulos as string[]).includes(pide)) return res.status(403).json({ message: "Todavía no ganaste ese título." });
      await pool.query(`UPDATE game_characters SET titulo = $2 WHERE id = $1`, [ch.casa, pide]);
      // los vecinos que lo ven reciben otra vez su ficha (con el título nuevo)
      refrescarFicha(ch.id, { titulo: nombreDeTitulo(pide) ?? undefined });
      res.json({ ...e, titulo: pide });
    } catch (err) {
      console.error("[album] título:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
