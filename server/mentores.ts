/**
 * Los mentores (reglas en shared/mentores.ts). Un nuevo elige a su mentor entre los vecinos de su barrio y sus amigos;
 * el servidor mira que el nuevo lo sea de verdad, que el mentor ya haya aprendido lo que va a enseñar, que no haya
 * bloqueos y que el mentor tenga lugar (tres a la vez). Los pasos salen de lo que ya guardan otras tablas (el primer
 * deber, la instrucción, los estudios, las obras de la casa y los días jugados) más uno que se hace juntos: encontrarse
 * en la ciudad (el servidor mira dónde están de verdad), donde el mentor le enseña un dicho de los ancianos.
 *
 * Cada paso se marca una sola vez (con `NOT (pasos ? paso)`) y da gozo a los dos; los que el nuevo ya había cumplido
 * antes de elegir mentor quedan marcados «antes», sin gozo. Al cumplir los seis, los dos reciben el manto de Elías.
 * Los pasos se revisan en cada visita a Jerusalén (server/regreso.ts) y cada vez que alguno de los dos abre los mentores.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { avisarA, presenciaDe, ubicacionDe } from "./ciudad-red";
import { relacionesDe } from "./sabio";
import { dondeEsta } from "./barrio";
import { agregarDicho, dichosDe } from "./dichos";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { caminoDe, type Camino } from "@shared/caminos";
import { leerObras, obrasHechas } from "@shared/obras";
import { nombreDeTitulo } from "@shared/album";
import { delTema, dichoParaEnsenar, type Dicho } from "@shared/dichos";
import {
  MENTORES, PASOS, PRENDA_MENTOR, leerPasos, ordenarPosibles, paso, pasosCumplidos, porQueNoElegir, porQueNoMentor, type AprendizVista, type AvisoMentor,
  type Companero, type DatosDePasos, type MentorPosible, type MentoresEstado, type PasoId, type PasosGuardados, type PasoVista, type Relacion,
} from "@shared/mentores";

export const MENTORES_SQL = `
CREATE TABLE IF NOT EXISTS "game_mentores" (
  "user_id" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "recibe" boolean NOT NULL DEFAULT true,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_aprendices" (
  "aprendiz_user" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "mentor_user" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "desde_at" timestamp NOT NULL DEFAULT now(),
  "pasos" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "juntos_dia" text,
  "cambios" integer NOT NULL DEFAULT 0,
  "terminado_at" timestamp,
  "terminado_con" integer REFERENCES "users"("id") ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS "idx_aprendices_mentor" ON "game_aprendices" ("mentor_user");
CREATE INDEX IF NOT EXISTS "idx_aprendices_terminado_con" ON "game_aprendices" ("terminado_con");`;

const JUEGO = JERUSALEN_JUEGO;

type Fila = {
  aprendiz_user: number;
  mentor_user: number | null;
  desde: string;
  pasos: PasosGuardados;
  juntos_dia: string | null;
  cambios: number;
  terminado: string | null;
  terminado_con: number | null;
};
/** El día de Texas de algo que pasó hace `s` segundos (las horas se restan en SQL: las columnas `timestamp` sin zona se
 * correrían al pasar por JavaScript). */
const diaDeHace = (s: unknown) => diaClave(new Date(Date.now() - Number(s || 0) * 1000));
const fila = (r: Record<string, unknown>): Fila => ({
  aprendiz_user: Number(r.aprendiz_user),
  mentor_user: r.mentor_user == null ? null : Number(r.mentor_user),
  desde: diaDeHace(r.desde_s),
  pasos: leerPasos(r.pasos),
  juntos_dia: (r.juntos_dia as string | null) ?? null,
  cambios: Number(r.cambios || 0),
  terminado: r.terminado_s == null ? null : diaDeHace(r.terminado_s),
  terminado_con: r.terminado_con == null ? null : Number(r.terminado_con),
});
const COLUMNAS = `aprendiz_user, mentor_user, EXTRACT(EPOCH FROM (now() - desde_at))::float AS desde_s, pasos, juntos_dia, cambios,
  EXTRACT(EPOCH FROM (now() - terminado_at))::float AS terminado_s, terminado_con`;

async function filaDe(aprendiz: number): Promise<Fila | null> {
  const { rows } = await pool.query(`SELECT ${COLUMNAS} FROM game_aprendices WHERE aprendiz_user = $1`, [aprendiz]);
  return rows[0] ? fila(rows[0]) : null;
}

/** Lo que dicen las otras tablas de una persona (por su cuenta): sus pasos y cuánto hace que llegó a Jerusalén. */
async function datosDe(userId: number): Promise<DatosDePasos & { titular: number | null }> {
  const { rows } = await pool.query(
    `SELECT t.id AS titular,
            EXTRACT(EPOCH FROM (now() - t.created_at))::float / 86400 AS llegada,
            EXISTS (SELECT 1 FROM game_characters c WHERE c.user_id = $1 AND c.game = $2 AND c.last_duty_at IS NOT NULL) AS deber,
            EXISTS (SELECT 1 FROM game_characters c WHERE c.user_id = $1 AND c.game = $2 AND c.instructed_at IS NOT NULL) AS instruccion,
            EXISTS (SELECT 1 FROM game_studies s JOIN game_characters c ON c.id = s.character_id
                     WHERE c.user_id = $1 AND c.game = $2 AND s.approved_at IS NOT NULL) AS estudio,
            (SELECT h.obras FROM game_houses h WHERE h.character_id = t.id) AS obras,
            (SELECT count(*)::int FROM game_dias_jugados d WHERE d.titular = t.id) AS dias
       FROM (SELECT id, created_at FROM game_characters WHERE user_id = $1 AND game = $2 ORDER BY id LIMIT 1) t`,
    [userId, JUEGO],
  );
  const r = rows[0];
  if (!r) return { titular: null, deber: false, instruccion: false, estudio: false, obra: false, dias: 0, diasDesdeLlegada: 0 };
  return {
    titular: Number(r.titular),
    deber: r.deber === true,
    instruccion: r.instruccion === true,
    estudio: r.estudio === true,
    obra: obrasHechas(leerObras(r.obras)).length > 0,
    dias: Number(r.dias || 0),
    diasDesdeLlegada: Number(r.llegada || 0),
  };
}

type Ficha = { userId: number; personajeId: number; titular: number; nombre: string; camino: Camino; titulo: string | null };
/** El nombre con que juega ahora cada cuenta (aprobada), su camino y el título que muestra. */
async function fichasDe(cuentas: number[]): Promise<Map<number, Ficha>> {
  const out = new Map<number, Ficha>();
  if (!cuentas.length) return out;
  const { rows } = await pool.query(
    `SELECT DISTINCT ON (c.user_id) c.user_id, c.id, c.name, c.path, u.display_name, u.username, t.id AS titular, t.titulo
       FROM game_characters c
       JOIN users u ON u.id = c.user_id AND u.is_active IS NOT FALSE
       JOIN LATERAL (SELECT c2.id, c2.titulo FROM game_characters c2 WHERE c2.user_id = c.user_id AND c2.game = c.game ORDER BY c2.id LIMIT 1) t ON true
      WHERE c.user_id = ANY($1::int[]) AND c.game = $2
      ORDER BY c.user_id, c.selected_at DESC NULLS LAST, c.slot`,
    [cuentas, JUEGO],
  );
  for (const r of rows)
    out.set(Number(r.user_id), {
      userId: Number(r.user_id),
      personajeId: Number(r.id),
      titular: Number(r.titular),
      nombre: nombreDe(r),
      camino: caminoDe(r.path),
      titulo: nombreDeTitulo(r.titulo),
    });
  return out;
}

async function guiadosDe(mentor: number): Promise<number> {
  const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_aprendices WHERE terminado_con = $1`, [mentor]);
  return Number(rows[0]?.n || 0);
}

async function gozoDe(titular: number | null): Promise<number | null> {
  if (!titular) return null;
  const { rows } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [titular]);
  return rows[0] ? Number(rows[0].gozo || 0) : null;
}

/** El manto al armario (una sola vez). */
async function darPrenda(titular: number) {
  await pool.query(`UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`, [titular, PRENDA_MENTOR.id]);
}

const avisar = (cuenta: number, m: AvisoMentor) => avisarA(cuenta, { t: "mentor", m });

/** Si dos cuentas son mentor y aprendiz ahora (para acompañarse aunque no sean vecinos ni amigos). */
export async function sonMentorYAprendiz(a: number, b: number): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT 1 FROM game_aprendices WHERE terminado_at IS NULL AND ((aprendiz_user = $1 AND mentor_user = $2) OR (aprendiz_user = $2 AND mentor_user = $1)) LIMIT 1`,
    [a, b],
  );
  return rows.length > 0;
}

/** Si alguna vez acompañó a un aprendiz hasta el final (el título «Idóneo para enseñar»). */
export async function esMentorFiel(userId: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT 1 FROM game_aprendices WHERE terminado_con = $1 LIMIT 1`, [userId]);
  return rows.length > 0;
}

// ---------------------------------------------------------------- los pasos
/** Marca un paso (una sola vez, mientras tiene mentor). Devuelve el mentor si lo marcó ahora. */
async function marcarPaso(aprendiz: number, id: PasoId): Promise<number | null> {
  const { rows } = await pool.query(
    `UPDATE game_aprendices SET pasos = pasos || jsonb_build_object($2::text, jsonb_build_object('at', $3::text))
      WHERE aprendiz_user = $1 AND mentor_user IS NOT NULL AND terminado_at IS NULL AND NOT (pasos ? $2::text)
      RETURNING mentor_user`,
    [aprendiz, id, new Date().toISOString()],
  );
  return rows[0]?.mentor_user == null ? null : Number(rows[0].mentor_user);
}

/** El gozo de un paso para los dos (el mentor, mientras no pase de los que le dan gozo) y el aviso en vivo. */
async function premiarPaso(aprendiz: number, mentor: number, id: PasoId) {
  const p = paso(id);
  const [fichas, guiados] = await Promise.all([fichasDe([aprendiz, mentor]), guiadosDe(mentor)]);
  const fa = fichas.get(aprendiz);
  const fm = fichas.get(mentor);
  const conGozo = guiados < MENTORES.maxPremiados;
  if (fa) await sumarGozo(fa.titular, MENTORES.gozoPaso.aprendiz, "mentores");
  if (fm && conGozo) await sumarGozo(fm.titular, MENTORES.gozoPaso.mentor, "mentores");
  const [ga, gm] = await Promise.all([gozoDe(fa?.titular ?? null), gozoDe(fm?.titular ?? null)]);
  avisar(aprendiz, { texto: `${p.icono} ¡Paso cumplido: ${p.titulo}! +${MENTORES.gozoPaso.aprendiz} de gozo, y también para ${fm?.nombre ?? "tu mentor"}.`, gozo: MENTORES.gozoPaso.aprendiz, gozoTotal: ga });
  avisar(mentor, { texto: `${p.icono} ${fa?.nombre ?? "Tu aprendiz"} cumplió «${p.titulo}».${conGozo ? ` +${MENTORES.gozoPaso.mentor} de gozo para ti.` : ""}`, gozo: conGozo ? MENTORES.gozoPaso.mentor : 0, gozoTotal: gm });
}

/** Si cumplió los seis pasos: termina (una sola vez), con gozo y el manto de Elías para los dos. */
async function revisarFin(aprendiz: number): Promise<boolean> {
  const { rows } = await pool.query(
    `UPDATE game_aprendices SET terminado_at = now(), terminado_con = mentor_user
      WHERE aprendiz_user = $1 AND mentor_user IS NOT NULL AND terminado_at IS NULL
        AND (SELECT count(*) FROM jsonb_object_keys(pasos) k WHERE k = ANY($2::text[])) >= $3
      RETURNING mentor_user`,
    [aprendiz, PASOS.map((p) => p.id), PASOS.length],
  );
  if (!rows[0]) return false;
  const mentor = Number(rows[0].mentor_user);
  const [fichas, guiados] = await Promise.all([fichasDe([aprendiz, mentor]), guiadosDe(mentor)]);
  const fa = fichas.get(aprendiz);
  const fm = fichas.get(mentor);
  // `guiados` ya cuenta a este aprendiz
  const conGozo = guiados <= MENTORES.maxPremiados;
  if (fa) {
    await sumarGozo(fa.titular, MENTORES.gozoFin.aprendiz, "mentores");
    await darPrenda(fa.titular);
  }
  if (fm) {
    if (conGozo) await sumarGozo(fm.titular, MENTORES.gozoFin.mentor, "mentores");
    await darPrenda(fm.titular);
  }
  const [ga, gm] = await Promise.all([gozoDe(fa?.titular ?? null), gozoDe(fm?.titular ?? null)]);
  avisar(aprendiz, {
    texto: `🧥 ¡Terminaste tus seis pasos con ${fm?.nombre ?? "tu mentor"}! +${MENTORES.gozoFin.aprendiz} de gozo y el manto de Elías para los dos. Ahora tú también puedes ser mentor.`,
    gozo: MENTORES.gozoFin.aprendiz,
    gozoTotal: ga,
    fin: true,
  });
  avisar(mentor, {
    texto: `🧥 ¡${fa?.nombre ?? "Tu aprendiz"} terminó sus seis pasos contigo!${conGozo ? ` +${MENTORES.gozoFin.mentor} de gozo,` : ""} el manto de Elías y el título «Idóneo para enseñar».`,
    gozo: conGozo ? MENTORES.gozoFin.mentor : 0,
    gozoTotal: gm,
    fin: true,
  });
  return true;
}

/**
 * Mira los pasos de un aprendiz con lo que dicen las otras tablas y da el premio de los que cumplió con su mentor.
 * Se llama en cada visita a Jerusalén (como mucho cada 2 minutos) y al abrir los mentores. Nunca rompe lo que la llama.
 */
export async function revisarAprendiz(aprendiz: number): Promise<void> {
  try {
    const f = await filaDe(aprendiz);
    if (!f || f.mentor_user == null || f.terminado) return;
    const faltan = pasosCumplidos(await datosDe(aprendiz)).filter((id) => !f.pasos[id]);
    for (const id of faltan) {
      const mentor = await marcarPaso(aprendiz, id);
      if (mentor) await premiarPaso(aprendiz, mentor, id);
    }
    await revisarFin(aprendiz);
  } catch (err) {
    console.error("[mentores] revisar:", err);
  }
}

/** Deshace el lazo (si un bloqueo apareció después): el aprendiz queda sin mentor, sin contarle un cambio. */
async function soltar(aprendiz: number, mentor: number) {
  await pool.query(`UPDATE game_aprendices SET mentor_user = NULL WHERE aprendiz_user = $1 AND mentor_user = $2 AND terminado_at IS NULL`, [aprendiz, mentor]);
}

// ---------------------------------------------------------------- lo que ve cada uno
const vistaPasos = (p: PasosGuardados): PasoVista[] => PASOS.map((x) => ({ id: x.id, hecho: !!p[x.id], antes: p[x.id]?.antes === true }));

function companero(f: Ficha, pres: ReturnType<typeof presenciaDe>): Companero {
  const p = pres.get(f.userId);
  return {
    userId: f.userId,
    personajeId: p?.personajeId ?? f.personajeId,
    nombre: f.nombre,
    camino: f.camino,
    enLinea: !!p,
    donde: p ? dondeEsta(p.canal, p.a) : null,
    enCiudad: !!p && p.canal !== "templo",
  };
}

/** Los mentores que puede elegir un nuevo: vecinos y amigos aprobados, sin bloqueos, que ya aprendieron y tienen lugar. */
async function posiblesPara(ch: PersonajeFila, rel: Awaited<ReturnType<typeof relacionesDe>>): Promise<MentorPosible[]> {
  const cuentas = [...new Set([...rel.vecinos, ...rel.amigos])].filter((u) => u !== ch.user_id && !rel.bloqueados.has(u)).slice(0, 120);
  if (!cuentas.length) return [];
  const { rows } = await pool.query(
    `SELECT t.user_id, t.titular, COALESCE(m.recibe, true) AS recibe,
            EXISTS (SELECT 1 FROM game_characters c WHERE c.user_id = t.user_id AND c.game = $2 AND c.instructed_at IS NOT NULL) AS instruccion,
            EXISTS (SELECT 1 FROM game_studies s JOIN game_characters c ON c.id = s.character_id
                     WHERE c.user_id = t.user_id AND c.game = $2 AND s.approved_at IS NOT NULL) AS estudio,
            (SELECT count(*)::int FROM game_dias_jugados d WHERE d.titular = t.titular) AS dias,
            EXISTS (SELECT 1 FROM game_aprendices a WHERE a.aprendiz_user = t.user_id AND a.mentor_user IS NOT NULL AND a.terminado_at IS NULL) AS es_aprendiz,
            (SELECT count(*)::int FROM game_aprendices a WHERE a.mentor_user = t.user_id AND a.terminado_at IS NULL) AS aprendices,
            (SELECT count(*)::int FROM game_aprendices a WHERE a.terminado_con = t.user_id) AS guiados
       FROM (SELECT user_id, MIN(id) AS titular FROM game_characters WHERE game = $2 AND user_id = ANY($1::int[]) GROUP BY user_id) t
       JOIN users u ON u.id = t.user_id AND u.is_active IS NOT FALSE
       LEFT JOIN game_mentores m ON m.user_id = t.user_id`,
    [cuentas, JUEGO],
  );
  const buenos = rows.filter(
    (r) =>
      r.recibe !== false &&
      !porQueNoMentor({ deber: true, instruccion: r.instruccion === true, estudio: r.estudio === true, obra: true, dias: Number(r.dias || 0), diasDesdeLlegada: 0 }, { esAprendiz: r.es_aprendiz === true }) &&
      Number(r.aprendices || 0) < MENTORES.maxAprendices,
  );
  if (!buenos.length) return [];
  const ids = buenos.map((r) => Number(r.user_id));
  const fichas = await fichasDe(ids);
  const pres = presenciaDe(ids);
  const out: Omit<MentorPosible, "sugerido">[] = [];
  for (const r of buenos) {
    const u = Number(r.user_id);
    const f = fichas.get(u);
    if (!f) continue;
    const relacion: Relacion = rel.vecinos.has(u) && rel.amigos.has(u) ? "ambos" : rel.vecinos.has(u) ? "vecino" : "amigo";
    const c = companero(f, pres);
    out.push({ userId: u, personajeId: c.personajeId, nombre: f.nombre, camino: f.camino, titulo: f.titulo, relacion, enLinea: c.enLinea, donde: c.donde, aprendices: Number(r.aprendices || 0), guiados: Number(r.guiados || 0), dias: Number(r.dias || 0) });
  }
  return ordenarPosibles(out, ch.camino).slice(0, 12);
}

async function estadoMentores(ch: PersonajeFila): Promise<MentoresEstado> {
  const yo = ch.user_id;
  const hoy = diaClave();
  // primero los pasos: los míos (si soy aprendiz) y los de mis aprendices
  await revisarAprendiz(yo);
  const { rows: mios } = await pool.query(`SELECT aprendiz_user FROM game_aprendices WHERE mentor_user = $1 AND terminado_at IS NULL`, [yo]);
  for (const r of mios) await revisarAprendiz(Number(r.aprendiz_user));

  // de a pocas consultas (la base de prueba corta conexiones con muchas a la vez)
  const [f, d] = await Promise.all([filaDe(yo), datosDe(yo)]);
  const rel = await relacionesDe(ch.casa, yo);
  const guiados = await guiadosDe(yo);
  const { rows: ap } = await pool.query(`SELECT ${COLUMNAS} FROM game_aprendices WHERE mentor_user = $1 AND terminado_at IS NULL ORDER BY desde_at`, [yo]);
  const { rows: rec } = await pool.query(`SELECT recibe FROM game_mentores WHERE user_id = $1`, [yo]);
  let aprendices = ap.map(fila);
  // un bloqueo que apareció después deshace el lazo
  let miFila = f;
  if (miFila?.mentor_user != null && !miFila.terminado && rel.bloqueados.has(miFila.mentor_user)) {
    await soltar(yo, miFila.mentor_user);
    miFila = { ...miFila, mentor_user: null };
  }
  for (const a of aprendices.filter((x) => rel.bloqueados.has(x.aprendiz_user))) await soltar(a.aprendiz_user, yo);
  aprendices = aprendices.filter((x) => !rel.bloqueados.has(x.aprendiz_user));

  const conMentor = miFila?.mentor_user != null && !miFila.terminado;
  const esMentor = aprendices.length > 0 || guiados > 0;
  const motivoElegir = conMentor ? null : porQueNoElegir(d, { yaTermino: !!miFila?.terminado, esMentor, cambios: miFila?.cambios ?? 0 });
  const motivoMentor = porQueNoMentor(d, { esAprendiz: conMentor });

  const cuentas = [...aprendices.map((a) => a.aprendiz_user), ...(conMentor ? [miFila!.mentor_user!] : []), ...(miFila?.terminado && miFila.terminado_con ? [miFila.terminado_con] : [])];
  const fichas = await fichasDe(cuentas);
  const pres = presenciaDe(cuentas);

  let miMentor: MentoresEstado["miMentor"] = null;
  if (conMentor) {
    const fm = fichas.get(miFila!.mentor_user!);
    if (fm) {
      const pasos = vistaPasos(miFila!.pasos);
      miMentor = { ...companero(fm, pres), desde: miFila!.desde, pasos, hechos: pasos.filter((p) => p.hecho).length, juntosHoy: miFila!.juntos_dia === hoy };
    }
  }
  const terminoCon = miFila?.terminado ? { nombre: (miFila.terminado_con && fichas.get(miFila.terminado_con)?.nombre) || "tu mentor", cuando: miFila.terminado } : null;
  const vistaAprendices: AprendizVista[] = [];
  for (const a of aprendices) {
    const fa = fichas.get(a.aprendiz_user);
    if (!fa) continue;
    const pasos = vistaPasos(a.pasos);
    vistaAprendices.push({ ...companero(fa, pres), desde: a.desde, pasos, hechos: pasos.filter((p) => p.hecho).length, juntosHoy: a.juntos_dia === hoy });
  }
  const puedeElegir = !conMentor && !motivoElegir;
  return {
    yo: { puedeElegir, motivoElegir, puedeSerMentor: !motivoMentor, motivoMentor, recibe: rec[0]?.recibe !== false, dias: d.dias },
    miMentor,
    terminoCon,
    posibles: puedeElegir ? await posiblesPara(ch, rel) : [],
    aprendices: vistaAprendices,
    guiados,
    premiados: Math.min(guiados, MENTORES.maxPremiados),
  };
}

// ---------------------------------------------------------------- rutas
export function registerMentoresRoutes(app: Express) {
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

  app.get("/api/jerusalen/mentores", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoMentores(ch));
    } catch (err) {
      console.error("[mentores] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Un nuevo elige a su mentor: { mentor } (la cuenta del mentor, de la lista de posibles)
  app.post("/api/jerusalen/mentores/elegir", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const mentor = Number(req.body?.mentor);
      if (!Number.isInteger(mentor) || mentor <= 0) return res.status(400).json({ message: "Elige a tu mentor." });
      if (mentor === ch.user_id) return res.status(400).json({ message: "No puedes ser tu propio mentor." });
      if (frenar(ch.user_id)) return res.status(429).json({ message: "Espera un momento" });
      const yo = ch.user_id;
      const [f, d, rel, { rows: soyMentor }] = await Promise.all([
        filaDe(yo),
        datosDe(yo),
        relacionesDe(ch.casa, yo),
        pool.query(`SELECT 1 FROM game_aprendices WHERE mentor_user = $1 OR terminado_con = $1 LIMIT 1`, [yo]),
      ]);
      if (f?.mentor_user != null && !f.terminado) return res.status(409).json({ message: "Ya tienes mentor. Si quieres otro, primero deja al que tienes." });
      const motivo = porQueNoElegir(d, { yaTermino: !!f?.terminado, esMentor: soyMentor.length > 0, cambios: f?.cambios ?? 0 });
      if (motivo) return res.status(409).json({ message: motivo });
      // con un bloqueo, como si no existiera
      if (rel.bloqueados.has(mentor)) return res.status(404).json({ message: "No encontramos a esa persona." });
      if (!rel.vecinos.has(mentor) && !rel.amigos.has(mentor)) return res.status(403).json({ message: "Tu mentor tiene que ser un vecino de tu barrio o un amigo." });
      const fm = (await fichasDe([mentor])).get(mentor);
      if (!fm) return res.status(404).json({ message: "No encontramos a esa persona en Jerusalén." });
      const [dm, fmFila] = await Promise.all([datosDe(mentor), filaDe(mentor)]);
      const mentorEsAprendiz = fmFila?.mentor_user != null && !fmFila.terminado;
      if (porQueNoMentor(dm, { esAprendiz: mentorEsAprendiz })) return res.status(409).json({ message: `${fm.nombre} todavía no puede ser mentor.` });

      // el lugar del mentor se cuida en una transacción (dos nuevos que lo eligen a la vez no pasan de tres)
      const client = await pool.connect();
      let ok = false;
      try {
        await client.query("BEGIN");
        await client.query(`INSERT INTO game_mentores (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [mentor]);
        const { rows: m } = await client.query(`SELECT recibe FROM game_mentores WHERE user_id = $1 FOR UPDATE`, [mentor]);
        if (m[0]?.recibe === false) {
          await client.query("ROLLBACK");
          return res.status(409).json({ message: `${fm.nombre} no está recibiendo aprendices ahora.` });
        }
        const { rows: n } = await client.query(`SELECT count(*)::int AS n FROM game_aprendices WHERE mentor_user = $1 AND terminado_at IS NULL`, [mentor]);
        if (Number(n[0]?.n || 0) >= MENTORES.maxAprendices) {
          await client.query("ROLLBACK");
          return res.status(409).json({ message: `${fm.nombre} ya acompaña a ${MENTORES.maxAprendices} aprendices. Elige otro mentor.` });
        }
        // lo que ya había cumplido queda marcado «antes» (sin gozo); lo marcado antes (con otro mentor) se queda
        const at = new Date().toISOString();
        const antes = Object.fromEntries(pasosCumplidos(d).map((id) => [id, { at, antes: true }]));
        const { rows: r } = await client.query(
          `INSERT INTO game_aprendices (aprendiz_user, mentor_user, pasos) VALUES ($1, $2, $3::jsonb)
           ON CONFLICT (aprendiz_user) DO UPDATE SET mentor_user = $2, desde_at = now(), juntos_dia = NULL, pasos = $3::jsonb || game_aprendices.pasos
             WHERE game_aprendices.mentor_user IS NULL AND game_aprendices.terminado_at IS NULL
           RETURNING 1`,
          [yo, mentor, JSON.stringify(antes)],
        );
        ok = r.length > 0;
        await client.query(ok ? "COMMIT" : "ROLLBACK");
      } catch (err) {
        await client.query("ROLLBACK").catch(() => undefined);
        throw err;
      } finally {
        client.release();
      }
      if (!ok) return res.status(409).json({ message: "Ya tienes mentor." });
      avisar(mentor, {
        texto: `🤝 ${(await fichasDe([yo])).get(yo)?.nombre ?? "Alguien que acaba de llegar"} te eligió como su mentor. Acompaña sus primeros pasos: lo ves en Misiones → Mentores.`,
        gozo: 0,
        gozoTotal: null,
      });
      res.json({ ...(await estadoMentores(ch)), elegido: fm.nombre });
    } catch (err) {
      console.error("[mentores] elegir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Dejar el lazo: el aprendiz deja a su mentor ({}), o el mentor deja a un aprendiz ({ aprendiz }).
  app.post("/api/jerusalen/mentores/dejar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.user_id)) return res.status(429).json({ message: "Espera un momento" });
      const yo = ch.user_id;
      const aprendiz = req.body?.aprendiz == null ? null : Number(req.body.aprendiz);
      if (aprendiz != null) {
        if (!Number.isInteger(aprendiz) || aprendiz <= 0) return res.status(400).json({ message: "¿A quién quieres dejar?" });
        const { rows } = await pool.query(
          `UPDATE game_aprendices SET mentor_user = NULL WHERE aprendiz_user = $1 AND mentor_user = $2 AND terminado_at IS NULL RETURNING 1`,
          [aprendiz, yo],
        );
        if (!rows.length) return res.status(404).json({ message: "Esa persona no es tu aprendiz." });
        avisar(aprendiz, { texto: "Tu mentor ya no puede acompañarte. Elige otro en Misiones → Mentores: lo que ya cumpliste se queda.", gozo: 0, gozoTotal: null });
      } else {
        const f = await filaDe(yo);
        if (f?.mentor_user == null || f.terminado) return res.status(404).json({ message: "No tienes mentor ahora." });
        const { rows } = await pool.query(
          `UPDATE game_aprendices SET mentor_user = NULL, cambios = cambios + 1 WHERE aprendiz_user = $1 AND mentor_user = $2 AND terminado_at IS NULL RETURNING 1`,
          [yo, f.mentor_user],
        );
        if (rows.length) avisar(f.mentor_user, { texto: `${(await fichasDe([yo])).get(yo)?.nombre ?? "Tu aprendiz"} siguió con otro camino: ya no es tu aprendiz.`, gozo: 0, gozoTotal: null });
      }
      res.json(await estadoMentores(ch));
    } catch (err) {
      console.error("[mentores] dejar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Recibir aprendices o no: { si }
  app.post("/api/jerusalen/mentores/recibir", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (typeof req.body?.si !== "boolean") return res.status(400).json({ message: "¿Quieres recibir aprendices?" });
      if (frenar(ch.user_id)) return res.status(429).json({ message: "Espera un momento" });
      await pool.query(
        `INSERT INTO game_mentores (user_id, recibe) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET recibe = $2, updated_at = now()`,
        [ch.user_id, req.body.si],
      );
      res.json(await estadoMentores(ch));
    } catch (err) {
      console.error("[mentores] recibir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Encontrarse en la ciudad (el mentor o el aprendiz): { con } = la cuenta del otro. Los dos tienen que estar en la
  // ciudad, a pocos pasos. Una vez por día: el mentor le enseña un dicho de los ancianos (y el aprendiz, si sabe uno
  // que al mentor le falte, se lo enseña a él). La primera vez se cumple el paso «con tu mentor».
  app.post("/api/jerusalen/mentores/juntos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const con = Number(req.body?.con);
      if (!Number.isInteger(con) || con <= 0) return res.status(400).json({ message: "¿Con quién te encontraste?" });
      if (frenar(ch.user_id, 1500)) return res.status(429).json({ message: "Espera un momento" });
      const yo = ch.user_id;
      const [mia, suya, rel] = await Promise.all([filaDe(yo), filaDe(con), relacionesDe(ch.casa, yo)]);
      const soyAprendiz = mia?.mentor_user === con && !mia.terminado;
      const esAprendiz = suya?.mentor_user === yo && !suya.terminado;
      if ((!soyAprendiz && !esAprendiz) || rel.bloqueados.has(con)) return res.status(404).json({ message: "Esa persona no es tu mentor ni tu aprendiz." });
      const aprendiz = soyAprendiz ? yo : con;
      const mentor = soyAprendiz ? con : yo;
      const pres = presenciaDe([yo, con]);
      const pa = pres.get(yo);
      const pb = pres.get(con);
      const fichas = await fichasDe([aprendiz, mentor]);
      const fa = fichas.get(aprendiz);
      const fm = fichas.get(mentor);
      if (!fa || !fm) return res.status(404).json({ message: "Esa persona no está en Jerusalén ahora." });
      const otro = fichas.get(con)?.nombre ?? "tu compañero";
      if (!pa || pa.canal === "templo") return res.status(409).json({ message: "Para encontrarse, ve a la ciudad." });
      if (!pb || pb.canal === "templo") return res.status(409).json({ message: `${otro} no está en la ciudad ahora. Usa «Invitar a venir».` });
      const ua = ubicacionDe(pa.personajeId);
      const ub = ubicacionDe(pb.personajeId);
      if (!ua || !ub || Math.hypot(ua.x - ub.x, ua.z - ub.z) > MENTORES.cerca) return res.status(409).json({ message: `Acércate a ${otro}: tienen que estar juntos, a pocos pasos.` });
      const hoy = diaClave();
      // una vez por día (se marca primero: si llegan los dos pedidos juntos, solo uno vale)
      const { rows: marca } = await pool.query(
        `UPDATE game_aprendices SET juntos_dia = $3 WHERE aprendiz_user = $1 AND mentor_user = $2 AND terminado_at IS NULL AND juntos_dia IS DISTINCT FROM $3 RETURNING 1`,
        [aprendiz, mentor, hoy],
      );
      if (!marca.length) return res.status(409).json({ message: "Ya se encontraron hoy. Mañana pueden aprender otro dicho juntos." });
      const [da, dm] = await Promise.all([dichosDe(fa.titular), dichosDe(fm.titular)]);
      // el mentor le enseña uno al aprendiz, y el aprendiz, si sabe uno que al mentor le falte, se lo enseña a él
      const ensenado: Dicho | null = dichoParaEnsenar(dm, da, hoy);
      const devuelto: Dicho | null = dichoParaEnsenar(da, [...dm], hoy);
      if (ensenado) await agregarDicho(fa.titular, ensenado.id);
      if (devuelto) await agregarDicho(fm.titular, devuelto.id);
      const nuevoPaso = await marcarPaso(aprendiz, "juntos");
      if (nuevoPaso) await premiarPaso(aprendiz, mentor, "juntos");
      await revisarFin(aprendiz);
      // lo que aprendió cada uno: al otro le llega en vivo; quien tocó lo ve en la respuesta
      const texto = (d: Dicho | null, de: string) =>
        `🤝 Te encontraste con ${de}.${d ? ` Te enseñó el dicho ${delTema(d.tema)}: ya está en tu álbum.` : " Ya conoces todos sus dichos: mañana los ancianos dirán otro."}`;
      const paraAprendiz: AvisoMentor = { texto: texto(ensenado, fm.nombre), gozo: 0, gozoTotal: null, dicho: ensenado ? { text: ensenado.text, ref: ensenado.ref } : null };
      const paraMentor: AvisoMentor = { texto: texto(devuelto, fa.nombre), gozo: 0, gozoTotal: null, dicho: devuelto ? { text: devuelto.text, ref: devuelto.ref } : null };
      avisar(soyAprendiz ? mentor : aprendiz, soyAprendiz ? paraMentor : paraAprendiz);
      res.json({
        ...(await estadoMentores(ch)),
        texto: (soyAprendiz ? paraAprendiz : paraMentor).texto,
        aprendi: soyAprendiz ? ensenado : devuelto,
        ensene: soyAprendiz ? devuelto : ensenado,
        paso: nuevoPaso != null,
      });
    } catch (err) {
      console.error("[mentores] juntos:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
