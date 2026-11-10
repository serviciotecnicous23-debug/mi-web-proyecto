/**
 * Jerusalén en línea: el modo en línea de «El aprendiz del templo».
 *
 * Etapa 1, «Templo en línea»: solo el camino del sacerdocio. Cada cuenta tiene un personaje
 * guardado en el servidor; sirve en el mismo templo del modo local, pero sin levitas que
 * trabajen solos, y gana mérito por temporada. Al cerrar cada temporada se reparten los
 * cargos con cupo (1 sumo sacerdote, 3 principales y 12 jefes de turno).
 *
 * El servidor y el juego usan estas mismas reglas. Las preguntas difíciles NO están aquí:
 * viven solo en el servidor (server/jerusalen-banco.ts) y llegan al teléfono sin la respuesta.
 */

/** El juego al que pertenece el modo en línea (para la partida local y la actividad). */
export const JERUSALEN_JUEGO = "aprendiz-del-templo";

/** Días de cada temporada, como los turnos de los sacerdotes (1 Crónicas 24:1-19). */
export const TEMPORADA_DIAS = 28;

/** Personajes en línea por cuenta: uno por camino (sacerdocio, profetas y palacio), desde la etapa 3. */
export const MAX_PERSONAJES = 3;

/** Mientras no estén abiertos los tres caminos, los cargos se anuncian «de prueba». */
export const CARGOS_DE_PRUEBA = true;

/** Mérito de la temporada para ser sacerdote de turno (escalón por mérito, sin cupo). */
export const MERITO_TURNO = 150;
/** Mérito mínimo de la temporada para recibir un cargo con cupo al cerrarla. */
export const MERITO_MIN_CARGO = 100;
/** Para recibir un cargo hay que haber servido en los últimos días antes del cierre. */
export const DIAS_ACTIVO = 7;
/** Días sin servir que traen un aviso a quien tiene un cargo, y días que se lo quitan. */
export const DIAS_AVISO = 3;
export const DIAS_PIERDE = 7;

export type EscalonId = "sacerdote" | "turno" | "jefe" | "principal" | "sumo";

/** La escalera del sacerdocio, de abajo hacia arriba. */
export const ESCALONES: { id: EscalonId; nombre: string; cupo: number | null; como: string }[] = [
  { id: "sacerdote", nombre: "Sacerdote", cupo: null, como: "Al consagrarte en Jerusalén en línea (no hace falta haber jugado la historia)" },
  { id: "turno", nombre: "Sacerdote de turno", cupo: null, como: `Con ${MERITO_TURNO} de mérito en la temporada` },
  { id: "jefe", nombre: "Jefe de un turno", cupo: 12, como: "Los 12 siguientes en mérito al cerrar la temporada" },
  { id: "principal", nombre: "Principal sacerdote", cupo: 3, como: "Los 3 siguientes en mérito que aprobaron el estudio «El sacerdocio de Aarón»" },
  { id: "sumo", nombre: "Sumo sacerdote", cupo: 1, como: "El de más mérito que ya fue principal sacerdote y aprobó «El Día de la Expiación»" },
];

export const CARGOS_CON_CUPO: EscalonId[] = ["sumo", "principal", "jefe"];

export function escalonNombre(id: EscalonId | null | undefined): string {
  return ESCALONES.find((e) => e.id === id)?.nombre ?? "Sacerdote";
}

/** Índice del escalón (0 sacerdote … 4 sumo sacerdote). */
export function escalonIndice(id: EscalonId | null | undefined): number {
  const i = ESCALONES.findIndex((e) => e.id === id);
  return i < 0 ? 0 : i;
}

/** Deberes del templo que dan mérito, y cuánto vale cada uno. */
export type DeberId = "ofrendas" | "lena" | "aceite" | "panes" | "incienso" | "diezmos" | "orantes";
export const DEBERES: DeberId[] = ["ofrendas", "lena", "aceite", "panes", "incienso", "diezmos", "orantes"];
export const MERITO_DEBER: Record<DeberId, number> = { ofrendas: 2, lena: 1, aceite: 1, panes: 1, incienso: 2, diezmos: 2, orantes: 1 };

/** Mérito al terminar por primera vez la instrucción del sacerdote (las tres partes). */
export const MERITO_INSTRUCCION = 50;
export const PARTES_INSTRUCCION = 3;

/** Constancia: al cumplir 10 minutos de deberes en el día, una vez por día. */
export const CONSTANCIA_SEGUNDOS = 600;
export const MERITO_CONSTANCIA = 60;

/** Conocimiento: preguntas difíciles, sin repetir en la temporada. */
export const MERITO_PREGUNTA = 30;
export const PREGUNTAS_DIA = 10;
export const SEGUNDOS_PREGUNTA = 20;
/** Tiempo entre una pregunta y la siguiente (Azarías vuelve a preguntar). */
export const ESPERA_PREGUNTA = 30;

/**
 * Tope diario: la primera hora de deberes cuenta completa, las dos siguientes la mitad y
 * después el turno del día termina (así quien tiene poco tiempo también puede llegar arriba).
 */
export const HORA_COMPLETA = 3600;
export const TOPE_DIA = 3 * 3600;

/** El teléfono junta los deberes y los manda cada tanto. */
export const ENVIO_CADA = 15;

/** Factor del mérito según los segundos de deberes que ya lleva el día. */
export function factorDelDia(segundos: number): number {
  if (segundos < HORA_COMPLETA) return 1;
  if (segundos < TOPE_DIA) return 0.5;
  return 0;
}

/** Nombres para el personaje: sacerdotes fieles de la Biblia. También se puede usar el de la cuenta. */
export const NOMBRES_SACERDOTE: { nombre: string; ref: string }[] = [
  { nombre: "Eleazar", ref: "Números 20:28" },
  { nombre: "Itamar", ref: "Éxodo 28:1" },
  { nombre: "Finees", ref: "Números 25:11" },
  { nombre: "Ahimelec", ref: "1 Samuel 21:1" },
  { nombre: "Sadoc", ref: "1 Reyes 1:39" },
  { nombre: "Ahimaas", ref: "2 Samuel 15:27" },
  { nombre: "Amarías", ref: "2 Crónicas 19:11" },
  { nombre: "Joiada", ref: "2 Crónicas 24:16" },
  { nombre: "Hilcías", ref: "2 Reyes 22:8" },
  { nombre: "Jeremías", ref: "Jeremías 1:1" },
  { nombre: "Ezequiel", ref: "Ezequiel 1:3" },
  { nombre: "Esdras", ref: "Esdras 7:11" },
  { nombre: "Zacarías", ref: "Lucas 1:5" },
];
/** Valor especial para usar el nombre de la cuenta. */
export const NOMBRE_PROPIO = "__propio__";

// ---------------------------------------------------------------- el nombre que cada uno prefiera
/** Largo del nombre libre del personaje. */
export const NOMBRE_LIBRE = { min: 2, max: 20 };

/**
 * Raíces de groserías e insultos (se buscan dentro del nombre, sin tildes ni letras repetidas).
 * Solo raíces que no aparecen en nombres de verdad (por eso «verga» o «nazi» van como palabra entera:
 * Vergara, nazareo).
 */
export const RAICES_MALAS = [
  "mierd", "pendej", "joder", "jodid", "maricon", "cabron", "zorra", "perra", "idiot", "estupid", "imbecil", "chinga", "malparid",
  "gonorrea", "hijueput", "hitler", "sexo", "porno", "fuck", "shit", "bitch", "pussy", "mamaguev", "huevon", "weon", "boludo",
  "pelotud", "cagad", "putit", "putas",
];
/** Palabras que no van en un nombre (iguales a una palabra del nombre). */
export const PALABRAS_MALAS = [
  "puta", "puto", "verga", "nazi", "culo", "pito", "polla", "caca", "tonto", "tonta", "bobo", "boba", "feo", "fea", "cono", "orto",
  "teta", "pinga",
];
/** Nombres que no son para un personaje del juego (Dios, el adversario, la administración). */
const RESERVADOS = [
  "dios", "jehova", "jesus", "jesucristo", "cristo", "mesias", "espiritu santo", "satanas", "satan", "diablo", "lucifer", "belcebu", "demonio",
  "admin", "administrador", "administradora", "moderador", "moderadora", "ministerio", "avivando el fuego",
];

export function sinTildes(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** El nombre limpio: sin espacios de más. */
export function limpiarNombreLibre(nombre: string): string {
  return nombre.replace(/\s+/g, " ").trim();
}

/** Por qué no sirve un nombre libre (o null si sirve). Lo usan la pantalla y el servidor. */
export function errorNombreLibre(nombre: string): string | null {
  const n = limpiarNombreLibre(nombre);
  if (n.length < NOMBRE_LIBRE.min || n.length > NOMBRE_LIBRE.max) return `El nombre debe tener entre ${NOMBRE_LIBRE.min} y ${NOMBRE_LIBRE.max} letras.`;
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]*$/.test(n)) return "Usa solo letras y espacios (sin números, correos ni signos).";
  const plano = sinTildes(n.toLowerCase()).replace(/[^a-zñ ]/g, " ").replace(/\s+/g, " ").trim();
  const juntar = (t: string) => t.replace(/ /g, "").replace(/(.)\1+/g, "$1");
  const pegado = juntar(plano);
  // palabra por palabra: tal cual, o sin letras repetidas («putooo»), solo contra las que no tienen dobles («polla» ≠ «Pola»)
  const sinDobles = PALABRAS_MALAS.filter((m) => !/(.)\1/.test(m));
  const palabraMala = (p: string) => PALABRAS_MALAS.includes(p) || sinDobles.includes(p.replace(/(.)\1+/g, "$1"));
  if (RAICES_MALAS.some((r) => pegado.includes(juntar(r))) || plano.split(" ").some(palabraMala)) return "Ese nombre no se puede usar. Elige otro.";
  if (RESERVADOS.some((r) => plano === r || (` ${plano} `).includes(` ${r} `))) return "Ese nombre no es para un personaje. Elige otro.";
  return null;
}

// ---------------------------------------------------------------- respuestas de la API
export type JerusalenTitular = { personajeId: number; nombre: string; persona: string; isMe: boolean };

export type JerusalenEstado = {
  /** La cuenta está aprobada (solo las aprobadas juegan en línea). */
  cuentaAprobada: boolean;
  /**
   * Lo que muestra la partida local guardada en la cuenta. Ya no cierra la entrada: toda cuenta
   * aprobada entra. `conoceTemplo` dice si ya conoce el servicio (llegó a sacerdote en la historia)
   * y `puedeSumo` si ya fue principal sacerdote en alguna temporada (requisito para ser sumo).
   */
  requisito: { rango: number; creible: boolean; motivo: string | null; puedeEntrar: boolean; puedeSumo: boolean; conoceTemplo: boolean };
  /** `instruccion`: partes terminadas de la instrucción (del sacerdote, o los primeros pasos de los otros caminos). */
  personaje: { id: number; nombre: string; propio: boolean; creado: string; instruccion: number; estudios: number; camino: "sacerdocio" | "profecia" | "realeza" } | null;
  /** Todos los personajes de la cuenta (uno por camino); `activo` es con el que se juega. */
  personajes: { id: number; nombre: string; camino: "sacerdocio" | "profecia" | "realeza"; escalon: EscalonId; merito: number; activo: boolean }[];
  temporada: { n: number; inicio: string; fin: string; diasRestantes: number; dePrueba: boolean };
  /** Hoy en Jerusalén en línea (el mismo reloj para todos): la fecha hebrea y la fiesta, si la hay. */
  jerusalen: { fecha: string; fiesta: { id: string; nombre: string; icono: string; merito: number; dia: number; de: number } | null; proxima: { nombre: string; icono: string; enMinutos: number } | null };
  mio: {
    merito: number;
    puesto: number | null;
    escalon: EscalonId;
    cargo: EscalonId | null;
    deberes: number;
    respondidas: number;
    aciertos: number;
    hoy: { segundos: number; factor: number; preguntas: number; preguntasMax: number; constancia: boolean };
    diasSinServir: number | null;
    perdio: string | null;
  } | null;
  /** Los cargos y la tabla del camino del personaje (cada camino compite con los suyos). */
  escalera: { id: EscalonId; cupo: number | null; titulares: JerusalenTitular[] }[];
  tabla: { puesto: number; personajeId: number; nombre: string; persona: string; merito: number; isMe: boolean; camino?: "sacerdocio" | "profecia" | "realeza" }[];
  /** Los de los tres caminos (para verlos en la temporada). */
  escaleras?: Record<"sacerdocio" | "profecia" | "realeza", { id: EscalonId; cupo: number | null; titulares: JerusalenTitular[] }[]>;
  tablas?: Record<"sacerdocio" | "profecia" | "realeza", { puesto: number; personajeId: number; nombre: string; persona: string; merito: number; isMe: boolean; camino?: "sacerdocio" | "profecia" | "realeza" }[]>;
  enLinea: number;
  nombres: { nombre: string; ref: string }[];
  esAdmin: boolean;
};

export type JerusalenAcciones = {
  merito: number;
  ganado: number;
  escalon: EscalonId;
  hoy: { segundos: number; factor: number };
  constancia?: number;
  /** Sacerdotes sirviendo ahora en el templo (con 2 o más, los deberes valen ×1,2). */
  juntos?: number;
  /** Encargos o la ofrenda del barrio que se cumplieron con este envío. */
  misiones?: { titulo: string; premio: number }[];
  /** Gozo ganado con este envío (deberes y encargos) y el que tiene ahora la persona. */
  gozo?: number;
  gozoTotal?: number;
  /** Puesto en la tabla de su camino en esta temporada. */
  puesto?: number | null;
};

export type JerusalenPregunta = {
  id: string;
  pregunta: string;
  opciones: string[];
  segundos: number;
  quedanHoy: number;
};

export type JerusalenRespuesta = {
  correcta: boolean;
  aTiempo: boolean;
  respuesta: string;
  explica: string;
  ref: string;
  ganado: number;
  merito: number;
};
