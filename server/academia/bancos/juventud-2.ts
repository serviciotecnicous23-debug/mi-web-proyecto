/**
 * El banco de «Cosmovisión cristiana y cultura» (especialidad Juventud, materia 2). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es una cosmovisión y la historia en cuatro actos · o2 las cosmovisiones de hoy · o3 la identidad del
 * joven en Cristo · o4 las redes sociales y la tecnología · o5 discernir el arte y el entretenimiento · o6 responder con
 * verdad y amor · o7 el versículo de memoria (Colosenses 2:8). Sigue el estándar de docs/academia-auditoria.md: no más
 * del 30 % de memoria, al menos un 20 % de casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `juventud-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_JUVENTUD_2: BancoMateria = {
  materia: "juventud-2",
  repaso: {
    "juventud-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué pide Pablo en Romanos 12:2 sobre este siglo?", "Que no nos conformemos a él, sino que seamos transformados por la renovación del entendimiento", ["Que lo imitemos", "Que huyamos de él", "Que no pensemos"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
      ["1-r2", 1, "o1", "comprender", "¿Cuáles son los cuatro actos de la historia de la Biblia?", "Creación, caída, redención y consumación", ["Génesis, Éxodo, Levítico y Números", "Infancia, juventud, adultez y vejez", "Ley, profetas, salmos y evangelios"], "La historia termina con la creación libertada: «también la creación misma será libertada de la esclavitud de corrupción».", "Romanos 8:21"],
      ["1-r3", 1, "o1", "aplicar", "Un compañero de escuela dice que el ser humano es solo un animal más, producto del azar. ¿Cómo lo miras con los cuatro actos?", "Que fuimos creados a imagen de Dios, que el pecado nos dañó, que Cristo nos restaura y que vamos hacia la vida con Dios", ["Que tiene toda la razón", "Que no vale la pena pensar en eso", "Que los animales no existen"], "El creyente lleva «cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
    ] as P[]).map(p),
    "juventud-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hacía cada uno cuando no había rey en Israel, según Jueces 21:25?", "Lo que bien le parecía", ["Lo que mandaba Dios", "Lo que decían los sacerdotes", "Nada"], "«En estos días no había rey en Israel; cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
      ["2-r2", 2, "o2", "comprender", "¿Qué tiene de verdad el relativismo, y qué le falta?", "Pide humildad, pero si nada es verdad, tampoco lo es la frase de que cada uno tiene su verdad", ["Todo lo que dice es verdad", "No tiene nada de verdad", "Le falta solo un poco de fe"], "Cuando cada uno vive a su manera, hay dolor: «cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
      ["2-r3", 2, "o2", "aplicar", "Una amiga te dice que su lema es sigue a tu corazón. ¿Qué le respondes?", "Que es cierto que las decisiones salen del corazón, pero el corazón también se equivoca y necesita a Cristo", ["Que tiene razón en todo", "Que el corazón no importa", "Que no hable de eso"], "Pablo advierte que nadie nos engañe con ideas que no son «según Cristo».", "Colosenses 2:8"],
    ] as P[]).map(p),
    "juventud-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué dice el salmista de cómo fue formado, según Salmos 139:13?", "Que Dios formó sus entrañas y lo hizo en el vientre de su madre", ["Que se hizo solo", "Que fue un accidente", "Que no sabe cómo fue"], "«Porque tú formaste mis entrañas; Tú me hiciste en el vientre de mi madre».", "Salmos 139:13-14"],
      ["3-r2", 3, "o3", "comprender", "¿Qué diferencia hay entre lo que dice la cultura y lo que dice Dios sobre el valor de un joven?", "La cultura dice que vale por lo que logra; Dios dice que vale porque él lo hizo y lo ama", ["No hay diferencia", "Dios dice que vale por lo que logra", "La cultura dice que no vale"], "«Te alabaré; porque formidables, maravillosas son tus obras».", "Salmos 139:13-14"],
      ["3-r3", 3, "o3", "aplicar", "Un joven de tu grupo se compara todo el día en las redes y dice que vale menos que los demás. ¿Qué haces primero?", "Escucharlo sin juzgar y ayudarlo a nombrar la mentira que está creyendo", ["Decirle que deje de quejarse", "Burlarte para que reaccione", "Contarlo al grupo"], "En Cristo recibe una identidad nueva: «si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
    ] as P[]).map(p),
    "juventud-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cómo pide Pablo que andemos, según Efesios 5:15-16?", "Como sabios, aprovechando bien el tiempo", ["Como necios, sin pensar", "Con prisa", "Sin mirar"], "«Mirad, pues, con diligencia cómo andéis, no como necios sino como sabios, aprovechando bien el tiempo».", "Efesios 5:15-16"],
      ["4-r2", 4, "o4", "comprender", "¿Qué criterio da 1 Corintios 6:12 para el uso del teléfono?", "Que no todo conviene, y que no debemos dejarnos dominar de ninguna cosa", ["Que todo conviene", "Que el teléfono es pecado", "Que no hay criterios"], "«todas las cosas me son lícitas, mas yo no me dejaré dominar de ninguna».", "1 Corintios 6:12"],
      ["4-r3", 4, "o4", "aplicar", "Una joven te cuenta que unas compañeras se burlan de ella en un grupo de mensajes. ¿Qué le aconsejas?", "No responder, guardar las pruebas, contarlo a un adulto de confianza y reportar la cuenta", ["Responder con más burlas", "Borrar todo y callarse", "Dejar la escuela"], "Se actúa con sabiduría y sin dejarse dominar: «Mirad, pues, con diligencia cómo andéis».", "Efesios 5:15-16"],
    ] as P[]).map(p),
    "juventud-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide 1 Tesalonicenses 5:21?", "Examinadlo todo; retened lo bueno", ["Rechazadlo todo", "Aceptadlo todo", "No miréis nada"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué no basta con rechazar toda la cultura?", "Porque así el joven no aprende a pensar ni a hablar con los que no creen", ["Porque toda la cultura es buena", "Porque la Biblia lo prohíbe", "Sí basta"], "Pablo no pide rechazarlo todo, sino «Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["5-r3", 5, "o5", "aplicar", "Tu grupo de jóvenes escucha una canción muy popular. ¿Cómo la analizan juntos?", "Con cuatro preguntas: qué dice de Dios, del ser humano, de lo bueno y lo malo, y qué provoca", ["Prohibiéndola sin hablar", "Cantándola sin pensar", "Ignorándola"], "«todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro», «en esto pensad».", "Filipenses 4:8"],
    ] as P[]).map(p),
    "juventud-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo pide Pedro que presentemos defensa de nuestra esperanza, según 1 Pedro 3:15?", "Con mansedumbre y reverencia", ["Con enojo", "Con burlas", "En silencio"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15-16"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué la verdad y el amor van juntos al responder?", "Porque la verdad sin amor hiere, y el amor sin verdad engaña", ["Porque el amor no importa", "Porque la verdad no importa", "No van juntos"], "«sino que siguiendo la verdad en amor, crezcamos en todo en aquel que es la cabeza».", "Efesios 4:15"],
      ["6-r3", 6, "o6", "aplicar", "Un compañero te dice que todas las religiones son iguales. ¿Cuál es tu primer paso?", "Escucharlo y preguntarle qué quiere decir con iguales", ["Decirle que está equivocado de inmediato", "Cambiar de tema", "Burlarte de su idea"], "«Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno».", "Colosenses 4:6"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Qué es una cosmovisión
    ["f01", 1, "o1", "recordar", "¿Cómo era el árbol a los ojos de la mujer, según Génesis 3:6?", "Bueno para comer, agradable a los ojos y codiciable para alcanzar la sabiduría", ["Feo y amargo", "Pequeño y seco", "Prohibido y peligroso a sus ojos"], "«Y vio la mujer que el árbol era bueno para comer, y que era agradable a los ojos, y árbol codiciable para alcanzar la sabiduría».", "Génesis 3:6"],
    ["f02", 1, "o1", "recordar", "¿Qué pasará con la creación, según Romanos 8:21?", "Será libertada de la esclavitud de corrupción", ["Será destruida para siempre", "Seguirá igual", "Nadie lo sabe"], "«porque también la creación misma será libertada de la esclavitud de corrupción, a la libertad gloriosa de los hijos de Dios».", "Romanos 8:21"],
    ["f03", 1, "o1", "comprender", "¿Qué es una cosmovisión?", "La manera en que alguien mira el mundo y responde las preguntas grandes de la vida", ["Una religión nueva", "Un programa de televisión", "Una ciencia del espacio"], "La fe cambia la manera de pensar sobre todo: «transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
    ["f04", 1, "o1", "comprender", "¿Qué pregunta responde la caída?", "¿Qué salió mal en el mundo?", ["¿De dónde venimos?", "¿Hacia dónde vamos?", "¿Cuántos años tiene la tierra?"], "La caída empezó cuando el ser humano miró de otra manera: «Y vio la mujer que el árbol era bueno para comer».", "Génesis 3:6"],
    ["f05", 1, "o1", "analizar", "¿Por qué la caída empezó con una manera de mirar?", "Porque antes de desobedecer, el ser humano creyó otra historia sobre Dios y sobre lo que era bueno", ["Porque mirar es pecado", "Porque los ojos son malos", "No empezó así"], "La mujer «vio» que el árbol era «agradable a los ojos, y árbol codiciable para alcanzar la sabiduría».", "Génesis 3:6"],
    ["f06", 1, "o1", "evaluar", "¿Qué respuesta muestra mejor una cosmovisión cristiana?", "Cada persona tiene valor porque fue creada a imagen de Dios, aunque el pecado la dañó y Cristo la restaura", ["Las personas valen por lo que producen", "Nada tiene sentido", "Solo importa lo que se siente"], "«llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
    ["f07", 1, "o1", "aplicar", "Un joven dice que la fe es solo para el domingo y no tiene que ver con lo que estudia. ¿Qué le explicas?", "Que la fe renueva la manera de pensar sobre todo, también sobre lo que estudia", ["Que tiene razón", "Que deje de estudiar", "Que la fe es solo emoción"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
    ["f08", 1, "o1", "aplicar", "Tienes que enseñar a tus jóvenes a pensar con la Biblia. ¿Qué les das?", "Las cuatro preguntas de la cosmovisión para mirar cualquier idea", ["Una lista de cosas prohibidas", "Nada: que piensen solos", "Solo un versículo para memorizar"], "«llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
    ["f09", 1, "o1", "aplicar", "Una joven dice que el mundo no tiene arreglo y que todo va a peor. ¿Qué le muestra la consumación?", "Que Cristo volverá y la creación será libertada, y que hay esperanza", ["Que tiene razón", "Que no hay que pensar en el futuro", "Que todo seguirá igual"], "«porque también la creación misma será libertada de la esclavitud de corrupción».", "Romanos 8:21"],
    ["f10", 1, "o7", "recordar", "Completa Colosenses 2:8: Mirad que nadie os engañe por medio de filosofías y huecas sutilezas…", "según las tradiciones de los hombres, conforme a los rudimentos del mundo, y no según Cristo", ["porque la verdad no existe", "y seguid vuestro corazón", "sino aprended de todos los maestros por igual"], "«Mirad que nadie os engañe por medio de filosofías y huecas sutilezas, según las tradiciones de los hombres, conforme a los rudimentos del mundo, y no según Cristo».", "Colosenses 2:8"],
    // Lección 2 · Las cosmovisiones de hoy
    ["f11", 2, "o2", "recordar", "¿Qué inscripción encontró Pablo en un altar de Atenas, según Hechos 17:23?", "AL DIOS NO CONOCIDO", ["AL DIOS DE ISRAEL", "A LOS DIOSES DEL MAR", "AL EMPERADOR"], "«hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO».", "Hechos 17:22-23"],
    ["f12", 2, "o2", "recordar", "¿Qué permanece para siempre, según 1 Juan 2:17?", "El que hace la voluntad de Dios", ["El mundo y sus deseos", "Las riquezas", "La fama"], "«Y el mundo pasa, y sus deseos; pero el que hace la voluntad de Dios permanece para siempre».", "1 Juan 2:15-17"],
    ["f13", 2, "o2", "comprender", "¿Qué enseña el materialismo?", "Que solo existe lo que se ve y se mide", ["Que Dios es todo", "Que cada uno tiene su verdad", "Que hay que tener muchas cosas"], "Pablo advierte contra las ideas que no son «según Cristo».", "Colosenses 2:8"],
    ["f14", 2, "o2", "comprender", "¿Qué promete el consumismo, y por qué falla?", "Que seremos felices teniendo más cosas, pero el mundo pasa y sus deseos", ["Que seremos santos, pero no lo logra", "Nada", "Que seremos pobres"], "«los deseos de la carne, los deseos de los ojos, y la vanagloria de la vida».", "1 Juan 2:15-17"],
    ["f15", 2, "o2", "comprender", "¿Qué tiene de verdad el individualismo, y qué le falta?", "Tiene razón en que cada persona importa, pero pone al yo en el lugar de Dios", ["Todo lo que dice es verdad", "No tiene nada de verdad", "Le falta solo dinero"], "Cuando cada uno se guía solo por sí mismo, «cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
    ["f16", 2, "o2", "analizar", "¿Qué hizo Pablo en Atenas antes de anunciar a Cristo?", "Observó la cultura y empezó por algo que ellos conocían", ["Se burló de sus dioses", "Se fue sin hablar", "Leyó toda la ley de Moisés"], "«pasando y mirando vuestros santuarios, hallé también un altar».", "Hechos 17:22-23"],
    ["f17", 2, "o2", "analizar", "¿Por qué la frase cada uno tiene su verdad se contradice a sí misma?", "Porque presenta como verdad para todos que no hay verdad para todos", ["Porque es muy larga", "Porque es una pregunta", "No se contradice"], "Las ideas que no son según Cristo terminan en «huecas sutilezas».", "Colosenses 2:8"],
    ["f18", 2, "o2", "aplicar", "Un profesor dice en clase que solo existe lo que la ciencia puede medir. ¿Qué piensas, como joven cristiano?", "Que la ciencia es valiosa, pero no puede medir todo: el amor, la justicia y Dios también existen", ["Que el profesor tiene toda la razón", "Que la ciencia es mala", "Que no hay que estudiar"], "«Mirad que nadie os engañe por medio de filosofías y huecas sutilezas».", "Colosenses 2:8"],
    ["f19", 2, "o2", "aplicar", "Tienes que preparar una reunión de jóvenes sobre las ideas de hoy. ¿Cómo la planteas?", "Mostrando qué tiene de verdad cada idea y qué le falta, sin burlarse de nadie", ["Burlándote de los que piensan distinto", "Diciendo que todas las ideas son iguales", "Evitando el tema"], "Pablo empezó por lo que ellos conocían: «Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio».", "Hechos 17:22-23"],
    ["f20", 2, "o2", "evaluar", "¿Qué manera de hablar de otras cosmovisiones es la mejor?", "Reconocer lo que tienen de verdad y mostrar lo que les falta, con respeto", ["Burlarse de ellas", "Decir que todas son verdad", "No hablar nunca de ellas"], "Pablo observó y anunció con respeto: «Varones atenienses, en todo observo que sois muy religiosos».", "Hechos 17:22-23"],
    // Lección 3 · La identidad en Cristo
    ["f21", 3, "o3", "recordar", "¿Qué es el que está en Cristo, según 2 Corintios 5:17?", "Una nueva criatura", ["El mismo de siempre", "Un ángel", "Una persona perfecta sin luchas"], "«De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas».", "2 Corintios 5:17"],
    ["f22", 3, "o3", "recordar", "¿Para qué fuimos creados en Cristo Jesús, según Efesios 2:10?", "Para buenas obras, que Dios preparó de antemano", ["Para hacernos famosos", "Para nada en especial", "Para ganar dinero"], "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano».", "Efesios 2:10"],
    ["f23", 3, "o3", "recordar", "¿Qué es el cuerpo del creyente, según 1 Corintios 6:19?", "Templo del Espíritu Santo", ["Una cárcel del alma", "Algo sin valor", "Solo de uno mismo"], "«¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros».", "1 Corintios 6:19-20"],
    ["f24", 3, "o3", "comprender", "¿Qué significa recibir la identidad en Cristo, en lugar de construirla solo?", "Que el joven es quien Dios dice que es, aunque sus sentimientos cambien", ["Que no tiene identidad", "Que debe copiar a otros", "Que la identidad no importa"], "«si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
    ["f25", 3, "o3", "comprender", "¿Qué enseña la declaración de fe del ministerio sobre el diseño de Dios para la sexualidad?", "Que es el matrimonio entre un hombre y una mujer", ["Que cada uno decide su diseño", "Que la sexualidad no importa", "Que la Biblia no dice nada"], "«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne».", "Génesis 2:24"],
    ["f26", 3, "o3", "analizar", "¿Por qué la iglesia habla de la sexualidad con verdad y con amor a la vez?", "Porque enseña el diseño de Dios sin burlas, y acompaña al joven que lucha en lugar de rechazarlo", ["Porque la verdad no importa", "Porque el amor significa no decir nada", "Porque así lo pide la moda"], "El cuerpo es de Dios: «glorificad, pues, a Dios en vuestro cuerpo».", "1 Corintios 6:19-20"],
    ["f27", 3, "o3", "aplicar", "Un joven te cuenta en confianza que lucha con su identidad. ¿Qué haces?", "Lo escuchas, guardas su confianza salvo que corra peligro, y lo acompañas con la verdad y con amor", ["Lo cuentas al grupo para que oren", "Lo rechazas", "Te burlas para que cambie"], "«somos hechura suya, creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ["f28", 3, "o3", "aplicar", "Una joven dice que nunca va a valer nada porque no es bonita como las chicas de las redes. ¿Qué verdad le muestras?", "Que Dios la formó y la ama, y que su valor no depende de cómo se ve", ["Que se maquille más", "Que tiene razón", "Que deje de usar el teléfono para siempre"], "«Te alabaré; porque formidables, maravillosas son tus obras».", "Salmos 139:13-14"],
    ["f29", 3, "o3", "aplicar", "Un joven de tu grupo muestra señales de autolesiones. ¿Qué haces?", "Avisas a sus padres y buscas ayuda profesional; en una crisis, se llama al 988", ["Esperas a que se le pase", "Lo hablas en el grupo", "No haces nada"], "Cada joven es obra de Dios: «Tú me hiciste en el vientre de mi madre».", "Salmos 139:13-14"],
    ["f30", 3, "o3", "evaluar", "¿Qué frase expresa mejor la identidad de un joven según la Biblia?", "Soy una obra de Dios, nuevo en Cristo y creado para buenas obras", ["Soy lo que logro", "Soy lo que los demás piensan de mí", "Soy lo que siento hoy"], "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    // Lección 4 · Las redes sociales y la tecnología
    ["f31", 4, "o4", "recordar", "¿Qué decidió el salmista en Salmos 101:3?", "No poner delante de sus ojos cosa injusta", ["Cerrar los ojos siempre", "Mirar todo", "No leer nada"], "«No pondré delante de mis ojos cosa injusta».", "Salmos 101:3"],
    ["f32", 4, "o4", "recordar", "¿Por qué hay que aprovechar bien el tiempo, según Efesios 5:16?", "Porque los días son malos", ["Porque sobra el tiempo", "Porque nada importa", "Porque es aburrido"], "«aprovechando bien el tiempo, porque los días son malos».", "Efesios 5:15-16"],
    ["f33", 4, "o4", "comprender", "¿Qué es la huella digital?", "Lo que se publica queda en las redes y otros lo pueden ver años después", ["Una marca en el dedo", "Un programa de juegos", "Algo que se borra solo"], "Andar con sabiduría también es pensar antes de publicar: «Mirad, pues, con diligencia cómo andéis».", "Efesios 5:15-16"],
    ["f34", 4, "o4", "comprender", "¿Por qué la tecnología no es buena ni mala por sí misma?", "Porque depende de cómo se use: puede ayudar o puede dominar", ["Porque no existe", "Porque siempre es mala", "Porque siempre es buena"], "«todas las cosas me son lícitas, mas no todas convienen».", "1 Corintios 6:12"],
    ["f35", 4, "o4", "comprender", "¿Qué daño hace la pornografía?", "Daña la mente, las relaciones y la manera de ver a las personas", ["Ninguno", "Solo hace perder tiempo", "Solo daña los ojos"], "«No pondré delante de mis ojos cosa injusta».", "Salmos 101:3"],
    ["f36", 4, "o4", "analizar", "¿Por qué un acuerdo de tecnología que solo cumplen los hijos no dura?", "Porque los padres también son ejemplo, y los hijos aprenden de lo que ven", ["Porque los hijos no entienden", "Porque los acuerdos no sirven", "Sí dura"], "Todos andan como sabios: «no como necios sino como sabios».", "Efesios 5:15-16"],
    ["f37", 4, "o4", "aplicar", "Un joven te confiesa que mira pornografía y siente mucha vergüenza. ¿Qué haces?", "Lo escuchas sin escandalizarte, le recuerdas que en Cristo hay perdón y lo ayudas con pasos concretos y alguien con quien rendir cuentas", ["Lo regañas delante de todos", "Le dices que no es grave", "Lo apartas del grupo"], "«No pondré delante de mis ojos cosa injusta».", "Salmos 101:3"],
    ["f38", 4, "o4", "aplicar", "Una joven de quince años recibe un pedido de enviar una foto íntima. ¿Qué le aconsejas?", "Que nunca la envíe, que lo cuente a sus padres y que se avise a las autoridades, porque es un delito", ["Que la envíe si confía", "Que no le diga a nadie", "Que la borre y siga igual"], "«Mirad, pues, con diligencia cómo andéis, no como necios sino como sabios».", "Efesios 5:15-16"],
    ["f39", 4, "o4", "aplicar", "Tienes que ayudar a una familia a armar un acuerdo de tecnología. ¿Por dónde empiezan?", "Conversando padres e hijos sobre para qué usan el teléfono y qué les preocupa", ["Quitando todos los teléfonos sin hablar", "Comprando más aparatos", "No haciendo nada"], "«todas las cosas me son lícitas, mas yo no me dejaré dominar de ninguna».", "1 Corintios 6:12"],
    ["f40", 4, "o4", "evaluar", "¿Qué acuerdo familiar de tecnología es el más completo?", "Horarios, lugares comunes, filtros y contraseñas conocidas por los padres, un tiempo de descanso y una revisión cada mes", ["Solo prohibir los juegos", "Dejar todo libre", "Un acuerdo que nadie revisa"], "«aprovechando bien el tiempo, porque los días son malos».", "Efesios 5:15-16"],
    // Lección 5 · El arte, la música y el entretenimiento
    ["f41", 5, "o5", "recordar", "¿En qué pide Pablo que pensemos, según Filipenses 4:8?", "En todo lo verdadero, honesto, justo, puro, amable y de buen nombre", ["En lo que esté de moda", "En lo que nos haga reír", "En nada"], "«todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre», «en esto pensad».", "Filipenses 4:8"],
    ["f42", 5, "o5", "recordar", "¿Cómo debemos hacerlo todo, según Colosenses 3:17?", "En el nombre del Señor Jesús, dando gracias a Dios Padre", ["Como queramos", "A escondidas", "Solo en la iglesia"], "«Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús, dando gracias a Dios Padre por medio de él».", "Colosenses 3:17"],
    ["f43", 5, "o5", "comprender", "¿Qué significa discernir la cultura?", "Examinarlo todo con la Biblia como medida y quedarse con lo bueno", ["Rechazar todo", "Aceptar todo", "No mirar nada"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f44", 5, "o5", "comprender", "¿Por qué las canciones, las series y los juegos también enseñan?", "Porque cuentan historias sobre qué es bueno, qué es malo y qué da la felicidad", ["Porque son clases", "Porque los hacen maestros", "No enseñan nada"], "Por eso se mira con cuidado lo que se escucha: «en esto pensad».", "Filipenses 4:8"],
    ["f45", 5, "o5", "comprender", "¿Qué significa crear, como respuesta a la cultura?", "Hacer canciones, historias, videos y juegos buenos que muestren la verdad y la belleza de Dios", ["Copiar lo que hace el mundo", "No hacer nada", "Rechazar el arte"], "«Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús».", "Colosenses 3:17"],
    ["f46", 5, "o5", "analizar", "¿Qué le pasa a un joven que acepta toda la cultura sin examinarla?", "Termina pensando como el mundo sin darse cuenta", ["Se vuelve más sabio", "Nada", "Se aleja del mundo"], "Por eso Pablo pide: «Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f47", 5, "o5", "aplicar", "Una canción popular dice vive el momento, nada importa mañana. ¿Qué le falta, según la Biblia?", "Que el mañana importa: el mundo pasa, y el que hace la voluntad de Dios permanece", ["Nada: es perfecta", "Más ritmo", "Más palabras en inglés"], "«todo lo que es verdadero», «en esto pensad».", "Filipenses 4:8"],
    ["f48", 5, "o5", "aplicar", "Un joven con talento para la música solo copia canciones del mundo. ¿Qué lo animas a hacer?", "A crear canciones buenas que muestren la verdad y la belleza de Dios", ["A dejar la música", "A copiar más", "A no tocar nunca más"], "«hacedlo todo en el nombre del Señor Jesús».", "Colosenses 3:17"],
    ["f49", 5, "o5", "aplicar", "Tienes que ayudar a tu grupo a decidir si ver una serie. ¿Qué haces?", "Analizarla juntos con las cuatro preguntas y con Filipenses 4:8", ["Prohibirla sin explicar", "Verla sin pensar", "Dejar que cada uno haga lo que quiera sin hablar"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de responder a la cultura forma mejor a un joven?", "Enseñarle a discernir con preguntas y animarlo a crear lo bueno", ["Darle solo una lista de lo prohibido", "Dejarle aceptar todo", "Aislarlo de todo"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    // Lección 6 · Responder con verdad y amor
    ["f51", 6, "o6", "recordar", "¿Cómo debe ser nuestra palabra, según Colosenses 4:6?", "Siempre con gracia, sazonada con sal", ["Dura y seca", "Rápida y fuerte", "Callada"], "«Sea vuestra palabra siempre con gracia, sazonada con sal».", "Colosenses 4:6"],
    ["f52", 6, "o6", "recordar", "¿Qué citó Pablo en Atenas, según Hechos 17:28?", "A algunos de sus propios poetas", ["A Moisés", "A los fariseos", "A un emperador"], "«como algunos de vuestros propios poetas también han dicho: Porque linaje suyo somos».", "Hechos 17:26-28"],
    ["f53", 6, "o6", "recordar", "¿Qué debemos tener al presentar defensa de la fe, según 1 Pedro 3:16?", "Buena conciencia", ["Mucho dinero", "Un título", "Enojo"], "«teniendo buena conciencia, para que en lo que murmuran de vosotros como de malhechores, sean avergonzados».", "1 Pedro 3:15-16"],
    ["f54", 6, "o6", "comprender", "¿Por qué conviene preguntar antes de responder a una objeción?", "Para entender qué quiere decir la otra persona y responder a ella", ["Para ganar tiempo", "Para confundirla", "No conviene"], "«para que sepáis cómo debéis responder a cada uno».", "Colosenses 4:6"],
    ["f55", 6, "o6", "comprender", "¿En qué se diferencia el cristianismo de la idea de que llegamos a Dios por ser buenos?", "En que Dios vino a buscarnos en Jesús, que murió y resucitó por nosotros", ["En que pide ser más bueno que los demás", "En que no habla de Dios", "En nada"], "Pedro llama a dar razón de la esperanza: «la esperanza que hay en vosotros».", "1 Pedro 3:15-16"],
    ["f56", 6, "o6", "analizar", "¿Por qué Pablo buscó un punto en común con los atenienses?", "Para hablar de Dios desde algo que ellos ya conocían, y llevarlos a Cristo", ["Para darles la razón en todo", "Para no tener que predicar", "Para burlarse"], "«Porque en él vivimos, y nos movemos, y somos».", "Hechos 17:26-28"],
    ["f57", 6, "o6", "aplicar", "Una compañera te pregunta por qué Dios permite el sufrimiento. ¿Qué le respondes?", "Que la Biblia no esconde el dolor, que en la cruz Dios mismo sufrió por nosotros y que prometió hacer nuevas todas las cosas", ["Que es su culpa", "Que no lo sabes y cambias de tema", "Que el sufrimiento no existe"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
    ["f58", 6, "o6", "aplicar", "Tienes que preparar a tus jóvenes para las preguntas difíciles de la escuela. ¿Qué haces en el grupo?", "Ensayar conversaciones con los seis pasos y después conversar qué salió bien", ["Darles un discurso para que lo repitan", "Decirles que eviten esos temas", "Nada"], "«para que sepáis cómo debéis responder a cada uno».", "Colosenses 4:6"],
    ["f59", 6, "o6", "aplicar", "Un amigo que no cree no quiere seguir hablando de la fe después de una conversación. ¿Qué haces?", "Dejas la puerta abierta, sin presión, y sigues siendo su amigo", ["Dejas de hablarle", "Insistes hasta que acepte", "Te burlas de él"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
    ["f60", 6, "o6", "evaluar", "¿Qué conversación sobre la fe se acerca más a lo que pide la Biblia?", "La que escucha, pregunta, reconoce lo verdadero, muestra la diferencia, presenta a Cristo y deja la puerta abierta", ["La que gana la discusión a cualquier precio", "La que nunca menciona a Cristo", "La que termina con una burla"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15-16"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hace el creyente con todo pensamiento, según 2 Corintios 10:5?", "Lo lleva cautivo a la obediencia a Cristo", ["Lo ignora", "Lo esconde", "Lo publica"], "«derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios, y llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
      ["m1-02", 1, "o1", "comprender", "¿Qué pregunta responde la redención?", "¿Hay solución para lo que salió mal?", ["¿De dónde venimos?", "¿Qué hora es?", "¿Quién escribió la Biblia?"], "La historia termina con la creación libertada: «a la libertad gloriosa de los hijos de Dios».", "Romanos 8:21"],
      ["m1-03", 1, "o1", "aplicar", "Un joven te pregunta para qué sirve pensar en cosmovisiones si basta con creer. ¿Qué le respondes?", "Que la fe también renueva la manera de pensar, para que no se conforme a este siglo", ["Que no sirve", "Que pensar es peligroso", "Que solo sirve para los pastores"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué enseñar las cuatro preguntas es mejor que dar una lista de respuestas?", "Porque el joven aprende a pensar con la Biblia cada idea nueva que aparezca", ["Porque las listas no existen", "Porque así no hay que enseñar", "No es mejor"], "«llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:5"],
      ["m1-05", 1, "o1", "recordar", "¿Qué hizo la mujer después de ver el árbol, según Génesis 3:6?", "Tomó de su fruto, comió y dio también a su marido", ["Lo cortó", "Se alejó del árbol", "Le preguntó a Dios"], "«y tomó de su fruto, y comió; y dio también a su marido, el cual comió así como ella».", "Génesis 3:6"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué manera de mirar una idea nueva es la mejor para un joven cristiano?", "Pasarla por los cuatro actos: creación, caída, redención y consumación", ["Aceptarla si es popular", "Rechazarla si es nueva", "No pensar en ella"], "«No os conforméis a este siglo».", "Romanos 12:2"],
      ["m1-07", 2, "o2", "recordar", "¿Qué tres cosas del mundo menciona 1 Juan 2:16?", "Los deseos de la carne, los deseos de los ojos y la vanagloria de la vida", ["La comida, el agua y el aire", "La fe, la esperanza y el amor", "El oro, la plata y el bronce"], "«Porque todo lo que hay en el mundo, los deseos de la carne, los deseos de los ojos, y la vanagloria de la vida, no proviene del Padre».", "1 Juan 2:15-17"],
      ["m1-08", 2, "o2", "comprender", "¿Qué tiene de verdad la espiritualidad sin un Dios personal, y qué le falta?", "Reconoce que hay algo más que la materia, pero no conoce al Dios que habla y ama", ["Todo lo que dice es verdad", "No reconoce nada espiritual", "Le falta solo practicar más"], "Pablo anunció al Dios que no conocían: «Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio».", "Hechos 17:22-23"],
      ["m1-09", 2, "o2", "aplicar", "Un joven dice que será feliz cuando tenga el último teléfono. ¿Qué cosmovisión está creyendo?", "El consumismo, que promete una felicidad que las cosas no pueden dar", ["El materialismo científico", "La fe cristiana", "Ninguna"], "«Y el mundo pasa, y sus deseos».", "1 Juan 2:15-17"],
      ["m1-10", 2, "o2", "analizar", "¿Qué enseña Jueces 21:25 sobre el relativismo?", "Que cuando cada uno hace lo que bien le parece, hay mucho dolor", ["Que es la mejor manera de vivir", "Que no tiene consecuencias", "Nada"], "«En estos días no había rey en Israel; cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
      ["m1-11", 2, "o2", "recordar", "¿Cómo describió Pablo a los atenienses, según Hechos 17:22?", "Muy religiosos", ["Muy ricos", "Sin religión", "Muy pobres"], "«Varones atenienses, en todo observo que sois muy religiosos».", "Hechos 17:22-23"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué responde mejor a la frase cada uno tiene su verdad?", "Reconocer que pide humildad, y mostrar que la verdad de Cristo es para todos", ["Darle la razón", "Burlarse", "No decir nada"], "Pablo advierte contra las ideas que no son «según Cristo».", "Colosenses 2:8"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pasó con las cosas viejas del que está en Cristo, según 2 Corintios 5:17?", "Pasaron, y todas son hechas nuevas", ["Siguen igual", "Volvieron", "Se multiplicaron"], "«las cosas viejas pasaron; he aquí todas son hechas nuevas».", "2 Corintios 5:17"],
      ["m1-14", 3, "o3", "comprender", "¿Qué significa que el cuerpo sea templo del Espíritu Santo?", "Que el cuerpo es un regalo de Dios para honrarlo, y no un objeto ni un enemigo", ["Que el cuerpo no importa", "Que el cuerpo es malo", "Que hay que esconderlo"], "«glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu, los cuales son de Dios».", "1 Corintios 6:19-20"],
      ["m1-15", 3, "o3", "aplicar", "Tienes que ayudar a un joven que se compara en las redes. ¿Qué paso práctico le propones?", "Dejar de seguir las cuentas que lo hacen sentir menos y poner un tiempo sin redes cada día", ["Seguir más cuentas", "Borrar a todos sus amigos", "Nada"], "Su valor viene de Dios: «formidables, maravillosas son tus obras».", "Salmos 139:13-14"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué la frase eres lo que sientes no basta para la identidad?", "Porque los sentimientos cambian, y la identidad que Dios da no cambia", ["Porque los sentimientos no existen", "Porque sentir es pecado", "Sí basta"], "«si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
      ["m1-17", 3, "o3", "recordar", "¿Por qué no somos nuestros, según 1 Corintios 6:20?", "Porque hemos sido comprados por precio", ["Porque somos de nuestros padres", "Porque no existimos", "Porque somos del gobierno"], "«Porque habéis sido comprados por precio; glorificad, pues, a Dios en vuestro cuerpo».", "1 Corintios 6:19-20"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué respuesta a un joven que lucha con su identidad es la mejor?", "Acompañarlo con la verdad y con amor, sin burla y sin rechazo", ["Ignorarlo", "Burlarse", "Exponerlo delante del grupo"], "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué dice Pablo de las cosas que le son lícitas, según 1 Corintios 6:12?", "Que no todas convienen, y que no se dejará dominar de ninguna", ["Que todas convienen", "Que ninguna es lícita", "Que se dejará dominar"], "«Todas las cosas me son lícitas, mas no todas convienen».", "1 Corintios 6:12"],
      ["m2-02", 4, "o4", "comprender", "¿Qué se hace ante el ciberacoso?", "No responder, guardar las pruebas, contarlo a un adulto y reportar la cuenta", ["Responder con más fuerza", "Borrar todo y callarse", "Compartirlo con más personas"], "Se actúa con sabiduría: «no como necios sino como sabios».", "Efesios 5:15-16"],
      ["m2-03", 4, "o4", "aplicar", "Un joven pasa seis horas al día en los videojuegos y duerme poco. ¿Qué le propones?", "Un horario con límites y el teléfono fuera del cuarto de noche, con ayuda de sus padres", ["Que juegue más", "Que deje de dormir", "Nada"], "«yo no me dejaré dominar de ninguna».", "1 Corintios 6:12"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué una imagen íntima de un menor nunca se comparte ni se guarda?", "Porque daña a la persona y es un delito que se reporta a los padres y a las autoridades", ["Porque ocupa espacio", "Porque es aburrida", "Sí se puede compartir"], "«No pondré delante de mis ojos cosa injusta».", "Salmos 101:3"],
      ["m2-05", 4, "o4", "aplicar", "Tu grupo comparte una noticia escandalosa sin comprobarla. ¿Qué les enseñas?", "A comprobar antes de compartir, porque la desinformación también daña", ["A compartir más rápido", "Que no importa", "A inventar noticias"], "«Mirad, pues, con diligencia cómo andéis».", "Efesios 5:15-16"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué uso de las redes es el más sabio para un joven?", "Uno con horarios, que no lo domina y que no pone delante de sus ojos cosa injusta", ["Uno sin límites", "Uno secreto", "Uno que ocupa toda la noche"], "«aprovechando bien el tiempo, porque los días son malos».", "Efesios 5:15-16"],
      ["m2-07", 5, "o5", "recordar", "¿Qué debemos retener, según 1 Tesalonicenses 5:21?", "Lo bueno", ["Todo", "Nada", "Lo que esté de moda"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["m2-08", 5, "o5", "comprender", "¿Qué pregunta ayuda a ver lo que una canción provoca?", "¿Qué me provoca pensar, sentir o hacer?", ["¿Cuánto dura?", "¿Quién la canta?", "¿En qué idioma está?"], "«todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro», «en esto pensad».", "Filipenses 4:8"],
      ["m2-09", 5, "o5", "aplicar", "Una madre quiere prohibir toda la música a su hijo adolescente. ¿Qué le sugieres?", "Enseñarle a discernir con preguntas, en lugar de solo prohibir", ["Que prohíba todo", "Que no le importe", "Que le compre más música sin mirar"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["m2-10", 5, "o5", "aplicar", "Un grupo de jóvenes quiere hacer videos para las redes. ¿Qué les propones?", "Crear contenido bueno que muestre la verdad y la belleza de Dios, con excelencia", ["Copiar lo que hace todo el mundo", "No hacer nada", "Hacer videos para burlarse"], "«Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús».", "Colosenses 3:17"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué la lista de Filipenses 4:8 sirve para elegir el entretenimiento?", "Porque da una medida clara de lo que conviene llenar la mente", ["Porque prohíbe toda la música", "Porque es una lista de canciones", "No sirve"], "«si hay virtud alguna, si algo digno de alabanza, en esto pensad».", "Filipenses 4:8"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué respuesta a la cultura combina mejor el discernimiento y la creatividad?", "Examinar lo que se ve y se escucha, retener lo bueno y crear arte que honre a Dios", ["Rechazar todo el arte", "Aceptar todo el arte", "Mirar todo sin pensar"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["m2-13", 6, "o6", "recordar", "¿Ante quién debemos estar preparados para presentar defensa, según 1 Pedro 3:15?", "Ante todo el que nos demande razón de la esperanza que hay en nosotros", ["Solo ante los pastores", "Ante nadie", "Solo ante los jueces"], "«ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15-16"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué no se deja de ser amigo de alguien que no acepta la fe?", "Porque la verdad se dice con amor, y la puerta queda abierta", ["Porque no importa la fe", "Porque así se gana la discusión", "Sí se deja"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
      ["m2-15", 6, "o6", "aplicar", "Un compañero dice que la ciencia demostró que Dios no existe. ¿Qué le respondes?", "Que muchos científicos han sido creyentes, y que la ciencia y la Biblia responden preguntas distintas", ["Que la ciencia es mala", "Que tiene razón", "Que no quieres hablar"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
      ["m2-16", 6, "o6", "aplicar", "Una amiga te pregunta por qué Jesús sería el único camino. ¿Qué le respondes?", "Que él es el único que murió por nuestros pecados y resucitó", ["Que todas las religiones son iguales", "Que no lo sabes", "Que porque lo dice tu iglesia"], "«Sea vuestra palabra siempre con gracia, sazonada con sal».", "Colosenses 4:6"],
      ["m2-17", 6, "o6", "recordar", "¿En quién crecemos al seguir la verdad en amor, según Efesios 4:15?", "En Cristo, que es la cabeza", ["En nosotros mismos", "En los maestros", "En el mundo"], "«crezcamos en todo en aquel que es la cabeza, esto es, Cristo».", "Efesios 4:15"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué joven defiende mejor su fe?", "El que responde con razones, con mansedumbre y con buena conciencia", ["El que grita más fuerte", "El que se burla de los demás", "El que nunca habla"], "«teniendo buena conciencia».", "1 Pedro 3:15-16"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "juventud-2-e1",
      tipo: "corta",
      pregunta: "Explica qué es una cosmovisión y cuáles son los cuatro actos de la historia de la Biblia.",
      ideas: [
        { id: "que_es", peso: 30, texto: "Una cosmovisión es la manera de mirar el mundo y responder las preguntas grandes.", formas: ["manera de mirar", "manera de ver", "unos lentes", "preguntas grandes", "las cuatro preguntas"] },
        { id: "actos1", peso: 30, texto: "La creación y la caída.", formas: ["la creacion", "creados a imagen", "la caida", "el pecado"] },
        { id: "actos2", peso: 30, texto: "La redención y la consumación.", formas: ["la redencion", "rescatarnos", "la consumacion", "volvera", "libertada"] },
      ],
      citas: ["Romanos 12:2", "2 Corintios 10:5", "Génesis 3:6", "Romanos 8:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Una cosmovisión es la manera de mirar el mundo: responde las preguntas grandes de dónde venimos, qué salió mal, si hay solución y hacia dónde vamos. La Biblia responde con cuatro actos: la creación, la caída por el pecado, la redención en Cristo y la consumación, cuando la creación será libertada (Romanos 8:21).",
    },
    {
      id: "juventud-2-e2",
      tipo: "corta",
      pregunta: "Explica cómo ayudarías a un joven a construir su identidad en Cristo y no en lo que dicen las redes.",
      ideas: [
        { id: "creado", peso: 30, texto: "Dios lo formó y lo ama: su valor viene de él.", formas: ["lo formo", "me formo", "obra de dios", "lo ama", "formidables, maravillosas"] },
        { id: "nuevo", peso: 30, texto: "En Cristo es una nueva criatura, creada para buenas obras.", formas: ["nueva criatura", "buenas obras", "en cristo"] },
        { id: "practico", peso: 30, texto: "Pasos prácticos: nombrar la mentira y poner límites a las redes.", formas: ["la mentira", "tiempo sin redes", "dejar de seguir", "acompan*"] },
      ],
      citas: ["Salmos 139:13-14", "Salmos 139:14", "2 Corintios 5:17", "Efesios 2:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le mostraría que Dios lo formó en el vientre de su madre y que es una obra maravillosa (Salmos 139:14), así que su valor no depende de los me gusta. En Cristo es una nueva criatura, creada para buenas obras. Lo ayudaría a nombrar la mentira que cree, a poner un tiempo sin redes y lo acompañaría.",
    },
    {
      id: "juventud-2-e3",
      tipo: "corta",
      pregunta: "Explica cómo debe responder un joven cristiano a alguien que critica su fe.",
      ideas: [
        { id: "preparado", peso: 30, texto: "Estar preparado para dar razón de su esperanza.", formas: ["preparado", "dar razon", "presentar defensa", "razones"] },
        { id: "mansedumbre", peso: 30, texto: "Con mansedumbre, verdad y amor.", formas: ["mansedumbre", "verdad en amor", "con amor", "con gracia", "respeto"] },
        { id: "escuchar", peso: 30, texto: "Escuchar, preguntar y presentar a Cristo.", formas: ["escuch*", "pregunt*", "presentar a cristo", "a cristo", "la puerta abierta"] },
      ],
      citas: ["1 Pedro 3:15", "1 Pedro 3:15-16", "Efesios 4:15", "Colosenses 4:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Debe estar preparado para dar razón de su esperanza, pero con mansedumbre y reverencia (1 Pedro 3:15), siguiendo la verdad en amor. Primero escucha y pregunta qué quiere decir la otra persona; después reconoce lo verdadero, muestra la diferencia y presenta a Cristo, y deja la puerta abierta sin perder la amistad.",
    },
    {
      id: "juventud-2-e4",
      tipo: "breve",
      pregunta:
        "Tienes que ayudar a una familia de tu iglesia a armar un acuerdo para el uso de la tecnología. Explica qué incluirían y por qué, con citas bíblicas.",
      ideas: [
        { id: "conversar", peso: 20, texto: "Conversar padres e hijos y revisar el acuerdo.", formas: ["conversar*", "padres e hijos", "cada mes", "revisar*"] },
        { id: "horarios", peso: 30, texto: "Horarios y lugares: sin pantallas en las comidas, el teléfono fuera del cuarto, un lugar común.", formas: ["horario*", "fuera del cuarto", "en las comidas", "lugar comun"] },
        { id: "seguridad", peso: 25, texto: "Seguridad: filtros y contraseñas conocidas por los padres.", formas: ["filtro*", "contrasenas", "seguridad"] },
        { id: "descanso", peso: 25, texto: "Un tiempo de descanso de las redes y el ejemplo de los padres.", formas: ["descanso", "sin redes", "ejemplo", "toda la familia"] },
      ],
      basta: 85,
      citas: ["Efesios 5:15-16", "Efesios 5:16", "1 Corintios 6:12", "Salmos 101:3", "Filipenses 4:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero los padres y los hijos se sentarían a conversar sobre para qué usan el teléfono y qué les preocupa, porque queremos andar como sabios, aprovechando bien el tiempo (Efesios 5:16). Pondríamos horarios: sin pantallas en las comidas y una hora fija para dejar el teléfono por la noche, fuera del cuarto. La computadora se usaría en un lugar común de la casa. Para la seguridad habría filtros, y los padres conocerían las contraseñas de los hijos menores, porque no queremos poner delante de los ojos cosa injusta (Salmos 101:3). También tendrían un tiempo de descanso de las redes cada semana, para la familia y para Dios, y así nadie se dejaría dominar de ninguna cosa (1 Corintios 6:12). Los padres darían el ejemplo y el acuerdo lo firmaría toda la familia. Cada mes se volverían a sentar a revisar cómo va y lo ajustarían.",
    },
    {
      id: "juventud-2-e5",
      tipo: "breve",
      pregunta:
        "Tus jóvenes escuchan mucho una canción cuyo mensaje es vive el momento, nada importa mañana. Explica cómo la analizarías con ellos y qué les enseñarías sobre el entretenimiento, con citas bíblicas.",
      ideas: [
        { id: "discernir", peso: 25, texto: "Ni rechazarlo todo ni aceptarlo todo: examinar y retener lo bueno.", formas: ["examinadlo todo", "retened lo bueno", "examinar", "discern*", "ni rechazar"] },
        { id: "preguntas", peso: 30, texto: "Las cuatro preguntas: Dios, el ser humano, lo bueno y lo malo, lo que provoca.", formas: ["que dice de dios", "del ser humano", "lo bueno y lo malo", "que provoca", "cuatro preguntas"] },
        { id: "falta", peso: 25, texto: "Lo que tiene de verdad y lo que le falta: el mañana importa.", formas: ["el manana importa", "el mundo pasa", "permanece", "tiene de verdad", "le falta"] },
        { id: "crear", peso: 20, texto: "Pensar en lo bueno y crear lo que honra a Dios.", formas: ["en esto pensad", "lo verdadero", "crear", "en el nombre del senor"] },
      ],
      basta: 85,
      citas: ["1 Tesalonicenses 5:21", "Filipenses 4:8", "Colosenses 3:17", "1 Juan 2:17", "1 Juan 2:15-17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "No la prohibiría sin hablar ni la aceptaría sin pensar: les enseñaría a examinarlo todo y retener lo bueno (1 Tesalonicenses 5:21). La analizaríamos juntos con cuatro preguntas: qué dice de Dios, que no aparece; qué dice del ser humano, que la felicidad está en el placer de hoy; qué presenta como lo bueno y lo malo, y qué nos provoca hacer, que es decidir sin pensar en el futuro. Veríamos lo que tiene de verdad, que el presente es un regalo, y lo que le falta: que el mañana importa, porque el mundo pasa y el que hace la voluntad de Dios permanece (1 Juan 2:17). Les enseñaría a medir lo que escuchan con la lista de Filipenses 4:8, en esto pensad, y los animaría a crear canciones buenas, haciéndolo todo en el nombre del Señor Jesús.",
    },
  ],
  breve: {
    id: "juventud-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo prepararías a los jóvenes de tu iglesia para vivir su fe en la escuela y en las redes, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "cosmovision", peso: 20, texto: "Pensar con la historia de la Biblia: los cuatro actos.", formas: ["cosmovision", "cuatro actos", "creacion, caida", "la redencion"] },
      { id: "ideas", peso: 15, texto: "Reconocer las cosmovisiones de hoy.", formas: ["relativismo", "materialismo", "consumismo", "individualismo", "sigue a tu corazon"] },
      { id: "identidad", peso: 20, texto: "La identidad en Cristo.", formas: ["identidad", "nueva criatura", "obra de dios", "templo del espiritu"] },
      { id: "redes", peso: 15, texto: "El uso sabio de las redes.", formas: ["redes", "el telefono", "acuerdo", "horario*"] },
      { id: "discernir", peso: 15, texto: "Discernir el entretenimiento.", formas: ["examinadlo todo", "discern*", "cuatro preguntas", "retened lo bueno"] },
      { id: "responder", peso: 15, texto: "Responder con verdad y amor.", formas: ["mansedumbre", "verdad en amor", "dar razon", "presentar defensa"] },
    ],
    basta: 85,
    citas: ["Romanos 12:2", "Colosenses 2:8", "2 Corintios 5:17", "Salmos 139:14", "Efesios 5:16", "1 Tesalonicenses 5:21", "1 Pedro 3:15", "Efesios 4:15"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Primero les enseñaría a pensar con una cosmovisión cristiana, mirando cada idea con los cuatro actos de la historia de la Biblia, creación, caída, redención y consumación, para no conformarse a este siglo (Romanos 12:2). Veríamos las ideas de hoy, como el relativismo, el materialismo, el individualismo y el consumismo, reconociendo lo que tienen de verdad y lo que les falta, para que nadie los engañe con filosofías que no son según Cristo (Colosenses 2:8). Trabajaríamos su identidad: son obra de Dios y en Cristo son una nueva criatura (2 Corintios 5:17), y no valen por los me gusta. Para las redes, cada familia armaría un acuerdo con horarios, filtros y descanso, para aprovechar bien el tiempo. Les enseñaría a discernir el entretenimiento con cuatro preguntas, examinándolo todo y reteniendo lo bueno. Y practicaríamos cómo responder con mansedumbre y siguiendo la verdad en amor, para dar razón de su esperanza (1 Pedro 3:15).",
  },
};
