/**
 * Lo común del servidor de la academia (docs/academia.md): las tablas, quién puede verla, la fila por persona, el
 * texto de los versículos (de la RV1960 de la web) y la nota de cada materia.
 */
import type { Request, Response } from "express";
import { pool } from "./db";
import { getBibleChapter } from "./bible";
import {
  citaVisible, enlaceBiblia, materiaAprobada, notaMateria, parsearCita, pesosDe, veVistaPrevia,
  type Componentes, type MateriaDef,
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
);`;

// ---------------------------------------------------------------- quién la ve

let abiertaCache = { hasta: 0, valor: false };

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
  return comps;
}

/** Vuelve a calcular la nota de la materia y la guarda. Devuelve la nota y si quedó aprobada. */
export async function recalcularMateria(userId: number, m: MateriaDef): Promise<{ nota: number; aprobada: boolean; componentes: Componentes }> {
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
