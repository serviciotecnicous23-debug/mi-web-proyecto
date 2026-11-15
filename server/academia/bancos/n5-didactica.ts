/**
 * El banco de «Didáctica: cómo enseñar» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el maestro cristiano · o2 cómo aprende la gente · o3 preparar una clase · o4 enseñar como Jesús ·
 * o5 evaluar el aprendizaje · o6 acompañar a los alumnos · o7 el versículo de memoria (Esdras 7:10).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-didactica-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_DIDACTICA: BancoMateria = {
  materia: "n5-didactica",
  repaso: {
    "n5-didactica-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Para qué tres cosas había preparado Esdras su corazón, según Esdras 7:10?", "Para inquirir la ley de Jehová, cumplirla y enseñarla", ["Para reconstruir el templo, el muro y las casas", "Para juzgar, gobernar y castigar", "Para viajar, predicar y fundar iglesias"], "«Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos».", "Esdras 7:10"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué advierte Santiago que no se hagan maestros muchos?", "Porque los que enseñan recibirán mayor condenación: responden ante Dios", ["Porque enseñar no es importante", "Porque solo los pastores pueden enseñar", "Porque Dios no da el don de enseñar"], "«sabiendo que recibiremos mayor condenación».", "Santiago 3:1"],
      ["1-r3", 1, "o1", "comprender", "¿Cómo enseñó Jesús el servicio en Juan 13?", "Lavando los pies de sus discípulos y dándoles ejemplo", ["Con un discurso largo", "Con un examen escrito", "Enviándolos a otra ciudad"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:15"],
    ] as P[]).map(p),
    "n5-didactica-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué mandó Dios a Israel hacer con sus palabras, según Deuteronomio 6:7?", "Repetirlas a sus hijos y hablar de ellas en la casa y en el camino", ["Guardarlas en secreto", "Decirlas solo en el templo", "Escribirlas y olvidarlas"], "«y las repetirás a tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino».", "Deuteronomio 6:7"],
      ["2-r2", 2, "o2", "comprender", "¿Por qué los versículos de memoria vuelven a los 1, 3, 7 y 21 días?", "Porque repasar con espacios entre un repaso y otro graba mejor que estudiar todo de una vez", ["Para que el alumno se canse", "Porque es más fácil para el sistema", "Para reemplazar las lecciones"], "Así lo muestran los estudios sobre la memoria.", "Deuteronomio 6:7"],
      ["2-r3", 2, "o2", "recordar", "¿Qué distingue Hebreos 5:12?", "La leche y el alimento sólido: lo básico y lo maduro", ["El agua y el vino", "La ley y los profetas", "El pan y los peces"], "«tenéis necesidad de leche, y no de alimento sólido».", "Hebreos 5:12"],
    ] as P[]).map(p),
    "n5-didactica-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Qué hacían los levitas en Nehemías 8:8?", "Leían claramente y ponían el sentido, de modo que el pueblo entendiera", ["Leían en voz baja", "Cantaban sin explicar", "Leían en otro idioma sin traducir"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["3-r2", 3, "o3", "aplicar", "¿Cuál de estos objetivos se puede comprobar?", "El alumno podrá explicar con sus palabras qué es la gracia", ["El alumno sabrá más de la gracia", "El alumno entenderá la gracia", "El alumno se sentirá bien"], "Un buen objetivo usa un verbo que se puede comprobar.", "Nehemías 8:8"],
      ["3-r3", 3, "o3", "recordar", "¿Con qué empieza una clase, según la lección?", "Con una pregunta, una historia breve o un problema que despierte el interés", ["Con el examen", "Con la despedida", "Con los anuncios"], "Después vienen la Palabra, la idea clave, la aplicación y el repaso.", "Lucas 24:27"],
    ] as P[]).map(p),
    "n5-didactica-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pregunta hizo Jesús a sus discípulos en Mateo 16:15?", "Y vosotros, ¿quién decís que soy yo?", ["¿Cuándo volveremos a Galilea?", "¿Quién es el mayor?", "¿Qué comeremos?"], "«Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15"],
      ["4-r2", 4, "o4", "recordar", "¿Cómo hablaba Jesús a la gente, según Mateo 13:34?", "Por parábolas", ["Solo con leyes", "Solo con milagros", "En silencio"], "«Todo esto habló Jesús por parábolas a la gente, y sin parábolas no les hablaba».", "Mateo 13:34"],
      ["4-r3", 4, "o4", "comprender", "¿Qué enseña Juan 16:12 sobre la manera de enseñar?", "Que Jesús adaptaba lo que enseñaba a lo que sus oyentes podían recibir", ["Que Jesús lo enseñó todo de una vez", "Que no hay que enseñar", "Que los discípulos no entendían nada"], "«Aún tengo muchas cosas que deciros, pero ahora no las podéis sobrellevar».", "Juan 16:12"],
    ] as P[]).map(p),
    "n5-didactica-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide Proverbios 27:23?", "Ser diligente en conocer el estado de las ovejas", ["Comprar más ovejas", "Dejar solas a las ovejas", "Vender el rebaño"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
      ["5-r2", 5, "o5", "comprender", "¿Qué es la evaluación formativa?", "La que acompaña el aprendizaje y muestra qué falta cuando todavía hay tiempo de corregir", ["El examen final con su nota", "Un castigo para el alumno", "Una prueba sin relación con la clase"], "La evaluación final, en cambio, mide el resultado al terminar.", "Proverbios 27:23"],
      ["5-r3", 5, "o5", "comprender", "¿Con qué actitud pide Pablo corregir, según 2 Timoteo 4:2?", "Con toda paciencia y doctrina", ["Con enojo", "Con burla", "Sin explicar"], "«redarguye, reprende, exhorta con toda paciencia y doctrina».", "2 Timoteo 4:2"],
    ] as P[]).map(p),
    "n5-didactica-6": ([
      ["6-r1", 6, "o6", "recordar", "¿A qué se compara Pablo en 1 Tesalonicenses 2:7?", "A una nodriza que cuida con ternura a sus propios hijos", ["A un juez severo", "A un soldado", "A un comerciante"], "«como la nodriza que cuida con ternura a sus propios hijos».", "1 Tesalonicenses 2:7"],
      ["6-r2", 6, "o6", "comprender", "¿Qué ve el mentor de la academia en la página Mis acompañados?", "El avance de las personas que acompaña, sin sus notas ni sus datos de contacto", ["Todas las notas y los teléfonos", "Solo los certificados", "Nada"], "También ve quién lleva siete días o más sin estudiar.", "2 Timoteo 2:2"],
      ["6-r3", 6, "o6", "recordar", "Además de las materias, ¿qué acompañamiento se pide para terminar el Nivel 5?", "Acompañar a dos personas hasta que terminen el Nivel 1", ["Dar clases durante diez años", "Escribir un libro", "Ninguno"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el maestro cristiano (10)
    ["f01", 1, "o1", "recordar", "¿Entre qué cosas nombra Pablo la enseñanza, en Romanos 12:7?", "Entre los dones que Dios da a su iglesia", ["Entre los pecados", "Entre las leyes del Estado", "Entre las fiestas judías"], "Cada uno sirve con el don que recibió.", "Romanos 12:7"],
    ["f02", 1, "o1", "comprender", "¿Para qué dio Cristo maestros a la iglesia, según Efesios 4:11-12?", "Para preparar a los creyentes para la obra del ministerio", ["Para que los demás no sirvan", "Para dividir a la iglesia", "Para reemplazar a la Biblia"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:12"],
    ["f03", 1, "o1", "comprender", "¿Qué orden muestra Esdras 7:10?", "Primero estudiar, después obedecer y entonces enseñar", ["Primero enseñar y después estudiar", "Solo enseñar", "Primero agradar a los hombres"], "«para inquirir la ley de Jehová y para cumplirla, y para enseñar».", "Esdras 7:10"],
    ["f04", 1, "o1", "recordar", "¿Qué recibiremos los maestros, según Santiago 3:1?", "Mayor condenación", ["Más dinero", "Menos responsabilidad", "Un cargo más alto"], "«sabiendo que recibiremos mayor condenación».", "Santiago 3:1"],
    ["f05", 1, "o1", "comprender", "¿Por qué importa tanto el ejemplo del maestro?", "Porque su vida enseña más que sus palabras", ["Porque nadie escucha las palabras", "No importa", "Porque reemplaza a la Biblia"], "«sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza».", "1 Timoteo 4:12"],
    ["f06", 1, "o1", "recordar", "¿Quién enseña todas las cosas, según Juan 14:26?", "El Espíritu Santo", ["El maestro solo", "Los libros", "La experiencia"], "«él os enseñará todas las cosas».", "Juan 14:26"],
    ["f07", 1, "o1", "aplicar", "Un maestro enseña sobre el perdón, pero no perdona a un hermano. ¿Qué principio olvida?", "Que el maestro debe vivir lo que enseña", ["Que debe enseñar más fuerte", "Que debe usar más videos", "Ninguno"], "«Porque ejemplo os he dado».", "Juan 13:15"],
    ["f08", 1, "o1", "recordar", "¿Cómo llamaban a Jesús sus discípulos, según Juan 13:13?", "Maestro y Señor", ["Solo profeta", "Rey de los judíos", "Hijo de David"], "«Vosotros me llamáis Maestro, y Señor; y decís bien, porque lo soy».", "Juan 13:13"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estos maestros refleja mejor el carácter que pide la Palabra?", "Uno que estudia, vive lo que enseña, ama a sus alumnos y depende del Espíritu", ["Uno muy elocuente que no estudia", "Uno que sabe mucho, pero desprecia a sus alumnos", "Uno que enseña sin orar"], "«Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
    ["f10", 1, "o7", "recordar", "Completa Esdras 7:10: Porque Esdras había preparado su corazón para inquirir la ley de Jehová…", "y para cumplirla, y para enseñar en Israel sus estatutos y decretos", ["y para reconstruir el templo de Jerusalén", "y para juzgar a los pueblos vecinos", "y para escribirla en tablas de piedra"], "Es el versículo de memoria de la materia.", "Esdras 7:10"],
    // ---- lección 2: cómo aprende la gente (10)
    ["f11", 2, "o2", "recordar", "¿Qué muestran los estudios sobre la memoria acerca de releer?", "Que tratar de recordar enseña más que solo releer", ["Que releer es lo único que sirve", "Que la memoria no se puede ejercitar", "Que los repasos no sirven"], "Por eso cada lección de la academia termina con un repaso.", "Deuteronomio 6:7"],
    ["f12", 2, "o2", "comprender", "¿Por qué conviene repasar en días distintos?", "Porque los repasos con espacios graban mejor que estudiar todo de una vez", ["Porque así se termina más rápido", "Porque no hay que aprender de memoria", "No conviene"], "«y las repetirás a tus hijos».", "Deuteronomio 6:7"],
    ["f13", 2, "o2", "recordar", "¿Quién resumió la enseñanza en siete leyes?", "John Milton Gregory", ["Martín Lutero", "Juan Calvino", "Charles Finney"], "Fue un educador y ministro bautista del siglo XIX.", "Deuteronomio 6:7"],
    ["f14", 2, "o2", "comprender", "¿Qué dice la ley de Gregory sobre la lección?", "Que se avanza de lo que el alumno ya sabe a lo que todavía no sabe", ["Que se empieza por lo más difícil", "Que no importa lo que el alumno sabe", "Que se enseña todo de una vez"], "«tenéis necesidad de leche, y no de alimento sólido».", "Hebreos 5:12"],
    ["f15", 2, "o2", "aplicar", "Un maestro usa palabras difíciles que sus alumnos no entienden. ¿Qué ley de Gregory olvida?", "La del lenguaje: maestro y alumno deben usar un lenguaje que los dos entiendan", ["La del repaso", "La del maestro", "Ninguna"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f16", 2, "o2", "recordar", "¿Dónde enseñó Howard Hendricks durante más de cincuenta años?", "En el Seminario Teológico de Dallas", ["En Wittenberg", "En Ginebra", "En Oxford"], "Insistía en que el maestro nunca deje de aprender.", "2 Timoteo 2:2"],
    ["f17", 2, "o2", "comprender", "¿Qué insiste Hendricks sobre el alumno?", "Que aprende más cuanto más participa", ["Que aprende más cuanto menos habla", "Que solo debe escuchar", "Que no necesita practicar"], "«Pero sed hacedores de la palabra, y no tan solamente oidores».", "Santiago 1:22"],
    ["f18", 2, "o2", "comprender", "¿Qué distingue Hebreos 5:12-14 entre la leche y el alimento sólido?", "Lo básico para los que empiezan y lo maduro para los que han crecido", ["La comida de los ricos y la de los pobres", "La ley y la gracia", "Nada importante"], "«el alimento sólido es para los que han alcanzado madurez».", "Hebreos 5:14"],
    ["f19", 2, "o2", "analizar", "¿Por qué las lecciones de la academia terminan con una aplicación y una pregunta para la vida?", "Porque los adultos aprenden mejor cuando ven para qué sirve lo que estudian y lo relacionan con su vida", ["Para alargar la lección", "Porque no hay otra cosa que decir", "Para que el alumno no piense"], "«Pero sed hacedores de la palabra».", "Santiago 1:22"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas clases aprovecha mejor lo que se sabe sobre el aprendizaje?", "Una con preguntas para recordar, práctica y un repaso días después", ["Una charla larga sin preguntas", "Una lectura del manual sin pausa", "Una clase sin repaso ni práctica"], "«y las repetirás a tus hijos».", "Deuteronomio 6:7"],
    // ---- lección 3: preparar una clase (10)
    ["f21", 3, "o3", "recordar", "¿Qué hacían los levitas para que el pueblo entendiera, según Nehemías 8:8?", "Leían claramente y ponían el sentido", ["Leían en voz baja", "Leían sin explicar", "Cantaban la ley"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido».", "Nehemías 8:8"],
    ["f22", 3, "o3", "comprender", "¿Por qué se empieza a preparar una clase por el objetivo?", "Porque dice qué podrá hacer el alumno al terminar, y todo lo demás se ordena hacia eso", ["Porque así la clase es más larga", "Porque el objetivo no importa", "Porque reemplaza el contenido"], "El contenido, los métodos y el repaso sirven al objetivo.", "Nehemías 8:8"],
    ["f23", 3, "o3", "aplicar", "¿Cuál de estos verbos sirve para un objetivo que se puede comprobar?", "Explicar", ["Saber", "Entender", "Conocer mejor"], "Un buen objetivo usa un verbo que se puede comprobar.", "Nehemías 8:8"],
    ["f24", 3, "o3", "recordar", "¿Cuáles son los niveles de la taxonomía de Bloom revisada?", "Recordar, comprender, aplicar, analizar, evaluar y crear", ["Leer, escribir y contar", "Oír, ver y tocar", "Empezar, seguir y terminar"], "«Oirá el sabio, y aumentará el saber».", "Proverbios 1:5"],
    ["f25", 3, "o3", "aplicar", "¿A qué nivel de Bloom corresponde el objetivo preparar un estudio bíblico de quince minutos?", "Crear", ["Recordar", "Comprender", "Ninguno"], "Preparar algo nuevo es el nivel más alto: crear.", "Proverbios 1:5"],
    ["f26", 3, "o3", "recordar", "¿Qué partes tiene una clase, según la lección?", "Para empezar, la Palabra, la idea clave, la aplicación para la vida y el repaso", ["Solo la lectura", "Los anuncios y la despedida", "Un chiste y un examen"], "Es el mismo orden de las lecciones de la academia.", "Lucas 24:27"],
    ["f27", 3, "o3", "comprender", "¿A qué llevó Jesús a los discípulos de Emaús al explicarles las Escrituras?", "A lo que las Escrituras decían de él", ["A las leyes de Roma", "A la historia de Grecia", "A sus propias opiniones"], "«les declaraba en todas las Escrituras lo que de él decían».", "Lucas 24:27"],
    ["f28", 3, "o3", "aplicar", "¿Qué incluye el plan escrito de una clase?", "El tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas", ["Solo el título", "Solo los nombres de los alumnos", "Nada: se improvisa"], "Así se enseña con orden y se puede mejorar la clase.", "Nehemías 8:8"],
    ["f29", 3, "o3", "analizar", "¿Qué ventaja tiene escribir el plan de una clase?", "Enseñar con orden, respetar el tiempo y poder mejorarla la próxima vez", ["Ninguna", "Hacer la clase más larga", "No tener que estudiar"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f30", 3, "o3", "evaluar", "¿Cuál de estos objetivos está mejor escrito?", "Al terminar, el alumno podrá citar Juan 3:16 y explicar con sus palabras qué enseña", ["El alumno conocerá Juan 3:16", "El alumno pensará en Juan 3:16", "El alumno tendrá una buena experiencia"], "Dice qué hará el alumno, con verbos que se pueden comprobar.", "Nehemías 8:8"],
    // ---- lección 4: enseñar como Jesús (10)
    ["f31", 4, "o4", "recordar", "¿Qué hacía Jesús para que cada uno respondiera por sí mismo?", "Hacía preguntas", ["Daba todas las respuestas", "Evitaba hablar", "Pedía que repitieran sin pensar"], "«Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15"],
    ["f32", 4, "o4", "comprender", "¿Por qué Jesús enseñaba con historias?", "Porque una historia se recuerda mejor que una lista de ideas", ["Porque no tenía nada que decir", "Para entretener sin enseñar", "Porque era la única forma permitida"], "«y sin parábolas no les hablaba».", "Mateo 13:34"],
    ["f33", 4, "o4", "recordar", "¿Qué cosas de la vida diaria usó Jesús para enseñar en Mateo 6?", "Las aves del cielo y los lirios del campo", ["Espadas y lanzas", "Monedas de oro y joyas", "Libros y pergaminos"], "«Mirad las aves del cielo».", "Mateo 6:26"],
    ["f34", 4, "o4", "comprender", "¿Qué método usó Jesús al enviar a los setenta de dos en dos?", "La práctica, y después escuchó lo que habían vivido", ["La lectura en silencio", "El examen escrito", "La discusión sin práctica"], "«Volvieron los setenta con gozo».", "Lucas 10:17"],
    ["f35", 4, "o4", "recordar", "¿Con quiénes tuvo Jesús conversaciones personales en Juan 3 y 4?", "Con Nicodemo y con la mujer samaritana", ["Con Pilato y Herodes", "Con Pedro y Juan", "Con los fariseos en el templo"], "«Vino una mujer de Samaria a sacar agua».", "Juan 4:7"],
    ["f36", 4, "o4", "aplicar", "Quieres enseñar a tus alumnos a orar. ¿Qué método es el más adecuado?", "La demostración y la práctica: orar con ellos y dejar que oren", ["Solo una charla sobre la oración", "Un examen sobre la oración", "Un video sin conversación"], "«Señor, enséñanos a orar».", "Lucas 11:1"],
    ["f37", 4, "o4", "comprender", "¿Qué es el estudio de casos?", "Resolver con la Biblia una situación real", ["Leer casos de la policía", "Estudiar sin la Biblia", "Memorizar listas"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar».", "2 Timoteo 3:16"],
    ["f38", 4, "o4", "analizar", "¿Según qué se escoge el método de enseñanza?", "Según el objetivo, la edad y el momento del grupo", ["Según la moda", "Según lo que le guste al maestro", "Siempre el mismo método"], "«Aún tengo muchas cosas que deciros, pero ahora no las podéis sobrellevar».", "Juan 16:12"],
    ["f39", 4, "o4", "aplicar", "¿Qué conviene hacer en una clase en línea?", "Alternar explicaciones cortas con preguntas y llamar a cada alumno por su nombre", ["Hablar una hora sin pausa", "Apagar la cámara y leer", "No hacer preguntas"], "En línea la atención dura menos.", "Juan 16:12"],
    ["f40", 4, "o4", "evaluar", "¿Cuál de estas clases se parece más a la manera de enseñar de Jesús?", "Una con preguntas, una historia, un ejemplo de la vida y una práctica", ["Una lectura larga sin preguntas", "Un examen sin explicación", "Una clase sin relación con la vida"], "«Todo esto habló Jesús por parábolas a la gente».", "Mateo 13:34"],
    // ---- lección 5: evaluar el aprendizaje (10)
    ["f41", 5, "o5", "recordar", "¿Qué pide Proverbios 27:23 al que cuida un rebaño?", "Ser diligente en conocer el estado de sus ovejas", ["Venderlas pronto", "Dejarlas solas", "Contarlas una vez al año"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
    ["f42", 5, "o5", "comprender", "¿Qué mide la evaluación final?", "El resultado del aprendizaje al terminar, con una nota", ["Solo la asistencia", "El ánimo del maestro", "Nada"], "La formativa, en cambio, acompaña el aprendizaje.", "Proverbios 27:23"],
    ["f43", 5, "o5", "recordar", "¿Qué dice la tabla de especificaciones de un examen?", "Qué objetivo mide cada pregunta y con qué nivel de Bloom", ["La hora del examen", "Los nombres de los alumnos", "El precio del curso"], "Así el examen cubre toda la materia.", "Proverbios 27:23"],
    ["f44", 5, "o5", "comprender", "¿Para qué sirve una rúbrica?", "Para decir de antemano qué se evalúa y cuántos puntos vale cada criterio", ["Para esconder los criterios", "Para castigar al alumno", "Para que no haya nota"], "«Mas la pesa cabal le agrada».", "Proverbios 11:1"],
    ["f45", 5, "o5", "aplicar", "¿Qué tipo de evaluación muestra mejor si un alumno explica con sus palabras?", "Una respuesta escrita", ["Una pregunta de verdadero o falso", "La lista de asistencia", "Una pregunta de relacionar"], "Las respuestas escritas muestran si el alumno explica y aplica.", "Proverbios 27:23"],
    ["f46", 5, "o5", "recordar", "¿Cómo pide Pablo exhortar, según 2 Timoteo 4:2?", "Con toda paciencia y doctrina", ["Con enojo y prisa", "Sin explicar nada", "Solo con palabras duras"], "«redarguye, reprende, exhorta con toda paciencia y doctrina».", "2 Timoteo 4:2"],
    ["f47", 5, "o5", "aplicar", "¿Cómo debe ser la corrección de un trabajo?", "Pronta, explicada y con una muestra de cómo mejorar", ["Tardía y sin explicación", "Solo con una nota", "Pública y humillante"], "«con toda paciencia y doctrina».", "2 Timoteo 4:2"],
    ["f48", 5, "o5", "comprender", "¿Qué hace justa una evaluación?", "Que todos sepan de antemano qué se evaluará, que las reglas valgan para todos y que se pueda pedir revisión", ["Que el maestro decida según su ánimo", "Que nadie conozca los criterios", "Que unos tengan más ventajas"], "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada».", "Proverbios 11:1"],
    ["f49", 5, "o5", "analizar", "¿Qué puede hacer un profesor de la academia con una respuesta escrita que el sistema marcó para revisar?", "Revisarla y cambiar la nota escribiendo el motivo", ["Borrarla sin decir nada", "Nada: la nota no se puede cambiar", "Cambiar la nota sin dar motivo"], "El cambio queda registrado con su motivo.", "Proverbios 11:1"],
    ["f50", 5, "o5", "evaluar", "Un alumno sacó una nota baja. ¿Cuál es la mejor manera de verlo?", "La nota dice qué le falta aprender, no cuánto vale como persona", ["La nota dice cuánto vale el alumno", "Hay que avergonzarlo para que mejore", "No vale la pena seguir enseñándole"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
    // ---- lección 6: acompañar a los alumnos (10)
    ["f51", 6, "o6", "recordar", "¿Qué quiso entregar Pablo a los tesalonicenses además del evangelio, según 1 Tesalonicenses 2:8?", "Su propia vida", ["Dinero", "Un templo", "Una ley nueva"], "«no sólo el evangelio de Dios, sino también nuestras propias vidas».", "1 Tesalonicenses 2:8"],
    ["f52", 6, "o6", "recordar", "¿Qué pide Pablo en Filipenses 4:9?", "Que hagan lo que aprendieron, recibieron, oyeron y vieron en él", ["Que lo olviden", "Que solo lean sus cartas", "Que busquen otro maestro"], "«Lo que aprendisteis y recibisteis y oísteis y visteis en mí, esto haced».", "Filipenses 4:9"],
    ["f53", 6, "o6", "comprender", "¿Qué hace el maestro con el alumno que se detiene?", "Le escribe a tiempo para animarlo a seguir", ["Lo borra de la lista", "Lo ignora", "Lo regaña en público"], "«Manzana de oro con figuras de plata Es la palabra dicha como conviene».", "Proverbios 25:11"],
    ["f54", 6, "o6", "aplicar", "Un alumno necesita más tiempo para entender. ¿Qué hace el maestro?", "Le da más tiempo y le explica de otra manera, con paciencia", ["Lo deja atrás", "Le exige ir al ritmo de todos", "Le dice que no sirve para estudiar"], "«fuimos tiernos entre vosotros».", "1 Tesalonicenses 2:7"],
    ["f55", 6, "o6", "recordar", "¿Qué hace el profesor en la academia?", "Revisa las respuestas escritas marcadas, atiende las apelaciones y puede dar clases en vivo", ["Solo cobra la matrícula", "Cambia las notas sin motivo", "No tiene ninguna tarea"], "Sirve bajo la Dirección académica.", "2 Timoteo 2:2"],
    ["f56", 6, "o6", "comprender", "¿Qué no ve el mentor de la academia?", "Las notas ni los datos de contacto de las personas que acompaña", ["Su avance", "Quién lleva días sin estudiar", "Sus materias en curso"], "El mentor ve el avance, no las notas.", "2 Timoteo 2:2"],
    ["f57", 6, "o6", "recordar", "¿Desde cuántos días sin estudiar aparece una persona como detenida para su mentor?", "Siete días o más", ["Un día", "Un año", "Nunca aparece"], "Así el mentor sabe a quién escribir.", "2 Timoteo 2:2"],
    ["f58", 6, "o6", "analizar", "¿Por qué se pide en el Nivel 5 acompañar a dos personas hasta que terminen el Nivel 1?", "Porque el fruto del maestro se ve cuando sus alumnos enseñan también a otros", ["Para tener más alumnos inscritos", "Para cobrar más", "Por costumbre"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f59", 6, "o6", "evaluar", "Un mentor descubre que la persona que acompaña corre peligro o sufre un abuso. ¿Qué hace?", "Sigue las normas de la ética: protege a la persona y acude a quien corresponde", ["Guarda el secreto", "Lo comenta con todos", "Lo ignora porque no es su tarea"], "«Abre tu boca por el mudo En el juicio de todos los desvalidos».", "Proverbios 31:8"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos maestros acompaña mejor a sus alumnos?", "Uno que los conoce por su nombre, ora por ellos, los anima cuando se detienen y celebra sus avances", ["Uno que solo da la clase y se va", "Uno que solo corrige errores", "Uno que compara a unos con otros"], "«como la nodriza que cuida con ternura a sus propios hijos».", "1 Tesalonicenses 2:7"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué preparó Esdras, según Esdras 7:10?", "Su corazón", ["Su espada", "Su casa", "Su viaje"], "«Porque Esdras había preparado su corazón».", "Esdras 7:10"],
      ["m1-02", 1, "o1", "comprender", "¿Qué significa que la enseñanza es un don?", "Que es un servicio que se recibe de Dios para el bien de otros", ["Que solo la tienen los ricos", "Que no hay que prepararse", "Que es un título para presumir"], "Cristo dio maestros para preparar a los creyentes.", "Romanos 12:7"],
      ["m1-03", 1, "o1", "aplicar", "¿Qué debe hacer primero un maestro que va a enseñar un pasaje?", "Estudiarlo y obedecerlo", ["Buscar chistes", "Copiar una clase de internet", "Improvisar"], "«para inquirir la ley de Jehová y para cumplirla».", "Esdras 7:10"],
      ["m1-04", 1, "o1", "recordar", "¿Qué pide Pablo a Timoteo en 1 Timoteo 4:12?", "Que sea ejemplo de los creyentes", ["Que se haga famoso", "Que no enseñe", "Que se calle"], "«sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza».", "1 Timoteo 4:12"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué la humildad es parte del carácter del maestro?", "Porque reconoce lo que no sabe y sigue aprendiendo", ["Porque no debe estudiar", "Porque no debe corregir nunca", "No es parte del carácter del maestro"], "Quien enseña también es alumno de la Palabra.", "Santiago 3:1"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué enseñó Jesús al lavar los pies de sus discípulos?", "Que el maestro enseña sirviendo y con su ejemplo", ["Que la limpieza es lo más importante", "Que los discípulos eran descuidados", "Nada"], "«Porque ejemplo os he dado».", "Juan 13:15"],
      ["m1-07", 2, "o2", "recordar", "¿Dónde mandó Dios hablar de sus palabras, según Deuteronomio 6:7?", "En la casa, en el camino, al acostarse y al levantarse", ["Solo en el templo", "Solo los sábados", "Solo en secreto"], "«y hablarás de ellas estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes».", "Deuteronomio 6:7"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué ayuda saber enseguida si una respuesta es correcta?", "Porque corrige el error a tiempo", ["Porque así no hay que estudiar", "No ayuda", "Porque reemplaza la clase"], "Por eso el repaso muestra la respuesta y su explicación al instante.", "Deuteronomio 6:7"],
      ["m1-09", 2, "o2", "aplicar", "Al final de la clase, el maestro pide a cada alumno que explique con sus palabras lo aprendido. ¿Qué ley de Gregory aplica?", "La del aprendizaje: el alumno reproduce con sus palabras lo que aprendió", ["La del lenguaje", "La del maestro", "Ninguna"], "Explicar con las propias palabras muestra que se aprendió.", "Deuteronomio 6:7"],
      ["m1-10", 2, "o2", "recordar", "¿Qué estudios sobre la memoria cita la lección?", "Los de Roediger y Karpicke y el de Dunlosky y sus colegas", ["Los de Lutero y Calvino", "Los de Moody y Finney", "Ninguno"], "Comparan las técnicas de estudio más usadas.", "Deuteronomio 6:7"],
      ["m1-11", 2, "o2", "analizar", "¿Qué tienen en común los niveles de la academia y Hebreos 5:12-14?", "Van de lo básico a lo maduro, paso a paso", ["Nada", "Empiezan por lo más difícil", "Enseñan todo de una vez"], "«el alimento sólido es para los que han alcanzado madurez».", "Hebreos 5:14"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estas frases resume mejor lo que enseña Hendricks?", "La enseñanza que cambia vidas llega al corazón y hace participar al alumno", ["Basta con dar mucha información", "El alumno solo debe escuchar", "El maestro ya no necesita aprender"], "«sed hacedores de la palabra».", "Santiago 1:22"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pregunta se hace el maestro antes de preparar el contenido?", "¿Qué podrá hacer el alumno al terminar?", ["¿Cuánto tiempo puedo hablar?", "¿Qué chiste voy a contar?", "¿Quién faltó la semana pasada?"], "Todo empieza por el objetivo.", "Nehemías 8:8"],
      ["m1-14", 3, "o3", "comprender", "¿Qué parte de la clase dice la verdad central en una frase?", "La idea clave", ["El repaso", "Para empezar", "Los anuncios"], "La idea clave resume lo que el alumno debe llevarse.", "Nehemías 8:8"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué nivel de Bloom pide el objetivo juzgar si una enseñanza es fiel a la Biblia?", "Evaluar", ["Recordar", "Crear", "Comprender"], "«escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
      ["m1-16", 3, "o3", "recordar", "¿Desde dónde comenzó Jesús a explicar las Escrituras a los de Emaús?", "Desde Moisés, siguiendo por todos los profetas", ["Desde los salmos de David", "Desde el libro de Job", "Desde las cartas de Pablo"], "«Y comenzando desde Moisés, y siguiendo por todos los profetas».", "Lucas 24:27"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué una clase bíblica debe llevar a Cristo?", "Porque las Escrituras hablan de él, como mostró Jesús en el camino a Emaús", ["Por costumbre", "No hace falta", "Para alargar la clase"], "«les declaraba en todas las Escrituras lo que de él decían».", "Lucas 24:27"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas preparaciones es la más completa?", "Un plan escrito con objetivo, partes, tiempos, materiales y preguntas, preparado en oración", ["Leer el pasaje cinco minutos antes", "Buscar un video y ponerlo", "Improvisar según cómo esté el grupo"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hizo Jesús con los setenta cuando volvieron?", "Escuchó lo que habían vivido", ["Nunca los volvió a ver", "Los castigó", "Los envió lejos sin hablarles"], "«Volvieron los setenta con gozo».", "Lucas 10:17"],
      ["m2-02", 4, "o4", "comprender", "¿Para qué sirve una buena pregunta en una clase?", "Para hacer pensar y que cada uno responda por sí mismo", ["Para avergonzar al alumno", "Para llenar el tiempo", "No sirve"], "«Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué método usarías para enseñar a evangelizar?", "La demostración y la práctica: evangelizar junto con los alumnos", ["Solo leer un libro", "Un examen escrito", "Ver un video y no hablar más"], "«Y les dijo: Venid en pos de mí, y os haré pescadores de hombres».", "Mateo 4:19"],
      ["m2-04", 4, "o4", "recordar", "¿Qué recursos visuales recomienda la lección?", "Mapas, líneas de tiempo, videos y esquemas", ["Ninguno", "Solo la pizarra", "Solo diapositivas llenas de texto"], "Lo que se ve ayuda a entender y a recordar.", "Mateo 13:34"],
      ["m2-05", 4, "o4", "analizar", "¿Cuándo conviene la exposición breve del maestro?", "Para presentar lo que el alumno no puede descubrir solo", ["Siempre, durante toda la clase", "Nunca", "Solo para contar chistes"], "El método se escoge según el objetivo.", "Juan 16:12"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál es el mejor método para un grupo de jóvenes que se distraen con una charla larga?", "Alternar explicaciones cortas con preguntas, casos y práctica", ["Hablar más fuerte y más tiempo", "Suspender la clase", "Dar solo un examen"], "«Aún tengo muchas cosas que deciros, pero ahora no las podéis sobrellevar».", "Juan 16:12"],
      ["m2-07", 5, "o5", "recordar", "¿Qué dos clases de evaluación distingue la lección?", "La formativa, que acompaña, y la final, que mide el resultado", ["La fácil y la difícil", "La oral y la cantada", "La pública y la secreta"], "Las dos sirven, cada una a su tiempo.", "Proverbios 27:23"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué cada pregunta del examen debe medir un objetivo?", "Para que el examen cubra toda la materia y no solo un tema", ["Para que el examen sea más largo", "Para confundir al alumno", "No hace falta"], "Lo dice la tabla de especificaciones.", "Proverbios 11:1"],
      ["m2-09", 5, "o5", "aplicar", "Vas a evaluar el sermón de un alumno. ¿Qué herramienta usas?", "Una rúbrica con criterios y puntos conocidos de antemano", ["Tu impresión del momento", "Una pregunta de verdadero o falso", "Nada: cualquier sermón aprueba"], "«Mas la pesa cabal le agrada».", "Proverbios 11:1"],
      ["m2-10", 5, "o5", "recordar", "¿Qué dice Proverbios 11:1 del peso falso?", "Que es abominación a Jehová", ["Que es útil en los negocios", "Que no importa", "Que agrada a Dios"], "«El peso falso es abominación a Jehová».", "Proverbios 11:1"],
      ["m2-11", 5, "o5", "analizar", "¿Qué tienen en común el pastor que conoce sus ovejas y el maestro que evalúa?", "Los dos se ocupan de conocer el estado de los que cuidan", ["Los dos buscan ganar dinero", "Ninguno se interesa por los demás", "Nada"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál es la mejor corrección de un error en una tarea?", "Señalarlo pronto, explicar por qué y mostrar cómo mejorar, con paciencia", ["Poner una nota sin comentario", "Burlarse del error", "No decir nada"], "«exhorta con toda paciencia y doctrina».", "2 Timoteo 4:2"],
      ["m2-13", 6, "o6", "recordar", "¿Cómo fue Pablo entre los tesalonicenses, según 1 Tesalonicenses 2:7?", "Tierno, como la nodriza que cuida a sus hijos", ["Severo, como un juez", "Distante, como un rey", "Callado, como un extraño"], "«Antes fuimos tiernos entre vosotros».", "1 Tesalonicenses 2:7"],
      ["m2-14", 6, "o6", "comprender", "¿De qué aprende el alumno, según Filipenses 4:9?", "De lo que oye y de lo que ve en su maestro", ["Solo de lo que lee", "Solo de los exámenes", "De nada"], "«Lo que aprendisteis y recibisteis y oísteis y visteis en mí, esto haced».", "Filipenses 4:9"],
      ["m2-15", 6, "o6", "aplicar", "Una persona que acompañas lleva dos semanas sin estudiar. ¿Qué haces como su mentor?", "Le escribes con cariño, oras por ella y la ayudas a retomar", ["Esperas a que vuelva sola", "La borras de la lista", "Lo comentas con todos"], "«Manzana de oro con figuras de plata Es la palabra dicha como conviene».", "Proverbios 25:11"],
      ["m2-16", 6, "o6", "recordar", "¿Bajo quién sirven el profesor y el mentor en la academia?", "Bajo la Dirección académica", ["Bajo nadie", "Bajo los alumnos", "Bajo una empresa externa"], "Cada uno sirve en lo que le corresponde.", "2 Timoteo 2:2"],
      ["m2-17", 6, "o6", "analizar", "¿Cuántas generaciones de enseñanza hay en 2 Timoteo 2:2?", "Cuatro: Pablo, Timoteo, los hombres fieles y los otros", ["Una", "Dos", "Diez"], "«Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué actitud debe evitar el que acompaña a un alumno?", "Controlarlo o meterse en lo que no le corresponde", ["Orar por él", "Animarlo", "Conocer su nombre"], "Acompañar no es controlar.", "1 Tesalonicenses 2:7"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-didactica-e1",
      tipo: "corta",
      pregunta: "Explica, con el ejemplo de Esdras y de Jesús, qué carácter necesita quien enseña.",
      ideas: [
        { id: "estudiar", peso: 25, texto: "Estudiar la Palabra antes de enseñar.", formas: ["estudi*", "inquirir", "prepar*"] },
        { id: "vivir", peso: 30, texto: "Vivir lo que enseña: obedecer y dar ejemplo.", formas: ["vivir lo que", "vive lo que", "cumplir*", "obedec*", "ejemplo", "coherencia"] },
        { id: "amor", peso: 20, texto: "Amar a los alumnos y servirlos.", formas: ["amor", "ama a", "servir", "sirve", "lavo los pies", "paciencia"] },
        { id: "espiritu", peso: 15, texto: "Ser humilde y depender del Espíritu Santo.", formas: ["espiritu", "humild*", "depende*"] },
      ],
      citas: ["Esdras 7:10", "Juan 13:13-15", "Juan 13:15", "Santiago 3:1", "1 Timoteo 4:12", "2 Timoteo 2:15", "Juan 14:26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Como Esdras, que preparó su corazón para estudiar la ley, cumplirla y enseñarla (Esdras 7:10), el maestro estudia primero y vive lo que enseña. Como Jesús, que lavó los pies de sus discípulos, enseña con su ejemplo y sirviendo con amor. Además es humilde y depende del Espíritu Santo.",
    },
    {
      id: "n5-didactica-e2",
      tipo: "corta",
      pregunta: "Explica qué muestran los estudios sobre cómo se aprende y cómo lo aplicarías en una clase.",
      ideas: [
        { id: "recordar", peso: 25, texto: "Tratar de recordar enseña más que releer.", formas: ["tratar de recordar", "recordar", "recuerdan", "releer", "preguntas"] },
        { id: "espaciado", peso: 25, texto: "Repasar con espacios graba mejor.", formas: ["espacio*", "espaciad*", "dias distintos", "varios dias", "21 dias", "repasar"] },
        { id: "inmediato", peso: 15, texto: "Saber enseguida si acertó corrige el error a tiempo.", formas: ["enseguida", "al instante", "corrige el error", "retroaliment*", "inmediat*"] },
        { id: "practica", peso: 25, texto: "Practicar y aplicar lo aprendido.", formas: ["practic*", "aplic*", "particip*", "haciendo"] },
      ],
      citas: ["Deuteronomio 6:6-7", "Deuteronomio 6:7", "Hebreos 5:12-14", "Santiago 1:22", "Nehemías 8:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los estudios muestran que se aprende más tratando de recordar que releyendo, y que repasar con espacios, en días distintos, graba mejor. Saber enseguida si uno acertó corrige el error. En mi clase haría preguntas de repaso, volvería al tema la semana siguiente y pediría practicar lo aprendido, como manda Deuteronomio 6:7.",
    },
    {
      id: "n5-didactica-e3",
      tipo: "corta",
      pregunta: "Explica cómo se escribe un buen objetivo de aprendizaje y da un ejemplo.",
      ideas: [
        { id: "alumno", peso: 25, texto: "Dice qué podrá hacer el alumno al terminar.", formas: ["podra hacer", "al terminar", "el alumno podra", "lo que el alumno"] },
        { id: "verbo", peso: 35, texto: "Usa un verbo que se puede comprobar, no solo saber o entender.", formas: ["verbo", "comprobar", "medible", "medir", "observable"] },
        { id: "bloom", peso: 15, texto: "Se apoya en los niveles de Bloom.", formas: ["bloom", "niveles", "recordar comprender", "evaluar crear"] },
        { id: "ejemplo", peso: 15, texto: "Da un ejemplo correcto.", formas: ["por ejemplo", "explicar", "citar", "comparar", "preparar"] },
      ],
      citas: ["Nehemías 8:8", "Lucas 24:27", "Juan 3:16", "Hechos 17:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un buen objetivo dice qué podrá hacer el alumno al terminar, con un verbo que se pueda comprobar, como explicar o citar, y no solo saber o entender. Se apoya en los niveles de Bloom. Por ejemplo: el alumno podrá explicar con sus palabras qué es la gracia, como los levitas ponían el sentido (Nehemías 8:8).",
    },
    {
      id: "n5-didactica-e4",
      tipo: "breve",
      pregunta:
        "Prepara el plan de una clase bíblica breve sobre un pasaje que escojas: el objetivo medible, las partes de la clase con su tiempo, el método que usarás y cómo comprobarás lo que aprendieron. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "pasaje", peso: 10, texto: "El pasaje escogido.", formas: ["escogi", "el pasaje", "mi clase"] },
        { id: "objetivo", peso: 20, texto: "El objetivo medible.", formas: ["objetivo", "podra", "al terminar"] },
        { id: "partes", peso: 25, texto: "Las partes de la clase con su tiempo.", formas: ["para empezar", "idea clave", "minutos", "para la vida", "introduccion"] },
        { id: "metodo", peso: 20, texto: "El método que usará.", formas: ["pregunta*", "historia", "grupos", "practica", "caso", "metodo"] },
        { id: "comprobar", peso: 15, texto: "Cómo comprobará lo aprendido.", formas: ["comprobar", "evaluar", "evaluacion", "repaso", "rubrica"] },
        { id: "cristo", peso: 10, texto: "Lleva a la Palabra y a Cristo.", formas: ["cristo", "jesus", "evangelio"] },
      ],
      basta: 85,
      citas: ["Nehemías 8:8", "Lucas 24:27", "Esdras 7:10", "Mateo 13:34", "Mateo 16:15", "Juan 16:12", "Lucas 15:1-7", "Lucas 15:11-24", "Juan 3:16", "Salmos 23:1", "Efesios 2:8-9", "Mateo 6:26", "Santiago 1:22", "Deuteronomio 6:6-7", "Deuteronomio 6:7", "Proverbios 27:23", "2 Timoteo 2:2", "Hechos 17:11", "Juan 4:7-14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogí el pasaje de Lucas 15:1-7, la oveja perdida, para una clase de treinta minutos con jóvenes. El objetivo: al terminar, cada alumno podrá explicar con sus palabras cómo busca Dios al perdido y escribirá el nombre de una persona por la que orará. Para empezar (cinco minutos), preguntaré si alguna vez perdieron algo valioso y qué hicieron para encontrarlo. En la Palabra (diez minutos), leeremos el pasaje y explicaré su contexto: Jesús responde a los que murmuraban porque recibía a pecadores. Usaré preguntas y una conversación en grupos de tres, como Jesús, que enseñaba con historias (Mateo 13:34). La idea clave (cinco minutos): Dios busca con gozo a los perdidos, y Cristo vino a buscarlos. Para la vida (cinco minutos), cada uno escribirá el nombre de alguien alejado y oraremos por esa persona. Para comprobar lo aprendido (cinco minutos), haré preguntas de repaso y pediré a dos alumnos que expliquen la idea con sus palabras. La semana siguiente volveremos a repasar, porque así se graba mejor, como Dios mandó repetir sus palabras (Deuteronomio 6:7).",
    },
    {
      id: "n5-didactica-e5",
      tipo: "breve",
      pregunta:
        "Describe cómo evaluarías el aprendizaje en una materia o en un curso que enseñes: qué evaluación formativa y qué evaluación final usarías, cómo harías que sea justa y cómo corregirías a tus alumnos. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "formativa", peso: 20, texto: "La evaluación formativa.", formas: ["formativa", "repaso*", "preguntas en clase", "acompaña"] },
        { id: "final", peso: 15, texto: "La evaluación final.", formas: ["final", "examen", "trabajo practico"] },
        { id: "objetivos", peso: 15, texto: "Medir los objetivos.", formas: ["objetivo*", "tabla de especificaciones", "cada pregunta"] },
        { id: "rubrica", peso: 15, texto: "Rúbricas y criterios conocidos de antemano.", formas: ["rubrica", "criterio*", "de antemano"] },
        { id: "justa", peso: 20, texto: "Que sea justa: las mismas reglas para todos y la posibilidad de revisión.", formas: ["justa", "justicia", "mismas reglas", "revision", "pesa cabal", "peso falso"] },
        { id: "correccion", peso: 15, texto: "Corregir pronto, explicando y con amor.", formas: ["corregi*", "correccion", "paciencia", "con amor", "mejorar"] },
      ],
      basta: 85,
      citas: ["Proverbios 27:23", "Proverbios 11:1", "2 Timoteo 4:2", "Efesios 4:15", "1 Tesalonicenses 2:7", "Hebreos 5:12-14", "Santiago 1:22", "Colosenses 3:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Imaginé un curso de seis clases sobre la oración. Como el pastor que es diligente en conocer el estado de sus ovejas (Proverbios 27:23), usaría una evaluación formativa en cada clase: preguntas en clase, un repaso corto al empezar y una tarea práctica, para ver qué falta cuando todavía hay tiempo de corregir. La evaluación final sería un examen breve y un trabajo práctico: preparar y dirigir un tiempo de oración con su grupo. Cada pregunta del examen mediría uno de los objetivos del curso, y el trabajo práctico se evaluaría con una rúbrica de criterios conocidos de antemano: la base bíblica, la claridad, la participación del grupo y el tiempo. Para que la evaluación sea justa, todos sabrían desde el principio qué se evalúa, las mismas reglas valdrían para todos y cada alumno podría pedir revisión, porque el peso falso es abominación a Jehová (Proverbios 11:1). Al corregir, señalaría los errores pronto, explicaría por qué y mostraría cómo mejorar, con toda paciencia y doctrina (2 Timoteo 4:2), recordando que la nota dice qué falta aprender y no cuánto vale la persona.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-didactica-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo acompañarías durante un mes a un alumno o a un nuevo creyente que empieza a estudiar: cómo lo conocerías, cómo orarías por él, qué harías si se detiene y cómo lo animarías a enseñar también a otros, según el ejemplo de Pablo. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "conocer", peso: 20, texto: "Conocerlo: su nombre, su historia y su ritmo.", formas: ["conoc*", "su historia", "escuchar*", "visitar*"] },
      { id: "orar", peso: 15, texto: "Orar por él.", formas: ["orar*", "oracion", "oro por"] },
      { id: "detiene", peso: 25, texto: "Qué hacer si se detiene.", formas: ["se detiene", "si deja", "dias sin", "le escribiria", "llamar*", "animar*"] },
      { id: "pablo", peso: 15, texto: "El ejemplo de Pablo: ternura y entrega.", formas: ["pablo", "nodriza", "ternura", "timoteo"] },
      { id: "otros", peso: 25, texto: "Animarlo a enseñar a otros.", formas: ["enseñar a otros", "enseñar tambien", "a otros", "otra persona", "multiplic*"] },
    ],
    basta: 85,
    citas: ["1 Tesalonicenses 2:7-8", "1 Tesalonicenses 2:7", "1 Tesalonicenses 2:8", "Filipenses 4:9", "2 Timoteo 2:2", "Proverbios 25:11", "Hebreos 10:24-25", "Gálatas 6:2", "Hechos 16:1-3"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Acompañaría durante un mes a Carlos, un nuevo creyente que empezó el Nivel 1. Primero lo conocería: lo invitaría a tomar un café, escucharía su historia y le preguntaría cómo le gusta estudiar y cuánto tiempo tiene. Oraría por él cada día por su nombre, y una vez por semana oraríamos juntos. Cada domingo le preguntaría cómo va con las lecciones y lo ayudaría con sus dudas. Si se detiene varios días, le escribiría con cariño, sin regañarlo, y le ofrecería estudiar juntos una lección, porque la palabra dicha como conviene es como manzana de oro (Proverbios 25:11). Seguiría el ejemplo de Pablo, que fue tierno como la nodriza que cuida a sus hijos y quiso entregar también su propia vida (1 Tesalonicenses 2:7-8). Al final del mes, le pediría que me cuente lo que aprendió y lo animaría a enseñar a otros lo que recibió, quizás a alguien de su familia, como Pablo encargó a Timoteo que enseñara a hombres fieles que a su vez enseñaran a otros (2 Timoteo 2:2).",
  },
};
