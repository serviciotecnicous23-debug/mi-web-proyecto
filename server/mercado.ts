/**
 * El gozo de Jerusalén en línea, el mercado de la plaza y lo de la casa (shared/mercado.ts): comprar
 * semillas, adornos, ropa y el letrero; vender al mercader lo del alfolí; sembrar, regar y cosechar el
 * huerto; poner los adornos, vestirse y nombrar la casa. Todo se revisa aquí (el teléfono solo pide).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  ARTICULOS, HORNO_MAX, LETREROS, RECETAS, SEMILLAS, articulo, demandaDelDia, guardarPreparadas, leerPreparadas, lugaresAdornos, ofertasDelDia,
  parcelasHuerto, precioHoy, precioVentaHoy, type BienMercado, type MercadoEstado, type Parcela,
} from "@shared/mercado";
import { capacidadAlfoli } from "@shared/ciudad";
import { diaClave, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, recoger } from "./ciudad";
import { sumarGozo } from "./gozo";
import { coloresDeRopa } from "./ropa";
import { refrescarFicha } from "./ciudad-red";

export const MERCADO_SQL = `
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "gozo" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "semillas" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "armario" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "ropa" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "adornos" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "huerto" jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "letrero" text;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "tiene_letrero" boolean NOT NULL DEFAULT false;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "preparadas" jsonb NOT NULL DEFAULT '{}'::jsonb;`;

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const objeto = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

type Plantio = { semilla: "trigo" | "cebada" | "olivo" | null; plantado: string | null; regado: boolean };

function leerHuerto(v: unknown, n: number): Plantio[] {
  const a = Array.isArray(v) ? v : [];
  return Array.from({ length: n }, (_, i) => {
    const p = objeto(a[i]);
    const s = p.semilla === "trigo" || p.semilla === "cebada" || p.semilla === "olivo" ? p.semilla : null;
    return { semilla: s, plantado: s && typeof p.plantado === "string" ? p.plantado : null, regado: s ? p.regado === true : false };
  });
}

/** ¿Cuánto le falta (en segundos) a una parcela? Regada crece 25 % más rápido. */
function faltan(p: Plantio, ahora = Date.now()): number {
  if (!p.semilla || !p.plantado) return 0;
  const dur = SEMILLAS[p.semilla].minutos * 60 * (p.regado ? 0.75 : 1);
  return Math.max(0, Math.ceil((new Date(p.plantado).getTime() + dur * 1000 - ahora) / 1000));
}

function vistaParcela(p: Plantio): Parcela {
  const f = faltan(p);
  return { semilla: p.semilla, plantado: p.plantado, regado: p.regado, listo: !!p.semilla && f === 0, faltan: f };
}

async function estadoMercado(ch: PersonajeFila): Promise<MercadoEstado> {
  const dia = diaClave();
  const [{ rows: c }, { rows: h }] = await Promise.all([
    pool.query(`SELECT gozo, semillas, armario, ropa FROM game_characters WHERE id = $1`, [ch.id]),
    pool.query(`SELECT level, adornos, huerto, letrero, tiene_letrero, goods, preparadas FROM game_houses WHERE character_id = $1`, [ch.id]),
  ]);
  const nivel = Number(h[0]?.level || 0);
  const semillas = objeto(c[0]?.semillas);
  const ropa = objeto(c[0]?.ropa);
  const bienes = leerBienes(h[0]?.goods);
  const prep = leerPreparadas(h[0]?.preparadas);
  return {
    dia,
    gozo: Number(c[0]?.gozo || 0),
    ofertas: ofertasDelDia(dia),
    semillas: Object.fromEntries(Object.entries(semillas).map(([k, v]) => [k, Math.max(0, Number(v) || 0)])),
    armario: lista(c[0]?.armario),
    ropa: { manto: typeof ropa.manto === "string" ? ropa.manto : null, faja: typeof ropa.faja === "string" ? ropa.faja : null },
    adornos: lista(h[0]?.adornos),
    lugares: lugaresAdornos(nivel),
    huerto: leerHuerto(h[0]?.huerto, parcelasHuerto(nivel)).map(vistaParcela),
    letrero: (h[0]?.letrero as string | null) ?? null,
    tieneLetrero: h[0]?.tiene_letrero === true,
    bienes: { harina: Math.floor(bienes.harina), aceite: Math.floor(bienes.aceite), corderos: Math.floor(bienes.corderos) },
    demanda: demandaDelDia(dia),
    preparadas: prep.preparadas,
    horno: prep.horno
      ? { receta: prep.horno.receta, cantidad: prep.horno.cantidad, faltan: Math.max(0, Math.ceil((new Date(prep.horno.listo).getTime() - Date.now()) / 1000)) }
      : null,
  };
}


export function registerMercadoRoutes(app: Express) {
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
    const { rows } = await pool.query(`SELECT 1 FROM game_houses WHERE character_id = $1`, [ch.id]);
    if (!rows.length) {
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa." });
      return null;
    }
    return ch;
  }
  const ultimo = new Map<number, number>();
  const frenar = (id: number, ms = 600) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };
  const responder = async (res: Response, ch: PersonajeFila, extra: Record<string, unknown> = {}) => res.json({ ...(await estadoMercado(ch)), ...extra });

  app.get("/api/jerusalen/mercado", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      await responder(res, ch);
    } catch (err) {
      console.error("[mercado] estado:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/mercado/comprar", async (req: Request, res: Response) => {
    const a = articulo(String(req.body?.articulo || ""));
    const cantidad = a?.categoria === "semilla" ? Math.max(1, Math.min(10, Math.floor(Number(req.body?.cantidad) || 1))) : 1;
    if (!a) return res.status(400).json({ message: "Ese artículo no está en el mercado." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id)) return res.status(429).json({ message: "Espera un momento" });
      const costo = precioHoy(a, diaClave()) * cantidad;
      const { rows: c } = await pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.id]);
      if ((a.categoria === "adorno" || a.categoria === "ropa") && lista(c[0]?.armario).includes(a.id)) return res.status(409).json({ message: "Ya lo tienes." });
      if (a.categoria === "letrero") {
        const { rows: h } = await pool.query(`SELECT tiene_letrero FROM game_houses WHERE character_id = $1`, [ch.id]);
        if (h[0]?.tiene_letrero) return res.status(409).json({ message: "Tu casa ya tiene letrero." });
      }
      // se paga solo si alcanza (de una sola vez, sin carreras)
      const { rows: pago } = await pool.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.id, costo]);
      if (!pago.length) return res.status(409).json({ message: `Te falta gozo: cuesta ${costo}. Sirve un poco más o vende lo del alfolí.` });
      if (a.categoria === "semilla") {
        await pool.query(
          `UPDATE game_characters SET semillas = jsonb_set(semillas, ARRAY[$2::text], to_jsonb(COALESCE((semillas->>$2)::int, 0) + $3)) WHERE id = $1`,
          [ch.id, a.id, cantidad],
        );
      } else if (a.categoria === "letrero") {
        await pool.query(`UPDATE game_houses SET tiene_letrero = true WHERE character_id = $1`, [ch.id]);
      } else {
        await pool.query(`UPDATE game_characters SET armario = armario || to_jsonb($2::text) WHERE id = $1`, [ch.id, a.id]);
      }
      await responder(res, ch, { comprado: a.id, costo });
    } catch (err) {
      console.error("[mercado] comprar:", err);
      res.sendStatus(500);
    }
  });

  // vender al mercader lo del alfolí (lo que dan el huerto y los siervos)
  app.post("/api/jerusalen/mercado/vender", async (req: Request, res: Response) => {
    const pide = objeto(req.body?.bienes);
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id)) return res.status(429).json({ message: "Espera un momento" });
      await recoger(ch.id);
      const ganado = await enFilaCasa(ch.id, async () => {
        const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.id]);
        const bienes = leerBienes(rows[0]?.goods);
        const dia = diaClave();
        let g = 0;
        for (const k of ["harina", "aceite", "corderos"] as const) {
          const n = Math.max(0, Math.min(Math.floor(bienes[k]), Math.floor(Number(pide[k]) || 0)));
          bienes[k] -= n;
          g += n * precioVentaHoy(k, dia);
        }
        if (g > 0) await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(bienes)]);
        return g;
      });
      if (!ganado) return res.status(409).json({ message: "No hay nada para vender." });
      await sumarGozo(ch.id, ganado);
      await responder(res, ch, { vendido: ganado });
    } catch (err) {
      console.error("[mercado] vender:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/casa/ropa", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.id]);
      const tiene = new Set(lista(rows[0]?.armario));
      const elegir = (v: unknown, prefijo: string) => (typeof v === "string" && v.startsWith(prefijo) && tiene.has(v) ? v : null);
      const ropa = { manto: elegir(req.body?.manto, "manto-"), faja: elegir(req.body?.faja, "faja-") };
      await pool.query(`UPDATE game_characters SET ropa = $2::jsonb WHERE id = $1`, [ch.id, JSON.stringify(ropa)]);
      // los vecinos que lo ven reciben otra vez su ficha (con la ropa nueva)
      refrescarFicha(ch.id, { ropa: coloresDeRopa(ropa) });
      await responder(res, ch);
    } catch (err) {
      console.error("[mercado] ropa:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/casa/adornos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const [{ rows: c }, { rows: h }] = await Promise.all([
        pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.id]),
        pool.query(`SELECT level FROM game_houses WHERE character_id = $1`, [ch.id]),
      ]);
      const tiene = new Set(lista(c[0]?.armario));
      const pedidos = [...new Set(lista(req.body?.adornos))].filter((id) => tiene.has(id) && articulo(id)?.categoria === "adorno");
      const cupo = lugaresAdornos(Number(h[0]?.level || 0));
      if (pedidos.length > cupo) return res.status(409).json({ message: `En tu casa caben ${cupo} adornos (crece tu casa para poner más).` });
      await pool.query(`UPDATE game_houses SET adornos = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(pedidos)]);
      await responder(res, ch);
    } catch (err) {
      console.error("[mercado] adornos:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/casa/letrero", async (req: Request, res: Response) => {
    const nombre = String(req.body?.nombre || "");
    if (!LETREROS.includes(nombre)) return res.status(400).json({ message: "Elige un nombre de la lista." });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(`UPDATE game_houses SET letrero = $2 WHERE character_id = $1 AND tiene_letrero = true RETURNING 1`, [ch.id, nombre]);
      if (!rows.length) return res.status(409).json({ message: "Primero compra el letrero en el mercado." });
      await responder(res, ch);
    } catch (err) {
      console.error("[mercado] letrero:", err);
      res.sendStatus(500);
    }
  });

  // el horno: preparar ofrendas con lo del alfolí (Levítico 2:4) y sacarlas cuando estén listas
  app.post("/api/jerusalen/casa/preparar", async (req: Request, res: Response) => {
    const receta = req.body?.receta;
    if (receta !== "tortas" && receta !== "aceitePuro") return res.status(400).json({ message: "Elige qué preparar." });
    const cantidad = Math.max(1, Math.min(HORNO_MAX, Math.floor(Number(req.body?.cantidad) || 1)));
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id, 400)) return res.status(429).json({ message: "Espera un momento" });
      // primero lo que trajeron los siervos (recoger va en su propia fila de la casa)
      await recoger(ch.id);
      const out = await enFilaCasa(ch.id, async (): Promise<{ status: number; message?: string }> => {
        const { rows } = await pool.query(`SELECT goods, preparadas FROM game_houses WHERE character_id = $1`, [ch.id]);
        const p = leerPreparadas(rows[0]?.preparadas);
        if (p.horno) return { status: 409, message: "El horno está ocupado: saca lo que hay cuando esté listo." };
        const bienes = leerBienes(rows[0]?.goods);
        const r = RECETAS[receta as "tortas" | "aceitePuro"];
        const pide = Object.entries(r.pide) as [BienMercado, number][];
        if (pide.some(([b, n]) => Math.floor(bienes[b]) < n * cantidad)) {
          return { status: 409, message: "Te falta en el alfolí: cosecha tu huerto o pon a tus siervos a trabajar." };
        }
        for (const [b, n] of pide) bienes[b] -= n * cantidad;
        const listo = new Date(Date.now() + r.minutos * 60000).toISOString();
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb, preparadas = $3::jsonb WHERE character_id = $1`, [
          ch.id, JSON.stringify(bienes), guardarPreparadas(p.preparadas, { receta, cantidad, listo }),
        ]);
        return { status: 200 };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      await responder(res, ch);
    } catch (err) {
      console.error("[mercado] preparar:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/casa/preparar/sacar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id, 400)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFilaCasa(ch.id, async (): Promise<{ status: number; message?: string; sacado?: { receta: string; cantidad: number } }> => {
        const { rows } = await pool.query(`SELECT preparadas FROM game_houses WHERE character_id = $1`, [ch.id]);
        const p = leerPreparadas(rows[0]?.preparadas);
        if (!p.horno) return { status: 409, message: "El horno está vacío." };
        if (new Date(p.horno.listo).getTime() > Date.now()) return { status: 409, message: "Todavía no está listo." };
        p.preparadas[p.horno.receta] += p.horno.cantidad;
        await pool.query(`UPDATE game_houses SET preparadas = $2::jsonb WHERE character_id = $1`, [ch.id, guardarPreparadas(p.preparadas, null)]);
        return { status: 200, sacado: { receta: p.horno.receta, cantidad: p.horno.cantidad } };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      await responder(res, ch, { sacado: out.sacado });
    } catch (err) {
      console.error("[mercado] sacar del horno:", err);
      res.sendStatus(500);
    }
  });

  // el huerto: sembrar, regar (una vez) y cosechar al alfolí
  app.post("/api/jerusalen/casa/huerto/:accion", async (req: Request, res: Response) => {
    const accion = String(req.params.accion);
    if (!["sembrar", "regar", "cosechar"].includes(accion)) return res.sendStatus(404);
    const n = Math.floor(Number(req.body?.parcela));
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.id, 400)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFilaCasa(ch.id, async (): Promise<{ status: number; message?: string; cosecha?: { bien: string; cuanto: number } }> => {
        const { rows: h } = await pool.query(`SELECT level, huerto, goods FROM game_houses WHERE character_id = $1`, [ch.id]);
        const nivel = Number(h[0]?.level || 0);
        const huerto = leerHuerto(h[0]?.huerto, parcelasHuerto(nivel));
        if (!Number.isInteger(n) || n < 0 || n >= huerto.length) return { status: 400, message: "Esa parcela no existe." };
        const p = huerto[n];
        if (accion === "sembrar") {
          const s = req.body?.semilla;
          if (s !== "trigo" && s !== "cebada" && s !== "olivo") return { status: 400, message: "Elige una semilla." };
          if (p.semilla) return { status: 409, message: "Esa parcela ya está sembrada." };
          const { rows: gasto } = await pool.query(
            `UPDATE game_characters SET semillas = jsonb_set(semillas, ARRAY[$2::text], to_jsonb(COALESCE((semillas->>$2)::int, 0) - 1))
              WHERE id = $1 AND COALESCE((semillas->>$2)::int, 0) > 0 RETURNING 1`,
            [ch.id, s],
          );
          if (!gasto.length) return { status: 409, message: "No te quedan semillas de esas: cómpralas en el mercado." };
          huerto[n] = { semilla: s, plantado: new Date().toISOString(), regado: false };
        } else if (accion === "regar") {
          if (!p.semilla) return { status: 409, message: "Primero siembra." };
          if (p.regado) return { status: 409, message: "Ya la regaste." };
          if (faltan(p) === 0) return { status: 409, message: "Ya está lista: cosecha." };
          huerto[n] = { ...p, regado: true };
        } else {
          if (!p.semilla) return { status: 409, message: "No hay nada sembrado." };
          if (faltan(p) > 0) return { status: 409, message: "Todavía no está lista." };
          const s = SEMILLAS[p.semilla];
          const cuanto = s.cuanto + (p.regado ? 1 : 0);
          const bienes = leerBienes(h[0]?.goods);
          const cap = capacidadAlfoli(nivel);
          if (bienes[s.da] + cuanto > cap) return { status: 409, message: "El alfolí está lleno: lleva lo que tienes al templo o véndelo al mercader." };
          bienes[s.da] += cuanto;
          huerto[n] = { semilla: null, plantado: null, regado: false };
          await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(bienes)]);
          await pool.query(`UPDATE game_houses SET huerto = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(huerto)]);
          return { status: 200, cosecha: { bien: s.da, cuanto } };
        }
        await pool.query(`UPDATE game_houses SET huerto = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(huerto)]);
        return { status: 200 };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      await responder(res, ch, out.cosecha ? { cosecha: out.cosecha } : {});
    } catch (err) {
      console.error("[mercado] huerto:", err);
      res.sendStatus(500);
    }
  });
}

export { ARTICULOS, sumarGozo };
