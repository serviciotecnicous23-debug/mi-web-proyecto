/**
 * El banco de «Métodos para enseñar a niños» (especialidad Niñez, materia 3). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 las siete leyes de la enseñanza · o2 contar historias bíblicas · o3 preguntas, actividades y juegos · o4 una
 * clase paso a paso · o5 la disciplina con amor y firmeza · o6 la vida y la semana del maestro · o7 el versículo de memoria
 * (Nehemías 8:8). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos,
 * y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `ninez-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_NINEZ_3: BancoMateria = {
  materia: "ninez-3",
  repaso: {
    "ninez-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Para qué había preparado Esdras su corazón, según Esdras 7:10?", "Para inquirir la ley de Jehová, cumplirla y enseñarla en Israel", ["Para gobernar Israel", "Para construir el templo", "Para hacerse rico"], "«Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos».", "Esdras 7:10"],
      ["1-r2", 1, "o1", "comprender", "¿Qué dice la ley de la lección de John Milton Gregory?", "Que se enseña de lo conocido a lo desconocido", ["Que se enseña de lo difícil a lo fácil", "Que la lección debe ser larga", "Que no se repasa"], "Por ejemplo, se parte de un vecino que ayuda para llegar al prójimo de la parábola; así se busca que entiendan, como en Israel: «ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["1-r3", 1, "o1", "aplicar", "Un maestro habla toda la hora y los niños no le prestan atención. ¿Qué ley de la enseñanza olvida?", "La del alumno: el alumno aprende cuando presta atención con interés", ["La del maestro", "La del repaso", "Ninguna"], "Hay que ganar la atención, por ejemplo con una pregunta al empezar, porque la meta es que entiendan: «de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ] as P[]).map(p),
    "ninez-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo les hablaba Jesús a las multitudes, según Marcos 4:34?", "Sin parábolas no les hablaba", ["Solo con leyes", "Solo con milagros", "En secreto"], "«Y sin parábolas no les hablaba; aunque a sus discípulos en particular les declaraba todo».", "Marcos 4:33-34"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es la verdad central de una historia bíblica?", "Lo que la historia enseña acerca de Dios", ["El detalle más gracioso", "La parte más larga", "El nombre del personaje"], "La historia lleva a Dios y a Jesús, como la de Zaqueo: «Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
      ["2-r3", 2, "o2", "aplicar", "Una maestra quiere hacer más emocionante la historia de Zaqueo inventando que Jesús lo bajó del árbol con una cuerda. ¿Qué le aconsejas?", "Contarla con fidelidad, sin cambiar los hechos de la Biblia", ["Que lo haga si así se divierten", "Que agregue más detalles inventados", "Que no cuente la historia"], "La Biblia dice que Jesús le dijo: «Zaqueo, date prisa, desciende», y que él «descendió aprisa».", "Lucas 19:1-10"],
    ] as P[]).map(p),
    "ninez-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué les preguntó Jesús a sus discípulos, según Mateo 16:15?", "¿Quién decís que soy yo?", ["¿Qué comeremos?", "¿Adónde iremos?", "¿Quién es el mayor?"], "«El les dijo: Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15-16"],
      ["3-r2", 3, "o3", "comprender", "¿Para qué sirven las preguntas de aplicación en una clase de niños?", "Para llevar la verdad de la historia a la vida del niño", ["Para recordar nombres", "Para ganar puntos", "Para terminar la clase"], "Jesús terminó la parábola con una tarea: «Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
      ["3-r3", 3, "o3", "aplicar", "Tienes que elegir una actividad para niños de cuatro años. ¿Cuál eliges?", "Una canción con gestos o una manualidad sencilla", ["Un debate", "Una lectura larga", "Un examen escrito"], "Los niños aprenden haciendo: «Pero sed hacedores de la palabra, y no tan solamente oidores».", "Santiago 1:22"],
    ] as P[]).map(p),
    "ninez-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pasa cuando encomendamos a Jehová nuestras obras, según Proverbios 16:3?", "Nuestros pensamientos serán afirmados", ["Todo saldrá fácil", "Ya no hará falta preparar", "Nada"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
      ["4-r2", 4, "o4", "comprender", "¿Qué tres partes tiene un buen objetivo de clase?", "Qué sabrán, qué sentirán y qué harán los niños", ["Cuánto durará, quién vendrá y qué se comerá", "Solo qué memorizarán", "Solo qué juego habrá"], "Así la clase busca a toda la persona, y se prepara como un servicio: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
      ["4-r3", 4, "o4", "aplicar", "Una maestra prepara su clase el sábado por la noche y siempre le falta algo. ¿Qué le aconsejas?", "Preparar durante la semana, con oración, y tener un plan para lo inesperado", ["Improvisar del todo", "Dejar de enseñar", "Repetir la clase anterior"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
    ] as P[]).map(p),
    "ninez-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué quita la ira, según Proverbios 15:1?", "La blanda respuesta", ["El grito", "El castigo", "El silencio"], "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué conviene decir las reglas de la clase en positivo?", "Porque le dicen al niño lo que sí debe hacer, como escuchar cuando otro habla", ["Porque así no hay reglas", "Porque los niños no entienden la palabra no", "Porque son más largas"], "Prevenir con reglas claras evita corregir con dureza: «La blanda respuesta quita la ira».", "Proverbios 15:1"],
      ["5-r3", 5, "o5", "aplicar", "Un niño interrumpe la historia una y otra vez. ¿Qué haces primero?", "Te acercas con calma y le hablas en voz baja, sin humillarlo, y le recuerdas la regla con una opción", ["Le gritas delante de todos", "Lo mandas solo a otro cuarto", "No le dices nada nunca"], "El maestro corrige sin desanimar: «no exasperéis a vuestros hijos, para que no se desalienten».", "Colosenses 3:21"],
    ] as P[]).map(p),
    "ninez-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pidió Pablo en 1 Corintios 11:1?", "Que lo imitaran a él, así como él imitaba a Cristo", ["Que escucharan a los sabios", "Que no lo imitaran", "Que imitaran a los reyes"], "«Sed imitadores de mí, así como yo de Cristo».", "1 Corintios 11:1"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué la vida del maestro también enseña?", "Porque los niños aprenden más de lo que ven que de lo que escuchan", ["Porque los niños no escuchan", "Porque la lección no importa", "No enseña"], "«presentándote tú en todo como ejemplo de buenas obras».", "Tito 2:7"],
      ["6-r3", 6, "o6", "aplicar", "Una maestra sirve todos los domingos desde hace dos años y ya no va al culto de los adultos. ¿Qué haces?", "Organizar turnos para que rote, descanse y pueda estar en el culto", ["Pedirle que siga igual", "Darle más clases", "Reemplazarla sin hablar con ella"], "El maestro cuida almas «como quienes han de dar cuenta», y lo hace mejor con alegría; un maestro agotado enseña peor.", "Hebreos 13:17"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Las siete leyes de la enseñanza
    ["f01", 1, "o1", "recordar", "¿Cómo leían la ley en tiempos de Nehemías, según Nehemías 8:8?", "Claramente, y poniendo el sentido para que entendieran", ["Rápido, para terminar pronto", "En voz baja", "Sin explicar nada"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f02", 1, "o1", "recordar", "¿A quiénes debía encargar Timoteo lo que oyó de Pablo, según 2 Timoteo 2:2?", "A hombres fieles que fueran idóneos para enseñar también a otros", ["A los gobernantes", "A los más ricos", "A nadie"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f03", 1, "o1", "comprender", "¿Qué dice la ley del maestro de Gregory?", "Que el maestro conoce bien lo que va a enseñar", ["Que el maestro debe hablar fuerte", "Que el maestro no necesita prepararse", "Que el maestro debe ser joven"], "Esdras primero estudió: «había preparado su corazón para inquirir la ley de Jehová».", "Esdras 7:10"],
    ["f04", 1, "o1", "comprender", "¿Qué dice la ley del lenguaje de Gregory?", "Que se usan palabras que el alumno entiende", ["Que se usan palabras difíciles para impresionar", "Que se habla en otro idioma", "Que no se habla"], "En Israel «ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f05", 1, "o1", "analizar", "¿Por qué es mejor preguntar qué habrían hecho los niños que darles la respuesta?", "Porque despierta su mente para que piensen por sí mismos, como pide la ley del proceso de enseñar", ["Porque así la clase dura más", "Porque el maestro no sabe la respuesta", "Porque los niños prefieren no pensar"], "La meta es que entiendan, no solo que oigan: «de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f06", 1, "o1", "evaluar", "¿Qué clase cumple mejor la ley del repaso y la aplicación?", "La que repasa lo aprendido y termina pensando a quién ayudar esta semana", ["La que nunca repasa", "La que termina sin aplicación", "La que solo repasa nombres"], "Esdras enseñaba la ley para que se cumpliera: «para inquirir la ley de Jehová y para cumplirla».", "Esdras 7:10"],
    ["f07", 1, "o1", "aplicar", "Un maestro va a enseñar la parábola del buen samaritano. ¿Cómo aplica la ley de la lección?", "Parte de algo conocido, como un vecino que ayuda, para llegar a lo nuevo: el prójimo es también el que es diferente", ["Empieza por el contexto histórico más difícil", "Lee el pasaje sin explicar nada", "Salta directo a la tarea"], "Se va de lo conocido a lo desconocido para que entiendan: «ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f08", 1, "o1", "aplicar", "Una maestra usa palabras como levita y samaritano sin explicarlas. ¿Qué ley olvida?", "La del lenguaje", ["La del maestro", "La del alumno", "Ninguna"], "Hay que explicar las palabras difíciles, como hacían en Israel: «y ponían el sentido».", "Nehemías 8:8"],
    ["f09", 1, "o1", "aplicar", "Un líder quiere que los maestros jóvenes aprendan de los que tienen más experiencia. ¿Qué principio aplica?", "Formar a otros que enseñen, como pidió Pablo a Timoteo", ["Que cada uno aprenda solo", "Que los jóvenes no enseñen", "Que solo enseñe el pastor"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f10", 1, "o7", "recordar", "Completa Nehemías 8:8: Y leían en el libro de la ley de Dios claramente…", "y ponían el sentido, de modo que entendiesen la lectura", ["y terminaban antes del mediodía", "y nadie preguntaba nada", "y la guardaban en el templo"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    // Lección 2 · Contar historias bíblicas
    ["f11", 2, "o2", "recordar", "¿Quién era Zaqueo, según Lucas 19:2?", "Un jefe de los publicanos, y rico", ["Un pescador", "Un sacerdote", "Un soldado romano"], "«Y sucedió que un varón llamado Zaqueo, que era jefe de los publicanos, y rico».", "Lucas 19:1-10"],
    ["f12", 2, "o2", "recordar", "¿Qué dice el salmista de las cosas antiguas, según Salmos 78:3?", "Que las habían oído y entendido, y que sus padres se las contaron", ["Que las habían olvidado", "Que eran secretos", "Que no importaban"], "«Las cuales hemos oído y entendido; Que nuestros padres nos las contaron».", "Salmos 78:2-3"],
    ["f13", 2, "o2", "comprender", "¿Por qué el maestro lee el pasaje en la Biblia, y no solo en un libro de historias?", "Para contar la historia con fidelidad y encontrar su verdad central", ["Porque los libros de historias están prohibidos", "Para alargar la clase", "No hace falta leerlo"], "La historia de la Biblia lleva a Jesús: «Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
    ["f14", 2, "o2", "comprender", "¿Qué orden ayuda a contar una historia?", "Un comienzo que atrapa, un problema, un momento de tensión y un final", ["El final primero y nada más", "Solo una lista de datos", "Ningún orden"], "Así se cuentan las historias que pasan de padres a hijos: «Que nuestros padres nos las contaron».", "Salmos 78:2-3"],
    ["f15", 2, "o2", "analizar", "¿Por qué no conviene convertir cada historia bíblica en una regla moral?", "Porque la historia muestra primero a Dios, y no solo una lección de buena conducta", ["Porque la Biblia no enseña moral", "Porque los niños no deben obedecer", "Porque las reglas no importan"], "La historia de Zaqueo termina en Jesús, que vino «a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
    ["f16", 2, "o2", "aplicar", "Tienes que empezar la historia de Zaqueo. ¿Qué comienzo atrapa a los niños?", "Preguntarles si alguna vez no pudieron ver algo porque había mucha gente delante", ["Leerles una lista de fechas", "Pedirles que copien el pasaje", "Empezar por el final"], "Zaqueo «procuraba ver quién era Jesús; pero no podía a causa de la multitud, pues era pequeño de estatura».", "Lucas 19:1-10"],
    ["f17", 2, "o2", "aplicar", "Un maestro lee la historia mirando el papel todo el tiempo. ¿Qué le aconsejas?", "Ensayarla antes en voz alta, para contarla mirando a los niños", ["Leerla más rápido", "No contarla", "Pedirle a otro que la lea"], "Jesús hablaba con historias que la gente podía seguir: «les hablaba la palabra, conforme a lo que podían oír».", "Marcos 4:33-34"],
    ["f18", 2, "o2", "aplicar", "Una maestra quiere ayudar a los niños a imaginar el árbol de Zaqueo. ¿Qué apoyo visual usa?", "Una imagen o un dibujo sencillo de un árbol sicómoro", ["Una película de dos horas", "Ninguno", "Un libro de ciencias"], "Zaqueo «subió a un árbol sicómoro para verle».", "Lucas 19:1-10"],
    ["f19", 2, "o2", "evaluar", "¿Qué final es el mejor para la historia de Zaqueo?", "Que Jesús vino a buscar y a salvar lo perdido, y que conoce a cada niño por su nombre", ["Que Zaqueo era bajito", "Que hay que trepar a los árboles", "Que los ricos son malos"], "La Biblia lo dice: «Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
    ["f20", 2, "o2", "comprender", "¿Qué muestra Marcos 4:33 sobre la manera de enseñar de Jesús?", "Que adaptaba sus historias a lo que la gente podía oír", ["Que hablaba sin pensar en la gente", "Que solo hablaba a los sabios", "Que no usaba historias"], "«Con muchas parábolas como estas les hablaba la palabra, conforme a lo que podían oír».", "Marcos 4:33-34"],
    // Lección 3 · Preguntas, actividades y juegos
    ["f21", 3, "o3", "recordar", "¿Qué respondió Pedro a la pregunta de Jesús, según Mateo 16:16?", "Tú eres el Cristo, el Hijo del Dios viviente", ["Eres un profeta más", "No lo sé", "Eres Juan el Bautista"], "«Respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente».", "Mateo 16:15-16"],
    ["f22", 3, "o3", "recordar", "¿Qué le dijo Jesús al intérprete de la ley al final de la parábola, según Lucas 10:37?", "Ve, y haz tú lo mismo", ["Quédate y piensa", "No hagas nada", "Ve y cuéntalo a todos"], "«Entonces Jesús le dijo: Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
    ["f23", 3, "o3", "comprender", "¿Qué ayuda a hacer una pregunta de comprensión?", "A pensar por qué pasó algo y qué enseña de Dios", ["A recordar nombres", "A ganar un concurso", "A terminar rápido"], "Jesús hacía pensar con preguntas, como cuando preguntó: «¿Quién, pues, de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones?».", "Lucas 10:36-37"],
    ["f24", 3, "o3", "comprender", "¿Qué pide Santiago 1:22?", "Ser hacedores de la palabra, y no solo oidores", ["Solo escuchar", "Solo memorizar", "Solo enseñar"], "«Pero sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos».", "Santiago 1:22"],
    ["f25", 3, "o3", "analizar", "¿Por qué son mejores los equipos pequeños en un juego de repaso?", "Porque todos participan y nadie queda expuesto", ["Porque así gana siempre el mismo", "Porque no hace falta preparar", "Porque los niños no se conocen"], "El juego sirve para hacer y no solo oír: «Pero sed hacedores de la palabra».", "Santiago 1:22"],
    ["f26", 3, "o3", "aplicar", "Tienes que preparar cinco preguntas para un juego de repaso. ¿Cómo las repartes?", "Dos de memoria, dos de comprensión y una de aplicación", ["Cinco de memoria", "Cinco de aplicación", "Ninguna de aplicación"], "La última lleva a la vida, como hizo Jesús: «Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
    ["f27", 3, "o3", "aplicar", "Un grupo de preadolescentes se aburre con las canciones de gestos. ¿Qué actividad les propones?", "Una conversación con preguntas abiertas o un proyecto de servicio", ["Más canciones de gestos", "Colorear un dibujo", "Una siesta"], "Cada edad aprende haciendo lo que le corresponde: «sed hacedores de la palabra».", "Santiago 1:22"],
    ["f28", 3, "o3", "aplicar", "Un niño responde mal en un juego de repaso, y los demás se ríen. ¿Qué haces?", "Corregir con cariño, frenar las burlas y celebrar que se animó a responder", ["Reírte con ellos", "Sacarlo del juego", "No decir nada"], "Jesús usaba las preguntas para que todos pensaran y respondieran, como cuando preguntó: «¿quién decís que soy yo?».", "Mateo 16:15-16"],
    ["f29", 3, "o3", "evaluar", "¿Qué juego de repaso cumple mejor su tarea?", "El que repasa la verdad central y termina con una pregunta de aplicación", ["El que solo tiene un ganador", "El que no tiene relación con la clase", "El más ruidoso"], "El juego es una herramienta para ser hacedores de la palabra: «Pero sed hacedores de la palabra, y no tan solamente oidores».", "Santiago 1:22"],
    ["f30", 3, "o3", "comprender", "¿Qué actividades convienen a los niños escolares?", "Dramatizaciones, juegos de repaso, mapas y trabajos en grupo", ["Solo conferencias", "Solo descansar", "Solo exámenes"], "Los escolares aprenden haciendo: «Pero sed hacedores de la palabra».", "Santiago 1:22"],
    // Lección 4 · Una clase paso a paso
    ["f31", 4, "o4", "recordar", "¿Cómo debe hacerse todo, según Colosenses 3:23?", "De corazón, como para el Señor y no para los hombres", ["Rápido y sin cuidado", "Para que nos vean", "Solo cuando hay ganas"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f32", 4, "o4", "recordar", "¿Qué hay que encomendar a Jehová, según Proverbios 16:3?", "Nuestras obras", ["Solo nuestros problemas", "Nada", "Las obras de otros"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
    ["f33", 4, "o4", "comprender", "¿Qué parte de la clase busca que el niño piense qué hará esta semana?", "El versículo y la aplicación", ["La bienvenida", "La alabanza", "El registro de llegada"], "La clase lleva a la vida, y se prepara como un servicio: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f34", 4, "o4", "comprender", "¿Por qué el cierre de la clase incluye entregar a cada niño a quien lo trajo?", "Para cuidar su seguridad al terminar la clase", ["Para cobrar la clase", "Para que no vuelva", "No hace falta"], "Todo se hace con cuidado y como servicio a Cristo: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f35", 4, "o4", "analizar", "¿Por qué el horario de la clase es una guía y no una ley?", "Porque se adapta a la edad y a lo que pasa en la clase", ["Porque no sirve", "Porque los niños deciden todo", "Porque no hay que planificar"], "Se planifica con oración y se deja que Dios dirija: «Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
    ["f36", 4, "o4", "aplicar", "Tienes que escribir el objetivo de una clase sobre Zaqueo. ¿Cuál escribes?", "Que cuenten cómo Jesús lo llamó por su nombre, que se sepan amados y que saluden a un compañero que está solo", ["Que se porten bien", "Que memoricen diez versículos", "Que terminen la manualidad"], "Un objetivo de tres partes, saber, sentir y hacer, busca a toda la persona, y la clase se prepara como un servicio: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f37", 4, "o4", "aplicar", "Un niño nuevo llega a la mitad de la clase y no conoce a nadie. ¿Qué haces?", "Lo recibes por su nombre, lo presentas y le das un lugar en la actividad", ["Lo dejas sentado solo", "Le pides que vuelva otro día", "Sigues como si nada"], "Para lo inesperado se tiene un plan, y todo se hace «como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f38", 4, "o4", "aplicar", "Tu actividad terminó quince minutos antes de lo previsto. ¿Qué haces?", "Usar un plan para lo inesperado, como un juego de repaso o un canto", ["Dejar a los niños sin hacer nada", "Terminar la clase antes", "Repetir la misma actividad"], "Se prepara con tiempo y con oración: «Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
    ["f39", 4, "o4", "evaluar", "¿Qué plan de clase es el más completo?", "Bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre", ["Solo una historia larga", "Solo juegos", "Solo canciones"], "Una clase completa sirve a toda la persona y se hace con excelencia: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f40", 4, "o4", "comprender", "¿Por qué con los más pequeños conviene cambiar de actividad más a menudo?", "Porque su atención dura menos que la de los mayores", ["Porque no aprenden nada", "Porque no les gusta la Biblia", "Porque así la clase es más corta"], "La clase se adapta a la edad, como pide la ley del alumno, y se prepara con oración: «Encomienda a Jehová tus obras».", "Proverbios 16:3"],
    // Lección 5 · La disciplina y el manejo de la clase
    ["f41", 5, "o5", "recordar", "¿Qué hace subir el furor, según Proverbios 15:1?", "La palabra áspera", ["La blanda respuesta", "El silencio", "La oración"], "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
    ["f42", 5, "o5", "recordar", "¿Qué les pide Pablo a los padres en Colosenses 3:21?", "Que no exasperen a sus hijos, para que no se desalienten", ["Que los dejen hacer lo que quieran", "Que los castiguen siempre", "Que no les hablen"], "«Padres, no exasperéis a vuestros hijos, para que no se desalienten».", "Colosenses 3:21"],
    ["f43", 5, "o5", "comprender", "¿Por qué la disciplina empieza en el corazón del maestro?", "Porque necesita el fruto del Espíritu, como la paciencia y la mansedumbre", ["Porque los niños no importan", "Porque el maestro debe ser duro", "Porque no hay que corregir"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza».", "Gálatas 5:22-23"],
    ["f44", 5, "o5", "comprender", "¿Qué ayuda a prevenir el desorden en la clase?", "Pocas reglas claras, rutinas, una clase activa y atención positiva", ["Muchas reglas sin explicar", "Gritar al comienzo", "Una clase aburrida"], "Prevenir evita la dureza: «La blanda respuesta quita la ira».", "Proverbios 15:1"],
    ["f45", 5, "o5", "analizar", "¿Por qué no se humilla a un niño delante de los demás al corregirlo?", "Porque lo desanima y no lo ayuda a cambiar", ["Porque los demás nunca deben enterarse de nada", "Porque los niños no se equivocan", "Porque así el maestro descansa"], "«no exasperéis a vuestros hijos, para que no se desalienten».", "Colosenses 3:21"],
    ["f46", 5, "o5", "aplicar", "Un niño sigue interrumpiendo después de que le recordaste la regla. ¿Qué haces?", "Aplicas una consecuencia breve que ya conoce, como esperar un turno del juego", ["Le pegas en la mano", "Lo encierras en otro cuarto", "Lo mandas solo al pasillo"], "La firmeza va con amor y respeto: el amor «no se irrita, no guarda rencor».", "1 Corintios 13:4-5"],
    ["f47", 5, "o5", "aplicar", "Un niño de tu clase pelea cada semana. ¿Qué haces, además de corregirlo en la clase?", "Conversar con sus padres para entender qué le pasa", ["Prohibirle que venga", "Contarlo a toda la iglesia", "No hacer nada"], "El maestro corrige sin desanimar, «para que no se desalienten», y busca entender al niño.", "Colosenses 3:21"],
    ["f48", 5, "o5", "aplicar", "Una maestra quiere castigar a un niño dejándolo solo en un pasillo. ¿Qué le dices?", "Que nunca se deja a un niño fuera de la vista de un adulto como castigo", ["Que es una buena idea", "Que lo deje solo menos tiempo", "Que lo deje en el baño"], "La disciplina siempre va junto con la protección, y el amor «es sufrido, es benigno».", "1 Corintios 13:4-5"],
    ["f49", 5, "o5", "evaluar", "¿Qué manera de corregir es la mejor?", "Acercarse con calma, recordar la regla con una opción y hablar con el niño después", ["Gritar para que todos escuchen", "Burlarse para que aprenda", "No decirle nunca nada"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
    ["f50", 5, "o5", "comprender", "¿Qué significa en la clase que el amor no guarda rencor?", "Que el niño que se portó mal empieza de nuevo la semana siguiente", ["Que no hay reglas", "Que nunca se corrige", "Que se le recuerda siempre lo que hizo"], "«no se irrita, no guarda rencor».", "1 Corintios 13:4-5"],
    // Lección 6 · El maestro y su vida
    ["f51", 6, "o6", "recordar", "¿Cómo le pidió Pablo a Tito que fuera, según Tito 2:7?", "Ejemplo de buenas obras, mostrando en la enseñanza integridad y seriedad", ["Famoso", "Rico", "Severo y lejano"], "«presentándote tú en todo como ejemplo de buenas obras; en la enseñanza mostrando integridad, seriedad».", "Tito 2:7"],
    ["f52", 6, "o6", "recordar", "¿Cómo velan los pastores por las almas, según Hebreos 13:17?", "Como quienes han de dar cuenta", ["Como dueños", "Sin responsabilidad", "Como jueces"], "«porque ellos velan por vuestras almas, como quienes han de dar cuenta».", "Hebreos 13:17"],
    ["f53", 6, "o6", "comprender", "¿Qué hace el maestro el domingo después de la clase, en su semana de preparación?", "Anota cómo salió la clase y ora por cada niño por su nombre", ["Nada hasta el sábado", "Se olvida de la clase", "Prepara solo la manualidad"], "Cuida a los niños como quien dará cuenta de ellos: «como quienes han de dar cuenta».", "Hebreos 13:17"],
    ["f54", 6, "o6", "comprender", "¿Para qué se reúnen los maestros una vez al mes?", "Para aprender y evaluar juntos", ["Para quejarse", "Para competir", "No hace falta reunirse"], "El ministerio forma a otros que enseñen, como pidió Pablo: «que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f55", 6, "o6", "analizar", "¿Por qué los niños recuerdan a su maestro más que sus lecciones?", "Porque aprenden de lo que ven: su amor, su ejemplo y su coherencia", ["Porque las lecciones no sirven", "Porque los niños no escuchan", "Porque el maestro es gracioso"], "«Sed imitadores de mí, así como yo de Cristo».", "1 Corintios 11:1"],
    ["f56", 6, "o6", "aplicar", "Un maestro nuevo quiere empezar a servir este domingo sin pasar por ningún proceso. ¿Qué haces?", "Le pides que primero pase por la selección y la capacitación de protección de menores", ["Lo pones a enseñar enseguida", "Lo dejas solo con los niños para probarlo", "Le dices que no hace falta"], "Cuidar a los niños es dar cuenta delante de Dios: «como quienes han de dar cuenta».", "Hebreos 13:17"],
    ["f57", 6, "o6", "aplicar", "Un niño faltó tres domingos seguidos. ¿Qué haces durante la semana?", "Llamas o escribes a sus padres para saber cómo está", ["Esperas a que vuelva", "Lo borras de la lista", "Lo regañas cuando vuelva"], "El maestro cuida a los niños como quien dará cuenta de ellos: «porque ellos velan por vuestras almas».", "Hebreos 13:17"],
    ["f58", 6, "o6", "aplicar", "Una maestra enseña a orar, pero los niños nunca la ven orar con ellos. ¿Qué le aconsejas?", "Que ore con ellos y por ellos, porque su ejemplo enseña", ["Que les dé más tareas", "Que hable más de la oración", "Nada"], "«presentándote tú en todo como ejemplo de buenas obras».", "Tito 2:7"],
    ["f59", 6, "o6", "evaluar", "¿Qué semana de preparación es la mejor para un maestro?", "Orar por cada niño, estudiar a tiempo, preparar la clase, buscar a los que faltan y llegar temprano", ["Preparar todo el sábado por la noche", "No preparar y confiar en la inspiración", "Copiar la clase de otro sin leerla"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f60", 6, "o6", "comprender", "¿Por qué el líder cuida que los maestros roten y descansen?", "Porque un maestro cansado enseña peor, y necesita también estar en el culto", ["Porque los maestros no sirven", "Para tener menos maestros", "No hace falta"], "Los que cuidan almas lo hacen mejor con alegría, «para que lo hagan con alegría, y no quejándose».", "Hebreos 13:17"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hacía Esdras además de inquirir la ley, según Esdras 7:10?", "Cumplirla y enseñarla en Israel", ["Venderla", "Esconderla", "Cambiarla"], "«para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos».", "Esdras 7:10"],
      ["m1-02", 1, "o1", "comprender", "¿Qué dice la ley del proceso de aprender de Gregory?", "Que el alumno dice la verdad con sus propias palabras", ["Que el alumno solo escucha", "Que el alumno copia", "Que el alumno no habla"], "Así se comprueba que entendió, como buscaban en Israel: «de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m1-03", 1, "o1", "aplicar", "Una maestra termina la clase sin repasar ni aplicar nada. ¿Qué ley olvida?", "La del repaso y la aplicación", ["La del lenguaje", "La del maestro", "Ninguna"], "Esdras enseñaba para que se cumpliera la ley: «para inquirir la ley de Jehová y para cumplirla».", "Esdras 7:10"],
      ["m1-04", 1, "o1", "analizar", "¿Qué tienen en común Esdras y la ley del maestro?", "Que el maestro primero estudia y vive lo que va a enseñar", ["Que el maestro no estudia", "Que el maestro solo habla", "Nada"], "«Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla».", "Esdras 7:10"],
      ["m1-05", 1, "o1", "recordar", "¿Cómo se llama el libro de John Milton Gregory que se lee en español?", "Las siete leyes de la enseñanza", ["El arte de aconsejar", "Enseñando para cambiar vidas", "La predicación bíblica"], "Gregory publicó sus siete leyes en 1884; ayudan a enseñar como en Israel: «y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué maestro aplica mejor las siete leyes?", "El que estudia, gana la atención, explica las palabras, parte de lo conocido, hace pensar, escucha y aplica", ["El que lee rápido y termina", "El que solo cuenta chistes", "El que solo da tareas"], "«leían en el libro de la ley de Dios claramente, y ponían el sentido».", "Nehemías 8:8"],
      ["m1-07", 2, "o2", "recordar", "¿A qué árbol subió Zaqueo, según Lucas 19:4?", "A un sicómoro", ["A un olivo", "A una higuera", "A una palmera"], "«Y corriendo delante, subió a un árbol sicómoro para verle».", "Lucas 19:1-10"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué Israel contaba sus historias a los hijos, según Salmos 78:3?", "Porque así pasaban de padres a hijos las obras de Dios", ["Para entretenerlos", "Porque no tenían libros", "Para asustarlos"], "«Las cuales hemos oído y entendido; Que nuestros padres nos las contaron».", "Salmos 78:2-3"],
      ["m1-09", 2, "o2", "aplicar", "Un maestro cuenta la historia de Jonás y termina diciendo solo que hay que obedecer a los papás. ¿Qué le falta?", "Mostrar lo que la historia enseña de Dios: su misericordia", ["Nada", "Más reglas", "Contar otra historia"], "La historia muestra primero a Dios, y no solo una regla; Jesús enseñaba la palabra «conforme a lo que podían oír».", "Marcos 4:33-34"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué un apoyo visual ayuda a contar una historia?", "Porque ayuda a los niños a imaginarla y a recordarla", ["Porque reemplaza la historia", "Porque así no hay que prepararse", "No ayuda"], "Jesús hablaba «conforme a lo que podían oír», y el maestro usa lo que ayude a entender.", "Marcos 4:33-34"],
      ["m1-11", 2, "o2", "recordar", "¿A qué dijo Jesús que vino el Hijo del Hombre, según Lucas 19:10?", "A buscar y a salvar lo que se había perdido", ["A juzgar a los ricos", "A cobrar impuestos", "A descansar"], "«Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué manera de contar una historia bíblica es la mejor?", "Con fidelidad al texto, con orden, mirando a los niños y llevándola a Jesús", ["Inventando detalles para que sea más divertida", "Leyéndola sin mirar a nadie", "Contándola sin final"], "«Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:1-10"],
      ["m1-13", 3, "o3", "recordar", "¿Qué preguntó Jesús después de la parábola del buen samaritano, según Lucas 10:36?", "Quién de los tres fue el prójimo del que cayó en manos de los ladrones", ["Quién tenía más dinero", "Quién era el más fuerte", "Quién llegó primero"], "«¿Quién, pues, de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones?».", "Lucas 10:36-37"],
      ["m1-14", 3, "o3", "comprender", "¿Para qué sirven las preguntas de memoria?", "Para recordar qué pasó y quién lo hizo", ["Para aplicar la historia", "Para dar notas", "Para castigar"], "Son el primer paso; después vienen las de comprensión y las de aplicación, como la de Jesús: «Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
      ["m1-15", 3, "o3", "aplicar", "Una maestra de preadolescentes quiere que hablen de su fe. ¿Qué hace?", "Les hace preguntas abiertas, como Jesús: ¿quién dicen ustedes que es Jesús?", ["Les hace un dictado", "Les pide silencio", "Los pone a colorear"], "«Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15-16"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el juego de repaso termina con una pregunta sin puntos?", "Para que la aplicación no sea una competencia, sino un paso de vida", ["Porque los puntos están prohibidos", "Porque nadie sabe la respuesta", "Porque se acaba el tiempo"], "«Pero sed hacedores de la palabra, y no tan solamente oidores».", "Santiago 1:22"],
      ["m1-17", 3, "o3", "recordar", "¿A quién engañan los que solo oyen la palabra, según Santiago 1:22?", "A sí mismos", ["A los maestros", "A los niños", "A nadie"], "«Pero sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos».", "Santiago 1:22"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué actividad es la más adecuada para niños de cuatro años?", "Una canción con gestos o una manualidad sencilla", ["Un debate", "Un examen escrito", "Una lectura de diez capítulos"], "Cada edad aprende haciendo lo que puede: «sed hacedores de la palabra».", "Santiago 1:22"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué será afirmado si encomendamos a Jehová nuestras obras, según Proverbios 16:3?", "Nuestros pensamientos", ["Nuestras riquezas", "Nuestros enemigos", "Nuestras quejas"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
      ["m2-02", 4, "o4", "comprender", "¿Qué parte de la clase recibe a cada niño por su nombre?", "La bienvenida", ["La historia", "El cierre", "La actividad"], "Desde el primer momento se sirve a Cristo: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que planear la parte de la historia en una clase de una hora. ¿Cuánto tiempo le das?", "Unos quince minutos, con un apoyo visual", ["Cinco segundos", "Toda la hora", "Ninguno"], "El horario es una guía para servir bien: «hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la preparación de la clase empieza en oración?", "Porque es una obra para el Señor, y él afirma los pensamientos del que se la encomienda", ["Porque así se gana tiempo", "Porque no hace falta preparar", "Porque es una costumbre"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
      ["m2-05", 4, "o4", "recordar", "¿Para quién se hace todo, según Colosenses 3:23?", "Para el Señor y no para los hombres", ["Para los padres", "Para el pastor", "Para uno mismo"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué objetivo de clase está mejor escrito?", "Que los niños cuenten la historia, se sepan amados por Jesús y saluden a un compañero que está solo", ["Que los niños estén quietos", "Que la clase termine a tiempo", "Que haya muchas actividades"], "Tiene las tres partes, saber, sentir y hacer, y sirve a toda la persona «como para el Señor».", "Colosenses 3:23"],
      ["m2-07", 5, "o5", "recordar", "¿Cuál es el fruto del Espíritu, según Gálatas 5:22-23?", "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza", ["Riqueza, fama y poder", "Fuerza y astucia", "Enojo y castigo"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza».", "Gálatas 5:22-23"],
      ["m2-08", 5, "o5", "comprender", "¿Qué es una consecuencia breve y conocida en la clase?", "Una respuesta pequeña a una mala conducta, que el niño ya conoce, como esperar un turno", ["Un castigo físico", "Una humillación", "Un encierro"], "Se corrige sin desanimar: «no exasperéis a vuestros hijos, para que no se desalienten».", "Colosenses 3:21"],
      ["m2-09", 5, "o5", "aplicar", "Un niño no quiere participar y se queda sentado en un rincón. ¿Qué haces?", "Lo invitas con cariño y le das una tarea sencilla, como repartir los materiales", ["Lo obligas a gritar", "Te burlas de él", "Lo mandas solo afuera"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
      ["m2-10", 5, "o5", "aplicar", "Tu clase no tiene reglas, y cada semana hay desorden. ¿Qué haces?", "Poner pocas reglas claras y en positivo, y repetirlas con una rutina cada semana", ["Poner veinte reglas", "Gritar más fuerte", "Cancelar la clase"], "Prevenir evita la dureza: «La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué la atención positiva ayuda a la disciplina?", "Porque al notar lo que los niños hacen bien, lo bueno se repite", ["Porque así ya no hay que corregir nunca", "Porque los niños no se portan mal", "No ayuda"], "El amor «es sufrido, es benigno», y la benignidad también enseña.", "1 Corintios 13:4-5"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál de estas prácticas no se usa nunca en el ministerio de niños?", "El castigo físico", ["Una regla en positivo", "Una consecuencia breve", "Una conversación con los padres"], "La firmeza va siempre con respeto y protección; el amor «no se irrita, no guarda rencor».", "1 Corintios 13:4-5"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pasa si los que cuidan almas lo hacen quejándose, según Hebreos 13:17?", "No es provechoso", ["Es mejor", "No importa", "Es un premio"], "«para que lo hagan con alegría, y no quejándose, porque esto no os es provechoso».", "Hebreos 13:17"],
      ["m2-14", 6, "o6", "comprender", "¿Qué significa enseñar con integridad, según Tito 2:7?", "Que la vida del maestro coincide con lo que enseña", ["Que enseña sin prepararse", "Que solo dice lo que agrada", "Que enseña muy rápido"], "«en la enseñanza mostrando integridad, seriedad».", "Tito 2:7"],
      ["m2-15", 6, "o6", "aplicar", "Un maestro les pide a los niños que no mientan, pero ellos lo oyen mentirle a otro adulto. ¿Qué tiene que corregir?", "Su ejemplo, porque contradice lo que enseña, y debe vivir lo que enseña", ["Nada", "La lección", "La edad de los niños"], "«Sed imitadores de mí, así como yo de Cristo».", "1 Corintios 11:1"],
      ["m2-16", 6, "o6", "aplicar", "Tienes que organizar a los maestros para el próximo trimestre. ¿Qué haces?", "Un calendario con turnos, para que roten, descansen y puedan estar en el culto", ["Que los mismos sirvan todos los domingos", "Que cada uno venga cuando pueda, sin plan", "Que enseñe solo el líder"], "Los que cuidan almas sirven mejor con alegría: «para que lo hagan con alegría, y no quejándose».", "Hebreos 13:17"],
      ["m2-17", 6, "o6", "recordar", "¿A quién imitaba Pablo, según 1 Corintios 11:1?", "A Cristo", ["A los reyes", "A nadie", "A los fariseos"], "«Sed imitadores de mí, así como yo de Cristo».", "1 Corintios 11:1"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué muestra mejor que un maestro cuida a sus niños durante la semana?", "Que ora por ellos por su nombre y busca a los que faltan", ["Que nunca piensa en ellos fuera de la clase", "Que solo prepara la manualidad", "Que llega tarde"], "Cuida a los niños como quien dará cuenta: «porque ellos velan por vuestras almas, como quienes han de dar cuenta».", "Hebreos 13:17"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "ninez-3-e1",
      tipo: "corta",
      pregunta: "Explica tres de las siete leyes de la enseñanza de Gregory y cómo las usarías con niños.",
      ideas: [
        { id: "maestro", peso: 30, texto: "La ley del maestro: conocer bien lo que se enseña.", formas: ["ley del maestro", "conoce bien", "conocer bien", "estudi*", "prepar*"] },
        { id: "leccion", peso: 30, texto: "El lenguaje y la lección: palabras que se entienden, de lo conocido a lo desconocido.", formas: ["lenguaje", "palabras que", "lo conocido", "lo desconocido"] },
        { id: "repaso", peso: 30, texto: "Aprender, repasar y aplicar.", formas: ["sus propias palabras", "repas*", "aplica*", "a la vida"] },
      ],
      citas: ["Nehemías 8:8", "Esdras 7:10", "2 Timoteo 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La ley del maestro pide conocer bien lo que se enseña, como Esdras, que estudió antes de enseñar (Esdras 7:10). La ley de la lección pide ir de lo conocido a lo desconocido, con palabras que los niños entienden. Y la ley del repaso y la aplicación pide repasar lo aprendido y llevarlo a la vida esta semana.",
    },
    {
      id: "ninez-3-e2",
      tipo: "corta",
      pregunta: "Explica cómo prepararías y contarías una historia bíblica a los niños.",
      ideas: [
        { id: "preparar", peso: 30, texto: "Leerla en la Biblia y encontrar su verdad central.", formas: ["en la biblia", "verdad central", "leeria", "el pasaje"] },
        { id: "orden", peso: 30, texto: "Ordenarla, ensayarla y usar un apoyo visual.", formas: ["comienzo", "problema", "tension", "ensay*", "apoyo visual"] },
        { id: "fidelidad", peso: 30, texto: "Contarla con fidelidad y llevarla a Jesús.", formas: ["fidelidad", "sin cambiar", "llevaria a jesus", "a jesus", "muestre a dios"] },
      ],
      citas: ["Marcos 4:33-34", "Marcos 4:33", "Salmos 78:2-3", "Lucas 19:10", "Lucas 19:1-10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Leería el pasaje en la Biblia para encontrar su verdad central. La ordenaría con un comienzo que atrape, un problema, un momento de tensión y un final, y la ensayaría en voz alta con un apoyo visual. La contaría con fidelidad, sin cambiar los hechos, y la llevaría a Jesús, como hacía él con sus parábolas (Marcos 4:33).",
    },
    {
      id: "ninez-3-e3",
      tipo: "corta",
      pregunta: "Explica cómo manejarías a un niño que interrumpe la clase, sin humillarlo.",
      ideas: [
        { id: "calma", peso: 30, texto: "Acercarse con calma y hablarle en voz baja, sin humillarlo.", formas: ["con calma", "voz baja", "sin humillar*", "me acercaria", "acercarme"] },
        { id: "regla", peso: 30, texto: "Recordarle la regla con una opción y darle una tarea.", formas: ["la regla", "una opcion", "una tarea", "repartir"] },
        { id: "consecuencia", peso: 30, texto: "Una consecuencia breve, y hablar después con él y, si se repite, con sus padres.", formas: ["consecuencia", "esperar un turno", "sus padres", "al final"] },
      ],
      citas: ["Proverbios 15:1", "Colosenses 3:21", "1 Corintios 13:4-5", "1 Corintios 13:5", "Gálatas 5:22-23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Me acercaría con calma y le hablaría en voz baja, sin humillarlo, porque la blanda respuesta quita la ira (Proverbios 15:1). Le recordaría la regla con una opción y le daría una tarea, como repartir los materiales. Si sigue, aplicaría una consecuencia breve que ya conoce, y al final hablaría con él y, si se repite, con sus padres.",
    },
    {
      id: "ninez-3-e4",
      tipo: "breve",
      pregunta:
        "Tienes que planificar una clase de una hora sobre Zaqueo para niños de seis a nueve años. Explica cada parte, con citas bíblicas.",
      ideas: [
        { id: "objetivo", peso: 20, texto: "Un objetivo de saber, sentir y hacer.", formas: ["objetivo", "que cuenten", "se sepan amados", "tres partes"] },
        { id: "partes", peso: 30, texto: "Las partes: bienvenida, alabanza, historia, actividad, versículo y cierre.", formas: ["bienvenida", "alabanza", "actividad", "versiculo", "cierre"] },
        { id: "historia", peso: 25, texto: "La historia contada con fidelidad y con un apoyo visual.", formas: ["sicomoro", "un arbol", "apoyo visual", "fidelidad", "por su nombre"] },
        { id: "cuidado", peso: 25, texto: "La oración, la preparación a tiempo y la entrega segura de cada niño.", formas: ["con oracion", "orariamos", "a quien lo trajo", "entregaria", "durante la semana"] },
      ],
      basta: 85,
      citas: ["Lucas 19:1-10", "Lucas 19:10", "Lucas 19:5", "Colosenses 3:23", "Proverbios 16:3", "Nehemías 8:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Durante la semana prepararía la clase con oración, porque encomendar a Jehová las obras afirma los pensamientos (Proverbios 16:3). Escribiría un objetivo de tres partes: que los niños cuenten cómo Jesús llamó a Zaqueo por su nombre, que se sepan amados por él y que esta semana saluden a un compañero que está solo. Empezaría con la bienvenida, recibiendo a cada niño por su nombre, y seguiría con alabanza y oración. Después contaría la historia con fidelidad, en unos quince minutos, con el dibujo de un árbol sicómoro como apoyo visual, y terminaría en Jesús, que vino a buscar y a salvar lo que se había perdido (Lucas 19:10). Luego haríamos una actividad, como una dramatización, y aprenderíamos el versículo. En el cierre oraríamos, les daría una tarea para la casa y entregaría a cada niño a quien lo trajo.",
    },
    {
      id: "ninez-3-e5",
      tipo: "breve",
      pregunta:
        "Un nuevo maestro de niños te pregunta cómo deben ser su vida y su semana para enseñar bien. Explica qué le dirías, con citas bíblicas.",
      ideas: [
        { id: "ejemplo", peso: 30, texto: "Su vida también enseña: ser ejemplo.", formas: ["ejemplo", "imitadores", "imitaran", "integridad", "de lo que ven"] },
        { id: "semana", peso: 30, texto: "La semana: orar por cada niño, estudiar a tiempo, preparar, buscar a los que faltan y llegar temprano.", formas: ["por su nombre", "cada nino", "el lunes", "el martes", "llegar temprano", "que falto", "los que faltan"] },
        { id: "equipo", peso: 20, texto: "Aprender con el equipo y descansar.", formas: ["los demas maestros", "con el equipo", "descans*", "turnos"] },
        { id: "proteccion", peso: 20, texto: "Pasar por la selección y la capacitación de protección de menores.", formas: ["proteccion de menores", "la seleccion", "capacitacion"] },
      ],
      basta: 85,
      citas: ["1 Corintios 11:1", "Tito 2:7", "Hebreos 13:17", "Colosenses 3:23", "2 Timoteo 2:2", "Esdras 7:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le diría que su vida también enseña, porque los niños aprenden más de lo que ven que de lo que oyen; por eso debe ser ejemplo, como Pablo, que pidió que lo imitaran así como él imitaba a Cristo (1 Corintios 11:1), y enseñar con integridad (Tito 2:7). Le propondría un ritmo para la semana: el domingo, anotar cómo salió la clase y orar por cada niño por su nombre; el lunes o el martes, leer el pasaje de la próxima clase; a mitad de semana, preparar la historia y los materiales; durante la semana, llamar a los padres de un niño que faltó; y llegar temprano para orar con el equipo. Le pediría reunirse cada mes con los demás maestros para aprender, y tomar sus días de descanso. Y antes de empezar, pasar por la selección y la capacitación de protección de menores, porque cuidamos almas como quienes han de dar cuenta.",
    },
  ],
  breve: {
    id: "ninez-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo prepararías a un equipo de maestros para mejorar sus clases, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "leyes", peso: 20, texto: "Las siete leyes de la enseñanza de Gregory.", formas: ["siete leyes", "gregory", "lo conocido", "lo desconocido"] },
      { id: "historias", peso: 20, texto: "Contar las historias con fidelidad y llevarlas a Jesús.", formas: ["las historias", "una historia", "fidelidad", "verdad central"] },
      { id: "preguntas", peso: 15, texto: "Preguntas, actividades y juegos según la edad.", formas: ["preguntas", "actividades", "juegos", "hacedores"] },
      { id: "plan", peso: 15, texto: "Planificar la clase con su objetivo.", formas: ["objetivo", "planific*", "una clase de"] },
      { id: "disciplina", peso: 15, texto: "La disciplina con calma y sin humillar.", formas: ["disciplina", "pocas reglas", "sin humillar", "con calma", "blanda respuesta"] },
      { id: "maestro", peso: 15, texto: "La vida del maestro, el descanso y la protección de menores.", formas: ["ejemplo", "imitadores", "descans*", "proteccion de menores"] },
    ],
    basta: 85,
    citas: ["Nehemías 8:8", "Esdras 7:10", "Marcos 4:33", "Marcos 4:33-34", "Lucas 10:37", "Santiago 1:22", "Proverbios 15:1", "1 Corintios 11:1", "Colosenses 3:23"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría con las siete leyes de la enseñanza de Gregory, para que cada maestro conozca bien lo que enseña, gane la atención, use palabras sencillas y vaya de lo conocido a lo desconocido, como en tiempos de Esdras, cuando leían la ley claramente y ponían el sentido (Nehemías 8:8). Después practicaríamos cómo contar las historias de la Biblia con fidelidad, encontrando su verdad central y llevándolas a Jesús, que hablaba conforme a lo que podían oír (Marcos 4:33). Les enseñaría a usar preguntas de memoria, de comprensión y de aplicación, y actividades y juegos según la edad, para que los niños sean hacedores de la palabra (Santiago 1:22). Planificaríamos juntos una clase con su objetivo de saber, sentir y hacer. Hablaríamos de la disciplina con pocas reglas, con calma y sin humillar, porque la blanda respuesta quita la ira. Y terminaría con la vida del maestro: ser ejemplo, orar por cada niño, descansar y pasar por la capacitación de protección de menores.",
  },
};
