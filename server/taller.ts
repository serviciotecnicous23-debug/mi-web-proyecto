/**
 * El taller (shared/taller.ts): el artesano (con 4 iguales, la pieza fina), el redil (los corderos del alfolí se quedan
 * como ovejas y dan lana) y el telar (la lana se teje). Lo que se paga y lo que se entrega va junto, en una transacción
 * con las filas trabadas. Nada se simula aquí: se mira la hora en que termina cada cosa.
 */
import type { Express, Request, Response } from "express";
import type { PoolClient } from "pg";
import { pool } from "./db";
import { evento, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, olvidarBarrio, recoger } from "./ciudad";
import { alTesoro } from "./economia";
import { anotarGasto } from "./gozo";
import { estudiosAprobados } from "./obras";
import { ventajasDeBarrio } from "./barrio-obras";
import { DIEZMO } from "@shared/economia";
import { capacidadAlfoli, nombreDeBarrio } from "@shared/ciudad";
import { ventajasDeColumna } from "@shared/obras";
import { articulo } from "@shared/mercado";
import { MAX_POR_MUEBLE, leerInterior, leerMuebles, muebleBase, planoDe, porQueNoCabe, type Colocado } from "@shared/casa-interior";
import {
  FARDO_MAX, IGUALES, MUEBLE_TELAR, PARA_EL_ARTESANO, TELAR, esRecetaTelar, finaDe, horasDeFina, jornalDeFina, lanaDelRedil, leerFardo, leerOficios,
  ovejasMax, porQueNoFina, type RecetaTelarId, type TallerEstado,
} from "@shared/taller";

export const TALLER_SQL = `
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "oficios" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "fardo" jsonb NOT NULL DEFAULT '{}'::jsonb;`;

const HORA = 3_600_000;
const iso = (t: number) => new Date(t).toISOString();
const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

/** Lo de la persona y su casa, con las dos filas trabadas (dentro de una transacción). */
export async function leerConCandado(client: PoolClient, casa: number) {
  const { rows: c } = await client.query(`SELECT gozo, muebles, armario, fardo FROM game_characters WHERE id = $1 FOR UPDATE`, [casa]);
  const { rows: h } = await client.query(`SELECT level, barrio, interior, oficios FROM game_houses WHERE character_id = $1 FOR UPDATE`, [casa]);
  return {
    gozo: Number(c[0]?.gozo || 0),
    muebles: leerMuebles(c[0]?.muebles),
    armario: lista(c[0]?.armario),
    fardo: leerFardo(c[0]?.fardo),
    nivel: Number(h[0]?.level || 0),
    barrio: Number(h[0]?.barrio || 0),
    interior: leerInterior(h[0]?.interior),
    oficios: leerOficios(h[0]?.oficios),
  };
}
export type Fila = Awaited<ReturnType<typeof leerConCandado>>;

/** Lo que entra a la persona: un mueble al arcón, o la ropa al armario (al fardo, si ya la tiene). */
export function entregar(f: { muebles: Record<string, number>; armario: string[]; fardo: Record<string, number> }, id: string) {
  const a = articulo(id);
  if (a?.categoria === "mueble") f.muebles[id] = (f.muebles[id] || 0) + 1;
  else if (a?.categoria === "ropa") {
    if (!f.armario.includes(id)) f.armario.push(id);
    else f.fardo[id] = (f.fardo[id] || 0) + 1;
  }
}

/** Si le cabe una más de eso (los muebles hasta 12; la ropa, una en el armario y hasta 4 en el fardo). */
export function cabeUnaMas(f: { muebles: Record<string, number>; armario: string[]; fardo: Record<string, number> }, id: string): boolean {
  const a = articulo(id);
  if (a?.categoria === "mueble") return (f.muebles[id] || 0) < MAX_POR_MUEBLE;
  if (a?.categoria === "ropa") return !f.armario.includes(id) || (f.fardo[id] || 0) < FARDO_MAX;
  return false;
}

/** Un «no» que deshace la transacción y se responde tal cual. */
export class Rechazo extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function enTransaccion<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const out = await fn(client);
    await client.query("COMMIT");
    return out;
  } catch (e) {
    await client.query("ROLLBACK").catch(() => null);
    throw e;
  } finally {
    client.release();
  }
}

export async function guardarPersona(client: PoolClient, casa: number, f: Fila) {
  await client.query(`UPDATE game_characters SET muebles = $2::jsonb, armario = $3::jsonb, fardo = $4::jsonb WHERE id = $1`, [
    casa, JSON.stringify(f.muebles), JSON.stringify(f.armario), JSON.stringify(f.fardo),
  ]);
}

/**
 * Entrega lo que ya terminó el artesano o el telar (una vez). La pieza fina de un mueble que el artesano sacó de la casa
 * vuelve a ese lugar, si todavía cabe ahí. Devuelve qué terminó.
 */
async function asentar(ch: PersonajeFila): Promise<{ terminada: string | null; tejido: RecetaTelarId | null }> {
  // una mirada sin candado: casi siempre no hay nada que entregar
  const { rows } = await pool.query(`SELECT oficios FROM game_houses WHERE character_id = $1`, [ch.casa]);
  const o = leerOficios(rows[0]?.oficios);
  const ahora = Date.now();
  if (!(o.artesano && new Date(o.artesano.lista).getTime() <= ahora) && !(o.telar && new Date(o.telar.lista).getTime() <= ahora)) return { terminada: null, tejido: null };
  const r = await enFilaCasa(ch.casa, () =>
    enTransaccion(async (client) => {
      const f = await leerConCandado(client, ch.casa);
      const t = Date.now();
      let terminada: string | null = null;
      let tejido: RecetaTelarId | null = null;
      let enLaCasa = false;
      const a = f.oficios.artesano;
      if (a && new Date(a.lista).getTime() <= t) {
        entregar(f, a.pieza);
        if (a.lugar && articulo(a.pieza)?.categoria === "mueble") {
          const plano = planoDe(f.nivel);
          const c: Colocado = { ...a.lugar, m: a.pieza };
          if (f.interior.length < plano.maxMuebles && !porQueNoCabe(plano, f.nivel, c, f.interior)) {
            f.interior.push(c);
            enLaCasa = true;
          }
        }
        f.oficios.artesano = null;
        terminada = a.pieza;
      }
      const te = f.oficios.telar;
      if (te && new Date(te.lista).getTime() <= t) {
        entregar(f, TELAR[te.receta].da);
        f.oficios.telar = null;
        tejido = te.receta;
      }
      if (terminada || tejido) {
        await guardarPersona(client, ch.casa, f);
        if (enLaCasa) await client.query(`UPDATE game_houses SET oficios = $2::jsonb, interior = $3::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(f.oficios), JSON.stringify(f.interior)]);
        else await client.query(`UPDATE game_houses SET oficios = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(f.oficios)]);
      }
      return { terminada, tejido, enLaCasa, barrio: f.barrio, lista: a?.lista ?? "" };
    }),
  );
  if (r.enLaCasa) olvidarBarrio(r.barrio);
  if (r.terminada) {
    const nombre = articulo(r.terminada)?.nombre ?? "una pieza fina";
    await evento(ch.user_id, `fina:${ch.casa}:${r.terminada}:${r.lista}`, `estrenó una pieza fina del artesano en su casa de ${nombreDeBarrio(r.barrio)}: ${nombre.charAt(0).toLowerCase()}${nombre.slice(1)}`).catch(() => null);
  }
  return { terminada: r.terminada, tejido: r.tejido };
}

async function estadoTaller(ch: PersonajeFila, extra: { terminada?: string | null; tejido?: RecetaTelarId | null } = {}): Promise<TallerEstado> {
  const [{ rows: c }, { rows: h }, estudios] = await Promise.all([
    pool.query(`SELECT gozo, muebles, armario, fardo FROM game_characters WHERE id = $1`, [ch.casa]),
    pool.query(`SELECT level, goods, obras, barrio, interior, oficios FROM game_houses WHERE character_id = $1`, [ch.casa]),
    estudiosAprobados(ch.user_id),
  ]);
  const nivel = Number(h[0]?.level || 0);
  const interior = leerInterior(h[0]?.interior);
  const puestos: Record<string, number> = {};
  for (const it of interior) puestos[it.m] = (puestos[it.m] || 0) + 1;
  const o = leerOficios(h[0]?.oficios);
  const r = lanaDelRedil(o.redil);
  const lanaMax = capacidadAlfoli(nivel) + ventajasDeColumna(h[0]?.obras).alfoli + (await ventajasDeBarrio(Number(h[0]?.barrio || 0))).alfoli;
  const ahora = Date.now();
  const faltan = (x: string) => Math.max(0, Math.ceil((new Date(x).getTime() - ahora) / 1000));
  const total = (a: string, b: string) => Math.max(1, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 1000));
  return {
    gozo: Number(c[0]?.gozo || 0),
    nivel,
    estudios,
    muebles: leerMuebles(c[0]?.muebles),
    puestos,
    armario: lista(c[0]?.armario),
    fardo: leerFardo(c[0]?.fardo),
    artesano: o.artesano ? { pieza: o.artesano.pieza, faltan: faltan(o.artesano.lista), total: total(o.artesano.desde, o.artesano.lista) } : null,
    terminada: extra.terminada ?? null,
    redil: { ovejas: r.asentado.ovejas, max: ovejasMax(nivel), lista: r.lista, tope: r.tope, proxima: r.proxima },
    lana: o.lana,
    lanaMax,
    corderos: Math.floor(leerBienes(h[0]?.goods).corderos),
    tieneTelar: interior.some((it) => muebleBase(it.m) === MUEBLE_TELAR),
    telar: o.telar ? { receta: o.telar.receta, faltan: faltan(o.telar.lista), total: total(o.telar.desde, o.telar.lista) } : null,
    tejido: extra.tejido ?? null,
  };
}

export function registerTallerRoutes(app: Express) {
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
    const { rows } = await pool.query(`SELECT 1 FROM game_houses WHERE character_id = $1`, [ch.casa]);
    if (!rows.length) {
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa." });
      return null;
    }
    return ch;
  }
  const ultimo = new Map<number, number>();
  const frenar = (id: number, ms = 700) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  app.get("/api/jerusalen/taller", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      // lo que trajeron los siervos al alfolí (los corderos para el redil)
      await recoger(ch.casa);
      const r = await asentar(ch);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoTaller(ch, r));
    } catch (err) {
      console.error("[taller] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // llevar al artesano 4 iguales: { pieza } (el mueble o la prenda de donde sale la fina)
  app.post("/api/jerusalen/taller/artesano", async (req: Request, res: Response) => {
    // primero la sesión: sin ella no se mira lo que se pide
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const base = articulo(String(req.body?.pieza || ""));
    if (!base || !PARA_EL_ARTESANO.includes(base)) return res.status(400).json({ message: "Esa pieza no la hace el artesano." });
    const fina = finaDe(base.id)!;
    const jornal = jornalDeFina(base);
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const estudios = await estudiosAprobados(ch.user_id);
      await asentar(ch);
      const out = await enFilaCasa(ch.casa, () =>
        enTransaccion(async (client): Promise<{ status: number; message?: string; barrio?: number; sacados?: number }> => {
          const f = await leerConCandado(client, ch.casa);
          const tengo = base.categoria === "mueble" ? f.muebles[base.id] || 0 : f.fardo[base.id] || 0;
          const motivo = porQueNoFina(base, { tengo, estudios, ocupado: !!f.oficios.artesano, gozo: f.gozo, cabe: cabeUnaMas(f, fina.id) });
          if (motivo) return { status: 409, message: motivo };
          let lugar: Colocado | undefined;
          let sacados = 0;
          if (base.categoria === "mueble") {
            // primero los guardados; si faltan, se sacan de la casa los últimos que se pusieron
            const puestos = f.interior.filter((it) => it.m === base.id).length;
            sacados = Math.max(0, IGUALES - Math.max(0, tengo - puestos));
            if (sacados > 0) {
              const quitar = new Set<number>();
              for (let i = f.interior.length - 1; i >= 0 && quitar.size < sacados; i--) if (f.interior[i].m === base.id) quitar.add(i);
              if (quitar.size) lugar = { ...f.interior[Math.min(...quitar)] };
              f.interior = f.interior.filter((_, i) => !quitar.has(i));
            }
            f.muebles[base.id] = tengo - IGUALES;
            if (f.muebles[base.id] <= 0) delete f.muebles[base.id];
          } else {
            f.fardo[base.id] = tengo - IGUALES;
            if (f.fardo[base.id] <= 0) delete f.fardo[base.id];
          }
          const { rows: pago } = await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, jornal]);
          // (la fila está trabada: el gozo ya se miró; si aun así faltara, se deshace todo)
          if (!pago.length) throw new Rechazo(409, `El jornal del artesano es de ${jornal} de gozo.`);
          await guardarPersona(client, ch.casa, f);
          const ahora = Date.now();
          f.oficios.artesano = { pieza: fina.id, desde: iso(ahora), lista: iso(ahora + horasDeFina(base) * HORA), ...(lugar ? { lugar } : {}) };
          if (sacados) await client.query(`UPDATE game_houses SET oficios = $2::jsonb, interior = $3::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(f.oficios), JSON.stringify(f.interior)]);
          else await client.query(`UPDATE game_houses SET oficios = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(f.oficios)]);
          return { status: 200, barrio: f.barrio, sacados };
        }),
      );
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      anotarGasto("taller", jornal);
      await alTesoro("taller", ch.casa, Math.floor(jornal * DIEZMO), "El 10 % del jornal del artesano").catch(() => null);
      if (out.sacados) olvidarBarrio(out.barrio!);
      res.json({ ...(await estadoTaller(ch)), empezada: fina.id, jornal, sacados: out.sacados ?? 0 });
    } catch (err) {
      if (err instanceof Rechazo) return res.status(err.status).json({ message: err.message });
      console.error("[taller] artesano:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // llevar corderos del alfolí al redil: { corderos } (se quedan como ovejas y dan lana)
  app.post("/api/jerusalen/taller/redil", async (req: Request, res: Response) => {
    // primero la sesión: sin ella no se mira lo que se pide
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const n = Math.floor(Number(req.body?.corderos));
    if (!Number.isInteger(n) || n < 1 || n > 6) return res.status(400).json({ message: "Lleva de 1 a 6 corderos." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await recoger(ch.casa);
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; barrio?: number }> => {
        const { rows } = await pool.query(`SELECT level, goods, oficios, barrio FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const bienes = leerBienes(rows[0]?.goods);
        const o = leerOficios(rows[0]?.oficios);
        const max = ovejasMax(Number(rows[0]?.level || 0));
        const r = lanaDelRedil(o.redil);
        if (r.asentado.ovejas + n > max) {
          const caben = max - r.asentado.ovejas;
          return { status: 409, message: caben > 0 ? `En tu redil caben ${caben} más.` : `Tu redil ya tiene sus ${max} ovejas: con una casa mayor caben más.` };
        }
        if (Math.floor(bienes.corderos) < n) return { status: 409, message: `En tu alfolí hay ${Math.floor(bienes.corderos)} corderos: pon a un siervo a cuidar el rebaño.` };
        bienes.corderos -= n;
        o.redil = { ...r.asentado, ovejas: r.asentado.ovejas + n, desde: r.asentado.desde ?? iso(Date.now()) };
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb, oficios = $3::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(bienes), JSON.stringify(o)]);
        return { status: 200, barrio: Number(rows[0]?.barrio || 0) };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      // las ovejas se ven junto a la casa
      olvidarBarrio(out.barrio!);
      res.json({ ...(await estadoTaller(ch)), llevadas: n });
    } catch (err) {
      console.error("[taller] redil:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // trasquilar: la lana que tienen las ovejas pasa al alfolí (lo que no cabe se queda en las ovejas)
  app.post("/api/jerusalen/taller/trasquilar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; lana?: number }> => {
        const { rows } = await pool.query(`SELECT level, obras, barrio, oficios FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const o = leerOficios(rows[0]?.oficios);
        const r = lanaDelRedil(o.redil);
        if (!r.asentado.ovejas) return { status: 409, message: "Tu redil está vacío: lleva un cordero del alfolí." };
        if (r.lista < 1) return { status: 409, message: "Tus ovejas todavía no tienen lana: cada una da 1 cada 8 horas." };
        const cap = capacidadAlfoli(Number(rows[0]?.level || 0)) + ventajasDeColumna(rows[0]?.obras).alfoli + (await ventajasDeBarrio(Number(rows[0]?.barrio || 0))).alfoli;
        const cabe = cap - o.lana;
        if (cabe < 1) return { status: 409, message: "Tu alfolí ya está lleno de lana: tejela en el telar o véndela a tus vecinos." };
        const toma = Math.min(r.lista, cabe);
        o.lana += toma;
        o.redil = { ...r.asentado, pendiente: r.lista - toma };
        await pool.query(`UPDATE game_houses SET oficios = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(o)]);
        return { status: 200, lana: toma };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      res.json({ ...(await estadoTaller(ch)), trasquilado: out.lana });
    } catch (err) {
      console.error("[taller] trasquilar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // tejer en el telar de la casa: { receta } (con la lana del alfolí)
  app.post("/api/jerusalen/taller/telar", async (req: Request, res: Response) => {
    // primero la sesión: sin ella no se mira lo que se pide
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const receta = req.body?.receta;
    if (!esRecetaTelar(receta)) return res.status(400).json({ message: "Elige qué tejer." });
    const t = TELAR[receta];
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await asentar(ch);
      const out = await enFilaCasa(ch.casa, () =>
        enTransaccion(async (client): Promise<{ status: number; message?: string }> => {
          const f = await leerConCandado(client, ch.casa);
          if (!f.interior.some((it) => muebleBase(it.m) === MUEBLE_TELAR)) return { status: 409, message: "Para tejer pon el telar de la casa dentro de tu casa (se compra en el mercado, en «Muebles»)." };
          if (f.oficios.telar) return { status: 409, message: "El telar ya está tejiendo: espera a que termine." };
          if (f.oficios.lana < t.lana) return { status: 409, message: `${t.nombre} pide ${t.lana} de lana (tienes ${f.oficios.lana}): trasquila tus ovejas o cómprala a un vecino.` };
          if (!cabeUnaMas(f, t.da)) return { status: 409, message: `Ya no te cabe otro: ${t.nombre.toLowerCase()}.` };
          f.oficios.lana -= t.lana;
          const ahora = Date.now();
          f.oficios.telar = { receta, desde: iso(ahora), lista: iso(ahora + t.minutos * 60_000) };
          await client.query(`UPDATE game_houses SET oficios = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(f.oficios)]);
          return { status: 200 };
        }),
      );
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      res.json({ ...(await estadoTaller(ch)), tejiendo: receta });
    } catch (err) {
      console.error("[taller] telar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
