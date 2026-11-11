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
import { diaClave, escalonPorMerito, evento, hoyEnJerusalen, nombreDe, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { avanzarMision } from "./misiones";
import { coloresDeRopa } from "./ropa";
import { RECETAS, guardarPreparadas, leerPreparadas, type Preparadas } from "@shared/mercado";
import { CARGOS_DE_PRUEBA, JERUSALEN_JUEGO, type EscalonId } from "@shared/jerusalen";
import { nivelBarrio } from "./barrio-juntos";
import { diaEnJerusalen } from "@shared/anio";
import {
  AREAS, BIEN, BIENES, CASAS_POR_BARRIO, NIVELES_CASA, SIERVOS_DIA, SIERVOS_SALIDA, areaDeBarrio, bienDeFiesta, capacidadAlfoli, honraDe,
  horasEfectivas, nivelPorHonra, nombreDeBarrio, siervosPermitidos, type BarrioEstado, type Bien, type CasaPrivada, type CasaVista, type CasaVisita,
  type CiudadEstado,
} from "@shared/ciudad";
import { leerInterior, leerMuebles, planoDe, porQueNoCabe, validarInterior, type Colocado, type InteriorEstado } from "@shared/casa-interior";

const JUEGO = JERUSALEN_JUEGO;

type CasaFila = { barrio: number; plot: number; level: number };

/**
 * El mérito de la temporada ($3) y el cargo que se ven en la casa: los de la persona (el mejor de sus
 * personajes), porque la casa es una sola para todos ellos.
 */
const PERSONA_MERITO_CARGO = `(SELECT COALESCE(MAX(sm.merit), 0)::int FROM game_season_merit sm JOIN game_characters c3 ON c3.id = sm.character_id
                 WHERE c3.user_id = c.user_id AND c3.game = c.game AND sm.season = $3) AS merito,
              (SELECT o.office FROM game_offices o JOIN game_characters c4 ON c4.id = o.character_id
                 WHERE c4.user_id = c.user_id AND c4.game = c.game AND o.season = $3 AND o.office IS NOT NULL AND o.lost_at IS NULL
                 ORDER BY CASE o.office WHEN 'sumo' THEN 0 WHEN 'principal' THEN 1 ELSE 2 END LIMIT 1) AS office`;

/** La casa del personaje; si todavía no tiene, la primera parcela libre. */
async function asegurarCasa(ch: PersonajeFila): Promise<{ casa: CasaFila; nueva: boolean }> {
  const leer = async () => {
    const { rows } = await pool.query(`SELECT barrio, plot, level FROM game_houses WHERE character_id = $1`, [ch.casa]);
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
      [ch.casa, JUEGO, barrio, plot],
    );
    if (hecha.length) return { casa: { barrio, plot, level: 0 }, nueva: true };
    const otra = await leer();
    if (otra) return { casa: otra, nueva: false };
  }
  throw new Error("No se encontró una parcela libre");
}

/**
 * La honra de una persona (por el id de su casa, el titular): el mérito de todas las temporadas de todos
 * sus personajes y lo que su casa ofreció en el templo.
 */
async function honraDePersonaje(characterId: number): Promise<number> {
  const { rows } = await pool.query(
    `SELECT COALESCE((SELECT sum(m.merit) FROM game_season_merit m JOIN game_characters c2 ON c2.id = m.character_id
                        JOIN game_characters t ON t.user_id = c2.user_id AND t.game = c2.game WHERE t.id = $1), 0)::int AS total,
            COALESCE((SELECT offered FROM game_houses WHERE character_id = $1), 0)::int AS ofrecido`,
    [characterId],
  );
  return honraDe(Number(rows[0]?.total || 0), Number(rows[0]?.ofrecido || 0));
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

// ---------------------------------------------------------------- tus siervos y tu alfolí
/** Una cosa a la vez por casa (recoger, cambiar siervos y ofrecer tocan la misma fila). */
const filasCasa = new Map<number, Promise<unknown>>();
export function enFilaCasa<T>(key: number, fn: () => Promise<T>): Promise<T> {
  const prev = filasCasa.get(key) || Promise.resolve();
  const next = prev.catch(() => null).then(fn);
  filasCasa.set(key, next);
  void next
    .catch(() => null)
    .finally(() => {
      if (filasCasa.get(key) === next) filasCasa.delete(key);
    });
  return next;
}

const cero = (): Record<Bien, number> => ({ harina: 0, aceite: 0, corderos: 0 });
export function leerBienes(v: unknown): Record<Bien, number> {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const out = cero();
  for (const b of BIENES) {
    const n = Number(o[b.id]);
    out[b.id] = Number.isFinite(n) && n > 0 ? n : 0;
  }
  return out;
}
function leerSiervos(v: unknown, max: number): Bien[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === "string" && x in BIEN) as Bien[]).slice(0, max) : [];
}

type Recogida = { nivel: number; siervos: Bien[]; bienes: Record<Bien, number>; recogido: Record<Bien, number>; usadoHoy: number; ofrecido: number };

/**
 * Lo que prepararon los siervos desde la última vez, con el tope de los levitas: como mucho 2 h
 * por salida y 3 h por día, y la segunda hora rinde la mitad. Se guarda en el alfolí (con su tope).
 */
export async function recoger(characterId: number): Promise<Recogida | null> {
  return enFilaCasa(characterId, async () => {
    const { rows } = await pool.query(
      `SELECT level, servants, goods, prod_day, prod_seconds, offered,
              EXTRACT(EPOCH FROM (now() - COALESCE(collected_at, created_at)))::float AS pasados
         FROM game_houses WHERE character_id = $1`,
      [characterId],
    );
    const r = rows[0];
    if (!r) return null;
    const nivel = Number(r.level);
    const siervos = leerSiervos(r.servants, siervosPermitidos(nivel));
    const bienes = leerBienes(r.goods);
    const hoy = diaClave();
    const antes = r.prod_day === hoy ? Number(r.prod_seconds) : 0;
    const t = siervos.length ? Math.max(0, Math.min(Number(r.pasados) || 0, SIERVOS_SALIDA, SIERVOS_DIA - antes)) : 0;
    const horas = horasEfectivas(t);
    const cap = capacidadAlfoli(nivel);
    const recogido = cero();
    for (const sv of siervos) {
      const previo = bienes[sv];
      bienes[sv] = Math.min(cap, bienes[sv] + BIEN[sv].porHora * horas);
      recogido[sv] += bienes[sv] - previo;
    }
    const usadoHoy = antes + Math.round(t);
    await pool.query(
      `UPDATE game_houses SET goods = $2::jsonb, collected_at = now(), prod_day = $3, prod_seconds = $4 WHERE character_id = $1`,
      [characterId, JSON.stringify(bienes), hoy, usadoHoy],
    );
    return { nivel, siervos, bienes, recogido, usadoHoy, ofrecido: Number(r.offered) };
  });
}

/** Lo de tu casa que solo ves tú; con `marcar`, las bendiciones nuevas quedan vistas. */
async function privadaDe(characterId: number, r: Recogida, marcar: boolean): Promise<CasaPrivada> {
  const [{ rows: total }, { rows: nuevas }] = await Promise.all([
    pool.query(`SELECT count(*)::int AS n FROM game_house_blessings WHERE house_character_id = $1`, [characterId]),
    pool.query(
      `SELECT u.id AS user_id, u.display_name, u.username, c.name
         FROM game_house_blessings b
         JOIN users u ON u.id = b.visitor_user_id
         LEFT JOIN game_characters c ON c.user_id = u.id AND c.game = $2
        WHERE b.house_character_id = $1
          AND b.created_at > COALESCE((SELECT blessings_seen_at FROM game_houses WHERE character_id = $1), 'epoch'::timestamp)
        ORDER BY b.created_at DESC LIMIT 6`,
      [characterId, JUEGO],
    ),
  ]);
  if (marcar && nuevas.length) await pool.query(`UPDATE game_houses SET blessings_seen_at = now() WHERE character_id = $1`, [characterId]);
  const piso = (o: Record<Bien, number>) => ({ harina: Math.floor(o.harina), aceite: Math.floor(o.aceite), corderos: Math.floor(o.corderos) });
  const rec = piso(r.recogido);
  return {
    siervos: r.siervos,
    maxSiervos: siervosPermitidos(r.nivel),
    bienes: piso(r.bienes),
    capacidad: capacidadAlfoli(r.nivel),
    recogido: rec.harina + rec.aceite + rec.corderos > 0 ? rec : null,
    minutosHoy: Math.round(r.usadoHoy / 60),
    ofrecido: r.ofrecido,
    bendiciones: Number(total[0]?.n || 0),
    nuevasBendiciones: nuevas.map((x) => nombreDe(x)),
  };
}

// ---------------------------------------------------------------- el resumen de cada barrio
const resumenes = new Map<number, { at: number; casas: (CasaVista & { userId: number })[] }>();
const armando = new Map<number, Promise<(CasaVista & { userId: number })[]>>();
const RESUMEN_MS = 30_000;
/** Cuántas veces se borró la memoria de cada barrio: una consulta que ya estaba en camino no guarda lo viejo. */
const borrados = new Map<number, number>();

/** Borrar la memoria de las casas de un barrio (cambió una casa: su nivel, sus adornos o su letrero). */
export function olvidarBarrio(barrio: number) {
  resumenes.delete(barrio);
  armando.delete(barrio);
  borrados.set(barrio, (borrados.get(barrio) ?? 0) + 1);
  if (borrados.size > 2000) borrados.clear();
  siluetas = null;
}

/** Las casas de un barrio con su nivel, el nombre y el escalón de cada dueño (en memoria 30 s). */
export async function casasDelBarrio(barrio: number): Promise<(CasaVista & { userId: number })[]> {
  const hit = resumenes.get(barrio);
  if (hit && Date.now() - hit.at < RESUMEN_MS) return hit.casas;
  const enCurso = armando.get(barrio);
  if (enCurso) return enCurso;
  const vez = borrados.get(barrio) ?? 0;
  const p = (async () => {
    const t = temporadaDe();
    const { rows } = await pool.query(
      `SELECT h.character_id, h.plot, h.level, h.offered, h.adornos, h.letrero, c.name, c.user_id, u.display_name, u.username,
              (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual,
              (SELECT COALESCE(sum(m.merit), 0)::int FROM game_season_merit m JOIN game_characters c2 ON c2.id = m.character_id
                WHERE c2.user_id = c.user_id AND c2.game = c.game) AS honra,
              ${PERSONA_MERITO_CARGO}
         FROM game_houses h
         JOIN game_characters c ON c.id = h.character_id
         JOIN users u ON u.id = c.user_id
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
      const subio = await subirSiAlcanza(id, userId, barrio, nivel, honraDe(Number(r.honra), Number(r.offered)));
      if (subio !== null) nivel = subio;
      casas.push({
        parcela: Number(r.plot),
        nivel,
        personajeId: id,
        // la casa es de la persona: lleva el nombre del personaje con que juega ahora
        nombre: nombreDe({ ...r, name: r.actual ?? r.name }),
        escalon: (r.office as EscalonId | null) || escalonPorMerito(Number(r.merito)),
        esMia: false,
        adornos: Array.isArray(r.adornos) ? (r.adornos as unknown[]).filter((x): x is string => typeof x === "string").slice(0, 8) : [],
        letrero: (r.letrero as string | null) ?? null,
        userId,
      });
    }
    // si mientras tanto alguien cambió su casa, esto ya es viejo: se devuelve, pero no se guarda
    if ((borrados.get(barrio) ?? 0) === vez) resumenes.set(barrio, { at: Date.now(), casas });
    if (resumenes.size > 500) resumenes.clear();
    return casas;
  })();
  armando.set(barrio, p);
  try {
    return await p;
  } finally {
    if (armando.get(barrio) === p) armando.delete(barrio);
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

async function estadoCiudad(ch: PersonajeFila, casa: CasaFila, subio: number | null, privada: CasaPrivada): Promise<CiudadEstado> {
  const t = temporadaDe();
  const [honra, casas, otros, { rows: yo }] = await Promise.all([
    honraDePersonaje(ch.casa),
    casasDelBarrio(casa.barrio),
    otrosBarrios(casa.barrio),
    // la ropa es de cada personaje; el gozo, de la persona (lo guarda el titular)
    pool.query(`SELECT (SELECT ropa FROM game_characters WHERE id = $1) AS ropa, (SELECT gozo FROM game_characters WHERE id = $2) AS gozo`, [ch.id, ch.casa]),
  ]);
  const mia = casas.find((c) => c.personajeId === ch.casa);
  const nivel = Math.max(casa.level, mia?.nivel ?? 0);
  const sig = NIVELES_CASA[nivel + 1];
  return {
    yo: {
      personajeId: ch.id,
      casaId: ch.casa,
      nombre: nombreDe(ch),
      escalon: mia?.escalon ?? "sacerdote",
      camino: ch.camino,
      pasos: ch.instruccion,
      ropa: coloresDeRopa(yo[0]?.ropa),
      gozo: Number(yo[0]?.gozo || 0),
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
      casas: casas.map(({ userId, ...c }) => ({ ...c, esMia: c.personajeId === ch.casa, nivel: c.personajeId === ch.casa ? nivel : c.nivel })),
      libres: Math.max(0, CASAS_POR_BARRIO - casas.length),
      nivelBarrio: await nivelBarrio(casa.barrio).catch(() => 0),
    },
    otros,
    jerusalen: hoyEnJerusalen(),
    temporada: { n: t.n, dePrueba: CARGOS_DE_PRUEBA, diasRestantes: t.diasRestantes },
    privada,
  };
}

/** El día de las bendiciones (el de Texas, como el del servicio). */
const hoyClave = () => diaClave();

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
      if (now - (ultimaEntrada.get(ch.casa) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimaEntrada.set(ch.casa, now);
      if (ultimaEntrada.size > 5000) ultimaEntrada.clear();
      const { casa, nueva } = await asegurarCasa(ch);
      if (nueva) {
        await avisarCasa(ch.user_id, casa.barrio, 0);
        olvidarBarrio(casa.barrio);
      }
      const subio = await subirSiAlcanza(ch.casa, ch.user_id, casa.barrio, casa.level, await honraDePersonaje(ch.casa));
      if (subio !== null) {
        casa.level = subio;
        olvidarBarrio(casa.barrio);
      }
      const rec = await recoger(ch.casa);
      if (!rec) return res.sendStatus(500);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, subio, await privadaDe(ch.casa, rec, true)));
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
        casas: casas.map(({ userId, ...c }) => ({ ...c, esMia: c.personajeId === ch.casa })),
        nivelBarrio: await nivelBarrio(n).catch(() => 0),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(body);
    } catch (err) {
      console.error("[ciudad] barrio:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  const ultimaCasa = new Map<number, number>();
  /** Un cambio de la casa cada segundo como mucho. */
  function frenoCasa(id: number, res: Response): boolean {
    const now = Date.now();
    if (now - (ultimaCasa.get(id) || 0) < 900) {
      res.status(429).json({ message: "Espera un momento" });
      return false;
    }
    ultimaCasa.set(id, now);
    if (ultimaCasa.size > 5000) ultimaCasa.clear();
    return true;
  }

  // Elegir los siervos de la casa y la tarea de cada uno (harina, aceite o corderos).
  app.post("/api/jerusalen/ciudad/casa/siervos", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (!frenoCasa(ch.casa, res)) return;
      const lista = req.body?.siervos;
      if (!Array.isArray(lista) || lista.some((x) => typeof x !== "string" || !(x in BIEN))) return res.status(400).json({ message: "Tareas no válidas" });
      // primero se guarda lo que prepararon con las tareas de antes
      const rec = await recoger(ch.casa);
      if (!rec) return res.status(404).json({ message: "Primero entra a la ciudad." });
      const max = siervosPermitidos(rec.nivel);
      if (lista.length > max) return res.status(400).json({ message: `Tu casa tiene lugar para ${max} ${max === 1 ? "siervo" : "siervos"}.` });
      await pool.query(`UPDATE game_houses SET servants = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(lista)]);
      rec.siervos = lista as Bien[];
      res.json(await privadaDe(ch.casa, rec, false));
    } catch (err) {
      console.error("[ciudad] siervos:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Llevar al templo lo del alfolí: da honra a la casa (no mérito). En la fiesta, su ofrenda vale el doble.
  app.post("/api/jerusalen/ciudad/casa/ofrendar", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      if (!frenoCasa(ch.casa, res)) return;
      const pedido = req.body?.bienes ?? {};
      if (!pedido || typeof pedido !== "object" || Array.isArray(pedido)) return res.status(400).json({ message: "Ofrenda no válida" });
      const cuanto = cero();
      for (const b of BIENES) {
        const n = pedido[b.id];
        if (n === undefined) continue;
        if (!Number.isInteger(n) || n < 0 || n > 1000) return res.status(400).json({ message: "Ofrenda no válida" });
        cuanto[b.id] = n;
      }
      // y lo preparado en el horno (tortas, aceite puro)
      const pedidoPrep = req.body?.preparadas ?? {};
      if (!pedidoPrep || typeof pedidoPrep !== "object" || Array.isArray(pedidoPrep)) return res.status(400).json({ message: "Ofrenda no válida" });
      const prep: Preparadas = { tortas: 0, aceitePuro: 0 };
      for (const k of ["tortas", "aceitePuro"] as const) {
        const n = pedidoPrep[k];
        if (n === undefined) continue;
        if (!Number.isInteger(n) || n < 0 || n > 100) return res.status(400).json({ message: "Ofrenda no válida" });
        prep[k] = n;
      }
      if (cuanto.harina + cuanto.aceite + cuanto.corderos + prep.tortas + prep.aceitePuro === 0) return res.status(400).json({ message: "Elige qué llevar al templo." });
      const out = await (async () => {
        const rec = await recoger(ch.casa);
        if (!rec) return { status: 404, body: { message: "Primero entra a la ciudad." } };
        return enFilaCasa(ch.casa, async () => {
          for (const b of BIENES) if (cuanto[b.id] > Math.floor(rec.bienes[b.id])) return { status: 409, body: { message: `No tienes tanto ${b.nombre.toLowerCase()} en el alfolí.` } };
          const { rows: pr } = await pool.query(`SELECT preparadas FROM game_houses WHERE character_id = $1`, [ch.casa]);
          const lp = leerPreparadas(pr[0]?.preparadas);
          for (const k of ["tortas", "aceitePuro"] as const) {
            if (prep[k] > lp.preparadas[k]) return { status: 409, body: { message: `No tienes tantas ofrendas preparadas: ${RECETAS[k].nombre.toLowerCase()}.` } };
          }
          const fiesta = diaEnJerusalen().fecha.fiestas[0]?.fiesta;
          const doble = bienDeFiesta(fiesta?.ofrenda);
          let ganado = 0;
          for (const b of BIENES) {
            rec.bienes[b.id] -= cuanto[b.id];
            ganado += cuanto[b.id] * b.honra * (b.id === doble ? 2 : 1);
          }
          // lo preparado vale más; en las fiestas del cereal, las tortas valen el doble
          for (const k of ["tortas", "aceitePuro"] as const) {
            lp.preparadas[k] -= prep[k];
            ganado += prep[k] * RECETAS[k].honra * (k === "tortas" && doble === "harina" ? 2 : 1);
          }
          await pool.query(`UPDATE game_houses SET goods = $2::jsonb, offered = offered + $3, preparadas = $4::jsonb WHERE character_id = $1`, [
            ch.casa, JSON.stringify(rec.bienes), ganado, guardarPreparadas(lp.preparadas, lp.horno),
          ]);
          rec.ofrecido += ganado;
          rec.recogido = cero();
          return { status: 200, body: { ganado, doble: doble && cuanto[doble] > 0 ? doble : null, rec } };
        });
      })();
      const hecho = out.body as { ganado?: number; doble?: Bien | null; rec?: Recogida; message?: string };
      if (out.status !== 200 || !hecho.rec) return res.status(out.status).json(out.body);
      const rec = hecho.rec;
      const { rows } = await pool.query(`SELECT barrio, level FROM game_houses WHERE character_id = $1`, [ch.casa]);
      const subio = await subirSiAlcanza(ch.casa, ch.user_id, Number(rows[0].barrio), Number(rows[0].level), await honraDePersonaje(ch.casa));
      if (subio !== null) {
        olvidarBarrio(Number(rows[0].barrio));
        rec.nivel = subio;
      }
      const misiones = (hecho.ganado ?? 0) > 0 ? await avanzarMision(ch, "alfoli", 1).catch(() => []) : [];
      res.json({
        ganado: hecho.ganado ?? 0,
        doble: hecho.doble ?? null,
        subio,
        honra: await honraDePersonaje(ch.casa),
        privada: await privadaDe(ch.casa, rec, false),
        ...(misiones.length ? { misiones } : {}),
      });
    } catch (err) {
      console.error("[ciudad] ofrendar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  /** ¿Se bloquearon (en cualquier sentido)? */
  async function bloqueados(a: number, b: number): Promise<boolean> {
    const { rows } = await pool.query(
      `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1) LIMIT 1`,
      [a, b],
    );
    return rows.length > 0;
  }

  async function casaVisita(personajeId: number, yo: PersonajeFila): Promise<{ visita: CasaVisita; userId: number } | null> {
    const t = temporadaDe();
    const { rows } = await pool.query(
      `SELECT h.character_id, h.barrio, h.plot, h.level, c.name, c.user_id, u.display_name, u.username, u.is_active,
              (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS actual,
              ${PERSONA_MERITO_CARGO.replace(/\$3/g, () => "$4")},
              (SELECT count(*)::int FROM game_house_blessings b WHERE b.house_character_id = h.character_id) AS bendiciones,
              EXISTS (SELECT 1 FROM game_house_blessings b WHERE b.house_character_id = h.character_id AND b.visitor_user_id = $2 AND b.day_key = $3) AS ya
         FROM game_houses h
         JOIN game_characters c ON c.id = h.character_id
         JOIN users u ON u.id = c.user_id
        WHERE h.character_id = $1 AND h.game = $5`,
      [personajeId, yo.user_id, hoyClave(), t.n, JUEGO],
    );
    const r = rows[0];
    if (!r || r.is_active === false) return null;
    return {
      userId: Number(r.user_id),
      visita: {
        personajeId: Number(r.character_id),
        nombre: nombreDe({ ...r, name: r.actual ?? r.name }),
        escalon: (r.office as EscalonId | null) || escalonPorMerito(Number(r.merito)),
        barrio: Number(r.barrio),
        parcela: Number(r.plot),
        nivel: Number(r.level),
        bendiciones: Number(r.bendiciones),
        yaBendije: r.ya === true,
        esMia: Number(r.character_id) === yo.casa,
      },
    };
  }

  // Visitar la casa de un vecino (sin tocar nada): su nivel y sus bendiciones.
  app.get("/api/jerusalen/ciudad/casa/:personajeId", async (req: Request, res: Response) => {
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Casa no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const c = await casaVisita(id, ch);
      if (!c) return res.status(404).json({ message: "Esa casa ya no está en Jerusalén." });
      if (!c.visita.esMia && (await bloqueados(ch.user_id, c.userId))) return res.status(403).json({ message: "No puedes visitar esta casa." });
      res.setHeader("Cache-Control", "no-store");
      res.json(c.visita);
    } catch (err) {
      console.error("[ciudad] visita:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // ---------------------------------------------------------------- la casa por dentro (shared/casa-interior.ts)
  /** La casa por dentro: la tuya (con tus muebles para remodelar) o la de un vecino (solo para verla). */
  async function interiorDe(personajeId: number, yo: PersonajeFila): Promise<{ estado: InteriorEstado; userId: number } | null> {
    const c = await casaVisita(personajeId, yo);
    if (!c) return null;
    const { rows } = await pool.query(
      `SELECT h.interior, h.letrero, ch.muebles, ch.gozo FROM game_houses h JOIN game_characters ch ON ch.id = h.character_id WHERE h.character_id = $1`,
      [personajeId],
    );
    const r = rows[0] || {};
    const esMia = c.visita.esMia;
    const nivel = c.visita.nivel;
    let interior = leerInterior(r.interior);
    // si la casa creció (otro plano), lo que ya no cabe vuelve al arcón: queda lo que sigue cabiendo
    const plano = planoDe(nivel);
    const caben: Colocado[] = [];
    for (const it of interior) if (caben.length < plano.maxMuebles && !porQueNoCabe(plano, nivel, it, caben)) caben.push(it);
    if (caben.length !== interior.length) {
      interior = caben;
      if (esMia) await pool.query(`UPDATE game_houses SET interior = $2::jsonb WHERE character_id = $1`, [personajeId, JSON.stringify(caben)]);
    }
    return {
      userId: c.userId,
      estado: {
        personajeId,
        dueno: c.visita.nombre,
        esMia,
        nivel,
        nombreNivel: NIVELES_CASA[nivel]?.nombre ?? "",
        letrero: (r.letrero as string | null) ?? null,
        interior,
        muebles: esMia ? leerMuebles(r.muebles) : {},
        bendiciones: c.visita.bendiciones,
        yaBendije: c.visita.yaBendije,
        gozo: esMia ? Number(r.gozo || 0) : 0,
      },
    };
  }

  app.get("/api/jerusalen/casa/interior", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const d = await interiorDe(ch.casa, ch);
      if (!d) return res.status(404).json({ message: "No encontramos tu casa." });
      res.setHeader("Cache-Control", "no-store");
      res.json(d.estado);
    } catch (err) {
      console.error("[ciudad] interior:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.get("/api/jerusalen/casa/interior/:personajeId", async (req: Request, res: Response) => {
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Casa no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const d = await interiorDe(id, ch);
      if (!d) return res.status(404).json({ message: "Esa casa ya no está en Jerusalén." });
      if (!d.estado.esMia && (await bloqueados(ch.user_id, d.userId))) return res.status(403).json({ message: "No puedes visitar esta casa." });
      res.setHeader("Cache-Control", "no-store");
      res.json(d.estado);
    } catch (err) {
      console.error("[ciudad] interior de un vecino:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Remodelar: se guarda cómo quedaron los muebles (el servidor revisa que quepan y que sean tuyos).
  const ultimoRemodelar = new Map<number, number>();
  app.post("/api/jerusalen/casa/interior", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimoRemodelar.get(ch.casa) || 0) < 800) return res.status(429).json({ message: "Espera un momento" });
      ultimoRemodelar.set(ch.casa, now);
      if (ultimoRemodelar.size > 5000) ultimoRemodelar.clear();
      const { rows } = await pool.query(
        `SELECT h.level, ch.muebles FROM game_houses h JOIN game_characters ch ON ch.id = h.character_id WHERE h.character_id = $1`,
        [ch.casa],
      );
      if (!rows.length) return res.status(404).json({ message: "No encontramos tu casa." });
      const v = validarInterior(Number(rows[0].level || 0), req.body?.interior, leerMuebles(rows[0].muebles));
      if (!v.ok) return res.status(400).json({ message: v.error });
      await pool.query(`UPDATE game_houses SET interior = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(v.items)]);
      const d = await interiorDe(ch.casa, ch);
      res.json(d!.estado);
    } catch (err) {
      console.error("[ciudad] remodelar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Dejar una bendición en la casa de un vecino: una por día y casa, como los aplausos.
  const ultimaBendicion = new Map<number, number>();
  app.post("/api/jerusalen/ciudad/casa/:personajeId/bendecir", async (req: Request, res: Response) => {
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Casa no válida" });
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimaBendicion.get(ch.user_id) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimaBendicion.set(ch.user_id, now);
      if (ultimaBendicion.size > 5000) ultimaBendicion.clear();
      const c = await casaVisita(id, ch);
      if (!c) return res.status(404).json({ message: "Esa casa ya no está en Jerusalén." });
      if (c.visita.esMia) return res.status(400).json({ message: "Tu casa ya tiene tu bendición." });
      if (await bloqueados(ch.user_id, c.userId)) return res.status(403).json({ message: "No puedes visitar esta casa." });
      const { rows } = await pool.query(
        `INSERT INTO game_house_blessings (house_character_id, visitor_user_id, day_key) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING 1`,
        [id, ch.user_id, hoyClave()],
      );
      if (!rows.length) return res.status(409).json({ message: "Ya dejaste tu bendición hoy en esta casa. Vuelve mañana." });
      const misiones = await avanzarMision(ch, "bendicion", 1).catch(() => []);
      res.json({ ...c.visita, bendiciones: c.visita.bendiciones + 1, yaBendije: true, ...(misiones.length ? { misiones } : {}) });
    } catch (err) {
      console.error("[ciudad] bendecir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // La ciudad otra vez (sin dar parcela): para refrescar el barrio mientras se juega.
  app.get("/api/jerusalen/ciudad", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const { rows } = await pool.query(`SELECT barrio, plot, level FROM game_houses WHERE character_id = $1`, [ch.casa]);
      if (!rows[0]) return res.status(404).json({ message: "Todavía no tienes casa en la ciudad." });
      const casa = { barrio: Number(rows[0].barrio), plot: Number(rows[0].plot), level: Number(rows[0].level) };
      const rec = await recoger(ch.casa);
      if (!rec) return res.sendStatus(500);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, null, await privadaDe(ch.casa, rec, true)));
    } catch (err) {
      console.error("[ciudad] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
