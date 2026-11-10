/**
 * Los estudios de Jerusalén en línea: el progreso de cada personaje (secciones y examen final) y lo
 * que ve la comunidad. Un estudio aprobado queda para siempre (no se borra con las temporadas) y
 * algunos cargos lo piden. El examen lo corrige el servidor con server/estudios-examen.ts.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  ESTUDIOS, EXAMEN_APRUEBA, EXAMEN_ESPERA, EXAMEN_PREGUNTAS, MERITO_ESTUDIO, MERITO_SECCION, estudioPorId,
  type EstudiosDe, type EstudiosEstado, type ExamenResultado, type MiEstudio, type PreguntaExamen,
} from "@shared/estudios";
import { EXAMENES, type FilaExamen } from "./estudios-examen";
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
CREATE INDEX IF NOT EXISTS "idx_game_studies_aprobados" ON "game_studies" ("study_id") WHERE "approved_at" IS NOT NULL;`;

type Fila = { study_id: string; sections: unknown; best: number; attempts: number; exam_ids: unknown; last_exam_at: string | null; approved_at: string | null; espera: number | null };

async function filasDe(characterId: number): Promise<Map<string, Fila>> {
  const { rows } = await pool.query(
    `SELECT study_id, sections, best, attempts, exam_ids, last_exam_at, approved_at,
            EXTRACT(EPOCH FROM (now() - last_exam_at))::float AS espera
       FROM game_studies WHERE character_id = $1`,
    [characterId],
  );
  return new Map(rows.map((r) => [String(r.study_id), r as Fila]));
}

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

function miEstudio(id: string, f: Fila | undefined, aprobados: Set<string>): MiEstudio {
  const e = estudioPorId(id)!;
  const secciones = lista(f?.sections).filter((s) => e.secciones.some((x) => x.id === s));
  const completas = secciones.length >= e.secciones.length;
  const requiereOk = !e.requiere || aprobados.has(e.requiere);
  const pasados = f?.espera == null ? Infinity : Number(f.espera);
  const esperaExamen = f?.approved_at || !f?.last_exam_at ? 0 : Math.max(0, Math.ceil(EXAMEN_ESPERA - pasados));
  return {
    id,
    secciones,
    aprobado: f?.approved_at ? new Date(f.approved_at).toISOString().slice(0, 10) : null,
    mejor: Number(f?.best || 0),
    puedeExamen: completas && requiereOk && esperaExamen === 0,
    esperaExamen,
  };
}

async function estadoDe(characterId: number): Promise<EstudiosEstado> {
  const filas = await filasDe(characterId);
  const aprobados = new Set([...filas.values()].filter((f) => f.approved_at).map((f) => f.study_id));
  return { mios: ESTUDIOS.map((e) => miEstudio(e.id, filas.get(e.id), aprobados)), aprobados: aprobados.size };
}

/** ¿Aprobó este estudio? (para los cargos). */
export async function aproboEstudio(characterId: number, studyId: string): Promise<boolean> {
  const { rows } = await pool.query(`SELECT 1 FROM game_studies WHERE character_id = $1 AND study_id = $2 AND approved_at IS NOT NULL`, [characterId, studyId]);
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

/** Mezcla fija por personaje e intento (así, pedirlo otra vez da el mismo orden). */
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

function preguntasDe(filas: FilaExamen[], semilla: number): PreguntaExamen[] {
  return mezcla(filas, semilla)
    .slice(0, EXAMEN_PREGUNTAS)
    .map((f, i) => ({ id: f[0], pregunta: f[1], opciones: mezcla([f[2], ...f[3]], semilla + i * 7919 + 1) }));
}

export function registerEstudiosRoutes(app: Express) {
  /** Personaje y cuenta aprobada, o la respuesta de error ya enviada. */
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
    if (!ch) res.status(404).json({ message: "Primero crea tu personaje." });
    return ch;
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
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDe(ch.id));
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
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(`s:${ch.id}`, 1500)) return res.status(429).json({ message: "Espera un momento" });
      if (e.requiere && !(await aproboEstudio(ch.id, e.requiere))) return res.status(409).json({ message: `Primero aprueba «${estudioPorId(e.requiere)?.titulo}».` });
      // la sección se agrega una sola vez (y solo esa vez da mérito)
      const { rows } = await pool.query(
        `WITH previo AS (SELECT sections FROM game_studies WHERE character_id = $1 AND study_id = $2)
         INSERT INTO game_studies (character_id, study_id, sections) VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (character_id, study_id) DO UPDATE SET
           sections = CASE WHEN game_studies.sections ? $4 THEN game_studies.sections ELSE game_studies.sections || $3::jsonb END,
           updated_at = now()
         RETURNING (SELECT sections FROM previo) AS antes`,
        [ch.id, e.id, JSON.stringify([seccion]), seccion],
      );
      const nueva = !lista(rows[0]?.antes).includes(seccion);
      let premio = 0;
      let misiones: { titulo: string; premio: number }[] = [];
      if (nueva) {
        premio = MERITO_SECCION;
        await sumarMerito(ch, premio);
        await sumarGozo(ch.id, GOZO.seccion);
        misiones = await avanzarMision(ch, "seccion", 1).catch(() => []);
      }
      res.json({ premio, estado: await estadoDe(ch.id), ...(misiones.length ? { misiones } : {}) });
    } catch (err) {
      console.error("[estudios] sección:", err);
      res.sendStatus(500);
    }
  });

  // El examen final: las preguntas sin la respuesta.
  app.post("/api/jerusalen/estudios/:estudio/examen", async (req: Request, res: Response) => {
    const e = estudioPorId(String(req.params.estudio));
    const banco = e ? EXAMENES[e.id] : undefined;
    if (!e || !banco?.length) return res.status(404).json({ message: "Estudio no encontrado" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(`e:${ch.id}`, 1500)) return res.status(429).json({ message: "Espera un momento" });
      const est = await estadoDe(ch.id);
      const mio = est.mios.find((m) => m.id === e.id)!;
      if (mio.secciones.length < e.secciones.length) return res.status(409).json({ message: "Primero termina todas las secciones del estudio." });
      if (e.requiere && !est.mios.find((m) => m.id === e.requiere)?.aprobado) return res.status(409).json({ message: `Primero aprueba «${estudioPorId(e.requiere)?.titulo}».` });
      if (mio.esperaExamen > 0) return res.status(429).json({ message: `Repasa las secciones y vuelve en ${mio.esperaExamen} segundos.`, espera: mio.esperaExamen });
      const { rows } = await pool.query(`SELECT attempts FROM game_studies WHERE character_id = $1 AND study_id = $2`, [ch.id, e.id]);
      const semilla = ch.id * 131 + Number(rows[0]?.attempts || 0) * 977 + e.id.length;
      const preguntas = preguntasDe(banco, semilla);
      await pool.query(`UPDATE game_studies SET exam_ids = $3::jsonb, updated_at = now() WHERE character_id = $1 AND study_id = $2`, [ch.id, e.id, JSON.stringify(preguntas.map((p) => p.id))]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ preguntas, aprueba: EXAMEN_APRUEBA });
    } catch (err) {
      console.error("[estudios] examen:", err);
      res.sendStatus(500);
    }
  });

  // Las respuestas del examen: se corrige aquí. Con 5 de 6 se aprueba; si no, se espera un poco.
  app.post("/api/jerusalen/estudios/:estudio/examen/respuestas", async (req: Request, res: Response) => {
    const e = estudioPorId(String(req.params.estudio));
    const banco = e ? EXAMENES[e.id] : undefined;
    const respuestas = req.body?.respuestas && typeof req.body.respuestas === "object" ? (req.body.respuestas as Record<string, unknown>) : null;
    if (!e || !banco?.length || !respuestas) return res.status(400).json({ message: "Envío no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(`r:${ch.id}`, 2000)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFila(ch.id, async (): Promise<ExamenResultado | { error: number; message: string }> => {
        const { rows } = await pool.query(`SELECT exam_ids, approved_at FROM game_studies WHERE character_id = $1 AND study_id = $2`, [ch.id, e.id]);
        const ids = lista(rows[0]?.exam_ids);
        if (!ids.length) return { error: 409, message: "Primero pide el examen." };
        const correcciones = ids.map((id) => {
          const f = banco.find((x) => x[0] === id)!;
          const dada = typeof respuestas[id] === "string" ? (respuestas[id] as string) : "";
          return { id, correcta: f[2], explica: f[4], ref: f[5], bien: dada === f[2] };
        });
        const aciertos = correcciones.filter((c) => c.bien).length;
        const aprobado = aciertos >= EXAMEN_APRUEBA;
        const primeraVez = aprobado && !rows[0]?.approved_at;
        await pool.query(
          `UPDATE game_studies SET attempts = attempts + 1, best = GREATEST(best, $3), last_exam_at = now(), exam_ids = NULL,
                  approved_at = CASE WHEN $4::boolean THEN COALESCE(approved_at, now()) ELSE approved_at END, updated_at = now()
            WHERE character_id = $1 AND study_id = $2`,
          [ch.id, e.id, aciertos, aprobado],
        );
        return { aciertos, de: ids.length, aprobado, primeraVez, premio: primeraVez ? MERITO_ESTUDIO : 0, correcciones, estado: await estadoDe(ch.id) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      if (out.primeraVez) {
        // el mérito va aparte de la fila (enFila no se anida)
        await sumarMerito(ch, out.premio);
        await sumarGozo(ch.id, GOZO.estudio);
        await evento(req.user!.id, `estudio:${e.id}`, `aprobó el estudio «${e.titulo}» en Jerusalén en línea`);
        out.estado = await estadoDe(ch.id);
      }
      res.json(out);
    } catch (err) {
      console.error("[estudios] respuestas:", err);
      res.sendStatus(500);
    }
  });

  // Lo que ve la comunidad: los estudios aprobados de un personaje.
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
      const { rows } = await pool.query(
        `SELECT study_id, to_char(approved_at, 'YYYY-MM-DD') AS fecha FROM game_studies WHERE character_id = $1 AND approved_at IS NOT NULL ORDER BY approved_at`,
        [id],
      );
      const out: EstudiosDe = {
        personajeId: id,
        nombre: nombreDe(p[0]),
        aprobados: rows
          .map((r) => ({ e: estudioPorId(String(r.study_id)), fecha: String(r.fecha) }))
          .filter((x) => x.e)
          .map((x) => ({ id: x.e!.id, titulo: x.e!.titulo, icono: x.e!.icono, fecha: x.fecha })),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[estudios] de:", err);
      res.sendStatus(500);
    }
  });
}
