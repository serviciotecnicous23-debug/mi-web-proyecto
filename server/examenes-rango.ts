/**
 * Los exámenes de rango (shared/examenes-rango.ts): el servidor da las preguntas de a una, sin la respuesta, con las
 * opciones en el orden que él decide (server/orden-examen.ts), lleva el reloj de cada pregunta (la que se responde
 * tarde, o la que se dejó de responder y venció, cuenta como mala), corrige y guarda cada parte. Al fallar una parte hay
 * que esperar para repetirla, y vuelve con preguntas que todavía no salieron. Con todas las partes aprobadas, el examen
 * queda aprobado para siempre: mérito, gozo, la prenda del rango y el aviso en la comunidad.
 *
 * El repaso de la temporada (para los cargos altos) usa los bancos de los exámenes 4 y 5 del camino. Los cargos y el
 * escalón «de turno» se revisan en server/jerusalen.ts con `aprobadosDe` y las tablas de aquí.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  CORRIDO_HORAS, GOZO_CORRIDO, MARGEN_RANGO, MEDIDA_RANGO, PREMIO_RANGO, REPASO_RANGO, SEGUNDOS_RANGO, esperaParteMin, examenRango, examenesDeCamino, idExamen,
  type ExamenRango, type ExamenRangoId, type ExamenVista, type FinParte, type ParteVista, type PreguntaRango, type RangoEstado, type RepasoVista, type RespuestaRango,
} from "@shared/examenes-rango";
import { CAMINOS, type Camino } from "@shared/caminos";
import { BANCO_RANGO, type FilaRango } from "./examenes-rango-banco";
import { numeroDe, opcionesDeExamen } from "./orden-examen";
import { diaClave, enFila, evento, filaMerito, forgetJer, nombreDe, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { anotarAlbum } from "./album";

export const RANGO_SQL = `
CREATE TABLE IF NOT EXISTS "game_rango" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "clave" text NOT NULL,
  "aprobada_at" timestamp,
  "intentos" integer NOT NULL DEFAULT 0,
  "fallos" integer NOT NULL DEFAULT 0,
  "mejor" integer NOT NULL DEFAULT 0,
  "vistas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "fallo_at" timestamp,
  "curso" jsonb,
  "curso_at" timestamp,
  "updated_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("character_id", "clave")
);
CREATE TABLE IF NOT EXISTS "game_rango_examenes" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "examen" text NOT NULL,
  "temporada" integer NOT NULL,
  "de_corrido" boolean NOT NULL DEFAULT false,
  "nota" integer NOT NULL DEFAULT 0,
  "de" integer NOT NULL DEFAULT 0,
  "aprobado_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("character_id", "examen")
);
ALTER TABLE "game_offices" ADD COLUMN IF NOT EXISTS "can_jefe" boolean NOT NULL DEFAULT true;`;

type Curso = { ids: string[]; i: number; aciertos: number; enviada: boolean; corrido: boolean; semilla: number };
type Fila = {
  clave: string;
  aprobada_at: string | null;
  fecha: string | null;
  intentos: number;
  fallos: number;
  mejor: number;
  vistas: unknown;
  curso: unknown;
  pasados_fallo: number | null;
  pasados_curso: number | null;
};

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const claveParte = (examen: ExamenRangoId, parte: number) => `${examen}:${parte}`;
const claveRepaso = (temporada: number) => `repaso:T${temporada}`;

function leerCurso(v: unknown): Curso | null {
  if (!v || typeof v !== "object") return null;
  const c = v as Partial<Curso>;
  if (!Array.isArray(c.ids) || typeof c.i !== "number") return null;
  return { ids: lista(c.ids), i: c.i, aciertos: Number(c.aciertos) || 0, enviada: c.enviada === true, corrido: c.corrido === true, semilla: Number(c.semilla) || 1 };
}

// ---------------------------------------------------------------- lo aprobado (para los cargos y el escalón)
const recuerdo = new Map<number, { hasta: number; ids: Set<ExamenRangoId> }>();

/** Los exámenes aprobados de cada personaje (se recuerdan 60 s; se olvidan al aprobar uno). */
export async function aprobadosDe(ids: number[]): Promise<Map<number, Set<ExamenRangoId>>> {
  const out = new Map<number, Set<ExamenRangoId>>();
  const faltan: number[] = [];
  const ahora = Date.now();
  for (const id of ids) {
    const r = recuerdo.get(id);
    if (r && r.hasta > ahora) out.set(id, r.ids);
    else faltan.push(id);
  }
  if (faltan.length) {
    const { rows } = await pool.query(`SELECT character_id, examen FROM game_rango_examenes WHERE character_id = ANY($1::int[])`, [faltan]);
    for (const id of faltan) out.set(id, new Set());
    for (const r of rows) out.get(Number(r.character_id))?.add(String(r.examen) as ExamenRangoId);
    for (const id of faltan) recuerdo.set(id, { hasta: ahora + 60_000, ids: out.get(id)! });
    if (recuerdo.size > 20_000) recuerdo.clear();
  }
  return out;
}

export function olvidarAprobados(id: number) {
  recuerdo.delete(id);
}

/** Los exámenes aprobados ahora mismo (sin lo recordado): para decidir si se puede dar una parte o el repaso. */
async function aprobadosAhora(characterId: number): Promise<Set<ExamenRangoId>> {
  const { rows } = await pool.query(`SELECT examen FROM game_rango_examenes WHERE character_id = $1`, [characterId]);
  return new Set(rows.map((r) => String(r.examen) as ExamenRangoId));
}

/** ¿Tiene el examen 2 de su camino? (para ser «de turno» con el mérito). */
export async function tieneExamenTurno(characterId: number, camino: Camino): Promise<boolean> {
  return (await aprobadosDe([characterId])).get(characterId)?.has(idExamen(camino, 2)) ?? false;
}

// ---------------------------------------------------------------- las filas y la vista
async function filasDe(characterId: number): Promise<Map<string, Fila>> {
  const { rows } = await pool.query(
    `SELECT clave, aprobada_at, to_char(aprobada_at, 'YYYY-MM-DD') AS fecha, intentos, fallos, mejor, vistas, curso,
            EXTRACT(EPOCH FROM (now() - fallo_at))::float AS pasados_fallo,
            EXTRACT(EPOCH FROM (now() - curso_at))::float AS pasados_curso
       FROM game_rango WHERE character_id = $1`,
    [characterId],
  );
  return new Map(rows.map((r) => [String(r.clave), r as Fila]));
}

function esperaDe(f: Fila | undefined, minutos: number): number {
  if (!f || f.aprobada_at || !f.fallos || f.pasados_fallo == null) return 0;
  return Math.max(0, Math.ceil(minutos * 60 - Number(f.pasados_fallo)));
}

function enCursoDe(f: Fila | undefined): ParteVista["enCurso"] {
  const c = leerCurso(f?.curso);
  return c ? { i: c.i, de: c.ids.length, aciertos: c.aciertos } : null;
}

type Aprobado = { examen: string; fecha: string; temporada: number; de_corrido: boolean };

async function aprobadosFilas(characterId: number): Promise<Map<string, Aprobado>> {
  const { rows } = await pool.query(
    `SELECT examen, to_char(aprobado_at, 'YYYY-MM-DD') AS fecha, temporada, de_corrido FROM game_rango_examenes WHERE character_id = $1`,
    [characterId],
  );
  return new Map(rows.map((r) => [String(r.examen), { examen: String(r.examen), fecha: String(r.fecha), temporada: Number(r.temporada), de_corrido: r.de_corrido === true }]));
}

function vistaExamen(e: ExamenRango, filas: Map<string, Fila>, aprobados: Map<string, Aprobado>): ExamenVista {
  const ap = aprobados.get(e.id);
  const anterior = e.escalon > 2 ? idExamen(e.camino, (e.escalon - 1) as 2 | 3 | 4) : null;
  const abierto = !anterior || aprobados.has(anterior);
  return {
    id: e.id,
    escalon: e.escalon,
    rango: e.rango,
    nombre: e.nombre,
    maestro: e.maestro,
    partes: e.partes.map((p): ParteVista => {
      const f = filas.get(claveParte(e.id, p.n));
      return {
        ...p,
        aprobada: f?.aprobada_at ? String(f.fecha) : null,
        intentos: Number(f?.intentos || 0),
        fallos: Number(f?.fallos || 0),
        mejor: Number(f?.mejor || 0),
        espera: esperaDe(f, esperaParteMin(Number(f?.fallos || 0))),
        enCurso: enCursoDe(f),
      };
    }),
    aprobado: ap?.fecha ?? null,
    deCorrido: ap?.de_corrido ?? false,
    abierto,
    porQue: abierto ? null : `Primero aprueba el examen de ${CAMINOS[e.camino].escalones[e.escalon - 2].toLowerCase()}.`,
    prenda: e.prenda,
    abre: e.abre,
  };
}

/** El repaso de la temporada: hace falta si aprobó el examen 4 en una temporada anterior y todavía no lo dio. */
function vistaRepaso(camino: Camino, filas: Map<string, Fila>, aprobados: Map<string, Aprobado>, temporada: number): RepasoVista | null {
  const cuatro = aprobados.get(idExamen(camino, 4));
  if (!cuatro) return null;
  const f = filas.get(claveRepaso(temporada));
  const aprobado = !!f?.aprobada_at;
  const delMismo = [idExamen(camino, 4), idExamen(camino, 5)].some((id) => (aprobados.get(id)?.temporada ?? 0) >= temporada);
  return {
    temporada,
    necesario: !aprobado && !delMismo,
    aprobado,
    espera: esperaDe(f, REPASO_RANGO.esperaMin),
    enCurso: enCursoDe(f),
    preguntas: REPASO_RANGO.preguntas,
    aprueba: REPASO_RANGO.aprueba,
  };
}

async function estadoDe(ch: PersonajeFila): Promise<RangoEstado> {
  const t = temporadaDe();
  const [filas, aprobados] = await Promise.all([filasDe(ch.id), aprobadosFilas(ch.id)]);
  const examenes = examenesDeCamino(ch.camino).map((e) => vistaExamen(e, filas, aprobados));
  const repaso = vistaRepaso(ch.camino, filas, aprobados, t.n);
  const siguiente = examenes.find((e) => !e.aprobado);
  let falta: RangoEstado["falta"] = null;
  if (repaso?.necesario) falta = { texto: "Para seguir (o llegar) a un cargo alto al cerrar la temporada te falta el repaso de esta temporada.", examen: "repaso" };
  else if (siguiente)
    falta = {
      texto:
        siguiente.escalon === 2
          ? `Para ser ${siguiente.rango.toLowerCase()} (con 150 de mérito) te falta su examen de rango.`
          : `Para poder recibir el cargo de ${siguiente.rango.toLowerCase()} al cerrar la temporada te falta su examen de rango.`,
      examen: siguiente.id,
    };
  return { camino: ch.camino, personaje: nombreDe(ch), examenes, repaso, falta };
}

// ---------------------------------------------------------------- las preguntas
function bancoParte(examen: ExamenRangoId, parte: number): FilaRango[] {
  return BANCO_RANGO[examen]?.[parte - 1] ?? [];
}

function bancoRepaso(camino: Camino, con5: boolean): FilaRango[] {
  return [...(BANCO_RANGO[idExamen(camino, 4)] ?? []).flat(), ...(con5 ? (BANCO_RANGO[idExamen(camino, 5)] ?? []).flat() : [])];
}

/** Mezcla fija con una semilla (para elegir las preguntas de un intento). */
function mezcla<T>(arr: T[], semilla: number): T[] {
  const out = [...arr];
  let x = (Math.imul((semilla | 0) ^ 0x2545f491, 2654435761) >>> 0) || 1;
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

function elegir(banco: FilaRango[], vistas: Set<string>, n: number, semilla: number): string[] {
  const nuevas = mezcla(banco.filter((f) => !vistas.has(f[0])), semilla);
  const repetidas = mezcla(banco.filter((f) => vistas.has(f[0])), semilla + 31);
  return [...nuevas, ...repetidas].slice(0, n).map((f) => f[0]);
}

function filaPorId(banco: FilaRango[], id: string): FilaRango | undefined {
  return banco.find((f) => f[0] === id);
}

/** Lo que se necesita para dar una parte (o el repaso): su clave, su banco, cuántas trae y cuántas aprueba. */
type Que = { examen: ExamenRangoId | "repaso"; parte: number; clave: string; banco: FilaRango[]; n: number; aprueba: number; esperaMin: (fallos: number) => number; def: ExamenRango | null };

async function suMerito(ch: PersonajeFila, n: number) {
  await enFila(ch.id, async () => {
    const t = temporadaDe();
    await filaMerito(ch.id, t.n, diaClave());
    await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [ch.id, t.n, n]);
  });
  forgetJer();
}

export function registerRangoRoutes(app: Express) {
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

  const ultimo = new Map<string, number>();
  const frenar = (clave: string, ms = 600) => {
    const ahora = Date.now();
    if (ahora - (ultimo.get(clave) || 0) < ms) return true;
    ultimo.set(clave, ahora);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  /** Qué se pide (una parte o el repaso), o el error ya enviado. */
  async function que(ch: PersonajeFila, body: unknown, res: Response): Promise<Que | null> {
    const b = (body && typeof body === "object" ? body : {}) as { examen?: unknown; parte?: unknown };
    if (b.examen === "repaso") {
      const mios = await aprobadosAhora(ch.id);
      if (!mios.has(idExamen(ch.camino, 4))) {
        res.status(409).json({ message: "El repaso es para quien ya aprobó el examen del cuarto escalón." });
        return null;
      }
      const t = temporadaDe();
      return { examen: "repaso", parte: 0, clave: claveRepaso(t.n), banco: bancoRepaso(ch.camino, mios.has(idExamen(ch.camino, 5))), n: REPASO_RANGO.preguntas, aprueba: REPASO_RANGO.aprueba, esperaMin: () => REPASO_RANGO.esperaMin, def: null };
    }
    const def = examenRango(b.examen);
    const parte = Math.floor(Number(b.parte));
    if (!def || !Number.isInteger(parte) || parte < 1 || parte > def.partes.length) {
      res.status(400).json({ message: "Ese examen o esa parte no existe." });
      return null;
    }
    if (def.camino !== ch.camino) {
      res.status(403).json({ message: `Ese examen es del camino de ${CAMINOS[def.camino].nombre.toLowerCase()}: dalo con tu personaje de ese camino.` });
      return null;
    }
    if (def.escalon > 2) {
      const anterior = idExamen(def.camino, (def.escalon - 1) as 2 | 3 | 4);
      if (!(await aprobadosAhora(ch.id)).has(anterior)) {
        res.status(409).json({ message: `Primero aprueba el examen de ${CAMINOS[def.camino].escalones[def.escalon - 2].toLowerCase()}.` });
        return null;
      }
    }
    const medida = MEDIDA_RANGO[def.escalon];
    return { examen: def.id, parte, clave: claveParte(def.id, parte), banco: bancoParte(def.id, parte), n: medida.preguntas, aprueba: medida.aprueba, esperaMin: esperaParteMin, def };
  }

  /** La fila de la parte (la crea si falta). */
  async function filaDe(ch: PersonajeFila, clave: string): Promise<Fila> {
    await pool.query(`INSERT INTO game_rango (character_id, clave) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [ch.id, clave]);
    const f = (await filasDe(ch.id)).get(clave);
    if (!f) throw new Error("sin fila de rango");
    return f;
  }

  function preguntaVista(q: Que, c: Curso, pasados: number): PreguntaRango {
    const f = filaPorId(q.banco, c.ids[c.i])!;
    return {
      examen: q.examen,
      parte: q.parte,
      n: c.i + 1,
      de: c.ids.length,
      pregunta: f[1],
      opciones: opcionesDeExamen(f[0], f[2], f[3], c.semilla, c.i),
      segundos: SEGUNDOS_RANGO,
      restan: Math.max(0, Math.ceil(SEGUNDOS_RANGO - pasados)),
      aciertos: c.aciertos,
    };
  }

  /**
   * Cierra el intento: aprobada o no (y la espera), las vistas y, si con esta parte quedó aprobado todo el examen, lo
   * anota una sola vez (con su temporada y si fue de corrido). Corre dentro de la fila del personaje.
   */
  async function cerrarIntento(ch: PersonajeFila, q: Que, c: Curso): Promise<FinParte> {
    const aprobada = c.aciertos >= q.aprueba;
    const { rows } = await pool.query(
      `UPDATE game_rango SET
          aprobada_at = CASE WHEN $3::boolean THEN COALESCE(aprobada_at, now()) ELSE aprobada_at END,
          mejor = GREATEST(mejor, $4),
          fallos = fallos + CASE WHEN $3::boolean THEN 0 ELSE 1 END,
          fallo_at = CASE WHEN $3::boolean THEN fallo_at ELSE now() END,
          vistas = (SELECT COALESCE(jsonb_agg(DISTINCT x), '[]'::jsonb) FROM jsonb_array_elements(vistas || $5::jsonb) x),
          curso = NULL, curso_at = NULL, updated_at = now()
        WHERE character_id = $1 AND clave = $2
        RETURNING fallos`,
      [ch.id, q.clave, aprobada, c.aciertos, JSON.stringify(c.ids)],
    );
    const fallos = Number(rows[0]?.fallos || 0);
    const fin: FinParte = {
      aprobada,
      aciertos: c.aciertos,
      de: c.ids.length,
      aprueba: q.aprueba,
      espera: aprobada ? 0 : q.esperaMin(fallos) * 60,
      examenAprobado: false,
      deCorrido: false,
      premio: null,
      prenda: null,
      ...(q.examen === "repaso" ? { repaso: true } : {}),
    };
    if (!aprobada || !q.def) return fin;
    // ¿quedó aprobado todo el examen?
    const { rows: partes } = await pool.query(
      `SELECT clave, intentos, mejor, EXTRACT(EPOCH FROM aprobada_at)::float AS t FROM game_rango
        WHERE character_id = $1 AND clave = ANY($2::text[]) AND aprobada_at IS NOT NULL`,
      [ch.id, q.def.partes.map((p) => claveParte(q.def!.id, p.n))],
    );
    if (partes.length < q.def.partes.length) return fin;
    const tiempos = partes.map((p) => Number(p.t));
    const deCorrido = partes.every((p) => Number(p.intentos) === 1) && Math.max(...tiempos) - Math.min(...tiempos) <= CORRIDO_HORAS * 3600;
    const nota = partes.reduce((s, p) => s + Number(p.mejor || 0), 0);
    const { rows: nuevo } = await pool.query(
      `INSERT INTO game_rango_examenes (character_id, examen, temporada, de_corrido, nota, de) VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING RETURNING 1`,
      [ch.id, q.def.id, temporadaDe().n, deCorrido, nota, q.def.partes.length * MEDIDA_RANGO[q.def.escalon].preguntas],
    );
    if (!nuevo.length) return fin;
    olvidarAprobados(ch.id);
    const premio = PREMIO_RANGO[q.def.escalon];
    return { ...fin, examenAprobado: true, deCorrido, premio: { merito: premio.merito, gozo: premio.gozo + (deCorrido ? GOZO_CORRIDO : 0) }, prenda: q.def.prenda };
  }

  /** Lo de afuera de la fila al aprobar un examen: el mérito, el gozo, la prenda, el álbum y el aviso. */
  async function premiar(req: Request, ch: PersonajeFila, q: Que, fin: FinParte) {
    if (!fin.examenAprobado || !fin.premio || !q.def) return;
    await suMerito(ch, fin.premio.merito);
    await sumarGozo(ch.id, fin.premio.gozo, "rango");
    if (fin.prenda) {
      await pool.query(`UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`, [ch.casa, fin.prenda.id]);
      await anotarAlbum(ch.casa).catch((err) => console.error("[rango] álbum:", err));
    }
    await evento(req.user!.id, `rango:${q.def.id}`, `aprobó el examen de ${q.def.rango.toLowerCase()}${fin.deCorrido ? " de corrido" : ""} en Jerusalén en línea`).catch(() => undefined);
    forgetJer();
  }

  app.get("/api/jerusalen/rango", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDe(ch));
    } catch (err) {
      console.error("[rango] estado:", err);
      res.sendStatus(500);
    }
  });

  // La pregunta que toca (sin la respuesta). Si no hay intento, lo empieza; si la pregunta enviada venció, cuenta como
  // mala y sigue con la próxima (y si era la última, cierra el intento y devuelve cómo le fue).
  app.post("/api/jerusalen/rango/pregunta", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(`p:${ch.id}`)) return res.status(429).json({ message: "Espera un momento" });
      const q = await que(ch, req.body, res);
      if (!q) return;
      if (!q.banco.length) return res.status(404).json({ message: "Ese examen todavía no tiene preguntas." });
      const corrido = req.body?.corrido === true;
      const out = await enFila(ch.id, async (): Promise<{ pregunta: PreguntaRango } | { fin: FinParte } | { error: number; message: string; espera?: number }> => {
        let f = await filaDe(ch, q.clave);
        if (f.aprobada_at) return { error: 409, message: q.examen === "repaso" ? "Ya diste el repaso de esta temporada." : "Ya aprobaste esa parte." };
        let c = leerCurso(f.curso);
        if (!c) {
          const espera = esperaDe(f, q.esperaMin(Number(f.fallos || 0)));
          if (espera > 0) return { error: 429, message: `Repasa y vuelve en ${espera > 90 ? `${Math.ceil(espera / 60)} minutos` : `${espera} segundos`}.`, espera };
          const intentos = Number(f.intentos || 0);
          const semilla = (Math.imul(ch.id, 7919) + intentos * 104729 + numeroDe(q.clave)) | 0;
          c = { ids: elegir(q.banco, new Set(lista(f.vistas)), q.n, semilla), i: 0, aciertos: 0, enviada: false, corrido, semilla };
          await pool.query(`UPDATE game_rango SET intentos = intentos + 1, curso = $3::jsonb, curso_at = NULL, updated_at = now() WHERE character_id = $1 AND clave = $2`, [ch.id, q.clave, JSON.stringify(c)]);
          f = await filaDe(ch, q.clave);
        }
        // la pregunta enviada que venció cuenta como mala (no se puede mirar y volver a pedirla)
        while (c.enviada && Number(f.pasados_curso ?? 0) > SEGUNDOS_RANGO + MARGEN_RANGO) {
          c = { ...c, i: c.i + 1, enviada: false };
          if (c.i >= c.ids.length) return { fin: await cerrarIntento(ch, q, c) };
          await pool.query(`UPDATE game_rango SET curso = $3::jsonb, curso_at = NULL WHERE character_id = $1 AND clave = $2`, [ch.id, q.clave, JSON.stringify(c)]);
          f = await filaDe(ch, q.clave);
        }
        if (!filaPorId(q.banco, c.ids[c.i])) {
          // (el banco cambió a mitad del intento: se empieza otro)
          await pool.query(`UPDATE game_rango SET curso = NULL, curso_at = NULL WHERE character_id = $1 AND clave = $2`, [ch.id, q.clave]);
          return { error: 409, message: "El examen cambió: vuelve a empezar la parte." };
        }
        if (!c.enviada) {
          c = { ...c, enviada: true };
          await pool.query(`UPDATE game_rango SET curso = $3::jsonb, curso_at = now() WHERE character_id = $1 AND clave = $2`, [ch.id, q.clave, JSON.stringify(c)]);
          return { pregunta: preguntaVista(q, c, 0) };
        }
        return { pregunta: preguntaVista(q, c, Number(f.pasados_curso ?? 0)) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message, ...(out.espera ? { espera: out.espera } : {}) });
      if ("fin" in out) await premiar(req, ch, q, out.fin);
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[rango] pregunta:", err);
      res.sendStatus(500);
    }
  });

  // La respuesta (la opción en el orden que se mostró): se corrige aquí. Tarde = mala.
  app.post("/api/jerusalen/rango/respuesta", async (req: Request, res: Response) => {
    const opcion = Math.floor(Number(req.body?.opcion));
    if (!Number.isInteger(opcion) || opcion < -1 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(`r:${ch.id}`)) return res.status(429).json({ message: "Espera un momento" });
      const q = await que(ch, req.body, res);
      if (!q) return;
      const out = await enFila(ch.id, async (): Promise<(RespuestaRango & { ok: true }) | { error: number; message: string }> => {
        const f = await filaDe(ch, q.clave);
        const c = leerCurso(f.curso);
        if (!c || !c.enviada) return { error: 409, message: "Primero pide la pregunta." };
        const fila = filaPorId(q.banco, c.ids[c.i]);
        if (!fila) return { error: 409, message: "Esa pregunta ya no está: pide la siguiente." };
        const opciones = opcionesDeExamen(fila[0], fila[2], fila[3], c.semilla, c.i);
        if (opcion >= opciones.length) return { error: 400, message: "Respuesta no válida" };
        const tarde = Number(f.pasados_curso ?? 0) > SEGUNDOS_RANGO + MARGEN_RANGO;
        const bien = !tarde && opcion >= 0 && opciones[opcion] === fila[2];
        const sigue: Curso = { ...c, i: c.i + 1, aciertos: c.aciertos + (bien ? 1 : 0), enviada: false };
        let fin: FinParte | null = null;
        if (sigue.i >= sigue.ids.length) fin = await cerrarIntento(ch, q, sigue);
        else await pool.query(`UPDATE game_rango SET curso = $3::jsonb, curso_at = NULL WHERE character_id = $1 AND clave = $2`, [ch.id, q.clave, JSON.stringify(sigue)]);
        return { ok: true, bien, tarde, correcta: fila[2], explica: fila[4], ref: fila[5], aciertos: sigue.aciertos, n: c.i + 1, de: c.ids.length, fin };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      if (out.fin) await premiar(req, ch, q, out.fin);
      const { ok: _ok, ...resp } = out;
      if (out.fin?.examenAprobado) {
        const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
        if (g[0]) resp.gozoTotal = Number(g[0].gozo);
      }
      res.json(resp);
    } catch (err) {
      console.error("[rango] respuesta:", err);
      res.sendStatus(500);
    }
  });
}
