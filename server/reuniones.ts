/**
 * Las reuniones en las casas (shared/reuniones.ts): abrir la casa para enseñar una sección ya
 * estudiada (una vez por día, 20 minutos), verlas en el barrio, y que los vecinos que llegan
 * respondan la pregunta. El servidor corrige y reparte el premio (el teléfono solo pide).
 */
import type { Express, Request, Response } from "express";
import { titularEstudios } from "./estudios";
import { pool } from "./db";
import { ESTUDIOS } from "@shared/estudios";
import { REUNION_MINUTOS, REUNION_PREMIO, type ReunionesEstado, type ReunionLeccion, type ReunionRespuesta, type ReunionVista } from "@shared/reuniones";
import { diaClave, evento, filaMerito, forgetJer, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { avanzarMision } from "./misiones";
import { sumarGozo } from "./gozo";

export const REUNIONES_SQL = `
CREATE TABLE IF NOT EXISTS "game_house_meetings" (
  "id" serial PRIMARY KEY,
  "host_character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "plot" integer NOT NULL,
  "study_id" text NOT NULL,
  "section_id" text NOT NULL,
  "day_key" text NOT NULL,
  "started_at" timestamp NOT NULL DEFAULT now(),
  "ends_at" timestamp NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_house_meeting_day" ON "game_house_meetings" ("host_character_id", "day_key");
CREATE INDEX IF NOT EXISTS "idx_house_meetings_ends" ON "game_house_meetings" ("ends_at");
CREATE TABLE IF NOT EXISTS "game_meeting_attendance" (
  "meeting_id" integer NOT NULL REFERENCES "game_house_meetings"("id") ON DELETE CASCADE,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "correct" boolean NOT NULL DEFAULT false,
  "rewarded" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("meeting_id", "character_id")
);`;

function seccionDe(estudio: string, seccion: string) {
  const e = ESTUDIOS.find((x) => x.id === estudio);
  const s = e?.secciones.find((x) => x.id === seccion);
  return e && s ? { e, s } : null;
}

const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null }) =>
  (r.name && r.name !== "__propio__" ? r.name : null) || r.display_name || r.username || "Un vecino";

async function sumarMerito(personajeId: number, n: number) {
  const t = temporadaDe();
  await filaMerito(personajeId, t.n, diaClave());
  await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [personajeId, t.n, n]);
}

/** Las reuniones (con lo que ve quien pregunta), con su filtro y su orden. */
async function reuniones(yo: number, where: string, params: unknown[], orden = "m.ends_at DESC"): Promise<ReunionVista[]> {
  const { rows } = await pool.query(
    `SELECT m.id, m.host_character_id, m.barrio, m.plot, m.study_id, m.section_id,
            GREATEST(0, EXTRACT(EPOCH FROM (m.ends_at - now())))::int AS faltan,
            (SELECT count(*)::int FROM game_meeting_attendance a WHERE a.meeting_id = m.id) AS asistentes,
            EXISTS (SELECT 1 FROM game_meeting_attendance a WHERE a.meeting_id = m.id AND a.character_id = $1) AS ya,
            c.name, u.display_name, u.username
       FROM game_house_meetings m
       JOIN game_characters c ON c.id = m.host_character_id
       JOIN users u ON u.id = c.user_id
      WHERE ${where}
      ORDER BY ${orden}
      LIMIT 30`,
    [yo, ...params],
  );
  return rows.map((r) => {
    const sec = seccionDe(String(r.study_id), String(r.section_id));
    return {
      id: Number(r.id),
      anfitrionId: Number(r.host_character_id),
      anfitrion: nombreDe(r),
      barrio: Number(r.barrio),
      parcela: Number(r.plot),
      estudio: String(r.study_id),
      seccion: String(r.section_id),
      titulo: sec ? sec.s.titulo : "Un estudio",
      faltan: Number(r.faltan),
      asistentes: Number(r.asistentes),
      mia: Number(r.host_character_id) === yo,
      yaFui: r.ya === true,
    };
  });
}

/** Una pregunta de la sección, la misma para todos en esa reunión. */
function preguntaDe(id: number, preguntas: { p: string; ops: string[]; ok: number; por: string }[]) {
  return preguntas[id % preguntas.length];
}

export function registerReunionesRoutes(app: Express) {
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

  async function estado(ch: PersonajeFila & { barrio: number }): Promise<ReunionesEstado> {
    const [mias, activas, { rows: est }] = await Promise.all([
      reuniones(ch.casa, `m.host_character_id = $1 AND m.day_key = $2`, [diaClave()]),
      // las de ahora, primero las de mi barrio
      reuniones(ch.casa, `m.ends_at > now() AND m.host_character_id <> $1 AND $2::int IS NOT NULL`, [ch.barrio], "m.barrio = $2 DESC, m.ends_at ASC"),
      // lo estudiado es de la persona (lo guarda su primer personaje)
      titularEstudios(ch.user_id).then((t) => pool.query(`SELECT study_id, sections FROM game_studies WHERE character_id = $1`, [t ?? ch.casa])),
    ]);
    const secciones: ReunionesEstado["secciones"] = [];
    for (const r of est) {
      const e = ESTUDIOS.find((x) => x.id === r.study_id);
      if (!e) continue;
      const hechas = Array.isArray(r.sections) ? (r.sections as unknown[]).filter((x): x is string => typeof x === "string") : [];
      for (const s of e.secciones) if (hechas.includes(s.id)) secciones.push({ estudio: e.id, seccion: s.id, titulo: s.titulo, icono: e.icono });
    }
    return { mia: mias[0] ?? null, secciones, activas: activas.slice(0, 12) };
  }

  app.get("/api/jerusalen/reuniones", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estado(ch));
    } catch (err) {
      console.error("[reuniones] estado:", err);
      res.sendStatus(500);
    }
  });

  // abrir la casa para enseñar una sección ya estudiada (una vez por día)
  app.post("/api/jerusalen/reuniones", async (req: Request, res: Response) => {
    const estudio = String(req.body?.estudio || "");
    const seccion = String(req.body?.seccion || "");
    const sec = seccionDe(estudio, seccion);
    if (!sec) return res.status(400).json({ message: "Elige una sección de un estudio." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const titular = (await titularEstudios(ch.user_id)) ?? ch.casa;
      const { rows: est } = await pool.query(`SELECT sections FROM game_studies WHERE character_id = $1 AND study_id = $2`, [titular, estudio]);
      const hechas = Array.isArray(est[0]?.sections) ? (est[0].sections as unknown[]) : [];
      if (!hechas.includes(seccion)) return res.status(409).json({ message: "Solo puedes enseñar lo que ya estudiaste: termina esa sección en la escuela." });
      const { rows } = await pool.query(
        `INSERT INTO game_house_meetings (host_character_id, barrio, plot, study_id, section_id, day_key, ends_at)
         VALUES ($1, $2, $3, $4, $5, $6, now() + ($7 || ' minutes')::interval)
         ON CONFLICT (host_character_id, day_key) DO NOTHING RETURNING id`,
        [ch.casa, ch.barrio, ch.plot, estudio, seccion, diaClave(), String(REUNION_MINUTOS)],
      );
      if (!rows.length) return res.status(409).json({ message: "Hoy ya abriste tu casa para una reunión. Vuelve mañana." });
      await evento(ch.user_id, `reunion:${rows[0].id}`, `abrió su casa para estudiar «${sec.s.titulo}» en Jerusalén en línea`).catch(() => null);
      const misiones = await avanzarMision(ch, "anfitrion", 1).catch(() => []);
      res.json({ ...(await estado(ch)), ...(misiones.length ? { misiones } : {}) });
    } catch (err) {
      console.error("[reuniones] abrir:", err);
      res.sendStatus(500);
    }
  });

  // la lección que ve el vecino que llega
  app.get("/api/jerusalen/reuniones/:reunion", async (req: Request, res: Response) => {
    const id = Math.floor(Number(req.params.reunion));
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Reunión no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const [r] = await reuniones(ch.casa, `m.id = $2`, [id]);
      if (!r) return res.status(404).json({ message: "Esa reunión no existe." });
      if (r.mia) return res.status(409).json({ message: "Es tu reunión: tus vecinos responden la pregunta." });
      const sec = seccionDe(r.estudio, r.seccion);
      if (!sec || !sec.s.preguntas.length) return res.status(404).json({ message: "Esa reunión no existe." });
      const q = preguntaDe(id, sec.s.preguntas);
      const { rows: yo } = await pool.query(`SELECT correct FROM game_meeting_attendance WHERE meeting_id = $1 AND character_id = $2`, [id, ch.casa]);
      if (!yo.length && r.faltan <= 0) return res.status(409).json({ message: "Esa reunión ya terminó." });
      const leccion: ReunionLeccion = {
        id,
        anfitrion: r.anfitrion,
        titulo: sec.s.titulo,
        estudio: sec.e.titulo,
        verso: sec.s.versos[0] ?? { text: "", ref: "" },
        clave: sec.s.clave,
        pregunta: { p: q.p, ops: q.ops },
        faltan: r.faltan,
        resultado: yo.length ? { correcta: yo[0].correct === true, ok: q.ok, por: q.por } : null,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(leccion);
    } catch (err) {
      console.error("[reuniones] lección:", err);
      res.sendStatus(500);
    }
  });

  // responder: una sola vez por reunión; si acierta, ganan los dos
  app.post("/api/jerusalen/reuniones/:reunion/responder", async (req: Request, res: Response) => {
    const id = Math.floor(Number(req.params.reunion));
    const opcion = Number(req.body?.opcion);
    if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(opcion) || opcion < 0 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const [r] = await reuniones(ch.casa, `m.id = $2`, [id]);
      if (!r) return res.status(404).json({ message: "Esa reunión no existe." });
      if (r.mia) return res.status(409).json({ message: "Es tu reunión: tus vecinos responden la pregunta." });
      if (r.faltan <= 0) return res.status(409).json({ message: "Esa reunión ya terminó." });
      const sec = seccionDe(r.estudio, r.seccion);
      if (!sec || !sec.s.preguntas.length) return res.status(404).json({ message: "Esa reunión no existe." });
      const q = preguntaDe(id, sec.s.preguntas);
      const correcta = opcion === q.ok;
      const { rows: ins } = await pool.query(
        `INSERT INTO game_meeting_attendance (meeting_id, character_id, correct) VALUES ($1, $2, $3)
         ON CONFLICT (meeting_id, character_id) DO NOTHING RETURNING 1`,
        [id, ch.casa, correcta],
      );
      if (!ins.length) return res.status(409).json({ message: "Ya respondiste en esta reunión." });
      const out: ReunionRespuesta = { correcta, ok: q.ok, por: q.por, merito: 0, gozo: 0 };
      if (correcta) {
        // la casa premia hasta 10 vecinos (los primeros que aciertan)
        const { rows: premiado } = await pool.query(
          `UPDATE game_meeting_attendance SET rewarded = true
            WHERE meeting_id = $1 AND character_id = $2
              AND (SELECT count(*) FROM game_meeting_attendance WHERE meeting_id = $1 AND rewarded) < $3
            RETURNING 1`,
          [id, ch.casa, REUNION_PREMIO.maxPremiados],
        );
        if (premiado.length) {
          await sumarMerito(ch.id, REUNION_PREMIO.meritoVecino);
          await sumarGozo(ch.casa, REUNION_PREMIO.gozoVecino);
          await pool.query(`UPDATE game_houses SET offered = offered + $2 WHERE character_id = $1`, [r.anfitrionId, REUNION_PREMIO.honraCasa]);
          await sumarGozo(r.anfitrionId, REUNION_PREMIO.gozoCasa);
          forgetJer();
          out.merito = REUNION_PREMIO.meritoVecino;
          out.gozo = REUNION_PREMIO.gozoVecino;
        }
        const misiones = await avanzarMision(ch, "reunion", 1).catch(() => []);
        if (misiones.length) out.misiones = misiones;
      }
      res.json(out);
    } catch (err) {
      console.error("[reuniones] responder:", err);
      res.sendStatus(500);
    }
  });
}
