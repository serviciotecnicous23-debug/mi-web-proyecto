/**
 * Especialidad Juventud · Materia 2 — Cosmovisión cristiana y cultura (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Qué es una cosmovisión y la historia de la Biblia en cuatro actos, las cosmovisiones de hoy, la identidad del joven en
 * Cristo, las redes sociales y la tecnología, el discernimiento del arte y el entretenimiento, y cómo responder con verdad
 * y amor, con un ejemplo resuelto paso a paso en cada lección. Sobre la sexualidad sigue el artículo 14 de la declaración
 * de fe (el matrimonio).
 */
import type { LeccionContenido } from "../tipos";

export const JUVENTUD_2: LeccionContenido[] = [
  {
    id: "juventud-2-1",
    objetivos: [
      "Explicar qué es una cosmovisión y por qué todos tienen una.",
      "Describir la historia de la Biblia en cuatro actos: creación, caída, redención y consumación.",
      "Mirar una idea de la cultura con los cuatro actos de la historia bíblica.",
    ],
    paraEmpezar:
      "Todos miramos el mundo con unos lentes, aunque no nos demos cuenta. Esos lentes responden preguntas grandes: de dónde venimos, qué salió mal, si hay solución y hacia dónde vamos. A eso se le llama una cosmovisión.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Romanos 12:2" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento». La fe no cambia solo lo que hacemos los domingos: cambia la manera de pensar sobre todo.",
      },
      { t: "subtitulo", texto: "Las cuatro preguntas y los cuatro actos" },
      {
        t: "lista",
        items: [
          "¿De dónde venimos? La creación: Dios hizo todo bueno, y al ser humano a su imagen.",
          "¿Qué salió mal? La caída: el pecado dañó la relación con Dios, con los demás y con la creación.",
          "¿Hay solución? La redención: Dios envió a su Hijo para rescatarnos y hacer nuevas todas las cosas.",
          "¿Hacia dónde vamos? La consumación: Cristo volverá y la creación será libertada.",
        ],
      },
      { t: "versiculo", ref: "Génesis 3:6" },
      {
        t: "parrafo",
        texto:
          "La caída empezó con una manera de mirar: la mujer «vio» que el árbol era «agradable a los ojos, y árbol codiciable para alcanzar la sabiduría». Antes de desobedecer, el ser humano creyó otra historia sobre Dios.",
      },
      { t: "versiculo", ref: "Romanos 8:21" },
      {
        t: "parrafo",
        texto:
          "Y la historia no termina en la caída: «también la creación misma será libertada de la esclavitud de corrupción, a la libertad gloriosa de los hijos de Dios».",
      },
      { t: "versiculo", ref: "2 Corintios 10:5" },
      {
        t: "parrafo",
        texto:
          "Por eso el creyente aprende a pensar con la Biblia, «llevando cautivo todo pensamiento a la obediencia a Cristo». No se trata de no pensar, sino de pensar a la luz de Cristo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: mirar una idea con los cuatro actos" },
      {
        t: "lista",
        items: [
          "La idea: el ser humano es solo un animal más, producto del azar.",
          "Paso 1, la creación: la Biblia dice que Dios creó al ser humano a su imagen; por eso cada persona tiene un valor que no depende de lo que haga.",
          "Paso 2, la caída: es verdad que el ser humano puede actuar como un animal, porque el pecado dañó su corazón, pero eso no es su diseño.",
          "Paso 3, la redención: Cristo vino a restaurar la imagen de Dios en nosotros.",
          "Paso 4, la consumación: nuestro destino no es desaparecer, sino la vida con Dios para siempre.",
          "Conclusión: la idea tiene algo de verdad sobre el pecado, pero le falta lo más importante: Dios y su propósito.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Enseña a los jóvenes a hacer las cuatro preguntas ellos mismos. Un joven que aprende a pensar con la historia de la Biblia no necesita que le digas qué pensar de cada cosa nueva que aparezca.",
      },
    ],
    ideaClave:
      "Una cosmovisión es la manera en que alguien mira el mundo, y responde cuatro preguntas: de dónde venimos, qué salió mal, si hay solución y hacia dónde vamos. La Biblia las responde con su historia en cuatro actos: creación, caída, redención y consumación. El creyente no se conforma a este siglo, sino que renueva su entendimiento y lleva cautivo todo pensamiento a la obediencia a Cristo.",
    paraLaVida: {
      texto: "No se trata de no pensar, sino de pensar a la luz de Cristo.",
      pregunta: "¿Qué idea que escuchas en la escuela o en las redes podrías mirar con los cuatro actos?",
    },
  },
  {
    id: "juventud-2-2",
    objetivos: [
      "Describir las cosmovisiones más comunes de hoy.",
      "Distinguir lo que cada una tiene de verdad y lo que le falta.",
      "Aplicar el ejemplo de Pablo en Atenas para entender la cultura y anunciar a Cristo.",
    ],
    paraEmpezar:
      "Los jóvenes escuchan cada día ideas que vienen de cosmovisiones distintas, en la escuela, en las canciones y en las redes. Muchas veces no tienen nombre, pero se repiten en frases como sigue a tu corazón o cada uno tiene su verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Colosenses 2:8" },
      {
        t: "parrafo",
        texto:
          "Pablo advierte: «Mirad que nadie os engañe por medio de filosofías y huecas sutilezas, según las tradiciones de los hombres, conforme a los rudimentos del mundo, y no según Cristo». El problema no es pensar, sino pensar sin Cristo.",
      },
      { t: "subtitulo", texto: "Las cosmovisiones de hoy" },
      {
        t: "lista",
        items: [
          "El materialismo: solo existe lo que se ve y se mide. Tiene razón en valorar la ciencia, pero le falta Dios y el sentido de la vida.",
          "El relativismo: cada uno tiene su verdad. Tiene razón en pedir humildad, pero si nada es verdad, tampoco esa frase lo es.",
          "El individualismo: sé fiel a ti mismo. Tiene razón en que cada persona importa, pero pone al yo en el lugar de Dios.",
          "El consumismo: eres lo que tienes. Tiene razón en que las cosas son buenas, pero promete una felicidad que no puede dar.",
          "La espiritualidad sin Dios personal: todo es energía. Tiene razón en que hay algo más que la materia, pero no conoce al Dios que habla y ama.",
        ],
      },
      { t: "versiculo", ref: "Jueces 21:25" },
      {
        t: "parrafo",
        texto:
          "El relativismo no es nuevo. En un tiempo oscuro de Israel, la Biblia lo resume así: «cada uno hacía lo que bien le parecía». El resultado fue mucho dolor.",
      },
      { t: "versiculo", ref: "1 Juan 2:15-17" },
      {
        t: "parrafo",
        texto:
          "Juan describe el corazón del consumismo y del orgullo: «los deseos de la carne, los deseos de los ojos, y la vanagloria de la vida». Y recuerda: «el mundo pasa, y sus deseos; pero el que hace la voluntad de Dios permanece para siempre».",
      },
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo primero observó la cultura y después habló: «pasando y mirando vuestros santuarios, hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO». Empezó por lo que ellos conocían y les anunció a Cristo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: mirar la frase sigue a tu corazón" },
      {
        t: "lista",
        items: [
          "Paso 1, ¿qué cree sobre Dios? Que no hace falta: la guía es uno mismo.",
          "Paso 2, ¿qué cree sobre el ser humano? Que su corazón siempre sabe lo que es bueno.",
          "Paso 3, ¿qué tiene de verdad? Que las decisiones importantes salen del corazón y que nadie debe vivir una vida falsa.",
          "Paso 4, ¿qué le falta? Que el corazón también se equivoca y necesita ser cambiado por Dios.",
          "Paso 5, ¿qué ofrece Cristo? Un corazón nuevo y una guía mejor: seguirlo a él.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Al hablar de otras cosmovisiones, no te burles de nadie. Reconoce lo que tienen de verdad: así los jóvenes aprenden a escuchar, y las personas que piensan distinto se sienten respetadas.",
      },
    ],
    ideaClave:
      "Pablo advierte que nadie nos engañe con filosofías que no son según Cristo. Las cosmovisiones de hoy, como el materialismo, el relativismo, el individualismo, el consumismo y la espiritualidad sin un Dios personal, tienen algo de verdad, pero les falta Dios y su propósito; cuando cada uno hace lo que bien le parece, hay dolor, y el mundo pasa con sus deseos. Como Pablo en Atenas, el joven observa la cultura, reconoce lo que tiene de verdad y anuncia a Cristo.",
    paraLaVida: {
      texto: "El problema no es pensar, sino pensar sin Cristo.",
      pregunta: "¿Qué frase de la cultura escuchas más seguido, y qué le falta?",
    },
  },
  {
    id: "juventud-2-3",
    objetivos: [
      "Explicar la identidad del joven según la Biblia: creado por Dios y nuevo en Cristo.",
      "Comparar lo que dice la cultura sobre la identidad con lo que dice Dios.",
      "Acompañar con verdad y amor a un joven que lucha con su identidad.",
    ],
    paraEmpezar:
      "Muchos jóvenes miden su valor por los me gusta, por su cuerpo o por lo que logran, y se comparan todo el tiempo. La pregunta de fondo es una sola: ¿quién soy yo?",
    bloques: [
      { t: "versiculo", ref: "Salmos 139:13-14" },
      {
        t: "parrafo",
        texto:
          "El salmista sabía de dónde venía su valor: «Porque tú formaste mis entrañas; Tú me hiciste en el vientre de mi madre. Te alabaré; porque formidables, maravillosas son tus obras». Cada joven es una obra de Dios.",
      },
      { t: "versiculo", ref: "2 Corintios 5:17" },
      {
        t: "parrafo",
        texto:
          "Y en Cristo recibe una identidad nueva: «si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas».",
      },
      { t: "versiculo", ref: "Efesios 2:10" },
      {
        t: "parrafo",
        texto:
          "Su vida tiene propósito: «somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas».",
      },
      { t: "subtitulo", texto: "Lo que dice la cultura y lo que dice Dios" },
      {
        t: "lista",
        items: [
          "La cultura: vales por lo que logras o por cómo te ven. Dios: vales porque él te hizo y te ama.",
          "La cultura: eres lo que sientes. Dios: eres quien él dice que eres, aunque tus sentimientos cambien.",
          "La cultura: tu identidad la construyes tú solo. Dios: tu identidad la recibes en Cristo.",
          "La cultura: tu cuerpo es solo tuyo. Dios: tu cuerpo fue formado por él y es templo del Espíritu Santo.",
        ],
      },
      { t: "versiculo", ref: "1 Corintios 6:19-20" },
      {
        t: "parrafo",
        texto:
          "Pablo recuerda: «vuestro cuerpo es templo del Espíritu Santo», y «habéis sido comprados por precio; glorificad, pues, a Dios en vuestro cuerpo». El cuerpo no es un enemigo ni un objeto: es un regalo para honrar a Dios.",
      },
      {
        t: "parrafo",
        texto:
          "La Biblia enseña que Dios creó al ser humano varón y hembra (Génesis 1:27) y que su diseño para la sexualidad es el matrimonio entre un hombre y una mujer (Génesis 2:24), como dice la declaración de fe del ministerio en su artículo 14. La iglesia habla de esto con la verdad y con amor: nadie es objeto de burla, y el joven que lucha con su identidad o con su sexualidad necesita acompañamiento, no rechazo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven que se compara en las redes" },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar: el líder pregunta cómo se siente cuando mira las redes, sin juzgar.",
          "Paso 2, nombrar la mentira: por ejemplo, valgo menos porque mi vida no se ve como la de otros.",
          "Paso 3, oponer la verdad: leen juntos Salmos 139:13-14 y Efesios 2:10.",
          "Paso 4, un paso práctico: dejar de seguir las cuentas que lo hacen sentir menos y poner un tiempo sin redes cada día.",
          "Paso 5, acompañar: el líder ora con él y le pregunta la semana siguiente cómo le fue.",
          "Si hay señales de tristeza profunda o de autolesiones, el líder avisa a sus padres y busca ayuda profesional; en una crisis, se llama al 988.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca hables de la identidad de un joven delante de otros ni lo expongas. Lo que te cuente en confianza se guarda, salvo que corra peligro.",
      },
    ],
    ideaClave:
      "Cada joven fue formado por Dios en el vientre de su madre, y en Cristo es una nueva criatura, creada para buenas obras. La cultura dice que vale por lo que logra, que es lo que siente y que su identidad la construye solo; Dios dice que vale porque él lo hizo y lo ama, que es quien él dice que es y que su cuerpo es templo del Espíritu. La iglesia enseña el diseño de Dios para la sexualidad con la verdad y con amor, sin burla y acompañando al que lucha.",
    paraLaVida: {
      texto: "Vales porque Dios te hizo y te ama, no por los me gusta.",
      pregunta: "¿Qué mentira sobre su valor escuchan más los jóvenes de tu iglesia?",
    },
  },
  {
    id: "juventud-2-4",
    objetivos: [
      "Explicar los beneficios y los riesgos de las redes sociales y la tecnología.",
      "Responder al ciberacoso y a la pornografía con ayuda y sin vergüenza.",
      "Preparar con una familia un acuerdo para el uso de la tecnología.",
    ],
    paraEmpezar:
      "El teléfono puede servir para leer la Biblia, aprender y estar en contacto con otros. También puede robar horas, sueño y paz. La tecnología no es buena ni mala por sí misma: depende de cómo se use.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Efesios 5:15-16" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Mirad, pues, con diligencia cómo andéis, no como necios sino como sabios, aprovechando bien el tiempo». El tiempo frente a la pantalla también es tiempo que Dios nos dio.",
      },
      { t: "versiculo", ref: "1 Corintios 6:12" },
      {
        t: "parrafo",
        texto:
          "Y da un criterio claro: «todas las cosas me son lícitas, mas no todas convienen; todas las cosas me son lícitas, mas yo no me dejaré dominar de ninguna». Si el teléfono manda, algo está mal.",
      },
      { t: "versiculo", ref: "Salmos 101:3" },
      {
        t: "parrafo",
        texto: "El salmista tomó una decisión: «No pondré delante de mis ojos cosa injusta».",
      },
      { t: "subtitulo", texto: "Los riesgos más comunes" },
      {
        t: "lista",
        items: [
          "La comparación: mirar la vida que otros muestran y sentirse menos.",
          "El uso sin control: horas que se van sin darse cuenta, y el sueño que se pierde.",
          "La pornografía: imágenes que dañan la mente, las relaciones y la manera de ver a las personas.",
          "El ciberacoso: burlas, amenazas o mentiras que se difunden en las redes.",
          "La huella digital: lo que se publica queda, y otros lo pueden ver años después.",
          "La desinformación: noticias falsas que se comparten sin comprobar.",
        ],
      },
      { t: "subtitulo", texto: "Cuando un joven pide ayuda" },
      {
        t: "lista",
        items: [
          "Con la pornografía: escucharlo sin escandalizarse, recordarle que en Cristo hay perdón y una vida nueva, y ayudarlo con pasos concretos: un filtro, el teléfono fuera del cuarto de noche y alguien con quien rendir cuentas.",
          "Con el ciberacoso: no responder, guardar las pruebas, contarlo a un adulto de confianza y reportar la cuenta; si hay amenazas, avisar a los padres y a las autoridades.",
          "Una imagen íntima de un menor nunca se comparte ni se guarda: es un delito, y se avisa a los padres y a las autoridades.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un acuerdo familiar para la tecnología" },
      {
        t: "lista",
        items: [
          "Paso 1, conversar: padres e hijos hablan de para qué usan el teléfono y qué les preocupa.",
          "Paso 2, horarios: sin pantallas en las comidas y una hora fija para dejar el teléfono por la noche, fuera del cuarto.",
          "Paso 3, lugares: la computadora se usa en un lugar común de la casa.",
          "Paso 4, seguridad: filtros, y las contraseñas de los menores las conocen los padres.",
          "Paso 5, un día distinto: un tiempo de descanso de las redes cada semana, para la familia y para Dios.",
          "Paso 6, revisar: cada mes se conversa cómo va el acuerdo, y se ajusta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los padres también son ejemplo. Un acuerdo que solo cumplen los hijos no dura; propón que lo firme toda la familia.",
      },
    ],
    ideaClave:
      "La tecnología no es buena ni mala por sí misma: Pablo pide andar como sabios, aprovechando bien el tiempo, y no dejarnos dominar de ninguna cosa, y el salmista decidió no poner delante de sus ojos cosa injusta. Los riesgos más comunes son la comparación, el uso sin control, la pornografía, el ciberacoso, la huella digital y la desinformación. Ante cada uno, la iglesia ayuda sin vergüenza y con pasos concretos, y un acuerdo familiar con horarios, lugares, seguridad y descanso protege a todos.",
    paraLaVida: {
      texto: "Si el teléfono manda, algo está mal.",
      pregunta: "¿Qué paso del acuerdo familiar podrías proponer esta semana en tu casa?",
    },
  },
  {
    id: "juventud-2-5",
    objetivos: [
      "Distinguir las maneras de responder a la cultura: rechazarlo todo, aceptarlo todo, discernir y crear.",
      "Analizar una canción, una serie o un juego con cuatro preguntas.",
      "Animar a los jóvenes a crear arte que honre a Dios.",
    ],
    paraEmpezar:
      "Las canciones, las series y los videojuegos enseñan, aunque no lo parezca. Cuentan historias sobre qué es bueno, qué es malo y qué da la felicidad. El joven discípulo aprende a escucharlos con discernimiento.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Tesalonicenses 5:21" },
      {
        t: "parrafo",
        texto:
          "El consejo de Pablo es corto: «Examinadlo todo; retened lo bueno». Ni todo es malo ni todo es bueno: hay que examinar.",
      },
      { t: "subtitulo", texto: "Cuatro maneras de responder a la cultura" },
      {
        t: "lista",
        items: [
          "Rechazarlo todo: aleja al joven del mundo, pero no le enseña a pensar ni a hablar con los que no creen.",
          "Aceptarlo todo: el joven se adapta, pero termina pensando como el mundo.",
          "Discernir: examinarlo todo y retener lo bueno, con la Biblia como medida.",
          "Crear: hacer canciones, historias, videos y juegos buenos, que muestren la verdad y la belleza de Dios.",
        ],
      },
      { t: "versiculo", ref: "Filipenses 4:8" },
      {
        t: "parrafo",
        texto:
          "Pablo da una lista para la mente: «todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad».",
      },
      { t: "versiculo", ref: "Colosenses 3:17" },
      {
        t: "parrafo",
        texto:
          "Y una regla para todo: «todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús». Escuchar, mirar y crear también se hacen delante de él.",
      },
      { t: "subtitulo", texto: "Cuatro preguntas para discernir" },
      {
        t: "lista",
        items: [
          "¿Qué dice de Dios, o qué calla sobre él?",
          "¿Qué dice del ser humano: quién es y qué lo hace feliz?",
          "¿Qué presenta como bueno y qué como malo?",
          "¿Qué me provoca pensar, sentir o hacer?",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una canción que dice vive el momento, nada importa mañana" },
      {
        t: "lista",
        items: [
          "Sobre Dios: no aparece; la vida se vive como si él no existiera.",
          "Sobre el ser humano: la felicidad está en el placer de hoy.",
          "Lo bueno y lo malo: lo bueno es sentirse bien; lo malo, pensar en las consecuencias.",
          "Lo que provoca: decidir sin pensar en el futuro ni en los demás.",
          "Lo que tiene de verdad: que el presente es un regalo y hay que disfrutarlo.",
          "Lo que le falta: que el mañana importa, que el mundo pasa y que el que hace la voluntad de Dios permanece.",
          "La decisión: el joven decide si le conviene escucharla, y sobre todo aprende a no creerle.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Analicen juntos, en el grupo, una canción o una película que los jóvenes conocen. Es mejor enseñarles a pensar que darles solo una lista de lo prohibido.",
      },
    ],
    ideaClave:
      "Pablo pide examinarlo todo y retener lo bueno, pensar en todo lo verdadero, honesto, justo, puro y amable, y hacerlo todo en el nombre del Señor Jesús. Ante la cultura no sirve rechazarlo todo ni aceptarlo todo: el joven discípulo discierne con cuatro preguntas, sobre Dios, sobre el ser humano, sobre lo bueno y lo malo y sobre lo que le provoca, y también crea arte que muestre la verdad y la belleza de Dios.",
    paraLaVida: {
      texto: "Es mejor enseñarles a pensar que darles solo una lista de lo prohibido.",
      pregunta: "¿Qué canción o serie que escuchan tus jóvenes podrían analizar juntos?",
    },
  },
  {
    id: "juventud-2-6",
    objetivos: [
      "Explicar cómo responder a las preguntas difíciles con verdad y amor.",
      "Seguir paso a paso una conversación con alguien que piensa distinto.",
      "Preparar a los jóvenes para dar razón de su fe en la escuela y en las redes.",
    ],
    paraEmpezar:
      "Tarde o temprano, un compañero o un profesor le dirá a un joven cristiano que su fe no tiene sentido. Ese momento no es una derrota: es una oportunidad para dar razón de la esperanza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Pedro 3:15-16" },
      {
        t: "parrafo",
        texto:
          "Pedro pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros». Preparados, pero con mansedumbre.",
      },
      { t: "versiculo", ref: "Efesios 4:15" },
      {
        t: "parrafo",
        texto:
          "La verdad y el amor van juntos: «siguiendo la verdad en amor». Verdad sin amor hiere; amor sin verdad engaña.",
      },
      { t: "versiculo", ref: "Colosenses 4:6" },
      {
        t: "parrafo",
        texto:
          "Y las palabras importan: «Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno». Cada persona necesita una respuesta para ella.",
      },
      { t: "versiculo", ref: "Hechos 17:26-28" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo citó a los poetas de ellos: «Porque en él vivimos, y nos movemos, y somos; como algunos de vuestros propios poetas también han dicho». Buscó un punto en común para hablar de Dios.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: todas las religiones son iguales" },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar: deja que tu amigo explique lo que piensa, sin interrumpir.",
          "Paso 2, preguntar: ¿qué quieres decir con iguales? ¿Que todas enseñan a ser buenos, o que todas dicen lo mismo de Dios?",
          "Paso 3, reconocer lo verdadero: es cierto que muchas religiones enseñan cosas buenas, como el amor al prójimo.",
          "Paso 4, mostrar la diferencia: las religiones dicen cosas distintas sobre Dios y sobre la salvación, y no todas pueden ser verdad a la vez.",
          "Paso 5, presentar a Cristo: el cristianismo no dice que nosotros llegamos a Dios por ser buenos, sino que Dios vino a buscarnos en Jesús.",
          "Paso 6, dejar la puerta abierta: invítalo a leer juntos un evangelio, sin presión, y sigue siendo su amigo.",
        ],
      },
      { t: "subtitulo", texto: "Preguntas que los jóvenes escuchan" },
      {
        t: "lista",
        items: [
          "¿La ciencia contradice la Biblia? Muchos científicos han sido creyentes, y la Biblia y la ciencia responden preguntas distintas.",
          "¿Por qué Dios permite el sufrimiento? La Biblia no esconde el dolor; en la cruz Dios mismo sufrió por nosotros, y prometió hacer nuevas todas las cosas.",
          "¿Por qué Jesús sería el único camino? Porque él es el único que murió por nuestros pecados y resucitó.",
          "Para profundizar, la materia Apologética del Nivel 4 trata estas preguntas a fondo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Ensayen en el grupo: un joven hace de compañero que duda y otro responde con los seis pasos. Después conversen qué salió bien y qué se puede decir con más gracia.",
      },
    ],
    ideaClave:
      "Pedro pide estar siempre preparados para presentar defensa con mansedumbre y reverencia; la verdad va con el amor, y la palabra, con gracia y sazonada con sal, para responder a cada uno. Como Pablo, que citó a los poetas de Atenas, el joven busca un punto en común. En una conversación con alguien que piensa distinto escucha, pregunta, reconoce lo verdadero, muestra la diferencia, presenta a Cristo y deja la puerta abierta, sin perder la amistad.",
    paraLaVida: {
      texto: "Verdad sin amor hiere; amor sin verdad engaña.",
      pregunta: "¿Qué pregunta difícil te han hecho, y cómo la responderías hoy con los seis pasos?",
    },
  },
];
