/**
 * El intercambio (shared/taller.ts): los puestos de cosas entre vecinos. Se pone a la venta lana, ropa (del fardo, o la
 * del armario que nadie lleva puesta), muebles guardados y piezas finas; lo que se pone sale de lo tuyo y vuelve si no se
 * vende en 48 horas. El precio va dentro de un rango fijo (pesa cabal) y el 10 % va al tesoro del templo. Lo de temporada,
 * fuera de su tiempo, solo se consigue así: de otro jugador.
 */
import type { Express, Request, Response } from "express";
import type { PoolClient } from "pg";
import { pool } from "./db";
import { personajeDe, type PersonajeFila } from "./jerusalen";
import { enFilaCasa } from "./ciudad";
import { alTesoro } from "./economia";
import { anotarGasto, sumarGozo } from "./gozo";
import { ventajasDeBarrio } from "./barrio-obras";
import { Rechazo, enTransaccion, entregar, guardarPersona, leerConCandado, type Fila } from "./taller";
import { diezmoDe } from "@shared/economia";
import { capacidadAlfoli } from "@shared/ciudad";
import { ventajasDeColumna } from "@shared/obras";
import { articulo } from "@shared/mercado";
import { MAX_POR_MUEBLE, leerInterior, leerMuebles } from "@shared/casa-interior";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import {
  COSAS_POR_PUESTO, FARDO_MAX, LANA, LANA_POR_PUESTO, PUESTOS_COSAS_MAX, PUESTO_COSAS_HORAS, leerFardo, leerOficios, nombreDeCosa, rangoDeCosa,
  type CosaPuesto, type CosaVendida, type CosasEstado, type ParaVender,
} from "@shared/taller";

export const COSAS_SQL = `
CREATE TABLE IF NOT EXISTS "game_puestos_cosas" (
  "id" serial PRIMARY KEY,
  "vendedor" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "cosa" text NOT NULL,
  "cantidad" integer NOT NULL,
  "precio" integer NOT NULL,
  "fuera_de_tiempo" boolean NOT NULL DEFAULT false,
  "vendidos" integer NOT NULL DEFAULT 0,
  "avisados" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "expires_at" timestamp NOT NULL,
  "closed_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_puestos_cosas_abiertos" ON "game_puestos_cosas" ("closed_at", "cosa", "precio");
CREATE INDEX IF NOT EXISTS "idx_puestos_cosas_vendedor" ON "game_puestos_cosas" ("vendedor", "closed_at");`;

/** Cuánta lana cabe en el alfolí de una casa (como lo demás del alfolí, con el granero de las obras y el del barrio). */
async function capacidadLana(nivel: number, obras: unknown, barrio: number): Promise<number> {
  return capacidadAlfoli(nivel) + ventajasDeColumna(obras).alfoli + (await ventajasDeBarrio(barrio)).alfoli;
}

/** La ropa que lleva puesta alguno de los personajes de la persona (esa no se vende del armario). */
async function ropaPuesta(userId: number): Promise<Set<string>> {
  const { rows } = await pool.query(`SELECT ropa FROM game_characters WHERE user_id = $1 AND game = $2`, [userId, JERUSALEN_JUEGO]);
  const out = new Set<string>();
  for (const r of rows) {
    const o = r.ropa && typeof r.ropa === "object" ? (r.ropa as Record<string, unknown>) : {};
    for (const k of ["manto", "faja"]) if (typeof o[k] === "string") out.add(o[k] as string);
  }
  return out;
}

/** Cuántos tiene para vender de una cosa (y de dónde sale). */
function tengoDe(f: Fila, cosa: string, puesta: Set<string>): { fardo: number; armario: number; muebles: number; lana: number } {
  if (cosa === LANA) return { fardo: 0, armario: 0, muebles: 0, lana: f.oficios.lana };
  const a = articulo(cosa);
  if (a?.categoria === "mueble") {
    const puestos = f.interior.filter((it) => it.m === cosa).length;
    return { fardo: 0, armario: 0, muebles: Math.max(0, (f.muebles[cosa] || 0) - puestos), lana: 0 };
  }
  if (a?.categoria === "ropa") return { fardo: f.fardo[cosa] || 0, armario: f.armario.includes(cosa) && !puesta.has(cosa) ? 1 : 0, muebles: 0, lana: 0 };
  return { fardo: 0, armario: 0, muebles: 0, lana: 0 };
}

/** Lo que vuelve (o llega) a una persona: la lana al alfolí, los muebles al arcón y la ropa al armario o al fardo. */
function recibir(f: Fila, cosa: string, n: number) {
  if (cosa === LANA) f.oficios.lana += n;
  else for (let i = 0; i < n; i++) entregar(f, cosa);
}

async function guardarTodo(client: PoolClient, casa: number, f: Fila) {
  await guardarPersona(client, casa, f);
  await client.query(`UPDATE game_houses SET oficios = $2::jsonb WHERE character_id = $1`, [casa, JSON.stringify(f.oficios)]);
}

/** Vuelve a su dueño lo que no se vendió (aunque se pase de lo que cabe: era suyo). */
async function devolver(vendedor: number, cosa: string, n: number) {
  if (n <= 0) return;
  await enFilaCasa(vendedor, () =>
    enTransaccion(async (client) => {
      const f = await leerConCandado(client, vendedor);
      recibir(f, cosa, n);
      await guardarTodo(client, vendedor, f);
    }),
  );
}

/** Cierra los puestos vencidos y devuelve lo que quedó. */
async function cerrarVencidos() {
  const { rows } = await pool.query(`UPDATE game_puestos_cosas SET closed_at = now() WHERE closed_at IS NULL AND expires_at <= now() RETURNING vendedor, cosa, cantidad`);
  for (const r of rows) await devolver(Number(r.vendedor), String(r.cosa), Number(r.cantidad)).catch((e) => console.error("[intercambio] devolver:", e));
}

const NOMBRE_SQL = `COALESCE(c.name, NULLIF(u.display_name, ''), u.username)`;

function vista(r: Record<string, unknown>, yo: number): CosaPuesto {
  return {
    id: Number(r.id),
    vendedor: String(r.nombre || "Un vecino"),
    vendedorId: Number(r.vendedor),
    cosa: String(r.cosa),
    cantidad: Number(r.cantidad),
    precio: Number(r.precio),
    quedan: Math.max(0, Math.floor(Number(r.quedan) || 0)),
    mio: Number(r.vendedor) === yo,
    fueraDeTiempo: r.fuera_de_tiempo === true,
  };
}

async function estadoCosas(ch: PersonajeFila): Promise<CosasEstado> {
  const [{ rows: abiertos }, { rows: mios }, { rows: nuevas }, { rows: c }, { rows: h }, puesta] = await Promise.all([
    pool.query(
      `SELECT p.*, ${NOMBRE_SQL} AS nombre, EXTRACT(EPOCH FROM (p.expires_at - now()))::int AS quedan
         FROM game_puestos_cosas p JOIN game_characters c ON c.id = p.vendedor JOIN users u ON u.id = c.user_id
        WHERE p.closed_at IS NULL AND p.expires_at > now() AND p.vendedor <> $1 AND u.is_active = true
          AND NOT EXISTS (SELECT 1 FROM user_blocks b WHERE (b.blocker_id = $2 AND b.blocked_id = c.user_id) OR (b.blocker_id = c.user_id AND b.blocked_id = $2))
        ORDER BY p.fuera_de_tiempo DESC, p.cosa, p.precio, p.created_at LIMIT 60`,
      [ch.casa, ch.user_id],
    ),
    pool.query(
      `SELECT p.*, ${NOMBRE_SQL} AS nombre, EXTRACT(EPOCH FROM (p.expires_at - now()))::int AS quedan
         FROM game_puestos_cosas p JOIN game_characters c ON c.id = p.vendedor JOIN users u ON u.id = c.user_id
        WHERE p.closed_at IS NULL AND p.vendedor = $1 ORDER BY p.created_at`,
      [ch.casa],
    ),
    // lo vendido desde el último aviso (queda marcado como avisado)
    pool.query(
      `UPDATE game_puestos_cosas p SET avisados = p.vendidos
         FROM (SELECT id, vendidos - avisados AS n FROM game_puestos_cosas WHERE vendedor = $1 AND vendidos > avisados) v
        WHERE p.id = v.id RETURNING p.cosa, v.n, p.precio`,
      [ch.casa],
    ),
    pool.query(`SELECT gozo, muebles, armario, fardo FROM game_characters WHERE id = $1`, [ch.casa]),
    pool.query(`SELECT level, barrio, obras, interior, oficios FROM game_houses WHERE character_id = $1`, [ch.casa]),
    ropaPuesta(ch.user_id),
  ]);
  // lo mismo que lee el taller, sin candado (solo para mirar)
  const f: Fila = {
    gozo: Number(c[0]?.gozo || 0),
    muebles: leerMuebles(c[0]?.muebles),
    armario: Array.isArray(c[0]?.armario) ? (c[0].armario as unknown[]).filter((x): x is string => typeof x === "string") : [],
    fardo: leerFardo(c[0]?.fardo),
    nivel: Number(h[0]?.level || 0),
    barrio: Number(h[0]?.barrio || 0),
    interior: leerInterior(h[0]?.interior),
    oficios: leerOficios(h[0]?.oficios),
  };
  const capLana = await capacidadLana(f.nivel, h[0]?.obras, f.barrio);
  // lo que se puede poner en un puesto
  const paraVender: ParaVender[] = [];
  const agregar = (cosa: string) => {
    const r = rangoDeCosa(cosa);
    if (!r || paraVender.some((p) => p.cosa === cosa)) return;
    const t = tengoDe(f, cosa, puesta);
    const tengo = t.fardo + t.armario + t.muebles + t.lana;
    if (tengo < 1) return;
    paraVender.push({ cosa, tengo, ...r, de: cosa === LANA ? "lana" : t.muebles ? "muebles" : t.fardo ? "fardo" : "armario" });
  };
  agregar(LANA);
  for (const id of Object.keys(f.fardo)) agregar(id);
  for (const id of f.armario) if (articulo(id)?.categoria === "ropa") agregar(id);
  for (const id of Object.keys(f.muebles)) agregar(id);
  // cuánto más te cabe de lo que venden tus vecinos
  const caben: Record<string, number> = {};
  for (const r of abiertos) {
    const cosa = String(r.cosa);
    if (cosa in caben) continue;
    const a = articulo(cosa);
    caben[cosa] =
      cosa === LANA
        ? Math.max(0, capLana - f.oficios.lana)
        : a?.categoria === "mueble"
          ? Math.max(0, MAX_POR_MUEBLE - (f.muebles[cosa] || 0))
          : a?.categoria === "ropa"
            ? (f.armario.includes(cosa) ? 0 : 1) + Math.max(0, FARDO_MAX - (f.fardo[cosa] || 0))
            : 0;
  }
  const ventasNuevas: CosaVendida[] = nuevas.map((r) => {
    const total = Number(r.n) * Number(r.precio);
    const diezmo = diezmoDe(total);
    return { cosa: String(r.cosa), cantidad: Number(r.n), ganado: total - diezmo, diezmo };
  });
  return {
    abiertos: abiertos.map((r) => vista(r, ch.casa)),
    mios: mios.map((r) => vista(r, ch.casa)),
    ventasNuevas,
    gozo: f.gozo,
    paraVender,
    caben,
  };
}

export function registerIntercambioRoutes(app: Express) {
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
      res.status(409).json({ message: "Primero entra a la ciudad: ahí recibes tu casa." });
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

  app.get("/api/jerusalen/cosas", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      await cerrarVencidos();
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCosas(ch));
    } catch (err) {
      console.error("[intercambio] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // abrir un puesto de cosas: { cosa, cantidad, precio } (lo que se pone sale de lo tuyo y vuelve si no se vende)
  app.post("/api/jerusalen/cosas", async (req: Request, res: Response) => {
    // primero la sesión: sin ella no se mira lo que se pide
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const cosa = String(req.body?.cosa || "");
    const cantidad = Math.floor(Number(req.body?.cantidad));
    const precio = Math.floor(Number(req.body?.precio));
    const rango = rangoDeCosa(cosa);
    if (!rango) return res.status(400).json({ message: "Eso no se puede vender en los puestos: lo que se gana no se cambia." });
    const max = cosa === LANA ? LANA_POR_PUESTO : COSAS_POR_PUESTO;
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > max) return res.status(400).json({ message: `Pon entre 1 y ${max}.` });
    if (!Number.isInteger(precio) || precio < rango.min || precio > rango.max) return res.status(400).json({ message: `El precio de ${nombreDeCosa(cosa).toLowerCase()} va de ${rango.min} a ${rango.max} de gozo cada uno.` });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await cerrarVencidos();
      const { rows: n } = await pool.query(`SELECT count(*)::int AS n FROM game_puestos_cosas WHERE vendedor = $1 AND closed_at IS NULL`, [ch.casa]);
      if (Number(n[0]?.n || 0) >= PUESTOS_COSAS_MAX) return res.status(409).json({ message: `Ya tienes ${PUESTOS_COSAS_MAX} puestos de cosas: espera a que se vendan o cierra uno.` });
      const puesta = await ropaPuesta(ch.user_id);
      await enFilaCasa(ch.casa, () =>
        enTransaccion(async (client) => {
          const f = await leerConCandado(client, ch.casa);
          const t = tengoDe(f, cosa, puesta);
          const tengo = t.fardo + t.armario + t.muebles + t.lana;
          if (tengo < cantidad) {
            const a = articulo(cosa);
            throw new Rechazo(
              409,
              a?.categoria === "mueble"
                ? `Tienes ${tengo} guardados de eso (los que están puestos en tu casa no se venden).`
                : a?.categoria === "ropa"
                  ? `Tienes ${tengo} para vender (la ropa que llevas puesta no se vende).`
                  : `Tienes ${tengo} de lana.`,
            );
          }
          if (cosa === LANA) f.oficios.lana -= cantidad;
          else if (t.muebles) {
            f.muebles[cosa] = (f.muebles[cosa] || 0) - cantidad;
            if (f.muebles[cosa] <= 0) delete f.muebles[cosa];
          } else {
            // la ropa: primero las copias del fardo, después la del armario
            const delFardo = Math.min(t.fardo, cantidad);
            f.fardo[cosa] = t.fardo - delFardo;
            if (f.fardo[cosa] <= 0) delete f.fardo[cosa];
            if (cantidad > delFardo) f.armario = f.armario.filter((x) => x !== cosa);
          }
          await guardarTodo(client, ch.casa, f);
          await client.query(
            `INSERT INTO game_puestos_cosas (vendedor, cosa, cantidad, precio, fuera_de_tiempo, expires_at) VALUES ($1, $2, $3, $4, $5, now() + ($6 || ' hours')::interval)`,
            [ch.casa, cosa, cantidad, precio, rango.fueraDeTiempo, String(PUESTO_COSAS_HORAS)],
          );
        }),
      );
      res.json(await estadoCosas(ch));
    } catch (err) {
      if (err instanceof Rechazo) return res.status(err.status).json({ message: err.message });
      console.error("[intercambio] abrir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // comprar en el puesto de un vecino: { cantidad } (el gozo pasa al vendedor, menos el diezmo)
  app.post("/api/jerusalen/cosas/:id/comprar", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pide = Math.max(1, Math.min(LANA_POR_PUESTO, Math.floor(Number(req.body?.cantidad) || 1)));
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Puesto no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      await cerrarVencidos();
      const { rows: L } = await pool.query(
        `SELECT p.vendedor, p.cosa, c.user_id FROM game_puestos_cosas p JOIN game_characters c ON c.id = p.vendedor
          WHERE p.id = $1 AND p.closed_at IS NULL AND p.expires_at > now()`,
        [id],
      );
      if (!L.length) return res.status(404).json({ message: "Ese puesto ya cerró." });
      if (Number(L[0].vendedor) === ch.casa) return res.status(400).json({ message: "Es tu propio puesto." });
      const { rows: bl } = await pool.query(
        `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1) LIMIT 1`,
        [ch.user_id, Number(L[0].user_id)],
      );
      if (bl.length) return res.status(403).json({ message: "No puedes comprarle a esa persona." });
      const cosa = String(L[0].cosa);
      const out = await enFilaCasa(ch.casa, () =>
        enTransaccion(async (client) => {
          // el puesto trabado: nadie más se lleva lo mismo
          const { rows: P } = await client.query(`SELECT cantidad, precio, vendedor FROM game_puestos_cosas WHERE id = $1 AND closed_at IS NULL AND expires_at > now() FOR UPDATE`, [id]);
          if (!P.length) throw new Rechazo(404, "Ese puesto ya cerró.");
          const f = await leerConCandado(client, ch.casa);
          const a = articulo(cosa);
          let cabe = 0;
          if (cosa === LANA) {
            const { rows: h } = await client.query(`SELECT obras FROM game_houses WHERE character_id = $1`, [ch.casa]);
            cabe = Math.max(0, (await capacidadLana(f.nivel, h[0]?.obras, f.barrio)) - f.oficios.lana);
          } else if (a?.categoria === "mueble") cabe = Math.max(0, MAX_POR_MUEBLE - (f.muebles[cosa] || 0));
          else if (a?.categoria === "ropa") cabe = (f.armario.includes(cosa) ? 0 : 1) + Math.max(0, FARDO_MAX - (f.fardo[cosa] || 0));
          if (cabe < 1) throw new Rechazo(409, cosa === LANA ? "Tu alfolí ya está lleno de lana." : a?.categoria === "mueble" ? `Ya tienes ${MAX_POR_MUEBLE} de ese mueble.` : `Ya tienes esa prenda y ${FARDO_MAX} en tu fardo.`);
          const precio = Number(P[0].precio);
          const n = Math.min(pide, Number(P[0].cantidad), cabe);
          const total = n * precio;
          if (f.gozo < total) throw new Rechazo(409, `Te falta gozo: ${n === 1 ? "cuesta" : `${n} cuestan`} ${total}.`);
          await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1`, [ch.casa, total]);
          recibir(f, cosa, n);
          await guardarTodo(client, ch.casa, f);
          await client.query(
            `UPDATE game_puestos_cosas SET cantidad = cantidad - $2, vendidos = vendidos + $2, closed_at = CASE WHEN cantidad - $2 = 0 THEN now() ELSE NULL END WHERE id = $1`,
            [id, n],
          );
          return { n, total, vendedor: Number(P[0].vendedor) };
        }),
      );
      const diezmo = diezmoDe(out.total);
      // el termómetro: sale lo que pagó el que compra y entra lo del vendedor (la diferencia es el diezmo)
      anotarGasto("cosas", out.total);
      await sumarGozo(out.vendedor, out.total - diezmo, "cosas");
      await alTesoro("diezmo", out.vendedor, diezmo, `Diezmo de una venta entre vecinos: ${nombreDeCosa(cosa).toLowerCase()}`);
      res.json({ ...(await estadoCosas(ch)), comprado: { cosa, cantidad: out.n, total: out.total } });
    } catch (err) {
      if (err instanceof Rechazo) return res.status(err.status).json({ message: err.message });
      console.error("[intercambio] comprar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/cosas/:id/cerrar", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Puesto no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(`UPDATE game_puestos_cosas SET closed_at = now() WHERE id = $1 AND vendedor = $2 AND closed_at IS NULL RETURNING cosa, cantidad`, [id, ch.casa]);
      if (!rows.length) return res.status(404).json({ message: "Ese puesto ya cerró." });
      await devolver(ch.casa, String(rows[0].cosa), Number(rows[0].cantidad));
      res.json(await estadoCosas(ch));
    } catch (err) {
      console.error("[intercambio] cerrar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
