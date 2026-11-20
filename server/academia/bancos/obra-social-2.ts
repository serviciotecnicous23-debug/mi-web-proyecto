/**
 * El banco de «Diaconía y servicio» (especialidad Obra social y misericordia, materia 2). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la diaconía como servicio · o2 el carácter y el orden de los que sirven · o3 el fondo de ayuda · o4 el
 * cuidado práctico · o5 escuchar y orientar · o6 el corazón del que sirve · o7 el versículo de memoria (Santiago 1:27).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `obra-social-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_OBRA_SOCIAL_2: BancoMateria = {
  materia: "obra-social-2",
  repaso: {
    "obra-social-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Para qué vino el Hijo del Hombre, según Marcos 10:45?", "Para servir y para dar su vida en rescate por muchos", ["Para ser servido", "Para reinar en Roma", "Para juzgar a los pobres"], "«no vino para ser servido, sino para servir».", "Marcos 10:45"],
      ["1-r2", 1, "o1", "comprender", "¿Qué significa la palabra griega diakonía?", "Servicio", ["Gobierno", "Riqueza", "Silencio"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:14-15"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano quiere servir, pero dice que no tiene talentos para estar al frente. ¿Qué le propones?", "Que pruebe una tarea práctica según lo que sabe hacer, como manejar o cocinar, junto a alguien con experiencia", ["Que espere a tener un título", "Que solo asista al culto", "Que sirva solo si lo ponen al frente"], "«si alguno ministra, ministre conforme al poder que Dios da».", "1 Pedro 4:11"],
    ] as P[]).map(p),
    "obra-social-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo debían ser los siete que escogió la iglesia de Jerusalén, según Hechos 6:3?", "De buen testimonio, llenos del Espíritu Santo y de sabiduría", ["Ricos y famosos", "Jóvenes y fuertes", "Familiares de los apóstoles"], "«siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:2-3"],
      ["2-r2", 2, "o2", "comprender", "¿Qué pide 1 Timoteo 3:10 antes de que alguien sirva?", "Que sea sometido a prueba primero", ["Que pague una cuota", "Que sea mayor de sesenta años", "Nada"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:8-10"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia quiere formar su primer equipo de misericordia. ¿Qué haces primero?", "Buscar hermanos de buen testimonio, conocerlos y probarlos con tareas pequeñas, y repartir funciones claras", ["Aceptar al primero que se ofrezca", "Que una sola persona lo haga todo", "Esperar a que haya una crisis"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:2-3"],
    ] as P[]).map(p),
    "obra-social-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Quiénes deben ayudar primero a una viuda que tiene hijos o nietos, según 1 Timoteo 5:4?", "Sus hijos o sus nietos, siendo piadosos con su propia familia", ["Solo el gobierno", "Los vecinos", "Nadie"], "«aprendan éstos primero a ser piadosos para con su propia familia».", "1 Timoteo 5:4"],
      ["3-r2", 3, "o3", "comprender", "¿A quién se refiere la regla de 2 Tesalonicenses 3:10?", "Al que no quiere trabajar, no al que no puede", ["A todos los pobres", "A los enfermos", "A los ancianos"], "«Si alguno no quiere trabajar, tampoco coma».", "2 Tesalonicenses 3:10"],
      ["3-r3", 3, "o3", "aplicar", "Un hombre pide efectivo para la renta y dice que lo desalojan el viernes. ¿Qué haces, según las reglas de un buen fondo de ayuda?", "Lo escuchas con otra persona del equipo, revisas su caso y, si se aprueba, pagas directamente al dueño y guardas el recibo", ["Le das el efectivo enseguida", "Lo despides sin escucharlo", "Le prestas tu tarjeta"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ] as P[]).map(p),
    "obra-social-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pide Romanos 12:13 practicar?", "La hospitalidad", ["El ayuno", "La venganza", "El silencio"], "«compartiendo para las necesidades de los santos; practicando la hospitalidad».", "Romanos 12:13"],
      ["4-r2", 4, "o4", "comprender", "¿Qué enseña Proverbios 3:28 sobre ayudar al prójimo?", "Que no se le dice que vuelva mañana cuando hoy se le puede ayudar", ["Que siempre hay que esperar", "Que solo se ayuda a los amigos", "Que no hay que ayudar"], "«No digas a tu prójimo: Anda, y vuelve, Y mañana te daré».", "Proverbios 3:27-28"],
      ["4-r3", 4, "o4", "aplicar", "Una hermana que vive sola sale del hospital y no puede manejar ni cocinar por un mes. ¿Qué organizas?", "Un calendario de comidas, transporte a sus citas y visitas con aviso, según lo que ella necesite", ["Una sola visita de cortesía", "Nada, porque tiene vecinos", "Que se arregle sola"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27-28"],
    ] as P[]).map(p),
    "obra-social-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le es al que responde palabra antes de oír, según Proverbios 18:13?", "Fatuidad y oprobio", ["Sabiduría", "Honra", "Riqueza"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
      ["5-r2", 5, "o5", "comprender", "¿Qué es el 2-1-1 de Texas?", "Una línea gratuita y anónima de la Comisión de Salud y Servicios Humanos de Texas, que orienta hacia ayudas sociales a toda hora", ["La línea de la policía", "Un banco", "Una iglesia"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["5-r3", 5, "o5", "aplicar", "Una madre llega llorando porque le cortaron la luz y tiene un bebé. ¿Qué haces?", "La escuchas con calma, ves si el fondo puede pagar parte de la cuenta directamente y la orientas a las ayudas de la comunidad", ["Le das todo el dinero del fondo", "Le dices que vuelva el mes que viene", "La mandas a una oficina sin escucharla"], "«que alentéis a los de poco ánimo, que sostengáis a los débiles».", "1 Tesalonicenses 5:14"],
    ] as P[]).map(p),
    "obra-social-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pide Gálatas 6:9 a los que hacen el bien?", "Que no se cansen, porque a su tiempo segarán", ["Que se detengan pronto", "Que esperen aplausos", "Que trabajen solos"], "«No nos cansemos, pues, de hacer bien».", "Gálatas 6:9"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña Mateo 6:3-4 sobre la limosna?", "Que se da en secreto, sin buscar fama", ["Que se publica para animar a otros", "Que se da solo a los conocidos", "Que no hace falta darla"], "«no sepa tu izquierda lo que hace tu derecha».", "Mateo 6:3-4"],
      ["6-r3", 6, "o6", "aplicar", "En tu iglesia, la coordinadora de la misericordia lleva años sin descanso y ya no quiere contestar el teléfono. ¿Qué propones?", "Que descanse unas semanas, repartir la carga en turnos, ponerle límites y acompañarla", ["Que siga igual porque es su llamado", "Regañarla por su actitud", "Cerrar el ministerio"], "«porque a su tiempo segaremos, si no desmayamos».", "Gálatas 6:9"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La diaconía: servir como Cristo
    ["f01", 1, "o1", "recordar", "¿Qué dijo Jesús después de lavar los pies de sus discípulos, según Juan 13:15?", "Que les había dado ejemplo para que hicieran lo mismo", ["Que ya no hacía falta servir", "Que solo los sirvientes lavan los pies", "Que no lo contaran a nadie"], "«Porque ejemplo os he dado».", "Juan 13:14-15"],
    ["f02", 1, "o1", "recordar", "¿Conforme a qué debe ministrar el que ministra, según 1 Pedro 4:11?", "Conforme al poder que Dios da", ["Conforme a sus ganas", "Conforme a lo que le paguen", "Conforme a su fama"], "«ministre conforme al poder que Dios da».", "1 Pedro 4:11"],
    ["f03", 1, "o1", "comprender", "¿Qué muestra que en Hechos 6 se hable de servir a las mesas y del ministerio de la palabra?", "Que en la iglesia hay servicio práctico y servicio de la Palabra, y los dos son ministerio", ["Que servir las mesas no importa", "Que solo la predicación es servicio", "Que no hace falta ningún orden"], "«No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas».", "Hechos 6:2-3"],
    ["f04", 1, "o1", "comprender", "¿Qué enseña Romanos 12:7-8 sobre los dones de servicio y de misericordia?", "Que quien tiene esos dones los usa sirviendo y haciendo misericordia con alegría", ["Que solo los pastores los tienen", "Que ya no existen", "Que se usan para ganar fama"], "«el que hace misericordia, con alegría».", "Romanos 12:8"],
    ["f05", 1, "o1", "comprender", "¿Por qué toda la iglesia sirve, según 1 Pedro 4:10?", "Porque cada uno recibió un don para ministrarlo a los otros", ["Porque todos son pastores", "Porque así lo manda la ley", "No es cierto"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f06", 1, "o1", "analizar", "¿Por qué servir aunque nadie lo note se parece a Cristo?", "Porque Jesús, siendo el Señor, lavó los pies de sus discípulos y vino a servir", ["Porque Jesús se escondía", "Porque servir es vergonzoso", "No se parece"], "«Pues si yo, el Señor y el Maestro, he lavado vuestros pies».", "Juan 13:14-15"],
    ["f07", 1, "o1", "aplicar", "Un hermano solo quiere servir si lo ponen al frente en el culto. ¿Qué le dices?", "Que Jesús vino a servir y no a ser servido, y lo invitas a probar un servicio sencillo", ["Que tiene razón", "Que deje de venir", "Que espere su turno para predicar"], "«no vino para ser servido, sino para servir».", "Marcos 10:45"],
    ["f08", 1, "o1", "aplicar", "Tienes que encontrar servidores para llevar a los ancianos al médico. ¿Qué haces?", "Preguntar quién sabe y puede manejar, invitarlo en persona y explicarle bien la tarea", ["Esperar a que alguien se ofrezca solo", "Obligar a los jóvenes", "Pagar siempre un taxi sin preguntar"], "«si alguno ministra, ministre conforme al poder que Dios da».", "1 Pedro 4:11"],
    ["f09", 1, "o1", "evaluar", "¿Qué manera de servir en la misericordia se parece más a la de Jesús?", "Servir con humildad y con el poder que Dios da, aunque nadie lo note, para que él sea glorificado", ["Servir para que me reconozcan", "Servir solo cuando conviene", "Servir con mis fuerzas hasta agotarme"], "«para que en todo sea Dios glorificado por Jesucristo».", "1 Pedro 4:11"],
    ["f10", 1, "o7", "recordar", "Completa Santiago 1:27: La religión pura y sin mácula delante de Dios el Padre es esta: Visitar a los huérfanos y a las viudas en sus tribulaciones…", "y guardarse sin mancha del mundo", ["y dar mucho dinero al templo", "y cantar en el coro", "y no salir de casa"], "«Visitar a los huérfanos y a las viudas en sus tribulaciones, y guardarse sin mancha del mundo».", "Santiago 1:27"],
    // Lección 2 · Los que sirven: carácter y orden
    ["f11", 2, "o2", "recordar", "¿Qué no debían ser los diáconos, según 1 Timoteo 3:8?", "Codiciosos de ganancias deshonestas", ["Trabajadores", "Casados", "Alegres"], "«no codiciosos de ganancias deshonestas».", "1 Timoteo 3:8-10"],
    ["f12", 2, "o2", "recordar", "¿Dónde servía Febe, según Romanos 16:1?", "En la iglesia en Cencrea", ["En la iglesia en Roma", "En Jerusalén", "En Éfeso"], "«diaconisa de la iglesia en Cencrea».", "Romanos 16:1-2"],
    ["f13", 2, "o2", "recordar", "¿Qué dijeron los apóstoles que no era justo, según Hechos 6:2?", "Que dejaran la palabra de Dios para servir a las mesas", ["Que las viudas comieran", "Que la iglesia creciera", "Que hubiera griegos en la iglesia"], "«No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas».", "Hechos 6:2-3"],
    ["f14", 2, "o2", "comprender", "¿Qué significa que los que sirven sean sin doblez?", "Que dicen lo mismo a todos y no tienen dos caras", ["Que no se doblan al trabajar", "Que no se cansan", "Que nunca se equivocan"], "«Los diáconos asimismo deben ser honestos, sin doblez».", "1 Timoteo 3:8-10"],
    ["f15", 2, "o2", "comprender", "¿Qué queda para la declaración de fe del ministerio en esta materia?", "Quién ejerce cada cargo en la iglesia y el ministerio de la mujer", ["Si hay que ayudar a los pobres", "Si hay que tener buen carácter", "Si existe la misericordia"], "«Os recomiendo además nuestra hermana Febe».", "Romanos 16:1-2"],
    ["f16", 2, "o2", "analizar", "¿Por qué conviene que dos personas decidan y registren cada ayuda?", "Porque protege a los que reciben, a los que sirven y el buen nombre de la iglesia", ["Porque así se tarda más", "Porque nadie es honesto", "No conviene"], "«si son irreprensibles».", "1 Timoteo 3:8-10"],
    ["f17", 2, "o2", "aplicar", "Un hermano que llegó hace dos semanas quiere manejar el fondo de ayuda. ¿Qué haces?", "Le agradeces y lo invitas a servir primero en otra tarea, para conocerlo y probarlo", ["Le das el fondo enseguida", "Lo rechazas para siempre", "Le das la chequera sin registro"], "«Y éstos también sean sometidos a prueba primero».", "1 Timoteo 3:8-10"],
    ["f18", 2, "o2", "aplicar", "En tu equipo de misericordia nadie sabe quién recibe los pedidos ni quién lleva las cuentas. ¿Qué propones?", "Repartir las funciones por escrito: coordinación, recepción, visitas, tesorería y recursos", ["Que cada uno haga lo que quiera", "Que el pastor lo haga todo", "Cerrar el equipo"], "«a quienes encarguemos de este trabajo».", "Hechos 6:2-3"],
    ["f19", 2, "o2", "aplicar", "Tienes que presentar el nuevo equipo de misericordia a la iglesia. ¿Qué haces, como en Hechos 6?", "Lo presentas ante la iglesia y oran por él", ["No lo presentas para no presumir", "Lo anuncias solo en las redes", "Esperas un año"], "«quienes, orando, les impusieron las manos».", "Hechos 6:6"],
    ["f20", 2, "o2", "evaluar", "¿Qué equipo de misericordia está mejor formado?", "Uno de personas probadas y de buen testimonio, con funciones claras y reglas escritas", ["Uno de voluntarios a los que nadie conoce", "Uno donde una persona lo hace todo", "Uno sin reglas para ser más rápido"], "«llenos del Espíritu Santo y de sabiduría».", "Hechos 6:2-3"],
    // Lección 3 · El fondo de ayuda
    ["f21", 3, "o3", "recordar", "¿Qué ha hecho el que no provee para los suyos, según 1 Timoteo 5:8?", "Ha negado la fe, y es peor que un incrédulo", ["Ha hecho bien", "Ha ahorrado", "Nada malo"], "«ha negado la fe, y es peor que un incrédulo».", "1 Timoteo 5:8"],
    ["f22", 3, "o3", "recordar", "¿A quién presta el que da al pobre, según Proverbios 19:17?", "A Jehová", ["Al banco", "Al rey", "A nadie"], "«A Jehová presta el que da al pobre».", "Proverbios 19:17"],
    ["f23", 3, "o3", "recordar", "¿Cómo procuraba Pablo hacer las cosas con la ofrenda, según 2 Corintios 8:21?", "Honradamente, delante del Señor y delante de los hombres", ["En secreto, sin registros", "Rápido, sin cuentas", "Solo delante del Señor"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f24", 3, "o3", "comprender", "¿Por qué el fondo paga directamente al dueño de la vivienda o a la compañía de la luz?", "Para que la ayuda llegue a lo que se necesita y quede el recibo", ["Para tardar más", "Porque el pobre no sabe pagar", "Para cobrar intereses"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f25", 3, "o3", "comprender", "¿Qué dice la Publicación 526 del IRS sobre lo que se da señalado para una persona en particular?", "Que no se deduce, aunque se entregue por medio de una organización calificada", ["Que se deduce el doble", "Que es obligatorio darlo", "Que el IRS lo prohíbe"], "«A Jehová presta el que da al pobre».", "Proverbios 19:17"],
    ["f26", 3, "o3", "analizar", "¿Por qué un fondo sin límite por familia se acaba pronto y se vuelve injusto?", "Porque recibe más el que insiste más y no queda para otros que lo necesitan", ["Porque los pobres gastan mucho", "No se vuelve injusto", "Porque el banco cobra"], "«y se repartía a cada uno según su necesidad».", "Hechos 4:34-35"],
    ["f27", 3, "o3", "aplicar", "Una familia pide ayuda del fondo cada mes desde hace un año. ¿Qué haces?", "Revisas su caso con el equipo, la orientas a otras ayudas y buscas con ella un camino para salir adelante", ["Le das más cada mes", "La rechazas sin hablar", "Le prestas con interés"], "«que sostengáis a los débiles, que seáis pacientes para con todos».", "1 Tesalonicenses 5:14"],
    ["f28", 3, "o3", "aplicar", "Un hermano quiere dar 500 dólares al fondo para una familia que él escoge, y deducirlos de sus impuestos. ¿Qué le explicas?", "Que el IRS no permite deducir lo señalado para una persona en particular; puede dar al fondo, que la iglesia administra según sus reglas", ["Que sí se deduce", "Que la iglesia lo esconda", "Que lo dé en efectivo sin recibo"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f29", 3, "o3", "aplicar", "Tienes que escribir las reglas del fondo de ayuda. ¿Qué incluyes?", "El propósito, los criterios, un límite por familia, quién decide, el pago directo, el registro y la confidencialidad", ["Solo el monto total", "Que decida el pastor solo", "Nada por escrito"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f30", 3, "o3", "evaluar", "¿Qué manera de ayudar con dinero sigue mejor los principios de la Biblia?", "Que la familia ayude primero, que el fondo tenga reglas y decida en equipo, y que todo quede registrado", ["Que el pastor decida solo y en efectivo", "Que se ayude al que más insiste", "Que nunca se ayude con dinero"], "«aprendan éstos primero a ser piadosos para con su propia familia».", "1 Timoteo 5:4"],
    // Lección 4 · El cuidado práctico
    ["f31", 4, "o4", "recordar", "¿Qué no se le dice al prójimo cuando uno tiene qué darle, según Proverbios 3:28?", "Anda, y vuelve, y mañana te daré", ["Ven y come", "Toma lo que necesites", "Te acompaño"], "«No digas a tu prójimo: Anda, y vuelve, Y mañana te daré».", "Proverbios 3:27-28"],
    ["f32", 4, "o4", "recordar", "¿Qué mostraban las viudas a Pedro, según Hechos 9:39?", "Las túnicas y los vestidos que Dorcas hacía", ["Las monedas de Dorcas", "Las cartas de Pablo", "Los panes del templo"], "«mostrando las túnicas y los vestidos que Dorcas hacía cuando estaba con ellas».", "Hechos 9:39"],
    ["f33", 4, "o4", "recordar", "¿Para qué pide Romanos 12:13 compartir?", "Para las necesidades de los santos", ["Para los lujos", "Para las fiestas", "Para los viajes"], "«compartiendo para las necesidades de los santos».", "Romanos 12:13"],
    ["f34", 4, "o4", "comprender", "¿Por qué muchas veces la necesidad no es dinero, sino manos?", "Porque hay personas que necesitan comida, transporte, arreglos o compañía más que efectivo", ["Porque nadie necesita dinero", "Porque el dinero es malo", "No es así"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27-28"],
    ["f35", 4, "o4", "comprender", "¿Qué es darle un respiro a quien cuida a un enfermo?", "Acompañar al enfermo un rato para que el que lo cuida pueda descansar", ["Dejar solo al enfermo", "Darle consejos al que cuida", "Llevar siempre al enfermo al hospital"], "«compartiendo para las necesidades de los santos».", "Romanos 12:13"],
    ["f36", 4, "o4", "analizar", "¿Por qué se llama a un profesional para la electricidad, el gas o los techos?", "Porque un arreglo mal hecho puede poner en peligro a la familia", ["Porque los hermanos no deben ayudar", "Porque así cuesta más", "No hace falta"], "«No te niegues a hacer el bien a quien es debido, Cuando tuvieres poder para hacerlo».", "Proverbios 3:27-28"],
    ["f37", 4, "o4", "aplicar", "Una familia de la iglesia acaba de tener un bebé y la madre está delicada. ¿Qué organizas?", "Un calendario de comidas por unas semanas, con aviso y según lo que ellos prefieran", ["Una visita de todos el mismo día", "Nada, porque ya pasará", "Una colecta sin preguntarles"], "«compartiendo para las necesidades de los santos; practicando la hospitalidad».", "Romanos 12:13"],
    ["f38", 4, "o4", "aplicar", "Un grupo quiere donar ropa usada a las familias del barrio. ¿Qué cuidas?", "Que la ropa esté limpia y en buen estado, y que se entregue con orden y con dignidad", ["Que se dé todo lo que sobre, aunque esté roto", "Que se deje en una caja en la puerta", "Que se venda cara"], "«mostrando las túnicas y los vestidos que Dorcas hacía».", "Hechos 9:39"],
    ["f39", 4, "o4", "aplicar", "Tienes que organizar el transporte de los ancianos al médico. ¿Qué revisas de los choferes?", "Que tengan licencia y seguro, y que lleguen a tiempo y con paciencia", ["Nada, cualquiera puede manejar", "Solo que tengan un carro grande", "Que cobren el viaje"], "«No te niegues a hacer el bien».", "Proverbios 3:27-28"],
    ["f40", 4, "o4", "evaluar", "¿Qué ayuda práctica a una viuda anciana está mejor organizada?", "Preguntarle qué necesita, organizar visitas con aviso, comidas y arreglos con quien sabe, y respetar su casa", ["Ir todos sin avisar", "Arreglarle todo aunque no sepan", "Hacer una sola visita para la foto"], "«Visitar a los huérfanos y a las viudas en sus tribulaciones».", "Santiago 1:27"],
    // Lección 5 · Escuchar y orientar
    ["f41", 5, "o5", "recordar", "¿Qué hace el avisado, según Proverbios 14:15?", "Mira bien sus pasos", ["Todo lo cree", "Nunca ayuda", "Corre sin pensar"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f42", 5, "o5", "recordar", "¿Qué pide Pablo hacer con los de poco ánimo, según 1 Tesalonicenses 5:14?", "Alentarlos", ["Ignorarlos", "Reprenderlos", "Apartarlos"], "«que alentéis a los de poco ánimo».", "1 Tesalonicenses 5:14"],
    ["f43", 5, "o5", "recordar", "¿Con quiénes pide Pablo ser pacientes, según 1 Tesalonicenses 5:14?", "Con todos", ["Solo con los amigos", "Solo con los ancianos", "Con nadie"], "«que seáis pacientes para con todos».", "1 Tesalonicenses 5:14"],
    ["f44", 5, "o5", "comprender", "¿Por qué la primera entrevista se hace con dos personas del equipo?", "Para escuchar mejor, cuidar a todos y decidir con más prudencia", ["Para intimidar a la persona", "Porque una sola no sabe hablar", "No hace falta"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f45", 5, "o5", "comprender", "¿Cuándo no se guarda la confidencialidad de lo que cuenta una persona?", "Cuando la ley manda reportar algo, como la sospecha de abuso de un menor", ["Nunca se guarda", "Cuando al equipo le parece interesante", "Cuando la persona no viene a la iglesia"], "«que sostengáis a los débiles».", "1 Tesalonicenses 5:14"],
    ["f46", 5, "o5", "analizar", "¿En qué se diferencia la prudencia de la desconfianza al ayudar?", "La prudencia escucha, confirma y ayuda con orden; la desconfianza sospecha de todos y no ayuda", ["No hay diferencia", "La desconfianza ayuda más", "La prudencia lo cree todo"], "«El simple todo lo cree; Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f47", 5, "o5", "aplicar", "En una entrevista, una persona cuenta que su vecino maltrata a su hijo pequeño. ¿Qué haces?", "Lo reportas de inmediato a la línea de Texas, 1-800-252-5400, o al 911 si hay peligro, y avisas al pastor", ["Lo guardas en secreto", "Esperas a tener pruebas", "Hablas con el vecino para arreglarlo"], "«que sostengáis a los débiles».", "1 Tesalonicenses 5:14"],
    ["f48", 5, "o5", "aplicar", "Tienes que orientar a una familia que necesita comida y no conoce las ayudas de la ciudad. ¿Qué haces?", "Le das lo urgente y la conectas con el banco de alimentos o con el 2-1-1, que la orienta a los programas", ["Le dices que busque sola en internet", "Le das efectivo y nada más", "La mandas a otra iglesia sin ayudarla"], "«que alentéis a los de poco ánimo».", "1 Tesalonicenses 5:14"],
    ["f49", 5, "o5", "aplicar", "Un hombre llega cada semana con una historia distinta para pedir efectivo. ¿Qué haces?", "Lo escuchas con respeto, ofreces una ayuda pagada directamente a lo que necesita y revisas su caso con el equipo", ["Le das efectivo cada vez", "Lo humillas delante de todos", "Le prohíbes entrar al templo"], "«El simple todo lo cree».", "Proverbios 14:15"],
    ["f50", 5, "o5", "evaluar", "¿Qué primera entrevista está mejor hecha?", "Recibir con respeto, escuchar sin juzgar, preguntar lo necesario, explicar lo que se puede hacer y orientar a otros recursos", ["Dar enseguida lo que pida", "Hacer muchas preguntas para humillar", "Prometer todo para calmarla"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
    // Lección 6 · El corazón del que sirve
    ["f51", 6, "o6", "recordar", "¿Cómo se debe estimar a los demás, según Filipenses 2:3?", "Como superiores a uno mismo", ["Como inferiores", "Como competidores", "Como extraños"], "«estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
    ["f52", 6, "o6", "recordar", "¿Cómo debe ser la limosna, según Mateo 6:4?", "En secreto", ["En público", "Con trompeta", "Anunciada en el culto"], "«para que sea tu limosna en secreto».", "Mateo 6:3-4"],
    ["f53", 6, "o6", "recordar", "¿Qué hacía Jesús en los lugares desiertos, según Lucas 5:16?", "Oraba", ["Dormía", "Comía", "Predicaba a multitudes"], "«Mas él se apartaba a lugares desiertos, y oraba».", "Lucas 5:16"],
    ["f54", 6, "o6", "comprender", "¿Qué pide Filipenses 2:4 mirar?", "No solo lo propio, sino también lo de los otros", ["Solo lo propio", "Solo lo del pastor", "Nada"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:3-4"],
    ["f55", 6, "o6", "comprender", "¿Cuáles son señales de cansancio en el servicio?", "Irritación, tristeza, dejar de orar y no querer ver a nadie", ["Alegría y descanso", "Más ganas de orar", "Ninguna, el siervo no se cansa"], "«No nos cansemos, pues, de hacer bien».", "Gálatas 6:9"],
    ["f56", 6, "o6", "analizar", "¿Por qué no se publica la foto de una familia ayudada sin su permiso?", "Porque se cuida su dignidad y la ayuda no se hace para ganar fama", ["Porque las fotos están prohibidas", "Porque la familia no importa", "Sí se publica"], "«no sepa tu izquierda lo que hace tu derecha».", "Mateo 6:3-4"],
    ["f57", 6, "o6", "aplicar", "Un hermano del equipo quiere subir a las redes las fotos de las familias que reciben la despensa. ¿Qué le respondes?", "Que no se publican sin su permiso, para cuidar su dignidad y no buscar aplauso", ["Que suba todas", "Que las suba con sus nombres", "Que las mande al periódico"], "«para que sea tu limosna en secreto».", "Mateo 6:3-4"],
    ["f58", 6, "o6", "aplicar", "Tienes que organizar el equipo para que nadie se agote. ¿Qué haces?", "Haces turnos, das un día libre, oran juntos y alguien pregunta cómo están", ["Que el más fuerte lo haga todo", "Que nadie descanse", "Que cada uno se arregle solo"], "«porque a su tiempo segaremos, si no desmayamos».", "Gálatas 6:9"],
    ["f59", 6, "o6", "aplicar", "Una servidora del equipo dice que está muy triste y que ya no le encuentra sentido a la vida. ¿Qué haces?", "La escuchas, no la dejas sola y buscan ayuda enseguida: la línea 988, o el 911 si hay peligro", ["Le dices que ore más y te vas", "Le pides que siga sirviendo", "Lo comentas con todos"], "«que alentéis a los de poco ánimo».", "1 Tesalonicenses 5:14"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan permite servir con alegría por más tiempo?", "Servir con motivos limpios, cuidar la dignidad del otro, poner límites, descansar, orar y pedir ayuda", ["Servir sin descanso hasta agotarse", "Servir para el aplauso", "Servir solo cuando haya ganas"], "«el que hace misericordia, con alegría».", "Romanos 12:8"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué deben hacer los discípulos unos a otros, según Juan 13:14?", "Lavarse los pies", ["Juzgarse", "Pagarse", "Ignorarse"], "«vosotros también debéis lavaros los pies los unos a los otros».", "Juan 13:14-15"],
      ["m1-02", 1, "o1", "comprender", "¿Qué quiere decir que el servicio se haga para que Dios sea glorificado?", "Que no se sirve para la propia fama, sino para que Dios reciba la honra", ["Que se sirve para salir en las fotos", "Que solo sirven los pastores", "Que el servicio no importa"], "«para que en todo sea Dios glorificado por Jesucristo».", "1 Pedro 4:11"],
      ["m1-03", 1, "o1", "aplicar", "Alguien te dice que servir en la cocina de la iglesia no es un ministerio de verdad. ¿Qué le respondes?", "Que servir a las mesas también es diaconía, como en Hechos 6, y se hace para el Señor", ["Que tiene razón", "Que solo predicar es ministerio", "Que lo deje para otros"], "«para servir a las mesas».", "Hechos 6:2-3"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué Jesús lavó los pies de sus discípulos, si era el Señor?", "Para darles ejemplo de que el mayor sirve a los demás", ["Porque nadie más quería", "Por costumbre de los ricos", "Porque se lo pidieron"], "«Pues si yo, el Señor y el Maestro, he lavado vuestros pies».", "Juan 13:14-15"],
      ["m1-05", 1, "o1", "recordar", "¿Qué dio el Hijo del Hombre en rescate por muchos, según Marcos 10:45?", "Su vida", ["Su oro", "Su reino", "Su casa"], "«y para dar su vida en rescate por muchos».", "Marcos 10:45"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud de servicio es la mejor en un ministerio de misericordia?", "Servir con humildad y con alegría, en lo que haga falta, para la gloria de Dios", ["Servir solo en lo que se ve", "Servir para que me deban favores", "Servir solo cuando hay tiempo libre"], "«para que en todo sea Dios glorificado».", "1 Pedro 4:11"],
      ["m1-07", 2, "o2", "recordar", "¿Cómo debían ser las mujeres que menciona 1 Timoteo 3:11?", "Honestas, no calumniadoras, sobrias y fieles en todo", ["Ricas y famosas", "Jóvenes y fuertes", "Calladas y tristes"], "«Las mujeres asimismo sean honestas, no calumniadoras, sino sobrias, fieles en todo».", "1 Timoteo 3:11"],
      ["m1-08", 2, "o2", "comprender", "¿Qué se hizo con los siete escogidos, según Hechos 6:6?", "Los presentaron a los apóstoles, que oraron y les impusieron las manos", ["Los mandaron a otra ciudad", "Les pagaron un sueldo", "Los pusieron a predicar en Roma"], "«quienes, orando, les impusieron las manos».", "Hechos 6:6"],
      ["m1-09", 2, "o2", "aplicar", "Un voluntario nuevo quiere visitar solo a una familia que pidió ayuda. ¿Qué le dices?", "Que las visitas se hacen siempre en pareja, por el cuidado de todos", ["Que vaya solo", "Que no visite nunca", "Que lleve a sus hijos"], "«si son irreprensibles».", "1 Timoteo 3:8-10"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué Pablo pidió a la iglesia de Roma que ayudara a Febe?", "Porque ella había ayudado a muchos y servía en la iglesia", ["Porque era rica", "Porque era apóstol", "Porque se lo pidió el emperador"], "«porque ella ha ayudado a muchos, y a mí mismo».", "Romanos 16:1-2"],
      ["m1-11", 2, "o2", "comprender", "¿Qué cuida la tesorería en un equipo de misericordia?", "Que cada ayuda se pague y se registre, con dos firmas y con el pago directo", ["Que nadie sepa cuánto se gasta", "Que el dinero se guarde en una casa", "Que se pague siempre en efectivo"], "«no codiciosos de ganancias deshonestas».", "1 Timoteo 3:8-10"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué persona está mejor preparada para servir en la misericordia?", "Una de buen testimonio, probada en tareas pequeñas, honesta y sin doblez", ["La que llegó ayer con muchas ganas", "La que tiene más dinero", "La que habla más fuerte"], "«siete varones de buen testimonio».", "Hechos 6:2-3"],
      ["m1-13", 3, "o3", "recordar", "¿Qué hará Jehová con el bien que hizo el que da al pobre, según Proverbios 19:17?", "Se lo volverá a pagar", ["Lo olvidará", "Lo castigará", "Nada"], "«Y el bien que ha hecho, se lo volverá a pagar».", "Proverbios 19:17"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué la familia es la primera red de ayuda?", "Porque la Biblia pide que los hijos y los nietos sean piadosos con su propia familia", ["Porque la iglesia no debe ayudar", "Porque el gobierno lo manda", "Porque la familia siempre tiene dinero"], "«aprendan éstos primero a ser piadosos para con su propia familia».", "1 Timoteo 5:4"],
      ["m1-15", 3, "o3", "aplicar", "Tu iglesia da efectivo a cualquiera que lo pide en la puerta. ¿Qué propones?", "Escribir las reglas del fondo y pagar las ayudas directamente a quien se le debe, con registro", ["Dar más efectivo", "No ayudar nunca", "Esconder el dinero"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué la regla de 2 Tesalonicenses 3:10 no sirve para negarle ayuda a un enfermo?", "Porque habla del que no quiere trabajar, no del que no puede", ["Porque los enfermos no comen", "Sí sirve para eso", "Porque Pablo no la escribió"], "«Si alguno no quiere trabajar, tampoco coma».", "2 Tesalonicenses 3:10"],
      ["m1-17", 3, "o3", "recordar", "¿Qué deben aprender los hijos con sus padres, según 1 Timoteo 5:4?", "A recompensarlos", ["A olvidarlos", "A cobrarles", "A dejárselos a la iglesia"], "«y a recompensar a sus padres».", "1 Timoteo 5:4"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué fondo de ayuda está mejor organizado?", "Uno con propósito escrito, criterios, un límite por familia, decisión en equipo, pago directo y registro", ["Uno que da efectivo al que llega primero", "Uno que decide el pastor solo", "Uno sin reglas para ser flexible"], "«no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Cuándo no hay que negarse a hacer el bien, según Proverbios 3:27?", "Cuando se tiene poder para hacerlo", ["Nunca", "Solo los domingos", "Cuando sobra dinero"], "«Cuando tuvieres poder para hacerlo».", "Proverbios 3:27-28"],
      ["m2-02", 4, "o4", "comprender", "¿Qué muestra el recuerdo de Dorcas en Hechos 9:39?", "Que el servicio sencillo y práctico deja huella en la vida de otros", ["Que solo importan los milagros", "Que la ropa no importa", "Que las viudas no la querían"], "«llorando y mostrando las túnicas y los vestidos que Dorcas hacía».", "Hechos 9:39"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que organizar la ayuda para una familia de luto. ¿Qué haces?", "Un calendario de comidas, compañía en los días difíciles y ayuda con los trámites, según lo que necesiten", ["Una visita y nada más", "Dejarlos solos para no molestar", "Hacerles una fiesta"], "«compartiendo para las necesidades de los santos».", "Romanos 12:13"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué se pregunta antes qué día y a qué hora conviene la ayuda?", "Porque se respeta la casa, el tiempo y la dignidad de la persona", ["Para tener una excusa", "Porque la persona no importa", "No hace falta preguntar"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27-28"],
      ["m2-05", 4, "o4", "aplicar", "Un anciano de la iglesia vive solo y tiene la puerta rota. ¿Qué haces?", "Mandas a un hermano que sabe del oficio, con aviso y en pareja, o pagas a un profesional", ["Esperas a que se la arreglen los vecinos", "Le dices que se mude", "Vas tú aunque no sepas"], "«Cuando tuvieres poder para hacerlo».", "Proverbios 3:27-28"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué ayuda práctica se parece más a la de Dorcas?", "Un servicio sencillo y constante, hecho con amor y según la necesidad", ["Una ayuda grande una sola vez para la foto", "Ayudar solo si me lo agradecen", "Dar lo que me sobra aunque esté roto"], "«Esta abundaba en buenas obras y en limosnas que hacía».", "Hechos 9:36"],
      ["m2-07", 5, "o5", "recordar", "¿Qué pide Pablo hacer con los débiles, según 1 Tesalonicenses 5:14?", "Sostenerlos", ["Apartarlos", "Juzgarlos", "Olvidarlos"], "«que sostengáis a los débiles».", "1 Tesalonicenses 5:14"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué no se promete en la entrevista lo que no se va a cumplir?", "Porque se lastima a la persona y se pierde la confianza", ["Porque nunca se ayuda", "Porque es más rápido", "Sí se promete, para calmarla"], "«Al que responde palabra antes de oír».", "Proverbios 18:13"],
      ["m2-09", 5, "o5", "aplicar", "Una persona te cuenta en la entrevista que está pensando en quitarse la vida. ¿Qué haces?", "No la dejas sola, la escuchas y buscan ayuda enseguida: la línea 988, o el 911 si hay peligro", ["Le dices que se calme y la dejas ir", "Lo guardas en secreto", "Le das un folleto y nada más"], "«que alentéis a los de poco ánimo».", "1 Tesalonicenses 5:14"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué el 2-1-1 de Texas es útil para un equipo de misericordia?", "Porque orienta gratis y a toda hora hacia programas de ayuda que la iglesia no puede dar sola", ["Porque da dinero en efectivo", "Porque es la policía", "No es útil"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m2-11", 5, "o5", "comprender", "¿Qué hace la prudencia ante un pedido de dinero?", "Escucha, confirma y ayuda con orden, pagando directamente cuando se puede", ["Lo cree todo", "Sospecha de todos", "Nunca ayuda"], "«El simple todo lo cree».", "Proverbios 14:15"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué lista de recursos le sirve más a un equipo de misericordia?", "Una lista al día de bancos de alimentos, clínicas, ayudas para la renta, el 2-1-1, la línea 988 y la línea de reporte del abuso", ["Ninguna, la iglesia lo hace todo", "Solo el teléfono del pastor", "Una lista vieja que nadie revisa"], "«que seáis pacientes para con todos».", "1 Tesalonicenses 5:14"],
      ["m2-13", 6, "o6", "recordar", "¿Cómo recompensa el Padre que ve en lo secreto, según Mateo 6:4?", "En público", ["De ninguna manera", "Con castigo", "Con olvido"], "«y tu Padre que ve en lo secreto te recompensará en público».", "Mateo 6:3-4"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué hace falta poner límites sanos en el servicio?", "Para servir por largo tiempo sin agotarse y dejar a otros lo que no nos toca", ["Para servir menos", "Porque servir es malo", "No hace falta"], "«No nos cansemos, pues, de hacer bien».", "Gálatas 6:9"],
      ["m2-15", 6, "o6", "aplicar", "Un hermano del equipo atiende pedidos a toda hora y ya no ve a su familia. ¿Qué le aconsejas?", "Que ponga un horario, comparta los turnos y cuide su casa y su vida con Dios", ["Que siga así", "Que deje la iglesia", "Que no conteste nunca"], "«porque a su tiempo segaremos, si no desmayamos».", "Gálatas 6:9"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el que sirve no se pone por encima del que recibe?", "Porque con humildad estima a los demás como superiores a él mismo", ["Porque el que recibe manda", "No importa", "Porque así lo dice la ley"], "«antes bien con humildad».", "Filipenses 2:3-4"],
      ["m2-17", 6, "o6", "comprender", "¿Qué enseña al que sirve el ejemplo de Jesús en Lucas 5:16?", "Que hay que apartarse a orar para sacar fuerzas", ["Que no hace falta orar", "Que hay que servir sin parar", "Que hay que huir de la gente"], "«Mas él se apartaba a lugares desiertos, y oraba».", "Lucas 5:16"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué equipo de misericordia cuida mejor a los que cuidan?", "Uno con turnos, descanso, oración juntos y alguien que pregunta cómo está cada uno", ["Uno donde el más fuerte lo hace todo", "Uno sin días libres", "Uno donde cada uno se arregla solo"], "«No nos cansemos, pues, de hacer bien».", "Gálatas 6:9"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "obra-social-2-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué es la diaconía y por qué todos los creyentes están llamados a servir.",
      ideas: [
        { id: "servicio", peso: 30, texto: "Diaconía quiere decir servicio.", formas: ["quiere decir servicio", "significa servicio", "es servicio", "es el servicio", "diakonia"] },
        { id: "jesus", peso: 30, texto: "Jesús vino a servir y nos dio ejemplo.", formas: ["vino a servir", "vino para servir", "no vino para ser servido", "lavo los pies", "lavar los pies", "ejemplo"] },
        { id: "dones", peso: 30, texto: "Cada uno sirve con el don que recibió, con el poder que Dios da.", formas: ["don", "dones", "el poder que dios da", "cada uno", "glorificado"] },
      ],
      citas: ["Marcos 10:45", "Juan 13:14-15", "Juan 13:15", "1 Pedro 4:10", "1 Pedro 4:11", "Romanos 12:7-8", "Hechos 6:2", "Hechos 6:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La diaconía es el servicio. Jesús no vino para ser servido, sino para servir (Marcos 10:45), y nos dio ejemplo al lavar los pies de sus discípulos. Todos servimos porque cada uno recibió un don, y lo usamos con el poder que Dios da, para que él sea glorificado.",
    },
    {
      id: "obra-social-2-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué carácter deben tener los que sirven en la misericordia y por qué se les prueba primero.",
      ideas: [
        { id: "testimonio", peso: 30, texto: "Buen testimonio, llenos del Espíritu y de sabiduría.", formas: ["buen testimonio", "lleno* del espiritu", "sabiduria"] },
        { id: "honestos", peso: 30, negativa: true, texto: "Honestos, sin doblez y no codiciosos.", formas: ["honest*", "sin doblez", "codicios*", "integridad", "de confianza"] },
        { id: "prueba", peso: 30, texto: "Se los prueba primero porque el servicio toca dinero y vidas, y así se protege a todos.", formas: ["a prueba", "probad*", "prueba primero", "tareas pequenas", "conocerlos", "proteg*"] },
      ],
      citas: ["Hechos 6:3", "Hechos 6:2-3", "1 Timoteo 3:8-10", "1 Timoteo 3:8", "1 Timoteo 3:10", "Romanos 16:1-2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los que sirven deben tener buen testimonio y estar llenos del Espíritu y de sabiduría (Hechos 6:3). Deben ser honestos, sin doblez y no codiciosos de ganancias deshonestas. Se les prueba primero con tareas pequeñas (1 Timoteo 3:10), porque el servicio toca dinero y vidas, y así se protege a todos.",
    },
    {
      id: "obra-social-2-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué principios bíblicos y qué cuidados deben guiar un fondo de ayuda de la iglesia.",
      ideas: [
        { id: "familia", peso: 30, texto: "La familia ayuda primero, y se anima a trabajar al que puede.", formas: ["familia primero", "la familia", "su propia familia", "no quiere trabajar", "trabajar"] },
        { id: "reglas", peso: 30, texto: "Criterios claros, un límite y decisión en equipo.", formas: ["criterio*", "limite", "en equipo", "proposito escrito", "por escrito"] },
        { id: "registro", peso: 30, texto: "Pago directo, registro y confidencialidad, con honradez.", formas: ["pago directo", "directamente", "recibo*", "registr*", "confidencial*", "honrad*"] },
      ],
      citas: ["1 Timoteo 5:4", "1 Timoteo 5:8", "2 Tesalonicenses 3:10", "2 Corintios 8:21", "2 Corintios 8:20-21", "Proverbios 19:17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La familia ayuda primero (1 Timoteo 5:4), y se anima a trabajar al que puede, aunque se sostiene al que no puede. El fondo tiene un propósito escrito, criterios claros, un límite por familia y decide en equipo. Paga directamente a quien se le debe, guarda el recibo y la confidencialidad, con honradez.",
    },
    {
      id: "obra-social-2-e4",
      tipo: "breve",
      pregunta:
        "Un hombre llega a la oficina de la iglesia y pide 600 dólares en efectivo para la renta, porque dice que lo van a desalojar el viernes. Explica cómo responderías con las reglas de un buen fondo de ayuda, con citas bíblicas.",
      ideas: [
        { id: "escuchar", peso: 25, texto: "Escucharlo con respeto, con dos personas del equipo.", formas: ["escuchar*", "con respeto", "dos personas", "en pareja", "entrevista"] },
        { id: "conocer", peso: 25, texto: "Conocer su situación y pedir el aviso o los papeles.", formas: ["su situacion", "el aviso", "los papeles", "su trabajo", "su familia", "otras ayudas", "documento*", "comprobar", "confirmar"] },
        { id: "reglas", peso: 25, texto: "Revisar los criterios del fondo y decidir en equipo.", formas: ["criterio*", "el limite", "en equipo", "el consejo", "aprob*", "si cumple"] },
        { id: "pagar", peso: 25, texto: "Pagar directamente al dueño, guardar el recibo y acompañarlo.", formas: ["directamente", "al dueno", "al propietario", "recibo*", "registr*"] },
      ],
      basta: 85,
      citas: ["2 Corintios 8:21", "2 Corintios 8:20-21", "1 Timoteo 5:4", "1 Timoteo 5:8", "2 Tesalonicenses 3:10", "Proverbios 14:15", "Proverbios 18:13", "Proverbios 19:17", "Proverbios 3:27"],
      pesoCita: 10,
      errores: [
        { id: "e4-efectivo", anula: "pagar", texto: "Darle el efectivo en la mano sin más.", formas: ["le daria el efectivo", "darle el efectivo", "le daria los 600", "darle los 600"] },
      ],
      modelo:
        "Primero lo escucharía con respeto, en una entrevista con otra persona del equipo, porque responder antes de oír es fatuidad (Proverbios 18:13). Le preguntaría por su situación: su trabajo, su familia y otras ayudas que ya pidió, y le pediría el aviso del dueño, porque el avisado mira bien sus pasos (Proverbios 14:15). Después revisaríamos los criterios del fondo y el límite por familia, y decidiríamos en equipo; si fuera una cantidad grande, la llevaríamos al consejo. Si se aprueba, pagaríamos directamente al dueño de la vivienda y guardaríamos el recibo, procurando hacer las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:21). También lo conectaríamos con otras ayudas de la comunidad para la renta y con una bolsa de trabajo, y lo llamaríamos en dos semanas para saber cómo está.",
    },
    {
      id: "obra-social-2-e5",
      tipo: "breve",
      pregunta:
        "Una hermana de tu iglesia, que vive sola, sale del hospital después de una operación y no puede manejar ni cocinar por un mes. Explica cómo organizarías el cuidado práctico, con citas bíblicas.",
      ideas: [
        { id: "preguntar", peso: 25, texto: "Preguntarle qué necesita y qué días le conviene.", formas: ["preguntar*", "que necesita", "que dias", "le conviene", "su permiso"] },
        { id: "comidas", peso: 25, texto: "Un calendario de comidas.", formas: ["calendario", "comidas", "llevarle comida", "turnos de comida"] },
        { id: "transporte", peso: 25, texto: "Transporte a sus citas con choferes con licencia y seguro.", formas: ["transporte", "llevarla", "choferes", "chofer", "sus citas", "al medico"] },
        { id: "respeto", peso: 25, texto: "Visitas con aviso y en pareja, respetando su casa, hasta que pueda valerse.", formas: ["con aviso", "en pareja", "dos personas", "su intimidad", "respet*", "valerse", "barra"] },
      ],
      basta: 85,
      citas: ["Romanos 12:13", "Proverbios 3:27-28", "Proverbios 3:27", "Hechos 9:39", "Hechos 9:36", "Santiago 1:27", "Gálatas 6:2", "Gálatas 6:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero la llamaría para preguntarle qué necesita y qué días le conviene recibir ayuda, porque no hay que negarse a hacer el bien cuando se puede (Proverbios 3:27). Con su permiso haría un calendario de comidas, con hermanas y hermanos que se anoten por día, compartiendo para sus necesidades (Romanos 12:13). Organizaría el transporte a sus citas médicas con choferes que tengan licencia y seguro. Revisaríamos con ella si la casa necesita algo para que no se caiga, como una barra en el baño, con un hermano que sepa hacerlo. Las visitas serían con aviso y de dos personas, respetando su casa y su intimidad, como Dorcas servía a las viudas (Hechos 9:39). La llamaría cada semana y terminaríamos el plan cuando ya pueda valerse por sí misma.",
    },
  ],
  breve: {
    id: "obra-social-2-b1",
    tipo: "breve",
    pregunta: "Escribe cómo organizaría tu iglesia su servicio de misericordia en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "servir", peso: 15, texto: "Servir como Jesús, cada uno con su don.", formas: ["vino a servir", "no vino para ser servido", "lavar los pies", "su don", "sus dones", "diaconia"] },
      { id: "equipo", peso: 20, texto: "Un equipo de buen testimonio, probado, con funciones claras.", formas: ["buen testimonio", "un equipo", "funciones", "a prueba", "probad*"] },
      { id: "fondo", peso: 20, texto: "Un fondo con reglas, pago directo y registro.", formas: ["fondo de ayuda", "criterio*", "directamente", "recibo*", "limite"] },
      { id: "practico", peso: 15, texto: "Ayudas prácticas: comidas, transporte, reparaciones y compañía.", formas: ["comidas", "transporte", "reparacion*", "compania", "hospitalidad"] },
      { id: "orientar", peso: 15, texto: "Escuchar y orientar a los recursos de la comunidad, y reportar el abuso.", formas: ["escuchar*", "orientar*", "2-1-1", "211", "recursos de la comunidad", "report*", "988"] },
      { id: "corazon", peso: 15, texto: "Servir con humildad, sin buscar aplauso, con descanso y límites.", formas: ["humildad", "en secreto", "descans*", "turnos", "limites"] },
    ],
    basta: 85,
    citas: ["Santiago 1:27", "Marcos 10:45", "Juan 13:14-15", "1 Pedro 4:10", "1 Pedro 4:11", "Hechos 6:2-3", "Hechos 6:3", "1 Timoteo 3:8-10", "Romanos 16:1-2", "1 Timoteo 5:4", "2 Tesalonicenses 3:10", "2 Corintios 8:21", "Romanos 12:13", "Proverbios 3:27-28", "Hechos 9:39", "Proverbios 18:13", "Proverbios 14:15", "1 Tesalonicenses 5:14", "Filipenses 2:3-4", "Mateo 6:3-4", "Gálatas 6:9", "Romanos 12:8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año serviríamos como Jesús, que no vino para ser servido, sino para servir (Marcos 10:45), y ayudaríamos a cada hermano a servir con su don. Formaríamos un equipo de misericordia de buen testimonio, probado primero en tareas pequeñas, con funciones claras y reglas escritas, como los siete de Hechos 6:3. Tendríamos un fondo de ayuda con criterios, un límite por familia y decisión en equipo, pagando directamente a quien se le debe y guardando cada recibo, con honradez (2 Corintios 8:21). Organizaríamos ayudas prácticas: comidas, transporte al médico, reparaciones sencillas y compañía para los que están solos, practicando la hospitalidad (Romanos 12:13). En cada pedido escucharíamos antes de responder (Proverbios 18:13) y orientaríamos a las personas a los recursos de la comunidad, como el 2-1-1, y reportaríamos de inmediato cualquier sospecha de abuso de un menor. Y cuidaríamos el corazón del equipo: serviríamos con humildad y en secreto (Mateo 6:3-4), con turnos y descanso, sin cansarnos de hacer el bien (Gálatas 6:9). Así viviríamos la religión pura, visitando a los huérfanos y a las viudas en sus tribulaciones (Santiago 1:27).",
  },
};
