/**
 * Las asignaciones de la Academia a los cursos de la Escuela (docs/academia.md, «Las asignaciones a los cursos de la
 * Escuela»): quien dirige un curso le asigna materias de la academia, obligatorias u opcionales y con fecha límite. En
 * el aula del curso ve cómo va cada alumno (sin empezar, en curso, aprobada con su nota o vencida) y la planilla trae
 * esas notas en sus columnas. Los alumnos del curso las ven en el aula, en la portada de la academia y en la página de
 * la materia. Todo se calcula al leerlo: nada corre de fondo.
 *
 * Quién dirige el curso: la administración (admin, director y staff_global) o el maestro a cargo de ESE curso (la misma
 * regla que canManageCourse en server/routes.ts). Los alumnos del curso las ven cuando la academia está abierta.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { NIVELES, materiaPorId, type MateriaDef } from "@shared/academia";
import {
  estadoAsignacion, type AcademiaEnPlanilla, type Asignacion, type AsignacionesCurso, type AvanceAsignacion, type FilaAvance, type MiAsignacion,
  type ResumenAsignacion,
} from "@shared/academia-escuela";
import { BANCOS } from "./academia/index";
import { accesoDe, avisarA, frenar } from "./academia-comun";

const ADMINISTRACION = new Set(["admin", "director", "staff_global"]);
const MAESTROS = new Set(["admin", "obrero", "director", "staff_global", "maestro_ministerio", "maestro_iglesia", "admin_iglesia"]);
const INSCRITO = ["aprobado", "completado"];
const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[ \t]+/g, " ").trim().slice(0, max) : "");
const nombreDe = (r: any) => (r.nombres ? `${r.nombres} ${r.apellidos ?? ""}`.trim() : String(r.display_name || r.username || "Alumno"));

type Curso = { id: number; titulo: string; teacherId: number | null };

async function cursoDe(id: number): Promise<Curso | null> {
  if (!Number.isInteger(id) || id <= 0) return null;
  const { rows } = await pool.query(`SELECT id, title, teacher_id FROM courses WHERE id = $1`, [id]);
  return rows[0] ? { id: Number(rows[0].id), titulo: String(rows[0].title), teacherId: rows[0].teacher_id == null ? null : Number(rows[0].teacher_id) } : null;
}

/** Dirige el curso: la administración o el maestro a cargo de ese curso. */
function dirige(req: Request, c: Curso): boolean {
  const u = req.user;
  if (!req.isAuthenticated() || !u || !u.isActive) return false;
  return ADMINISTRACION.has(u.role) || (MAESTROS.has(u.role) && c.teacherId === u.id);
}

/** Las materias que se pueden asignar: las publicadas que tienen contenido. */
function asignables(): MateriaDef[] {
  return NIVELES.flatMap((n) => n.materias).filter((m) => m.disponible && BANCOS.has(m.id));
}

// ---------------------------------------------------------------- lectura

const COLUMNAS = `a.id, a.course_id, a.materia_id, a.obligatoria, a.vence_at, a.indicaciones, a.created_at, c.title AS curso, u.display_name, u.username`;

function asignacionDe(r: any): Asignacion | null {
  const m = materiaPorId(String(r.materia_id));
  if (!m) return null;
  return {
    id: Number(r.id),
    curso: { id: Number(r.course_id), titulo: String(r.curso) },
    materia: { id: m.id, titulo: m.titulo, nivel: m.nivel, lecciones: m.lecciones.length },
    obligatoria: !!r.obligatoria,
    venceAt: iso(r.vence_at),
    indicaciones: r.indicaciones ?? null,
    por: String(r.display_name || r.username || "Quien dirige el curso"),
    fecha: iso(r.created_at)!,
  };
}

async function asignacionesDelCurso(cursoId: number): Promise<Asignacion[]> {
  const { rows } = await pool.query(
    `SELECT ${COLUMNAS} FROM academia_asignaciones a JOIN courses c ON c.id = a.course_id LEFT JOIN users u ON u.id = a.user_id
      WHERE a.course_id = $1 ORDER BY a.vence_at NULLS LAST, a.created_at`,
    [cursoId],
  );
  return (rows as any[]).map(asignacionDe).filter((a): a is Asignacion => !!a);
}

/** El avance de cada alumno en cada materia: su fila en academia_materias y sus lecciones completadas. */
async function avancesDe(userIds: number[], materias: MateriaDef[]): Promise<Map<string, FilaAvance>> {
  const out = new Map<string, FilaAvance>();
  if (!userIds.length || !materias.length) return out;
  const lecciones = new Map<string, string>();
  for (const m of materias) for (const l of m.lecciones) lecciones.set(l.id, m.id);
  const [{ rows: mats }, { rows: lecs }] = await Promise.all([
    pool.query(`SELECT user_id, materia_id, estado, nota, aprobada_at FROM academia_materias WHERE user_id = ANY($1::int[]) AND materia_id = ANY($2::text[])`, [userIds, materias.map((m) => m.id)]),
    pool.query(`SELECT user_id, leccion_id FROM academia_lecciones WHERE completada_at IS NOT NULL AND user_id = ANY($1::int[]) AND leccion_id = ANY($2::text[])`, [userIds, [...lecciones.keys()]]),
  ]);
  const fila = (u: number, m: string) => {
    const k = `${u}:${m}`;
    let f = out.get(k);
    if (!f) out.set(k, (f = { estado: null, lecciones: 0, nota: null, aprobadaAt: null }));
    return f;
  };
  for (const r of mats as any[]) {
    const f = fila(Number(r.user_id), String(r.materia_id));
    f.estado = String(r.estado);
    f.nota = r.nota == null ? null : Number(r.nota);
    f.aprobadaAt = iso(r.aprobada_at);
  }
  for (const r of lecs as any[]) {
    const m = lecciones.get(String(r.leccion_id));
    if (m) fila(Number(r.user_id), m).lecciones++;
  }
  return out;
}

function avance(filas: Map<string, FilaAvance>, userId: number, a: Asignacion, ahora: number): AvanceAsignacion {
  return estadoAsignacion(filas.get(`${userId}:${a.materia.id}`) ?? null, a.materia.lecciones, a.venceAt, ahora);
}

async function alumnosDelCurso(cursoId: number) {
  const { rows } = await pool.query(
    `SELECT e.user_id, u.display_name, u.username, i.nombres, i.apellidos, al.matricula
       FROM enrollments e
       JOIN users u ON u.id = e.user_id
       LEFT JOIN academia_inscripciones i ON i.user_id = e.user_id
       LEFT JOIN academia_alumnos al ON al.user_id = e.user_id
      WHERE e.course_id = $1 AND e.status = ANY($2::text[])
      ORDER BY lower(COALESCE(i.nombres, u.display_name, u.username))`,
    [cursoId, INSCRITO],
  );
  return (rows as any[]).map((r) => ({ userId: Number(r.user_id), nombre: nombreDe(r), matriculado: !!r.matricula }));
}

async function inscritoEnCurso(cursoId: number, userId: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT 1 FROM enrollments WHERE course_id = $1 AND user_id = $2 AND status = ANY($3::text[]) LIMIT 1`, [cursoId, userId, INSCRITO]);
  return !!rows[0];
}

/** Las asignaciones de un curso para la planilla: sus columnas y el avance de cada alumno (null si no tiene). */
export async function academiaEnPlanilla(cursoId: number, userIds: number[]): Promise<AcademiaEnPlanilla | null> {
  const asignaciones = await asignacionesDelCurso(cursoId);
  if (!asignaciones.length) return null;
  const materias = asignaciones.map((a) => materiaPorId(a.materia.id)!).filter(Boolean);
  const filas = await avancesDe(userIds, materias);
  const ahora = Date.now();
  const porAlumno: AcademiaEnPlanilla["avance"] = {};
  for (const u of userIds) {
    porAlumno[u] = {};
    for (const a of asignaciones) porAlumno[u][a.id] = avance(filas, u, a, ahora);
  }
  return {
    asignaciones: asignaciones.map((a) => ({ id: a.id, titulo: a.materia.titulo, obligatoria: a.obligatoria, venceAt: a.venceAt })),
    avance: porAlumno,
  };
}

/** Las asignaciones de todos mis cursos, con mi avance. */
export async function misAsignaciones(userId: number): Promise<MiAsignacion[]> {
  const { rows } = await pool.query(
    `SELECT ${COLUMNAS} FROM academia_asignaciones a
       JOIN courses c ON c.id = a.course_id AND c.is_active
       JOIN enrollments e ON e.course_id = a.course_id AND e.user_id = $1 AND e.status = ANY($2::text[])
       LEFT JOIN users u ON u.id = a.user_id
      ORDER BY a.vence_at NULLS LAST, a.created_at`,
    [userId, INSCRITO],
  );
  const asignaciones = (rows as any[]).map(asignacionDe).filter((a): a is Asignacion => !!a);
  const filas = await avancesDe([userId], [...new Set(asignaciones.map((a) => a.materia.id))].map((id) => materiaPorId(id)!));
  const ahora = Date.now();
  return asignaciones.map((a) => ({ ...a, avance: avance(filas, userId, a, ahora) }));
}

// ---------------------------------------------------------------- escritura

/**
 * La fecha límite: un instante del futuro (el final del día que eligió el profesor, en su hora), hasta un año. Va a la
 * base como fecha de JavaScript, no como texto: las columnas guardan la hora sin zona y el driver las escribe y las lee
 * en la hora del servidor, igual que las que pone la base sola (con texto en UTC se correría si el servidor no está en UTC).
 */
function venceDe(v: unknown): { valor: Date | null; error?: string } {
  if (v == null || v === "") return { valor: null };
  const t = typeof v === "string" ? Date.parse(v) : NaN;
  if (!Number.isFinite(t)) return { valor: null, error: "La fecha límite no es válida." };
  if (t < Date.now()) return { valor: null, error: "La fecha límite ya pasó: elige una fecha de hoy en adelante." };
  if (t > Date.now() + 366 * 86_400_000) return { valor: null, error: "La fecha límite puede ser, como mucho, dentro de un año." };
  return { valor: new Date(t) };
}

async function registrar(req: Request, accion: string, texto: string): Promise<void> {
  await pool.query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address) VALUES ($1, $2, 'academia', NULL, $3, $4)`,
    [req.user!.id, accion, JSON.stringify({ texto, motivo: null }), req.ip ?? null],
  );
}

// ---------------------------------------------------------------- las rutas

export function registerAcademiaAsignacionesRoutes(app: Express) {
  // Las asignaciones de un curso: quien lo dirige ve a cada alumno; un alumno inscrito ve lo suyo.
  app.get("/api/academia/curso/:cursoId/asignaciones", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user) return res.status(401).json({ message: "Entra con tu cuenta." });
      const c = await cursoDe(Number(req.params.cursoId));
      if (!c) return res.status(404).json({ message: "No existe ese curso." });
      const gestiona = dirige(req, c);
      const userId = req.user.id;
      if (!gestiona && !(await inscritoEnCurso(c.id, userId))) return res.status(403).json({ message: "Solo lo ven quienes están inscritos en el curso y quien lo dirige." });
      const acceso = await accesoDe(req);
      const visible = gestiona || acceso.ver;
      const asignaciones = visible ? await asignacionesDelCurso(c.id) : [];
      const materias = [...new Set(asignaciones.map((a) => a.materia.id))].map((id) => materiaPorId(id)!);
      const ahora = Date.now();
      let alumnos: AsignacionesCurso["alumnos"] = null;
      const resumenes = new Map<number, ResumenAsignacion>();
      let mias = new Map<number, AvanceAsignacion>();
      if (gestiona) {
        const lista = await alumnosDelCurso(c.id);
        const filas = await avancesDe(lista.map((a) => a.userId), materias);
        alumnos = lista.map((a) => ({ ...a, avance: Object.fromEntries(asignaciones.map((x) => [x.id, avance(filas, a.userId, x, ahora)])) }));
        for (const x of asignaciones) {
          const r: ResumenAsignacion = { alumnos: lista.length, sinEmpezar: 0, enCurso: 0, aprobadas: 0, vencidas: 0 };
          for (const a of alumnos) {
            const e = a.avance[x.id].estado;
            if (e === "sin-empezar") r.sinEmpezar++;
            else if (e === "en-curso") r.enCurso++;
            else if (e === "aprobada") r.aprobadas++;
            else r.vencidas++;
          }
          resumenes.set(x.id, r);
        }
      }
      if (visible && (await inscritoEnCurso(c.id, userId))) {
        const filas = await avancesDe([userId], materias);
        mias = new Map(asignaciones.map((x) => [x.id, avance(filas, userId, x, ahora)]));
      }
      const out: AsignacionesCurso = {
        curso: { id: c.id, titulo: c.titulo },
        abierta: acceso.abierta,
        visible,
        puedeGestionar: gestiona,
        materias: gestiona ? asignables().map((m) => ({ id: m.id, titulo: m.titulo, nivel: m.nivel })) : [],
        asignaciones: asignaciones.map((x) => ({ ...x, resumen: resumenes.get(x.id) ?? null, mio: mias.get(x.id) ?? null })),
        alumnos,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] asignaciones del curso:", err);
      res.sendStatus(500);
    }
  });

  // Asignar una materia al curso (una vez cada una). Avisa en la campana a los alumnos del curso si la academia está abierta.
  app.post("/api/academia/curso/:cursoId/asignaciones", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user) return res.status(401).json({ message: "Entra con tu cuenta." });
      const c = await cursoDe(Number(req.params.cursoId));
      if (!c) return res.status(404).json({ message: "No existe ese curso." });
      if (!dirige(req, c)) return res.status(403).json({ message: "Solo quien dirige el curso asigna materias de la academia." });
      const m = asignables().find((x) => x.id === String(req.body?.materiaId ?? ""));
      if (!m) return res.status(400).json({ message: "Elige una materia publicada de la academia." });
      const vence = venceDe(req.body?.venceAt);
      if (vence.error) return res.status(400).json({ message: vence.error });
      const indicaciones = limpio(req.body?.indicaciones, 500) || null;
      const obligatoria = req.body?.obligatoria !== false;
      if (frenar(`academia-asignar:${req.user.id}`, 500)) return res.status(429).json({ message: "Espera un momento." });
      const { rows } = await pool.query(
        `INSERT INTO academia_asignaciones (course_id, materia_id, obligatoria, vence_at, indicaciones, user_id) VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (course_id, materia_id) DO NOTHING RETURNING id`,
        [c.id, m.id, obligatoria, vence.valor, indicaciones, req.user.id],
      );
      if (!rows[0]) return res.status(409).json({ message: "Esa materia ya está asignada a este curso." });
      await registrar(req, "academia.asignar", `Asignó la materia «${m.titulo}» al curso «${c.titulo}» (${obligatoria ? "obligatoria" : "opcional"}).`);
      const acceso = await accesoDe(req);
      if (acceso.abierta) {
        const alumnos = (await alumnosDelCurso(c.id)).map((a) => a.userId).filter((id) => id !== req.user!.id);
        void avisarA(
          alumnos,
          `Nueva asignación en «${c.titulo}»`,
          `Tu curso te asignó la materia «${m.titulo}» de la Academia (${obligatoria ? "obligatoria" : "opcional"}). La fecha límite está en el aula del curso.`,
          `/academia/materia/${m.id}`,
        ).catch(() => undefined);
      }
      res.status(201).json({ id: Number(rows[0].id) });
    } catch (err) {
      console.error("[academia] asignar:", err);
      res.sendStatus(500);
    }
  });

  // Cambiar si es obligatoria, la fecha límite o las indicaciones.
  app.post("/api/academia/curso/:cursoId/asignaciones/:asignacionId", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user) return res.status(401).json({ message: "Entra con tu cuenta." });
      const c = await cursoDe(Number(req.params.cursoId));
      if (!c) return res.status(404).json({ message: "No existe ese curso." });
      if (!dirige(req, c)) return res.status(403).json({ message: "Solo quien dirige el curso cambia sus asignaciones." });
      const id = Number(req.params.asignacionId);
      const { rows: antes } = await pool.query(`SELECT vence_at FROM academia_asignaciones WHERE id = $1 AND course_id = $2`, [id, c.id]);
      if (!antes[0]) return res.status(404).json({ message: "No existe esa asignación en este curso." });
      // conservar la misma fecha (aunque ya haya pasado) no es poner una fecha pasada
      const anterior = antes[0].vence_at ? new Date(antes[0].vence_at).getTime() : null;
      const pedido = typeof req.body?.venceAt === "string" ? Date.parse(req.body.venceAt) : NaN;
      const vence = anterior != null && Number.isFinite(pedido) && Math.abs(pedido - anterior) < 60_000 ? { valor: new Date(anterior) } : venceDe(req.body?.venceAt);
      if (vence.error) return res.status(400).json({ message: vence.error });
      const { rows } = await pool.query(
        `UPDATE academia_asignaciones SET obligatoria = $3, vence_at = $4, indicaciones = $5 WHERE id = $1 AND course_id = $2 RETURNING materia_id`,
        [id, c.id, req.body?.obligatoria !== false, vence.valor, limpio(req.body?.indicaciones, 500) || null],
      );
      if (!rows[0]) return res.status(404).json({ message: "No existe esa asignación en este curso." });
      await registrar(req, "academia.asignacion", `Cambió la asignación de «${materiaPorId(String(rows[0].materia_id))?.titulo ?? rows[0].materia_id}» en el curso «${c.titulo}».`);
      res.json({ id });
    } catch (err) {
      console.error("[academia] cambiar asignación:", err);
      res.sendStatus(500);
    }
  });

  // Quitar una asignación (el avance de cada alumno en la materia no se toca).
  app.post("/api/academia/curso/:cursoId/asignaciones/:asignacionId/quitar", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user) return res.status(401).json({ message: "Entra con tu cuenta." });
      const c = await cursoDe(Number(req.params.cursoId));
      if (!c) return res.status(404).json({ message: "No existe ese curso." });
      if (!dirige(req, c)) return res.status(403).json({ message: "Solo quien dirige el curso quita sus asignaciones." });
      const { rows } = await pool.query(`DELETE FROM academia_asignaciones WHERE id = $1 AND course_id = $2 RETURNING materia_id`, [Number(req.params.asignacionId), c.id]);
      if (!rows[0]) return res.status(404).json({ message: "No existe esa asignación en este curso." });
      await registrar(req, "academia.desasignar", `Quitó la materia «${materiaPorId(String(rows[0].materia_id))?.titulo ?? rows[0].materia_id}» de las asignaciones del curso «${c.titulo}».`);
      res.json({ quitada: true });
    } catch (err) {
      console.error("[academia] quitar asignación:", err);
      res.sendStatus(500);
    }
  });

  // Mis asignaciones de todos mis cursos (la portada de la academia y la página de la materia).
  app.get("/api/academia/mis-asignaciones", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.userId) return res.status(401).json({ message: "Entra con tu cuenta." });
      res.setHeader("Cache-Control", "no-store");
      res.json({ asignaciones: acceso.ver ? await misAsignaciones(acceso.userId) : [] });
    } catch (err) {
      console.error("[academia] mis asignaciones:", err);
      res.sendStatus(500);
    }
  });
}
