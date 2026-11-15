/**
 * Nivel 2 · Materia 7 — Familia y relaciones (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Se enseña lo que comparten las iglesias evangélicas: el matrimonio como pacto entre un hombre y una mujer, el amor
 * que se sacrifica y el respeto mutuo (Efesios 5:21-33), la crianza en el Señor, el valor de la soltería y de la
 * amistad, la pureza y el perdón. La autoridad del esposo nunca justifica el control ni la violencia: ante el abuso se
 * busca protección y ayuda. Los casos de divorcio y nuevo matrimonio se tratan con el pastor, a la luz de Mateo 19:3-9
 * y 1 Corintios 7:10-15. Materia para revisar con la Dirección antes de aprobarla.
 */
import type { LeccionContenido } from "../tipos";

export const N2_FAMILIA: LeccionContenido[] = [
  {
    id: "n2-familia-1",
    objetivos: [
      "Describir el diseño de Dios para el matrimonio y la familia en Génesis.",
      "Explicar lo que enseñó Jesús sobre el matrimonio en Mateo 19.",
      "Reconocer que la familia es un regalo de Dios y un lugar para servirle.",
    ],
    paraEmpezar:
      "Antes de que hubiera gobiernos, escuelas o iglesias, Dios creó una familia. En los primeros capítulos de la Biblia está su diseño, y Jesús volvió a ellos cuando le preguntaron por el matrimonio.",
    bloques: [
      { t: "versiculo", ref: "Génesis 2:18" },
      {
        t: "parrafo",
        texto:
          "Dios dijo: «No es bueno que el hombre esté solo». Creó a la mujer como ayuda idónea, es decir, una compañera que le corresponde, igual en dignidad. Hombre y mujer fueron creados a imagen de Dios (Génesis 1:27).",
      },
      { t: "versiculo", ref: "Génesis 2:24" },
      {
        t: "lista",
        items: [
          "Dejar: el matrimonio forma un hogar nuevo, distinto del de los padres.",
          "Unirse: es un pacto de fidelidad, no un contrato que se rompe cuando conviene.",
          "Ser una sola carne: una unión completa, también física, para toda la vida.",
        ],
      },
      { t: "subtitulo", texto: "Lo que enseñó Jesús" },
      { t: "versiculo", ref: "Mateo 19:4-6" },
      {
        t: "parrafo",
        texto:
          "Jesús citó el principio: el Creador los hizo varón y hembra, y los dos serán una sola carne. Y añadió: «lo que Dios juntó, no lo separe el hombre». El matrimonio es un pacto entre un hombre y una mujer delante de Dios.",
      },
      {
        t: "nota",
        titulo: "Cada familia es distinta",
        texto:
          "Hay familias con padre y madre, familias de una madre o un padre solo, abuelos que crían nietos y hogares mezclados. Dios ama a todas y quiere ser el centro de cada una: el diseño muestra el camino y su gracia acompaña a todos.",
      },
    ],
    ideaClave:
      "Dios diseñó el matrimonio como un pacto de por vida entre un hombre y una mujer, que dejan a sus padres, se unen y son una sola carne; Jesús confirmó ese diseño, y la gracia de Dios acompaña a cada familia.",
    paraLaVida: {
      texto: "Un hogar fuerte no se encuentra: se construye con Dios en el centro.",
      pregunta: "¿Qué lugar ocupa Dios hoy en tu hogar, y qué paso darías para que sea el centro?",
    },
  },
  {
    id: "n2-familia-2",
    objetivos: [
      "Explicar el amor y el respeto que enseña Efesios 5 para el matrimonio.",
      "Distinguir la autoridad que sirve del control que domina.",
      "Aplicar principios bíblicos a la vida diaria en pareja.",
    ],
    paraEmpezar:
      "Pablo escribe sobre el matrimonio con una medida altísima: el amor de Cristo por su iglesia. No es una lista de derechos, sino un llamado a servir al otro.",
    bloques: [
      { t: "versiculo", ref: "Efesios 5:21" },
      {
        t: "parrafo",
        texto:
          "Todo empieza con una actitud para todos los creyentes: someterse «unos a otros en el temor de Dios». En el matrimonio, eso se vive de dos maneras que se complementan.",
      },
      { t: "versiculo", ref: "Efesios 5:25-28" },
      {
        t: "parrafo",
        texto:
          "Al esposo se le pide amar a su esposa «así como Cristo amó a la iglesia, y se entregó a sí mismo por ella». La autoridad que la Biblia le da es para servir, cuidar y entregarse, como Cristo, que lavó los pies de sus discípulos.",
      },
      { t: "versiculo", ref: "Efesios 5:33" },
      {
        t: "parrafo",
        texto:
          "A la esposa se le pide respetar a su marido y sujetarse a él como al Señor (Efesios 5:22). Y Pedro pide a los maridos vivir con sus esposas sabiamente, dándoles honor, como coherederas de la gracia de la vida (1 Pedro 3:7).",
      },
      {
        t: "nota",
        titulo: "La autoridad nunca justifica la violencia",
        texto:
          "Ser cabeza del hogar no da permiso para controlar, humillar ni golpear. La violencia física, verbal o sexual es pecado, y quien la sufre debe buscar protección y ayuda: el pastor, la familia y, si hace falta, las autoridades (Romanos 13:4). Dios no pide a nadie que se quede en peligro.",
      },
      {
        t: "lista",
        items: [
          "Orar juntos y leer la Biblia juntos.",
          "Hablar con respeto, aun en los desacuerdos (Efesios 4:29).",
          "Ponerse de acuerdo en el dinero, la crianza y el tiempo.",
          "Cuidar la intimidad y la fidelidad (1 Corintios 7:3-5).",
          "Pedir perdón y perdonar pronto.",
        ],
      },
    ],
    ideaClave:
      "El matrimonio cristiano se vive en sumisión mutua: el esposo ama a su esposa como Cristo amó a la iglesia, con una autoridad que sirve, y la esposa lo respeta; la autoridad nunca justifica el control ni la violencia.",
    paraLaVida: {
      texto: "En el matrimonio gana quien sirve más, no quien manda más.",
      pregunta: "Si estás casado, ¿qué gesto de amor o de respeto puedes tener esta semana con tu cónyuge? Si no, ¿qué aprendes para tu futuro?",
    },
  },
  {
    id: "n2-familia-3",
    objetivos: [
      "Explicar la responsabilidad de los padres de criar a los hijos en el Señor.",
      "Describir lo que la Biblia pide a los hijos.",
      "Aplicar formas prácticas de enseñar la fe en casa.",
    ],
    paraEmpezar:
      "La fe no se hereda como el apellido: se transmite con palabras y con ejemplo. Dios encargó a los padres la primera escuela de sus hijos: el hogar.",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 6:6-7" },
      {
        t: "parrafo",
        texto:
          "Dios pide que sus palabras estén primero en el corazón de los padres y que las repitan a sus hijos «estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes». La fe se enseña en la vida diaria, no solo en la iglesia.",
      },
      { t: "versiculo", ref: "Efesios 6:1-4" },
      {
        t: "lista",
        items: [
          "Los hijos: obedecer a sus padres en el Señor y honrarlos; es el primer mandamiento con promesa.",
          "Los padres: no provocar a ira a sus hijos con dureza, burlas o injusticia.",
          "Los padres: criarlos «en disciplina y amonestación del Señor», con amor, límites claros y corrección sin violencia.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 22:6" },
      {
        t: "nota",
        titulo: "Ideas para enseñar la fe en casa",
        texto:
          "Orar juntos antes de comer y al acostarse, leer una historia de la Biblia por semana, contar cómo Dios ha respondido, servir juntos a alguien y dejar que los hijos vean a sus padres pedir perdón.",
      },
    ],
    ideaClave:
      "Los padres son los primeros maestros de la fe: enseñan la Palabra en la vida diaria, crían en disciplina y amonestación del Señor sin provocar a ira, y los hijos obedecen y honran a sus padres en el Señor.",
    paraLaVida: {
      texto: "Los hijos aprenden más de lo que ven que de lo que oyen.",
      pregunta: "¿Qué hábito de fe puedes empezar en tu casa esta semana?",
    },
  },
  {
    id: "n2-familia-4",
    objetivos: [
      "Explicar el valor de la soltería según 1 Corintios 7.",
      "Describir las marcas de una amistad bíblica.",
      "Aplicar criterios bíblicos para elegir y cultivar amistades.",
    ],
    paraEmpezar:
      "La vida cristiana no empieza el día de la boda. Jesús y Pablo fueron solteros, y la Biblia valora la soltería y la amistad como regalos de Dios.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 7:32-35" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que el soltero puede tener cuidado «de las cosas del Señor» con menos distracciones. La soltería no es una vida incompleta ni una sala de espera: es una etapa, o un llamado, para servir a Dios con libertad (1 Corintios 7:7).",
      },
      { t: "subtitulo", texto: "La amistad" },
      { t: "versiculo", ref: "Proverbios 17:17" },
      { t: "versiculo", ref: "Proverbios 27:17" },
      {
        t: "lista",
        items: [
          "El amigo ama en todo tiempo, también en la angustia.",
          "El amigo verdadero nos afila: nos anima y nos corrige con amor.",
          "Jesús llamó amigos a sus discípulos y dio su vida por ellos (Juan 15:13-15).",
        ],
      },
      {
        t: "nota",
        titulo: "Las compañías importan",
        texto:
          "Las malas conversaciones corrompen las buenas costumbres (1 Corintios 15:33). Se puede tener amigos que no conocen a Cristo y ser luz para ellos, pero los amigos más cercanos y la pareja deben compartir la fe (2 Corintios 6:14).",
      },
    ],
    ideaClave:
      "La soltería es un regalo para servir al Señor con libertad, no una vida incompleta; la amistad bíblica ama en todo tiempo y nos afila, y las compañías más cercanas deben ayudarnos a seguir a Cristo.",
    paraLaVida: {
      texto: "Dime con quién andas y te diré hacia dónde vas.",
      pregunta: "¿Quién es para ti un amigo que te afila en la fe, y para quién puedes serlo tú?",
    },
  },
  {
    id: "n2-familia-5",
    objetivos: [
      "Explicar por qué Dios llama a la pureza sexual.",
      "Describir formas prácticas de cuidar la pureza.",
      "Explicar el camino de la restauración después de caer.",
    ],
    paraEmpezar:
      "Dios creó la sexualidad y la llamó buena, dentro del matrimonio. El mundo la trivializa; la Biblia la honra y la protege.",
    bloques: [
      { t: "versiculo", ref: "1 Tesalonicenses 4:3-5" },
      {
        t: "parrafo",
        texto:
          "La voluntad de Dios es nuestra santificación: «que os apartéis de fornicación». Cada uno debe vivir en santidad y honor, «no en pasión de concupiscencia».",
      },
      { t: "versiculo", ref: "1 Corintios 6:18-20" },
      {
        t: "parrafo",
        texto:
          "José huyó de la mujer de Potifar (Génesis 39:12), y Pablo dice lo mismo: «Huid de la fornicación». El cuerpo del creyente es templo del Espíritu Santo, comprado por precio.",
      },
      { t: "versiculo", ref: "Hebreos 13:4" },
      {
        t: "lista",
        items: [
          "Cuidar lo que se mira: la pornografía daña el corazón y las relaciones (Mateo 5:28).",
          "Poner límites claros en el noviazgo y evitar las situaciones de tentación.",
          "Tener a alguien de confianza a quien rendir cuentas.",
          "Llenar la mente de lo que es puro (Filipenses 4:8).",
        ],
      },
      {
        t: "nota",
        titulo: "Hay restauración",
        texto:
          "Si has caído, no estás descalificado para siempre. Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos (1 Juan 1:9). Busca ayuda pastoral, rompe con lo que te hace caer y empieza de nuevo con su gracia.",
      },
    ],
    ideaClave:
      "Dios creó la sexualidad para el matrimonio y llama a la pureza: huir de la fornicación, honrar el cuerpo como templo del Espíritu, cuidar los ojos y poner límites; y a quien cae le ofrece perdón y restauración.",
    paraLaVida: {
      texto: "La pureza no es solo decir no: es decir sí a algo mejor.",
      pregunta: "¿Qué límite práctico necesitas poner esta semana para cuidar tu pureza?",
    },
  },
  {
    id: "n2-familia-6",
    objetivos: [
      "Aplicar el perdón y la reconciliación en los conflictos familiares.",
      "Describir la enseñanza de Jesús sobre el divorcio y la importancia del consejo pastoral.",
      "Reconocer cuándo una familia necesita ayuda y protección.",
    ],
    paraEmpezar:
      "Todas las familias tienen conflictos. La diferencia está en cómo se resuelven: con gritos y silencio, o con verdad, perdón y gracia.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 3:12-14" },
      {
        t: "parrafo",
        texto:
          "Pablo pide vestirse de misericordia, humildad, mansedumbre y paciencia, soportándose y perdonándose: «De la manera que Cristo os perdonó, así también hacedlo vosotros». Y sobre todo, el amor, «que es el vínculo perfecto».",
      },
      { t: "versiculo", ref: "Efesios 4:26" },
      {
        t: "lista",
        items: [
          "No dejar que el enojo dure hasta el otro día.",
          "Hablar del problema, no atacar a la persona.",
          "Escuchar antes de responder (Santiago 1:19).",
          "Pedir perdón sin excusas y perdonar de verdad.",
          "Buscar ayuda cuando solos no se puede.",
        ],
      },
      { t: "subtitulo", texto: "Lo que enseñó Jesús sobre el divorcio" },
      { t: "versiculo", ref: "Mateo 19:8-9" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo que Moisés permitió el divorcio por la dureza del corazón, «mas al principio no fue así». El divorcio nunca fue el plan de Dios. Jesús menciona la fornicación como excepción, y Pablo habla del creyente abandonado por un cónyuge que no cree (1 Corintios 7:15). Cada caso de divorcio o de nuevo matrimonio se trata con el pastor, con la Biblia abierta y con mucha gracia.",
      },
      {
        t: "nota",
        titulo: "Pedir ayuda no es fracasar",
        texto:
          "Cuando hay violencia, adicciones o un dolor que no se puede manejar, la familia necesita ayuda: el pastor, un consejero cristiano y, si hay peligro, las autoridades. Proteger a los que sufren, sobre todo a los niños, es parte de amar como Cristo.",
      },
    ],
    ideaClave:
      "Los conflictos de familia se enfrentan con misericordia, verdad y perdón, como Cristo nos perdonó; el divorcio no fue el plan de Dios y cada caso se trata con el pastor, y cuando hay violencia o peligro se busca ayuda y protección.",
    paraLaVida: {
      texto: "El perdón no cambia el pasado, pero sí cambia el futuro.",
      pregunta: "¿Hay alguien en tu familia a quien necesitas pedirle perdón o perdonar?",
    },
  },
];
