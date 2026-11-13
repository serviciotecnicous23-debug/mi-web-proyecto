/**
 * El registro de cada jugador («📜 Su registro», shared/registro.ts): todo lo que hizo una persona en Jerusalén
 * en línea, juntado de las tablas que ya existen (no guarda nada nuevo). Lo ven sus vecinos al visitar su casa,
 * en su ficha y en las tablas; con un bloqueo de por medio, no se ve (404).
 *
 * Es de la persona: se pide con cualquiera de sus personajes y se arma con su titular (la casa, la economía, los
 * estudios y los juegos) y con cada uno de sus personajes (el mérito y los cargos de su camino). Las consultas van
 * una por una (la base de prueba corta con muchas a la vez) y el resultado se recuerda un minuto.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { esAdmin, escalonPorMerito, nombreDe, temporadaDe } from "./jerusalen";
import { titularEstudios } from "./estudios";
import { tieneExamenTurno } from "./examenes-rango";
import { logrosDe } from "./logros-en-linea";
import { ventajasDeBarrio } from "./barrio-obras";
import { BANCO_CATEDRAS } from "./catedras-banco";
import { CATEDRAS, gradoCatedra, type CatedraArea } from "@shared/catedras";
import { EXAMEN_PREGUNTAS, estudioPorId } from "@shared/estudios";
import { CONCURSO_PREGUNTAS } from "@shared/concurso";
import { COLECCIONES, nombreDeTitulo } from "@shared/album";
import { caminoDe, nombreEscalonCamino, type Camino } from "@shared/caminos";
import { JERUSALEN_JUEGO, PARTES_INSTRUCCION, escalonNombre, type EscalonId } from "@shared/jerusalen";
import { estrellasDeFila, leerObras, obrasHechas } from "@shared/obras";
import { REGISTRO_PARTIDAS, REGISTRO_RECUERDA_MS, type FinSabio, type PersonajeRegistro, type RegistroJugador } from "@shared/registro";

const JUEGO = JERUSALEN_JUEGO;
const num = (v: unknown) => Number(v ?? 0) || 0;
const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const FINES: FinSabio[] = ["gano", "retiro", "perdio", "tiempo"];
/** El día de Texas (AAAA-MM-DD) de una hora guardada en UTC: así las fechas del registro son las del juego. */
const diaTexas = (col: string) => `to_char((${col} AT TIME ZONE 'UTC') AT TIME ZONE 'America/Chicago', 'YYYY-MM-DD')`;

type Recordado = { hasta: number; datos: Omit<RegistroJugador, "personajeId" | "esMio"> };
const recordados = new Map<number, Recordado>();
const ultimaPeticion = new Map<number, number>();

/** Para las pruebas y cuando algo cambia mucho: olvida el registro de una persona (o de todas). */
export function olvidarRegistro(titular?: number) {
  if (titular === undefined) recordados.clear();
  else recordados.delete(titular);
}

async function uno<T = Record<string, unknown>>(sql: string, params: unknown[]): Promise<T | undefined> {
  const { rows } = await pool.query(sql, params);
  return rows[0] as T | undefined;
}

async function todos<T = Record<string, unknown>>(sql: string, params: unknown[]): Promise<T[]> {
  const { rows } = await pool.query(sql, params);
  return rows as T[];
}

/** El registro de una persona (sin `personajeId` ni `esMio`, que dependen de quién lo pide). */
async function armarRegistro(userId: number, titular: number): Promise<Recordado["datos"]> {
  const t = temporadaDe();
  // sus personajes, uno por camino (el titular es el primero)
  const pjs = await todos<{ id: number; name: string; path: string; created: string; instruction_parts: number; display_name: string; username: string }>(
    `SELECT c.id, c.name, c.path, ${diaTexas("c.created_at")} AS created, c.instruction_parts, u.display_name, u.username
       FROM game_characters c JOIN users u ON u.id = c.user_id
      WHERE c.user_id = $1 AND c.game = $2
      ORDER BY c.selected_at DESC NULLS LAST, c.slot`,
    [userId, JUEGO],
  );
  const ids = pjs.map((p) => Number(p.id));
  const actual = pjs[0];

  // el mérito y los cargos de cada personaje en su camino
  const personajes: PersonajeRegistro[] = [];
  for (const p of pjs) {
    const camino: Camino = caminoDe(p.path);
    const m = await uno<{ merit: number; siempre: number; temporadas: number }>(
      `SELECT COALESCE((SELECT merit FROM game_season_merit WHERE character_id = $1 AND season = $2), 0)::int AS merit,
              COALESCE((SELECT sum(merit) FROM game_season_merit WHERE character_id = $1), 0)::int AS siempre,
              (SELECT count(*) FROM game_season_merit WHERE character_id = $1 AND merit > 0)::int AS temporadas`,
      [p.id, t.n],
    );
    const merito = num(m?.merit);
    let puesto: number | null = null;
    if (merito > 0) {
      const r = await uno<{ n: number }>(
        `SELECT count(*)::int AS n FROM game_season_merit sm JOIN game_characters c ON c.id = sm.character_id
          WHERE sm.season = $1 AND c.game = $2 AND COALESCE(c.path, 'sacerdocio') = $3 AND sm.merit > $4`,
        [t.n, JUEGO, camino, merito],
      );
      puesto = num(r?.n) + 1;
    }
    const cargos = await todos<{ season: number; office: string; lost_at: string | null }>(
      `SELECT season, office, lost_at FROM game_offices WHERE character_id = $1 AND office IS NOT NULL ORDER BY season DESC LIMIT 12`,
      [p.id],
    );
    const vigente = cargos.find((c) => Number(c.season) === t.n && !c.lost_at)?.office as EscalonId | undefined;
    const escalon = vigente || escalonPorMerito(merito, await tieneExamenTurno(Number(p.id), camino));
    personajes.push({
      id: Number(p.id),
      nombre: nombreDe(p),
      camino,
      escalon: nombreEscalonCamino(camino, escalon, escalonNombre(escalon)),
      merito,
      puesto,
      meritoSiempre: num(m?.siempre),
      temporadas: num(m?.temporadas),
      cargos: cargos.map((c) => ({
        temporada: Number(c.season),
        cargo: nombreEscalonCamino(camino, c.office, escalonNombre(c.office as EscalonId)),
        perdido: !!c.lost_at,
      })),
    });
  }

  // los estudios, la instrucción y las cátedras
  const tEst = (await titularEstudios(userId)) ?? titular;
  const est = await todos<{ study_id: string; sections: unknown; best: number; fecha: string | null; perfecto: boolean }>(
    `SELECT study_id, sections, best, ${diaTexas("approved_at")} AS fecha, perfect_at IS NOT NULL AS perfecto
       FROM game_studies WHERE character_id = $1 ORDER BY approved_at NULLS LAST, updated_at`,
    [tEst],
  );
  const aprobados: RegistroJugador["estudios"]["aprobados"] = [];
  const enCurso: RegistroJugador["estudios"]["enCurso"] = [];
  for (const r of est) {
    const e = estudioPorId(String(r.study_id));
    if (!e) continue;
    if (r.fecha) aprobados.push({ id: e.id, titulo: e.titulo, icono: e.icono, fecha: String(r.fecha), perfecto: r.perfecto === true, nota: num(r.best), de: EXAMEN_PREGUNTAS });
    else {
      const hechas = lista(r.sections).filter((s) => e.secciones.some((x) => x.id === s)).length;
      if (hechas > 0) enCurso.push({ id: e.id, titulo: e.titulo, icono: e.icono, secciones: hechas, de: e.secciones.length });
    }
  }
  const cat = await todos<{ area: string; seen: unknown }>(`SELECT area, seen FROM game_catedras WHERE character_id = $1`, [titular]);
  const catedras: RegistroJugador["estudios"]["catedras"] = [];
  for (const r of cat) {
    const area = String(r.area) as CatedraArea;
    if (!(area in CATEDRAS)) continue;
    const aprendidas = lista(r.seen).length;
    if (!aprendidas) continue;
    const total = BANCO_CATEDRAS[area]?.length ?? 0;
    const g = gradoCatedra(area, aprendidas, total);
    catedras.push({ area, nombre: CATEDRAS[area].nombre, icono: CATEDRAS[area].icono, grado: g.nombre, nivel: g.n, aprendidas, total });
  }

  // los juegos: «¿Quién es sabio?», los duelos, el concurso y los consejos
  const sab = await uno<{ partidas: number; mejor: number; ganadas: number; total: number; consejos: number; consejos_buenos: number }>(
    `SELECT partidas, mejor, ganadas, total, consejos, consejos_buenos FROM game_sabio WHERE character_id = $1`,
    [titular],
  );
  const ultimas = await todos<{ grada: number; puntos: number; segundos: number; estado: string; fecha: string }>(
    `SELECT grada, puntos, GREATEST(0, EXTRACT(EPOCH FROM (finished_at - created_at)))::int AS segundos, estado, ${diaTexas("finished_at")} AS fecha
       FROM game_sabio_partidas WHERE character_id = $1 AND estado <> 'jugando' AND finished_at IS NOT NULL
      ORDER BY finished_at DESC LIMIT $2`,
    [titular, REGISTRO_PARTIDAS],
  );
  // los duelos de práctica contra la computadora no cuentan
  const duel = await uno<{ jugados: number; ganados: number }>(
    `SELECT count(*)::int AS jugados, count(*) FILTER (WHERE ganador = $1)::int AS ganados
       FROM game_sabio_duelos WHERE (a_id = $1 OR b_id = $1) AND estado = 'terminado' AND bot IS NULL`,
    [titular],
  );
  const conc = await uno<{ semanas: number; correct: number | null; ms: number | null }>(
    `SELECT (SELECT count(*) FROM game_contest_entries WHERE character_id = $1 AND finished_at IS NOT NULL)::int AS semanas, b.correct, b.ms
       FROM (SELECT 1) x
       LEFT JOIN LATERAL (SELECT correct, ms FROM game_contest_entries WHERE character_id = $1 AND finished_at IS NOT NULL ORDER BY correct DESC, ms ASC LIMIT 1) b ON true`,
    [tEst],
  );

  // la casa y lo que hizo en su barrio
  const casa = await uno<Record<string, unknown>>(
    `SELECT h.barrio, h.level, h.obras, h.adornos, h.letrero, h.interior,
            (SELECT count(*)::int FROM game_house_blessings b WHERE b.house_character_id = h.character_id) AS bendiciones
       FROM game_houses h WHERE h.character_id = $1`,
    [titular],
  );
  const barrio = casa ? num(casa.barrio) : null;
  const hecho = await uno<Record<string, number>>(
    `SELECT (SELECT count(*) FROM game_help_gifts WHERE donor_character_id = ANY($1::int[]))::int AS ayudas,
            (SELECT count(*) FROM game_house_meetings WHERE host_character_id = ANY($1::int[]))::int AS reuniones,
            (SELECT count(*) FROM game_meeting_attendance WHERE character_id = ANY($1::int[]) AND correct)::int AS asistencias,
            (SELECT count(*) FROM game_banquetes WHERE anfitrion = ANY($1::int[]))::int AS banquetes,
            (SELECT count(*) FROM game_regalos WHERE de_titular = $2)::int AS regalos_dados,
            (SELECT count(*) FROM game_regalos WHERE para_titular = $2)::int AS regalos_recibidos,
            (SELECT COALESCE(sum(n), 0) FROM game_wall_contributions WHERE character_id = ANY($1::int[]))::int AS piedras,
            (SELECT COALESCE(sum(gozo), 0) FROM game_arca_aportes WHERE titular = $2)::int AS arca,
            (SELECT COALESCE(sum(puntos), 0) FROM game_capitulo_aportes WHERE titular = $2)::int AS historia,
            (SELECT count(*) FROM game_recados WHERE titular = ANY($1::int[]) AND done_at IS NOT NULL)::int AS recados,
            (SELECT count(*) FROM game_dias_jugados WHERE titular = $2)::int AS dias`,
    [ids, titular],
  );
  const racha = await uno<{ actual: number; mejor: number; total: number }>(`SELECT actual, mejor, total FROM game_racha WHERE titular = $1`, [titular]);

  // los logros y el álbum (se lee lo anotado: mirar el registro de otro no escribe nada)
  const logros = (await logrosDe(Number(actual?.id ?? titular), nombreDe(actual ?? {}))).logros.filter((l) => l.tiene).map((l) => l.id);
  const alb = await uno<{ ids: unknown; titulo: string | null }>(
    `SELECT a.ids, c.titulo FROM game_characters c LEFT JOIN game_album a ON a.titular = c.id WHERE c.id = $1`,
    [titular],
  );
  const tengo = new Set(lista(alb?.ids));

  return {
    nombre: nombreDe(actual ?? {}),
    titulo: nombreDeTitulo(alb?.titulo ?? null),
    desde: pjs.map((p) => String(p.created)).filter(Boolean).sort()[0] ?? "",
    diasJugados: num(hecho?.dias),
    racha: { actual: num(racha?.actual), mejor: num(racha?.mejor), total: num(racha?.total) },
    barrio,
    personajes,
    estudios: {
      aprobados,
      enCurso,
      instruccion: { partes: Math.min(PARTES_INSTRUCCION, Math.max(0, ...pjs.map((p) => num(p.instruction_parts)))), de: PARTES_INSTRUCCION },
      catedras,
    },
    juegos: {
      sabio: {
        partidas: num(sab?.partidas),
        mejor: num(sab?.mejor),
        ganadas: num(sab?.ganadas),
        total: num(sab?.total),
        ultimas: ultimas.map((u) => ({
          grada: num(u.grada),
          puntos: num(u.puntos),
          segundos: num(u.segundos),
          fin: (FINES as string[]).includes(String(u.estado)) ? (u.estado as FinSabio) : "perdio",
          fecha: String(u.fecha ?? ""),
        })),
      },
      duelos: { jugados: num(duel?.jugados), ganados: num(duel?.ganados) },
      concurso: {
        semanas: num(conc?.semanas),
        mejor: conc && conc.correct != null ? { aciertos: num(conc.correct), de: CONCURSO_PREGUNTAS, segundos: Math.round(num(conc.ms) / 1000) } : null,
      },
      consejos: { dados: num(sab?.consejos), buenos: num(sab?.consejos_buenos) },
    },
    casa: casa
      ? {
          nivel: num(casa.level),
          estrellas: estrellasDeFila(casa, Date.now(), (await ventajasDeBarrio(num(casa.barrio))).estrellas).estrellas,
          obras: obrasHechas(leerObras(casa.obras)),
          bendiciones: num(casa.bendiciones),
        }
      : null,
    barrioHecho: {
      ayudas: num(hecho?.ayudas),
      reuniones: num(hecho?.reuniones),
      asistencias: num(hecho?.asistencias),
      banquetes: num(hecho?.banquetes),
      regalosDados: num(hecho?.regalos_dados),
      regalosRecibidos: num(hecho?.regalos_recibidos),
      piedras: num(hecho?.piedras),
      arca: num(hecho?.arca),
      historia: num(hecho?.historia),
      recados: num(hecho?.recados),
    },
    logros,
    album: {
      cosas: tengo.size,
      colecciones: COLECCIONES.map((c) => {
        const tiene = c.items.filter((i) => tengo.has(i)).length;
        return { id: c.id, nombre: c.nombre, icono: c.icono, tiene, de: c.items.length, completa: c.items.length > 0 && tiene >= c.items.length };
      }),
    },
  };
}

export function registerRegistroRoutes(app: Express) {
  // El registro de una persona, pedido con cualquiera de sus personajes.
  app.get("/api/jerusalen/registro/:personajeId", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta todavía no está aprobada." });
    const id = Number(req.params.personajeId);
    if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);
    const yo = req.user!.id;
    const antes = ultimaPeticion.get(yo) ?? 0;
    if (Date.now() - antes < 700) return res.status(429).json({ message: "Espera un momento" });
    ultimaPeticion.set(yo, Date.now());
    if (ultimaPeticion.size > 5000) ultimaPeticion.clear();
    try {
      const p = await uno<{ user_id: number; is_active: boolean | null; titular: number }>(
        `SELECT c.user_id, u.is_active,
                (SELECT MIN(c2.id) FROM game_characters c2 WHERE c2.user_id = c.user_id AND c2.game = c.game) AS titular
           FROM game_characters c JOIN users u ON u.id = c.user_id
          WHERE c.id = $1 AND c.game = $2`,
        [id, JUEGO],
      );
      if (!p || (p.is_active === false && !esAdmin(req))) return res.status(404).json({ message: "No encontramos a esa persona." });
      const suyo = Number(p.user_id);
      if (suyo !== yo) {
        const b = await uno(`SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1) LIMIT 1`, [yo, suyo]);
        if (b) return res.status(404).json({ message: "No encontramos a esa persona." });
      }
      const titular = Number(p.titular || id);
      let r = recordados.get(titular);
      if (!r || r.hasta < Date.now()) {
        r = { hasta: Date.now() + REGISTRO_RECUERDA_MS, datos: await armarRegistro(suyo, titular) };
        recordados.set(titular, r);
        if (recordados.size > 2000) {
          for (const [k, v] of recordados) if (v.hasta < Date.now()) recordados.delete(k);
        }
      }
      const out: RegistroJugador = { personajeId: id, esMio: suyo === yo, ...r.datos };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[registro]", err);
      res.sendStatus(500);
    }
  });
}
