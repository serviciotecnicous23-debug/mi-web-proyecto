/**
 * El examen final de cada materia de la academia (docs/academia.md, «El sistema de evaluación»).
 *
 * Como los cuestionarios de Moodle: banco de preguntas, preguntas al azar sin repetir las del intento anterior,
 * tiempo por pregunta, intentos con espera y revisión completa al terminar. Tiene dos partes:
 * - Parte A, objetiva: el servidor manda las preguntas de a una, sin la respuesta y con las opciones en su propio
 *   orden (server/orden-examen.ts); lleva el reloj (la que llega tarde, o la que se dejó vencer, cuenta como mala) y no
 *   dice si estuvo bien hasta el final. El examen sale REPARTIDO POR LECCIONES (tabla de especificaciones).
 * - Parte B, escrita: respuestas desde el teléfono, corregidas por el corrector automático (server/academia-correccion.ts);
 *   lo dudoso queda marcado para que lo revise quien tenga el cargo.
 * La materia se aprueba con 70 de nota (shared/academia.ts) y el examen final aprobado. Si no, hay que esperar para
 * repetirlo (30 minutos y después 24 horas), y desde el tercer fallo, volver a abrir todas las lecciones.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  APRUEBA, ESCRITA, FALLOS_PARA_REPASAR, MARGEN_ESCRITA_SEGUNDOS, MARGEN_SEGUNDOS, esperaFinalMin, examenDe, materiaPorId, medallaDe, notaExamen,
  type CorreccionVista, type ExamenEstado, type MateriaDef, type MedidaExamen, type PasoExamen, type ResultadoExamen,
} from "@shared/academia";
import { BANCOS, escritaPorId, preguntaPorId } from "./academia/index";
import type { PreguntaObjetiva } from "./academia/tipos";
import { corregirEscrita, type ClaveEscrita } from "./academia-correccion";
import { numeroDe, opcionesDeExamen } from "./orden-examen";
import { alumnoDe, asegurarAlumno, asegurarMateria, claveFinal, enFila, frenar, marcarEstudio, recalcularMateria } from "./academia-comun";

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
};
type Fila = {
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

const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

function leerCurso(v: unknown): Curso | null {
  if (!v || typeof v !== "object") return null;
  const c = v as Partial<Curso>;
  if (!Array.isArray(c.ids) || typeof c.i !== "number") return null;
  return {
    ids: lista(c.ids), i: c.i, enviada: c.enviada === true, respuestas: Array.isArray(c.respuestas) ? c.respuestas : [],
    escritas: lista(c.escritas), e: Number(c.e) || 0, escritaEnviada: c.escritaEnviada === true,
    notasEscritas: Array.isArray(c.notasEscritas) ? c.notasEscritas : [], semilla: Number(c.semilla) || 1,
  };
}

async function filaDe(userId: number, clave: string): Promise<Fila> {
  await pool.query(`INSERT INTO academia_pruebas (user_id, clave) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, clave]);
  const { rows } = await pool.query(
    `SELECT intentos, fallos, mejor, vistas, curso, resultado, aprobada_at,
            EXTRACT(EPOCH FROM now() - curso_at)::float AS pasados_curso,
            EXTRACT(EPOCH FROM now() - fallo_at)::float AS pasados_fallo
       FROM academia_pruebas WHERE user_id = $1 AND clave = $2`,
    [userId, clave],
  );
  return rows[0] as Fila;
}

async function guardarCurso(userId: number, clave: string, c: Curso, reloj: "ahora" | "parar" | "igual"): Promise<void> {
  const set = reloj === "ahora" ? ", curso_at = now()" : reloj === "parar" ? ", curso_at = NULL" : "";
  await pool.query(`UPDATE academia_pruebas SET curso = $3::jsonb${set}, updated_at = now() WHERE user_id = $1 AND clave = $2`, [userId, clave, JSON.stringify(c)]);
}

/** Un número estable por texto y semilla, para ordenar sin azar del servidor (el mismo intento da siempre lo mismo). */
const mezcla = (id: string, semilla: number) => (numeroDe(id) ^ Math.imul(semilla | 0, 2654435761)) >>> 0;

/**
 * Las preguntas del examen, repartidas por lecciones: cada lección pone su parte y las que sobran se turnan entre
 * intentos. Primero las que todavía no salieron en intentos anteriores.
 */
export function elegirFinal(banco: PreguntaObjetiva[], vistas: Set<string>, n: number, semilla: number): string[] {
  const porLeccion = new Map<number, PreguntaObjetiva[]>();
  for (const p of banco) porLeccion.set(p.leccion, [...(porLeccion.get(p.leccion) ?? []), p]);
  const lecciones = [...porLeccion.keys()].sort((a, b) => a - b);
  const L = lecciones.length;
  if (!L) return [];
  const base = Math.floor(n / L);
  const resto = n % L;
  const desde = Math.abs(semilla) % L;
  const elegidas: PreguntaObjetiva[] = [];
  const sobrantes: PreguntaObjetiva[] = [];
  lecciones.forEach((lec, k) => {
    const cupo = base + ((k - desde + L) % L < resto ? 1 : 0);
    const orden = [...(porLeccion.get(lec) ?? [])].sort(
      (a, b) => Number(vistas.has(a.id)) - Number(vistas.has(b.id)) || mezcla(a.id, semilla) - mezcla(b.id, semilla),
    );
    elegidas.push(...orden.slice(0, cupo));
    sobrantes.push(...orden.slice(cupo));
  });
  if (elegidas.length < n) {
    sobrantes.sort((a, b) => Number(vistas.has(a.id)) - Number(vistas.has(b.id)) || mezcla(a.id, semilla) - mezcla(b.id, semilla));
    elegidas.push(...sobrantes.slice(0, n - elegidas.length));
  }
  return elegidas.sort((a, b) => mezcla(a.id, semilla + 7) - mezcla(b.id, semilla + 7)).map((p) => p.id);
}

function elegirEscritas(escritas: ClaveEscrita[], vistas: Set<string>, n: number, semilla: number): string[] {
  return [...escritas]
    .sort((a, b) => Number(vistas.has(a.id)) - Number(vistas.has(b.id)) || mezcla(a.id, semilla) - mezcla(b.id, semilla))
    .slice(0, n)
    .map((e) => e.id);
}

function opcionesDe(p: PreguntaObjetiva, c: Curso, lugar: number): string[] {
  return opcionesDeExamen(p.id, p.correcta, p.falsas, c.semilla, lugar);
}

// ---------------------------------------------------------------- el estado del examen

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
  const pendientes = ids.filter((id) => !completadas.has(id)).length;
  if (pendientes) falta.push(pendientes === ids.length ? `completar las ${ids.length} lecciones` : `completar ${pendientes === 1 ? "1 lección" : `${pendientes} lecciones`}`);
  if (m.memoria && !v[0]?.aprendido_at) falta.push("aprender el versículo de memoria");
  const fallos = Number(f.fallos || 0);
  const espera = fallos ? Math.max(0, Math.ceil(esperaFinalMin(fallos) * 60 - Number(f.pasados_fallo ?? 1e9))) : 0;
  const repasar = fallos >= FALLOS_PARA_REPASAR ? ids.filter((id) => !repasadas.has(id)) : [];
  return {
    medida,
    falta,
    intentos: Number(f.intentos || 0),
    fallos,
    mejor: f.mejor == null ? null : Number(f.mejor),
    aprobado: mat[0]?.estado === "aprobada",
    enCurso: !!leerCurso(f.curso),
    espera,
    repasar,
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
async function pasoActual(userId: number, m: MateriaDef, clave: string, c: Curso, pasadosIniciales: number | null): Promise<PasoExamen> {
  const medida = examenDe(m);
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
  return { paso: "fin", resultado: await cerrarIntento(userId, m, clave, c) };
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

/** Cierra el intento: la nota del examen, la de la materia, la revisión completa y la espera si no aprobó. */
async function cerrarIntento(userId: number, m: MateriaDef, clave: string, c: Curso): Promise<ResultadoExamen> {
  const medida = examenDe(m);
  const banco = BANCOS.get(m.id)!;
  const aciertos = c.respuestas.filter((r) => r.bien).length;
  const de = c.respuestas.length || c.ids.length || 1;
  const objetiva = Math.round((100 * aciertos) / de);
  const escrita = c.notasEscritas.length ? Math.round(c.notasEscritas.reduce((a, n) => a + n.nota, 0) / c.notasEscritas.length) : 0;
  const nota = notaExamen(objetiva, escrita, medida.pesoObjetiva);

  // las preguntas de este intento quedan «vistas» (el próximo trae otras); si ya casi no quedan nuevas, se empieza otra vuelta
  const f = await filaDe(userId, clave);
  let vistas = new Set([...lista(f.vistas), ...c.ids, ...c.escritas]);
  const nuevasFinal = banco.final.filter((p) => !vistas.has(p.id)).length;
  if (nuevasFinal < medida.objetivas) vistas = new Set([...c.ids, ...c.escritas]);
  await pool.query(
    `UPDATE academia_pruebas SET ultima = $3, mejor = GREATEST(COALESCE(mejor, 0), $3), vistas = $4::jsonb, curso = NULL, curso_at = NULL, updated_at = now()
      WHERE user_id = $1 AND clave = $2`,
    [userId, clave, nota, JSON.stringify([...vistas])],
  );
  const materia = await recalcularMateria(userId, m);
  const { rows } = await pool.query(
    `UPDATE academia_pruebas
        SET fallos = fallos + CASE WHEN $3 THEN 0 ELSE 1 END,
            fallo_at = CASE WHEN $3 THEN fallo_at ELSE now() END,
            aprobada_at = CASE WHEN $3 AND aprobada_at IS NULL THEN now() ELSE aprobada_at END
      WHERE user_id = $1 AND clave = $2 RETURNING fallos`,
    [userId, clave, materia.aprobada],
  );
  const fallos = Number(rows[0]?.fallos || 0);
  const revision = c.respuestas.map((r, lugar) => {
    const p = preguntaPorId(r.id);
    if (!p) return { texto: "(pregunta retirada)", opciones: [], elegida: -1, correcta: -1, bien: false, tarde: r.tarde, explica: "", ref: "" };
    const opciones = opcionesDe(p, c, lugar);
    return { texto: p.texto, opciones, elegida: r.opcion, correcta: opciones.indexOf(p.correcta), bien: r.bien, tarde: r.tarde, explica: p.explica, ref: p.ref };
  });
  const escritas = c.notasEscritas.map((n) => {
    const e = escritaPorId(n.id);
    return { ...n.correccion, pregunta: e?.pregunta ?? "", texto: n.texto, modelo: e?.modelo ?? "" };
  });
  const resultado: ResultadoExamen = {
    nota,
    objetiva,
    escrita,
    aprobado: nota >= APRUEBA,
    medalla: medallaDe(nota),
    aciertos,
    de,
    revision,
    escritas,
    materia: { nota: materia.nota, aprobada: materia.aprobada, medalla: materia.aprobada ? medallaDe(materia.nota) : null },
    espera: materia.aprobada ? 0 : esperaFinalMin(fallos) * 60,
  };
  await pool.query(`UPDATE academia_pruebas SET resultado = $3::jsonb WHERE user_id = $1 AND clave = $2`, [userId, clave, JSON.stringify(resultado)]);
  return resultado;
}

// ---------------------------------------------------------------- las rutas

function materiaConBanco(req: Request, res: Response): MateriaDef | null {
  const m = materiaPorId(String(req.params.materiaId || ""));
  if (!m || !m.disponible || !BANCOS.has(m.id)) {
    res.status(404).json({ message: "Esa materia todavía no está disponible." });
    return null;
  }
  return m;
}

function minutosTexto(seg: number): string {
  if (seg <= 90) return `${seg} segundos`;
  const min = Math.ceil(seg / 60);
  if (min < 90) return `${min} minutos`;
  return `${Math.ceil(min / 60)} horas`;
}

export function registerAcademiaExamenRoutes(app: Express) {
  // Cómo va el examen de la materia (y el resultado del último intento, con su revisión completa).
  app.get("/api/academia/examen/:materiaId", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      const estado = await estadoExamen(a.userId, m);
      const { rows } = await pool.query(`SELECT resultado FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [a.userId, claveFinal(m.id)]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ estado, ultimo: rows[0]?.resultado ?? null });
    } catch (err) {
      console.error("[academia] examen:", err);
      res.sendStatus(500);
    }
  });

  // Empezar un intento (o retomar el que está en curso). Pide aceptar el compromiso de honradez.
  app.post("/api/academia/examen/:materiaId/empezar", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      if (req.body?.compromiso !== true) return res.status(400).json({ message: "Para empezar, acepta el compromiso de honradez." });
      if (frenar(`ae:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const clave = claveFinal(m.id);
      const out = await enFila(a.userId, async (): Promise<{ paso: PasoExamen } | { error: number; message: string; espera?: number; repasar?: string[] }> => {
        const est = await estadoExamen(a.userId, m);
        const f = await filaDe(a.userId, clave);
        const curso = leerCurso(f.curso);
        if (curso) return { paso: await pasoActual(a.userId, m, clave, curso, f.pasados_curso) };
        if (est.aprobado) return { error: 409, message: "Ya aprobaste esta materia." };
        if (est.falta.length) return { error: 409, message: `Antes del examen te falta ${est.falta.join(" y ")}.` };
        if (est.espera > 0) return { error: 429, message: `Repasa con calma y vuelve en ${minutosTexto(est.espera)}.`, espera: est.espera };
        if (est.repasar.length) return { error: 409, message: "Antes de intentarlo otra vez, vuelve a leer las lecciones de la materia.", repasar: est.repasar };
        const banco = BANCOS.get(m.id)!;
        const medida = examenDe(m);
        const vistas = new Set(lista(f.vistas));
        const semilla = (Math.imul(a.userId, 7919) + (Number(f.intentos || 0) + 1) * 104729 + numeroDe(m.id)) | 0;
        const c: Curso = {
          ids: elegirFinal(banco.final, vistas, medida.objetivas, semilla),
          i: 0,
          enviada: false,
          respuestas: [],
          escritas: elegirEscritas(banco.escritas, vistas, medida.escritas, semilla),
          e: 0,
          escritaEnviada: false,
          notasEscritas: [],
          semilla,
        };
        await pool.query(
          `UPDATE academia_pruebas SET intentos = intentos + 1, curso = $3::jsonb, curso_at = NULL, resultado = NULL, updated_at = now() WHERE user_id = $1 AND clave = $2`,
          [a.userId, clave, JSON.stringify(c)],
        );
        await asegurarAlumno(a.userId);
        await asegurarMateria(a.userId, m.id);
        await marcarEstudio(a.userId);
        return { paso: await pasoActual(a.userId, m, clave, c, null) };
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
  app.post("/api/academia/examen/:materiaId/paso", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      const clave = claveFinal(m.id);
      const out = await enFila(a.userId, async () => {
        const f = await filaDe(a.userId, clave);
        const c = leerCurso(f.curso);
        if (!c) return null;
        return pasoActual(a.userId, m, clave, c, f.pasados_curso);
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
  app.post("/api/academia/examen/:materiaId/respuesta", async (req, res) => {
    const opcion = Math.floor(Number(req.body?.opcion));
    if (!Number.isInteger(opcion) || opcion < -1 || opcion > 9) return res.status(400).json({ message: "Respuesta no válida." });
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      if (frenar(`ar:${a.userId}`, 350)) return res.status(429).json({ message: "Espera un momento." });
      const clave = claveFinal(m.id);
      const out = await enFila(a.userId, async (): Promise<PasoExamen | { error: number; message: string }> => {
        const f = await filaDe(a.userId, clave);
        const c = leerCurso(f.curso);
        if (!c || c.i >= c.ids.length || !c.enviada) return { error: 409, message: "Primero pide la pregunta." };
        const p = preguntaPorId(c.ids[c.i]);
        if (!p) return pasoActual(a.userId, m, clave, c, f.pasados_curso);
        const opciones = opcionesDe(p, c, c.i);
        if (opcion >= opciones.length) return { error: 400, message: "Respuesta no válida." };
        const tarde = Number(f.pasados_curso ?? 0) > examenDe(m).segundos + MARGEN_SEGUNDOS;
        c.respuestas.push({ id: p.id, opcion, bien: !tarde && opcion >= 0 && opciones[opcion] === p.correcta, tarde });
        c.i += 1;
        c.enviada = false;
        await guardarCurso(a.userId, clave, c, "parar");
        return pasoActual(a.userId, m, clave, c, null);
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
  app.post("/api/academia/examen/:materiaId/escrita", async (req, res) => {
    const texto = String(req.body?.texto ?? "").slice(0, 4000);
    const pegado = req.body?.pegado === true;
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      if (frenar(`aw:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const clave = claveFinal(m.id);
      const out = await enFila(a.userId, async (): Promise<PasoExamen | { error: number; message: string }> => {
        const f = await filaDe(a.userId, clave);
        const c = leerCurso(f.curso);
        if (!c || c.i < c.ids.length || c.e >= c.escritas.length || !c.escritaEnviada) return { error: 409, message: "Primero pide la pregunta escrita." };
        const e = escritaPorId(c.escritas[c.e]);
        if (!e) return pasoActual(a.userId, m, clave, c, f.pasados_curso);
        const tarde = Number(f.pasados_curso ?? 0) > examenDe(m).minutosEscrita * 60 + MARGEN_ESCRITA_SEGUNDOS;
        await guardarEscrita(a.userId, clave, c, e, texto, pegado, tarde);
        return pasoActual(a.userId, m, clave, c, null);
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] escrita:", err);
      res.sendStatus(500);
    }
  });

  // SOLO EN DESARROLLO (no existe en la web publicada): para las pruebas automáticas.
  if (process.env.NODE_ENV !== "production") {
    // la opción correcta de la pregunta que está en pantalla
    app.get("/api/academia/dev/correcta/:materiaId", async (req, res) => {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaConBanco(req, res);
      if (!m) return;
      const f = await filaDe(a.userId, claveFinal(m.id));
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
      res.json({ ok: true, minutos });
    });
  }
}
