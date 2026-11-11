/**
 * El barrio juntos (shared/barrio-juntos.ts): la misión del barrio de hoy y la copa de los barrios.
 *
 * - La misión: cada pocos segundos se mira la presencia de la ciudad (server/ciudad-red.ts): si hay al menos los
 *   vecinos pedidos del mismo barrio juntos en el lugar de su misión de hoy, empieza a contar; si se quedan juntos
 *   20 segundos, la cumplen (una vez por día por persona): mérito, gozo y puntos para la copa. Mientras están en el
 *   lugar, la red les dice cuántos hay y cuánto falta.
 * - La copa: `sumarALaCopa` la llaman los deberes del templo, los encargos, el concurso, los duelos, los consejos y
 *   las misiones juntos. Los puntos de la semana ordenan la tabla; los de siempre suben el nivel del barrio. Los tres
 *   primeros de la semana pasada dan gozo a cada vecino que aportó (se entrega la primera vez que vuelve).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, filaMerito, forgetJer, personajeDe, temporadaDe } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { avisarA, posicionesPorBarrio } from "./ciudad-red";
import {
  APORTE_COPA, COPA_PUNTOS, GOZO_JUNTOS, JUNTOS_SEGUNDOS, MERITO_JUNTOS, PREMIO_COPA, misionJuntosDelDia, nivelDeBarrio,
  type CopaEstado, type FilaCopa, type FuenteCopa, type MisionJuntos,
} from "@shared/barrio-juntos";
import { AREA_RECT, areaDeBarrio, nombreDeBarrio } from "@shared/ciudad";

export const BARRIO_JUNTOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_barrio_copa" (
  "barrio" integer NOT NULL,
  "week_key" text NOT NULL,
  "puntos" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("barrio", "week_key")
);
CREATE INDEX IF NOT EXISTS "idx_game_barrio_copa_semana" ON "game_barrio_copa" ("week_key", "puntos");
CREATE TABLE IF NOT EXISTS "game_barrio_copa_aportes" (
  "week_key" text NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "puntos" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("week_key", "titular")
);
CREATE INDEX IF NOT EXISTS "idx_game_barrio_copa_aportes_barrio" ON "game_barrio_copa_aportes" ("week_key", "barrio");
CREATE TABLE IF NOT EXISTS "game_barrio_nivel" (
  "barrio" integer PRIMARY KEY,
  "puntos" bigint NOT NULL DEFAULT 0,
  "copas" integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS "game_barrio_copa_cerrada" (
  "week_key" text PRIMARY KEY,
  "podio" jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE TABLE IF NOT EXISTS "game_barrio_copa_premios" (
  "week_key" text NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "puesto" integer NOT NULL,
  "gozo" integer NOT NULL,
  PRIMARY KEY ("week_key", "titular")
);
CREATE TABLE IF NOT EXISTS "game_barrio_juntos" (
  "dia" text NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "mision" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("dia", "titular")
);`;

/** El lunes de la semana (día de Texas), igual que server/misiones.ts (sin importarlo: misiones llama a la copa). */
function semanaDe(dia = diaClave()): string {
  const d = new Date(`${dia}T12:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
function semanaPasada(): string {
  const d = new Date(`${semanaDe()}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 7);
  return d.toISOString().slice(0, 10);
}

/** El titular y el barrio de un personaje (la casa es de la persona: la guarda su primer personaje). */
const casaDePersonaje = new Map<number, { titular: number; barrio: number | null; at: number }>();
async function casaDe(personajeId: number): Promise<{ titular: number; barrio: number | null }> {
  const hit = casaDePersonaje.get(personajeId);
  if (hit && Date.now() - hit.at < 10 * 60_000) return hit;
  const { rows } = await pool.query(
    `SELECT t.titular, h.barrio FROM (SELECT MIN(c2.id) AS titular FROM game_characters c2 JOIN game_characters c ON c.user_id = c2.user_id AND c.game = c2.game WHERE c.id = $1) t
       LEFT JOIN game_houses h ON h.character_id = t.titular`,
    [personajeId],
  );
  const out = { titular: Number(rows[0]?.titular || personajeId), barrio: rows[0]?.barrio == null ? null : Number(rows[0].barrio), at: Date.now() };
  if (casaDePersonaje.size > 5000) casaDePersonaje.clear();
  if (out.barrio) casaDePersonaje.set(personajeId, out);
  return out;
}

/**
 * Suma a la copa del barrio de la persona (los puntos de la semana y los de siempre). Nunca rompe lo que la llama:
 * si algo falla, solo se anota.
 */
export async function sumarALaCopa(personajeId: number, fuente: FuenteCopa, veces = 1): Promise<void> {
  const puntos = Math.round(COPA_PUNTOS[fuente] * veces);
  if (puntos <= 0) return;
  try {
    const { titular, barrio } = await casaDe(personajeId);
    if (!barrio) return;
    const semana = semanaDe();
    await pool.query(
      `INSERT INTO game_barrio_copa (barrio, week_key, puntos) VALUES ($1, $2, $3) ON CONFLICT (barrio, week_key) DO UPDATE SET puntos = game_barrio_copa.puntos + $3`,
      [barrio, semana, puntos],
    );
    await pool.query(
      `INSERT INTO game_barrio_copa_aportes (week_key, titular, barrio, puntos) VALUES ($1, $2, $3, $4)
       ON CONFLICT (week_key, titular) DO UPDATE SET puntos = game_barrio_copa_aportes.puntos + $4`,
      [semana, titular, barrio, puntos],
    );
    await pool.query(`INSERT INTO game_barrio_nivel (barrio, puntos) VALUES ($1, $2) ON CONFLICT (barrio) DO UPDATE SET puntos = game_barrio_nivel.puntos + $2`, [barrio, puntos]);
    nivelesCache.delete(barrio);
  } catch (err) {
    console.error("[copa] sumar:", err);
  }
}

/** El nivel de un barrio por sus puntos de siempre (se recuerda un minuto: lo pide la ciudad al dibujar). */
const nivelesCache = new Map<number, { at: number; puntos: number; copas: number }>();
export async function puntosDeBarrio(barrio: number): Promise<{ puntos: number; copas: number }> {
  const hit = nivelesCache.get(barrio);
  if (hit && Date.now() - hit.at < 60_000) return hit;
  const { rows } = await pool.query(`SELECT puntos, copas FROM game_barrio_nivel WHERE barrio = $1`, [barrio]);
  const out = { at: Date.now(), puntos: Number(rows[0]?.puntos || 0), copas: Number(rows[0]?.copas || 0) };
  if (nivelesCache.size > 2000) nivelesCache.clear();
  nivelesCache.set(barrio, out);
  return out;
}
export async function nivelBarrio(barrio: number): Promise<number> {
  return nivelDeBarrio((await puntosDeBarrio(barrio)).puntos).actual.nivel;
}

async function sumarMerito(personajeId: number, n: number) {
  const t = temporadaDe();
  await filaMerito(personajeId, t.n, diaClave());
  await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [personajeId, t.n, n]);
}

// ---------------------------------------------------------------- la semana pasada: el podio y sus premios
/** El podio de una semana cerrada (los tres primeros); la primera vez que se calcula, el primero gana una copa. */
async function podioDe(semana: string): Promise<number[]> {
  const { rows: c } = await pool.query(`SELECT podio FROM game_barrio_copa_cerrada WHERE week_key = $1`, [semana]);
  if (c[0]) return (c[0].podio as number[]) ?? [];
  const { rows } = await pool.query(`SELECT barrio FROM game_barrio_copa WHERE week_key = $1 AND puntos > 0 ORDER BY puntos DESC, barrio ASC LIMIT 3`, [semana]);
  const podio = rows.map((r) => Number(r.barrio));
  const { rows: nuevo } = await pool.query(
    `INSERT INTO game_barrio_copa_cerrada (week_key, podio) VALUES ($1, $2::jsonb) ON CONFLICT (week_key) DO NOTHING RETURNING week_key`,
    [semana, JSON.stringify(podio)],
  );
  if (nuevo.length && podio[0]) {
    await pool.query(`INSERT INTO game_barrio_nivel (barrio, copas) VALUES ($1, 1) ON CONFLICT (barrio) DO UPDATE SET copas = game_barrio_nivel.copas + 1`, [podio[0]]);
    nivelesCache.delete(podio[0]);
  }
  return podio;
}

/** Si el barrio de la persona quedó entre los tres primeros la semana pasada y ella aportó, recibe su gozo (una vez). */
async function premioDeLaCopa(titular: number): Promise<CopaEstado["premio"]> {
  const semana = semanaPasada();
  const { rows: ap } = await pool.query(`SELECT barrio, puntos FROM game_barrio_copa_aportes WHERE week_key = $1 AND titular = $2`, [semana, titular]);
  if (!ap[0] || Number(ap[0].puntos) < APORTE_COPA) return null;
  const barrio = Number(ap[0].barrio);
  const puesto = (await podioDe(semana)).indexOf(barrio) + 1;
  if (puesto < 1) return null;
  const gozo = PREMIO_COPA[puesto - 1];
  const { rows } = await pool.query(
    `INSERT INTO game_barrio_copa_premios (week_key, titular, puesto, gozo) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING puesto`,
    [semana, titular, puesto, gozo],
  );
  if (!rows.length) return null;
  await sumarGozo(titular, gozo);
  return { puesto, gozo, barrio: nombreDeBarrio(barrio) };
}

async function tablaCopa(semana: string, mio: number | null): Promise<FilaCopa[]> {
  const { rows } = await pool.query(
    `SELECT w.barrio, w.puntos, (SELECT count(*)::int FROM game_barrio_copa_aportes a WHERE a.week_key = w.week_key AND a.barrio = w.barrio) AS vecinos,
            COALESCE((SELECT n.puntos FROM game_barrio_nivel n WHERE n.barrio = w.barrio), 0) AS total
       FROM game_barrio_copa w WHERE w.week_key = $1 AND w.puntos > 0 ORDER BY w.puntos DESC, w.barrio ASC LIMIT 12`,
    [semana],
  );
  return rows.map((r, i) => ({
    puesto: i + 1,
    n: Number(r.barrio),
    nombre: nombreDeBarrio(Number(r.barrio)),
    puntos: Number(r.puntos),
    vecinos: Number(r.vecinos || 0),
    nivel: nivelDeBarrio(Number(r.total || 0)).actual.nivel,
    esMio: Number(r.barrio) === mio,
  }));
}

// ---------------------------------------------------------------- la misión del barrio de hoy (con la presencia)
/** Quiénes ya la cumplieron hoy (por titular), en memoria y en la base. */
let hechosDia = "";
const hechos = new Set<number>();
async function cargarHechos(dia: string) {
  if (hechosDia === dia) return;
  const { rows } = await pool.query(`SELECT titular FROM game_barrio_juntos WHERE dia = $1`, [dia]);
  hechos.clear();
  for (const r of rows) hechos.add(Number(r.titular));
  hechosDia = dia;
}

/** El punto de la misión (la del barrio, en el centro de la calle del área del barrio). */
function lugarDe(m: MisionJuntos, barrio: number): { x: number; z: number } {
  if (!m.enBarrio) return { x: m.x, z: m.z };
  const r = AREA_RECT[areaDeBarrio(barrio) - 1];
  return { x: (r[0] + r[2]) / 2, z: (r[1] + r[3]) / 2 };
}

/** Cuándo empezó a contar cada barrio que está junto en su lugar. */
const juntosDesde = new Map<number, number>();
let revisando = false;

async function revisarJuntos() {
  if (revisando) return;
  revisando = true;
  try {
    const dia = diaClave();
    await cargarHechos(dia);
    const ahora = Date.now();
    const vistos = new Set<number>();
    for (const [barrio, gente] of posicionesPorBarrio()) {
      if (gente.length < 2) continue;
      const m = misionJuntosDelDia(dia, barrio);
      const p = lugarDe(m, barrio);
      // en el lugar: los de la ciudad están en la plaza y las calles; la del barrio, en el área del propio barrio
      const cerca = gente.filter((g) => (m.enBarrio ? g.canal === `barrio:${barrio}` : g.canal === "comun" && (g.x - p.x) ** 2 + (g.z - p.z) ** 2 <= m.radio ** 2));
      if (!cerca.length) {
        juntosDesde.delete(barrio);
        continue;
      }
      vistos.add(barrio);
      const titulares = await Promise.all(cerca.map((g) => casaDe(g.personajeId)));
      const pendientes = cerca.filter((_, i) => !hechos.has(titulares[i].titular));
      let restan = JUNTOS_SEGUNDOS;
      if (cerca.length >= m.minimo && pendientes.length) {
        const desde = juntosDesde.get(barrio) ?? ahora;
        juntosDesde.set(barrio, desde);
        restan = Math.max(0, Math.ceil(JUNTOS_SEGUNDOS - (ahora - desde) / 1000));
        if (restan <= 0) {
          juntosDesde.delete(barrio);
          await cumplir(dia, barrio, m, cerca, titulares);
          continue;
        }
      } else juntosDesde.delete(barrio);
      cerca.forEach((g, i) =>
        avisarA(g.u, { t: "juntos", p: { mision: m.id, aqui: cerca.length, minimo: m.minimo, segundos: restan, hecha: hechos.has(titulares[i].titular) } }),
      );
    }
    for (const b of [...juntosDesde.keys()]) if (!vistos.has(b)) juntosDesde.delete(b);
  } catch (err) {
    console.error("[juntos] revisar:", err);
  } finally {
    revisando = false;
  }
}

async function cumplir(dia: string, barrio: number, m: MisionJuntos, cerca: { u: number; personajeId: number }[], titulares: { titular: number }[]) {
  const nombres = cerca.length;
  for (let i = 0; i < cerca.length; i++) {
    const t = titulares[i].titular;
    if (hechos.has(t)) {
      // ya la había cumplido: ayudó a los demás
      avisarA(cerca[i].u, { t: "juntos-hecho", titulo: m.titulo, gozo: 0, merito: 0, ayudo: true, juntos: nombres });
      continue;
    }
    const { rows } = await pool.query(
      `INSERT INTO game_barrio_juntos (dia, titular, barrio, mision) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING titular`,
      [dia, t, barrio, m.id],
    );
    hechos.add(t);
    if (!rows.length) continue;
    await sumarMerito(cerca[i].personajeId, MERITO_JUNTOS);
    await sumarGozo(t, GOZO_JUNTOS);
    await sumarALaCopa(cerca[i].personajeId, "juntos");
    const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [t]);
    avisarA(cerca[i].u, { t: "juntos-hecho", titulo: m.titulo, gozo: GOZO_JUNTOS, merito: MERITO_JUNTOS, ayudo: false, juntos: nombres, gozoTotal: g[0] ? Number(g[0].gozo) : undefined });
  }
  forgetJer();
}

let reloj: ReturnType<typeof setInterval> | null = null;
/** La revisión corre cada 4 s mientras el servidor vive (sin nadie en la ciudad no hace nada). */
export function arrancarJuntos() {
  if (!reloj) reloj = setInterval(() => void revisarJuntos(), 4000);
  reloj.unref?.();
}

// ---------------------------------------------------------------- rutas
export function registerBarrioJuntosRoutes(app: Express) {
  arrancarJuntos();

  // La copa de los barrios y la misión de hoy (para la ventana del barrio).
  app.get("/api/jerusalen/barrio/copa", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
    try {
      const ch = await personajeDe(req.user!.id);
      if (!ch) return res.status(404).json({ message: "Primero crea tu personaje." });
      const premio = await premioDeLaCopa(ch.casa);
      const { barrio } = await casaDe(ch.id);
      const semana = semanaDe();
      const tabla = await tablaCopa(semana, barrio);
      let mio: CopaEstado["mio"] = null;
      let hoy: CopaEstado["hoy"] = null;
      if (barrio) {
        const [{ rows: w }, { rows: ap }, { rows: pos }] = await Promise.all([
          pool.query(`SELECT puntos FROM game_barrio_copa WHERE barrio = $1 AND week_key = $2`, [barrio, semana]),
          pool.query(`SELECT puntos FROM game_barrio_copa_aportes WHERE week_key = $1 AND titular = $2`, [semana, ch.casa]),
          pool.query(
            `SELECT count(*)::int AS n FROM game_barrio_copa WHERE week_key = $1 AND puntos > COALESCE((SELECT puntos FROM game_barrio_copa WHERE barrio = $2 AND week_key = $1), 0)`,
            [semana, barrio],
          ),
        ]);
        const { puntos: total, copas } = await puntosDeBarrio(barrio);
        const niv = nivelDeBarrio(total);
        const puntos = Number(w[0]?.puntos || 0);
        mio = {
          n: barrio,
          nombre: nombreDeBarrio(barrio),
          puntos,
          puesto: puntos > 0 ? Number(pos[0]?.n || 0) + 1 : null,
          miAporte: Number(ap[0]?.puntos || 0),
          total,
          nivel: niv.actual,
          siguiente: niv.siguiente,
          copas,
        };
        const dia = diaClave();
        await cargarHechos(dia);
        // los vecinos que están ahora en la ciudad (sin contarse a sí mismo)
        const enLinea = (posicionesPorBarrio().get(barrio) ?? []).filter((g) => g.u !== ch.user_id).length;
        hoy = { mision: misionJuntosDelDia(dia, barrio), hecha: hechos.has(ch.casa), enLinea };
      }
      res.setHeader("Cache-Control", "no-store");
      res.json({ semana, tabla, mio, hoy, premio } satisfies CopaEstado);
    } catch (err) {
      console.error("[copa] estado:", err);
      res.sendStatus(500);
    }
  });
}

