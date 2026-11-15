/**
 * Las especialidades (docs/academia.md, «Las especialidades» y «El certificado de especialidad»): la página de cada una,
 * con sus cinco materias y el avance del alumno; el trabajo final; y el Certificado de Especialidad, que sale solo con
 * las cinco materias aprobadas y el trabajo final aprobado.
 *
 * El trabajo final es como el escrito breve (server/academia-escrito.ts), pero de toda la especialidad: de 300 a 1.200
 * palabras, sin reloj, con 3 entregas, y cuenta la mejor. Lo corrige el sistema con su clave (server/academia/trabajos.ts)
 * y lo puede revisar la Administración: cada entrega queda como un intento (`academia_intentos`) y su respuesta en
 * `academia_respuestas`, con el contexto «trabajo» de `contextoExamen`. Después de cada entrega se ve qué ideas encontró
 * el corrector; la respuesta modelo, solo después de la última (si no, la entrega siguiente se copiaría).
 *
 * La nota del certificado es el promedio de las cinco materias y del trabajo final (`notaEspecialidad`); desde 90, con
 * honores. Si una revisión cambia una nota, server/academia-revision.ts lo vuelve a mirar (`reconsiderarEspecialidad`).
 */
import type { Express } from "express";
import { pool } from "./db";
import {
  APRUEBA, ESCRITA, ESPECIALIDADES, HONORES, TRABAJO_ESPECIALIDAD, medallaDe, notaEspecialidad, requisitosMateria,
  type EspecialidadDef, type EspecialidadDetalle, type ResultadoExamen, type TrabajoEspecialidadVista,
} from "@shared/academia";
import { TRABAJOS } from "./academia/trabajos";
import { MENSAJE_CERRADA, accesoDe, claveTrabajo, enFila, estadoDe, estaInscrito, frenar, inscritoDe, marcarEstudio } from "./academia-comun";
import { corregirEscrita } from "./academia-correccion";
import { filaDe } from "./academia-examen";
import { emitirEspecialidad } from "./academia-documentos";
import { nivelesCompletos } from "./academia-inscripcion";

const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

export const especialidadPorId = (id: string | undefined | null) => ESPECIALIDADES.find((e) => e.id === id);

/** ¿Ya tiene su trabajo final? Cuando sus cinco materias están publicadas y su clave de corrección está escrita. */
export function tieneTrabajo(e: EspecialidadDef): boolean {
  return TRABAJOS.has(e.id) && e.materias.length > 0 && e.materias.every((m) => m.disponible);
}

/** Lo que lleva el alumno en una especialidad. */
export type AvanceEspecialidad = {
  /** Las filas de sus materias en academia_materias (las que empezó). */
  filas: { materia_id: string; estado: string; nota: number | null }[];
  /** Las materias aprobadas y su nota. */
  notas: Map<string, number>;
  aprobadas: number;
  total: number;
  /** La mejor nota del trabajo final (null si no lo entregó) y cuántas entregas hizo. */
  trabajo: number | null;
  entregas: number;
  /** Las cinco materias y el trabajo final aprobados. */
  completa: boolean;
  /** La nota del certificado (solo si está completa). */
  nota: number | null;
};

export async function avanceEspecialidad(userId: number, e: EspecialidadDef): Promise<AvanceEspecialidad> {
  const ids = e.materias.map((m) => m.id);
  const [{ rows: mats }, { rows: tr }] = await Promise.all([
    pool.query(`SELECT materia_id, estado, nota FROM academia_materias WHERE user_id = $1 AND materia_id = ANY($2::text[])`, [userId, ids]),
    pool.query(`SELECT intentos, mejor FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, claveTrabajo(e.id)]),
  ]);
  const filas = (mats as any[]).map((r) => ({ materia_id: String(r.materia_id), estado: String(r.estado), nota: r.nota == null ? null : Number(r.nota) }));
  const notas = new Map(filas.filter((r) => r.estado === "aprobada").map((r) => [r.materia_id, r.nota ?? 0] as const));
  const aprobadas = ids.filter((id) => notas.has(id)).length;
  const trabajo = tr[0]?.mejor == null ? null : Number(tr[0].mejor);
  const completa = ids.length > 0 && aprobadas === ids.length && trabajo != null && trabajo >= APRUEBA;
  return {
    filas,
    notas,
    aprobadas,
    total: ids.length,
    trabajo,
    entregas: Number(tr[0]?.intentos ?? 0),
    completa,
    nota: completa ? notaEspecialidad(ids.map((id) => notas.get(id)!), trabajo!) : null,
  };
}

/**
 * El certificado de la especialidad, si ya la completó: se emite al instante, o, si ya lo tenía y vale, se le pone la
 * nota de hoy (una entrega mejor del trabajo final la sube). Devuelve su código, o null si todavía no la completó.
 */
export async function revisarEspecialidad(userId: number, e: EspecialidadDef): Promise<string | null> {
  const av = await avanceEspecialidad(userId, e);
  if (!av.completa || av.nota == null) return null;
  return emitirEspecialidad(userId, e, av.nota);
}

/** Lo que falta para entregar el trabajo final. */
function faltaParaTrabajo(inscrito: boolean, av: AvanceEspecialidad): string[] {
  const falta: string[] = [];
  if (!inscrito) falta.push("inscribirte en la academia");
  const faltan = av.total - av.aprobadas;
  if (faltan > 0) {
    falta.push(faltan === av.total ? `aprobar las ${av.total} materias de la especialidad` : `aprobar ${faltan === 1 ? "1 materia más" : `${faltan} materias más`} de la especialidad`);
  }
  return falta;
}

/** El trabajo final para el alumno (sin sesión, solo la consigna). */
async function vistaTrabajo(userId: number | null, e: EspecialidadDef, av: AvanceEspecialidad | null): Promise<TrabajoEspecialidadVista | null> {
  const clave = TRABAJOS.get(e.id);
  if (!clave || !tieneTrabajo(e)) return null;
  const { min, max } = ESCRITA[clave.tipo];
  const maxEntregas = TRABAJO_ESPECIALIDAD.entregas;
  if (!userId || !av) return { pregunta: clave.pregunta, min, max, entregas: 0, maxEntregas, mejor: null, falta: ["entrar con tu cuenta"], cerrado: null, ultimo: null };
  // (solo se lee: la fila de la prueba se crea con la primera entrega)
  const { rows } = await pool.query(`SELECT intentos, mejor, resultado FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, claveTrabajo(e.id)]);
  const entregas = Number(rows[0]?.intentos ?? 0);
  return {
    pregunta: clave.pregunta,
    min,
    max,
    entregas,
    maxEntregas,
    mejor: rows[0]?.mejor == null ? null : Number(rows[0].mejor),
    falta: faltaParaTrabajo(await estaInscrito(userId), av),
    cerrado: entregas >= maxEntregas ? `Ya hiciste las ${maxEntregas} entregas: cuenta tu mejor nota.` : null,
    ultimo: (rows[0]?.resultado as ResultadoExamen | null) ?? null,
  };
}

/** La página de la especialidad: sus materias con el avance del alumno, el trabajo final y el certificado. */
export async function detalleEspecialidad(userId: number | null, e: EspecialidadDef, vistaPrevia: boolean): Promise<EspecialidadDetalle> {
  const av = userId ? await avanceEspecialidad(userId, e) : null;
  const leccionIds = e.materias.flatMap((m) => m.lecciones.map((l) => l.id));
  const [completos, { rows: lec }, { rows: doc }] = userId
    ? await Promise.all([
        nivelesCompletos(userId),
        pool.query(`SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND completada_at IS NOT NULL AND leccion_id = ANY($2::text[])`, [userId, leccionIds]),
        pool.query(`SELECT codigo, nota, honores FROM academia_certificados WHERE user_id = $1 AND tipo = 'especialidad' AND ref = $2`, [userId, e.id]),
      ])
    : [[] as number[], { rows: [] as any[] }, { rows: [] as any[] }];
  let certificado: { codigo: string; nota: number | null; honores: boolean } | null = doc[0]
    ? { codigo: String(doc[0].codigo), nota: doc[0].nota == null ? null : Number(doc[0].nota), honores: !!doc[0].honores }
    : null;
  // la completó y todavía no tiene su certificado (por ejemplo, si se cortó la conexión al emitirlo): se emite ahora
  if (userId && av?.completa && av.nota != null && !certificado) {
    const codigo = await revisarEspecialidad(userId, e);
    if (codigo) certificado = { codigo, nota: av.nota, honores: av.nota >= HONORES };
  }
  const hechas = new Set((lec as any[]).map((r) => String(r.leccion_id)));
  const materias = e.materias.map((m) => {
    const fila = av?.filas.find((r) => r.materia_id === m.id);
    const h = m.lecciones.filter((l) => hechas.has(l.id)).length;
    const estado = estadoDe(m, fila, h);
    return {
      id: m.id,
      titulo: m.titulo,
      resumen: m.resumen,
      avanzada: !!m.avanzada,
      lecciones: m.lecciones.length,
      hechas: h,
      estado,
      nota: estado === "aprobada" ? fila?.nota ?? null : null,
      requisitos: requisitosMateria(m, completos),
    };
  });
  return {
    id: e.id,
    nombre: e.nombre,
    resumen: e.resumen,
    materias,
    aprobadas: av?.aprobadas ?? 0,
    trabajo: await vistaTrabajo(userId, e, av),
    certificado: certificado?.codigo ?? null,
    nota: certificado?.nota ?? null,
    honores: certificado?.honores ?? false,
    conSesion: !!userId,
    vistaPrevia,
  };
}

export function registerAcademiaEspecialidadRoutes(app: Express) {
  app.get("/api/academia/especialidad/:especialidadId", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const e = especialidadPorId(String(req.params.especialidadId || ""));
      if (!e) return res.status(404).json({ message: "No existe esa especialidad." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await detalleEspecialidad(acceso.userId, e, acceso.vistaPrevia));
    } catch (err) {
      console.error("[academia] especialidad:", err);
      res.sendStatus(500);
    }
  });

  // Entregar el trabajo final: se corrige al instante y cuenta la mejor de las 3 entregas. Con las cinco materias y el
  // trabajo aprobados, el certificado de especialidad sale en ese momento.
  app.post("/api/academia/especialidad/:especialidadId/trabajo", async (req, res) => {
    try {
      const e = especialidadPorId(String(req.params.especialidadId || ""));
      const clave = e && tieneTrabajo(e) ? TRABAJOS.get(e.id) : undefined;
      if (!e || !clave) return res.status(404).json({ message: "Esta especialidad todavía no tiene su trabajo final." });
      const a = await inscritoDe(req, res);
      if (!a) return;
      const texto = typeof req.body?.texto === "string" ? req.body.texto.trim().slice(0, 20000) : "";
      const { min, max } = ESCRITA[clave.tipo];
      const n = palabras(texto);
      // lo que no llega o se pasa no gasta una entrega
      if (n < min) return res.status(400).json({ message: `Escribe al menos ${min} palabras (llevas ${n}).` });
      if (n > max) return res.status(400).json({ message: `Escribe como máximo ${max} palabras (llevas ${n}).` });
      if (frenar(`trabajo:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async () => {
        const v = await vistaTrabajo(a.userId, e, await avanceEspecialidad(a.userId, e));
        if (!v) return { error: 404, message: "Esta especialidad todavía no tiene su trabajo final." };
        if (v.falta.length) return { error: 409, message: `Antes te falta ${v.falta.join(" y ")}.` };
        if (v.cerrado) return { error: 409, message: v.cerrado };
        const r = corregirEscrita(clave, texto, { pegado: req.body?.pegado === true });
        const k = claveTrabajo(e.id);
        const intento = v.entregas + 1;
        await filaDe(a.userId, k);
        await pool.query(
          `UPDATE academia_pruebas
              SET intentos = $3, ultima = $4, mejor = GREATEST(COALESCE(mejor, 0), $4),
                  aprobada_at = CASE WHEN GREATEST(COALESCE(mejor, 0), $4) >= $5 THEN COALESCE(aprobada_at, now()) ELSE aprobada_at END,
                  updated_at = now()
            WHERE user_id = $1 AND clave = $2`,
          [a.userId, k, intento, r.nota, APRUEBA],
        );
        await pool.query(
          `INSERT INTO academia_respuestas (user_id, clave, intento, pregunta_id, texto, nota_auto, detalle, revisar) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)`,
          [a.userId, k, intento, clave.id, texto, r.nota, JSON.stringify(r.detalle), r.revisar],
        );
        await pool.query(
          `INSERT INTO academia_intentos (user_id, clave, intento, objetiva, escrita, nota, nota_auto, aciertos, de, respuestas)
           VALUES ($1, $2, $3, 0, $4, $4, $4, 0, 0, '[]'::jsonb) ON CONFLICT (user_id, clave, intento) DO NOTHING`,
          [a.userId, k, intento, r.nota],
        );
        await revisarEspecialidad(a.userId, e);
        const { detalle: _d, ...correccion } = r;
        const resultado: ResultadoExamen = {
          intento,
          nota: r.nota,
          objetiva: 0,
          escrita: r.nota,
          aprobado: r.nota >= APRUEBA,
          medalla: medallaDe(r.nota),
          aciertos: 0,
          de: 0,
          revision: [],
          escritas: [{ ...correccion, pregunta: clave.pregunta, texto, modelo: intento >= TRABAJO_ESPECIALIDAD.entregas ? clave.modelo : "" }],
          materia: null,
          espera: 0,
        };
        await pool.query(`UPDATE academia_pruebas SET resultado = $3::jsonb WHERE user_id = $1 AND clave = $2`, [a.userId, k, JSON.stringify(resultado)]);
        await marcarEstudio(a.userId);
        return { ok: true as const };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(await detalleEspecialidad(a.userId, e, a.acceso.vistaPrevia));
    } catch (err) {
      console.error("[academia] trabajo final (entrega):", err);
      res.sendStatus(500);
    }
  });
}
