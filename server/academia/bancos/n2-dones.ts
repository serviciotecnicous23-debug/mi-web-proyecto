/**
 * El banco de «Dones espirituales y servicio» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué son los dones (y en qué se distinguen de los talentos y del fruto) · o2 los dones de 1 Corintios 12,
 * Romanos 12 y 1 Pedro 4, y su vigencia · o3 los ministerios de Efesios 4, el amor, el orden y el discernimiento ·
 * o4 descubrir el propio don y servir · o5 el versículo de memoria (1 Corintios 12:7).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-dones-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_DONES: BancoMateria = {
  materia: "n2-dones",
  repaso: {
    "n2-dones-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Para qué es dada a cada uno la manifestación del Espíritu, según 1 Corintios 12:7?", "Para provecho", ["Para presumir", "Para ganar la salvación", "Para ser mejores que otros"], "A cada uno le es dada la manifestación del Espíritu para provecho.", "1 Corintios 12:7"],
      ["1-r2", 1, "o1", "comprender", "¿En qué se diferencian los dones del fruto del Espíritu?", "Los dones son lo que Dios hace por medio de nosotros; el fruto, el carácter que forma en nosotros", ["No hay ninguna diferencia", "El fruto es solo para los pastores", "Los dones reemplazan al fruto"], "El fruto del Espíritu es amor, gozo, paz, paciencia: el carácter de Cristo.", "Gálatas 5:22-23"],
      ["1-r3", 1, "o1", "recordar", "¿Quiénes han recibido un don, según 1 Pedro 4:10?", "Cada uno de los creyentes", ["Solo los pastores", "Solo los músicos", "Solo los más espirituales"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ] as P[]).map(p),
    "n2-dones-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Quién reparte los dones, según 1 Corintios 12:11?", "El Espíritu Santo, a cada uno como Él quiere", ["Cada creyente elige el suyo", "El pastor los asigna", "Se compran con ofrendas"], "Todas estas cosas las hace uno y el mismo Espíritu, repartiendo a cada uno en particular como él quiere.", "1 Corintios 12:11"],
      ["2-r2", 2, "o2", "recordar", "¿Cuál de estos es un don de 1 Corintios 12:8-10?", "La palabra de sabiduría", ["La riqueza", "La fama", "La belleza"], "A uno es dada por el Espíritu palabra de sabiduría; a otro, palabra de ciencia según el mismo Espíritu.", "1 Corintios 12:8"],
      ["2-r3", 2, "o2", "comprender", "¿Por qué creen las iglesias pentecostales que los dones siguen vigentes?", "Porque la iglesia los tiene esperando la venida de Cristo", ["Porque lo decidió un concilio", "Porque los apóstoles nunca murieron", "Porque así lo dice la tradición"], "Nada os falta en ningún don, esperando la manifestación de nuestro Señor Jesucristo.", "1 Corintios 1:7"],
    ] as P[]).map(p),
    "n2-dones-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Con qué compara Pablo a la iglesia en Romanos 12:4-5?", "Con un cuerpo de muchos miembros", ["Con un ejército", "Con un edificio vacío", "Con una empresa"], "Así nosotros, siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros.", "Romanos 12:5"],
      ["3-r2", 3, "o2", "comprender", "¿Qué dos grandes grupos de dones menciona 1 Pedro 4:11?", "Los dones para hablar y los dones para servir", ["Los dones caros y los baratos", "Los dones de hombres y los de mujeres", "Los dones antiguos y los nuevos"], "Si alguno habla, hable conforme a las palabras de Dios; si alguno ministra, ministre conforme al poder que Dios da.", "1 Pedro 4:11"],
      ["3-r3", 3, "o2", "recordar", "¿Cómo pide Romanos 12:8 hacer misericordia?", "Con alegría", ["Con tristeza", "Para que lo vean", "Solo a los amigos"], "El que hace misericordia, con alegría.", "Romanos 12:8"],
    ] as P[]).map(p),
    "n2-dones-4": ([
      ["4-r1", 4, "o3", "recordar", "¿Qué ministerios dio Cristo a la iglesia, según Efesios 4:11?", "Apóstoles, profetas, evangelistas, pastores y maestros", ["Reyes, sacerdotes y jueces", "Músicos, ujieres y tesoreros", "Ancianos, levitas y escribas"], "Él mismo constituyó a unos, apóstoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros.", "Efesios 4:11"],
      ["4-r2", 4, "o3", "comprender", "¿Para qué dio Cristo esos ministerios?", "Para preparar a los santos para la obra del ministerio", ["Para que hagan todo el trabajo solos", "Para gobernar la ciudad", "Para recibir honra"], "A fin de perfeccionar a los santos para la obra del ministerio, para la edificación del cuerpo de Cristo.", "Efesios 4:12"],
      ["4-r3", 4, "o3", "comprender", "¿Cómo crece el cuerpo de Cristo, según Efesios 4:15-16?", "Siguiendo la verdad en amor, cuando cada miembro hace su parte", ["Cuando solo el pastor trabaja", "Con más reglas", "Sin la verdad"], "Siguiendo la verdad en amor, crezcamos en todo en aquel que es la cabeza, esto es, Cristo.", "Efesios 4:15"],
    ] as P[]).map(p),
    "n2-dones-5": ([
      ["5-r1", 5, "o3", "comprender", "¿Qué vale un don sin amor, según 1 Corintios 13:1-3?", "Nada", ["Mucho, si es espectacular", "Lo mismo que con amor", "Más que el amor"], "Si no tengo amor, nada soy.", "1 Corintios 13:2"],
      ["5-r2", 5, "o3", "recordar", "¿Para qué debe hacerse todo en la reunión, según 1 Corintios 14:26?", "Para edificación", ["Para impresionar", "Para que dure más", "Para que cada uno se luzca"], "Hágase todo para edificación.", "1 Corintios 14:26"],
      ["5-r3", 5, "o3", "comprender", "¿Qué pide 1 Tesalonicenses 5:21 sobre lo que se dice en nombre de Dios?", "Examinarlo todo y retener lo bueno", ["Creer todo sin examinar", "Rechazarlo todo", "No hablar del tema"], "Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:21"],
    ] as P[]).map(p),
    "n2-dones-6": ([
      ["6-r1", 6, "o4", "recordar", "¿Cómo colocó Dios los miembros en el cuerpo, según 1 Corintios 12:18?", "Como Él quiso", ["Al azar", "Por votación", "Según su riqueza"], "Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso.", "1 Corintios 12:18"],
      ["6-r2", 6, "o4", "comprender", "¿Cuál es una buena manera de descubrir tu don?", "Orar y servir en distintas áreas, mirando el fruto", ["Esperar sentado una señal", "Copiar el don de otro", "Hacer un examen y no servir"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
      ["6-r3", 6, "o4", "aplicar", "¿Con qué empieza todo servicio, según Romanos 12:1?", "Con presentar el cuerpo en sacrificio vivo a Dios", ["Con tener un cargo", "Con saber cuál es el don", "Con recibir un pago"], "Presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "Romanos 12:1"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: los dones, regalos del Espíritu para servir (8)
    ["f01", 1, "o1", "recordar", "Según 1 Corintios 12:4, ¿qué hay en la iglesia?", "Diversidad de dones, pero el Espíritu es el mismo", ["Un solo don para todos", "Dones que se compran", "Dones solo para los líderes"], "Hay diversidad de dones, pero el Espíritu es el mismo.", "1 Corintios 12:4"],
    ["f02", 1, "o1", "comprender", "¿Qué es un don espiritual?", "Una capacidad que el Espíritu Santo da al creyente para edificar a la iglesia", ["Un talento con el que se nace", "Un premio por portarse bien", "Un título que da la iglesia"], "Todas estas cosas las hace uno y el mismo Espíritu, repartiendo a cada uno en particular.", "1 Corintios 12:11"],
    ["f03", 1, "o1", "comprender", "¿Qué es un talento natural?", "Una capacidad que Dios nos dio al nacer y que también se pone a su servicio", ["Lo mismo que un don espiritual", "Algo que no viene de Dios", "Algo que no sirve en la iglesia"], "Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces.", "Santiago 1:17"],
    ["f04", 1, "o1", "recordar", "¿Cuál de estos es parte del fruto del Espíritu?", "La paciencia", ["La profecía", "La interpretación de lenguas", "La palabra de ciencia"], "El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", "Gálatas 5:22-23"],
    ["f05", 1, "o1", "comprender", "¿Por qué los dones no son para lucirse?", "Porque se dan para provecho de todos", ["Porque son pocos", "Porque son peligrosos", "Porque nadie los ve"], "A cada uno le es dada la manifestación del Espíritu para provecho.", "1 Corintios 12:7"],
    ["f06", 1, "o1", "recordar", "¿De qué somos administradores, según 1 Pedro 4:10?", "De la multiforme gracia de Dios", ["De los bienes de la iglesia", "De la ley de Moisés", "De los reinos del mundo"], "Como buenos administradores de la multiforme gracia de Dios.", "1 Pedro 4:10"],
    ["f07", 1, "o1", "aplicar", "Una hermana dice que ella no tiene ningún don. ¿Qué le responderías?", "Que todo creyente recibió al menos un don para servir a otros", ["Que tiene razón: solo algunos tienen dones", "Que debe esperar años", "Que los dones ya no existen"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ["f08", 1, "o5", "recordar", "¿Cómo termina 1 Corintios 12:7, el versículo de memoria de esta materia?", "Le es dada la manifestación del Espíritu para provecho", ["Le es dada una corona de justicia", "Le es dada la ley escrita", "Le es dado un lugar en el templo"], "Pero a cada uno le es dada la manifestación del Espíritu para provecho.", "1 Corintios 12:7"],
    // ---- lección 2: los dones de 1 Corintios 12 (8)
    ["f09", 2, "o2", "recordar", "¿Cuál de estos dones de 1 Corintios 12 es un don de poder?", "Hacer milagros", ["Palabra de ciencia", "Interpretación de lenguas", "Discernimiento de espíritus"], "A otro, el hacer milagros; a otro, profecía.", "1 Corintios 12:10"],
    ["f10", 2, "o2", "recordar", "¿Qué don acompaña a las lenguas en 1 Corintios 12:10?", "La interpretación de lenguas", ["La sanidad", "La enseñanza", "El servicio"], "A otro, diversos géneros de lenguas; y a otro, interpretación de lenguas.", "1 Corintios 12:10"],
    ["f11", 2, "o2", "comprender", "¿Puede alguien elegir o comprar su don?", "No: el Espíritu lo reparte por gracia, como Él quiere", ["Sí, con suficiente oración", "Sí, con una ofrenda", "Sí, si lo pide el pastor"], "Repartiendo a cada uno en particular como él quiere.", "1 Corintios 12:11"],
    ["f12", 2, "o2", "recordar", "¿Qué hace la profecía, según 1 Corintios 14:3?", "Edifica, exhorta y consuela", ["Condena y asusta", "Divide a la iglesia", "Reemplaza a la Biblia"], "El que profetiza habla a los hombres para edificación, exhortación y consolación.", "1 Corintios 14:3"],
    ["f13", 2, "o2", "comprender", "¿Qué debe hacerse con lo que se dice en nombre del Espíritu?", "Examinarlo a la luz de la Escritura y retener lo bueno", ["Aceptarlo siempre", "Rechazarlo siempre", "Ignorarlo"], "Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:21"],
    ["f14", 2, "o2", "comprender", "¿Cuándo dejarán de ser necesarios los dones, según 1 Corintios 13:12?", "Cuando veamos cara a cara, a la venida de Cristo", ["Cuando murieron los apóstoles", "Cuando se terminó de escribir la Biblia", "Nunca se usaron de verdad"], "Ahora vemos por espejo, oscuramente; mas entonces veremos cara a cara.", "1 Corintios 13:12"],
    ["f15", 2, "o2", "analizar", "¿Por qué Pablo no les dijo a los corintios que dejaran los dones?", "Porque el problema era el desorden, no los dones: había que usarlos bien", ["Porque no le importaba el desorden", "Porque los dones eran solo para Corinto", "Porque prefería que no los usaran"], "Procurad, pues, los dones mejores. Mas yo os muestro un camino aún más excelente.", "1 Corintios 12:31"],
    ["f16", 2, "o2", "aplicar", "Alguien dice una profecía que contradice la Biblia. ¿Qué hacer?", "No recibirla, porque una profecía verdadera nunca contradice la Escritura", ["Obedecerla porque viene del Espíritu", "Callar para no ofender", "Cambiar la Biblia"], "Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:21"],
    // ---- lección 3: los dones de Romanos 12 y 1 Pedro 4 (8)
    ["f17", 3, "o2", "recordar", "¿Cuál de estos dones aparece en Romanos 12:7-8?", "La enseñanza", ["La riqueza", "El poder político", "La belleza"], "El que enseña, en la enseñanza; el que exhorta, en la exhortación.", "Romanos 12:7-8"],
    ["f18", 3, "o2", "recordar", "¿Cómo pide Romanos 12:8 que se reparta?", "Con liberalidad", ["Con tristeza", "Con avaricia", "Para que lo vean"], "El que reparte, con liberalidad; el que preside, con solicitud.", "Romanos 12:8"],
    ["f19", 3, "o2", "comprender", "¿Qué significa que somos un cuerpo con muchos miembros?", "Que cada uno tiene una función distinta y todos son necesarios", ["Que todos deben hacer lo mismo", "Que unos valen más que otros", "Que no necesitamos a nadie"], "Así nosotros, siendo muchos, somos un cuerpo en Cristo.", "Romanos 12:4-5"],
    ["f20", 3, "o2", "recordar", "Según 1 Pedro 4:11, ¿cómo debe hablar el que habla?", "Conforme a las palabras de Dios", ["Según su propia opinión", "Para entretener", "Con palabras difíciles"], "Si alguno habla, hable conforme a las palabras de Dios.", "1 Pedro 4:11"],
    ["f21", 3, "o2", "comprender", "¿Cuál es el fin de todos los dones, según 1 Pedro 4:11?", "Que en todo sea Dios glorificado por Jesucristo", ["Que el que sirve sea famoso", "Que la iglesia sea rica", "Que nadie note el servicio"], "Para que en todo sea Dios glorificado por Jesucristo.", "1 Pedro 4:11"],
    ["f22", 3, "o2", "comprender", "Según 1 Corintios 12:22, ¿cómo son los miembros que parecen más débiles?", "Los más necesarios", ["Los menos importantes", "Los que sobran", "Los que deben salir"], "Los miembros del cuerpo que parecen más débiles, son los más necesarios.", "1 Corintios 12:22"],
    ["f23", 3, "o2", "aplicar", "Un hermano atiende el sonido cada domingo y cree que su servicio no cuenta. ¿Qué le enseña esta lección?", "Que su servicio es un don necesario en el cuerpo de Cristo", ["Que tiene razón", "Que debe buscar un servicio que se vea", "Que solo cuenta predicar"], "Los miembros del cuerpo que parecen más débiles, son los más necesarios.", "1 Corintios 12:22"],
    ["f24", 3, "o2", "comprender", "¿Qué don de Romanos 12 se ocupa de animar y alentar a otros?", "La exhortación", ["El presidir", "El repartir", "La profecía"], "El que exhorta, en la exhortación.", "Romanos 12:8"],
    // ---- lección 4: los ministerios de Efesios 4 (7)
    ["f25", 4, "o3", "comprender", "Según Efesios 4:12, ¿quiénes hacen la obra del ministerio?", "Los santos, preparados por los líderes", ["Solo los pastores", "Solo los apóstoles", "Nadie en particular"], "A fin de perfeccionar a los santos para la obra del ministerio.", "Efesios 4:12"],
    ["f26", 4, "o3", "recordar", "¿Hasta dónde debemos crecer, según Efesios 4:13?", "A la medida de la estatura de la plenitud de Cristo", ["Hasta tener un cargo", "Hasta saber más que otros", "Hasta dejar de congregarnos"], "Hasta que todos lleguemos a la unidad de la fe, a la medida de la estatura de la plenitud de Cristo.", "Efesios 4:13"],
    ["f27", 4, "o3", "comprender", "¿De qué nos libra la madurez, según Efesios 4:14?", "De ser llevados por todo viento de doctrina", ["De tener problemas", "De servir a otros", "De estudiar la Biblia"], "Para que ya no seamos niños fluctuantes, llevados por doquiera de todo viento de doctrina.", "Efesios 4:14"],
    ["f28", 4, "o3", "analizar", "¿Qué error corrige Efesios 4 sobre el trabajo en la iglesia?", "Pensar que el pastor debe hacer todo el trabajo", ["Pensar que todos deben servir", "Pensar que hay que estudiar", "Pensar que la iglesia es un cuerpo"], "Los líderes perfeccionan a los santos para la obra del ministerio.", "Efesios 4:11-12"],
    ["f29", 4, "o3", "recordar", "¿Quién es la cabeza del cuerpo, según Efesios 4:15?", "Cristo", ["El pastor", "El apóstol", "El concilio"], "Crezcamos en todo en aquel que es la cabeza, esto es, Cristo.", "Efesios 4:15"],
    ["f30", 4, "o3", "comprender", "¿Qué significa seguir la verdad en amor?", "Vivir y decir la verdad de Dios con amor, sin dureza ni mentira", ["Decir la verdad sin importar cómo", "Callar la verdad para no ofender", "Mentir por amor"], "Siguiendo la verdad en amor, crezcamos en todo en aquel que es la cabeza.", "Efesios 4:15"],
    ["f31", 4, "o3", "aplicar", "¿Cómo ayuda la academia a vivir Efesios 4:12?", "Preparando a cada discípulo para la obra del ministerio", ["Reemplazando a la iglesia", "Formando solo a los pastores", "Dando títulos sin servir"], "A fin de perfeccionar a los santos para la obra del ministerio.", "Efesios 4:12"],
    // ---- lección 5: el amor y el orden (7)
    ["f32", 5, "o3", "recordar", "Según 1 Corintios 13:1, ¿a qué se parece quien habla lenguas sin amor?", "A metal que resuena o címbalo que retiñe", ["A un ángel", "A un profeta", "A una lámpara encendida"], "Si yo hablase lenguas humanas y angélicas, y no tengo amor, vengo a ser como metal que resuena, o címbalo que retiñe.", "1 Corintios 13:1"],
    ["f33", 5, "o3", "recordar", "¿Cuál de estas es una cualidad del amor, según 1 Corintios 13:4?", "Es sufrido y benigno", ["Es envidioso", "Es jactancioso", "Busca lo suyo"], "El amor es sufrido, es benigno; el amor no tiene envidia.", "1 Corintios 13:4"],
    ["f34", 5, "o3", "comprender", "¿Qué se pide para hablar en lenguas en la reunión, según 1 Corintios 14:27-28?", "Que haya interpretación, para que todos entiendan", ["Que todos hablen a la vez", "Que nadie hable nunca", "Que no importe si se entiende"], "Si habla alguno en lengua extraña, uno interprete; y si no hay intérprete, calle en la iglesia.", "1 Corintios 14:27-28"],
    ["f35", 5, "o3", "recordar", "¿Qué se hace con las profecías en la reunión, según 1 Corintios 14:29?", "Los demás juzgan lo que se dice", ["Se aceptan sin examinar", "Se prohíben", "Se escriben como Escritura"], "Los profetas hablen dos o tres, y los demás juzguen.", "1 Corintios 14:29"],
    ["f36", 5, "o3", "recordar", "Según 1 Corintios 14:33, ¿de qué no es Dios?", "De confusión", ["De paz", "De orden", "De amor"], "Pues Dios no es Dios de confusión, sino de paz.", "1 Corintios 14:33"],
    ["f37", 5, "o3", "comprender", "¿Qué equilibrio enseña 1 Tesalonicenses 5:19-21?", "No apagar al Espíritu y, a la vez, examinarlo todo", ["Rechazar todo don", "Aceptar todo sin examinar", "No hablar nunca de los dones"], "No apaguéis al Espíritu. No menospreciéis las profecías. Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:19-21"],
    ["f38", 5, "o3", "aplicar", "En una reunión, varias personas hablan en lenguas a la vez y sin interpretación. ¿Qué enseña Pablo?", "Que todo se haga decentemente y con orden, para edificación", ["Que así se debe hacer siempre", "Que hay que prohibir las lenguas", "Que no importa el orden"], "Pero hágase todo decentemente y con orden.", "1 Corintios 14:40"],
    // ---- lección 6: descubrir tu don y servir (7)
    ["f39", 6, "o4", "comprender", "Según 1 Corintios 12:21, ¿puede un miembro decirle a otro que no lo necesita?", "No: todos los miembros se necesitan", ["Sí, si es más importante", "Sí, si no lo conoce", "Sí, si sirve en otro lado"], "Ni el ojo puede decir a la mano: No te necesito.", "1 Corintios 12:21"],
    ["f40", 6, "o4", "aplicar", "¿Qué es lo primero para descubrir tu don?", "Pedirlo en oración y estar dispuesto a servir", ["Esperar a que te lo digan", "Compararte con otros", "Pedir un cargo"], "Vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan.", "Lucas 11:13"],
    ["f41", 6, "o4", "comprender", "¿Por qué el don se descubre sirviendo?", "Porque en el servicio se ve el fruto y lo que edifica a otros", ["Porque los dones aparecen solos", "Porque servir es la única forma de salvarse", "Porque los líderes lo exigen"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ["f42", 6, "o4", "comprender", "¿Qué pueden aportar los líderes y los hermanos maduros?", "Ver y confirmar lo que Dios hace en ti", ["Darte un don", "Quitarte el don", "Decidir tu salvación"], "En la multitud de consejeros hay seguridad.", "Proverbios 11:14"],
    ["f43", 6, "o4", "aplicar", "Una joven siente mucha carga por los niños de su barrio. ¿Qué puede indicar eso?", "Que quizá Dios la llama a servir a los niños", ["Que debe ignorarlo", "Que no tiene ningún don", "Que es una emoción sin importancia"], "Dios produce en vosotros así el querer como el hacer, por su buena voluntad.", "Filipenses 2:13"],
    ["f44", 6, "o4", "aplicar", "¿Cuál es un buen primer paso para servir esta semana?", "Hablar con el líder de un ministerio y ofrecer ayuda", ["Esperar a conocer bien el don", "Criticar cómo se sirve ahora", "Pedir un cargo de liderazgo"], "Presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "Romanos 12:1"],
    ["f45", 6, "o4", "comprender", "¿Qué requisito del Nivel 2 se relaciona con esta materia?", "Servir un mes en un ministerio", ["Predicar un sermón", "Escribir un libro", "Viajar como misionero"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "Según 1 Corintios 12:5, ¿qué hay además de diversidad de dones?", "Diversidad de ministerios, pero el Señor es el mismo", ["Un solo ministerio", "Diversidad de dioses", "Ministerios sin Señor"], "Hay diversidad de ministerios, pero el Señor es el mismo.", "1 Corintios 12:5"],
      ["m1-02", 1, "o1", "comprender", "¿Qué muestran los dones y qué muestra el fruto?", "Los dones, lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros", ["Los dos son lo mismo", "El fruto es más espectacular", "Los dones forman el carácter"], "El fruto del Espíritu es amor, gozo, paz.", "Gálatas 5:22"],
      ["m1-03", 1, "o1", "recordar", "Según 1 Corintios 12:6, ¿quién hace todas las cosas en todos?", "Dios", ["El pastor", "Cada creyente solo", "La iglesia"], "Hay diversidad de operaciones, pero Dios, que hace todas las cosas en todos, es el mismo.", "1 Corintios 12:6"],
      ["m1-04", 1, "o1", "comprender", "¿Para qué se recibe cada don, según 1 Pedro 4:10?", "Para ministrarlo a los otros", ["Para guardarlo", "Para presumirlo", "Para venderlo"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
      ["m1-05", 1, "o1", "comprender", "¿Puede un talento natural servir a Dios?", "Sí: también se pone al servicio de Dios", ["No: solo sirven los dones espirituales", "No: los talentos son mundanos", "Solo si es la música"], "Todo lo que hagáis, hacedlo de corazón, como para el Señor.", "Colosenses 3:23"],
      ["m1-06", 1, "o1", "aplicar", "¿Qué pregunta ayuda a empezar a reconocer tu don?", "¿Qué ha usado Dios en mí para ayudar a otros?", ["¿Qué don me haría famoso?", "¿Qué don tiene mi amigo?", "¿Qué don me pagaría más?"], "A cada uno le es dada la manifestación del Espíritu para provecho.", "1 Corintios 12:7"],
      ["m1-07", 2, "o2", "recordar", "¿Qué don da el Espíritu a uno en 1 Corintios 12:9, junto con las sanidades?", "La fe", ["La riqueza", "La fama", "La enseñanza"], "A otro, fe por el mismo Espíritu; y a otro, dones de sanidades por el mismo Espíritu.", "1 Corintios 12:9"],
      ["m1-08", 2, "o2", "recordar", "¿Qué don permite distinguir lo que viene de Dios de lo que no?", "El discernimiento de espíritus", ["La interpretación de lenguas", "La palabra de ciencia", "Hacer milagros"], "A otro, discernimiento de espíritus.", "1 Corintios 12:10"],
      ["m1-09", 2, "o2", "comprender", "¿Qué le faltaba a la iglesia de Corinto, según 1 Corintios 1:7?", "Ningún don", ["Todos los dones", "Los dones de poder", "Las lenguas"], "De tal manera que nada os falta en ningún don.", "1 Corintios 1:7"],
      ["m1-10", 2, "o2", "comprender", "¿Qué problema tenían los corintios con los dones?", "El desorden y el orgullo", ["Que no tenían ninguno", "Que no los conocían", "Que los vendían"], "Dios no es Dios de confusión, sino de paz.", "1 Corintios 14:33"],
      ["m1-11", 2, "o2", "recordar", "¿Cuál es un don de expresión de 1 Corintios 12?", "La profecía", ["La fe", "Las sanidades", "Los milagros"], "A otro, profecía.", "1 Corintios 12:10"],
      ["m1-12", 2, "o2", "aplicar", "¿Qué hacer si una palabra profética te inquieta?", "Examinarla con la Biblia y con los líderes maduros", ["Obedecerla sin pensar", "Despreciar toda profecía", "Guardarla en secreto"], "Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:21"],
      ["m1-13", 3, "o2", "recordar", "¿Cómo debe usarse la profecía, según Romanos 12:6?", "Conforme a la medida de la fe", ["Para asustar", "Para ganar dinero", "Sin ninguna medida"], "Si el de profecía, úsese conforme a la medida de la fe.", "Romanos 12:6"],
      ["m1-14", 3, "o2", "recordar", "¿Cómo debe presidir el que preside, según Romanos 12:8?", "Con solicitud", ["Con dureza", "Con orgullo", "Con pereza"], "El que preside, con solicitud.", "Romanos 12:8"],
      ["m1-15", 3, "o2", "comprender", "Según 1 Pedro 4:11, ¿con qué poder sirve el que ministra?", "Con el poder que Dios da", ["Con su propia fuerza", "Con dinero", "Con la aprobación de los hombres"], "Si alguno ministra, ministre conforme al poder que Dios da.", "1 Pedro 4:11"],
      ["m1-16", 3, "o2", "comprender", "¿Por qué en un cuerpo no todos tienen la misma función?", "Porque así el cuerpo funciona completo y cada uno aporta lo suyo", ["Porque unos valen menos", "Porque Dios se equivocó", "Porque no hay suficientes dones"], "Todos los miembros no tienen la misma función.", "Romanos 12:4"],
      ["m1-17", 3, "o2", "recordar", "¿Qué don de Romanos 12:7 se ejerce en la enseñanza?", "El que enseña", ["El que reparte", "El que preside", "El que hace misericordia"], "El que enseña, en la enseñanza.", "Romanos 12:7"],
      ["m1-18", 3, "o2", "aplicar", "¿Cuál es un don para servir que puedes usar en tu iglesia?", "Recibir a las personas, ayudar a organizar o visitar a los enfermos", ["Criticar a los que sirven", "Esperar a que te pidan", "Servir solo si te ven"], "Si alguno ministra, ministre conforme al poder que Dios da.", "1 Pedro 4:11"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Qué buscan los ministerios de Efesios 4:13 para todos?", "La unidad de la fe y del conocimiento del Hijo de Dios", ["La división en grupos", "El poder político", "La riqueza"], "Hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios.", "Efesios 4:13"],
      ["m2-02", 4, "o3", "comprender", "¿Qué significa perfeccionar a los santos?", "Prepararlos y equiparlos para servir", ["Hacerlos sin pecado de un día para otro", "Darles títulos", "Separarlos del mundo"], "A fin de perfeccionar a los santos para la obra del ministerio.", "Efesios 4:12"],
      ["m2-03", 4, "o3", "recordar", "¿Qué hace el cuerpo bien unido, según Efesios 4:16?", "Recibe su crecimiento para irse edificando en amor", ["Se divide", "Se debilita", "Se queda igual"], "Todo el cuerpo, bien concertado y unido entre sí, recibe su crecimiento para ir edificándose en amor.", "Efesios 4:16"],
      ["m2-04", 4, "o3", "comprender", "¿Qué les pasa a los creyentes inmaduros, según Efesios 4:14?", "Son llevados por todo viento de doctrina", ["Nunca tienen dudas", "Saben más que todos", "Enseñan a otros"], "Llevados por doquiera de todo viento de doctrina.", "Efesios 4:14"],
      ["m2-05", 4, "o3", "comprender", "¿Qué papel tiene cada miembro en el crecimiento del cuerpo?", "Hacer su parte para que el cuerpo crezca", ["Ninguno: solo crecen los líderes", "Mirar desde afuera", "Esperar que otros sirvan"], "Según la actividad propia de cada miembro.", "Efesios 4:16"],
      ["m2-06", 4, "o3", "aplicar", "¿Qué puede hacer un creyente maduro por los nuevos?", "Prepararlos y animarlos a servir", ["Hacer todo por ellos", "Ignorarlos", "Juzgarlos"], "Lo que has oído de mí, esto encarga a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
      ["m2-07", 5, "o3", "recordar", "Según 1 Corintios 13:8, ¿qué nunca deja de ser?", "El amor", ["Las profecías", "Las lenguas", "La ciencia"], "El amor nunca deja de ser; pero las profecías se acabarán.", "1 Corintios 13:8"],
      ["m2-08", 5, "o3", "recordar", "¿Qué no hace el amor, según 1 Corintios 13:5?", "No busca lo suyo", ["No perdona", "No espera", "No sirve"], "No hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.", "1 Corintios 13:5"],
      ["m2-09", 5, "o3", "comprender", "¿Por qué Pablo puso el capítulo del amor entre los capítulos de los dones?", "Porque sin amor los dones pierden su sentido", ["Por casualidad", "Porque el amor reemplaza a los dones", "Porque los dones no importan"], "Si no tengo amor, nada soy.", "1 Corintios 13:2"],
      ["m2-10", 5, "o3", "recordar", "¿Cómo debe hacerse todo, según 1 Corintios 14:40?", "Decentemente y con orden", ["Con prisa", "En voz muy alta", "Sin planear"], "Pero hágase todo decentemente y con orden.", "1 Corintios 14:40"],
      ["m2-11", 5, "o3", "comprender", "¿Qué debe hacer quien habla en lenguas si no hay intérprete en la reunión?", "Callar en la iglesia y hablar para sí mismo y para Dios", ["Hablar más fuerte", "Seguir hablando igual", "Irse de la iglesia"], "Si no hay intérprete, calle en la iglesia, y hable para sí mismo y para Dios.", "1 Corintios 14:28"],
      ["m2-12", 5, "o3", "aplicar", "¿Cómo saber si un don se usa como Dios quiere?", "Si se usa con amor y edifica a la iglesia", ["Si llama mucho la atención", "Si es muy emocionante", "Si lo usa alguien famoso"], "Hágase todo para edificación.", "1 Corintios 14:26"],
      ["m2-13", 6, "o4", "recordar", "¿Qué dice 1 Corintios 12:20 sobre los miembros y el cuerpo?", "Son muchos los miembros, pero el cuerpo es uno", ["Hay un solo miembro", "Hay muchos cuerpos", "Los miembros no forman un cuerpo"], "Pero ahora son muchos los miembros, pero el cuerpo es uno solo.", "1 Corintios 12:20"],
      ["m2-14", 6, "o4", "comprender", "¿Por qué no hay que esperar a conocer el don para empezar a servir?", "Porque sirviendo se descubre el don", ["Porque los dones no existen", "Porque servir es opcional", "Porque el don llega con un cargo"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
      ["m2-15", 6, "o4", "recordar", "Según Lucas 11:13, ¿a quiénes dará el Padre el Espíritu Santo?", "A los que se lo pidan", ["Solo a los perfectos", "Solo a los apóstoles", "A nadie hoy"], "¿Cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?", "Lucas 11:13"],
      ["m2-16", 6, "o4", "comprender", "¿Qué indica el gozo al servir en un área?", "Que puede ser un lugar donde Dios te quiere usar", ["Que estás haciendo algo malo", "Que no es tu don", "Nada en absoluto"], "Servid a Jehová con alegría.", "Salmos 100:2"],
      ["m2-17", 6, "o4", "aplicar", "¿Qué actitud pide Romanos 12:1 para servir?", "Una vida entregada a Dios como sacrificio vivo", ["Una vida para uno mismo", "Un servicio solo los domingos", "Una entrega a medias"], "Presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "Romanos 12:1"],
      ["m2-18", 6, "o4", "aplicar", "¿Cuál de estos es un ministerio donde puedes ofrecer tu ayuda?", "La enseñanza a los niños, la alabanza, la oración o la visitación", ["Ninguno: hay que esperar años", "Solo el pastorado", "Solo la predicación"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-dones-e1",
      tipo: "corta",
      pregunta: "¿Qué son los dones espirituales, para qué los da Dios y en qué se distinguen del fruto del Espíritu?",
      ideas: [
        { id: "espiritu", peso: 25, texto: "Que son capacidades que da el Espíritu Santo.", formas: ["espiritu santo", "capacidad*", "regalo*", "gracia"] },
        { id: "provecho", peso: 30, texto: "Que se dan para provecho de todos, para servir y edificar a la iglesia.", formas: ["provecho", "servir", "edific*", "ayudar", "los demas", "otros"] },
        { id: "fruto", peso: 25, texto: "Que el fruto es el carácter de Cristo formado en nosotros.", formas: ["fruto", "caracter", "amor gozo paz"] },
        { id: "todos", peso: 10, texto: "Que cada creyente recibió al menos un don.", formas: ["cada uno", "cada creyente", "todos", "todo creyente"] },
      ],
      citas: ["1 Corintios 12:7", "1 Corintios 12:4-7", "1 Pedro 4:10", "Gálatas 5:22-23", "1 Corintios 12:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los dones espirituales son capacidades que el Espíritu Santo da a cada creyente, y se dan para provecho de todos: para servir y edificar a la iglesia (1 Corintios 12:7). Se distinguen del fruto del Espíritu, que es el carácter de Cristo formado en nosotros: amor, gozo, paz (Gálatas 5:22-23). Los dones son lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros.",
    },
    {
      id: "n2-dones-e2",
      tipo: "corta",
      pregunta: "Menciona algunos dones de 1 Corintios 12 o de Romanos 12, y explica por qué creemos que siguen vigentes hoy.",
      ideas: [
        { id: "lista", peso: 30, texto: "Nombrar dones: sabiduría, ciencia, fe, sanidades, milagros, profecía, discernimiento, lenguas, interpretación, enseñanza, servicio, exhortación, misericordia.", formas: ["sabiduria", "ciencia", "sanidad*", "milagros", "profecia", "discernimiento", "lenguas", "interpretacion", "enseñanza", "ensenanza", "exhortacion", "misericordia", "servicio"] },
        { id: "reparte", peso: 20, texto: "Que el Espíritu los reparte como Él quiere.", formas: ["como el quiere", "reparte", "repartiendo", "el espiritu"] },
        { id: "vigentes", peso: 30, texto: "Que siguen vigentes hasta la venida de Cristo.", formas: ["vigente*", "venida", "esperando la manifestacion", "cara a cara", "hasta que cristo", "hoy"] },
        { id: "orden", peso: 10, texto: "Que se usan con amor, orden y discernimiento.", formas: ["orden", "amor", "examin*", "discern*"] },
      ],
      citas: ["1 Corintios 12:8-11", "1 Corintios 1:7", "1 Corintios 13:12", "Romanos 12:6-8", "1 Tesalonicenses 5:19-21"],
      pesoCita: 10,
      errores: [
        { id: "cesaron", anula: "vigentes", texto: "La Biblia enseña que la iglesia tiene los dones esperando la venida de Cristo (1 Corintios 1:7); no dice que cesaran con los apóstoles.", formas: ["ya no existen", "ya cesaron", "terminaron con los apostoles", "solo fueron para los apostoles"] },
      ],
      modelo:
        "En 1 Corintios 12 el Espíritu reparte dones como la palabra de sabiduría, la fe, las sanidades, la profecía y las lenguas, y en Romanos 12 aparecen la enseñanza, la exhortación y la misericordia. El Espíritu los reparte como Él quiere. Creemos que siguen vigentes porque la iglesia los tiene esperando la manifestación de nuestro Señor Jesucristo (1 Corintios 1:7), y se usan con amor y con orden.",
    },
    {
      id: "n2-dones-e3",
      tipo: "corta",
      pregunta: "Explica por qué el amor y el orden son necesarios para usar los dones en la iglesia (1 Corintios 13 y 14).",
      ideas: [
        { id: "amor", peso: 35, texto: "Que sin amor los dones no valen nada; el amor es el camino más excelente.", formas: ["sin amor", "nada soy", "camino aun mas excelente", "mas excelente", "amor"] },
        { id: "edificacion", peso: 25, texto: "Que todo se hace para edificación.", formas: ["edific*"] },
        { id: "orden", peso: 20, texto: "Que todo se hace con orden: interpretación de lenguas y profecías juzgadas.", formas: ["orden", "interpret*", "juzg*", "confusion", "paz"] },
        { id: "equilibrio", peso: 10, texto: "Que no se apaga al Espíritu, pero se examina todo.", formas: ["apagar", "apagueis", "examin*", "retened"] },
      ],
      citas: ["1 Corintios 13:1-3", "1 Corintios 13:2", "1 Corintios 14:26", "1 Corintios 14:33", "1 Corintios 14:40", "1 Tesalonicenses 5:19-21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Sin amor, los dones no valen nada: aunque alguien hable lenguas o profetice, si no tiene amor, nada es (1 Corintios 13:2). Por eso el amor es el camino más excelente. Además, todo debe hacerse para edificación y con orden, con interpretación de las lenguas y juzgando las profecías, porque Dios no es Dios de confusión, sino de paz (1 Corintios 14:33). No apagamos al Espíritu, pero lo examinamos todo.",
    },
    {
      id: "n2-dones-e4",
      tipo: "corta",
      pregunta: "¿Cómo puede un creyente descubrir su don y empezar a servir en la iglesia?",
      ideas: [
        { id: "orar", peso: 20, texto: "Pedirlo en oración.", formas: ["orar", "orando", "ore", "orare", "oracion", "pedir*", "pidiendo", "pidiendolo"] },
        { id: "servir", peso: 30, texto: "Servir en distintas áreas: el don se descubre sirviendo.", formas: ["servir", "sirviendo", "servicio", "ministerio*", "ayudar"] },
        { id: "fruto", peso: 20, texto: "Mirar el fruto y escuchar a los líderes y hermanos maduros.", formas: ["fruto", "lideres", "lider", "pastor", "hermanos", "consejo"] },
        { id: "entrega", peso: 20, texto: "Entregarse a Dios como sacrificio vivo, con un corazón dispuesto.", formas: ["sacrificio vivo", "entreg*", "dispuest*", "gozo", "carga"] },
      ],
      citas: ["Romanos 12:1", "1 Pedro 4:10", "1 Corintios 12:18", "Lucas 11:13", "1 Corintios 12:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero puede pedirlo en oración, porque el Espíritu reparte los dones. Después debe servir en distintas áreas de la iglesia, porque el don se descubre sirviendo (1 Pedro 4:10). También conviene mirar el fruto y escuchar a los líderes y a los hermanos maduros. Y todo empieza con una vida entregada a Dios como sacrificio vivo (Romanos 12:1), dispuesta a servir donde haga falta.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-dones-b1",
    tipo: "breve",
    pregunta:
      "Escribe qué dones crees que Dios te ha dado o quieres pedirle, cómo los vas a usar con amor y con orden para edificar a la iglesia, y en qué ministerio empezarás a servir. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "espiritu", peso: 15, texto: "Que los dones vienen del Espíritu Santo, por gracia.", formas: ["espiritu santo", "gracia", "regalo", "como el quiere"] },
      { id: "don", peso: 15, texto: "Nombrar un don o un área de servicio.", formas: ["don", "dones", "enseñ*", "ensen*", "servicio", "misericordia", "exhort*", "profecia", "alabanza", "musica"] },
      { id: "edificar", peso: 15, texto: "Usarlos para edificar y servir a otros.", formas: ["edific*", "provecho", "servir", "ayudar"] },
      { id: "amor", peso: 15, texto: "El amor como camino más excelente.", formas: ["amor"] },
      { id: "orden", peso: 10, texto: "El orden y el discernimiento.", formas: ["orden", "examin*", "discern*", "sujet*"] },
      { id: "ministerio", peso: 20, texto: "Un ministerio concreto donde empezará a servir.", formas: ["ministerio*", "niños", "ninos", "alabanza", "visit*", "oracion", "recibir", "sonido", "jovenes"] },
      { id: "entrega", peso: 10, texto: "La entrega a Dios y la oración.", formas: ["sacrificio vivo", "entreg*", "orar", "orare", "oracion"] },
    ],
    basta: 85,
    citas: ["1 Corintios 12:7", "1 Corintios 12:4-11", "Romanos 12:1", "Romanos 12:6-8", "1 Pedro 4:10", "1 Corintios 13:2", "1 Corintios 14:26", "1 Corintios 14:40", "Efesios 4:12", "1 Corintios 12:18"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Creo que Dios me ha dado un don de enseñanza y de misericordia, porque cuando explico la Biblia a los niños veo que entienden, y me duele ver a los que sufren. Sé que no es mérito mío: el Espíritu Santo reparte a cada uno como Él quiere, y a cada uno le es dada la manifestación del Espíritu para provecho (1 Corintios 12:7). Quiero usar estos dones para edificar a la iglesia y no para lucirme, porque sin amor nada soy (1 Corintios 13:2). También quiero servir con orden, sujeto a mis líderes, y examinarlo todo a la luz de la Palabra. Voy a pedirle a Dios en oración que me use y que me dé los dones que la iglesia necesite. Esta semana voy a hablar con la líder del ministerio de niños para ofrecer mi ayuda los domingos, y también quiero visitar a los enfermos con el grupo de oración. Me presento a Dios como sacrificio vivo (Romanos 12:1), dispuesto a servir donde haga falta.",
  },
};
