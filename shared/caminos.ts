/**
 * Etapa 3 de Jerusalén en línea: los tres caminos. Cada cuenta puede tener hasta tres personajes,
 * uno por camino, y elige con cuál jugar:
 * - Sacerdocio: sirve en el templo (lo de siempre), con Azarías.
 * - Escuela de los profetas: estudia, ora en el monte, memoriza la Palabra y lleva mensajes por la
 *   ciudad, con Isaías hijo de Amoz (Isaías 1:1), profeta en los días de Ezequías.
 * - Palacio del rey: atiende audiencias con justicia, reparte pan a los pobres y copia la ley, con
 *   Eliaquim hijo de Hilcías, mayordomo del palacio (2 Reyes 18:18).
 * Los deberes de cada camino van al mismo mérito de la temporada. Los versículos son de la RV1960,
 * comprobados con la Biblia del sitio.
 */

export type Camino = "sacerdocio" | "profecia" | "realeza";
export const CAMINOS_LISTA: Camino[] = ["sacerdocio", "profecia", "realeza"];

/** Deberes de los caminos nuevos (los del sacerdocio están en shared/jerusalen.ts). */
export type DeberCamino = "mensaje" | "oracion" | "memoria" | "discernir" | "audiencia" | "pan" | "ley";

export type CaminoDef = {
  id: Camino;
  nombre: string;
  icono: string;
  lugar: string;
  guia: string;
  resumen: string;
  /** Nombres del escalón por mérito: el primero al empezar, el segundo con MERITO_TURNO. */
  /** Los cinco escalones del camino (como el sacerdocio: base, de turno y los tres cargos de la temporada). */
  escalones: [string, string, string, string, string];
  deberes: DeberCamino[];
  nombres: { nombre: string; ref: string }[];
};

export const CAMINOS: Record<Camino, CaminoDef> = {
  sacerdocio: {
    id: "sacerdocio",
    nombre: "Sacerdocio",
    icono: "🔥",
    lugar: "el templo",
    guia: "Azarías, sumo sacerdote",
    resumen: "Sirve en el templo: el fuego del altar, las ofrendas del pueblo, las lámparas, los panes y el incienso.",
    escalones: ["Sacerdote", "Sacerdote de turno", "Jefe de un turno", "Principal sacerdote", "Sumo sacerdote"],
    deberes: [],
    nombres: [],
  },
  profecia: {
    id: "profecia",
    nombre: "Escuela de los profetas",
    icono: "📯",
    lugar: "la escuela de los profetas",
    guia: "Isaías hijo de Amoz",
    resumen: "Estudia la Palabra, ora en el monte, memoriza las Escrituras y lleva mensajes de ánimo por la ciudad.",
    escalones: ["Hijo de los profetas", "Vidente", "Anciano de la escuela", "Profeta del rey", "Varón de Dios"],
    deberes: ["mensaje", "oracion", "memoria", "discernir"],
    nombres: [
      { nombre: "Samuel", ref: "1 Samuel 3:20" },
      { nombre: "Natán", ref: "2 Samuel 12:1" },
      { nombre: "Gad", ref: "2 Samuel 24:11" },
      { nombre: "Eliseo", ref: "2 Reyes 2:15" },
      { nombre: "Miqueas", ref: "Miqueas 1:1" },
      { nombre: "Oseas", ref: "Oseas 1:1" },
      { nombre: "Joel", ref: "Joel 1:1" },
      { nombre: "Amós", ref: "Amós 1:1" },
      { nombre: "Hulda", ref: "2 Reyes 22:14" },
      { nombre: "Débora", ref: "Jueces 4:4" },
      { nombre: "Ana", ref: "Lucas 2:36" },
    ],
  },
  realeza: {
    id: "realeza",
    nombre: "Palacio del rey",
    icono: "👑",
    lugar: "el palacio del rey",
    guia: "Eliaquim hijo de Hilcías, mayordomo",
    resumen: "Sirve al rey Ezequías: audiencias con justicia, pan para los pobres y la copia de la ley.",
    escalones: ["Siervo del rey", "Escriba del rey", "Oficial del rey", "Consejero del rey", "Canciller del rey"],
    deberes: ["audiencia", "pan", "ley"],
    nombres: [
      { nombre: "José", ref: "Génesis 41:41" },
      { nombre: "Daniel", ref: "Daniel 1:6" },
      { nombre: "Nehemías", ref: "Nehemías 1:11" },
      { nombre: "Abdías", ref: "1 Reyes 18:3" },
      { nombre: "Mardoqueo", ref: "Ester 10:3" },
      { nombre: "Joa", ref: "2 Reyes 18:18" },
      { nombre: "Ester", ref: "Ester 10:3" },
    ],
  },
};

/** Mérito de cada deber de los caminos nuevos, y su tope por envío (un poco de golpe más un ritmo por segundo). */
export const MERITO_DEBER_CAMINO: Record<DeberCamino, number> = { mensaje: 3, oracion: 2, memoria: 4, discernir: 4, audiencia: 4, pan: 2, ley: 4 };
export const TOPE_BASE_CAMINO: Record<DeberCamino, number> = { mensaje: 1, oracion: 1, memoria: 1, discernir: 1, audiencia: 1, pan: 2, ley: 1 };
export const TOPE_RITMO_CAMINO: Record<DeberCamino, number> = { mensaje: 0.03, oracion: 0.06, memoria: 0.04, discernir: 0.04, audiencia: 0.04, pan: 0.06, ley: 0.04 };

/** Segundos de oración en el monte para que cuente una. */
export const ORACION_SEGUNDOS = 15;

export function caminoDe(v: unknown): Camino {
  return v === "profecia" || v === "realeza" ? v : "sacerdocio";
}

/** El nombre del escalón (o del cargo, en el sacerdocio) según el camino. */
const ORDEN_ESCALON = ["sacerdote", "turno", "jefe", "principal", "sumo"];

export function nombreEscalonCamino(camino: Camino, escalon: string | null | undefined, nombreSacerdocio: string): string {
  if (camino === "sacerdocio") return nombreSacerdocio;
  const i = Math.max(0, ORDEN_ESCALON.indexOf(escalon || "sacerdote"));
  return CAMINOS[camino].escalones[i];
}

/**
 * Los cargos de la temporada en cada camino: los dos de arriba piden estudios aprobados (de la persona).
 * El de más arriba pide además haber tenido el del medio en una temporada anterior.
 * Profecía: «Profeta del rey» (2 Samuel 24:11: «Gad, profeta, vidente de David») y «Varón de Dios»
 * (2 Reyes 4:9). Palacio: «Consejero del rey» (1 Crónicas 27:33) y «Canciller del rey» (2 Reyes 18:18).
 */
export const ESTUDIOS_CARGO: Record<Camino, { medio: string; alto: string }> = {
  sacerdocio: { medio: "sacerdocio-aaron", alto: "expiacion" },
  profecia: { medio: "llamado-profeta", alto: "fiestas" },
  realeza: { medio: "rey-justo", alto: "fiestas" },
};

/** Gozo que recibe cada cargo al empezar la temporada (además del título y su lugar en la escalera). */
export const PREMIO_CARGO: Record<"sumo" | "principal" | "jefe", number> = { sumo: 300, principal: 150, jefe: 60 };

// ---------------------------------------------------------------- la escuela: discernir con las Escrituras
/**
 * Lo que se oye en la plaza: el profeta lo prueba con la Palabra (1 Juan 4:1; Isaías 8:20). No todo
 * es falso: también hay llamados verdaderos que hay que recibir.
 */
export type Discernimiento = { id: string; dice: string; opciones: [string, string, string]; correcta: 0 | 1 | 2; explica: string; verso: { text: string; ref: string } };

export const VERSO_DISCERNIR = {
  text: "Amados, no creáis a todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas han salido por el mundo.",
  ref: "1 Juan 4:1",
};

export const DISCERNIMIENTOS: Discernimiento[] = [
  {
    id: "muertos",
    dice: "Un hombre en la plaza susurra que puede hablar con los muertos y que trae un mensaje de tu abuelo.",
    opciones: ["Escucharlo: si sabe el nombre del abuelo, será verdad", "Apartarse: el pueblo consulta a su Dios, no a los muertos", "Pagarle para que diga más"],
    correcta: 1,
    explica: "Dios no habla por medio de los que consultan a los muertos: el pueblo de Dios pregunta a su Dios.",
    verso: { text: "Y si os dijeren: Preguntad a los encantadores y a los adivinos, que susurran hablando, responded: ¿No consultará el pueblo a su Dios? ¿Consultará a los muertos por los vivos?", ref: "Isaías 8:19" },
  },
  {
    id: "nocumplio",
    dice: "Una mujer anunció en nombre de Jehová que hoy llovería fuego sobre la puerta. No pasó nada, pero dice que igual hay que temerle.",
    opciones: ["No temerla: lo que no se cumple, Jehová no lo habló", "Temerla por si acaso", "Esperar otro anuncio suyo antes de decidir"],
    correcta: 0,
    explica: "La palabra que viene de Dios se cumple. Si no se cumple, se habló con presunción y no hay que temer.",
    verso: { text: "si el profeta hablare en nombre de Jehová, y no se cumpliere lo que dijo, ni aconteciere, es palabra que Jehová no ha hablado; con presunción la habló el tal profeta; no tengas temor de él.", ref: "Deuteronomio 18:22" },
  },
  {
    id: "sinley",
    dice: "Un maestro nuevo dice: «Ya no hace falta leer la ley de Moisés; basta con lo que yo les enseñe».",
    opciones: ["Seguirlo porque habla bonito", "Callar para no discutir", "Comparar lo que dice con la ley y el testimonio"],
    correcta: 2,
    explica: "Toda enseñanza se prueba con la Palabra escrita: lo que no concuerda con ella no trae luz.",
    verso: { text: "¡A la ley y al testimonio! Si no dijeren conforme a esto, es porque no les ha amanecido.", ref: "Isaías 8:20" },
  },
  {
    id: "senal",
    dice: "Un soñador hizo una señal asombrosa delante de todos y ahora dice: «Vamos tras los dioses de los vecinos».",
    opciones: ["Seguirlo: la señal prueba que tiene poder", "No darle oído: ninguna señal vale para dejar a Jehová", "Seguirlo solo un tiempo para ver qué pasa"],
    correcta: 1,
    explica: "Una señal no hace verdadero a un mensaje que aparta de Dios: es una prueba de si lo amamos con todo el corazón.",
    verso: { text: "no darás oído a las palabras de tal profeta, ni al tal soñador de sueños; porque Jehová vuestro Dios os está probando, para saber si amáis a Jehová vuestro Dios con todo vuestro corazón, y con toda vuestra alma.", ref: "Deuteronomio 13:3" },
  },
  {
    id: "pazpaz",
    dice: "Mientras muchos viven en pecado, un profeta del palacio repite: «Paz, paz; no pasará nada malo».",
    opciones: ["Decir lo mismo para que todos estén contentos", "Llamar al pueblo a volverse a Dios: no hay paz en el pecado", "No decir nada: no es asunto tuyo"],
    correcta: 1,
    explica: "Calmar al pueblo con palabras dulces sin llamar al arrepentimiento es curar la herida a la ligera.",
    verso: { text: "Y curan la herida de mi pueblo con liviandad, diciendo: Paz, paz; y no hay paz.", ref: "Jeremías 6:14" },
  },
  {
    id: "adivino",
    dice: "En el mercado, un adivino promete decirte tu futuro echando suertes, por dos monedas.",
    opciones: ["Probar una vez, no pasa nada", "Pedirle que adivine solo cosas buenas", "No consultarlo: contamina y aparta de Dios"],
    correcta: 2,
    explica: "Dios pide que su pueblo no se vuelva a los adivinos: el futuro está en las manos de Jehová.",
    verso: { text: "No os volváis a los encantadores ni a los adivinos; no los consultéis, contaminándoos con ellos. Yo Jehová vuestro Dios.", ref: "Levítico 19:31" },
  },
  {
    id: "todolocree",
    dice: "Un joven de la escuela cree cada rumor que corre por la ciudad y lo repite como si fuera palabra de Dios.",
    opciones: ["Enseñarle a examinar antes de creer", "Repetir los rumores también", "Burlarse de él delante de todos"],
    correcta: 0,
    explica: "El profeta no cree todo lo que oye: examina con cuidado antes de hablar en nombre de Dios.",
    verso: { text: "El simple todo lo cree; Mas el avisado mira bien sus pasos.", ref: "Proverbios 14:15" },
  },
  {
    id: "pordinero",
    dice: "Un vidente dice que solo profetiza a quien le paga, y que con plata Dios dará buenas noticias.",
    opciones: ["Pagarle para recibir buenas noticias", "Rechazar ese negocio: la palabra de Dios no se vende", "Regatear el precio"],
    correcta: 1,
    explica: "Los profetas que adivinan por dinero se apoyan en Jehová con la boca, pero no hablan de su parte.",
    verso: { text: "Sus jefes juzgan por cohecho, y sus sacerdotes enseñan por precio, y sus profetas adivinan por dinero; y se apoyan en Jehová, diciendo: ¿No está Jehová entre nosotros? No vendrá mal sobre nosotros.", ref: "Miqueas 3:11" },
  },
  {
    id: "llamado",
    dice: "Una anciana del barrio llama a todos a volverse a Dios con todo el corazón, con ayuno y oración.",
    opciones: ["Recibir su llamado: concuerda con la Palabra", "Ignorarla porque no es sacerdote", "Pedirle una señal antes de escucharla"],
    correcta: 0,
    explica: "Discernir también es reconocer lo que viene de Dios: este llamado dice lo mismo que la Palabra.",
    verso: { text: "Por eso pues, ahora, dice Jehová, convertíos a mí con todo vuestro corazón, con ayuno y lloro y lamento.", ref: "Joel 2:12" },
  },
];

// ---------------------------------------------------------------- el palacio: audiencias
export type Audiencia = { id: string; caso: string; opciones: [string, string, string]; correcta: 0 | 1 | 2; explica: string; verso: { text: string; ref: string } };

export const AUDIENCIAS: Audiencia[] = [
  {
    id: "buey",
    caso: "Dos vecinos discuten por un buey perdido. El más rico te promete un regalo si fallas a su favor.",
    opciones: ["Aceptar el regalo y fallar por el rico", "Escuchar a los dos y juzgar con verdad, sin aceptar regalos", "Mandarlos a casa sin juzgar"],
    correcta: 1,
    explica: "El juez justo no recibe soborno: escucha a los dos y busca la verdad.",
    verso: { text: "No tuerzas el derecho; no hagas acepción de personas, ni tomes soborno; porque el soborno ciega los ojos de los sabios, y pervierte las palabras de los justos.", ref: "Deuteronomio 16:19" },
  },
  {
    id: "viuda",
    caso: "Una viuda pobre y un mercader importante, amigo del palacio, piden justicia en el mismo pleito.",
    opciones: ["Favorecer al mercader porque es importante", "Favorecer a la viuda solo porque es pobre", "Juzgar con justicia, sin favorecer a ninguno por quién es"],
    correcta: 2,
    explica: "La justicia de Dios no mira la cara: ni favorece al pobre por ser pobre ni al grande por ser grande.",
    verso: { text: "No harás injusticia en el juicio, ni favoreciendo al pobre ni complaciendo al grande; con justicia juzgarás a tu prójimo.", ref: "Levítico 19:15" },
  },
  {
    id: "primero",
    caso: "El primero en hablar cuenta su versión y parece tener toda la razón.",
    opciones: ["Fallar enseguida a su favor", "Escuchar también al otro antes de juzgar", "Pedir un pago para seguir escuchando"],
    correcta: 1,
    explica: "Antes de juzgar hay que oír a las dos partes: la primera versión no siempre es toda la verdad.",
    verso: { text: "Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre.", ref: "Proverbios 18:17" },
  },
  {
    id: "mendigo",
    caso: "Un mendigo está perdiendo su pleito porque nadie habla por él.",
    opciones: ["Escucharlo y defender su derecho", "Ignorarlo porque no paga tributo", "Sacarlo del palacio"],
    correcta: 0,
    explica: "El rey y sus siervos defienden a quien no tiene quién lo defienda.",
    verso: { text: "No pervertirás el derecho de tu mendigo en su pleito.", ref: "Éxodo 23:6" },
  },
  {
    id: "granero",
    caso: "Hay hambre en un barrio de la ciudad y el granero del palacio está lleno.",
    opciones: ["Guardarlo todo para el rey", "Abrir la mano al pobre y repartir pan", "Venderlo caro a los que tienen hambre"],
    correcta: 1,
    explica: "Dios manda abrir la mano al pobre: el que comparte su pan es bendito.",
    verso: { text: "Porque no faltarán menesterosos en medio de la tierra; por eso yo te mando, diciendo: Abrirás tu mano a tu hermano, al pobre y al menesteroso en tu tierra.", ref: "Deuteronomio 15:11" },
  },
  {
    id: "sacrificios",
    caso: "Un consejero propone ofrecer muchos sacrificios para tapar una injusticia que cometió el palacio.",
    opciones: ["Ofrecer los sacrificios y no corregir nada", "Esconder el asunto", "Corregir la injusticia: hacer justicia agrada más a Dios"],
    correcta: 2,
    explica: "Los sacrificios no tapan la injusticia: Dios pide primero hacer justicia.",
    verso: { text: "Hacer justicia y juicio es a Jehová Más agradable que sacrificio.", ref: "Proverbios 21:3" },
  },
  {
    id: "herencia",
    caso: "Dos hermanos pelean por la herencia de su padre y ya no se hablan.",
    opciones: ["Juzgar conforme a la verdad y animarlos a la misericordia entre hermanos", "Darle todo al mayor sin escuchar", "Quedarse el palacio con la herencia"],
    correcta: 0,
    explica: "El juicio verdadero también busca la paz y la misericordia entre hermanos.",
    verso: { text: "Así habló Jehová de los ejércitos, diciendo: Juzgad conforme a la verdad, y haced misericordia y piedad cada cual con su hermano;", ref: "Zacarías 7:9" },
  },
  {
    id: "asiria",
    caso: "El rey de Asiria amenaza a Jerusalén y el pueblo tiene miedo.",
    opciones: ["Rendirse y entregar todo el oro", "Animar al pueblo a confiar en Dios, como Ezequías", "Huir de la ciudad de noche"],
    correcta: 1,
    explica: "Ezequías animó al pueblo: con el rey de Asiria iba un brazo de carne, pero con Judá estaba Jehová.",
    verso: { text: "Esforzaos y animaos; no temáis, ni tengáis miedo del rey de Asiria, ni de toda la multitud que con él viene; porque más hay con nosotros que con él. Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios para ayudarnos, y pelear nuestras batallas. Y el pueblo tuvo confianza en las palabras de Ezequías rey de Judá.", ref: "2 Crónicas 32:7-8" },
  },
  {
    id: "salario",
    caso: "Al atardecer, un jornalero pide su paga. El mayordomo del rey dice que mañana le pagará, cuando tenga tiempo.",
    opciones: ["Pagarle hoy mismo, antes de la noche", "Que espere hasta la semana próxima", "Pagarle la mitad para que vuelva mañana"],
    correcta: 0,
    explica: "El jornalero vive de su paga del día: retenerla hasta mañana es oprimirlo.",
    verso: { text: "No oprimirás a tu prójimo, ni le robarás. No retendrás el salario del jornalero en tu casa hasta la mañana.", ref: "Levítico 19:13" },
  },
  {
    id: "pesas",
    caso: "Descubren a un mercader de la plaza con dos juegos de pesas: unas para comprar y otras para vender.",
    opciones: ["Dejarlo: así hacen todos", "Cobrarle una parte de la ganancia", "Mandar que use una sola pesa justa y devuelva lo robado"],
    correcta: 2,
    explica: "Dios pide medidas justas en el mercado: la pesa falsa es robo, aunque sea pequeño.",
    verso: { text: "Balanzas justas, pesas justas y medidas justas tendréis. Yo Jehová vuestro Dios, que os saqué de la tierra de Egipto.", ref: "Levítico 19:36" },
  },
  {
    id: "extranjero",
    caso: "Un extranjero que vive en Jerusalén reclama porque un vecino le quitó parte de su cosecha. Algunos dicen que no merece justicia por no ser del pueblo.",
    opciones: ["Juzgar su caso con la misma justicia que a cualquiera", "Rechazarlo por ser extranjero", "Escucharlo solo si paga más"],
    correcta: 0,
    explica: "Israel fue extranjero en Egipto: por eso no debe angustiar al extranjero, sino tratarlo con justicia.",
    verso: { text: "Y no angustiarás al extranjero; porque vosotros sabéis cómo es el alma del extranjero, ya que extranjeros fuisteis en la tierra de Egipto.", ref: "Éxodo 23:9" },
  },
  {
    id: "testigo",
    caso: "Un solo hombre acusa a otro de robar una oveja y pide que lo castiguen hoy mismo. Nadie más vio nada.",
    opciones: ["Castigarlo enseguida para dar ejemplo", "No condenar con un solo testigo: buscar la verdad", "Castigar a los dos para no equivocarse"],
    correcta: 1,
    explica: "Nadie es condenado por la palabra de uno solo: la acusación se confirma con dos o tres testigos.",
    verso: { text: "No se tomará en cuenta a un solo testigo contra ninguno en cualquier delito ni en cualquier pecado, en relación con cualquiera ofensa cometida. Sólo por el testimonio de dos o tres testigos se mantendrá la acusación.", ref: "Deuteronomio 19:15" },
  },
  {
    id: "lindero",
    caso: "Un hombre rico corrió de noche las piedras que marcaban el límite con el campo de su vecino pobre.",
    opciones: ["Dejar las piedras donde quedaron", "Partir el campo en dos", "Devolver las piedras a su lugar antiguo"],
    correcta: 2,
    explica: "Mover los linderos es quitarle al prójimo su herencia: hay que respetar los límites que pusieron los padres.",
    verso: { text: "No traspases los linderos antiguos Que pusieron tus padres.", ref: "Proverbios 22:28" },
  },
  {
    id: "prenda",
    caso: "Un pobre dejó su manto como garantía de una deuda. Cae la noche y el prestamista no quiere devolvérselo.",
    opciones: ["Que lo guarde hasta que pague todo", "Mandar que le devuelva el manto antes de que se ponga el sol", "Vender el manto para cobrar la deuda"],
    correcta: 1,
    explica: "El manto del pobre es su abrigo de la noche: la ley manda devolverlo a la puesta del sol.",
    verso: { text: "Si tomares en prenda el vestido de tu prójimo, a la puesta del sol se lo devolverás.", ref: "Éxodo 22:26" },
  },
];

// ---------------------------------------------------------------- memorizar la Palabra / copiar la ley
/** Versículos para ordenar palabra por palabra (la escuela memoriza; el escriba copia la ley). */
export const VERSOS_MEMORIA: { text: string; ref: string; camino: "profecia" | "realeza" | "ambos" }[] = [
  { text: "Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí.", ref: "Isaías 6:8", camino: "profecia" },
  { text: "Y extendió Jehová su mano y tocó mi boca, y me dijo Jehová: He aquí he puesto mis palabras en tu boca.", ref: "Jeremías 1:9", camino: "profecia" },
  { text: "Porque no hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas.", ref: "Amós 3:7", camino: "profecia" },
  { text: "El fuego arderá continuamente en el altar; no se apagará.", ref: "Levítico 6:13", camino: "ambos" },
  { text: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8", camino: "ambos" },
  { text: "Misericordia y verdad guardan al rey, Y con clemencia se sustenta su trono.", ref: "Proverbios 20:28", camino: "realeza" },
  { text: "Del rey que juzga con verdad a los pobres, El trono será firme para siempre.", ref: "Proverbios 29:14", camino: "realeza" },
  { text: "No pervertirás el derecho de tu mendigo en su pleito.", ref: "Éxodo 23:6", camino: "realeza" },
];

/** Los mensajes de ánimo que lleva el profeta por la ciudad. */
export const MENSAJES: { text: string; ref: string }[] = [
  { text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", ref: "Josué 1:9" },
  { text: "Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él.", ref: "Salmo 118:24" },
  { text: "Alabad a Jehová, porque él es bueno, Porque para siempre es su misericordia.", ref: "Salmo 136:1" },
  { text: "Jehová te bendiga, y te guarde;", ref: "Números 6:24" },
];
