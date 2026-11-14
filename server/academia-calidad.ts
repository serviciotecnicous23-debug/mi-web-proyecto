/**
 * La calidad del contenido de la academia (docs/academia.md, «La revisión del contenido» y «El análisis de preguntas»):
 * - la revisión doctrinal: cada materia con sus lecciones, su banco de preguntas con las respuestas y sus claves de
 *   corrección; las observaciones de quien la revisa (con su respuesta al resolverlas) y la aprobación de la Dirección
 *   académica, que guarda la huella del contenido: si el contenido cambia después, la aprobación deja de estar vigente;
 * - el análisis de preguntas (server/academia-analisis.ts) sobre los intentos cerrados del examen final de la materia y
 *   del examen integral de su nivel;
 * - retirar una pregunta del banco (o volver a usarla): ya no sale en los intentos nuevos y las notas ya dadas no
 *   cambian. El banco nunca queda corto: si quedarían menos preguntas de las que pide el examen, no se retira.
 *
 * Capacidades (shared/academia-permisos.ts): «contenido» (Dirección académica y profesores), «aprobar» y «banco»
 * (Dirección académica). Todo queda en el historial (audit_log, entity_type «academia»).
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { NIVELES, materiaPorId, type MateriaDef } from "@shared/academia";
import { ROLES_ACADEMIA, alcanceDe, type Capacidad } from "@shared/academia-permisos";
import type {
  AprobacionContenido, ContenidoDetalle, ContenidoLista, ContenidoResumen, EscritaAnalisis, ObservacionContenido, PreguntaAnalisis,
} from "@shared/academia-calidad";
import { BANCOS, materiaDe } from "./academia/index";
import { huellaDe, huellaDeclaracion, porQueNoSeRetira } from "./academia-banco";
import { ID_DECLARACION, PUNTOS_A_CONFIRMAR } from "@shared/academia-declaracion";
import { ANALISIS, cifrasDeEscritas, cifrasDePreguntas, gravedad, type CifrasPregunta, type IntentoRegistrado } from "./academia-analisis";
import { accesoDe, avisarA, claveFinal, claveIntegral, cuentasConRoles, frenar, olvidarRetiradas } from "./academia-comun";
import { permisoDe } from "./academia-direccion";

const iso = (v: unknown) => new Date(v as string).toISOString();
const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max) : "");
const quien = (nombre: unknown, usuario: unknown) => String(nombre || usuario || "La Administración");
const corto = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const puede = (role: string, c: Capacidad) => alcanceDe(role, c) !== "no";
const ROLES_DIRECCION = ROLES_ACADEMIA.find((r) => r.id === "direccion")!.roles;

/** Las materias con contenido (las que tienen banco), en el orden del catálogo. */
function materiasConContenido(): MateriaDef[] {
  return NIVELES.flatMap((n) => n.materias).filter((m) => BANCOS.has(m.id));
}

// ---------------------------------------------------------------- las retiradas (la guarda está en academia-banco.ts)

type Retirada = { por: string; fecha: string; motivo: string };

async function retiradasDe(): Promise<Map<string, Retirada>> {
  const { rows } = await pool.query(
    `SELECT r.pregunta_id, r.motivo, r.created_at, u.display_name, u.username FROM academia_preguntas_retiradas r LEFT JOIN users u ON u.id = r.user_id`,
  );
  return new Map((rows as any[]).map((r) => [String(r.pregunta_id), { por: quien(r.display_name, r.username), fecha: iso(r.created_at), motivo: r.motivo ?? "" }]));
}

// ---------------------------------------------------------------- el análisis

/** Las cifras de las preguntas (y las escritas) sobre los intentos cerrados de esos exámenes. */
async function analisisDe(claves: string[], escritas: string[]) {
  const [{ rows: intentos }, { rows: resp }] = await Promise.all([
    pool.query(`SELECT clave, respuestas FROM academia_intentos WHERE clave = ANY($1::text[]) ORDER BY cerrado_at DESC LIMIT 5000`, [claves]),
    escritas.length
      ? pool.query(`SELECT pregunta_id, nota_auto, nota_final, revisar FROM academia_respuestas WHERE pregunta_id = ANY($1::text[]) ORDER BY id DESC LIMIT 20000`, [escritas])
      : Promise.resolve({ rows: [] as any[] }),
  ]);
  const porClave = new Map<string, number>();
  for (const r of intentos as any[]) porClave.set(String(r.clave), (porClave.get(String(r.clave)) ?? 0) + 1);
  const objetivas = cifrasDePreguntas((intentos as any[]).map((r): IntentoRegistrado => ({ respuestas: Array.isArray(r.respuestas) ? r.respuestas : [] })));
  const deEscritas = cifrasDeEscritas(
    (resp as any[]).map((r) => ({ pregunta_id: String(r.pregunta_id), nota_auto: Number(r.nota_auto), nota_final: r.nota_final == null ? null : Number(r.nota_final), marcas: r.revisar ? 1 : 0 })),
  );
  return { objetivas, escritas: deEscritas, porClave };
}

const conAlerta = (banderas: string[]) => banderas.some((b) => !b.startsWith("Pocos datos"));

// ---------------------------------------------------------------- las observaciones y la aprobación

async function observacionesDe(m: MateriaDef, userId: number): Promise<ObservacionContenido[]> {
  const { rows } = await pool.query(
    `SELECT n.id, n.user_id, n.leccion_id, n.texto, n.created_at, n.resuelta_at, n.respuesta, u.display_name, u.username, ru.display_name AS r_nombre, ru.username AS r_usuario
       FROM academia_contenido_notas n
       LEFT JOIN users u ON u.id = n.user_id
       LEFT JOIN users ru ON ru.id = n.resuelta_por
      WHERE n.materia_id = $1
      ORDER BY (n.resuelta_at IS NOT NULL), n.created_at DESC
      LIMIT 300`,
    [m.id],
  );
  return (rows as any[]).map((r) => ({
    id: Number(r.id),
    leccionId: r.leccion_id ?? null,
    leccion: r.leccion_id ? m.lecciones.find((l) => l.id === r.leccion_id)?.titulo ?? null : null,
    texto: r.texto,
    por: quien(r.display_name, r.username),
    fecha: iso(r.created_at),
    propia: Number(r.user_id) === userId,
    resuelta: r.resuelta_at ? { por: quien(r.r_nombre, r.r_usuario), fecha: iso(r.resuelta_at), respuesta: r.respuesta ?? null } : null,
  }));
}

async function aprobacionesDe(): Promise<Map<string, AprobacionContenido>> {
  const { rows } = await pool.query(
    `SELECT a.materia_id, a.aprobada_at, a.notas, a.huella, u.display_name, u.username FROM academia_contenido_aprobaciones a LEFT JOIN users u ON u.id = a.user_id`,
  );
  const out = new Map<string, AprobacionContenido>();
  for (const r of rows as any[]) {
    const id = String(r.materia_id);
    const m = materiaPorId(id);
    const vigente = id === ID_DECLARACION ? r.huella === huellaDeclaracion() : !!m && r.huella === huellaDe(m);
    out.set(id, { por: quien(r.display_name, r.username), fecha: iso(r.aprobada_at), notas: r.notas ?? null, vigente });
  }
  return out;
}

async function abiertasPorMateria(): Promise<Map<string, number>> {
  const { rows } = await pool.query(`SELECT materia_id, count(*)::int AS n FROM academia_contenido_notas WHERE resuelta_at IS NULL GROUP BY materia_id`);
  return new Map((rows as any[]).map((r) => [String(r.materia_id), Number(r.n)]));
}

/** La lista de la revisión del contenido, con lo que falta para abrir la academia. */
export async function listaDeContenido(): Promise<ContenidoLista> {
  const materias = materiasConContenido();
  const claves = [...materias.map((m) => claveFinal(m.id)), ...NIVELES.map((n) => claveIntegral(n.n))];
  const escritas = materias.flatMap((m) => BANCOS.get(m.id)!.escritas.map((e) => e.id));
  const [analisis, aprobaciones, abiertas, retiradas] = await Promise.all([analisisDe(claves, escritas), aprobacionesDe(), abiertasPorMateria(), retiradasDe()]);
  const filas: ContenidoResumen[] = materias.map((m) => {
    const banco = BANCOS.get(m.id)!;
    const ids = [...banco.final.map((p) => p.id), ...banco.escritas.map((e) => e.id)];
    const activas = ids.filter((id) => !retiradas.has(id));
    const alertas =
      banco.final.filter((p) => !retiradas.has(p.id) && conAlerta(analisis.objetivas.get(p.id)?.banderas ?? [])).length +
      banco.escritas.filter((e) => !retiradas.has(e.id) && conAlerta(analisis.escritas.get(e.id)?.banderas ?? [])).length;
    return {
      id: m.id,
      titulo: m.titulo,
      nivel: m.nivel,
      disponible: m.disponible,
      lecciones: m.lecciones.length,
      preguntas: banco.final.length,
      escritas: banco.escritas.length,
      abiertas: abiertas.get(m.id) ?? 0,
      aprobacion: aprobaciones.get(m.id) ?? null,
      alertas,
      retiradas: ids.length - activas.length,
    };
  });
  return {
    materias: filas,
    declaracion: { aprobacion: aprobaciones.get(ID_DECLARACION) ?? null, puntos: PUNTOS_A_CONFIRMAR.length },
    total: filas.length,
    aprobadas: filas.filter((f) => f.aprobacion?.vigente).length,
    abiertas: filas.reduce((s, f) => s + f.abiertas, 0),
  };
}

async function detalleDe(m: MateriaDef, role: string, userId: number): Promise<ContenidoDetalle> {
  const banco = BANCOS.get(m.id)!;
  const claves = [claveFinal(m.id), ...(m.nivel ? [claveIntegral(m.nivel)] : [])];
  const [analisis, observaciones, aprobaciones, retiradas] = await Promise.all([
    analisisDe(claves, banco.escritas.map((e) => e.id)),
    observacionesDe(m, userId),
    aprobacionesDe(),
    retiradasDe(),
  ]);
  const ids = new Set(retiradas.keys());
  const objetivas: PreguntaAnalisis[] = banco.final.map((p) => {
    const c = analisis.objetivas.get(p.id);
    const base: Pick<CifrasPregunta, "n" | "distractor" | "banderas"> = c ?? { n: 0, distractor: null, banderas: ["Pocos datos (0 intentos)"] };
    return {
      id: p.id,
      leccion: p.leccion,
      texto: p.texto,
      correcta: p.correcta,
      falsas: [...p.falsas],
      explica: p.explica,
      ref: p.ref,
      n: base.n,
      facilidad: c ? c.facilidad : null,
      discriminacion: c ? c.discriminacion : null,
      tarde: c ? c.tarde : null,
      distractor: base.distractor,
      banderas: base.banderas,
      retirada: retiradas.get(p.id) ?? null,
      noSeRetira: retiradas.has(p.id) ? null : porQueNoSeRetira(p.id, ids),
    };
  });
  // primero las que hay que mirar (de lo más grave a lo menos), las retiradas al final
  objetivas.sort((a, b) => Number(!!a.retirada) - Number(!!b.retirada) || gravedad(b.banderas) - gravedad(a.banderas) || a.leccion - b.leccion || a.id.localeCompare(b.id));
  const escritas: EscritaAnalisis[] = banco.escritas.map((e) => {
    const c = analisis.escritas.get(e.id);
    return {
      id: e.id,
      pregunta: e.pregunta,
      ideas: e.ideas.map((i) => ({ texto: i.texto, peso: i.peso })),
      modelo: e.modelo,
      n: c?.n ?? 0,
      promedio: c ? c.promedio : null,
      marcadas: c ? c.marcadas : null,
      cambiadas: c ? c.cambiadas : null,
      cambioMedio: c ? c.cambioMedio : null,
      banderas: c?.banderas ?? ["Pocos datos (0 respuestas)"],
      retirada: retiradas.get(e.id) ?? null,
      noSeRetira: retiradas.has(e.id) ? null : porQueNoSeRetira(e.id, ids),
    };
  });
  return {
    materia: { id: m.id, titulo: m.titulo, nivel: m.nivel, resumen: m.resumen, memoria: m.memoria ?? null, disponible: m.disponible },
    lecciones: m.lecciones.map((l) => ({ id: l.id, titulo: l.titulo, minutos: l.minutos, base: l.base })),
    observaciones,
    aprobacion: aprobaciones.get(m.id) ?? null,
    intentos: { final: analisis.porClave.get(claveFinal(m.id)) ?? 0, integral: m.nivel ? analisis.porClave.get(claveIntegral(m.nivel)) ?? 0 : 0 },
    objetivas,
    escritas,
    repaso: m.lecciones.map((l) => ({
      leccionId: l.id,
      leccion: l.titulo,
      preguntas: (banco.repaso[l.id] ?? []).map((p) => ({ id: p.id, texto: p.texto, correcta: p.correcta, falsas: [...p.falsas], explica: p.explica, ref: p.ref })),
    })),
    umbrales: { minimo: ANALISIS.minimo, muyDificil: ANALISIS.muyDificil, muyFacil: ANALISIS.muyFacil, discriminaPoco: ANALISIS.discriminaPoco, tarde: ANALISIS.tarde },
    puede: { observar: puede(role, "contenido"), aprobar: puede(role, "aprobar"), banco: puede(role, "banco") },
  };
}

// ---------------------------------------------------------------- el historial

async function registrar(req: Request, accion: string, texto: string, motivo: string | null): Promise<void> {
  await pool.query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address) VALUES ($1, $2, 'academia', NULL, $3, $4)`,
    [req.user!.id, accion, JSON.stringify({ texto, motivo }), req.ip ?? null],
  );
}

const nombreDe = (req: Request) => quien((req.user as any)?.displayName, (req.user as any)?.username);
const materiaConBanco = (id: string) => {
  const m = materiaPorId(id);
  return m && BANCOS.has(m.id) ? m : undefined;
};

// ---------------------------------------------------------------- las rutas

export function registerAcademiaCalidadRoutes(app: Express) {
  // La lista: cada materia con contenido, su aprobación, sus observaciones abiertas, sus alertas y sus retiradas.
  app.get("/api/academia/direccion/contenido", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await listaDeContenido());
    } catch (err) {
      console.error("[academia] contenido, lista:", err);
      res.sendStatus(500);
    }
  });

  // Una materia: lecciones, observaciones, aprobación, banco con sus respuestas y el análisis de cada pregunta.
  app.get("/api/academia/direccion/contenido/:materiaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      const m = materiaConBanco(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "Esa materia no existe o todavía no tiene contenido." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await detalleDe(m, p.role, p.userId));
    } catch (err) {
      console.error("[academia] contenido, materia:", err);
      res.sendStatus(500);
    }
  });

  // Dejar una observación sobre la materia o sobre una de sus lecciones. Avisa a la Dirección académica en la campana.
  app.post("/api/academia/direccion/contenido/:materiaId/observacion", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      const m = materiaConBanco(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "Esa materia no existe o todavía no tiene contenido." });
      const texto = limpio(req.body?.texto, 1500);
      if (texto.length < 8) return res.status(400).json({ message: "Escribe la observación: qué hay que revisar y por qué (con la cita, si aplica)." });
      const leccionId = typeof req.body?.leccionId === "string" && req.body.leccionId ? String(req.body.leccionId) : null;
      const leccion = leccionId ? m.lecciones.find((l) => l.id === leccionId) : null;
      if (leccionId && !leccion) return res.status(400).json({ message: "Esa lección no es de esta materia." });
      if (frenar(`academia-obs:${p.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento antes de dejar otra observación." });
      const { rows } = await pool.query(
        `INSERT INTO academia_contenido_notas (materia_id, leccion_id, texto, user_id) VALUES ($1, $2, $3, $4) RETURNING id`,
        [m.id, leccionId, texto, p.userId],
      );
      const donde = leccion ? `la lección «${leccion.titulo}» de «${m.titulo}»` : `la materia «${m.titulo}»`;
      await registrar(req, "academia.contenido.observar", `Dejó una observación sobre ${donde}.`, texto);
      void cuentasConRoles(ROLES_DIRECCION, p.userId)
        .then((ids) => avisarA(ids, `Observación sobre «${m.titulo}»`, `${nombreDe(req)} dejó una observación sobre ${donde}: ${corto(texto, 300)}`, `/admin/academia/contenido/${m.id}`))
        .catch(() => undefined);
      res.status(201).json({ id: Number(rows[0].id) });
    } catch (err) {
      console.error("[academia] contenido, observación:", err);
      res.sendStatus(500);
    }
  });

  // Resolver una observación con lo que se hizo (la resuelve quien la dejó o la Dirección académica).
  app.post("/api/academia/direccion/contenido/observacion/:notaId/resolver", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "contenido");
      if (!p) return;
      const id = Number(req.params.notaId);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe esa observación." });
      const respuesta = limpio(req.body?.respuesta, 1000);
      if (respuesta.length < 8) return res.status(400).json({ message: "Escribe qué se hizo: qué se corrigió o por qué no hace falta cambiarlo." });
      const { rows: antes } = await pool.query(`SELECT materia_id, user_id, texto, resuelta_at FROM academia_contenido_notas WHERE id = $1`, [id]);
      const n = antes[0];
      if (!n) return res.status(404).json({ message: "No existe esa observación." });
      if (n.resuelta_at) return res.status(409).json({ message: "Esa observación ya estaba resuelta." });
      if (Number(n.user_id) !== p.userId && !puede(p.role, "aprobar")) {
        return res.status(403).json({ message: "La resuelve quien la dejó o el administrador de la academia." });
      }
      const { rowCount } = await pool.query(
        `UPDATE academia_contenido_notas SET resuelta_por = $2, resuelta_at = now(), respuesta = $3 WHERE id = $1 AND resuelta_at IS NULL`,
        [id, p.userId, respuesta],
      );
      if (!rowCount) return res.status(409).json({ message: "Esa observación ya estaba resuelta." });
      const titulo = materiaPorId(String(n.materia_id))?.titulo ?? String(n.materia_id);
      await registrar(req, "academia.contenido.resolver", `Resolvió una observación sobre «${titulo}»: «${corto(String(n.texto))}».`, respuesta);
      if (n.user_id && Number(n.user_id) !== p.userId) {
        void avisarA([Number(n.user_id)], `Resolvieron tu observación sobre «${titulo}»`, `${nombreDe(req)} respondió: ${corto(respuesta, 300)}`, `/admin/academia/contenido/${n.materia_id}`).catch(() => undefined);
      }
      res.json({ id });
    } catch (err) {
      console.error("[academia] contenido, resolver:", err);
      res.sendStatus(500);
    }
  });

  // Aprobar una materia en la revisión doctrinal (sin observaciones abiertas), o quitar la aprobación con un motivo.
  app.post("/api/academia/direccion/contenido/:materiaId/aprobar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "aprobar");
      if (!p) return;
      const m = materiaConBanco(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "Esa materia no existe o todavía no tiene contenido." });
      const { rows: ab } = await pool.query(`SELECT count(*)::int AS n FROM academia_contenido_notas WHERE materia_id = $1 AND resuelta_at IS NULL`, [m.id]);
      const abiertas = Number(ab[0]?.n ?? 0);
      if (abiertas > 0) {
        return res.status(409).json({ message: `Antes de aprobarla, resuelve ${abiertas === 1 ? "la observación abierta" : `las ${abiertas} observaciones abiertas`}.` });
      }
      const notas = limpio(req.body?.notas, 500) || null;
      await pool.query(
        `INSERT INTO academia_contenido_aprobaciones (materia_id, user_id, aprobada_at, notas, huella) VALUES ($1, $2, now(), $3, $4)
         ON CONFLICT (materia_id) DO UPDATE SET user_id = EXCLUDED.user_id, aprobada_at = now(), notas = EXCLUDED.notas, huella = EXCLUDED.huella`,
        [m.id, p.userId, notas, huellaDe(m)],
      );
      await registrar(req, "academia.contenido.aprobar", `Aprobó en la revisión doctrinal la materia «${m.titulo}».`, notas);
      res.json({ aprobada: true });
    } catch (err) {
      console.error("[academia] contenido, aprobar:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/direccion/contenido/:materiaId/desaprobar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "aprobar");
      if (!p) return;
      const m = materiaConBanco(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "Esa materia no existe o todavía no tiene contenido." });
      const motivo = limpio(req.body?.motivo, 500);
      if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo: queda en el historial." });
      const { rowCount } = await pool.query(`DELETE FROM academia_contenido_aprobaciones WHERE materia_id = $1`, [m.id]);
      if (!rowCount) return res.status(409).json({ message: "Esa materia no estaba aprobada." });
      await registrar(req, "academia.contenido.desaprobar", `Quitó la aprobación doctrinal de la materia «${m.titulo}».`, motivo);
      res.json({ aprobada: false });
    } catch (err) {
      console.error("[academia] contenido, desaprobar:", err);
      res.sendStatus(500);
    }
  });

  // La declaración de fe: si está aprobada (la página la muestra como borrador mientras no lo esté).
  app.get("/api/academia/declaracion", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: "La Academia Avivando el Fuego abre muy pronto." });
      const a = (await aprobacionesDe()).get(ID_DECLARACION) ?? null;
      res.setHeader("Cache-Control", "no-store");
      res.json({ aprobacion: a && a.vigente ? { por: a.por, fecha: a.fecha } : null, cambio: !!a && !a.vigente });
    } catch (err) {
      console.error("[academia] declaración de fe:", err);
      res.sendStatus(500);
    }
  });

  // Aprobar la declaración de fe (la Dirección académica), o quitar la aprobación con un motivo.
  app.post("/api/academia/direccion/declaracion/aprobar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "aprobar");
      if (!p) return;
      const notas = limpio(req.body?.notas, 500) || null;
      await pool.query(
        `INSERT INTO academia_contenido_aprobaciones (materia_id, user_id, aprobada_at, notas, huella) VALUES ($1, $2, now(), $3, $4)
         ON CONFLICT (materia_id) DO UPDATE SET user_id = EXCLUDED.user_id, aprobada_at = now(), notas = EXCLUDED.notas, huella = EXCLUDED.huella`,
        [ID_DECLARACION, p.userId, notas, huellaDeclaracion()],
      );
      await registrar(req, "academia.declaracion.aprobar", "Aprobó la declaración de fe del Ministerio.", notas);
      res.json({ aprobada: true });
    } catch (err) {
      console.error("[academia] aprobar la declaración:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/direccion/declaracion/desaprobar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "aprobar");
      if (!p) return;
      const motivo = limpio(req.body?.motivo, 500);
      if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo: queda en el historial." });
      const { rowCount } = await pool.query(`DELETE FROM academia_contenido_aprobaciones WHERE materia_id = $1`, [ID_DECLARACION]);
      if (!rowCount) return res.status(409).json({ message: "La declaración de fe no estaba aprobada." });
      await registrar(req, "academia.declaracion.desaprobar", "Quitó la aprobación de la declaración de fe.", motivo);
      res.json({ aprobada: false });
    } catch (err) {
      console.error("[academia] desaprobar la declaración:", err);
      res.sendStatus(500);
    }
  });

  // Retirar una pregunta del banco (ya no sale en los intentos nuevos) o volver a usarla, siempre con un motivo.
  app.post("/api/academia/direccion/pregunta/:preguntaId/retirar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "banco");
      if (!p) return;
      const id = String(req.params.preguntaId);
      const materiaId = materiaDe(id);
      const m = materiaId ? materiaPorId(materiaId) : undefined;
      if (!m) return res.status(404).json({ message: "Esa pregunta no está en el banco de ningún examen." });
      const motivo = limpio(req.body?.motivo, 500);
      if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo: qué tiene la pregunta (según el análisis o la revisión)." });
      const antes = await retiradasDe();
      if (antes.has(id)) return res.status(409).json({ message: "Esa pregunta ya estaba retirada." });
      const no = porQueNoSeRetira(id, new Set(antes.keys()));
      if (no) return res.status(409).json({ message: `No se puede retirar: ${no.charAt(0).toLowerCase()}${no.slice(1)}` });
      const { rowCount } = await pool.query(
        `INSERT INTO academia_preguntas_retiradas (pregunta_id, motivo, user_id) VALUES ($1, $2, $3) ON CONFLICT (pregunta_id) DO NOTHING`,
        [id, motivo, p.userId],
      );
      if (!rowCount) return res.status(409).json({ message: "Esa pregunta ya estaba retirada." });
      // si otra persona retiró otra pregunta al mismo tiempo, se vuelve a mirar que el banco no quede corto
      const despues = new Set((await retiradasDe()).keys());
      despues.delete(id);
      if (porQueNoSeRetira(id, despues)) {
        await pool.query(`DELETE FROM academia_preguntas_retiradas WHERE pregunta_id = $1 AND user_id = $2`, [id, p.userId]);
        return res.status(409).json({ message: "No se puede retirar: con lo que se acaba de retirar, el banco quedaría corto." });
      }
      olvidarRetiradas();
      const banco = BANCOS.get(m.id)!;
      const texto = banco.final.find((x) => x.id === id)?.texto ?? banco.escritas.find((x) => x.id === id)?.pregunta ?? id;
      await registrar(req, "academia.banco.retirar", `Retiró del banco de «${m.titulo}» la pregunta «${corto(texto)}».`, motivo);
      res.json({ retirada: true });
    } catch (err) {
      console.error("[academia] retirar pregunta:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/academia/direccion/pregunta/:preguntaId/restaurar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "banco");
      if (!p) return;
      const id = String(req.params.preguntaId);
      const materiaId = materiaDe(id);
      const m = materiaId ? materiaPorId(materiaId) : undefined;
      if (!m) return res.status(404).json({ message: "Esa pregunta no está en el banco de ningún examen." });
      const motivo = limpio(req.body?.motivo, 500);
      if (motivo.length < 8) return res.status(400).json({ message: "Escribe el motivo: por qué vuelve a usarse (por ejemplo, que ya se corrigió)." });
      const { rowCount } = await pool.query(`DELETE FROM academia_preguntas_retiradas WHERE pregunta_id = $1`, [id]);
      if (!rowCount) return res.status(409).json({ message: "Esa pregunta no estaba retirada." });
      olvidarRetiradas();
      const banco = BANCOS.get(m.id)!;
      const texto = banco.final.find((x) => x.id === id)?.texto ?? banco.escritas.find((x) => x.id === id)?.pregunta ?? id;
      await registrar(req, "academia.banco.restaurar", `Volvió a usar en el banco de «${m.titulo}» la pregunta «${corto(texto)}».`, motivo);
      res.json({ retirada: false });
    } catch (err) {
      console.error("[academia] restaurar pregunta:", err);
      res.sendStatus(500);
    }
  });
}
