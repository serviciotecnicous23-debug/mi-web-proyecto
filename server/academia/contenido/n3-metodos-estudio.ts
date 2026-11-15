/**
 * Nivel 3 · Materia 2 — Métodos de estudio bíblico (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Es la práctica de lo que enseña Hermenéutica: el estudio inductivo (observar, interpretar y aplicar), las herramientas
 * (versiones, concordancia, diccionario, Biblia de estudio, atlas y comentarios) y cuatro maneras de estudiar.
 * Los datos de geografía e historia se comprobaron en dos fuentes: la altura de Jerusalén y de Jericó, la Biblia del
 * Oso (Casiodoro de Reina, 1569) y su revisión por Cipriano de Valera (1602).
 */
import type { LeccionContenido } from "../tipos";

export const N3_METODOS_ESTUDIO: LeccionContenido[] = [
  {
    id: "n3-metodos-estudio-1",
    objetivos: [
      "Explicar qué es el estudio inductivo y en qué se diferencia de leer buscando apoyo para lo que ya pensamos.",
      "Nombrar y ordenar los tres pasos del método: observar, interpretar y aplicar.",
      "Preparar un tiempo de estudio con oración, un plan, un lugar y un cuaderno.",
    ],
    paraEmpezar:
      "Un buen detective no decide primero quién es el culpable para después buscar pruebas: mira con cuidado todo lo que hay, se pregunta qué significa y solo entonces llega a una conclusión. Así se estudia la Biblia con el método inductivo.",
    bloques: [
      { t: "versiculo", ref: "Hechos 17:11" },
      {
        t: "parrafo",
        texto:
          "Los de Berea no se conformaron con oír: iban «escudriñando cada día las Escrituras para ver si estas cosas eran así». Escudriñar es examinar con cuidado, como quien busca algo valioso. En Hermenéutica aprendiste los principios para interpretar; en esta materia aprenderás un método para estudiar la Biblia por ti mismo.",
      },
      { t: "subtitulo", texto: "Inductivo y deductivo" },
      {
        t: "parrafo",
        texto:
          "Estudiar de forma inductiva es ir de los detalles del texto a sus conclusiones: dejar que el pasaje diga lo que dice antes de sacar enseñanzas. Lo contrario es partir de una idea y buscar versículos que la apoyen. Eso tiene su lugar cuando se repasa una doctrina ya aprendida, pero si es la única manera de leer, la Biblia termina diciendo siempre lo que ya pensábamos.",
      },
      { t: "subtitulo", texto: "Tres pasos" },
      {
        t: "lista",
        items: [
          "Observar: ¿qué dice el texto? Mirar con atención cada palabra, persona, lugar, orden y detalle.",
          "Interpretar: ¿qué significa? Entender lo que el autor quiso decir a sus primeros lectores.",
          "Aplicar: ¿qué hago con esto? Responder a Dios con fe y obediencia, de manera concreta.",
        ],
      },
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "Esdras muestra el orden correcto: preparó su corazón «para inquirir la ley de Jehová y para cumplirla, y para enseñar». Primero se estudia, después se obedece y al final se enseña. Saltarse un paso trae dos males: el que observa sin aplicar se llena de datos y no cambia; el que aplica sin observar termina obedeciendo lo que el texto no dice.",
      },
      { t: "subtitulo", texto: "Antes de empezar" },
      { t: "versiculo", ref: "Salmos 119:18" },
      {
        t: "parrafo",
        texto:
          "El estudio comienza con oración. El salmista pide: «Abre mis ojos, y miraré las maravillas de tu ley». Dios abre los ojos del corazón, y el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia, un cuaderno y un lápiz. El cuaderno de la academia te sirve para guardar tus observaciones de cada lección.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "parrafo",
        texto:
          "Un consejo de los buenos maestros de estudio bíblico: antes de estudiar un pasaje con detalle, lee el libro completo, de una sentada si puedes. Ver el conjunto evita perderse en los detalles.",
      },
      {
        t: "nota",
        titulo: "Un método, no una receta",
        texto:
          "Los tres pasos no son un rito: son una manera ordenada de escuchar a Dios. Con la práctica se vuelven naturales, y el estudio pasa a ser un encuentro con el Señor por medio de su Palabra.",
      },
    ],
    ideaClave:
      "El estudio inductivo va del texto a sus conclusiones en tres pasos: observar qué dice, interpretar qué significa y aplicar qué pide. Se hace con oración, con un plan y con la actitud de los de Berea, que escudriñaban cada día las Escrituras.",
    paraLaVida: {
      texto: "Escoge un tiempo y un lugar fijos para estudiar la Biblia esta semana, y empieza siempre con la oración del Salmo 119:18.",
      pregunta: "¿Qué día, a qué hora y dónde vas a estudiar, y qué libro de la Biblia vas a leer completo primero?",
    },
  },
  {
    id: "n3-metodos-estudio-2",
    objetivos: [
      "Hacer las preguntas de la observación: quién, qué, cuándo, dónde, por qué y cómo.",
      "Reconocer en un texto las palabras clave y repetidas, los contrastes, las comparaciones y los conectores.",
      "Observar Efesios 2:1-10 y anotar lo que el texto dice antes de interpretarlo.",
    ],
    paraEmpezar:
      "Muchos leen la Biblia como quien pasa en carro frente a un paisaje: ven mucho y no se fijan en nada. Observar es detenerse, bajarse del carro y mirar con calma.",
    bloques: [
      {
        t: "parrafo",
        texto:
          "La observación responde a una sola pregunta: ¿qué dice el texto? Todavía no se pregunta qué significa ni cómo se aplica. Parece el paso más fácil, pero es el que más se salta, y de él depende todo lo demás.",
      },
      { t: "subtitulo", texto: "Las preguntas del observador" },
      {
        t: "lista",
        items: [
          "¿Quién? Las personas que aparecen: quién habla, a quién y de quién.",
          "¿Qué? Lo que pasa, lo que se dice, lo que se manda o se promete.",
          "¿Cuándo? El momento: antes o después de qué, en qué tiempo.",
          "¿Dónde? El lugar: una ciudad, un camino, una casa, una cárcel.",
          "¿Por qué? La razón que da el mismo texto.",
          "¿Cómo? La manera en que algo se hace o sucede.",
        ],
      },
      { t: "subtitulo", texto: "Lo que hay que buscar" },
      {
        t: "lista",
        items: [
          "Palabras clave y repetidas: lo que el autor repite, lo quiere subrayar.",
          "Contrastes: palabras como pero, sino, en cambio.",
          "Comparaciones: como, así como, semejante a.",
          "Conectores: porque (una causa), para que (un propósito), así que o por tanto (una conclusión).",
          "Mandatos, promesas, advertencias y preguntas.",
          "Listas y secuencias: lo que se enumera o sigue un orden.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo: Efesios 2:1-10" },
      { t: "versiculo", ref: "Efesios 2:1-5" },
      {
        t: "parrafo",
        texto:
          "Observa el contraste: primero, «estabais muertos en vuestros delitos y pecados» (2:1), y luego: «Pero Dios, que es rico en misericordia» (2:4). Todo el pasaje gira alrededor de ese pero. Observa también la repetición: la frase por gracia sois salvos aparece dos veces (2:5 y 2:8), y la palabra gracia, tres (2:5, 7 y 8).",
      },
      { t: "versiculo", ref: "Efesios 2:8-10" },
      {
        t: "parrafo",
        texto:
          "En los versículos 8 a 10 aparecen los conectores: «Porque por gracia sois salvos por medio de la fe» da la razón; «no por obras, para que nadie se gloríe» marca un propósito; y el versículo 10 dice para qué fuimos creados en Cristo: «para buenas obras». Sin interpretar todavía, ya se ve la estructura: antes, muertos; pero Dios; salvos por gracia; para buenas obras.",
      },
      { t: "versiculo", ref: "Romanos 12:1" },
      {
        t: "parrafo",
        texto:
          "Los conectores también unen secciones enteras. Romanos 12 empieza con «Así que, hermanos, os ruego por las misericordias de Dios»: ese así que obliga a mirar atrás, a los once capítulos en que Pablo explicó esas misericordias.",
      },
      {
        t: "nota",
        titulo: "Escribe lo que ves",
        texto:
          "Anota tus observaciones en el cuaderno: subraya, encierra las palabras repetidas, dibuja una flecha en cada pero. Quien escribe lo que ve, ve más, y lo que observó hoy le servirá cuando enseñe.",
      },
    ],
    ideaClave:
      "Observar es responder qué dice el texto antes de preguntar qué significa: quién, qué, cuándo, dónde, por qué y cómo, y buscar las palabras repetidas, los contrastes, las comparaciones y los conectores, como el pero de Efesios 2:4.",
    paraLaVida: {
      texto: "Escoge un pasaje corto y anota al menos diez observaciones antes de buscar ninguna explicación.",
      pregunta: "¿Qué descubriste en Efesios 2:1-10 que no habías notado antes?",
    },
  },
  {
    id: "n3-metodos-estudio-3",
    objetivos: [
      "Hacer preguntas de interpretación y resumir la idea central de un pasaje en una frase.",
      "Usar las referencias cruzadas para que la Escritura explique la Escritura.",
      "Formular aplicaciones personales, concretas y medibles con cinco preguntas.",
    ],
    paraEmpezar:
      "Después de observar con cuidado llega la pregunta que todos queremos responder: ¿qué quiere decir esto? Y enseguida, la que Dios espera que respondamos: ¿qué voy a hacer con lo que entendí?",
    bloques: [
      { t: "subtitulo", texto: "Preguntas de interpretación" },
      {
        t: "parrafo",
        texto:
          "Cada observación se convierte en una pregunta: ¿qué significa esta palabra?, ¿por qué el autor lo dice aquí?, ¿qué relación tiene con lo que dijo antes?, ¿qué quería que entendieran sus primeros lectores? Las respuestas se buscan primero en el mismo pasaje y en su contexto, con los principios de la materia Hermenéutica.",
      },
      { t: "subtitulo", texto: "La Escritura con la Escritura" },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "Las referencias cruzadas, que muchas Biblias traen al margen o al pie de la página, llevan a otros pasajes que tratan lo mismo. La gracia de Efesios 2:8 se aclara con Romanos 3:24, donde los creyentes son justificados gratuitamente por su gracia, y con Tito 3:5, que dice que Dios nos salvó no por obras de justicia que hubiéramos hecho, sino por su misericordia. Toda la Escritura es inspirada por Dios y es «útil para enseñar»: por eso se explica a sí misma.",
      },
      { t: "subtitulo", texto: "La idea central en una frase" },
      {
        t: "parrafo",
        texto:
          "Un buen ejercicio es escribir la idea central del pasaje en una sola frase, con tus palabras. Para Efesios 2:1-10 podría ser: Dios, por su gracia, nos dio vida en Cristo cuando estábamos muertos, para que vivamos haciendo las buenas obras que él preparó. Si no puedes resumirlo, todavía no lo entendiste del todo.",
      },
      { t: "subtitulo", texto: "Aplicar: cinco preguntas" },
      {
        t: "lista",
        items: [
          "¿Hay un pecado que debo dejar?",
          "¿Hay una promesa que debo creer?",
          "¿Hay un ejemplo que debo seguir?",
          "¿Hay un mandato que debo obedecer?",
          "¿Qué me enseña sobre Dios, para adorarlo?",
        ],
      },
      { t: "versiculo", ref: "Efesios 2:10" },
      {
        t: "parrafo",
        texto:
          "Una aplicación fiel es personal, concreta y medible. Decir voy a hacer más buenas obras es demasiado general. Efesios 2:10 dice que fuimos «creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas». Una aplicación concreta sería: esta semana voy a visitar a la hermana que está enferma y a llevarle algo de comer.",
      },
      { t: "versiculo", ref: "Santiago 1:22" },
      {
        t: "nota",
        titulo: "La meta no es saber más",
        texto:
          "La meta del estudio no es acumular datos, sino conocer a Dios y obedecerle. Santiago lo dice así: «sed hacedores de la palabra, y no tan solamente oidores».",
      },
    ],
    ideaClave:
      "Para interpretar, las observaciones se convierten en preguntas, se dejan explicar por las referencias cruzadas y se resume la idea central en una frase. Para aplicar, se pregunta por un pecado, una promesa, un ejemplo, un mandato y una verdad sobre Dios, y se decide algo personal, concreto y medible.",
    paraLaVida: {
      texto: "Escribe en una frase la idea central del último pasaje que estudiaste y una aplicación concreta para esta semana.",
      pregunta: "¿Cuál de las cinco preguntas de aplicación te cuesta más responder con honestidad, y por qué?",
    },
  },
  {
    id: "n3-metodos-estudio-4",
    objetivos: [
      "Explicar la diferencia entre una traducción de equivalencia formal y una de equivalencia dinámica, y para qué sirve comparar versiones.",
      "Usar una concordancia para encontrar todos los pasajes donde aparece una palabra.",
      "Consultar un diccionario bíblico y una Biblia de estudio sabiendo que sus notas son ayudas humanas.",
    ],
    paraEmpezar:
      "Un carpintero no trabaja solo con las manos: usa sus herramientas y sabe para qué sirve cada una. El obrero de la Palabra también tiene las suyas.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 25:2" },
      {
        t: "parrafo",
        texto:
          "Dice el proverbio: «Gloria de Dios es encubrir un asunto; pero honra del rey es escudriñarlo». Dios ha puesto tesoros en su Palabra para que los busquemos, y buscarlos con buenas herramientas es una honra.",
      },
      { t: "subtitulo", texto: "Las versiones de la Biblia" },
      {
        t: "parrafo",
        texto:
          "Ninguna traducción es perfecta, pero las buenas son fieles. Unas siguen de cerca las palabras y el orden del original: se llaman de equivalencia formal, como la Reina-Valera 1960, que usa esta academia. Otras traducen el sentido con palabras de hoy: se llaman de equivalencia dinámica, como Dios Habla Hoy. Comparar dos o tres versiones ayuda a ver matices, pero la doctrina se estudia en una traducción fiel y no en una paráfrasis libre.",
      },
      {
        t: "parrafo",
        texto:
          "La Reina-Valera nació de la traducción de Casiodoro de Reina, publicada en 1569 y conocida como la Biblia del Oso por el grabado de su portada. Cipriano de Valera la revisó en 1602. La revisión de 1960 es la más usada en las iglesias evangélicas de habla hispana.",
      },
      { t: "subtitulo", texto: "La concordancia" },
      { t: "versiculo", ref: "Juan 5:39" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Escudriñad las Escrituras». Una concordancia es una lista alfabética de las palabras de la Biblia con todos los versículos donde aparecen. Sirve para encontrar un pasaje del que solo recuerdas una palabra y para estudiar cómo usa la Biblia un término. La de James Strong, que existe en español para la Reina-Valera 1960, además asigna un número a cada palabra hebrea o griega: así, sin saber esos idiomas, se puede ver qué palabra del original hay detrás de la traducción.",
      },
      { t: "subtitulo", texto: "El diccionario bíblico y la Biblia de estudio" },
      {
        t: "parrafo",
        texto:
          "Un diccionario bíblico explica personas, lugares, costumbres, objetos y palabras de la Biblia: qué era un denario, dónde quedaba Corinto, quiénes eran los fariseos. Una Biblia de estudio reúne introducciones a cada libro, notas, mapas y referencias cruzadas. Son ayudas muy valiosas, pero sus notas son palabras humanas: se leen con gratitud y con discernimiento, y nunca reemplazan al texto.",
      },
      { t: "versiculo", ref: "Lucas 1:3" },
      {
        t: "parrafo",
        texto:
          "Lucas mismo trabajó con cuidado: escribió su evangelio «después de haber investigado con diligencia todas las cosas desde su origen». La investigación seria no es enemiga de la fe; es una manera de honrar la verdad.",
      },
      {
        t: "nota",
        titulo: "Las herramientas en línea",
        texto:
          "La Biblioteca de esta web tiene la Biblia completa, y hay aplicaciones con concordancias y diccionarios. Usa las que dicen quién las escribió y de dónde sacan lo que enseñan, y desconfía de las que no lo dicen.",
      },
    ],
    ideaClave:
      "Las herramientas ayudan a escudriñar: versiones fieles para comparar, la concordancia para encontrar y estudiar palabras, el diccionario bíblico para personas, lugares y costumbres, y la Biblia de estudio con sus introducciones y mapas. Todas sirven al texto y ninguna lo reemplaza.",
    paraLaVida: {
      texto: "Busca en una concordancia, o con el buscador de una Biblia digital, todas las veces que aparece una palabra que te interese, y lee cada versículo en su contexto.",
      pregunta: "¿Qué herramienta de estudio te falta, y cómo podrías conseguirla o empezar a usarla esta semana?",
    },
  },
  {
    id: "n3-metodos-estudio-5",
    objetivos: [
      "Usar un atlas bíblico para entender los lugares y las distancias de un relato.",
      "Ubicar un libro en la historia bíblica con una línea de tiempo.",
      "Usar los comentarios bíblicos en el momento correcto y con discernimiento.",
    ],
    paraEmpezar:
      "Es difícil entender un viaje sin un mapa, y una historia sin saber cuándo pasó. La Biblia ocurrió en lugares reales y en tiempos reales, y conocerlos ilumina su mensaje.",
    bloques: [
      { t: "subtitulo", texto: "Los mapas" },
      { t: "versiculo", ref: "Lucas 10:30" },
      {
        t: "parrafo",
        texto:
          "Jesús contó que «Un hombre descendía de Jerusalén a Jericó». Un atlas muestra por qué descendía: Jerusalén está en los montes de Judea, a unos 750 metros sobre el nivel del mar, y Jericó, a más de 250 metros por debajo de ese nivel. El camino, de unos 27 kilómetros, bajaba por el desierto entre barrancos: un lugar ideal para los ladrones. El relato se vuelve más vivo cuando se ve el terreno.",
      },
      { t: "versiculo", ref: "Hechos 13:2-4" },
      {
        t: "parrafo",
        texto:
          "Los viajes de Pablo también se entienden mejor con un mapa. Para el primero, el Espíritu Santo dijo: «Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Salieron de Antioquía de Siria, navegaron a la isla de Chipre y siguieron por el sur de lo que hoy es Turquía (Hechos 13 y 14). Seguir el recorrido en un atlas ayuda a ver el costo y el alcance de la misión.",
      },
      { t: "subtitulo", texto: "La historia" },
      {
        t: "parrafo",
        texto:
          "Una línea de tiempo ubica cada libro en la historia: los patriarcas, el éxodo, los jueces, el reino unido de Saúl, David y Salomón, el reino dividido, el exilio en Babilonia, el regreso, los siglos entre los dos testamentos, el tiempo de Jesús bajo el Imperio romano y la iglesia del primer siglo. Saber, por ejemplo, que Amós profetizó en días de Uzías, rey de Judá, y de Jeroboam, rey de Israel (Amós 1:1), en una época de prosperidad, explica por qué denuncia tanto el lujo y la injusticia.",
      },
      { t: "subtitulo", texto: "Los comentarios" },
      {
        t: "parrafo",
        texto:
          "Un comentario bíblico es el estudio de un maestro sobre un libro, versículo por versículo. Conviene usarlo después de haber observado e interpretado por cuenta propia, no antes, para no repetir lo que otro vio sin haber visto nada uno mismo. Es bueno comparar dos o más, preferir los que explican el texto en su contexto y examinar lo que dicen con la Escritura, como los de Berea.",
      },
      { t: "versiculo", ref: "Hechos 17:11" },
      {
        t: "parrafo",
        texto:
          "Los comentarios son como el consejo de hermanos sabios de muchos siglos. El de Matthew Henry, por ejemplo, ha acompañado a generaciones de predicadores. Pero ningún comentario tiene la autoridad de la Escritura: cuando un comentario y el texto no coinciden, se queda el texto.",
      },
      {
        t: "nota",
        titulo: "El orden de las herramientas",
        texto:
          "Primero la Biblia y la oración; después tus observaciones; luego la concordancia, el diccionario y el atlas; al final, los comentarios. Así las ayudas iluminan tu estudio en lugar de reemplazarlo.",
      },
    ],
    ideaClave:
      "El atlas muestra los lugares y las distancias de los relatos, la línea de tiempo ubica cada libro en la historia, y los comentarios aportan el estudio de otros maestros. Se usan después del estudio propio y siempre se examinan con la Escritura.",
    paraLaVida: {
      texto: "Abre un mapa de los viajes de Pablo y sigue con el dedo el primer viaje mientras lees Hechos 13 y 14.",
      pregunta: "¿Qué relato de la Biblia entenderías mejor si conocieras su lugar o su tiempo?",
    },
  },
  {
    id: "n3-metodos-estudio-6",
    objetivos: [
      "Describir el estudio por libro, por tema, por palabra y biográfico, y cuándo conviene cada uno.",
      "Hacer un estudio biográfico breve de Bernabé con varios pasajes.",
      "Preparar un plan personal de estudio bíblico.",
    ],
    paraEmpezar:
      "Hay muchas maneras de recorrer una ciudad: de punta a punta, por barrios, buscando un solo tipo de lugar o siguiendo los pasos de una persona. Con la Biblia pasa lo mismo, y cada manera muestra algo distinto.",
    bloques: [
      { t: "subtitulo", texto: "Por libro" },
      {
        t: "parrafo",
        texto:
          "Es la manera más completa. Se lee el libro entero varias veces, se anotan su tema, su propósito y su estructura, y se le pone un título a cada capítulo y a cada sección. Después se estudian sus pasajes uno por uno. Así cada parte se ve a la luz del todo.",
      },
      { t: "subtitulo", texto: "Por tema" },
      {
        t: "parrafo",
        texto:
          "Se escoge un tema, como la oración o la generosidad, se buscan con la concordancia los pasajes que lo tratan y se ordena lo que enseñan. El cuidado está en leer cada pasaje en su contexto y no armar una doctrina con frases sueltas: el estudio por tema se apoya en el estudio por libro.",
      },
      { t: "subtitulo", texto: "Por palabra" },
      {
        t: "parrafo",
        texto:
          "Se estudia una palabra importante en todos sus usos. La gracia, por ejemplo, traduce en el Nuevo Testamento la palabra griega charis, que en la concordancia de Strong lleva el número 5485. Ver dónde aparece y qué la rodea muestra la riqueza de su sentido. Recuerda lo que aprendiste en Hermenéutica: una palabra se entiende por su uso en cada frase.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "Biográfico: el ejemplo de Bernabé" },
      { t: "versiculo", ref: "Hechos 4:36-37" },
      { t: "versiculo", ref: "Hechos 11:22-26" },
      {
        t: "parrafo",
        texto:
          "El estudio biográfico sigue a una persona por todos los pasajes donde aparece. Con la concordancia se encuentra a Bernabé. Los apóstoles le pusieron ese sobrenombre, que «traducido es, Hijo de consolación», y él vendió una heredad y puso el precio a los pies de los apóstoles. Cuando los discípulos temían a Saulo, Bernabé lo llevó a los apóstoles (Hechos 9:26-27). En Antioquía animó a los nuevos creyentes, porque «era varón bueno, y lleno del Espíritu Santo y de fe», y fue a Tarso a buscar a Saulo.",
      },
      { t: "versiculo", ref: "2 Timoteo 4:11" },
      {
        t: "parrafo",
        texto:
          "Más tarde, Pablo y Bernabé se separaron porque Bernabé quería llevar otra vez a Juan Marcos, que los había dejado en el primer viaje (Hechos 15:37-39). Bernabé le dio una segunda oportunidad, y años después Pablo escribió de Marcos: «me es útil para el ministerio». Un estudio así deja lecciones para la vida: la generosidad, el valor de recibir a otros y la paciencia con los que fallan.",
      },
      { t: "subtitulo", texto: "Un plan para seguir" },
      { t: "versiculo", ref: "Salmos 1:2" },
      {
        t: "parrafo",
        texto:
          "El bienaventurado del Salmo 1 es aquel que «en su ley medita de día y de noche». El estudio que cambia la vida no es el de un día de entusiasmo, sino el de cada semana: un libro para leer completo, un tiempo fijo, un cuaderno y, de vez en cuando, un estudio por tema, por palabra o por personaje.",
      },
      {
        t: "nota",
        titulo: "Estudia también para enseñar",
        texto:
          "Lo que estudias con cuidado se vuelve material para enseñar a otros. Guarda tus estudios en el cuaderno: en Homilética I aprenderás a convertirlos en una enseñanza.",
      },
    ],
    ideaClave:
      "Hay cuatro maneras de estudiar: por libro, la más completa; por tema, con la concordancia y cuidando el contexto; por palabra, siguiendo sus usos; y biográfica, siguiendo a una persona, como Bernabé. Lo que transforma es un plan constante, como el de quien medita de día y de noche.",
    paraLaVida: {
      texto: "Arma tu plan de estudio para el próximo mes: un libro para leer completo y un estudio por tema, por palabra o por personaje.",
      pregunta: "¿Qué personaje de la Biblia te gustaría estudiar, y qué esperas aprender de su vida?",
    },
  },
];
