/**
 * El banco de «Campañas y cruzadas» (especialidad Evangelismo y misiones). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la proclamación pública en la Biblia · o2 lecciones de la historia · o3 preparar una campaña · o4 el
 * mensaje y el llamado · o5 consejeros y seguimiento · o6 integridad y evaluación · o7 el versículo de memoria
 * (2 Timoteo 4:5).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `evangelismo-misiones-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_EVANGELISMO_MISIONES_2: BancoMateria = {
  materia: "evangelismo-misiones-2",
  repaso: {
    "evangelismo-misiones-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué sintió Jesús al ver las multitudes, según Mateo 9:36?", "Compasión", ["Enojo", "Indiferencia", "Miedo"], "«al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:35-38"],
      ["1-r2", 1, "o1", "recordar", "¿Cómo respondieron los de Nínive a la predicación de Jonás?", "Creyeron a Dios", ["Lo expulsaron", "Se burlaron", "No le prestaron atención"], "«los hombres de Nínive creyeron a Dios».", "Jonás 3:4-5"],
      ["1-r3", 1, "o1", "comprender", "¿Qué fue lo más importante después de Pentecostés, según la lección?", "Que los nuevos creyentes perseveraban en la doctrina, la comunión, el partimiento del pan y las oraciones", ["Que se reunió una multitud", "Que hubo música", "Que se recogió mucho dinero"], "«perseveraban en la doctrina de los apóstoles».", "Hechos 2:41-42"],
    ] as P[]).map(p),
    "evangelismo-misiones-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿A quiénes empezó a predicar Whitefield al aire libre en 1739?", "A los mineros de Kingswood, cerca de Bristol", ["A los reyes de Inglaterra", "A los estudiantes de una universidad", "A los marineros de un barco"], "Era gente que casi nunca entraba en una iglesia.", "Romanos 10:14-15"],
      ["2-r2", 2, "o2", "recordar", "¿Cuánto duró la campaña de Billy Graham en Nueva York en 1957?", "Dieciséis semanas", ["Un día", "Una semana", "Diez años"], "Fue en el Madison Square Garden.", "Romanos 10:14-15"],
      ["2-r3", 2, "o2", "comprender", "¿Qué pregunta de Pablo explica por qué Whitefield y Wesley salieron a buscar a la gente?", "¿Y cómo oirán sin haber quien les predique?", ["¿Quién es mi prójimo?", "¿Qué haré para heredar la vida eterna?", "¿Hasta cuándo, Señor?"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    ] as P[]).map(p),
    "evangelismo-misiones-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué hacían los discípulos antes de Pentecostés, según Hechos 1:14?", "Perseveraban unánimes en oración y ruego", ["Discutían entre ellos", "Se escondían en silencio", "Preparaban un escenario"], "«perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
      ["3-r2", 3, "o3", "comprender", "¿Para qué oró Jesús que todos sean uno, según Juan 17:21?", "Para que el mundo crea que el Padre lo envió", ["Para que la iglesia sea poderosa", "Para que no haya trabajo", "Para que todos piensen igual en todo"], "«para que el mundo crea que tú me enviaste».", "Juan 17:21"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué enseña Lucas 14:28 para una campaña?", "Calcular los gastos antes de empezar", ["Empezar y ver qué pasa", "Pedir prestado sin límite", "Que el dinero no importa"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ] as P[]).map(p),
    "evangelismo-misiones-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué se propuso saber Pablo entre los corintios?", "A Jesucristo, y a éste crucificado", ["La sabiduría de los griegos", "Muchas historias", "La ley de Moisés"], "«no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado».", "1 Corintios 2:1-5"],
      ["4-r2", 4, "o4", "comprender", "¿A qué renunció Pablo, según 2 Corintios 4:2?", "A andar con astucia y a adulterar la palabra de Dios", ["A predicar", "A orar", "A viajar"], "«no andando con astucia, ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
      ["4-r3", 4, "o4", "aplicar", "En un llamado honesto, ¿qué se dice de pasar al frente?", "Que es un paso visible, pero no es lo que salva", ["Que es lo que salva", "Que es obligatorio", "Que no sirve para nada"], "Salva Cristo, por medio del arrepentimiento y la fe.", "Hechos 2:38"],
    ] as P[]).map(p),
    "evangelismo-misiones-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Para qué trabajaba Pablo, según Colosenses 1:28?", "Para presentar perfecto en Cristo Jesús a todo hombre", ["Para llenar estadios", "Para hacerse famoso", "Para juntar dinero"], "«a fin de presentar perfecto en Cristo Jesús a todo hombre».", "Colosenses 1:28"],
      ["5-r2", 5, "o5", "comprender", "¿Qué hace el consejero con los datos de la persona?", "Los anota solo con su permiso y los entrega a una iglesia cercana a su casa", ["Los publica", "Los guarda para sí", "Los anota sin preguntarle"], "Así la persona puede recibir cuidado en una iglesia cerca de su casa.", "Colosenses 1:28"],
      ["5-r3", 5, "o5", "aplicar", "¿Cuándo se contacta a quien respondió en la campaña?", "Pronto: con una llamada o una visita en los días siguientes", ["Un año después", "Nunca", "Solo si vuelve por su cuenta"], "«os he puesto para que vayáis y llevéis fruto, y vuestro fruto permanezca».", "Juan 15:16"],
    ] as P[]).map(p),
    "evangelismo-misiones-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿En qué año y lugar se comprometieron Billy Graham y su equipo a cuidar cuatro áreas?", "En 1948, en Modesto, California", ["En 1739, en Bristol", "En 1957, en Nueva York", "En 1918, en Londres"], "Cuidaron el dinero, la pureza, la honestidad al informar y el trabajo con las iglesias del lugar.", "2 Corintios 8:21"],
      ["6-r2", 6, "o6", "comprender", "¿Qué dice Pablo que nunca usó, según 1 Tesalonicenses 2:5?", "Palabras lisonjeras", ["La Escritura", "La oración", "El amor"], "«nunca usamos de palabras lisonjeras».", "1 Tesalonicenses 2:3-5"],
      ["6-r3", 6, "o6", "aplicar", "¿Cómo se evalúa mejor una campaña?", "Por su fruto: personas que siguen en una iglesia meses después", ["Solo por la cantidad de público", "Por el tamaño del escenario", "Por lo que se recaudó"], "«vuestro fruto permanezca».", "Juan 15:16"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: la proclamación pública en la Biblia (10)
    ["f01", 1, "o1", "recordar", "¿Qué pidió Pablo a Timoteo en 2 Timoteo 4:5?", "Que hiciera obra de evangelista y cumpliera su ministerio", ["Que dejara de predicar", "Que construyera un templo", "Que volviera a su casa"], "«haz obra de evangelista, cumple tu ministerio».", "2 Timoteo 4:5"],
    ["f02", 1, "o1", "recordar", "¿Qué hacía Jesús en las ciudades y aldeas, según Mateo 9:35?", "Enseñaba y predicaba el evangelio del reino", ["Organizaba ejércitos", "Cobraba impuestos", "Evitaba a la gente"], "«Recorría Jesús todas las ciudades y aldeas, enseñando en las sinagogas de ellos, y predicando el evangelio del reino».", "Mateo 9:35-38"],
    ["f03", 1, "o1", "comprender", "¿Cómo estaban las multitudes, según Mateo 9:36?", "Desamparadas y dispersas como ovejas sin pastor", ["Felices y satisfechas", "Organizadas y guiadas", "Ricas y tranquilas"], "«estaban desamparadas y dispersas como ovejas que no tienen pastor».", "Mateo 9:35-38"],
    ["f04", 1, "o1", "comprender", "¿De dónde debe nacer una campaña, según la lección?", "De la compasión de Jesús por las personas", ["Del deseo de llenar un lugar", "De la competencia entre iglesias", "De la búsqueda de fama"], "«al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:35-38"],
    ["f05", 1, "o1", "recordar", "¿Dónde predicó Jonás?", "Por las calles de Nínive", ["En Jerusalén", "En Samaria", "En Atenas"], "«Y comenzó Jonás a entrar por la ciudad, camino de un día».", "Jonás 3:4-5"],
    ["f06", 1, "o1", "recordar", "¿Cuántas personas se añadieron el día de Pentecostés, según Hechos 2:41?", "Como tres mil", ["Como cien", "Como quinientas", "Como diez mil"], "«se añadieron aquel día como tres mil personas».", "Hechos 2:41-42"],
    ["f07", 1, "o1", "recordar", "¿A quién predicaba Felipe en Samaria?", "A Cristo", ["A Moisés", "A sí mismo", "A los profetas"], "«Entonces Felipe, descendiendo a la ciudad de Samaria, les predicaba a Cristo».", "Hechos 8:5-8"],
    ["f08", 1, "o1", "comprender", "¿Qué había en Samaria después de la predicación de Felipe?", "Gran gozo en aquella ciudad", ["Gran tristeza", "Una guerra", "Silencio"], "«así que había gran gozo en aquella ciudad».", "Hechos 8:5-8"],
    ["f09", 1, "o1", "analizar", "¿Por qué muchos prefieren decir campaña en vez de cruzada?", "Porque cruzada recuerda las guerras de la Edad Media, que nada tienen que ver con el evangelio", ["Porque campaña es una palabra más corta", "Porque cruzada es una palabra de la Biblia", "Porque las campañas son solo políticas"], "La palabra cruzada recuerda las guerras de la Edad Media.", "2 Timoteo 4:5"],
    ["f10", 1, "o7", "recordar", "Completa 2 Timoteo 4:5: Pero tú sé sobrio en todo, soporta las aflicciones…", "haz obra de evangelista, cumple tu ministerio", ["descansa y no te preocupes", "busca tu propio provecho", "habla solo con los tuyos"], "Es el versículo de memoria de la materia.", "2 Timoteo 4:5"],
    // ---- lección 2: lecciones de la historia (10)
    ["f11", 2, "o2", "recordar", "¿Dónde enseñó Pablo cada día durante dos años, según Hechos 19:9?", "En la escuela de uno llamado Tiranno", ["En el templo de Jerusalén", "En la cárcel de Filipos", "En una sinagoga de Roma"], "«discutiendo cada día en la escuela de uno llamado Tiranno».", "Hechos 19:9-10"],
    ["f12", 2, "o2", "comprender", "¿Qué resultado tuvo la enseñanza diaria de Pablo durante dos años?", "Todos los que habitaban en Asia oyeron la palabra del Señor Jesús", ["Nadie quiso oírlo", "Lo expulsaron el primer día", "Solo lo oyeron los judíos"], "«todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».", "Hechos 19:9-10"],
    ["f13", 2, "o2", "recordar", "¿Quién empezó a predicar al aire libre en febrero de 1739?", "George Whitefield", ["Billy Graham", "Martín Lutero", "Juan Calvino"], "Predicó a los mineros de Kingswood, cerca de Bristol.", "Romanos 10:14-15"],
    ["f14", 2, "o2", "recordar", "¿Quién siguió el ejemplo de Whitefield en abril de 1739?", "John Wesley", ["Billy Graham", "Juan Calvino", "Martín Lutero"], "Lo hizo en Bristol.", "Romanos 10:14-15"],
    ["f15", 2, "o2", "comprender", "¿Qué tenían en común los primeros oyentes de Whitefield?", "Casi nunca entraban en una iglesia", ["Eran pastores", "Eran nobles", "Eran estudiantes de teología"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    ["f16", 2, "o2", "recordar", "¿En qué siglo predicó Billy Graham sus campañas?", "En el siglo XX", ["En el siglo XVIII", "En el siglo I", "En el siglo XV"], "Billy Graham vivió de 1918 a 2018.", "2 Timoteo 4:5"],
    ["f17", 2, "o2", "comprender", "¿Cómo se preparaban las campañas de Billy Graham, según la lección?", "Con tiempo, con las iglesias de cada ciudad y con consejeros preparados", ["Sin preparación", "Solo con publicidad", "Sin las iglesias del lugar"], "Los consejeros atendían a quienes respondían.", "Romanos 10:14-15"],
    ["f18", 2, "o2", "aplicar", "¿Qué lección de la historia aplica una iglesia que predica en un parque donde la gente se reúne?", "Salir adonde está la gente", ["Esperar a que lleguen al templo", "Evitar los lugares públicos", "Predicar solo a los creyentes"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    ["f19", 2, "o2", "analizar", "¿Por qué esta materia dedica una lección entera a la integridad?", "Porque en la historia también hubo campañas que buscaron números, emociones o dinero", ["Porque las campañas siempre fueron perfectas", "Porque la integridad no importa", "Porque solo los pastores la necesitan"], "La historia enseña también con sus errores.", "1 Tesalonicenses 2:3-5"],
    ["f20", 2, "o2", "evaluar", "¿Qué campaña aprende mejor de la historia?", "Una que sale adonde está la gente, predica a Cristo con claridad, trabaja con las iglesias y cuida a los que responden", ["Una que busca el mayor público a cualquier costo", "Una que trabaja sola, sin las iglesias del lugar", "Una que termina el último día sin seguimiento"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    // ---- lección 3: preparar una campaña (10)
    ["f21", 3, "o3", "recordar", "¿Cómo perseveraban los discípulos antes de Pentecostés?", "Unánimes en oración y ruego", ["Divididos y en silencio", "Ocupados en negocios", "Cada uno por su lado"], "«Todos éstos perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
    ["f22", 3, "o3", "comprender", "¿Por qué la oración va primero en una campaña?", "Porque la preparación espiritual sostiene todo lo demás", ["Porque así no hace falta planificar", "Porque es solo una costumbre", "No va primero"], "«perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
    ["f23", 3, "o3", "comprender", "¿Qué testimonio dan las iglesias que se unen para anunciar a Cristo?", "Muestran la unidad por la que oró Jesús, para que el mundo crea", ["Muestran que todas piensan igual en todo", "Muestran que una es mejor que otra", "Ninguno"], "«para que todos sean uno».", "Juan 17:21"],
    ["f24", 3, "o3", "recordar", "¿Qué se forma con las iglesias que participan en una campaña?", "Un comité con responsables", ["Una nueva denominación", "Un partido político", "Nada"], "«para que todos sean uno».", "Juan 17:21"],
    ["f25", 3, "o3", "aplicar", "¿Qué se define en el paso de definir?", "El propósito, el público, el lugar y las fechas", ["Quién se queda con el dinero", "Solo la música", "Solo el nombre del evangelista"], "Después se calcula el presupuesto.", "Lucas 14:28"],
    ["f26", 3, "o3", "aplicar", "¿Qué incluye el paso de cumplir?", "Los permisos de la ciudad, la seguridad y el cuidado de los niños", ["Cumplir una meta de dinero", "Cumplir los deseos del evangelista", "Nada en especial"], "Para las dudas legales se consulta a un profesional.", "Lucas 14:28"],
    ["f27", 3, "o3", "aplicar", "¿A quiénes se prepara antes de la campaña?", "A los consejeros, los músicos, los ujieres y el equipo de seguimiento", ["Solo al predicador", "A nadie", "Solo a los músicos"], "Un equipo preparado cuida a los que responden.", "Colosenses 1:28"],
    ["f28", 3, "o3", "aplicar", "¿Por quiénes se empieza a invitar, según la lección?", "Por las personas por las que cada iglesia ya ora", ["Por los famosos de la ciudad", "Por los que ya son creyentes", "Por nadie en especial"], "Se invita en persona y por los medios.", "Mateo 9:35-38"],
    ["f29", 3, "o3", "analizar", "¿Qué puede pasar con una campaña sin presupuesto?", "Puede dejar deudas y un mal testimonio", ["Siempre sale mejor", "No pasa nada", "Alcanza a más personas"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f30", 3, "o3", "evaluar", "¿Qué preparación de campaña es mejor?", "Oración y unidad primero, y después propósito, presupuesto, permisos, equipos e invitación en persona", ["Publicidad primero y oración si hay tiempo", "Un solo organizador que decide todo", "Empezar sin permisos para ganar tiempo"], "«para que el mundo crea que tú me enviaste».", "Juan 17:21"],
    // ---- lección 4: el mensaje y el llamado (10)
    ["f31", 4, "o4", "recordar", "Según 1 Corintios 2:4, ¿cómo no fue la predicación de Pablo?", "Con palabras persuasivas de humana sabiduría", ["Con demostración del Espíritu", "Con el poder de Dios", "Con temor y temblor"], "«ni mi palabra ni mi predicación fue con palabras persuasivas de humana sabiduría».", "1 Corintios 2:1-5"],
    ["f32", 4, "o4", "comprender", "¿En qué debía fundarse la fe de los corintios?", "En el poder de Dios", ["En la sabiduría de los hombres", "En la elocuencia del predicador", "En las emociones"], "«para que vuestra fe no esté fundada en la sabiduría de los hombres, sino en el poder de Dios».", "1 Corintios 2:1-5"],
    ["f33", 4, "o4", "recordar", "¿A quién no se predicaba Pablo, según 2 Corintios 4:5?", "A sí mismo", ["A Jesucristo como Señor", "A los gentiles", "A los judíos"], "«Porque no nos predicamos a nosotros mismos, sino a Jesucristo como Señor».", "2 Corintios 4:5"],
    ["f34", 4, "o4", "comprender", "¿Quién es el protagonista de una campaña, según la lección?", "Cristo", ["El evangelista", "Los músicos", "El organizador"], "«sino a Jesucristo como Señor».", "2 Corintios 4:5"],
    ["f35", 4, "o4", "recordar", "¿Qué respondió Pedro a la multitud en Hechos 2:38?", "Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo", ["Volved a vuestras casas", "Guardad la ley de Moisés", "Dad ofrendas al templo"], "«Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados».", "Hechos 2:38"],
    ["f36", 4, "o4", "aplicar", "¿Qué explica primero un llamado honesto?", "Qué significa responder: arrepentirse de los pecados y confiar en Cristo", ["Cuánto hay que ofrendar", "Que hay que pasar al frente para salvarse", "Nada: solo pide levantar la mano"], "Responder es arrepentirse y confiar en Cristo.", "Hechos 2:38"],
    ["f37", 4, "o4", "aplicar", "¿Qué evita un llamado honesto?", "La presión, la música que manipula y las promesas falsas", ["La Biblia", "La oración", "La explicación del evangelio"], "«no andando con astucia, ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
    ["f38", 4, "o4", "aplicar", "¿Qué se explica al final del llamado?", "Lo que sigue: la Biblia, la oración y una iglesia cercana", ["Que ya no hace falta nada más", "Cuándo será la próxima campaña", "Nada"], "«perseveraban en la doctrina de los apóstoles».", "Hechos 2:41-42"],
    ["f39", 4, "o4", "analizar", "¿Por qué es dañino un llamado manipulado?", "Porque deja la decisión fundada en la presión y no en el poder de Dios", ["Porque dura poco tiempo", "Porque usa la Biblia", "No es dañino"], "«para que vuestra fe no esté fundada en la sabiduría de los hombres, sino en el poder de Dios».", "1 Corintios 2:1-5"],
    ["f40", 4, "o4", "evaluar", "¿Qué llamado es más fiel?", "Uno que explica el arrepentimiento y la fe, da libertad e invita a un paso visible sin confundirlo con lo que salva", ["Uno que repite el llamado hasta que alguien pase", "Uno que promete sanidad y riqueza a los que pasen", "Uno que asegura que pasar al frente salva"], "«no andando con astucia, ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
    // ---- lección 5: consejeros y seguimiento (10)
    ["f41", 5, "o5", "recordar", "¿Cuál es la meta de Colosenses 1:28?", "Presentar perfecto en Cristo Jesús a todo hombre", ["Llenar una tarjeta de decisión", "Contar a las personas", "Juntar una multitud"], "«a fin de presentar perfecto en Cristo Jesús a todo hombre».", "Colosenses 1:28"],
    ["f42", 5, "o5", "comprender", "¿Qué es lo más importante de una campaña, según la lección?", "Cuidar a los que respondieron", ["El escenario", "La música", "La cantidad de público"], "«vuestro fruto permanezca».", "Juan 15:16"],
    ["f43", 5, "o5", "recordar", "¿De dónde viene el consejero de una campaña?", "De una de las iglesias que participan", ["De una empresa de eventos", "De cualquier parte, sin preparación", "Del gobierno de la ciudad"], "Es un creyente maduro y preparado.", "Colosenses 1:28"],
    ["f44", 5, "o5", "aplicar", "¿Qué hace el consejero con la persona que responde?", "La escucha, le explica el evangelio con la Biblia y ora con ella", ["Le pide dinero", "Le da un folleto y se va", "La presiona para que se una a su iglesia"], "«a quien anunciamos, amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría».", "Colosenses 1:28"],
    ["f45", 5, "o5", "aplicar", "¿Qué no hace un buen consejero?", "Presionar ni prometer lo que no puede cumplir", ["Escuchar", "Orar", "Explicar el evangelio"], "El consejero sirve a la persona, no a los números.", "Colosenses 1:28"],
    ["f46", 5, "o5", "recordar", "¿Qué quiere Jesús del fruto, según Juan 15:16?", "Que permanezca", ["Que sea rápido", "Que sea numeroso", "Que se vea grande"], "«os he puesto para que vayáis y llevéis fruto, y vuestro fruto permanezca».", "Juan 15:16"],
    ["f47", 5, "o5", "aplicar", "¿Qué se le da al nuevo creyente en el seguimiento?", "Una Biblia y un plan de lectura sencillo", ["Una lista de reglas", "Una deuda", "Nada"], "También se le asigna un acompañante.", "Colosenses 1:28"],
    ["f48", 5, "o5", "aplicar", "¿Para qué se lleva un registro en el seguimiento?", "Para que nadie se pierda", ["Para publicar los nombres", "Para presumir los números", "Para cobrar a las iglesias"], "«vuestro fruto permanezca».", "Juan 15:16"],
    ["f49", 5, "o5", "analizar", "¿Por qué la consolidación se planifica desde el principio?", "Porque es la otra mitad de toda campaña", ["Porque no importa", "Porque solo se hace si sobra tiempo", "Porque reemplaza la predicación"], "La consolidación del Nivel 3 es la otra mitad de toda campaña.", "Colosenses 1:28"],
    ["f50", 5, "o5", "evaluar", "¿Qué seguimiento es mejor?", "Contacto pronto, grupo de nuevos creyentes, Biblia, acompañante y registro", ["Esperar a que vuelvan solos", "Enviar un mensaje general a todos", "Entregar las tarjetas a una sola iglesia y olvidarse"], "«vuestro fruto permanezca».", "Juan 15:16"],
    // ---- lección 6: integridad y evaluación (10)
    ["f51", 6, "o6", "recordar", "¿Dónde se comprometió Billy Graham con su equipo a cuidar cuatro áreas?", "En Modesto, California", ["En Nueva York", "En Bristol", "En Londres"], "Fue en 1948.", "2 Corintios 8:21"],
    ["f52", 6, "o6", "recordar", "¿Qué cuatro áreas cuidaron en Modesto?", "El dinero, la pureza, la honestidad al informar y el trabajo con las iglesias del lugar", ["La música, la ropa, el idioma y la comida", "El poder, la fama, la política y los viajes", "Solo el dinero"], "Las cuatro protegían el testimonio del evangelio.", "2 Corintios 8:21"],
    ["f53", 6, "o6", "comprender", "¿Qué decidió el equipo de Billy Graham sobre la pureza?", "No quedarse nunca a solas con una mujer que no fuera su esposa", ["Que no importaba", "Viajar siempre solos", "Que cada uno decidiera"], "Evitaban toda situación que diera lugar a la tentación o a la sospecha.", "1 Tesalonicenses 2:3-5"],
    ["f54", 6, "o6", "comprender", "¿Qué significa la honestidad al informar?", "No exagerar los números ni los resultados", ["Informar solo lo bueno", "No informar nada", "Inflar las cifras para animar"], "«nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo».", "1 Tesalonicenses 2:3-5"],
    ["f55", 6, "o6", "recordar", "¿Qué no encubrió Pablo, según 1 Tesalonicenses 2:5?", "Avaricia", ["La verdad", "El evangelio", "Su fe"], "«ni encubrimos avaricia; Dios es testigo».", "1 Tesalonicenses 2:3-5"],
    ["f56", 6, "o6", "comprender", "¿A quién buscaba agradar Pablo al hablar?", "A Dios, que prueba los corazones", ["A los hombres", "A los ricos", "A las autoridades"], "«no como para agradar a los hombres, sino a Dios, que prueba nuestros corazones».", "1 Tesalonicenses 2:3-5"],
    ["f57", 6, "o6", "aplicar", "¿Cómo se maneja el dinero de una campaña, según la lección?", "Con presupuesto conocido, dos personas que cuentan las ofrendas e informe final", ["Lo maneja una sola persona sin informar", "Sin presupuesto", "Con cuentas secretas"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f58", 6, "o6", "aplicar", "¿Qué pregunta ayuda a evaluar el fruto de una campaña?", "¿Cuántos siguen en una iglesia meses después?", ["¿Cuántas sillas se pusieron?", "¿Cuánta publicidad se hizo?", "¿Cuántos músicos participaron?"], "«vuestro fruto permanezca».", "Juan 15:16"],
    ["f59", 6, "o6", "analizar", "¿Por qué la integridad del evangelista es parte del mensaje?", "Porque una falta en el dinero, la pureza o la honestidad desacredita el evangelio", ["Porque la gente no escucha el sermón", "No es parte del mensaje", "Porque así se recauda más"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f60", 6, "o6", "evaluar", "¿Qué campaña muestra mejor integridad?", "Una con cuentas claras, equipos que evitan la sospecha, informes honestos y trabajo unido con las iglesias", ["Una que anuncia números exagerados", "Una que critica a las iglesias del lugar", "Una cuyo dinero maneja una sola persona"], "«nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo».", "1 Tesalonicenses 2:3-5"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Cómo describe Jesús la mies y los obreros en Mateo 9:37?", "La mies es mucha, mas los obreros pocos", ["La mies es poca y los obreros muchos", "No hay mies", "Sobran obreros"], "«A la verdad la mies es mucha, mas los obreros pocos».", "Mateo 9:35-38"],
      ["m1-02", 1, "o1", "comprender", "¿Qué buscaba la iglesia de Hechos con la proclamación pública?", "Discípulos que perseveraran, y no solo una multitud", ["Solo una multitud", "Dinero", "Fama"], "«perseveraban en la doctrina de los apóstoles».", "Hechos 2:41-42"],
      ["m1-03", 1, "o1", "aplicar", "Tu iglesia quiere hacer una campaña para llenar el estadio. ¿Qué motivo propone la lección en su lugar?", "La compasión por las personas que no conocen a Cristo", ["Mostrar que la iglesia es grande", "Competir con otras iglesias", "Recaudar fondos"], "«al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:35-38"],
      ["m1-04", 1, "o1", "recordar", "¿Qué hicieron los samaritanos cuando creyeron a Felipe, según Hechos 8:12?", "Se bautizaban hombres y mujeres", ["Se fueron de la ciudad", "Persiguieron a Felipe", "No hicieron nada"], "Cuando creyeron, se bautizaban hombres y mujeres.", "Hechos 8:12"],
      ["m1-05", 1, "o1", "analizar", "¿Qué tienen en común Jonás, Pedro y Felipe?", "Los tres anunciaron públicamente el mensaje de Dios y muchos creyeron", ["Los tres predicaron solo en sinagogas", "Ninguno fue escuchado", "Los tres vivieron en el mismo tiempo"], "«los hombres de Nínive creyeron a Dios».", "Jonás 3:4-5"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué resultado de una campaña se parece más a Pentecostés?", "Nuevos creyentes que perseveran en la doctrina, la comunión, el partimiento del pan y la oración", ["Una gran asistencia el primer día y nada después", "Una buena colecta", "Muchas fotos para las redes"], "«perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:41-42"],
      ["m1-07", 2, "o2", "recordar", "¿Durante cuánto tiempo enseñó Pablo en la escuela de Tiranno?", "Dos años", ["Dos días", "Dos meses", "Veinte años"], "«Así continuó por espacio de dos años».", "Hechos 19:9-10"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué Whitefield y Wesley predicaron al aire libre?", "Para llevar el evangelio a la gente que casi nunca entraba en una iglesia", ["Porque no les gustaban los templos", "Para hacerse famosos", "Por una costumbre sin propósito"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
      ["m1-09", 2, "o2", "aplicar", "Una iglesia solo predica dentro de su templo. ¿Qué lección de la historia le sirve?", "Salir adonde está la gente, como Whitefield y Wesley", ["Esperar a que la gente llegue", "Cerrar el templo", "Predicar más largo"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
      ["m1-10", 2, "o2", "recordar", "¿Dónde fue la campaña de Billy Graham de dieciséis semanas en 1957?", "En el Madison Square Garden de Nueva York", ["En Modesto, California", "En Kingswood, cerca de Bristol", "En Atenas"], "Se extendió por dieciséis semanas.", "Romanos 10:14-15"],
      ["m1-11", 2, "o2", "analizar", "¿Qué papel tenían los consejeros en las campañas de Billy Graham?", "Atender a quienes respondían", ["Recoger el dinero", "Cantar", "Cuidar el estacionamiento"], "Las campañas se preparaban con consejeros preparados.", "Romanos 10:14-15"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué lección de la historia es la más importante para después de la campaña?", "Cuidar a los que responden, para que lleguen a ser discípulos", ["Anunciar cuántos vinieron", "Planear enseguida la próxima campaña", "Agradecer a los músicos"], "Así la campaña deja discípulos y no solo recuerdos.", "Romanos 10:14-15"],
      ["m1-13", 3, "o3", "recordar", "¿Qué oró Jesús en Juan 17:21?", "Que todos sean uno, para que el mundo crea", ["Que la iglesia sea rica", "Que los discípulos se separen", "Que nadie sufra"], "«para que todos sean uno».", "Juan 17:21"],
      ["m1-14", 3, "o3", "comprender", "¿Con qué empieza una campaña bien preparada?", "Con oración, unidad y un plan", ["Con un escenario", "Con publicidad", "Con un presupuesto sin oración"], "«perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
      ["m1-15", 3, "o3", "aplicar", "Van a usar una plaza para la campaña. ¿Qué paso no pueden olvidar?", "Los permisos de la ciudad y el plan de seguridad", ["Elegir los colores", "Invitar solo a creyentes", "Ninguno: es un lugar público"], "Un evento público necesita los permisos de la ciudad y un plan de seguridad.", "Lucas 14:28"],
      ["m1-16", 3, "o3", "recordar", "¿Qué hace primero el que quiere edificar una torre, según Lucas 14:28?", "Se sienta y calcula los gastos", ["Contrata obreros", "Compra piedras", "Pide prestado"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué hace falta proteger a los menores en una campaña?", "Porque es un evento público y los niños necesitan cuidado y normas de protección", ["No hace falta", "Porque los niños no deben venir", "Para cobrar la entrada"], "Un evento público necesita las normas de protección de menores.", "Lucas 14:28"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué comité de campaña está mejor formado?", "Uno con responsables de varias iglesias, que oran juntos y rinden cuentas", ["Uno de una sola persona", "Uno sin responsables", "Uno que no ora"], "«para que todos sean uno».", "Juan 17:21"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Cómo dice Pablo que estuvo entre los corintios, según 1 Corintios 2:3?", "Con debilidad, y mucho temor y temblor", ["Con orgullo", "Con un ejército", "Con riquezas"], "«Y estuve entre vosotros con debilidad, y mucho temor y temblor».", "1 Corintios 2:1-5"],
      ["m2-02", 4, "o4", "comprender", "¿Qué quiere decir adulterar la palabra de Dios?", "Cambiar el mensaje para conseguir algo", ["Leerla en voz alta", "Traducirla", "Predicarla con claridad"], "«no andando con astucia, ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
      ["m2-03", 4, "o4", "aplicar", "En el llamado, alguien sube la música y repite que el tiempo se acaba. ¿Qué falta?", "Dar tiempo y libertad, sin presión", ["Más volumen", "Más repeticiones", "Nada: está bien"], "«no andando con astucia».", "2 Corintios 4:2"],
      ["m2-04", 4, "o4", "recordar", "¿Cómo se presentaba Pablo a sí mismo, según 2 Corintios 4:5?", "Como siervo de ellos por amor de Jesús", ["Como dueño de la iglesia", "Como un rey", "Como el centro del mensaje"], "«y a nosotros como vuestros siervos por amor de Jesús».", "2 Corintios 4:5"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué el paso visible no debe confundirse con lo que salva?", "Porque salva Cristo, por medio del arrepentimiento y la fe", ["Porque el paso visible no sirve", "Porque nadie debe pasar al frente", "Porque la salvación es por obras"], "Responder es arrepentirse y confiar en Cristo.", "Hechos 2:38"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué mensaje de campaña es más fiel a 1 Corintios 2:2?", "Uno centrado en Jesucristo crucificado", ["Uno centrado en la vida del evangelista", "Uno centrado en promesas de éxito", "Uno de chistes y anécdotas"], "«no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado».", "1 Corintios 2:1-5"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hace Pablo con todo hombre, según Colosenses 1:28?", "Lo amonesta y le enseña en toda sabiduría", ["Lo cuenta", "Lo juzga", "Lo deja solo"], "«amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría».", "Colosenses 1:28"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el consejero entrega los datos a la iglesia más cercana a la casa de la persona?", "Para que pueda recibir cuidado y congregarse cerca", ["Para que la iglesia crezca a cualquier costo", "Para publicarlos", "No los entrega"], "Así nadie se pierde.", "Colosenses 1:28"],
      ["m2-09", 5, "o5", "aplicar", "Una persona respondió el sábado. ¿Qué hace el equipo de seguimiento?", "La llama o la visita en los días siguientes y la invita a un grupo", ["Espera a la próxima campaña", "Le envía una factura", "No hace nada"], "«vuestro fruto permanezca».", "Juan 15:16"],
      ["m2-10", 5, "o5", "recordar", "¿Para qué nos puso Jesús, según Juan 15:16?", "Para que vayamos y llevemos fruto", ["Para que descansemos", "Para que juzguemos al mundo", "Para que nos escondamos"], "«os he puesto para que vayáis y llevéis fruto».", "Juan 15:16"],
      ["m2-11", 5, "o5", "analizar", "¿Qué relación hay entre la campaña y la consolidación?", "La consolidación es la otra mitad de la campaña", ["No tienen relación", "La consolidación reemplaza a la campaña", "La campaña termina el último día"], "Se planifica desde el principio, no al final.", "Colosenses 1:28"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué consejero sirve mejor?", "Uno que escucha, explica el evangelio con la Biblia, ora y une a la persona con una iglesia", ["Uno que presiona para que firme", "Uno que habla solo de su iglesia", "Uno que no anota nada"], "«a fin de presentar perfecto en Cristo Jesús a todo hombre».", "Colosenses 1:28"],
      ["m2-13", 6, "o6", "recordar", "¿En qué año fueron los compromisos de Modesto?", "1948", ["1739", "1957", "2018"], "Fue en Modesto, California.", "2 Corintios 8:21"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué el equipo de Billy Graham decidió no quedarse a solas con una mujer que no fuera su esposa?", "Para evitar la tentación y la sospecha", ["Para ahorrar tiempo", "Por una ley del gobierno", "Por una costumbre de su ciudad"], "Evitaban toda situación que diera lugar a la tentación o a la sospecha.", "1 Tesalonicenses 2:3-5"],
      ["m2-15", 6, "o6", "aplicar", "Un equipo quiere anunciar que vinieron diez mil cuando vinieron tres mil. ¿Qué compromiso rompe?", "La honestidad al informar", ["El cuidado del dinero", "La pureza", "Ninguno"], "«nunca usamos de palabras lisonjeras».", "1 Tesalonicenses 2:3-5"],
      ["m2-16", 6, "o6", "recordar", "¿Qué prueba Dios, según 1 Tesalonicenses 2:4?", "Nuestros corazones", ["Nuestras ofrendas", "Nuestra elocuencia", "Nuestro tamaño"], "«sino a Dios, que prueba nuestros corazones».", "1 Tesalonicenses 2:3-5"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué no criticar a las iglesias del lugar?", "Porque la campaña trabaja con ellas, y ellas cuidarán a los nuevos creyentes", ["Porque todas son perfectas", "Porque no importan", "Porque así el evangelista se luce"], "No criticarlas, sino trabajar con ellas.", "Juan 17:21"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué informe final de campaña es mejor?", "Uno honesto, con cuentas claras y con cuántos siguen en una iglesia meses después", ["Uno con los números redondeados hacia arriba", "Uno sin cuentas", "Uno que solo cuenta la asistencia"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "evangelismo-misiones-2-e1",
      tipo: "corta",
      pregunta: "Explica, con ejemplos de la Biblia, de dónde nace una campaña y qué fruto busca.",
      ideas: [
        { id: "compasion", peso: 25, texto: "Nace de la compasión de Jesús por las multitudes.", formas: ["compasion", "multitudes", "ovejas", "desamparadas"] },
        { id: "ejemplos", peso: 25, texto: "Ejemplos: Jonás, Pedro en Pentecostés, Felipe en Samaria.", formas: ["jonas", "ninive", "pentecostes", "felipe", "samaria", "pedro"] },
        { id: "discipulos", peso: 25, texto: "Busca discípulos que perseveren.", formas: ["discipul*", "persever*", "doctrina", "permanez*"] },
        { id: "numeros", peso: 15, texto: "No solo números ni una multitud.", formas: ["no solo numeros", "no solo una multitud", "llenar un lugar", "numeros"], negativa: true },
      ],
      citas: ["Mateo 9:35-38", "Mateo 9:36", "Jonás 3:4-5", "Hechos 2:14", "Hechos 2:41-42", "Hechos 8:5-8", "Hechos 8:12", "2 Timoteo 4:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Una campaña nace de la compasión de Jesús, que al ver las multitudes, desamparadas como ovejas sin pastor, tuvo compasión (Mateo 9:36). Así predicaron Jonás en Nínive, Pedro en Pentecostés y Felipe en Samaria. El fruto que se busca no son solo números, sino discípulos que perseveren en la doctrina, la comunión y la oración.",
    },
    {
      id: "evangelismo-misiones-2-e2",
      tipo: "corta",
      pregunta: "Explica cómo se prepara una campaña y por qué la oración y la unidad van primero.",
      ideas: [
        { id: "oracion", peso: 25, texto: "La oración va primero.", formas: ["oracion", "orar", "ora", "perseveraban"] },
        { id: "unidad", peso: 25, texto: "La unidad de las iglesias, para que el mundo crea.", formas: ["unidad", "unidos", "sean uno", "seamos uno", "unir"] },
        { id: "pasos", peso: 20, texto: "El comité, el propósito, el lugar, las fechas y los equipos.", formas: ["comite", "proposito", "fechas", "equipos", "consejeros"] },
        { id: "presupuesto", peso: 20, texto: "El presupuesto, los permisos y la seguridad.", formas: ["presupuesto", "calcula*", "gastos", "permisos", "seguridad"] },
      ],
      citas: ["Hechos 1:14", "Juan 17:21", "Lucas 14:28", "Mateo 9:38"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero se ora, como los discípulos que perseveraban unánimes en oración (Hechos 1:14), y se busca la unidad de las iglesias, porque Jesús oró para que seamos uno y el mundo crea. Después se forma un comité, se definen el propósito, el lugar y las fechas, se calcula el presupuesto, se piden los permisos y se preparan los equipos.",
    },
    {
      id: "evangelismo-misiones-2-e3",
      tipo: "corta",
      pregunta: "Explica los compromisos de Modesto y cómo se evalúa una campaña con honestidad.",
      ideas: [
        { id: "dinero", peso: 20, texto: "El dinero.", formas: ["dinero", "cuentas", "finanzas", "avaricia"] },
        { id: "pureza", peso: 20, texto: "La pureza, evitando la sospecha.", formas: ["pureza", "tentacion", "sospecha", "a solas"] },
        { id: "honestidad", peso: 20, texto: "La honestidad al informar, sin exagerar.", formas: ["honest*", "exager*", "numeros reales"] },
        { id: "iglesias", peso: 15, texto: "El trabajo con las iglesias del lugar.", formas: ["iglesias del lugar", "iglesias locales", "trabajar con", "criticar"] },
        { id: "fruto", peso: 15, texto: "Se evalúa por el fruto que permanece.", formas: ["fruto", "permanec*", "meses despues", "siguen en"] },
      ],
      citas: ["2 Corintios 8:21", "1 Tesalonicenses 2:3-5", "1 Tesalonicenses 2:5", "Juan 15:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En 1948, en Modesto, Billy Graham y su equipo se comprometieron a cuidar el dinero, la pureza, evitando toda sospecha, la honestidad, sin exagerar los números, y el trabajo con las iglesias del lugar. Una campaña se evalúa por su fruto: cuántos siguen en una iglesia meses después, con cuentas claras, como pide 2 Corintios 8:21.",
    },
    {
      id: "evangelismo-misiones-2-e4",
      tipo: "breve",
      pregunta:
        "Imagina que tu iglesia y otras dos de tu ciudad quieren hacer una campaña evangelística. Escribe el plan: cómo se prepararán espiritualmente, cómo se organizarán, qué mensaje y qué llamado habrá, cómo será el seguimiento y cómo cuidarán la integridad. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "preparacion", peso: 20, texto: "La preparación espiritual: oración y unidad.", formas: ["oracion", "orar", "orando", "ayun*", "unidad", "unidos"] },
        { id: "organizacion", peso: 20, texto: "La organización.", formas: ["comite", "presupuesto", "permisos", "seguridad", "consejeros", "equipos"] },
        { id: "mensaje", peso: 20, texto: "El mensaje y el llamado.", formas: ["crucificado", "arrepent*", "llamado", "sin presion", "manipul*"] },
        { id: "seguimiento", peso: 20, texto: "El seguimiento.", formas: ["seguimiento", "consolid*", "acompañ*", "visit*", "grupo de nuevos"] },
        { id: "integridad", peso: 20, texto: "La integridad.", formas: ["integridad", "cuentas claras", "honest*", "transparen*", "dos personas", "informe"] },
      ],
      basta: 85,
      citas: ["Juan 17:21", "Hechos 1:14", "Lucas 14:28", "1 Corintios 2:1-5", "1 Corintios 2:4-5", "1 Corintios 2:2", "2 Corintios 4:2", "2 Corintios 4:5", "Hechos 2:38", "Hechos 2:41-42", "Colosenses 1:28", "Juan 15:16", "1 Tesalonicenses 2:3-5", "2 Corintios 8:21", "Mateo 9:35-38", "2 Timoteo 4:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Nuestras tres iglesias empezarán orando juntas: durante tres meses tendremos una reunión de oración unida cada semana, porque Jesús oró para que todos seamos uno, para que el mundo crea (Juan 17:21). Formaremos un comité con un pastor y dos responsables de cada iglesia. Definiremos el propósito, alcanzar a las familias del barrio, el lugar, un parque, y las fechas. Calcularemos el presupuesto antes de empezar, pediremos los permisos de la ciudad, haremos un plan de seguridad y cuidaremos a los niños con las normas de protección. Prepararemos a veinte consejeros y al equipo de seguimiento. El mensaje será Cristo crucificado y resucitado, como Pablo, que no predicó con palabras persuasivas, sino en el poder de Dios (1 Corintios 2:4-5). El llamado explicará qué es arrepentirse y creer, sin presión ni promesas falsas. Cada persona que responda hablará con un consejero, y en los tres días siguientes la llamará o la visitará alguien de la iglesia más cercana a su casa, que la invitará a un grupo de nuevos creyentes. Para la integridad, dos personas contarán las ofrendas, el informe final será honesto y con cuentas claras, y nadie del equipo se quedará a solas en situaciones que den lugar a sospecha.",
    },
    {
      id: "evangelismo-misiones-2-e5",
      tipo: "breve",
      pregunta:
        "Un hermano propone que, en la próxima campaña, el llamado se repita hasta que pasen al menos cien personas y que después se anuncie que fueron quinientas para animar a la iglesia. Evalúa esta propuesta con la Biblia y con lo aprendido en la materia, y propón otra manera. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "presion", peso: 25, texto: "Repetir el llamado hasta que pasen es presión: el llamado da libertad.", formas: ["presion", "manipul*", "libertad", "astucia", "forzada"] },
        { id: "poder", peso: 20, texto: "La fe se funda en el poder de Dios.", formas: ["poder de dios", "palabras persuasivas", "sabiduria de los hombres"] },
        { id: "honestidad", peso: 25, texto: "Exagerar es mentir: honestidad al informar.", formas: ["mentir", "mentira", "honest*", "modesto", "numeros reales", "inflad*"] },
        { id: "fruto", peso: 15, texto: "Se evalúa por el fruto que permanece.", formas: ["fruto", "permanez*", "meses despues", "siguen congregandose"] },
        { id: "alternativa", peso: 15, texto: "Una propuesta mejor.", formas: ["propongo", "propondria", "en su lugar", "otra manera"] },
      ],
      basta: 85,
      citas: ["1 Corintios 2:1-5", "1 Corintios 2:4-5", "2 Corintios 4:2", "1 Tesalonicenses 2:3-5", "1 Tesalonicenses 2:5", "Juan 15:16", "2 Corintios 8:21", "Colosenses 1:28"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La propuesta tiene buena intención, porque quiere animar a la iglesia, pero va contra la Biblia en dos puntos. Primero, repetir el llamado hasta que pasen cien personas es presión. Pablo no predicó con palabras persuasivas de humana sabiduría, para que la fe estuviera fundada en el poder de Dios (1 Corintios 2:4-5), y renunció a andar con astucia (2 Corintios 4:2). Una decisión forzada no es fe. Segundo, anunciar quinientas cuando pasaron cien es mentir. El equipo de Billy Graham se comprometió en Modesto a informar con honestidad, y Pablo nunca usó palabras lisonjeras (1 Tesalonicenses 2:5). Además, una campaña no se mide por cuántos pasaron, sino por su fruto: cuántos siguen en una iglesia meses después, porque Jesús quiere un fruto que permanezca (Juan 15:16). En su lugar propongo un llamado honesto: explicar qué es arrepentirse y creer, dar tiempo y libertad, invitar una vez a hablar con un consejero, y después informar a la iglesia los números reales y, unos meses más tarde, cuántos siguen congregándose. La verdad anima más que una cifra inflada.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras)
  breve: {
    id: "evangelismo-misiones-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe la guía para los consejeros de una campaña: quiénes pueden serlo, qué hacen cuando alguien responde, qué no deben hacer, cómo cuidan los datos de las personas y cómo se hace el seguimiento. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "quienes", peso: 20, texto: "Quiénes pueden ser consejeros.", formas: ["maduro*", "preparad*", "capacit*", "buen testimonio"] },
      { id: "hacen", peso: 25, texto: "Qué hacen: escuchar, explicar el evangelio con la Biblia y orar.", formas: ["escuch*", "explica*", "ora con", "orar con"] },
      { id: "nodeben", peso: 20, texto: "Qué no deben hacer: presionar ni prometer.", formas: ["no debe presionar", "no deben presionar", "no presion*", "sin presion", "prometer"], negativa: true },
      { id: "datos", peso: 15, texto: "Cómo cuidan los datos.", formas: ["permiso", "datos", "privad*"] },
      { id: "seguimiento", peso: 20, texto: "Cómo se hace el seguimiento.", formas: ["seguimiento", "iglesia mas cercana", "llam*", "visit*", "acompañ*", "registro"] },
    ],
    basta: 85,
    citas: ["Colosenses 1:28", "Juan 15:16", "2 Corintios 4:2", "1 Corintios 15:3-4", "Hechos 2:41-42", "1 Tesalonicenses 2:3-5", "1 Tesalonicenses 2:7-8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Guía para los consejeros. Pueden ser consejeros los creyentes maduros de una de las iglesias que participan, que hayan recibido la preparación y tengan buen testimonio. Cuando alguien responde, el consejero lo saluda con amor y lo escucha: le pregunta qué decidió y por qué. Después le explica el evangelio con la Biblia: Cristo murió por nuestros pecados y resucitó, y nos llama a arrepentirnos y creer (1 Corintios 15:3-4). Ora con la persona y le da una Biblia con un plan de lectura. El consejero no debe presionar, ni prometer sanidad, dinero o soluciones, ni hablar mal de otras iglesias, porque no andamos con astucia (2 Corintios 4:2). Los datos se anotan solo con el permiso de la persona y se guardan en privado; únicamente se entregan a la iglesia más cercana a su casa. El seguimiento empieza en los tres días siguientes: alguien de esa iglesia la llama o la visita, la invita a un grupo de nuevos creyentes y le asigna un acompañante. Se lleva un registro para que nadie se pierda, porque queremos presentar a cada persona perfecta en Cristo (Colosenses 1:28).",
  },
};
