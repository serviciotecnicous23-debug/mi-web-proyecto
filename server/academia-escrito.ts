/**
 * El escrito breve (docs/academia.md, «El escrito breve»): en las materias del Nivel 2 en adelante, una respuesta de 80
 * a 300 palabras, con ideas y citas, que corrige el sistema con su clave (server/academia-correccion.ts) y puede revisar
 * la Administración. Se entrega después de terminar las lecciones, sin reloj; hay 2 entregas y cuenta la mejor (es el
 * componente «escritos» de la materia). Después de la primera entrega se ve qué ideas encontró el corrector y cuáles
 * faltan; la respuesta modelo, solo después de la última.
 *
 * Cada entrega queda como un intento (`academia_intentos`, con la escrita como toda la nota) y su respuesta en
 * `academia_respuestas`, así la revisión de la Administración y el recálculo en cadena funcionan igual que en los
 * exámenes (contexto «breve» en `contextoExamen`).
 */
import type { Express } from "express";
import { pool } from "./db";
import {
  APRUEBA, ESCRITA, ESCRITO_BREVE, materiaPorId, medallaDe, tieneEscritoBreve, type EscritoBreveVista, type MateriaDef, type ResultadoExamen,
} from "@shared/academia";
import { BANCOS } from "./academia/index";
import { alumnoDe, asegurarMateria, claveBreve, enFila, estaInscrito, frenar, inscritoEnMateriaDe, marcarEstudio, recalcularMateria } from "./academia-comun";
import { corregirEscrita } from "./academia-correccion";
import { filaDe } from "./academia-examen";

const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

/** El escrito breve de una materia para el alumno (null si la materia no lo tiene). */
export async function vistaBreve(userId: number, m: MateriaDef): Promise<EscritoBreveVista | null> {
  const clave = BANCOS.get(m.id)?.breve;
  if (!clave || !tieneEscritoBreve(m)) return null;
  const f = await filaDe(userId, claveBreve(m.id));
  const ids = m.lecciones.map((l) => l.id);
  const { rows: mat } = await pool.query(`SELECT 1 FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [userId, m.id]);
  const { rows: lec } = await pool.query(
    `SELECT count(*)::int AS n FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND completada_at IS NOT NULL`,
    [userId, ids],
  );
  const falta: string[] = [];
  if (!(await estaInscrito(userId))) falta.push("inscribirte en la academia");
  else if (!mat[0]) falta.push("inscribirte en esta materia");
  const pendientes = ids.length - Number(lec[0]?.n ?? 0);
  if (pendientes > 0) falta.push(pendientes === ids.length ? `completar las ${ids.length} lecciones` : `completar ${pendientes === 1 ? "1 lección" : `${pendientes} lecciones`}`);
  const entregas = Number(f.intentos || 0);
  const { min, max } = ESCRITA[clave.tipo];
  return {
    materia: { id: m.id, titulo: m.titulo },
    pregunta: clave.pregunta,
    min,
    max,
    entregas,
    maxEntregas: ESCRITO_BREVE.entregas,
    mejor: f.mejor == null ? null : Number(f.mejor),
    falta,
    cerrado: entregas >= ESCRITO_BREVE.entregas ? `Ya hiciste las ${ESCRITO_BREVE.entregas} entregas: cuenta tu mejor nota.` : null,
    ultimo: (f.resultado as ResultadoExamen | null) ?? null,
  };
}

export function registerAcademiaEscritoRoutes(app: Express) {
  app.get("/api/academia/escrito/:materiaId", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      const v = m && m.disponible ? await vistaBreve(a.userId, m) : null;
      if (!v) return res.status(404).json({ message: "Esta materia no tiene escrito breve." });
      res.setHeader("Cache-Control", "no-store");
      res.json(v);
    } catch (err) {
      console.error("[academia] escrito breve:", err);
      res.sendStatus(500);
    }
  });

  // Entregar el escrito: se corrige al instante y cuenta la mejor de las 2 entregas.
  app.post("/api/academia/escrito/:materiaId", async (req, res) => {
    try {
      const m = materiaPorId(String(req.params.materiaId || ""));
      const clave = m && m.disponible ? BANCOS.get(m.id)?.breve : undefined;
      if (!m || !clave || !tieneEscritoBreve(m)) return res.status(404).json({ message: "Esta materia no tiene escrito breve." });
      const a = await inscritoEnMateriaDe(req, res, m.id);
      if (!a) return;
      const texto = typeof req.body?.texto === "string" ? req.body.texto.trim().slice(0, 6000) : "";
      const { min, max } = ESCRITA[clave.tipo];
      const n = palabras(texto);
      // lo que no llega o se pasa no gasta una entrega
      if (n < min) return res.status(400).json({ message: `Escribe al menos ${min} palabras (llevas ${n}).` });
      if (n > max) return res.status(400).json({ message: `Escribe como máximo ${max} palabras (llevas ${n}).` });
      if (frenar(`breve:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(a.userId, async () => {
        const v = await vistaBreve(a.userId, m);
        if (!v) return { error: 404, message: "Esta materia no tiene escrito breve." };
        if (v.falta.length) return { error: 409, message: `Antes te falta ${v.falta.join(" y ")}.` };
        if (v.cerrado) return { error: 409, message: v.cerrado };
        const r = corregirEscrita(clave, texto, { pegado: req.body?.pegado === true });
        const k = claveBreve(m.id);
        const intento = v.entregas + 1;
        await pool.query(
          `UPDATE academia_pruebas SET intentos = $3, ultima = $4, mejor = GREATEST(COALESCE(mejor, 0), $4), updated_at = now() WHERE user_id = $1 AND clave = $2`,
          [a.userId, k, intento, r.nota],
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
        await asegurarMateria(a.userId, m.id);
        const mat = await recalcularMateria(a.userId, m);
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
          // la respuesta modelo, solo después de la última entrega (si no, la segunda se copiaría)
          escritas: [{ ...correccion, pregunta: clave.pregunta, texto, modelo: intento >= ESCRITO_BREVE.entregas ? clave.modelo : "" }],
          materia: { nota: mat.nota, aprobada: mat.aprobada, medalla: mat.aprobada ? medallaDe(mat.nota) : null },
          espera: 0,
        };
        await pool.query(`UPDATE academia_pruebas SET resultado = $3::jsonb WHERE user_id = $1 AND clave = $2`, [a.userId, k, JSON.stringify(resultado)]);
        await marcarEstudio(a.userId);
        return { ok: true as const };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaBreve(a.userId, m));
    } catch (err) {
      console.error("[academia] escrito breve (entrega):", err);
      res.sendStatus(500);
    }
  });
}
