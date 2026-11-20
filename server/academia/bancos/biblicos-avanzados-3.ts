/**
 * El banco de «Daniel y Apocalipsis» (especialidad Estudios bíblicos avanzados, materia 3). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la literatura apocalíptica · o2 Daniel, fieles en Babilonia · o3 las visiones de Daniel · o4 Cristo y las
 * siete iglesias · o5 cómo se ha leído el Apocalipsis · o6 la nueva creación · o7 el versículo de memoria (Daniel 7:14).
 * Las posturas sobre el milenio y el rapto se preguntan como posturas, sin escoger entre ellas.
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `biblicos-avanzados-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_BIBLICOS_AVANZADOS_3: BancoMateria = {
  materia: "biblicos-avanzados-3",
  repaso: {
    "biblicos-avanzados-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo se llama el Apocalipsis en su primer versículo?", "La revelación de Jesucristo", ["El libro de los secretos", "La profecía de Daniel", "Las visiones de Pedro"], "«La revelación de Jesucristo».", "Apocalipsis 1:1-3"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué es importante que Jesús explique qué son las siete estrellas y los siete candeleros?", "Porque enseña a leer el libro dejando que la Biblia misma explique sus símbolos", ["Porque los símbolos no significan nada", "Porque cada uno puede inventar su sentido", "Porque las estrellas son planetas"], "«las siete estrellas son los ángeles de las siete iglesias».", "Apocalipsis 1:19-20"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano explica cada capítulo del Apocalipsis con las noticias de la semana. ¿Qué le aconsejas?", "Que primero deje que la Biblia explique los símbolos y busque el mensaje para los primeros lectores y para nosotros", ["Que siga así, porque está bien", "Que deje de leer el Apocalipsis", "Que ponga una fecha para el fin"], "«y los siete candeleros que has visto, son las siete iglesias».", "Apocalipsis 1:19-20"],
    ] as P[]).map(p),
    "biblicos-avanzados-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué propuso Daniel en su corazón, según Daniel 1:8?", "No contaminarse con la comida del rey ni con su vino", ["Volver a Jerusalén", "Ser el rey de Babilonia", "No aprender nada de los caldeos"], "«Y Daniel propuso en su corazón no contaminarse con la porción de la comida del rey».", "Daniel 1:8"],
      ["2-r2", 2, "o2", "comprender", "¿Qué muestra la respuesta de los tres amigos ante el horno: y si no, no serviremos a tus dioses?", "Que su fidelidad no dependía de que Dios los librara del fuego", ["Que no creían en Dios", "Que querían morir", "Que desafiaban a Dios"], "«Y si no, sepas, oh rey, que no serviremos a tus dioses».", "Daniel 3:17-18"],
      ["2-r3", 2, "o2", "aplicar", "Un joven de tu iglesia consiguió un buen trabajo, pero su jefe le pide mentir a los clientes. ¿Qué le aconsejas con el ejemplo de Daniel?", "Que sirva con excelencia, hable con respeto con su jefe, proponga no mentir y confíe en Dios, aunque le cueste", ["Que mienta un poco para no perder el trabajo", "Que insulte a su jefe", "Que no vuelva a trabajar nunca"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    ] as P[]).map(p),
    "biblicos-avanzados-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué levantará el Dios del cielo, según Daniel 2:44?", "Un reino que no será jamás destruido", ["Una estatua de oro", "Un templo en Babilonia", "Un ejército"], "«el Dios del cielo levantará un reino que no será jamás destruido».", "Daniel 2:44"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué se relaciona el hijo de hombre de Daniel 7:13-14 con Jesús?", "Porque Jesús se llamó el Hijo del Hombre y dijo que lo verían viniendo en las nubes del cielo", ["Porque Daniel era Jesús", "Porque Jesús no conocía a Daniel", "No se relacionan"], "«y he aquí con las nubes del cielo venía uno como un hijo de hombre».", "Daniel 7:13-14"],
      ["3-r3", 3, "o3", "aplicar", "Un hermano se angustia porque no entiende las setenta semanas de Daniel 9. ¿Qué le dices?", "Que hay varias lecturas, y que el centro de Daniel 9 está en la oración de arrepentimiento y en la misericordia de Dios", ["Que si no las entiende no es salvo", "Que deje de leer la Biblia", "Que invente una explicación"], "«sino en tus muchas misericordias».", "Daniel 9:18"],
    ] as P[]).map(p),
    "biblicos-avanzados-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le dijo Cristo a Juan cuando cayó como muerto, según Apocalipsis 1:17?", "No temas; yo soy el primero y el último", ["Levántate y huye", "Vuelve a Jerusalén", "Escribe tu nombre"], "«No temas; yo soy el primero y el último».", "Apocalipsis 1:17-18"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué habla Cristo primero a las siete iglesias, antes de mostrar el futuro?", "Porque quiere que su iglesia sea fiel en el presente, con arrepentimiento y perseverancia", ["Porque el futuro no importa", "Porque las iglesias no le importaban", "Por casualidad"], "«Sé fiel hasta la muerte».", "Apocalipsis 2:10"],
      ["4-r3", 4, "o4", "aplicar", "Tu iglesia trabaja mucho, pero ya no tiene el amor del principio. ¿Qué carta del Apocalipsis le aplicas?", "La de Éfeso: recordar de dónde cayó, arrepentirse y volver a las primeras obras", ["La de Esmirna, que no tiene reproche", "Ninguna", "La de Filadelfia, sin cambios"], "«Pero tengo contra ti, que has dejado tu primer amor».", "Apocalipsis 2:4"],
    ] as P[]).map(p),
    "biblicos-avanzados-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Por qué es digno el Cordero de abrir el libro, según Apocalipsis 5:9?", "Porque fue inmolado y con su sangre redimió para Dios a gente de toda nación", ["Porque era el más fuerte", "Porque era un rey de Roma", "Porque lo eligieron los ancianos"], "«porque tú fuiste inmolado, y con tu sangre nos has redimido para Dios».", "Apocalipsis 5:9-10"],
      ["5-r2", 5, "o5", "comprender", "¿Qué dice la escuela futurista sobre el Apocalipsis?", "Que la mayor parte describe hechos todavía futuros, al final de la historia", ["Que todo se cumplió en el siglo primero", "Que es solo un cuento", "Que habla solo de la Edad Media"], "«yo te mostraré las cosas que sucederán después de estas».", "Apocalipsis 4:1"],
      ["5-r3", 5, "o5", "aplicar", "En tu grupo dos hermanos discuten con enojo sobre el rapto. ¿Qué haces?", "Presentas las posturas con sus textos, muestras lo que todos afirman y recuerdas que la postura del ministerio la dirá su declaración de fe", ["Das la razón al que habla más fuerte", "Prohíbes el tema para siempre", "Pones una fecha para que se calmen"], "«y así estaremos siempre con el Señor».", "1 Tesalonicenses 4:17"],
    ] as P[]).map(p),
    "biblicos-avanzados-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo se llamaba el que montaba el caballo blanco, según Apocalipsis 19:11?", "Fiel y Verdadero", ["Rey de Babilonia", "El vencedor de Roma", "El Anciano de días"], "«el que lo montaba se llamaba Fiel y Verdadero».", "Apocalipsis 19:11"],
      ["6-r2", 6, "o6", "comprender", "¿Qué quiere decir que el tabernáculo de Dios estará con los hombres?", "Que la meta de la historia es que Dios viva con su pueblo para siempre", ["Que se construirá una tienda", "Que Dios se irá lejos", "Que solo los sacerdotes verán a Dios"], "«He aquí el tabernáculo de Dios con los hombres, y él morará con ellos».", "Apocalipsis 21:3-4"],
      ["6-r3", 6, "o6", "aplicar", "Una familia de tu iglesia perdió a un ser querido. ¿Qué texto del Apocalipsis le lees?", "Apocalipsis 21:3-4: Dios enjugará toda lágrima y ya no habrá muerte", ["Uno sobre las plagas", "El del número de la bestia", "Ninguno"], "«Enjugará Dios toda lágrima de los ojos de ellos».", "Apocalipsis 21:3-4"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La literatura apocalíptica
    ["f01", 1, "o1", "recordar", "¿Qué bendición promete Apocalipsis 1:3?", "Bienaventurado el que lee, y los que oyen y guardan las palabras de esta profecía", ["Riquezas para los que adivinen las fechas", "Larga vida a los que no lo lean", "Ninguna"], "«Bienaventurado el que lee, y los que oyen las palabras de esta profecía».", "Apocalipsis 1:1-3"],
    ["f02", 1, "o1", "recordar", "¿Qué son los siete candeleros, según Apocalipsis 1:20?", "Las siete iglesias", ["Siete ángeles", "Siete reyes", "Siete planetas"], "«y los siete candeleros que has visto, son las siete iglesias».", "Apocalipsis 1:19-20"],
    ["f03", 1, "o1", "comprender", "¿Qué es la literatura apocalíptica?", "Un tipo de escritura con visiones, símbolos y números que muestra que Dios gobierna la historia y que su reino vencerá", ["Un libro de leyes", "Una lista de fechas exactas del fin", "Un diario de viajes"], "«La revelación de Jesucristo, que Dios le dio, para manifestar a sus siervos».", "Apocalipsis 1:1-3"],
    ["f04", 1, "o1", "comprender", "¿Qué enseña que Daniel preguntara a uno de los que asistían por el sentido de su visión?", "Que la interpretación viene de Dios, y que muchas veces la Biblia explica sus propios símbolos", ["Que Daniel no tenía fe", "Que las visiones no tienen sentido", "Que hay que adivinar"], "«le pregunté la verdad acerca de todo esto».", "Daniel 7:15-16"],
    ["f05", 1, "o1", "comprender", "¿Qué significa en la Biblia el número siete?", "Plenitud, lo que está completo", ["Mala suerte", "Una fecha exacta del fin", "Nada"], "«las siete estrellas son los ángeles de las siete iglesias».", "Apocalipsis 1:19-20"],
    ["f06", 1, "o1", "analizar", "¿Por qué una buena lectura del Apocalipsis busca primero el mensaje para las siete iglesias de Juan?", "Porque el libro se escribió a iglesias reales del siglo primero, y lo que les dijo sigue hablando a la iglesia de hoy", ["Porque solo era para ellas y no nos habla", "Porque así se adivinan las fechas", "No hace falta"], "«para manifestar a sus siervos las cosas que deben suceder pronto».", "Apocalipsis 1:1-3"],
    ["f07", 1, "o1", "aplicar", "Tienes que enseñar el significado del Cordero inmolado de Apocalipsis 5. ¿Cómo lo haces?", "Lo lees en su contexto, ves cómo lo explica el cántico del capítulo 5 y buscas su trasfondo en la Pascua y en Isaías 53", ["Dices lo primero que se te ocurre", "Lo comparas con una noticia", "Evitas el tema"], "«porque tú fuiste inmolado, y con tu sangre nos has redimido para Dios».", "Apocalipsis 5:9-10"],
    ["f08", 1, "o1", "aplicar", "Un joven anuncia en las redes una fecha para el fin del mundo. ¿Qué le muestras?", "Que del día y la hora nadie sabe, y que los que pusieron fechas se equivocaron", ["Que tiene razón si lo dice con fe", "Que ponga otra fecha", "Que deje de creer"], "«Pero del día y la hora nadie sabe, ni aun los ángeles de los cielos, sino sólo mi Padre».", "Mateo 24:36"],
    ["f09", 1, "o1", "evaluar", "¿Qué lectura del Apocalipsis es la mejor?", "La que deja que la Biblia explique sus símbolos, busca el mensaje para los primeros lectores y lleva a adorar a Cristo y a serle fiel", ["La que explica todo con las noticias", "La que solo provoca miedo", "La que pone fechas"], "«y guardan las cosas en ella escritas».", "Apocalipsis 1:1-3"],
    ["f10", 1, "o7", "recordar", "Completa Daniel 7:14: Y le fue dado dominio, gloria y reino, para que todos los pueblos, naciones y lenguas le sirvieran…", "su dominio es dominio eterno, que nunca pasará, y su reino uno que no será destruido", ["y su reino durará mil años y después terminará", "pero su dominio será quitado y dado a otro", "hasta que se levante otro rey más fuerte"], "«Y le fue dado dominio, gloria y reino, para que todos los pueblos, naciones y lenguas le sirvieran; su dominio es dominio eterno, que nunca pasará, y su reino uno que no será destruido».", "Daniel 7:14"],
    // Lección 2 · Daniel: fieles en Babilonia
    ["f11", 2, "o2", "recordar", "¿Cuántas veces al día oraba Daniel, según Daniel 6:10?", "Tres veces al día", ["Una vez a la semana", "Siete veces al día", "Solo en las fiestas"], "«se arrodillaba tres veces al día».", "Daniel 6:10"],
    ["f12", 2, "o2", "recordar", "¿Hacia dónde daban las ventanas de la cámara de Daniel, según Daniel 6:10?", "Hacia Jerusalén", ["Hacia Babilonia", "Hacia Egipto", "Hacia el palacio"], "«abiertas las ventanas de su cámara que daban hacia Jerusalén».", "Daniel 6:10"],
    ["f13", 2, "o2", "comprender", "¿Qué tiene de especial el idioma del libro de Daniel?", "Que de Daniel 2:4 a 7:28 está en arameo, la lengua del imperio, y el resto en hebreo", ["Que está todo en griego", "Que está en latín", "Que no tiene un idioma conocido"], "«Entonces hablaron los caldeos al rey en lengua aramea».", "Daniel 2:4"],
    ["f14", 2, "o2", "comprender", "¿Qué dice la postura conservadora sobre la fecha del libro de Daniel?", "Que es del siglo VI antes de Cristo, del tiempo de Daniel, y que sus profecías anuncian de verdad lo que vendría", ["Que lo escribió Pablo", "Que es de la Edad Media", "Que no tiene fecha"], "«la abominación desoladora de que habló el profeta Daniel».", "Mateo 24:15"],
    ["f15", 2, "o2", "comprender", "¿Qué dice la postura crítica sobre la fecha del libro de Daniel?", "Que se terminó hacia el 167 al 164 antes de Cristo, en tiempos de Antíoco IV", ["Que lo escribió Moisés", "Que es del siglo primero después de Cristo", "Que lo escribió Nabucodonosor"], "«muda los tiempos y las edades; quita reyes, y pone reyes».", "Daniel 2:21"],
    ["f16", 2, "o2", "analizar", "¿Cómo pudo Daniel servir al rey de Babilonia sin dejar de ser fiel a Dios?", "Distinguiendo lo que podía aceptar, como aprender y trabajar bien, de lo que no podía, como adorar a otros dioses", ["Porque no le importaba su fe", "Porque quería ser rey", "Porque Dios no le pedía nada"], "«pidió, por tanto, al jefe de los eunucos que no se le obligase a contaminarse».", "Daniel 1:8"],
    ["f17", 2, "o2", "aplicar", "Una hermana inmigrante siente que para progresar en este país tiene que dejar su fe. ¿Qué le enseña Daniel?", "Que se puede servir con excelencia, aprender la cultura y respetar a las autoridades sin negociar la fe", ["Que tiene razón", "Que se aísle de todos", "Que no trabaje"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    ["f18", 2, "o2", "aplicar", "Un hermano cree que si Dios no lo libra de un problema es porque no lo ama. ¿Qué texto de Daniel le compartes?", "Daniel 3:17-18: Dios puede librar, y aun si no lo hace, seguimos fieles", ["Ninguno", "Que Dios siempre hace lo que pedimos", "Que deje de orar"], "«He aquí nuestro Dios a quien servimos puede librarnos».", "Daniel 3:17-18"],
    ["f19", 2, "o2", "aplicar", "En tu trabajo un compañero se burla porque oras en tu descanso y te pide que dejes de hacerlo. ¿Qué te enseña Daniel 6:10?", "A seguir orando con fidelidad y con respeto, como lo hacías antes, sin buscar pleito", ["A dejar de orar para siempre", "A pelear con el compañero", "A orar para que todos te vean"], "«como lo solía hacer antes».", "Daniel 6:10"],
    ["f20", 2, "o2", "evaluar", "¿Qué vida se parece más a la de Daniel en Babilonia?", "La de un creyente que sirve con excelencia donde Dios lo puso, ora cada día y no negocia su fe", ["La de uno que se aísla de todos", "La de uno que deja su fe para progresar", "La de uno que solo se queja del país"], "«oraba y daba gracias delante de su Dios».", "Daniel 6:10"],
    // Lección 3 · Las visiones de Daniel
    ["f21", 3, "o3", "recordar", "¿Con qué venía uno como un hijo de hombre, según Daniel 7:13?", "Con las nubes del cielo", ["Con un ejército de caballos", "En un barco", "Sobre una estatua"], "«con las nubes del cielo venía uno como un hijo de hombre».", "Daniel 7:13-14"],
    ["f22", 3, "o3", "recordar", "¿Qué pasará con muchos de los que duermen en el polvo de la tierra, según Daniel 12:2?", "Serán despertados, unos para vida eterna y otros para vergüenza", ["Seguirán dormidos para siempre", "Serán reyes de la tierra", "Se volverán ángeles"], "«serán despertados, unos para vida eterna, y otros para vergüenza y confusión perpetua».", "Daniel 12:2-3"],
    ["f23", 3, "o3", "comprender", "¿Qué mensaje tienen en común la estatua de Daniel 2 y las bestias de Daniel 7?", "Que los reinos humanos pasan y el reino de Dios permanece para siempre", ["Que Babilonia durará para siempre", "Que los animales son peligrosos", "Que Dios no gobierna"], "«pero él permanecerá para siempre».", "Daniel 2:44"],
    ["f24", 3, "o3", "comprender", "¿Cuáles son los cuatro reinos de Daniel 2 y 7 según la lectura tradicional?", "Babilonia, los medos y persas, Grecia y Roma", ["Egipto, Asiria, Israel y Judá", "Cuatro países de hoy", "Edom, Moab, Amón y Filistea"], "«el Dios del cielo levantará un reino».", "Daniel 2:44"],
    ["f25", 3, "o3", "comprender", "¿Qué dice la lectura mesiánica de las setenta semanas de Daniel 9?", "Que se cuentan desde un decreto del rey Artajerjes y llegan al ministerio o a la muerte de Jesús", ["Que hablan de la caída de Roma", "Que son días comunes", "Que no tienen ningún sentido"], "«desde la salida de la orden para restaurar y edificar a Jerusalén hasta el Mesías Príncipe».", "Daniel 9:25"],
    ["f26", 3, "o3", "analizar", "¿Por qué es tan importante Daniel 12:2-3 en el Antiguo Testamento?", "Porque es una de las promesas más claras de la resurrección para vida eterna", ["Porque habla de la creación", "Porque cuenta la caída de Babilonia", "No es importante"], "«unos para vida eterna».", "Daniel 12:2-3"],
    ["f27", 3, "o3", "aplicar", "Tienes que enseñar Daniel 7 en una clase. ¿Cómo lo haces?", "Lees todo el capítulo, destacas lo claro, presentas las lecturas de los cuatro reinos y lo unes con Jesús, el Hijo del Hombre", ["Te pasas la clase haciendo cálculos", "Dices que no se puede entender", "Dices qué país de hoy es cada bestia"], "«Y le fue dado dominio, gloria y reino».", "Daniel 7:13-14"],
    ["f28", 3, "o3", "aplicar", "Una hermana tiene miedo por las noticias de guerras entre países poderosos. ¿Qué verdad de Daniel le compartes?", "Que los reinos humanos pasan y que el reino de Dios permanece para siempre", ["Que el fin será mañana", "Que Dios no controla nada", "Que deje de orar"], "«un reino que no será jamás destruido».", "Daniel 2:44"],
    ["f29", 3, "o3", "aplicar", "Un maestro de tu iglesia enseña su tabla de las setenta semanas como si fuera la única verdad. ¿Qué le sugieres?", "Que presente también las otras lecturas con honestidad y que no haga depender la fe de una sola tabla", ["Que siga así", "Que deje de enseñar Daniel", "Que agregue más fechas"], "«sino en tus muchas misericordias».", "Daniel 9:18"],
    ["f30", 3, "o3", "evaluar", "¿Qué enseñanza de las visiones de Daniel es la más importante?", "Que Dios gobierna la historia, que el reino de su Hijo es eterno y que habrá resurrección", ["Qué país será el próximo imperio", "La fecha exacta del fin", "Que los reinos humanos durarán para siempre"], "«su dominio es dominio eterno, que nunca pasará».", "Daniel 7:13-14"],
    // Lección 4 · Apocalipsis: Cristo y sus siete iglesias
    ["f31", 4, "o4", "recordar", "¿Qué tiene Cristo, según Apocalipsis 1:18?", "Las llaves de la muerte y del Hades", ["Las llaves del templo", "Una corona de espinas", "Las llaves de Roma"], "«Y tengo las llaves de la muerte y del Hades».", "Apocalipsis 1:17-18"],
    ["f32", 4, "o4", "recordar", "¿Qué le dará Cristo al que sea fiel hasta la muerte, según Apocalipsis 2:10?", "La corona de la vida", ["Una ciudad", "Riquezas en la tierra", "Un trono en Roma"], "«y yo te daré la corona de la vida».", "Apocalipsis 2:10"],
    ["f33", 4, "o4", "comprender", "¿Dónde estaban las siete iglesias del Apocalipsis?", "En la provincia romana de Asia, en lo que hoy es Turquía", ["En Egipto", "En Italia", "En Jerusalén"], "«envíalo a las siete iglesias que están en Asia».", "Apocalipsis 1:11"],
    ["f34", 4, "o4", "comprender", "¿Qué patrón siguen las cartas a las siete iglesias?", "Cristo se presenta, conoce sus obras, elogia, reprende, llama al arrepentimiento y promete al que venza", ["Solo amenazan", "Solo felicitan", "No tienen ningún orden"], "«El que tiene oído, oiga lo que el Espíritu dice a las iglesias».", "Apocalipsis 2:7"],
    ["f35", 4, "o4", "comprender", "¿Qué dicen las dos posturas sobre la fecha del Apocalipsis?", "La mayoría lo fecha hacia el año 95, bajo Domiciano, como dice Ireneo; otros, antes del 70, bajo Nerón", ["Que se escribió en el siglo V", "Que lo escribió Daniel", "Que no tiene fecha posible"], "«estaba en la isla llamada Patmos».", "Apocalipsis 1:9"],
    ["f36", 4, "o4", "analizar", "¿Por qué Esmirna no recibe ningún reproche y Laodicea no recibe ningún elogio?", "Porque Esmirna, pobre y perseguida, era fiel, y Laodicea, rica, se había vuelto tibia y se creía sin necesidad", ["Porque Cristo prefiere a los pobres sin razón", "Porque Laodicea era más pequeña", "Por casualidad"], "«Sé fiel hasta la muerte».", "Apocalipsis 2:10"],
    ["f37", 4, "o4", "aplicar", "Un creyente perseguido por su fe pregunta si Dios lo abandonó. ¿Qué carta le lees?", "La de Esmirna: Cristo conoce su tribulación y promete la corona de la vida al que sea fiel", ["La de Laodicea", "Ninguna", "Una que hable de riquezas"], "«No temas en nada lo que vas a padecer».", "Apocalipsis 2:10"],
    ["f38", 4, "o4", "aplicar", "Una iglesia rica y cómoda cree que no necesita nada. ¿Qué texto le compartes?", "Apocalipsis 3:15-20: Cristo reprende la tibieza y está a la puerta llamando", ["Apocalipsis 2:10, para felicitarla", "Ninguno", "Uno que hable de prosperidad"], "«He aquí, yo estoy a la puerta y llamo».", "Apocalipsis 3:20"],
    ["f39", 4, "o4", "aplicar", "Tienes que predicar sobre Apocalipsis 3:20. ¿Qué cuidas?", "Que en su contexto es un llamado a una iglesia tibia, y que también invita a cada persona que oiga su voz", ["Que solo es un versículo para niños", "Que no tiene contexto", "Que habla de una casa de verdad"], "«si alguno oye mi voz y abre la puerta, entraré a él».", "Apocalipsis 3:20"],
    ["f40", 4, "o4", "evaluar", "¿Qué uso de las siete cartas es el mejor en una iglesia de hoy?", "Usarlas como espejo: escuchar lo que Cristo elogia y reprende, arrepentirse y ser fieles", ["Usarlas solo para adivinar épocas", "Usarlas para juzgar a otras iglesias", "Ignorarlas"], "«Sé fiel hasta la muerte, y yo te daré la corona de la vida».", "Apocalipsis 2:10"],
    // Lección 5 · Cómo se ha leído el Apocalipsis
    ["f41", 5, "o5", "recordar", "¿Cuánto tiempo reinaron con Cristo los fieles de Apocalipsis 20:4?", "Mil años", ["Siete días", "Cuarenta años", "Tres años y medio"], "«y vivieron y reinaron con Cristo mil años».", "Apocalipsis 20:4"],
    ["f42", 5, "o5", "recordar", "¿Quién es digno de recibir la gloria, la honra y el poder, según Apocalipsis 4:11?", "El Señor, porque creó todas las cosas", ["La bestia", "El emperador", "Los ancianos"], "«Señor, digno eres de recibir la gloria y la honra y el poder».", "Apocalipsis 4:11"],
    ["f43", 5, "o5", "comprender", "¿Qué dice la escuela preterista sobre el Apocalipsis?", "Que casi todo se cumplió en el siglo primero, con Jerusalén o con Roma", ["Que todo es futuro", "Que solo habla de la iglesia de hoy", "Que nada tiene sentido"], "«para manifestar a sus siervos las cosas que deben suceder pronto».", "Apocalipsis 1:1-3"],
    ["f44", 5, "o5", "comprender", "¿Qué enseña el amilenarismo sobre los mil años?", "Que son simbólicos y hablan del reinado presente de Cristo con su iglesia", ["Que son mil años literales en el futuro", "Que nunca existirán", "Que terminaron en la Edad Media"], "«y vivieron y reinaron con Cristo mil años».", "Apocalipsis 20:4"],
    ["f45", 5, "o5", "analizar", "¿Por qué toda lectura del Apocalipsis debería empezar en los capítulos 4 y 5?", "Porque muestran que Dios está en el trono y que la historia está en las manos del Cordero inmolado", ["Porque son los más cortos", "Porque hablan de la bestia", "No tiene importancia"], "«Señor, digno eres de recibir la gloria».", "Apocalipsis 4:11"],
    ["f46", 5, "o5", "aplicar", "Tienes que enseñar las posturas sobre el milenio a una clase de nuevos creyentes. ¿Cómo lo haces?", "Explicas cada postura con sus textos, dices en qué coinciden todas y terminas en Cristo, que vence y viene", ["Enseñas solo una y llamas herejes a las otras", "Evitas el tema para siempre", "Pones una fecha para el milenio"], "«y reinaron con Cristo mil años».", "Apocalipsis 20:4"],
    ["f47", 5, "o5", "aplicar", "Un hermano dice que descubrió el número 666 en el nombre de un político. ¿Qué le respondes?", "Que la hipótesis más común lo relaciona con Nerón César, que es solo una hipótesis, y que no se debe buscar en nombres de hoy", ["Que tiene razón", "Que busque en más nombres", "Que el número no está en la Biblia"], "«pues es número de hombre».", "Apocalipsis 13:18"],
    ["f48", 5, "o5", "aplicar", "Una joven tiene miedo de quedarse atrás en el rapto. ¿Qué le compartes?", "Que su seguridad está en Cristo, y que todas las posturas afirman que él vuelve por los suyos para que estén siempre con él", ["Que tenga miedo para portarse bien", "Que el rapto no existe", "Que ponga su fe en una fecha"], "«y así estaremos siempre con el Señor».", "1 Tesalonicenses 4:17"],
    ["f49", 5, "o5", "aplicar", "Un predicador anuncia en tu ciudad una fecha para la venida de Cristo. ¿Qué haces?", "Muestras a la iglesia que del día y la hora nadie sabe y que los que pusieron fechas se equivocaron", ["Vendes todo para esa fecha", "Lo apoyas en las redes", "Dejas de esperar a Cristo"], "«Pero del día y la hora nadie sabe».", "Mateo 24:36"],
    ["f50", 5, "o5", "evaluar", "¿Qué actitud ante las posturas sobre el Apocalipsis es la mejor?", "Conocerlas con humildad, no despreciar al que piensa distinto y poner el centro en Cristo, que es digno y viene", ["Pelear por cada detalle", "Creer que nada se puede saber", "Seguir solo al predicador más famoso"], "«porque tú fuiste inmolado».", "Apocalipsis 5:9-10"],
    // Lección 6 · La esperanza final: la nueva creación
    ["f51", 6, "o6", "recordar", "¿Qué dice Jesús en la última promesa de la Biblia, según Apocalipsis 22:20?", "Ciertamente vengo en breve", ["Nunca volveré", "Esperad mil años", "Id a Babilonia"], "«Ciertamente vengo en breve».", "Apocalipsis 22:20"],
    ["f52", 6, "o6", "recordar", "¿Qué responde la iglesia en Apocalipsis 22:20?", "Amén; sí, ven, Señor Jesús", ["Todavía no, Señor", "Espera un poco más", "No sabemos"], "«Amén; sí, ven, Señor Jesús».", "Apocalipsis 22:20"],
    ["f53", 6, "o6", "recordar", "¿Qué ya no habrá, según Apocalipsis 21:4?", "Muerte, llanto, clamor ni dolor", ["Sol ni luna", "Trabajo ni descanso", "Música ni alabanza"], "«y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».", "Apocalipsis 21:3-4"],
    ["f54", 6, "o6", "comprender", "¿Cómo se relaciona el final del Apocalipsis con el principio de Génesis?", "Lo que se perdió en el jardín se restaura: el árbol de la vida, la presencia de Dios y una creación sin muerte", ["No tiene relación", "El final repite la caída", "Génesis no habla de árboles"], "«y las hojas del árbol eran para la sanidad de las naciones».", "Apocalipsis 22:2"],
    ["f55", 6, "o6", "comprender", "¿Quién es el que vuelve como Fiel y Verdadero en Apocalipsis 19?", "El mismo Cristo, el Cordero que fue inmolado", ["Un ángel cualquiera", "Un rey de la tierra", "El profeta Daniel"], "«y con justicia juzga y pelea».", "Apocalipsis 19:11"],
    ["f56", 6, "o6", "analizar", "¿Por qué termina el Apocalipsis con una boda, una ciudad y un jardín, y no con un desastre?", "Porque su mensaje final es de esperanza: Cristo vence y Dios hace nuevas todas las cosas", ["Porque el desastre no importa", "Porque Juan se olvidó del juicio", "No termina así"], "«porque las primeras cosas pasaron».", "Apocalipsis 21:3-4"],
    ["f57", 6, "o6", "aplicar", "Tienes que dar una palabra en un funeral. ¿Cómo usas el Apocalipsis?", "Lees Apocalipsis 21:3-4 despacio, dices la esperanza con sencillez y no prometes lo que la Biblia no dice", ["Explicas las plagas", "Pones una fecha para el regreso de Cristo", "Hablas del número de la bestia"], "«Enjugará Dios toda lágrima».", "Apocalipsis 21:3-4"],
    ["f58", 6, "o6", "aplicar", "Un hermano dice que el cielo será aburrido. ¿Qué le muestras?", "Que la Biblia termina con un cielo nuevo y una tierra nueva, una ciudad viva, el árbol de la vida y la presencia de Dios", ["Que tiene razón", "Que el cielo es solo nubes", "Que no se sabe nada"], "«He aquí el tabernáculo de Dios con los hombres».", "Apocalipsis 21:3-4"],
    ["f59", 6, "o6", "aplicar", "Tu iglesia vive con miedo por las noticias del fin. ¿Qué haces?", "Enseñas el final del Apocalipsis, la victoria de Cristo y la nueva creación, y animas a orar: ven, Señor Jesús", ["Les muestras más noticias", "Anuncias una fecha", "Dejas de hablar del tema"], "«Amén; sí, ven, Señor Jesús».", "Apocalipsis 22:20"],
    ["f60", 6, "o6", "evaluar", "¿Qué respuesta a la esperanza del Apocalipsis es la mejor?", "Adorar a Cristo, ser fieles, servir y llevar el evangelio a toda nación mientras decimos: ven, Señor Jesús", ["Sentarse a esperar sin hacer nada", "Vivir con miedo", "Calcular la fecha del fin"], "«Ciertamente vengo en breve».", "Apocalipsis 22:20"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué son las siete estrellas, según Apocalipsis 1:20?", "Los ángeles de las siete iglesias", ["Siete planetas", "Siete reyes de Roma", "Siete profetas"], "«las siete estrellas son los ángeles de las siete iglesias».", "Apocalipsis 1:19-20"],
      ["m1-02", 1, "o1", "comprender", "¿Qué quieren mostrar las visiones y los símbolos del Apocalipsis?", "Lo que no se ve: que Dios gobierna y que su reino vencerá", ["Que el mal ganará", "Que nada tiene sentido", "Las noticias de cada semana"], "«para manifestar a sus siervos las cosas que deben suceder pronto».", "Apocalipsis 1:1-3"],
      ["m1-03", 1, "o1", "aplicar", "Una hermana tiene miedo de leer el Apocalipsis porque le parece aterrador. ¿Qué le dices?", "Que es la revelación de Jesucristo, que trae bendición al que lo lee y que su mensaje es de esperanza", ["Que tiene razón y no lo lea", "Que solo los pastores pueden leerlo", "Que lo lea para saber la fecha del fin"], "«Bienaventurado el que lee».", "Apocalipsis 1:1-3"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué un ángel le explicaba las visiones a Daniel?", "Porque el sentido de la profecía viene de Dios, no de la imaginación del lector", ["Porque Daniel no sabía leer", "Porque el ángel quería ser famoso", "No se las explicaba"], "«y me hizo conocer la interpretación de las cosas».", "Daniel 7:15-16"],
      ["m1-05", 1, "o1", "recordar", "¿Qué le pasó a Daniel con sus visiones, según Daniel 7:15?", "Se le turbó el espíritu y las visiones lo asombraron", ["Se rió de ellas", "Las olvidó", "Las escribió en la pared"], "«Se me turbó el espíritu a mí, Daniel, en medio de mi cuerpo».", "Daniel 7:15-16"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué manera de interpretar un símbolo de la profecía es la mejor?", "Buscar si el mismo libro lo explica, después su trasfondo en el Antiguo Testamento y su uso en el Nuevo", ["Usar la imaginación", "Buscarlo en las noticias", "Preguntar a un adivino"], "«y le pregunté la verdad acerca de todo esto».", "Daniel 7:15-16"],
      ["m1-07", 2, "o2", "recordar", "¿Qué no harían los tres amigos ante la estatua, según Daniel 3:18?", "No servirían a los dioses del rey ni adorarían la estatua", ["No comerían", "No hablarían", "No trabajarían"], "«ni tampoco adoraremos la estatua que has levantado».", "Daniel 3:17-18"],
      ["m1-08", 2, "o2", "comprender", "¿Qué cuentan los capítulos 1 al 6 de Daniel?", "Cómo Daniel y sus amigos fueron fieles a Dios en la corte de Babilonia", ["Las visiones del fin", "La vida de Jesús", "Los viajes de Pablo"], "«Y Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
      ["m1-09", 2, "o2", "aplicar", "Un estudiante de tu iglesia es presionado para hacer trampa en un examen. ¿Qué aprende de Daniel?", "A proponer en su corazón no hacerlo, a estudiar con excelencia y a confiar en que Dios da sabiduría", ["Que haga trampa si todos la hacen", "Que no estudie", "Que acuse a todos"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué la fidelidad de Daniel en público nació de su costumbre en privado?", "Porque oraba cada día desde antes, y por eso estaba firme cuando llegó la prueba", ["Porque quería que lo vieran", "Porque no tenía costumbre", "Porque el rey se lo mandó"], "«como lo solía hacer antes».", "Daniel 6:10"],
      ["m1-11", 2, "o2", "recordar", "¿Cuántas copias de Daniel se hallaron entre los manuscritos del mar Muerto?", "Ocho, todas incompletas", ["Ninguna", "Una sola, completa", "Cien"], "«Pero tú, Daniel, cierra las palabras y sella el libro hasta el tiempo del fin».", "Daniel 12:4"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué conclusión sobre las dos posturas acerca de la fecha de Daniel es la más justa?", "Las dos ven el mismo mensaje: Dios gobierna los reinos y sostiene a los suyos en la persecución", ["Que si hay debate el libro no sirve", "Que la fecha es lo único importante", "Que nadie puede saber nada del libro"], "«quita reyes, y pone reyes».", "Daniel 2:21"],
      ["m1-13", 3, "o3", "recordar", "¿Cómo resplandecerán los entendidos, según Daniel 12:3?", "Como el resplandor del firmamento", ["Como el fuego del horno", "Como el oro de la estatua", "Como la luna llena"], "«Los entendidos resplandecerán como el resplandor del firmamento».", "Daniel 12:2-3"],
      ["m1-14", 3, "o3", "comprender", "¿Qué representa la piedra que destruye la estatua de Daniel 2?", "El reino de Dios, que vence a los reinos humanos y permanece para siempre", ["Un ejército de Babilonia", "Un rey de Persia", "Un terremoto"], "«desmenuzará y consumirá a todos estos reinos».", "Daniel 2:44"],
      ["m1-15", 3, "o3", "aplicar", "Un joven pregunta por qué Jesús se llamaba a sí mismo el Hijo del Hombre. ¿Qué le muestras?", "Daniel 7:13-14, donde uno como un hijo de hombre recibe un reino eterno, y lo que Jesús dijo en Marcos 14:62", ["Que lo inventó sin razón", "Que quería decir que no era Dios", "Que no se sabe"], "«venía uno como un hijo de hombre».", "Daniel 7:13-14"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué se discute quiénes son el tercer y el cuarto reino de Daniel?", "Porque unos leen Grecia y Roma, y otros Persia y Grecia, según cómo entienden a los medos y persas", ["Porque Daniel no nombró ningún reino", "No se discute", "Porque esos reinos no existieron"], "«quita reyes, y pone reyes».", "Daniel 2:21"],
      ["m1-17", 3, "o3", "recordar", "¿Hasta quién llegó uno como un hijo de hombre, según Daniel 7:13?", "Hasta el Anciano de días", ["Hasta el rey de Babilonia", "Hasta Daniel", "Hasta la cuarta bestia"], "«que vino hasta el Anciano de días».", "Daniel 7:13-14"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué manera de enseñar las profecías de Daniel es la mejor?", "Destacar lo claro, presentar con honestidad las lecturas discutidas y llevar a la esperanza en el reino de Cristo", ["Centrarse solo en cálculos", "Evitar el libro de Daniel", "Imponer una sola tabla"], "«su reino uno que no será destruido».", "Daniel 7:13-14"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué isla estaba Juan cuando recibió el Apocalipsis, según Apocalipsis 1:9?", "En la isla llamada Patmos", ["En Chipre", "En Malta", "En Creta"], "«estaba en la isla llamada Patmos».", "Apocalipsis 1:9"],
      ["m2-02", 4, "o4", "comprender", "¿Qué muestra que Cristo diga a cada iglesia yo conozco tus obras?", "Que conoce de verdad lo que vive cada iglesia, lo bueno y lo malo", ["Que no sabe nada", "Que solo ve lo bueno", "Que solo ve lo malo"], "«Yo conozco tus obras, que ni eres frío ni caliente».", "Apocalipsis 3:15"],
      ["m2-03", 4, "o4", "aplicar", "Un hermano cree que su iglesia está viva porque tiene buena fama, aunque ya no hay vida espiritual. ¿Qué carta le compartes?", "La de Sardis: tiene nombre de que vive, y está muerta", ["La de Filadelfia", "La de Esmirna", "Ninguna"], "«que tienes nombre de que vives, y estás muerto».", "Apocalipsis 3:1"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué se presenta Cristo como el que vive y estuvo muerto ante iglesias perseguidas?", "Porque el que venció a la muerte puede sostener a los suyos aunque los maten", ["Para asustarlas", "No tiene relación", "Porque iba a morir otra vez"], "«y el que vivo, y estuve muerto».", "Apocalipsis 1:17-18"],
      ["m2-05", 4, "o4", "recordar", "¿Qué hará Cristo con el que oiga su voz y abra la puerta, según Apocalipsis 3:20?", "Entrará a él y cenará con él", ["Lo juzgará", "Lo mandará lejos", "Le dará dinero"], "«entraré a él, y cenaré con él, y él conmigo».", "Apocalipsis 3:20"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué iglesia de las siete es el mejor ejemplo de fidelidad con poca fuerza?", "Filadelfia, que tenía poca fuerza pero guardó la palabra de Cristo", ["Laodicea", "Sardis", "Pérgamo"], "«porque aunque tienes poca fuerza, has guardado mi palabra».", "Apocalipsis 3:8"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hizo el Cordero con su sangre, según Apocalipsis 5:9?", "Nos redimió para Dios, de todo linaje y lengua y pueblo y nación", ["Lavó el templo", "Escribió el libro", "Nada"], "«y con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación».", "Apocalipsis 5:9-10"],
      ["m2-08", 5, "o5", "comprender", "¿Qué dice la escuela idealista sobre el Apocalipsis?", "Que muestra con símbolos la lucha de siempre entre Dios y el mal", ["Que todo se cumplió en el año 70", "Que anuncia la historia de cada país", "Que no tiene mensaje"], "«Señor, digno eres de recibir la gloria».", "Apocalipsis 4:11"],
      ["m2-09", 5, "o5", "aplicar", "Un nuevo creyente pregunta qué es el pretribulacionismo. ¿Qué le explicas?", "Que es la postura que pone el arrebatamiento de la iglesia antes de la gran tribulación, una entre varias posturas", ["Que es la única postura posible", "Que es una herejía", "Que es una fecha exacta"], "«seremos arrebatados juntamente con ellos en las nubes».", "1 Tesalonicenses 4:17"],
      ["m2-10", 5, "o5", "analizar", "¿En qué coinciden todas las posturas sobre el milenio y el rapto?", "En que Cristo vuelve en persona, en que habrá resurrección y juicio, y en que Dios hará nuevas todas las cosas", ["En la fecha del fin", "En el orden exacto de los hechos", "En nada"], "«y reinaron con Cristo».", "Apocalipsis 20:4"],
      ["m2-11", 5, "o5", "recordar", "¿Qué nos ha hecho el Cordero para nuestro Dios, según Apocalipsis 5:10?", "Reyes y sacerdotes", ["Esclavos", "Ángeles", "Jueces de Roma"], "«y nos has hecho para nuestro Dios reyes y sacerdotes».", "Apocalipsis 5:9-10"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué manera de cerrar una clase sobre el milenio es la mejor?", "Adorar a Cristo, que vence, y animar a la fidelidad y a la misión mientras viene", ["Dejar a todos con miedo", "Votar cuál postura ganó", "Anunciar una fecha"], "«Señor, digno eres».", "Apocalipsis 4:11"],
      ["m2-13", 6, "o6", "recordar", "¿Qué vio Juan cuando se abrió el cielo, según Apocalipsis 19:11?", "Un caballo blanco, y al que lo montaba, llamado Fiel y Verdadero", ["Un dragón rojo", "Una estatua de oro", "Un barco"], "«y he aquí un caballo blanco».", "Apocalipsis 19:11"],
      ["m2-14", 6, "o6", "comprender", "¿Qué enseña la promesa de que Dios enjugará toda lágrima?", "Que Dios mismo consolará a su pueblo y quitará para siempre el dolor y la muerte", ["Que en el cielo se llora más", "Que a Dios no le interesa el dolor", "Que llorar es pecado"], "«Enjugará Dios toda lágrima de los ojos de ellos».", "Apocalipsis 21:3-4"],
      ["m2-15", 6, "o6", "aplicar", "Un amigo no creyente te pregunta por qué los cristianos esperan el fin con gozo. ¿Qué le respondes?", "Que esperamos a Cristo, que vuelve para juzgar con justicia y hacer nuevas todas las cosas, y lo invitas a conocerlo", ["Que esperamos que el mundo se destruya", "Que no esperamos nada", "Que le tenemos miedo"], "«y con justicia juzga y pelea».", "Apocalipsis 19:11"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la esperanza del Apocalipsis mueve a la misión?", "Porque el Cordero redimió gente de toda nación, y la iglesia lleva el evangelio mientras él viene", ["No la mueve", "Porque el fin depende de nosotros", "Porque así se gana el cielo"], "«una gran multitud, la cual nadie podía contar, de todas naciones y tribus y pueblos y lenguas».", "Apocalipsis 7:9"],
      ["m2-17", 6, "o6", "recordar", "¿Qué serán los hombres para Dios, según Apocalipsis 21:3?", "Su pueblo, y Dios estará con ellos como su Dios", ["Sus esclavos", "Sus enemigos", "Sus jueces"], "«y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios».", "Apocalipsis 21:3-4"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué manera de terminar un estudio del Apocalipsis es la mejor?", "Con la nueva creación, la adoración a Cristo y la oración de la iglesia: ven, Señor Jesús", ["Con una lista de plagas", "Con una fecha", "Con miedo"], "«sí, ven, Señor Jesús».", "Apocalipsis 22:20"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "biblicos-avanzados-3-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo se deben leer los símbolos del Apocalipsis.",
      ideas: [
        { id: "biblia", peso: 30, texto: "Dejar que la Biblia misma explique sus símbolos.", formas: ["la biblia explique", "la biblia misma", "la misma biblia", "el mismo libro", "el texto explica", "jesus explica"] },
        { id: "trasfondo", peso: 30, texto: "Buscar su trasfondo en el Antiguo Testamento.", formas: ["antiguo testamento", "trasfondo", "daniel", "la pascua", "isaias"] },
        { id: "fechas", peso: 30, negativa: true, texto: "Sin noticias ni fechas, para adorar a Cristo y serle fieles.", formas: ["noticias", "fechas", "adorar", "fieles", "fidelidad", "nadie sabe"] },
      ],
      citas: ["Apocalipsis 1:19-20", "Apocalipsis 1:20", "Apocalipsis 1:1-3", "Apocalipsis 1:3", "Daniel 7:15-16", "Mateo 24:36"],
      pesoCita: 10,
      errores: [
        { id: "e1-noticias", anula: "fechas", texto: "Leer los símbolos con las noticias o para calcular la fecha del fin.", formas: ["mirando las noticias", "con las noticias de", "calculando la fecha", "la fecha exacta"] },
      ],
      modelo:
        "Hay que dejar que la Biblia misma explique sus símbolos, como Jesús explica que las siete estrellas son los ángeles de las siete iglesias (Apocalipsis 1:20). Después se busca el trasfondo en el Antiguo Testamento. No se leen con las noticias ni para poner fechas, sino para adorar a Cristo y serle fieles.",
    },
    {
      id: "biblicos-avanzados-3-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué enseña Daniel sobre servir a Dios en una cultura que no lo conoce.",
      ideas: [
        { id: "fiel", peso: 30, negativa: true, texto: "No negociar la fe: propuso no contaminarse.", formas: ["no contaminarse", "propuso", "fiel*", "no negocio", "no negociar", "no adorar"] },
        { id: "servir", peso: 30, texto: "Servir con excelencia y con respeto a las autoridades.", formas: ["excelencia", "sirvio bien", "servir bien", "trabajo bien", "respeto", "aprendio"] },
        { id: "orar", peso: 30, texto: "Orar cada día, como lo solía hacer antes.", formas: ["oraba", "orar", "oracion", "tres veces al dia", "cada dia"] },
      ],
      citas: ["Daniel 1:8", "Daniel 3:17-18", "Daniel 6:10", "Daniel 1:17", "Daniel 1:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Daniel sirvió con excelencia al rey de Babilonia y trató con respeto a sus jefes, pero propuso en su corazón no contaminarse (Daniel 1:8). No negoció su fe y siguió orando tres veces al día, como lo solía hacer antes (Daniel 6:10). Así se puede ser buen ciudadano y fiel a Dios.",
    },
    {
      id: "biblicos-avanzados-3-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué mensaje tienen en común la estatua de Daniel 2 y las bestias de Daniel 7.",
      ideas: [
        { id: "pasan", peso: 30, texto: "Los reinos humanos pasan.", formas: ["reinos humanos", "imperios", "pasan", "caen", "reinos de la tierra"] },
        { id: "permanece", peso: 30, negativa: true, texto: "El reino de Dios permanece para siempre.", formas: ["reino de dios", "para siempre", "eterno", "no sera destruido", "permanece"] },
        { id: "hijo", peso: 30, texto: "Uno como un hijo de hombre recibe el reino: Jesús.", formas: ["hijo de hombre", "hijo del hombre", "jesus", "cristo", "la piedra"] },
      ],
      citas: ["Daniel 2:44", "Daniel 7:13-14", "Daniel 7:14", "Daniel 2:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Las dos visiones muestran que los reinos humanos pasan, uno tras otro, y que el Dios del cielo levantará un reino que no será jamás destruido (Daniel 2:44). En Daniel 7 ese reino eterno lo recibe uno como un hijo de hombre, el título que Jesús usó para sí mismo.",
    },
    {
      id: "biblicos-avanzados-3-e4",
      tipo: "breve",
      pregunta:
        "En tu clase, un hermano asegura que el Apocalipsis describe las noticias de este año y anuncia una fecha para el fin. Explica cómo guiarías a la clase a leer bien el libro, con citas bíblicas.",
      ideas: [
        { id: "simbolos", peso: 25, texto: "Dejar que la Biblia explique sus símbolos.", formas: ["la biblia explique", "la biblia misma", "la misma biblia", "el mismo libro", "sus simbolos", "los simbolos"] },
        { id: "lectores", peso: 25, texto: "El mensaje para las siete iglesias y para nosotros.", formas: ["siete iglesias", "primeros lectores", "iglesias reales", "siglo primero"] },
        { id: "fechas", peso: 25, negativa: true, texto: "Nadie sabe el día ni la hora; los que pusieron fechas se equivocaron.", formas: ["nadie sabe", "el dia ni la hora", "pusieron fechas", "se equivocaron", "sin fechas"] },
        { id: "cristo", peso: 25, texto: "Adorar a Cristo y ser fieles, con esperanza.", formas: ["adorar*", "adorando", "fieles", "fidelidad", "esperanza", "el cordero", "ven senor jesus"] },
      ],
      basta: 85,
      citas: ["Mateo 24:36", "Apocalipsis 1:1-3", "Apocalipsis 1:3", "Apocalipsis 1:19-20", "Apocalipsis 1:20", "Apocalipsis 4:11", "Apocalipsis 5:9-10", "Apocalipsis 22:20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero escucharía al hermano con respeto, pero le recordaría a la clase que del día y la hora nadie sabe, ni aun los ángeles (Mateo 24:36), y que los que pusieron fechas se equivocaron. Después mostraría cómo leer el libro: dejar que la Biblia misma explique sus símbolos, como Jesús explica las estrellas y los candeleros (Apocalipsis 1:20), y buscar su trasfondo en el Antiguo Testamento. Recordaría que Juan escribió a siete iglesias reales del siglo primero, y que su mensaje para ellas sigue hablándonos. Leeríamos los capítulos 4 y 5, donde Dios está en el trono y el Cordero es digno. Y terminaríamos adorando a Cristo, animándonos a ser fieles y orando con esperanza: ven, Señor Jesús.",
    },
    {
      id: "biblicos-avanzados-3-e5",
      tipo: "breve",
      pregunta:
        "Un nuevo creyente está confundido porque en su trabajo le hablan de distintas posturas sobre el milenio y el rapto. Explica cómo se las presentarías, con citas bíblicas.",
      ideas: [
        { id: "mil", peso: 25, texto: "Las posturas sobre los mil años.", formas: ["premilenar*", "posmilenar*", "amilenar*", "mil anos", "simbolicos"] },
        { id: "arrebatamiento", peso: 25, texto: "Las posturas sobre el arrebatamiento.", formas: ["pretribulacion*", "postribulacion*", "mesotribulacion*", "pre ira", "tribulacion", "arrebata*"] },
        { id: "comun", peso: 25, texto: "Lo que todos afirman: Cristo vuelve, resurrección, juicio y nueva creación.", formas: ["todos afirman", "en lo que coinciden", "cristo vuelve", "resurreccion", "nueva creacion", "nuevas todas las cosas"] },
        { id: "postura", peso: 25, negativa: true, texto: "Sin fechas, con respeto, y la postura del ministerio en su declaración de fe.", formas: ["declaracion de fe", "con respeto", "nadie sabe", "sin fechas", "sin despreciar"] },
      ],
      basta: 85,
      citas: ["Apocalipsis 20:4", "1 Tesalonicenses 4:16-17", "1 Tesalonicenses 4:17", "Mateo 24:36", "Apocalipsis 21:1", "Apocalipsis 22:20", "Tito 2:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero lo tranquilizaría: nuestra esperanza está en Cristo, no en un esquema. Le explicaría que sobre los mil años de Apocalipsis 20:4 hay varias posturas: el premilenarismo, histórico o dispensacional, dice que Cristo vuelve antes de un reino de mil años; el posmilenarismo, que vuelve después de un tiempo de avance del evangelio; y el amilenarismo, que los mil años son simbólicos y hablan del reinado presente de Cristo. Sobre el arrebatamiento le diría que unos lo ponen antes de la tribulación, otros a la mitad y otros al final, y que todos se apoyan en 1 Tesalonicenses 4:16-17. Después le mostraría lo que todos afirman: Cristo vuelve en persona, habrá resurrección y juicio, y Dios hará nuevas todas las cosas. Le recordaría que nadie sabe el día ni la hora (Mateo 24:36) y que la postura del ministerio la dirá su declaración de fe.",
    },
  ],
  breve: {
    id: "biblicos-avanzados-3-b1",
    tipo: "breve",
    pregunta: "Escribe cómo enseñarías Daniel y el Apocalipsis en tu iglesia durante el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "leer", peso: 15, texto: "Cómo leer la literatura apocalíptica.", formas: ["sus simbolos", "los simbolos", "literatura apocaliptica", "la biblia explique", "el mismo libro"] },
      { id: "daniel", peso: 20, texto: "Daniel, fiel en Babilonia.", formas: ["babilonia", "no contaminarse", "propuso", "tres veces al dia", "fieles"] },
      { id: "reino", peso: 15, texto: "El reino de Dios permanece; el Hijo del Hombre.", formas: ["reino de dios", "hijo de hombre", "hijo del hombre", "para siempre", "no sera jamas destruido"] },
      { id: "iglesias", peso: 15, texto: "Las siete iglesias.", formas: ["siete iglesias", "esmirna", "laodicea", "efeso", "primer amor"] },
      { id: "posturas", peso: 15, negativa: true, texto: "Las posturas, con respeto y sin fechas.", formas: ["posturas", "escuelas", "milenio", "rapto", "sin poner fechas", "nadie sabe"] },
      { id: "esperanza", peso: 20, texto: "La nueva creación y la esperanza.", formas: ["nueva creacion", "cielo nuevo", "toda lagrima", "ven senor jesus", "esperanza"] },
    ],
    basta: 85,
    citas: ["Daniel 7:15-16", "Apocalipsis 1:1-3", "Apocalipsis 1:19-20", "Daniel 1:8", "Daniel 3:17-18", "Daniel 6:10", "Daniel 2:44", "Daniel 7:13-14", "Daniel 7:14", "Daniel 12:2-3", "Apocalipsis 1:17-18", "Apocalipsis 2:10", "Apocalipsis 3:20", "Apocalipsis 4:11", "Apocalipsis 5:9-10", "Apocalipsis 20:4", "Apocalipsis 19:11", "Apocalipsis 21:3-4", "Apocalipsis 22:20", "Apocalipsis 1:20", "Apocalipsis 1:3", "Apocalipsis 21:4"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año enseñaría Daniel y el Apocalipsis en una serie de estudios. Empezaría por cómo leer la literatura apocalíptica: dejar que la Biblia explique sus símbolos, como las estrellas y los candeleros (Apocalipsis 1:20), y leer con la bendición del que guarda la profecía (Apocalipsis 1:3). Después estudiaríamos a Daniel, que en Babilonia propuso no contaminarse (Daniel 1:8) y siguió orando tres veces al día. Veríamos sus visiones: los reinos humanos pasan y el reino de Dios no será jamás destruido (Daniel 2:44), y uno como un hijo de hombre recibe un dominio eterno (Daniel 7:14). Leeríamos las cartas a las siete iglesias como un espejo para la nuestra. Presentaríamos las posturas sobre el milenio y el rapto con respeto, sin poner fechas, porque nadie sabe el día ni la hora. Y terminaríamos con la esperanza de la nueva creación, donde Dios enjugará toda lágrima (Apocalipsis 21:4), orando: ven, Señor Jesús.",
  },
};
