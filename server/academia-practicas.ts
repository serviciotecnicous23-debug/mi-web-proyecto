/**
 * El motor de prácticas de la academia (docs/academia-practicas.md): la práctica de cada lección (una sola, que cuenta
 * y se repite sin límite: vale la mejor), la práctica del día, el camino y la misión de cada materia, los juegos libres, las medallas y lo que ve la
 * Administración. Arma y califica server/academia-practicas-calificar.ts; las respuestas viven en
 * server/academia/practicas/ y nunca se mandan antes de contestar. La Administración prueba sin inscribirse (sus
 * intentos quedan como prueba y no cuentan).
 */
import { randomInt } from "node:crypto";
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { leccionPorId, materiaPorId, puedeRevisar, type MateriaDef, type NivelN } from "@shared/academia";
import {
  ESCALON_FIRME, MEDALLAS_PRACTICA, MODALIDADES, NOMBRE_FORMATO, extraDeLecciones, NOMBRE_MODO, NOMBRE_PIEZA, PESOS_CON_PRACTICAS, PIEZAS, PRACTICAS, componentePracticas, type Modalidad, esCalificable, estadoObjetivo, estrellasDe,
  intercalarPorLeccion, medallaPractica, minutosDe, notaIntento, problemaDePesos, siguienteEscalon,
  type CaminoMateria, type Devolucion, type IntentoVista, type JuegoPregunta, type JuegoVista, type MedallaPractica, type ModoPractica, type ObjetivoResultado,
  type PracticaDelDiaResumen, type PracticaLeccionVista, type RespuestaPractica, type ResultadoPractica,
} from "@shared/practicas";
import { PESOS_NIVEL, type Pesos } from "@shared/academia-base";
import { BANCOS, CONTENIDO } from "./academia/index";
import { PRACTICAS_POR_MATERIA, actividadPorId, actividadesDe, leccionesConPractica, materiaConPracticas } from "./academia/practicas/index";
import type { Actividad } from "./academia/practicas/tipos";
import { contestar, formatoDe, formatoDificil, formatosPosibles, listaDe, nuevoEstado, ordenDeLista, pistaDe, vistaDe, type EstadoItem } from "./academia-practicas-calificar";
import { numeroDe } from "./orden-examen";
import { ordenDeOpciones } from "@shared/estudios";
import {
  PRACTICAS_NOTA_SQL, asegurarConfig, componentePracticasDe, configDe, materiaAprobadaPor, materiaDelAlumno, olvidarConfig, pesosConPracticas, practicasCuentan, practicasObligatorias,
  retoAbierto,
} from "./academia-practicas-nota";
import { MENSAJE_CERRADA, accesoDe, diaTexas, enFila, estaInscrito, frenar, inscritaEnMateria, marcarEstudio, recalcularMateria, type Acceso } from "./academia-comun";
import { permisoDe } from "./academia-direccion";
import { registrar } from "./academia-revision";

/** Las tablas del motor (aditivas; se borran con la cuenta: server/account-deletion.ts). */
export const PRACTICAS_SQL = `
CREATE TABLE IF NOT EXISTS academia_practicas_intentos (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  modo text NOT NULL,
  materia_id text NOT NULL,
  leccion_id text,
  prueba boolean NOT NULL DEFAULT false,
  items jsonb NOT NULL,
  puntaje integer,
  created_at timestamp NOT NULL DEFAULT now(),
  terminado_at timestamp
);
CREATE INDEX IF NOT EXISTS academia_practicas_intentos_alumno ON academia_practicas_intentos (user_id, leccion_id, modo);
ALTER TABLE academia_practicas_intentos ADD COLUMN IF NOT EXISTS modalidad text;
CREATE INDEX IF NOT EXISTS academia_practicas_intentos_materia ON academia_practicas_intentos (materia_id, terminado_at);
CREATE TABLE IF NOT EXISTS academia_practicas_lecciones (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  leccion_id text NOT NULL,
  materia_id text NOT NULL,
  guiada_at timestamp,
  mejor integer,
  objetivos jsonb NOT NULL DEFAULT '{}'::jsonb,
  intentos integer NOT NULL DEFAULT 0,
  estrellas integer NOT NULL DEFAULT 0,
  updated_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, leccion_id)
);
ALTER TABLE academia_practicas_lecciones ADD COLUMN IF NOT EXISTS reto_mejor integer;
ALTER TABLE academia_practicas_lecciones ADD COLUMN IF NOT EXISTS reto_at timestamp;
CREATE TABLE IF NOT EXISTS academia_practicas_items (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clave text NOT NULL,
  materia_id text NOT NULL,
  leccion_id text NOT NULL,
  objetivo integer NOT NULL,
  escalon integer NOT NULL DEFAULT 0,
  proximo_at timestamp,
  vueltas integer NOT NULL DEFAULT 0,
  aciertos integer NOT NULL DEFAULT 0,
  fallos integer NOT NULL DEFAULT 0,
  fallos_seguidos integer NOT NULL DEFAULT 0,
  firme_at timestamp,
  ultima_at timestamp,
  PRIMARY KEY (user_id, clave)
);
CREATE INDEX IF NOT EXISTS academia_practicas_items_toca ON academia_practicas_items (user_id, proximo_at);
CREATE TABLE IF NOT EXISTS academia_practicas_respuestas (
  id serial PRIMARY KEY,
  intento_id integer NOT NULL REFERENCES academia_practicas_intentos(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  materia_id text NOT NULL,
  leccion_id text NOT NULL,
  clave text NOT NULL,
  version integer NOT NULL,
  paso integer NOT NULL DEFAULT 0,
  pieza text NOT NULL,
  modo text NOT NULL,
  prueba boolean NOT NULL DEFAULT false,
  puntaje real NOT NULL,
  respuesta jsonb,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS academia_practicas_respuestas_clave ON academia_practicas_respuestas (materia_id, clave);
CREATE TABLE IF NOT EXISTS academia_practicas_marcas (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  juego text NOT NULL,
  mejor integer NOT NULL,
  logrado_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, juego)
);
CREATE TABLE IF NOT EXISTS academia_practicas_medallas (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clave text NOT NULL,
  logrado_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, clave)
);
${PRACTICAS_NOTA_SQL}`;

const DIA_MS = 86_400_000;
const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
const claveDe = (leccion: string, actividad: string) => `${leccion}:${actividad}`;
const leccionDeClave = (clave: string) => clave.slice(0, clave.lastIndexOf(":"));
const actividadDeClave = (clave: string) => clave.slice(clave.lastIndexOf(":") + 1);

/** El comienzo del día de Texas (la sede) en que estamos, como instante. */
export function inicioDiaTexas(ahora = new Date()): Date {
  const hoy = diaTexas(ahora);
  const [y, m, d] = hoy.split("-").map(Number);
  for (const h of [5, 6, 4, 7]) {
    const t = new Date(Date.UTC(y, m - 1, d, h));
    if (diaTexas(t) === hoy && diaTexas(new Date(t.getTime() - 1)) !== hoy) return t;
  }
  return new Date(Date.UTC(y, m - 1, d, 6));
}

// ---------------------------------------------------------------- quién practica

type Modo = { userId: number | null; inscrito: boolean; prueba: boolean };

/** El alumno inscrito en la materia, o la Administración (que prueba sin inscribirse y sin que cuente). */
async function modoDe(acceso: Acceso, materiaId: string): Promise<Modo> {
  if (!acceso.userId) return { userId: null, inscrito: false, prueba: false };
  const inscrito = (await estaInscrito(acceso.userId)) && !!(await inscritaEnMateria(acceso.userId, materiaId));
  return { userId: acceso.userId, inscrito, prueba: !inscrito && puedeRevisar(acceso.role) };
}

async function completadas(userId: number, ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const { rows } = await pool.query(`SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND completada_at IS NOT NULL`, [userId, ids]);
  return new Set((rows as any[]).map((r) => String(r.leccion_id)));
}

type Resumen = { guiada: boolean; mejor: number | null; objetivos: Record<string, number>; intentos: number; estrellas: number; reto: number | null };
/** Ya hizo la práctica de la lección (la de ahora, que cuenta, o la guiada de antes del 26-nov). */
const hecha = (r?: Resumen | null) => !!r && (r.guiada || r.mejor != null);
async function resumenesDe(userId: number, ids: string[]): Promise<Map<string, Resumen>> {
  if (!ids.length) return new Map();
  const { rows } = await pool.query(
    `SELECT leccion_id, guiada_at, mejor, objetivos, intentos, estrellas, reto_mejor FROM academia_practicas_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`,
    [userId, ids],
  );
  return new Map(
    (rows as any[]).map((r) => [
      String(r.leccion_id),
      {
        guiada: !!r.guiada_at,
        mejor: r.mejor == null ? null : Number(r.mejor),
        objetivos: (r.objetivos ?? {}) as Record<string, number>,
        intentos: Number(r.intentos),
        estrellas: Number(r.estrellas),
        reto: r.reto_mejor == null ? null : Number(r.reto_mejor),
      },
    ]),
  );
}

/** Si todas las actividades calificables de cada objetivo están firmes (respondidas bien después de 30 días). */
async function firmesPorObjetivo(userId: number, leccionId: string, actividades: Actividad[]): Promise<Map<number, boolean>> {
  const { rows } = await pool.query(`SELECT clave, escalon FROM academia_practicas_items WHERE user_id = $1 AND leccion_id = $2`, [userId, leccionId]);
  const escalon = new Map((rows as any[]).map((r) => [String(r.clave), Number(r.escalon)]));
  const out = new Map<number, boolean>();
  for (const a of actividades.filter((x) => esCalificable(x.pieza))) {
    const firme = (escalon.get(claveDe(leccionId, a.id)) ?? 0) >= ESCALON_FIRME;
    out.set(a.objetivo, (out.get(a.objetivo) ?? true) && firme);
  }
  return out;
}

function objetivosDe(leccionId: string, r: Resumen | undefined, firmes: Map<number, boolean>): ObjetivoResultado[] {
  const objetivos = CONTENIDO.get(leccionId)?.objetivos ?? [];
  return objetivos.map((texto, n) => {
    const pct = r?.objetivos?.[String(n)];
    return { n, texto, pct: pct ?? 0, estado: estadoObjetivo(hecha(r), pct ?? null, firmes.get(n) ?? false) };
  });
}

// ---------------------------------------------------------------- la práctica de una lección

async function practicaDeLeccion(acceso: Acceso, leccionId: string): Promise<PracticaLeccionVista | null> {
  const l = leccionPorId(leccionId);
  if (!l) return null;
  const m = l.materia;
  const actividades = actividadesDe(leccionId) ?? [];
  const modo = await modoDe(acceso, m.id);
  const hechas = modo.userId && modo.inscrito ? await completadas(modo.userId, [leccionId]) : new Set<string>();
  const resumen = modo.userId && !modo.prueba ? (await resumenesDe(modo.userId, [leccionId])).get(leccionId) : undefined;
  const firmes = modo.userId && !modo.prueba ? await firmesPorObjetivo(modo.userId, leccionId, actividades) : new Map<number, boolean>();
  const completada = hechas.has(leccionId);
  let falta: string | null = null;
  if (!acceso.userId) falta = "Entra con tu cuenta para practicar.";
  else if (!actividades.length) falta = "Esta lección todavía no tiene práctica.";
  else if (!modo.prueba && !modo.inscrito) falta = "Inscríbete en la materia para practicar.";
  else if (!modo.prueba && !completada) falta = "Termina la lección y su repaso para abrir la práctica.";
  const piezas = actividades.map((a) => a.pieza);
  // (la Administración prueba sin que cuente: para ella no entra en ninguna nota)
  const cuentaEnNota = !modo.prueba && (await practicasCuentan(modo.userId, m));
  const aprobada = !modo.prueba && !!modo.userId && (await materiaAprobadaPor(modo.userId, m.id));
  return {
    leccion: { id: leccionId, titulo: l.leccion.titulo, n: l.indice + 1, completada },
    materia: { id: m.id, titulo: m.titulo, nivel: (m.nivel ?? null) as NivelN | null },
    existe: actividades.length > 0,
    actividades: actividades.length,
    minutos: minutosDe(piezas),
    piezas: [...new Set(piezas)],
    guiada: hecha(resumen),
    mejor: resumen?.mejor ?? null,
    estrellas: estrellasDe(hecha(resumen), resumen?.mejor ?? null),
    intentos: resumen?.intentos ?? 0,
    objetivos: objetivosDe(leccionId, resumen, firmes),
    falta,
    cuentaEnNota,
    obligatoria: cuentaEnNota && !aprobada && !!modo.userId,
    aprobada,
    formas: formasDe(actividades),
    reto: await retoDeLeccion(modo, m, resumen),
    prueba: modo.prueba,
    conSesion: !!acceso.userId,
  };
}

// ---------------------------------------------------------------- los intentos

type FilaIntento = {
  id: number;
  user_id: number;
  modo: ModoPractica;
  materia_id: string;
  leccion_id: string | null;
  prueba: boolean;
  items: EstadoItem[];
  terminado_at: string | null;
  modalidad: string | null;
};

async function intentoDe(id: number, userId: number): Promise<FilaIntento | null> {
  const { rows } = await pool.query(
    `SELECT id, user_id, modo, materia_id, leccion_id, prueba, items, terminado_at, modalidad FROM academia_practicas_intentos WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );
  return (rows[0] as FilaIntento | undefined) ?? null;
}

function vistaIntento(f: FilaIntento): IntentoVista {
  const m = materiaPorId(f.materia_id);
  const l = f.leccion_id ? leccionPorId(f.leccion_id) : undefined;
  const mision = f.modo === "mision" ? PRACTICAS_POR_MATERIA.get(f.materia_id)?.mision : undefined;
  const titulo =
    f.modo === "guiada" || f.modo === "cuenta" || f.modo === "reto" ? l?.leccion.titulo ?? "Práctica" : f.modo === "mision" ? mision?.titulo ?? `Misión: ${m?.titulo ?? ""}` : "Práctica del día";
  const subtitulo =
    f.modo === "mision"
      ? mision?.intro ?? "Un reto con lo de todas las lecciones de la materia."
      : f.modo === "dia"
        ? "Lo que el motor te trae hoy para no olvidarlo."
        : f.modo === "reto"
          ? `Sin pistas y cada actividad en su forma más difícil. Con ${PRACTICAS.retoDomina} o más lo dominas y ganas tus puntos extra.`
          : NOMBRE_MODO[f.modo];
  return {
    id: f.id,
    modo: f.modo,
    prueba: f.prueba,
    titulo,
    subtitulo,
    leccion: l ? { id: l.leccion.id, titulo: l.leccion.titulo, n: l.indice + 1 } : null,
    materia: { id: f.materia_id, titulo: m?.titulo ?? f.materia_id },
    items: f.items.map((e, i) => {
      const a = actividadPorId(e.leccion, e.actividad)!;
      const objetivos = CONTENIDO.get(e.leccion)?.objetivos ?? [];
      return {
        n: i,
        pieza: a.pieza,
        formato: formatoDe(a, e),
        objetivo: objetivos[a.objetivo] ?? "",
        leccion: f.modo === "guiada" || f.modo === "cuenta" || f.modo === "reto" ? null : leccionPorId(e.leccion)?.leccion.titulo ?? null,
        vista: vistaDe(a, e),
        hecha: e.terminada,
      };
    }),
    // (en la que cuenta, la actividad con pista vale la mitad)
    pistas: f.modo === "guiada" || f.modo === "cuenta",
    cierre: f.modo === "mision" ? mision?.cierre ?? null : null,
    modalidad: (MODALIDADES as readonly string[]).includes(String(f.modalidad)) ? (f.modalidad as Modalidad) : "camino",
    // (como en el reproductor: 10 por cada paso bien; los puntos de más de la modalidad los lleva el teléfono)
    puntos: f.items.reduce((s, e) => s + e.puntajes.reduce((x, p) => x + Math.round(p * 10), 0), 0),
  };
}

/** El reto de dominio de una lección, como lo ve el alumno (null si la lección no tiene práctica). */
async function retoDeLeccion(modo: Modo, m: MateriaDef, resumen: Resumen | undefined): Promise<PracticaLeccionVista["reto"]> {
  if (!materiaConPracticas(m.id)) return null;
  const mejor = resumen?.reto ?? null;
  const dominado = (mejor ?? 0) >= PRACTICAS.retoDomina;
  if (modo.prueba) return { abierto: true, mejor: null, dominado: false, puntos: 0, falta: null };
  if (!modo.userId) return { abierto: false, mejor: null, dominado: false, puntos: 0, falta: "Se abre al aprobar la materia." };
  const x = await materiaDelAlumno(modo.userId, m.id);
  if (x.estado !== "aprobada") return { abierto: false, mejor, dominado, puntos: 0, falta: "Se abre al aprobar la materia: ahí puedes completar tu nota hasta 100." };
  if (x.via === "suficiencia" || x.via === "convalidada") return { abierto: false, mejor, dominado, puntos: 0, falta: "Los puntos extra son para las materias aprobadas cursándolas." };
  return { abierto: true, mejor, dominado, puntos: extraDeLecciones(x.base ?? x.nota ?? 0, 1, m.lecciones.length), falta: null };
}

/** Los nombres de las formas de jugar que pueden tocar en estas actividades (para anunciarlas antes de empezar). */
function formasDe(actividades: Actividad[]): string[] {
  const nombres = new Set<string>();
  for (const a of actividades)
    a.versiones.forEach((_, v) => {
      for (const f of formatosPosibles(a, v, "guiada")) nombres.add(f === "normal" || (a.pieza === "linea" && f === "lista") ? NOMBRE_PIEZA[a.pieza] : NOMBRE_FORMATO[f]);
    });
  return [...nombres];
}

/** La modalidad de un intento, al azar (en la que cuenta, nunca contra el reloj). */
function modalidadPara(modo: ModoPractica, semilla: number): Modalidad {
  // (el reto de dominio va sin adornos: se trata de saberlo todo, no de los puntos)
  if (modo === "reto") return "camino";
  const posibles = MODALIDADES.filter((x) => modo !== "cuenta" || x !== "reloj");
  return posibles[numeroDe(`modalidad:${semilla}`) % posibles.length];
}

async function crearIntento(userId: number, modo: ModoPractica, materiaId: string, leccionId: string | null, prueba: boolean, items: EstadoItem[], semilla: number): Promise<FilaIntento> {
  const { rows } = await pool.query(
    `INSERT INTO academia_practicas_intentos (user_id, modo, materia_id, leccion_id, prueba, items, modalidad) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
     RETURNING id, user_id, modo, materia_id, leccion_id, prueba, items, terminado_at, modalidad`,
    [userId, modo, materiaId, leccionId, prueba, JSON.stringify(items), modalidadPara(modo, semilla)],
  );
  return rows[0] as FilaIntento;
}

/**
 * Las actividades de un intento con su forma de jugar: variadas (una forma no se repite mientras haya otras) y
 * distintas en cada intento, para que nadie sepa con qué se va a encontrar.
 */
function conFormatos(lista: { leccion: string; a: Actividad; version: number }[], modo: ModoPractica, semilla: number): EstadoItem[] {
  const usados = new Map<string, number>();
  return lista.map(({ leccion, a, version }, k) => {
    const posibles = formatosPosibles(a, version, modo);
    const menos = Math.min(...posibles.map((f) => usados.get(f) ?? 0));
    const candidatos = posibles.filter((f) => (usados.get(f) ?? 0) === menos);
    const formato = candidatos[numeroDe(`${semilla}:${leccion}:${a.id}:${k}`) % candidatos.length];
    usados.set(formato, (usados.get(formato) ?? 0) + 1);
    return nuevoEstado(leccion, a, version, semilla, formato);
  });
}

/** Un orden variado: mezclado en cada intento, sin dos piezas iguales seguidas (si se puede) y «explícalo» al final. */
function ordenVariado<T extends { a: Actividad }>(lista: T[], semilla: number): T[] {
  const finales = lista.filter((x) => x.a.pieza === "explica");
  const resto = ordenDeOpciones(lista.length, semilla >>> 0)
    .map((i) => lista[i])
    .filter((x) => x.a.pieza !== "explica");
  const out: T[] = [];
  while (resto.length) {
    const j = resto.findIndex((x) => x.a.pieza !== out[out.length - 1]?.a.pieza);
    out.push(resto.splice(j >= 0 ? j : 0, 1)[0]);
  }
  return [...out, ...finales];
}

/** La versión de cada actividad: va rotando con los intentos, para que cada intento traiga otras palabras y ejemplos. */
const versionPara = (a: Actividad, vuelta: number) => ((vuelta % a.versiones.length) + a.versiones.length) % a.versiones.length;

/**
 * La práctica de una lección: una sola, la que cuenta, completa (desde el 26-nov junta lo de la guiada: el Relámpago del
 * comienzo y la pista, que deja esa actividad en la mitad). Se repite sin límite y vale la mejor.
 */
async function empezarLeccion(acceso: Acceso, leccionId: string): Promise<{ error: number; message: string } | IntentoVista> {
  const p = await practicaDeLeccion(acceso, leccionId);
  if (!p) return { error: 404, message: "No se encontró la lección." };
  if (p.falta) return { error: 409, message: p.falta };
  const userId = acceso.userId!;
  const modo = "cuenta" as const;
  // un intento a medias se retoma (en el teléfono se corta a veces)
  const { rows: abiertos } = await pool.query(
    `SELECT id FROM academia_practicas_intentos WHERE user_id = $1 AND leccion_id = $2 AND modo = $3 AND prueba = $4 AND terminado_at IS NULL AND created_at > now() - interval '1 day'
      ORDER BY id DESC LIMIT 1`,
    [userId, leccionId, modo, p.prueba],
  );
  if (abiertos[0]) {
    const f = await intentoDe(Number(abiertos[0].id), userId);
    if (f && f.items.every((e) => actividadPorId(e.leccion, e.actividad))) return vistaIntento(f);
  }
  const { rows: previos } = await pool.query(`SELECT count(*)::int AS n FROM academia_practicas_intentos WHERE user_id = $1 AND leccion_id = $2 AND prueba = $3`, [userId, leccionId, p.prueba]);
  const vuelta = Number(previos[0]?.n ?? 0);
  const actividades = actividadesDe(leccionId) ?? [];
  const semilla = randomInt(1, 2 ** 31 - 1);
  const lista = ordenVariado(actividades.map((a) => ({ leccion: leccionId, a, version: versionPara(a, vuelta) })), semilla);
  const items = conFormatos(lista, modo, semilla);
  return vistaIntento(await crearIntento(userId, modo, p.materia.id, leccionId, p.prueba, items, semilla));
}

/**
 * El reto de dominio de una lección (los puntos extra, 26-nov): con la materia aprobada por el curso, todas las
 * actividades en su forma más difícil y sin pistas. Con 90 o más queda dominado y suma su parte de lo que le falta a la
 * nota para llegar a 100. Se repite sin límite.
 */
async function empezarReto(acceso: Acceso, leccionId: string): Promise<{ error: number; message: string } | IntentoVista> {
  const p = await practicaDeLeccion(acceso, leccionId);
  if (!p) return { error: 404, message: "No se encontró la lección." };
  if (p.falta) return { error: 409, message: p.falta };
  if (!p.reto?.abierto) return { error: 409, message: p.reto?.falta ?? "El reto todavía no está abierto." };
  const userId = acceso.userId!;
  const { rows: abiertos } = await pool.query(
    `SELECT id FROM academia_practicas_intentos WHERE user_id = $1 AND leccion_id = $2 AND modo = 'reto' AND prueba = $3 AND terminado_at IS NULL AND created_at > now() - interval '1 day'
      ORDER BY id DESC LIMIT 1`,
    [userId, leccionId, p.prueba],
  );
  if (abiertos[0]) {
    const f = await intentoDe(Number(abiertos[0].id), userId);
    if (f && f.items.every((e) => actividadPorId(e.leccion, e.actividad))) return vistaIntento(f);
  }
  const { rows: previos } = await pool.query(`SELECT count(*)::int AS n FROM academia_practicas_intentos WHERE user_id = $1 AND leccion_id = $2 AND prueba = $3`, [userId, leccionId, p.prueba]);
  const vuelta = Number(previos[0]?.n ?? 0);
  const semilla = randomInt(1, 2 ** 31 - 1);
  const lista = ordenVariado((actividadesDe(leccionId) ?? []).map((a) => ({ leccion: leccionId, a, version: versionPara(a, vuelta + 1) })), semilla);
  const items = lista.map(({ leccion, a, version }) => nuevoEstado(leccion, a, version, semilla, formatoDificil(a, version)));
  return vistaIntento(await crearIntento(userId, "reto", p.materia.id, leccionId, p.prueba, items, semilla));
}

/** Actualiza el calendario de una actividad después de responderla (en la práctica del día y en la misión). */
async function repasar(userId: number, e: EstadoItem, a: Actividad, puntaje: number) {
  const { rows } = await pool.query(`SELECT escalon FROM academia_practicas_items WHERE user_id = $1 AND clave = $2`, [userId, claveDe(e.leccion, a.id)]);
  if (!rows[0]) return;
  const sig = siguienteEscalon(Number(rows[0].escalon), puntaje);
  const bien = puntaje >= 0.8;
  await pool.query(
    `UPDATE academia_practicas_items
        SET escalon = $3::int, vueltas = vueltas + 1, aciertos = aciertos + $4::int, fallos = fallos + $5::int,
            fallos_seguidos = CASE WHEN $4::int = 1 THEN 0 ELSE fallos_seguidos + $5::int END,
            proximo_at = CASE WHEN $6::int IS NULL THEN NULL ELSE now() + make_interval(days => $6::int) END,
            firme_at = CASE WHEN firme_at IS NULL AND $3::int >= $7::int THEN now() ELSE firme_at END,
            ultima_at = now()
      WHERE user_id = $1 AND clave = $2`,
    [userId, claveDe(e.leccion, a.id), sig.escalon, bien ? 1 : 0, puntaje < 0.5 ? 1 : 0, sig.dias, ESCALON_FIRME],
  );
}

async function responder(userId: number, id: number, n: number, r: RespuestaPractica): Promise<{ error: number; message: string } | Devolucion> {
  const f = await intentoDe(id, userId);
  if (!f) return { error: 404, message: "No se encontró esa práctica." };
  if (f.terminado_at) return { error: 409, message: "Esa práctica ya terminó." };
  const e = f.items[n];
  if (!e) return { error: 400, message: "Esa actividad no está en la práctica." };
  const a = actividadPorId(e.leccion, e.actividad);
  if (!a) return { error: 410, message: "Esa actividad cambió. Empieza la práctica otra vez." };
  if (e.terminada) return { error: 409, message: "Esa actividad ya la respondiste." };
  if (!r || (r as any).pieza !== a.pieza || !(PIEZAS as readonly string[]).includes(String((r as any).pieza))) return { error: 400, message: "Respuesta no válida." };
  let salida: { devolucion: Devolucion; estado: EstadoItem };
  try {
    salida = contestar(a, e, r);
  } catch (err: any) {
    return { error: 400, message: err?.message || "Respuesta no válida." };
  }
  const items = [...f.items];
  items[n] = salida.estado;
  await pool.query(`UPDATE academia_practicas_intentos SET items = $2::jsonb WHERE id = $1`, [id, JSON.stringify(items)]);
  if (esCalificable(a.pieza)) {
    await pool.query(
      `INSERT INTO academia_practicas_respuestas (intento_id, user_id, materia_id, leccion_id, clave, version, paso, pieza, modo, prueba, puntaje, respuesta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb)`,
      [id, userId, f.materia_id, e.leccion, claveDe(e.leccion, a.id), e.version, e.paso, a.pieza, f.modo, f.prueba, salida.devolucion.puntaje, JSON.stringify(resumenRespuesta(a, e, r))],
    );
  }
  if (!f.prueba && salida.estado.terminada && (f.modo === "dia" || f.modo === "mision") && esCalificable(a.pieza)) {
    await repasar(userId, e, a, salida.estado.puntaje ?? 0);
  }
  return salida.devolucion;
}

/** Lo que se guarda de cada respuesta para el panel (el texto de lo que eligió, no solo su número). */
function resumenRespuesta(a: Actividad, e: EstadoItem, r: RespuestaPractica): unknown {
  const v: any = a.versiones[e.version];
  const res = r as any;
  const ronda = e.rondas?.[e.paso];
  switch (formatoDe(a, e)) {
    case "relampago":
      return { elegida: v.tarjetas[ronda?.opciones?.[res.opcion] ?? -1]?.reverso ?? null };
    case "elige-pareja":
      return { elegida: v.pares[ronda?.opciones?.[res.opcion] ?? -1]?.[1] ?? null };
    case "desliza":
      return { elegida: v.grupos[res.grupo] ?? null, frase: v.frases[e.orden.frases?.[e.paso] ?? -1]?.texto ?? null };
    case "intruso":
      return { elegida: v.frases[ronda?.frases?.[res.frase] ?? -1]?.texto ?? null };
    case "escalones":
      return { elegida: listaDe(a, v).textos[ordenDeLista(a, e).filter((k: number) => k >= e.paso)[res.opcion] ?? -1] ?? null };
    case "donde-va":
      return { elegida: Number.isInteger(res.opcion) ? `En el lugar ${res.opcion + 1}` : null };
    case "cual-falsa": {
      const x = ronda?.items?.[res.frase];
      return { elegida: x ? (a.versiones[x.v] as any).afirmaciones[x.i].texto : null };
    }
    default:
      break;
  }
  switch (r.pieza) {
    case "situacion":
      return { elegida: v.opciones[e.orden.opciones?.[res.opcion] ?? -1]?.texto ?? null };
    case "error":
      return { elegida: v.frases[e.orden.frases?.[r.frase] ?? -1] ?? null };
    case "verdad":
      return { verdad: res.verdad };
    case "completa":
      return { huecos: r.huecos };
    case "explica":
      return { texto: String(r.texto ?? "").slice(0, 600) };
    case "escenario": {
      const esc = v.escenas.find((x: any) => x.id === e.escena);
      return { escena: e.escena, elegida: esc?.opciones[e.orden[`esc:${esc?.id}`]?.[res.opcion] ?? -1]?.texto ?? null };
    }
    default:
      return r;
  }
}

/** Las medallas nuevas de un alumno (las que se ganan con lo que ya hizo). */
async function medallasNuevas(userId: number, materiaId: string): Promise<{ clave: string; nombre: string }[]> {
  const nuevas: string[] = [];
  const m = materiaPorId(materiaId);
  const { rows: ya } = await pool.query(`SELECT clave FROM academia_practicas_medallas WHERE user_id = $1`, [userId]);
  const tiene = new Set((ya as any[]).map((r) => String(r.clave)));
  const quiere = (c: string) => !tiene.has(c) && nuevas.push(c);
  const { rows: al } = await pool.query(`SELECT racha FROM academia_alumnos WHERE user_id = $1`, [userId]);
  const racha = Number(al[0]?.racha ?? 0);
  if (racha >= 7) quiere("racha-7");
  if (racha >= 30) quiere("racha-30");
  const { rows: ex } = await pool.query(`SELECT count(*)::int AS n FROM academia_practicas_respuestas WHERE user_id = $1 AND pieza = 'explica' AND NOT prueba AND puntaje >= 0.8`, [userId]);
  if (Number(ex[0]?.n ?? 0) >= 50) quiere("explica-50");
  const { rows: pf } = await pool.query(`SELECT count(*)::int AS n FROM academia_practicas_lecciones WHERE user_id = $1 AND estrellas >= 3 AND leccion_id NOT LIKE 'mision:%'`, [userId]);
  if (Number(pf[0]?.n ?? 0) >= 10) quiere("perfectas-10");
  if (m && materiaConPracticas(m.id)) {
    const ids = m.lecciones.map((l) => l.id);
    const res = await resumenesDe(userId, ids);
    if (ids.every((id) => (res.get(id)?.estrellas ?? 0) >= 2)) quiere(`dominada:${m.id}`);
    const { rows: fi } = await pool.query(
      `SELECT count(*)::int AS total, (count(*) FILTER (WHERE escalon >= $3))::int AS firmes FROM academia_practicas_items WHERE user_id = $1 AND materia_id = $2`,
      [userId, m.id, ESCALON_FIRME],
    );
    const calificables = ids.reduce((s, id) => s + (actividadesDe(id) ?? []).filter((a) => esCalificable(a.pieza)).length, 0);
    if (calificables > 0 && Number(fi[0]?.firmes ?? 0) >= calificables) quiere(`firme:${m.id}`);
    const mision = (await resumenesDe(userId, [`mision:${m.id}`])).get(`mision:${m.id}`);
    if ((mision?.mejor ?? 0) >= PRACTICAS.domina) quiere(`mision:${m.id}`);
  }
  if (nuevas.length) await pool.query(`INSERT INTO academia_practicas_medallas (user_id, clave) SELECT $1, unnest($2::text[]) ON CONFLICT DO NOTHING`, [userId, nuevas]);
  return nuevas.map((clave) => ({ clave, nombre: medallaPractica(clave)?.nombre ?? clave }));
}

async function terminar(userId: number, id: number): Promise<{ error: number; message: string } | ResultadoPractica> {
  const f = await intentoDe(id, userId);
  if (!f) return { error: 404, message: "No se encontró esa práctica." };
  const calificables = f.items.filter((e) => {
    const a = actividadPorId(e.leccion, e.actividad);
    return a && esCalificable(a.pieza);
  });
  // (en la que cuenta, la actividad en la que pidió la pista vale la mitad)
  const valor = (e: EstadoItem) => (e.terminada ? (f.modo === "cuenta" && e.pista ? Math.min(e.puntaje ?? 0, 0.5) : e.puntaje ?? 0) : 0);
  const puntaje = notaIntento(calificables.map(valor));
  // lo que sacó en cada objetivo (en la práctica de una lección)
  const porObjetivo = new Map<number, number[]>();
  for (const e of calificables) {
    const a = actividadPorId(e.leccion, e.actividad)!;
    porObjetivo.set(a.objetivo, [...(porObjetivo.get(a.objetivo) ?? []), valor(e)]);
  }
  const objetivosPct: Record<string, number> = {};
  for (const [o, lista] of porObjetivo) objetivosPct[String(o)] = notaIntento(lista);
  const ya = !!f.terminado_at;
  if (!ya) await pool.query(`UPDATE academia_practicas_intentos SET terminado_at = now(), puntaje = $2 WHERE id = $1`, [id, puntaje]);
  const leccionId = f.leccion_id;
  const clave = f.modo === "mision" ? `mision:${f.materia_id}` : leccionId;
  let antes = 0;
  let estrellas = 0;
  let mejor: number | null = null;
  let medallas: { clave: string; nombre: string }[] = [];
  let extra: ResultadoPractica["extra"] = null;
  if (!f.prueba && f.modo === "reto" && leccionId && !ya) {
    const m = materiaPorId(f.materia_id);
    const antesX = await materiaDelAlumno(userId, f.materia_id);
    await pool.query(
      `INSERT INTO academia_practicas_lecciones (user_id, leccion_id, materia_id, reto_mejor, reto_at) VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (user_id, leccion_id) DO UPDATE SET
         reto_at = CASE WHEN academia_practicas_lecciones.reto_mejor IS NULL OR EXCLUDED.reto_mejor > academia_practicas_lecciones.reto_mejor THEN now() ELSE academia_practicas_lecciones.reto_at END,
         reto_mejor = GREATEST(COALESCE(academia_practicas_lecciones.reto_mejor, 0), EXCLUDED.reto_mejor), updated_at = now()`,
      [userId, leccionId, f.materia_id, puntaje],
    );
    const r1 = (await resumenesDe(userId, [leccionId])).get(leccionId);
    mejor = r1?.reto ?? puntaje;
    estrellas = estrellasDe(hecha(r1), r1?.mejor ?? null);
    antes = estrellas;
    if (m && (await retoAbierto(userId, m))) {
      const nuevo = await recalcularMateria(userId, m).catch(() => null);
      const despues = await materiaDelAlumno(userId, f.materia_id);
      extra = { antes: antesX.extra, ahora: despues.extra, nota: nuevo?.nota ?? despues.nota ?? 0 };
    }
    await marcarEstudio(userId);
    medallas = await medallasNuevas(userId, f.materia_id);
  } else if (!f.prueba && clave && !ya) {
    const r0 = (await resumenesDe(userId, [clave])).get(clave);
    antes = estrellasDe(hecha(r0), r0?.mejor ?? null);
    if (f.modo === "guiada" && leccionId) {
      await pool.query(
        `INSERT INTO academia_practicas_lecciones (user_id, leccion_id, materia_id, guiada_at, intentos) VALUES ($1, $2, $3, now(), 1)
         ON CONFLICT (user_id, leccion_id) DO UPDATE SET guiada_at = COALESCE(academia_practicas_lecciones.guiada_at, now()), intentos = academia_practicas_lecciones.intentos + 1, updated_at = now()`,
        [userId, leccionId, f.materia_id],
      );
      // lo practicado entra al calendario: vuelve mañana (si ya estaba, sigue su calendario)
      const acts = (actividadesDe(leccionId) ?? []).filter((a) => esCalificable(a.pieza));
      if (acts.length) {
        await pool.query(
          `INSERT INTO academia_practicas_items (user_id, clave, materia_id, leccion_id, objetivo, escalon, proximo_at)
           SELECT $1, x.clave, $2, $3, x.objetivo, 0, now() + interval '1 day' FROM unnest($4::text[], $5::int[]) AS x(clave, objetivo)
           ON CONFLICT (user_id, clave) DO NOTHING`,
          [userId, f.materia_id, leccionId, acts.map((a) => claveDe(leccionId, a.id)), acts.map((a) => a.objetivo)],
        );
      }
    } else if ((f.modo === "cuenta" && leccionId) || f.modo === "mision") {
      await pool.query(
        `INSERT INTO academia_practicas_lecciones (user_id, leccion_id, materia_id, mejor, objetivos, intentos, guiada_at) VALUES ($1, $2, $3, $4, $5::jsonb, 1, $6)
         ON CONFLICT (user_id, leccion_id) DO UPDATE SET
           objetivos = CASE WHEN academia_practicas_lecciones.mejor IS NULL OR EXCLUDED.mejor > academia_practicas_lecciones.mejor THEN EXCLUDED.objetivos ELSE academia_practicas_lecciones.objetivos END,
           mejor = GREATEST(COALESCE(academia_practicas_lecciones.mejor, 0), EXCLUDED.mejor),
           intentos = academia_practicas_lecciones.intentos + 1, updated_at = now()`,
        [userId, clave, f.materia_id, puntaje, JSON.stringify(objetivosPct), f.modo === "mision" ? new Date() : null],
      );
      // lo practicado entra al calendario (vuelve mañana; si ya estaba, sigue su calendario) y lo que falló vuelve mañana
      if (f.modo === "cuenta" && leccionId) {
        const acts = (actividadesDe(leccionId) ?? []).filter((a) => esCalificable(a.pieza));
        if (acts.length) {
          await pool.query(
            `INSERT INTO academia_practicas_items (user_id, clave, materia_id, leccion_id, objetivo, escalon, proximo_at)
             SELECT $1, x.clave, $2, $3, x.objetivo, 0, now() + interval '1 day' FROM unnest($4::text[], $5::int[]) AS x(clave, objetivo)
             ON CONFLICT (user_id, clave) DO NOTHING`,
            [userId, f.materia_id, leccionId, acts.map((a) => claveDe(leccionId, a.id)), acts.map((a) => a.objetivo)],
          );
        }
        for (const e of calificables) {
          if ((e.puntaje ?? 0) >= 0.5 && e.terminada) {
            await pool.query(`UPDATE academia_practicas_items SET fallos_seguidos = 0 WHERE user_id = $1 AND clave = $2`, [userId, claveDe(e.leccion, e.actividad)]);
            continue;
          }
          await pool.query(
            `UPDATE academia_practicas_items SET escalon = GREATEST(0, escalon - 2), proximo_at = now() + interval '1 day', fallos = fallos + 1, fallos_seguidos = fallos_seguidos + 1, ultima_at = now()
              WHERE user_id = $1 AND clave = $2`,
            [userId, claveDe(e.leccion, e.actividad)],
          );
        }
      }
    }
    const r1 = (await resumenesDe(userId, [clave])).get(clave);
    mejor = r1?.mejor ?? null;
    estrellas = estrellasDe(f.modo === "mision" ? true : hecha(r1), r1?.mejor ?? null);
    await pool.query(`UPDATE academia_practicas_lecciones SET estrellas = $3 WHERE user_id = $1 AND leccion_id = $2`, [userId, clave, estrellas]);
    await marcarEstudio(userId);
    medallas = await medallasNuevas(userId, f.materia_id);
    const m = materiaPorId(f.materia_id);
    // (quien ya aprobó practica libre: la práctica ya no le cambia la nota; el reto de dominio sí la puede subir)
    if (m && f.modo === "cuenta" && (await practicasObligatorias(userId, m))) await recalcularMateria(userId, m).catch(() => undefined);
  } else if (f.prueba) {
    estrellas = estrellasDe(true, f.modo === "guiada" ? null : puntaje);
    mejor = f.modo === "guiada" ? null : puntaje;
  } else if (!f.prueba && f.modo === "dia" && !ya) {
    await marcarEstudio(userId);
  }
  // los estados de los objetivos
  let objetivos: ObjetivoResultado[] = [];
  if (leccionId && (f.modo === "guiada" || f.modo === "cuenta")) {
    const acts = actividadesDe(leccionId) ?? [];
    const r = f.prueba ? undefined : (await resumenesDe(userId, [leccionId])).get(leccionId);
    const firmes = f.prueba ? new Map<number, boolean>() : await firmesPorObjetivo(userId, leccionId, acts);
    objetivos = (CONTENIDO.get(leccionId)?.objetivos ?? []).map((texto, n) => {
      const pct = objetivosPct[String(n)] ?? 0;
      const mejorPct = r?.objetivos?.[String(n)] ?? null;
      return { n, texto, pct, estado: estadoObjetivo(f.prueba ? true : hecha(r), f.prueba ? (f.modo === "guiada" ? null : pct) : mejorPct, firmes.get(n) ?? false) };
    });
  }
  const { rows: prox } = await pool.query(`SELECT min(proximo_at) AS p FROM academia_practicas_items WHERE user_id = $1 AND proximo_at IS NOT NULL`, [userId]);
  let siguiente: ResultadoPractica["siguiente"] = null;
  if (leccionId) {
    const l = leccionPorId(leccionId);
    const sig = l ? l.materia.lecciones[l.indice + 1] : undefined;
    siguiente = sig ? { tipo: "leccion", href: `/academia/leccion/${sig.id}`, texto: "Ir a la próxima lección" } : { tipo: "materia", href: `/academia/materia/${f.materia_id}`, texto: "Volver a la materia" };
  } else if (f.modo === "mision") siguiente = { tipo: "materia", href: `/academia/materia/${f.materia_id}`, texto: "Volver a la materia" };
  else siguiente = { tipo: "dia", href: "/academia/practicar", texto: "Volver a Practicar" };
  return {
    modo: f.modo,
    puntaje,
    estrellas,
    antes,
    objetivos,
    proxima: iso(prox[0]?.p),
    medallas,
    mejor,
    extra,
    siguiente,
    prueba: f.prueba,
  };
}

// ---------------------------------------------------------------- la práctica del día

async function resumenDelDia(userId: number): Promise<PracticaDelDiaResumen> {
  const { rows } = await pool.query(
    `SELECT (count(*) FILTER (WHERE proximo_at <= now()))::int AS pendientes,
            min(proximo_at) FILTER (WHERE proximo_at > now()) AS proxima,
            (count(*) FILTER (WHERE escalon >= $2))::int AS firmes,
            count(*)::int AS total
       FROM academia_practicas_items WHERE user_id = $1`,
    [userId, ESCALON_FIRME],
  );
  const f = rows[0] ?? {};
  return { pendientes: Number(f.pendientes ?? 0), proxima: iso(f.proxima), firmes: Number(f.firmes ?? 0), total: Number(f.total ?? 0) };
}

async function practicaDelDia(userId: number): Promise<IntentoVista | { vacio: true; resumen: PracticaDelDiaResumen }> {
  // la de hoy a medias se retoma
  const { rows: abiertos } = await pool.query(
    `SELECT id FROM academia_practicas_intentos WHERE user_id = $1 AND modo = 'dia' AND terminado_at IS NULL AND created_at >= $2 ORDER BY id DESC LIMIT 1`,
    [userId, inicioDiaTexas()],
  );
  if (abiertos[0]) {
    const f = await intentoDe(Number(abiertos[0].id), userId);
    if (f && f.items.some((e) => !e.terminada) && f.items.every((e) => actividadPorId(e.leccion, e.actividad))) return vistaIntento(f);
  }
  const { rows } = await pool.query(
    `SELECT clave, leccion_id, materia_id, vueltas FROM academia_practicas_items WHERE user_id = $1 AND proximo_at <= now() ORDER BY proximo_at, clave LIMIT 60`,
    [userId],
  );
  const lista = (rows as any[])
    .map((r) => ({ clave: String(r.clave), leccion: String(r.leccion_id), materia: String(r.materia_id), vueltas: Number(r.vueltas) }))
    .filter((x) => !!actividadPorId(x.leccion, actividadDeClave(x.clave)) && !!materiaPorId(x.materia)?.disponible);
  const elegidas = intercalarPorLeccion(lista, PRACTICAS.porDia);
  if (!elegidas.length) return { vacio: true, resumen: await resumenDelDia(userId) };
  const semilla = randomInt(1, 2 ** 31 - 1);
  // (la versión va rotando con cada repaso; el primero trae la de la guiada, no la que acaba de ver en la que cuenta)
  const items = conFormatos(
    elegidas.map((x) => {
      const a = actividadPorId(x.leccion, actividadDeClave(x.clave))!;
      return { leccion: x.leccion, a, version: versionPara(a, x.vueltas) };
    }),
    "dia",
    semilla,
  );
  return vistaIntento(await crearIntento(userId, "dia", elegidas[0].materia, null, false, items, semilla));
}

// ---------------------------------------------------------------- el camino y la misión

async function caminoDe(acceso: Acceso, m: MateriaDef): Promise<CaminoMateria> {
  const modo = await modoDe(acceso, m.id);
  const ids = m.lecciones.map((l) => l.id);
  const hechas = modo.userId && modo.inscrito ? await completadas(modo.userId, ids) : new Set<string>();
  const res = modo.userId && !modo.prueba ? await resumenesDe(modo.userId, [...ids, `mision:${m.id}`]) : new Map<string, Resumen>();
  const paradas = m.lecciones.map((l, i) => {
    const r = res.get(l.id);
    return {
      leccion: { id: l.id, titulo: l.titulo, n: i + 1, completada: hechas.has(l.id) },
      existe: !!actividadesDe(l.id),
      guiada: hecha(r),
      estrellas: estrellasDe(hecha(r), r?.mejor ?? null),
      mejor: r?.mejor ?? null,
      abierta: modo.prueba || hechas.has(l.id),
    };
  });
  const completa = materiaConPracticas(m.id);
  const todas = ids.every((id) => hechas.has(id));
  const mision = res.get(`mision:${m.id}`);
  const cuenta = !modo.prueba && (await practicasCuentan(modo.userId, m));
  const aprobada = !modo.prueba && !!modo.userId && (await materiaAprobadaPor(modo.userId, m.id));
  return {
    materia: { id: m.id, titulo: m.titulo, nivel: (m.nivel ?? null) as NivelN | null },
    paradas,
    completa,
    estrellas: paradas.reduce((s, p) => s + p.estrellas, 0),
    posibles: paradas.filter((p) => p.existe).length * 3,
    mision: {
      abierta: completa && (modo.prueba || todas),
      mejor: mision?.mejor ?? null,
      falta: !completa ? "La misión se abre cuando todas las lecciones tengan su práctica." : modo.prueba || todas ? null : "Termina todas las lecciones para abrir la misión.",
      titulo: PRACTICAS_POR_MATERIA.get(m.id)?.mision?.titulo ?? "Misión de la materia",
    },
    cuentaEnNota: cuenta,
    reto: modo.userId && !modo.prueba && completa && (await retoAbierto(modo.userId, m)) ? await (async () => {
      const x = await materiaDelAlumno(modo.userId!, m.id);
      const base = x.base ?? x.nota ?? 0;
      const dominadas = ids.filter((id) => (res.get(id)?.reto ?? 0) >= PRACTICAS.retoDomina).length;
      return { abierto: true, extra: x.extra, posible: Math.max(0, 100 - base), dominadas, lecciones: ids.length, base };
    })() : null,
    obligatoria: cuenta && !aprobada && !!modo.userId,
    aprobada,
    componente: cuenta && modo.userId ? componentePracticas(ids.map((id) => res.get(id)?.mejor ?? null)) : null,
  };
}

async function empezarMision(acceso: Acceso, m: MateriaDef): Promise<{ error: number; message: string } | IntentoVista> {
  const c = await caminoDe(acceso, m);
  if (!acceso.userId) return { error: 401, message: "Entra con tu cuenta." };
  const modo = await modoDe(acceso, m.id);
  if (!modo.inscrito && !modo.prueba) return { error: 409, message: "Inscríbete en la materia para practicar." };
  if (!c.mision.abierta) return { error: 409, message: c.mision.falta ?? "La misión todavía no está abierta." };
  const userId = acceso.userId;
  const { rows } = await pool.query(`SELECT clave, escalon FROM academia_practicas_items WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const escalon = new Map((rows as any[]).map((r) => [String(r.clave), Number(r.escalon)]));
  const semilla = randomInt(1, 2 ** 31 - 1);
  // de cada lección, lo más flojo primero; después, hasta 6, lo que sigue más flojo de todas
  const porLeccion = m.lecciones.map((l) =>
    (actividadesDe(l.id) ?? [])
      .filter((a) => esCalificable(a.pieza) && a.pieza !== "explica")
      .map((a) => ({ l: l.id, a, k: escalon.get(claveDe(l.id, a.id)) ?? 0, r: (semilla ^ a.id.length * 7919 ^ l.id.length * 31) % 997 }))
      .sort((x, y) => x.k - y.k || x.r - y.r),
  );
  const elegidas = porLeccion.map((lista) => lista[0]).filter(Boolean);
  const resto = porLeccion.flatMap((lista) => lista.slice(1)).sort((x, y) => x.k - y.k || x.r - y.r);
  while (elegidas.length < Math.max(6, m.lecciones.length) && resto.length) elegidas.push(resto.shift()!);
  const items = conFormatos(
    elegidas.map((x) => ({ leccion: x.l, a: x.a, version: versionPara(x.a, (escalon.get(claveDe(x.l, x.a.id)) ?? 0) + 1) })),
    "mision",
    semilla,
  );
  return vistaIntento(await crearIntento(userId, "mision", m.id, null, modo.prueba, items, semilla));
}

// ---------------------------------------------------------------- los juegos libres

const mezclar = <T,>(lista: T[]) => {
  const out = [...lista];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

async function juegoDe(acceso: Acceso, materiaId: string | null): Promise<JuegoVista> {
  const userId = acceso.userId!;
  const prueba = puedeRevisar(acceso.role);
  // las lecciones terminadas del alumno (la Administración juega con las de la materia o con todo el Nivel 1)
  let lecciones: string[];
  const m = materiaId ? materiaPorId(materiaId) : undefined;
  if (prueba) lecciones = m ? m.lecciones.map((l) => l.id) : [...PRACTICAS_POR_MATERIA.values()].flatMap((p) => Object.keys(p.lecciones));
  else {
    const { rows } = await pool.query(`SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND completada_at IS NOT NULL`, [userId]);
    lecciones = (rows as any[]).map((r) => String(r.leccion_id)).filter((id) => !m || leccionPorId(id)?.materia.id === m.id);
  }
  const preguntas: JuegoPregunta[] = [];
  for (const id of lecciones) {
    const l = leccionPorId(id);
    if (!l || !l.materia.disponible) continue;
    for (const p of BANCOS.get(l.materia.id)?.repaso[id] ?? []) {
      const opciones = mezclar([p.correcta, ...p.falsas]);
      preguntas.push({ tipo: "eleccion", id: p.id, texto: p.texto, opciones, correcta: opciones.indexOf(p.correcta), explica: p.explica, leccion: l.leccion.titulo });
    }
    for (const a of actividadesDe(id) ?? []) {
      if (a.pieza !== "verdad") continue;
      a.versiones.forEach((v, vi) =>
        v.afirmaciones.forEach((af, ai) => preguntas.push({ tipo: "verdad", id: `${id}:${a.id}:${vi}:${ai}`, texto: af.texto, verdad: af.verdad, explica: af.explica, leccion: l.leccion.titulo })),
      );
    }
  }
  const { rows: marcas } = await pool.query(`SELECT juego, mejor FROM academia_practicas_marcas WHERE user_id = $1`, [userId]);
  const marca = (j: string) => {
    const r = (marcas as any[]).find((x) => x.juego === `${j}${m ? `:${m.id}` : ""}`);
    return r ? Number(r.mejor) : null;
  };
  return { preguntas: mezclar(preguntas).slice(0, 80), marcas: { carrera: marca("carrera"), racha: marca("racha") }, alcance: m ? m.titulo : "Todo lo que ya estudiaste" };
}

// ---------------------------------------------------------------- las rutas del alumno

function enviar(res: Response, out: { error: number; message: string } | object) {
  res.setHeader("Cache-Control", "no-store");
  if ("error" in out && typeof (out as any).error === "number") return res.status((out as any).error).json({ message: (out as any).message });
  res.json(out);
}

async function conAcceso(req: Request, res: Response): Promise<Acceso | null> {
  const acceso = await accesoDe(req);
  if (!acceso.ver) {
    res.status(403).json({ message: MENSAJE_CERRADA });
    return null;
  }
  return acceso;
}

async function conCuenta(req: Request, res: Response): Promise<(Acceso & { userId: number }) | null> {
  const acceso = await conAcceso(req, res);
  if (!acceso) return null;
  if (!acceso.userId) {
    res.status(401).json({ message: "Entra con tu cuenta." });
    return null;
  }
  return acceso as Acceso & { userId: number };
}

export function registerAcademiaPracticasRoutes(app: Express) {
  void asegurarConfig().catch((e) => console.error("[academia] prácticas, config:", e?.message));

  app.get("/api/academia/practicas/leccion/:leccionId", async (req, res) => {
    try {
      const acceso = await conAcceso(req, res);
      if (!acceso) return;
      const p = await practicaDeLeccion(acceso, String(req.params.leccionId));
      if (!p) return res.status(404).json({ message: "No se encontró la lección." });
      enviar(res, p);
    } catch (err) {
      console.error("[academia] prácticas, lección:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/practicas/leccion/:leccionId/empezar", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      // (desde el 26-nov hay una sola práctica: el `modo` que mande un teléfono con la versión de antes no cambia nada)
      if (frenar(`prac-empezar:${acceso.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      enviar(res, await enFila(acceso.userId, () => empezarLeccion(acceso, String(req.params.leccionId))));
    } catch (err) {
      console.error("[academia] prácticas, empezar:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/practicas/leccion/:leccionId/reto", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      if (frenar(`prac-reto:${acceso.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      enviar(res, await enFila(acceso.userId, () => empezarReto(acceso, String(req.params.leccionId))));
    } catch (err) {
      console.error("[academia] prácticas, reto:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/practicas/intento/:id/responder", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const id = Number(req.params.id);
      const n = Number(req.body?.n);
      if (!Number.isInteger(id) || !Number.isInteger(n) || n < 0) return res.status(400).json({ message: "Respuesta no válida." });
      if (frenar(`prac-resp:${acceso.userId}`, 200)) return res.status(429).json({ message: "Espera un momento." });
      enviar(res, await enFila(acceso.userId, () => responder(acceso.userId, id, n, req.body?.respuesta as RespuestaPractica)));
    } catch (err) {
      console.error("[academia] prácticas, responder:", err);
      res.sendStatus(500);
    }
  });

  // La pista: la frase de la lección que ayuda. Queda anotado que la pidió: en la que cuenta, esa actividad vale la mitad.
  app.post("/api/academia/practicas/intento/:id/pista", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const id = Number(req.params.id);
      const n = Number(req.body?.n);
      const out = await enFila(acceso.userId, async () => {
        const f = await intentoDe(id, acceso.userId);
        if (!f || f.terminado_at) return { error: 404, message: "No se encontró esa práctica." };
        if (f.modo !== "guiada" && f.modo !== "cuenta") return { error: 409, message: "En esta práctica no hay pistas." };
        const e = f.items[n];
        const a = e ? actividadPorId(e.leccion, e.actividad) : null;
        if (!e || !a) return { error: 400, message: "Esa actividad no está en la práctica." };
        const items = [...f.items];
        items[n] = { ...e, pista: true };
        await pool.query(`UPDATE academia_practicas_intentos SET items = $2::jsonb WHERE id = $1`, [id, JSON.stringify(items)]);
        return { apoyo: pistaDe(a, e) };
      });
      enviar(res, out);
    } catch (err) {
      console.error("[academia] prácticas, pista:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/practicas/intento/:id/terminar", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ message: "Práctica no válida." });
      enviar(res, await enFila(acceso.userId, () => terminar(acceso.userId, id)));
    } catch (err) {
      console.error("[academia] prácticas, terminar:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/practicas/dia", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      enviar(res, await enFila(acceso.userId, () => practicaDelDia(acceso.userId)));
    } catch (err) {
      console.error("[academia] prácticas, del día:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/practicas/dia/resumen", async (req, res) => {
    try {
      const acceso = await conAcceso(req, res);
      if (!acceso) return;
      enviar(res, acceso.userId ? await resumenDelDia(acceso.userId) : { pendientes: 0, proxima: null, firmes: 0, total: 0 });
    } catch (err) {
      console.error("[academia] prácticas, resumen del día:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/practicas/materia/:materiaId", async (req, res) => {
    try {
      const acceso = await conAcceso(req, res);
      if (!acceso) return;
      const m = materiaPorId(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "No se encontró la materia." });
      enviar(res, await caminoDe(acceso, m));
    } catch (err) {
      console.error("[academia] prácticas, camino:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/practicas/materia/:materiaId/mision", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const m = materiaPorId(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "No se encontró la materia." });
      if (frenar(`prac-mision:${acceso.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      enviar(res, await enFila(acceso.userId, () => empezarMision(acceso, m)));
    } catch (err) {
      console.error("[academia] prácticas, misión:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/practicas/juego", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const materia = typeof req.query.materia === "string" && req.query.materia ? req.query.materia : null;
      enviar(res, await juegoDe(acceso, materia));
    } catch (err) {
      console.error("[academia] prácticas, juego:", err);
      res.sendStatus(500);
    }
  });

  // La marca de un juego libre: solo se guarda si supera la anterior (no cuenta para la nota).
  app.post("/api/academia/practicas/juego/marca", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const juego = req.body?.juego === "racha" ? "racha" : req.body?.juego === "carrera" ? "carrera" : null;
      const puntos = Math.floor(Number(req.body?.puntos));
      const materia = typeof req.body?.materia === "string" && materiaPorId(req.body.materia) ? req.body.materia : null;
      if (!juego || !Number.isInteger(puntos) || puntos < 0 || puntos > 300) return res.status(400).json({ message: "Marca no válida." });
      if (frenar(`prac-marca:${acceso.userId}`, 2000)) return res.status(429).json({ message: "Espera un momento." });
      const clave = `${juego}${materia ? `:${materia}` : ""}`;
      const { rows: antes } = await pool.query(`SELECT mejor FROM academia_practicas_marcas WHERE user_id = $1 AND juego = $2`, [acceso.userId, clave]);
      const previa = antes[0] ? Number(antes[0].mejor) : null;
      if (previa == null || puntos > previa) {
        await pool.query(
          `INSERT INTO academia_practicas_marcas (user_id, juego, mejor) VALUES ($1, $2, $3)
           ON CONFLICT (user_id, juego) DO UPDATE SET mejor = GREATEST(academia_practicas_marcas.mejor, EXCLUDED.mejor), logrado_at = now()`,
          [acceso.userId, clave, puntos],
        );
        await marcarEstudio(acceso.userId);
      }
      enviar(res, { mejor: Math.max(previa ?? 0, puntos), nueva: previa == null || puntos > previa });
    } catch (err) {
      console.error("[academia] prácticas, marca:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/practicas/medallas", async (req, res) => {
    try {
      const acceso = await conCuenta(req, res);
      if (!acceso) return;
      const { rows } = await pool.query(`SELECT clave, logrado_at FROM academia_practicas_medallas WHERE user_id = $1 ORDER BY logrado_at DESC`, [acceso.userId]);
      const out: MedallaPractica[] = (rows as any[]).map((r) => {
        const c = String(r.clave);
        const def = medallaPractica(c);
        const materia = c.includes(":") ? materiaPorId(c.split(":")[1])?.titulo : null;
        return { clave: c, nombre: def?.nombre ?? c, detalle: materia ? `${def?.detalle ?? ""} (${materia})` : def?.detalle ?? "", fecha: iso(r.logrado_at)! };
      });
      enviar(res, { medallas: out, posibles: Object.keys(MEDALLAS_PRACTICA).length });
    } catch (err) {
      console.error("[academia] prácticas, medallas:", err);
      res.sendStatus(500);
    }
  });

  registerPanelRoutes(app);
}

// ---------------------------------------------------------------- el panel de la Administración

export type MateriaPracticasFila = {
  id: string;
  titulo: string;
  nivel: number | null;
  lecciones: number;
  conPractica: number;
  completa: boolean;
  cuenta: boolean;
  desde: string | null;
  alumnos: number;
  intentos: number;
  promedio: number | null;
};

function registerPanelRoutes(app: Express) {
  app.get("/api/academia/direccion/practicas", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      const { rows } = await pool.query(
        `SELECT materia_id, count(DISTINCT user_id)::int AS alumnos, count(*)::int AS intentos, round(avg(puntaje) FILTER (WHERE modo = 'cuenta'))::int AS promedio
           FROM academia_practicas_intentos WHERE NOT prueba AND terminado_at IS NOT NULL GROUP BY materia_id`,
      );
      const stats = new Map((rows as any[]).map((r) => [String(r.materia_id), r]));
      const materias: MateriaPracticasFila[] = [];
      for (const id of PRACTICAS_POR_MATERIA.keys()) {
        const m = materiaPorId(id);
        if (!m) continue;
        const c = await configDe(id);
        const s = stats.get(id);
        materias.push({
          id, titulo: m.titulo, nivel: m.nivel ?? null, lecciones: m.lecciones.length, conPractica: leccionesConPractica(id), completa: c.completa, cuenta: c.cuenta, desde: c.desde,
          alumnos: Number(s?.alumnos ?? 0), intentos: Number(s?.intentos ?? 0), promedio: s?.promedio == null ? null : Number(s.promedio),
        });
      }
      const pesos: Record<string, { actual: Pesos; base: Pesos; sin: Pesos }> = {};
      for (const n of [1, 2, 3, 4, 5] as const) pesos[n] = { actual: await pesosConPracticas(n), base: PESOS_CON_PRACTICAS[n], sin: PESOS_NIVEL[n] };
      const { rows: ayuda } = await pool.query(
        `SELECT i.user_id, u.display_name, u.username, i.materia_id, i.leccion_id, i.objetivo, max(i.fallos_seguidos)::int AS fallos
           FROM academia_practicas_items i JOIN users u ON u.id = i.user_id
          WHERE i.fallos_seguidos >= $1 GROUP BY i.user_id, u.display_name, u.username, i.materia_id, i.leccion_id, i.objetivo ORDER BY fallos DESC LIMIT 100`,
        [PRACTICAS.fallosAyuda],
      );
      enviar(res, {
        materias,
        pesos,
        ayuda: (ayuda as any[]).map((r) => ({
          userId: Number(r.user_id),
          nombre: String(r.display_name || r.username || "Alumno"),
          materia: materiaPorId(String(r.materia_id))?.titulo ?? r.materia_id,
          leccion: leccionPorId(String(r.leccion_id))?.leccion.titulo ?? r.leccion_id,
          objetivo: CONTENIDO.get(String(r.leccion_id))?.objetivos[Number(r.objetivo)] ?? "",
          fallos: Number(r.fallos),
        })),
      });
    } catch (err) {
      console.error("[academia] prácticas, panel:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/direccion/practicas/materia/:materiaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      const m = materiaPorId(String(req.params.materiaId));
      const pm = m ? PRACTICAS_POR_MATERIA.get(m.id) : undefined;
      if (!m || !pm) return res.status(404).json({ message: "Esa materia no tiene prácticas." });
      const { rows } = await pool.query(
        `SELECT clave, count(*)::int AS respuestas, round(100 * avg(puntaje))::int AS acierto
           FROM academia_practicas_respuestas WHERE materia_id = $1 AND NOT prueba GROUP BY clave`,
        [m.id],
      );
      const stats = new Map((rows as any[]).map((r) => [String(r.clave), r]));
      // el error más elegido de cada actividad (en las piezas donde se elige una opción)
      const { rows: errados } = await pool.query(
        `SELECT DISTINCT ON (clave) clave, respuesta->>'elegida' AS elegida, count(*)::int AS veces
           FROM academia_practicas_respuestas WHERE materia_id = $1 AND NOT prueba AND puntaje < 0.5 AND respuesta ? 'elegida'
          GROUP BY clave, respuesta->>'elegida' ORDER BY clave, veces DESC`,
        [m.id],
      );
      const errado = new Map((errados as any[]).map((r) => [String(r.clave), { texto: r.elegida as string | null, veces: Number(r.veces) }]));
      const lecciones = m.lecciones.map((l, i) => ({
        id: l.id,
        n: i + 1,
        titulo: l.titulo,
        objetivos: CONTENIDO.get(l.id)?.objetivos ?? [],
        actividades: (pm.lecciones[l.id] ?? []).map((a) => {
          const s = stats.get(claveDe(l.id, a.id));
          return {
            id: a.id,
            pieza: a.pieza,
            objetivo: a.objetivo,
            versiones: a.versiones.length,
            respuestas: Number(s?.respuestas ?? 0),
            acierto: s?.acierto == null ? null : Number(s.acierto),
            errado: errado.get(claveDe(l.id, a.id)) ?? null,
            contenido: a.versiones,
          };
        }),
      }));
      enviar(res, { materia: { id: m.id, titulo: m.titulo, nivel: m.nivel ?? null }, config: await configDe(m.id), lecciones, mision: pm.mision ?? null });
    } catch (err) {
      console.error("[academia] prácticas, panel de materia:", err);
      res.sendStatus(500);
    }
  });

  // Los pesos de la nota de un nivel cuando las prácticas cuentan.
  app.post("/api/academia/direccion/practicas/pesos", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "gestionar");
      if (!p) return;
      const nivel = Number(req.body?.nivel) as NivelN;
      if (![1, 2, 3, 4, 5].includes(nivel)) return res.status(400).json({ message: "Nivel no válido." });
      const pesos = req.body?.pesos as Pesos;
      if (req.body?.restablecer) {
        await pool.query(`DELETE FROM academia_practicas_pesos WHERE nivel = $1`, [nivel]);
      } else {
        const problema = problemaDePesos(pesos ?? {}, PESOS_NIVEL[nivel]);
        if (problema) return res.status(400).json({ message: problema });
        const limpio = Object.fromEntries((Object.keys(PESOS_NIVEL[nivel]) as (keyof Pesos)[]).map((k) => [k, pesos[k]]));
        await pool.query(
          `INSERT INTO academia_practicas_pesos (nivel, pesos, por) VALUES ($1, $2::jsonb, $3) ON CONFLICT (nivel) DO UPDATE SET pesos = EXCLUDED.pesos, por = EXCLUDED.por, updated_at = now()`,
          [nivel, JSON.stringify(limpio), p.userId],
        );
      }
      olvidarConfig();
      await registrar(req, "academia.practicas.pesos", null, `Cambió los pesos de la nota con prácticas del Nivel ${nivel}.`, req.body?.restablecer ? "Volvió a los pesos de siempre." : JSON.stringify(pesos));
      enviar(res, { pesos: await pesosConPracticas(nivel) });
    } catch (err) {
      console.error("[academia] prácticas, pesos:", err);
      res.sendStatus(500);
    }
  });

  // Si las prácticas de una materia cuentan en la nota (siguen funcionando aunque no cuenten).
  app.post("/api/academia/direccion/practicas/materia/:materiaId/cuenta", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "gestionar");
      if (!p) return;
      const m = materiaPorId(String(req.params.materiaId));
      if (!m || !materiaConPracticas(m.id)) return res.status(404).json({ message: "Esa materia todavía no tiene todas sus prácticas." });
      const cuenta = !!req.body?.cuenta;
      await pool.query(
        `INSERT INTO academia_practicas_config (materia_id, cuenta, por) VALUES ($1, $2, $3) ON CONFLICT (materia_id) DO UPDATE SET cuenta = EXCLUDED.cuenta, por = EXCLUDED.por, updated_at = now()`,
        [m.id, cuenta, p.userId],
      );
      olvidarConfig();
      await registrar(req, "academia.practicas.cuenta", null, `${cuenta ? "Puso" : "Sacó"} las prácticas en la nota de «${m.titulo}».`, null);
      enviar(res, await configDe(m.id));
    } catch (err) {
      console.error("[academia] prácticas, cuenta:", err);
      res.sendStatus(500);
    }
  });

  // La planilla de resultados de una materia: cada alumno, su mejor práctica de cada lección y sus estrellas.
  app.get("/api/academia/direccion/practicas/materia/:materiaId/resultados.csv", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "exportar");
      if (!p) return;
      const m = materiaPorId(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "No se encontró la materia." });
      const ids = m.lecciones.map((l) => l.id);
      const { rows } = await pool.query(
        `SELECT l.user_id, u.display_name, u.username, l.leccion_id, l.mejor, l.estrellas, l.guiada_at
           FROM academia_practicas_lecciones l JOIN users u ON u.id = l.user_id
          WHERE l.leccion_id = ANY($1::text[]) ORDER BY u.display_name, l.user_id`,
        [ids],
      );
      const porAlumno = new Map<number, { nombre: string; lecciones: Map<string, { mejor: number | null; estrellas: number; guiada: boolean }> }>();
      for (const r of rows as any[]) {
        const uid = Number(r.user_id);
        if (!porAlumno.has(uid)) porAlumno.set(uid, { nombre: String(r.display_name || r.username || uid), lecciones: new Map() });
        porAlumno.get(uid)!.lecciones.set(String(r.leccion_id), { mejor: r.mejor == null ? null : Number(r.mejor), estrellas: Number(r.estrellas), guiada: !!r.guiada_at });
      }
      const celda = (s: unknown) => {
        const t = String(s ?? "");
        return /[",\n;]/.test(t) || /^[=+\-@]/.test(t) ? `"${t.replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')}"` : t;
      };
      const encabezado = ["Alumno", ...m.lecciones.map((l, i) => `Lección ${i + 1} (mejor)`), "Componente de prácticas", "Estrellas"];
      const lineas = [encabezado.map(celda).join(",")];
      for (const [, a] of porAlumno) {
        const mejores = ids.map((id) => a.lecciones.get(id)?.mejor ?? null);
        const estrellas = ids.reduce((s, id) => s + (a.lecciones.get(id)?.estrellas ?? 0), 0);
        lineas.push([a.nombre, ...mejores.map((x) => (x == null ? "" : x)), componentePracticas(mejores), estrellas].map(celda).join(","));
      }
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="practicas-${m.id}.csv"`);
      res.send("﻿" + lineas.join("\n"));
    } catch (err) {
      console.error("[academia] prácticas, planilla:", err);
      res.sendStatus(500);
    }
  });

  // Lo que un alumno lleva de las prácticas (para su perfil en el panel y para su informe de materia).
  app.get("/api/academia/direccion/practicas/alumno/:userId/:materiaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const m = materiaPorId(String(req.params.materiaId));
      const userId = Number(req.params.userId);
      if (!m || !Number.isInteger(userId)) return res.status(404).json({ message: "No se encontró." });
      enviar(res, await informeAlumno(userId, m));
    } catch (err) {
      console.error("[academia] prácticas, alumno:", err);
      res.sendStatus(500);
    }
  });
}

export type InformePracticas = {
  cuenta: boolean;
  componente: number;
  lecciones: { id: string; n: number; titulo: string; guiada: boolean; mejor: number | null; estrellas: number; objetivos: ObjetivoResultado[] }[];
  mision: number | null;
};

/** Las prácticas de un alumno en una materia, con el estado de cada objetivo. */
export async function informeAlumno(userId: number, m: MateriaDef): Promise<InformePracticas> {
  const ids = m.lecciones.map((l) => l.id);
  const res = await resumenesDe(userId, [...ids, `mision:${m.id}`]);
  const lecciones = [];
  for (const [i, l] of m.lecciones.entries()) {
    const r = res.get(l.id);
    const firmes = await firmesPorObjetivo(userId, l.id, actividadesDe(l.id) ?? []);
    lecciones.push({ id: l.id, n: i + 1, titulo: l.titulo, guiada: hecha(r), mejor: r?.mejor ?? null, estrellas: estrellasDe(hecha(r), r?.mejor ?? null), objetivos: objetivosDe(l.id, r, firmes) });
  }
  return { cuenta: await practicasCuentan(userId, m), componente: await componentePracticasDe(userId, m), lecciones, mision: res.get(`mision:${m.id}`)?.mejor ?? null };
}

export { leccionDeClave };
