/**
 * El cierre de cada nivel de la academia (docs/academia.md, «El cierre del nivel»):
 * - el examen integral: preguntas de los bancos de todas sus materias, repartidas por materia, y respuestas escritas de
 *   materias distintas; se da con las materias del nivel aprobadas y se aprueba con 75 (shared/academia.ts);
 * - los versículos de memoria que pide el nivel;
 * - el pacto (en el Nivel 1, «El pacto del creyente»), que se acepta después de aprobar el integral.
 * Con todo eso el nivel queda completo (academia_niveles), con su promedio, y el alumno pasa al nivel siguiente.
 */
import type { Express } from "express";
import { pool } from "./db";
import {
  APRUEBA_INTEGRAL, EXAMEN_INTEGRAL, HONORES, NIVELES, PACTOS, VERSICULOS_NIVEL, promedio,
  type CierreResumen, type ExamenEstado, type NivelDef, type NivelEstado, type RequisitoNivel,
} from "@shared/academia";
import { BANCOS, materiaDe } from "./academia/index";
import { accesoDe, alumnoDe, asegurarAlumno, claveIntegral, enFila, estaMatriculado, frenar, marcarEstudio, MENSAJE_CERRADA } from "./academia-comun";
import { estadoBase, filaDe, rutasDeEvaluacion, type Evaluacion, type Resolver } from "./academia-examen";
import { codigoDocumento, emitirNivel } from "./academia-documentos";

export function nivelDe(n: unknown): NivelDef | undefined {
  const k = Number(n);
  return Number.isInteger(k) ? NIVELES.find((x) => x.n === k) : undefined;
}

const conBanco = (nv: NivelDef) => nv.materias.filter((m) => m.disponible && BANCOS.has(m.id));

/** El integral existe cuando todas las materias del nivel están disponibles, con su banco. */
export function integralDisponible(nv: NivelDef): boolean {
  return nv.materias.length > 0 && conBanco(nv).length === nv.materias.length;
}

async function aprobadasDe(userId: number, nv: NivelDef): Promise<{ id: string; nota: number }[]> {
  const { rows } = await pool.query(
    `SELECT materia_id, nota FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada' AND materia_id = ANY($2::text[])`,
    [userId, nv.materias.map((m) => m.id)],
  );
  return rows.map((r: any) => ({ id: r.materia_id as string, nota: Number(r.nota ?? 0) }));
}

export async function estadoIntegral(userId: number, nv: NivelDef): Promise<ExamenEstado> {
  const f = await filaDe(userId, claveIntegral(nv.n));
  const faltan = nv.materias.length - (await aprobadasDe(userId, nv)).length;
  const falta: string[] = [];
  if (!(await estaMatriculado(userId))) falta.push("matricularte en la academia");
  if (faltan > 0) falta.push(faltan === 1 ? "aprobar la materia que falta del nivel" : `aprobar las ${faltan} materias que faltan del nivel`);
  return { ...estadoBase(f, EXAMEN_INTEGRAL[nv.n], APRUEBA_INTEGRAL), falta, aprobado: !!f.aprobada_at, repasar: [] };
}

/** El examen integral de un nivel como evaluación (el mismo motor que el final de cada materia). */
function evaluacionIntegral(nv: NivelDef): Evaluacion {
  const bancos = conBanco(nv).map((m) => BANCOS.get(m.id)!);
  return {
    clave: claveIntegral(nv.n),
    medida: EXAMEN_INTEGRAL[nv.n],
    aprueba: APRUEBA_INTEGRAL,
    final: bancos.flatMap((b) => b.final),
    escritas: bancos.flatMap((b) => b.escritas),
    grupo: (p) => materiaDe(p.id) ?? "",
    grupoEscrita: (e) => materiaDe(e.id) ?? "",
    estado: (userId) => estadoIntegral(userId, nv),
    alEmpezar: async (userId) => {
      await asegurarAlumno(userId);
      await marcarEstudio(userId);
    },
    // El pacto se acepta después del integral: al aprobarlo todavía no se puede cerrar el nivel.
    alCerrar: async (_userId, nota) => ({ aprobada: nota >= APRUEBA_INTEGRAL, materia: null }),
    yaAprobado: "Ya aprobaste el examen integral de este nivel.",
  };
}

/** El nivel y lo que falta para cerrarlo. */
export async function estadoNivel(userId: number | null, nv: NivelDef, vistaPrevia: boolean): Promise<NivelEstado> {
  const { materias: ms, ...nivel } = nv;
  const pide = VERSICULOS_NIVEL[nv.n];
  const pactoDef = PACTOS[nv.n] ?? null;
  let aprobadas: { id: string; nota: number }[] = [];
  let aprendidos = 0;
  let integral: ExamenEstado | null = null;
  let pactoAt: string | null = null;
  let completado: string | null = null;
  let guardado: number | null = null;
  if (userId) {
    aprobadas = await aprobadasDe(userId, nv);
    const { rows: v } = await pool.query(
      `SELECT count(*)::int AS n FROM academia_versiculos WHERE user_id = $1 AND aprendido_at IS NOT NULL AND materia_id = ANY($2::text[])`,
      [userId, ms.map((m) => m.id)],
    );
    aprendidos = Number(v[0]?.n || 0);
    if (integralDisponible(nv)) integral = await estadoIntegral(userId, nv);
    const { rows: nl } = await pool.query(`SELECT pacto_at, completado_at, promedio FROM academia_niveles WHERE user_id = $1 AND nivel = $2`, [userId, nv.n]);
    pactoAt = nl[0]?.pacto_at ? new Date(nl[0].pacto_at).toISOString() : null;
    completado = nl[0]?.completado_at ? new Date(nl[0].completado_at).toISOString() : null;
    guardado = nl[0]?.promedio == null ? null : Number(nl[0].promedio);
  }
  const prom = aprobadas.length ? promedio(aprobadas.map((a) => a.nota)) : null;
  const requisitos: RequisitoNivel[] = [
    { id: "materias", texto: `Las ${ms.length} materias aprobadas`, hecho: ms.length > 0 && aprobadas.length === ms.length, detalle: `${aprobadas.length} de ${ms.length}` },
    {
      id: "integral",
      texto: "El examen integral del nivel",
      hecho: !!integral?.aprobado,
      detalle: !integral ? "Cuando todas las materias estén disponibles" : integral.aprobado ? `Aprobado con ${integral.mejor}` : integral.mejor != null ? `Mejor nota: ${integral.mejor}` : "Pendiente",
    },
  ];
  if (pide) requisitos.push({ id: "versiculos", texto: `${pide} versículos de memoria`, hecho: aprendidos >= pide, detalle: `${Math.min(aprendidos, pide)} de ${pide}` });
  if (pactoDef) requisitos.push({ id: "pacto", texto: pactoDef.titulo, hecho: !!pactoAt, detalle: pactoAt ? "Aceptado" : "Pendiente" });
  const p = guardado ?? prom;
  return {
    nivel,
    materias: { total: ms.length, disponibles: conBanco(nv).length, aprobadas: aprobadas.length, promedio: prom },
    versiculos: { pide, aprendidos },
    integral,
    pacto: pactoDef ? { ...pactoDef, aceptado: pactoAt } : null,
    requisitos,
    completado,
    promedio: p,
    honores: !!completado && p != null && p >= HONORES,
    certificado: userId && completado ? (await codigoDocumento(userId, "nivel", String(nv.n))) ?? (await emitirNivel(userId, nv, p)) : null,
    vistaPrevia,
    conSesion: !!userId,
  };
}

/** Si ya cumple todo, cierra el nivel: guarda la fecha y el promedio, y lo pasa al nivel siguiente. */
export async function revisarNivel(userId: number, nv: NivelDef): Promise<boolean> {
  const e = await estadoNivel(userId, nv, false);
  if (e.completado) return true;
  if (!e.requisitos.every((r) => r.hecho)) return false;
  await pool.query(
    `INSERT INTO academia_niveles (user_id, nivel, completado_at, promedio) VALUES ($1, $2, now(), $3)
     ON CONFLICT (user_id, nivel) DO UPDATE SET completado_at = COALESCE(academia_niveles.completado_at, now()), promedio = EXCLUDED.promedio`,
    [userId, nv.n, e.materias.promedio],
  );
  await pool.query(`UPDATE academia_alumnos SET nivel = GREATEST(nivel, $2) WHERE user_id = $1`, [userId, Math.min(5, nv.n + 1)]);
  // el nivel completo recibe su certificado al instante
  await emitirNivel(userId, nv, e.materias.promedio);
  return true;
}

/** El cierre de cada nivel para la portada (solo los niveles con integral). */
export async function cierresDe(userId: number): Promise<Map<number, CierreResumen>> {
  const niveles = NIVELES.filter(integralDisponible);
  const out = new Map<number, CierreResumen>();
  if (!niveles.length) return out;
  const [{ rows: pr }, { rows: nl }] = await Promise.all([
    pool.query(`SELECT clave FROM academia_pruebas WHERE user_id = $1 AND aprobada_at IS NOT NULL AND clave = ANY($2::text[])`, [userId, niveles.map((n) => claveIntegral(n.n))]),
    pool.query(`SELECT nivel, pacto_at, completado_at FROM academia_niveles WHERE user_id = $1`, [userId]),
  ]);
  const aprobados = new Set(pr.map((r: any) => r.clave));
  for (const n of niveles) {
    const fila = nl.find((r: any) => Number(r.nivel) === n.n);
    out.set(n.n, {
      integralAprobado: aprobados.has(claveIntegral(n.n)),
      pacto: !!fila?.pacto_at,
      completado: fila?.completado_at ? new Date(fila.completado_at).toISOString() : null,
    });
  }
  return out;
}

const resolverIntegral: Resolver = (req, res) => {
  const nv = nivelDe(req.params.nivel);
  if (!nv || !integralDisponible(nv)) {
    res.status(404).json({ message: "El examen integral de este nivel todavía no está disponible." });
    return null;
  }
  return evaluacionIntegral(nv);
};

export function registerAcademiaNivelRoutes(app: Express) {
  // El nivel y lo que falta para cerrarlo (los visitantes ven los requisitos, sin avance).
  app.get("/api/academia/nivel/:n", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const nv = nivelDe(req.params.n);
      if (!nv) return res.status(404).json({ message: "No existe ese nivel." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await estadoNivel(acceso.userId, nv, acceso.vistaPrevia));
    } catch (err) {
      console.error("[academia] nivel:", err);
      res.sendStatus(500);
    }
  });

  // Aceptar el pacto del nivel: al final, con el integral aprobado. Si ya cumple todo, el nivel queda completo.
  app.post("/api/academia/nivel/:n/pacto", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const nv = nivelDe(req.params.n);
      if (!nv || !PACTOS[nv.n]) return res.status(404).json({ message: "Este nivel no tiene pacto." });
      if (req.body?.acepto !== true) return res.status(400).json({ message: "Para aceptarlo, marca que estás de acuerdo con el pacto." });
      if (frenar(`ap:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async (): Promise<NivelEstado | { error: number; message: string }> => {
        const integral = integralDisponible(nv) ? await estadoIntegral(a.userId, nv) : null;
        if (!integral?.aprobado) return { error: 409, message: "El pacto se acepta al final del nivel, después de aprobar el examen integral." };
        await pool.query(
          `INSERT INTO academia_niveles (user_id, nivel, pacto_at) VALUES ($1, $2, now())
           ON CONFLICT (user_id, nivel) DO UPDATE SET pacto_at = COALESCE(academia_niveles.pacto_at, now())`,
          [a.userId, nv.n],
        );
        await revisarNivel(a.userId, nv);
        return estadoNivel(a.userId, nv, a.acceso.vistaPrevia);
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] pacto:", err);
      res.sendStatus(500);
    }
  });

  // El examen integral: el mismo motor y las mismas rutas que el final de una materia.
  rutasDeEvaluacion(app, "/api/academia/integral/:nivel", resolverIntegral);
}
