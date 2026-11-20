/**
 * Especialidad Niñez · Materia 2 — El niño y su fe (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Cómo crece la fe de un niño por edades, cómo hablarle de Dios, cómo guiarlo a Cristo sin presión (ejemplo resuelto),
 * las preguntas difíciles (la edad de la responsabilidad, el bautismo de un niño que cree y la promesa del Espíritu),
 * el niño que ora, adora y sirve, y los niños en situaciones difíciles. Sigue el artículo 8 de la declaración de fe y deja
 * por confirmar lo que la declaración deja por confirmar (las lenguas como señal inicial).
 */
import type { LeccionContenido } from "../tipos";

export const NINEZ_2: LeccionContenido[] = [
  {
    id: "ninez-2-1",
    objetivos: [
      "Describir cómo cambian el pensamiento y la fe del niño en cada etapa.",
      "Explicar qué necesita un niño en cada edad para crecer en la fe.",
      "Adaptar la enseñanza a la edad de los niños.",
    ],
    paraEmpezar:
      "Un niño de cuatro años y uno de once pueden escuchar la misma historia bíblica y entender cosas muy distintas. Conocer cómo piensa cada edad ayuda a enseñarle bien.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=DTL5QW6Ez7s", titulo: "El nacimiento de Jesús: Lucas 1 y 2", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Lucas 2:40" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo pasó por la niñez: «el niño crecía y se fortalecía, y se llenaba de sabiduría; y la gracia de Dios era sobre él». El crecimiento lleva tiempo, y cada etapa tiene su lugar.",
      },
      { t: "versiculo", ref: "1 Corintios 13:11" },
      {
        t: "parrafo",
        texto:
          "Pablo lo dice así: «Cuando yo era niño, hablaba como niño, pensaba como niño, juzgaba como niño». Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle.",
      },
      { t: "subtitulo", texto: "Las etapas del niño" },
      {
        t: "lista",
        items: [
          "De 2 a 5 años: aprende con los sentidos, imita y confía, y piensa de forma literal. Necesita amor, rutinas y verdades sencillas: Dios me ama, Dios hizo todo, Jesús es mi amigo.",
          "De 6 a 9 años: piensa en lo concreto, le gustan las reglas, los héroes y las historias, y pregunta por qué. Puede entender el evangelio con palabras sencillas.",
          "De 10 a 12 años: empieza a pensar con ideas, pregunta y a veces duda, y busca su lugar en el grupo. Necesita respuestas honestas y adultos que vivan lo que enseñan.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Los estudios del desarrollo, como los de Jean Piaget, describen estos cambios: el niño pequeño piensa de forma literal, el escolar en lo concreto y el preadolescente empieza a razonar con ideas. Son guías generales: cada niño crece a su ritmo.",
      },
      { t: "versiculo", ref: "1 Pedro 2:2" },
      {
        t: "parrafo",
        texto:
          "Pedro usa la imagen del bebé que desea la leche: «desead, como niños recién nacidos, la leche espiritual no adulterada, para que por ella crezcáis». A cada edad se le da el alimento que puede recibir.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Agrupa a los niños por edades cercanas y adapta cada clase a su etapa. Una misma verdad se enseña de distinta manera a un niño de cuatro años y a uno de once.",
      },
    ],
    ideaClave:
      "Jesús creció en sabiduría y en gracia, y cada niño crece a su ritmo. El niño piensa como niño: de 2 a 5 años aprende con los sentidos, imita y confía; de 6 a 9 piensa en lo concreto y pregunta por qué; de 10 a 12 empieza a razonar con ideas, pregunta y duda. Los estudios del desarrollo, como los de Piaget, describen esos cambios. El maestro da a cada edad el alimento que puede recibir.",
    paraLaVida: {
      texto: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle.",
      pregunta: "¿Qué edad tienen los niños que enseñas, y cómo cambia eso tu manera de enseñar?",
    },
  },
  {
    id: "ninez-2-2",
    objetivos: [
      "Explicar las verdades de la fe con palabras adecuadas a cada edad.",
      "Responder las preguntas de los niños con honestidad.",
      "Evitar las imágenes que confunden a un niño que piensa de forma literal.",
    ],
    paraEmpezar:
      "Los niños preguntan mucho: dónde vive Dios, por qué murió el abuelo, si los perros van al cielo. Sus preguntas son una puerta para enseñar.",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 6:20-21" },
      {
        t: "parrafo",
        texto:
          "La Biblia espera que los hijos pregunten: «Mañana cuando te preguntare tu hijo». Y la respuesta empezaba con una historia: «Nosotros éramos siervos de Faraón en Egipto, y Jehová nos sacó de Egipto con mano poderosa».",
      },
      { t: "versiculo", ref: "Marcos 4:33" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñaba con historias, «conforme a lo que podían oír». El buen maestro adapta sus palabras a quien lo escucha.",
      },
      { t: "versiculo", ref: "1 Corintios 3:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo dio a los que recién empezaban «leche, y no vianda». A los niños también se les da primero lo sencillo y lo claro.",
      },
      { t: "subtitulo", texto: "Palabras claras para cada verdad" },
      {
        t: "lista",
        items: [
          "Dios: es el creador de todo, nos ama y siempre está con nosotros; no lo vemos, pero es real.",
          "El pecado: es desobedecer a Dios; todos lo hacemos, y nos separa de él.",
          "Jesús: es el Hijo de Dios, murió en la cruz por nuestros pecados y resucitó.",
          "La salvación: es confiar en Jesús, pedirle perdón y seguirlo; él nos hace hijos de Dios.",
          "El cielo: es estar para siempre con Dios; la Biblia no lo cuenta todo, y está bien decir no sé.",
        ],
      },
      {
        t: "nota",
        titulo: "Cuidado con las imágenes",
        texto:
          "Las imágenes muy simbólicas, como pedirle a Jesús que entre en el corazón, pueden confundir a un niño pequeño que piensa de forma literal: puede imaginar a Jesús dentro de su pecho. Explícalas, o usa palabras claras: confiar en Jesús, pedirle perdón y seguirlo.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando no sepas una respuesta, dilo con honestidad y busquen juntos en la Biblia. Y si la pregunta nace de un dolor, como la muerte de alguien, escucha primero y responde con ternura.",
      },
    ],
    ideaClave:
      "Los hijos preguntan, y la Biblia espera esas preguntas: en Israel, la respuesta era una historia de lo que Dios hizo. Jesús enseñaba conforme a lo que podían oír, y Pablo dio leche a los que empezaban. El maestro explica a Dios, el pecado, a Jesús, la salvación y el cielo con palabras claras, cuida las imágenes que confunden a un niño que piensa de forma literal y responde con honestidad, aun diciendo no sé.",
    paraLaVida: {
      texto: "Las preguntas de un niño son una puerta abierta para enseñar.",
      pregunta: "¿Qué pregunta difícil te hizo un niño, y cómo podrías responderla mejor?",
    },
  },
  {
    id: "ninez-2-3",
    objetivos: [
      "Explicar el evangelio con palabras que un niño entienda.",
      "Guiar a un niño a confiar en Cristo sin presión ni manipulación.",
      "Acompañar al niño después de su decisión, junto con sus padres.",
    ],
    paraEmpezar:
      "Un niño puede creer en Jesús de verdad. Por eso guiarlo a Cristo es un privilegio, y también una responsabilidad que se cumple con cuidado.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 3:16" },
      {
        t: "parrafo",
        texto:
          "El evangelio empieza con el amor de Dios: «Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna». Y «todo aquel» incluye a los niños.",
      },
      { t: "versiculo", ref: "Romanos 3:23" },
      { t: "versiculo", ref: "Romanos 6:23" },
      {
        t: "parrafo",
        texto:
          "Todos necesitamos a Jesús, «por cuanto todos pecaron, y están destituidos de la gloria de Dios». Pero hay una buena noticia: «la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro». La salvación es un regalo.",
      },
      { t: "versiculo", ref: "Juan 1:12" },
      {
        t: "parrafo",
        texto:
          "El que confía en Jesús llega a ser hijo de Dios: «Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una conversación paso a paso" },
      {
        t: "lista",
        items: [
          "Escuchar: preguntarle qué sabe de Jesús y qué quiere hacer, con calma y en un lugar visible, nunca a solas ni apartado.",
          "Explicar con sencillez: Dios te ama; todos hemos desobedecido a Dios; Jesús murió por nuestros pecados y resucitó; Dios nos regala el perdón.",
          "Comprobar que entiende: hacerle preguntas sencillas, sin ponerle las respuestas en la boca.",
          "Invitar sin presionar: puede orar con sus propias palabras para confiar en Jesús, ahora o cuando esté listo.",
          "Orar juntos y darle seguridad con la Palabra, como Juan 1:12.",
          "Contarles con alegría a sus padres y acompañarlo después: leer la Biblia, orar y crecer en un grupo.",
        ],
      },
      { t: "versiculo", ref: "Romanos 10:9" },
      {
        t: "parrafo",
        texto:
          "La fe se confiesa: «si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo». Un niño puede decirlo con sus propias palabras.",
      },
      {
        t: "nota",
        titulo: "Sin presión",
        texto:
          "Nunca uses premios, miedo ni la presión del grupo para que un niño pase al frente. Un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan. Lo que buscamos es una fe verdadera, aunque tarde un poco más.",
      },
    ],
    ideaClave:
      "Un niño puede creer en Jesús de verdad. El evangelio se explica con sencillez: Dios te ama, todos pecamos, Jesús murió por nuestros pecados y resucitó, y la vida eterna es un regalo para el que confía en él. La conversación se tiene con calma y en un lugar visible, comprobando que el niño entiende, invitando sin presión y orando juntos; después se les cuenta a los padres y se acompaña al niño para que crezca.",
    paraLaVida: {
      texto: "Con un niño, la presión puede conseguir una oración; solo la gracia produce una fe verdadera.",
      pregunta: "¿Cómo explicarías el evangelio a un niño de siete años con tus propias palabras?",
    },
  },
  {
    id: "ninez-2-4",
    objetivos: [
      "Presentar con respeto las posiciones sobre la edad de la responsabilidad.",
      "Explicar cuándo y cómo se bautiza a un niño que cree, según la práctica de la iglesia.",
      "Enseñar que la promesa del Espíritu Santo es también para los niños.",
    ],
    paraEmpezar:
      "Los padres preguntan qué pasa con un niño que muere, cuándo puede bautizarse su hijo o si un niño puede recibir el Espíritu Santo. Son preguntas serias, y merecen respuestas con la Biblia y con respeto.",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 1:39" },
      {
        t: "parrafo",
        texto:
          "La Biblia habla de los hijos «que no saben hoy lo bueno ni lo malo». Por eso muchas iglesias evangélicas hablan de una edad de la responsabilidad: un momento, distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo.",
      },
      { t: "versiculo", ref: "2 Samuel 12:23" },
      {
        t: "parrafo",
        texto:
          "Cuando murió su hijo pequeño, David dijo: «Yo voy a él, mas él no volverá a mí». Muchos ven en estas palabras una esperanza para los niños que mueren antes de poder creer.",
      },
      {
        t: "nota",
        titulo: "Con respeto",
        texto:
          "La Biblia no da una edad exacta ni explica todo lo que pasa con los niños que mueren pequeños. Muchas iglesias evangélicas confían en que Dios los recibe por su gracia, y otras tradiciones lo explican de otra manera. Ante una familia en duelo, el pastor consuela con la misericordia de Dios y no especula.",
      },
      { t: "versiculo", ref: "Hechos 8:12" },
      {
        t: "parrafo",
        texto:
          "En Samaria, «cuando creyeron a Felipe», «se bautizaban hombres y mujeres». La declaración de fe del ministerio bautiza a quienes se arrepintieron y creyeron (artículo 8): por eso un niño se bautiza cuando entiende y confiesa su fe, y no por su edad.",
      },
      { t: "subtitulo", texto: "Antes de bautizar a un niño" },
      {
        t: "lista",
        items: [
          "Conversar con el niño para ver si entiende el evangelio y confía en Jesús, y que lo diga con sus propias palabras.",
          "Hablar con sus padres y contar con su acuerdo.",
          "Darle una clase de bautismo adaptada a su edad.",
          "Las iglesias difieren en la edad: unas bautizan a los niños que confiesan su fe y otras prefieren esperar a la adolescencia; sigue la práctica de tu iglesia.",
        ],
      },
      { t: "versiculo", ref: "Joel 2:28" },
      {
        t: "parrafo",
        texto:
          "Dios prometió: «derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas». En Pentecostés, Pedro dijo que la promesa era también para los hijos (Hechos 2:39). Los niños también pueden recibir el Espíritu Santo. Si hablar en lenguas es la señal inicial del bautismo en el Espíritu es un punto de la declaración de fe por confirmar.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando un niño quiera orar para recibir el Espíritu Santo, acompáñalo con alegría y sin presión, como a los adultos: enséñale lo que dice la Biblia, ora con él y deja que Dios obre. Cuida que la emoción de un grupo no empuje a nadie.",
      },
    ],
    ideaClave:
      "La Biblia habla de niños que no saben lo bueno ni lo malo, y muchas iglesias evangélicas hablan de una edad de la responsabilidad, distinta en cada niño; ante un niño que muere, el pastor consuela con la misericordia de Dios sin especular. El ministerio bautiza a quienes creen, así que un niño se bautiza cuando entiende y confiesa su fe, con sus padres y según la práctica de la iglesia. La promesa del Espíritu es también para los hijos; las lenguas como señal inicial quedan por confirmar.",
    paraLaVida: {
      texto: "Ante las preguntas difíciles, la Biblia y la misericordia de Dios responden mejor que la especulación.",
      pregunta: "¿Cómo responderías a unos padres que preguntan si su hijo de siete años puede bautizarse?",
    },
  },
  {
    id: "ninez-2-5",
    objetivos: [
      "Enseñar a los niños a orar con sencillez.",
      "Animar a los niños a adorar y a guardar la Palabra en su corazón.",
      "Dar a los niños maneras reales de servir y de ser ejemplo.",
    ],
    paraEmpezar:
      "La fe de un niño no es solo escuchar historias. Un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1), con el Sermón del monte", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 6:9-13" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a orar con palabras sencillas: «Padre nuestro que estás en los cielos, santificado sea tu nombre». El Padre nuestro es un buen modelo para los niños: alabar, pedir que se haga la voluntad de Dios, pedir el pan, el perdón y la ayuda contra el mal.",
      },
      { t: "subtitulo", texto: "Formas sencillas de orar con niños" },
      {
        t: "lista",
        items: [
          "Orar con frases cortas y con sus propias palabras.",
          "Dar gracias por las cosas de cada día.",
          "Orar unos por otros, por la familia y por los enfermos.",
          "Usar los dedos de la mano: alabar, pedir perdón, dar gracias, pedir por otros y pedir por uno mismo.",
          "Anotar las peticiones y celebrar las respuestas.",
        ],
      },
      { t: "versiculo", ref: "Salmos 8:2" },
      {
        t: "parrafo",
        texto:
          "«De la boca de los niños y de los que maman, fundaste la fortaleza». La alabanza de los niños tiene poder delante de Dios.",
      },
      { t: "versiculo", ref: "Salmos 119:11" },
      {
        t: "parrafo",
        texto:
          "«En mi corazón he guardado tus dichos, Para no pecar contra ti». Aprender de memoria versículos cortos, con música o con gestos, deja la Palabra en el corazón para toda la vida.",
      },
      { t: "versiculo", ref: "1 Timoteo 4:12" },
      {
        t: "parrafo",
        texto:
          "Pablo le dijo a Timoteo, que era joven: «Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza». Los niños también pueden ser ejemplo.",
      },
      { t: "subtitulo", texto: "Maneras de servir según la edad" },
      {
        t: "lista",
        items: [
          "Los más pequeños: ayudar a ordenar, repartir materiales y saludar a los que llegan.",
          "Los escolares: leer un versículo, orar en voz alta, ayudar en la alabanza o en una obra de teatro.",
          "Los preadolescentes: ayudar con los más pequeños junto a un adulto, servir en la tecnología o en proyectos de ayuda a otros.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Celebra la fe de los niños: cuando oran, cuando aprenden un versículo o cuando sirven. Un niño que sirve y es tomado en serio siente que pertenece a la iglesia.",
      },
    ],
    ideaClave:
      "Un niño puede orar, adorar, guardar la Palabra y servir. El Padre nuestro le enseña a orar con sencillez, y hay formas fáciles de hacerlo con frases cortas, gratitud y peticiones por otros. La alabanza de los niños tiene poder delante de Dios, aprender versículos guarda la Palabra en su corazón y, como Timoteo, los niños pueden ser ejemplo. Cada edad tiene maneras reales de servir, y el líder celebra su fe.",
    paraLaVida: {
      texto: "Un niño que ora, adora y sirve no es un espectador: es parte de la iglesia.",
      pregunta: "¿Qué tarea real podría tener un niño en tu iglesia este mes?",
    },
  },
  {
    id: "ninez-2-6",
    objetivos: [
      "Reconocer cómo afectan a un niño el duelo, el divorcio, el abuso y otras crisis.",
      "Acompañar a un niño que sufre, con la Palabra y junto con su familia.",
      "Incluir a los niños con discapacidad y saber cuándo pedir ayuda profesional.",
    ],
    paraEmpezar:
      "Algunos niños llegan a la clase con cargas muy pesadas: la muerte de un padre, un divorcio, una mudanza, la separación de la familia por la migración o un abuso. El maestro no puede resolverlo todo, pero puede ser un lugar seguro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 68:5" },
      {
        t: "parrafo",
        texto:
          "Dios se presenta como «Padre de huérfanos y defensor de viudas». Los niños que sufren tienen un lugar especial en su corazón.",
      },
      { t: "versiculo", ref: "Salmos 34:18" },
      {
        t: "parrafo",
        texto:
          "«Cercano está Jehová a los quebrantados de corazón». El niño que sufre necesita saber que Dios está cerca, y verlo en adultos que se acercan.",
      },
      { t: "subtitulo", texto: "Cómo acompañar a un niño que sufre" },
      {
        t: "lista",
        items: [
          "Escucharlo sin apurarlo y aceptar lo que siente: tristeza, enojo o miedo.",
          "Decir la verdad con palabras sencillas, sin inventar explicaciones.",
          "Mantener las rutinas de la clase, que le dan seguridad.",
          "Trabajar con sus padres o con quienes lo cuidan, y no a sus espaldas.",
          "Orar con él y recordarle que Dios lo ama y está cerca.",
          "Pedir ayuda profesional cuando el dolor no pasa o afecta su vida.",
        ],
      },
      {
        t: "nota",
        titulo: "Si un niño cuenta un abuso",
        texto:
          "Créele, agradécele que te lo contó y no le prometas guardar el secreto. No le hagas muchas preguntas ni investigues por tu cuenta: avisa de inmediato al responsable del ministerio y, como pide la ley en Texas, a las autoridades. Lo verás con detalle en la materia Protección de menores.",
      },
      { t: "versiculo", ref: "Mateo 18:10" },
      {
        t: "parrafo",
        texto:
          "Jesús advirtió: «Mirad que no menospreciéis a uno de estos pequeños». Ningún niño sobra: tampoco el que es difícil ni el que es diferente.",
      },
      { t: "versiculo", ref: "2 Samuel 9:7" },
      {
        t: "parrafo",
        texto:
          "David recibió a Mefi-boset, que era lisiado de los pies, y le dijo: «No tengas temor, porque yo a la verdad haré contigo misericordia»; y le dio un lugar a su mesa: «tú comerás siempre a mi mesa». La iglesia también hace lugar en su mesa a los niños con discapacidad.",
      },
      { t: "versiculo", ref: "Lucas 14:13" },
      { t: "subtitulo", texto: "Incluir a los niños con discapacidad" },
      {
        t: "lista",
        items: [
          "Hablar con los padres para conocer lo que el niño necesita.",
          "Adaptar el espacio, los materiales y el tiempo.",
          "Asignarle, si hace falta, un adulto que lo acompañe.",
          "Enseñar a los demás niños a recibirlo con respeto.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No eres terapeuta, y no tienes que serlo. Pero puedes ser un adulto seguro que escucha, ora y avisa a tiempo. A veces eso cambia la vida de un niño.",
      },
    ],
    ideaClave:
      "Dios es Padre de huérfanos y está cerca de los quebrantados, y Jesús mandó no menospreciar a ninguno de los pequeños. El maestro acompaña al niño que sufre escuchándolo, diciendo la verdad con sencillez, manteniendo sus rutinas, trabajando con su familia, orando y pidiendo ayuda profesional cuando hace falta. Si un niño cuenta un abuso, se le cree, no se le promete secreto y se avisa de inmediato. Y, como David con Mefi-boset, la iglesia hace lugar en su mesa a los niños con discapacidad.",
    paraLaVida: {
      texto: "Para un niño que sufre, un adulto seguro puede ser la primera imagen del amor de Dios.",
      pregunta: "¿Qué niño de tu clase podría necesitar hoy que lo escuches con más atención?",
    },
  },
];
