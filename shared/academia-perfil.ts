// El perfil completo de un alumno para la Dirección académica (server/academia-perfil.ts, docs/academia-panel.md, parte 2):
// por dónde va y cuál es su próximo paso, sus notas por materia y cada intento de examen, su tiempo de estudio semana a
// semana, sus fortalezas y lo que le cuesta (por lección y por tipo de pregunta), el repaso, los versículos, las
// actividades de su nivel, las alertas y la bitácora de seguimiento. Aquí van los tipos y las reglas (sin base de datos).
import type { Bloom } from "./academia-base";

export const NOMBRE_BLOOM: Record<Bloom, string> = {
  recordar: "Recordar (memoria)",
  comprender: "Comprender",
  aplicar: "Aplicar",
  analizar: "Analizar",
  evaluar: "Evaluar",
  crear: "Crear",
};

/** Las alertas: alta (actuar pronto), media (mirar) e info (para saber). Solo las ve el panel, nunca el alumno. */
export type GravedadAlerta = "alta" | "media" | "info";
export type AlertaPerfil = { clave: string; gravedad: GravedadAlerta; titulo: string; detalle: string };

export type SemanaEstudio = { inicio: string; minutos: number; lecciones: number };
export type DiaEstudio = { dia: string; minutos: number };
/** Cuánto acierta en algo (una lección o un tipo de pregunta): sus respuestas bien de todas las que dio. */
export type Acierto = { clave: string; nombre: string; detalle?: string; bien: number; total: number; pct: number };
export type PreguntaDificil = { id: string; texto: string; donde: string; fallos: number; aciertos: number };
export type TipoIntento = "final" | "mini" | "breve" | "suficiencia" | "integral" | "trabajo" | "otro";
export type IntentoExamen = { clave: string; titulo: string; tipo: TipoIntento; intento: number; nota: number; aciertos: number; de: number; fecha: string; aprobado: boolean };
export type ReflexionAlumno = { leccion: string; materia: string; texto: string; fecha: string };

export type TipoSeguimiento = "nota" | "llamada" | "mensaje" | "visita" | "reunion" | "oracion";
export const TIPOS_SEGUIMIENTO: { id: TipoSeguimiento; texto: string }[] = [
  { id: "nota", texto: "Nota" },
  { id: "llamada", texto: "Llamada" },
  { id: "mensaje", texto: "Mensaje" },
  { id: "visita", texto: "Visita" },
  { id: "reunion", texto: "Reunión" },
  { id: "oracion", texto: "Oración" },
];
export const LIMITES_SEGUIMIENTO = { min: 5, max: 1500 };
export type NotaSeguimiento = { id: number; tipo: TipoSeguimiento; texto: string; autor: string; fecha: string };

export type NivelAvance = { n: number; nombre: string; aprobadas: number; enCurso: number; de: number; completado: string | null; promedio: number | null; actual: boolean };
export type EspecialidadAvance = { id: string; nombre: string; aprobadas: number; enCurso: number; de: number; completada: string | null };
export type ComponenteNota = { id: string; texto: string; peso: number; valor: number | null };
export type MateriaNotas = {
  id: string;
  titulo: string;
  grupo: string;
  estado: "aprobada" | "en-curso";
  nota: number | null;
  componentes: ComponenteNota[];
  lecciones: number;
  de: number;
  /** La siguiente lección por hacer (en orden), si le falta alguna. */
  siguiente: string | null;
  intentosFinal: number;
  mejorFinal: number | null;
};
export type RequisitoNivel = { texto: string; detalle: string; hecho: boolean };

export type PerfilAlumno = {
  generado: string;
  resumen: {
    nivelActual: { n: number; nombre: string } | null;
    /** Las materias de los cinco niveles: aprobadas de todas (el programa de formación). */
    programa: { aprobadas: number; de: number; pct: number };
    promedio: number | null;
    aprobadas: number;
    enCurso: number;
    lecciones: number;
    diasInscrito: number;
    diasSinEstudiar: number;
    racha: number;
  };
  estudio: {
    minutosTotal: number;
    minutos30: number;
    sesiones30: number;
    diasActivos30: number;
    metaSemanal: number;
    /** Las últimas 12 semanas (de lunes a domingo), de la más antigua a la actual. */
    semanas: SemanaEstudio[];
    /** Los últimos 84 días, del más antiguo a hoy (hora de Texas). */
    dias: DiaEstudio[];
    videoMinutos: number;
  };
  niveles: NivelAvance[];
  especialidades: EspecialidadAvance[];
  materias: MateriaNotas[];
  examenes: IntentoExamen[];
  aprendizaje: { respuestas: number; porBloom: Acierto[]; porLeccion: Acierto[]; dificiles: PreguntaDificil[] | null };
  repaso: { total: number; dominadas: number; vencidas: number; fallos: number };
  versiculos: { aprendidos: number; dominados: number; de: number };
  cuaderno: { notas: number; resaltados: number };
  actividades: { nivel: number; nombre: string; requisitos: RequisitoNivel[] }[];
  alertas: AlertaPerfil[];
  logros: string[];
  proximo: string | null;
  reflexiones: ReflexionAlumno[] | null;
  seguimiento: NotaSeguimiento[] | null;
  puede: { seguimiento: boolean; preguntas: boolean; reflexiones: boolean };
};

// ---------------------------------------------------------------- las fechas (días de Texas en texto AAAA-MM-DD)

const DIA_MS = 86_400_000;
const aFecha = (dia: string) => new Date(`${dia}T12:00:00Z`);
const aDia = (d: Date) => d.toISOString().slice(0, 10);
export const sumarDias = (dia: string, n: number) => aDia(new Date(aFecha(dia).getTime() + n * DIA_MS));
export const diasEntre = (desde: string, hasta: string) => Math.round((aFecha(hasta).getTime() - aFecha(desde).getTime()) / DIA_MS);
/** El lunes de la semana de ese día. */
export function lunesDe(dia: string): string {
  const d = aFecha(dia).getUTCDay(); // 0 domingo
  return sumarDias(dia, d === 0 ? -6 : 1 - d);
}

/** Los últimos `n` días hasta `hoy`, con los minutos de cada uno (0 si no estudió). */
export function diasRecientes(estudio: DiaEstudio[], hoy: string, n = 84): DiaEstudio[] {
  const por = new Map(estudio.map((e) => [e.dia, e.minutos]));
  return Array.from({ length: n }, (_, i) => {
    const dia = sumarDias(hoy, i - n + 1);
    return { dia, minutos: por.get(dia) ?? 0 };
  });
}

/** Las últimas `n` semanas (de lunes a domingo) hasta la de `hoy`: los minutos de estudio y las lecciones completadas. */
export function semanasDe(estudio: DiaEstudio[], leccionesCompletadas: string[], hoy: string, n = 12): SemanaEstudio[] {
  const ultima = lunesDe(hoy);
  const semanas = Array.from({ length: n }, (_, i) => ({ inicio: sumarDias(ultima, (i - n + 1) * 7), minutos: 0, lecciones: 0 }));
  const idx = (dia: string) => {
    const k = Math.floor(diasEntre(semanas[0].inicio, dia) / 7);
    return k >= 0 && k < n ? k : -1;
  };
  for (const e of estudio) {
    const k = idx(e.dia);
    if (k >= 0) semanas[k].minutos += e.minutos;
  }
  for (const dia of leccionesCompletadas) {
    const k = idx(dia);
    if (k >= 0) semanas[k].lecciones++;
  }
  return semanas;
}

/** La racha vale si su último día es hoy o ayer; si no, ya se cortó. */
export function rachaVigente(racha: number, fecha: string | null, hoy: string): number {
  if (!fecha || racha <= 0) return 0;
  const d = diasEntre(fecha, hoy);
  return d === 0 || d === 1 ? racha : 0;
}

/** El porcentaje redondeado (0 si no hay total). */
export const porciento = (bien: number, total: number) => (total > 0 ? Math.round((100 * bien) / total) : 0);

// ---------------------------------------------------------------- las alertas

export const UMBRALES = {
  /** Días sin estudiar con materias en curso: media desde 7 y alta desde 14 (como «Se detuvieron» del panel). */
  inactivoMedia: 7,
  inactivoAlta: 14,
  /** Veces que reprobó el final de una materia que todavía no aprobó. */
  reprobados: 2,
  /** El promedio de sus últimos exámenes por debajo de esto. */
  promedioBajo: 70,
  examenesParaPromedio: 5,
  /** Días con una lección abierta sin completarla. */
  atorado: 14,
  /** Semanas seguidas (completas) sin cumplir su meta de minutos. */
  semanasSinMeta: 3,
  /** Preguntas del repaso del día vencidas. */
  repasoVencido: 20,
  /** Días desde que se inscribió sin empezar ninguna lección. */
  sinEmpezar: 7,
  /** Días de racha que se celebran. */
  racha: 7,
} as const;

export type DatosAlertas = {
  diasSinEstudiar: number;
  enCurso: string[];
  lecciones: number;
  diasInscrito: number;
  /** Las materias en curso con sus finales reprobados. */
  reprobadas: { titulo: string; veces: number }[];
  /** Las notas de sus últimos exámenes, del más reciente al más antiguo. */
  notasRecientes: number[];
  /** Las lecciones abiertas sin completar en materias en curso, con los días desde que las abrió. */
  abiertas: { titulo: string; materia: string; dias: number }[];
  /** Las semanas completas más recientes desde que se inscribió, de la más reciente a la más antigua (sin la actual). */
  minutosSemanas: number[];
  metaSemanal: number;
  repasoVencido: number;
  sinMentorEnNivel1: boolean;
  porRevisar: { escritas: number; actividades: number };
};

/** Las alertas del alumno, de la más grave a la de solo saber. */
export function alertasDe(d: DatosAlertas): AlertaPerfil[] {
  const out: AlertaPerfil[] = [];
  const u = UMBRALES;
  // quien todavía no completó ninguna lección tiene su propia alerta («no empezó»)
  if (d.enCurso.length && d.lecciones > 0 && d.diasSinEstudiar >= u.inactivoMedia) {
    out.push({
      clave: "inactivo",
      gravedad: d.diasSinEstudiar >= u.inactivoAlta ? "alta" : "media",
      titulo: `Lleva ${d.diasSinEstudiar} días sin estudiar`,
      detalle: `Tiene en curso: ${d.enCurso.join(", ")}. Un mensaje o una llamada a tiempo ayuda a no abandonar.`,
    });
  }
  for (const r of d.reprobadas.filter((x) => x.veces >= u.reprobados)) {
    out.push({
      clave: `reprobado-${r.titulo}`,
      gravedad: "alta",
      titulo: `Reprobó ${r.veces} veces el examen final de ${r.titulo}`,
      detalle: "Antes del próximo intento conviene repasar con él las lecciones que más le cuestan (en «Aprendizaje»).",
    });
  }
  const recientes = d.notasRecientes.slice(0, u.examenesParaPromedio);
  if (recientes.length >= 3) {
    const prom = Math.round(recientes.reduce((s, x) => s + x, 0) / recientes.length);
    if (prom < u.promedioBajo) {
      out.push({ clave: "promedio", gravedad: "media", titulo: `Promedio de ${prom} en sus últimos ${recientes.length} exámenes`, detalle: `Por debajo de ${u.promedioBajo}: mira en «Aprendizaje» qué lecciones y qué tipo de preguntas le cuestan.` });
    }
  }
  const atoradas = d.abiertas.filter((a) => a.dias >= u.atorado).sort((a, b) => b.dias - a.dias);
  if (atoradas.length) {
    const a = atoradas[0];
    out.push({
      clave: "atorado",
      gravedad: "media",
      titulo: `Se detuvo en la lección «${a.titulo}»`,
      detalle: `La abrió hace ${a.dias} días y no la terminó (${a.materia})${atoradas.length > 1 ? `; y ${atoradas.length - 1} ${atoradas.length === 2 ? "lección más" : "lecciones más"} así` : ""}.`,
    });
  }
  if (d.enCurso.length && d.metaSemanal > 0 && d.minutosSemanas.length >= u.semanasSinMeta && d.minutosSemanas.slice(0, u.semanasSinMeta).every((m) => m < d.metaSemanal)) {
    out.push({
      clave: "meta",
      gravedad: "media",
      titulo: `${u.semanasSinMeta} semanas sin cumplir su meta de estudio`,
      detalle: `Su meta es de ${d.metaSemanal} minutos por semana; las últimas: ${d.minutosSemanas.slice(0, u.semanasSinMeta).map((m) => `${m} min`).join(", ")}.`,
    });
  }
  if (d.lecciones === 0 && d.diasInscrito >= u.sinEmpezar) {
    out.push({ clave: "sin-empezar", gravedad: "media", titulo: `Se inscribió hace ${d.diasInscrito} días y no empezó`, detalle: "Todavía no completó ninguna lección. Puede necesitar ayuda para empezar." });
  }
  if (d.repasoVencido >= u.repasoVencido) {
    out.push({ clave: "repaso", gravedad: "info", titulo: `${d.repasoVencido} preguntas del repaso del día vencidas`, detalle: "Las preguntas vuelven para afirmar lo aprendido; conviene animarlo a ponerse al día." });
  }
  if (d.sinMentorEnNivel1) {
    out.push({ clave: "mentor", gravedad: "info", titulo: "Todavía no tiene mentor", detalle: "En el Nivel 1 cada alumno puede tener un mentor que lo acompañe." });
  }
  const { escritas, actividades } = d.porRevisar;
  if (escritas + actividades > 0) {
    const partes = [escritas ? `${escritas} ${escritas === 1 ? "respuesta escrita" : "respuestas escritas"}` : "", actividades ? `${actividades} ${actividades === 1 ? "actividad" : "actividades"}` : ""].filter(Boolean);
    out.push({ clave: "revision", gravedad: "info", titulo: `Espera tu revisión: ${partes.join(" y ")}`, detalle: "Están en «Para revisar» del panel." });
  }
  const orden: Record<GravedadAlerta, number> = { alta: 0, media: 1, info: 2 };
  return out.sort((a, b) => orden[a.gravedad] - orden[b.gravedad]);
}

/** Las preguntas del examen o del repaso que respondió: cuántas bien y de cuántas, agrupadas por `clave`. */
export function agruparAciertos(respuestas: { clave: string; bien: boolean }[]): Map<string, { bien: number; total: number }> {
  const m = new Map<string, { bien: number; total: number }>();
  for (const r of respuestas) {
    const x = m.get(r.clave) ?? { bien: 0, total: 0 };
    x.total++;
    if (r.bien) x.bien++;
    m.set(r.clave, x);
  }
  return m;
}

/** Qué tipo de examen es por su clave (academia_intentos). */
export function tipoDeClave(clave: string): TipoIntento {
  if (clave.endsWith(":final")) return "final";
  if (/:mini-\d+$/.test(clave)) return "mini";
  if (clave.endsWith(":breve")) return "breve";
  if (clave.endsWith(":suficiencia")) return "suficiencia";
  if (clave.endsWith(":integral")) return "integral";
  if (clave.endsWith(":trabajo")) return "trabajo";
  return "otro";
}
