/**
 * El banco del «Seminario de liderazgo ministerial» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el método para estudiar un caso · o2 un desacuerdo con el modelo de Hechos 15 · o3 el dinero faltante ·
 * o4 un líder que cae · o5 una iglesia que crece · o6 el plan de ministerio · o7 el versículo de memoria (Proverbios 16:3).
 * Los casos son ejemplos compuestos, no de personas reales. Quién puede ejercer cada cargo no se evalúa aquí: es un punto
 * de la declaración de fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-seminario-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_SEMINARIO: BancoMateria = {
  materia: "n5-seminario",
  repaso: {
    "n5-seminario-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué le pasa, según Proverbios 18:13, al que responde antes de oír?", "Le es fatuidad y oprobio", ["Le es honra y gloria", "Le es sabiduría", "No le pasa nada"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
      ["1-r2", 1, "o1", "comprender", "¿Qué enseña Proverbios 18:17 antes de juzgar?", "Que hay que escuchar a todas las partes", ["Que el primero que habla siempre tiene la razón", "Que basta con oír a uno", "Que no hace falta escuchar"], "«Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre».", "Proverbios 18:17"],
      ["1-r3", 1, "o1", "recordar", "¿Cuál es el primer paso del método para estudiar un caso?", "Los hechos: qué pasó y qué se sabe con certeza, sin suposiciones", ["La decisión", "La evaluación", "Las opciones"], "Después vienen el problema de fondo, los principios bíblicos, las opciones, la decisión y la evaluación.", "Proverbios 18:13"],
    ] as P[]).map(p),
    "n5-seminario-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hicieron los apóstoles y los ancianos ante la discusión de Hechos 15?", "Se reunieron para conocer del asunto", ["Se separaron", "Ignoraron el problema", "Dejaron que cada iglesia decidiera sola"], "«Y se reunieron los apóstoles y los ancianos para conocer de este asunto».", "Hechos 15:6"],
      ["2-r2", 2, "o2", "comprender", "En el caso del culto, ¿cuál es el problema de fondo?", "Cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias", ["Solo la música", "El volumen del sonido", "La hora del culto"], "La música es lo que se ve; el fondo es la unidad de la iglesia.", "Hechos 15:6-7"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué criterio da Romanos 14:19 para decidir en un desacuerdo?", "Seguir lo que contribuye a la paz y a la mutua edificación", ["Seguir lo que quiera la mayoría", "Seguir el gusto del líder", "Seguir lo más moderno"], "«Así que, sigamos lo que contribuye a la paz y a la mutua edificación».", "Romanos 14:19"],
    ] as P[]).map(p),
    "n5-seminario-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pedía la Ley para mantener una acusación, según Deuteronomio 19:15?", "El testimonio de dos o tres testigos", ["Un rumor", "La palabra de una sola persona", "Una sospecha"], "«por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
      ["3-r2", 3, "o3", "comprender", "En el caso del dinero faltante, ¿cuál es el problema de fondo?", "Que la iglesia nunca tuvo controles", ["Que el tesorero es un ladrón", "Que el banco se equivocó", "Que la iglesia da poco"], "Todavía no se sabe si hubo un error, una pérdida o un robo.", "Deuteronomio 19:15"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué se pide a la iglesia mientras se revisa el caso del dinero?", "Que nadie repita rumores", ["Que acusen al tesorero", "Que dejen de ofrendar", "Que voten su expulsión"], "No se acusa a nadie por sospechas ni por rumores.", "Deuteronomio 19:15"],
    ] as P[]).map(p),
    "n5-seminario-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le dijo Natán a David?", "Tú eres aquel hombre", ["No has pecado", "Dios no lo vio", "Huye de Jerusalén"], "«Tú eres aquel hombre».", "2 Samuel 12:7"],
      ["4-r2", 4, "o4", "comprender", "¿Qué muestra lo que pasó después de que Dios perdonó a David?", "Que el perdón no borra todas las consecuencias", ["Que el pecado no tiene consecuencias", "Que Dios no perdona", "Que David no se arrepintió"], "Dios lo perdonó, pero las consecuencias de su pecado siguieron (2 Samuel 12:10-14).", "2 Samuel 12:13"],
      ["4-r3", 4, "o4", "aplicar", "En la propuesta del caso del líder que cae, ¿a quiénes se cuida primero?", "A las personas heridas: la esposa del líder, la otra persona y sus familias", ["Al líder, para que no pierda su cargo", "A la reputación de la iglesia", "A nadie en especial"], "Después, el líder deja su servicio y recibe disciplina y acompañamiento.", "Gálatas 6:1"],
    ] as P[]).map(p),
    "n5-seminario-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué hacía el Señor en Jerusalén, según Hechos 2:47?", "Añadía cada día a la iglesia los que habían de ser salvos", ["Cerraba la iglesia", "Apartaba a los débiles", "Nada en especial"], "«Y el Señor añadía cada día a la iglesia los que habían de ser salvos».", "Hechos 2:47"],
      ["5-r2", 5, "o5", "comprender", "En el caso de la iglesia que crece, ¿cuál es el problema de fondo?", "Que creció en número, pero no en líderes ni en organización", ["Que creció demasiado", "Que los nuevos no quieren servir", "Que el pastor no ora"], "«No está bien lo que haces».", "Éxodo 18:17"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué propuesta ayuda a que cada persona sea conocida y cuidada?", "Abrir grupos pequeños", ["Hacer un solo culto más largo", "Que el pastor atienda a todos", "Pedir a los nuevos que esperen"], "Así el cuidado no depende de una sola persona, como aconsejó Jetro.", "Éxodo 18:17-18"],
    ] as P[]).map(p),
    "n5-seminario-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué promete Proverbios 16:3 al que encomienda a Jehová sus obras?", "Que sus pensamientos serán afirmados", ["Que nunca tendrá problemas", "Que será rico", "Que no necesitará planificar"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
      ["6-r2", 6, "o6", "recordar", "¿Cuántas partes tiene el plan de ministerio de la lección?", "Ocho", ["Dos", "Cuatro", "Veinte"], "El llamado y la visión, el diagnóstico, las metas, el equipo, los recursos, el calendario, la evaluación y el cuidado personal.", "Habacuc 2:2"],
      ["6-r3", 6, "o6", "comprender", "¿Para qué se escribe el plan de ministerio?", "Para compartirlo con el equipo, revisarlo y mejorarlo", ["Para guardarlo y olvidarlo", "Para que nadie lo vea", "Para no tener que orar"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el método (10)
    ["f01", 1, "o1", "recordar", "¿Qué se busca en el paso de los hechos?", "Qué pasó, quiénes están involucrados y qué se sabe con certeza", ["Lo que opinan los demás", "Las suposiciones de cada uno", "Quién tiene la culpa, antes de oír"], "Los hechos se separan de las suposiciones.", "Proverbios 18:13"],
    ["f02", 1, "o1", "comprender", "¿Qué suele ser lo que se ve en un caso, según el método?", "Un síntoma del problema de fondo", ["Siempre el problema completo", "Algo sin importancia", "Una mentira"], "Por eso hay que preguntar qué hay debajo.", "Proverbios 18:17"],
    ["f03", 1, "o1", "recordar", "¿Qué se piensa en el paso de las opciones?", "Dos o tres caminos posibles, con sus consecuencias", ["Un solo camino, sin pensar", "Ninguno", "Todos los caminos, sin evaluarlos"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ["f04", 1, "o1", "recordar", "¿Qué incluye el paso de la decisión?", "Qué se hará, quién lo hará y cómo se comunicará", ["Solo lo que se hará", "Solo quién tiene la culpa", "Nada que se comunique"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    ["f05", 1, "o1", "comprender", "¿Para qué sirve el paso de la evaluación?", "Para volver después y ver qué resultó y qué se aprendió", ["Para culpar a alguien", "Para no decidir nunca", "Para olvidar el caso"], "La evaluación es el último paso del método.", "Proverbios 18:13"],
    ["f06", 1, "o1", "recordar", "¿Qué se hace en cada paso del método, según la lección?", "Se ora pidiendo sabiduría a Dios y se busca el consejo de hermanos maduros", ["Se decide solo y rápido", "Se consulta solo a los amigos", "Se espera sin orar"], "«Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios».", "Santiago 1:5"],
    ["f07", 1, "o1", "aplicar", "Te cuentan una queja contra un hermano. ¿Qué haces, según Proverbios 18:17?", "Escuchar también al hermano antes de juzgar", ["Juzgar enseguida con lo que te contaron", "Contarlo a otros", "Ignorar la queja sin hablar con nadie"], "«Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre».", "Proverbios 18:17"],
    ["f08", 1, "o1", "analizar", "¿Por qué el método separa los hechos de las suposiciones?", "Porque decidir sobre suposiciones lleva a errores e injusticias", ["Porque las suposiciones siempre son verdad", "Porque los hechos no importan", "Para ganar tiempo"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
    ["f09", 1, "o1", "evaluar", "¿Qué líder sigue mejor el método del seminario?", "Uno que escucha a todos, busca el fondo, ora, consulta, decide con claridad y después evalúa", ["Uno que decide antes de oír", "Uno que solo escucha a sus amigos", "Uno que nunca decide"], "«el cual da a todos abundantemente y sin reproche, y le será dada».", "Santiago 1:5"],
    ["f10", 1, "o7", "recordar", "Completa Proverbios 16:3: Encomienda a Jehová tus obras…", "Y tus pensamientos serán afirmados", ["Y tendrás muchas riquezas", "Y nunca sufrirás", "Y no necesitarás consejo"], "Es el versículo de memoria de la materia.", "Proverbios 16:3"],
    // ---- lección 2: un desacuerdo que amenaza con dividir (10)
    ["f11", 2, "o2", "recordar", "En el caso del culto, ¿qué piden los jóvenes?", "Un culto con música actual", ["Menos reuniones", "Un templo nuevo", "Otro pastor"], "Los mayores sienten que se pierde la reverencia.", "Romanos 14:19"],
    ["f12", 2, "o2", "recordar", "¿Qué hechos muestra el caso del culto?", "Dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse", ["Un faltante de dinero", "Un líder que cayó", "Una iglesia que crece muy rápido"], "Lo que se ve es la música; el fondo es la unidad.", "Hechos 15:6-7"],
    ["f13", 2, "o2", "comprender", "¿Qué hicieron en Hechos 15, además de escuchar a las partes?", "Examinaron la Escritura y llegaron a un acuerdo", ["Votaron sin orar", "Expulsaron a los que pensaban distinto", "Dejaron el asunto sin resolver"], "«Y se reunieron los apóstoles y los ancianos para conocer de este asunto».", "Hechos 15:6"],
    ["f14", 2, "o2", "comprender", "¿Qué frase de Hechos 15:28 muestra que buscaron la dirección de Dios?", "Ha parecido bien al Espíritu Santo, y a nosotros", ["Así lo quiso la mayoría", "Así lo mandó el emperador", "Así nos convino a nosotros"], "Buscaron la dirección de Dios, no solo la mayoría.", "Hechos 15:28"],
    ["f15", 2, "o2", "recordar", "¿Cómo se comunicó la decisión de Hechos 15?", "Por escrito y con humildad", ["Con amenazas", "En secreto", "No se comunicó"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
    ["f16", 2, "o2", "aplicar", "¿Cómo escuchan los líderes a los dos grupos, según la propuesta?", "Primero por separado y después juntos", ["Solo a los jóvenes", "Solo a los mayores", "A ninguno"], "«Y se reunieron los apóstoles y los ancianos para conocer de este asunto».", "Hechos 15:6"],
    ["f17", 2, "o2", "aplicar", "¿Qué enseñan los líderes en el caso del culto?", "Sobre la adoración y el amor que no busca lo suyo, distinguiendo lo bíblico del gusto personal", ["Que la música actual es pecado", "Que la reverencia no importa", "Que cada uno haga lo que quiera"], "«Así que, sigamos lo que contribuye a la paz y a la mutua edificación».", "Romanos 14:19"],
    ["f18", 2, "o2", "aplicar", "¿Qué se pide sobre las críticas en el caso del culto?", "Que se hablen de frente", ["Que se hagan en los pasillos", "Que se publiquen en las redes", "Que se guarden con rencor"], "Los líderes también explican la decisión con sus razones.", "Romanos 14:19"],
    ["f19", 2, "o2", "analizar", "¿Por qué el problema del culto no es solo la música?", "Porque detrás hay una pregunta de unidad: cómo decidir juntos y amarse en las diferencias", ["Porque la música no importa nada", "Porque el problema es el dinero", "Porque los mayores siempre tienen razón"], "«sigamos lo que contribuye a la paz y a la mutua edificación».", "Romanos 14:19"],
    ["f20", 2, "o2", "evaluar", "¿Qué solución honra mejor a los dos grupos?", "Variedad en el culto, o espacios distintos que no dividan a la iglesia, con visitas y una nueva evaluación", ["Imponer el gusto de los jóvenes", "Imponer el gusto de los mayores", "Dejar que las dos familias se vayan sin hablarles"], "«Así que, sigamos lo que contribuye a la paz».", "Romanos 14:19"],
    // ---- lección 3: el dinero y la confianza (10)
    ["f21", 3, "o3", "recordar", "En el caso del dinero, ¿cuánto falta según el banco?", "800 dólares", ["80 dólares", "8000 dólares", "Nada"], "El banco muestra 800 dólares menos de lo que se anotó.", "2 Corintios 8:20-21"],
    ["f22", 3, "o3", "recordar", "¿Quién contaba las ofrendas en la iglesia del caso?", "El tesorero, solo, desde hacía años", ["Dos personas que firmaban", "El banco", "Toda la iglesia"], "Una sola persona manejaba el dinero.", "2 Corintios 8:20-21"],
    ["f23", 3, "o3", "comprender", "¿Qué se sabe con certeza al empezar el caso del dinero?", "Que hay una diferencia de 800 dólares, pero no si fue un error, una pérdida o un robo", ["Que el tesorero robó", "Que el banco robó", "Que no falta nada"], "«por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
    ["f24", 3, "o3", "comprender", "¿Qué enseña Deuteronomio 19:15 para este caso?", "Que no se acusa a nadie por sospechas ni por rumores", ["Que basta un rumor para acusar", "Que el tesorero es culpable", "Que no hay que revisar nada"], "«Sólo por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
    ["f25", 3, "o3", "aplicar", "¿Quiénes revisan los registros y el banco?", "Dos personas de confianza, con calma", ["El tesorero solo", "Cualquiera que quiera", "Nadie"], "«por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
    ["f26", 3, "o3", "aplicar", "¿Cómo se habla con el tesorero?", "En privado, escuchándolo y sin acusarlo de antemano", ["Delante de toda la iglesia", "Acusándolo desde el principio", "No se habla con él"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
    ["f27", 3, "o3", "aplicar", "Si se comprueba que hubo un robo, ¿qué propone la lección?", "Buscar el arrepentimiento y la restitución, que la persona deje ese servicio y pedir consejo legal", ["Olvidarlo sin hablar", "Publicar su nombre en las redes", "Dejarlo en su servicio como si nada"], "Si fue un error, en cambio, se corrige y se aprende.", "2 Corintios 8:20-21"],
    ["f28", 3, "o3", "aplicar", "¿Qué controles se ponen desde ya?", "Dos personas que cuentan y firman, depósitos pronto e informes a la iglesia", ["Ninguno", "Que el tesorero cuente solo, con más cuidado", "Guardar el dinero en una casa"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f29", 3, "o3", "analizar", "¿Por qué los controles protegen también al tesorero?", "Porque con dos personas que cuentan, nadie queda bajo sospecha", ["Porque así puede tomar dinero", "No lo protegen", "Porque así trabaja menos"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20"],
    ["f30", 3, "o3", "evaluar", "¿Qué respuesta al caso del dinero es más justa?", "Revisar con calma, escuchar en privado, no repetir rumores y poner controles", ["Acusar al tesorero ante todos", "No hacer nada, para evitar problemas", "Quitarle el servicio sin hablar con él"], "«Sólo por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
    // ---- lección 4: un líder que cae (10)
    ["f31", 4, "o4", "recordar", "¿A quién envió Dios a confrontar a David?", "Al profeta Natán", ["Al profeta Elías", "A Samuel", "A Saúl"], "«Tú eres aquel hombre».", "2 Samuel 12:7"],
    ["f32", 4, "o4", "recordar", "¿Qué respondió David cuando fue confrontado?", "Pequé contra Jehová", ["No es verdad", "Fue culpa de otro", "Nadie me vio"], "«Pequé contra Jehová».", "2 Samuel 12:13"],
    ["f33", 4, "o4", "comprender", "¿Cómo debe ser la confrontación, según la lección?", "Clara, en privado al principio y con la verdad", ["En público desde el primer momento", "Con insultos", "Por mensajes anónimos"], "«Tú eres aquel hombre».", "2 Samuel 12:7"],
    ["f34", 4, "o4", "comprender", "¿Cuál es el problema de fondo en el caso del líder que cae?", "Un pecado grave que hiere a varias familias, y una iglesia que necesita verdad, justicia y cuidado", ["Solo un chisme", "Que el líder es joven", "Que la iglesia es pequeña"], "Por eso los hechos se confirman con cuidado, escuchando a las personas involucradas.", "Gálatas 6:1"],
    ["f35", 4, "o4", "aplicar", "¿Qué pasa con el servicio del líder?", "Lo deja de inmediato y recibe disciplina y acompañamiento", ["Sigue sirviendo como si nada", "Pasa a otro ministerio sin que nadie lo sepa", "Se lo aparta sin acompañarlo"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
    ["f36", 4, "o4", "aplicar", "¿Qué información recibe la iglesia?", "Una información veraz y prudente, sin detalles innecesarios", ["Todos los detalles", "Ninguna información", "Solo rumores"], "Al mismo tiempo, se frena el chisme.", "Gálatas 6:1"],
    ["f37", 4, "o4", "aplicar", "Si en un caso estuviera involucrado un menor o una persona vulnerable, ¿qué se hace?", "Se protege a la víctima y se reporta a las autoridades", ["Se resuelve en privado, sin reportar", "Se espera a ver qué pasa", "Se pide a la víctima que calle"], "En Texas, además, toda persona debe reportar la sospecha de abuso de un menor.", "Gálatas 6:1"],
    ["f38", 4, "o4", "comprender", "¿Qué enseña la historia de David sobre el perdón?", "Que Dios perdona, pero el perdón no borra todas las consecuencias", ["Que el perdón borra todas las consecuencias", "Que Dios no perdona a los líderes", "Que el pecado no tiene consecuencias"], "Dios perdonó a David, pero las consecuencias de su pecado siguieron (2 Samuel 12:10-14).", "2 Samuel 12:13"],
    ["f39", 4, "o4", "analizar", "¿Por qué volver a un cargo, si llega, es un proceso largo y evaluado?", "Porque buscar la restauración espiritual no es lo mismo que volver a un cargo", ["Porque nunca hay perdón", "Porque así se lo castiga para siempre", "No lo es: vuelve enseguida"], "«restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado».", "Gálatas 6:1"],
    ["f40", 4, "o4", "evaluar", "¿Qué respuesta al caso del líder que cae es más bíblica?", "Confirmar los hechos, cuidar a los heridos, confrontar con la verdad, apartar al líder y buscar su restauración con mansedumbre", ["Esconderlo todo para proteger el nombre de la iglesia", "Exponerlo en público y abandonarlo", "No hacer nada, porque todos pecan"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
    // ---- lección 5: crecer sin perder el rumbo (10)
    ["f41", 5, "o5", "recordar", "¿De cuántas a cuántas personas pasó la iglesia del caso?", "De sesenta a doscientas, en dos años", ["De diez a veinte", "De doscientas a sesenta", "De mil a dos mil"], "El crecimiento es una bendición, pero trae desafíos.", "Hechos 2:47"],
    ["f42", 5, "o5", "recordar", "¿Qué le dijo Jetro a Moisés en Éxodo 18:17?", "No está bien lo que haces", ["Todo lo haces bien", "Trabaja más horas", "Deja al pueblo"], "«No está bien lo que haces».", "Éxodo 18:17"],
    ["f43", 5, "o5", "comprender", "¿Qué muestran los hechos del caso de la iglesia que crece?", "Un pastor agotado, nuevos que no conocen a nadie y voluntarios que son siempre los mismos", ["Una iglesia que se vacía", "Un faltante de dinero", "Dos grupos que discuten por la música"], "«Desfallecerás del todo».", "Éxodo 18:18"],
    ["f44", 5, "o5", "comprender", "¿Qué dice la lección del crecimiento de la iglesia?", "Que es una bendición, aunque trae desafíos", ["Que siempre es malo", "Que es malo si pasa de cien", "Que no trae ningún desafío"], "«Y el Señor añadía cada día a la iglesia los que habían de ser salvos».", "Hechos 2:47"],
    ["f45", 5, "o5", "aplicar", "¿Qué enseña 2 Timoteo 2:2 para este caso?", "Escoger a personas fieles y formarlas como líderes", ["Que el pastor lo haga todo", "Que no hace falta formar a nadie", "Que solo enseñen los mayores"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f46", 5, "o5", "aplicar", "¿Qué camino se ofrece a los nuevos?", "Bienvenida, primeros pasos y la academia desde el Nivel 1", ["Ninguno: que se integren solos", "Solo un saludo en la puerta", "Esperar un año para conocer a alguien"], "Los nuevos necesitan un camino claro para integrarse.", "Hechos 2:47"],
    ["f47", 5, "o5", "aplicar", "¿Cómo se invita a servir en la iglesia que crece?", "Personalmente, según los dones de cada uno", ["Con un anuncio general y nada más", "Obligando a todos", "Solo a los de siempre"], "Así los voluntarios dejan de ser siempre los mismos.", "Éxodo 18:17-18"],
    ["f48", 5, "o5", "analizar", "¿Qué relación hay entre el consejo de Jetro y la iglesia del caso?", "En los dos casos, una sola persona no puede atender a todos y hay que repartir el trabajo", ["Ninguna", "Que Moisés tenía doscientas personas", "Que Jetro era pastor"], "«No está bien lo que haces».", "Éxodo 18:17"],
    ["f49", 5, "o5", "analizar", "¿Qué pasó en Jerusalén cuando la iglesia se organizó en Hechos 6?", "La palabra siguió creciendo y los discípulos se multiplicaron", ["La iglesia se dividió", "Dejaron de predicar", "La iglesia se cerró"], "«Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén».", "Hechos 6:7"],
    ["f50", 5, "o5", "evaluar", "¿Qué plan responde mejor al caso de la iglesia que crece?", "Formar líderes, abrir grupos pequeños, dar un camino a los nuevos, invitar a servir y proteger el descanso del pastor", ["Que el pastor trabaje más horas", "Dejar de recibir a los nuevos", "Esperar a que el problema se resuelva solo"], "«Y crecía la palabra del Señor».", "Hechos 6:7"],
    // ---- lección 6: mi plan de ministerio (10)
    ["f51", 6, "o6", "recordar", "¿Con qué empieza y termina el plan de ministerio?", "Con oración", ["Con un presupuesto", "Con una fiesta", "Con una votación"], "«Encomienda a Jehová tus obras».", "Proverbios 16:3"],
    ["f52", 6, "o6", "recordar", "¿Cuál es la primera parte del plan de ministerio?", "El llamado y la visión", ["El presupuesto", "El calendario", "La evaluación"], "A qué te llamó Dios y hacia dónde crees que lleva tu ministerio.", "Habacuc 2:2"],
    ["f53", 6, "o6", "comprender", "¿Qué se mira en el diagnóstico del plan?", "Las fortalezas, las debilidades, las oportunidades y los riesgos del ministerio", ["Solo lo que sale bien", "Solo las quejas", "La vida privada de los demás"], "En el plan, el diagnóstico va antes de las metas.", "Lucas 14:28"],
    ["f54", 6, "o6", "comprender", "¿Cómo deben ser las metas del plan?", "Pocas, claras, que se puedan medir y con fecha", ["Muchas y generales", "Secretas", "Sin fecha, para no presionar"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f55", 6, "o6", "recordar", "¿Qué incluye la parte de los recursos?", "Lo que hace falta y un presupuesto sencillo", ["Solo los sueños", "Nada, porque no hace falta calcular", "Una lista de deudas"], "«queriendo edificar una torre, no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f56", 6, "o6", "recordar", "¿Qué incluye el cuidado personal en el plan?", "La vida con Dios, la familia y el descanso", ["Solo el trabajo", "Las vacaciones del equipo", "Nada"], "El plan cuida también al que sirve.", "Proverbios 16:3"],
    ["f57", 6, "o6", "aplicar", "¿Qué responde la parte de la evaluación?", "Cómo y cuándo se revisa el avance, y a quién se rinden cuentas", ["Cuánto dinero sobra", "Quién tiene la culpa", "Cuándo se termina para siempre"], "La lección pide revisar el plan cada trimestre.", "Habacuc 2:2"],
    ["f58", 6, "o6", "aplicar", "¿Con quién se recomienda escribir el plan de ministerio?", "Con tu pastor o con tu mentor", ["Solo, sin mostrarlo a nadie", "Con un desconocido", "Con cualquiera que pase"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ["f59", 6, "o6", "analizar", "¿Qué aportan Lucas 14:28 y Habacuc 2:2 al plan?", "Calcular antes de edificar y escribir la visión para compartirla y revisarla", ["Nada", "Que no hay que planificar", "Que el plan debe ser secreto"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan de ministerio está mejor hecho?", "Uno escrito en oración, con visión, diagnóstico, pocas metas con fecha, equipo, recursos, calendario, evaluación y cuidado personal", ["Uno que solo está en la mente del líder", "Uno con muchas metas y sin fechas", "Uno que nunca se revisa"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Cuántos pasos tiene el método para estudiar un caso?", "Seis", ["Dos", "Diez", "Uno"], "Los hechos, el problema de fondo, los principios bíblicos, las opciones, la decisión y la evaluación.", "Proverbios 18:13"],
      ["m1-02", 1, "o1", "recordar", "¿De dónde vienen los casos de esta materia?", "Son ejemplos compuestos a partir de situaciones comunes del ministerio, no de personas reales", ["Son noticias reales con sus nombres", "Son chismes de otras iglesias", "Son historias sin relación con el ministerio"], "Los nombres y los detalles no corresponden a personas reales.", "Proverbios 18:13"],
      ["m1-03", 1, "o1", "aplicar", "Un hermano llega enojado con una acusación. ¿Cuál es el primer paso?", "Averiguar los hechos, sin suposiciones", ["Decidir enseguida", "Buscar quién tiene la culpa", "Contarlo en la reunión"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
      ["m1-04", 1, "o1", "recordar", "¿Cómo da Dios la sabiduría al que se la pide, según Santiago 1:5?", "Abundantemente y sin reproche", ["Con reproche", "Solo a los pastores", "A cambio de algo"], "«el cual da a todos abundantemente y sin reproche, y le será dada».", "Santiago 1:5"],
      ["m1-05", 1, "o1", "analizar", "¿Qué diferencia hay entre el síntoma y el problema de fondo?", "El síntoma es lo que se ve; el problema de fondo es lo que hay debajo", ["No hay diferencia", "El síntoma siempre es lo más grave", "El problema de fondo siempre es el dinero"], "Por eso el método pregunta qué hay debajo.", "Proverbios 18:17"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué decisión sigue mejor Proverbios 18:13?", "Una que se toma después de escuchar", ["Una que se toma antes de oír, para ganar tiempo", "Una basada en el primer comentario", "Una que se toma por presión"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
      ["m1-07", 2, "o2", "recordar", "¿Qué sienten los mayores en el caso del culto?", "Que se pierde la reverencia", ["Que la música es muy lenta", "Que hay pocos jóvenes", "Que el templo es pequeño"], "Los jóvenes, en cambio, piden música actual.", "Romanos 14:19"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué Hechos 15 sirve de modelo para un desacuerdo?", "Porque los líderes se reunieron, escucharon, examinaron la Escritura y buscaron la dirección de Dios", ["Porque decidió la mayoría sin orar", "Porque Pedro decidió solo", "Porque no hubo discusión"], "«Y se reunieron los apóstoles y los ancianos para conocer de este asunto».", "Hechos 15:6"],
      ["m1-09", 2, "o2", "aplicar", "Dos familias dicen que se irán si cambian las cosas. ¿Qué propone la lección?", "Visitarlas y volver a evaluar en unos meses", ["Dejarlas ir sin hablarles", "Hacer todo lo que ellas pidan", "Pedirles que se vayan"], "«Así que, sigamos lo que contribuye a la paz y a la mutua edificación».", "Romanos 14:19"],
      ["m1-10", 2, "o2", "recordar", "¿Qué hubo antes de que Pedro hablara en Hechos 15:7?", "Mucha discusión", ["Silencio total", "Una fiesta", "Una votación"], "«Y después de mucha discusión, Pedro se levantó».", "Hechos 15:7"],
      ["m1-11", 2, "o2", "analizar", "¿Qué hay que distinguir al enseñar sobre la adoración en este caso?", "Lo que es bíblico de lo que es gusto personal", ["La música buena de la mala, según el líder", "A los jóvenes de los mayores", "Nada"], "Se enseña también sobre el amor que no busca lo suyo.", "Romanos 14:19"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué líder maneja mejor el desacuerdo del culto?", "Uno que escucha a los dos grupos, enseña, propone un camino que honre a ambos y explica sus razones", ["Uno que se pone del lado de los que dan más", "Uno que ignora las críticas", "Uno que decide sin explicar"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
      ["m1-13", 3, "o3", "recordar", "¿Qué decían algunos cuando apareció la diferencia de dinero?", "Que había un robo", ["Que el banco había ganado", "Que todo estaba bien", "Que había sobrado dinero"], "Por eso se pide no repetir rumores mientras se revisa.", "Deuteronomio 19:15"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué no se acusa al tesorero de inmediato?", "Porque todavía no se sabe si hubo un error, una pérdida o un robo", ["Porque es amigo del pastor", "Porque el dinero no importa", "Porque nadie lo vio"], "«Sólo por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
      ["m1-15", 3, "o3", "aplicar", "Si la diferencia fue un error, ¿qué se hace?", "Se corrige y se aprende", ["Se castiga al tesorero", "Se esconde", "Se cierra la cuenta del banco"], "Y desde ya se ponen controles.", "2 Corintios 8:20-21"],
      ["m1-16", 3, "o3", "recordar", "¿Delante de quiénes procuraba Pablo hacer las cosas honradamente?", "Delante del Señor y también delante de los hombres", ["Solo delante del Señor", "Solo delante de los apóstoles", "Delante de nadie"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
      ["m1-17", 3, "o3", "analizar", "¿Qué tienen en común el caso del dinero y Deuteronomio 19:15?", "Los dos piden justicia: no acusar sin pruebas", ["Los dos hablan de ofrendas", "Nada", "Los dos piden un castigo inmediato"], "«Sólo por el testimonio de dos o tres testigos se mantendrá la acusación».", "Deuteronomio 19:15"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué iglesia aprendió mejor del caso del dinero?", "Una que ahora tiene dos personas que cuentan y firman, depósitos rápidos e informes", ["Una que cambió de tesorero, pero sigue sin controles", "Una que dejó de recoger ofrendas", "Una que sigue con los rumores"], "«evitando que nadie nos censure».", "2 Corintios 8:20"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué servicio tenía el líder del caso?", "Era líder de jóvenes, y estaba casado", ["Era el tesorero", "Era el pastor principal", "Era un visitante"], "Mantenía una relación inapropiada con una mujer adulta de la iglesia.", "Gálatas 6:1"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué se confirman los hechos con cuidado?", "Porque hay que escuchar a las personas involucradas antes de actuar", ["Para ganar tiempo y no hacer nada", "Porque la noticia no importa", "Para encontrar a quién culpar"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
      ["m2-03", 4, "o4", "aplicar", "La noticia corre por los teléfonos. ¿Qué hace la iglesia?", "Da una información veraz y prudente, y frena el chisme", ["Reenvía los mensajes", "Publica todos los detalles", "Calla y deja correr los rumores"], "Sin detalles innecesarios.", "Gálatas 6:1"],
      ["m2-04", 4, "o4", "recordar", "¿Con qué espíritu se restaura al que cae, según Gálatas 6:1?", "Con espíritu de mansedumbre", ["Con enojo", "Con burla", "Con prisa"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué Gálatas 6:1 pide al que restaura que se considere a sí mismo?", "Porque nadie está libre de caer", ["Porque el que restaura es mejor", "Para sentirse superior", "No lo pide"], "«considerándote a ti mismo, no sea que tú también seas tentado».", "Gálatas 6:1"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué muestra mejor que la iglesia trata el caso con verdad y con amor?", "Confronta el pecado con claridad y, al mismo tiempo, busca restaurar con mansedumbre", ["Esconde el pecado para no herir", "Castiga sin buscar la restauración", "Deja que cada uno opine en las redes"], "«Tú eres aquel hombre».", "2 Samuel 12:7"],
      ["m2-07", 5, "o5", "recordar", "¿Cómo estaba el pastor de la iglesia que creció?", "Agotado", ["Descansado", "De vacaciones", "Enojado con los nuevos"], "«Desfallecerás del todo».", "Éxodo 18:18"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el pastor no puede atender a doscientas personas como atendía a sesenta?", "Porque el trabajo es demasiado para uno solo, como le dijo Jetro a Moisés", ["Porque no quiere", "Porque los nuevos no lo necesitan", "Sí puede, si trabaja más"], "«no podrás hacerlo tú solo».", "Éxodo 18:18"],
      ["m2-09", 5, "o5", "aplicar", "Muchos nuevos no conocen a nadie. ¿Qué propones?", "Grupos pequeños y un camino claro para los nuevos", ["Esperar a que se integren solos", "Pedirles que se vayan a otra iglesia", "Hacer el culto más largo"], "En un grupo pequeño cada persona es conocida y cuidada.", "Hechos 2:47"],
      ["m2-10", 5, "o5", "recordar", "¿Qué se multiplicaba en Jerusalén, según Hechos 6:7?", "El número de los discípulos", ["Los problemas", "Las quejas", "Los templos"], "«y el número de los discípulos se multiplicaba grandemente en Jerusalén».", "Hechos 6:7"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué los voluntarios eran siempre los mismos?", "Porque la iglesia creció en número, pero no en líderes ni en organización", ["Porque los nuevos no tienen dones", "Porque servir no es importante", "Porque así debe ser"], "Por eso se invita a servir personalmente, según los dones de cada uno.", "Éxodo 18:17-18"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué propuesta cuida mejor al pastor de la iglesia que crece?", "Proteger su descanso y repartir el cuidado pastoral en un equipo", ["Que atienda a todos personalmente", "Que deje de predicar", "Que trabaje también los días de descanso"], "«no podrás hacerlo tú solo».", "Éxodo 18:18"],
      ["m2-13", 6, "o6", "recordar", "¿Qué parte del plan dice quiénes te ayudarán y cómo los formarás?", "El equipo", ["El diagnóstico", "El calendario", "Los recursos"], "El plan forma también a los que ayudan.", "Habacuc 2:2"],
      ["m2-14", 6, "o6", "comprender", "¿Qué enseña Lucas 14:28 para el plan?", "Calcular lo que hace falta antes de empezar", ["Empezar sin pensar", "Pedir prestado sin límite", "No hacer nada"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m2-15", 6, "o6", "recordar", "¿Cada cuánto se recomienda revisar el plan de ministerio?", "Cada trimestre", ["Nunca", "Cada diez años", "Solo cuando hay problemas"], "Escríbelo con tu pastor o con tu mentor, y revísalo cada trimestre.", "Habacuc 2:2"],
      ["m2-16", 6, "o6", "recordar", "¿Para qué puede servir el plan de ministerio en el Nivel 5?", "De base para el proyecto final, que se presenta y se defiende en vivo", ["Para nada", "Para reemplazar los exámenes", "Para no tener que estudiar"], "Escríbelo con tu pastor o con tu mentor.", "Habacuc 2:2"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué el plan incluye el cuidado personal?", "Porque el que sirve necesita cuidar su vida con Dios, su familia y su descanso", ["Porque el ministerio no importa", "Para tener excusas", "No lo incluye"], "El pastor agotado del caso de la iglesia que crece muestra por qué importa.", "Éxodo 18:18"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué meta está mejor escrita para un plan de ministerio?", "Formar a dos nuevos líderes de grupo antes de diciembre", ["Crecer mucho", "Ser mejores", "Hacer cosas grandes algún día"], "Las metas son pocas, claras, se pueden medir y tienen fecha.", "Habacuc 2:2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-seminario-e1",
      tipo: "corta",
      pregunta: "Explica los pasos del método para estudiar un caso del ministerio y qué se hace en cada paso, además de pensar.",
      ideas: [
        { id: "hechos", peso: 20, texto: "Los hechos, sin suposiciones.", formas: ["hechos", "suposicion*", "que paso"] },
        { id: "fondo", peso: 15, texto: "El problema de fondo, no solo el síntoma.", formas: ["problema de fondo", "fondo", "sintoma"] },
        { id: "principios", peso: 15, texto: "Los principios bíblicos.", formas: ["principios", "biblic*", "escritura", "la palabra"] },
        { id: "decision", peso: 15, texto: "Las opciones y la decisión.", formas: ["opciones", "decision", "decidir", "caminos"] },
        { id: "evaluacion", peso: 10, texto: "La evaluación.", formas: ["evalua*", "que resulto", "que se aprendio"] },
        { id: "orar", peso: 15, texto: "En cada paso se ora y se busca consejo.", formas: ["ora", "orar", "oracion", "sabiduria", "consejo"] },
      ],
      citas: ["Proverbios 18:13", "Proverbios 18:17", "Santiago 1:5", "Proverbios 15:22"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero se buscan los hechos, sin suposiciones; luego el problema de fondo, porque lo que se ve suele ser un síntoma; después los principios bíblicos, dos o tres opciones con sus consecuencias, la decisión con su comunicación y la evaluación. En cada paso se ora pidiendo sabiduría (Santiago 1:5) y se busca consejo.",
    },
    {
      id: "n5-seminario-e2",
      tipo: "corta",
      pregunta: "Explica cómo debe responder la iglesia ante un líder que cae en un pecado grave.",
      ideas: [
        { id: "heridos", peso: 20, texto: "Confirmar los hechos y cuidar primero a las personas heridas.", formas: ["herid*", "victima*", "esposa", "familias"] },
        { id: "confrontar", peso: 20, texto: "Confrontar con la verdad, como Natán con David.", formas: ["confront*", "natan", "con la verdad"] },
        { id: "servicio", peso: 20, texto: "El líder deja su servicio y recibe disciplina y acompañamiento.", formas: ["deja su servicio", "deja el servicio", "disciplina", "acompañ*", "apart*"] },
        { id: "restaurar", peso: 20, texto: "La restauración con mansedumbre; el perdón no borra todas las consecuencias.", formas: ["restaur*", "mansedumbre", "consecuencias"] },
        { id: "informar", peso: 10, texto: "Una información veraz y prudente, y si hay un menor, reportar.", formas: ["inform*", "chisme", "report*", "prudente", "prudencia"] },
      ],
      citas: ["Gálatas 6:1", "2 Samuel 12:7", "2 Samuel 12:13", "2 Samuel 12:7-13", "2 Samuel 12:10-14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero se confirman los hechos y se cuida a los heridos: la esposa, la otra persona y sus familias. Como Natán con David, se confronta con la verdad. El líder deja su servicio y recibe disciplina y acompañamiento; la iglesia recibe información prudente. La restauración se busca con mansedumbre (Gálatas 6:1).",
    },
    {
      id: "n5-seminario-e3",
      tipo: "corta",
      pregunta: "Explica qué necesita una iglesia que crece más rápido que su organización.",
      ideas: [
        { id: "fondo", peso: 20, texto: "Creció en número, pero no en líderes ni en organización.", formas: ["no en lideres", "organiz*", "en numero"] },
        { id: "lideres", peso: 20, texto: "Formar líderes fieles.", formas: ["formar lideres", "formar a lideres", "lideres", "personas fieles"] },
        { id: "grupos", peso: 15, texto: "Abrir grupos pequeños.", formas: ["grupos pequeños", "grupos"] },
        { id: "nuevos", peso: 15, texto: "Un camino claro para los nuevos e invitar a servir.", formas: ["nuevos", "camino claro", "bienvenida", "invitar a servir"] },
        { id: "pastor", peso: 20, texto: "Proteger el descanso del pastor y repartir el cuidado, como aconsejó Jetro.", formas: ["descanso", "jetro", "repartir", "en un equipo"] },
      ],
      citas: ["Éxodo 18:17-18", "Éxodo 18:17", "Éxodo 18:18", "Hechos 6:7", "Hechos 2:47", "2 Timoteo 2:2", "Hechos 6:1-7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia creció en número, pero no en líderes ni en organización. Como aconsejó Jetro a Moisés, el pastor no puede con todo: hay que formar líderes fieles, abrir grupos pequeños, dar a los nuevos un camino claro, invitar a servir según los dones y proteger el descanso del pastor, como en Hechos 6:7.",
    },
    {
      id: "n5-seminario-e4",
      tipo: "breve",
      pregunta:
        "Elige una situación difícil de tu ministerio o de tu iglesia, sin nombres reales, y analízala con el método del seminario: los hechos, el problema de fondo, los principios bíblicos, las opciones, la decisión y la evaluación. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "hechos", peso: 20, texto: "Los hechos.", formas: ["hechos", "que paso", "con certeza"] },
        { id: "fondo", peso: 20, texto: "El problema de fondo.", formas: ["problema de fondo", "fondo", "sintoma"] },
        { id: "principios", peso: 20, texto: "Los principios bíblicos.", formas: ["principios", "biblic*", "escritura", "la palabra"] },
        { id: "opciones", peso: 20, texto: "Las opciones con sus consecuencias.", formas: ["opciones", "opcion", "caminos", "consecuencias"] },
        { id: "decision", peso: 20, texto: "La decisión y la evaluación.", formas: ["decision", "decidi*", "evalua*", "revisaremos"] },
      ],
      basta: 85,
      citas: ["Proverbios 18:13", "Proverbios 18:17", "Santiago 1:5", "Proverbios 15:22", "Hechos 15:6-7", "Hechos 15:28", "Romanos 14:19", "Deuteronomio 19:15", "2 Corintios 8:20-21", "Gálatas 6:1", "Éxodo 18:17-18", "Hechos 6:7", "Proverbios 16:3", "Lucas 14:28", "Habacuc 2:2", "Mateo 18:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Elegí una situación de mi grupo de jóvenes, sin nombres. Los hechos: dos líderes del grupo dejaron de hablarse hace un mes, el grupo bajó de veinte a doce jóvenes y hay comentarios en los mensajes. Lo que sé con certeza es que discutieron por la forma de dirigir la alabanza; lo demás son suposiciones. El problema de fondo es una ofensa que nadie habló de frente y un grupo que ya no sabe a quién seguir. Los principios bíblicos: antes de responder hay que oír (Proverbios 18:13) y escuchar a las dos partes (Proverbios 18:17); además, debemos seguir lo que contribuye a la paz y a la mutua edificación (Romanos 14:19). Las opciones son tres: hablar con cada uno por separado y después juntos; repartir las tareas para que cada uno sirva en lo que mejor hace; o pedir a uno que descanse un tiempo. Cada una tiene sus consecuencias. La decisión: el pastor y yo hablaremos con cada uno esta semana, después los reuniremos para buscar la reconciliación y luego explicaremos al grupo cómo seguiremos. La evaluación: en dos meses revisaremos si volvió la unidad y qué aprendimos. En cada paso oraremos pidiendo sabiduría, como enseña Santiago 1:5.",
    },
    {
      id: "n5-seminario-e5",
      tipo: "breve",
      pregunta:
        "Un líder propone resolver así el caso del dinero faltante: anunciar en el culto que el tesorero robó, quitarle el servicio y no hablar más del tema. Evalúa esta propuesta con el método del seminario: qué tiene de errado, qué enseña la Biblia y qué propondrías en su lugar. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "pruebas", peso: 25, texto: "No se acusa sin pruebas: todavía no se sabe si fue un error, una pérdida o un robo.", formas: ["sin pruebas", "no se acusa", "no acusar", "testigos", "un error", "una perdida", "rumor*", "sospecha*"] },
        { id: "escuchar", peso: 20, texto: "Escuchar al tesorero en privado.", formas: ["escuch*", "en privado", "antes de oir"] },
        { id: "revisar", peso: 15, texto: "Revisar con calma los registros y el banco.", formas: ["revis*", "registros"] },
        { id: "controles", peso: 25, texto: "El problema de fondo es la falta de controles.", formas: ["problema de fondo", "controles", "dos personas", "firman"] },
        { id: "restitucion", peso: 15, texto: "Si hubo un robo, arrepentimiento, restitución y consejo legal.", formas: ["restitu*", "arrepent*", "consejo legal", "abogado"] },
      ],
      basta: 85,
      citas: ["Deuteronomio 19:15", "Proverbios 18:13", "Proverbios 18:17", "2 Corintios 8:20-21", "2 Corintios 8:20", "2 Corintios 8:21", "Mateo 18:15", "Gálatas 6:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La propuesta quiere cortar el problema, pero es injusta y no lo resuelve. Primero, los hechos: hay una diferencia de 800 dólares, pero todavía no se sabe si fue un error, una pérdida o un robo. Anunciar en el culto que el tesorero robó sería acusarlo sin pruebas, y la Ley pedía el testimonio de dos o tres testigos para mantener una acusación (Deuteronomio 19:15). Además, al que responde antes de oír le es fatuidad y oprobio (Proverbios 18:13): hay que escuchar al tesorero en privado. Segundo, el problema de fondo es que la iglesia nunca tuvo controles; quitar al tesorero sin cambiar nada dejaría el mismo riesgo para el siguiente. Yo propondría que dos personas de confianza revisen con calma los registros y el banco, y que se hable en privado con el tesorero. Si fue un error, se corrige y se aprende; si hubo un robo, se busca el arrepentimiento y la restitución, la persona deja ese servicio y se pide consejo legal. Desde ya, las ofrendas las contarían dos personas que firman, se depositarían pronto y se informaría a la iglesia, para hacer las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:21). Y pediría a todos que no repitan rumores.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-seminario-b1",
    tipo: "breve",
    pregunta:
      "Escribe un resumen de tu plan de ministerio: tu llamado y tu visión, un diagnóstico breve, dos o tres metas con fecha, tu equipo y los recursos, el calendario, cómo evaluarás el avance y a quién rendirás cuentas, y cómo cuidarás tu vida con Dios, tu familia y tu descanso. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "vision", peso: 15, texto: "El llamado y la visión.", formas: ["vision", "llamado", "me llamo"] },
      { id: "diagnostico", peso: 15, texto: "Un diagnóstico.", formas: ["diagnostico", "fortalezas", "debilidades", "oportunidades", "riesgos"] },
      { id: "metas", peso: 20, texto: "Metas claras con fecha.", formas: ["metas", "meta", "antes de", "para el mes"] },
      { id: "equipo", peso: 15, texto: "El equipo y los recursos.", formas: ["equipo", "formare", "recursos", "presupuesto"] },
      { id: "evaluacion", peso: 20, texto: "La evaluación y la rendición de cuentas.", formas: ["evalua*", "revisare", "rendire cuentas", "rendir cuentas", "rendicion de cuentas", "cada trimestre"] },
      { id: "cuidado", peso: 15, texto: "El cuidado personal.", formas: ["descanso", "mi familia", "vida con dios", "cuidado personal", "cuidare"] },
    ],
    basta: 85,
    citas: ["Proverbios 16:3", "Lucas 14:28", "Habacuc 2:2", "Proverbios 15:22", "2 Timoteo 2:2", "Éxodo 18:17-18", "Santiago 1:5"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Mi llamado es enseñar la Palabra a los jóvenes, y mi visión es un grupo de jóvenes que conozcan la Biblia y sirvan. El diagnóstico: tenemos fortalezas, como un grupo unido y dos líderes fieles; debilidades, como la falta de maestros; oportunidades, como la escuela que está cerca de la iglesia; y riesgos, como mi poco tiempo. Mis metas son tres: formar a dos nuevos líderes antes de junio, abrir un estudio bíblico semanal en marzo e invitar a diez jóvenes nuevos antes de diciembre. Mi equipo serán los dos líderes actuales, y los formaré con una reunión al mes. Los recursos: Biblias, materiales de la academia y un presupuesto sencillo de cien dólares por trimestre. El calendario: en el primer trimestre, el estudio bíblico; en el segundo, la formación de los líderes; en el tercero y el cuarto, las invitaciones. Calcularé antes de empezar, como enseña Lucas 14:28, y escribiré el plan para compartirlo con el equipo (Habacuc 2:2). Revisaré el avance cada trimestre con mi pastor, a quien rendiré cuentas. Cuidaré mi vida con Dios con un tiempo diario de oración, a mi familia con una noche libre cada semana y mi descanso con un día sin actividades. Todo lo encomiendo a Jehová (Proverbios 16:3).",
  },
};
