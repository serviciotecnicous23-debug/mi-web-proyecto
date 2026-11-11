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
export const VERSO_DUELO: Verso = { text: "Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo.", ref: "Proverbios 27:17" };

/** Los puntos de una respuesta buena: 100, y hasta 100 más según lo rápido que se respondió. */
export function puntosDuelo(msUsados: number): number {
  const total = DUELO_SEGUNDOS * 1000;
  return 100 + Math.round((100 * Math.max(0, total - Math.max(0, msUsados))) / total);
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
  /** El personaje del rival (para pedirle la revancha). */
  rivalId: number;
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
