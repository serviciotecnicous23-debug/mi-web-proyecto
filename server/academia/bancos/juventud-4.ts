/**
 * El banco de «Liderazgo juvenil» (especialidad Juventud, materia 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 los jóvenes que Dios usó para guiar y qué es liderar · o2 liderar sirviendo · o3 el carácter del líder
 * joven · o4 el equipo de liderazgo juvenil · o5 planear y dirigir la reunión de jóvenes · o6 proteger, evaluar y pasar
 * la posta · o7 el versículo de memoria (Josué 1:9). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de
 * memoria, al menos un 20 % de casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `juventud-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_JUVENTUD_4: BancoMateria = {
  materia: "juventud-4",
  repaso: {
    "juventud-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿En nombre de quién enfrentó David a Goliat, según 1 Samuel 17:45?", "En el nombre de Jehová de los ejércitos", ["En el nombre de Saúl", "En su propio nombre", "En el nombre de su padre"], "«mas yo vengo a ti en el nombre de Jehová de los ejércitos, el Dios de los escuadrones de Israel».", "1 Samuel 17:45"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es liderar según la Biblia?", "Influir para que otros se acerquen a Dios, servir, vivir lo que se enseña y saber hacia dónde ir", ["Mandar sobre los demás", "Tener el micrófono", "Ser el más popular"], "David no confió en sí mismo, sino en Dios: «yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
      ["1-r3", 1, "o1", "aplicar", "Un adulto de la iglesia dice que un joven de quince años es muy chico para servir en el ministerio. ¿Qué le muestras?", "Que Dios usó a jóvenes como David y Daniel, y que el joven puede empezar con algo pequeño y acompañado", ["Que tiene razón", "Que el joven debe dirigir todo", "Que la edad no importa nunca"], "A David le dijeron: «porque tú eres muchacho», pero Dios lo usó.", "1 Samuel 17:33"],
    ] as P[]).map(p),
    "juventud-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Para qué vino el Hijo del Hombre, según Marcos 10:45?", "Para servir, y para dar su vida en rescate por muchos", ["Para ser servido", "Para gobernar Roma", "Para juzgar a los pobres"], "«Porque el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».", "Marcos 10:43-45"],
      ["2-r2", 2, "o2", "comprender", "¿Qué diferencia hay entre el liderazgo de servicio y el de poder?", "El de servicio pregunta a quién puede servir; el de poder, quién lo sirve a él", ["No hay diferencia", "El de poder sirve más", "El de servicio no tiene autoridad"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43-45"],
      ["2-r3", 2, "o2", "aplicar", "Un joven líder se enoja porque no le tocó cantar en la reunión. ¿Qué haces?", "Hablas con él en privado sobre el ejemplo de Jesús y le das una tarea de servicio", ["Le das el micrófono para que no se enoje", "Lo expulsas del equipo", "Lo regañas delante de todos"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:14-15"],
    ] as P[]).map(p),
    "juventud-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué mira Jehová, según 1 Samuel 16:7?", "El corazón", ["La estatura", "La apariencia", "La riqueza"], "«pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón».", "1 Samuel 16:7"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué el carácter importa más que el talento en un líder?", "Porque el talento lleva a un lugar, pero solo el carácter lo sostiene allí", ["Porque el talento no sirve", "Porque el carácter se ve más", "No importa más"], "«Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».", "Proverbios 4:23"],
      ["3-r3", 3, "o3", "aplicar", "Un joven con mucho talento se burla de los que se equivocan. ¿Qué haces antes de ponerlo al frente?", "Hablar con él a solas, mostrarle la Palabra y darle un tiempo para crecer en humildad, acompañado", ["Ponerlo al frente igual", "Burlarte de él", "Ignorar el problema"], "«Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu».", "Proverbios 16:18"],
    ] as P[]).map(p),
    "juventud-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué respondió el pueblo cuando Nehemías compartió la visión, según Nehemías 2:18?", "Levantémonos y edifiquemos", ["No podemos", "Que lo haga otro", "Esperemos al rey"], "«Y dijeron: Levantémonos y edifiquemos. Así esforzaron sus manos para bien».", "Nehemías 2:17-18"],
      ["4-r2", 4, "o4", "comprender", "¿Qué enseña la historia de Marcos sobre los equipos de liderazgo?", "Que en un buen equipo hay segundas oportunidades: el que falló una vez puede llegar a ser útil", ["Que el que falla no vuelve nunca", "Que no hay que tener equipos", "Que los desacuerdos no existen"], "«Toma a Marcos y tráele contigo, porque me es útil para el ministerio».", "2 Timoteo 4:11"],
      ["4-r3", 4, "o4", "aplicar", "Dos líderes de tu equipo discuten fuerte delante de los jóvenes. ¿Qué haces?", "Los llevas a hablar en privado, con la verdad en amor, y si no se resuelve, pides ayuda al pastor", ["Dejas que sigan delante de todos", "Eliges a uno y echas al otro", "Haces como que no pasa nada"], "«y todos, sumisos unos a otros, revestíos de humildad».", "1 Pedro 5:5"],
    ] as P[]).map(p),
    "juventud-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo debe hacerse todo cuando la iglesia se reúne, según 1 Corintios 14:26?", "Para edificación", ["Para entretener", "Para presumir", "Para terminar rápido"], "«Cuando os reunís, cada uno de vosotros tiene salmo, tiene doctrina», «Hágase todo para edificación».", "1 Corintios 14:26"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué la enseñanza de la reunión de jóvenes tiene un solo mensaje?", "Porque una idea clara se entiende y se recuerda mejor que muchas ideas sueltas", ["Porque no hay tiempo para la Biblia", "Porque los jóvenes no piensan", "No tiene un solo mensaje"], "«La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
      ["5-r3", 5, "o5", "aplicar", "Un joven va a dar su primera charla de diez minutos. ¿Cómo lo ayudas a prepararla?", "Con un texto, una idea, una historia, una aplicación y un ensayo frente a su líder", ["Que improvise", "Que lea un libro entero", "Que cuente chistes nada más"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    ] as P[]).map(p),
    "juventud-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué le dijo Moisés a Josué delante de todo Israel, según Deuteronomio 31:7?", "Esfuérzate y anímate", ["Descansa", "Vuelve a Egipto", "No hagas nada"], "«Y llamó Moisés a Josué, y le dijo en presencia de todo Israel: Esfuérzate y anímate».", "Deuteronomio 31:7-8"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué los menores llevan un permiso firmado y una ficha de salud a un campamento?", "Para que sus padres autoricen la salida y los líderes sepan cómo cuidarlos en una emergencia", ["Para cobrar el campamento", "Para nada", "Para castigar a los que no lo llevan"], "El líder cuida a los que guía, con la confianza de que Dios va delante: «Jehová va delante de ti; él estará contigo».", "Deuteronomio 31:7-8"],
      ["6-r3", 6, "o6", "aplicar", "Un joven líder termina la escuela y se muda a otra ciudad para estudiar. ¿Qué haces?", "Lo ayudas a encontrar una iglesia y un grupo allá, y reconoces su servicio antes de que se vaya", ["Te olvidas de él", "Le pides que no se vaya", "Le dices que ya no necesita iglesia"], "Dios acompaña a donde vaya: «Jehová tu Dios estará contigo en dondequiera que vayas».", "Josué 1:9"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Jóvenes que Dios usó para guiar
    ["f01", 1, "o1", "recordar", "¿Qué le dio Dios a Daniel y a sus amigos, según Daniel 1:17?", "Conocimiento e inteligencia en todas las letras y ciencias", ["Riquezas y palacios", "Ejércitos", "Fama en toda la tierra"], "«A estos cuatro muchachos Dios les dio conocimiento e inteligencia en todas las letras y ciencias».", "Daniel 1:17"],
    ["f02", 1, "o1", "recordar", "¿Qué le preguntaron a Ester, según Ester 4:14?", "¿Y quién sabe si para esta hora has llegado al reino?", ["¿Por qué no te quedas callada?", "¿Cuánto oro tienes?", "¿Quién es tu padre?"], "«¿Y quién sabe si para esta hora has llegado al reino?».", "Ester 4:14"],
    ["f03", 1, "o1", "comprender", "¿Por qué Saúl creía que David no podía pelear contra Goliat?", "Porque era muchacho y Goliat era un hombre de guerra desde su juventud", ["Porque David era rico", "Porque David no quería", "Porque Goliat era su amigo"], "«porque tú eres muchacho, y él un hombre de guerra desde su juventud».", "1 Samuel 17:33"],
    ["f04", 1, "o1", "comprender", "¿Qué dos clases de líderes hay en el ministerio juvenil?", "Los adultos que acompañan y los jóvenes que empiezan a liderar bajo su guía", ["Solo el pastor", "Los ricos y los pobres", "Solo los que cantan"], "Dios usa a jóvenes y a mayores; a Daniel y a sus amigos, siendo muchachos, «Dios les dio conocimiento e inteligencia».", "Daniel 1:17"],
    ["f05", 1, "o1", "analizar", "¿Qué tienen en común David, Daniel y Ester como líderes jóvenes?", "Que confiaron en Dios y él los puso en un lugar donde podían hacer una diferencia", ["Que eran mayores de edad", "Que no tenían miedo de nada", "Que nunca se equivocaron"], "«¿Y quién sabe si para esta hora has llegado al reino?».", "Ester 4:14"],
    ["f06", 1, "o1", "evaluar", "¿Qué joven muestra mejor las señales de un futuro líder?", "El que es fiel en lo poco, sirve sin que se lo pidan, tiene hambre de Dios y buen testimonio", ["El más popular de la escuela", "El que habla más fuerte", "El que siempre quiere estar al frente"], "Dios mira el corazón: David fue en el nombre de Jehová, no en su propia fuerza: «mas yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
    ["f07", 1, "o1", "aplicar", "Una joven siempre recibe a los nuevos y se sienta con el que está solo. ¿Qué haces?", "La invitas a servir en algo pequeño, como el equipo de bienvenida, y la acompañas", ["Nada: ya hace bastante", "La pones a dirigir todo el ministerio", "Le dices que deje de hacerlo"], "Dios pone a los jóvenes donde pueden hacer una diferencia: «para esta hora has llegado al reino».", "Ester 4:14"],
    ["f08", 1, "o1", "aplicar", "Un joven tiene miedo de liderar porque cree que no está preparado. ¿Qué le muestras?", "Que David fue en el nombre de Jehová y no en su fuerza, y que Dios prepara a los suyos en el camino", ["Que tiene razón y espere", "Que no necesita a Dios", "Que finja seguridad"], "«mas yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
    ["f09", 1, "o1", "aplicar", "Tienes que buscar nuevos líderes para el ministerio juvenil. ¿En qué te fijas primero?", "En su fidelidad, su servicio y su testimonio, más que en su popularidad", ["En quién tiene más seguidores en las redes", "En quién habla mejor", "En quién es más alto"], "Dios mira el corazón: «Jehová no mira lo que mira el hombre».", "1 Samuel 16:7"],
    ["f10", 1, "o7", "recordar", "Completa Josué 1:9: Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes…", "porque Jehová tu Dios estará contigo en dondequiera que vayas", ["porque tú eres fuerte", "porque nadie te vencerá nunca", "porque tus soldados son muchos"], "«Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas».", "Josué 1:9"],
    // Lección 2 · Liderar sirviendo
    ["f11", 2, "o2", "recordar", "¿Qué debe ser el que quiera ser el primero, según Marcos 10:44?", "Siervo de todos", ["El jefe de todos", "El más rico", "El más famoso"], "«y el que de vosotros quiera ser el primero, será siervo de todos».", "Marcos 10:43-45"],
    ["f12", 2, "o2", "recordar", "¿Qué hizo Jesús con sus discípulos antes de decirles que les había dado ejemplo, según Juan 13:14?", "Les lavó los pies", ["Les dio dinero", "Les dio órdenes", "Los envió a casa"], "«Pues si yo, el Señor y el Maestro, he lavado vuestros pies, vosotros también debéis lavaros los pies los unos a los otros».", "Juan 13:14-15"],
    ["f13", 2, "o2", "recordar", "¿Cómo debemos estimar a los demás, según Filipenses 2:3?", "Como superiores a nosotros mismos", ["Como inferiores", "Como rivales", "Como extraños"], "«antes bien con humildad, estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
    ["f14", 2, "o2", "comprender", "¿Qué hace el líder de servicio con lo que nadie ve?", "También lo hace, como acomodar el salón o limpiar después", ["Lo deja para otros", "Lo evita", "Lo hace solo si lo filman"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:14-15"],
    ["f15", 2, "o2", "comprender", "¿Qué hace el líder de servicio cuando lo corrigen?", "Escucha y aprende", ["Se ofende", "Se va del equipo", "Culpa a otros"], "«Nada hagáis por contienda o por vanagloria; antes bien con humildad».", "Filipenses 2:3-4"],
    ["f16", 2, "o2", "analizar", "¿Por qué Jesús enseñó el servicio con una toalla y no solo con palabras?", "Porque el ejemplo enseña más que el discurso, y los discípulos debían hacer lo mismo", ["Porque no sabía hablar", "Porque era una costumbre sin sentido", "Para avergonzarlos"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:14-15"],
    ["f17", 2, "o2", "analizar", "¿Qué pasa en un ministerio juvenil donde el líder solo busca que lo sirvan?", "Los jóvenes aprenden a buscar el poder y no a servir", ["Todo funciona mejor", "Los jóvenes aprenden a servir", "Nada"], "«Pero no será así entre vosotros, sino que el que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43-45"],
    ["f18", 2, "o2", "aplicar", "Tienes que enseñar a los jóvenes líderes qué es servir. ¿Qué haces primero?", "Servir delante de ellos: llegar temprano, limpiar después y acercarte al que está solo", ["Darles una lista de órdenes", "Pedirles que te sirvan a ti", "Hablarles del poder"], "«Porque el Hijo del Hombre no vino para ser servido, sino para servir».", "Marcos 10:43-45"],
    ["f19", 2, "o2", "aplicar", "Un joven del equipo dice que limpiar después de la reunión no es tarea de líderes. ¿Qué le respondes?", "Que Jesús, el Señor y Maestro, lavó los pies de sus discípulos y nos dio ejemplo", ["Que tiene razón", "Que lo haga el conserje", "Que se vaya del equipo"], "«Pues si yo, el Señor y el Maestro, he lavado vuestros pies, vosotros también debéis lavaros los pies los unos a los otros».", "Juan 13:14-15"],
    ["f20", 2, "o2", "evaluar", "¿Qué líder juvenil se parece más a Jesús?", "El que sirve, forma a otros para que crezcan y escucha la corrección", ["El que se rodea de los que lo aplauden", "El que quiere siempre el micrófono", "El que manda sin escuchar"], "«antes bien con humildad, estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
    // Lección 3 · El carácter del líder joven
    ["f21", 3, "o3", "recordar", "¿Qué viene antes de la caída, según Proverbios 16:18?", "La altivez de espíritu", ["La humildad", "La alegría", "El trabajo"], "«Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu».", "Proverbios 16:18"],
    ["f22", 3, "o3", "recordar", "¿A qué exhortó Pablo a los jóvenes, según Tito 2:6?", "A que sean prudentes", ["A que sean ricos", "A que sean famosos", "A que no estudien"], "«Exhorta asimismo a los jóvenes a que sean prudentes».", "Tito 2:6-7"],
    ["f23", 3, "o3", "recordar", "¿Qué hacía Pablo con su cuerpo, según 1 Corintios 9:27?", "Lo golpeaba y lo ponía en servidumbre", ["Lo descuidaba", "Lo adoraba", "Lo dejaba hacer lo que quisiera"], "«sino que golpeo mi cuerpo, y lo pongo en servidumbre».", "1 Corintios 9:24-27"],
    ["f24", 3, "o3", "comprender", "¿Qué significa la integridad en un líder joven?", "Ser el mismo en la iglesia, en la escuela, en casa y en las redes", ["Tener mucho talento", "No equivocarse nunca", "Ser popular"], "«presentándote tú en todo como ejemplo de buenas obras».", "Tito 2:6-7"],
    ["f25", 3, "o3", "comprender", "¿Por qué el líder guarda primero su corazón?", "Porque de él mana la vida, y lo que hay en el corazón termina saliendo en la conducta", ["Porque el corazón no importa", "Porque así no tiene que cuidar lo demás", "No lo guarda"], "«Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».", "Proverbios 4:23"],
    ["f26", 3, "o3", "analizar", "¿Por qué Pablo temía ser eliminado después de haber predicado a otros?", "Porque un líder que no se disciplina puede caer, aunque haya enseñado a otros", ["Porque predicaba mal", "Porque no creía en lo que predicaba", "No lo temía"], "«no sea que habiendo sido heraldo para otros, yo mismo venga a ser eliminado».", "1 Corintios 9:24-27"],
    ["f27", 3, "o3", "aplicar", "Un joven líder publica en las redes cosas que no diría en la iglesia. ¿Qué área de su carácter necesita trabajar?", "La integridad: ser el mismo en todas partes", ["El talento musical", "La puntualidad", "Ninguna"], "«presentándote tú en todo como ejemplo de buenas obras».", "Tito 2:6-7"],
    ["f28", 3, "o3", "aplicar", "Tienes que elegir entre un joven muy talentoso pero orgulloso y otro fiel y humilde para dirigir un grupo. ¿A quién eliges, y qué haces con el otro?", "Al fiel y humilde, y acompañas al talentoso para que crezca en humildad", ["Al talentoso, sin decirle nada", "A ninguno de los dos", "A los dos, para no ofender a nadie"], "«Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón».", "1 Samuel 16:7"],
    ["f29", 3, "o3", "aplicar", "Un joven líder promete cosas y no las cumple. ¿Qué le ayudas a trabajar?", "La disciplina: cumplir lo que promete y llegar a tiempo", ["Su manera de cantar", "Su ropa", "Nada"], "El líder se disciplina como un atleta: «Corred de tal manera que lo obtengáis».", "1 Corintios 9:24-27"],
    ["f30", 3, "o3", "evaluar", "¿Qué joven está más preparado para ponerse al frente?", "El que tiene integridad, humildad, pureza, disciplina y fidelidad, aunque tenga menos talento", ["El de más talento, aunque sea orgulloso", "El que más quiere el lugar", "El que tiene más amigos"], "«Antes del quebrantamiento es la soberbia».", "Proverbios 16:18"],
    // Lección 4 · Formar un equipo de liderazgo juvenil
    ["f31", 4, "o4", "recordar", "¿Qué propuso Nehemías al pueblo, según Nehemías 2:17?", "Venid, y edifiquemos el muro de Jerusalén", ["Huyamos de la ciudad", "Esperemos otro año", "Pidamos dinero al rey"], "«venid, y edifiquemos el muro de Jerusalén, y no estemos más en oprobio».", "Nehemías 2:17-18"],
    ["f32", 4, "o4", "recordar", "¿A quién pide Pedro que estén sujetos los jóvenes, según 1 Pedro 5:5?", "A los ancianos", ["A sus amigos", "A nadie", "A los famosos"], "«Igualmente, jóvenes, estad sujetos a los ancianos».", "1 Pedro 5:5"],
    ["f33", 4, "o4", "recordar", "¿Por qué discutieron Pablo y Bernabé, según Hechos 15:37-38?", "Porque Bernabé quería llevar a Marcos, que se había apartado de ellos en un viaje anterior", ["Por dinero", "Por una herencia", "Por quién predicaba más"], "«pero a Pablo no le parecía bien llevar consigo al que se había apartado de ellos desde Panfilia».", "Hechos 15:37-39"],
    ["f34", 4, "o4", "comprender", "¿Qué hace un joven líder en el equipo del ministerio juvenil?", "Ayuda en la alabanza, la bienvenida, los medios, los juegos o los grupos, siempre con un adulto", ["Dirige todo solo", "Reemplaza a los pastores", "No hace nada"], "«jóvenes, estad sujetos a los ancianos; y todos, sumisos unos a otros».", "1 Pedro 5:5"],
    ["f35", 4, "o4", "comprender", "¿Por qué un equipo nace de una visión compartida?", "Porque cuando todos ven la meta, se levantan juntos a trabajar", ["Porque así manda uno solo", "Porque la visión no importa", "No nace así"], "«Y dijeron: Levantémonos y edifiquemos. Así esforzaron sus manos para bien».", "Nehemías 2:17-18"],
    ["f36", 4, "o4", "analizar", "¿Qué muestra que Pablo pidiera después a Marcos, aquel con quien no quiso viajar?", "Que Marcos creció y Pablo supo reconocerlo: hay segundas oportunidades", ["Que Pablo se equivocó en todo", "Que Marcos nunca cambió", "Que los desacuerdos no importan"], "«Toma a Marcos y tráele contigo, porque me es útil para el ministerio».", "2 Timoteo 4:11"],
    ["f37", 4, "o4", "aplicar", "Tienes que preparar la reunión mensual del equipo de jóvenes. ¿Con qué empiezas?", "Con oración y un pasaje corto, antes de contar, evaluar y planear", ["Con los anuncios", "Con las quejas", "Con el presupuesto"], "Todos con humildad, sumisos unos a otros: «revestíos de humildad».", "1 Pedro 5:5"],
    ["f38", 4, "o4", "aplicar", "Un joven que dejó un servicio a mitad de año quiere volver a servir. ¿Qué haces?", "Conversas con él, ves qué aprendió y le das una segunda oportunidad acompañado", ["Le dices que nunca más", "Le das el liderazgo de todo", "Lo ignoras"], "«Toma a Marcos y tráele contigo, porque me es útil para el ministerio».", "2 Timoteo 4:11"],
    ["f39", 4, "o4", "aplicar", "Tu equipo de líderes está agotado. ¿Qué incluyes en la reunión mensual?", "Un tiempo para preguntar cómo está cada líder y orar unos por otros", ["Más tareas", "Nada", "Una reprensión"], "«y todos, sumisos unos a otros, revestíos de humildad; porque: Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5"],
    ["f40", 4, "o4", "evaluar", "¿Qué equipo de liderazgo juvenil está mejor formado?", "El que tiene un líder que guía la visión, adultos que acompañan grupos, jóvenes que sirven con un adulto y personas que apoyan", ["El de un solo líder que hace todo", "El de jóvenes sin adultos", "El que nunca se reúne"], "«Levantémonos y edifiquemos. Así esforzaron sus manos para bien».", "Nehemías 2:17-18"],
    // Lección 5 · Planear y dirigir la reunión de jóvenes
    ["f41", 5, "o5", "recordar", "¿Cómo debe morar la palabra de Cristo en nosotros, según Colosenses 3:16?", "En abundancia", ["Poco a poco", "Solo los domingos", "En silencio"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ["f42", 5, "o5", "recordar", "¿Qué tiene cada uno cuando la iglesia se reúne, según 1 Corintios 14:26?", "Salmo, doctrina, lengua, revelación o interpretación", ["Nada", "Solo dinero", "Solo quejas"], "«Cuando os reunís, cada uno de vosotros tiene salmo, tiene doctrina, tiene lengua, tiene revelación, tiene interpretación».", "1 Corintios 14:26"],
    ["f43", 5, "o5", "comprender", "¿Para qué sirve el momento para conectar al comienzo de la reunión?", "Para que los jóvenes se relacionen y los nuevos se sientan parte", ["Para perder el tiempo", "Para reemplazar la Palabra", "Para terminar antes"], "Todo se hace para edificación: «Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f44", 5, "o5", "comprender", "¿Por qué conviene enseñar en series de cuatro a seis semanas?", "Porque ayudan a profundizar en un tema y a que los jóvenes inviten a sus amigos", ["Porque son más cortas", "Porque no hay que preparar", "No conviene"], "«La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
    ["f45", 5, "o5", "comprender", "¿Qué se hace en los grupos pequeños dentro de la reunión de jóvenes?", "Conversar sobre lo que oyeron y orar unos por otros", ["Jugar videojuegos", "Repetir la alabanza", "Nada"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
    ["f46", 5, "o5", "analizar", "¿Qué pasa en una reunión de jóvenes sin preparación?", "Hay tiempos muertos, juegos que no terminan y una enseñanza sin rumbo", ["Todo sale mejor", "Los jóvenes aprenden más", "Nada"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f47", 5, "o5", "aplicar", "Tienes que planear una reunión de noventa minutos para el viernes. ¿Cómo repartes el tiempo?", "Bienvenida, juego para conectar, alabanza, la Palabra, grupos pequeños y cierre, con tiempos claros", ["Una hora de juegos y nada más", "Noventa minutos de predicación", "Sin plan, como salga"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f48", 5, "o5", "aplicar", "Una joven va a enseñar y quiere hablar de cinco temas distintos en diez minutos. ¿Qué le aconsejas?", "Elegir un solo texto y una sola idea, con una historia y una aplicación", ["Que hable más rápido", "Que agregue más temas", "Que lea sin preparar"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ["f49", 5, "o5", "aplicar", "Al final de la reunión, varios menores esperan que los recojan. ¿Qué haces?", "Los entregas solo a quien los recoge o según el permiso de sus padres, y un adulto se queda hasta el final", ["Los dejas irse solos de noche", "Te vas y que esperen", "Los llevas tú solo en tu auto"], "Todo se hace con orden y para bien de todos: «Hágase todo para edificación».", "1 Corintios 14:26"],
    ["f50", 5, "o5", "evaluar", "¿Qué charla para jóvenes está mejor preparada?", "La que tiene un texto, una idea, una historia de la vida real, una aplicación para la semana y fue ensayada", ["La que tiene muchos chistes y ningún texto", "La que se improvisa", "La que lee un libro entero"], "«La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
    // Lección 6 · Proteger, evaluar y pasar la posta
    ["f51", 6, "o6", "recordar", "¿Qué le prometió Moisés a Josué sobre Jehová, según Deuteronomio 31:8?", "Que iría delante de él y no lo dejaría ni lo desampararía", ["Que lo dejaría solo", "Que le daría riquezas", "Que pelearía por él sin que hiciera nada"], "«Y Jehová va delante de ti; él estará contigo, no te dejará, ni te desamparará; no temas ni te intimides».", "Deuteronomio 31:7-8"],
    ["f52", 6, "o6", "recordar", "¿Dónde estaría Jehová con Josué, según Josué 1:9?", "En dondequiera que fuera", ["Solo en el templo", "Solo en Egipto", "En ningún lugar"], "«porque Jehová tu Dios estará contigo en dondequiera que vayas».", "Josué 1:9"],
    ["f53", 6, "o6", "comprender", "¿Por qué en un campamento hay adultos de los dos sexos y dormitorios separados?", "Para cuidar a los menores, con adultos del mismo sexo cerca de cada dormitorio", ["Para que haya más gente", "Por costumbre", "No hace falta"], "El líder protege a los que guía, como Moisés preparó a Josué para cuidar al pueblo: «Esfuérzate y anímate».", "Deuteronomio 31:7-8"],
    ["f54", 6, "o6", "comprender", "¿Qué significa pasar la posta en el liderazgo juvenil?", "Formar a otros y darles responsabilidades de a poco, hasta que puedan dirigir", ["Irse sin avisar", "Hacer todo uno mismo para siempre", "Elegir al más popular"], "Moisés preparó a Josué delante de todos: «Esfuérzate y anímate; porque tú entrarás con este pueblo».", "Deuteronomio 31:7-8"],
    ["f55", 6, "o6", "comprender", "¿Qué pregunta ayuda a evaluar si el ministerio juvenil va bien?", "¿Los jóvenes están creciendo en su fe, y no solo viniendo?", ["¿Cuánto ruido hubo?", "¿Cuántos juegos se jugaron?", "¿Quién tiene la culpa?"], "El líder se esfuerza y se evalúa, confiando en Dios: «Mira que te mando que te esfuerces y seas valiente».", "Josué 1:9"],
    ["f56", 6, "o6", "analizar", "¿Por qué Moisés preparó a Josué delante de todo Israel y no en secreto?", "Para que el pueblo reconociera a su nuevo líder y la transición fuera clara", ["Para avergonzarlo", "Porque no tenía otro lugar", "No importaba"], "«Y llamó Moisés a Josué, y le dijo en presencia de todo Israel: Esfuérzate y anímate».", "Deuteronomio 31:7-8"],
    ["f57", 6, "o6", "aplicar", "Tienes que organizar el transporte para un campamento de jóvenes. ¿Qué cuidas?", "Conductores con licencia y seguro, y un adulto más en cada vehículo", ["Que cada joven llegue como pueda", "Que un adulto lleve solo a un menor", "Que maneje un joven sin licencia"], "El líder cuida a los suyos sin temor, porque Dios va delante: «él estará contigo, no te dejará, ni te desamparará».", "Deuteronomio 31:7-8"],
    ["f58", 6, "o6", "aplicar", "Un líder de jóvenes que sirvió cinco años deja su cargo. ¿Qué haces?", "Reconocer en público su servicio y presentar con claridad a quien sigue", ["Que se vaya sin decir nada", "Esconderlo de los jóvenes", "Pedirle que no deje a nadie preparado"], "Como Moisés con Josué, la posta se pasa a la vista de todos: «le dijo en presencia de todo Israel».", "Deuteronomio 31:7-8"],
    ["f59", 6, "o6", "aplicar", "Un joven que ayuda en la alabanza ya lo hace bien con apoyo. ¿Cuál es su paso siguiente?", "Dirigir solo, con su líder cerca para acompañarlo y evaluarlo después", ["Dejar de servir", "Dirigir todo el ministerio de golpe", "Volver a empezar desde cero"], "«Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes».", "Josué 1:9"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan para un campamento de jóvenes es el más seguro?", "Permisos firmados y fichas de salud, adultos seleccionados de los dos sexos, transporte seguro, dormitorios separados, reglas claras y un plan de emergencias", ["Llevar a todos sin permisos", "Un solo adulto para cuarenta jóvenes", "Improvisar en el lugar"], "«Jehová va delante de ti; él estará contigo».", "Deuteronomio 31:7-8"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué le dijo Saúl a David sobre Goliat, según 1 Samuel 17:33?", "No podrás tú ir contra aquel filisteo, porque tú eres muchacho", ["Ve y vence", "Lleva mi ejército", "Goliat es débil"], "«Dijo Saúl a David: No podrás tú ir contra aquel filisteo, para pelear con él; porque tú eres muchacho».", "1 Samuel 17:33"],
      ["m1-02", 1, "o1", "comprender", "¿Qué significa que liderar sea influencia?", "Que el líder ayuda a otros a acercarse a Dios y a hacer su voluntad", ["Que el líder manda sin explicar", "Que el líder es famoso", "Que el líder no necesita a nadie"], "David guió a Israel confiando en Dios: «yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
      ["m1-03", 1, "o1", "aplicar", "Un joven quiere liderar, pero en su casa y en la escuela hablan mal de su conducta. ¿Qué haces?", "Lo acompañas para que crezca en su testimonio antes de darle un liderazgo", ["Lo pones a dirigir igual", "Lo expulsas", "No haces nada"], "«Jehová mira el corazón», y el testimonio muestra lo que hay en él.", "1 Samuel 16:7"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué los jóvenes líderes siempre trabajan bajo la guía de adultos?", "Porque así aprenden, se protegen y crecen con alguien que los acompaña", ["Porque no sirven", "Porque los adultos no confían en nadie", "No trabajan así"], "Dios formó a Daniel y a sus amigos en su juventud: «Dios les dio conocimiento e inteligencia».", "Daniel 1:17"],
      ["m1-05", 1, "o1", "comprender", "¿Qué muestra Daniel 6:3 sobre el liderazgo de Daniel?", "Que su espíritu y su carácter lo distinguían, y por eso le confiaron más responsabilidad", ["Que era el más rico", "Que heredó el reino", "Que nadie confiaba en él"], "«porque había en él un espíritu superior; y el rey pensó en ponerlo sobre todo el reino».", "Daniel 6:3"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué primer paso es el mejor para un joven con potencial para liderar?", "Invitarlo a servir en algo pequeño y acompañarlo", ["Ponerlo a dirigir todo de inmediato", "Esperar a que tenga treinta años", "No decirle nada"], "Dios prepara a los suyos en el camino, como a David: «yo vengo a ti en el nombre de Jehová de los ejércitos».", "1 Samuel 17:45"],
      ["m1-07", 2, "o2", "recordar", "¿Qué no debemos hacer, según Filipenses 2:3?", "Nada por contienda o por vanagloria", ["Nada por amor", "Nada por los demás", "Nada en la iglesia"], "«Nada hagáis por contienda o por vanagloria».", "Filipenses 2:3-4"],
      ["m1-08", 2, "o2", "comprender", "¿Qué pregunta se hace el líder de servicio?", "¿A quién puedo servir?", ["¿Quién me sirve?", "¿Cómo me hago famoso?", "¿Quién me aplaude?"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43-45"],
      ["m1-09", 2, "o2", "aplicar", "Un joven líder solo invita a sus amigos a servir con él. ¿Qué le enseñas?", "A formar también a otros para que crezcan, mirando por lo de los demás", ["Que siga así", "Que no invite a nadie", "Que sirva solo"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:3-4"],
      ["m1-10", 2, "o2", "analizar", "¿Qué enseña que Jesús, siendo el Señor y el Maestro, lavara los pies?", "Que nadie es demasiado importante para servir", ["Que los líderes no deben servir", "Que era una costumbre sin sentido", "Que los discípulos eran mejores"], "«Pues si yo, el Señor y el Maestro, he lavado vuestros pies, vosotros también debéis lavaros los pies los unos a los otros».", "Juan 13:14-15"],
      ["m1-11", 2, "o2", "recordar", "¿Qué dijo Jesús que les había dado a sus discípulos, según Juan 13:15?", "Ejemplo", ["Dinero", "Un reino", "Órdenes"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:14-15"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué manera de dar el micrófono a un joven es la mejor?", "Dárselo cuando sirve con gozo, y seguir acompañándolo", ["Dárselo al que más lo pide", "No dárselo nunca", "Dárselo para que no se enoje"], "«antes bien con humildad, estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
      ["m1-13", 3, "o3", "recordar", "¿De dónde mana la vida, según Proverbios 4:23?", "Del corazón", ["De las riquezas", "De la fama", "De los amigos"], "«Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».", "Proverbios 4:23"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es la fidelidad en un líder joven?", "Seguir sirviendo aunque nadie lo vea ni lo aplauda", ["Servir solo cuando lo filman", "Cambiar de iglesia seguido", "Hacer lo que quiera"], "«presentándote tú en todo como ejemplo de buenas obras».", "Tito 2:6-7"],
      ["m1-15", 3, "o3", "aplicar", "Una joven líder no puede dejar una relación que la aleja de Dios. ¿Qué área de su carácter acompañas?", "La pureza: cuidar su mente, su cuerpo y sus relaciones", ["Su voz", "Su puntualidad", "Ninguna"], "«Sobre toda cosa guardada, guarda tu corazón».", "Proverbios 4:23"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué una plataforma grande sobre un carácter pequeño lastima?", "Porque el joven puede caer por orgullo y dañarse a sí mismo y a otros", ["Porque las plataformas son malas", "Porque el talento no importa", "No lastima"], "«Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu».", "Proverbios 16:18"],
      ["m1-17", 3, "o3", "recordar", "¿Qué clase de corona buscan los creyentes, según 1 Corintios 9:25?", "Una incorruptible", ["Una de oro", "Una corruptible", "Ninguna"], "«ellos, a la verdad, para recibir una corona corruptible, pero nosotros, una incorruptible».", "1 Corintios 9:24-27"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué hace mejor un líder adulto con un joven talentoso y orgulloso?", "Habla con él en privado, le muestra la Palabra y lo acompaña un tiempo detrás de escena", ["Lo pone al frente sin decir nada", "Lo humilla delante de todos", "Lo echa del ministerio"], "«Jehová no mira lo que mira el hombre».", "1 Samuel 16:7"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿A quiénes da gracia Dios, según 1 Pedro 5:5?", "A los humildes", ["A los soberbios", "A los ricos", "A los fuertes"], "«porque: Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5"],
      ["m2-02", 4, "o4", "comprender", "¿Qué hacen los padres y hermanos que apoyan al equipo juvenil?", "Ayudan con el transporte, la comida y la oración", ["Dirigen la reunión", "Reemplazan a los líderes", "Nada"], "«Así esforzaron sus manos para bien».", "Nehemías 2:17-18"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que incluir una capacitación en la reunión del equipo. ¿Cuánto tiempo y sobre qué?", "Unos diez minutos sobre un tema, como escuchar bien o proteger a los menores", ["Tres horas sobre cualquier cosa", "Ninguna", "Solo sobre el presupuesto"], "«y todos, sumisos unos a otros, revestíos de humildad».", "1 Pedro 5:5"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué los desacuerdos del equipo no se discuten delante de los jóvenes?", "Porque se resuelven mejor en privado y los jóvenes no deben quedar en medio", ["Porque los jóvenes no entienden", "Porque los desacuerdos no existen", "Sí se discuten delante"], "«revestíos de humildad».", "1 Pedro 5:5"],
      ["m2-05", 4, "o4", "aplicar", "Un líder dice que, cuando dos líderes se separan por un desacuerdo, uno de los dos ya no sirve. ¿Qué le muestras?", "Que Pablo y Bernabé se separaron por Marcos y los dos siguieron sirviendo, y que Marcos llegó a ser útil", ["Que tiene razón", "Que los desacuerdos no existen", "Que hay que echar a los dos"], "«Bernabé, tomando a Marcos, navegó a Chipre», y Pablo siguió su viaje: los dos siguieron en la obra.", "Hechos 15:37-39"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué reunión mensual del equipo está mejor armada?", "Orar, contar cómo están los grupos, evaluar, planear, capacitar y cuidar a los líderes", ["Solo dar anuncios", "Solo quejarse", "No reunirse nunca"], "«Levantémonos y edifiquemos».", "Nehemías 2:17-18"],
      ["m2-07", 5, "o5", "recordar", "¿Con qué cantamos al Señor, según Colosenses 3:16?", "Con salmos e himnos y cánticos espirituales", ["Con gritos", "Sin palabras", "Solo con instrumentos"], "«cantando con gracia en vuestros corazones al Señor con salmos e himnos y cánticos espirituales».", "Colosenses 3:16"],
      ["m2-08", 5, "o5", "comprender", "¿Qué hace el equipo de bienvenida en la reunión de jóvenes?", "Recibe a cada joven por su nombre, sobre todo a los nuevos", ["Cobra la entrada", "Cierra la puerta", "Nada"], "Todo se hace para edificación: «Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m2-09", 5, "o5", "aplicar", "El juego del comienzo de la reunión siempre se alarga y no queda tiempo para la Palabra. ¿Qué cambias?", "Le pones reglas claras y un final a tiempo, de unos diez minutos", ["Quitas la Palabra", "Alargas más el juego", "Cancelas la reunión"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m2-10", 5, "o5", "aplicar", "Tienes que planear la enseñanza del próximo trimestre. ¿Qué haces?", "Series de cuatro a seis semanas, por ejemplo sobre la identidad o un libro de la Biblia", ["Un tema distinto cada día sin relación", "Repetir la misma charla", "No planear nada"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué una charla para jóvenes incluye una historia de la vida real?", "Porque ayuda a entender y a recordar la idea del texto", ["Porque reemplaza la Biblia", "Porque así dura más", "No hace falta"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué reunión de jóvenes edifica mejor?", "La que tiene bienvenida, conexión, alabanza, la Palabra, grupos pequeños y un cierre a tiempo", ["La que solo tiene juegos", "La que solo tiene predicación larga", "La que se improvisa"], "«Hágase todo para edificación».", "1 Corintios 14:26"],
      ["m2-13", 6, "o6", "recordar", "¿Qué no debía hacer Josué, según Josué 1:9?", "Temer ni desmayar", ["Esforzarse", "Ser valiente", "Confiar en Dios"], "«no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas».", "Josué 1:9"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué se dan responsabilidades de a poco a un nuevo líder?", "Para que aprenda ayudando, después dirija con apoyo y al final dirija solo", ["Para que no aprenda", "Para cansarlo", "No se dan de a poco"], "Moisés preparó a Josué antes de que guiara: «Esfuérzate y anímate».", "Deuteronomio 31:7-8"],
      ["m2-15", 6, "o6", "aplicar", "Un menor quiere ir al campamento, pero no trajo el permiso firmado de sus padres. ¿Qué haces?", "No va hasta que sus padres firmen el permiso", ["Lo llevas igual", "Firmas tú por él", "Le pides que firme él mismo"], "El líder cuida a los suyos con responsabilidad: «Esfuérzate y anímate».", "Deuteronomio 31:7-8"],
      ["m2-16", 6, "o6", "aplicar", "Tienes que evaluar el ministerio juvenil al final del año. ¿Qué preguntas haces?", "Si los jóvenes crecen en su fe, si cada uno tiene un adulto que lo conoce, si sirven y si el equipo está sano", ["Solo cuántos vinieron", "Solo cuánto se gastó", "Ninguna"], "«Mira que te mando que te esfuerces y seas valiente».", "Josué 1:9"],
      ["m2-17", 6, "o6", "recordar", "¿Qué le haría heredar Josué al pueblo, según Deuteronomio 31:7?", "La tierra que Jehová juró a sus padres", ["Riquezas de Egipto", "Un templo", "Un trono en Roma"], "«porque tú entrarás con este pueblo a la tierra que juró Jehová a sus padres que les daría, y tú se la harás heredar».", "Deuteronomio 31:7-8"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué acompañamiento es el mejor para los jóvenes que terminan la escuela?", "Ayudarlos a encontrar una iglesia y un grupo si se mudan, y a seguir sirviendo si se quedan", ["Despedirlos sin más", "Pedirles que no estudien", "Olvidarlos"], "«Jehová tu Dios estará contigo en dondequiera que vayas».", "Josué 1:9"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "juventud-4-e1",
      tipo: "corta",
      pregunta: "Explica qué es el liderazgo de servicio que enseñó Jesús.",
      ideas: [
        { id: "servidor", peso: 30, texto: "El que quiere ser grande será servidor.", formas: ["servidor", "siervo de todos", "hacerse grande", "para servir"] },
        { id: "ejemplo", peso: 30, texto: "Jesús lavó los pies y nos dio ejemplo.", formas: ["lavo los pies", "lavar los pies", "ejemplo", "una toalla"] },
        { id: "humildad", peso: 30, texto: "Con humildad, sin vanagloria, mirando por los demás.", formas: ["humildad", "vanagloria", "los demas", "superiores", "lo de los otros"] },
      ],
      citas: ["Marcos 10:43-45", "Marcos 10:45", "Juan 13:14-15", "Juan 13:15", "Filipenses 2:3-4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús enseñó que el que quiere hacerse grande será servidor, porque él no vino para ser servido, sino para servir (Marcos 10:45). Lo mostró cuando lavó los pies de sus discípulos y nos dio ejemplo. El líder de servicio actúa con humildad, sin vanagloria, y mira por lo de los demás.",
    },
    {
      id: "juventud-4-e2",
      tipo: "corta",
      pregunta: "Explica por qué el carácter importa más que el talento en un líder joven.",
      ideas: [
        { id: "corazon", peso: 30, texto: "Dios mira el corazón.", formas: ["mira el corazon", "el corazon", "guarda tu corazon"] },
        { id: "sostiene", peso: 30, texto: "El talento lleva a un lugar, pero el carácter lo sostiene; la soberbia va antes de la caída.", formas: ["sostiene", "la soberbia", "la caida", "orgullo", "caer"] },
        { id: "areas", peso: 30, texto: "Las áreas del carácter: integridad, humildad, pureza, disciplina y fidelidad.", formas: ["integridad", "humildad", "pureza", "disciplina", "fidelidad"] },
      ],
      citas: ["1 Samuel 16:7", "Proverbios 4:23", "Proverbios 16:18", "Tito 2:7", "1 Corintios 9:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios no mira lo que mira el hombre, sino el corazón (1 Samuel 16:7). El talento puede llevar a un joven al frente, pero solo el carácter lo sostiene, porque la soberbia va antes de la caída. Por eso el líder cuida su integridad, su humildad, su pureza, su disciplina y su fidelidad.",
    },
    {
      id: "juventud-4-e3",
      tipo: "corta",
      pregunta: "Explica cómo prepararías a un joven para dar su primera charla en la reunión de jóvenes.",
      ideas: [
        { id: "texto", peso: 30, texto: "Un texto estudiado y una sola idea.", formas: ["un texto", "un pasaje", "una idea", "una sola idea"] },
        { id: "historia", peso: 30, texto: "Una historia y una aplicación para la semana.", formas: ["una historia", "un ejemplo", "aplicacion", "esta semana"] },
        { id: "ensayo", peso: 30, texto: "Ensayarla frente a su líder.", formas: ["ensay*", "practicar", "en voz alta", "sugerencias"] },
      ],
      citas: ["1 Corintios 14:26", "Colosenses 3:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Lo ayudaría a elegir un texto corto, a estudiarlo y a escribir en una frase una sola idea. Después buscaríamos una historia de la vida real que la haga entender y una aplicación para esta semana. Al final la ensayaría en voz alta frente a mí, porque todo se hace para edificación (1 Corintios 14:26).",
    },
    {
      id: "juventud-4-e4",
      tipo: "breve",
      pregunta:
        "Tienes que organizar un campamento de jóvenes de fin de semana. Explica cómo lo prepararías para que sea seguro, con citas bíblicas.",
      ideas: [
        { id: "permisos", peso: 25, texto: "Los permisos firmados y la ficha de salud.", formas: ["permiso*", "ficha", "alergias", "firmado"] },
        { id: "adultos", peso: 25, texto: "Adultos seleccionados de los dos sexos, nunca uno a solas con un menor.", formas: ["adultos seleccionados", "los dos sexos", "a solas", "dos adultos"] },
        { id: "transporte", peso: 25, texto: "El transporte seguro y los dormitorios separados.", formas: ["transporte", "conductores", "licencia", "dormitorios", "separados"] },
        { id: "emergencias", peso: 25, texto: "Las reglas claras y el plan de emergencias.", formas: ["reglas", "emergencia*", "botiquin", "hospital", "los padres"] },
      ],
      basta: 85,
      citas: ["Deuteronomio 31:7-8", "Deuteronomio 31:8", "Josué 1:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Lo prepararía con tiempo y con oración, sabiendo que Jehová va delante de nosotros y no nos deja (Deuteronomio 31:8), pero haciendo mi parte con responsabilidad. Cada menor llevaría el permiso firmado por sus padres y una ficha con su salud, sus alergias y los teléfonos de contacto. Iríamos con suficientes adultos seleccionados, de los dos sexos, y nunca habría un adulto a solas con un menor. Para el transporte usaríamos conductores con licencia y seguro, con un adulto más en cada vehículo. Los dormitorios estarían separados para varones y mujeres, con adultos del mismo sexo cerca. Daríamos reglas claras desde el principio sobre los horarios, los teléfonos y el trato entre todos. Y tendríamos un plan de emergencias, con un botiquín, la dirección del hospital más cercano y la manera de comunicarnos con los padres. Así podríamos esforzarnos y ser valientes, confiando en que Dios estaría con nosotros (Josué 1:9).",
    },
    {
      id: "juventud-4-e5",
      tipo: "breve",
      pregunta:
        "En tu equipo de líderes juveniles, dos líderes discuten y uno de ellos dejó su servicio a mitad de año. Explica cómo manejarías el desacuerdo y qué harías con el que se fue, con citas bíblicas.",
      ideas: [
        { id: "privado", peso: 25, texto: "Hablar en privado, con la verdad en amor, nunca delante de los jóvenes.", formas: ["en privado", "a solas", "verdad en amor", "delante de los jovenes"] },
        { id: "humildad", peso: 25, texto: "Humildad y sujeción unos a otros; pedir ayuda al pastor.", formas: ["humildad", "sumisos", "al pastor", "pedir ayuda"] },
        { id: "marcos", peso: 25, texto: "La historia de Pablo, Bernabé y Marcos.", formas: ["marcos", "bernabe", "me es util", "chipre"] },
        { id: "segunda", peso: 25, texto: "Una segunda oportunidad acompañada.", formas: ["segunda oportunidad", "volver a servir", "acompanad*", "que aprendio"] },
      ],
      basta: 85,
      citas: ["1 Pedro 5:5", "Hechos 15:39", "Hechos 15:37-39", "2 Timoteo 4:11", "Efesios 4:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero hablaría con cada uno en privado y después con los dos juntos, siempre con la verdad en amor y nunca delante de los jóvenes, para que no queden en medio. Les recordaría que Pedro nos pide estar sumisos unos a otros y revestirnos de humildad, porque Dios da gracia a los humildes (1 Pedro 5:5). Si no lográramos resolverlo, pediríamos ayuda al pastor. También les contaría que Pablo y Bernabé tuvieron un desacuerdo tan fuerte por Marcos que se separaron (Hechos 15:39), y que años después Pablo pidió que le trajeran a Marcos porque le era útil para el ministerio (2 Timoteo 4:11). Con el que dejó su servicio conversaría para saber por qué se fue y qué aprendió, y si muestra un corazón dispuesto, le daría una segunda oportunidad para volver a servir, acompañado por otro líder.",
    },
  ],
  breve: {
    id: "juventud-4-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo formarías a los jóvenes líderes de tu iglesia, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "llamado", peso: 15, texto: "Dios usa a jóvenes; reconocer a los que tienen potencial.", formas: ["david", "daniel", "ester", "potencial", "fiel"] },
      { id: "servicio", peso: 20, texto: "Liderar sirviendo, como Jesús.", formas: ["servidor", "servir", "lavo los pies", "ejemplo"] },
      { id: "caracter", peso: 20, texto: "El carácter antes que el talento.", formas: ["caracter", "el corazon", "integridad", "humildad"] },
      { id: "equipo", peso: 15, texto: "Un equipo con adultos y segundas oportunidades.", formas: ["equipo", "adultos", "segunda oportunidad", "marcos"] },
      { id: "reunion", peso: 15, texto: "Planear las reuniones y las charlas.", formas: ["reunion", "charla", "una idea", "edificacion"] },
      { id: "posta", peso: 15, texto: "Proteger, evaluar y pasar la posta.", formas: ["pasar la posta", "formar a otros", "evaluar", "campamento", "josue"] },
    ],
    basta: 85,
    citas: ["1 Samuel 17:45", "Marcos 10:45", "Marcos 10:43-45", "Juan 13:15", "1 Samuel 16:7", "2 Timoteo 4:11", "1 Corintios 14:26", "Josué 1:9", "Deuteronomio 31:7-8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría reconociendo a los jóvenes con potencial, los que son fieles, sirven sin que se lo pidan y tienen buen testimonio, recordando que Dios usó a jóvenes como David, que fue en el nombre de Jehová (1 Samuel 17:45), Daniel y Ester. Les enseñaría a liderar sirviendo, porque el Hijo del Hombre no vino para ser servido, sino para servir (Marcos 10:45), y Jesús lavó los pies y nos dio ejemplo. Cuidaríamos el carácter antes que el talento, porque Dios mira el corazón (1 Samuel 16:7): la integridad, la humildad, la pureza y la disciplina. Formaríamos un equipo con adultos que acompañan, con reuniones para orar, planear y capacitarnos, y con segundas oportunidades, como la que tuvo Marcos. Les enseñaría a planear la reunión y a preparar una charla con un texto y una idea, para edificación. Y los formaría para proteger a los menores, evaluar el ministerio y pasar la posta a otros, esforzándose y siendo valientes, porque Dios está con ellos (Josué 1:9).",
  },
};
