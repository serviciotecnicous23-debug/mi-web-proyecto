/**
 * El banco de «Liderazgo II: formar líderes y equipos» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 multiplicar líderes · o2 reconocer y formar líderes · o3 delegar · o4 trabajar en equipo ·
 * o5 resolver conflictos · o6 visión, servicio y sucesión · o7 el versículo de memoria (2 Timoteo 2:2).
 * Quién puede ejercer cada cargo no se evalúa aquí: es un punto de la declaración de fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-liderazgo-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_LIDERAZGO_2: BancoMateria = {
  materia: "n5-liderazgo-2",
  repaso: {
    "n5-liderazgo-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Para qué estableció Jesús a los doce, según Marcos 3:14?", "Para que estuviesen con él y para enviarlos a predicar", ["Para que gobernaran Israel", "Para que escribieran la Biblia", "Para que vivieran en el templo"], "«Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar».", "Marcos 3:14"],
      ["1-r2", 1, "o1", "comprender", "¿Cuántas generaciones de formación hay en 2 Timoteo 2:2?", "Cuatro: Pablo, Timoteo, los hombres fieles y los otros", ["Una", "Dos", "Siete"], "«Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["1-r3", 1, "o1", "comprender", "¿Qué diferencia hay entre sumar y multiplicar líderes?", "Sumar es hacerlo todo uno mismo; multiplicar es formar a otros que formen a otros", ["No hay ninguna diferencia", "Multiplicar es tener más reuniones", "Sumar llega más lejos"], "La multiplicación empieza despacio, pero llega mucho más lejos.", "2 Timoteo 2:2"],
    ] as P[]).map(p),
    "n5-liderazgo-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Bernabé con Saulo, según Hechos 11:25-26?", "Lo buscó en Tarso y lo llevó a Antioquía, donde enseñaron todo un año", ["Lo denunció a las autoridades", "Lo envió solo a Roma", "Lo dejó en Jerusalén"], "«se congregaron allí todo un año con la iglesia, y enseñaron a mucha gente».", "Hechos 11:26"],
      ["2-r2", 2, "o2", "comprender", "¿Qué pide 1 Timoteo 3:10 antes de dar responsabilidad a los que van a servir?", "Que sean sometidos a prueba primero", ["Que paguen una cuota", "Que tengan un título universitario", "Nada en especial"], "«sean sometidos a prueba primero».", "1 Timoteo 3:10"],
      ["2-r3", 2, "o2", "recordar", "¿Qué escribió Pablo años después sobre Marcos, según 2 Timoteo 4:11?", "Que le era útil para el ministerio", ["Que no quería volver a verlo", "Que se había apartado de la fe", "Que debía quedarse en su casa"], "«Toma a Marcos y tráele contigo, porque me es útil para el ministerio».", "2 Timoteo 4:11"],
    ] as P[]).map(p),
    "n5-liderazgo-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué le dijo Jetro a Moisés sobre su manera de trabajar?", "Que no estaba bien lo que hacía y que desfallecería del todo", ["Que lo hacía muy bien y debía seguir así", "Que debía trabajar más horas", "Que debía dejar de atender al pueblo"], "«No está bien lo que haces. Desfallecerás del todo».", "Éxodo 18:17-18"],
      ["3-r2", 3, "o3", "comprender", "¿Qué cualidades debían tener los que ayudarían a Moisés, según Éxodo 18:21?", "Ser capaces, temerosos de Dios, de verdad y que aborrecieran la avaricia", ["Ser ricos y famosos", "Ser parientes de Moisés", "Ser jóvenes y fuertes"], "«temerosos de Dios, varones de verdad, que aborrezcan la avaricia».", "Éxodo 18:21"],
      ["3-r3", 3, "o3", "recordar", "¿Qué pasó después de que los apóstoles delegaron el servicio de las mesas?", "Crecía la palabra del Señor", ["La iglesia se dividió", "Los apóstoles dejaron de orar", "Las viudas dejaron la iglesia"], "«Y crecía la palabra del Señor».", "Hechos 6:7"],
    ] as P[]).map(p),
    "n5-liderazgo-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Por qué avanzó la muralla en tiempos de Nehemías, según Nehemías 4:6?", "Porque el pueblo tuvo ánimo para trabajar", ["Porque el rey pagó obreros extranjeros", "Porque Nehemías la construyó solo", "Porque no tenían enemigos"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
      ["4-r2", 4, "o4", "recordar", "¿Qué dice Eclesiastés 4:9?", "Que mejores son dos que uno", ["Que mejor es estar solo", "Que uno basta para todo", "Que más vale el que manda"], "«Mejores son dos que uno; porque tienen mejor paga de su trabajo».", "Eclesiastés 4:9"],
      ["4-r3", 4, "o4", "comprender", "¿Qué enseña 1 Corintios 12:12 sobre un equipo?", "Que somos un solo cuerpo con muchos miembros, y cada uno aporta", ["Que algunos miembros sobran", "Que todos deben hacer lo mismo", "Que solo el líder importa"], "«así como el cuerpo es uno, y tiene muchos miembros».", "1 Corintios 12:12"],
    ] as P[]).map(p),
    "n5-liderazgo-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cuál es el primer paso de Mateo 18:15 cuando un hermano peca contra ti?", "Ir y hablar con él a solas", ["Contarlo a toda la iglesia", "Publicarlo en las redes", "Ignorarlo para siempre"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
      ["5-r2", 5, "o5", "recordar", "¿Qué manda Mateo 5:24 si recuerdas que ofendiste a tu hermano?", "Reconciliarte primero con él y después presentar tu ofrenda", ["Presentar la ofrenda y olvidarlo", "Esperar a que él venga", "Pedir a otro que hable por ti"], "«anda, reconcíliate primero con tu hermano».", "Mateo 5:24"],
      ["5-r3", 5, "o5", "comprender", "¿Qué rogó Pablo a Evodia y a Síntique?", "Que fueran de un mismo sentir en el Señor", ["Que se separaran", "Que dejaran la iglesia", "Que no se hablaran más"], "«que sean de un mismo sentir en el Señor».", "Filipenses 4:2"],
    ] as P[]).map(p),
    "n5-liderazgo-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué le dijo Dios a Habacuc que hiciera con la visión?", "Escribirla y declararla en tablas, para que corra el que la lea", ["Guardarla en secreto", "Olvidarla", "Contarla solo a los reyes"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["6-r2", 6, "o6", "comprender", "¿Quién se hace grande entre los discípulos, según Marcos 10:43?", "El que sirve a los demás", ["El que manda más", "El que tiene más dinero", "El que es más famoso"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43"],
      ["6-r3", 6, "o6", "recordar", "¿Qué le dijo Moisés a Josué delante de todo Israel?", "Esfuérzate y anímate", ["Quédate en el desierto", "Espera a otro líder", "No entres en la tierra"], "«Esfuérzate y anímate».", "Deuteronomio 31:7"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: multiplicar líderes (10)
    ["f01", 1, "o1", "recordar", "¿Qué fue lo primero para los doce, según Marcos 3:14?", "Estar con Jesús", ["Predicar en Roma", "Escribir cartas", "Construir un templo"], "«para que estuviesen con él, y para enviarlos a predicar».", "Marcos 3:14"],
    ["f02", 1, "o1", "comprender", "¿Dónde se forman los líderes, según el modelo de Jesús?", "En la cercanía, no solo en las clases", ["Solo en los libros", "Solo en los cultos", "A distancia y sin contacto"], "«para que estuviesen con él».", "Marcos 3:14"],
    ["f03", 1, "o1", "recordar", "¿A quiénes debía encargar Timoteo lo que oyó de Pablo, según 2 Timoteo 2:2?", "A hombres fieles que fueran idóneos para enseñar también a otros", ["A los gobernantes de la ciudad", "A los filósofos de Atenas", "A nadie"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f04", 1, "o1", "analizar", "Si cada año cada uno forma a otra persona que hace lo mismo, ¿cuántos serán, más o menos, en diez años?", "Más de mil", ["Diez", "Veinte", "Cien"], "El grupo se duplica cada año: la multiplicación llega más lejos que la suma.", "2 Timoteo 2:2"],
    ["f05", 1, "o1", "comprender", "¿Qué propone Greg Ogden para formar discípulos?", "Grupos de tres o cuatro personas que después formen sus propios grupos", ["Grandes reuniones sin seguimiento", "Estudiar cada uno solo", "Clases de una sola vez"], "Se estudia la Palabra, se ora, se rinden cuentas y se aplica lo aprendido.", "2 Timoteo 2:2"],
    ["f06", 1, "o1", "recordar", "¿Qué dice Lucas 6:40 del discípulo que es perfeccionado?", "Que será como su maestro", ["Que será superior a su maestro", "Que no necesitará maestro", "Que será igual a todos"], "«mas todo el que fuere perfeccionado, será como su maestro».", "Lucas 6:40"],
    ["f07", 1, "o1", "analizar", "¿Por qué el líder debe cuidar primero su propia vida?", "Porque forma a otros a su semejanza", ["Porque los demás no importan", "Porque así descansa", "No necesita cuidarla"], "«El discípulo no es superior a su maestro».", "Lucas 6:40"],
    ["f08", 1, "o1", "aplicar", "Un pastor lo hace todo y nadie más sabe dirigir. ¿Qué le recomendarías?", "Empezar a formar a otros que puedan dirigir y formar a otros", ["Trabajar más horas", "No delegar nunca", "Cerrar los ministerios"], "«esto encarga a hombres fieles».", "2 Timoteo 2:2"],
    ["f09", 1, "o1", "evaluar", "¿Qué ministerio muestra mejor la multiplicación?", "Uno donde los que fueron formados ya están formando a otros", ["Uno donde el líder es el único que enseña", "Uno con muchas reuniones, pero sin nuevos líderes", "Uno que depende de una sola persona"], "«para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f10", 1, "o7", "recordar", "Completa 2 Timoteo 2:2: Lo que has oído de mí ante muchos testigos…", "esto encarga a hombres fieles que sean idóneos para enseñar también a otros", ["guárdalo en tu corazón y no lo digas a nadie", "escríbelo en un libro para los reyes", "enséñalo solo en el templo de Jerusalén"], "Es el versículo de memoria de la materia.", "2 Timoteo 2:2"],
    // ---- lección 2: reconocer y formar líderes (10)
    ["f11", 2, "o2", "recordar", "¿Quién presentó a Saulo a los apóstoles cuando los discípulos todavía le tenían miedo?", "Bernabé", ["Pedro", "Juan Marcos", "Timoteo"], "Bernabé supo ver lo que Saulo podía llegar a ser.", "Hechos 9:27"],
    ["f12", 2, "o2", "recordar", "¿Cuánto tiempo enseñaron Bernabé y Saulo en Antioquía?", "Todo un año", ["Un solo día", "Diez años", "Una semana"], "«se congregaron allí todo un año con la iglesia».", "Hechos 11:26"],
    ["f13", 2, "o2", "comprender", "¿Qué muestra que una persona tiene un carácter probado?", "Que es fiel en lo poco", ["Que habla muy bien", "Que es popular", "Que tiene mucho dinero"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f14", 2, "o2", "aplicar", "¿Cuál de estas personas muestra disposición para aprender?", "La que recibe la corrección sin ofenderse y la aplica", ["La que nunca acepta consejos", "La que se enoja cuando la corrigen", "La que cree que ya lo sabe todo"], "«El que ama la instrucción ama la sabiduría».", "Proverbios 12:1"],
    ["f15", 2, "o2", "recordar", "¿Cuál es el primer paso para formar a un líder, según la lección?", "Yo lo hago y tú miras", ["Tú lo haces solo desde el principio", "Nadie lo hace", "Tú miras y nunca lo haces"], "Después: yo lo hago y tú me ayudas; tú lo haces y yo te ayudo; tú lo haces y yo miro.", "Marcos 6:7"],
    ["f16", 2, "o2", "comprender", "¿Cómo aprendieron los doce a servir?", "Vieron a Jesús, lo acompañaron, fueron enviados y volvieron a contarle", ["Leyendo libros a solas", "Sin la ayuda de Jesús", "Solo escuchando sermones"], "«Después llamó a los doce, y comenzó a enviarlos de dos en dos».", "Marcos 6:7"],
    ["f17", 2, "o2", "recordar", "¿Por qué se separaron Pablo y Bernabé?", "Por causa de Juan Marcos, que los había dejado en el primer viaje", ["Por dinero", "Por una enfermedad", "Por una orden del gobierno"], "«Y hubo tal desacuerdo entre ellos, que se separaron el uno del otro».", "Hechos 15:39"],
    ["f18", 2, "o2", "analizar", "¿Qué enseña la historia de Juan Marcos sobre la formación de líderes?", "Que quien falló puede ser restaurado y volver a ser útil", ["Que quien falla nunca sirve", "Que hay que formar solo a los perfectos", "Que los viajes no importan"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
    ["f19", 2, "o2", "aplicar", "¿Qué error cometió Samuel al ver a Eliab?", "Juzgar por la apariencia, cuando Dios mira el corazón", ["Ungirlo enseguida", "No ofrecer sacrificio", "Ninguno"], "«pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón».", "1 Samuel 16:7"],
    ["f20", 2, "o2", "evaluar", "¿A quién conviene dar una responsabilidad nueva en el ministerio?", "A quien ha sido fiel en lo poco, aprende y sirve con amor", ["Al más talentoso, aunque no sea fiel", "Al más simpático", "Al que la pide con más insistencia"], "«sean sometidos a prueba primero».", "1 Timoteo 3:10"],
    // ---- lección 3: delegar (10)
    ["f21", 3, "o3", "recordar", "¿Cuánto tiempo atendía Moisés al pueblo antes del consejo de Jetro?", "Desde la mañana hasta la tarde", ["Una hora al día", "Solo los sábados", "Una vez al año"], "«y el pueblo estuvo delante de Moisés desde la mañana hasta la tarde».", "Éxodo 18:13"],
    ["f22", 3, "o3", "recordar", "¿Qué debía enseñar Moisés a todos, según Éxodo 18:20?", "Las ordenanzas, las leyes y el camino por donde debían andar", ["A construir casas", "A pelear", "A comerciar"], "«Y enseña a ellos las ordenanzas y las leyes, y muéstrales el camino por donde deben andar».", "Éxodo 18:20"],
    ["f23", 3, "o3", "comprender", "¿Cómo organizó Moisés a los que lo ayudarían?", "Como jefes de grupos de mil, de cien, de cincuenta y de diez", ["Todos al mismo nivel y sin orden", "Uno solo para todo el pueblo", "Por familias ricas"], "«por jefes de millares, de centenas, de cincuenta y de diez».", "Éxodo 18:21"],
    ["f24", 3, "o3", "comprender", "¿Qué asuntos llegaban a Moisés después de delegar?", "Los graves", ["Todos", "Ninguno", "Solo los de su familia"], "«y todo asunto grave lo traerán a ti».", "Éxodo 18:22"],
    ["f25", 3, "o3", "recordar", "¿Qué no era justo para los apóstoles, según Hechos 6:2?", "Dejar la palabra de Dios para servir a las mesas", ["Ayudar a las viudas", "Orar", "Escoger a otros"], "«No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas».", "Hechos 6:2"],
    ["f26", 3, "o3", "recordar", "¿Cómo debían ser los siete de Hechos 6:3?", "De buen testimonio, llenos del Espíritu Santo y de sabiduría", ["Ricos y conocidos", "Jóvenes y fuertes", "Parientes de los apóstoles"], "«de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
    ["f27", 3, "o3", "aplicar", "Al delegar una tarea, ¿qué debe dar el líder además de la tarea?", "La autoridad para hacerla", ["Nada más", "Una lista de castigos", "Toda su responsabilidad, sin seguimiento"], "Sin autoridad, el otro no puede cumplir lo que se le encargó.", "Éxodo 18:22"],
    ["f28", 3, "o3", "aplicar", "¿Qué debe quedar claro al delegar?", "Qué se espera, para cuándo y con qué recursos", ["Solo el nombre del encargado", "Nada: que lo resuelva solo", "Solo el castigo si falla"], "Moisés primero enseñó a todos lo que debían hacer.", "Éxodo 18:20"],
    ["f29", 3, "o3", "analizar", "¿Por qué delegar no es abandonar?", "Porque el líder sigue cerca, enseña, apoya y responde por el resultado", ["Porque el líder ya no tiene nada que ver", "Porque se delega para descansar siempre", "Sí es abandonar"], "«Así aliviarás la carga de sobre ti, y la llevarán ellos contigo».", "Éxodo 18:22"],
    ["f30", 3, "o3", "evaluar", "¿Qué resultado tuvo delegar en Hechos 6?", "Los apóstoles siguieron en la oración y la palabra, y la palabra del Señor crecía", ["Los apóstoles perdieron autoridad", "La iglesia se dividió", "Nadie atendió a las viudas"], "«Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén».", "Hechos 6:7"],
    // ---- lección 4: trabajar en equipo (10)
    ["f31", 4, "o4", "recordar", "¿En cuántos días se terminó el muro de Jerusalén?", "En cincuenta y dos días", ["En siete días", "En un año", "En cuarenta años"], "«Fue terminado, pues, el muro, el veinticinco del mes de Elul, en cincuenta y dos días».", "Nehemías 6:15"],
    ["f32", 4, "o4", "comprender", "¿Cómo se organizó la reparación del muro, según Nehemías 3?", "Cada grupo reparó su tramo, algunos frente a su propia casa", ["Lo hizo Nehemías solo", "Lo hicieron obreros extranjeros", "Nadie sabía qué hacer"], "Juntos, y cada uno en su parte, terminaron la obra.", "Nehemías 4:6"],
    ["f33", 4, "o4", "recordar", "¿Qué pasa si uno cae, según Eclesiastés 4:10?", "El otro levanta a su compañero", ["Nadie lo ayuda", "Lo dejan atrás", "Pierde su lugar"], "«Porque si cayeren, el uno levantará a su compañero».", "Eclesiastés 4:10"],
    ["f34", 4, "o4", "comprender", "¿Qué enseña la imagen del cuerpo en 1 Corintios 12?", "Que cada miembro aporta sus dones y nadie sobra", ["Que solo la cabeza importa", "Que todos deben tener el mismo don", "Que los miembros débiles sobran"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:21"],
    ["f35", 4, "o4", "recordar", "¿Cuál es la primera marca de un equipo sano, según la lección?", "Un propósito común que todos conocen", ["Un líder que decide todo solo", "Muchas reuniones", "Un buen presupuesto"], "«sintiendo lo mismo, teniendo el mismo amor, unánimes».", "Filipenses 2:2"],
    ["f36", 4, "o4", "comprender", "¿Qué pide Filipenses 2:3 a los miembros de un equipo?", "Estimar a los demás como superiores a sí mismo", ["Buscar el primer lugar", "Competir entre ellos", "Hacer las cosas por vanagloria"], "«antes bien con humildad, estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3"],
    ["f37", 4, "o4", "aplicar", "¿Cómo debe terminar una reunión de equipo?", "Con acuerdos claros: qué se hará, quién lo hará y para cuándo", ["Sin conclusiones", "Con una discusión abierta", "Cuando el líder se canse"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f38", 4, "o4", "aplicar", "En una reunión, una persona habla todo el tiempo. ¿Qué principio se rompe?", "Que todos puedan hablar y nadie domine la reunión", ["Que la reunión empiece con oración", "Que haya una agenda", "Ninguno"], "«Nada hagáis por contienda o por vanagloria».", "Filipenses 2:3"],
    ["f39", 4, "o4", "analizar", "¿Por dónde suelen empezar las divisiones en un equipo?", "Por el orgullo y la crítica a escondidas", ["Por orar juntos", "Por tener metas claras", "Por servir"], "«solícitos en guardar la unidad del Espíritu en el vínculo de la paz».", "Efesios 4:3"],
    ["f40", 4, "o4", "evaluar", "¿Qué equipo muestra mejores marcas de salud?", "Uno con propósito común, roles claros, unidad, confianza y cumplimiento de lo acordado", ["Uno donde cada uno hace lo que quiere", "Uno donde solo el líder trabaja", "Uno donde nadie dice la verdad para no molestar"], "«Mejores son dos que uno».", "Eclesiastés 4:9"],
    // ---- lección 5: resolver conflictos (10)
    ["f41", 5, "o5", "recordar", "Si el hermano no escucha a solas, ¿qué sigue según Mateo 18:16?", "Volver con uno o dos más", ["Publicarlo en las redes", "Romper la relación para siempre", "Hablar mal de él"], "«toma aún contigo a uno o dos».", "Mateo 18:16"],
    ["f42", 5, "o5", "recordar", "¿Qué dice Mateo 18:15 que ganas si tu hermano te oye?", "Has ganado a tu hermano", ["Has ganado la discusión", "Has ganado dinero", "Has ganado un cargo"], "«si te oyere, has ganado a tu hermano».", "Mateo 18:15"],
    ["f43", 5, "o5", "comprender", "¿Por qué Mateo 5:23-24 manda reconciliarse antes de presentar la ofrenda?", "Porque la reconciliación con el hermano no puede esperar y es parte de la adoración", ["Porque la ofrenda no importa", "Porque así se ahorra dinero", "Porque el templo estaba cerrado"], "«reconcíliate primero con tu hermano, y entonces ven y presenta tu ofrenda».", "Mateo 5:24"],
    ["f44", 5, "o5", "recordar", "¿Cuáles son los cuatro pasos del pacificador, según Ken Sande?", "Buscar la gloria de Dios, sacar la viga del propio ojo, restaurar con mansedumbre e ir a reconciliarse", ["Ganar, convencer, castigar y olvidar", "Callar, esperar, ignorar y huir", "Acusar, juzgar, separar y publicar"], "«saca primero la viga de tu propio ojo».", "Mateo 7:5"],
    ["f45", 5, "o5", "aplicar", "¿Qué debes hacer primero en un conflicto, según Mateo 7:5?", "Revisar tu propia culpa", ["Señalar la culpa del otro", "Buscar aliados", "Salir de la iglesia"], "«saca primero la viga de tu propio ojo».", "Mateo 7:5"],
    ["f46", 5, "o5", "recordar", "¿Qué quita la ira, según Proverbios 15:1?", "La blanda respuesta", ["El grito", "El silencio ofendido", "La palabra áspera"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
    ["f47", 5, "o5", "aplicar", "¿Qué pide Santiago 1:19 en una conversación difícil?", "Ser pronto para oír, tardo para hablar y tardo para airarse", ["Hablar primero y escuchar después", "Responder con enojo", "No decir nada nunca"], "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».", "Santiago 1:19"],
    ["f48", 5, "o5", "comprender", "¿Cómo resolvió la iglesia el conflicto de Hechos 15?", "Escuchando a todos, examinando la Escritura y buscando la dirección del Espíritu Santo", ["Por votación, sin escuchar", "Expulsando a los que pensaban distinto", "Ignorando el problema"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
    ["f49", 5, "o5", "analizar", "¿Qué enseña el caso de Evodia y Síntique?", "Que a veces hace falta alguien que medie para ayudar a reconciliarse", ["Que los conflictos no se resuelven", "Que hay que callar", "Que hay que expulsar a las dos"], "«te ruego también a ti, compañero fiel».", "Filipenses 4:3"],
    ["f50", 5, "o5", "evaluar", "En un caso de abuso dentro de la iglesia, ¿basta con el camino de Mateo 18?", "No: primero se protege a la víctima y se acude a las autoridades", ["Sí: se arregla a solas entre los dos", "Sí: basta con que se pidan perdón", "No se hace nada"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    // ---- lección 6: visión, servicio y sucesión (10)
    ["f51", 6, "o6", "recordar", "¿Qué pidió Dios a Habacuc hacer con la visión?", "Escribirla y declararla en tablas", ["Esconderla", "Olvidarla", "Venderla"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f52", 6, "o6", "comprender", "¿Qué pregunta responde la visión de un ministerio?", "¿Hacia dónde nos lleva Dios?", ["¿Cuánto dinero tenemos?", "¿Quién manda?", "¿Qué hicimos el año pasado?"], "Después vienen las metas y el plan.", "Habacuc 2:2"],
    ["f53", 6, "o6", "comprender", "¿Qué diferencia hay entre la visión, las metas y el plan?", "La visión dice hacia dónde, las metas qué se logrará y para cuándo, y el plan quién hará qué y cómo", ["Son lo mismo", "El plan va antes que la visión", "Las metas no hacen falta"], "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».", "Proverbios 16:3"],
    ["f54", 6, "o6", "recordar", "¿Qué hizo Nehemías antes de compartir la visión con el pueblo?", "Oró, pidió recursos al rey y recorrió los muros de noche", ["Nada: habló enseguida", "Esperó a que otro lo hiciera", "Se fue de Jerusalén"], "Después les dijo: «venid, y edifiquemos el muro de Jerusalén».", "Nehemías 2:17"],
    ["f55", 6, "o6", "recordar", "¿A qué vino Jesús, según Marcos 10:45?", "A servir y a dar su vida en rescate por muchos", ["A ser servido", "A gobernar Roma", "A juzgar al mundo en ese momento"], "«no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».", "Marcos 10:45"],
    ["f56", 6, "o6", "aplicar", "¿Qué significa dirigir con corazón de siervo?", "Usar la autoridad para servir y hacer crecer a otros", ["Mandar sin explicar", "Buscar el reconocimiento", "Evitar el trabajo difícil"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43"],
    ["f57", 6, "o6", "recordar", "¿Cómo llamó Elías a Eliseo, según 1 Reyes 19:19?", "Echando sobre él su manto", ["Enviándole una carta", "Con una trompeta", "Desde el templo"], "«pasando Elías por delante de él, echó sobre él su manto».", "1 Reyes 19:19"],
    ["f58", 6, "o6", "analizar", "¿Qué enseñan Moisés con Josué y Elías con Eliseo?", "Que el líder sabio prepara a quien seguirá la obra", ["Que el líder debe quedarse para siempre", "Que no hace falta preparar a nadie", "Que solo Dios trabaja"], "«Esfuérzate y anímate; porque tú entrarás con este pueblo a la tierra».", "Deuteronomio 31:7"],
    ["f59", 6, "o6", "evaluar", "¿Qué pregunta muestra si un ministerio tiene un plan de sucesión?", "¿Quién podría seguir la obra si el líder tuviera que dejarla mañana?", ["¿Cuántos asistieron el domingo?", "¿Cuánto dura el culto?", "¿De qué color es el templo?"], "El líder sabio prepara a quien vendrá después.", "Deuteronomio 31:7"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos líderes refleja mejor lo que enseña la materia?", "Uno con una visión clara, que sirve a los demás, forma a otros y prepara a quien lo seguirá", ["Uno que lo controla todo y no forma a nadie", "Uno con muchas ideas, pero sin plan", "Uno que sirve, pero no prepara a nadie"], "«para enseñar también a otros».", "2 Timoteo 2:2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Para qué fueron enviados los doce, según Marcos 3:14?", "A predicar", ["A gobernar", "A construir", "A comerciar"], "«y para enviarlos a predicar».", "Marcos 3:14"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué la multiplicación empieza despacio, pero llega más lejos?", "Porque cada persona formada forma a otras, y el grupo se duplica", ["Porque se trabaja menos", "Porque no hace falta enseñar", "No llega más lejos"], "En diez años, el grupo que se duplica pasa de mil personas.", "2 Timoteo 2:2"],
      ["m1-03", 1, "o1", "aplicar", "¿Cuál es un buen primer paso para multiplicar líderes en tu ministerio?", "Escoger a una o dos personas fieles y empezar a formarlas de cerca", ["Anunciar un evento grande", "Esperar a que aparezcan solos", "Hacerlo todo tú"], "«para que estuviesen con él».", "Marcos 3:14"],
      ["m1-04", 1, "o1", "recordar", "¿Qué no es el discípulo, según Lucas 6:40?", "Superior a su maestro", ["Capaz de aprender", "Llamado a crecer", "Amado por Dios"], "«El discípulo no es superior a su maestro».", "Lucas 6:40"],
      ["m1-05", 1, "o1", "analizar", "¿Qué deja el líder que no forma a otros cuando se va?", "Un vacío", ["Una obra que sigue", "Muchos líderes nuevos", "Nada malo"], "El que multiplica deja una obra que sigue sin él.", "2 Timoteo 2:2"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué grupo sigue mejor la propuesta de Ogden?", "Tres personas que estudian, oran y se rinden cuentas, y después forman su propio grupo", ["Cien personas que escuchan sin hablar", "Una persona sola con un libro", "Un grupo que nunca termina ni se multiplica"], "Cada uno se compromete a formar después su propio grupo.", "2 Timoteo 2:2"],
      ["m1-07", 2, "o2", "recordar", "¿Dónde se llamó a los discípulos cristianos por primera vez?", "En Antioquía", ["En Jerusalén", "En Roma", "En Tarso"], "«y a los discípulos se les llamó cristianos por primera vez en Antioquía».", "Hechos 11:26"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué la responsabilidad se da poco a poco?", "Para observar cómo la maneja la persona antes de darle más", ["Para que no aprenda", "Porque no se confía en nadie", "Para que se canse"], "«sean sometidos a prueba primero».", "1 Timoteo 3:10"],
      ["m1-09", 2, "o2", "aplicar", "Ya hiciste la tarea mientras tu aprendiz te ayudaba. ¿Cuál es el siguiente paso?", "Que él la haga y tú lo ayudes", ["Que él te mire otra vez", "Que la haga solo y sin ayuda desde ya", "Dejar de formarlo"], "Después, él lo hará y tú solo mirarás.", "Marcos 6:7"],
      ["m1-10", 2, "o2", "recordar", "¿Qué mira Jehová, según 1 Samuel 16:7?", "El corazón", ["La estatura", "La ropa", "La riqueza"], "«pero Jehová mira el corazón».", "1 Samuel 16:7"],
      ["m1-11", 2, "o2", "analizar", "¿Qué hizo Bernabé con Saulo que otros no hicieron?", "Confió en él y le abrió puertas cuando otros le temían", ["Lo acusó", "Lo ignoró", "Lo envió lejos"], "Bernabé lo presentó a los apóstoles.", "Hechos 9:27"],
      ["m1-12", 2, "o2", "evaluar", "Un joven que antes abandonó un ministerio quiere volver a servir. ¿Qué haría un líder como Bernabé?", "Darle una nueva oportunidad y acompañarlo", ["Negarle toda oportunidad", "Hablar mal de él", "Darle enseguida el cargo más alto, sin acompañarlo"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
      ["m1-13", 3, "o3", "recordar", "¿Quién aconsejó a Moisés que delegara?", "Jetro, su suegro", ["Aarón, su hermano", "Josué, su ayudante", "Faraón"], "«Entonces el suegro de Moisés le dijo: No está bien lo que haces».", "Éxodo 18:17"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué se agota el líder que no delega?", "Porque el trabajo es demasiado pesado para una sola persona", ["Porque los demás no hacen nada bien", "Porque no ora", "No se agota"], "«porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:18"],
      ["m1-15", 3, "o3", "aplicar", "Delegaste una tarea. ¿Qué haces después?", "Acompañas y pides cuentas en las fechas acordadas", ["Desapareces", "Haces la tarea tú mismo a escondidas", "Criticas en público"], "Delegar no es abandonar.", "Éxodo 18:22"],
      ["m1-16", 3, "o3", "recordar", "¿Qué problema llevó a escoger a los siete en Hechos 6?", "Las viudas de los griegos eran desatendidas", ["Faltaba dinero para el templo", "Los apóstoles estaban enfermos", "No había quién predicara"], "«eran desatendidas en la distribución diaria».", "Hechos 6:1"],
      ["m1-17", 3, "o3", "analizar", "¿Qué ganaron los apóstoles al delegar el servicio de las mesas?", "Tiempo para la oración y el ministerio de la palabra", ["Más dinero", "Menos trabajo para siempre", "Más poder"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas maneras de delegar es la mejor?", "Escoger a la persona adecuada, explicar con claridad, dar autoridad, acompañar y reconocer el trabajo", ["Dar la tarea al primero que pase", "Dar la tarea sin explicar nada", "Dar la tarea y quitarle toda autoridad"], "«Así aliviarás la carga de sobre ti».", "Éxodo 18:22"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Hasta dónde llegaba la muralla cuando el pueblo tuvo ánimo para trabajar?", "Hasta la mitad de su altura", ["Hasta el cielo", "Hasta el río", "Todavía no se había empezado"], "«toda la muralla fue terminada hasta la mitad de su altura».", "Nehemías 4:6"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué son mejores dos que uno, según Eclesiastés 4:9-10?", "Porque juntos rinden más y uno levanta al otro si cae", ["Porque cobran el doble", "Porque así trabajan menos", "No son mejores"], "«porque tienen mejor paga de su trabajo».", "Eclesiastés 4:9"],
      ["m2-03", 4, "o4", "aplicar", "¿Cómo empezarías una reunión de equipo, según la lección?", "Con la Palabra y la oración", ["Con quejas", "Con los chismes de la semana", "Sin ningún orden"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-04", 4, "o4", "recordar", "¿Qué no puede decir el ojo a la mano, según 1 Corintios 12:21?", "No te necesito", ["Ayúdame", "Gracias", "Eres importante"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:21"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué ayudan los roles claros a un equipo?", "Porque cada uno sabe qué le toca y los trabajos no se cruzan", ["Porque así nadie trabaja", "Porque el líder hace todo", "No ayudan"], "«Porque así como el cuerpo es uno, y tiene muchos miembros».", "1 Corintios 12:12"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué debe hacer un líder si dos miembros critican a un tercero a escondidas?", "Hablar con ellos de frente y con amor, y animarlos a resolverlo con esa persona", ["Unirse a la crítica", "Ignorarlo", "Contarlo a todos"], "«solícitos en guardar la unidad del Espíritu en el vínculo de la paz».", "Efesios 4:3"],
      ["m2-07", 5, "o5", "recordar", "¿Cuál es el último paso de Mateo 18 si el hermano no escucha?", "Decirlo a la iglesia", ["Publicarlo", "Vengarse", "Callar para siempre"], "«Si no los oyere a ellos, dilo a la iglesia».", "Mateo 18:17"],
      ["m2-08", 5, "o5", "comprender", "¿Qué significa atacar el problema y no a la persona?", "Buscar la solución, no ganar la discusión", ["Ganar a toda costa", "Ofender para que el otro aprenda", "Evitar hablar"], "«La blanda respuesta quita la ira».", "Proverbios 15:1"],
      ["m2-09", 5, "o5", "aplicar", "Te enteras de que un hermano está molesto contigo. ¿Qué haces, según Mateo 5:23-24?", "Vas a reconciliarte con él cuanto antes", ["Esperas a que él venga", "Lo ignoras", "Hablas mal de él"], "«anda, reconcíliate primero con tu hermano».", "Mateo 5:24"],
      ["m2-10", 5, "o5", "recordar", "¿Cómo pide Colosenses 3:13 que perdonemos?", "De la manera que Cristo nos perdonó", ["Solo si el otro lo merece", "Una sola vez", "Solo a los amigos"], "«De la manera que Cristo os perdonó, así también hacedlo vosotros».", "Colosenses 3:13"],
      ["m2-11", 5, "o5", "analizar", "¿Qué muestra la historia de Pablo, Bernabé y Marcos sobre los conflictos?", "Que aun los mejores equipos tienen conflictos, y que con el tiempo puede haber restauración", ["Que los conflictos nunca se resuelven", "Que Pablo nunca se equivocó", "Que no hay que trabajar en equipo"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál es la mejor manera de empezar a resolver un conflicto con un compañero?", "Hablar con él en privado, escuchar primero y reconocer tu parte", ["Contarlo en la reunión del equipo", "Escribir una queja anónima", "Esperar a que se olvide"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
      ["m2-13", 6, "o6", "recordar", "¿Qué hizo Nehemías antes de hablar al pueblo de reconstruir el muro?", "Recorrió los muros de noche para ver cómo estaban", ["Convocó una fiesta", "Escribió al faraón", "Se fue a Babilonia"], "«Y salí de noche por la puerta del Valle».", "Nehemías 2:13"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué la visión se escribe y se repite?", "Para que todos la entiendan y puedan avanzar con ella", ["Para que nadie la discuta", "Para guardarla en secreto", "No hace falta"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["m2-15", 6, "o6", "aplicar", "¿Cómo se ve el liderazgo de servicio en una reunión de trabajo?", "El líder escucha, ayuda donde hace falta y hace crecer a otros", ["El líder solo da órdenes", "El líder se lleva el mérito", "El líder no trabaja"], "«será vuestro servidor».", "Marcos 10:43"],
      ["m2-16", 6, "o6", "recordar", "¿Qué hizo Eliseo con el manto de Elías, según 2 Reyes 2:13?", "Lo recogió y siguió la obra de Elías", ["Lo quemó", "Lo vendió", "Lo dejó en el río"], "«Alzó luego el manto de Elías que se le había caído».", "2 Reyes 2:13"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué el líder con visión también debe cuidar su propia vida?", "Porque nadie lleva a otros más lejos de lo que él mismo camina con Dios", ["Porque la visión no importa", "Para trabajar menos", "No necesita cuidarla"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué plan muestra mejor una visión bien llevada a la práctica?", "Uno con metas claras, responsables, recursos, orden y oración", ["Una idea sin pasos", "Muchas metas sin responsables", "Un plan sin oración ni revisión"], "«Encomienda a Jehová tus obras».", "Proverbios 16:3"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-liderazgo-2-e1",
      tipo: "corta",
      pregunta: "Explica el modelo de Jesús y de 2 Timoteo 2:2 para formar líderes.",
      ideas: [
        { id: "jesus", peso: 25, texto: "Jesús estuvo con los doce y después los envió.", formas: ["estuviesen con el", "estar con", "los envio", "enviarlos", "doce"] },
        { id: "generaciones", peso: 30, texto: "Cuatro generaciones que se forman unas a otras.", formas: ["cuatro generaciones", "generaciones", "hombres fieles", "enseñar tambien a otros"] },
        { id: "multiplicar", peso: 25, texto: "Multiplicar, no solo sumar.", formas: ["multiplic*", "no solo sumar", "formar a otros", "formen a otros"] },
        { id: "cercania", peso: 10, texto: "Se forma en la cercanía.", formas: ["cercania", "de cerca", "acompañ*", "grupo pequeño", "tres o cuatro"] },
      ],
      citas: ["2 Timoteo 2:2", "Marcos 3:14", "Lucas 6:40", "Mateo 28:19-20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús estableció a doce para que estuviesen con él y después los envió a predicar (Marcos 3:14): los formó de cerca. En 2 Timoteo 2:2 hay cuatro generaciones: Pablo, Timoteo, los hombres fieles y otros. Así se multiplican los líderes: cada uno forma a otros que formen a otros.",
    },
    {
      id: "n5-liderazgo-2-e2",
      tipo: "corta",
      pregunta: "Explica qué enseñan Éxodo 18 y Hechos 6 sobre delegar.",
      ideas: [
        { id: "jetro", peso: 25, texto: "Jetro aconsejó a Moisés no hacerlo todo solo.", formas: ["jetro", "desfalleceras", "demasiado pesado", "todo solo"] },
        { id: "personas", peso: 25, texto: "Escoger personas capaces y de buen testimonio.", formas: ["capaces", "temerosos de dios", "buen testimonio", "llenos del espiritu", "sabiduria"] },
        { id: "resultado", peso: 20, texto: "El resultado: la carga se comparte y la palabra crece.", formas: ["crecia la palabra", "la palabra crecio", "aliviaras", "la carga", "la oracion y la palabra"] },
        { id: "como", peso: 20, texto: "Delegar con claridad, autoridad y seguimiento.", formas: ["claridad", "autoridad", "seguimiento", "pedir cuentas", "acompañ*"] },
      ],
      citas: ["Éxodo 18:17-23", "Éxodo 18:17-18", "Éxodo 18:21-22", "Hechos 6:1-7", "Hechos 6:2-4", "Hechos 6:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jetro le enseñó a Moisés que no podía hacerlo todo solo: debía escoger personas capaces y temerosas de Dios y darles parte de la carga (Éxodo 18:21-22). En Hechos 6, los apóstoles escogieron a siete de buen testimonio y crecía la palabra. Delegar es dar la tarea con claridad, autoridad y seguimiento.",
    },
    {
      id: "n5-liderazgo-2-e3",
      tipo: "corta",
      pregunta: "Explica los pasos de Mateo 18 y de Mateo 5 para resolver un conflicto.",
      ideas: [
        { id: "solos", peso: 30, texto: "Primero hablar a solas.", formas: ["a solas", "tu y el solos", "en privado", "personalmente"] },
        { id: "testigos", peso: 20, texto: "Después con uno o dos más, y luego ante la iglesia.", formas: ["uno o dos", "testigos", "la iglesia", "dos o tres"] },
        { id: "reconciliar", peso: 25, texto: "Si uno ofendió, reconciliarse primero.", formas: ["reconcili*", "pedir perdon", "ofendi*", "ofrenda"] },
        { id: "actitud", peso: 15, texto: "Con humildad: escuchar y perdonar.", formas: ["humild*", "escuch*", "perdon*", "viga", "mansedumbre"] },
      ],
      citas: ["Mateo 18:15-17", "Mateo 18:15", "Mateo 5:23-24", "Mateo 5:24", "Mateo 7:5", "Gálatas 6:1", "Colosenses 3:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En Mateo 18:15-17, Jesús enseña a hablar primero a solas con el hermano; si no escucha, volver con uno o dos más, y solo después decirlo a la iglesia. En Mateo 5:23-24, si yo ofendí, debo reconciliarme primero. Todo con humildad: escuchar, reconocer mi parte y perdonar.",
    },
    {
      id: "n5-liderazgo-2-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo formarías a un líder en tu ministerio durante un año: cómo lo escogerías, qué pasos seguirías para formarlo, qué tareas le delegarías y cómo lo prepararías para formar a otros. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "escoger", peso: 20, texto: "Cómo lo escogería: carácter, fidelidad y disposición para aprender.", formas: ["fiel", "fidelidad", "caracter", "corazon de siervo", "aprender", "escogeria"] },
        { id: "pasos", peso: 25, texto: "Los pasos: hacer, mirar, ayudar y soltar.", formas: ["yo lo hago", "tu miras", "miraria", "ayudaria", "dirigiria", "pasos", "acompañ*"] },
        { id: "delegar", peso: 20, texto: "Las tareas delegadas con claridad y seguimiento.", formas: ["deleg*", "tarea*", "responsabilidad*", "autoridad"] },
        { id: "multiplicar", peso: 20, texto: "Prepararlo para formar a otros.", formas: ["formar a otros", "a otros", "multiplic*", "su propio grupo", "otra persona"] },
        { id: "cuidado", peso: 15, texto: "Oración, ánimo y corrección.", formas: ["orar*", "oracion", "corregi*", "animar*", "rendir cuentas", "paciencia"] },
      ],
      basta: 85,
      citas: ["2 Timoteo 2:2", "Marcos 3:14", "Lucas 6:40", "1 Timoteo 3:10", "Éxodo 18:17-23", "Éxodo 18:21", "Hechos 6:1-7", "Hechos 6:3", "Marcos 6:7", "Lucas 16:10", "2 Timoteo 4:11", "Hechos 11:25-26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogería a Daniel, un joven del grupo de jóvenes que es fiel en lo poco, recibe la corrección con humildad y sirve aunque nadie lo vea, porque los que sirven deben ser sometidos a prueba primero (1 Timoteo 3:10). Durante el primer trimestre, yo dirigiría la reunión de jóvenes y él miraría; en el segundo, yo la dirigiría y él me ayudaría; en el tercero, él la dirigiría y yo lo ayudaría; y en el cuarto, él la dirigiría solo y yo solo miraría y le daría consejos. Como Jesús, que estableció a los doce para que estuviesen con él y luego los envió (Marcos 3:14), pasaríamos tiempo juntos y oraríamos cada semana. Le delegaría tareas reales con claridad y con autoridad: preparar los temas y coordinar al equipo, con fechas para revisar juntos lo hecho. Lo corregiría con paciencia y lo animaría en sus avances. Al final del año, le pediría que escoja a otra persona y empiece a formarla, porque lo que oyó de mí debe encargarlo a otros fieles que enseñen también a otros (2 Timoteo 2:2).",
    },
    {
      id: "n5-liderazgo-2-e5",
      tipo: "breve",
      pregunta:
        "Describe un conflicto en un equipo de ministerio, real o imaginado, y explica cómo lo resolverías paso a paso según la Biblia y qué harías para que el equipo salga más unido. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "conflicto", peso: 10, texto: "El conflicto descrito.", formas: ["conflicto", "imagin*", "desacuerdo", "discusion", "molest*"] },
        { id: "solos", peso: 25, texto: "Hablar primero a solas.", formas: ["a solas", "en privado", "tu y el solos", "personalmente"] },
        { id: "humildad", peso: 20, texto: "Escuchar y reconocer la propia parte.", formas: ["escuch*", "viga", "mi parte", "su parte", "humild*", "reconocer"] },
        { id: "pasos", peso: 15, texto: "Si no se resuelve: uno o dos más, un mediador o la iglesia.", formas: ["uno o dos", "mediador", "medie", "testigos", "la iglesia", "pastor"] },
        { id: "perdon", peso: 15, texto: "Perdonar y reconciliarse.", formas: ["perdon*", "reconcili*"] },
        { id: "unidad", peso: 15, texto: "Lo que haría para fortalecer la unidad.", formas: ["unidad", "unido*", "acuerdos", "roles", "proposito", "orar juntos"] },
      ],
      basta: 85,
      citas: ["Mateo 18:15-17", "Mateo 18:15", "Mateo 5:23-24", "Mateo 7:5", "Proverbios 15:1", "Santiago 1:19", "Filipenses 4:2-3", "Filipenses 2:3", "Efesios 4:3", "Colosenses 3:13", "Gálatas 6:1", "Hechos 15:36-39"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Imaginé este conflicto: en el equipo de bienvenida, Marta y Lucía discuten porque una siente que la otra decide todo sin consultarla, y ya no se hablan. Primero oraría y revisaría mi propia actitud, porque Jesús manda sacar primero la viga del propio ojo (Mateo 7:5). Después hablaría a solas con cada una, escucharía su parte sin juzgar y les pediría que hablen entre ellas en privado, como enseña Mateo 18:15. Si no lo logran, me reuniría con las dos como mediador, como Pablo pidió a un compañero fiel que ayudara a Evodia y a Síntique (Filipenses 4:2-3). En la conversación pediría que cada una escuche antes de responder y reconozca su parte, y buscaríamos una solución, no un ganador. Las animaría a perdonarse como Cristo nos perdonó y a reconciliarse. Para que el equipo salga más unido, aclararíamos los roles de cada una, haríamos acuerdos claros sobre quién decide qué y empezaríamos cada reunión orando juntos, cuidando la unidad del Espíritu (Efesios 4:3).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-liderazgo-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe la visión de un ministerio que diriges o que te gustaría dirigir: hacia dónde crees que Dios lo lleva, dos metas para este año, quién te ayudará, cómo lo servirás como líder siervo y a quién prepararás para seguir la obra. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "vision", peso: 20, texto: "La visión.", formas: ["vision", "hacia donde", "dios nos lleva"] },
      { id: "metas", peso: 20, texto: "Dos metas para el año.", formas: ["meta*", "este año", "objetivo*", "antes de diciembre"] },
      { id: "equipo", peso: 15, texto: "Quién ayudará: el equipo y lo que delegará.", formas: ["equipo", "me ayudara", "me ayudaran", "deleg*", "responsable*"] },
      { id: "siervo", peso: 20, texto: "Dirigir como siervo.", formas: ["servir", "servidor", "siervo", "servicio", "sirviendo"] },
      { id: "sucesion", peso: 25, texto: "A quién prepararía para seguir la obra.", formas: ["preparar*", "seguir la obra", "sucesor", "relevo", "josue", "eliseo"] },
    ],
    basta: 85,
    citas: ["Habacuc 2:2", "Proverbios 16:3", "Marcos 10:43-45", "Marcos 10:45", "Juan 13:14-15", "Deuteronomio 31:7-8", "Deuteronomio 31:7", "2 Timoteo 2:2", "Nehemías 2:17-18", "Éxodo 18:21", "1 Corintios 12:12"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Dirijo el ministerio de jóvenes de mi iglesia. Creo que Dios nos lleva a ser una generación que conoce la Palabra y la comparte con sus amigos: esa es nuestra visión, y la escribiremos con claridad para que todos la entiendan, como dice Habacuc 2:2. Para este año tengo dos metas: que cada joven termine el Nivel 1 de la academia antes de diciembre y que formemos tres grupos pequeños de estudio en distintos barrios. Me ayudará un equipo de cuatro líderes; a cada uno le delegaré un grupo o una tarea con claridad, y nos reuniremos cada mes para revisar el avance y orar. Quiero servir como Jesús, que no vino para ser servido, sino para servir (Marcos 10:45): estaré presente, escucharé a los jóvenes y daré el ejemplo en las tareas sencillas. Prepararé a Samuel, uno de los líderes, para seguir la obra: lo llevaré conmigo, le daré responsabilidades cada vez mayores y le diré, como Moisés a Josué, que se esfuerce y se anime (Deuteronomio 31:7).",
  },
};
