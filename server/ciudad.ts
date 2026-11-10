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
import { CARGOS_DE_PRUEBA, JERUSALEN_JUEGO, type EscalonId } from "@shared/jerusalen";
import { fechaDe, relojEnLinea } from "@shared/calendario";
import {
  AREAS, BIEN, BIENES, CASAS_POR_BARRIO, NIVELES_CASA, SIERVOS_DIA, SIERVOS_SALIDA, areaDeBarrio, bienDeFiesta, capacidadAlfoli, honraDe,
  horasEfectivas, nivelPorHonra, nombreDeBarrio, siervosPermitidos, type BarrioEstado, type Bien, type CasaPrivada, type CasaVista, type CasaVisita,
  type CiudadEstado,
} from "@shared/ciudad";

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

/** La honra de un personaje: el mérito de todas sus temporadas y lo que su casa ofreció en el templo. */
async function honraDePersonaje(characterId: number): Promise<number> {
  const { rows } = await pool.query(
    `SELECT COALESCE((SELECT sum(merit) FROM game_season_merit WHERE character_id = $1), 0)::int AS total,
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
function enFilaCasa<T>(key: number, fn: () => Promise<T>): Promise<T> {
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
function leerBienes(v: unknown): Record<Bien, number> {
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
async function recoger(characterId: number): Promise<Recogida | null> {
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
      `SELECT h.character_id, h.plot, h.level, h.offered, c.name, c.user_id, u.display_name, u.username,
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
      const subio = await subirSiAlcanza(id, userId, barrio, nivel, honraDe(Number(r.honra), Number(r.offered)));
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

async function estadoCiudad(ch: PersonajeFila, casa: CasaFila, subio: number | null, privada: CasaPrivada): Promise<CiudadEstado> {
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
      const rec = await recoger(ch.id);
      if (!rec) return res.sendStatus(500);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, subio, await privadaDe(ch.id, rec, true)));
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
      if (!frenoCasa(ch.id, res)) return;
      const lista = req.body?.siervos;
      if (!Array.isArray(lista) || lista.some((x) => typeof x !== "string" || !(x in BIEN))) return res.status(400).json({ message: "Tareas no válidas" });
      // primero se guarda lo que prepararon con las tareas de antes
      const rec = await recoger(ch.id);
      if (!rec) return res.status(404).json({ message: "Primero entra a la ciudad." });
      const max = siervosPermitidos(rec.nivel);
      if (lista.length > max) return res.status(400).json({ message: `Tu casa tiene lugar para ${max} ${max === 1 ? "siervo" : "siervos"}.` });
      await pool.query(`UPDATE game_houses SET servants = $2::jsonb WHERE character_id = $1`, [ch.id, JSON.stringify(lista)]);
      rec.siervos = lista as Bien[];
      res.json(await privadaDe(ch.id, rec, false));
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
      if (!frenoCasa(ch.id, res)) return;
      const pedido = req.body?.bienes;
      if (!pedido || typeof pedido !== "object" || Array.isArray(pedido)) return res.status(400).json({ message: "Ofrenda no válida" });
      const cuanto = cero();
      for (const b of BIENES) {
        const n = pedido[b.id];
        if (n === undefined) continue;
        if (!Number.isInteger(n) || n < 0 || n > 1000) return res.status(400).json({ message: "Ofrenda no válida" });
        cuanto[b.id] = n;
      }
      if (cuanto.harina + cuanto.aceite + cuanto.corderos === 0) return res.status(400).json({ message: "Elige qué llevar al templo." });
      const out = await (async () => {
        const rec = await recoger(ch.id);
        if (!rec) return { status: 404, body: { message: "Primero entra a la ciudad." } };
        return enFilaCasa(ch.id, async () => {
          for (const b of BIENES) if (cuanto[b.id] > Math.floor(rec.bienes[b.id])) return { status: 409, body: { message: `No tienes tanto ${b.nombre.toLowerCase()} en el alfolí.` } };
          const fiesta = fechaDe(relojEnLinea().dia).fiestas[0]?.fiesta;
          const doble = bienDeFiesta(fiesta?.ofrenda);
          let ganado = 0;
          for (const b of BIENES) {
            rec.bienes[b.id] -= cuanto[b.id];
            ganado += cuanto[b.id] * b.honra * (b.id === doble ? 2 : 1);
          }
          await pool.query(`UPDATE game_houses SET goods = $2::jsonb, offered = offered + $3 WHERE character_id = $1`, [ch.id, JSON.stringify(rec.bienes), ganado]);
          rec.ofrecido += ganado;
          rec.recogido = cero();
          return { status: 200, body: { ganado, doble: doble && cuanto[doble] > 0 ? doble : null, rec } };
        });
      })();
      const hecho = out.body as { ganado?: number; doble?: Bien | null; rec?: Recogida; message?: string };
      if (out.status !== 200 || !hecho.rec) return res.status(out.status).json(out.body);
      const rec = hecho.rec;
      const { rows } = await pool.query(`SELECT barrio, level FROM game_houses WHERE character_id = $1`, [ch.id]);
      const subio = await subirSiAlcanza(ch.id, ch.user_id, Number(rows[0].barrio), Number(rows[0].level), await honraDePersonaje(ch.id));
      if (subio !== null) {
        olvidarBarrio(Number(rows[0].barrio));
        rec.nivel = subio;
      }
      res.json({ ganado: hecho.ganado ?? 0, doble: hecho.doble ?? null, subio, honra: await honraDePersonaje(ch.id), privada: await privadaDe(ch.id, rec, false) });
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
              COALESCE(sm.merit, 0)::int AS merito, o.office,
              (SELECT count(*)::int FROM game_house_blessings b WHERE b.house_character_id = h.character_id) AS bendiciones,
              EXISTS (SELECT 1 FROM game_house_blessings b WHERE b.house_character_id = h.character_id AND b.visitor_user_id = $2 AND b.day_key = $3) AS ya
         FROM game_houses h
         JOIN game_characters c ON c.id = h.character_id
         JOIN users u ON u.id = c.user_id
         LEFT JOIN game_season_merit sm ON sm.character_id = h.character_id AND sm.season = $4
         LEFT JOIN game_offices o ON o.character_id = h.character_id AND o.season = $4 AND o.office IS NOT NULL AND o.lost_at IS NULL
        WHERE h.character_id = $1 AND h.game = $5`,
      [personajeId, yo.user_id, hoyClave(), t.n, JUEGO],
    );
    const r = rows[0];
    if (!r || r.is_active === false) return null;
    return {
      userId: Number(r.user_id),
      visita: {
        personajeId: Number(r.character_id),
        nombre: nombreDe(r),
        escalon: (r.office as EscalonId | null) || escalonPorMerito(Number(r.merito)),
        barrio: Number(r.barrio),
        parcela: Number(r.plot),
        nivel: Number(r.level),
        bendiciones: Number(r.bendiciones),
        yaBendije: r.ya === true,
        esMia: Number(r.character_id) === yo.id,
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
      res.json({ ...c.visita, bendiciones: c.visita.bendiciones + 1, yaBendije: true });
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
      const { rows } = await pool.query(`SELECT barrio, plot, level FROM game_houses WHERE character_id = $1`, [ch.id]);
      if (!rows[0]) return res.status(404).json({ message: "Todavía no tienes casa en la ciudad." });
      const casa = { barrio: Number(rows[0].barrio), plot: Number(rows[0].plot), level: Number(rows[0].level) };
      const rec = await recoger(ch.id);
      if (!rec) return res.sendStatus(500);
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoCiudad(ch, casa, null, await privadaDe(ch.id, rec, true)));
    } catch (err) {
      console.error("[ciudad] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
