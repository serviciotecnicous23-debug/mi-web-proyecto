/**
 * El banco de «Evangelismo personal avanzado» (especialidad Evangelismo y misiones). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el corazón del evangelista · o2 el evangelio y sus distorsiones · o3 hablar según la persona · o4 la
 * familia y los amigos · o5 valentía y oración · o6 formar a otros · o7 el versículo de memoria (Proverbios 11:30).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `evangelismo-misiones-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_EVANGELISMO_MISIONES_1: BancoMateria = {
  materia: "evangelismo-misiones-1",
  repaso: {
    "evangelismo-misiones-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué movía a Pablo a evangelizar, según 2 Corintios 5:14?", "El amor de Cristo", ["El deseo de ganar discusiones", "La obligación de un cargo", "El miedo al castigo"], "«Porque el amor de Cristo nos constriñe».", "2 Corintios 5:14"],
      ["1-r2", 1, "o1", "comprender", "¿Qué significa que somos embajadores en nombre de Cristo?", "Que llevamos el mensaje del que nos envió, y no el nuestro", ["Que hablamos en nuestro propio nombre", "Que tenemos un cargo político", "Que solo los pastores evangelizan"], "«somos embajadores en nombre de Cristo».", "2 Corintios 5:20"],
      ["1-r3", 1, "o1", "aplicar", "¿Cuál es el primer paso que propone la lección para evangelizar?", "Orar cada día por una lista corta de personas con nombre", ["Discutir con todos", "Esperar a que alguien pregunte", "Repartir folletos sin orar"], "El evangelismo empieza de rodillas.", "1 Timoteo 2:1-4"],
    ] as P[]).map(p),
    "evangelismo-misiones-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué resume Pablo en 1 Corintios 15:3-4?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día", ["Que debemos portarnos bien para salvarnos", "Que Dios promete riqueza a los fieles", "Que basta con repetir una oración"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras».", "1 Corintios 15:3-4"],
      ["2-r2", 2, "o2", "comprender", "¿Qué distorsión presenta la salvación como premio por portarse bien?", "La de las obras", ["La de la prosperidad", "La de un Jesús sin cruz", "Ninguna: eso es el evangelio"], "La salvación es por gracia, por medio de la fe (Efesios 2:8-9).", "Gálatas 1:6-7"],
      ["2-r3", 2, "o2", "aplicar", "¿A qué invita un evangelismo fiel, según Lucas 14:27?", "A seguir a Cristo, cargando su cruz", ["Solo a levantar la mano", "A una vida sin dificultades", "A cambiar de religión sin cambiar de vida"], "«el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo».", "Lucas 14:27"],
    ] as P[]).map(p),
    "evangelismo-misiones-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿De qué partió Pablo para hablar en Atenas?", "De un altar al Dios no conocido", ["De la ley de Moisés", "De un milagro", "De una profecía de Isaías"], "«AL DIOS NO CONOCIDO».", "Hechos 17:22-23"],
      ["3-r2", 3, "o3", "comprender", "¿Qué cambia y qué no cambia cuando Pablo se hace de todo a todos?", "Cambian el lenguaje y el punto de partida; el evangelio no cambia", ["Cambia el evangelio según la persona", "No cambia nada: habla igual a todos", "Cambia la cruz por otro mensaje"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
      ["3-r3", 3, "o3", "aplicar", "¿Cómo se empieza a hablar con una persona que tiene otra religión?", "Escuchándola con respeto y partiendo de lo que comparten", ["Burlándose de su religión", "Atacándola con versículos", "Evitando hablarle de Cristo"], "Después se lleva la conversación a Cristo, sin burlas ni ataques.", "Hechos 17:22-23"],
    ] as P[]).map(p),
    "evangelismo-misiones-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le dijo Jesús al hombre que liberó en Gadara?", "Que fuera a su casa y contara a los suyos lo que el Señor había hecho con él", ["Que lo siguiera a Jerusalén", "Que no le dijera nada a nadie", "Que fuera al templo a ofrecer un sacrificio"], "«Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hizo Cornelio antes de que llegara Pedro?", "Convocó a sus parientes y amigos más íntimos", ["Se escondió", "Fue a la sinagoga", "Cerró su casa"], "«habiendo convocado a sus parientes y amigos más íntimos».", "Hechos 10:24"],
      ["4-r3", 4, "o4", "aplicar", "Natanael dudó de Jesús. ¿Qué hizo Felipe?", "Lo invitó a ver por sí mismo", ["Discutió con él", "Se alejó", "Lo obligó a creer"], "«Ven y ve».", "Juan 1:45-46"],
    ] as P[]).map(p),
    "evangelismo-misiones-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pidió la iglesia ante las amenazas en Hechos 4?", "Hablar la palabra con todo denuedo", ["Que las amenazas desaparecieran", "Un lugar para esconderse", "Venganza contra las autoridades"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
      ["5-r2", 5, "o5", "comprender", "¿Qué pedía Pablo en Efesios 6:19?", "Oración para dar a conocer con denuedo el misterio del evangelio", ["Dinero para sus viajes", "Que lo sacaran de la cárcel", "Que otros predicaran por él"], "«al abrir mi boca me sea dada palabra para dar a conocer con denuedo el misterio del evangelio».", "Efesios 6:19-20"],
      ["5-r3", 5, "o5", "aplicar", "Te da miedo no saber qué responder. ¿Qué propone la lección?", "Contar lo que Cristo hizo contigo y ofrecer buscar juntos la respuesta", ["No hablar nunca", "Inventar una respuesta", "Cambiar siempre de tema"], "Y antes de hablar, orar pidiendo denuedo.", "Hechos 4:29-31"],
    ] as P[]).map(p),
    "evangelismo-misiones-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo envió Jesús a los setenta?", "De dos en dos", ["Solos", "En un solo grupo grande", "Sin instrucciones"], "«a quienes envió de dos en dos delante de él».", "Lucas 10:1-2"],
      ["6-r2", 6, "o6", "comprender", "¿Quiénes anunciaban el evangelio cuando la iglesia fue esparcida, según Hechos 8:4?", "Los creyentes esparcidos, por todas partes", ["Solo los apóstoles", "Nadie", "Solo los ancianos"], "«los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
      ["6-r3", 6, "o6", "aplicar", "¿Cuál es el último paso del plan para formar a otro?", "Animarlo a formar a otra persona", ["Hacerlo todo por él", "Dejarlo solo sin evaluar", "Evitar que hable"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el corazón del evangelista (10)
    ["f01", 1, "o1", "recordar", "¿Cómo describe Pablo a los creyentes en 2 Corintios 5:20?", "Como embajadores en nombre de Cristo", ["Como jueces del mundo", "Como dueños del mensaje", "Como espectadores"], "«somos embajadores en nombre de Cristo».", "2 Corintios 5:20"],
    ["f02", 1, "o1", "recordar", "¿Qué ruegan los embajadores de Cristo, según 2 Corintios 5:20?", "Que las personas se reconcilien con Dios", ["Que se unan a un grupo", "Que den dinero", "Que se callen"], "«Reconciliaos con Dios».", "2 Corintios 5:20"],
    ["f03", 1, "o1", "comprender", "¿Qué muestra Romanos 10:1 del corazón de Pablo?", "Que anhelaba y pedía en oración la salvación de los suyos", ["Que ya no le interesaba Israel", "Que solo le importaban los griegos", "Que oraba por riquezas"], "«el anhelo de mi corazón, y mi oración a Dios por Israel, es para salvación».", "Romanos 10:1"],
    ["f04", 1, "o1", "recordar", "¿Por quiénes pide Pablo orar en 1 Timoteo 2:1?", "Por todos los hombres", ["Solo por los creyentes", "Solo por los pastores", "Solo por la familia"], "«Exhorto ante todo, a que se hagan rogativas, oraciones, peticiones y acciones de gracias, por todos los hombres».", "1 Timoteo 2:1-4"],
    ["f05", 1, "o1", "comprender", "¿Qué quiere Dios, según 1 Timoteo 2:4?", "Que todos los hombres sean salvos y vengan al conocimiento de la verdad", ["Que solo algunos lo conozcan", "Que cada uno busque su propia verdad", "Que nadie hable de él"], "«el cual quiere que todos los hombres sean salvos y vengan al conocimiento de la verdad».", "1 Timoteo 2:1-4"],
    ["f06", 1, "o1", "aplicar", "¿Cuántos nombres propone la lección para la lista de oración?", "De tres a cinco personas", ["Una sola persona", "Más de cien personas", "Ninguno: se ora en general"], "Una lista corta permite orar cada día por cada persona.", "1 Timoteo 2:1-4"],
    ["f07", 1, "o1", "aplicar", "Además de orar por las personas de la lista, ¿qué pide el evangelista para sí?", "Amor, valentía y palabras sabias", ["Fama y reconocimiento", "Que nadie lo rechace nunca", "Que otros hablen por él"], "Y anota las oportunidades que Dios le da.", "1 Timoteo 2:1-4"],
    ["f08", 1, "o1", "analizar", "¿Por qué el evangelismo no es solo cuestión de método?", "Porque nace de un corazón movido por el amor de Cristo", ["Porque los métodos no sirven para nada", "Porque basta con saber teoría", "Porque solo evangelizan los pastores"], "«Porque el amor de Cristo nos constriñe».", "2 Corintios 5:14"],
    ["f09", 1, "o1", "evaluar", "¿Qué evangelista tiene el corazón que muestra la lección?", "Uno que ama a las personas, siente carga por ellas y ora cada día por sus nombres", ["Uno que busca ganar discusiones", "Uno que ve a las personas como números", "Uno que habla sin orar nunca"], "«el anhelo de mi corazón, y mi oración a Dios por Israel, es para salvación».", "Romanos 10:1"],
    ["f10", 1, "o7", "recordar", "Completa Proverbios 11:30: El fruto del justo es árbol de vida…", "Y el que gana almas es sabio", ["Y el que habla mucho es sabio", "Y el que tiene riquezas es feliz", "Y el que calla es prudente"], "Es el versículo de memoria de la materia.", "Proverbios 11:30"],
    // ---- lección 2: el evangelio y sus distorsiones (10)
    ["f11", 2, "o2", "recordar", "¿Qué enseñó Pablo primeramente, según 1 Corintios 15:3?", "Que Cristo murió por nuestros pecados, conforme a las Escrituras", ["Que hay que guardar la ley para salvarse", "Que Dios quiere hacernos ricos", "Que todas las religiones son iguales"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras».", "1 Corintios 15:3-4"],
    ["f12", 2, "o2", "recordar", "¿Cuándo resucitó Cristo, según 1 Corintios 15:4?", "Al tercer día", ["Al séptimo día", "Al día siguiente", "A los cuarenta días"], "«y que resucitó al tercer día, conforme a las Escrituras».", "1 Corintios 15:3-4"],
    ["f13", 2, "o2", "recordar", "¿Qué llamado hizo Jesús en Marcos 1:15?", "Arrepentíos, y creed en el evangelio", ["Guardad las tradiciones", "Esperad sin hacer nada", "Ofreced sacrificios"], "«arrepentíos, y creed en el evangelio».", "Marcos 1:15"],
    ["f14", 2, "o2", "comprender", "¿Qué advirtió Pablo a los gálatas?", "Que algunos querían pervertir el evangelio de Cristo", ["Que el evangelio podía cambiar con el tiempo", "Que había varios evangelios válidos", "Que no hacía falta la cruz"], "«quieren pervertir el evangelio de Cristo».", "Gálatas 1:6-7"],
    ["f15", 2, "o2", "comprender", "¿Qué tiene de errado el evangelio de la prosperidad?", "Promete dinero, salud o éxito seguros a cambio de la fe o de una ofrenda", ["Habla demasiado de la cruz", "Llama al arrepentimiento", "Anuncia la resurrección"], "No hay otro evangelio: cambiar el mensaje es perderlo.", "Gálatas 1:6-7"],
    ["f16", 2, "o2", "comprender", "¿Qué falta en un Jesús sin cruz?", "El pecado, el arrepentimiento y la cruz", ["La música", "La amistad", "Las buenas obras"], "«el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo».", "Lucas 14:27"],
    ["f17", 2, "o2", "aplicar", "Alguien repitió una oración, pero no quiere dejar su pecado ni confiar en Cristo. ¿Qué enseña la lección?", "Que la oración no salva por sí sola: salva Cristo, por medio de una fe que se arrepiente", ["Que ya es salvo porque repitió las palabras", "Que no hace falta el arrepentimiento", "Que hay que repetir la oración muchas veces"], "«arrepentíos, y creed en el evangelio».", "Marcos 1:15"],
    ["f18", 2, "o2", "analizar", "¿Por qué son peligrosas las distorsiones del evangelio?", "Porque cambian el mensaje y dejan a la persona sin el verdadero evangelio", ["Porque son difíciles de entender", "Porque usan pocas palabras", "No son peligrosas"], "«No que haya otro, sino que hay algunos que os perturban y quieren pervertir el evangelio de Cristo».", "Gálatas 1:6-7"],
    ["f19", 2, "o2", "aplicar", "Un amigo te dice que se salvará porque es buena persona. ¿Qué distorsión aparece?", "La de las obras", ["La de la prosperidad", "La de un Jesús sin cruz", "Ninguna"], "La salvación es por gracia, por medio de la fe (Efesios 2:8-9).", "Gálatas 1:6-7"],
    ["f20", 2, "o2", "evaluar", "¿Qué presentación del evangelio es más fiel?", "Cristo murió por nuestros pecados y resucitó; arrepiéntete, cree en él y síguelo", ["Dios quiere que seas rico y feliz", "Si te portas bien, Dios te aceptará", "Repite esta oración y no te preocupes por nada más"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras».", "1 Corintios 15:3-4"],
    // ---- lección 3: hablar según la persona (10)
    ["f21", 3, "o3", "recordar", "¿Cómo anunció Pablo a Cristo en la sinagoga de Tesalónica?", "Declarando y exponiendo por medio de las Escrituras", ["Hablando de filósofos griegos", "Contando solo su testimonio", "Sin usar las Escrituras"], "«declarando y exponiendo por medio de las Escrituras».", "Hechos 17:2-3"],
    ["f22", 3, "o3", "recordar", "¿Qué decía la inscripción del altar que vio Pablo en Atenas?", "Al Dios no conocido", ["Al Dios de Israel", "A Zeus el poderoso", "Al Dios de los cielos"], "«AL DIOS NO CONOCIDO».", "Hechos 17:22-23"],
    ["f23", 3, "o3", "comprender", "¿Qué dijo Pablo a los atenienses sobre su religiosidad?", "Que observaba que eran muy religiosos", ["Que eran ateos", "Que no tenían dioses", "Que ya conocían a Cristo"], "«en todo observo que sois muy religiosos».", "Hechos 17:22-23"],
    ["f24", 3, "o3", "recordar", "¿Para qué se hacía Pablo de todo a todos?", "Para que de todos modos salve a algunos", ["Para ser aceptado por todos", "Para evitar problemas", "Para cambiar el evangelio"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
    ["f25", 3, "o3", "comprender", "¿Qué es adaptarse sin cambiar el mensaje?", "Cambiar el lenguaje, los ejemplos y el punto de partida, sin callar el pecado ni la cruz", ["Callar la cruz para no ofender", "Decir a cada uno lo que quiere oír", "Hablar igual a todos sin escuchar a nadie"], "Pablo siempre anunció a Cristo crucificado y resucitado.", "1 Corintios 9:22"],
    ["f26", 3, "o3", "aplicar", "Hablas con alguien que creció en la iglesia, pero vive sin Cristo. ¿Qué necesita, según la lección?", "La gracia de Cristo, y no solo la religión", ["Más reglas", "Una discusión", "Nada: ya es cristiano"], "Puede saber mucho, pero necesita la gracia de Cristo.", "Hechos 17:2-3"],
    ["f27", 3, "o3", "aplicar", "Hablas con alguien que duda o no cree. ¿Qué haces?", "Escuchar sus preguntas, responder con honestidad y ofrecer leer juntos un evangelio", ["Decirle que dudar es pecado", "Ganarle la discusión", "Evitar sus preguntas"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
    ["f28", 3, "o3", "aplicar", "Alguien fue herido en una iglesia. ¿Qué haces?", "Reconocer el daño que vivió y mostrarle que Cristo es distinto de los errores de los creyentes", ["Decirle que lo olvide", "Defender a la iglesia a toda costa", "Culparlo de lo que pasó"], "Escuchar bien es la mitad de una buena conversación sobre Cristo.", "1 Corintios 9:22"],
    ["f29", 3, "o3", "analizar", "¿Por qué Pablo empezó de maneras distintas en Tesalónica y en Atenas?", "Porque los judíos conocían las Escrituras y los atenienses no", ["Porque cambió de mensaje", "Porque en Atenas no quiso hablar de Cristo", "Por casualidad"], "«declarando y exponiendo por medio de las Escrituras».", "Hechos 17:2-3"],
    ["f30", 3, "o3", "evaluar", "¿Qué conversación sigue mejor el ejemplo de Pablo?", "Una que escucha la historia de la persona, parte de lo que conoce y la lleva a Cristo crucificado y resucitado", ["Una que repite el mismo discurso a todos", "Una que evita hablar de la cruz", "Una que se burla de lo que la persona cree"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
    // ---- lección 4: la familia y los amigos (10)
    ["f31", 4, "o4", "recordar", "¿Adónde envió Jesús al hombre que liberó en Gadara?", "A su casa, a los suyos", ["A Jerusalén", "Al desierto", "Al templo"], "«Vete a tu casa, a los tuyos».", "Marcos 5:19"],
    ["f32", 4, "o4", "recordar", "¿Qué debía contar el hombre de Gadara a los suyos?", "Cuán grandes cosas había hecho el Señor con él, y cómo tuvo misericordia", ["Los milagros de otros", "Una historia inventada", "Nada"], "«cuéntales cuán grandes cosas el Señor ha hecho contigo, y cómo ha tenido misericordia de ti».", "Marcos 5:19"],
    ["f33", 4, "o4", "recordar", "¿A quiénes reunió Cornelio en su casa?", "A sus parientes y amigos más íntimos", ["A los soldados de Roma", "A los sacerdotes del templo", "A desconocidos de la calle"], "«habiendo convocado a sus parientes y amigos más íntimos».", "Hechos 10:24"],
    ["f34", 4, "o4", "recordar", "¿Qué le dijeron al carcelero de Filipos?", "Cree en el Señor Jesucristo, y serás salvo, tú y tu casa", ["Haz buenas obras y serás salvo", "Libéranos y serás salvo", "Ve al templo y ofrece un sacrificio"], "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", "Hechos 16:31-34"],
    ["f35", 4, "o4", "comprender", "¿Qué no significa la promesa tú y tu casa?", "Que la familia se salva por la fe de uno solo", ["Que la familia también podía oír la palabra", "Que Dios ama a las familias", "Que el carcelero se alegró con su casa"], "«Y le hablaron la palabra del Señor a él y a todos los que estaban en su casa».", "Hechos 16:31-34"],
    ["f36", 4, "o4", "aplicar", "¿Qué habla antes que las palabras con la familia?", "El cambio en tu vida", ["Los regalos", "Las discusiones", "Los sermones largos"], "Vive lo que crees.", "Marcos 5:19"],
    ["f37", 4, "o4", "aplicar", "¿Qué evita la lección al evangelizar a los tuyos?", "Presionar y discutir", ["Orar por ellos", "Invitarlos a comer", "Contarles lo que Dios hizo"], "Respeta su tiempo y sigue amándolos.", "Juan 1:45-46"],
    ["f38", 4, "o4", "aplicar", "¿Qué invitación propone la lección para la familia y los amigos?", "Una comida, un estudio en casa o una actividad de la iglesia", ["Un debate público", "Una lista de reglas", "Nada: esperar a que vengan solos"], "«Ven y ve».", "Juan 1:45-46"],
    ["f39", 4, "o4", "analizar", "¿Qué tienen en común Cornelio, el carcelero y Felipe?", "Los tres abrieron el camino para que otros de su círculo conocieran a Cristo", ["Los tres eran apóstoles", "Los tres vivían en Jerusalén", "Nada"], "«Ven y ve».", "Juan 1:45-46"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de evangelizar a la familia es mejor?", "Vivir lo que se cree, orar por cada uno, contar con humildad lo que Dios hizo e invitar sin presionar", ["Sermonear en cada comida", "Discutir hasta convencerlos", "No hablar nunca de Cristo para no incomodar"], "«Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
    // ---- lección 5: valentía y oración (10)
    ["f41", 5, "o5", "recordar", "¿Qué pasó cuando la iglesia terminó de orar en Hechos 4:31?", "Todos fueron llenos del Espíritu Santo y hablaban con denuedo la palabra", ["Las amenazas se cumplieron", "Todos huyeron", "Dejaron de predicar"], "«todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».", "Hechos 4:29-31"],
    ["f42", 5, "o5", "comprender", "¿Qué no pidió la iglesia ante las amenazas?", "Que las amenazas pasaran", ["Denuedo para hablar", "Hablar la palabra", "La ayuda de Dios"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
    ["f43", 5, "o5", "recordar", "¿Qué era Pablo cuando pedía oración en Efesios 6:20?", "Un embajador en cadenas", ["Un rey", "Un juez", "Un hombre libre y rico"], "«por el cual soy embajador en cadenas».", "Efesios 6:19-20"],
    ["f44", 5, "o5", "comprender", "¿Qué muestra que Pablo pidiera oración para hablar con valor?", "Que aun los más fieles necesitan pedir denuedo a Dios", ["Que Pablo no creía en el evangelio", "Que el miedo es un pecado imperdonable", "Que no hay que orar"], "«que con denuedo hable de él, como debo hablar».", "Efesios 6:19-20"],
    ["f45", 5, "o5", "aplicar", "Te da miedo el rechazo. ¿Qué recuerda la lección?", "Que muchas veces se rechaza el mensaje y no a ti, y que el fruto lo da Dios", ["Que hay que evitar a la gente", "Que el rechazo prueba que hablaste mal", "Que nunca te rechazarán"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
    ["f46", 5, "o5", "aplicar", "Temes perder una amistad por hablar de Cristo. ¿Qué haces?", "Hablar con respeto y amor, porque una amistad verdadera soporta una conversación sincera", ["No hablar nunca de Cristo", "Terminar la amistad", "Hablar con enojo"], "«que con denuedo hable de él, como debo hablar».", "Efesios 6:19-20"],
    ["f47", 5, "o5", "recordar", "¿Qué no estimaba preciosa Pablo, según Hechos 20:24?", "Su propia vida", ["El evangelio", "Su ministerio", "La gracia de Dios"], "«ni estimo preciosa mi vida para mí mismo, con tal que acabe mi carrera con gozo».", "Hechos 20:24"],
    ["f48", 5, "o5", "comprender", "¿Para qué era el ministerio que Pablo recibió, según Hechos 20:24?", "Para dar testimonio del evangelio de la gracia de Dios", ["Para ganar dinero", "Para ser famoso", "Para gobernar"], "«para dar testimonio del evangelio de la gracia de Dios».", "Hechos 20:24"],
    ["f49", 5, "o5", "analizar", "¿Por qué la oración es la respuesta al miedo en el evangelismo?", "Porque el denuedo y el fruto vienen de Dios, y no de nuestras fuerzas", ["Porque así no hace falta hablar", "Porque el miedo desaparece para siempre", "No es la respuesta"], "«todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».", "Hechos 4:29-31"],
    ["f50", 5, "o5", "evaluar", "¿Qué creyente enfrenta mejor el miedo a evangelizar?", "Uno que ora pidiendo denuedo, enfrenta sus temores con la verdad y confía el fruto a Dios", ["Uno que espera a no tener miedo para hablar", "Uno que nunca habla para no equivocarse", "Uno que habla solo con los que ya creen"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
    // ---- lección 6: formar a otros para evangelizar (10)
    ["f51", 6, "o6", "recordar", "¿Qué pidió Jesús orar en Lucas 10:2?", "Que el Señor de la mies envíe obreros a su mies", ["Que la mies sea pequeña", "Que los obreros descansen", "Que la cosecha espere"], "«rogad al Señor de la mies que envíe obreros a su mies».", "Lucas 10:1-2"],
    ["f52", 6, "o6", "recordar", "¿Cómo describe Jesús la mies y los obreros en Lucas 10:2?", "La mies es mucha y los obreros pocos", ["La mies es poca y los obreros muchos", "Las dos son pocas", "Las dos son muchas"], "«La mies a la verdad es mucha, mas los obreros pocos».", "Lucas 10:1-2"],
    ["f53", 6, "o6", "comprender", "¿Qué muestra Hechos 8:4 sobre quiénes evangelizan?", "Que cada creyente puede ser un testigo, y no solo los apóstoles", ["Que solo los apóstoles evangelizan", "Que la persecución detuvo el evangelio", "Que hay que esperar a ser enviado por un concilio"], "«los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
    ["f54", 6, "o6", "recordar", "¿A quiénes debía encargar Timoteo lo que oyó de Pablo?", "A hombres fieles que sean idóneos para enseñar también a otros", ["A cualquiera", "Solo a los ricos", "A nadie"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f55", 6, "o6", "aplicar", "¿Cuál es el primer paso del plan para formar a otro evangelista?", "Escoger a una persona fiel y disponible", ["Dejarla hablar sola desde el principio", "Darle un libro y nada más", "Esperar a que se ofrezca"], "«esto encarga a hombres fieles».", "2 Timoteo 2:2"],
    ["f56", 6, "o6", "aplicar", "En el plan, ¿qué significa muéstrale?", "Que te acompañe cuando compartes tu fe", ["Que te vea predicar por video", "Que lea sobre evangelismo", "Que lo haga sola"], "«a quienes envió de dos en dos delante de él».", "Lucas 10:1-2"],
    ["f57", 6, "o6", "aplicar", "En el plan, ¿qué se hace después de que la persona habla y tú la acompañas?", "Evaluar juntos, orar y celebrar lo que Dios hace", ["Criticarla delante de otros", "No volver a hablar del tema", "Terminar el plan"], "«habrá más gozo en el cielo por un pecador que se arrepiente».", "Lucas 15:7"],
    ["f58", 6, "o6", "recordar", "¿Dónde hay gozo por un pecador que se arrepiente, según Lucas 15:7?", "En el cielo", ["Solo en la iglesia", "En ninguna parte", "Solo en la familia"], "«habrá más gozo en el cielo por un pecador que se arrepiente».", "Lucas 15:7"],
    ["f59", 6, "o6", "analizar", "¿Por qué formar a otros multiplica la obra?", "Porque cada persona formada puede alcanzar y formar a otras", ["Porque así el evangelista trabaja menos", "Porque los métodos lo hacen todo", "No la multiplica"], "«idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan para formar a otro evangelista es mejor?", "Escoger a alguien fiel, mostrarle, hacerlo juntos, dejarlo hacer, evaluar y animarlo a formar a otro", ["Darle una charla y dejarlo solo", "Hacerlo siempre tú para que no se equivoque", "Esperar a que aprenda por su cuenta"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué dice Proverbios 11:30 del que gana almas?", "Que es sabio", ["Que es rico", "Que es fuerte", "Que es famoso"], "«Y el que gana almas es sabio».", "Proverbios 11:30"],
      ["m1-02", 1, "o1", "comprender", "¿Cómo ve el evangelista a las personas, según la lección?", "Como gente que Dios ama y que necesita a Cristo", ["Como números", "Como rivales", "Como clientes"], "«el anhelo de mi corazón, y mi oración a Dios por Israel, es para salvación».", "Romanos 10:1"],
      ["m1-03", 1, "o1", "aplicar", "Quieres empezar a evangelizar a tus compañeros de trabajo. ¿Qué haces primero?", "Orar por cada uno por su nombre", ["Discutir con el más difícil", "Esperar a que se acerquen", "Repartir folletos sin conocerlos"], "«Exhorto ante todo, a que se hagan rogativas, oraciones, peticiones y acciones de gracias, por todos los hombres».", "1 Timoteo 2:1-4"],
      ["m1-04", 1, "o1", "recordar", "¿Qué hace el amor de Cristo, según 2 Corintios 5:14?", "Nos constriñe", ["Nos aleja", "Nos cansa", "Nos divide"], "«Porque el amor de Cristo nos constriñe».", "2 Corintios 5:14"],
      ["m1-05", 1, "o1", "analizar", "¿Para qué anotar las oportunidades que Dios da?", "Para ver cómo responde Dios a la oración y cómo respondiste tú", ["Para presumir", "Para llevar la cuenta de los que rechazan", "No tiene sentido"], "Anota las oportunidades que Dios te da y cómo respondiste.", "1 Timoteo 2:1-4"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué motivo para evangelizar es el más bíblico?", "El amor de Cristo por las personas", ["Ganar discusiones", "Cumplir una cuota", "Hacer crecer mi grupo"], "«Porque el amor de Cristo nos constriñe».", "2 Corintios 5:14"],
      ["m1-07", 2, "o2", "recordar", "¿Qué pasó con Cristo después de ser sepultado, según 1 Corintios 15:4?", "Resucitó al tercer día", ["Se apareció solo a los ángeles", "Permaneció en la tumba", "Subió al templo"], "«y que fue sepultado, y que resucitó al tercer día».", "1 Corintios 15:3-4"],
      ["m1-08", 2, "o2", "comprender", "¿Hay otro evangelio, según Gálatas 1:7?", "No: hay quienes quieren pervertir el evangelio de Cristo", ["Sí, hay varios", "Sí, uno para cada cultura", "Depende de la iglesia"], "«No que haya otro, sino que hay algunos que os perturban y quieren pervertir el evangelio de Cristo».", "Gálatas 1:6-7"],
      ["m1-09", 2, "o2", "aplicar", "Un predicador promete que, si das una ofrenda, Dios te sanará y te hará rico. ¿Qué distorsión es?", "La de la prosperidad", ["La de las obras", "La de un Jesús sin cruz", "Ninguna"], "Prometer dinero, salud o éxito seguros a cambio de la fe o de una ofrenda distorsiona el evangelio.", "Gálatas 1:6-7"],
      ["m1-10", 2, "o2", "recordar", "¿Qué dos cosas pide Jesús en Marcos 1:15?", "Arrepentirse y creer en el evangelio", ["Ayunar y orar", "Dar y recibir", "Callar y esperar"], "«arrepentíos, y creed en el evangelio».", "Marcos 1:15"],
      ["m1-11", 2, "o2", "analizar", "¿Qué tienen en común las cuatro distorsiones de la lección?", "Todas cambian el mensaje y quitan el centro: Cristo, la gracia y el arrepentimiento", ["Todas hablan demasiado de la cruz", "Todas son el mismo evangelio", "No tienen nada en común"], "«quieren pervertir el evangelio de Cristo».", "Gálatas 1:6-7"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué invitación al final de una conversación es más fiel?", "Arrepiéntete, cree en Cristo y síguelo", ["Repite esta oración y ya está", "Ven para que Dios te prospere", "Pórtate bien y Dios te aceptará"], "«el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo».", "Lucas 14:27"],
      ["m1-13", 3, "o3", "recordar", "¿Cuántos días de reposo discutió Pablo en la sinagoga de Tesalónica?", "Tres", ["Uno", "Siete", "Cuarenta"], "«por tres días de reposo discutió con ellos».", "Hechos 17:2-3"],
      ["m1-14", 3, "o3", "comprender", "¿Qué explicaba Pablo con las Escrituras en Tesalónica?", "Que era necesario que el Cristo padeciese y resucitase de los muertos", ["Que había que guardar el día de reposo", "Que Pablo era un profeta", "Que el templo sería destruido"], "«era necesario que el Cristo padeciese, y resucitase de los muertos».", "Hechos 17:2-3"],
      ["m1-15", 3, "o3", "aplicar", "Hablas con un vecino que nunca leyó la Biblia. ¿Cómo empiezas, según el ejemplo de Atenas?", "Por algo que él conoce, para llevarlo después a Cristo", ["Con una lista de versículos sin explicar", "Con una crítica a su vida", "Hablando de cosas que no entiende"], "«Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio».", "Hechos 17:22-23"],
      ["m1-16", 3, "o3", "recordar", "¿Dónde habló Pablo en Atenas, según Hechos 17:22?", "En medio del Areópago", ["En la sinagoga", "En el templo de Jerusalén", "En una cárcel"], "«Entonces Pablo, puesto en pie en medio del Areópago».", "Hechos 17:22-23"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué escuchar antes de hablar?", "Porque cada persona tiene una historia, y así se sabe por dónde empezar", ["Porque así no hace falta hablar de Cristo", "Para ganar la discusión", "No hace falta escuchar"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué evangelista aplica mejor 1 Corintios 9:22?", "Uno que adapta su lenguaje a cada persona y siempre anuncia a Cristo crucificado", ["Uno que cambia el mensaje para agradar", "Uno que habla igual a todos sin escuchar", "Uno que evita a los que piensan distinto"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Quién convocó a sus parientes y amigos para oír a Pedro?", "Cornelio", ["El carcelero de Filipos", "Felipe", "Natanael"], "«Y Cornelio los estaba esperando, habiendo convocado a sus parientes y amigos más íntimos».", "Hechos 10:24"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué la familia y los amigos son un campo misionero importante?", "Porque muchas personas llegan a Cristo por medio de alguien que conocen", ["Porque son fáciles de convencer", "Porque no hace falta orar por ellos", "No son importantes"], "«Vete a tu casa, a los tuyos».", "Marcos 5:19"],
      ["m2-03", 4, "o4", "aplicar", "Tu hermano no quiere hablar de Dios. ¿Qué haces?", "Seguir amándolo, orar por él y esperar con paciencia la oportunidad", ["Discutir hasta que acepte", "Dejar de hablarle", "Hablarle de Dios en cada conversación aunque no quiera"], "No presiones ni discutas: respeta su tiempo y sigue amándolo.", "Juan 1:45-46"],
      ["m2-04", 4, "o4", "recordar", "¿Qué hizo el carcelero después de oír la palabra?", "Les lavó las heridas, se bautizó con los suyos y les puso la mesa", ["Los volvió a encerrar", "Los denunció", "Huyó de la ciudad"], "«les lavó las heridas; y en seguida se bautizó él con todos los suyos».", "Hechos 16:31-34"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué Felipe invitó a Natanael en vez de discutir con él?", "Porque conocer a Jesús personalmente respondía mejor que una discusión", ["Porque no sabía qué decir", "Porque Natanael no le importaba", "Porque estaba enojado"], "«Le dijo Felipe: Ven y ve».", "Juan 1:45-46"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué plan para evangelizar a los amigos es mejor?", "Orar por cada uno, vivir lo que crees e invitarlos a una comida o a un estudio", ["Enviarles mensajes cada día hasta que acepten", "Criticar su forma de vivir", "Esperar a que ellos pregunten algún día"], "«Ven y ve».", "Juan 1:45-46"],
      ["m2-07", 5, "o5", "recordar", "¿Qué le pidió la iglesia al Señor ante las amenazas, según Hechos 4:29?", "Que mirara sus amenazas y les concediera hablar con denuedo", ["Que castigara a las autoridades", "Que los llevara a otra ciudad", "Que les diera riquezas"], "«Y ahora, Señor, mira sus amenazas, y concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
      ["m2-08", 5, "o5", "comprender", "¿Qué quiere decir hablar con denuedo?", "Hablar con valentía", ["Hablar con miedo", "Hablar con enojo", "No hablar"], "«que con denuedo hable de él, como debo hablar».", "Efesios 6:19-20"],
      ["m2-09", 5, "o5", "aplicar", "Antes de visitar a un amigo para hablarle de Cristo, ¿qué haces?", "Orar pidiendo denuedo, como la iglesia de Hechos 4", ["Preparar argumentos para ganarle", "Esperar a no tener miedo", "Pedirle a otro que vaya"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
      ["m2-10", 5, "o5", "recordar", "¿Cómo quería acabar Pablo su carrera, según Hechos 20:24?", "Con gozo", ["Con riquezas", "Con fama", "Con descanso"], "«con tal que acabe mi carrera con gozo».", "Hechos 20:24"],
      ["m2-11", 5, "o5", "analizar", "¿Qué relación hay entre la oración de Hechos 4 y lo que pasó después?", "Oraron pidiendo denuedo y fueron llenos del Espíritu Santo para hablar con valor", ["Oraron y se escondieron", "No oraron", "Oraron por venganza"], "«todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».", "Hechos 4:29-31"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué respuesta al miedo de evangelizar es más sana?", "Reconocerlo, orar por valentía y hablar con amor, confiando el fruto a Dios", ["Esperar a no sentir miedo nunca", "Fingir que no hay miedo", "Dejar el evangelismo a otros"], "«al abrir mi boca me sea dada palabra para dar a conocer con denuedo el misterio del evangelio».", "Efesios 6:19-20"],
      ["m2-13", 6, "o6", "recordar", "¿Cuántos envió Jesús en Lucas 10:1?", "Setenta", ["Doce", "Cien", "Tres"], "«designó el Señor también a otros setenta».", "Lucas 10:1-2"],
      ["m2-14", 6, "o6", "comprender", "¿Qué hizo Jesús al enviar a los setenta?", "Les dio instrucciones y les pidió orar por más obreros", ["Los dejó ir sin decirles nada", "Les prohibió hablar", "Los envió solos y sin rumbo"], "«rogad al Señor de la mies que envíe obreros a su mies».", "Lucas 10:1-2"],
      ["m2-15", 6, "o6", "aplicar", "¿Qué significa háganlo juntos en el plan para formar a otro?", "Preparar juntos su testimonio y el evangelio en pocas palabras", ["Hacerlo tú mientras la otra persona mira", "Que lo haga sola", "No hacer nada"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["m2-16", 6, "o6", "recordar", "¿Qué hacían los creyentes esparcidos por la persecución, según Hechos 8:4?", "Iban por todas partes anunciando el evangelio", ["Se escondían en silencio", "Volvían a Jerusalén", "Dejaban la fe"], "«los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
      ["m2-17", 6, "o6", "analizar", "¿Qué diferencia hay entre evangelizar y formar a otros para evangelizar?", "El que evangeliza alcanza a algunos; el que forma a otros multiplica la obra", ["No hay diferencia", "Formar a otros reemplaza el evangelizar", "Evangelizar es solo para pastores"], "«idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué muestra mejor que una persona ya está formada para evangelizar?", "Comparte su fe sola y empieza a formar a otra persona", ["Sabe de memoria muchos versículos", "Asiste a todas las reuniones", "Habla bien en público"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "evangelismo-misiones-1-e1",
      tipo: "corta",
      pregunta: "Explica qué mueve al evangelista y cómo empieza su trabajo, según 2 Corintios 5 y 1 Timoteo 2.",
      ideas: [
        { id: "amor", peso: 25, texto: "Lo mueve el amor de Cristo.", formas: ["amor de cristo", "constriñe", "amor de dios", "por amor"] },
        { id: "embajador", peso: 20, texto: "Es un embajador que ruega en nombre de Cristo.", formas: ["embajador*", "en nombre de cristo", "reconcili*", "enviado"] },
        { id: "carga", peso: 20, texto: "Siente carga por los perdidos.", formas: ["carga", "anhelo", "perdidos", "salvacion de"] },
        { id: "orar", peso: 25, texto: "Ora cada día por personas con nombre.", formas: ["ora por", "orar por", "orando", "oracion", "lista", "por nombre", "con nombre", "todos los hombres"] },
      ],
      citas: ["2 Corintios 5:14", "2 Corintios 5:20", "2 Corintios 5:14-20", "Romanos 10:1", "Romanos 9:1-3", "1 Timoteo 2:1-4", "1 Timoteo 2:4", "Proverbios 11:30"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Al evangelista lo mueve el amor de Cristo, que nos constriñe (2 Corintios 5:14). Es un embajador que ruega en nombre de Cristo que las personas se reconcilien con Dios, y siente carga por los perdidos, como Pablo. Empieza orando cada día por una lista de personas con nombre, porque Dios quiere que todos sean salvos.",
    },
    {
      id: "evangelismo-misiones-1-e2",
      tipo: "corta",
      pregunta: "Resume el evangelio y explica dos de sus distorsiones comunes.",
      ideas: [
        { id: "cristo", peso: 25, texto: "Cristo murió por nuestros pecados y resucitó.", formas: ["murio por", "resucit*", "la cruz", "crucificado"] },
        { id: "respuesta", peso: 15, texto: "Llama a arrepentirse y creer.", formas: ["arrepent*", "creer", "creed", "confiar"] },
        { id: "obras", peso: 20, texto: "Las obras: salvarse por portarse bien.", formas: ["obras", "portarse bien", "buena persona", "por gracia"] },
        { id: "prosperidad", peso: 20, texto: "La prosperidad: dinero o salud a cambio de la fe.", formas: ["prosperidad", "dinero", "riqueza", "ofrenda"] },
        { id: "sincruz", peso: 20, texto: "Un Jesús sin cruz.", formas: ["sin cruz", "vida mejor", "sin pecado"] },
        { id: "oracion", peso: 20, texto: "Una oración sin arrepentimiento.", formas: ["repetir", "repitio", "unas palabras", "levantar la mano", "solo una oracion"] },
      ],
      basta: 90,
      citas: ["1 Corintios 15:3-4", "1 Corintios 15:3", "Marcos 1:15", "Gálatas 1:6-7", "Gálatas 1:6-9", "Efesios 2:8-9", "Lucas 14:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El evangelio es que Cristo murió por nuestros pecados y resucitó al tercer día (1 Corintios 15:3-4), y llama a arrepentirse y creer. Una distorsión son las obras: decir que alguien se salva por portarse bien, cuando es por gracia. Otra es la prosperidad: prometer dinero o salud seguros a cambio de la fe o de una ofrenda.",
    },
    {
      id: "evangelismo-misiones-1-e3",
      tipo: "corta",
      pregunta: "Explica cómo adaptó Pablo su manera de anunciar a Cristo en Tesalónica y en Atenas, y qué no cambió.",
      ideas: [
        { id: "tesalonica", peso: 25, texto: "Con los judíos partió de las Escrituras.", formas: ["escrituras", "sinagoga", "judios"] },
        { id: "atenas", peso: 25, texto: "En Atenas partió del altar al Dios no conocido.", formas: ["altar", "dios no conocido", "areopago", "atenienses", "griegos"] },
        { id: "adapta", peso: 20, texto: "Se hizo de todo para salvar a algunos: cambió el punto de partida.", formas: ["de todo", "punto de partida", "adapt*", "lenguaje"] },
        { id: "nocambia", peso: 20, texto: "No cambió el evangelio: Cristo crucificado y resucitado.", formas: ["no cambi*", "el mismo mensaje", "el mismo evangelio", "crucificado", "resucit*"], negativa: true },
      ],
      citas: ["Hechos 17:2-3", "Hechos 17:22-23", "Hechos 17:22-31", "1 Corintios 9:22", "1 Corintios 9:19-22", "1 Corintios 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la sinagoga de Tesalónica, Pablo partió de las Escrituras para mostrar que el Cristo debía padecer y resucitar. En Atenas, ante quienes no conocían la Biblia, partió de un altar al Dios no conocido. Se hizo de todo para salvar a algunos (1 Corintios 9:22): cambió el punto de partida, pero no cambió el evangelio.",
    },
    {
      id: "evangelismo-misiones-1-e4",
      tipo: "breve",
      pregunta:
        "Elige a una persona de tu familia o de tus amigos que no conoce a Cristo, sin dar su nombre, y escribe tu plan para compartirle el evangelio: cómo orarás, cómo vivirás tu fe delante de ella, cómo le hablarás según su historia, qué le dirás del evangelio y cómo la invitarás. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "orar", peso: 20, texto: "Cómo orará por ella.", formas: ["orare", "orar", "oracion", "orando", "pedire a dios"] },
        { id: "vida", peso: 20, texto: "Vivir la fe delante de ella.", formas: ["vivir", "vivire", "mi vida", "ejemplo", "testimonio"] },
        { id: "historia", peso: 20, texto: "Hablarle según su historia, escuchándola.", formas: ["escuch*", "su historia", "sus preguntas", "lo que conoce", "punto de partida"] },
        { id: "evangelio", peso: 20, texto: "El evangelio: Cristo murió y resucitó; arrepentirse y creer.", formas: ["murio por", "resucit*", "arrepent*", "la cruz", "por gracia"] },
        { id: "invitar", peso: 20, texto: "Cómo la invitará.", formas: ["invit*", "ven y ve", "comida", "estudio"] },
      ],
      basta: 85,
      citas: ["1 Timoteo 2:1-4", "1 Timoteo 2:4", "2 Corintios 5:14", "2 Corintios 5:20", "1 Corintios 15:3-4", "Marcos 1:15", "Hechos 17:22-23", "1 Corintios 9:22", "Marcos 5:19", "Hechos 10:24", "Hechos 16:31-34", "Juan 1:45-46", "Juan 1:46", "Hechos 4:29-31", "Proverbios 11:30"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Pienso en mi tío, que dejó de creer después de una enfermedad en la familia. Primero voy a orar por él cada mañana, pidiendo que Dios abra su corazón y me dé valentía, porque Dios quiere que todos sean salvos (1 Timoteo 2:4). Delante de él viviré mi fe con paciencia y servicio: lo visitaré, lo ayudaré en lo que necesite y no discutiré con él. Cuando hablemos, primero escucharé su historia y sus preguntas sobre el dolor, sin respuestas fáciles, y partiré de lo que él ya conoce, como hizo Pablo en Atenas. Le contaré lo que Cristo hizo conmigo y le explicaré que Cristo murió por nuestros pecados y resucitó, y que Dios nos llama a arrepentirnos y creer. Después lo invitaré a una comida en casa con mi familia y, si quiere, a leer juntos el Evangelio de Juan, como Felipe, que invitó a su amigo diciendo: Ven y ve (Juan 1:46). Seguiré orando por él y respetando su tiempo.",
    },
    {
      id: "evangelismo-misiones-1-e5",
      tipo: "breve",
      pregunta:
        "Un compañero de tu iglesia dice que no evangeliza porque le da miedo y porque cree que eso es solo para los pastores. Escríbele una respuesta con base bíblica: qué mueve al evangelista, por qué todos los creyentes son testigos y cómo enfrentar el miedo. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "amor", peso: 20, texto: "Lo que mueve: el amor de Cristo; somos embajadores.", formas: ["amor de cristo", "constriñe", "embajador*", "por amor"] },
        { id: "todos", peso: 25, texto: "Todos los creyentes son testigos.", formas: ["esparcidos", "todos los creyentes", "cada creyente", "no solo para los pastores", "no solo los pastores", "testigos"] },
        { id: "oracion", peso: 20, texto: "Orar pidiendo denuedo, como en Hechos 4.", formas: ["denuedo", "orar", "oracion", "oremos", "oro"] },
        { id: "miedo", peso: 20, texto: "Enfrentar los temores con la verdad: el fruto lo da Dios.", formas: ["el fruto", "rechaz*", "valentia", "valor"] },
        { id: "acompanar", peso: 15, texto: "Empezar acompañado, de dos en dos.", formas: ["dos en dos", "acompañ*", "juntos", "conmigo"] },
      ],
      basta: 85,
      citas: ["Hechos 8:4", "2 Corintios 5:14", "2 Corintios 5:20", "2 Corintios 5:14-20", "Hechos 4:29-31", "Efesios 6:19-20", "Hechos 20:24", "Lucas 10:1-2", "Lucas 10:1", "2 Timoteo 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Te entiendo: a mí también me da miedo. Pero evangelizar no es solo para los pastores. Cuando la iglesia de Jerusalén fue esparcida, los que fueron esparcidos iban por todas partes anunciando el evangelio (Hechos 8:4): cada creyente era un testigo. Lo que nos mueve no es una obligación, sino el amor de Cristo, que nos constriñe, y somos embajadores en su nombre (2 Corintios 5:14-20). El miedo es real, pero tiene respuesta: la iglesia de Hechos 4, amenazada, oró pidiendo denuedo, y todos fueron llenos del Espíritu Santo y hablaban la palabra con valor (Hechos 4:29-31). Aun Pablo pedía oración para hablar con valentía. Recuerda también que muchas veces rechazan el mensaje y no a ti, y que el fruto lo da Dios. Te propongo algo: oremos juntos cada semana por tres personas, y la próxima vez que yo comparta mi fe, acompáñame, como Jesús envió a los suyos de dos en dos. Después lo harás tú y yo te acompañaré.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras)
  breve: {
    id: "evangelismo-misiones-1-b1",
    tipo: "breve",
    pregunta:
      "Diseña un plan de seis semanas para formar a otro creyente en el evangelismo personal: a quién escogerías, qué harían cada semana, cómo practicarían juntos y cómo sabrás que ya puede formar a otros. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "escoger", peso: 20, texto: "A quién escogería: alguien fiel y disponible.", formas: ["fiel", "disponible", "escog*", "elegir", "elegiria"] },
      { id: "mostrar", peso: 20, texto: "Mostrarle: que lo acompañe.", formas: ["acompañ*", "conmigo", "mostrar*", "observ*"] },
      { id: "juntos", peso: 20, texto: "Preparar y practicar juntos el testimonio y el evangelio.", formas: ["juntos", "testimonio", "pocas palabras", "preparar*", "practic*"] },
      { id: "dejar", peso: 20, texto: "Dejarlo hacerlo, evaluar y celebrar.", formas: ["que hable", "lo haga", "dejar*", "evalu*", "celebr*"] },
      { id: "multiplicar", peso: 20, texto: "Que forme a otro.", formas: ["formar a otr*", "forme a otr*", "enseñar a otro*", "multiplic*", "otra persona"] },
    ],
    basta: 85,
    citas: ["2 Timoteo 2:2", "Lucas 10:1-2", "Lucas 10:1", "Hechos 8:4", "Lucas 15:7", "Marcos 3:14", "1 Timoteo 2:1-4"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogería a Andrés, un joven de mi grupo que es fiel y está disponible, porque Pablo pide encargar la obra a hombres fieles que sean idóneos para enseñar también a otros (2 Timoteo 2:2). Semana 1: oraríamos juntos por una lista de personas y le contaría por qué evangelizo. Semana 2: lo invitaría a acompañarme cuando comparto mi fe, para que observe, como Jesús envió a los suyos de dos en dos (Lucas 10:1). Semana 3: prepararíamos juntos su testimonio en tres partes y el evangelio en pocas palabras, y practicaríamos entre nosotros. Semana 4: saldríamos juntos; él contaría su testimonio y yo explicaría el evangelio. Semana 5: dejaría que él hable y yo solo lo acompañaría; después evaluaríamos lo que pasó y celebraríamos lo que Dios hizo, porque hay gozo en el cielo por un pecador que se arrepiente (Lucas 15:7). Semana 6: le pediría que escoja a otra persona para formarla. Sabré que ya puede formar a otros cuando comparta su fe sin mí y empiece a enseñar a otro creyente.",
  },
};
