/**
 * El banco de «Geografía e historia bíblica» (especialidad Estudios bíblicos avanzados, materia 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la tierra de la Biblia · o2 de los patriarcas al reino · o3 el reino dividido y los imperios · o4 el exilio,
 * el regreso y los persas · o5 entre los dos testamentos · o6 el mundo de Jesús y de Pablo · o7 el versículo de memoria
 * (Hechos 17:26). Las fechas antiguas se preguntan como aproximadas.
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `biblicos-avanzados-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_BIBLICOS_AVANZADOS_4: BancoMateria = {
  materia: "biblicos-avanzados-4",
  repaso: {
    "biblicos-avanzados-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué clase de tierra describe Deuteronomio 8:8?", "Tierra de trigo y cebada, de vides, higueras y granados, de olivos, de aceite y de miel", ["Tierra de arena sin agua", "Tierra de hielo", "Tierra de oro y plata solamente"], "«tierra de trigo y cebada, de vides, higueras y granados».", "Deuteronomio 8:7-9"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué la tierra prometida enseñaba a depender de Dios, según Deuteronomio 11:11-12?", "Porque no se regaba con un río como Egipto, sino que bebía de la lluvia del cielo", ["Porque no tenía montes", "Porque era un desierto", "Porque el pueblo no trabajaba"], "«que bebe las aguas de la lluvia del cielo».", "Deuteronomio 11:10-12"],
      ["1-r3", 1, "o1", "aplicar", "Tienes que enseñar la parábola del buen samaritano. ¿Qué dato de geografía usas?", "Que el camino de Jerusalén a Jericó baja más de mil metros por un desierto solitario, ideal para los ladrones", ["Que era una carretera moderna", "Que iba junto al mar", "Ninguno, la geografía no importa"], "«Un hombre descendía de Jerusalén a Jericó, y cayó en manos de ladrones».", "Lucas 10:30"],
    ] as P[]).map(p),
    "biblicos-avanzados-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué le dijo Jehová a Abram, según Génesis 12:1?", "Que se fuera de su tierra y de su parentela a la tierra que él le mostraría", ["Que se quedara en Ur para siempre", "Que fuera a vivir a Egipto", "Que construyera una torre"], "«Vete de tu tierra y de tu parentela».", "Génesis 12:1"],
      ["2-r2", 2, "o2", "comprender", "¿Por qué se proponen dos fechas para el éxodo?", "Porque unos se basan en los 480 años de 1 Reyes 6:1, y otros en la ciudad de Ramesés y en datos arqueológicos", ["Porque la Biblia no habla del éxodo", "Porque hubo dos éxodos", "No hay ningún debate"], "«En el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto».", "1 Reyes 6:1"],
      ["2-r3", 2, "o2", "aplicar", "Un joven se inquieta porque los estudiosos discuten la fecha del éxodo. ¿Qué le dices?", "Que las dos posturas creen que el éxodo ocurrió, que la discusión es sobre cuándo, y que la fe no depende de una fecha", ["Que entonces la Biblia no sirve", "Que deje de estudiar", "Que la fecha exacta es lo único importante"], "«todas las huestes de Jehová salieron de la tierra de Egipto».", "Éxodo 12:40-41"],
    ] as P[]).map(p),
    "biblicos-avanzados-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué respondieron las tribus del norte a Roboam, según 1 Reyes 12:16?", "¿Qué parte tenemos nosotros con David? ¡Israel, a tus tiendas!", ["¡Viva el rey Roboam!", "¡Vamos a Egipto!", "¡Edifiquemos otro templo!"], "«¿Qué parte tenemos nosotros con David?».", "1 Reyes 12:16"],
      ["3-r2", 3, "o3", "comprender", "¿En qué se diferenciaban el reino del norte y el reino del sur?", "Israel, al norte, tenía su capital en Samaria y varias familias de reyes; Judá, al sur, tenía Jerusalén, el templo y la casa de David", ["No se diferenciaban en nada", "Judá estaba en Egipto", "Israel tenía el templo de Salomón"], "«¿Qué parte tenemos nosotros con David?».", "1 Reyes 12:16"],
      ["3-r3", 3, "o3", "aplicar", "Tienes que enseñar el libro de Amós. ¿Qué haces primero?", "Lo ubicas en la historia: en el reino del norte, antes de la caída de Samaria, en un tiempo de injusticia", ["Lo lees sin saber cuándo se escribió", "Dices que es del tiempo de Jesús", "Lo mezclas con el Apocalipsis"], "«que profetizó acerca de Israel en días de Uzías rey de Judá».", "Amós 1:1"],
    ] as P[]).map(p),
    "biblicos-avanzados-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cuántos años en Babilonia anunció Jeremías antes del regreso, según Jeremías 29:10?", "Setenta años", ["Cuarenta años", "Cuatrocientos años", "Mil años"], "«Cuando en Babilonia se cumplan los setenta años».", "Jeremías 29:10"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué dice Esdras que Dios despertó el espíritu de Ciro?", "Porque detrás de la decisión del rey persa la Biblia ve la mano de Dios, que cumplía su palabra por Jeremías", ["Porque Ciro era judío", "Porque Ciro dormía mucho", "Porque Dios no tuvo nada que ver"], "«despertó Jehová el espíritu de Ciro rey de Persia».", "Esdras 1:1-2"],
      ["4-r3", 4, "o4", "aplicar", "Una iglesia pequeña quiere empezar de nuevo después de una división. ¿Qué le enseña el regreso del exilio?", "Que Dios es fiel, que se empieza por lo primero, que no hay que rendirse ante la oposición y que hay que volver a la Palabra", ["Que cierre la iglesia", "Que espere a ser grande para empezar", "Que culpe a los que se fueron"], "«para haceros volver a este lugar».", "Jeremías 29:10"],
    ] as P[]).map(p),
    "biblicos-avanzados-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Quién es el macho cabrío de la visión de Daniel, según Daniel 8:21?", "El rey de Grecia", ["El rey de Persia", "El rey de Babilonia", "El rey de Egipto"], "«El macho cabrío es el rey de Grecia».", "Daniel 8:21-22"],
      ["5-r2", 5, "o5", "comprender", "¿Qué recordaba la fiesta de la dedicación de Juan 10:22?", "La purificación del templo por los macabeos en el 164 antes de Cristo, después de que Antíoco IV lo profanara", ["La salida de Egipto", "La construcción del templo de Salomón", "La entrega de la ley"], "«Celebrábase en Jerusalén la fiesta de la dedicación».", "Juan 10:22-23"],
      ["5-r3", 5, "o5", "aplicar", "Un hermano pregunta por qué su vecino católico tiene en su Biblia los libros de los Macabeos. ¿Qué le explicas?", "Que están en las Biblias católicas pero no en las evangélicas, y que sirven como fuente histórica del tiempo entre los testamentos", ["Que son libros inventados por su vecino", "Que su Biblia está equivocada en todo", "Que no existen"], "«Celebrábase en Jerusalén la fiesta de la dedicación».", "Juan 10:22-23"],
    ] as P[]).map(p),
    "biblicos-avanzados-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué edicto se promulgó cuando nació Jesús, según Lucas 2:1?", "Que todo el mundo fuese empadronado, por orden de Augusto César", ["Que todos fueran a Egipto", "Que se cerraran los templos", "Que se pagara el diezmo"], "«se promulgó un edicto de parte de Augusto César, que todo el mundo fuese empadronado».", "Lucas 2:1"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué fecha Lucas el ministerio de Juan con tantos nombres de gobernantes?", "Para ubicar el evangelio en la historia real, con nombres y fechas que se pueden comprobar", ["Para llenar espacio", "Porque los gobernantes eran creyentes", "Porque no sabía otra cosa"], "«En el año decimoquinto del imperio de Tiberio César».", "Lucas 3:1"],
      ["6-r3", 6, "o6", "aplicar", "Un amigo dice que Jesús es un mito como los de los griegos. ¿Qué le muestras de Lucas?", "Que Lucas ubica su vida con gobernantes reales y comprobables, como Augusto, Tiberio y Pilato", ["Que tiene razón", "Que no importa si es un mito", "Que los mitos también salvan"], "«siendo gobernador de Judea Poncio Pilato».", "Lucas 3:1"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La tierra de la Biblia
    ["f01", 1, "o1", "recordar", "¿Qué tiene Jerusalén alrededor de ella, según Salmos 125:2?", "Montes", ["Ríos", "Un desierto", "El mar"], "«Como Jerusalén tiene montes alrededor de ella».", "Salmos 125:2"],
    ["f02", 1, "o1", "recordar", "¿Por qué camino pidió pasar Moisés por la tierra de Edom, según Números 20:17?", "Por el camino real", ["Por el camino del mar", "Por el camino de los filisteos", "Por un camino secreto"], "«por el camino real iremos».", "Números 20:17"],
    ["f03", 1, "o1", "comprender", "¿Cuáles son las cinco franjas de la tierra de Israel, de oeste a este?", "La llanura costera, la Sefela, la región montañosa central, el valle del Jordán y Transjordania", ["El Sinaí, Egipto, Edom, Moab y Babilonia", "Galilea, Roma, Grecia, Asia y España", "Solo montes y desierto"], "«es tierra de montes y de vegas».", "Deuteronomio 11:10-12"],
    ["f04", 1, "o1", "comprender", "¿Cuándo caen las lluvias en la tierra de Israel?", "De octubre a mayo, con la lluvia temprana al empezar y la tardía al final; el verano es seco", ["Todo el año por igual", "Solo en el verano", "Nunca"], "«yo daré la lluvia de vuestra tierra a su tiempo, la temprana y la tardía».", "Deuteronomio 11:14"],
    ["f05", 1, "o1", "comprender", "¿Qué tiene de especial el mar Muerto?", "Está a unos 440 metros bajo el nivel del mar, el punto más bajo de tierra firme, y sigue bajando", ["Es el mar más profundo del mundo", "Está sobre una montaña", "Es de agua dulce"], "«las que descendían al mar del Arabá, al Mar Salado».", "Josué 3:16"],
    ["f06", 1, "o1", "analizar", "¿Por qué la tierra de Israel era un lugar de paso para ejércitos y comerciantes?", "Porque era el puente entre Egipto y Mesopotamia, con la gran ruta de la costa y el camino real", ["Porque era muy rica en oro", "Porque estaba aislada", "No lo era"], "«por el camino real iremos».", "Números 20:17"],
    ["f07", 1, "o1", "aplicar", "Un hermano lee que Jesús subió a Jerusalén y no entiende por qué dice subir. ¿Qué le explicas?", "Que Jerusalén está en la región montañosa central, más alta que Galilea y que el valle del Jordán", ["Que Jerusalén estaba sobre una torre", "Que es un error de la Biblia", "Que subía en barco"], "«Como Jerusalén tiene montes alrededor de ella».", "Salmos 125:2"],
    ["f08", 1, "o1", "aplicar", "Tu clase va a estudiar la historia de David y Goliat. ¿Qué dato de geografía le das?", "Que fue en el valle de Ela, en la Sefela, las colinas entre la costa de los filisteos y los montes de Judá", ["Que fue junto al mar de Galilea", "Que fue en Egipto", "Ninguno"], "«y acamparon en el valle de Ela».", "1 Samuel 17:2"],
    ["f09", 1, "o1", "evaluar", "¿Qué manera de usar la geografía en una clase bíblica es la mejor?", "Ubicar el pasaje en un mapa, ver el tipo de región y preguntar qué añade al relato", ["Memorizar nombres sin relación con el texto", "Ignorar los lugares", "Inventar distancias"], "«tierra de montes y de vegas».", "Deuteronomio 11:10-12"],
    ["f10", 1, "o7", "recordar", "Completa Hechos 17:26: Y de una sangre ha hecho todo el linaje de los hombres, para que habiten sobre toda la faz de la tierra…", "y les ha prefijado el orden de los tiempos, y los límites de su habitación", ["pero cada uno escoge su tiempo y su lugar", "y les ha dado la tierra sin orden ni límite", "hasta que el hombre gobierne los tiempos"], "«Y de una sangre ha hecho todo el linaje de los hombres, para que habiten sobre toda la faz de la tierra; y les ha prefijado el orden de los tiempos, y los límites de su habitación».", "Hechos 17:26"],
    // Lección 2 · De los patriarcas al reino de David
    ["f11", 2, "o2", "recordar", "¿Cuántos años habitaron los hijos de Israel en Egipto, según Éxodo 12:40?", "Cuatrocientos treinta años", ["Cuarenta años", "Setenta años", "Mil años"], "«fue cuatrocientos treinta años».", "Éxodo 12:40-41"],
    ["f12", 2, "o2", "recordar", "¿En qué año del reino de Salomón comenzó a edificarse el templo, según 1 Reyes 6:1?", "En el cuarto año", ["En el primero", "En el décimo", "En el cuadragésimo"], "«el cuarto año del principio del reino de Salomón sobre Israel».", "1 Reyes 6:1"],
    ["f13", 2, "o2", "comprender", "¿Qué se calcula con 1 Reyes 6:1?", "La fecha temprana del éxodo, contando 480 años hacia atrás desde el cuarto año de Salomón", ["La fecha del diluvio", "La fecha de la caída de Babilonia", "La fecha del nacimiento de Jesús"], "«En el año cuatrocientos ochenta».", "1 Reyes 6:1"],
    ["f14", 2, "o2", "comprender", "¿En qué se apoya la fecha tardía del éxodo?", "En la ciudad de Ramesés que construyeron los israelitas y en algunos datos arqueológicos", ["En la carta a los Romanos", "En el templo de Salomón", "En nada"], "«y edificaron para Faraón las ciudades de almacenaje, Pitón y Ramesés».", "Éxodo 1:11"],
    ["f15", 2, "o2", "comprender", "¿Qué muestra la historia de los patriarcas al reino?", "Que Dios cumplió paso a paso su promesa a Abraham de una tierra y un pueblo", ["Que Dios olvidó sus promesas", "Que Israel siempre fue fiel", "Que la promesa era solo para Abraham"], "«a la tierra que te mostraré».", "Génesis 12:1"],
    ["f16", 2, "o2", "analizar", "¿Por qué no conviene enseñar la fecha del éxodo como si fuera indiscutible?", "Porque hay dos posturas con sus razones, y la honestidad enseña más que una precisión inventada", ["Porque el éxodo no importa", "Porque nadie cree en el éxodo", "Sí conviene"], "«El tiempo que los hijos de Israel habitaron en Egipto».", "Éxodo 12:40-41"],
    ["f17", 2, "o2", "aplicar", "Tienes que hacer una línea del tiempo de Abraham a Salomón para una clase. ¿Cómo la haces?", "Pones los grandes momentos, las fechas más firmes primero, marcas las que se discuten y añades un versículo clave a cada uno", ["Inventas fechas exactas para todo", "No pones fechas ni orden", "Solo pones nombres de reyes"], "«En el año cuatrocientos ochenta».", "1 Reyes 6:1"],
    ["f18", 2, "o2", "aplicar", "Una hermana siente que Dios tarda demasiado en cumplir una promesa. ¿Qué historia de Israel le compartes?", "La de la promesa a Abraham, que Dios cumplió a lo largo de siglos, aun después de la esclavitud en Egipto", ["Que Dios nunca cumple", "Que deje de orar", "Que olvide la promesa"], "«en el mismo día todas las huestes de Jehová salieron de la tierra de Egipto».", "Éxodo 12:40-41"],
    ["f19", 2, "o2", "aplicar", "Un nuevo creyente no sabe por dónde empezar a leer la historia del Antiguo Testamento. ¿Qué le sugieres?", "Seguir el orden de la historia: Génesis 12, el éxodo, la conquista, los jueces y el reino, con una línea del tiempo", ["Empezar por las leyes de Levítico", "Leer versículos sueltos", "No leer el Antiguo Testamento"], "«Vete de tu tierra».", "Génesis 12:1"],
    ["f20", 2, "o2", "evaluar", "¿Qué resumen de la historia de los patriarcas al reino es el mejor?", "Dios llamó a Abraham, sacó a su pueblo de Egipto, le dio la tierra y le dio un rey, cumpliendo su promesa paso a paso", ["Israel se hizo grande por su propia fuerza", "Fue una historia sin orden", "Todo pasó en un año"], "«a la tierra que te mostraré».", "Génesis 12:1"],
    // Lección 3 · El reino dividido y los imperios
    ["f21", 3, "o3", "recordar", "¿Qué hizo el rey de Asiria, según 2 Reyes 17:6?", "Tomó Samaria y llevó a Israel cautivo a Asiria", ["Reconstruyó Jerusalén", "Hizo un pacto con David", "Destruyó Babilonia"], "«el rey de Asiria tomó Samaria, y llevó a Israel cautivo a Asiria».", "2 Reyes 17:6"],
    ["f22", 3, "o3", "recordar", "¿Qué quemó el capitán de Nabucodonosor en Jerusalén, según 2 Reyes 25:9?", "La casa de Jehová, la casa del rey y todas las casas de Jerusalén", ["Solo el palacio", "Nada, solo la sitió", "Solo los muros"], "«Y quemó la casa de Jehová, y la casa del rey».", "2 Reyes 25:8-9"],
    ["f23", 3, "o3", "comprender", "¿Por qué se dividió el reino después de Salomón?", "Porque Roboam no quiso aliviar la carga del pueblo, y las tribus del norte se separaron", ["Porque Asiria lo ordenó", "Porque Salomón lo dejó escrito", "Por un terremoto"], "«Cuando todo el pueblo vio que el rey no les había oído».", "1 Reyes 12:16"],
    ["f24", 3, "o3", "comprender", "¿Por qué cayó el reino del norte, según la Biblia?", "Porque dejó a Dios y siguió a otros dioses", ["Porque tenía pocos soldados", "Por mala suerte", "Porque Judá lo atacó"], "«Porque los hijos de Israel pecaron contra Jehová su Dios».", "2 Reyes 17:7"],
    ["f25", 3, "o3", "comprender", "¿Qué pasó en el 701 antes de Cristo?", "Senaquerib, rey de Asiria, invadió Judá en tiempos de Ezequías, pero Jerusalén no cayó", ["Cayó Babilonia", "Nació Jesús", "Se dividió el reino"], "«subió Senaquerib rey de Asiria contra todas las ciudades fortificadas de Judá».", "2 Reyes 18:13"],
    ["f26", 3, "o3", "analizar", "¿Por qué ayuda conocer la historia de los dos reinos para entender a los profetas?", "Porque cada profeta habló a una situación concreta, ante Asiria o Babilonia, antes o después de una caída", ["No ayuda en nada", "Porque los profetas no hablaban de su tiempo", "Porque todos hablaron en el mismo año"], "«que profetizó acerca de Israel en días de Uzías rey de Judá».", "Amós 1:1"],
    ["f27", 3, "o3", "aplicar", "Un hermano piensa que Jeremías y Amós vivieron al mismo tiempo. ¿Cómo lo ayudas?", "Con la línea del tiempo: Amós habló en el norte antes de la caída de Samaria, y Jeremías en Judá antes de la caída de Jerusalén, más de un siglo después", ["Le dices que da igual", "Le das la razón", "Le dices que ninguno existió"], "«el rey de Asiria tomó Samaria».", "2 Reyes 17:6"],
    ["f28", 3, "o3", "aplicar", "Tu iglesia estudia la caída de Jerusalén. ¿Qué lección le aplicas?", "Que Dios advierte por medio de su Palabra antes de que lleguen las consecuencias, y llama a volver a él", ["Que Dios es cruel", "Que la historia no enseña nada", "Que hay que temer a Babilonia"], "«Y quemó la casa de Jehová».", "2 Reyes 25:8-9"],
    ["f29", 3, "o3", "aplicar", "Tienes que ubicar el libro de Isaías en la historia. ¿Qué haces?", "Lees Isaías 1:1, buscas a esos reyes de Judá en 2 Reyes y ves que habló en tiempos de Asiria", ["Dices que es del tiempo de los romanos", "Lo lees sin contexto", "Lo pones después del exilio sin razón"], "«en días de Uzías, Jotam, Acaz y Ezequías, reyes de Judá».", "Isaías 1:1"],
    ["f30", 3, "o3", "evaluar", "¿Qué lección de la historia de los dos reinos es la más importante para hoy?", "Que la infidelidad a Dios trae consecuencias, y que Dios envía su Palabra para llamar a volver a él", ["Que los imperios siempre ganan", "Que Dios abandona a su pueblo", "Que no hay nada que aprender"], "«Porque los hijos de Israel pecaron contra Jehová su Dios».", "2 Reyes 17:7"],
    // Lección 4 · El exilio, el regreso y los persas
    ["f31", 4, "o4", "recordar", "¿En qué año de su reinado despertó Dios el espíritu de Ciro, según Esdras 1:1?", "En el primer año de Ciro rey de Persia", ["En su último año", "En el año veinte", "Nunca"], "«En el primer año de Ciro rey de Persia».", "Esdras 1:1-2"],
    ["f32", 4, "o4", "recordar", "¿Qué pidió Nehemías al rey, según Nehemías 2:5?", "Que lo enviara a Judá para reedificar la ciudad", ["Más dinero para él", "Un ejército para atacar Persia", "Quedarse en el palacio"], "«envíame a Judá, a la ciudad de los sepulcros de mis padres, y la reedificaré».", "Nehemías 2:5"],
    ["f33", 4, "o4", "comprender", "¿En qué orden llegaron Zorobabel, Esdras y Nehemías?", "Primero Zorobabel, con el templo terminado hacia el 515; después Esdras, hacia el 458; y Nehemías, hacia el 445", ["Los tres llegaron el mismo día", "Primero Nehemías y al final Zorobabel", "Todos vivieron en tiempos de David"], "«En el primer año de Ciro rey de Persia».", "Esdras 1:1-2"],
    ["f34", 4, "o4", "comprender", "¿En qué se diferenciaba Persia de Babilonia en su trato a los pueblos vencidos?", "Persia permitía que muchos pueblos volvieran a sus tierras y restauraran sus templos", ["Persia destruía todos los templos", "No había diferencia", "Persia no tenía pueblos vencidos"], "«y me ha mandado que le edifique casa en Jerusalén».", "Esdras 1:1-2"],
    ["f35", 4, "o4", "comprender", "¿Por qué se detuvo la reconstrucción del templo y cómo se reanudó?", "Por la oposición de los vecinos, y se reanudó cuando Dios levantó a los profetas Hageo y Zacarías", ["Por falta de piedras, y se reanudó con dinero de Egipto", "Nunca se detuvo", "Porque Ciro lo prohibió para siempre"], "«Profetizaron Hageo y Zacarías hijo de Iddo, ambos profetas».", "Esdras 5:1"],
    ["f36", 4, "o4", "analizar", "¿Qué muestra que el regreso del exilio cumpliera la palabra de Jeremías?", "Que Dios gobierna la historia y cumple lo que promete, aun por medio de reyes que no lo conocen", ["Que fue casualidad", "Que Jeremías se equivocó", "Que Ciro era profeta"], "«para que se cumpliese la palabra de Jehová por boca de Jeremías».", "Esdras 1:1-2"],
    ["f37", 4, "o4", "aplicar", "Tienes que enseñar Esdras y Nehemías. ¿Cómo los ubicas en la historia?", "En el tiempo de los persas, después del exilio, con Ciro, el templo terminado hacia el 515, Esdras hacia el 458 y Nehemías hacia el 445", ["En el tiempo de los romanos", "Antes de David", "Durante el éxodo"], "«En el primer año de Ciro rey de Persia».", "Esdras 1:1-2"],
    ["f38", 4, "o4", "aplicar", "Un hermano quiere empezar un proyecto grande en la iglesia sin orar. ¿Qué ejemplo le das?", "El de Nehemías, que oró al Dios de los cielos antes de hablar con el rey", ["Ninguno", "Que la oración es una pérdida de tiempo", "Que empiece y ore después si falla"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
    ["f39", 4, "o4", "aplicar", "Tu iglesia se desanima porque el nuevo local es más pequeño que el anterior. ¿Qué historia del regreso le compartes?", "Que algunos ancianos lloraban porque el segundo templo era menor, pero Dios estaba con ellos: no hay que menospreciar los comienzos pequeños", ["Que es mejor no tener local", "Que el tamaño es lo único que importa", "Ninguna"], "«ancianos que habían visto la casa primera».", "Esdras 3:12"],
    ["f40", 4, "o4", "evaluar", "¿Qué lección del regreso del exilio es la más importante?", "Que Dios cumple su palabra y restaura a su pueblo cuando vuelve a él y a su Palabra", ["Que los reyes persas eran los salvadores", "Que el pueblo lo logró solo", "Que el exilio duró para siempre"], "«yo os visitaré, y despertaré sobre vosotros mi buena palabra».", "Jeremías 29:10"],
    // Lección 5 · Entre los dos testamentos
    ["f41", 5, "o5", "recordar", "¿Cuándo envió Dios a su Hijo, según Gálatas 4:4?", "Cuando vino el cumplimiento del tiempo", ["Antes de la creación", "Cuando el templo fue destruido", "Cuando terminó el imperio romano"], "«Pero cuando vino el cumplimiento del tiempo, Dios envió a su Hijo».", "Gálatas 4:4"],
    ["f42", 5, "o5", "recordar", "¿En qué estación se celebraba la fiesta de la dedicación, según Juan 10:22?", "En invierno", ["En verano", "En la primavera de la Pascua", "En el otoño, con los Tabernáculos"], "«Era invierno».", "Juan 10:22-23"],
    ["f43", 5, "o5", "comprender", "¿Qué fue la Septuaginta?", "La traducción al griego de la Biblia hebrea, que empezó en Alejandría en el siglo III antes de Cristo", ["Un ejército de setenta soldados", "Un libro de los Macabeos", "Una ciudad de Grecia"], "«Pero cuando vino el cumplimiento del tiempo».", "Gálatas 4:4"],
    ["f44", 5, "o5", "comprender", "¿Qué hizo Antíoco IV Epífanes en el 167 antes de Cristo?", "Profanó el templo de Jerusalén y persiguió a los judíos fieles", ["Reconstruyó el templo", "Tradujo la Biblia", "Liberó a los judíos de Roma"], "«Celebrábase en Jerusalén la fiesta de la dedicación».", "Juan 10:22-23"],
    ["f45", 5, "o5", "analizar", "¿Cómo preparó el tiempo entre los testamentos la venida de Cristo y la misión?", "Con una lengua común, caminos, paz, sinagogas y una Biblia en griego que leían los judíos en todo el imperio", ["No preparó nada", "Con la destrucción de todas las sinagogas", "Con la prohibición del griego"], "«Pero cuando vino el cumplimiento del tiempo».", "Gálatas 4:4"],
    ["f46", 5, "o5", "aplicar", "Tienes que explicar en una clase por qué aparecen fariseos y saduceos en los evangelios y no en Malaquías. ¿Qué dices?", "Que esos grupos aparecen o crecen en el tiempo entre los testamentos, después de Malaquías", ["Que Malaquías se olvidó de ellos", "Que eran romanos", "Que vinieron de Egipto con Moisés"], "«Porque los saduceos dicen que no hay resurrección, ni ángel, ni espíritu».", "Hechos 23:8"],
    ["f47", 5, "o5", "aplicar", "Un joven cree que Dios estuvo ausente en los cuatrocientos años entre Malaquías y Mateo. ¿Qué le muestras?", "Que en ese tiempo Dios preparaba el mundo para la venida de Cristo, como dice Gálatas 4:4", ["Que tiene razón", "Que esos años no existieron", "Que Dios se olvidó de Israel"], "«Dios envió a su Hijo, nacido de mujer y nacido bajo la ley».", "Gálatas 4:4"],
    ["f48", 5, "o5", "aplicar", "Tienes que hacer una línea del tiempo de Alejandro a Herodes. ¿Qué fechas pones?", "333, Issos; 323, la muerte de Alejandro; hacia el 200, los Seléucidas; 167, Antíoco; 164, la dedicación; 63, Pompeyo; 37 al 4, Herodes", ["Las fechas de los reyes de Israel", "Las fechas de los viajes de Pablo", "Ninguna fecha"], "«El macho cabrío es el rey de Grecia».", "Daniel 8:21-22"],
    ["f49", 5, "o5", "aplicar", "Una hermana nota que el Nuevo Testamento cita textos del Antiguo con palabras un poco distintas a las de su Biblia. ¿Qué le explicas?", "Que muchas veces los apóstoles citan la Septuaginta, la traducción griega que se usaba en su tiempo", ["Que los apóstoles se equivocaron", "Que su Biblia está mal", "Que eso no pasa nunca"], "«Pero cuando vino el cumplimiento del tiempo».", "Gálatas 4:4"],
    ["f50", 5, "o5", "evaluar", "¿Qué conclusión sobre el tiempo entre los testamentos es la más acertada?", "El silencio de los profetas no fue abandono: Dios preparaba el mundo para enviar a su Hijo", ["Dios no hizo nada en esos años", "Fue el tiempo más importante de la Biblia", "No sabemos nada de esos años"], "«Dios envió a su Hijo».", "Gálatas 4:4"],
    // Lección 6 · El mundo de Jesús y de Pablo
    ["f51", 6, "o6", "recordar", "¿Quién era gobernador de Judea en el año quince de Tiberio, según Lucas 3:1?", "Poncio Pilato", ["Herodes el Grande", "Félix", "Galión"], "«siendo gobernador de Judea Poncio Pilato».", "Lucas 3:1"],
    ["f52", 6, "o6", "recordar", "¿Qué ha hecho Dios con todo el linaje de los hombres, según Hechos 17:26?", "Lo hizo de una sangre, para que habite sobre toda la faz de la tierra", ["Lo dividió en pueblos superiores e inferiores", "Lo dejó sin tiempo ni lugar", "Lo hizo solo para Israel"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26"],
    ["f53", 6, "o6", "recordar", "¿Quién era tetrarca de Galilea cuando empezó el ministerio de Juan, según Lucas 3:1?", "Herodes", ["Felipe", "Pilato", "Caifás"], "«y Herodes tetrarca de Galilea».", "Lucas 3:1"],
    ["f54", 6, "o6", "comprender", "¿Por qué se dice que el ministerio de Jesús cabe entre el 26 y el 36 después de Cristo?", "Porque Pilato, que lo juzgó, gobernó Judea en esos años", ["Porque así lo dijo un ángel", "Porque Jesús vivió solo diez años", "No hay manera de saberlo"], "«siendo gobernador de Judea Poncio Pilato».", "Lucas 3:1"],
    ["f55", 6, "o6", "comprender", "¿Qué regiones formaban la tierra de Jesús?", "Galilea al norte, Samaria en el centro y Judea al sur, además de Perea y la Decápolis", ["Egipto, Siria y Grecia", "Solo Jerusalén", "Roma y Atenas"], "«Y le era necesario pasar por Samaria».", "Juan 4:4"],
    ["f56", 6, "o6", "analizar", "¿Qué muestra Hechos 17:26 sobre la historia y la geografía de los pueblos?", "Que Dios fijó los tiempos y los lugares de los pueblos, y que todos venimos de una misma sangre", ["Que todo es casualidad", "Que cada pueblo decide su historia sin Dios", "Que solo Israel le importa a Dios"], "«y les ha prefijado el orden de los tiempos, y los límites de su habitación».", "Hechos 17:26"],
    ["f57", 6, "o6", "aplicar", "Tienes que ubicar el ministerio de Jesús en la historia para una clase. ¿Qué haces?", "Lees Lucas 3:1-2, anotas los gobernantes y sus fechas, y muestras que el año 15 de Tiberio cae hacia el 28 o el 29", ["Das una fecha exacta sin explicar", "Dices que no se puede saber nada", "Usas solo el calendario de hoy"], "«En el año decimoquinto del imperio de Tiberio César».", "Lucas 3:1"],
    ["f58", 6, "o6", "aplicar", "Un hermano inmigrante se pregunta por qué Dios permitió que viviera lejos de su país. ¿Qué texto le compartes?", "Hechos 17:26-27: Dios fija los tiempos y los lugares de los pueblos para que lo busquen", ["Que es mala suerte", "Que Dios no sabe dónde está", "Que vuelva a su país"], "«para que busquen a Dios».", "Hechos 17:27"],
    ["f59", 6, "o6", "aplicar", "Tu clase estudia por qué Pablo pudo viajar tanto. ¿Qué le explicas?", "Que el imperio romano tenía caminos, paz y una lengua común, el griego, y sinagogas en muchas ciudades", ["Que Pablo tenía un barco propio", "Que no había fronteras ni peligros", "Que viajaba sin parar nunca"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26"],
    ["f60", 6, "o6", "evaluar", "¿Qué enseñanza deja el mundo romano de Jesús y de Pablo a la iglesia de hoy?", "Que Dios preparó el mundo para el evangelio y obra en la historia real, también en nuestro tiempo", ["Que los imperios siempre son buenos", "Que la historia no importa", "Que hay que esperar otro imperio para evangelizar"], "«para que busquen a Dios».", "Hechos 17:27"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De dónde bebe la tierra prometida, según Deuteronomio 11:11?", "De las aguas de la lluvia del cielo", ["Del río Nilo", "De pozos del desierto", "Del mar"], "«que bebe las aguas de la lluvia del cielo».", "Deuteronomio 11:10-12"],
      ["m1-02", 1, "o1", "comprender", "¿Qué enseñaba a los peregrinos ver los montes alrededor de Jerusalén?", "Que así como los montes rodean la ciudad, Jehová rodea y protege a su pueblo", ["Que la ciudad era difícil de visitar", "Que había que adorar los montes", "Nada"], "«Así Jehová está alrededor de su pueblo».", "Salmos 125:2"],
      ["m1-03", 1, "o1", "aplicar", "Una hermana pregunta por qué en la Biblia una sequía es a veces un llamado a volver a Dios. ¿Qué le explicas?", "Que la tierra dependía de la lluvia que Dios daba, y la sequía recordaba al pueblo su dependencia de él", ["Que Dios odia la lluvia", "Que la sequía nunca tiene que ver con Dios", "Que el pueblo vivía junto a un río"], "«que no habrá lluvia ni rocío en estos años».", "1 Reyes 17:1"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué dice Moisés que la tierra prometida no es como Egipto?", "Porque Egipto se regaba con el río y el trabajo humano, y la tierra prometida dependía de la lluvia que Dios cuida", ["Porque Egipto era más pequeño", "Porque en la tierra prometida no llovía", "No lo dice"], "«no es como la tierra de Egipto de donde habéis salido».", "Deuteronomio 11:10-12"],
      ["m1-05", 1, "o1", "recordar", "¿Qué dice Deuteronomio 8:9 de las piedras y los montes de la tierra?", "Que sus piedras son hierro y de sus montes se saca cobre", ["Que sus montes son de oro", "Que sus piedras son preciosas", "Que no tiene montes"], "«tierra cuyas piedras son hierro, y de cuyos montes sacarás cobre».", "Deuteronomio 8:7-9"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué descripción de la tierra de Israel es la más acertada?", "Una franja pequeña entre el mar y el desierto, buena pero dependiente de la lluvia, en el paso entre grandes imperios", ["Un gran imperio con muchos ríos", "Un desierto sin vida", "Una isla aislada"], "«Porque Jehová tu Dios te introduce en la buena tierra».", "Deuteronomio 8:7-9"],
      ["m1-07", 2, "o2", "recordar", "¿De qué ciudad salió la familia de Abram, según Génesis 11:31?", "De Ur de los caldeos", ["De Babilonia", "De Jerusalén", "De Egipto"], "«y salió con ellos de Ur de los caldeos».", "Génesis 11:31"],
      ["m1-08", 2, "o2", "comprender", "¿Qué une 1 Reyes 6:1 con la historia del éxodo?", "Dice cuántos años pasaron desde la salida de Egipto hasta el comienzo del templo", ["Cuenta el diluvio", "Habla de la muerte de Salomón", "Nada"], "«En el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto».", "1 Reyes 6:1"],
      ["m1-09", 2, "o2", "aplicar", "En tu clase alguien dice que, si no se sabe la fecha exacta del éxodo, no ocurrió. ¿Qué le respondes?", "Que no saber el año exacto no prueba que no ocurrió: se discute cuándo, no si ocurrió", ["Que tiene razón", "Que nadie puede saber nada", "Que la Biblia inventa"], "«todas las huestes de Jehová salieron de la tierra de Egipto».", "Éxodo 12:40-41"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué algunos leen los 480 años de 1 Reyes 6:1 como doce generaciones?", "Porque doce por cuarenta da cuatrocientos ochenta, y cuarenta años era una manera de contar una generación", ["Porque no saben contar", "Porque la Biblia no da números", "No hay ninguna razón"], "«En el año cuatrocientos ochenta».", "1 Reyes 6:1"],
      ["m1-11", 2, "o2", "recordar", "¿Qué ciudades edificaron los israelitas para Faraón, según Éxodo 1:11?", "Pitón y Ramesés", ["Ur y Harán", "Jericó y Hai", "Babilonia y Nínive"], "«las ciudades de almacenaje, Pitón y Ramesés».", "Éxodo 1:11"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué manera de enseñar las fechas antes del reino de David es la mejor?", "Dar fechas aproximadas, explicar las que se discuten y mostrar el hilo de la promesa de Dios", ["Dar fechas exactas inventadas", "No dar ninguna fecha", "Decir que la historia no importa"], "«Vete de tu tierra y de tu parentela».", "Génesis 12:1"],
      ["m1-13", 3, "o3", "recordar", "¿Dónde puso el rey de Asiria a los israelitas cautivos, según 2 Reyes 17:6?", "En Halah, en Habor junto al río Gozán, y en las ciudades de los medos", ["En Egipto", "En Jerusalén", "En Roma"], "«y los puso en Halah, en Habor junto al río Gozán, y en las ciudades de los medos».", "2 Reyes 17:6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué imperio destruyó el reino del norte y cuál destruyó Jerusalén?", "Asiria destruyó el reino del norte, y Babilonia destruyó Jerusalén", ["Roma y Grecia", "Egipto y Persia", "Babilonia y Roma"], "«siervo del rey de Babilonia».", "2 Reyes 25:8-9"],
      ["m1-15", 3, "o3", "aplicar", "Un joven pregunta qué profeta leer para entender la caída de Jerusalén. ¿Cuál le recomiendas?", "Jeremías, que habló en Judá antes y durante la caída de Jerusalén", ["Amós, que habló en el norte un siglo antes", "Malaquías, después del exilio", "Ninguno"], "«Cuando en Babilonia se cumplan los setenta años».", "Jeremías 29:10"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué cuenta la Biblia la historia de los reyes desde la fidelidad a Dios?", "Porque quiere mostrar que la suerte del pueblo dependía de su fidelidad al pacto", ["Porque no le interesaba la historia", "Porque solo cuenta guerras", "Por casualidad"], "«Porque los hijos de Israel pecaron contra Jehová su Dios».", "2 Reyes 17:7"],
      ["m1-17", 3, "o3", "recordar", "¿En qué año de Nabucodonosor llegó Nabuzaradán a Jerusalén, según 2 Reyes 25:8?", "En el año diecinueve", ["En el primero", "En el cuarenta", "En el setenta"], "«siendo el año diecinueve de Nabucodonosor rey de Babilonia».", "2 Reyes 25:8-9"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué herramienta ayuda más a enseñar los libros de los profetas?", "Una línea del tiempo de los dos reinos y de los imperios, junto con 1 y 2 Reyes", ["Un diccionario de palabras sueltas", "Un mapa del mundo de hoy", "Ninguna"], "«¿Qué parte tenemos nosotros con David?».", "1 Reyes 12:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué oficio tenía Nehemías en el palacio, según Nehemías 1:11?", "Era copero del rey", ["Era sacerdote del templo", "Era soldado de Babilonia", "Era rey de Judá"], "«Porque yo servía de copero al rey».", "Nehemías 1:11"],
      ["m2-02", 4, "o4", "comprender", "¿Qué quería decir Jeremías con que Dios despertaría su buena palabra sobre el pueblo?", "Que Dios cumpliría su promesa de hacerlos volver a su tierra", ["Que los dejaría en Babilonia", "Que no tenía nada bueno que decir", "Que volverían a Egipto"], "«y despertaré sobre vosotros mi buena palabra, para haceros volver a este lugar».", "Jeremías 29:10"],
      ["m2-03", 4, "o4", "aplicar", "En tu iglesia hay oposición a un proyecto bueno y el equipo quiere abandonarlo. ¿Qué le enseña Esdras 5:1?", "Que Dios levanta voces para animar la obra, como Hageo y Zacarías, y que hay que seguir con fe", ["Que abandone el proyecto", "Que pelee con los que se oponen", "Que espere a que todos estén de acuerdo"], "«Profetizaron Hageo y Zacarías».", "Esdras 5:1"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué ve la Biblia la mano de Dios en la política de Ciro?", "Porque Dios gobierna aun a los reyes que no lo conocen para cumplir sus promesas", ["Porque Ciro era profeta", "Porque la Biblia exagera", "Porque Ciro adoraba solo a Jehová"], "«despertó Jehová el espíritu de Ciro».", "Esdras 1:1-2"],
      ["m2-05", 4, "o4", "recordar", "¿En cuántos días se terminó el muro de Jerusalén, según Nehemías 6:15?", "En cincuenta y dos días", ["En siete días", "En un año", "En cuarenta años"], "«Fue terminado, pues, el muro, el veinticinco del mes de Elul, en cincuenta y dos días».", "Nehemías 6:15"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué manera de reconstruir lo que se cayó se parece más a la de Esdras y Nehemías?", "Orar, empezar por lo primero, repartir el trabajo, resistir la oposición y volver a la Palabra", ["Esperar a tener todo para empezar", "Hacerlo uno solo", "Olvidarse de Dios en el camino"], "«y la reedificaré».", "Nehemías 2:5"],
      ["m2-07", 5, "o5", "recordar", "¿Qué significa el cuerno grande del macho cabrío, según Daniel 8:21?", "El rey primero de Grecia", ["El último rey de Persia", "El rey de Egipto", "El Mesías"], "«el cuerno grande que tenía entre sus ojos es el rey primero».", "Daniel 8:21-22"],
      ["m2-08", 5, "o5", "comprender", "¿Qué significan los cuatro cuernos que se levantaron, según Daniel 8:22?", "Que cuatro reinos saldrían de esa nación, aunque sin la fuerza del primero", ["Que vendrían cuatro profetas", "Que Grecia se haría más fuerte", "Nada"], "«significa que cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él».", "Daniel 8:21-22"],
      ["m2-09", 5, "o5", "aplicar", "Tu grupo pregunta qué es Janucá, la fiesta que celebran sus vecinos judíos. ¿Qué le dices?", "Que es la fiesta de la dedicación, que recuerda la purificación del templo en el 164 antes de Cristo, y que Jesús estuvo en el templo en esa fiesta", ["Que es una fiesta de Egipto", "Que no tiene que ver con la Biblia", "Que es la Pascua"], "«Celebrábase en Jerusalén la fiesta de la dedicación».", "Juan 10:22-23"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué fue tan importante la Septuaginta para los primeros cristianos?", "Porque les dio las Escrituras en la lengua común del imperio, y así podían anunciar a Cristo a judíos y gentiles", ["Porque reemplazó al Nuevo Testamento", "Porque estaba en latín", "No fue importante"], "«Dios envió a su Hijo».", "Gálatas 4:4"],
      ["m2-11", 5, "o5", "recordar", "¿Qué general romano tomó Jerusalén en el 63 antes de Cristo?", "Pompeyo", ["Julio César", "Tito", "Alejandro"], "«se promulgó un edicto de parte de Augusto César».", "Lucas 2:1"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué explica mejor por qué el evangelio se extendió tan rápido en el siglo primero?", "La preparación de Dios: el griego común, los caminos, la paz del imperio, las sinagogas y la Septuaginta", ["La fuerza militar de los cristianos", "La riqueza de la iglesia", "Que nadie se opuso"], "«Pero cuando vino el cumplimiento del tiempo».", "Gálatas 4:4"],
      ["m2-13", 6, "o6", "recordar", "¿De parte de quién se promulgó el edicto del empadronamiento, según Lucas 2:1?", "De Augusto César", ["De Tiberio", "De Herodes", "De Pilato"], "«de parte de Augusto César».", "Lucas 2:1"],
      ["m2-14", 6, "o6", "comprender", "¿Qué era la Decápolis?", "Un grupo de ciudades griegas al este del Jordán", ["Los diez mandamientos", "Una ciudad de Galilea", "Un monte"], "«y comenzó a publicar en Decápolis».", "Marcos 5:20"],
      ["m2-15", 6, "o6", "aplicar", "Una joven pregunta por qué el Nuevo Testamento se escribió en griego y no en hebreo. ¿Qué le respondes?", "Que el griego común era la lengua que unía a todo el oriente del imperio, y así el mensaje llegaba a judíos y gentiles", ["Que los apóstoles no sabían hebreo", "Que el hebreo estaba prohibido", "Que no se sabe"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué presenta Lucas a Jesús con gobernantes y fechas reales?", "Porque la fe cristiana descansa en hechos que ocurrieron en un lugar y un tiempo, no en mitos", ["Porque quería impresionar", "Porque no le importaba Jesús", "Por casualidad"], "«En el año decimoquinto del imperio de Tiberio César».", "Lucas 3:1"],
      ["m2-17", 6, "o6", "recordar", "¿Quién destruyó el templo de Jerusalén en el año 70?", "Tito, el general romano", ["Nabucodonosor", "Antíoco IV", "Pompeyo"], "«días vendrán en que no quedará piedra sobre piedra, que no sea destruida».", "Lucas 21:6"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué manera de dar las fechas del tiempo de Jesús es la mejor?", "Dar márgenes honestos, como hacia el 28 o el 29, o del 26 al 36, en vez de inventar un año exacto", ["Dar un día exacto para todo", "No dar ninguna fecha", "Repetir fechas de memoria sin comprobarlas"], "«siendo gobernador de Judea Poncio Pilato».", "Lucas 3:1"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "biblicos-avanzados-4-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo es la tierra de Israel y por qué enseñaba a depender de Dios.",
      ideas: [
        { id: "regiones", peso: 30, texto: "Sus regiones: la costa, la Sefela, los montes, el valle del Jordán y Transjordania.", formas: ["costa", "costera", "sefela", "montes", "valle del jordan", "transjordania", "mar muerto"] },
        { id: "lluvia", peso: 30, texto: "Dependía de la lluvia del cielo, no de un río como Egipto.", formas: ["lluvia", "llueve", "como egipto", "rio nilo", "regar", "regaba"] },
        { id: "dios", peso: 30, texto: "Dios la cuida, y el pueblo aprendía a confiar en él.", formas: ["dios la cuida", "la cuidaba", "jehova tu dios cuida", "depender de dios", "confiar en dios", "dependencia"] },
      ],
      citas: ["Deuteronomio 11:10-12", "Deuteronomio 11:11", "Deuteronomio 11:12", "Deuteronomio 11:11-12", "Deuteronomio 8:7-9", "Deuteronomio 11:14", "Salmos 125:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La tierra de Israel es una franja pequeña con costa, las colinas de la Sefela, montes, el valle del Jordán y Transjordania. No se regaba con un río como Egipto, sino que bebía de la lluvia del cielo, y Dios la cuidaba (Deuteronomio 11:11-12). Así el pueblo aprendía a depender de Dios.",
    },
    {
      id: "biblicos-avanzados-4-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, las dos fechas que se proponen para el éxodo.",
      ideas: [
        { id: "temprana", peso: 30, texto: "La fecha temprana, hacia el 1446, por los 480 años de 1 Reyes 6:1.", formas: ["1446", "temprana", "480", "cuatrocientos ochenta", "reyes 6 1"] },
        { id: "tardia", peso: 30, texto: "La fecha tardía, hacia el 1270 al 1250, en tiempos de Ramsés II.", formas: ["1270", "1250", "tardia", "ramses", "rameses"] },
        { id: "fe", peso: 30, negativa: true, texto: "Las dos creen que ocurrió; se discute cuándo.", formas: ["las dos", "ambas", "ocurrio", "se discute", "no depende"] },
      ],
      citas: ["1 Reyes 6:1", "Éxodo 12:40-41", "Éxodo 1:11", "Éxodo 12:41"],
      pesoCita: 10,
      errores: [
        { id: "e2-nunca", anula: "fe", texto: "Negar que el éxodo ocurrió.", formas: ["nunca ocurrio", "no ocurrio", "es un cuento", "se invento"] },
      ],
      modelo:
        "La fecha temprana pone el éxodo hacia el 1446 antes de Cristo, sumando los 480 años de 1 Reyes 6:1 al cuarto año de Salomón. La tardía lo pone hacia el 1270 al 1250, en tiempos de Ramsés II, por la ciudad de Ramesés. Las dos creen que ocurrió; se discute cuándo.",
    },
    {
      id: "biblicos-avanzados-4-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo terminó el exilio en Babilonia.",
      ideas: [
        { id: "promesa", peso: 30, texto: "Dios lo había prometido por Jeremías: setenta años.", formas: ["setenta anos", "jeremias", "lo prometio", "promesa", "su palabra"] },
        { id: "ciro", peso: 30, texto: "Ciro, rey de Persia, tomó Babilonia y permitió volver.", formas: ["ciro", "persia", "persas", "539", "538"] },
        { id: "reconstruir", peso: 30, texto: "Volvieron y reconstruyeron el templo y los muros.", formas: ["templo", "muros", "reconstru*", "reedific*", "zorobabel", "nehemias", "esdras"] },
      ],
      citas: ["Esdras 1:1-2", "Esdras 1:1", "Jeremías 29:10", "Nehemías 2:5", "Esdras 6:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios había prometido por Jeremías que, cumplidos setenta años, haría volver a su pueblo (Jeremías 29:10). Ciro, rey de Persia, tomó Babilonia en el 539 y en su primer año permitió el regreso. Con Zorobabel reconstruyeron el templo, y después Nehemías levantó los muros.",
    },
    {
      id: "biblicos-avanzados-4-e4",
      tipo: "breve",
      pregunta:
        "En tu clase leen el libro de Amós y nadie sabe en qué momento de la historia habló. Explica cómo lo ubicarías y por qué importa, con citas bíblicas.",
      ideas: [
        { id: "primer", peso: 25, texto: "Leer el primer versículo, que dice en qué reyes habló.", formas: ["primer versiculo", "amos 1 1", "en dias de", "uzias", "jeroboam"] },
        { id: "reyes", peso: 25, texto: "Buscar esos reyes en 1 y 2 Reyes y en la línea del tiempo.", formas: ["1 y 2 reyes", "2 reyes", "linea del tiempo", "linea de tiempo"] },
        { id: "norte", peso: 25, texto: "El reino del norte, antes de la caída de Samaria en el 722, con Asiria.", formas: ["reino del norte", "samaria", "722", "asiria"] },
        { id: "mensaje", peso: 25, texto: "Su mensaje contra la injusticia, leído en su situación y aplicado hoy.", formas: ["injusticia", "la justicia", "su situacion", "su tiempo", "aplicar*", "aplicarlo"] },
      ],
      basta: 85,
      citas: ["Amós 1:1", "2 Reyes 17:6", "2 Reyes 17:7", "1 Reyes 12:16", "Amós 5:24", "2 Reyes 14:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero leería con la clase el primer versículo, que dice que Amós profetizó en días de Uzías, rey de Judá, y de Jeroboam, rey de Israel (Amós 1:1). Después buscaríamos a esos reyes en 1 y 2 Reyes y los ubicaríamos en la línea del tiempo. Así veríamos que Amós habló en el reino del norte, unas décadas antes de que Asiria tomara Samaria en el 722 (2 Reyes 17:6). Era un tiempo de riqueza para unos pocos y de injusticia para los pobres, y por eso su mensaje es tan fuerte. Importa porque leer al profeta en su situación nos ayuda a entender lo que Dios pedía entonces, que corra el juicio como las aguas, y a aplicarlo con fidelidad a la iglesia de hoy (Amós 5:24).",
    },
    {
      id: "biblicos-avanzados-4-e5",
      tipo: "breve",
      pregunta:
        "Un joven de tu iglesia cree que Dios se olvidó de su pueblo en los cuatrocientos años entre Malaquías y Mateo. Explica qué le enseñarías de ese tiempo, con citas bíblicas.",
      ideas: [
        { id: "griegos", peso: 25, texto: "Alejandro y los griegos, y el reino dividido en cuatro.", formas: ["alejandro", "griegos", "grecia", "ptolomeos", "seleucidas", "cuatro reinos"] },
        { id: "macabeos", peso: 25, texto: "Antíoco, los macabeos y la fiesta de la dedicación.", formas: ["antioco", "macabeos", "dedicacion", "januca", "profano"] },
        { id: "preparacion", peso: 25, texto: "La Septuaginta, las sinagogas y el griego común.", formas: ["septuaginta", "sinagogas", "griego comun", "caminos", "lengua comun"] },
        { id: "cumplimiento", peso: 25, negativa: true, texto: "Dios no abandonó a su pueblo: preparaba el cumplimiento del tiempo.", formas: ["cumplimiento del tiempo", "preparaba", "preparando", "no abandono", "no se olvido"] },
      ],
      basta: 85,
      citas: ["Gálatas 4:4", "Daniel 8:21-22", "Juan 10:22-23", "Juan 10:22", "Malaquías 3:1", "Mateo 11:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le explicaría que en esos años no hubo nuevos libros proféticos en nuestra Biblia, pero Dios siguió obrando. Alejandro Magno conquistó el oriente, y su reino se dividió en cuatro, como había visto Daniel (Daniel 8:21-22). Judea quedó bajo los Ptolomeos y después bajo los Seléucidas, y Antíoco IV profanó el templo; los macabeos lo purificaron, y de allí viene la fiesta de la dedicación que Jesús celebró en el templo (Juan 10:22-23). En ese tiempo se tradujo la Biblia al griego, la Septuaginta, y se multiplicaron las sinagogas, mientras el griego común unía a los pueblos. Así llegó el cumplimiento del tiempo, cuando Dios envió a su Hijo (Gálatas 4:4). Dios no se olvidó de su pueblo: estaba preparando la venida de Cristo.",
    },
  ],
  breve: {
    id: "biblicos-avanzados-4-b1",
    tipo: "breve",
    pregunta: "Escribe cómo enseñarías la geografía y la historia de la Biblia en tu iglesia durante el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "tierra", peso: 15, texto: "La tierra y sus regiones.", formas: ["regiones", "un mapa", "la tierra", "mar muerto", "lluvia", "sefela"] },
      { id: "promesa", peso: 15, texto: "De los patriarcas al reino.", formas: ["abraham", "el exodo", "patriarcas", "david", "salomon"] },
      { id: "reinos", peso: 20, texto: "Los dos reinos, Asiria y Babilonia, y los profetas en su tiempo.", formas: ["dos reinos", "asiria", "babilonia", "profetas", "samaria"] },
      { id: "regreso", peso: 15, texto: "El exilio y el regreso con los persas.", formas: ["exilio", "ciro", "persas", "nehemias", "esdras", "regreso"] },
      { id: "entre", peso: 15, texto: "El tiempo entre los testamentos.", formas: ["entre los testamentos", "alejandro", "macabeos", "septuaginta", "dedicacion"] },
      { id: "romano", peso: 20, texto: "El mundo romano de Jesús y de Pablo.", formas: ["romano", "roma", "augusto", "tiberio", "pilato", "caminos"] },
    ],
    basta: 85,
    citas: ["Deuteronomio 8:7-9", "Deuteronomio 11:10-12", "Deuteronomio 11:11-12", "Salmos 125:2", "Génesis 12:1", "Éxodo 12:40-41", "1 Reyes 6:1", "1 Reyes 12:16", "2 Reyes 17:6", "2 Reyes 25:8-9", "Jeremías 29:10", "Esdras 1:1-2", "Esdras 1:1", "Nehemías 2:5", "Daniel 8:21-22", "Juan 10:22-23", "Gálatas 4:4", "Lucas 2:1", "Lucas 3:1", "Hechos 17:26"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año enseñaría la geografía y la historia de la Biblia con un mapa y una línea del tiempo en cada clase. Empezaría por la tierra y sus regiones, que bebe de la lluvia del cielo y enseña a depender de Dios (Deuteronomio 11:11-12). Seguiría con Abraham, el éxodo y el reino de David y Salomón, mostrando cómo Dios cumplió su promesa (Génesis 12:1). Estudiaríamos los dos reinos, la caída de Samaria ante Asiria y la de Jerusalén ante Babilonia, y ubicaríamos a cada profeta en su tiempo (2 Reyes 17:6). Después veríamos el exilio y el regreso con Ciro y los persas (Esdras 1:1), y el tiempo entre los testamentos, con Alejandro, los macabeos y la Septuaginta. Y terminaríamos en el mundo romano de Jesús y de Pablo, con Augusto, Tiberio y Pilato (Lucas 3:1), recordando que Dios fijó el orden de los tiempos (Hechos 17:26).",
  },
};
