/**
 * El banco de «Dirigir el ministerio de alabanza» (especialidad Alabanza y adoración). SOLO SERVIDOR: respuestas y
 * claves. Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel
 * de Bloom. Objetivos: o1 el director, un siervo que guía · o2 escoger los cantos · o3 preparar el culto y el ensayo ·
 * o4 dirigir con orden y sin manipular · o5 formar el equipo · o6 los problemas comunes · o7 el versículo de memoria
 * (Salmos 33:3).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `alabanza-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_ALABANZA_3: BancoMateria = {
  materia: "alabanza-3",
  repaso: {
    "alabanza-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Por qué fue puesto Quenanías para dirigir el canto?", "Porque era entendido en ello", ["Porque era el mayor", "Porque era rico", "Porque era familiar del rey"], "«fue puesto para dirigir el canto, porque era entendido en ello».", "1 Crónicas 15:22"],
      ["1-r2", 1, "o1", "comprender", "¿Cuál es la tarea principal del director de alabanza, según la lección?", "Guiar al pueblo a mirar a Dios y a responderle", ["Lucir su voz", "Dar un concierto", "Cantar solo todas las partes"], "«el Hijo del Hombre no vino para ser servido, sino para servir».", "Marcos 10:45"],
      ["1-r3", 1, "o1", "aplicar", "¿Quién nombra a los directores de alabanza, según la lección?", "Cada iglesia, bajo la autoridad de sus pastores", ["Los músicos, por votación", "El que canta mejor", "Cualquiera que quiera"], "Quenanías «fue puesto para dirigir el canto».", "1 Crónicas 15:22"],
    ] as P[]).map(p),
    "alabanza-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo pide cantar Salmos 47:7?", "Con inteligencia", ["En silencio", "Solo con instrumentos", "Muy rápido"], "«Cantad con inteligencia».", "Salmos 47:7"],
      ["2-r2", 2, "o2", "comprender", "¿Cuál es la regla de todo lo que se hace en la reunión, según 1 Corintios 14:26?", "Que todo se haga para edificación", ["Que todo sea nuevo", "Que todo sea corto", "Que todo le guste al equipo"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["2-r3", 2, "o2", "aplicar", "Un canto es hermoso, pero solo lo puede cantar el solista porque es muy agudo. ¿Qué conviene?", "Bajarle el tono o escoger otro que el pueblo pueda cantar", ["Cantarlo igual", "Pedirle al pueblo que solo escuche", "Cantarlo más rápido"], "«Cantad a Jehová, toda la tierra».", "Salmos 96:1"],
    ] as P[]).map(p),
    "alabanza-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pide Salmos 33:3?", "Cantarle cántico nuevo y hacerlo bien, tañendo con júbilo", ["Cantar solo himnos antiguos", "Tocar sin ensayar", "Cantar en voz baja"], "«Cantadle cántico nuevo; Hacedlo bien, tañendo con júbilo».", "Salmos 33:3"],
      ["3-r2", 3, "o3", "comprender", "¿Qué enseña Proverbios 21:5 sobre la preparación?", "Que el diligente planifica, y el que se apresura alocadamente va a la pobreza", ["Que planificar es falta de fe", "Que todo debe improvisarse", "Que la prisa da buenos resultados"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué se hace en un ensayo provechoso, según la lección?", "Repasar lo difícil y ensayar las transiciones", ["Tocar solo lo que ya sale bien", "Empezar tarde y terminar cuando sea", "Saltarse la oración"], "«instruidos en el canto para Jehová, todos los aptos».", "1 Crónicas 25:7-8"],
    ] as P[]).map(p),
    "alabanza-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cómo debe hacerse todo en el culto, según 1 Corintios 14:40?", "Decentemente y con orden", ["Con ruido y sin pausa", "Como cada uno quiera", "Rápido"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["4-r2", 4, "o4", "comprender", "¿Qué es manipular al pueblo, según la lección?", "Usar trucos para provocar una emoción", ["Leer un versículo", "Invitar a cantar", "Dar señales al equipo"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
      ["4-r3", 4, "o4", "aplicar", "Entre canto y canto, el director suele dar largos sermones. ¿Qué enseña la lección?", "Que hable poco y claro: una frase o un versículo valen más", ["Que hable aún más", "Que no diga nada nunca", "Que deje hablar al bajista"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ] as P[]).map(p),
    "alabanza-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo describe 1 Crónicas 25:1 a los músicos apartados para el ministerio?", "Como hombres idóneos para la obra de su ministerio", ["Como hombres ricos", "Como extranjeros", "Como hombres sin preparación"], "«hombres idóneos para la obra de su ministerio».", "1 Crónicas 25:1"],
      ["5-r2", 5, "o5", "comprender", "¿Qué enseña que sirvieran juntos el maestro y el discípulo?", "Que los que saben más enseñan a los que empiezan, y todos sirven juntos", ["Que los nuevos no sirven", "Que el maestro sirve solo", "Que no hace falta enseñar"], "«lo mismo el maestro que el discípulo».", "1 Crónicas 25:7-8"],
      ["5-r3", 5, "o5", "aplicar", "Un joven con mucho talento quiere entrar al equipo, pero casi no participa de la vida de la iglesia. ¿Qué se hace?", "Se conversa con él y se lo acompaña a integrarse a la iglesia antes de la plataforma", ["Se lo pone a cantar de inmediato", "Se lo rechaza para siempre", "Se le da el puesto del director"], "«esto encarga a hombres fieles».", "2 Timoteo 2:2"],
    ] as P[]).map(p),
    "alabanza-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hay donde hay celos y contención, según Santiago 3:16?", "Perturbación y toda obra perversa", ["Paz y gozo", "Crecimiento", "Buena música"], "«allí hay perturbación y toda obra perversa».", "Santiago 3:16"],
      ["6-r2", 6, "o6", "comprender", "¿Qué quita la ira, según Proverbios 15:1?", "La blanda respuesta", ["La palabra áspera", "El silencio para siempre", "El volumen alto"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
      ["6-r3", 6, "o6", "aplicar", "Dos cantantes del equipo están molestos entre sí. ¿Cuál es el primer paso?", "Que hablen a solas, como enseñó Jesús", ["Que cada uno cuente su versión al equipo", "Que lo publiquen en las redes", "Que dejen de servir sin hablar"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El director de alabanza: un siervo que guía
    ["f01", 1, "o1", "recordar", "¿Qué cargo tenía Quenanías entre los levitas?", "Principal de los levitas en la música", ["Portero del templo", "Tesorero", "Sumo sacerdote"], "«Y Quenanías, principal de los levitas en la música».", "1 Crónicas 15:22"],
    ["f02", 1, "o1", "comprender", "¿Qué dos cosas se dicen de Quenanías, según la lección?", "Que fue puesto por los responsables y que sabía de música", ["Que era rico y famoso", "Que era joven y alto", "Que era profeta y rey"], "«fue puesto para dirigir el canto, porque era entendido en ello».", "1 Crónicas 15:22"],
    ["f03", 1, "o1", "recordar", "¿Desde cuándo había un director de cantores en Israel, según Nehemías 12:46?", "Desde el tiempo de David y de Asaf", ["Desde Moisés", "Desde Nehemías", "Desde el exilio"], "«desde el tiempo de David y de Asaf, ya de antiguo, había un director de cantores».", "Nehemías 12:46"],
    ["f04", 1, "o1", "recordar", "¿Para qué había un director de cantores, según Nehemías 12:46?", "Para los cánticos y alabanzas y acción de gracias a Dios", ["Para dirigir el ejército", "Para cobrar los impuestos", "Para enseñar la ley"], "«para los cánticos y alabanzas y acción de gracias a Dios».", "Nehemías 12:46"],
    ["f05", 1, "o1", "comprender", "¿Qué enseña Marcos 10:45 a los que dirigen la alabanza?", "Que el líder sirve, como Cristo, que no vino para ser servido", ["Que el líder debe ser servido", "Que solo los pastores sirven", "Que el servicio es para los nuevos"], "«el Hijo del Hombre no vino para ser servido, sino para servir».", "Marcos 10:45"],
    ["f06", 1, "o1", "recordar", "¿Qué decían los que alababan en tiempos de Josafat?", "Glorificad a Jehová, porque su misericordia es para siempre", ["Grande es Josafat", "Vamos a la guerra", "Venceremos a Moab"], "«Glorificad a Jehová, porque su misericordia es para siempre».", "2 Crónicas 20:21-22"],
    ["f07", 1, "o1", "analizar", "¿Cómo debe entenderse la alabanza del pueblo en tiempos de Josafat, según la lección?", "Como la confianza de un pueblo que alabó a Dios antes de ver la victoria, no como una fórmula", ["Como una fórmula para ganar batallas", "Como un concierto para el ejército", "Como una costumbre sin sentido"], "«Y cuando comenzaron a entonar cantos de alabanza».", "2 Crónicas 20:21-22"],
    ["f08", 1, "o1", "aplicar", "Durante el culto, el director se esfuerza por lucir su voz con adornos difíciles. ¿Qué le falta, según la lección?", "Recordar que guía al pueblo a mirar a Cristo, no a él", ["Más adornos", "Más volumen", "Un micrófono mejor"], "«sino para servir».", "Marcos 10:45"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas cualidades es la más importante en un director, según la lección?", "Ser el primero en adorar con sinceridad y servir bajo sus pastores", ["Tener la voz más potente", "Ser el más famoso", "Tocar todos los instrumentos"], "«el Hijo del Hombre no vino para ser servido».", "Marcos 10:45"],
    ["f10", 1, "o7", "recordar", "Completa Salmos 33:3: Cantadle cántico nuevo…", "Hacedlo bien, tañendo con júbilo", ["Cantadlo sin ensayar", "Hacedlo solo en el templo", "Tañedlo en silencio"], "«Cantadle cántico nuevo; Hacedlo bien, tañendo con júbilo».", "Salmos 33:3"],
    // Lección 2 · Escoger las canciones
    ["f11", 2, "o2", "recordar", "¿Qué tipos de cantos menciona Colosenses 3:16?", "Salmos, himnos y cánticos espirituales", ["Solo himnos", "Solo coros", "Marchas y lamentos"], "«con salmos e himnos y cánticos espirituales».", "Colosenses 3:16"],
    ["f12", 2, "o2", "comprender", "¿Qué propósito tienen los cantos, según Colosenses 3:16?", "Enseñar y exhortar unos a otros, y que more la palabra de Cristo", ["Entretener al público", "Llenar el tiempo", "Lucir a los músicos"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
    ["f13", 2, "o2", "recordar", "¿Por qué hay que cantar con inteligencia, según Salmos 47:7?", "Porque Dios es el Rey de toda la tierra", ["Porque es más difícil", "Porque así lo pide el director", "Porque los cantos son largos"], "«Porque Dios es el Rey de toda la tierra; Cantad con inteligencia».", "Salmos 47:7"],
    ["f14", 2, "o2", "comprender", "¿Qué enseña Salmos 96:1 sobre quién canta?", "Que toda la tierra canta: el canto es de toda la congregación", ["Que solo canta el equipo", "Que solo cantan los levitas", "Que solo cantan los jóvenes"], "«Cantad a Jehová, toda la tierra».", "Salmos 96:1"],
    ["f15", 2, "o2", "recordar", "¿Qué clase de cántico pide Salmos 96:1?", "Un cántico nuevo", ["Solo cánticos antiguos", "Un cántico triste", "Un cántico sin palabras"], "«Cantad a Jehová cántico nuevo».", "Salmos 96:1"],
    ["f16", 2, "o2", "comprender", "¿Por qué se escoge un canto, según 1 Corintios 14:26?", "Porque edifica a la iglesia", ["Porque está de moda", "Porque le gusta al equipo", "Porque es fácil de tocar"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f17", 2, "o2", "aplicar", "¿Cómo se elige el tono de un canto, según la lección?", "Para que la congregación pueda cantarlo cómodamente", ["Para lucir al cantante", "El más agudo posible", "Al azar"], "«Cantad a Jehová, toda la tierra».", "Salmos 96:1"],
    ["f18", 2, "o2", "aplicar", "¿Cómo se enseña un canto nuevo, según la lección?", "Se presenta, se repite algunos domingos seguidos y se acompaña con cantos conocidos", ["Se cantan cinco cantos nuevos el mismo día", "Se canta una sola vez", "Se enseña sin la letra"], "«Cantad a Jehová cántico nuevo».", "Salmos 96:1"],
    ["f19", 2, "o2", "evaluar", "¿Qué pasa si todos los cantos de un culto son nuevos, según la lección?", "El pueblo deja de cantar y solo escucha", ["El pueblo canta más", "El culto es más corto", "No pasa nada"], "«Cantad con inteligencia».", "Salmos 47:7"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas listas cumple mejor las cinco preguntas para escoger cantos?", "Cantos bíblicos, centrados en Cristo, en tonos cómodos, sobre el tema del día, con nuevos y conocidos", ["Solo los cantos favoritos del director", "Cantos de moda sin revisar la letra", "Cantos muy agudos para lucir al equipo"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    // Lección 3 · Preparar el culto y el ensayo
    ["f21", 3, "o3", "recordar", "¿Cómo dice Salmos 33:3 que hay que tañer?", "Con júbilo", ["Con tristeza", "Con miedo", "Con prisa"], "«Hacedlo bien, tañendo con júbilo».", "Salmos 33:3"],
    ["f22", 3, "o3", "comprender", "¿Qué dos cosas pide Salmos 33:3 que van juntas?", "Hacerlo bien y con júbilo", ["Hacerlo rápido y fuerte", "Hacerlo solo y en secreto", "Hacerlo largo y lento"], "«Hacedlo bien, tañendo con júbilo».", "Salmos 33:3"],
    ["f23", 3, "o3", "recordar", "¿Cuántos eran los instruidos en el canto para Jehová, según 1 Crónicas 25:7?", "Doscientos ochenta y ocho", ["Doce", "Setenta", "Mil"], "«todos los aptos, fue doscientos ochenta y ocho».", "1 Crónicas 25:7-8"],
    ["f24", 3, "o3", "comprender", "¿Qué enseña que los músicos del templo fueran instruidos?", "Que la preparación es parte del servicio", ["Que el talento no se cultiva", "Que no hacía falta ensayar", "Que solo cantaban los sacerdotes"], "«instruidos en el canto para Jehová, todos los aptos».", "1 Crónicas 25:7-8"],
    ["f25", 3, "o3", "analizar", "¿Por qué improvisar todo cada domingo no es más espiritual, según la lección?", "Porque suele ser falta de preparación, y el diligente planifica", ["Porque improvisar es pecado", "Porque el Espíritu solo obra con listas", "Porque la gente no lo nota"], "«Mas todo el que se apresura alocadamente, de cierto va a la pobreza».", "Proverbios 21:5"],
    ["f26", 3, "o3", "aplicar", "¿Con quién habla el director antes de escoger los cantos, según la lección?", "Con el pastor, sobre el tema y el mensaje del día", ["Solo con el baterista", "Con nadie", "Con otra iglesia"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ["f27", 3, "o3", "aplicar", "¿Cuándo se envía la lista de cantos al equipo, según la lección?", "Con días de anticipación", ["El mismo domingo, en la plataforma", "Nunca", "Después del culto"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ["f28", 3, "o3", "comprender", "¿Por qué un ensayo debe terminar a tiempo, según la lección?", "Para cuidar a las familias del equipo", ["Porque el sonido se apaga", "Porque es la costumbre", "Porque nadie quiere ensayar"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f29", 3, "o3", "analizar", "¿Cuál es la diferencia entre la excelencia y el perfeccionismo, según la lección?", "La excelencia da lo mejor para el Señor; el perfeccionismo busca impresionar y no soporta un error", ["Son lo mismo", "La excelencia es solo para profesionales", "El perfeccionismo agrada más a Dios"], "«como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f30", 3, "o3", "aplicar", "El pastor predicará sobre la fidelidad de Dios. ¿Qué plan de culto es el más adecuado?", "Cantos sobre la fidelidad de Dios, un texto bíblico sobre el tema, transiciones preparadas y tonos cómodos", ["Los cantos más rápidos del repertorio, sin relación con el tema", "Diez cantos nuevos", "Ningún plan, para ver qué pasa"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    // Lección 4 · Dirigir con sencillez y orden
    ["f31", 4, "o4", "recordar", "¿De qué no es Dios, según 1 Corintios 14:33?", "De confusión", ["De paz", "De orden", "De amor"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f32", 4, "o4", "comprender", "¿Qué relación hay entre el orden y el Espíritu, según la lección?", "El orden no apaga al Espíritu: lo sirve", ["El orden apaga al Espíritu", "El Espíritu prohíbe planear", "No tienen relación"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f33", 4, "o4", "recordar", "¿Qué hacía todo el pueblo cuando se echaron los cimientos del templo, según Esdras 3:11?", "Aclamaba con gran júbilo, alabando a Jehová", ["Se quedaba callado", "Se iba a sus casas", "Discutía con los levitas"], "«Y todo el pueblo aclamaba con gran júbilo, alabando a Jehová».", "Esdras 3:11"],
    ["f34", 4, "o4", "comprender", "¿Cuál es la meta del director, según la lección?", "Que todo el pueblo participe", ["Que el equipo luzca", "Que el culto sea largo", "Que la gente aplauda"], "«Y todo el pueblo aclamaba con gran júbilo».", "Esdras 3:11"],
    ["f35", 4, "o4", "aplicar", "¿Qué hace un buen director entre canto y canto?", "Dice una frase breve o lee un versículo que centra al pueblo en Dios", ["Predica un sermón largo", "Cuenta chistes", "Se queda en silencio sin explicar nada"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f36", 4, "o4", "analizar", "¿Cuál de estas acciones es manipulación, según la lección?", "Subir el volumen para forzar una reacción", ["Leer la Escritura", "Invitar a cantar", "Explicar un canto"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f37", 4, "o4", "analizar", "¿Cuál es la diferencia entre guiar y manipular?", "Guiar presenta la verdad y deja obrar al Espíritu; manipular usa trucos para provocar emociones", ["Son lo mismo", "Guiar es más ruidoso", "Manipular es más bíblico"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f38", 4, "o4", "aplicar", "¿Cómo se maneja lo espontáneo en el culto, según la lección?", "Se le deja espacio dentro del orden preparado", ["Se prohíbe", "Se cambia todo el plan", "Se deja para otro día"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f39", 4, "o4", "aplicar", "¿Para qué mira el director a la congregación, según la lección?", "Para cantar con ella y no para ella", ["Para ver quién no canta y señalarlo", "Para lucir mejor", "Porque no sabe la letra"], "«Y todo el pueblo aclamaba con gran júbilo».", "Esdras 3:11"],
    ["f40", 4, "o4", "evaluar", "Un culto tuvo largos silencios, señales que nadie entendía y cambios sin aviso. ¿Qué principio faltó?", "El orden, porque Dios no es Dios de confusión", ["El volumen", "La emoción", "La cantidad de cantos"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    // Lección 5 · Formar el equipo
    ["f41", 5, "o5", "recordar", "¿A quiénes apartaron David y los jefes para el ministerio, según 1 Crónicas 25:1?", "A los hijos de Asaf, de Hemán y de Jedutún", ["A los hijos de Saúl", "A los soldados de Joab", "A los profetas de Baal"], "«apartaron para el ministerio a los hijos de Asaf, de Hemán y de Jedutún».", "1 Crónicas 25:1"],
    ["f42", 5, "o5", "recordar", "¿Con qué instrumentos servían, según 1 Crónicas 25:1?", "Con arpas, salterios y címbalos", ["Con trompetas de guerra", "Con flautas de Egipto", "Sin instrumentos"], "«con arpas, salterios y címbalos».", "1 Crónicas 25:1"],
    ["f43", 5, "o5", "comprender", "¿Qué muestra que los músicos fueran apartados para el ministerio?", "Que el servicio musical se tomaba en serio", ["Que la música era un pasatiempo", "Que cualquiera podía tocar", "Que los músicos vivían aparte del pueblo"], "«hombres idóneos para la obra de su ministerio».", "1 Crónicas 25:1"],
    ["f44", 5, "o5", "recordar", "¿A quiénes manda Pablo encargar lo que Timoteo oyó?", "A hombres fieles que sean idóneos para enseñar también a otros", ["A los más ricos", "A los más famosos", "Solo a los ancianos"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f45", 5, "o5", "comprender", "¿Por qué el director forma a otros, según la lección?", "Para que la obra siga y no dependa de una sola persona", ["Para descansar siempre", "Para tener más fama", "Para irse a otra iglesia"], "«para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f46", 5, "o5", "aplicar", "¿Cuál de estos es un requisito para servir en el equipo, según la lección?", "Un testimonio de vida cristiana", ["Tener instrumentos caros", "Ser el más joven", "Haber estudiado en un conservatorio"], "«hombres idóneos para la obra de su ministerio».", "1 Crónicas 25:1"],
    ["f47", 5, "o5", "aplicar", "¿Cuál es el primer paso para formar a un nuevo miembro, según la lección?", "Invitarlo y conversar sobre por qué quiere servir y cómo está su vida con Dios", ["Ponerlo a dirigir el primer día", "Darle todas las responsabilidades", "No decirle nada"], "«esto encarga a hombres fieles».", "2 Timoteo 2:2"],
    ["f48", 5, "o5", "comprender", "¿Cómo se dan las responsabilidades a un nuevo miembro, según la lección?", "Poco a poco, mientras se lo acompaña", ["Todas de una vez", "Nunca", "Solo si las pide"], "«lo mismo el maestro que el discípulo».", "1 Crónicas 25:7-8"],
    ["f49", 5, "o5", "evaluar", "¿Qué norma se sigue si hay menores en el equipo, según la lección?", "Sirven con permiso de sus padres, acompañados y nunca a solas con un adulto", ["Pueden quedarse a solas con cualquier adulto", "No necesitan permiso", "No pueden servir nunca"], "«entrando el pequeño con el grande».", "1 Crónicas 25:7-8"],
    ["f50", 5, "o5", "analizar", "¿Qué riesgo tiene un ministerio que depende de una sola persona?", "Que la obra se detiene cuando esa persona falta", ["Ninguno", "Que suena mejor", "Que siempre hay menos conflictos"], "«para enseñar también a otros».", "2 Timoteo 2:2"],
    // Lección 6 · Problemas comunes y cómo resolverlos
    ["f51", 6, "o6", "recordar", "¿Qué dos cosas menciona Santiago 3:16 como causa de perturbación?", "Celos y contención", ["Música y danza", "Ayuno y oración", "Paz y gozo"], "«Porque donde hay celos y contención».", "Santiago 3:16"],
    ["f52", 6, "o6", "recordar", "¿Qué hace la palabra áspera, según Proverbios 15:1?", "Hace subir el furor", ["Quita la ira", "Calma al pueblo", "Une al equipo"], "«Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
    ["f53", 6, "o6", "comprender", "¿Qué pide Jesús en Mateo 18:15 cuando un hermano peca contra nosotros?", "Ir y hablarle estando los dos solos", ["Contarlo a toda la iglesia", "Esperar a que él venga", "Hablar mal de él"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
    ["f54", 6, "o6", "recordar", "¿Para qué ora Pablo por un mismo sentir en Romanos 15:6?", "Para que a una voz glorifiquemos a Dios", ["Para que todos canten igual de bien", "Para que no haya música", "Para que gane un estilo"], "«para que unánimes, a una voz, glorifiquéis al Dios y Padre de nuestro Señor Jesucristo».", "Romanos 15:5-6"],
    ["f55", 6, "o6", "comprender", "¿Qué vale más que los gustos musicales, según la lección?", "La unidad de la iglesia", ["El estilo del director", "El volumen", "Los instrumentos nuevos"], "«para que unánimes, a una voz, glorifiquéis al Dios y Padre».", "Romanos 15:5-6"],
    ["f56", 6, "o6", "recordar", "¿Qué les dijo Jesús a sus discípulos cuando ni tenían tiempo para comer?", "Que vinieran aparte a un lugar desierto a descansar un poco", ["Que trabajaran más", "Que ayunaran", "Que se fueran a sus casas para siempre"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ["f57", 6, "o6", "aplicar", "¿Cómo se responde a una queja por el volumen, según la lección?", "Escuchando con mansedumbre, ajustando lo razonable y enseñando", ["Ignorándola", "Subiendo más el volumen", "Discutiendo en público"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
    ["f58", 6, "o6", "aplicar", "¿Cómo se cuida a un equipo cansado, según la lección?", "Con turnos y descanso", ["Con más ensayos", "Sin descanso", "Cambiando a todos"], "«y descansad un poco».", "Marcos 6:31"],
    ["f59", 6, "o6", "evaluar", "Un músico con mucho talento llega siempre tarde y no se prepara. ¿Qué respuesta es la mejor?", "Acuerdos claros y amor firme, hablándolo con él", ["Dejarlo así porque toca bien", "Echarlo sin hablar", "Quejarse con los demás"], "«si te oyere, has ganado a tu hermano».", "Mateo 18:15"],
    ["f60", 6, "o6", "evaluar", "Hay una discusión entre los que prefieren himnos y los que prefieren cantos nuevos. ¿Qué enseña la lección?", "Buscar la unidad y glorificar a Dios a una voz, con equilibrio entre los dos", ["Que gane el grupo más grande", "Cantar solo himnos", "Cantar solo cantos nuevos"], "«para que unánimes, a una voz, glorifiquéis al Dios».", "Romanos 15:5-6"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Quién fue puesto para dirigir el canto cuando David llevó el arca?", "Quenanías, principal de los levitas en la música", ["Abiatar, el sacerdote", "Joab, el general", "Natán, el profeta"], "«Y Quenanías, principal de los levitas en la música, fue puesto para dirigir el canto».", "1 Crónicas 15:22"],
      ["m1-02", 1, "o1", "comprender", "¿Qué recordaba el pueblo en tiempos de Nehemías sobre los cantores?", "Que desde David y Asaf había un director de cantores", ["Que nunca hubo músicos", "Que los cantores eran nuevos", "Que la música estaba prohibida"], "«desde el tiempo de David y de Asaf, ya de antiguo, había un director de cantores».", "Nehemías 12:46"],
      ["m1-03", 1, "o1", "recordar", "¿Para qué vino el Hijo del Hombre, según Marcos 10:45?", "Para servir y para dar su vida en rescate por muchos", ["Para ser servido", "Para reinar en Roma", "Para juzgar a los músicos"], "«para servir, y para dar su vida en rescate por muchos».", "Marcos 10:45"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué hace el director para conocer al pueblo, según la lección?", "Sabe qué puede cantar la iglesia y qué está viviendo", ["Solo escoge lo que le gusta", "No mira a la congregación", "Pregunta solo al equipo"], "«el Hijo del Hombre no vino para ser servido, sino para servir».", "Marcos 10:45"],
      ["m1-05", 1, "o1", "analizar", "¿Qué tenían en común Quenanías y los cantores de Josafat?", "Que servían a Dios guiando al pueblo a alabarlo", ["Que eran reyes", "Que eran soldados", "Que cantaban solos"], "«Glorificad a Jehová, porque su misericordia es para siempre».", "2 Crónicas 20:21-22"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "Salmos 33:3", ["Salmos 47:7", "Colosenses 3:16", "1 Crónicas 15:22"], "«Cantadle cántico nuevo».", "Salmos 33:3"],
      ["m1-07", 2, "o2", "recordar", "¿Qué debe morar en abundancia en nosotros, según Colosenses 3:16?", "La palabra de Cristo", ["La música", "La emoción", "La costumbre"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa cantar con inteligencia, según la lección?", "Que el pueblo entienda lo que canta", ["Cantar canciones difíciles", "Cantar en otro idioma", "Que solo canten los sabios"], "«Cantad con inteligencia».", "Salmos 47:7"],
      ["m1-09", 2, "o2", "aplicar", "¿Cuál de estas preguntas forma parte de las cinco para escoger un canto?", "¿Sirve al tema del culto y al mensaje de ese día?", ["¿Es el más largo?", "¿Lo canta un artista famoso?", "¿Tiene muchos solos?"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué el equilibrio entre cantos de distintas generaciones ayuda a la iglesia?", "Porque permite que todos canten y adoren juntos", ["Porque así el culto es más largo", "Porque los jóvenes no importan", "Porque los mayores no cantan"], "«Cantad a Jehová, toda la tierra».", "Salmos 96:1"],
      ["m1-11", 2, "o2", "evaluar", "Un canto de moda tiene una frase que contradice la Biblia. ¿Qué se decide?", "No se canta, aunque sea popular", ["Se canta porque es popular", "Se canta más bajo", "Se canta cambiando la letra sin permiso"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
      ["m1-12", 2, "o2", "comprender", "¿Qué tiene que ver la edificación con la reunión de la iglesia, según 1 Corintios 14:26?", "Todo lo que se hace en la reunión debe edificar a la iglesia", ["Solo la predicación edifica", "La música no tiene que edificar", "Edificar es construir el templo"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m1-13", 3, "o3", "recordar", "¿Cómo servían los músicos del templo, según 1 Crónicas 25:8?", "Por turnos", ["Todos a la vez, siempre", "Solo los mayores", "Cuando querían"], "«Y echaron suertes para servir por turnos».", "1 Crónicas 25:7-8"],
      ["m1-14", 3, "o3", "recordar", "¿Cómo dice Colosenses 3:23 que hay que hacerlo todo?", "De corazón, como para el Señor y no para los hombres", ["Para que nos vean", "Rápido", "Solo cuando hay público"], "«hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué se prepara para las transiciones del culto, según la lección?", "Cómo se pasa de un canto a otro y los textos bíblicos que se leerán", ["Nada: se improvisa", "Solo el volumen", "Solo las luces"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
      ["m1-16", 3, "o3", "comprender", "¿Cómo empieza un ensayo provechoso, según la lección?", "A tiempo, con oración y una palabra breve", ["Tarde y sin orar", "Con una discusión", "Con el sonido apagado"], "«Hacedlo bien, tañendo con júbilo».", "Salmos 33:3"],
      ["m1-17", 3, "o3", "evaluar", "Un guitarrista se enoja por cada error en el culto y no soporta fallar. ¿Qué le enseña la lección?", "Que la excelencia es dar lo mejor para el Señor, no el perfeccionismo", ["Que debe dejar de tocar", "Que los errores no importan nunca", "Que debe culpar a otros"], "«como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["m1-18", 3, "o3", "analizar", "¿Qué significa que la espontaneidad del domingo descansa en la preparación del sábado?", "Que la buena preparación permite fluir con libertad en el culto", ["Que el sábado se improvisa", "Que el domingo no hay que preparar nada", "Que la espontaneidad es mala"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿De qué es Dios, según 1 Corintios 14:33?", "De paz", ["De confusión", "De ruido", "De prisa"], "«sino de paz».", "1 Corintios 14:33"],
      ["m2-02", 4, "o4", "comprender", "¿Qué distrae al pueblo en un culto, según la lección?", "Los silencios largos, las señales que nadie entiende y los cambios sin aviso", ["La lectura de la Biblia", "La oración", "Los cantos conocidos"], "«pues Dios no es Dios de confusión».", "1 Corintios 14:33"],
      ["m2-03", 4, "o4", "recordar", "¿Por qué alababan a Jehová en Esdras 3:11?", "Porque se echaban los cimientos de la casa de Jehová", ["Porque ganaron una guerra", "Porque llegó el rey", "Porque salieron de Egipto"], "«alabando a Jehová porque se echaban los cimientos de la casa de Jehová».", "Esdras 3:11"],
      ["m2-04", 4, "o4", "aplicar", "¿Cómo invita el director sin presionar, según la lección?", "Explica, anima y deja libre", ["Hace sentir culpable al que no responde", "Promete milagros", "Grita hasta que todos respondan"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-05", 4, "o4", "evaluar", "El director repite un estribillo veinte veces para que la gente llore. ¿Qué es eso?", "Manipulación: usar un truco para provocar una emoción", ["Excelencia", "Orden", "Preparación"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
      ["m2-06", 4, "o4", "analizar", "¿Por qué las señales claras al equipo sirven a la adoración?", "Porque evitan la confusión y ayudan a que el pueblo siga cantando", ["Porque lucen bien", "Porque así se termina antes", "No sirven para nada"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-07", 5, "o5", "recordar", "¿Quiénes servían juntos, según 1 Crónicas 25:8?", "El pequeño con el grande, el maestro con el discípulo", ["Solo los grandes", "Solo los maestros", "Solo los sacerdotes"], "«entrando el pequeño con el grande, lo mismo el maestro que el discípulo».", "1 Crónicas 25:7-8"],
      ["m2-08", 5, "o5", "comprender", "¿Qué significa que los músicos fueran idóneos?", "Que eran aptos para la obra de su ministerio", ["Que eran ricos", "Que eran famosos", "Que eran extranjeros"], "«hombres idóneos para la obra de su ministerio».", "1 Crónicas 25:1"],
      ["m2-09", 5, "o5", "recordar", "¿Qué deben poder hacer los hombres fieles de 2 Timoteo 2:2?", "Enseñar también a otros", ["Cantar mejor que todos", "Mandar sobre los demás", "Guardar el secreto"], "«idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["m2-10", 5, "o5", "aplicar", "¿En qué se forma al equipo, según la lección?", "En lo técnico y en lo espiritual", ["Solo en lo técnico", "Solo en la imagen", "En nada"], "«esto encarga a hombres fieles».", "2 Timoteo 2:2"],
      ["m2-11", 5, "o5", "comprender", "¿Por qué ser parte de la vida de la iglesia es un requisito para el equipo?", "Porque el servicio en la plataforma nace de la vida en la iglesia, no la reemplaza", ["Porque así se cobra más", "Porque lo exige la ley", "No es un requisito"], "«apartaron para el ministerio».", "1 Crónicas 25:1"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál de estos planes forma mejor a un nuevo pianista?", "Acompañarlo un tiempo junto a alguien con experiencia y darle responsabilidades poco a poco", ["Ponerlo solo el primer domingo", "No enseñarle nada", "Pedirle que aprenda por su cuenta sin acompañarlo"], "«lo mismo el maestro que el discípulo».", "1 Crónicas 25:7-8"],
      ["m2-13", 6, "o6", "recordar", "¿Qué quita la blanda respuesta, según Proverbios 15:1?", "La ira", ["El gozo", "La paz", "La fe"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
      ["m2-14", 6, "o6", "comprender", "¿Qué destruye un equipo más rápido que cualquier error musical, según la lección?", "Los celos entre cantantes o músicos", ["Una nota desafinada", "Un cable suelto", "Un ensayo corto"], "«Porque donde hay celos y contención, allí hay perturbación».", "Santiago 3:16"],
      ["m2-15", 6, "o6", "recordar", "¿Qué se gana si el hermano oye cuando le hablamos a solas, según Mateo 18:15?", "Al hermano", ["La discusión", "Un puesto", "Nada"], "«si te oyere, has ganado a tu hermano».", "Mateo 18:15"],
      ["m2-16", 6, "o6", "aplicar", "¿Cómo se trata al músico que se cree estrella, según la lección?", "Con una conversación honesta sobre humildad y servicio", ["Dándole siempre el solo", "Ignorándolo", "Hablando mal de él con el equipo"], "«Porque donde hay celos y contención, allí hay perturbación».", "Santiago 3:16"],
      ["m2-17", 6, "o6", "comprender", "¿Por qué llevó Jesús aparte a sus discípulos a descansar?", "Porque eran muchos los que iban y venían, y ni tenían tiempo para comer", ["Porque estaban enojados", "Porque no querían servir", "Porque había una fiesta"], "«Porque eran muchos los que iban y venían, de manera que ni aun tenían tiempo para comer».", "Marcos 6:31"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es la mejor respuesta a los celos y la competencia en el equipo?", "Servir por turnos y honrar a cada uno", ["Que canten siempre los mismos", "Hacer competencias de voz", "Dejar que se peleen"], "«Porque donde hay celos y contención, allí hay perturbación y toda obra perversa».", "Santiago 3:16"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "alabanza-3-e1",
      tipo: "corta",
      pregunta: "Explica, con la Biblia, qué clase de líder es el director de alabanza.",
      ideas: [
        { id: "siervo", peso: 25, texto: "Es un siervo, como Cristo, que vino a servir.", formas: ["siervo", "para servir", "sirve a dios", "no vino para ser servido"] },
        { id: "guia", peso: 25, texto: "Guía al pueblo a mirar a Dios, no a él.", formas: ["guia al pueblo", "guiar al pueblo", "mirar a dios", "mirar a cristo", "ayuda al pueblo"] },
        { id: "puesto", peso: 20, texto: "Es puesto por los responsables y sabe de música.", formas: ["fue puesto", "es puesto", "entendido", "sabe de musica", "quenanias"] },
        { id: "pastores", peso: 20, texto: "Sirve bajo la autoridad de sus pastores.", formas: ["pastores", "autoridad", "sujet*"] },
      ],
      citas: ["Marcos 10:45", "1 Crónicas 15:22", "Nehemías 12:46", "2 Crónicas 20:21-22"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El director de alabanza es un siervo, como Cristo, que no vino para ser servido, sino para servir (Marcos 10:45). Guía al pueblo a mirar a Dios y no a él. Como Quenanías, es puesto por los responsables porque es entendido en música, y sirve bajo la autoridad de sus pastores.",
    },
    {
      id: "alabanza-3-e2",
      tipo: "corta",
      pregunta: "Explica qué criterios usa el director para escoger los cantos de un culto.",
      ideas: [
        { id: "verdad", peso: 25, texto: "Que digan la verdad según la Biblia y pongan a Cristo en el centro.", formas: ["la verdad", "biblic*", "la biblia", "cristo en el centro", "la palabra"] },
        { id: "pueblo", peso: 25, texto: "Que el pueblo los pueda entender y cantar, en un tono cómodo.", formas: ["entender", "inteligencia", "el pueblo pueda", "pueda cantar", "tono comodo", "la congregacion"] },
        { id: "tema", peso: 20, texto: "Que sirvan al tema del culto y edifiquen.", formas: ["el tema", "edificacion", "edifiquen", "el mensaje"] },
        { id: "equilibrio", peso: 20, texto: "Con equilibrio entre cantos nuevos y conocidos.", formas: ["equilibrio", "nuevos y conocidos", "conocidos", "generaciones"] },
      ],
      citas: ["Colosenses 3:16", "Salmos 47:7", "Salmos 96:1", "1 Corintios 14:26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escoge cantos que dicen la verdad según la Biblia y ponen a Cristo en el centro (Colosenses 3:16). Que el pueblo los pueda entender y cantar, en un tono cómodo, porque hay que cantar con inteligencia. Que sirvan al tema del culto y edifiquen, con equilibrio entre cantos nuevos y conocidos.",
    },
    {
      id: "alabanza-3-e3",
      tipo: "corta",
      pregunta: "Explica la diferencia entre guiar al pueblo y manipularlo en la alabanza.",
      ideas: [
        { id: "guiar", peso: 25, texto: "Guiar es presentar la verdad y dejar que el Espíritu obre.", formas: ["presentar la verdad", "presenta la verdad", "el espiritu obre", "obre el espiritu", "deja libre", "invitar"] },
        { id: "manipular", peso: 25, texto: "Manipular es usar trucos para provocar emociones.", formas: ["trucos", "provocar", "forzar"] },
        { id: "ejemplos", peso: 20, texto: "Como repetir sin fin, subir el volumen o hacer sentir culpable.", formas: ["repetir", "el volumen", "culpable", "presion*"] },
        { id: "orden", peso: 20, texto: "Dios no es Dios de confusión; todo con orden.", formas: ["confusion", "con orden", "decentemente", "de paz"] },
      ],
      citas: ["1 Corintios 14:33", "1 Corintios 14:40", "Esdras 3:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Guiar es presentar la verdad de Dios, invitar y dejar que el Espíritu obre en cada corazón. Manipular es usar trucos para provocar una emoción, como repetir sin fin, subir el volumen o hacer sentir culpable al que no responde. Dios no es Dios de confusión, sino de paz (1 Corintios 14:33).",
    },
    {
      id: "alabanza-3-e4",
      tipo: "breve",
      pregunta:
        "Tu pastor te pide preparar el culto del próximo domingo, cuyo tema es la fidelidad de Dios. Describe, con base en la Biblia, cómo prepararás el culto y el ensayo.",
      ideas: [
        { id: "orar_pastor", peso: 20, texto: "Orar y hablar con el pastor sobre el tema.", formas: ["con el pastor", "orare", "orar por", "oracion"] },
        { id: "cantos", peso: 25, texto: "Escoger cantos sobre el tema, con su orden, sus tonos y sus transiciones.", formas: ["fidelidad", "el orden", "los tonos", "transiciones"] },
        { id: "equipo", peso: 15, texto: "Enviar la lista al equipo con anticipación.", formas: ["anticipacion", "la lista", "enviare"] },
        { id: "ensayo", peso: 25, texto: "Un ensayo con oración, repasar lo difícil y las transiciones, probar el sonido y terminar a tiempo.", formas: ["el ensayo", "repasaremos", "lo dificil", "terminaremos a tiempo", "el sonido"] },
        { id: "excelencia", peso: 15, texto: "Hacerlo bien y con júbilo, para el Señor.", formas: ["hacedlo bien", "jubilo", "para el senor", "de corazon", "excelencia"] },
      ],
      basta: 85,
      citas: ["Salmos 33:3", "Proverbios 21:5", "1 Crónicas 25:7-8", "1 Crónicas 25:7", "Colosenses 3:23", "Lamentaciones 3:22-23", "2 Timoteo 2:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero oraré por el culto y por la iglesia, y hablaré con el pastor sobre el tema y el mensaje. Escogeré cantos sobre la fidelidad de Dios que digan la verdad y que la iglesia pueda cantar, y pensaré el orden para que el culto fluya: empezar con alabanza alegre y terminar con adoración. Decidiré los tonos, quién canta cada parte y las transiciones, y prepararé la lectura de Lamentaciones 3:22-23, que dice que grande es su fidelidad. Enviaré la lista al equipo con días de anticipación, porque el diligente planifica (Proverbios 21:5). En el ensayo empezaremos a tiempo con oración, repasaremos lo difícil y las transiciones, probaremos el sonido con los técnicos y terminaremos a tiempo. Todo lo haremos bien y con júbilo, como pide Salmos 33:3, de corazón y para el Señor.",
    },
    {
      id: "alabanza-3-e5",
      tipo: "breve",
      pregunta:
        "Hay tensión en tu equipo: dos cantantes compiten por los solos y algunos hermanos se quejan del volumen y de los cantos nuevos. Explica, con la Biblia, cómo enfrentarías estos problemas.",
      ideas: [
        { id: "celos", peso: 25, texto: "Los celos y la contención traen perturbación: turnos y honra para todos.", formas: ["celos", "contencion", "compiten", "por turnos", "los turnos"] },
        { id: "solas", peso: 25, texto: "Hablar a solas con cada uno, como enseñó Jesús.", formas: ["a solas", "en privado", "mateo 18", "con cada una", "con cada uno"] },
        { id: "blanda", peso: 20, texto: "Responder a las quejas con mansedumbre: la blanda respuesta.", formas: ["blanda respuesta", "mansedumbre", "los escucharia", "escucharlos"] },
        { id: "unidad", peso: 20, texto: "La unidad vale más que los gustos: glorificar a Dios a una voz.", formas: ["la unidad", "a una voz", "unanimes", "equilibrio", "los gustos"] },
        { id: "ajustar", peso: 10, texto: "Ajustar lo razonable y explicar.", formas: ["ajustaria", "ajustar", "bajar un poco", "les explicaria", "explicar por que"] },
      ],
      basta: 85,
      citas: ["Santiago 3:16", "Mateo 18:15", "Proverbios 15:1", "Romanos 15:5-6", "Romanos 15:6", "Filipenses 2:3", "Marcos 6:31"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero recordaría que donde hay celos y contención hay perturbación y toda obra perversa (Santiago 3:16). Con las dos cantantes hablaría a solas, con cada una, como enseñó Jesús en Mateo 18:15, sobre la humildad y el servicio, y organizaría los solos por turnos para honrar a las dos. Con los hermanos que se quejan respondería con mansedumbre, porque la blanda respuesta quita la ira (Proverbios 15:1): los escucharía, ajustaría lo razonable, como bajar un poco el volumen, y les explicaría por qué también cantamos cantos nuevos. Buscaría equilibrio entre himnos y cantos nuevos, porque la unidad de la iglesia vale más que los gustos de cada uno, y queremos glorificar a Dios unánimes, a una voz (Romanos 15:6). Por último, oraría con todo el equipo por un mismo sentir.",
    },
  ],
  breve: {
    id: "alabanza-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe el plan de tu ministerio de alabanza para los próximos tres meses: cómo escogerás los cantos, cómo prepararás los cultos y los ensayos, cómo formarás al equipo y cómo cuidarás su unidad, con citas bíblicas.",
    ideas: [
      { id: "cantos", peso: 20, texto: "Cómo se escogerán los cantos.", formas: ["escogeremos", "escoger los cantos", "cristo en el centro", "el pueblo pueda", "para edificacion"] },
      { id: "preparar", peso: 20, texto: "Cómo se prepararán los cultos.", formas: ["con el pastor", "anticipacion", "prepararemos", "la lista", "planific*"] },
      { id: "ensayo", peso: 20, texto: "Cómo serán los ensayos.", formas: ["los ensayos", "el ensayo", "lo dificil", "a tiempo"] },
      { id: "formar", peso: 25, texto: "Cómo se formará al equipo y a nuevos servidores.", formas: ["formaremos", "formar a", "nuevos servidores", "el maestro y el discipulo", "ensenar a otros"] },
      { id: "unidad", peso: 15, texto: "Cómo se cuidará la unidad.", formas: ["la unidad", "turnos", "descans*", "a solas", "conflictos"] },
    ],
    basta: 85,
    citas: ["Salmos 33:3", "Colosenses 3:16", "1 Corintios 14:26", "Proverbios 21:5", "2 Timoteo 2:2", "1 Crónicas 25:7-8", "1 Crónicas 25:8", "Santiago 3:16", "Mateo 18:15", "Romanos 15:5-6", "Marcos 6:31", "Marcos 10:45"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Plan para los próximos tres meses. Primero, escogeremos los cantos con cinco preguntas: si dicen la verdad, si ponen a Cristo en el centro, si el pueblo puede cantarlos, si sirven al tema y si hay equilibrio entre nuevos y conocidos, para que todo sea para edificación (1 Corintios 14:26). Segundo, prepararemos cada culto con el pastor y enviaremos la lista al equipo el miércoles, con los tonos y las transiciones, porque el diligente planifica (Proverbios 21:5). Tercero, los ensayos empezarán a tiempo con oración, repasarán lo difícil y terminarán a tiempo, para hacerlo bien y con júbilo (Salmos 33:3). Cuarto, formaremos a dos nuevos servidores: un tecladista y una cantante servirán junto a alguien con experiencia, como el maestro y el discípulo, para que puedan enseñar a otros (2 Timoteo 2:2). Quinto, cuidaremos la unidad: habrá turnos para que todos descansen, y los conflictos se hablarán a solas.",
  },
};
