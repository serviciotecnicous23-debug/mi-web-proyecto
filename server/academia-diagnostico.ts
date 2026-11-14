/**
 * La prueba diagnóstica (docs/academia.md, «Equivalencias»): 2 preguntas de cada materia con contenido (del banco de su
 * examen final), 45 segundos cada una. Al terminar sugiere por dónde empezar y qué materias se podrían aprobar por
 * suficiencia (`sugerenciaDiagnostico`, en shared/academia.ts). No da nada por aprobado ni pide la inscripción, y se
 * repite cada 30 días. El resultado no muestra las preguntas con su respuesta: salen de los bancos de los finales.
 */
import type { Express } from "express";
import { pool } from "./db";
import {
  DIAGNOSTICO, NIVELES, sugerenciaDiagnostico, type DiagnosticoMateria, type DiagnosticoVista, type ExamenEstado, type MateriaDef,
} from "@shared/academia";
import { BANCOS, materiaDe } from "./academia/index";
import { accesoDe, frenar } from "./academia-comun";
import { estadoBase, filaDe, rutasDeEvaluacion, type Evaluacion } from "./academia-examen";
import { nivelesCompletos } from "./academia-inscripcion";

export const CLAVE_DIAGNOSTICO = "diagnostico";

/** Las materias con contenido, en el orden del catálogo. */
function materiasDiagnostico(): MateriaDef[] {
  return NIVELES.flatMap((n) => n.materias).filter((m) => m.disponible && BANCOS.has(m.id));
}

const iso = (v: unknown) => new Date(v as string).toISOString();

async function ultimoDe(userId: number): Promise<{ fila: any | null; dias: number }> {
  const { rows } = await pool.query(
    `SELECT resultado, created_at, EXTRACT(EPOCH FROM now() - created_at)::float / 86400 AS dias FROM academia_diagnosticos WHERE user_id = $1`,
    [userId],
  );
  return { fila: rows[0] ?? null, dias: rows[0] ? Number(rows[0].dias) : Infinity };
}

/** Desde cuándo se puede repetir (null si ya se puede). */
function repetirDesde(fila: any | null, dias: number): string | null {
  if (!fila || dias >= DIAGNOSTICO.diasEntre) return null;
  return new Date(Date.now() + (DIAGNOSTICO.diasEntre - dias) * 86_400_000).toISOString();
}

function evaluacionDiagnostico(): Evaluacion {
  const materias = materiasDiagnostico();
  const final = materias.flatMap((m) => BANCOS.get(m.id)!.final);
  const medida = { objetivas: materias.length * DIAGNOSTICO.porMateria, banco: final.length, escritas: 0, pesoObjetiva: 100, segundos: DIAGNOSTICO.segundos, minutosEscrita: 0 };
  return {
    clave: CLAVE_DIAGNOSTICO,
    medida,
    aprueba: 0,
    final,
    escritas: [],
    // repartida por materia: 2 de cada una
    grupo: (p) => materiaDe(p.id) ?? "",
    estado: async (userId): Promise<ExamenEstado> => {
      const f = await filaDe(userId, CLAVE_DIAGNOSTICO);
      const base = estadoBase(f, medida, 0);
      const { fila, dias } = await ultimoDe(userId);
      const desde = repetirDesde(fila, dias);
      const cerrado = desde && !base.enCurso
        ? `Ya hiciste la prueba diagnóstica: la puedes repetir desde el ${new Date(desde).toLocaleDateString("es", { day: "numeric", month: "long", timeZone: "America/Chicago" })}.`
        : null;
      return { ...base, espera: 0, falta: [], aprobado: false, repasar: [], cerrado };
    },
    alEmpezar: async () => undefined,
    alCerrar: async (userId, _nota, partes) => {
      const cuenta = new Map<string, { aciertos: number; de: number }>();
      for (const r of partes.respuestas) {
        const id = materiaDe(r.id);
        if (!id) continue;
        const c = cuenta.get(id) ?? { aciertos: 0, de: 0 };
        c.de++;
        if (r.bien) c.aciertos++;
        cuenta.set(id, c);
      }
      const porMateria: DiagnosticoMateria[] = materias
        .filter((m) => cuenta.has(m.id))
        .map((m) => ({ id: m.id, titulo: m.titulo, nivel: m.nivel, ...cuenta.get(m.id)! }));
      const [completos, { rows: ap }] = await Promise.all([
        nivelesCompletos(userId),
        pool.query(`SELECT materia_id FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada'`, [userId]),
      ]);
      const sugerencia = sugerenciaDiagnostico(porMateria, completos, ap.map((r: any) => String(r.materia_id)));
      const resultado = {
        aciertos: porMateria.reduce((s, x) => s + x.aciertos, 0),
        de: porMateria.reduce((s, x) => s + x.de, 0),
        porMateria,
        sugerencia,
      };
      await pool.query(
        `INSERT INTO academia_diagnosticos (user_id, resultado, created_at) VALUES ($1, $2::jsonb, now())
         ON CONFLICT (user_id) DO UPDATE SET resultado = EXCLUDED.resultado, created_at = now()`,
        [userId, JSON.stringify(resultado)],
      );
      return { aprobada: true, materia: null, examenAprobado: true, sinEspera: true };
    },
    yaAprobado: "",
    revisionCompleta: false,
  };
}

export function registerAcademiaDiagnosticoRoutes(app: Express) {
  rutasDeEvaluacion(app, "/api/academia/diagnostico/prueba", () => evaluacionDiagnostico());

  // Mi última prueba diagnóstica: cómo me fue en cada materia y la sugerencia (con la sugerencia de hoy, por si ya avancé).
  app.get("/api/academia/diagnostico", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.userId) return res.status(401).json({ message: "Entra con tu cuenta." });
      if (!acceso.ver) return res.status(403).json({ message: "La Academia Avivando el Fuego abre muy pronto." });
      if (frenar(`diag:${acceso.userId}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const { fila, dias } = await ultimoDe(acceso.userId);
      if (!fila) return res.json({ ultimo: null, preguntas: materiasDiagnostico().length * DIAGNOSTICO.porMateria });
      const r = fila.resultado as Omit<DiagnosticoVista, "fecha" | "repetirDesde">;
      // la sugerencia se vuelve a calcular con lo que ya aprobó desde entonces
      const [completos, { rows: ap }] = await Promise.all([
        nivelesCompletos(acceso.userId),
        pool.query(`SELECT materia_id FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada'`, [acceso.userId]),
      ]);
      const ultimo: DiagnosticoVista = {
        fecha: iso(fila.created_at),
        aciertos: r.aciertos,
        de: r.de,
        porMateria: r.porMateria,
        sugerencia: sugerenciaDiagnostico(r.porMateria, completos, ap.map((x: any) => String(x.materia_id))),
        repetirDesde: repetirDesde(fila, dias),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json({ ultimo, preguntas: materiasDiagnostico().length * DIAGNOSTICO.porMateria });
    } catch (err) {
      console.error("[academia] diagnóstico:", err);
      res.sendStatus(500);
    }
  });
}
