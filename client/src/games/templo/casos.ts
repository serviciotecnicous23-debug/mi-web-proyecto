/**
 * Juicios del sacerdote: «Cuando alguna cosa te fuere difícil en el juicio… vendrás a los
 * sacerdotes levitas» (Deuteronomio 17:8-9). No son preguntas: primero se escucha a las partes,
 * después se inquiere (se examinan hasta dos pistas) y al final se dicta sentencia. Si la sentencia
 * no es justa, Azarías muestra lo que pasó después y el pueblo queda triste.
 *
 * Cada área de Jerusalén juzgará a su manera (diseño de Jerusalén en línea):
 * - templo (sacerdotes): examinar según la ley de Moisés, como aquí;
 * - palacio (rey, etapa 3): buscar la prueba que descubre la verdad, como Salomón (1 Reyes 3:16-28);
 * - escuela de los profetas (etapa 3): discernir si una palabra concuerda con las Escrituras
 *   (Deuteronomio 18:21-22; Hechos 17:11).
 *
 * Las citas de `ley` son textuales de la Reina-Valera 1960; lo demás cuenta el pasaje con otras palabras.
 */
import type { Verso } from "@shared/calendario";

export type Caso = {
  id: string;
  ambito: "templo";
  titulo: string;
  /** Desde qué rango llega el caso (3 principal de los sacerdotes, 4 sumo sacerdote). */
  rango: 3 | 4;
  partes: { quien: string; dice: string }[];
  /** Hasta dos se pueden examinar; la clave es la que muestra cómo juzgar. */
  pistas: { nombre: string; revela: string; clave?: boolean }[];
  /** Tres sentencias; `despues` es lo que pasó por esa decisión. */
  opciones: { texto: string; justa?: boolean; despues: string }[];
  ley: Verso;
};

export const CASOS: Caso[] = [
  {
    id: "cordero-cojo",
    ambito: "templo",
    titulo: "El cordero cojo",
    rango: 3,
    partes: [{ quien: "Un ganadero de Belén", dice: "Traigo este cordero para cumplir mi voto. Cojea un poco, pero un cordero es un cordero." }],
    pistas: [
      { nombre: "Mirar el cordero", revela: "Tiene una pata quebrada y una nube en un ojo." },
      { nombre: "Preguntar por su rebaño", revela: "Sus vecinos cuentan que tiene cien ovejas sanas y que guardó las mejores para venderlas.", clave: true },
      { nombre: "Preguntar por su voto", revela: "Prometió a Jehová un cordero si sanaba su hijo, y su hijo sanó." },
    ],
    opciones: [
      { texto: "Recibir el cordero: lo importante es que trajo algo.", despues: "Otros vieron que a Dios se le podía dar lo que sobra, y pronto llegaron al altar animales cojos y enfermos, como los que reprendió Malaquías." },
      { texto: "Pedirle que cumpla su voto con un cordero sano de su rebaño.", justa: true, despues: "Volvió con el mejor cordero de su rebaño y lo presentó con alegría. Su familia aprendió a honrar a Dios con lo mejor." },
      { texto: "Echarlo del templo por mentiroso.", despues: "Se fue avergonzado y nunca cumplió su voto. Le faltó un sacerdote que le enseñara el camino." },
    ],
    ley: { text: "Ninguna cosa en que haya defecto ofreceréis, porque no será acepto por vosotros.", ref: "Levítico 22:20" },
  },
  {
    id: "leproso",
    ambito: "templo",
    titulo: "La mancha en la piel",
    rango: 3,
    partes: [{ quien: "Joab, de Anatot", dice: "La mancha de mi piel casi no se ve. ¡Declárame limpio hoy mismo, que mi familia me espera!" }],
    pistas: [
      { nombre: "Examinar la piel", revela: "La mancha está más clara, pero todavía no se puede saber si sanó.", clave: true },
      { nombre: "Preguntar desde cuándo", revela: "La mancha cambió hace apenas dos días." },
      { nombre: "Hablar con su familia", revela: "Su esposa lo espera con ansias, pero teme por los niños." },
    ],
    opciones: [
      { texto: "Declararlo limpio en este momento.", despues: "Volvió a casa antes de tiempo, la mancha se extendió y tuvo que salir otra vez de su casa. La alegría de su familia se volvió tristeza." },
      { texto: "Encerrarlo siete días y examinarlo de nuevo.", justa: true, despues: "A los siete días la mancha se había oscurecido y no había crecido. El sacerdote lo declaró limpio y volvió a su casa en paz." },
      { texto: "Echarlo de la ciudad para siempre.", despues: "Sanó lejos de todos, pero nadie fue a examinarlo. Se quedó solo, sin que el sacerdote hiciera su trabajo." },
    ],
    ley: { text: "Y al séptimo día el sacerdote le reconocerá de nuevo; y si parece haberse oscurecido la llaga, y que no ha cundido en la piel, entonces el sacerdote lo declarará limpio: era erupción; y lavará sus vestidos, y será limpio.", ref: "Levítico 13:6" },
  },
  {
    id: "oveja-perdida",
    ambito: "templo",
    titulo: "La oveja que llegó sola",
    rango: 3,
    partes: [{ quien: "Micaía, labrador", dice: "Hace una semana llegó una oveja a mi campo y nadie la ha buscado. ¿Ya es mía?" }],
    pistas: [
      { nombre: "Mirar la oveja", revela: "Tiene una marca de color en la oreja." },
      { nombre: "Preguntar en la puerta de la ciudad", revela: "Un pastor de Tecoa anda preguntando por una oveja con la oreja marcada.", clave: true },
      { nombre: "Preguntar a los vecinos", revela: "Dicen que Micaía es pobre y que una oveja le vendría bien." },
    ],
    opciones: [
      { texto: "Que la cuide y se la devuelva al pastor de Tecoa.", justa: true, despues: "El pastor lloró de alegría al recibir su oveja. Micaía ganó un amigo, y Dios bendijo su campo." },
      { texto: "Que se quede con ella: quien la halla, la gana.", despues: "El pastor la buscó por días. Cuando supo dónde estaba, el pleito llegó hasta los ancianos de la puerta y los dos vecinos quedaron enemistados." },
      { texto: "Que la presente en el altar: así nadie pierde.", despues: "Ofreció lo que no era suyo. El pastor se quedó sin su oveja, y a Dios no le agrada lo que se le quita a otro." },
    ],
    ley: { text: "Si vieres extraviado el buey de tu hermano, o su cordero, no le negarás tu ayuda; lo volverás a tu hermano.", ref: "Deuteronomio 22:1" },
  },
  {
    id: "madre-pobre",
    ambito: "templo",
    titulo: "La madre que no tiene cordero",
    rango: 3,
    partes: [{ quien: "Una joven madre", dice: "Hace cuarenta días nació mi hijo. Me dijeron que debo traer un cordero, pero no tengo con qué comprarlo." }],
    pistas: [
      { nombre: "Preguntar por su familia", revela: "Su esposo murió y ella vive de recoger espigas en los campos.", clave: true },
      { nombre: "Mirar lo que trae", revela: "Trae dos tórtolas en una canasta." },
      { nombre: "Preguntar a las mujeres del atrio", revela: "Dicen que es una madre honrada y trabajadora." },
    ],
    opciones: [
      { texto: "Recibir sus dos tórtolas y declararla limpia.", justa: true, despues: "Volvió a casa con su hijo, en paz y bendecida. Así lo hicieron también María y José cuando presentaron a Jesús (Lucas 2:24)." },
      { texto: "Que vuelva cuando tenga para un cordero.", despues: "Pasaron meses sin que pudiera presentarse en el templo. Se sintió olvidada, aunque la ley había pensado en ella." },
      { texto: "Darle un cordero de las ofrendas del templo.", despues: "La quisiste ayudar, pero tomaste lo que el pueblo había dado a Jehová, y otros empezaron a pedir lo mismo. La ley ya tenía un camino para ella." },
    ],
    ley: { text: "Y si no tiene lo suficiente para un cordero, tomará entonces dos tórtolas o dos palominos, uno para holocausto y otro para expiación; y el sacerdote hará expiación por ella, y será limpia.", ref: "Levítico 12:8" },
  },
  {
    id: "toco-un-muerto",
    ambito: "templo",
    titulo: "El hijo que enterró a su padre",
    rango: 3,
    partes: [{ quien: "Jonadab", dice: "Ayer enterré a mi padre. Hoy quiero entrar a ofrecer y a orar. ¡No me lo impidas!" }],
    pistas: [
      { nombre: "Preguntar qué pasó", revela: "Él mismo cargó el cuerpo de su padre hasta la tumba." },
      { nombre: "Recordar la ley de la purificación", revela: "Quien toca un cuerpo muerto queda impuro siete días y se purifica al tercero y al séptimo (Números 19:11-12).", clave: true },
      { nombre: "Mirarlo a los ojos", revela: "Está muy triste y quiere orar." },
    ],
    opciones: [
      { texto: "Dejarlo entrar al santuario: está de luto.", despues: "Entró impuro, y otros comenzaron a hacer lo mismo. Poco a poco se fue perdiendo el respeto por la santidad de la casa de Jehová." },
      { texto: "Que se purifique al tercer y al séptimo día; mientras tanto, orar con él en el atrio de afuera.", justa: true, despues: "Se purificó como manda la ley y al octavo día entró con su ofrenda, consolado por los sacerdotes que oraron con él." },
      { texto: "Prohibirle la entrada para siempre.", despues: "Se fue con su dolor y nadie lo consoló. La ley daba un camino para volver y no se lo mostraron." },
    ],
    ley: { text: "El que tocare cadáver de cualquier persona será inmundo siete días.", ref: "Números 19:11" },
  },
  {
    id: "deposito",
    ambito: "templo",
    titulo: "El dinero que no apareció",
    rango: 4,
    partes: [
      { quien: "Rubén", dice: "Le dejé a Simei diez siclos de plata para que me los guardara, y ahora dice que se los robaron." },
      { quien: "Simei", dice: "Ya juré que me los robaron… pero desde entonces no tengo paz." },
    ],
    pistas: [
      { nombre: "Preguntar a los vecinos", revela: "Nadie vio ladrones en la casa de Simei, y hace poco compró una túnica nueva." },
      { nombre: "Recordar la ley del depósito", revela: "Quien niega un depósito lo restituye por entero, añade la quinta parte y trae un carnero sin defecto para expiación (Levítico 6:4-6).", clave: true },
      { nombre: "Hablar a solas con Simei", revela: "Llora y confiesa que gastó el dinero." },
    ],
    opciones: [
      { texto: "Que Simei devuelva los diez siclos, añada la quinta parte y traiga un carnero para expiación.", justa: true, despues: "Simei devolvió doce siclos, presentó su carnero y fue perdonado. Rubén y él volvieron a ser amigos." },
      { texto: "Que Simei devuelva solo los diez siclos y asunto terminado.", despues: "Rubén recibió su plata, pero Simei no confesó su pecado delante de Dios y siguió sin paz." },
      { texto: "Como ya juró, creerle a Simei.", despues: "Rubén perdió lo suyo, y el pueblo aprendió que jurar en falso no tenía consecuencias." },
    ],
    ley: { text: "lo restituirá por entero a aquel a quien pertenece, y añadirá a ello la quinta parte, en el día de su expiación.", ref: "Levítico 6:5" },
  },
  {
    id: "pozo",
    ambito: "templo",
    titulo: "El buey que cayó en el pozo",
    rango: 4,
    partes: [
      { quien: "Natán", dice: "Abrí un pozo en mi campo y no lo cubrí. Cayó el buey de mi vecino y murió." },
      { quien: "Abdón", dice: "¡Era mi único buey! ¿Con qué voy a arar ahora?" },
    ],
    pistas: [
      { nombre: "Mirar el pozo", revela: "Estaba abierto y sin tapa, junto al camino.", clave: true },
      { nombre: "Preguntar a los testigos", revela: "El buey iba con su dueño por el camino de siempre." },
      { nombre: "Mirar el buey", revela: "Era un buey sano y fuerte." },
    ],
    opciones: [
      { texto: "Que Natán pague el buey a Abdón y se quede con el animal muerto.", justa: true, despues: "Abdón compró otro buey y aró a tiempo. Natán puso tapa a su pozo y nadie más cayó en él." },
      { texto: "Que cada uno cargue con su pérdida.", despues: "Abdón no pudo arar y su familia pasó un invierno muy duro. El pozo siguió abierto y otro animal cayó después." },
      { texto: "Que Abdón pague por la tierra que dañó su buey al caer.", despues: "El pueblo vio que el juicio favorecía al que tenía más tierras, y los pobres dejaron de buscar justicia en la casa de Jehová." },
    ],
    ley: { text: "el dueño de la cisterna pagará el daño, resarciendo a su dueño, y lo que fue muerto será suyo.", ref: "Éxodo 21:34" },
  },
  {
    id: "voto-campo",
    ambito: "templo",
    titulo: "El voto en la tormenta",
    rango: 4,
    partes: [{ quien: "Eliab, pescador", dice: "En la tormenta prometí dar a Jehová mi campo del valle si volvía con vida. Ahora me arrepiento: ese campo da de comer a mis cinco hijos." }],
    pistas: [
      { nombre: "Preguntar qué prometió", revela: "Dijo: «Si vuelvo con vida, mi campo del valle será de Jehová»." },
      { nombre: "Recordar la ley de los votos", revela: "Quien consagra un campo puede rescatarlo pagando su valor y la quinta parte (Levítico 27:19).", clave: true },
      { nombre: "Mirar su casa", revela: "Sus hijos son pequeños y su esposa está enferma." },
    ],
    opciones: [
      { texto: "Que entregue el campo: es de Jehová y no puede rescatarlo.", despues: "Su familia se quedó sin pan, y Eliab sirvió a Dios con amargura en lugar de gozo." },
      { texto: "Que rescate el campo pagando su valor y la quinta parte.", justa: true, despues: "Eliab pagó el rescate con trabajo y ahorro, cumplió su palabra delante de Dios y su familia siguió comiendo de su campo." },
      { texto: "Que se olvide del voto: lo prometió con miedo.", despues: "Eliab aprendió que una promesa a Dios no valía nada, y su palabra perdió valor delante de todos." },
    ],
    ley: { text: "Cuando a Dios haces promesa, no tardes en cumplirla; porque él no se complace en los insensatos. Cumple lo que prometes.", ref: "Eclesiastés 5:4" },
  },
  {
    id: "principe",
    ambito: "templo",
    titulo: "El príncipe que pecó sin querer",
    rango: 4,
    partes: [{ quien: "Un príncipe de Judá", dice: "Sin darme cuenta juré a la ligera algo que no me tocaba. Ahora lo sé. ¿Qué debo hacer? Soy príncipe del pueblo." }],
    pistas: [
      { nombre: "Preguntar quién lo sabe", revela: "Nadie más se dio cuenta." },
      { nombre: "Recordar la ley del príncipe", revela: "Si un jefe peca por yerro, trae un macho cabrío sin defecto y el sacerdote hace expiación por él (Levítico 4:22-26).", clave: true },
      { nombre: "Mirar lo que trae", revela: "Trae dos palominos, la ofrenda de los más pobres." },
    ],
    opciones: [
      { texto: "Que traiga un macho cabrío sin defecto para expiación.", justa: true, despues: "Presentó su macho cabrío y fue perdonado. El pueblo vio que la ley es igual para grandes y pequeños, y respetó más a su príncipe." },
      { texto: "Como nadie lo vio, que lo deje así.", despues: "Guardó su pecado en secreto y perdió la paz. Más adelante volvió a jurar a la ligera." },
      { texto: "Recibirle los dos palominos para no avergonzarlo.", despues: "Hiciste distinción de persona, y el pueblo comentó que en el templo había una ley para los príncipes y otra para los pobres." },
    ],
    ley: { text: "No hagáis distinción de persona en el juicio; así al pequeño como al grande oiréis", ref: "Deuteronomio 1:17" },
  },
  {
    id: "heredad",
    ambito: "templo",
    titulo: "Las hijas sin hermanos",
    rango: 4,
    partes: [
      { quien: "Las hijas de un hombre de Manasés", dice: "Nuestro padre murió sin hijos varones. ¿Por qué se ha de borrar su nombre de su familia? Danos heredad." },
      { quien: "Su tío", dice: "La tierra debe quedar para los hombres de la familia." },
    ],
    pistas: [
      { nombre: "Preguntar por el padre", revela: "Murió en paz y no fue de los que se rebelaron contra Jehová." },
      { nombre: "Recordar lo que Jehová mandó a Moisés", revela: "Ante el sacerdote Eleazar, Jehová dijo que las hijas de Zelofehad tenían razón y que recibieran la heredad de su padre (Números 27:1-7).", clave: true },
      { nombre: "Hablar con el tío", revela: "Quiere juntar ese campo con el suyo." },
    ],
    opciones: [
      { texto: "Darles la heredad de su padre.", justa: true, despues: "Las hijas recibieron el campo de su padre y su nombre no se borró de su familia, como Jehová había mandado." },
      { texto: "Dar la tierra al tío.", despues: "Las hermanas quedaron sin casa ni campo, y el tío se hizo más rico. Los ancianos lamentaron ese juicio por muchos años." },
      { texto: "Repartir la tierra entre todos los vecinos.", despues: "Nadie quedó contento y la familia perdió su heredad para siempre." },
    ],
    ley: { text: "Bien dicen las hijas de Zelofehad; les darás la posesión de una heredad entre los hermanos de su padre, y traspasarás la heredad de su padre a ellas.", ref: "Números 27:7" },
  },
];

export const casoPorId = (id: string) => CASOS.find((c) => c.id === id);

/** Escoge un caso para el rango, primero los que todavía no se juzgaron bien. */
export function elegirCaso(rango: number, bienJuzgados: (id: string) => boolean, azar = Math.random): Caso | null {
  const abiertos = CASOS.filter((c) => c.rango <= rango);
  if (!abiertos.length) return null;
  const nuevos = abiertos.filter((c) => !bienJuzgados(c.id));
  const pool = nuevos.length ? nuevos : abiertos;
  return pool[Math.floor(azar() * pool.length)];
}

/** Versos para los pasos del juicio. */
export const ESCUCHAR: Verso = { text: "Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre.", ref: "Proverbios 18:17" };
export const INQUIRIR: Verso = { text: "Al que responde palabra antes de oír, Le es fatuidad y oprobio.", ref: "Proverbios 18:13" };
export const ALEGRIA: Verso = { text: "Por la noche durará el lloro, Y a la mañana vendrá la alegría.", ref: "Salmo 30:5" };
