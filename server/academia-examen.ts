/**
 * Los exámenes de la academia (docs/academia.md, «El sistema de evaluación»): el final de cada materia y el integral de
 * cada nivel (server/academia-nivel.ts). Los dos son una EVALUACIÓN con el mismo motor:
 *
 * Como los cuestionarios de Moodle: banco de preguntas, preguntas al azar sin repetir las del intento anterior,
 * tiempo por pregunta, intentos con espera y revisión completa al terminar. Tiene dos partes:
 * - Parte A, objetiva: el servidor manda las preguntas de a una, sin la respuesta y con las opciones en su propio
 *   orden (server/orden-examen.ts); lleva el reloj (la que llega tarde, o la que se dejó vencer, cuenta como mala) y no
 *   dice si estuvo bien hasta el final. El examen sale REPARTIDO (server/academia-eleccion.ts): por lección en el final
 *   de una materia, por materia en el integral.
 * - Parte B, escrita: respuestas desde el teléfono, corregidas por el corrector automático (server/academia-correccion.ts);
 *   lo dudoso queda marcado para que lo revise quien tenga el cargo.
 * La materia se aprueba con 70 de nota (shared/academia.ts) y el examen final aprobado; el integral, con 75. Si no, hay
 * que esperar para repetirlo (30 minutos y después 24 horas), y en una materia, desde el tercer fallo, volver a abrir
 * todas las lecciones.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  APRUEBA, DIAS_APELACION, ESCRITA, FALLOS_PARA_REPASAR, MARGEN_ESCRITA_SEGUNDOS, MARGEN_SEGUNDOS, esperaFinalMin, examenDe, materiaPorId, medallaDe,
  notaExamen, type Apelable, type ApelacionVista, type CorreccionVista, type ExamenEstado, type MateriaDef, type MedidaExamen, type PasoExamen,
  type ResultadoExamen,
} from "@shared/academia";
import { ROLES_ACADEMIA } from "@shared/academia-permisos";
import { BANCOS, escritaPorId, preguntaPorId } from "./academia/index";
import type { PreguntaObjetiva } from "./academia/tipos";
import { corregirEscrita, type ClaveEscrita } from "./academia-correccion";
import { numeroDe, opcionesDeExamen } from "./orden-examen";
import { lugaresDeLaBuena, opcionesConBuenaEn } from "./academia-orden";
import { elegirEscritas, elegirFinal } from "./academia-eleccion";
import {
  alumnoDe, asegurarAlumno, asegurarMateria, avisarA, claveFinal, contextoExamen, cuentasConRoles, enFila, estaInscrito, frenar, inscritoDe, marcarEstudio,
  nombreAcademico, preguntasRetiradas, recalcularMateria,
} from "./academia-comun";
import { emitirMateria } from "./academia-documentos";

export { elegirFinal } from "./academia-eleccion";

type RespuestaA = { id: string; opcion: number; bien: boolean; tarde: boolean };
type NotaB = { id: string; nota: number; texto: string; respuestaId: number; correccion: CorreccionVista };
type Curso = {
  ids: string[];
  i: number;
  enviada: boolean;
  respuestas: RespuestaA[];
  escritas: string[];
  e: number;
  escritaEnviada: boolean;
  notasEscritas: NotaB[];
  semilla: number;
  /** El lugar de la buena en cada pregunta (los intentos nuevos: cada 4 preguntas usan las 4 letras). */
  lugares?: number[];
};
export type FilaPrueba = {
  intentos: number;
  fallos: number;
  mejor: number | null;
  vistas: unknown;
  curso: unknown;
  resultado: unknown;
  aprobada_at: string | null;
  pasados_curso: number | null;
  pasados_fallo: number | null;
};

/** Las partes de un intento cerrado, para que cada evaluación decida con sus reglas (la suficiencia pide las dos). */
export type PartesIntento = { objetiva: number; escrita: number; respuestas: { id: string; bien: boolean }[] };

/** Lo que decide una evaluación al cerrar un intento. */
export type CierreEvaluacion = {
  /** Si quedó aprobado lo que se evalúa (la materia o el nivel): si no, cuenta como un fallo, con su espera. */
  aprobada: boolean;
  materia: ResultadoExamen["materia"];
  /** Si el examen quedó aprobado (si no se dice, la nota contra `aprueba`). */
  examenAprobado?: boolean;
  /** Sin espera para otro intento (la suficiencia se da una vez; la diagnóstica, cada 30 días). */
  sinEspera?: boolean;
};

/** Un examen de la academia: el final de una materia, el integral de un nivel, la suficiencia o la diagnóstica. */
export type Evaluacion = {
  /** Su fila en academia_pruebas. */
  clave: string;
  medida: MedidaExamen;
  /** La nota con que se aprueba el examen. */
  aprueba: number;
  final: PreguntaObjetiva[];
  escritas: ClaveEscrita[];
  /** Cómo se reparte la parte A (por lección o por materia) y, si hace falta, la parte B. */
  grupo?: (p: PreguntaObjetiva) => string;
  grupoEscrita?: (e: ClaveEscrita) => string;
  /** Lo que falta para darlo, si ya está aprobado, la espera y lo que hay que repasar. */
  estado: (userId: number) => Promise<ExamenEstado>;
  /** Al empezar un intento (alumno, materia y racha). */
  alEmpezar: (userId: number) => Promise<void>;
  /** Al cerrar un intento: si quedó aprobado lo que se evalúa (la materia o el nivel) y la parte de la materia. */
  alCerrar: (userId: number, nota: number, partes: PartesIntento) => Promise<CierreEvaluacion>;
  /** Para los mensajes: «esta materia», «el examen integral». */
  yaAprobado: string;
  /**
   * Si el resultado muestra cada pregunta con su respuesta (por defecto sí). La suficiencia y la diagnóstica no: sus
   * preguntas salen del banco del examen final, que se da después.
   */
  revisionCompleta?: boolean;
  /**
   * Si se puede pedir la revisión de un intento (por defecto sí). La diagnóstica y las mini pruebas no: un texto dice por
   * qué (o `false`, con un motivo general).
   */
  apelable?: boolean | string;
};

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

export function leerCurso(v: unknown): Curso | null {
  if (!v || typeof v !== "object") return null;
  const c = v as Partial<Curso>;
  if (!Array.isArray(c.ids) || typeof c.i !== "number") return null;
  return {
    ids: lista(c.ids), i: c.i, enviada: c.enviada === true, respuestas: Array.isArray(c.respuestas) ? c.respuestas : [],
    escritas: lista(c.escritas), e: Number(c.e) || 0, escritaEnviada: c.escritaEnviada === true,
    notasEscritas: Array.isArray(c.notasEscritas) ? c.notasEscritas : [], semilla: Number(c.semilla) || 1,
    lugares: Array.isArray(c.lugares) ? c.lugares.map((x) => Number(x) || 0) : undefined,
  };
}

export async function filaDe(userId: number, clave: string): Promise<FilaPrueba> {
  await pool.query(`INSERT INTO academia_pruebas (user_id, clave) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, clave]);
  const { rows } = await pool.query(
    `SELECT intentos, fallos, mejor, vistas, curso, resultado, aprobada_at,
            EXTRACT(EPOCH FROM now() - curso_at)::float AS pasados_curso,
            EXTRACT(EPOCH FROM now() - fallo_at)::float AS pasados_fallo
       FROM academia_pruebas WHERE user_id = $1 AND clave = $2`,
    [userId, clave],
  );
  return rows[0] as FilaPrueba;
}

async function guardarCurso(userId: number, clave: string, c: Curso, reloj: "ahora" | "parar" | "igual"): Promise<void> {
  const set = reloj === "ahora" ? ", curso_at = now()" : reloj === "parar" ? ", curso_at = NULL" : "";
  await pool.query(`UPDATE academia_pruebas SET curso = $3::jsonb${set}, updated_at = now() WHERE user_id = $1 AND clave = $2`, [userId, clave, JSON.stringify(c)]);
}

function opcionesDe(p: PreguntaObjetiva, c: Curso, lugar: number): string[] {
  // los intentos de antes de repartir la buena siguen con su orden de siempre
  if (c.lugares) return opcionesConBuenaEn(p.id, p.correcta, p.falsas, c.semilla, c.lugares[lugar] ?? 0);
  return opcionesDeExamen(p.id, p.correcta, p.falsas, c.semilla, lugar);
}

/** Lo común del estado de cualquier examen: intentos, mejor nota, en curso y espera tras un fallo. */
export function estadoBase(f: FilaPrueba, medida: MedidaExamen, aprueba: number): Omit<ExamenEstado, "falta" | "aprobado" | "repasar"> {
  const fallos = Number(f.fallos || 0);
  return {
    medida,
    aprueba,
    intentos: Number(f.intentos || 0),
    fallos,
    mejor: f.mejor == null ? null : Number(f.mejor),
    enCurso: !!leerCurso(f.curso),
    espera: fallos ? Math.max(0, Math.ceil(esperaFinalMin(fallos) * 60 - Number(f.pasados_fallo ?? 1e9))) : 0,
  };
}

// ---------------------------------------------------------------- el examen final de una materia

export async function estadoExamen(userId: number, m: MateriaDef): Promise<ExamenEstado> {
  const medida = examenDe(m);
  const clave = claveFinal(m.id);
  const f = await filaDe(userId, clave);
  const ids = m.lecciones.map((l) => l.id);
  const { rows: lec } = await pool.query(
    `SELECT leccion_id, completada_at IS NOT NULL AS completada,
            (fallo_at IS NULL OR vista_at > fallo_at) AS repasada
       FROM academia_lecciones l
       LEFT JOIN academia_pruebas p ON p.user_id = l.user_id AND p.clave = $3
      WHERE l.user_id = $1 AND l.leccion_id = ANY($2::text[])`,
    [userId, ids, clave],
  );
  const completadas = new Set(lec.filter((r: any) => r.completada).map((r: any) => r.leccion_id));
  const repasadas = new Set(lec.filter((r: any) => r.repasada).map((r: any) => r.leccion_id));
  const { rows: v } = await pool.query(`SELECT aprendido_at FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const { rows: mat } = await pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const falta: string[] = [];
  if (!(await estaInscrito(userId))) falta.push("inscribirte en la academia");
  else if (!mat[0]) falta.push("inscribirte en esta materia");
  const pendientes = ids.filter((id) => !completadas.has(id)).length;
  if (pendientes) falta.push(pendientes === ids.length ? `completar las ${ids.length} lecciones` : `completar ${pendientes === 1 ? "1 lección" : `${pendientes} lecciones`}`);
  if (m.memoria && !v[0]?.aprendido_at) falta.push("aprender el versículo de memoria");
  const base = estadoBase(f, medida, APRUEBA);
  return {
    ...base,
    falta,
    aprobado: mat[0]?.estado === "aprobada",
    repasar: base.fallos >= FALLOS_PARA_REPASAR ? ids.filter((id) => !repasadas.has(id)) : [],
  };
}

/** El examen final de una materia como evaluación. */
export function evaluacionDeMateria(m: MateriaDef): Evaluacion {
  const banco = BANCOS.get(m.id)!;
  return {
    clave: claveFinal(m.id),
    medida: examenDe(m),
    aprueba: APRUEBA,
    final: banco.final,
    escritas: banco.escritas,
    estado: (userId) => estadoExamen(userId, m),
    alEmpezar: async (userId) => {
      await asegurarAlumno(userId);
      await asegurarMateria(userId, m.id);
      await marcarEstudio(userId);
    },
    alCerrar: async (userId) => {
      const materia = await recalcularMateria(userId, m);
      // la materia aprobada recibe su certificado al instante
      if (materia.aprobada) await emitirMateria(userId, m, materia.nota);
      return { aprobada: materia.aprobada, materia: { nota: materia.nota, aprobada: materia.aprobada, medalla: materia.aprobada ? medallaDe(materia.nota) : null } };
    },
    yaAprobado: "Ya aprobaste esta materia.",
  };
}

// ---------------------------------------------------------------- el paso que toca

function vistaObjetiva(c: Curso, medida: MedidaExamen, pasados: number) {
  const p = preguntaPorId(c.ids[c.i])!;
  return {
    id: p.id,
    texto: p.texto,
    opciones: opcionesDe(p, c, c.i),
    n: c.i + 1,
    de: c.ids.length,
    segundos: medida.segundos,
    quedan: Math.max(0, Math.round(medida.segundos - pasados)),
  };
}

function vistaEscrita(c: Curso, medida: MedidaExamen, pasados: number) {
  const e = escritaPorId(c.escritas[c.e])!;
  const { min, max } = ESCRITA[e.tipo];
  const segundos = medida.minutosEscrita * 60;
  return { id: e.id, texto: e.pregunta, tipo: e.tipo, min, max, minutos: medida.minutosEscrita, quedan: Math.max(0, Math.round(segundos - pasados)), n: c.e + 1, de: c.escritas.length };
}

/** El paso que toca en el examen en curso: la pregunta objetiva, la escrita o el resultado. Vence lo que se dejó pasar. */
async function pasoActual(userId: number, ev: Evaluacion, c: Curso, pasadosIniciales: number | null): Promise<PasoExamen> {
  const { medida, clave } = ev;
  let pasados = pasadosIniciales;
  while (c.i < c.ids.length) {
    if (!preguntaPorId(c.ids[c.i])) {
      // (el banco cambió a mitad del intento: esa pregunta no cuenta)
      c.ids.splice(c.i, 1);
      continue;
    }
    if (c.enviada) {
      if ((pasados ?? 0) > medida.segundos + MARGEN_SEGUNDOS) {
        c.respuestas.push({ id: c.ids[c.i], opcion: -1, bien: false, tarde: true });
        c.i += 1;
        c.enviada = false;
        pasados = null;
        await guardarCurso(userId, clave, c, "parar");
        continue;
      }
      return { paso: "objetiva", pregunta: vistaObjetiva(c, medida, pasados ?? 0) };
    }
    c.enviada = true;
    await guardarCurso(userId, clave, c, "ahora");
    return { paso: "objetiva", pregunta: vistaObjetiva(c, medida, 0) };
  }
  while (c.e < c.escritas.length) {
    const e = escritaPorId(c.escritas[c.e]);
    if (!e) {
      c.escritas.splice(c.e, 1);
      continue;
    }
    if (c.escritaEnviada) {
      if ((pasados ?? 0) > medida.minutosEscrita * 60 + MARGEN_ESCRITA_SEGUNDOS) {
        // se dejó vencer: cuenta como una respuesta vacía fuera de tiempo
        await guardarEscrita(userId, clave, c, e, "", false, true);
        pasados = null;
        continue;
      }
      return { paso: "escrita", escrita: vistaEscrita(c, medida, pasados ?? 0) };
    }
    c.escritaEnviada = true;
    await guardarCurso(userId, clave, c, "ahora");
    return { paso: "escrita", escrita: vistaEscrita(c, medida, 0) };
  }
  return { paso: "fin", resultado: await cerrarIntento(userId, ev, c) };
}

/** Corrige y guarda una respuesta escrita (para la revisión de la Dirección académica) y pasa a la siguiente. */
async function guardarEscrita(userId: number, clave: string, c: Curso, e: ClaveEscrita, texto: string, pegado: boolean, tarde: boolean): Promise<void> {
  const r = corregirEscrita(e, texto, { pegado, tarde });
  const { rows } = await pool.query(`SELECT intentos FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, clave]);
  const ins = await pool.query(
    `INSERT INTO academia_respuestas (user_id, clave, intento, pregunta_id, texto, nota_auto, detalle, revisar)
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8) RETURNING id`,
    [userId, clave, Number(rows[0]?.intentos || 1), e.id, texto, r.nota, JSON.stringify(r.detalle), r.revisar],
  );
  const { detalle: _d, ...correccion } = r;
  c.notasEscritas.push({ id: e.id, nota: r.nota, texto, respuestaId: Number(ins.rows[0].id), correccion });
  c.e += 1;
  c.escritaEnviada = false;
  await guardarCurso(userId, clave, c, "parar");
}

/** El texto de la opción que eligió (para el análisis de preguntas: qué opción falsa confunde más). */
function elegidaDe(r: RespuestaA, c: Curso, lugar: number): string | null {
  if (r.opcion < 0) return null;
  const p = preguntaPorId(r.id);
  return p ? opcionesDe(p, c, lugar)[r.opcion] ?? null : null;
}

/** Cierra el intento: la nota del examen, lo que queda aprobado, la revisión completa y la espera si no aprobó. */
async function cerrarIntento(userId: number, ev: Evaluacion, c: Curso): Promise<ResultadoExamen> {
  const { medida, clave } = ev;
  const aciertos = c.respuestas.filter((r) => r.bien).length;
  const de = c.respuestas.length || c.ids.length || 1;
  const objetiva = Math.round((100 * aciertos) / de);
  const escrita = c.notasEscritas.length ? Math.round(c.notasEscritas.reduce((a, n) => a + n.nota, 0) / c.notasEscritas.length) : 0;
  const nota = notaExamen(objetiva, escrita, medida.pesoObjetiva);

  // las preguntas de este intento quedan «vistas» (el próximo trae otras); si ya casi no quedan nuevas, se empieza otra vuelta
  const f = await filaDe(userId, clave);
  // el registro del intento: sus partes y su nota (si la Dirección académica cambia una escrita, se recalcula con esto)
  const numero = Number(f.intentos || 1);
  await pool.query(
    `INSERT INTO academia_intentos (user_id, clave, intento, objetiva, escrita, nota, nota_auto, aciertos, de, respuestas)
     VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, $9::jsonb) ON CONFLICT (user_id, clave, intento) DO NOTHING`,
    [userId, clave, numero, objetiva, escrita, nota, aciertos, de, JSON.stringify(c.respuestas.map((r, lugar) => ({ id: r.id, bien: r.bien, tarde: r.tarde, elegida: elegidaDe(r, c, lugar) })))],
  );
  let vistas = new Set([...lista(f.vistas), ...c.ids, ...c.escritas]);
  const retiradas = await preguntasRetiradas();
  const nuevasFinal = ev.final.filter((p) => !vistas.has(p.id) && !retiradas.has(p.id)).length;
  if (nuevasFinal < medida.objetivas) vistas = new Set([...c.ids, ...c.escritas]);
  await pool.query(
    `UPDATE academia_pruebas SET ultima = $3, mejor = GREATEST(COALESCE(mejor, 0), $3), vistas = $4::jsonb, curso = NULL, curso_at = NULL, updated_at = now()
      WHERE user_id = $1 AND clave = $2`,
    [userId, clave, nota, JSON.stringify([...vistas])],
  );
  const cierre = await ev.alCerrar(userId, nota, { objetiva, escrita, respuestas: c.respuestas.map((r) => ({ id: r.id, bien: r.bien })) });
  const { rows } = await pool.query(
    `UPDATE academia_pruebas
        SET fallos = fallos + CASE WHEN $3 THEN 0 ELSE 1 END,
            fallo_at = CASE WHEN $3 THEN fallo_at ELSE now() END,
            aprobada_at = CASE WHEN $3 AND aprobada_at IS NULL THEN now() ELSE aprobada_at END
      WHERE user_id = $1 AND clave = $2 RETURNING fallos`,
    [userId, clave, cierre.aprobada],
  );
  const fallos = Number(rows[0]?.fallos || 0);
  const completa = ev.revisionCompleta !== false;
  const revision = !completa ? [] : c.respuestas.map((r, lugar) => {
    const p = preguntaPorId(r.id);
    if (!p) return { texto: "(pregunta retirada)", opciones: [], elegida: -1, correcta: -1, bien: false, tarde: r.tarde, explica: "", ref: "" };
    const opciones = opcionesDe(p, c, lugar);
    return { texto: p.texto, opciones, elegida: r.opcion, correcta: opciones.indexOf(p.correcta), bien: r.bien, tarde: r.tarde, explica: p.explica, ref: p.ref };
  });
  const escritas = !completa ? [] : c.notasEscritas.map((n) => {
    const e = escritaPorId(n.id);
    return { ...n.correccion, pregunta: e?.pregunta ?? "", texto: n.texto, modelo: e?.modelo ?? "" };
  });
  const resultado: ResultadoExamen = {
    intento: numero,
    nota,
    objetiva,
    escrita,
    aprobado: cierre.examenAprobado ?? nota >= ev.aprueba,
    medalla: medallaDe(nota),
    aciertos,
    de,
    revision,
    escritas,
    materia: cierre.materia,
    espera: cierre.aprobada || cierre.sinEspera ? 0 : esperaFinalMin(fallos) * 60,
  };
  await pool.query(`UPDATE academia_pruebas SET resultado = $3::jsonb WHERE user_id = $1 AND clave = $2`, [userId, clave, JSON.stringify(resultado)]);
  return resultado;
}

// ---------------------------------------------------------------- el pedido de revisión (docs/academia.md, «La revisión»)

/** El pedido de revisión de un examen, si lo hay. */
async function apelacionDe(userId: number, clave: string): Promise<ApelacionVista | null> {
  const { rows } = await pool.query(`SELECT estado, mensaje, created_at, respuesta, resuelta_at FROM academia_apelaciones WHERE user_id = $1 AND clave = $2`, [userId, clave]);
  const r = rows[0];
  if (!r) return null;
  return {
    estado: r.estado === "resuelta" ? "resuelta" : "pendiente",
    mensaje: r.mensaje,
    creada: new Date(r.created_at).toISOString(),
    respuesta: r.respuesta ?? null,
    resuelta: r.resuelta_at ? new Date(r.resuelta_at).toISOString() : null,
  };
}

/** Si se puede pedir la revisión del último intento: una vez por examen, dentro de DIAS_APELACION días. */
async function apelableDe(userId: number, clave: string, ev?: Evaluacion): Promise<Apelable & { intento: number | null }> {
  if (ev && ev.apelable !== undefined && ev.apelable !== true) {
    return { puede: false, hasta: null, porque: typeof ev.apelable === "string" ? ev.apelable : "Esta prueba no admite pedidos de revisión.", intento: null };
  }
  const [{ rows: ap }, { rows: p }, { rows: it }] = await Promise.all([
    pool.query(`SELECT 1 FROM academia_apelaciones WHERE user_id = $1 AND clave = $2`, [userId, clave]),
    pool.query(`SELECT intentos, resultado IS NOT NULL AS hay, curso IS NOT NULL AS en_curso, updated_at FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, clave]),
    pool.query(`SELECT intento, cerrado_at FROM academia_intentos WHERE user_id = $1 AND clave = $2 ORDER BY intento DESC LIMIT 1`, [userId, clave]),
  ]);
  if (ap.length) return { puede: false, hasta: null, porque: "Ya pediste la revisión de este examen: se pide una sola vez.", intento: null };
  const f = p[0];
  if (!f?.hay || f.en_curso) return { puede: false, hasta: null, porque: "Todavía no tienes un intento cerrado de este examen.", intento: null };
  const intento = Number(f.intentos || 1);
  const cerrado = it[0] && Number(it[0].intento) === intento ? new Date(it[0].cerrado_at) : new Date(f.updated_at);
  const hasta = new Date(cerrado.getTime() + DIAS_APELACION * 86_400_000);
  if (Date.now() > hasta.getTime()) return { puede: false, hasta: hasta.toISOString(), porque: `El plazo para pedir la revisión (${DIAS_APELACION} días) ya pasó.`, intento };
  return { puede: true, hasta: hasta.toISOString(), porque: null, intento };
}

// ---------------------------------------------------------------- las rutas

function minutosTexto(seg: number): string {
  if (seg <= 90) return `${seg} segundos`;
  const min = Math.ceil(seg / 60);
  if (min < 90) return `${min} minutos`;
  return `${Math.ceil(min / 60)} horas`;
}

/** La evaluación de la ruta, o la respuesta de error ya enviada. */
export type Resolver = (req: Request, res: Response) => Evaluacion | null;

/**
 * Las rutas de un examen: GET `base` (estado y último resultado) y POST `base/empezar`, `base/paso`, `base/respuesta`
 * y `base/escrita`. Sirven igual para el final de una materia y para el integral de un nivel.
 */
export function rutasDeEvaluacion(app: Express, base: string, resolver: Resolver) {
  // Cómo va el examen (y el resultado del último intento, con su revisión completa).
  app.get(base, async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      const estado = await ev.estado(a.userId);
      const [{ rows }, apelacion, ap] = await Promise.all([
        pool.query(`SELECT resultado FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [a.userId, ev.clave]),
        apelacionDe(a.userId, ev.clave),
        apelableDe(a.userId, ev.clave, ev),
      ]);
      const { intento: _i, ...apelable } = ap;
      res.setHeader("Cache-Control", "no-store");
      res.json({ estado, ultimo: rows[0]?.resultado ?? null, apelacion, apelable });
    } catch (err) {
      console.error("[academia] examen:", err);
      res.sendStatus(500);
    }
  });

  // Empezar un intento (o retomar el que está en curso). Pide aceptar el compromiso de honradez.
  app.post(`${base}/empezar`, async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      if (req.body?.compromiso !== true) return res.status(400).json({ message: "Para empezar, acepta el compromiso de honradez." });
      if (frenar(`ae:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async (): Promise<{ paso: PasoExamen } | { error: number; message: string; espera?: number; repasar?: string[] }> => {
        const est = await ev.estado(a.userId);
        const f = await filaDe(a.userId, ev.clave);
        const curso = leerCurso(f.curso);
        if (curso) return { paso: await pasoActual(a.userId, ev, curso, f.pasados_curso) };
        if (est.aprobado) return { error: 409, message: ev.yaAprobado };
        if (est.cerrado) return { error: 409, message: est.cerrado };
        if (est.falta.length) return { error: 409, message: `Antes del examen te falta ${est.falta.join(" y ")}.` };
        if (est.espera > 0) return { error: 429, message: `Repasa con calma y vuelve en ${minutosTexto(est.espera)}.`, espera: est.espera };
        if (est.repasar.length) return { error: 409, message: "Antes de intentarlo otra vez, vuelve a leer las lecciones de la materia.", repasar: est.repasar };
        const vistas = new Set(lista(f.vistas));
        // las preguntas que retiró la Dirección académica (por el análisis de preguntas) ya no salen
        const retiradas = await preguntasRetiradas();
        const semilla = (Math.imul(a.userId, 7919) + (Number(f.intentos || 0) + 1) * 104729 + numeroDe(ev.clave.replace(/:final$/, ""))) | 0;
        const ids = elegirFinal(ev.final.filter((p) => !retiradas.has(p.id)), vistas, ev.medida.objetivas, semilla, ev.grupo);
        const c: Curso = {
          ids,
          lugares: lugaresDeLaBuena(ids.length, semilla),
          i: 0,
          enviada: false,
          respuestas: [],
          escritas: elegirEscritas(ev.escritas.filter((e) => !retiradas.has(e.id)), vistas, ev.medida.escritas, semilla, ev.grupoEscrita),
          e: 0,
          escritaEnviada: false,
          notasEscritas: [],
          semilla,
        };
        await pool.query(
          `UPDATE academia_pruebas SET intentos = intentos + 1, curso = $3::jsonb, curso_at = NULL, resultado = NULL, updated_at = now() WHERE user_id = $1 AND clave = $2`,
          [a.userId, ev.clave, JSON.stringify(c)],
        );
        await ev.alEmpezar(a.userId);
        return { paso: await pasoActual(a.userId, ev, c, null) };
      });
      if ("error" in out) return res.status(out.error).json(out);
      res.setHeader("Cache-Control", "no-store");
      res.json(out.paso);
    } catch (err) {
      console.error("[academia] empezar:", err);
      res.sendStatus(500);
    }
  });

  // El paso que toca ahora (al volver a la página o al recargar).
  app.post(`${base}/paso`, async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      const out = await enFila(a.userId, async () => {
        const f = await filaDe(a.userId, ev.clave);
        const c = leerCurso(f.curso);
        if (!c) return null;
        return pasoActual(a.userId, ev, c, f.pasados_curso);
      });
      if (!out) return res.status(409).json({ message: "No tienes un examen en curso." });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] paso:", err);
      res.sendStatus(500);
    }
  });

  // La respuesta de la parte objetiva (la opción en el orden en que se mostró). No se dice si estuvo bien hasta el final.
  app.post(`${base}/respuesta`, async (req, res) => {
    const opcion = Math.floor(Number(req.body?.opcion));
    if (!Number.isInteger(opcion) || opcion < -1 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida." });
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      if (frenar(`ar:${a.userId}`, 350)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async (): Promise<PasoExamen | { error: number; message: string }> => {
        const f = await filaDe(a.userId, ev.clave);
        const c = leerCurso(f.curso);
        if (!c || c.i >= c.ids.length || !c.enviada) return { error: 409, message: "Primero pide la pregunta." };
        const p = preguntaPorId(c.ids[c.i]);
        if (!p) return pasoActual(a.userId, ev, c, f.pasados_curso);
        const opciones = opcionesDe(p, c, c.i);
        if (opcion >= opciones.length) return { error: 400, message: "Respuesta no válida." };
        const tarde = Number(f.pasados_curso ?? 0) > ev.medida.segundos + MARGEN_SEGUNDOS;
        c.respuestas.push({ id: p.id, opcion, bien: !tarde && opcion >= 0 && opciones[opcion] === p.correcta, tarde });
        c.i += 1;
        c.enviada = false;
        await guardarCurso(a.userId, ev.clave, c, "parar");
        return pasoActual(a.userId, ev, c, null);
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] respuesta:", err);
      res.sendStatus(500);
    }
  });

  // La respuesta escrita: la corrige el corrector automático y queda guardada para la revisión.
  app.post(`${base}/escrita`, async (req, res) => {
    const texto = String(req.body?.texto ?? "").slice(0, 4000);
    const pegado = req.body?.pegado === true;
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      if (frenar(`aw:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async (): Promise<PasoExamen | { error: number; message: string }> => {
        const f = await filaDe(a.userId, ev.clave);
        const c = leerCurso(f.curso);
        if (!c || c.i < c.ids.length || c.e >= c.escritas.length || !c.escritaEnviada) return { error: 409, message: "Primero pide la pregunta escrita." };
        const e = escritaPorId(c.escritas[c.e]);
        if (!e) return pasoActual(a.userId, ev, c, f.pasados_curso);
        const tarde = Number(f.pasados_curso ?? 0) > ev.medida.minutosEscrita * 60 + MARGEN_ESCRITA_SEGUNDOS;
        await guardarEscrita(a.userId, ev.clave, c, e, texto, pegado, tarde);
        return pasoActual(a.userId, ev, c, null);
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] escrita:", err);
      res.sendStatus(500);
    }
  });

  // Pedir la revisión del último intento: una vez por examen, dentro de DIAS_APELACION días, con un mensaje. Avisa a
  // quienes revisan (la Dirección académica y los profesores).
  app.post(`${base}/apelacion`, async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      const mensaje = typeof req.body?.mensaje === "string" ? req.body.mensaje.replace(/\s+/g, " ").trim().slice(0, 1000) : "";
      if (mensaje.length < 15) return res.status(400).json({ message: "Cuéntanos en unas palabras qué quieres que se revise (al menos 15 letras)." });
      if (frenar(`aap:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async () => {
        const ap = await apelableDe(a.userId, ev.clave, ev);
        if (!ap.puede || !ap.intento) return { error: 409, message: ap.porque ?? "No se puede pedir la revisión de este examen." };
        const ins = await pool.query(
          `INSERT INTO academia_apelaciones (user_id, clave, intento, mensaje) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, clave) DO NOTHING RETURNING id`,
          [a.userId, ev.clave, ap.intento, mensaje],
        );
        if (!ins.rows[0]) return { error: 409, message: "Ya pediste la revisión de este examen: se pide una sola vez." };
        return { ok: await apelacionDe(a.userId, ev.clave) };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      const ctx = contextoExamen(ev.clave);
      // solo la Administración revisa (los maestros y líderes solo ven el seguimiento)
      const revisores = await cuentasConRoles(ROLES_ACADEMIA.find((r) => r.id === "direccion")!.roles, a.userId);
      void avisarA(
        revisores,
        "Pedido de revisión de un examen",
        `${await nombreAcademico(a.userId)} pidió que se revise ${ctx?.enFrase ?? "su examen"}: «${mensaje.slice(0, 160)}${mensaje.length > 160 ? "…" : ""}»`,
        "/admin/academia?tab=revisar",
      ).catch((err) => console.error("[academia] aviso de apelación:", err));
      res.setHeader("Cache-Control", "no-store");
      res.json({ apelacion: out.ok });
    } catch (err) {
      console.error("[academia] apelación:", err);
      res.sendStatus(500);
    }
  });

  // SOLO EN DESARROLLO (no existe en la web publicada): la opción correcta de la pregunta en pantalla y la respuesta
  // modelo de la escrita que toca, para las pruebas automáticas.
  if (process.env.NODE_ENV !== "production") {
    app.get(`${base}/dev-correcta`, async (req, res) => {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = resolver(req, res);
      if (!ev) return;
      const f = await filaDe(a.userId, ev.clave);
      const c = leerCurso(f.curso);
      if (!c) return res.status(409).json({ message: "No hay un examen en curso." });
      const modelo = escritaPorId(c.escritas[Math.min(c.e, c.escritas.length - 1)] ?? "")?.modelo ?? null;
      if (c.i >= c.ids.length) return res.json({ opcion: null, modelo });
      const p = preguntaPorId(c.ids[c.i])!;
      res.json({ opcion: opcionesDe(p, c, c.i).indexOf(p.correcta), modelo });
    });
  }
}

function materiaConBanco(req: Request, res: Response): Evaluacion | null {
  const m = materiaPorId(String(req.params.materiaId || ""));
  if (!m || !m.disponible || !BANCOS.has(m.id)) {
    res.status(404).json({ message: "Esa materia todavía no está disponible." });
    return null;
  }
  return evaluacionDeMateria(m);
}

export function registerAcademiaExamenRoutes(app: Express) {
  rutasDeEvaluacion(app, "/api/academia/examen/:materiaId", materiaConBanco);

  // SOLO EN DESARROLLO (no existe en la web publicada): para las pruebas automáticas.
  if (process.env.NODE_ENV !== "production") {
    // la opción correcta de la pregunta que está en pantalla (ruta de siempre de las pruebas de la materia)
    app.get("/api/academia/dev/correcta/:materiaId", async (req, res) => {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const ev = materiaConBanco(req, res);
      if (!ev) return;
      const f = await filaDe(a.userId, ev.clave);
      const c = leerCurso(f.curso);
      if (!c || c.i >= c.ids.length) return res.status(409).json({ message: "No hay pregunta objetiva en pantalla." });
      const p = preguntaPorId(c.ids[c.i])!;
      res.json({ opcion: opcionesDe(p, c, c.i).indexOf(p.correcta), modelo: escritaPorId(c.escritas[0] ?? "")?.modelo ?? null });
    });
    // adelantar el reloj del alumno: las esperas, el examen en curso y las lecciones vistas quedan N minutos atrás
    app.post("/api/academia/dev/adelantar", async (req, res) => {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const minutos = Math.max(0, Math.min(60 * 24 * 30, Number(req.body?.minutos) || 0));
      await pool.query(
        `UPDATE academia_pruebas SET fallo_at = fallo_at - make_interval(mins => $2::int), curso_at = curso_at - make_interval(mins => $2::int) WHERE user_id = $1`,
        [a.userId, minutos],
      );
      if (req.body?.lecciones === true) await pool.query(`UPDATE academia_lecciones SET vista_at = vista_at - make_interval(mins => $2::int) WHERE user_id = $1`, [a.userId, minutos]);
      if (req.body?.intentos === true) {
        await pool.query(`UPDATE academia_intentos SET cerrado_at = cerrado_at - make_interval(mins => $2::int) WHERE user_id = $1`, [a.userId, minutos]);
        await pool.query(`UPDATE academia_pruebas SET updated_at = updated_at - make_interval(mins => $2::int) WHERE user_id = $1`, [a.userId, minutos]);
      }
      res.json({ ok: true, minutos });
    });
  }
}
