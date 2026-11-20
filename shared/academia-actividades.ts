/**
 * Las actividades que pide un nivel además de sus materias (docs/academia.md, «Las actividades del nivel»):
 * - en el Nivel 2, 3 conversaciones de evangelismo y servir 1 mes en un ministerio;
 * - en el Nivel 3, 20 horas de práctica ministerial, una enseñanza grabada aprobada y consolidar a 1 nuevo creyente.
 *
 * El alumno las registra desde la página del nivel y la Administración las confirma (o las devuelve con un motivo) en
 * «Para revisar». Cuentan las confirmadas; el servicio, además, cuando ya pasaron sus días desde que empezó, y la
 * práctica, por sus horas confirmadas.
 * Las fechas van como texto AAAA-MM-DD (día de Texas): así no las mueve la zona horaria de la base ni del servidor.
 */
import type { NivelN } from "./academia";

export type TipoActividad = "evangelismo" | "servicio" | "practica" | "ensenanza" | "consolidacion";
export type EstadoActividad = "pendiente" | "confirmada" | "rechazada";

/** Lo que pide un nivel: cuántas de cada una (el servicio, en días; la práctica, en horas). */
export type PideNivel = {
  evangelismo?: number;
  servicioDias?: number;
  practicaHoras?: number;
  ensenanza?: number;
  consolidacion?: number;
};

/** Lo que pide cada nivel (sus textos están en los requisitos de `NIVELES` y en el reglamento). */
export const ACTIVIDADES_NIVEL: Partial<Record<NivelN, PideNivel>> = {
  2: { evangelismo: 3, servicioDias: 28 },
  3: { practicaHoras: 20, ensenanza: 1, consolidacion: 1 },
};

const CAMPO: Record<TipoActividad, keyof PideNivel> = {
  evangelismo: "evangelismo",
  servicio: "servicioDias",
  practica: "practicaHoras",
  ensenanza: "ensenanza",
  consolidacion: "consolidacion",
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
};

const PIDE_DETALLE: Record<TipoActividad, string> = {
  evangelismo: "de qué hablaron y cómo terminó",
  servicio: "qué haces en ese ministerio",
  practica: "qué hiciste en la práctica",
  ensenanza: "la idea central y el propósito de tu enseñanza",
  consolidacion: "cómo fue el acompañamiento",
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

type ParaResumir = Pick<ActividadVista, "tipo" | "estado" | "fecha" | "hasta"> & { horas?: number | null };

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

/** El avance de un alumno en las actividades de su nivel. */
export function resumirActividades(pide: PideNivel, lista: ParaResumir[], hoy: string): ResumenActividades {
  const servicios = lista.filter((a) => a.tipo === "servicio");
  const confirmados = servicios.filter((a) => a.estado === "confirmada");
  const dias = confirmados.length ? Math.max(...confirmados.map((a) => diasDeServicio(a, hoy))) : null;
  const practicas = lista.filter((a) => a.tipo === "practica");
  const horasDeLas = (estado: EstadoActividad) => practicas.filter((a) => a.estado === estado).reduce((s, a) => s + (Number(a.horas) || 0), 0);
  const horas = horasDeLas("confirmada");
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
  };
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
  }
}

const DETALLE: Record<TipoActividad, (r: ResumenActividades) => string> = {
  evangelismo: detalleEvangelismo,
  servicio: detalleServicio,
  practica: detallePractica,
  ensenanza: detalleEnsenanza,
  consolidacion: detalleConsolidacion,
};

/** Los requisitos del nivel que salen de sus actividades (sin sesión, `r` es null y quedan pendientes). */
export function requisitosDeActividades(pide: PideNivel, r: ResumenActividades | null): { id: TipoActividad; texto: string; hecho: boolean; detalle: string }[] {
  return tiposDe(pide).map((tipo) => ({
    id: tipo,
    texto: textoRequisito(tipo, pide),
    hecho: !!r?.[tipo].hecho,
    detalle: r ? DETALLE[tipo](r) : "Pendiente",
  }));
}
