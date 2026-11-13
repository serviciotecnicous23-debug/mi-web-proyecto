/**
 * «¿Quién es sabio?» (Santiago 3:13): el gran concurso de la casa de la sabiduría (Proverbios 9:1),
 * pedido de Luis el 2026-11-10. Un concurso de televisión a la manera bíblica, con su propio decorado,
 * su música y su presentador (Etán ezraíta, el sabio de 1 Reyes 4:31): no copia ningún programa real.
 *
 * - Quince gradas, una pregunta por grada y cada vez más difícil (como los quince cánticos graduales,
 *   Salmos 120 a 134). Las gradas 5 y 10 son seguras: si fallas después, te quedas con ellas.
 * - Puedes retirarte con lo ganado antes de responder. Cada pregunta tiene su reloj.
 * - Comodines (uno de cada uno por partida): el aventador quita dos respuestas, los ancianos de la puerta
 *   dicen qué responde el pueblo, un amigo da su consejo y, desde la grada 10 alguna vez, otro rollo cambia
 *   la pregunta.
 * - Banco de 50 preguntas por grada (750): salen al azar y a una persona no se le repiten hasta que vea
 *   todas las de esa grada; el orden de las respuestas cambia en cada partida.
 * - Siete entradas por día (las siete columnas). Puntos de sabiduría para las tablas de la semana y de
 *   siempre, gozo con tope diario, títulos y trajes de los sabios que solo se ganan aquí.
 *
 * El servidor lleva todo: elige la pregunta, guarda la hora en que se mostró y corrige.
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { Verso } from "./ciudad";
import type { Camino } from "./caminos";
import { NOMBRES_BOT, nombreDeBot, type NivelBot } from "./mesa";

export const NOMBRE_CONCURSO = "¿Quién es sabio?";
export const VERSO_CONCURSO: Verso = { text: "¿Quién es sabio y avisado entre vosotros? muestre por buena conversación sus obras en mansedumbre de sabiduría.", ref: "Santiago 3:13" };
export const VERSO_CASA: Verso = { text: "La sabiduría edificó su casa, Labró sus siete columnas.", ref: "Proverbios 9:1" };
export const VERSO_PRESENTADOR: Verso = {
  text: "Aun fue más sabio que todos los hombres, más que Etán ezraíta, y que Hemán, Calcol y Darda, hijos de Mahol;",
  ref: "1 Reyes 4:31",
};

export const GRADAS = 15;
export const GRADAS_SEGURAS = [5, 10] as const;
/** Puntos de sabiduría por grada alcanzada (índice = gradas acertadas). */
export const PUNTOS_GRADA = [0, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 8000, 15000, 25000, 50000, 100000, 250000, 500000];
/** Gozo de Jerusalén en línea al terminar, por la grada con que te quedas. */
export const GOZO_GRADA = [0, 1, 2, 3, 4, 8, 10, 12, 14, 16, 25, 30, 35, 40, 50, 100];
/** Tope de gozo por día que da el concurso (las tablas y los trajes no tienen tope). */
export const GOZO_SABIO_DIA = 150;
/** Entradas por día: las siete columnas de la casa de la sabiduría. */
export const ENTRADAS_DIA = 7;
/** Premio de gozo para los tres primeros de la tabla de la semana (se entrega al volver la semana siguiente). */
export const PREMIO_SEMANA = [60, 40, 25];

/** Qué tan difícil es cada grada: sube de tres en tres, y en la cima solo hay preguntas para expertos. */
export const NIVELES_DIFICULTAD = [
  { hasta: 3, nombre: "Fácil", color: "#7ee0a8" },
  { hasta: 6, nombre: "Media", color: "#8fd3ff" },
  { hasta: 9, nombre: "Difícil", color: "#ffd36a" },
  { hasta: 12, nombre: "Muy difícil", color: "#ff9a5a" },
  { hasta: 15, nombre: "Experto", color: "#ff6b8a" },
] as const;
export type NivelDificultad = (typeof NIVELES_DIFICULTAD)[number];
export function dificultadGrada(n: number): NivelDificultad {
  return NIVELES_DIFICULTAD.find((d) => n <= d.hasta) ?? NIVELES_DIFICULTAD[NIVELES_DIFICULTAD.length - 1];
}

/** Segundos para responder cada grada. */
export function segundosGrada(n: number): number {
  return n <= 5 ? 30 : n <= 10 ? 45 : 60;
}
/** Usar un comodín da unos segundos más para pensar. */
export const SEGUNDOS_COMODIN = 10;
/** El cántico gradual de cada grada (Salmos 120 a 134). */
export function canticoGrada(n: number): string {
  return `Salmo ${119 + Math.max(1, Math.min(GRADAS, n))}`;
}
/** Las gradas seguras que ya se pasaron: con cuánto te quedas si fallas. */
export function gradaSegura(acertadas: number): number {
  let s = 0;
  for (const g of GRADAS_SEGURAS) if (acertadas >= g) s = g;
  return s;
}

// ---------------------------------------------------------------- los comodines
export type Comodin = "aventador" | "ancianos" | "amigo" | "rollo";
export const COMODINES: Record<Comodin, { nombre: string; icono: string; texto: string; verso: Verso }> = {
  aventador: {
    nombre: "El aventador",
    icono: "🌾",
    texto: "Limpia la era: quita dos respuestas que no son.",
    verso: { text: "Su aventador está en su mano, y limpiará su era;", ref: "Mateo 3:12" },
  },
  ancianos: {
    nombre: "Los ancianos de la puerta",
    icono: "👴",
    texto: "Muestra qué respondió el pueblo a esta pregunta.",
    verso: { text: "Mas en la multitud de consejeros hay seguridad.", ref: "Proverbios 11:14" },
  },
  amigo: {
    nombre: "Un amigo",
    icono: "🤝",
    texto: "Llama a un amigo o vecino de tu barrio que esté en la ciudad (tiene 30 segundos), o a Husai, el amigo del rey.",
    verso: { text: "Así vino Husai amigo de David a la ciudad;", ref: "2 Samuel 15:37" },
  },
  rollo: {
    nombre: "Otro rollo",
    icono: "📜",
    texto: "Cambia la pregunta por otra de la misma grada. Se abre cuando llegas alguna vez a la grada 10.",
    verso: { text: "Abrió, pues, Esdras el libro a ojos de todo el pueblo,", ref: "Nehemías 8:5" },
  },
};
export const ORDEN_COMODINES: Comodin[] = ["aventador", "ancianos", "amigo", "rollo"];

// ---------------------------------------------------------------- la clasificación (títulos)
export type Titulo = { id: string; nombre: string; icono: string; requisito: string };
export const TITULOS: Titulo[] = [
  { id: "oyente", nombre: "Oyente", icono: "👂", requisito: "Juega tu primera partida" },
  { id: "entendido", nombre: "Entendido", icono: "📖", requisito: "Llega a la grada 5" },
  { id: "prudente", nombre: "Prudente", icono: "🕯️", requisito: "Llega a la grada 10" },
  { id: "sabio", nombre: "Sabio", icono: "🌟", requisito: "Sube las quince gradas" },
  { id: "sabio-israel", nombre: "Sabio de Israel", icono: "🏛️", requisito: "Gana 3 veces" },
  { id: "consejero", nombre: "Consejero del rey", icono: "👑", requisito: "Gana 7 veces" },
  { id: "corazon", nombre: "Corazón sabio y entendido", icono: "💎", requisito: "Gana 15 veces" },
];

/** El título que corresponde a lo logrado (y el siguiente). */
export function tituloDe(s: { partidas: number; mejor: number; ganadas: number }): { actual: Titulo | null; siguiente: Titulo | null } {
  const logrados = [
    s.partidas >= 1,
    s.mejor >= 5,
    s.mejor >= 10,
    s.ganadas >= 1,
    s.ganadas >= 3,
    s.ganadas >= 7,
    s.ganadas >= 15,
  ];
  let i = -1;
  for (let k = 0; k < logrados.length; k++) if (logrados[k]) i = k;
  return { actual: i >= 0 ? TITULOS[i] : null, siguiente: TITULOS[i + 1] ?? null };
}

// ---------------------------------------------------------------- los trajes de los sabios (solo se ganan aquí)
export type PremioSabio = { id: string; nombre: string; requisito: string; color: string };
/** Mantos y fajas que van al armario de la casa (shared/mercado.ts los lista como exclusivos). */
export const TRAJES_SABIOS: PremioSabio[] = [
  { id: "faja-entendidos", nombre: "Faja de los entendidos", requisito: "Llega por primera vez a la grada 5", color: "#5a3fa6" },
  { id: "manto-prudentes", nombre: "Manto púrpura de los prudentes", requisito: "Llega por primera vez a la grada 10", color: "#5b2470" },
  { id: "manto-sabios", nombre: "Manto blanco de los sabios", requisito: "Sube las quince gradas", color: "#f4efe0" },
  { id: "faja-salomon", nombre: "Faja de oro de Salomón", requisito: "Gana sin usar ningún comodín", color: "#d6a21e" },
  { id: "manto-consejero", nombre: "Manto de grana del consejero", requisito: "Gana 3 veces", color: "#a3122a" },
  { id: "faja-tres-dobleces", nombre: "Faja de tres dobleces", requisito: "Llega a la grada 10 en tres partidas seguidas", color: "#2c6e5f" },
  { id: "faja-consejero", nombre: "Faja azul del buen consejero", requisito: "Da 5 consejos acertados a tus amigos y vecinos", color: "#2f6fb8" },
  { id: "manto-vencedores", nombre: "Manto azul de los vencedores", requisito: "Gana 5 duelos de sabios", color: "#1f4e9c" },
];
export const VERSO_TRAJES: Verso = { text: "Adorno de gracia dará a tu cabeza; Corona de hermosura te entregará.", ref: "Proverbios 4:9" };

// ---------------------------------------------------------------- lo que dice el presentador (original)
export const FRASES_PRESENTADOR = {
  bienvenida: "¡Bienvenido a la casa de la sabiduría! Siete columnas, quince gradas y una sola pregunta: ¿quién es sabio?",
  ultima: "¿Es tu última palabra?",
  bien: ["¡Sabia respuesta!", "¡Así es! Subes una grada más.", "¡Correcto! El pueblo aplaude en la puerta.", "¡Bien dicho! La sabiduría te acompaña."],
  segura: "¡Grada segura! Esos puntos ya nadie te los quita.",
  mal: "Lo siento… no era esa.",
  tiempo: "Se acabó el tiempo…",
  retiro: { text: "Aun el necio, cuando calla, es contado por sabio; El que cierra sus labios es entendido.", ref: "Proverbios 17:28" } as Verso,
  gano: { text: "he aquí que te he dado corazón sabio y entendido,", ref: "1 Reyes 3:12" } as Verso,
};

// ---------------------------------------------------------------- respuestas de la API
export type PreguntaVista = {
  /** La grada que se juega (1 a 15). */
  n: number;
  texto: string;
  opciones: string[];
  /** Índices quitados por el aventador. */
  quitadas: number[];
  segundos: number;
  /** Segundos que quedan según el servidor. */
  restantes: number;
  /**
   * La escena de la duda con Etán en esta pregunta: «toca» (sale al elegir una respuesta), «puede» (solo si tardas
   * más del 60 % del reloj) o «hecha» (ya salió). Lo decide el servidor al mostrar la pregunta, antes de que elijas:
   * nunca depende de si la respuesta es la buena.
   */
  duda?: "toca" | "puede" | "hecha";
};

export type PartidaVista = {
  id: number;
  /** Gradas acertadas. */
  grada: number;
  puntos: number;
  /** Con cuánto te quedas si fallas. */
  seguro: number;
  pregunta: PreguntaVista | null;
  usados: Comodin[];
  /** El comodín «otro rollo» está abierto para esta persona. */
  rolloAbierto: boolean;
  ancianos: number[] | null;
  amigo: ConsejoAmigo | null;
  /** Se está llamando a un amigo o vecino: a quién y cuántos segundos le quedan para contestar. */
  llamada: { nombre: string; restantes: number } | null;
};

export type FinPartida = {
  estado: "perdio" | "retiro" | "gano" | "tiempo";
  /** Gradas con que te quedas (las acertadas, o la segura si fallaste). */
  grada: number;
  puntos: number;
  gozo: number;
  /** Ya llegó al tope de gozo del día. */
  topeGozo: boolean;
  premios: PremioSabio[];
  titulo: Titulo | null;
  tituloNuevo: boolean;
  /** La respuesta correcta de la última pregunta (si se falló o se retiró con una pregunta a la vista). */
  correcta: string | null;
  explica: string | null;
  ref: string | null;
  gozoTotal: number;
};

export type RespuestaSabio = {
  correcta: boolean;
  /** El texto de la respuesta correcta y la explicación con su cita. */
  respuesta: string;
  explica: string;
  ref: string;
  partida: PartidaVista | null;
  fin: FinPartida | null;
};

export type FilaTabla = { puesto: number; nombre: string; puntos: number; grada: number; ganadas?: number; esYo: boolean };

export type SabioEstado = {
  partida: PartidaVista | null;
  yo: {
    partidas: number;
    mejor: number;
    ganadas: number;
    total: number;
    titulo: Titulo | null;
    siguiente: Titulo | null;
    premios: string[];
    entradasHoy: number;
    gozoHoy: number;
    rolloAbierto: boolean;
    /** Consejos que dio a sus amigos y vecinos, y cuántos eran la respuesta correcta. */
    consejos: number;
    consejosBuenos: number;
    /** Recibe las llamadas de sus amigos y vecinos que juegan. */
    llamadas: boolean;
  };
  /** Quién está jugando ahora en la casa de la sabiduría (para mirar). */
  enVivo: EnVivo[];
  /** Las noches de los sabios que se juegan ahora (shared/sabio-noche.ts). */
  noches?: import("./sabio-noche").NocheEnVivo[];
  semana: string;
  tablaSemana: FilaTabla[];
  tablaSiempre: FilaTabla[];
  miPuestoSemana: number | null;
  /** Premio de la semana pasada que se acaba de entregar. */
  premioSemana: { puesto: number; gozo: number } | null;
};

// ================================================================ con amigos: el consejo de un vecino y el público
/**
 * El comodín «Un amigo» llama de verdad a un amigo (de la web) o a un vecino de tu barrio que esté ahora en la
 * ciudad o en el templo: le llega la pregunta y tiene 30 segundos para dar su consejo (a quien llama se le suman
 * esos segundos al reloj). Si no contesta, o no puede, aconseja Husai. Quien acierta un consejo gana gozo.
 *
 * El público: cualquiera puede mirar en vivo las partidas de la casa de la sabiduría (no las de quien bloqueó o
 * lo bloqueó) y animar con aplausos que ve quien juega. Nada se simula: el público y los consejos son personas.
 */
export const LLAMADA_S = 30;
/** Gozo para quien dio un consejo acertado (dentro del tope de gozo del concurso). */
export const GOZO_CONSEJO = 3;
/** Consejos acertados para la faja del buen consejero. */
export const CONSEJOS_FAJA = 5;
export const VERSO_CONSEJO: Verso = { text: "El ungüento y el perfume alegran el corazón, Y el cordial consejo del amigo, al hombre.", ref: "Proverbios 27:9" };
export const VERSO_PUBLICO: Verso = { text: "teniendo en derredor nuestro tan grande nube de testigos,", ref: "Hebreos 12:1" };

export type Relacion = "amigo" | "vecino" | "ambos";
export type Confianza = "seguro" | "creo" | "adivino";
export const CONFIANZAS: { id: Confianza; texto: string }[] = [
  { id: "seguro", texto: "Estoy seguro" },
  { id: "creo", texto: "Creo que es esta" },
  { id: "adivino", texto: "No sé… adivino" },
];

/** Lo que dice el consejo, según qué tan seguro está quien lo da. */
export function textoDeConsejo(confianza: Confianza, letra: string, opcion: string): string {
  return confianza === "seguro"
    ? `Estoy seguro: es la ${letra}, «${opcion}».`
    : confianza === "creo"
      ? `Creo que es la ${letra}, «${opcion}».`
      : `No estoy seguro… pero yo diría la ${letra}, «${opcion}».`;
}

/** El consejo que llegó: de Husai o de un amigo o vecino (con su camino, para su retrato). */
export type ConsejoAmigo = { quien: string; opcion: number; dice: string; vecino?: { camino: Camino; relacion: Relacion } };

/** A quién se le puede pedir consejo ahora. */
export type AmigoPosible = { personajeId: number; nombre: string; camino: Camino; donde: string; relacion: Relacion };

/** La llamada que le llega al amigo o vecino (sin la respuesta, claro). */
export type LlamadaSabio = { id: number; de: string; camino: Camino; n: number; texto: string; opciones: string[]; quitadas: number[]; restantes: number };

export const APLAUSOS = [
  { id: "aplauso", icono: "👏", texto: "¡Bien!" },
  { id: "oracion", icono: "🙏", texto: "Orando" },
  { id: "animo", icono: "🔥", texto: "¡Ánimo!" },
] as const;
export type AplausoId = (typeof APLAUSOS)[number]["id"];
/** Cuántos miran y los aplausos de los últimos segundos (`ultimo` cambia con cada aplauso nuevo). */
export type PublicoVista = {
  mirando: number;
  aplausos: Partial<Record<AplausoId, number>>;
  ultimo: number;
  /** Los nombres de quienes miran (sus personajes, como se ven en la ciudad), para sentarlos en el estudio. */
  nombres?: string[];
};

export type EnVivo = { id: number; nombre: string; camino: Camino; grada: number; puntos: number; mirando: number; relacion: Relacion | null };

/** La última pregunta que se respondió (para que el público vea si acertó). */
export type UltimaRespuesta = { n: number; texto: string; opciones: string[]; elegida: string | null; correcta: string; bien: boolean; explica: string; ref: string; at: number };

/** Lo que ve el público de una partida: lo mismo que quien juega, nunca la respuesta antes de tiempo. */
export type MirarVista = {
  id: number;
  nombre: string;
  camino: Camino;
  estado: "jugando" | FinPartida["estado"];
  grada: number;
  puntos: number;
  seguro: number;
  pregunta: PreguntaVista | null;
  usados: Comodin[];
  ancianos: number[] | null;
  amigo: ConsejoAmigo | null;
  llamada: { nombre: string; restantes: number } | null;
  ultima: UltimaRespuesta | null;
  publico: PublicoVista;
};

// ================================================================ las tablas por partida (pedido de Luis, 12 de noviembre)
/**
 * Las tablas muestran cada partida terminada, no solo la mejor de cada persona: quién jugó, en qué grada quedó, con
 * cuántos puntos, en cuánto tiempo, con qué comodines y cómo terminó. El orden: más puntos primero y, si empatan,
 * quien tardó menos. El premio de la semana sigue siendo por persona (su mejor partida).
 */
export type TablaDe = "hoy" | "semana" | "siempre" | "mias";
export const TABLAS: { id: TablaDe; nombre: string; nota: string }[] = [
  { id: "hoy", nombre: "Hoy", nota: "Las partidas terminadas hoy (día de Texas)." },
  { id: "semana", nombre: "La semana", nota: "Las partidas de esta semana, de lunes a domingo." },
  { id: "siempre", nombre: "Siempre", nota: "Todas las partidas que se han jugado." },
  { id: "mias", nombre: "Mis partidas", nota: "Todo lo que jugaste, la más nueva primero." },
];
/** Cuántas filas muestra cada tabla (y la tuya, aunque esté más abajo). */
export const TABLA_PRIMEROS = 10;
/** Cuántas de tus partidas se ven en «Mis partidas». */
export const MIS_PARTIDAS = 30;
export const MEDALLAS = ["🥇", "🥈", "🥉"] as const;

export type PartidaEnTabla = {
  /** La partida. */
  id: number;
  /** El puesto en esa tabla (en «Mis partidas», el que tuvo en la tabla de su semana; sin puntos, null). */
  puesto: number | null;
  /** El personaje con que jugó (para abrir su registro). */
  pid: number;
  nombre: string;
  camino: Camino;
  /** Gradas que subió (respuestas buenas). */
  grada: number;
  /** La grada en que quedó: la que falló (o se le acabó el tiempo), o la última que subió. */
  quedo: number;
  /** Los puntos con que se quedó (si falló, los de su grada segura). */
  puntos: number;
  /** Cuánto duró la partida, en segundos. */
  segundos: number;
  usados: Comodin[];
  estado: FinPartida["estado"];
  esYo: boolean;
  /** Cuándo terminó (milisegundos). */
  at: number;
};

export type TablaVista = {
  de: TablaDe;
  filas: PartidaEnTabla[];
  /** Tu mejor partida en esa tabla cuando no está entre las primeras (para verla abajo, con su puesto). */
  mia: PartidaEnTabla | null;
  /** Cuántas partidas hay en la tabla (en «Mis partidas», cuántas jugaste en total). */
  total: number;
  miPuesto: number | null;
  dia: string;
  semana: string;
};

/** La grada en que quedó una partida, según cómo terminó. */
export function gradaEnQueQuedo(estado: FinPartida["estado"], grada: number): number {
  if (estado === "gano") return GRADAS;
  if (estado === "perdio" || estado === "tiempo") return Math.min(GRADAS, grada + 1);
  return Math.max(0, grada);
}

/** Cómo terminó, dicho corto (para las tablas). */
export function comoTermino(estado: FinPartida["estado"], grada: number): string {
  const q = gradaEnQueQuedo(estado, grada);
  if (estado === "gano") return "Subió las 15";
  if (estado === "retiro") return grada > 0 ? `Se retiró en la ${q}` : "Se retiró al empezar";
  if (estado === "tiempo") return `Se le acabó el tiempo en la ${q}`;
  return `Falló la ${q}`;
}

/** Un tiempo corto y claro: «45 s», «3:07», «1 h 05 min». */
export function tiempoCorto(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  if (s < 60) return `${s} s`;
  if (s < 3600) return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return `${Math.floor(s / 3600)} h ${String(Math.floor((s % 3600) / 60)).padStart(2, "0")} min`;
}

/** El orden de las tablas: más puntos primero; si empatan, menos tiempo; después, quien terminó antes. */
export function ordenTabla<T extends { puntos: number; segundos: number; at: number; id: number }>(a: T, b: T): number {
  return b.puntos - a.puntos || a.segundos - b.segundos || a.at - b.at || a.id - b.id;
}

// ================================================================ la última palabra: el suspenso y la escena con Etán
/**
 * Al confirmar la respuesta: las luces bajan, cae un foco sobre el atril, suena un redoble y la respuesta elegida
 * queda en ámbar. El suspenso crece con la grada: un segundo y medio en la primera, cuatro en la última.
 */
export function suspensoMs(n: number): number {
  const g = Math.max(1, Math.min(GRADAS, Math.round(n)));
  return Math.round(1500 + ((g - 1) / (GRADAS - 1)) * 2500);
}

/**
 * La escena de la duda: al elegir una respuesta, la cámara corta a Etán y a quien juega frente a frente, luego a
 * Etán de cerca, con un latido de fondo, y Etán dice algo para hacer dudar. Quien juega confirma o cambia.
 *
 * Sale cada 2 o 3 preguntas (al azar), siempre en las gradas seguras (5 y 10) y desde la 11, y también cuando
 * quien juega ya usó más del 60 % del reloj. NUNCA depende de si la respuesta elegida es la buena: el servidor la
 * decide al mostrar la pregunta (antes de que se elija nada) y el teléfono no sabe la respuesta.
 *
 * El reloj se detiene mientras habla Etán: el servidor devuelve esos segundos (DUDA_S), una vez por pregunta. Así
 * la escena no le quita tiempo a nadie.
 */
export const DUDA_S = 5;
/** Si ya usó más de esta parte del reloj al elegir, Etán pregunta aunque no tocara. */
export const DUDA_TARDA = 0.6;
/** Cada cuántas preguntas (contando desde la última escena) vuelve a salir: 2 o 3, al azar. */
export const DUDA_CADA = [2, 3] as const;

/** Si a la pregunta `n` le toca la escena (desde la última que hubo, en la pregunta `ultima`, y cada `cada`). */
export function tocaDuda(n: number, ultima: number, cada: number): boolean {
  return (GRADAS_SEGURAS as readonly number[]).includes(n) || n >= 11 || n - ultima >= cada;
}

/** Si quien juega ya pensó más del 60 % del reloj. */
export function tardaMucho(pasados: number, segundos: number): boolean {
  return segundos > 0 && pasados >= segundos * DUDA_TARDA;
}

export type FraseDuda = { id: string; texto: string; cuando?: "segura" | "alta" };
/** Lo que dice Etán para hacer dudar (original). Ninguna da pistas: se dicen igual si la respuesta es buena o mala. */
export const FRASES_DUDA: FraseDuda[] = [
  { id: "final", texto: "¿Es tu respuesta final?" },
  { id: "mirame", texto: "Mírame… ¿lo tienes seguro?" },
  { id: "ojos", texto: "Mírame a los ojos y dímelo otra vez: ¿es esa?" },
  { id: "reloj", texto: "Detengo el reloj un momento… ¿la sostienes?" },
  { id: "aliento", texto: "El público contiene el aliento… ¿la confirmas?" },
  { id: "piensalo", texto: "Piénsalo bien. Después de decirla, ya no hay vuelta atrás." },
  { id: "letra", texto: "Hay quien bajó de estas gradas por una sola letra…" },
  { id: "corazon", texto: "Tu corazón dice una cosa… ¿y tu memoria qué dice?" },
  { id: "otra-vez", texto: "Te lo pregunto una vez más: ¿es tu última palabra?" },
  { id: "cambiar", texto: "Todavía puedes cambiarla… o sostenerla. Tú decides." },
  { id: "murmullo", texto: "Escucha cómo murmura la sala… ¿sigues con esa?" },
  { id: "respira", texto: "Respira hondo. ¿La confirmas?" },
  { id: "dudaron", texto: "Mucha gente dudó justo aquí…" },
  { id: "prisa", texto: "La sabiduría no se apresura… ¿ya lo pensaste bien?" },
  { id: "cabeza", texto: "¿Me lo dices con el corazón o con la cabeza?" },
  { id: "silencio", texto: "Silencio en la casa de la sabiduría… ¿es esa?" },
  { id: "decides", texto: "Una grada más… o un paso atrás. Tú decides." },
  { id: "nada", texto: "Yo no te diré nada. Solo te pregunto: ¿es tu respuesta final?" },
  { id: "cierra", texto: "Cierra los ojos un segundo… ¿sigue siendo esa?" },
  { id: "vi", texto: "Aquí he visto dudar a mucha gente sabia… y a otra acertar." },
  { id: "certeza", texto: "¿Tienes certeza? Dímelo mirándome." },
  { id: "avisado", texto: "«El simple todo lo cree; Mas el avisado mira bien sus pasos.» ¿Miraste bien la tuya?" },
  { id: "segura1", texto: "Mucha gente se quedó en esta grada…", cuando: "segura" },
  { id: "segura2", texto: "Esta es una grada segura: si la subes, nadie te la quita. ¿La sostienes?", cuando: "segura" },
  { id: "alta1", texto: "Aquí arriba llega poca gente… ¿la confirmas?", cuando: "alta" },
  { id: "alta2", texto: "Desde aquí cada grada pesa más. ¿Es tu respuesta final?", cuando: "alta" },
  { id: "alta3", texto: "Estás muy cerca de la cima… piénsalo una vez más.", cuando: "alta" },
];
/** La cita de una de las frases (comprobada con la RVR1960). */
export const CITA_DUDA: Verso = { text: "El simple todo lo cree; Mas el avisado mira bien sus pasos.", ref: "Proverbios 14:15" };
/** Cuántas de las últimas frases no se repiten. */
export const DUDA_SIN_REPETIR = 6;

/**
 * La frase de Etán para la grada `n`, sin repetir las últimas que dijo en la partida (`recientes`). Solo mira la grada
 * y las frases de antes: nunca la respuesta.
 */
export function fraseDeDuda(n: number, recientes: string[], azar: () => number = Math.random): FraseDuda {
  const segura = (GRADAS_SEGURAS as readonly number[]).includes(n);
  const alta = n >= 11;
  const propias = FRASES_DUDA.filter((f) => (f.cuando === "segura" && segura) || (f.cuando === "alta" && alta));
  const generales = FRASES_DUDA.filter((f) => !f.cuando);
  const sin = new Set(recientes.slice(-DUDA_SIN_REPETIR));
  // en las gradas seguras y en las altas, la mitad de las veces una frase de esa grada
  const quiero = propias.length && azar() < 0.5 ? propias : generales;
  let libres = quiero.filter((f) => !sin.has(f.id));
  if (!libres.length) libres = [...propias, ...generales].filter((f) => !sin.has(f.id));
  if (!libres.length) libres = generales;
  return libres[Math.floor(azar() * libres.length) % libres.length];
}

/** Cómo va la duda en la partida (lo guarda el servidor): cada cuánto, la última escena, si toca en esta pregunta. */
export type DudaEstado = { cada: number; ultima: number; plan: boolean; usada: boolean; frases: string[] };

// ================================================================ el duelo de sabios
/**
 * El duelo de sabios (Proverbios 27:17): dos personas responden a la vez las mismas diez preguntas, de la grada 1 a
 * la 10. Acertar suma 100 puntos y hasta 100 más por la rapidez; gana quien sume más. Se reta a un amigo o vecino
 * que esté en línea, o se busca a alguien que también quiera un duelo. El servidor lleva el reloj de cada ronda,
 * corrige y pasa a la siguiente: nada se simula. El juego principal sigue siendo subir las quince gradas solo.
 */
export const DUELO_RONDAS = 10;
export const DUELO_SEGUNDOS = 20;
/** Segundos que se ve la respuesta de cada ronda antes de la siguiente. */
export const DUELO_REVELAR_S = 6;
/** Segundos para prepararse antes de la primera pregunta. */
export const DUELO_PREPARAR_S = 4;
/** Segundos que tiene el retado para aceptar. */
export const DUELO_RETO_S = 45;
export const DUELOS_DIA = 10;
/** Gozo al terminar (dentro del tope de gozo del concurso); quien abandona no gana nada. */
export const GOZO_DUELO = { gana: 12, empate: 6, pierde: 3 } as const;
/** Duelos ganados para el manto de los vencedores. */
export const DUELOS_MANTO = 5;
/**
 * Contra la computadora el duelo es de práctica: este gozo (dentro del tope del concurso), sin copa, manto ni tabla, y
 * no cuenta entre los duelos del día ni entre los jugados.
 */
export const GOZO_PRACTICA_DUELO = { gana: 4, empate: 3, pierde: 2 } as const;
export const VERSO_DUELO: Verso = { text: "Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo.", ref: "Proverbios 27:17" };

/** Los puntos de una respuesta buena: 100, y hasta 100 más según lo rápido que se respondió. */
export function puntosDuelo(msUsados: number): number {
  const total = DUELO_SEGUNDOS * 1000;
  return 100 + Math.round((100 * Math.max(0, total - Math.max(0, msUsados))) / total);
}

// ================================================================ los compañeros de la computadora (la noche y el duelo)
/**
 * Los compañeros de «La noche de los sabios» y el rival del duelo de práctica: cuánto tardan en contestar (ms desde
 * que se muestra la pregunta) y cuántas veces aciertan, por nivel. Siempre se ven como tales («Nombre 🤖», de
 * shared/mesa.ts) y nunca cuentan en la base.
 */
export const BOT_SABIO: Record<NivelBot, { ms: [number, number]; acierta: number }> = {
  facil: { ms: [6000, 17000], acierta: 0.45 },
  normal: { ms: [4500, 13000], acierta: 0.66 },
  dificil: { ms: [3000, 9500], acierta: 0.84 },
};

/** Un número de 0 a 1 que siempre sale igual con los mismos números (la noche o el duelo, la ronda y quién): así no hay que guardar nada. */
export function azarFijo(...xs: number[]): number {
  let h = 2166136261;
  for (const x of xs) {
    h ^= x & 0xffff;
    h = Math.imul(h, 16777619);
    h ^= x >>> 16;
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/**
 * Lo que contesta un compañero de la computadora en una ronda, y a los cuántos ms de mostrarse la pregunta. Sale del
 * azar fijo de (la partida, la ronda, quién contesta): siempre da lo mismo, así que el servidor lo calcula cuando
 * alguien pregunta por la partida, sin guardar ningún plan.
 */
export function respuestaDeBot(nivel: NivelBot, partida: number, ronda: number, quien: number, opciones: readonly string[], correcta: string): { o: string; ms: number } {
  const b = BOT_SABIO[nivel];
  const ms = b.ms[0] + (b.ms[1] - b.ms[0]) * azarFijo(partida, ronda, quien, 1);
  const malas = opciones.filter((o) => o !== correcta);
  const o = azarFijo(partida, ronda, quien, 2) < b.acierta || !malas.length ? correcta : malas[Math.floor(azarFijo(partida, ronda, quien, 3) * malas.length)];
  return { o, ms };
}

/** El rival del duelo de práctica no tiene personaje: su número (negativo) dice su nombre (−1 es el primero de NOMBRES_BOT, −2 el segundo…). */
export const nombreDeRival = (numero: number) => nombreDeBot(-numero - 1);

/** El número de un rival de la computadora para el duelo (al azar), que nunca se llame como quien juega. */
export function numeroDeRival(nombre: string, azar: () => number = Math.random): number {
  const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const mias = new Set(sinTildes(nombre).split(/[^a-z0-9]+/).filter(Boolean));
  const inicio = Math.floor(azar() * NOMBRES_BOT.length) % NOMBRES_BOT.length;
  for (let k = 0; k < NOMBRES_BOT.length; k++) {
    const i = (inicio + k) % NOMBRES_BOT.length;
    if (!mias.has(sinTildes(NOMBRES_BOT[i]))) return -(i + 1);
  }
  return -(inicio + 1);
}

export type EstadoDuelo = "invitado" | "jugando" | "terminado" | "rechazado" | "vencido" | "cancelado";
export type DueloLado = { nombre: string; camino: Camino; puntos: number; respondio: boolean };
/** Lo que se respondió en la ronda que se acaba de cerrar (la del rival solo se ve aquí, ya cerrada). */
export type DueloRevelado = {
  n: number;
  texto: string;
  opciones: string[];
  correcta: string;
  explica: string;
  ref: string;
  mia: string | null;
  suya: string | null;
  misPuntos: number;
  susPuntos: number;
};
export type DueloVista = {
  id: number;
  estado: EstadoDuelo;
  /** Fui yo quien retó (o quien esperaba en la búsqueda). */
  reto: boolean;
  yo: DueloLado;
  rival: DueloLado;
  /** El personaje del rival (para pedirle la revancha); el rival de la computadora tiene un número negativo. */
  rivalId: number;
  /** El rival es de la computadora (con su nivel): el duelo es de práctica. */
  bot: NivelBot | null;
  ronda: number;
  pregunta: { n: number; texto: string; opciones: string[]; segundos: number; restantes: number } | null;
  /** Lo que respondí en la ronda abierta (mientras espero al otro). */
  miRespuesta: string | null;
  revelado: DueloRevelado | null;
  /** Segundos para lo que viene: que acepte el reto, que empiece la primera pregunta o la ronda siguiente. */
  espera: number;
  fin: { gane: boolean; empate: boolean; abandono: boolean; meFui: boolean; gozo: number; premio: string | null } | null;
};
/** El reto que le llega a quien retaron. */
export type RetoDuelo = { id: number; de: string; camino: Camino; restantes: number };
export type FilaDuelo = { puesto: number; nombre: string; ganados: number; jugados: number; esYo: boolean };
export type DuelosEstado = {
  rivales: AmigoPosible[];
  hoy: number;
  jugados: number;
  ganados: number;
  tabla: FilaDuelo[];
  semana: string;
  buscando: boolean;
};
