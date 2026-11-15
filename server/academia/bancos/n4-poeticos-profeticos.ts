/**
 * El banco de «Libros poéticos y proféticos» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la poesía y la sabiduría · o2 Job y Eclesiastés · o3 los Salmos · o4 Proverbios y Cantares ·
 * o5 los profetas · o6 el Mesías anunciado · o7 el versículo de memoria (Miqueas 6:8).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-poeticos-profeticos-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_POETICOS_PROFETICOS: BancoMateria = {
  materia: "n4-poeticos-profeticos",
  repaso: {
    "n4-poeticos-profeticos-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cuál es el principio de la sabiduría, según Proverbios 1:7?", "El temor de Jehová", ["La riqueza", "La experiencia", "Los estudios"], "«El principio de la sabiduría es el temor de Jehová».", "Proverbios 1:7"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es el paralelismo en la poesía hebrea?", "Que la segunda línea repite, contrasta o completa la idea de la primera", ["Que las líneas riman en el sonido", "Que todas las líneas tienen el mismo número de letras", "Que se lee de atrás para adelante"], "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.", "Salmos 19:1"],
      ["1-r3", 1, "o1", "recordar", "¿Cuáles son los libros poéticos?", "Job, Salmos, Proverbios, Eclesiastés y Cantares", ["Génesis, Éxodo, Levítico, Números y Deuteronomio", "Isaías, Jeremías, Ezequiel y Daniel", "Mateo, Marcos, Lucas y Juan"], "Proverbios enseña que el principio de la sabiduría es el temor de Jehová.", "Proverbios 1:7"],
    ] as P[]).map(p),
    "n4-poeticos-profeticos-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué dijo Job después de perderlo todo?", "Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito", ["Dios es injusto conmigo", "Dios me ha olvidado", "Voy a vengarme"], "«Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito».", "Job 1:21"],
      ["2-r2", 2, "o2", "comprender", "¿En qué se equivocaron los amigos de Job?", "En pensar que todo sufrimiento es castigo por un pecado", ["En visitarlo", "En llorar con él", "En sentarse en silencio"], "Dios les dijo que no habían hablado de él lo recto.", "Job 42:7"],
      ["2-r3", 2, "o2", "comprender", "¿Qué significa la palabra hebrea que se traduce vanidad en Eclesiastés?", "Vapor o soplo: algo que pasa y no se puede atrapar", ["Orgullo", "Belleza", "Un pecado grave"], "«Vanidad de vanidades, todo es vanidad».", "Eclesiastés 1:2"],
    ] as P[]).map(p),
    "n4-poeticos-profeticos-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cuántos salmos tiene el libro de Salmos?", "Ciento cincuenta", ["Cuarenta", "Setenta", "Doce"], "Así termina el último: «Todo lo que respira alabe a JAH. Aleluya».", "Salmos 150:6"],
      ["3-r2", 3, "o3", "comprender", "¿Qué enseñan los salmos de lamento?", "A llevar a Dios el dolor con honestidad y terminar confiando", ["A esconder lo que sentimos", "A quejarnos sin esperanza", "A no orar cuando estamos tristes"], "«Mas yo en tu misericordia he confiado».", "Salmos 13:5"],
      ["3-r3", 3, "o3", "recordar", "¿Qué salmo oró Jesús en la cruz?", "El Salmo 22: Dios mío, Dios mío, ¿por qué me has desamparado?", ["El Salmo 1", "El Salmo 150", "El Salmo 119"], "«Dios mío, Dios mío, ¿por qué me has desamparado?».", "Salmos 22:1"],
    ] as P[]).map(p),
    "n4-poeticos-profeticos-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pide Proverbios 3:5?", "Fiarse de Jehová de todo corazón y no apoyarse en la propia prudencia", ["Confiar solo en la propia inteligencia", "Fiarse de los ricos", "No pensar"], "«Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia».", "Proverbios 3:5"],
      ["4-r2", 4, "o4", "comprender", "¿Cómo se leen los proverbios?", "Como principios generales de la vida, no como promesas automáticas", ["Como leyes que se cumplen siempre igual", "Como profecías del futuro", "Como historias de reyes"], "Instruye al niño en su camino: así suele ocurrir con una buena crianza.", "Proverbios 22:6"],
      ["4-r3", 4, "o4", "comprender", "¿Cuál es el primer sentido del Cantar de los Cantares?", "El amor entre esposo y esposa, como un regalo de Dios", ["Una historia de guerra", "Una lista de leyes", "Una profecía del fin"], "«Porque fuerte es como la muerte el amor».", "Cantares 8:6"],
    ] as P[]).map(p),
    "n4-poeticos-profeticos-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué hace Jehová antes de actuar, según Amós 3:7?", "Revela su secreto a sus siervos los profetas", ["Consulta a los reyes", "Espera a los sacerdotes", "Nada: actúa en secreto"], "«Porque no hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas».", "Amós 3:7"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué se llaman mayores o menores los profetas?", "Por el tamaño de sus libros, no por su importancia", ["Por su edad", "Por su importancia", "Por el número de sus milagros"], "Dios revela su secreto a sus siervos los profetas.", "Amós 3:7"],
      ["5-r3", 5, "o5", "recordar", "¿Qué pide Jehová, según Miqueas 6:8?", "Hacer justicia, amar misericordia y humillarse ante Dios", ["Muchos sacrificios", "Riquezas para el templo", "Fiestas solemnes"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    ] as P[]).map(p),
    "n4-poeticos-profeticos-6": ([
      ["6-r1", 6, "o6", "recordar", "¿En qué ciudad debía nacer el Mesías, según Miqueas 5:2?", "En Belén", ["En Jerusalén", "En Nazaret", "En Roma"], "«Pero tú, Belén Efrata, pequeña para estar entre las familias de Judá, de ti me saldrá el que será Señor en Israel».", "Miqueas 5:2"],
      ["6-r2", 6, "o6", "comprender", "¿Por quién sufre el siervo de Isaías 53?", "Por los pecados de otros: fue herido por nuestras rebeliones", ["Por sus propios pecados", "Por accidente", "Por la culpa de sus padres"], "«Mas él herido fue por nuestras rebeliones, molido por nuestros pecados».", "Isaías 53:5"],
      ["6-r3", 6, "o6", "recordar", "¿Quién le explicó Isaías 53 al funcionario etíope?", "Felipe", ["Pedro", "Pablo", "Juan"], "«comenzando desde esta escritura, le anunció el evangelio de Jesús».", "Hechos 8:35"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: la poesía y la sabiduría (10)
    ["f01", 1, "o1", "recordar", "¿Qué libros se llaman también libros de sabiduría?", "Job, Proverbios y Eclesiastés", ["Salmos, Cantares y Lamentaciones", "Isaías, Jeremías y Daniel", "Génesis, Rut y Ester"], "El principio de la sabiduría es el temor de Jehová.", "Proverbios 1:7"],
    ["f02", 1, "o1", "comprender", "¿Qué es el temor de Jehová?", "Una reverencia que se acerca a Dios con respeto y obediencia", ["Un miedo que aleja de Dios", "Una superstición", "Un sentimiento de culpa sin perdón"], "«El principio de la sabiduría es el temor de Jehová».", "Proverbios 1:7"],
    ["f03", 1, "o1", "analizar", "En Proverbios 15:1, ¿qué tipo de paralelismo hay?", "Un contraste: la blanda respuesta frente a la palabra áspera", ["Una repetición con otras palabras", "Una rima de sonidos", "Ninguno"], "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
    ["f04", 1, "o1", "analizar", "En Salmos 19:1, ¿qué tipo de paralelismo hay?", "La segunda línea repite la idea de la primera con otras palabras", ["Un contraste entre dos ideas opuestas", "Una pregunta y su respuesta", "Una rima de sonidos"], "«Los cielos cuentan la gloria de Dios, Y el firmamento anuncia la obra de sus manos».", "Salmos 19:1"],
    ["f05", 1, "o1", "comprender", "¿Cómo se leen imágenes como Dios es roca o Dios es escudo?", "Como figuras que dicen algo verdadero: Dios es firme y protege", ["Al pie de la letra: Dios es una piedra", "Como errores del poeta", "Como palabras sin significado"], "Jehová es mi pastor: la imagen enseña que él cuida de mí.", "Salmos 23:1"],
    ["f06", 1, "o1", "recordar", "¿Para qué se escribieron muchos salmos?", "Para cantarse", ["Como leyes del templo", "Como cartas a otros reyes", "Como registros de impuestos"], "Todo lo que respira alabe a JAH.", "Salmos 150:6"],
    ["f07", 1, "o1", "aplicar", "¿Cómo conviene leer la poesía bíblica?", "Despacio, preguntando qué imagen usa y qué sentimiento expresa", ["Rápido, como una lista de datos", "Buscando solo reglas", "Sin pensar en las imágenes"], "Jehová es mi pastor; nada me faltará.", "Salmos 23:1"],
    ["f08", 1, "o1", "recordar", "¿Qué desprecian los insensatos, según Proverbios 1:7?", "La sabiduría y la enseñanza", ["Las riquezas", "Las fiestas", "Los amigos"], "«Los insensatos desprecian la sabiduría y la enseñanza».", "Proverbios 1:7"],
    ["f09", 1, "o1", "comprender", "¿Qué tienen en común los libros de sabiduría?", "Enseñan a vivir bajo la mirada de Dios, desde el temor de Jehová", ["Cuentan la historia de los reyes", "Anuncian el fin del mundo", "Dan las leyes de los sacrificios"], "El principio de la sabiduría es el temor de Jehová.", "Proverbios 1:7"],
    ["f10", 1, "o7", "recordar", "Completa Miqueas 6:8: Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia…", "y amar misericordia, y humillarte ante tu Dios", ["y ofrecer muchos sacrificios", "y vencer a tus enemigos", "y guardar todas las fiestas"], "Es el versículo de memoria de la materia.", "Miqueas 6:8"],
    // ---- lección 2: Job y Eclesiastés (10)
    ["f11", 2, "o2", "recordar", "¿Qué perdió Job?", "Sus bienes, sus hijos y su salud", ["Solo su casa", "Su fe en Dios", "Solo a sus amigos"], "Aun así dijo: Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito.", "Job 1:21"],
    ["f12", 2, "o2", "comprender", "¿Qué enseña el libro de Job sobre el sufrimiento?", "Que no todo sufrimiento es castigo por un pecado", ["Que todo sufrimiento es castigo", "Que Dios no se interesa por el que sufre", "Que el justo nunca sufre"], "Dios dijo a los amigos de Job que no habían hablado de él lo recto.", "Job 42:7"],
    ["f13", 2, "o2", "recordar", "¿Qué le preguntó Dios a Job desde el torbellino?", "¿Dónde estabas tú cuando yo fundaba la tierra?", ["¿Por qué pecaste?", "¿Cuántos hijos tienes?", "¿Por qué no ofreces sacrificios?"], "«¿Dónde estabas tú cuando yo fundaba la tierra? Házmelo saber, si tienes inteligencia».", "Job 38:4"],
    ["f14", 2, "o2", "analizar", "¿Qué recibió Job en lugar de una explicación completa?", "Un encuentro con Dios: ahora mis ojos te ven", ["Una lista de razones", "Un castigo mayor", "Nada"], "«De oídas te había oído; Mas ahora mis ojos te ven».", "Job 42:5"],
    ["f15", 2, "o2", "comprender", "¿Qué significa en Eclesiastés la expresión bajo el sol?", "La vida vista sin mirar más allá de este mundo", ["La vida en el desierto", "El trabajo del campo", "El calor del verano"], "«¿Qué provecho tiene el hombre de todo su trabajo con que se afana debajo del sol?».", "Eclesiastés 1:3"],
    ["f16", 2, "o2", "recordar", "¿Cuál es la conclusión de Eclesiastés?", "Teme a Dios, y guarda sus mandamientos", ["Come, bebe y diviértete", "Nada tiene sentido", "Trabaja hasta enriquecerte"], "«Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre».", "Eclesiastés 12:13"],
    ["f17", 2, "o2", "comprender", "¿Qué descubre el Predicador sobre el placer, el trabajo y la riqueza?", "Que no llenan el corazón cuando se viven sin Dios", ["Que son la meta de la vida", "Que siempre traen felicidad", "Que son pecado en sí mismos"], "«Vanidad de vanidades, todo es vanidad».", "Eclesiastés 1:2"],
    ["f18", 2, "o2", "evaluar", "Un hermano tiene una enfermedad grave. ¿Qué actitud enseña el libro de Job?", "Acompañarlo con humildad, sin acusarlo de que algo hizo mal", ["Decirle que tiene algún pecado oculto", "Evitarlo", "Explicarle exactamente por qué Dios lo permite"], "Dios reprendió a los amigos que acusaron a Job.", "Job 42:7"],
    ["f19", 2, "o2", "analizar", "¿Qué enseña Eclesiastés 12:14 sobre el sentido de la vida?", "Que la vida tiene sentido delante de Dios, que pedirá cuentas de toda obra", ["Que nada importa", "Que solo cuentan las obras que otros ven", "Que Dios no ve lo secreto"], "«Porque Dios traerá toda obra a juicio, juntamente con toda cosa encubierta, sea buena o sea mala».", "Eclesiastés 12:14"],
    ["f20", 2, "o2", "aplicar", "¿Qué enseñan Job y Eclesiastés para cuando la vida no se entiende?", "A confiar en Dios aunque no entendamos el porqué", ["A dejar de creer", "A buscar culpables", "A olvidarse de Dios"], "Teme a Dios, y guarda sus mandamientos.", "Eclesiastés 12:13"],
    // ---- lección 3: los Salmos (10)
    ["f21", 3, "o3", "recordar", "¿En cuántos libros se agrupan los salmos?", "En cinco", ["En dos", "En doce", "En ninguno"], "Los ciento cincuenta salmos terminan diciendo: Todo lo que respira alabe a JAH.", "Salmos 150:6"],
    ["f22", 3, "o3", "comprender", "¿Qué dos caminos presenta el Salmo 1?", "El del justo, que se deleita en la ley de Jehová, y el de los malos", ["El del rico y el del pobre", "El de Israel y el de Egipto", "El del sacerdote y el del rey"], "«Sino que en la ley de Jehová está su delicia, Y en su ley medita de día y de noche».", "Salmos 1:2"],
    ["f23", 3, "o3", "recordar", "¿Cómo empieza el Salmo 13?", "¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?", ["Alabad a Jehová, naciones todas", "Jehová es mi pastor", "Bienaventurado el varón"], "«¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?».", "Salmos 13:1"],
    ["f24", 3, "o3", "analizar", "¿Qué partes tiene un salmo de lamento como el 13?", "Queja, petición y confianza", ["Solo alabanza", "Solo queja", "Historia, ley y genealogía"], "«Mas yo en tu misericordia he confiado; Mi corazón se alegrará en tu salvación».", "Salmos 13:5"],
    ["f25", 3, "o3", "comprender", "¿Qué es un salmo de acción de gracias?", "Uno que agradece una respuesta de Dios", ["Uno que se queja sin esperanza", "Uno que da leyes", "Uno que cuenta genealogías"], "«Has cambiado mi lamento en baile».", "Salmos 30:11"],
    ["f26", 3, "o3", "recordar", "¿Qué describe el Salmo 22 siglos antes de la cruz?", "Las manos y los pies horadados y la ropa echada a suertes", ["La construcción del templo", "La salida de Egipto", "La caída de Jericó"], "«Repartieron entre sí mis vestidos, Y sobre mi ropa echaron suertes».", "Salmos 22:18"],
    ["f27", 3, "o3", "comprender", "¿Cómo usó Pedro el Salmo 110 en Pentecostés?", "Lo aplicó a Jesús resucitado, sentado a la diestra de Dios", ["Lo aplicó a David", "Lo aplicó a Salomón", "No lo usó"], "«Dijo el Señor a mi Señor: Siéntate a mi diestra».", "Hechos 2:34"],
    ["f28", 3, "o3", "aplicar", "¿Cómo se ora con un salmo?", "Leyéndolo despacio y convirtiendo sus palabras en una oración propia", ["Leyéndolo rápido para cumplir", "Solo cantándolo en el templo", "Memorizándolo sin pensar"], "En su ley medita de día y de noche.", "Salmos 1:2"],
    ["f29", 3, "o3", "evaluar", "¿Qué enseñan los lamentos sobre la honestidad con Dios?", "Que se le puede presentar el dolor y la queja, con fe, y terminar confiando", ["Que nunca hay que quejarse ante Dios", "Que la queja es falta de fe", "Que Dios no escucha al triste"], "David empieza preguntando hasta cuándo y termina confiando en la misericordia de Dios.", "Salmos 13:1-6"],
    ["f30", 3, "o3", "analizar", "¿Por qué decimos que el Salmo 22 es mesiánico?", "Porque Jesús lo oró en la cruz y describe lo que él sufrió", ["Porque lo escribió un rey", "Porque es muy largo", "Porque habla de la creación"], "«Dios mío, Dios mío, ¿por qué me has desamparado?».", "Mateo 27:46"],
    // ---- lección 4: Proverbios y Cantares (10)
    ["f31", 4, "o4", "recordar", "¿Qué promete Proverbios 3:6 al que reconoce a Dios en todos sus caminos?", "Que él enderezará sus veredas", ["Que será rico", "Que no tendrá problemas", "Que vivirá mil años"], "«Reconócelo en todos tus caminos, Y él enderezará tus veredas».", "Proverbios 3:6"],
    ["f32", 4, "o4", "comprender", "¿Qué enseña Proverbios 22:6 sobre la crianza?", "Lo que normalmente ocurre con una buena crianza, sin culpar a los padres fieles cuando un hijo se aparta", ["Una garantía de que ningún hijo se apartará", "Que la crianza no importa", "Que los hijos no necesitan corrección"], "«Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él».", "Proverbios 22:6"],
    ["f33", 4, "o4", "analizar", "¿Por qué Proverbios 26:4-5 parece contradecirse?", "Porque enseña a saber cuándo aplicar cada consejo según la situación", ["Porque tiene un error", "Porque son dos autores enemistados", "Porque uno de los versículos sobra"], "Responder o no al necio según su necedad: la sabiduría discierne el momento.", "Proverbios 26:4-5"],
    ["f34", 4, "o4", "aplicar", "Te insultan en el trabajo. ¿Qué consejo de Proverbios aplicas?", "La blanda respuesta quita la ira", ["Responder con más fuerza", "Guardar rencor", "Buscar venganza"], "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».", "Proverbios 15:1"],
    ["f35", 4, "o4", "recordar", "¿A quién manda mirar al perezoso Proverbios 6:6?", "A la hormiga", ["Al león", "Al águila", "A la serpiente"], "«Ve a la hormiga, oh perezoso, Mira sus caminos, y sé sabio».", "Proverbios 6:6"],
    ["f36", 4, "o4", "comprender", "¿Qué enseña Proverbios 15:16 sobre el dinero?", "Que es mejor lo poco con el temor de Jehová que el gran tesoro donde hay turbación", ["Que el dinero lo es todo", "Que la pobreza es pecado", "Que hay que acumular sin medida"], "«Mejor es lo poco con el temor de Jehová, Que el gran tesoro donde hay turbación».", "Proverbios 15:16"],
    ["f37", 4, "o4", "recordar", "¿Qué le pasa al que anda con sabios, según Proverbios 13:20?", "Será sabio", ["Será rico", "Será famoso", "Será engañado"], "«El que anda con sabios, sabio será; Mas el que se junta con necios será quebrantado».", "Proverbios 13:20"],
    ["f38", 4, "o4", "comprender", "¿Qué celebra el Cantar de los Cantares?", "La belleza, el deseo y la fidelidad del amor en el matrimonio", ["Las guerras de Salomón", "Las leyes del templo", "La caída de Jerusalén"], "«Porque fuerte es como la muerte el amor».", "Cantares 8:6"],
    ["f39", 4, "o4", "analizar", "¿Qué otro sentido han visto muchos creyentes en Cantares, además del primero?", "Un reflejo del amor fiel de Dios por su pueblo y de Cristo por su iglesia", ["Una profecía de una guerra", "Un código secreto de fechas", "Ninguno"], "Cristo amó a la iglesia, y se entregó a sí mismo por ella.", "Efesios 5:25"],
    ["f40", 4, "o4", "aplicar", "¿Qué enseña Cantares 2:7 a los jóvenes?", "Que el amor y la intimidad tienen su tiempo y su lugar: el matrimonio", ["Que hay que apurar el amor", "Que el amor no importa", "Que la intimidad no tiene reglas"], "«Que no despertéis ni hagáis velar al amor, Hasta que quiera».", "Cantares 2:7"],
    // ---- lección 5: los profetas (10)
    ["f41", 5, "o5", "comprender", "¿Qué eran los profetas?", "Mensajeros de Dios que llamaban al pueblo a volver al pacto", ["Adivinos del futuro", "Reyes de Israel", "Sacerdotes del templo"], "Jehová revela su secreto a sus siervos los profetas.", "Amós 3:7"],
    ["f42", 5, "o5", "recordar", "¿Quiénes son los profetas mayores?", "Isaías, Jeremías, Ezequiel y Daniel", ["Oseas, Joel, Amós y Abdías", "Moisés, Elías, Eliseo y Samuel", "Pedro, Pablo, Juan y Santiago"], "Se llaman mayores por el tamaño de sus libros.", "Amós 3:7"],
    ["f43", 5, "o5", "recordar", "¿Cuántos son los profetas menores?", "Doce", ["Cuatro", "Siete", "Veinte"], "Van de Oseas a Malaquías.", "Amós 3:7"],
    ["f44", 5, "o5", "comprender", "¿Qué profetas hablaron después del regreso del destierro?", "Hageo, Zacarías y Malaquías", ["Isaías, Oseas y Amós", "Jeremías y Ezequiel", "Jonás y Nahum"], "Dios siguió hablando a su pueblo por sus siervos los profetas.", "Amós 3:7"],
    ["f45", 5, "o5", "recordar", "¿Qué pide Amós 5:24?", "Que corra el juicio como las aguas, y la justicia como impetuoso arroyo", ["Que se multipliquen los sacrificios", "Que se construya otro templo", "Que se derrote a los enemigos"], "«Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo».", "Amós 5:24"],
    ["f46", 5, "o5", "comprender", "¿Qué anunciaban los profetas además del juicio?", "Esperanza: la restauración y un nuevo pacto", ["Solo destrucción", "Solo riquezas", "Nada más"], "«Daré mi ley en su mente, y la escribiré en su corazón».", "Jeremías 31:33"],
    ["f47", 5, "o5", "analizar", "¿Dónde se cumple el nuevo pacto anunciado por Jeremías?", "En la sangre de Cristo, como dijo Jesús en la última cena", ["En la ley de Moisés", "En el templo de Salomón", "En ninguna parte"], "«Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama».", "Lucas 22:20"],
    ["f48", 5, "o5", "aplicar", "¿Cuál es el primer paso para leer bien un texto profético?", "Entender qué dijo el profeta a su pueblo en su tiempo", ["Buscar fechas del fin del mundo", "Aplicarlo enseguida a las noticias", "Saltarlo por difícil"], "Dios habló a los padres por los profetas, en su tiempo.", "Hebreos 1:1"],
    ["f49", 5, "o5", "evaluar", "¿Cómo tratar las profecías que todavía no se han cumplido?", "Con humildad, sin forzar fechas ni sistemas; se estudian en Teología sistemática IV", ["Poniendo fechas exactas al fin", "Ignorándolas", "Aplicándolas a cualquier noticia"], "«No os toca a vosotros saber los tiempos o las sazones, que el Padre puso en su sola potestad».", "Hechos 1:7"],
    ["f50", 5, "o5", "aplicar", "¿Qué llamado de los profetas sigue vivo hoy?", "Volver a Dios de corazón, dejar los ídolos y practicar la justicia con el necesitado", ["Ofrecer sacrificios de animales", "Construir templos de piedra", "Guardar solo las fiestas"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    // ---- lección 6: el Mesías anunciado (10)
    ["f51", 6, "o6", "recordar", "¿Qué profecía de Isaías 7:14 se cumplió en el nacimiento de Jesús?", "Que una virgen concebiría y daría a luz un hijo", ["Que nacería en Egipto", "Que sería un sacerdote levita", "Que nacería en un palacio"], "«He aquí que la virgen concebirá, y dará a luz un hijo, y llamará su nombre Emanuel».", "Isaías 7:14"],
    ["f52", 6, "o6", "recordar", "¿De dónde saldría el que sería Señor en Israel, según Miqueas 5:2?", "De Belén Efrata", ["De Nazaret", "De Jerusalén", "De Babilonia"], "«Pero tú, Belén Efrata, pequeña para estar entre las familias de Judá, de ti me saldrá el que será Señor en Israel».", "Miqueas 5:2"],
    ["f53", 6, "o6", "comprender", "¿Qué muestra Miqueas 5:2 sobre el origen del Mesías?", "Que sus salidas son desde el principio, desde los días de la eternidad", ["Que empezó a existir en Belén", "Que fue creado por Dios", "Que era solo un rey humano"], "«y sus salidas son desde el principio, desde los días de la eternidad».", "Miqueas 5:2"],
    ["f54", 6, "o6", "recordar", "¿Cómo entraría el rey en Jerusalén, según Zacarías 9:9?", "Humilde, cabalgando sobre un asno", ["En un carro de guerra", "Con un gran ejército", "Sobre un caballo de batalla"], "«he aquí tu rey vendrá a ti, justo y salvador, humilde, y cabalgando sobre un asno».", "Zacarías 9:9"],
    ["f55", 6, "o6", "comprender", "¿Qué título de Daniel 7:13 usó Jesús para sí mismo?", "El Hijo del Hombre", ["El Hijo de David", "El Profeta", "El Sumo Sacerdote"], "«Miraba yo en la visión de la noche, y he aquí con las nubes del cielo venía uno como un hijo de hombre».", "Daniel 7:13"],
    ["f56", 6, "o6", "recordar", "¿Qué profecía de Joel se cumplió en Pentecostés, según Pedro?", "Que Dios derramaría su Espíritu sobre toda carne", ["Que caería fuego del cielo sobre Roma", "Que el templo sería reconstruido", "Que vendría una gran sequía"], "«Mas esto es lo dicho por el profeta Joel».", "Hechos 2:16"],
    ["f57", 6, "o6", "analizar", "¿Qué dice Isaías 53:6 sobre el pecado y el siervo?", "Que Jehová cargó en él el pecado de todos nosotros", ["Que el siervo pecó como todos", "Que el pecado no importa", "Que cada uno paga su propio pecado"], "«Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros».", "Isaías 53:6"],
    ["f58", 6, "o6", "comprender", "¿Cómo era visto el siervo, según Isaías 53:3?", "Despreciado y desechado entre los hombres", ["Admirado por todos", "Rico y poderoso", "Temido por los reyes"], "«Despreciado y desechado entre los hombres, varón de dolores, experimentado en quebranto».", "Isaías 53:3"],
    ["f59", 6, "o6", "evaluar", "¿Cómo lee el Nuevo Testamento a los profetas?", "A la luz de Cristo, mostrando cómo se cumplen sus promesas, sin forzar el texto", ["Ignorándolos", "Como cuentos sin relación con Jesús", "Buscando en cada palabra un código secreto"], "Era necesario que se cumpliese todo lo que está escrito de él en la ley, los profetas y los salmos.", "Lucas 24:44"],
    ["f60", 6, "o6", "aplicar", "¿Qué profecía le mostrarías a alguien para explicarle que Jesús murió por nuestros pecados?", "Isaías 53", ["Génesis 5", "Levítico 11", "Ester 9"], "«Mas él herido fue por nuestras rebeliones, molido por nuestros pecados».", "Isaías 53:5"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué es Jehová, según Salmos 23:1?", "Mi pastor", ["Mi juez", "Un rey lejano", "Mi enemigo"], "«Jehová es mi pastor; nada me faltará».", "Salmos 23:1"],
      ["m1-02", 1, "o1", "comprender", "¿Qué rima la poesía hebrea?", "Las ideas", ["Los sonidos", "Las letras", "Los números"], "La segunda línea repite, contrasta o completa a la primera.", "Salmos 19:1"],
      ["m1-03", 1, "o1", "analizar", "¿Por qué no se lee al pie de la letra que Dios es una roca?", "Porque es una imagen que enseña que Dios es firme y seguro", ["Porque es un error", "Porque la poesía no dice nada verdadero", "Porque Dios es de piedra"], "«Jehová, roca mía y castillo mío, y mi libertador».", "Salmos 18:2"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué actitud ante Dios es el principio de la sabiduría?", "La reverencia y la obediencia del temor de Jehová", ["La indiferencia", "El orgullo intelectual", "El miedo que huye de Dios"], "El principio de la sabiduría es el temor de Jehová.", "Proverbios 1:7"],
      ["m1-05", 1, "o1", "recordar", "¿Qué cuentan los cielos, según Salmos 19:1?", "La gloria de Dios", ["El futuro de cada uno", "La edad del mundo", "Nada"], "«Los cielos cuentan la gloria de Dios».", "Salmos 19:1"],
      ["m1-06", 1, "o1", "evaluar", "¿Cuál de estas maneras de leer la poesía bíblica es la mejor?", "Despacio, atendiendo a las imágenes, al paralelismo y al sentimiento", ["Como un manual técnico", "Buscando solo reglas", "Sin pensar en lo que significa"], "En su ley medita de día y de noche.", "Salmos 1:2"],
      ["m1-07", 2, "o2", "recordar", "¿Quiénes visitaron a Job y después lo acusaron?", "Sus amigos", ["Sus hijos", "Sus siervos", "Los sacerdotes"], "Dios les dijo que no habían hablado de él lo recto.", "Job 42:7"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hizo Job cuando Dios se le reveló?", "Se humilló y dijo: ahora mis ojos te ven", ["Siguió acusando a Dios", "Se fue de su tierra", "Maldijo a sus amigos"], "«De oídas te había oído; Mas ahora mis ojos te ven».", "Job 42:5"],
      ["m1-09", 2, "o2", "analizar", "¿Por qué Dios no le explicó a Job todas las razones de su sufrimiento?", "Porque le dio algo mejor: conocerlo y confiar en él", ["Porque no las sabía", "Porque Job no las merecía", "Porque no había razones"], "¿Dónde estabas tú cuando yo fundaba la tierra?", "Job 38:4"],
      ["m1-10", 2, "o2", "recordar", "¿Quién habla en Eclesiastés?", "El Predicador", ["El profeta Isaías", "El rey Saúl", "El apóstol Pablo"], "«Vanidad de vanidades, dijo el Predicador».", "Eclesiastés 1:2"],
      ["m1-11", 2, "o2", "aplicar", "Un joven siente que nada tiene sentido. ¿Qué conclusión de Eclesiastés le compartirías?", "Teme a Dios, y guarda sus mandamientos: la vida tiene sentido delante de Dios", ["Que tiene razón y nada importa", "Que se divierta sin pensar", "Que trabaje para olvidarse"], "«Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre».", "Eclesiastés 12:13"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué error de los amigos de Job se repite hoy?", "Decir que alguien sufre porque seguramente hizo algo malo", ["Visitar al enfermo", "Llorar con el que llora", "Orar por el que sufre"], "Dios reprendió a los amigos de Job.", "Job 42:7"],
      ["m1-13", 3, "o3", "recordar", "¿Cómo termina el libro de Salmos?", "Todo lo que respira alabe a JAH", ["Con una genealogía", "Con una guerra", "Con un lamento sin respuesta"], "«Todo lo que respira alabe a JAH. Aleluya».", "Salmos 150:6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es un salmo de alabanza?", "Uno que celebra quién es Dios y lo que hace", ["Uno que solo se queja", "Uno que da leyes", "Uno que cuenta la historia de un rey"], "Todo lo que respira alabe a JAH.", "Salmos 150:6"],
      ["m1-15", 3, "o3", "aplicar", "Pasas por un dolor profundo. ¿Qué tipo de salmo te enseña a orar en esa situación?", "Un salmo de lamento, como el 13", ["Una genealogía de Crónicas", "Una ley de Levítico", "Ninguno"], "«¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?».", "Salmos 13:1"],
      ["m1-16", 3, "o3", "analizar", "¿Qué relación hay entre el Salmo 110 y Hechos 2:34?", "Pedro aplicó a Jesús resucitado lo que David dijo del Señor sentado a la diestra", ["Ninguna", "Pedro corrigió a David", "Pedro habló de Salomón"], "«Dijo el Señor a mi Señor: Siéntate a mi diestra».", "Hechos 2:34"],
      ["m1-17", 3, "o3", "recordar", "¿Dónde está la delicia del justo, según Salmos 1:2?", "En la ley de Jehová", ["En las riquezas", "En los placeres", "En la fama"], "«Sino que en la ley de Jehová está su delicia».", "Salmos 1:2"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas afirmaciones sobre los Salmos es correcta?", "Fueron el libro de oración de Israel y de Jesús, y algunos se cumplen en él", ["Son solo poemas sin relación con Cristo", "Solo los usaban los sacerdotes", "Nunca se cantaron"], "Era necesario que se cumpliese todo lo que está escrito de él en los salmos.", "Lucas 24:44"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué no hay que apoyarse, según Proverbios 3:5?", "En la propia prudencia", ["En Jehová", "En el buen consejo", "En la Palabra de Dios"], "«Y no te apoyes en tu propia prudencia».", "Proverbios 3:5"],
      ["m2-02", 4, "o4", "comprender", "¿Qué significa que los proverbios no son promesas automáticas?", "Que enseñan lo que normalmente ocurre, no lo que pasa siempre sin excepción", ["Que son falsos", "Que no hay que obedecerlos", "Que solo eran para Salomón"], "Instruye al niño en su camino: es un principio general.", "Proverbios 22:6"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué consejo de Proverbios aplicarías al escoger tus amistades?", "El que anda con sabios, sabio será", ["Júntate con quien sea", "Busca solo amigos ricos", "No tengas amigos"], "«El que anda con sabios, sabio será».", "Proverbios 13:20"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué no se debe culpar automáticamente a los padres de un hijo que se aparta?", "Porque Proverbios 22:6 es un principio general, no una garantía", ["Porque los padres nunca influyen", "Porque la Biblia no habla de la crianza", "Porque los hijos no son responsables de nada"], "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.", "Proverbios 22:6"],
      ["m2-05", 4, "o4", "recordar", "¿Qué dice Cantares 8:6 sobre el amor?", "Que es fuerte como la muerte", ["Que es débil", "Que pasa pronto", "Que no importa"], "«Porque fuerte es como la muerte el amor».", "Cantares 8:6"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál es la mejor manera de leer el Cantar de los Cantares?", "Como un poema que celebra el amor en el matrimonio y que también refleja el amor de Dios", ["Como un código secreto de fechas", "Como un libro que no debería estar en la Biblia", "Como una historia de guerra"], "Fuerte es como la muerte el amor.", "Cantares 8:6"],
      ["m2-07", 5, "o5", "recordar", "¿De qué libro a qué libro van los profetas menores?", "De Oseas a Malaquías", ["De Isaías a Daniel", "De Génesis a Deuteronomio", "De Mateo a Juan"], "Son doce libros: Dios habló por sus siervos los profetas.", "Amós 3:7"],
      ["m2-08", 5, "o5", "comprender", "¿Qué denunciaban los profetas?", "La idolatría y la injusticia", ["La lectura de la ley", "La oración", "La misericordia"], "Corra el juicio como las aguas, y la justicia como impetuoso arroyo.", "Amós 5:24"],
      ["m2-09", 5, "o5", "aplicar", "¿Cómo vivirías hoy Miqueas 6:8?", "Haciendo justicia, amando la misericordia y caminando con humildad delante de Dios", ["Dando grandes ofrendas sin cambiar de vida", "Juzgando a los demás", "Buscando que me reconozcan"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
      ["m2-10", 5, "o5", "analizar", "¿Qué contexto histórico tienen Jeremías y Ezequiel?", "La amenaza de Babilonia y el destierro", ["El regreso del destierro", "La salida de Egipto", "El tiempo de los jueces"], "Dios prometió por Jeremías un nuevo pacto con la casa de Israel.", "Jeremías 31:31"],
      ["m2-11", 5, "o5", "recordar", "¿Dónde escribiría Dios su ley en el nuevo pacto, según Jeremías 31:33?", "En su corazón", ["En tablas de piedra", "En el templo", "En los muros de Jerusalén"], "«Daré mi ley en su mente, y la escribiré en su corazón».", "Jeremías 31:33"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál de estas lecturas de la profecía es la más sana?", "Primero su tiempo, después su cumplimiento en Cristo y, con humildad, lo que falta por cumplirse", ["Aplicarla enseguida a las noticias de hoy", "Poner fechas al fin del mundo", "Ignorarla"], "No os toca a vosotros saber los tiempos o las sazones.", "Hechos 1:7"],
      ["m2-13", 6, "o6", "recordar", "¿Qué nombre tendría el niño de Isaías 7:14?", "Emanuel", ["Salomón", "Elías", "Josías"], "«He aquí que la virgen concebirá, y dará a luz un hijo, y llamará su nombre Emanuel».", "Isaías 7:14"],
      ["m2-14", 6, "o6", "comprender", "¿Qué significa Emanuel, según Mateo 1:23?", "Dios con nosotros", ["Rey de los judíos", "Hijo de David", "Salvador del mundo"], "«Y llamarás su nombre Emanuel, que traducido es: Dios con nosotros».", "Mateo 1:23"],
      ["m2-15", 6, "o6", "aplicar", "¿Qué pasajes mostrarías para explicar que Jesús nació en Belén como estaba anunciado?", "Miqueas 5:2 y Mateo 2:4-6", ["Génesis 1:1 y Juan 1:1", "Éxodo 20:1-17", "Salmos 150:6"], "Pero tú, Belén Efrata, de ti me saldrá el que será Señor en Israel.", "Miqueas 5:2"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el Nuevo Testamento aplica Isaías 53 a Jesús?", "Porque el siervo sufre sin culpa por los pecados de otros, como Jesús en la cruz", ["Porque habla de un rey guerrero", "Porque no habla de sufrimiento", "Porque lo escribió Pablo"], "Felipe, comenzando desde esta escritura, le anunció el evangelio de Jesús.", "Hechos 8:35"],
      ["m2-17", 6, "o6", "recordar", "¿Qué dice Lucas 24:44 que debía cumplirse?", "Todo lo que está escrito de Jesús en la ley de Moisés, en los profetas y en los salmos", ["Solo las profecías de Daniel", "Solo la ley", "Nada"], "«era necesario que se cumpliese todo lo que está escrito de mí en la ley de Moisés, en los profetas y en los salmos».", "Lucas 24:44"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál de estas afirmaciones sobre las profecías mesiánicas es correcta?", "Se cumplen en la vida, la muerte y la resurrección de Cristo y en la venida del Espíritu, y lo que falta, en su segunda venida", ["Ninguna se ha cumplido todavía", "Se cumplieron todas en David", "No hablan de Jesús"], "Todo lo que está escrito de él en los profetas debía cumplirse.", "Lucas 24:44"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-poeticos-profeticos-e1",
      tipo: "corta",
      pregunta: "Explica, con un ejemplo, cómo funciona el paralelismo de la poesía hebrea y qué significa que el temor de Jehová es el principio de la sabiduría.",
      ideas: [
        { id: "paralelismo", peso: 30, texto: "El paralelismo: la segunda línea repite, contrasta o completa la primera.", formas: ["paralelismo", "segunda linea", "repite", "contrast*", "complet*", "rima ideas"] },
        { id: "ejemplo", peso: 25, texto: "Un ejemplo bíblico.", formas: ["salmos 19", "proverbios 15", "salmos 23", "los cielos cuentan", "blanda respuesta", "mi pastor", "firmamento"] },
        { id: "temor", peso: 25, texto: "El temor de Jehová es reverencia y obediencia, no un miedo que aleja.", formas: ["reverencia", "respeto", "obedien*", "no es miedo", "no un miedo"], negativa: true },
        { id: "base", peso: 10, texto: "Es la base para vivir con sabiduría delante de Dios.", formas: ["base", "vivir", "bajo la mirada", "delante de dios"] },
      ],
      citas: ["Proverbios 1:7", "Salmos 19:1", "Proverbios 15:1", "Salmos 23:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La poesía hebrea rima ideas: en el paralelismo la segunda línea repite, contrasta o completa la primera. Por ejemplo, en Proverbios 15:1 la blanda respuesta contrasta con la palabra áspera. El temor de Jehová, principio de la sabiduría (Proverbios 1:7), no es miedo que aleja, sino reverencia y obediencia: la base para vivir bajo la mirada de Dios.",
    },
    {
      id: "n4-poeticos-profeticos-e2",
      tipo: "corta",
      pregunta: "Explica qué enseña el libro de Job sobre el sufrimiento del justo y en qué se equivocaron sus amigos.",
      ideas: [
        { id: "justo", peso: 25, texto: "Job era justo y sufrió sin que fuera un castigo.", formas: ["justo", "inocente", "no era castigo", "no todo sufrimiento", "no todo dolor"], negativa: true },
        { id: "amigos", peso: 30, texto: "Los amigos se equivocaron: pensaban que todo sufrimiento es castigo por un pecado, y lo acusaron.", formas: ["se equivoca*", "equivocad*", "acusa*", "culpa*", "no hablaron lo recto", "no habian hablado"] },
        { id: "dios", peso: 25, texto: "Dios respondió revelándose, no explicándolo todo.", formas: ["se revel*", "mis ojos te ven", "torbellino", "fundaba la tierra", "no le explico", "encuentro"], negativa: true },
        { id: "confianza", peso: 10, texto: "La respuesta es confiar en Dios.", formas: ["confia*", "confianza", "bendito", "jehova dio"] },
      ],
      citas: ["Job 1:21", "Job 1:20-22", "Job 42:7", "Job 38:4", "Job 42:5", "Job 42:5-6"],
      pesoCita: 10,
      errores: [
        { id: "castigo", anula: "justo", texto: "Job no sufría por un pecado: el libro muestra que era justo y que sus amigos se equivocaron.", formas: ["amigos tenian razon", "tenian razon sus amigos", "tenian razon los amigos"] },
      ],
      modelo:
        "Job era justo, y aun así lo perdió todo; pero dijo: Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito (Job 1:21). Sus amigos se equivocaron: pensaban que todo sufrimiento es castigo por un pecado y lo acusaron. Dios no le explicó todo, sino que se le reveló, y Job aprendió a confiar: ahora mis ojos te ven.",
    },
    {
      id: "n4-poeticos-profeticos-e3",
      tipo: "corta",
      pregunta: "Explica tres pasos para leer bien un texto profético, con un ejemplo de una profecía cumplida en Cristo.",
      ideas: [
        { id: "tiempo", peso: 25, texto: "Primero, lo que el profeta dijo a su pueblo en su tiempo.", formas: ["su tiempo", "su pueblo", "contexto"] },
        { id: "cristo", peso: 25, texto: "Después, cómo se cumple en Cristo.", formas: ["cumple en cristo", "cumplio en cristo", "cumplimiento", "en cristo", "en jesus"] },
        { id: "humildad", peso: 20, texto: "Con humildad, lo que falta por cumplirse en su venida.", formas: ["humildad", "falta por cumplir*", "segunda venida", "su venida", "sin poner fechas", "no poner fechas"], negativa: true },
        { id: "ejemplo", peso: 20, texto: "Un ejemplo de una profecía cumplida.", formas: ["isaias 7", "isaias 53", "miqueas 5", "zacarias 9", "virgen", "belen", "asno", "siervo"] },
      ],
      citas: ["Isaías 7:14", "Miqueas 5:2", "Isaías 53:5", "Zacarías 9:9", "Mateo 1:22-23", "Mateo 2:4-6", "Lucas 24:44", "Hechos 8:35", "Jeremías 31:31-33", "Lucas 22:20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero hay que entender qué dijo el profeta a su pueblo en su tiempo. Después, ver cómo se cumple en Cristo: Miqueas 5:2 anunció que el Señor de Israel saldría de Belén, y allí nació Jesús. Y, con humildad, reconocer lo que falta por cumplirse en su segunda venida, sin poner fechas.",
    },
    {
      id: "n4-poeticos-profeticos-e4",
      tipo: "breve",
      pregunta:
        "Explica cómo leer y orar los Salmos: su estructura, sus tipos, cómo los lamentos enseñan a orar en el dolor y cómo algunos salmos se cumplen en Cristo. Termina diciendo qué salmo orarás y por qué. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "estructura", peso: 15, texto: "La estructura: ciento cincuenta salmos en cinco libros.", formas: ["ciento cincuenta", "150", "cinco libros"] },
        { id: "tipos", peso: 20, texto: "Los tipos de salmos.", formas: ["alabanza", "lamento", "accion de gracias", "sabiduria", "reales", "mesianic*"] },
        { id: "lamento", peso: 20, texto: "Los lamentos: llevar el dolor a Dios con honestidad y terminar confiando.", formas: ["queja", "dolor", "honest*", "hasta cuando", "confian*", "salmo 13", "salmos 13"] },
        { id: "cristo", peso: 20, texto: "Los salmos que se cumplen en Cristo.", formas: ["salmo 22", "salmos 22", "salmo 110", "salmos 110", "desamparado", "cruz", "diestra"] },
        { id: "poesia", peso: 10, texto: "Se leen como poesía.", formas: ["paralelismo", "imagen*", "poesia", "despacio"] },
        { id: "aplicacion", peso: 15, texto: "Qué salmo orará y por qué.", formas: ["orare", "voy a orar", "voy a", "esta semana", "mi vida"] },
      ],
      basta: 85,
      citas: ["Salmos 1:1-3", "Salmos 1:2", "Salmos 13:1", "Salmos 13:5", "Salmos 13:1-6", "Salmos 22:1", "Salmos 22:16-18", "Salmos 110:1", "Hechos 2:34", "Mateo 27:46", "Salmos 150:6", "Salmos 23:1", "Salmos 51:10", "Salmos 46:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El libro de Salmos tiene ciento cincuenta salmos agrupados en cinco libros, y empieza con los dos caminos del Salmo 1: el del justo, que medita en la ley de Jehová, y el de los malos. Hay salmos de alabanza, de lamento, de acción de gracias, de sabiduría y salmos reales o mesiánicos. Como son poesía, se leen despacio, atendiendo al paralelismo y a las imágenes. Los lamentos enseñan a orar en el dolor con honestidad: en el Salmo 13, David se queja preguntando hasta cuándo, Jehová (Salmos 13:1), pide ayuda y termina confiando en la misericordia de Dios. Algunos salmos se cumplen en Cristo: en la cruz, Jesús oró el Salmo 22, Dios mío, Dios mío, ¿por qué me has desamparado? (Mateo 27:46), y Pedro aplicó a Jesús resucitado el Salmo 110, que habla del Señor sentado a la diestra de Dios (Hechos 2:34). Esta semana voy a orar el Salmo 13, porque estoy pasando por una prueba en mi familia: voy a presentarle a Dios mi tristeza con sinceridad y voy a terminar cada día confiando en su misericordia.",
    },
    {
      id: "n4-poeticos-profeticos-e5",
      tipo: "breve",
      pregunta:
        "Explica quiénes eran los profetas, qué anunciaban y cómo apuntan a Cristo, con dos profecías mesiánicas y su cumplimiento. Termina con lo que el mensaje de los profetas te pide hoy. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "quienes", peso: 15, texto: "Quiénes eran: mensajeros de Dios que llamaban a volver al pacto.", formas: ["mensajeros", "volver al pacto", "siervos", "voz de dios"] },
        { id: "mensaje", peso: 20, texto: "Lo que anunciaban: arrepentimiento, contra la idolatría y la injusticia, juicio.", formas: ["arrepent*", "idolatria", "injusticia", "juicio"] },
        { id: "esperanza", peso: 15, texto: "La esperanza: la restauración y el nuevo pacto.", formas: ["esperanza", "nuevo pacto", "restaur*"] },
        { id: "mesias", peso: 20, texto: "Dos profecías mesiánicas.", formas: ["virgen", "belen", "asno", "siervo", "isaias 53", "miqueas 5", "isaias 7", "zacarias 9", "emanuel"] },
        { id: "cumplimiento", peso: 15, texto: "Su cumplimiento en Jesús.", formas: ["cumpl*", "felipe", "nacio", "cruz"] },
        { id: "hoy", peso: 15, texto: "Lo que el mensaje profético le pide hoy.", formas: ["hoy", "voy a", "mi vida", "misericordia", "humill*"] },
      ],
      basta: 85,
      citas: ["Amós 3:7", "Amós 5:24", "Miqueas 6:8", "Jeremías 31:31-33", "Jeremías 31:33", "Isaías 7:14", "Mateo 1:22-23", "Miqueas 5:2", "Mateo 2:4-6", "Isaías 53:5", "Isaías 53:3-6", "Hechos 8:35", "Zacarías 9:9", "Mateo 21:4-5", "Lucas 24:44", "Lucas 22:20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los profetas eran mensajeros de Dios que llamaban a su pueblo a volver al pacto, porque Jehová no hace nada sin revelar su secreto a sus siervos los profetas (Amós 3:7). Llamaban al arrepentimiento, denunciaban la idolatría y la injusticia y pedían que corriera la justicia como impetuoso arroyo. Anunciaban juicio, pero también esperanza: Dios restauraría a su pueblo y haría un nuevo pacto, escribiendo su ley en el corazón (Jeremías 31:33). Los profetas apuntan a Cristo. Miqueas anunció que el Señor de Israel saldría de Belén (Miqueas 5:2), y Jesús nació allí, como recuerda Mateo. Isaías describió al siervo herido por nuestras rebeliones (Isaías 53:5), y Felipe, comenzando desde esa escritura, le anunció a Jesús al etíope. Así se cumple todo lo escrito de él en los profetas. Hoy el mensaje de los profetas me pide lo mismo que a Israel: hacer justicia, amar misericordia y humillarme ante mi Dios (Miqueas 6:8). Voy a revisar mi manera de tratar a los más débiles y voy a dejar cualquier cosa que ocupe el lugar de Dios en mi vida.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-poeticos-profeticos-b1",
    tipo: "breve",
    pregunta:
      "Escoge un salmo o un pasaje de un profeta. Explica su contexto y su mensaje, cómo se relaciona con Cristo, y escribe una oración o una aplicación personal basada en él. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "escogido", peso: 10, texto: "El salmo o el pasaje escogido.", formas: ["escogi", "salmo*", "isaias", "jeremias", "miqueas", "amos", "oseas", "joel", "jonas", "ezequiel", "daniel", "habacuc", "zacarias", "malaquias"] },
      { id: "contexto", peso: 20, texto: "Su contexto.", formas: ["contexto", "escribio", "en su tiempo", "pueblo", "destierro", "david", "cuando"] },
      { id: "mensaje", peso: 20, texto: "Su mensaje.", formas: ["mensaje", "ensena", "enseña", "significa", "dice que"] },
      { id: "cristo", peso: 20, texto: "Cómo se relaciona con Cristo.", formas: ["cristo", "jesus", "cumpl*", "cruz"] },
      { id: "oracion", peso: 20, texto: "Una oración o una aplicación personal.", formas: ["oracion", "señor", "senor", "padre", "te pido", "ayudame", "voy a"] },
      { id: "vida", peso: 10, texto: "Para su vida hoy.", formas: ["mi vida", "esta semana", "hoy", "aplic*"] },
    ],
    basta: 85,
    citas: ["Salmos 23:1", "Salmos 23:1-6", "Salmos 51:10", "Salmos 46:1", "Salmos 1:1-3", "Salmos 22:1", "Salmos 13:1-6", "Isaías 53:5", "Isaías 53:3-6", "Isaías 40:31", "Isaías 7:14", "Miqueas 6:8", "Miqueas 5:2", "Jeremías 31:33", "Amós 5:24", "Juan 10:11", "Lucas 24:44", "Hechos 8:35", "Mateo 27:46"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí el Salmo 23, que escribió David, un pastor que llegó a ser rey y que conocía por experiencia lo que es cuidar ovejas. Su mensaje es que Dios cuida de los suyos como un buen pastor: Jehová es mi pastor; nada me faltará (Salmos 23:1). Él provee, guía por sendas de justicia, acompaña en el valle de sombra de muerte y prepara una mesa delante de los enemigos. Este salmo se relaciona con Cristo, porque Jesús dijo: Yo soy el buen pastor; el buen pastor su vida da por las ovejas (Juan 10:11), y lo cumplió en la cruz. Mi oración es esta: Señor Jesús, buen pastor, gracias porque diste tu vida por mí. En esta semana difícil en mi trabajo, ayúdame a no temer, porque tú estás conmigo. Guíame por tus sendas y enséñame a confiar en que nada me faltará. Amén. Voy a leer este salmo cada mañana de esta semana y a recordarlo cuando sienta miedo.",
  },
};
