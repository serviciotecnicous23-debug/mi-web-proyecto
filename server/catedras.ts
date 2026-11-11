/**
 * Las cátedras de Jerusalén en línea (shared/catedras.ts): el servidor da una lección sin la respuesta
 * (primero las que la persona todavía no aprendió y, de esas, las que tratan de lo que sirvió hace poco),
 * guarda cuál se pidió y corrige la respuesta. Con la correcta: mérito de la temporada para el personaje
 * y gozo para la persona. Hay un tope por día en cada camino (entre todas sus cátedras).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { CATEDRAS, CATEDRA_MERITO, CATEDRA_POR_DIA, type CatedraArea, type CatedraRespuesta, type LeccionVista } from "@shared/catedras";
import { BANCO_CATEDRAS, type FilaCatedra } from "./catedras-banco";
import { diaClave, enFila, filaMerito, forgetJer, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { GOZO, sumarGozo } from "./gozo";
import { anotarCamino } from "./camino-dia";

export const CATEDRAS_SQL = `
CREATE TABLE IF NOT EXISTS "game_catedras" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "area" text NOT NULL,
  "seen" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "aciertos" integer NOT NULL DEFAULT 0,
  "day_key" text,
  "day_count" integer NOT NULL DEFAULT 0,
  "pending" text,
  "pending_at" timestamp,
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("character_id", "area")
);`;

/** Una lección pedida vale 10 minutos para responderla. */
const VALE_MINUTOS = 10;

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const esArea = (a: string): a is CatedraArea => a in CATEDRAS;

function mezclar<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Suma mérito a la temporada del personaje (como los estudios). */
async function sumarMerito(ch: PersonajeFila, n: number) {
  await enFila(ch.id, async () => {
    const t = temporadaDe();
    await filaMerito(ch.id, t.n, diaClave());
    await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [ch.id, t.n, n]);
  });
  forgetJer();
}

export function registerCatedrasRoutes(app: Express) {
  async function jugador(req: Request, res: Response, area: CatedraArea): Promise<PersonajeFila | null> {
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
    if (ch.camino !== CATEDRAS[area].camino) {
      res.status(403).json({ message: `${CATEDRAS[area].nombre} es para quien sirve en ${CATEDRAS[area].lugar}.` });
      return null;
    }
    return ch;
  }

  const ultimo = new Map<string, number>();
  const frenar = (clave: string, ms = 900) => {
    const now = Date.now();
    if (now - (ultimo.get(clave) || 0) < ms) return true;
    ultimo.set(clave, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  async function filaDe(ch: PersonajeFila, area: CatedraArea) {
    await pool.query(`INSERT INTO game_catedras (character_id, area) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [ch.casa, area]);
    const { rows } = await pool.query(
      `SELECT seen, aciertos, day_key, day_count, pending, EXTRACT(EPOCH FROM (now() - pending_at))::float AS pasados FROM game_catedras WHERE character_id = $1 AND area = $2`,
      [ch.casa, area],
    );
    const r = rows[0];
    const hoy = diaClave();
    return {
      vistas: lista(r?.seen),
      aciertos: Number(r?.aciertos || 0),
      pendiente: r?.pending && r?.pasados != null && Number(r.pasados) < VALE_MINUTOS * 60 ? String(r.pending) : null,
    };
  }

  /** Las lecciones de hoy en el camino de la cátedra (entre todas las cátedras de ese camino). */
  async function hoyDelCamino(ch: PersonajeFila, area: CatedraArea): Promise<number> {
    const areas = (Object.keys(CATEDRAS) as CatedraArea[]).filter((a) => CATEDRAS[a].camino === CATEDRAS[area].camino);
    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(day_count), 0)::int AS n FROM game_catedras WHERE character_id = $1 AND area = ANY($2::text[]) AND day_key = $3`,
      [ch.casa, areas, diaClave()],
    );
    return Number(rows[0]?.n || 0);
  }

  const agotada = (area: CatedraArea) => `Por hoy ya aprendiste las ${CATEDRA_POR_DIA} lecciones del día. ${CATEDRAS[area].manana}`;

  // Una lección (sin la respuesta): si ya hay una pedida, la misma; si no, una que todavía no aprendió y,
  // de esas, primero una de lo que sirvió hace poco («pista»: los deberes, del más reciente al más viejo).
  app.post("/api/jerusalen/catedra/:area/leccion", async (req: Request, res: Response) => {
    const area = String(req.params.area);
    if (!esArea(area)) return res.status(404).json({ message: "Esa cátedra no existe." });
    const pista: string[] = Array.isArray(req.body?.pista)
      ? (req.body.pista as unknown[]).filter((x): x is string => typeof x === "string" && x.length > 0 && x.length <= 20).slice(0, 8)
      : [];
    try {
      const ch = await jugador(req, res, area);
      if (!ch) return;
      if (frenar(`l:${ch.casa}:${area}`)) return res.status(429).json({ message: "Espera un momento" });
      const banco = BANCO_CATEDRAS[area];
      const f = await filaDe(ch, area);
      const hoy = await hoyDelCamino(ch, area);
      const base = { hoy, max: CATEDRA_POR_DIA, aprendidas: new Set(f.vistas).size, total: banco.length };
      if (hoy >= CATEDRA_POR_DIA) return res.json({ agotada: true, ...base, message: agotada(area) });
      let fila: FilaCatedra | undefined = f.pendiente ? banco.find((x) => x.id === f.pendiente) : undefined;
      if (!fila) {
        const vistas = new Set(f.vistas);
        const nuevas = banco.filter((x) => !vistas.has(x.id));
        const opciones = nuevas.length ? nuevas : banco;
        for (const g of pista) {
          const de = opciones.filter((x) => x.grupo === g);
          if (de.length) {
            fila = mezclar(de)[0];
            break;
          }
        }
        if (!fila) fila = mezclar(opciones)[0];
        await pool.query(`UPDATE game_catedras SET pending = $3, pending_at = now(), updated_at = now() WHERE character_id = $1 AND area = $2`, [ch.casa, area, fila.id]);
      }
      const sobre = fila.grupo && fila.grupo !== "general" && pista.includes(fila.grupo) ? fila.grupo : null;
      const vista: LeccionVista = { id: fila.id, tema: fila.tema, ensena: fila.ensena, pregunta: fila.pregunta, opciones: mezclar([fila.correcta, ...fila.falsas]), ...base, sobre };
      res.setHeader("Cache-Control", "no-store");
      res.json(vista);
    } catch (err) {
      console.error("[catedras] lección:", err);
      res.sendStatus(500);
    }
  });

  // La respuesta: se corrige aquí. Con la correcta, mérito y gozo; siempre, la explicación con la cita.
  app.post("/api/jerusalen/catedra/:area/respuesta", async (req: Request, res: Response) => {
    const area = String(req.params.area);
    if (!esArea(area)) return res.status(404).json({ message: "Esa cátedra no existe." });
    const opcion = typeof req.body?.opcion === "string" ? req.body.opcion : "";
    try {
      const ch = await jugador(req, res, area);
      if (!ch) return;
      if (frenar(`r:${ch.casa}:${area}`, 1200)) return res.status(429).json({ message: "Espera un momento" });
      const banco = BANCO_CATEDRAS[area];
      const out = await enFila(ch.casa, async (): Promise<CatedraRespuesta | { error: number; message: string }> => {
        const f = await filaDe(ch, area);
        const fila = f.pendiente ? banco.find((x) => x.id === f.pendiente) : undefined;
        if (!fila) return { error: 409, message: "Primero pide la lección." };
        // el tope es del camino: una lección pedida en otra cátedra del mismo camino no lo pasa
        if ((await hoyDelCamino(ch, area)) >= CATEDRA_POR_DIA) {
          await pool.query(`UPDATE game_catedras SET pending = NULL, pending_at = NULL WHERE character_id = $1 AND area = $2`, [ch.casa, area]);
          return { error: 409, message: agotada(area) };
        }
        const correcta = opcion === fila.correcta;
        const hoy = diaClave();
        const { rows } = await pool.query(
          `UPDATE game_catedras SET
              seen = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements(seen || $3::jsonb) x),
              aciertos = aciertos + $4,
              day_count = CASE WHEN day_key = $5 THEN day_count + 1 ELSE 1 END,
              day_key = $5,
              pending = NULL, pending_at = NULL, updated_at = now()
            WHERE character_id = $1 AND area = $2
            RETURNING seen, day_count`,
          [ch.casa, area, JSON.stringify([fila.id]), correcta ? 1 : 0, hoy],
        );
        return {
          correcta,
          respuesta: fila.correcta,
          explica: fila.explica,
          ref: fila.ref,
          premio: correcta ? { merito: CATEDRA_MERITO, gozo: GOZO.acierto } : { merito: 0, gozo: 0 },
          hoy: rows[0] ? await hoyDelCamino(ch, area) : 0,
          max: CATEDRA_POR_DIA,
          aprendidas: lista(rows[0]?.seen).length,
          total: banco.length,
        };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      if (out.correcta) {
        await sumarMerito(ch, CATEDRA_MERITO);
        await sumarGozo(ch.id, GOZO.acierto);
      }
      // el camino de hoy: una lección con el maestro es aprender
      void anotarCamino(ch.id, "aprender");
      const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      res.json({ ...out, gozoTotal: g[0] ? Number(g[0].gozo) : undefined });
    } catch (err) {
      console.error("[catedras] respuesta:", err);
      res.sendStatus(500);
    }
  });
}
