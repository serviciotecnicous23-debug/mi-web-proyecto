/**
 * La revisión de la Dirección académica (docs/academia.md, «La revisión»):
 * - las respuestas escritas que el corrector dejó para revisar y los pedidos de revisión de los alumnos;
 * - el cambio de una nota con su motivo, que recalcula en cadena el intento, la mejor nota del examen, la materia (que
 *   puede quedar aprobada o volver a estar en curso, con su certificado emitido o revocado) y el nivel;
 * - los documentos: revocar, restaurar y corregir el nombre;
 * - abrir o cerrar la academia para todos;
 * - el historial de todos esos cambios (audit_log, entity_type «academia»), con quién, cuándo y por qué.
 *
 * Cada ruta comprueba su capacidad (shared/academia-permisos.ts): revisar, la Dirección académica y los profesores; los
 * documentos, la Dirección académica; abrir la academia, la Administración y el Director del Ministerio.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import {
  APRUEBA_INTEGRAL, NIVELES, apruebaSuficiencia, materiaAprobada, medallaDe, normalizarCodigo, notaExamen, notaMateria, pesosDe,
  type MateriaDef, type NivelDef, type ResultadoExamen,
} from "@shared/academia";
import { limpiarNombre, nombreCompleto } from "@shared/academia-inscripcion";
import type { ApelacionItem, HistorialItem, ItemRevision, ResultadoRevision, RevisionPanel } from "@shared/academia-direccion";
import { escritaPorId } from "./academia/index";
import {
  avisarA, claveFinal, claveIntegral, componentesDe, contextoExamen, enFila, frenar, olvidarApertura, type ContextoExamen,
} from "./academia-comun";
import { emitirMateria } from "./academia-documentos";
import { aprobarPorSuficiencia } from "./academia-suficiencia";
import { estadoNivel, revisarNivel } from "./academia-nivel";
import { permisoDe } from "./academia-direccion";

/** Nadie revisa lo suyo: sus respuestas, su pedido de revisión, sus documentos o su nombre (lo hace otra persona). */
const MENSAJE_PROPIO = "No puedes revisar ni cambiar lo tuyo: como alumno, lo tuyo lo revisa otro administrador (o vale la nota automática).";

/** El motivo de un certificado que revocó (o volvió a emitir) una corrección de nota, no una decisión de la Administración. */
export const PREFIJO_AUTO = "Nota corregida por la Administración de la academia:";
/** El mismo motivo, como se escribía antes (los certificados revocados entonces también se restauran). */
const PREFIJO_AUTO_ANTES = "Nota corregida por la Dirección académica:";

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
/** «del examen final de «…»», «del examen integral del Nivel 1»: «de» + «el» se contrae. */
const delExamen = (ctx: ContextoExamen | null) => (!ctx ? "de un examen" : ctx.enFrase.startsWith("el ") ? `del ${ctx.enFrase.slice(3)}` : `de ${ctx.enFrase}`);
const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

// ---------------------------------------------------------------- las respuestas para revisar

const COLUMNAS = `r.id, r.user_id, r.clave, r.intento, r.pregunta_id, r.texto, r.nota_auto, r.nota_final, r.detalle, r.revisada_at, r.motivo, r.created_at,
  rv.display_name AS rev_nombre, rv.username AS rev_usuario, i.nombres, i.apellidos, u.display_name, u.username, a.matricula, ap.id AS apelacion_id`;
const UNIONES = `FROM academia_respuestas r
  JOIN users u ON u.id = r.user_id
  LEFT JOIN academia_inscripciones i ON i.user_id = r.user_id
  LEFT JOIN academia_alumnos a ON a.user_id = r.user_id
  LEFT JOIN users rv ON rv.id = r.revisada_por
  LEFT JOIN academia_apelaciones ap ON ap.user_id = r.user_id AND ap.clave = r.clave AND ap.intento = r.intento AND ap.estado = 'pendiente'`;

const nombreDe = (r: any) => (r.nombres ? `${r.nombres} ${r.apellidos ?? ""}`.trim() : String(r.display_name || r.username || "Alumno"));

function itemDe(r: any): ItemRevision {
  const clave = escritaPorId(r.pregunta_id);
  const ctx = contextoExamen(r.clave);
  const det = (r.detalle ?? {}) as { ideas?: string[]; errores?: string[]; marcas?: string[] };
  const ok = new Set(det.ideas ?? []);
  const errores = new Set(det.errores ?? []);
  return {
    id: Number(r.id),
    alumno: { userId: Number(r.user_id), nombre: nombreDe(r), matricula: r.matricula ?? null },
    examen: { clave: r.clave, titulo: ctx?.titulo ?? r.clave, intento: Number(r.intento) },
    pregunta: clave?.pregunta ?? "(pregunta retirada del banco)",
    modelo: clave?.modelo ?? "",
    ideas: (clave?.ideas ?? []).map((i) => ({ texto: i.texto, peso: i.peso, ok: ok.has(i.id) })),
    errores: (clave?.errores ?? []).filter((e) => errores.has(e.id)).map((e) => e.texto),
    citas: clave?.citas ?? [],
    texto: r.texto ?? "",
    palabras: palabras(r.texto ?? ""),
    marcas: det.marcas ?? [],
    notaAuto: Number(r.nota_auto),
    notaFinal: r.nota_final == null ? null : Number(r.nota_final),
    revision: r.revisada_at ? { por: String(r.rev_nombre || r.rev_usuario || "La Administración"), fecha: iso(r.revisada_at)!, motivo: r.motivo ?? "" } : null,
    apelacion: r.apelacion_id == null ? null : Number(r.apelacion_id),
    fecha: iso(r.created_at)!,
  };
}

async function itemsDe(donde: string, params: unknown[], orden: string, limite: number): Promise<ItemRevision[]> {
  const { rows } = await pool.query(`SELECT ${COLUMNAS} ${UNIONES} WHERE ${donde} ORDER BY ${orden} LIMIT ${Math.max(1, Math.min(500, limite))}`, params);
  return rows.map(itemDe);
}

async function apelacionesDe(donde: string, params: unknown[], limite: number): Promise<ApelacionItem[]> {
  const { rows } = await pool.query(
    `SELECT ap.*, i.nombres, i.apellidos, u.display_name, u.username, a.matricula, rv.display_name AS rev_nombre, rv.username AS rev_usuario
       FROM academia_apelaciones ap
       JOIN users u ON u.id = ap.user_id
       LEFT JOIN academia_inscripciones i ON i.user_id = ap.user_id
       LEFT JOIN academia_alumnos a ON a.user_id = ap.user_id
       LEFT JOIN users rv ON rv.id = ap.resuelta_por
      WHERE ${donde} ORDER BY ap.created_at LIMIT ${limite}`,
    params,
  );
  return Promise.all(
    (rows as any[]).map(async (r) => ({
      id: Number(r.id),
      alumno: { userId: Number(r.user_id), nombre: nombreDe(r), matricula: r.matricula ?? null },
      examen: { clave: r.clave, titulo: contextoExamen(r.clave)?.titulo ?? r.clave, intento: Number(r.intento) },
      mensaje: r.mensaje,
      fecha: iso(r.created_at)!,
      estado: r.estado === "resuelta" ? ("resuelta" as const) : ("pendiente" as const),
      respuesta: r.respuesta ?? null,
      resuelta: iso(r.resuelta_at),
      por: r.resuelta_por ? String(r.rev_nombre || r.rev_usuario || "La Administración") : null,
      escritas: await itemsDe(`r.user_id = $1 AND r.clave = $2 AND r.intento = $3`, [r.user_id, r.clave, r.intento], "r.id", 20),
    })),
  );
}

// ---------------------------------------------------------------- el recálculo en cadena

type Intento = { objetiva: number; escrita: number; nota: number };

/** El intento registrado; si es de antes del registro de intentos, el último resultado guardado (y queda registrado). */
async function intentoDe(userId: number, clave: string, intento: number): Promise<Intento | null> {
  const { rows } = await pool.query(`SELECT objetiva, escrita, nota FROM academia_intentos WHERE user_id = $1 AND clave = $2 AND intento = $3`, [userId, clave, intento]);
  if (rows[0]) return { objetiva: Number(rows[0].objetiva), escrita: Number(rows[0].escrita), nota: Number(rows[0].nota) };
  const { rows: p } = await pool.query(`SELECT intentos, resultado, curso IS NOT NULL AS en_curso FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, clave]);
  const res = p[0]?.resultado as ResultadoExamen | null;
  if (!res || p[0].en_curso || (res.intento ?? Number(p[0].intentos)) !== intento) return null;
  await pool.query(
    `INSERT INTO academia_intentos (user_id, clave, intento, objetiva, escrita, nota, nota_auto, aciertos, de, respuestas)
     VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, '[]'::jsonb) ON CONFLICT DO NOTHING`,
    [userId, clave, intento, res.objetiva, res.escrita, res.nota, res.aciertos, res.de],
  );
  return { objetiva: res.objetiva, escrita: res.escrita, nota: res.nota };
}

/** El certificado de una materia o de un nivel: revocado por una corrección de nota, o vuelto a valer si lo revocó otra. */
async function revocarPorNota(userId: number, tipo: "materia" | "nivel", ref: string, motivo: string): Promise<void> {
  await pool.query(
    `UPDATE academia_certificados SET revocado_at = now(), motivo = $4 WHERE user_id = $1 AND tipo = $2 AND ref = $3 AND revocado_at IS NULL`,
    [userId, tipo, ref, `${PREFIJO_AUTO} ${motivo}`.slice(0, 600)],
  );
}
async function restaurarSiFueNota(userId: number, tipo: "materia" | "nivel", ref: string, nota: number | null): Promise<void> {
  await pool.query(
    `UPDATE academia_certificados
        SET nota = COALESCE($4, nota),
            revocado_at = CASE WHEN motivo LIKE $5 OR motivo LIKE $6 THEN NULL ELSE revocado_at END,
            motivo = CASE WHEN motivo LIKE $5 OR motivo LIKE $6 THEN NULL ELSE motivo END
      WHERE user_id = $1 AND tipo = $2 AND ref = $3`,
    [userId, tipo, ref, nota, `${PREFIJO_AUTO}%`, `${PREFIJO_AUTO_ANTES}%`],
  );
}

/** El nivel, revisado otra vez: se completa si ya cumple todo, o se reabre si dejó de cumplir. */
async function reconsiderarNivel(userId: number, nv: NivelDef, motivo: string): Promise<"completo" | "reabierto" | null> {
  const e = await estadoNivel(userId, nv, false);
  const cumple = e.requisitos.every((r) => r.hecho);
  if (e.completado && !cumple) {
    await pool.query(`UPDATE academia_niveles SET completado_at = NULL WHERE user_id = $1 AND nivel = $2`, [userId, nv.n]);
    await pool.query(`UPDATE academia_alumnos SET nivel = LEAST(nivel, $2) WHERE user_id = $1`, [userId, nv.n]);
    await revocarPorNota(userId, "nivel", String(nv.n), motivo);
    return "reabierto";
  }
  if (!e.completado && cumple) {
    await revisarNivel(userId, nv);
    await restaurarSiFueNota(userId, "nivel", String(nv.n), e.materias.promedio);
    return "completo";
  }
  return null;
}

/** La materia, recalculada sin quedarse pegada en «aprobada»: con la nota nueva puede aprobarse o volver a estar en curso. */
/**
 * Una escrita revisada de un examen de suficiencia: vuelve a mirar las dos partes (85 y 75). Si ahora aprueba, la materia
 * queda aprobada por suficiencia; si deja de aprobar y estaba aprobada así, vuelve a estar en curso (se cursa) y su
 * certificado se revoca con el motivo.
 */
async function reconsiderarSuficiencia(userId: number, m: MateriaDef, objetiva: number, escrita: number, nota: number, motivo: string): Promise<NonNullable<ResultadoRevision["materia"]>> {
  const ok = apruebaSuficiencia(objetiva, escrita);
  const { rows } = await pool.query(`SELECT estado, via FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const estaba = rows[0]?.estado === "aprobada";
  if (ok) {
    if (estaba && rows[0].via !== "suficiencia") return { nota, aprobada: true, cambio: null };
    await aprobarPorSuficiencia(userId, m, nota);
    await restaurarSiFueNota(userId, "materia", m.id, nota);
    return { nota, aprobada: true, cambio: estaba ? null : "aprobada" };
  }
  if (estaba && rows[0].via === "suficiencia") {
    await pool.query(
      `UPDATE academia_materias SET estado = 'en-curso', via = 'cursada', nota = NULL, componentes = '{}'::jsonb, aprobada_at = NULL WHERE user_id = $1 AND materia_id = $2`,
      [userId, m.id],
    );
    await revocarPorNota(userId, "materia", m.id, motivo);
    return { nota, aprobada: false, cambio: "desaprobada" };
  }
  return { nota, aprobada: estaba, cambio: null };
}

async function reconsiderarMateria(userId: number, m: MateriaDef, motivo: string): Promise<NonNullable<ResultadoRevision["materia"]>> {
  const { rows: ya } = await pool.query(`SELECT estado, via, nota FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  if (ya[0]?.estado === "aprobada" && ya[0].via === "suficiencia") return { nota: Number(ya[0].nota ?? 0), aprobada: true, cambio: null };
  const componentes = await componentesDe(userId, m);
  const nota = notaMateria(pesosDe(m), componentes);
  const aprobada = materiaAprobada(nota, componentes.final ?? 0);
  const { rows } = await pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const estaba = rows[0]?.estado === "aprobada";
  await pool.query(
    `UPDATE academia_materias
        SET nota = $3, componentes = $4::jsonb,
            estado = CASE WHEN $5 THEN 'aprobada' ELSE 'en-curso' END,
            aprobada_at = CASE WHEN $5 THEN COALESCE(aprobada_at, now()) ELSE NULL END
      WHERE user_id = $1 AND materia_id = $2`,
    [userId, m.id, nota, JSON.stringify(componentes), aprobada],
  );
  await pool.query(
    `UPDATE academia_pruebas SET aprobada_at = CASE WHEN $3 THEN COALESCE(aprobada_at, now()) ELSE NULL END WHERE user_id = $1 AND clave = $2`,
    [userId, claveFinal(m.id), aprobada],
  );
  if (aprobada) {
    const { rows: c } = await pool.query(`SELECT 1 FROM academia_certificados WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`, [userId, m.id]);
    if (c.length) await restaurarSiFueNota(userId, "materia", m.id, nota);
    else await emitirMateria(userId, m, nota);
  } else if (estaba) {
    await revocarPorNota(userId, "materia", m.id, motivo);
  }
  return { nota, aprobada, cambio: aprobada && !estaba ? "aprobada" : !aprobada && estaba ? "desaprobada" : null };
}

/** Lleva la revisión al último resultado guardado (lo que el alumno ve al abrir su examen). */
async function sincronizarResultado(userId: number, ctx: ContextoExamen, intento: number, totales?: { escrita: number; nota: number; materia: ResultadoRevision["materia"] }): Promise<void> {
  const { rows } = await pool.query(`SELECT intentos, resultado FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [userId, ctx.clave]);
  const res = rows[0]?.resultado as ResultadoExamen | null;
  if (!res || (res.intento ?? Number(rows[0].intentos)) !== intento) return;
  const { rows: es } = await pool.query(
    `SELECT nota_auto, nota_final, motivo, revisada_at FROM academia_respuestas WHERE user_id = $1 AND clave = $2 AND intento = $3 ORDER BY id`,
    [userId, ctx.clave, intento],
  );
  res.escritas = res.escritas.map((w, k) => {
    const e = es[k];
    if (!e) return w;
    const cambio = e.nota_final != null && Number(e.nota_final) !== Number(e.nota_auto);
    return {
      ...w,
      nota: Number(e.nota_final ?? e.nota_auto),
      revisar: w.revisar && !e.revisada_at,
      revision: cambio ? { nota: Number(e.nota_final), antes: Number(e.nota_auto), motivo: e.motivo ?? "", fecha: iso(e.revisada_at)! } : null,
    };
  });
  if (totales) {
    res.escrita = totales.escrita;
    res.nota = totales.nota;
    res.aprobado = totales.nota >= ctx.aprueba;
    res.medalla = medallaDe(totales.nota);
    if (totales.materia) res.materia = { nota: totales.materia.nota, aprobada: totales.materia.aprobada, medalla: totales.materia.aprobada ? medallaDe(totales.materia.nota) : null };
  }
  await pool.query(`UPDATE academia_pruebas SET resultado = $3::jsonb WHERE user_id = $1 AND clave = $2`, [userId, ctx.clave, JSON.stringify(res)]);
}

/**
 * Después de cambiar la nota de una escrita: la nota del intento, la mejor nota del examen y lo que dependa de ella. Los
 * intentos de antes del registro de intentos no se pueden recalcular: su mejor nota nunca baja.
 */
export async function recalcularTrasRevision(userId: number, ctx: ContextoExamen, intento: number, motivo: string): Promise<Omit<ResultadoRevision, "item" | "mensaje">> {
  const it = await intentoDe(userId, ctx.clave, intento);
  if (!it) {
    await sincronizarResultado(userId, ctx, intento);
    return { recalculado: false, examen: { antes: null, despues: null }, materia: null, nivel: null };
  }
  const { rows: es } = await pool.query(
    `SELECT COALESCE(nota_final, nota_auto) AS n FROM academia_respuestas WHERE user_id = $1 AND clave = $2 AND intento = $3`,
    [userId, ctx.clave, intento],
  );
  const escrita = es.length ? Math.round(es.reduce((s: number, r: any) => s + Number(r.n), 0) / es.length) : 0;
  const nota = notaExamen(it.objetiva, escrita, ctx.medida.pesoObjetiva);
  await pool.query(`UPDATE academia_intentos SET escrita = $4, nota = $5 WHERE user_id = $1 AND clave = $2 AND intento = $3`, [userId, ctx.clave, intento, escrita, nota]);
  const { rows: m } = await pool.query(
    `SELECT max(nota)::int AS mejor, count(*)::int AS n, (SELECT intentos FROM academia_pruebas WHERE user_id = $1 AND clave = $2) AS intentos,
            (SELECT mejor FROM academia_pruebas WHERE user_id = $1 AND clave = $2) AS antes
       FROM academia_intentos WHERE user_id = $1 AND clave = $2`,
    [userId, ctx.clave],
  );
  const faltan = Number(m[0].n) < Number(m[0].intentos || 0);
  const mejor = faltan ? Math.max(Number(m[0].mejor), Number(m[0].antes ?? 0)) : Number(m[0].mejor);
  await pool.query(
    `UPDATE academia_pruebas SET mejor = $3, ultima = CASE WHEN intentos = $4 THEN $5 ELSE ultima END WHERE user_id = $1 AND clave = $2`,
    [userId, ctx.clave, mejor, intento, nota],
  );
  let materia: ResultadoRevision["materia"] = null;
  let nivel: ResultadoRevision["nivel"] = null;
  if (ctx.materia && ctx.tipo === "suficiencia") {
    materia = await reconsiderarSuficiencia(userId, ctx.materia, it.objetiva, escrita, nota, motivo);
    const nv = ctx.materia.nivel ? NIVELES[ctx.materia.nivel - 1] : null;
    if (nv) nivel = await reconsiderarNivel(userId, nv, motivo);
  } else if (ctx.materia) {
    materia = await reconsiderarMateria(userId, ctx.materia, motivo);
    const nv = ctx.materia.nivel ? NIVELES[ctx.materia.nivel - 1] : null;
    if (nv) nivel = await reconsiderarNivel(userId, nv, motivo);
  } else if (ctx.nivel) {
    const nv = NIVELES[ctx.nivel - 1];
    await pool.query(
      `UPDATE academia_pruebas SET aprobada_at = CASE WHEN $3 THEN COALESCE(aprobada_at, now()) ELSE NULL END WHERE user_id = $1 AND clave = $2`,
      [userId, claveIntegral(nv.n), mejor >= APRUEBA_INTEGRAL],
    );
    nivel = await reconsiderarNivel(userId, nv, motivo);
  }
  await sincronizarResultado(userId, ctx, intento, { escrita, nota, materia });
  return { recalculado: true, examen: { antes: it.nota, despues: nota }, materia, nivel };
}

function mensajeDe(r: Omit<ResultadoRevision, "item" | "mensaje">, cambio: boolean): string {
  if (!cambio) return "La nota quedó confirmada.";
  if (!r.recalculado) return "La nota de la respuesta quedó cambiada. Ese intento es de antes del registro de intentos: la nota del examen no se recalculó.";
  const partes = [`La nota de ese intento del examen pasó de ${r.examen.antes} a ${r.examen.despues}.`];
  if (r.materia) {
    partes.push(
      r.materia.cambio === "aprobada"
        ? `La materia quedó aprobada con ${r.materia.nota} y se emitió su certificado.`
        : r.materia.cambio === "desaprobada"
          ? `La materia volvió a estar en curso (nota ${r.materia.nota}) y su certificado quedó revocado.`
          : `La nota de la materia es ${r.materia.nota}.`,
    );
  }
  if (r.nivel === "completo") partes.push("El nivel quedó completo.");
  if (r.nivel === "reabierto") partes.push("El nivel ya no está completo y su certificado quedó revocado.");
  return partes.join(" ");
}

// ---------------------------------------------------------------- el historial

async function registrar(req: Request, accion: string, alumnoId: number | null, texto: string, motivo: string | null): Promise<void> {
  await pool.query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address) VALUES ($1, $2, 'academia', $3, $4, $5)`,
    [req.user!.id, accion, alumnoId, JSON.stringify({ texto, motivo }), req.ip ?? null],
  );
}

// ---------------------------------------------------------------- las rutas

export function registerAcademiaRevisionRoutes(app: Express) {
  // Lo que hay que revisar: las escritas marcadas, los pedidos de revisión y lo revisado hace poco.
  app.get("/api/academia/direccion/revision", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const [pendientes, apelaciones, resueltas, recientes] = await Promise.all([
        itemsDe(`r.revisar AND r.revisada_at IS NULL`, [], "r.created_at", 200),
        apelacionesDe(`ap.estado = 'pendiente'`, [], 100),
        apelacionesDe(`ap.estado = 'resuelta' AND ap.resuelta_at > now() - interval '30 days'`, [], 20),
        itemsDe(`r.revisada_at IS NOT NULL`, [], "r.revisada_at DESC", 30),
      ]);
      const out: RevisionPanel = { pendientes, apelaciones: [...apelaciones, ...resueltas.reverse()], recientes };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] revisión:", err);
      res.sendStatus(500);
    }
  });

  // Las respuestas escritas de un alumno (cualquiera se puede revisar, no solo las marcadas).
  app.get("/api/academia/direccion/alumno/:alumnoId/escritas", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const id = Number(req.params.alumnoId);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe ese alumno." });
      res.setHeader("Cache-Control", "no-store");
      res.json({ escritas: await itemsDe(`r.user_id = $1`, [id], "r.created_at DESC", 200) });
    } catch (err) {
      console.error("[academia] escritas del alumno:", err);
      res.sendStatus(500);
    }
  });

  // Revisar una escrita: confirmar la nota del corrector, o cambiarla con un motivo (y recalcular en cadena).
  app.post("/api/academia/direccion/revision/:respuestaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const id = Number(req.params.respuestaId);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe esa respuesta." });
      const accion = req.body?.accion === "cambiar" ? "cambiar" : req.body?.accion === "confirmar" ? "confirmar" : null;
      if (!accion) return res.status(400).json({ message: "Elige confirmar la nota o cambiarla." });
      const motivo = limpio(req.body?.motivo, 500);
      const pedida = Math.round(Number(req.body?.nota));
      if (accion === "cambiar") {
        if (!Number.isFinite(pedida) || pedida < 0 || pedida > 100 || req.body?.nota === null || req.body?.nota === "") return res.status(400).json({ message: "La nota va de 0 a 100." });
        if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo del cambio: queda registrado y lo ve el alumno." });
      }
      if (frenar(`arv:${p.userId}`, 600)) return res.status(429).json({ message: "Espera un momento." });
      const { rows } = await pool.query(`SELECT user_id, clave, intento, nota_auto, nota_final FROM academia_respuestas WHERE id = $1`, [id]);
      const r = rows[0];
      if (!r) return res.status(404).json({ message: "No existe esa respuesta." });
      const ctx = contextoExamen(r.clave);
      if (!ctx) return res.status(409).json({ message: "Ese examen ya no existe." });
      const alumno = Number(r.user_id);
      if (alumno === p.userId) return res.status(403).json({ message: MENSAJE_PROPIO });
      const antes = Number(r.nota_final ?? r.nota_auto);
      const nueva = accion === "cambiar" ? pedida : antes;
      const cambio = nueva !== antes;
      const texto = motivo || (cambio ? "" : "Nota confirmada.");
      const out = await enFila(alumno, async () => {
        await pool.query(
          `UPDATE academia_respuestas SET nota_final = $2, revisada_por = $3, revisada_at = now(), motivo = $4, revisar = false WHERE id = $1`,
          [id, nueva, p.userId, texto],
        );
        if (!cambio) {
          await sincronizarResultado(alumno, ctx, Number(r.intento));
          return { recalculado: false, examen: { antes: null, despues: null }, materia: null, nivel: null } as Omit<ResultadoRevision, "item" | "mensaje">;
        }
        return recalcularTrasRevision(alumno, ctx, Number(r.intento), motivo);
      });
      await registrar(
        req,
        cambio ? "academia.nota" : "academia.nota-confirmada",
        alumno,
        cambio
          ? `Cambió la nota de una respuesta escrita ${delExamen(ctx)} (intento ${r.intento}) de ${antes} a ${nueva}.${out.recalculado ? ` El examen quedó en ${out.examen.despues}.` : ""}`
          : `Confirmó la nota (${antes}) de una respuesta escrita ${delExamen(ctx)} (intento ${r.intento}).`,
        cambio ? motivo : null,
      );
      if (cambio) {
        void avisarA(
          [alumno],
          "Revisaron tu respuesta escrita",
          `La Administración de la academia revisó tu respuesta escrita ${delExamen(ctx)}: tu nota pasó de ${antes} a ${nueva}. Motivo: ${motivo}`,
          ctx.ruta,
        ).catch((err) => console.error("[academia] aviso de revisión:", err));
      }
      const [item] = await itemsDe(`r.id = $1`, [id], "r.id", 1);
      const respuesta: ResultadoRevision = { item, ...out, mensaje: mensajeDe(out, cambio) };
      res.setHeader("Cache-Control", "no-store");
      res.json(respuesta);
    } catch (err) {
      console.error("[academia] revisar:", err);
      res.sendStatus(500);
    }
  });

  // Responder un pedido de revisión y cerrarlo (después de revisar sus escritas, si hacía falta). Avisa al alumno.
  app.post("/api/academia/direccion/apelacion/:apelacionId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const id = Number(req.params.apelacionId);
      const respuesta = limpio(req.body?.respuesta, 1000);
      if (respuesta.length < 8) return res.status(400).json({ message: "Escribe la respuesta para el alumno: qué se revisó y qué se decidió." });
      if (frenar(`arp:${p.userId}`, 600)) return res.status(429).json({ message: "Espera un momento." });
      const { rows: duenio } = await pool.query(`SELECT user_id FROM academia_apelaciones WHERE id = $1`, [id]);
      if (duenio[0] && Number(duenio[0].user_id) === p.userId) return res.status(403).json({ message: MENSAJE_PROPIO });
      const { rows } = await pool.query(
        `UPDATE academia_apelaciones SET estado = 'resuelta', respuesta = $2, resuelta_por = $3, resuelta_at = now()
          WHERE id = $1 AND estado = 'pendiente' RETURNING user_id, clave`,
        [id, respuesta, p.userId],
      );
      if (!rows[0]) return res.status(409).json({ message: "Ese pedido de revisión ya fue respondido, o no existe." });
      const ctx = contextoExamen(rows[0].clave);
      await registrar(req, "academia.apelacion", Number(rows[0].user_id), `Respondió el pedido de revisión ${delExamen(ctx)}.`, respuesta);
      void avisarA([Number(rows[0].user_id)], "Respondieron tu pedido de revisión", `Sobre ${ctx?.enFrase ?? "tu examen"}: ${respuesta}`, ctx?.ruta ?? "/academia").catch(() => undefined);
      const [item] = await apelacionesDe(`ap.id = $1`, [id], 1);
      res.json(item);
    } catch (err) {
      console.error("[academia] responder apelación:", err);
      res.sendStatus(500);
    }
  });

  // Revocar un documento (o volver a darlo por válido), siempre con un motivo. Avisa al alumno.
  for (const accion of ["revocar", "restaurar"] as const) {
    app.post(`/api/academia/direccion/documento/:codigo/${accion}`, async (req, res) => {
      try {
        const p = await permisoDe(req, res, "documentos");
        if (!p) return;
        const codigo = normalizarCodigo(String(req.params.codigo || ""));
        const motivo = limpio(req.body?.motivo, 500);
        if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo: queda registrado y lo ve el alumno." });
        const { rows: duenio } = await pool.query(`SELECT user_id FROM academia_certificados WHERE codigo = $1`, [codigo]);
        if (duenio[0] && Number(duenio[0].user_id) === p.userId) return res.status(403).json({ message: MENSAJE_PROPIO });
        const { rows } = await pool.query(
          accion === "revocar"
            ? `UPDATE academia_certificados SET revocado_at = now(), motivo = $2 WHERE codigo = $1 AND revocado_at IS NULL RETURNING user_id, titulo`
            : `UPDATE academia_certificados SET revocado_at = NULL, motivo = NULL WHERE codigo = $1 AND revocado_at IS NOT NULL RETURNING user_id, titulo`,
          accion === "revocar" ? [codigo, motivo] : [codigo],
        );
        if (!rows[0]) return res.status(409).json({ message: accion === "revocar" ? "Ese documento no existe o ya estaba revocado." : "Ese documento no existe o no estaba revocado." });
        const alumno = Number(rows[0].user_id);
        await registrar(req, `academia.${accion}`, alumno, `${accion === "revocar" ? "Revocó" : "Volvió a dar por válido"} el documento ${codigo} («${rows[0].titulo}»).`, motivo);
        void avisarA(
          [alumno],
          accion === "revocar" ? "Revocaron uno de tus certificados" : "Tu certificado vuelve a ser válido",
          `${accion === "revocar" ? "La Administración de la academia revocó" : "La Administración de la academia volvió a dar por válido"} tu certificado «${rows[0].titulo}» (${codigo}). Motivo: ${motivo}`,
          "/academia/expediente",
        ).catch(() => undefined);
        res.json({ codigo, revocado: accion === "revocar" });
      } catch (err) {
        console.error(`[academia] ${accion} documento:`, err);
        res.sendStatus(500);
      }
    });
  }

  // Corregir el nombre de un alumno en su ficha y en sus documentos vigentes, con un motivo. Avisa al alumno.
  app.post("/api/academia/direccion/alumno/:alumnoId/nombre", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "documentos");
      if (!p) return;
      const id = Number(req.params.alumnoId);
      if (id === p.userId) return res.status(403).json({ message: MENSAJE_PROPIO });
      const n = limpiarNombre(req.body?.nombres, "los nombres");
      const a = limpiarNombre(req.body?.apellidos, "los apellidos");
      const motivo = limpio(req.body?.motivo, 500);
      if (n.error || a.error) return res.status(400).json({ message: n.error ?? a.error });
      if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo de la corrección: queda registrado." });
      const { rows } = await pool.query(`SELECT nombres, apellidos FROM academia_inscripciones WHERE user_id = $1`, [id]);
      if (!rows[0]) return res.status(404).json({ message: "Ese alumno no tiene ficha de inscripción." });
      const antes = nombreCompleto(rows[0]);
      const nuevo = nombreCompleto({ nombres: n.valor, apellidos: a.valor });
      await pool.query(`UPDATE academia_inscripciones SET nombres = $2, apellidos = $3, updated_at = now() WHERE user_id = $1`, [id, n.valor, a.valor]);
      const { rowCount } = await pool.query(`UPDATE academia_certificados SET nombre = $2 WHERE user_id = $1 AND revocado_at IS NULL`, [id, nuevo]);
      const cuantos = rowCount ?? 0;
      await registrar(req, "academia.nombre", id, `Corrigió el nombre «${antes}» a «${nuevo}» en la ficha y en ${cuantos} ${cuantos === 1 ? "documento" : "documentos"}.`, motivo);
      void avisarA([id], "Corrigieron tu nombre en la academia", `La Administración de la academia corrigió tu nombre a «${nuevo}» en tu ficha y en tus documentos. Motivo: ${motivo}`, "/academia/inscripcion").catch(() => undefined);
      res.json({ nombre: nuevo, documentos: rowCount ?? 0 });
    } catch (err) {
      console.error("[academia] corregir nombre:", err);
      res.sendStatus(500);
    }
  });

  // Abrir la academia para todos (o volver a la vista previa). Solo la Administración y el Director del Ministerio.
  app.post("/api/academia/direccion/apertura", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "abrir");
      if (!p) return;
      if (typeof req.body?.abierta !== "boolean") return res.status(400).json({ message: "Elige abrir o cerrar la academia." });
      const abierta = req.body.abierta as boolean;
      await pool.query(
        `INSERT INTO site_content (section_key, title, content, updated_at, updated_by) VALUES ('academia_abierta', 'Academia abierta para todos', $1, now(), $2)
         ON CONFLICT (section_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now(), updated_by = EXCLUDED.updated_by`,
        [abierta ? "1" : "0", p.userId],
      );
      olvidarApertura();
      await registrar(req, abierta ? "academia.abrir" : "academia.cerrar", null, abierta ? "Abrió la academia para todos." : "Volvió a poner la academia en vista previa.", null);
      res.json({ abierta });
    } catch (err) {
      console.error("[academia] apertura:", err);
      res.sendStatus(500);
    }
  });

  // El historial: los cambios de notas, los pedidos de revisión respondidos, los documentos, los nombres y la apertura.
  app.get("/api/academia/direccion/historial", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const { rows } = await pool.query(
        `SELECT l.id, l.created_at, l.action, l.entity_id, l.details, u.display_name, u.username, i.nombres, i.apellidos, a.matricula, au.display_name AS alumno_cuenta
           FROM audit_log l
           LEFT JOIN users u ON u.id = l.user_id
           LEFT JOIN users au ON au.id = l.entity_id
           LEFT JOIN academia_inscripciones i ON i.user_id = l.entity_id
           LEFT JOIN academia_alumnos a ON a.user_id = l.entity_id
          WHERE l.entity_type = 'academia'
          ORDER BY l.created_at DESC LIMIT 200`,
      );
      const historial: HistorialItem[] = (rows as any[]).map((r) => {
        let det: { texto?: string; motivo?: string | null } = {};
        try {
          det = JSON.parse(r.details || "{}");
        } catch {
          det = { texto: String(r.details || "") };
        }
        return {
          id: Number(r.id),
          fecha: iso(r.created_at)!,
          por: String(r.display_name || r.username || "Una cuenta eliminada"),
          accion: String(r.action),
          alumno: r.entity_id ? { userId: Number(r.entity_id), nombre: r.nombres ? `${r.nombres} ${r.apellidos ?? ""}`.trim() : String(r.alumno_cuenta || "Una cuenta eliminada"), matricula: r.matricula ?? null } : null,
          texto: det.texto ?? "",
          motivo: det.motivo ?? null,
        };
      });
      res.setHeader("Cache-Control", "no-store");
      res.json({ historial });
    } catch (err) {
      console.error("[academia] historial:", err);
      res.sendStatus(500);
    }
  });
}
