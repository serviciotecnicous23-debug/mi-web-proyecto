/**
 * El panel de seguimiento de la Dirección académica (docs/academia.md, «El panel de seguimiento»): quién está inscrito
 * en la academia y en cada materia, por dónde va, sus notas y su ficha; la actividad reciente; los reportes en CSV; y el
 * expediente de cada alumno, que el alumno también ve. Los avisos de cada inscripción salen de academia-inscripcion.ts.
 *
 * Cada ruta comprueba su capacidad en la matriz de permisos (shared/academia-permisos.ts): la Dirección académica ve a
 * todos; los profesores, el avance y las notas, sin los datos de contacto; y las iglesias aliadas, solo a los alumnos de
 * su iglesia.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { HONORES, NIVELES, estatusDe, leccionPorId, materiaPorId, type EstadoMateria, type EstatusAlumno } from "@shared/academia";
import { alcanceDe, rolAcademia, type Alcance, type Capacidad } from "@shared/academia-permisos";
import type {
  ActividadItem, AlumnoDetalle, AlumnoFila, DireccionResumen, MateriaAvance, MateriaReporte, MateriaSeguimiento,
} from "@shared/academia-direccion";
import { accesoDe, claveFinal, frenar, inscritoDe } from "./academia-comun";
import { fichaDe } from "./academia-inscripcion";
import { aCsv } from "./academia-csv";

type Permiso = { userId: number; role: string; alcance: Alcance; iglesiaId: number | null };

/** Quien pide el panel y su alcance para una capacidad (o la respuesta de error ya enviada). */
async function permisoDe(req: Request, res: Response, capacidad: Capacidad): Promise<Permiso | null> {
  const acceso = await accesoDe(req);
  if (!acceso.userId) {
    res.status(401).json({ message: "Entra con tu cuenta." });
    return null;
  }
  const alcance = req.user!.isActive ? alcanceDe(acceso.role, capacidad) : "no";
  if (alcance === "no" || alcance === "propio") {
    res.status(403).json({ message: "Tu cuenta no tiene acceso al panel de la academia." });
    return null;
  }
  return { userId: acceso.userId, role: acceso.role ?? "", alcance, iglesiaId: alcance === "iglesia" ? Number(req.user!.churchId) || null : null };
}

const puede = (p: Permiso, c: Capacidad) => alcanceDe(p.role, c) !== "no";
const siguienteDisponible = (ultimo: number) => !!NIVELES.find((n) => n.n === ultimo + 1)?.materias.some((m) => m.disponible);
const tituloDe = (id: string) => materiaPorId(id)?.titulo ?? id;
const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);

/** Las filas de los alumnos inscritos que el permiso deja ver (o solo una). */
async function filasDe(p: Permiso, contacto: boolean, soloUser?: number): Promise<AlumnoFila[]> {
  const params: unknown[] = [];
  let donde = "a.matricula IS NOT NULL AND a.reglamento_at IS NOT NULL";
  if (p.alcance === "iglesia") {
    if (!p.iglesiaId) return [];
    params.push(p.iglesiaId);
    donde += ` AND i.iglesia_id = $${params.length}`;
  }
  if (soloUser) {
    params.push(soloUser);
    donde += ` AND a.user_id = $${params.length}`;
  }
  const { rows } = await pool.query(
    `SELECT a.user_id, a.matricula, a.promocion, a.nivel, a.estatus, a.ultima_at, i.created_at AS desde,
            EXTRACT(EPOCH FROM now() - a.ultima_at)::float / 86400 AS dias,
            i.nombres, i.apellidos, i.pais, i.ciudad, i.telefono, i.iglesia_otra, c.name AS iglesia_nombre, u.email,
            COALESCE(m.materias, 0) AS materias, COALESCE(m.aprobadas, 0) AS aprobadas, m.en_curso,
            COALESCE(l.lecciones, 0) AS lecciones, n.completos, COALESCE(n.honores, false) AS honores
       FROM academia_alumnos a
       JOIN academia_inscripciones i ON i.user_id = a.user_id
       JOIN users u ON u.id = a.user_id
       LEFT JOIN ministry_churches c ON c.id = i.iglesia_id
       LEFT JOIN LATERAL (
         SELECT count(*)::int AS materias, (count(*) FILTER (WHERE estado = 'aprobada'))::int AS aprobadas,
                array_agg(materia_id ORDER BY inicio_at) FILTER (WHERE estado <> 'aprobada') AS en_curso
           FROM academia_materias WHERE user_id = a.user_id) m ON true
       LEFT JOIN LATERAL (
         SELECT count(*)::int AS lecciones FROM academia_lecciones WHERE user_id = a.user_id AND completada_at IS NOT NULL) l ON true
       LEFT JOIN LATERAL (
         SELECT array_agg(nivel) AS completos, bool_or(promedio >= ${HONORES}) AS honores
           FROM academia_niveles WHERE user_id = a.user_id AND completado_at IS NOT NULL) n ON true
      WHERE ${donde}
      ORDER BY i.created_at DESC`,
    params,
  );
  return rows.map((r: any): AlumnoFila => {
    const completos = ((r.completos ?? []) as number[]).map(Number);
    const ultimo = completos.length ? Math.max(...completos) : 0;
    const fila: AlumnoFila = {
      userId: Number(r.user_id),
      nombre: `${r.nombres} ${r.apellidos}`.trim(),
      matricula: r.matricula,
      promocion: Number(r.promocion),
      pais: r.pais ?? "",
      ciudad: r.ciudad ?? "",
      iglesia: r.iglesia_nombre ?? r.iglesia_otra ?? "",
      estatus: estatusDe({
        retirado: r.estatus === "retirado",
        nivelActual: Number(r.nivel ?? 1),
        completados: completos,
        honores: !!r.honores,
        lecciones: Number(r.lecciones),
        diasSinEstudiar: Number(r.dias ?? 0),
        siguienteDisponible: siguienteDisponible(ultimo),
      }),
      materias: Number(r.materias),
      aprobadas: Number(r.aprobadas),
      enCurso: ((r.en_curso ?? []) as string[]).map(tituloDe),
      lecciones: Number(r.lecciones),
      desde: new Date(r.desde).toISOString(),
      ultima: new Date(r.ultima_at).toISOString(),
    };
    if (contacto) {
      fila.telefono = r.telefono ?? "";
      fila.correo = r.email ?? "";
    }
    return fila;
  });
}

/** El avance de cada alumno en cada materia en la que está inscrito (cinco consultas para todos). */
async function avancesPorAlumno(ids: number[]): Promise<Map<number, MateriaAvance[]>> {
  const out = new Map<number, MateriaAvance[]>();
  if (!ids.length) return out;
  const [{ rows: ms }, { rows: ls }, { rows: vs }, { rows: ps }, { rows: cs }] = await Promise.all([
    pool.query(`SELECT user_id, materia_id, estado, nota, inicio_at, aprobada_at FROM academia_materias WHERE user_id = ANY($1::int[]) ORDER BY inicio_at`, [ids]),
    pool.query(`SELECT user_id, leccion_id FROM academia_lecciones WHERE completada_at IS NOT NULL AND user_id = ANY($1::int[])`, [ids]),
    pool.query(`SELECT user_id, materia_id FROM academia_versiculos WHERE aprendido_at IS NOT NULL AND user_id = ANY($1::int[])`, [ids]),
    pool.query(`SELECT user_id, clave, intentos, mejor FROM academia_pruebas WHERE user_id = ANY($1::int[])`, [ids]),
    pool.query(`SELECT user_id, ref, codigo FROM academia_certificados WHERE tipo = 'materia' AND revocado_at IS NULL AND user_id = ANY($1::int[])`, [ids]),
  ]);
  const clave = (u: unknown, x: unknown) => `${u}|${x}`;
  const hechas = new Map<string, number>();
  for (const r of ls as any[]) {
    const l = leccionPorId(r.leccion_id);
    if (l) hechas.set(clave(r.user_id, l.materia.id), (hechas.get(clave(r.user_id, l.materia.id)) ?? 0) + 1);
  }
  const versos = new Set((vs as any[]).map((r) => clave(r.user_id, r.materia_id)));
  const pruebas = new Map((ps as any[]).map((r) => [clave(r.user_id, r.clave), r]));
  const certs = new Map((cs as any[]).map((r) => [clave(r.user_id, r.ref), r.codigo as string]));
  for (const r of ms as any[]) {
    const m = materiaPorId(r.materia_id);
    if (!m) continue;
    const u = Number(r.user_id);
    const p = pruebas.get(clave(u, claveFinal(m.id)));
    const lista = out.get(u) ?? [];
    lista.push({
      id: m.id,
      titulo: m.titulo,
      nivel: m.nivel,
      inscrita: new Date(r.inicio_at).toISOString(),
      estado: (r.estado === "aprobada" ? "aprobada" : "en-curso") as EstadoMateria,
      lecciones: Math.min(m.lecciones.length, hechas.get(clave(u, m.id)) ?? 0),
      de: m.lecciones.length,
      versiculo: versos.has(clave(u, m.id)),
      intentos: Number(p?.intentos ?? 0),
      mejor: p?.mejor == null ? null : Number(p.mejor),
      nota: r.nota == null ? null : Number(r.nota),
      aprobada: iso(r.aprobada_at),
      certificado: certs.get(clave(u, m.id)) ?? null,
    });
    out.set(u, lista);
  }
  return out;
}

/** El reporte de cada materia disponible: inscritos, en curso, aprobadas, promedio y avance medio. */
function reporteMaterias(avances: Map<number, MateriaAvance[]>): MateriaReporte[] {
  const todas = [...avances.values()].flat();
  return NIVELES.flatMap((n) => n.materias)
    .filter((m) => m.disponible)
    .map((m) => {
      const filas = todas.filter((a) => a.id === m.id);
      const aprobadas = filas.filter((a) => a.estado === "aprobada");
      const notas = aprobadas.map((a) => a.nota).filter((n): n is number => n != null);
      const hechas = filas.reduce((s, a) => s + a.lecciones, 0);
      return {
        id: m.id,
        titulo: m.titulo,
        nivel: m.nivel,
        orden: m.orden,
        inscritos: filas.length,
        enCurso: filas.length - aprobadas.length,
        aprobadas: aprobadas.length,
        promedio: notas.length ? Math.round(notas.reduce((s, x) => s + x, 0) / notas.length) : null,
        avance: filas.length ? Math.round((100 * hechas) / (filas.length * Math.max(1, m.lecciones.length))) : 0,
      };
    });
}

/** La actividad reciente de los alumnos que el permiso deja ver: inscripciones, materias aprobadas y niveles. */
async function actividadDe(ids: number[], limite = 60): Promise<ActividadItem[]> {
  if (!ids.length) return [];
  const { rows } = await pool.query(
    `SELECT e.tipo, e.user_id, e.ref, e.fecha, i.nombres, i.apellidos, a.matricula FROM (
        SELECT 'inscripcion' AS tipo, user_id, NULL::text AS ref, created_at AS fecha FROM academia_inscripciones WHERE user_id = ANY($1::int[])
        UNION ALL SELECT 'materia', user_id, materia_id, inicio_at FROM academia_materias WHERE user_id = ANY($1::int[])
        UNION ALL SELECT 'aprobada', user_id, materia_id, aprobada_at FROM academia_materias WHERE user_id = ANY($1::int[]) AND aprobada_at IS NOT NULL
        UNION ALL SELECT 'nivel', user_id, nivel::text, completado_at FROM academia_niveles WHERE user_id = ANY($1::int[]) AND completado_at IS NOT NULL
      ) e
      JOIN academia_inscripciones i ON i.user_id = e.user_id
      JOIN academia_alumnos a ON a.user_id = e.user_id
      ORDER BY e.fecha DESC LIMIT $2`,
    [ids, limite],
  );
  return (rows as any[]).map((r) => {
    const nv = r.tipo === "nivel" ? NIVELES.find((n) => n.n === Number(r.ref)) : null;
    const texto =
      r.tipo === "inscripcion"
        ? "se inscribió en la academia"
        : r.tipo === "materia"
          ? `se inscribió en «${tituloDe(r.ref)}»`
          : r.tipo === "aprobada"
            ? `aprobó «${tituloDe(r.ref)}»`
            : `completó el Nivel ${r.ref}${nv ? ` · ${nv.nombre}` : ""}`;
    return { tipo: r.tipo, userId: Number(r.user_id), nombre: `${r.nombres} ${r.apellidos}`.trim(), matricula: r.matricula ?? null, texto, fecha: new Date(r.fecha).toISOString() };
  });
}

/** El detalle de un alumno: su ficha (con permiso), su avance, sus niveles, sus certificados y su actividad. */
async function detalleDe(fila: AlumnoFila, contacto: boolean): Promise<AlumnoDetalle> {
  const id = fila.userId;
  const [avances, { rows: nv }, { rows: cs }, actividad, ficha] = await Promise.all([
    avancesPorAlumno([id]),
    pool.query(`SELECT nivel, pacto_at, completado_at, promedio FROM academia_niveles WHERE user_id = $1 ORDER BY nivel`, [id]),
    pool.query(`SELECT codigo, tipo, ref, titulo, nombre, nota, honores, via, emitido_at, revocado_at, motivo FROM academia_certificados WHERE user_id = $1 ORDER BY emitido_at`, [id]),
    actividadDe([id], 30),
    contacto ? fichaDe(id) : Promise.resolve(null),
  ]);
  return {
    fila,
    ficha,
    materias: avances.get(id) ?? [],
    niveles: (nv as any[]).map((r) => ({
      n: Number(r.nivel),
      nombre: NIVELES.find((x) => x.n === Number(r.nivel))?.nombre ?? "",
      pacto: iso(r.pacto_at),
      completado: iso(r.completado_at),
      promedio: r.promedio == null ? null : Number(r.promedio),
    })),
    certificados: (cs as any[]).map((r) => {
      const nivel = r.tipo === "nivel" ? NIVELES.find((x) => String(x.n) === String(r.ref)) : materiaPorId(r.ref)?.nivel ? NIVELES[materiaPorId(r.ref)!.nivel! - 1] : null;
      return {
        codigo: r.codigo,
        tipo: r.tipo,
        ref: r.ref,
        titulo: r.titulo,
        nivel: nivel ? { n: nivel.n, nombre: nivel.nombre } : null,
        nombre: r.nombre,
        nota: r.nota == null ? null : Number(r.nota),
        honores: !!r.honores,
        via: r.via,
        emitido: new Date(r.emitido_at).toISOString(),
        revocado: iso(r.revocado_at),
        motivo: r.motivo ?? null,
        verificar: "",
        qr: null,
      };
    }),
    actividad,
    puede: { contacto },
  };
}

// ---------------------------------------------------------------- los reportes en CSV

const fechaCorta = (v: string | null | undefined) => (v ? v.slice(0, 10) : "");

// ---------------------------------------------------------------- las rutas

const ESTATUS_EN_CERO: Record<EstatusAlumno, number> = { aspirante: 0, activo: 0, pausa: 0, egresado: 0, graduado: 0, retirado: 0 };
/** Días sin estudiar, con materias en curso, para salir en «Se detuvieron». */
export const DIAS_DETENIDO = 14;

function contar(valores: string[]): { nombre: string; n: number }[] {
  const m = new Map<string, number>();
  for (const v of valores) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m].map(([nombre, n]) => ({ nombre, n })).sort((a, b) => b.n - a.n || a.nombre.localeCompare(b.nombre, "es"));
}

async function iglesiaDe(id: number | null): Promise<{ id: number; nombre: string } | null> {
  if (!id) return null;
  const { rows } = await pool.query(`SELECT name FROM ministry_churches WHERE id = $1`, [id]);
  return rows[0] ? { id, nombre: String(rows[0].name) } : null;
}

export function registerAcademiaDireccionRoutes(app: Express) {
  // El resumen: inscritos, estatus, materias, países, iglesias, quiénes se detuvieron y la actividad reciente.
  app.get("/api/academia/direccion/resumen", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "panel");
      if (!p) return;
      const filas = await filasDe(p, false);
      const ids = filas.map((f) => f.userId);
      const ahora = Date.now();
      const estatus = { ...ESTATUS_EN_CERO };
      for (const f of filas) estatus[f.estatus.clave]++;
      const materias = reporteMaterias(await avancesPorAlumno(ids));
      const aprobadas = materias.reduce((s, m) => s + m.aprobadas, 0);
      const { rows: nv } = ids.length
        ? await pool.query(`SELECT count(*)::int AS n FROM academia_niveles WHERE completado_at IS NOT NULL AND user_id = ANY($1::int[])`, [ids])
        : { rows: [{ n: 0 }] };
      const out: DireccionResumen = {
        rol: rolAcademia(p.role),
        alcance: p.alcance,
        iglesia: await iglesiaDe(p.iglesiaId),
        totales: {
          inscritos: filas.length,
          nuevosSemana: filas.filter((f) => ahora - Date.parse(f.desde) < 7 * 86_400_000).length,
          nuevosMes: filas.filter((f) => ahora - Date.parse(f.desde) < 30 * 86_400_000).length,
          lecciones: filas.reduce((s, f) => s + f.lecciones, 0),
          aprobadas,
          niveles: Number(nv[0]?.n ?? 0),
          promedio: aprobadas ? Math.round(materias.reduce((s, m) => s + (m.promedio ?? 0) * m.aprobadas, 0) / aprobadas) : null,
        },
        estatus,
        materias,
        paises: contar(filas.map((f) => f.pais)),
        iglesias: contar(filas.map((f) => f.iglesia || "Sin iglesia")),
        detenidos: filas.filter((f) => f.enCurso.length > 0 && ahora - Date.parse(f.ultima) >= DIAS_DETENIDO * 86_400_000).slice(0, 50),
        actividad: await actividadDe(ids, 40),
        puede: { exportar: puede(p, "exportar"), contacto: puede(p, "contacto") },
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] dirección, resumen:", err);
      res.sendStatus(500);
    }
  });

  // El registro: las inscripciones en la academia y en cada materia, las materias aprobadas y los niveles completos.
  app.get("/api/academia/direccion/actividad", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "panel");
      if (!p) return;
      const filas = await filasDe(p, false);
      res.setHeader("Cache-Control", "no-store");
      res.json({ actividad: await actividadDe(filas.map((f) => f.userId), 300) });
    } catch (err) {
      console.error("[academia] dirección, actividad:", err);
      res.sendStatus(500);
    }
  });

  // Los alumnos inscritos, con su avance (y su contacto, con permiso).
  app.get("/api/academia/direccion/alumnos", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const contacto = puede(p, "contacto");
      res.setHeader("Cache-Control", "no-store");
      res.json({ alumnos: await filasDe(p, contacto), puede: { exportar: puede(p, "exportar"), contacto } });
    } catch (err) {
      console.error("[academia] dirección, alumnos:", err);
      res.sendStatus(500);
    }
  });

  // Un alumno: su ficha (con permiso), su avance en cada materia, sus niveles, sus certificados y su actividad.
  app.get("/api/academia/direccion/alumno/:alumnoId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const id = Number(req.params.alumnoId);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe ese alumno." });
      const contacto = puede(p, "contacto");
      const [fila] = await filasDe(p, contacto, id);
      if (!fila) return res.status(404).json({ message: "No existe ese alumno, o no es de tu iglesia." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await detalleDe(fila, contacto));
    } catch (err) {
      console.error("[academia] dirección, alumno:", err);
      res.sendStatus(500);
    }
  });

  // Una materia: quiénes están inscritos y por dónde va cada uno.
  app.get("/api/academia/direccion/materia/:materiaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m || !m.disponible) return res.status(404).json({ message: "No existe esa materia, o todavía está en preparación." });
      const filas = await filasDe(p, puede(p, "contacto"));
      const avances = await avancesPorAlumno(filas.map((f) => f.userId));
      const alumnos = filas
        .flatMap((f) => {
          const avance = avances.get(f.userId)?.find((a) => a.id === m.id);
          return avance ? [{ ...f, avance }] : [];
        })
        .sort((a, b) => b.avance.inscrita.localeCompare(a.avance.inscrita));
      const out: MateriaSeguimiento = { materia: reporteMaterias(avances).find((x) => x.id === m.id)!, alumnos, puede: { exportar: puede(p, "exportar") } };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] dirección, materia:", err);
      res.sendStatus(500);
    }
  });

  // Los reportes en CSV: los alumnos, el avance de cada uno en cada materia y el resumen por materia.
  app.get("/api/academia/direccion/exportar/:archivo", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "exportar");
      if (!p) return;
      const archivo = String(req.params.archivo || "");
      if (!["alumnos.csv", "avance.csv", "materias.csv"].includes(archivo)) return res.status(404).json({ message: "No existe ese reporte." });
      if (frenar(`ax:${p.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const contacto = puede(p, "contacto");
      const filas = await filasDe(p, contacto);
      const avances = await avancesPorAlumno(filas.map((f) => f.userId));
      let datos: unknown[][];
      if (archivo === "alumnos.csv") {
        datos = [
          [
            "Matrícula", "Nombre", "País", "Ciudad", "Iglesia", ...(contacto ? ["Teléfono", "Correo"] : []), "Estatus", "Materias inscritas",
            "Materias aprobadas", "En curso", "Lecciones completadas", "Inscrito el", "Última actividad",
          ],
          ...filas.map((f) => [
            f.matricula, f.nombre, f.pais, f.ciudad, f.iglesia, ...(contacto ? [f.telefono ?? "", f.correo ?? ""] : []), f.estatus.texto, f.materias,
            f.aprobadas, f.enCurso.join("; "), f.lecciones, fechaCorta(f.desde), fechaCorta(f.ultima),
          ]),
        ];
      } else if (archivo === "avance.csv") {
        datos = [
          [
            "Matrícula", "Nombre", "Iglesia", "Materia", "Inscrito el", "Estado", "Lecciones", "De", "Versículo", "Intentos del examen", "Mejor examen",
            "Nota", "Aprobada el", "Certificado",
          ],
        ];
        for (const f of filas) {
          for (const a of avances.get(f.userId) ?? []) {
            datos.push([
              f.matricula, f.nombre, f.iglesia, a.titulo, fechaCorta(a.inscrita), a.estado === "aprobada" ? "Aprobada" : "En curso", a.lecciones, a.de,
              a.versiculo ? "Sí" : "No", a.intentos, a.mejor ?? "", a.nota ?? "", fechaCorta(a.aprobada), a.certificado ?? "",
            ]);
          }
        }
      } else {
        datos = [
          ["Nivel", "Materia", "Inscritos", "En curso", "Aprobadas", "Promedio de las aprobadas", "Avance medio (%)"],
          ...reporteMaterias(avances).map((m) => [m.nivel ?? "Especialidad", m.titulo, m.inscritos, m.enCurso, m.aprobadas, m.promedio ?? "", m.avance]),
        ];
      }
      const fecha = new Date().toISOString().slice(0, 10);
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="academia-${archivo.replace(".csv", "")}-${fecha}.csv"`);
      res.setHeader("Cache-Control", "no-store");
      res.send(aCsv(datos));
    } catch (err) {
      console.error("[academia] dirección, exportar:", err);
      res.sendStatus(500);
    }
  });

  // Mi expediente (kárdex): mis materias con su avance y su nota, mis niveles y mis certificados.
  app.get("/api/academia/expediente", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const [fila] = await filasDe({ userId: a.userId, role: "", alcance: "todos", iglesiaId: null }, true, a.userId);
      if (!fila) return res.status(404).json({ message: "Todavía no tienes expediente." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await detalleDe(fila, true));
    } catch (err) {
      console.error("[academia] expediente:", err);
      res.sendStatus(500);
    }
  });
}
