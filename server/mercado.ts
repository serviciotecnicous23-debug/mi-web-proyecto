/**
 * El gozo de Jerusalén en línea, el mercado de la plaza y lo de la casa (shared/mercado.ts): comprar
 * semillas, adornos, ropa y el letrero; vender al mercader lo del alfolí; sembrar, regar y cosechar el
 * huerto; poner los adornos, vestirse y nombrar la casa. Todo se revisa aquí (el teléfono solo pide).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  ARTICULOS, HORNO_GRANDE, LETREROS, RECETAS, articulo, demandaDelDia, enTemporada, guardarPreparadas, leerPreparadas, lugaresAdornos, ofertasDelDia,
  precioHoy, precioVentaHoy, type BienMercado, type MercadoEstado,
} from "@shared/mercado";
import { MAX_POR_MUEBLE, leerInterior, leerMuebles, mueble, muebleBase } from "@shared/casa-interior";
import { FARDO_MAX, leerFardo } from "@shared/taller";
import { AYUDA_MUEBLES, DIEZMO } from "@shared/economia";
import { COLUMNAS_HUERTO, HUERTO_SQL, registerHuertoRoutes, vistaDelHuerto, type FilaHuerto } from "./huerto";
import { alTesoro, contarVentaMercader, preciosMercaderHoy, vendidosHoy } from "./economia";
import { diaClave, personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa, leerBienes, olvidarBarrio, recoger } from "./ciudad";
import { anotarGasto, sumarGozo } from "./gozo";
import { ventajasDeColumna } from "@shared/obras";
import { ventajasDeBarrio } from "./barrio-obras";
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
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "preparadas" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_characters" ADD COLUMN IF NOT EXISTS "muebles" jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "interior" jsonb NOT NULL DEFAULT '[]'::jsonb;
${HUERTO_SQL}`;

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const objeto = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

// El huerto: sus reglas están en shared/huerto.ts y sus tareas en server/huerto.ts (los avisos y el regreso las
// siguen pidiendo de aquí).
export { faltan, leerHuerto } from "@shared/huerto";

/** Los muebles útiles puestos dentro de la casa (shared/economia.ts: AYUDA_MUEBLES). */
async function mueblesUtiles(characterId: number): Promise<Set<string>> {
  const { rows } = await pool.query(`SELECT interior FROM game_houses WHERE character_id = $1`, [characterId]);
  return new Set(leerInterior(rows[0]?.interior).map((c) => muebleBase(c.m)).filter((m) => m in AYUDA_MUEBLES));
}

async function estadoMercado(ch: PersonajeFila): Promise<MercadoEstado> {
  const dia = diaClave();
  const [{ rows: c }, { rows: h }, precios, vendidos, utiles] = await Promise.all([
    pool.query(`SELECT t.gozo, t.semillas, t.armario, yo.ropa, t.muebles, t.fardo FROM game_characters t, game_characters yo WHERE t.id = $1 AND yo.id = $2`, [ch.casa, ch.casa]),
    pool.query(`SELECT adornos, letrero, tiene_letrero, preparadas, ${COLUMNAS_HUERTO} FROM game_houses WHERE character_id = $1`, [ch.casa]),
    preciosMercaderHoy(),
    vendidosHoy(),
    mueblesUtiles(ch.casa),
  ]);
  const nivel = Number(h[0]?.level || 0);
  const semillas = objeto(c[0]?.semillas);
  const ropa = objeto(c[0]?.ropa);
  const bienes = leerBienes(h[0]?.goods);
  const prep = leerPreparadas(h[0]?.preparadas);
  // lo que dan las obras de la casa (shared/obras.ts): más huerto, la cisterna y el horno de barro
  const v = ventajasDeColumna(h[0]?.obras);
  // el huerto de la casa (shared/huerto.ts): cada surco y la labranza (el agua, el abono, las gavillas, las tareas)
  const hu = h[0] ? await vistaDelHuerto(h[0] as FilaHuerto, ch.casa) : null;
  return {
    dia,
    gozo: Number(c[0]?.gozo || 0),
    ofertas: ofertasDelDia(dia),
    semillas: Object.fromEntries(Object.entries(semillas).map(([k, v]) => [k, Math.max(0, Number(v) || 0)])),
    armario: lista(c[0]?.armario),
    ropa: { manto: typeof ropa.manto === "string" ? ropa.manto : null, faja: typeof ropa.faja === "string" ? ropa.faja : null },
    adornos: lista(h[0]?.adornos),
    lugares: lugaresAdornos(nivel),
    huerto: hu?.huerto ?? [],
    letrero: (h[0]?.letrero as string | null) ?? null,
    tieneLetrero: h[0]?.tiene_letrero === true,
    bienes: { harina: Math.floor(bienes.harina), aceite: Math.floor(bienes.aceite), corderos: Math.floor(bienes.corderos) },
    nivel,
    muebles: leerMuebles(c[0]?.muebles),
    demanda: demandaDelDia(dia),
    precios,
    vendidosHoy: vendidos,
    ayudas: [...utiles],
    preparadas: prep.preparadas,
    horno: prep.horno
      ? { receta: prep.horno.receta, cantidad: prep.horno.cantidad, faltan: Math.max(0, Math.ceil((new Date(prep.horno.listo).getTime() - Date.now()) / 1000)) }
      : null,
    hornoMax: v.horno,
    cisterna: v.cisterna,
    fardo: leerFardo(c[0]?.fardo),
    ...(hu ? { labranza: hu.labranza } : {}),
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
    const { rows } = await pool.query(`SELECT 1 FROM game_houses WHERE character_id = $1`, [ch.casa]);
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
    if (!enTemporada(a)) return res.status(409).json({ message: "Esa prenda es de temporada: hoy no se vende. En el calendario ves cuándo vuelve." });
    if (a.exclusivo)
      return res.status(403).json({
        message:
          a.exclusivo === "taller"
            ? "Las piezas finas no se venden: las hace el artesano con 4 iguales."
            : a.exclusivo === "amigo"
            ? "La faja del buen amigo no se vende: se gana invitando a un amigo que juega 3 días."
            : a.exclusivo === "mentor"
            ? "El manto de Elías no se vende: lo reciben el mentor y su aprendiz cuando el aprendiz termina sus pasos."
            : a.exclusivo === "temporada"
            ? "Esa prenda no se vende: se gana con la historia de la temporada."
            : a.exclusivo === "regreso"
              ? "El mejor vestido no se vende: se recibe al volver a Jerusalén después de una semana o más."
              : "Los trajes de los sabios no se venden: se ganan en la casa de la sabiduría.",
      });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const costo = precioHoy(a, diaClave()) * cantidad;
      // una copia de la ropa para el fardo (shared/taller.ts): para venderla a un vecino o llevarla al artesano
      if (req.body?.fardo === true) {
        if (a.categoria !== "ropa") return res.status(400).json({ message: "En el fardo solo se guarda ropa." });
        const { rows: pago } = await pool.query(
          `UPDATE game_characters SET gozo = gozo - $2,
                  fardo = jsonb_set(COALESCE(fardo, '{}'::jsonb), ARRAY[$3::text], to_jsonb(COALESCE((fardo->>$3)::int, 0) + 1))
            WHERE id = $1 AND gozo >= $2 AND COALESCE((fardo->>$3)::int, 0) < $4 RETURNING gozo`,
          [ch.casa, costo, a.id, FARDO_MAX],
        );
        if (!pago.length) {
          const { rows: f } = await pool.query(`SELECT fardo FROM game_characters WHERE id = $1`, [ch.casa]);
          if ((leerFardo(f[0]?.fardo)[a.id] || 0) >= FARDO_MAX) return res.status(409).json({ message: `Ya tienes ${FARDO_MAX} en tu fardo: véndelas o llévalas al artesano.` });
          return res.status(409).json({ message: `Te falta gozo: cuesta ${costo}.` });
        }
        anotarGasto("fardo", costo);
        await alTesoro("mercado", ch.casa, Math.floor(costo * DIEZMO), "El 10 % de una compra en el mercado de la plaza");
        return await responder(res, ch, { comprado: a.id, costo, alFardo: true });
      }
      const { rows: c } = await pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.casa]);
      if ((a.categoria === "adorno" || a.categoria === "ropa") && lista(c[0]?.armario).includes(a.id)) return res.status(409).json({ message: "Ya lo tienes." });
      if (a.categoria === "letrero") {
        const { rows: h } = await pool.query(`SELECT tiene_letrero FROM game_houses WHERE character_id = $1`, [ch.casa]);
        if (h[0]?.tiene_letrero) return res.status(409).json({ message: "Tu casa ya tiene letrero." });
      }
      if (a.categoria === "mueble") {
        const mu = mueble(a.id)!;
        const [{ rows: h }, { rows: cm }] = await Promise.all([
          pool.query(`SELECT level FROM game_houses WHERE character_id = $1`, [ch.casa]),
          pool.query(`SELECT muebles FROM game_characters WHERE id = $1`, [ch.casa]),
        ]);
        if ((mu.nivelMin ?? 0) > Number(h[0]?.level || 0)) return res.status(409).json({ message: `${mu.nombre} pide una casa más grande: sirve y tu casa crecerá.` });
        if ((leerMuebles(cm[0]?.muebles)[a.id] || 0) >= MAX_POR_MUEBLE) return res.status(409).json({ message: `Ya tienes ${MAX_POR_MUEBLE} de ese mueble.` });
      }
      // se paga solo si alcanza (de una sola vez, sin carreras)
      const { rows: pago } = await pool.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, costo]);
      if (!pago.length) return res.status(409).json({ message: `Te falta gozo: cuesta ${costo}. Sirve un poco más o vende lo del alfolí.` });
      anotarGasto(`mercado-${a.categoria}`, costo);
      if (a.categoria === "semilla") {
        await pool.query(
          `UPDATE game_characters SET semillas = jsonb_set(semillas, ARRAY[$2::text], to_jsonb(COALESCE((semillas->>$2)::int, 0) + $3)) WHERE id = $1`,
          [ch.casa, a.id, cantidad],
        );
      } else if (a.categoria === "letrero") {
        await pool.query(`UPDATE game_houses SET tiene_letrero = true WHERE character_id = $1`, [ch.casa]);
      } else if (a.categoria === "mueble") {
        await pool.query(
          `UPDATE game_characters SET muebles = jsonb_set(muebles, ARRAY[$2::text], to_jsonb(COALESCE((muebles->>$2)::int, 0) + 1)) WHERE id = $1`,
          [ch.casa, a.id],
        );
      } else {
        await pool.query(`UPDATE game_characters SET armario = armario || to_jsonb($2::text) WHERE id = $1`, [ch.casa, a.id]);
      }
      // Lo comprado ya se usa: el adorno se pone solo en la casa si queda lugar, y la ropa se la pone
      // (después se cambia en «Tu casa»). Así se ve enseguida lo que se compró.
      let colocado = false;
      let puesto = false;
      if (a.categoria === "adorno") {
        const { rows: h } = await pool.query(`SELECT level FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const cupo = lugaresAdornos(Number(h[0]?.level || 0));
        const { rows: ok } = await pool.query(
          `UPDATE game_houses SET adornos = COALESCE(adornos, '[]'::jsonb) || to_jsonb($2::text)
            WHERE character_id = $1 AND jsonb_array_length(COALESCE(adornos, '[]'::jsonb)) < $3 AND NOT (COALESCE(adornos, '[]'::jsonb) ? $2)
            RETURNING 1`,
          [ch.casa, a.id, cupo],
        );
        colocado = ok.length > 0;
      } else if (a.categoria === "ropa") {
        const campo = a.id.startsWith("manto-") ? "manto" : "faja";
        const { rows: r } = await pool.query(
          `UPDATE game_characters SET ropa = jsonb_set(COALESCE(ropa, '{}'::jsonb), ARRAY[$2::text], to_jsonb($3::text)) WHERE id = $1 RETURNING ropa`,
          [ch.id, campo, a.id],
        );
        puesto = r.length > 0;
        if (puesto) refrescarFicha(ch.id, { ropa: coloresDeRopa(r[0].ropa) });
      }
      await alTesoro("mercado", ch.casa, Math.floor(costo * DIEZMO), "El 10 % de una compra en el mercado de la plaza");
      await responder(res, ch, { comprado: a.id, costo, colocado, puesto });
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
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await recoger(ch.casa);
      const precios = await preciosMercaderHoy();
      const vendidos: Partial<Record<"harina" | "aceite" | "corderos", number>> = {};
      const ganado = await enFilaCasa(ch.casa, async () => {
        const { rows } = await pool.query(`SELECT goods FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const bienes = leerBienes(rows[0]?.goods);
        let g = 0;
        for (const k of ["harina", "aceite", "corderos"] as const) {
          const n = Math.max(0, Math.min(Math.floor(bienes[k]), Math.floor(Number(pide[k]) || 0)));
          bienes[k] -= n;
          g += n * precios[k];
          if (n > 0) vendidos[k] = n;
        }
        if (g > 0) await pool.query(`UPDATE game_houses SET goods = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(bienes)]);
        return g;
      });
      for (const [k, n] of Object.entries(vendidos)) await contarVentaMercader(k as "harina" | "aceite" | "corderos", n ?? 0);
      if (!ganado) return res.status(409).json({ message: "No hay nada para vender." });
      await sumarGozo(ch.casa, ganado, "mercader");
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
      const { rows } = await pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.casa]);
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
        pool.query(`SELECT armario FROM game_characters WHERE id = $1`, [ch.casa]),
        pool.query(`SELECT level FROM game_houses WHERE character_id = $1`, [ch.casa]),
      ]);
      const tiene = new Set(lista(c[0]?.armario));
      const pedidos = [...new Set(lista(req.body?.adornos))].filter((id) => tiene.has(id) && articulo(id)?.categoria === "adorno");
      const cupo = lugaresAdornos(Number(h[0]?.level || 0));
      if (pedidos.length > cupo) return res.status(409).json({ message: `En tu casa caben ${cupo} adornos (crece tu casa para poner más).` });
      const { rows: b } = await pool.query(`UPDATE game_houses SET adornos = $2::jsonb WHERE character_id = $1 RETURNING barrio`, [ch.casa, JSON.stringify(pedidos)]);
      if (b.length) olvidarBarrio(Number(b[0].barrio));
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
      const { rows } = await pool.query(`UPDATE game_houses SET letrero = $2 WHERE character_id = $1 AND tiene_letrero = true RETURNING barrio`, [ch.casa, nombre]);
      if (!rows.length) return res.status(409).json({ message: "Primero compra el letrero en el mercado." });
      olvidarBarrio(Number(rows[0].barrio));
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
    const cantidad = Math.max(1, Math.min(HORNO_GRANDE, Math.floor(Number(req.body?.cantidad) || 1)));
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa, 400)) return res.status(429).json({ message: "Espera un momento" });
      // primero lo que trajeron los siervos (recoger va en su propia fila de la casa)
      await recoger(ch.casa);
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string }> => {
        const { rows } = await pool.query(`SELECT goods, preparadas, obras, barrio FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const p = leerPreparadas(rows[0]?.preparadas);
        if (p.horno) return { status: 409, message: "El horno está ocupado: saca lo que hay cuando esté listo." };
        const max = ventajasDeColumna(rows[0]?.obras).horno;
        if (cantidad > max) return { status: 409, message: `En tu horno caben ${max}: edifica el horno de barro (Tu casa → Obras) para que quepan ${HORNO_GRANDE}.` };
        const bienes = leerBienes(rows[0]?.goods);
        const r = RECETAS[receta as "tortas" | "aceitePuro"];
        const pide = Object.entries(r.pide) as [BienMercado, number][];
        if (pide.some(([b, n]) => Math.floor(bienes[b]) < n * cantidad)) {
          return { status: 409, message: "Te falta en el alfolí: cosecha tu huerto o pon a tus siervos a trabajar." };
        }
        for (const [b, n] of pide) bienes[b] -= n * cantidad;
        // con el horno del barrio (shared/barrio-obras.ts), en la mitad del tiempo
        const vb = await ventajasDeBarrio(Number(rows[0]?.barrio || 0));
        const listo = new Date(Date.now() + r.minutos * 60000 * vb.horno).toISOString();
        await pool.query(`UPDATE game_houses SET goods = $2::jsonb, preparadas = $3::jsonb WHERE character_id = $1`, [
          ch.casa, JSON.stringify(bienes), guardarPreparadas(p.preparadas, { receta, cantidad, listo }),
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
      if (frenar(ch.casa, 400)) return res.status(429).json({ message: "Espera un momento" });
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string; sacado?: { receta: string; cantidad: number } }> => {
        const { rows } = await pool.query(`SELECT preparadas FROM game_houses WHERE character_id = $1`, [ch.casa]);
        const p = leerPreparadas(rows[0]?.preparadas);
        if (!p.horno) return { status: 409, message: "El horno está vacío." };
        if (new Date(p.horno.listo).getTime() > Date.now()) return { status: 409, message: "Todavía no está listo." };
        p.preparadas[p.horno.receta] += p.horno.cantidad;
        await pool.query(`UPDATE game_houses SET preparadas = $2::jsonb WHERE character_id = $1`, [ch.casa, guardarPreparadas(p.preparadas, null)]);
        return { status: 200, sacado: { receta: p.horno.receta, cantidad: p.horno.cantidad } };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      await responder(res, ch, { sacado: out.sacado });
    } catch (err) {
      console.error("[mercado] sacar del horno:", err);
      res.sendStatus(500);
    }
  });

  // el huerto de la casa: arar, sembrar, regar, llenar el cántaro, arrancar hierbas, espantar aves, abonar, segar y
  // llevar las gavillas al granero (server/huerto.ts)
  registerHuertoRoutes(app, { jugador, responder });
}

export { ARTICULOS, sumarGozo };
