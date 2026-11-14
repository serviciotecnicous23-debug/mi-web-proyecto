/**
 * Los mentores de la academia (docs/academia.md, «Los mentores»): la Dirección académica, o quienes dirigen la iglesia
 * aliada del alumno, eligen quién acompaña a cada alumno. El mentor ve en «Mis acompañados» (/academia/acompanados) el
 * avance de cada persona que acompaña —su estatus, sus materias en curso y sus lecciones—, sin notas ni datos de
 * contacto (el aviso de privacidad de la inscripción dice que esos los ven solo la Dirección y su iglesia). Ve también
 * quién se detuvo: quien tiene materias en curso y no estudia hace 7 días o más (se calcula al leerlo: nada corre de
 * fondo en el servidor).
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { ROLES } from "@shared/roles";
import { DIAS_DETENIDO_MENTOR, type Acompanado, type MisAcompanados } from "@shared/academia-escuela";
import { accesoDe, avisarA, frenar, MENSAJE_CERRADA } from "./academia-comun";
import { avancesPorAlumno, filasDe, permisoDe } from "./academia-direccion";

const etiquetaRol = (role: string) => (ROLES as Record<string, string>)[role] ?? (role === "admin" ? "Administración" : role === "obrero" ? "Obrero" : "Usuario");
const nombreCuenta = (r: any) => String(r.display_name || r.username || "Alguien");

async function registrar(req: Request, accion: string, alumnoId: number, texto: string): Promise<void> {
  await pool.query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address) VALUES ($1, $2, 'academia', $3, $4, $5)`,
    [req.user!.id, accion, alumnoId, JSON.stringify({ texto, motivo: null }), req.ip ?? null],
  );
}

/** Las personas que acompaña un mentor, con su avance (sin notas ni contacto). */
export async function acompanadosDe(mentorId: number): Promise<Acompanado[]> {
  const filas = await filasDe({ userId: mentorId, role: "", alcance: "todos", iglesiaId: null }, false, undefined, mentorId);
  const ids = filas.map((f) => f.userId);
  // los días sin estudiar se cuentan en la base (las horas se guardan sin zona: restarlas aquí dependería del servidor)
  const [avances, { rows: ds }] = await Promise.all([
    avancesPorAlumno(ids),
    ids.length
      ? pool.query(`SELECT user_id, EXTRACT(EPOCH FROM now() - ultima_at)::float / 86400 AS dias FROM academia_alumnos WHERE user_id = ANY($1::int[])`, [ids])
      : Promise.resolve({ rows: [] as any[] }),
  ]);
  const sinEstudiar = new Map((ds as any[]).map((r) => [Number(r.user_id), Math.max(0, Math.floor(Number(r.dias ?? 0)))]));
  return filas
    .map((f): Acompanado => {
      const materias = avances.get(f.userId) ?? [];
      const enCurso = materias.filter((m) => m.estado !== "aprobada").map((m) => ({ materiaId: m.id, titulo: m.titulo, lecciones: m.lecciones, de: m.de }));
      const dias = sinEstudiar.get(f.userId) ?? 0;
      return {
        userId: f.userId,
        nombre: f.nombre,
        matricula: f.matricula,
        nivel: f.estatus.nivel,
        estatus: { clave: f.estatus.clave, texto: f.estatus.texto },
        iglesia: f.iglesia,
        lecciones: f.lecciones,
        aprobadas: f.aprobadas,
        enCurso,
        ultima: f.ultima,
        detenido: enCurso.length && dias >= DIAS_DETENIDO_MENTOR ? dias : null,
      };
    })
    .sort((a, b) => (b.detenido ?? -1) - (a.detenido ?? -1) || a.nombre.localeCompare(b.nombre, "es"));
}

export function registerAcademiaMentoresRoutes(app: Express) {
  // Buscar a quién elegir como mentor: cuentas activas (las de su iglesia, para una iglesia aliada).
  app.get("/api/academia/direccion/personas", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "mentores");
      if (!p) return;
      const q = typeof req.query.q === "string" ? req.query.q.replace(/\s+/g, " ").trim().slice(0, 60) : "";
      if (q.length < 2) return res.json({ personas: [] });
      const patron = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
      const params: unknown[] = [patron];
      let donde = `u.is_active AND (u.display_name ILIKE $1 OR u.username ILIKE $1)`;
      if (p.alcance === "iglesia") {
        if (!p.iglesiaId) return res.json({ personas: [] });
        params.push(p.iglesiaId);
        donde += ` AND u.church_id = $${params.length}`;
      }
      const { rows } = await pool.query(
        `SELECT u.id, u.display_name, u.username, u.role, c.name AS iglesia FROM users u LEFT JOIN ministry_churches c ON c.id = u.church_id
          WHERE ${donde} ORDER BY lower(COALESCE(u.display_name, u.username)) LIMIT 12`,
        params,
      );
      res.setHeader("Cache-Control", "no-store");
      res.json({
        personas: (rows as any[]).map((r) => ({ id: Number(r.id), nombre: nombreCuenta(r), usuario: String(r.username), rol: etiquetaRol(String(r.role)), iglesia: r.iglesia ?? null })),
      });
    } catch (err) {
      console.error("[academia] buscar personas:", err);
      res.sendStatus(500);
    }
  });

  // Elegir el mentor de un alumno (o quitarlo). Avisa en la campana al mentor y al alumno.
  app.post("/api/academia/direccion/alumno/:alumnoId/mentor", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "mentores");
      if (!p) return;
      const alumnoId = Number(req.params.alumnoId);
      const [fila] = Number.isInteger(alumnoId) && alumnoId > 0 ? await filasDe(p, false, alumnoId) : [];
      if (!fila) return res.status(404).json({ message: "No existe ese alumno, o no es de tu iglesia." });
      const crudo = req.body?.mentorId;
      if (crudo === null) {
        const { rowCount } = await pool.query(`UPDATE academia_alumnos SET mentor_user_id = NULL WHERE user_id = $1 AND mentor_user_id IS NOT NULL`, [alumnoId]);
        if (!rowCount) return res.status(409).json({ message: "Ese alumno no tenía mentor." });
        await registrar(req, "academia.mentor", alumnoId, `Quitó el mentor de ${fila.nombre}.`);
        return res.json({ mentor: null });
      }
      const mentorId = Number(crudo);
      if (!Number.isInteger(mentorId) || mentorId <= 0) return res.status(400).json({ message: "Elige a la persona que será su mentor." });
      if (mentorId === alumnoId) return res.status(400).json({ message: "Nadie puede ser su propio mentor." });
      if (frenar(`academia-mentor:${p.userId}`, 500)) return res.status(429).json({ message: "Espera un momento." });
      const { rows } = await pool.query(`SELECT id, display_name, username, church_id FROM users WHERE id = $1 AND is_active`, [mentorId]);
      const m = rows[0];
      if (!m) return res.status(404).json({ message: "Esa cuenta no existe o no está activa." });
      if (p.alcance === "iglesia" && Number(m.church_id) !== p.iglesiaId) return res.status(403).json({ message: "Elige a alguien de tu iglesia." });
      const { rows: antes } = await pool.query(`SELECT mentor_user_id FROM academia_alumnos WHERE user_id = $1`, [alumnoId]);
      if (Number(antes[0]?.mentor_user_id) === mentorId) return res.status(409).json({ message: "Ya es su mentor." });
      await pool.query(`UPDATE academia_alumnos SET mentor_user_id = $2 WHERE user_id = $1`, [alumnoId, mentorId]);
      const nombre = nombreCuenta(m);
      await registrar(req, "academia.mentor", alumnoId, `Eligió a ${nombre} como mentor de ${fila.nombre}.`);
      const por = nombreCuenta({ display_name: (req.user as any)?.displayName, username: (req.user as any)?.username });
      if (mentorId !== p.userId) {
        void avisarA([mentorId], `Acompañarás a ${fila.nombre} en la academia`, `${por} te eligió como mentor de ${fila.nombre}. En «Mis acompañados» ves su avance (sin notas) y si se detiene.`, "/academia/acompanados").catch(() => undefined);
      }
      void avisarA([alumnoId], "Tu mentor en la academia", `${nombre} te acompañará en tus estudios de la academia.`, "/academia/expediente").catch(() => undefined);
      res.json({ mentor: { userId: mentorId, nombre } });
    } catch (err) {
      console.error("[academia] elegir mentor:", err);
      res.sendStatus(500);
    }
  });

  // Mis acompañados: el avance de cada persona que acompaño, sin notas ni contacto, y quién se detuvo.
  app.get("/api/academia/acompanados", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.userId) return res.status(401).json({ message: "Entra con tu cuenta." });
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const out: MisAcompanados = { acompanados: await acompanadosDe(acceso.userId), umbral: DIAS_DETENIDO_MENTOR };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] acompañados:", err);
      res.sendStatus(500);
    }
  });
}
