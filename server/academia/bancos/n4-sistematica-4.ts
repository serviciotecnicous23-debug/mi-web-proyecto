/**
 * El banco de «Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos» (Nivel 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la naturaleza de la iglesia · o2 el gobierno, los ministerios y el ministerio de la mujer · o3 la misión y
 * las ordenanzas · o4 los ángeles, Satanás y los demonios · o5 la muerte, el estado intermedio y la resurrección · o6 la
 * venida de Cristo, el juicio y la eternidad · o7 el versículo de memoria (Tito 2:13). Sobre el ministerio de la mujer, el
 * arrebatamiento y el milenio, las preguntas solo piden reconocer las posiciones, nunca elegir una.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-sistematica-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_SISTEMATICA_4: BancoMateria = {
  materia: "n4-sistematica-4",
  repaso: {
    "n4-sistematica-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Jesús de su iglesia en Mateo 16:18?", "Que él la edificaría y que las puertas del Hades no prevalecerían contra ella", ["Que duraría poco tiempo", "Que la edificarían los apóstoles solos", "Que sería un edificio de piedra"], "«edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
      ["1-r2", 1, "o1", "comprender", "¿Qué diferencia hay entre la iglesia universal y la iglesia local?", "La universal es el cuerpo de todos los creyentes; la local es la congregación que se reúne en un lugar", ["No hay ninguna diferencia", "La universal es la católica y la local es la evangélica", "La local es más importante que el cuerpo de Cristo"], "«lo dio por cabeza sobre todas las cosas a la iglesia, la cual es su cuerpo».", "Efesios 1:22-23"],
      ["1-r3", 1, "o1", "aplicar", "Un creyente dice que puede vivir su fe sin congregarse. ¿Qué le enseña 1 Corintios 12:12?", "Que es miembro de un cuerpo y que nadie se basta solo", ["Que tiene razón", "Que basta con ver los cultos por internet", "Que solo los líderes forman el cuerpo"], "«el cuerpo es uno, y tiene muchos miembros».", "1 Corintios 12:12-13"],
    ] as P[]).map(p),
    "n4-sistematica-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hicieron Pablo y Bernabé en cada iglesia, según Hechos 14:23?", "Constituyeron ancianos", ["Construyeron templos", "Nombraron reyes", "Cerraron las sinagogas"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:23"],
      ["2-r2", 2, "o2", "comprender", "¿Para qué dio Cristo los ministerios, según Efesios 4:12?", "Para perfeccionar a los santos para la obra del ministerio", ["Para que los líderes hagan toda la obra", "Para que haya títulos", "Para gobernar la ciudad"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-13"],
      ["2-r3", 2, "o2", "aplicar", "¿Cómo presenta el líder el ministerio de la mujer, según la lección?", "Con respeto y con las dos posiciones evangélicas, porque el ministerio todavía debe confirmarlo", ["Como un tema sin importancia", "Diciendo que una de las dos posiciones no es cristiana", "Evitándolo siempre"], "«vuestros hijos y vuestras hijas profetizarán».", "Hechos 2:17-18"],
    ] as P[]).map(p),
    "n4-sistematica-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué mandó Jesús en Mateo 28:19?", "Ir y hacer discípulos a todas las naciones", ["Quedarse en Jerusalén para siempre", "Construir un gran templo", "Apartarse del mundo"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:18-20"],
      ["3-r2", 3, "o3", "comprender", "¿Qué anuncia la iglesia cada vez que celebra la Santa Cena, según 1 Corintios 11:26?", "La muerte del Señor hasta que él venga", ["Su propia santidad", "Una nueva ley", "El fin del bautismo"], "«la muerte del Señor anunciáis hasta que él venga».", "1 Corintios 11:23-26"],
      ["3-r3", 3, "o3", "aplicar", "Una iglesia solo se ocupa de sus miembros. ¿Qué le recuerda Gálatas 6:10?", "Que debe hacer bien a todos, y mayormente a los de la familia de la fe", ["Que está bien así", "Que solo debe ayudar a los de afuera", "Que el servicio no es parte de su misión"], "«hagamos bien a todos, y mayormente a los de la familia de la fe».", "Gálatas 6:10"],
    ] as P[]).map(p),
    "n4-sistematica-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué son los ángeles, según Hebreos 1:14?", "Espíritus ministradores enviados para servicio a favor de los herederos de la salvación", ["Personas que murieron", "Dioses menores", "Fuerzas sin voluntad"], "«¿No son todos espíritus ministradores, enviados para servicio a favor de los que serán herederos de la salvación?».", "Hebreos 1:14"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hizo Cristo con los principados y las potestades, según Colosenses 2:15?", "Los despojó y triunfó sobre ellos en la cruz", ["Negoció con ellos", "Les dio más poder", "Los dejó sin vencer"], "«y despojando a los principados y a las potestades, los exhibió públicamente, triunfando sobre ellos en la cruz».", "Colosenses 2:15"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué hace el creyente ante el diablo, según 1 Pedro 5:9?", "Lo resiste firme en la fe", ["Huye con miedo", "Ignora que existe", "Habla con él"], "«al cual resistid firmes en la fe».", "1 Pedro 5:8-9"],
    ] as P[]).map(p),
    "n4-sistematica-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cuántas veces muere el ser humano, según Hebreos 9:27?", "Una sola vez, y después viene el juicio", ["Muchas veces, en varias vidas", "Ninguna", "Dos veces"], "«que mueran una sola vez, y después de esto el juicio».", "Hebreos 9:27"],
      ["5-r2", 5, "o5", "comprender", "¿Dónde está el creyente entre su muerte y la resurrección, según la lección?", "Con Cristo, consciente y en paz", ["Dormido y sin conciencia", "En el purgatorio", "En otra vida en la tierra"], "«teniendo deseo de partir y estar con Cristo, lo cual es muchísimo mejor».", "Filipenses 1:21-23"],
      ["5-r3", 5, "o5", "aplicar", "En un funeral cristiano, ¿qué esperanza anuncia el líder?", "Que el creyente está con Cristo y que su cuerpo resucitará", ["La reencarnación", "Que el muerto ahora es un ángel", "Que nadie sabe nada de lo que viene"], "«Se siembra en corrupción, resucitará en incorrupción».", "1 Corintios 15:42-44"],
    ] as P[]).map(p),
    "n4-sistematica-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo volverá Cristo, según Hechos 1:11?", "Como lo vieron ir al cielo: en persona y de manera visible", ["En secreto, solo en espíritu", "En otra persona", "No volverá"], "«Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo».", "Hechos 1:11"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña el pretribulacionismo?", "Que el arrebatamiento ocurrirá antes de la gran tribulación", ["Que no habrá arrebatamiento", "Que Cristo ya volvió", "Que el milenio ya terminó"], "«seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire».", "1 Tesalonicenses 4:16-17"],
      ["6-r3", 6, "o6", "aplicar", "Un predicador anuncia la fecha de la venida de Cristo. ¿Qué responde Mateo 24:36?", "Que del día y la hora nadie sabe, sino solo el Padre", ["Que tiene razón si estudió mucho", "Que los ángeles sí saben la fecha", "Que la fecha está escrita en Apocalipsis"], "«Pero del día y la hora nadie sabe, ni aun los ángeles de los cielos, sino sólo mi Padre».", "Mateo 24:36"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La naturaleza de la iglesia
    ["f01", 1, "o1", "recordar", "¿Qué no prevalecerá contra la iglesia, según Mateo 16:18?", "Las puertas del Hades", ["Los apóstoles", "Los ángeles", "Las naciones que crean"], "«y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
    ["f02", 1, "o1", "comprender", "¿Qué significa la palabra ekklesía, según la lección?", "La asamblea de los llamados", ["Un edificio sagrado", "Una oficina del gobierno", "Un grupo de sacerdotes"], "«edificaré mi iglesia».", "Mateo 16:18"],
    ["f03", 1, "o1", "analizar", "¿Cómo entienden los evangélicos la roca de Mateo 16:18, según la lección?", "Como la confesión de Pedro de que Jesús es el Cristo, o como Cristo mismo", ["Como el fundamento del papado", "Como el templo de Jerusalén", "Como la ley de Moisés"], "«y sobre esta roca edificaré mi iglesia».", "Mateo 16:18"],
    ["f04", 1, "o1", "recordar", "¿Qué es la iglesia, según Efesios 1:23?", "Su cuerpo, la plenitud de Aquel que todo lo llena en todo", ["Un edificio", "Una religión más", "Un partido"], "«la cual es su cuerpo, la plenitud de Aquel que todo lo llena en todo».", "Efesios 1:22-23"],
    ["f05", 1, "o1", "comprender", "¿Qué enseña 1 Corintios 12:13 sobre la unidad de la iglesia?", "Que por un solo Espíritu todos fuimos bautizados en un cuerpo, sin importar el origen", ["Que cada grupo tiene su propio cuerpo", "Que solo los judíos forman el cuerpo", "Que los esclavos no son miembros"], "«Porque por un solo Espíritu fuimos todos bautizados en un cuerpo, sean judíos o griegos».", "1 Corintios 12:12-13"],
    ["f06", 1, "o1", "recordar", "¿Quién es la principal piedra del ángulo, según Efesios 2:20?", "Jesucristo mismo", ["Pedro", "Pablo", "Moisés"], "«siendo la principal piedra del ángulo Jesucristo mismo».", "Efesios 2:19-22"],
    ["f07", 1, "o1", "comprender", "¿Para qué va creciendo el edificio, según Efesios 2:21?", "Para ser un templo santo en el Señor", ["Para ser una gran catedral", "Para tener poder político", "Para guardar riquezas"], "«va creciendo para ser un templo santo en el Señor».", "Efesios 2:19-22"],
    ["f08", 1, "o1", "comprender", "¿Cómo llamó la Reforma a la enseñanza de que cada creyente es sacerdote?", "El sacerdocio de todos los creyentes", ["La sucesión apostólica", "El clero", "La jerarquía"], "«Mas vosotros sois linaje escogido, real sacerdocio, nación santa».", "1 Pedro 2:9"],
    ["f09", 1, "o1", "analizar", "¿Cuáles son las cuatro marcas de la iglesia en Hechos 2:42?", "La doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones", ["El edificio, la música, la ofrenda y los anuncios", "El ayuno, el diezmo, la ley y el templo", "Los milagros, la fama, el dinero y el poder"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:42-47"],
    ["f10", 1, "o7", "recordar", "Completa Tito 2:13: aguardando la esperanza bienaventurada…", "y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo", ["y la llegada de un nuevo profeta", "y el fin de todas las pruebas en esta vida", "y la gloria de nuestras obras"], "«aguardando la esperanza bienaventurada y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo».", "Tito 2:13"],
    // Lección 2 · El gobierno y los ministerios
    ["f11", 2, "o2", "recordar", "¿Qué tarea comparten ancianos, obispos y pastores en el Nuevo Testamento, según la lección?", "Guiar y cuidar la congregación", ["Cobrar impuestos", "Gobernar la ciudad", "Ofrecer sacrificios de animales"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:23"],
    ["f12", 2, "o2", "recordar", "¿Qué forma de gobierno siguen las iglesias bautistas, según la lección?", "La congregacional", ["La episcopal", "La presbiteriana", "La monárquica"], "En la forma congregacional, la congregación toma las decisiones principales.", "Hechos 14:23"],
    ["f13", 2, "o2", "comprender", "¿Qué caracteriza a la forma de gobierno episcopal?", "La iglesia es guiada por obispos", ["La congregación decide todo", "No hay líderes", "La guían ancianos reunidos en consejos, sin obispos"], "En la forma episcopal, la iglesia es guiada por obispos, como en la iglesia católica, la ortodoxa, la anglicana y la metodista.", "Hechos 14:23"],
    ["f14", 2, "o2", "recordar", "¿Qué ministerios nombra Efesios 4:11?", "Apóstoles, profetas, evangelistas, pastores y maestros", ["Reyes, sacerdotes y jueces", "Levitas, cantores y porteros", "Diáconos, tesoreros y ujieres"], "«Y él mismo constituyó a unos, apóstoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros».", "Efesios 4:11-13"],
    ["f15", 2, "o2", "comprender", "¿Hasta cuándo sirven los ministerios, según Efesios 4:13?", "Hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios", ["Hasta que muera el último apóstol", "Hasta que se construya un templo", "Solo por un año"], "«hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios».", "Efesios 4:11-13"],
    ["f16", 2, "o2", "recordar", "¿Cuál de estos es un requisito del obispo, según 1 Timoteo 3:2?", "Ser apto para enseñar", ["Ser rico", "Ser famoso", "Ser muy nuevo en la fe"], "«Pero es necesario que el obispo sea irreprensible, marido de una sola mujer, sobrio, prudente, decoroso, hospedador, apto para enseñar».", "1 Timoteo 3:1-7"],
    ["f17", 2, "o2", "analizar", "¿Por qué Pablo pide que el obispo no sea un neófito?", "Para que no caiga envanecido en la condenación del diablo", ["Porque los nuevos no pueden orar", "Porque los nuevos no tienen dones", "Porque la edad es lo único que importa"], "«no un neófito, no sea que envaneciéndose caiga en la condenación del diablo».", "1 Timoteo 3:1-7"],
    ["f18", 2, "o2", "recordar", "¿Cómo llama Pablo a Febe en Romanos 16:1?", "Diaconisa de la iglesia en Cencrea", ["Apóstol de Roma", "Reina de Cencrea", "Profetisa de Corinto"], "«nuestra hermana Febe, la cual es diaconisa de la iglesia en Cencrea».", "Romanos 16:1-2"],
    ["f19", 2, "o2", "comprender", "¿Qué texto citan muchas iglesias para enseñar que el pastorado es solo para varones?", "1 Timoteo 2:12, donde Pablo no permite a la mujer enseñar ni ejercer dominio sobre el hombre", ["Hechos 2:17, donde las hijas profetizan", "Romanos 16:1, donde Febe sirve", "Jueces 4:4, donde Débora gobierna"], "«Porque no permito a la mujer enseñar, ni ejercer dominio sobre el hombre, sino estar en silencio».", "1 Timoteo 2:11-12"],
    ["f20", 2, "o2", "evaluar", "¿Cuál es la posición del ministerio sobre el ministerio de la mujer?", "Es un punto de la declaración de fe por confirmar", ["Que la mujer no puede servir en nada", "Que el tema no importa", "Que la Biblia no dice nada sobre el tema"], "«Y de cierto sobre mis siervos y sobre mis siervas en aquellos días Derramaré de mi Espíritu, y profetizarán».", "Hechos 2:17-18"],
    // Lección 3 · La misión y las ordenanzas
    ["f21", 3, "o3", "recordar", "¿Qué le fue dado a Jesús, según Mateo 28:18?", "Toda potestad en el cielo y en la tierra", ["Solo potestad en el cielo", "Una parte del poder", "Ninguna potestad"], "«Toda potestad me es dada en el cielo y en la tierra».", "Mateo 28:18-20"],
    ["f22", 3, "o3", "comprender", "¿Qué incluye hacer discípulos, según Mateo 28:19-20?", "Bautizarlos y enseñarles a guardar todo lo que Jesús mandó", ["Solo hacerlos repetir una oración", "Solo invitarlos a un culto", "Cambiarles el nombre"], "«bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:18-20"],
    ["f23", 3, "o3", "recordar", "¿Qué prometió Jesús al final de Mateo 28:20?", "Que estaría con ellos todos los días, hasta el fin del mundo", ["Que no volvería a hablarles", "Que les daría riquezas", "Que la tarea sería fácil"], "«y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:18-20"],
    ["f24", 3, "o3", "recordar", "¿Con qué palabras resume la declaración de fe la misión de la iglesia?", "Id por todo el mundo y predicad el evangelio a toda criatura", ["Estad quietos, y conoced que yo soy Dios", "Amarás a tu prójimo como a ti mismo", "Bienaventurados los pobres en espíritu"], "«Id por todo el mundo y predicad el evangelio a toda criatura».", "Marcos 16:15-16"],
    ["f25", 3, "o3", "comprender", "¿Con qué poder cumple la iglesia su misión, según Hechos 1:8?", "Con el poder del Espíritu Santo", ["Con sus propias fuerzas", "Con el poder político", "Con el dinero"], "«pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos».", "Hechos 1:8"],
    ["f26", 3, "o3", "comprender", "¿Cuáles son las cuatro tareas de la iglesia, según la lección?", "La adoración, la edificación, la evangelización y el servicio", ["La música, los anuncios, la ofrenda y la despedida", "La ley, el templo, el sacerdocio y los sacrificios", "La fama, el crecimiento, el dinero y el poder"], "La adoración mira a Dios; la edificación, a los creyentes; la evangelización, al mundo; y el servicio, al prójimo.", "Mateo 28:18-20"],
    ["f27", 3, "o3", "analizar", "¿Quién edifica el cuerpo, según Efesios 4:16?", "Todos, según la actividad propia de cada miembro", ["Solo el pastor", "Solo los ancianos", "Nadie: crece solo"], "«según la actividad propia de cada miembro, recibe su crecimiento para ir edificándose en amor».", "Efesios 4:15-16"],
    ["f28", 3, "o3", "recordar", "¿Cuáles son las dos ordenanzas de la iglesia, según el artículo 8 de la declaración de fe?", "El bautismo en agua y la Santa Cena", ["El ayuno y el diezmo", "La confirmación y el matrimonio", "La ofrenda y la alabanza"], "«haced esto en memoria de mí».", "1 Corintios 11:23-26"],
    ["f29", 3, "o3", "recordar", "¿Qué dijo Jesús al tomar la copa, según 1 Corintios 11:25?", "Esta copa es el nuevo pacto en mi sangre", ["Esta copa es la ley de Moisés", "Esta copa es solo para los apóstoles", "Esta copa es un premio"], "«Esta copa es el nuevo pacto en mi sangre».", "1 Corintios 11:23-26"],
    ["f30", 3, "o3", "analizar", "¿Qué diferencia hay entre sacramento y ordenanza, según la nota de la lección?", "La iglesia católica enseña siete sacramentos que dan la gracia por el rito mismo; la mayoría de los evangélicos habla de dos ordenanzas, señales de la gracia que se recibe por la fe", ["No hay ninguna diferencia", "Los evangélicos tienen siete ordenanzas", "Los católicos no tienen sacramentos"], "La mayoría de los evangélicos habla de dos ordenanzas porque Cristo las ordenó.", "1 Corintios 11:23-26"],
    // Lección 4 · Los ángeles, Satanás y los demonios
    ["f31", 4, "o4", "recordar", "¿Qué hacen los ángeles, según Salmos 103:20?", "Ejecutan la palabra de Dios y obedecen a la voz de su precepto", ["Hacen su propia voluntad", "Reciben adoración", "Gobiernan sobre Dios"], "«Bendecid a Jehová, vosotros sus ángeles, Poderosos en fortaleza, que ejecutáis su palabra».", "Salmos 103:20"],
    ["f32", 4, "o4", "comprender", "¿Por qué no se adora a los ángeles, según la lección?", "Porque son criaturas que sirven a Dios, y el ángel le dijo a Juan que adorara a Dios", ["Porque no existen", "Porque todos son malos", "Porque son personas que murieron"], "Cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios (Apocalipsis 22:8-9).", "Hebreos 1:14"],
    ["f33", 4, "o4", "recordar", "¿Qué ángel dijo que estaba delante de Dios, según Lucas 1:19?", "Gabriel", ["Miguel", "Rafael", "Lucero"], "«Yo soy Gabriel, que estoy delante de Dios».", "Lucas 1:19"],
    ["f34", 4, "o4", "recordar", "¿A quién llama Judas arcángel?", "A Miguel", ["A Gabriel", "A Satanás", "A Moisés"], "«Pero cuando el arcángel Miguel contendía con el diablo».", "Judas 1:9"],
    ["f35", 4, "o4", "comprender", "¿Qué hizo Miguel cuando contendía con el diablo, según Judas 9?", "No se atrevió a maldecirlo, sino que dijo: El Señor te reprenda", ["Lo insultó", "Lo venció con su propia fuerza", "Huyó"], "«no se atrevió a proferir juicio de maldición contra él, sino que dijo: El Señor te reprenda».", "Judas 1:9"],
    ["f36", 4, "o4", "recordar", "¿Cómo llama Apocalipsis 12:9 al diablo?", "El gran dragón, la serpiente antigua, que engaña al mundo entero", ["Un ángel de luz que guía", "Un rey de la tierra", "Un profeta"], "«Y fue lanzado fuera el gran dragón, la serpiente antigua, que se llama diablo y Satanás, el cual engaña al mundo entero».", "Apocalipsis 12:9"],
    ["f37", 4, "o4", "analizar", "¿Cómo leen muchos intérpretes Isaías 14 y Ezequiel 28, según la lección?", "Como profecías contra los reyes de Babilonia y de Tiro que reflejan también la caída de Satanás; otros las leen solo contra esos reyes", ["Como textos sobre los ángeles buenos", "Como profecías del milenio", "Como relatos de la creación"], "La Biblia no da todos los detalles del origen de Satanás.", "Apocalipsis 12:9"],
    ["f38", 4, "o4", "comprender", "¿Cómo anda el diablo, según 1 Pedro 5:8?", "Como león rugiente, buscando a quien devorar", ["Como un cordero manso", "Escondido sin hacer nada", "Como un amigo"], "«vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar».", "1 Pedro 5:8-9"],
    ["f39", 4, "o4", "evaluar", "¿Qué dos errores opuestos señaló C. S. Lewis sobre los demonios?", "No creer en ellos, o interesarse en ellos de manera excesiva y malsana", ["Temerles o resistirles", "Orar o ayunar", "Leer la Biblia o congregarse"], "Lo advirtió en el prólogo de Cartas del diablo a su sobrino.", "1 Pedro 5:8-9"],
    ["f40", 4, "o4", "aplicar", "¿Qué enseñan las Asambleas de Dios sobre un creyente nacido de nuevo, según la lección?", "Que no puede ser poseído por un demonio, aunque sí puede ser tentado y atacado", ["Que puede ser poseído en cualquier momento", "Que nunca será tentado", "Que los demonios no existen"], "«al cual resistid firmes en la fe».", "1 Pedro 5:8-9"],
    // Lección 5 · La muerte, el estado intermedio y la resurrección
    ["f41", 5, "o5", "comprender", "¿Por qué la Biblia no deja lugar a la reencarnación?", "Porque está establecido que el ser humano muera una sola vez, y después el juicio", ["Porque nadie muere", "Porque todos vuelven como ángeles", "Porque el juicio no existe"], "«Y de la manera que está establecido para los hombres que mueran una sola vez, y después de esto el juicio».", "Hebreos 9:27"],
    ["f42", 5, "o5", "recordar", "¿Qué era para Pablo el morir, según Filipenses 1:21?", "Ganancia", ["Pérdida", "Castigo", "Un sueño sin fin"], "«Porque para mí el vivir es Cristo, y el morir es ganancia».", "Filipenses 1:21-23"],
    ["f43", 5, "o5", "recordar", "¿Qué le prometió Jesús al ladrón arrepentido?", "Hoy estarás conmigo en el paraíso", ["Volverás a nacer en otra vida", "Esperarás en el purgatorio", "Dormirás hasta el fin"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:43"],
    ["f44", 5, "o5", "comprender", "¿Qué prefería Pablo, según 2 Corintios 5:8?", "Estar ausente del cuerpo y presente al Señor", ["Seguir en la tierra para siempre", "Volver como espíritu a su casa", "Dormir sin conciencia"], "«y más quisiéramos estar ausentes del cuerpo, y presentes al Señor».", "2 Corintios 5:8"],
    ["f45", 5, "o5", "analizar", "¿Por qué el sueño del alma no concuerda con 2 Corintios 5:8?", "Porque Pablo esperaba estar presente al Señor al dejar el cuerpo, no inconsciente", ["Porque Pablo no creía en la muerte", "Porque el cuerpo no muere", "Porque Pablo enseñaba la reencarnación"], "«presentes al Señor».", "2 Corintios 5:8"],
    ["f46", 5, "o5", "recordar", "¿Quiénes enseñan el sueño del alma, según la lección?", "Los adventistas y los testigos de Jehová", ["Los bautistas y los metodistas", "Los católicos y los ortodoxos", "Los pentecostales y los presbiterianos"], "El sueño del alma dice que el muerto no tiene conciencia hasta la resurrección.", "2 Corintios 5:8"],
    ["f47", 5, "o5", "evaluar", "¿Por qué los evangélicos no aceptan el purgatorio, según la lección?", "Porque no aparece en la Escritura y la obra de Cristo basta para limpiar al creyente", ["Porque es muy caro", "Porque es demasiado estricto", "Porque los católicos no lo enseñan"], "Jesús le prometió al ladrón arrepentido estar con él ese mismo día.", "Lucas 23:43"],
    ["f48", 5, "o5", "recordar", "¿Quiénes oirán la voz del Hijo, según Juan 5:28?", "Todos los que están en los sepulcros", ["Solo los creyentes", "Solo los apóstoles", "Nadie"], "«porque vendrá hora cuando todos los que están en los sepulcros oirán su voz».", "Juan 5:28-29"],
    ["f49", 5, "o5", "comprender", "¿Cuáles son las dos resurrecciones de Juan 5:29?", "La resurrección de vida y la resurrección de condenación", ["La del cuerpo y la del alma", "La de Israel y la de la iglesia", "La de hoy y la de mañana"], "«y los que hicieron lo bueno, saldrán a resurrección de vida; mas los que hicieron lo malo, a resurrección de condenación».", "Juan 5:28-29"],
    ["f50", 5, "o5", "analizar", "¿Qué es un cuerpo espiritual, según la lección?", "Un cuerpo real lleno de la vida del Espíritu, como el de Jesús resucitado", ["Un fantasma", "Un alma sin cuerpo", "Un cuerpo igual al de ahora, que vuelve a morir"], "«Se siembra cuerpo animal, resucitará cuerpo espiritual».", "1 Corintios 15:42-44"],
    // Lección 6 · La venida de Cristo, el juicio y la eternidad
    ["f51", 6, "o6", "recordar", "¿Qué es la venida de Cristo para la iglesia, según Tito 2:13?", "La esperanza bienaventurada", ["Una amenaza", "Un mito", "Un tema sin importancia"], "«aguardando la esperanza bienaventurada».", "Tito 2:13"],
    ["f52", 6, "o6", "comprender", "¿Qué confiesan todos los cristianos sobre la venida de Cristo?", "Que volverá en persona y de manera visible", ["Que ya volvió en secreto", "Que solo vuelve en espíritu", "Que no volverá"], "«así vendrá como le habéis visto ir al cielo».", "Hechos 1:11"],
    ["f53", 6, "o6", "recordar", "¿Quiénes resucitarán primero, según 1 Tesalonicenses 4:16?", "Los muertos en Cristo", ["Los incrédulos", "Los ángeles", "Los que estén vivos"], "«y los muertos en Cristo resucitarán primero».", "1 Tesalonicenses 4:16-17"],
    ["f54", 6, "o6", "comprender", "¿De dónde viene la palabra rapto, según la lección?", "De la traducción latina de la frase de 1 Tesalonicenses 4:17 sobre ser arrebatados", ["Del hebreo de Daniel", "Del griego de Apocalipsis 20", "De un concilio de la Edad Media"], "«seremos arrebatados juntamente con ellos en las nubes».", "1 Tesalonicenses 4:16-17"],
    ["f55", 6, "o6", "comprender", "¿Qué enseña el postribulacionismo?", "Que el arrebatamiento ocurrirá al final de la tribulación, en la venida visible de Cristo", ["Que ocurrirá antes de la tribulación", "Que no habrá tribulación", "Que ya ocurrió"], "«para recibir al Señor en el aire».", "1 Tesalonicenses 4:16-17"],
    ["f56", 6, "o6", "recordar", "¿Qué enseña el premilenarismo?", "Que Cristo vendrá antes del milenio y reinará mil años en la tierra", ["Que los mil años son una figura del presente", "Que el evangelio traerá la paz antes de que venga Cristo", "Que Cristo no reinará"], "«y vivieron y reinaron con Cristo mil años».", "Apocalipsis 20:4-6"],
    ["f57", 6, "o6", "analizar", "¿De quién viene el amilenarismo, según la lección?", "De Agustín", ["De Jonathan Edwards", "De Martín Lutero", "De las Asambleas de Dios"], "Agustín leyó los mil años como el reinado presente de Cristo.", "Apocalipsis 20:4-6"],
    ["f58", 6, "o6", "evaluar", "¿Cuál es la posición del ministerio sobre el orden de los últimos tiempos?", "Es un punto de la declaración de fe por confirmar", ["Es amilenarista", "Es postmilenarista", "No cree en la venida de Cristo"], "«aguardando la esperanza bienaventurada y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo».", "Tito 2:13"],
    ["f59", 6, "o6", "comprender", "¿Para qué comparecen los creyentes ante el tribunal de Cristo, según la lección?", "Para recibir según lo que hayan hecho, no para condenación", ["Para ser condenados", "Para volver a ser salvos", "Para juzgar a los ángeles"], "«para que cada uno reciba según lo que haya hecho mientras estaba en el cuerpo, sea bueno o sea malo».", "2 Corintios 5:10"],
    ["f60", 6, "o6", "evaluar", "¿Por qué la iglesia rechaza el universalismo, según la lección?", "Porque Jesús habló de castigo eterno y de vida eterna con la misma palabra", ["Porque nadie se salva", "Porque el cielo es solo para los líderes", "Porque la Biblia no habla del juicio"], "«E irán éstos al castigo eterno, y los justos a la vida eterna».", "Mateo 25:46"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué somos en Cristo, según Efesios 2:19?", "Conciudadanos de los santos y miembros de la familia de Dios", ["Extranjeros y advenedizos", "Visitantes de la iglesia", "Siervos sin familia"], "«sino conciudadanos de los santos, y miembros de la familia de Dios».", "Efesios 2:19-22"],
      ["m1-02", 1, "o1", "comprender", "¿Para qué somos edificados juntamente, según Efesios 2:22?", "Para morada de Dios en el Espíritu", ["Para tener un edificio propio", "Para separarnos de todos", "Para ser famosos"], "«en quien vosotros también sois juntamente edificados para morada de Dios en el Espíritu».", "Efesios 2:19-22"],
      ["m1-03", 1, "o1", "recordar", "¿Para qué somos pueblo adquirido por Dios, según 1 Pedro 2:9?", "Para anunciar las virtudes de aquel que nos llamó de las tinieblas a su luz admirable", ["Para gobernar a las naciones", "Para no tener problemas", "Para tener privilegios"], "«para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable».", "1 Pedro 2:9"],
      ["m1-04", 1, "o1", "aplicar", "¿Cómo mide el líder la salud de su iglesia, según la nota de la lección?", "Mira si persevera en la doctrina, la comunión, el partimiento del pan y la oración", ["Cuenta solo cuántos asisten", "Mide cuánto dinero entra", "Compara su edificio con otros"], "«Y perseveraban en la doctrina de los apóstoles».", "Hechos 2:42-47"],
      ["m1-05", 1, "o1", "recordar", "¿Qué hacía el Señor cada día, según Hechos 2:47?", "Añadía a la iglesia los que habían de ser salvos", ["Cerraba la iglesia", "Quitaba miembros", "Nada nuevo"], "«Y el Señor añadía cada día a la iglesia los que habían de ser salvos».", "Hechos 2:42-47"],
      ["m1-06", 1, "o1", "analizar", "¿Qué muestra que los primeros creyentes repartieran sus bienes?", "Que la comunión incluía cuidar las necesidades de cada uno", ["Que no tenían familias", "Que no trabajaban", "Que la ley los obligaba"], "«y lo repartían a todos según la necesidad de cada uno».", "Hechos 2:42-47"],
      ["m1-07", 2, "o2", "recordar", "¿Cómo encomendaron Pablo y Bernabé a los ancianos, según Hechos 14:23?", "Habiendo orado con ayunos, los encomendaron al Señor", ["Con una gran fiesta", "Con una votación", "Sin orar"], "«y habiendo orado con ayunos, los encomendaron al Señor en quien habían creído».", "Hechos 14:23"],
      ["m1-08", 2, "o2", "comprender", "¿Qué caracteriza a la forma de gobierno presbiteriana?", "La iglesia es guiada por ancianos reunidos en consejos", ["La guían obispos", "La congregación decide todo", "La guía un solo hombre sin consejo"], "La siguen las iglesias presbiterianas y reformadas.", "Hechos 14:23"],
      ["m1-09", 2, "o2", "recordar", "¿Qué debe tener el obispo ante los de afuera, según 1 Timoteo 3:7?", "Buen testimonio", ["Mucho dinero", "Fama", "Poder"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:1-7"],
      ["m1-10", 2, "o2", "aplicar", "¿Qué pregunta Pablo para mostrar la importancia de la familia del líder?", "El que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?", ["¿Quién tiene más hijos?", "¿Quién tiene la casa más grande?", "¿Quién visita más casas?"], "«pues el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?».", "1 Timoteo 3:1-7"],
      ["m1-11", 2, "o2", "analizar", "¿Qué textos citan las iglesias que reconocen a mujeres como pastoras, según la lección?", "Hechos 2:17-18, Romanos 16:1 y los ejemplos de Priscila y de Débora", ["Solo 1 Timoteo 2:12", "Ningún texto bíblico", "Solo textos fuera de la Biblia"], "«Y de cierto sobre mis siervos y sobre mis siervas en aquellos días Derramaré de mi Espíritu».", "Hechos 2:17-18"],
      ["m1-12", 2, "o2", "evaluar", "¿En qué coinciden las dos posiciones sobre el ministerio de la mujer, según la nota?", "En que hombres y mujeres llevan por igual la imagen de Dios y reciben los dones para servir", ["En que la mujer no debe servir", "En que el tema no tiene base bíblica", "En que solo los varones reciben dones"], "«vuestros hijos y vuestras hijas profetizarán».", "Hechos 2:17-18"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pasará con el que creyere y fuere bautizado, según Marcos 16:16?", "Será salvo", ["Será rico", "Será sacerdote", "Nada"], "«El que creyere y fuere bautizado, será salvo».", "Marcos 16:15-16"],
      ["m1-14", 3, "o3", "comprender", "¿Hasta dónde serían testigos los discípulos, según Hechos 1:8?", "Hasta lo último de la tierra", ["Solo en Jerusalén", "Solo en Judea", "Solo entre los judíos"], "«y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
      ["m1-15", 3, "o3", "recordar", "¿Cómo debe crecer la iglesia, según Efesios 4:15?", "Siguiendo la verdad en amor", ["Con fuerza y presión", "Sin la verdad", "Solo en números"], "«sino que siguiendo la verdad en amor, crezcamos en todo en aquel que es la cabeza, esto es, Cristo».", "Efesios 4:15-16"],
      ["m1-16", 3, "o3", "aplicar", "¿Qué hace la iglesia cuando sirve al prójimo, según la lección?", "Muestra con obras el evangelio que anuncia con palabras", ["Se olvida del evangelio", "Reemplaza la predicación", "Busca reconocimiento"], "«Así que, según tengamos oportunidad, hagamos bien a todos».", "Gálatas 6:10"],
      ["m1-17", 3, "o3", "comprender", "¿Cómo se bautiza, según el artículo 8 de la declaración de fe?", "En agua, por inmersión, a los que se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo", ["Solo a los recién nacidos", "Sin agua, solo con palabras", "En el nombre del pastor"], "«bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo».", "Mateo 28:18-20"],
      ["m1-18", 3, "o3", "evaluar", "¿Cómo viven la Santa Cena muchos evangélicos y pentecostales, según la nota?", "Sobre todo como un memorial de la muerte del Señor", ["Como la transubstanciación", "Como un rito sin sentido", "Como un sacrificio que se repite"], "«haced esto en memoria de mí».", "1 Corintios 11:23-26"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué dijo Gabriel que venía a dar, según Lucas 1:19?", "Buenas nuevas", ["Un castigo", "Una ley nueva", "Una advertencia de guerra"], "«y he sido enviado a hablarte, y darte estas buenas nuevas».", "Lucas 1:19"],
      ["m2-02", 4, "o4", "comprender", "¿Qué hizo Dios con los ángeles que no guardaron su dignidad, según Judas 6?", "Los guardó en prisiones eternas para el juicio del gran día", ["Los perdonó", "Los hizo hombres", "Les dio otra oportunidad en la tierra"], "«los ha guardado bajo oscuridad, en prisiones eternas, para el juicio del gran día».", "Judas 1:6"],
      ["m2-03", 4, "o4", "recordar", "¿Qué pasó con los ángeles del dragón, según Apocalipsis 12:9?", "Fueron arrojados con él", ["Se quedaron en el cielo", "Se volvieron buenos", "Desaparecieron"], "«y sus ángeles fueron arrojados con él».", "Apocalipsis 12:9"],
      ["m2-04", 4, "o4", "aplicar", "Alguien quiere enseñar los nombres de muchos ángeles y sus jerarquías. ¿Qué le aconseja la lección?", "No inventar lo que la Escritura no da", ["Que lo enseñe en toda la iglesia", "Que pida mensajes a los ángeles", "Que consulte a un adivino"], "«Yo soy Gabriel, que estoy delante de Dios».", "Lucas 1:19"],
      ["m2-05", 4, "o4", "analizar", "¿Qué enseña Colosenses 2:15 sobre el poder del diablo?", "Que fue vencido en la cruz, aunque todavía ataca", ["Que es igual al de Dios", "Que el diablo no existe", "Que crece sin límite"], "«triunfando sobre ellos en la cruz».", "Colosenses 2:15"],
      ["m2-06", 4, "o4", "evaluar", "¿En quién pone los ojos el líder al enseñar sobre el enemigo, según la nota?", "En Cristo, no en el diablo", ["En el diablo, para conocerlo bien", "En las señales", "En sus propias fuerzas"], "«sabiendo que los mismos padecimientos se van cumpliendo en vuestros hermanos en todo el mundo».", "1 Pedro 5:8-9"],
      ["m2-07", 5, "o5", "recordar", "¿Qué viene después de la muerte, según Hebreos 9:27?", "El juicio", ["Otra vida en la tierra", "El olvido", "Nada"], "«y después de esto el juicio».", "Hebreos 9:27"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué Pablo no sabía qué escoger, según Filipenses 1:22-23?", "Porque vivir servía a la obra, pero partir y estar con Cristo era muchísimo mejor", ["Porque temía la muerte", "Porque no creía en el cielo", "Porque quería vivir para siempre en la tierra"], "«Mas si el vivir en la carne resulta para mí en beneficio de la obra, no sé entonces qué escoger».", "Filipenses 1:21-23"],
      ["m2-09", 5, "o5", "recordar", "¿Cómo se siembra y cómo resucita el cuerpo, según 1 Corintios 15:43?", "Se siembra en deshonra y resucitará en gloria", ["Se siembra en gloria y resucitará en deshonra", "Se siembra y no resucita", "Se siembra en poder y resucitará en debilidad"], "«Se siembra en deshonra, resucitará en gloria».", "1 Corintios 15:42-44"],
      ["m2-10", 5, "o5", "aplicar", "¿Cómo usa el líder el relato del rico y Lázaro, según la lección?", "Como una advertencia de Jesús, sin forzar cada detalle", ["Como un mapa exacto del más allá", "Como una fábula sin enseñanza", "Como prueba de la reencarnación"], "«y después de esto el juicio».", "Hebreos 9:27"],
      ["m2-11", 5, "o5", "analizar", "¿Qué muestra que Jesús resucitado comiera y se dejara tocar?", "Que el cuerpo resucitado es real, no un fantasma", ["Que no resucitó de verdad", "Que era solo un espíritu", "Que volvió a morir"], "«resucitará cuerpo espiritual».", "1 Corintios 15:42-44"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál es la esperanza completa del creyente, según la lección?", "La resurrección del cuerpo, y no solo que el alma vaya al cielo", ["Que el alma se libre del cuerpo para siempre", "Que el muerto vuelva en otra vida", "Que no haya juicio"], "«todos los que están en los sepulcros oirán su voz».", "Juan 5:28-29"],
      ["m2-13", 6, "o6", "recordar", "¿Cómo descenderá el Señor del cielo, según 1 Tesalonicenses 4:16?", "Con voz de mando, con voz de arcángel y con trompeta de Dios", ["En silencio total", "Con un ejército de hombres", "Con fuego del templo"], "«Porque el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo».", "1 Tesalonicenses 4:16-17"],
      ["m2-14", 6, "o6", "comprender", "¿Qué dice Apocalipsis 20:6 de los que tienen parte en la primera resurrección?", "Que la segunda muerte no tiene potestad sobre ellos y reinarán con él mil años", ["Que deben morir otra vez", "Que serán juzgados para condenación", "Que serán ángeles"], "«la segunda muerte no tiene potestad sobre éstos, sino que serán sacerdotes de Dios y de Cristo, y reinarán con él mil años».", "Apocalipsis 20:4-6"],
      ["m2-15", 6, "o6", "recordar", "¿Quiénes sostuvieron el postmilenarismo, según la lección?", "Muchos puritanos y Jonathan Edwards", ["Agustín y la iglesia católica", "Las Asambleas de Dios", "Los apóstoles"], "El postmilenarismo espera que el evangelio traiga un largo tiempo de paz antes de la venida de Cristo.", "Apocalipsis 20:4-6"],
      ["m2-16", 6, "o6", "aplicar", "¿Cómo enseña el líder los últimos tiempos, según la lección?", "Empieza por lo que la Biblia dice con claridad y presenta con respeto las posiciones", ["Pone fechas para animar a la iglesia", "Evita hablar de la venida de Cristo", "Dice que solo una posición es cristiana"], "«Pero del día y la hora nadie sabe».", "Mateo 24:36"],
      ["m2-17", 6, "o6", "analizar", "¿Qué decide el destino en el juicio del gran trono blanco, según Apocalipsis 20:15?", "Estar inscrito en el libro de la vida", ["Las riquezas", "La fama", "El lugar de nacimiento"], "«Y el que no se halló inscrito en el libro de la vida fue lanzado al lago de fuego».", "Apocalipsis 20:11-15"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué promete Apocalipsis 21:4 a los redimidos?", "Que Dios enjugará toda lágrima y que ya no habrá muerte, ni llanto, ni clamor, ni dolor", ["Que la tristeza seguirá", "Que habrá muerte, pero menos", "Que solo los líderes tendrán paz"], "«Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».", "Apocalipsis 21:1-4"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-sistematica-4-e1",
      tipo: "corta",
      pregunta: "Explica qué es la iglesia, la diferencia entre la iglesia universal y la local, y una imagen bíblica de la iglesia.",
      ideas: [
        { id: "universal", peso: 30, texto: "La iglesia universal es el cuerpo de todos los creyentes.", formas: ["universal", "todos los creyentes", "todos los que han creido", "toda epoca"] },
        { id: "local", peso: 30, texto: "La iglesia local es la congregación que se reúne en un lugar.", formas: ["local", "congregacion", "se reune", "un lugar"] },
        { id: "imagen", peso: 30, texto: "Una imagen bíblica: cuerpo, familia, templo o pueblo de sacerdotes.", formas: ["cuerpo", "familia de dios", "templo santo", "templo de dios", "real sacerdocio", "pueblo de dios", "pueblo adquirido", "piedra del angulo", "linaje escogido"] },
      ],
      citas: ["Efesios 1:22-23", "Efesios 1:23", "1 Corintios 12:12-13", "1 Corintios 12:12", "Efesios 2:19-22", "1 Pedro 2:9", "Mateo 16:18", "Hechos 2:42-47", "Hechos 2:42"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia es la asamblea de los llamados por Cristo. La iglesia universal es su cuerpo: todos los creyentes de toda época (Efesios 1:23). La iglesia local es la congregación que se reúne en un lugar. Una imagen bíblica es el cuerpo: es uno y tiene muchos miembros, y nadie se basta solo.",
    },
    {
      id: "n4-sistematica-4-e2",
      tipo: "corta",
      pregunta: "Explica las tres formas históricas de gobierno de la iglesia.",
      ideas: [
        { id: "episcopal", peso: 30, texto: "La episcopal: la guían obispos.", formas: ["episcopal", "obispos"] },
        { id: "presbiteriana", peso: 30, texto: "La presbiteriana: la guían ancianos reunidos en consejos.", formas: ["presbiterian*", "ancianos", "consejos"] },
        { id: "congregacional", peso: 30, texto: "La congregacional: la congregación toma las decisiones principales.", formas: ["congregacional", "la congregacion decide", "la congregacion toma", "decide la congregacion"] },
      ],
      citas: ["Hechos 14:23", "1 Timoteo 3:1-7", "Tito 1:5", "Hechos 20:28", "Efesios 4:11-13", "Hechos 6:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La forma episcopal pone a la iglesia bajo obispos, como la católica, la anglicana y la metodista. La presbiteriana la deja en manos de ancianos reunidos en consejos, como los de Hechos 14:23. La congregacional da a la congregación las decisiones principales, como hacen los bautistas. Muchas iglesias pentecostales combinan rasgos de las tres.",
    },
    {
      id: "n4-sistematica-4-e3",
      tipo: "corta",
      pregunta: "Explica el sentido del bautismo en agua y de la Santa Cena según el artículo 8 de la declaración de fe.",
      ideas: [
        { id: "bautismo", peso: 30, texto: "El bautismo en agua por inmersión de los que creyeron, como testimonio de que murieron al pecado y resucitaron a una vida nueva.", formas: ["inmersion", "murieron al pecado", "vida nueva", "nueva vida", "testimonio", "los que creyeron", "se arrepintieron"] },
        { id: "cena", peso: 30, texto: "La Santa Cena es un memorial de la muerte del Señor.", formas: ["memorial", "en memoria", "recordar", "muerte del senor"] },
        { id: "comunion", peso: 30, texto: "Es comunión con Cristo y con su pueblo, y anuncio de su venida.", formas: ["comunion", "hasta que el venga", "anuncio de su venida", "anuncia", "su venida"] },
      ],
      citas: ["1 Corintios 11:23-26", "1 Corintios 11:26", "1 Corintios 11:24", "Mateo 28:19", "Romanos 6:4", "Hechos 2:38-41"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El bautismo en agua es por inmersión, para los que se arrepintieron y creyeron, como testimonio de que murieron al pecado y resucitaron a una vida nueva. La Santa Cena es un memorial de la muerte del Señor. Es comunión con Cristo y con su pueblo, y anuncia su muerte hasta que él venga (1 Corintios 11:26).",
    },
    {
      id: "n4-sistematica-4-e4",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de maestros lo que la Biblia enseña sobre los ángeles, Satanás y los demonios, y cómo evitar los dos errores opuestos, con citas bíblicas.",
      ideas: [
        { id: "angeles", peso: 20, texto: "Los ángeles son espíritus creados que sirven a Dios a favor de los creyentes, y no se les adora.", formas: ["espiritus ministradores", "ejecutan su palabra", "no se les adora", "no se adoran", "creados por dios", "herederos de la salvacion"] },
        { id: "caidos", peso: 20, texto: "Satanás y los demonios son ángeles caídos que engañan.", formas: ["angeles caidos", "cayeron", "engaña", "engana", "serpiente antigua", "no guardaron su dignidad"] },
        { id: "victoria", peso: 25, texto: "Cristo los venció en la cruz.", formas: ["cruz", "vencido", "vencio", "triunfando", "triunfo", "despojo", "despojando"] },
        { id: "resistir", peso: 20, texto: "El creyente los resiste firme en la fe.", formas: ["resistid", "resistir", "resistimos", "resiste", "firmes en la fe", "firme en la fe", "someteos"] },
        { id: "errores", peso: 15, texto: "Dos errores: no creer en ellos o darles demasiada atención.", formas: ["dos errores", "no creer", "excesiv*", "demasiada atencion", "obsesion*", "malsan*"] },
      ],
      basta: 85,
      citas: ["Hebreos 1:14", "Salmos 103:20", "Lucas 1:19", "Judas 1:9", "Judas 1:6", "Apocalipsis 12:9", "1 Pedro 5:8-9", "1 Pedro 5:8", "1 Pedro 5:9", "Colosenses 2:15", "Santiago 4:7", "Efesios 6:12"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, los ángeles son espíritus creados por Dios: son espíritus ministradores, enviados para servicio a favor de los herederos de la salvación (Hebreos 1:14). Ejecutan su palabra, y no se les adora. La Biblia nombra a Gabriel y al arcángel Miguel, y no debemos inventar más. Satanás y los demonios son ángeles caídos: el diablo es la serpiente antigua que engaña al mundo entero, y sus ángeles fueron arrojados con él. Anda como león rugiente, pero Cristo lo venció en la cruz, triunfando sobre los principados y las potestades. Por eso lo resistimos firmes en la fe (1 Pedro 5:9). Hay dos errores opuestos: no creer en los demonios o interesarse en ellos de manera excesiva. Ponemos los ojos en Cristo.",
    },
    {
      id: "n4-sistematica-4-e5",
      tipo: "breve",
      pregunta:
        "Un hermano te pregunta qué pasará cuando Cristo vuelva. Explícale con respeto lo que todos los cristianos confiesan, las posiciones sobre el arrebatamiento y el milenio, y lo que el ministerio todavía debe confirmar, con citas bíblicas.",
      ideas: [
        { id: "venida", peso: 25, texto: "Cristo volverá en persona y de manera visible, y nadie sabe la fecha.", formas: ["en persona", "visible", "asi vendra", "como le habeis visto", "nadie sabe", "esperanza bienaventurada"] },
        { id: "arrebatamiento", peso: 20, texto: "Los muertos en Cristo resucitarán y los vivos serán arrebatados; hay posiciones sobre el momento.", formas: ["arrebata*", "rapto", "pretribulacion*", "postribulacion*", "tribulacion", "muertos en cristo"] },
        { id: "milenio", peso: 20, texto: "El premilenarismo, el amilenarismo y el postmilenarismo.", formas: ["milenio", "premilenar*", "amilenar*", "postmilenar*", "mil anos"] },
        { id: "confirmar", peso: 20, texto: "La posición del ministerio está por confirmar.", formas: ["por confirmar", "el ministerio", "declaracion de fe"] },
        { id: "juicio", peso: 15, texto: "Habrá juicio y un destino eterno.", formas: ["juicio", "tribunal", "trono blanco", "eterno", "eterna", "cielo nuevo", "tierra nueva"] },
      ],
      basta: 85,
      citas: ["Hechos 1:11", "Tito 2:13", "1 Tesalonicenses 4:16-17", "1 Tesalonicenses 4:16", "1 Tesalonicenses 4:17", "Mateo 24:36", "Apocalipsis 20:4-6", "Apocalipsis 20:4", "2 Corintios 5:10", "Apocalipsis 20:11-15", "Mateo 25:46", "Apocalipsis 21:1-4", "Juan 14:3"],
      pesoCita: 10,
      errores: [
        { id: "fecha", anula: "venida", texto: "Nadie sabe el día ni la hora (Mateo 24:36): no se le pone fecha a la venida de Cristo.", formas: ["la fecha es", "sera en el ano", "ya sabemos la fecha", "se sabe la fecha"] },
      ],
      modelo:
        "Querido hermano, todos los cristianos confiesan que Cristo volverá en persona y de manera visible: así vendrá como lo vieron ir al cielo (Hechos 1:11), y nadie sabe el día ni la hora. Los muertos en Cristo resucitarán primero, y los creyentes que vivan serán arrebatados para recibir al Señor en el aire (1 Tesalonicenses 4:17). Los evangélicos difieren sobre el momento: el pretribulacionismo, que enseñan las Asambleas de Dios, lo pone antes de la gran tribulación, y el postribulacionismo, al final. Sobre el milenio, el premilenarismo espera un reino de mil años de Cristo en la tierra, el amilenarismo lo lee como el reinado presente de Cristo y el postmilenarismo espera un tiempo de paz antes de su venida. Nuestro ministerio todavía debe confirmar su posición en la declaración de fe. Lo seguro es que habrá juicio ante el tribunal de Cristo y un destino eterno, y que Dios hará un cielo nuevo y una tierra nueva.",
    },
  ],
  breve: {
    id: "n4-sistematica-4-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo enseñarías a un grupo de nuevos líderes la doctrina de la iglesia y de los últimos tiempos: qué es la iglesia y cuál es su misión, sus ordenanzas y la esperanza de la venida de Cristo, con citas bíblicas.",
    ideas: [
      { id: "iglesia", peso: 25, texto: "La iglesia es el cuerpo de Cristo, universal y local.", formas: ["cuerpo de cristo", "su cuerpo", "universal", "local", "asamblea", "congregacion"] },
      { id: "mision", peso: 25, texto: "Su misión es la gran comisión: hacer discípulos con el poder del Espíritu.", formas: ["gran comision", "haced discipulos", "hacer discipulos", "predicad el evangelio", "testigos", "id por todo el mundo"] },
      { id: "ordenanzas", peso: 20, texto: "El bautismo en agua y la Santa Cena.", formas: ["bautismo", "santa cena", "ordenanza*", "cena del senor"] },
      { id: "venida", peso: 20, texto: "Cristo volverá en persona y de manera visible.", formas: ["volvera", "vendra", "venida", "esperanza bienaventurada", "regreso"] },
      { id: "eternidad", peso: 10, texto: "La resurrección, el juicio y la vida eterna.", formas: ["resurreccion", "resucitaran", "juicio", "eterna", "eterno", "cielo nuevo"] },
    ],
    basta: 85,
    citas: ["Tito 2:13", "Mateo 16:18", "Efesios 1:22-23", "Hechos 2:42-47", "Hechos 2:42", "Mateo 28:18-20", "Mateo 28:19", "Marcos 16:15", "Hechos 1:8", "1 Corintios 11:26", "Hechos 1:11", "1 Tesalonicenses 4:16-17", "Apocalipsis 21:1-4", "Juan 5:28-29", "2 Corintios 5:10"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría diciendo que la iglesia es de Cristo: él la edifica, y las puertas del Hades no prevalecerán contra ella (Mateo 16:18). Es su cuerpo, universal en todos los creyentes y local en la congregación que se reúne, y persevera en la doctrina, la comunión, el partimiento del pan y la oración. Su misión es la gran comisión: id, y haced discípulos a todas las naciones, con el poder del Espíritu Santo. Cristo le dejó dos ordenanzas: el bautismo en agua de los que creyeron y la Santa Cena, que anuncia su muerte hasta que él venga. Y vive con la esperanza bienaventurada: Cristo volverá en persona, los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas (Tito 2:13). Les pediría enseñar con firmeza lo que todos confesamos, y con respeto lo que todavía está por confirmar.",
  },
};
