/**
 * El banco de «Misión transcultural» (especialidad Evangelismo y misiones, avanzada). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 cruzar fronteras culturales · o2 el modelo de la encarnación · o3 el evangelio y la cultura · o4 la
 * lengua del corazón · o5 el misionero y su familia · o6 las naciones en la ciudad · o7 el versículo de memoria
 * (Hechos 10:34-35).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `evangelismo-misiones-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_EVANGELISMO_MISIONES_4: BancoMateria = {
  materia: "evangelismo-misiones-4",
  repaso: {
    "evangelismo-misiones-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué comprendió Pedro en casa de Cornelio, según Hechos 10:34?", "Que Dios no hace acepción de personas", ["Que los gentiles no podían salvarse", "Que debía volver a Jerusalén", "Que Cornelio debía hacerse judío primero"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34-35"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es la cultura, según la lección?", "La manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de ver el mundo", ["Solo el arte y la música", "Lo que se aprende en la escuela", "La religión de un país"], "Tiene cosas buenas, neutras y otras que el evangelio corrige.", "Hechos 17:26-27"],
      ["1-r3", 1, "o1", "aplicar", "¿Qué hace el misionero con la comida, la ropa o la manera de saludar de un pueblo?", "Las respeta, porque son cosas neutras", ["Las prohíbe", "Las cambia por las suyas", "Se burla de ellas"], "Lo que el evangelio transforma es lo que contradice la Palabra.", "Hechos 10:15"],
    ] as P[]).map(p),
    "evangelismo-misiones-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué dice Juan 1:14 del Verbo?", "Que fue hecho carne y habitó entre nosotros", ["Que se quedó lejos", "Que fue un ángel", "Que solo envió mensajes"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["2-r2", 2, "o2", "comprender", "¿Qué hizo Cristo, según Filipenses 2:7?", "Se despojó a sí mismo, tomando forma de siervo", ["Se aferró a su gloria", "Se hizo rey de Roma", "Se apartó de los hombres"], "«sino que se despojó a sí mismo, tomando forma de siervo».", "Filipenses 2:5-7"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué significa identificarse con la gente, según la lección?", "Aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio", ["Hacer todo lo que hace la gente, aunque sea pecado", "Vivir separado de la gente", "Imponer la propia cultura"], "«Me he hecho a los judíos como judío, para ganar a los judíos».", "1 Corintios 9:20"],
    ] as P[]).map(p),
    "evangelismo-misiones-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué propuso Jacobo sobre los gentiles que se convertían, según Hechos 15:19?", "Que no se les inquietara", ["Que se hicieran judíos", "Que se los expulsara", "Que esperaran diez años"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
      ["3-r2", 3, "o3", "comprender", "¿Qué enseña Gálatas 3:28 sobre las diferencias entre los pueblos?", "Que en Cristo todos somos uno", ["Que un pueblo es mejor que otro", "Que hay que borrar todas las culturas", "Que los gentiles son de segunda"], "«todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
      ["3-r3", 3, "o3", "aplicar", "Una costumbre del pueblo no contradice la Palabra. ¿Qué hace la iglesia nueva?", "Puede conservarla, y aun usarla para adorar a Dios", ["La prohíbe siempre", "La cambia por la del misionero", "La esconde"], "La Escritura es la medida de todas las culturas.", "Hechos 15:19-20"],
    ] as P[]).map(p),
    "evangelismo-misiones-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Por qué viene la fe, según Romanos 10:17?", "Por el oír, y el oír, por la palabra de Dios", ["Por las obras", "Por la cultura", "Por la tradición"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
      ["4-r2", 4, "o4", "recordar", "¿Quién publicó en 1569 la primera Biblia completa traducida al español desde los idiomas originales?", "Casiodoro de Reina", ["Cipriano de Valera", "Martín Lutero", "Juan Calvino"], "Se la conoce como la Biblia del Oso.", "Nehemías 8:8"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué hace un buen comunicador del evangelio en otra cultura?", "Comprueba lo que la gente entendió, y no solo lo que dijo", ["Habla más fuerte", "Usa palabras difíciles", "Habla solo en su idioma"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ] as P[]).map(p),
    "evangelismo-misiones-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le pedía el varón macedonio a Pablo en la visión?", "Pasa a Macedonia y ayúdanos", ["Vuelve a Jerusalén", "No vengas", "Escríbenos una carta"], "«Pasa a Macedonia y ayúdanos».", "Hechos 16:9-10"],
      ["5-r2", 5, "o5", "comprender", "¿Qué es el choque cultural?", "Un tiempo de desconcierto al llegar a otra cultura, que es normal y se supera con el tiempo", ["Una pelea entre culturas", "Una enfermedad", "Una falta de fe"], "Primero todo parece nuevo; después llegan el cansancio y la nostalgia; y luego, la adaptación.", "2 Corintios 11:26-27"],
      ["5-r3", 5, "o5", "aplicar", "¿Quiénes también cruzan la frontera cuando va un misionero casado?", "Su cónyuge y sus hijos", ["Solo él", "Nadie más", "Solo su pastor"], "Por eso se cuida a toda la familia.", "Hechos 16:9-10"],
    ] as P[]).map(p),
    "evangelismo-misiones-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué mandó Dios a Israel sobre el extranjero, según Deuteronomio 10:19?", "Amarlo, porque ellos fueron extranjeros en Egipto", ["Expulsarlo", "Ignorarlo", "Cobrarle más"], "«Amaréis, pues, al extranjero; porque extranjeros fuisteis en la tierra de Egipto».", "Deuteronomio 10:18-19"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseñó Jesús sobre recibir al forastero, según Mateo 25:35?", "Que recibirlo es recibirlo a él", ["Que no hay que recibirlo", "Que solo lo reciben los gobiernos", "Que es opcional"], "«fui forastero, y me recogisteis».", "Mateo 25:35"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué hace primero una iglesia para alcanzar a los inmigrantes de su ciudad?", "Conocerlos y servirlos", ["Esperar a que vengan", "Predicarles sin conocerlos", "Pedirles que primero aprendan su idioma"], "Servir primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias.", "Deuteronomio 10:18-19"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: cruzar fronteras culturales (10)
    ["f01", 1, "o1", "recordar", "¿Dónde dijo Pedro que Dios no hace acepción de personas?", "En casa de Cornelio, un centurión romano", ["En el templo de Jerusalén", "En la sinagoga de Nazaret", "En Atenas"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34-35"],
    ["f02", 1, "o1", "recordar", "¿Qué le dijo la voz a Pedro en la visión, según Hechos 10:15?", "Lo que Dios limpió, no lo llames tú común", ["Vete a tu casa", "No comas nada", "Huye de Jope"], "«Lo que Dios limpió, no lo llames tú común».", "Hechos 10:15"],
    ["f03", 1, "o1", "comprender", "¿Qué muro reconoció Pedro en Hechos 10:28?", "Que para un judío era abominable juntarse con un extranjero", ["Que no sabía hablar griego", "Que no tenía dinero", "Que estaba enfermo"], "«Vosotros sabéis cuán abominable es para un varón judío juntarse o acercarse a un extranjero».", "Hechos 10:28"],
    ["f04", 1, "o1", "comprender", "¿Qué le mostró Dios a Pedro, según Hechos 10:28?", "Que a ningún hombre llame común o inmundo", ["Que los gentiles eran impuros", "Que no debía viajar", "Que solo los judíos podían creer"], "«pero a mí me ha mostrado Dios que a ningún hombre llame común o inmundo».", "Hechos 10:28"],
    ["f05", 1, "o1", "recordar", "¿De qué hizo Dios todo el linaje de los hombres, según Hechos 17:26?", "De una sangre", ["De muchas sangres distintas", "Del polvo de cada país", "De los ángeles"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26-27"],
    ["f06", 1, "o1", "comprender", "¿Qué tres clases de cosas tiene toda cultura, según la lección?", "Cosas buenas, cosas neutras y cosas que el evangelio corrige", ["Solo cosas malas", "Solo cosas buenas", "Cosas que nunca importan"], "El misionero aprende a distinguirlas.", "Hechos 17:26-27"],
    ["f07", 1, "o1", "aplicar", "En un pueblo se respeta mucho a los mayores. ¿Qué hace el misionero?", "Lo conserva, porque es algo bueno de esa cultura", ["Lo cambia", "Lo prohíbe", "Lo critica"], "«en toda nación se agrada del que le teme y hace justicia».", "Hechos 10:34-35"],
    ["f08", 1, "o1", "aplicar", "Un pueblo practica la idolatría. ¿Qué hace el evangelio con eso?", "Lo transforma, porque contradice la Palabra", ["Lo deja igual", "Lo mezcla con la fe", "Lo usa en el culto"], "Lo que contradice la Palabra es lo que el evangelio transforma.", "Hechos 17:26-27"],
    ["f09", 1, "o1", "analizar", "¿Por qué los prejuicios frenan la misión?", "Porque hacen ver a otros pueblos como impuros o inferiores, cuando Dios no hace acepción de personas", ["Porque ayudan a elegir mejor", "No la frenan", "Porque otros pueblos no necesitan a Cristo"], "«a ningún hombre llame común o inmundo».", "Hechos 10:28"],
    ["f10", 1, "o7", "recordar", "Completa Hechos 10:34-35: En verdad comprendo que Dios no hace acepción de personas…", "sino que en toda nación se agrada del que le teme y hace justicia", ["sino que solo ama a Israel", "y por eso no envía a nadie", "sino que se agrada solo de los sabios"], "Es el versículo de memoria de la materia.", "Hechos 10:34-35"],
    // ---- lección 2: el modelo de la encarnación (10)
    ["f11", 2, "o2", "recordar", "¿Qué hizo el Verbo, según Juan 1:14?", "Fue hecho carne y habitó entre nosotros", ["Envió un ángel", "Se quedó en el cielo", "Escribió un libro"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f12", 2, "o2", "comprender", "¿Por qué la encarnación es el modelo de la misión?", "Porque Jesús no anunció la salvación desde lejos: vino y vivió entre nosotros", ["Porque fue un milagro", "Porque Jesús evitó a la gente", "No es el modelo"], "«y habitó entre nosotros».", "Juan 1:14"],
    ["f13", 2, "o2", "recordar", "¿Qué sentir pide Pablo en Filipenses 2:5?", "El que hubo también en Cristo Jesús", ["El de los reyes", "El de los sabios del mundo", "El de los fariseos"], "«Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús».", "Filipenses 2:5-7"],
    ["f14", 2, "o2", "comprender", "¿Qué forma tomó Cristo, según Filipenses 2:7?", "Forma de siervo", ["Forma de rey terrenal", "Forma de ángel", "Forma de juez"], "«tomando forma de siervo».", "Filipenses 2:5-7"],
    ["f15", 2, "o2", "recordar", "¿Cómo se hizo Pablo a los judíos, según 1 Corintios 9:20?", "Como judío, para ganar a los judíos", ["Como griego", "Como romano", "Como un extraño"], "«Me he hecho a los judíos como judío, para ganar a los judíos».", "1 Corintios 9:20"],
    ["f16", 2, "o2", "recordar", "¿Qué dijo Rut a Noemí, según Rut 1:16?", "Tu pueblo será mi pueblo, y tu Dios mi Dios", ["Vuelve tú sola", "Me iré a Moab", "No quiero tu pueblo"], "«Tu pueblo será mi pueblo, y tu Dios mi Dios».", "Rut 1:16"],
    ["f17", 2, "o2", "aplicar", "¿Qué hace un misionero que se identifica con la gente?", "Vive cerca, aprende la lengua, escucha y sirve con humildad", ["Vive aparte y solo visita", "Exige que la gente aprenda su idioma", "Se siente superior"], "«tomando forma de siervo».", "Filipenses 2:5-7"],
    ["f18", 2, "o2", "aplicar", "¿Cuál es el límite de la identificación?", "No pecar y no cambiar el evangelio", ["No tiene límites", "No aprender la lengua", "No comer su comida"], "«Me he hecho a los judíos como judío, para ganar a los judíos».", "1 Corintios 9:20"],
    ["f19", 2, "o2", "analizar", "¿Por qué la humildad es clave en la misión transcultural?", "Porque Cristo se despojó a sí mismo, y el misionero sirve sin sentirse superior", ["Porque así se gana dinero", "Porque la gente lo exige", "No es clave"], "«sino que se despojó a sí mismo».", "Filipenses 2:5-7"],
    ["f20", 2, "o2", "evaluar", "¿Qué misionero sigue mejor el modelo de la encarnación?", "Uno que vive cerca de la gente, aprende su lengua, escucha y ama a las personas", ["Uno que vive aparte y solo dirige proyectos", "Uno que impone sus costumbres", "Uno que visita una vez al año"], "«y habitó entre nosotros».", "Juan 1:14"],
    // ---- lección 3: el evangelio y la cultura (10)
    ["f21", 3, "o3", "recordar", "¿Qué pregunta tuvo que responder el concilio de Jerusalén?", "Si los gentiles debían hacerse judíos para seguir a Cristo", ["Si debían construir un templo", "Quién sería el nuevo rey", "Si había que dejar de predicar"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
    ["f22", 3, "o3", "comprender", "¿Qué decidió la iglesia sobre los gentiles?", "No inquietarlos y pedirles solo lo necesario", ["Obligarlos a ser judíos", "No recibirlos", "Pedirles todas las costumbres judías"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
    ["f23", 3, "o3", "recordar", "¿Qué dice Gálatas 3:28 de judíos y griegos?", "Ya no hay judío ni griego", ["Los judíos son mejores", "Los griegos deben ser judíos", "Deben estar separados"], "«Ya no hay judío ni griego».", "Gálatas 3:28"],
    ["f24", 3, "o3", "comprender", "¿Puede una iglesia ser de cualquier cultura?", "Sí, sin dejar de ser de Cristo", ["No, solo de la cultura del misionero", "No, solo de la cultura judía", "Solo si cambia de lengua"], "«todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
    ["f25", 3, "o3", "aplicar", "Algo lo manda la Biblia. ¿Qué se hace en toda cultura?", "Se obedece", ["Se adapta hasta cambiarlo", "Se deja de lado", "Se vota"], "La Escritura es la medida de todas las culturas.", "Gálatas 3:28"],
    ["f26", 3, "o3", "aplicar", "Un misionero quiere que la iglesia nueva use su estilo de música. ¿Qué enseña la lección?", "Que es una costumbre del misionero y no se impone", ["Que es parte del evangelio", "Que debe imponerse", "Que la música está prohibida"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
    ["f27", 3, "o3", "aplicar", "¿Qué se pregunta para saber si una costumbre local se puede conservar?", "Si contradice o no la Palabra", ["Si le gusta al misionero", "Si es moderna", "Si es de un país rico"], "Si no contradice la Palabra, se puede conservar.", "Hechos 15:19-20"],
    ["f28", 3, "o3", "analizar", "¿Cuáles son los dos extremos peligrosos, según la lección?", "Imponer la cultura del misionero como si fuera el evangelio, o aceptar todo lo de una cultura aunque contradiga la Palabra", ["Orar y ayunar", "Aprender la lengua y servir", "No hay extremos"], "La Escritura es la medida de todas las culturas.", "Gálatas 3:28"],
    ["f29", 3, "o3", "analizar", "¿Qué enseña el concilio de Jerusalén para la misión de hoy?", "Que el evangelio no exige cambiar de cultura, sino seguir a Cristo", ["Que todos deben vivir como judíos", "Que la cultura no importa nada", "Que no hay que evangelizar a otros pueblos"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
    ["f30", 3, "o3", "evaluar", "¿Qué iglesia nueva refleja mejor el concilio de Jerusalén?", "Una que obedece la Palabra y adora a Dios con las costumbres buenas de su pueblo", ["Una que copia en todo la cultura del misionero", "Una que mezcla la fe con la idolatría", "Una que rechaza todo lo de su cultura"], "«todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
    // ---- lección 4: la Biblia en la lengua del corazón (10)
    ["f31", 4, "o4", "recordar", "¿Qué hacían los que leían la ley en tiempos de Esdras, según Nehemías 8:8?", "Leían claramente y ponían el sentido para que entendieran", ["Leían en voz baja", "Leían sin explicar", "Leían solo para los sacerdotes"], "«leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f32", 4, "o4", "comprender", "¿Por qué importa la lengua del corazón?", "Porque es la lengua de la casa y de la infancia, la que habla al corazón", ["Porque es la más difícil", "Porque es la de los ricos", "No importa"], "«Así que la fe es por el oír».", "Romanos 10:17"],
    ["f33", 4, "o4", "recordar", "¿Cómo se conoce la Biblia que publicó Casiodoro de Reina en 1569?", "Como la Biblia del Oso", ["Como la Biblia del León", "Como la Biblia de Lutero", "Como la Vulgata"], "Fue la primera Biblia completa traducida al español desde los idiomas originales.", "Nehemías 8:8"],
    ["f34", 4, "o4", "recordar", "¿Quién publicó en 1602 la revisión de la Biblia de Reina?", "Cipriano de Valera", ["Casiodoro de Reina", "Erasmo", "Juan Wesley"], "De ese trabajo viene la Reina-Valera.", "Nehemías 8:8"],
    ["f35", 4, "o4", "comprender", "¿Qué dice la lección de los pueblos que hoy no tienen la Biblia completa?", "Que todavía hay pueblos que no la tienen en su propia lengua", ["Que ya no hay ninguno", "Que no la necesitan", "Que deben leerla en español"], "«el oír, por la palabra de Dios».", "Romanos 10:17"],
    ["f36", 4, "o4", "aplicar", "¿Qué significa comunicar bien, según Nehemías 8:8?", "Lograr que la gente entienda", ["Hablar mucho", "Usar palabras difíciles", "Leer rápido"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f37", 4, "o4", "aplicar", "¿Qué hace el misionero con la lengua de la gente?", "La aprende, aunque cueste años", ["La evita", "La reemplaza por la suya", "La aprende solo para saludar"], "Aprender la lengua de la gente, aunque cueste años.", "Romanos 10:17"],
    ["f38", 4, "o4", "aplicar", "¿Qué clase de ejemplos usa el que comunica el evangelio en otra cultura?", "Palabras, ejemplos e historias que la gente entienda", ["Ejemplos de su propio país solamente", "Palabras técnicas", "Ningún ejemplo"], "«y ponían el sentido».", "Nehemías 8:8"],
    ["f39", 4, "o4", "analizar", "¿Por qué apoyar la traducción de la Biblia es parte de la misión?", "Porque la fe viene por oír la palabra de Dios, y cada pueblo necesita entenderla en su lengua", ["Porque es un negocio", "Porque así nadie necesita la iglesia", "No es parte de la misión"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
    ["f40", 4, "o4", "evaluar", "¿Qué estrategia de comunicación es mejor en otra cultura?", "Aprender la lengua, usar ejemplos del lugar, comprobar lo entendido y formar líderes que enseñen en su lengua", ["Hablar siempre en el idioma del misionero", "Repetir el mismo sermón de su país", "Usar un traductor sin aprender nada"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
    // ---- lección 5: el misionero y su familia (10)
    ["f41", 5, "o5", "recordar", "¿Cómo supo Pablo que debía ir a Macedonia?", "Por la visión de un varón macedonio que le pedía ayuda", ["Por una carta del emperador", "Por casualidad", "Porque allí tenía familia"], "«Pasa a Macedonia y ayúdanos».", "Hechos 16:9-10"],
    ["f42", 5, "o5", "comprender", "¿Qué hizo el equipo de Pablo después de la visión?", "Partió dando por cierto que Dios los llamaba", ["Esperó varios años", "Discutió y se dividió", "Volvió a casa"], "«dando por cierto que Dios nos llamaba para que les anunciásemos el evangelio».", "Hechos 16:9-10"],
    ["f43", 5, "o5", "recordar", "¿Qué menciona Pablo entre las pruebas de su ministerio, según 2 Corintios 11:27?", "Trabajo, fatiga, desvelos, hambre y sed", ["Fama y riquezas", "Descanso y comodidad", "Fiestas y viajes de placer"], "«en trabajo y fatiga, en muchos desvelos, en hambre y sed».", "2 Corintios 11:26-27"],
    ["f44", 5, "o5", "comprender", "¿Qué pasa al principio del choque cultural?", "Todo parece nuevo y atractivo", ["Todo parece igual", "Llega enseguida la adaptación", "No pasa nada"], "Después llegan el cansancio, la frustración y la nostalgia.", "2 Corintios 11:26-27"],
    ["f45", 5, "o5", "comprender", "¿Cómo termina el proceso del choque cultural?", "Con la adaptación, con el tiempo", ["Con el regreso obligado", "Con la pérdida de la fe", "Nunca termina"], "El choque cultural es normal.", "2 Corintios 11:26-27"],
    ["f46", 5, "o5", "aplicar", "¿Qué prepara el misionero antes de ir?", "La Palabra, la lengua, la cultura y la salud", ["Solo la maleta", "Solo el dinero", "Nada"], "«dando por cierto que Dios nos llamaba».", "Hechos 16:9-10"],
    ["f47", 5, "o5", "aplicar", "¿Por qué el misionero va enviado por una iglesia?", "Para no ir solo: la iglesia lo respalda, lo sostiene y le pide cuentas", ["Para que la iglesia lo controle desde lejos", "No hace falta", "Para conseguir un título"], "Va enviado, con descanso y rendición de cuentas.", "Hechos 16:9-10"],
    ["f48", 5, "o5", "aplicar", "¿Qué hace la iglesia cuando el misionero regresa?", "Lo recibe y lo acompaña", ["Lo olvida", "Le pide que se vaya otra vez enseguida", "Lo critica"], "Volver también es parte del camino.", "Hechos 16:9-10"],
    ["f49", 5, "o5", "analizar", "¿Por qué Pablo no ocultó lo que costaba la misión?", "Porque el misionero necesita saber que habrá pruebas", ["Porque quería asustar a todos", "Porque no le gustaba su trabajo", "No lo dijo"], "«en trabajo y fatiga, en muchos desvelos».", "2 Corintios 11:26-27"],
    ["f50", 5, "o5", "evaluar", "¿Qué plan cuida mejor a una familia misionera?", "Preparación, envío por una iglesia, descanso, cuidado de los hijos, rendición de cuentas y acompañamiento al volver", ["Enviarla sin preparación", "Sostenerla solo el primer año", "Que se arregle sola"], "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba.", "Hechos 16:9-10"],
    // ---- lección 6: las naciones a la puerta de casa (10)
    ["f51", 6, "o6", "recordar", "¿Qué le da Dios al extranjero, según Deuteronomio 10:18?", "Pan y vestido", ["Castigo", "Nada", "Tierras ajenas"], "«que ama también al extranjero dándole pan y vestido».", "Deuteronomio 10:18-19"],
    ["f52", 6, "o6", "comprender", "¿Por qué debía Israel amar al extranjero?", "Porque ellos fueron extranjeros en la tierra de Egipto", ["Porque era una ley del rey", "Porque los extranjeros eran ricos", "Por conveniencia"], "«porque extranjeros fuisteis en la tierra de Egipto».", "Deuteronomio 10:18-19"],
    ["f53", 6, "o6", "recordar", "¿Qué dijo Jesús del forastero en Mateo 25:35?", "Fui forastero, y me recogisteis", ["El forastero no es mi problema", "Echad al forastero", "El forastero debe irse"], "«fui forastero, y me recogisteis».", "Mateo 25:35"],
    ["f54", 6, "o6", "recordar", "¿Qué pidió Dios a los judíos que vivían en Babilonia, según Jeremías 29:7?", "Que procuraran la paz de la ciudad y oraran por ella", ["Que huyeran", "Que se encerraran", "Que pelearan contra la ciudad"], "«procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová».", "Jeremías 29:7"],
    ["f55", 6, "o6", "comprender", "¿Hace falta viajar a otro país para hacer misión transcultural?", "No: en muchas ciudades viven personas de muchos países y lenguas", ["Sí, siempre", "Sí, y solo en avión", "Solo si hay dinero"], "Las naciones también viven en tu calle.", "Mateo 25:35"],
    ["f56", 6, "o6", "aplicar", "¿Cuál es un buen primer servicio a los inmigrantes de la ciudad?", "Clases de idioma, ayuda con trámites, comidas y apoyo a las familias", ["Pedirles dinero", "Ignorarlos hasta que aprendan el idioma", "Predicarles sin conocerlos"], "«que ama también al extranjero dándole pan y vestido».", "Deuteronomio 10:18-19"],
    ["f57", 6, "o6", "aplicar", "¿Cómo se ofrece la Biblia a un grupo de otra lengua?", "En su lengua, o con alguien que traduzca", ["Solo en la lengua de la iglesia", "No se ofrece", "Solo por escrito, sin explicar"], "Ofrecer estudios bíblicos en su lengua, o con alguien que traduzca.", "Mateo 25:35"],
    ["f58", 6, "o6", "aplicar", "¿Por qué formar líderes de la misma cultura?", "Para que la obra continúe entre su propia gente", ["Para que el misionero descanse siempre", "No hace falta", "Para separarlos de la iglesia"], "Formar líderes de esa misma cultura para que la obra continúe.", "Jeremías 29:7"],
    ["f59", 6, "o6", "analizar", "¿Qué oportunidad tienen hoy muchas iglesias hispanas de los Estados Unidos?", "Alcanzar también a inmigrantes de otras lenguas y culturas", ["Cerrarse a su propio grupo", "Dejar la misión a otros", "Olvidar su historia"], "Muchas nacieron entre inmigrantes.", "Deuteronomio 10:18-19"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan para alcanzar a una comunidad de inmigrantes es mejor?", "Conocerla, servirla, hacer amistad, ofrecer la Palabra en su lengua y formar líderes de su cultura", ["Invitarla una vez al culto y esperar", "Pedirle que primero aprenda el idioma", "Ayudarla solo a cambio de que asista"], "«fui forastero, y me recogisteis».", "Mateo 25:35"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Quién era Cornelio?", "Un centurión romano", ["Un sacerdote judío", "Un pescador de Galilea", "Un rey de Egipto"], "En su casa, Pedro anunció el evangelio a los gentiles.", "Hechos 10:34-35"],
      ["m1-02", 1, "o1", "comprender", "¿Qué tienen en común todos los pueblos, según Hechos 17:26-27?", "El mismo origen y la misma necesidad de Dios", ["La misma lengua", "La misma comida", "Las mismas costumbres"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26-27"],
      ["m1-03", 1, "o1", "aplicar", "Sientes rechazo por la gente de otro país. ¿Qué enseña Hechos 10?", "Que Dios no hace acepción de personas y que a ninguno hay que llamar común", ["Que el rechazo es normal y no importa", "Que cada pueblo debe quedarse con los suyos", "Que solo hay que evangelizar a los parecidos"], "«a ningún hombre llame común o inmundo».", "Hechos 10:28"],
      ["m1-04", 1, "o1", "recordar", "¿Qué cosas neutras de una cultura menciona la lección?", "La comida, la ropa, la música o la manera de saludar", ["La idolatría", "La injusticia", "La mentira"], "Lo neutro se respeta.", "Hechos 17:26-27"],
      ["m1-05", 1, "o1", "analizar", "¿Para qué le dio Dios a Pedro una visión antes de enviarlo a Cornelio?", "Para quitarle el prejuicio que lo separaba de los gentiles", ["Para castigarlo", "Para que no fuera", "Para que comiera más"], "«Lo que Dios limpió, no lo llames tú común».", "Hechos 10:15"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud hacia otra cultura es la más bíblica?", "Respetar lo bueno y lo neutro, y dejar que el evangelio transforme lo que contradice la Palabra", ["Rechazarla toda", "Aceptarla toda sin discernir", "Imponer la propia"], "«en toda nación se agrada del que le teme y hace justicia».", "Hechos 10:34-35"],
      ["m1-07", 2, "o2", "recordar", "¿Qué no estimó Cristo como cosa a que aferrarse, según Filipenses 2:6?", "El ser igual a Dios", ["Su amor por los hombres", "Su servicio", "Su obediencia"], "«no estimó el ser igual a Dios como cosa a que aferrarse».", "Filipenses 2:5-7"],
      ["m1-08", 2, "o2", "comprender", "¿Qué muestra la historia de Rut?", "Lo que es abrazar de corazón a otro pueblo", ["Que hay que quedarse siempre en el propio pueblo", "Que los moabitas no podían creer", "Que la familia no importa"], "«Tu pueblo será mi pueblo, y tu Dios mi Dios».", "Rut 1:16"],
      ["m1-09", 2, "o2", "aplicar", "Llegas a un pueblo nuevo como misionero. ¿Qué haces primero?", "Escuchar y aprender de la gente antes de enseñar", ["Enseñar desde el primer día sin escuchar", "Criticar sus costumbres", "Vivir aparte"], "«y habitó entre nosotros».", "Juan 1:14"],
      ["m1-10", 2, "o2", "recordar", "¿De qué estaba lleno el Verbo hecho carne, según Juan 1:14?", "De gracia y de verdad", ["De enojo", "De orgullo", "De riquezas"], "«lleno de gracia y de verdad».", "Juan 1:14"],
      ["m1-11", 2, "o2", "analizar", "¿Qué tienen en común la encarnación y 1 Corintios 9:20?", "Las dos muestran acercarse a la gente y vivir entre ella para salvarla", ["Las dos hablan de dinero", "Ninguna habla de la misión", "Las dos piden alejarse de la gente"], "«Me he hecho a los judíos como judío, para ganar a los judíos».", "1 Corintios 9:20"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué ama más un misionero que se identifica con la gente?", "A las personas, y no solo los proyectos", ["Sus propios proyectos", "Su comodidad", "Su fama"], "«tomando forma de siervo».", "Filipenses 2:5-7"],
      ["m1-13", 3, "o3", "recordar", "¿Quién propuso no inquietar a los gentiles, según la lección?", "Jacobo", ["Pedro", "Pablo", "Bernabé"], "«Por lo cual yo juzgo que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
      ["m1-14", 3, "o3", "comprender", "¿Qué no hacen las diferencias entre pueblos en Cristo?", "No separan: todos son uno en Cristo", ["No existen", "Hacen a unos mejores que otros", "Impiden la fe"], "«todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
      ["m1-15", 3, "o3", "aplicar", "Un misionero exige que los nuevos creyentes se vistan como en su país. ¿Qué pregunta debió hacerse?", "Si es solo una costumbre suya o algo que manda la Biblia", ["Si la ropa es cara", "Si a la gente le gusta", "Ninguna"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
      ["m1-16", 3, "o3", "recordar", "¿Qué es la medida de todas las culturas, según la lección?", "La Escritura", ["La cultura del misionero", "La mayoría", "La tradición de cada pueblo"], "Ni imponer la cultura del misionero ni aceptar lo que contradice la Palabra.", "Gálatas 3:28"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué no se debe imponer la cultura del misionero?", "Porque haría pensar que el evangelio exige cambiar de cultura", ["Porque esa cultura es mala", "Porque los misioneros no tienen cultura", "Sí se debe imponer"], "«que no se inquiete a los gentiles que se convierten a Dios».", "Hechos 15:19-20"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué decisión sobre una costumbre local es más sabia?", "Conservarla si no contradice la Palabra, y transformarla si la contradice", ["Prohibir todas las costumbres", "Aceptarlas todas sin examinar", "Copiar las del misionero"], "La Escritura es la medida de todas las culturas.", "Gálatas 3:28"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hace falta para oír de verdad, según la lección?", "Entender", ["Gritar", "Tener dinero", "Saber griego"], "«Así que la fe es por el oír».", "Romanos 10:17"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué fue importante la Biblia del Oso?", "Porque fue la primera Biblia completa traducida al español desde los idiomas originales", ["Porque fue la primera Biblia en inglés", "Porque tenía dibujos", "Porque la escribió Lutero"], "La publicó Casiodoro de Reina en 1569.", "Nehemías 8:8"],
      ["m2-03", 4, "o4", "aplicar", "Enseñas a personas que no conocen la Biblia. ¿Qué haces al terminar?", "Pregunto qué entendieron, para comprobarlo", ["Me voy sin preguntar", "Repito lo mismo más fuerte", "Uso palabras más difíciles"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m2-04", 4, "o4", "recordar", "¿Qué viene de la Biblia de Reina y de la revisión de Valera?", "La Reina-Valera que leemos hoy", ["La Vulgata latina", "La Biblia de Lutero", "La Septuaginta"], "Valera publicó su revisión en 1602.", "Nehemías 8:8"],
      ["m2-05", 4, "o4", "analizar", "¿Qué relación hay entre Romanos 10:17 y la traducción de la Biblia?", "Si la fe viene por oír la palabra, cada pueblo necesita oírla en una lengua que entienda", ["Ninguna", "Que la Biblia no debe traducirse", "Que basta una sola lengua para todos"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué muestra mejor que el mensaje llegó al corazón?", "Que la gente lo entendió y lo puede explicar con sus propias palabras", ["Que el predicador habló mucho", "Que se usaron palabras difíciles", "Que la gente aplaudió"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hizo el equipo de Pablo al ver la visión de Macedonia?", "Procuró partir enseguida", ["Esperó un año", "Volvió a Jerusalén", "Ignoró la visión"], "«en seguida procuramos partir para Macedonia».", "Hechos 16:9-10"],
      ["m2-08", 5, "o5", "comprender", "¿Qué viene después del primer entusiasmo en el choque cultural?", "El cansancio, la frustración y la nostalgia", ["Más entusiasmo", "La riqueza", "El fin de la misión"], "Y con el tiempo viene la adaptación.", "2 Corintios 11:26-27"],
      ["m2-09", 5, "o5", "aplicar", "Un misionero nuevo dice que extraña su país y se siente frustrado. ¿Qué le dices?", "Que es parte normal del choque cultural y que con el tiempo viene la adaptación", ["Que no tiene fe", "Que debe volver enseguida", "Que nunca se adaptará"], "El choque cultural es normal.", "2 Corintios 11:26-27"],
      ["m2-10", 5, "o5", "recordar", "¿Qué peligros menciona Pablo en 2 Corintios 11:26?", "Peligros de ríos, de ladrones, en la ciudad, en el desierto y en el mar", ["Ningún peligro", "Solo peligros de enfermedad", "Solo peligros en Jerusalén"], "«en peligros de ríos, peligros de ladrones».", "2 Corintios 11:26-27"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué la misión empieza con el llamado de Dios confirmado por el equipo?", "Porque así no depende de un impulso personal, sino de Dios y del discernimiento de otros", ["Porque el equipo manda sobre Dios", "No hace falta confirmación", "Porque el llamado no importa"], "«dando por cierto que Dios nos llamaba».", "Hechos 16:9-10"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué iglesia cuida mejor a sus misioneros?", "Una que los prepara, los envía, ora, se comunica con ellos, cuida a su familia y los recibe al volver", ["Una que solo envía dinero", "Una que los olvida", "Una que les exige resultados rápidos"], "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba.", "Hechos 16:9-10"],
      ["m2-13", 6, "o6", "recordar", "¿Qué tendría el pueblo en la paz de la ciudad, según Jeremías 29:7?", "Paz", ["Esclavitud", "Nada", "Pérdida de su fe"], "«porque en su paz tendréis vosotros paz».", "Jeremías 29:7"],
      ["m2-14", 6, "o6", "comprender", "¿Qué enseña Mateo 25:35 sobre servir al forastero?", "Que servirlo es servir a Cristo", ["Que es opcional", "Que solo lo hacen los gobiernos", "Que no importa"], "«fui forastero, y me recogisteis».", "Mateo 25:35"],
      ["m2-15", 6, "o6", "aplicar", "Tu iglesia quiere servir a familias recién llegadas de otro país. ¿Qué podría ofrecer?", "Clases de idioma, ayuda con trámites y comidas", ["Nada, hasta que asistan al culto", "Solo folletos", "Una multa"], "«que ama también al extranjero dándole pan y vestido».", "Deuteronomio 10:18-19"],
      ["m2-16", 6, "o6", "recordar", "¿Dónde vivían los judíos a los que escribió Jeremías?", "En Babilonia, lejos de su tierra", ["En Jerusalén", "En Egipto", "En Roma"], "«procurad la paz de la ciudad a la cual os hice transportar».", "Jeremías 29:7"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué el pasado de Israel en Egipto es un motivo para amar al extranjero?", "Porque ellos sabían lo que es ser extranjero", ["Porque Egipto era rico", "Porque querían volver a Egipto", "No es un motivo"], "«porque extranjeros fuisteis en la tierra de Egipto».", "Deuteronomio 10:18-19"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué muestra mejor que una iglesia alcanza a otra cultura en su ciudad?", "Que forma líderes de esa cultura para que la obra continúe", ["Que tiene muchos folletos en otro idioma", "Que hizo un evento una vez", "Que habla de misiones sin hacer nada"], "Formar líderes de esa misma cultura para que la obra continúe.", "Jeremías 29:7"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "evangelismo-misiones-4-e1",
      tipo: "corta",
      pregunta: "Explica, con el ejemplo de Pedro y Cornelio, qué significa cruzar una frontera cultural con el evangelio.",
      ideas: [
        { id: "cultura", peso: 20, texto: "La cultura es la manera de vivir de un pueblo.", formas: ["cultura", "costumbres", "manera de vivir"] },
        { id: "muro", peso: 25, texto: "Pedro tuvo que cruzar el muro entre judíos y gentiles.", formas: ["gentiles", "extranjero", "muro", "prejuicio*"] },
        { id: "acepcion", peso: 25, texto: "Dios no hace acepción de personas.", formas: ["no hace acepcion", "acepcion de personas", "toda nacion"] },
        { id: "distinguir", peso: 20, texto: "Se conserva lo bueno y lo neutro, y el evangelio transforma lo que contradice la Palabra.", formas: ["neutr*", "transforma", "contradice", "conserva"] },
      ],
      citas: ["Hechos 10:34-35", "Hechos 10:34", "Hechos 10:15", "Hechos 10:28", "Hechos 17:26-27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Cada pueblo tiene su cultura. Pedro tuvo que cruzar el muro que lo separaba de los gentiles: Dios le mostró que a ningún hombre llamara común o inmundo, y en casa de Cornelio entendió que Dios no hace acepción de personas (Hechos 10:34). Se respeta lo bueno y lo neutro, y el evangelio transforma lo que contradice la Palabra.",
    },
    {
      id: "evangelismo-misiones-4-e2",
      tipo: "corta",
      pregunta: "Explica por qué la encarnación de Cristo es el modelo de la misión transcultural.",
      ideas: [
        { id: "encarnacion", peso: 30, texto: "El Verbo se hizo carne y habitó entre nosotros.", formas: ["se hizo carne", "fue hecho carne", "habito entre", "vivio entre", "encarnacion"] },
        { id: "siervo", peso: 25, texto: "Se despojó a sí mismo y tomó forma de siervo.", formas: ["despojo", "siervo", "humild*"] },
        { id: "identificar", peso: 20, texto: "El misionero se identifica: vive cerca, aprende la lengua y escucha.", formas: ["identific*", "lengua", "vive cerca", "como judio", "escucha"] },
        { id: "limite", peso: 15, texto: "Sin pecar ni cambiar el evangelio.", formas: ["sin pecar", "sin cambiar", "no cambia", "el mismo evangelio"], negativa: true },
      ],
      citas: ["Juan 1:14", "Filipenses 2:5-7", "Filipenses 2:7", "1 Corintios 9:20", "1 Corintios 9:19-22"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Cristo no salvó desde lejos: el Verbo fue hecho carne y habitó entre nosotros (Juan 1:14), y se despojó a sí mismo tomando forma de siervo. Así el misionero se identifica con la gente, como Pablo, que se hizo a los judíos como judío: vive cerca, aprende la lengua y sirve con humildad, sin pecar ni cambiar el evangelio.",
    },
    {
      id: "evangelismo-misiones-4-e3",
      tipo: "corta",
      pregunta: "Explica qué decidió el concilio de Jerusalén y cómo se distingue el evangelio de la cultura.",
      ideas: [
        { id: "concilio", peso: 25, texto: "No inquietar a los gentiles: no tenían que hacerse judíos.", formas: ["no se inquiete", "no inquietar", "hacerse judios", "lo necesario"] },
        { id: "uno", peso: 20, texto: "En Cristo todos somos uno.", formas: ["somos uno", "sois uno", "no hay judio", "uno en cristo"] },
        { id: "preguntas", peso: 30, texto: "Lo que manda la Biblia se obedece; la costumbre del misionero no se impone; lo que no contradice la Palabra se conserva.", formas: ["manda la biblia", "lo manda", "no se impone", "costumbre del misionero", "conserva*", "no contradice"], negativa: true },
        { id: "medida", peso: 15, texto: "La Escritura es la medida.", formas: ["medida", "la escritura"] },
      ],
      citas: ["Hechos 15:19-20", "Hechos 15:19", "Hechos 15:28", "Gálatas 3:28"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El concilio de Jerusalén decidió no inquietar a los gentiles: no tenían que hacerse judíos para seguir a Cristo, porque en él todos somos uno. Para distinguir, lo que manda la Biblia se obedece en toda cultura, la costumbre del misionero no se impone y lo que no contradice la Palabra se conserva: la Escritura es la medida (Hechos 15:19).",
    },
    {
      id: "evangelismo-misiones-4-e4",
      tipo: "breve",
      pregunta:
        "Imagina que vas a servir varios años entre un pueblo de otra lengua y cultura. Escribe cómo te prepararías, cómo vivirías entre la gente, cómo distinguirías el evangelio de tus costumbres, cómo comunicarías el mensaje y cómo cuidarías a tu familia. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "preparar", peso: 20, texto: "Cómo se prepararía: el llamado y el envío.", formas: ["prepar*", "llamado", "enviado", "me enviaria"] },
        { id: "vivir", peso: 20, texto: "Vivir entre la gente, como Cristo.", formas: ["viviria", "vivir entre", "cerca de la gente", "identific*", "habito entre"] },
        { id: "distinguir", peso: 20, texto: "Distinguir el evangelio de sus costumbres.", formas: ["costumbres", "no impon*", "contradice", "conserv*", "lo manda la biblia"] },
        { id: "comunicar", peso: 20, texto: "Comunicar en la lengua del pueblo.", formas: ["lengua", "idioma", "entiendan", "entendieron", "ejemplos"] },
        { id: "familia", peso: 20, texto: "Cuidar a la familia.", formas: ["familia", "hijos", "conyuge", "descanso", "rendir cuentas", "choque cultural"] },
      ],
      basta: 85,
      citas: ["Hechos 16:9-10", "Hechos 16:10", "Juan 1:14", "Filipenses 2:5-7", "1 Corintios 9:20", "Hechos 15:19-20", "Gálatas 3:28", "Romanos 10:17", "Nehemías 8:8", "2 Corintios 11:26-27", "Hechos 10:34-35"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero buscaría la confirmación del llamado con mi pastor y mi iglesia, como el equipo de Pablo, que partió dando por cierto que Dios lo llamaba (Hechos 16:10), y me prepararía en la Palabra, la salud y el estudio de la cultura. Iría enviado por mi iglesia. Al llegar, viviría cerca de la gente, como Cristo, que se hizo carne y habitó entre nosotros (Juan 1:14): escucharía mucho, aprendería de ellos y serviría con humildad. Para distinguir el evangelio de mis costumbres, me preguntaría si algo lo manda la Biblia o si es solo una costumbre mía, que no impondría, y conservaría las costumbres del pueblo que no contradicen la Palabra. Aprendería la lengua aunque me cueste años, usaría ejemplos que la gente entienda y comprobaría lo que entendieron. A mi familia la cuidaría con un día de descanso cada semana, tiempo con mis hijos y una persona a quien rendir cuentas, y sabríamos que el choque cultural es normal y que con el tiempo viene la adaptación.",
    },
    {
      id: "evangelismo-misiones-4-e5",
      tipo: "breve",
      pregunta:
        "Un hermano dice que su iglesia no tiene que preocuparse por los inmigrantes de otras culturas que viven en su ciudad, porque eso es tarea de los misioneros en otros países. Respóndele con la Biblia y propón cómo podría la iglesia alcanzarlos. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "extranjero", peso: 25, texto: "Dios ama al extranjero y manda amarlo.", formas: ["extranjero*", "forastero", "egipto"] },
        { id: "cristo", peso: 15, texto: "Recibir al forastero es recibir a Cristo.", formas: ["me recogisteis", "recibirlo a el", "recibir a cristo"] },
        { id: "naciones", peso: 15, texto: "Dios no hace acepción: las naciones están cerca.", formas: ["toda nacion", "las naciones", "acepcion", "somos uno"] },
        { id: "servir", peso: 25, texto: "Conocerlos y servirlos.", formas: ["idioma", "tramites", "comida*", "servir", "amistad", "conozca"] },
        { id: "lideres", peso: 20, texto: "La Palabra en su lengua y líderes de su cultura.", formas: ["lideres", "su lengua", "traduzca", "estudios biblicos"] },
      ],
      basta: 85,
      citas: ["Deuteronomio 10:18-19", "Deuteronomio 10:19", "Mateo 25:35", "Hechos 10:34-35", "Jeremías 29:7", "Gálatas 3:28", "Levítico 19:34"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Entiendo la idea, pero la Biblia muestra que amar al extranjero es tarea de todo el pueblo de Dios. Dios ama al extranjero dándole pan y vestido, y mandó a Israel amarlo, porque ellos fueron extranjeros en Egipto (Deuteronomio 10:18-19). Jesús enseñó que recibir al forastero es recibirlo a él: fui forastero, y me recogisteis (Mateo 25:35). Además, en toda nación Dios se agrada del que le teme (Hechos 10:34-35), y hoy las naciones viven a la puerta de casa: no hace falta tomar un avión para hacer misión transcultural. Propongo que la iglesia primero conozca a los grupos que viven cerca y los sirva: clases de idioma, ayuda con trámites y comidas para las familias. Después podríamos hacer amistad, abrir nuestras casas y ofrecer estudios bíblicos en su lengua o con alguien que traduzca. Con el tiempo, formaríamos líderes de su misma cultura para que la obra continúe entre su gente.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras)
  breve: {
    id: "evangelismo-misiones-4-b1",
    tipo: "breve",
    pregunta:
      "Escribe un plan de seis meses para que tu iglesia o tu grupo alcance a una comunidad de otra cultura que vive en tu ciudad: cómo la conocerán, cómo la servirán, cómo harán amistad, cómo compartirán la Palabra y cómo formarán líderes de esa cultura. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "conocer", peso: 20, texto: "Cómo la conocerán.", formas: ["conocer*", "visitaremos", "visitar", "que necesitan", "quienes son"] },
      { id: "servir", peso: 20, texto: "Cómo la servirán.", formas: ["clases", "idioma", "tramites", "comida*", "servir"] },
      { id: "amistad", peso: 20, texto: "Cómo harán amistad.", formas: ["amistad", "amigos", "invitara", "invitaremos", "su casa"] },
      { id: "palabra", peso: 20, texto: "Cómo compartirán la Palabra.", formas: ["estudio biblico", "estudio", "la biblia", "la palabra", "evangelio"] },
      { id: "lideres", peso: 20, texto: "Cómo formarán líderes de esa cultura.", formas: ["lideres", "formarlas", "formaremos", "su propia gente"] },
    ],
    basta: 85,
    citas: ["Deuteronomio 10:18-19", "Deuteronomio 10:18", "Mateo 25:35", "Gálatas 3:28", "Hechos 10:34-35", "Jeremías 29:7", "Juan 1:14"],
    pesoCita: 10,
    errores: [],
    modelo:
      "En nuestro barrio vive una comunidad de familias haitianas. Mes 1: oraremos por ellas cada semana y visitaremos a algunas familias para conocer quiénes son, qué lengua hablan y qué necesitan, porque Dios ama al extranjero (Deuteronomio 10:18). Mes 2: abriremos en la iglesia clases de inglés los sábados y ayudaremos con trámites, para servir antes de hablar, como enseña Mateo 25:35: fui forastero, y me recogisteis. Mes 3: haremos amistad; cada familia de la iglesia invitará a comer a una familia haitiana a su casa. Mes 4: con la ayuda de un hermano que habla criollo, empezaremos un estudio bíblico en su lengua sobre la vida de Jesús. Mes 5: celebraremos juntos una comida con música de las dos culturas, porque en Cristo todos somos uno (Gálatas 3:28). Mes 6: escogeremos a dos personas de esa comunidad que ya creyeron para formarlas como líderes, para que la obra continúe entre su propia gente. Al terminar, evaluaremos lo que Dios hizo.",
  },
};
