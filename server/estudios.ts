/**
 * Los estudios de Jerusalén en línea: el progreso de cada PERSONA (no de cada personaje): las
 * secciones, el examen final y su registro. Lo aprendido con un personaje vale para todos los de la
 * misma cuenta (un solo jugador). Un estudio aprobado queda para siempre (no se borra con las
 * temporadas) y algunos cargos lo piden. El examen lo corrige el servidor con server/estudios-examen.ts.
 *
 * Cada intento trae preguntas que todavía no le salieron (cada estudio tiene 30 en su banco: alcanzan
 * para los EXAMEN_INTENTOS intentos sin repetir). Con 5 de 6 se aprueba y se puede seguir hasta el 6 de 6.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  ESTUDIOS, EXAMEN_APRUEBA, EXAMEN_ESPERA, EXAMEN_ESPERA_LARGA, EXAMEN_INTENTOS, EXAMEN_PREGUNTAS, MERITO_ESTUDIO, MERITO_SECCION, estudioPorId,
  type EstudiosDe, type EstudiosEstado, type ExamenResultado, type IntentoExamen, type MiEstudio, type PreguntaExamen,
} from "@shared/estudios";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { EXAMENES, type FilaExamen } from "./estudios-examen";
import { opcionesDeExamen } from "./orden-examen";
import { diaClave, enFila, esAdmin, evento, filaMerito, forgetJer, nombreDe, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { avanzarMision } from "./misiones";
import { GOZO, sumarGozo } from "./gozo";

export const ESTUDIOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_studies" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "study_id" text NOT NULL,
  "sections" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "best" integer NOT NULL DEFAULT 0,
  "attempts" integer NOT NULL DEFAULT 0,
  "exam_ids" jsonb,
  "last_exam_at" timestamp,
  "approved_at" timestamp,
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("character_id", "study_id")
);
CREATE INDEX IF NOT EXISTS "idx_game_studies_aprobados" ON "game_studies" ("study_id") WHERE "approved_at" IS NOT NULL;
ALTER TABLE "game_studies" ADD COLUMN IF NOT EXISTS "seen" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_studies" ADD COLUMN IF NOT EXISTS "history" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_studies" ADD COLUMN IF NOT EXISTS "perfect_at" timestamp;`;

type Fila = {
  study_id: string;
  sections: unknown;
  best: number;
  attempts: number;
  exam_ids: unknown;
  last_exam_at: string | null;
  approved_at: string | null;
  perfect_at: string | null;
  history: unknown;
  espera: number | null;
};

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const historial = (v: unknown): IntentoExamen[] =>
  Array.isArray(v)
    ? v
        .filter((x) => x && typeof x === "object")
        .map((x) => ({ aciertos: Number((x as IntentoExamen).aciertos) || 0, de: Number((x as IntentoExamen).de) || EXAMEN_PREGUNTAS, fecha: String((x as IntentoExamen).fecha || "") }))
    : [];

// ---------------------------------------------------------------- un solo jugador
const fusionados = new Set<number>();

/**
 * Quién guarda los estudios de una cuenta: su primer personaje. La primera vez se juntan ahí los
 * estudios que se hubieran hecho con otros personajes (secciones, mejor nota, intentos y aprobado).
 */
export async function titularEstudios(userId: number): Promise<number | null> {
  const { rows } = await pool.query(`SELECT id FROM game_characters WHERE user_id = $1 AND game = $2 ORDER BY id LIMIT 1`, [userId, JERUSALEN_JUEGO]);
  const titular = rows[0] ? Number(rows[0].id) : null;
  if (titular && !fusionados.has(userId)) {
    await fusionarEstudios(userId, titular);
    fusionados.add(userId);
    if (fusionados.size > 20000) fusionados.clear();
  }
  return titular;
}

async function fusionarEstudios(userId: number, titular: number) {
  const { rows } = await pool.query(
    `SELECT s.* FROM game_studies s JOIN game_characters c ON c.id = s.character_id WHERE c.user_id = $1 AND c.game = $2 AND s.character_id <> $3`,
    [userId, JERUSALEN_JUEGO, titular],
  );
  for (const r of rows) {
    await pool.query(
      `INSERT INTO game_studies (character_id, study_id, sections, best, attempts, approved_at, perfect_at, seen, history, updated_at)
       VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8::jsonb, $9::jsonb, now())
       ON CONFLICT (character_id, study_id) DO UPDATE SET
         sections = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements(game_studies.sections || EXCLUDED.sections) x),
         seen = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements(game_studies.seen || EXCLUDED.seen) x),
         history = game_studies.history || EXCLUDED.history,
         best = GREATEST(game_studies.best, EXCLUDED.best),
         attempts = game_studies.attempts + EXCLUDED.attempts,
         approved_at = LEAST(COALESCE(game_studies.approved_at, EXCLUDED.approved_at), COALESCE(EXCLUDED.approved_at, game_studies.approved_at)),
         perfect_at = LEAST(COALESCE(game_studies.perfect_at, EXCLUDED.perfect_at), COALESCE(EXCLUDED.perfect_at, game_studies.perfect_at)),
         updated_at = now()`,
      [titular, r.study_id, JSON.stringify(lista(r.sections)), Number(r.best || 0), Number(r.attempts || 0), r.approved_at, r.perfect_at ?? null, JSON.stringify(lista(r.seen)), JSON.stringify(historial(r.history))],
    );
    await pool.query(`DELETE FROM game_studies WHERE character_id = $1 AND study_id = $2`, [r.character_id, r.study_id]);
  }
}

async function filasDe(titular: number): Promise<Map<string, Fila>> {
  const { rows } = await pool.query(
    `SELECT study_id, sections, best, attempts, exam_ids, last_exam_at, approved_at, perfect_at, history,
            EXTRACT(EPOCH FROM (now() - last_exam_at))::float AS espera
       FROM game_studies WHERE character_id = $1`,
    [titular],
  );
  return new Map(rows.map((r) => [String(r.study_id), r as Fila]));
}

function miEstudio(id: string, f: Fila | undefined, aprobados: Set<string>): MiEstudio {
  const e = estudioPorId(id)!;
  const secciones = lista(f?.sections).filter((s) => e.secciones.some((x) => x.id === s));
  const completas = secciones.length >= e.secciones.length;
  const requiereOk = !e.requiere || aprobados.has(e.requiere);
  const pasados = f?.espera == null ? Infinity : Number(f.espera);
  const intentos = Number(f?.attempts || 0);
  const perfecto = !!f?.perfect_at;
  const aprobado = !!f?.approved_at;
  // los intentos seguidos son para aprobar o buscar el 6 de 6; si no aprobó, sigue pudiendo cada 30 minutos
  const agotados = intentos >= EXAMEN_INTENTOS;
  const espera = agotados && !aprobado ? EXAMEN_ESPERA_LARGA : EXAMEN_ESPERA;
  const esperaExamen = perfecto || !f?.last_exam_at ? 0 : Math.max(0, Math.ceil(espera - pasados));
  return {
    id,
    secciones,
    aprobado: f?.approved_at ? new Date(f.approved_at).toISOString().slice(0, 10) : null,
    mejor: Number(f?.best || 0),
    puedeExamen: completas && requiereOk && esperaExamen === 0 && !perfecto && (!agotados || !aprobado),
    esperaExamen,
    intentos,
    perfecto,
    historial: historial(f?.history),
  };
}

async function estadoDe(titular: number): Promise<EstudiosEstado> {
  const filas = await filasDe(titular);
  const aprobados = new Set([...filas.values()].filter((f) => f.approved_at).map((f) => f.study_id));
  return { mios: ESTUDIOS.map((e) => miEstudio(e.id, filas.get(e.id), aprobados)), aprobados: aprobados.size };
}

/** ¿Aprobó este estudio la persona de ese personaje (con cualquiera de sus personajes)? (para los cargos). */
export async function aproboEstudio(characterId: number, studyId: string): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT 1 FROM game_studies s
       JOIN game_characters c ON c.id = s.character_id
       JOIN game_characters yo ON yo.user_id = c.user_id AND yo.game = c.game
      WHERE yo.id = $1 AND s.study_id = $2 AND s.approved_at IS NOT NULL LIMIT 1`,
    [characterId, studyId],
  );
  return rows.length > 0;
}

/** Suma mérito a la temporada actual (una cosa a la vez por personaje). */
async function sumarMerito(ch: PersonajeFila, n: number) {
  await enFila(ch.id, async () => {
    const t = temporadaDe();
    await filaMerito(ch.id, t.n, diaClave());
    await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [ch.id, t.n, n]);
  });
  forgetJer();
}

/** Mezcla fija por persona e intento (así, pedirlo otra vez da el mismo orden). */
function mezcla<T>(arr: T[], semilla: number): T[] {
  const out = [...arr];
  let x = (semilla ^ 0x9e3779b9) >>> 0 || 1;
  for (let i = out.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    const j = x % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * El banco del examen de un estudio: sus propias preguntas, cada una con su cita (no se mezclan las de
 * la práctica de las secciones: el examen trae preguntas distintas de las que ya se practicaron).
 */
function bancoDe(studyId: string): FilaExamen[] {
  return EXAMENES[studyId] ?? [];
}

/**
 * Las preguntas de un intento: primero las que todavía no le salieron, después las demás. Cada una con el orden de
 * sus opciones (server/orden-examen.ts): con la mezcla de antes, todas las preguntas de un mismo examen tenían la
 * buena en la misma letra (y quien la adivinaba en la primera sacaba 6 de 6).
 */
function preguntasDe(banco: FilaExamen[], vistas: Set<string>, semilla: number): PreguntaExamen[] {
  const nuevas = mezcla(banco.filter((f) => !vistas.has(f[0])), semilla);
  const repetidas = mezcla(banco.filter((f) => vistas.has(f[0])), semilla + 17);
  return [...nuevas, ...repetidas]
    .slice(0, EXAMEN_PREGUNTAS)
    .map((f, i) => ({ id: f[0], pregunta: f[1], opciones: opcionesDeExamen(f[0], f[2], f[3], semilla, i) }));
}

export function registerEstudiosRoutes(app: Express) {
  /** Personaje y cuenta aprobada, o la respuesta de error ya enviada. */
  async function jugador(req: Request, res: Response): Promise<{ ch: PersonajeFila; titular: number } | null> {
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
    const titular = (await titularEstudios(req.user!.id)) ?? ch.id;
    return { ch, titular };
  }

  const ultimo = new Map<string, number>();
  function frenar(clave: string, ms: number): boolean {
    const now = Date.now();
    if (now - (ultimo.get(clave) || 0) < ms) return true;
    ultimo.set(clave, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  }

  app.get("/api/jerusalen/estudios", async (req: Request, res: Response) => {
    try {
      const j = await jugador(req, res);
      if (!j) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDe(j.titular));
    } catch (err) {
      console.error("[estudios] estado:", err);
      res.sendStatus(500);
    }
  });

  // Una sección leída y practicada (el teléfono revisa las preguntas de práctica).
  app.post("/api/jerusalen/estudios/:estudio/seccion", async (req: Request, res: Response) => {
    const e = estudioPorId(String(req.params.estudio));
    const seccion = typeof req.body?.seccion === "string" ? req.body.seccion : "";
    if (!e || !e.secciones.some((s) => s.id === seccion)) return res.status(400).json({ message: "Sección no válida" });
    try {
      const j = await jugador(req, res);
      if (!j) return;
      const { ch, titular } = j;
      if (frenar(`s:${titular}`, 1500)) return res.status(429).json({ message: "Espera un momento" });
      if (e.requiere && !(await aproboEstudio(ch.id, e.requiere))) return res.status(409).json({ message: `Primero aprueba «${estudioPorId(e.requiere)?.titulo}».` });
      // la sección se agrega una sola vez (y solo esa vez da mérito, al personaje con el que se estudió)
      const { rows } = await pool.query(
        `WITH previo AS (SELECT sections FROM game_studies WHERE character_id = $1 AND study_id = $2)
         INSERT INTO game_studies (character_id, study_id, sections) VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (character_id, study_id) DO UPDATE SET
           sections = CASE WHEN game_studies.sections ? $4 THEN game_studies.sections ELSE game_studies.sections || $3::jsonb END,
           updated_at = now()
         RETURNING (SELECT sections FROM previo) AS antes`,
        [titular, e.id, JSON.stringify([seccion]), seccion],
      );
      const nueva = !lista(rows[0]?.antes).includes(seccion);
      let premio = 0;
      let misiones: { titulo: string; premio: number }[] = [];
      if (nueva) {
        premio = MERITO_SECCION;
        await sumarMerito(ch, premio);
        await sumarGozo(ch.id, GOZO.seccion, "estudios");
        misiones = await avanzarMision(ch, "seccion", 1).catch(() => []);
      }
      res.json({ premio, estado: await estadoDe(titular), ...(misiones.length ? { misiones } : {}) });
    } catch (err) {
      console.error("[estudios] sección:", err);
      res.sendStatus(500);
    }
  });

  // El examen final: las preguntas sin la respuesta (primero las que todavía no le salieron).
  app.post("/api/jerusalen/estudios/:estudio/examen", async (req: Request, res: Response) => {
    const e = estudioPorId(String(req.params.estudio));
    const banco = e ? bancoDe(e.id) : [];
    if (!e || !banco.length) return res.status(404).json({ message: "Estudio no encontrado" });
    try {
      const j = await jugador(req, res);
      if (!j) return;
      const { titular } = j;
      if (frenar(`e:${titular}`, 1500)) return res.status(429).json({ message: "Espera un momento" });
      const est = await estadoDe(titular);
      const mio = est.mios.find((m) => m.id === e.id)!;
      if (mio.secciones.length < e.secciones.length) return res.status(409).json({ message: "Primero termina todas las secciones del estudio." });
      if (e.requiere && !est.mios.find((m) => m.id === e.requiere)?.aprobado) return res.status(409).json({ message: `Primero aprueba «${estudioPorId(e.requiere)?.titulo}».` });
      if (mio.perfecto) return res.status(409).json({ message: "Ya sacaste 6 de 6 en este estudio: es perfecto." });
      if (mio.intentos >= EXAMEN_INTENTOS && mio.aprobado) return res.status(409).json({ message: `Ya diste los ${EXAMEN_INTENTOS} intentos de este examen: tu registro quedó con ${mio.mejor} de ${EXAMEN_PREGUNTAS}.` });
      if (mio.esperaExamen > 0) {
        const cuando = mio.esperaExamen > 90 ? `${Math.ceil(mio.esperaExamen / 60)} minutos` : `${mio.esperaExamen} segundos`;
        return res.status(429).json({ message: mio.intentos >= EXAMEN_INTENTOS ? `Repasa las secciones: puedes volver a intentarlo en ${cuando}.` : `Lee las correcciones y vuelve en ${cuando}.`, espera: mio.esperaExamen });
      }
      const { rows } = await pool.query(`SELECT attempts, seen FROM game_studies WHERE character_id = $1 AND study_id = $2`, [titular, e.id]);
      const semilla = titular * 131 + Number(rows[0]?.attempts || 0) * 977 + e.id.length;
      const preguntas = preguntasDe(banco, new Set(lista(rows[0]?.seen)), semilla);
      await pool.query(`UPDATE game_studies SET exam_ids = $3::jsonb, updated_at = now() WHERE character_id = $1 AND study_id = $2`, [titular, e.id, JSON.stringify(preguntas.map((p) => p.id))]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ preguntas, aprueba: EXAMEN_APRUEBA, intento: mio.intentos + 1, de: EXAMEN_INTENTOS });
    } catch (err) {
      console.error("[estudios] examen:", err);
      res.sendStatus(500);
    }
  });

  // Las respuestas del examen: se corrigen aquí. Con 5 de 6 se aprueba; con 6 de 6 es perfecto.
  app.post("/api/jerusalen/estudios/:estudio/examen/respuestas", async (req: Request, res: Response) => {
    const e = estudioPorId(String(req.params.estudio));
    const banco = e ? bancoDe(e.id) : [];
    const respuestas = req.body?.respuestas && typeof req.body.respuestas === "object" ? (req.body.respuestas as Record<string, unknown>) : null;
    if (!e || !banco.length || !respuestas) return res.status(400).json({ message: "Envío no válido" });
    try {
      const j = await jugador(req, res);
      if (!j) return;
      const { ch, titular } = j;
      if (frenar(`r:${titular}`, 2000)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFila(titular, async (): Promise<ExamenResultado | { error: number; message: string }> => {
        const { rows } = await pool.query(`SELECT exam_ids, approved_at FROM game_studies WHERE character_id = $1 AND study_id = $2`, [titular, e.id]);
        const ids = lista(rows[0]?.exam_ids);
        if (!ids.length) return { error: 409, message: "Primero pide el examen." };
        // (si el banco cambió a mitad de un examen, la pregunta que ya no está no cuenta)
        const correcciones = ids.flatMap((id) => {
          const f = banco.find((x) => x[0] === id);
          if (!f) return [];
          const dada = typeof respuestas[id] === "string" ? (respuestas[id] as string) : "";
          return [{ id, correcta: f[2], explica: f[4], ref: f[5], bien: dada === f[2] }];
        });
        const de = correcciones.length;
        if (!de) return { error: 409, message: "Ese examen ya no está: pide uno nuevo." };
        const aciertos = correcciones.filter((c) => c.bien).length;
        const aprobado = aciertos >= Math.min(EXAMEN_APRUEBA, de);
        const perfecto = aciertos >= de;
        const primeraVez = aprobado && !rows[0]?.approved_at;
        const intento: IntentoExamen = { aciertos, de, fecha: diaClave() };
        await pool.query(
          `UPDATE game_studies SET attempts = attempts + 1, best = GREATEST(best, $3), last_exam_at = now(), exam_ids = NULL,
                  seen = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements(seen || $5::jsonb) x),
                  history = history || $6::jsonb,
                  approved_at = CASE WHEN $4::boolean THEN COALESCE(approved_at, now()) ELSE approved_at END,
                  perfect_at = CASE WHEN $7::boolean THEN COALESCE(perfect_at, now()) ELSE perfect_at END,
                  updated_at = now()
            WHERE character_id = $1 AND study_id = $2`,
          [titular, e.id, aciertos, aprobado, JSON.stringify(ids), JSON.stringify([intento]), perfecto],
        );
        return { aciertos, de, aprobado, primeraVez, premio: primeraVez ? MERITO_ESTUDIO : 0, correcciones, estado: await estadoDe(titular) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      if (out.primeraVez) {
        // el mérito va aparte de la fila (enFila no se anida), al personaje con el que se aprobó
        await sumarMerito(ch, out.premio);
        await sumarGozo(ch.id, GOZO.estudio, "estudios");
        await evento(req.user!.id, `estudio:${e.id}`, `aprobó el estudio «${e.titulo}» en Jerusalén en línea`);
        out.estado = await estadoDe(titular);
      }
      if (out.aciertos >= out.de) await evento(req.user!.id, `estudio-perfecto:${e.id}`, `sacó 6 de 6 en el examen de «${e.titulo}»`).catch(() => undefined);
      res.json(out);
    } catch (err) {
      console.error("[estudios] respuestas:", err);
      res.sendStatus(500);
    }
  });

  // Lo que ve la comunidad: los estudios y el registro de la persona de ese personaje.
  app.get("/api/jerusalen/estudios/de/:personajeId", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);
    try {
      const { rows: p } = await pool.query(
        `SELECT c.id, c.user_id, c.name, u.display_name, u.username, u.is_active FROM game_characters c JOIN users u ON u.id = c.user_id WHERE c.id = $1`,
        [id],
      );
      if (!p[0] || (p[0].is_active === false && !esAdmin(req))) return res.sendStatus(404);
      const titular = (await titularEstudios(Number(p[0].user_id))) ?? id;
      const { rows } = await pool.query(
        `SELECT study_id, best, attempts, to_char(approved_at, 'YYYY-MM-DD') AS fecha, perfect_at IS NOT NULL AS perfecto
           FROM game_studies WHERE character_id = $1 AND attempts > 0 ORDER BY approved_at NULLS LAST, updated_at`,
        [titular],
      );
      const filas = rows.map((r) => ({ e: estudioPorId(String(r.study_id)), r })).filter((x) => x.e);
      const out: EstudiosDe = {
        personajeId: id,
        nombre: nombreDe(p[0]),
        aprobados: filas.filter((x) => x.r.fecha).map((x) => ({ id: x.e!.id, titulo: x.e!.titulo, icono: x.e!.icono, fecha: String(x.r.fecha) })),
        registros: filas.map((x) => ({
          id: x.e!.id,
          titulo: x.e!.titulo,
          icono: x.e!.icono,
          mejor: Number(x.r.best || 0),
          de: EXAMEN_PREGUNTAS,
          intentos: Number(x.r.attempts || 0),
          aprobado: !!x.r.fecha,
          perfecto: x.r.perfecto === true,
        })),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[estudios] de:", err);
      res.sendStatus(500);
    }
  });
}
