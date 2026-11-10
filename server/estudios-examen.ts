/**
 * Exámenes de los estudios de Jerusalén en línea: SOLO en el servidor (al teléfono llegan las
 * preguntas sin la respuesta). Fila = id, pregunta, respuesta correcta, tres respuestas falsas,
 * explicación y cita. Los ids no se reusan.
 */
export type FilaExamen = [id: string, pregunta: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];

export const EXAMENES: Record<string, FilaExamen[]> = {
  "sacerdocio-aaron": [
    ["sa1", "¿A quiénes hizo llegar Moisés para que fueran sacerdotes?", "A Aarón y a sus hijos", ["A los príncipes de las tribus", "A los ancianos de Israel", "A todos los primogénitos"], "Dios los llamó «para que sean mis sacerdotes».", "Éxodo 28:1"],
    ["sa2", "¿Con qué lavó Moisés a Aarón y a sus hijos al consagrarlos?", "Con agua", ["Con aceite", "Con vino", "Con ceniza"], "«Moisés hizo acercarse a Aarón y a sus hijos, y los lavó con agua».", "Levítico 8:6"],
    ["sa3", "¿Para qué llevaba Aarón los nombres de las tribus sobre su corazón?", "Por memorial delante de Jehová", ["Para que el pueblo lo obedeciera", "Para contar a la gente", "Como adorno de la fiesta"], "Los llevaba en el pectoral «por memorial delante de Jehová continuamente».", "Éxodo 28:29"],
    ["sa4", "¿Qué hacía el sacerdote cada mañana en el altar?", "Ponía leña para que el fuego no se apagara", ["Lo apagaba para limpiarlo", "Lo cubría con un velo", "Lo lavaba con aceite"], "«El sacerdote pondrá en él leña cada mañana».", "Levítico 6:12"],
    ["sa5", "¿Entre qué debía discernir el sacerdote?", "Entre lo santo y lo profano", ["Entre ricos y pobres", "Entre judíos y extranjeros", "Entre lo caro y lo barato"], "También entre lo inmundo y lo limpio, para enseñar al pueblo.", "Levítico 10:10"],
    ["sa6", "¿Quién es nuestro gran sumo sacerdote según Hebreos 4:14?", "Jesús el Hijo de Dios", ["Aarón", "Moisés", "Azarías"], "«Teniendo un gran sumo sacerdote que traspasó los cielos, Jesús el Hijo de Dios».", "Hebreos 4:14"],
  ],
  "ofrendas-levitico": [
    ["of1", "¿Dónde se ofrecía el holocausto según Levítico 1:3?", "A la puerta del tabernáculo de reunión", ["En la casa de cada familia", "En el monte más alto", "Junto al río"], "«Lo ofrecerá a la puerta del tabernáculo de reunión delante de Jehová».", "Levítico 1:3"],
    ["of2", "¿Qué pasaba cuando el oferente ponía su mano sobre la cabeza del holocausto?", "Era aceptado para expiación suya", ["El animal pasaba a ser del rey", "Se lo vendía al sacerdote", "Lo regalaba a un vecino"], "«Y será aceptado para expiación suya».", "Levítico 1:4"],
    ["of3", "¿De qué era la oblación de Levítico 2:1?", "De flor de harina", ["De frutas secas", "De vino nuevo", "De lana"], "Flor de harina con aceite e incienso.", "Levítico 2:1"],
    ["of4", "Según Levítico 4:35, ¿qué hacía el sacerdote por quien pecaba?", "Hacía expiación de su pecado", ["Lo expulsaba del pueblo", "Le cobraba una multa", "Lo mandaba con el rey"], "«Le hará el sacerdote expiación de su pecado… y será perdonado».", "Levítico 4:35"],
    ["of5", "¿Qué enseña Levítico 5:7 sobre quien era pobre?", "Que podía traer dos tórtolas o dos palominos", ["Que no podía ofrecer", "Que debía pedir prestado un cordero", "Que solo podía orar de lejos"], "El perdón de Dios era también para el pobre.", "Levítico 5:7"],
    ["of6", "¿Dónde se sentó Cristo después de ofrecer un solo sacrificio por los pecados?", "A la diestra de Dios", ["En un trono en Jerusalén", "En el atrio del templo", "En el monte de los Olivos"], "«Se ha sentado a la diestra de Dios».", "Hebreos 10:12"],
  ],
  expiacion: [
    ["ex1", "¿Por qué no debía Aarón entrar en todo tiempo detrás del velo?", "Para que no muriera, porque Dios aparecía en la nube sobre el propiciatorio", ["Porque estaba cerrado con llave", "Porque el rey lo prohibía", "Porque no había luz"], "Así lo dijo Jehová a Moisés.", "Levítico 16:2"],
    ["ex2", "Según Hebreos 9:7, ¿por quiénes ofrecía sangre el sumo sacerdote?", "Por sí mismo y por los pecados de ignorancia del pueblo", ["Solo por el rey", "Solo por los levitas", "Solo por los extranjeros"], "Entraba una vez al año, no sin sangre.", "Hebreos 9:7"],
    ["ex3", "¿Qué día del mes séptimo era el Día de la Expiación?", "El día diez", ["El día primero", "El día quince", "El día catorce"], "«A los diez días de este mes séptimo será el día de expiación».", "Levítico 23:27"],
    ["ex4", "¿Qué obtuvo Cristo al entrar una vez para siempre en el Lugar Santísimo?", "Eterna redención", ["Un reino en la tierra", "Un templo nuevo", "Muchas riquezas"], "«Entró una vez para siempre… habiendo obtenido eterna redención».", "Hebreos 9:12"],
    ["ex5", "Según Hebreos 10:20, ¿qué es el velo por el que Jesús nos abrió el camino?", "Su carne", ["La ley de Moisés", "El cielo", "El templo de Salomón"], "«A través del velo, esto es, de su carne».", "Hebreos 10:20"],
    ["ex6", "¿Qué pasó con el velo del templo cuando murió Jesús?", "Se rasgó en dos, de arriba abajo", ["Se quemó", "Lo quitaron los sacerdotes", "Se cayó al suelo entero"], "El camino al Lugar Santísimo quedó abierto.", "Mateo 27:51"],
  ],
  "llamado-profeta": [
    ["pr1", "¿Qué preguntó la voz del Señor en Isaías 6:8?", "¿A quién enviaré, y quién irá por nosotros?", ["¿Quién construirá mi casa?", "¿Dónde está tu hermano?", "¿Qué tienes en tu mano?"], "Isaías respondió: «Heme aquí, envíame a mí».", "Isaías 6:8"],
    ["pr2", "¿Para qué santificó Dios a Jeremías antes de nacer?", "Para darlo por profeta a las naciones", ["Para ser rey de Judá", "Para ser sumo sacerdote", "Para ser soldado"], "«Te di por profeta a las naciones».", "Jeremías 1:5"],
    ["pr3", "¿Quién dijo «Habla, porque tu siervo oye»?", "Samuel", ["Elí", "Isaías", "David"], "Samuel, cuando Dios lo llamó por su nombre.", "1 Samuel 3:10"],
    ["pr4", "Según Deuteronomio 18:18, ¿qué pondría Dios en la boca del profeta?", "Sus palabras", ["Fuego", "Una espada", "Miel"], "«Pondré mis palabras en su boca, y él les hablará todo lo que yo le mandare».", "Deuteronomio 18:18"],
    ["pr5", "¿Con qué querían construir los hijos de los profetas su nuevo lugar?", "Con vigas que tomarían del Jordán", ["Con piedras del templo", "Con cedro del Líbano", "Con oro de Ofir"], "«Tomemos de allí cada uno una viga».", "2 Reyes 6:2"],
    ["pr6", "¿Qué profeta le envió a Ezequías la respuesta de Dios sobre Senaquerib?", "Isaías hijo de Amoz", ["Jeremías", "Eliseo", "Natán"], "Isaías le mandó decir: «Así ha dicho Jehová Dios de Israel».", "Isaías 37:21"],
  ],
  "rey-justo": [
    ["re1", "¿De dónde copiaba el rey la ley según Deuteronomio 17:18?", "Del original que está al cuidado de los sacerdotes levitas", ["De las tablas de los reyes vecinos", "De un libro de Egipto", "De su memoria"], "El rey escribía para sí una copia de esa ley.", "Deuteronomio 17:18"],
    ["re2", "¿Para qué debía leer el rey la ley todos los días?", "Para que aprenda a temer a Jehová su Dios", ["Para ganar las guerras", "Para enseñarla a los reyes vecinos", "Para cobrar más impuestos"], "Y para guardar todas sus palabras y ponerlas por obra.", "Deuteronomio 17:19"],
    ["re3", "¿Para qué pidió Salomón un corazón entendido?", "Para juzgar al pueblo y discernir entre lo bueno y lo malo", ["Para hacerse rico", "Para conquistar Egipto", "Para escribir canciones"], "«¿Quién podrá gobernar este tu pueblo tan grande?».", "1 Reyes 3:9"],
    ["re4", "¿Conforme a quién hizo Ezequías lo recto ante Jehová?", "Conforme a lo que había hecho David su padre", ["Conforme a Salomón", "Conforme a Acaz", "Conforme a Saúl"], "«Conforme a todas las cosas que había hecho David su padre».", "2 Crónicas 29:2"],
    ["re5", "Según Ezequías, ¿qué había con el rey de Asiria?", "El brazo de carne", ["El Dios verdadero", "Los profetas de Israel", "La ley de Moisés"], "«Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios».", "2 Crónicas 32:8"],
    ["re6", "¿Con qué se sustenta el trono del rey según Proverbios 20:28?", "Con clemencia", ["Con temor", "Con impuestos", "Con espadas"], "«Misericordia y verdad guardan al rey, y con clemencia se sustenta su trono».", "Proverbios 20:28"],
  ],
  fiestas: [
    ["fi1", "¿Cómo llama Levítico 23:2 a las fiestas de Jehová?", "Santas convocaciones", ["Banquetes del rey", "Días de mercado", "Fiestas de la cosecha del vecino"], "«Las fiestas solemnes de Jehová, las cuales proclamaréis como santas convocaciones».", "Levítico 23:2"],
    ["fi2", "¿Cuántos días se comían panes sin levadura?", "Siete", ["Tres", "Cuarenta", "Uno"], "«Siete días comeréis panes sin levadura».", "Levítico 23:6"],
    ["fi3", "¿Qué se ofrecía en Pentecostés según Levítico 23:16?", "El nuevo grano", ["El primer cordero", "Oro y plata", "Agua del río"], "A los cincuenta días se ofrecía el nuevo grano a Jehová.", "Levítico 23:16"],
    ["fi4", "¿Qué se hacía en el Día de la Expiación según Levítico 23:27?", "Afligir el alma y ofrecer ofrenda encendida", ["Comer y beber en abundancia", "Elegir un nuevo rey", "Construir casas"], "Era una santa convocación de arrepentimiento.", "Levítico 23:27"],
    ["fi5", "¿Para qué habitaban en tabernáculos siete días?", "Para recordar que Dios los hizo habitar en tabernáculos al salir de Egipto", ["Porque no tenían casas", "Para cuidar las cosechas de noche", "Para esconderse del enemigo"], "«Para que sepan vuestros descendientes…».", "Levítico 23:43"],
    ["fi6", "¿Cómo estaban los discípulos cuando llegó el día de Pentecostés?", "Todos unánimes juntos", ["Todos dormidos", "Escondidos en el desierto", "En guerra entre ellos"], "«Estaban todos unánimes juntos».", "Hechos 2:1"],
  ],
};
