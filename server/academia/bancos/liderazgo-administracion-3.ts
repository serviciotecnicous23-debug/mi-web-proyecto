/**
 * El banco de «Equipos y voluntarios» (especialidad Liderazgo y administración, materia 3). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el cuerpo que sirve y el ciclo del voluntario · o2 invitar y ubicar · o3 seleccionar con cuidado ·
 * o4 capacitar y acompañar · o5 cuidar, reconocer y renovar · o6 la ley y los voluntarios · o7 el versículo de memoria
 * (1 Pedro 4:10). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos,
 * y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `liderazgo-administracion-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_LIDERAZGO_ADMINISTRACION_3: BancoMateria = {
  materia: "liderazgo-administracion-3",
  repaso: {
    "liderazgo-administracion-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo colocó Dios los miembros en el cuerpo, según 1 Corintios 12:18?", "Cada uno de ellos como él quiso", ["Al azar", "Según su riqueza", "Por orden de llegada"], "«Mas ahora Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso».", "1 Corintios 12:18-21"],
      ["1-r2", 1, "o1", "comprender", "¿Cuál es el ciclo del voluntario en la iglesia?", "Invitar, ubicar, preparar, acompañar, reconocer y renovar", ["Pedir, usar y olvidar", "Anunciar y esperar", "Elegir siempre a los mismos"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
      ["1-r3", 1, "o1", "aplicar", "En tu iglesia, los mismos cinco hermanos hacen casi todo y muchos no saben dónde servir. ¿Qué propones primero?", "Un mapa de servicio con los puestos y cuántos voluntarios necesita cada uno, para invitar con orden", ["Que los cinco sigan igual", "Un anuncio general cada domingo", "Cerrar algunos ministerios sin consultar"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:18-21"],
    ] as P[]).map(p),
    "liderazgo-administracion-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Quiénes vinieron con ofrenda para el tabernáculo, según Éxodo 35:21?", "Todo aquel a quien su corazón estimuló y a quien su espíritu le dio voluntad", ["Solo los sacerdotes", "Los obligados por el rey", "Los extranjeros"], "«Y vino todo varón a quien su corazón estimuló, y todo aquel a quien su espíritu le dio voluntad».", "Éxodo 35:21"],
      ["2-r2", 2, "o2", "comprender", "¿Qué dice la descripción de un puesto de servicio?", "Su propósito, las tareas, el tiempo, los requisitos, a quién rinde cuentas y la capacitación", ["Solo el nombre del puesto", "Lo que gana el voluntario", "Nada escrito"], "La iglesia buscó personas para una tarea concreta: «a quienes encarguemos de este trabajo».", "Hechos 6:2-4"],
      ["2-r3", 2, "o2", "aplicar", "Viste a una hermana servir el café con alegría cada domingo. ¿Cómo la invitas al equipo de bienvenida?", "En persona, diciéndole qué haría, cuánto tiempo y con quién, y proponiéndole probar un mes", ["Pones un anuncio general", "Le das el puesto sin preguntarle", "Esperas a que ella lo pida"], "«y todo aquel a quien su espíritu le dio voluntad».", "Éxodo 35:21"],
    ] as P[]).map(p),
    "liderazgo-administracion-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pide 1 Timoteo 3:10 antes de que alguien ejerza el diaconado?", "Que sea sometido a prueba primero", ["Que sea rico", "Que tenga muchos hijos", "Que sea famoso"], "«Y éstos también sean sometidos a prueba primero, y entonces ejerzan el diaconado, si son irreprensibles».", "1 Timoteo 3:10"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué se pide la revisión de antecedentes a los que sirven con niños?", "Porque cuidan a los más vulnerables, y la revisión ayuda a protegerlos", ["Porque los voluntarios son sospechosos", "No hace falta", "Para cobrarles"], "«No impongas con ligereza las manos a ninguno».", "1 Timoteo 5:22"],
      ["3-r3", 3, "o3", "aplicar", "Un hermano que llegó hace dos meses quiere enseñar en la clase de los niños. ¿Qué haces?", "Le das la solicitud, lo entrevistas, llamas a sus referencias y pides la revisión de antecedentes, y mientras tanto sirve en otra área", ["Lo pones a enseñar el domingo", "Le dices que nunca podrá", "Le pides que se vaya a otra iglesia"], "«No impongas con ligereza las manos a ninguno, ni participes en pecados ajenos».", "1 Timoteo 5:22"],
    ] as P[]).map(p),
    "liderazgo-administracion-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cómo envió Jesús a los doce, según Marcos 6:7?", "De dos en dos", ["Uno por uno", "Todos juntos a una ciudad", "Sin decirles nada"], "«Después llamó a los doce, y comenzó a enviarlos de dos en dos».", "Marcos 6:7"],
      ["4-r2", 4, "o4", "comprender", "¿Cómo es la capacitación práctica de un voluntario?", "Primero ve cómo se hace, después lo hace con ayuda, luego solo y al final enseña a otro", ["Lee un libro y empieza solo", "Aprende equivocándose sin ayuda", "No necesita capacitación"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
      ["4-r3", 4, "o4", "aplicar", "Un voluntario nuevo va a servir por primera vez en el salón de los niños. ¿Qué haces antes?", "Le das la orientación y la política de protección, y lo pones a servir junto a alguien con experiencia", ["Lo dejas solo para que aprenda", "Le das las llaves y te vas", "Le explicas todo después de la clase"], "Jesús los envió «de dos en dos; y les dio autoridad».", "Marcos 6:7"],
    ] as P[]).map(p),
    "liderazgo-administracion-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Jetro a Moisés que le iba a pasar si seguía solo, según Éxodo 18:18?", "Que desfallecería del todo, él y el pueblo", ["Que se haría rico", "Que el pueblo lo aplaudiría", "Que viviría más años"], "«Desfallecerás del todo, tú, y también este pueblo que está contigo».", "Éxodo 18:17-18"],
      ["5-r2", 5, "o5", "comprender", "¿Cuáles son señales de que un voluntario está cansado?", "Llegar tarde, faltar, perder la alegría o contestar con enojo", ["Sonreír mucho", "Llegar temprano", "Pedir más tareas"], "«No está bien lo que haces».", "Éxodo 18:17-18"],
      ["5-r3", 5, "o5", "aplicar", "Una hermana sirve todos los domingos desde hace cuatro años y ya llega sin ánimo. ¿Qué haces?", "La invitas a conversar, le das las gracias, la escuchas y le ofreces servir menos, cambiar o descansar", ["Le pides que sirva más", "La regañas en público", "No le dices nada"], "«Recibidle, pues, en el Señor, con todo gozo, y tened en estima a los que son como él».", "Filipenses 2:29-30"],
    ] as P[]).map(p),
    "liderazgo-administracion-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿A qué pide Tito 3:1 que estemos dispuestos?", "A toda buena obra", ["A ninguna obra", "Solo a las obras grandes", "A las obras que pagan"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1"],
      ["6-r2", 6, "o6", "comprender", "¿Qué no cubre la Ley de Protección del Voluntario de 1997?", "El daño al manejar un vehículo que pide licencia o seguro, y la responsabilidad de la iglesia", ["Nada, lo cubre todo", "Solo los voluntarios pagados", "Las buenas obras"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
      ["6-r3", 6, "o6", "aplicar", "Un voluntario que es maestro de escuela sospecha que un niño de la iglesia sufre abuso. ¿Qué le recuerdas?", "Que lo debe reportar a la línea de Texas, como profesional a más tardar en 24 horas, o al 911 si hay peligro", ["Que espere a estar seguro", "Que solo le cuente al pastor", "Que hable con los padres primero y no reporte"], "«El avisado ve el mal y se esconde».", "Proverbios 22:3"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El cuerpo que sirve
    ["f01", 1, "o1", "recordar", "¿Qué no puede decir el ojo a la mano, según 1 Corintios 12:21?", "No te necesito", ["Te quiero", "Ayúdame", "Sígueme"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:18-21"],
    ["f02", 1, "o1", "recordar", "¿Cómo debe usar el que hace misericordia su don, según Romanos 12:8?", "Con alegría", ["Con tristeza", "Con prisa", "Con orgullo"], "«el que hace misericordia, con alegría».", "Romanos 12:6-8"],
    ["f03", 1, "o1", "comprender", "¿Qué enseña 1 Pedro 4:10 sobre el servicio?", "Que cada uno sirve a los demás con el don que recibió, como administrador de la gracia de Dios", ["Que solo los pastores sirven", "Que los dones son para uno mismo", "Que servir no importa"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f04", 1, "o1", "comprender", "¿Para qué sirve el mapa de servicio de una iglesia?", "Para saber qué puestos hay, cuántos voluntarios necesita cada uno y cuáles piden cuidado especial", ["Para dibujar el templo", "Para cobrar a los voluntarios", "No sirve"], "«Mas ahora Dios ha colocado los miembros cada uno de ellos en el cuerpo».", "1 Corintios 12:18-21"],
    ["f05", 1, "o1", "comprender", "¿Qué diferencia hay entre un equipo de voluntarios cuidado y uno descuidado?", "En el cuidado cada uno sabe qué hace, los turnos se reparten y se dan las gracias; en el descuidado todo cae en pocos", ["Ninguna", "El descuidado trabaja mejor", "El cuidado no necesita líder"], "«Porque si todos fueran un solo miembro, ¿dónde estaría el cuerpo?».", "1 Corintios 12:18-21"],
    ["f06", 1, "o1", "analizar", "¿Por qué es un problema que pocos hermanos hagan casi todo?", "Porque se cansan, y muchos otros pierden la oportunidad de usar sus dones", ["Porque los demás no sirven para nada", "No es un problema", "Porque así se gasta menos"], "«Pero ahora son muchos los miembros, pero el cuerpo es uno solo».", "1 Corintios 12:18-21"],
    ["f07", 1, "o1", "aplicar", "Un líder dice que es más rápido hacerlo todo él que enseñar a otros. ¿Qué le respondes?", "Que Dios dio dones a cada miembro, y que preparar a otros hace crecer el cuerpo", ["Que tiene razón", "Que deje de servir", "Que trabaje más horas"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f08", 1, "o1", "aplicar", "Tu iglesia no sabe cuántos voluntarios necesita cada domingo. ¿Qué haces?", "Haces el mapa de servicio con los puestos de cada ministerio y cuántos se necesitan", ["Invitas a todos a todo", "Esperas a ver quién viene", "Pones a los mismos de siempre"], "«Mas ahora Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso».", "1 Corintios 12:18-21"],
    ["f09", 1, "o1", "evaluar", "¿Qué organización de los voluntarios es la mejor?", "Un mapa de servicio, un coordinador, invitaciones personales, preparación, acompañamiento, reconocimiento y renovación cada año", ["Un anuncio general y nada más", "Que cada ministerio se arregle solo", "Que sirvan solo los líderes"], "«como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
    ["f10", 1, "o7", "recordar", "Completa 1 Pedro 4:10: Cada uno según el don que ha recibido, minístrelo a los otros…", "como buenos administradores de la multiforme gracia de Dios", ["como siervos del rey de la tierra", "como dueños de lo que Dios les dio", "como jueces de los demás hermanos"], "«Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
    // Lección 2 · Invitar y ubicar
    ["f11", 2, "o2", "recordar", "¿Para qué estableció Jesús a los doce, según Marcos 3:14?", "Para que estuviesen con él y para enviarlos a predicar", ["Para que lo sirvieran en su casa", "Para que construyeran un templo", "Para que juzgaran al pueblo"], "«Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar».", "Marcos 3:14"],
    ["f12", 2, "o2", "recordar", "¿Para qué era la ofrenda de los de corazón dispuesto, según Éxodo 35:21?", "Para la obra del tabernáculo de reunión", ["Para el palacio del rey", "Para la guerra", "Para el faraón"], "«con ofrenda a Jehová para la obra del tabernáculo de reunión».", "Éxodo 35:21"],
    ["f13", 2, "o2", "recordar", "¿Cómo debían ser los siete que buscó la iglesia, según Hechos 6:3?", "De buen testimonio, llenos del Espíritu Santo y de sabiduría", ["Los más ricos", "Los más jóvenes", "Los parientes de los apóstoles"], "«siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:2-4"],
    ["f14", 2, "o2", "comprender", "¿Por qué una invitación personal funciona mejor que un anuncio general?", "Porque reconoce el don de la persona, dice qué hará y le da un primer paso pequeño", ["Porque es más corta", "No funciona mejor", "Porque obliga a la persona"], "«y todo aquel a quien su espíritu le dio voluntad».", "Éxodo 35:21"],
    ["f15", 2, "o2", "comprender", "¿En qué se fija el que ubica a un voluntario?", "En sus dones, su gusto y su tiempo", ["Solo en dónde falta gente", "En su ropa", "En su apellido"], "«De manera que, teniendo diferentes dones, según la gracia que nos es dada».", "Romanos 12:6-8"],
    ["f16", 2, "o2", "analizar", "¿Por qué no se pone a alguien en un puesto solo porque falta gente?", "Porque si no tiene el don, el tiempo o el testimonio, se desanima y puede hacer daño", ["Porque nunca falta gente", "Sí se debe poner", "Porque los puestos sobran"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:2-4"],
    ["f17", 2, "o2", "aplicar", "Tu ministerio pone cada domingo el anuncio se necesitan voluntarios, y nadie responde. ¿Qué cambias?", "Invitas en persona a hermanos con el don, con una tarea clara y una prueba de un mes", ["Pones el anuncio dos veces", "Regañas a la iglesia", "Cierras el ministerio"], "«Y vino todo varón a quien su corazón estimuló».", "Éxodo 35:21"],
    ["f18", 2, "o2", "aplicar", "Un joven quiere servir, pero no sabe dónde. ¿Qué haces?", "Conversas con él sobre sus dones, su gusto y su tiempo, y le propones probar en un lugar", ["Lo pones donde falte gente", "Le dices que espere a ser mayor", "Le das tres ministerios a la vez"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f19", 2, "o2", "aplicar", "Tienes que escribir la descripción del puesto de bienvenida. ¿Qué pones primero?", "El propósito: que cada persona que llega se sienta esperada y amada", ["La lista de los que fallaron", "El horario de otros ministerios", "Nada, basta con el nombre"], "«a quienes encarguemos de este trabajo».", "Hechos 6:2-4"],
    ["f20", 2, "o2", "evaluar", "¿Qué descripción de un puesto de servicio está mejor escrita?", "Una con el propósito, las tareas, el tiempo, los requisitos, a quién rinde cuentas y la capacitación", ["Una que solo dice voluntario", "Una con tareas sin horario", "Una que pide un compromiso para siempre"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:2-4"],
    // Lección 3 · Seleccionar con cuidado
    ["f21", 3, "o3", "recordar", "¿Qué advierte Pablo en 1 Timoteo 5:22?", "No imponer con ligereza las manos a ninguno", ["No orar por los enfermos", "No ayunar", "No cantar en la iglesia"], "«No impongas con ligereza las manos a ninguno, ni participes en pecados ajenos».", "1 Timoteo 5:22"],
    ["f22", 3, "o3", "recordar", "¿Qué pregunta hace Proverbios 20:6 sobre el hombre de verdad?", "¿Quién lo hallará?", ["¿Dónde vive?", "¿Cuánto gana?", "¿A quién conoce?"], "«Pero hombre de verdad, ¿quién lo hallará?».", "Proverbios 20:6"],
    ["f23", 3, "o3", "recordar", "¿Qué proclaman muchos hombres, según Proverbios 20:6?", "Cada uno su propia bondad", ["La bondad de otros", "Sus pecados", "Nada"], "«Muchos hombres proclaman cada uno su propia bondad».", "Proverbios 20:6"],
    ["f24", 3, "o3", "comprender", "¿Cuáles son los pasos de la selección de un voluntario para un puesto delicado?", "La solicitud, el tiempo en la iglesia, la entrevista, las referencias, la revisión de antecedentes y la capacitación", ["Una sonrisa y nada más", "Solo la entrevista", "Solo preguntarle si quiere"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:10"],
    ["f25", 3, "o3", "comprender", "¿Qué se pide a un voluntario que maneja la camioneta de la iglesia?", "La licencia vigente, el seguro y un buen historial de manejo", ["Que sepa cantar", "Nada", "Que sea el más joven"], "«No impongas con ligereza las manos a ninguno».", "1 Timoteo 5:22"],
    ["f26", 3, "o3", "analizar", "¿Por qué se llaman las referencias y no se confía solo en lo que dice la persona?", "Porque muchos proclaman su propia bondad, y otros que la conocen ayudan a ver su testimonio", ["Porque nadie dice la verdad", "No hace falta llamarlas", "Para hacerla esperar"], "«Muchos hombres proclaman cada uno su propia bondad».", "Proverbios 20:6"],
    ["f27", 3, "o3", "aplicar", "Una hermana se ofende porque le piden la revisión de antecedentes para servir con niños. ¿Qué le dices?", "Que todos los que sirven con niños siguen los mismos pasos, para proteger a los niños y a ella misma", ["Que no tiene que hacerlo", "Que ella es sospechosa", "Que se vaya del ministerio"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:10"],
    ["f28", 3, "o3", "aplicar", "Un líder comenta en el pasillo lo que salió en la revisión de un voluntario. ¿Qué haces?", "Le recuerdas que la información de la selección es privada y la guarda solo el coordinador", ["Comentas tú también", "Lo publicas en el grupo", "No haces nada"], "«ni participes en pecados ajenos. Consérvate puro».", "1 Timoteo 5:22"],
    ["f29", 3, "o3", "aplicar", "Tienes a un voluntario nuevo para el ministerio de niños que pasó la selección. ¿Cómo empieza?", "Con la capacitación de protección y sirviendo junto a un maestro con experiencia", ["Solo, con la clase más grande", "Sin capacitación", "Como coordinador del ministerio"], "«y entonces ejerzan el diaconado, si son irreprensibles».", "1 Timoteo 3:10"],
    ["f30", 3, "o3", "evaluar", "¿Qué selección para el ministerio de niños está mejor hecha?", "La solicitud, el tiempo en la iglesia, la entrevista, las referencias, la revisión de antecedentes, la capacitación y una prueba con un líder cerca", ["Que enseñe el que llegó ayer", "Solo una entrevista rápida", "Que se elija al que tenga más tiempo libre"], "«No impongas con ligereza las manos a ninguno».", "1 Timoteo 5:22"],
    // Lección 4 · Capacitar y acompañar
    ["f31", 4, "o4", "recordar", "¿Cómo volvieron los setenta, según Lucas 10:17?", "Con gozo", ["Con tristeza", "Con miedo", "Sin decir nada"], "«Volvieron los setenta con gozo».", "Lucas 10:17"],
    ["f32", 4, "o4", "recordar", "¿Qué les dio Jesús a los doce al enviarlos, según Marcos 6:7?", "Autoridad sobre los espíritus inmundos", ["Dinero para el viaje", "Una casa", "Un ejército"], "«y les dio autoridad sobre los espíritus inmundos».", "Marcos 6:7"],
    ["f33", 4, "o4", "recordar", "¿Para qué pide Hebreos 10:24 que nos consideremos unos a otros?", "Para estimularnos al amor y a las buenas obras", ["Para competir", "Para juzgarnos", "Para alejarnos"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
    ["f34", 4, "o4", "comprender", "¿Qué lleva la orientación de un voluntario nuevo?", "La visión de la iglesia, las políticas que debe conocer y el manual de su ministerio", ["Solo el horario", "Una fiesta", "Nada, aprende solo"], "Jesús los envió «de dos en dos; y les dio autoridad».", "Marcos 6:7"],
    ["f35", 4, "o4", "comprender", "¿Para qué sirve la conversación después de servir?", "Para ver qué salió bien, qué fue difícil y qué se aprendió", ["Para regañar", "Para alargar el día", "No sirve"], "«Volvieron los setenta con gozo, diciendo: Señor».", "Lucas 10:17"],
    ["f36", 4, "o4", "analizar", "¿Por qué Jesús envió a los discípulos de dos en dos?", "Porque así se acompañaban, se ayudaban y daban un testimonio más fuerte", ["Porque no había suficientes caminos", "Por casualidad", "Porque uno no sabía hablar"], "«y comenzó a enviarlos de dos en dos».", "Marcos 6:7"],
    ["f37", 4, "o4", "aplicar", "Un voluntario nuevo se equivocó el primer día porque nadie le explicó nada. ¿Qué cambias?", "Una orientación antes de empezar y servir los primeros días junto a alguien con experiencia", ["Lo sacas del equipo", "Le dices que lea solo el manual", "Nada, así se aprende"], "«Y considerémonos unos a otros».", "Hebreos 10:24"],
    ["f38", 4, "o4", "aplicar", "Los voluntarios se enteran de sus turnos el mismo domingo. ¿Qué propones?", "Avisar los turnos con tiempo, por ejemplo con un mes, y avisar los cambios", ["Seguir igual", "Que adivinen", "Llamarlos a medianoche"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
    ["f39", 4, "o4", "aplicar", "Tienes cuatro voluntarios nuevos para la bienvenida. ¿Cómo los capacitas?", "Con una orientación, un domingo observando, otro con ayuda y otro solo con la coordinadora cerca", ["Dándoles un papel", "Poniéndolos solos el primer domingo", "Sin capacitación"], "Jesús los envió «de dos en dos».", "Marcos 6:7"],
    ["f40", 4, "o4", "evaluar", "¿Qué plan de capacitación de voluntarios es el mejor?", "Orientación, ver, hacer con ayuda, hacer solo y enseñar a otro, con un líder que acompaña y un repaso al año", ["Un libro y nada más", "Aprender solo con los errores", "Una reunión al año sin práctica"], "«Volvieron los setenta con gozo».", "Lucas 10:17"],
    // Lección 5 · Cuidar, reconocer y renovar
    ["f41", 5, "o5", "recordar", "¿Qué dijo Pablo de Febe, según Romanos 16:2?", "Que ella había ayudado a muchos, y a él mismo", ["Que nunca había servido", "Que era rica", "Que debía callar"], "«porque ella ha ayudado a muchos, y a mí mismo».", "Romanos 16:1-4"],
    ["f42", 5, "o5", "recordar", "¿Quiénes daban gracias por Priscila y Aquila, según Romanos 16:4?", "Pablo y todas las iglesias de los gentiles", ["Nadie", "Solo los romanos", "Los fariseos"], "«a los cuales no sólo yo doy gracias, sino también todas las iglesias de los gentiles».", "Romanos 16:1-4"],
    ["f43", 5, "o5", "recordar", "¿Cómo pide Filipenses 2:29 que se tenga a los que son como Epafrodito?", "En estima", ["En poco", "En sospecha", "En silencio"], "«tened en estima a los que son como él».", "Filipenses 2:29-30"],
    ["f44", 5, "o5", "comprender", "¿Por qué se reparten los turnos entre muchos voluntarios?", "Para que nadie sirva siempre sin descanso y el equipo no se canse", ["Para que nadie sirva", "Para gastar menos", "No hace falta"], "«porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:17-18"],
    ["f45", 5, "o5", "comprender", "¿Qué significa renovar el compromiso de un voluntario?", "Conversar cada cierto tiempo si sigue, si cambia de lugar o si descansa", ["Obligarlo a seguir siempre", "Sacarlo sin hablar", "Darle más tareas"], "«Recibidle, pues, en el Señor, con todo gozo».", "Filipenses 2:29-30"],
    ["f46", 5, "o5", "analizar", "¿Por qué muchos voluntarios dejan de servir en silencio?", "Porque se cansan sin que nadie lo note, y nadie les pregunta cómo están", ["Porque no aman a Dios", "Porque no quieren a la iglesia", "Nunca dejan de servir"], "«Desfallecerás del todo, tú, y también este pueblo que está contigo».", "Éxodo 18:17-18"],
    ["f47", 5, "o5", "aplicar", "Un líder solo les habla a sus voluntarios cuando alguien falta. ¿Qué le sugieres?", "Que les pregunte cómo están, les dé las gracias y celebre lo que Dios hace por medio del equipo", ["Que los regañe más", "Que no les hable", "Que los cambie a todos"], "«tened en estima a los que son como él».", "Filipenses 2:29-30"],
    ["f48", 5, "o5", "aplicar", "Un voluntario no cumple con sus turnos desde hace dos meses. ¿Qué haces?", "Hablas con él en privado y con mansedumbre, para saber qué le pasa y buscar una salida", ["Lo regañas delante del equipo", "Lo sacas sin hablarle", "No haces nada"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
    ["f49", 5, "o5", "aplicar", "Un hermano quiere dejar de servir después de varios años. ¿Qué haces?", "Le das las gracias, lo despides con gratitud y reconoces su servicio delante del equipo", ["Lo haces sentir culpable", "No le dices nada", "Le dices que ya no es parte de la iglesia"], "«a los cuales no sólo yo doy gracias, sino también todas las iglesias».", "Romanos 16:1-4"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de cuidar a los voluntarios es la mejor?", "Repartir la carga, poner límites, notar el cansancio, reconocer, escuchar y renovar el compromiso con libertad", ["Exigir más cada año", "Ignorar el cansancio", "Reconocer solo a los líderes"], "«tened en estima a los que son como él».", "Filipenses 2:29-30"],
    // Lección 6 · La ley y los voluntarios
    ["f51", 6, "o6", "recordar", "¿A quiénes manda someterse Romanos 13:1?", "A las autoridades superiores", ["A nadie", "Solo a los pastores", "A los ricos"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    ["f52", 6, "o6", "recordar", "¿De dónde vienen las autoridades, según Romanos 13:1?", "De parte de Dios", ["Del azar", "Del pueblo solamente", "De los ricos"], "«porque no hay autoridad sino de parte de Dios, y las que hay, por Dios han sido establecidas».", "Romanos 13:1"],
    ["f53", 6, "o6", "recordar", "¿Qué pide Tito 3:1 recordar a los creyentes sobre los gobernantes y autoridades?", "Que se sujeten a ellos y obedezcan", ["Que los ignoren", "Que los desafíen", "Que no paguen impuestos"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan».", "Tito 3:1"],
    ["f54", 6, "o6", "comprender", "¿Qué protege la Ley de Protección del Voluntario de 1997?", "Al voluntario que actúa dentro de sus funciones, con la licencia que haga falta y sin negligencia grave", ["A la iglesia en todo", "Al voluntario que actúa con mala intención", "Solo a los pastores"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ["f55", 6, "o6", "comprender", "¿Cuánto puede deducir un voluntario por cada milla que maneja para servir y que no le reembolsaron?", "14 centavos por milla, si detalla sus deducciones", ["Un dólar por milla", "Nada", "Lo que quiera"], "«Recuérdales que se sujeten a los gobernantes y autoridades».", "Tito 3:1"],
    ["f56", 6, "o6", "analizar", "¿Por qué la iglesia necesita su propio seguro aunque exista la ley del voluntario?", "Porque esa ley protege al voluntario, pero no cambia la responsabilidad de la iglesia", ["Porque la ley no existe", "No necesita seguro", "Porque el seguro es obligatorio para todos los voluntarios"], "«El avisado ve el mal y se esconde».", "Proverbios 22:3"],
    ["f57", 6, "o6", "aplicar", "Unos voluntarios van a llevar a los jóvenes al campamento en sus carros. ¿Qué revisas?", "La licencia vigente y el seguro de cada chofer, porque la ley del voluntario no cubre el manejo de vehículos", ["Nada, son voluntarios", "Solo que tengan gasolina", "Que manejen rápido"], "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño».", "Proverbios 22:3"],
    ["f58", 6, "o6", "aplicar", "Una voluntaria sospecha que un niño del grupo sufre abuso en su casa. ¿Qué hace?", "Lo reporta de inmediato a la línea de Texas, 1-800-252-5400, o al 911 si hay peligro, y avisa al pastor", ["Espera a tener pruebas", "Solo se lo cuenta al pastor", "Habla con los padres para que lo arreglen"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    ["f59", 6, "o6", "aplicar", "Unos jóvenes de 15 años quieren servir en el campamento de los niños. ¿Qué pides?", "El permiso de sus padres y un adulto responsable cerca", ["Nada", "Que vayan solos con los niños", "Que firmen ellos un contrato"], "«El avisado ve el mal y se esconde».", "Proverbios 22:3"],
    ["f60", 6, "o6", "evaluar", "¿Qué revisión de la protección legal de los voluntarios es la mejor?", "Revisar el seguro de la iglesia, la licencia y el seguro de los choferes, la selección de los que sirven con niños, las millas, los permisos de los menores y el reporte del abuso", ["Creer que todo está cubierto", "Revisar solo el seguro del templo", "No revisar nada porque son voluntarios"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué pregunta Pablo si todos fueran un solo miembro, según 1 Corintios 12:19?", "¿Dónde estaría el cuerpo?", ["¿Quién sería el líder?", "¿Quién pagaría?", "¿Dónde estaría el templo?"], "«Porque si todos fueran un solo miembro, ¿dónde estaría el cuerpo?».", "1 Corintios 12:18-21"],
      ["m1-02", 1, "o1", "comprender", "¿Qué hace el coordinador de voluntarios?", "Lleva al día el mapa de servicio y ayuda a invitar, ubicar y acompañar", ["Hace todas las tareas solo", "Cobra a los voluntarios", "Nada importante"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
      ["m1-03", 1, "o1", "aplicar", "Tu iglesia tiene muchos hermanos que solo asisten. ¿Cómo los ayudas a servir?", "Les muestras los puestos que hay y los invitas en persona según sus dones", ["Los regañas desde el púlpito", "Esperas a que pidan", "Les asignas un puesto sin preguntar"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:18-21"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el ciclo del voluntario incluye renovar cada año?", "Porque las personas y sus tiempos cambian, y así cada uno sigue, cambia o descansa con libertad", ["Para sacar a los que no sirven", "Para tener más reuniones", "No hace falta renovar"], "«como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
      ["m1-05", 1, "o1", "recordar", "¿Cómo debe servir el que tiene el don de servicio, según Romanos 12:7?", "En servir", ["En mandar", "En descansar", "En juzgar"], "«o si de servicio, en servir».", "Romanos 12:6-8"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué manera de empezar a organizar a los voluntarios es la mejor?", "Hacer el mapa de servicio, nombrar un coordinador e invitar en persona a los que faltan, empezando por lo urgente", ["Poner a todos en todo", "Dejar que los cinco de siempre sigan", "Un anuncio cada domingo"], "«Mas ahora Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso».", "1 Corintios 12:18-21"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hizo Jesús antes de enviar a los doce a predicar, según Marcos 3:14?", "Los estableció para que estuviesen con él", ["Les dio dinero", "Les construyó una casa", "Los envió solos"], "«Y estableció a doce, para que estuviesen con él».", "Marcos 3:14"],
      ["m1-08", 2, "o2", "comprender", "¿Para qué sirve un primer paso pequeño, como probar un mes?", "Para que la persona conozca el servicio sin un compromiso enorme, y vea si es su lugar", ["Para que se vaya rápido", "Para no capacitarla", "No sirve"], "«y todo aquel a quien su espíritu le dio voluntad».", "Éxodo 35:21"],
      ["m1-09", 2, "o2", "aplicar", "Una hermana dice que quiere servir, pero que solo tiene tiempo un domingo al mes. ¿Qué haces?", "La ubicas en un puesto que pide un domingo al mes, como la bienvenida", ["Le dices que así no sirve", "Le pides que sirva todos los domingos", "La pones a coordinar un ministerio"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué la descripción del puesto dice a quién rinde cuentas el voluntario?", "Para que sepa a quién preguntar y quién lo acompaña", ["Para que tenga miedo", "No hace falta", "Para que nadie lo ayude"], "«a quienes encarguemos de este trabajo».", "Hechos 6:2-4"],
      ["m1-11", 2, "o2", "comprender", "¿Qué requisitos puede tener un puesto de servicio?", "Ser parte de la iglesia, tomar una capacitación o, con los niños, la revisión de antecedentes", ["Tener dinero", "Ser pariente del pastor", "Ninguno nunca"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:2-4"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué invitación a servir es la mejor?", "Una personal, que reconoce el don, dice qué hará, cuánto tiempo y con quién, y propone una prueba", ["Un anuncio general", "Una orden sin explicación", "Un mensaje masivo sin nombre"], "«Y vino todo varón a quien su corazón estimuló».", "Éxodo 35:21"],
      ["m1-13", 3, "o3", "recordar", "¿En qué no se debe participar, según 1 Timoteo 5:22?", "En pecados ajenos", ["En la oración", "En la cena del Señor", "En la ofrenda"], "«ni participes en pecados ajenos. Consérvate puro».", "1 Timoteo 5:22"],
      ["m1-14", 3, "o3", "comprender", "¿Qué tiempo en la iglesia piden muchas iglesias antes de servir con niños?", "Unos meses, por ejemplo seis", ["Ninguno", "Diez años", "Un día"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:10"],
      ["m1-15", 3, "o3", "aplicar", "Un voluntario nuevo para el dinero no quiere dar referencias. ¿Qué haces?", "Le explicas que es parte de la selección para todos, y sin ella no sirve en ese puesto", ["Lo aceptas igual", "Lo acusas de algo", "Le das el puesto de tesorero"], "«Muchos hombres proclaman cada uno su propia bondad».", "Proverbios 20:6"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el nuevo puede servir primero en otra área mientras termina la selección?", "Porque así sirve con alegría mientras se completa la selección, sin poner en riesgo a los niños", ["Para castigarlo", "Para que se canse", "No debe servir en nada"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:10"],
      ["m1-17", 3, "o3", "recordar", "¿Cómo deben ser los que ejercen el diaconado, según 1 Timoteo 3:10?", "Irreprensibles", ["Ricos", "Jóvenes", "Famosos"], "«y entonces ejerzan el diaconado, si son irreprensibles».", "1 Timoteo 3:10"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué política para los voluntarios que manejan dinero es la mejor?", "Las referencias, la revisión de antecedentes y la regla de los dos para manejar la ofrenda", ["Que lo maneje el más antiguo solo", "Ninguna revisión", "Que cada uno lleve la ofrenda a su casa"], "«No impongas con ligereza las manos a ninguno».", "1 Timoteo 5:22"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué dijeron los setenta al volver, según Lucas 10:17?", "Señor, aun los demonios se nos sujetan en tu nombre", ["No pudimos hacer nada", "Queremos descansar", "Nadie nos escuchó"], "«diciendo: Señor, aun los demonios se nos sujetan en tu nombre».", "Lucas 10:17"],
      ["m2-02", 4, "o4", "comprender", "¿Qué hace el líder que acompaña a un grupo de voluntarios?", "Pregunta cómo está cada uno y no solo qué hizo", ["Solo da órdenes", "Desaparece después del primer día", "Cobra por acompañar"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
      ["m2-03", 4, "o4", "aplicar", "Un voluntario con experiencia quiere ayudar a formar a otros. ¿Qué le propones?", "Que enseñe a un nuevo, que primero lo vea, después lo haga con él y luego solo", ["Que no enseñe", "Que haga todo él", "Que le dé un manual y se vaya"], "«Después llamó a los doce, y comenzó a enviarlos de dos en dos».", "Marcos 6:7"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué se repasan cada año las políticas de protección con los voluntarios?", "Porque se olvidan detalles, y los niños y los voluntarios necesitan que se cumplan siempre", ["Porque cambian cada semana", "No hace falta", "Para alargar las reuniones"], "«Y considerémonos unos a otros».", "Hebreos 10:24"],
      ["m2-05", 4, "o4", "aplicar", "El grupo de avisos de los voluntarios tiene cien mensajes al día. ¿Qué cambias?", "Que se use solo para los avisos importantes, con los turnos y los cambios", ["Que se mande más", "Que se cierre sin avisar", "Que se usen cadenas"], "«para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué manera de acompañar a los voluntarios es la mejor?", "Un líder para cada grupo pequeño, avisos con tiempo y una conversación después de servir", ["Dejarlos solos", "Hablarles solo cuando fallan", "Mandarles muchos mensajes sin escucharlos"], "«Volvieron los setenta con gozo».", "Lucas 10:17"],
      ["m2-07", 5, "o5", "recordar", "¿Qué le dijo Jetro a Moisés sobre lo que hacía, según Éxodo 18:17?", "No está bien lo que haces", ["Muy bien hecho", "Sigue así", "Hazlo más rápido"], "«Entonces el suegro de Moisés le dijo: No está bien lo que haces».", "Éxodo 18:17-18"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué una persona no debería cargar con muchos ministerios a la vez?", "Porque se cansa, descuida su familia y su vida con Dios, y otros no tienen lugar para servir", ["Porque los ministerios son malos", "Sí debería", "Porque no hay suficientes"], "«porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:17-18"],
      ["m2-09", 5, "o5", "aplicar", "Tu equipo de alabanza ensaya tres veces por semana y varios están agotados. ¿Qué propones?", "Rotar los turnos, reducir los ensayos a lo necesario y preguntar a cada uno cómo está", ["Ensayar más", "Cambiar a todos", "No decir nada"], "«Desfallecerás del todo, tú, y también este pueblo que está contigo».", "Éxodo 18:17-18"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué Pablo nombraba en sus cartas a los que servían?", "Porque reconocer en público el servicio honra a los que sirven y anima a la iglesia", ["Para presumir", "Para llenar la carta", "Para pedirles dinero"], "«a los cuales no sólo yo doy gracias, sino también todas las iglesias de los gentiles».", "Romanos 16:1-4"],
      ["m2-11", 5, "o5", "comprender", "¿Qué hace la iglesia con el voluntario que necesita descansar?", "Le permite descansar sin culpa y lo recibe de vuelta cuando esté listo", ["Lo ve como poco comprometido", "Lo saca de la iglesia", "Le da más tareas"], "«Recibidle, pues, en el Señor, con todo gozo».", "Filipenses 2:29-30"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué manera de reconocer a los voluntarios es la mejor?", "Dar las gracias en persona, una nota escrita y una celebración al año de lo que Dios hizo", ["Solo un aplauso una vez", "Reconocer solo al que más hace", "No reconocer para que no se envanezcan"], "«tened en estima a los que son como él».", "Filipenses 2:29-30"],
      ["m2-13", 6, "o6", "recordar", "¿Por quién han sido establecidas las autoridades, según Romanos 13:1?", "Por Dios", ["Por el pueblo", "Por los ricos", "Por nadie"], "«y las que hay, por Dios han sido establecidas».", "Romanos 13:1"],
      ["m2-14", 6, "o6", "comprender", "¿Qué pasa si la iglesia le reembolsa a un voluntario más de 14 centavos por milla?", "Lo que pasa de esa cantidad puede pagar impuesto", ["Nada", "La iglesia pierde su exención", "El voluntario recibe un premio"], "«Recuérdales que se sujeten a los gobernantes y autoridades».", "Tito 3:1"],
      ["m2-15", 6, "o6", "aplicar", "Un voluntario dice que la ley del voluntario cubre todo lo que pase en el campamento. ¿Qué le explicas?", "Que no cubre el manejo de vehículos que piden licencia o seguro ni la responsabilidad de la iglesia", ["Que tiene razón", "Que no existe esa ley", "Que solo cubre a los pastores"], "«El avisado ve el mal y se esconde».", "Proverbios 22:3"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué a un voluntario al que se le empieza a pagar se consulta con un contador?", "Porque si se le paga por su servicio puede dejar de ser voluntario ante la ley", ["Porque los voluntarios no pueden recibir nada", "No hace falta", "Para pagarle menos"], "«que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1"],
      ["m2-17", 6, "o6", "comprender", "¿En cuánto tiempo deben reportar en Texas los profesionales la sospecha de abuso de un menor?", "A más tardar en 24 horas", ["En una semana", "Cuando tengan pruebas", "No deben reportar"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué manera de cuidar la parte legal de los voluntarios es la mejor?", "Conocer lo que protegen las leyes y lo que no, revisar el seguro y los choferes, pedir los permisos y reportar el abuso como pide la ley", ["Suponer que todo está cubierto", "No revisar nada", "Dejar la ley en manos de cada voluntario"], "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño».", "Proverbios 22:3"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "liderazgo-administracion-3-e1",
      tipo: "corta",
      pregunta: "Explica por qué cada creyente tiene un lugar para servir y cuál es el ciclo del voluntario, con un versículo.",
      ideas: [
        { id: "cuerpo", peso: 30, texto: "Dios colocó a cada miembro en el cuerpo y cada uno tiene un don.", formas: ["miembro*", "el cuerpo", "un don", "sus dones", "cada uno"] },
        { id: "invitar", peso: 30, texto: "Invitar en persona y ubicar según los dones, el gusto y el tiempo.", formas: ["en persona", "invit*", "ubic*", "su tiempo", "su gusto"] },
        { id: "acompanar", peso: 30, texto: "Preparar, acompañar, reconocer y renovar.", formas: ["prepar*", "capacit*", "acompan*", "reconoc*", "renov*"] },
      ],
      citas: ["1 Corintios 12:18", "1 Corintios 12:18-21", "1 Corintios 12:21", "1 Pedro 4:10", "Romanos 12:6", "Romanos 12:6-8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Porque Dios colocó a cada miembro en el cuerpo, y cada uno sirve con el don que recibió (1 Pedro 4:10). El ciclo empieza al invitar en persona y ubicar a cada uno según sus dones, su gusto y su tiempo. Después se le prepara, se le acompaña, se le reconoce y cada año se renueva su compromiso.",
    },
    {
      id: "liderazgo-administracion-3-e2",
      tipo: "corta",
      pregunta: "Explica cómo se selecciona a un voluntario que va a servir con niños, con un versículo.",
      ideas: [
        { id: "pasos", peso: 30, texto: "La solicitud, la entrevista y las referencias.", formas: ["solicitud", "entrevista*", "referencias"] },
        { id: "antecedentes", peso: 30, texto: "La revisión de antecedentes y la capacitación de protección.", formas: ["antecedentes", "capacitacion de proteccion", "proteccion"] },
        { id: "prueba", peso: 30, texto: "Un tiempo en la iglesia y una prueba junto a un líder.", formas: ["seis meses", "tiempo en la iglesia", "a prueba", "una prueba", "junto a un maestro", "con un lider"] },
      ],
      citas: ["1 Timoteo 3:10", "1 Timoteo 5:22", "Proverbios 20:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Se le da la solicitud, se le hace una entrevista y se llama a sus referencias. Se pide la revisión de antecedentes y la capacitación de protección. Debe tener un tiempo en la iglesia y servir primero a prueba, junto a un maestro con experiencia, porque Pablo pide que sean sometidos a prueba primero (1 Timoteo 3:10).",
    },
    {
      id: "liderazgo-administracion-3-e3",
      tipo: "corta",
      pregunta: "Explica cómo se cuida y se reconoce a los voluntarios, con un versículo.",
      ideas: [
        { id: "carga", peso: 30, texto: "Repartir la carga con turnos, poner límites y dejar descansar.", formas: ["turnos", "rotat*", "descans*", "limites", "repartir la carga"] },
        { id: "reconocer", peso: 30, texto: "Dar las gracias en persona y celebrar.", formas: ["las gracias", "reconoc*", "celebr*", "agradec*"] },
        { id: "renovar", peso: 30, texto: "Escuchar y renovar el compromiso cada año.", formas: ["renov*", "escuch*", "cada ano", "compromiso"] },
      ],
      citas: ["Éxodo 18:18", "Éxodo 18:17-18", "Romanos 16:4", "Romanos 16:1-4", "Filipenses 2:29", "Filipenses 2:29-30"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Se reparte la carga con turnos y límites, para que nadie desfallezca como le advirtió Jetro a Moisés (Éxodo 18:18), y se deja descansar al que lo necesita. Se le dan las gracias en persona y se celebra lo que Dios hizo. Y se le escucha y se renueva su compromiso cada año.",
    },
    {
      id: "liderazgo-administracion-3-e4",
      tipo: "breve",
      pregunta:
        "Tu iglesia necesita voluntarios para la bienvenida y para el ministerio de niños, pero los mismos cinco hermanos hacen todo y ya están cansados. Explica cómo organizarías a los voluntarios, con citas bíblicas.",
      ideas: [
        { id: "mapa", peso: 25, texto: "Un mapa de servicio con los puestos y un coordinador.", formas: ["mapa", "puestos", "coordinador"] },
        { id: "invitar", peso: 25, texto: "Invitar en persona, con la descripción del puesto y una prueba.", formas: ["en persona", "descripcion del puesto", "un mes", "invit*"] },
        { id: "seleccion", peso: 25, texto: "Para los niños, la solicitud, las referencias y la revisión de antecedentes.", formas: ["antecedentes", "referencias", "solicitud", "proteccion"] },
        { id: "cuidar", peso: 25, texto: "Repartir los turnos, dejar descansar a los cinco y reconocerlos.", formas: ["turnos", "descans*", "las gracias", "reconoc*", "repartir"] },
      ],
      basta: 85,
      citas: ["1 Corintios 12:18-21", "1 Corintios 12:21", "1 Pedro 4:10", "Éxodo 35:21", "1 Timoteo 3:10", "1 Timoteo 5:22", "Éxodo 18:18", "Éxodo 18:17-18", "Filipenses 2:29"],
      pesoCita: 10,
      errores: [
        { id: "e4-mismos", anula: "cuidar", texto: "Dejar que los mismos cinco sigan con todo.", formas: ["que sigan los mismos", "que los cinco sigan", "seguir igual"] },
      ],
      modelo:
        "Primero haría un mapa de servicio con el coordinador de voluntarios: los puestos de la bienvenida y del ministerio de niños, cuántas personas necesita cada uno y cuántas hay hoy, porque Dios colocó a cada miembro en el cuerpo como él quiso (1 Corintios 12:18). Con la descripción de cada puesto, invitaríamos en persona a hermanos con ese don, proponiéndoles probar un mes, como los de corazón dispuesto que vinieron a la obra del tabernáculo (Éxodo 35:21). Para los niños seguiríamos los pasos de la selección: la solicitud, la entrevista, las referencias, la revisión de antecedentes y la capacitación de protección, porque los que sirven deben ser sometidos a prueba primero (1 Timoteo 3:10). A los cinco hermanos les daríamos las gracias, repartiríamos los turnos para que descansen y les preguntaríamos cómo están, porque el trabajo es demasiado pesado para uno solo (Éxodo 18:18). Y en unos meses revisaríamos el mapa y celebraríamos lo que Dios hizo con el equipo.",
    },
    {
      id: "liderazgo-administracion-3-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia va a llevar a los jóvenes a un campamento en los carros de varios voluntarios, y uno de los voluntarios es maestro de escuela. Explica qué revisarías de las leyes y de la protección, con citas bíblicas.",
      ideas: [
        { id: "choferes", peso: 25, texto: "La licencia y el seguro de cada chofer, porque la ley del voluntario no cubre los vehículos.", formas: ["licencia", "seguro de cada", "vehiculo*", "choferes"] },
        { id: "ley", peso: 25, texto: "Lo que protege la ley del voluntario y la de Texas, y el seguro de la iglesia.", formas: ["proteccion del voluntario", "1997", "capitulo 84", "su propio seguro", "poliza"] },
        { id: "reporte", peso: 25, texto: "El reporte del abuso: de inmediato, y los profesionales en 24 horas.", formas: ["24 horas", "de inmediato", "252-5400", "report*"] },
        { id: "menores", peso: 25, texto: "Los permisos de los padres y la capacitación de protección.", formas: ["permiso* de los padres", "permisos", "capacitacion", "proteccion de menores"] },
      ],
      basta: 85,
      citas: ["Tito 3:1", "Romanos 13:1", "Proverbios 22:3", "Lucas 14:28"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero pediría la licencia vigente y el seguro de cada chofer, porque la Ley de Protección del Voluntario de 1997 no cubre el daño causado al manejar un vehículo que pide licencia o seguro, y el avisado ve el mal y se esconde (Proverbios 22:3). Revisaría con el agente que la póliza de responsabilidad de la iglesia cubra el campamento, porque esa ley protege al voluntario, pero no a la iglesia, y la ley de Texas del capítulo 84 tiene sus propias condiciones. Pediría los permisos de los padres de cada joven y confirmaría que los que van a cuidar a los menores tienen su selección y su capacitación de protección. Y le recordaría al equipo que en Texas toda persona que sospeche un abuso debe reportarlo de inmediato a la línea 1-800-252-5400, o al 911 si hay peligro, y que el maestro, como profesional, debe hacerlo a más tardar en 24 horas, porque nos sujetamos a las autoridades y estamos dispuestos a toda buena obra (Tito 3:1).",
    },
  ],
  breve: {
    id: "liderazgo-administracion-3-b1",
    tipo: "breve",
    pregunta: "Escribe cómo organizaría tu iglesia a sus voluntarios en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "cuerpo", peso: 15, texto: "El cuerpo que sirve y el mapa de servicio.", formas: ["el cuerpo", "mapa", "miembro*", "coordinador"] },
      { id: "invitar", peso: 15, texto: "Invitar en persona y ubicar con la descripción del puesto.", formas: ["en persona", "descripcion", "ubic*", "invit*"] },
      { id: "seleccion", peso: 20, texto: "Seleccionar con cuidado a los que sirven con niños y con el dinero.", formas: ["antecedentes", "referencias", "solicitud", "seleccion"] },
      { id: "capacitar", peso: 15, texto: "Capacitar y acompañar.", formas: ["capacit*", "orientacion", "acompan*"] },
      { id: "cuidar", peso: 20, texto: "Cuidar, reconocer y renovar.", formas: ["turnos", "descans*", "reconoc*", "las gracias", "renov*"] },
      { id: "ley", peso: 15, texto: "Cumplir las leyes que tocan a los voluntarios.", formas: ["ley", "licencia", "seguro", "24 horas", "permisos"] },
    ],
    basta: 85,
    citas: ["1 Pedro 4:10", "1 Corintios 12:18", "1 Corintios 12:18-21", "Romanos 12:6", "Éxodo 35:21", "Marcos 3:14", "Hechos 6:3", "1 Timoteo 3:10", "1 Timoteo 5:22", "Proverbios 20:6", "Marcos 6:7", "Lucas 10:17", "Hebreos 10:24", "Éxodo 18:18", "Romanos 16:4", "Filipenses 2:29", "Tito 3:1", "Romanos 13:1", "Proverbios 22:3"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaríamos con un mapa de servicio y un coordinador de voluntarios, porque Dios colocó a cada miembro en el cuerpo como él quiso (1 Corintios 12:18) y cada uno sirve con el don que recibió (1 Pedro 4:10). Invitaríamos en persona, con la descripción de cada puesto y una prueba de un mes, y ubicaríamos a cada uno según sus dones y su tiempo. Para los que sirven con niños, con el dinero o al volante, seguiríamos la selección completa: la solicitud, la entrevista, las referencias y la revisión de antecedentes, porque no se imponen las manos con ligereza (1 Timoteo 5:22). Cada voluntario recibiría una orientación y una capacitación práctica, y un líder lo acompañaría, como Jesús, que envió a los suyos de dos en dos (Marcos 6:7). Repartiríamos los turnos para que nadie desfallezca (Éxodo 18:18), daríamos las gracias y celebraríamos al final del año, y renovaríamos el compromiso de cada uno. Y cumpliríamos las leyes: la licencia y el seguro de los choferes, los permisos de los padres y el reporte del abuso de un menor, de inmediato, y los profesionales en 24 horas, porque nos sujetamos a las autoridades (Tito 3:1).",
  },
};
