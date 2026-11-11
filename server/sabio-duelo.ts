/**
 * El duelo de sabios (shared/sabio.ts): dos personas, las mismas diez preguntas a la vez. El servidor guarda el
 * duelo, elige las preguntas (que ninguno de los dos haya visto), lleva el reloj de cada ronda, corrige, suma y pasa
 * a la siguiente cuando los dos respondieron o se acabó el tiempo. Al terminar reparte gozo (dentro del tope del
 * concurso) y el manto de los vencedores. Los avisos van por la red de la ciudad (server/ciudad-red.ts).
 *
 * Las horas del duelo son milisegundos del reloj del servidor (no `timestamp`: así no se corren con la zona horaria).
 * Cuándo vio cada uno su duelo por última vez se guarda en memoria (no se escribe en la base cada segundo).
 * Orden de las filas de espera (para no trabarse): la búsqueda, luego el duelo, luego cada persona.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { semanaClave } from "./misiones";
import { sumarGozo } from "./gozo";
import { avisarA } from "./ciudad-red";
import { sumarALaCopa } from "./barrio-juntos";
import { POR_GRADA, PREGUNTA, amigosPosibles, filaPersona, lista, mezclar } from "./sabio";
import { caminoDe, type Camino } from "@shared/caminos";
import {
  DUELO_PREPARAR_S, DUELO_RETO_S, DUELO_REVELAR_S, DUELO_RONDAS, DUELO_SEGUNDOS, DUELOS_DIA, DUELOS_MANTO, GOZO_DUELO, GOZO_SABIO_DIA, TRAJES_SABIOS, puntosDuelo,
  type DueloVista, type DuelosEstado, type EstadoDuelo, type FilaDuelo, type RetoDuelo,
} from "@shared/sabio";

/** Unos segundos de gracia por la red al responder. */
const GRACIA_MS = 2500;
/** Quien no pregunta por su duelo en este tiempo lo abandonó. */
const AUSENTE_MS = 30_000;
/** La búsqueda de rival dura esto si nadie aparece (y quien deja de preguntar sale de la fila). */
const BUSCAR_MS = 90_000;
const BUSCAR_VISTO_MS = 10_000;
/** La fila de espera de los emparejamientos (una sola a la vez). Los duelos usan su número en negativo. */
const FILA_BUSQUEDA = -2_000_000_000;

type Lado = "a" | "b";
type Respuesta = { o: string; ms: number };
type Ronda = { q: string; opciones: string[]; a: Respuesta | null; b: Respuesta | null; pa: number; pb: number };
type Fila = {
  id: number;
  a_id: number;
  b_id: number;
  a_user: number;
  b_user: number;
  a_jugador: number;
  b_jugador: number;
  estado: EstadoDuelo;
  ronda: number;
  preguntas: unknown;
  opciones: unknown;
  servida: string | number | null;
  revelada: string | number | null;
  resp: unknown;
  historial: unknown;
  pa: number;
  pb: number;
  creado: string | number;
  ganador: number | null;
  abandono: number | null;
  gozo_a: number;
  gozo_b: number;
  premio_a: string | null;
  premio_b: string | null;
  semana: string;
};
type Persona = { ch: PersonajeFila; titular: number };

const otroLado = (l: Lado): Lado => (l === "a" ? "b" : "a");
const respDe = (d: Fila): { a?: Respuesta; b?: Respuesta } => (d.resp && typeof d.resp === "object" && !Array.isArray(d.resp) ? (d.resp as { a?: Respuesta; b?: Respuesta }) : {});
const ladoDe = (d: Fila, cuenta: number): Lado | null => (Number(d.a_user) === cuenta ? "a" : Number(d.b_user) === cuenta ? "b" : null);
const normal = (s: string) => s.normalize("NFC").trim();

// ---------------------------------------------------------------- en memoria: cuándo vio cada uno su duelo, y los nombres
const vistos = new Map<string, number>();
function marcarVisto(id: number, l: Lado, ahora: number) {
  vistos.set(`${id}:${l}`, ahora);
}
/** Si el servidor se reinició y no lo tiene, cuenta desde ahora. */
function vistoDe(id: number, l: Lado, ahora: number): number {
  const k = `${id}:${l}`;
  let v = vistos.get(k);
  if (v === undefined) {
    v = ahora;
    vistos.set(k, v);
  }
  return v;
}
setInterval(() => {
  const ahora = Date.now();
  for (const [k, v] of vistos) if (ahora - v > 15 * 60_000) vistos.delete(k);
}, 5 * 60_000).unref?.();

const nombres = new Map<number, { nombre: string; camino: Camino }>();
async function nombresDe(ids: number[]): Promise<Map<number, { nombre: string; camino: Camino }>> {
  const faltan = [...new Set(ids)].filter((i) => !nombres.has(i));
  if (faltan.length) {
    if (nombres.size > 3000) nombres.clear();
    const { rows } = await pool.query(
      `SELECT c.id, c.name, c.path, u.display_name, u.username FROM game_characters c JOIN users u ON u.id = c.user_id WHERE c.id = ANY($1::int[])`,
      [faltan],
    );
    for (const r of rows) nombres.set(Number(r.id), { nombre: nombreDe(r), camino: caminoDe(r.path) });
  }
  return new Map(ids.map((i) => [i, nombres.get(i) ?? { nombre: "Alguien", camino: "sacerdocio" as Camino }]));
}

async function leer(id: number): Promise<Fila | null> {
  const { rows } = await pool.query(`SELECT * FROM game_sabio_duelos WHERE id = $1`, [id]);
  return (rows[0] as Fila) ?? null;
}

function avisarAmbos(d: Fila) {
  avisarA(Number(d.a_user), { t: "duelo", id: Number(d.id) });
  avisarA(Number(d.b_user), { t: "duelo", id: Number(d.id) });
}

// ---------------------------------------------------------------- las rondas
/** Las diez preguntas (de la grada 1 a la 10) que ninguno de los dos haya visto; quedan vistas para los dos. */
async function elegirParaDuelo(ta: number, tb: number): Promise<string[]> {
  const fa = await filaPersona(ta);
  const fb = await filaPersona(tb);
  const ids: string[] = [];
  for (let n = 1; n <= DUELO_RONDAS; n++) {
    const todas = POR_GRADA.get(n) ?? [];
    const va = new Set(fa.vistas[String(n)] ?? []);
    const vb = new Set(fb.vistas[String(n)] ?? []);
    let libres = todas.filter((q) => !va.has(q.id) && !vb.has(q.id));
    if (!libres.length) libres = todas.filter((q) => !va.has(q.id) || !vb.has(q.id));
    if (!libres.length) libres = todas;
    ids.push(libres[Math.floor(Math.random() * libres.length)].id);
  }
  for (const t of [ta, tb])
    await enFila(t, async () => {
      const f = await filaPersona(t);
      const vistas = { ...f.vistas };
      ids.forEach((id, i) => {
        const k = String(i + 1);
        const l = vistas[k] ?? [];
        if (!l.includes(id)) vistas[k] = [...l, id];
      });
      await pool.query(`UPDATE game_sabio SET vistas = $2::jsonb WHERE character_id = $1`, [t, JSON.stringify(vistas)]);
    });
  return ids;
}

/** Cuenta un duelo del día (los duelos tienen su propio tope). */
async function contarDelDia(t: number) {
  await enFila(t, async () => {
    await filaPersona(t);
    await pool.query(
      `UPDATE game_sabio SET duelos_hoy = CASE WHEN duelos_dia = $2 THEN duelos_hoy + 1 ELSE 1 END, duelos_dia = $2, updated_at = now() WHERE character_id = $1`,
      [t, diaClave()],
    );
  });
}

async function servirRonda(d: Fila, n: number, ahora: number): Promise<Fila> {
  const q = PREGUNTA.get(lista<string>(d.preguntas)[n - 1]);
  if (!q) return terminarDuelo(d, null, ahora);
  const servida = n === 1 ? ahora + DUELO_PREPARAR_S * 1000 : ahora;
  const { rows } = await pool.query(
    `UPDATE game_sabio_duelos SET ronda = $2, opciones = $3::jsonb, servida = $4, revelada = NULL, resp = '{}'::jsonb WHERE id = $1 RETURNING *`,
    [d.id, n, JSON.stringify(mezclar([q.correcta, ...q.falsas])), servida],
  );
  avisarAmbos(rows[0] as Fila);
  return rows[0] as Fila;
}

/** Cierra la ronda: suma los puntos (los buenos, con lo rápido) y la deja a la vista unos segundos. */
async function resolverRonda(d: Fila, ahora: number): Promise<Fila> {
  const q = PREGUNTA.get(lista<string>(d.preguntas)[Number(d.ronda) - 1]);
  if (!q) return terminarDuelo(d, null, ahora);
  const resp = respDe(d);
  const puntos = (r?: Respuesta) => (r && r.o === q.correcta ? puntosDuelo(r.ms) : 0);
  const ronda: Ronda = { q: q.id, opciones: lista<string>(d.opciones), a: resp.a ?? null, b: resp.b ?? null, pa: puntos(resp.a), pb: puntos(resp.b) };
  const { rows } = await pool.query(
    `UPDATE game_sabio_duelos SET pa = pa + $2, pb = pb + $3, historial = $4::jsonb, revelada = $5 WHERE id = $1 RETURNING *`,
    [d.id, ronda.pa, ronda.pb, JSON.stringify([...lista<Ronda>(d.historial), ronda]), ahora],
  );
  // lo que se responde en los duelos también lo cuentan los ancianos de la puerta
  for (const r of [resp.a, resp.b])
    if (r?.o)
      await pool.query(
        `INSERT INTO game_sabio_respuestas (pregunta, opcion, n) VALUES ($1, $2, 1) ON CONFLICT (pregunta, opcion) DO UPDATE SET n = game_sabio_respuestas.n + 1`,
        [q.id, r.o],
      );
  avisarAmbos(rows[0] as Fila);
  return rows[0] as Fila;
}

/** Termina el duelo: quién ganó (o empate; o quién lo abandonó), el gozo de cada uno y el manto de los vencedores. */
async function terminarDuelo(d: Fila, ausente: Lado | null, ahora: number): Promise<Fila> {
  const pa = Number(d.pa);
  const pb = Number(d.pb);
  const ganador = ausente ? (ausente === "a" ? Number(d.b_id) : Number(d.a_id)) : pa > pb ? Number(d.a_id) : pb > pa ? Number(d.b_id) : 0;
  const premiar = (lado: Lado) => {
    const t = lado === "a" ? Number(d.a_id) : Number(d.b_id);
    return enFila(t, async () => {
      const f = await filaPersona(t);
      const gano = ganador === t;
      const quiere = ausente === lado ? 0 : gano ? GOZO_DUELO.gana : ganador === 0 ? GOZO_DUELO.empate : GOZO_DUELO.pierde;
      const gozo = Math.max(0, Math.min(quiere, GOZO_SABIO_DIA - f.gozo_hoy));
      const ganados = f.duelos_ganados + (gano ? 1 : 0);
      const premios = new Set(f.premios);
      let premio: string | null = null;
      if (ganados >= DUELOS_MANTO && !premios.has("manto-vencedores")) {
        premios.add("manto-vencedores");
        premio = TRAJES_SABIOS.find((x) => x.id === "manto-vencedores")?.nombre ?? null;
        await pool.query(
          `UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`,
          [t, "manto-vencedores"],
        );
      }
      await pool.query(
        `UPDATE game_sabio SET duelos = duelos + 1, duelos_ganados = $2, dia = $3, gozo_hoy = $4, entradas_hoy = $5, premios = $6::jsonb, updated_at = now() WHERE character_id = $1`,
        [t, ganados, diaClave(), f.gozo_hoy + gozo, f.entradas_hoy, JSON.stringify([...premios])],
      );
      if (gozo) await sumarGozo(t, gozo);
      // la copa de los barrios: jugar el duelo (y ganarlo) suma para el barrio; quien lo deja, nada
      if (ausente !== lado) await sumarALaCopa(t, "duelo");
      if (gano) await sumarALaCopa(t, "dueloGanado");
      return { gozo, premio };
    });
  };
  const ra = await premiar("a");
  const rb = await premiar("b");
  const { rows } = await pool.query(
    `UPDATE game_sabio_duelos SET estado = 'terminado', ganador = $2, abandono = $3, gozo_a = $4, gozo_b = $5, premio_a = $6, premio_b = $7,
            revelada = COALESCE(revelada, $8), finished_at = now()
      WHERE id = $1 RETURNING *`,
    [d.id, ganador, ausente ? (ausente === "a" ? Number(d.a_id) : Number(d.b_id)) : null, ra.gozo, rb.gozo, ra.premio, rb.premio, ahora],
  );
  avisarAmbos(rows[0] as Fila);
  return rows[0] as Fila;
}

/**
 * Pone el duelo al día (lo llama quien pregunta): vence el reto que nadie aceptó, termina el duelo que alguien
 * abandonó, cierra la ronda cuando los dos respondieron o se acabó el tiempo, y pasa a la siguiente.
 */
async function avanzar(d: Fila, ahora: number): Promise<Fila> {
  if (d.estado === "invitado") {
    if (ahora - Number(d.creado) <= DUELO_RETO_S * 1000 + GRACIA_MS) return d;
    const { rows } = await pool.query(`UPDATE game_sabio_duelos SET estado = 'vencido', finished_at = now() WHERE id = $1 AND estado = 'invitado' RETURNING *`, [d.id]);
    if (!rows[0]) return (await leer(Number(d.id))) ?? d;
    avisarA(Number(d.b_user), { t: "duelo-reto-fin", id: Number(d.id), motivo: "El reto del duelo venció." });
    avisarA(Number(d.a_user), { t: "duelo", id: Number(d.id) });
    return rows[0] as Fila;
  }
  if (d.estado !== "jugando") return d;
  const va = vistoDe(Number(d.id), "a", ahora);
  const vb = vistoDe(Number(d.id), "b", ahora);
  if (ahora - va > AUSENTE_MS || ahora - vb > AUSENTE_MS) return terminarDuelo(d, va <= vb ? "a" : "b", ahora);
  const servida = Number(d.servida || 0);
  if (d.revelada == null) {
    const resp = respDe(d);
    if ((resp.a && resp.b) || ahora > servida + DUELO_SEGUNDOS * 1000 + GRACIA_MS) return resolverRonda(d, ahora);
    return d;
  }
  if (ahora - Number(d.revelada) < DUELO_REVELAR_S * 1000) return d;
  if (Number(d.ronda) >= DUELO_RONDAS) return terminarDuelo(d, null, ahora);
  return servirRonda(d, Number(d.ronda) + 1, ahora);
}

/** El duelo tal como lo ve cada lado: nunca la respuesta buena ni la del otro antes de cerrar la ronda. */
function vistaDuelo(d: Fila, l: Lado, ns: Map<number, { nombre: string; camino: Camino }>, ahora: number): DueloVista {
  const o = otroLado(l);
  const resp = respDe(d);
  const servida = Number(d.servida || 0);
  const abierta = d.estado === "jugando" && d.revelada == null;
  const q = Number(d.ronda) > 0 ? PREGUNTA.get(lista<string>(d.preguntas)[Number(d.ronda) - 1]) : undefined;
  const historial = lista<Ronda>(d.historial);
  const ult = d.revelada != null && historial.length ? historial[historial.length - 1] : null;
  const qu = ult ? PREGUNTA.get(ult.q) : undefined;
  const puntos = (x: Lado) => (x === "a" ? Number(d.pa) : Number(d.pb));
  const jugador = (x: Lado) => (x === "a" ? Number(d.a_jugador) : Number(d.b_jugador));
  const titular = (x: Lado) => (x === "a" ? Number(d.a_id) : Number(d.b_id));
  let espera = 0;
  if (d.estado === "invitado") espera = Math.max(0, Math.ceil((Number(d.creado) + DUELO_RETO_S * 1000 - ahora) / 1000));
  else if (d.estado === "jugando")
    espera = d.revelada != null ? Math.max(0, Math.ceil((Number(d.revelada) + DUELO_REVELAR_S * 1000 - ahora) / 1000)) : ahora < servida ? Math.ceil((servida - ahora) / 1000) : 0;
  return {
    id: Number(d.id),
    estado: d.estado,
    reto: l === "a",
    yo: { ...ns.get(jugador(l))!, puntos: puntos(l), respondio: abierta && !!resp[l] },
    rival: { ...ns.get(jugador(o))!, puntos: puntos(o), respondio: abierta && !!resp[o] },
    rivalId: jugador(o),
    ronda: Number(d.ronda),
    pregunta:
      abierta && q && ahora >= servida
        ? {
            n: Number(d.ronda),
            texto: q.pregunta,
            opciones: lista<string>(d.opciones),
            segundos: DUELO_SEGUNDOS,
            restantes: Math.max(0, Math.ceil((servida + DUELO_SEGUNDOS * 1000 - ahora) / 1000)),
          }
        : null,
    miRespuesta: abierta ? resp[l]?.o ?? null : null,
    revelado:
      ult && qu
        ? {
            n: historial.length,
            texto: qu.pregunta,
            opciones: ult.opciones,
            correcta: qu.correcta,
            explica: qu.explica,
            ref: qu.ref,
            mia: ult[l]?.o ?? null,
            suya: ult[o]?.o ?? null,
            misPuntos: l === "a" ? ult.pa : ult.pb,
            susPuntos: l === "a" ? ult.pb : ult.pa,
          }
        : null,
    espera,
    fin:
      d.estado === "terminado"
        ? {
            gane: Number(d.ganador) === titular(l),
            empate: Number(d.ganador) === 0,
            abandono: d.abandono != null,
            meFui: d.abandono != null && Number(d.abandono) === titular(l),
            gozo: l === "a" ? Number(d.gozo_a) : Number(d.gozo_b),
            premio: l === "a" ? d.premio_a : d.premio_b,
          }
        : null,
  };
}

/** La tabla de la semana: quién ganó más duelos (empates: quien jugó menos). */
async function tablaDuelos(semana: string, yo: number): Promise<FilaDuelo[]> {
  const { rows } = await pool.query(
    `SELECT t.titular, sum(t.gano)::int AS ganados, count(*)::int AS jugados,
            (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS name,
            u.display_name, u.username
       FROM (SELECT a_id AS titular, (ganador = a_id)::int AS gano FROM game_sabio_duelos WHERE semana = $1 AND estado = 'terminado'
             UNION ALL
             SELECT b_id AS titular, (ganador = b_id)::int AS gano FROM game_sabio_duelos WHERE semana = $1 AND estado = 'terminado') t
       JOIN game_characters c ON c.id = t.titular
       JOIN users u ON u.id = c.user_id AND u.is_active IS NOT FALSE
      GROUP BY t.titular, c.user_id, c.game, u.display_name, u.username
     HAVING sum(t.gano) > 0
      ORDER BY ganados DESC, jugados ASC
      LIMIT 10`,
    [semana],
  );
  return rows.map((r, i) => ({ puesto: i + 1, nombre: nombreDe(r), ganados: Number(r.ganados), jugados: Number(r.jugados), esYo: Number(r.titular) === yo }));
}

export function registerSabioDueloRoutes(app: Express) {
  async function persona(req: Request, res: Response): Promise<Persona | null> {
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
    return { ch, titular: ch.casa };
  }
  /** Para preguntar por un duelo cada segundo: basta la sesión (sin buscar el personaje). */
  function cuentaActiva(req: Request, res: Response): number | null {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    return req.user!.id;
  }
  const responder = (res: Response, fn: () => Promise<unknown>) =>
    fn().catch((err) => {
      console.error("[sabio-duelo]", err);
      if (!res.headersSent) res.sendStatus(500);
    });

  async function vistaPara(d: Fila, cuenta: number): Promise<DueloVista | null> {
    const l = ladoDe(d, cuenta);
    if (!l) return null;
    return vistaDuelo(d, l, await nombresDe([Number(d.a_jugador), Number(d.b_jugador)]), Date.now());
  }

  /** Mi duelo en curso, o el reto que mandé y espera respuesta. */
  async function dueloDe(cuenta: number): Promise<Fila | null> {
    const { rows } = await pool.query(
      `SELECT * FROM game_sabio_duelos
        WHERE (estado = 'jugando' AND (a_user = $1 OR b_user = $1)) OR (estado = 'invitado' AND a_user = $1)
        ORDER BY id DESC LIMIT 1`,
      [cuenta],
    );
    return (rows[0] as Fila) ?? null;
  }

  /** Si la persona ya está en un duelo (o retó a alguien y el reto sigue en pie). */
  async function ocupadoEnDuelo(titular: number): Promise<boolean> {
    const { rows } = await pool.query(
      `SELECT estado, creado FROM game_sabio_duelos WHERE (a_id = $1 OR b_id = $1) AND estado IN ('invitado', 'jugando') AND created_at > now() - interval '30 minutes'`,
      [titular],
    );
    const ahora = Date.now();
    return rows.some((r) => r.estado === "jugando" || ahora - Number(r.creado) <= DUELO_RETO_S * 1000 + GRACIA_MS);
  }

  async function retosPara(cuenta: number, ahora: number): Promise<RetoDuelo[]> {
    const { rows } = await pool.query(
      `SELECT id, a_jugador, creado FROM game_sabio_duelos WHERE b_user = $1 AND estado = 'invitado' AND creado > $2 ORDER BY id DESC LIMIT 3`,
      [cuenta, ahora - DUELO_RETO_S * 1000],
    );
    const ns = await nombresDe(rows.map((r) => Number(r.a_jugador)));
    return rows.map((r) => {
      const n = ns.get(Number(r.a_jugador))!;
      return { id: Number(r.id), de: n.nombre, camino: n.camino, restantes: Math.max(0, Math.ceil((Number(r.creado) + DUELO_RETO_S * 1000 - ahora) / 1000)) };
    });
  }

  /** Empieza el duelo: las diez preguntas, un duelo del día para cada uno y la primera ronda (con unos segundos para prepararse). */
  async function empezarDuelo(d: Fila, ahora: number): Promise<Fila> {
    const preguntas = await elegirParaDuelo(Number(d.a_id), Number(d.b_id));
    await contarDelDia(Number(d.a_id));
    await contarDelDia(Number(d.b_id));
    const { rows } = await pool.query(`UPDATE game_sabio_duelos SET estado = 'jugando', preguntas = $2::jsonb WHERE id = $1 RETURNING *`, [d.id, JSON.stringify(preguntas)]);
    marcarVisto(Number(d.id), "a", ahora);
    marcarVisto(Number(d.id), "b", ahora);
    return servirRonda(rows[0] as Fila, 1, ahora);
  }

  // ------------------------------------------------------------ buscar a alguien (en memoria)
  const buscando = new Map<number, { u: number; jugador: number; desde: number; visto: number }>();

  /** Empareja a quien busca con quien lleve más tiempo esperando (sin bloqueos entre ellos). */
  function emparejar(pr: Persona, ahora: number): Promise<Fila | null> {
    return enFila(FILA_BUSQUEDA, async () => {
      for (const [t, e] of buscando) if (ahora - e.visto > BUSCAR_VISTO_MS || ahora - e.desde > BUSCAR_MS) buscando.delete(t);
      if (!buscando.has(pr.titular)) return null;
      const ya = await dueloDe(pr.ch.user_id);
      if (ya && ya.estado === "jugando") {
        buscando.delete(pr.titular);
        return ya;
      }
      const { rows: b } = await pool.query(`SELECT blocker_id, blocked_id FROM user_blocks WHERE blocker_id = $1 OR blocked_id = $1`, [pr.ch.user_id]);
      const no = new Set(b.map((x) => (Number(x.blocker_id) === pr.ch.user_id ? Number(x.blocked_id) : Number(x.blocker_id))));
      const otro = [...buscando.entries()]
        .filter(([t, e]) => t !== pr.titular && e.u !== pr.ch.user_id && !no.has(e.u))
        .sort((x, y) => x[1].desde - y[1].desde)[0];
      if (!otro) return null;
      const [tOtro, eOtro] = otro;
      buscando.delete(tOtro);
      buscando.delete(pr.titular);
      // quien esperaba más es «a»
      const { rows } = await pool.query(
        `INSERT INTO game_sabio_duelos (a_id, b_id, a_user, b_user, a_jugador, b_jugador, creado, semana) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [tOtro, pr.titular, eOtro.u, pr.ch.user_id, eOtro.jugador, pr.ch.id, ahora, semanaClave()],
      );
      const d = rows[0] as Fila;
      return enFila(-Number(d.id), () => empezarDuelo(d, ahora));
    });
  }

  // ------------------------------------------------------------ rutas
  // La sala de los duelos: a quién retar, cuántos van hoy, los de siempre y la tabla de la semana.
  app.get("/api/jerusalen/sabio/duelos", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const f = await filaPersona(pr.titular);
      const rivales = (await amigosPosibles(pr.titular, pr.ch.user_id)).map(({ t: _t, u: _u, ...x }) => x);
      const semana = semanaClave();
      res.setHeader("Cache-Control", "no-store");
      res.json({
        rivales,
        hoy: f.duelos_hoy,
        jugados: f.duelos,
        ganados: f.duelos_ganados,
        tabla: await tablaDuelos(semana, pr.titular),
        semana,
        buscando: buscando.has(pr.titular),
      } satisfies DuelosEstado);
    }),
  );

  // Mi duelo (en curso, o el reto que mandé), los retos que me llegaron y si estoy buscando rival.
  app.get("/api/jerusalen/sabio/duelo", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const ahora = Date.now();
      let d = await dueloDe(pr.ch.user_id);
      if (d) {
        const id = Number(d.id);
        d = await enFila(-id, async () => {
          const x = await leer(id);
          const l = x ? ladoDe(x, pr.ch.user_id) : null;
          if (!x || !l) return null;
          marcarVisto(id, l, ahora);
          return avanzar(x, ahora);
        });
      }
      const espera = buscando.get(pr.titular);
      if (!d && espera) {
        espera.visto = ahora;
        d = await emparejar(pr, ahora);
      }
      res.setHeader("Cache-Control", "no-store");
      res.json({ duelo: d ? await vistaPara(d, pr.ch.user_id) : null, retos: await retosPara(pr.ch.user_id, ahora), buscando: buscando.has(pr.titular) });
    }),
  );

  // Un duelo por su número (se pregunta cada segundo mientras se juega): lo pone al día.
  app.get("/api/jerusalen/sabio/duelo/:id", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Duelo no válido." });
      const ahora = Date.now();
      const d = await enFila(-id, async () => {
        const x = await leer(id);
        const l = x ? ladoDe(x, me) : null;
        if (!x || !l) return null;
        if (x.estado === "jugando") marcarVisto(id, l, ahora);
        return avanzar(x, ahora);
      });
      if (!d) return res.status(404).json({ message: "Ese duelo ya no está." });
      res.setHeader("Cache-Control", "no-store");
      res.json({ duelo: await vistaPara(d, me) });
    }),
  );

  // Retar a un amigo o vecino que esté en línea: le llega el reto y tiene 45 segundos para aceptar.
  app.post("/api/jerusalen/sabio/duelo/retar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const a = Number(req.body?.a);
      if (!Number.isInteger(a) || a <= 0) return res.status(400).json({ message: "Elige a quién retar." });
      type Salida = { error: number; message: string } | { d: Fila };
      const out = await enFila(pr.titular, async (): Promise<Salida> => {
        if (await ocupadoEnDuelo(pr.titular)) return { error: 409, message: "Ya tienes un duelo en curso." };
        const f = await filaPersona(pr.titular);
        if (f.duelos_hoy >= DUELOS_DIA) return { error: 429, message: `Por hoy ya jugaste los ${DUELOS_DIA} duelos. Mañana hay más.` };
        const rival = (await amigosPosibles(pr.titular, pr.ch.user_id)).find((x) => x.personajeId === a);
        if (!rival) return { error: 409, message: "Esa persona ya no puede aceptar un duelo ahora." };
        if (await ocupadoEnDuelo(rival.t)) return { error: 409, message: `${rival.nombre} ya tiene otro duelo.` };
        if ((await filaPersona(rival.t)).duelos_hoy >= DUELOS_DIA) return { error: 409, message: `${rival.nombre} ya jugó sus duelos de hoy.` };
        const ahora = Date.now();
        const { rows } = await pool.query(
          `INSERT INTO game_sabio_duelos (a_id, b_id, a_user, b_user, a_jugador, b_jugador, creado, semana) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          [pr.titular, rival.t, pr.ch.user_id, rival.u, pr.ch.id, rival.personajeId, ahora, semanaClave()],
        );
        const d = rows[0] as Fila;
        const llego = avisarA(rival.u, { t: "duelo-reto", r: { id: Number(d.id), de: nombreDe(pr.ch), camino: pr.ch.camino, restantes: DUELO_RETO_S } });
        if (!llego) {
          await pool.query(`UPDATE game_sabio_duelos SET estado = 'cancelado', finished_at = now() WHERE id = $1`, [d.id]);
          return { error: 409, message: `${rival.nombre} ya no estaba en la ciudad.` };
        }
        return { d };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ duelo: await vistaPara(out.d, pr.ch.user_id) });
    }),
  );

  // Aceptar o no el reto (solo quien fue retado).
  const contestarReto = (acepta: boolean) => (req: Request, res: Response) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Reto no válido." });
      type Salida = { error: number; message: string } | { d: Fila };
      const out = await enFila(-id, async (): Promise<Salida> => {
        const d = await leer(id);
        if (!d || Number(d.b_user) !== pr.ch.user_id) return { error: 404, message: "Ese reto ya no está." };
        const ahora = Date.now();
        const x = await avanzar(d, ahora);
        if (x.estado !== "invitado") return { error: 409, message: x.estado === "vencido" ? "El reto ya venció." : "Ese reto ya terminó." };
        if (!acepta) {
          const { rows } = await pool.query(`UPDATE game_sabio_duelos SET estado = 'rechazado', finished_at = now() WHERE id = $1 RETURNING *`, [id]);
          avisarA(Number(x.a_user), { t: "duelo", id });
          return { d: rows[0] as Fila };
        }
        if ((await filaPersona(pr.titular)).duelos_hoy >= DUELOS_DIA) return { error: 429, message: `Por hoy ya jugaste los ${DUELOS_DIA} duelos. Mañana hay más.` };
        if ((await filaPersona(Number(x.a_id))).duelos_hoy >= DUELOS_DIA) {
          await pool.query(`UPDATE game_sabio_duelos SET estado = 'cancelado', finished_at = now() WHERE id = $1`, [id]);
          avisarA(Number(x.a_user), { t: "duelo", id });
          return { error: 409, message: "Quien te retó ya jugó sus duelos de hoy." };
        }
        buscando.delete(pr.titular);
        buscando.delete(Number(x.a_id));
        return { d: await empezarDuelo(x, ahora) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ duelo: await vistaPara(out.d, pr.ch.user_id) });
    });
  app.post("/api/jerusalen/sabio/duelo/:id/aceptar", contestarReto(true));
  app.post("/api/jerusalen/sabio/duelo/:id/rechazar", contestarReto(false));

  // Responder la ronda (una vez por ronda; acertar rápido vale más).
  app.post("/api/jerusalen/sabio/duelo/:id/responder", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Duelo no válido." });
      const opcion = typeof req.body?.opcion === "string" ? normal(req.body.opcion) : "";
      type Salida = { error: number; message: string; d?: Fila } | { d: Fila };
      const out = await enFila(-id, async (): Promise<Salida> => {
        const d = await leer(id);
        const l = d ? ladoDe(d, me) : null;
        if (!d || !l) return { error: 404, message: "Ese duelo ya no está." };
        const ahora = Date.now();
        if (d.estado === "jugando") marcarVisto(id, l, ahora);
        let x = await avanzar(d, ahora);
        if (x.estado !== "jugando" || x.revelada != null) return { error: 409, message: "Esta ronda ya se cerró.", d: x };
        const servida = Number(x.servida || 0);
        if (ahora < servida) return { error: 409, message: "La ronda todavía no empieza.", d: x };
        const resp = respDe(x);
        if (resp[l]) return { error: 409, message: "Ya respondiste esta ronda.", d: x };
        if (!lista<string>(x.opciones).includes(opcion)) return { error: 400, message: "Esa respuesta no está entre las opciones." };
        const nuevo = { ...resp, [l]: { o: opcion, ms: Math.min(DUELO_SEGUNDOS * 1000, ahora - servida) } as Respuesta };
        const { rows } = await pool.query(`UPDATE game_sabio_duelos SET resp = $2::jsonb WHERE id = $1 RETURNING *`, [id, JSON.stringify(nuevo)]);
        x = rows[0] as Fila;
        if (nuevo.a && nuevo.b) x = await resolverRonda(x, ahora);
        else avisarA(l === "a" ? Number(x.b_user) : Number(x.a_user), { t: "duelo", id });
        return { d: x };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message, duelo: out.d ? await vistaPara(out.d, me) : null });
      res.json({ duelo: await vistaPara(out.d, me) });
    }),
  );

  // Salir: quien retó cancela el reto; en pleno duelo, salir es abandonarlo (gana el otro).
  app.post("/api/jerusalen/sabio/duelo/:id/salir", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Duelo no válido." });
      const out = await enFila(-id, async () => {
        const d = await leer(id);
        const l = d ? ladoDe(d, me) : null;
        if (!d || !l) return null;
        const ahora = Date.now();
        if (d.estado === "invitado") {
          const estado = l === "a" ? "cancelado" : "rechazado";
          const { rows } = await pool.query(`UPDATE game_sabio_duelos SET estado = $2, finished_at = now() WHERE id = $1 RETURNING *`, [id, estado]);
          if (l === "a") avisarA(Number(d.b_user), { t: "duelo-reto-fin", id, motivo: "Quien te retó canceló el duelo." });
          else avisarA(Number(d.a_user), { t: "duelo", id });
          return rows[0] as Fila;
        }
        if (d.estado === "jugando") return terminarDuelo(d, l, ahora);
        return d;
      });
      if (!out) return res.status(404).json({ message: "Ese duelo ya no está." });
      res.json({ duelo: await vistaPara(out, me) });
    }),
  );

  // Buscar a alguien que también quiera un duelo (o dejar de buscar).
  app.post("/api/jerusalen/sabio/duelo/buscar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const ahora = Date.now();
      const ya = await dueloDe(pr.ch.user_id);
      if (ya) return res.json({ duelo: await vistaPara(ya, pr.ch.user_id), buscando: false });
      if ((await filaPersona(pr.titular)).duelos_hoy >= DUELOS_DIA) return res.status(429).json({ message: `Por hoy ya jugaste los ${DUELOS_DIA} duelos. Mañana hay más.` });
      if (!buscando.has(pr.titular)) buscando.set(pr.titular, { u: pr.ch.user_id, jugador: pr.ch.id, desde: ahora, visto: ahora });
      const d = await emparejar(pr, ahora);
      res.json({ duelo: d ? await vistaPara(d, pr.ch.user_id) : null, buscando: !d && buscando.has(pr.titular) });
    }),
  );
  app.delete("/api/jerusalen/sabio/duelo/buscar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      buscando.delete(pr.titular);
      res.json({ buscando: false });
    }),
  );
}

