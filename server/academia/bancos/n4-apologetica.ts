/**
 * El banco de «Apologética» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es la apologética · o2 la existencia de Dios · o3 la confiabilidad de la Biblia · o4 la
 * resurrección · o5 el problema del mal · o6 las sectas y las falsas doctrinas · o7 el versículo de memoria (1 Pedro 3:15).
 * En las cortas de «dos de tres» argumentos o hechos, `basta` evita exigir todos.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-apologetica-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_APOLOGETICA: BancoMateria = {
  materia: "n4-apologetica",
  repaso: {
    "n4-apologetica-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué pide 1 Pedro 3:15?", "Estar siempre preparados para presentar defensa de nuestra esperanza, con mansedumbre y reverencia", ["Evitar toda pregunta sobre la fe", "Ganar todas las discusiones", "Hablar solo con creyentes"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15"],
      ["1-r2", 1, "o1", "comprender", "¿De qué palabra griega viene apologética?", "De apología, que significa defensa", ["De apóstol, que significa enviado", "De ágape, que significa amor", "De logos, que significa palabra"], "Estad siempre preparados para presentar defensa.", "1 Pedro 3:15"],
      ["1-r3", 1, "o1", "comprender", "¿Con qué actitud se defiende la fe?", "Con mansedumbre, respeto y amabilidad", ["Con burla y enojo", "A gritos, para convencer", "Con amenazas"], "«el siervo del Señor no debe ser contencioso, sino amable para con todos».", "2 Timoteo 2:24"],
    ] as P[]).map(p),
    "n4-apologetica-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué se ve claramente desde la creación del mundo, según Romanos 1:20?", "El eterno poder y la deidad de Dios", ["El futuro de cada persona", "La fecha del fin", "Nada de Dios"], "«su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo».", "Romanos 1:20"],
      ["2-r2", 2, "o2", "comprender", "¿Qué dice el argumento del comienzo del universo?", "Que lo que comienza a existir tiene una causa, y el universo comenzó", ["Que el universo siempre existió", "Que el universo se creó solo", "Que no se puede saber nada"], "«En el principio creó Dios los cielos y la tierra».", "Génesis 1:1"],
      ["2-r3", 2, "o2", "comprender", "¿A qué apunta la ley moral escrita en la conciencia?", "A un Legislador moral", ["A la casualidad", "A las costumbres de cada país", "A nada"], "La obra de la ley está escrita en el corazón, dando testimonio la conciencia.", "Romanos 2:15"],
    ] as P[]).map(p),
    "n4-apologetica-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué hizo Lucas antes de escribir su evangelio?", "Investigó con diligencia todas las cosas desde su origen", ["Inventó una historia", "Copió un mito griego", "Esperó un sueño"], "«después de haber investigado con diligencia todas las cosas desde su origen».", "Lucas 1:3"],
      ["3-r2", 3, "o3", "recordar", "¿Qué nombre aparece en la piedra hallada en Cesarea en 1961?", "Poncio Pilato", ["Herodes el Grande", "Julio César", "Caifás"], "El gobernador ante el que llevaron a Jesús.", "Lucas 23:1"],
      ["3-r3", 3, "o3", "comprender", "¿Qué muestra la unidad de la Biblia?", "Que, escrita por unos cuarenta autores en unos mil quinientos años, tiene un solo mensaje", ["Que la escribió una sola persona", "Que se escribió en un año", "Que sus libros no tienen relación entre sí"], "Dios anuncia lo por venir desde el principio.", "Isaías 46:10"],
    ] as P[]).map(p),
    "n4-apologetica-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pasa si Cristo no resucitó, según 1 Corintios 15:14?", "Vana es la predicación y vana es nuestra fe", ["Nada cambia", "La fe sigue igual de firme", "Solo se pierde una tradición"], "«Y si Cristo no resucitó, vana es entonces nuestra predicación, vana es también vuestra fe».", "1 Corintios 15:14"],
      ["4-r2", 4, "o4", "recordar", "¿A cuántos hermanos a la vez se apareció Jesús, según 1 Corintios 15:6?", "A más de quinientos", ["A doce", "A tres", "A ninguno"], "«Después apareció a más de quinientos hermanos a la vez, de los cuales muchos viven aún».", "1 Corintios 15:6"],
      ["4-r3", 4, "o4", "comprender", "¿Por qué importa que las primeras testigos de la tumba vacía fueran mujeres?", "Porque nadie habría inventado ese detalle en una cultura que valoraba menos su testimonio", ["Porque eran las más ricas", "Porque eran sacerdotisas", "No tiene importancia"], "Las mujeres fueron las primeras en encontrar la tumba vacía.", "Lucas 24:1-3"],
    ] as P[]).map(p),
    "n4-apologetica-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo era la creación al principio, según Génesis 1:31?", "Buena en gran manera", ["Mala", "Imperfecta", "Sin orden"], "«Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera».", "Génesis 1:31"],
      ["5-r2", 5, "o5", "comprender", "¿Cómo entró el pecado en el mundo, según Romanos 5:12?", "Por un hombre, y por el pecado la muerte", ["Por voluntad de Dios", "Por la creación misma", "Por casualidad"], "«el pecado entró en el mundo por un hombre, y por el pecado la muerte».", "Romanos 5:12"],
      ["5-r3", 5, "o5", "comprender", "¿Qué promete Apocalipsis 21:4?", "Que Dios enjugará toda lágrima, y ya no habrá muerte ni dolor", ["Que el sufrimiento seguirá para siempre", "Que solo los fuertes sobrevivirán", "Que nada cambiará"], "«Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».", "Apocalipsis 21:4"],
    ] as P[]).map(p),
    "n4-apologetica-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué manda 1 Juan 4:1?", "Probar los espíritus si son de Dios", ["Creer a todo espíritu", "No leer la Biblia", "Seguir a cualquier profeta"], "«no creáis a todo espíritu, sino probad los espíritus si son de Dios».", "1 Juan 4:1"],
      ["6-r2", 6, "o6", "comprender", "¿Qué es una secta, según la lección?", "Un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe", ["Cualquier iglesia pequeña", "Una denominación evangélica", "Un grupo de oración"], "Muchos falsos profetas han salido por el mundo.", "1 Juan 4:1"],
      ["6-r3", 6, "o6", "aplicar", "¿Cuál es la primera pregunta para examinar una enseñanza?", "¿Quién es Jesús para ellos?", ["¿Cuántos miembros tienen?", "¿Qué tan bonito es su templo?", "¿Son amables?"], "Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios.", "1 Juan 4:2"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: qué es la apologética (10)
    ["f01", 1, "o1", "recordar", "¿Ante quién debemos estar preparados para presentar defensa, según 1 Pedro 3:15?", "Ante todo el que nos pida razón de la esperanza que hay en nosotros", ["Solo ante los pastores", "Solo ante los jueces", "Ante nadie"], "«ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15"],
    ["f02", 1, "o1", "comprender", "¿Qué no es la apologética?", "Pelear o ganar discusiones", ["Dar razones de la fe", "Ayudar a los que dudan", "Quitar obstáculos para el evangelio"], "Se presenta defensa con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ["f03", 1, "o1", "recordar", "¿Cómo debe ser el siervo del Señor, según 2 Timoteo 2:24?", "No contencioso, sino amable para con todos, apto para enseñar, sufrido", ["Fuerte en las discusiones", "Duro con los que se oponen", "Siempre callado"], "«el siervo del Señor no debe ser contencioso, sino amable para con todos, apto para enseñar, sufrido».", "2 Timoteo 2:24"],
    ["f04", 1, "o1", "comprender", "¿Quién convence de pecado, según Juan 16:8?", "El Espíritu Santo", ["El mejor argumento", "El predicador", "La presión del grupo"], "«Y cuando él venga, convencerá al mundo de pecado, de justicia y de juicio».", "Juan 16:8"],
    ["f05", 1, "o1", "recordar", "¿Qué hizo Pablo en la sinagoga de Tesalónica?", "Mostró por las Escrituras que el Cristo debía padecer y resucitar", ["Hizo un milagro y se fue", "Leyó a los poetas griegos", "Se quedó callado"], "«declarando y exponiendo por medio de las Escrituras, que era necesario que el Cristo padeciese, y resucitase de los muertos».", "Hechos 17:3"],
    ["f06", 1, "o1", "analizar", "¿Por qué Pablo habló de manera distinta en Atenas que en la sinagoga?", "Porque partía de lo que conocían sus oyentes, con el mismo mensaje", ["Porque cambió de evangelio", "Porque no le importaban los griegos", "Porque olvidó las Escrituras"], "En Atenas partió del altar al Dios no conocido.", "Hechos 17:23"],
    ["f07", 1, "o1", "recordar", "¿Qué se lleva cautivo a la obediencia a Cristo, según 2 Corintios 10:5?", "Todo pensamiento", ["Solo las emociones", "Solo las palabras", "Solo las costumbres"], "«y llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
    ["f08", 1, "o1", "comprender", "¿Para qué sirve la apologética?", "Para quitar obstáculos que impiden escuchar el evangelio y fortalecer a los que dudan", ["Para reemplazar al Espíritu Santo", "Para humillar a los que no creen", "Para no tener que predicar"], "Derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios.", "2 Corintios 10:5"],
    ["f09", 1, "o1", "aplicar", "Alguien te pregunta por la fe con enojo, por una experiencia dolorosa. ¿Qué haces primero?", "Escucharlo con compasión", ["Darle diez argumentos", "Decirle que está equivocado", "Cambiar de tema"], "Con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ["f10", 1, "o7", "recordar", "Completa 1 Pedro 3:15: sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa…", "con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros", ["con fuerza y orgullo ante los incrédulos", "solo cuando os obliguen los jueces", "con palabras persuasivas de humana sabiduría"], "Es el versículo de memoria de la materia.", "1 Pedro 3:15"],
    // ---- lección 2: ¿existe Dios? (10)
    ["f11", 2, "o2", "recordar", "¿Desde cuándo se ven claramente el eterno poder y la deidad de Dios, según Romanos 1:20?", "Desde la creación del mundo", ["Desde el siglo veinte", "Desde la ley de Moisés", "Desde nunca"], "«se hacen claramente visibles desde la creación del mundo».", "Romanos 1:20"],
    ["f12", 2, "o2", "comprender", "¿Qué clase de causa necesita un universo que comenzó?", "Una causa fuera del tiempo, del espacio y de la materia, poderosa y personal", ["Ninguna causa", "Una causa dentro del universo", "Una casualidad"], "En el principio creó Dios los cielos y la tierra.", "Génesis 1:1"],
    ["f13", 2, "o2", "comprender", "¿Qué dice el argumento del diseño?", "Que el orden y la precisión del universo apuntan a una mente que lo diseñó", ["Que todo es caos", "Que el universo no tiene leyes", "Que la vida es imposible"], "«Los cielos cuentan la gloria de Dios».", "Salmos 19:1"],
    ["f14", 2, "o2", "aplicar", "¿Qué ejemplo ilustra el argumento del diseño?", "Un reloj hace pensar en un relojero", ["Una piedra en el camino", "Una nube sin forma", "Un charco de agua"], "El firmamento anuncia la obra de sus manos.", "Salmos 19:1"],
    ["f15", 2, "o2", "comprender", "¿Qué muestra que todos reconozcan que torturar a un niño por diversión está mal siempre?", "Que existe una ley moral que apunta a un Legislador", ["Que cada cultura inventa su moral", "Que la moral no existe", "Que solo importan las leyes del gobierno"], "La obra de la ley está escrita en sus corazones.", "Romanos 2:15"],
    ["f16", 2, "o2", "evaluar", "¿Qué pueden lograr los argumentos de la existencia de Dios?", "Mostrar que la fe es razonable y quitar excusas, pero no reemplazar la fe", ["Obligar a todos a creer", "Salvar por sí mismos", "Nada"], "«Pero sin fe es imposible agradar a Dios».", "Hebreos 11:6"],
    ["f17", 2, "o2", "analizar", "¿Por qué los argumentos no bastan para conocer a Dios como Padre?", "Porque eso requiere la revelación de su Palabra y la obra del Espíritu", ["Porque los argumentos son falsos", "Porque Dios no quiere ser conocido", "Porque la fe es irracional"], "El que se acerca a Dios debe creer que le hay.", "Hebreos 11:6"],
    ["f18", 2, "o2", "recordar", "¿Cuál de estos pioneros de la ciencia creía en Dios, según la lección?", "Isaac Newton", ["Ninguno", "Solo los del siglo veintiuno", "Ninguno de los pioneros"], "La fe bíblica no le teme a la ciencia.", "Salmos 19:1"],
    ["f19", 2, "o2", "comprender", "¿Qué rechaza la Biblia: la ciencia o la idea de un universo sin Creador?", "La idea de un universo sin Creador", ["La ciencia", "Las dos cosas", "Ninguna de las dos"], "En el principio creó Dios los cielos y la tierra.", "Génesis 1:1"],
    ["f20", 2, "o2", "aplicar", "Un amigo dice que el universo salió de la nada sin causa. ¿Qué argumento le presentarías?", "Que todo lo que comienza a existir tiene una causa", ["Que la ciencia es mala", "Que no importa", "Que no hay que pensar en eso"], "En el principio creó Dios los cielos y la tierra.", "Génesis 1:1"],
    // ---- lección 3: ¿es confiable la Biblia? (10)
    ["f21", 3, "o3", "recordar", "¿Para qué escribió Lucas su evangelio, según Lucas 1:4?", "Para que Teófilo conociera bien la verdad", ["Para entretener", "Para inventar una religión", "Para ganar dinero"], "«para que conozcas bien la verdad de las cosas en las cuales has sido instruido».", "Lucas 1:4"],
    ["f22", 3, "o3", "comprender", "¿Cómo se presenta la Biblia a sí misma?", "Como el testimonio de hechos reales, en lugares y tiempos concretos", ["Como un libro de mitos", "Como poesía sin historia", "Como una novela"], "Lucas investigó con diligencia todas las cosas desde su origen.", "Lucas 1:3"],
    ["f23", 3, "o3", "recordar", "¿Cuántos manuscritos griegos del Nuevo Testamento se conservan, según la lección?", "Más de cinco mil", ["Menos de diez", "Ninguno", "Uno solo"], "Muchos más que de cualquier otro libro antiguo.", "Lucas 1:4"],
    ["f24", 3, "o3", "comprender", "¿Qué mostraron los rollos del mar Muerto?", "Que el Antiguo Testamento se copió con gran fidelidad durante unos mil años", ["Que la Biblia cambió mucho", "Que Isaías no existía", "Que eran libros desconocidos"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
    ["f25", 3, "o3", "recordar", "¿Qué menciona la inscripción hallada en Tel Dan en 1993?", "La casa de David", ["El templo de Herodes", "La torre de Babel", "El arca de Noé"], "David fue un rey de la historia de Israel, y Dios afirmó su casa.", "2 Samuel 7:16"],
    ["f26", 3, "o3", "recordar", "¿Qué se descubrió en Jerusalén en 2004?", "El estanque de Siloé", ["El arca del pacto", "El palacio de Salomón", "La tumba de Moisés"], "«Ve a lavarte en el estanque de Siloé».", "Juan 9:7"],
    ["f27", 3, "o3", "evaluar", "¿Qué puede y qué no puede hacer la arqueología?", "No prueba la fe, pero confirma nombres, lugares y costumbres de la Biblia", ["Prueba todo lo que dice la Biblia", "Demuestra que la Biblia es falsa", "No tiene ninguna relación con la Biblia"], "La Biblia se presenta como historia, en lugares y tiempos concretos.", "Lucas 1:3"],
    ["f28", 3, "o3", "comprender", "¿Qué dice Dios de sí mismo en Isaías 46:10?", "Que anuncia lo por venir desde el principio", ["Que no conoce el futuro", "Que cambia de planes", "Que el futuro lo sorprende"], "«que anuncio lo por venir desde el principio».", "Isaías 46:10"],
    ["f29", 3, "o3", "analizar", "¿Por qué las profecías cumplidas muestran el origen divino de la Biblia?", "Porque anunciaron siglos antes hechos que se cumplieron en Jesús", ["Porque son muy antiguas", "Porque son difíciles de entender", "Porque se escribieron después de los hechos"], "Dios anuncia lo por venir desde el principio.", "Isaías 46:10"],
    ["f30", 3, "o3", "evaluar", "¿Qué lugar tiene el testimonio del Espíritu Santo frente a las evidencias?", "Las evidencias no lo reemplazan: el Espíritu asegura que la Biblia es la Palabra de Dios", ["Las evidencias lo reemplazan", "No hay testimonio del Espíritu", "Solo importan las evidencias"], "El Espíritu de verdad nos guía a toda la verdad.", "Juan 16:13"],
    // ---- lección 4: ¿resucitó Jesús? (10)
    ["f31", 4, "o4", "recordar", "Según 1 Corintios 15:3-4, ¿qué enseñó Pablo primeramente?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día", ["Que Jesús fue un buen maestro", "Que hay que cumplir la ley", "Que Jesús hizo milagros"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día».", "1 Corintios 15:3-4"],
    ["f32", 4, "o4", "comprender", "¿Por qué es importante que muchos testigos vivieran cuando Pablo escribió?", "Porque se les podía preguntar y confirmar lo que habían visto", ["Porque eran todos apóstoles", "Porque eran famosos", "No importa"], "«de los cuales muchos viven aún, y otros ya duermen».", "1 Corintios 15:6"],
    ["f33", 4, "o4", "recordar", "¿Qué historiador no cristiano menciona la muerte de Jesús, según la lección?", "Tácito", ["Homero", "Platón", "Aristóteles"], "Jesús fue crucificado en el lugar llamado de la Calavera.", "Lucas 23:33"],
    ["f34", 4, "o4", "comprender", "¿Qué cambio en los discípulos apoya la resurrección?", "Pasaron de esconderse con miedo a anunciar a Jesús con valor, aun a costa de su vida", ["Se hicieron ricos", "Volvieron a pescar para siempre", "Se olvidaron de Jesús"], "«A este Jesús resucitó Dios, de lo cual todos nosotros somos testigos».", "Hechos 2:32"],
    ["f35", 4, "o4", "recordar", "¿Quién era el hermano de Jesús que no creía en él antes de la resurrección?", "Jacobo", ["Pedro", "Juan", "Andrés"], "«Porque ni aun sus hermanos creían en él».", "Juan 7:5"],
    ["f36", 4, "o4", "evaluar", "¿Por qué la idea de que robaron el cuerpo no explica los hechos?", "Porque nadie da la vida por algo que sabe que es mentira", ["Porque los discípulos eran muy fuertes", "Porque la tumba estaba lejos", "Sí explica los hechos"], "Los apóstoles fueron testigos de que Dios lo resucitó.", "Hechos 2:32"],
    ["f37", 4, "o4", "evaluar", "¿Por qué la idea del desmayo no explica los hechos?", "Porque los soldados romanos sabían matar, y un hombre medio muerto no convence de que venció a la muerte", ["Porque Jesús no fue crucificado", "Porque nadie lo vio después", "Sí explica los hechos"], "Dios lo levantó, sueltos los dolores de la muerte.", "Hechos 2:24"],
    ["f38", 4, "o4", "evaluar", "¿Por qué la idea de las alucinaciones no explica los hechos?", "Porque quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba", ["Porque nadie tuvo visiones", "Porque las alucinaciones no existen", "Sí explica los hechos"], "Apareció a más de quinientos hermanos a la vez.", "1 Corintios 15:6"],
    ["f39", 4, "o4", "analizar", "¿Por qué la conversión de Pablo apoya la resurrección?", "Porque perseguía a la iglesia y cambió al ver a Cristo resucitado", ["Porque siempre fue cristiano", "Porque buscaba fama", "Porque no conocía a los cristianos"], "Y al último de todos, como a un abortivo, me apareció a mí.", "1 Corintios 15:8"],
    ["f40", 4, "o4", "aplicar", "¿Cuál es la mejor manera de hablar de la resurrección con un amigo?", "Presentar los hechos y contar cómo Cristo vivo transformó tu vida", ["Solo discutir teorías", "Burlarse de su duda", "Evitar el tema"], "Cristo ha resucitado de los muertos, primicias de los que durmieron.", "1 Corintios 15:20"],
    // ---- lección 5: el problema del mal (10)
    ["f41", 5, "o5", "comprender", "¿Cuál es el problema del mal?", "Cómo un Dios bueno y todopoderoso permite el sufrimiento", ["Por qué existen las leyes", "Por qué hay tantas iglesias", "Por qué la Biblia es larga"], "Dios creó todo bueno en gran manera.", "Génesis 1:31"],
    ["f42", 5, "o5", "comprender", "¿De dónde viene el mal, según la Biblia?", "De la desobediencia humana, no de Dios", ["De Dios", "De la materia", "De la casualidad"], "«el pecado entró en el mundo por un hombre, y por el pecado la muerte».", "Romanos 5:12"],
    ["f43", 5, "o5", "analizar", "¿Por qué Dios creó seres libres, aunque podían rechazarlo?", "Porque el amor verdadero necesita libertad", ["Porque no sabía lo que pasaría", "Porque no le importaba", "Porque quería el mal"], "Dios creó todo bueno en gran manera.", "Génesis 1:31"],
    ["f44", 5, "o5", "recordar", "¿Con qué no son comparables las aflicciones del tiempo presente, según Romanos 8:18?", "Con la gloria venidera", ["Con las riquezas", "Con el dolor de otros", "Con nada"], "«las aflicciones del tiempo presente no son comparables con la gloria venidera que en nosotros ha de manifestarse».", "Romanos 8:18"],
    ["f45", 5, "o5", "comprender", "¿Qué promete Romanos 8:28 a los que aman a Dios?", "Que todas las cosas les ayudan a bien", ["Que nunca sufrirán", "Que serán ricos", "Que todo será fácil"], "«a los que aman a Dios, todas las cosas les ayudan a bien».", "Romanos 8:28"],
    ["f46", 5, "o5", "analizar", "¿Cuál es la respuesta más profunda de Dios al mal?", "La cruz: el Hijo entró en nuestro sufrimiento, cargó el mal y lo venció", ["Una teoría filosófica", "El silencio", "Un castigo para todos"], "Cristo murió por nuestros pecados y resucitó al tercer día.", "1 Corintios 15:3-4"],
    ["f47", 5, "o5", "recordar", "¿Qué ya no habrá en el mundo nuevo, según Apocalipsis 21:4?", "Muerte, llanto, clamor ni dolor", ["Alegría", "Adoración", "Personas"], "«y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».", "Apocalipsis 21:4"],
    ["f48", 5, "o5", "evaluar", "¿Qué enseña el libro de Job sobre el sufrimiento?", "Que Dios no siempre explica cada dolor, pero se revela y es digno de confianza", ["Que todo dolor es castigo", "Que a Dios no le interesa", "Que el justo nunca sufre"], "De oídas te había oído; mas ahora mis ojos te ven.", "Job 42:5"],
    ["f49", 5, "o5", "aplicar", "Una amiga perdió a su hijo y pregunta por qué Dios lo permitió. ¿Qué haces primero?", "La acompañas y lloras con ella; los argumentos vienen después, si los pide", ["Le explicas la libertad humana", "Le dices que algo hizo mal", "Le dices que no llore"], "«Jesús lloró».", "Juan 11:35"],
    ["f50", 5, "o5", "evaluar", "¿Cuál de estas respuestas al sufrimiento es la más bíblica?", "Dios no es el autor del mal, sufrió con nosotros en Cristo, obra para bien y promete un final sin lágrimas", ["Dios causa todo el mal para castigarnos", "Dios no puede hacer nada", "El sufrimiento no es real"], "Enjugará Dios toda lágrima de los ojos de ellos.", "Apocalipsis 21:4"],
    // ---- lección 6: las sectas y las falsas doctrinas (10)
    ["f51", 6, "o6", "recordar", "¿Por qué hay que probar los espíritus, según 1 Juan 4:1?", "Porque muchos falsos profetas han salido por el mundo", ["Porque todos los espíritus son buenos", "Porque los profetas no existen", "Porque lo manda la ley"], "«porque muchos falsos profetas han salido por el mundo».", "1 Juan 4:1"],
    ["f52", 6, "o6", "comprender", "¿Qué prueba da 1 Juan 4:2 para reconocer el Espíritu de Dios?", "Confesar que Jesucristo ha venido en carne", ["Hacer milagros", "Tener muchos seguidores", "Hablar bonito"], "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", "1 Juan 4:2"],
    ["f53", 6, "o6", "aplicar", "¿Qué tres preguntas ayudan a examinar una enseñanza?", "¿Quién es Jesús? ¿Cuál es el evangelio? ¿Cuál es la autoridad?", ["¿Cuántos son? ¿Dónde se reúnen? ¿Cuánto cobran?", "¿Son amables? ¿Son jóvenes? ¿Cantan bien?", "¿Qué ropa usan? ¿Qué comen? ¿Qué música oyen?"], "Probad los espíritus si son de Dios.", "1 Juan 4:1"],
    ["f54", 6, "o6", "recordar", "¿Qué dice Pablo de quien anuncie otro evangelio, aunque sea un ángel del cielo?", "Sea anatema", ["Escuchadlo", "Seguidlo", "Dadle una ofrenda"], "«Mas si aun nosotros, o un ángel del cielo, os anunciare otro evangelio diferente del que os hemos anunciado, sea anatema».", "Gálatas 1:8"],
    ["f55", 6, "o6", "comprender", "¿Qué niegan los Testigos de Jehová?", "La Trinidad y la deidad de Cristo", ["La existencia de Dios", "Que Jesús existió", "La importancia de la Biblia"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
    ["f56", 6, "o6", "comprender", "¿Qué añaden los mormones a la Biblia?", "El Libro de Mormón y otros escritos", ["Nada", "Solo himnos", "Solo los libros apócrifos"], "No añadas a sus palabras, para que no te reprenda.", "Proverbios 30:6"],
    ["f57", 6, "o6", "analizar", "¿Por qué el evangelio de la prosperidad es una falsa doctrina?", "Porque promete riqueza y salud a cambio de fe u ofrendas, y convierte a Dios en un medio para obtener cosas", ["Porque enseña a dar con alegría", "Porque habla de la fe", "Porque ora por los enfermos"], "«Pero gran ganancia es la piedad acompañada de contentamiento».", "1 Timoteo 6:6"],
    ["f58", 6, "o6", "evaluar", "¿Cómo se debe tratar a quienes siguen una secta?", "Como personas que Dios ama: con la Biblia, con paciencia y con amabilidad", ["Como enemigos", "Con burla", "Evitándolos siempre"], "«por si quizá Dios les conceda que se arrepientan para conocer la verdad».", "2 Timoteo 2:25"],
    ["f59", 6, "o6", "aplicar", "¿Cuál es la mejor defensa contra el error?", "Conocer bien la verdad: la Biblia, las doctrinas básicas y una iglesia sana", ["Estudiar solo los errores", "No hablar con nadie", "Cambiar de iglesia cada año"], "«y conoceréis la verdad, y la verdad os hará libres».", "Juan 8:32"],
    ["f60", 6, "o6", "evaluar", "Un grupo enseña que su líder no se puede cuestionar y que sus libros están por encima de la Biblia. ¿Qué señal de secta muestra?", "Una autoridad fuera de la Biblia que no se puede examinar", ["Ninguna", "Que ama a Dios", "Que es una iglesia sana"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿A quién hay que santificar en el corazón, según 1 Pedro 3:15?", "A Dios el Señor", ["A las propias ideas", "A los líderes", "A las tradiciones"], "«sino santificad a Dios el Señor en vuestros corazones».", "1 Pedro 3:15"],
      ["m1-02", 1, "o1", "comprender", "¿Qué buscaba Pablo al discutir con los judíos de Tesalónica?", "Mostrar por las Escrituras que Jesús es el Cristo", ["Ganar una discusión", "Humillarlos", "Cambiar de religión"], "«y que Jesús, a quien yo os anuncio, decía él, es el Cristo».", "Hechos 17:3"],
      ["m1-03", 1, "o1", "aplicar", "¿Qué actitud debes tener al responder a alguien que se burla de tu fe?", "Mansedumbre, sin devolver la burla", ["Burlarte también", "Enojarte", "Ignorarlo con desprecio"], "Con mansedumbre y reverencia.", "1 Pedro 3:15"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué la apologética no reemplaza al Espíritu Santo?", "Porque solo el Espíritu convence de pecado y da la fe", ["Porque los argumentos son malos", "Porque no hay que pensar", "Porque el Espíritu no actúa hoy"], "Él convencerá al mundo de pecado, de justicia y de juicio.", "Juan 16:8"],
      ["m1-05", 1, "o1", "recordar", "¿Qué se derriba, según 2 Corintios 10:5?", "Los argumentos y toda altivez que se levanta contra el conocimiento de Dios", ["Las iglesias", "Las personas", "Los templos de otros"], "«derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios».", "2 Corintios 10:5"],
      ["m1-06", 1, "o1", "evaluar", "¿Cuál de estas respuestas a un escéptico sigue mejor 1 Pedro 3:15?", "Escuchar su pregunta y responder con razones y con respeto", ["Decirle que irá al infierno", "Negarse a hablar", "Ridiculizar sus ideas"], "Presentar defensa con mansedumbre y reverencia.", "1 Pedro 3:15"],
      ["m1-07", 2, "o2", "recordar", "¿Qué cuentan los cielos, según Salmos 19:1?", "La gloria de Dios", ["El azar", "El futuro", "Nada"], "«Los cielos cuentan la gloria de Dios».", "Salmos 19:1"],
      ["m1-08", 2, "o2", "comprender", "¿Qué información compleja de los seres vivos menciona la lección?", "La del ADN", ["La de los planetas", "La de las nubes", "La de las piedras"], "El orden del mundo apunta a una mente que lo diseñó.", "Salmos 19:1"],
      ["m1-09", 2, "o2", "analizar", "¿Por qué la ley moral apunta a Dios?", "Porque una ley que todos reconocen supone un Legislador", ["Porque cada uno inventa la suya", "Porque la moral cambia cada día", "Porque solo existe en las leyes del país"], "La obra de la ley está escrita en sus corazones.", "Romanos 2:15"],
      ["m1-10", 2, "o2", "aplicar", "¿Cómo usarías Romanos 1:20 al hablar con alguien que duda de Dios?", "Mostrando que la creación revela el poder y la deidad de Dios", ["Diciéndole que no piense", "Leyéndole solo genealogías", "Evitando el tema"], "Su eterno poder y deidad se hacen claramente visibles desde la creación del mundo.", "Romanos 1:20"],
      ["m1-11", 2, "o2", "recordar", "¿Qué debe creer el que se acerca a Dios, según Hebreos 11:6?", "Que le hay, y que es galardonador de los que le buscan", ["Que no existe", "Que está lejos", "Que no responde"], "«es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan».", "Hebreos 11:6"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estas afirmaciones sobre la fe y la razón es correcta?", "La fe bíblica es razonable, aunque los argumentos no la reemplazan", ["La fe es irracional", "La razón lo explica todo sin Dios", "No tienen ninguna relación"], "Sin fe es imposible agradar a Dios.", "Hebreos 11:6"],
      ["m1-13", 3, "o3", "recordar", "¿A quién dirigió Lucas su evangelio?", "A Teófilo", ["A Pilato", "A Herodes", "A Timoteo"], "«oh excelentísimo Teófilo».", "Lucas 1:3"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué tener más de cinco mil manuscritos griegos da confianza?", "Porque comparándolos se recupera con gran seguridad el texto original", ["Porque son idénticos sin una letra distinta", "Porque son los originales", "No da confianza"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué hallazgo mencionarías a alguien que dice que el rey David nunca existió?", "La inscripción de Tel Dan, que menciona la casa de David", ["El estanque de Siloé", "La piedra de Pilato", "Ninguno"], "Dios prometió afirmar la casa de David.", "2 Samuel 7:16"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué es importante la piedra de Pilato?", "Porque confirma la existencia del gobernador que juzgó a Jesús", ["Porque prueba la resurrección", "Porque menciona a Jesús", "No es importante"], "Llevaron a Jesús ante Pilato.", "Lucas 23:1"],
      ["m1-17", 3, "o3", "recordar", "¿Qué dice Dios de sí mismo en Isaías 46:9?", "Que él es Dios, y no hay otro", ["Que hay muchos dioses", "Que cambia", "Que no conoce el futuro"], "«porque yo soy Dios, y no hay otro Dios, y nada hay semejante a mí».", "Isaías 46:9"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué muestran juntas la conservación del texto, la arqueología y las profecías?", "Que confiar en la Biblia es razonable", ["Que la Biblia es un mito", "Que no se puede saber nada", "Que solo importa la arqueología"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿A quién se apareció Jesús, según 1 Corintios 15:5?", "A Cefas, y después a los doce", ["A Pilato", "A Herodes", "A Caifás"], "«y que apareció a Cefas, y después a los doce».", "1 Corintios 15:5"],
      ["m2-02", 4, "o4", "comprender", "¿Qué significa que la resurrección sea el centro de la fe?", "Que sin ella la fe sería vana", ["Que es un detalle secundario", "Que no importa si ocurrió", "Que es solo un símbolo"], "Si Cristo no resucitó, vana es también vuestra fe.", "1 Corintios 15:14"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué hechos mencionarías primero a alguien que duda de la resurrección?", "La tumba vacía y las apariciones a muchos testigos", ["La opinión de un artista", "Una película", "Un sueño personal"], "Apareció a más de quinientos hermanos a la vez.", "1 Corintios 15:6"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la valentía de los apóstoles apoya la resurrección?", "Porque pasaron del miedo a dar la vida por lo que habían visto", ["Porque eran soldados", "Porque querían poder", "No la apoya"], "«A este Jesús resucitó Dios, de lo cual todos nosotros somos testigos».", "Hechos 2:32"],
      ["m2-05", 4, "o4", "recordar", "¿En quién no creían los hermanos de Jesús antes de la resurrección?", "En él", ["En Moisés", "En el templo", "En los profetas"], "«Porque ni aun sus hermanos creían en él».", "Juan 7:5"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué explicación da cuenta de todos los hechos?", "Que Dios resucitó a Jesús", ["Que robaron el cuerpo", "Que Jesús se desmayó", "Que fueron alucinaciones"], "«al cual Dios levantó, sueltos los dolores de la muerte».", "Hechos 2:24"],
      ["m2-07", 5, "o5", "recordar", "¿Qué vio Dios de todo lo que había hecho, según Génesis 1:31?", "Que era bueno en gran manera", ["Que era malo", "Que estaba incompleto", "Que no servía"], "«Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera».", "Génesis 1:31"],
      ["m2-08", 5, "o5", "comprender", "¿Qué pasó a todos los hombres por el pecado, según Romanos 5:12?", "La muerte", ["La riqueza", "La sabiduría", "La felicidad"], "«así la muerte pasó a todos los hombres, por cuanto todos pecaron».", "Romanos 5:12"],
      ["m2-09", 5, "o5", "aplicar", "¿Qué pasaje compartirías para dar esperanza a alguien que sufre?", "Apocalipsis 21:4", ["Levítico 11", "Números 1", "Ester 2"], "Enjugará Dios toda lágrima de los ojos de ellos.", "Apocalipsis 21:4"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué un Dios que sufrió en la cruz no es indiferente al dolor?", "Porque entró en nuestro sufrimiento y cargó el mal sobre sí", ["Porque no sintió nada", "Porque no murió de verdad", "Porque lo vio de lejos"], "Cristo murió por nuestros pecados.", "1 Corintios 15:3"],
      ["m2-11", 5, "o5", "recordar", "¿Qué hizo Jesús ante la tumba de Lázaro?", "Lloró", ["Se rió", "Se fue", "Regañó a todos"], "«Jesús lloró».", "Juan 11:35"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué error hay que evitar al acompañar a quien sufre?", "Dar argumentos antes de escuchar y de acompañar", ["Llorar con él", "Orar con él", "Visitarlo"], "Jesús lloró antes de resucitar a Lázaro.", "Juan 11:35"],
      ["m2-13", 6, "o6", "recordar", "¿A qué no hay que creer, según 1 Juan 4:1?", "A todo espíritu", ["A Dios", "A la Biblia", "Al evangelio"], "«Amados, no creáis a todo espíritu».", "1 Juan 4:1"],
      ["m2-14", 6, "o6", "comprender", "Un grupo dice que la salvación se gana cumpliendo sus reglas. ¿Qué señal de falsa doctrina muestra?", "Un evangelio distinto del de la gracia", ["Ninguna", "Que es muy santo", "Que ama la Biblia"], "Por gracia sois salvos por medio de la fe; no por obras.", "Efesios 2:8-9"],
      ["m2-15", 6, "o6", "aplicar", "Dos personas tocan a tu puerta y dicen que Jesús es un ángel. ¿Qué pasajes usarías?", "Juan 1:1 y Hebreos 1:5-8", ["Génesis 5", "Levítico 11", "Ester 2"], "«Porque ¿a cuál de los ángeles dijo Dios jamás: Mi Hijo eres tú».", "Hebreos 1:5"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué Pablo dijo que aun un ángel que anuncie otro evangelio sea anatema?", "Porque la autoridad está en el evangelio, no en quién lo anuncia", ["Porque odiaba a los ángeles", "Porque los ángeles no existen", "Porque quería ser el único maestro"], "Aunque un ángel del cielo anuncie otro evangelio, sea anatema.", "Gálatas 1:8"],
      ["m2-17", 6, "o6", "recordar", "¿Qué hace la verdad, según Juan 8:32?", "Nos hace libres", ["Nos condena", "Nos confunde", "Nos aleja de Dios"], "«y conoceréis la verdad, y la verdad os hará libres».", "Juan 8:32"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál de estas actitudes hacia los miembros de una secta es la correcta?", "Amarlos y responderles con la Biblia y con paciencia", ["Insultarlos", "Cerrarles la puerta con enojo", "Aceptar todo lo que dicen"], "Con mansedumbre corrija a los que se oponen.", "2 Timoteo 2:25"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-apologetica-e1",
      tipo: "corta",
      pregunta: "Explica, con 1 Pedro 3:15, qué es la apologética y con qué actitud se defiende la fe.",
      ideas: [
        { id: "defensa", peso: 30, texto: "Dar razones de la fe: apología significa defensa.", formas: ["defensa", "razon*", "apologia", "esperanza"] },
        { id: "actitud", peso: 30, texto: "Con mansedumbre y reverencia, sin pelear.", formas: ["mansedumbre", "reverencia", "respeto", "amable", "sin pelear", "no pelear"], negativa: true },
        { id: "proposito", peso: 20, texto: "Para quitar obstáculos al evangelio y fortalecer a los que dudan.", formas: ["obstaculo*", "dudas", "dudan", "evangelio", "fortalec*"] },
        { id: "espiritu", peso: 10, texto: "El Espíritu Santo es quien convence.", formas: ["espiritu", "convence"] },
      ],
      citas: ["1 Pedro 3:15", "2 Timoteo 2:24-25", "2 Timoteo 2:24", "Juan 16:8", "2 Corintios 10:5", "Hechos 17:2-3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La apologética es dar razones de la fe: Pedro pide estar siempre preparados para presentar defensa de nuestra esperanza (1 Pedro 3:15). Se hace con mansedumbre y reverencia, sin pelear ni burlarse, para quitar obstáculos al evangelio y fortalecer a los que dudan, sabiendo que es el Espíritu Santo quien convence.",
    },
    {
      id: "n4-apologetica-e2",
      tipo: "corta",
      pregunta: "Explica dos argumentos que muestran que creer en Dios es razonable, y qué pueden y qué no pueden lograr.",
      ideas: [
        { id: "causa", peso: 25, texto: "El comienzo del universo: lo que comienza a existir tiene una causa.", formas: ["causa", "comienzo", "comenzo", "comienza a existir"] },
        { id: "diseno", peso: 25, texto: "El orden y el diseño apuntan a una mente.", formas: ["diseño", "diseno", "diseñador", "disenador", "orden", "relojero", "adn", "precision"] },
        { id: "moral", peso: 25, texto: "La ley moral apunta a un Legislador.", formas: ["ley moral", "legislador", "conciencia"] },
        { id: "alcance", peso: 25, texto: "Muestran que la fe es razonable, pero no la reemplazan.", formas: ["razonable", "no (reemplaz*|obligan|bastan)", "quitan excusas", "sin fe"], negativa: true },
      ],
      basta: 85,
      citas: ["Romanos 1:20", "Génesis 1:1", "Salmos 19:1", "Romanos 2:14-15", "Romanos 2:15", "Hebreos 11:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero, todo lo que comienza a existir tiene una causa, y el universo comenzó; necesita una causa eterna y poderosa: Dios creó los cielos y la tierra (Génesis 1:1). Segundo, la ley moral escrita en la conciencia apunta a un Legislador (Romanos 2:15). Estos argumentos muestran que la fe es razonable, pero no la reemplazan.",
    },
    {
      id: "n4-apologetica-e3",
      tipo: "corta",
      pregunta: "Explica tres hechos que sostienen la resurrección de Jesús y por qué una explicación alternativa no los explica.",
      ideas: [
        { id: "tumba", peso: 20, texto: "La tumba vacía.", formas: ["tumba", "sepulcro", "mujeres"] },
        { id: "apariciones", peso: 20, texto: "Las apariciones a muchos testigos.", formas: ["apari*", "quinientos", "testigos", "lo vieron"] },
        { id: "cambio", peso: 20, texto: "El cambio de los discípulos y de los escépticos.", formas: ["cambi*", "valor", "miedo", "dieron la vida", "pablo", "jacobo", "escepticos"] },
        { id: "muerte", peso: 15, texto: "Su muerte en la cruz.", formas: ["murio", "crucific*", "tacito"] },
        { id: "alternativa", peso: 25, texto: "Una explicación alternativa y por qué falla.", formas: ["robo", "robaron", "desmay*", "alucinac*", "mentira", "no (explica|explican)"], negativa: true },
      ],
      basta: 85,
      citas: ["1 Corintios 15:3-8", "1 Corintios 15:6", "1 Corintios 15:14", "Hechos 2:24", "Hechos 2:32", "Juan 7:5", "Lucas 24:1-3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús murió crucificado; su tumba quedó vacía, y las primeras testigos fueron mujeres; y se apareció a muchos, a más de quinientos a la vez (1 Corintios 15:6). Sus discípulos pasaron del miedo al valor. Decir que robaron el cuerpo no lo explica: nadie da la vida por lo que sabe que es mentira.",
    },
    {
      id: "n4-apologetica-e4",
      tipo: "breve",
      pregunta:
        "Explica por qué la Biblia es confiable: cómo se presenta a sí misma, la conservación de su texto, la arqueología y las profecías cumplidas. Termina con cómo responderías a alguien que dice que es un libro de mitos. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "testimonio", peso: 15, texto: "Se presenta como testimonio de hechos reales.", formas: ["hechos reales", "testimonio", "investig*", "fabulas"] },
        { id: "texto", peso: 20, texto: "Su texto se conservó en miles de manuscritos.", formas: ["manuscritos", "copias", "cinco mil", "mar muerto", "rollos"] },
        { id: "arqueologia", peso: 20, texto: "La arqueología confirma datos.", formas: ["arqueolog*", "tel dan", "casa de david", "pilato", "siloe"] },
        { id: "profecias", peso: 20, texto: "Las profecías cumplidas.", formas: ["profecia*", "belen", "isaias 53", "lo por venir"] },
        { id: "unidad", peso: 10, texto: "Un solo mensaje a lo largo de siglos.", formas: ["un solo mensaje", "unidad", "cuarenta autores", "mil quinientos"] },
        { id: "respuesta", peso: 15, texto: "Cómo respondería a quien dice que es un libro de mitos.", formas: ["le diria", "responderia", "le mostraria", "le explicaria", "mitos"] },
      ],
      basta: 85,
      citas: ["Lucas 1:1-4", "Lucas 1:3", "Lucas 1:4", "2 Pedro 1:16", "Isaías 46:9-10", "Isaías 46:10", "Isaías 40:8", "Miqueas 5:2", "Isaías 53:5", "2 Timoteo 3:16", "Juan 9:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La Biblia se presenta como el testimonio de hechos reales: Lucas investigó con diligencia todas las cosas desde su origen (Lucas 1:3), y Pedro dijo que no siguieron fábulas artificiosas, sino que vieron con sus propios ojos (2 Pedro 1:16). Su texto se conservó muy bien: del Nuevo Testamento hay más de cinco mil manuscritos griegos, y los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con fidelidad durante unos mil años. La arqueología ha confirmado muchos datos: la inscripción de Tel Dan menciona la casa de David, una piedra de Cesarea lleva el nombre de Poncio Pilato y se descubrió el estanque de Siloé. Además, Dios anuncia lo por venir desde el principio (Isaías 46:10), y profecías como el nacimiento en Belén se cumplieron en Jesús. Y aunque la escribieron unos cuarenta autores en unos mil quinientos años, tiene un solo mensaje. Si alguien me dice que es un libro de mitos, le respondería con respeto que los mitos no dan nombres, lugares y fechas que la historia confirma, y le mostraría estas evidencias, invitándolo a leer por sí mismo el Evangelio de Lucas.",
    },
    {
      id: "n4-apologetica-e5",
      tipo: "breve",
      pregunta:
        "Responde a la pregunta de por qué Dios permite el sufrimiento: explica de dónde viene el mal, qué hace Dios frente al dolor, la respuesta de la cruz y la esperanza final, y cómo acompañarías a una persona que sufre. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "origen", peso: 20, texto: "El mal entró por la desobediencia humana, con la libertad.", formas: ["desobedien*", "pecado entro", "caida", "libertad", "libres", "adan"] },
        { id: "bueno", peso: 10, texto: "Dios creó todo bueno; el mal no viene de él.", formas: ["bueno en gran manera", "no viene de el", "no viene de dios", "no es el autor"], negativa: true },
        { id: "obra", peso: 15, texto: "Dios obra en el dolor para bien, aunque no siempre lo explique.", formas: ["ayudan a bien", "job", "no siempre explica"], negativa: true },
        { id: "cruz", peso: 20, texto: "La respuesta de la cruz y la resurrección.", formas: ["cruz", "sufrio", "cargo", "resurrec*", "vencio"] },
        { id: "esperanza", peso: 15, texto: "La esperanza final: un mundo sin lágrimas.", formas: ["enjugara", "lagrima*", "ya no habra", "gloria venidera", "esperanza"] },
        { id: "acompanar", peso: 20, texto: "Cómo acompañaría a quien sufre.", formas: ["acompa*", "lloraria", "llorar con", "escucharia", "escuchar", "compasion"] },
      ],
      basta: 85,
      citas: ["Génesis 1:31", "Romanos 5:12", "Romanos 8:18", "Romanos 8:28", "Apocalipsis 21:4", "Juan 11:35", "Job 42:5", "1 Corintios 15:3-4", "2 Corintios 1:3-4", "Romanos 12:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios creó un mundo bueno en gran manera (Génesis 1:31), y el mal no viene de él: entró por la desobediencia humana, porque el pecado entró en el mundo por un hombre, y por el pecado la muerte (Romanos 5:12). Dios nos creó libres para amarlo, y esa libertad incluía la posibilidad de rechazarlo. Él no siempre explica cada sufrimiento, como vemos en Job, pero promete que a los que lo aman todas las cosas les ayudan a bien (Romanos 8:28). Su respuesta más profunda es la cruz: el Hijo de Dios sufrió con nosotros, cargó el mal sobre sí y lo venció con su resurrección, así que no es un Dios indiferente. Y la historia no termina en el dolor: Dios enjugará toda lágrima, y ya no habrá muerte ni llanto (Apocalipsis 21:4). Si una persona sufre, primero la acompañaría: la escucharía, lloraría con ella y oraría si me lo permite, como Jesús lloró ante la tumba de Lázaro. Solo después, si me lo pide, le compartiría estas razones, con mucha compasión.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-apologetica-b1",
    tipo: "breve",
    pregunta:
      "Escoge una pregunta o una objeción contra la fe que hayas escuchado (sobre Dios, la Biblia, la resurrección, el sufrimiento o una secta). Escribe cómo la responderías, con razones y con la Biblia, y con qué actitud. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "pregunta", peso: 10, texto: "La pregunta o la objeción escogida.", formas: ["escogi", "me pregunto", "me preguntaron", "pregunta", "objecion", "dicen que", "me dijo"] },
      { id: "razones", peso: 25, texto: "Las razones de la respuesta.", formas: ["razon*", "argument*", "evidencia*", "hechos", "manuscritos", "arqueolog*", "causa", "testigos", "tumba"] },
      { id: "biblia", peso: 20, texto: "La respuesta desde la Biblia.", formas: ["la biblia", "pasaje", "escritura*", "palabra de dios", "segun"] },
      { id: "actitud", peso: 20, texto: "La actitud: mansedumbre, respeto, escuchar.", formas: ["mansedumbre", "reverencia", "respeto", "amable", "escuch*", "paciencia", "compasion"] },
      { id: "cristo", peso: 15, texto: "Lleva a Cristo y al evangelio.", formas: ["cristo", "jesus", "evangelio"] },
      { id: "espiritu", peso: 10, texto: "Depende del Espíritu Santo y ora.", formas: ["espiritu", "oraria", "orar", "oracion"] },
    ],
    basta: 85,
    citas: ["1 Pedro 3:15", "2 Timoteo 2:24-25", "Romanos 1:20", "Salmos 19:1", "Génesis 1:1", "Hebreos 11:6", "Lucas 1:3", "2 Pedro 1:16", "Isaías 46:10", "1 Corintios 15:3-8", "1 Corintios 15:6", "1 Corintios 15:14", "Romanos 8:28", "Apocalipsis 21:4", "1 Juan 4:1", "1 Juan 4:2", "Gálatas 1:8", "Juan 1:1", "Juan 16:8", "Juan 14:6"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Un compañero de trabajo me dijo que la resurrección de Jesús es un cuento inventado por sus seguidores. Primero lo escucharía con respeto, sin burlarme, porque Pedro pide responder con mansedumbre y reverencia (1 Pedro 3:15). Después le daría razones. Le diría que la tumba quedó vacía y que las primeras testigos fueron mujeres, algo que nadie habría inventado en esa época. Le mostraría que, según 1 Corintios 15:6, Jesús se apareció a más de quinientas personas a la vez, muchas de las cuales vivían cuando Pablo escribió. Le explicaría que los discípulos pasaron del miedo al valor y dieron la vida por lo que vieron, y que nadie muere por una mentira que inventó. También le contaría que Pablo y Jacobo eran escépticos y creyeron. Al final, le contaría cómo Cristo vivo cambió mi vida y lo invitaría a leer el Evangelio de Lucas. Oraría por él, sabiendo que es el Espíritu Santo quien convence (Juan 16:8).",
  },
};
