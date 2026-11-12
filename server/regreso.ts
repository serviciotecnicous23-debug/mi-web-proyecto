/**
 * El regreso a Jerusalén en línea (reglas en shared/regreso.ts). La visita de cada persona (su titular, el primer
 * personaje) se anota al entrar: si vuelve después de dos días o más, es una vuelta. Entonces recibe su regalo una
 * sola vez (gozo, semillas de la estación y, la primera vez después de una semana o más, el mejor vestido) y ve lo
 * que pasó mientras no estaba en su barrio, en su casa y en la ciudad.
 *
 * Todo sale de tablas que ya existen. Solo las piedras del muro y los puntos del barrio se recuerdan aquí en cada
 * visita, porque esas tablas no guardan la fecha. Las horas se comparan siempre dentro de SQL (las columnas
 * `timestamp` sin zona se corren si pasan por JavaScript).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { faltan, leerHuerto } from "./mercado";
import { puntosDeBarrio } from "./barrio-juntos";
import { ahoraDeLaHistoria } from "./capitulos";
import { coloresDeRopa } from "./ropa";
import { refrescarFicha } from "./ciudad-red";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { diaEnJerusalen } from "@shared/anio";
import { parcelasHuerto } from "@shared/mercado";
import { nombreDeBarrio } from "@shared/ciudad";
import { nivelDeBarrio } from "@shared/barrio-juntos";
import { MURO_META, MURO_TRAMOS } from "@shared/muro";
import { arcoDeTemporada, capituloDelDia, enTexas } from "@shared/capitulos";
import {
  NOMBRE_SEMILLA, PRENDA_REGRESO, REGRESO_CADA, REGRESO_DESDE, REGRESO_VALIDO, REGRESO_VESTIDO, diasEntre, esVuelta, puedeRecibir, regaloDeRegreso,
  semillaDeRegreso, yaRecibido, type BarrioMientras, type CasaMientras, type CiudadMientras, type FilaRegreso, type RegaloRecibido, type RegaloRegreso,
  type RegresoVista,
} from "@shared/regreso";

export const REGRESO_SQL = `
CREATE TABLE IF NOT EXISTS "game_regreso" (
  "titular" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "ultimo" text NOT NULL,
  "visto_at" timestamp NOT NULL DEFAULT now(),
  "muro" integer,
  "barrio" integer,
  "barrio_puntos" bigint,
  "vuelta" text,
  "ausencia" integer,
  "desde" text,
  "desde_at" timestamp,
  "muro_desde" integer,
  "barrio_desde" integer,
  "puntos_desde" bigint,
  "reclamado" text,
  "regalo" jsonb
);`;

const JUEGO = JERUSALEN_JUEGO;
/** Desde cuándo cuenta «mientras no estabas»: la última vez que se le vio antes de volver. */
const DESDE = `(SELECT desde_at FROM game_regreso WHERE titular = $1)`;
/** Los que bloqueó la persona: no salen sus nombres ni sus mensajes. */
const SIN_BLOQUEADOS = `NOT IN (SELECT blocked_id FROM user_blocks WHERE blocker_id = $2)`;

// ---------------------------------------------------------------- la visita
/** Lo que se recuerda en cada visita: las piedras del muro y los puntos del barrio (no guardan la fecha). */
async function fotoDe(titular: number): Promise<{ muro: number | null; barrio: number | null; puntos: number | null }> {
  const { rows } = await pool.query(
    `SELECT (SELECT built * ${MURO_META} + progress FROM game_city_wall WHERE id = 1) AS muro, h.barrio, n.puntos
       FROM (SELECT 1) x
       LEFT JOIN game_houses h ON h.character_id = $1
       LEFT JOIN game_barrio_nivel n ON n.barrio = h.barrio`,
    [titular],
  );
  const r = rows[0] ?? {};
  const num = (v: unknown) => (v == null ? null : Number(v));
  return { muro: num(r.muro), barrio: num(r.barrio), puntos: num(r.puntos) };
}

/**
 * Quién ya quedó anotado hoy (y hace cuánto): así una persona que entra y sale no consulta la base cada vez. Guarda
 * también la visita en curso, para que dos pedidos a la vez (la entrada y la tarjeta) esperen la misma.
 */
const vistos = new Map<number, { dia: string; at: number; p: Promise<void> }>();
const VISITA_MS = 2 * 60_000;

/**
 * Anota la visita de hoy. Si la última fue hace dos días o más, guarda la vuelta: el día, cuántos días estuvo fuera,
 * desde cuándo y lo que había entonces (para contar lo que pasó). Nunca rompe lo que la llama.
 */
export function registrarVisita(titular: number, userId: number): Promise<void> {
  const hoy = diaClave();
  const v = vistos.get(titular);
  if (v && v.dia === hoy && Date.now() - v.at < VISITA_MS) return v.p;
  if (vistos.size > 5000) vistos.clear();
  const p = anotar(titular, userId, hoy);
  vistos.set(titular, { dia: hoy, at: Date.now(), p });
  return p;
}

async function anotar(titular: number, userId: number, hoy: string): Promise<void> {
  try {
    const foto = await fotoDe(titular);
    // todo con los valores de antes de la visita (en un UPDATE, cada columna de la derecha es la de antes)
    const vuelve = `($2::text::date - ultimo::date) >= ${REGRESO_DESDE}`;
    const { rowCount } = await pool.query(
      `UPDATE game_regreso SET
          vuelta       = CASE WHEN ${vuelve} THEN $2::text ELSE vuelta END,
          ausencia     = CASE WHEN ${vuelve} THEN ($2::text::date - ultimo::date) ELSE ausencia END,
          desde        = CASE WHEN ${vuelve} THEN ultimo ELSE desde END,
          desde_at     = CASE WHEN ${vuelve} THEN visto_at ELSE desde_at END,
          muro_desde   = CASE WHEN ${vuelve} THEN muro ELSE muro_desde END,
          barrio_desde = CASE WHEN ${vuelve} THEN barrio ELSE barrio_desde END,
          puntos_desde = CASE WHEN ${vuelve} THEN barrio_puntos ELSE puntos_desde END,
          ultimo = $2::text, visto_at = now(), muro = $3, barrio = $4, barrio_puntos = $5
        WHERE titular = $1 AND ultimo <= $2::text`,
      [titular, hoy, foto.muro, foto.barrio, foto.puntos],
    );
    if (rowCount) return;
    await primeraVisita(titular, userId, hoy, foto);
  } catch (err) {
    vistos.delete(titular);
    console.error("[regreso] visita:", err);
  }
}

/**
 * La primera vez que se anota a una persona (o la primera desde que existe el regreso): la última vez que se le vio
 * sale de lo que ya hizo (servir en el templo, la racha, recoger en su casa, la charla del barrio). Si fue hace dos
 * días o más, ya es una vuelta; si es nueva, solo queda anotada.
 */
async function primeraVisita(titular: number, userId: number, hoy: string, foto: Awaited<ReturnType<typeof fotoDe>>) {
  const { rows } = await pool.query(
    `SELECT EXTRACT(EPOCH FROM (now() - GREATEST(
        (SELECT MAX(c.last_duty_at) FROM game_characters c WHERE c.user_id = $2 AND c.game = $3),
        (SELECT MAX(m.updated_at) FROM game_season_merit m JOIN game_characters c ON c.id = m.character_id WHERE c.user_id = $2 AND c.game = $3),
        (SELECT updated_at FROM game_racha WHERE titular = $1),
        (SELECT collected_at FROM game_houses WHERE character_id = $1),
        (SELECT MAX(created_at) FROM game_barrio_chat WHERE user_id = $2)
      )))::float AS hace`,
    [titular, userId, JUEGO],
  );
  const hace = rows[0]?.hace == null ? null : Number(rows[0].hace);
  const antes = hace != null && hace > 0 ? diaClave(new Date(Date.now() - hace * 1000)) : null;
  if (antes && esVuelta(antes, hoy)) {
    await pool.query(
      `INSERT INTO game_regreso (titular, ultimo, visto_at, muro, barrio, barrio_puntos, vuelta, ausencia, desde, desde_at)
       VALUES ($1, $2, now(), $3, $4, $5, $2, $6, $7, now() - $8::float8 * interval '1 second')
       ON CONFLICT (titular) DO NOTHING`,
      [titular, hoy, foto.muro, foto.barrio, foto.puntos, diasEntre(antes, hoy), antes, hace],
    );
  } else {
    await pool.query(
      `INSERT INTO game_regreso (titular, ultimo, visto_at, muro, barrio, barrio_puntos) VALUES ($1, $2, now(), $3, $4, $5) ON CONFLICT (titular) DO NOTHING`,
      [titular, hoy, foto.muro, foto.barrio, foto.puntos],
    );
  }
}

// ---------------------------------------------------------------- el regalo
type Fila = FilaRegreso & {
  desde: string | null;
  regalo: unknown;
  muro_desde: number | null;
  barrio_desde: number | null;
  puntos_desde: number | null;
};

async function filaDe(titular: number): Promise<Fila | null> {
  const { rows } = await pool.query(
    `SELECT vuelta, ausencia, desde, reclamado, regalo, muro_desde, barrio_desde, puntos_desde FROM game_regreso WHERE titular = $1`,
    [titular],
  );
  const r = rows[0];
  if (!r) return null;
  const num = (v: unknown) => (v == null ? null : Number(v));
  return {
    vuelta: r.vuelta ?? null,
    ausencia: num(r.ausencia),
    desde: r.desde ?? null,
    reclamado: r.reclamado ?? null,
    regalo: r.regalo,
    muro_desde: num(r.muro_desde),
    barrio_desde: num(r.barrio_desde),
    puntos_desde: num(r.puntos_desde),
  };
}

/** Lo que trae el regalo de esta vuelta (sin darlo todavía). */
async function armarRegalo(titular: number, ausencia: number): Promise<Omit<RegaloRegreso, "estado"> | null> {
  const r = regaloDeRegreso(ausencia);
  if (!r) return null;
  const semilla = semillaDeRegreso(diaEnJerusalen().estacion.cultivo);
  let prenda: RegaloRegreso["prenda"] = null;
  if (ausencia >= REGRESO_VESTIDO) {
    const { rows } = await pool.query(`SELECT armario @> to_jsonb($2::text) AS tiene FROM game_characters WHERE id = $1`, [titular, PRENDA_REGRESO.id]);
    if (!rows[0]?.tiene) prenda = { id: PRENDA_REGRESO.id, nombre: PRENDA_REGRESO.nombre };
  }
  return { gozo: r.gozo, semillas: { id: semilla, n: r.semillas, nombre: NOMBRE_SEMILLA[semilla][r.semillas === 1 ? 0 : 1] }, prenda };
}

/** El regalo guardado al recibirlo (para mostrarlo como «recibido»). */
function regaloGuardado(v: unknown): RegaloRegreso | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Partial<RegaloRegreso>;
  if (typeof o.gozo !== "number" || !o.semillas || typeof o.semillas !== "object") return null;
  return { gozo: o.gozo, semillas: o.semillas, prenda: o.prenda ?? null, estado: "recibido" };
}

async function regaloDe(titular: number, f: Fila, hoy: string): Promise<RegaloRegreso | null> {
  if (yaRecibido(f)) return regaloGuardado(f.regalo);
  if (!puedeRecibir(f, hoy)) return null;
  const r = await armarRegalo(titular, f.ausencia!);
  return r ? { ...r, estado: "listo" } : null;
}

/** Recibir el regalo de la vuelta: una sola vez (si llegan dos pedidos a la vez, solo uno lo da). */
export async function recibirRegalo(ch: PersonajeFila): Promise<RegaloRecibido | { status: number; message: string }> {
  const titular = ch.casa;
  await registrarVisita(titular, ch.user_id);
  const hoy = diaClave();
  const f = await filaDe(titular);
  if (!f || !puedeRecibir(f, hoy)) {
    return f && yaRecibido(f)
      ? { status: 409, message: "Ya recibiste el regalo de esta vuelta." }
      : { status: 409, message: "Hoy no hay regalo de regreso: llega cuando vuelves después de dos días o más." };
  }
  const regalo = await armarRegalo(titular, f.ausencia!);
  if (!regalo) return { status: 409, message: "Hoy no hay regalo de regreso." };
  const { rows } = await pool.query(
    `WITH r AS (
       UPDATE game_regreso SET reclamado = $2::text, regalo = $3::jsonb
        WHERE titular = $1 AND vuelta = $4::text AND ausencia = $5
          AND ($2::text::date - vuelta::date) BETWEEN 0 AND ${REGRESO_VALIDO}
          AND (reclamado IS NULL OR (reclamado < vuelta AND (vuelta::date - reclamado::date) >= ${REGRESO_CADA}))
        RETURNING titular
     )
     UPDATE game_characters c SET
        gozo = c.gozo + $6,
        semillas = jsonb_set(COALESCE(c.semillas, '{}'::jsonb), ARRAY[$7::text], to_jsonb(COALESCE((c.semillas->>$7)::int, 0) + $8)),
        armario = CASE WHEN $9::text IS NULL OR c.armario @> to_jsonb($9::text) THEN c.armario ELSE c.armario || to_jsonb($9::text) END
       FROM r WHERE c.id = r.titular
      RETURNING c.gozo`,
    [titular, hoy, JSON.stringify(regalo), f.vuelta, f.ausencia, regalo.gozo, regalo.semillas.id, regalo.semillas.n, regalo.prenda?.id ?? null],
  );
  if (!rows.length) return { status: 409, message: "Ya recibiste el regalo de esta vuelta." };
  if (regalo.prenda) {
    // «Sacad el mejor vestido, y vestidle»: queda puesto en el personaje con que volvió (los vecinos lo ven)
    const { rows: r } = await pool.query(
      `UPDATE game_characters SET ropa = jsonb_set(COALESCE(ropa, '{}'::jsonb), '{manto}', to_jsonb($2::text)) WHERE id = $1 RETURNING ropa`,
      [ch.id, regalo.prenda.id],
    );
    if (r[0]) refrescarFicha(ch.id, { ropa: coloresDeRopa(r[0].ropa) });
  }
  return { gozo: regalo.gozo, gozoTotal: Number(rows[0].gozo), semillas: regalo.semillas, prenda: regalo.prenda };
}

// ---------------------------------------------------------------- lo que pasó mientras no estabas
/** El lunes de la semana (día de Texas), igual que la copa (server/barrio-juntos.ts). */
function semanaDe(dia: string): string {
  const d = new Date(`${dia}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

type FilaNombre = { name?: string | null; display_name?: string | null; username?: string | null; user_id?: number | string };
const nombres = (rows: FilaNombre[]) => rows.map((r) => nombreDe(r));

async function barrioMientras(ch: PersonajeFila, f: Fila, hoy: string): Promise<BarrioMientras | null> {
  const titular = ch.casa;
  const { rows: h } = await pool.query(`SELECT barrio FROM game_houses WHERE character_id = $1`, [titular]);
  if (!h[0]) return null;
  const barrio = Number(h[0].barrio);
  const semana = semanaDe(hoy);
  // los conteos van juntos en una consulta (y los nombres en otras tres): así la tarjeta no carga la base
  const charla = `FROM game_barrio_chat m
     WHERE m.barrio = $3 AND m.hidden_at IS NULL AND m.user_id <> $2 AND m.user_id ${SIN_BLOQUEADOS} AND m.created_at > ${DESDE}`;
  const [{ rows: cuentas }, vecinos, escribieron, reuniones, puntos] = await Promise.all([
    pool.query(
      `WITH yo AS (SELECT COALESCE((SELECT puntos FROM game_barrio_copa WHERE barrio = $3 AND week_key = $4), 0) AS p)
       SELECT (SELECT count(*)::int ${charla}) AS mensajes,
              (SELECT COALESCE(SUM(cantidad), 0)::int FROM game_pueblo_dones WHERE barrio = $3 AND created_at > ${DESDE}) AS pueblo_cosas,
              (SELECT count(DISTINCT titular)::int FROM game_pueblo_dones WHERE barrio = $3 AND created_at > ${DESDE}) AS pueblo_personas,
              (SELECT count(*)::int FROM game_help_gifts g JOIN game_help_requests q ON q.id = g.request_id
                WHERE q.barrio = $3 AND g.created_at > ${DESDE}) AS ayudas_veces,
              (SELECT COALESCE(SUM(g.amount), 0)::int FROM game_help_gifts g JOIN game_help_requests q ON q.id = g.request_id
                WHERE q.barrio = $3 AND g.created_at > ${DESDE}) AS ayudas_cosas,
              yo.p::int AS copa_mios,
              (SELECT count(*)::int FROM game_barrio_copa WHERE week_key = $4 AND puntos > 0) AS copa_barrios,
              (SELECT count(*)::int FROM game_barrio_copa w WHERE w.week_key = $4 AND (w.puntos > yo.p OR (w.puntos = yo.p AND w.barrio < $3))) AS copa_antes
         FROM yo`,
      [titular, ch.user_id, barrio, semana],
    ),
    pool.query(
      `SELECT c.name, u.display_name, u.username, u.id AS user_id, count(*) OVER ()::int AS total
         FROM game_houses h JOIN game_characters c ON c.id = h.character_id JOIN users u ON u.id = c.user_id
        WHERE h.barrio = $3 AND h.game = $4 AND h.character_id <> $1 AND u.id <> $2 AND u.id ${SIN_BLOQUEADOS}
          AND h.created_at > ${DESDE}
        ORDER BY h.created_at DESC LIMIT 5`,
      [titular, ch.user_id, barrio, JUEGO],
    ),
    pool.query(
      `SELECT x.name, x.display_name, x.username, x.user_id FROM (
         SELECT DISTINCT ON (m.user_id) m.user_id, m.created_at, c.name, u.display_name, u.username
           FROM game_barrio_chat m JOIN game_characters c ON c.id = m.character_id JOIN users u ON u.id = m.user_id
          WHERE m.barrio = $3 AND m.hidden_at IS NULL AND m.user_id <> $2 AND m.user_id ${SIN_BLOQUEADOS} AND m.created_at > ${DESDE}
          ORDER BY m.user_id, m.created_at DESC
       ) x ORDER BY x.created_at DESC LIMIT 3`,
      [titular, ch.user_id, barrio],
    ),
    pool.query(
      `SELECT c.name, u.display_name, u.username, u.id AS user_id, count(*) OVER ()::int AS total
         FROM game_house_meetings g JOIN game_characters c ON c.id = g.host_character_id JOIN users u ON u.id = c.user_id
        WHERE g.barrio = $3 AND u.id <> $2 AND u.id ${SIN_BLOQUEADOS} AND g.started_at > ${DESDE}
        ORDER BY g.started_at DESC LIMIT 3`,
      [titular, ch.user_id, barrio],
    ),
    puntosDeBarrio(barrio),
  ]);
  const c = cuentas[0] ?? {};
  const num = (v: unknown) => Number(v || 0);
  const mios = num(c.copa_mios);
  const mismo = f.barrio_desde === barrio && f.puntos_desde != null;
  const ahora = nivelDeBarrio(puntos.puntos).actual;
  return {
    n: barrio,
    nombre: nombreDeBarrio(barrio),
    vecinosNuevos: { nombres: nombres(vecinos.rows), total: num(vecinos.rows[0]?.total) },
    charla: { mensajes: num(c.mensajes), quienes: nombres(escribieron.rows) },
    reuniones: { total: num(reuniones.rows[0]?.total), anfitriones: [...new Set(nombres(reuniones.rows))] },
    pueblo: { cosas: num(c.pueblo_cosas), personas: num(c.pueblo_personas) },
    ayudas: { veces: num(c.ayudas_veces), cosas: num(c.ayudas_cosas) },
    copa: {
      puesto: mios > 0 ? num(c.copa_antes) + 1 : null,
      puntos: mios,
      barrios: num(c.copa_barrios),
      ganados: mismo ? Math.max(0, puntos.puntos - f.puntos_desde!) : null,
    },
    nivel: { nivel: ahora.nivel, nombre: ahora.nombre, subio: mismo && nivelDeBarrio(f.puntos_desde!).actual.nivel < ahora.nivel },
  };
}

async function casaMientras(ch: PersonajeFila): Promise<CasaMientras | null> {
  const titular = ch.casa;
  const [{ rows: casa }, visitas, regalos] = await Promise.all([
    pool.query(
      `SELECT h.level, h.huerto,
              (SELECT COALESCE(SUM(sold - notified), 0)::int FROM game_market_listings WHERE seller_character_id = $1 AND sold > notified) AS ventas
         FROM game_houses h WHERE h.character_id = $1`,
      [titular],
    ),
    pool.query(
      `SELECT x.name, x.display_name, x.username, x.user_id, count(*) OVER ()::int AS total FROM (
         SELECT DISTINCT ON (b.visitor_user_id) b.visitor_user_id AS user_id, b.created_at, c.name, u.display_name, u.username
           FROM game_house_blessings b JOIN users u ON u.id = b.visitor_user_id
           LEFT JOIN game_characters c ON c.id = (SELECT MIN(c2.id) FROM game_characters c2 WHERE c2.user_id = u.id AND c2.game = $3)
          WHERE b.house_character_id = $1 AND b.visitor_user_id <> $2 AND b.visitor_user_id ${SIN_BLOQUEADOS} AND b.created_at > ${DESDE}
          ORDER BY b.visitor_user_id, b.created_at DESC
       ) x ORDER BY x.created_at DESC LIMIT 5`,
      [titular, ch.user_id, JUEGO],
    ),
    pool.query(
      `SELECT g.amount, q.good, c.name, u.display_name, u.username, u.id AS user_id
         FROM game_help_gifts g JOIN game_help_requests q ON q.id = g.request_id
         JOIN game_characters c ON c.id = g.donor_character_id JOIN users u ON u.id = c.user_id
        WHERE q.character_id = $1 AND u.id ${SIN_BLOQUEADOS} AND g.created_at > ${DESDE}
        ORDER BY g.created_at DESC LIMIT 5`,
      [titular, ch.user_id],
    ),
  ]);
  if (!casa[0]) return null;
  const huerto = leerHuerto(casa[0].huerto, parcelasHuerto(Number(casa[0].level || 0)));
  return {
    visitas: { nombres: nombres(visitas.rows), total: Number(visitas.rows[0]?.total || 0) },
    regalos: regalos.rows.map((r) => ({ quien: nombreDe(r), bien: String(r.good), cantidad: Number(r.amount) })),
    huertoListo: huerto.filter((p) => p.semilla && faltan(p) === 0).length,
    ventas: Number(casa[0].ventas || 0),
  };
}

async function ciudadMientras(ch: PersonajeFila, f: Fila): Promise<CiudadMientras> {
  const hoyCap = capituloDelDia(enTexas(ahoraDeLaHistoria()).dia);
  const [{ rows: muro }, { rows: caps }] = await Promise.all([
    pool.query(`SELECT built, progress FROM game_city_wall WHERE id = 1`),
    pool.query(
      `SELECT season, capitulo, meta, puntos, done_at IS NOT NULL AS hecho, COALESCE(done_at > ${DESDE}, false) AS nuevo
         FROM game_capitulos WHERE done_at > ${DESDE} OR (season = $2 AND capitulo = $3)
        ORDER BY season, capitulo`,
      [ch.casa, hoyCap?.temporada ?? -1, hoyCap?.capitulo.n ?? -1],
    ),
  ]);
  const built = Number(muro[0]?.built || 0);
  const total = built * MURO_META + Number(muro[0]?.progress || 0);
  const actual = hoyCap ? caps.find((r) => Number(r.season) === hoyCap.temporada && Number(r.capitulo) === hoyCap.capitulo.n) : null;
  return {
    piedras: f.muro_desde != null ? Math.max(0, total - f.muro_desde) : null,
    muro: { tramos: Math.min(built, MURO_TRAMOS), de: MURO_TRAMOS },
    capitulosCumplidos: caps
      .filter((r) => r.nuevo)
      .map((r) => arcoDeTemporada(Number(r.season))?.capitulos.find((x) => x.n === Number(r.capitulo))?.titulo)
      .filter((t): t is string => !!t),
    capitulo: hoyCap
      ? {
          titulo: hoyCap.capitulo.titulo,
          icono: hoyCap.capitulo.icono,
          pct: actual && Number(actual.meta) > 0 ? Math.min(100, Math.round((Number(actual.puntos) / Number(actual.meta)) * 100)) : 0,
          cumplido: !!actual?.hecho,
        }
      : null,
  };
}

/** Lo que ve al entrar: la vuelta, el regalo y (el día que vuelve, o mientras el regalo espera) lo que pasó. */
export async function vistaRegreso(ch: PersonajeFila): Promise<RegresoVista> {
  await registrarVisita(ch.casa, ch.user_id);
  const hoy = diaClave();
  const vacia: RegresoVista = { hoy, vuelta: null, regalo: null, barrio: null, casa: null, ciudad: null };
  const f = await filaDe(ch.casa);
  if (!f?.vuelta || !f.ausencia) return vacia;
  const pasaron = diasEntre(f.vuelta, hoy);
  if (pasaron < 0 || pasaron > REGRESO_VALIDO) return vacia;
  const vuelta = { dia: f.vuelta, ausencia: f.ausencia, desde: f.desde ?? f.vuelta, hoy: pasaron === 0 };
  const regalo = await regaloDe(ch.casa, f, hoy);
  if (!vuelta.hoy && regalo?.estado !== "listo") return { ...vacia, vuelta, regalo };
  // por partes (como mucho cinco consultas a la vez): la tarjeta no debe cargar la base
  const barrio = await barrioMientras(ch, f, hoy);
  const [casa, ciudad] = await Promise.all([casaMientras(ch), ciudadMientras(ch, f)]);
  return { hoy, vuelta, regalo, barrio, casa, ciudad };
}

// ---------------------------------------------------------------- rutas
const ultimoPedido = new Map<number, number>();

export function registerRegresoRoutes(app: Express) {
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
    if (!ch) res.status(404).json({ message: "Primero crea tu personaje." });
    return ch;
  }

  app.get("/api/jerusalen/regreso", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaRegreso(ch));
    } catch (err) {
      console.error("[regreso] vista:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  app.post("/api/jerusalen/regreso/regalo", async (req: Request, res: Response) => {
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      const now = Date.now();
      if (now - (ultimoPedido.get(ch.casa) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimoPedido.set(ch.casa, now);
      if (ultimoPedido.size > 5000) ultimoPedido.clear();
      const r = await recibirRegalo(ch);
      if ("status" in r) return res.status(r.status).json({ message: r.message });
      res.json(r);
    } catch (err) {
      console.error("[regreso] regalo:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Solo fuera de producción, para las pruebas: hacer como si la última visita hubiera sido hace unos días
  // (y, si se pide, como si el último regalo se hubiera recibido hace unos días, o borrar la fila).
  app.post("/api/jerusalen/regreso/prueba", async (req: Request, res: Response) => {
    if (process.env.NODE_ENV === "production") return res.sendStatus(404);
    try {
      const ch = await jugador(req, res);
      if (!ch) return;
      vistos.delete(ch.casa);
      if (req.body?.borrar === true) {
        await pool.query(`DELETE FROM game_regreso WHERE titular = $1`, [ch.casa]);
        return res.json({ ok: true });
      }
      const dias = Math.max(0, Math.min(60, Math.floor(Number(req.body?.dias) || 0)));
      const haceDia = (n: number) => diaClave(new Date(Date.now() - n * 86_400_000));
      const reclamado = req.body?.reclamadoHace == null ? undefined : haceDia(Math.max(0, Math.floor(Number(req.body.reclamadoHace) || 0)));
      const { rowCount } = await pool.query(
        `UPDATE game_regreso SET ultimo = $2, visto_at = now() - $3::int * interval '1 day', vuelta = NULL, ausencia = NULL, desde = NULL, desde_at = NULL
                ${reclamado !== undefined ? ", reclamado = $4" : ""}
          WHERE titular = $1`,
        reclamado !== undefined ? [ch.casa, haceDia(dias), dias, reclamado] : [ch.casa, haceDia(dias), dias],
      );
      res.json({ ok: rowCount === 1, ultimo: haceDia(dias) });
    } catch (err) {
      console.error("[regreso] prueba:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
