/**
 * Las obras del barrio (shared/barrio-obras.ts): la obra de ahora de cada barrio, aportar gozo (de una vez y con la
 * obra trabada mientras se suma, para que dos vecinos a la vez no se pisen) y lo que dan las obras terminadas a las
 * casas del barrio (el huerto, las reuniones, el horno, las estrellas y el alfolí). Al terminar una obra se avisa a
 * todo el barrio por la red de la ciudad y la calle se dibuja con ella.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, evento, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { anotarGasto } from "./gozo";
import { sumarALaCopa } from "./barrio-juntos";
import { difundirAlBarrio } from "./ciudad-red";
import { olvidarBarrio } from "./ciudad";
import { nombreDeBarrio } from "@shared/ciudad";
import {
  APORTE_MAXIMO_DIA, APORTE_MINIMO, NOMBRES_EN_LA_PLACA, OBRAS_BARRIO, obraBarrio, obraBarrioActual, ventajasDelBarrio,
  type AporteBarrioRespuesta, type ObraBarrioId, type ObrasBarrioEstado, type VentajasBarrio,
} from "@shared/barrio-obras";

export const BARRIO_OBRAS_SQL = `
CREATE TABLE IF NOT EXISTS "game_barrio_obras" (
  "barrio" integer NOT NULL,
  "obra" text NOT NULL,
  "aportado" integer NOT NULL DEFAULT 0,
  "hecha_at" timestamp,
  PRIMARY KEY ("barrio", "obra")
);
CREATE TABLE IF NOT EXISTS "game_barrio_obra_aportes" (
  "id" serial PRIMARY KEY,
  "barrio" integer NOT NULL,
  "obra" text NOT NULL,
  "titular" integer NOT NULL,
  "gozo" integer NOT NULL,
  "dia" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_barrio_obra_aportes" ON "game_barrio_obra_aportes" ("barrio", "titular");
CREATE INDEX IF NOT EXISTS "idx_barrio_obra_aportes_dia" ON "game_barrio_obra_aportes" ("titular", "dia");`;

// ---------------------------------------------------------------- lo terminado de cada barrio (en memoria 30 s)
const hechasCache = new Map<number, { at: number; hechas: ObraBarrioId[] }>();
/** Las obras terminadas de un barrio, en el orden de la lista. */
export async function obrasDeBarrio(barrio: number): Promise<ObraBarrioId[]> {
  const hit = hechasCache.get(barrio);
  if (hit && Date.now() - hit.at < 30_000) return hit.hechas;
  const { rows } = await pool.query(`SELECT obra FROM game_barrio_obras WHERE barrio = $1 AND hecha_at IS NOT NULL`, [barrio]);
  const set = new Set(rows.map((r) => String(r.obra)));
  const hechas = OBRAS_BARRIO.filter((o) => set.has(o.id)).map((o) => o.id);
  if (hechasCache.size > 2000) hechasCache.clear();
  hechasCache.set(barrio, { at: Date.now(), hechas });
  return hechas;
}
/** Lo que dan las obras terminadas a las casas de un barrio. Si falla, como si no hubiera obras. */
export async function ventajasDeBarrio(barrio: number | null | undefined): Promise<VentajasBarrio> {
  if (!barrio) return ventajasDelBarrio([]);
  return ventajasDelBarrio(await obrasDeBarrio(barrio).catch(() => [] as ObraBarrioId[]));
}

/** El barrio de la persona (por su casa, el titular). */
async function barrioDe(titular: number): Promise<number | null> {
  const { rows } = await pool.query(`SELECT barrio FROM game_houses WHERE character_id = $1`, [titular]);
  return rows[0] ? Number(rows[0].barrio) : null;
}

async function estadoObrasBarrio(ch: PersonajeFila, barrio: number): Promise<ObrasBarrioEstado> {
  const hechas = await obrasDeBarrio(barrio);
  const actual = obraBarrioActual(hechas);
  const hoy = diaClave();
  const [{ rows: fila }, { rows: mio }, { rows: top }, { rows: g }] = await Promise.all([
    actual
      ? pool.query(
          `SELECT o.aportado, (SELECT count(DISTINCT titular)::int FROM game_barrio_obra_aportes a WHERE a.barrio = o.barrio AND a.obra = o.obra) AS aportantes
             FROM game_barrio_obras o WHERE o.barrio = $1 AND o.obra = $2`,
          [barrio, actual.id],
        )
      : Promise.resolve({ rows: [] as Record<string, unknown>[] }),
    pool.query(
      `SELECT COALESCE(sum(gozo) FILTER (WHERE obra = $3), 0)::int AS en_esta, COALESCE(sum(gozo) FILTER (WHERE dia = $4), 0)::int AS hoy, COALESCE(sum(gozo), 0)::int AS total
         FROM game_barrio_obra_aportes WHERE barrio = $1 AND titular = $2`,
      [barrio, ch.casa, actual?.id ?? "", hoy],
    ),
    pool.query(
      `SELECT a.titular, sum(a.gozo)::int AS gozo, c.name, c.user_id, u.display_name, u.username,
              (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual
         FROM game_barrio_obra_aportes a
         JOIN game_characters c ON c.id = a.titular
         JOIN users u ON u.id = c.user_id
        WHERE a.barrio = $1 AND u.is_active IS NOT FALSE
        GROUP BY a.titular, c.name, c.user_id, c.game, u.display_name, u.username
        ORDER BY sum(a.gozo) DESC, min(a.created_at) LIMIT $2`,
      [barrio, NOMBRES_EN_LA_PLACA],
    ),
    pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]),
  ]);
  const m = mio[0] ?? {};
  return {
    barrio,
    nombre: nombreDeBarrio(barrio),
    hechas,
    actual: actual ? { id: actual.id, aportado: Number(fila[0]?.aportado || 0), meta: actual.meta, aportantes: Number(fila[0]?.aportantes || 0) } : null,
    mio: { enEsta: Number(m.en_esta || 0), hoy: Number(m.hoy || 0), total: Number(m.total || 0), puedeHoy: Math.max(0, APORTE_MAXIMO_DIA - Number(m.hoy || 0)) },
    constructores: top.map((r) => ({ nombre: nombreDe({ ...r, name: (r.actual as string | null) ?? (r.name as string | null) }), gozo: Number(r.gozo) })),
    gozo: Number(g[0]?.gozo || 0),
    ventajas: ventajasDelBarrio(hechas),
  };
}

export function registerBarrioObrasRoutes(app: Express) {
  async function jugador(req: Request, res: Response): Promise<{ ch: PersonajeFila; barrio: number } | null> {
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
    const barrio = await barrioDe(ch.casa);
    if (!barrio) {
      res.status(409).json({ message: "Primero entra a la ciudad: allí está tu casa y tu barrio." });
      return null;
    }
    return { ch, barrio };
  }
  const ultimo = new Map<number, number>();
  const frenar = (id: number, ms = 800) => {
    const now = Date.now();
    if (now - (ultimo.get(id) || 0) < ms) return true;
    ultimo.set(id, now);
    if (ultimo.size > 5000) ultimo.clear();
    return false;
  };

  app.get("/api/jerusalen/barrio/obras", async (req: Request, res: Response) => {
    try {
      const j = await jugador(req, res);
      if (!j) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoObrasBarrio(j.ch, j.barrio));
    } catch (err) {
      console.error("[obras del barrio] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // aportar gozo a la obra de ahora: { gozo }
  app.post("/api/jerusalen/barrio/obras/aportar", async (req: Request, res: Response) => {
    const pedido = Math.floor(Number(req.body?.gozo));
    if (!Number.isFinite(pedido) || pedido < 1) return res.status(400).json({ message: "Elige cuánto gozo das." });
    try {
      const j = await jugador(req, res);
      if (!j) return;
      const { ch, barrio } = j;
      if (frenar(ch.casa)) return res.status(429).json({ message: "Espera un momento" });
      const hoy = diaClave();
      const client = await pool.connect();
      let out: { status: number; message?: string; dado?: number; terminada?: ObraBarrioId | null; gozoTotal?: number };
      try {
        await client.query("BEGIN");
        const { rows: h } = await client.query(`SELECT obra FROM game_barrio_obras WHERE barrio = $1 AND hecha_at IS NOT NULL`, [barrio]);
        const actual = obraBarrioActual(h.map((r) => String(r.obra)));
        if (!actual) {
          await client.query("ROLLBACK");
          return res.status(409).json({ message: "Tu barrio ya terminó todas sus obras. ¡Gloria a Dios!" });
        }
        await client.query(`INSERT INTO game_barrio_obras (barrio, obra) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [barrio, actual.id]);
        const { rows: o } = await client.query(`SELECT aportado FROM game_barrio_obras WHERE barrio = $1 AND obra = $2 FOR UPDATE`, [barrio, actual.id]);
        const falta = Math.max(0, actual.meta - Number(o[0]?.aportado || 0));
        const { rows: d } = await client.query(`SELECT COALESCE(sum(gozo), 0)::int AS n FROM game_barrio_obra_aportes WHERE titular = $1 AND dia = $2`, [ch.casa, hoy]);
        const quedaHoy = Math.max(0, APORTE_MAXIMO_DIA - Number(d[0]?.n || 0));
        const dar = Math.min(pedido, falta, quedaHoy);
        if (pedido < APORTE_MINIMO && falta >= APORTE_MINIMO) out = { status: 400, message: `Lo mínimo es ${APORTE_MINIMO} de gozo.` };
        else if (quedaHoy <= 0) out = { status: 409, message: `Hoy ya diste ${APORTE_MAXIMO_DIA} de gozo a la obra: mañana puedes dar más. ¡Gracias!` };
        else if (dar <= 0) out = { status: 409, message: "Esa obra ya está completa." };
        else {
          const { rows: pago } = await client.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, dar]);
          if (!pago.length) out = { status: 409, message: `Te falta gozo para dar ${dar}. Sirve, estudia y cumple tus encargos para juntarlo.` };
          else {
            const { rows: u } = await client.query(
              `UPDATE game_barrio_obras SET aportado = aportado + $3, hecha_at = CASE WHEN aportado + $3 >= $4 THEN now() ELSE NULL END
                WHERE barrio = $1 AND obra = $2 RETURNING hecha_at`,
              [barrio, actual.id, dar, actual.meta],
            );
            await client.query(`INSERT INTO game_barrio_obra_aportes (barrio, obra, titular, gozo, dia) VALUES ($1, $2, $3, $4, $5)`, [barrio, actual.id, ch.casa, dar, hoy]);
            out = { status: 200, dado: dar, terminada: u[0]?.hecha_at ? actual.id : null, gozoTotal: Number(pago[0].gozo) };
          }
        }
        if (out.status === 200) await client.query("COMMIT");
        else await client.query("ROLLBACK");
      } catch (e) {
        await client.query("ROLLBACK").catch(() => null);
        throw e;
      } finally {
        client.release();
      }
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      anotarGasto("obras-barrio", out.dado!);
      await sumarALaCopa(ch.id, "obra", out.dado! / 10);
      if (out.terminada) {
        hechasCache.delete(barrio);
        // las estrellas de las casas (los árboles y la placa) y las calles cambian
        olvidarBarrio(barrio);
        const o = obraBarrio(out.terminada)!;
        await evento(ch.user_id, `obra-barrio:${barrio}:${o.id}`, `terminó con sus vecinos ${o.nombre.charAt(0).toLowerCase()}${o.nombre.slice(1)} en ${nombreDeBarrio(barrio)}`).catch(() => null);
        const hechas = await obrasDeBarrio(barrio);
        difundirAlBarrio(barrio, () => ({ t: "obras-barrio", n: barrio, obras: hechas, terminada: o.id }));
      }
      const estado = await estadoObrasBarrio(ch, barrio);
      const r: AporteBarrioRespuesta = { ...estado, dado: out.dado!, terminada: out.terminada ?? null, gozoTotal: out.gozoTotal! };
      res.json(r);
    } catch (err) {
      console.error("[obras del barrio] aportar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}

