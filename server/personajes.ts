/**
 * La calle de los siervos (shared/personajes.ts): el recado del día de cada persona y los chismes de verdad.
 * - El recado avanza solo si estás junto a la puerta de quien toca: el servidor lo mira con tu lugar en la ciudad (la
 *   presencia del WebSocket). Nada se simula. Al terminar, gozo y mérito, una vez por día.
 * - Los chismes cuentan lo que pasa en el juego: el barrio que va primero en la copa, quién subió más alto hoy en
 *   «¿Quién es sabio?», cuánto se levantó el muro y cuántos vecinos llegaron hoy.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, filaMerito, nombreDe, personajeDe, temporadaDe } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { avisoDeRacha, marcarServicio, type RachaMarcada } from "./racha";
import { ubicacionDe } from "./ciudad-red";
import { semanaClave } from "./misiones";
import { aportarAlCapitulo, capituloDeHoy, noticiaDelCapitulo } from "./capitulos";
import { anotarCamino } from "./camino-dia";
import { PUNTOS_CAPITULO } from "@shared/capitulos";
import type { MisionCumplida } from "@shared/misiones";
import { nombreDeBarrio } from "@shared/ciudad";
import { RECADO_CERCA, RECADO_GOZO, RECADO_MERITO, personajeCiudad, recadoDelDia, type ChismesVista, type RecadoEstado } from "@shared/personajes";

export const PERSONAJES_SQL = `
CREATE TABLE IF NOT EXISTS "game_recados" (
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "dia" text NOT NULL,
  "paso" integer NOT NULL DEFAULT 0,
  "done_at" timestamp,
  PRIMARY KEY ("titular", "dia")
);`;

async function sumarMerito(personajeId: number, n: number) {
  const t = temporadaDe();
  await filaMerito(personajeId, t.n, diaClave());
  await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [personajeId, t.n, n]);
}

async function estadoRecado(titular: number): Promise<RecadoEstado> {
  const dia = diaClave();
  const recado = recadoDelDia(dia, titular);
  const { rows } = await pool.query(`SELECT paso, done_at FROM game_recados WHERE titular = $1 AND dia = $2`, [titular, dia]);
  return { recado, paso: Number(rows[0]?.paso ?? 0), hecho: !!rows[0]?.done_at, premio: { gozo: RECADO_GOZO, merito: RECADO_MERITO } };
}

// los chismes de verdad se arman una vez por minuto para todos
let chismes: { at: number; noticias: string[] } = { at: 0, noticias: [] };
async function armarChismes(): Promise<string[]> {
  if (Date.now() - chismes.at < 60_000) return chismes.noticias;
  const noticias: string[] = [];
  try {
    const { rows } = await pool.query(`SELECT barrio, puntos FROM game_barrio_copa WHERE week_key = $1 AND puntos > 0 ORDER BY puntos DESC, barrio ASC LIMIT 1`, [semanaClave()]);
    if (rows[0]) noticias.push(`Dicen que el barrio ${nombreDeBarrio(Number(rows[0].barrio))} va primero en la copa de esta semana, con ${Number(rows[0].puntos)} puntos. ¿Y el tuyo?`);
  } catch {
    /* sin copa todavía */
  }
  try {
    const { rows } = await pool.query(
      `SELECT p.grada, c.name, u.display_name, u.username, c.user_id
         FROM game_sabio_partidas p
         JOIN game_characters c ON c.id = p.jugador_id
         JOIN users u ON u.id = p.user_id AND u.is_active IS NOT FALSE
        WHERE p.created_at > now() - interval '1 day' AND p.grada > 0
        ORDER BY p.grada DESC, p.id ASC LIMIT 1`,
    );
    if (rows[0]) noticias.push(`En la casa de la sabiduría, ${nombreDe(rows[0])} subió hasta la grada ${Number(rows[0].grada)} en el último día. ¡Etán está impresionado!`);
  } catch {
    /* sin concurso todavía */
  }
  try {
    const { rows } = await pool.query(`SELECT built, progress FROM game_city_wall WHERE id = 1`);
    if (rows[0]) noticias.push(`El muro del norte ya tiene ${Number(rows[0].built)} de 12 tramos levantados. Cada deber en el templo pone una piedra.`);
  } catch {
    /* sin muro */
  }
  try {
    const n = await noticiaDelCapitulo();
    if (n) noticias.unshift(n);
  } catch {
    /* sin historia todavía */
  }
  try {
    const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_houses WHERE created_at > now() - interval '1 day'`);
    const n = Number(rows[0]?.n ?? 0);
    if (n > 0) noticias.push(n === 1 ? "Ayer llegó un vecino nuevo a Jerusalén. ¡Que se sienta en casa!" : `En el último día llegaron ${n} vecinos nuevos a Jerusalén.`);
  } catch {
    /* sin casas */
  }
  chismes = { at: Date.now(), noticias };
  return noticias;
}

export function registerPersonajesRoutes(app: Express) {
  async function persona(req: Request, res: Response) {
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

  // El recado de hoy.
  app.get("/api/jerusalen/recado", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json({ estado: await estadoRecado(ch.casa) });
    } catch (err) {
      console.error("[recado] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Hablar con un personaje en su puerta: si es a quien toca, el recado avanza.
  app.post("/api/jerusalen/recado/hablar", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const con = typeof req.body?.con === "string" ? personajeCiudad(req.body.con) : undefined;
      if (!con) return res.status(400).json({ message: "¿Con quién quieres hablar?" });
      const out = await enFila(ch.casa, async () => {
        const e = await estadoRecado(ch.casa);
        if (e.hecho) return { error: 409, message: "Ya hiciste el recado de hoy. Vuelve mañana: habrá otro." };
        const toca = personajeCiudad(e.recado.cadena[e.paso])!;
        if (toca.id !== con.id) return { error: 409, message: `Ahora te toca ir con ${toca.nombre}.` };
        const yo = ubicacionDe(ch.id);
        if (!yo) return { error: 409, message: `Ve a la ciudad, a la puerta de ${con.nombre}, en la calle de los siervos.` };
        const d = Math.hypot(yo.x - con.puerta[0], yo.z - con.puerta[1]);
        if (d > RECADO_CERCA) return { error: 409, message: `Acércate a la casa de ${con.nombre}, en la calle de los siervos.` };
        const paso = e.paso + 1;
        const fin = paso >= 3;
        await pool.query(
          `INSERT INTO game_recados (titular, dia, paso, done_at) VALUES ($1, $2, $3, ${fin ? "now()" : "NULL"})
           ON CONFLICT (titular, dia) DO UPDATE SET paso = $3, done_at = ${fin ? "now()" : "game_recados.done_at"}`,
          [ch.casa, diaClave(), paso],
        );
        let racha: RachaMarcada | null = null;
        let capitulo: MisionCumplida[] = [];
        if (fin) {
          await sumarGozo(ch.casa, RECADO_GOZO);
          await sumarMerito(ch.id, RECADO_MERITO);
          racha = await marcarServicio(ch.id);
          void anotarCamino(ch.id, "ayudar");
          // y diez para la meta de la ciudad del capítulo de esta semana
          capitulo = await aportarAlCapitulo(ch, PUNTOS_CAPITULO.recado).catch((err) => {
            console.error("[capitulos] recado:", err);
            return [];
          });
        }
        return { dice: e.recado.dice[e.paso], fin, racha, capitulo };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      const estado = await estadoRecado(ch.casa);
      let gozoTotal: number | undefined;
      if (out.fin) {
        const { rows } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
        gozoTotal = Number(rows[0]?.gozo ?? 0);
      }
      res.json({ estado, dice: out.dice, fin: out.fin, gozoTotal, racha: out.racha ? avisoDeRacha(out.racha) : null, capitulo: out.capitulo });
    } catch (err) {
      console.error("[recado] hablar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Lo que pasa en el juego (para los chismes).
  app.get("/api/jerusalen/chismes", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const h = capituloDeHoy();
      res.json({ noticias: await armarChismes(), temporada: h.temporada, capitulo: h.capitulo, fiesta: h.fiesta?.momento ?? null } satisfies ChismesVista);
    } catch (err) {
      console.error("[chismes]", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
