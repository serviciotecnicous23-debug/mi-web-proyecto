/**
 * Las actividades que pide un nivel además de sus materias (docs/academia.md, «Las actividades del nivel»).
 * En el Nivel 2: 3 conversaciones de evangelismo y servir 1 mes en un ministerio.
 *
 * El alumno las registra desde la página del nivel y la Administración las confirma (o las devuelve con un motivo) en
 * «Para revisar». Cuentan las confirmadas; el servicio, además, cuando ya pasaron sus días desde que empezó.
 * Las fechas van como texto AAAA-MM-DD (día de Texas): así no las mueve la zona horaria de la base ni del servidor.
 */
import type { NivelN } from "./academia";

export type TipoActividad = "evangelismo" | "servicio";
export type EstadoActividad = "pendiente" | "confirmada" | "rechazada";

/** Lo que pide cada nivel. */
export const ACTIVIDADES_NIVEL: Partial<Record<NivelN, { evangelismo: number; servicioDias: number }>> = {
  2: { evangelismo: 3, servicioDias: 28 },
};

export const LIMITES_ACTIVIDAD = {
  detalleMin: 30,
  detalleMax: 800,
  persona: 60,
  lugar: 80,
  lider: 80,
  /** Registros de cada tipo por nivel (de sobra para 3 conversaciones y un servicio). */
  porTipo: 20,
  /** Hasta cuántos días atrás se puede fechar una actividad. */
  diasAtras: 730,
  motivoMin: 5,
  motivoMax: 400,
} as const;

/** Cómo terminó la conversación (opcional, para el seguimiento). */
export const RESULTADOS_EVANGELISMO = [
  "Escuchó el evangelio",
  "Oramos juntos",
  "Quiere saber más",
  "Recibió a Cristo",
  "Lo invité a la iglesia",
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
  detalle: string;
  estado: EstadoActividad;
  motivo: string | null;
  revisada: string | null;
  creada: string;
};

export type ResumenActividades = {
  pide: { evangelismo: number; servicioDias: number };
  evangelismo: { confirmadas: number; pendientes: number; hecho: boolean };
  servicio: { confirmado: boolean; pendiente: boolean; dias: number | null; hecho: boolean };
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

const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export type DatosActividad = {
  tipo: TipoActividad;
  fecha: string;
  hasta: string | null;
  persona: string | null;
  resultado: string | null;
  lugar: string | null;
  lider: string | null;
  detalle: string;
};

/** Revisa lo que manda el alumno. Devuelve los datos limpios o el primer problema, para mostrarlo tal cual. */
export function validarActividad(cuerpo: any, hoy: string): { ok: true; datos: DatosActividad } | { ok: false; error: string } {
  const tipo = cuerpo?.tipo === "evangelismo" || cuerpo?.tipo === "servicio" ? (cuerpo.tipo as TipoActividad) : null;
  if (!tipo) return { ok: false, error: "Elige si es una conversación de evangelismo o un servicio." };
  const fecha = cuerpo?.fecha;
  if (!fechaValida(fecha)) return { ok: false, error: tipo === "servicio" ? "Escribe la fecha en que empezaste a servir." : "Escribe la fecha de la conversación." };
  if (fecha > hoy) return { ok: false, error: "La fecha no puede ser futura." };
  if (diasEntre(fecha, hoy) > LIMITES_ACTIVIDAD.diasAtras) return { ok: false, error: "La fecha es demasiado antigua: registra actividades de los dos últimos años." };
  const detalle = limpio(cuerpo?.detalle, LIMITES_ACTIVIDAD.detalleMax);
  if (detalle.length < LIMITES_ACTIVIDAD.detalleMin) {
    return { ok: false, error: `Cuenta un poco más (al menos ${LIMITES_ACTIVIDAD.detalleMin} letras): ${tipo === "servicio" ? "qué haces en ese ministerio" : "de qué hablaron y cómo terminó"}.` };
  }
  if (tipo === "evangelismo") {
    const persona = limpio(cuerpo?.persona, LIMITES_ACTIVIDAD.persona);
    if (persona.length < 2) return { ok: false, error: "Escribe con quién hablaste: la relación o sus iniciales, sin el nombre completo." };
    const r = limpio(cuerpo?.resultado, 60);
    const resultado = (RESULTADOS_EVANGELISMO as readonly string[]).includes(r) ? r : null;
    return { ok: true, datos: { tipo, fecha, hasta: null, persona, resultado, lugar: null, lider: null, detalle } };
  }
  const lugar = limpio(cuerpo?.lugar, LIMITES_ACTIVIDAD.lugar);
  if (lugar.length < 3) return { ok: false, error: "Escribe en qué ministerio sirves." };
  const lider = limpio(cuerpo?.lider, LIMITES_ACTIVIDAD.lider);
  if (lider.length < 3) return { ok: false, error: "Escribe quién es el líder de ese ministerio, para poder confirmarlo." };
  let hasta: string | null = null;
  if (cuerpo?.hasta != null && cuerpo.hasta !== "") {
    if (!fechaValida(cuerpo.hasta)) return { ok: false, error: "La fecha en que terminaste no es válida." };
    if (cuerpo.hasta < fecha) return { ok: false, error: "La fecha en que terminaste no puede ser anterior a la de inicio." };
    if (cuerpo.hasta > hoy) return { ok: false, error: "La fecha en que terminaste no puede ser futura: si sigues sirviendo, déjala vacía." };
    hasta = cuerpo.hasta;
  }
  return { ok: true, datos: { tipo, fecha, hasta, persona: null, resultado: null, lugar, lider, detalle } };
}

/** El avance de un alumno en las actividades de su nivel. */
export function resumirActividades(
  pide: { evangelismo: number; servicioDias: number },
  lista: Pick<ActividadVista, "tipo" | "estado" | "fecha" | "hasta">[],
  hoy: string,
): ResumenActividades {
  const ev = lista.filter((a) => a.tipo === "evangelismo");
  const confirmadas = ev.filter((a) => a.estado === "confirmada").length;
  const servicios = lista.filter((a) => a.tipo === "servicio");
  const confirmados = servicios.filter((a) => a.estado === "confirmada");
  const dias = confirmados.length ? Math.max(...confirmados.map((a) => diasDeServicio(a, hoy))) : null;
  return {
    pide,
    evangelismo: { confirmadas, pendientes: ev.filter((a) => a.estado === "pendiente").length, hecho: confirmadas >= pide.evangelismo },
    servicio: {
      confirmado: confirmados.length > 0,
      pendiente: servicios.some((a) => a.estado === "pendiente"),
      dias,
      hecho: dias != null && dias >= pide.servicioDias,
    },
  };
}

/** Lo que se le muestra al alumno en el requisito del nivel. */
export function detalleEvangelismo(r: ResumenActividades): string {
  const base = `${Math.min(r.evangelismo.confirmadas, r.pide.evangelismo)} de ${r.pide.evangelismo} confirmadas`;
  return r.evangelismo.pendientes ? `${base} · ${r.evangelismo.pendientes} por confirmar` : base;
}

export function detalleServicio(r: ResumenActividades): string {
  if (r.servicio.hecho) return "Confirmado";
  if (r.servicio.confirmado) return `Confirmado · ${r.servicio.dias ?? 0} de ${r.pide.servicioDias} días`;
  if (r.servicio.pendiente) return "Registrado · por confirmar";
  return "Sin registrar";
}
