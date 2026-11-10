/**
 * Jerusalén en línea, etapa 2 («La ciudad»): las reglas de la ciudad que comparten el servidor y
 * el juego.
 *
 * Al salir del templo se llega a un mapa fijo y pequeño de Jerusalén, el mismo para todos: el
 * templo, el palacio del rey y la escuela de los profetas (por ahora solo edificios; sus caminos
 * son de la etapa 3), la plaza con la puerta de la ciudad y cuatro barrios de casas de jugadores.
 * Cada personaje tiene una parcela fija en un barrio, y su casa crece con su servicio en el templo.
 *
 * El servidor guarda solo números (barrio, parcela, nivel de la casa). Cada teléfono dibuja la
 * ciudad: completo su barrio y las casas principales, y el resto de lejos, como siluetas.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { EscalonId, JerusalenEstado } from "./jerusalen";

export type Verso = { text: string; ref: string };

/** Casas (parcelas) de cada barrio. */
export const CASAS_POR_BARRIO = 40;
/** Vecinos que se dibujan a la vez (en tu barrio y en las casas principales). */
export const VECINOS_VISIBLES = 20;

/**
 * Las cuatro áreas de barrio del mapa, en el orden en que se llenan (primero las que están junto
 * a la plaza). Desde el barrio 5 se repiten las áreas como otro barrio del mismo nombre.
 */
export const BARRIOS: { nombre: string; ref: string; lado: "SE" | "NE" | "SO" | "NO"; nota: string }[] = [
  { nombre: "Ciudad de David", ref: "2 Samuel 5:9", lado: "SE", nota: "David moró en la fortaleza y la llamó la Ciudad de David." },
  { nombre: "Barrio de la puerta de las Ovejas", ref: "Nehemías 3:1", lado: "NE", nota: "El sumo sacerdote Eliasib y los sacerdotes edificaron la puerta de las Ovejas." },
  { nombre: "Ofel", ref: "Nehemías 3:26", lado: "SO", nota: "Allí habitaban los sirvientes del templo." },
  { nombre: "Barrio de la puerta de Efraín", ref: "Nehemías 8:16", lado: "NO", nota: "En su plaza el pueblo hizo enramadas para la fiesta." },
];
export const AREAS = BARRIOS.length;

/** Área del mapa (1 a 4) donde está un barrio. */
export function areaDeBarrio(n: number): number {
  return ((Math.max(1, Math.floor(n)) - 1) % AREAS) + 1;
}

/** Nombre del barrio («Ofel», y desde la segunda vuelta «Ofel 2»). */
export function nombreDeBarrio(n: number): string {
  const b = BARRIOS[areaDeBarrio(n) - 1];
  const vuelta = Math.floor((Math.max(1, Math.floor(n)) - 1) / AREAS);
  return vuelta ? `${b.nombre} ${vuelta + 1}` : b.nombre;
}

// ---------------------------------------------------------------- las casas
export type NivelCasa = { nivel: number; nombre: string; honra: number; texto: string; verso: Verso };

/**
 * La casa crece con la honra: el mérito de todas las temporadas (Proverbios 3:9-10). Nunca baja,
 * aunque cada temporada el mérito vuelva a empezar en cero.
 */
export const NIVELES_CASA: NivelCasa[] = [
  {
    nivel: 0,
    nombre: "Tienda",
    honra: 0,
    texto: "Una tienda de pelo de cabra, como la de los padres que vivieron por la fe.",
    verso: { text: "Por la fe habitó como extranjero en la tierra prometida como en tierra ajena, morando en tiendas con Isaac y Jacob, coherederos de la misma promesa;", ref: "Hebreos 11:9" },
  },
  {
    nivel: 1,
    nombre: "Casa de adobe",
    honra: 500,
    texto: "Paredes de adobe, techo plano con pretil y una escalera para subir al terrado.",
    verso: { text: "Con sabiduría se edificará la casa, Y con prudencia se afirmará;", ref: "Proverbios 24:3" },
  },
  {
    nivel: 2,
    nombre: "Casa de piedra con patio",
    honra: 2500,
    texto: "Muros de piedra labrada, puerta de cedro y un patio con su higuera y su vid.",
    verso: { text: "Cualquiera, pues, que me oye estas palabras, y las hace, le compararé a un hombre prudente, que edificó su casa sobre la roca.", ref: "Mateo 7:24" },
  },
  {
    nivel: 3,
    nombre: "Casa con aposento alto",
    honra: 8000,
    texto: "Sobre el terrado, un aposento de paredes para recibir al varón de Dios.",
    verso: { text: "Yo te ruego que hagamos un pequeño aposento de paredes, y pongamos allí cama, mesa, silla y candelero, para que cuando él viniere a nosotros, se quede en él.", ref: "2 Reyes 4:10" },
  },
];

/** El versículo de la casa que crece (en la ventana de tu casa). */
export const VERSO_HONRA: Verso = {
  text: "Honra a Jehová con tus bienes, Y con las primicias de todos tus frutos; Y serán llenos tus graneros con abundancia, Y tus lagares rebosarán de mosto.",
  ref: "Proverbios 3:9-10",
};

/** El lema de cada casa. */
export const VERSO_CASA: Verso = { text: "pero yo y mi casa serviremos a Jehová.", ref: "Josué 24:15" };

/** Nivel de la casa que corresponde a una honra. */
export function nivelPorHonra(honra: number): number {
  let n = 0;
  for (const x of NIVELES_CASA) if (honra >= x.honra) n = x.nivel;
  return n;
}

/** Honra de una casa: el mérito de todas las temporadas. */
export function honraDe(meritoTotal: number): number {
  return Math.max(0, Math.floor(meritoTotal));
}

// ---------------------------------------------------------------- los edificios principales
/** Lo que se lee al acercarse al palacio y a la escuela (sus caminos se abren en la etapa 3). */
export const EDIFICIOS: Record<"palacio" | "escuela" | "mercado", { nombre: string; texto: string; verso: Verso; pronto: string }> = {
  palacio: {
    nombre: "El palacio del rey",
    texto: "Salomón edificó su casa en trece años: la casa del bosque del Líbano, el pórtico de columnas y el pórtico del trono, donde el rey juzgaba.",
    verso: { text: "Hizo asimismo el pórtico del trono en que había de juzgar, el pórtico del juicio, y lo cubrió de cedro del suelo al techo.", ref: "1 Reyes 7:7" },
    pronto: "El camino del reino se abre en la etapa 3: entonces habrá rey, capitanes y juicios en el palacio.",
  },
  escuela: {
    nombre: "La escuela de los profetas",
    texto: "Los hijos de los profetas vivían junto a Eliseo, estudiaban la palabra y oraban. Cuando el lugar les quedó estrecho, cada uno trajo una viga.",
    verso: { text: "Vamos ahora al Jordán, y tomemos de allí cada uno una viga, y hagamos allí lugar en que habitemos.", ref: "2 Reyes 6:2" },
    pronto: "El camino de la profecía se abre en la etapa 3: entonces habrá rollos para estudiar y el monte para orar.",
  },
  mercado: {
    nombre: "El mercado de la plaza",
    texto: "Aquí se venderán corderos, aceite y harina, con pesas justas.",
    verso: { text: "El peso falso es abominación a Jehová; Mas la pesa cabal le agrada.", ref: "Proverbios 11:1" },
    pronto: "El mercado abre en la etapa 3, con el oficio de mercader.",
  },
};

/** Consejos de los ancianos sentados a la puerta (Rut 4:1-2): uno distinto cada vez. */
export const CONSEJOS_ANCIANOS: Verso[] = [
  { text: "El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.", ref: "Proverbios 1:7" },
  { text: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
  { text: "La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor.", ref: "Proverbios 15:1" },
  { text: "Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.", ref: "Proverbios 22:6" },
  { text: "Hacer justicia y juicio es a Jehová Más agradable que sacrificio.", ref: "Proverbios 21:3" },
  { text: "En todo tiempo ama el amigo, Y es como un hermano en tiempo de angustia.", ref: "Proverbios 17:17" },
  { text: "Corona de honra es la vejez Que se halla en el camino de justicia.", ref: "Proverbios 16:31" },
  { text: "De más estima es el buen nombre que las muchas riquezas, Y la buena fama más que la plata y el oro.", ref: "Proverbios 22:1" },
];

/** El púlpito de la plaza, donde Esdras leyó la ley al pueblo. */
export const VERSO_PULPITO: Verso = { text: "Y el escriba Esdras estaba sobre un púlpito de madera que habían hecho para ello,", ref: "Nehemías 8:4" };
/** Los niños que juegan en la plaza. */
export const VERSO_PLAZA: Verso = { text: "Y las calles de la ciudad estarán llenas de muchachos y muchachas que jugarán en ellas.", ref: "Zacarías 8:5" };
/** Las enramadas sobre los terrados en la fiesta de los tabernáculos. */
export const VERSO_ENRAMADAS: Verso = {
  text: "Salió, pues, el pueblo, y trajeron ramas e hicieron tabernáculos, cada uno sobre su terrado, en sus patios, en los patios de la casa de Dios, en la plaza de la puerta de las Aguas, y en la plaza de la puerta de Efraín.",
  ref: "Nehemías 8:16",
};

// ---------------------------------------------------------------- respuestas de la API
/** Una casa del barrio tal como la ven todos (sin siervos ni bienes: eso solo lo ve el dueño). */
export type CasaVista = {
  parcela: number;
  nivel: number;
  personajeId: number;
  nombre: string;
  escalon: EscalonId;
  esMia: boolean;
};

/** Un barrio completo (al entrar en su área). */
export type BarrioEstado = { n: number; area: number; nombre: string; casas: CasaVista[] };

export type CiudadEstado = {
  yo: {
    personajeId: number;
    nombre: string;
    escalon: EscalonId;
    barrio: number;
    parcela: number;
    nivel: number;
    honra: number;
    /** El nivel que sigue y la honra que pide (null en el último). */
    siguiente: { nivel: number; honra: number } | null;
    /** Si la casa acaba de crecer al entrar: el nivel nuevo. */
    subio: number | null;
  };
  barrio: { n: number; area: number; nombre: string; casas: CasaVista[]; libres: number };
  /** Los barrios de las otras áreas, de lejos: solo dónde hay casas y de qué nivel. */
  otros: { n: number; area: number; casas: { parcela: number; nivel: number }[] }[];
  jerusalen: JerusalenEstado["jerusalen"];
  temporada: { n: number; dePrueba: boolean; diasRestantes: number };
};
