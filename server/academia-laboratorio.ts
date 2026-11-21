/**
 * El laboratorio ministerial (shared/laboratorio.ts): las prácticas de cada materia, sus intentos y la conversación de
 * cierre. El servidor manda un paso a la vez y califica aquí; el navegador nunca ve los puntos de las opciones antes
 * de responder. Los inscritos en la materia hacen la práctica cuando terminan sus lecciones; la Administración la
 * prueba sin inscribirse (sus intentos quedan como prueba). En el piloto no cuenta para la nota de la materia.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { enlaceBiblia, materiaPorId, parsearCita, puedeRevisar, type MateriaDef } from "@shared/academia";
import {
  LABORATORIO, LIMITE_LLEVO, SENTIRES, nivelDe, type IntentoVista, type LaboratorioMateria, type PracticaDetalle, type PracticaResumen, type RespuestaPaso,
} from "@shared/laboratorio";
import { practicaPorId, practicasDeMateria } from "./academia/laboratorio/index";
import type { PracticaDef } from "./academia/laboratorio/tipos";
import { estadoValido, medidoresVista, nuevoEstado, pasosDe, responder, resultado, terminado, varianteDe, vistaPaso, type EstadoIntento } from "./academia-laboratorio-motor";
import {
  MENSAJE_CERRADA, MENSAJE_INSCRIPCION, MENSAJE_MATERIA, accesoDe, alumnoDe, enFila, estaInscrito, inscritaEnMateria, marcarEstudio, type Acceso,
} from "./academia-comun";

/** Los intentos de cada práctica (aditiva; se borra con la cuenta: server/account-deletion.ts). */
export const LABORATORIO_SQL = `
CREATE TABLE IF NOT EXISTS academia_laboratorio (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  practica_id text NOT NULL,
  materia_id text NOT NULL,
  intento integer NOT NULL,
  variante integer NOT NULL DEFAULT 0,
  cuenta boolean NOT NULL DEFAULT true,
  prueba boolean NOT NULL DEFAULT false,
  estado text NOT NULL DEFAULT 'en-curso',
  datos jsonb NOT NULL,
  nota integer,
  criticas integer NOT NULL DEFAULT 0,
  cierre jsonb,
  created_at timestamp NOT NULL DEFAULT now(),
  terminado_at timestamp
);
CREATE INDEX IF NOT EXISTS academia_laboratorio_alumno ON academia_laboratorio (user_id, practica_id);
CREATE INDEX IF NOT EXISTS academia_laboratorio_materia ON academia_laboratorio (materia_id, terminado_at);
`;

type Fila = {
  id: number;
  user_id: number;
  practica_id: string;
  materia_id: string;
  intento: number;
  variante: number;
  cuenta: boolean;
  prueba: boolean;
  estado: string;
  datos: any;
  nota: number | null;
  criticas: number;
  cierre: any;
};

/** Quién hace la práctica: el alumno inscrito en la materia o la Administración, que la prueba sin inscribirse. */
async function modoDe(acceso: Acceso, materiaId: string): Promise<{ inscrito: boolean; prueba: boolean; academia: boolean }> {
  if (!acceso.userId) return { inscrito: false, prueba: false, academia: false };
  const academia = await estaInscrito(acceso.userId);
  const inscrito = academia && !!(await inscritaEnMateria(acceso.userId, materiaId));
  return { inscrito, prueba: !inscrito && puedeRevisar(acceso.role), academia };
}

async function leccionesHechas(userId: number, m: MateriaDef): Promise<Set<string>> {
  const { rows } = await pool.query(
    `SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND completada_at IS NOT NULL`,
    [userId, m.lecciones.map((l) => l.id)],
  );
  return new Set(rows.map((r) => r.leccion_id as string));
}

function leccionesDe(p: PracticaDef, m: MateriaDef, hechas: Set<string>) {
  return p.lecciones
    .map((n) => ({ n, l: m.lecciones[n - 1] }))
    .filter((x) => !!x.l)
    .map(({ n, l }) => ({ n, id: l.id, titulo: l.titulo, completada: hechas.has(l.id) }));
}

const faltaDe = (lecciones: { n: number; completada: boolean }[]) => {
  const n = lecciones.filter((l) => !l.completada).map((l) => l.n);
  if (!n.length) return [];
  return [n.length === 1 ? `terminar la lección ${n[0]}` : `terminar las lecciones ${n.slice(0, -1).join(", ")} y ${n[n.length - 1]}`];
};

/** Los intentos de una persona en unas prácticas: los que cuentan (o, en prueba, todos), el mejor y el abierto. */
async function intentosDe(userId: number, ids: string[], prueba: boolean): Promise<Map<string, { intentos: number; mejor: number | null; enCurso: number | null }>> {
  const { rows } = await pool.query(
    `SELECT practica_id,
            count(*) FILTER (WHERE ${prueba ? "prueba" : "cuenta"})::int AS intentos,
            max(nota) FILTER (WHERE estado = 'terminado' AND ${prueba ? "prueba" : "cuenta"}) AS mejor,
            max(id) FILTER (WHERE estado = 'en-curso' AND prueba = $3) AS en_curso
       FROM academia_laboratorio WHERE user_id = $1 AND practica_id = ANY($2::text[]) GROUP BY practica_id`,
    [userId, ids, prueba],
  );
  return new Map(rows.map((r) => [r.practica_id as string, { intentos: r.intentos, mejor: r.mejor == null ? null : Number(r.mejor), enCurso: r.en_curso ?? null }]));
}

function resumenDe(p: PracticaDef, m: MateriaDef, hechas: Set<string>, prueba: boolean, i?: { intentos: number; mejor: number | null; enCurso: number | null }): PracticaResumen {
  const lecciones = leccionesDe(p, m, hechas);
  return {
    id: p.id,
    titulo: p.titulo,
    formato: p.formato,
    rol: p.rol,
    situacion: p.situacion,
    minutos: p.minutos,
    pasos: pasosDe(p, 0).length,
    lecciones,
    falta: prueba ? [] : faltaDe(lecciones),
    intentos: i?.intentos ?? 0,
    mejor: i?.mejor ?? null,
    nivel: i?.mejor != null ? nivelDe(i.mejor) : null,
    enCurso: i?.enCurso ?? null,
  };
}

async function vistaDe(f: Fila, p: PracticaDef): Promise<IntentoVista> {
  const m = materiaPorId(p.materia)!;
  const s = estadoValido(p, f.datos) ?? nuevoEstado(p, 0);
  const resumen = (await intentosDe(f.user_id, [p.id], f.prueba)).get(p.id);
  const fin = f.estado === "terminado";
  return {
    id: f.id,
    practica: { id: p.id, titulo: p.titulo, formato: p.formato, rol: p.rol, minutos: p.minutos, cierre: p.cierre },
    materia: { id: m.id, titulo: m.titulo },
    intento: f.intento,
    cuenta: f.cuenta,
    estado: fin ? "terminado" : "en-curso",
    paso: fin ? null : vistaPaso(p, s),
    medidores: medidoresVista(p, s),
    resultado: fin ? resultado(p, s) : null,
    cierre: f.cierre ? { sentir: f.cierre.sentir ?? null, llevo: String(f.cierre.llevo ?? "") } : null,
    mejor: resumen?.mejor ?? null,
    intentos: resumen?.intentos ?? 0,
  };
}

/** El intento de quien pregunta (o null con la respuesta de error ya enviada). */
async function intentoDe(req: Request, res: Response): Promise<{ userId: number; fila: Fila; p: PracticaDef } | null> {
  const a = await alumnoDe(req, res);
  if (!a) return null;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(404).json({ message: "No se encontró esa práctica." });
    return null;
  }
  const { rows } = await pool.query(`SELECT * FROM academia_laboratorio WHERE id = $1 AND user_id = $2`, [id, a.userId]);
  const fila = rows[0] as Fila | undefined;
  const p = fila ? practicaPorId(fila.practica_id) : undefined;
  if (!fila || !p) {
    res.status(404).json({ message: "No se encontró esa práctica." });
    return null;
  }
  return { userId: a.userId, fila, p };
}

export function registerAcademiaLaboratorioRoutes(app: Express) {
  // Las prácticas de una materia (vacío si no tiene): se ven en su página, antes del examen final.
  app.get("/api/academia/laboratorio/materia/:materiaId", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const m = materiaPorId(String(req.params.materiaId));
      if (!m) return res.status(404).json({ message: "No se encontró la materia." });
      const defs = practicasDeMateria(m.id);
      const modo = await modoDe(acceso, m.id);
      const hechas = acceso.userId && modo.inscrito ? await leccionesHechas(acceso.userId, m) : new Set<string>();
      const intentos = acceso.userId && defs.length ? await intentosDe(acceso.userId, defs.map((p) => p.id), modo.prueba) : new Map();
      const out: LaboratorioMateria = {
        materiaId: m.id,
        practicas: defs.map((p) => resumenDe(p, m, hechas, modo.prueba, intentos.get(p.id))),
        prueba: modo.prueba,
        puede: modo.inscrito || modo.prueba,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (e: any) {
      console.error("laboratorio/materia:", e?.message);
      res.status(500).json({ message: "No se pudo cargar el laboratorio." });
    }
  });

  // Una práctica antes de empezar: la preparación.
  app.get("/api/academia/laboratorio/practica/:practicaId", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const p = practicaPorId(String(req.params.practicaId));
      const m = p ? materiaPorId(p.materia) : undefined;
      if (!p || !m) return res.status(404).json({ message: "No se encontró esa práctica." });
      const modo = await modoDe(acceso, m.id);
      const hechas = acceso.userId && modo.inscrito ? await leccionesHechas(acceso.userId, m) : new Set<string>();
      const intentos = acceso.userId ? await intentosDe(acceso.userId, [p.id], modo.prueba) : new Map();
      const cita = p.lectura ? parsearCita(p.lectura) : null;
      const out: PracticaDetalle = {
        practica: {
          ...resumenDe(p, m, hechas, modo.prueba, intentos.get(p.id)),
          objetivo: p.objetivo,
          antes: p.antes,
          competencias: p.competencias.map((c) => ({ nombre: c.nombre, leccion: c.leccion })),
          cierre: p.cierre,
          lectura: p.lectura ? { ref: p.lectura, enlace: cita ? enlaceBiblia(cita) : null } : null,
        },
        materia: { id: m.id, titulo: m.titulo },
        conSesion: !!acceso.userId,
        prueba: modo.prueba,
        puede: modo.inscrito || modo.prueba,
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (e: any) {
      console.error("laboratorio/practica:", e?.message);
      res.status(500).json({ message: "No se pudo cargar la práctica." });
    }
  });

  // Empezar (o seguir con el intento abierto).
  app.post("/api/academia/laboratorio/practica/:practicaId/empezar", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const p = practicaPorId(String(req.params.practicaId));
      const m = p ? materiaPorId(p.materia) : undefined;
      if (!p || !m) return res.status(404).json({ message: "No se encontró esa práctica." });
      const modo = await modoDe(a.acceso, m.id);
      if (!modo.inscrito && !modo.prueba) {
        return modo.academia
          ? res.status(409).json({ message: MENSAJE_MATERIA, materia: false, materiaId: m.id })
          : res.status(409).json({ message: MENSAJE_INSCRIPCION, inscripcion: false });
      }
      if (!modo.prueba) {
        const falta = faltaDe(leccionesDe(p, m, await leccionesHechas(a.userId, m)));
        if (falta.length) return res.status(409).json({ message: `Antes de esta práctica te falta ${falta.join(" y ")}.`, falta });
      }
      const vista = await enFila(a.userId, async () => {
        const abierto = await pool.query(
          `SELECT * FROM academia_laboratorio WHERE user_id = $1 AND practica_id = $2 AND estado = 'en-curso' AND prueba = $3 ORDER BY id DESC LIMIT 1`,
          [a.userId, p.id, modo.prueba],
        );
        if (abierto.rows[0]) return vistaDe(abierto.rows[0] as Fila, p);
        const { rows: c } = await pool.query(
          `SELECT count(*)::int AS todos, count(*) FILTER (WHERE cuenta)::int AS cuentan FROM academia_laboratorio WHERE user_id = $1 AND practica_id = $2`,
          [a.userId, p.id],
        );
        const intento = (c[0]?.todos ?? 0) + 1;
        const cuenta = !modo.prueba && (c[0]?.cuentan ?? 0) < LABORATORIO.intentos;
        const variante = varianteDe(p, intento);
        const estado = nuevoEstado(p, variante);
        const { rows } = await pool.query(
          `INSERT INTO academia_laboratorio (user_id, practica_id, materia_id, intento, variante, cuenta, prueba, datos)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          [a.userId, p.id, m.id, intento, variante, cuenta, modo.prueba, JSON.stringify(estado)],
        );
        return vistaDe(rows[0] as Fila, p);
      });
      res.json(vista);
    } catch (e: any) {
      console.error("laboratorio/empezar:", e?.message);
      res.status(500).json({ message: "No se pudo empezar la práctica. Inténtalo otra vez." });
    }
  });

  app.get("/api/academia/laboratorio/intento/:id", async (req, res) => {
    try {
      const x = await intentoDe(req, res);
      if (!x) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(x.fila, x.p));
    } catch (e: any) {
      console.error("laboratorio/intento:", e?.message);
      res.status(500).json({ message: "No se pudo cargar la práctica." });
    }
  });

  // Responder el paso actual: { paso, k } en una escena, { paso, orden } en una ronda para ordenar.
  app.post("/api/academia/laboratorio/intento/:id/responder", async (req, res) => {
    try {
      const x = await intentoDe(req, res);
      if (!x) return;
      const out = await enFila(x.userId, async (): Promise<{ status: number; body: any }> => {
        const { rows } = await pool.query(`SELECT * FROM academia_laboratorio WHERE id = $1`, [x.fila.id]);
        const fila = rows[0] as Fila;
        if (fila.estado !== "en-curso") return { status: 409, body: { message: "Esta práctica ya terminó.", intento: await vistaDe(fila, x.p) } };
        const s = estadoValido(x.p, fila.datos);
        if (!s) return { status: 409, body: { message: "Esta práctica cambió. Empieza otra vez, por favor." } };
        if (Number(req.body?.paso) !== s.paso + 1) return { status: 409, body: { message: "Esa parte ya se respondió.", intento: await vistaDe(fila, x.p) } };
        const r = responder(x.p, s, { k: req.body?.k, orden: req.body?.orden });
        if ("error" in r) return { status: 400, body: { message: r.error } };
        const fin = terminado(x.p, r.estado);
        const res2 = fin ? resultado(x.p, r.estado) : null;
        const { rows: nuevas } = await pool.query(
          `UPDATE academia_laboratorio SET datos = $2, estado = $3, nota = $4, criticas = $5, terminado_at = CASE WHEN $3 = 'terminado' THEN now() ELSE NULL END
            WHERE id = $1 RETURNING *`,
          [fila.id, JSON.stringify(r.estado satisfies EstadoIntento), fin ? "terminado" : "en-curso", res2?.nota ?? null, res2?.criticas.length ?? 0],
        );
        if (fin && !fila.prueba) await marcarEstudio(x.userId).catch(() => undefined);
        const body: RespuestaPaso = { consecuencia: r.consecuencia, intento: await vistaDe(nuevas[0] as Fila, x.p) };
        return { status: 200, body };
      });
      res.status(out.status).json(out.body);
    } catch (e: any) {
      console.error("laboratorio/responder:", e?.message);
      res.status(500).json({ message: "No se pudo guardar tu respuesta. Inténtalo otra vez." });
    }
  });

  // La conversación de cierre: cómo se sintió y lo que se lleva.
  app.post("/api/academia/laboratorio/intento/:id/cierre", async (req, res) => {
    try {
      const x = await intentoDe(req, res);
      if (!x) return;
      if (x.fila.estado !== "terminado") return res.status(409).json({ message: "Primero termina la práctica." });
      const sentir = typeof req.body?.sentir === "string" && (SENTIRES as readonly string[]).includes(req.body.sentir) ? req.body.sentir : null;
      const llevo = typeof req.body?.llevo === "string" ? req.body.llevo.trim().slice(0, LIMITE_LLEVO) : "";
      const { rows } = await pool.query(`UPDATE academia_laboratorio SET cierre = $2 WHERE id = $1 RETURNING *`, [x.fila.id, JSON.stringify({ sentir, llevo })]);
      res.json(await vistaDe(rows[0] as Fila, x.p));
    } catch (e: any) {
      console.error("laboratorio/cierre:", e?.message);
      res.status(500).json({ message: "No se pudo guardar. Inténtalo otra vez." });
    }
  });
}
