/**
 * La historia de la temporada (shared/capitulos.ts): cada semana un capítulo con una meta de toda la ciudad. La suman
 * los deberes, los encargos y los recados de todos, y la lleva este archivo. Al cumplirse, quienes ayudaron (con un
 * mínimo) reciben gozo y una prenda que no se vende; quien llega al mínimo después, en la misma semana, también.
 * Al final, la fiesta de la historia en la plaza: el servidor mira la fecha y que la persona esté de verdad en la plaza
 * (la presencia de la ciudad). Nada se simula: solo se cuenta y se comprueba.
 *
 * Las cuentas son por persona (su titular, el primer personaje), como el gozo y la racha.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { enFila, esAdmin, evento, nombreDe, personajeDe } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { titularDe } from "./racha";
import { ubicacionDe } from "./ciudad-red";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import type { MisionCumplida } from "@shared/misiones";
import {
  APORTE_MINIMO_CAPITULO, DIAS_CAPITULO, PUNTOS_CAPITULO, arcoDeTemporada, capituloDelDia, diaDeTemporada, enLaTemporada, enTexas, fechaEnPalabras,
  horaEnPalabras, metaDelCapitulo, momentoDeFiesta, type Capitulo, type CapitulosVista, type GraciasRespuesta,
} from "@shared/capitulos";

export const CAPITULOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_capitulos" (
  "season" integer NOT NULL,
  "capitulo" integer NOT NULL,
  "meta" integer NOT NULL,
  "puntos" integer NOT NULL DEFAULT 0,
  "done_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("season", "capitulo")
);
CREATE TABLE IF NOT EXISTS "game_capitulo_aportes" (
  "season" integer NOT NULL,
  "capitulo" integer NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "puntos" integer NOT NULL DEFAULT 0,
  "premiado_at" timestamp,
  PRIMARY KEY ("season", "capitulo", "titular")
);
CREATE INDEX IF NOT EXISTS "idx_game_capitulo_aportes_top" ON "game_capitulo_aportes" ("season", "capitulo", "puntos" DESC);
CREATE TABLE IF NOT EXISTS "game_fiesta_gracias" (
  "season" integer NOT NULL,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "at" timestamp NOT NULL DEFAULT now(),
  "en_vivo" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("season", "titular")
);`;

// ---------------------------------------------------------------- el reloj de la historia
// Para probar en el servidor local los capítulos que vienen y la fiesta (la administración lo mueve; en producción no
// existe la ruta y el reloj es siempre el de verdad).
let desfaseMs = 0;
export function ahoraDeLaHistoria(): Date {
  return new Date(Date.now() + desfaseMs);
}

const filasHechas = new Set<string>();

/** La fila del capítulo: la meta se fija la primera vez (por las personas que sirvieron en los últimos 7 días). */
async function asegurarCapitulo(temporada: number, n: number): Promise<void> {
  const clave = `${temporada}:${n}`;
  if (filasHechas.has(clave)) return;
  const { rows } = await pool.query(`SELECT 1 FROM game_capitulos WHERE season = $1 AND capitulo = $2`, [temporada, n]);
  if (!rows.length) {
    const { rows: a } = await pool.query(
      `SELECT count(DISTINCT c.user_id)::int AS n FROM game_characters c JOIN users u ON u.id = c.user_id
        WHERE c.game = $1 AND u.is_active = true AND c.last_duty_at > now() - interval '7 days'`,
      [JERUSALEN_JUEGO],
    );
    await pool.query(`INSERT INTO game_capitulos (season, capitulo, meta) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [temporada, n, metaDelCapitulo(Number(a[0]?.n || 0))]);
  }
  filasHechas.add(clave);
  if (filasHechas.size > 200) filasHechas.clear();
}

/**
 * Lo que la ciudad terminó la última vez que se contó cada una de las otras historias («historia:capítulo»): lo que se
 * levantó en otra temporada (las torres, el conducto) sigue en la ciudad. Las temporadas pasadas casi no cambian: se
 * recuerda unos minutos, y se olvida al cumplirse un capítulo.
 */
let hechosGuardados: { temporada: number; t: number; hechos: string[] } | null = null;
async function hechosDeAntes(temporada: number): Promise<string[]> {
  if (hechosGuardados && hechosGuardados.temporada === temporada && Date.now() - hechosGuardados.t < 5 * 60_000) return hechosGuardados.hechos;
  const actual = arcoDeTemporada(temporada)?.id;
  // la última temporada (antes de esta) en que se contó cada historia
  const ultima = new Map<string, number>();
  for (let s = temporada - 1; s >= 1; s--) {
    const a = arcoDeTemporada(s);
    if (a && a.id !== actual && !ultima.has(a.id)) ultima.set(a.id, s);
  }
  const temporadas = [...ultima.values()];
  let hechos: string[] = [];
  if (temporadas.length) {
    const { rows } = await pool.query(`SELECT season, capitulo FROM game_capitulos WHERE season = ANY($1::int[]) AND done_at IS NOT NULL ORDER BY season, capitulo`, [temporadas]);
    hechos = rows.map((r) => `${arcoDeTemporada(Number(r.season))!.id}:${Number(r.capitulo)}`);
  }
  hechosGuardados = { temporada, t: Date.now(), hechos };
  return hechos;
}

/** La prenda al armario de la casa (una sola vez). */
async function darPrenda(titular: number, prenda: string) {
  await pool.query(`UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`, [titular, prenda]);
}

/** Reparte el premio del capítulo a quienes llegaron al mínimo (o solo a una persona). Devuelve a quiénes. */
async function premiar(temporada: number, cap: Capitulo, solo: number | null): Promise<number[]> {
  const { rows } = await pool.query(
    `UPDATE game_capitulo_aportes SET premiado_at = now()
      WHERE season = $1 AND capitulo = $2 AND puntos >= $3 AND premiado_at IS NULL ${solo ? "AND titular = $4" : ""}
      RETURNING titular`,
    solo ? [temporada, cap.n, APORTE_MINIMO_CAPITULO, solo] : [temporada, cap.n, APORTE_MINIMO_CAPITULO],
  );
  for (const r of rows) {
    await sumarGozo(Number(r.titular), cap.premio.gozo, "capitulo");
    await darPrenda(Number(r.titular), cap.premio.prenda);
  }
  return rows.map((r) => Number(r.titular));
}

function avisoDePremio(cap: Capitulo): MisionCumplida {
  return { titulo: `${cap.icono} ${cap.alCumplir} Tu premio: una prenda nueva en tu armario`, premio: 0, gozo: cap.premio.gozo };
}

/**
 * Suma a la meta del capítulo de esta semana lo que hizo una persona (deberes, encargos, recados o dar gracias en la
 * fiesta). Si con esto la ciudad cumple la meta, reparte el premio. Devuelve los avisos para quien sirvió.
 */
export async function aportarAlCapitulo(ch: { id: number; user_id: number }, puntos: number): Promise<MisionCumplida[]> {
  if (!(puntos > 0)) return [];
  const hoy = capituloDelDia(enTexas(ahoraDeLaHistoria()).dia);
  if (!hoy) return [];
  const t = hoy.temporada, cap = hoy.capitulo;
  await asegurarCapitulo(t, cap.n);
  const titular = await titularDe(ch.id);
  const { rows: ap } = await pool.query(
    `INSERT INTO game_capitulo_aportes (season, capitulo, titular, puntos) VALUES ($1, $2, $3, $4)
     ON CONFLICT (season, capitulo, titular) DO UPDATE SET puntos = game_capitulo_aportes.puntos + EXCLUDED.puntos
     RETURNING puntos, premiado_at`,
    [t, cap.n, titular, Math.round(puntos)],
  );
  const sumar = () =>
    pool.query(`UPDATE game_capitulos SET puntos = puntos + $3 WHERE season = $1 AND capitulo = $2 RETURNING puntos, meta, done_at`, [t, cap.n, Math.round(puntos)]);
  let { rows: fila } = await sumar();
  if (!fila.length) {
    // la fila no está (se borró): se vuelve a crear y se suma igual, para no perder lo aportado
    filasHechas.delete(`${t}:${cap.n}`);
    await asegurarCapitulo(t, cap.n);
    ({ rows: fila } = await sumar());
  }
  const c = fila[0];
  if (!c) return [];
  const out: MisionCumplida[] = [];
  if (!c.done_at && Number(c.puntos) >= Number(c.meta)) {
    // solo uno la cumple, aunque lleguen dos a la vez
    const { rows: gano } = await pool.query(`UPDATE game_capitulos SET done_at = now() WHERE season = $1 AND capitulo = $2 AND done_at IS NULL RETURNING capitulo`, [t, cap.n]);
    if (gano.length) {
      hechosGuardados = null;
      const premiados = await premiar(t, cap, null);
      if (premiados.includes(titular)) out.push(avisoDePremio(cap));
      else out.push({ titulo: `${cap.icono} ${cap.alCumplir}`, premio: 0 });
      await evento(ch.user_id, `capitulo:${t}:${cap.n}`, `puso lo último para «${cap.titulo}», el capítulo ${cap.n} de la historia de la temporada en Jerusalén en línea`).catch(() => null);
    }
  } else if (c.done_at && Number(ap[0]?.puntos || 0) >= APORTE_MINIMO_CAPITULO && !ap[0]?.premiado_at) {
    // la ciudad ya la había cumplido y esta persona llega ahora al mínimo
    if ((await premiar(t, cap, titular)).length) out.push(avisoDePremio(cap));
  }
  return out;
}

// ---------------------------------------------------------------- lo que se ve
async function vistaDe(titular: number): Promise<CapitulosVista | null> {
  const ahora = ahoraDeLaHistoria();
  const tx = enTexas(ahora);
  const { temporada, indice } = enLaTemporada(tx.dia);
  const arco = arcoDeTemporada(temporada);
  if (!arco || indice < 0) return null;
  const hoy = capituloDelDia(tx.dia);
  const [{ rows: caps }, { rows: mios }, { rows: fiesta }, hechos] = await Promise.all([
    pool.query(`SELECT capitulo, meta, puntos, done_at FROM game_capitulos WHERE season = $1`, [temporada]),
    pool.query(`SELECT capitulo, puntos, premiado_at FROM game_capitulo_aportes WHERE season = $1 AND titular = $2`, [temporada, titular]),
    pool.query(
      `SELECT count(*)::int AS n, bool_or(titular = $2) AS fui, bool_or(titular = $2 AND en_vivo) AS vivo FROM game_fiesta_gracias WHERE season = $1`,
      [temporada, titular],
    ),
    hechosDeAntes(temporada),
  ]);
  let top: CapitulosVista["top"] = [];
  if (hoy) {
    const { rows } = await pool.query(
      `SELECT a.puntos, c.name, u.display_name, u.username, c.user_id FROM game_capitulo_aportes a
         JOIN game_characters c ON c.id = a.titular JOIN users u ON u.id = c.user_id
        WHERE a.season = $1 AND a.capitulo = $2 AND u.is_active = true AND a.puntos > 0
        ORDER BY a.puntos DESC, a.titular ASC LIMIT 5`,
      [temporada, hoy.capitulo.n],
    );
    top = rows.map((r) => ({ nombre: nombreDe(r), puntos: Number(r.puntos) }));
  }
  const actual = hoy?.capitulo.n ?? 0;
  const f = arco.fiesta;
  const m = momentoDeFiesta(ahora);
  return {
    temporada,
    arco: { id: arco.id, titulo: arco.titulo, subtitulo: arco.subtitulo, refs: arco.refs },
    hoy: hoy ? { n: hoy.capitulo.n, diaDelCapitulo: hoy.diaDelCapitulo, diasRestantes: hoy.diasRestantes } : null,
    capitulos: arco.capitulos.map((cap) => {
      const fila = caps.find((r) => Number(r.capitulo) === cap.n);
      const mio = mios.find((r) => Number(r.capitulo) === cap.n);
      const desde = (cap.n - 1) * DIAS_CAPITULO;
      return {
        n: cap.n,
        id: cap.id,
        titulo: cap.titulo,
        icono: cap.icono,
        estado: cap.n < actual || (!hoy && indice >= 0) ? "pasado" : cap.n === actual ? "actual" : "proximo",
        desde: diaDeTemporada(temporada, desde),
        hasta: diaDeTemporada(temporada, desde + DIAS_CAPITULO - 1),
        meta: fila ? Number(fila.meta) : null,
        puntos: fila ? Number(fila.puntos) : 0,
        cumplido: !!fila?.done_at,
        mios: mio ? Number(mio.puntos) : 0,
        premiado: !!mio?.premiado_at,
      };
    }),
    top,
    fiesta: {
      desde: diaDeTemporada(temporada, f.dias[0]),
      hasta: diaDeTemporada(temporada, f.dias[f.dias.length - 1]),
      momento: m?.momento ?? "antes",
      vivo: { dia: diaDeTemporada(temporada, f.vivo.indice), desde: f.vivo.desde, hasta: f.vivo.hasta },
      participantes: Number(fiesta[0]?.n || 0),
      yo: { fui: !!fiesta[0]?.fui, enVivo: !!fiesta[0]?.vivo },
    },
    aporteMinimo: APORTE_MINIMO_CAPITULO,
    hechos,
  };
}

/** Una línea para los chismes de la ciudad: cómo va la meta de esta semana. */
export async function noticiaDelCapitulo(): Promise<string | null> {
  const hoy = capituloDelDia(enTexas(ahoraDeLaHistoria()).dia);
  if (!hoy) return null;
  const { rows } = await pool.query(`SELECT meta, puntos, done_at FROM game_capitulos WHERE season = $1 AND capitulo = $2`, [hoy.temporada, hoy.capitulo.n]);
  const cap = hoy.capitulo;
  if (!rows[0]) return `Esta semana toda Jerusalén se une para ${cap.tarea}. ¡Cada deber cuenta!`;
  const puntos = Number(rows[0].puntos), meta = Number(rows[0].meta);
  if (rows[0].done_at) return `${cap.alCumplir} Ya van ${puntos.toLocaleString("es")} ${cap.unidad[1]}.`;
  return `Para ${cap.tarea}, la ciudad ya lleva ${puntos.toLocaleString("es")} de ${meta.toLocaleString("es")} ${cap.unidad[1]}. ¡Faltan ${hoy.diasRestantes} ${hoy.diasRestantes === 1 ? "día" : "días"}!`;
}

/** Para los chismes: el capítulo de hoy y cómo va la fiesta. */
export function capituloDeHoy(): { temporada: number; capitulo: Capitulo["id"] | null; fiesta: ReturnType<typeof momentoDeFiesta> } {
  const ahora = ahoraDeLaHistoria();
  const tx = enTexas(ahora);
  return { temporada: enLaTemporada(tx.dia).temporada, capitulo: capituloDelDia(tx.dia)?.capitulo.id ?? null, fiesta: momentoDeFiesta(ahora) };
}

// ---------------------------------------------------------------- rutas
export function registerCapitulosRoutes(app: Express) {
  async function persona(req: Request, res: Response) {
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

  // La historia de esta temporada: los cuatro capítulos, la meta de la semana y la fiesta.
  app.get("/api/jerusalen/capitulos", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json({ vista: await vistaDe(ch.casa) });
    } catch (err) {
      console.error("[capitulos] vista:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Dar gracias en la fiesta de la historia: en sus días y en la plaza (lo mira el servidor con la presencia).
  app.post("/api/jerusalen/capitulos/gracias", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const ahora = ahoraDeLaHistoria();
      const m = momentoDeFiesta(ahora);
      const arco = m ? arcoDeTemporada(m.temporada) : null;
      if (!m || !arco) return res.status(409).json({ message: "Ahora no hay fiesta en Jerusalén." });
      const f = arco.fiesta;
      if (m.momento === "antes") {
        return res.status(409).json({ message: `${f.titulo} será del ${fechaEnPalabras(diaDeTemporada(m.temporada, f.dias[0]))} al ${fechaEnPalabras(diaDeTemporada(m.temporada, f.dias[f.dias.length - 1]))}, en la plaza.` });
      }
      if (m.momento === "despues") return res.status(409).json({ message: `${f.titulo} ya terminó. ¡Pronto empieza otra historia!` });
      const yo = ubicacionDe(ch.id);
      if (!yo) return res.status(409).json({ message: "Ve a la ciudad, a la plaza, para dar gracias con todos." });
      if (Math.hypot(yo.x - f.lugar.x, yo.z - f.lugar.z) > f.lugar.r) return res.status(409).json({ message: "Acércate a la plaza: ahí se reúne toda la ciudad para dar gracias." });
      const vivo = m.momento === "vivo";
      const out = await enFila(ch.casa, async () => {
        const { rows: nuevo } = await pool.query(
          `INSERT INTO game_fiesta_gracias (season, titular, en_vivo) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING titular`,
          [m.temporada, ch.casa, vivo],
        );
        if (nuevo.length) {
          const gozo = f.premio.gozo + (vivo ? f.premio.vivo : 0);
          await sumarGozo(ch.casa, gozo, "fiesta-temporada");
          await darPrenda(ch.casa, f.premio.prenda);
          const avisos = await aportarAlCapitulo(ch, PUNTOS_CAPITULO.gracias);
          await evento(ch.user_id, `fiesta:${m.temporada}`, `dio gracias en ${f.titulo.toLowerCase()} de Jerusalén en línea`).catch(() => null);
          return { gozo, nuevo: true, enVivo: vivo, avisos };
        }
        if (vivo) {
          const { rows: sube } = await pool.query(`UPDATE game_fiesta_gracias SET en_vivo = true WHERE season = $1 AND titular = $2 AND en_vivo = false RETURNING titular`, [m.temporada, ch.casa]);
          if (sube.length) {
            await sumarGozo(ch.casa, f.premio.vivo, "fiesta-temporada");
            return { gozo: f.premio.vivo, nuevo: false, enVivo: true, avisos: [] };
          }
        }
        return null;
      });
      if (!out) {
        const vivoDia = fechaEnPalabras(diaDeTemporada(m.temporada, f.vivo.indice));
        return res.status(409).json({
          message: vivo ? "Ya diste gracias en la gran alabanza. ¡Gracias por venir!" : `Ya diste gracias en la fiesta. Vuelve a la gran alabanza: el ${vivoDia} a las ${horaEnPalabras(f.vivo.desde)} (hora de Texas).`,
        });
      }
      const { rows: gz } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      const vista = await vistaDe(ch.casa);
      res.json({ vista: vista!, gozo: out.gozo, gozoTotal: Number(gz[0]?.gozo || 0), nuevo: out.nuevo, enVivo: out.enVivo, avisos: out.avisos } satisfies GraciasRespuesta);
    } catch (err) {
      console.error("[capitulos] gracias:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Solo en el servidor local: mover el reloj de la historia para probar los capítulos que vienen y la fiesta.
  app.post("/api/jerusalen/admin/capitulos/reloj", (req: Request, res: Response) => {
    if (process.env.NODE_ENV === "production") return res.sendStatus(404);
    if (!esAdmin(req)) return res.sendStatus(403);
    const iso = typeof req.body?.iso === "string" ? Date.parse(req.body.iso) : NaN;
    desfaseMs = Number.isFinite(iso) ? iso - Date.now() : 0;
    const ahora = ahoraDeLaHistoria();
    res.json({ ahora: ahora.toISOString(), texas: enTexas(ahora), capitulo: capituloDelDia(enTexas(ahora).dia)?.capitulo.n ?? null, fiesta: momentoDeFiesta(ahora)?.momento ?? null });
  });
}
