/**
 * Jerusalén en línea, etapa 1 («Templo en línea»): personajes guardados en el servidor, las
 * preguntas difíciles corregidas aquí, el mérito por temporada y el cierre que reparte los cargos
 * del sacerdocio. Desde el 10 de noviembre de 2026 no depende del juego local: toda cuenta
 * aprobada entra y empieza desde el primer escalón.
 *
 * Nada del templo se simula en el servidor: el teléfono juega y manda sus deberes juntos cada
 * 15 s; aquí se revisan con topes creíbles y se suma el mérito. Lo que ven todos (la escalera de
 * cargos y la tabla de la temporada) se guarda en memoria unos segundos, como las tablas de hoy.
 */
import type { Express, Request, Response } from "express";
import { z } from "zod";
import { pool } from "./db";
import { forgetGameCache, publicName } from "./games";
import { BANCO, preguntaPorId, type PreguntaDificil } from "./jerusalen-banco";
import { SEGUNDOS_DIA, fechaDe, proximaFiesta, relojEnLinea } from "@shared/calendario";
import {
  CARGOS_DE_PRUEBA, CONSTANCIA_SEGUNDOS, DEBERES, DIAS_ACTIVO, DIAS_AVISO, DIAS_PIERDE, ESPERA_PREGUNTA, HORA_COMPLETA,
  JERUSALEN_JUEGO, MAX_PERSONAJES, MERITO_CONSTANCIA, MERITO_DEBER, MERITO_INSTRUCCION, MERITO_MIN_CARGO, MERITO_PREGUNTA, MERITO_TURNO, PARTES_INSTRUCCION,
  NOMBRES_SACERDOTE, NOMBRE_PROPIO, PREGUNTAS_DIA, SEGUNDOS_PREGUNTA, TEMPORADA_DIAS, TOPE_DIA, escalonIndice, escalonNombre,
  factorDelDia, type DeberId, type EscalonId, type JerusalenAcciones, type JerusalenEstado, type JerusalenPregunta,
  type JerusalenRespuesta, type JerusalenTitular,
} from "@shared/jerusalen";

const JUEGO = JERUSALEN_JUEGO;

export const JERUSALEN_SQL = `
CREATE TABLE IF NOT EXISTS "game_characters" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "slot" integer NOT NULL DEFAULT 1,
  "name" text,
  "path" text NOT NULL DEFAULT 'sacerdocio',
  "created_at" timestamp DEFAULT now(),
  "last_duty_at" timestamp
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_game_characters_slot" ON "game_characters" ("user_id", "game", "slot");
CREATE INDEX IF NOT EXISTS "idx_game_characters_duty" ON "game_characters" ("game", "last_duty_at");
CREATE TABLE IF NOT EXISTS "game_season_merit" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "season" integer NOT NULL,
  "merit" integer NOT NULL DEFAULT 0,
  "duties" integer NOT NULL DEFAULT 0,
  "answered" integer NOT NULL DEFAULT 0,
  "hits" integer NOT NULL DEFAULT 0,
  "day_key" text,
  "day_seconds" integer NOT NULL DEFAULT 0,
  "day_questions" integer NOT NULL DEFAULT 0,
  "days_served" integer NOT NULL DEFAULT 0,
  "last_batch_at" timestamp,
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("character_id", "season")
);
CREATE INDEX IF NOT EXISTS "idx_game_season_merit_board" ON "game_season_merit" ("season", "merit" DESC);
CREATE TABLE IF NOT EXISTS "game_question_log" (
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "season" integer NOT NULL,
  "question" text NOT NULL,
  "asked_at" timestamp NOT NULL DEFAULT now(),
  "answered_at" timestamp,
  "correct" boolean,
  PRIMARY KEY ("character_id", "season", "question")
);
CREATE TABLE IF NOT EXISTS "game_offices" (
  "season" integer NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "position" integer NOT NULL,
  "merit" integer NOT NULL DEFAULT 0,
  "can_high" boolean NOT NULL DEFAULT false,
  "office" text,
  "lost_at" timestamp,
  "lost_reason" text,
  PRIMARY KEY ("season", "character_id")
);
CREATE TABLE IF NOT EXISTS "game_seasons" (
  "game" text NOT NULL,
  "season" integer NOT NULL,
  "closed_at" timestamp DEFAULT now(),
  "candidates" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("game", "season")
);
CREATE TABLE IF NOT EXISTS "game_houses" (
  "character_id" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "game" text NOT NULL,
  "barrio" integer NOT NULL,
  "plot" integer NOT NULL,
  "level" integer NOT NULL DEFAULT 0,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "uq_game_houses_plot" ON "game_houses" ("game", "barrio", "plot");
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "city_banned_at" timestamp;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "instruction_parts" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "instructed_at" timestamp;
CREATE TABLE IF NOT EXISTS "user_blocks" (
  "blocker_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "blocked_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "created_at" timestamp DEFAULT now(),
  PRIMARY KEY ("blocker_id", "blocked_id")
);
CREATE INDEX IF NOT EXISTS "idx_user_blocks_blocked" ON "user_blocks" ("blocked_id");
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "servants" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "goods" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "collected_at" timestamp;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "prod_day" text;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "prod_seconds" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "offered" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "blessings_seen_at" timestamp;
CREATE TABLE IF NOT EXISTS "game_house_blessings" (
  "house_character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "visitor_user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "day_key" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  PRIMARY KEY ("house_character_id", "visitor_user_id", "day_key")
);
CREATE INDEX IF NOT EXISTS "idx_game_house_blessings_house" ON "game_house_blessings" ("house_character_id", "created_at");`;

// ---------------------------------------------------------------- días y temporadas
// El día del juego es el de Texas (America/Chicago): ahí está el ministerio y casi todos juegan
// en las Américas. Las temporadas son de 28 días a partir del lunes 9 de noviembre de 2026.
const ZONA = "America/Chicago";
const fmtDia = new Intl.DateTimeFormat("en-US", { timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit" });
export function diaClave(d = new Date()): string {
  const p: Record<string, string> = {};
  for (const x of fmtDia.formatToParts(d)) p[x.type] = x.value;
  return `${p.year}-${p.month}-${p.day}`;
}
const diaNumero = (clave: string) => {
  const [y, m, dd] = clave.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, dd) / 86400000);
};
const claveDe = (n: number) => new Date(n * 86400000).toISOString().slice(0, 10);
const EPOCA = diaNumero("2026-11-09");

export function temporadaDe(d = new Date()) {
  const hoy = diaNumero(diaClave(d));
  const n = Math.max(1, Math.floor((hoy - EPOCA) / TEMPORADA_DIAS) + 1);
  const inicio = EPOCA + (n - 1) * TEMPORADA_DIAS;
  const fin = inicio + TEMPORADA_DIAS - 1;
  return { n, inicio: claveDe(inicio), fin: claveDe(fin), diasRestantes: Math.max(1, fin - hoy + 1) };
}

// ---------------------------------------------------------------- lo que dice el modo local
// Ya no cierra la entrada ni da cargos: solo dice si la persona conoce el servicio del templo (para
// no pedirle la instrucción). La partida la guarda el teléfono; se revisa que sea creíble: tiempo
// jugado, días de servicio, los cargos anteriores en la historia, sabiduría y ofrendas. Vale
// también para las nuevas generaciones (la historia vuelve a empezar, pero quedan los logros,
// las cuentas y el cargo más alto).
const MIN_SEGUNDOS = [0, 180, 900, 1500, 2100];
const SABIDURIA_MIN = [0, 1, 4, 8, 12];
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

export type Requisito = { rango: number; creible: boolean; motivo: string | null };

export function requisitoLocal(data: unknown): Requisito {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { rango: 0, creible: false, motivo: "Todavía no hay una partida del modo local guardada en tu cuenta." };
  }
  const d = data as Record<string, unknown>;
  const rango = Math.max(0, Math.min(4, Math.round(Math.max(num(d.rangoMax), num(d.rank)))));
  if (rango < 1) return { rango, creible: true, motivo: null };
  const obj = (v: unknown) => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
  const story = obj(d.story), logros = obj(d.logros), stats = obj(d.stats), quizzes = obj(d.quizzes);
  const segundos = num(d.playSeconds);
  const no = (motivo: string): Requisito => ({ rango, creible: false, motivo });
  if (segundos < MIN_SEGUNDOS[rango]) return no("El tiempo jugado en la historia no alcanza para ese cargo.");
  if (num(d.day) > 3 + segundos / 200) return no("Los días de servicio no coinciden con el tiempo jugado.");
  for (let k = 1; k <= rango; k++) {
    if (story[`rango${k}`] !== true && num(logros[`h-rango${k}`]) < 1) return no("Falta un cargo anterior en la historia.");
  }
  const bien = Object.values(quizzes).filter((v) => v === true).length;
  if (Math.max(num(d.sabiduria), num(stats.preguntas), bien) < SABIDURIA_MIN[rango]) return no("Las respuestas de sabiduría no alcanzan para ese cargo.");
  if (Math.max(num(d.ofrendas), num(stats.ofrendas)) < 8) return no("Las ofrendas presentadas no alcanzan para ese cargo.");
  return { rango, creible: true, motivo: null };
}

// ---------------------------------------------------------------- memoria corta y filas
const cache = new Map<string, { at: number; value: unknown }>();
async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < ttlMs) return hit.value as T;
  const value = await fn();
  cache.set(key, { at: Date.now(), value });
  if (cache.size > 200) cache.clear();
  return value;
}
function forget(prefix = "") {
  for (const k of [...cache.keys()]) if (k.startsWith(prefix)) cache.delete(k);
}

/** Una cosa a la vez por personaje (deberes y preguntas tocan la misma fila de mérito). */
const filas = new Map<number, Promise<unknown>>();
function enFila<T>(key: number, fn: () => Promise<T>): Promise<T> {
  const prev = filas.get(key) || Promise.resolve();
  const next = prev.catch(() => null).then(fn);
  filas.set(key, next);
  void next
    .catch(() => null)
    .finally(() => {
      if (filas.get(key) === next) filas.delete(key);
    });
  return next;
}

export function esAdmin(req: Request): boolean {
  const role = req.user?.role;
  return req.isAuthenticated() && (role === "admin" || role === "director" || role === "staff_global");
}

export type PersonajeFila = {
  id: number;
  user_id: number;
  name: string | null;
  creado: string;
  dias_sin_servir: number | null;
  display_name: string | null;
  username: string | null;
  /** Partes terminadas de la instrucción del sacerdote (0 a 3). */
  instruccion: number;
};

export async function personajeDe(userId: number): Promise<PersonajeFila | null> {
  const { rows } = await pool.query(
    `SELECT c.id, c.user_id, c.name, u.display_name, u.username, c.instruction_parts,
            to_char(c.created_at, 'YYYY-MM-DD') AS creado,
            EXTRACT(EPOCH FROM (now() - c.last_duty_at))::float / 86400 AS dias_sin_servir
       FROM game_characters c JOIN users u ON u.id = c.user_id
      WHERE c.user_id = $1 AND c.game = $2
      ORDER BY c.slot LIMIT 1`,
    [userId, JUEGO],
  );
  const r = rows[0];
  if (!r) return null;
  return {
    ...r,
    id: Number(r.id),
    user_id: Number(r.user_id),
    dias_sin_servir: r.dias_sin_servir == null ? null : Number(r.dias_sin_servir),
    instruccion: Number(r.instruction_parts || 0),
  };
}

async function requisitoDe(userId: number): Promise<Requisito> {
  const { rows } = await pool.query(`SELECT data, backup FROM game_saves WHERE user_id = $1 AND game = $2`, [userId, JUEGO]);
  // la partida de ahora o su respaldo (si alguien reinstaló la app y empezó otra, no pierde lo que sabe)
  const a = requisitoLocal(rows[0]?.data);
  const b = requisitoLocal(rows[0]?.backup);
  return b.rango > a.rango ? b : a;
}

export const nombreDe = (r: { name?: string | null; display_name?: string | null; username?: string | null; user_id?: number | string }) => r.name || publicName(r);

export async function evento(userId: number, key: string, text: string) {
  await pool.query(
    `INSERT INTO game_events (user_id, game, key, text) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, game, key) DO NOTHING`,
    [userId, JUEGO, key, text],
  );
  forgetGameCache("actividad:");
}

const deprueba = CARGOS_DE_PRUEBA ? " (de prueba)" : "";

// ---------------------------------------------------------------- cargos y cierre de temporada
type Cargo = Exclude<EscalonId, "sacerdote" | "turno">;
const CUPOS: Record<Cargo, number> = { sumo: 1, principal: 3, jefe: 12 };

/**
 * Reparte otra vez los cargos de una temporada en el orden del cierre, saltando a quien los
 * perdió o tiene la cuenta desactivada. Quien lleva 7 días sin servir pierde su cargo y pasa al
 * siguiente de la lista. Avisa en la actividad a quien recibe un cargo o sube.
 */
async function revisarCargos(season: number, alCerrar = false) {
  await pool.query(
    `UPDATE game_offices o SET lost_at = now(), lost_reason = 'inactividad'
       FROM game_characters c
      WHERE o.season = $1 AND o.character_id = c.id AND o.office IS NOT NULL AND o.lost_at IS NULL
        AND (c.last_duty_at IS NULL OR c.last_duty_at < now() - ($2::int * interval '1 day'))`,
    [season, DIAS_PIERDE],
  );
  const { rows } = await pool.query(
    `SELECT o.character_id, o.can_high, o.office, c.user_id, u.is_active
       FROM game_offices o
       JOIN game_characters c ON c.id = o.character_id
       JOIN users u ON u.id = c.user_id
      WHERE o.season = $1 AND o.lost_at IS NULL
      ORDER BY o.position`,
    [season],
  );
  const libres: Record<Cargo, number> = { ...CUPOS };
  const usados = new Set<number>();
  const cambios: { id: number; user: number; antes: Cargo | null; ahora: Cargo | null }[] = [];
  for (const r of rows) {
    let ahora: Cargo | null = null;
    const user = Number(r.user_id);
    // un solo cargo alto por cuenta, aunque tenga varios personajes
    if (r.is_active === true && !usados.has(user)) {
      if (libres.sumo > 0 && r.can_high) ahora = "sumo";
      else if (libres.principal > 0) ahora = "principal";
      else if (libres.jefe > 0) ahora = "jefe";
      if (ahora) {
        libres[ahora]--;
        usados.add(user);
      }
    }
    const antes = (r.office as Cargo | null) || null;
    if (antes !== ahora) cambios.push({ id: Number(r.character_id), user, antes, ahora });
  }
  for (const c of cambios) await pool.query(`UPDATE game_offices SET office = $3 WHERE season = $1 AND character_id = $2`, [season, c.id, c.ahora]);
  for (const c of cambios) {
    if (!c.ahora || escalonIndice(c.ahora) <= escalonIndice(c.antes)) continue;
    const cargo = escalonNombre(c.ahora).toLowerCase();
    await evento(
      c.user,
      `cargo:T${season}:${c.ahora}`,
      alCerrar ? `recibió el cargo de ${cargo}${deprueba} para la temporada ${season} del templo en línea` : `ahora tiene el cargo de ${cargo}${deprueba} en el templo en línea`,
    );
  }
  forget("jer:");
}

/** Cierra una temporada: arma la lista de candidatos en orden de mérito y reparte los cargos de la siguiente. */
async function cerrarTemporada(n: number) {
  if (n < 0) return;
  const { rows: ya } = await pool.query(`SELECT 1 FROM game_seasons WHERE game = $1 AND season = $2`, [JUEGO, n]);
  if (ya.length) return;
  const client = await pool.connect();
  let candidatos = 0;
  try {
    await client.query("BEGIN");
    const { rows: nueva } = await client.query(
      `INSERT INTO game_seasons (game, season, closed_at) VALUES ($1, $2, now()) ON CONFLICT DO NOTHING RETURNING season`,
      [JUEGO, n],
    );
    if (!nueva.length) {
      await client.query("ROLLBACK");
      return;
    }
    // Candidatos: quienes sirvieron en los últimos días y juntaron el mérito mínimo, sin importar
    // el juego local. Solo puede ser sumo sacerdote quien ya fue principal (o sumo) en una temporada.
    const { rows } = await client.query(
      `SELECT m.character_id, m.merit,
              EXISTS (SELECT 1 FROM game_offices p
                       WHERE p.character_id = m.character_id AND p.season <= $1 AND p.office IN ('principal', 'sumo')) AS fue_principal
         FROM game_season_merit m
         JOIN game_characters c ON c.id = m.character_id
         JOIN users u ON u.id = c.user_id
        WHERE m.season = $1 AND m.merit >= $2 AND u.is_active IS TRUE
          AND c.last_duty_at > now() - ($3::int * interval '1 day')
        ORDER BY m.merit DESC, m.updated_at ASC
        LIMIT 500`,
      [n, MERITO_MIN_CARGO, DIAS_ACTIVO],
    );
    for (const r of rows) {
      candidatos++;
      await client.query(
        `INSERT INTO game_offices (season, character_id, position, merit, can_high) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
        [n + 1, r.character_id, candidatos, r.merit, r.fue_principal === true],
      );
    }
    await client.query(`UPDATE game_seasons SET candidates = $3 WHERE game = $1 AND season = $2`, [JUEGO, n, candidatos]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => null);
    throw err;
  } finally {
    client.release();
  }
  if (candidatos) console.log(`[jerusalen] temporada ${n} cerrada: ${candidatos} candidatos para la temporada ${n + 1}`);
  await revisarCargos(n + 1, true);
}

let ultimaRevision = 0;
let revisando: Promise<void> | null = null;
/** Cierra la temporada anterior si falta y revisa la inactividad (como mucho una vez por minuto). */
export function revisarTemporadas(forzar = false): Promise<void> {
  if (revisando) return revisando;
  if (!forzar && Date.now() - ultimaRevision < 60_000) return Promise.resolve();
  ultimaRevision = Date.now();
  revisando = (async () => {
    try {
      const t = temporadaDe();
      await cerrarTemporada(t.n - 1);
      await revisarCargos(t.n);
    } catch (err) {
      console.error("[jerusalen] revisar temporadas:", err);
    } finally {
      revisando = null;
    }
  })();
  return revisando;
}

// ---------------------------------------------------------------- lo que ven todos
type Titular = JerusalenTitular;
type Fila = { puesto: number; nombre: string; persona: string; merito: number; personajeId: number };

async function escaleraDe(season: number): Promise<Record<Cargo, Titular[]>> {
  return cached(`jer:escalera:${season}`, 20_000, async () => {
    const { rows } = await pool.query(
      `SELECT o.office, o.character_id, c.name, c.user_id, u.display_name, u.username
         FROM game_offices o
         JOIN game_characters c ON c.id = o.character_id
         JOIN users u ON u.id = c.user_id
        WHERE o.season = $1 AND o.office IS NOT NULL AND o.lost_at IS NULL
        ORDER BY o.position`,
      [season],
    );
    const out: Record<Cargo, Titular[]> = { sumo: [], principal: [], jefe: [] };
    for (const r of rows) {
      const cargo = r.office as Cargo;
      if (!out[cargo]) continue;
      out[cargo].push({ personajeId: Number(r.character_id), nombre: nombreDe(r), persona: publicName(r), isMe: false });
    }
    return out;
  });
}

async function tablaDe(season: number): Promise<Fila[]> {
  return cached(`jer:tabla:${season}`, 20_000, async () => {
    const { rows } = await pool.query(
      `SELECT m.character_id, m.merit, c.name, c.user_id, u.display_name, u.username
         FROM game_season_merit m
         JOIN game_characters c ON c.id = m.character_id
         JOIN users u ON u.id = c.user_id
        WHERE m.season = $1 AND m.merit > 0 AND u.is_active IS NOT FALSE
        ORDER BY m.merit DESC, m.updated_at ASC
        LIMIT 10`,
      [season],
    );
    return rows.map((r, i) => ({ puesto: i + 1, nombre: nombreDe(r), persona: publicName(r), merito: Number(r.merit), personajeId: Number(r.character_id) }));
  });
}

async function enLineaAhora(): Promise<number> {
  return cached("jer:ahora", 30_000, async () => {
    const { rows } = await pool.query(`SELECT count(*)::int AS n FROM game_characters WHERE game = $1 AND last_duty_at > now() - interval '4 minutes'`, [JUEGO]);
    return Number(rows[0]?.n || 0);
  });
}

/** La fecha y la fiesta de Jerusalén en línea ahora (y la próxima, en minutos de reloj). */
export function hoyEnJerusalen(): JerusalenEstado["jerusalen"] {
  const reloj = relojEnLinea();
  const f = fechaDe(reloj.dia);
  const h = f.fiestas[0];
  const p = proximaFiesta(reloj.dia);
  return {
    fecha: f.texto,
    fiesta: h ? { id: h.fiesta.id, nombre: h.fiesta.nombre, icono: h.fiesta.icono, merito: h.fiesta.merito, dia: h.dia, de: h.fiesta.duracion } : null,
    proxima: p ? { nombre: p.fiesta.nombre, icono: p.fiesta.icono, enMinutos: Math.max(1, Math.round(((p.enDias - reloj.hora) * SEGUNDOS_DIA) / 60)) } : null,
  };
}

/** Conoce el servicio del templo: jugó la historia, ya sirvió en línea o terminó la instrucción. */
function conoceElTemplo(requisito: Requisito, yaSirvio: boolean, ch: PersonajeFila | null): boolean {
  return requisito.rango >= 1 || yaSirvio || (ch?.instruccion ?? 0) >= PARTES_INSTRUCCION;
}

/** Para las preguntas difíciles: quien no conoce el templo primero termina la instrucción. */
async function conoceElTemploDe(ch: PersonajeFila): Promise<boolean> {
  if (ch.instruccion >= PARTES_INSTRUCCION) return true;
  const [req, sirvio] = await Promise.all([requisitoDe(ch.user_id), yaSirvioBastante(ch.id)]);
  return conoceElTemplo(req, sirvio, ch);
}

/** Sacerdotes con experiencia en el templo en línea (los de antes de la instrucción): 150 deberes o más. */
const DEBERES_EXPERIENCIA = 150;
async function yaSirvioBastante(characterId: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT COALESCE(SUM(duties), 0)::int AS d FROM game_season_merit WHERE character_id = $1`, [characterId]);
  return Number(rows[0]?.d || 0) >= DEBERES_EXPERIENCIA;
}

export function escalonPorMerito(merito: number): EscalonId {
  return merito >= MERITO_TURNO ? "turno" : "sacerdote";
}

async function estadoDe(req: Request): Promise<JerusalenEstado> {
  const user = req.user!;
  const t = temporadaDe();
  const hoy = diaClave();
  const [requisito, ch] = await Promise.all([requisitoDe(user.id), personajeDe(user.id)]);
  // para ser sumo sacerdote hay que haber sido principal (o sumo) en alguna temporada
  const fuePrincipal = ch
    ? (
        await pool.query(`SELECT 1 FROM game_offices WHERE character_id = $1 AND office IN ('principal', 'sumo') LIMIT 1`, [ch.id])
      ).rows.length > 0
    : false;
  // ya sirvió bastante en el templo en línea: conoce el servicio
  const yaSirvio = ch ? await yaSirvioBastante(ch.id) : false;
  let mio: JerusalenEstado["mio"] = null;
  if (ch) {
    const [{ rows: m }, { rows: of }] = await Promise.all([
      pool.query(
        `SELECT gm.merit, gm.duties, gm.answered, gm.hits, gm.day_key, gm.day_seconds, gm.day_questions,
                (SELECT count(*)::int + 1 FROM game_season_merit o WHERE o.season = gm.season AND o.merit > gm.merit) AS puesto
           FROM game_season_merit gm WHERE gm.character_id = $1 AND gm.season = $2`,
        [ch.id, t.n],
      ),
      pool.query(`SELECT office, lost_at, lost_reason FROM game_offices WHERE season = $1 AND character_id = $2`, [t.n, ch.id]),
    ]);
    const r = m[0];
    const merito = r ? Number(r.merit) : 0;
    const mismoDia = r?.day_key === hoy;
    const segundos = mismoDia ? Number(r.day_seconds) : 0;
    const o = of[0];
    const cargo = o && o.office && !o.lost_at ? (o.office as EscalonId) : null;
    const sinServir = ch.dias_sin_servir === null ? null : Math.floor(ch.dias_sin_servir);
    mio = {
      merito,
      puesto: merito > 0 && r ? Number(r.puesto) : null,
      escalon: cargo || escalonPorMerito(merito),
      cargo,
      deberes: r ? Number(r.duties) : 0,
      respondidas: r ? Number(r.answered) : 0,
      aciertos: r ? Number(r.hits) : 0,
      hoy: {
        segundos,
        factor: factorDelDia(segundos),
        preguntas: mismoDia ? Number(r.day_questions) : 0,
        preguntasMax: PREGUNTAS_DIA,
        constancia: segundos >= CONSTANCIA_SEGUNDOS,
      },
      diasSinServir: cargo && sinServir !== null && sinServir >= DIAS_AVISO ? sinServir : null,
      perdio:
        o && o.office && o.lost_at
          ? o.lost_reason === "admin"
            ? `La administración quitó tu cargo de ${escalonNombre(o.office as EscalonId).toLowerCase()}.`
            : `Tu cargo de ${escalonNombre(o.office as EscalonId).toLowerCase()} pasó al siguiente porque pasaste ${DIAS_PIERDE} días sin servir. Puedes volver a subir en esta temporada.`
          : null,
    };
  }
  const [escalera, tabla, enLinea] = await Promise.all([escaleraDe(t.n), tablaDe(t.n), enLineaAhora()]);
  const marcar = <T extends { personajeId: number }>(x: T) => ({ ...x, isMe: !!ch && x.personajeId === ch.id });
  return {
    cuentaAprobada: user.isActive === true,
    requisito: { ...requisito, puedeEntrar: true, puedeSumo: fuePrincipal, conoceTemplo: conoceElTemplo(requisito, yaSirvio, ch) },
    personaje: ch ? { id: ch.id, nombre: nombreDe(ch), propio: !ch.name, creado: ch.creado, instruccion: ch.instruccion } : null,
    temporada: { ...t, dePrueba: CARGOS_DE_PRUEBA },
    jerusalen: hoyEnJerusalen(),
    mio,
    escalera: (["sumo", "principal", "jefe"] as Cargo[]).map((id) => ({ id, cupo: CUPOS[id], titulares: escalera[id].map(marcar) })),
    tabla: tabla.map(marcar),
    enLinea,
    nombres: NOMBRES_SACERDOTE,
    esAdmin: esAdmin(req),
  };
}

// ---------------------------------------------------------------- deberes con topes creíbles
// Cuánto de cada deber cabe en un envío: un poco de golpe (el templo puede estar vacío al
// empezar) más un ritmo por segundo que sale del propio juego (cada cuánto llega una familia,
// cuánto arde la leña, cuándo se apagan las lámparas). Y un tope del mérito de cada envío.
const TOPE_BASE: Record<DeberId, number> = { ofrendas: 2, lena: 6, aceite: 7, panes: 12, incienso: 4, diezmos: 2, orantes: 14 };
const TOPE_RITMO: Record<DeberId, number> = { ofrendas: 0.25, lena: 0.12, aceite: 0.05, panes: 0.02, incienso: 0.02, diezmos: 0.12, orantes: 0 };
const meritoMaximo = (segundos: number) => Math.floor(4 + 0.75 * segundos);

/** Factor del tramo de segundos: la primera hora completa, las dos siguientes la mitad, después nada. */
function factorTramo(antes: number, despues: number): number {
  if (despues <= antes) return factorDelDia(antes);
  const parte = (lo: number, hi: number) => Math.max(0, Math.min(despues, hi) - Math.max(antes, lo));
  return (parte(0, HORA_COMPLETA) + parte(HORA_COMPLETA, TOPE_DIA) * 0.5) / (despues - antes);
}

const accionesSchema = z.object({
  acciones: z.record(z.string(), z.number().min(0).max(1000)),
  segundos: z.number().min(0).max(3600),
});

const ultimoEnvio = new Map<number, number>();
const ultimaPregunta = new Map<number, number>();

/** Mezcla fija por personaje y pregunta: si la pide otra vez, ve las opciones en el mismo orden. */
function mezclar(q: PreguntaDificil, semilla: number): string[] {
  const out = [q.correcta, ...q.falsas];
  let x = (semilla ^ 0x9e3779b9) >>> 0;
  for (const ch of q.id) x = (Math.imul(x ^ ch.charCodeAt(0), 2654435761) >>> 0) || 1;
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

async function filaMerito(characterId: number, season: number, hoy: string) {
  await pool.query(`INSERT INTO game_season_merit (character_id, season, day_key) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [characterId, season, hoy]);
  const { rows } = await pool.query(
    `SELECT merit, day_key, day_seconds, day_questions, EXTRACT(EPOCH FROM (now() - last_batch_at))::float AS desde
       FROM game_season_merit WHERE character_id = $1 AND season = $2`,
    [characterId, season],
  );
  return rows[0];
}

// ---------------------------------------------------------------- rutas
export function registerJerusalenRoutes(app: Express) {
  // Revisa las temporadas al arrancar y cada 10 minutos (el cierre no depende de que alguien entre).
  setTimeout(() => void revisarTemporadas(true), 15_000).unref?.();
  setInterval(() => void revisarTemporadas(true), 10 * 60_000).unref?.();

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

  app.get("/api/jerusalen/estado", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    void revisarTemporadas();
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoDe(req));
    } catch (err) {
      console.error("[jerusalen] estado:", err);
      res.sendStatus(500);
    }
  });

  // Crear el personaje (uno por cuenta en esta etapa) o cambiarle el nombre.
  async function guardarPersonaje(req: Request, res: Response, crear: boolean) {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
    const nombre = typeof req.body?.nombre === "string" ? req.body.nombre : "";
    if (nombre !== NOMBRE_PROPIO && !NOMBRES_SACERDOTE.some((x) => x.nombre === nombre)) return res.status(400).json({ message: "Elige un nombre de la lista." });
    const me = req.user!.id;
    try {
      const actual = await personajeDe(me);
      if (crear) {
        if (actual) return res.status(409).json({ message: "Ya tienes tu personaje en línea." });
        const { rows: cuenta } = await pool.query(`SELECT count(*)::int AS n FROM game_characters WHERE user_id = $1 AND game = $2`, [me, JUEGO]);
        if (Number(cuenta[0]?.n || 0) >= MAX_PERSONAJES) return res.status(409).json({ message: "Ya tienes tu personaje en línea." });
        await pool.query(
          `INSERT INTO game_characters (user_id, game, slot, name, path) VALUES ($1, $2, 1, $3, 'sacerdocio') ON CONFLICT DO NOTHING`,
          [me, JUEGO, nombre === NOMBRE_PROPIO ? null : nombre],
        );
        await evento(me, "jerusalen:entrada", "se consagró como sacerdote en Jerusalén en línea");
      } else {
        if (!actual) return res.status(404).json({ message: "Primero crea tu personaje." });
        await pool.query(`UPDATE game_characters SET name = $2 WHERE id = $1`, [actual.id, nombre === NOMBRE_PROPIO ? null : nombre]);
      }
      forget("jer:");
      res.json(await estadoDe(req));
    } catch (err) {
      console.error("[jerusalen] personaje:", err);
      res.sendStatus(500);
    }
  }
  app.post("/api/jerusalen/personaje", (req, res) => void guardarPersonaje(req, res, true));

  // La instrucción del sacerdote: una parte terminada (en orden). La primera vez que se terminan
  // las tres se suma un poco de mérito y la comunidad lo ve en la actividad.
  const ultimaParte = new Map<number, number>();
  app.post("/api/jerusalen/instruccion", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parte = Number(req.body?.parte);
    if (!Number.isInteger(parte) || parte < 1 || parte > PARTES_INSTRUCCION) return res.status(400).json({ message: "Parte no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimaParte.get(ch.id) || 0) < 3000) return res.status(429).json({ message: "Espera un momento" });
      ultimaParte.set(ch.id, now);
      if (ultimaParte.size > 5000) ultimaParte.clear();
      const { rows } = await pool.query(`SELECT instruction_parts, instructed_at FROM game_characters WHERE id = $1`, [ch.id]);
      const antes = Number(rows[0]?.instruction_parts || 0);
      if (parte > antes + 1) return res.status(409).json({ message: "Primero termina la parte anterior de la instrucción." });
      const primeraVez = parte === PARTES_INSTRUCCION && !rows[0]?.instructed_at;
      await pool.query(
        `UPDATE game_characters
            SET instruction_parts = GREATEST(instruction_parts, $2),
                instructed_at = CASE WHEN $2 >= $3 THEN COALESCE(instructed_at, now()) ELSE instructed_at END
          WHERE id = $1`,
        [ch.id, parte, PARTES_INSTRUCCION],
      );
      let premio = 0;
      if (primeraVez) {
        premio = MERITO_INSTRUCCION;
        await enFila(ch.id, async () => {
          const t = temporadaDe();
          await filaMerito(ch.id, t.n, diaClave());
          await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [ch.id, t.n, premio]);
        });
        await evento(req.user!.id, "jerusalen:instruido", "terminó la instrucción del sacerdote en el templo en línea");
        forget("jer:");
      }
      res.json({ partes: Math.max(antes, parte), premio, estado: await estadoDe(req) });
    } catch (err) {
      console.error("[jerusalen] instrucción:", err);
      res.sendStatus(500);
    }
  });
  app.patch("/api/jerusalen/personaje", (req, res) => void guardarPersonaje(req, res, false));

  // Deberes cumplidos desde el último envío (el teléfono los junta cada 15 s).
  app.post("/api/jerusalen/acciones", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    let body: z.infer<typeof accionesSchema>;
    try {
      body = accionesSchema.parse(req.body);
    } catch {
      return res.status(400).json({ message: "Envío no válido" });
    }
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      const espera = 10_000 - (now - (ultimoEnvio.get(ch.id) || 0));
      if (espera > 0) return res.status(429).json({ message: "Espera un momento", espera: Math.ceil(espera / 1000) });
      ultimoEnvio.set(ch.id, now);
      if (ultimoEnvio.size > 5000) ultimoEnvio.clear();
      const out = await enFila(ch.id, async (): Promise<JerusalenAcciones> => {
        const t = temporadaDe();
        const hoy = diaClave();
        const row = await filaMerito(ch.id, t.n, hoy);
        const antes = row.day_key === hoy ? Number(row.day_seconds) : 0;
        const desde = row.desde == null ? 20 : Math.max(0, Number(row.desde));
        const segundos = Math.max(0, Math.min(body.segundos, 30, desde + 2));
        let crudo = 0;
        let cuenta = 0;
        for (const k of DEBERES) {
          const pedido = Math.max(0, Math.floor(Number(body.acciones[k] || 0)));
          const c = Math.min(pedido, Math.floor(TOPE_BASE[k] + TOPE_RITMO[k] * segundos));
          cuenta += c;
          crudo += c * MERITO_DEBER[k];
        }
        // en las fiestas de Jerusalén (el mismo reloj para todos) el servicio vale más
        const bono = fechaDe(relojEnLinea().dia).fiestas[0]?.fiesta.merito ?? 1;
        crudo = Math.min(Math.round(crudo * bono), Math.floor(meritoMaximo(segundos) * bono));
        // el tiempo sin deberes no cuenta para la hora completa del día
        const despues = antes + (cuenta > 0 ? segundos : 0);
        let ganado = Math.round(crudo * factorTramo(antes, despues));
        const constancia = antes < CONSTANCIA_SEGUNDOS && despues >= CONSTANCIA_SEGUNDOS ? MERITO_CONSTANCIA : 0;
        ganado += constancia;
        const { rows: up } = await pool.query(
          `UPDATE game_season_merit
              SET merit = merit + $3, duties = duties + $4,
                  day_questions = CASE WHEN day_key = $5 THEN day_questions ELSE 0 END,
                  day_key = $5, day_seconds = $6, days_served = days_served + $7, last_batch_at = now(),
                  updated_at = CASE WHEN $3 > 0 THEN now() ELSE updated_at END
            WHERE character_id = $1 AND season = $2
            RETURNING merit`,
          [ch.id, t.n, ganado, cuenta, hoy, Math.round(despues), constancia ? 1 : 0],
        );
        if (cuenta > 0) await pool.query(`UPDATE game_characters SET last_duty_at = now() WHERE id = $1`, [ch.id]);
        const merito = Number(up[0]?.merit || 0);
        const { rows: of } = await pool.query(`SELECT office FROM game_offices WHERE season = $1 AND character_id = $2 AND office IS NOT NULL AND lost_at IS NULL`, [t.n, ch.id]);
        return {
          merito,
          ganado,
          escalon: (of[0]?.office as EscalonId) || escalonPorMerito(merito),
          hoy: { segundos: Math.round(despues), factor: factorDelDia(despues) },
          ...(constancia ? { constancia } : {}),
        };
      });
      res.json(out);
    } catch (err) {
      console.error("[jerusalen] acciones:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Una pregunta difícil (sin la respuesta). Si hay una abierta y en tiempo, devuelve esa misma.
  app.post("/api/jerusalen/pregunta", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimaPregunta.get(ch.id) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimaPregunta.set(ch.id, now);
      if (ultimaPregunta.size > 5000) ultimaPregunta.clear();
      if (!(await conoceElTemploDe(ch)))
        return res.status(403).json({ message: "Azarías: «Primero termina la instrucción del sacerdote; después te haré las preguntas difíciles»", instruccion: true });
      const out = await enFila(ch.id, async () => {
        const t = temporadaDe();
        const hoy = diaClave();
        const { rows: abierta } = await pool.query(
          `SELECT question, EXTRACT(EPOCH FROM (now() - asked_at))::float AS pasados
             FROM game_question_log
            WHERE character_id = $1 AND season = $2 AND answered_at IS NULL AND asked_at > now() - interval '25 seconds'
            ORDER BY asked_at DESC LIMIT 1`,
          [ch.id, t.n],
        );
        const enviar = (q: PreguntaDificil, pasados: number, quedanHoy: number): JerusalenPregunta => ({
          id: q.id,
          pregunta: q.pregunta,
          opciones: mezclar(q, ch.id * 31 + t.n),
          segundos: Math.max(1, Math.round(SEGUNDOS_PREGUNTA - pasados)),
          quedanHoy,
        });
        const row = await filaMerito(ch.id, t.n, hoy);
        const usadas = row.day_key === hoy ? Number(row.day_questions) : 0;
        if (abierta[0]) {
          const q = preguntaPorId(abierta[0].question);
          if (q) return { status: 200, body: enviar(q, Number(abierta[0].pasados) || 0, Math.max(0, PREGUNTAS_DIA - usadas)) };
        }
        // las que quedaron sin responder se cuentan como no respondidas a tiempo
        await pool.query(`UPDATE game_question_log SET answered_at = now(), correct = false WHERE character_id = $1 AND season = $2 AND answered_at IS NULL`, [ch.id, t.n]);
        if (usadas >= PREGUNTAS_DIA) return { status: 200, body: { agotadasHoy: true, message: `Ya respondiste las ${PREGUNTAS_DIA} preguntas de hoy. Mañana hay más.` } };
        const { rows: ult } = await pool.query(
          `SELECT EXTRACT(EPOCH FROM (now() - max(answered_at)))::float AS pasados FROM game_question_log WHERE character_id = $1 AND season = $2`,
          [ch.id, t.n],
        );
        const pasados = ult[0]?.pasados == null ? Infinity : Number(ult[0].pasados);
        if (pasados < ESPERA_PREGUNTA) return { status: 429, body: { message: "Azarías volverá a preguntarte en un momento.", espera: Math.ceil(ESPERA_PREGUNTA - pasados) } };
        const { rows: vistas } = await pool.query(`SELECT question FROM game_question_log WHERE character_id = $1 AND season = $2`, [ch.id, t.n]);
        const ya = new Set(vistas.map((v) => String(v.question)));
        const libres = BANCO.filter((q) => !ya.has(q.id));
        if (!libres.length) return { status: 200, body: { agotadas: true, message: "Ya respondiste todas las preguntas de esta temporada." } };
        const q = libres[Math.floor(Math.random() * libres.length)];
        await pool.query(`INSERT INTO game_question_log (character_id, season, question, asked_at) VALUES ($1, $2, $3, now())`, [ch.id, t.n, q.id]);
        await pool.query(
          `UPDATE game_season_merit
              SET day_seconds = CASE WHEN day_key = $3 THEN day_seconds ELSE 0 END,
                  day_questions = CASE WHEN day_key = $3 THEN day_questions + 1 ELSE 1 END,
                  day_key = $3
            WHERE character_id = $1 AND season = $2`,
          [ch.id, t.n, hoy],
        );
        return { status: 200, body: enviar(q, 0, Math.max(0, PREGUNTAS_DIA - usadas - 1)) };
      });
      res.status(out.status).json(out.body);
    } catch (err) {
      console.error("[jerusalen] pregunta:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // La respuesta: el servidor corrige, da el mérito y recién ahí muestra la respuesta correcta.
  app.post("/api/jerusalen/respuesta", async (req: Request, res: Response) => {
    const id = typeof req.body?.id === "string" ? req.body.id : "";
    const opcion = typeof req.body?.opcion === "string" ? req.body.opcion : "";
    const q = preguntaPorId(id);
    if (!q) return res.status(400).json({ message: "Pregunta no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const out = await enFila(ch.id, async () => {
        const t = temporadaDe();
        const hoy = diaClave();
        const { rows } = await pool.query(
          `SELECT answered_at, EXTRACT(EPOCH FROM (now() - asked_at))::float AS pasados
             FROM game_question_log WHERE character_id = $1 AND season = $2 AND question = $3`,
          [ch.id, t.n, q.id],
        );
        if (!rows[0]) return { status: 404, body: { message: "Esa pregunta no es tuya." } };
        if (rows[0].answered_at) return { status: 409, body: { message: "Ya respondiste esa pregunta." } };
        const aTiempo = Number(rows[0].pasados) <= SEGUNDOS_PREGUNTA + 5;
        const correcta = aTiempo && opcion === q.correcta;
        const row = await filaMerito(ch.id, t.n, hoy);
        const factor = factorDelDia(row.day_key === hoy ? Number(row.day_seconds) : 0);
        const ganado = correcta ? Math.round(MERITO_PREGUNTA * factor) : 0;
        await pool.query(`UPDATE game_question_log SET answered_at = now(), correct = $4 WHERE character_id = $1 AND season = $2 AND question = $3`, [ch.id, t.n, q.id, correcta]);
        const { rows: up } = await pool.query(
          `UPDATE game_season_merit
              SET merit = merit + $3, answered = answered + 1, hits = hits + $4,
                  updated_at = CASE WHEN $3 > 0 THEN now() ELSE updated_at END
            WHERE character_id = $1 AND season = $2
            RETURNING merit`,
          [ch.id, t.n, ganado, correcta ? 1 : 0],
        );
        // responder también es servir (Malaquías 2:7): cuenta para no perder el cargo
        await pool.query(`UPDATE game_characters SET last_duty_at = now() WHERE id = $1`, [ch.id]);
        const body: JerusalenRespuesta = { correcta, aTiempo, respuesta: q.correcta, explica: q.explica, ref: q.ref, ganado, merito: Number(up[0]?.merit || 0) };
        return { status: 200, body };
      });
      res.status(out.status).json(out.body);
    } catch (err) {
      console.error("[jerusalen] respuesta:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Administración: revisar ya las temporadas, o quitar un cargo (pasa al siguiente de la lista).
  app.post("/api/jerusalen/admin/revisar", async (req: Request, res: Response) => {
    if (!esAdmin(req)) return res.sendStatus(403);
    try {
      await revisarTemporadas(true);
      res.json(await estadoDe(req));
    } catch (err) {
      console.error("[jerusalen] revisar:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/admin/quitar-cargo", async (req: Request, res: Response) => {
    if (!esAdmin(req)) return res.sendStatus(403);
    const personajeId = Number(req.body?.personajeId);
    if (!Number.isInteger(personajeId) || personajeId <= 0) return res.status(400).json({ message: "Personaje no válido" });
    try {
      const t = temporadaDe();
      const { rowCount } = await pool.query(
        `UPDATE game_offices SET lost_at = now(), lost_reason = 'admin'
          WHERE season = $1 AND character_id = $2 AND office IS NOT NULL AND lost_at IS NULL`,
        [t.n, personajeId],
      );
      if (!rowCount) return res.status(404).json({ message: "Ese personaje no tiene un cargo esta temporada." });
      await revisarCargos(t.n);
      res.json(await estadoDe(req));
    } catch (err) {
      console.error("[jerusalen] quitar cargo:", err);
      res.sendStatus(500);
    }
  });
}
