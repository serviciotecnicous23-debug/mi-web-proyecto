/**
 * El banco de «Administración y gobierno de la iglesia» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 una iglesia en orden · o2 las formas de gobierno · o3 ancianos, diáconos y equipos · o4 el dinero de la
 * iglesia · o5 planificar, organizar y comunicar · o6 lo legal básico · o7 el versículo de memoria (1 Corintios 14:40).
 * Quién puede ejercer cada cargo no se evalúa aquí: es un punto de la declaración de fe por confirmar. Lo legal es una
 * guía general, no un consejo legal.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-administracion-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_ADMINISTRACION: BancoMateria = {
  materia: "n5-administracion",
  repaso: {
    "n5-administracion-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dice 1 Corintios 14:40?", "Que se haga todo decentemente y con orden", ["Que cada uno haga lo que quiera", "Que el orden apaga al Espíritu", "Que no hace falta organizarse"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["1-r2", 1, "o1", "comprender", "¿Qué dice 1 Corintios 14:33 acerca de Dios?", "Que no es Dios de confusión, sino de paz", ["Que es Dios de confusión", "Que no le importa el orden", "Que solo le interesa el templo"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
      ["1-r3", 1, "o1", "comprender", "¿Qué significa ser buenos administradores, según 1 Pedro 4:10?", "Servir a otros con el don recibido, cuidando lo que es de Dios", ["Mandar sobre los demás", "Guardar todo para uno mismo", "No usar los dones"], "«como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
    ] as P[]).map(p),
    "n5-administracion-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hicieron Pablo y Bernabé en cada iglesia, según Hechos 14:23?", "Constituyeron ancianos", ["Construyeron templos", "Nombraron reyes", "No dejaron líderes"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:23"],
      ["2-r2", 2, "o2", "comprender", "¿Quiénes tomaron la decisión de Hechos 15:22?", "Los apóstoles y los ancianos, con toda la iglesia", ["Solo Pedro", "El gobierno romano", "Solo la congregación, sin líderes"], "«Entonces pareció bien a los apóstoles y a los ancianos, con toda la iglesia».", "Hechos 15:22"],
      ["2-r3", 2, "o2", "recordar", "¿En qué forma de gobierno la congregación toma las decisiones principales?", "En la congregacional", ["En la episcopal", "En la presbiteriana", "En ninguna"], "La siguen las iglesias bautistas y muchas iglesias independientes.", "Hechos 15:22"],
    ] as P[]).map(p),
    "n5-administracion-3": ([
      ["3-r1", 3, "o3", "recordar", "¿A quiénes saludó Pablo en Filipenses 1:1, además de los santos?", "A los obispos y diáconos", ["A los reyes", "A los sacerdotes del templo", "A los soldados"], "«con los obispos y diáconos».", "Filipenses 1:1"],
      ["3-r2", 3, "o3", "recordar", "¿Cómo deben ser los diáconos, según 1 Timoteo 3:8?", "Honestos, sin doblez", ["Ricos", "Famosos", "Jóvenes"], "«Los diáconos asimismo deben ser honestos, sin doblez».", "1 Timoteo 3:8"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué necesita cada equipo de servicio, según la lección?", "Un propósito escrito y un responsable", ["Muchas reuniones", "Un uniforme", "Nada"], "Así cada uno sabe qué le toca y a quién rinde cuentas.", "Hechos 6:3"],
    ] as P[]).map(p),
    "n5-administracion-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cuándo pedía Pablo que se apartara la ofrenda, según 1 Corintios 16:2?", "Cada primer día de la semana", ["Una vez al año", "Solo en las fiestas", "Cuando sobrara algo"], "«Cada primer día de la semana cada uno de vosotros ponga aparte algo».", "1 Corintios 16:2"],
      ["4-r2", 4, "o4", "aplicar", "¿Cuántas personas deben contar las ofrendas, como mínimo?", "Dos, que no sean parientes, y las dos firman", ["Una sola", "Ninguna", "Solo el pastor"], "«evitando que nadie nos censure».", "2 Corintios 8:20"],
      ["4-r3", 4, "o4", "comprender", "¿Qué enseña Lucas 14:28 antes de un proyecto?", "Sentarse primero y calcular los gastos", ["Empezar y ver qué pasa", "Pedir prestado sin pensar", "No planificar"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ] as P[]).map(p),
    "n5-administracion-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué hizo Nehemías cuando el rey le preguntó qué pedía?", "Oró al Dios de los cielos", ["Se fue sin responder", "Pidió riquezas para sí", "Se enojó"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
      ["5-r2", 5, "o5", "comprender", "¿Qué dice Proverbios 15:22 de los planes sin consejo?", "Que son frustrados", ["Que siempre salen bien", "Que son mejores", "Que no importa"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué debe registrar el acta de una reunión?", "Qué se decidió, quién lo hará y para cuándo", ["Los chismes", "Solo la lista de asistentes", "Nada"], "Así los acuerdos no dependen de la memoria de nadie.", "Proverbios 15:22"],
    ] as P[]).map(p),
    "n5-administracion-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué enseñó Jesús en Mateo 22:21?", "Dar a César lo que es de César, y a Dios lo que es de Dios", ["No pagar impuestos", "Darle todo a César", "Que César es Dios"], "«Dad, pues, a César lo que es de César, y a Dios lo que es de Dios».", "Mateo 22:21"],
      ["6-r2", 6, "o6", "recordar", "¿Qué número da el IRS para las cuentas bancarias y los empleados de una iglesia?", "El número de identificación del empleador (EIN)", ["El número de seguro social del pastor", "Un número de teléfono", "Ninguno"], "Es parte de lo legal básico de una iglesia en los Estados Unidos.", "Tito 3:1"],
      ["6-r3", 6, "o6", "comprender", "¿Qué necesita un donante para deducir una donación de 250 dólares o más?", "Un reconocimiento escrito de la iglesia", ["Nada", "Una foto de la ofrenda", "La firma de cualquier testigo"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: una iglesia en orden (10)
    ["f01", 1, "o1", "recordar", "¿Qué no es Dios, según 1 Corintios 14:33?", "Dios de confusión", ["Dios de paz", "Dios de orden", "Dios de amor"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f02", 1, "o1", "comprender", "¿Para qué sirve el orden en la iglesia, según 1 Corintios 14?", "Para que todos sean edificados", ["Para apagar al Espíritu", "Para controlar a las personas", "Para nada"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f03", 1, "o1", "recordar", "¿Qué don nombra Pablo en 1 Corintios 12:28 que tiene que ver con la organización?", "Los que administran", ["Los que gobiernan naciones", "Los que cobran", "Los que mandan"], "«los que ayudan, los que administran».", "1 Corintios 12:28"],
    ["f04", 1, "o1", "comprender", "¿Qué cuida un buen administrador en la iglesia?", "Lo que es de Dios: personas, tiempo, dinero y bienes", ["Solo el dinero", "Solo el edificio", "Solo su propio cargo"], "«como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
    ["f05", 1, "o1", "aplicar", "¿Cuál es el fin de la administración en la iglesia?", "Servir a la misión y a las personas", ["Controlar a todos", "Llenar papeles", "Dar poder a unos pocos"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f06", 1, "o1", "comprender", "¿Qué diferencia hay entre una administración que sirve y una que solo controla?", "La que sirve facilita la obra; la que controla pone trabas sin propósito", ["No hay diferencia", "La que controla es más espiritual", "La que sirve no tiene reglas"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
    ["f07", 1, "o1", "aplicar", "En una iglesia los horarios cambian sin aviso y nadie sabe quién hace qué. ¿Qué falta?", "El orden que pide 1 Corintios 14:40", ["Más emoción", "Más reuniones sin plan", "Nada"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f08", 1, "o1", "analizar", "¿Por qué la transparencia es una marca de buena administración?", "Porque todos saben cómo se decide y cómo se usa el dinero, y crece la confianza", ["Porque esconde los problemas", "Porque nadie pregunta", "No lo es"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f09", 1, "o1", "evaluar", "¿Qué iglesia muestra mejor una administración bíblica?", "Una con orden, transparencia y reglas que sirven a la misión", ["Una sin ningún orden", "Una llena de reglas sin propósito", "Una donde solo el pastor sabe lo que pasa"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f10", 1, "o7", "recordar", "Completa 1 Corintios 14:40: pero hágase todo…", "decentemente y con orden", ["como cada uno quiera", "con prisa y en secreto", "solo los domingos"], "Es el versículo de memoria de la materia.", "1 Corintios 14:40"],
    // ---- lección 2: formas de gobierno (10)
    ["f11", 2, "o2", "recordar", "¿Qué encargó Pablo a Tito en Creta, según Tito 1:5?", "Que estableciera ancianos en cada ciudad", ["Que construyera un templo", "Que se fuera de la isla", "Que nombrara un rey"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
    ["f12", 2, "o2", "comprender", "¿Qué muestra Hechos 15:22 sobre cómo decidir?", "Que los líderes guiaron y la iglesia participó", ["Que decidió uno solo", "Que no hubo decisión", "Que decidió el gobierno"], "«Entonces pareció bien a los apóstoles y a los ancianos, con toda la iglesia».", "Hechos 15:22"],
    ["f13", 2, "o2", "recordar", "¿En qué forma de gobierno hay obispos que supervisan a varias iglesias?", "En la episcopal", ["En la congregacional", "En la presbiteriana", "En ninguna"], "La siguen, entre otras, las iglesias católica, ortodoxa, anglicana y metodista.", "Tito 1:5"],
    ["f14", 2, "o2", "recordar", "¿En qué forma de gobierno los ancianos gobiernan juntos y en concilios regionales?", "En la presbiteriana", ["En la episcopal", "En la congregacional", "En ninguna"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:23"],
    ["f15", 2, "o2", "recordar", "¿Qué iglesias siguen la forma congregacional?", "Las bautistas y muchas iglesias independientes", ["La católica y la ortodoxa", "Solo la anglicana", "Ninguna"], "En ella cada iglesia es autónoma.", "Hechos 15:22"],
    ["f16", 2, "o2", "comprender", "¿Qué hacen muchas iglesias, también pentecostales, con estas formas de gobierno?", "Combinan rasgos de ellas: un pastor que guía, un consejo y una asamblea", ["Las rechazan todas", "Siguen solo la episcopal", "No tienen gobierno"], "Cada iglesia se gobierna según sus estatutos y su declaración de fe.", "Hechos 15:22"],
    ["f17", 2, "o2", "comprender", "¿Qué documentos dicen cómo se gobierna cada iglesia?", "Sus estatutos, junto con su declaración de fe", ["Un periódico", "Las redes sociales", "Ninguno"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f18", 2, "o2", "analizar", "¿Qué tienen en común todas las formas de gobierno sanas?", "Líderes de buen carácter, decisiones claras, rendición de cuentas y la guía de la Palabra", ["Un solo líder sin consejo", "Ninguna regla", "Decisiones secretas"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
    ["f19", 2, "o2", "aplicar", "Un miembro pregunta cómo se toman las decisiones en tu iglesia. ¿A qué lo diriges?", "A los estatutos de la iglesia y a sus líderes", ["A un rumor", "A otra iglesia", "A ninguna parte"], "Desde el principio, las iglesias tuvieron líderes reconocidos.", "Hechos 14:23"],
    ["f20", 2, "o2", "evaluar", "¿Qué decisión sigue mejor el ejemplo de Hechos 15?", "Una que los líderes toman escuchando a la iglesia, con la Escritura, y que comunican con claridad", ["Una que toma uno solo en secreto", "Una por mayoría, sin orar", "Una que no se explica a nadie"], "«Entonces pareció bien a los apóstoles y a los ancianos, con toda la iglesia».", "Hechos 15:22"],
    // ---- lección 3: ancianos, diáconos y equipos (10)
    ["f21", 3, "o3", "recordar", "¿Qué dos clases de servicio reconocido aparecen en Filipenses 1:1?", "Obispos y diáconos", ["Reyes y sacerdotes", "Profetas y levitas", "Jueces y escribas"], "«con los obispos y diáconos».", "Filipenses 1:1"],
    ["f22", 3, "o3", "comprender", "¿Qué hacen los ancianos o pastores?", "Enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño", ["Solo administran el dinero", "Solo cantan", "Nada en especial"], "«para apacentar la iglesia del Señor».", "Hechos 20:28"],
    ["f23", 3, "o3", "comprender", "¿Qué hicieron los siete de Hechos 6?", "Atendieron a las viudas para que los apóstoles siguieran en la oración y la palabra", ["Predicaron en lugar de los apóstoles", "Construyeron el templo", "Gobernaron la ciudad"], "«a quienes encarguemos de este trabajo».", "Hechos 6:3"],
    ["f24", 3, "o3", "recordar", "¿Qué pide 1 Timoteo 3:10 a los que van a servir?", "Que sean sometidos a prueba primero", ["Que paguen por el cargo", "Que no tengan experiencia", "Nada"], "«sean sometidos a prueba primero».", "1 Timoteo 3:10"],
    ["f25", 3, "o3", "recordar", "¿Qué es lo primero que pide la Palabra a los ancianos, según la lección?", "El carácter", ["La riqueza", "La fama", "La edad"], "«Pero es necesario que el obispo sea irreprensible».", "1 Timoteo 3:2"],
    ["f26", 3, "o3", "aplicar", "¿Qué debe tener por escrito cada equipo de servicio?", "Su propósito", ["Sus quejas", "Los nombres de los que faltan", "Nada"], "Con un propósito escrito, todos saben para qué sirve el equipo.", "Hechos 6:3"],
    ["f27", 3, "o3", "aplicar", "¿Qué se sigue siempre en los equipos que trabajan con menores?", "Las normas de protección", ["Nada especial", "Que un adulto esté a solas con los niños", "Que nadie sea verificado"], "«cualquiera que haga tropezar a alguno de estos pequeños».", "Mateo 18:6"],
    ["f28", 3, "o3", "comprender", "¿Por qué se prepara a las personas antes de darles responsabilidad?", "Para que sirvan bien y se vea cómo manejan lo pequeño", ["Para retrasarlas", "Porque no se confía en nadie", "No hace falta"], "«sean sometidos a prueba primero».", "1 Timoteo 3:10"],
    ["f29", 3, "o3", "analizar", "¿Por qué una iglesia sana no depende de una sola persona?", "Porque tiene líderes que guían, diáconos que sirven y equipos que trabajan juntos", ["Porque nadie dirige", "Porque todo lo hace el pastor", "Sí depende de una persona"], "«con los obispos y diáconos».", "Filipenses 1:1"],
    ["f30", 3, "o3", "evaluar", "¿Qué equipo está mejor organizado?", "Uno con propósito escrito, un responsable, personas preparadas y gratitud", ["Uno sin responsable", "Uno donde nadie sabe qué hacer", "Uno que nunca agradece"], "«de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
    // ---- lección 4: el dinero de la iglesia (10)
    ["f31", 4, "o4", "recordar", "¿Para quiénes era la ofrenda que organizó Pablo en 1 Corintios 16?", "Para los santos", ["Para Pablo", "Para el templo de Corinto", "Para el gobierno"], "«En cuanto a la ofrenda para los santos».", "1 Corintios 16:1"],
    ["f32", 4, "o4", "comprender", "¿Por qué Pablo cuidaba tanto el manejo de la ofrenda, según 2 Corintios 8:20?", "Para que nadie pudiera censurarlo", ["Para quedarse con una parte", "Porque no confiaba en Dios", "Por costumbre"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20"],
    ["f33", 4, "o4", "aplicar", "¿Dónde se deposita el dinero de la iglesia?", "En la cuenta de la iglesia, pronto, nunca en una cuenta personal", ["En la cuenta del pastor", "En una caja en la casa del tesorero", "Donde sea más fácil"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f34", 4, "o4", "aplicar", "¿Cómo se aprueban los gastos?", "Por escrito, guardando los recibos", ["De palabra y sin recibos", "Sin aprobación", "Solo por el tesorero, sin informar"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f35", 4, "o4", "recordar", "¿Cada cuánto revisan las cuentas personas que no manejan el dinero, según la lección?", "Una vez al año", ["Nunca", "Cada diez años", "Solo si hay un problema"], "La revisión anual protege a todos.", "2 Corintios 8:21"],
    ["f36", 4, "o4", "comprender", "¿Por qué los controles no son desconfianza?", "Porque protegen a la iglesia del error y del robo, y a los líderes de la sospecha", ["Porque nadie los cumple", "Porque son solo papeles", "Sí son desconfianza"], "«evitando que nadie nos censure».", "2 Corintios 8:20"],
    ["f37", 4, "o4", "aplicar", "¿Qué se presenta periódicamente a la iglesia o a su consejo?", "Un informe financiero", ["Nada", "Solo el total de ofrendas del año", "Una lista de deudores"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f38", 4, "o4", "recordar", "¿Qué pregunta hace Jesús en Lucas 14:28?", "Quién, queriendo edificar una torre, no calcula primero los gastos", ["Quién ha visto a Dios", "Quién es el mayor", "Quién puede pagar el templo"], "«queriendo edificar una torre, no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f39", 4, "o4", "analizar", "¿Qué tienen en común la ofrenda de Pablo y los controles de hoy?", "Las dos buscan que todo sea honrado delante de Dios y de los hombres", ["Nada", "Las dos esconden el dinero", "Las dos dependen de una sola persona"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f40", 4, "o4", "evaluar", "¿Qué iglesia maneja mejor su dinero?", "Una con presupuesto aprobado, dos que cuentan y firman, depósitos rápidos, recibos, informes y revisión anual", ["Una donde el tesorero cuenta solo", "Una sin presupuesto", "Una que nunca informa"], "«evitando que nadie nos censure».", "2 Corintios 8:20"],
    // ---- lección 5: planificar, organizar y comunicar (10)
    ["f41", 5, "o5", "recordar", "¿Qué hizo Nehemías antes de presentar su pedido al rey?", "Oró al Dios de los cielos", ["Escribió una queja", "Huyó", "Pidió dinero prestado"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
    ["f42", 5, "o5", "recordar", "¿Cuál es el primer paso del ciclo de planificación, según la lección?", "Orar y escuchar a Dios juntos", ["Gastar el presupuesto", "Anunciar el plan", "Contratar personal"], "«Encomienda a Jehová tus obras».", "Proverbios 16:3"],
    ["f43", 5, "o5", "comprender", "¿Por qué se fijan pocas metas claras?", "Para enfocarse y poder medir el avance", ["Para trabajar menos", "Porque las metas no importan", "Para no tener que evaluar"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ["f44", 5, "o5", "aplicar", "¿Cómo se invita mejor a los voluntarios?", "Personalmente, preparándolos para su tarea y agradeciéndoles", ["Con un anuncio general y nada más", "Obligándolos", "Sin preparación"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f45", 5, "o5", "comprender", "¿Qué pasa con lo que no se comunica en una iglesia?", "Es como si no existiera para la iglesia", ["Todos lo saben igual", "Se cumple solo", "Nada"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f46", 5, "o5", "aplicar", "¿Cómo deben ser los anuncios de la iglesia?", "Claros, a tiempo y por los medios que la gente usa", ["Largos y confusos", "De último momento", "Solo de boca en boca"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f47", 5, "o5", "recordar", "¿Qué dice Proverbios 16:9 sobre los planes?", "Que el hombre piensa su camino, pero Jehová endereza sus pasos", ["Que no hay que planificar", "Que el hombre controla todo", "Que Dios no interviene"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    ["f48", 5, "o5", "analizar", "¿Por qué planificar también es espiritual?", "Porque se hace en oración, con consejo y encomendando los planes a Dios", ["Porque reemplaza la oración", "No es espiritual", "Porque garantiza el éxito"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
    ["f49", 5, "o5", "aplicar", "¿Qué debe tener el calendario anual de la iglesia?", "Las actividades conocidas por todos, con tiempo para preparar cada una", ["Cambios cada semana sin aviso", "Nada escrito", "Solo las fechas del pastor"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f50", 5, "o5", "evaluar", "¿Qué plan anual es mejor?", "Uno hecho en oración, con consejo, pocas metas con fecha, responsables y revisiones", ["Uno hecho por una sola persona sin consultar", "Uno con muchas metas sin responsables", "Uno que nunca se revisa"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    // ---- lección 6: lo legal básico (10)
    ["f51", 6, "o6", "recordar", "¿Qué pide Tito 3:1 a los creyentes?", "Que se sujeten a los gobernantes y autoridades, y que obedezcan", ["Que desobedezcan las leyes", "Que no paguen impuestos", "Que gobiernen la ciudad"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan».", "Tito 3:1"],
    ["f52", 6, "o6", "comprender", "¿Cuándo no obedece la iglesia a las autoridades?", "Cuando la obligan a desobedecer a Dios", ["Nunca obedece", "Cuando no le conviene", "Cuando las leyes cuestan dinero"], "«Es necesario obedecer a Dios antes que a los hombres».", "Hechos 5:29"],
    ["f53", 6, "o6", "recordar", "¿Cómo se constituye en Texas una corporación sin fines de lucro, según la lección?", "Presentando un certificado de formación ante la Secretaría de Estado", ["Con un anuncio en el periódico", "Con una carta al pastor", "No hace falta nada"], "Para cada caso, se consulta a un abogado.", "Tito 3:1"],
    ["f54", 6, "o6", "comprender", "¿Para qué sirven los estatutos y las actas?", "Los estatutos dicen cómo se gobierna la iglesia y las actas guardan lo que se decide", ["Para decorar la oficina", "Para nada", "Para guardar chismes"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f55", 6, "o6", "recordar", "¿Qué dice la lección de las iglesias que cumplen los requisitos de la sección 501(c)(3)?", "Que se consideran exentas de impuestos sin tener que pedirlo, aunque muchas piden la carta que lo reconoce", ["Que nunca están exentas", "Que deben pagar el doble", "Que esa sección no existe"], "Sus fondos no pueden beneficiar a personas en particular.", "Mateo 22:21"],
    ["f56", 6, "o6", "comprender", "¿Qué no pueden hacer los fondos de una iglesia exenta?", "Beneficiar a personas en particular", ["Pagar la luz", "Ayudar a los pobres", "Pagar salarios razonables"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f57", 6, "o6", "aplicar", "¿Qué debe hacer la iglesia si tiene empleados?", "Cumplir con los impuestos sobre la nómina", ["Nada", "Pagar solo en efectivo y sin registros", "Esconder los salarios"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f58", 6, "o6", "recordar", "¿Quién debe reportar en Texas la sospecha de abuso de un menor?", "Toda persona, también los ministros", ["Solo la policía", "Nadie", "Solo los padres"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    ["f59", 6, "o6", "evaluar", "Una iglesia quiere comprar un edificio y firmar un contrato. ¿Qué es lo más prudente?", "Consultar a un abogado o a un contador antes de firmar", ["Firmar enseguida sin leer", "Pedir consejo solo a un amigo sin experiencia", "No guardar copia del contrato"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f60", 6, "o6", "evaluar", "¿Qué iglesia cumple mejor con la ley y da mejor testimonio?", "Una con estatutos y actas, cuentas claras, recibos, nómina en regla, protección de menores y consejo profesional", ["Una que ignora las leyes", "Una que solo cumple cuando la revisan", "Una que mezcla su dinero con el del pastor"], "«Dad, pues, a César lo que es de César, y a Dios lo que es de Dios».", "Mateo 22:21"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué dones nombra 1 Corintios 12:28, además de apóstoles, profetas y maestros?", "Los que ayudan y los que administran, entre otros", ["Solo apóstoles", "Reyes y príncipes", "Ningún otro"], "«los que ayudan, los que administran».", "1 Corintios 12:28"],
      ["m1-02", 1, "o1", "comprender", "¿Apaga el orden la obra del Espíritu?", "No: sirve para que todos sean edificados", ["Sí, siempre", "Sí, en los cultos", "Depende del pastor"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m1-03", 1, "o1", "aplicar", "¿Cuál es un buen primer paso para ordenar un ministerio desordenado?", "Escribir quién hace qué y comunicar los horarios", ["Ignorar el desorden", "Culpar a otros", "Hacerlo todo uno solo"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m1-04", 1, "o1", "recordar", "¿Cómo debe ministrarse el don recibido, según 1 Pedro 4:10?", "A los otros, como buenos administradores", ["Solo para uno mismo", "Escondiéndolo", "A cambio de dinero"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué el desorden puede hacer que la gente se vaya aunque la predicación sea buena?", "Porque genera confusión y desconfianza", ["No hace que nadie se vaya", "Porque la gente no escucha", "Porque el orden aburre"], "«pues Dios no es Dios de confusión, sino de paz».", "1 Corintios 14:33"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué regla de una iglesia está mejor pensada?", "Una que existe para servir a la misión y que todos conocen", ["Una que nadie entiende", "Una que solo busca controlar", "Una que cambia sin aviso"], "«como buenos administradores».", "1 Pedro 4:10"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hicieron Pablo y Bernabé después de constituir ancianos, según Hechos 14:23?", "Oraron con ayunos y los encomendaron al Señor", ["Se quedaron a gobernar", "Les cobraron", "Se olvidaron de ellos"], "«y habiendo orado con ayunos, los encomendaron al Señor».", "Hechos 14:23"],
      ["m1-08", 2, "o2", "comprender", "¿Qué forma de gobierno siguen las iglesias presbiterianas y reformadas?", "La presbiteriana: ancianos que gobiernan juntos y en concilios", ["La episcopal", "La congregacional", "Ninguna"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:23"],
      ["m1-09", 2, "o2", "aplicar", "Tu iglesia tiene un pastor que guía, un consejo y una asamblea. ¿Cómo se describe su gobierno?", "Como una mezcla de rasgos de las tres formas de gobierno", ["Como una iglesia sin gobierno", "Como puramente episcopal", "Como contraria a la Biblia"], "Muchas iglesias combinan rasgos de las tres formas.", "Hechos 15:22"],
      ["m1-10", 2, "o2", "recordar", "¿Cómo comunicó la iglesia la decisión de Hechos 15?", "Por escrito, en una carta", ["La guardó en secreto", "La cambió al día siguiente", "No la comunicó"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
      ["m1-11", 2, "o2", "analizar", "¿Qué muestra que desde el principio las iglesias tuvieron líderes reconocidos?", "Que Pablo constituyó ancianos en cada iglesia y encargó a Tito hacer lo mismo", ["Que no había líderes", "Que cada uno se nombraba solo", "Nada"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué hace falta en cualquier forma de gobierno?", "Líderes de buen carácter, decisiones claras y rendición de cuentas", ["Un solo líder sin consejo", "Ninguna regla", "Decisiones en secreto"], "«Pero es necesario que el obispo sea irreprensible».", "1 Timoteo 3:2"],
      ["m1-13", 3, "o3", "recordar", "¿Qué no deben ser los diáconos, según 1 Timoteo 3:8?", "Codiciosos de ganancias deshonestas", ["Honestos", "Sobrios", "Fieles"], "«no codiciosos de ganancias deshonestas».", "1 Timoteo 3:8"],
      ["m1-14", 3, "o3", "comprender", "¿Qué diferencia hay entre los que guían y los que sirven en lo práctico?", "Los ancianos enseñan y cuidan; los diáconos atienden las necesidades prácticas", ["No hay diferencia", "Los diáconos predican y los ancianos limpian", "Los dos solo cobran"], "«con los obispos y diáconos».", "Filipenses 1:1"],
      ["m1-15", 3, "o3", "aplicar", "Vas a formar un equipo de bienvenida. ¿Qué haces primero?", "Escribir su propósito y nombrar un responsable", ["Invitar a cualquiera sin prepararlo", "Esperar a que se forme solo", "Hacerlo tú solo"], "Después se escoge y se prepara a las personas.", "Hechos 6:3"],
      ["m1-16", 3, "o3", "recordar", "¿Qué criterio da Hechos 6:3 para escoger a los que sirven?", "De buen testimonio, llenos del Espíritu Santo y de sabiduría", ["Ricos y conocidos", "Jóvenes y fuertes", "Parientes del pastor"], "«de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué se agradece y se reconoce a los voluntarios?", "Porque su servicio es para el Señor y animarlos sostiene la obra", ["Para que trabajen gratis más tiempo", "No hace falta", "Para presumir"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué cuestión sobre los cargos no se decide en esta materia?", "Quién puede ejercer cada cargo, que es un punto de la declaración de fe por confirmar", ["Cómo se cuentan las ofrendas", "Qué es un equipo", "Qué es un acta"], "Aquí se estudian las funciones y el carácter que pide la Palabra.", "1 Timoteo 3:2"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Según qué debía apartar cada uno la ofrenda, según 1 Corintios 16:2?", "Según haya prosperado", ["Una cantidad fija para todos", "Lo que sobre al final del año", "Nada"], "«según haya prosperado».", "1 Corintios 16:2"],
      ["m2-02", 4, "o4", "comprender", "¿A quiénes protegen los controles del dinero?", "A la iglesia, del error y del robo, y a los líderes, de la sospecha", ["Solo al tesorero", "A nadie", "Al banco"], "«evitando que nadie nos censure».", "2 Corintios 8:20"],
      ["m2-03", 4, "o4", "aplicar", "El tesorero cuenta solo las ofrendas. ¿Qué cambio propones?", "Que las cuenten al menos dos personas que no sean parientes, y que las dos firmen", ["Que el tesorero las lleve a su casa", "Que nadie las cuente", "Que se cuenten una vez al año"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-04", 4, "o4", "recordar", "¿A quiénes envió Pablo con la ofrenda?", "A hermanos de confianza", ["A desconocidos", "A nadie", "A los soldados"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué se calcula el costo antes de un proyecto?", "Para no empezar algo que no se pueda terminar", ["Para gastar más", "Para no orar", "No hace falta"], "«a ver si tiene lo que necesita para acabarla».", "Lucas 14:28"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué informe financiero es mejor?", "Uno periódico, claro y presentado a la iglesia o a su consejo", ["Uno secreto", "Uno que nunca se hace", "Uno que solo conoce el tesorero"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hizo Nehemías antes de presentar su pedido al rey?", "Oró al Dios de los cielos", ["Escribió una queja", "Huyó", "Pidió dinero prestado"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué los planes se hacen con el consejo del equipo?", "Porque en la multitud de consejeros se afirman", ["Para culpar a otros si fallan", "Porque el líder no sabe nada", "No hace falta consejo"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
      ["m2-09", 5, "o5", "aplicar", "¿Qué harías al terminar una reunión de planificación?", "Escribir en un acta los acuerdos: qué, quién y para cuándo", ["Irte sin conclusiones", "Confiar en la memoria de todos", "Anunciar todo sin acuerdos"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-10", 5, "o5", "recordar", "¿Quién endereza los pasos del que planifica, según Proverbios 16:9?", "Jehová", ["El rey", "El dinero", "La suerte"], "«Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
      ["m2-11", 5, "o5", "analizar", "¿Qué relación hay entre planificar y orar?", "El plan empieza en oración y se encomienda a Dios", ["Planificar reemplaza la oración", "No tienen relación", "Orar reemplaza el plan"], "«Encomienda a Jehová tus obras».", "Proverbios 16:3"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál es la mejor manera de comunicar una decisión importante?", "Explicarla con sus razones, con tiempo y por los medios que la gente usa", ["Anunciarla en el último momento", "No explicarla", "Comunicarla solo a algunos"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
      ["m2-13", 6, "o6", "recordar", "¿Qué se da a César, según Mateo 22:21?", "Lo que es de César", ["Todo lo que tenemos", "Lo que es de Dios", "Nada"], "«Dad, pues, a César lo que es de César».", "Mateo 22:21"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué cumplir la ley es parte del testimonio de la iglesia?", "Porque muestra honradez y obediencia delante de todos", ["Porque la ley está sobre Dios", "No es parte del testimonio", "Porque así se evita orar"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
      ["m2-15", 6, "o6", "aplicar", "Un hermano da a la iglesia 500 dólares y quiere deducirlos de sus impuestos. ¿Qué necesita?", "Un reconocimiento escrito de la iglesia", ["Nada", "Una foto del sobre", "Un recibo de su propio banco"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["m2-16", 6, "o6", "recordar", "¿Qué guía del IRS para iglesias menciona la lección?", "La Publicación 1828", ["El formulario 1040", "La Publicación 17", "Ninguna"], "Es una guía tributaria para iglesias y organizaciones religiosas.", "Mateo 22:21"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué la lección legal termina pidiendo consultar a un profesional?", "Porque es una guía general: las leyes cambian y cada caso es distinto", ["Porque la ley no importa", "Porque los profesionales mandan en la iglesia", "No pide eso"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué hace una iglesia responsable con la protección de menores?", "Sigue normas claras y reporta toda sospecha de abuso a las autoridades", ["Lo resuelve en privado", "Espera tener pruebas sin reportar", "No hace nada"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-administracion-e1",
      tipo: "corta",
      pregunta: "Explica por qué la administración es un don y una mayordomía, y qué marca a una administración que sirve.",
      ideas: [
        { id: "don", peso: 25, texto: "Es un don que Dios da a la iglesia.", formas: ["don", "los que administran", "dones"] },
        { id: "mayordomia", peso: 25, texto: "Es una mayordomía: cuidar lo que es de Dios.", formas: ["mayordom*", "administradores", "lo que es de dios", "cuidar"] },
        { id: "orden", peso: 20, texto: "El orden: Dios no es Dios de confusión.", formas: ["orden", "confusion", "decentemente"] },
        { id: "sirve", peso: 20, texto: "Sirve a la misión y a las personas, con transparencia, sin controlar por controlar.", formas: ["sirve a", "mision", "transparen*", "no controla"] },
      ],
      citas: ["1 Corintios 14:40", "1 Corintios 14:33", "1 Corintios 12:28", "1 Pedro 4:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Administrar es un don, porque Pablo nombra a los que administran entre los dones (1 Corintios 12:28), y una mayordomía: cuidar lo que es de Dios. Dios no es Dios de confusión, y todo se hace con orden. Una buena administración sirve a la misión y a las personas, con transparencia, y no controla por controlar.",
    },
    {
      id: "n5-administracion-e2",
      tipo: "corta",
      pregunta: "Explica las tres formas históricas de gobierno de la iglesia y qué necesitan todas.",
      ideas: [
        { id: "episcopal", peso: 20, texto: "La episcopal, con obispos.", formas: ["episcopal", "obispos"] },
        { id: "presbiteriana", peso: 20, texto: "La presbiteriana, con ancianos y concilios.", formas: ["presbiterian*", "ancianos", "concilios"] },
        { id: "congregacional", peso: 20, texto: "La congregacional, con la congregación.", formas: ["congregacional", "la congregacion"] },
        { id: "comun", peso: 30, texto: "Lo que todas necesitan: carácter, decisiones claras, rendición de cuentas y la Palabra.", formas: ["caracter", "rendicion de cuentas", "rendir cuentas", "decisiones claras", "la palabra", "estatutos"] },
      ],
      citas: ["Hechos 14:23", "Hechos 15:22", "Tito 1:5", "Hechos 15:28", "1 Timoteo 3:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la forma episcopal, obispos supervisan a varias iglesias; en la presbiteriana, ancianos gobiernan juntos y en concilios; y en la congregacional, la congregación toma las decisiones principales. Todas necesitan líderes de buen carácter, decisiones claras, rendición de cuentas y la guía de la Palabra, como en Hechos 15:22.",
    },
    {
      id: "n5-administracion-e3",
      tipo: "corta",
      pregunta: "Explica cómo debe manejar una iglesia su dinero con transparencia.",
      ideas: [
        { id: "presupuesto", peso: 20, texto: "Un presupuesto aprobado.", formas: ["presupuesto"] },
        { id: "contar", peso: 30, texto: "Dos personas cuentan y firman, y se deposita en la cuenta de la iglesia.", formas: ["dos personas", "cuentan", "firman", "deposit*", "cuenta de la iglesia"] },
        { id: "registros", peso: 20, texto: "Gastos aprobados con recibos e informes.", formas: ["recibo*", "informe*", "registr*", "aprueban"] },
        { id: "revision", peso: 20, texto: "Una revisión anual por otros: la transparencia protege.", formas: ["revis*", "auditor*", "protege", "honradamente"] },
      ],
      citas: ["2 Corintios 8:20-21", "2 Corintios 8:21", "2 Corintios 8:20", "1 Corintios 16:1-2", "Lucas 14:28", "Proverbios 11:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia aprueba un presupuesto anual. Las ofrendas las cuentan dos personas que firman, y se depositan pronto en la cuenta de la iglesia. Los gastos se aprueban con recibos, se presentan informes y cada año otros revisan las cuentas, porque se procura hacer las cosas honradamente delante de todos (2 Corintios 8:21).",
    },
    {
      id: "n5-administracion-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo organizarías la administración de un ministerio o de una iglesia pequeña durante un año: los equipos y sus responsables, el manejo del dinero, la planificación y la comunicación, y los pasos legales que revisarías. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "equipos", peso: 20, texto: "Los equipos y sus responsables.", formas: ["equipo*", "responsable*", "proposito", "voluntari*"] },
        { id: "dinero", peso: 20, texto: "El manejo del dinero.", formas: ["presupuesto", "dos personas", "ofrendas", "recibos", "informe"] },
        { id: "planificar", peso: 20, texto: "La planificación.", formas: ["plan", "metas", "calendario", "orando", "oracion"] },
        { id: "comunicar", peso: 20, texto: "La comunicación.", formas: ["comunic*", "anuncio*", "acta", "actas", "informar"] },
        { id: "legal", peso: 20, texto: "Los pasos legales.", formas: ["estatutos", "legal*", "abogado", "contador", "ein", "seguros", "recibos para los donantes"] },
      ],
      basta: 85,
      citas: ["1 Corintios 14:40", "1 Corintios 14:33", "1 Pedro 4:10", "Hechos 6:3", "2 Corintios 8:20-21", "2 Corintios 8:21", "1 Corintios 16:2", "Lucas 14:28", "Nehemías 2:4-5", "Proverbios 15:22", "Proverbios 16:9", "Proverbios 16:3", "Habacuc 2:2", "Mateo 22:21", "Tito 3:1", "Romanos 13:1-7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Para un año en nuestra iglesia pequeña, empezaría orando con el consejo, porque los planes se afirman con consejo (Proverbios 15:22). Escribiríamos un plan con tres metas, un calendario anual y fechas para revisar el avance. Formaría cuatro equipos, alabanza, niños, bienvenida y visitación, cada uno con su propósito escrito y un responsable de buen testimonio, como en Hechos 6:3, y prepararíamos a los voluntarios antes de servir. Para el dinero, aprobaríamos un presupuesto, las ofrendas las contarían dos personas que firman, se depositarían pronto en la cuenta de la iglesia y presentaríamos un informe cada trimestre, para hacer las cosas honradamente (2 Corintios 8:21). Para comunicar, cada reunión tendría acta con los acuerdos, y los anuncios saldrían con tiempo por los medios que la gente usa. En lo legal, revisaría con un abogado o un contador que tengamos los estatutos al día, el EIN, los recibos para los donantes, las normas de protección de menores y los seguros. Así todo se haría decentemente y con orden.",
    },
    {
      id: "n5-administracion-e5",
      tipo: "breve",
      pregunta:
        "Un hermano te pregunta por qué la iglesia necesita estatutos, presupuesto y controles si todo es del Señor. Escribe tu respuesta con base bíblica: explica el orden, la transparencia y la responsabilidad ante las leyes. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "orden", peso: 25, texto: "El orden: Dios no es Dios de confusión.", formas: ["orden", "confusion", "decentemente"] },
        { id: "mayordomia", peso: 15, texto: "Somos administradores de lo que es de Dios.", formas: ["mayordom*", "administradores", "es de dios", "es del señor"] },
        { id: "transparencia", peso: 25, texto: "La transparencia y los controles.", formas: ["transparen*", "honradamente", "confianza", "dos personas", "informe*", "censure"] },
        { id: "ley", peso: 20, texto: "La responsabilidad ante las leyes.", formas: ["cesar", "leyes", "autoridades", "legal*"] },
        { id: "proteger", peso: 15, texto: "Los controles protegen a la iglesia y a sus líderes.", formas: ["protege*", "sospecha", "robo"] },
      ],
      basta: 85,
      citas: ["1 Corintios 14:40", "1 Corintios 14:33", "1 Pedro 4:10", "2 Corintios 8:20-21", "2 Corintios 8:21", "Lucas 14:28", "Mateo 22:21", "Tito 3:1", "Romanos 13:1-7", "Romanos 13:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Es verdad que todo es del Señor, y por eso mismo debemos cuidarlo bien: somos administradores de lo que es de Dios, como enseña 1 Pedro 4:10. Dios no es Dios de confusión, sino de paz, y Pablo pide que todo se haga decentemente y con orden (1 Corintios 14:40); los estatutos y el presupuesto son parte de ese orden, porque dicen cómo se decide y cómo se usa lo que el pueblo da. Los controles traen transparencia: Pablo cuidaba la ofrenda evitando que nadie lo censurara y procuraba hacer las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:20-21). Que dos personas cuenten las ofrendas y que se presente un informe protege a la iglesia del error y del robo, y protege a los líderes de la sospecha. Además, Jesús enseñó a dar a César lo que es de César (Mateo 22:21): cumplir las leyes sobre las organizaciones, los impuestos y la protección de menores también es obediencia y testimonio. El orden no estorba al Espíritu: le sirve.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-administracion-b1",
    tipo: "breve",
    pregunta:
      "Prepara un reglamento sencillo para el manejo de las ofrendas de una iglesia: quiénes las cuentan, cómo se registran y se depositan, cómo se aprueban los gastos, cómo se informa y cómo se revisa. Explica la base bíblica de cada norma. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "contar", peso: 25, texto: "Quiénes cuentan las ofrendas.", formas: ["dos personas", "contaran", "contar", "firman", "firmaran"] },
      { id: "depositar", peso: 20, texto: "Cómo se registran y se depositan.", formas: ["deposit*", "cuenta de la iglesia", "registr*", "anot*"] },
      { id: "gastos", peso: 20, texto: "Cómo se aprueban los gastos.", formas: ["gastos", "recibo*", "presupuesto", "autoriz*"] },
      { id: "informe", peso: 15, texto: "Cómo se informa.", formas: ["informe*", "informar", "rendir cuentas"] },
      { id: "revision", peso: 20, texto: "Cómo se revisa.", formas: ["revis*", "auditor*", "cada año", "anual*"] },
    ],
    basta: 85,
    citas: ["2 Corintios 8:20-21", "2 Corintios 8:20", "2 Corintios 8:21", "2 Corintios 8:16-23", "1 Corintios 16:1-2", "1 Corintios 16:2", "Lucas 14:28", "Lucas 16:10", "Proverbios 11:1", "1 Corintios 14:40", "Romanos 13:7"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Reglamento de ofrendas de nuestra iglesia. Primero: las ofrendas las contarán siempre dos personas que no sean parientes, y las dos firmarán el registro, porque Pablo cuidaba la ofrenda evitando que nadie lo censurara (2 Corintios 8:20). Segundo: lo contado se anotará en un registro y se depositará el mismo día o el siguiente en la cuenta de la iglesia, nunca en una cuenta personal, para hacer las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:21). Tercero: los gastos seguirán el presupuesto aprobado y se autorizarán por escrito, con su recibo guardado, porque antes de edificar hay que calcular los gastos (Lucas 14:28). Cuarto: cada trimestre se presentará un informe a la iglesia, ya que la ofrenda es del pueblo de Dios y todos deben saber cómo se usa. Quinto: una vez al año, dos personas que no manejan el dinero revisarán las cuentas y los recibos, porque el que es fiel en lo muy poco, también en lo más es fiel (Lucas 16:10). Estas normas protegen a la iglesia y a quienes sirven con el dinero.",
  },
};
