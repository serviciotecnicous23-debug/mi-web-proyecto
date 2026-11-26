/**
 * El cuadro de honor de la academia (shared/academia-honor.ts; pedido de Luis, 26-nov): la clasificación de los
 * estudiantes (general y por nivel), la comunidad (activos y egresados, con buscador) y el perfil de cada uno con su
 * vitrina, sus medallas y su puesto. Lo ven los estudiantes inscritos y la Administración (nunca es público), y cada
 * estudiante puede ocultarse del cuadro (`academia_alumnos.en_cuadro`). Muestra el nombre corto, el país y la
 * iglesia: nunca el teléfono ni el correo.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { accesoDe, estaInscrito, frenar } from "./academia-comun";
import { ESPECIALIDADES, HONORES, NIVELES, estatusDe, materiaPorId, medallaDe, puedeRevisar, type InsigniaMateria } from "@shared/academia";
import { MEDALLAS_PRACTICA } from "@shared/practicas";
import {
  compararHonor, nombreDeCuadro, puntosDeHonor, type CuadroHonor, type EstudianteCuadro, type FilaHonor, type MateriaHonor, type PerfilHonor,
} from "@shared/academia-honor";
import type { EstatusVista } from "@shared/academia-base";

export const HONOR_SQL = `
ALTER TABLE "academia_alumnos" ADD COLUMN IF NOT EXISTS "en_cuadro" boolean NOT NULL DEFAULT true;
`;

type Alumno = {
  userId: number;
  nombre: string;
  nombreBusqueda: string;
  pais: string;
  iglesia: string;
  desde: string;
  visible: boolean;
  estatus: EstatusVista;
  niveles: { nivel: number; honores: boolean }[];
  materias: (MateriaHonor & { id: string; nota: number; via: string })[];
  medallas: { clave: string; fecha: string }[];
};

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const siguienteDisponible = (ultimo: number) => !!NIVELES.find((n) => n.n === ultimo + 1)?.materias.some((m) => m.disponible);

/** Todos los estudiantes inscritos, con sus materias aprobadas y sus medallas (tres consultas). */
async function alumnos(): Promise<Map<number, Alumno>> {
  const { rows } = await pool.query(
    `SELECT a.user_id, a.nivel, a.estatus, a.en_cuadro, i.created_at AS desde,
            EXTRACT(EPOCH FROM now() - a.ultima_at)::float / 86400 AS dias,
            i.nombres, i.apellidos, i.pais, i.iglesia_otra, c.name AS iglesia_nombre,
            COALESCE(l.lecciones, 0) AS lecciones, n.completos, n.con_honores
       FROM academia_alumnos a
       JOIN academia_inscripciones i ON i.user_id = a.user_id
       LEFT JOIN ministry_churches c ON c.id = i.iglesia_id
       LEFT JOIN LATERAL (
         SELECT count(*)::int AS lecciones FROM academia_lecciones WHERE user_id = a.user_id AND completada_at IS NOT NULL) l ON true
       LEFT JOIN LATERAL (
         SELECT array_agg(nivel ORDER BY nivel) AS completos, array_agg(nivel) FILTER (WHERE promedio >= ${HONORES}) AS con_honores
           FROM academia_niveles WHERE user_id = a.user_id AND completado_at IS NOT NULL) n ON true
      WHERE a.matricula IS NOT NULL AND a.reglamento_at IS NOT NULL`,
  );
  const out = new Map<number, Alumno>();
  for (const r of rows as any[]) {
    const completos = ((r.completos ?? []) as number[]).map(Number);
    const conHonores = new Set(((r.con_honores ?? []) as number[]).map(Number));
    const ultimo = completos.length ? Math.max(...completos) : 0;
    const nombres = String(r.nombres ?? "");
    const apellidos = String(r.apellidos ?? "");
    out.set(Number(r.user_id), {
      userId: Number(r.user_id),
      nombre: nombreDeCuadro(nombres, apellidos),
      nombreBusqueda: sinTildes(`${nombres} ${apellidos}`),
      pais: r.pais ?? "",
      iglesia: r.iglesia_nombre ?? r.iglesia_otra ?? "",
      desde: new Date(r.desde).toISOString(),
      visible: r.en_cuadro !== false,
      estatus: estatusDe({
        retirado: r.estatus === "retirado",
        nivelActual: Number(r.nivel ?? 1),
        completados: completos,
        honores: conHonores.size > 0,
        lecciones: Number(r.lecciones),
        diasSinEstudiar: Number(r.dias ?? 0),
        siguienteDisponible: siguienteDisponible(ultimo),
      }),
      niveles: completos.map((nivel) => ({ nivel, honores: conHonores.has(nivel) })),
      materias: [],
      medallas: [],
    });
  }
  const ids = [...out.keys()];
  if (!ids.length) return out;
  const [{ rows: ms }, { rows: md }] = await Promise.all([
    pool.query(
      `SELECT user_id, materia_id, nota, nota_base, extra, via, aprobada_at FROM academia_materias WHERE estado = 'aprobada' AND nota IS NOT NULL AND user_id = ANY($1::int[])`,
      [ids],
    ),
    pool.query(`SELECT user_id, clave, logrado_at FROM academia_practicas_medallas WHERE user_id = ANY($1::int[])`, [ids]),
  ]);
  for (const r of ms as any[]) {
    const a = out.get(Number(r.user_id));
    const m = materiaPorId(String(r.materia_id));
    if (!a || !m) continue;
    const nota = Number(r.nota);
    const extra = Number(r.extra ?? 0);
    a.materias.push({
      id: m.id,
      nivel: m.nivel ?? null,
      nota,
      base: r.nota_base == null ? nota - extra : Number(r.nota_base),
      extra,
      via: String(r.via || "cursada"),
      fecha: r.aprobada_at ? new Date(r.aprobada_at).toISOString() : null,
    });
  }
  for (const r of md as any[]) out.get(Number(r.user_id))?.medallas.push({ clave: String(r.clave), fecha: new Date(r.logrado_at).toISOString() });
  return out;
}

/** La clasificación de un alcance (general o un nivel): solo quien se muestra, no está retirado y aprobó algo. */
function clasificar(todos: Map<number, Alumno>, nivel: number | null): { a: Alumno; p: ReturnType<typeof puntosDeHonor> }[] {
  return [...todos.values()]
    .filter((a) => a.visible && a.estatus.clave !== "retirado")
    .map((a) => ({ a, p: puntosDeHonor(a.materias, nivel) }))
    .filter((x) => x.p.aprobadas > 0)
    .sort((x, y) => compararHonor({ ...x.p, nombre: x.a.nombre }, { ...y.p, nombre: y.a.nombre }));
}

const puestoEn = (lista: { a: Alumno }[], userId: number) => {
  const k = lista.findIndex((x) => x.a.userId === userId);
  return k < 0 ? null : k + 1;
};

function insigniasDe(a: Alumno): InsigniaMateria[] {
  return a.materias
    .map((m) => {
      const def = materiaPorId(m.id)!;
      return {
        materiaId: m.id,
        titulo: def.titulo,
        nivel: def.nivel ?? null,
        especialidad: def.especialidad ? ESPECIALIDADES.find((e) => e.id === def.especialidad)?.nombre ?? null : null,
        nota: m.nota,
        medalla: medallaDe(m.nota),
        fecha: m.fecha,
        via: m.via,
      };
    })
    .sort((x, y) => (x.fecha ?? "").localeCompare(y.fecha ?? ""));
}

/** Quien puede mirar el cuadro: un estudiante inscrito o la Administración. */
async function quienMira(req: Request, res: Response): Promise<{ userId: number; admin: boolean } | null> {
  const acceso = await accesoDe(req);
  if (!acceso.ver) {
    res.status(403).json({ message: "La academia está cerrada por ahora." });
    return null;
  }
  if (!acceso.userId) {
    res.status(401).json({ message: "Entra con tu cuenta." });
    return null;
  }
  const admin = puedeRevisar(acceso.role);
  if (!admin && !(await estaInscrito(acceso.userId))) {
    res.status(403).json({ message: "El cuadro de honor es para los estudiantes de la academia: inscríbete para verlo." });
    return null;
  }
  return { userId: acceso.userId, admin };
}

export function registerAcademiaHonorRoutes(app: Express) {
  app.get("/api/academia/honor", async (req, res) => {
    try {
      const quien = await quienMira(req, res);
      if (!quien) return;
      const n = Number(req.query.nivel);
      const nivel = Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
      const todos = await alumnos();
      const lista = clasificar(todos, nivel);
      const yo = todos.get(quien.userId);
      const filas: FilaHonor[] = lista.slice(0, 100).map(({ a, p }, k) => ({
        ...p,
        puesto: k + 1,
        userId: a.userId,
        nombre: a.nombre,
        nivel: a.estatus.nivel,
        pais: a.pais,
        iglesia: a.iglesia,
        insignias: a.materias.length,
        medallas: a.medallas.length,
        propio: a.userId === quien.userId,
      }));
      const out: CuadroHonor = {
        nivel,
        total: lista.length,
        filas,
        yo: yo
          ? {
              alumno: true,
              visible: yo.visible,
              puesto: puestoEn(nivel == null ? lista : clasificar(todos, null), yo.userId),
              puestoNivel: puestoEn(clasificar(todos, yo.estatus.nivel), yo.userId),
              nivel: yo.estatus.nivel,
              puntos: puntosDeHonor(yo.materias).puntos,
            }
          : null,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] cuadro de honor:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/honor/estudiantes", async (req, res) => {
    try {
      const quien = await quienMira(req, res);
      if (!quien) return;
      const estado = req.query.estado === "egresados" ? "egresados" : "activos";
      const q = sinTildes(String(req.query.q ?? "").trim()).slice(0, 60);
      const todos = await alumnos();
      const general = clasificar(todos, null);
      const lista: EstudianteCuadro[] = [...todos.values()]
        .filter((a) => (a.visible || a.userId === quien.userId) && a.estatus.clave !== "retirado")
        .filter((a) => (estado === "egresados" ? a.estatus.clave === "egresado" || a.estatus.clave === "graduado" : a.estatus.clave !== "egresado" && a.estatus.clave !== "graduado"))
        .filter((a) => !q || a.nombreBusqueda.includes(q))
        .sort((x, y) => x.nombre.localeCompare(y.nombre, "es"))
        .slice(0, 200)
        .map((a) => ({
          userId: a.userId,
          nombre: a.nombre,
          estatus: a.estatus.clave,
          estatusTexto: a.estatus.texto,
          nivel: a.estatus.nivel,
          pais: a.pais,
          iglesia: a.iglesia,
          insignias: a.materias.length,
          medallas: a.medallas.length,
          puesto: puestoEn(general, a.userId),
        }));
      res.setHeader("Cache-Control", "no-store");
      res.json({ estado, estudiantes: lista });
    } catch (err) {
      console.error("[academia] cuadro de honor, estudiantes:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/academia/honor/alumno/:id", async (req, res) => {
    try {
      const quien = await quienMira(req, res);
      if (!quien) return;
      const todos = await alumnos();
      const a = todos.get(Number(req.params.id));
      const propio = !!a && a.userId === quien.userId;
      if (!a || ((!a.visible || a.estatus.clave === "retirado") && !propio && !quien.admin)) {
        return res.status(404).json({ message: "Ese estudiante no está en el cuadro de honor." });
      }
      const p = puntosDeHonor(a.materias);
      const out: PerfilHonor = {
        ...p,
        userId: a.userId,
        nombre: a.nombre,
        estatus: a.estatus.clave,
        estatusTexto: a.estatus.texto,
        nivel: a.estatus.nivel,
        pais: a.pais,
        iglesia: a.iglesia,
        desde: a.desde,
        niveles: a.niveles,
        insignias: insigniasDe(a),
        medallas: a.medallas
          .filter((m) => MEDALLAS_PRACTICA[m.clave])
          .map((m) => ({ clave: m.clave, nombre: MEDALLAS_PRACTICA[m.clave].nombre, detalle: MEDALLAS_PRACTICA[m.clave].detalle, fecha: m.fecha })),
        puesto: puestoEn(clasificar(todos, null), a.userId),
        puestoNivel: puestoEn(clasificar(todos, a.estatus.nivel), a.userId),
        propio,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] cuadro de honor, perfil:", err);
      res.sendStatus(500);
    }
  });

  // Mostrarse u ocultarse en el cuadro de honor (cada estudiante decide; por defecto se muestra).
  app.post("/api/academia/honor/visible", async (req, res) => {
    try {
      const quien = await quienMira(req, res);
      if (!quien) return;
      if (frenar(`honor-visible:${quien.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const visible = req.body?.visible !== false;
      const { rowCount } = await pool.query(`UPDATE academia_alumnos SET en_cuadro = $2 WHERE user_id = $1`, [quien.userId, visible]);
      if (!rowCount) return res.status(404).json({ message: "Primero inscríbete en la academia." });
      res.json({ visible });
    } catch (err) {
      console.error("[academia] cuadro de honor, visible:", err);
      res.sendStatus(500);
    }
  });
}
