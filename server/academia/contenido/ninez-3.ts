/**
 * Especialidad Niñez · Materia 3 — Métodos para enseñar a niños (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia de método, con un ejemplo resuelto paso a paso en cada lección: las siete leyes de la enseñanza de
 * John Milton Gregory, contar historias bíblicas, preguntas, actividades y juegos, una clase de una hora, la disciplina
 * con amor y firmeza, y la vida y la semana del maestro.
 */
import type { LeccionContenido } from "../tipos";

export const NINEZ_3: LeccionContenido[] = [
  {
    id: "ninez-3-1",
    objetivos: [
      "Explicar las siete leyes de la enseñanza de John Milton Gregory.",
      "Relacionarlas con la manera en que Esdras enseñaba la Palabra.",
      "Aplicarlas a una clase de niños.",
    ],
    paraEmpezar:
      "Enseñar no es solo hablar. Un maestro puede decir cosas verdaderas durante una hora sin que nadie aprenda. Hay principios que ayudan a que el niño aprenda de verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "Esdras fue un buen maestro porque «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos». Primero estudió, después vivió lo que estudiaba y después enseñó.",
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Y cuando enseñaban al pueblo, «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura». La meta no era terminar la lectura, sino que todos entendieran.",
      },
      { t: "subtitulo", texto: "Las siete leyes de Gregory" },
      {
        t: "lista",
        items: [
          "La ley del maestro: conoce bien lo que va a enseñar.",
          "La ley del alumno: el alumno aprende cuando presta atención con interés.",
          "La ley del lenguaje: se usan palabras que el alumno entiende.",
          "La ley de la lección: se va de lo conocido a lo desconocido.",
          "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo.",
          "La ley del proceso de aprender: el alumno dice la verdad con sus propias palabras.",
          "La ley del repaso y la aplicación: lo aprendido se repasa y se vive.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "John Milton Gregory publicó estas leyes en 1884, y en español se leen en Las siete leyes de la enseñanza. Sirven para cualquier clase, y mucho más para enseñar la Palabra a los niños.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo pensaba en una cadena: «Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros». El maestro de niños también forma a otros maestros.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las siete leyes en una clase sobre el buen samaritano" },
      {
        t: "lista",
        items: [
          "El maestro: estudia Lucas 10:25-37 durante la semana y ora por la clase.",
          "El alumno: empieza con una pregunta que despierta el interés: ¿alguna vez alguien te ayudó cuando estabas lastimado?",
          "El lenguaje: explica palabras como samaritano o levita.",
          "La lección: parte de algo conocido, un vecino que ayuda, para llegar a lo nuevo: el prójimo es también el que es diferente.",
          "Enseñar: pregunta qué habrían hecho ellos, en lugar de darles la respuesta.",
          "Aprender: cada niño cuenta la historia con sus propias palabras.",
          "Repasar y aplicar: piensan a quién pueden ayudar esta semana.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de cada clase, repasa las siete leyes como una lista: ¿sé bien lo que voy a enseñar? ¿Cómo voy a ganar su atención? ¿Qué palabras tendré que explicar? Diez minutos de esa revisión cambian la clase.",
      },
    ],
    ideaClave:
      "Esdras preparó su corazón para estudiar, vivir y enseñar la Palabra, y los maestros de Israel la leían claramente y ponían el sentido para que todos entendieran. Las siete leyes de Gregory ayudan a enseñar así: el maestro conoce lo que enseña, gana la atención, usa palabras que el alumno entiende, va de lo conocido a lo desconocido, despierta la mente del alumno, le pide que diga la verdad con sus palabras, y repasa y aplica.",
    paraLaVida: {
      texto: "Enseñar no es terminar la lección: es que el niño entienda.",
      pregunta: "¿Cuál de las siete leyes te cuesta más cumplir en tus clases?",
    },
  },
  {
    id: "ninez-3-2",
    objetivos: [
      "Explicar por qué las historias son una forma bíblica de enseñar.",
      "Preparar una historia bíblica con su verdad central y su orden.",
      "Contar una historia con fidelidad al texto y llevarla a Jesús.",
    ],
    paraEmpezar:
      "Los niños pueden olvidar una explicación, pero recuerdan una buena historia por muchos años. Por eso contar bien las historias de la Biblia es una de las tareas más importantes del maestro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=KBE2nLYyCdc", titulo: "Evangelio de Lucas 19 a 23", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Marcos 4:33-34" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñaba con historias: «Con muchas parábolas como estas les hablaba la palabra, conforme a lo que podían oír. Y sin parábolas no les hablaba».",
      },
      { t: "versiculo", ref: "Salmos 78:2-3" },
      {
        t: "parrafo",
        texto:
          "El salmista contaba «cosas escondidas desde tiempos antiguos, Las cuales hemos oído y entendido; Que nuestros padres nos las contaron». La fe de Israel pasaba de generación en generación contando historias.",
      },
      { t: "subtitulo", texto: "Cómo preparar una historia" },
      {
        t: "lista",
        items: [
          "Leer el pasaje varias veces en la Biblia, y no solo en un libro de historias.",
          "Encontrar la verdad central: qué enseña la historia acerca de Dios.",
          "Ordenarla: un comienzo que atrape, un problema, un momento de tensión y un final.",
          "Ensayarla en voz alta, con la mirada en los niños y no en el papel.",
          "Preparar un apoyo visual sencillo: una imagen, un objeto o un mapa.",
        ],
      },
      { t: "versiculo", ref: "Lucas 19:1-10" },
      { t: "subtitulo", texto: "Ejemplo resuelto: contar la historia de Zaqueo" },
      {
        t: "lista",
        items: [
          "Comienzo: ¿alguna vez no pudiste ver algo porque había mucha gente delante? Eso le pasó a un hombre llamado Zaqueo.",
          "Problema: Zaqueo era rico, jefe de los cobradores de impuestos, y era pequeño de estatura; la gente lo despreciaba.",
          "Tensión: se subió a un árbol para ver a Jesús, y Jesús se detuvo, lo miró y lo llamó por su nombre.",
          "Momento más alto: Jesús fue a su casa, y Zaqueo cambió: daría a los pobres y devolvería lo que había quitado.",
          "Final: Jesús vino a buscar y a salvar lo que se había perdido.",
          "Para tu vida: Jesús te conoce por tu nombre y quiere estar contigo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "El final de la historia está en la Biblia: «Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido». La historia lleva a Jesús, y no solo a una lección de buena conducta.",
      },
      {
        t: "nota",
        titulo: "Cuidado",
        texto:
          "No cambies los hechos de la Biblia para hacerla más emocionante, ni conviertas cada historia en una regla moral. Cuéntala con fidelidad y deja que muestre a Dios.",
      },
    ],
    ideaClave:
      "Jesús enseñaba con parábolas, y la fe de Israel pasaba de padres a hijos contando historias. Para contar bien una historia bíblica, el maestro la lee en la Biblia, encuentra su verdad central, la ordena con un comienzo, un problema, una tensión y un final, la ensaya y prepara un apoyo visual. La cuenta con fidelidad, sin cambiar los hechos, y la lleva a Jesús, como la historia de Zaqueo, que termina en el Hijo del Hombre que vino a buscar y a salvar lo perdido.",
    paraLaVida: {
      texto: "Una historia bien contada puede acompañar a un niño toda la vida.",
      pregunta: "¿Qué historia de la Biblia te gustaría aprender a contar mejor?",
    },
  },
  {
    id: "ninez-3-3",
    objetivos: [
      "Usar preguntas de memoria, de comprensión y de aplicación.",
      "Elegir actividades adecuadas para cada edad.",
      "Diseñar un juego de repaso que enseñe y no solo entretenga.",
    ],
    paraEmpezar:
      "Un niño que solo escucha aprende poco; un niño que piensa, responde y hace aprende mucho más. Las preguntas y las actividades convierten la clase en un encuentro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Mateo 16:15-16" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñaba con preguntas: «Y vosotros, ¿quién decís que soy yo?». La pregunta llevó a Pedro a confesar: «Tú eres el Cristo, el Hijo del Dios viviente».",
      },
      { t: "versiculo", ref: "Lucas 10:36-37" },
      {
        t: "parrafo",
        texto:
          "Después de contar la parábola, Jesús preguntó: «¿Quién, pues, de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones?». Y terminó con una tarea: «Ve, y haz tú lo mismo».",
      },
      { t: "subtitulo", texto: "Tres clases de preguntas" },
      {
        t: "lista",
        items: [
          "De memoria: ¿qué pasó?, ¿quién lo hizo? Ayudan a recordar la historia.",
          "De comprensión: ¿por qué lo hizo?, ¿qué nos enseña de Dios? Ayudan a pensar.",
          "De aplicación: ¿qué harías tú?, ¿a quién puedes ayudar? Llevan a la vida.",
        ],
      },
      { t: "versiculo", ref: "Santiago 1:22" },
      {
        t: "parrafo",
        texto:
          "«Pero sed hacedores de la palabra, y no tan solamente oidores». Los niños aprenden haciendo: por eso la clase incluye actividades que ponen en práctica la verdad.",
      },
      { t: "subtitulo", texto: "Actividades según la edad" },
      {
        t: "lista",
        items: [
          "Los más pequeños: canciones con gestos, láminas, títeres y manualidades sencillas.",
          "Los escolares: dramatizaciones, juegos de repaso, mapas y trabajos en grupo.",
          "Los preadolescentes: conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un juego de repaso que enseña" },
      {
        t: "lista",
        items: [
          "Elegir el objetivo: repasar la historia de la semana y su verdad central.",
          "Preparar cinco preguntas: dos de memoria, dos de comprensión y una de aplicación.",
          "Formar equipos pequeños, para que todos participen y nadie quede expuesto.",
          "Celebrar las respuestas y corregir con cariño las que no son correctas.",
          "Terminar con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana?",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El juego es una herramienta, no la meta: si la clase terminó y los niños solo recuerdan quién ganó, el juego no cumplió su tarea.",
      },
    ],
    ideaClave:
      "Jesús enseñaba con preguntas, como cuando preguntó quién decían que era él o quién fue el prójimo, y terminaba con una tarea: Ve, y haz tú lo mismo. El maestro usa preguntas de memoria, de comprensión y de aplicación, y actividades según la edad, porque los niños aprenden haciendo y deben ser hacedores de la palabra. Un buen juego de repaso tiene un objetivo, preguntas variadas, equipos pequeños y termina en la aplicación.",
    paraLaVida: {
      texto: "La mejor pregunta es la que lleva al niño de la historia a su vida.",
      pregunta: "¿Qué pregunta de aplicación harías después de la historia del buen samaritano?",
    },
  },
  {
    id: "ninez-3-4",
    objetivos: [
      "Escribir el objetivo de una clase con lo que el niño sabrá, sentirá y hará.",
      "Organizar las partes de una clase y su tiempo.",
      "Planificar una clase completa de una hora, paso a paso.",
    ],
    paraEmpezar:
      "Una clase improvisada se nota. Una clase planificada con oración deja tiempo para escuchar, para orar y para lo inesperado.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 16:3" },
      {
        t: "parrafo",
        texto:
          "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados». La preparación de una clase empieza en oración.",
      },
      { t: "versiculo", ref: "Colosenses 3:23" },
      {
        t: "parrafo",
        texto:
          "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres». Preparar una clase para niños es servir a Cristo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una clase de una hora" },
      {
        t: "lista",
        items: [
          "Antes: escribir un objetivo con tres partes: qué sabrán, qué sentirán y qué harán.",
          "Bienvenida (5 minutos): recibir a cada niño por su nombre y registrar su llegada.",
          "Alabanza y oración (10 minutos): cantos con gestos y oraciones de los niños.",
          "Historia bíblica (15 minutos): contada con fidelidad y con un apoyo visual.",
          "Actividad (15 minutos): un juego, una manualidad o una dramatización que refuerce la verdad.",
          "Versículo y aplicación (10 minutos): aprender el versículo y pensar qué harán esta semana.",
          "Cierre (5 minutos): oración, una tarea para la casa y entregar a cada niño a quien lo trajo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Con los más pequeños conviene cambiar de actividad más a menudo; con los mayores, la historia y la conversación pueden durar más. El horario es una guía, no una ley.",
      },
      { t: "subtitulo", texto: "Un objetivo bien escrito" },
      {
        t: "lista",
        items: [
          "Saber: que los niños cuenten cómo Jesús llamó a Zaqueo por su nombre.",
          "Sentir: que se sepan amados y buscados por Jesús.",
          "Hacer: que esta semana saluden por su nombre a un compañero que está solo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Prepara la clase durante la semana, no el sábado por la noche, y ten un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que terminó antes de tiempo.",
      },
    ],
    ideaClave:
      "La preparación empieza en oración, y preparar una clase para niños es servir a Cristo de corazón. Una clase se planifica con un objetivo de tres partes, qué sabrán, qué sentirán y qué harán, y con sus partes: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre, entregando a cada niño a quien lo trajo. El horario se adapta a la edad, y se prepara durante la semana con un plan para lo inesperado.",
    paraLaVida: {
      texto: "Una hora bien preparada vale más que tres improvisadas.",
      pregunta: "¿Qué parte de tu clase necesita más preparación?",
    },
  },
  {
    id: "ninez-3-5",
    objetivos: [
      "Explicar la disciplina en la clase como amor y firmeza a la vez.",
      "Prevenir el desorden con reglas claras, rutinas y una clase activa.",
      "Corregir a un niño sin humillarlo y saber qué nunca se hace.",
    ],
    paraEmpezar:
      "Todo maestro ha tenido una clase difícil: un niño que interrumpe, otro que pelea, otro que no quiere estar. La manera de responder puede enseñar tanto como la lección.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 15:1" },
      {
        t: "parrafo",
        texto:
          "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor». Un maestro que grita enciende todavía más el desorden.",
      },
      { t: "versiculo", ref: "Colosenses 3:21" },
      {
        t: "parrafo",
        texto:
          "Pablo advierte a los padres: «no exasperéis a vuestros hijos, para que no se desalienten». El maestro también corrige sin desanimar.",
      },
      { t: "versiculo", ref: "Gálatas 5:22-23" },
      {
        t: "parrafo",
        texto:
          "El maestro necesita el fruto del Espíritu: «amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza». La disciplina empieza en el corazón del maestro.",
      },
      { t: "subtitulo", texto: "Prevenir antes que corregir" },
      {
        t: "lista",
        items: [
          "Pocas reglas, claras y dichas en positivo: escuchamos cuando otro habla, cuidamos los materiales y tratamos a todos con respeto.",
          "Rutinas que se repiten cada semana, para que los niños sepan qué viene.",
          "Una clase bien preparada y activa: el aburrimiento trae desorden.",
          "Atención positiva: notar y nombrar lo que los niños hacen bien.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un niño que interrumpe una y otra vez" },
      {
        t: "lista",
        items: [
          "Acercarse con calma y hablarle en voz baja, sin humillarlo delante de los demás.",
          "Recordarle la regla y darle una opción: puedes escuchar aquí o sentarte junto a mí.",
          "Darle una tarea que lo ayude a participar, como repartir los materiales.",
          "Si sigue, aplicar una consecuencia breve que ya conoce, como esperar un turno del juego.",
          "Al final, hablar con él a solas, pero a la vista de otros adultos, y decirle que lo aprecias.",
          "Si el problema se repite, conversar con sus padres para entender qué le pasa.",
        ],
      },
      {
        t: "nota",
        titulo: "Nunca",
        texto:
          "Nunca uses el castigo físico, los gritos, las burlas ni el encierro. Nunca dejes a un niño fuera de la vista de un adulto como castigo. La firmeza va siempre junto con el respeto y la protección.",
      },
      { t: "versiculo", ref: "1 Corintios 13:4-5" },
      {
        t: "parrafo",
        texto:
          "El amor es la regla de la clase: «El amor es sufrido, es benigno», y «no se irrita, no guarda rencor». La semana siguiente, el niño que se portó mal empieza de nuevo.",
      },
    ],
    ideaClave:
      "La blanda respuesta quita la ira, y el maestro corrige sin desanimar, con el fruto del Espíritu. La disciplina se prepara antes: pocas reglas claras y en positivo, rutinas, una clase activa y atención positiva. Ante un niño que interrumpe, el maestro se acerca con calma, le recuerda la regla con una opción, le da una tarea, aplica una consecuencia breve que ya conoce, habla con él al final y, si hace falta, con sus padres. Nunca usa el castigo físico, los gritos, las burlas ni el encierro, y no guarda rencor.",
    paraLaVida: {
      texto: "La manera de corregir también enseña quién es Dios.",
      pregunta: "¿Qué regla positiva podrías poner en tu clase esta semana?",
    },
  },
  {
    id: "ninez-3-6",
    objetivos: [
      "Explicar por qué la vida del maestro también enseña.",
      "Organizar la preparación semanal del maestro.",
      "Cuidar y formar al equipo de maestros.",
    ],
    paraEmpezar:
      "Los niños se olvidan de muchas lecciones, pero se acuerdan del maestro que los amó, los llamó por su nombre y vivió lo que enseñaba.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 11:1" },
      {
        t: "parrafo",
        texto:
          "Pablo pudo decir: «Sed imitadores de mí, así como yo de Cristo». Los niños aprenden más de lo que ven en su maestro que de lo que escuchan.",
      },
      { t: "versiculo", ref: "Tito 2:7" },
      {
        t: "parrafo",
        texto:
          "Pablo le pide a Tito: «presentándote tú en todo como ejemplo de buenas obras; en la enseñanza mostrando integridad, seriedad». La vida del maestro también enseña.",
      },
      { t: "versiculo", ref: "Hebreos 13:17" },
      {
        t: "parrafo",
        texto:
          "Los que cuidan almas lo hacen «como quienes han de dar cuenta». El maestro de niños cuida a los pequeños delante de Dios, y lo hace con alegría.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la semana del maestro" },
      {
        t: "lista",
        items: [
          "El domingo: anotar cómo salió la clase y orar por cada niño por su nombre.",
          "El lunes o el martes: leer el pasaje de la próxima clase y buscar su verdad central.",
          "A mitad de semana: preparar la historia, la actividad y los materiales.",
          "Durante la semana: llamar o escribir a los padres de un niño que faltó.",
          "Antes de la clase: llegar temprano, preparar el salón y orar con el equipo.",
          "Una vez al mes: reunirse con los demás maestros para aprender y evaluar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuida a tus maestros: que roten y descansen, que no sirvan todos los domingos sin parar y que puedan estar también en el culto de los adultos. Y que cada maestro pase por la selección y la capacitación de protección de menores antes de servir. Un maestro cansado enseña peor.",
      },
    ],
    ideaClave:
      "Los niños aprenden de lo que ven: Pablo pidió que lo imitaran como él imitaba a Cristo, y pidió a Tito ser ejemplo de buenas obras, con integridad y seriedad. El maestro cuida a los niños como quien ha de dar cuenta, y lo hace con alegría. Su semana tiene un ritmo: orar por cada niño, estudiar el pasaje a tiempo, preparar la clase, buscar a los que faltan, llegar temprano y aprender con el equipo. El líder cuida a los maestros para que descansen y sirvan bien.",
    paraLaVida: {
      texto: "Antes de enseñar una lección, el maestro la vive.",
      pregunta: "¿Qué cambio en tu semana te ayudaría a preparar mejor tus clases?",
    },
  },
];
