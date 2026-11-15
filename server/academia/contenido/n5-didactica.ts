/**
 * Nivel 5 · Materia 3 — Didáctica: cómo enseñar (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El llamado y el carácter del maestro, cómo aprende la gente (las siete leyes de Gregory, Hendricks y lo que muestran
 * los estudios sobre la memoria), cómo preparar una clase con objetivos, los métodos de Jesús, cómo evaluar y cómo
 * acompañar a los alumnos, con el trabajo del profesor y del mentor en la academia (docs/academia.md).
 */
import type { LeccionContenido } from "../tipos";

export const N5_DIDACTICA: LeccionContenido[] = [
  {
    id: "n5-didactica-1",
    objetivos: [
      "Explicar por qué la enseñanza es un don y un llamado en la iglesia.",
      "Describir el carácter que la Palabra pide a quien enseña.",
      "Aplicar a su vida el ejemplo de Esdras: estudiar, obedecer y enseñar.",
    ],
    paraEmpezar:
      "Casi todos recordamos a un maestro que marcó nuestra vida. No siempre era el que más sabía, sino el que vivía lo que enseñaba.",
    bloques: [
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "«Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos». El orden importa: primero estudiar, después obedecer y entonces enseñar. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Un don y un llamado" },
      {
        t: "parrafo",
        texto:
          "Pablo nombra la enseñanza entre los dones que Dios da a su iglesia (Romanos 12:7), y Cristo dio maestros para preparar a los creyentes para la obra del ministerio (Efesios 4:11-12). Enseñar no es solo una tarea: es un servicio que se recibe de Dios y se ejerce para el bien de otros.",
      },
      { t: "versiculo", ref: "Santiago 3:1" },
      {
        t: "parrafo",
        texto:
          "Santiago advierte: «Hermanos míos, no os hagáis maestros muchos de vosotros, sabiendo que recibiremos mayor condenación». Quien enseña responde ante Dios por lo que dice y por cómo vive.",
      },
      { t: "subtitulo", texto: "El carácter del maestro" },
      {
        t: "lista",
        items: [
          "Ama a Dios y su Palabra: estudia antes de enseñar (2 Timoteo 2:15).",
          "Vive lo que enseña: su ejemplo enseña más que sus palabras (1 Timoteo 4:12).",
          "Ama a sus alumnos: los conoce, ora por ellos y tiene paciencia.",
          "Es humilde: reconoce lo que no sabe y sigue aprendiendo.",
          "Depende del Espíritu Santo, que enseña todas las cosas (Juan 14:26).",
        ],
      },
      { t: "versiculo", ref: "Juan 13:13-15" },
      {
        t: "parrafo",
        texto:
          "Jesús, el Maestro, enseñó lavando los pies de sus discípulos: «Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis». La lección más fuerte fue lo que hizo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "De aquí salen los profesores",
        texto:
          "Esta materia prepara a quienes enseñan en la iglesia y a los futuros profesores y mentores de la academia. Lo primero que se forma es el maestro mismo.",
      },
    ],
    ideaClave:
      "Enseñar es un don y un llamado que Dios da a su iglesia, y quien enseña responde ante Dios. Como Esdras, el maestro primero estudia la Palabra, después la obedece y entonces la enseña; y como Jesús, enseña con su ejemplo, con amor por sus alumnos y en dependencia del Espíritu Santo.",
    paraLaVida: {
      texto: "Tu vida es la primera lección que tus alumnos leen.",
      pregunta: "¿Qué parte de lo que enseñas necesitas vivir mejor antes de volver a enseñarla?",
    },
  },
  {
    id: "n5-didactica-2",
    objetivos: [
      "Explicar cómo aprende una persona: atención, comprensión, práctica y repaso.",
      "Describir lo que muestran los estudios sobre recordar y repasar.",
      "Aplicar a una clase las leyes de la enseñanza de Gregory y los principios de Hendricks.",
    ],
    paraEmpezar:
      "Un alumno puede escuchar una clase excelente y olvidarla en una semana. Enseñar no es solo hablar: es lograr que el otro aprenda.",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 6:6-7" },
      {
        t: "parrafo",
        texto:
          "Dios mandó a Israel: «Y estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos». La enseñanza bíblica se repite, se conversa y se vive en el camino de cada día.",
      },
      { t: "subtitulo", texto: "Lo que muestran los estudios" },
      {
        t: "lista",
        items: [
          "Se aprende mejor tratando de recordar que solo releyendo: por eso cada lección de la academia termina con un repaso.",
          "Repasar en días distintos, con espacios entre uno y otro, graba mejor que estudiar todo de una vez: por eso los versículos de memoria vuelven a los 1, 3, 7 y 21 días.",
          "Saber enseguida si uno acertó, y por qué, corrige el error a tiempo.",
          "Lo que se practica y se aplica se recuerda más que lo que solo se oye.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Así lo muestran los estudios sobre la memoria y el aprendizaje, como los de Roediger y Karpicke (2006) y el de Dunlosky y sus colegas (2013), que compararon las técnicas de estudio más usadas.",
      },
      { t: "subtitulo", texto: "Las siete leyes de la enseñanza" },
      {
        t: "parrafo",
        texto:
          "John Milton Gregory (1822-1898), educador y ministro bautista, resumió la enseñanza en siete leyes que muchos institutos bíblicos siguen usando:",
      },
      {
        t: "lista",
        items: [
          "El maestro conoce bien lo que va a enseñar.",
          "El alumno presta atención con interés.",
          "Maestro y alumno usan un lenguaje que los dos entienden.",
          "Se avanza de lo que el alumno ya sabe a lo que todavía no sabe.",
          "El maestro despierta y guía la mente del alumno, en vez de solo darle respuestas.",
          "El alumno reproduce con sus palabras lo que aprendió.",
          "Se repasa y se aplica lo aprendido.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Howard Hendricks (1924-2013), que enseñó más de cincuenta años en el Seminario Teológico de Dallas, insiste en tres cosas: el maestro que deja de aprender deja de enseñar bien; el alumno aprende más cuanto más participa; y la enseñanza que cambia vidas llega al corazón, no solo a la mente.",
      },
      { t: "versiculo", ref: "Hebreos 5:12-14" },
      {
        t: "parrafo",
        texto:
          "La carta a los Hebreos distingue entre la leche y el alimento sólido: «tenéis necesidad de leche, y no de alimento sólido». El buen maestro sabe en qué punto está su alumno y lo lleva, paso a paso, hacia la madurez. Así están ordenados los niveles de esta academia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "El adulto aprende distinto",
        texto:
          "Los adultos aprenden mejor cuando ven para qué sirve lo que estudian, cuando pueden relacionarlo con su experiencia y cuando participan. Por eso cada lección de la academia termina con una aplicación y una pregunta para la vida.",
      },
    ],
    ideaClave:
      "Se aprende prestando atención, entendiendo, practicando y repasando, y tratar de recordar con repasos espaciados graba mejor que releer. Gregory resumió la enseñanza en siete leyes, desde el maestro que conoce su lección hasta el repaso y la aplicación; Hendricks recuerda que el alumno aprende participando y que la enseñanza que cambia vidas llega al corazón.",
    paraLaVida: {
      texto: "Enseñar es lograr que el otro aprenda, no solo hablar.",
      pregunta: "¿Qué harás en tu próxima clase para que tus alumnos recuerden y practiquen, y no solo escuchen?",
    },
  },
  {
    id: "n5-didactica-3",
    objetivos: [
      "Escribir objetivos de aprendizaje medibles con los niveles de Bloom.",
      "Organizar una clase en partes: para empezar, la Palabra, la idea clave, la aplicación y el repaso.",
      "Preparar el plan escrito de una clase bíblica breve.",
    ],
    paraEmpezar:
      "Una clase improvisada suele dar vueltas sin llegar a ninguna parte. Una clase preparada sabe a dónde va y lleva a los alumnos hasta allí.",
    bloques: [
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Cuando Esdras leyó la ley al pueblo, los levitas «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura». Preparar una clase es eso: leer bien, explicar y procurar que el otro entienda.",
      },
      { t: "subtitulo", texto: "Empezar por el objetivo" },
      {
        t: "parrafo",
        texto:
          "Antes de preparar el contenido, el maestro se pregunta: ¿qué podrá hacer el alumno al terminar? Un buen objetivo usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar, y no solo saber o entender. La academia usa los niveles de la taxonomía de Bloom en su versión revisada: recordar, comprender, aplicar, analizar, evaluar y crear.",
      },
      {
        t: "lista",
        items: [
          "Recordar: citar de memoria Juan 3:16.",
          "Comprender: explicar con sus palabras qué es la gracia.",
          "Aplicar: escribir un paso concreto para perdonar a alguien esta semana.",
          "Analizar: distinguir en una parábola el punto principal de los detalles.",
          "Evaluar: juzgar si una enseñanza que escuchó es fiel a la Biblia.",
          "Crear: preparar un estudio bíblico de quince minutos para su grupo.",
        ],
      },
      { t: "subtitulo", texto: "Las partes de una clase" },
      {
        t: "lista",
        items: [
          "Para empezar: una pregunta, una historia breve o un problema que despierte el interés.",
          "La Palabra: el pasaje leído y explicado en su contexto.",
          "La idea clave: la verdad central dicha en una frase.",
          "Para la vida: una aplicación concreta y una pregunta personal.",
          "El repaso: preguntas para recordar y comprobar lo aprendido.",
        ],
      },
      {
        t: "parrafo",
        texto: "Es el mismo orden de las lecciones de esta academia: lo que viviste como alumno, ahora lo usas como maestro.",
      },
      { t: "versiculo", ref: "Lucas 24:27" },
      {
        t: "parrafo",
        texto:
          "En el camino a Emaús, Jesús, «comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían». Una clase bíblica lleva a la Escritura y, por ella, a Cristo.",
      },
      { t: "subtitulo", texto: "El plan escrito" },
      {
        t: "parrafo",
        texto:
          "El maestro escribe su plan: el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas. Así enseña con orden, respeta el tiempo y puede mejorar la clase la próxima vez.",
      },
      {
        t: "nota",
        titulo: "La oración también se prepara",
        texto: "Prepara la clase también de rodillas: ora por tus alumnos por su nombre y pide al Espíritu Santo que abra su entendimiento.",
      },
    ],
    ideaClave:
      "Una clase se prepara empezando por el objetivo: qué podrá hacer el alumno al terminar, con un verbo que se pueda comprobar según los niveles de Bloom. Después se ordena en partes: para empezar, la Palabra explicada, la idea clave, la aplicación y el repaso. El plan escrito y la oración completan la preparación.",
    paraLaVida: {
      texto: "Lo que se prepara con cuidado se enseña con claridad.",
      pregunta: "¿Qué objetivo medible escribirías para la próxima clase que vas a dar?",
    },
  },
  {
    id: "n5-didactica-4",
    objetivos: [
      "Describir los métodos que usó Jesús: preguntas, historias, objetos, ejemplo, práctica y conversación personal.",
      "Escoger el método adecuado según el objetivo y el grupo.",
      "Aplicar métodos que hagan participar a los alumnos, también en las clases en línea.",
    ],
    paraEmpezar:
      "Jesús nunca dio una clase aburrida. Hacía preguntas, contaba historias y llevaba a sus discípulos a practicar lo que aprendían.",
    bloques: [
      { t: "versiculo", ref: "Mateo 16:15" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñaba con preguntas: «Y vosotros, ¿quién decís que soy yo?». Una buena pregunta hace pensar y obliga a cada uno a responder por sí mismo.",
      },
      { t: "versiculo", ref: "Mateo 13:34" },
      {
        t: "parrafo",
        texto:
          "También enseñaba con historias: «Todo esto habló Jesús por parábolas a la gente, y sin parábolas no les hablaba». Una historia se recuerda mejor que una lista de ideas.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", titulo: "Parábolas de Jesús", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Otros métodos de Jesús" },
      {
        t: "lista",
        items: [
          "Objetos de la vida diaria: las aves, los lirios, una moneda, una semilla (Mateo 6:26-28).",
          "El ejemplo: lavó los pies de sus discípulos para enseñarles a servir (Juan 13:14-15).",
          "La práctica: envió a los setenta de dos en dos y después escuchó lo que habían vivido (Lucas 10:1, 17).",
          "La conversación personal: con Nicodemo de noche y con la samaritana junto al pozo (Juan 3 y 4).",
        ],
      },
      { t: "subtitulo", texto: "Métodos para hoy" },
      {
        t: "lista",
        items: [
          "La pregunta y la conversación en grupos pequeños.",
          "El estudio de casos: una situación real que se resuelve con la Biblia.",
          "La demostración y la práctica: enseñar a orar orando y a evangelizar evangelizando.",
          "Los recursos visuales: mapas, líneas de tiempo, videos y esquemas.",
          "La exposición breve, para presentar lo que el alumno no puede descubrir solo.",
        ],
      },
      { t: "versiculo", ref: "Juan 16:12" },
      {
        t: "parrafo",
        texto:
          "Jesús adaptaba su enseñanza a sus oyentes: «Aún tengo muchas cosas que deciros, pero ahora no las podéis sobrellevar». El método se escoge según el objetivo, la edad y el momento del grupo, no por moda.",
      },
      {
        t: "nota",
        titulo: "Enseñar en línea",
        texto:
          "En una clase en línea la atención dura menos: alterna explicaciones cortas con preguntas, llama a cada alumno por su nombre y da tareas que se puedan hacer desde el celular.",
      },
    ],
    ideaClave:
      "Jesús enseñó con preguntas, historias, objetos de la vida diaria, su ejemplo, la práctica y la conversación personal, y adaptó su enseñanza a sus oyentes. Hoy el maestro escoge el método según el objetivo y el grupo, y prefiere los que hacen pensar, participar y practicar al alumno.",
    paraLaVida: {
      texto: "El mejor método es el que lleva al alumno a pensar, a participar y a practicar.",
      pregunta: "¿Qué método de Jesús podrías usar en tu próxima clase?",
    },
  },
  {
    id: "n5-didactica-5",
    objetivos: [
      "Distinguir la evaluación que acompaña el aprendizaje de la que mide el resultado final.",
      "Preparar preguntas y rúbricas que midan los objetivos de la clase.",
      "Dar una corrección oportuna, honesta y con amor.",
    ],
    paraEmpezar: "¿Cómo sabes si tus alumnos aprendieron? Que nadie haga preguntas no significa que todos entendieron.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 27:23" },
      {
        t: "parrafo",
        texto:
          "«Sé diligente en conocer el estado de tus ovejas». El pastor conoce cómo está su rebaño; el maestro también necesita saber cómo van sus alumnos, y para eso evalúa.",
      },
      { t: "subtitulo", texto: "Dos clases de evaluación" },
      {
        t: "lista",
        items: [
          "La evaluación formativa acompaña el aprendizaje: preguntas en clase, repasos y tareas que muestran qué falta cuando todavía hay tiempo de corregir.",
          "La evaluación final mide el resultado: un examen o un trabajo al terminar, con su nota.",
        ],
      },
      { t: "subtitulo", texto: "Evaluar lo que se enseñó" },
      {
        t: "parrafo",
        texto:
          "Cada pregunta debe medir un objetivo de la clase. Por eso la academia usa una tabla de especificaciones: dice qué objetivo mide cada pregunta y con qué nivel de Bloom, para que el examen cubra toda la materia y no solo un tema.",
      },
      {
        t: "lista",
        items: [
          "Preguntas de opción, de verdadero o falso y de relacionar: se corrigen rápido y sirven para recordar y comprender.",
          "Respuestas escritas: muestran si el alumno explica con sus palabras y aplica.",
          "Rúbricas: dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4.",
          "Trabajos prácticos: una clase dada, un estudio preparado, una visita hecha.",
        ],
      },
      { t: "versiculo", ref: "2 Timoteo 4:2" },
      {
        t: "parrafo",
        texto:
          "La corrección forma parte de la enseñanza: Pablo pide redargüir, reprender y exhortar «con toda paciencia y doctrina». Corrige pronto, explica por qué y muestra cómo mejorar.",
      },
      { t: "subtitulo", texto: "Honradez y justicia" },
      { t: "versiculo", ref: "Proverbios 11:1" },
      {
        t: "parrafo",
        texto:
          "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada». La evaluación es justa cuando todos saben de antemano qué se evaluará, cuando las mismas reglas valen para todos y cuando el alumno puede ver su error y pedir revisión. En la academia, el sistema corrige, pero un profesor puede revisar una respuesta y cambiar la nota escribiendo el motivo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "La nota no es la persona",
        texto: "Una nota baja dice qué falta aprender, no cuánto vale el alumno. Evalúa con verdad y anima con amor.",
      },
    ],
    ideaClave:
      "Evaluar es conocer el estado de los alumnos. La evaluación formativa acompaña el aprendizaje y la final mide el resultado; cada pregunta mide un objetivo, y la rúbrica dice de antemano qué se evalúa. La corrección es pronta, explicada, paciente y justa: la nota dice qué falta aprender, no cuánto vale la persona.",
    paraLaVida: {
      texto: "Evaluar bien es una forma de cuidar a tus alumnos.",
      pregunta: "¿Cómo vas a comprobar, en tu próxima clase, que tus alumnos aprendieron lo que te propusiste?",
    },
  },
  {
    id: "n5-didactica-6",
    objetivos: [
      "Describir el acompañamiento que da un maestro según el ejemplo de Pablo.",
      "Aplicar maneras de animar al alumno que se detiene y de atender necesidades distintas.",
      "Explicar el trabajo del profesor y del mentor en la academia.",
    ],
    paraEmpezar:
      "Pablo no solo predicó a Timoteo: lo llevó consigo, lo corrigió, lo animó y le escribió cartas. Así se forma un obrero.",
    bloques: [
      { t: "versiculo", ref: "1 Tesalonicenses 2:7-8" },
      {
        t: "parrafo",
        texto:
          "Pablo recuerda a los tesalonicenses: «fuimos tiernos entre vosotros, como la nodriza que cuida con ternura a sus propios hijos», y añade que les entregó no solo el evangelio, sino su propia vida. El maestro cristiano acompaña a la persona, no solo le pasa información.",
      },
      { t: "versiculo", ref: "Filipenses 4:9" },
      {
        t: "parrafo",
        texto: "«Lo que aprendisteis y recibisteis y oísteis y visteis en mí, esto haced». El alumno aprende de lo que oye y de lo que ve en su maestro.",
      },
      { t: "subtitulo", texto: "Acompañar de cerca" },
      {
        t: "lista",
        items: [
          "Conocer a cada alumno: su nombre, su historia, su ritmo y sus dificultades.",
          "Orar por cada uno.",
          "Escribir al que se detiene: una palabra a tiempo puede evitar que abandone.",
          "Atender necesidades distintas: más tiempo para quien lo necesita, otra manera de explicar, paciencia con el que empieza.",
          "Celebrar los avances, aunque sean pequeños.",
        ],
      },
      { t: "subtitulo", texto: "Profesores y mentores en la academia" },
      {
        t: "parrafo",
        texto:
          "En la academia, el profesor revisa las respuestas escritas que el sistema marca para revisar, atiende las apelaciones y puede dar clases en vivo. El mentor acompaña a las personas que se le asignan: en la página Mis acompañados ve su avance, sin sus notas ni sus datos de contacto, y quién lleva siete días o más sin estudiar. Los dos sirven bajo la Dirección académica.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "«Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros». El fruto del maestro se ve cuando sus alumnos enseñan a otros. Por eso, para terminar el Nivel 5, se pide acompañar a dos personas hasta que terminen el Nivel 1.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Con límites sanos",
        texto:
          "Acompañar no es controlar. Respeta la privacidad del alumno, cuida lo que te confía y, si descubres un peligro o un abuso, sigue las normas de la materia de ética.",
      },
    ],
    ideaClave:
      "El maestro cristiano acompaña a la persona: la conoce, ora por ella, la anima cuando se detiene y atiende sus necesidades, como Pablo con los tesalonicenses y con Timoteo. En la academia, el profesor revisa y enseña, y el mentor acompaña; el fruto se ve cuando los alumnos enseñan también a otros.",
    paraLaVida: {
      texto: "El maestro termina su obra cuando su alumno enseña a otros.",
      pregunta: "¿A quién vas a acompañar de cerca este mes, y qué paso darás esta semana?",
    },
  },
];
