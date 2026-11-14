/**
 * Nivel 1 · Materia 3 — La Biblia, Palabra de Dios (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Datos históricos comprobados en dos fuentes: Henrietta C. Mears, «Lo que nos dice la Biblia»; Henry H. Halley,
 * «Compendio manual de la Biblia»; Josh McDowell, «Nueva evidencia que demanda un veredicto».
 */
import type { LeccionContenido } from "../tipos";

export const N1_BIBLIA: LeccionContenido[] = [
  {
    id: "n1-biblia-1",
    objetivos: [
      "Explicar qué significa que la Biblia es inspirada por Dios.",
      "Describir para qué nos fue dada la Escritura.",
      "Contar en pocas palabras cómo nos llegó la Biblia hasta hoy.",
    ],
    paraEmpezar:
      "La Biblia es el libro más leído, traducido y estudiado de la historia. Pero para el creyente no es solo un libro antiguo: es la Palabra de Dios, la voz con la que Él nos habla hoy.",
    bloques: [
      { t: "subtitulo", texto: "Inspirada por Dios" },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "«Inspirada por Dios» quiere decir, literalmente, que fue exhalada por Dios: salió de su boca. Dios usó a unos cuarenta escritores, a lo largo de unos mil quinientos años, cada uno con su estilo y su cultura, pero el autor de fondo es uno solo. Por eso la Biblia tiene un mensaje unido de principio a fin: Dios salvando a su pueblo por medio de Jesucristo.",
      },
      { t: "versiculo", ref: "2 Pedro 1:20-21" },
      {
        t: "parrafo",
        texto:
          "Pedro explica que los profetas no hablaron por su propia cuenta, sino que fueron inspirados por el Espíritu Santo. Dios guió a los escritores para que escribieran lo que Él quería, sin borrar su personalidad. Por eso la Escritura es verdadera y digna de toda confianza (Salmos 19:7; Juan 17:17).",
      },
      { t: "subtitulo", texto: "Para qué nos fue dada" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que la Escritura es útil para enseñar, para redargüir (mostrar el error), para corregir y para instruir en justicia, a fin de que el creyente esté preparado para toda buena obra. La Biblia nos lleva a la salvación por la fe en Cristo (2 Timoteo 3:15) y nos forma para vivir como Él.",
      },
      { t: "subtitulo", texto: "Cómo nos llegó" },
      {
        t: "parrafo",
        texto:
          "El Antiguo Testamento se escribió sobre todo en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego. Los judíos copiaban las Escrituras con muchísimo cuidado, y la iglesia conservó y copió los escritos de los apóstoles. Hoy se conservan miles de manuscritos antiguos, más que de cualquier otro libro de la antigüedad, que permiten confirmar el texto.",
      },
      {
        t: "parrafo",
        texto:
          "La Reina-Valera es la traducción al español que más se ha usado entre los evangélicos de habla hispana. Casiodoro de Reina publicó su traducción completa en 1569 y Cipriano de Valera la revisó en 1602. La revisión de 1960 es la que usa la academia y la Biblioteca de la web.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=uMOc-YI0iaM", titulo: "¿Qué es la Biblia? ¿Cómo se formó? y, ¿cuál es su propósito?", fuente: "Proyecto Biblia" },
      {
        t: "nota",
        titulo: "La Palabra que permanece",
        texto: "Jesús dijo que el cielo y la tierra pasarán, pero que sus palabras no pasarán (Mateo 24:35). Cuando lees la Biblia, no lees opiniones humanas: escuchas a Dios.",
      },
    ],
    ideaClave: "La Biblia es la Palabra de Dios, inspirada por el Espíritu Santo, verdadera y útil para enseñarnos, corregirnos y prepararnos para toda buena obra.",
    paraLaVida: {
      texto: "Leer la Biblia es escuchar a Dios.",
      pregunta: "¿Qué cambia en tu manera de leer la Biblia saber que es Dios quien te habla?",
    },
  },
  {
    id: "n1-biblia-2",
    objetivos: [
      "Describir las dos partes de la Biblia y cuántos libros tiene cada una.",
      "Nombrar las secciones del Antiguo y del Nuevo Testamento.",
      "Leer y encontrar una cita por libro, capítulo y versículo.",
    ],
    paraEmpezar:
      "Abrir la Biblia por primera vez puede intimidar: sesenta y seis libros, capítulos, versículos… Pero cuando conoces su organización, encontrar un pasaje es tan fácil como buscar una dirección.",
    bloques: [
      { t: "subtitulo", texto: "Dos testamentos, 66 libros" },
      {
        t: "parrafo",
        texto:
          "La Biblia tiene dos grandes partes. El Antiguo Testamento, con 39 libros, cuenta la creación, el pacto de Dios con Israel y las promesas del Mesías. El Nuevo Testamento, con 27 libros, cuenta la vida de Jesús, el nacimiento de la iglesia y la esperanza de su regreso. Testamento quiere decir pacto: Dios hizo un antiguo pacto con Israel y un nuevo pacto en la sangre de Cristo (Lucas 22:20).",
      },
      { t: "versiculo", ref: "Lucas 24:44" },
      {
        t: "parrafo",
        texto: "Jesús mismo dijo que tenía que cumplirse todo lo que estaba escrito de Él en la ley de Moisés, en los profetas y en los salmos. Toda la Biblia apunta a Él.",
      },
      { t: "subtitulo", texto: "Las secciones del Antiguo Testamento" },
      {
        t: "lista",
        items: [
          "El Pentateuco o la Ley (5 libros): de Génesis a Deuteronomio.",
          "Los libros históricos (12): de Josué a Ester.",
          "Los libros poéticos (5): de Job a Cantares.",
          "Los profetas mayores (5): de Isaías a Daniel.",
          "Los profetas menores (12): de Oseas a Malaquías.",
        ],
      },
      { t: "subtitulo", texto: "Las secciones del Nuevo Testamento" },
      {
        t: "lista",
        items: [
          "Los Evangelios (4): Mateo, Marcos, Lucas y Juan.",
          "La historia de la iglesia (1): Hechos de los Apóstoles.",
          "Las cartas de Pablo (13): de Romanos a Filemón.",
          "Las cartas generales (8): de Hebreos a Judas.",
          "La profecía (1): Apocalipsis.",
        ],
      },
      { t: "subtitulo", texto: "Capítulos y versículos" },
      {
        t: "parrafo",
        texto:
          "Los escritores no pusieron números: los capítulos se añadieron en el siglo XIII y los versículos en el siglo XVI, para facilitar la búsqueda. Una cita como Juan 3:16 se lee así: libro de Juan, capítulo 3, versículo 16. Si dice Romanos 12:1-2, son los versículos 1 y 2 del capítulo 12.",
      },
      {
        t: "nota",
        titulo: "Practica",
        texto: "En la Biblioteca de la web puedes elegir el libro y el capítulo. Busca Salmos 23, Juan 14 y Efesios 2, y fíjate en qué parte de la Biblia está cada uno.",
      },
    ],
    ideaClave: "La Biblia tiene 66 libros en dos testamentos, ordenados por secciones, y toda ella apunta a Jesucristo; las citas indican libro, capítulo y versículo.",
    paraLaVida: {
      texto: "Conocer el mapa de la Biblia te ayuda a recorrerla sin perderte.",
      pregunta: "¿Qué libro de la Biblia te gustaría leer primero y por qué?",
    },
  },
  {
    id: "n1-biblia-3",
    objetivos: [
      "Explicar por qué la Palabra es el alimento diario del creyente.",
      "Describir lo que enseñan Salmos 1 y Josué 1:8 sobre meditar en la Palabra.",
      "Armar un plan sencillo para leer la Biblia cada día.",
    ],
    paraEmpezar:
      "Así como el cuerpo necesita comida cada día, el alma necesita la Palabra de Dios. Jesús dijo que no solo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios (Mateo 4:4).",
    bloques: [
      { t: "subtitulo", texto: "El árbol junto al río" },
      { t: "versiculo", ref: "Salmos 1:1-3" },
      {
        t: "parrafo",
        texto:
          "El salmo describe a la persona bienaventurada: no se deja guiar por el consejo de los malos, sino que se deleita en la ley del Señor y medita en ella de día y de noche. El resultado es una vida como un árbol plantado junto a corrientes de aguas: firme, con fruto a su tiempo y con hojas que no se marchitan.",
      },
      { t: "versiculo", ref: "Josué 1:8" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo a Josué que el libro de la ley no debía apartarse de su boca, que debía meditar en él de día y de noche y hacer conforme a todo lo que estaba escrito. Leer la Palabra cada día no es solo informarnos: es alimentarnos y aprender a obedecer.",
      },
      { t: "subtitulo", texto: "Cómo empezar" },
      {
        t: "lista",
        items: [
          "Empieza por un Evangelio, por ejemplo Marcos o Juan: conocerás a Jesús de cerca.",
          "Lee poco, pero cada día: un capítulo o una porción, con calma.",
          "Usa un plan de lectura: en la Biblioteca de la web hay planes que avanzan solos cuando lees.",
          "Antes de leer, pide a Dios que te ayude a entender (Salmos 119:18).",
          "Hazte tres preguntas: ¿qué dice?, ¿qué significa? y ¿qué debo hacer?",
        ],
      },
      { t: "subtitulo", texto: "Cuando no entiendo algo" },
      {
        t: "parrafo",
        texto:
          "Es normal no entenderlo todo al principio. Lee el contexto (los versículos de antes y de después), compáralo con otros pasajes, pregunta a tu mentor o a tu pastor y sigue leyendo: la Biblia se explica con la misma Biblia. Lo que entiendes, ponlo en práctica, y Dios te dará más luz.",
      },
      {
        t: "nota",
        titulo: "Leemos para conocerlo",
        texto:
          "Jesús les dijo a los religiosos de su tiempo que escudriñaban las Escrituras, pero que no querían venir a Él para tener vida (Juan 5:39-40). Leemos la Biblia para encontrarnos con Jesús.",
      },
    ],
    ideaClave: "La Palabra es el alimento diario del creyente: leerla y meditarla cada día, con un plan sencillo, da una vida firme y con fruto.",
    paraLaVida: {
      texto: "La constancia vale más que la cantidad.",
      pregunta: "¿Qué plan vas a seguir esta semana? Escribe qué vas a leer cada día.",
    },
  },
  {
    id: "n1-biblia-4",
    objetivos: [
      "Explicar la diferencia entre oír la Palabra y hacerla (Santiago 1:22-25).",
      "Describir qué es meditar en la Biblia.",
      "Aplicar un versículo a una decisión concreta de la semana.",
    ],
    paraEmpezar:
      "Se puede saber mucho de la Biblia y no cambiar en nada. Santiago advierte sobre eso con una imagen muy sencilla: un espejo.",
    bloques: [
      { t: "subtitulo", texto: "Hacedores de la Palabra" },
      { t: "versiculo", ref: "Santiago 1:22-25" },
      {
        t: "parrafo",
        texto:
          "Quien solo oye la Palabra y no la practica es como quien se mira al espejo, ve que tiene la cara sucia y se va sin lavarse: se engaña a sí mismo. En cambio, quien mira con atención la Palabra y persevera en hacerla será bienaventurado en lo que hace. La meta de leer la Biblia es obedecerla.",
      },
      { t: "subtitulo", texto: "Meditar: pensar una y otra vez en la Palabra" },
      {
        t: "parrafo",
        texto:
          "Meditar en la Biblia no es dejar la mente en blanco: es llenarla con lo que Dios dijo, pensarlo una y otra vez, preguntarse qué significa para mi vida y convertirlo en oración. Un buen hábito es escoger un versículo del día y volver a él varias veces.",
      },
      { t: "versiculo", ref: "Salmos 119:105" },
      {
        t: "parrafo",
        texto:
          "La Palabra es lámpara a nuestros pies y lumbrera a nuestro camino. La lámpara alumbra el paso que tenemos delante; la lumbrera ilumina el camino. Dios guía nuestras decisiones de cada día y la dirección de nuestra vida por medio de su Palabra.",
      },
      { t: "subtitulo", texto: "La casa sobre la roca" },
      { t: "versiculo", ref: "Mateo 7:24-25" },
      {
        t: "parrafo",
        texto:
          "Jesús terminó el Sermón del monte comparando a quien oye sus palabras y las hace con un hombre prudente que edificó su casa sobre la roca. Vinieron lluvias, ríos y vientos, y la casa no cayó. Obedecer la Palabra es el cimiento firme para las tormentas de la vida.",
      },
      {
        t: "nota",
        titulo: "Guarda la Palabra en tu corazón",
        texto: "El salmista guardó la Palabra en su corazón para no pecar contra Dios (Salmos 119:11). Por eso cada materia de la academia tiene un versículo de memoria.",
      },
    ],
    ideaClave: "No basta con oír la Palabra: hay que meditarla y obedecerla; quien la practica edifica sobre la roca y camina con la luz de Dios.",
    paraLaVida: {
      texto: "Un versículo obedecido vale más que muchos capítulos olvidados.",
      pregunta: "Escoge un versículo de esta materia y escribe qué vas a hacer esta semana para obedecerlo.",
    },
  },
];
