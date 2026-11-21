/**
 * El informe del laboratorio ministerial para la Administración (sección «Laboratorio» del panel de la academia): cómo
 * les va a los alumnos en cada práctica. Sale de los intentos guardados, sin los de prueba de la Administración, con las
 * mismas reglas del motor. Solo lo ve la Administración (capacidad «laboratorio» de shared/academia-permisos.ts).
 */
import type { Express } from "express";
import { pool } from "./db";
import { materiaPorId } from "@shared/academia";
import { nivelDe, type InformeLaboratorio, type InformePractica, type NivelCompetencia } from "@shared/laboratorio";
import { PRACTICAS } from "./academia/laboratorio/index";
import type { PracticaDef } from "./academia/laboratorio/tipos";
import { estadoValido, nombreVariante, pasosDe, resultado, type Paso } from "./academia-laboratorio-motor";
import { permisoDe } from "./academia-direccion";

/** Un intento con el nombre del alumno, como sale de la base (sin los de prueba). */
export type FilaInforme = {
  id: number;
  user_id: number;
  practica_id: string;
  intento: number;
  cuenta: boolean;
  estado: string;
  datos: unknown;
  nota: number | null;
  criticas: number;
  cierre: { sentir?: string | null; llevo?: string } | null;
  terminado_at: string | Date | null;
  nombre: string;
};

/** Los últimos intentos que muestra el informe. */
export const ULTIMOS = 20;
/** Lo que se llevan (sin nombres) que muestra cada práctica. */
export const LLEVO = 3;

const nivelesEnCero = (): Record<NivelCompetencia, number> => ({ Ejemplar: 0, Competente: 0, "En desarrollo": 0, Inicial: 0 });
const promedio = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);
const parte = (n: number, de: number) => (de ? Math.round((100 * n) / de) : null);
const tiempo = (v: string | Date | null) => (v ? new Date(v).getTime() : 0);
const idDe = (x: Paso) => (x.tipo === "escena" ? x.e.id : x.r.id);
const tituloDe = (x: Paso) => (x.tipo === "escena" ? x.e.titulo : x.r.titulo);

/** La clave de cada paso: la misma en todas las versiones del caso, salvo cuando una versión cambia esa escena. */
function pasosDelInforme(p: PracticaDef) {
  const base = pasosDe(p, 0);
  const versiones = p.variantes?.length ?? 0;
  const cambiada = (v: number, i: number) => {
    const x = pasosDe(p, v)[i];
    const b = base[i];
    return !!x && x.tipo === "escena" && b?.tipo === "escena" && x.e !== b.e;
  };
  const clave = (v: number, i: number) => {
    const x = pasosDe(p, v)[i];
    return x ? (cambiada(v, i) ? `${idDe(x)}@${v}` : idDe(x)) : `?${i}`;
  };
  const lista: { clave: string; titulo: string; version: string | null }[] = [];
  base.forEach((x, i) => {
    lista.push({ clave: idDe(x), titulo: tituloDe(x), version: null });
    for (let v = 1; v <= versiones; v++) {
      if (cambiada(v, i)) lista.push({ clave: clave(v, i), titulo: tituloDe(pasosDe(p, v)[i]), version: nombreVariante(p, v) });
    }
  });
  return { clave, lista };
}

/** El informe de todas las prácticas a partir de los intentos (sin base de datos: lo usan la ruta y las pruebas). */
export function armarInforme(filas: FilaInforme[]): InformeLaboratorio {
  const practicas: InformePractica[] = [];
  const alumnosTodos = new Set<number>();
  const mejoresTodos: number[] = [];
  let terminadosTodos = 0;
  let criticosTodos = 0;
  for (const p of PRACTICAS) {
    const m = materiaPorId(p.materia);
    const { clave, lista } = pasosDelInforme(p);
    const pasos = new Map(lista.map((x) => [x.clave, { ...x, respuestas: 0, mejores: 0 }]));
    const criticas = new Map<string, { paso: string; texto: string; veces: number }>();
    const competencias = p.competencias.map((c) => ({ nombre: c.nombre, leccion: c.leccion, suma: 0, n: 0 }));
    const sentir = new Map<string, number>();
    const llevo: { texto: string; cuando: number }[] = [];
    const porAlumno = new Map<number, { primero: { intento: number; nota: number }; mejor: number }>();
    let terminados = 0;
    let enCurso = 0;
    let criticos = 0;
    for (const f of filas) {
      if (f.practica_id !== p.id) continue;
      if (f.estado !== "terminado") {
        enCurso++;
        continue;
      }
      const s = estadoValido(p, f.datos);
      if (!s) continue;
      terminados++;
      const r = resultado(p, s);
      if (r.criticas.length) criticos++;
      r.competencias.forEach((c, i) => {
        competencias[i].suma += c.pct;
        competencias[i].n++;
      });
      const ps = pasosDe(p, s.variante);
      for (const d of s.decisiones) {
        const x = ps[d.paso];
        if (!x) continue;
        const k = clave(s.variante, d.paso);
        const st = pasos.get(k);
        if (st) {
          st.respuestas++;
          if (d.ejemplar) st.mejores++;
        }
        if (d.critica) {
          const j = d.k[0];
          const texto = x.tipo === "escena" ? x.e.opciones[j]?.texto : x.r.opciones[j]?.texto;
          if (texto) {
            const c = criticas.get(`${k}:${j}`) ?? { paso: tituloDe(x), texto, veces: 0 };
            c.veces++;
            criticas.set(`${k}:${j}`, c);
          }
        }
      }
      const comoSeSintio = f.cierre?.sentir;
      if (comoSeSintio) sentir.set(comoSeSintio, (sentir.get(comoSeSintio) ?? 0) + 1);
      const lleva = typeof f.cierre?.llevo === "string" ? f.cierre.llevo.trim() : "";
      if (lleva) llevo.push({ texto: lleva.slice(0, 280), cuando: tiempo(f.terminado_at) });
      if (f.cuenta && f.nota != null) {
        const a = porAlumno.get(f.user_id);
        if (!a) porAlumno.set(f.user_id, { primero: { intento: f.intento, nota: f.nota }, mejor: f.nota });
        else {
          if (f.intento < a.primero.intento) a.primero = { intento: f.intento, nota: f.nota };
          a.mejor = Math.max(a.mejor, f.nota);
        }
      }
    }
    const niveles = nivelesEnCero();
    for (const [id, a] of Array.from(porAlumno)) {
      niveles[nivelDe(a.mejor)]++;
      alumnosTodos.add(id);
      mejoresTodos.push(a.mejor);
    }
    terminadosTodos += terminados;
    criticosTodos += criticos;
    practicas.push({
      id: p.id,
      titulo: p.titulo,
      formato: p.formato,
      materia: { id: p.materia, titulo: m?.titulo ?? p.materia },
      alumnos: porAlumno.size,
      terminados,
      enCurso,
      primero: promedio(Array.from(porAlumno.values()).map((a) => a.primero.nota)),
      mejor: promedio(Array.from(porAlumno.values()).map((a) => a.mejor)),
      conCritica: parte(criticos, terminados),
      niveles,
      competencias: competencias.map((c) => ({ nombre: c.nombre, leccion: c.leccion, pct: c.n ? Math.round(c.suma / c.n) : null })),
      pasos: Array.from(pasos.values()).map((x) => ({ titulo: x.titulo, version: x.version, respuestas: x.respuestas, mejor: parte(x.mejores, x.respuestas) })),
      criticas: Array.from(criticas.values()).sort((a, b) => b.veces - a.veces).slice(0, 5),
      sentir: Array.from(sentir, ([s, n]) => ({ sentir: s, n })).sort((a, b) => b.n - a.n),
      llevo: llevo.sort((a, b) => b.cuando - a.cuando).slice(0, LLEVO).map((x) => x.texto),
    });
  }
  const titulos = new Map(PRACTICAS.map((p) => [p.id, p.titulo]));
  const ultimos = filas
    .filter((f) => f.estado === "terminado" && titulos.has(f.practica_id))
    .sort((a, b) => tiempo(b.terminado_at) - tiempo(a.terminado_at) || b.id - a.id)
    .slice(0, ULTIMOS)
    .map((f) => ({
      id: f.id,
      alumno: { id: f.user_id, nombre: f.nombre },
      practica: titulos.get(f.practica_id)!,
      nota: f.nota,
      nivel: f.nota != null ? nivelDe(f.nota) : null,
      criticas: f.criticas,
      cuando: new Date(tiempo(f.terminado_at)).toISOString(),
      cuenta: f.cuenta,
    }));
  return {
    totales: { alumnos: alumnosTodos.size, terminados: terminadosTodos, promedio: promedio(mejoresTodos), conCritica: parte(criticosTodos, terminadosTodos) },
    practicas,
    ultimos,
  };
}

export function registerAcademiaLaboratorioInformeRoutes(app: Express) {
  app.get("/api/academia/direccion/laboratorio", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "laboratorio");
      if (!p) return;
      const { rows } = await pool.query(
        `SELECT l.id, l.user_id, l.practica_id, l.intento, l.cuenta, l.estado, l.datos, l.nota, l.criticas, l.cierre, l.terminado_at,
                COALESCE(NULLIF(trim(concat_ws(' ', i.nombres, i.apellidos)), ''), NULLIF(trim(u.display_name), ''), u.username, 'Alumno') AS nombre
           FROM academia_laboratorio l
           JOIN users u ON u.id = l.user_id
           LEFT JOIN academia_inscripciones i ON i.user_id = l.user_id
          WHERE NOT l.prueba
          ORDER BY l.id DESC
          LIMIT 5000`,
      );
      res.setHeader("Cache-Control", "no-store");
      res.json(armarInforme(rows as FilaInforme[]));
    } catch (e: any) {
      console.error("laboratorio/informe:", e?.message);
      res.status(500).json({ message: "No se pudo cargar el informe del laboratorio." });
    }
  });
}
