/**
 * El banco de «Homilética II: predicación expositiva» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la predicación expositiva · o2 del texto a la idea del sermón · o3 predicar según el género ·
 * o4 la estructura · o5 la aplicación, Cristo y el llamado · o6 la entrega y la rúbrica · o7 el versículo de memoria
 * (1 Corintios 2:2).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-homiletica-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_HOMILETICA_2: BancoMateria = {
  materia: "n4-homiletica-2",
  repaso: {
    "n4-homiletica-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué no rehuyó anunciar Pablo a los efesios, según Hechos 20:27?", "Todo el consejo de Dios", ["Solo lo agradable", "Solo los milagros", "Solo la ley"], "«porque no he rehuido anunciaros todo el consejo de Dios».", "Hechos 20:27"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es la predicación expositiva?", "La que explica y aplica un pasaje de modo que el mensaje del sermón sea el del texto", ["La que reúne versículos sueltos sobre un tema", "La que habla de lo que piensa el predicador", "La que solo lee la Biblia sin explicar"], "Leían claramente y ponían el sentido.", "Nehemías 8:8"],
      ["1-r3", 1, "o1", "recordar", "¿Cómo es la palabra de Dios, según Hebreos 4:12?", "Viva y eficaz, más cortante que toda espada de dos filos", ["Antigua y lejana", "Difícil y oscura", "Débil sin el predicador"], "«Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos».", "Hebreos 4:12"],
    ] as P[]).map(p),
    "n4-homiletica-2-2": ([
      ["2-r1", 2, "o2", "comprender", "¿Qué es la idea exegética?", "Lo que el pasaje dijo a sus primeros lectores, en una frase", ["La opinión del predicador", "El título del sermón", "Una ilustración"], "El obrero aprobado usa bien la palabra de verdad.", "2 Timoteo 2:15"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es la idea homilética?", "La misma verdad del pasaje, dicha con claridad para los oyentes de hoy", ["Una idea distinta de la del pasaje", "Un chiste para empezar", "La conclusión de un comentario"], "Usar bien la palabra de verdad.", "2 Timoteo 2:15"],
      ["2-r3", 2, "o2", "recordar", "¿Qué había aprendido Pablo, según Filipenses 4:11?", "A contentarse, cualquiera que fuera su situación", ["A lograr cualquier meta", "A hacerse rico", "A no sufrir nunca"], "«he aprendido a contentarme, cualquiera que sea mi situación».", "Filipenses 4:11"],
    ] as P[]).map(p),
    "n4-homiletica-2-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Quién es el héroe en las narraciones bíblicas?", "Dios", ["Siempre el personaje principal", "El lector", "El predicador"], "«porque de Jehová es la batalla».", "1 Samuel 17:47"],
      ["3-r2", 3, "o3", "aplicar", "¿Qué se busca al predicar una parábola?", "El punto principal que Jesús quiso enseñar", ["Un significado para cada detalle", "Una fecha del fin", "Una historia nueva"], "Jesús contó la parábola sobre la necesidad de orar siempre, y no desmayar.", "Lucas 18:1"],
      ["3-r3", 3, "o3", "comprender", "¿Qué se sigue al predicar una epístola?", "El argumento y sus conectores, párrafo por párrafo", ["Solo las frases bonitas", "Solo los saludos", "Solo los nombres"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    ] as P[]).map(p),
    "n4-homiletica-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cuál fue la idea central del sermón de Pedro en Pentecostés?", "Que Dios hizo Señor y Cristo a Jesús", ["Que el templo sería destruido", "Que había que guardar la ley", "Que Juan el Bautista era el Mesías"], "«Dios le ha hecho Señor y Cristo».", "Hechos 2:36"],
      ["4-r2", 4, "o4", "comprender", "¿Qué es un sermón inductivo?", "Uno que empieza con preguntas o con la historia y llega a la idea central al final", ["Uno que dice la idea al principio", "Uno sin idea central", "Uno que solo cuenta historias"], "Pedro llevó a sus oyentes paso a paso hasta su idea.", "Hechos 2:36"],
      ["4-r3", 4, "o4", "aplicar", "¿De dónde salen los puntos de un sermón expositivo?", "Del mismo pasaje, en el orden del autor", ["De la imaginación del predicador", "De un sermón de internet", "De temas sin relación con el texto"], "En Efesios 2, el texto da el bosquejo: lo que éramos, lo que Dios hizo y para qué.", "Efesios 2:4"],
    ] as P[]).map(p),
    "n4-homiletica-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué se propuso saber Pablo entre los corintios?", "Solo a Jesucristo, y a éste crucificado", ["Toda la ley", "La filosofía griega", "Las historias de la iglesia"], "«Pues me propuse no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado».", "1 Corintios 2:2"],
      ["5-r2", 5, "o5", "comprender", "¿De dónde sale la aplicación de un sermón?", "Del propósito del pasaje", ["De las opiniones del predicador", "De lo que la gente quiere oír", "De un tema de moda"], "Sed hacedores de la palabra.", "Santiago 1:22"],
      ["5-r3", 5, "o5", "comprender", "¿Cómo debe ser el llamado al final del sermón?", "Claro, sincero y sin presión manipuladora", ["Largo y con amenazas", "Oculto y confuso", "Siempre igual, sin importar el texto"], "«os rogamos en nombre de Cristo: Reconciliaos con Dios».", "2 Corintios 5:20"],
    ] as P[]).map(p),
    "n4-homiletica-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿En qué le pidió Pablo a Timoteo que se ocupara, según 1 Timoteo 4:13?", "En la lectura, la exhortación y la enseñanza", ["En los negocios", "En la política", "En las genealogías"], "«ocúpate en la lectura, la exhortación y la enseñanza».", "1 Timoteo 4:13"],
      ["6-r2", 6, "o6", "recordar", "¿Cuántos puntos vale la fidelidad al texto en la rúbrica del sermón?", "25 de 100", ["5 de 100", "50 de 100", "Ninguno"], "El mensaje del sermón debe ser el mensaje del pasaje.", "2 Timoteo 2:15"],
      ["6-r3", 6, "o6", "aplicar", "¿Con cuántos puntos se aprueba el sermón del Nivel 4?", "Con 70", ["Con 50", "Con 100", "Con 30"], "Procura con diligencia presentarte a Dios aprobado.", "2 Timoteo 2:15"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: la predicación expositiva (10)
    ["f01", 1, "o1", "recordar", "¿A quiénes les habló Pablo en Hechos 20 sobre todo el consejo de Dios?", "A los ancianos de Éfeso", ["A los fariseos", "A los atenienses", "A los soldados romanos"], "No he rehuido anunciaros todo el consejo de Dios.", "Hechos 20:27"],
    ["f02", 1, "o1", "comprender", "¿Qué diferencia a la predicación expositiva de la temática?", "La expositiva parte de un pasaje completo; la temática, de un tema con versículos de varios lugares", ["No hay diferencia", "La temática no usa la Biblia", "La expositiva no tiene aplicación"], "Pablo anunció todo el consejo de Dios.", "Hechos 20:27"],
    ["f03", 1, "o1", "comprender", "¿Qué es un sermón textual?", "Uno que parte de un versículo o de una frase y la desarrolla", ["Uno que lee un libro entero sin explicar", "Uno sin Biblia", "Uno solo de historias"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    ["f04", 1, "o1", "analizar", "¿Qué riesgo tiene la predicación temática?", "Sacar los textos de su contexto", ["Ser demasiado bíblica", "Ser demasiado corta", "No tener tema"], "Leían claramente y ponían el sentido.", "Nehemías 8:8"],
    ["f05", 1, "o1", "recordar", "¿Qué hacían los levitas en Nehemías 8:8?", "Leían claramente y ponían el sentido para que entendieran", ["Cantaban sin leer", "Leían en voz baja", "Cambiaban las palabras"], "«claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f06", 1, "o1", "comprender", "¿Dónde está la autoridad del sermón expositivo?", "En la Palabra, no en el predicador", ["En la elocuencia", "En el título del pastor", "En la cantidad de oyentes"], "La palabra de Dios es viva y eficaz.", "Hebreos 4:12"],
    ["f07", 1, "o1", "analizar", "¿Por qué predicar libros completos protege al predicador?", "Porque lo lleva a predicar todo el consejo de Dios y no solo sus temas favoritos", ["Porque es más corto", "Porque no hay que estudiar", "Porque no hace falta aplicar"], "No he rehuido anunciaros todo el consejo de Dios.", "Hechos 20:27"],
    ["f08", 1, "o1", "evaluar", "Un predicador usa un versículo como trampolín para hablar de otra cosa. ¿Qué principio olvida?", "Que el texto manda: el mensaje del sermón debe ser el del pasaje", ["Que debe hablar más fuerte", "Que debe usar más chistes", "Ninguno"], "Usar bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f09", 1, "o1", "comprender", "¿Es la predicación expositiva leer un comentario en voz alta?", "No: tiene una idea clara, estructura, ilustraciones y aplicación", ["Sí, siempre", "Sí, pero sin aplicación", "Sí, pero sin estructura"], "La palabra de Dios llega hasta el corazón.", "Hebreos 4:12"],
    ["f10", 1, "o7", "recordar", "Completa 1 Corintios 2:2: Pues me propuse no saber entre vosotros cosa alguna…", "sino a Jesucristo, y a éste crucificado", ["sino la sabiduría de los griegos", "sino la ley de Moisés", "sino mis propias experiencias"], "Es el versículo de memoria de la materia.", "1 Corintios 2:2"],
    // ---- lección 2: del texto a la idea del sermón (10)
    ["f11", 2, "o2", "recordar", "¿Qué se estudia en el contexto histórico de un pasaje?", "Quién escribió, a quién, cuándo y por qué", ["Solo el número del capítulo", "Solo el significado en otro idioma", "La opinión del lector"], "El obrero aprobado usa bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f12", 2, "o2", "comprender", "¿Qué incluye el contexto literario?", "Lo que hay antes y después, y el género del texto", ["El precio de la Biblia", "La traducción favorita", "Solo las notas al pie"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f13", 2, "o2", "aplicar", "¿Qué hay que observar en la gramática de un pasaje?", "Los verbos, los conectores y las palabras clave", ["El tamaño de la letra", "Los dibujos del libro", "Los números de página"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f14", 2, "o2", "comprender", "¿Qué significa Filipenses 4:13 en su contexto?", "El secreto del contentamiento en Cristo en cualquier situación", ["Que podemos lograr cualquier meta deportiva", "Que nunca fallaremos", "Que seremos ricos"], "«Todo lo puedo en Cristo que me fortalece».", "Filipenses 4:13"],
    ["f15", 2, "o2", "analizar", "¿Para qué escribió Pablo Filipenses 4:10-13?", "Para agradecer una ofrenda desde la cárcel", ["Para enseñar a ganar dinero", "Para pedir más ofrendas", "Para hablar de deportes"], "«he aprendido a contentarme, cualquiera que sea mi situación».", "Filipenses 4:11"],
    ["f16", 2, "o2", "crear", "¿Cuál es una buena idea homilética para Filipenses 4:11-13?", "En Cristo puedes estar contento en cualquier situación", ["Con fe puedes lograr todo lo que quieras", "El dinero da contentamiento", "Pablo estaba en la cárcel"], "«Todo lo puedo en Cristo que me fortalece».", "Filipenses 4:13"],
    ["f17", 2, "o2", "comprender", "¿Qué es el puente en la predicación?", "Llevar el principio del pasaje, que vale para todos los tiempos, a la vida de los oyentes", ["Cambiar el sentido del texto para que guste", "Contar la historia de un puente", "Saltarse el contexto"], "Toda la Escritura es útil para instruir en justicia.", "2 Timoteo 3:16"],
    ["f18", 2, "o2", "evaluar", "Un predicador aplica Filipenses 4:13 a ganar un partido de fútbol. ¿Qué error comete?", "Saca el versículo de su contexto", ["Ninguno", "Usa demasiado el contexto", "Lo explica demasiado"], "He aprendido a contentarme, cualquiera que sea mi situación.", "Filipenses 4:11"],
    ["f19", 2, "o2", "aplicar", "¿Qué conviene hacer antes de predicar una frase de la Biblia?", "Leer el párrafo completo", ["Leer solo la frase", "Buscar una imagen bonita", "Pensar un chiste"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f20", 2, "o2", "comprender", "¿Quién propone ir de la idea exegética a la idea homilética?", "Haddon Robinson", ["Martín Lutero", "Juan Wesley", "Agustín"], "Usar bien la palabra de verdad exige trabajo.", "2 Timoteo 2:15"],
    // ---- lección 3: predicar según el género (10)
    ["f21", 3, "o3", "comprender", "¿Qué se pierde al predicar una narración como un simple consejo moral?", "Que el héroe es Dios y lo que él hace", ["Nada", "Se habla demasiado de Dios", "Se cuenta la historia"], "«porque de Jehová es la batalla».", "1 Samuel 17:47"],
    ["f22", 3, "o3", "recordar", "¿Qué dijo David sobre la batalla contra Goliat?", "Que Jehová no salva con espada y con lanza, porque de Jehová es la batalla", ["Que él era más fuerte", "Que su honda era mágica", "Que Saúl le daría la victoria"], "«Jehová no salva con espada y con lanza; porque de Jehová es la batalla».", "1 Samuel 17:47"],
    ["f23", 3, "o3", "aplicar", "¿Cómo se apunta a Cristo desde la historia de David y Goliat?", "Cristo venció a nuestro enemigo por nosotros, como David peleó por Israel", ["Comparando a Cristo con Goliat", "Diciendo que nosotros somos David", "No se puede apuntar a Cristo"], "De Jehová es la batalla.", "1 Samuel 17:47"],
    ["f24", 3, "o3", "recordar", "¿Qué enseña la parábola del juez injusto, según Lucas 18:1?", "La necesidad de orar siempre, y no desmayar", ["Que Dios es injusto", "Que hay que pagar a los jueces", "Que las viudas no deben orar"], "«sobre la necesidad de orar siempre, y no desmayar».", "Lucas 18:1"],
    ["f25", 3, "o3", "analizar", "En la parábola del juez injusto, ¿representa el juez a Dios?", "No: es un contraste; si un juez injusto atiende, cuánto más Dios", ["Sí, Dios es como ese juez", "Sí, Dios no quiere escuchar", "No tiene ningún sentido"], "«¿Y acaso Dios no hará justicia a sus escogidos, que claman a él día y noche?».", "Lucas 18:7"],
    ["f26", 3, "o3", "comprender", "¿Qué se atiende al predicar un salmo?", "El paralelismo, las imágenes y el sentimiento, para llevar a la oración y la adoración", ["Solo las fechas", "Solo los nombres", "Solo la gramática griega"], "Toda la Escritura es útil.", "2 Timoteo 3:16"],
    ["f27", 3, "o3", "aplicar", "¿Cuál es el orden para predicar un texto profético?", "Su mensaje en su tiempo, su cumplimiento en Cristo y, con humildad, lo que falta", ["Primero las fechas del fin", "Solo lo que falta por cumplirse", "Solo su tiempo, sin Cristo"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    ["f28", 3, "o3", "evaluar", "Un predicador convierte cada detalle de una parábola en un símbolo. ¿Qué error comete?", "Alegoriza y pierde el punto principal que Jesús quiso enseñar", ["Ninguno", "Es demasiado literal", "Usa demasiado el contexto"], "Jesús contó la parábola con un propósito claro.", "Lucas 18:1"],
    ["f29", 3, "o3", "comprender", "¿Qué significa que el género dé forma al sermón?", "Que el sermón respeta el tono del texto: contar una historia, orar un salmo, razonar una carta", ["Que todos los sermones son iguales", "Que el género no importa", "Que hay que cambiar el género del texto"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    ["f30", 3, "o3", "aplicar", "¿Qué palabras conviene seguir al predicar una epístola?", "Los conectores, como por tanto, porque y pero", ["Solo los nombres propios", "Solo los números", "Solo los saludos finales"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    // ---- lección 4: la estructura (10)
    ["f31", 4, "o4", "recordar", "¿Con qué llamado terminó Pedro su sermón en Pentecostés?", "Arrepentíos, y bautícese cada uno de vosotros", ["Id en paz", "Volved mañana", "Guardad la ley"], "«Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados».", "Hechos 2:38"],
    ["f32", 4, "o4", "comprender", "¿Qué es un sermón deductivo?", "El que presenta la idea central al principio y después la explica, la prueba y la aplica", ["El que nunca dice la idea", "El que solo cuenta historias", "El que empieza por la conclusión sin explicar"], "Dios le ha hecho Señor y Cristo.", "Hechos 2:36"],
    ["f33", 4, "o4", "analizar", "¿Qué bosquejo da Efesios 2:1-10?", "Lo que éramos, lo que Dios hizo y para qué nos salvó", ["La ley, los profetas y los salmos", "El templo, el altar y el sacerdote", "Los jueces, los reyes y los profetas"], "«Pero Dios, que es rico en misericordia».", "Efesios 2:4"],
    ["f34", 4, "o4", "recordar", "¿Cómo describe Efesios 2:1 a los que no conocen a Cristo?", "Muertos en sus delitos y pecados", ["Buenos por naturaleza", "Casi salvos", "Indiferentes"], "«Y él os dio vida a vosotros, cuando estabais muertos en vuestros delitos y pecados».", "Efesios 2:1"],
    ["f35", 4, "o4", "comprender", "¿Para qué sirven las transiciones?", "Para unir un punto con el siguiente, de modo que los oyentes sigan el camino", ["Para alargar el sermón", "Para cambiar de tema sin avisar", "Para despedirse"], "Un mensaje ordenado ayuda a entender.", "Nehemías 8:8"],
    ["f36", 4, "o4", "aplicar", "¿Qué debe tener un buen bosquejo expositivo?", "La idea central, puntos que salen del texto, transiciones y una conclusión", ["Solo un título", "Solo chistes", "Muchas ideas sin relación"], "El texto da el bosquejo.", "Efesios 2:4"],
    ["f37", 4, "o4", "crear", "¿Cuál es un buen bosquejo para Efesios 2:1-10?", "Muertos en pecados; vivos por la misericordia de Dios; salvos por gracia para buenas obras", ["La historia de Éfeso; la geografía; el clima", "Mis gigantes; mis metas; mis sueños", "Pablo; Timoteo; Tito"], "Por gracia sois salvos por medio de la fe.", "Efesios 2:8"],
    ["f38", 4, "o4", "evaluar", "¿Qué es mejor: tres puntos claros que salen del texto o diez ideas sueltas?", "Tres puntos claros que salen del texto", ["Diez ideas sueltas", "Da lo mismo", "Ningún punto"], "Pedro desarrolló una sola idea central.", "Hechos 2:36"],
    ["f39", 4, "o4", "comprender", "¿Qué presentó Pedro en el centro de su sermón?", "A Jesús crucificado y resucitado, con las Escrituras", ["Su propia historia", "Las leyes de Moisés", "La historia de Roma"], "«a este Jesús a quien vosotros crucificasteis, Dios le ha hecho Señor y Cristo».", "Hechos 2:36"],
    ["f40", 4, "o4", "aplicar", "¿Cómo empezó Pedro su sermón en Pentecostés?", "Desde lo que la gente estaba viendo y oyendo", ["Con una historia de su niñez", "Con una lista de pecados", "Con una profecía del fin"], "«Mas esto es lo dicho por el profeta Joel».", "Hechos 2:16"],
    // ---- lección 5: aplicación, Cristo y el llamado (10)
    ["f41", 5, "o5", "recordar", "¿A qué compara Santiago al que oye la palabra y no la hace?", "Al que se mira en un espejo y luego olvida cómo es", ["Al que construye sobre la roca", "Al sembrador", "Al buen pastor"], "Se considera a sí mismo, y se va, y luego olvida cómo era.", "Santiago 1:24"],
    ["f42", 5, "o5", "comprender", "¿Cómo es una buena aplicación?", "Específica: dice qué hacer, cuándo y con quién", ["General: sean mejores", "Larga y confusa", "Solo para los demás"], "Sed hacedores de la palabra.", "Santiago 1:22"],
    ["f43", 5, "o5", "aplicar", "¿A quién se aplica primero el sermón?", "Al predicador", ["A los visitantes", "A los que faltaron", "A nadie"], "Ten cuidado de ti mismo y de la doctrina.", "1 Timoteo 4:16"],
    ["f44", 5, "o5", "comprender", "¿Por qué el sermón debe mostrar a Cristo?", "Para que la obediencia nazca de la gracia y no solo del esfuerzo", ["Porque es una costumbre", "Para alargar el sermón", "No hace falta"], "«Pues me propuse no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado».", "1 Corintios 2:2"],
    ["f45", 5, "o5", "recordar", "¿Cómo se describe Pablo en 2 Corintios 5:20?", "Como embajador en nombre de Cristo", ["Como juez de la iglesia", "Como rey", "Como filósofo"], "«Así que, somos embajadores en nombre de Cristo».", "2 Corintios 5:20"],
    ["f46", 5, "o5", "comprender", "¿Qué hizo Dios con Cristo, según 2 Corintios 5:21?", "Al que no conoció pecado, por nosotros lo hizo pecado, para que fuésemos justicia de Dios en él", ["Lo hizo un profeta más", "Lo dejó sin poder", "Lo hizo un ángel"], "«Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él».", "2 Corintios 5:21"],
    ["f47", 5, "o5", "evaluar", "¿Cuál de estos llamados es el más bíblico?", "Una invitación clara y sincera a responder, sin presión manipuladora", ["Amenazar a los oyentes", "Prometer riquezas a quien pase al frente", "No invitar nunca"], "Os rogamos en nombre de Cristo: Reconciliaos con Dios.", "2 Corintios 5:20"],
    ["f48", 5, "o5", "recordar", "¿Cuántos se añadieron después del llamado de Pedro, según Hechos 2:41?", "Como tres mil personas", ["Doce", "Cien", "Ninguno"], "«y se añadieron aquel día como tres mil personas».", "Hechos 2:41"],
    ["f49", 5, "o5", "analizar", "¿Qué preguntaron los oyentes de Pedro antes del llamado?", "Varones hermanos, ¿qué haremos?", ["¿Quién es este hombre?", "¿Cuándo terminará?", "¿Por qué hablan así?"], "«Varones hermanos, ¿qué haremos?».", "Hechos 2:37"],
    ["f50", 5, "o5", "aplicar", "¿Qué deben cumplir las ilustraciones del sermón?", "Ser verdaderas, respetuosas y breves, y estar al servicio del texto", ["Ser inventadas si emocionan", "Ser largas", "Exponer a los hermanos"], "«Por lo cual, desechando la mentira, hablad verdad cada uno con su prójimo».", "Efesios 4:25"],
    // ---- lección 6: la entrega y la rúbrica (10)
    ["f51", 6, "o6", "recordar", "¿Qué le pidió Pablo a Timoteo en 1 Timoteo 4:16?", "Que tuviera cuidado de sí mismo y de la doctrina", ["Que se hiciera famoso", "Que dejara de enseñar", "Que se fuera de Éfeso"], "«Ten cuidado de ti mismo y de la doctrina; persiste en ello».", "1 Timoteo 4:16"],
    ["f52", 6, "o6", "aplicar", "¿Qué conviene usar al predicar?", "Notas breves o un bosquejo, sin leer todo el manuscrito", ["Leer cada palabra sin mirar a nadie", "Nada: improvisar siempre", "El sermón de otro"], "Ocúpate en la lectura, la exhortación y la enseñanza.", "1 Timoteo 4:13"],
    ["f53", 6, "o6", "recordar", "¿Cuánto dura el sermón del Nivel 4, según la lección?", "Entre 20 y 30 minutos", ["Cinco minutos", "Dos horas", "Lo que el predicador quiera"], "Ocúpate en la exhortación y la enseñanza.", "1 Timoteo 4:13"],
    ["f54", 6, "o6", "comprender", "¿Qué evalúa la rúbrica en la fidelidad al texto?", "Que el mensaje del sermón sea el mensaje del pasaje", ["Que el sermón sea largo", "Que tenga muchos chistes", "Que use palabras difíciles"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
    ["f55", 6, "o6", "recordar", "¿Cuántos puntos vale la entrega en la rúbrica?", "15 de 100", ["50 de 100", "Ninguno", "90 de 100"], "Persiste en ello.", "1 Timoteo 4:16"],
    ["f56", 6, "o6", "comprender", "¿Qué incluye la entrega en la rúbrica?", "La claridad, el contacto con los oyentes y el tiempo", ["La ropa del predicador", "El volumen del sonido", "El número de asistentes"], "Ocúpate en la exhortación.", "1 Timoteo 4:13"],
    ["f57", 6, "o6", "evaluar", "Un sermón tiene buena entrega, pero no sale del texto. ¿Cómo le va en la rúbrica?", "Pierde muchos puntos, porque la fidelidad al texto es lo que más vale", ["Aprueba con 100", "El texto no importa", "Gana más puntos por la entrega"], "Procura con diligencia presentarte a Dios aprobado.", "2 Timoteo 2:15"],
    ["f58", 6, "o6", "aplicar", "¿Qué conviene hacer antes de presentar el sermón?", "Grabarte, escucharte y pedir a un hermano maduro que use la rúbrica contigo", ["Nada", "Copiar un sermón famoso", "Pedir que nadie te escuche"], "«Hierro con hierro se aguza».", "Proverbios 27:17"],
    ["f59", 6, "o6", "evaluar", "¿Qué parte de la rúbrica mide si el sermón lleva a la gracia?", "Cristo y la gracia en el centro, sin forzar el texto", ["La entrega", "El tiempo", "La estructura"], "Me propuse no saber cosa alguna sino a Jesucristo, y a éste crucificado.", "1 Corintios 2:2"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos sermones obtendría mejor nota en la rúbrica?", "Uno fiel al texto, con una idea clara, puntos del pasaje, Cristo en el centro, una aplicación concreta y buena entrega", ["Uno muy emocionante, pero sin texto", "Uno largo con muchas ideas sueltas", "Uno leído palabra por palabra, sin aplicación"], "«Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad».", "2 Timoteo 2:15"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De qué dijo Pablo que estaba limpio, según Hechos 20:26?", "De la sangre de todos", ["De toda tentación", "De la ley", "De las críticas"], "«que estoy limpio de la sangre de todos».", "Hechos 20:26"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué la predicación expositiva enseña a la iglesia a leer la Biblia?", "Porque muestra cómo se entiende un pasaje en su contexto", ["Porque evita la Biblia", "Porque solo usa un versículo", "Porque reemplaza la lectura personal"], "Ponían el sentido, de modo que entendiesen la lectura.", "Nehemías 8:8"],
      ["m1-03", 1, "o1", "aplicar", "¿Qué tipo de sermón es el que predica Efesios capítulo por capítulo?", "Expositivo", ["Temático", "Textual", "Ninguno"], "Todo el consejo de Dios.", "Hechos 20:27"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el poder del sermón no está en la creatividad del predicador?", "Porque está en la Palabra viva y eficaz, aplicada por el Espíritu", ["Porque la creatividad es pecado", "Porque el predicador no importa nada", "Porque no hay poder"], "La palabra de Dios es viva y eficaz.", "Hebreos 4:12"],
      ["m1-05", 1, "o1", "recordar", "¿Qué discierne la palabra de Dios, según Hebreos 4:12?", "Los pensamientos y las intenciones del corazón", ["El futuro", "El clima", "Los números de la suerte"], "«y discierne los pensamientos y las intenciones del corazón».", "Hebreos 4:12"],
      ["m1-06", 1, "o1", "evaluar", "¿Cuál de estos sermones es expositivo?", "Uno cuya idea central es la idea central de Romanos 5:1-11", ["Uno sobre la familia con diez versículos sueltos", "Uno sobre una frase sacada de contexto", "Uno sin texto bíblico"], "No he rehuido anunciaros todo el consejo de Dios.", "Hechos 20:27"],
      ["m1-07", 2, "o2", "recordar", "¿Desde dónde escribió Pablo la carta a los Filipenses?", "Desde la cárcel", ["Desde el templo", "Desde Atenas", "Desde un barco"], "He aprendido a contentarme, cualquiera que sea mi situación.", "Filipenses 4:11"],
      ["m1-08", 2, "o2", "comprender", "¿Qué debe hacer el puente entre el mundo bíblico y el de hoy?", "Llevar el principio del pasaje a los oyentes sin cambiar su sentido", ["Cambiar el sentido del texto", "Ignorar el mundo de hoy", "Ignorar el contexto"], "Toda la Escritura es útil.", "2 Timoteo 3:16"],
      ["m1-09", 2, "o2", "aplicar", "¿Qué se escribe justo antes de la idea homilética?", "La idea exegética del pasaje", ["Un chiste", "La lista de canciones", "La conclusión"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
      ["m1-10", 2, "o2", "analizar", "¿Qué distancia hay entre el mundo de la Biblia y el de hoy?", "De idioma, de cultura y de tiempo", ["Ninguna", "Solo de idioma", "Solo de tiempo"], "La Escritura sigue siendo útil para enseñar.", "2 Timoteo 3:16"],
      ["m1-11", 2, "o2", "recordar", "¿Qué sabía hacer Pablo, según Filipenses 4:12?", "Vivir humildemente y tener abundancia", ["Hacer milagros a voluntad", "Ganar dinero", "Evitar el sufrimiento"], "«Sé vivir humildemente, y sé tener abundancia».", "Filipenses 4:12"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estas ideas homiléticas es fiel a Filipenses 4:11-13?", "Cristo te fortalece para estar contento en la abundancia y en la escasez", ["Con fe todo te saldrá como quieres", "Dios quiere que siempre tengas abundancia", "La cárcel es buena"], "Todo lo puedo en Cristo que me fortalece.", "Filipenses 4:13"],
      ["m1-13", 3, "o3", "recordar", "¿En nombre de quién fue David contra Goliat, según 1 Samuel 17:45?", "En el nombre de Jehová de los ejércitos", ["En nombre de Saúl", "En nombre de su padre", "En su propio nombre"], "«mas yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es alegorizar?", "Dar a cada detalle un significado simbólico que el texto no tiene", ["Leer el texto en su contexto", "Aplicar el texto", "Buscar el punto principal"], "Jesús contó la parábola con un punto claro.", "Lucas 18:1"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué pregunta harías primero al preparar un sermón sobre una narración?", "¿Qué hace Dios en esta historia?", ["¿Cuántos personajes hay?", "¿Qué ropa usaban?", "¿Qué chiste puedo contar?"], "De Jehová es la batalla.", "1 Samuel 17:47"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué la parábola del juez injusto es un contraste y no una comparación directa?", "Porque Dios no es injusto: si un juez injusto atiende, cuánto más Dios", ["Porque Dios es como el juez", "Porque la viuda era injusta", "No es un contraste"], "¿Y acaso Dios no hará justicia a sus escogidos?", "Lucas 18:7"],
      ["m1-17", 3, "o3", "recordar", "¿Para qué es útil toda la Escritura, según 2 Timoteo 3:16?", "Para enseñar, redargüir, corregir e instruir en justicia", ["Para entretener", "Para discutir", "Para adivinar"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia».", "2 Timoteo 3:16"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál es la mejor manera de predicar un salmo de alabanza?", "De modo que la iglesia termine orando y adorando", ["Como una lista de datos", "Como una ley", "Sin leerlo"], "Toda la Escritura es útil.", "2 Timoteo 3:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué profeta citó Pedro al comienzo de su sermón en Pentecostés?", "Joel", ["Isaías", "Jeremías", "Malaquías"], "«Mas esto es lo dicho por el profeta Joel».", "Hechos 2:16"],
      ["m2-02", 4, "o4", "comprender", "¿Cuándo conviene un sermón inductivo?", "Cuando se quiere llevar a los oyentes a descubrir la idea paso a paso", ["Nunca", "Siempre", "Cuando no hay idea central"], "Pedro llevó a sus oyentes hasta su idea central.", "Hechos 2:36"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué hace el predicador con los puntos de un pasaje?", "Los encuentra en el texto, no los inventa", ["Los inventa a su gusto", "Los copia de otro sermón", "Los deja sin relación con el texto"], "El texto da el bosquejo.", "Efesios 2:4"],
      ["m2-04", 4, "o4", "analizar", "¿Qué expresa Efesios 2:4 en el bosquejo del pasaje?", "El giro: lo que Dios hizo por su misericordia", ["Lo que éramos", "Para qué nos salvó", "Un saludo"], "«Pero Dios, que es rico en misericordia, por su gran amor con que nos amó».", "Efesios 2:4"],
      ["m2-05", 4, "o4", "recordar", "¿Para qué fuimos creados en Cristo Jesús, según Efesios 2:10?", "Para buenas obras", ["Para ganar la salvación", "Para nada", "Para juzgar a otros"], "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál es la mejor conclusión para un sermón expositivo?", "Una que repite la idea central y llama a responder", ["Una que abre un tema nuevo", "Una historia larga sin relación", "Una despedida sin llamado"], "Arrepentíos, y bautícese cada uno de vosotros.", "Hechos 2:38"],
      ["m2-07", 5, "o5", "recordar", "¿Qué será el que persevera en la Palabra y la hace, según Santiago 1:25?", "Bienaventurado en lo que hace", ["Rico", "Famoso", "Olvidadizo"], "«será bienaventurado en lo que hace».", "Santiago 1:25"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el sermón se aplica primero al predicador?", "Porque el que enseña debe vivir lo que predica", ["Porque nadie más lo necesita", "Porque así es más corto", "Por cortesía"], "Ten cuidado de ti mismo y de la doctrina.", "1 Timoteo 4:16"],
      ["m2-09", 5, "o5", "aplicar", "¿Cuál es una aplicación específica de Santiago 1:22?", "Esta semana voy a obedecer en un punto concreto lo que estudié y se lo contaré a mi grupo", ["Hay que ser buenos", "Todos debemos mejorar", "La Biblia es importante"], "Sed hacedores de la palabra.", "Santiago 1:22"],
      ["m2-10", 5, "o5", "analizar", "¿Qué diferencia hay entre moralizar y predicar la gracia?", "Moralizar solo exige esfuerzo; predicar la gracia muestra lo que Cristo hizo, y de ahí nace la obediencia", ["No hay diferencia", "La gracia no pide obediencia", "Moralizar es mejor"], "Al que no conoció pecado, por nosotros lo hizo pecado.", "2 Corintios 5:21"],
      ["m2-11", 5, "o5", "recordar", "¿Qué ruega Pablo en nombre de Cristo, según 2 Corintios 5:20?", "Reconciliaos con Dios", ["Dad más ofrendas", "Seguidme a mí", "Guardad la ley"], "«os rogamos en nombre de Cristo: Reconciliaos con Dios».", "2 Corintios 5:20"],
      ["m2-12", 5, "o5", "evaluar", "¿Quién produce la decisión en el corazón de los oyentes?", "El Espíritu Santo", ["La presión del predicador", "La música", "El cansancio"], "Los que recibieron su palabra fueron bautizados.", "Hechos 2:41"],
      ["m2-13", 6, "o6", "recordar", "¿Con cuántos puntos se aprueba el sermón con rúbrica?", "70", ["50", "90", "100"], "Procura con diligencia presentarte a Dios aprobado.", "2 Timoteo 2:15"],
      ["m2-14", 6, "o6", "comprender", "¿Qué pasa si un predicador lee todo su manuscrito sin mirar a nadie?", "Pierde el contacto con los oyentes, algo que la rúbrica evalúa en la entrega", ["Gana más puntos", "No importa", "Es lo que pide la rúbrica"], "Ocúpate en la exhortación.", "1 Timoteo 4:13"],
      ["m2-15", 6, "o6", "aplicar", "¿Qué harías para practicar la rúbrica antes de presentar tu sermón?", "Grabarme y pedir a un hermano maduro que lo evalúe con la rúbrica", ["No practicar", "Presentarlo sin preparación", "Copiar un sermón"], "Hierro con hierro se aguza.", "Proverbios 27:17"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la rúbrica da más puntos a la fidelidad al texto que a la entrega?", "Porque lo más importante es que el mensaje sea el de la Palabra", ["Porque la entrega no importa nada", "Porque es más fácil", "Por casualidad"], "Usa bien la palabra de verdad.", "2 Timoteo 2:15"],
      ["m2-17", 6, "o6", "recordar", "¿Qué dice 1 Timoteo 4:16 que logrará el que persiste en el cuidado de sí mismo y de la doctrina?", "Se salvará a sí mismo y a los que le oyeren", ["Será rico", "Será famoso", "Nada"], "«pues haciendo esto, te salvarás a ti mismo y a los que te oyeren».", "1 Timoteo 4:16"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué actitud debe tener el predicador ante la evaluación con rúbrica?", "Humildad para aprender y mejorar", ["Enojo", "Indiferencia", "Orgullo"], "Hierro con hierro se aguza.", "Proverbios 27:17"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-homiletica-2-e1",
      tipo: "corta",
      pregunta: "Explica qué es la predicación expositiva y en qué se diferencia de la temática y de la textual.",
      ideas: [
        { id: "exposicion", peso: 35, texto: "El mensaje del sermón es el mensaje del pasaje: parte de un pasaje completo.", formas: ["mensaje del texto", "mensaje del pasaje", "pasaje completo", "idea central del pasaje", "el texto manda", "explica y aplica"] },
        { id: "tematica", peso: 20, texto: "La temática parte de un tema, con versículos de varios lugares.", formas: ["tematic*", "varios lugares", "versiculos sueltos"] },
        { id: "textual", peso: 15, texto: "La textual parte de un versículo o de una frase.", formas: ["textual", "un versiculo", "una frase"] },
        { id: "base", peso: 20, texto: "Su base: todo el consejo de Dios y la autoridad de la Palabra.", formas: ["todo el consejo", "nehemias", "autoridad", "ponian el sentido"] },
      ],
      citas: ["Hechos 20:27", "Hechos 20:26-27", "Nehemías 8:8", "2 Timoteo 4:2", "Hebreos 4:12"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La predicación expositiva explica y aplica un pasaje completo, de modo que el mensaje del sermón sea el mensaje del texto, como Pablo, que anunció todo el consejo de Dios (Hechos 20:27). La temática parte de un tema y reúne versículos de varios lugares; la textual, de un versículo o una frase. La autoridad está en la Palabra.",
    },
    {
      id: "n4-homiletica-2-e2",
      tipo: "corta",
      pregunta: "Explica los pasos para ir de un pasaje a la idea del sermón, con un ejemplo.",
      ideas: [
        { id: "contexto", peso: 25, texto: "Estudiar el contexto histórico, literario y gramatical.", formas: ["contexto", "historic*", "literari*", "gramatic*", "conectores", "genero"] },
        { id: "exegetica", peso: 25, texto: "La idea exegética: lo que el autor dijo a sus lectores.", formas: ["exegetica", "lo que el autor", "primeros lectores", "sus lectores"] },
        { id: "homiletica", peso: 25, texto: "La idea homilética: la misma verdad para hoy.", formas: ["homiletica", "para hoy", "oyentes de hoy", "misma verdad"] },
        { id: "ejemplo", peso: 15, texto: "Un ejemplo con un pasaje.", formas: ["filipenses 4", "contentar*", "contento", "todo lo puedo", "efesios 2", "lucas 15"] },
      ],
      citas: ["2 Timoteo 2:15", "Filipenses 4:11-13", "Filipenses 4:11", "Filipenses 4:13", "2 Timoteo 3:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero se estudia el contexto histórico, literario y gramatical del pasaje. Luego se escribe la idea exegética, lo que el autor dijo a sus lectores, y después la idea homilética, la misma verdad para hoy. En Filipenses 4:11-13, Pablo aprendió a contentarse porque Cristo lo fortalecía: en Cristo puedes estar contento en cualquier situación.",
    },
    {
      id: "n4-homiletica-2-e3",
      tipo: "corta",
      pregunta: "Explica cómo se predica una narración bíblica y qué error hay que evitar, con un ejemplo.",
      ideas: [
        { id: "dios", peso: 30, texto: "El héroe es Dios: se busca lo que Dios hace.", formas: ["heroe es dios", "lo que dios hace", "lo que hace dios", "de jehova es la batalla", "dios salva"] },
        { id: "trama", peso: 20, texto: "Se sigue la trama y el conflicto.", formas: ["trama", "conflicto", "contar la historia"] },
        { id: "error", peso: 25, texto: "Evitar convertirla en un simple consejo moral.", formas: ["consejo moral", "moraliz*", "no es ante todo", "no es solo"], negativa: true },
        { id: "cristo", peso: 15, texto: "Apunta a Cristo.", formas: ["cristo", "jesus"] },
      ],
      citas: ["1 Samuel 17:45-47", "1 Samuel 17:47", "Lucas 18:1-8", "2 Timoteo 3:16-17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En una narración se sigue la trama y el conflicto, y se busca lo que Dios hace: el héroe es Dios. Hay que evitar convertirla en un simple consejo moral. David y Goliat no es ante todo vencer tus gigantes, sino que de Jehová es la batalla (1 Samuel 17:47), y así apunta a Cristo, que venció por nosotros.",
    },
    {
      id: "n4-homiletica-2-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo prepararías un sermón expositivo sobre un pasaje que escojas: el estudio, la idea central, la estructura, la aplicación con Cristo en el centro y el llamado. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "pasaje", peso: 10, texto: "El pasaje escogido.", formas: ["escogi", "el pasaje", "mi pasaje"] },
        { id: "estudio", peso: 20, texto: "El estudio del pasaje en su contexto.", formas: ["contexto", "estudi*", "exegetica", "lo que el autor", "primeros lectores", "conectores"] },
        { id: "idea", peso: 20, texto: "La idea central del sermón.", formas: ["idea central", "idea homiletica", "tema y complemento", "una sola idea"] },
        { id: "estructura", peso: 15, texto: "La estructura con puntos que salen del texto.", formas: ["introduccion", "puntos", "bosquejo", "transicion*", "conclusion"] },
        { id: "cristo", peso: 20, texto: "Cristo y la gracia en el centro.", formas: ["cristo", "jesus", "gracia", "cruz"] },
        { id: "llamado", peso: 15, texto: "La aplicación y el llamado.", formas: ["llamado", "invitacion", "aplicacion", "voy a"] },
      ],
      basta: 85,
      citas: ["2 Timoteo 2:15", "2 Timoteo 4:2", "Hechos 20:27", "Nehemías 8:8", "1 Corintios 2:2", "2 Corintios 5:20", "Santiago 1:22", "Efesios 2:1-10", "Efesios 2:4", "Efesios 2:8-9", "Filipenses 4:11-13", "Lucas 15:1-7", "Romanos 5:8", "Juan 3:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogí el pasaje de Efesios 2:1-10. Primero lo estudiaría en su contexto: Pablo escribe a una iglesia de gentiles para mostrarles lo que Dios hizo por ellos en Cristo. Observaría los conectores, sobre todo el gran giro del versículo 4: Pero Dios, que es rico en misericordia. La idea exegética sería que Dios dio vida a los que estaban muertos en pecados, por pura gracia, para buenas obras. La idea central del sermón: Dios te salvó por gracia para una vida nueva. El bosquejo saldría del texto: lo que éramos, muertos en pecados (2:1-3); lo que Dios hizo, darnos vida con Cristo (2:4-7); y para qué, buenas obras (2:8-10), con transiciones entre los puntos. Mostraría a Cristo en el centro, porque por gracia somos salvos por medio de la fe, y no por obras (Efesios 2:8-9), como Pablo, que se propuso no saber cosa alguna sino a Jesucristo crucificado (1 Corintios 2:2). La aplicación sería concreta: dejar de intentar ganarse el amor de Dios y servir esta semana en una buena obra. Terminaría con un llamado claro y sin presión a recibir la gracia de Cristo.",
    },
    {
      id: "n4-homiletica-2-e5",
      tipo: "breve",
      pregunta:
        "Evalúa un sermón, real o imaginado, con la rúbrica de la academia: explica cada criterio, qué nota le darías en cada uno y por qué, y qué le recomendarías mejorar. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "fidelidad", peso: 20, texto: "La fidelidad al texto.", formas: ["fidelidad", "fiel al texto", "mensaje del pasaje", "mensaje del texto"] },
        { id: "idea", peso: 15, texto: "La idea central y el propósito.", formas: ["idea central", "proposito"] },
        { id: "estructura", peso: 15, texto: "La estructura.", formas: ["estructura", "puntos", "transicion*", "bosquejo"] },
        { id: "cristo", peso: 15, texto: "Cristo y la gracia.", formas: ["cristo", "gracia"] },
        { id: "aplicacion", peso: 15, texto: "La aplicación y las ilustraciones.", formas: ["aplicacion", "ilustracion*", "concreta"] },
        { id: "entrega", peso: 10, texto: "La entrega.", formas: ["entrega", "tiempo", "claridad", "contacto"] },
        { id: "mejora", peso: 10, texto: "Lo que recomendaría mejorar.", formas: ["recomendaria", "mejorar", "le sugeriria", "deberia"] },
      ],
      basta: 85,
      citas: ["2 Timoteo 2:15", "1 Timoteo 4:13", "1 Timoteo 4:16", "1 Corintios 2:2", "Santiago 1:22", "Proverbios 27:17", "Hechos 20:27", "Nehemías 8:8", "2 Timoteo 4:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Imaginé un sermón sobre la parábola del hijo pródigo. En fidelidad al texto le daría 20 de 25 puntos: el mensaje del sermón fue el del pasaje, el amor del Padre que recibe al que vuelve, aunque se detuvo demasiado en detalles secundarios. En idea central y propósito, 13 de 15: la idea fue clara, Dios recibe con gozo al que se arrepiente. En estructura, 10 de 15: los puntos salían del texto, pero faltaron transiciones claras. En Cristo y la gracia, 15 de 15: mostró que Jesús vino a buscar a los perdidos. En aplicación e ilustraciones, 10 de 15: la ilustración fue verdadera, pero la aplicación fue general. En la entrega, 12 de 15: habló con claridad, pero se pasó del tiempo. En total, 80 puntos: aprobado. Le recomendaría mejorar las transiciones, hacer una aplicación concreta para la semana y respetar el tiempo. También le diría que se grabe y se escuche, porque hierro con hierro se aguza (Proverbios 27:17), y que siga cuidando de sí mismo y de la doctrina (1 Timoteo 4:16), como obrero que usa bien la palabra de verdad (2 Timoteo 2:15).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-homiletica-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe el bosquejo de un sermón expositivo sobre un pasaje que escojas: la idea exegética, la idea homilética, el propósito, los puntos que salen del texto, una ilustración, la aplicación y el llamado. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "pasaje", peso: 10, texto: "El pasaje escogido.", formas: ["escogi", "el pasaje", "mi pasaje"] },
      { id: "exegetica", peso: 15, texto: "La idea exegética.", formas: ["exegetica", "el autor", "primeros lectores", "quiso decir", "jesus enseño", "jesus enseno"] },
      { id: "homiletica", peso: 20, texto: "La idea homilética o idea central.", formas: ["homiletica", "idea central", "la idea es"] },
      { id: "proposito", peso: 10, texto: "El propósito.", formas: ["proposito", "quiero que"] },
      { id: "puntos", peso: 20, texto: "Los puntos que salen del texto.", formas: ["punto*", "primero", "segundo", "tercero", "bosquejo"] },
      { id: "ilustracion", peso: 10, texto: "Una ilustración.", formas: ["ilustr*", "historia", "testimonio"] },
      { id: "llamado", peso: 15, texto: "La aplicación y el llamado.", formas: ["llamado", "aplic*", "voy a", "invit*"] },
    ],
    basta: 85,
    citas: ["Lucas 15:11-24", "Lucas 15:20", "Lucas 19:10", "Efesios 2:1-10", "Efesios 2:8-9", "Filipenses 4:11-13", "Salmos 23:1", "Juan 10:11", "Romanos 5:8", "Juan 3:16", "2 Timoteo 2:15", "2 Timoteo 4:2", "1 Corintios 2:2", "Santiago 1:22"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí el pasaje de Lucas 15:11-24, la parábola del hijo pródigo. La idea exegética: Jesús enseñó a los fariseos que el Padre recibe con gozo al pecador que se arrepiente y vuelve a casa. La idea homilética, o idea central del sermón: Dios te espera con los brazos abiertos. El propósito es que los que están lejos vuelvan a Dios y que la iglesia reciba con gozo a los que vuelven. Los puntos salen del texto. Primero: el pecado aleja y empobrece (15:13-16). Segundo: el arrepentimiento empieza cuando el hijo vuelve en sí y decide regresar al padre (15:17-20). Tercero: el padre corre, abraza y hace fiesta (15:20-24). La ilustración será el testimonio verdadero de un hermano de la iglesia, con su permiso, que volvió a Dios después de años lejos. La aplicación: si estás lejos, hoy puedes volver; y si ya estás en casa, esta semana vas a llamar a alguien que se alejó. El llamado final será una invitación clara y sin presión a volver al Padre, porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido (Lucas 19:10).",
  },
};
