/**
 * La instrucción del sacerdote (Jerusalén en línea): Azarías lleva al sacerdote nuevo por el templo,
 * lugar por lugar, como se enseñaba a los hijos de Aarón. En cada lugar explica qué es y para qué
 * sirve, lee el versículo y lo que nos enseña hoy (del Libro del aprendiz, data.ts), pide hacer el
 * servicio y hace una pregunta. Son tres partes; el servidor guarda cuántas terminó.
 *
 * Es obligatoria para quien no conoce el templo (no jugó la historia ni sirvió en línea) y se puede
 * repasar cuando se quiera. Las palabras de Azarías no citan la Biblia: los versículos salen de las
 * lecciones ya revisadas (RVR1960).
 */
import { LESSONS, type ItemType, type Line } from "./data";
import { POS, type V2 } from "./layout";

export type DeberInst = "lena" | "ofrendas" | "aceite" | "panes" | "incienso" | "diezmos";

export type PasoInst = {
  id: string;
  parte: 1 | 2 | 3;
  lugar: string;
  donde: V2;
  /** Lección del Libro del aprendiz: su versículo y lo que nos enseña hoy. */
  leccion: string;
  /** Pregunta del banco del juego (data.ts). */
  pregunta: string;
  explica: string[];
  tarea?: { texto: string; deber?: DeberInst; cargar?: ItemType };
};

export const PARTES: { n: 1 | 2 | 3; titulo: string; texto: string }[] = [
  { n: 1, titulo: "El atrio", texto: "La puerta, el mar de bronce, la leña, el altar y las ofrendas del pueblo." },
  { n: 2, titulo: "El Lugar Santo", texto: "El candelero, la mesa de los panes, el altar del incienso y el velo." },
  { n: 3, titulo: "El servicio al pueblo", texto: "Los diezmos, la enseñanza y la bendición." },
];

export const PASOS: PasoInst[] = [
  {
    id: "puertas",
    parte: 1,
    lugar: "la puerta del atrio",
    donde: POS.reception,
    leccion: "puertas",
    pregunta: "puertas",
    explica: [
      "Esta es la puerta del atrio. Aquí llega el pueblo con sus ofrendas, y aquí los recibimos.",
      "El rey Acaz había cerrado estas puertas. Su hijo Ezequías las abrió en el primer mes de su reinado: volver a Dios empezó por abrir su casa.",
    ],
  },
  {
    id: "fuente",
    parte: 1,
    lugar: "el mar de bronce",
    donde: POS.fuente,
    leccion: "fuente",
    pregunta: "fuente",
    explica: [
      "Este es el mar de bronce. Antes de acercarse al altar o de entrar al santuario, el sacerdote se lava las manos y los pies.",
      "Cuando presentes muchas ofrendas se gasta tu pureza: vuelve aquí a lavarte antes de seguir.",
    ],
  },
  {
    id: "lenera",
    parte: 1,
    lugar: "la leñera",
    donde: POS.lenaPile,
    leccion: "lenera",
    pregunta: "lena",
    explica: ["En la leñera está la leña del altar. Cada mañana el sacerdote pone leña nueva para que el fuego no se apague."],
    tarea: { texto: "Carga leña: párate junto a la leñera", cargar: "lena" },
  },
  {
    id: "altar",
    parte: 1,
    lugar: "el altar de bronce",
    donde: POS.altar,
    leccion: "altar",
    pregunta: "fuego",
    explica: [
      "Este es el altar de bronce, frente al templo. Su fuego debe arder siempre: es la señal de que el camino a Dios sigue abierto para el pueblo.",
      "Sobre él se presentan las ofrendas. Si el fuego se apaga, no se puede ofrecer nada.",
    ],
    tarea: { texto: "Pon la leña en el altar", deber: "lena" },
  },
  {
    id: "ofrendas",
    parte: 1,
    lugar: "la puerta, donde llegan las familias",
    donde: POS.reception,
    leccion: "ofrendas",
    pregunta: "palomas",
    explica: [
      "Las familias traen corderos, palomas o flor de harina. Recibe la ofrenda en la puerta y preséntala en el altar.",
      "Quien no tenía para un cordero traía dos palomas, y Dios la recibía igual. Nunca desprecies una ofrenda pequeña.",
    ],
    tarea: { texto: "Recibe una ofrenda en la puerta y preséntala en el altar", deber: "ofrendas" },
  },
  {
    id: "santuario",
    parte: 2,
    lugar: "las puertas del Lugar Santo",
    donde: [-0.7, 0],
    leccion: "santuario",
    pregunta: "cerrado",
    explica: [
      "Ahora entramos al Lugar Santo. Aquí solo entran los sacerdotes.",
      "Mira: al sur está el candelero, al norte la mesa de los panes y, frente al velo, el altar del incienso. Cada uno tiene su servicio.",
    ],
  },
  {
    id: "candelero",
    parte: 2,
    lugar: "el candelero de oro",
    donde: POS.candeleroSpot,
    leccion: "candelero",
    pregunta: "lamparas",
    explica: ["El candelero de oro tiene siete lámparas. Cada tarde se preparan y arden toda la noche delante de Dios. El aceite sale de la prensa de olivas."],
    tarea: { texto: "Trae aceite de la prensa y llena las lámparas", deber: "aceite" },
  },
  {
    id: "mesa",
    parte: 2,
    lugar: "la mesa de los panes",
    donde: POS.mesaSpot,
    leccion: "mesa",
    pregunta: "panes",
    explica: ["En la mesa de oro hay doce panes, uno por cada tribu: todo el pueblo, siempre delante de Dios. Los panes se cuecen en el horno del atrio."],
    tarea: { texto: "Trae panes del horno y ponlos en la mesa", deber: "panes" },
  },
  {
    id: "altarIncienso",
    parte: 2,
    lugar: "el altar del incienso",
    donde: POS.altarInciensoSpot,
    leccion: "altarIncienso",
    pregunta: "incienso",
    explica: ["Este es el altar de oro, frente al velo. Mañana y tarde el sacerdote quema incienso mientras el pueblo ora afuera. El incienso se guarda en su cámara."],
    tarea: { texto: "Trae incienso de su cámara y quémalo en el altar de oro", deber: "incienso" },
  },
  {
    id: "velo",
    parte: 2,
    lugar: "el velo del Lugar Santísimo",
    donde: POS.expiacionSpot,
    leccion: "expiacion",
    pregunta: "unavez",
    explica: [
      "Detrás de este velo está el Lugar Santísimo, con el arca del pacto. Nadie entra ahí.",
      "Solo el sumo sacerdote entra, una vez al año, en el Día de la Expiación, por todo el pueblo.",
    ],
  },
  {
    id: "camaras",
    parte: 3,
    lugar: "las cámaras de los diezmos",
    donde: POS.camarasDoor,
    leccion: "camaras",
    pregunta: "camaras",
    explica: [
      "Estas son las cámaras de los diezmos. Cuando el pueblo trae sus diezmos y primicias, los guardamos aquí, como mandó Ezequías.",
      "Si alguien deja un diezmo junto a la puerta, llévalo a las cámaras.",
    ],
  },
  {
    id: "ensenanza",
    parte: 3,
    lugar: "el lugar de enseñanza",
    donde: POS.ensenanzaSpot,
    leccion: "ensenanza",
    pregunta: "sabiduria",
    explica: [
      "Este es el lugar de enseñanza. El sacerdote no solo ofrece sacrificios: también enseña la ley de Dios y responde las preguntas del pueblo.",
      "Por eso cada día te haré preguntas difíciles: quien conoce la Palabra puede ayudar a otros.",
    ],
  },
  {
    id: "bendicion",
    parte: 3,
    lugar: "la puerta, frente al pueblo",
    donde: POS.reception,
    leccion: "bendicion",
    pregunta: "bendicion",
    explica: ["Al terminar el servicio, los sacerdotes, puestos en pie, bendicen al pueblo con las palabras que Dios dio a Aarón."],
  },
];

export function pasosDeParte(parte: number): PasoInst[] {
  return PASOS.filter((p) => p.parte === parte);
}

/** Lo que dice Azarías al llegar a un lugar: su explicación, el versículo y lo que nos enseña hoy. */
export function lineasDe(p: PasoInst): Line[] {
  const l = LESSONS[p.leccion];
  const out: Line[] = p.explica.map((texto) => ({ quien: "azarias", texto }));
  if (l) {
    out.push({ quien: "azarias", texto: `«${l.verso.text}»`, ref: l.verso.ref });
    out.push({ quien: "azarias", texto: `${l.hoy.texto} «${l.hoy.verso.text}»`, ref: l.hoy.verso.ref });
  }
  return out;
}

export function lineasInicio(parte: number, nombre: string): Line[] {
  if (parte === 1)
    return [
      { quien: "azarias", texto: `Bienvenido al templo, ${nombre}. Todo sacerdote nuevo aprende el servicio junto a un sacerdote mayor. Yo te enseñaré, paso a paso.` },
      { quien: "azarias", texto: "Sígueme. En cada lugar te diré qué es, para qué sirve y qué nos enseña hoy. Después harás el servicio y te haré una pregunta." },
    ];
  if (parte === 2) return [{ quien: "azarias", texto: "Ahora te enseñaré el Lugar Santo, donde solo entran los sacerdotes. Sígueme." }];
  return [{ quien: "azarias", texto: "Falta lo último: cómo servimos al pueblo. Sígueme." }];
}

export function lineasFin(parte: number, nombre: string): Line[] {
  if (parte === 1) return [{ quien: "azarias", texto: "Terminaste la primera parte: el atrio. Ya sabes recibir al pueblo, cuidar el fuego y lavarte antes de servir." }];
  if (parte === 2) return [{ quien: "azarias", texto: "Terminaste la segunda parte: el Lugar Santo. La luz, el pan y la oración nunca deben faltar en la casa de Dios." }];
  return [
    { quien: "azarias", texto: `Terminaste la instrucción, ${nombre}. Ya conoces el servicio del templo, como un sacerdote de verdad.` },
    { quien: "azarias", texto: "Sirve con gozo: cada deber suma mérito a tu temporada, y yo seguiré aquí para preguntarte cada día." },
  ];
}
