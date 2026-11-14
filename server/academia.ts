/**
 * Las rutas de la Academia Avivando el Fuego (docs/academia.md): el catálogo con el avance de cada alumno, la materia
 * con su sílabo, las lecciones con su repaso, el versículo de memoria y el examen final (server/academia-examen.ts).
 *
 * Mientras la academia está en vista previa, solo la ven la administración y los profesores (shared/academia.ts,
 * ROLES_VISTA_PREVIA). Las preguntas llegan sin la respuesta y se corrigen aquí.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  miniPruebasDe,
  ESPECIALIDADES, ETAPAS, NIVELES, leccionPorId, leccionPublica, materiaPorId, medallaDe, pesosDe, puedeRevisar, puntajeVersiculo, requisitosMateria,
  type AcademiaEstado, type BloqueVista, type EstadoMateria, type LeccionVista, type MateriaDef, type MateriaDetalle, type MateriaResumen, type RespuestaRepaso,
  bloqueoDe, segundosDeLectura, videoQuePide, type BloqueoRepaso,
} from "@shared/academia";
import { BANCOS, CONTENIDO } from "./academia/index";
import type { PreguntaObjetiva } from "./academia/tipos";
import { numeroDe } from "./orden-examen";
import { lugaresDeLaBuena, opcionesConBuenaEn } from "./academia-orden";
import {
  accesoDe, alumnoDe, asegurarAlumno, asegurarMateria, componentesDe, enFila, estaInscrito, fichasDe, frenar, idFicha, inscripcionDe, inscritaEnMateria, inscritoEnMateriaDe,
  marcarEstudio, recalcularMateria, textoDeCita, MENSAJE_CERRADA, MENSAJE_INSCRIPCION, MENSAJE_MATERIA,
} from "./academia-comun";
import { matriculaDe, registerAcademiaMatriculaRoutes } from "./academia-matricula";
import { nivelesCompletos, registerAcademiaInscripcionRoutes } from "./academia-inscripcion";
import { registerAcademiaDireccionRoutes } from "./academia-direccion";
import { registerAcademiaRevisionRoutes } from "./academia-revision";
import { registerAcademiaCalidadRoutes } from "./academia-calidad";
import { registerAcademiaAsignacionesRoutes } from "./academia-asignaciones";
import { registerAcademiaMentoresRoutes } from "./academia-mentores";
import { claveSuficiencia, registerAcademiaSuficienciaRoutes } from "./academia-suficiencia";
import { estadoMini, registerAcademiaMiniRoutes } from "./academia-mini";
import { registerAcademiaEscritoRoutes, vistaBreve } from "./academia-escrito";
import { registerAcademiaDiagnosticoRoutes } from "./academia-diagnostico";
import { registerAcademiaVersiculosRoutes } from "./academia-versiculos";
import { estadoExamen, leerCurso, registerAcademiaExamenRoutes } from "./academia-examen";
import { cierresDe, integralDisponible, registerAcademiaNivelRoutes } from "./academia-nivel";
import { codigoDocumento, emitirMateria, registerAcademiaDocumentosRoutes } from "./academia-documentos";

export { ACADEMIA_SQL } from "./academia-comun";

type FilaLeccion = { leccion_id: string; completada: boolean; repaso: Record<string, { primera?: boolean; ok?: boolean }>; reflexion: string | null };

/**
 * El orden de las opciones de un repaso: fijo para cada persona (y para los visitantes), con la buena en un lugar
 * distinto en cada pregunta de la lección (server/academia-orden.ts).
 */
const semillaRepaso = (userId: number | null, leccionId: string) => ((userId ? Math.imul(userId, 2654435761) : 12345) ^ numeroDe(leccionId)) | 0;
function opcionesRepaso(p: PreguntaObjetiva, userId: number | null, lugar: number, leccionId: string, total: number): string[] {
  const semilla = semillaRepaso(userId, leccionId);
  return opcionesConBuenaEn(p.id, p.correcta, p.falsas, semilla, lugaresDeLaBuena(total, semilla)[lugar] ?? 0);
}

function estadoDe(m: MateriaDef, fila: { estado: string } | undefined, hechas: number): EstadoMateria {
  if (!m.disponible) return "en-preparacion";
  if (fila?.estado === "aprobada") return "aprobada";
  if (fila || hechas > 0) return "en-curso";
  return "disponible";
}


export { fichasDe };

/** Lo que le falta a un alumno para abrir el repaso de una lección (null si ya la completó). */
async function faltaParaRepaso(userId: number, minutos: number, leccionId: string): Promise<BloqueoRepaso | null> {
  const contenido = CONTENIDO.get(leccionId);
  const pideVideo = contenido ? videoQuePide(contenido.bloques) : null;
  const { rows } = await pool.query(
    `SELECT completada_at, EXTRACT(EPOCH FROM now() - COALESCE(abierta_at, now()))::float AS leidos, video_seg
       FROM academia_lecciones WHERE user_id = $1 AND leccion_id = $2`,
    [userId, leccionId],
  );
  const f = rows[0];
  if (f?.completada_at) return null;
  return bloqueoDe(minutos, pideVideo, Number(f?.leidos ?? 0), Number(f?.video_seg ?? 0));
}

export function registerAcademiaRoutes(app: Express) {
  // ---------------------------------------------------------------- el catálogo y el avance del alumno
  app.get("/api/academia/estado", async (req: Request, res: Response) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA, abierta: false });
      const userId = acceso.userId;
      let completadas = new Set<string>();
      let materias = new Map<string, { estado: string; nota: number | null }>();
      let alumno: AcademiaEstado["alumno"] = null;
      if (userId) {
        const [{ rows: l }, { rows: m }, { rows: al }] = await Promise.all([
          pool.query(`SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND completada_at IS NOT NULL`, [userId]),
          pool.query(`SELECT materia_id, estado, nota FROM academia_materias WHERE user_id = $1`, [userId]),
          pool.query(`SELECT inscrito_at, racha, racha_fecha FROM academia_alumnos WHERE user_id = $1`, [userId]),
        ]);
        completadas = new Set(l.map((r: any) => r.leccion_id));
        materias = new Map(m.map((r: any) => [r.materia_id, { estado: r.estado, nota: r.nota == null ? null : Number(r.nota) }]));
        if (al[0]) {
          alumno = {
            inscritoEn: new Date(al[0].inscrito_at).toISOString(),
            racha: Number(al[0].racha || 0),
            leccionesHechas: completadas.size,
            materiasAprobadas: [...materias.values()].filter((x) => x.estado === "aprobada").length,
          };
        }
      }
      const resumen = (m: MateriaDef): MateriaResumen => {
        const hechas = m.lecciones.filter((x) => completadas.has(x.id)).length;
        const fila = materias.get(m.id);
        const estado = estadoDe(m, fila, hechas);
        return {
          id: m.id, titulo: m.titulo, resumen: m.resumen, nivel: m.nivel, especialidad: m.especialidad, avanzada: m.avanzada, antes: m.antes,
          lecciones: m.lecciones.length, hechas, estado,
          nota: estado === "aprobada" ? fila?.nota ?? null : null,
          medalla: estado === "aprobada" && fila?.nota != null ? medallaDe(fila.nota) : null,
        };
      };
      const cierres = userId ? await cierresDe(userId) : new Map();
      const sinAvance = { integralAprobado: false, pacto: false, completado: null };
      const niveles = NIVELES.map(({ materias: ms, ...n }) => ({
        ...n,
        materias: ms.map(resumen),
        cierre: integralDisponible({ ...n, materias: ms }) ? cierres.get(n.n) ?? sinAvance : null,
      }));
      const especialidades = ESPECIALIDADES.map(({ materias: ms, ...e }) => ({ ...e, materias: ms.map(resumen) }));
      // Continuar: la primera materia en curso (o la primera disponible), en su primera lección sin terminar; con las
      // materias de un nivel aprobadas, el cierre de ese nivel (el examen integral y después el pacto).
      let continuar: AcademiaEstado["continuar"] = null;
      if (userId) {
        const completos = [...cierres].filter(([, c]) => !!c.completado).map(([n]) => n);
        const todas = NIVELES.flatMap((n) => n.materias).filter((m) => m.disponible);
        const m =
          todas.find((x) => materias.get(x.id)?.estado === "en-curso") ??
          todas.find((x) => !materias.has(x.id) && !requisitosMateria(x, completos).length);
        const porCerrar = niveles.find((n) => n.cierre && !n.cierre.completado && n.materias.every((x) => x.estado === "aprobada"));
        if (porCerrar && (!m || m.nivel! > porCerrar.n)) {
          continuar = {
            leccionId: null,
            titulo: porCerrar.cierre!.integralAprobado ? "El pacto del creyente" : "Examen integral",
            materiaId: "",
            materia: `Nivel ${porCerrar.n} · ${porCerrar.nombre}`,
            n: 0,
            de: 0,
            nivel: porCerrar.n,
          };
        } else if (m && !materias.has(m.id)) {
          continuar = { leccionId: null, titulo: "Presentación de la materia", materiaId: m.id, materia: m.titulo, n: 0, de: m.lecciones.length, inscribirse: true };
        } else if (m) {
          const k = m.lecciones.findIndex((x) => !completadas.has(x.id));
          continuar = {
            leccionId: k >= 0 ? m.lecciones[k].id : null,
            titulo: k >= 0 ? m.lecciones[k].titulo : "Examen final",
            materiaId: m.id,
            materia: m.titulo,
            n: k >= 0 ? k + 1 : m.lecciones.length,
            de: m.lecciones.length,
          };
        }
      }
      const [matricula, inscripcion] = userId ? await Promise.all([matriculaDe(userId), inscripcionDe(userId)]) : [null, null];
      const out: AcademiaEstado = {
        abierta: acceso.abierta, vistaPrevia: acceso.vistaPrevia, conSesion: !!userId, alumno, matricula, ficha: !!inscripcion?.ficha, continuar,
        etapas: ETAPAS, niveles, especialidades,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] estado:", err);
      res.sendStatus(500);
    }
  });

  // ---------------------------------------------------------------- la materia: sílabo, lecciones, versículo y examen
  app.get("/api/academia/materia/:materiaId", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m) return res.status(404).json({ message: "No existe esa materia." });
      const userId = acceso.userId;
      let lec = new Map<string, { vista: boolean; completada: boolean }>();
      let fila: { estado: string; nota: number | null; inicio: string; via: string } | undefined;
      let suf: { intentos: number; curso: unknown } | undefined;
      let completos: number[] = [];
      let versiculo: MateriaDetalle["versiculo"] = m.memoria ? { ref: m.memoria, aprendido: false, puntaje: null, intentos: 0 } : null;
      if (userId) {
        const [{ rows: l }, { rows: mt }, { rows: v }, { rows: sf }] = await Promise.all([
          pool.query(`SELECT leccion_id, completada_at IS NOT NULL AS completada FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`, [userId, m.lecciones.map((x) => x.id)]),
          pool.query(`SELECT estado, nota, inicio_at, via FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]),
          pool.query(`SELECT intentos, puntaje, aprendido_at FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]),
          pool.query(`SELECT intentos, curso FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, claveSuficiencia(m.id)]),
        ]);
        lec = new Map(l.map((r: any) => [r.leccion_id, { vista: true, completada: !!r.completada }]));
        fila = mt[0]
          ? { estado: mt[0].estado, nota: mt[0].nota == null ? null : Number(mt[0].nota), inicio: new Date(mt[0].inicio_at).toISOString(), via: String(mt[0].via || "cursada") }
          : undefined;
        suf = sf[0] ? { intentos: Number(sf[0].intentos || 0), curso: sf[0].curso } : undefined;
        completos = await nivelesCompletos(userId);
        if (versiculo && v[0]) versiculo = { ref: m.memoria!, aprendido: !!v[0].aprendido_at, puntaje: v[0].puntaje == null ? null : Number(v[0].puntaje), intentos: Number(v[0].intentos || 0) };
      }
      const hechas = m.lecciones.filter((x) => lec.get(x.id)?.completada).length;
      const estado = estadoDe(m, fila, hechas);
      const componentes = userId && m.disponible ? await componentesDe(userId, m) : {};
      const examen = userId && m.disponible && BANCOS.has(m.id) ? await estadoExamen(userId, m) : null;
      // La suficiencia se ofrece a quien no aprobó la materia ni dio su examen final, y solo una vez (o si la está dando).
      const sufEnCurso = !!leerCurso(suf?.curso);
      const suficiencia = examen && estado !== "aprobada" && !examen.intentos && !examen.enCurso && (!suf?.intentos || sufEnCurso) ? { enCurso: sufEnCurso } : null;
      // Nivel 2 en adelante: las mini pruebas y el escrito breve (de a una consulta por vez: la base acepta pocas conexiones)
      const minis: MateriaDetalle["minis"] = [];
      let breve: MateriaDetalle["breve"] = null;
      if (userId && m.disponible) {
        for (const g of miniPruebasDe(m)) {
          if (!BANCOS.get(m.id)?.mini?.[g.n]) continue;
          const e = await estadoMini(userId, m, g.n, g.lecciones);
          minis.push({ n: g.n, lecciones: g.lecciones, intentos: e.intentos, mejor: e.mejor, enCurso: e.enCurso, falta: e.falta, cerrado: e.cerrado ?? null });
        }
        const b = await vistaBreve(userId, m);
        if (b) breve = { entregas: b.entregas, maxEntregas: b.maxEntregas, mejor: b.mejor, falta: b.falta };
      }
      const out: MateriaDetalle = {
        materia: { ...m, lecciones: m.lecciones.map((x) => ({ ...x, vista: !!lec.get(x.id)?.vista, completada: !!lec.get(x.id)?.completada })) },
        pesos: pesosDe(m),
        estado,
        nota: fila?.nota ?? null,
        componentes,
        medalla: estado === "aprobada" && fila?.nota != null ? medallaDe(fila.nota) : null,
        versiculo,
        examen,
        certificado: userId && estado === "aprobada" ? (await codigoDocumento(userId, "materia", m.id)) ?? (await emitirMateria(userId, m, fila?.nota ?? 0)) : null,
        matriculado: userId ? await estaInscrito(userId) : false,
        inscrita: fila?.inicio ?? null,
        requisitos: requisitosMateria(m, completos),
        docente: !!userId && puedeRevisar(acceso.role),
        vistaPrevia: acceso.vistaPrevia,
        conSesion: !!userId,
        via: estado === "aprobada" ? ((fila?.via as MateriaDetalle["via"]) ?? "cursada") : null,
        suficiencia,
        minis,
        breve,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] materia:", err);
      res.sendStatus(500);
    }
  });

  // ---------------------------------------------------------------- la lección
  app.get("/api/academia/leccion/:leccionId", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const id = String(req.params.leccionId || "");
      const l = leccionPorId(id);
      const contenido = CONTENIDO.get(id);
      if (!l || !contenido || !l.materia.disponible) return res.status(404).json({ message: "Esa lección todavía no está disponible." });
      const publica = leccionPublica(id);
      const userId = acceso.userId;
      if (!userId && !publica) return res.status(401).json({ message: "Entra con tu cuenta para seguir con esta lección." });
      // Las lecciones (salvo la primera, pública) piden la inscripción en la academia y en la materia. La Dirección
      // académica y los profesores las leen sin inscribirse, sin guardar nada (vista docente).
      const [matriculado, inscrita] = userId ? await Promise.all([estaInscrito(userId), inscritaEnMateria(userId, l.materia.id).then(Boolean)]) : [false, false];
      const docente = !publica && !!userId && !(matriculado && inscrita) && puedeRevisar(acceso.role);
      if (!publica && !(matriculado && inscrita) && !docente) {
        return res.status(409).json({
          message: matriculado ? `Esta lección es de «${l.materia.titulo}». ${MENSAJE_MATERIA}` : MENSAJE_INSCRIPCION,
          inscripcion: matriculado,
          materia: inscrita,
          materiaId: l.materia.id,
        });
      }
      let fila: FilaLeccion | undefined;
      if (userId && !docente) {
        const { rows } = await pool.query(
          `INSERT INTO academia_lecciones (user_id, leccion_id, abierta_at) VALUES ($1, $2, now())
           ON CONFLICT (user_id, leccion_id) DO UPDATE SET vista_at = now(), abierta_at = COALESCE(academia_lecciones.abierta_at, now())
           RETURNING leccion_id, completada_at IS NOT NULL AS completada, repaso, reflexion,
                     EXTRACT(EPOCH FROM now() - abierta_at)::float AS leidos, video_seg`,
          [userId, id],
        );
        fila = rows[0];
      }
      // el repaso se abre después de leer (y de ver el video, si tiene): el servidor cuenta el tiempo
      const pide = { lectura: segundosDeLectura(l.leccion.minutos), video: videoQuePide(contenido.bloques) };
      const bloqueo: BloqueoRepaso | null = docente || fila?.completada
        ? null
        : bloqueoDe(l.leccion.minutos, pide.video, Number((fila as any)?.leidos ?? 0), Number((fila as any)?.video_seg ?? 0));
      const bloques: BloqueVista[] = await Promise.all(
        contenido.bloques.map(async (b): Promise<BloqueVista> => {
          if (b.t !== "versiculo") return b;
          const v = await textoDeCita(b.ref);
          return { t: "versiculo", ref: v.ref, texto: v.texto, enlace: v.enlace };
        }),
      );
      const banco = BANCOS.get(l.materia.id);
      const preguntasRepaso = banco?.repaso[id] ?? [];
      const repaso = preguntasRepaso.map((p, i) => ({ id: p.id, texto: p.texto, opciones: opcionesRepaso(p, userId, i, id, preguntasRepaso.length), hecha: !!fila?.repaso?.[p.id]?.ok }));
      const ms = l.materia.lecciones;
      const out: LeccionVista = {
        materia: { id: l.materia.id, titulo: l.materia.titulo },
        leccion: { id, titulo: l.leccion.titulo, n: l.indice + 1, de: ms.length, minutos: l.leccion.minutos, base: l.leccion.base },
        objetivos: contenido.objetivos,
        paraEmpezar: contenido.paraEmpezar,
        bloques,
        ideaClave: contenido.ideaClave,
        paraLaVida: contenido.paraLaVida,
        repaso,
        progreso: fila ? { completada: !!fila.completada, reflexion: fila.reflexion ?? "" } : null,
        anterior: l.indice > 0 ? ms[l.indice - 1].id : null,
        siguiente: l.indice < ms.length - 1 ? ms[l.indice + 1].id : null,
        publica,
        conSesion: !!userId,
        matriculado,
        inscrita,
        docente,
        bloqueo,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] lección:", err);
      res.sendStatus(500);
    }
  });

  // El avance del video de la lección (lo visto de corrido desde el principio): nunca cuenta más que el tiempo que pasó
  // desde que se empezó a ver. Sirve para abrir el repaso (shared/academia.ts, «LECTURA»).
  app.post("/api/academia/leccion/:leccionId/video", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.userId) return res.status(401).json({ message: "Entra con tu cuenta." });
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const id = String(req.params.leccionId || "");
      const l = leccionPorId(id);
      const contenido = CONTENIDO.get(id);
      if (!l || !contenido) return res.status(404).json({ message: "Esa lección no existe." });
      const pide = videoQuePide(contenido.bloques);
      if (pide == null) return res.json({ visto: 0, falta: 0 });
      if (frenar(`lv:${acceso.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const seg = Math.max(0, Math.min(36000, Math.floor(Number(req.body?.segundos) || 0)));
      const { rows } = await pool.query(
        `UPDATE academia_lecciones
            SET video_inicio = COALESCE(video_inicio, now()),
                video_seg = GREATEST(video_seg, LEAST($3::int, FLOOR(EXTRACT(EPOCH FROM now() - COALESCE(video_inicio, now())))::int))
          WHERE user_id = $1 AND leccion_id = $2
          RETURNING video_seg`,
        [acceso.userId, id, seg],
      );
      const visto = Number(rows[0]?.video_seg ?? 0);
      res.json({ visto, falta: Math.max(0, pide - visto) });
    } catch (err) {
      console.error("[academia] video de la lección:", err);
      res.sendStatus(500);
    }
  });

  // El repaso de la lección: se corrige al instante, con la explicación y la cita. Cuenta el acierto a la primera.
  app.post("/api/academia/repaso", async (req, res) => {
    const leccionId = String(req.body?.leccionId || "");
    const preguntaId = String(req.body?.preguntaId || "");
    const opcion = Math.floor(Number(req.body?.opcion));
    if (!Number.isInteger(opcion) || opcion < 0 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida." });
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const l = leccionPorId(leccionId);
      if (!l || !l.materia.disponible) return res.status(404).json({ message: "Esa lección no existe." });
      const userId = acceso.userId;
      const publica = leccionPublica(leccionId);
      if (!userId && !publica) return res.status(401).json({ message: "Entra con tu cuenta." });
      // Se guarda en la primera lección (pública) y en las materias inscritas; la vista docente responde sin guardar.
      const inscrita = userId ? !!(await inscritaEnMateria(userId, l.materia.id)) : false;
      if (userId && !publica && !inscrita && !puedeRevisar(acceso.role)) {
        return res.status(409).json({ message: MENSAJE_MATERIA, materia: false, materiaId: l.materia.id });
      }
      if (frenar(`rp:${userId ?? req.ip}`, 250)) return res.status(429).json({ message: "Espera un momento." });
      const preguntas = BANCOS.get(l.materia.id)?.repaso[leccionId] ?? [];
      const lugar = preguntas.findIndex((p) => p.id === preguntaId);
      if (lugar < 0) return res.status(404).json({ message: "Esa pregunta no es de esta lección." });
      const p = preguntas[lugar];
      const opciones = opcionesRepaso(p, userId, lugar, leccionId, preguntas.length);
      if (opcion >= opciones.length) return res.status(400).json({ message: "Respuesta no válida." });
      // antes de responder hay que leer la lección (y ver el video, si tiene): lo cuenta el servidor
      if (userId && (publica || inscrita)) {
        const falta = await faltaParaRepaso(userId, l.leccion.minutos, leccionId);
        if (falta && (falta.lectura > 0 || (falta.video ?? 0) > 0)) {
          return res.status(409).json({
            message: falta.lectura > 0 ? "Primero lee la lección: el repaso se abre en un momento." : "Primero mira los primeros minutos del video de la lección.",
            bloqueo: falta,
          });
        }
      }
      const bien = opciones[opcion] === p.correcta;
      let todas = false;
      if (userId && (publica || inscrita)) {
        todas = await enFila(userId, async () => {
          const { rows } = await pool.query(
            `INSERT INTO academia_lecciones (user_id, leccion_id) VALUES ($1, $2) ON CONFLICT (user_id, leccion_id) DO UPDATE SET vista_at = academia_lecciones.vista_at
             RETURNING repaso`,
            [userId, leccionId],
          );
          const repaso = (rows[0]?.repaso || {}) as Record<string, { primera?: boolean; ok?: boolean }>;
          const antes = repaso[p.id];
          repaso[p.id] = antes ? { primera: !!antes.primera, ok: !!antes.ok || bien } : { primera: bien, ok: bien };
          await pool.query(`UPDATE academia_lecciones SET repaso = $3::jsonb WHERE user_id = $1 AND leccion_id = $2`, [userId, leccionId, JSON.stringify(repaso)]);
          return preguntas.every((q) => repaso[q.id]?.ok);
        });
      }
      const out: RespuestaRepaso = { bien, correcta: p.correcta, explica: p.explica, ref: p.ref, todas };
      res.json(out);
    } catch (err) {
      console.error("[academia] repaso:", err);
      res.sendStatus(500);
    }
  });

  // Terminar la lección: pide el repaso respondido bien y la inscripción en la materia. Guarda la nota privada y suma el
  // día de estudio.
  app.post("/api/academia/leccion/:leccionId/completar", async (req, res) => {
    try {
      const id = String(req.params.leccionId || "");
      const l = leccionPorId(id);
      if (!l || !l.materia.disponible) return res.status(404).json({ message: "Esa lección no existe." });
      const a = await inscritoEnMateriaDe(req, res, l.materia.id);
      if (!a) return;
      const reflexion = typeof req.body?.reflexion === "string" ? req.body.reflexion.slice(0, 2000) : null;
      const out = await enFila(a.userId, async () => {
        const { rows } = await pool.query(`SELECT repaso FROM academia_lecciones WHERE user_id = $1 AND leccion_id = $2`, [a.userId, id]);
        if (!rows[0]) return { error: 409, message: "Primero abre la lección." };
        const repaso = (rows[0].repaso || {}) as Record<string, { ok?: boolean }>;
        const preguntas = BANCOS.get(l.materia.id)?.repaso[id] ?? [];
        if (!preguntas.every((p) => repaso[p.id]?.ok)) return { error: 409, message: "Primero responde bien el repaso de la lección." };
        await pool.query(
          `UPDATE academia_lecciones SET completada_at = COALESCE(completada_at, now()), reflexion = COALESCE($3, reflexion) WHERE user_id = $1 AND leccion_id = $2`,
          [a.userId, id, reflexion],
        );
        await asegurarAlumno(a.userId);
        await marcarEstudio(a.userId);
        await recalcularMateria(a.userId, l.materia);
        const ms = l.materia.lecciones;
        return { completada: true, siguiente: l.indice < ms.length - 1 ? ms[l.indice + 1].id : null };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.json(out);
    } catch (err) {
      console.error("[academia] completar:", err);
      res.sendStatus(500);
    }
  });

  // La nota privada de la lección («Para la vida»): solo la ve el alumno.
  app.post("/api/academia/leccion/:leccionId/reflexion", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const id = String(req.params.leccionId || "");
      if (!leccionPorId(id)) return res.status(404).json({ message: "Esa lección no existe." });
      if (frenar(`rf:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const texto = String(req.body?.texto ?? "").slice(0, 2000);
      await pool.query(
        `INSERT INTO academia_lecciones (user_id, leccion_id, reflexion) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, leccion_id) DO UPDATE SET reflexion = $3`,
        [a.userId, id, texto],
      );
      res.json({ guardada: true });
    } catch (err) {
      console.error("[academia] reflexión:", err);
      res.sendStatus(500);
    }
  });

  // ---------------------------------------------------------------- el versículo de memoria
  // Para estudiarlo: el texto. Para practicarlo (?practica=1): las fichas revueltas, sin el texto.
  app.get("/api/academia/versiculo/:materiaId", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m || !m.disponible || !m.memoria) return res.status(404).json({ message: "Esa materia no tiene versículo de memoria." });
      if (!(await inscritaEnMateria(a.userId, m.id)) && !puedeRevisar(a.acceso.role)) {
        return res.status(409).json({ message: MENSAJE_MATERIA, materia: false, materiaId: m.id });
      }
      const v = await textoDeCita(m.memoria);
      if (!v.texto) return res.status(503).json({ message: "No se pudo cargar el versículo. Inténtalo en un momento." });
      const { rows } = await pool.query(`SELECT intentos, fallos, puntaje, aprendido_at FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [a.userId, m.id]);
      const fila = rows[0];
      const estado = { aprendido: !!fila?.aprendido_at, puntaje: fila?.puntaje == null ? null : Number(fila.puntaje), intentos: Number(fila?.intentos || 0) };
      if (req.query.practica !== "1") return res.json({ ref: v.ref, texto: v.texto, enlace: v.enlace, ...estado });
      const fichas = fichasDe(v.texto).map((t, i) => ({ id: idFicha(a.userId, m.id, i), t }));
      const vuelta = estado.intentos + 1;
      let revueltas = [...fichas].sort((x, y) => (numeroDe(x.id + vuelta) >>> 0) - (numeroDe(y.id + vuelta) >>> 0));
      if (revueltas.every((f, i) => f.id === fichas[i].id)) revueltas = [...revueltas.slice(1), revueltas[0]];
      res.setHeader("Cache-Control", "no-store");
      res.json({ ref: v.ref, fichas: revueltas, ...estado });
    } catch (err) {
      console.error("[academia] versículo:", err);
      res.sendStatus(500);
    }
  });

  // Comprobar el orden de las fichas. Bien a la primera = 100; luego 80 y 60 como mínimo (shared/academia.ts). Pide la
  // inscripción en la materia.
  app.post("/api/academia/versiculo/:materiaId", async (req, res) => {
    try {
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m || !m.disponible || !m.memoria) return res.status(404).json({ message: "Esa materia no tiene versículo de memoria." });
      const a = await inscritoEnMateriaDe(req, res, m.id);
      if (!a) return;
      if (frenar(`vs:${a.userId}`, 500)) return res.status(429).json({ message: "Espera un momento." });
      const orden = Array.isArray(req.body?.orden) ? req.body.orden.map(String).slice(0, 80) : [];
      const v = await textoDeCita(m.memoria);
      if (!v.texto) return res.status(503).json({ message: "No se pudo cargar el versículo. Inténtalo en un momento." });
      const ids = fichasDe(v.texto).map((_, i) => idFicha(a.userId, m.id, i));
      let hasta = 0;
      while (hasta < ids.length && orden[hasta] === ids[hasta]) hasta++;
      const bien = hasta === ids.length && orden.length === ids.length;
      const out = await enFila(a.userId, async () => {
        await asegurarAlumno(a.userId);
        await asegurarMateria(a.userId, m.id);
        const { rows } = await pool.query(
          `INSERT INTO academia_versiculos (user_id, materia_id, ref, intentos, fallos) VALUES ($1, $2, $3, 1, $4)
           ON CONFLICT (user_id, materia_id) DO UPDATE SET intentos = academia_versiculos.intentos + 1,
             fallos = academia_versiculos.fallos + CASE WHEN academia_versiculos.aprendido_at IS NULL AND NOT $5 THEN 1 ELSE 0 END
           RETURNING fallos, puntaje, aprendido_at`,
          [a.userId, m.id, m.memoria, bien ? 0 : 1, bien],
        );
        let puntaje = rows[0].puntaje == null ? null : Number(rows[0].puntaje);
        if (bien && !rows[0].aprendido_at) {
          puntaje = puntajeVersiculo(Number(rows[0].fallos || 0));
          await pool.query(
            `UPDATE academia_versiculos SET puntaje = $3, aprendido_at = now(), caja = 1, proximo_at = now() + interval '1 day' WHERE user_id = $1 AND materia_id = $2`,
            [a.userId, m.id, puntaje],
          );
          await marcarEstudio(a.userId);
          await recalcularMateria(a.userId, m);
        }
        return { bien, hasta, total: ids.length, puntaje };
      });
      res.json(out);
    } catch (err) {
      console.error("[academia] versículo (respuesta):", err);
      res.sendStatus(500);
    }
  });

  registerAcademiaExamenRoutes(app);
  registerAcademiaNivelRoutes(app);
  registerAcademiaDocumentosRoutes(app);
  registerAcademiaMatriculaRoutes(app);
  registerAcademiaInscripcionRoutes(app);
  registerAcademiaDireccionRoutes(app);
  registerAcademiaRevisionRoutes(app);
  registerAcademiaCalidadRoutes(app);
  registerAcademiaAsignacionesRoutes(app);
  registerAcademiaMentoresRoutes(app);
  registerAcademiaSuficienciaRoutes(app);
  registerAcademiaMiniRoutes(app);
  registerAcademiaEscritoRoutes(app);
  registerAcademiaDiagnosticoRoutes(app);
  registerAcademiaVersiculosRoutes(app);
}
