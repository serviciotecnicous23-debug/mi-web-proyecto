/**
 * Las actividades que pide un nivel además de sus materias (docs/academia.md, «Las actividades del nivel»):
 * - en el Nivel 2, 3 conversaciones de evangelismo y servir 1 mes en un ministerio;
 * - en el Nivel 3, 20 horas de práctica ministerial, una enseñanza grabada aprobada y consolidar a 1 nuevo creyente;
 * - en el Nivel 4, 30 horas de práctica ministerial y un sermón evaluado con la rúbrica de Homilética II;
 * - en el Nivel 5, el proyecto final (un plan de ministerio) con su defensa en vivo ante 2 profesores, y acompañar como
 *   mentor a 2 personas hasta que terminan el Nivel 1 (esto no se registra: lo cuenta la academia con los mentores).
 *
 * El alumno las registra desde la página del nivel y la Administración las confirma (o las devuelve con un motivo) en
 * «Para revisar». Cuentan las confirmadas; el servicio, además, cuando ya pasaron sus días desde que empezó, y la
 * práctica, por sus horas confirmadas.
 * Las fechas van como texto AAAA-MM-DD (día de Texas): así no las mueve la zona horaria de la base ni del servidor.
 */
import type { NivelN } from "./academia";

export type TipoActividad = "evangelismo" | "servicio" | "practica" | "ensenanza" | "consolidacion" | "sermon" | "proyecto";
export type EstadoActividad = "pendiente" | "confirmada" | "rechazada";

/** Lo que pide un nivel: cuántas de cada una (el servicio, en días; la práctica, en horas). */
export type PideNivel = {
  evangelismo?: number;
  servicioDias?: number;
  practicaHoras?: number;
  ensenanza?: number;
  consolidacion?: number;
  sermon?: number;
  proyecto?: number;
  /** Personas acompañadas como mentor hasta terminar el Nivel 1 (no se registra: se cuenta). */
  acompanar?: number;
};

/** Lo que pide cada nivel (sus textos están en los requisitos de `NIVELES` y en el reglamento). */
export const ACTIVIDADES_NIVEL: Partial<Record<NivelN, PideNivel>> = {
  2: { evangelismo: 3, servicioDias: 28 },
  3: { practicaHoras: 20, ensenanza: 1, consolidacion: 1 },
  4: { practicaHoras: 30, sermon: 1 },
  5: { proyecto: 1, acompanar: 2 },
};

const CAMPO: Record<TipoActividad, keyof PideNivel> = {
  evangelismo: "evangelismo",
  servicio: "servicioDias",
  practica: "practicaHoras",
  ensenanza: "ensenanza",
  consolidacion: "consolidacion",
  sermon: "sermon",
  proyecto: "proyecto",
};
export const TIPOS_ACTIVIDAD = Object.keys(CAMPO) as TipoActividad[];

/** Las actividades que pide un nivel, en el orden en que se muestran. */
export function tiposDe(pide: PideNivel): TipoActividad[] {
  return TIPOS_ACTIVIDAD.filter((t) => (pide[CAMPO[t]] ?? 0) > 0);
}

/** Cómo se llama cada actividad (en la Administración y en los avisos). */
export const NOMBRE_ACTIVIDAD: Record<TipoActividad, string> = {
  evangelismo: "Conversación de evangelismo",
  servicio: "Servicio en un ministerio",
  practica: "Práctica ministerial",
  ensenanza: "Enseñanza grabada",
  consolidacion: "Consolidación de un nuevo creyente",
  sermon: "Sermón",
  proyecto: "Proyecto final",
};

export const LIMITES_ACTIVIDAD = {
  detalleMin: 30,
  detalleMax: 800,
  persona: 60,
  lugar: 80,
  lider: 80,
  titulo: 120,
  enlace: 300,
  /** Registros de cada tipo por nivel (de sobra para 3 conversaciones y un servicio). */
  porTipo: 20,
  /** La práctica se registra por día o por período: caben más registros. */
  porTipoPractica: 60,
  /** Las horas de una práctica, de media en media hora: hasta 12 en un día y 40 en un período. */
  horasDia: 12,
  horasPeriodo: 40,
  /** Hasta cuántos días atrás se puede fechar una actividad. */
  diasAtras: 730,
  motivoMin: 5,
  motivoMax: 400,
} as const;

/** Cuántos registros de un tipo caben en un nivel. */
export const maximoDe = (tipo: TipoActividad): number => (tipo === "practica" ? LIMITES_ACTIVIDAD.porTipoPractica : LIMITES_ACTIVIDAD.porTipo);

/** Cómo terminó la conversación (opcional, para el seguimiento). */
export const RESULTADOS_EVANGELISMO = [
  "Escuchó el evangelio",
  "Oramos juntos",
  "Quiere saber más",
  "Recibió a Cristo",
  "Lo invité a la iglesia",
] as const;

/** Los pasos del plan de consolidación (Evangelismo y consolidación, lección 5): el alumno marca los que acompañó. */
export const PASOS_CONSOLIDACION = [
  { id: "contacto", texto: "El primer contacto" },
  { id: "visita", texto: "La visita" },
  { id: "seguridad", texto: "La seguridad de la salvación" },
  { id: "bautismo", texto: "El bautismo" },
  { id: "integracion", texto: "La integración a la iglesia" },
  { id: "discipulado", texto: "El discipulado" },
  { id: "servicio", texto: "El servicio" },
] as const;
export type PasoConsolidacion = (typeof PASOS_CONSOLIDACION)[number]["id"];
/** Cuántos pasos del plan pide la consolidación como mínimo. */
export const PASOS_MINIMOS = 4;

/** La enseñanza grabada (Homilética I, lección 6): cuánto dura y lo que revisa la Administración para aprobarla. */
export const MINUTOS_ENSENANZA = { min: 10, max: 15 } as const;
export const PAUTAS_ENSENANZA = [
  `Dura de ${MINUTOS_ENSENANZA.min} a ${MINUTOS_ENSENANZA.max} minutos`,
  "Explica un pasaje en su contexto, sin sacarlo de él",
  "Tiene una idea central y un propósito claros",
  "Su bosquejo sale del pasaje",
  "Trae una ilustración verdadera y una aplicación concreta",
  "Muestra a Cristo sin forzar el texto y se oye con claridad",
] as const;

/**
 * El sermón del Nivel 4 (Homilética II, lección 6): dura de 20 a 30 minutos, un maestro de la academia lo evalúa con
 * esta rúbrica de 100 puntos y se aprueba con 70. Se presenta grabado (con su enlace) o en vivo, ante un maestro.
 */
export const MINUTOS_SERMON = { min: 20, max: 30 } as const;
export const APRUEBA_SERMON = 70;
export const RUBRICA_SERMON = [
  { id: "fidelidad", corto: "Fidelidad al texto", texto: "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje", max: 25 },
  { id: "idea", corto: "Idea central y propósito", texto: "Una idea central clara y un propósito definido", max: 15 },
  { id: "estructura", corto: "Estructura", texto: "Estructura: puntos que salen del texto y transiciones", max: 15 },
  { id: "cristo", corto: "Cristo y la gracia", texto: "Cristo y la gracia en el centro, sin forzar el texto", max: 15 },
  { id: "aplicacion", corto: "Aplicación e ilustraciones", texto: "Aplicación concreta e ilustraciones verdaderas", max: 15 },
  { id: "entrega", corto: "Entrega", texto: "Entrega: claridad, contacto con los oyentes y tiempo", max: 15 },
] as const;
export type CriterioSermon = (typeof RUBRICA_SERMON)[number]["id"];
/** La evaluación de un sermón: los puntos de cada criterio y el maestro que lo evaluó. */
export type EvaluacionSermon = { rubrica: Record<CriterioSermon, number>; evaluador: string };

/**
 * El proyecto final del Nivel 5: un plan de ministerio con las ocho partes de la materia Seminario de liderazgo
 * ministerial (su lección del plan de ministerio), que se presenta y se defiende en vivo ante 2 profesores. Cada uno lo evalúa con
 * esta rúbrica de 100 puntos (las partes del plan y la defensa); la nota es el promedio de los dos y se aprueba con 70.
 */
export const PARTES_PLAN = [
  "El llamado y la visión",
  "El diagnóstico",
  "Las metas",
  "El equipo",
  "Los recursos",
  "El calendario",
  "La evaluación",
  "El cuidado personal",
] as const;
export const APRUEBA_PROYECTO = 70;
export const PROFESORES_DEFENSA = 2;
export const RUBRICA_PROYECTO = [
  { id: "vision", corto: "Llamado, visión y base bíblica", texto: "El llamado y la visión, con su base bíblica", max: 15 },
  { id: "diagnostico", corto: "Diagnóstico", texto: "El diagnóstico: las fortalezas, las debilidades, las oportunidades y los riesgos", max: 10 },
  { id: "metas", corto: "Metas", texto: "Las metas: pocas, claras, que se puedan medir y con fecha", max: 15 },
  { id: "medios", corto: "Equipo, recursos y calendario", texto: "El equipo y su formación, los recursos con su presupuesto y el calendario", max: 15 },
  { id: "cuidado", corto: "Evaluación y cuidado personal", texto: "La evaluación con su rendición de cuentas y el cuidado personal", max: 15 },
  { id: "defensa", corto: "La defensa en vivo", texto: "La defensa en vivo: claridad, dominio del plan y respuestas a las preguntas", max: 30 },
] as const;
export type CriterioProyecto = (typeof RUBRICA_PROYECTO)[number]["id"];
/** La defensa del proyecto: cuándo (hora de Texas) y dónde, en persona o en línea, ante qué profesores, y sus evaluaciones. */
export type DefensaProyecto = {
  fecha: string;
  hora: string;
  lugar: string | null;
  enlace: string | null;
  profesores: string[];
  evaluaciones: { evaluador: string; rubrica: Record<CriterioProyecto, number>; nota: number }[] | null;
};
/** La defensa se programa desde un mes atrás (si ya se hizo) hasta seis meses adelante. */
export const LIMITES_DEFENSA = { diasAntes: 31, diasDespues: 183 } as const;

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
/** «2026-12-05» → «5 de diciembre de 2026» (igual en el servidor y en el navegador). */
export const fechaLarga = (f: string): string => `${Number(f.slice(8, 10))} de ${MESES[Number(f.slice(5, 7)) - 1]} de ${f.slice(0, 4)}`;
/** Cuándo es la defensa, como se le dice al alumno. */
export const cuandoDefensa = (d: { fecha: string; hora: string }): string => `el ${fechaLarga(d.fecha)} a las ${d.hora} (hora de Texas)`;

export type ActividadVista = {
  id: number;
  tipo: TipoActividad;
  nivel: number;
  fecha: string;
  hasta: string | null;
  persona: string | null;
  resultado: string | null;
  lugar: string | null;
  lider: string | null;
  /** La práctica: sus horas. */
  horas: number | null;
  /** La enseñanza: el pasaje y el tema. */
  titulo: string | null;
  /** La enseñanza: el enlace de la grabación (https). */
  enlace: string | null;
  /** La consolidación: los pasos del plan que acompañó. */
  pasos: PasoConsolidacion[] | null;
  /** El sermón evaluado: su nota de 0 a 100 y la evaluación de la Administración. */
  nota: number | null;
  evaluacion: EvaluacionSermon | null;
  /** El proyecto final: su defensa programada y, después, las evaluaciones de los profesores. */
  defensa: DefensaProyecto | null;
  detalle: string;
  estado: EstadoActividad;
  motivo: string | null;
  revisada: string | null;
  creada: string;
};

type Conteo = { confirmadas: number; pendientes: number; devueltas: number; hecho: boolean };

export type ResumenActividades = {
  pide: PideNivel;
  evangelismo: Conteo;
  servicio: { confirmado: boolean; pendiente: boolean; dias: number | null; hecho: boolean };
  /** Las horas confirmadas y las que esperan su confirmación. */
  practica: { horas: number; porConfirmar: number; hecho: boolean };
  ensenanza: Conteo;
  consolidacion: Conteo;
  /** `nota`: la del sermón aprobado o, si no, la del último evaluado. */
  sermon: Conteo & { nota: number | null };
  /** `defensa`: la del proyecto que espera su evaluación, si ya está programada. */
  proyecto: Conteo & { nota: number | null; defensa: { fecha: string; hora: string } | null };
  /** Las personas que acompaña como mentor: las que terminaron el Nivel 1 mientras las acompañaba y las que siguen en él. */
  acompanar: { terminaron: number; enCurso: number; hecho: boolean; pedido?: string | null };
};

export type ActividadesNivel = ResumenActividades & {
  nivel: number;
  lista: ActividadVista[];
  /** Se registran después de completar el nivel anterior (si no, `motivo` dice por qué). */
  puedeRegistrar: boolean;
  motivo: string | null;
};

/** Una actividad en la lista de la Administración, con su alumno. */
export type ActividadRevision = ActividadVista & { alumno: { userId: number; nombre: string; matricula: string | null } };
export type ActividadesPanel = { pendientes: ActividadRevision[]; recientes: ActividadRevision[] };

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

/** ¿Es una fecha AAAA-MM-DD que existe? */
export function fechaValida(s: unknown): s is string {
  if (typeof s !== "string" || !FECHA.test(s)) return false;
  const [a, m, d] = s.split("-").map(Number);
  const f = new Date(Date.UTC(a, m - 1, d));
  return f.getUTCFullYear() === a && f.getUTCMonth() === m - 1 && f.getUTCDate() === d;
}

/** Días de una fecha a otra (AAAA-MM-DD), sin zonas horarias. */
export function diasEntre(desde: string, hasta: string): number {
  const a = Date.UTC(+desde.slice(0, 4), +desde.slice(5, 7) - 1, +desde.slice(8, 10));
  const b = Date.UTC(+hasta.slice(0, 4), +hasta.slice(5, 7) - 1, +hasta.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

/** Los días que cubre un servicio: hasta su fin o, si sigue, hasta hoy. */
export function diasDeServicio(a: { fecha: string; hasta: string | null }, hoy: string): number {
  const fin = a.hasta && a.hasta < hoy ? a.hasta : hoy;
  return Math.max(0, diasEntre(a.fecha, fin));
}

/** Las horas de una práctica: un número de media en media hora, desde media hora (acepta «1,5»). */
export function horasDe(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v.trim().replace(",", ".")) : NaN;
  if (!Number.isFinite(n) || n < 0.5) return null;
  const medias = Math.round(n * 2);
  return Math.abs(n * 2 - medias) > 1e-9 ? null : medias / 2;
}

/** Las horas como se escriben: «20», «1,5». */
export const horasTexto = (h: number): string => String(h).replace(".", ",");

/** Un enlace https con su sitio, sin espacios ni usuario y contraseña (devuelve el enlace normalizado, o null). */
export function enlaceValido(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s || s.length > LIMITES_ACTIVIDAD.enlace || /\s/.test(s)) return null;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" || !u.hostname.includes(".") || u.username || u.password) return null;
    return u.href.length > LIMITES_ACTIVIDAD.enlace ? null : u.href;
  } catch {
    return null;
  }
}

const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export type DatosActividad = {
  tipo: TipoActividad;
  fecha: string;
  hasta: string | null;
  persona: string | null;
  resultado: string | null;
  lugar: string | null;
  lider: string | null;
  horas: number | null;
  titulo: string | null;
  enlace: string | null;
  pasos: PasoConsolidacion[] | null;
  detalle: string;
};

const PIDE_FECHA: Record<TipoActividad, string> = {
  evangelismo: "Escribe la fecha de la conversación.",
  servicio: "Escribe la fecha en que empezaste a servir.",
  practica: "Escribe la fecha de la práctica (si fue un período, el día en que empezó).",
  ensenanza: "Escribe la fecha en que grabaste la enseñanza.",
  consolidacion: "Escribe la fecha en que empezaste a acompañarlo.",
  sermon: "Escribe la fecha en que predicaste o grabaste el sermón.",
  proyecto: "Escribe la fecha en que terminaste el plan.",
};

const PIDE_DETALLE: Record<TipoActividad, string> = {
  evangelismo: "de qué hablaron y cómo terminó",
  servicio: "qué haces en ese ministerio",
  practica: "qué hiciste en la práctica",
  ensenanza: "la idea central y el propósito de tu enseñanza",
  consolidacion: "cómo fue el acompañamiento",
  sermon: "la idea central y el propósito de tu sermón",
  proyecto: "el ministerio del plan y su meta principal",
};

type Validacion = { ok: true; datos: DatosActividad } | { ok: false; error: string };

/**
 * Revisa lo que manda el alumno. Devuelve los datos limpios o el primer problema, para mostrarlo tal cual.
 * `tipos`: las actividades que pide el nivel (las demás no se registran en él).
 */
export function validarActividad(cuerpo: any, hoy: string, tipos: readonly TipoActividad[] = TIPOS_ACTIVIDAD): Validacion {
  const tipo = TIPOS_ACTIVIDAD.includes(cuerpo?.tipo) ? (cuerpo.tipo as TipoActividad) : null;
  if (!tipo) return { ok: false, error: "Elige qué actividad registras." };
  if (!tipos.includes(tipo)) return { ok: false, error: "Este nivel no pide esa actividad." };
  const fecha = cuerpo?.fecha;
  if (!fechaValida(fecha)) return { ok: false, error: PIDE_FECHA[tipo] };
  if (fecha > hoy) return { ok: false, error: "La fecha no puede ser futura." };
  if (diasEntre(fecha, hoy) > LIMITES_ACTIVIDAD.diasAtras) return { ok: false, error: "La fecha es demasiado antigua: registra actividades de los dos últimos años." };
  const detalle = limpio(cuerpo?.detalle, LIMITES_ACTIVIDAD.detalleMax);
  if (detalle.length < LIMITES_ACTIVIDAD.detalleMin) return { ok: false, error: `Cuenta un poco más (al menos ${LIMITES_ACTIVIDAD.detalleMin} letras): ${PIDE_DETALLE[tipo]}.` };
  const vacio = { hasta: null, persona: null, resultado: null, lugar: null, lider: null, horas: null, titulo: null, enlace: null, pasos: null };
  // la fecha en que terminó (opcional): no antes de empezar ni en el futuro
  const hastaDe = (siSigue: string): { ok: true; hasta: string | null } | { ok: false; error: string } => {
    if (cuerpo?.hasta == null || cuerpo.hasta === "") return { ok: true, hasta: null };
    if (!fechaValida(cuerpo.hasta)) return { ok: false, error: "La fecha en que terminaste no es válida." };
    if (cuerpo.hasta < fecha) return { ok: false, error: "La fecha en que terminaste no puede ser anterior a la de inicio." };
    if (cuerpo.hasta > hoy) return { ok: false, error: siSigue };
    return { ok: true, hasta: cuerpo.hasta };
  };

  if (tipo === "evangelismo") {
    const persona = limpio(cuerpo?.persona, LIMITES_ACTIVIDAD.persona);
    if (persona.length < 2) return { ok: false, error: "Escribe con quién hablaste: la relación o sus iniciales, sin el nombre completo." };
    const r = limpio(cuerpo?.resultado, 60);
    const resultado = (RESULTADOS_EVANGELISMO as readonly string[]).includes(r) ? r : null;
    return { ok: true, datos: { ...vacio, tipo, fecha, persona, resultado, detalle } };
  }

  if (tipo === "servicio" || tipo === "practica") {
    const lugar = limpio(cuerpo?.lugar, LIMITES_ACTIVIDAD.lugar);
    if (lugar.length < 3) return { ok: false, error: tipo === "servicio" ? "Escribe en qué ministerio sirves." : "Escribe en qué ministerio o lugar hiciste la práctica." };
    const lider = limpio(cuerpo?.lider, LIMITES_ACTIVIDAD.lider);
    if (lider.length < 3) {
      return {
        ok: false,
        error: tipo === "servicio" ? "Escribe quién es el líder de ese ministerio, para poder confirmarlo." : "Escribe quién te supervisó (el líder del ministerio o tu pastor), para poder confirmarla.",
      };
    }
    const h = hastaDe(tipo === "servicio" ? "La fecha en que terminaste no puede ser futura: si sigues sirviendo, déjala vacía." : "La fecha en que terminó el período no puede ser futura.");
    if (!h.ok) return h;
    if (tipo === "servicio") return { ok: true, datos: { ...vacio, tipo, fecha, hasta: h.hasta, lugar, lider, detalle } };
    // la práctica de un solo día no lleva «hasta»
    const hasta = h.hasta === fecha ? null : h.hasta;
    const horas = horasDe(cuerpo?.horas);
    if (horas == null) return { ok: false, error: "Escribe cuántas horas fueron, de media hora en media hora (por ejemplo, 2 o 1,5)." };
    const tope = hasta ? Math.min(LIMITES_ACTIVIDAD.horasPeriodo, LIMITES_ACTIVIDAD.horasDia * (diasEntre(fecha, hasta) + 1)) : LIMITES_ACTIVIDAD.horasDia;
    if (horas > tope) {
      return {
        ok: false,
        error: hasta
          ? `Son demasiadas horas para ese período: registra hasta ${tope} o divídelo en varios registros.`
          : `En un día se registran hasta ${LIMITES_ACTIVIDAD.horasDia} horas: si fue un período, escribe también hasta cuándo.`,
      };
    }
    return { ok: true, datos: { ...vacio, tipo, fecha, hasta, lugar, lider, horas, detalle } };
  }

  if (tipo === "ensenanza") {
    const titulo = limpio(cuerpo?.titulo, LIMITES_ACTIVIDAD.titulo);
    if (titulo.length < 5) return { ok: false, error: "Escribe el pasaje y el tema de tu enseñanza." };
    const enlace = enlaceValido(cuerpo?.enlace);
    if (!enlace) {
      return { ok: false, error: "Pega el enlace de la grabación, que empiece con https:// (por ejemplo, un video no listado de YouTube o un archivo compartido de Google Drive)." };
    }
    const lugar = limpio(cuerpo?.lugar, LIMITES_ACTIVIDAD.lugar) || null;
    return { ok: true, datos: { ...vacio, tipo, fecha, titulo, enlace, lugar, detalle } };
  }

  if (tipo === "sermon") {
    const titulo = limpio(cuerpo?.titulo, LIMITES_ACTIVIDAD.titulo);
    if (titulo.length < 5) return { ok: false, error: "Escribe el pasaje y el tema de tu sermón." };
    const lugar = limpio(cuerpo?.lugar, LIMITES_ACTIVIDAD.lugar) || null;
    const conEnlace = cuerpo?.enlace != null && String(cuerpo.enlace).trim() !== "";
    const enlace = conEnlace ? enlaceValido(cuerpo.enlace) : null;
    if (cuerpo?.modo === "vivo") {
      // en vivo: lo escuchó un maestro de la academia (el enlace, si hay grabación, es opcional)
      if (!lugar || lugar.length < 3) return { ok: false, error: "Escribe dónde lo predicaste: la iglesia y el culto." };
      const lider = limpio(cuerpo?.lider, LIMITES_ACTIVIDAD.lider);
      if (lider.length < 3) return { ok: false, error: "Escribe qué maestro de la academia lo escuchó en vivo." };
      if (conEnlace && !enlace) return { ok: false, error: "El enlace de la grabación debe empezar con https://." };
      return { ok: true, datos: { ...vacio, tipo, fecha, titulo, lugar, lider, enlace, detalle } };
    }
    if (!enlace) {
      return {
        ok: false,
        error: "Pega el enlace de la grabación del sermón completo, que empiece con https://, o elige «en vivo» si lo escuchó un maestro de la academia.",
      };
    }
    return { ok: true, datos: { ...vacio, tipo, fecha, titulo, enlace, lugar, detalle } };
  }

  if (tipo === "proyecto") {
    const titulo = limpio(cuerpo?.titulo, LIMITES_ACTIVIDAD.titulo);
    if (titulo.length < 5) return { ok: false, error: "Escribe el nombre de tu plan de ministerio." };
    const enlace = enlaceValido(cuerpo?.enlace);
    if (!enlace) return { ok: false, error: "Pega el enlace del plan escrito, que empiece con https:// (un documento de Google o un PDF compartido, por ejemplo)." };
    const lider = limpio(cuerpo?.lider, LIMITES_ACTIVIDAD.lider);
    if (lider.length < 3) return { ok: false, error: "Escribe con quién lo revisaste: tu pastor o tu mentor." };
    if (cuerpo?.partes !== true) return { ok: false, error: `Confirma que tu plan tiene sus ${PARTES_PLAN.length} partes.` };
    return { ok: true, datos: { ...vacio, tipo, fecha, titulo, enlace, lider, detalle } };
  }

  // la consolidación de un nuevo creyente
  const persona = limpio(cuerpo?.persona, LIMITES_ACTIVIDAD.persona);
  if (persona.length < 2) return { ok: false, error: "Escribe a quién acompañaste: la relación o sus iniciales, sin el nombre completo." };
  const lider = limpio(cuerpo?.lider, LIMITES_ACTIVIDAD.lider);
  if (lider.length < 3) return { ok: false, error: "Escribe el pastor o líder de tu iglesia que coordinó la consolidación, para poder confirmarla." };
  const h = hastaDe("La fecha en que terminaste no puede ser futura: si sigues acompañándolo, déjala vacía.");
  if (!h.ok) return h;
  const marcados: unknown[] = Array.isArray(cuerpo?.pasos) ? cuerpo.pasos : [];
  const pasos = PASOS_CONSOLIDACION.map((p) => p.id).filter((id) => marcados.includes(id));
  if (pasos.length < PASOS_MINIMOS) return { ok: false, error: `Marca los pasos del plan que acompañaste: al menos ${PASOS_MINIMOS} de los ${PASOS_CONSOLIDACION.length}.` };
  return { ok: true, datos: { ...vacio, tipo, fecha, hasta: h.hasta, persona, lider, pasos, detalle } };
}

type ParaResumir = Pick<ActividadVista, "tipo" | "estado" | "fecha" | "hasta"> & { horas?: number | null; nota?: number | null; defensa?: DefensaProyecto | null };

function conteo(lista: ParaResumir[], tipo: TipoActividad, pide: number | undefined): Conteo {
  const de = lista.filter((a) => a.tipo === tipo);
  const confirmadas = de.filter((a) => a.estado === "confirmada").length;
  return {
    confirmadas,
    pendientes: de.filter((a) => a.estado === "pendiente").length,
    devueltas: de.filter((a) => a.estado === "rechazada").length,
    hecho: confirmadas >= (pide ?? 0),
  };
}

/**
 * El avance de un alumno en las actividades de su nivel. `acompanados`: lo que cuenta la academia de las personas que
 * acompaña como mentor (Nivel 5).
 */
export function resumirActividades(
  pide: PideNivel,
  lista: ParaResumir[],
  hoy: string,
  acompanados: { terminaron: number; enCurso: number; pedido?: string | null } = { terminaron: 0, enCurso: 0 },
): ResumenActividades {
  const servicios = lista.filter((a) => a.tipo === "servicio");
  const confirmados = servicios.filter((a) => a.estado === "confirmada");
  const dias = confirmados.length ? Math.max(...confirmados.map((a) => diasDeServicio(a, hoy))) : null;
  const practicas = lista.filter((a) => a.tipo === "practica");
  const horasDeLas = (estado: EstadoActividad) => practicas.filter((a) => a.estado === estado).reduce((s, a) => s + (Number(a.horas) || 0), 0);
  const horas = horasDeLas("confirmada");
  const sermones = lista.filter((a) => a.tipo === "sermon");
  const evaluado = sermones.find((a) => a.estado === "confirmada") ?? sermones.find((a) => a.nota != null);
  const proyectos = lista.filter((a) => a.tipo === "proyecto");
  const pEvaluado = proyectos.find((a) => a.estado === "confirmada") ?? proyectos.find((a) => a.nota != null);
  const pDefensa = proyectos.find((a) => a.estado === "pendiente")?.defensa;
  return {
    pide,
    evangelismo: conteo(lista, "evangelismo", pide.evangelismo),
    servicio: {
      confirmado: confirmados.length > 0,
      pendiente: servicios.some((a) => a.estado === "pendiente"),
      dias,
      hecho: !pide.servicioDias || (dias != null && dias >= pide.servicioDias),
    },
    practica: { horas, porConfirmar: horasDeLas("pendiente"), hecho: horas >= (pide.practicaHoras ?? 0) },
    ensenanza: conteo(lista, "ensenanza", pide.ensenanza),
    consolidacion: conteo(lista, "consolidacion", pide.consolidacion),
    sermon: { ...conteo(lista, "sermon", pide.sermon), nota: evaluado?.nota ?? null },
    proyecto: {
      ...conteo(lista, "proyecto", pide.proyecto),
      nota: pEvaluado?.nota ?? null,
      defensa: pDefensa ? { fecha: pDefensa.fecha, hora: pDefensa.hora } : null,
    },
    acompanar: { ...acompanados, hecho: acompanados.terminaron >= (pide.acompanar ?? 0) },
  };
}

/** Los puntos de un criterio: un entero (acepta texto); null si falta o no es entero. */
function puntosDe(crudo: unknown): number | null {
  const v = typeof crudo === "number" ? crudo : typeof crudo === "string" && crudo.trim() ? Number(crudo) : NaN;
  return Number.isInteger(v) ? v : null;
}

/** Revisa la defensa que programa la Administración: fecha, hora, dónde (o el enlace) y los 2 profesores. */
export function validarDefensa(cuerpo: any, hoy: string): { ok: true; defensa: Omit<DefensaProyecto, "evaluaciones"> } | { ok: false; error: string } {
  const fecha = cuerpo?.fecha;
  if (!fechaValida(fecha)) return { ok: false, error: "Escribe la fecha de la defensa." };
  const dias = diasEntre(hoy, fecha);
  if (dias < -LIMITES_DEFENSA.diasAntes || dias > LIMITES_DEFENSA.diasDespues) {
    return { ok: false, error: "La fecha de la defensa debe estar entre el último mes y los próximos seis meses." };
  }
  const hora = typeof cuerpo?.hora === "string" ? cuerpo.hora.trim() : "";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) return { ok: false, error: "Escribe la hora de la defensa, de 00:00 a 23:59 (por ejemplo, 19:00)." };
  const lugar = limpio(cuerpo?.lugar, LIMITES_ACTIVIDAD.lugar) || null;
  const conEnlace = cuerpo?.enlace != null && String(cuerpo.enlace).trim() !== "";
  const enlace = conEnlace ? enlaceValido(cuerpo.enlace) : null;
  if (conEnlace && !enlace) return { ok: false, error: "El enlace de la reunión debe empezar con https://." };
  if (!lugar && !enlace) return { ok: false, error: "Escribe dónde será la defensa o el enlace de la reunión en línea." };
  const profesores = (Array.isArray(cuerpo?.profesores) ? cuerpo.profesores : []).map((x: unknown) => limpio(x, LIMITES_ACTIVIDAD.lider)).filter((x: string) => x.length >= 3);
  if (profesores.length !== PROFESORES_DEFENSA || profesores[0].toLowerCase() === profesores[1].toLowerCase()) {
    return { ok: false, error: `Escribe los ${PROFESORES_DEFENSA} profesores que escucharán la defensa (dos personas distintas).` };
  }
  return { ok: true, defensa: { fecha, hora, lugar, enlace, profesores } };
}

/** Revisa las evaluaciones del proyecto: una por profesor, cada criterio dentro de su máximo. La nota es el promedio. */
export function validarEvaluacionProyecto(cuerpo: any): { ok: true; evaluaciones: NonNullable<DefensaProyecto["evaluaciones"]>; nota: number } | { ok: false; error: string } {
  const lista: any[] = Array.isArray(cuerpo?.evaluaciones) ? cuerpo.evaluaciones : [];
  if (lista.length !== PROFESORES_DEFENSA) return { ok: false, error: `Pon la evaluación de los ${PROFESORES_DEFENSA} profesores.` };
  const out: NonNullable<DefensaProyecto["evaluaciones"]> = [];
  for (let i = 0; i < lista.length; i++) {
    const evaluador = limpio(lista[i]?.evaluador, LIMITES_ACTIVIDAD.lider);
    if (evaluador.length < 3) return { ok: false, error: `Escribe el nombre del profesor ${i + 1}.` };
    const rubrica = {} as Record<CriterioProyecto, number>;
    for (const c of RUBRICA_PROYECTO) {
      const v = puntosDe(lista[i]?.rubrica?.[c.id]);
      if (v == null || v < 0 || v > c.max) return { ok: false, error: `Profesor ${i + 1}: «${c.corto}» va de 0 a ${c.max} puntos.` };
      rubrica[c.id] = v;
    }
    out.push({ evaluador, rubrica, nota: RUBRICA_PROYECTO.reduce((t, c) => t + rubrica[c.id], 0) });
  }
  if (out[0].evaluador.toLowerCase() === out[1].evaluador.toLowerCase()) return { ok: false, error: "Los dos profesores deben ser personas distintas." };
  return { ok: true, evaluaciones: out, nota: Math.round(out.reduce((t, e) => t + e.nota, 0) / out.length) };
}

/** Revisa la evaluación de un sermón: cada criterio entre 0 y su máximo, y quién lo evaluó. Devuelve también la nota. */
export function validarEvaluacion(cuerpo: any): { ok: true; evaluacion: EvaluacionSermon; nota: number } | { ok: false; error: string } {
  const r = cuerpo?.rubrica;
  if (!r || typeof r !== "object") return { ok: false, error: "Pon los puntos de cada criterio de la rúbrica." };
  const rubrica = {} as Record<CriterioSermon, number>;
  for (const c of RUBRICA_SERMON) {
    const v = puntosDe(r[c.id]);
    if (v == null || v < 0 || v > c.max) return { ok: false, error: `«${c.corto}» va de 0 a ${c.max} puntos.` };
    rubrica[c.id] = v;
  }
  const evaluador = limpio(cuerpo?.evaluador, LIMITES_ACTIVIDAD.lider);
  if (evaluador.length < 3) return { ok: false, error: "Escribe qué maestro de la academia evaluó el sermón." };
  return { ok: true, evaluacion: { rubrica, evaluador }, nota: RUBRICA_SERMON.reduce((s, c) => s + rubrica[c.id], 0) };
}

/** Lo que se le muestra al alumno en cada requisito del nivel. */
export function detalleEvangelismo(r: ResumenActividades): string {
  const pide = r.pide.evangelismo ?? 0;
  const base = `${Math.min(r.evangelismo.confirmadas, pide)} de ${pide} confirmadas`;
  return r.evangelismo.pendientes ? `${base} · ${r.evangelismo.pendientes} por confirmar` : base;
}

export function detalleServicio(r: ResumenActividades): string {
  if (r.servicio.hecho) return "Confirmado";
  if (r.servicio.confirmado) return `Confirmado · ${r.servicio.dias ?? 0} de ${r.pide.servicioDias} días`;
  if (r.servicio.pendiente) return "Registrado · por confirmar";
  return "Sin registrar";
}

export function detallePractica(r: ResumenActividades): string {
  const pide = r.pide.practicaHoras ?? 0;
  const base = `${horasTexto(Math.min(r.practica.horas, pide))} de ${pide} horas confirmadas`;
  return r.practica.porConfirmar ? `${base} · ${horasTexto(r.practica.porConfirmar)} por confirmar` : base;
}

export function detalleEnsenanza(r: ResumenActividades): string {
  if (r.ensenanza.hecho) return "Aprobada";
  if (r.ensenanza.pendientes) return "Enviada · por revisar";
  if (r.ensenanza.devueltas) return "Devuelta · corrígela y envíala otra vez";
  return "Sin enviar";
}

export function detalleConsolidacion(r: ResumenActividades): string {
  if (r.consolidacion.hecho) return "Confirmada";
  if (r.consolidacion.pendientes) return "Registrada · por confirmar";
  if (r.consolidacion.devueltas) return "Devuelta · corrígela y regístrala otra vez";
  return "Sin registrar";
}

export function detalleSermon(r: ResumenActividades): string {
  if (r.sermon.hecho) return r.sermon.nota != null ? `Aprobado con ${r.sermon.nota}` : "Aprobado";
  if (r.sermon.pendientes) return "Enviado · por evaluar";
  if (r.sermon.devueltas) return r.sermon.nota != null ? `Evaluado con ${r.sermon.nota} · prepáralo otra vez` : "Devuelto · corrígelo y envíalo otra vez";
  return "Sin enviar";
}

export function detalleProyecto(r: ResumenActividades): string {
  if (r.proyecto.hecho) return r.proyecto.nota != null ? `Aprobado con ${r.proyecto.nota}` : "Aprobado";
  if (r.proyecto.pendientes) return r.proyecto.defensa ? `Defensa ${cuandoDefensa(r.proyecto.defensa)}` : "Entregado · por programar la defensa";
  if (r.proyecto.devueltas) return r.proyecto.nota != null ? `Evaluado con ${r.proyecto.nota} · mejóralo y entrégalo otra vez` : "Devuelto · corrígelo y entrégalo otra vez";
  return "Sin entregar";
}

export function detalleAcompanar(r: ResumenActividades): string {
  const pide = r.pide.acompanar ?? 0;
  const base = `${Math.min(r.acompanar.terminaron, pide)} de ${pide} terminaron el Nivel 1`;
  return !r.acompanar.hecho && r.acompanar.enCurso ? `${base} · ${r.acompanar.enCurso} en el Nivel 1` : base;
}

/** El texto de cada requisito, como en los requisitos de `NIVELES`. */
export function textoRequisito(tipo: TipoActividad, pide: PideNivel): string {
  const n = pide[CAMPO[tipo]] ?? 0;
  switch (tipo) {
    case "evangelismo":
      return `${n} conversaciones de evangelismo registradas`;
    case "servicio":
      return "Servir 1 mes en un ministerio";
    case "practica":
      return `${n} horas de práctica confirmada`;
    case "ensenanza":
      return n === 1 ? "Una enseñanza grabada aprobada" : `${n} enseñanzas grabadas aprobadas`;
    case "consolidacion":
      return n === 1 ? "Consolidar a 1 nuevo creyente" : `Consolidar a ${n} nuevos creyentes`;
    case "sermon":
      return n === 1 ? "Un sermón evaluado con rúbrica" : `${n} sermones evaluados con rúbrica`;
    case "proyecto":
      return "El proyecto final con defensa en vivo";
  }
}

const DETALLE: Record<TipoActividad, (r: ResumenActividades) => string> = {
  evangelismo: detalleEvangelismo,
  servicio: detalleServicio,
  practica: detallePractica,
  ensenanza: detalleEnsenanza,
  consolidacion: detalleConsolidacion,
  sermon: detalleSermon,
  proyecto: detalleProyecto,
};

/**
 * Los requisitos del nivel que salen de sus actividades (sin sesión, `r` es null y quedan pendientes), y en el Nivel 5
 * el acompañamiento, que cuenta la academia.
 */
export function requisitosDeActividades(
  pide: PideNivel,
  r: ResumenActividades | null,
): { id: TipoActividad | "acompanar"; texto: string; hecho: boolean; detalle: string }[] {
  const out: { id: TipoActividad | "acompanar"; texto: string; hecho: boolean; detalle: string }[] = tiposDe(pide).map((tipo) => ({
    id: tipo,
    texto: textoRequisito(tipo, pide),
    hecho: !!r?.[tipo].hecho,
    detalle: r ? DETALLE[tipo](r) : "Pendiente",
  }));
  if (pide.acompanar) {
    out.push({
      id: "acompanar",
      texto: `Acompañar a ${pide.acompanar} personas hasta terminar el Nivel 1`,
      hecho: !!r?.acompanar.hecho,
      detalle: r ? detalleAcompanar(r) : "Pendiente",
    });
  }
  return out;
}
