/**
 * El año de Jerusalén (Jerusalén en línea): el juego avanza solo con el calendario REAL.
 *
 * «Mientras la tierra permanezca, no cesarán la sementera y la siega, el frío y el calor, el verano y el invierno,
 * y el día y la noche» (Génesis 8:22).
 *
 * - La fecha es la hebrea de verdad (el calendario hebreo que traen Node y los navegadores, a la hora de Texas): hoy
 *   puede ser «1 de Quisleu», y la Pascua cae cada año en su 14 de Abib.
 * - Las estaciones son las del año de la tierra de Israel (la lluvia temprana y la siembra, el invierno, la lluvia
 *   tardía y la siega de la cebada, la siega del trigo, el verano y la fiesta de la cosecha): cambian el cielo (la
 *   lluvia), el huerto (qué crece más rápido y si la lluvia lo riega) y los precios del mercader.
 * - Los eventos: las fiestas de Levítico 23 en sus fechas reales (shared/calendario.ts tiene sus textos), la luna
 *   nueva de cada mes con su «hora de las trompetas» (Números 10:10), el día de reposo de cada semana y las fiestas
 *   del ministerio (la Navidad, el Año Nuevo y la Semana Santa, contadas con las profecías de Isaías).
 *
 * Todo es lógica fija: lo que venga después se agrega como un EVENTO más en la lista EVENTOS_DEL_ANIO.
 * El ritmo del día (mañana, tarde y noche, cada 4 minutos) sigue en relojEnLinea (shared/calendario.ts).
 */
import { FIESTA, FIESTAS, MESES, type Fecha, type FiestaHoy, type FiestaId, type MesHebreo, type Verso } from "./calendario";

export const ZONA_JERUSALEN = "America/Chicago";
export const VERSO_DEL_ANIO: Verso = {
  text: "Mientras la tierra permanezca, no cesarán la sementera y la siega, el frío y el calor, el verano y el invierno, y el día y la noche.",
  ref: "Génesis 8:22",
};

// ---------------------------------------------------------------- la fecha hebrea real
/** Los meses del calendario hebreo (como los nombra Intl) y su número bíblico (Abib = 1; el Adar segundo = 13). */
const MES_INTL: Record<string, number> = {
  Nisan: 1, Iyar: 2, Sivan: 3, Tamuz: 4, Av: 5, Elul: 6, Tishri: 7, Heshvan: 8, Kislev: 9, Tevet: 10, Shevat: 11, Adar: 12, "Adar I": 12, "Adar II": 13,
};
/** El mes 13 de los años bisiestos (el segundo Adar). */
export const ADAR_SEGUNDO: MesHebreo = { n: 13, nombre: "Adar segundo", dias: 29 };
const mesHebreo = (n: number): MesHebreo => (n === 13 ? ADAR_SEGUNDO : MESES[n - 1]);

let fmtHebreo: Intl.DateTimeFormat | null = null;
let fmtCivil: Intl.DateTimeFormat | null = null;
let fmtCivilTexto: Intl.DateTimeFormat | null = null;
const hebreoFmt = () => (fmtHebreo ??= new Intl.DateTimeFormat("en-u-ca-hebrew", { timeZone: ZONA_JERUSALEN, year: "numeric", month: "long", day: "numeric" }));
const civilFmt = () => (fmtCivil ??= new Intl.DateTimeFormat("en-US", { timeZone: ZONA_JERUSALEN, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }));
const civilTextoFmt = () => (fmtCivilTexto ??= new Intl.DateTimeFormat("es-419", { timeZone: ZONA_JERUSALEN, day: "numeric", month: "long" }));

const SEMANA: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** La fecha civil de Texas de un instante: «2026-11-11» y el día de la semana (0 domingo … 6 sábado). */
export function civilDe(t: number): { iso: string; semana: number; anio: number; mes: number; dia: number } {
  const p: Record<string, string> = {};
  for (const x of civilFmt().formatToParts(new Date(t))) p[x.type] = x.value;
  return { iso: `${p.year}-${p.month}-${p.day}`, semana: SEMANA[p.weekday] ?? 0, anio: Number(p.year), mes: Number(p.month), dia: Number(p.day) };
}

/** La fecha hebrea real de un instante (a la hora de Texas). */
export function hebreoDe(t: number): { anio: number; mes: number; dia: number } {
  const p: Record<string, string> = {};
  for (const x of hebreoFmt().formatToParts(new Date(t))) p[x.type] = x.value;
  return { anio: Number(p.year), mes: MES_INTL[p.month] ?? 1, dia: Number(p.day) };
}

/** El mediodía de Texas de una fecha civil (para moverse de día en día sin líos de horario). */
export function mediodiaDe(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d, 18, 0, 0);
}
const numeroDia = (iso: string) => Math.round(mediodiaDe(iso) / 86400000);

// ---------------------------------------------------------------- las estaciones de la tierra de Israel
export type EstacionId = "cosecha" | "siembra" | "invierno" | "cebada" | "trigo" | "verano";
export type Semilla = "trigo" | "cebada" | "olivo";
export type BienEstacion = "harina" | "aceite" | "corderos";

export type Estacion = {
  id: EstacionId;
  nombre: string;
  icono: string;
  /** Los meses bíblicos que abarca (Abib = 1 … el Adar segundo = 13). */
  meses: number[];
  /** Lo que pasa en la tierra (lo que se lee en el calendario). */
  texto: string;
  verso: Verso;
  /** Probabilidad de que llueva un día de esta estación (0 a 1). */
  lluvia: number;
  /** Lo que crece más rápido en el huerto. */
  cultivo: Semilla | null;
  /** Cuánto tarda lo demás (1 = igual; en el frío, un poco más). */
  lento: number;
  /** Lo que paga el mercader de la plaza por cada bien (1 = igual; en la abundancia paga menos). */
  precios: Partial<Record<BienEstacion, number>>;
};

export const ESTACIONES: Estacion[] = [
  {
    id: "cosecha",
    nombre: "La fiesta de la cosecha",
    icono: "🍇",
    meses: [7],
    texto: "Se recogen las uvas y las olivas, y llegan las fiestas del mes séptimo: las trompetas, la expiación y los tabernáculos. Hay aceite en abundancia.",
    verso: { text: "y la fiesta de la cosecha a la salida del año, cuando hayas recogido los frutos de tus labores del campo.", ref: "Éxodo 23:16" },
    lluvia: 0.1,
    cultivo: "olivo",
    lento: 1,
    precios: { aceite: 0.85, harina: 1 },
  },
  {
    id: "siembra",
    nombre: "La lluvia temprana y la siembra",
    icono: "🌱",
    meses: [8],
    texto: "Caen las primeras lluvias, se ara la tierra y se siembran el trigo y la cebada. Cuando llueve, tu huerto se riega solo.",
    verso: { text: "yo daré la lluvia de vuestra tierra a su tiempo, la temprana y la tardía; y recogerás tu grano, tu vino y tu aceite.", ref: "Deuteronomio 11:14" },
    lluvia: 0.35,
    cultivo: null,
    lento: 1,
    precios: { aceite: 0.9 },
  },
  {
    id: "invierno",
    nombre: "El invierno de las lluvias",
    icono: "🌧️",
    meses: [9, 10, 11],
    texto: "Hace frío y llueve seguido: en las casas se encienden los braseros. Lo que siembras tarda un poco más, pero la lluvia lo riega. La harina escasea y vale más.",
    verso: { text: "Y el rey estaba en la casa de invierno en el mes noveno, y había un brasero ardiendo delante de él.", ref: "Jeremías 36:22" },
    lluvia: 0.55,
    cultivo: null,
    lento: 1.15,
    precios: { harina: 1.2, corderos: 1.1 },
  },
  {
    id: "cebada",
    nombre: "La lluvia tardía y la siega de la cebada",
    icono: "🌾",
    meses: [12, 13, 1],
    texto: "Florecen los almendros, cae la lluvia tardía y madura la cebada: su primera gavilla se presenta en la Pascua. Nacen los corderos.",
    verso: { text: "Así volvió Noemí, y Rut la moabita su nuera con ella; volvió de los campos de Moab, y llegaron a Belén al comienzo de la siega de la cebada.", ref: "Rut 1:22" },
    lluvia: 0.3,
    cultivo: "cebada",
    lento: 1,
    precios: { corderos: 0.85, harina: 0.95 },
  },
  {
    id: "trigo",
    nombre: "La siega del trigo",
    icono: "🌾",
    meses: [2, 3],
    texto: "Los campos se doran y se siega el trigo hasta la fiesta de las semanas. Hay harina en abundancia: el mercader paga menos por ella.",
    verso: { text: "También celebrarás la fiesta de las semanas, la de las primicias de la siega del trigo, y la fiesta de la cosecha a la salida del año.", ref: "Éxodo 34:22" },
    lluvia: 0.05,
    cultivo: "trigo",
    lento: 1,
    precios: { harina: 0.8 },
  },
  {
    id: "verano",
    nombre: "El verano: higos y uvas",
    icono: "☀️",
    meses: [4, 5, 6],
    texto: "Calor y cielo limpio: no llueve, así que hay que regar el huerto. Maduran los higos y las uvas. El aceite se acaba antes de la cosecha y vale más: guarda en tu alfolí para venderlo.",
    verso: { text: "Prepara en el verano su comida, Y recoge en el tiempo de la siega su mantenimiento.", ref: "Proverbios 6:8" },
    lluvia: 0,
    cultivo: null,
    lento: 1,
    precios: { aceite: 1.15 },
  },
];
export const ESTACION = Object.fromEntries(ESTACIONES.map((e) => [e.id, e])) as Record<EstacionId, Estacion>;
export const estacionDeMes = (mes: number): Estacion => ESTACIONES.find((e) => e.meses.includes(mes)) ?? ESTACION.invierno;

/** Un número fijo de 0 a 1 para cada fecha (FNV-1a): así todos ven el mismo cielo el mismo día. */
function azarDelDia(iso: string, sal = ""): number {
  let h = 2166136261;
  for (const ch of `${iso}${sal}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// ---------------------------------------------------------------- los eventos del año
export type ReglaEvento =
  /** Una fiesta de Levítico 23 en su fecha hebrea (sus textos y efectos están en shared/calendario.ts). */
  | { fiesta: FiestaId }
  /** El día de reposo de cada semana (6 = sábado). */
  | { semana: number }
  /** Una fecha civil de cada año (mes 1 a 12). */
  | { civil: { mes: number; dia: number; duracion: number } }
  /** Contado desde el domingo de Resurrección (desde -2 = el viernes). */
  | { resurreccion: { desde: number; duracion: number } };

export type EventoAnio = {
  id: string;
  nombre: string;
  corto: string;
  icono: string;
  tipo: "fiesta" | "mes" | "semana" | "ministerio";
  regla: ReglaEvento;
  /** Mérito en el templo y gozo en los encargos mientras dura (1 = igual). */
  merito: number;
  gozo: number;
  efecto: string;
  verso: Verso;
  hoy: string;
  /** Una hora especial (como un día de la comunidad): de tal a tal hora de Texas, aún más mérito. */
  hora?: { desde: number; hasta: number; merito: number; titulo: string };
  /** Se avisa al teléfono el primer día (a quien activó los avisos de fiestas). */
  avisar?: boolean;
  /** Día solemne: sin música ni fiesta (la expiación). */
  solemne?: boolean;
  /** El encargo de la fiesta: un cuarto encargo del día (de los que pueden hacer los tres caminos), con el doble de gozo. */
  encargo?: { tipo: "alfoli" | "bendicion" | "reunion" | "seccion" | "ayuda" | "anfitrion"; meta: number; titulo: string; icono: string };
};

/** Las fiestas de Levítico 23 como eventos (los textos vienen de shared/calendario.ts). */
const DE_FIESTA = (id: FiestaId, extra: Partial<EventoAnio> = {}): EventoAnio => {
  const f = FIESTA[id];
  return {
    id,
    nombre: f.nombre,
    corto: f.corto,
    icono: f.icono,
    tipo: id === "lunaNueva" ? "mes" : "fiesta",
    regla: { fiesta: id },
    merito: f.merito,
    gozo: f.gozo,
    efecto: f.efecto,
    verso: f.ley,
    hoy: f.hoy,
    avisar: id !== "lunaNueva" && f.merito >= 1.25,
    solemne: f.solemne,
    ...extra,
  };
};

/** La lista de los eventos del año. Para lo que venga, se agrega aquí un evento más (con su regla). */
export const EVENTOS_DEL_ANIO: EventoAnio[] = [
  DE_FIESTA("pascua", { encargo: { tipo: "bendicion", meta: 1, titulo: "La Pascua: visita la casa de un vecino y bendícela", icono: "🐑" } }),
  DE_FIESTA("panes", { encargo: { tipo: "alfoli", meta: 1, titulo: "Panes sin levadura: lleva al templo lo del alfolí de tu casa", icono: "🫓" } }),
  DE_FIESTA("primicias", { encargo: { tipo: "alfoli", meta: 1, titulo: "Las primicias: lleva al templo la primera cosecha de tu alfolí", icono: "🌾" } }),
  DE_FIESTA("pentecostes", { encargo: { tipo: "alfoli", meta: 1, titulo: "Pentecostés: lleva al templo las primicias de tu alfolí", icono: "🌾" } }),
  DE_FIESTA("trompetas", { encargo: { tipo: "seccion", meta: 1, titulo: "Las trompetas: termina una sección de un estudio", icono: "🎺" } }),
  DE_FIESTA("expiacion", { encargo: { tipo: "seccion", meta: 1, titulo: "El día de la expiación: un día de reflexión; termina una sección de un estudio", icono: "🕯️" } }),
  DE_FIESTA("tabernaculos", { encargo: { tipo: "bendicion", meta: 1, titulo: "Los tabernáculos: visita las enramadas y bendice la casa de un vecino", icono: "🌿" } }),
  DE_FIESTA("asamblea", { encargo: { tipo: "reunion", meta: 1, titulo: "La santa convocación: ve a una reunión en la casa de un vecino y responde bien", icono: "📖" } }),
  DE_FIESTA("lunaNueva", {
    encargo: { tipo: "alfoli", meta: 1, titulo: "Luna nueva: lleva al templo lo del alfolí de tu casa", icono: "🌙" },
    hora: { desde: 19, hasta: 21, merito: 1.5, titulo: "La hora de las trompetas" },
    avisar: true,
    verso: {
      text: "Y en el día de vuestra alegría, y en vuestras solemnidades, y en los principios de vuestros meses, tocaréis las trompetas sobre vuestros holocaustos, y sobre los sacrificios de paz, y os serán por memoria delante de vuestro Dios. Yo Jehová vuestro Dios.",
      ref: "Números 10:10",
    },
    efecto: "Principio de mes: los sacerdotes tocan las trompetas sobre los holocaustos. De 7 a 9 de la noche (hora de Texas), la hora de las trompetas: el servicio en el templo vale la mitad más (×1,5).",
  }),
  {
    id: "reposo",
    nombre: "El día de reposo",
    corto: "Día de reposo: el doble holocausto",
    icono: "🕊️",
    tipo: "semana",
    regla: { semana: 6 },
    merito: 1.1,
    gozo: 1,
    efecto: "En el templo se ofrecen dos corderos más (el doble holocausto del día de reposo). Tu racha de servicio no se pierde aunque descanses.",
    verso: { text: "Mas el día de reposo, dos corderos de un año sin defecto, y dos décimas de flor de harina amasada con aceite, como ofrenda, con su libación.", ref: "Números 28:9" },
    hoy: "Acuérdate del día de reposo: descansar también es obedecer.",
    encargo: { tipo: "reunion", meta: 1, titulo: "Día de reposo: ve a una reunión en la casa de un vecino y responde bien", icono: "🕊️" },
  },
  {
    id: "anioNuevo",
    nombre: "El año nuevo",
    corto: "Año nuevo: nuevas son cada mañana",
    icono: "🎉",
    tipo: "ministerio",
    regla: { civil: { mes: 1, dia: 1, duracion: 1 } },
    merito: 1.1,
    gozo: 1.25,
    efecto: "El ministerio empieza el año dando gracias: los encargos dan más gozo.",
    verso: { text: "Nuevas son cada mañana; grande es tu fidelidad.", ref: "Lamentaciones 3:23" },
    hoy: "Cada año, cada día, Dios empieza de nuevo con nosotros.",
    encargo: { tipo: "ayuda", meta: 1, titulo: "Año nuevo: empieza ayudando a un vecino con lo de tu alfolí", icono: "🎉" },
    avisar: true,
  },
  {
    id: "semanaSanta",
    nombre: "El siervo herido por nosotros",
    corto: "Semana Santa: Isaías anuncia al siervo",
    icono: "🌅",
    tipo: "ministerio",
    regla: { resurreccion: { desde: -2, duracion: 3 } },
    merito: 1.25,
    gozo: 1.25,
    efecto: "Isaías, en la escuela de los profetas, enseña la profecía del siervo; el domingo, la ciudad celebra con alegría.",
    verso: { text: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.", ref: "Isaías 53:5" },
    hoy: "Lo que Isaías vio de lejos, en Cristo se cumplió: por su llaga fuimos curados.",
    encargo: { tipo: "seccion", meta: 1, titulo: "El siervo herido: termina una sección de un estudio", icono: "🌅" },
    avisar: true,
  },
  {
    id: "navidad",
    nombre: "La profecía del niño",
    corto: "Navidad: un niño nos es nacido",
    icono: "⭐",
    tipo: "ministerio",
    regla: { civil: { mes: 12, dia: 24, duracion: 2 } },
    merito: 1.25,
    gozo: 1.5,
    efecto: "Isaías anuncia al niño que ha de nacer: la ciudad se llena de lámparas y los encargos dan la mitad más de gozo.",
    verso: { text: "Porque un niño nos es nacido, hijo nos es dado, y el principado sobre su hombro; y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz.", ref: "Isaías 9:6" },
    hoy: "El niño que Isaías anunció es Jesús: celebramos que Dios vino a nosotros.",
    encargo: { tipo: "bendicion", meta: 1, titulo: "La profecía del niño: lleva la buena noticia y bendice la casa de un vecino", icono: "⭐" },
    avisar: true,
  },
];
export const EVENTO_ANIO = Object.fromEntries(EVENTOS_DEL_ANIO.map((e) => [e.id, e])) as Record<string, EventoAnio>;

/** El domingo de Resurrección de un año (cálculo gregoriano de siempre). */
export function domingoDeResurreccion(anio: number): string {
  const a = anio % 19, b = Math.floor(anio / 100), c = anio % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export type EventoActivo = { evento: EventoAnio; /** Día del evento (1 … duración). */ dia: number; de: number; ultimo: boolean };

/** Si un evento está en una fecha (y qué día de él es). */
function eventoEn(e: EventoAnio, civil: { iso: string; semana: number; anio: number; mes: number; dia: number }, heb: { mes: number; dia: number }): EventoActivo | null {
  const r = e.regla;
  if ("fiesta" in r) {
    const f = FIESTA[r.fiesta];
    if (r.fiesta === "lunaNueva") return heb.dia === 1 ? { evento: e, dia: 1, de: 1, ultimo: false } : null;
    if (heb.mes !== f.mes || heb.dia < f.dia || heb.dia >= f.dia + f.duracion) return null;
    const dia = heb.dia - f.dia + 1;
    return { evento: e, dia, de: f.duracion, ultimo: f.duracion > 1 && dia === f.duracion };
  }
  if ("semana" in r) return civil.semana === r.semana ? { evento: e, dia: 1, de: 1, ultimo: false } : null;
  if ("civil" in r) {
    const inicio = numeroDia(`${civil.anio}-${String(r.civil.mes).padStart(2, "0")}-${String(r.civil.dia).padStart(2, "0")}`);
    const k = numeroDia(civil.iso) - inicio;
    return k >= 0 && k < r.civil.duracion ? { evento: e, dia: k + 1, de: r.civil.duracion, ultimo: r.civil.duracion > 1 && k === r.civil.duracion - 1 } : null;
  }
  const k = numeroDia(civil.iso) - (numeroDia(domingoDeResurreccion(civil.anio)) + r.resurreccion.desde);
  return k >= 0 && k < r.resurreccion.duracion ? { evento: e, dia: k + 1, de: r.resurreccion.duracion, ultimo: r.resurreccion.duracion > 1 && k === r.resurreccion.duracion - 1 } : null;
}

// ---------------------------------------------------------------- el día de hoy en Jerusalén
export type DiaJerusalen = {
  /** La fecha civil de Texas (AAAA-MM-DD), su texto («11 de noviembre») y el día de la semana (6 = sábado). */
  iso: string;
  civilTexto: string;
  semana: number;
  hebreo: { anio: number; mes: number; dia: number; mesNombre: string; texto: string };
  /** La misma forma que usa el resto del juego (las fiestas de Levítico 23 de hoy, para los dibujos de la ciudad). */
  fecha: Fecha;
  estacion: Estacion;
  /** Si llueve hoy en Jerusalén (igual para todos). */
  llueve: boolean;
  /** Los eventos de hoy, el de más mérito primero. */
  eventos: EventoActivo[];
};

/** Lo que pasa hoy en Jerusalén (o el día de ese instante). */
export function diaEnJerusalen(t: number = Date.now()): DiaJerusalen {
  const civil = civilDe(t);
  const heb = hebreoDe(mediodiaDe(civil.iso));
  const mes = mesHebreo(heb.mes);
  const estacion = estacionDeMes(heb.mes);
  const eventos = EVENTOS_DEL_ANIO.map((e) => eventoEn(e, civil, heb)).filter((x): x is EventoActivo => !!x);
  // la luna nueva y el reposo van detrás de una fiesta grande el mismo día
  eventos.sort((a, b) => b.evento.merito - a.evento.merito);
  const fiestas: FiestaHoy[] = [];
  for (const f of FIESTAS) {
    if (f.id === "lunaNueva") continue;
    if (heb.mes === f.mes && heb.dia >= f.dia && heb.dia < f.dia + f.duracion) fiestas.push({ fiesta: f, dia: heb.dia - f.dia + 1, ultimo: f.duracion > 1 && heb.dia === f.dia + f.duracion - 1 });
  }
  fiestas.sort((a, b) => a.fiesta.duracion - b.fiesta.duracion);
  if (heb.dia === 1 && !fiestas.length) fiestas.push({ fiesta: FIESTA.lunaNueva, dia: 1, ultimo: false });
  const texto = `${heb.dia} de ${mes.nombre}`;
  return {
    iso: civil.iso,
    civilTexto: civilTextoFmt().format(new Date(mediodiaDe(civil.iso))),
    semana: civil.semana,
    hebreo: { anio: heb.anio, mes: heb.mes, dia: heb.dia, mesNombre: mes.nombre, texto },
    fecha: { numero: numeroDia(civil.iso), anio: heb.anio, mes, dia: heb.dia, texto, fiestas },
    estacion,
    llueve: azarDelDia(civil.iso, "lluvia") < estacion.lluvia,
    eventos,
  };
}

/** El mérito extra de este momento en el templo: el del evento mayor de hoy, o el de su hora especial si es ahora. */
export function bonoDelMomento(t: number = Date.now(), d: DiaJerusalen = diaEnJerusalen(t)): { merito: number; gozo: number; hora: string | null } {
  let merito = 1, gozo = 1;
  let hora: string | null = null;
  const h = Number(new Intl.DateTimeFormat("en-US", { timeZone: ZONA_JERUSALEN, hour: "numeric", hourCycle: "h23" }).format(new Date(t))) % 24;
  for (const a of d.eventos) {
    merito = Math.max(merito, a.evento.merito);
    gozo = Math.max(gozo, a.evento.gozo);
    if (a.evento.hora && h >= a.evento.hora.desde && h < a.evento.hora.hasta) {
      merito = Math.max(merito, a.evento.hora.merito);
      hora = a.evento.hora.titulo;
    }
  }
  return { merito, gozo, hora };
}

export type EventoProximo = { evento: EventoAnio; iso: string; texto: string; enDias: number };

/** Los próximos eventos (el primer día de cada uno), sin repetir el día de reposo ni la luna nueva más de una vez. */
export function proximosEventos(t: number = Date.now(), cuantos = 8, hasta = 400): EventoProximo[] {
  const hoy = civilDe(t).iso;
  const out: EventoProximo[] = [];
  const vistos = new Set<string>();
  for (let k = 1; k <= hasta && out.length < cuantos; k++) {
    const d = diaEnJerusalen(mediodiaDe(hoy) + k * 86400000);
    for (const a of d.eventos) {
      if (a.dia !== 1) continue;
      const clave = a.evento.tipo === "semana" || a.evento.tipo === "mes" ? a.evento.id : `${a.evento.id}:${d.iso}`;
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      out.push({ evento: a.evento, iso: d.iso, texto: `${d.civilTexto} (${d.hebreo.texto})`, enDias: k });
    }
  }
  return out.slice(0, cuantos);
}

/** La próxima fiesta GRANDE (de las que se avisan), para el aviso de «faltan tantos días». */
export function proximaFiestaGrande(t: number = Date.now()): EventoProximo | null {
  return proximosEventos(t, 30, 400).find((p) => p.evento.avisar && p.evento.tipo !== "mes" && p.evento.tipo !== "semana") ?? null;
}

// ---------------------------------------------------------------- el huerto y el mercado según la estación
/** Cuánto tarda una semilla sembrada ese día (1 = lo normal; 0,75 = un cuarto menos en su estación). */
export function factorCrecimiento(semilla: Semilla, d: DiaJerusalen): number {
  if (d.estacion.cultivo === semilla) return 0.75;
  return d.estacion.lento;
}
/** Lo que paga el mercader por un bien en esta estación (1 = igual). */
export function factorPrecio(bien: BienEstacion, d: DiaJerusalen): number {
  return d.estacion.precios[bien] ?? 1;
}

/** El encargo de la fiesta de un día (el del evento de más mérito que lo tenga), con su id «ev-…». */
export function encargoDeFiesta(dia: string): { id: string; evento: EventoAnio } | null {
  const d = diaEnJerusalen(mediodiaDe(dia));
  const a = d.eventos.find((x) => x.evento.encargo);
  return a ? { id: `ev-${a.evento.id}`, evento: a.evento } : null;
}
