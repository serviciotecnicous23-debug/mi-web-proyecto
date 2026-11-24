/**
 * La gestión del expediente de cada alumno por la Administración de la academia (docs/academia.md, «La gestión del
 * expediente»). Lo pidió Luis el 16-nov: «si tengo un problema de notas, ¿cómo lo modifico?». Cada acción pide un motivo,
 * queda en el historial (audit_log, entity_type «academia») y le llega al alumno en la campana:
 * - ajustar la nota de una parte de una materia (examen final, repasos, versículo, mini pruebas o escritos) o quitar el
 *   ajuste: el cálculo de la nota lo respeta (componentesDe, academia-comun.ts) y todo se recalcula en cadena, como en la
 *   revisión de una escrita (la materia con su certificado, el nivel y la especialidad);
 * - aprobar una materia por convalidación, o quitarla;
 * - los exámenes: quitar la espera, reiniciar los fallos, dar un intento más (en las pruebas con tope) o anular el intento
 *   en curso (no cuenta);
 * - marcar una lección como completada o volver a abrirla;
 * - inscribirlo en una materia o darlo de baja;
 * - retirarlo o reactivarlo, y darle tiempo extra (×1,5) en los exámenes;
 * - escribirle un mensaje;
 * - el historial de todo lo que se hizo con su expediente.
 * Solo la Administración (capacidad «gestionar», shared/academia-permisos.ts), y nunca sobre lo suyo.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { pesosDeAlumno } from "./academia-practicas-nota";
import {
  APRUEBA, ESCRITO_BREVE, ESPECIALIDADES, FALLOS_PARA_REPASAR, MINI_PRUEBA, NIVELES, NOMBRE_COMPONENTE, SUFICIENCIA, esperaFinalMin, materiaPorId,
  miniPruebasDe, pesosDe, tieneEscritoBreve, type MateriaDef, type Pesos,
} from "@shared/academia";
import type { ComponenteGestion, GestionMateria, HistorialItem, PruebaGestion, ResultadoGestion } from "@shared/academia-direccion";
import { BANCOS } from "./academia/index";
import {
  COMPONENTES_AJUSTABLES, asegurarMateria, avisarA, claveBreve, claveFinal, claveMini, componentesCalculados, enFila, estadoDe, frenar, viaFija,
} from "./academia-comun";
import { cierresDe, permisoDe } from "./academia-direccion";
import { emitirMateria } from "./academia-documentos";
import { MENSAJE_PROPIO, reconsiderarEspecialidad, reconsiderarMateria, reconsiderarNivel, registrar, revocarPorNota } from "./academia-revision";
import { claveSuficiencia, topeSuficiencia } from "./academia-suficiencia";

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
/** Un mensaje conserva sus renglones (sin espacios de más ni muchos renglones vacíos seguidos). */
const limpioConRenglones = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, max) : "";
const MOTIVO_CORTO = "Escribe el motivo (al menos 8 letras): queda en el historial y lo ve el alumno.";
/** Los intentos de más que se pueden dar en una misma prueba (para que un error no deje intentos sin fin). */
export const EXTRA_MAX = 5;

const grupoDe = (m: MateriaDef) => (m.nivel ? `Nivel ${m.nivel}` : ESPECIALIDADES.find((e) => e.id === m.especialidad)?.nombre ?? "Especialidad");
const nivelDe = (m: MateriaDef) => (m.nivel ? NIVELES[m.nivel - 1] ?? null : null);
const especialidadDe = (m: MateriaDef) => ESPECIALIDADES.find((e) => e.id === m.especialidad) ?? null;
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

type Contexto = { alumno: number; motivo: string; m: MateriaDef | null; porId: number };

/**
 * Lo común de cada ruta: la Administración, un alumno matriculado que no sea ella misma, el motivo (salvo que la ruta no
 * lo pida) y, si la ruta la lleva, una materia abierta. Si algo falta, responde el error y devuelve null.
 */
async function contextoDe(req: Request, res: Response, opciones: { motivo?: boolean; materia?: boolean } = {}): Promise<Contexto | null> {
  const p = await permisoDe(req, res, "gestionar");
  if (!p) return null;
  const alumno = Number(req.params.alumnoId);
  if (!Number.isInteger(alumno) || alumno <= 0) {
    res.status(404).json({ message: "No existe ese alumno." });
    return null;
  }
  if (alumno === p.userId) {
    res.status(403).json({ message: MENSAJE_PROPIO });
    return null;
  }
  const { rows } = await pool.query(`SELECT 1 FROM academia_alumnos WHERE user_id = $1 AND matricula IS NOT NULL`, [alumno]);
  if (!rows[0]) {
    res.status(404).json({ message: "Ese alumno no está matriculado en la academia." });
    return null;
  }
  let m: MateriaDef | null = null;
  if (opciones.materia) {
    m = materiaPorId(String(req.params.materiaId || "")) ?? null;
    if (!m || !m.disponible) {
      res.status(404).json({ message: "No existe esa materia, o todavía está en preparación." });
      return null;
    }
  }
  const motivo = limpio(req.body?.motivo, 500);
  if (opciones.motivo !== false && motivo.length < 8) {
    res.status(400).json({ message: MOTIVO_CORTO });
    return null;
  }
  return { alumno, motivo, m, porId: p.userId };
}

/** Lo que la Administración ve de una materia del alumno para gestionarla. */
export async function gestionDe(alumno: number, m: MateriaDef): Promise<GestionMateria> {
  const pesos = await pesosDeAlumno(alumno, m);
  const { rows: mt } = await pool.query(`SELECT estado, nota, via, inicio_at FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [alumno, m.id]);
  const fila = mt[0] as { estado: string; nota: number | null; via: string; inicio_at: string } | undefined;
  const calculados = await componentesCalculados(alumno, m);
  const { rows: aj } = await pool.query(
    `SELECT a.componente, a.nota, a.motivo, a.created_at, u.display_name, u.username
       FROM academia_ajustes a LEFT JOIN users u ON u.id = a.por
      WHERE a.user_id = $1 AND a.materia_id = $2`,
    [alumno, m.id],
  );
  const componentes: ComponenteGestion[] = (Object.keys(pesos) as (keyof Pesos)[])
    .filter((k) => pesos[k] > 0)
    .map((k) => {
      const a = (aj as any[]).find((x) => x.componente === k);
      return {
        id: k,
        texto: NOMBRE_COMPONENTE[k],
        peso: pesos[k],
        calculado: Number(calculados[k] ?? 0),
        ajuste: a ? { nota: Number(a.nota), motivo: String(a.motivo), por: String(a.display_name || a.username || "La Administración"), fecha: iso(a.created_at)! } : null,
      };
    });
  const ids = m.lecciones.map((l) => l.id);
  const { rows: lc } = await pool.query(
    `SELECT leccion_id FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[]) AND completada_at IS NOT NULL`,
    [alumno, ids],
  );
  const hechas = new Set((lc as any[]).map((r) => String(r.leccion_id)));
  const banco = BANCOS.get(m.id);
  const defs: { clave: string; titulo: string; tipo: PruebaGestion["tipo"]; tope: number | null }[] = [
    { clave: claveFinal(m.id), titulo: "Examen final", tipo: "final", tope: null },
    ...miniPruebasDe(m)
      .filter((g) => banco?.mini?.[g.n])
      .map((g) => ({
        clave: claveMini(m.id, g.n),
        titulo: `Mini prueba ${g.n} (lecciones ${g.lecciones[0]} a ${g.lecciones[g.lecciones.length - 1]})`,
        tipo: "mini" as const,
        tope: MINI_PRUEBA.intentos as number,
      })),
    ...(tieneEscritoBreve(m) && banco?.breve ? [{ clave: claveBreve(m.id), titulo: "Escrito breve", tipo: "breve" as const, tope: ESCRITO_BREVE.entregas as number }] : []),
    { clave: claveSuficiencia(m.id), titulo: "Examen de suficiencia", tipo: "suficiencia", tope: SUFICIENCIA.intentos },
  ];
  const { rows: pr } = await pool.query(
    `SELECT clave, intentos, fallos, mejor, extra, curso IS NOT NULL AS en_curso, fallo_at IS NOT NULL AS con_fallo,
            EXTRACT(EPOCH FROM now() - fallo_at)::float AS pasados_fallo
       FROM academia_pruebas WHERE user_id = $1 AND clave = ANY($2::text[])`,
    [alumno, defs.map((d) => d.clave)],
  );
  const porClave = new Map((pr as any[]).map((r) => [String(r.clave), r]));
  const pruebas: PruebaGestion[] = defs
    .map((d) => {
      const f = porClave.get(d.clave);
      const fallos = Number(f?.fallos ?? 0);
      const final = d.tipo === "final";
      return {
        clave: d.clave,
        titulo: d.titulo,
        tipo: d.tipo,
        intentos: Number(f?.intentos ?? 0),
        tope: d.tope,
        extra: Number(f?.extra ?? 0),
        fallos,
        mejor: f?.mejor == null ? null : Number(f.mejor),
        espera: final && fallos && f?.con_fallo ? Math.max(0, Math.ceil(esperaFinalMin(fallos) * 60 - Number(f.pasados_fallo ?? 1e9))) : 0,
        pideRepaso: final && fallos >= FALLOS_PARA_REPASAR && !!f?.con_fallo,
        enCurso: !!f?.en_curso,
      };
    })
    // la suficiencia solo si la dio o la tiene en curso: es una oportunidad aparte de cursarla
    .filter((x) => x.tipo !== "suficiencia" || x.intentos > 0 || x.enCurso);
  const { rows: v } = await pool.query(`SELECT aprendido_at, puntaje FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [alumno, m.id]);
  const { rows: c } = await pool.query(`SELECT codigo, revocado_at FROM academia_certificados WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`, [alumno, m.id]);
  const tope = topeSuficiencia(m);
  let topeConvalidacion: GestionMateria["topeConvalidacion"] = null;
  if (tope != null) {
    const delNivel = nivelDe(m)?.materias.map((x) => x.id) ?? [];
    const { rows: t } = await pool.query(
      `SELECT count(*)::int AS n FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada' AND via IN ('suficiencia', 'convalidada') AND materia_id = ANY($2::text[])`,
      [alumno, delNivel],
    );
    topeConvalidacion = { usadas: Number(t[0]?.n ?? 0), tope };
  }
  return {
    materia: { id: m.id, titulo: m.titulo, nivel: m.nivel, grupo: grupoDe(m) },
    inscrita: iso(fila?.inicio_at),
    estado: estadoDe(m, fila, ids.filter((id) => hechas.has(id)).length),
    via: fila?.estado === "aprobada" ? ((fila.via as GestionMateria["via"]) ?? "cursada") : null,
    nota: fila?.nota == null ? null : Number(fila.nota),
    componentes,
    lecciones: m.lecciones.map((l, i) => ({ id: l.id, n: i + 1, titulo: l.titulo, completada: hechas.has(l.id) })),
    pruebas,
    versiculo: m.memoria ? { ref: m.memoria, aprendido: !!v[0]?.aprendido_at, puntaje: v[0]?.puntaje == null ? null : Number(v[0].puntaje) } : null,
    certificado: c[0] ? { codigo: String(c[0].codigo), revocado: !!c[0].revocado_at } : null,
    topeConvalidacion,
  };
}

/** El nivel y la especialidad de la materia, revisados otra vez (pueden completarse o reabrirse). */
async function nivelYEspecialidad(alumno: number, m: MateriaDef, motivo: string): Promise<string[]> {
  const partes: string[] = [];
  const nv = nivelDe(m);
  if (nv) {
    const x = await reconsiderarNivel(alumno, nv, motivo);
    if (x === "completo") partes.push(`El Nivel ${nv.n} quedó completo.`);
    if (x === "reabierto") partes.push(`El Nivel ${nv.n} ya no está completo y su certificado quedó revocado.`);
  }
  const esp = especialidadDe(m);
  if (esp) {
    const x = await reconsiderarEspecialidad(alumno, esp, motivo);
    if (x === "completa") partes.push("La especialidad quedó completa.");
    if (x === "reabierta") partes.push("La especialidad ya no está completa y su certificado quedó revocado.");
  }
  return partes;
}

/** Después de cambiar algo que pesa en la nota: la materia (que puede aprobarse o volver a estar en curso), su nivel y su especialidad. */
async function enCadena(alumno: number, m: MateriaDef, motivo: string): Promise<string[]> {
  const r = await reconsiderarMateria(alumno, m, motivo);
  const partes = [
    r.cambio === "aprobada"
      ? `La materia quedó aprobada con ${r.nota} y se emitió su certificado.`
      : r.cambio === "desaprobada"
        ? `La materia volvió a estar en curso (nota ${r.nota}) y su certificado quedó revocado.`
        : `La nota de la materia es ${r.nota}${r.aprobada ? " (aprobada)" : ""}.`,
  ];
  return [...partes, ...(await nivelYEspecialidad(alumno, m, motivo))];
}

type Hecho = { texto: string; aviso: string; titulo?: string; recalculo?: string[]; enlace?: string };
type Fallo = { error: string; status?: number };

/** Responde una acción: la deja en el historial, le avisa al alumno y devuelve la materia como quedó. */
async function cerrarAccion(req: Request, res: Response, c: Contexto, accion: string, out: Hecho | Fallo, conMateria = true): Promise<void> {
  if ("error" in out) {
    res.status(out.status ?? 409).json({ message: out.error });
    return;
  }
  const extra = out.recalculo?.length ? ` ${out.recalculo.join(" ")}` : "";
  await registrar(req, accion, c.alumno, `${out.texto}${extra}`, c.motivo || null);
  void avisarA([c.alumno], out.titulo ?? "La Administración de la academia actualizó tu expediente", `${out.aviso}${c.motivo ? ` Motivo: ${c.motivo}` : ""}`, out.enlace ?? (c.m ? `/academia/materia/${c.m.id}` : "/academia/expediente")).catch(
    (err) => console.error("[academia] aviso de gestión:", err),
  );
  const r: ResultadoGestion = { mensaje: `${out.texto}${extra}`, ...(conMateria && c.m ? { materia: await gestionDe(c.alumno, c.m) } : {}) };
  res.setHeader("Cache-Control", "no-store");
  res.json(r);
}

const errorInterno = (res: Response, que: string) => (err: unknown) => {
  console.error(`[academia] gestión, ${que}:`, err);
  if (!res.headersSent) res.sendStatus(500);
};

export function registerAcademiaGestionRoutes(app: Express) {
  const base = "/api/academia/direccion/alumno/:alumnoId";

  // Una materia del alumno, para gestionarla: su nota por partes, sus lecciones, sus exámenes y su certificado.
  app.get(`${base}/materia/:materiaId`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { motivo: false, materia: true });
      if (!c) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await gestionDe(c.alumno, c.m!));
    })().catch(errorInterno(res, "materia"));
  });

  // Ajustar la nota de una parte de la materia (o quitar el ajuste con nota null). Recalcula en cadena.
  app.post(`${base}/materia/:materiaId/ajuste`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { materia: true });
      if (!c) return;
      const m = c.m!;
      const componente = String(req.body?.componente || "") as keyof Pesos;
      if (!(COMPONENTES_AJUSTABLES as readonly string[]).includes(componente) || !(await pesosDeAlumno(c.alumno, m))[componente]) {
        return void res.status(400).json({ message: "Esa parte no pesa en la nota de esta materia." });
      }
      const quitar = req.body?.nota === null;
      const nota = Math.round(Number(req.body?.nota));
      if (!quitar && (req.body?.nota === "" || req.body?.nota === undefined || !Number.isFinite(nota) || nota < 0 || nota > 100)) {
        return void res.status(400).json({ message: "La nota va de 0 a 100." });
      }
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const parte = NOMBRE_COMPONENTE[componente];
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const { rows: mt } = await pool.query(`SELECT estado, via FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [c.alumno, m.id]);
        if (mt[0]?.estado === "aprobada" && viaFija(mt[0].via)) {
          return {
            error:
              mt[0].via === "convalidada"
                ? "La materia está aprobada por convalidación: su nota es la de la convalidación (se cambia en «Convalidación»)."
                : "La materia está aprobada por suficiencia: su nota es la del examen de suficiencia (se cambia revisando sus respuestas escritas).",
          };
        }
        const calculado = Number((await componentesCalculados(c.alumno, m))[componente] ?? 0);
        const { rows: ya } = await pool.query(`SELECT nota FROM academia_ajustes WHERE user_id = $1 AND materia_id = $2 AND componente = $3`, [c.alumno, m.id, componente]);
        const antes = ya[0] ? Number(ya[0].nota) : calculado;
        if (quitar) {
          if (!ya[0]) return { error: "Esa parte no tenía un ajuste." };
          await pool.query(`DELETE FROM academia_ajustes WHERE user_id = $1 AND materia_id = $2 AND componente = $3`, [c.alumno, m.id, componente]);
        } else {
          if (ya[0] && antes === nota) return { error: `«${parte}» ya está ajustada en ${nota}.` };
          await pool.query(
            `INSERT INTO academia_ajustes (user_id, materia_id, componente, nota, antes, motivo, por) VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (user_id, materia_id, componente) DO UPDATE
               SET nota = EXCLUDED.nota, antes = EXCLUDED.antes, motivo = EXCLUDED.motivo, por = EXCLUDED.por, created_at = now()`,
            [c.alumno, m.id, componente, nota, calculado, c.motivo, c.porId],
          );
        }
        await asegurarMateria(c.alumno, m.id);
        const recalculo = await enCadena(c.alumno, m, c.motivo);
        const despues = quitar ? calculado : nota;
        return quitar
          ? {
              texto: `Quitó el ajuste de «${parte}» en «${m.titulo}»: vuelve a valer lo que calcula el sistema (${despues}).`,
              aviso: `En «${m.titulo}», ${minuscula(parte)} vuelve a valer lo que calcula el sistema: ${despues}.`,
              titulo: "La Administración ajustó una de tus notas",
              recalculo,
            }
          : {
              texto: `Ajustó «${parte}» en «${m.titulo}» de ${antes} a ${despues}.`,
              aviso: `En «${m.titulo}», ${minuscula(parte)} quedó en ${despues}.`,
              titulo: "La Administración ajustó una de tus notas",
              recalculo,
            };
      });
      await cerrarAccion(req, res, c, quitar ? "academia.ajuste-quitado" : "academia.ajuste", out);
    })().catch(errorInterno(res, "ajuste"));
  });

  // Aprobar por convalidación (con su nota, de 70 a 100) o quitar la convalidación (nota null).
  app.post(`${base}/materia/:materiaId/convalidacion`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { materia: true });
      if (!c) return;
      const m = c.m!;
      const quitar = req.body?.nota === null;
      const nota = Math.round(Number(req.body?.nota));
      if (!quitar && (req.body?.nota === "" || req.body?.nota === undefined || !Number.isFinite(nota) || nota < APRUEBA || nota > 100)) {
        return void res.status(400).json({ message: `La nota de una convalidación va de ${APRUEBA} a 100: es una materia aprobada.` });
      }
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const { rows: mt } = await pool.query(`SELECT estado, via, nota FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [c.alumno, m.id]);
        const f = mt[0] as { estado: string; via: string; nota: number | null } | undefined;
        if (quitar) {
          if (!(f?.estado === "aprobada" && f.via === "convalidada")) return { error: "Esa materia no está aprobada por convalidación." };
          await pool.query(
            `UPDATE academia_materias SET estado = 'en-curso', via = 'cursada', nota = NULL, componentes = '{}'::jsonb, aprobada_at = NULL WHERE user_id = $1 AND materia_id = $2`,
            [c.alumno, m.id],
          );
          await revocarPorNota(c.alumno, "materia", m.id, c.motivo);
          // si vuelve a valer (abajo, porque ya cumplía cursándola), su certificado dice «cursada», no «convalidada»
          await pool.query(`UPDATE academia_certificados SET via = 'cursada' WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`, [c.alumno, m.id]);
          // vuelve a contar lo que hizo cursándola (si ya cumplía, queda aprobada así)
          const recalculo = await enCadena(c.alumno, m, c.motivo);
          return {
            texto: `Quitó la convalidación de «${m.titulo}» (era ${f.nota ?? "—"}).`,
            aviso: `La Administración quitó la convalidación de «${m.titulo}»: la materia se cursa.`,
            titulo: "Quitaron la convalidación de una materia",
            recalculo,
          };
        }
        if (f?.estado === "aprobada" && f.via === "cursada") return { error: "Ya la aprobó cursándola: no hace falta convalidarla." };
        if (f?.estado === "aprobada" && f.via === "suficiencia") return { error: "Ya la aprobó por suficiencia." };
        if (f?.estado === "aprobada" && f.via === "convalidada" && Number(f.nota) === nota) return { error: `Ya está convalidada con ${nota}.` };
        await asegurarMateria(c.alumno, m.id);
        await pool.query(
          `UPDATE academia_materias SET estado = 'aprobada', via = 'convalidada', nota = $3, componentes = '{}'::jsonb, aprobada_at = COALESCE(aprobada_at, now())
            WHERE user_id = $1 AND materia_id = $2`,
          [c.alumno, m.id, nota],
        );
        const { rows: doc } = await pool.query(`SELECT 1 FROM academia_certificados WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`, [c.alumno, m.id]);
        if (doc.length) {
          await pool.query(
            `UPDATE academia_certificados SET nota = $3, via = 'convalidada', revocado_at = NULL, motivo = NULL WHERE user_id = $1 AND tipo = 'materia' AND ref = $2`,
            [c.alumno, m.id, nota],
          );
        } else {
          await emitirMateria(c.alumno, m, nota, "convalidada");
        }
        const recalculo = await nivelYEspecialidad(c.alumno, m, c.motivo);
        const tope = topeSuficiencia(m);
        if (tope != null) {
          const delNivel = nivelDe(m)?.materias.map((x) => x.id) ?? [];
          const { rows: t } = await pool.query(
            `SELECT count(*)::int AS n FROM academia_materias WHERE user_id = $1 AND estado = 'aprobada' AND via IN ('suficiencia', 'convalidada') AND materia_id = ANY($2::text[])`,
            [c.alumno, delNivel],
          );
          const n = Number(t[0]?.n ?? 0);
          if (n > tope) recalculo.push(`Ojo: lleva ${n} materias del Nivel ${m.nivel} por suficiencia o convalidación, y el reglamento pide como máximo ${tope}.`);
        }
        const cambio = f?.via === "convalidada" && f.estado === "aprobada";
        return {
          texto: cambio ? `Cambió la nota de la convalidación de «${m.titulo}» de ${f?.nota ?? "—"} a ${nota}.` : `Aprobó «${m.titulo}» por convalidación con ${nota}, con su certificado.`,
          aviso: cambio ? `La nota de la convalidación de «${m.titulo}» quedó en ${nota}.` : `La Administración aprobó «${m.titulo}» por convalidación con ${nota}: tu certificado ya está en tu expediente.`,
          titulo: "Convalidaron una de tus materias",
          recalculo,
        };
      });
      await cerrarAccion(req, res, c, quitar ? "academia.convalidacion-quitada" : "academia.convalidacion", out);
    })().catch(errorInterno(res, "convalidación"));
  });

  // Los exámenes: quitar la espera, reiniciar los fallos, dar un intento más o anular el intento en curso.
  app.post(`${base}/materia/:materiaId/prueba`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { materia: true });
      if (!c) return;
      const m = c.m!;
      const clave = String(req.body?.clave || "");
      const accion = String(req.body?.accion || "");
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const prueba = (await gestionDe(c.alumno, m)).pruebas.find((x) => x.clave === clave);
        if (!prueba) return { error: "Esa prueba no es de esta materia.", status: 404 };
        const nombre = minuscula(prueba.titulo);
        switch (accion) {
          case "quitar-espera": {
            if (prueba.tipo !== "final") return { error: "Solo el examen final tiene espera." };
            const r = await pool.query(`UPDATE academia_pruebas SET fallo_at = NULL WHERE user_id = $1 AND clave = $2 AND fallo_at IS NOT NULL`, [c.alumno, clave]);
            if (!r.rowCount) return { error: "Ese examen no tiene espera ni repaso pendiente." };
            return {
              texto: `Quitó la espera${prueba.pideRepaso ? " y el repaso obligatorio" : ""} del examen final de «${m.titulo}».`,
              aviso: `Ya puedes volver a dar el examen final de «${m.titulo}» sin esperar.`,
            };
          }
          case "reiniciar-fallos": {
            if (prueba.tipo !== "final") return { error: "Solo el examen final cuenta los fallos para las esperas." };
            const r = await pool.query(`UPDATE academia_pruebas SET fallos = 0, fallo_at = NULL WHERE user_id = $1 AND clave = $2 AND fallos > 0`, [c.alumno, clave]);
            if (!r.rowCount) return { error: "Ese examen no tiene fallos." };
            return {
              texto: `Reinició los fallos del examen final de «${m.titulo}» (eran ${prueba.fallos}): las esperas empiezan otra vez desde cero.`,
              aviso: `Ya puedes volver a dar el examen final de «${m.titulo}»: las esperas empiezan otra vez desde cero.`,
            };
          }
          case "intento-extra": {
            if (prueba.tope == null) return { error: "El examen final no tiene tope de intentos: para dejarlo intentar ya, quita la espera." };
            if (prueba.extra >= EXTRA_MAX) return { error: `Ya tiene ${EXTRA_MAX} intentos de más en esta prueba.` };
            await pool.query(`INSERT INTO academia_pruebas (user_id, clave) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [c.alumno, clave]);
            await pool.query(`UPDATE academia_pruebas SET extra = extra + 1, updated_at = now() WHERE user_id = $1 AND clave = $2`, [c.alumno, clave]);
            const que = prueba.tipo === "breve" ? "una entrega más del escrito breve" : `un intento más en el ${nombre}`.replace("en el mini", "en la mini");
            return { texto: `Le dio ${que} de «${m.titulo}».`, aviso: `Tienes ${que} de «${m.titulo}».` };
          }
          case "anular-en-curso": {
            if (!prueba.enCurso) return { error: "No tiene un intento en curso en esa prueba." };
            const { rows } = await pool.query(`SELECT intentos FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [c.alumno, clave]);
            const intento = Number(rows[0]?.intentos ?? 0);
            // lo que escribió en ese intento tampoco cuenta (ni queda para revisar)
            await pool.query(`DELETE FROM academia_respuestas WHERE user_id = $1 AND clave = $2 AND intento = $3`, [c.alumno, clave, intento]);
            await pool.query(
              `UPDATE academia_pruebas SET curso = NULL, curso_at = NULL, intentos = GREATEST(intentos - 1, 0), updated_at = now() WHERE user_id = $1 AND clave = $2`,
              [c.alumno, clave],
            );
            return {
              texto: `Anuló el intento ${intento} en curso (${nombre}) de «${m.titulo}»: no cuenta.`,
              aviso: `Se anuló tu intento en curso (${nombre}) de «${m.titulo}»: no cuenta y puedes empezarlo otra vez.`,
            };
          }
          default:
            return { error: "Elige qué hacer con esa prueba.", status: 400 };
        }
      });
      await cerrarAccion(req, res, c, `academia.prueba-${accion}`, out);
    })().catch(errorInterno(res, "prueba"));
  });

  // Los cierres: el examen integral de un nivel (quitar la espera, reiniciar los fallos o anular el intento en curso) y el
  // trabajo final de una especialidad (una entrega más). Solo los que ya empezó (cierresDe en server/academia-direccion.ts).
  app.post(`${base}/prueba`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res);
      if (!c) return;
      const clave = String(req.body?.clave || "");
      const accion = String(req.body?.accion || "");
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const prueba = (await cierresDe(c.alumno)).find((x) => x.clave === clave);
        if (!prueba) return { error: "Esa prueba no es suya, o todavía no la empezó.", status: 404 };
        const nombre = minuscula(prueba.titulo);
        const ref = clave.split(":")[0];
        const enlace = prueba.tipo === "integral" ? `/academia/nivel/${ref.replace("nivel-", "")}` : `/academia/especialidad/${ref.replace("especialidad-", "")}`;
        switch (accion) {
          case "quitar-espera": {
            if (prueba.tipo !== "integral") return { error: "Solo el examen integral tiene espera." };
            const r = await pool.query(`UPDATE academia_pruebas SET fallo_at = NULL WHERE user_id = $1 AND clave = $2 AND fallo_at IS NOT NULL`, [c.alumno, clave]);
            if (!r.rowCount) return { error: "Ese examen no tiene espera." };
            return { texto: `Quitó la espera del ${nombre}.`, aviso: `Ya puedes volver a dar el ${nombre} sin esperar.`, enlace };
          }
          case "reiniciar-fallos": {
            if (prueba.tipo !== "integral") return { error: "Solo el examen integral cuenta los fallos para las esperas." };
            const r = await pool.query(`UPDATE academia_pruebas SET fallos = 0, fallo_at = NULL WHERE user_id = $1 AND clave = $2 AND fallos > 0`, [c.alumno, clave]);
            if (!r.rowCount) return { error: "Ese examen no tiene fallos." };
            return {
              texto: `Reinició los fallos del ${nombre} (eran ${prueba.fallos}): las esperas empiezan otra vez desde cero.`,
              aviso: `Ya puedes volver a dar el ${nombre}: las esperas empiezan otra vez desde cero.`,
              enlace,
            };
          }
          case "intento-extra": {
            if (prueba.tipo !== "trabajo") return { error: "El examen integral no tiene tope de intentos: para dejarlo intentar ya, quita la espera." };
            if (prueba.extra >= EXTRA_MAX) return { error: `Ya tiene ${EXTRA_MAX} entregas de más en este trabajo.` };
            await pool.query(`UPDATE academia_pruebas SET extra = extra + 1, updated_at = now() WHERE user_id = $1 AND clave = $2`, [c.alumno, clave]);
            const de = prueba.titulo.replace("Trabajo final · ", "");
            return { texto: `Le dio una entrega más del trabajo final de ${de}.`, aviso: `Tienes una entrega más del trabajo final de ${de}.`, enlace };
          }
          case "anular-en-curso": {
            if (!prueba.enCurso) return { error: "No tiene un intento en curso en esa prueba." };
            const { rows } = await pool.query(`SELECT intentos FROM academia_pruebas WHERE user_id = $1 AND clave = $2`, [c.alumno, clave]);
            const intento = Number(rows[0]?.intentos ?? 0);
            // lo que escribió en ese intento tampoco cuenta (ni queda para revisar)
            await pool.query(`DELETE FROM academia_respuestas WHERE user_id = $1 AND clave = $2 AND intento = $3`, [c.alumno, clave, intento]);
            await pool.query(
              `UPDATE academia_pruebas SET curso = NULL, curso_at = NULL, intentos = GREATEST(intentos - 1, 0), updated_at = now() WHERE user_id = $1 AND clave = $2`,
              [c.alumno, clave],
            );
            return { texto: `Anuló el intento ${intento} en curso del ${nombre}: no cuenta.`, aviso: `Se anuló tu intento en curso del ${nombre}: no cuenta y puedes empezarlo otra vez.`, enlace };
          }
          default:
            return { error: "Elige qué hacer con esa prueba.", status: 400 };
        }
      });
      await cerrarAccion(req, res, c, `academia.prueba-${accion}`, out, false);
    })().catch(errorInterno(res, "cierre"));
  });

  // Marcar una lección como completada, o volver a abrirla (para que la lea otra vez).
  app.post(`${base}/materia/:materiaId/leccion`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { materia: true });
      if (!c) return;
      const m = c.m!;
      const k = m.lecciones.findIndex((l) => l.id === String(req.body?.leccionId || ""));
      const accion = req.body?.accion === "completar" ? "completar" : req.body?.accion === "abrir" ? "abrir" : null;
      if (k < 0) return void res.status(404).json({ message: "Esa lección no es de esta materia." });
      if (!accion) return void res.status(400).json({ message: "Elige completar la lección o volver a abrirla." });
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const l = m.lecciones[k];
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const { rows } = await pool.query(`SELECT completada_at FROM academia_lecciones WHERE user_id = $1 AND leccion_id = $2`, [c.alumno, l.id]);
        if (accion === "completar") {
          if (rows[0]?.completada_at) return { error: "Esa lección ya estaba completada." };
          await pool.query(
            `INSERT INTO academia_lecciones (user_id, leccion_id, completada_at) VALUES ($1, $2, now())
             ON CONFLICT (user_id, leccion_id) DO UPDATE SET completada_at = now()`,
            [c.alumno, l.id],
          );
          await asegurarMateria(c.alumno, m.id);
          return {
            texto: `Marcó como completada la lección ${k + 1} («${l.titulo}») de «${m.titulo}».`,
            aviso: `La Administración marcó como completada la lección ${k + 1} de «${m.titulo}».`,
          };
        }
        if (!rows[0]?.completada_at) return { error: "Esa lección no estaba completada." };
        await pool.query(`UPDATE academia_lecciones SET completada_at = NULL WHERE user_id = $1 AND leccion_id = $2`, [c.alumno, l.id]);
        return {
          texto: `Volvió a abrir la lección ${k + 1} («${l.titulo}») de «${m.titulo}».`,
          aviso: `La Administración volvió a abrir la lección ${k + 1} de «${m.titulo}»: léela otra vez y responde su repaso.`,
        };
      });
      await cerrarAccion(req, res, c, accion === "completar" ? "academia.leccion-completada" : "academia.leccion-abierta", out);
    })().catch(errorInterno(res, "lección"));
  });

  // Inscribirlo en una materia o darlo de baja (si no la aprobó). Su avance en las lecciones no se borra.
  app.post(`${base}/materia/:materiaId/inscripcion`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { materia: true });
      if (!c) return;
      const m = c.m!;
      const accion = req.body?.accion === "inscribir" ? "inscribir" : req.body?.accion === "baja" ? "baja" : null;
      if (!accion) return void res.status(400).json({ message: "Elige inscribirlo o darlo de baja." });
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const out = await enFila(c.alumno, async (): Promise<Hecho | Fallo> => {
        const { rows } = await pool.query(`SELECT estado FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [c.alumno, m.id]);
        if (accion === "inscribir") {
          if (rows[0]) return { error: "Ya está inscrito en esa materia." };
          await asegurarMateria(c.alumno, m.id);
          return { texto: `Lo inscribió en «${m.titulo}».`, aviso: `La Administración te inscribió en «${m.titulo}»: ya puedes empezar sus lecciones.`, titulo: "Te inscribieron en una materia" };
        }
        if (!rows[0]) return { error: "No está inscrito en esa materia." };
        if (rows[0].estado === "aprobada") return { error: "Ya la aprobó: para quitarla, revoca su certificado o quita la convalidación." };
        await pool.query(`DELETE FROM academia_materias WHERE user_id = $1 AND materia_id = $2 AND estado <> 'aprobada'`, [c.alumno, m.id]);
        return {
          texto: `Lo dio de baja de «${m.titulo}» (su avance en las lecciones queda guardado).`,
          aviso: `La Administración te dio de baja de «${m.titulo}». Tu avance en las lecciones queda guardado por si vuelves.`,
          titulo: "Te dieron de baja de una materia",
        };
      });
      await cerrarAccion(req, res, c, accion === "inscribir" ? "academia.inscribir" : "academia.baja", out);
    })().catch(errorInterno(res, "inscripción"));
  });

  // Retirarlo de la academia o reactivarlo.
  app.post(`${base}/estatus`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res);
      if (!c) return;
      const estatus = req.body?.estatus === "retirado" ? "retirado" : req.body?.estatus === "activo" ? "activo" : null;
      if (!estatus) return void res.status(400).json({ message: "Elige retirarlo o reactivarlo." });
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const r = await pool.query(`UPDATE academia_alumnos SET estatus = $2 WHERE user_id = $1 AND estatus IS DISTINCT FROM $2`, [c.alumno, estatus]);
      const out: Hecho | Fallo = !r.rowCount
        ? { error: estatus === "retirado" ? "Ya estaba retirado." : "No estaba retirado." }
        : estatus === "retirado"
          ? { texto: "Lo registró como retirado de la academia.", aviso: "La Administración de la academia te registró como retirado. Si quieres volver, avísale y te reactiva.", titulo: "Tu estatus en la academia cambió" }
          : { texto: "Lo reactivó en la academia.", aviso: "La Administración de la academia te reactivó: puedes seguir estudiando.", titulo: "Tu estatus en la academia cambió" };
      await cerrarAccion(req, res, c, estatus === "retirado" ? "academia.retirar" : "academia.reactivar", out, false);
    })().catch(errorInterno(res, "estatus"));
  });

  // Dar o quitar el tiempo extra (×1,5) en los exámenes.
  app.post(`${base}/tiempo-extra`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res);
      if (!c) return;
      if (typeof req.body?.activo !== "boolean") return void res.status(400).json({ message: "Elige dar o quitar el tiempo extra." });
      const activo = req.body.activo as boolean;
      if (frenar(`agest:${c.porId}`, 500)) return void res.status(429).json({ message: "Espera un momento." });
      const r = await pool.query(`UPDATE academia_alumnos SET tiempo_extra = $2 WHERE user_id = $1 AND tiempo_extra <> $2`, [c.alumno, activo]);
      const out: Hecho | Fallo = !r.rowCount
        ? { error: activo ? "Ya tenía tiempo extra." : "No tenía tiempo extra." }
        : activo
          ? { texto: "Le dio tiempo extra en los exámenes (cada reloj dura 1,5 veces más).", aviso: "Desde ahora tienes tiempo extra en los exámenes de la academia: cada reloj dura 1,5 veces más.", titulo: "Tienes tiempo extra en los exámenes" }
          : { texto: "Le quitó el tiempo extra en los exámenes.", aviso: "Ya no tienes tiempo extra en los exámenes de la academia.", titulo: "Tu tiempo en los exámenes cambió" };
      await cerrarAccion(req, res, c, activo ? "academia.tiempo-extra" : "academia.tiempo-normal", out, false);
    })().catch(errorInterno(res, "tiempo extra"));
  });

  // Escribirle un mensaje: le llega en la campana (y queda en el historial).
  app.post(`${base}/mensaje`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { motivo: false });
      if (!c) return;
      const texto = limpioConRenglones(req.body?.texto, 1000);
      if (texto.length < 8) return void res.status(400).json({ message: "Escribe el mensaje (al menos 8 letras)." });
      if (frenar(`agest-msj:${c.porId}`, 3000)) return void res.status(429).json({ message: "Espera unos segundos antes de enviar otro mensaje." });
      await avisarA([c.alumno], "Mensaje de la Administración de la academia", texto, "/academia");
      await registrar(req, "academia.mensaje", c.alumno, `Le escribió: «${texto.slice(0, 300)}${texto.length > 300 ? "…" : ""}»`, null);
      const r: ResultadoGestion = { mensaje: "Mensaje enviado: le llega en la campana." };
      res.json(r);
    })().catch(errorInterno(res, "mensaje"));
  });

  // El historial del expediente del alumno: quién hizo qué, cuándo y por qué.
  app.get(`${base}/historial`, (req, res) => {
    (async () => {
      const c = await contextoDe(req, res, { motivo: false });
      if (!c) return;
      const { rows } = await pool.query(
        `SELECT l.id, l.created_at, l.action, l.details, u.display_name, u.username
           FROM audit_log l LEFT JOIN users u ON u.id = l.user_id
          WHERE l.entity_type = 'academia' AND l.entity_id = $1
          ORDER BY l.created_at DESC LIMIT 100`,
        [c.alumno],
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
          alumno: null,
          texto: det.texto ?? "",
          motivo: det.motivo ?? null,
        };
      });
      res.setHeader("Cache-Control", "no-store");
      res.json({ historial });
    })().catch(errorInterno(res, "historial"));
  });
}
