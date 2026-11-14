/**
 * Lo común del servidor de la academia (docs/academia.md): las tablas, quién puede verla, la fila por persona, el
 * texto de los versículos (de la RV1960 de la web) y la nota de cada materia.
 */
import type { Request, Response } from "express";
import { pool } from "./db";
import { numeroDe } from "./orden-examen";
import { getBibleChapter } from "./bible";
import { resolveSiteUrl } from "@shared/site";
import {
  tieneEscritoBreve, miniPruebasDe, MEDIDA_MINI, APRUEBA, APRUEBA_INTEGRAL, EXAMEN_INTEGRAL, NIVELES, SUFICIENCIA, citaVisible, enlaceBiblia, examenDe, materiaAprobada, materiaPorId, notaMateria, parsearCita, pesosDe, veVistaPrevia, type Componentes, type MateriaDef, type MedidaExamen, type NivelN,
} from "@shared/academia";
import { BANCOS } from "./academia/index";

/** Las tablas de la academia (aditivas; todas se borran con la cuenta: server/account-deletion.ts). */
export const ACADEMIA_SQL = `
CREATE TABLE IF NOT EXISTS "academia_alumnos" (
  "user_id" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "matricula" text UNIQUE,
  "promocion" integer,
  "estatus" text NOT NULL DEFAULT 'activo',
  "nivel" integer NOT NULL DEFAULT 1,
  "mentor_user_id" integer,
  "reglamento_at" timestamp,
  "racha" integer NOT NULL DEFAULT 0,
  "racha_fecha" text,
  "inscrito_at" timestamp NOT NULL DEFAULT now(),
  "ultima_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "academia_lecciones" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "leccion_id" text NOT NULL,
  "vista_at" timestamp NOT NULL DEFAULT now(),
  "completada_at" timestamp,
  "repaso" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "reflexion" text,
  PRIMARY KEY ("user_id", "leccion_id")
);
CREATE TABLE IF NOT EXISTS "academia_pruebas" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "clave" text NOT NULL,
  "intentos" integer NOT NULL DEFAULT 0,
  "fallos" integer NOT NULL DEFAULT 0,
  "mejor" integer,
  "ultima" integer,
  "vistas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "curso" jsonb,
  "curso_at" timestamp,
  "fallo_at" timestamp,
  "aprobada_at" timestamp,
  "resultado" jsonb,
  "updated_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("user_id", "clave")
);
CREATE TABLE IF NOT EXISTS "academia_respuestas" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "clave" text NOT NULL,
  "intento" integer NOT NULL,
  "pregunta_id" text NOT NULL,
  "texto" text NOT NULL,
  "nota_auto" integer NOT NULL,
  "detalle" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "revisar" boolean NOT NULL DEFAULT false,
  "nota_final" integer,
  "revisada_por" integer,
  "revisada_at" timestamp,
  "motivo" text,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "academia_respuestas_revisar_idx" ON "academia_respuestas" ("revisar", "revisada_at");
CREATE INDEX IF NOT EXISTS "academia_respuestas_user_idx" ON "academia_respuestas" ("user_id", "clave");
CREATE TABLE IF NOT EXISTS "academia_materias" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "materia_id" text NOT NULL,
  "estado" text NOT NULL DEFAULT 'en-curso',
  "nota" integer,
  "componentes" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "via" text NOT NULL DEFAULT 'cursada',
  "inicio_at" timestamp NOT NULL DEFAULT now(),
  "aprobada_at" timestamp,
  PRIMARY KEY ("user_id", "materia_id")
);
CREATE TABLE IF NOT EXISTS "academia_versiculos" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "materia_id" text NOT NULL,
  "ref" text NOT NULL,
  "intentos" integer NOT NULL DEFAULT 0,
  "fallos" integer NOT NULL DEFAULT 0,
  "puntaje" integer,
  "aprendido_at" timestamp,
  "caja" integer NOT NULL DEFAULT 0,
  "proximo_at" timestamp,
  PRIMARY KEY ("user_id", "materia_id")
);
CREATE TABLE IF NOT EXISTS "academia_niveles" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "nivel" integer NOT NULL,
  "pacto_at" timestamp,
  "completado_at" timestamp,
  "promedio" integer,
  PRIMARY KEY ("user_id", "nivel")
);
CREATE TABLE IF NOT EXISTS "academia_certificados" (
  "id" serial PRIMARY KEY,
  "codigo" text NOT NULL UNIQUE,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "tipo" text NOT NULL,
  "ref" text NOT NULL,
  "titulo" text NOT NULL,
  "nombre" text NOT NULL,
  "nota" integer,
  "honores" boolean NOT NULL DEFAULT false,
  "via" text NOT NULL DEFAULT 'cursada',
  "emitido_at" timestamp NOT NULL DEFAULT now(),
  "revocado_at" timestamp,
  "motivo" text,
  UNIQUE ("user_id", "tipo", "ref")
);
ALTER TABLE "academia_alumnos" ADD COLUMN IF NOT EXISTS "honor_at" timestamp;
ALTER TABLE "academia_alumnos" ADD COLUMN IF NOT EXISTS "reglamento_version" text;
ALTER TABLE "academia_alumnos" ADD COLUMN IF NOT EXISTS "carne_codigo" text;
CREATE UNIQUE INDEX IF NOT EXISTS "academia_alumnos_carne_idx" ON "academia_alumnos" ("carne_codigo");
CREATE SEQUENCE IF NOT EXISTS "academia_matricula_seq";
CREATE TABLE IF NOT EXISTS "academia_inscripciones" (
  "user_id" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "nombres" text NOT NULL,
  "apellidos" text NOT NULL,
  "pais" text NOT NULL,
  "ciudad" text,
  "telefono" text,
  "nacimiento" text,
  "iglesia_id" integer,
  "iglesia_otra" text,
  "pastor" text,
  "tiempo_fe" text,
  "bautismo" text,
  "ministerio" text,
  "como_conocio" text,
  "espera" text,
  "privacidad_at" timestamp NOT NULL DEFAULT now(),
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "academia_inscripciones_iglesia_idx" ON "academia_inscripciones" ("iglesia_id");
ALTER TABLE "academia_inscripciones" ADD COLUMN IF NOT EXISTS "foto_url" text;
CREATE TABLE IF NOT EXISTS "academia_intentos" (
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "clave" text NOT NULL,
  "intento" integer NOT NULL,
  "objetiva" integer NOT NULL,
  "escrita" integer NOT NULL,
  "nota" integer NOT NULL,
  "nota_auto" integer NOT NULL,
  "aciertos" integer NOT NULL,
  "de" integer NOT NULL,
  "respuestas" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "cerrado_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("user_id", "clave", "intento")
);
CREATE TABLE IF NOT EXISTS "academia_apelaciones" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "clave" text NOT NULL,
  "intento" integer NOT NULL,
  "mensaje" text NOT NULL,
  "estado" text NOT NULL DEFAULT 'pendiente',
  "respuesta" text,
  "resuelta_por" integer,
  "resuelta_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  UNIQUE ("user_id", "clave")
);
CREATE INDEX IF NOT EXISTS "academia_apelaciones_estado_idx" ON "academia_apelaciones" ("estado", "created_at");
CREATE TABLE IF NOT EXISTS "academia_preguntas_retiradas" (
  "pregunta_id" text PRIMARY KEY,
  "motivo" text NOT NULL,
  "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "academia_contenido_notas" (
  "id" serial PRIMARY KEY,
  "materia_id" text NOT NULL,
  "leccion_id" text,
  "texto" text NOT NULL,
  "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "resuelta_por" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "resuelta_at" timestamp,
  "respuesta" text
);
CREATE INDEX IF NOT EXISTS "academia_contenido_notas_materia_idx" ON "academia_contenido_notas" ("materia_id", "resuelta_at");
CREATE TABLE IF NOT EXISTS "academia_asignaciones" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
  "materia_id" text NOT NULL,
  "obligatoria" boolean NOT NULL DEFAULT true,
  "vence_at" timestamp,
  "indicaciones" text,
  "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  UNIQUE ("course_id", "materia_id")
);
CREATE TABLE IF NOT EXISTS "academia_diagnosticos" (
  "user_id" integer PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "resultado" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "created_at" timestamp NOT NULL DEFAULT now()
);
ALTER TABLE "academia_versiculos" ADD COLUMN IF NOT EXISTS "dominado_at" timestamp;
ALTER TABLE "academia_lecciones" ADD COLUMN IF NOT EXISTS "abierta_at" timestamp;
ALTER TABLE "academia_lecciones" ADD COLUMN IF NOT EXISTS "video_inicio" timestamp;
ALTER TABLE "academia_lecciones" ADD COLUMN IF NOT EXISTS "video_seg" integer NOT NULL DEFAULT 0;
ALTER TABLE "academia_versiculos" ADD COLUMN IF NOT EXISTS "repasos" integer NOT NULL DEFAULT 0;
CREATE TABLE IF NOT EXISTS "academia_contenido_aprobaciones" (
  "materia_id" text PRIMARY KEY,
  "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "aprobada_at" timestamp NOT NULL DEFAULT now(),
  "notas" text,
  "huella" text
);`;

// ---------------------------------------------------------------- quién la ve

let abiertaCache = { hasta: 0, valor: false };

let retiradasCache = { hasta: 0, ids: new Set<string>() };

/** Las preguntas que el análisis de preguntas retiró del banco: ya no salen en los intentos nuevos. */
export async function preguntasRetiradas(): Promise<Set<string>> {
  if (Date.now() < retiradasCache.hasta) return retiradasCache.ids;
  const { rows } = await pool.query(`SELECT pregunta_id FROM academia_preguntas_retiradas`);
  retiradasCache = { hasta: Date.now() + 30_000, ids: new Set(rows.map((r: any) => String(r.pregunta_id))) };
  return retiradasCache.ids;
}

/** Olvida lo guardado de las retiradas (al retirar o volver a usar una pregunta). */
export function olvidarRetiradas(): void {
  retiradasCache = { hasta: 0, ids: new Set<string>() };
}

/** Las fichas del versículo de memoria (grupos de unas 3 palabras). */
export function fichasDe(texto: string): string[] {
  const ws = texto.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < ws.length; i += 3) out.push(ws.slice(i, i + 3).join(" "));
  if (out.length > 1 && !out[out.length - 1].includes(" ")) {
    const ultima = out.pop()!;
    out[out.length - 1] += ` ${ultima}`;
  }
  return out;
}
export const idFicha = (userId: number, materiaId: string, i: number) => numeroDe(`${userId}|${materiaId}|${i}`).toString(36);

/** Olvida lo guardado de la apertura (al abrir o cerrar la academia desde el panel). */
export function olvidarApertura(): void {
  abiertaCache = { hasta: 0, valor: false };
}

/** La academia abierta a todos (la abre Luis desde la Dirección académica; mientras tanto, vista previa). */
export async function academiaAbierta(): Promise<boolean> {
  if (Date.now() < abiertaCache.hasta) return abiertaCache.valor;
  let valor = false;
  try {
    const { rows } = await pool.query(`SELECT content FROM site_content WHERE section_key = 'academia_abierta'`);
    valor = rows[0]?.content === "1";
  } catch {
    valor = false;
  }
  abiertaCache = { hasta: Date.now() + 30_000, valor };
  return valor;
}

export type Acceso = { ver: boolean; vistaPrevia: boolean; abierta: boolean; userId: number | null; role: string | null };

export async function accesoDe(req: Request): Promise<Acceso> {
  const abierta = await academiaAbierta();
  const conSesion = req.isAuthenticated() && !!req.user;
  const role = conSesion ? req.user!.role : null;
  const staff = conSesion && !!req.user!.isActive && veVistaPrevia(role);
  return { ver: abierta || staff, vistaPrevia: !abierta && staff, abierta, userId: conSesion ? req.user!.id : null, role };
}

export const MENSAJE_CERRADA = "La Academia Avivando el Fuego abre muy pronto.";

/** El alumno con sesión que puede ver la academia, o la respuesta de error ya enviada. */
export async function alumnoDe(req: Request, res: Response): Promise<{ userId: number; acceso: Acceso } | null> {
  const acceso = await accesoDe(req);
  if (!acceso.ver) {
    res.status(403).json({ message: MENSAJE_CERRADA });
    return null;
  }
  if (!acceso.userId) {
    res.status(401).json({ message: "Entra con tu cuenta para guardar tu avance." });
    return null;
  }
  return { userId: acceso.userId, acceso };
}

/**
 * ¿Está inscrito en la academia? Llenó su ficha de inscripción, aceptó el reglamento y el código de honor y tiene su
 * número de matrícula (server/academia-inscripcion.ts).
 */
export async function inscripcionDe(userId: number): Promise<{ matriculado: boolean; ficha: boolean }> {
  const { rows } = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM academia_alumnos WHERE user_id = $1 AND matricula IS NOT NULL AND reglamento_at IS NOT NULL) AS matriculado,
            EXISTS (SELECT 1 FROM academia_inscripciones WHERE user_id = $1) AS ficha`,
    [userId],
  );
  return { matriculado: !!rows[0]?.matriculado, ficha: !!rows[0]?.ficha };
}

export async function estaInscrito(userId: number): Promise<boolean> {
  const e = await inscripcionDe(userId);
  return e.matriculado && e.ficha;
}

export const MENSAJE_INSCRIPCION =
  "Para guardar tu avance, primero inscríbete en la academia: llenas tu ficha y aceptas el reglamento académico y el código de honor.";
export const MENSAJE_FICHA = "Para seguir guardando tu avance, completa tu ficha de inscripción en la academia.";
export const MENSAJE_MATERIA = "Primero inscríbete en esta materia: desde su página ves lo que vas a aprender y cómo se evalúa.";

/** Como alumnoDe, pero además inscrito en la academia: lo piden las rutas que guardan avance. */
export async function inscritoDe(req: Request, res: Response): Promise<{ userId: number; acceso: Acceso } | null> {
  const a = await alumnoDe(req, res);
  if (!a) return null;
  const e = await inscripcionDe(a.userId);
  if (!e.matriculado || !e.ficha) {
    res.status(409).json({ message: e.matriculado ? MENSAJE_FICHA : MENSAJE_INSCRIPCION, inscripcion: false });
    return null;
  }
  return a;
}

/** Desde cuándo está inscrito en la materia (null si no lo está). La fila de academia_materias es la inscripción. */
export async function inscritaEnMateria(userId: number, materiaId: string): Promise<string | null> {
  const { rows } = await pool.query(`SELECT inicio_at FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, materiaId]);
  return rows[0] ? new Date(rows[0].inicio_at).toISOString() : null;
}

/** Como inscritoDe, pero además inscrito en la materia: lo piden el versículo, completar una lección y el examen. */
export async function inscritoEnMateriaDe(req: Request, res: Response, materiaId: string): Promise<{ userId: number; acceso: Acceso } | null> {
  const a = await inscritoDe(req, res);
  if (!a) return null;
  if (!(await inscritaEnMateria(a.userId, materiaId))) {
    res.status(409).json({ message: MENSAJE_MATERIA, materia: false, materiaId });
    return null;
  }
  return a;
}

/** El nombre de los documentos: el de la ficha de inscripción (o, sin ficha, el de la cuenta). */
export async function nombreAcademico(userId: number): Promise<string> {
  const { rows } = await pool.query(
    `SELECT i.nombres, i.apellidos, u.display_name, u.username FROM users u LEFT JOIN academia_inscripciones i ON i.user_id = u.id WHERE u.id = $1`,
    [userId],
  );
  const r = rows[0];
  const ficha = r?.nombres ? `${r.nombres} ${r.apellidos ?? ""}`.replace(/\s+/g, " ").trim() : "";
  return ficha || String(r?.display_name || r?.username || "Estudiante").trim();
}

/** El examen de una clave de academia_pruebas: su título, su página, su medida y la nota para aprobar. */
export type ContextoExamen = {
  clave: string;
  tipo: "final" | "integral" | "suficiencia" | "diagnostico" | "mini" | "breve";
  /** «Examen final de «La salvación»», «Examen integral del Nivel 1 · Fundamentos de la fe». */
  titulo: string;
  /** «el examen final de «La salvación»», para las frases de los avisos. */
  enFrase: string;
  ruta: string;
  medida: MedidaExamen;
  aprueba: number;
  materia: MateriaDef | null;
  nivel: number | null;
};

export function contextoExamen(clave: string): ContextoExamen | null {
  const fin = /^(.+):final$/.exec(clave);
  if (fin) {
    const m = materiaPorId(fin[1]);
    if (!m) return null;
    return { clave, tipo: "final", titulo: `Examen final de «${m.titulo}»`, enFrase: `el examen final de «${m.titulo}»`, ruta: `/academia/examen/${m.id}`, medida: examenDe(m), aprueba: APRUEBA, materia: m, nivel: null };
  }
  const int = /^nivel-(\d+):integral$/.exec(clave);
  if (int) {
    const n = Number(int[1]);
    const nv = NIVELES.find((x) => x.n === n);
    if (!nv) return null;
    return {
      clave, tipo: "integral", titulo: `Examen integral del Nivel ${n} · ${nv.nombre}`, enFrase: `el examen integral del Nivel ${n}`, ruta: `/academia/integral/${n}`,
      medida: EXAMEN_INTEGRAL[n as NivelN], aprueba: APRUEBA_INTEGRAL, materia: null, nivel: n,
    };
  }
  const suf = /^(.+):suficiencia$/.exec(clave);
  if (suf) {
    const m = materiaPorId(suf[1]);
    if (!m) return null;
    return {
      clave, tipo: "suficiencia", titulo: `Examen de suficiencia de «${m.titulo}»`, enFrase: `el examen de suficiencia de «${m.titulo}»`, ruta: `/academia/suficiencia/${m.id}`,
      medida: medidaSuficiencia(m), aprueba: SUFICIENCIA.apruebaObjetiva, materia: m, nivel: null,
    };
  }
  const mini = /^(.+):mini-(\d+)$/.exec(clave);
  if (mini) {
    const m = materiaPorId(mini[1]);
    if (!m) return null;
    return {
      clave, tipo: "mini", titulo: `Mini prueba ${mini[2]} de «${m.titulo}»`, enFrase: `la mini prueba ${mini[2]} de «${m.titulo}»`, ruta: `/academia/mini/${m.id}/${mini[2]}`,
      medida: MEDIDA_MINI, aprueba: APRUEBA, materia: m, nivel: null,
    };
  }
  const breve = /^(.+):breve$/.exec(clave);
  if (breve) {
    const m = materiaPorId(breve[1]);
    if (!m) return null;
    // una sola escrita que vale toda la nota (la parte objetiva pesa 0)
    return {
      clave, tipo: "breve", titulo: `Escrito breve de «${m.titulo}»`, enFrase: `el escrito breve de «${m.titulo}»`, ruta: `/academia/escrito/${m.id}`,
      medida: { objetivas: 0, banco: 0, escritas: 1, pesoObjetiva: 0, segundos: 0, minutosEscrita: 0 }, aprueba: APRUEBA, materia: m, nivel: null,
    };
  }
  if (clave === "diagnostico") {
    return {
      clave, tipo: "diagnostico", titulo: "Prueba diagnóstica", enFrase: "la prueba diagnóstica", ruta: "/academia/diagnostico",
      medida: { objetivas: 0, banco: 0, escritas: 0, pesoObjetiva: 100, segundos: 45, minutosEscrita: 0 }, aprueba: 0, materia: null, nivel: null,
    };
  }
  return null;
}

/** El examen de suficiencia de una materia: 25 preguntas y 2 escritas, con los pesos y el tiempo de su examen final. */
export function medidaSuficiencia(m: MateriaDef): MedidaExamen {
  const f = examenDe(m);
  return { objetivas: SUFICIENCIA.objetivas, banco: BANCOS.get(m.id)?.final.length ?? 0, escritas: SUFICIENCIA.escritas, pesoObjetiva: f.pesoObjetiva, segundos: f.segundos, minutosEscrita: f.minutosEscrita };
}

/** Deja un aviso en la campana a cada cuenta de la lista. No manda correos ni avisos al teléfono. */
export async function avisarA(userIds: number[], titulo: string, contenido: string, enlace: string): Promise<void> {
  const ids = [...new Set(userIds.filter((x) => Number.isInteger(x) && x > 0))];
  if (!ids.length) return;
  await pool.query(
    `INSERT INTO notifications (user_id, type, title, content, link) SELECT unnest($1::int[]), 'academia', $2, $3, $4`,
    [ids, titulo.slice(0, 200), contenido.slice(0, 1000), enlace],
  );
}

/** Las cuentas activas con alguno de esos roles (menos una). */
export async function cuentasConRoles(roles: readonly string[], excepto = 0): Promise<number[]> {
  const { rows } = await pool.query(`SELECT id FROM users WHERE is_active AND role = ANY($1::text[]) AND id <> $2`, [[...roles], excepto]);
  return rows.map((r: any) => Number(r.id));
}

/** La dirección pública de la verificación de un documento o de un carné (la del QR). */
const SITIO = resolveSiteUrl(process.env.SITE_URL);
export const enlaceVerificar = (codigo: string) => `${SITIO}/academia/verificar/${codigo}`;

// ---------------------------------------------------------------- fila por persona y freno

const colas = new Map<number, Promise<unknown>>();

/** Lo de una misma persona se hace de a uno (dos pestañas no pueden responder la misma pregunta a la vez). */
export function enFila<T>(userId: number, fn: () => Promise<T>): Promise<T> {
  const antes = colas.get(userId) ?? Promise.resolve();
  const ahora = antes.catch(() => undefined).then(fn);
  colas.set(userId, ahora);
  void ahora.finally(() => {
    if (colas.get(userId) === ahora) colas.delete(userId);
  }).catch(() => undefined);
  return ahora;
}

const ultimo = new Map<string, number>();
/** Freno corto contra los envíos repetidos (true = esperar). */
export function frenar(clave: string, ms = 400): boolean {
  const ahora = Date.now();
  if (ahora - (ultimo.get(clave) || 0) < ms) return true;
  ultimo.set(clave, ahora);
  if (ultimo.size > 5000) ultimo.clear();
  return false;
}

// ---------------------------------------------------------------- alumno, materia y racha

export async function asegurarAlumno(userId: number): Promise<void> {
  await pool.query(
    `INSERT INTO academia_alumnos (user_id, promocion) VALUES ($1, EXTRACT(YEAR FROM now())::int)
     ON CONFLICT (user_id) DO UPDATE SET ultima_at = now()`,
    [userId],
  );
}

export async function asegurarMateria(userId: number, materiaId: string): Promise<void> {
  await pool.query(`INSERT INTO academia_materias (user_id, materia_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, materiaId]);
}

/** El día de Texas (America/Chicago) en YYYY-MM-DD: la racha cuenta por días de la sede. */
export function diaTexas(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

/** Un día de estudio: sube la racha una vez por día (si ayer estudió, sigue; si no, vuelve a 1). */
export async function marcarEstudio(userId: number): Promise<void> {
  const hoy = diaTexas();
  const ayer = diaTexas(new Date(Date.now() - 86_400_000));
  await pool.query(
    `UPDATE academia_alumnos
        SET racha = CASE WHEN racha_fecha = $2 THEN racha WHEN racha_fecha = $3 THEN racha + 1 ELSE 1 END,
            racha_fecha = $2, ultima_at = now()
      WHERE user_id = $1`,
    [userId, hoy, ayer],
  );
}

// ---------------------------------------------------------------- versículos

export type VersiculoResuelto = { ref: string; texto: string | null; enlace: string | null };

/** El texto de una cita, tomado de la RV1960 de la web (si el proveedor falla, la cita va sin texto y con su enlace). */
export async function textoDeCita(ref: string): Promise<VersiculoResuelto> {
  const c = parsearCita(ref);
  if (!c) return { ref, texto: null, enlace: null };
  try {
    const cap = await getBibleChapter("rv1960", c.libro, c.capitulo);
    const vs = cap.verses.filter((v) => v.verse >= c.desde && v.verse <= c.hasta);
    const varios = c.hasta > c.desde;
    const texto = vs.map((v) => (varios ? `${v.verse} ` : "") + v.text.trim()).join(" ").trim();
    const version = cap.version !== "rv1960" ? ` (${cap.version.toUpperCase()})` : "";
    return { ref: citaVisible(c) + version, texto: texto || null, enlace: enlaceBiblia(c) };
  } catch {
    return { ref: citaVisible(c), texto: null, enlace: enlaceBiblia(c) };
  }
}

// ---------------------------------------------------------------- la nota de la materia

const claveFinal = (materiaId: string) => `${materiaId}:final`;
/** La mini prueba `n` de una materia y su escrito breve (Nivel 2 en adelante). */
export const claveMini = (materiaId: string, n: number) => `${materiaId}:mini-${n}`;
export const claveBreve = (materiaId: string) => `${materiaId}:breve`;
/** La clave del examen integral de un nivel en academia_pruebas. */
export const claveIntegral = (nivel: number) => `nivel-${nivel}:integral`;

/**
 * Los componentes de la nota de una materia:
 * - repasos: 60 por haberlos hecho todos y hasta 40 más según los aciertos a la primera;
 * - versículo: su puntaje (100, 80 o 60 según los intentos);
 * - examen final: la mejor nota de sus intentos.
 */
export async function componentesDe(userId: number, m: MateriaDef): Promise<Componentes> {
  const banco = BANCOS.get(m.id);
  const ids = m.lecciones.map((l) => l.id);
  const comps: Componentes = {};
  if (banco && ids.length) {
    const { rows } = await pool.query(`SELECT leccion_id, repaso FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`, [userId, ids]);
    const porLeccion = new Map(rows.map((r: any) => [r.leccion_id as string, (r.repaso || {}) as Record<string, { primera?: boolean; ok?: boolean }>]));
    let total = 0;
    let primera = 0;
    let hechas = 0;
    for (const id of ids) {
      const preguntas = banco.repaso[id] ?? [];
      const hecho = porLeccion.get(id) ?? {};
      for (const p of preguntas) {
        total++;
        if (hecho[p.id]?.ok) hechas++;
        if (hecho[p.id]?.primera) primera++;
      }
    }
    comps.repasos = total ? Math.round((hechas === total ? 60 : (60 * hechas) / total) + (40 * primera) / total) : 0;
  }
  const { rows: v } = await pool.query(`SELECT puntaje FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  comps.versiculo = Number(v[0]?.puntaje ?? 0);
  const { rows: f } = await pool.query(`SELECT mejor FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, claveFinal(m.id)]);
  comps.final = Number(f[0]?.mejor ?? 0);
  // Nivel 2 en adelante: las mini pruebas (el promedio de la mejor de cada una; la que no se dio cuenta 0) y el escrito breve
  const minis = miniPruebasDe(m);
  if (minis.length || tieneEscritoBreve(m)) {
    const claves = [...minis.map((g) => claveMini(m.id, g.n)), claveBreve(m.id)];
    const { rows: pr } = await pool.query(`SELECT clave, mejor FROM academia_pruebas WHERE user_id = $1 AND clave = ANY($2::text[])`, [userId, claves]);
    const mejor = new Map((pr as any[]).map((r) => [String(r.clave), Number(r.mejor ?? 0)]));
    if (minis.length) comps.mini = Math.round(minis.reduce((s, g) => s + (mejor.get(claveMini(m.id, g.n)) ?? 0), 0) / minis.length);
    if (tieneEscritoBreve(m)) comps.escritos = mejor.get(claveBreve(m.id)) ?? 0;
  }
  return comps;
}

/** Vuelve a calcular la nota de la materia y la guarda. Devuelve la nota y si quedó aprobada. */
export async function recalcularMateria(userId: number, m: MateriaDef): Promise<{ nota: number; aprobada: boolean; componentes: Componentes }> {
  const { rows: ya } = await pool.query(`SELECT estado, via, nota, componentes FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  if (ya[0]?.estado === "aprobada" && ya[0].via === "suficiencia") {
    // aprobada por suficiencia: su nota es la del examen de suficiencia, no la de los componentes del curso
    return { nota: Number(ya[0].nota ?? 0), aprobada: true, componentes: (ya[0].componentes ?? {}) as Componentes };
  }
  const componentes = await componentesDe(userId, m);
  const nota = notaMateria(pesosDe(m), componentes);
  const aprobada = materiaAprobada(nota, componentes.final ?? 0);
  await asegurarMateria(userId, m.id);
  await pool.query(
    `UPDATE academia_materias
        SET nota = $3, componentes = $4::jsonb,
            estado = CASE WHEN estado = 'aprobada' OR $5 THEN 'aprobada' ELSE 'en-curso' END,
            aprobada_at = CASE WHEN aprobada_at IS NULL AND $5 THEN now() ELSE aprobada_at END
      WHERE user_id = $1 AND materia_id = $2`,
    [userId, m.id, nota, JSON.stringify(componentes), aprobada],
  );
  return { nota, aprobada, componentes };
}

export { claveFinal };
