/**
 * El motor de prácticas de la academia (docs/academia-practicas.md). Cada lección tiene su práctica, hecha con lo que
 * esa lección enseña: actividades de 15 piezas (tarjetas, completar, relacionar, clasificar…), cada una ligada a un
 * objetivo de la lección y con dos versiones o más. Aquí está lo que comparten el servidor y las pantallas:
 * - las piezas y sus nombres;
 * - lo que ve el alumno de cada actividad (sin las respuestas) y lo que se le devuelve al contestar;
 * - el calendario de los repasos (1, 3, 7, 15, 30 y 60 días), las estrellas y el estado de cada objetivo;
 * - los pesos de la nota cuando las prácticas cuentan.
 * Las respuestas viven solo en el servidor (server/academia/practicas/) y se devuelven después de contestar; las
 * califica server/academia-practicas-calificar.ts.
 */
import type { NivelN, Pesos } from "./academia-base";

// ---------------------------------------------------------------- las piezas

export const PIEZAS = [
  "tarjetas", "completa", "relaciona", "clasifica", "ordena", "verdad", "error", "situacion", "explica",
  "linea", "mapa-ideas", "mapa", "pasaje", "escenario", "caso",
] as const;
export type Pieza = (typeof PIEZAS)[number];

export const NOMBRE_PIEZA: Record<Pieza, string> = {
  tarjetas: "Tarjetas de ideas",
  completa: "Completa la idea",
  relaciona: "Relaciona",
  clasifica: "Clasifica",
  ordena: "Ordena",
  verdad: "¿Verdad o error?",
  error: "Encuentra el error",
  situacion: "Situación",
  explica: "Explícalo con tus palabras",
  linea: "Línea del tiempo",
  "mapa-ideas": "Mapa de ideas",
  mapa: "Mapa bíblico",
  pasaje: "Marca en el pasaje",
  escenario: "Escenario ministerial",
  caso: "Caso de estudio",
};

/** La consigna de cada pieza cuando la actividad no trae una propia. */
export const CONSIGNA_PIEZA: Record<Pieza, string> = {
  tarjetas: "Lee la pregunta y toca la respuesta correcta.",
  completa: "Toca una palabra y luego el espacio donde va.",
  relaciona: "Une cada idea de la izquierda con la que le corresponde.",
  clasifica: "Lleva cada frase a su grupo.",
  ordena: "Pon los pasos en su orden.",
  verdad: "¿Es verdad o es un error?",
  error: "Una de estas frases tiene un error. Tócala.",
  situacion: "¿Qué harías o qué dirías?",
  explica: "Escribe tu respuesta con tus palabras.",
  linea: "Ordena los hechos en el tiempo, del primero al último.",
  "mapa-ideas": "Elige cómo se une cada idea con la otra.",
  mapa: "Toca el lugar en el mapa.",
  pasaje: "Toca las palabras del texto que responden.",
  escenario: "Decide qué hacer en cada momento.",
  caso: "Lee el caso y responde paso a paso.",
};

/**
 * Las piezas que no se califican. Desde el 26-nov ninguna: las tarjetas se juegan como Relámpago (tres respuestas, sin
 * trampa) dentro de la práctica que cuenta.
 */
export const PIEZAS_FORMATIVAS: readonly Pieza[] = [];
export const esCalificable = (p: Pieza) => !PIEZAS_FORMATIVAS.includes(p);

/**
 * Las formas de jugar cada pieza (23-nov, pedido de Luis: «que cada avance sea una actividad diferente»). El mismo
 * contenido de la lección se juega de varias formas, elegidas al azar en cada intento, así que nadie sabe con qué se va
 * a encontrar. Todas se califican de 0 a 1 y cuentan igual para el dominio y la nota.
 */
export const FORMATOS = {
  tarjetas: ["relampago"],
  completa: ["banco", "elige", "escribe", "anagrama", "sopa", "crucigrama", "arma"],
  relaciona: ["parejas", "elige-pareja", "memoria"],
  clasifica: ["recuadros", "desliza", "intruso", "atrapa"],
  ordena: ["lista", "escalones", "donde-va"],
  verdad: ["verdad-o-error", "cual-falsa"],
  error: ["frases", "detective"],
  situacion: ["opciones", "chat"],
  explica: ["texto"],
  linea: ["lista", "escalones", "donde-va"],
  "mapa-ideas": ["normal"],
  mapa: ["normal"],
  pasaje: ["normal"],
  escenario: ["normal"],
  caso: ["normal"],
} as const satisfies Record<Pieza, readonly string[]>;
export type Formato = (typeof FORMATOS)[Pieza][number];

/** Las formas que no van en la práctica que cuenta (escribir la palabra exacta es más difícil: es para aprender). */
export const FORMATOS_SOLO_PARA_APRENDER: readonly Formato[] = ["escribe"];

/** El nombre de cada forma de jugar (la etiqueta de arriba de la actividad). */
export const NOMBRE_FORMATO: Record<Formato, string> = {
  relampago: "Relámpago",
  banco: "Completa la idea",
  elige: "Elige la palabra",
  escribe: "Escríbela",
  anagrama: "Anagrama",
  sopa: "Sopa de letras",
  crucigrama: "Crucigrama",
  arma: "Arma la frase",
  parejas: "Relaciona",
  "elige-pareja": "Elige la pareja",
  memoria: "Memoria",
  recuadros: "Clasifica",
  desliza: "Desliza",
  intruso: "¿Cuál no va?",
  atrapa: "¡Atrápalas!",
  lista: "Ordena",
  escalones: "Escalones",
  "donde-va": "¿Dónde va?",
  "verdad-o-error": "¿Verdad o error?",
  "cual-falsa": "¿Cuál es falsa?",
  frases: "Encuentra el error",
  detective: "Detective",
  opciones: "Situación",
  chat: "Conversación",
  texto: "Explícalo con tus palabras",
  normal: "Práctica",
};

/** Cómo se juega cada forma, en una frase (se ve arriba de la actividad y en la primera vez, más grande). */
export const COMO_SE_JUEGA: Record<Formato, string> = {
  relampago: "Lee la pregunta y toca la respuesta correcta.",
  banco: "Toca una palabra de abajo y después el espacio donde va.",
  elige: "En cada espacio, toca la palabra que va.",
  escribe: "Escribe en cada espacio la palabra que falta.",
  anagrama: "Las letras de la palabra que falta están revueltas: tócalas en orden.",
  sopa: "Busca en la sopa de letras las palabras que completan la frase.",
  crucigrama: "Escribe cada palabra del crucigrama con su pista.",
  arma: "Toca los trozos en orden para armar la idea.",
  parejas: "Toca una idea de la izquierda y después su pareja de la derecha.",
  "elige-pareja": "Toca lo que corresponde a la idea de arriba.",
  memoria: "Destapa dos cartas: si van juntas, quedan a la vista.",
  recuadros: "Toca una frase y después el recuadro del grupo donde va.",
  desliza: "Lleva cada frase a su lado: deslízala o toca el grupo.",
  intruso: "Tres frases van juntas y una no. Toca la que no va.",
  atrapa: "Las frases caen: atrapa solo las del grupo que se pide.",
  lista: "Pon los pasos en orden: arrástralos o usa las flechas.",
  escalones: "Arma la escalera: toca lo que va en cada escalón, del primero al último.",
  "donde-va": "Un paso se salió de la lista. Toca el lugar donde va.",
  "verdad-o-error": "¿Es verdad o es un error? Desliza o toca.",
  "cual-falsa": "Toca la frase que se pide.",
  frases: "Una de estas frases tiene un error. Tócala.",
  detective: "Lee el texto como un detective y toca la frase que tiene un error.",
  opciones: "Elige qué harías o qué dirías.",
  chat: "Te escribieron: elige tu respuesta.",
  texto: "Escribe tu respuesta con tus palabras.",
  normal: "",
};

/** Las piezas que se responden en varios pasos (cada paso con su devolución). */
export const PIEZAS_POR_PASOS: readonly Pieza[] = ["verdad", "mapa", "escenario", "caso"];

/**
 * La modalidad de cada intento (se elige al azar): cambia cómo se ven el avance y los puntos, nunca la nota.
 * - camino: la llama que avanza;
 * - escalera: cada acierto sube un escalón y cada error baja uno; arriba hay un premio de puntos;
 * - racha: los aciertos seguidos multiplican los puntos (×2 desde 3, ×3 desde 6);
 * - reloj: responder en menos de 20 segundos da puntos de más (nunca en la que cuenta: ahí no hay reloj).
 */
export const MODALIDADES = ["camino", "escalera", "racha", "reloj"] as const;
export type Modalidad = (typeof MODALIDADES)[number];
export const NOMBRE_MODALIDAD: Record<Modalidad, { nombre: string; regla: string }> = {
  camino: { nombre: "El camino de la llama", regla: "Cada actividad enciende un poco más la llama." },
  escalera: { nombre: "Escalera de fuego", regla: "Cada acierto sube un escalón y cada error baja uno. Llega arriba para el premio." },
  racha: { nombre: "Racha encendida", regla: "Los aciertos seguidos multiplican tus puntos: ×2 desde 3 y ×3 desde 6." },
  reloj: { nombre: "Contra el reloj", regla: "Si respondes bien en menos de 20 segundos, ganas puntos de más." },
};

// ---------------------------------------------------------------- las reglas

export const PRACTICAS = {
  /** Desde este porcentaje, un objetivo queda dominado (y la lección gana su segunda estrella). */
  domina: 80,
  /** Desde este porcentaje, el reto de dominio de una lección queda dominado (y da su parte de los puntos extra). */
  retoDomina: 90,
  /** Actividades de la práctica del día, como máximo (junto con las preguntas del Repaso del día). */
  porDia: 6,
  /** Nunca más de estas seguidas de la misma lección en la práctica del día. */
  seguidasMismaLeccion: 2,
  /** Segundos de la Carrera de la luz. */
  carreraSegundos: 90,
  /** Fallos que terminan la Racha. */
  rachaVidas: 3,
  /** Fallos del mismo objetivo que ponen al alumno en «Necesitan ayuda». */
  fallosAyuda: 3,
} as const;

export type ModoPractica = "guiada" | "cuenta" | "dia" | "mision" | "reto";
export const NOMBRE_MODO: Record<ModoPractica, string> = {
  guiada: "Práctica guiada",
  cuenta: "Práctica de la lección",
  dia: "Práctica del día",
  mision: "Misión de la materia",
  reto: "Reto de dominio",
};

/**
 * Los puntos extra de una materia aprobada (el reto de dominio, 26-nov): lo que le falta para 100, en la parte de las
 * lecciones con el reto dominado. Con todos dominados, la nota llega a 100.
 */
export function extraDeLecciones(base: number, dominadas: number, lecciones: number): number {
  if (!lecciones || base >= 100) return 0;
  return Math.round(((100 - Math.max(0, base)) * Math.max(0, Math.min(dominadas, lecciones))) / lecciones);
}

// ---------------------------------------------------------------- lo que ve el alumno

export type EscenaVista = { id: string; narra: string; pregunta: string; opciones: string[] };
export type PasoCasoVista =
  | { tipo: "situacion"; pregunta: string; opciones: string[] }
  | { tipo: "explica"; pregunta: string; min: number; max: number };

/** Una actividad como la ve el alumno: sin las respuestas (las piezas por pasos muestran un paso a la vez). */
export type ItemVista = { consigna: string } & (
  | { pieza: "tarjetas"; formato: "relampago"; pregunta: string; opciones: string[]; paso: number; pasos: number }
  | { pieza: "completa"; formato: "banco"; partes: (string | { hueco: number })[]; banco: string[] }
  | { pieza: "completa"; formato: "elige"; partes: (string | { hueco: number })[]; opciones: string[][] }
  | { pieza: "completa"; formato: "escribe"; partes: (string | { hueco: number })[]; letras: number[]; iniciales: string[] }
  | { pieza: "completa"; formato: "anagrama"; partes: (string | { hueco: number })[]; hueco: number; hechas: string[]; letras: string[]; paso: number; pasos: number }
  | { pieza: "completa"; formato: "sopa"; partes: (string | { hueco: number })[]; filas: string[]; buscar: number }
  | { pieza: "completa"; formato: "crucigrama"; partes: (string | { hueco: number })[]; filas: number; columnas: number; palabras: { n: number; hueco: number; fila: number; col: number; dir: "h" | "v"; largo: number }[] }
  | { pieza: "completa"; formato: "arma"; trozos: string[] }
  | { pieza: "relaciona"; formato: "parejas"; izquierda: string[]; derecha: string[] }
  | { pieza: "relaciona"; formato: "elige-pareja"; idea: string; opciones: string[]; paso: number; pasos: number }
  | { pieza: "relaciona"; formato: "memoria"; cartas: string[]; descubiertas: number[]; fallos: number; paso: number; pasos: number }
  | { pieza: "clasifica"; formato: "recuadros"; grupos: string[]; frases: string[] }
  | { pieza: "clasifica"; formato: "desliza"; grupos: string[]; frase: string; paso: number; pasos: number }
  | { pieza: "clasifica"; formato: "intruso"; frases: string[]; paso: number; pasos: number }
  | { pieza: "clasifica"; formato: "atrapa"; pregunta: string | null; grupo: string; frases: string[] }
  | { pieza: "ordena"; formato: "lista"; pasos: string[] }
  | { pieza: "ordena" | "linea"; formato: "escalones"; colocados: string[]; opciones: string[]; paso: number; pasos: number }
  | { pieza: "ordena" | "linea"; formato: "donde-va"; suelto: string; lista: string[]; paso: number; pasos: number }
  | { pieza: "verdad"; formato: "verdad-o-error"; afirmacion: string; paso: number; pasos: number }
  | { pieza: "verdad"; formato: "cual-falsa"; busca: "falsa" | "verdad"; afirmaciones: string[]; paso: number; pasos: number }
  | { pieza: "error"; formato: "frases" | "detective"; frases: string[] }
  | { pieza: "situacion"; formato: "opciones" | "chat"; caso: string; pregunta: string; opciones: string[] }
  | { pieza: "explica"; formato: "texto"; pregunta: string; min: number; max: number }
  | { pieza: "linea"; formato: "lista"; eventos: string[] }
  | { pieza: "mapa-ideas"; formato: "normal"; nodos: { id: string; texto: string; x: number; y: number }[]; enlaces: { de: string; a: string }[]; relaciones: string[] }
  | { pieza: "mapa"; formato: "normal"; imagen: string; alt: string; lugar: string; paso: number; pasos: number }
  | { pieza: "pasaje"; formato: "normal"; ref: string; palabras: string[]; cuantas: number }
  | { pieza: "escenario"; formato: "normal"; situacion: string; escena: EscenaVista; paso: number }
  | { pieza: "caso"; formato: "normal"; titulo: string; relato: string[]; actual: PasoCasoVista; paso: number; pasos: number }
);

/**
 * Lo que manda el alumno al contestar (los índices son los del orden en que se le mostró). Según la forma de jugar:
 * `opcion` (relámpago, elige la pareja, escalones; en ¿dónde va?, el lugar), `grupo` (desliza), `frase` (¿cuál no va?,
 * ¿cuál es falsa?), o el campo de siempre de la pieza.
 */
export type RespuestaPractica =
  | { pieza: "tarjetas"; opcion: number }
  | { pieza: "completa"; huecos?: string[]; trazos?: number[][]; orden?: number[] }
  | { pieza: "relaciona"; pares?: number[]; opcion?: number; cartas?: number[] }
  | { pieza: "clasifica"; grupos?: number[]; grupo?: number; frase?: number; atrapadas?: number[] }
  | { pieza: "ordena"; orden?: number[]; opcion?: number }
  | { pieza: "verdad"; verdad?: boolean; frase?: number }
  | { pieza: "error"; frase: number }
  | { pieza: "situacion"; opcion: number }
  | { pieza: "explica"; texto: string }
  | { pieza: "linea"; orden?: number[]; opcion?: number }
  | { pieza: "mapa-ideas"; relaciones: number[] }
  | { pieza: "mapa"; x: number; y: number }
  | { pieza: "pasaje"; palabras: number[] }
  | { pieza: "escenario"; opcion: number }
  | { pieza: "caso"; opcion?: number; texto?: string };

/** La corrección de cada pieza (lo que se marca en pantalla después de contestar). */
export type Correccion =
  | { pieza: "tarjetas"; correcta: number }
  | { pieza: "completa"; formato?: undefined; correctas: string[]; marcas: boolean[]; error: string | null }
  | { pieza: "completa"; formato: "anagrama"; correcta: string; bien: boolean }
  | { pieza: "completa"; formato: "sopa"; elegidas: { texto: string; trazo: number[]; bien: boolean }[]; faltan: { texto: string; trazo: number[] }[]; palabras: string[] }
  | { pieza: "completa"; formato: "arma"; correcto: number[]; texto: string }
  | { pieza: "relaciona"; formato?: undefined; correctas: number[]; marcas: boolean[] }
  | { pieza: "relaciona"; formato: "elige-pareja"; correcta: number }
  | { pieza: "relaciona"; formato: "memoria"; cartas: number[]; par: boolean }
  | { pieza: "clasifica"; formato?: undefined; correctas: number[]; marcas: boolean[]; explicas: (string | null)[] }
  | { pieza: "clasifica"; formato: "desliza"; grupo: number; explica: string | null }
  | { pieza: "clasifica"; formato: "intruso"; intruso: number; grupoDe: string; grupoDeLasOtras: string }
  | { pieza: "clasifica"; formato: "atrapa"; deGrupo: boolean[]; atrapadas: number[] }
  | { pieza: "ordena"; formato?: undefined; correcto: number[] }
  | { pieza: "ordena" | "linea"; formato: "escalones" | "donde-va"; correcta: number }
  | { pieza: "verdad"; formato?: undefined; verdad: boolean }
  | { pieza: "verdad"; formato: "cual-falsa"; correcta: number }
  | { pieza: "error"; malo: number; correccion: string }
  | { pieza: "situacion"; correcta: number; explicas: string[] }
  | { pieza: "explica"; nota: number; ideas: { texto: string; ok: boolean; medio?: boolean }[]; avisos: string[]; modelo: string }
  | { pieza: "linea"; formato?: undefined; correcto: number[]; fechas: string[] }
  | { pieza: "mapa-ideas"; correctas: number[]; marcas: boolean[] }
  | { pieza: "mapa"; x: number; y: number; bien: boolean }
  | { pieza: "pasaje"; correctas: number[] }
  | { pieza: "escenario"; valor: 0 | 1 | 2; mejor: number; explicas: string[] }
  | { pieza: "caso"; correcta?: number; explicas?: string[]; nota?: number; ideas?: { texto: string; ok: boolean; medio?: boolean }[]; modelo?: string };

/** Lo que vuelve al contestar un paso: la nota del paso, por qué, la frase de la lección y el paso siguiente. */
export type Devolucion = {
  /** De 0 a 1. */
  puntaje: number;
  bien: boolean;
  explica: string;
  /** La frase de la lección que sostiene la respuesta. */
  apoyo: string;
  ref: string | null;
  correccion: Correccion;
  /** En las piezas por pasos: el paso que sigue (null cuando la actividad terminó). */
  siguiente: ItemVista | null;
  /** La actividad terminó (con su puntaje final, de 0 a 1). */
  terminada: boolean;
  puntajeActividad: number | null;
};

/** Un intento abierto, como lo recibe el reproductor. */
export type IntentoVista = {
  id: number;
  modo: ModoPractica;
  /** La Administración probando: nada cuenta. */
  prueba: boolean;
  titulo: string;
  subtitulo: string;
  leccion: { id: string; titulo: string; n: number } | null;
  materia: { id: string; titulo: string };
  items: {
    n: number;
    pieza: Pieza;
    formato: Formato;
    objetivo: string;
    /** De qué lección es (en la práctica del día y en la misión se mezclan). */
    leccion: string | null;
    vista: ItemVista;
    /** Ya contestada (al volver a un intento a medias). */
    hecha: boolean;
  }[];
  /** En la guiada se puede pedir una pista (la frase de la lección). */
  pistas: boolean;
  /** La misión: el texto con que termina cuando se cumple. */
  cierre: string | null;
  /** La modalidad de este intento (cómo se ven el avance y los puntos). */
  modalidad: Modalidad;
  /** Los puntos que ya lleva (al retomar un intento a medias). */
  puntos: number;
};

export type ObjetivoResultado = { n: number; texto: string; pct: number; estado: EstadoObjetivo };

/** El final de un intento. */
export type ResultadoPractica = {
  modo: ModoPractica;
  puntaje: number;
  estrellas: number;
  /** Las estrellas de la lección antes de este intento (para animar las nuevas). */
  antes: number;
  objetivos: ObjetivoResultado[];
  /** Cuándo vuelve a preguntar el motor (ISO), si hay algo programado. */
  proxima: string | null;
  medallas: { clave: string; nombre: string }[];
  mejor: number | null;
  /** El reto de dominio: los puntos extra de la materia antes y después, y su nota nueva. */
  extra?: { antes: number; ahora: number; nota: number } | null;
  siguiente: { tipo: "leccion" | "materia" | "dia"; href: string; texto: string } | null;
  prueba: boolean;
};

// ---------------------------------------------------------------- la práctica de una lección y el camino

export type EstadoObjetivo = "nuevo" | "aprendiendo" | "dominado" | "firme";
export const NOMBRE_ESTADO: Record<EstadoObjetivo, string> = {
  nuevo: "Nuevo",
  aprendiendo: "Aprendiendo",
  dominado: "Dominado",
  firme: "Firme",
};

export type PracticaLeccionVista = {
  leccion: { id: string; titulo: string; n: number; completada: boolean };
  materia: { id: string; titulo: string; nivel: NivelN | null };
  existe: boolean;
  actividades: number;
  minutos: number;
  piezas: Pieza[];
  /** Ya hizo la práctica al menos una vez (o la guiada de antes del 26-nov). */
  guiada: boolean;
  mejor: number | null;
  estrellas: number;
  intentos: number;
  objetivos: ObjetivoResultado[];
  /** Lo que falta para empezar, o null si se puede. */
  falta: string | null;
  /** Si la práctica de esta materia entra en la nota del alumno. */
  cuentaEnNota: boolean;
  /**
   * El reto de dominio (los puntos extra): abierto al aprobar la materia por el curso. `puntos`: lo que da esta lección
   * al dominarlo; `falta`: por qué todavía no se puede.
   */
  reto: { abierto: boolean; mejor: number | null; dominado: boolean; puntos: number; falta: string | null } | null;
  /** La práctica que cuenta es obligatoria: el examen final la pide (entra en su nota y todavía no aprobó la materia). */
  obligatoria: boolean;
  /** Ya aprobó la materia: practica cuando quiera, su nota no baja y el reto de dominio la puede subir. */
  aprobada: boolean;
  /** Las formas de jugar que le pueden tocar en esta lección (sus nombres). */
  formas: string[];
  prueba: boolean;
  conSesion: boolean;
};

export type ParadaCamino = {
  leccion: { id: string; titulo: string; n: number; completada: boolean };
  existe: boolean;
  guiada: boolean;
  estrellas: number;
  mejor: number | null;
  abierta: boolean;
};

export type CaminoMateria = {
  materia: { id: string; titulo: string; nivel: NivelN | null };
  paradas: ParadaCamino[];
  completa: boolean;
  estrellas: number;
  posibles: number;
  mision: { abierta: boolean; mejor: number | null; falta: string | null; titulo: string };
  cuentaEnNota: boolean;
  /** Los puntos extra de la materia (con la materia aprobada por el curso): los que tiene y los que puede ganar. */
  reto: { abierto: boolean; extra: number; posible: number; dominadas: number; lecciones: number; base: number } | null;
  /** Las prácticas que cuentan son obligatorias para el examen final (todavía no aprobó la materia). */
  obligatoria: boolean;
  /** Ya aprobó la materia: practica libre. */
  aprobada: boolean;
  /** El componente de la nota (0–100) si cuenta. */
  componente: number | null;
};

export type PracticaDelDiaResumen = { pendientes: number; proxima: string | null; firmes: number; total: number };

export type JuegoPregunta =
  | { tipo: "eleccion"; id: string; texto: string; opciones: string[]; correcta: number; explica: string; leccion: string }
  | { tipo: "verdad"; id: string; texto: string; verdad: boolean; explica: string; leccion: string };
export type JuegoVista = { preguntas: JuegoPregunta[]; marcas: { carrera: number | null; racha: number | null }; alcance: string };

export type MedallaPractica = { clave: string; nombre: string; detalle: string; fecha: string };

// ---------------------------------------------------------------- el calendario de los repasos

/** Los días de espera de cada escalón: lo aprendido vuelve a los 1, 3, 7, 15, 30 y 60 días. */
export const DIAS_PRACTICA = [1, 3, 7, 15, 30, 60] as const;
/** Desde este escalón, la actividad está firme (se respondió bien después de esperar 30 días). */
export const ESCALON_FIRME = 5;
/** Después del último repaso (60 días), la actividad se retira del calendario. */
export const ESCALON_RETIRADO = 6;

/**
 * El escalón siguiente de una actividad después de un repaso y los días que espera:
 * - bien (80 % o más): sube un escalón;
 * - a medias (50 a 79 %): repite el escalón;
 * - mal: baja dos escalones y vuelve mañana.
 * `dias` es null cuando la actividad queda retirada.
 */
export function siguienteEscalon(escalon: number, puntaje: number): { escalon: number; dias: number | null } {
  const k = Math.max(0, Math.min(ESCALON_RETIRADO, Math.floor(escalon)));
  if (puntaje >= 0.8) {
    const s = Math.min(ESCALON_RETIRADO, k + 1);
    return { escalon: s, dias: s >= ESCALON_RETIRADO ? null : DIAS_PRACTICA[s] };
  }
  if (puntaje >= 0.5) return { escalon: k, dias: DIAS_PRACTICA[Math.min(k, DIAS_PRACTICA.length - 1)] };
  return { escalon: Math.max(0, k - 2), dias: 1 };
}

/**
 * Intercala la práctica del día: nunca más de `seguidas` actividades de la misma lección una tras otra (si se puede).
 * Respeta el orden de llegada (lo más atrasado primero) dentro de lo posible.
 */
export function intercalarPorLeccion<T extends { leccion: string }>(lista: T[], max: number, seguidas: number = PRACTICAS.seguidasMismaLeccion): T[] {
  const quedan = [...lista];
  const out: T[] = [];
  while (out.length < max && quedan.length) {
    const ultimas = out.slice(-seguidas).map((x) => x.leccion);
    const repetiria = ultimas.length === seguidas && ultimas.every((l) => l === ultimas[0]);
    let i = 0;
    if (repetiria) {
      const j = quedan.findIndex((x) => x.leccion !== ultimas[0]);
      i = j >= 0 ? j : 0;
    }
    out.push(quedan.splice(i, 1)[0]);
  }
  return out;
}

// ---------------------------------------------------------------- estrellas, estados y nota de la práctica

/** Las estrellas de una lección: 1 al hacer la práctica, 2 con 80 % y 3 con todo bien (vale la mejor). */
export function estrellasDe(guiada: boolean, mejor: number | null): number {
  if (!guiada) return 0;
  if (mejor != null && mejor >= 100) return 3;
  if (mejor != null && mejor >= PRACTICAS.domina) return 2;
  return 1;
}

/** El estado de un objetivo: lo que sacó en la mejor práctica que cuenta y si sus actividades ya están firmes. */
export function estadoObjetivo(guiada: boolean, pctMejor: number | null, firmes: boolean): EstadoObjetivo {
  if (!guiada) return "nuevo";
  if (pctMejor == null || pctMejor < PRACTICAS.domina) return "aprendiendo";
  return firmes ? "firme" : "dominado";
}

/** La nota de un intento (0–100): el promedio de sus actividades calificables. */
export function notaIntento(puntajes: number[]): number {
  if (!puntajes.length) return 0;
  return Math.round((100 * puntajes.reduce((a, b) => a + Math.max(0, Math.min(1, b)), 0)) / puntajes.length);
}

/** El componente «Prácticas» de la nota de una materia: el promedio de la mejor de cada lección (la que falta cuenta 0). */
export function componentePracticas(mejores: (number | null)[]): number {
  if (!mejores.length) return 0;
  return Math.round(mejores.reduce<number>((a, b) => a + (b ?? 0), 0) / mejores.length);
}

/** Minutos aproximados de una práctica según sus piezas. */
export function minutosDe(piezas: Pieza[]): number {
  const seg: Record<Pieza, number> = {
    tarjetas: 60, completa: 50, relaciona: 50, clasifica: 60, ordena: 45, verdad: 50, error: 40, situacion: 45, explica: 120,
    linea: 60, "mapa-ideas": 70, mapa: 50, pasaje: 60, escenario: 150, caso: 150,
  };
  return Math.max(3, Math.round(piezas.reduce((a, p) => a + seg[p], 0) / 60));
}

// ---------------------------------------------------------------- los pesos de la nota

/**
 * Los pesos de la nota cuando las prácticas cuentan (el panel los puede cambiar por nivel; suman 100). Equilibrados
 * (23-nov, pedido de Luis): las prácticas pesan casi como el examen final, porque son completas y se pueden repetir
 * (vale la mejor), así que ayudan a subir la nota a quien va abajo, según su porcentaje.
 */
export const PESOS_CON_PRACTICAS: Record<NivelN, Pesos> = {
  1: { final: 40, practicas: 30, repasos: 15, versiculo: 15, mini: 0, escritos: 0 },
  2: { final: 35, practicas: 25, repasos: 0, versiculo: 10, mini: 15, escritos: 15 },
  3: { final: 30, practicas: 25, repasos: 0, versiculo: 10, mini: 15, escritos: 20 },
  4: { final: 30, practicas: 25, repasos: 0, versiculo: 10, mini: 15, escritos: 20 },
  5: { final: 30, practicas: 25, repasos: 0, versiculo: 10, mini: 15, escritos: 20 },
};

/** Por qué unos pesos no sirven (o null si sirven): enteros de 0 a 100 que suman 100, con examen final y prácticas. */
export function problemaDePesos(p: Partial<Pesos>, base: Pesos): string | null {
  const claves = Object.keys(base) as (keyof Pesos)[];
  for (const k of claves) {
    const v = p[k];
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v > 100) return "Cada peso debe ser un número entero de 0 a 100.";
    // lo que el nivel no tiene (por ejemplo, las mini pruebas del Nivel 1) no se puede pedir
    if (base[k] === 0 && v > 0 && k !== "practicas") return "Ese nivel no tiene ese componente.";
  }
  const suma = claves.reduce((a, k) => a + (p[k] as number), 0);
  if (suma !== 100) return `Los pesos deben sumar 100 (ahora suman ${suma}).`;
  if (!((p.final as number) >= 20)) return "El examen final debe pesar al menos 20.";
  if (!((p.practicas as number) > 0)) return "Las prácticas deben pesar algo; para sacarlas de la nota, apágalas por materia.";
  return null;
}

// ---------------------------------------------------------------- medallas

export const MEDALLAS_PRACTICA: Record<string, { nombre: string; detalle: string }> = {
  "racha-7": { nombre: "Siete días seguidos", detalle: "Practicaste siete días seguidos." },
  "racha-30": { nombre: "Un mes con fuego", detalle: "Practicaste treinta días seguidos." },
  "explica-50": { nombre: "Lo sabe explicar", detalle: "Cincuenta respuestas con tus palabras con 80 o más." },
  "perfectas-10": { nombre: "Diez lecciones perfectas", detalle: "Diez lecciones con las tres estrellas." },
  dominada: { nombre: "Materia dominada", detalle: "Todas las lecciones de una materia con dos estrellas o más." },
  firme: { nombre: "Materia firme", detalle: "Todo lo de una materia lo recuerdas después de 30 días." },
  mision: { nombre: "Misión cumplida", detalle: "La misión de una materia con 80 o más." },
};

/** El nombre de una medalla por su clave («dominada:n1-salvacion» → «Materia dominada»). */
export function medallaPractica(clave: string): { nombre: string; detalle: string } | null {
  return MEDALLAS_PRACTICA[clave] ?? MEDALLAS_PRACTICA[clave.split(":")[0]] ?? null;
}
