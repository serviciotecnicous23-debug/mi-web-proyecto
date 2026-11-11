/**
 * La calle de los siervos de Dios (pedido de Luis: que los personajes principales tengan su casa en la ciudad, con
 * recados y chismes, como en los juegos de antes, y que se conecten entre ellos). En la franja del sur de la ciudad,
 * una calle con las casas de Azarías, Eleazar, Conanías, Isaías, Miqueas, Eliaquim y Etán: cada uno espera en su
 * puerta, cuenta lo que pasa (lo de la Escritura y lo que pasa en el juego) y cada día da un recado que lleva de una
 * casa a otra. Las citas son literales de la RVR1960.
 */
import type { Verso } from "./ciudad";
import { capituloDelDia, type CapituloId, type MomentoFiesta } from "./capitulos";

export type PersonajeId = "azarias" | "eleazar" | "conanias" | "isaias" | "miqueas" | "eliaquim" | "etan";

export type Chisme = { texto: string; verso?: Verso };

export type PersonajeCiudad = {
  id: PersonajeId;
  nombre: string;
  titulo: string;
  /** El retrato de la pantalla (Portrait). */
  retrato: string;
  /** La figura 3D (three/characters.ts). */
  look: "azarias" | "principal" | "lino" | "profeta" | "oficial" | "sacerdote";
  ropa?: { manto?: string; faja?: string };
  /** Su casa: el centro, hacia dónde mira la puerta (1 = sur, -1 = norte) y su nivel (2 piedra, 3 con aposento). */
  casa: { x: number; z: number; dir: 1 | -1; nivel: 2 | 3 };
  /** Dónde espera, en la calle, delante de su patio. */
  puerta: [number, number];
  /** Dónde sirve de día. */
  trabajo: string;
  saludo: string;
  chismes: Chisme[];
};

/** La calle: corre de poniente a oriente; las casas del norte miran al sur y las del sur miran al norte. */
export const CALLE_SIERVOS = { x0: 40, x1: 72, z: 57, ancho: 4.2 };
/** Lo que ocupa la calle con sus casas (el relleno de casas sin nombre queda fuera). */
export const ZONA_SIERVOS: [number, number, number, number] = [39.2, 49.6, 72.8, 64.6];

const NORTE = 52.0;
const SUR = 62.0;
const casaN = (x: number, nivel: 2 | 3 = 2) => ({ casa: { x, z: NORTE, dir: 1 as const, nivel }, puerta: [x, 55.6] as [number, number] });
const casaS = (x: number, nivel: 2 | 3 = 2) => ({ casa: { x, z: SUR, dir: -1 as const, nivel }, puerta: [x, 58.4] as [number, number] });

export const PERSONAJES_CIUDAD: PersonajeCiudad[] = [
  {
    id: "azarias",
    nombre: "Azarías",
    titulo: "sumo sacerdote, de la casa de Sadoc",
    retrato: "azarias",
    look: "azarias",
    ...casaN(43, 3),
    trabajo: "en el templo",
    saludo: "La paz de Jehová sea en tu casa. ¿Vienes de servir en el templo?",
    chismes: [
      { texto: "Desde que el pueblo empezó a traer las ofrendas, hemos comido y nos ha sobrado mucho. ¡Hay montones en los atrios!", verso: { text: "Desde que comenzaron a traer las ofrendas a la casa de Jehová, hemos comido y nos hemos saciado, y nos ha sobrado mucho:", ref: "2 Crónicas 31:10" } },
      { texto: "Conanías no da abasto con tantos diezmos. El rey mandó preparar más cámaras en la casa de Jehová.", verso: { text: "Entonces mandó Ezequías que preparasen cámaras en la casa de Jehová; y las prepararon.", ref: "2 Crónicas 31:11" } },
      { texto: "Eleazar enseña muy bien a los aprendices. Si todavía no pasaste por la cámara de los sacerdotes, ve: te espera." },
      { texto: "Me dicen que Etán prepara en la casa de la sabiduría preguntas tan difíciles que ni los ancianos de la puerta las aciertan." },
    ],
  },
  {
    id: "eleazar",
    nombre: "Eleazar",
    titulo: "sacerdote que instruye a los aprendices",
    retrato: "eleazar",
    look: "principal",
    ...casaS(47),
    trabajo: "en la cámara de los sacerdotes",
    saludo: "¡Ah, eres tú! ¿Ya aprendiste el orden del servicio de hoy?",
    chismes: [
      { texto: "El fuego del altar no se apaga nunca, ni de día ni de noche. Es lo primero que aprende un aprendiz.", verso: { text: "El fuego arderá continuamente en el altar; no se apagará.", ref: "Levítico 6:13" } },
      { texto: "Azarías se levanta antes del alba para mirar las cámaras. ¡Ese hombre no descansa!" },
      { texto: "El otro día Isaías habló al pueblo en el atrio. Todos callaron: hasta los que vendían palomas." },
      { texto: "Si llevas aceite a las lámparas, que sea aceite puro de olivas machacadas. Así lo pide la ley.", verso: { text: "Y mandarás a los hijos de Israel que te traigan aceite puro de olivas machacadas, para el alumbrado, para hacer arder continuamente las lámparas.", ref: "Éxodo 27:20" } },
    ],
  },
  {
    id: "conanias",
    nombre: "Conanías",
    titulo: "levita a cargo de las cámaras de los diezmos",
    retrato: "conanias",
    look: "lino",
    ...casaN(51),
    trabajo: "en las cámaras de los diezmos",
    saludo: "Pasa, pasa… perdona el desorden: cuento diezmos hasta en sueños.",
    chismes: [
      { texto: "Mi hermano Simei me ayuda a contar las primicias y los diezmos. A veces no nos alcanzan las manos.", verso: { text: "y dieron cargo de ello al levita Conanías, el principal, y Simei su hermano fue el segundo.", ref: "2 Crónicas 31:12" } },
      { texto: "Empezaron a formar los montones en el mes tercero y terminaron en el séptimo. ¡Cuatro meses trayendo ofrendas!", verso: { text: "En el mes tercero comenzaron a formar aquellos montones, y terminaron en el mes séptimo.", ref: "2 Crónicas 31:7" } },
      { texto: "Eliaquim mandó preguntar cuánto aceite hay en las cámaras. El palacio también lleva la cuenta." },
      { texto: "Cuando el rey vio los montones, bendijo a Jehová. Yo estaba ahí, con las manos llenas de harina.", verso: { text: "Cuando Ezequías y los príncipes vinieron y vieron los montones, bendijeron a Jehová, y a su pueblo Israel.", ref: "2 Crónicas 31:8" } },
    ],
  },
  {
    id: "isaias",
    nombre: "Isaías",
    titulo: "profeta, hijo de Amoz",
    retrato: "isaias",
    look: "profeta",
    ...casaS(55),
    trabajo: "en la escuela de los profetas",
    saludo: "Jehová te ha traído a mi puerta. Escucha, que hoy tengo palabra.",
    chismes: [
      { texto: "Sebna se labró un sepulcro en lo alto, como si fuera a quedarse para siempre. Jehová me mandó a hablarle.", verso: { text: "¿Qué tienes tú aquí, o a quién tienes aquí, que labraste aquí sepulcro para ti, como el que en lugar alto labra su sepultura, o el que esculpe para sí morada en una peña?", ref: "Isaías 22:16" } },
      { texto: "Eliaquim llevará la llave de la casa de David sobre su hombro. Jehová lo llama su siervo.", verso: { text: "Y pondré la llave de la casa de David sobre su hombro; y abrirá, y nadie cerrará; cerrará, y nadie abrirá.", ref: "Isaías 22:22" } },
      { texto: "Mi hijo Sear-jasub me acompañó a ver al rey Acaz, junto al acueducto del estanque de arriba. Todavía se acuerda.", verso: { text: "Entonces dijo Jehová a Isaías: Sal ahora al encuentro de Acaz, tú, y Sear-jasub tu hijo, al extremo del acueducto del estanque de arriba, en el camino de la heredad del Lavador,", ref: "Isaías 7:3" } },
      { texto: "Venid y estemos a cuenta, dice Jehová. Aunque el pecado sea como la grana, él lo deja blanco como la nieve.", verso: { text: "Venid luego, dice Jehová, y estemos a cuenta: si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos;", ref: "Isaías 1:18" } },
    ],
  },
  {
    id: "miqueas",
    nombre: "Miqueas",
    titulo: "profeta de Moreset",
    retrato: "miqueas",
    look: "profeta",
    ropa: { manto: "#6d7a4a" },
    ...casaN(59),
    trabajo: "en la sala de los rollos",
    saludo: "Un campesino de Moreset en la gran ciudad… ¿Qué te trae por aquí, amigo?",
    chismes: [
      { texto: "Yo dije que Sion sería arada como campo. Y el rey Ezequías no me mató: temió a Jehová y oró.", verso: { text: "¿Acaso lo mataron Ezequías rey de Judá y todo Judá? ¿No temió a Jehová, y oró en presencia de Jehová, y Jehová se arrepintió del mal que había hablado contra ellos?", ref: "Jeremías 26:19" } },
      { texto: "¿Qué pide Jehová de ti? Te lo digo siempre: justicia, misericordia y humildad.", verso: { text: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8" } },
      { texto: "Escribí que de Belén, la pequeña, saldrá el que será Señor en Israel. Isaías y yo esperamos lo mismo.", verso: { text: "Pero tú, Belén Efrata, pequeña para estar entre las familias de Judá, de ti me saldrá el que será Señor en Israel;", ref: "Miqueas 5:2" } },
      { texto: "¿Qué Dios como el nuestro, que perdona? No retiene para siempre su enojo.", verso: { text: "¿Qué Dios como tú, que perdona la maldad, y olvida el pecado del remanente de su heredad? No retuvo para siempre su enojo, porque se deleita en misericordia.", ref: "Miqueas 7:18" } },
    ],
  },
  {
    id: "eliaquim",
    nombre: "Eliaquim",
    titulo: "mayordomo del palacio, hijo de Hilcías",
    retrato: "eliaquim",
    look: "oficial",
    ropa: { manto: "#5b2a6e", faja: "#e2b33c" },
    ...casaS(63, 3),
    trabajo: "en el palacio del rey",
    saludo: "Bienvenido. Tengo poco tiempo: el rey me espera, pero para ti siempre hay un momento.",
    chismes: [
      { texto: "El rey trabaja día y noche. Las aguas de Gihón ya corren hacia el occidente de la ciudad de David.", verso: { text: "Este Ezequías cubrió los manantiales de Gihón la de arriba, y condujo el agua hacia el occidente de la ciudad de David.", ref: "2 Crónicas 32:30" } },
      { texto: "Sebna era el mayordomo antes que yo; ahora es el escriba. Mejor no le hables del asunto." },
      { texto: "El rey edificó los muros caídos y alzó las torres. Si quieres ayudar, el muro del norte todavía se levanta.", verso: { text: "Después con ánimo resuelto edificó Ezequías todos los muros caídos, e hizo alzar las torres,", ref: "2 Crónicas 32:5" } },
      { texto: "Joa, el canciller, anota todo lo que pasa en el reino. Si algo pasó, él lo sabe." },
    ],
  },
  {
    id: "etan",
    nombre: "Etán",
    titulo: "el sabio de la casa de la sabiduría",
    retrato: "etan",
    look: "oficial",
    ropa: { manto: "#5b2a6e", faja: "#e2b33c" },
    ...casaN(67),
    trabajo: "en la casa de la sabiduría",
    saludo: "¡Mi concursante favorito! Bueno… todos son mis favoritos. ¿Qué tal tus gradas?",
    chismes: [
      { texto: "Los varones del rey copian los proverbios de Salomón, y yo los ayudo. ¡Cuánta sabiduría en tan pocas palabras!", verso: { text: "También estos son proverbios de Salomón, los cuales copiaron los varones de Ezequías, rey de Judá:", ref: "Proverbios 25:1" } },
      { texto: "La Escritura dice que Salomón fue más sabio que Etán ezraíta. Yo llevo su nombre… y su humildad, espero.", verso: { text: "Aun fue más sabio que todos los hombres, más que Etán ezraíta, y que Hemán, Calcol y Darda, hijos de Mahol;", ref: "1 Reyes 4:31" } },
      { texto: "Cuando no hay concurso, canto el salmo del primer Etán.", verso: { text: "Las misericordias de Jehová cantaré perpetuamente; De generación en generación haré notoria tu fidelidad con mi boca.", ref: "Salmo 89:1" } },
      { texto: "Una pista: en las gradas de arriba pregunto mucho de los días del rey Ezequías. ¡Lee Isaías, Reyes y Crónicas!" },
    ],
  },
];

export function personajeCiudad(id: string): PersonajeCiudad | undefined {
  return PERSONAJES_CIUDAD.find((p) => p.id === id);
}

// ---------------------------------------------------------------- recados (una cadena de tres casas por día)
export type Recado = {
  id: string;
  titulo: string;
  /** Las tres casas en orden: quien encarga, quien recibe y responde, y a quien se le lleva la respuesta. */
  cadena: [PersonajeId, PersonajeId, PersonajeId];
  /** Lo que se lleva en cada tramo (del primero al segundo y del segundo al tercero). */
  lleva: [string, string];
  /** Lo que dice cada uno al darte o recibir el encargo. */
  dice: [string, string, string];
  verso: Verso;
};

export const RECADOS: Recado[] = [
  {
    id: "rollo-rey",
    titulo: "Un rollo para el rey",
    cadena: ["isaias", "eliaquim", "azarias"],
    lleva: ["un rollo con palabra de Jehová", "la respuesta del rey"],
    dice: [
      "Lleva este rollo a Eliaquim; él se lo pondrá en las manos al rey. Es palabra de Jehová.",
      "¡Al fin! El rey lo leerá esta misma noche. Llévale esta respuesta a Azarías: el rey subirá al templo.",
      "El rey subirá a la casa de Jehová… Bendito sea Jehová. Gracias por traerlo, hijo.",
    ],
    verso: { text: "En aquel día llamaré a mi siervo Eliaquim hijo de Hilcías,", ref: "Isaías 22:20" },
  },
  {
    id: "aceite-lamparas",
    titulo: "El aceite de las lámparas",
    cadena: ["conanias", "eleazar", "azarias"],
    lleva: ["una vasija de aceite puro", "la noticia de que las lámparas están arregladas"],
    dice: [
      "Este aceite es para las lámparas del santuario. Llévaselo a Eleazar con cuidado: es aceite puro.",
      "Aceite puro de olivas machacadas, como manda la ley. Avísale a Azarías que las lámparas arden.",
      "Las lámparas arden continuamente. Así debe ser. Bien hecho.",
    ],
    verso: { text: "Y mandarás a los hijos de Israel que te traigan aceite puro de olivas machacadas, para el alumbrado, para hacer arder continuamente las lámparas.", ref: "Éxodo 27:20" },
  },
  {
    id: "cuenta-diezmos",
    titulo: "La cuenta de los diezmos",
    cadena: ["azarias", "conanias", "eliaquim"],
    lleva: ["la orden de contar los montones", "la cuenta de los diezmos"],
    dice: [
      "Que Conanías cuente los montones antes de que llegue el rey. Llévale esta orden.",
      "¡Contar los montones! Simei y yo no dormiremos… Aquí está la cuenta: llévasela a Eliaquim para el rey.",
      "El rey se alegrará con esta cuenta. Bendito sea Jehová, que bendijo a su pueblo.",
    ],
    verso: { text: "Cuando Ezequías y los príncipes vinieron y vieron los montones, bendijeron a Jehová, y a su pueblo Israel.", ref: "2 Crónicas 31:8" },
  },
  {
    id: "pregunta-concurso",
    titulo: "Una pregunta para el concurso",
    cadena: ["etan", "miqueas", "isaias"],
    lleva: ["una tablilla de escribir", "la pregunta de Miqueas"],
    dice: [
      "Necesito una pregunta difícil de los profetas para la grada quince. Pídesela a Miqueas: él sabe muchas.",
      "¿Una pregunta difícil? Aquí tienes: ¿de qué pueblo era yo? Que Isaías la revise, que es muy exigente.",
      "¿De qué pueblo es Miqueas? ¡De Moreset! Está bien. Dile a Etán que es muy buena… pero no muy difícil.",
    ],
    verso: { text: "Palabra de Jehová que vino a Miqueas de Moreset en días de Jotam, Acaz y Ezequías, reyes de Judá;", ref: "Miqueas 1:1" },
  },
  {
    id: "palabra-miqueas",
    titulo: "La palabra de Miqueas",
    cadena: ["miqueas", "isaias", "eliaquim"],
    lleva: ["las palabras de Miqueas, escritas", "un mensaje de los dos profetas"],
    dice: [
      "Escribí lo que Jehová me dio. Llévaselo a Isaías: él y yo decimos lo mismo, y sé que lo leerá.",
      "Miqueas y yo, de acuerdo como siempre. Lleva esto a Eliaquim: que el palacio sepa que hay que humillarse ante Dios.",
      "Dos profetas diciendo lo mismo… El rey escuchará. Gracias por traerlo tan rápido.",
    ],
    verso: { text: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8" },
  },
  {
    id: "salmo-etan",
    titulo: "El salmo para la fiesta",
    cadena: ["eleazar", "etan", "conanias"],
    lleva: ["el pedido de un salmo", "el salmo copiado"],
    dice: [
      "Los levitas quieren cantar algo nuevo en la fiesta. Pídele a Etán un salmo: él sabe muchos.",
      "¿Un salmo? El del primer Etán: «Las misericordias de Jehová cantaré perpetuamente». Llévalo a Conanías, que reúne a los cantores.",
      "¡Qué hermoso! Los cantores lo aprenderán esta misma semana. Gracias, amigo.",
    ],
    verso: { text: "Las misericordias de Jehová cantaré perpetuamente; De generación en generación haré notoria tu fidelidad con mi boca.", ref: "Salmo 89:1" },
  },
];

/** Premio del recado del día (una vez por día por persona). */
export const RECADO_GOZO = 12;
export const RECADO_MERITO = 20;
/** A cuántos metros de la puerta hay que estar para hablar (lo mira el servidor con la presencia de la ciudad). */
export const RECADO_CERCA = 6;

function semilla(texto: string): number {
  let x = 2166136261;
  for (const ch of texto) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return x;
}

/** Desde este día, los recados de la historia de la temporada (shared/capitulos.ts) se mezclan con los de siempre. */
export const RECADOS_CAPITULO_DESDE = "2026-11-12";

/**
 * El recado del día de cada persona (cambia cada día y no es el mismo para todos). Desde el 12 de noviembre de 2026, la
 * mitad de los días es uno de los recados del capítulo de esa semana; los otros días, el mismo de siempre (así el recado
 * de quien ya iba por la mitad el día de la publicación no cambió).
 */
export function recadoDelDia(dia: string, titular: number): Recado {
  const s = semilla(`recado:${dia}:${titular}`);
  if (dia >= RECADOS_CAPITULO_DESDE) {
    const cap = capituloDelDia(dia)?.capitulo;
    if (cap?.recados.length && ((s >>> 3) & 1) === 0) return cap.recados[(s >>> 4) % cap.recados.length];
  }
  return RECADOS[s % RECADOS.length];
}

export type RecadoEstado = {
  recado: Recado;
  /** 0: ir a quien encarga; 1: llevarlo al segundo; 2: llevar la respuesta al tercero; 3: hecho. */
  paso: number;
  hecho: boolean;
  premio: { gozo: number; merito: number };
};

/**
 * Lo que pasa en el juego, para que los personajes lo cuenten (los chismes de verdad), el capítulo de la historia de
 * esta semana y cómo va la fiesta final (para lo que dice la gente de la calle).
 */
export type ChismesVista = { noticias: string[]; temporada?: number; capitulo?: CapituloId | null; fiesta?: MomentoFiesta | null };
