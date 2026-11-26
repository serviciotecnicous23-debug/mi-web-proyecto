/**
 * Las prácticas de «Evangelismo personal» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-evangelismo-personal.ts), con la guía de docs/academia-practicas.md.
 * Profundiza lo de «Compartir mi fe» (Nivel 1) con otras actividades: el mensaje y quién hace la obra, el modelo de
 * Jesús con la samaritana, las preguntas que abren puertas, las objeciones, la invitación sin presión y el seguimiento.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_EVANGELISMO_PERSONAL: PracticasMateria = {
  materia: "n2-evangelismo-personal",
  mision: {
    titulo: "De una conversación a un discípulo",
    intro: "Daniel, tu compañero de trabajo, empezó a hacerte preguntas sobre Dios. Quieres acompañarlo todo el camino: explicarle el evangelio con claridad, conversar con él como Jesús con la samaritana, responder sus objeciones con la Palabra y con humildad, invitarlo a recibir a Cristo sin presión y acompañarlo en sus primeras semanas. Repasa las seis lecciones para estar listo.",
    cierre: "Ya sabes anunciar el evangelio como embajador de Cristo, abrir una conversación con preguntas sinceras, responder objeciones con amor y con la Palabra, invitar sin presionar y acompañar a un nuevo creyente hasta que también forme a otros.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El mensaje, el Espíritu Santo y los embajadores
    "n2-evangelismo-personal-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo resume Pablo el evangelio en 1 Corintios 15?", reverso: "Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", apoyo: "que fue sepultado y que resucitó al tercer día" },
              { frente: "¿El evangelio es un consejo para vivir mejor?", reverso: "No: es la buena noticia de lo que Dios hizo en Cristo para salvarnos.", apoyo: "El evangelio no es un consejo para vivir mejor" },
              { frente: "¿Quién convence al mundo de pecado, de justicia y de juicio?", reverso: "El Espíritu Santo: nadie se convierte por nuestra elocuencia.", apoyo: "Nadie se convierte por nuestra elocuencia" },
              { frente: "¿Qué hace un embajador?", reverso: "Habla en nombre de su rey.", apoyo: "Un embajador habla en nombre de su rey." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué nos creó Dios?", reverso: "Para que lo conozcamos; y nos ama (Juan 3:16).", apoyo: "Dios nos creó para conocerlo y nos ama" },
              { frente: "¿Cómo recibe alguien el perdón y la vida eterna?", reverso: "Por gracia, cuando se arrepiente y cree.", apoyo: "Por gracia, quien se arrepiente y cree recibe el perdón y la vida eterna" },
              { frente: "¿Por qué nadie se convierte por nuestra elocuencia?", reverso: "Porque convencer y dar vida nueva es obra del Espíritu Santo.", apoyo: "Convencer y dar vida nueva es obra del Espíritu Santo" },
              { frente: "¿Qué nos mueve a compartir a Cristo?", reverso: "No la obligación, sino el amor de Cristo.", apoyo: "Lo que nos mueve no es la obligación, sino el amor" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el mensaje del evangelio tiene un error. Tócala.",
            frases: [
              "Dios nos creó para conocerlo y nos ama.",
              "Todos pecamos y estamos separados de Dios.",
              "Cristo murió por nuestros pecados y resucitó.",
              "El perdón se gana con el esfuerzo de cada uno.",
            ],
            malo: 3,
            correccion: "Por gracia, quien se arrepiente y cree recibe el perdón y la vida eterna.",
            apoyo: "Por gracia, quien se arrepiente y cree recibe el perdón y la vida eterna",
            ref: "Efesios 2:8-9; Hechos 3:19",
            explica: "El evangelio anuncia lo que Dios hizo: el perdón no se gana, se recibe por gracia al arrepentirse y creer.",
          },
          {
            consigna: "Una de estas frases sobre 1 Corintios 15 tiene un error. Tócala.",
            frases: [
              "Pablo presenta el evangelio como lo más importante.",
              "El evangelio es, ante todo, un consejo para vivir mejor.",
              "Cristo murió por nuestros pecados, conforme a las Escrituras.",
              "Cristo fue sepultado y resucitó al tercer día.",
            ],
            malo: 1,
            correccion: "El evangelio no es un consejo para vivir mejor: es la buena noticia de lo que Dios hizo en Cristo para salvarnos.",
            apoyo: "es la buena noticia de lo que Dios hizo en Cristo para salvarnos",
            ref: "1 Corintios 15:1-4",
            explica: "El evangelio es una noticia: cuenta lo que Dios ya hizo en Cristo. Por eso se anuncia; no se negocia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es tu parte o es obra del Espíritu Santo? Lleva cada frase a su grupo.",
            grupos: ["Tu parte: ser fiel", "Obra del Espíritu Santo"],
            frases: [
              { texto: "Vivir el evangelio", grupo: 0 },
              { texto: "Contar el evangelio con claridad y amor", grupo: 0 },
              { texto: "Orar por la persona", grupo: 0 },
              { texto: "Convencer de pecado, de justicia y de juicio", grupo: 1 },
              { texto: "Dar vida nueva a la persona", grupo: 1 },
              { texto: "Hacer que la persona se convierta", grupo: 1, explica: "Nadie se convierte por nuestra elocuencia: convencer y dar vida nueva es obra del Espíritu Santo." },
            ],
            apoyo: "Convencer y dar vida nueva es obra del Espíritu Santo",
            ref: "Juan 16:8",
            explica: "Tu parte es ser fiel: vivir el evangelio, contarlo y orar. Convencer y dar vida nueva lo hace el Espíritu Santo.",
          },
          {
            consigna: "¿Lo hace el creyente o lo hace el Espíritu Santo? Lleva cada frase a su grupo.",
            grupos: ["Lo hace el creyente", "Lo hace el Espíritu Santo"],
            frases: [
              { texto: "Compartir el mensaje con un amigo", grupo: 0 },
              { texto: "Orar antes de hablarle de Cristo", grupo: 0 },
              { texto: "Evangelizar dependiendo del poder del Espíritu", grupo: 0, explica: "Evangelizamos orando y dependiendo de su poder: eso nos toca a nosotros." },
              { texto: "Convencer al mundo de pecado", grupo: 1 },
              { texto: "Convencer de justicia y de juicio", grupo: 1 },
              { texto: "Salvar a la persona", grupo: 1, explica: "La lección lo dice así: el Espíritu Santo convence y salva." },
            ],
            apoyo: "el Espíritu Santo convence y salva",
            ref: "Juan 16:8; Hechos 1:8",
            explica: "Nosotros compartimos y oramos, dependiendo de su poder; el Espíritu Santo convence y salva.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amiga Sofía te escribe: Le hablé de Jesús a mi hermano y no se convenció. Creo que soy muy mala para esto.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tu parte es ser fiel y orar; convencerlo es obra del Espíritu Santo.", bien: true, explica: "La libra del miedo y de la culpa: convencer y dar vida nueva es obra del Espíritu Santo." },
              { texto: "Tienes razón: estudia mejores argumentos para convencerlo la próxima vez.", explica: "Nadie se convierte por nuestra elocuencia: el que convence es el Espíritu Santo." },
              { texto: "Háblale todos los días hasta que acepte; si no acepta, es que fallaste.", explica: "Convencer no es tu trabajo: tu parte es ser fiel, contarlo con claridad y amor, y orar." },
              { texto: "Mejor ya no le hables de Jesús: no todos sirven para evangelizar.", explica: "No depende de nuestra elocuencia: somos embajadores de Cristo, y el Espíritu Santo hace la obra." },
            ],
            apoyo: "No es tu trabajo convencer",
            ref: "Juan 16:8",
            explica: "Saber que el Espíritu Santo es quien convence nos libra del miedo: nos toca ser fieles y seguir orando.",
          },
          {
            caso: "Un joven de tu grupo te dice: Esta semana tres personas creyeron porque yo sé convencer muy bien a la gente.",
            pregunta: "¿Qué le respondes con cariño?",
            opciones: [
              { texto: "¡Qué alegría! Pero quien convence es el Espíritu; tu parte fue ser fiel.", bien: true, explica: "Se alegra con él, pero le recuerda que convencer es obra del Espíritu Santo: eso nos libra del orgullo." },
              { texto: "¡Excelente! Tienes un don para convencer; enséñanos a todos tu método secreto.", explica: "Nadie se convierte por nuestra elocuencia: el Espíritu Santo convence y salva." },
              { texto: "Entonces ya no necesitas orar antes de hablarle de Jesús a la gente.", explica: "Evangelizamos orando y dependiendo del poder del Espíritu Santo." },
              { texto: "No te creo: casi nadie cree tan rápido cuando escucha el evangelio.", explica: "Dudar de él no le enseña nada: lo que necesita saber es que el que convence es el Espíritu Santo." },
            ],
            apoyo: "Eso te libra del miedo y del orgullo.",
            ref: "Juan 16:8",
            explica: "Saber que el Espíritu Santo convence y salva nos libra del miedo cuando no creen y del orgullo cuando creen.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué mueve al embajador de Cristo y qué hace? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "amor", texto: "El amor de Cristo", x: 30, y: 8 },
              { id: "tu", texto: "Tú, su embajador", x: 30, y: 40 },
              { id: "cristo", texto: "Cristo", x: 80, y: 68 },
              { id: "gente", texto: "Tu familia y tus vecinos", x: 30, y: 88 },
            ],
            enlaces: [
              { de: "amor", a: "tu", relacion: "te mueve a compartir" },
              { de: "tu", a: "cristo", relacion: "hablas en nombre de" },
              { de: "tu", a: "gente", relacion: "les llevas el mensaje" },
            ],
            distractores: ["te obliga a compartir", "los convences tú solo"],
            apoyo: "Lo que nos mueve no es la obligación, sino el amor",
            ref: "2 Corintios 5:14, 20",
            explica: "Un embajador habla en nombre de su rey: nosotros hablamos en nombre de Cristo, movidos por su amor, y llevamos su mensaje a quienes nos rodean.",
          },
          {
            consigna: "¿Qué te toca a ti y qué hace el Espíritu Santo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "tu", texto: "Tú, el creyente", x: 28, y: 10 },
              { id: "evangelio", texto: "El evangelio", x: 75, y: 35 },
              { id: "espiritu", texto: "El Espíritu Santo", x: 75, y: 58 },
              { id: "amigo", texto: "Tu amigo", x: 28, y: 88 },
            ],
            enlaces: [
              { de: "tu", a: "evangelio", relacion: "lo vives y lo cuentas" },
              { de: "tu", a: "amigo", relacion: "oras por él" },
              { de: "espiritu", a: "amigo", relacion: "lo convence y lo salva" },
            ],
            distractores: ["lo negocias", "lo convences tú solo"],
            apoyo: "Tu parte es ser fiel: vivir el evangelio, contarlo con claridad y amor, y orar",
            ref: "Juan 16:8; 2 Corintios 5:20",
            explica: "Tu parte es vivir el evangelio, contarlo y orar; convencer y dar vida nueva es obra del Espíritu Santo. El evangelio no se negocia: se anuncia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los embajadores de Cristo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un embajador habla en nombre de su rey.", verdad: true, explica: "Así también nosotros: Pablo dice que somos embajadores en nombre de Cristo.", apoyo: "Un embajador habla en nombre de su rey.", ref: "2 Corintios 5:20" },
              { texto: "Compartimos a Cristo solo porque es una obligación.", verdad: false, explica: "Lo que nos mueve no es la obligación, sino el amor: el amor de Cristo nos constriñe.", apoyo: "Lo que nos mueve no es la obligación, sino el amor", ref: "2 Corintios 5:14" },
              { texto: "Los creyentes somos embajadores de Cristo, movidos por su amor.", verdad: true, explica: "Hablamos en nombre de Cristo, y lo hacemos movidos por su amor.", apoyo: "nosotros somos embajadores de Cristo, movidos por su amor", ref: "2 Corintios 5:20" },
            ],
          },
          {
            consigna: "Sobre los embajadores de Cristo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El amor de Cristo es lo que nos mueve a compartir el evangelio.", verdad: true, explica: "Pablo lo dice así: el amor de Cristo nos constriñe.", apoyo: "el amor de Cristo nos constriñe", ref: "2 Corintios 5:14" },
              { texto: "Un embajador puede cambiar el mensaje del evangelio para que guste más.", verdad: false, explica: "El embajador habla en nombre de su rey: el evangelio no se negocia, se anuncia.", apoyo: "El evangelio no se negocia: se anuncia." },
              { texto: "Dios quiere que llevemos su mensaje de reconciliación a las personas de nuestro entorno.", verdad: true, explica: "Como embajadores, llevamos a otros el mensaje de reconciliación de Dios.", apoyo: "quiere Dios que lleves su mensaje de reconciliación", ref: "2 Corintios 5:18-20" },
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
            apoyo: "que fue sepultado y que resucitó al tercer día",
            ref: "1 Corintios 15:1-4",
            clave: {
              id: "pr-n2-evangelismo-personal-1-a7-1",
              tipo: "corta",
              pregunta: "Resume con tus palabras el evangelio que Pablo enseña en 1 Corintios 15:1-4.",
              ideas: [
                { id: "murio", peso: 40, texto: "Cristo murió por nuestros pecados.", formas: ["murio", "muerte", "cruz", "dio su vida", "por (nuestros|mis|los) pecados"] },
                { id: "sepultado", peso: 20, texto: "Fue sepultado.", formas: ["sepult*", "enterr*", "tumba", "sepulcro"] },
                { id: "resucito", peso: 40, texto: "Resucitó al tercer día.", formas: ["resucit*", "tercer dia", "volvio a la vida", "se levanto"] },
              ],
              modelo: "Pablo enseña que lo más importante es esto: Cristo murió por nuestros pecados, conforme a las Escrituras, fue sepultado y resucitó al tercer día. Es lo que Dios hizo para salvarnos.",
            },
          },
          {
            apoyo: "El evangelio no es un consejo para vivir mejor",
            ref: "1 Corintios 15:1-4",
            clave: {
              id: "pr-n2-evangelismo-personal-1-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué el evangelio es una buena noticia y no un simple consejo para vivir mejor?",
              ideas: [
                { id: "hizo", peso: 50, texto: "Anuncia lo que Dios hizo en Cristo para salvarnos.", formas: ["lo que dios hizo", "dios hizo", "dios ya hizo", "hizo en cristo", "para salvar*", "salvarnos", "nos salvo", "nos salva"] },
                { id: "cristo", peso: 50, texto: "Cristo murió por nuestros pecados y resucitó.", formas: ["murio", "muerte", "cruz", "resucit*"] },
              ],
              modelo: "Porque anuncia lo que Dios hizo en Cristo para salvarnos: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día. Es una noticia que se recibe y se anuncia.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. El modelo de Jesús: la mujer samaritana
    "n2-evangelismo-personal-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empezó Jesús la conversación con la samaritana?", reverso: "Con algo cotidiano: le pidió de beber.", apoyo: "Jesús empezó con algo cotidiano" },
              { frente: "¿Qué tres barreras cruzó Jesús junto al pozo?", reverso: "Judío y samaritana, hombre y mujer, y la vida quebrantada de ella.", apoyo: "Cruzó tres barreras" },
              { frente: "¿Qué le prometió Jesús a la mujer para despertar su interés?", reverso: "Un agua que quita la sed para siempre: el agua viva.", apoyo: "Despertó su interés con una promesa: un agua que quita la sed para siempre." },
              { frente: "¿Qué hizo la mujer después de hablar con Jesús?", reverso: "Dejó su cántaro y fue a la ciudad a contar lo que le pasó.", apoyo: "La mujer dejó su cántaro y fue a la ciudad" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es un puente en una conversación?", reverso: "Lo que nos acerca: un interés común, una necesidad, una amistad o una pregunta sincera.", apoyo: "Un puente es lo que nos acerca" },
              { frente: "¿Qué es una barrera en una conversación?", reverso: "Lo que nos separa: los prejuicios, las discusiones, el trato frío o la prisa.", apoyo: "Una barrera es lo que nos separa" },
              { frente: "¿Cómo tocó Jesús la vida de la samaritana?", reverso: "Con verdad y sin desprecio: le habló de los maridos que había tenido.", apoyo: "Tocó su vida con verdad y sin desprecio" },
              { frente: "¿A cuántos llevó a creer la conversación de Jesús con la samaritana?", reverso: "A muchos samaritanos.", apoyo: "Una sola conversación llevó a muchos samaritanos a creer" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos del modelo de Jesús con la samaritana, del primero al último.",
            pasos: [
              "Tomó la iniciativa y empezó con una necesidad común",
              "Despertó su interés con la promesa del agua viva",
              "Tocó su vida con verdad y sin desprecio",
              "No se desvió con la discusión sobre la adoración",
              "Se reveló como el Mesías",
            ],
            apoyo: "ese es el modelo de la conversación personal",
            ref: "Juan 4:7-26",
            explica: "Jesús empezó con algo cotidiano, despertó su interés, habló con verdad y amor, no se desvió y se reveló como el Mesías.",
          },
          {
            consigna: "Ordena lo que pasó en Juan 4, del primer momento al último.",
            pasos: [
              "Jesús le pidió de beber junto al pozo",
              "Le habló de un agua que quita la sed para siempre",
              "Le habló de los maridos que había tenido",
              "Se le reveló como el Mesías",
              "Ella dejó su cántaro y fue a contarlo a la ciudad",
              "Muchos samaritanos creyeron",
            ],
            apoyo: "Una sola conversación llevó a muchos samaritanos a creer",
            ref: "Juan 4:7-42",
            explica: "Una conversación que empezó con un poco de agua terminó con muchos samaritanos creyendo en Jesús.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un puente o es una barrera en una conversación? Lleva cada frase a su grupo.",
            grupos: ["Puente: lo que nos acerca", "Barrera: lo que nos separa"],
            frases: [
              { texto: "Un interés común", grupo: 0 },
              { texto: "Una amistad", grupo: 0 },
              { texto: "Una pregunta sincera", grupo: 0 },
              { texto: "Los prejuicios", grupo: 1 },
              { texto: "Las discusiones", grupo: 1 },
              { texto: "El trato frío", grupo: 1 },
              { texto: "La prisa", grupo: 1 },
            ],
            apoyo: "El evangelismo personal busca los puentes y quita las barreras que dependen de nosotros.",
            ref: "Juan 4:7-9",
            explica: "Un puente nos acerca a la persona; una barrera nos separa. Buscamos los puentes y quitamos las barreras que dependen de nosotros.",
          },
          {
            consigna: "¿Esto acerca o separa? Lleva cada frase a su grupo.",
            grupos: ["Es un puente: acerca", "Es una barrera: separa"],
            frases: [
              { texto: "Preguntarle con sinceridad cómo está su familia", grupo: 0, explica: "Una pregunta sincera es un puente." },
              { texto: "Ayudar a una vecina que pasa por una necesidad", grupo: 0, explica: "Una necesidad puede ser un puente para conversar." },
              { texto: "Hablar con un compañero de su afición por la música", grupo: 0, explica: "Un interés común es un puente." },
              { texto: "Juzgar a alguien por el lugar de donde viene", grupo: 1, explica: "Los prejuicios son una barrera; Jesús habló con una samaritana." },
              { texto: "Discutir para ganarle la conversación", grupo: 1, explica: "Las discusiones nos separan." },
              { texto: "Saludar de mala gana y sin mirar a la persona", grupo: 1, explica: "El trato frío es una barrera." },
              { texto: "Cortar la conversación porque tienes prisa", grupo: 1, explica: "La prisa también nos separa." },
            ],
            apoyo: "Un puente es lo que nos acerca: un interés común, una necesidad, una amistad, una pregunta sincera",
            ref: "Juan 4:7-9",
            explica: "Los puentes, como una pregunta sincera o un interés común, nos acercan; los prejuicios, las discusiones, el trato frío y la prisa nos separan.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo empezó Jesús la conversación junto al pozo.",
            texto: "Jesús empezó con algo [[cotidiano]]: le pidió de beber. Cruzó tres barreras: Él era judío y ella [[samaritana]], Él era hombre y ella mujer, y ella llevaba una vida [[quebrantada]]. Después pasó a lo [[espiritual]]: el agua viva.",
            distractores: ["complicado", "romana", "perfecta", "político"],
            errores: {
              complicado: "Jesús empezó con algo de todos los días: pedir de beber.",
              romana: "La mujer era samaritana: esa era una de las barreras, porque Jesús era judío.",
              perfecta: "Ella llevaba una vida quebrantada, y aun así Jesús le habló sin desprecio.",
              político: "Jesús pasó de lo cotidiano a lo espiritual: el agua viva.",
            },
            apoyo: "Después pasó de lo cotidiano a lo espiritual: el agua viva.",
            ref: "Juan 4:7-10",
            explica: "Jesús empezó con una necesidad de todos los días, cruzó las barreras de su tiempo y pasó de lo cotidiano a lo espiritual.",
          },
          {
            consigna: "Completa los pasos con que Jesús guió la conversación.",
            texto: "Jesús tomó la iniciativa y empezó con una [[necesidad]] común. Despertó su interés con una [[promesa]]: un agua que quita la sed para siempre. Al final se reveló como el [[Mesías]].",
            distractores: ["discusión", "amenaza", "profeta"],
            errores: {
              discusión: "Jesús no empezó discutiendo: empezó con una necesidad común, pedir de beber.",
              amenaza: "Jesús despertó su interés con una promesa: un agua que quita la sed para siempre.",
              profeta: "Jesús se reveló como el Mesías: «Yo soy, el que habla contigo».",
            },
            apoyo: "Tomó la iniciativa y empezó con una necesidad común.",
            ref: "Juan 4:7-26",
            explica: "Jesús no esperó: tomó la iniciativa, despertó el interés de la mujer con una promesa y se reveló como el Mesías.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu compañera de trabajo te dice: Estoy agotada; con tantos problemas en casa, ya no tengo fuerzas para nada.",
            pregunta: "Quieres seguir el modelo de Jesús. ¿Qué le respondes?",
            opciones: [
              { texto: "Lo siento. ¿Quieres contarme qué pasa? A mí me ayuda hablar con Dios.", bien: true, explica: "Empieza con su necesidad, la escucha y pasa con naturalidad de lo cotidiano a lo espiritual, como Jesús." },
              { texto: "Ánimo, ya pasará. Ahora tengo mucha prisa, pero otro día me cuentas.", explica: "La prisa es una barrera: Jesús tomó la iniciativa y se detuvo a conversar." },
              { texto: "Eso te pasa porque no conoces a Dios: tienes que arrepentirte hoy mismo.", explica: "Jesús tocó la vida de la samaritana con verdad, pero sin desprecio, y empezó por una necesidad común." },
              { texto: "Todos estamos cansados; mejor hablemos del partido de fútbol de anoche.", explica: "Quedarse en lo cotidiano no basta: Jesús pasó de lo cotidiano a lo espiritual." },
            ],
            apoyo: "Las mejores conversaciones sobre Dios empiezan con una conversación sobre la vida.",
            ref: "Juan 4:7-10",
            explica: "Jesús empezó con algo cotidiano y pasó a lo espiritual: así se aplica su modelo a una conversación personal.",
          },
          {
            caso: "Tu amiga Marta, mientras conversan de Jesús, te dice: Tu iglesia y la mía no se ponen de acuerdo en cómo hay que adorar.",
            pregunta: "¿Qué le respondes, siguiendo el modelo de Jesús?",
            opciones: [
              { texto: "Eso lo podemos ver otro día; lo más importante es Jesús. ¿Qué piensas de Él?", bien: true, explica: "Como Jesús, no se desvía con la discusión: vuelve con amor a lo más importante, que es Jesús." },
              { texto: "Mi iglesia tiene la razón; ahora mismo te explico por qué la tuya está equivocada.", explica: "Las discusiones son una barrera: Jesús no se desvió con la discusión sobre el lugar de la adoración." },
              { texto: "Es verdad, todo eso es muy complicado; mejor dejemos de hablar de Dios.", explica: "Una dificultad no es motivo para dejar la conversación: Jesús siguió hasta revelarse como el Mesías." },
              { texto: "Ese es el tema más importante: pasemos la tarde comparando nuestras dos iglesias.", explica: "Así la conversación se desvía: Jesús no se desvió con la discusión sobre la adoración." },
            ],
            apoyo: "No se desvió con la discusión sobre el lugar de la adoración",
            ref: "Juan 4:19-26",
            explica: "Jesús no se desvió en discusiones: llevó la conversación a lo más importante y se reveló como el Mesías.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un puente es lo que nos acerca: un interés común, una necesidad, una amistad, una pregunta sincera",
            ref: "Juan 4:7-9",
            clave: {
              id: "pr-n2-evangelismo-personal-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué es un puente y qué es una barrera en una conversación? Da un ejemplo de cada uno.",
              ideas: [
                { id: "puente", peso: 50, texto: "Un puente es lo que nos acerca, como un interés común, una necesidad, una amistad o una pregunta sincera.", formas: ["nos acerca", "acerca*", "nos une", "interes comun", "amistad", "necesidad", "pregunta sincera"] },
                { id: "barrera", peso: 50, texto: "Una barrera es lo que nos separa, como los prejuicios, las discusiones, el trato frío o la prisa.", formas: ["nos separa", "separa*", "nos aleja", "prejuicio*", "discusion*", "trato frio", "prisa"] },
              ],
              modelo: "Un puente es lo que nos acerca a la persona, como un interés común o una amistad. Una barrera es lo que nos separa, como los prejuicios, las discusiones o la prisa.",
            },
          },
          {
            apoyo: "El evangelismo personal busca los puentes y quita las barreras que dependen de nosotros.",
            ref: "Juan 4:7-9",
            clave: {
              id: "pr-n2-evangelismo-personal-2-a6-2",
              tipo: "corta",
              pregunta: "Según la lección, ¿qué busca y qué quita el evangelismo personal en una conversación?",
              ideas: [
                { id: "puentes", peso: 50, texto: "Busca los puentes: lo que nos acerca, como una amistad o un interés común.", formas: ["puente*", "nos acerca", "acerca*", "amistad", "interes comun", "pregunta sincera", "necesidad"] },
                { id: "barreras", peso: 50, texto: "Quita las barreras que dependen de nosotros, como el trato frío, las discusiones o la prisa.", formas: ["barrera*", "nos separa", "separa*", "prejuicio*", "discusion*", "trato frio", "prisa"] },
              ],
              modelo: "Busca los puentes, lo que nos acerca, como una amistad o un interés común. Y quita las barreras que dependen de nosotros, como el trato frío, las discusiones o la prisa.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Preguntas que abren puertas
    "n2-evangelismo-personal-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Pablo primero en Atenas?", reverso: "Observó la ciudad.", apoyo: "Pablo observó primero la ciudad" },
              { frente: "¿Qué inscripción tenía el altar que Pablo vio en Atenas?", reverso: "«AL DIOS NO CONOCIDO».", apoyo: "un altar con la inscripción" },
              { frente: "¿De qué les habló Pablo a los atenienses, partiendo del altar?", reverso: "Del Dios creador, del arrepentimiento y de Jesús resucitado.", apoyo: "Desde ahí les habló del Dios creador, del arrepentimiento y de Jesús resucitado" },
              { frente: "¿Qué abre más puertas que un discurso?", reverso: "Una buena pregunta, hecha con amor.", apoyo: "Una buena pregunta, hecha con amor, abre más puertas que un discurso." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo pide Pablo que sea nuestra palabra?", reverso: "Que sea «siempre con gracia, sazonada con sal».", apoyo: "Pablo pide que nuestra palabra sea" },
              { frente: "¿Por qué hay que aprender a responder a cada uno?", reverso: "Porque cada persona es distinta.", apoyo: "Cada persona es distinta" },
              { frente: "¿Qué logra quien escucha de verdad, sin interrumpir ni burlarse?", reverso: "Muestra respeto y gana el derecho a ser escuchado.", apoyo: "muestra respeto y gana el derecho a ser escuchado" },
              { frente: "Si la conversación se vuelve una pelea, ¿qué es mejor hacer?", reverso: "Orar, dejar una pregunta y seguir con la amistad.", apoyo: "es mejor orar, dejar una pregunta y seguir con la amistad" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo empezó Pablo a anunciar el evangelio en Atenas, del primer paso al último.",
            pasos: [
              "Observó primero la ciudad",
              "Partió de un altar que ellos conocían",
              "Les habló del Dios creador y del arrepentimiento",
              "Les anunció a Jesús resucitado",
            ],
            apoyo: "En Atenas, Pablo observó primero la ciudad y partió de lo que ellos conocían",
            ref: "Hechos 17:22-31",
            explica: "Pablo no empezó con un discurso: observó, partió de lo que ellos conocían y desde ahí les habló de Dios y de Jesús resucitado.",
          },
          {
            consigna: "Ordena lo que hizo Pablo en Atenas, de lo primero a lo último.",
            pasos: [
              "Miró con atención la ciudad de Atenas",
              "Vio el altar al Dios no conocido",
              "Partiendo del altar, les presentó al Dios creador",
              "Los llamó a arrepentirse",
              "Les habló de Jesús resucitado",
            ],
            apoyo: "Desde ahí les habló del Dios creador, del arrepentimiento y de Jesús resucitado",
            ref: "Hechos 17:22-31",
            explica: "Pablo partió de lo que los atenienses conocían, el altar al Dios no conocido, y desde ahí los llevó al Dios creador, al arrepentimiento y a Jesús resucitado.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "¿Qué pregunta abre la conversación en cada caso? Une cada situación con su pregunta.",
            pares: [
              ["Un amigo te cuenta que su mamá está en el hospital", "¿Puedo orar por ti por algo que estés viviendo?"],
              ["Un compañero ve tu Biblia sobre el escritorio", "¿Alguna vez has leído la Biblia? ¿Qué piensas de Jesús?"],
              ["Una vecina dice que cree en algo, pero no sabe en qué", "¿Tienes alguna creencia espiritual, o alguna relación con Dios?"],
              ["Tu primo dice que a veces piensa en la muerte", "¿Qué piensas que pasa después de la muerte?"],
            ],
            apoyo: "Una buena pregunta, hecha con amor, abre más puertas que un discurso.",
            explica: "Una pregunta sincera, que parte de lo que la persona vive, abre la puerta a una conversación espiritual.",
          },
          {
            consigna: "¿Qué pregunta abre la conversación en cada caso? Une cada situación con su pregunta.",
            pares: [
              ["Una compañera te cuenta que pasa por un mal momento", "¿Puedo orar por ti por algo que estés viviendo?"],
              ["Un amigo dice que tiene muchas preguntas para Dios", "Si pudieras preguntarle algo a Dios, ¿qué le preguntarías?"],
              ["Un vecino dice que le interesa la historia de Jesús", "¿Alguna vez has leído la Biblia? ¿Qué piensas de Jesús?"],
              ["Una amiga dice que es una persona muy espiritual", "¿Tienes alguna creencia espiritual, o alguna relación con Dios?"],
            ],
            apoyo: "Formular preguntas que abran conversaciones espirituales.",
            explica: "Cada persona es distinta: una buena pregunta parte de lo que la persona vive o piensa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre escuchar y responder tiene un error. Tócala.",
            frases: [
              "Escuchar de verdad, sin interrumpir, muestra respeto.",
              "Pedro llama a responder con mansedumbre y reverencia.",
              "Si la conversación se vuelve una pelea, hay que ganarla.",
              "Escuchar bien también es evangelizar.",
            ],
            malo: 2,
            correccion: "Si la conversación se vuelve una pelea, es mejor orar, dejar una pregunta y seguir con la amistad.",
            apoyo: "Si la conversación se vuelve una pelea, es mejor orar, dejar una pregunta y seguir con la amistad.",
            ref: "1 Pedro 3:15-16",
            explica: "El objetivo no es tener la última palabra, sino que la persona conozca a Cristo.",
          },
          {
            consigna: "Una de estas frases sobre escuchar y responder tiene un error. Tócala.",
            frases: [
              "Cada persona es distinta: hay que aprender a responder a cada uno.",
              "Escuchar a alguien que piensa distinto es perder el tiempo.",
              "Nuestra palabra debe ser siempre con gracia.",
              "Quien escucha con respeto gana el derecho a ser escuchado.",
            ],
            malo: 1,
            correccion: "Escuchar de verdad, sin interrumpir ni burlarse, muestra respeto y gana el derecho a ser escuchado.",
            apoyo: "muestra respeto y gana el derecho a ser escuchado",
            ref: "Santiago 1:19",
            explica: "Escuchar sin interrumpir ni burlarse muestra respeto: así ganamos el derecho a ser escuchados.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amigo Andrés te dice: La religión es un invento para controlar a la gente.",
            pregunta: "¿Cómo le respondes con mansedumbre y respeto?",
            opciones: [
              { texto: "Entiendo que lo veas así. ¿Qué te hizo pensarlo? Quiero escucharte.", bien: true, explica: "Escucha sin burlarse ni interrumpir y hace una pregunta sincera: así responde con mansedumbre." },
              { texto: "Estás muy equivocado; déjame hablar a mí, que yo sí sé mucho de esto.", explica: "Interrumpir para tener la última palabra no muestra respeto: primero hay que escuchar." },
              { texto: "Ja, ja, eso lo dice quien nunca ha leído un libro serio en su vida.", explica: "Burlarse cierra la puerta: escuchar sin burlarse muestra respeto." },
              { texto: "Si piensas así, mejor ya no hablemos más; no vale la pena seguir.", explica: "No hace falta cortar la conversación: el objetivo es que la persona conozca a Cristo." },
            ],
            apoyo: "Escuchar de verdad, sin interrumpir ni burlarse, muestra respeto y gana el derecho a ser escuchado",
            ref: "1 Pedro 3:15-16; Santiago 1:19",
            explica: "Responder con mansedumbre empieza por escuchar de verdad: eso gana el derecho a ser escuchado.",
          },
          {
            caso: "Tu compañera Lucía, ya molesta, te dice: Siempre quieres tener la razón con tu Dios. ¡Ya basta!",
            pregunta: "La conversación se volvió una pelea. ¿Qué haces?",
            opciones: [
              { texto: "Dejas de discutir: oras por ella, le dejas una pregunta y cuidas la amistad.", bien: true, explica: "Es lo que enseña la lección: si la conversación se vuelve una pelea, orar, dejar una pregunta y seguir con la amistad." },
              { texto: "Sigues hablando hasta demostrarle que tienes la razón, aunque se enoje todavía más.", explica: "El objetivo no es tener la última palabra, sino que la persona conozca a Cristo." },
              { texto: "Te ofendes, te vas y dejas de hablarle durante un buen tiempo.", explica: "Cortar la amistad cierra la puerta: lo mejor es seguir con la amistad." },
              { texto: "Le dices que con esa actitud tan cerrada nunca va a conocer a Dios.", explica: "Esa respuesta no es con mansedumbre y reverencia: hiere y cierra la conversación." },
            ],
            apoyo: "El objetivo no es tener la última palabra, sino que la persona conozca a Cristo.",
            ref: "1 Pedro 3:15-16",
            explica: "No buscamos ganar discusiones, sino personas: cuando hay pelea, oramos, dejamos una pregunta y seguimos con la amistad.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Una buena pregunta, hecha con amor, abre más puertas que un discurso.",
            clave: {
              id: "pr-n2-evangelismo-personal-3-a6-1",
              tipo: "corta",
              pregunta: "Escribe una pregunta que podrías hacerle a un amigo para abrir una conversación espiritual, y di por qué abre puertas.",
              ideas: [
                { id: "pregunta", peso: 50, texto: "Una pregunta sincera sobre Dios, Jesús, la Biblia, la muerte o la oración.", formas: ["relacion con dios", "creencia espiritual", "despues de la muerte", "leido la biblia", "piensas de jesus", "orar por ti", "puedo orar", "preguntarle algo a dios", "que piensas (de|sobre) (dios|jesus)"] },
                { id: "porque", peso: 50, texto: "Una pregunta hecha con amor abre más puertas que un discurso: deja hablar a la persona y la escuchamos.", formas: ["con amor", "abre puertas", "mas que un discurso", "sincer*", "escuch*", "deja hablar", "le deja hablar", "le interesa"] },
              ],
              modelo: "Le preguntaría: ¿Puedo orar por ti por algo que estés viviendo? Una pregunta así, hecha con amor y con sinceridad, abre más puertas que un discurso, porque le deja hablar y yo lo escucho.",
            },
          },
          {
            apoyo: "Cada persona es distinta",
            clave: {
              id: "pr-n2-evangelismo-personal-3-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué una buena pregunta, hecha con amor, abre más puertas que un discurso?",
              ideas: [
                { id: "habla", peso: 50, texto: "Deja que la persona hable, y nosotros la escuchamos.", formas: ["la persona hable", "deja hablar", "le deja hablar", "hable", "escuch*", "lo que piensa", "lo que siente", "su opinion"] },
                { id: "distinta", peso: 50, texto: "Cada persona es distinta: partimos de lo que ella conoce.", formas: ["cada persona", "cada uno", "distint*", "lo que conoce", "lo que ya conoce", "partimos de", "partir de"] },
              ],
              modelo: "Porque deja que la persona hable y nos muestra lo que piensa; así la escuchamos. Cada persona es distinta, y la pregunta nos ayuda a partir de lo que ella conoce, como hizo Pablo en Atenas.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Las objeciones
    "n2-evangelismo-personal-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dijo Jesús de sí mismo en Juan 14:6?", reverso: "Que es el camino, y la verdad, y la vida.", apoyo: "Jesús no dijo que era un camino" },
              { frente: "¿Qué responder a quien dice que es buena persona?", reverso: "Comparados con la santidad de Dios, todos pecaron; somos salvos por gracia.", apoyo: "comparados con la santidad de Dios" },
              { frente: "¿Cómo empezar cuando alguien pregunta por qué Dios permite el sufrimiento?", reverso: "Primero acompañar y escuchar: a veces la pregunta nace de un dolor reciente.", apoyo: "primero hay que acompañar y escuchar" },
              { frente: "¿Qué hacer si no sabes la respuesta?", reverso: "Decir con sencillez que no lo sabes, estudiarlo y contarle después.", apoyo: "Puedes decir con sencillez que no lo sabes, que lo vas a estudiar y que después le contarás" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué afirmó Pedro en Hechos 4:12?", reverso: "Que en ningún otro hay salvación.", apoyo: "Pedro afirmó que en ningún otro hay salvación" },
              { frente: "¿Qué responder a quien dice que la Biblia fue cambiada?", reverso: "Que se conservan miles de manuscritos antiguos del Nuevo Testamento.", apoyo: "se conservan miles de manuscritos antiguos del Nuevo Testamento" },
              { frente: "¿Qué responder a quien dice que la iglesia está llena de hipócritas?", reverso: "Que no seguimos a los cristianos, sino a Cristo, que nunca pecó.", apoyo: "no seguimos a los cristianos, sino a Cristo, que nunca pecó" },
              { frente: "¿Qué responder a quien dice que ahora no tiene tiempo?", reverso: "Que nadie sabe si tendrá un mañana: hoy es el día de salvación.", apoyo: "nadie sabe si tendrá un mañana, y hoy es el día de salvación" },
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
            consigna: "Une cada objeción con la respuesta que da la lección.",
            pares: [
              ["Todos los caminos llevan a Dios", "Jesús es el camino, y la verdad, y la vida"],
              ["Soy buena persona", "Todos pecaron; somos justificados gratuitamente por su gracia"],
              ["La Biblia fue cambiada", "Se conservan miles de manuscritos antiguos del Nuevo Testamento"],
              ["La iglesia está llena de hipócritas", "No seguimos a los cristianos, sino a Cristo, que nunca pecó"],
              ["Ahora no tengo tiempo", "Hoy es el día de salvación"],
            ],
            apoyo: "Las objeciones se responden con amor y con la Palabra",
            ref: "Juan 14:6; Romanos 3:23-24; Lucas 1:1-4; Hebreos 4:15; 2 Corintios 6:2",
            explica: "Cada objeción tiene una respuesta en la Palabra, y se dice con amor y con respeto.",
          },
          {
            consigna: "¿Qué responde la Biblia a cada objeción? Une cada una con su respuesta.",
            pares: [
              ["Hay muchos caminos para llegar a Dios", "En ningún otro hay salvación"],
              ["Yo me porto bien; seguro que me salvo", "La salvación no se gana siendo bueno"],
              ["Si Dios existe, ¿por qué hay sufrimiento?", "Dios no es indiferente: en Cristo sufrió por nosotros"],
              ["Seguro que la Biblia la cambiaron con los años", "Lucas investigó con cuidado lo que escribió"],
              ["Ya me ocuparé de Dios cuando sea viejo", "Nadie sabe si tendrá un mañana"],
            ],
            apoyo: "la respuesta empieza con amor y con la Palabra",
            ref: "Hechos 4:12; Romanos 3:24; Lucas 1:1-4; 2 Corintios 6:2",
            explica: "Las objeciones se responden con amor y con la Palabra, sin despreciar a nadie.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Juan 14:6",
            consigna: "Alguien dice que todos los caminos llevan a Dios. ¿Qué dijo Jesús que es Él? Toca las tres palabras.",
            texto: "el [[camino]], y la [[verdad]], y la [[vida]]",
            apoyo: "Jesús no dijo que era un camino",
            explica: "Jesús no dijo que era un camino entre muchos: Él es el camino, y la verdad, y la vida.",
          },
          {
            ref: "Juan 16:33",
            consigna: "Alguien pregunta por qué hay sufrimiento. ¿Qué nos pide Jesús y qué hizo Él? Toca las dos palabras.",
            texto: "En el mundo tendréis aflicción; pero [[confiad]], yo he [[vencido]] al mundo",
            apoyo: "Dios no es indiferente, porque en Cristo sufrió por nosotros",
            explica: "Jesús no esconde la aflicción, pero nos pide confiar: Él ha vencido al mundo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las preguntas sinceras y las excusas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todas las objeciones contra la fe son excusas para no creer.", verdad: false, explica: "Algunas objeciones son preguntas sinceras; otras, excusas.", apoyo: "Algunas son preguntas sinceras; otras, excusas." },
              { texto: "Tanto a una pregunta sincera como a una excusa se responde con amor y con la Palabra.", verdad: true, explica: "En los dos casos, la respuesta empieza con amor y con la Palabra.", apoyo: "En los dos casos, la respuesta empieza con amor y con la Palabra." },
              { texto: "La pregunta por el sufrimiento a veces nace de un dolor reciente.", verdad: true, explica: "Por eso, primero hay que acompañar y escuchar.", apoyo: "a veces nace de un dolor reciente" },
            ],
          },
          {
            consigna: "Sobre las preguntas sinceras y las excusas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una pregunta sincera merece una respuesta sincera.", verdad: true, explica: "Así lo dice la lección, aunque esa respuesta sea un no lo sé.", apoyo: "Una pregunta sincera merece una respuesta sincera" },
              { texto: "A quien pone excusas se le responde con dureza y sin amor.", verdad: false, explica: "En los dos casos, pregunta sincera o excusa, la respuesta empieza con amor y con la Palabra.", apoyo: "la respuesta empieza con amor y con la Palabra" },
              { texto: "Ante alguien que sufre una pérdida reciente, lo primero es explicarle de dónde viene el mal.", verdad: false, explica: "Primero hay que acompañar y escuchar; después se puede hablar de lo que dice la Biblia.", apoyo: "primero hay que acompañar y escuchar" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu vecina Carmen, que perdió a su esposo hace un mes, te dice: ¿Por qué Dios permitió esto?",
            pregunta: "¿Qué haces primero?",
            opciones: [
              { texto: "La acompañas y la escuchas; después, si ella quiere, hablan de lo que dice la Biblia.", bien: true, explica: "Es una pregunta sincera que nace de un dolor reciente: primero hay que acompañar y escuchar." },
              { texto: "Le explicas enseguida, con muchos versículos, cómo entró el mal al mundo por el pecado.", explica: "Lo que enseña la Biblia es verdad, pero primero hay que acompañar y escuchar a quien sufre." },
              { texto: "Le dices que esa pregunta es solo una excusa para no acercarse a Dios.", explica: "No todas las objeciones son excusas: esta nace de un dolor reciente y merece una respuesta sincera." },
              { texto: "Cambias de tema rápido, porque no sabes qué decirle y te incomoda su dolor.", explica: "Huir de su dolor la deja sola: lo primero es acompañarla y escucharla." },
            ],
            apoyo: "Es la pregunta más honda, y a veces nace de un dolor reciente",
            ref: "Juan 16:33; Apocalipsis 21:4",
            explica: "Ante una pregunta sincera nacida del dolor, primero se acompaña y se escucha; la respuesta empieza con amor.",
          },
          {
            caso: "Tu compañero Javier te dice: Ahora no tengo tiempo para Dios; ya me ocuparé cuando sea viejo.",
            pregunta: "¿Qué le respondes con amor y con la Palabra?",
            opciones: [
              { texto: "Nadie sabe si tendrá un mañana; la Biblia dice que hoy es el día de salvación.", bien: true, explica: "Responde con amor y con la Palabra: nadie sabe si tendrá un mañana, y hoy es el día de salvación." },
              { texto: "Está bien, no te preocupes: cuando seas mayor tendrás tiempo de sobra para Dios.", explica: "Nadie sabe si tendrá un mañana: la Biblia dice que hoy es el día de salvación." },
              { texto: "Eso es solo una excusa, y lo sabes; no me engañas con ese cuento de siempre.", explica: "Aunque sea una excusa, la respuesta empieza con amor y con la Palabra, no con un reproche." },
              { texto: "Bueno, entonces no te vuelvo a hablar de Dios nunca más; tú sabrás lo que haces.", explica: "Rendirse no es la respuesta: a una excusa también se responde con amor y con la Palabra." },
            ],
            apoyo: "Ahora no tengo tiempo: nadie sabe si tendrá un mañana, y hoy es el día de salvación",
            ref: "2 Corintios 6:2",
            explica: "Sea una pregunta sincera o una excusa, la respuesta empieza con amor y con la Palabra.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué hacer cuando no sabes la respuesta.",
            texto: "Si no sabes la respuesta, puedes decir con [[sencillez]] que no lo sabes, que lo vas a [[estudiar]] y que después le [[contarás]]. La humildad abre más puertas que una respuesta [[inventada]].",
            distractores: ["enojo", "inventar", "ocultarás", "sincera"],
            errores: {
              enojo: "Se dice con sencillez: no tienes que saberlo todo.",
              inventar: "Lo que toca es estudiarlo: una respuesta inventada cierra puertas.",
              ocultarás: "Después le cuentas lo que estudiaste: así cumples lo que le dijiste.",
              sincera: "Una respuesta sincera es buena: la que no ayuda es la inventada.",
            },
            apoyo: "La humildad abre más puertas que una respuesta inventada.",
            explica: "No tienes que saberlo todo: decir que no lo sabes, estudiarlo y contarle después muestra humildad.",
          },
          {
            consigna: "Completa por qué no hace falta saberlo todo.",
            texto: "Una pregunta sincera merece una respuesta [[sincera]], aunque sea un no lo sé. No hace falta inventar: la [[humildad]] abre más [[puertas]] que una respuesta inventada.",
            distractores: ["rápida", "arrogancia", "discusiones"],
            errores: {
              rápida: "Lo que importa no es la rapidez: una pregunta sincera merece una respuesta sincera.",
              arrogancia: "La arrogancia cierra la conversación; la humildad abre puertas.",
              discusiones: "La humildad no abre discusiones: abre puertas para seguir hablando.",
            },
            apoyo: "Una pregunta sincera merece una respuesta sincera, aunque sea un no lo sé.",
            explica: "Decir que no lo sabes, con humildad, es mejor que inventar: así la conversación sigue abierta.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "No tienes que saberlo todo.",
            clave: {
              id: "pr-n2-evangelismo-personal-4-a7-1",
              tipo: "corta",
              pregunta: "Un amigo te hace una pregunta sobre la fe y no sabes qué responderle. ¿Qué le dices?",
              ideas: [
                { id: "nose", peso: 40, texto: "Le dices con sencillez que no lo sabes.", formas: ["no lo se", "no se la respuesta", "no tengo la respuesta", "no lo sabes", "no lo sabia", "no se"], negativa: true },
                { id: "estudio", peso: 30, texto: "Le dices que lo vas a estudiar y que después le contarás.", formas: ["estudi*", "investig*", "buscar* la respuesta", "le cuento", "le contare", "despues le"] },
                { id: "humildad", peso: 30, texto: "La humildad abre más puertas que una respuesta inventada.", formas: ["humild*", "abre puertas", "sencillez", "inventad*"] },
              ],
              errores: [
                { id: "inventar", texto: "Inventar una respuesta no ayuda: la humildad abre más puertas que una respuesta inventada.", formas: ["le invento", "invento algo", "inventar algo", "invento una respuesta", "invento la respuesta", "inventarle"], anula: "nose" },
              ],
              modelo: "Le digo con sencillez que no lo sé, que lo voy a estudiar y que después le contaré lo que encontré. La humildad abre más puertas que una respuesta inventada.",
            },
          },
          {
            apoyo: "Una pregunta sincera merece una respuesta sincera, aunque sea un no lo sé.",
            clave: {
              id: "pr-n2-evangelismo-personal-4-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué es mejor reconocer que no sabes algo que inventar una respuesta?",
              ideas: [
                { id: "humildad", peso: 50, texto: "La humildad abre más puertas que una respuesta inventada.", formas: ["humild*", "abre puertas", "abre mas puertas"] },
                { id: "sincera", peso: 50, texto: "Una pregunta sincera merece una respuesta sincera.", formas: ["sincer*", "honest*", "la verdad"] },
              ],
              modelo: "Porque la humildad abre más puertas que una respuesta inventada. Una pregunta sincera merece una respuesta sincera, aunque sea decir que no lo sé y que lo voy a estudiar.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. La invitación y la seguridad de la salvación
    "n2-evangelismo-personal-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué respondió Pedro cuando la gente preguntó qué haría?", reverso: "Respondió con claridad: «Arrepentíos».", apoyo: "Pedro respondió con claridad" },
              { frente: "¿Qué es arrepentirse?", reverso: "Cambiar de mente y de dirección: dejar el pecado y volverse a Dios.", apoyo: "Arrepentirse es cambiar de mente y de dirección" },
              { frente: "¿Qué es creer?", reverso: "Confiar en Jesús como Salvador y Señor.", apoyo: "Creer es confiar en Jesús como Salvador y Señor." },
              { frente: "¿Qué hacían siempre Jesús y los apóstoles después de anunciar el mensaje?", reverso: "Invitaban a responder.", apoyo: "Jesús y los apóstoles siempre invitaban a responder" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Hay palabras mágicas para recibir a Cristo?", reverso: "No: Dios mira el corazón que se arrepiente y cree.", apoyo: "Explica que no hay palabras mágicas" },
              { frente: "¿Entre quiénes es la decisión de recibir a Cristo?", reverso: "Entre la persona y Dios.", apoyo: "la decisión es entre la persona y Dios" },
              { frente: "¿De qué depende la seguridad de la salvación?", reverso: "De la promesa de Dios, no de lo que se siente.", apoyo: "La seguridad no depende de lo que se siente, sino de la promesa de Dios" },
              { frente: "¿Qué hacer si la persona dice que todavía no quiere recibir a Cristo?", reverso: "Respetar su decisión, seguir siendo su amigo y seguir orando.", apoyo: "Respeta su decisión, sigue siendo su amigo y sigue orando." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué es arrepentirse y qué es creer? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pecado", texto: "El pecado", x: 25, y: 10 },
              { id: "arr", texto: "Arrepentirse", x: 25, y: 50 },
              { id: "dios", texto: "Dios", x: 25, y: 90 },
              { id: "creer", texto: "Creer", x: 75, y: 30 },
              { id: "jesus", texto: "Jesús, Salvador y Señor", x: 75, y: 70 },
            ],
            enlaces: [
              { de: "arr", a: "pecado", relacion: "es dejar" },
              { de: "arr", a: "dios", relacion: "es volverse a" },
              { de: "creer", a: "jesus", relacion: "es confiar en" },
            ],
            distractores: ["es esconder", "es alejarse de"],
            apoyo: "Arrepentirse es cambiar de mente y de dirección: dejar el pecado y volverse a Dios.",
            ref: "Hechos 2:38",
            explica: "Arrepentirse es dejar el pecado y volverse a Dios; creer es confiar en Jesús como Salvador y Señor.",
          },
          {
            consigna: "¿Qué mira Dios cuando alguien recibe a Cristo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 30, y: 8 },
              { id: "corazon", texto: "El corazón de la persona", x: 30, y: 40 },
              { id: "jesus", texto: "Jesús", x: 80, y: 70 },
              { id: "pecado", texto: "El pecado", x: 30, y: 92 },
            ],
            enlaces: [
              { de: "dios", a: "corazon", relacion: "mira" },
              { de: "corazon", a: "pecado", relacion: "se arrepiente de" },
              { de: "corazon", a: "jesus", relacion: "cree en" },
            ],
            distractores: ["cuenta las palabras de", "se aleja de"],
            apoyo: "Dios mira el corazón que se arrepiente y cree",
            ref: "Romanos 10:9-10",
            explica: "No hay palabras mágicas: Dios mira el corazón que se arrepiente de su pecado y cree en Jesús.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es invitar con sencillez o es presionar? Lleva cada frase a su grupo.",
            grupos: ["Invitar con sencillez", "Presionar o manipular"],
            frases: [
              { texto: "Preguntar si algo le impide recibir hoy a Cristo", grupo: 0 },
              { texto: "Explicarle que no hay palabras mágicas", grupo: 0 },
              { texto: "Invitarla a orar con sus propias palabras", grupo: 0 },
              { texto: "Insistir hasta que diga que sí", grupo: 1, explica: "Nunca presiones: la decisión es entre la persona y Dios." },
              { texto: "Asustarla para que ore en ese mismo momento", grupo: 1, explica: "Eso es manipular: invitar no es presionar." },
              { texto: "Pedirle que ore para no quedar mal contigo", grupo: 1, explica: "La decisión es entre la persona y Dios, no para quedar bien con nadie." },
            ],
            apoyo: "Nunca presiones ni manipules: la decisión es entre la persona y Dios.",
            explica: "Invitar no es presionar: es ofrecer el regalo de Dios. La decisión es entre la persona y Dios.",
          },
          {
            consigna: "¿Es guiar con sencillez o es presionar y confundir? Lleva cada frase a su grupo.",
            grupos: ["Guiar con sencillez", "Presionar o confundir"],
            frases: [
              { texto: "Orar juntos una oración sencilla, si ella lo desea", grupo: 0 },
              { texto: "Dejar que ore con sus propias palabras", grupo: 0 },
              { texto: "Explicarle que Dios mira el corazón", grupo: 0 },
              { texto: "Hacerle repetir una fórmula exacta para que funcione", grupo: 1, explica: "No hay palabras mágicas: Dios mira el corazón que se arrepiente y cree." },
              { texto: "Decirle que si no ora hoy, ya no tendrá otra oportunidad", grupo: 1, explica: "Eso es presionar; además, muchas personas creen después de escuchar el evangelio varias veces." },
              { texto: "Presionarla delante de otros para que diga que sí", grupo: 1, explica: "Nunca presiones ni manipules: la decisión es entre la persona y Dios." },
            ],
            apoyo: "Invítala a orar con sus propias palabras, o a repetir contigo una oración sencilla",
            ref: "Romanos 10:9-10",
            explica: "Se guía con sencillez y sin presión: no hay palabras mágicas, y la decisión es entre la persona y Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu vecina Elena, después de escuchar el evangelio, te dice: Todavía no estoy lista para decidir.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Respetas su decisión, sigues siendo su amiga y la invitas a leer el Evangelio de Juan.", bien: true, explica: "Es lo que enseña la lección: respetar su decisión, seguir siendo su amigo, orar y dejar la puerta abierta." },
              { texto: "Le insistes un buen rato más, porque quizás después ya no quiera volver a escucharte nunca.", explica: "Nunca presiones ni manipules: muchas personas creen después de escuchar el evangelio varias veces." },
              { texto: "Te alejas de ella: ya hiciste tu parte, y si no quiso, no es tu problema.", explica: "Si dice que todavía no, sigue siendo su amigo y sigue orando: la puerta queda abierta." },
              { texto: "Le pides que repita contigo una oración ahora mismo, aunque te diga que no está lista.", explica: "Hacerla orar sin estar lista es presionarla: la decisión es entre la persona y Dios." },
            ],
            apoyo: "Muchas personas creen después de escuchar el evangelio varias veces.",
            explica: "Invitar no es presionar: si dice que todavía no, la amistad y la oración siguen, y la puerta queda abierta.",
          },
          {
            caso: "Tu amigo Raúl, después de escuchar el evangelio, te dice: Creo que lo entiendo... ¿y ahora qué hago?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Puedes arrepentirte y creer en Jesús hoy. ¿Algo te impide recibirlo?", bien: true, explica: "Como Pedro, invita a responder con claridad y pregunta con sencillez si algo le impide recibir a Cristo." },
              { texto: "Nada más: ya que lo entiendes, eres salvo y no hace falta que hagas nada.", explica: "Entender el evangelio no basta: Jesús y los apóstoles siempre invitaban a responder, a arrepentirse y creer." },
              { texto: "Primero tienes que portarte mejor unos meses; después podrás recibir a Jesús.", explica: "Pedro no les pidió esperar: les dijo con claridad que se arrepintieran." },
              { texto: "Repite exactamente estas palabras, porque si cambias una ya no va a funcionar.", explica: "No hay palabras mágicas: Dios mira el corazón que se arrepiente y cree." },
            ],
            apoyo: "Pregunta con sencillez si hay algo que le impida recibir hoy a Cristo.",
            ref: "Hechos 2:37-38",
            explica: "Cuando alguien entiende el evangelio, lo invitamos a responder con sencillez, sin presión ni palabras mágicas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Juan 5:12",
            consigna: "Un amigo que acaba de creer duda de su salvación. ¿A quién hay que tener y qué se tiene con Él? Toca las dos palabras.",
            texto: "El que tiene al [[Hijo]], tiene la [[vida]]",
            apoyo: "La seguridad no depende de lo que se siente, sino de la promesa de Dios",
            explica: "La seguridad descansa en la promesa de Dios: el que tiene al Hijo, tiene la vida.",
          },
          {
            ref: "1 Juan 5:13",
            consigna: "Juan escribió para que los creyentes estuvieran seguros. ¿Qué pueden saber que tienen? Toca las dos palabras.",
            texto: "para que sepáis que tenéis [[vida]] [[eterna]]",
            apoyo: "La seguridad no depende de lo que se siente",
            explica: "Juan escribió para que los creyentes sepan que tienen vida eterna: la seguridad está en la promesa de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La seguridad no depende de lo que se siente, sino de la promesa de Dios",
            ref: "1 Juan 5:11-13",
            clave: {
              id: "pr-n2-evangelismo-personal-5-a6-1",
              tipo: "corta",
              pregunta: "Tu amigo acaba de recibir a Cristo y te pregunta cómo puede estar seguro de su salvación. ¿Qué le explicas?",
              ideas: [
                { id: "promesa", peso: 50, texto: "La seguridad está en la promesa de Dios, no en lo que se siente.", formas: ["promesa*", "lo que dios (dice|dijo|promete|prometio)", "dios (promete|prometio)", "su palabra", "la biblia dice"] },
                { id: "hijo", peso: 50, texto: "El que tiene al Hijo tiene la vida: Dios quiere que sepamos que tenemos vida eterna.", formas: ["tiene al hijo", "tiene a jesus", "tiene la vida", "vida eterna", "para que sepa*", "sepais"] },
              ],
              modelo: "Le explico que su seguridad no depende de lo que siente, sino de la promesa de Dios. Juan escribió para que sepamos que tenemos vida eterna: el que tiene al Hijo, tiene la vida.",
            },
          },
          {
            apoyo: "a quien cree le mostramos la seguridad de la salvación en la promesa de Dios",
            ref: "1 Juan 5:12",
            clave: {
              id: "pr-n2-evangelismo-personal-5-a6-2",
              tipo: "corta",
              pregunta: "Una amiga que creyó ayer te dice que hoy no siente nada distinto y duda de ser salva. ¿Qué le explicas?",
              ideas: [
                { id: "sentir", peso: 50, texto: "La seguridad no depende de lo que se siente.", formas: ["no depende de lo que (siente|sientes|sienta|sienten)", "no depende de lo que se siente", "no depende de (sus|tus|los) sentimientos", "aunque no (sienta|sientas|siente)", "sentimientos cambian", "no es lo que (siente|sientes)"], negativa: true },
                { id: "promesa", peso: 50, texto: "Depende de la promesa de Dios: el que tiene al Hijo tiene la vida.", formas: ["promesa*", "tiene al hijo", "tiene la vida", "lo que dios (dice|dijo|prometio|promete)"] },
              ],
              modelo: "Le explico que la seguridad no depende de lo que siente, sino de la promesa de Dios. La Biblia dice que el que tiene al Hijo, tiene la vida, y ella recibió a Jesús.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. El seguimiento: hacer discípulos
    "n2-evangelismo-personal-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿La gran comisión termina en una decisión?", reverso: "No: termina en hacer discípulos.", apoyo: "La gran comisión no termina en una decisión, sino en hacer discípulos." },
              { frente: "Además de bautizar, ¿qué mandó Jesús en Mateo 28?", reverso: "Enseñarles a guardar todo lo que Él mandó.", apoyo: "Jesús no mandó solo a predicar, sino a hacer discípulos" },
              { frente: "¿Qué les pasa a muchos nuevos creyentes sin acompañamiento?", reverso: "Se enfrían.", apoyo: "sin acompañamiento, muchos se enfrían" },
              { frente: "¿Qué les dio Pablo a los nuevos creyentes, además del evangelio?", reverso: "Su propia vida.", apoyo: "No les dio solo el evangelio, sino también su propia vida." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el fruto del evangelismo personal?", reverso: "Un discípulo que un día hará discípulos.", apoyo: "El fruto del evangelismo personal es un discípulo que un día hará discípulos." },
              { frente: "¿Qué le pidió Pablo a Timoteo en 2 Timoteo 2:2?", reverso: "Que encargara lo que había oído a hombres fieles, idóneos para enseñar también a otros.", apoyo: "Pablo le pidió a Timoteo que encargara lo que había oído a hombres fieles" },
              { frente: "¿Qué se hace siempre con el nuevo creyente?", reverso: "Estar disponible, orar por él y celebrar sus pasos.", apoyo: "Siempre: estar disponible, orar por él y celebrar sus pasos." },
              { frente: "¿Cuánto toma hacer un discípulo?", reverso: "Es un camino; ganar a alguien para Cristo toma un día.", apoyo: "Ganar a alguien para Cristo toma un día; hacer un discípulo es un camino." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 28:19-20",
            consigna: "Hacer discípulos incluye el seguimiento. Toca la palabra que dice lo que hacemos nosotros y la que dice lo que hacen ellos.",
            texto: "[[enseñándoles]] que [[guarden]] todas las cosas que os he mandado",
            apoyo: "El seguimiento es parte de la misma comisión.",
            explica: "Jesús no mandó solo a predicar: mandó enseñar a los discípulos a guardar todo lo que Él mandó. Por eso el seguimiento es parte de la comisión.",
          },
          {
            ref: "1 Tesalonicenses 2:7",
            consigna: "Pablo cuidaba a los nuevos creyentes como una nodriza. Toca la palabra que dice cómo cuida y la que dice a quiénes.",
            texto: "como la nodriza que cuida con [[ternura]] a sus propios [[hijos]]",
            apoyo: "No les dio solo el evangelio, sino también su propia vida.",
            explica: "Pablo cuidaba a los nuevos creyentes con ternura, como a sus propios hijos: no les dio solo el evangelio, sino también su propia vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Dónde termina la gran comisión? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "comision", texto: "La gran comisión", x: 50, y: 15 },
              { id: "decision", texto: "Una decisión", x: 20, y: 60 },
              { id: "discipulos", texto: "Hacer discípulos", x: 80, y: 40 },
              { id: "fruto", texto: "Un discípulo que hará discípulos", x: 50, y: 85 },
            ],
            enlaces: [
              { de: "comision", a: "decision", relacion: "no termina en" },
              { de: "comision", a: "discipulos", relacion: "termina en" },
              { de: "discipulos", a: "fruto", relacion: "da como fruto" },
            ],
            distractores: ["es lo mismo que"],
            apoyo: "La gran comisión no termina en una decisión, sino en hacer discípulos.",
            ref: "Mateo 28:19-20",
            explica: "La gran comisión no termina cuando alguien decide creer: sigue hasta hacer discípulos, y su fruto es un discípulo que un día hará discípulos.",
          },
          {
            consigna: "¿Cómo pasa la fe de unos a otros? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "tu", texto: "Tú", x: 50, y: 15 },
              { id: "nuevo", texto: "El nuevo creyente", x: 50, y: 50 },
              { id: "otros", texto: "Otros", x: 50, y: 85 },
            ],
            enlaces: [
              { de: "tu", a: "nuevo", relacion: "acompañas y formas a" },
              { de: "nuevo", a: "otros", relacion: "también forma a" },
            ],
            distractores: ["dejas solo a", "se aleja de"],
            apoyo: "lo formamos para que también forme a otros",
            ref: "2 Timoteo 2:2",
            explica: "Acompañamos y formamos al nuevo creyente para que también forme a otros, como Pablo con Timoteo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuándo va cada paso con el nuevo creyente? Lleva cada frase a su grupo.",
            grupos: ["Primeras 48 horas", "Primera semana", "Primer mes"],
            frases: [
              { texto: "Llamarlo o escribirle", grupo: 0 },
              { texto: "Responder sus dudas", grupo: 0 },
              { texto: "Darle una Biblia o el Evangelio de Juan", grupo: 0 },
              { texto: "Leer juntos un pasaje", grupo: 1 },
              { texto: "Llevarlo a la iglesia", grupo: 1 },
              { texto: "Presentarle a otros hermanos", grupo: 2 },
              { texto: "Acompañarlo hacia el bautismo", grupo: 2 },
              { texto: "Empezar con él el Nivel 1 de la Academia", grupo: 2 },
            ],
            apoyo: "En las primeras 48 horas: llamar o escribir, responder sus dudas y darle una Biblia o el Evangelio de Juan",
            ref: "Hechos 2:41-42",
            explica: "Primero el contacto y una Biblia; luego la Palabra y la iglesia; y en el primer mes, los hermanos, el bautismo y el Nivel 1.",
          },
          {
            consigna: "¿En qué momento va cada paso? Lleva cada frase a su grupo.",
            grupos: ["En las primeras 48 horas", "En la primera semana", "En el primer mes"],
            frases: [
              { texto: "Escribirle para saber cómo está", grupo: 0 },
              { texto: "Contestar las dudas que tenga", grupo: 0 },
              { texto: "Regalarle el Evangelio de Juan", grupo: 0 },
              { texto: "Leer con él un pasaje de la Biblia", grupo: 1 },
              { texto: "Invitarlo a ir juntos a la iglesia", grupo: 1 },
              { texto: "Acompañarlo hacia su bautismo", grupo: 2 },
              { texto: "Presentarle a otros hermanos de la iglesia", grupo: 2 },
              { texto: "Empezar juntos el Nivel 1 de la Academia", grupo: 2 },
            ],
            apoyo: "La primera semana: leer juntos un pasaje, orar y llevarlo a la iglesia.",
            ref: "Hechos 2:41-42",
            explica: "Los primeros pasos van por etapas: el contacto en las primeras 48 horas, la Palabra y la iglesia en la primera semana, y los hermanos, el bautismo y el Nivel 1 en el primer mes.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu compañero Martín, que recibió a Cristo anoche, te escribe: Gracias por hablarme de Jesús. ¿Y ahora qué sigue?",
            pregunta: "Son las primeras 48 horas. ¿Qué haces?",
            opciones: [
              { texto: "Lo llamas, respondes sus dudas y le das una Biblia o el Evangelio de Juan.", bien: true, explica: "Es el plan de las primeras 48 horas: llamar o escribir, responder sus dudas y darle una Biblia o el Evangelio de Juan." },
              { texto: "Le dices que ya está todo hecho y que, si un día tiene dudas, te busque.", explica: "La gran comisión no termina en una decisión: sin acompañamiento, muchos se enfrían." },
              { texto: "Lo inscribes de una vez en todos los ministerios de la iglesia, desde mañana.", explica: "Eso no está en el plan: en las primeras 48 horas toca llamarlo, responder sus dudas y darle una Biblia." },
              { texto: "Esperas un mes para darle tiempo a pensar, y después lo vuelves a buscar.", explica: "Un recién nacido necesita cuidado: el acompañamiento empieza en las primeras 48 horas." },
            ],
            apoyo: "Un recién nacido necesita cuidado.",
            explica: "El acompañamiento empieza enseguida: un nuevo creyente necesita cuidado, como un recién nacido.",
          },
          {
            caso: "Tu prima Ana, que creyó hace dos semanas, te dice: Ya voy a la iglesia, pero no conozco a nadie y tengo dudas sobre el bautismo.",
            pregunta: "Llega su primer mes. ¿Qué haces?",
            opciones: [
              { texto: "Le presentas a otros hermanos y la acompañas hacia el bautismo y el Nivel 1.", bien: true, explica: "Es el plan del primer mes: presentarle a otros hermanos, acompañarla hacia el bautismo y empezar con ella el Nivel 1." },
              { texto: "Le dices que ya va a la iglesia los domingos y que con eso es suficiente para crecer.", explica: "Ir a la iglesia es un gran paso, pero acompañarla es más: los hermanos, el bautismo y el Nivel 1." },
              { texto: "Le das un libro grueso sobre el bautismo para que lo estudie ella sola.", explica: "Acompañar es caminar con ella: Pablo no les dio solo el evangelio, sino también su propia vida." },
              { texto: "Esperas a que ella misma se presente a los demás cuando por fin se anime.", explica: "Presentarle a otros hermanos es parte del acompañamiento del primer mes: no hay que esperar." },
            ],
            apoyo: "El primer mes: presentarle a otros hermanos, acompañarlo hacia el bautismo y empezar con él el Nivel 1 de la Academia.",
            ref: "Hechos 2:41-42",
            explica: "Acompañar es caminar con el nuevo creyente en cada etapa, hasta que también pueda formar a otros.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Ganar a alguien para Cristo toma un día; hacer un discípulo es un camino.",
            ref: "1 Tesalonicenses 2:7-8",
            clave: {
              id: "pr-n2-evangelismo-personal-6-a6-1",
              tipo: "corta",
              pregunta: "Un amigo acaba de recibir a Cristo. Escribe un plan para acompañarlo en sus primeras semanas.",
              ideas: [
                { id: "inicio", peso: 34, texto: "En las primeras 48 horas: llamarlo, responder sus dudas y darle una Biblia o el Evangelio de Juan.", formas: ["48 horas", "llam*", "dudas", "biblia", "evangelio de juan"] },
                { id: "semana", peso: 33, texto: "La primera semana: leer juntos un pasaje, orar y llevarlo a la iglesia.", formas: ["primera semana", "leer juntos", "leemos juntos", "pasaje", "oramos", "orar juntos", "iglesia"] },
                { id: "mes", peso: 33, texto: "El primer mes: presentarle a otros hermanos, acompañarlo hacia el bautismo y empezar el Nivel 1.", formas: ["primer mes", "hermanos", "bautism*", "nivel 1", "academia"] },
              ],
              modelo: "En las primeras 48 horas lo llamo, respondo sus dudas y le doy el Evangelio de Juan. La primera semana leemos juntos un pasaje, oramos y lo llevo a la iglesia. El primer mes le presento a otros hermanos y lo acompaño hacia el bautismo.",
            },
          },
          {
            apoyo: "El primer mes: presentarle a otros hermanos, acompañarlo hacia el bautismo y empezar con él el Nivel 1 de la Academia.",
            ref: "Hechos 2:41-42",
            clave: {
              id: "pr-n2-evangelismo-personal-6-a6-2",
              tipo: "corta",
              pregunta: "Tu vecina recibió a Cristo hace una semana. ¿Qué harás con ella durante su primer mes?",
              ideas: [
                { id: "hermanos", peso: 35, texto: "Presentarle a otros hermanos.", formas: ["hermanos", "present*"] },
                { id: "bautismo", peso: 35, texto: "Acompañarla hacia el bautismo.", formas: ["bautism*", "bautiz*"] },
                { id: "nivel", peso: 30, texto: "Empezar con ella el Nivel 1 de la Academia.", formas: ["nivel 1", "nivel uno", "academia"] },
              ],
              modelo: "Durante su primer mes le presento a otros hermanos de la iglesia, la acompaño hacia el bautismo y empiezo con ella el Nivel 1 de la Academia. Y siempre oro por ella y celebro sus pasos.",
            },
          },
        ],
      },
    ],
  },
};
