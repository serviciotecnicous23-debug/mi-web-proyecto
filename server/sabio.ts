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
import { casasDelBarrio } from "./ciudad";
import { avisarA, presenciaDe } from "./ciudad-red";
import { dondeEsta } from "./barrio";
import { sumarALaCopa } from "./barrio-juntos";
import { aplaudir, duenioDe, marcarMirando, publicoDe, registrarDuenio } from "./sabio-publico";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { caminoDe, type Camino } from "@shared/caminos";
import {
  CONSEJOS_FAJA, DUDA_CADA, DUDA_S, ENTRADAS_DIA, GOZO_CONSEJO, GOZO_GRADA, GOZO_SABIO_DIA, GRADAS, LLAMADA_S, MIS_PARTIDAS, PREMIO_SEMANA, PUNTOS_GRADA, SEGUNDOS_COMODIN,
  TABLA_PRIMEROS, TRAJES_SABIOS, fraseDeDuda, gradaEnQueQuedo, gradaSegura, segundosGrada, tardaMucho, textoDeConsejo, tituloDe, tocaDuda,
  type AmigoPosible, type Comodin, type Confianza, type ConsejoAmigo, type DudaEstado, type EnVivo, type FilaTabla, type FinPartida, type MirarVista, type PartidaEnTabla,
  type PartidaVista, type PremioSabio, type Relacion, type RespuestaSabio, type SabioEstado, type TablaDe, type TablaVista, type UltimaRespuesta,
} from "@shared/sabio";
import { anotarCamino } from "./camino-dia";
import type { NocheEnVivo } from "@shared/sabio-noche";

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
);
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "consejos" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "consejos_buenos" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "llamadas" boolean NOT NULL DEFAULT true;
ALTER TABLE "game_sabio_partidas" ADD COLUMN IF NOT EXISTS "llamada" jsonb;
ALTER TABLE "game_sabio_partidas" ADD COLUMN IF NOT EXISTS "ultima" jsonb;
CREATE TABLE IF NOT EXISTS "game_sabio_duelos" (
  "id" serial PRIMARY KEY,
  "a_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "b_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "a_user" integer NOT NULL,
  "b_user" integer NOT NULL,
  "a_jugador" integer NOT NULL,
  "b_jugador" integer NOT NULL,
  "estado" text NOT NULL DEFAULT 'invitado',
  "ronda" integer NOT NULL DEFAULT 0,
  "preguntas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "opciones" jsonb,
  "servida" bigint,
  "revelada" bigint,
  "resp" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "historial" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "pa" integer NOT NULL DEFAULT 0,
  "pb" integer NOT NULL DEFAULT 0,
  "creado" bigint NOT NULL,
  "ganador" integer,
  "abandono" integer,
  "gozo_a" integer NOT NULL DEFAULT 0,
  "gozo_b" integer NOT NULL DEFAULT 0,
  "premio_a" text,
  "premio_b" text,
  "semana" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "finished_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_game_sabio_duelos_a" ON "game_sabio_duelos" ("a_id", "estado");
CREATE INDEX IF NOT EXISTS "idx_game_sabio_duelos_b" ON "game_sabio_duelos" ("b_id", "estado");
CREATE INDEX IF NOT EXISTS "idx_game_sabio_duelos_semana" ON "game_sabio_duelos" ("semana", "estado");
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "duelos" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "duelos_ganados" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "duelos_dia" text;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "duelos_hoy" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio_partidas" ADD COLUMN IF NOT EXISTS "duda" jsonb;
CREATE INDEX IF NOT EXISTS "idx_game_sabio_partidas_fin" ON "game_sabio_partidas" ("finished_at");
CREATE TABLE IF NOT EXISTS "game_sabio_noches" (
  "id" serial PRIMARY KEY,
  "codigo" text NOT NULL,
  "anfitrion" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "anfitrion_user" integer NOT NULL,
  "estado" text NOT NULL DEFAULT 'sala',
  "jugadores" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "invitados" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "quitados" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "ronda" integer NOT NULL DEFAULT 0,
  "preguntas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "opciones" jsonb,
  "servida" bigint,
  "revelada" bigint,
  "historial" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "creado" bigint NOT NULL,
  "semana" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "finished_at" timestamp
);
CREATE INDEX IF NOT EXISTS "idx_game_sabio_noches_estado" ON "game_sabio_noches" ("estado", "codigo");
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "noches" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "noches_ganadas" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "noches_dia" text;
ALTER TABLE "game_sabio" ADD COLUMN IF NOT EXISTS "noches_hoy" integer NOT NULL DEFAULT 0;
ALTER TABLE "game_sabio_duelos" ADD COLUMN IF NOT EXISTS "bot" text;
ALTER TABLE "game_sabio_duelos" ALTER COLUMN "b_id" DROP NOT NULL;`;

export const PREGUNTA = new Map(BANCO_SABIO.map((q) => [q.id, q]));
/** El nombre con que se ve una cuenta (su personaje), guardado un rato: el público pide la partida cada segundo y medio. */
const nombresCuenta = new Map<number, { n: string; at: number }>();
async function nombreDeCuenta(cuenta: number): Promise<string> {
  const c = nombresCuenta.get(cuenta);
  if (c && Date.now() - c.at < 5 * 60_000) return c.n;
  const ch = await personajeDe(cuenta);
  const n = ch ? nombreDe(ch) : "";
  if (nombresCuenta.size > 2000) nombresCuenta.clear();
  nombresCuenta.set(cuenta, { n, at: Date.now() });
  return n;
}

export const POR_GRADA = new Map<number, FilaSabio[]>();
for (const q of BANCO_SABIO) POR_GRADA.set(q.n, [...(POR_GRADA.get(q.n) ?? []), q]);

/**
 * Los segundos que pasaron se calculan en la base: las horas se guardan sin zona horaria y
 * compararlas en JavaScript las corre unas horas.
 */
const tiemposDe = (t = "") =>
  `EXTRACT(EPOCH FROM (now() - ${t}servida_at))::float AS pasados, EXTRACT(EPOCH FROM (now() - COALESCE(${t}servida_at, ${t}created_at)))::float AS quieto`;
const TIEMPOS = tiemposDe();

/** Unos segundos de gracia por la red (la respuesta tarda en llegar). */
const GRACIA_S = 3;
/** Una partida sin moverse por más de esto se cierra sola (con lo que tenía). */
const PARTIDA_ABANDONADA_MIN = 30;
/** Para la tabla de lo que responde el pueblo hacen falta al menos estas respuestas. */
const MINIMO_PUEBLO = 12;

export const lista = <T = string>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
export function mezclar<T>(arr: T[]): T[] {
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
  /** La llamada a un amigo o vecino que está en curso (Llamada). */
  llamada: unknown;
  /** La última pregunta que se respondió (UltimaRespuesta, para el público). */
  ultima: unknown;
  /** Cómo va la escena de la duda con Etán (DudaEstado). */
  duda: unknown;
  puntos: number;
  semana: string;
  created_at: Date | string;
  /** Segundos desde que se mostró la pregunta y desde el último movimiento (calculados en la base). */
  pasados: number | null;
  quieto: number | null;
};
export type FilaSabioPersona = {
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
  consejos: number;
  consejos_buenos: number;
  llamadas: boolean;
  duelos: number;
  duelos_ganados: number;
  /** Duelos empezados hoy (tienen su propio tope por día). */
  duelos_hoy: number;
  /** La noche de los sabios: las jugadas, las ganadas y las empezadas hoy (shared/sabio-noche.ts). */
  noches: number;
  noches_ganadas: number;
  noches_hoy: number;
};

/**
 * La llamada a un amigo o vecino: a quién (su personaje, su titular y su cuenta), hasta cuándo puede contestar
 * (hora del servidor, en milisegundos) y para qué pregunta.
 */
type Llamada = { a: number; t: number; u: number; nombre: string; camino: Camino; relacion: Relacion; hasta: number; q: string };
/** El consejo guardado: lo que se ve más quién lo dio (para premiarlo cuando se sepa la respuesta). */
type ConsejoGuardado = ConsejoAmigo & { t?: number; u?: number };

const llamadaDe = (p: FilaPartida): Llamada | null => (p.llamada && typeof p.llamada === "object" ? (p.llamada as Llamada) : null);
const consejoDe = (p: FilaPartida): ConsejoGuardado | null => (p.amigo && typeof p.amigo === "object" ? (p.amigo as ConsejoGuardado) : null);
const LETRAS = ["A", "B", "C", "D"];

export async function filaPersona(titular: number): Promise<FilaSabioPersona> {
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
    consejos: Number(r.consejos || 0),
    consejos_buenos: Number(r.consejos_buenos || 0),
    llamadas: r.llamadas !== false,
    duelos: Number(r.duelos || 0),
    duelos_ganados: Number(r.duelos_ganados || 0),
    duelos_hoy: r.duelos_dia === hoy ? Number(r.duelos_hoy || 0) : 0,
    noches: Number(r.noches || 0),
    noches_ganadas: Number(r.noches_ganadas || 0),
    noches_hoy: r.noches_dia === hoy ? Number(r.noches_hoy || 0) : 0,
  };
}

const segundosDe = (p: FilaPartida, n: number) => segundosGrada(n) + Number(p.extra || 0);
function restantes(p: FilaPartida, n: number): number {
  if (!p.servida_at || p.pasados == null) return segundosGrada(n);
  return Math.max(0, Math.ceil(segundosDe(p, n) - Number(p.pasados)));
}

/** Cómo va la escena de la duda con Etán en la partida (null si todavía no hubo pregunta). */
const dudaDe = (p: FilaPartida): DudaEstado | null => (p.duda && typeof p.duda === "object" && !Array.isArray(p.duda) ? (p.duda as DudaEstado) : null);
const azarCada = () => DUDA_CADA[Math.floor(Math.random() * DUDA_CADA.length)];
/**
 * La escena de la duda para la pregunta `n` que se va a mostrar: si toca (cada 2 o 3 preguntas, en las seguras y
 * desde la 11). Se decide aquí, antes de que se elija ninguna respuesta: nunca depende de la respuesta.
 */
function planDeDuda(antes: DudaEstado | null, n: number): DudaEstado {
  const d = antes ?? { cada: azarCada(), ultima: 0, plan: false, usada: false, frases: [] };
  return { ...d, plan: tocaDuda(n, d.ultima, d.cada), usada: false };
}

function vista(p: FilaPartida, rolloAbierto: boolean): PartidaVista {
  const q = p.pregunta ? PREGUNTA.get(p.pregunta) : undefined;
  const n = p.grada + 1;
  const d = dudaDe(p);
  return {
    id: Number(p.id),
    grada: Number(p.grada),
    puntos: PUNTOS_GRADA[p.grada],
    seguro: PUNTOS_GRADA[gradaSegura(p.grada)],
    pregunta: q
      ? {
          n,
          texto: q.pregunta,
          opciones: lista<string>(p.opciones),
          quitadas: lista<number>(p.quitadas),
          segundos: segundosDe(p, n),
          restantes: restantes(p, n),
          duda: d?.usada ? "hecha" : d?.plan ? "toca" : "puede",
        }
      : null,
    usados: lista<Comodin>(p.usados),
    rolloAbierto,
    ancianos: Array.isArray(p.ancianos) ? (p.ancianos as number[]) : null,
    amigo: consejoPublico(p),
    llamada: llamadaPublica(p),
  };
}

/** El consejo tal como se ve (sin la cuenta de quien lo dio). */
function consejoPublico(p: FilaPartida): ConsejoAmigo | null {
  const c = consejoDe(p);
  if (!c) return null;
  return { quien: c.quien, opcion: Number(c.opcion), dice: c.dice, ...(c.vecino ? { vecino: c.vecino } : {}) };
}
function llamadaPublica(p: FilaPartida): PartidaVista["llamada"] {
  const l = llamadaDe(p);
  return l ? { nombre: l.nombre, restantes: Math.max(0, Math.ceil((l.hasta - Date.now()) / 1000)) } : null;
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

/** El consejo de Husai: acierta más en las gradas fáciles (`antes`: por qué contesta él, si se llamó a otro). */
function consejoDeHusai(p: FilaPartida, q: FilaSabio, antes = ""): ConsejoAmigo {
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
  return { quien: "Husai, el amigo del rey", opcion, dice: antes ? `${antes} ${dice}` : dice };
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

// ================================================================ las tablas por partida
const ZONA_TEXAS = "America/Chicago";
/**
 * Cuánto duró una partida, en segundos, calculado en la base (las horas se guardan sin zona horaria). Una partida que
 * se cerró sola por abandono no cuenta las horas en que nadie jugó: como mucho, 125 s después de su último movimiento
 * (lo que dura la pregunta más larga con sus comodines).
 */
const DURACION = (t = "p.") =>
  `EXTRACT(EPOCH FROM (LEAST(${t}finished_at, COALESCE(${t}servida_at, ${t}created_at) + interval '125 seconds') - ${t}created_at))::float`;
/** Cuándo terminó, en milisegundos (la hora sin zona es la de la base). */
const FIN_MS = (t = "p.") => `(EXTRACT(EPOCH FROM (${t}finished_at AT TIME ZONE current_setting('TimeZone'))) * 1000)::float8`;
/** Desde y hasta del día de Texas `$n` (texto AAAA-MM-DD), en la hora de la base. */
const DIA_DESDE = (n: number) => `((($${n}::date)::timestamp AT TIME ZONE '${ZONA_TEXAS}') AT TIME ZONE current_setting('TimeZone'))`;
const DIA_HASTA = (n: number) => `(((($${n}::date) + 1)::timestamp AT TIME ZONE '${ZONA_TEXAS}') AT TIME ZONE current_setting('TimeZone'))`;
const ORDEN_TABLA = `ORDER BY t.puntos DESC, t.segundos ASC, t.fin ASC, t.id ASC`;

type FilaTablaBD = {
  id: number;
  character_id: number;
  jugador_id: number;
  estado: string;
  grada: number;
  puntos: number;
  usados: unknown;
  segundos: number;
  fin: number;
  puesto: number | string | null;
  name: string | null;
  path: string | null;
  display_name: string | null;
  username: string | null;
};

function filaDeTabla(r: FilaTablaBD, yo: number, puesto: number | null): PartidaEnTabla {
  const estado = (["perdio", "retiro", "gano", "tiempo"].includes(r.estado) ? r.estado : "retiro") as FinPartida["estado"];
  const grada = Number(r.grada);
  return {
    id: Number(r.id),
    puesto,
    pid: Number(r.jugador_id),
    nombre: nombreDe(r),
    camino: caminoDe(r.path),
    grada,
    quedo: gradaEnQueQuedo(estado, grada),
    puntos: Number(r.puntos),
    segundos: Math.max(0, Math.round(Number(r.segundos) || 0)),
    usados: lista<Comodin>(r.usados),
    estado,
    esYo: Number(r.character_id) === yo,
    at: Math.round(Number(r.fin) || 0),
  };
}

/**
 * Hoy, la semana o siempre: cada partida terminada con puntos, en orden (más puntos; si empatan, menos tiempo). Trae
 * las diez primeras y, si la mejor de quien pregunta está más abajo, también esa (con su puesto).
 */
async function tablaPartidas(de: Exclude<TablaDe, "mias">, titular: number): Promise<TablaVista> {
  const dia = diaClave();
  const semana = semanaClave();
  const filtro = de === "hoy" ? `AND p.finished_at >= ${DIA_DESDE(2)} AND p.finished_at < ${DIA_HASTA(2)}` : de === "semana" ? `AND p.semana = $2` : "";
  const valores: unknown[] = de === "siempre" ? [titular, TABLA_PRIMEROS] : [titular, de === "hoy" ? dia : semana, TABLA_PRIMEROS];
  const lim = `$${valores.length}`;
  const { rows } = await pool.query(
    `WITH t AS (
       SELECT p.id, p.character_id, p.jugador_id, p.estado, p.grada, p.puntos, p.usados, ${DURACION()} AS segundos, ${FIN_MS()} AS fin
         FROM game_sabio_partidas p
         JOIN users u ON u.id = p.user_id AND u.is_active IS NOT FALSE
        WHERE p.estado <> 'jugando' AND p.finished_at IS NOT NULL AND p.puntos > 0 ${filtro}
     ), r AS (
       SELECT t.*, ROW_NUMBER() OVER (${ORDEN_TABLA}) AS puesto, count(*) OVER () AS total FROM t
     ), yo AS (SELECT MIN(puesto) AS p FROM r WHERE r.character_id = $1)
     SELECT r.*, (SELECT p FROM yo) AS mio, c.name, c.path, u.display_name, u.username
       FROM r
       JOIN game_characters c ON c.id = r.jugador_id
       JOIN users u ON u.id = c.user_id
      WHERE r.puesto <= ${lim} OR r.puesto = (SELECT p FROM yo)
      ORDER BY r.puesto`,
    valores,
  );
  const todas = rows.map((r) => filaDeTabla(r as FilaTablaBD, titular, Number(r.puesto)));
  const miPuesto = rows[0]?.mio != null ? Number(rows[0].mio) : null;
  const filas = todas.filter((f) => (f.puesto ?? 0) <= TABLA_PRIMEROS);
  const mia = miPuesto !== null && miPuesto > TABLA_PRIMEROS ? todas.find((f) => f.puesto === miPuesto) ?? null : null;
  return { de, filas, mia, total: rows[0] ? Number(rows[0].total) : 0, miPuesto, dia, semana };
}

/** Mis partidas: las últimas que jugué (la más nueva primero), cada una con el puesto que tuvo en la tabla de su semana. */
async function misPartidas(titular: number): Promise<TablaVista> {
  const { rows } = await pool.query(
    `WITH mias AS (
       SELECT p.id, p.character_id, p.jugador_id, p.estado, p.grada, p.puntos, p.usados, p.semana, ${DURACION()} AS segundos, ${FIN_MS()} AS fin
         FROM game_sabio_partidas p
        WHERE p.character_id = $1 AND p.estado <> 'jugando' AND p.finished_at IS NOT NULL
        ORDER BY p.id DESC LIMIT $2
     ), rk AS (
       SELECT t.id, ROW_NUMBER() OVER (PARTITION BY t.semana ${ORDEN_TABLA}) AS puesto
         FROM (SELECT p.id, p.semana, p.puntos, ${DURACION()} AS segundos, ${FIN_MS()} AS fin
                 FROM game_sabio_partidas p
                 JOIN users u ON u.id = p.user_id AND u.is_active IS NOT FALSE
                WHERE p.semana IN (SELECT DISTINCT semana FROM mias) AND p.estado <> 'jugando' AND p.finished_at IS NOT NULL AND p.puntos > 0) t
     )
     SELECT m.*, rk.puesto, c.name, c.path, u.display_name, u.username,
            (SELECT count(*) FROM game_sabio_partidas x WHERE x.character_id = $1 AND x.estado <> 'jugando') AS total
       FROM mias m
       LEFT JOIN rk ON rk.id = m.id
       JOIN game_characters c ON c.id = m.jugador_id
       JOIN users u ON u.id = c.user_id
      ORDER BY m.id DESC`,
    [titular, MIS_PARTIDAS],
  );
  const filas = rows.map((r) => filaDeTabla(r as FilaTablaBD, titular, r.puesto != null ? Number(r.puesto) : null));
  return { de: "mias", filas, mia: null, total: rows[0] ? Number(rows[0].total) : 0, miPuesto: null, dia: diaClave(), semana: semanaClave() };
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
  await sumarGozo(titular, gozo, "sabio");
  return { puesto: mio.puesto, gozo };
}

// ================================================================ con amigos: a quién llamar, el consejo y el público
export type Relaciones = { vecinos: Set<number>; amigos: Set<number>; bloqueados: Set<number> };

/** Los vecinos de su barrio, sus amigos de la web y los bloqueos (en los dos sentidos) de una persona. */
export async function relacionesDe(titular: number, cuenta: number): Promise<Relaciones> {
  const { rows: h } = await pool.query(`SELECT barrio FROM game_houses WHERE character_id = $1`, [titular]);
  const vecinos = new Set<number>();
  if (h[0]) for (const c of await casasDelBarrio(Number(h[0].barrio))) vecinos.add(c.userId);
  vecinos.delete(cuenta);
  const { rows: f } = await pool.query(
    `SELECT CASE WHEN requester_id = $1 THEN addressee_id ELSE requester_id END AS otro
       FROM friendships WHERE status = 'accepted' AND (requester_id = $1 OR addressee_id = $1)`,
    [cuenta],
  );
  const { rows: b } = await pool.query(`SELECT blocker_id, blocked_id FROM user_blocks WHERE blocker_id = $1 OR blocked_id = $1`, [cuenta]);
  return {
    vecinos,
    amigos: new Set(f.map((r) => Number(r.otro)).filter((u) => u !== cuenta)),
    bloqueados: new Set(b.map((x) => (Number(x.blocker_id) === cuenta ? Number(x.blocked_id) : Number(x.blocker_id)))),
  };
}

const relacionCon = (r: Relaciones, u: number): Relacion | null =>
  r.vecinos.has(u) && r.amigos.has(u) ? "ambos" : r.amigos.has(u) ? "amigo" : r.vecinos.has(u) ? "vecino" : null;
const ORDEN_RELACION: Record<Relacion, number> = { ambos: 0, amigo: 1, vecino: 2 };

/**
 * A quién se le puede pedir consejo (o retar a un duelo) ahora: amigos y vecinos que están en la ciudad o en el
 * templo, sin bloqueos, que reciben llamadas y retos, y que no están jugando, en un duelo ni contestando otra llamada.
 */
export async function amigosPosibles(titular: number, cuenta: number): Promise<(AmigoPosible & { t: number; u: number })[]> {
  const r = await relacionesDe(titular, cuenta);
  const cuentas = [...new Set([...r.vecinos, ...r.amigos])].filter((u) => u !== cuenta && !r.bloqueados.has(u));
  if (!cuentas.length) return [];
  const enLinea = presenciaDe(cuentas);
  const ids = [...enLinea.keys()];
  if (!ids.length) return [];
  const { rows } = await pool.query(
    `SELECT t.user_id, t.titular, COALESCE(s.llamadas, true) AS llamadas,
            (EXISTS (SELECT 1 FROM game_sabio_partidas p WHERE p.character_id = t.titular AND p.estado = 'jugando'
                      AND COALESCE(p.servida_at, p.created_at) > now() - interval '5 minutes')
             OR EXISTS (SELECT 1 FROM game_sabio_duelos d WHERE (d.a_id = t.titular OR d.b_id = t.titular) AND d.estado IN ('invitado', 'jugando')
                      AND d.created_at > now() - interval '30 minutes')
             OR EXISTS (SELECT 1 FROM game_sabio_noches n WHERE n.estado IN ('sala', 'jugando') AND n.created_at > now() - interval '2 hours'
                      AND n.jugadores @> jsonb_build_array(jsonb_build_object('t', t.titular, 'fuera', false)))) AS jugando
       FROM (SELECT user_id, MIN(id) AS titular FROM game_characters WHERE user_id = ANY($1::int[]) AND game = $2 GROUP BY user_id) t
       LEFT JOIN game_sabio s ON s.character_id = t.titular`,
    [ids, JERUSALEN_JUEGO],
  );
  // a quién ya están llamando
  const { rows: ll } = await pool.query(`SELECT llamada FROM game_sabio_partidas WHERE estado = 'jugando' AND llamada IS NOT NULL`);
  const ahora = Date.now();
  const ocupados = new Set<number>();
  for (const x of ll) {
    const l = x.llamada as Llamada | null;
    if (l && Number(l.hasta) > ahora) ocupados.add(Number(l.u));
  }
  const out: (AmigoPosible & { t: number; u: number })[] = [];
  for (const row of rows) {
    const u = Number(row.user_id);
    const p = enLinea.get(u);
    const relacion = relacionCon(r, u);
    if (!p || !relacion || row.llamadas === false || row.jugando || ocupados.has(u)) continue;
    out.push({ personajeId: p.info.id, nombre: p.info.nombre, camino: caminoDe(p.info.camino), donde: dondeEsta(p.canal, p.a), relacion, t: Number(row.titular), u });
  }
  return out.sort((a, b) => ORDEN_RELACION[a.relacion] - ORDEN_RELACION[b.relacion] || a.nombre.localeCompare(b.nombre, "es")).slice(0, 30);
}

/**
 * Las noches de los sabios que se juegan ahora, sin las de los bloqueos. Las pone server/sabio-noche.ts al registrar
 * sus rutas (así los dos archivos no se importan en círculo).
 */
let nochesEnVivo: ((cuenta: number, bloqueados: Set<number>) => Promise<NocheEnVivo[]>) | null = null;
export function ponerNochesEnVivo(f: (cuenta: number, bloqueados: Set<number>) => Promise<NocheEnVivo[]>) {
  nochesEnVivo = f;
}
const nochesPara = (cuenta: number, r: Relaciones) => (nochesEnVivo ? nochesEnVivo(cuenta, r.bloqueados) : Promise.resolve([] as NocheEnVivo[]));

/** Las partidas que se juegan ahora (con movimiento en los últimos 3 minutos), sin las de los bloqueos. */
async function enVivoPara(cuenta: number, r: Relaciones): Promise<EnVivo[]> {
  const { rows } = await pool.query(
    `SELECT p.id, p.grada, p.user_id, c.name, c.path, u.display_name, u.username
       FROM game_sabio_partidas p
       JOIN game_characters c ON c.id = p.jugador_id
       JOIN users u ON u.id = p.user_id AND u.is_active IS NOT FALSE
      WHERE p.estado = 'jugando' AND COALESCE(p.servida_at, p.created_at) > now() - interval '3 minutes' AND p.user_id <> $1
      ORDER BY p.grada DESC, p.id DESC LIMIT 40`,
    [cuenta],
  );
  return rows
    .filter((x) => !r.bloqueados.has(Number(x.user_id)))
    .map((x) => {
      const grada = Number(x.grada);
      return {
        id: Number(x.id),
        nombre: nombreDe(x),
        camino: caminoDe(x.path),
        grada,
        puntos: PUNTOS_GRADA[grada],
        mirando: publicoDe(Number(x.id)).mirando,
        relacion: relacionCon(r, Number(x.user_id)),
      } satisfies EnVivo;
    })
    .sort((a, b) => Number(!!b.relacion) - Number(!!a.relacion) || b.grada - a.grada)
    .slice(0, 12);
}

/** Lo que ve el público de una partida (fila con el nombre y el camino de quien juega). */
function mirarVista(r: FilaPartida & { name?: string | null; display_name?: string | null; username?: string | null; path?: string | null }): MirarVista {
  const jugando = r.estado === "jugando";
  const v = vista(r, false);
  const estado = (["jugando", "perdio", "retiro", "gano", "tiempo"].includes(r.estado) ? r.estado : "retiro") as MirarVista["estado"];
  return {
    id: v.id,
    nombre: nombreDe(r),
    camino: caminoDe(r.path),
    estado,
    grada: jugando || estado === "retiro" || estado === "gano" ? Number(r.grada) : gradaSegura(Number(r.grada)),
    puntos: jugando ? v.puntos : Number(r.puntos),
    seguro: v.seguro,
    pregunta: jugando ? v.pregunta : null,
    usados: v.usados,
    ancianos: jugando ? v.ancianos : null,
    amigo: jugando ? v.amigo : null,
    llamada: jugando ? v.llamada : null,
    ultima: r.ultima && typeof r.ultima === "object" ? (r.ultima as UltimaRespuesta) : null,
    publico: publicoDe(v.id),
  };
}

/** Quien dio un consejo: se le cuenta (y se crea su fila del concurso si no jugó nunca). */
async function contarConsejo(t: number): Promise<void> {
  await enFila(t, async () => {
    await filaPersona(t);
    await pool.query(`UPDATE game_sabio SET consejos = consejos + 1, updated_at = now() WHERE character_id = $1`, [t]);
  });
}

/**
 * Cuando se sabe la respuesta de una pregunta en que aconsejó un amigo o vecino: si acertó, gana gozo (dentro del
 * tope del concurso) y cuenta para la faja del buen consejero. Se le avisa cómo le fue a quien lo llamó.
 */
async function premiarConsejo(c: { t: number; u: number; bien: boolean; de: string }): Promise<void> {
  await enFila(c.t, async () => {
    const fila = await filaPersona(c.t);
    let gozo = 0;
    let premio: string | null = null;
    if (c.bien) {
      gozo = Math.max(0, Math.min(GOZO_CONSEJO, GOZO_SABIO_DIA - fila.gozo_hoy));
      const buenos = fila.consejos_buenos + 1;
      const premios = new Set(fila.premios);
      if (buenos >= CONSEJOS_FAJA && !premios.has("faja-consejero")) {
        premios.add("faja-consejero");
        premio = TRAJES_SABIOS.find((x) => x.id === "faja-consejero")?.nombre ?? null;
        await pool.query(
          `UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`,
          [c.t, "faja-consejero"],
        );
      }
      await pool.query(
        `UPDATE game_sabio SET consejos_buenos = $2, dia = $3, gozo_hoy = $4, entradas_hoy = $5, premios = $6::jsonb, updated_at = now() WHERE character_id = $1`,
        [c.t, buenos, diaClave(), fila.gozo_hoy + gozo, fila.entradas_hoy, JSON.stringify([...premios])],
      );
      if (gozo) await sumarGozo(c.t, gozo, "sabio");
      await sumarALaCopa(c.t, "consejo");
    }
    const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [c.t]);
    avisarA(c.u, { t: "sabio-gracias", de: c.de, bien: c.bien, gozo, gozoTotal: g[0] ? Number(g[0].gozo) : null, premio });
  });
}

/** El consejo de un amigo o vecino que hay que premiar (si lo hubo) al saberse la respuesta de `q`. */
function porPremiar(p: FilaPartida, q: FilaSabio | null | undefined, de: string): { t: number; u: number; bien: boolean; de: string } | null {
  const c = consejoDe(p);
  if (!q || !c?.t || !c.u || p.pregunta !== q.id) return null;
  return { t: Number(c.t), u: Number(c.u), bien: lista<string>(p.opciones)[Number(c.opcion)] === q.correcta, de };
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
    const p = (rows[0] as FilaPartida) ?? null;
    return p && llamadaDe(p) ? vencerLlamada(p) : p;
  }

  /** La llamada que no se contestó a tiempo: aconseja Husai (y al amigo o vecino se le cierra la llamada). */
  async function vencerLlamada(p: FilaPartida): Promise<FilaPartida> {
    const l = llamadaDe(p)!;
    if (Date.now() <= l.hasta + GRACIA_S * 1000) return p;
    const q = p.pregunta ? PREGUNTA.get(p.pregunta) : undefined;
    avisarA(l.u, { t: "sabio-llamada-fin", id: Number(p.id), motivo: "Se acabó el tiempo de la llamada." });
    if (!q || p.pregunta !== l.q) {
      const { rows } = await pool.query(`UPDATE game_sabio_partidas SET llamada = NULL WHERE id = $1 RETURNING *, ${TIEMPOS}`, [p.id]);
      return rows[0] as FilaPartida;
    }
    const husai = consejoDeHusai(p, q, `${l.nombre} no alcanzó a contestar.`);
    const { rows } = await pool.query(`UPDATE game_sabio_partidas SET llamada = NULL, amigo = $2::jsonb WHERE id = $1 RETURNING *, ${TIEMPOS}`, [p.id, JSON.stringify(husai)]);
    return rows[0] as FilaPartida;
  }

  /** Si se estaba llamando a alguien, se le avisa que la llamada terminó (la base la borra quien llama). */
  function colgar(p: FilaPartida, motivo: string) {
    const l = llamadaDe(p);
    if (l) avisarA(l.u, { t: "sabio-llamada-fin", id: Number(p.id), motivo });
  }

  /** Guarda la última pregunta respondida (la ve el público). */
  async function guardarUltima(p: FilaPartida, q: FilaSabio, elegida: string | null, bien: boolean) {
    const u: UltimaRespuesta = {
      n: Number(p.grada) + 1,
      texto: q.pregunta,
      opciones: lista<string>(p.opciones),
      elegida,
      correcta: q.correcta,
      bien,
      explica: q.explica,
      ref: q.ref,
      at: Date.now(),
    };
    await pool.query(`UPDATE game_sabio_partidas SET ultima = $2::jsonb WHERE id = $1`, [p.id, JSON.stringify(u)]);
  }

  /** Cierra la partida: suma lo ganado, el gozo (con tope), los premios y el título. */
  async function terminar(p: FilaPartida, estado: FinPartida["estado"], pr: Persona, ultima: FilaSabio | null): Promise<FinPartida> {
    // el camino de hoy: una partida de «¿Quién es sabio?» es aprender
    void anotarCamino(pr.titular, "aprender");
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
    colgar(p, "La partida terminó.");
    await pool.query(`UPDATE game_sabio_partidas SET estado = $2, puntos = $3, gozo = $4, pregunta = NULL, llamada = NULL, finished_at = now() WHERE id = $1`, [p.id, estado, puntos, gozo]);
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
    if (gozo) await sumarGozo(pr.titular, gozo, "sabio");
    // la copa de los barrios: cada grada con que se queda suma para su barrio
    if (grada) await sumarALaCopa(pr.ch.id, "grada", grada);
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
    const rel = await relacionesDe(pr.titular, pr.ch.user_id);
    const enVivo = await enVivoPara(pr.ch.user_id, rel);
    const noches = await nochesPara(pr.ch.user_id, rel);
    const t = tituloDe(fila);
    const rolloAbierto = fila.mejor >= 10;
    if (p) registrarDuenio(Number(p.id), pr.ch.user_id);
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
        consejos: fila.consejos,
        consejosBuenos: fila.consejos_buenos,
        llamadas: fila.llamadas,
      },
      enVivo,
      noches,
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
        registrarDuenio(Number(rows[0].id), pr.ch.user_id);
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
        // si en esta grada Etán hará dudar: se decide ahora, antes de que se elija ninguna respuesta
        const duda = planDeDuda(dudaDe(p), n);
        const { rows } = await pool.query(
          `UPDATE game_sabio_partidas SET pregunta = $2, opciones = $3::jsonb, quitadas = '[]'::jsonb, servida_at = now(), extra = 0, ancianos = NULL, amigo = NULL, llamada = NULL,
                  duda = $4::jsonb
            WHERE id = $1 RETURNING *, ${TIEMPOS}`,
          [p.id, q.id, JSON.stringify(opciones), JSON.stringify(duda)],
        );
        registrarDuenio(Number(p.id), pr.ch.user_id);
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
      const de = nombreDe(pr.ch);
      type Salida = (RespuestaSabio & { premiar: ReturnType<typeof porPremiar> }) | { error: number; message: string };
      const out = await enFila(pr.titular, async (): Promise<Salida> => {
        const p = await partidaActiva(pr.titular);
        if (!p || !p.pregunta) return { error: 409, message: "No hay una pregunta a la vista." };
        const q = PREGUNTA.get(p.pregunta)!;
        const opciones = lista<string>(p.opciones);
        const n = p.grada + 1;
        const fila = await filaPersona(pr.titular);
        const rolloAbierto = fila.mejor >= 10;
        const premiar = porPremiar(p, q, de);
        if (Number(p.pasados ?? 0) > segundosDe(p, n) + GRACIA_S) {
          await guardarUltima(p, q, null, false);
          const fin = await terminar(p, "tiempo", pr, q);
          return { correcta: false, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin, premiar };
        }
        if (!opciones.includes(opcion) || lista<number>(p.quitadas).includes(opciones.indexOf(opcion))) return { error: 400, message: "Esa respuesta no está entre las opciones." };
        colgar(p, `${de} ya respondió.`);
        p.llamada = null;
        // lo que responde el pueblo (para el comodín de los ancianos)
        await pool.query(
          `INSERT INTO game_sabio_respuestas (pregunta, opcion, n) VALUES ($1, $2, 1) ON CONFLICT (pregunta, opcion) DO UPDATE SET n = game_sabio_respuestas.n + 1`,
          [q.id, opcion],
        );
        await guardarUltima(p, q, opcion, opcion === q.correcta);
        if (opcion !== q.correcta) {
          const fin = await terminar(p, "perdio", pr, q);
          return { correcta: false, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin, premiar };
        }
        const grada = p.grada + 1;
        const { rows } = await pool.query(
          `UPDATE game_sabio_partidas SET grada = $2, puntos = $3, pregunta = NULL, opciones = NULL, quitadas = '[]'::jsonb, servida_at = now(), extra = 0, ancianos = NULL, amigo = NULL, llamada = NULL
            WHERE id = $1 RETURNING *, ${TIEMPOS}`,
          [p.id, grada, PUNTOS_GRADA[grada]],
        );
        const nueva = rows[0] as FilaPartida;
        if (grada >= GRADAS) {
          const fin = await terminar(nueva, "gano", pr, null);
          return { correcta: true, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: null, fin, premiar };
        }
        return { correcta: true, respuesta: q.correcta, explica: q.explica, ref: q.ref, partida: vista(nueva, rolloAbierto || grada >= 10), fin: null, premiar };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      const { premiar, ...respuesta } = out;
      if (premiar) void premiarConsejo(premiar).catch((err) => console.error("[sabio] premiar consejo:", err));
      res.json(respuesta);
    }),
  );

  // La escena de la duda con Etán: empieza al elegir una respuesta (sin decir cuál). El reloj se detiene mientras habla
  // Etán: el servidor devuelve esos segundos, una vez por pregunta, y solo si tocaba o si ya pensó más del 60 % del reloj.
  app.post("/api/jerusalen/sabio/duda", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      type Salida = { frase: string; partida: PartidaVista } | { error: number; message: string };
      const out = await enFila(pr.titular, async (): Promise<Salida> => {
        const p = await partidaActiva(pr.titular);
        if (!p || !p.pregunta) return { error: 409, message: "No hay una pregunta a la vista." };
        const n = p.grada + 1;
        const d = dudaDe(p) ?? planDeDuda(null, n);
        if (d.usada) return { error: 409, message: "Etán ya te preguntó en esta grada." };
        if (restantes(p, n) <= 0) return { error: 409, message: "Se acabó el tiempo." };
        // un segundo de gracia por lo que tarda la red
        if (!d.plan && !tardaMucho(Number(p.pasados ?? 0) + 1, segundosDe(p, n))) return { error: 409, message: "Etán no tiene nada que preguntarte ahora." };
        const frase = fraseDeDuda(n, d.frases);
        const nueva: DudaEstado = { cada: azarCada(), ultima: n, plan: d.plan, usada: true, frases: [...d.frases, frase.id].slice(-12) };
        const fila = await filaPersona(pr.titular);
        const { rows } = await pool.query(`UPDATE game_sabio_partidas SET duda = $2::jsonb, extra = extra + ${DUDA_S} WHERE id = $1 RETURNING *, ${TIEMPOS}`, [
          p.id,
          JSON.stringify(nueva),
        ]);
        return { frase: frase.texto, partida: vista(rows[0] as FilaPartida, fila.mejor >= 10) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json(out);
    }),
  );

  // Las tablas por partida: hoy, la semana, siempre y mis partidas.
  app.get("/api/jerusalen/sabio/tablas", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const de = String(req.query.de ?? "semana") as TablaDe;
      if (!["hoy", "semana", "siempre", "mias"].includes(de)) return res.status(400).json({ message: "Esa tabla no existe." });
      res.setHeader("Cache-Control", "no-store");
      res.json(de === "mias" ? await misPartidas(pr.titular) : await tablaPartidas(de, pr.titular));
    }),
  );

  // Retirarse con lo ganado (antes de responder la pregunta que está a la vista).
  app.post("/api/jerusalen/sabio/retirarse", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const de = nombreDe(pr.ch);
      const out = await enFila(pr.titular, async () => {
        const p = await partidaActiva(pr.titular);
        if (!p) return { error: 409, message: "No tienes una partida abierta." };
        const q = p.pregunta ? PREGUNTA.get(p.pregunta) ?? null : null;
        const premiar = porPremiar(p, q, de);
        colgar(p, `${de} se retiró con lo ganado.`);
        p.llamada = null;
        return { fin: await terminar(p, "retiro", pr, q), premiar };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      if (out.premiar) void premiarConsejo(out.premiar).catch((err) => console.error("[sabio] premiar consejo:", err));
      res.json({ fin: out.fin });
    }),
  );

  // Un comodín (uno de cada uno por partida): da unos segundos más.
  app.post("/api/jerusalen/sabio/comodin", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const tipo = String(req.body?.tipo ?? "") as Comodin;
      if (!["aventador", "ancianos", "amigo", "rollo"].includes(tipo)) return res.status(400).json({ message: "Ese comodín no existe." });
      // a quién se llama con «Un amigo» (su personaje); sin nadie, aconseja Husai
      const a = Number(req.body?.a);
      const aQuien = tipo === "amigo" && Number.isInteger(a) && a > 0 ? a : null;
      const de = nombreDe(pr.ch);
      type Salida = { partida: PartidaVista; premiar: ReturnType<typeof porPremiar> } | { error: number; message: string };
      const out = await enFila(pr.titular, async (): Promise<Salida> => {
        const p = await partidaActiva(pr.titular);
        if (!p || !p.pregunta) return { error: 409, message: "No hay una pregunta a la vista." };
        const usados = lista<Comodin>(p.usados);
        if (usados.includes(tipo)) return { error: 409, message: "Ya usaste ese comodín en esta partida." };
        const fila = await filaPersona(pr.titular);
        const rolloAbierto = fila.mejor >= 10;
        if (tipo === "rollo" && !rolloAbierto) return { error: 403, message: "«Otro rollo» se abre cuando llegas alguna vez a la grada 10." };
        const enCurso = llamadaDe(p);
        if (tipo === "rollo" && enCurso) return { error: 409, message: `Espera a que conteste ${enCurso.nombre}…` };
        const n = p.grada + 1;
        if (restantes(p, n) <= 0) return { error: 409, message: "Se acabó el tiempo." };
        const q = PREGUNTA.get(p.pregunta)!;
        const opciones = lista<string>(p.opciones);
        const set: string[] = [`usados = $2::jsonb`, `extra = extra + ${SEGUNDOS_COMODIN}`];
        const vals: unknown[] = [p.id, JSON.stringify([...usados, tipo])];
        let premiar: ReturnType<typeof porPremiar> = null;
        let llamar: (AmigoPosible & { t: number; u: number }) | null = null;
        if (tipo === "aventador") {
          const malas = mezclar(opciones.map((_, i) => i).filter((i) => opciones[i] !== q.correcta)).slice(0, 2);
          set.push(`quitadas = $3::jsonb`);
          vals.push(JSON.stringify(malas.sort()));
        } else if (tipo === "ancianos") {
          set.push(`ancianos = $3::jsonb`);
          vals.push(JSON.stringify(await puebloDe(p, q)));
        } else if (tipo === "amigo" && aQuien !== null) {
          // la llamada a un amigo o vecino de verdad: tiene 30 segundos (y a quien llama se le suman al reloj)
          llamar = (await amigosPosibles(pr.titular, pr.ch.user_id)).find((x) => x.personajeId === aQuien) ?? null;
          if (!llamar) return { error: 409, message: "Esa persona ya no puede contestar ahora. Elige a otra, o a Husai." };
          const l: Llamada = {
            a: llamar.personajeId,
            t: llamar.t,
            u: llamar.u,
            nombre: llamar.nombre,
            camino: llamar.camino,
            relacion: llamar.relacion,
            hasta: Date.now() + LLAMADA_S * 1000,
            q: q.id,
          };
          set.splice(1, 1, `extra = extra + ${SEGUNDOS_COMODIN + LLAMADA_S}`);
          set.push(`llamada = $3::jsonb`, `amigo = NULL`);
          vals.push(JSON.stringify(l));
        } else if (tipo === "amigo") {
          set.push(`amigo = $3::jsonb`);
          vals.push(JSON.stringify(consejoDeHusai(p, q)));
        } else {
          // otro rollo: otra pregunta de la misma grada, con su reloj completo (si un vecino aconsejó, ya se sabe si acertó)
          premiar = porPremiar(p, q, de);
          const { q: otra, vistas } = elegirPregunta(n, fila.vistas, [q.id]);
          await pool.query(`UPDATE game_sabio SET vistas = $2::jsonb WHERE character_id = $1`, [pr.titular, JSON.stringify(vistas)]);
          set.splice(1, 1, `extra = 0`);
          set.push(`pregunta = $3`, `opciones = $4::jsonb`, `quitadas = '[]'::jsonb`, `servida_at = now()`, `ancianos = NULL`, `amigo = NULL`, `llamada = NULL`);
          vals.push(otra.id, JSON.stringify(mezclar([otra.correcta, ...otra.falsas])));
        }
        const { rows } = await pool.query(`UPDATE game_sabio_partidas SET ${set.join(", ")} WHERE id = $1 RETURNING *, ${TIEMPOS}`, vals);
        let nueva = rows[0] as FilaPartida;
        if (llamar) {
          const llego = avisarA(llamar.u, {
            t: "sabio-llamada",
            l: { id: Number(p.id), de, camino: pr.ch.camino, n, texto: q.pregunta, opciones, quitadas: lista<number>(nueva.quitadas), restantes: LLAMADA_S },
          });
          if (!llego) {
            // se fue de la ciudad justo ahora: aconseja Husai (y no se regalan los segundos de la llamada)
            const husai = consejoDeHusai(nueva, q, `${llamar.nombre} ya no estaba en la ciudad.`);
            const { rows: r2 } = await pool.query(
              `UPDATE game_sabio_partidas SET llamada = NULL, amigo = $2::jsonb, extra = GREATEST(0, extra - ${LLAMADA_S}) WHERE id = $1 RETURNING *, ${TIEMPOS}`,
              [p.id, JSON.stringify(husai)],
            );
            nueva = r2[0] as FilaPartida;
          }
        }
        return { partida: vista(nueva, rolloAbierto), premiar };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      if (out.premiar) void premiarConsejo(out.premiar).catch((err) => console.error("[sabio] premiar consejo:", err));
      res.json({ partida: out.partida });
    }),
  );

  // ============================================================ con amigos: el consejo de un vecino y el público
  /** Quien no juega pero mira o aconseja: basta con la sesión y la cuenta aprobada. */
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

  // La partida abierta (para seguir una llamada en curso sin pedir las tablas).
  app.get("/api/jerusalen/sabio/partida", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const out = await enFila(pr.titular, async () => {
        const p = await partidaActiva(pr.titular);
        const fila = await filaPersona(pr.titular);
        return { partida: p ? vista(p, fila.mejor >= 10) : null };
      });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    }),
  );

  // A quién se le puede pedir consejo ahora (amigos y vecinos en la ciudad o en el templo).
  app.get("/api/jerusalen/sabio/amigos", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const lista = await amigosPosibles(pr.titular, pr.ch.user_id);
      res.setHeader("Cache-Control", "no-store");
      res.json({ amigos: lista.map(({ t: _t, u: _u, ...x }) => x) satisfies AmigoPosible[] });
    }),
  );

  // Recibir o no las llamadas de los amigos y vecinos que juegan.
  app.post("/api/jerusalen/sabio/llamadas", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const si = req.body?.si !== false;
      await enFila(pr.titular, async () => {
        await filaPersona(pr.titular);
        await pool.query(`UPDATE game_sabio SET llamadas = $2, updated_at = now() WHERE character_id = $1`, [pr.titular, si]);
      });
      res.json({ llamadas: si });
    }),
  );

  // El amigo o vecino da su consejo (o dice que no puede): le llega a quien lo llamó.
  app.post("/api/jerusalen/sabio/consejo", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.body?.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Llamada no válida." });
      const noPuede = req.body?.opcion === null || req.body?.opcion === undefined;
      const opcion = Number(req.body?.opcion);
      const confianza: Confianza = (["seguro", "creo", "adivino"] as const).find((c) => c === req.body?.confianza) ?? "creo";
      const { rows: d } = await pool.query(`SELECT character_id FROM game_sabio_partidas WHERE id = $1 AND estado = 'jugando'`, [id]);
      if (!d[0]) return res.status(409).json({ message: "Esa partida ya terminó." });
      type Salida = { error: number; message: string } | { ok: true; dio: number | null };
      const out = await enFila(Number(d[0].character_id), async (): Promise<Salida> => {
        const { rows } = await pool.query(`SELECT *, ${TIEMPOS} FROM game_sabio_partidas WHERE id = $1 AND estado = 'jugando'`, [id]);
        const p = rows[0] as FilaPartida | undefined;
        const l = p ? llamadaDe(p) : null;
        if (!p || !l || l.u !== me) return { error: 409, message: "Esta llamada ya terminó." };
        const q = p.pregunta ? PREGUNTA.get(p.pregunta) : undefined;
        if (!q || p.pregunta !== l.q) return { error: 409, message: "La pregunta ya cambió." };
        if (Date.now() > l.hasta + GRACIA_S * 1000) return { error: 409, message: "Se acabó el tiempo de la llamada." };
        const opciones = lista<string>(p.opciones);
        let consejo: ConsejoGuardado;
        if (noPuede) consejo = consejoDeHusai(p, q, `${l.nombre} no puede ayudarte ahora.`);
        else {
          if (!Number.isInteger(opcion) || opcion < 0 || opcion >= opciones.length || lista<number>(p.quitadas).includes(opcion))
            return { error: 400, message: "Esa respuesta no está entre las opciones." };
          consejo = {
            quien: l.nombre,
            opcion,
            dice: textoDeConsejo(confianza, LETRAS[opcion], opciones[opcion]),
            vecino: { camino: l.camino, relacion: l.relacion },
            t: l.t,
            u: l.u,
          };
        }
        await pool.query(`UPDATE game_sabio_partidas SET llamada = NULL, amigo = $2::jsonb WHERE id = $1`, [p.id, JSON.stringify(consejo)]);
        avisarA(Number(p.user_id), { t: "sabio-consejo", id: Number(p.id) });
        return { ok: true, dio: noPuede ? null : l.t };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      if (out.dio !== null) void contarConsejo(out.dio).catch((err) => console.error("[sabio] contar consejo:", err));
      res.json({ ok: true });
    }),
  );

  // Las partidas que se juegan ahora (el público elige cuál mirar).
  app.get("/api/jerusalen/sabio/en-vivo", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      res.setHeader("Cache-Control", "no-store");
      const rel = await relacionesDe(pr.titular, pr.ch.user_id);
      res.json({ enVivo: await enVivoPara(pr.ch.user_id, rel), noches: await nochesPara(pr.ch.user_id, rel) });
    }),
  );

  /** Si dos cuentas se bloquearon (en un sentido o en el otro). Se recuerda un minuto: el público pregunta seguido. */
  const bloqueos = new Map<string, { at: number; si: boolean }>();
  async function seBloquearon(a: number, b: number): Promise<boolean> {
    const k = a < b ? `${a}:${b}` : `${b}:${a}`;
    const hit = bloqueos.get(k);
    if (hit && Date.now() - hit.at < 60_000) return hit.si;
    const { rows } = await pool.query(
      `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1) LIMIT 1`,
      [a, b],
    );
    if (bloqueos.size > 5000) bloqueos.clear();
    bloqueos.set(k, { at: Date.now(), si: rows.length > 0 });
    return rows.length > 0;
  }

  // Mirar una partida en vivo: lo mismo que ve quien juega (nunca la respuesta antes de tiempo).
  app.get("/api/jerusalen/sabio/mirar/:id", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Partida no válida." });
      const { rows } = await pool.query(
        `SELECT p.*, ${tiemposDe("p.")}, c.name, c.path, u.display_name, u.username
           FROM game_sabio_partidas p
           JOIN game_characters c ON c.id = p.jugador_id
           JOIN users u ON u.id = p.user_id AND u.is_active IS NOT FALSE
          WHERE p.id = $1`,
        [id],
      );
      const r = rows[0];
      const duenio = r ? Number(r.user_id) : null;
      if (!r || (duenio !== me && (await seBloquearon(me, duenio!)))) return res.status(404).json({ message: "Esa partida ya no está." });
      if (duenio !== me) marcarMirando(id, me, await nombreDeCuenta(me));
      res.setHeader("Cache-Control", "no-store");
      res.json(mirarVista(r));
    }),
  );

  // El público anima: un aplauso, una oración o un «¡ánimo!» (lo ve quien juega).
  app.post("/api/jerusalen/sabio/mirar/:id/aplauso", (req, res) => {
    const me = cuentaActiva(req, res);
    if (me === null) return;
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Partida no válida." });
    const r = aplaudir(id, me, String(req.body?.tipo ?? ""));
    if (r === "no") return res.status(409).json({ message: "Primero mira la partida." });
    if (r === "rapido") return res.status(429).json({ message: "Un aplauso a la vez." });
    res.json({ publico: publicoDe(id) });
  });

  // Quien juega: cuántos lo miran y los aplausos de los últimos segundos.
  app.get("/api/jerusalen/sabio/publico", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = Number(req.query.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Partida no válida." });
      let duenio = duenioDe(id);
      if (duenio === null) {
        const { rows } = await pool.query(`SELECT user_id FROM game_sabio_partidas WHERE id = $1`, [id]);
        if (!rows[0]) return res.status(404).json({ message: "Esa partida ya no está." });
        duenio = Number(rows[0].user_id);
        registrarDuenio(id, duenio);
      }
      if (duenio !== me) return res.sendStatus(403);
      res.setHeader("Cache-Control", "no-store");
      res.json({ publico: publicoDe(id) });
    }),
  );
}

/** Para los logros en línea: cuántas veces subió las quince gradas la persona. */
export async function ganadasSabio(titular: number): Promise<number> {
  const { rows } = await pool.query(`SELECT ganadas FROM game_sabio WHERE character_id = $1`, [titular]);
  return Number(rows[0]?.ganadas || 0);
}

