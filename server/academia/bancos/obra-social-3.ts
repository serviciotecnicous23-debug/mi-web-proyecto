/**
 * El banco de «Proyectos comunitarios» (especialidad Obra social y misericordia, materia 3). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 buscar el bien de la ciudad · o2 conocer los recursos y las necesidades · o3 diseñar con la comunidad ·
 * o4 los proyectos y sus cuidados · o5 los recursos y la sostenibilidad · o6 medir y celebrar el cambio · o7 el versículo
 * de memoria (Jeremías 29:7).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `obra-social-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_OBRA_SOCIAL_3: BancoMateria = {
  materia: "obra-social-3",
  repaso: {
    "obra-social-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué mandó Dios a los desterrados en Babilonia, según Jeremías 29:7?", "Procurar la paz de la ciudad y rogar por ella", ["Huir de la ciudad", "Ignorar la ciudad", "Pelear contra la ciudad"], "«procurad la paz de la ciudad a la cual os hice transportar».", "Jeremías 29:7"],
      ["1-r2", 1, "o1", "comprender", "¿Qué distingue un proyecto comunitario de una actividad suelta?", "Que responde a una necesidad real, tiene propósito, tiempo y responsables, se hace con la comunidad y se evalúa", ["Que es más grande", "Que lo decide un solo líder", "Que no necesita planearse"], "«En el bien de los justos la ciudad se alegra».", "Proverbios 11:10"],
      ["1-r3", 1, "o1", "aplicar", "Tu iglesia quiere servir a su barrio, pero no sabe por dónde empezar. ¿Qué hace primero?", "Orar por la ciudad, conversar con los vecinos y escoger con ellos una necesidad que la iglesia pueda atender bien", ["Hacer un evento grande sin preguntar", "Copiar el proyecto de otra ciudad", "Esperar a que el barrio venga al templo"], "«y rogad por ella a Jehová».", "Jeremías 29:7"],
    ] as P[]).map(p),
    "obra-social-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Nehemías de noche, según Nehemías 2:15?", "Subió por el torrente y observó el muro", ["Durmió en el palacio", "Huyó de la ciudad", "Le escribió al rey"], "«subí de noche por el torrente y observé el muro».", "Nehemías 2:15"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseñaron Kretzmann y McKnight sobre el desarrollo de la comunidad?", "Que se empieza por los recursos que el barrio ya tiene y no solo por lo que le falta", ["Que todo debe venir de afuera", "Que el barrio no tiene nada", "Que solo el gobierno puede ayudar"], "«Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos».", "Juan 6:9"],
      ["2-r3", 2, "o2", "aplicar", "Tienes que conocer el barrio antes de escoger un proyecto. ¿Qué haces?", "Caminar el barrio, hacer la lista de sus recursos y conversar con los vecinos sobre lo que les preocupa y lo que saben hacer", ["Decidir en la oficina del pastor", "Buscar en internet y nada más", "Preguntar solo a los miembros de la iglesia"], "«Mas el hombre entendido lo alcanzará».", "Proverbios 20:5"],
    ] as P[]).map(p),
    "obra-social-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Dónde se afirman los pensamientos, según Proverbios 15:22?", "En la multitud de consejeros", ["En la soledad", "En el silencio", "En la prisa"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
      ["3-r2", 3, "o3", "comprender", "¿Qué diferencia hay en un proyecto entre lo que hacemos y lo que cambia?", "Lo que hacemos son las actividades, como repartir despensas; lo que cambia es el bien en la vida de las personas, como conseguir trabajo", ["Son lo mismo", "Lo que cambia no se puede ver", "Lo que hacemos no importa"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
      ["3-r3", 3, "o3", "aplicar", "En tu barrio, los niños se quedan solos por la tarde y van mal en la escuela. ¿Cómo diseñas el proyecto?", "Con padres y maestros: un propósito, una tutoría con voluntarios revisados, el permiso de los padres y una forma de medir", ["Abrir el salón sin reglas", "Que un voluntario solo cuide a los niños", "Hacerlo sin consultar a los padres"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ] as P[]).map(p),
    "obra-social-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué les dijo Jesús a los discípulos ante la multitud con hambre, según Marcos 6:37?", "Dadles vosotros de comer", ["Despedidlos", "Que se vayan a sus casas", "Que compren pan ellos mismos"], "«Dadles vosotros de comer».", "Marcos 6:37"],
      ["4-r2", 4, "o4", "comprender", "¿A quién protege la ley Bill Emerson (42 U.S.C. 1791)?", "A quien dona de buena fe alimentos aparentemente sanos a una organización sin fines de lucro, y a la organización que los reparte", ["Solo a los supermercados", "A nadie", "Solo a los que venden comida"], "«El ojo misericordioso será bendito, Porque dio de su pan al indigente».", "Proverbios 22:9"],
      ["4-r3", 4, "o4", "aplicar", "Un voluntario de la despensa encuentra latas hinchadas y abolladas en la costura. ¿Qué hace?", "Las aparta y no las reparte, porque no son alimentos aparentemente sanos", ["Las reparte primero", "Las mezcla con las buenas", "Se las regala a los voluntarios"], "«tuve hambre, y me disteis de comer».", "Mateo 25:35"],
    ] as P[]).map(p),
    "obra-social-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué mandó Jesús recoger después de alimentar a la multitud, según Juan 6:12?", "Los pedazos que sobraron, para que no se perdiera nada", ["Las canastas vacías", "El dinero", "Nada"], "«Recoged los pedazos que sobraron, para que no se pierda nada».", "Juan 6:12"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué se acaba un proyecto que depende de una sola persona?", "Porque cuando esa persona se cansa o se va, nadie sabe seguirlo", ["Porque cuesta poco", "No se acaba", "Porque tiene muchos voluntarios"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["5-r3", 5, "o5", "aplicar", "Tu proyecto depende de una sola donación grande que puede acabarse. ¿Qué haces?", "Buscas varias fuentes pequeñas, gastas con cuidado y haces un presupuesto con margen", ["Gastas todo enseguida", "Cierras el proyecto", "Escondes las cuentas"], "«poderoso es Dios para hacer que abunde en vosotros toda gracia».", "2 Corintios 9:8"],
    ] as P[]).map(p),
    "obra-social-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pidió Dios a su pueblo, según Hageo 1:5?", "Meditar bien sobre sus caminos", ["Olvidar el pasado", "Construir más rápido", "No pensar"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué se mide un proyecto con humildad?", "Porque hacemos nuestra parte, pero el crecimiento lo da Dios", ["Porque los números no importan", "Porque nadie lo mira", "Porque el mérito es del equipo"], "«pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6"],
      ["6-r3", 6, "o6", "aplicar", "Tienes que contar en el culto lo que logró la despensa. ¿Qué cuidas?", "Dar gracias a Dios, contar historias solo con permiso y sin datos privados, y decir también lo que hay que mejorar", ["Mostrar fotos de las familias sin preguntar", "Decir solo los números grandes", "Darle todo el mérito al equipo"], "«Grandes cosas ha hecho Jehová con nosotros».", "Salmos 126:3"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Buscar el bien de la ciudad
    ["f01", 1, "o1", "recordar", "¿Por qué debían los desterrados procurar la paz de la ciudad, según Jeremías 29:7?", "Porque en su paz tendrían ellos paz", ["Porque la ciudad era suya", "Porque así volverían pronto", "Porque el rey lo pedía"], "«porque en su paz tendréis vosotros paz».", "Jeremías 29:7"],
    ["f02", 1, "o1", "recordar", "¿Qué no se puede esconder, según Mateo 5:14?", "Una ciudad asentada sobre un monte", ["Una lámpara pequeña", "Un tesoro", "Un pecado"], "«una ciudad asentada sobre un monte no se puede esconder».", "Mateo 5:14"],
    ["f03", 1, "o1", "comprender", "¿Qué es el shalom, la paz de la Biblia?", "El bienestar completo: con Dios, con los demás y en la vida diaria", ["Solo la ausencia de guerra", "El silencio", "La riqueza"], "«procurad la paz de la ciudad».", "Jeremías 29:7"],
    ["f04", 1, "o1", "comprender", "¿Qué significa hacer un proyecto con la comunidad y no solo para ella?", "Que los vecinos opinan, deciden y participan", ["Que la iglesia lo decide todo", "Que los vecinos solo reciben", "Que no hay que preguntar"], "«En el bien de los justos la ciudad se alegra».", "Proverbios 11:10"],
    ["f05", 1, "o1", "comprender", "¿Por qué un proyecto comunitario busca el bien de todos, sin importar su religión?", "Porque Dios mandó buscar la paz de la ciudad, y la ayuda no se condiciona a la fe", ["Porque la religión no importa", "Porque así se recibe más dinero", "No es así"], "«y rogad por ella a Jehová».", "Jeremías 29:7"],
    ["f06", 1, "o1", "analizar", "¿Por qué un solo proyecto sostenido vale más que muchas actividades sueltas?", "Porque crea confianza, cambia vidas con el tiempo y deja algo que el barrio siente suyo", ["Porque cuesta menos", "No vale más", "Porque se ve en las fotos"], "«Vosotros sois la luz del mundo».", "Mateo 5:14"],
    ["f07", 1, "o1", "aplicar", "Un hermano propone hacer una gran fiesta para el barrio sin preguntar a nadie qué necesita. ¿Qué le respondes?", "Que primero escuchen a los vecinos y escojan juntos una necesidad real; la fiesta puede servir para conocerlos", ["Que la haga cuanto antes", "Que no se haga nada", "Que la haga solo para los miembros"], "«procurad la paz de la ciudad».", "Jeremías 29:7"],
    ["f08", 1, "o1", "aplicar", "Tu iglesia reparte comida un sábado al año y quiere hacer algo más. ¿Qué propones?", "Convertirlo en un proyecto: una despensa cada mes, con familias inscritas, voluntarios y una manera de medir", ["Repartir dos sábados", "Dejar de repartir", "Repartir sin orden"], "«En el bien de los justos la ciudad se alegra».", "Proverbios 11:10"],
    ["f09", 1, "o1", "evaluar", "¿Qué primer paso de una iglesia hacia su barrio es el mejor?", "Orar por la ciudad, escuchar a los vecinos y escoger con ellos una necesidad que pueda atender bien", ["Empezar muchos proyectos a la vez", "Decidir sin preguntar", "Esperar a que el barrio venga"], "«y rogad por ella a Jehová».", "Jeremías 29:7"],
    ["f10", 1, "o7", "recordar", "Completa Jeremías 29:7: Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová…", "porque en su paz tendréis vosotros paz", ["porque pronto volveréis", "para que os den riquezas", "y no os mezcléis con ella"], "«Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová; porque en su paz tendréis vosotros paz».", "Jeremías 29:7"],
    // Lección 2 · Conocer la comunidad: recursos y necesidades
    ["f11", 2, "o2", "recordar", "¿Qué tenía el muchacho, según Juan 6:9?", "Cinco panes de cebada y dos pececillos", ["Siete panes y tres peces", "Doce panes", "Un pan y un pez"], "«que tiene cinco panes de cebada y dos pececillos».", "Juan 6:9"],
    ["f12", 2, "o2", "recordar", "¿Qué preguntó Andrés sobre los panes y los peces, según Juan 6:9?", "Qué es esto para tantos", ["Dónde compramos más", "Quién los trajo", "Cuánto cuestan"], "«mas ¿qué es esto para tantos?».", "Juan 6:9"],
    ["f13", 2, "o2", "recordar", "¿Cómo es el consejo en el corazón del hombre, según Proverbios 20:5?", "Como aguas profundas", ["Como piedra", "Como humo", "Como arena"], "«Como aguas profundas es el consejo en el corazón del hombre».", "Proverbios 20:5"],
    ["f14", 2, "o2", "comprender", "¿Qué recursos de un barrio son las asociaciones?", "Los grupos que ya existen, como las ligas deportivas, los comités de vecinos y otras iglesias", ["Las casas vacías", "Los ríos", "Los impuestos"], "«Mas el hombre entendido lo alcanzará».", "Proverbios 20:5"],
    ["f15", 2, "o2", "comprender", "¿Por qué se hace también el mapa de los recursos y no solo el de las necesidades?", "Porque así los vecinos se ven como parte de la solución y el proyecto se sostiene con la comunidad", ["Porque las necesidades no importan", "Porque es más rápido", "No hace falta"], "«Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos».", "Juan 6:9"],
    ["f16", 2, "o2", "analizar", "¿Qué enseña que Jesús empezara con los cinco panes y los dos peces del muchacho?", "Que Dios usa lo que ya hay, por poco que parezca, para bendecir a muchos", ["Que siempre hay que comprarlo todo", "Que lo poco no sirve", "Que el muchacho era rico"], "«Y tomó Jesús aquellos panes, y habiendo dado gracias, los repartió».", "Juan 6:11"],
    ["f17", 2, "o2", "aplicar", "Tienes que entrevistar a veinte vecinos. ¿Qué tres preguntas les haces?", "Qué le gusta del barrio, qué le preocupa y qué sabe hacer", ["Cuánto gana, a qué iglesia va y por quién vota", "Ninguna, solo les das un folleto", "Por qué no vienen al culto"], "«Mas el hombre entendido lo alcanzará».", "Proverbios 20:5"],
    ["f18", 2, "o2", "aplicar", "Un vecino que repara carros te dice que le gustaría enseñar a los jóvenes. ¿Qué haces?", "Lo anotas en el mapa de los recursos y lo invitas a un proyecto con los jóvenes, con los cuidados debidos", ["Le agradeces y lo olvidas", "Le dices que la iglesia no necesita ayuda", "Le pides que done dinero"], "«Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos».", "Juan 6:9"],
    ["f19", 2, "o2", "aplicar", "En tu equipo alguien dice que el barrio no tiene nada bueno. ¿Qué propones?", "Hacer juntos el mapa de los recursos: personas, asociaciones, instituciones, lugares y negocios", ["Que la iglesia se mude", "Que nadie hable de eso", "Que solo se pida dinero de afuera"], "«y observé el muro».", "Nehemías 2:15"],
    ["f20", 2, "o2", "evaluar", "¿Qué manera de conocer un barrio es la mejor?", "Caminarlo, escuchar a los vecinos y hacer el mapa de sus necesidades y de sus recursos", ["Leer solo las noticias", "Preguntar solo a los miembros", "Decidir desde la oficina"], "«subí de noche por el torrente y observé el muro».", "Nehemías 2:15"],
    // Lección 3 · Diseñar un proyecto con la comunidad
    ["f21", 3, "o3", "recordar", "¿Cómo restauraron el muro los sacerdotes, según Nehemías 3:28?", "Cada uno enfrente de su casa", ["Todos en la puerta principal", "Solo de noche", "Con obreros pagados"], "«cada uno enfrente de su casa».", "Nehemías 3:28"],
    ["f22", 3, "o3", "recordar", "¿Por qué avanzó el muro, según Nehemías 4:6?", "Porque el pueblo tuvo ánimo para trabajar", ["Porque llegaron soldados", "Porque el rey pagó", "Porque llovió"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
    ["f23", 3, "o3", "recordar", "¿Qué pasa con los pensamientos donde no hay consejo, según Proverbios 15:22?", "Son frustrados", ["Se cumplen", "Se olvidan", "Se multiplican"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ["f24", 3, "o3", "comprender", "¿Qué es el propósito de un proyecto?", "El cambio que se quiere ver en la vida de las personas", ["La lista de los voluntarios", "El nombre del proyecto", "El dinero que se junta"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    ["f25", 3, "o3", "comprender", "¿Por qué se reparte el trabajo entre varios responsables?", "Para que cada uno sepa su parte y la obra no dependa de uno solo, como en el muro de Nehemías", ["Para que nadie trabaje", "Porque nadie es responsable", "No hace falta"], "«cada uno enfrente de su casa».", "Nehemías 3:28"],
    ["f26", 3, "o3", "analizar", "¿Por qué contar solo las despensas repartidas no dice si un proyecto funciona?", "Porque cuenta lo que hacemos, pero no lo que cambia en la vida de las familias", ["Porque los números mienten", "Sí lo dice", "Porque nadie cuenta"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
    ["f27", 3, "o3", "aplicar", "Tienes que escribir el propósito de unas clases de inglés para padres. ¿Cuál escribes?", "Que en un año los padres puedan hablar con los maestros y los médicos de sus hijos", ["Dar clases", "Tener muchos alumnos", "Usar el salón"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    ["f28", 3, "o3", "aplicar", "Un líder quiere diseñar solo el proyecto para terminar más rápido. ¿Qué le respondes?", "Que lo diseñe con los vecinos y el equipo, porque en la multitud de consejeros los planes se afirman", ["Que tiene razón", "Que no haga nada", "Que lo copie de otra iglesia"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
    ["f29", 3, "o3", "aplicar", "Tu iglesia diseña una tutoría para niños. ¿Qué cuidados incluye?", "Voluntarios revisados y capacitados, siempre dos adultos, el permiso de los padres y el reporte de cualquier sospecha de abuso", ["Que cualquiera cuide a los niños", "Que un adulto esté solo con cada niño", "Que no se avise a los padres"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
    ["f30", 3, "o3", "evaluar", "¿Qué diseño de proyecto está más completo?", "Uno con propósito, personas, actividades, recursos, responsables y una manera de medir lo que cambia", ["Uno con solo una fecha", "Uno con solo el nombre del líder", "Uno sin forma de medir"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    // Lección 4 · Proyectos que sirven: la despensa, las tutorías, las clases y la salud
    ["f31", 4, "o4", "recordar", "¿Por qué es bendito el ojo misericordioso, según Proverbios 22:9?", "Porque dio de su pan al indigente", ["Porque ve lejos", "Porque es rico", "Porque juzga bien"], "«Porque dio de su pan al indigente».", "Proverbios 22:9"],
    ["f32", 4, "o4", "recordar", "¿Qué dice el Rey sobre cuando fue forastero, según Mateo 25:35?", "Que lo recogieron", ["Que lo echaron", "Que no lo vieron", "Nada"], "«fui forastero, y me recogisteis».", "Mateo 25:35"],
    ["f33", 4, "o4", "recordar", "¿Por cuánto dinero pensaron los discípulos comprar pan, según Marcos 6:37?", "Por doscientos denarios", ["Por cinco denarios", "Por mil denarios", "Por treinta piezas de plata"], "«compremos pan por doscientos denarios».", "Marcos 6:37"],
    ["f34", 4, "o4", "comprender", "¿Qué excepción tiene la protección de la ley Bill Emerson?", "La negligencia grave o la mala conducta intencional", ["Ninguna", "Cualquier error pequeño", "Las donaciones de las iglesias"], "«El ojo misericordioso será bendito».", "Proverbios 22:9"],
    ["f35", 4, "o4", "comprender", "¿Qué protege la Ley del Donante de Buena Fe de Texas?", "Al que dona alimentos aparentemente sanos a una iglesia o a una organización sin fines de lucro para los necesitados, y a la que los reparte gratis cumpliendo las reglas de manejo", ["Solo a los restaurantes", "A los que venden comida", "A nadie"], "«Porque dio de su pan al indigente».", "Proverbios 22:9"],
    ["f36", 4, "o4", "analizar", "¿Por qué una feria de salud se hace junto a una clínica?", "Porque la iglesia no da consejos médicos: los dan profesionales con licencia", ["Porque la clínica paga", "No hace falta", "Porque los voluntarios no quieren"], "«tuve hambre, y me disteis de comer».", "Mateo 25:35"],
    ["f37", 4, "o4", "aplicar", "Un supermercado ofrece donar a la despensa alimentos que vencen esta semana. ¿Qué haces?", "Los recibes, los revisas, guardas bien los fríos y los repartes pronto, apartando lo que no esté sano", ["Los rechazas todos", "Los guardas un mes", "Los repartes sin revisar"], "«El ojo misericordioso será bendito».", "Proverbios 22:9"],
    ["f38", 4, "o4", "aplicar", "Tienes que organizar el día de la despensa para que nadie se sienta humillado. ¿Qué haces?", "Citas por horario, un trato digno, confidencialidad y oración solo para quien la quiera", ["Una fila larga al sol", "Que cuenten su historia en público", "Que oren obligados para recibir"], "«Dadles vosotros de comer».", "Marcos 6:37"],
    ["f39", 4, "o4", "aplicar", "Una hermana enfermera quiere orientar sobre la salud en la feria del barrio. ¿Qué cuidas?", "Que lo haga dentro de lo que permite su licencia, junto a una clínica, y que oriente a los vecinos a sus médicos", ["Que dé recetas a todos", "Que no se coordine con nadie", "Que no participe"], "«tuve sed, y me disteis de beber».", "Mateo 25:35"],
    ["f40", 4, "o4", "evaluar", "¿Qué despensa está mejor organizada?", "Una con alimentos revisados y bien guardados, reparto gratis por horarios, trato digno y otras ayudas para salir adelante", ["Una que reparte todo lo que llega sin revisar", "Una con filas que humillan", "Una que solo da comida para siempre"], "«Porque tuve hambre, y me disteis de comer».", "Mateo 25:35"],
    // Lección 5 · Los recursos y la sostenibilidad
    ["f41", 5, "o5", "recordar", "¿Para qué es poderoso Dios, según 2 Corintios 9:8?", "Para hacer que abunde en nosotros toda gracia", ["Para castigar a los pobres", "Para que no trabajemos", "Para darnos fama"], "«poderoso es Dios para hacer que abunde en vosotros toda gracia».", "2 Corintios 9:8"],
    ["f42", 5, "o5", "recordar", "¿Para qué abundamos, según 2 Corintios 9:8?", "Para toda buena obra", ["Para nuestros lujos", "Para guardar", "Para presumir"], "«abundéis para toda buena obra».", "2 Corintios 9:8"],
    ["f43", 5, "o5", "recordar", "¿Qué hace primero el que quiere edificar una torre, según Lucas 14:28?", "Se sienta y calcula los gastos", ["Empieza enseguida", "Pide prestado", "Contrata obreros"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f44", 5, "o5", "comprender", "¿Qué son las donaciones en especie?", "Las cosas y el trabajo que se donan, como alimentos, libros, un salón prestado o el trabajo de un profesional", ["Solo el dinero en efectivo", "Los préstamos del banco", "Los impuestos"], "«Recoged los pedazos que sobraron».", "Juan 6:12"],
    ["f45", 5, "o5", "comprender", "¿Por qué las ofrendas dadas para un proyecto se usan solo para ese proyecto?", "Porque se respeta la intención del que dio y se rinden cuentas con honradez", ["Porque así lo quiere el pastor", "No hace falta", "Porque lo manda el banco"], "«para que no se pierda nada».", "Juan 6:12"],
    ["f46", 5, "o5", "analizar", "¿Por qué un proyecto dura más cuando los vecinos lo sienten suyo?", "Porque participan, lo cuidan y lo siguen aunque cambien los líderes", ["Porque pagan más", "No dura más", "Porque la iglesia se desentiende"], "«poderoso es Dios para hacer que abunde en vosotros toda gracia».", "2 Corintios 9:8"],
    ["f47", 5, "o5", "aplicar", "Tienes que hacer el presupuesto de la tutoría para el año. ¿Qué incluyes?", "Lo que costará cada actividad, las donaciones en especie, los voluntarios y un margen para lo imprevisto", ["Solo el costo de la merienda", "Nada, ya se verá", "Solo lo que diga el pastor"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f48", 5, "o5", "aplicar", "Dos maestros jubilados sostienen la tutoría y ya están cansados. ¿Qué propones?", "Invitar y capacitar a padres y jóvenes del barrio, y repartir la carga con un calendario de voluntarios", ["Cerrar la tutoría", "Que sigan solos", "Pagarles más y nada más"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
    ["f49", 5, "o5", "aplicar", "Un negocio del barrio quiere donar la merienda de la tutoría. ¿Qué haces?", "Aceptas con gratitud, registras la donación y después le informas lo que se logró", ["La rechazas por orgullo", "No le das las gracias", "Le pides que anuncie a la iglesia"], "«Recoged los pedazos que sobraron, para que no se pierda nada».", "Juan 6:12"],
    ["f50", 5, "o5", "evaluar", "¿Qué proyecto tiene más posibilidades de durar?", "Uno con un equipo, varias fuentes de apoyo, un presupuesto con margen, cuentas claras y vecinos que participan", ["Uno que depende de una persona", "Uno con una sola donación grande", "Uno sin cuentas"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    // Lección 6 · Medir y celebrar el cambio
    ["f51", 6, "o6", "recordar", "¿Quién dio el crecimiento, según 1 Corintios 3:6?", "Dios", ["Pablo", "Apolos", "La iglesia"], "«pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6"],
    ["f52", 6, "o6", "recordar", "¿Qué dice Salmos 126:3 de lo que ha hecho Jehová?", "Que ha hecho grandes cosas con nosotros", ["Que ha hecho poco", "Que no ha hecho nada", "Que ha hecho cosas tristes"], "«Grandes cosas ha hecho Jehová con nosotros».", "Salmos 126:3"],
    ["f53", 6, "o6", "recordar", "¿Qué hicieron Pablo y Apolos, según 1 Corintios 3:6?", "Pablo plantó y Apolos regó", ["Pablo regó y Apolos cosechó", "Los dos predicaron en Roma", "Pablo construyó y Apolos pintó"], "«Yo planté, Apolos regó».", "1 Corintios 3:6"],
    ["f54", 6, "o6", "comprender", "¿Qué son las voces en la evaluación de un proyecto?", "Lo que dicen las personas servidas, los voluntarios, los maestros y los vecinos", ["Los cantos del culto", "Los rumores", "Solo la opinión del pastor"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
    ["f55", 6, "o6", "comprender", "¿Qué se cuida al contar la historia de una familia servida?", "Su permiso y su dignidad, sin datos privados", ["Que se vea su foto", "Que se diga su dirección", "Nada"], "«Grandes cosas ha hecho Jehová con nosotros».", "Salmos 126:3"],
    ["f56", 6, "o6", "analizar", "¿Por qué medir para aprender es mejor que medir para presumir?", "Porque cuenta también lo que no salió bien, y así el proyecto mejora", ["Porque presumir es más fácil", "No es mejor", "Porque los números no importan"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
    ["f57", 6, "o6", "aplicar", "Tus clases de inglés cumplen seis meses. ¿Cómo sabes si funcionan?", "Mides la asistencia, haces una prueba al principio y a los seis meses, y escuchas a los alumnos y a los maestros", ["Por cuántos se inscribieron el primer día", "Por lo que diga el pastor", "No hace falta saberlo"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
    ["f58", 6, "o6", "aplicar", "Un voluntario quiere publicar en las redes las fotos de las familias de la despensa con sus nombres. ¿Qué le dices?", "Que no se publican sin su permiso, y nunca con datos privados", ["Que las publique", "Que las mande a todos los grupos", "Que publique solo los nombres"], "«Grandes cosas ha hecho Jehová con nosotros; Estaremos alegres».", "Salmos 126:3"],
    ["f59", 6, "o6", "aplicar", "Tienes que presentar los resultados del año a la iglesia. ¿Qué incluyes?", "Lo que hicimos, lo que cambió, lo que vamos a mejorar y las gracias a Dios y a los que ayudaron", ["Solo los números grandes", "Solo las fotos", "Solo lo que hizo el líder"], "«pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6"],
    ["f60", 6, "o6", "evaluar", "¿Qué evaluación de un proyecto es la mejor?", "Una que mide lo que hacemos y lo que cambia, escucha las voces, cuida la privacidad, ajusta el plan y da gracias a Dios", ["Una que solo cuenta despensas", "Una que publica todo sin permiso", "Una que nunca se hace"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué son los creyentes, según Mateo 5:14?", "La luz del mundo", ["La sal de la ciudad", "Los dueños del mundo", "Extraños en el mundo"], "«Vosotros sois la luz del mundo».", "Mateo 5:14"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué se ora por la ciudad además de servirla?", "Porque Dios lo mandó y porque solo él da la paz verdadera", ["Porque orar reemplaza servir", "Porque es costumbre", "No hace falta"], "«y rogad por ella a Jehová».", "Jeremías 29:7"],
      ["m1-03", 1, "o1", "aplicar", "Un grupo de jóvenes quiere servir al barrio y propone diez actividades distintas en un mes. ¿Qué le aconsejas?", "Escoger con los vecinos una necesidad y sostener un solo proyecto bien hecho", ["Hacer las diez", "No hacer nada", "Hacerlas sin preguntar"], "«En el bien de los justos la ciudad se alegra».", "Proverbios 11:10"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué la iglesia no se esconde de su barrio?", "Porque es la luz del mundo y alumbra con buenas obras y con el evangelio", ["Porque quiere fama", "Porque así lo pide la ciudad", "Sí debe esconderse"], "«una ciudad asentada sobre un monte no se puede esconder».", "Mateo 5:14"],
      ["m1-05", 1, "o1", "recordar", "¿Qué hace la ciudad en el bien de los justos, según Proverbios 11:10?", "Se alegra", ["Se entristece", "Se enoja", "Se calla"], "«En el bien de los justos la ciudad se alegra».", "Proverbios 11:10"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué iglesia busca mejor el bien de su ciudad?", "La que ora por ella, escucha a los vecinos y sostiene un proyecto que responde a una necesidad real", ["La que solo se preocupa por sus miembros", "La que hace actividades para la foto", "La que espera que el barrio venga"], "«procurad la paz de la ciudad».", "Jeremías 29:7"],
      ["m1-07", 2, "o2", "recordar", "¿Por dónde subió Nehemías de noche para observar el muro, según Nehemías 2:15?", "Por el torrente", ["Por la puerta del palacio", "Por el templo", "Por el mar"], "«subí de noche por el torrente».", "Nehemías 2:15"],
      ["m1-08", 2, "o2", "comprender", "¿Qué son las instituciones en el mapa de los recursos?", "Las escuelas, las bibliotecas, las clínicas, los parques y las oficinas de la ciudad", ["Los vecinos", "Los negocios pequeños", "Las ligas deportivas"], "«y observé el muro».", "Nehemías 2:15"],
      ["m1-09", 2, "o2", "aplicar", "Tu equipo tiene que preguntar a una escuela del barrio qué necesita. ¿Cómo lo hace?", "Pide una cita con sus encargados, escucha con respeto y pregunta también qué pueden hacer juntos", ["Llega sin avisar a pedir alumnos", "Manda una carta con un sermón", "No va a la escuela"], "«Mas el hombre entendido lo alcanzará».", "Proverbios 20:5"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué preguntar a un vecino qué sabe hacer es una forma de servir?", "Porque le devuelve la dignidad de ser parte de la solución", ["Porque así trabaja gratis", "No es servir", "Porque se le puede pedir dinero"], "«Como aguas profundas es el consejo en el corazón del hombre».", "Proverbios 20:5"],
      ["m1-11", 2, "o2", "comprender", "¿Qué hizo Jesús con los panes del muchacho, según Juan 6:11?", "Dio gracias y los repartió", ["Los guardó", "Los vendió", "Los devolvió"], "«y habiendo dado gracias, los repartió».", "Juan 6:11"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué mapa del barrio ayuda más a un proyecto?", "Uno con las necesidades y también con los recursos: personas, asociaciones, instituciones, lugares y negocios", ["Uno con solo los problemas", "Uno con solo las iglesias", "Uno hecho sin salir de la oficina"], "«Aquí está un muchacho, que tiene cinco panes».", "Juan 6:9"],
      ["m1-13", 3, "o3", "recordar", "¿Hasta dónde llegó el muro cuando el pueblo tuvo ánimo para trabajar, según Nehemías 4:6?", "Hasta la mitad de su altura", ["Hasta el cielo", "Hasta el río", "Hasta la puerta del rey"], "«y toda la muralla fue terminada hasta la mitad de su altura».", "Nehemías 4:6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué son las actividades de un proyecto?", "Lo que se hará, cuándo, dónde y con quiénes", ["El cambio que se quiere ver", "El dinero del banco", "Los nombres de los vecinos"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
      ["m1-15", 3, "o3", "aplicar", "Alguien del equipo propone medir la tutoría solo por cuántos niños vinieron. ¿Qué agregas?", "Las notas de la escuela y lo que digan los padres y los maestros, para ver lo que cambió", ["Nada más", "Las fotos", "El número de meriendas"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué los vecinos trabajan con más ánimo cuando diseñan el proyecto?", "Porque lo sienten suyo, como el pueblo de Nehemías con su muro", ["Porque les pagan", "Porque los obligan", "No trabajan con más ánimo"], "«porque el pueblo tuvo ánimo para trabajar».", "Nehemías 4:6"],
      ["m1-17", 3, "o3", "recordar", "¿Quiénes restauraron el muro desde la puerta de los Caballos, según Nehemías 3:28?", "Los sacerdotes", ["Los soldados", "Los mercaderes", "Los extranjeros"], "«Desde la puerta de los Caballos restauraron los sacerdotes».", "Nehemías 3:28"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué propósito de un proyecto está mejor escrito?", "Que 20 niños de tercero a sexto grado mejoren en lectura este año", ["Ayudar a los niños", "Hacer algo bueno", "Abrir el salón los martes"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hicieron con el Rey cuando tuvo sed, según Mateo 25:35?", "Le dieron de beber", ["Le dieron la espalda", "Le cobraron el agua", "Nada"], "«tuve sed, y me disteis de beber».", "Mateo 25:35"],
      ["m2-02", 4, "o4", "comprender", "¿Qué agregó la Ley Pública 117-362, de enero de 2023?", "La protección cuando los alimentos se entregan a un precio reducido que solo cubre los costos, y para algunos negocios que donan directamente a los necesitados", ["La obligación de vender la comida", "La prohibición de donar alimentos", "Nada"], "«Porque dio de su pan al indigente».", "Proverbios 22:9"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que capacitar a los voluntarios de la despensa. ¿Qué les enseñas?", "A revisar las fechas, apartar las latas hinchadas, abolladas en la costura o que gotean, y tratar a las familias con dignidad", ["A repartir rápido sin revisar", "A preguntarle a cada familia su religión", "A guardar los alimentos en sus casas"], "«Dadles vosotros de comer».", "Marcos 6:37"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la iglesia que reparte alimentos cumple las reglas para guardarlos y manejarlos?", "Para cuidar la salud de las familias, y porque la ley de Texas la protege si las cumple en lo sustancial", ["Porque así gasta más", "No hace falta", "Porque lo pide el pastor"], "«El ojo misericordioso será bendito».", "Proverbios 22:9"],
      ["m2-05", 4, "o4", "aplicar", "Un voluntario quiere ayudar en la tutoría a un niño a solas y con la puerta cerrada. ¿Qué le dices?", "Que siempre hay dos adultos y la puerta abierta, para proteger a los niños y a los voluntarios", ["Que está bien", "Que lo haga en su casa", "Que no avise a los padres"], "«tuve hambre, y me disteis de comer».", "Mateo 25:35"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué proyecto con niños está mejor cuidado?", "Uno con voluntarios revisados y capacitados, dos adultos, el permiso de los padres y el reporte inmediato de cualquier sospecha de abuso", ["Uno donde cualquiera ayuda", "Uno sin el permiso de los padres", "Uno donde se tapan los problemas"], "«Porque tuve hambre, y me disteis de comer».", "Mateo 25:35"],
      ["m2-07", 5, "o5", "recordar", "¿Qué tendremos siempre en todas las cosas, según 2 Corintios 9:8?", "Todo lo suficiente", ["Nada", "Más que todos", "Solo lo justo para un día"], "«teniendo siempre en todas las cosas todo lo suficiente».", "2 Corintios 9:8"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué se hace un presupuesto con un margen?", "Para cubrir lo imprevisto sin que el proyecto se detenga", ["Para gastar más", "Para esconder dinero", "No hace falta"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m2-09", 5, "o5", "aplicar", "Tu iglesia quiere abrir un proyecto grande que no sabe si podrá sostener. ¿Qué le aconsejas?", "Empezar con un proyecto pequeño que pueda sostener, calcular los gastos y crecer después", ["Empezar en grande y ver qué pasa", "No hacer nada nunca", "Pedir un préstamo grande"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué Jesús mandó recoger lo que sobró, si acababa de multiplicar los panes?", "Porque el que confía en la provisión de Dios también cuida lo que recibe", ["Porque faltaba comida", "Para venderlo", "No lo mandó"], "«para que no se pierda nada».", "Juan 6:12"],
      ["m2-11", 5, "o5", "comprender", "¿Qué cuentas claras pide un proyecto?", "Que dos personas registren lo que entra y lo que sale, y que se informe a la iglesia y a los que donaron", ["Que una sola persona guarde todo", "Que no se informe", "Que se registre solo lo grande"], "«Recoged los pedazos que sobraron».", "Juan 6:12"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué manera de sostener un proyecto es la mejor?", "Formar nuevos líderes del barrio, tener varias fuentes de apoyo y gastar con cuidado", ["Depender de un solo donante", "Que lo haga todo una persona", "Gastarlo todo al principio"], "«poderoso es Dios para hacer que abunde en vosotros toda gracia».", "2 Corintios 9:8"],
      ["m2-13", 6, "o6", "recordar", "¿Cómo dice Salmos 126:3 que estaremos?", "Alegres", ["Tristes", "Cansados", "Callados"], "«Estaremos alegres».", "Salmos 126:3"],
      ["m2-14", 6, "o6", "comprender", "¿Qué es medir lo que cambia en un proyecto?", "Ver el bien en la vida de las personas, como leer mejor o conseguir trabajo", ["Contar las sillas", "Contar los voluntarios", "Ver el dinero gastado"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
      ["m2-15", 6, "o6", "aplicar", "Una evaluación muestra que casi nadie va a las clases de los sábados. ¿Qué haces?", "Preguntas a los alumnos por qué, ajustas el horario o el lugar y vuelves a medir", ["Cierras sin preguntar", "Sigues igual", "Culpas a los alumnos"], "«Meditad bien sobre vuestros caminos».", "Hageo 1:5"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué se dan gracias a Dios al celebrar los resultados?", "Porque el crecimiento lo da él, aunque nosotros plantemos y reguemos", ["Porque es costumbre", "Porque el equipo no hizo nada", "No hace falta"], "«pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6"],
      ["m2-17", 6, "o6", "comprender", "¿Por qué se guardan con cuidado los datos de las familias servidas?", "Para proteger su privacidad y su dignidad", ["Para venderlos", "Para publicarlos", "No hace falta"], "«Grandes cosas ha hecho Jehová con nosotros».", "Salmos 126:3"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué celebración de un proyecto es la mejor?", "Una que da gracias a Dios, cuenta historias con permiso, reconoce a los que ayudaron y presenta lo que se va a mejorar", ["Una que solo muestra números", "Una con fotos sin permiso", "Una donde se presume del equipo"], "«Grandes cosas ha hecho Jehová con nosotros; Estaremos alegres».", "Salmos 126:3"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "obra-social-3-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, por qué la iglesia busca el bien de su ciudad y qué hace que algo sea un proyecto comunitario.",
      ideas: [
        { id: "ciudad", peso: 30, texto: "Dios mandó procurar la paz de la ciudad y orar por ella; la iglesia es luz.", formas: ["la paz de la ciudad", "procurar la paz", "luz del mundo", "orar por la ciudad", "rogar por ella", "shalom"] },
        { id: "necesidad", peso: 30, texto: "Responde a una necesidad real, con la comunidad.", formas: ["necesidad real", "con la comunidad", "los vecinos", "escuchar*", "participan"] },
        { id: "orden", peso: 30, texto: "Tiene propósito, tiempo y responsables, y se mide y se sostiene.", formas: ["proposito", "responsables", "se mide", "medir", "se sostiene", "sostenido", "evalua*"] },
      ],
      citas: ["Jeremías 29:7", "Mateo 5:14", "Proverbios 11:10", "Mateo 5:14-16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios mandó a su pueblo procurar la paz de la ciudad y orar por ella, porque en su paz tendría paz (Jeremías 29:7), y la iglesia es luz del mundo. Un proyecto comunitario responde a una necesidad real, se hace con los vecinos, tiene propósito, tiempo y responsables, y se mide y se sostiene.",
    },
    {
      id: "obra-social-3-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, por qué se conocen los recursos del barrio y no solo sus necesidades.",
      ideas: [
        { id: "observar", peso: 30, texto: "Se conoce la realidad antes de actuar, como Nehemías.", formas: ["nehemias", "observo", "observar", "antes de actuar", "caminar el barrio", "conocer la realidad"] },
        { id: "recursos", peso: 30, texto: "Las personas y sus dones, las asociaciones, las instituciones, los lugares y los negocios.", formas: ["dones", "asociaciones", "instituciones", "las escuelas", "negocios", "lo que saben hacer"] },
        { id: "parte", peso: 30, texto: "Los vecinos se vuelven parte de la solución; se empieza con lo que hay, como los cinco panes.", formas: ["parte de la solucion", "cinco panes", "lo que hay", "se sostiene", "dignidad", "kretzmann"] },
      ],
      citas: ["Nehemías 2:15", "Nehemías 2:13-15", "Juan 6:9", "Juan 6:11", "Proverbios 20:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Antes de actuar se conoce la realidad, como Nehemías, que observó el muro de noche (Nehemías 2:15). Se buscan también los recursos: las personas y sus dones, las asociaciones, las instituciones y los negocios. Así los vecinos se vuelven parte de la solución, y se empieza con lo que hay, como los cinco panes del muchacho.",
    },
    {
      id: "obra-social-3-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo se diseña un proyecto con la comunidad y qué diferencia hay entre lo que hacemos y lo que cambia.",
      ideas: [
        { id: "consejo", peso: 30, texto: "Se diseña con muchos consejeros, con los vecinos, y se reparte el trabajo.", formas: ["consejeros", "con los vecinos", "repart*", "frente a su casa", "en equipo"] },
        { id: "partes", peso: 30, texto: "Propósito, actividades, recursos y responsables.", formas: ["proposito", "actividades", "recursos", "responsables"] },
        { id: "cambio", peso: 30, texto: "Lo que hacemos son las actividades; lo que cambia es el bien en la vida de las personas.", formas: ["la vida de las personas", "en su vida", "en sus vidas", "consigu* trabajo", "leen mejor", "despensas"] },
      ],
      citas: ["Proverbios 15:22", "Nehemías 3:28", "Nehemías 4:6", "Nehemías 3:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un proyecto se diseña con los vecinos, porque en la multitud de consejeros los planes se afirman (Proverbios 15:22), y se reparte el trabajo. Tiene propósito, actividades, recursos y responsables. Lo que hacemos son las actividades, como repartir despensas; lo que cambia es el bien en la vida de las personas, como conseguir trabajo.",
    },
    {
      id: "obra-social-3-e4",
      tipo: "breve",
      pregunta:
        "Tu iglesia quiere abrir una despensa cada mes para las familias del barrio. Explica cómo la organizarías con lo que piden la Biblia y la ley, con citas bíblicas.",
      ideas: [
        { id: "banco", peso: 25, texto: "Coordinarse con el banco de alimentos y preparar dónde guardar.", formas: ["banco de alimentos", "requisitos", "un lugar limpio", "refrigera*", "guardar*"] },
        { id: "revisar", peso: 25, texto: "Revisar los alimentos y apartar las latas dañadas.", formas: ["revisar*", "las fechas", "hinchad*", "abollad*", "gotea*"] },
        { id: "ley", peso: 25, texto: "La ley protege al que dona y reparte de buena fe, salvo la negligencia grave.", formas: ["buena fe", "bill emerson", "capitulo 76", "negligencia grave", "la ley de texas", "donante de buena fe"] },
        { id: "digno", peso: 25, texto: "Repartir gratis, con trato digno, y ofrecer otras ayudas.", formas: ["gratis", "trato digno", "dignidad", "por horario*", "confidencial*", "otras ayudas", "espiga*"] },
      ],
      basta: 85,
      citas: ["Marcos 6:37", "Proverbios 22:9", "Mateo 25:35", "Mateo 25:35-40", "Juan 6:12", "Levítico 19:9-10", "Isaías 58:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero hablaría con el banco de alimentos de la zona para conocer sus requisitos, y prepararíamos un lugar limpio y seco para guardar los alimentos, con refrigeración para los fríos. Capacitaríamos a los voluntarios para revisar las fechas y apartar las latas hinchadas, abolladas en la costura o que gotean, porque no son alimentos aparentemente sanos. La ley Bill Emerson y la ley de Texas protegen a los que donan y reparten de buena fe, salvo la negligencia grave, si se cumplen las reglas para guardar y manejar los alimentos. Repartiríamos gratis, por horarios, con un trato digno y guardando la confidencialidad, porque Jesús dijo: Dadles vosotros de comer (Marcos 6:37), y el ojo misericordioso es bendito porque da de su pan al indigente (Proverbios 22:9). Y ofreceríamos a las familias otras ayudas, como clases o una bolsa de trabajo, para que salgan adelante.",
    },
    {
      id: "obra-social-3-e5",
      tipo: "breve",
      pregunta:
        "Dos maestros jubilados sostienen desde hace un año la tutoría del barrio, ya están cansados y se acabó el dinero de la merienda. Explica cómo harías que el proyecto dure, con citas bíblicas.",
      ideas: [
        { id: "evaluar", peso: 25, texto: "Reunir al equipo y a los padres para mirar cómo va.", formas: ["reunir*", "mirar juntos", "evaluar", "como va", "con los padres"] },
        { id: "voluntarios", peso: 25, texto: "Invitar y capacitar a nuevos voluntarios del barrio y repartir la carga.", formas: ["nuevos voluntarios", "capacitar*", "repartir la carga", "calendario", "padres y jovenes", "nuevos lideres"] },
        { id: "fuentes", peso: 25, texto: "Buscar varias fuentes de apoyo y hacer un presupuesto con margen.", formas: ["varios negocios", "varias fuentes", "presupuesto", "margen", "donacion*"] },
        { id: "cuentas", peso: 25, texto: "Informar a los que donaron y dar gracias.", formas: ["informar*", "dar gracias", "cuentas claras", "lo que se logro", "agradec*"] },
      ],
      basta: 85,
      citas: ["2 Corintios 9:8", "Juan 6:12", "Lucas 14:28", "Lucas 14:28-30", "Nehemías 4:6", "Nehemías 3:28", "Éxodo 18:18", "Gálatas 6:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero reuniría al equipo y a los padres para mirar juntos cómo va la tutoría y qué necesita. Invitaríamos a padres y jóvenes del barrio a servir y los capacitaríamos con los dos maestros, para repartir la carga con un calendario de voluntarios, como en el muro de Nehemías, donde cada uno trabajó frente a su casa (Nehemías 3:28). Para la merienda pediríamos ayuda a varios negocios del barrio, en vez de depender de uno solo, y haríamos el presupuesto del año siguiente con un margen, calculando antes los gastos (Lucas 14:28). Cuidaríamos cada donación, como Jesús mandó recoger lo que sobró (Juan 6:12). Al final informaríamos a los que donaron lo que se logró y daríamos gracias a Dios, que es poderoso para darnos lo suficiente para toda buena obra (2 Corintios 9:8).",
    },
  ],
  breve: {
    id: "obra-social-3-b1",
    tipo: "breve",
    pregunta: "Escribe cómo haría tu iglesia un proyecto comunitario en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "ciudad", peso: 15, texto: "Buscar la paz de la ciudad y orar por ella.", formas: ["la paz de la ciudad", "luz del mundo", "orar por la ciudad", "rogar por ella", "shalom"] },
      { id: "conocer", peso: 15, texto: "Conocer el barrio: sus necesidades y sus recursos.", formas: ["mapa", "recursos", "caminar el barrio", "dones"] },
      { id: "disenar", peso: 20, texto: "Diseñar con la comunidad: propósito, actividades y responsables.", formas: ["con los vecinos", "con la comunidad", "proposito", "responsables", "actividades"] },
      { id: "cuidados", peso: 15, texto: "Los cuidados de la ley con los alimentos, los niños y la salud.", formas: ["buena fe", "revisar los alimentos", "dos adultos", "antecedentes", "24 horas", "licencia", "la ley"] },
      { id: "sostener", peso: 20, texto: "Los recursos, el presupuesto y la sostenibilidad.", formas: ["presupuesto", "margen", "varias fuentes", "cuentas claras", "que dure"] },
      { id: "medir", peso: 15, texto: "Medir lo que cambia y celebrar.", formas: ["lo que cambia", "medir*", "evaluar*", "celebrar*", "dar gracias"] },
    ],
    basta: 85,
    citas: ["Jeremías 29:7", "Mateo 5:14", "Proverbios 11:10", "Nehemías 2:15", "Juan 6:9", "Proverbios 20:5", "Proverbios 15:22", "Nehemías 3:28", "Nehemías 4:6", "Marcos 6:37", "Proverbios 22:9", "Mateo 25:35", "2 Corintios 9:8", "Juan 6:12", "Lucas 14:28", "Hageo 1:5", "1 Corintios 3:6", "Salmos 126:3"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año buscaríamos la paz de la ciudad y oraríamos por ella, como Dios mandó a su pueblo (Jeremías 29:7). Primero conoceríamos el barrio como Nehemías conoció el muro (Nehemías 2:15): caminaríamos sus calles, escucharíamos a los vecinos y haríamos el mapa de sus necesidades y de sus recursos, con las personas y sus dones. Con los vecinos escogeríamos una necesidad, por ejemplo una tutoría para los niños, y diseñaríamos juntos el proyecto, con propósito, actividades y responsables, porque en la multitud de consejeros los planes se afirman (Proverbios 15:22). Tendríamos los cuidados que pide la ley: voluntarios revisados, dos adultos con los niños, el permiso de los padres y el reporte de cualquier sospecha de abuso de inmediato, y en 24 horas los profesionales. Haríamos un presupuesto con margen, buscaríamos varias fuentes de apoyo y llevaríamos cuentas claras, calculando antes los gastos (Lucas 14:28), para que el proyecto dure. Y al final mediríamos lo que cambia en la vida de los niños, contaríamos sus historias con permiso y daríamos gracias a Dios, porque el crecimiento lo da él (1 Corintios 3:6).",
  },
};
