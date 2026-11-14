/**
 * Nivel 1 · Materia 2 — La oración: hablar con Dios (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (las comprueba scripts/academia/verificar.ts).
 * Bibliografía: Richard J. Foster, «Celebración de la disciplina»; E. M. Bounds, «El poder a través de la oración».
 */
import type { LeccionContenido } from "../tipos";

export const N1_ORACION: LeccionContenido[] = [
  {
    id: "n1-oracion-1",
    objetivos: [
      "Explicar qué es la oración y por qué el creyente puede acercarse a Dios con confianza.",
      "Reconocer los dos errores que Jesús corrigió en la oración.",
      "Distinguir las formas de oración: adoración, acción de gracias, confesión y petición.",
    ],
    paraEmpezar:
      "Muchos creen que orar es repetir palabras bonitas o que solo los pastores saben hacerlo. En la Biblia, orar es mucho más sencillo y mucho más profundo: es hablar con Dios como un hijo habla con su Padre.",
    bloques: [
      { t: "subtitulo", texto: "Hablar con el Padre" },
      {
        t: "parrafo",
        texto:
          "Orar es conversar con Dios: contarle lo que hay en el corazón, darle gracias, adorarle, pedirle y escucharle. Jesús enseñó a sus discípulos a llamarlo Padre. Gracias a Cristo, el creyente puede acercarse a Dios con confianza y no con miedo (Hebreos 4:16). La oración no es un rito para ganar puntos, sino la vida de una relación.",
      },
      { t: "versiculo", ref: "Mateo 6:5-8" },
      {
        t: "parrafo",
        texto:
          "En estos versículos Jesús corrige dos errores. El primero es orar para que otros nos vean: los hipócritas oraban en las esquinas para ganar fama. El segundo es pensar que Dios nos oye por hablar mucho o repetir lo mismo, como hacían los gentiles. Jesús enseña lo contrario: orar en lo secreto, con sinceridad, y confiar en que el Padre ya sabe lo que necesitamos antes de pedírselo.",
      },
      { t: "subtitulo", texto: "Si Dios ya sabe, ¿para qué orar?" },
      {
        t: "parrafo",
        texto:
          "Dios no necesita que le informemos, pero quiere que vengamos a Él. La oración nos acerca a su voluntad, nos enseña a depender de Él y es el medio que Él mismo dispuso para obrar: Santiago dice que muchas veces no tenemos porque no pedimos (Santiago 4:2). Orar es reconocer que sin Dios no podemos, y que con Él todo cambia.",
      },
      { t: "versiculo", ref: "Filipenses 4:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo nos invita a no vivir ahogados por la ansiedad, sino a presentar todo a Dios en oración, con acción de gracias. Fíjate en la promesa: la paz de Dios guardará nuestro corazón y nuestros pensamientos. La oración no siempre cambia de inmediato la situación, pero siempre nos cambia a nosotros y nos llena de su paz.",
      },
      { t: "subtitulo", texto: "Formas de orar" },
      {
        t: "lista",
        items: [
          "Adoración: decirle a Dios quién es Él (Salmos 95:6).",
          "Acción de gracias: agradecerle lo que ha hecho (1 Tesalonicenses 5:18).",
          "Confesión: reconocer el pecado y recibir su perdón (1 Juan 1:9).",
          "Petición e intercesión: pedir por lo propio y por los demás (1 Timoteo 2:1).",
        ],
      },
      {
        t: "nota",
        titulo: "En el nombre de Jesús",
        texto:
          "Jesús prometió que el Padre nos dará lo que pidamos en su nombre (Juan 16:23-24). Orar en su nombre no es una fórmula para el final, sino acercarnos por lo que Él hizo y pedir lo que está de acuerdo con su voluntad.",
      },
    ],
    ideaClave: "Orar es hablar con Dios como un hijo con su Padre: con sinceridad, en lo secreto y con confianza, presentándole todo con acción de gracias.",
    paraLaVida: {
      texto: "No necesitas palabras especiales para empezar: necesitas un corazón sincero.",
      pregunta: "Escribe una oración corta con tus propias palabras: una gratitud, una petición y algo que le entregas a Dios hoy.",
    },
  },
  {
    id: "n1-oracion-2",
    objetivos: [
      "Explicar por qué el Padre Nuestro es un modelo y no una fórmula.",
      "Describir las partes del Padre Nuestro y lo que enseña cada una.",
      "Usar el Padre Nuestro como guía para orar con tus palabras.",
    ],
    paraEmpezar:
      "Cuando los discípulos vieron orar a Jesús, le pidieron que les enseñara (Lucas 11:1). Él les dio una oración modelo que no es para repetir sin pensar, sino un mapa de cómo orar.",
    bloques: [
      { t: "subtitulo", texto: "Un modelo, no una fórmula" },
      { t: "versiculo", ref: "Mateo 6:9-13" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo «vosotros, pues, oraréis así»: no solo con estas palabras, sino de esta manera. La oración tiene un orden: primero Dios y su reino, y después nuestras necesidades. Recorramos sus partes.",
      },
      { t: "subtitulo", texto: "Primero, Dios" },
      {
        t: "lista",
        items: [
          "Padre nuestro que estás en los cielos: nos acercamos a un Padre que nos ama y que es grande. Decimos nuestro: oramos como familia.",
          "Santificado sea tu nombre: pedimos que Dios sea honrado como santo, empezando por nuestra propia vida.",
          "Venga tu reino: anhelamos que Dios reine en los corazones y en el mundo, y que Cristo vuelva.",
          "Hágase tu voluntad: rendimos nuestros planes a lo que Dios quiere, como lo hizo Jesús en Getsemaní (Mateo 26:39).",
        ],
      },
      { t: "subtitulo", texto: "Después, nuestras necesidades" },
      {
        t: "lista",
        items: [
          "El pan de cada día: confiamos en Dios para lo que necesitamos hoy, sin afanarnos por el mañana.",
          "Perdónanos como perdonamos: pedimos perdón y nos comprometemos a perdonar a otros (Mateo 6:14-15).",
          "No nos metas en tentación, mas líbranos del mal: pedimos fuerzas para no caer y protección contra el maligno.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La oración termina reconociendo que el reino, el poder y la gloria son de Dios para siempre. Así empieza y termina toda oración verdadera: con Dios en el centro.",
      },
      {
        t: "nota",
        titulo: "Úsalo como guía",
        texto:
          "Puedes orar cada parte con tus palabras: adorar al Padre, pedir por su reino en tu familia y tu ciudad, entregarle tus planes, pedir lo que necesitas hoy, perdonar a alguien y pedir fuerzas contra la tentación.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1), con el Sermón del monte", fuente: "Proyecto Biblia", minutos: 8 },
    ],
    ideaClave: "El Padre Nuestro es un modelo: primero buscamos a Dios, su nombre, su reino y su voluntad; después le pedimos el pan, el perdón y la protección.",
    paraLaVida: {
      texto: "Orar con el modelo de Jesús ordena el corazón: pone a Dios primero.",
      pregunta: "¿A quién necesitas perdonar para orar con el corazón limpio? Escríbelo y entrégaselo a Dios.",
    },
  },
  {
    id: "n1-oracion-3",
    objetivos: [
      "Explicar lo que enseña la parábola de la viuda y el juez.",
      "Explicar qué es orar con fe y por qué la fe se apoya en la voluntad de Dios.",
      "Reconocer cómo responde Dios y por qué seguir orando por otros.",
    ],
    paraEmpezar:
      "¿Has orado por algo y parece que no pasa nada? A todos nos ha pasado. Jesús sabía que nos desanimaríamos, y contó una historia para que no dejemos de orar.",
    bloques: [
      { t: "subtitulo", texto: "La viuda que no se rindió" },
      { t: "versiculo", ref: "Lucas 18:1-8" },
      {
        t: "parrafo",
        texto:
          "El propósito está en el primer versículo: orar siempre y no desmayar. El juez de la historia era injusto, pero la viuda insistió hasta que le hizo justicia. Jesús no dice que Dios sea como ese juez; dice todo lo contrario: si hasta un juez injusto responde a quien insiste, ¡cuánto más Dios, que es justo y nos ama, responderá a sus escogidos que claman a Él día y noche!",
      },
      { t: "subtitulo", texto: "Orar con fe" },
      { t: "versiculo", ref: "Marcos 11:22-24" },
      {
        t: "parrafo",
        texto:
          "La fe no es una fuerza que tenemos para obligar a Dios, sino confianza en Él: Jesús dice que tengamos fe en Dios. Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera. Y la fe se apoya en su voluntad: si pedimos conforme a ella, Él nos oye (1 Juan 5:14-15).",
      },
      { t: "subtitulo", texto: "Cuando la respuesta tarda" },
      {
        t: "parrafo",
        texto:
          "Dios responde de distintas maneras: a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor. Pablo pidió tres veces que le quitaran un aguijón en la carne, y Dios le respondió que su gracia le bastaba (2 Corintios 12:7-9). Perseverar no es insistir para cambiar a Dios; es seguir confiando mientras Él obra.",
      },
      {
        t: "nota",
        titulo: "Orar unos por otros",
        texto:
          "Santiago enseña que la oración eficaz del justo puede mucho (Santiago 5:16). Orar por otros —tu familia, tu iglesia, tus autoridades y los que no conocen a Cristo— es parte del llamado de todo creyente (1 Timoteo 2:1-4).",
      },
    ],
    ideaClave: "Jesús nos enseña a orar siempre y no desmayar, con fe en un Dios justo que oye y responde según su voluntad y en su tiempo.",
    paraLaVida: {
      texto: "La perseverancia en la oración es una forma de confiar.",
      pregunta: "Escribe un motivo por el que vas a orar cada día esta semana, sin rendirte.",
    },
  },
  {
    id: "n1-oracion-4",
    objetivos: [
      "Describir el ejemplo de Jesús y de Daniel en la oración diaria.",
      "Organizar un tiempo diario con Dios con un plan sencillo.",
      "Explicar qué es el ayuno bíblico y cómo enseñó Jesús a practicarlo.",
    ],
    paraEmpezar:
      "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su Padre, ¡cuánto más lo necesitamos nosotros! La oración crece cuando se vuelve un hábito diario.",
    bloques: [
      { t: "subtitulo", texto: "El ejemplo de Jesús" },
      { t: "versiculo", ref: "Marcos 1:35" },
      {
        t: "parrafo",
        texto:
          "Después de un día lleno de gente y de milagros, Jesús se levantó muy de mañana, cuando todavía estaba oscuro, y se fue a un lugar desierto a orar. Daniel oraba tres veces al día (Daniel 6:10). El tiempo diario con Dios no es una carga: es el lugar donde recibimos fuerzas para el día.",
      },
      { t: "subtitulo", texto: "Un plan sencillo" },
      {
        t: "lista",
        items: [
          "Escoge un momento y un lugar: muchos prefieren la mañana, antes de que empiecen las ocupaciones.",
          "Empieza con la Palabra: lee un pasaje corto, por ejemplo un capítulo del plan de lectura de la Biblioteca.",
          "Ora con lo que leíste: da gracias, confiesa, pide y escucha.",
          "Anota lo que Dios te habla y por quién oraste.",
          "Sé constante: diez minutos cada día valen más que una hora de vez en cuando.",
        ],
      },
      { t: "subtitulo", texto: "El ayuno bíblico" },
      { t: "versiculo", ref: "Mateo 6:16-18" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo «cuando ayunéis», como algo que sus discípulos harían. Ayunar es dejar de comer por un tiempo para dedicarse a buscar a Dios en oración. No es una dieta ni una manera de presionar a Dios, y no se hace para que otros lo noten: se hace en lo secreto, delante del Padre.",
      },
      {
        t: "parrafo",
        texto:
          "En la Biblia, el pueblo de Dios ayunaba para buscar su dirección (Hechos 13:2-3), en tiempos de gran necesidad (Ester 4:16) y para humillarse delante de Él (Esdras 8:21). Un ayuno puede ser de una comida o de un día. Si tienes un problema de salud, consulta con tu médico y con tu pastor: también se puede apartar otra cosa, como el entretenimiento, para dedicar ese tiempo a Dios.",
      },
      {
        t: "nota",
        titulo: "Más que una costumbre",
        texto: "El hábito ayuda, pero lo que buscamos es a una Persona. En la oración diaria no cumplimos un deber: nos encontramos con nuestro Padre.",
      },
    ],
    ideaClave: "Como Jesús, el creyente busca cada día un tiempo a solas con Dios en la Palabra y la oración, y practica el ayuno en lo secreto para buscarle.",
    paraLaVida: {
      texto: "Un hábito pequeño y diario transforma la vida.",
      pregunta: "¿Qué hora y qué lugar vas a apartar cada día para estar con Dios? Escríbelo como un compromiso.",
    },
  },
];
