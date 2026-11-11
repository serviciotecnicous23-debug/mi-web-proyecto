/**
 * «¿Quién es sabio?» (shared/sabio.ts): el concurso de la casa de la sabiduría. El servidor elige cada
 * pregunta (de su grada, al azar entre las que esa persona no ha visto), guarda en qué orden mostró las
 * respuestas y a qué hora, corrige, lleva los comodines y, al terminar, reparte puntos de sabiduría, gozo
 * (con tope diario), títulos y los trajes de los sabios. Todo es de la persona (su titular): el personaje
 * con que juega da el nombre en las tablas.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { BANCO_SABIO, type FilaSabio } from "./sabio-banco";
import { diaClave, enFila, evento, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { semanaClave } from "./misiones";
import { sumarGozo } from "./gozo";
import {
  ENTRADAS_DIA, GOZO_GRADA, GOZO_SABIO_DIA, GRADAS, PREMIO_SEMANA, PUNTOS_GRADA, SEGUNDOS_COMODIN, TRAJES_SABIOS, gradaSegura, segundosGrada, tituloDe,
  type Comodin, type FilaTabla, type FinPartida, type PartidaVista, type PremioSabio, type RespuestaSabio, type SabioEstado,
} from "@shared/sabio";

export const SABIO_SQL = `
CREATE TABLE IF NOT EXISTS "game_sabio" (
  "character_id" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "vistas" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "partidas" integer NOT NULL DEFAULT 0,
  "mejor" integer NOT NULL DEFAULT 0,
  "ganadas" integer NOT NULL DEFAULT 0,
  "sin_comodines" integer NOT NULL DEFAULT 0,
  "racha" integer NOT NULL DEFAULT 0,
  "total" bigint NOT NULL DEFAULT 0,
  "premios" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "dia" text,
  "entradas_hoy" integer NOT NULL DEFAULT 0,
  "gozo_hoy" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_sabio_partidas" (
  "id" serial PRIMARY KEY,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "jugador_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "user_id" integer NOT NULL,
  "estado" text NOT NULL DEFAULT 'jugando',
  "grada" integer NOT NULL DEFAULT 0,
  "pregunta" text,
  "opciones" jsonb,
  "quitadas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "servida_at" timestamp,
  "extra" integer NOT NULL DEFAULT 0,
  "usados" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "ancianos" jsonb,
  "amigo" jsonb,
  "puntos" integer NOT NULL DEFAULT 0,
  "gozo" integer NOT NULL DEFAULT 0,
  "semana" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "finished_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_game_sabio_partidas_persona" ON "game_sabio_partidas" ("character_id", "estado");
CREATE INDEX IF NOT EXISTS "idx_game_sabio_partidas_semana" ON "game_sabio_partidas" ("semana", "puntos");
CREATE TABLE IF NOT EXISTS "game_sabio_respuestas" (
  "pregunta" text NOT NULL,
  "opcion" text NOT NULL,
  "n" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("pregunta", "opcion")
);
CREATE TABLE IF NOT EXISTS "game_sabio_premios_semana" (
  "semana" text NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "puesto" integer NOT NULL,
  "gozo" integer NOT NULL,
  PRIMARY KEY ("semana", "character_id")
);`;

const PREGUNTA = new Map(BANCO_SABIO.map((q) => [q.id, q]));
const POR_GRADA = new Map<number, FilaSabio[]>();
for (const q of BANCO_SABIO) POR_GRADA.set(q.n, [...(POR_GRADA.get(q.n) ?? []), q]);

/**
 * Los segundos que pasaron se calculan en la base: las horas se guardan sin zona horaria y
 * compararlas en JavaScript las corre unas horas.
 */
const TIEMPOS = `EXTRACT(EPOCH FROM (now() - servida_at))::float AS pasados, EXTRACT(EPOCH FROM (now() - COALESCE(servida_at, created_at)))::float AS quieto`;

/** Unos segundos de gracia por la red (la respuesta tarda en llegar). */
const GRACIA_S = 3;
/** Una partida sin moverse por más de esto se cierra sola (con lo que tenía). */
const PARTIDA_ABANDONADA_MIN = 30;
/** Para la tabla de lo que responde el pueblo hacen falta al menos estas respuestas. */
const MINIMO_PUEBLO = 12;

const lista = <T = string>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
function mezclar<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
const normal = (s: string) => s.normalize("NFC").trim();

type Persona = { ch: PersonajeFila; titular: number };
type FilaPartida = {
  id: number;
  character_id: number;
  jugador_id: number;
  user_id: number;
  estado: string;
  grada: number;
  pregunta: string | null;
  opciones: unknown;
  quitadas: unknown;
  servida_at: Date | string | null;
  extra: number;
  usados: unknown;
  ancianos: unknown;
  amigo: unknown;
  puntos: number;
  semana: string;
  created_at: Date | string;
  /** Segundos desde que se mostró la pregunta y desde el último movimiento (calculados en la base). */
  pasados: number | null;
  quieto: number | null;
};
type FilaSabioPersona = {
  vistas: Record<string, string[]>;
  partidas: number;
  mejor: number;
  ganadas: number;
  sin_comodines: number;
  racha: number;
  total: number;
  premios: string[];
  dia: string | null;
  entradas_hoy: number;
  gozo_hoy: number;
};

async function filaPersona(titular: number): Promise<FilaSabioPersona> {
  await pool.query(`INSERT INTO game_sabio (character_id) VALUES ($1) ON CONFLICT (character_id) DO NOTHING`, [titular]);
  const { rows } = await pool.query(`SELECT * FROM game_sabio WHERE character_id = $1`, [titular]);
  const r = rows[0];
  const hoy = diaClave();
  const mismoDia = r.dia === hoy;
  return {
    vistas: r.vistas && typeof r.vistas === "object" && !Array.isArray(r.vistas) ? r.vistas : {},
    partidas: Number(r.partidas),
    mejor: Number(r.mejor),
    ganadas: Number(r.ganadas),
    sin_comodines: Number(r.sin_comodines),
    racha: Number(r.racha),
    total: Number(r.total),
    premios: lista(r.premios),
    dia: r.dia,
    entradas_hoy: mismoDia ? Number(r.entradas_hoy) : 0,
    gozo_hoy: mismoDia ? Number(r.gozo_hoy) : 0,
  };
}

const segundosDe = (p: FilaPartida, n: number) => segundosGrada(n) + Number(p.extra || 0);
function restantes(p: FilaPartida, n: number): number {
  if (!p.servida_at || p.pasados == null) return segundosGrada(n);
  return Math.max(0, Math.ceil(segundosDe(p, n) - Number(p.pasados)));
}

function vista(p: FilaPartida, rolloAbierto: boolean): PartidaVista {
  const q = p.pregunta ? PREGUNTA.get(p.pregunta) : undefined;
  const n = p.grada + 1;
  return {
    id: Number(p.id),
    grada: Number(p.grada),
    puntos: PUNTOS_GRADA[p.grada],
    seguro: PUNTOS_GRADA[gradaSegura(p.grada)],
    pregunta: q
      ? { n, texto: q.pregunta, opciones: lista<string>(p.opciones), quitadas: lista<number>(p.quitadas), segundos: segundosDe(p, n), restantes: restantes(p, n) }
      : null,
    usados: lista<Comodin>(p.usados),
    rolloAbierto,
    ancianos: Array.isArray(p.ancianos) ? (p.ancianos as number[]) : null,
    amigo: p.amigo && typeof p.amigo === "object" ? (p.amigo as PartidaVista["amigo"]) : null,
  };
}

/** Elige una pregunta de la grada que esa persona no haya visto (si ya vio todas, vuelve a empezar esa grada). */
function elegirPregunta(n: number, vistas: Record<string, string[]>, evitar: string[] = []): { q: FilaSabio; vistas: Record<string, string[]> } {
  const todas = POR_GRADA.get(n) ?? [];
  let vistasN = vistas[String(n)] ?? [];
  let libres = todas.filter((q) => !vistasN.includes(q.id) && !evitar.includes(q.id));
  if (!libres.length) {
    // vio todas: empieza otra vuelta (menos la que se quiere evitar)
    vistasN = [];
    libres = todas.filter((q) => !evitar.includes(q.id));
  }
  const q = libres[Math.floor(Math.random() * libres.length)];
  return { q, vistas: { ...vistas, [String(n)]: [...vistasN, q.id] } };
}

/** Lo que respondió el pueblo (si hay suficientes respuestas) o el consejo de los ancianos. */
async function puebloDe(p: FilaPartida, q: FilaSabio): Promise<number[]> {
  const opciones = lista<string>(p.opciones);
  const quitadas = new Set(lista<number>(p.quitadas));
  const { rows } = await pool.query(`SELECT opcion, n FROM game_sabio_respuestas WHERE pregunta = $1`, [q.id]);
  const cuenta = new Map(rows.map((r) => [String(r.opcion), Number(r.n)]));
  const total = opciones.reduce((a, o, i) => a + (quitadas.has(i) ? 0 : cuenta.get(o) ?? 0), 0);
  let pesos: number[];
  if (total >= MINIMO_PUEBLO) pesos = opciones.map((o, i) => (quitadas.has(i) ? 0 : cuenta.get(o) ?? 0));
  else {
    // pocos datos: los ancianos aciertan más en las gradas fáciles
    const n = p.grada + 1;
    const acierto = Math.max(0.32, Math.min(0.9, 0.9 - (n - 1) * 0.04 + (Math.random() - 0.5) * 0.12));
    pesos = opciones.map((o, i) => (quitadas.has(i) ? 0 : o === q.correcta ? acierto * 100 : Math.random() * (1 - acierto) * 100));
  }
  const suma = pesos.reduce((a, b) => a + b, 0) || 1;
  const pct = pesos.map((w) => Math.round((w / suma) * 100));
  // que sumen 100
  const dif = 100 - pct.reduce((a, b) => a + b, 0);
  const mayor = pct.indexOf(Math.max(...pct));
  pct[mayor] += dif;
  return pct;
}

/** El consejo de Husai: acierta más en las gradas fáciles. */
function consejoDeHusai(p: FilaPartida, q: FilaSabio): { quien: string; opcion: number; dice: string } {
  const opciones = lista<string>(p.opciones);
  const quitadas = new Set(lista<number>(p.quitadas));
  const n = p.grada + 1;
  const prob = Math.max(0.5, 0.96 - (n - 1) * 0.033);
  const correcta = opciones.indexOf(q.correcta);
  const otras = opciones.map((_, i) => i).filter((i) => i !== correcta && !quitadas.has(i));
  const acierta = Math.random() < prob || !otras.length;
  const opcion = acierta ? correcta : otras[Math.floor(Math.random() * otras.length)];
  const letra = "ABCD"[opcion];
  const dice =
    n <= 5
      ? `Estoy seguro: es la ${letra}, «${opciones[opcion]}».`
      : n <= 10
        ? `Creo que es la ${letra}, «${opciones[opcion]}». Casi seguro.`
        : `No estoy seguro… pero yo diría la ${letra}, «${opciones[opcion]}».`;
  return { quien: "Husai, el amigo del rey", opcion, dice };
}

/** La tabla de la semana: la mejor partida de cada persona (empates: quien llegó primero). */
async function tablaSemana(semana: string, yo: number): Promise<{ filas: FilaTabla[]; miPuesto: number | null }> {
  const { rows } = await pool.query(
    `SELECT t.character_id, t.puntos, t.grada, c.name, u.display_name, u.username
       FROM (SELECT DISTINCT ON (p.character_id) p.character_id, p.jugador_id, p.puntos, p.grada, p.finished_at
               FROM game_sabio_partidas p
              WHERE p.semana = $1 AND p.estado <> 'jugando' AND p.puntos > 0
              ORDER BY p.character_id, p.puntos DESC, p.finished_at ASC) t
       JOIN game_characters c ON c.id = t.jugador_id
       JOIN users u ON u.id = c.user_id AND u.is_active IS NOT FALSE
      ORDER BY t.puntos DESC, t.finished_at ASC`,
    [semana],
  );
  const filas = rows.map((r, i) => ({ puesto: i + 1, nombre: nombreDe(r), puntos: Number(r.puntos), grada: Number(r.grada), esYo: Number(r.character_id) === yo }));
  const mio = filas.find((f) => f.esYo);
  return { filas: filas.slice(0, 10), miPuesto: mio ? mio.puesto : null };
}

async function tablaSiempre(yo: number): Promise<FilaTabla[]> {
  const { rows } = await pool.query(
    `SELECT s.character_id, s.total, s.mejor, s.ganadas,
            (SELECT c5.name FROM game_characters c5 WHERE c5.user_id = c.user_id AND c5.game = c.game ORDER BY c5.selected_at DESC NULLS LAST, c5.slot LIMIT 1) AS name,
            u.display_name, u.username
       FROM game_sabio s
       JOIN game_characters c ON c.id = s.character_id
       JOIN users u ON u.id = c.user_id AND u.is_active IS NOT FALSE
      WHERE s.total > 0
      ORDER BY s.total DESC LIMIT 10`,
  );
  return rows.map((r, i) => ({ puesto: i + 1, nombre: nombreDe(r), puntos: Number(r.total), grada: Number(r.mejor), ganadas: Number(r.ganadas), esYo: Number(r.character_id) === yo }));
}

/** Los tres primeros de la semana pasada reciben su gozo la primera vez que vuelven. */
async function premioDeLaSemanaPasada(titular: number): Promise<{ puesto: number; gozo: number } | null> {
  const hoy = new Date(`${semanaClave()}T12:00:00Z`);
  hoy.setUTCDate(hoy.getUTCDate() - 7);
  const pasada = hoy.toISOString().slice(0, 10);
  const { filas } = await tablaSemana(pasada, titular);
  const mio = filas.find((f) => f.esYo && f.puesto <= PREMIO_SEMANA.length);
  if (!mio) return null;
  const gozo = PREMIO_SEMANA[mio.puesto - 1];
  const { rows } = await pool.query(
    `INSERT INTO game_sabio_premios_semana (semana, character_id, puesto, gozo) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING puesto`,
    [pasada, titular, mio.puesto, gozo],
  );
  if (!rows.length) return null;
  await sumarGozo(titular, gozo);
  return { puesto: mio.puesto, gozo };
}

export function registerSabioRoutes(app: Express) {
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

  async function partidaActiva(titular: number): Promise<FilaPartida | null> {
    const { rows } = await pool.query(`SELECT *, ${TIEMPOS} FROM game_sabio_partidas WHERE character_id = $1 AND estado = 'jugando' ORDER BY id DESC LIMIT 1`, [titular]);
    return (rows[0] as FilaPartida) ?? null;
  }

  /** Cierra la partida: suma lo ganado, el gozo (con tope), los premios y el título. */
  async function terminar(p: FilaPartida, estado: FinPartida["estado"], pr: Persona, ultima: FilaSabio | null): Promise<FinPartida> {
    const fila = await filaPersona(pr.titular);
    const antes = tituloDe(fila);
    const grada = estado === "perdio" || estado === "tiempo" ? gradaSegura(p.grada) : p.grada;
    const puntos = PUNTOS_GRADA[grada];
    const usados = lista<Comodin>(p.usados);
    const gano = estado === "gano";
    // gozo con tope por día
    const quiere = GOZO_GRADA[grada];
    const gozo = Math.max(0, Math.min(quiere, GOZO_SABIO_DIA - fila.gozo_hoy));
    const nueva = {
      partidas: fila.partidas + 1,
      mejor: Math.max(fila.mejor, p.grada),
      ganadas: fila.ganadas + (gano ? 1 : 0),
      sin_comodines: fila.sin_comodines + (gano && usados.length === 0 ? 1 : 0),
      racha: p.grada >= 10 ? fila.racha + 1 : 0,
      total: fila.total + puntos,
    };
    // los trajes de los sabios
    const premios: PremioSabio[] = [];
    const tiene = new Set(fila.premios);
    const ganar = (id: string, si: boolean) => {
      const t = TRAJES_SABIOS.find((x) => x.id === id);
      if (t && si && !tiene.has(id)) {
        tiene.add(id);
        premios.push(t);
      }
    };
    ganar("faja-entendidos", nueva.mejor >= 5);
    ganar("manto-prudentes", nueva.mejor >= 10);
    ganar("manto-sabios", nueva.ganadas >= 1);
    ganar("faja-salomon", nueva.sin_comodines >= 1);
    ganar("manto-consejero", nueva.ganadas >= 3);
    ganar("faja-tres-dobleces", nueva.racha >= 3);
    await pool.query(`UPDATE game_sabio_partidas SET estado = $2, puntos = $3, gozo = $4, pregunta = NULL, finished_at = now() WHERE id = $1`, [p.id, estado, puntos, gozo]);
    await pool.query(
      `UPDATE game_sabio SET partidas = $2, mejor = $3, ganadas = $4, sin_comodines = $5, racha = $6, total = $7, premios = $8::jsonb,
              dia = $9, gozo_hoy = $10, entradas_hoy = $11, updated_at = now() WHERE character_id = $1`,
      [pr.titular, nueva.partidas, nueva.mejor, nueva.ganadas, nueva.sin_comodines, nueva.racha, nueva.total, JSON.stringify([...tiene]), diaClave(), fila.gozo_hoy + gozo, fila.entradas_hoy],
    );
    if (premios.length) {
      // al armario de la casa (los mantos y fajas exclusivos de shared/mercado.ts)
      for (const t of premios)
        await pool.query(
          `UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`,
          [pr.titular, t.id],
        );
    }
    if (gozo) await sumarGozo(pr.titular, gozo);
    if (gano) await evento(pr.ch.user_id, `sabio:${p.id}`, "subió las quince gradas de «¿Quién es sabio?» en la casa de la sabiduría");
    const despues = tituloDe(nueva);
    const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [pr.titular]);
    return {
      estado,
      grada,
      puntos,
      gozo,
      topeGozo: fila.gozo_hoy + gozo >= GOZO_SABIO_DIA,
      premios,
      titulo: despues.actual,
      tituloNuevo: despues.actual?.id !== antes.actual?.id,
      correcta: ultima ? ultima.correcta : null,
      explica: ultima ? ultima.explica : null,
      ref: ultima ? ultima.ref : null,
      gozoTotal: Number(g[0]?.gozo || 0),
    };
  }

  /** Una partida que quedó abierta mucho tiempo se cierra con lo que tenía (o con el reloj vencido). */
  async function revisarAbandono(p: FilaPartida, pr: Persona): Promise<FilaPartida | null> {
    if (Number(p.quieto ?? 0) < PARTIDA_ABANDONADA_MIN * 60) return p;
    await terminar(p, p.pregunta ? "tiempo" : "retiro", pr, null);
    return null;
  }

  async function estadoDe(pr: Persona): Promise<SabioEstado> {
    const premioSemana = await premioDeLaSemanaPasada(pr.titular);
    let p = await partidaActiva(pr.titular);
    if (p) p = await revisarAbandono(p, pr);
    const fila = await filaPersona(pr.titular);
    const semana = semanaClave();
    const [sem, siempre] = await Promise.all([tablaSemana(semana, pr.titular), tablaSiempre(pr.titular)]);
    const t = tituloDe(fila);
    const rolloAbierto = fila.mejor >= 10;
    return {
      partida: p ? vista(p, rolloAbierto) : null,
      yo: {
        partidas: fila.partidas,
        mejor: fila.mejor,
        ganadas: fila.ganadas,
        total: fila.total,
        titulo: t.actual,
        siguiente: t.siguiente,
        premios: fila.premios,
        entradasHoy: fila.entradas_hoy,
        gozoHoy: fila.gozo_hoy,
        rolloAbierto,
      },
      semana,
      tablaSemana: sem.filas,
      tablaSiempre: siempre,
      miPuestoSemana: sem.miPuesto,
      premioSemana,
    };
  }

  const responder = (res: Response, fn: () => Promise<unknown>) =>
    fn().catch((err) => {
      console.error("[sabio]", err);
      if (!res.headersSent) res.sendStatus(500);
    });

  app.get("/api/jerusalen/sabio", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await enFila(pr.titular, () => estadoDe(pr)));
    }),
  );

  // Empezar: una entrada de las siete del día (si ya hay una partida abierta, sigue esa).
  app.post("/api/jerusalen/sabio/empezar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const out = await enFila(pr.titular, async () => {
        let p = await partidaActiva(pr.titular);
        if (p) p = await revisarAbandono(p, pr);
        const fila = await filaPersona(pr.titular);
        if (p) return { ok: true as const, partida: vista(p, fila.mejor >= 10) };
        if (fila.entradas_hoy >= ENTRADAS_DIA) return { ok: false as const, message: `Por hoy ya usaste las ${ENTRADAS_DIA} entradas. Mañana la casa de la sabiduría te espera otra vez.` };
        await pool.query(`UPDATE game_sabio SET dia = $2, entradas_hoy = $3, gozo_hoy = $4 WHERE character_id = $1`, [pr.titular, diaClave(), fila.entradas_hoy + 1, fila.gozo_hoy]);
        const { rows } = await pool.query(
          `INSERT INTO game_sabio_partidas (character_id, jugador_id, user_id, semana) VALUES ($1, $2, $3, $4) RETURNING *, ${TIEMPOS}`,
          [pr.titular, pr.ch.id, pr.ch.user_id, semanaClave()],
        );
        return { ok: true as const, partida: vista(rows[0] as FilaPartida, fila.mejor >= 10) };
      });
      if (!out.ok) return res.status(429).json({ message: out.message });
      res.json({ partida: out.partida });
    }),
  );

  // La pregunta de la grada que sigue: el reloj empieza ahora (el texto no llega antes).
  app.post("/api/jerusalen/sabio/siguiente", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const out = await enFila(pr.titular, async () => {
        const p = await partidaActiva(pr.titular);
        if (!p) return { error: 404, message: "No tienes una partida abierta." };
        const fila = await filaPersona(pr.titular);
        if (p.pregunta) return { partida: vista(p, fila.mejor >= 10) };
        const n = p.grada + 1;
        if (n > GRADAS) return { error: 409, message: "Ya subiste todas las gradas." };
        const { q, vistas } = elegirPregunta(n, fila.vistas);
        const opciones = mezclar([q.correcta, ...q.falsas]);
        await pool.query(`UPDATE game_sabio SET vistas = $2::jsonb WHERE character_id = $1`, [pr.titular, JSON.stringify(vistas)]);
        const { rows } = await pool.query(
          `UPDATE game_sabio_partidas SET pregunta = $2, opciones = $3::jsonb, quitadas = '[]'::jsonb, servida_at = now(), extra = 0, ancianos = NULL, amigo = NULL
            WHERE id = $1 RETURNING *, ${TIEMPOS}`,
          [p.id, q.id, JSON.stringify(opciones)],
        );
        return { partida: vista(rows[0] as FilaPartida, fila.mejor >= 10) };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.json(out);
    }),
  );

  // Responder (la última palabra): el servidor corrige y mira el reloj.
  app.post("/api/jerusalen/sabio/responder", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const opcion = typeof req.body?.opcion === "string" ? normal(req.body.opcion) : "";
      const out = await enFila(pr.titular, async (): Promise<RespuestaSabio | { error: number; message: string }> => {
        const p = await partidaActiva(pr.titular);
        if (!p || !p.pregunta) return { error: 409, message: "No hay una pregunta a la vista." };
        const q = PREGUNTA.get(p.pregunta)!;
        const opciones = lista<string>(p.opciones);
        const n = p.grada + 1;
        const fila = await filaPersona(pr.titular);
        const rolloAbierto = fila.mejor >= 10;
        if (Number(p.pasados ?? 0) > segundosDe(p, n) + GRACIA_S) {
          const fin = await terminar(p, "tiempo", pr, q);
          return { correcta: false, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin };
        }
        if (!opciones.includes(opcion) || lista<number>(p.quitadas).includes(opciones.indexOf(opcion))) return { error: 400, message: "Esa respuesta no está entre las opciones." };
        // lo que responde el pueblo (para el comodín de los ancianos)
        await pool.query(
          `INSERT INTO game_sabio_respuestas (pregunta, opcion, n) VALUES ($1, $2, 1) ON CONFLICT (pregunta, opcion) DO UPDATE SET n = game_sabio_respuestas.n + 1`,
          [q.id, opcion],
        );
        if (opcion !== q.correcta) {
          const fin = await terminar(p, "perdio", pr, q);
          return { correcta: false, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin };
        }
        const grada = p.grada + 1;
        const { rows } = await pool.query(
          `UPDATE game_sabio_partidas SET grada = $2, puntos = $3, pregunta = NULL, opciones = NULL, quitadas = '[]'::jsonb, servida_at = now(), extra = 0, ancianos = NULL, amigo = NULL
            WHERE id = $1 RETURNING *, ${TIEMPOS}`,
          [p.id, grada, PUNTOS_GRADA[grada]],
        );
        const nueva = rows[0] as FilaPartida;
        if (grada >= GRADAS) {
          const fin = await terminar(nueva, "gano", pr, null);
          return { correcta: true, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin };
        }
        return { correcta: true, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: vista(nueva, rolloAbierto || grada >= 10), fin: null };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json(out);
    }),
  );

  // Retirarse con lo ganado (antes de responder la pregunta que está a la vista).
  app.post("/api/jerusalen/sabio/retirarse", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const out = await enFila(pr.titular, async () => {
        const p = await partidaActiva(pr.titular);
        if (!p) return { error: 409, message: "No tienes una partida abierta." };
        const q = p.pregunta ? PREGUNTA.get(p.pregunta) ?? null : null;
        return { fin: await terminar(p, "retiro", pr, q) };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.json(out);
    }),
  );

  // Un comodín (uno de cada uno por partida): da unos segundos más.
  app.post("/api/jerusalen/sabio/comodin", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const tipo = String(req.body?.tipo ?? "") as Comodin;
      if (!["aventador", "ancianos", "amigo", "rollo"].includes(tipo)) return res.status(400).json({ message: "Ese comodín no existe." });
      const out = await enFila(pr.titular, async () => {
        const p = await partidaActiva(pr.titular);
        if (!p || !p.pregunta) return { error: 409, message: "No hay una pregunta a la vista." };
        const usados = lista<Comodin>(p.usados);
        if (usados.includes(tipo)) return { error: 409, message: "Ya usaste ese comodín en esta partida." };
        const fila = await filaPersona(pr.titular);
        const rolloAbierto = fila.mejor >= 10;
        if (tipo === "rollo" && !rolloAbierto) return { error: 403, message: "«Otro rollo» se abre cuando llegas alguna vez a la grada 10." };
        const n = p.grada + 1;
        if (restantes(p, n) <= 0) return { error: 409, message: "Se acabó el tiempo." };
        const q = PREGUNTA.get(p.pregunta)!;
        const opciones = lista<string>(p.opciones);
        const set: string[] = [`usados = $2::jsonb`, `extra = extra + ${SEGUNDOS_COMODIN}`];
        const vals: unknown[] = [p.id, JSON.stringify([...usados, tipo])];
        if (tipo === "aventador") {
          const malas = mezclar(opciones.map((_, i) => i).filter((i) => opciones[i] !== q.correcta)).slice(0, 2);
          set.push(`quitadas = $3::jsonb`);
          vals.push(JSON.stringify(malas.sort()));
        } else if (tipo === "ancianos") {
          set.push(`ancianos = $3::jsonb`);
          vals.push(JSON.stringify(await puebloDe(p, q)));
        } else if (tipo === "amigo") {
          set.push(`amigo = $3::jsonb`);
          vals.push(JSON.stringify(consejoDeHusai(p, q)));
        } else {
          // otro rollo: otra pregunta de la misma grada, con su reloj completo
          const { q: otra, vistas } = elegirPregunta(n, fila.vistas, [q.id]);
          await pool.query(`UPDATE game_sabio SET vistas = $2::jsonb WHERE character_id = $1`, [pr.titular, JSON.stringify(vistas)]);
          set.splice(1, 1, `extra = 0`);
          set.push(`pregunta = $3`, `opciones = $4::jsonb`, `quitadas = '[]'::jsonb`, `servida_at = now()`, `ancianos = NULL`, `amigo = NULL`);
          vals.push(otra.id, JSON.stringify(mezclar([otra.correcta, ...otra.falsas])));
        }
        const { rows } = await pool.query(`UPDATE game_sabio_partidas SET ${set.join(", ")} WHERE id = $1 RETURNING *, ${TIEMPOS}`, vals);
        return { partida: vista(rows[0] as FilaPartida, rolloAbierto) };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.json(out);
    }),
  );
}

/** Para los logros en línea: cuántas veces subió las quince gradas la persona. */
export async function ganadasSabio(titular: number): Promise<number> {
  const { rows } = await pool.query(`SELECT ganadas FROM game_sabio WHERE character_id = $1`, [titular]);
  return Number(rows[0]?.ganadas || 0);
}

