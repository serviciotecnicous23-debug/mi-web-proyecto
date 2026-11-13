/**
 * Los dichos de los ancianos (docs/guion-del-juego.md, capítulo 8: las colecciones visibles). Los ancianos sentados a
 * la puerta de la ciudad (Rut 4:1-2) dicen cada día un dicho de Proverbios, el mismo para todos. Quien se sienta a
 * escucharlo lo guarda en su álbum; el que falte, puede enseñártelo tu mentor (shared/mentores.ts). Con los treinta,
 * el título «Oído de sabio».
 * «Para entender proverbio y declaración, Palabras de sabios, y sus dichos profundos.» (Proverbios 1:6)
 *
 * Las citas son literales de la RVR1960 (comprobadas con la Biblia del sitio). «quiere» es lo que quiere decir, en
 * palabras propias. Para agregar dichos en una actualización, se ponen al final de la lista (sus `id` no se cambian).
 */

type Verso = { text: string; ref: string };

export type Dicho = {
  id: string;
  /** De qué habla (lo que se ve antes de sentarse a escucharlo). */
  tema: string;
  text: string;
  ref: string;
  /** Lo que quiere decir, en palabras propias. */
  quiere: string;
};

export const VERSO_DICHOS: Verso = { text: "Para entender proverbio y declaración, Palabras de sabios, y sus dichos profundos.", ref: "Proverbios 1:6" };
export const VERSO_PUERTA: Verso = { text: "Su marido es conocido en las puertas, Cuando se sienta con los ancianos de la tierra.", ref: "Proverbios 31:23" };
export const VERSO_OIDO_SABIO: Verso = { text: "El corazón del entendido adquiere sabiduría; Y el oído de los sabios busca la ciencia.", ref: "Proverbios 18:15" };

/** Los ancianos se sientan a la puerta de la ciudad, junto a la plaza (el círculo de su zona en la ciudad). */
export const LUGAR_ANCIANOS: [number, number] = [72.4, 0];
/** Qué tan cerca de los ancianos hay que estar para escucharlos (metros, lo comprueba el servidor). */
export const CERCA_ANCIANOS = 6;
/** Gozo por sentarse a escuchar el dicho del día (una vez por día). */
export const GOZO_DICHO = 3;
/** El día en que empieza la cuenta de los dichos (el lunes en que empezó Jerusalén en línea). */
const PRIMER_DIA = "2026-11-09";

export const DICHOS: Dicho[] = [
  {
    id: "temor", tema: "el principio de la sabiduría",
    text: "El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.", ref: "Proverbios 1:7",
    quiere: "Ser sabio empieza por honrar y amar a Dios. El que no quiere aprender se queda sin sabiduría.",
  },
  {
    id: "hormiga", tema: "la hormiga",
    text: "Ve a la hormiga, oh perezoso, Mira sus caminos, y sé sabio;", ref: "Proverbios 6:6",
    quiere: "La hormiga trabaja sin que nadie la mande. Mírala y aprende a no dejar para mañana lo que toca hoy.",
  },
  {
    id: "blanda", tema: "la respuesta suave",
    text: "La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor.", ref: "Proverbios 15:1",
    quiere: "Contestar con calma apaga un enojo; contestar con dureza lo enciende más.",
  },
  {
    id: "anda-con-sabios", tema: "los compañeros",
    text: "El que anda con sabios, sabio será; Mas el que se junta con necios será quebrantado.", ref: "Proverbios 13:20",
    quiere: "Uno se parece a sus compañeros: el que anda con sabios aprende a ser sabio.",
  },
  {
    id: "fiate", tema: "la confianza",
    text: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5",
    quiere: "Confía en Dios con todo tu corazón, más que en lo que tú crees saber.",
  },
  {
    id: "hierro", tema: "el hierro",
    text: "Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo.", ref: "Proverbios 27:17",
    quiere: "Como el hierro afila al hierro, los amigos se ayudan a ser mejores.",
  },
  {
    id: "corazon", tema: "lo que más hay que cuidar",
    text: "Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida.", ref: "Proverbios 4:23",
    quiere: "Cuida lo que dejas entrar en tu corazón: de ahí salen tus palabras y lo que haces.",
  },
  {
    id: "buena-palabra", tema: "la buena palabra",
    text: "La congoja en el corazón del hombre lo abate; Mas la buena palabra lo alegra.", ref: "Proverbios 12:25",
    quiere: "Una palabra amable levanta a quien anda triste o preocupado.",
  },
  {
    id: "nino", tema: "lo que se aprende de niño",
    text: "Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.", ref: "Proverbios 22:6",
    quiere: "Lo que se aprende de niño se queda para toda la vida.",
  },
  {
    id: "tarda", tema: "el enojo",
    text: "Mejor es el que tarda en airarse que el fuerte; Y el que se enseñorea de su espíritu, que el que toma una ciudad.", ref: "Proverbios 16:32",
    quiere: "Dominar tu enojo es más valiente que ganar una batalla.",
  },
  {
    id: "amigo", tema: "el amigo de verdad",
    text: "En todo tiempo ama el amigo, Y es como un hermano en tiempo de angustia.", ref: "Proverbios 17:17",
    quiere: "El amigo de verdad está contigo siempre, y más cuando las cosas van mal.",
  },
  {
    id: "labor", tema: "el trabajo",
    text: "En toda labor hay fruto; Mas las vanas palabras de los labios empobrecen.", ref: "Proverbios 14:23",
    quiere: "Todo trabajo da fruto; hablar mucho sin hacer nada deja las manos vacías.",
  },
  {
    id: "reconocelo", tema: "el camino derecho",
    text: "Reconócelo en todos tus caminos, Y él enderezará tus veredas.", ref: "Proverbios 3:6",
    quiere: "Si pones a Dios primero en todo lo que haces, Él te guía por el buen camino.",
  },
  {
    id: "soberbia", tema: "el orgullo",
    text: "Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu.", ref: "Proverbios 16:18",
    quiere: "El orgullo va primero, y la caída viene detrás.",
  },
  {
    id: "remedio", tema: "el mejor remedio",
    text: "El corazón alegre constituye buen remedio; Mas el espíritu triste seca los huesos.", ref: "Proverbios 17:22",
    quiere: "La alegría hace bien como una medicina; la tristeza quita las fuerzas.",
  },
  {
    id: "buen-nombre", tema: "el buen nombre",
    text: "De más estima es el buen nombre que las muchas riquezas, Y la buena fama más que la plata y el oro.", ref: "Proverbios 22:1",
    quiere: "Vale más que te conozcan por ser bueno que tener mucho dinero.",
  },
  {
    id: "torre", tema: "la torre fuerte",
    text: "Torre fuerte es el nombre de Jehová; A él correrá el justo, y será levantado.", ref: "Proverbios 18:10",
    quiere: "Cuando tengas miedo, corre a Dios: Él es tu refugio.",
  },
  {
    id: "generosa", tema: "la mano abierta",
    text: "El alma generosa será prosperada; Y el que saciare, él también será saciado.", ref: "Proverbios 11:25",
    quiere: "El que comparte con los demás también recibe bendición.",
  },
  {
    id: "muchacho", tema: "lo que dicen tus hechos",
    text: "Aun el muchacho es conocido por sus hechos, Si su conducta fuere limpia y recta.", ref: "Proverbios 20:11",
    quiere: "Aunque seas joven, lo que haces dice quién eres.",
  },
  {
    id: "boca", tema: "la lengua",
    text: "El que guarda su boca y su lengua, Su alma guarda de angustias.", ref: "Proverbios 21:23",
    quiere: "Cuidar lo que dices te libra de muchos problemas.",
  },
  {
    id: "encomienda", tema: "tus planes",
    text: "Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados.", ref: "Proverbios 16:3",
    quiere: "Pon en manos de Dios lo que haces, y tus planes saldrán firmes.",
  },
  {
    id: "mostrarse", tema: "cómo tener amigos",
    text: "El hombre que tiene amigos ha de mostrarse amigo; Y amigo hay más unido que un hermano.", ref: "Proverbios 18:24",
    quiere: "Para tener amigos hay que ser buen amigo.",
  },
  {
    id: "justicia", tema: "lo que agrada a Dios",
    text: "Hacer justicia y juicio es a Jehová Más agradable que sacrificio.", ref: "Proverbios 21:3",
    quiere: "A Dios le agrada más que vivamos con justicia que cualquier ofrenda.",
  },
  {
    id: "manzana", tema: "la palabra a tiempo",
    text: "Manzana de oro con figuras de plata Es la palabra dicha como conviene.", ref: "Proverbios 25:11",
    quiere: "Una palabra dicha en el momento justo es tan hermosa como una joya.",
  },
  {
    id: "siete-veces", tema: "volver a levantarse",
    text: "Porque siete veces cae el justo, y vuelve a levantarse; Mas los impíos caerán en el mal.", ref: "Proverbios 24:16",
    quiere: "El justo también cae, pero se levanta otra vez.",
  },
  {
    id: "presta", tema: "dar al pobre",
    text: "A Jehová presta el que da al pobre, Y el bien que ha hecho, se lo volverá a pagar.", ref: "Proverbios 19:17",
    quiere: "Lo que das al que lo necesita, Dios lo toma como si se lo prestaras a Él.",
  },
  {
    id: "rostro", tema: "la cara alegre",
    text: "El corazón alegre hermosea el rostro; Mas por el dolor del corazón el espíritu se abate.", ref: "Proverbios 15:13",
    quiere: "La alegría del corazón se ve en la cara.",
  },
  {
    id: "alabete", tema: "alabarse uno mismo",
    text: "Alábete el extraño, y no tu propia boca; El ajeno, y no los labios tuyos.", ref: "Proverbios 27:2",
    quiere: "Que otros hablen bien de ti; no te alabes tú.",
  },
  {
    id: "lena", tema: "la leña y el fuego",
    text: "Sin leña se apaga el fuego, Y donde no hay chismoso, cesa la contienda.", ref: "Proverbios 26:20",
    quiere: "Sin leña el fuego se apaga; sin chismes que la alimenten, la pelea se acaba.",
  },
  {
    id: "vejez", tema: "las canas",
    text: "Corona de honra es la vejez Que se halla en el camino de justicia.", ref: "Proverbios 16:31",
    quiere: "Los años vividos haciendo el bien son una corona de honra.",
  },
];

const POR_ID = new Map(DICHOS.map((d) => [d.id, d]));

/** «del orgullo», «de la hormiga», «de las canas»: para decir de qué habla un dicho. */
export function delTema(tema: string): string {
  return tema.startsWith("el ") ? `del ${tema.slice(3)}` : `de ${tema}`;
}

export function dicho(id: unknown): Dicho | undefined {
  return typeof id === "string" ? POR_ID.get(id) : undefined;
}

const numeroDeDia = (clave: string) => {
  const [y, m, d] = clave.split("-").map(Number);
  return Math.round(Date.UTC(y, (m || 1) - 1, d || 1) / 86_400_000);
};

/** El dicho de un día (la fecha de Texas, «AAAA-MM-DD»): el mismo para todos, uno tras otro en el orden de la lista. */
export function dichoDelDia(dia: string): Dicho {
  const n = numeroDeDia(dia) - numeroDeDia(PRIMER_DIA);
  return DICHOS[((n % DICHOS.length) + DICHOS.length) % DICHOS.length];
}

/** Lo guardado (una lista de ids), sin repetidos ni ids que no existen, en el orden de la lista de dichos. */
export function leerDichos(v: unknown): string[] {
  const tengo = new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && POR_ID.has(x)) : []);
  return DICHOS.filter((d) => tengo.has(d.id)).map((d) => d.id);
}

/** Cuál dicho le puede enseñar uno a otro: el de hoy si lo tiene y al otro le falta; si no, el primero que le falte. */
export function dichoParaEnsenar(mios: readonly string[], suyos: readonly string[], hoy: string): Dicho | null {
  const tiene = new Set(suyos);
  const del = dichoDelDia(hoy);
  if (mios.includes(del.id) && !tiene.has(del.id)) return del;
  for (const d of DICHOS) if (mios.includes(d.id) && !tiene.has(d.id)) return d;
  return null;
}

// ---------------------------------------------------------------- respuestas de la API
export type DichosEstado = {
  /** El dicho de hoy: de qué habla y, si ya lo escuchaste, todo. */
  hoy: { id: string; tema: string; dicho: Dicho | null };
  /** Si ya te sentaste hoy a escuchar a los ancianos. */
  escuchado: boolean;
  /** Los dichos que tienes (ids). */
  tengo: string[];
  total: number;
};
export type DichoEscuchado = DichosEstado & { dicho: Dicho; nuevo: boolean; gozo: number; gozoTotal: number | null };
