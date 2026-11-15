/**
 * Nivel 2 · Materia 9 — Dones espirituales y servicio (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Como las iglesias pentecostales, se enseña que todos los dones siguen vigentes hasta la venida de Cristo
 * (1 Corintios 1:7; 13:8-12), siempre con amor, orden y discernimiento (1 Corintios 13-14; 1 Tesalonicenses 5:19-21).
 * El bautismo en el Espíritu Santo se estudia a fondo en el Nivel 3, según la declaración de fe del ministerio.
 * Materia para revisar con la Dirección antes de aprobarla.
 */
import type { LeccionContenido } from "../tipos";

export const N2_DONES: LeccionContenido[] = [
  {
    id: "n2-dones-1",
    objetivos: [
      "Explicar qué son los dones espirituales y para qué los da Dios.",
      "Distinguir entre los dones, los talentos naturales y el fruto del Espíritu.",
      "Reconocer que todo creyente ha recibido al menos un don.",
    ],
    paraEmpezar:
      "En La iglesia, mi nueva familia viste que cada creyente tiene un lugar en el cuerpo de Cristo. Ahora estudiarás a fondo los dones que el Espíritu Santo reparte para que la iglesia crezca.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 12:4-7" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que hay diversidad de dones, de ministerios y de operaciones, pero un mismo Espíritu, un mismo Señor y un mismo Dios. Y añade: «a cada uno le es dada la manifestación del Espíritu para provecho». Los dones no son premios ni adornos: son herramientas para el bien de todos.",
      },
      { t: "subtitulo", texto: "Dones, talentos y fruto" },
      {
        t: "lista",
        items: [
          "Los talentos naturales son capacidades que Dios nos dio al nacer, como la música o la organización, y también se ponen a su servicio.",
          "Los dones espirituales son capacidades que el Espíritu Santo da al creyente para edificar a la iglesia (1 Corintios 12:11).",
          "El fruto del Espíritu es el carácter de Cristo formado en nosotros: amor, gozo, paz, paciencia (Gálatas 5:22-23). Los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros.",
        ],
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "nota",
        titulo: "Nadie se queda sin don",
        texto:
          "Pedro dice cada uno: no solo los pastores ni los músicos. Si has creído en Cristo, el Espíritu te ha dado al menos un don para servir a otros, como buen administrador de la multiforme gracia de Dios.",
      },
    ],
    ideaClave:
      "Los dones espirituales son capacidades que el Espíritu Santo reparte a cada creyente para provecho de todos; se distinguen de los talentos naturales y del fruto del Espíritu, y nadie en Cristo se queda sin don.",
    paraLaVida: {
      texto: "Tu don no es para ti: es para los demás.",
      pregunta: "¿Qué capacidad ves que Dios ha usado en ti para ayudar a otros?",
    },
  },
  {
    id: "n2-dones-2",
    objetivos: [
      "Describir los dones del Espíritu de 1 Corintios 12:8-10.",
      "Explicar que el Espíritu reparte los dones como Él quiere.",
      "Explicar por qué los dones siguen vigentes hoy.",
    ],
    paraEmpezar:
      "La iglesia de Corinto tenía muchos dones, pero mucho desorden. Pablo no les dijo que dejaran los dones, sino que los entendieran y los usaran bien.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 12:8-11" },
      {
        t: "lista",
        items: [
          "Dones de palabra y de conocimiento: palabra de sabiduría, palabra de ciencia y discernimiento de espíritus.",
          "Dones de poder: fe, dones de sanidades y hacer milagros.",
          "Dones de expresión: profecía, diversos géneros de lenguas e interpretación de lenguas.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Todo esto lo hace «uno y el mismo Espíritu, repartiendo a cada uno en particular como él quiere». Nadie elige su don ni lo compra: lo recibimos por gracia, y el Espíritu decide cuál y cuándo.",
      },
      { t: "subtitulo", texto: "Los dones siguen vigentes" },
      { t: "versiculo", ref: "1 Corintios 1:7" },
      {
        t: "parrafo",
        texto:
          "Pablo escribió que a la iglesia no le faltaba ningún don, «esperando la manifestación» de nuestro Señor Jesucristo. Por eso las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva, cuando veremos cara a cara (1 Corintios 13:12).",
      },
      {
        t: "nota",
        titulo: "Con discernimiento",
        texto:
          "No todo lo que se dice en nombre del Espíritu viene de Dios. La Biblia manda examinarlo todo y retener lo bueno (1 Tesalonicenses 5:21): una profecía verdadera nunca contradice la Escritura y siempre edifica, exhorta y consuela (1 Corintios 14:3).",
      },
    ],
    ideaClave:
      "En 1 Corintios 12 el Espíritu reparte dones de palabra, de poder y de expresión a cada uno como Él quiere; siguen vigentes hasta la venida de Cristo y se usan con discernimiento, a la luz de la Escritura.",
    paraLaVida: {
      texto: "El mismo Espíritu que obró en la iglesia de los Hechos obra hoy.",
      pregunta: "¿Cuál de estos dones has visto obrar en tu iglesia, y para qué sirvió?",
    },
  },
  {
    id: "n2-dones-3",
    objetivos: [
      "Describir los dones de Romanos 12:6-8.",
      "Explicar los dos grandes grupos de dones de 1 Pedro 4:11: hablar y servir.",
      "Reconocer el valor de los dones prácticos en la iglesia.",
    ],
    paraEmpezar:
      "Algunos dones se notan mucho y otros casi no se ven. Pero en el cuerpo de Cristo todos son necesarios: la persona que enseña y la que visita a los enfermos.",
    bloques: [
      { t: "versiculo", ref: "Romanos 12:4-8" },
      {
        t: "parrafo",
        texto:
          "Pablo compara la iglesia con un cuerpo: muchos miembros, pero no todos con la misma función. Tenemos «diferentes dones, según la gracia que nos es dada»: profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia. Y pide usarlos con fe, con liberalidad, con solicitud y con alegría.",
      },
      { t: "versiculo", ref: "1 Pedro 4:11" },
      {
        t: "lista",
        items: [
          "Dones para hablar: enseñar, exhortar, predicar, aconsejar. Se usan hablando conforme a las palabras de Dios.",
          "Dones para servir: ayudar, organizar, dar, cuidar, hospedar. Se usan conforme al poder que Dios da.",
          "En los dos casos, el fin es el mismo: que en todo sea Dios glorificado por Jesucristo.",
        ],
      },
      {
        t: "nota",
        titulo: "Los dones que no se ven",
        texto:
          "El que limpia el templo, el que recibe a las visitas, el que ora en secreto y el que atiende el sonido también sirven con dones de Dios. Pablo dice que los miembros que parecen más débiles son los más necesarios (1 Corintios 12:22).",
      },
    ],
    ideaClave:
      "Romanos 12 y 1 Pedro 4 muestran dones para hablar y para servir, como la enseñanza, la exhortación, el servicio y la misericordia; todos son necesarios y se usan con fe, con alegría y para la gloria de Dios.",
    paraLaVida: {
      texto: "En el cuerpo de Cristo no hay miembros de sobra.",
      pregunta: "¿Te ves más en los dones para hablar o en los dones para servir? ¿Por qué?",
    },
  },
  {
    id: "n2-dones-4",
    objetivos: [
      "Nombrar los ministerios de Efesios 4:11.",
      "Explicar para qué dio Cristo esos ministerios a la iglesia.",
      "Describir la meta: la unidad, el conocimiento de Cristo y la madurez.",
    ],
    paraEmpezar:
      "Algunos creen que el pastor debe hacer todo el trabajo de la iglesia. Efesios 4 enseña algo distinto: los líderes existen para preparar a todos para servir.",
    bloques: [
      { t: "versiculo", ref: "Efesios 4:11-13" },
      {
        t: "parrafo",
        texto:
          "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros. ¿Para qué? «a fin de perfeccionar a los santos para la obra del ministerio, para la edificación del cuerpo de Cristo». Los líderes preparan; todos los creyentes sirven.",
      },
      {
        t: "lista",
        items: [
          "La unidad de la fe y del conocimiento del Hijo de Dios.",
          "Un varón perfecto: la madurez, a la medida de la estatura de la plenitud de Cristo.",
          "Ya no niños llevados por todo viento de doctrina (Efesios 4:14).",
        ],
      },
      { t: "versiculo", ref: "Efesios 4:15-16" },
      {
        t: "parrafo",
        texto:
          "El cuerpo crece «siguiendo la verdad en amor», cuando cada miembro hace su parte. Por eso la academia existe: para preparar a cada discípulo para la obra del ministerio.",
      },
    ],
    ideaClave:
      "Cristo dio a la iglesia apóstoles, profetas, evangelistas, pastores y maestros para preparar a todos los creyentes para servir; la meta es la unidad, el conocimiento de Cristo y la madurez, siguiendo la verdad en amor.",
    paraLaVida: {
      texto: "El mejor líder no es el que hace todo, sino el que prepara a otros.",
      pregunta: "¿Quién te está preparando para servir, y a quién podrías preparar tú?",
    },
  },
  {
    id: "n2-dones-5",
    objetivos: [
      "Explicar por qué el amor es el camino más excelente para usar los dones.",
      "Describir los principios de orden de 1 Corintios 14.",
      "Aplicar el discernimiento al uso de los dones en la iglesia.",
    ],
    paraEmpezar:
      "Entre los capítulos de los dones, 1 Corintios 12 y 14, Pablo puso el gran capítulo del amor. No es casualidad: sin amor, los dones pierden su sentido.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 13:1-3" },
      {
        t: "parrafo",
        texto:
          "Aunque alguien hable lenguas humanas y angélicas, profetice y tenga toda la fe, si no tiene amor, nada es. El amor es un camino aún más excelente (1 Corintios 12:31): los dones son el instrumento; el amor, la manera de tocarlo.",
      },
      { t: "versiculo", ref: "1 Corintios 13:4-7" },
      { t: "subtitulo", texto: "Todo con orden" },
      { t: "versiculo", ref: "1 Corintios 14:26" },
      {
        t: "lista",
        items: [
          "Todo debe hacerse para edificación: lo que no edifica a la iglesia, no es para la reunión.",
          "Las lenguas en la reunión van con interpretación, para que todos entiendan (1 Corintios 14:27-28).",
          "Las profecías se juzgan: los demás examinan lo que se dice (1 Corintios 14:29).",
          "Dios no es Dios de confusión, sino de paz (1 Corintios 14:33): hágase todo decentemente y con orden (1 Corintios 14:40).",
        ],
      },
      {
        t: "nota",
        titulo: "Ni apagar ni descuidar",
        texto:
          "Pablo dice: «No apaguéis al Espíritu. No menospreciéis las profecías. Examinadlo todo; retened lo bueno» (1 Tesalonicenses 5:19-21). El equilibrio bíblico no rechaza los dones ni los usa sin orden.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:19-21" },
    ],
    ideaClave:
      "Sin amor los dones no valen nada: el amor es el camino más excelente; en la reunión todo se hace para edificación, con orden, con interpretación de lenguas y profecías juzgadas, sin apagar al Espíritu y examinándolo todo.",
    paraLaVida: {
      texto: "El amor es la prueba de que un don se usa como Dios quiere.",
      pregunta: "¿Cuál de las cualidades del amor de 1 Corintios 13 te cuesta más vivir al servir?",
    },
  },
  {
    id: "n2-dones-6",
    objetivos: [
      "Describir pasos prácticos para descubrir el propio don.",
      "Explicar el valor de cada miembro del cuerpo de Cristo.",
      "Elaborar un primer paso concreto para servir en la iglesia.",
    ],
    paraEmpezar:
      "Muchos creyentes preguntan cuál es su don y se quedan esperando una respuesta. La Biblia muestra que el don se descubre sirviendo, no mirando desde lejos.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 12:18-22" },
      {
        t: "parrafo",
        texto:
          "Dios colocó los miembros «cada uno de ellos en el cuerpo, como él quiso». Nadie puede decir que no lo necesitan, y nadie debe pensar que no sirve. Tu lugar en el cuerpo es un diseño de Dios.",
      },
      { t: "subtitulo", texto: "Cómo descubrir tu don" },
      {
        t: "lista",
        items: [
          "Pide en oración: el Espíritu reparte los dones, y el Padre da buenas cosas a los que le piden (Lucas 11:13).",
          "Sirve en distintas áreas: el don se descubre en movimiento.",
          "Observa el fruto: ¿tu servicio edifica a otros?",
          "Escucha a los líderes y a los hermanos maduros: ellos ven lo que Dios hace en ti.",
          "Fíjate en lo que te da gozo y carga: la necesidad que te duele puede ser tu llamado.",
        ],
      },
      { t: "versiculo", ref: "Romanos 12:1" },
      {
        t: "parrafo",
        texto:
          "Todo servicio empieza con una entrega: presentar nuestros cuerpos «en sacrificio vivo, santo, agradable a Dios». Un corazón rendido a Dios sirve con alegría donde sea necesario, aunque su don todavía no esté claro.",
      },
      {
        t: "nota",
        titulo: "Un primer paso",
        texto:
          "Habla esta semana con el líder de un ministerio de tu iglesia y ofrece tu ayuda: recibir a las personas, enseñar a los niños, la alabanza, el sonido, la oración, la visitación o la limpieza. Servir un mes en un ministerio es uno de los requisitos del Nivel 2.",
      },
    ],
    ideaClave:
      "Dios puso a cada miembro en el cuerpo como Él quiso; el don se descubre orando, sirviendo, mirando el fruto y escuchando a los maduros, y todo servicio empieza con una vida entregada como sacrificio vivo.",
    paraLaVida: {
      texto: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás.",
      pregunta: "¿En qué ministerio de tu iglesia vas a ofrecer tu ayuda esta semana?",
    },
  },
];
