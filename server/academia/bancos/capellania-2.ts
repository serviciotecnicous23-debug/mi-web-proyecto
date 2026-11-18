/**
 * El banco de «Capellanía hospitalaria» (especialidad Capellanía, materia 2, avanzada). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el enfermo y el hospital · o2 orar por los enfermos y la sanidad divina · o3 las normas del hospital ·
 * o4 el que muere y su familia · o5 las pérdidas de los niños y de las madres · o6 las decisiones difíciles y el cuidado
 * del personal · o7 el versículo de memoria (Salmos 41:3). Sigue el estándar de docs/academia-auditoria.md: no más del
 * 30 % de memoria, al menos un 20 % de casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `capellania-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_CAPELLANIA_2: BancoMateria = {
  materia: "capellania-2",
  repaso: {
    "capellania-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué hizo Jesús con el leproso, según Marcos 1:41?", "Tuvo misericordia de él, extendió la mano y lo tocó", ["Lo mandó lejos", "Le habló desde lejos", "Lo ignoró"], "«Y Jesús, teniendo misericordia de él, extendió la mano y le tocó».", "Marcos 1:40-41"],
      ["1-r2", 1, "o1", "comprender", "¿Qué pierde muchas veces una persona cuando la internan en el hospital?", "El control de sus horarios, de su comida y de su tratamiento, y parte de su intimidad", ["Nada: el hospital es como su casa", "Solo su ropa", "Su fe, siempre"], "Pero Dios la cuida en su cama: «Jehová lo sustentará sobre el lecho del dolor».", "Salmos 41:3"],
      ["1-r3", 1, "o1", "aplicar", "Un paciente recién internado le pregunta al capellán si su operación va a salir bien. ¿Qué hace el capellán?", "Lo escucha, lo anima a hablar con su médico y ora con él, sin dar noticias médicas", ["Le dice que todo saldrá bien", "Le explica la operación", "Le dice que no se preocupe y se va"], "Dios puede renovarlo por dentro: «el interior no obstante se renueva de día en día».", "2 Corintios 4:16"],
    ] as P[]).map(p),
    "capellania-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué le respondió Dios a Pablo cuando pidió que le quitara su aguijón, según 2 Corintios 12:9?", "Bástate mi gracia; porque mi poder se perfecciona en la debilidad", ["Ya te lo quité", "No me pidas más", "Es tu culpa"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseña la declaración de fe del ministerio sobre la sanidad divina?", "Que Dios sana hoy en respuesta a la oración de fe, y que buscar su sanidad no se opone a la atención médica", ["Que Dios ya no sana", "Que hay que dejar a los médicos", "Que solo sanan los que tienen mucha fe"], "«Y la oración de fe salvará al enfermo, y el Señor lo levantará».", "Santiago 5:14-15"],
      ["2-r3", 2, "o2", "aplicar", "Una familia le pide al capellán que le prometa que su papá se va a sanar. ¿Qué hace?", "Ora con fe por su sanidad, lo pone en las manos de Dios y no promete lo que solo Dios decide", ["Le promete que se sanará", "Le dice que no hay esperanza", "Le dice que deben tener más fe"], "Dios sana, y también da su gracia: «Bástate mi gracia».", "2 Corintios 12:8-9"],
    ] as P[]).map(p),
    "capellania-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cómo pide Pablo que se haga todo, según 1 Corintios 14:40?", "Decentemente y con orden", ["Con prisa", "Sin reglas", "A escondidas"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["3-r2", 3, "o3", "comprender", "¿Qué puede decirle el hospital al clero sobre un paciente, según la ley de privacidad HIPAA?", "Su nombre, el lugar donde está, su estado general y su afiliación religiosa, si el paciente fue informado y no se opuso", ["Todo su expediente médico", "Nada, nunca", "Su diagnóstico y sus medicinas"], "Y el capellán guarda lo que sabe: «Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["3-r3", 3, "o3", "aplicar", "Un hermano quiere publicar en las redes la foto de un paciente para pedir oración. ¿Qué le dices?", "Que no lo haga, porque viola la privacidad del paciente; puede orar sin publicar nada", ["Que la publique con su nombre", "Que la publique sin el nombre", "Que la mande a todos los grupos"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ] as P[]).map(p),
    "capellania-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le prometió Jesús al ladrón en la cruz, según Lucas 23:43?", "Hoy estarás conmigo en el paraíso", ["Mañana te perdonaré", "No hay perdón para ti", "Espera al juicio"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
      ["4-r2", 4, "o4", "comprender", "¿Qué son los cuidados paliativos, según la Organización Mundial de la Salud?", "La atención que mejora la calidad de vida del paciente y de su familia frente a una enfermedad potencialmente mortal", ["Un tratamiento que siempre cura", "Una forma de acelerar la muerte", "Un trámite del seguro"], "Aun en ese valle, Dios acompaña: «porque tú estarás conmigo».", "Salmos 23:4"],
      ["4-r3", 4, "o4", "aplicar", "Una familia te llama porque su abuela está muriendo. ¿Qué haces al llegar?", "Te presentas con calma, preguntas cómo están y qué desean, y acompañas con la Palabra y la oración", ["Das un sermón sobre la muerte", "Te quedas en la puerta", "Hablas de los papeles del seguro"], "«No se turbe vuestro corazón».", "Juan 14:1-3"],
    ] as P[]).map(p),
    "capellania-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dice Dios en Isaías 49:15?", "Aunque olvide ella, yo nunca me olvidaré de ti", ["Ya me olvidé de ti", "Olvida tu dolor", "Nadie te recuerda"], "«Aunque olvide ella, yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué el capellán llama al bebé que murió por su nombre?", "Porque reconoce que era una persona amada y que la pérdida es verdadera", ["Para hacer llorar a los padres", "Porque lo pide la ley", "No debe llamarlo por su nombre"], "Dios conoce cada vida: «Mi embrión vieron tus ojos».", "Salmos 139:16"],
      ["5-r3", 5, "o5", "aplicar", "Unos padres perdieron un embarazo y una tía les dice que pronto tendrán otro bebé. ¿Qué haces?", "Reconoces su pérdida, los escuchas y los acompañas, sin repetir esa frase", ["Le das la razón a la tía", "Les dices que no era un bebé todavía", "Cambias de tema"], "Dios no se olvida de ellos: «He aquí que en las palmas de las manos te tengo esculpida».", "Isaías 49:15-16"],
    ] as P[]).map(p),
    "capellania-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué dice Eclesiastés 3:2?", "Tiempo de nacer, y tiempo de morir", ["Que nadie debe morir", "Que todo es para siempre", "Que no hay tiempos"], "«Tiempo de nacer, y tiempo de morir».", "Eclesiastés 3:1-2"],
      ["6-r2", 6, "o6", "comprender", "¿Cuál es el lugar del capellán en una decisión difícil sobre un tratamiento?", "Acompañar a la familia a pensar a la luz de su fe, sin decidir por ella ni dar opiniones médicas", ["Decidir por la familia", "Contradecir al médico", "No estar presente"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["6-r3", 6, "o6", "aplicar", "Una enfermera llora en el pasillo después de que murió un paciente joven. ¿Qué haces?", "Te acercas con respeto, le preguntas cómo está y la escuchas", ["Sigues de largo", "Le dices que no debe llorar en el trabajo", "Le cuentas el caso a otros"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El enfermo y el hospital
    ["f01", 1, "o1", "recordar", "¿Qué le dijo el leproso a Jesús, según Marcos 1:40?", "Si quieres, puedes limpiarme", ["Déjame en paz", "No tengo fe", "Llévame al templo"], "«Si quieres, puedes limpiarme».", "Marcos 1:40-41"],
    ["f02", 1, "o1", "recordar", "¿Qué hace el hombre interior aunque el exterior se desgaste, según 2 Corintios 4:16?", "Se renueva de día en día", ["Se desgasta también", "Se pierde", "Se queda igual"], "«el interior no obstante se renueva de día en día».", "2 Corintios 4:16"],
    ["f03", 1, "o1", "comprender", "¿Qué necesita el enfermo además de un diagnóstico, según el ejemplo de Jesús con el leproso?", "Compasión y cercanía", ["Más pruebas médicas", "Que lo dejen solo", "Un regaño"], "«teniendo misericordia de él, extendió la mano y le tocó».", "Marcos 1:40-41"],
    ["f04", 1, "o1", "comprender", "¿Qué hacen los trabajadores sociales en el hospital?", "Ayudan con los trámites, el alta y los recursos para la familia", ["Deciden el tratamiento", "Dan las medicinas", "Celebran los cultos"], "Cada uno sirve en su parte: «no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f05", 1, "o1", "comprender", "¿Por qué el capellán le cuenta a la enfermera lo que le preocupa al paciente?", "Porque trabaja en equipo, y el personal necesita saberlo para cuidarlo mejor", ["Para quedar bien", "Para que lo regañen", "No debe contarle nada"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f06", 1, "o1", "analizar", "¿Qué diferencia la visita del capellán de la de un amigo?", "Se coordina con el hospital, escucha lo que el paciente necesita hablar y guarda la confianza", ["Que dura más", "Que el capellán habla de todo", "No hay diferencia"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f07", 1, "o1", "aplicar", "Un paciente te pregunta por qué Dios permitió su enfermedad. ¿Qué haces?", "Lo escuchas sin dar respuestas rápidas, y lo acompañas en su pregunta con oración si él quiere", ["Le dices que es por algún pecado", "Le explicas que Dios lo castiga", "Cambias de tema"], "Dios lo cuida en su enfermedad: «Mullirás toda su cama en su enfermedad».", "Salmos 41:3"],
    ["f08", 1, "o1", "aplicar", "Una paciente anciana no recibe visitas y se siente muy sola. ¿Qué haces?", "La visitas con regularidad y, con su permiso, buscas que su iglesia o su familia la acompañen", ["La visitas una vez y no vuelves", "Le dices que es normal estar sola", "No haces nada"], "«Jehová lo sustentará sobre el lecho del dolor».", "Salmos 41:3"],
    ["f09", 1, "o1", "aplicar", "Un paciente te pide que le expliques su diagnóstico. ¿Qué haces?", "Lo animas a hablar con su médico, y te ofreces a acompañarlo en esa conversación", ["Le explicas tú el diagnóstico", "Le dices que no es grave", "Buscas su expediente"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f10", 1, "o7", "recordar", "Completa Salmos 41:3: Jehová lo sustentará sobre el lecho del dolor…", "Mullirás toda su cama en su enfermedad", ["y lo dejará solo", "pero no lo sanará", "hasta que se arrepienta"], "«Jehová lo sustentará sobre el lecho del dolor; Mullirás toda su cama en su enfermedad».", "Salmos 41:3"],
    // Lección 2 · Orar por los enfermos
    ["f11", 2, "o2", "recordar", "¿Qué hará la oración de fe, según Santiago 5:15?", "Salvará al enfermo, y el Señor lo levantará", ["Nada", "Solo consolará", "Hará rico al enfermo"], "«Y la oración de fe salvará al enfermo, y el Señor lo levantará».", "Santiago 5:14-15"],
    ["f12", 2, "o2", "recordar", "¿Qué le dijo Dios a Ezequías enfermo, según 2 Reyes 20:5?", "He oído tu oración, he visto tus lágrimas; he aquí que yo te sano", ["Morirás pronto", "No te oigo", "Busca a otro dios"], "«Yo he oído tu oración, y he visto tus lágrimas; he aquí que yo te sano».", "2 Reyes 20:5"],
    ["f13", 2, "o2", "recordar", "¿Cuántas veces rogó Pablo que le quitaran su aguijón, según 2 Corintios 12:8?", "Tres veces", ["Una vez", "Siete veces", "Nunca"], "«respecto a lo cual tres veces he rogado al Señor, que lo quite de mí».", "2 Corintios 12:8-9"],
    ["f14", 2, "o2", "comprender", "¿Qué muestra el consejo de Pablo a Timoteo sobre su estómago?", "Que la fe y los remedios no se oponen", ["Que no hay que cuidarse", "Que la fe basta sin remedios", "Que Timoteo no tenía fe"], "«usa de un poco de vino por causa de tu estómago y de tus frecuentes enfermedades».", "1 Timoteo 5:23"],
    ["f15", 2, "o2", "comprender", "¿Qué punto de la declaración de fe está por confirmar sobre la sanidad?", "Si la sanidad está provista en la expiación de Cristo", ["Si Dios sana hoy", "Si se debe orar por los enfermos", "Si hay que ir al médico"], "Mientras tanto, se ora con fe: «Y la oración de fe salvará al enfermo».", "Santiago 5:14-15"],
    ["f16", 2, "o2", "analizar", "¿Por qué está mal decir que un enfermo no sanó porque le faltó fe?", "Porque culpa al que sufre y olvida que a veces Dios da su gracia en lugar de quitar la enfermedad", ["Porque la fe no importa", "No está mal", "Porque Dios no sana"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
    ["f17", 2, "o2", "aplicar", "Un paciente débil te pide una oración. ¿Cómo oras?", "Con palabras sencillas y breves, sobre lo que él te pidió", ["Con una oración de media hora", "En voz muy alta para que todos oigan", "Le pides que ore él"], "«¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:14-15"],
    ["f18", 2, "o2", "aplicar", "Un paciente de otra fe acepta que ores, pero te pide que lo hagas en silencio. ¿Qué haces?", "Respetas su pedido y oras en silencio a su lado", ["Oras en voz alta igual", "Te niegas a orar", "Le explicas por qué su fe está mal"], "«Sea vuestra palabra siempre con gracia».", "Colosenses 4:5-6"],
    ["f19", 2, "o2", "aplicar", "Unos hijos te piden que les digas que su mamá muy grave se va a sanar. ¿Qué haces?", "Oras con ellos por su sanidad, la pones en las manos de Dios y los acompañas, sin prometerles lo que solo Dios decide", ["Les prometes que se sanará", "Les dices que ya no hay nada que hacer", "Les dices que oren más fuerte"], "Dios oye: «Yo he oído tu oración, y he visto tus lágrimas».", "2 Reyes 20:5"],
    ["f20", 2, "o2", "evaluar", "¿Qué oración por un enfermo es la mejor?", "La que pide la sanidad con fe, se pone en las manos de Dios, es breve, respeta al paciente y no promete ni culpa", ["La que promete la sanidad", "La que dura una hora", "La que culpa al enfermo de su falta de fe"], "«Y la oración de fe salvará al enfermo, y el Señor lo levantará».", "Santiago 5:14-15"],
    // Lección 3 · Las normas del hospital
    ["f21", 3, "o3", "recordar", "¿Qué hace el de espíritu fiel, según Proverbios 11:13?", "Lo guarda todo", ["Lo cuenta todo", "Lo olvida", "Lo publica"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f22", 3, "o3", "recordar", "¿Por qué debemos mirar, según Filipenses 2:4?", "Por lo de los otros, y no solo por lo nuestro", ["Solo por lo nuestro", "Por nadie", "Solo por los de la iglesia"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f23", 3, "o3", "recordar", "Según la ley de privacidad HIPAA, ¿qué dato del paciente puede recibir el clero y no otras personas que preguntan por él?", "Su afiliación religiosa", ["Su diagnóstico", "Sus medicinas", "Su dirección"], "Y lo que sabe, lo guarda: «Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f24", 3, "o3", "comprender", "¿Por qué el capellán se lava las manos antes y después de cada visita?", "Para no llevar infecciones de un paciente a otro y para cuidarse", ["Por costumbre", "Porque es un rito religioso", "No hace falta"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f25", 3, "o3", "comprender", "¿Por qué la visita en cuidados intensivos es corta y se coordina con la enfermera?", "Porque el paciente está muy grave y el equipo necesita trabajar", ["Porque no importa", "Porque está prohibido orar", "Porque el capellán no es bienvenido"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f26", 3, "o3", "analizar", "¿Por qué el capellán no busca más información del paciente de la que necesita?", "Porque respeta su privacidad, y la información de salud está protegida", ["Porque no le interesa", "Para trabajar menos", "Sí debe buscar todo"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f27", 3, "o3", "aplicar", "Un cuarto pide bata y mascarilla para entrar. ¿Qué haces?", "Te pones lo que pide el aislamiento antes de entrar, y te lo quitas como indica el personal", ["Entras sin ponerte nada", "No visitas a nadie más", "Le hablas desde la puerta abierta"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f28", 3, "o3", "aplicar", "Tienes fiebre el día de tu turno en el hospital. ¿Qué haces?", "No vas, y avisas a la oficina de capellanía", ["Vas con mascarilla", "Vas y no le dices a nadie", "Visitas solo a algunos"], "Cuidar a los demás es amor: «sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f29", 3, "o3", "aplicar", "Un paciente de cuidados intensivos no puede hablar, pero su familia quiere que ores por él. ¿Qué haces?", "Le hablas con calma, lees un salmo corto y oras con la familia, sin tocar los equipos", ["Te vas porque no puede responder", "Oras una hora", "Mueves al paciente para verlo mejor"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f30", 3, "o3", "evaluar", "¿Qué conducta del capellán en el hospital es la mejor?", "Cuidar la privacidad, lavarse las manos, seguir el aislamiento, coordinar con la enfermera y no publicar nada", ["Publicar historias para pedir oración", "Visitar enfermo", "Tocar los equipos para ayudar"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    // Lección 4 · Acompañar al que muere y a su familia
    ["f31", 4, "o4", "recordar", "¿Qué no temerá el que anda en valle de sombra de muerte, según Salmos 23:4?", "Mal alguno", ["A nadie", "Al hambre", "A sus enemigos"], "«Aunque ande en valle de sombra de muerte, No temeré mal alguno, porque tú estarás conmigo».", "Salmos 23:4"],
    ["f32", 4, "o4", "recordar", "¿A qué fue Jesús, según Juan 14:2?", "A preparar lugar para los suyos", ["A juzgar al mundo", "A descansar", "A esconderse"], "«voy, pues, a preparar lugar para vosotros».", "Juan 14:1-3"],
    ["f33", 4, "o4", "recordar", "¿Qué dijo Pablo de su vida al final, según 2 Timoteo 4:7?", "He peleado la buena batalla, he acabado la carrera, he guardado la fe", ["Me arrepiento de todo", "Todo fue en vano", "No sé si serví a Dios"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:6-8"],
    ["f34", 4, "o4", "comprender", "¿Cuándo se ofrece el hospicio de Medicare?", "Cuando el médico certifica que, si la enfermedad sigue su curso normal, a la persona le quedan seis meses de vida o menos", ["A cualquier persona que lo pida", "Solo el último día de vida", "Cuando la persona ya se curó"], "Aun allí, Dios está con la persona: «porque tú estarás conmigo».", "Salmos 23:4"],
    ["f35", 4, "o4", "comprender", "¿Qué reconoce la Ley de Voluntades Anticipadas de Texas?", "La directiva a los médicos, el poder médico y la orden de no reanimar fuera del hospital", ["Solo el testamento de los bienes", "Nada sobre la salud", "La compra de un seguro"], "El capellán anima a hablarlo con calma: «No se turbe vuestro corazón».", "Juan 14:1-3"],
    ["f36", 4, "o4", "analizar", "¿Qué enseña la respuesta de Jesús al ladrón en la cruz sobre el final de la vida?", "Que nunca es tarde para volverse a Cristo", ["Que ya era tarde", "Que hay que hacer obras antes de morir", "Que solo se salvan los que van al templo"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
    ["f37", 4, "o4", "aplicar", "Una familia te pregunta si debe firmar un poder médico. ¿Qué haces?", "La animas a hablarlo con el médico o con el trabajador social, sin darle consejo legal", ["Le dices qué firmar", "Llenas tú el papel", "Le dices que no hace falta"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f38", 4, "o4", "aplicar", "Un paciente que muere te pide volverse a Cristo. ¿Qué haces?", "Lo acompañas con sencillez a entregarse a Cristo, como Jesús con el ladrón en la cruz", ["Le dices que ya es tarde", "Le das un estudio bíblico largo", "Llamas a otro para que lo haga"], "«Acuérdate de mí cuando vengas en tu reino».", "Lucas 23:42-43"],
    ["f39", 4, "o4", "aplicar", "La familia de un paciente musulmán que está muriendo pide a su imán. ¿Qué haces?", "Respetas sus ritos y avisas a su imán o al departamento de capellanía", ["Le predicas al paciente", "Le dices que no se puede", "No haces nada"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ["f40", 4, "o4", "evaluar", "¿Qué acompañamiento en las últimas horas es el mejor?", "Llegar con calma, hablarle al que muere, leer un salmo, orar, ayudar a la familia a despedirse y quedarse con ellos", ["Hablar de los papeles del seguro", "Dar un sermón sobre el infierno", "Irse enseguida para no molestar"], "«No se turbe vuestro corazón; creéis en Dios, creed también en mí».", "Juan 14:1-3"],
    // Lección 5 · Las pérdidas de los niños y de las madres
    ["f41", 5, "o5", "recordar", "¿De quiénes es el reino de los cielos, según Mateo 19:14?", "De los que son como los niños", ["De los ricos", "De los sabios", "De los fuertes"], "«Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos».", "Mateo 19:14"],
    ["f42", 5, "o5", "recordar", "¿Dónde nos formó Dios, según Salmos 139:13?", "En el vientre de nuestra madre", ["En el templo", "En la escuela", "En ningún lugar"], "«Porque tú formaste mis entrañas; Tú me hiciste en el vientre de mi madre».", "Salmos 139:13"],
    ["f43", 5, "o5", "recordar", "¿Dónde nos tiene esculpidos Dios, según Isaías 49:16?", "En las palmas de sus manos", ["En una piedra", "En el muro de la ciudad", "En un libro olvidado"], "«He aquí que en las palmas de las manos te tengo esculpida».", "Isaías 49:15-16"],
    ["f44", 5, "o5", "comprender", "¿Por qué la pérdida de un embarazo es una pérdida verdadera, sin importar el tiempo?", "Porque Dios conoce cada vida desde el vientre, y los padres ya amaban a su hijo", ["Porque lo dice la ley", "No es una pérdida verdadera", "Solo si fue después de los nueve meses"], "«Mi embrión vieron tus ojos».", "Salmos 139:16"],
    ["f45", 5, "o5", "comprender", "¿Qué ofrecen muchos hospitales a los padres que pierden un bebé?", "Cargarlo, tomarle fotos o guardar sus huellas", ["Nada", "Una multa", "Un nuevo embarazo"], "Dios tampoco olvida: «Aunque olvide ella, yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
    ["f46", 5, "o5", "analizar", "¿Por qué está mal decir que Dios necesitaba otro angelito?", "Porque no es lo que enseña la Biblia y presenta a Dios como el que les quitó a su hijo", ["Porque es muy largo", "No está mal", "Porque los padres no creen"], "Dios consuela y no se olvida: «yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
    ["f47", 5, "o5", "aplicar", "Unos padres católicos cuyo bebé está muriendo piden que lo bauticen. ¿Qué haces?", "Avisas enseguida a su sacerdote o al departamento de capellanía, respetando su fe", ["Les dices que no hace falta", "Discutes con ellos sobre el bautismo", "No haces nada"], "«Dejad a los niños venir a mí, y no se lo impidáis».", "Mateo 19:14"],
    ["f48", 5, "o5", "aplicar", "Una madre que perdió a su bebé no quiere hablar y su esposo llora mucho. ¿Qué haces?", "Acompañas a los dos, respetando que viven el dolor de maneras distintas", ["Atiendes solo al que llora", "Le pides a ella que hable", "Les dices que se calmen"], "«Aunque olvide ella, yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
    ["f49", 5, "o5", "aplicar", "Unos padres perdieron a su hija Sara a las treinta semanas. ¿Qué les dices primero?", "Siento mucho la muerte de Sara", ["Ya tendrán otro", "Por lo menos era chiquita", "Fue la voluntad de Dios"], "«Mi embrión vieron tus ojos».", "Salmos 139:16"],
    ["f50", 5, "o5", "evaluar", "¿Qué acompañamiento a unos padres que pierden un bebé es el mejor?", "Llamar al bebé por su nombre, reconocer la pérdida, ofrecer guardar recuerdos, orar con respeto y acompañarlos después del alta", ["Decirles que pronto tendrán otro", "No mencionar al bebé", "Hablar solo del tratamiento de la madre"], "«He aquí que en las palmas de las manos te tengo esculpida».", "Isaías 49:15-16"],
    // Lección 6 · Las decisiones difíciles y el cuidado del personal
    ["f51", 6, "o6", "recordar", "¿Qué tiene cada cosa, según Eclesiastés 3:1?", "Su tiempo", ["Su precio", "Su dueño", "Su castigo"], "«Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora».", "Eclesiastés 3:1-2"],
    ["f52", 6, "o6", "recordar", "¿Qué es el morir para Pablo, según Filipenses 1:21?", "Ganancia", ["Pérdida", "Castigo", "Olvido"], "«Porque para mí el vivir es Cristo, y el morir es ganancia».", "Filipenses 1:21-23"],
    ["f53", 6, "o6", "recordar", "¿Dónde hay seguridad, según Proverbios 11:14?", "En la multitud de consejeros", ["En la soledad", "En la prisa", "En el silencio"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f54", 6, "o6", "comprender", "¿Qué hace un comité de ética en un hospital?", "Ayuda a pensar cuando hay un desacuerdo grave sobre un tratamiento", ["Decide quién es culpable", "Cobra las cuentas", "Celebra los cultos"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f55", 6, "o6", "comprender", "¿Qué le recuerda el capellán a una familia cuando un tratamiento ya no ayuda?", "Que el cuidado, el alivio del dolor y el amor siguen", ["Que ya no hay nada que hacer", "Que deben irse a casa", "Que es culpa de los médicos"], "«Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
    ["f56", 6, "o6", "analizar", "¿Por qué el capellán no decide por la familia en una decisión difícil?", "Porque la decisión es de ellos y del equipo médico; él acompaña a pensar a la luz de su fe", ["Porque no le importa", "Porque no sabe nada", "Sí debe decidir"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f57", 6, "o6", "aplicar", "Una familia no entiende lo que dijo el médico sobre el respirador. ¿Qué haces?", "La ayudas a hacerle sus preguntas al médico, sin explicarles tú lo médico", ["Les explicas tú lo que significa", "Les dices que no pregunten", "Contradices al médico"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f58", 6, "o6", "aplicar", "Un médico se ve muy afectado después de perder a un paciente. ¿Qué haces?", "Le ofreces un momento para conversar o para orar, y lo escuchas sin juzgar", ["Lo ignoras", "Le dices que es su culpa", "Le cuentas el caso a otros"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
    ["f59", 6, "o6", "aplicar", "La familia y el equipo médico no se ponen de acuerdo sobre un tratamiento. ¿Qué puedes sugerir?", "Que consulten al comité de ética del hospital", ["Que la familia se lleve al paciente", "Que el capellán decida", "Que no hablen más del tema"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f60", 6, "o6", "evaluar", "¿Qué acompañamiento del capellán en una reunión con el equipo médico es el mejor?", "Preparar a la familia, escuchar a los médicos, ayudar a la familia a preguntar y a decir lo que su ser querido quería, orar y quedarse después", ["Dar su opinión médica", "Presionar a la familia", "Irse cuando termina la reunión"], "«Todo tiene su tiempo».", "Eclesiastés 3:1-2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hará Jehová con la cama del enfermo, según Salmos 41:3?", "La mullirá", ["La quitará", "La olvidará", "La venderá"], "«Mullirás toda su cama en su enfermedad».", "Salmos 41:3"],
      ["m1-02", 1, "o1", "comprender", "¿Qué preguntas sobre Dios suele tener un enfermo?", "¿Por qué a mí? y ¿dónde está Dios?", ["Ninguna", "Solo preguntas médicas", "Solo preguntas sobre el dinero"], "Dios está con él: «Jehová lo sustentará sobre el lecho del dolor».", "Salmos 41:3"],
      ["m1-03", 1, "o1", "aplicar", "Un paciente asustado antes de una operación te pide que te quedes un momento. ¿Qué haces?", "Te quedas, lo escuchas y oras con él si lo desea", ["Le dices que no tienes tiempo", "Le explicas la operación", "Le das un folleto"], "«el interior no obstante se renueva de día en día».", "2 Corintios 4:16"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el capellán no da noticias médicas?", "Porque no le corresponde, y el paciente debe recibirlas de su médico", ["Porque no le interesa", "Porque está prohibido hablar", "Sí debe darlas"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m1-05", 1, "o1", "recordar", "¿Qué le dijo Jesús al leproso, según Marcos 1:41?", "Quiero, sé limpio", ["Vete de aquí", "No puedo", "Mañana"], "«Quiero, sé limpio».", "Marcos 1:40-41"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué primera visita a un paciente recién internado es la mejor?", "Preguntar a la enfermera, presentarse, escuchar, preguntar por su familia, orar brevemente y avisar lo que le preocupa", ["Entrar sin presentarse y orar en voz alta", "Hablar del diagnóstico", "No volver nunca"], "«teniendo misericordia de él, extendió la mano y le tocó».", "Marcos 1:40-41"],
      ["m1-07", 2, "o2", "recordar", "¿Qué deben hacer los ancianos por el enfermo, según Santiago 5:14?", "Orar por él, ungiéndole con aceite en el nombre del Señor", ["Llevarlo al templo", "Dejarlo solo", "Cobrarle"], "«y oren por él, ungiéndole con aceite en el nombre del Señor».", "Santiago 5:14-15"],
      ["m1-08", 2, "o2", "comprender", "¿Qué enseña la historia de Pablo y su aguijón sobre la oración por los enfermos?", "Que a veces Dios no quita la enfermedad, pero da su gracia para sostenernos", ["Que Dios nunca responde", "Que Pablo no tenía fe", "Que no hay que orar"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
      ["m1-09", 2, "o2", "aplicar", "Un hermano le dice a un enfermo que deje sus medicinas y confíe solo en Dios. ¿Qué haces?", "Le explicas con amor que la fe y la medicina no se oponen, y animas al enfermo a seguir su tratamiento", ["Le das la razón", "No dices nada", "Le pides al enfermo que decida solo"], "«usa de un poco de vino por causa de tu estómago y de tus frecuentes enfermedades».", "1 Timoteo 5:23"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué el capellán no abre junto a la cama la discusión sobre la sanidad en la expiación?", "Porque es un punto por confirmar, y el enfermo necesita oración y compañía, no un debate", ["Porque no cree en la sanidad", "Porque está prohibido", "Sí debe discutirlo"], "«Y la oración de fe salvará al enfermo».", "Santiago 5:14-15"],
      ["m1-11", 2, "o2", "recordar", "¿Qué vio Dios de Ezequías, según 2 Reyes 20:5?", "Sus lágrimas", ["Su dinero", "Su ejército", "Su casa"], "«y he visto tus lágrimas».", "2 Reyes 20:5"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué respuesta a una familia que pide un milagro es la mejor?", "Escuchar, orar con fe por la sanidad, ponerla en las manos de Dios, no prometer, animar a hablar con el médico y volver", ["Prometer el milagro", "Decir que no hay esperanza", "Culpar a la familia de poca fe"], "«Yo he oído tu oración, y he visto tus lágrimas».", "2 Reyes 20:5"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pide Filipenses 2:4?", "No mirar cada uno por lo suyo, sino también por lo de los otros", ["Mirar solo por lo propio", "No mirar a nadie", "Juzgar a los otros"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m1-14", 3, "o3", "comprender", "¿Qué condición pone la ley de privacidad para que el hospital le dé información del paciente al clero?", "Que el paciente haya sido informado y no se haya opuesto", ["Que el capellán pague", "Ninguna", "Que el capellán sea familiar"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["m1-15", 3, "o3", "aplicar", "Un paciente te pide un vaso de agua. ¿Qué haces?", "Preguntas primero al personal si puede tomarla", ["Se la das enseguida", "Le dices que no", "Le das un refresco"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el capellán no toca los equipos médicos ni mueve al paciente?", "Porque puede hacerle daño y eso le toca al personal", ["Porque no le importa", "Porque está cansado", "Sí debe moverlo"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m1-17", 3, "o3", "comprender", "¿Qué enseña 1 Corintios 14:40 al capellán en el hospital?", "A servir con orden, siguiendo las normas que protegen a los pacientes", ["A hacer lo que quiera", "A no seguir reglas", "A visitar a cualquier hora"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué visita en cuidados intensivos es la mejor?", "Coordinar con la enfermera, cuidar la higiene, hablarle con calma al paciente, orar brevemente con la familia y acompañarla después", ["Una visita larga sin avisar", "Tocar los equipos", "No hablarle porque no responde"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué pidió el ladrón a Jesús, según Lucas 23:42?", "Acuérdate de mí cuando vengas en tu reino", ["Bájame de la cruz", "Castiga a los soldados", "Dame agua"], "«Acuérdate de mí cuando vengas en tu reino».", "Lucas 23:42-43"],
      ["m2-02", 4, "o4", "comprender", "¿Qué necesidades atienden los cuidados paliativos, según la OMS?", "Las físicas, las psicológicas, las sociales y las espirituales", ["Solo las físicas", "Solo el dinero", "Ninguna"], "«porque tú estarás conmigo».", "Salmos 23:4"],
      ["m2-03", 4, "o4", "aplicar", "Una familia no sabe cómo despedirse de su madre, que está muriendo. ¿Qué le sugieres?", "Que le digan que la aman, le den gracias, le pidan perdón o la perdonen", ["Que no le hablen", "Que se vayan a casa", "Que esperen a mañana"], "«No se turbe vuestro corazón».", "Juan 14:1-3"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué el capellán le habla con suavidad a un paciente que está muriendo aunque no responda?", "Porque muchas veces el que muere todavía oye, y la voz lo acompaña", ["Para que lo vea la familia", "Porque no sabe qué hacer", "No debe hablarle"], "«Aunque ande en valle de sombra de muerte, No temeré mal alguno, porque tú estarás conmigo».", "Salmos 23:4"],
      ["m2-05", 4, "o4", "aplicar", "Un paciente que muere tiene mucho miedo. ¿Qué haces?", "Lo acompañas, lees el Salmo 23 y oras con palabras sencillas de entrega y de esperanza", ["Le dices que no tenga miedo y te vas", "Le hablas del infierno", "Cambias de tema"], "«No temeré mal alguno, porque tú estarás conmigo».", "Salmos 23:4"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué hace mejor el capellán cuando un paciente acaba de morir?", "Acompaña a la familia, ora con ella y la ayuda a dar los primeros pasos con el personal", ["Se va enseguida", "Habla de los gastos del funeral", "Pide que dejen la habitación"], "«Y si me fuere y os preparare lugar, vendré otra vez, y os tomaré a mí mismo».", "Juan 14:1-3"],
      ["m2-07", 5, "o5", "recordar", "¿Qué vieron los ojos de Dios, según Salmos 139:16?", "Mi embrión", ["Mi dinero", "Mi casa", "Mis pecados"], "«Mi embrión vieron tus ojos».", "Salmos 139:16"],
      ["m2-08", 5, "o5", "comprender", "¿Qué frase hiere a unos padres que perdieron un bebé?", "Ya tendrán otro", ["Siento mucho la muerte de su hija", "¿Quieren contarme de ella?", "Dios no se olvida de ustedes"], "Dios no los olvida: «yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
      ["m2-09", 5, "o5", "aplicar", "Unos padres cuyo hijo está grave en la unidad de bebés no se separan de la incubadora. ¿Qué haces?", "Los acompañas un momento, escuchas, oras con ellos si lo desean y les preguntas qué necesitan", ["Les pides que se vayan a descansar", "Les explicas el tratamiento", "No los molestas nunca"], "«Dejad a los niños venir a mí, y no se lo impidáis».", "Mateo 19:14"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué el capellán cuida también a los hermanos y a los abuelos del bebé?", "Porque toda la familia sufre la pérdida", ["Porque los padres no importan", "Porque lo pide el seguro", "No debe cuidarlos"], "«Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
      ["m2-11", 5, "o5", "aplicar", "Meses después de perder a su bebé, una madre no puede volver a trabajar ni salir de su casa. ¿Qué le aconsejas?", "Buscar ayuda profesional, sin dejar de acompañarla", ["Que se le pasará sola", "Que tenga otro hijo", "Que no hable del tema"], "Dios sigue con ella: «Aunque olvide ella, yo nunca me olvidaré de ti».", "Isaías 49:15-16"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué palabras acompañan mejor a unos padres en duelo por su bebé?", "Siento mucho la muerte de Sara; ¿quieren contarme de ella?", ["Por lo menos era chiquita", "Dios necesitaba otro angelito", "Ya tendrán otro"], "«Mi embrión vieron tus ojos».", "Salmos 139:16"],
      ["m2-13", 6, "o6", "recordar", "¿Qué deseaba Pablo, según Filipenses 1:23?", "Partir y estar con Cristo, lo cual es muchísimo mejor", ["Vivir para siempre en la tierra", "Olvidar a Cristo", "Ser rico"], "«teniendo deseo de partir y estar con Cristo, lo cual es muchísimo mejor».", "Filipenses 1:21-23"],
      ["m2-14", 6, "o6", "comprender", "¿Qué diferencia al capellán que acompaña una decisión del que la impone?", "El que acompaña escucha, ayuda a entender y respeta la fe de la familia; el que impone dice lo que hay que hacer", ["Ninguna", "El que impone escucha más", "El que acompaña decide por la familia"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m2-15", 6, "o6", "aplicar", "Una familia te pide que le digas si debe desconectar el respirador. ¿Qué haces?", "La ayudas a pensar en lo que su ser querido quería y a hablarlo con el médico, y oras con ella, sin decidir por ella", ["Le dices que lo desconecte", "Le dices que nunca lo desconecte", "Te vas"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el capellán también necesita hablar con alguien de lo que vive en el hospital?", "Porque acompaña mucho dolor y también necesita que lo cuiden", ["Porque es débil", "No lo necesita", "Para contar los casos"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
      ["m2-17", 6, "o6", "comprender", "¿Qué esperanza da Filipenses 1:21 a una familia que acompaña a un creyente que muere?", "Que para el creyente el morir es ganancia, porque va a estar con Cristo", ["Que la muerte es el final", "Que no hay esperanza", "Que hay que olvidar al que muere"], "«Porque para mí el vivir es Cristo, y el morir es ganancia».", "Filipenses 1:21-23"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué cuidado del personal después de una muerte difícil es el mejor?", "Ofrecer un momento para conversar o para orar, escuchar sin juzgar y guardar la confianza", ["No hacer nada", "Contar el caso a otros", "Decirles que es parte de su trabajo y seguir"], "«Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "capellania-2-e1",
      tipo: "corta",
      pregunta: "Explica lo que vive un enfermo en el hospital y cómo lo acompaña el capellán.",
      ideas: [
        { id: "vive", peso: 30, texto: "El miedo, la pérdida del control y la soledad.", formas: ["miedo", "control", "soledad"] },
        { id: "acompana", peso: 30, texto: "El capellán escucha, acompaña y ora.", formas: ["escuch*", "acompan*", "ora", "orar", "compasion"] },
        { id: "limites", peso: 30, texto: "Trabaja con el equipo y no da noticias médicas.", formas: ["equipo", "enfermera*", "noticias medicas", "su medico", "el medico"] },
      ],
      citas: ["Salmos 41:3", "Marcos 1:41", "Marcos 1:40-41", "2 Corintios 4:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El enfermo vive miedo, pérdida del control y soledad, y se pregunta dónde está Dios. El capellán lo acompaña como Jesús, que tuvo compasión del leproso y lo tocó (Marcos 1:41): escucha, ora y le recuerda que Dios lo sostiene. Trabaja con el equipo y no da noticias médicas: lo anima a hablar con su médico.",
    },
    {
      id: "capellania-2-e2",
      tipo: "corta",
      pregunta: "Explica cómo ora el capellán por un enfermo según la declaración de fe.",
      ideas: [
        { id: "sana", peso: 30, texto: "Dios sana hoy en respuesta a la oración de fe, y la medicina no se opone.", formas: ["dios sana", "oracion de fe", "medicina", "atencion medica"] },
        { id: "humildad", peso: 30, texto: "Pone al enfermo en las manos de Dios, sin prometer ni culpar.", formas: ["manos de dios", "su voluntad", "sin prometer", "culpa*"], negativa: true },
        { id: "respeto", peso: 30, texto: "Ora con permiso, con palabras breves y con respeto.", formas: ["permiso", "breve*", "sencill*", "respet*"] },
      ],
      citas: ["Santiago 5:14-15", "Santiago 5:15", "2 Corintios 12:9", "2 Corintios 12:8-9", "2 Reyes 20:5", "1 Timoteo 5:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La declaración de fe enseña que Dios sana hoy en respuesta a la oración de fe (Santiago 5:15), y que buscar su sanidad no se opone a la medicina. El capellán pone al enfermo en las manos de Dios, sin prometer lo que solo Dios decide y sin culparlo, y ora con permiso y con palabras breves.",
    },
    {
      id: "capellania-2-e3",
      tipo: "corta",
      pregunta: "Explica cómo cuida el capellán la privacidad y la salud de los pacientes en el hospital.",
      ideas: [
        { id: "privacidad", peso: 30, texto: "Guarda la privacidad: lo que el hospital le permite saber, y no lo comparte.", formas: ["privacidad", "hipaa", "no lo comparte", "guarda", "afiliacion religiosa"] },
        { id: "higiene", peso: 30, texto: "Se lava las manos y sigue el aislamiento.", formas: ["lava las manos", "lavarse las manos", "aislamiento", "gel", "mascarilla"] },
        { id: "orden", peso: 30, texto: "Coordina con el personal y no publica nada.", formas: ["enfermera", "coordin*", "redes", "publica*", "personal"] },
      ],
      citas: ["Proverbios 11:13", "1 Corintios 14:40", "Filipenses 2:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Guarda la privacidad: según la ley HIPAA, el hospital puede darle al clero el nombre, el lugar, el estado general y la afiliación religiosa del paciente si este no se opuso, y el capellán no lo comparte (Proverbios 11:13). Se lava las manos y sigue el aislamiento. Coordina con la enfermera y no publica nada en las redes.",
    },
    {
      id: "capellania-2-e4",
      tipo: "breve",
      pregunta:
        "La familia de una señora que está muriendo en el hospital llama al capellán. Explica cómo la acompañaría, con citas bíblicas.",
      ideas: [
        { id: "llegar", peso: 25, texto: "Llegar con calma, presentarse y preguntar qué desean.", formas: ["con calma", "se presenta", "presentarse", "que desean", "pregunta*"] },
        { id: "palabra", peso: 25, texto: "Hablarle, leer un salmo y orar con esperanza.", formas: ["salmo", "orar", "ora", "le habla", "hablarle", "esperanza"] },
        { id: "despedirse", peso: 25, texto: "Ayudar a la familia a despedirse.", formas: ["despedi*", "la aman", "gracias", "perdon*"] },
        { id: "quedarse", peso: 25, texto: "Quedarse y acompañar a la familia después.", formas: ["quedarse", "se queda", "me quedaria", "en silencio", "primeros pasos"] },
      ],
      basta: 85,
      citas: ["Salmos 23:4", "Juan 14:1-3", "Juan 14:2", "Lucas 23:43", "2 Timoteo 4:7", "Filipenses 1:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El capellán llegaría con calma, se presentaría y preguntaría a la familia cómo está y qué desea. Se acercaría a la señora, le tomaría la mano si la familia lo permite y le hablaría con suavidad, porque muchas veces el que muere todavía oye. Leería el Salmo 23: aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo (Salmos 23:4), y oraría con palabras sencillas de entrega y de esperanza, recordando que Jesús fue a preparar lugar para los suyos (Juan 14:2). Después invitaría a la familia a despedirse: a decirle que la aman, a darle gracias, a pedirle perdón o a perdonarla. Se quedaría con ellos en silencio el tiempo que haga falta. Y cuando la señora muera, acompañaría a la familia, oraría con ellos y los ayudaría a dar los primeros pasos con el personal, respetando sus ritos si son de otra fe.",
    },
    {
      id: "capellania-2-e5",
      tipo: "breve",
      pregunta:
        "Unos padres pierden a su bebé a las treinta semanas de embarazo. Explica cómo los acompañaría el capellán, con citas bíblicas.",
      ideas: [
        { id: "nombre", peso: 25, texto: "Llamar al bebé por su nombre y reconocer la pérdida.", formas: ["su nombre", "por su nombre", "perdida verdadera", "reconoc*"] },
        { id: "recuerdos", peso: 25, texto: "Ofrecer cargarlo y guardar recuerdos.", formas: ["cargar*", "recuerdo*", "fotos", "huellas"] },
        { id: "orar", peso: 25, texto: "Orar con respeto a su fe y leer la Palabra.", formas: ["orar", "ora", "isaias", "salmo", "su fe"] },
        { id: "despues", peso: 25, texto: "No decir frases que hieren y acompañar después del alta.", formas: ["despues del alta", "seguir acompan*", "siga acompan*", "ayuda profesional"] },
      ],
      basta: 85,
      citas: ["Isaías 49:15-16", "Isaías 49:15", "Salmos 139:13", "Salmos 139:16", "Mateo 19:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El capellán entraría con respeto, se sentaría y les diría que siente mucho la muerte de su hija, llamándola por su nombre, porque es una pérdida verdadera: Dios conoce cada vida desde el vientre, y sus ojos vieron su embrión (Salmos 139:16). Escucharía a los dos, que pueden vivir el dolor de maneras distintas. Les preguntaría si quieren cargar a su bebé o guardar un recuerdo, como fotos o sus huellas, como ofrecen muchos hospitales. Les ofrecería orar por ellos, respetando su fe, y leer la promesa de Dios: aunque olvide ella, yo nunca me olvidaré de ti (Isaías 49:15). No les diría que pronto tendrán otro hijo, ni que Dios necesitaba otro angelito. Les preguntaría si quieren que avise a su pastor o a su familia. Y después del alta, con su permiso, la iglesia los seguiría acompañando, recordando la fecha en que nació su hija, y buscaría ayuda profesional si el duelo no los deja vivir.",
    },
  ],
  breve: {
    id: "capellania-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo serviría un capellán voluntario de tu iglesia en un hospital, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "enfermo", peso: 15, texto: "Acompañar al enfermo con compasión.", formas: ["compasion", "acompan*", "escuch*"] },
      { id: "oracion", peso: 20, texto: "Orar con fe y con humildad, según la declaración de fe.", formas: ["oracion de fe", "dios sana", "sin prometer", "manos de dios"] },
      { id: "normas", peso: 15, texto: "Las normas: privacidad e higiene.", formas: ["privacidad", "hipaa", "lava las manos", "lavarse las manos", "aislamiento"] },
      { id: "muerte", peso: 20, texto: "Acompañar al que muere y a su familia.", formas: ["muere", "morir", "despedi*", "paliativos", "hospicio"] },
      { id: "perdidas", peso: 15, texto: "Las pérdidas de los niños y de las madres.", formas: ["bebe", "embarazo", "por su nombre"] },
      { id: "decisiones", peso: 15, texto: "Las decisiones difíciles y el cuidado del personal.", formas: ["decision*", "comite de etica", "al personal", "el personal"] },
    ],
    basta: 85,
    citas: ["Salmos 41:3", "Marcos 1:41", "Santiago 5:15", "2 Corintios 12:9", "Proverbios 11:13", "1 Corintios 14:40", "Salmos 23:4", "Juan 14:2", "Isaías 49:15", "Salmos 139:16", "Proverbios 11:14", "Gálatas 6:2"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El capellán serviría con la certeza de que Jehová sustenta al enfermo sobre el lecho del dolor (Salmos 41:3). Acompañaría a cada paciente con la compasión de Jesús, que tocó al leproso (Marcos 1:41): lo escucharía y estaría con él, sin dar noticias médicas. Oraría con fe, porque la declaración de fe enseña que Dios sana hoy en respuesta a la oración de fe (Santiago 5:15), pero pondría al enfermo en las manos de Dios, sin prometer ni culpar, porque su gracia basta (2 Corintios 12:9). Respetaría las normas del hospital: la privacidad que protege la ley HIPAA, el lavado de manos y el aislamiento, haciendo todo con orden (1 Corintios 14:40). Acompañaría a los que mueren y a sus familias, con el Salmo 23 y la esperanza de que Jesús fue a preparar lugar (Juan 14:2), y las ayudaría a despedirse. Ante la pérdida de un bebé, lo llamaría por su nombre y recordaría a los padres que Dios no se olvida de ellos (Isaías 49:15). En las decisiones difíciles acompañaría a la familia sin decidir por ella, porque en la multitud de consejeros hay seguridad (Proverbios 11:14). Y cuidaría también al personal, sobrellevando las cargas de los otros (Gálatas 6:2).",
  },
};
