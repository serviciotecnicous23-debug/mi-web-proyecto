/**
 * Misiones de Jerusalén en línea (shared/misiones.ts): los encargos del día de cada personaje, la
 * ofrenda semanal del barrio y la tabla de los barrios. Las cuentas avanzan desde las rutas que ya
 * existen (deberes, preguntas, estudios, bendiciones y el alfolí) llamando a `avanzarMision`.
 * Nada de esto usa `enFila` (las rutas que lo llaman ya pueden estar dentro de una fila).
 */
import { aportarAlMuro } from "./muro";
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  APORTE_MINIMO, ENCARGOS, ENCARGOS_DIA, MERITO_BARRIO, MERITO_ENCARGO, MERITO_ENCARGOS_TODOS, META_BARRIO,
  type BarrioSemana, type Encargo, type MisionCumplida, type MisionesEstado, type TipoEncargo,
} from "@shared/misiones";
import { nombreDeBarrio } from "@shared/ciudad";
import type { DeberId } from "@shared/jerusalen";
import { diaClave, evento, filaMerito, forgetJer, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { GOZO, sumarGozo } from "./gozo";
import { avisoDeRacha, marcarServicio } from "./racha";
import { sumarALaCopa } from "./barrio-juntos";
import { aportarAlCapitulo } from "./capitulos";
import { anotarCamino } from "./camino-dia";
import { PUNTOS_CAPITULO } from "@shared/capitulos";

export const MISIONES_SQL = `
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "encargos" jsonb;
CREATE TABLE IF NOT EXISTS "game_barrio_week" (
  "barrio" integer NOT NULL,
  "week_key" text NOT NULL,
  "deberes" integer NOT NULL DEFAULT 0,
  "done_at" timestamp,
  PRIMARY KEY ("barrio", "week_key")
);
CREATE TABLE IF NOT EXISTS "game_barrio_aportes" (
  "week_key" text NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "n" integer NOT NULL DEFAULT 0,
  "premiado" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("week_key", "character_id")
);
CREATE INDEX IF NOT EXISTS "idx_game_barrio_aportes_barrio" ON "game_barrio_aportes" ("week_key", "barrio");`;

/** El lunes de la semana del día dado (día de Texas, como las temporadas). */
export function semanaClave(dia = diaClave()): string {
  const d = new Date(`${dia}T12:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}

function semilla(texto: string): number {
  let x = 2166136261;
  for (const ch of texto) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return x || 1;
}

/** Los tres encargos del día de un personaje: de tipos distintos y de su camino, fijos para ese día. */
export function encargosDelDia(dia: string, personajeId: number, camino: "sacerdocio" | "profecia" | "realeza" = "sacerdocio"): string[] {
  const lista = ENCARGOS.filter((e) => (e.caminos ?? ["sacerdocio"]).includes(camino));
  let x = semilla(`${dia}:${personajeId}`);
  for (let i = lista.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    const j = x % (i + 1);
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  const out: string[] = [];
  const tipos = new Set<TipoEncargo>();
  for (const e of lista) {
    if (tipos.has(e.tipo)) continue;
    tipos.add(e.tipo);
    out.push(e.id);
    if (out.length >= ENCARGOS_DIA) break;
  }
  return out;
}

type Guardados = { dia: string; lista: { id: string; prog: number; hecho: boolean }[]; todos: boolean };

async function leerEncargos(personajeId: number): Promise<Guardados> {
  const dia = diaClave();
  const { rows } = await pool.query(`SELECT encargos, path FROM game_characters WHERE id = $1`, [personajeId]);
  const g = rows[0]?.encargos as Guardados | null;
  if (g && g.dia === dia && Array.isArray(g.lista)) return g;
  const camino = rows[0]?.path === "profecia" || rows[0]?.path === "realeza" ? rows[0].path : "sacerdocio";
  return { dia, lista: encargosDelDia(dia, personajeId, camino).map((id) => ({ id, prog: 0, hecho: false })), todos: false };
}

async function sumarMerito(personajeId: number, n: number) {
  const t = temporadaDe();
  await filaMerito(personajeId, t.n, diaClave());
  await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [personajeId, t.n, n]);
}

/** Avanza los encargos del día de este tipo. Devuelve lo que se cumplió ahora (para avisar). */
export async function avanzarMision(ch: { id: number; user_id: number }, tipo: TipoEncargo, n = 1): Promise<MisionCumplida[]> {
  if (n <= 0) return [];
  // el camino de hoy: aprender (preguntas difíciles y estudios) y ayudar (bendiciones, ayudas, reuniones y el alfolí)
  if (tipo === "aciertos" || tipo === "seccion") void anotarCamino(ch.id, "aprender");
  else if (tipo === "bendicion" || tipo === "ayuda" || tipo === "reunion" || tipo === "anfitrion" || tipo === "alfoli") void anotarCamino(ch.id, "ayudar");
  const g = await leerEncargos(ch.id);
  const cumplidas: MisionCumplida[] = [];
  let cambio = false;
  for (const e of g.lista) {
    const def = ENCARGOS.find((x) => x.id === e.id);
    if (!def || def.tipo !== tipo || e.hecho) continue;
    e.prog = Math.min(def.meta, e.prog + n);
    cambio = true;
    if (e.prog >= def.meta) {
      e.hecho = true;
      cumplidas.push({ titulo: `Encargo cumplido: ${def.titulo}`, premio: MERITO_ENCARGO, gozo: GOZO.encargo });
    }
  }
  if (!cambio) return [];
  if (!g.todos && g.lista.every((e) => e.hecho)) {
    g.todos = true;
    cumplidas.push({ titulo: "¡Cumpliste los tres encargos del día!", premio: MERITO_ENCARGOS_TODOS, gozo: GOZO.encargosTodos });
  }
  await pool.query(`UPDATE game_characters SET encargos = $2::jsonb WHERE id = $1`, [ch.id, JSON.stringify(g)]);
  // la copa de los barrios: cada encargo cumplido (y los tres del día) suma para el barrio
  const encargosHechos = cumplidas.filter((c) => c.premio === MERITO_ENCARGO).length;
  if (encargosHechos) await sumarALaCopa(ch.id, "encargo", encargosHechos);
  if (cumplidas.some((c) => c.premio === MERITO_ENCARGOS_TODOS)) await sumarALaCopa(ch.id, "encargosTodos");
  const premio = cumplidas.reduce((a, c) => a + c.premio, 0);
  if (premio) {
    await sumarMerito(ch.id, premio);
    // también gozo: por cada encargo y por los tres
    await sumarGozo(ch.id, cumplidas.reduce((a, c) => a + (c.gozo || 0), 0));
    forgetJer();
  }
  if (g.todos && cumplidas.some((c) => c.premio === MERITO_ENCARGOS_TODOS)) await evento(ch.user_id, `encargos:${g.dia}`, "cumplió los tres encargos del día en Jerusalén en línea");
  // la racha de servicio: el primer encargo cumplido del día suma un día (su gozo ya lo da marcarServicio)
  if (encargosHechos) {
    const r = await marcarServicio(ch.id);
    if (r) {
      cumplidas.push(avisoDeRacha(r));
      forgetJer();
    }
  }
  // la historia de la temporada: cada encargo cumplido suma a la meta de la ciudad de esta semana (va después de
  // sumar el gozo de los encargos: el premio del capítulo ya lo da aportarAlCapitulo y aquí solo se avisa)
  if (encargosHechos)
    cumplidas.push(...(await aportarAlCapitulo(ch, encargosHechos * PUNTOS_CAPITULO.encargo).catch((err) => {
      console.error("[capitulos] encargo:", err);
      return [];
    })));
  return cumplidas;
}

const barrioDe = new Map<number, number>();
async function barrioDelPersonaje(personajeId: number): Promise<number | null> {
  const b = barrioDe.get(personajeId);
  if (b) return b;
  // la casa es de la persona: la guarda su primer personaje
  const { rows } = await pool.query(
    `SELECT h.barrio FROM game_houses h
      WHERE h.character_id = (SELECT MIN(c2.id) FROM game_characters c2 JOIN game_characters c ON c.user_id = c2.user_id AND c.game = c2.game WHERE c.id = $1)`,
    [personajeId],
  );
  const n = rows[0] ? Number(rows[0].barrio) : null;
  if (n) {
    barrioDe.set(personajeId, n);
    if (barrioDe.size > 5000) barrioDe.clear();
  }
  return n;
}

/** Los deberes de un vecino suman a la ofrenda de su barrio. Al cumplirla, premio para quienes aportaron. */
export async function aportarAlBarrio(ch: { id: number; user_id: number }, n: number): Promise<MisionCumplida[]> {
  if (n <= 0) return [];
  const barrio = await barrioDelPersonaje(ch.id);
  if (!barrio) return [];
  const semana = semanaClave();
  const out: MisionCumplida[] = [];
  const { rows: ap } = await pool.query(
    `INSERT INTO game_barrio_aportes (week_key, character_id, barrio, n) VALUES ($1, $2, $3, $4)
     ON CONFLICT (week_key, character_id) DO UPDATE SET n = game_barrio_aportes.n + $4
     RETURNING n, premiado`,
    [semana, ch.id, barrio, n],
  );
  const { rows: bw } = await pool.query(
    `INSERT INTO game_barrio_week (barrio, week_key, deberes) VALUES ($1, $2, $3)
     ON CONFLICT (barrio, week_key) DO UPDATE SET deberes = game_barrio_week.deberes + $3
     RETURNING deberes, done_at`,
    [barrio, semana, n],
  );
  const nombre = nombreDeBarrio(barrio);
  if (Number(bw[0]?.deberes || 0) >= META_BARRIO && !bw[0]?.done_at) {
    // el primero que la completa marca el barrio y reparte el premio a quienes aportaron lo suficiente
    const { rows: gano } = await pool.query(`UPDATE game_barrio_week SET done_at = now() WHERE barrio = $1 AND week_key = $2 AND done_at IS NULL RETURNING barrio`, [barrio, semana]);
    if (gano.length) {
      const { rows: ellos } = await pool.query(
        `UPDATE game_barrio_aportes a SET premiado = true FROM game_characters c
          WHERE a.week_key = $1 AND a.barrio = $2 AND a.n >= $3 AND a.premiado = false AND c.id = a.character_id
          RETURNING a.character_id, c.user_id`,
        [semana, barrio, APORTE_MINIMO],
      );
      for (const r of ellos) {
        await sumarMerito(Number(r.character_id), MERITO_BARRIO);
        await sumarGozo(Number(r.character_id), GOZO.barrio);
        await evento(Number(r.user_id), `barrio:${semana}`, `cumplió con ${nombre} la ofrenda del barrio de la semana`);
        if (Number(r.character_id) === ch.id) out.push({ titulo: `¡${nombre} cumplió la ofrenda de la semana!`, premio: MERITO_BARRIO, gozo: GOZO.barrio });
      }
      forgetJer();
    }
  } else if (bw[0]?.done_at && Number(ap[0]?.n || 0) >= APORTE_MINIMO && ap[0]?.premiado === false) {
    // la ofrenda ya se cumplió y este vecino llega ahora al aporte mínimo
    const { rows: yo } = await pool.query(`UPDATE game_barrio_aportes SET premiado = true WHERE week_key = $1 AND character_id = $2 AND premiado = false RETURNING character_id`, [semana, ch.id]);
    if (yo.length) {
      await sumarMerito(ch.id, MERITO_BARRIO);
      await sumarGozo(ch.id, GOZO.barrio);
      await evento(ch.user_id, `barrio:${semana}`, `cumplió con ${nombre} la ofrenda del barrio de la semana`);
      out.push({ titulo: `Aportaste a la ofrenda cumplida de ${nombre}`, premio: MERITO_BARRIO, gozo: GOZO.barrio });
      forgetJer();
    }
  }
  return out;
}

/** Los deberes aceptados de un envío avanzan los encargos, «servir juntos» y la ofrenda del barrio. */
export async function misionesPorDeberes(ch: { id: number; user_id: number }, aceptados: Partial<Record<DeberId, number>>, juntos: boolean): Promise<MisionCumplida[]> {
  const out: MisionCumplida[] = [];
  let total = 0;
  for (const [k, v] of Object.entries(aceptados)) {
    const n = Number(v || 0);
    if (n <= 0) continue;
    total += n;
    if (k !== "orantes") out.push(...(await avanzarMision(ch, k as TipoEncargo, n)));
  }
  if (juntos && total) out.push(...(await avanzarMision(ch, "juntos", total)));
  out.push(...(await aportarAlBarrio(ch, total)));
  // y a la copa de los barrios
  await sumarALaCopa(ch.id, "deber", total);
  // y cada deber pone una piedra en el muro caído de la ciudad
  out.push(...(await aportarAlMuro(ch, total).catch((err) => {
    console.error("[muro] aportar:", err);
    return [];
  })));
  // y suma a la meta de la ciudad del capítulo de esta semana (la historia de la temporada)
  out.push(...(await aportarAlCapitulo(ch, total * PUNTOS_CAPITULO.deber).catch((err) => {
    console.error("[capitulos] deberes:", err);
    return [];
  })));
  return out;
}

async function tablaDeBarrios(semana: string): Promise<BarrioSemana[]> {
  const { rows } = await pool.query(
    `SELECT w.barrio, w.deberes, w.done_at, (SELECT count(*)::int FROM game_barrio_aportes a WHERE a.week_key = w.week_key AND a.barrio = w.barrio) AS vecinos
       FROM game_barrio_week w WHERE w.week_key = $1 ORDER BY w.deberes DESC LIMIT 12`,
    [semana],
  );
  return rows.map((r) => {
    const vecinos = Math.max(1, Number(r.vecinos || 0));
    return { n: Number(r.barrio), nombre: nombreDeBarrio(Number(r.barrio)), deberes: Number(r.deberes), vecinos, porVecino: Math.round(Number(r.deberes) / vecinos), cumplida: !!r.done_at };
  });
}

export async function misionesDe(ch: PersonajeFila): Promise<MisionesEstado> {
  const g = await leerEncargos(ch.id);
  const encargos: Encargo[] = g.lista.map((e) => {
    const def = ENCARGOS.find((x) => x.id === e.id)!;
    return { id: e.id, titulo: def.titulo, icono: def.icono, meta: def.meta, progreso: e.prog, hecho: e.hecho };
  });
  const semana = semanaClave();
  const barrio = await barrioDelPersonaje(ch.id);
  let mio: MisionesEstado["barrio"] = null;
  if (barrio) {
    const [{ rows: bw }, { rows: ap }] = await Promise.all([
      pool.query(`SELECT deberes, done_at FROM game_barrio_week WHERE barrio = $1 AND week_key = $2`, [barrio, semana]),
      pool.query(`SELECT n FROM game_barrio_aportes WHERE week_key = $1 AND character_id = $2`, [semana, ch.id]),
    ]);
    mio = {
      n: barrio,
      nombre: nombreDeBarrio(barrio),
      deberes: Number(bw[0]?.deberes || 0),
      meta: META_BARRIO,
      cumplida: !!bw[0]?.done_at,
      miAporte: Number(ap[0]?.n || 0),
      aporteMinimo: APORTE_MINIMO,
    };
  }
  return { dia: g.dia, encargos, todos: g.todos, barrio: mio, barrios: await tablaDeBarrios(semana), semana };
}

export function registerMisionesRoutes(app: Express) {
  app.get("/api/jerusalen/misiones", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
    try {
      const ch = await personajeDe(req.user!.id);
      if (!ch) return res.status(404).json({ message: "Primero crea tu personaje." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await misionesDe(ch));
    } catch (err) {
      console.error("[misiones] estado:", err);
      res.sendStatus(500);
    }
  });
}
