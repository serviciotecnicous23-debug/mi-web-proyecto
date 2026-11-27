/**
 * Las prácticas de «Libros poéticos y proféticos» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-poeticos-profeticos.ts), con la guía de docs/academia-practicas.md.
 *
 * Cada actividad pregunta solo lo que la lección afirma, con sus mismas palabras clave. Las maneras de ordenar los
 * sucesos del fin (el milenio y el rapto) quedan para Teología sistemática IV: ninguna actividad pregunta por ellas, ni
 * por lo que falta por cumplirse; de la lectura de los profetas, el tercer paso se practica solo como lo dice la lección
 * (leer con humildad). Lo que la lección atribuye a muchos creyentes (ver en Cantares un reflejo del amor de Cristo por
 * su iglesia) se dice con esa misma atribución, y su primer sentido, el amor de los esposos, es lo que se pregunta.
 * Los escenarios y los casos llevan cada libro al servicio de hoy: acompañar al que sufre, orar con los salmos,
 * aconsejar con Proverbios, enseñar a los profetas y predicar a Cristo sin forzar el texto.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_POETICOS_PROFETICOS: PracticasMateria = {
  materia: "n4-poeticos-profeticos",
  mision: {
    titulo: "Lo que Dios pide: justicia, misericordia y humildad",
    intro: "Tu pastor te pidió que prepares un curso sobre los libros poéticos y proféticos para los líderes de la iglesia. Te van a preguntar cómo se lee la poesía hebrea, qué enseñan Job y Eclesiastés cuando la vida no se entiende, cómo se ora con los Salmos, cómo se vive con la sabiduría de Proverbios, qué celebra Cantares, quiénes eran los profetas y cómo anunciaron al Mesías. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes enseñar a leer la poesía con el corazón y a los profetas en su tiempo y a la luz de Cristo; a orar con los Salmos, a confiar en Dios cuando la vida no se entiende y a vivir lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La poesía y la sabiduría de Israel
    "n4-poeticos-profeticos-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuáles son los libros poéticos de la Biblia?", reverso: "Job, Salmos, Proverbios, Eclesiastés y Cantares.", apoyo: "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares" },
              { frente: "¿Qué enseñan los libros de sabiduría?", reverso: "A vivir bajo la mirada de Dios.", apoyo: "enseñan a vivir bajo la mirada de Dios" },
              { frente: "¿Cuánto del Antiguo Testamento está escrito en poesía?", reverso: "Una parte grande.", apoyo: "Una parte grande del Antiguo Testamento está escrita en poesía" },
              { frente: "¿Cómo se lee la poesía, según la nota de la lección?", reverso: "Despacio, y en voz alta si se puede.", apoyo: "La poesía se lee despacio, en voz alta si se puede" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A qué libros poéticos se les llama también libros de sabiduría?", reverso: "A Job, Proverbios y Eclesiastés.", apoyo: "A Job, Proverbios y Eclesiastés se les llama también libros de sabiduría" },
              { frente: "¿De qué base parten todos los libros poéticos?", reverso: "De que el principio de la sabiduría es el temor de Jehová.", apoyo: "Su base es que el principio de la sabiduría es el temor de Jehová" },
              { frente: "¿Cómo hay que leer la poesía de la Biblia para entenderla?", reverso: "Como poesía: con el corazón y la imaginación, y no como un manual.", apoyo: "Para entenderla hay que leerla como poesía: con el corazón y la imaginación, y no como un manual" },
              { frente: "¿Para qué fueron escritos muchos salmos?", reverso: "Para cantarse.", apoyo: "Muchos salmos fueron escritos para cantarse" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los libros poéticos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares.", verdad: true, explica: "Son cinco libros: Job, Salmos, Proverbios, Eclesiastés y Cantares.", apoyo: "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares" },
              { texto: "Los libros poéticos son solo dos: Salmos y Proverbios.", verdad: false, explica: "Son cinco: Job, Salmos, Proverbios, Eclesiastés y Cantares; y tres de ellos son además libros de sabiduría.", apoyo: "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares; Job, Proverbios y Eclesiastés son además libros de sabiduría" },
              { texto: "Una parte grande del Antiguo Testamento está escrita en poesía.", verdad: true, explica: "Por eso hay que leerla como poesía: con el corazón y la imaginación, y no como un manual.", apoyo: "Una parte grande del Antiguo Testamento está escrita en poesía" },
            ],
          },
          {
            consigna: "Sobre los libros de sabiduría: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "A Job, Proverbios y Eclesiastés se les llama también libros de sabiduría.", verdad: true, explica: "Son libros poéticos y, además, libros de sabiduría: enseñan a vivir bajo la mirada de Dios.", apoyo: "A Job, Proverbios y Eclesiastés se les llama también libros de sabiduría" },
              { texto: "Cada libro poético parte de una base distinta, sin nada en común.", verdad: false, explica: "Todos parten de la misma base: el principio de la sabiduría es el temor de Jehová.", apoyo: "Todos parten de la misma base", ref: "Proverbios 1:7" },
              { texto: "Los libros de sabiduría enseñan a vivir bajo la mirada de Dios.", verdad: true, explica: "Así lo dice la lección de Job, Proverbios y Eclesiastés: enseñan a vivir bajo la mirada de Dios.", apoyo: "enseñan a vivir bajo la mirada de Dios" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada forma del paralelismo con su ejemplo de la lección.",
            pares: [
              ["Repite con otras palabras", "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos"],
              ["Contrasta", "La blanda respuesta quita la ira, mas la palabra áspera hace subir el furor"],
              ["Completa o explica", "Jehová es mi pastor; nada me faltará"],
            ],
            apoyo: "A esto se le llama paralelismo: la segunda línea repite, contrasta o completa a la primera",
            ref: "Salmos 19:1; Proverbios 15:1; Salmos 23:1",
            explica: "En el paralelismo, la segunda línea repite con otras palabras (Salmos 19:1), contrasta (Proverbios 15:1) o completa a la primera (Salmos 23:1).",
          },
          {
            consigna: "Une cada imagen de Dios en la poesía con lo que dice de él.",
            pares: [
              ["Dios es roca", "Dios es firme"],
              ["Dios es pastor", "Dios cuida"],
              ["Dios es escudo", "Dios protege"],
              ["Dios es refugio", "Dios abriga"],
            ],
            apoyo: "No se leen al pie de la letra, sino como figuras que dicen algo verdadero: Dios es firme, cuida, protege y abriga",
            explica: "Las imágenes no se leen al pie de la letra: roca dice que Dios es firme; pastor, que cuida; escudo, que protege; y refugio, que abriga.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo funciona la poesía hebrea.",
            texto: "La poesía hebrea rima [[ideas]]: en el paralelismo, la segunda [[línea]] repite, contrasta o completa a la [[primera]].",
            distractores: ["sonidos", "palabra", "última"],
            errores: {
              sonidos: "La poesía hebrea no rima sonidos: rima ideas.",
              palabra: "En el paralelismo, es la segunda línea la que repite, contrasta o completa a la primera.",
              "última": "La segunda línea repite, contrasta o completa a la primera.",
            },
            apoyo: "A esto se le llama paralelismo: la segunda línea repite, contrasta o completa a la primera",
            explica: "La poesía hebrea no rima sonidos: rima ideas. En el paralelismo, la segunda línea repite, contrasta o completa a la primera.",
          },
          {
            consigna: "Completa cómo habla la poesía de Dios.",
            texto: "La poesía también habla con [[imágenes]]: Dios es roca, pastor, escudo y refugio, y son [[figuras]] que dicen algo [[verdadero]].",
            distractores: ["números", "mentiras", "falso"],
            errores: {
              "números": "La poesía también habla con imágenes: Dios es roca, pastor, escudo y refugio.",
              mentiras: "Las imágenes no se leen al pie de la letra, sino como figuras que dicen algo verdadero.",
              falso: "Las imágenes dicen algo verdadero: Dios es firme, cuida, protege y abriga.",
            },
            apoyo: "La poesía también habla con imágenes: Dios es roca, pastor, escudo y refugio",
            explica: "Las imágenes no se leen al pie de la letra, sino como figuras que dicen algo verdadero: Dios es firme, cuida, protege y abriga.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es el temor de Jehová o es un miedo que aleja de Dios? Lleva cada frase a su grupo.",
            grupos: ["El temor de Jehová", "Un miedo que aleja de Dios"],
            frases: [
              { texto: "Una reverencia que se acerca a Dios", grupo: 0 },
              { texto: "Acercarse a Dios con respeto", grupo: 0 },
              { texto: "Obedecer a Dios con reverencia", grupo: 0 },
              { texto: "Esconderse de Dios por miedo", grupo: 1 },
              { texto: "Alejarse de Dios porque da miedo", grupo: 1 },
            ],
            apoyo: "El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia",
            ref: "Proverbios 1:7",
            explica: "El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia.",
          },
          {
            consigna: "¿Así empieza la sabiduría verdadera o así no empieza? Lleva cada frase a su grupo.",
            grupos: ["Así empieza la sabiduría", "Así no empieza la sabiduría"],
            frases: [
              { texto: "De rodillas, con reverencia ante Dios", grupo: 0 },
              { texto: "Con el temor de Jehová", grupo: 0 },
              { texto: "Con respeto y obediencia a Dios", grupo: 0 },
              { texto: "Con un miedo que aleja de Dios", grupo: 1 },
              { texto: "Lejos de Dios, sin reverencia", grupo: 1 },
            ],
            apoyo: "La sabiduría verdadera empieza de rodillas, con reverencia ante Dios",
            ref: "Proverbios 1:7",
            explica: "El principio de la sabiduría es el temor de Jehová: la sabiduría verdadera empieza de rodillas, con reverencia ante Dios, y no con un miedo que aleja.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: Si la Biblia manda temer a Dios, prefiero quedarme lejos de él.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el temor de Jehová no es un miedo que aleja, sino reverencia que se acerca a él.", bien: true, explica: "Es lo que enseña la lección: el temor de Jehová es una reverencia que se acerca a Dios con respeto y obediencia." },
              { texto: "Que tiene razón: a Dios conviene temerle de lejos, para no ofenderlo nunca.", explica: "El temor de Jehová no es un miedo que aleja: se acerca a Dios con respeto y obediencia." },
              { texto: "Que el temor de Jehová era solo para Israel, y hoy no tiene que ver con la sabiduría.", explica: "La sabiduría verdadera empieza de rodillas, con reverencia ante Dios: el principio de la sabiduría es el temor de Jehová." },
              { texto: "Que no se preocupe: la sabiduría empieza estudiando mucho, y no acercándose a Dios.", explica: "La sabiduría verdadera empieza de rodillas, con reverencia ante Dios." },
            ],
            apoyo: "El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia",
            ref: "Proverbios 1:7",
            explica: "El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia.",
          },
          {
            caso: "Una hermana de tu grupo de estudio bíblico te dice: No entiendo qué quiere decir que el principio de la sabiduría es el temor de Jehová.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que la sabiduría verdadera empieza de rodillas, con reverencia ante Dios.", bien: true, explica: "Es lo que enseña la lección: la sabiduría verdadera empieza de rodillas, con reverencia ante Dios." },
              { texto: "Que la sabiduría empieza cuando uno le tiene miedo a Dios y se aleja de él.", explica: "El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios." },
              { texto: "Que la sabiduría empieza cuando uno sabe mucho, aunque no busque a Dios.", explica: "Todos los libros poéticos parten de la misma base: el principio de la sabiduría es el temor de Jehová." },
              { texto: "Que el temor de Jehová es solo para los que ya conocen toda la Biblia.", explica: "El temor de Jehová es el principio de la sabiduría: con él empieza, no se llega a él al final." },
            ],
            apoyo: "La sabiduría verdadera empieza de rodillas, con reverencia ante Dios",
            ref: "Proverbios 1:7",
            explica: "Todos los libros poéticos parten de esa base: el temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La poesía hebrea no rima sonidos: rima ideas",
            ref: "Salmos 19:1",
            clave: {
              id: "pr-n4-poeticos-profeticos-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el paralelismo de la poesía hebrea, y qué hace en él la segunda línea?",
              ideas: [
                { id: "ideas", peso: 50, texto: "La poesía hebrea no rima sonidos: rima ideas.", formas: ["ideas", "rima* (las|sus) ideas", "no rima* sonidos", "no rima* (palabras|sonido)"] },
                { id: "linea", peso: 50, texto: "La segunda línea repite, contrasta o completa a la primera.", formas: ["segunda linea", "repit*", "contrast*", "completa a la primera", "complementa*", "explica a la primera", "dice lo contrario", "otras palabras"] },
              ],
              errores: [
                { id: "sonidos", texto: "La poesía hebrea no rima sonidos: rima ideas.", formas: ["rima* sonidos", "rima* (los|sus) sonidos", "rima* (las|sus) palabras"], anula: "ideas" },
              ],
              modelo: "El paralelismo es la manera en que rima la poesía hebrea: no rima sonidos, sino ideas. La segunda línea repite, contrasta o completa a la primera, como en Salmos 23:1.",
            },
          },
          {
            apoyo: "No se leen al pie de la letra, sino como figuras que dicen algo verdadero: Dios es firme, cuida, protege y abriga",
            ref: "Salmos 23:1",
            clave: {
              id: "pr-n4-poeticos-profeticos-1-a7-2",
              tipo: "corta",
              pregunta: "La poesía dice que Dios es roca, pastor, escudo y refugio. ¿Cómo se leen esas imágenes?",
              ideas: [
                { id: "figuras", peso: 50, texto: "No se leen al pie de la letra, sino como figuras.", formas: ["figura*", "no al pie de la letra", "no (literal|literalmente|literales)", "simbol*", "comparacion*", "metafora*"] },
                { id: "verdad", peso: 50, texto: "Dicen algo verdadero de Dios: que es firme, cuida, protege y abriga.", formas: ["algo verdadero", "(dicen|dice|ensenan|muestran) (algo|una) verdad*", "firme", "cuida", "protege", "abriga"] },
              ],
              errores: [
                { id: "letra", texto: "Las imágenes no se leen al pie de la letra.", formas: ["se (leen|toman|entienden) al pie de la letra", "(leerlas|tomarlas|entenderlas) al pie de la letra"], anula: "figuras" },
              ],
              modelo: "Esas imágenes no se leen al pie de la letra: son figuras que dicen algo verdadero de Dios. Dios es firme como una roca, cuida como un pastor, protege como un escudo y abriga como un refugio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Job y Eclesiastés: cuando la vida no se entiende
    "n4-poeticos-profeticos-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué perdió Job?", reverso: "Sus bienes, sus hijos y su salud.", apoyo: "Job perdió sus bienes, sus hijos y su salud" },
              { frente: "¿Qué pensaban los amigos de Job sobre el sufrimiento?", reverso: "Que todo sufrimiento es castigo por algún pecado.", apoyo: "Sus amigos pensaban que todo sufrimiento es castigo por algún pecado" },
              { frente: "¿Qué le dio Dios a Job, en lugar de todas las explicaciones?", reverso: "Algo mejor: se le reveló.", apoyo: "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló" },
              { frente: "En Eclesiastés, ¿cómo observa la vida el Predicador?", reverso: "Bajo el sol, sin mirar más allá de este mundo.", apoyo: "El Predicador observa la vida bajo el sol, es decir, sin mirar más allá de este mundo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dijo Job cuando lo perdió todo?", reverso: "«Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito».", apoyo: "«Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito»" },
              { frente: "¿Por qué se enojó Dios con los amigos de Job?", reverso: "Porque no habían hablado de él lo recto.", apoyo: "Al final, Dios se enojó con ellos porque no habían hablado de él lo recto" },
              { frente: "¿Qué respondió Job cuando Dios se le reveló?", reverso: "«De oídas te había oído; Mas ahora mis ojos te ven».", apoyo: "Job respondió: «De oídas te había oído; Mas ahora mis ojos te ven»" },
              { frente: "¿Qué significa la palabra hebrea que se traduce vanidad?", reverso: "Vapor o soplo: algo que no se puede atrapar y que pasa pronto.", apoyo: "La palabra hebrea que se traduce vanidad significa vapor o soplo: algo que no se puede atrapar y que pasa pronto" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que enseña el libro de Job o es el error de sus amigos? Lleva cada frase a su grupo.",
            grupos: ["Lo que enseña el libro de Job", "El error de los amigos de Job"],
            frases: [
              { texto: "No todo dolor es un castigo", grupo: 0 },
              { texto: "Job era justo, aunque sufría", grupo: 0 },
              { texto: "Dios respondió revelándose, no explicándolo todo", grupo: 0 },
              { texto: "Todo sufrimiento es castigo por algún pecado", grupo: 1 },
              { texto: "Si Job sufre, algo malo habrá hecho", grupo: 1 },
              { texto: "Acusar al que sufre de que algo hizo mal", grupo: 1, explica: "Eso hicieron los amigos de Job. La lección pide lo contrario: cuando alguien sufre, no lo acuses de que algo hizo mal." },
            ],
            apoyo: "Sus amigos pensaban que todo sufrimiento es castigo por algún pecado, y lo acusaron",
            ref: "Job 42:7",
            explica: "Los amigos de Job pensaban que todo sufrimiento es castigo por algún pecado, y lo acusaron. Se equivocaban: el libro muestra que Job era justo y que no todo dolor es un castigo.",
          },
          {
            consigna: "¿Lo muestra el libro de Job o lo creían sus amigos? Lleva cada frase a su grupo.",
            grupos: ["Lo muestra el libro de Job", "Lo creían los amigos de Job"],
            frases: [
              { texto: "Job era justo y aun así sufrió", grupo: 0 },
              { texto: "El dolor no siempre viene por un pecado", grupo: 0 },
              { texto: "Dios no le explicó todo, pero se le reveló", grupo: 0 },
              { texto: "El que sufre es porque pecó", grupo: 1 },
              { texto: "Todo dolor es un castigo de Dios", grupo: 1 },
              { texto: "Job sufría por algún pecado suyo", grupo: 1 },
            ],
            apoyo: "el libro muestra que Job era justo y que no todo dolor es un castigo",
            ref: "Job 42:7",
            explica: "Los amigos creían que todo sufrimiento es castigo por algún pecado, pero Dios se enojó con ellos porque no habían hablado de él lo recto: Job era justo, y no todo dolor es un castigo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué quiere decir vanidad en Eclesiastés y cómo mira la vida el Predicador.",
            texto: "Vanidad significa vapor o [[soplo]], y el Predicador observa la vida bajo el [[sol]], es decir, sin mirar más allá de este [[mundo]].",
            distractores: ["premio", "altar", "templo"],
            errores: {
              premio: "Vanidad significa vapor o soplo: algo que no se puede atrapar y que pasa pronto.",
              altar: "El Predicador observa la vida bajo el sol.",
              templo: "Bajo el sol quiere decir sin mirar más allá de este mundo.",
            },
            apoyo: "El Predicador observa la vida bajo el sol, es decir, sin mirar más allá de este mundo",
            ref: "Eclesiastés 1:2-3",
            explica: "La palabra hebrea que se traduce vanidad significa vapor o soplo. El Predicador observa la vida bajo el sol, es decir, sin mirar más allá de este mundo.",
          },
          {
            consigna: "Completa la conclusión de Eclesiastés.",
            texto: "La vida tiene [[sentido]] cuando se vive [[delante]] de Dios, que [[juzgará]] toda obra: esa es la conclusión de Eclesiastés.",
            distractores: ["vanidad", "lejos", "olvidará"],
            errores: {
              vanidad: "Bajo el sol todo es vapor, pero la vida tiene sentido cuando se vive delante de Dios.",
              lejos: "La vida tiene sentido cuando se vive delante de Dios.",
              "olvidará": "Dios juzgará toda obra.",
            },
            apoyo: "La vida tiene sentido cuando se vive delante de Dios, que juzgará toda obra",
            ref: "Eclesiastés 12:13-14",
            explica: "El libro no termina en la desesperanza: «Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre». La vida tiene sentido cuando se vive delante de Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Eclesiastés tiene un error. Tócala.",
            frases: [
              "Vanidad traduce una palabra hebrea que significa vapor o soplo.",
              "Bajo el sol quiere decir sin mirar más allá de este mundo.",
              "Bajo el sol, la riqueza y el placer llenan el corazón.",
              "El libro concluye: Teme a Dios, y guarda sus mandamientos.",
            ],
            malo: 2,
            correccion: "Bajo el sol, el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón.",
            apoyo: "descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón",
            ref: "Eclesiastés 1:2-3",
            explica: "El Predicador observa la vida bajo el sol y descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón.",
          },
          {
            consigna: "Una de estas frases sobre el mensaje de Eclesiastés tiene un error. Tócala.",
            frases: [
              "Eclesiastés muestra que la vida bajo el sol es vapor que no se puede atrapar.",
              "El libro de Eclesiastés termina en la desesperanza.",
              "La vida tiene sentido cuando se vive delante de Dios.",
              "Dios juzgará toda obra.",
            ],
            malo: 1,
            correccion: "El libro no termina en la desesperanza: concluye que la vida tiene sentido cuando se vive delante de Dios.",
            apoyo: "Pero el libro no termina en la desesperanza",
            ref: "Eclesiastés 12:13-14",
            explica: "Eclesiastés no termina en la desesperanza: «Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cuando alguien sufre, no lo acuses de que algo hizo mal",
            ref: "Job 42:7",
            titulo: "Cuando el dolor no se entiende",
            relato: [
              "Rosa es una hermana fiel de tu iglesia. En pocos meses perdió su trabajo y a su madre, y ahora está enferma.",
              "Un hermano le dijo que algo malo habrá hecho, porque Dios la está castigando. Desde entonces casi no viene a los cultos.",
              "Eres pastor asistente y vas a visitarla. Al llegar, ella te pregunta por qué le pasa todo esto, si siempre ha servido a Dios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La escuchas y la acompañas con humildad, sin acusarla de que algo hizo mal.", bien: true, explica: "Es lo que pide la lección: cuando alguien sufre, no lo acuses de que algo hizo mal; Job enseña a acompañar con humildad." },
                  { texto: "Le dices que el hermano tiene razón: todo sufrimiento es castigo por algún pecado.", explica: "Eso pensaban los amigos de Job, y se equivocaban: no todo dolor es un castigo." },
                  { texto: "Le pides que haga una lista de sus pecados, para descubrir cuál trajo el castigo.", explica: "Así acusaron a Job sus amigos. Cuando alguien sufre, no lo acuses de que algo hizo mal." },
                  { texto: "Le pides que deje de preguntar por qué, porque a Dios no se le pregunta nada.", explica: "Job y Eclesiastés no esquivan las preguntas difíciles: se pueden poner en las manos de Dios." },
                ],
                apoyo: "Job enseña a acompañar con humildad y a dejar en manos de Dios lo que no entendemos",
                explica: "Cuando alguien sufre, no lo acuses de que algo hizo mal: Job enseña a acompañar con humildad.",
              },
              {
                tipo: "situacion",
                pregunta: "Rosa te pregunta si su dolor es un castigo de Dios. ¿Qué le enseña el libro de Job?",
                opciones: [
                  { texto: "Que no todo dolor es un castigo: Job era justo, y sus amigos se equivocaron.", bien: true, explica: "El libro muestra que Job era justo y que no todo dolor es un castigo; Dios se enojó con los amigos porque no habían hablado de él lo recto." },
                  { texto: "Que sí es un castigo, porque al final Dios se enojó con Job por todas sus quejas.", explica: "Al final, Dios se enojó con los amigos de Job, porque no habían hablado de él lo recto." },
                  { texto: "Que Dios siempre explica el porqué del dolor a los que tienen suficiente fe.", explica: "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló." },
                  { texto: "Que Job sufrió por un pecado escondido, y que por eso al final lo confesó.", explica: "El libro muestra que Job era justo: su dolor no era castigo por un pecado." },
                ],
                apoyo: "el libro muestra que Job era justo y que no todo dolor es un castigo",
                ref: "Job 42:7",
                explica: "Los amigos de Job pensaban que todo sufrimiento es castigo por algún pecado, pero se equivocaban: no todo dolor es un castigo.",
              },
              {
                tipo: "explica",
                apoyo: "La respuesta al sufrimiento no siempre es entender el porqué, sino conocer y confiar en quien gobierna el mundo",
                ref: "Job 42:5-6",
                clave: {
                  id: "pr-n4-poeticos-profeticos-2-a5-1",
                  tipo: "corta",
                  pregunta: "Rosa te dice: Si al menos Dios me explicara por qué. ¿Qué le respondes con lo que enseña el libro de Job?",
                  ideas: [
                    { id: "revelo", peso: 50, texto: "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló.", formas: ["revel*", "se (le|nos|te) (mostro|manifesto)", "a conocer", "(mostrandose|mostrandole|hablandole)", "ojos te ven", "le hablo", "lo vio"] },
                    { id: "confiar", peso: 50, texto: "La respuesta al sufrimiento no siempre es entender el porqué, sino conocer y confiar en quien gobierna el mundo.", formas: ["confi*", "aunque no * confi*", "aunque no * * confi*", "aunque no * * * confi*", "gobierna el mundo", "quien gobierna", "conocer a dios", "conocerlo", "conocer (al|a) (senor|quien)"] },
                  ],
                  errores: [
                    { id: "explica-todo", texto: "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló.", formas: ["dios (te|le|nos) (explicara|explica|dara) todo", "(te|le) va a explicar todo", "le explico todo", "le dio todas las explicaciones"], anula: "revelo" },
                  ],
                  modelo: "Le diría que a Job Dios no le dio todas las explicaciones, sino algo mejor: se le reveló. Aunque no entendamos el porqué, podemos conocer a Dios y confiar en quien gobierna el mundo.",
                },
              },
            ],
          },
          {
            apoyo: "La vida tiene sentido cuando se vive delante de Dios, que juzgará toda obra",
            ref: "Eclesiastés 12:13-14",
            titulo: "Todo pasa",
            relato: [
              "Tomás es un hermano de la célula que tú diriges. Trabajó muy duro, estudió y ganó buen dinero, y le fue bien.",
              "Una noche te dice que tiene todo lo que quería, pero que nada le llena el corazón. Todo pasa pronto, y ya no sabe qué sentido tiene la vida.",
              "Quieres ayudarlo con el libro de Eclesiastés.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestras de Eclesiastés sobre lo que siente?",
                opciones: [
                  { texto: "Que el Predicador también vio que la riqueza y el trabajo no llenan el corazón.", bien: true, explica: "El Predicador observa la vida bajo el sol y descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón." },
                  { texto: "Que Eclesiastés promete que la riqueza llena el corazón de los que trabajan duro.", explica: "Eclesiastés enseña lo contrario: bajo el sol, la riqueza no llena el corazón." },
                  { texto: "Que sentir eso es pecado, y que la Biblia nunca habla de preguntas como esa.", explica: "Job y Eclesiastés no esquivan estas preguntas: ¿qué sentido tiene la vida si todo pasa?" },
                  { texto: "Que trabaje todavía más, hasta que el trabajo por fin le llene el corazón.", explica: "El Predicador descubre que aun el trabajo y la riqueza no llenan el corazón." },
                ],
                apoyo: "descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón",
                explica: "El Predicador observa la vida bajo el sol y descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón.",
              },
              {
                tipo: "situacion",
                pregunta: "Tomás repite que todo pasa pronto. ¿Qué palabra de Eclesiastés describe eso?",
                opciones: [
                  { texto: "Vanidad: una palabra hebrea que significa vapor o soplo, algo que pasa pronto.", bien: true, explica: "«Vanidad de vanidades, todo es vanidad»: vapor o soplo, algo que no se puede atrapar y que pasa pronto." },
                  { texto: "Bendición: todo lo que pasa pronto es la señal de que Dios está contento con él.", explica: "La palabra de Eclesiastés es vanidad: vapor o soplo, algo que no se puede atrapar." },
                  { texto: "Sabiduría: lo que pasa pronto es lo más sabio y valioso que hay bajo el sol.", explica: "Bajo el sol, aun la sabiduría no llena el corazón; lo que pasa pronto es vanidad, vapor o soplo." },
                ],
                apoyo: "La palabra hebrea que se traduce vanidad significa vapor o soplo: algo que no se puede atrapar y que pasa pronto",
                ref: "Eclesiastés 1:2-3",
                explica: "La palabra hebrea que se traduce vanidad significa vapor o soplo: algo que no se puede atrapar y que pasa pronto.",
              },
              {
                tipo: "explica",
                apoyo: "Pero el libro no termina en la desesperanza",
                ref: "Eclesiastés 12:13-14",
                clave: {
                  id: "pr-n4-poeticos-profeticos-2-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dices a Tomás, según la conclusión de Eclesiastés, para que su vida tenga sentido?",
                  ideas: [
                    { id: "teme", peso: 50, texto: "Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre.", formas: ["teme* a dios", "temor de (dios|jehova)", "temer* a dios", "mandamientos", "obedec* a dios", "el todo del hombre"] },
                    { id: "delante", peso: 50, texto: "La vida tiene sentido cuando se vive delante de Dios, que juzgará toda obra.", formas: ["delante de dios", "ante dios", "para dios", "con dios", "juzgara", "juicio", "toda obra", "mas alla de este mundo"] },
                  ],
                  modelo: "Le diría que Eclesiastés no termina en la desesperanza: teme a Dios y guarda sus mandamientos, porque esto es el todo del hombre. La vida tiene sentido cuando se vive delante de Dios, que juzgará toda obra.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "el libro muestra que Job era justo y que no todo dolor es un castigo",
            ref: "Job 42:7",
            clave: {
              id: "pr-n4-poeticos-profeticos-2-a6-1",
              tipo: "corta",
              pregunta: "¿En qué se equivocaron los amigos de Job, y qué muestra el libro sobre el sufrimiento?",
              ideas: [
                { id: "amigos", peso: 50, texto: "Los amigos pensaban que todo sufrimiento es castigo por algún pecado, y acusaron a Job.", formas: ["(pensaban|creian|decian|dijeron|creyeron|pensaron) que (todo|el|su|cada) (sufrimiento|dolor)", "(pensaban|creian|decian|dijeron|creyeron|pensaron) que (job|el) (sufria|era|estaba|habia)", "acusa*", "lo culpa*", "culparon"] },
                { id: "justo", peso: 50, texto: "El libro muestra que Job era justo y que no todo dolor es un castigo.", formas: ["no todo (dolor|sufrimiento)", "no castigo", "sin * castigo", "job era justo", "(era|es|fue) (justo|inocente)", "no (sufria|sufrio) por (su|un|algun) pecado"] },
              ],
              errores: [
                { id: "razon", texto: "Los amigos se equivocaban: Job era justo, y no todo dolor es un castigo.", formas: ["(amigos|ellos) tenian razon", "tenian la razon"], anula: "justo" },
              ],
              modelo: "Los amigos pensaban que todo sufrimiento es castigo por algún pecado, y acusaron a Job. Se equivocaban: el libro muestra que Job era justo y que no todo dolor es un castigo.",
            },
          },
          {
            apoyo: "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló",
            ref: "Job 42:5-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué enseña el libro de Job sobre el sufrimiento del justo, y cómo le respondió Dios a Job?",
              ideas: [
                { id: "justo", peso: 50, texto: "No todo sufrimiento es castigo: Job era justo, y sus amigos se equivocaron.", formas: ["no todo (dolor|sufrimiento)", "no castigo", "sin * castigo", "job era justo", "(era|es|fue) (justo|inocente)", "no (sufria|sufrio) por (su|un|algun) pecado"] },
                { id: "revelo", peso: 50, texto: "Dios respondió revelándose, no explicándolo todo.", formas: ["revel*", "se (le|nos|te) (mostro|manifesto)", "a conocer", "(mostrandose|mostrandole|hablandole)", "ojos te ven", "le hablo", "lo vio"] },
              ],
              modelo: "El libro de Job enseña que no todo sufrimiento es castigo: Job era justo, y sus amigos se equivocaron. Dios le respondió revelándose, no explicándolo todo, y Job dijo: ahora mis ojos te ven.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Los Salmos: el libro de oración de Israel
    "n4-poeticos-profeticos-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántos salmos tiene el libro de los Salmos?", reverso: "Ciento cincuenta.", apoyo: "El libro tiene ciento cincuenta salmos" },
              { frente: "¿En cuántos libros se agrupan los salmos?", reverso: "En cinco libros.", apoyo: "agrupados en cinco libros" },
              { frente: "¿Con qué empieza el libro de los Salmos?", reverso: "Con dos caminos: el del justo y el de los malos.", apoyo: "Empieza con dos caminos" },
              { frente: "¿Con qué termina el libro de los Salmos?", reverso: "Con una explosión de alabanza.", apoyo: "Termina con una explosión de alabanza" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué fueron los Salmos para Israel?", reverso: "Su himnario y su libro de oración.", apoyo: "Los Salmos fueron el himnario y el libro de oración de Israel" },
              { frente: "¿Qué presentan a Dios los salmos de lamento?", reverso: "El dolor, la queja y la petición.", apoyo: "Lamento: presentan a Dios el dolor, la queja y la petición" },
              { frente: "¿Qué enseñan los salmos de sabiduría?", reverso: "A vivir.", apoyo: "Sabiduría: enseñan a vivir (Salmos 1)" },
              { frente: "¿Qué celebran los salmos de alabanza?", reverso: "Quién es Dios y lo que hace.", apoyo: "Alabanza: celebran quién es Dios y lo que hace" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada tipo de salmo con lo que hacen esos salmos.",
            pares: [
              ["Salmos de alabanza", "Celebran quién es Dios y lo que hace"],
              ["Salmos de lamento", "Presentan a Dios el dolor, la queja y la petición"],
              ["Salmos de acción de gracias", "Agradecen una respuesta de Dios"],
              ["Salmos de sabiduría", "Enseñan a vivir"],
              ["Salmos reales y mesiánicos", "Hablan del rey de Israel y apuntan al Mesías"],
            ],
            apoyo: "Lamento: presentan a Dios el dolor, la queja y la petición",
            explica: "Los de alabanza celebran quién es Dios y lo que hace; los de lamento presentan el dolor, la queja y la petición; los de acción de gracias agradecen una respuesta de Dios; los de sabiduría enseñan a vivir; y los reales y mesiánicos apuntan al Mesías.",
          },
          {
            consigna: "Une cada tipo de salmo con su ejemplo en la lección.",
            pares: [
              ["Un salmo de alabanza", "Salmos 100"],
              ["Un salmo de lamento", "Salmos 13"],
              ["Un salmo de acción de gracias", "Salmos 30"],
              ["Un salmo de sabiduría", "Salmos 1"],
              ["Los salmos reales y mesiánicos", "Salmos 2 y 110"],
            ],
            apoyo: "Reales y mesiánicos: hablan del rey de Israel y apuntan al Mesías (Salmos 2 y 110)",
            explica: "Alabanza: Salmos 100; lamento: Salmos 13; acción de gracias: Salmos 30; sabiduría: Salmos 1; reales y mesiánicos: Salmos 2 y 110.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo ora David en el Salmo 13, del principio al final.",
            pasos: ["Empieza con una queja: «¿Hasta cuándo, Jehová?»", "Después le pide ayuda a Dios", "Termina confiando: «Mas yo en tu misericordia he confiado»"],
            apoyo: "En el Salmo 13, David empieza con una queja",
            ref: "Salmos 13:1-6",
            explica: "En el Salmo 13, David empieza con una queja: «¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?». Después pide ayuda, y termina confiando: «Mas yo en tu misericordia he confiado».",
          },
          {
            consigna: "Ordena los pasos de una oración de lamento, como la del Salmo 13, del primero al último.",
            pasos: ["Presentar a Dios el dolor y la queja, con honestidad", "Pedirle ayuda", "Terminar confiando en su misericordia"],
            apoyo: "Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad, y terminar en confianza",
            ref: "Salmos 13:1-6",
            explica: "Los lamentos presentan a Dios el dolor, la queja y la petición, y terminan en confianza, como el Salmo 13.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad, y terminar en confianza",
            ref: "Salmos 13:1-6",
            situacion: "Eres líder de un grupo de oración. Al terminar la reunión, un joven se queda y te cuenta que su padre murió hace un mes. Está dolido y no sabe cómo orar.",
            escenas: [
              {
                id: "e1",
                narra: "El joven te dice: Siento que Dios se olvidó de mí. ¿Puedo decirle eso a Dios?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que sí: los lamentos enseñan a llevarle a Dios lo que sentimos.", valor: 2, explica: "Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad. David oró: «¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?»." },
                  { texto: "Que sí, pero que espere a estar tranquilo, y que no ore con dolor.", valor: 1, explica: "Es bueno que pueda orar, pero no hace falta esperar: los lamentos enseñan a orar en el dolor." },
                  { texto: "Que no: decirle eso a Dios sería una falta de respeto y de fe.", valor: 0, explica: "En el Salmo 13, David empieza con una queja. No hay sentimiento que no puedas llevar a Dios." },
                ],
              },
              {
                id: "e2",
                narra: "Te pide que lo ayudes a orar con el Salmo 13.",
                pregunta: "¿Cómo lo guías?",
                opciones: [
                  { texto: "Que diga su queja, le pida ayuda a Dios y termine confiando, como David.", valor: 2, explica: "Así ora David en el Salmo 13: empieza con una queja, después pide ayuda y termina confiando en la misericordia de Dios." },
                  { texto: "Que lea el salmo en voz alta, aunque no lo convierta en su propia oración.", valor: 1, explica: "Leerlo ayuda, pero la lección pide más: léelo despacio y convierte sus palabras en tu oración." },
                  { texto: "Que se salte la queja del salmo y lea solo el final, que es más alegre.", valor: 0, explica: "El lamento lleva a Dios el dolor, la queja y la petición, y así termina en confianza." },
                ],
              },
              {
                id: "e3",
                narra: "Una semana después, el joven te dice que sigue triste, pero que ya puede orar.",
                pregunta: "¿Qué le animas a hacer?",
                opciones: [
                  { texto: "Que siga orando con los salmos, convirtiendo sus palabras en oración.", valor: 2, explica: "Escoge un salmo y ora con él: así oraron Israel, Jesús y la iglesia durante siglos." },
                  { texto: "Que lea un salmo cada día, aunque sea rápido y sin orar con él.", valor: 1, explica: "Leer los salmos es bueno, pero la lección dice cómo: léelo despacio y convierte sus palabras en tu oración." },
                  { texto: "Que ya deje los salmos de lamento, porque un creyente no debe estar triste.", valor: 0, explica: "En los Salmos hay alabanza, gratitud, lágrimas, preguntas y esperanza: no hay sentimiento que no puedas llevar a Dios." },
                ],
              },
            ],
          },
          {
            apoyo: "No hay sentimiento que no puedas llevar a Dios: los Salmos te enseñan cómo",
            ref: "Salmos 13:1-6",
            situacion: "Eres maestra de jóvenes. Una joven de tu clase te escribe que sus padres se están separando y que ya no sabe qué decirle a Dios.",
            escenas: [
              {
                id: "e1",
                narra: "Ella te dice: Solo me salen quejas. ¿Está mal quejarme con Dios?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que puede llevarle a Dios su queja con honestidad, como David.", valor: 2, explica: "Los lamentos presentan a Dios el dolor, la queja y la petición: David empieza el Salmo 13 con una queja." },
                  { texto: "Que no está mal, y que mejor se lo cuente a una amiga de confianza.", valor: 1, explica: "Contarlo a una amiga puede ayudar, pero los lamentos enseñan a llevar ese dolor a Dios." },
                  { texto: "Que sí está mal: una buena creyente nunca le dice quejas a Dios.", valor: 0, explica: "No hay sentimiento que no puedas llevar a Dios: los Salmos te enseñan cómo." },
                ],
              },
              {
                id: "e2",
                narra: "Te pregunta cómo empezar a orar, si no le salen las palabras.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Que escoja un salmo, lo lea despacio y lo convierta en su oración.", valor: 2, explica: "Escoge un salmo y ora con él: léelo despacio y convierte sus palabras en tu oración." },
                  { texto: "Que lea muchos salmos seguidos, aunque sea rápido, para llenarse de ellos.", valor: 1, explica: "Leer salmos es bueno, pero se leen despacio, para convertir sus palabras en oración." },
                  { texto: "Que no ore hasta que encuentre sus propias palabras, bonitas y bien dichas.", valor: 0, explica: "Los Salmos le dan las palabras: así oraron Israel, Jesús y la iglesia durante siglos." },
                ],
              },
              {
                id: "e3",
                narra: "Después de orar con el Salmo 13, te pregunta por qué David termina tan distinto de como empezó.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que el lamento lleva el dolor a Dios y termina en confianza.", valor: 2, explica: "David empieza con una queja, pide ayuda y termina confiando: «Mas yo en tu misericordia he confiado»." },
                  { texto: "Que David se sintió mejor después de desahogarse, y nada más.", valor: 1, explica: "Desahogarse ayuda, pero el lamento termina en algo más: en confianza en la misericordia de Dios." },
                  { texto: "Que David cambió de tema, porque no quería que Dios lo viera quejarse.", valor: 0, explica: "David no escondió su queja: los lamentos llevan a Dios todo lo que sentimos, con honestidad, y terminan en confianza." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué le dice el Señor a mi Señor en el Salmo 110, que Pedro aplicó a Jesús resucitado? Toca las palabras.",
            texto: "Dijo el Señor a mi Señor: [[Siéntate a mi diestra]]",
            apoyo: "Y Pedro, en Pentecostés, aplicó a Jesús resucitado el Salmo 110",
            ref: "Hechos 2:34-35",
            explica: "Pedro, en Pentecostés, aplicó a Jesús resucitado el Salmo 110: «Dijo el Señor a mi Señor: Siéntate a mi diestra».",
          },
          {
            consigna: "En la cruz, Jesús oró con el Salmo 22. ¿Qué le preguntó a Dios? Toca las palabras de su pregunta.",
            texto: "Dios mío, Dios mío, [[¿por qué me has desamparado?]]",
            apoyo: "En la cruz, Jesús oró con el Salmo 22",
            ref: "Mateo 27:46",
            explica: "En la cruz, Jesús oró con el Salmo 22: «Dios mío, Dios mío, ¿por qué me has desamparado?». Ese salmo describe, siglos antes, las manos y los pies horadados.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los salmos mesiánicos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En la cruz, Jesús oró con el Salmo 22.", verdad: true, explica: "Jesús oró: «Dios mío, Dios mío, ¿por qué me has desamparado?» (Mateo 27:46).", apoyo: "En la cruz, Jesús oró con el Salmo 22", ref: "Mateo 27:46" },
              { texto: "El Salmo 22 se escribió después de la cruz, para contar lo que pasó.", verdad: false, explica: "Ese salmo describe, siglos antes, las manos y los pies horadados y la ropa echada a suertes.", apoyo: "Ese salmo describe, siglos antes, las manos y los pies horadados y la ropa echada a suertes", ref: "Salmos 22:16-18" },
              { texto: "En Pentecostés, Pedro aplicó el Salmo 110 a Jesús resucitado.", verdad: true, explica: "Pedro lo aplicó a Jesús resucitado: «Dijo el Señor a mi Señor: Siéntate a mi diestra».", apoyo: "Y Pedro, en Pentecostés, aplicó a Jesús resucitado el Salmo 110", ref: "Hechos 2:34-35" },
            ],
          },
          {
            consigna: "Sobre los salmos y Cristo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los salmos reales y mesiánicos hablan del rey de Israel y apuntan al Mesías.", verdad: true, explica: "Así son los salmos reales y mesiánicos, como el 2 y el 110.", apoyo: "Reales y mesiánicos: hablan del rey de Israel y apuntan al Mesías" },
              { texto: "Los salmos mesiánicos hablan del rey de Israel, pero nunca del Mesías.", verdad: false, explica: "Hablan del rey de Israel y apuntan al Mesías; los salmos mesiánicos, como el 22 y el 110, se cumplen en Jesús.", apoyo: "Los salmos mesiánicos, como el 22 y el 110, se cumplen en Jesús" },
              { texto: "El Salmo 22 describe las manos y los pies horadados y la ropa echada a suertes.", verdad: true, explica: "Lo describe siglos antes de la cruz (Salmos 22:16-18).", apoyo: "Ese salmo describe, siglos antes, las manos y los pies horadados y la ropa echada a suertes", ref: "Salmos 22:16-18" },
              { texto: "En Pentecostés, Pedro aplicó el Salmo 110 al rey David.", verdad: false, explica: "Pedro aplicó el Salmo 110 a Jesús resucitado.", apoyo: "Y Pedro, en Pentecostés, aplicó a Jesús resucitado el Salmo 110", ref: "Hechos 2:34-35" },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad, y terminar en confianza",
            ref: "Salmos 13:1-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo enseñan los salmos de lamento a orar en el dolor? Usa el ejemplo del Salmo 13.",
              ideas: [
                { id: "queja", peso: 35, texto: "David empieza con una queja: se puede llevar a Dios todo lo que sentimos, con honestidad.", formas: ["queja*", "se queja", "hasta cuando", "honest*", "todo lo que (sentimos|siento|sientes|siente)", "lo que (sentimos|siento|sientes|siente|sienta)", "sinceri*", "(decirle|contarle|llevarle|llevar) a dios"] },
                { id: "ayuda", peso: 30, texto: "Después le pide ayuda a Dios.", formas: ["pide* ayuda", "pid* ayuda", "pedir* ayuda", "peticion", "ruega", "suplica*", "pide (a|le) dios"] },
                { id: "confia", peso: 35, texto: "Y termina confiando en la misericordia de Dios.", formas: ["confi*", "misericordia", "termina* (en|con) (fe|esperanza|paz|alabanza)"] },
              ],
              modelo: "Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad. En el Salmo 13, David empieza con una queja, después pide ayuda y termina confiando en la misericordia de Dios.",
            },
          },
          {
            apoyo: "No hay sentimiento que no puedas llevar a Dios: los Salmos te enseñan cómo",
            ref: "Salmos 13:1-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-3-a7-2",
              tipo: "corta",
              pregunta: "Un amigo te dice que quejarse ante Dios es falta de fe. ¿Qué le enseñarías con los salmos de lamento?",
              ideas: [
                { id: "llevar", peso: 50, texto: "Se puede llevar a Dios todo lo que sentimos, con honestidad: no hay sentimiento que no puedas llevar a Dios.", formas: ["honest*", "todo lo que (sentimos|siento|sientes|siente|sienta|sentia)", "ningun sentimiento", "no hay sentimiento", "(decirle|contarle|llevarle|llevar|presentar|presentarle) a dios", "david se queja", "david se quejo", "empieza con una queja"] },
                { id: "confianza", peso: 50, texto: "Los lamentos terminan en confianza, como el Salmo 13.", formas: ["confi*", "misericordia", "termina* (en|con) (fe|esperanza|paz)"] },
              ],
              modelo: "Le diría que no hay sentimiento que no podamos llevar a Dios: los lamentos enseñan a presentarle el dolor con honestidad. Como David en el Salmo 13, la queja termina en confianza en su misericordia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Proverbios y Cantares: sabiduría para la vida diaria
    "n4-poeticos-profeticos-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la sabiduría bíblica, además de saber mucho?", reverso: "Vivir bien: tomar buenas decisiones en lo de todos los días.", apoyo: "La sabiduría bíblica no es solo saber mucho, sino vivir bien" },
              { frente: "¿Qué dos caminos presenta Proverbios?", reverso: "El de la sabiduría, que lleva a la vida, y el de la necedad, que lleva a la ruina.", apoyo: "Proverbios presenta dos caminos: el de la sabiduría, que lleva a la vida, y el de la necedad, que lleva a la ruina" },
              { frente: "¿Dónde empieza la sabiduría, y dónde se ve?", reverso: "Empieza en el temor de Jehová y se ve en la conducta diaria.", apoyo: "La sabiduría empieza en el temor de Jehová y se ve en la conducta diaria" },
              { frente: "¿Qué son los proverbios?", reverso: "Principios generales de la vida, no promesas automáticas.", apoyo: "Los proverbios son principios generales de la vida" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué enseña Proverbios 22:6 sobre la crianza?", reverso: "Lo que normalmente sucede con una buena crianza.", apoyo: "enseña lo que normalmente sucede con una buena crianza" },
              { frente: "¿Culpa Proverbios 22:6 a los padres fieles cuando un hijo se aparta?", reverso: "No: enseña un principio general, no una promesa automática.", apoyo: "pero no culpa a los padres fieles cuando un hijo se aparta" },
              { frente: "¿Por qué a veces dos proverbios parecen contradecirse?", reverso: "Porque hay que saber cuándo aplicar cada uno.", apoyo: "Por eso a veces dos proverbios parecen contradecirse: hay que saber cuándo aplicar cada uno" },
              { frente: "¿En qué se nota la sabiduría, según la lección?", reverso: "En las decisiones pequeñas de cada día.", apoyo: "La sabiduría se nota en las decisiones pequeñas de cada día" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una madre de tu congregación te dice: Instruí a mi hijo en el camino de Dios y se apartó. ¿Será que Proverbios 22:6 no se cumplió?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que ese proverbio enseña lo que normalmente sucede, y no culpa a los padres fieles.", bien: true, explica: "Es lo que enseña la lección: Proverbios 22:6 enseña lo que normalmente sucede con una buena crianza, pero no culpa a los padres fieles cuando un hijo se aparta." },
              { texto: "Que si su hijo se apartó es porque ella no lo crió bien, porque el proverbio nunca falla.", explica: "Los proverbios son principios generales, no promesas automáticas: este no culpa a los padres fieles cuando un hijo se aparta." },
              { texto: "Que Dios no le cumplió su promesa, y que ya no confíe tanto en los proverbios.", explica: "Los proverbios no son promesas que se cumplen siempre de forma automática: son principios generales de la vida." },
              { texto: "Que ese proverbio ya no es para hoy, porque se escribió para otro tiempo.", explica: "Los proverbios siguen siendo principios generales de la vida: enseñan a vivir bien en lo de todos los días." },
            ],
            apoyo: "enseña lo que normalmente sucede con una buena crianza, pero no culpa a los padres fieles cuando un hijo se aparta",
            ref: "Proverbios 22:6",
            explica: "Los proverbios son principios generales de la vida, no promesas que se cumplen siempre de forma automática.",
          },
          {
            caso: "Un joven de tu clase te dice: Leí dos proverbios seguidos que parecen decir lo contrario. ¿La Biblia se contradice?",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que son principios generales de la vida: hay que saber cuándo aplicar cada uno.", bien: true, explica: "Por eso a veces dos proverbios parecen contradecirse: hay que saber cuándo aplicar cada uno (Proverbios 26:4-5)." },
              { texto: "Que sí se contradicen, y que por eso los proverbios no sirven para la vida diaria.", explica: "No se contradicen: son principios generales de la vida, y hay que saber cuándo aplicar cada uno." },
              { texto: "Que uno de los dos debe de estar mal copiado, y que se quede solo con el primero.", explica: "No hay que descartar ninguno de los dos: hay que saber cuándo aplicar cada uno." },
              { texto: "Que son promesas automáticas, y que los dos se cumplen siempre de la misma forma.", explica: "Los proverbios son principios generales de la vida, no promesas que se cumplen siempre de forma automática." },
            ],
            apoyo: "Por eso a veces dos proverbios parecen contradecirse: hay que saber cuándo aplicar cada uno",
            ref: "Proverbios 26:4-5",
            explica: "Los proverbios son principios generales de la vida, no promesas automáticas: por eso a veces dos parecen contradecirse, y hay que saber cuándo aplicar cada uno.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada área de la vida con lo que enseña Proverbios sobre ella.",
            pares: [
              ["La lengua", "La blanda respuesta quita la ira"],
              ["El trabajo", "El perezoso pasa necesidad y el diligente prospera"],
              ["El dinero", "Mejor es lo poco con el temor de Jehová que el gran tesoro con turbación"],
              ["Las amistades", "El que anda con sabios, sabio será"],
            ],
            apoyo: "Proverbios enseña a vivir con sabiduría desde el temor de Jehová: confiar en él, cuidar la lengua, trabajar con diligencia, usar bien el dinero y escoger buenas amistades",
            ref: "Proverbios 15:1; Proverbios 13:20",
            explica: "La lengua: la blanda respuesta quita la ira; el trabajo: el diligente prospera; el dinero: mejor es lo poco con el temor de Jehová; las amistades: el que anda con sabios, sabio será.",
          },
          {
            consigna: "Une cada situación con el proverbio que le da sabiduría.",
            pares: [
              ["Alguien te contesta con enojo", "La blanda respuesta quita la ira"],
              ["Te da pereza cumplir con tu tarea", "El diligente prospera"],
              ["Un negocio que deja mucho dinero y mucha turbación", "Mejor es lo poco con el temor de Jehová"],
              ["Escoges con quién vas a andar", "El que anda con sabios, sabio será"],
            ],
            apoyo: "La sabiduría se nota en las decisiones pequeñas de cada día",
            ref: "Proverbios 3:5-6",
            explica: "La sabiduría se nota en las decisiones pequeñas: responder con blandura, trabajar con diligencia, preferir lo poco con el temor de Jehová y andar con sabios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Proverbios enseña a vivir con sabiduría desde el temor de Jehová: confiar en él, cuidar la lengua, trabajar con diligencia, usar bien el dinero y escoger buenas amistades",
            ref: "Proverbios 3:5-6",
            titulo: "El primer empleo de Andrés",
            relato: [
              "Andrés tiene diecinueve años y es parte del grupo de jóvenes que tú diriges. Acaba de conseguir su primer empleo en un taller.",
              "Te cuenta que su jefe le grita cuando algo sale mal, que a veces le da pereza terminar sus tareas y que unos compañeros lo invitan a ganar dinero fácil con un negocio turbio.",
              "Te pide consejo, porque quiere vivir con sabiduría delante de Dios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "El jefe le grita a Andrés. ¿Qué le aconsejas, según Proverbios?",
                opciones: [
                  { texto: "Que le responda con calma, porque la blanda respuesta quita la ira.", bien: true, explica: "Proverbios enseña a cuidar la lengua: la blanda respuesta quita la ira." },
                  { texto: "Que le grite también, para que el jefe aprenda a respetarlo de una vez.", explica: "Gritar no es el camino de la sabiduría: la blanda respuesta quita la ira." },
                  { texto: "Que no le conteste nada y se vaya del taller sin dar ninguna explicación.", explica: "La sabiduría se nota en las decisiones pequeñas de cada día, como responder con blandura." },
                ],
                apoyo: "La lengua: la blanda respuesta quita la ira (Proverbios 15:1)",
                explica: "Proverbios enseña a cuidar la lengua: la blanda respuesta quita la ira.",
              },
              {
                tipo: "situacion",
                pregunta: "A veces le da pereza terminar sus tareas. ¿Qué le enseña Proverbios?",
                opciones: [
                  { texto: "Que el perezoso pasa necesidad y el diligente prospera.", bien: true, explica: "Proverbios enseña a trabajar con diligencia: el perezoso pasa necesidad y el diligente prospera." },
                  { texto: "Que trabaje con ganas solo cuando el jefe lo esté mirando.", explica: "La sabiduría se ve en la conducta diaria: el diligente prospera." },
                  { texto: "Que la pereza no importa si en la iglesia sirve con muchas ganas.", explica: "La sabiduría se ve en la conducta diaria, también en el trabajo: el perezoso pasa necesidad." },
                ],
                apoyo: "El trabajo: el perezoso pasa necesidad y el diligente prospera (Proverbios 6:6-11)",
                explica: "Proverbios enseña a trabajar con diligencia: el perezoso pasa necesidad y el diligente prospera.",
              },
              {
                tipo: "situacion",
                pregunta: "Unos compañeros lo invitan a ganar dinero fácil con un negocio turbio. ¿Qué le dices?",
                opciones: [
                  { texto: "Que mejor es lo poco con el temor de Jehová que un gran tesoro con turbación.", bien: true, explica: "Proverbios enseña a usar bien el dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación." },
                  { texto: "Que acepte por esta vez, si después da una buena ofrenda para la obra de la iglesia.", explica: "Una ofrenda no cambia el negocio turbio: mejor es lo poco con el temor de Jehová." },
                  { texto: "Que acepte, porque ganar más dinero siempre es la señal de que Dios lo está bendiciendo.", explica: "Proverbios enseña que mejor es lo poco con el temor de Jehová que el gran tesoro con turbación." },
                ],
                apoyo: "El dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación (Proverbios 15:16)",
                explica: "Proverbios enseña a usar bien el dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación.",
              },
              {
                tipo: "explica",
                apoyo: "Las amistades: el que anda con sabios, sabio será (Proverbios 13:20)",
                ref: "Proverbios 13:20",
                clave: {
                  id: "pr-n4-poeticos-profeticos-4-a4-1",
                  tipo: "corta",
                  pregunta: "Andrés te pregunta por qué importa con quiénes anda en el trabajo. ¿Qué le respondes con Proverbios?",
                  ideas: [
                    { id: "sabios", peso: 50, texto: "El que anda con sabios, sabio será.", formas: ["sabios", "sabio sera", "gente sabia", "personas sabias", "amigos sabios"] },
                    { id: "escoger", peso: 50, texto: "Proverbios enseña a escoger buenas amistades: la sabiduría se nota en las decisiones pequeñas de cada día.", formas: ["buenas amistades", "buenos amigos", "buenas companias", "escog*", "elegi*", "elig*", "decisiones"] },
                  ],
                  modelo: "Porque el que anda con sabios, sabio será. Proverbios enseña a escoger buenas amistades, y la sabiduría se nota en las decisiones pequeñas de cada día, como elegir con quién andar.",
                },
              },
            ],
          },
          {
            apoyo: "La sabiduría bíblica no es solo saber mucho, sino vivir bien: tomar buenas decisiones en lo de todos los días, bajo la mirada de Dios",
            ref: "Proverbios 3:5-6",
            titulo: "El negocio de Elena",
            relato: [
              "Elena es una hermana de tu célula que vende comida en un pequeño negocio. Le va bien, pero tiene mucho trabajo.",
              "Esta semana un cliente la insultó, ella está cansada de madrugar y un conocido le propuso un negocio que deja mucho dinero, pero con mucha turbación.",
              "Te pide que la ayudes a decidir con la sabiduría de Proverbios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "El cliente la insultó. ¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que le conteste con blandura, porque la blanda respuesta quita la ira.", bien: true, explica: "Proverbios enseña a cuidar la lengua: la blanda respuesta quita la ira." },
                  { texto: "Que le conteste igual de fuerte, para que nadie se aproveche de ella.", explica: "Contestar con dureza no quita la ira: la blanda respuesta quita la ira." },
                  { texto: "Que le cobre más la próxima vez, para que aprenda a no insultar a nadie.", explica: "La sabiduría se nota en las decisiones pequeñas de cada día: la blanda respuesta quita la ira." },
                ],
                apoyo: "La lengua: la blanda respuesta quita la ira (Proverbios 15:1)",
                explica: "Proverbios enseña a cuidar la lengua: la blanda respuesta quita la ira.",
              },
              {
                tipo: "situacion",
                pregunta: "Está cansada de madrugar y piensa abrir solo cuando tenga ganas. ¿Qué le recuerdas?",
                opciones: [
                  { texto: "Que el diligente prospera y el perezoso pasa necesidad.", bien: true, explica: "Proverbios enseña a trabajar con diligencia: el perezoso pasa necesidad y el diligente prospera." },
                  { texto: "Que abra solo cuando tenga ganas, porque Dios proveerá igual.", explica: "Proverbios enseña a trabajar con diligencia: el perezoso pasa necesidad." },
                  { texto: "Que el trabajo de cada día no importa, mientras ore por su negocio.", explica: "La sabiduría se ve en la conducta diaria: el diligente prospera." },
                ],
                apoyo: "El trabajo: el perezoso pasa necesidad y el diligente prospera (Proverbios 6:6-11)",
                explica: "Proverbios enseña a trabajar con diligencia: el perezoso pasa necesidad y el diligente prospera.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices del negocio que deja mucho dinero, pero con mucha turbación?",
                opciones: [
                  { texto: "Que mejor es lo poco con el temor de Jehová que el gran tesoro con turbación.", bien: true, explica: "Es lo que enseña Proverbios sobre el dinero (Proverbios 15:16)." },
                  { texto: "Que lo acepte, porque tener más dinero siempre es la señal de la bendición de Dios.", explica: "Proverbios enseña que mejor es lo poco con el temor de Jehová que el gran tesoro con turbación." },
                  { texto: "Que lo acepte sin pensarlo mucho, y que la turbación se le pasará con el tiempo.", explica: "Mejor es lo poco con el temor de Jehová que el gran tesoro con turbación." },
                ],
                apoyo: "El dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación (Proverbios 15:16)",
                explica: "Proverbios enseña a usar bien el dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación.",
              },
              {
                tipo: "explica",
                apoyo: "La sabiduría empieza en el temor de Jehová y se ve en la conducta diaria",
                ref: "Proverbios 3:5-6",
                clave: {
                  id: "pr-n4-poeticos-profeticos-4-a4-2",
                  tipo: "corta",
                  pregunta: "Elena te pregunta cómo la ayuda Proverbios a decidir en las cosas de todos los días. ¿Qué le dices?",
                  ideas: [
                    { id: "vivir", peso: 50, texto: "La sabiduría bíblica no es solo saber mucho, sino vivir bien: tomar buenas decisiones en lo de todos los días.", formas: ["vivir bien", "buenas decisiones", "decidir bien", "decisiones", "conducta diaria", "vivir con sabiduria"] },
                    { id: "fiarse", peso: 50, texto: "Empieza en el temor de Jehová: fiarse de él de todo corazón y no apoyarse en la propia prudencia.", formas: ["temor de (jehova|dios)", "temer a dios", "fia* de (jehova|dios|el)", "confia* en (jehova|dios|el)", "propia prudencia", "todo (tu|su) corazon", "de todo corazon"] },
                  ],
                  modelo: "Le diría que la sabiduría no es solo saber mucho, sino vivir bien: tomar buenas decisiones en lo de todos los días. Y que empiece por el temor de Jehová: fiarse de él de todo corazón, sin apoyarse en su propia prudencia.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que celebra el Cantar de los Cantares.",
            texto: "El Cantar de los Cantares es un [[poema]] de amor entre un esposo y una esposa: celebra la [[belleza]], el deseo y la [[fidelidad]] del amor en el matrimonio.",
            distractores: ["sermón", "tristeza", "traición"],
            errores: {
              "sermón": "El Cantar de los Cantares es un poema de amor entre un esposo y una esposa.",
              tristeza: "Cantares celebra la belleza, el deseo y la fidelidad del amor en el matrimonio.",
              "traición": "Cantares celebra el amor fiel entre esposo y esposa.",
            },
            apoyo: "Celebra la belleza, el deseo y la fidelidad del amor en el matrimonio",
            ref: "Cantares 8:6-7",
            explica: "El Cantar de los Cantares es un poema de amor entre un esposo y una esposa: celebra la belleza, el deseo y la fidelidad del amor en el matrimonio.",
          },
          {
            consigna: "Completa cuál es el primer sentido de Cantares.",
            texto: "Muchos creyentes ven en Cantares un reflejo del amor de Cristo por su iglesia, pero su primer [[sentido]] es el amor de los [[esposos]], que es un [[regalo]] de Dios.",
            distractores: ["error", "ángeles", "castigo"],
            errores: {
              error: "Su primer sentido es el amor de los esposos.",
              "ángeles": "Cantares es un poema de amor entre un esposo y una esposa.",
              castigo: "El amor de los esposos es un regalo de Dios.",
            },
            apoyo: "pero su primer sentido es el amor de los esposos, que es un regalo de Dios",
            ref: "Efesios 5:25",
            explica: "Muchos creyentes han visto en Cantares un reflejo del amor fiel de Dios por su pueblo y de Cristo por su iglesia, pero su primer sentido es el amor de los esposos, que es un regalo de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el mensaje de Cantares: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cantares es un poema de amor entre un esposo y una esposa.", verdad: true, explica: "El Cantar de los Cantares es un poema de amor entre un esposo y una esposa.", apoyo: "El Cantar de los Cantares es un poema de amor entre un esposo y una esposa" },
              { texto: "Cantares enseña que la intimidad se puede despertar en cualquier tiempo y lugar.", verdad: false, explica: "Cantares repite: «Que no despertéis ni hagáis velar al amor, Hasta que quiera». El amor y la intimidad tienen su tiempo y su lugar: el matrimonio.", apoyo: "El amor y la intimidad tienen su tiempo y su lugar: el matrimonio", ref: "Cantares 2:7" },
              { texto: "Cantares celebra la belleza, el deseo y la fidelidad del amor en el matrimonio.", verdad: true, explica: "Así lo dice la lección: «fuerte es como la muerte el amor».", apoyo: "Celebra la belleza, el deseo y la fidelidad del amor en el matrimonio", ref: "Cantares 8:6-7" },
            ],
          },
          {
            consigna: "Sobre Cantares y el amor en el matrimonio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cantares celebra el amor fiel entre esposo y esposa como un regalo de Dios.", verdad: true, explica: "Su primer sentido es el amor de los esposos, que es un regalo de Dios.", apoyo: "Cantares celebra el amor fiel entre esposo y esposa como un regalo de Dios" },
              { texto: "El primer sentido de Cantares es el amor de Cristo por su iglesia.", verdad: false, explica: "Muchos creyentes han visto también en él un reflejo del amor de Cristo por su iglesia, pero su primer sentido es el amor de los esposos.", apoyo: "pero su primer sentido es el amor de los esposos", ref: "Efesios 5:25" },
              { texto: "Cantares dice que el amor es débil y que pasa pronto.", verdad: false, explica: "Cantares dice lo contrario: «fuerte es como la muerte el amor».", apoyo: "Celebra la belleza, el deseo y la fidelidad del amor en el matrimonio: «fuerte es como la muerte el amor»", ref: "Cantares 8:6-7" },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los proverbios son principios generales de la vida, no promesas que se cumplen siempre de forma automática",
            ref: "Proverbios 22:6",
            clave: {
              id: "pr-n4-poeticos-profeticos-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo hay que leer un proverbio como Proverbios 22:6: «Instruye al niño en su camino»? Explícalo.",
              ideas: [
                { id: "principio", peso: 50, texto: "Los proverbios son principios generales de la vida, no promesas que se cumplen siempre de forma automática.", formas: ["principio*", "general*", "no promesa*", "no automatic*", "no siempre se cumple*", "casi siempre", "por lo general"] },
                { id: "padres", peso: 50, texto: "Enseña lo que normalmente sucede con una buena crianza, pero no culpa a los padres fieles cuando un hijo se aparta.", formas: ["no culpa*", "padres fieles", "buena crianza", "normalmente", "lo que (suele|sucede)"] },
              ],
              errores: [
                { id: "promesa", texto: "Los proverbios son principios generales, no promesas automáticas.", formas: ["es una promesa (que|automatica)", "promesa automatica"], anula: "principio" },
              ],
              modelo: "Hay que leerlo como un principio general de la vida, no como una promesa automática. Enseña lo que normalmente sucede con una buena crianza, pero no culpa a los padres fieles cuando un hijo se aparta.",
            },
          },
          {
            apoyo: "La sabiduría empieza en el temor de Jehová y se ve en la conducta diaria",
            ref: "Proverbios 3:5-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-4-a7-2",
              tipo: "corta",
              pregunta: "¿Para qué sirve el libro de Proverbios, y dónde empieza y se nota la sabiduría?",
              ideas: [
                { id: "vivir", peso: 40, texto: "Enseña a vivir bien: tomar buenas decisiones en lo de todos los días, bajo la mirada de Dios.", formas: ["vivir bien", "vivir con sabiduria", "buenas decisiones", "decidir bien", "todos los dias", "cada dia", "vida diaria"] },
                { id: "temor", peso: 30, texto: "La sabiduría empieza en el temor de Jehová.", formas: ["temor de (jehova|dios)", "temer a dios", "teme* a dios", "fia* de (jehova|dios)", "confia* en (jehova|dios)"] },
                { id: "conducta", peso: 30, texto: "Se ve en la conducta diaria, en las decisiones pequeñas de cada día.", formas: ["conducta", "decisiones pequenas", "cosas pequenas", "como (vivimos|actuamos|vivo|actuo)", "lo que hacemos", "manera de vivir"] },
              ],
              modelo: "Proverbios enseña a vivir con sabiduría: tomar buenas decisiones en lo de todos los días. La sabiduría empieza en el temor de Jehová y se nota en la conducta diaria, en las decisiones pequeñas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Los profetas: la voz de Dios a su pueblo
    "n4-poeticos-profeticos-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué eran los profetas, si no eran adivinos del futuro?", reverso: "Mensajeros de Dios que llamaban a su pueblo a volver al pacto.", apoyo: "eran mensajeros de Dios que llamaban a su pueblo a volver al pacto" },
              { frente: "¿Cuántos son los libros proféticos, además de Lamentaciones?", reverso: "Dieciséis.", apoyo: "Los libros proféticos son dieciséis, además de Lamentaciones" },
              { frente: "¿Quiénes son los profetas mayores?", reverso: "Isaías, Jeremías, Ezequiel y Daniel.", apoyo: "los profetas mayores (Isaías, Jeremías, Ezequiel y Daniel)" },
              { frente: "¿Por qué a unos profetas se les llama mayores y a otros menores?", reverso: "Por el tamaño de sus libros, no por su importancia.", apoyo: "Se les llama mayores o menores por el tamaño de sus libros, no por su importancia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué hablaban los profetas, y para qué?", reverso: "Del presente y del futuro, para que el pueblo se volviera a Dios.", apoyo: "Hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios" },
              { frente: "¿Cuántos son los profetas menores, y de quién a quién van?", reverso: "Doce, de Oseas a Malaquías.", apoyo: "los doce menores, de Oseas a Malaquías" },
              { frente: "¿Qué profetas hablaron después del regreso?", reverso: "Hageo, Zacarías y Malaquías.", apoyo: "Después del regreso: Hageo, Zacarías y Malaquías" },
              { frente: "Según Amós 3:7, ¿a quiénes revela Jehová su secreto?", reverso: "A sus siervos los profetas.", apoyo: "sin que revele su secreto a sus siervos los profetas" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es uno de los profetas mayores o de los doce menores? Lleva cada profeta a su grupo.",
            grupos: ["Profetas mayores", "Profetas menores"],
            frases: [
              { texto: "Isaías", grupo: 0 },
              { texto: "Jeremías", grupo: 0 },
              { texto: "Ezequiel", grupo: 0 },
              { texto: "Daniel", grupo: 0 },
              { texto: "Oseas", grupo: 1 },
              { texto: "Amós", grupo: 1 },
              { texto: "Miqueas", grupo: 1 },
              { texto: "Malaquías", grupo: 1 },
            ],
            apoyo: "los profetas mayores (Isaías, Jeremías, Ezequiel y Daniel) y los doce menores, de Oseas a Malaquías",
            explica: "Los mayores son Isaías, Jeremías, Ezequiel y Daniel; los doce menores van de Oseas a Malaquías. Se les llama así por el tamaño de sus libros, no por su importancia.",
          },
          {
            consigna: "¿En qué tiempo habló cada profeta? Lleva cada profeta a su grupo.",
            grupos: ["Frente a Asiria, antes del destierro", "Frente a Babilonia y en el destierro", "Después del regreso"],
            frases: [
              { texto: "Isaías", grupo: 0 },
              { texto: "Amós", grupo: 0 },
              { texto: "Jonás", grupo: 0 },
              { texto: "Jeremías", grupo: 1 },
              { texto: "Ezequiel", grupo: 1 },
              { texto: "Habacuc", grupo: 1 },
              { texto: "Hageo", grupo: 2 },
              { texto: "Zacarías", grupo: 2 },
            ],
            apoyo: "Frente a Babilonia y en el destierro: Jeremías, Ezequiel, Habacuc y Daniel",
            explica: "Frente a Asiria, antes del destierro, hablaron Isaías, Oseas, Amós, Miqueas y Jonás, entre otros; frente a Babilonia y en el destierro, Jeremías, Ezequiel, Habacuc y Daniel; y después del regreso, Hageo, Zacarías y Malaquías.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que anunciaban los profetas.",
            texto: "Los profetas denunciaban la [[idolatría]] y la injusticia, anunciaban juicio y, después, la [[esperanza]] de un nuevo [[pacto]].",
            distractores: ["alabanza", "venganza", "ídolo"],
            errores: {
              alabanza: "Los profetas denunciaban la idolatría y la injusticia.",
              venganza: "Después del juicio, los profetas anunciaban esperanza: Dios restauraría a su pueblo.",
              "ídolo": "Dios haría un nuevo pacto: escribiría su ley en el corazón de su pueblo.",
            },
            apoyo: "denunciaban la idolatría y la injusticia, anunciaban juicio y, después, esperanza y un nuevo pacto",
            ref: "Jeremías 31:31-33",
            explica: "Los profetas denunciaban la idolatría y la injusticia y anunciaban juicio; después del juicio, esperanza: Dios restauraría a su pueblo y haría un nuevo pacto.",
          },
          {
            consigna: "Completa cómo sigue vivo hoy el llamado de los profetas.",
            texto: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los [[ídolos]] y practicar la [[justicia]] con el prójimo, sobre todo con el pobre, la [[viuda]] y el extranjero.",
            distractores: ["amigos", "venganza", "reina"],
            errores: {
              amigos: "El llamado de los profetas es a dejar los ídolos.",
              venganza: "Los profetas llaman a practicar la justicia con el prójimo.",
              reina: "La justicia se practica sobre todo con el pobre, la viuda y el extranjero.",
            },
            apoyo: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero",
            ref: "Amós 5:24",
            explica: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo. Dios sigue pidiendo lo mismo: justicia, misericordia y humildad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué pide Dios, según Miqueas 6:8? Toca las palabras que lo dicen.",
            texto: "solamente [[hacer justicia]], y [[amar misericordia]], y [[humillarte ante tu Dios]]",
            apoyo: "Miqueas resumió lo que Dios pide",
            ref: "Miqueas 6:8",
            explica: "Miqueas resumió lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios». Es el versículo de memoria de esta materia.",
          },
          {
            consigna: "En el nuevo pacto, ¿dónde pondrá Dios su ley? Toca las palabras que lo dicen.",
            texto: "Daré mi ley en su [[mente]], y la escribiré en su [[corazón]]",
            apoyo: "Dios restauraría a su pueblo y haría un nuevo pacto",
            ref: "Jeremías 31:31-33",
            explica: "Después del juicio, los profetas anunciaban esperanza: Dios haría un nuevo pacto. «Daré mi ley en su mente, y la escribiré en su corazón».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para leer bien un texto profético, del primero al último.",
            pasos: ["Qué dijo el profeta a su pueblo, en su tiempo", "Cómo se cumple en Cristo y en su iglesia", "Con humildad, qué falta por cumplirse en la venida de Cristo"],
            apoyo: "Se leen en su tiempo, a la luz de Cristo y con humildad sobre lo que falta por cumplirse",
            explica: "Primero, qué dijo el profeta a su pueblo, en su tiempo; después, cómo se cumple en Cristo y en su iglesia; y, con humildad, qué falta por cumplirse en la venida de Cristo.",
          },
          {
            consigna: "Vas a enseñar un texto de los profetas. Ordena cómo lo lees, del primer paso al último.",
            pasos: ["Ver lo que Dios le dijo a su pueblo por el profeta, en su tiempo", "Leerlo a la luz de Cristo y de su iglesia", "Leer con humildad lo que falta por cumplirse"],
            apoyo: "Primero, qué dijo el profeta a su pueblo, en su tiempo",
            explica: "Los profetas se leen en su tiempo, a la luz de Cristo y con humildad sobre lo que falta por cumplirse.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Primero, qué dijo el profeta a su pueblo, en su tiempo",
            ref: "Jeremías 31:31-33",
            titulo: "Un estudio sobre el nuevo pacto",
            relato: [
              "Eres maestro de la escuela dominical y vas a enseñar Jeremías 31:31-33, donde Dios promete un nuevo pacto.",
              "Un alumno te dice que los profetas eran como adivinos y que solo importa lo que dicen del futuro. Otra alumna piensa que el pasaje no tiene nada que ver con Jesús.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por dónde empiezas tu estudio de Jeremías 31?",
                opciones: [
                  { texto: "Por lo que Jeremías le dijo a su pueblo, en su tiempo, frente a Babilonia.", bien: true, explica: "Es el primer paso para leer a los profetas: qué dijo el profeta a su pueblo, en su tiempo." },
                  { texto: "Por lo que el texto significa para ti, sin mirar a quién le habló Jeremías.", explica: "Primero se lee qué dijo el profeta a su pueblo, en su tiempo; después, cómo se cumple en Cristo y en su iglesia." },
                  { texto: "Por una lista de predicciones, porque los profetas eran adivinos del futuro.", explica: "Los profetas no eran adivinos del futuro: eran mensajeros de Dios que llamaban a su pueblo a volver al pacto." },
                ],
                apoyo: "Primero, qué dijo el profeta a su pueblo, en su tiempo",
                explica: "Primero se lee qué dijo el profeta a su pueblo, en su tiempo: los profetas hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "La alumna pregunta qué tiene que ver el nuevo pacto con Jesús. ¿Qué le muestras?",
                opciones: [
                  { texto: "Que en la última cena Jesús dijo que el nuevo pacto se cumplía en su sangre.", bien: true, explica: "Jesús dijo en la última cena que ese nuevo pacto se cumplía en su sangre (Lucas 22:20)." },
                  { texto: "Que el nuevo pacto no tiene nada que ver con Jesús, ni tampoco con su iglesia.", explica: "El segundo paso es ver cómo se cumple en Cristo y en su iglesia: Jesús dijo que el nuevo pacto se cumplía en su sangre." },
                  { texto: "Que Jeremías hablaba de un pacto con Babilonia, y no con el pueblo de Dios.", explica: "Dios restauraría a su pueblo y haría un nuevo pacto: «Daré mi ley en su mente, y la escribiré en su corazón»." },
                ],
                apoyo: "Jesús dijo en la última cena que ese nuevo pacto se cumplía en su sangre (Lucas 22:20)",
                ref: "Lucas 22:20",
                explica: "El segundo paso es ver cómo se cumple en Cristo y en su iglesia: Jesús dijo en la última cena que ese nuevo pacto se cumplía en su sangre.",
              },
              {
                tipo: "situacion",
                pregunta: "El alumno insiste en que los profetas eran adivinos del futuro. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que eran mensajeros de Dios que llamaban a su pueblo a volver al pacto.", bien: true, explica: "Los profetas no eran adivinos del futuro: eran mensajeros de Dios que llamaban a su pueblo a volver al pacto." },
                  { texto: "Que tiene razón: los profetas solo predecían todo lo que iba a pasar en el futuro.", explica: "Hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios." },
                  { texto: "Que solo hablaban del pasado de Israel, y nunca dijeron nada del futuro.", explica: "Los profetas hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios." },
                ],
                apoyo: "Los profetas no eran adivinos del futuro: eran mensajeros de Dios que llamaban a su pueblo a volver al pacto",
                explica: "Los profetas eran mensajeros de Dios: hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios.",
              },
              {
                tipo: "explica",
                apoyo: "Después, cómo se cumple en Cristo y en su iglesia",
                ref: "Lucas 22:20",
                clave: {
                  id: "pr-n4-poeticos-profeticos-5-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe cómo vas a enseñar Jeremías 31:31-33 con los pasos para leer a los profetas.",
                  ideas: [
                    { id: "tiempo", peso: 50, texto: "Primero, qué dijo el profeta a su pueblo, en su tiempo.", formas: ["su tiempo", "su pueblo", "pueblo de (israel|dios)", "primero (que|lo) dijo", "en aquel tiempo"] },
                    { id: "cristo", peso: 50, texto: "Después, cómo se cumple en Cristo: en la última cena, Jesús dijo que el nuevo pacto se cumplía en su sangre.", formas: ["su sangre", "ultima cena", "cumpl* en (cristo|jesus)", "luz de cristo", "en cristo", "en jesus", "lucas 22"] },
                  ],
                  modelo: "Primero voy a explicar qué dijo Jeremías a su pueblo, en su tiempo: Dios haría un nuevo pacto. Después mostraré cómo se cumple en Cristo, que en la última cena dijo que el nuevo pacto se cumplía en su sangre.",
                },
              },
            ],
          },
          {
            apoyo: "El llamado de los profetas sigue vivo",
            ref: "Amós 5:24",
            titulo: "Amós en la célula",
            relato: [
              "Eres líder de célula y esta semana van a estudiar Amós 5:24: «Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo».",
              "Un hermano dice que ese versículo era solo para el Israel antiguo y que hoy no nos dice nada. Otra hermana quiere ponerlo en práctica, pero no sabe por dónde empezar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen primero con Amós 5:24?",
                opciones: [
                  { texto: "Ver qué le dijo Amós a su pueblo frente a Asiria, antes del destierro.", bien: true, explica: "Primero, qué dijo el profeta a su pueblo, en su tiempo: Amós habló frente a Asiria, antes del destierro." },
                  { texto: "Ver qué significa para ellos hoy, sin preguntar a quién le habló Amós.", explica: "Primero se lee qué dijo el profeta a su pueblo, en su tiempo." },
                  { texto: "Pasar a otro libro, porque los profetas menores son los menos importantes.", explica: "Se les llama mayores o menores por el tamaño de sus libros, no por su importancia." },
                ],
                apoyo: "Frente a Asiria, antes del destierro: Isaías, Oseas, Amós, Miqueas y Jonás, entre otros",
                explica: "Primero se lee qué dijo el profeta a su pueblo, en su tiempo: Amós habló frente a Asiria, antes del destierro.",
              },
              {
                tipo: "situacion",
                pregunta: "El hermano insiste en que hoy ese versículo no nos dice nada. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que el llamado de los profetas sigue vivo: hacer justicia con el prójimo.", bien: true, explica: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo." },
                  { texto: "Que tiene razón: los profetas solo le hablaban al Israel antiguo, y a nadie más.", explica: "El llamado de los profetas sigue vivo: Dios sigue pidiendo lo mismo, justicia, misericordia y humildad." },
                  { texto: "Que hoy Dios ya no pide justicia, sino solamente que vayamos a la iglesia.", explica: "Dios sigue pidiendo lo mismo: justicia, misericordia y humildad." },
                ],
                apoyo: "Dios sigue pidiendo lo mismo: justicia, misericordia y humildad",
                explica: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo.",
              },
              {
                tipo: "explica",
                apoyo: "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero",
                ref: "Amós 5:24",
                clave: {
                  id: "pr-n4-poeticos-profeticos-5-a6-2",
                  tipo: "corta",
                  pregunta: "La hermana te pregunta cómo poner en práctica Amós 5:24 esta semana. ¿Qué le dices?",
                  ideas: [
                    { id: "justicia", peso: 50, texto: "Practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero.", formas: ["practica* justicia", "hacer justicia", "pobre*", "viuda*", "extranjero*", "projimo", "ser justo", "ser justa", "justicia con"] },
                    { id: "volver", peso: 50, texto: "Volver a Dios de corazón y dejar los ídolos: Dios sigue pidiendo justicia, misericordia y humildad.", formas: ["volver a dios", "volv* a dios", "de corazon", "idolos", "misericordia", "humild*", "humill*", "arrepent*"] },
                  ],
                  modelo: "Le diría que el llamado de los profetas sigue vivo: volver a Dios de corazón y practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero. Dios sigue pidiendo justicia, misericordia y humildad.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "denunciaban la idolatría y la injusticia, anunciaban juicio y, después, esperanza y un nuevo pacto",
            ref: "Jeremías 31:31-33",
            clave: {
              id: "pr-n4-poeticos-profeticos-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué anunciaban los profetas al pueblo de Dios? Menciona sus mensajes principales.",
              ideas: [
                { id: "arrepentimiento", peso: 30, texto: "Llamaban al arrepentimiento: a volver a Dios y al pacto.", formas: ["arrepent*", "volver a dios", "volv* a dios", "volver al pacto", "volviera*", "convert*"] },
                { id: "denuncia", peso: 35, texto: "Denunciaban la idolatría y la injusticia.", formas: ["idolatr*", "injustic*", "idolos", "denuncia*"] },
                { id: "esperanza", peso: 35, texto: "Anunciaban juicio y, después del juicio, esperanza y un nuevo pacto.", formas: ["esperanza", "nuevo pacto", "restaur*", "juicio"] },
              ],
              modelo: "Los profetas llamaban al arrepentimiento, a volver al pacto. Denunciaban la idolatría y la injusticia, y anunciaban juicio y, después del juicio, esperanza: Dios restauraría a su pueblo y haría un nuevo pacto.",
            },
          },
          {
            apoyo: "Dios sigue pidiendo lo mismo: justicia, misericordia y humildad",
            ref: "Miqueas 6:8",
            clave: {
              id: "pr-n4-poeticos-profeticos-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué pide Dios, según Miqueas 6:8, y cómo se vive hoy el llamado de los profetas?",
              ideas: [
                { id: "pide", peso: 50, texto: "Hacer justicia, amar misericordia y humillarse ante Dios.", formas: ["hacer justicia", "amar misericordia", "misericordia", "humill*", "humild*"] },
                { id: "hoy", peso: 50, texto: "Volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero.", formas: ["volver a dios", "volv* a dios", "de corazon", "idolos", "pobre*", "viuda*", "extranjero*", "projimo"] },
              ],
              modelo: "Dios pide hacer justicia, amar misericordia y humillarse ante él. Hoy se vive volviendo a Dios de corazón, dejando los ídolos y practicando la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. El Mesías anunciado por los profetas
    "n4-poeticos-profeticos-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué les explicó Jesús a sus discípulos después de resucitar?", reverso: "Que tenía que cumplirse todo lo que estaba escrito de él.", apoyo: "Después de resucitar, Jesús les explicó a sus discípulos que tenía que cumplirse todo lo que estaba escrito de él" },
              { frente: "¿Qué profeta anunció que el Mesías nacería en Belén?", reverso: "Miqueas (Miqueas 5:2).", apoyo: "Nacería en Belén: Miqueas 5:2, cumplido en Mateo 2:4-6" },
              { frente: "¿Qué anunció Zacarías 9:9 del Mesías?", reverso: "Que entraría en Jerusalén humilde, sobre un asno.", apoyo: "Entraría en Jerusalén humilde, sobre un asno: Zacarías 9:9, cumplido en Mateo 21:4-5" },
              { frente: "¿Cuándo se cumplió la promesa de Joel 2:28?", reverso: "En Pentecostés (Hechos 2:16-17).", apoyo: "Derramaría su Espíritu sobre toda carne: Joel 2:28, cumplido en Pentecostés (Hechos 2:16-17)" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde dijo Jesús que estaba escrito de él?", reverso: "En la ley, los profetas y los salmos.", apoyo: "Todo lo escrito de él en la ley, los profetas y los salmos se cumple en Cristo" },
              { frente: "¿Qué profecía de Isaías se cumplió en Mateo 1:22-23?", reverso: "Que el Mesías nacería de una virgen (Isaías 7:14).", apoyo: "Nacería de una virgen: Isaías 7:14, cumplido en Mateo 1:22-23" },
              { frente: "¿Qué título de Daniel 7:13-14 usó Jesús para sí?", reverso: "El Hijo del Hombre, que recibe un reino eterno.", apoyo: "Sería el Hijo del Hombre que recibe un reino eterno: Daniel 7:13-14, el título que Jesús usó para sí" },
              { frente: "¿Qué nombres le da Isaías 9:6 al Mesías?", reverso: "Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz.", apoyo: "Sería Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz: Isaías 9:6" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada profecía con lo que anunció del Mesías.",
            pares: [
              ["Isaías 7:14", "Nacería de una virgen"],
              ["Miqueas 5:2", "Nacería en Belén"],
              ["Zacarías 9:9", "Entraría en Jerusalén humilde, sobre un asno"],
              ["Daniel 7:13-14", "Sería el Hijo del Hombre que recibe un reino eterno"],
              ["Joel 2:28", "Derramaría su Espíritu sobre toda carne"],
            ],
            apoyo: "Los profetas anunciaron al Mesías: nacido de una virgen en Belén, Dios Fuerte, rey humilde, Hijo del Hombre, el que derramaría su Espíritu",
            explica: "Isaías 7:14 anunció que nacería de una virgen; Miqueas 5:2, que nacería en Belén; Zacarías 9:9, que entraría humilde sobre un asno; Daniel 7:13-14, el Hijo del Hombre; y Joel 2:28, que derramaría su Espíritu.",
          },
          {
            consigna: "Une cada profecía del Mesías con el lugar donde se cumplió.",
            pares: [
              ["Nacería de una virgen", "Mateo 1:22-23"],
              ["Nacería en Belén", "Mateo 2:4-6"],
              ["Entraría en Jerusalén humilde, sobre un asno", "Mateo 21:4-5"],
              ["Derramaría su Espíritu sobre toda carne", "Pentecostés (Hechos 2:16-17)"],
            ],
            apoyo: "Nacería en Belén: Miqueas 5:2, cumplido en Mateo 2:4-6",
            explica: "Nacer de una virgen se cumplió en Mateo 1:22-23; nacer en Belén, en Mateo 2:4-6; entrar humilde sobre un asno, en Mateo 21:4-5; y el Espíritu derramado, en Pentecostés (Hechos 2:16-17).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Por qué fue herido el siervo, según Isaías 53? Toca las palabras que lo dicen.",
            texto: "Mas él herido fue por [[nuestras rebeliones]], molido por [[nuestros pecados]]",
            apoyo: "Isaías describe a un siervo despreciado que sufre por los pecados de otros",
            ref: "Isaías 53:3-6",
            explica: "Isaías describe a un siervo despreciado que sufre por los pecados de otros: «Mas él herido fue por nuestras rebeliones, molido por nuestros pecados».",
          },
          {
            consigna: "Según Isaías 53, ¿qué cargó Jehová en el siervo? Toca las palabras que lo dicen.",
            texto: "Jehová cargó en él [[el pecado de todos nosotros]]",
            apoyo: "Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús",
            ref: "Isaías 53:3-6",
            explica: "El siervo sufre por los pecados de otros: «Jehová cargó en él el pecado de todos nosotros». Felipe aplicó este pasaje a Jesús.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un nuevo creyente que discipulas te dice: Leí Isaías 53. ¿De quién habla ese siervo despreciado que sufre tanto?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que habla de Jesús: desde ese pasaje, Felipe le anunció el evangelio a un etíope.", bien: true, explica: "Felipe le explicó este pasaje a un funcionario etíope, y «comenzando desde esta escritura, le anunció el evangelio de Jesús»." },
              { texto: "Que Isaías habla de sí mismo, que sufría por sus propios pecados y errores.", explica: "El siervo de Isaías 53 sufre por los pecados de otros, y Felipe aplicó el pasaje a Jesús." },
              { texto: "Que nadie puede saber de quién habla, y que no vale la pena buscarlo en la Biblia.", explica: "Felipe le explicó este pasaje a un funcionario etíope y le anunció el evangelio de Jesús." },
              { texto: "Que es un poema triste sobre el dolor, que no habla de nadie en especial.", explica: "Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús." },
            ],
            apoyo: "Unos siete siglos después, Felipe le explicó este pasaje a un funcionario etíope",
            ref: "Hechos 8:34-35",
            explica: "Unos siete siglos después de Isaías, Felipe le explicó este pasaje a un funcionario etíope y, desde esa escritura, le anunció el evangelio de Jesús.",
          },
          {
            caso: "Una joven de tu clase te dice: En Isaías 53 el siervo fue herido. ¿Qué había hecho para merecerlo?",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que sufre por los pecados de otros: fue herido por nuestras rebeliones.", bien: true, explica: "Es lo que dice Isaías: «Mas él herido fue por nuestras rebeliones, molido por nuestros pecados»." },
              { texto: "Que lo hirieron por sus propios pecados, como castigo justo de parte de Dios.", explica: "El siervo sufre por los pecados de otros: «Jehová cargó en él el pecado de todos nosotros»." },
              { texto: "Que lo hirieron por ser un mal siervo, que no obedecía a su señor en nada.", explica: "Isaías describe a un siervo despreciado que sufre por los pecados de otros, no por los suyos." },
              { texto: "Que solo es un poema triste, y que no hay que buscarle ningún sentido.", explica: "Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús." },
            ],
            apoyo: "Isaías describe a un siervo despreciado que sufre por los pecados de otros",
            ref: "Isaías 53:3-6",
            explica: "Isaías describe a un siervo despreciado que sufre por los pecados de otros: «Jehová cargó en él el pecado de todos nosotros».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo se cumplió en Jesús lo que anunciaron los profetas, del primer hecho al último.",
            eventos: [
              { texto: "Jesús nace en Belén, como anunció Miqueas", fecha: "Mateo 2:4-6" },
              { texto: "Jesús entra en Jerusalén humilde, sobre un asno", fecha: "Mateo 21:4-5" },
              { texto: "Jesús resucitado explica lo que estaba escrito de él", fecha: "Después de resucitar" },
              { texto: "El Espíritu se derrama sobre toda carne, como dijo Joel", fecha: "Pentecostés (Hechos 2:16-17)" },
            ],
            apoyo: "Los profetas anunciaron al Mesías: nacido de una virgen en Belén, Dios Fuerte, rey humilde, Hijo del Hombre, el que derramaría su Espíritu",
            ref: "Lucas 24:44",
            explica: "Jesús nació en Belén (Mateo 2:4-6) y entró humilde en Jerusalén (Mateo 21:4-5); después de resucitar explicó lo escrito de él, y en Pentecostés se cumplió Joel 2:28 (Hechos 2:16-17).",
          },
          {
            consigna: "Ordena estos hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Isaías anuncia que el Mesías nacería de una virgen", fecha: "Isaías 7:14" },
              { texto: "Jesús nace de una virgen", fecha: "Mateo 1:22-23" },
              { texto: "Jesús entra en Jerusalén sobre un asno, como dijo Zacarías", fecha: "Mateo 21:4-5" },
              { texto: "Jesús explica lo escrito de él en la ley, los profetas y los salmos", fecha: "Después de resucitar" },
              { texto: "Felipe le anuncia a un etíope el evangelio de Jesús desde Isaías 53", fecha: "Unos siete siglos después" },
            ],
            apoyo: "Todo lo escrito de él en la ley, los profetas y los salmos se cumple en Cristo",
            ref: "Lucas 24:44",
            explica: "Isaías anunció que nacería de una virgen (Isaías 7:14), y se cumplió en Mateo 1:22-23. Jesús entró en Jerusalén sobre un asno, después de resucitar explicó lo escrito de él y, unos siete siglos después de Isaías, Felipe anunció a Jesús desde Isaías 53.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El Nuevo Testamento lee a los profetas a la luz de Cristo, sin forzar el texto",
            ref: "Lucas 24:44",
            situacion: "Eres predicador en tu iglesia y vas a dar el mensaje de Navidad. Escogiste Miqueas 5:2, que anuncia que el Mesías nacería en Belén.",
            escenas: [
              {
                id: "e1",
                narra: "Empiezas a preparar el mensaje.",
                pregunta: "¿Cómo lo planteas?",
                opciones: [
                  { texto: "Muestras la profecía de Miqueas y su cumplimiento en Mateo 2:4-6.", valor: 2, explica: "Así lee el Nuevo Testamento a los profetas: Miqueas 5:2 se cumplió en Mateo 2:4-6." },
                  { texto: "Cuentas la historia del nacimiento de Jesús, sin mencionar la profecía.", valor: 1, explica: "Contar el nacimiento es bueno, pero falta lo que muestra la lección: Miqueas 5:2 se cumplió en Mateo 2:4-6." },
                  { texto: "Buscas un sentido oculto en cada palabra, aunque tengas que forzar el texto.", valor: 0, explica: "El Nuevo Testamento lee a los profetas a la luz de Cristo, sin forzar el texto." },
                ],
              },
              {
                id: "e2",
                narra: "Un joven te pregunta: ¿Cómo sabemos que los profetas hablaban de Jesús?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Jesús dijo que debía cumplirse lo escrito de él en los profetas.", valor: 2, explica: "Jesús dijo: «era necesario que se cumpliese todo lo que está escrito de mí en la ley de Moisés, en los profetas y en los salmos»." },
                  { texto: "Que muchos cristianos lo creen así, sin mostrarle ningún texto de la Biblia.", valor: 1, explica: "Es cierto que lo creen, pero la respuesta está en la Biblia: Jesús dijo que tenía que cumplirse todo lo escrito de él." },
                  { texto: "Que no lo sabemos, y que cada uno puede pensar lo que quiera sobre eso.", valor: 0, explica: "Los profetas apuntaban a él: después de resucitar, Jesús explicó que tenía que cumplirse todo lo escrito de él." },
                ],
              },
              {
                id: "e3",
                narra: "Al cerrar el mensaje, quieres que la iglesia se lleve algo para su vida.",
                pregunta: "¿Con qué terminas?",
                opciones: [
                  { texto: "Con que la fe descansa en un Salvador fiel a cada una de sus promesas.", valor: 2, explica: "Tu fe descansa en un Salvador anunciado durante siglos y fiel a cada promesa." },
                  { texto: "Con una lista de todas las profecías, para que la iglesia la memorice.", valor: 1, explica: "Conocer las profecías ayuda, pero el mensaje es para la vida: la fe descansa en un Salvador fiel a cada promesa." },
                  { texto: "Con que las profecías son datos curiosos, que no le cambian la vida a nadie.", valor: 0, explica: "Las profecías cumplidas muestran a un Salvador anunciado durante siglos y fiel a cada promesa." },
                ],
              },
            ],
          },
          {
            apoyo: "muestra cómo sus promesas se cumplen en su vida, su muerte, su resurrección y la venida del Espíritu",
            ref: "Hechos 8:34-35",
            situacion: "Eres maestro de la escuela dominical. Esta semana vas a enseñar cómo el Nuevo Testamento lee a los profetas.",
            escenas: [
              {
                id: "e1",
                narra: "Un alumno lee Isaías 53 y pregunta de quién habla el profeta.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le muestras cómo Felipe, desde ese pasaje, anunció el evangelio de Jesús.", valor: 2, explica: "Felipe le explicó este pasaje a un funcionario etíope, y «comenzando desde esta escritura, le anunció el evangelio de Jesús»." },
                  { texto: "Le dices que habla de Jesús, pero sin mostrarle ningún texto que lo diga.", valor: 1, explica: "Es verdad que habla de Jesús, pero conviene mostrarlo con la Escritura: Felipe lo aplicó a Jesús." },
                  { texto: "Le dices que nadie puede saber de quién habla, y pasas pronto a otro tema.", valor: 0, explica: "Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús." },
                ],
              },
              {
                id: "e2",
                narra: "Otra alumna pregunta qué profecías se cumplieron en la vida de Jesús.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que nació en Belén, como dijo Miqueas, y entró humilde en Jerusalén.", valor: 2, explica: "Miqueas 5:2 se cumplió en Mateo 2:4-6, y Zacarías 9:9 en Mateo 21:4-5." },
                  { texto: "Que se cumplieron varias, aunque no le muestras ninguna en la Biblia.", valor: 1, explica: "Es cierto, pero conviene mostrarlas: Miqueas 5:2 se cumplió en Mateo 2:4-6, y Zacarías 9:9 en Mateo 21:4-5." },
                  { texto: "Que las profecías no tienen nada que ver con la vida de Jesús.", valor: 0, explica: "El Nuevo Testamento muestra cómo las promesas de los profetas se cumplen en su vida, su muerte y su resurrección." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, un alumno pregunta si Pentecostés también tiene que ver con los profetas.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que sí: allí se cumplió Joel 2:28, el Espíritu sobre toda carne.", valor: 2, explica: "Joel 2:28 se cumplió en Pentecostés (Hechos 2:16-17): las promesas se cumplen también en la venida del Espíritu." },
                  { texto: "Que no: los profetas solo hablaron del nacimiento y de la muerte de Jesús.", valor: 0, explica: "Las promesas de los profetas se cumplen en su vida, su muerte, su resurrección y la venida del Espíritu." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús",
            ref: "Isaías 53:3-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseña Isaías 53 sobre el siervo sufriente, y a quién se lo aplicó Felipe?",
              ideas: [
                { id: "otros", peso: 50, texto: "El siervo despreciado sufre por los pecados de otros: herido por nuestras rebeliones.", formas: ["pecados de otros", "pecado de otros", "por (nuestras|nuestros|nuestro) (rebeliones|pecados|pecado)", "nuestras rebeliones", "nuestros pecados", "por los nuestros", "(nuestras|nuestros) (culpas|errores|faltas|maldades)", "cargo en el", "en (nuestro|mi) lugar", "por nosotros", "por otros"] },
                { id: "jesus", peso: 50, texto: "Felipe le explicó el pasaje a un funcionario etíope y le anunció el evangelio de Jesús.", formas: ["jesus", "cristo", "mesias", "etiope", "evangelio"] },
              ],
              errores: [
                { id: "propios", texto: "El siervo sufre por los pecados de otros, no por los suyos.", formas: ["sus propios pecados", "su propio pecado", "por su (pecado|pecados|culpa)"], anula: "otros" },
              ],
              modelo: "Isaías 53 describe a un siervo despreciado que sufre por los pecados de otros: fue herido por nuestras rebeliones. Felipe le explicó ese pasaje a un funcionario etíope y desde allí le anunció el evangelio de Jesús.",
            },
          },
          {
            apoyo: "Isaías describe a un siervo despreciado que sufre por los pecados de otros",
            ref: "Isaías 53:3-6",
            clave: {
              id: "pr-n4-poeticos-profeticos-6-a7-2",
              tipo: "corta",
              pregunta: "Un amigo dice que el siervo de Isaías 53 sufría por sus propios errores. ¿Qué le responderías?",
              ideas: [
                { id: "otros", peso: 50, texto: "El siervo sufre por los pecados de otros: herido por nuestras rebeliones, y Jehová cargó en él el pecado de todos nosotros.", formas: ["pecados de otros", "pecado de otros", "por (nuestras|nuestros|nuestro) (rebeliones|pecados|pecado)", "nuestras rebeliones", "nuestros pecados", "por los nuestros", "(nuestras|nuestros) (culpas|errores|faltas|maldades)", "cargo en el", "en (nuestro|mi) lugar", "por nosotros", "por otros"] },
                { id: "jesus", peso: 50, texto: "Ese siervo es Jesús: desde ese pasaje, Felipe le anunció el evangelio de Jesús a un funcionario etíope.", formas: ["jesus", "cristo", "mesias", "etiope", "evangelio"] },
              ],
              modelo: "Le diría que no: el siervo de Isaías 53 sufre por los pecados de otros, porque fue herido por nuestras rebeliones y Jehová cargó en él el pecado de todos nosotros. Ese siervo es Jesús, como le anunció Felipe al etíope.",
            },
          },
        ],
      },
    ],
  },
};
