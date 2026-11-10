/**
 * Jerusalén en línea, etapa 2 («La ciudad»): la casa de cada personaje y su barrio.
 *
 * Al entrar a la ciudad por primera vez el personaje recibe la primera parcela libre (los barrios
 * se llenan en orden, primero los que están junto a la plaza). Su casa sube de nivel con la honra,
 * que es el mérito de todas sus temporadas, y nunca baja.
 *
 * Nada de la ciudad se simula aquí: el teléfono dibuja y mueve todo. El resumen de cada barrio (las
 * casas con su nivel, el nombre y el cargo de cada dueño) se arma con una sola consulta y queda en
 * memoria 30 segundos, así muchos vecinos mirando el mismo barrio no cargan la base.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { escalonPorMerito, evento, hoyEnJerusalen, nombreDe, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { CARGOS_DE_PRUEBA, JERUSALEN_JUEGO, type EscalonId } from "@shared/jerusalen";
import { AREAS, CASAS_POR_BARRIO, NIVELES_CASA, areaDeBarrio, honraDe, nivelPorHonra, nombreDeBarrio, type BarrioEstado, type CasaVista, type CiudadEstado } from "@shared/ciudad";

const JUEGO = JERUSALEN_JUEGO;

type CasaFila = { barrio: number; plot: number; level: number };

/** La casa del personaje; si todavía no tiene, la primera parcela libre. */
async function asegurarCasa(ch: PersonajeFila): Promise<{ casa: CasaFila; nueva: boolean }> {
  const leer = async () => {
    const { rows } = await pool.query(`SELECT barrio, plot, level FROM game_houses WHERE character_id = $1`, [ch.id]);
    return rows[0] ? { barrio: Number(rows[0].barrio), plot: Number(rows[0].plot), level: Number(rows[0].level) } : null;
  };
  const ya = await leer();
  if (ya) return { casa: ya, nueva: false };
  // Dos personajes nuevos a la vez pueden pedir la misma parcela: el índice único lo impide y se
  // vuelve a buscar la siguiente libre.
  for (let intento = 0; intento < 6; intento++) {
    const { rows } = await pool.query(
      `SELECT n FROM generate_series(0, (SELECT COALESCE(max(barrio), 0) + 1 FROM game_houses WHERE game = $1) * $2 - 1) AS n
        WHERE NOT EXISTS (SELECT 1 FROM game_houses h WHERE h.game = $1 AND h.barrio = n / $2 + 1 AND h.plot = n % $2)
        ORDER BY n LIMIT 1`,
      [JUEGO, CASAS_POR_BARRIO],
    );
    const n = Number(rows[0]?.n ?? 0);
    const barrio = Math.floor(n / CASAS_POR_BARRIO) + 1;
    const plot = n % CASAS_POR_BARRIO;
    const { rows: hecha } = await pool.query(
      `INSERT INTO game_houses (character_id, game, barrio, plot, level) VALUES ($1, $2, $3, $4, 0)
       ON CONFLICT DO NOTHING RETURNING barrio`,
      [ch.id, JUEGO, barrio, plot],
    );
    if (hecha.length) return { casa: { barrio, plot, level: 0 }, nueva: true };
    const otra = await leer();
    if (otra) return { casa: otra, nueva: false };
  }
  throw new Error("No se encontró una parcela libre");
}

/** La honra de un personaje: el mérito de todas sus temporadas. */
async function honraDePersonaje(characterId: number): Promise<number> {
  const { rows } = await pool.query(`SELECT COALESCE(sum(merit), 0)::int AS total FROM game_season_merit WHERE character_id = $1`, [characterId]);
  return honraDe(Number(rows[0]?.total || 0));
}

/** El aviso de la comunidad cuando una casa crece (una vez por nivel). */
async function avisarCasa(userId: number, barrio: number, nivel: number) {
  const donde = nombreDeBarrio(barrio);
  const texto =
    nivel === 0
      ? `plantó su tienda en ${donde}, en la Jerusalén en línea`
      : nivel === 3
        ? `edificó un aposento alto en su casa de ${donde}`
        : `levantó su ${NIVELES_CASA[nivel].nombre.toLowerCase()} en ${donde}`;
  await evento(userId, `casa:${nivel}`, texto);
}

/** Sube el nivel guardado si la honra ya alcanza (nunca lo baja). Devuelve el nivel nuevo o null. */
async function subirSiAlcanza(characterId: number, userId: number, barrio: number, actual: number, honra: number): Promise<number | null> {
  const nivel = nivelPorHonra(honra);
  if (nivel <= actual) return null;
  const { rowCount } = await pool.query(`UPDATE game_houses SET level = $2, updated_at = now() WHERE character_id = $1 AND level < $2`, [characterId, nivel]);
  if (!rowCount) return null;
  await avisarCasa(userId, barrio, nivel);
  return nivel;
}

// ---------------------------------------------------------------- el resumen de cada barrio
const resumenes = new Map<number, { at: number; casas: (CasaVista & { userId: number })[] }>();
const armando = new Map<number, Promise<(CasaVista & { userId: number })[]>>();
const RESUMEN_MS = 30_000;

function olvidarBarrio(barrio: number) {
  resumenes.delete(barrio);
  siluetas = null;
}

/** Las casas de un barrio con su nivel, el nombre y el escalón de cada dueño (en memoria 30 s). */
export async function casasDelBarrio(barrio: number): Promise<(CasaVista & { userId: number })[]> {
  const hit = resumenes.get(barrio);
  if (hit && Date.now() - hit.at < RESUMEN_MS) return hit.casas;
  const enCurso = armando.get(barrio);
  if (enCurso) return enCurso;
  const p = (async () => {
    const t = temporadaDe();
    const { rows } = await pool.query(
      `SELECT h.character_id, h.plot, h.level, c.name, c.user_id, u.display_name, u.username,
              (SELECT COALESCE(sum(m.merit), 0)::int FROM game_season_merit m WHERE m.character_id = h.character_id) AS honra,
              COALESCE(sm.merit, 0)::int AS merito, o.office
         FROM game_houses h
         JOIN game_characters c ON c.id = h.character_id
         JOIN users u ON u.id = c.user_id
         LEFT JOIN game_season_merit sm ON sm.character_id = h.character_id AND sm.season = $3
         LEFT JOIN game_offices o ON o.character_id = h.character_id AND o.season = $3 AND o.office IS NOT NULL AND o.lost_at IS NULL
        WHERE h.game = $1 AND h.barrio = $2 AND u.is_active IS NOT FALSE
        ORDER BY h.plot`,
      [JUEGO, barrio, t.n],
    );
    const casas: (CasaVista & { userId: number })[] = [];
    for (const r of rows) {
      const id = Number(r.character_id);
      const userId = Number(r.user_id);
      let nivel = Number(r.level);
      // la casa de quien sirvió en el templo crece aunque no haya vuelto a la ciudad
      const subio = await subirSiAlcanza(id, userId, barrio, nivel, honraDe(Number(r.honra)));
      if (subio !== null) nivel = subio;
      casas.push({
        parcela: Number(r.plot),
        nivel,
        personajeId: id,
        nombre: nombreDe(r),
        escalon: (r.office as EscalonId | null) || escalonPorMerito(Number(r.merito)),
        esMia: false,
        userId,
      });
    }
    resumenes.set(barrio, { at: Date.now(), casas });
    if (resumenes.size > 500) resumenes.clear();
    return casas;
  })();
  armando.set(barrio, p);
  try {
    return await p;
  } finally {
    armando.delete(barrio);
  }
}

/** Las casas de los barrios de las otras áreas (el primero de cada una), de lejos (en memoria 30 s). */
let siluetas: { at: number; filas: { barrio: number; plot: number; level: number }[] } | null = null;
async function otrosBarrios(propio: number): Promise<CiudadEstado["otros"]> {
  if (!siluetas || Date.now() - siluetas.at > RESUMEN_MS) {
    const { rows } = await pool.query(
      `SELECT h.barrio, h.plot, h.level FROM game_houses h
         JOIN game_characters c ON c.id = h.character_id JOIN users u ON u.id = c.user_id
        WHERE h.game = $1 AND h.barrio <= $2 AND u.is_active IS NOT FALSE`,
      [JUEGO, AREAS],
    );
    siluetas = { at: Date.now(), filas: rows.map((r) => ({ barrio: Number(r.barrio), plot: Number(r.plot), level: Number(r.level) })) };
  }
  const out: CiudadEstado["otros"] = [];
  for (let area = 1; area <= AREAS; area++) {
    if (area === areaDeBarrio(propio)) continue;
    out.push({ n: area, area, casas: siluetas.filas.filter((f) => f.barrio === area).map((f) => ({ parcela: f.plot, nivel: f.level })) });
  }
  return out;
}

async function estadoCiudad(ch: PersonajeFila, casa: CasaFila, subio: number | null): Promise<CiudadEstado> {
  const t = temporadaDe();
  const [honra, casas, otros] = await Promise.all([honraDePersonaje(ch.id), casasDelBarrio(casa.barrio), otrosBarrios(casa.barrio)]);
  const mia = casas.find((c) => c.personajeId === ch.id);
  const nivel = Math.max(casa.level, mia?.nivel ?? 0);
  const sig = NIVELES_CASA[nivel + 1];
  return {
    yo: {
      personajeId: ch.id,
      nombre: nombreDe(ch),
      escalon: mia?.escalon ?? "sacerdote",
      barrio: casa.barrio,
      parcela: casa.plot,
      nivel,
      honra,
      siguiente: sig ? { nivel: sig.nivel, honra: sig.honra } : null,
      subio,
    },
    barrio: {
      n: casa.barrio,
      area: areaDeBarrio(casa.barrio),
      nombre: nombreDeBarrio(casa.barrio),
      casas: casas.map(({ userId, ...c }) => ({ ...c, esMia: c.personajeId === ch.id, nivel: c.personajeId === ch.id ? nivel : c.nivel })),
      libres: Math.max(0, CASAS_POR_BARRIO - casas.length),
    },
    otros,
    jerusalen: hoyEnJerusalen(),
    temporada: { n: t.n, dePrueba: CARGOS_DE_PRUEBA, diasRestantes: t.diasRestantes },
  };
}

// ---------------------------------------------------------------- rutas
const ultimaEntrada = new Map<number, number>();

export function registerCiudadRoutes(app: Express) {
  /** Personaje con cuenta aprobada, o la respuesta de error ya enviada. */
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
    if (!ch) res.status(404).json({ message: "Primero consagra a tu sacerdote en el templo en línea." });
    return ch;
  }

  // Entrar a la ciudad: da la parcela la primera vez, sube la casa si ya alcanza y trae el barrio.
  app.post("/api/jerusalen/ciudad/entrar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimaEntrada.get(ch.id) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimaEntrada.set(ch.id, now);
      if (ultimaEntrada.size > 5000) ultimaEntrada.clear();
      const { casa, nueva } = await asegurarCasa(ch);
      if (nueva) {
        await avisarCasa(ch.user_id, casa.barrio, 0);
        olvidarBarrio(casa.barrio);
      }
      const subio = await subirSiAlcanza(ch.id, ch.user_id, casa.barrio, casa.level, await honraDePersonaje(ch.id));
      if (subio !== null) {
        casa.level = subio;
        olvidarBarrio(casa.barrio);
      }
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, subio));
    } catch (err) {
      console.error("[ciudad] entrar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Un barrio completo, al entrar en su área (las casas con el nombre y el escalón de su dueño).
  app.get("/api/jerusalen/ciudad/barrio/:n", async (req: Request, res: Response) => {
    const n = Number(req.params.n);
    if (!Number.isInteger(n) || n < 1 || n > 1000) return res.status(400).json({ message: "Barrio no válido" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const casas = await casasDelBarrio(n);
      const body: BarrioEstado = {
        n,
        area: areaDeBarrio(n),
        nombre: nombreDeBarrio(n),
        casas: casas.map(({ userId, ...c }) => ({ ...c, esMia: c.personajeId === ch.id })),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(body);
    } catch (err) {
      console.error("[ciudad] barrio:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // La ciudad otra vez (sin dar parcela): para refrescar el barrio mientras se juega.
  app.get("/api/jerusalen/ciudad", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(`SELECT barrio, plot, level FROM game_houses WHERE character_id = $1`, [ch.id]);
      if (!rows[0]) return res.status(404).json({ message: "Todavía no tienes casa en la ciudad." });
      const casa = { barrio: Number(rows[0].barrio), plot: Number(rows[0].plot), level: Number(rows[0].level) };
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, null));
    } catch (err) {
      console.error("[ciudad] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
