/**
 * El banco de «Teología del avivamiento» (Nivel 5). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es el avivamiento · o2 los avivamientos del Antiguo Testamento · o3 Pentecostés y Hechos · o4 la
 * historia de los avivamientos · o5 el discernimiento · o6 buscar el avivamiento y sostener sus frutos · o7 el versículo
 * de memoria (Habacuc 3:2). Sigue el estándar de la auditoría (docs/academia-auditoria.md): no más del 30 % de preguntas
 * de memoria y al menos un 20 % de casos de la vida real. Sobre las lenguas como señal inicial, las preguntas solo piden
 * reconocer que es un punto por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-avivamiento-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_AVIVAMIENTO: BancoMateria = {
  materia: "n5-avivamiento",
  repaso: {
    "n5-avivamiento-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué pide Habacuc en Habacuc 3:2?", "Que Dios avive su obra en medio de los tiempos", ["Que Dios destruya a sus enemigos", "Que le dé riquezas", "Que le muestre el futuro"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
      ["1-r2", 1, "o1", "comprender", "¿En qué se diferencia el avivamiento de una campaña de evangelización, según la lección?", "El avivamiento renueva a la iglesia; la campaña anuncia el evangelio a los que no creen, y puede ser fruto del avivamiento", ["Son exactamente lo mismo", "La campaña siempre produce un avivamiento", "El avivamiento es solo para los que no creen"], "«¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?».", "Salmos 85:6"],
      ["1-r3", 1, "o1", "aplicar", "Una iglesia tiene muchas actividades, pero sus miembros han perdido el amor por Dios. ¿Qué le dice Apocalipsis 2:4-5?", "Que recuerde de dónde cayó, se arrepienta y haga las primeras obras", ["Que agregue más actividades", "Que no hace falta cambiar nada", "Que cierre la iglesia"], "«Recuerda, por tanto, de dónde has caído, y arrepiéntete, y haz las primeras obras».", "Apocalipsis 2:4-5"],
    ] as P[]).map(p),
    "n5-avivamiento-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Ezequías en el primer año de su reinado, según 2 Crónicas 29:3?", "Abrió las puertas de la casa de Jehová y las reparó", ["Construyó un palacio", "Declaró la guerra", "Cerró el templo"], "«abrió las puertas de la casa de Jehová, y las reparó».", "2 Crónicas 29:3"],
      ["2-r2", 2, "o2", "comprender", "¿Por dónde empezó el avivamiento con Josías?", "Por la Palabra: el libro de la ley que se halló en el templo", ["Por una batalla", "Por un milagro de sanidad", "Por una fiesta"], "«Y cuando el rey hubo oído las palabras del libro de la ley, rasgó sus vestidos».", "2 Reyes 22:11"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia lee la Biblia en el culto, pero casi nadie la entiende. ¿Qué enseña Nehemías 8:8?", "Leer la Palabra claramente y explicar su sentido para que se entienda", ["Leer más rápido", "Dejar de leerla en público", "Leer solo los versículos conocidos"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ] as P[]).map(p),
    "n5-avivamiento-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué prometió Dios por Joel, según Joel 2:28?", "Derramar su Espíritu sobre toda carne", ["Enviar un nuevo rey", "Construir un nuevo templo", "Dar una nueva ley"], "«Y después de esto derramaré mi Espíritu sobre toda carne».", "Joel 2:28-29"],
      ["3-r2", 3, "o3", "comprender", "¿Cuál fue el primer fruto de Pentecostés, según la lección?", "El arrepentimiento: se compungieron de corazón", ["La fama de los apóstoles", "Una nueva organización", "Un templo nuevo"], "«Al oír esto, se compungieron de corazón».", "Hechos 2:37-41"],
      ["3-r3", 3, "o3", "aplicar", "Tu iglesia vive persecución y algunos tienen miedo de testificar. ¿Qué les enseña Hechos 4:31?", "Que oren, porque el Espíritu da denuedo para hablar la Palabra", ["Que se escondan", "Que dejen de reunirse", "Que esperen a que pase la persecución"], "«y todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».", "Hechos 4:31"],
    ] as P[]).map(p),
    "n5-avivamiento-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Dónde empezó el avivamiento moravo de 1727?", "En Herrnhut, Alemania", ["En Londres", "En Nueva York", "En Los Ángeles"], "Allí la comunidad morava vivió un avivamiento durante la Santa Cena.", "Salmos 78:4"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué se parecen entre sí los avivamientos, según la lección?", "Porque el Señor es el mismo ayer, hoy y por los siglos", ["Porque se copian unos a otros", "Porque los organiza la misma persona", "Porque siempre ocurren en el mismo país"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
      ["4-r3", 4, "o4", "aplicar", "Un joven dice que los avivamientos solo ocurrieron en la Biblia. ¿Qué le muestras?", "La historia de Herrnhut, el Gran Despertar, Gales, la calle Azusa o Valparaíso", ["Que tiene razón", "Que solo hubo uno, en el siglo XX", "Que nadie sabe nada de la historia"], "«Contando a la generación venidera las alabanzas de Jehová».", "Salmos 78:4"],
    ] as P[]).map(p),
    "n5-avivamiento-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide Pablo en 1 Tesalonicenses 5:21?", "Examinadlo todo; retened lo bueno", ["Creedlo todo", "No examinéis nada", "Rechazadlo todo"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:19-21"],
      ["5-r2", 5, "o5", "comprender", "¿Cuáles son los dos errores opuestos ante las manifestaciones, según la lección?", "Apagar lo que Dios hace, o aceptar cualquier cosa sin examinarla", ["Orar y ayunar", "Leer y cantar", "Dar y servir"], "«No apaguéis al Espíritu».", "1 Tesalonicenses 5:19-21"],
      ["5-r3", 5, "o5", "aplicar", "En un culto, alguien da una profecía que contradice la Biblia. ¿Qué haces?", "La examino con la Escritura y no la recibo, porque solo se retiene lo bueno", ["La acepto porque es una profecía", "Prohíbo toda profecía para siempre", "La celebro sin pensar"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:19-21"],
    ] as P[]).map(p),
    "n5-avivamiento-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hacían los discípulos antes de Pentecostés, según Hechos 1:14?", "Perseveraban unánimes en oración y ruego", ["Se escondían en sus casas", "Discutían quién era el mayor", "Volvían a pescar"], "«Todos éstos perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
      ["6-r2", 6, "o6", "comprender", "¿Qué significa hacer barbecho, según Oseas 10:12?", "Preparar la tierra: buscar a Jehová con arrepentimiento", ["Cosechar sin sembrar", "Abandonar el campo", "Comprar tierras"], "«haced para vosotros barbecho; porque es el tiempo de buscar a Jehová».", "Oseas 10:12"],
      ["6-r3", 6, "o6", "aplicar", "Tu iglesia recibe muchos nuevos creyentes después de unas semanas de renovación. ¿Qué haces para cuidarlos?", "Organizar grupos de discipulado, como en Hechos 2:42 y en las clases metodistas", ["Dejarlos solos para que maduren", "Esperar el próximo avivamiento", "Llenarlos de eventos sin enseñanza"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros».", "Hechos 2:42"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · ¿Qué es el avivamiento?
    ["f01", 1, "o1", "recordar", "¿Qué pregunta el salmista en Salmos 85:6?", "¿No volverás a darnos vida, para que tu pueblo se regocije en ti?", ["¿Hasta cuándo, Jehová?", "¿Quién subirá al monte de Jehová?", "¿Qué es el hombre, para que tengas de él memoria?"], "«¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?».", "Salmos 85:6"],
    ["f02", 1, "o1", "comprender", "¿Dónde empieza el avivamiento, según la lección?", "En el pueblo de Dios, no en el mundo", ["En el gobierno", "En los que no creen", "En las campañas"], "«¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?».", "Salmos 85:6"],
    ["f03", 1, "o1", "comprender", "¿Cómo define el avivamiento el artículo 15 de la declaración de fe?", "Como la obra del Espíritu que despierta a la iglesia a la santidad, la oración y el primer amor, y alcanza con poder a los perdidos", ["Como un culto con mucha emoción", "Como una semana de reuniones especiales", "Como un programa de crecimiento"], "El artículo 15 dice también que se busca con oración, arrepentimiento y obediencia a la Palabra.", "Habacuc 3:2"],
    ["f04", 1, "o1", "analizar", "¿Qué es un despertar, según la lección?", "Un avivamiento que se desborda y transforma a una sociedad entera", ["Una campaña de una semana", "Un culto de madrugada", "Un retiro de jóvenes"], "Por ejemplo, el Gran Despertar del siglo XVIII.", "Habacuc 3:2"],
    ["f05", 1, "o1", "recordar", "¿Con quién habita Dios, según Isaías 57:15?", "Con el quebrantado y humilde de espíritu", ["Con el orgulloso", "Con el poderoso", "Con el que nunca falla"], "«Yo habito en la altura y la santidad, y con el quebrantado y humilde de espíritu».", "Isaías 57:15"],
    ["f06", 1, "o1", "aplicar", "Un pastor quiere avivamiento, pero no quiere reconocer ningún pecado en su ministerio. ¿Qué le enseña Isaías 57:15?", "Que Dios da vida a los humildes y quebrantados", ["Que el avivamiento depende del talento", "Que Dios premia el orgullo", "Que no hace falta humildad"], "«para hacer vivir el espíritu de los humildes, y para vivificar el corazón de los quebrantados».", "Isaías 57:15"],
    ["f07", 1, "o1", "comprender", "¿Qué le reprocha Jesús a la iglesia de Éfeso?", "Que había dejado su primer amor", ["Que no trabajaba", "Que tenía falsa doctrina", "Que no se reunía"], "«Pero tengo contra ti, que has dejado tu primer amor».", "Apocalipsis 2:4-5"],
    ["f08", 1, "o1", "aplicar", "Un líder joven cree que su iglesia está bien porque tiene buena doctrina y muchas actividades. ¿Qué le enseña el caso de Éfeso?", "Que una iglesia activa y firme en la doctrina puede haber perdido el primer amor", ["Que la doctrina y las actividades bastan", "Que el amor no importa si hay doctrina", "Que Éfeso no tenía problemas"], "«Pero tengo contra ti, que has dejado tu primer amor».", "Apocalipsis 2:4-5"],
    ["f09", 1, "o1", "comprender", "¿Qué une Pedro en Hechos 3:19?", "El arrepentimiento y los tiempos de refrigerio que vienen del Señor", ["La riqueza y la fama", "La ley y el templo", "La política y la fe"], "«arrepentíos y convertíos, para que sean borrados vuestros pecados; para que vengan de la presencia del Señor tiempos de refrigerio».", "Hechos 3:19"],
    ["f10", 1, "o7", "recordar", "Completa Habacuc 3:2: Oh Jehová, he oído tu palabra, y temí. Oh Jehová…", "aviva tu obra en medio de los tiempos", ["destruye a mis enemigos", "dame riquezas en la tierra", "llévame hoy contigo"], "«Oh Jehová, he oído tu palabra, y temí. Oh Jehová, aviva tu obra en medio de los tiempos, En medio de los tiempos hazla conocer; En la ira acuérdate de la misericordia».", "Habacuc 3:2"],
    // Lección 2 · Los avivamientos del Antiguo Testamento
    ["f11", 2, "o2", "recordar", "¿Qué hubo en Jerusalén después de la Pascua de Ezequías, según 2 Crónicas 30:26?", "Gran regocijo", ["Gran hambre", "Una guerra", "Silencio"], "«Hubo entonces gran regocijo en Jerusalén».", "2 Crónicas 30:26"],
    ["f12", 2, "o2", "comprender", "¿Qué hizo Josías al oír las palabras del libro de la ley?", "Rasgó sus vestidos", ["Quemó el libro", "Lo guardó en secreto", "Se burló"], "«Y cuando el rey hubo oído las palabras del libro de la ley, rasgó sus vestidos».", "2 Reyes 22:11"],
    ["f13", 2, "o2", "recordar", "¿Cómo renovó Josías el pacto, según 2 Reyes 23:3?", "Con todo el corazón y con toda el alma, y todo el pueblo lo confirmó", ["A escondidas", "Solo con los sacerdotes", "Sin el pueblo"], "«con todo el corazón y con toda el alma, y que cumplirían las palabras del pacto que estaban escritas en aquel libro. Y todo el pueblo confirmó el pacto».", "2 Reyes 23:3"],
    ["f14", 2, "o2", "comprender", "¿Qué hacían con la ley ante el pueblo, según Nehemías 8:8?", "La leían claramente y ponían el sentido, para que se entendiera", ["La leían en un idioma desconocido", "La guardaban sin leerla", "La cambiaban"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f15", 2, "o2", "aplicar", "Un grupo de tu iglesia llora por su pecado al oír la Palabra. ¿Qué les dirías con Nehemías 8:10?", "Que el gozo de Jehová es su fuerza", ["Que sigan tristes para siempre", "Que el llanto los salva", "Que no vuelvan a leer la ley"], "«no os entristezcáis, porque el gozo de Jehová es vuestra fuerza».", "Nehemías 8:10"],
    ["f16", 2, "o2", "analizar", "¿Qué patrón se repite en los avivamientos del Antiguo Testamento, según la lección?", "Alguien busca a Dios, la Palabra se explica, el pueblo se arrepiente, se renuevan la adoración y el pacto, y llega el gozo", ["Primero llega el dinero y después la fe", "Todo empieza con un milagro y termina en el olvido", "No hay ningún patrón"], "Así ocurrió bajo Ezequías, Josías y Esdras y Nehemías.", "Nehemías 8:8"],
    ["f17", 2, "o2", "evaluar", "¿Cómo debe leer la iglesia 2 Crónicas 7:14, según la lección?", "Como una promesa a Israel en la dedicación del templo, cuyo principio sigue vigente para el pueblo de Dios", ["Como una promesa de que todo país cristiano será rico", "Como un texto que ya no dice nada", "Como una promesa solo para los reyes"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado».", "2 Crónicas 7:14"],
    ["f18", 2, "o2", "recordar", "¿Qué cuatro cosas pide Dios a su pueblo en 2 Crónicas 7:14?", "Humillarse, orar, buscar su rostro y convertirse de sus malos caminos", ["Construir, pelear, conquistar y gobernar", "Ayunar, cantar, danzar y dar", "Esperar, callar, dormir y olvidar"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos».", "2 Crónicas 7:14"],
    ["f19", 2, "o2", "aplicar", "Un pastor quiere empezar un avivamiento con una gran campaña de publicidad. ¿Qué le enseñan Ezequías y Josías?", "Que los avivamientos bíblicos empezaron por la casa de Dios y por la Palabra", ["Que la publicidad es lo primero", "Que hay que esperar sin hacer nada", "Que el avivamiento empieza en el palacio"], "«abrió las puertas de la casa de Jehová, y las reparó».", "2 Crónicas 29:3"],
    ["f20", 2, "o2", "comprender", "¿Qué hizo el pueblo al oír la ley en tiempos de Nehemías, según la lección?", "Lloró por su pecado, y luego recibió el gozo de Jehová", ["Se fue a su casa sin escuchar", "Se enojó con Esdras", "Celebró sin arrepentirse"], "«porque día santo es a nuestro Señor; no os entristezcáis».", "Nehemías 8:10"],
    // Lección 3 · Pentecostés y los avivamientos de Hechos
    ["f21", 3, "o3", "recordar", "¿Cómo estaban los discípulos el día de Pentecostés, según Hechos 2:1?", "Todos unánimes juntos", ["Divididos", "Dormidos", "Dispersos"], "«Cuando llegó el día de Pentecostés, estaban todos unánimes juntos».", "Hechos 2:1-4"],
    ["f22", 3, "o3", "comprender", "¿Qué se cumplió en Pentecostés, según la lección?", "La promesa de Joel de derramar el Espíritu sobre toda carne", ["La ley de Moisés", "La construcción del templo", "El fin del mundo"], "«derramaré mi Espíritu sobre toda carne».", "Joel 2:28-29"],
    ["f23", 3, "o3", "recordar", "¿Cuántas personas se añadieron el día de Pentecostés, según Hechos 2:41?", "Como tres mil", ["Doce", "Setenta", "Diez mil"], "«y se añadieron aquel día como tres mil personas».", "Hechos 2:37-41"],
    ["f24", 3, "o3", "aplicar", "En una reunión, varias personas preguntan qué deben hacer después de oír el evangelio. ¿Qué les respondes con Hechos 2:38?", "Que se arrepientan y se bauticen en el nombre de Jesucristo para perdón de los pecados", ["Que esperen a sentir algo", "Que cumplan la ley primero", "Que se vayan a pensarlo"], "«Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados».", "Hechos 2:37-41"],
    ["f25", 3, "o3", "comprender", "¿Qué pasó cuando los discípulos oraron en Hechos 4:31?", "El lugar tembló, fueron llenos del Espíritu y hablaban con denuedo", ["Se dispersaron", "Fueron arrestados todos", "No pasó nada"], "«Cuando hubieron orado, el lugar en que estaban congregados tembló».", "Hechos 4:31"],
    ["f26", 3, "o3", "recordar", "¿Qué hubo en Samaria por la predicación de Felipe, según Hechos 8:8?", "Gran gozo en aquella ciudad", ["Gran tristeza", "Una guerra", "Una sequía"], "«así que había gran gozo en aquella ciudad».", "Hechos 8:5-8"],
    ["f27", 3, "o3", "analizar", "¿Qué muestra que los creyentes de Éfeso quemaran sus libros de magia?", "Que el arrepentimiento real cambia la conducta y aun cuesta dinero", ["Que odiaban los libros", "Que no sabían leer", "Que fue una orden del gobierno"], "«y hecha la cuenta de su precio, hallaron que era cincuenta mil piezas de plata».", "Hechos 19:18-20"],
    ["f28", 3, "o3", "aplicar", "Un nuevo creyente quiere seguir a Cristo, pero conserva objetos de prácticas ocultistas. ¿Qué ejemplo de Hechos 19 le sirve?", "El de los efesios que confesaron sus prácticas y quemaron sus libros de magia", ["Guardarlos como recuerdo", "Venderlos para ganar dinero", "Esconderlos en un cajón"], "«Asimismo muchos de los que habían practicado la magia trajeron los libros y los quemaron delante de todos».", "Hechos 19:18-20"],
    ["f29", 3, "o3", "evaluar", "¿Cuál es la posición del ministerio sobre las lenguas como señal inicial del bautismo en el Espíritu?", "Es un punto de la declaración de fe por confirmar", ["Que las lenguas cesaron", "Que nadie habla en lenguas", "Que el tema no tiene importancia"], "«y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».", "Hechos 2:1-4"],
    ["f30", 3, "o3", "analizar", "¿Qué tienen en común los avivamientos de Hechos, según la lección?", "Oración unida, predicación de Cristo, arrepentimiento real, gozo, valentía y una iglesia que crece", ["Edificios grandes y mucho dinero", "Líderes famosos y espectáculo", "Nada en común"], "«Así crecía y prevalecía poderosamente la palabra del Señor».", "Hechos 19:18-20"],
    // Lección 4 · La historia de los avivamientos
    ["f31", 4, "o4", "recordar", "¿Con qué predicador se asocia el comienzo del Gran Despertar en Northampton?", "Jonathan Edwards", ["Evan Roberts", "William J. Seymour", "Willis C. Hoover"], "Luego llegó la predicación de George Whitefield.", "Salmos 78:4"],
    ["f32", 4, "o4", "comprender", "¿A quiénes predicaban Wesley y Whitefield al aire libre, según la lección?", "A los mineros y a los pobres", ["Solo a los reyes", "Solo a los pastores", "Solo a los niños"], "Así empezó el avivamiento metodista en Inglaterra.", "Salmos 78:4"],
    ["f33", 4, "o4", "recordar", "¿Dónde comenzó el avivamiento de oración de 1857?", "En una reunión de mediodía en la calle Fulton, en Nueva York", ["En un estadio de Londres", "En un templo de Roma", "En un barco"], "Fue el avivamiento de oración de 1857 y 1858.", "Salmos 78:4"],
    ["f34", 4, "o4", "recordar", "¿Qué joven se asocia con el avivamiento de Gales de 1904?", "Evan Roberts", ["Charles Finney", "George Whitefield", "Juan Wesley"], "El avivamiento de Gales fue en 1904 y 1905.", "Salmos 78:4"],
    ["f35", 4, "o4", "comprender", "¿Por qué es importante la calle Azusa, según la lección?", "Porque fue la cuna del pentecostalismo moderno, en 1906", ["Porque allí nació Wesley", "Porque allí se imprimió la Biblia del Oso", "Porque allí empezó la Reforma"], "Allí predicó William J. Seymour.", "Hebreos 13:8"],
    ["f36", 4, "o4", "aplicar", "Una hermana chilena pregunta cómo llegó el pentecostalismo a su país. ¿Qué le cuentas?", "Que en 1909, en Valparaíso, el misionero Willis C. Hoover vivió un avivamiento que dio origen a la Iglesia Metodista Pentecostal de Chile", ["Que llegó con los conquistadores españoles", "Que empezó en 1727 en Herrnhut", "Que nunca llegó a Chile"], "Es parte de la línea de tiempo de la lección.", "Salmos 78:4"],
    ["f37", 4, "o4", "analizar", "¿Qué tienen en común los avivamientos de la historia, según la lección?", "Oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión", ["Música moderna y edificios nuevos", "Un solo líder famoso", "La ausencia de pruebas"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
    ["f38", 4, "o4", "evaluar", "¿Qué frutos dejó el avivamiento metodista en la sociedad, según la lección?", "Escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud", ["Solo cultos más largos", "Ningún fruto social", "Guerras religiosas"], "En 1791 Wesley escribió su última carta a Wilberforce para animarlo contra el comercio de esclavos.", "Salmos 78:4"],
    ["f39", 4, "o4", "aplicar", "Tu iglesia quiere servir a su barrio después de un tiempo de renovación espiritual. ¿Qué ejemplo de la historia la anima?", "El avivamiento metodista, que dio fruto en escuelas, ayuda a los pobres y lucha contra la esclavitud", ["Encerrarse a esperar el fin", "Dejar el barrio y mudarse", "No mezclar la fe con la vida"], "Los avivamientos verdaderos dejan frutos que duran en la sociedad.", "Hebreos 13:8"],
    ["f40", 4, "o4", "evaluar", "¿Qué hace la lección con la enseñanza de la calle Azusa sobre las lenguas como señal inicial?", "La presenta y aclara que la posición del ministerio es un punto de la declaración de fe por confirmar", ["La rechaza como herejía", "La da como posición oficial del ministerio", "No la menciona"], "Así lo dice la nota de la lección.", "Hebreos 13:8"],
    // Lección 5 · El discernimiento
    ["f41", 5, "o5", "comprender", "¿Cuál es la prueba principal de un espíritu, según 1 Juan 4:2?", "Si confiesa que Jesucristo ha venido en carne", ["Si produce emociones fuertes", "Si es muy popular", "Si hace mucho ruido"], "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", "1 Juan 4:1-3"],
    ["f42", 5, "o5", "recordar", "¿Cómo se conoce a los falsos profetas, según Mateo 7:16?", "Por sus frutos", ["Por su ropa", "Por su fama", "Por su voz"], "«Por sus frutos los conoceréis».", "Mateo 7:15-17"],
    ["f43", 5, "o5", "recordar", "¿En qué año publicó Jonathan Edwards su estudio sobre las señales de una obra del Espíritu?", "En 1741, en medio del Gran Despertar", ["En 1906", "En 1517", "En 1801"], "Su estudio se basa en 1 Juan 4.", "1 Juan 4:1-3"],
    ["f44", 5, "o5", "comprender", "¿Cuál de estas es una señal de una obra verdadera del Espíritu, según Edwards?", "Exalta a Jesús como Hijo de Dios y Salvador", ["Hace famoso al predicador", "Hace caer a la gente al suelo", "Llena el templo de dinero"], "«En esto conoced el Espíritu de Dios».", "1 Juan 4:1-3"],
    ["f45", 5, "o5", "analizar", "¿Qué pensaba Edwards de las lágrimas, los temblores o los gritos?", "Que por sí mismos no prueban que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos", ["Que siempre prueban que es de Dios", "Que siempre prueban que es del diablo", "Que nunca ocurren"], "«Así, todo buen árbol da buenos frutos».", "Mateo 7:15-17"],
    ["f46", 5, "o5", "aplicar", "En una reunión, el predicador presiona a la gente para que dé dinero a cambio de milagros. ¿Qué principio aplicas?", "Que la presencia de Dios no se fabrica con manipulación: eso es fuego extraño", ["Que es una forma válida de fe", "Que hay que dar más", "Que no importa la forma si hay milagros"], "«y ofrecieron delante de Jehová fuego extraño, que él nunca les mandó».", "Levítico 10:1-2"],
    ["f47", 5, "o5", "aplicar", "Un grupo de tu iglesia quiere quitar toda manifestación espiritual por miedo a los excesos. ¿Qué les dices?", "Que no apaguen al Espíritu: hay que examinarlo todo y retener lo bueno", ["Que tienen razón", "Que el Espíritu ya no obra", "Que acepten todo sin examinar"], "«No apaguéis al Espíritu. No menospreciéis las profecías».", "1 Tesalonicenses 5:19-21"],
    ["f48", 5, "o5", "recordar", "¿Qué dice 1 Corintios 14:33 de Dios?", "Que no es Dios de confusión, sino de paz", ["Que es Dios de ruido", "Que no le importa el orden", "Que es Dios de confusión"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f49", 5, "o5", "evaluar", "¿Qué enseña el caso de Nadab y Abiú a los ministerios de hoy?", "Que lo que Dios no manda no aviva a su iglesia, aunque parezca fuego", ["Que hay que vivir con miedo de Dios", "Que el incienso está prohibido", "Que no hay que adorar"], "«y ofrecieron delante de Jehová fuego extraño, que él nunca les mandó».", "Levítico 10:1-2"],
    ["f50", 5, "o5", "aplicar", "Un culto se vuelve desordenado: varios hablan a la vez y nadie entiende. ¿Qué aplica el líder?", "Que todo se haga decentemente y con orden, porque Dios es Dios de paz", ["Dejar que siga el desorden", "Cancelar los cultos", "Echar a todos"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    // Lección 6 · Buscar el avivamiento y sostener sus frutos
    ["f51", 6, "o6", "recordar", "¿Qué promete Santiago 4:8 al que se acerca a Dios?", "Que él se acercará a nosotros", ["Que nos alejará", "Que nos hará ricos", "Que no nos escuchará"], "«Acercaos a Dios, y él se acercará a vosotros».", "Santiago 4:8"],
    ["f52", 6, "o6", "comprender", "¿Qué pide Santiago 4:8 junto con acercarse a Dios?", "Limpiar las manos y purificar el corazón", ["Construir un templo", "Hacer un ayuno de cuarenta días", "Esperar sin cambiar nada"], "«Pecadores, limpiad las manos; y vosotros los de doble ánimo, purificad vuestros corazones».", "Santiago 4:8"],
    ["f53", 6, "o6", "analizar", "¿Por qué dice la lección que el avivamiento no se fabrica?", "Porque es obra soberana de Dios: la iglesia prepara la tierra, pero la lluvia la manda Dios", ["Porque es imposible", "Porque no existe", "Porque depende del predicador"], "«porque es el tiempo de buscar a Jehová, hasta que venga y os enseñe justicia».", "Oseas 10:12"],
    ["f54", 6, "o6", "recordar", "¿Qué eran las clases metodistas, según la lección?", "Pequeños grupos donde cada uno daba cuenta de su vida espiritual", ["Escuelas de música", "Reuniones de negocios", "Cursos de idiomas"], "Juan Wesley las organizó para cuidar a los nuevos creyentes.", "Hechos 2:42"],
    ["f55", 6, "o6", "aplicar", "Un líder organiza cada mes un gran evento al que llama avivamiento, pero sin discipulado después. ¿Qué error comete?", "Convertir el avivamiento en un evento y dejar a los nuevos sin discipulado", ["Ninguno", "Hacer pocos eventos", "Invitar a predicadores"], "Sin discipulado, los frutos de un avivamiento se pierden.", "Hechos 2:42"],
    ["f56", 6, "o6", "comprender", "¿Qué pide Jesús en Mateo 9:38 ante una gran cosecha?", "Rogar al Señor de la mies que envíe obreros", ["Esperar a que la mies se pierda", "Cosechar solos", "Cerrar los campos"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
    ["f57", 6, "o6", "aplicar", "Tu iglesia ha crecido mucho y los líderes están agotados. ¿Qué le enseña Mateo 9:37-38?", "Orar y formar obreros para la cosecha", ["Cerrar las puertas a los nuevos", "Que los líderes trabajen más horas solos", "Dejar de evangelizar"], "«A la verdad la mies es mucha, mas los obreros pocos».", "Mateo 9:37-38"],
    ["f58", 6, "o6", "evaluar", "¿Cuál de estos es un error que apaga el avivamiento, según la nota de la lección?", "Depender de una sola persona", ["Orar unidos", "Volver a la Palabra", "Discipular a los nuevos"], "La nota nombra también buscar las manifestaciones más que a Dios y despreciar la doctrina.", "Gálatas 6:9"],
    ["f59", 6, "o6", "aplicar", "Un grupo de intercesores lleva años orando por avivamiento y está desanimado. ¿Qué les dices con Gálatas 6:9?", "Que no se cansen de hacer bien, porque a su tiempo segarán si no desmayan", ["Que dejen de orar", "Que Dios no los escucha", "Que busquen otra iglesia"], "«No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos».", "Gálatas 6:9"],
    ["f60", 6, "o6", "evaluar", "¿Cómo se sostienen los frutos de un avivamiento, según la lección?", "Con discipulado y con la formación y el envío de obreros", ["Con más eventos", "Con publicidad", "Con emociones fuertes"], "«Y perseveraban en la doctrina de los apóstoles».", "Hechos 2:42"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué pide Habacuc que Dios recuerde en la ira?", "La misericordia", ["La ley", "El templo", "A los enemigos"], "«En la ira acuérdate de la misericordia».", "Habacuc 3:2"],
      ["m1-02", 1, "o1", "aplicar", "Un hermano anuncia una semana de avivamiento con predicadores invitados. ¿Qué le recuerdas?", "Que se puede programar una campaña, pero el avivamiento es una obra del Espíritu que no se fabrica", ["Que el avivamiento llega siempre que se anuncia", "Que basta con un buen predicador", "Que el avivamiento es solo emoción"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
      ["m1-03", 1, "o1", "aplicar", "Una hermana dice que se siente indigna de pedir avivamiento por sus pecados. ¿Qué le enseña Isaías 57:15?", "Que Dios vivifica el corazón de los quebrantados", ["Que Dios solo escucha a los perfectos", "Que debe esperar a ser digna", "Que el quebranto la aleja de Dios"], "«y para vivificar el corazón de los quebrantados».", "Isaías 57:15"],
      ["m1-04", 1, "o1", "analizar", "¿Qué muestra que Jesús le hablara así a una iglesia activa y firme en la doctrina como Éfeso?", "Que la actividad y la doctrina no reemplazan el amor", ["Que la doctrina no importa", "Que la actividad es pecado", "Que Éfeso no era una iglesia"], "«has dejado tu primer amor».", "Apocalipsis 2:4-5"],
      ["m1-05", 1, "o1", "recordar", "¿Qué tres cosas pide Jesús a Éfeso en Apocalipsis 2:5?", "Recordar de dónde cayó, arrepentirse y hacer las primeras obras", ["Construir, crecer y celebrar", "Callar, esperar y descansar", "Ayunar, cantar y ofrendar"], "«Recuerda, por tanto, de dónde has caído, y arrepiéntete, y haz las primeras obras».", "Apocalipsis 2:4-5"],
      ["m1-06", 1, "o1", "evaluar", "¿Con qué se busca el avivamiento, según el artículo 15 de la declaración de fe?", "Con oración, con arrepentimiento y con obediencia a la Palabra", ["Con publicidad y música", "Con dinero y edificios", "Con emociones fuertes"], "Pedro también unió el arrepentimiento con los tiempos de refrigerio.", "Hechos 3:19"],
      ["m1-07", 2, "o2", "recordar", "¿Qué celebró Ezequías después de purificar el templo, según la lección?", "La Pascua", ["Una coronación", "Una boda", "Una victoria militar"], "Después hubo gran regocijo en Jerusalén.", "2 Crónicas 30:26"],
      ["m1-08", 2, "o2", "comprender", "¿Qué muestra que Josías rasgara sus vestidos?", "Que la Palabra produjo en él quebranto por el pecado", ["Que estaba enojado con los sacerdotes", "Que no le gustó el libro", "Que tenía frío"], "«rasgó sus vestidos».", "2 Reyes 22:11"],
      ["m1-09", 2, "o2", "aplicar", "Un grupo de jóvenes quiere renovar su compromiso con Dios después de un retiro. ¿Qué ejemplo de Josías les sirve?", "Hacer pacto delante de Jehová de seguirlo con todo el corazón", ["Firmar un contrato con la iglesia", "Prometer sin conocer la Palabra", "Esperar el próximo retiro"], "«hizo pacto delante de Jehová, de que irían en pos de Jehová».", "2 Reyes 23:3"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué fue tan importante la Palabra en los avivamientos del Antiguo Testamento?", "Porque al redescubrirla y entenderla, el pueblo vio su pecado y volvió a Dios", ["Porque se usaba como amuleto", "Porque reemplazaba la oración", "Porque solo la leían los reyes"], "«Y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
      ["m1-11", 2, "o2", "aplicar", "Un hermano dice que 2 Crónicas 7:14 garantiza que su país será próspero si la iglesia ora. ¿Qué le aclaras?", "Que fue una promesa a Israel bajo el antiguo pacto, y que su principio es que Dios oye y perdona a su pueblo humillado", ["Que tiene razón", "Que el versículo no tiene ningún valor", "Que solo vale para Salomón"], "«entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra».", "2 Crónicas 7:14"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué fruto tuvieron los avivamientos de Ezequías y de Nehemías?", "El gozo, con cambios reales en la vida del pueblo", ["Una tristeza sin fin", "Divisiones", "Nada"], "«el gozo de Jehová es vuestra fuerza».", "Nehemías 8:10"],
      ["m1-13", 3, "o3", "recordar", "¿Qué hicieron los discípulos cuando fueron llenos del Espíritu, según Hechos 2:4?", "Comenzaron a hablar en otras lenguas", ["Construyeron un templo", "Escribieron libros", "Gobernaron la ciudad"], "«y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».", "Hechos 2:1-4"],
      ["m1-14", 3, "o3", "comprender", "¿Para quiénes es la promesa, según Hechos 2:39?", "Para ellos, para sus hijos y para todos los que están lejos", ["Solo para los apóstoles", "Solo para los judíos de Jerusalén", "Solo para el primer siglo"], "«Porque para vosotros es la promesa, y para vuestros hijos, y para todos los que están lejos».", "Hechos 2:37-41"],
      ["m1-15", 3, "o3", "aplicar", "Un joven pregunta si el Espíritu de Pentecostés es también para él hoy. ¿Qué le muestras?", "Hechos 2:39: la promesa es para todos los que están lejos, para cuantos el Señor llamare", ["Que fue solo para los apóstoles", "Que se acabó en el primer siglo", "Que solo es para los pastores"], "«para cuantos el Señor nuestro Dios llamare».", "Hechos 2:37-41"],
      ["m1-16", 3, "o3", "analizar", "¿Qué hacían las señales de Felipe en Samaria?", "Acompañaban la predicación de Cristo", ["Reemplazaban la predicación", "Servían para ganar dinero", "Eran magia"], "«Entonces Felipe, descendiendo a la ciudad de Samaria, les predicaba a Cristo».", "Hechos 8:5-8"],
      ["m1-17", 3, "o3", "aplicar", "Un líder quiere que su iglesia crezca, pero nunca ora con ella. ¿Qué le enseña Hechos 4?", "Que la oración unida acompaña a los avivamientos, como en Hechos 4:31", ["Que la oración no es necesaria", "Que bastan buenos programas", "Que el crecimiento depende solo del líder"], "«Cuando hubieron orado, el lugar en que estaban congregados tembló».", "Hechos 4:31"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué permanece hoy de los avivamientos de Hechos, según la lección?", "La oración unida, la predicación de Cristo, el arrepentimiento real, el gozo y la valentía", ["Solo los milagros", "Solo el número de convertidos", "Nada"], "«hablaban con denuedo la palabra de Dios».", "Hechos 4:31"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué salió de la cadena de oración de Herrnhut, según la lección?", "Cientos de misioneros", ["Un ejército", "Un país nuevo", "Una universidad"], "Según la Iglesia Morava, esa cadena de oración duró unos cien años.", "Salmos 78:4"],
      ["m2-02", 4, "o4", "comprender", "¿Con qué encuentro empezó el Segundo Gran Despertar en Estados Unidos, según la lección?", "Con encuentros como el de Cane Ridge, en Kentucky, en 1801", ["Con la calle Azusa, en 1906", "Con Herrnhut, en 1727", "Con Valparaíso, en 1909"], "Siguió después con la predicación de Charles Finney.", "Salmos 78:4"],
      ["m2-03", 4, "o4", "aplicar", "Un maestro de escuela dominical quiere contar a los niños lo que Dios ha hecho en la historia. ¿Qué le enseña Salmos 78:4?", "Que contar a la generación venidera las maravillas de Dios es parte de la fe", ["Que eso no es para niños", "Que no hace falta contar nada", "Que la historia aburre"], "«Contando a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo».", "Salmos 78:4"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué dice la lección que los avivamientos verdaderos dejan frutos que duran?", "Porque cambian a la iglesia y a la sociedad: misiones, ayuda a los pobres y lucha contra la injusticia", ["Porque duran siempre lo mismo", "Porque no dejan nada", "Porque solo cambian las emociones"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
      ["m2-05", 4, "o4", "recordar", "¿A quién escribió Juan Wesley su última carta, en 1791?", "A William Wilberforce, para animarlo contra el comercio de esclavos", ["A George Whitefield", "Al rey de Inglaterra", "A Jonathan Edwards"], "Es uno de los frutos sociales del avivamiento metodista.", "Hebreos 13:8"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué distingue a un avivamiento verdadero de una moda pasajera, según la lección?", "Que deja frutos que duran en la iglesia y en la sociedad", ["Que tiene más publicidad", "Que dura menos", "Que hace más ruido"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
      ["m2-07", 5, "o5", "recordar", "¿Qué no debe hacer la iglesia con las profecías, según 1 Tesalonicenses 5:20?", "Menospreciarlas", ["Examinarlas", "Retener lo bueno", "Orar por ellas"], "«No menospreciéis las profecías».", "1 Tesalonicenses 5:19-21"],
      ["m2-08", 5, "o5", "comprender", "¿Qué da el árbol malo, según Mateo 7:17?", "Frutos malos", ["Buenos frutos", "Ningún fruto", "Solo flores"], "«pero el árbol malo da frutos malos».", "Mateo 7:15-17"],
      ["m2-09", 5, "o5", "aplicar", "Un predicador famoso visita tu ciudad y muchos lo siguen por sus milagros, pero su vida tiene escándalos. ¿Qué te enseña Mateo 7?", "Que al profeta se le conoce por sus frutos", ["Que los milagros lo prueban todo", "Que la fama es una señal de Dios", "Que no hay que examinar a nadie"], "«Guardaos de los falsos profetas, que vienen a vosotros con vestidos de ovejas».", "Mateo 7:15-17"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué Edwards no rechazó el Gran Despertar a pesar de sus excesos?", "Porque vio en él las señales de una obra verdadera: Cristo exaltado, el pecado dejado, la Escritura amada y el amor", ["Porque nunca vio excesos", "Porque le convenía", "Porque no le importaba la verdad"], "«En esto conoced el Espíritu de Dios».", "1 Juan 4:1-3"],
      ["m2-11", 5, "o5", "aplicar", "Una hermana sale de un culto muy emocionada, pero sin ningún cambio en su vida. ¿Qué le enseñas con amor?", "Que la emoción por sí sola no prueba la obra de Dios: la prueba son los frutos", ["Que la emoción lo prueba todo", "Que debe dejar de emocionarse", "Que el fruto no importa"], "«Por sus frutos los conoceréis».", "Mateo 7:15-17"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué dos cosas necesita a la vez el líder ante un avivamiento, según la lección?", "Apertura al Espíritu y discernimiento", ["Dinero y publicidad", "Silencio y control total", "Fama y poder"], "«No apaguéis al Espíritu».", "1 Tesalonicenses 5:19-21"],
      ["m2-13", 6, "o6", "recordar", "¿Con quiénes oraban los discípulos en Hechos 1:14?", "Con las mujeres, con María la madre de Jesús y con sus hermanos", ["Solo con los fariseos", "Solo con los soldados", "Con nadie"], "«con las mujeres, y con María la madre de Jesús, y con sus hermanos».", "Hechos 1:14"],
      ["m2-14", 6, "o6", "comprender", "¿Qué siembra el pueblo que busca a Dios, según Oseas 10:12?", "Justicia, para segar misericordia", ["Discordia", "Riqueza", "Nada"], "«Sembrad para vosotros en justicia, segad para vosotros en misericordia».", "Oseas 10:12"],
      ["m2-15", 6, "o6", "aplicar", "Un pastor quiere preparar a su iglesia para un avivamiento. ¿Qué pasos le sugiere la lección?", "Oración unida, arrepentimiento, limpieza del corazón y volver a la Palabra", ["Comprar mejores equipos de sonido", "Invitar al predicador más famoso", "Anunciar fechas de milagros"], "«Acercaos a Dios, y él se acercará a vosotros».", "Santiago 4:8"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la cosecha de un avivamiento pide obreros?", "Porque los nuevos creyentes necesitan quien los enseñe y los cuide", ["Porque Dios no puede solo", "Porque hay que cobrar a los nuevos", "Porque la cosecha se pierde sola"], "«A la verdad la mies es mucha, mas los obreros pocos».", "Mateo 9:37-38"],
      ["m2-17", 6, "o6", "aplicar", "Una joven dice que el avivamiento depende solo de su pastor. ¿Qué le enseñas?", "Que todos buscan a Dios, y que depender de una sola persona apaga el avivamiento", ["Que tiene razón", "Que el pastor debe hacerlo todo", "Que ella no tiene nada que hacer"], "«Todos éstos perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué resume la frase de la lección prepara la tierra hoy; la lluvia la manda Dios?", "Que la iglesia busca el avivamiento con fidelidad, pero solo Dios lo da", ["Que no hay que hacer nada", "Que todo depende de la iglesia", "Que la lluvia es el dinero"], "«porque es el tiempo de buscar a Jehová, hasta que venga y os enseñe justicia».", "Oseas 10:12"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-avivamiento-e1",
      tipo: "corta",
      pregunta: "Explica qué es el avivamiento y en qué se diferencia de una campaña de evangelización.",
      ideas: [
        { id: "definicion", peso: 30, texto: "La obra del Espíritu que devuelve la vida al pueblo de Dios.", formas: ["obra del espiritu", "darnos vida", "dar vida", "vida de nuevo", "devuelve la vida", "devolver la vida", "renueva", "renovacion", "despierta a la iglesia", "pueblo de dios"] },
        { id: "frutos", peso: 30, texto: "Despierta a la santidad, la oración y el primer amor, y alcanza a los perdidos.", formas: ["santidad", "primer amor", "la oracion", "a los perdidos", "con poder"] },
        { id: "diferencia", peso: 30, texto: "La campaña anuncia el evangelio a los que no creen; puede ser fruto del avivamiento, pero no es lo mismo.", formas: ["campana", "evangelizacion", "los que no creen", "no es lo mismo", "fruto del avivamiento"] },
      ],
      citas: ["Habacuc 3:2", "Salmos 85:6", "Hechos 3:19", "Isaías 57:15", "Apocalipsis 2:4-5", "2 Crónicas 7:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El avivamiento es la obra del Espíritu que vuelve a darnos vida como pueblo de Dios (Salmos 85:6): despierta a la iglesia a la santidad, la oración y el primer amor, y la lanza hacia los perdidos. Una campaña de evangelización anuncia el evangelio a los que no creen; puede ser fruto del avivamiento, pero no es lo mismo.",
    },
    {
      id: "n5-avivamiento-e2",
      tipo: "corta",
      pregunta: "Describe el patrón que se repite en los avivamientos del Antiguo Testamento, con un ejemplo.",
      ideas: [
        { id: "palabra", peso: 30, texto: "La Palabra redescubierta y explicada.", formas: ["la palabra", "libro de la ley", "ley de dios", "ponian el sentido", "la escritura"] },
        { id: "arrepentimiento", peso: 30, texto: "El arrepentimiento y el quebranto.", formas: ["arrepent*", "arrepient*", "quebranto", "rasgo sus vestidos", "lloro", "lloraron"] },
        { id: "ejemplo", peso: 30, texto: "Un ejemplo: Ezequías, Josías o Esdras y Nehemías.", formas: ["ezequias", "josias", "esdras", "nehemias"] },
      ],
      citas: ["2 Crónicas 29:3", "2 Crónicas 30:26", "2 Reyes 22:11", "2 Reyes 23:3", "Nehemías 8:8", "Nehemías 8:10", "2 Crónicas 7:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En los avivamientos del Antiguo Testamento alguien busca a Dios, la Palabra se redescubre y se explica, el pueblo se arrepiente con quebranto, la adoración se renueva y llega el gozo. Con Josías se halló el libro de la ley, y el rey rasgó sus vestidos (2 Reyes 22:11) y renovó el pacto con todo el pueblo.",
    },
    {
      id: "n5-avivamiento-e3",
      tipo: "corta",
      pregunta: "Explica dos señales de una obra verdadera del Espíritu y por qué las emociones no bastan para juzgarla.",
      ideas: [
        { id: "cristo", peso: 30, texto: "Exalta a Jesús como Hijo de Dios y Salvador.", formas: ["exalta a jesus", "exalta a cristo", "confiesa que jesucristo", "jesucristo ha venido en carne", "glorifica a cristo"] },
        { id: "otra", peso: 30, texto: "Otra señal: aleja del pecado, ama la Escritura, lleva a la verdad o produce amor.", formas: ["dejar el pecado", "deje el pecado", "dejen el pecado", "dejan el pecado", "aleja del pecado", "ama la escritura", "la verdad", "amor a dios", "amor al projimo", "produce amor"] },
        { id: "emociones", peso: 30, texto: "Las emociones no prueban nada por sí solas: la prueba son los frutos.", formas: ["por sus frutos", "los frutos", "el fruto", "no prueban", "por si solas", "por si solos", "por si mismas"] },
      ],
      citas: ["1 Juan 4:1-3", "1 Juan 4:2", "Mateo 7:15-17", "Mateo 7:16", "1 Tesalonicenses 5:19-21", "1 Tesalonicenses 5:21", "1 Corintios 14:33"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Según Jonathan Edwards, una obra verdadera del Espíritu exalta a Jesús como Hijo de Dios y Salvador, y aleja del pecado; también ama la Escritura y produce amor. Las lágrimas o los gritos no prueban por sí solos que la obra sea de Dios, ni que no lo sea: por sus frutos los conoceréis (Mateo 7:16).",
    },
    {
      id: "n5-avivamiento-e4",
      tipo: "breve",
      pregunta: "Explica a un grupo de líderes lo que tienen en común los avivamientos de la historia, con ejemplos y citas bíblicas, y qué frutos dejaron.",
      ideas: [
        { id: "ejemplos", peso: 25, texto: "Ejemplos: Herrnhut, el Gran Despertar, los Wesley, Cane Ridge, Fulton, Gales, Azusa, Pyongyang o Valparaíso.", formas: ["herrnhut", "moravos", "gran despertar", "edwards", "wesley", "whitefield", "gales", "azusa", "valparaiso", "pyongyang", "fulton", "cane ridge"] },
        { id: "comun", peso: 30, texto: "Lo común: oración, la Palabra, convicción de pecado, conversiones, santidad, gozo y misión.", formas: ["oracion", "la palabra", "conviccion de pecado", "conversiones", "santidad", "mision"] },
        { id: "mismo", peso: 20, texto: "El Señor es el mismo ayer, hoy y por los siglos.", formas: ["el mismo ayer", "es el mismo", "el mismo senor"] },
        { id: "frutos", peso: 25, texto: "Frutos que duran: misiones, escuelas, ayuda a los pobres, lucha contra la esclavitud.", formas: ["esclavitud", "wilberforce", "misioneros", "escuelas", "los pobres", "frutos que duran"] },
      ],
      basta: 85,
      citas: ["Hebreos 13:8", "Salmos 78:4", "Habacuc 3:2", "Hechos 2:42", "2 Crónicas 7:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, Dios ha avivado a su iglesia muchas veces. En 1727 los moravos de Herrnhut vivieron un avivamiento que produjo una cadena de oración y cientos de misioneros. En el siglo XVIII llegaron el Gran Despertar con Jonathan Edwards y el avivamiento de los Wesley y Whitefield; luego Cane Ridge, la calle Fulton, Gales en 1904, la calle Azusa en 1906 y Valparaíso en 1909. Todos se parecen, porque Jesucristo es el mismo ayer, y hoy, y por los siglos (Hebreos 13:8): oración perseverante, la Palabra predicada, convicción de pecado, conversiones, santidad, gozo y misión. Y dejaron frutos que duran: misioneros, escuelas, ayuda a los pobres y la lucha contra la esclavitud, como la de Wilberforce, a quien Wesley animó en 1791.",
    },
    {
      id: "n5-avivamiento-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia vive un tiempo de renovación espiritual, con manifestaciones que algunos celebran y otros temen. Explica cómo la guiarías con discernimiento, sin apagar al Espíritu, con citas bíblicas.",
      ideas: [
        { id: "no_apagar", peso: 20, texto: "No apagar al Espíritu ni menospreciar las profecías.", negativa: true, formas: ["apagar al espiritu", "apagueis al espiritu", "apaguen lo que dios hace", "menospreciar las profecias", "menosprecieis las profecias"] },
        { id: "examinar", peso: 25, texto: "Examinarlo todo y retener lo bueno.", formas: ["examinadlo todo", "examinarlo todo", "retened lo bueno", "retener lo bueno", "probad los espiritus", "probar los espiritus"] },
        { id: "pruebas", peso: 25, texto: "Las pruebas: Cristo exaltado y los frutos.", formas: ["exalta a jesus", "exalta a cristo", "exaltado", "confiesa que jesucristo", "por sus frutos", "los frutos", "frutos"] },
        { id: "orden", peso: 15, texto: "Todo con orden: Dios no es Dios de confusión.", formas: ["con orden", "decentemente", "dios de confusion", "dios de paz"] },
        { id: "manipulacion", peso: 15, texto: "Rechazar la manipulación: es fuego extraño.", formas: ["fuego extrano", "manipulacion", "manipular", "espectaculo"] },
      ],
      basta: 85,
      citas: ["1 Tesalonicenses 5:19-21", "1 Tesalonicenses 5:21", "1 Juan 4:1-3", "1 Juan 4:1", "Mateo 7:15-17", "Mateo 7:16", "1 Corintios 14:33", "1 Corintios 14:40", "Levítico 10:1-2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Guiaría a la iglesia con las tres frases de Pablo: no apaguéis al Espíritu, no menospreciéis las profecías, examinadlo todo y retened lo bueno (1 Tesalonicenses 5:19-21). A los que temen les diría que no apaguen lo que Dios hace; a los que lo celebran todo, que hay que probar los espíritus. Las pruebas son Cristo y los frutos: una obra verdadera exalta a Jesús, aleja del pecado y produce amor, y por sus frutos los conoceréis. Cuidaría que todo se haga decentemente y con orden, porque Dios no es Dios de confusión, y rechazaría toda manipulación de las emociones o del dinero, porque eso es fuego extraño. Así la iglesia queda abierta al Espíritu y firme en la Palabra.",
    },
  ],
  breve: {
    id: "n5-avivamiento-b1",
    tipo: "breve",
    pregunta: "Escribe un plan para buscar el avivamiento en tu iglesia y sostener sus frutos, con su base bíblica.",
    ideas: [
      { id: "oracion", peso: 20, texto: "La oración unida y perseverante.", formas: ["oracion unida", "orar juntos", "unanimes en oracion", "perseveraban unanimes", "cadena de oracion", "reuniones de oracion"] },
      { id: "arrepentimiento", peso: 20, texto: "El arrepentimiento y la limpieza del corazón.", formas: ["arrepent*", "arrepient*", "limpiando las manos", "limpiad las manos", "purificando", "purificad", "se humillare", "barbecho"] },
      { id: "palabra", peso: 20, texto: "Volver a la Palabra.", formas: ["la palabra", "la escritura", "leer la biblia", "su sentido", "libro de la ley"] },
      { id: "discipulado", peso: 25, texto: "Sostener los frutos con discipulado y grupos.", formas: ["discipulado", "discipular", "grupos pequenos", "clases metodistas", "perseveran en la doctrina", "perseveraban en la doctrina"] },
      { id: "obreros", peso: 15, texto: "Formar y enviar obreros.", formas: ["obreros", "formar lideres", "enviar misioneros", "misioneros"] },
    ],
    basta: 85,
    citas: ["Hechos 1:14", "Santiago 4:8", "Oseas 10:12", "Hechos 2:42", "Mateo 9:37-38", "Mateo 9:38", "Gálatas 6:9", "2 Crónicas 7:14", "Habacuc 3:2", "Nehemías 8:8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Mi plan tendría cinco partes. Primero, la oración unida: como los discípulos, que perseveraban unánimes en oración (Hechos 1:14), abriría reuniones de oración cada semana. Segundo, el arrepentimiento: enseñaría a acercarnos a Dios limpiando las manos y purificando el corazón, como pide Santiago 4:8, y a hacer barbecho, como dice Oseas. Tercero, la Palabra: leerla con claridad y explicar su sentido, como en Nehemías 8. Cuarto, el discipulado: los nuevos creyentes no quedarían sueltos, sino en grupos pequeños que perseveran en la doctrina, la comunión y la oración, como en Hechos 2:42. Quinto, formar obreros y enviar misioneros, rogando al Señor de la mies. Y no nos cansaríamos de hacer bien, porque a su tiempo segaremos.",
  },
};
