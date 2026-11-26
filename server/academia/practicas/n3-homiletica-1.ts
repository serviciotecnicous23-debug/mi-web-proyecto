/**
 * Las prácticas de «Homilética I» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-homiletica-1.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_HOMILETICA_1: PracticasMateria = {
  materia: "n3-homiletica-1",
  mision: {
    titulo: "Del pasaje a tu enseñanza grabada",
    intro: "Tu pastor te pidió el devocional del próximo culto de hogar, y será también tu ensayo para la enseñanza grabada del Nivel 3. Vas a recorrer todo el camino: recibir el encargo, partir del texto, escribir la idea central y el propósito, armar el bosquejo, ilustrar y aplicar con Cristo en el centro, y hablar aunque sientas temor. Repasa las seis lecciones para tener listo cada paso.",
    cierre: "Ya sabes preparar y dar una enseñanza bíblica breve: partir de un pasaje completo, decir en una frase la idea central, buscar el propósito del texto, ordenar el mensaje en introducción, desarrollo y conclusión, ilustrarlo con verdad, aplicarlo con la gracia de Cristo y hablar dependiendo del Espíritu. El que te envía a hablar promete estar con tu boca.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El encargo de predicar y enseñar
    "n3-homiletica-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Desde dónde le dejó Pablo su encargo a Timoteo?", reverso: "Desde la cárcel, al final de su vida.", apoyo: "Al final de su vida, desde la cárcel, Pablo le dejó a Timoteo un encargo solemne" },
              { frente: "¿Qué es predicar la Palabra?", reverso: "Anunciar lo que Dios dijo, no nuestras opiniones.", apoyo: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones" },
              { frente: "Según el encargo, ¿cuándo se predica la Palabra?", reverso: "A tiempo y fuera de tiempo: con constancia, convenga o no.", apoyo: "y hacerlo con constancia, convenga o no" },
              { frente: "¿En qué se diferencian un devocional y una predicación, y en qué se parecen?", reverso: "Cambia el tamaño, pero tienen los mismos principios.", apoyo: "tienen tamaños distintos, pero los mismos principios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el versículo de memoria de esta materia?", reverso: "El encargo a Timoteo: «que prediques la palabra; que instes a tiempo y fuera de tiempo».", apoyo: "Es el versículo de memoria de esta materia" },
              { frente: "¿Qué tres acciones añade Pablo al encargo de predicar?", reverso: "Redargüir, reprender y exhortar, «con toda paciencia y doctrina».", apoyo: "Pablo añade cómo: redarguyendo, reprendiendo y exhortando, «con toda paciencia y doctrina»" },
              { frente: "¿Qué hacían los levitas al leer la ley, en Nehemías?", reverso: "La leían con claridad y ponían el sentido, para que entendieran la lectura.", apoyo: "los levitas leían la ley «claramente, y ponían el sentido, de modo que entendiesen la lectura»" },
              { frente: "¿Por dónde conviene empezar antes de predicar ante muchos?", reverso: "Por un devocional de cinco minutos o un estudio en un grupo pequeño.", apoyo: "Antes de predicar ante muchos, aprende a dar bien un devocional de cinco minutos o un estudio en un grupo pequeño" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es predicar y enseñar la Palabra.",
            texto: "Predicar y enseñar es [[anunciar]] lo que [[Dios]] dijo, con constancia, [[paciencia]] y doctrina.",
            distractores: ["cambiar", "alguien", "prisa"],
            errores: {
              cambiar: "Predicar es anunciar lo que Dios dijo, sin cambiarlo ni ponerle nuestras opiniones.",
              alguien: "Se anuncia lo que Dios dijo, no lo que dijo cualquiera.",
              prisa: "Pablo pide predicar «con toda paciencia y doctrina».",
            },
            apoyo: "Predicar y enseñar es anunciar lo que Dios dijo, con constancia, paciencia y doctrina",
            ref: "2 Timoteo 4:1-2",
            explica: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones, y hacerlo con constancia, convenga o no, «con toda paciencia y doctrina».",
          },
          {
            consigna: "Completa lo que Pablo le pidió a Timoteo.",
            texto: "Al final de su vida, desde la [[cárcel]], Pablo le pidió a Timoteo que [[predicara]] la [[Palabra]].",
            distractores: ["sinagoga", "olvidara", "opinión"],
            errores: {
              sinagoga: "Pablo le dejó su encargo desde la cárcel, al final de su vida.",
              olvidara: "Pablo le pidió a Timoteo que predicara la Palabra.",
              "opinión": "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones.",
            },
            apoyo: "Al final de su vida, desde la cárcel, Pablo le dejó a Timoteo un encargo solemne, delante de Dios y de Cristo",
            ref: "2 Timoteo 4:1-2",
            explica: "Pablo no le pidió a Timoteo que fuera famoso ni elocuente: le pidió que predicara la Palabra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada tarea o ejemplo con lo que enseña la lección.",
            pares: [
              ["Proclamar", "Anunciar la buena noticia y llamar a responder"],
              ["Enseñar", "Explicar con orden para que los creyentes crezcan"],
              ["Jesús en Galilea", "Enseñaba y predicaba: las dos tareas van juntas"],
              ["Un devocional o una predicación", "Tamaños distintos, pero los mismos principios"],
            ],
            apoyo: "Proclamar es anunciar la buena noticia y llamar a responder",
            ref: "Mateo 4:23",
            explica: "Proclamar es anunciar la buena noticia y llamar a responder; enseñar es explicar con orden para que los creyentes crezcan. Jesús hacía las dos cosas: van juntas.",
          },
          {
            consigna: "Une cada pregunta con su respuesta.",
            pares: [
              ["¿Qué hace el que proclama?", "Anuncia la buena noticia y llama a responder"],
              ["¿Para qué se enseña con orden?", "Para que los creyentes crezcan"],
              ["¿Qué hacía Jesús al recorrer Galilea?", "Enseñaba en las sinagogas y predicaba el evangelio"],
              ["¿Qué comparten un estudio en grupo y una clase?", "Los mismos principios, aunque cambie el tamaño"],
            ],
            apoyo: "Enseñar es explicar con orden para que los creyentes crezcan",
            ref: "Mateo 4:23",
            explica: "Jesús recorría Galilea enseñando y predicando. Proclamar anuncia la buena noticia y llama a responder; enseñar explica con orden para que los creyentes crezcan.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre proclamar y enseñar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Proclamar es anunciar la buena noticia y llamar a responder.", verdad: true, explica: "Así lo dice la lección: proclamar es anunciar la buena noticia y llamar a responder.", apoyo: "Proclamar es anunciar la buena noticia y llamar a responder" },
              { texto: "Proclamar y enseñar son tareas separadas que no van juntas.", verdad: false, explica: "Jesús recorría Galilea enseñando y predicando el evangelio: las dos tareas van juntas.", apoyo: "Las dos tareas van juntas", ref: "Mateo 4:23" },
              { texto: "Un devocional y una predicación tienen los mismos principios.", verdad: true, explica: "Tienen tamaños distintos, pero los mismos principios.", apoyo: "tienen tamaños distintos, pero los mismos principios" },
            ],
          },
          {
            consigna: "Sobre la tarea de enseñar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Enseñar es explicar con orden para que los creyentes crezcan.", verdad: true, explica: "Así lo dice la lección: enseñar es explicar con orden para que los creyentes crezcan.", apoyo: "Enseñar es explicar con orden para que los creyentes crezcan" },
              { texto: "En Galilea, Jesús predicaba el evangelio, pero nunca enseñaba.", verdad: false, explica: "Jesús recorría Galilea «enseñando en las sinagogas de ellos, y predicando el evangelio del reino».", apoyo: "Jesús recorría Galilea «enseñando en las sinagogas de ellos, y predicando el evangelio del reino»", ref: "Mateo 4:23" },
              { texto: "Un estudio en grupo sigue principios distintos a los de una predicación.", verdad: false, explica: "Un devocional, un estudio en un grupo, una clase o una predicación tienen tamaños distintos, pero los mismos principios.", apoyo: "Un devocional, un estudio en un grupo, una clase o una predicación tienen tamaños distintos, pero los mismos principios" },
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
            consigna: "Pablo no predicó en Corinto con palabras persuasivas. ¿Con qué predicó? Toca las palabras que lo dicen.",
            texto: "con palabras persuasivas de humana sabiduría, sino con [[demostración del Espíritu y de poder]]",
            apoyo: "Prepararse bien es un deber, pero la fe de los oyentes debe apoyarse en el poder de Dios, no en el talento del que habla",
            ref: "1 Corintios 2:4",
            explica: "Pablo era un hombre muy preparado, pero su predicación fue con demostración del Espíritu y de poder: la fe de los oyentes debe apoyarse en el poder de Dios.",
          },
          {
            consigna: "Según Pedro, ¿cómo debe hablar el que habla de parte de Dios? Toca las palabras que lo dicen.",
            texto: "Si alguno habla, hable [[conforme a las palabras de Dios]]",
            apoyo: "Quien enseña debe hacerlo con temor de Dios, fiel al texto, y vivir primero lo que enseña",
            ref: "1 Pedro 4:11",
            explica: "Santiago advierte que los maestros recibirán un juicio más estricto, y Pedro pide hablar conforme a las palabras de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Me pidieron dar el devocional, pero no hablo bonito como el pastor. Mejor que lo dé otro.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que se prepare bien y confíe en el poder de Dios, no en su talento.", bien: true, explica: "Prepararse bien es un deber, y la fe de los oyentes debe apoyarse en el poder de Dios, no en el talento del que habla." },
              { texto: "Que tiene razón: solo deben enseñar los que hablan con elocuencia.", explica: "Pablo, un hombre muy preparado, no predicó con palabras persuasivas de humana sabiduría: el poder no está en la elocuencia." },
              { texto: "Que no se prepare nada: si Dios quiere hablar, hablará de todos modos.", explica: "Prepararse bien es un deber: el que enseña se prepara y depende del poder del Espíritu." },
              { texto: "Que aprenda frases que impresionen, para que el grupo la tome en serio.", explica: "La predicación de Pablo no fue con palabras persuasivas de humana sabiduría, sino con demostración del Espíritu y de poder." },
            ],
            apoyo: "Prepararse bien es un deber, pero la fe de los oyentes debe apoyarse en el poder de Dios, no en el talento del que habla",
            ref: "1 Corintios 2:3-5",
            explica: "Pablo llegó a Corinto con debilidad y mucho temor, y su predicación fue con demostración del Espíritu y de poder: el que enseña se prepara bien y depende del poder de Dios.",
          },
          {
            caso: "Un joven que predica en el culto de jóvenes te dice: Lo que enseño es una cosa y cómo vivo es otra; lo importante es que guste.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Que el que enseña vive primero lo que enseña, con temor de Dios.", bien: true, explica: "Quien enseña debe hacerlo con temor de Dios, fiel al texto, y vivir primero lo que enseña." },
              { texto: "Que tiene razón: al maestro nadie le pide cuentas de lo que enseña.", explica: "Santiago advierte que los maestros recibirán un juicio más estricto." },
              { texto: "Que le añada sus opiniones al texto, para que el mensaje guste más.", explica: "Pedro pide: «Si alguno habla, hable conforme a las palabras de Dios»." },
              { texto: "Que mientras el grupo se emocione, no importa si es fiel al texto.", explica: "Quien enseña debe hacerlo con temor de Dios y fiel al texto." },
            ],
            apoyo: "Quien enseña debe hacerlo con temor de Dios, fiel al texto, y vivir primero lo que enseña",
            ref: "Santiago 3:1",
            explica: "Santiago advierte que los maestros recibirán un juicio más estricto. Por eso quien enseña lo hace con temor de Dios, fiel al texto, y vive primero lo que enseña.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones, y hacerlo con constancia, convenga o no",
            ref: "2 Timoteo 4:1-2",
            clave: {
              id: "pr-n3-homiletica-1-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le encargó Pablo a Timoteo en 2 Timoteo 4:1-2, y cómo debía cumplirlo?",
              ideas: [
                { id: "palabra", peso: 50, texto: "Que predicara la Palabra: que anunciara lo que Dios dijo, no sus opiniones.", formas: ["predica* la palabra", "predica* la biblia", "predica* las escrituras", "lo que dios dijo", "lo que dios dice", "lo que dijo dios", "lo que dice dios", "palabra de dios", "anunci* la palabra"] },
                { id: "constancia", peso: 50, texto: "Con constancia, a tiempo y fuera de tiempo, y con toda paciencia y doctrina.", formas: ["constan*", "fuera de tiempo", "convenga o no", "paciencia", "doctrina", "redargu*", "repren*", "exhort*", "siempre", "todo (momento|tiempo)"] },
              ],
              errores: [
                { id: "opiniones", texto: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones.", formas: ["predica* (sus|mis|nuestras|propias|tus) opiniones", "(hablar|hablara|hable|decir|dijera|diga|anunciar|anunciara) (sus|mis|nuestras|propias|tus) opiniones", "(hablar|hablara|hable) de (sus|mis|nuestras|propias|tus) opiniones"], anula: "palabra" },
              ],
              modelo: "Le encargó que predicara la Palabra, es decir, que anunciara lo que Dios dijo y no sus opiniones. Debía hacerlo con constancia, a tiempo y fuera de tiempo, redarguyendo, reprendiendo y exhortando con paciencia y doctrina.",
            },
          },
          {
            apoyo: "Predicar y enseñar es anunciar lo que Dios dijo, con constancia, paciencia y doctrina",
            ref: "2 Timoteo 4:1-2",
            clave: {
              id: "pr-n3-homiletica-1-1-a7-2",
              tipo: "corta",
              pregunta: "Explica con tus palabras qué significa «que prediques la palabra; que instes a tiempo y fuera de tiempo».",
              ideas: [
                { id: "dios", peso: 50, texto: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones.", formas: ["lo que dios dijo", "lo que dios dice", "lo que dijo dios", "lo que dice dios", "anunci* (la|su) palabra", "palabra de dios", "mensaje de dios", "(no|sin) (nuestras|mis|sus|tus|propias) opiniones"] },
                { id: "tiempo", peso: 50, texto: "Instar a tiempo y fuera de tiempo es hacerlo con constancia, convenga o no.", formas: ["constan*", "convenga o no", "conveng*", "siempre", "todo (momento|tiempo)", "cualquier (momento|tiempo|situacion)", "insist*", "(aunque|cuando) no (convenga|sea|guste|quieran)"] },
              ],
              errores: [
                { id: "opiniones", texto: "Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones.", formas: ["predica* (sus|mis|nuestras|propias|tus) opiniones", "(hablar|decir|anunciar|compartir) (sus|mis|nuestras|propias|tus) opiniones", "(hablar|decir) de (sus|mis|nuestras|propias|tus) opiniones", "lo que (me|nos|le) parece"], anula: "dios" },
              ],
              modelo: "Significa anunciar lo que Dios dijo en su Palabra, no nuestras opiniones. Y hacerlo con constancia, convenga o no: en todo momento, con paciencia y doctrina.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Del texto al mensaje
    "n3-homiletica-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pasa si uno decide qué decir y después busca un versículo?", reverso: "La Biblia termina diciendo lo que el predicador quería.", apoyo: "Así la Biblia termina diciendo lo que el predicador quería" },
              { frente: "¿Cuál es el camino correcto para preparar un mensaje?", reverso: "Del pasaje al mensaje, y no al revés.", apoyo: "El camino correcto es el contrario: del pasaje al mensaje" },
              { frente: "¿Qué clase de pasaje se escoge para un mensaje?", reverso: "Un pasaje completo, como un párrafo, una historia o un salmo.", apoyo: "se escoge un pasaje completo, como un párrafo, una historia o un salmo" },
              { frente: "¿Qué hace el obrero aprobado con la palabra de verdad?", reverso: "La usa bien.", apoyo: "El obrero aprobado usa bien la palabra de verdad" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hizo Esdras antes de enseñar la ley?", reverso: "Preparó su corazón para inquirirla y para cumplirla.", apoyo: "Esdras preparó su corazón «para inquirir la ley de Jehová y para cumplirla, y para enseñar»" },
              { frente: "¿Para quién estudia primero el pasaje el que enseña?", reverso: "Para sí mismo, antes de pensar en los demás.", apoyo: "El que enseña estudia el pasaje para sí mismo antes de pensar en los demás" },
              { frente: "¿Qué pasa si empiezas leyendo un sermón ajeno?", reverso: "Repetirás lo que otro vio.", apoyo: "Si empiezas leyendo un comentario o un sermón ajeno, repetirás lo que otro vio" },
              { frente: "¿Cuándo se consultan las herramientas y los comentarios?", reverso: "Al final, después de estudiar el pasaje con oración.", apoyo: "Al final, consultar las herramientas y uno o dos comentarios" },
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
            consigna: "¿Va del pasaje al mensaje o de una idea propia al versículo? Lleva cada frase a su grupo.",
            grupos: ["Del pasaje al mensaje", "De una idea propia al versículo"],
            frases: [
              { texto: "Escoger un pasaje completo y dejar que marque el tema", grupo: 0 },
              { texto: "Estudiar el contexto antes de decidir qué enseñar", grupo: 0 },
              { texto: "Dejar que el texto le hable a uno primero", grupo: 0 },
              { texto: "Decidir qué decir y después buscar un versículo que lo apoye", grupo: 1 },
              { texto: "Tomar un versículo suelto para la idea que ya tenía", grupo: 1 },
              { texto: "Hacer que la Biblia diga lo que el predicador quería", grupo: 1 },
            ],
            apoyo: "El camino correcto es el contrario: del pasaje al mensaje",
            ref: "2 Timoteo 2:15",
            explica: "El mensaje nace del texto: se escoge un pasaje completo y se deja que él marque el tema. Si se parte de una idea propia, la Biblia termina diciendo lo que el predicador quería.",
          },
          {
            consigna: "¿El mensaje nace del texto o nace de una idea propia? Lleva cada frase a su grupo.",
            grupos: ["Nace del texto", "Nace de una idea propia"],
            frases: [
              { texto: "Leer el pasaje varias veces antes de pensar qué decir", grupo: 0 },
              { texto: "Escribir lo que el autor quiso decir a sus primeros lectores", grupo: 0 },
              { texto: "Escoger una historia completa y dejar que marque el tema", grupo: 0 },
              { texto: "Pensar el mensaje primero y buscarle un versículo después", grupo: 1 },
              { texto: "Usar un versículo suelto para apoyar una opinión", grupo: 1 },
              { texto: "Escoger el tema y luego buscar textos que lo digan", grupo: 1 },
            ],
            apoyo: "Por eso el mensaje nace del texto",
            ref: "2 Timoteo 2:15",
            explica: "El obrero aprobado usa bien la palabra de verdad: el mensaje nace del texto, y no de una idea que después se apoya con un versículo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para estudiar un pasaje antes de enseñarlo, del primero al último.",
            pasos: [
              "Escoger un pasaje completo, no un versículo suelto",
              "Orar y leerlo varias veces",
              "Observar quién, qué, cuándo, dónde, por qué y cómo",
              "Estudiar el contexto, el género y las palabras importantes",
              "Escribir en una frase lo que el autor quiso decir",
              "Consultar las herramientas y uno o dos comentarios",
            ],
            apoyo: "Al final, consultar las herramientas y uno o dos comentarios",
            ref: "2 Timoteo 2:15",
            explica: "Se escoge un pasaje completo, se ora y se lee varias veces, se observa, se estudia el contexto, se escribe en una frase lo que el autor quiso decir y, al final, se consultan las herramientas y los comentarios.",
          },
          {
            consigna: "Vas a enseñar Lucas 15:1-7. Ordena cómo lo estudias, del primer paso al último.",
            pasos: [
              "Escoger el pasaje completo, del versículo 1 al 7",
              "Orar y leer la parábola varias veces",
              "Observar qué hace el pastor con la oveja perdida",
              "Estudiar el contexto: los fariseos murmuraban",
              "Escribir: Dios busca al pecador perdido y se goza cuando vuelve",
              "Consultar uno o dos comentarios",
            ],
            apoyo: "Escoger un pasaje completo, no un versículo suelto",
            ref: "Lucas 15:1-7",
            explica: "Primero el texto, después las ayudas: se escoge el pasaje completo, se ora y se lee, se observa, se estudia el contexto, se escribe lo que Jesús quiso decir y al final se consultan los comentarios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Estudia primero el pasaje con oración; después las ayudas confirmarán, corregirán o enriquecerán lo que encontraste",
            ref: "Lucas 15:1-7",
            situacion: "Eres líder de célula y el jueves te toca dar el estudio. Te gustaría hablar del gozo de Dios por los que vuelven a él.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes el lunes libre para empezar a preparar.",
                pregunta: "¿Por dónde empiezas?",
                opciones: [
                  { texto: "Escoges un pasaje completo, como Lucas 15:1-7, y lo lees orando.", valor: 2, explica: "El mensaje nace del texto: se escoge un pasaje completo, se ora y se lee varias veces.", siguiente: "e2" },
                  { texto: "Escribes tu mensaje sobre el gozo y le buscas un versículo que lo apoye.", valor: 0, explica: "Así la Biblia termina diciendo lo que el predicador quería: el camino correcto es del pasaje al mensaje.", siguiente: "e1b" },
                  { texto: "Escoges Lucas 15:7, el versículo del gozo, y lo lees sin los de antes.", valor: 1, explica: "Es un buen texto, pero se escoge un pasaje completo, no un versículo suelto: el contexto es decisivo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al buscar tu versículo, ves que el pasaje dice más que tu idea.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Dejas tu idea a un lado y estudias el pasaje completo.", valor: 2, explica: "Se deja que el pasaje marque el tema: del pasaje al mensaje.", siguiente: "e2" },
                  { texto: "Sigues con tu idea, porque el versículo suena bastante parecido.", valor: 0, explica: "Así la Biblia termina diciendo lo que el predicador quería.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya leíste el pasaje varias veces. Un amigo te presta un sermón sobre Lucas 15.",
                pregunta: "¿Qué haces con el sermón?",
                opciones: [
                  { texto: "Lo dejas para el final, después de observar y ver el contexto.", valor: 2, explica: "Primero el texto, después las ayudas: confirmarán, corregirán o enriquecerán lo que encontraste." },
                  { texto: "Lo lees ahora, para saber qué tienes que buscar en el pasaje.", valor: 0, explica: "Si empiezas leyendo un comentario o un sermón ajeno, repetirás lo que otro vio." },
                  { texto: "Lo dejas a un lado y no consultas ninguna ayuda en todo el estudio.", valor: 1, explica: "El estudio propio va primero, pero al final conviene consultar las herramientas y uno o dos comentarios." },
                ],
              },
              {
                id: "e3",
                narra: "Ya observaste el pasaje y estudiaste su contexto: los fariseos murmuraban porque Jesús recibía a los pecadores.",
                pregunta: "¿Qué escribes antes de armar el mensaje?",
                opciones: [
                  { texto: "En una frase, lo que Jesús quiso decir a los que lo oían.", valor: 2, explica: "Se escribe en una frase lo que el autor quiso decir a sus primeros lectores: Dios busca al pecador perdido y se goza cuando vuelve." },
                  { texto: "Una lista con todas las ideas que se te ocurren sobre las ovejas.", valor: 0, explica: "Lo que se escribe es lo que el autor quiso decir, en una frase, y no todo lo que se nos ocurre." },
                  { texto: "Las preguntas que te quedaron, para buscarlas en un comentario.", valor: 1, explica: "Las ayudas sirven al final, pero antes falta escribir en una frase lo que Jesús quiso decir." },
                ],
              },
            ],
          },
          {
            apoyo: "El que enseña estudia el pasaje para sí mismo antes de pensar en los demás: deja que el texto le hable, lo obedece y solo entonces lo enseña",
            ref: "Esdras 7:10",
            situacion: "Te pidieron el devocional del culto de hogar del sábado. Tienes poco tiempo, y un hermano te ofrece el bosquejo que él usó el año pasado.",
            escenas: [
              {
                id: "e1",
                narra: "El hermano te dice: Úsalo tal cual, que así no tienes que estudiar nada.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que se lo agradeces, pero primero vas a estudiar tú el pasaje.", valor: 2, explica: "Si empiezas con un sermón ajeno, repetirás lo que otro vio: estudia primero el pasaje con oración." },
                  { texto: "Que sí: un bosquejo ya probado vale más que todo tu propio estudio.", valor: 0, explica: "Repetirás lo que otro vio: el que enseña estudia el pasaje para sí mismo." },
                  { texto: "Que lo vas a leer primero, y después estudias el pasaje con él.", valor: 1, explica: "Las ayudas sirven, pero al final: primero el texto, después las ayudas." },
                ],
              },
              {
                id: "e2",
                narra: "Escoges un salmo completo y lo lees varias veces orando. Un versículo te habla a ti primero.",
                pregunta: "¿Qué haces con eso?",
                opciones: [
                  { texto: "Lo obedeces tú primero, y solo entonces piensas cómo enseñarlo.", valor: 2, explica: "Como Esdras: el que enseña deja que el texto le hable, lo obedece y solo entonces lo enseña." },
                  { texto: "Lo apartas, porque el devocional es para los demás y no para ti.", valor: 0, explica: "El que enseña estudia el pasaje para sí mismo antes de pensar en los demás." },
                  { texto: "Lo anotas para contarlo, aunque todavía no lo hayas puesto en práctica.", valor: 1, explica: "Es bueno anotarlo, pero Esdras preparó su corazón para inquirir la ley, para cumplirla y para enseñar." },
                ],
              },
              {
                id: "e3",
                narra: "Faltan dos días. Ya observaste el salmo y estudiaste su contexto.",
                pregunta: "¿Qué te falta antes de preparar lo que dirás?",
                opciones: [
                  { texto: "Escribir en una frase lo que el autor quiso decir a sus lectores.", valor: 2, explica: "Antes de enseñar se escribe en una frase lo que el autor quiso decir a sus primeros lectores." },
                  { texto: "Buscar otro versículo que diga justo lo que tú querías decir desde antes.", valor: 0, explica: "Así la Biblia termina diciendo lo que el predicador quería: el mensaje nace del texto." },
                  { texto: "Consultar uno o dos comentarios para confirmar lo que hallaste.", valor: 1, explica: "Las ayudas van al final, pero antes falta escribir en una frase lo que el autor quiso decir." },
                ],
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
            consigna: "Completa lo que Jesús quiso decir con la oveja perdida.",
            texto: "Lo que Jesús quiso decir es que Dios [[busca]] al pecador perdido y se [[goza]] cuando [[vuelve]].",
            distractores: ["olvida", "enoja", "huye"],
            errores: {
              olvida: "Dios busca al pecador perdido, como el pastor que va tras la oveja hasta encontrarla.",
              enoja: "Dios se goza: «habrá más gozo en el cielo por un pecador que se arrepiente».",
              huye: "Dios se goza cuando el pecador vuelve, cuando se arrepiente.",
            },
            apoyo: "Lo que Jesús quiso decir es que Dios busca al pecador perdido y se goza cuando vuelve",
            ref: "Lucas 15:1-7",
            explica: "Jesús explica el sentido de la parábola: «habrá más gozo en el cielo por un pecador que se arrepiente». Dios busca al pecador perdido y se goza cuando vuelve.",
          },
          {
            consigna: "Completa el paso del estudio que va antes de enseñar.",
            texto: "Antes de enseñar, escribe en una [[frase]] lo que el [[autor]] quiso decir a sus primeros [[lectores]].",
            distractores: ["lista", "oyente", "críticos"],
            errores: {
              lista: "Lo que el autor quiso decir se escribe en una sola frase.",
              oyente: "Se escribe lo que quiso decir el autor del pasaje.",
              "críticos": "Se escribe lo que el autor quiso decir a sus primeros lectores.",
            },
            apoyo: "Escribir en una frase lo que el autor quiso decir a sus primeros lectores",
            explica: "Antes de armar el mensaje se escribe en una frase lo que el autor quiso decir a sus primeros lectores, como en Lucas 15: Dios busca al pecador perdido y se goza cuando vuelve.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana que prepara el estudio de su célula te dice: En mi frase puse lo que el pasaje me dice a mí hoy. ¿Está bien así?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que escriba primero lo que el autor quiso decir a sus lectores.", bien: true, explica: "Ese es el paso: escribir en una frase lo que el autor quiso decir a sus primeros lectores." },
              { texto: "Que sí: lo único que importa es lo que el pasaje le dice a ella hoy.", explica: "Antes de enseñar se escribe lo que el autor quiso decir a sus primeros lectores." },
              { texto: "Que copie la frase de un buen comentario, que seguro lo dice mejor.", explica: "Si empiezas por un comentario, repetirás lo que otro vio: las ayudas van al final." },
              { texto: "Que no escriba nada: el sentido del pasaje se descubre al predicar.", explica: "Antes de enseñar se escribe en una frase lo que el autor quiso decir." },
            ],
            apoyo: "Escribir en una frase lo que el autor quiso decir a sus primeros lectores",
            explica: "Antes de pensar en lo que dirá a otros, quien enseña escribe en una frase lo que el autor quiso decir a sus primeros lectores, como hizo Jesús con la oveja perdida.",
          },
          {
            caso: "Un joven que va a enseñar en el culto de jóvenes te dice: Ya tengo mi frase de Lucas 15:1-7: hay que cuidar mucho a las ovejas.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que mire el versículo 7, donde Jesús mismo explica el sentido.", bien: true, explica: "Jesús explica el sentido: «habrá más gozo en el cielo por un pecador que se arrepiente». Dios busca al pecador perdido y se goza cuando vuelve." },
              { texto: "Que está perfecta: la parábola enseña a cuidar bien a las ovejas.", explica: "Eso se queda en la escena: lo que Jesús quiso decir es que Dios busca al pecador perdido y se goza cuando vuelve." },
              { texto: "Que le agregue otros tres temas, para que el mensaje dure más.", explica: "Se escribe en una frase lo que el autor quiso decir, no varios temas." },
              { texto: "Que la cambie por lo que diga el primer comentario que encuentre.", explica: "Primero el texto, después las ayudas: el sentido se busca en el pasaje y en su contexto." },
            ],
            apoyo: "Jesús explica el sentido: «habrá más gozo en el cielo por un pecador que se arrepiente» (15:7)",
            ref: "Lucas 15:1-7",
            explica: "El contexto es decisivo, y Jesús explica el sentido en el versículo 7: Dios busca al pecador perdido y se goza cuando vuelve.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Hay quien decide primero qué quiere decir y después busca un versículo que lo apoye",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n3-homiletica-1-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué un mensaje bíblico debe partir del texto y no de una idea propia?",
              ideas: [
                { id: "peligro", peso: 50, texto: "Si se decide primero qué decir y después se busca un versículo, la Biblia termina diciendo lo que el predicador quería.", formas: ["lo que (el|uno|yo|nosotros) (quiere|quiero|queria|quiera|queremos|quisiera|piensa|pienso|pensaba)", "lo que (queremos|quiero|pensamos|pienso|creemos|creo|queria|pensaba)", "lo que el predicador (quiere|queria|quiera|piensa|pensaba)", "termin* diciendo", "(busca|buscar|buscamos|busco) un versiculo", "versiculo que (lo|la) apoy*", "(hacer|hacerle|hace|hacemos|hacen) decir"] },
                { id: "texto", peso: 50, texto: "El mensaje nace del texto: se escoge un pasaje completo y se deja que él marque el tema.", formas: ["nac* del (texto|pasaje)", "del pasaje al mensaje", "del texto al mensaje", "(marque|marca|marcar) el tema", "pasaje completo", "(parte|partir|sale|salir) del (texto|pasaje)", "usa* bien la palabra", "obrero aprobado"] },
              ],
              errores: [
                { id: "idea-primero", texto: "El camino correcto es el contrario: del pasaje al mensaje.", formas: ["hay que tener una (idea|buena)", "hay que (partir|empezar|comenzar|salir) (de|con|por) (una|mi|la) idea", "(debe|deben|debemos|conviene) (partir|empezar|comenzar|salir) (de|con|por) (una|mi|la) idea"], anula: "peligro" },
              ],
              modelo: "Porque si uno decide primero lo que quiere decir y luego busca un versículo, la Biblia termina diciendo lo que el predicador quería. El mensaje nace del texto: se escoge un pasaje completo y se deja que él marque el tema.",
            },
          },
          {
            apoyo: "Por eso el mensaje nace del texto: se escoge un pasaje completo, como un párrafo, una historia o un salmo, y se deja que él marque el tema",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n3-homiletica-1-2-a7-2",
              tipo: "corta",
              pregunta: "¿Cuál es el camino correcto para preparar un mensaje, y qué se escoge primero?",
              ideas: [
                { id: "camino", peso: 50, texto: "El camino correcto va del pasaje al mensaje: el mensaje nace del texto.", formas: ["del pasaje al mensaje", "del texto al mensaje", "nac* del (texto|pasaje)", "(parte|partir|sale|salir|empieza|empezar) del (texto|pasaje)", "(parte|partir|empieza|empezar) desde el (texto|pasaje)", "(empieza|empezar|comienza|comenzar) (por|con) el (texto|pasaje)"] },
                { id: "completo", peso: 50, texto: "Se escoge un pasaje completo, como un párrafo, una historia o un salmo, y se deja que él marque el tema.", formas: ["pasaje completo", "texto completo", "un parrafo", "una historia", "un salmo", "(marque|marca|marcar) el tema"] },
              ],
              modelo: "El camino correcto es del pasaje al mensaje: el mensaje nace del texto. Primero se escoge un pasaje completo, como un párrafo, una historia o un salmo, y se deja que él marque el tema.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La idea central y el propósito
    "n3-homiletica-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Si nadie sabe decir en una frase de qué trató el mensaje, ¿qué le faltó?", reverso: "Una idea central.", apoyo: "al mensaje le faltó una idea central" },
              { frente: "¿Cuántas ideas tenía el sermón de Pedro en Pentecostés?", reverso: "Una sola, que él mismo resume al final.", apoyo: "tiene muchos versículos citados, pero una sola idea, que él mismo resume al final" },
              { frente: "¿Qué pregunta responde el tema de la idea central?", reverso: "¿De qué hablo?", apoyo: "un tema, que responde de qué hablo" },
              { frente: "¿Qué pregunta responde el complemento de la idea central?", reverso: "¿Qué digo de eso?", apoyo: "un complemento, que responde qué digo de eso" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué autor enseña que un buen mensaje desarrolla una sola idea central?", reverso: "Haddon Robinson, en La predicación bíblica.", apoyo: "Haddon Robinson, en La predicación bíblica, enseña que un buen mensaje desarrolla una sola idea central" },
              { frente: "¿Qué es el propósito de un mensaje?", reverso: "Lo que Dios quiere que los oyentes sepan, crean y hagan.", apoyo: "lo que Dios quiere que los oyentes sepan, crean y hagan después de escucharlo" },
              { frente: "¿Con qué debe coincidir el propósito del mensaje?", reverso: "Con el propósito del texto.", apoyo: "El propósito del mensaje debe coincidir con el propósito del texto" },
              { frente: "¿Qué conviene escribir antes que cualquier otra cosa?", reverso: "Tu idea central.", apoyo: "Escribe tu idea central antes de escribir cualquier otra cosa" },
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
            consigna: "Une cada parte o ejemplo con lo que le corresponde.",
            pares: [
              ["El tema", "Responde de qué hablo"],
              ["El complemento", "Responde qué digo de eso"],
              ["La idea central", "Una frase entera, con su tema y su complemento"],
              ["El sermón de Pedro en Pentecostés", "Muchos versículos citados, pero una sola idea"],
            ],
            apoyo: "esa idea tiene dos partes: un tema, que responde de qué hablo, y un complemento, que responde qué digo de eso",
            ref: "Hechos 2:36",
            explica: "La idea central es una frase entera con dos partes: el tema (de qué hablo) y el complemento (qué digo de eso). El sermón de Pedro cita muchos versículos, pero tiene una sola idea.",
          },
          {
            consigna: "Une cada frase con lo que es en la idea central de Lucas 15:1-7.",
            pares: [
              ["¿De qué hablo?", "La pregunta que responde el tema"],
              ["¿Qué digo de eso?", "La pregunta que responde el complemento"],
              ["Cómo trata Dios al pecador perdido", "El tema que podría tener Lucas 15:1-7"],
              ["Que lo busca y se goza cuando se arrepiente", "El complemento de esa idea en Lucas 15"],
            ],
            apoyo: "En Lucas 15:1-7, el tema podría ser cómo trata Dios al pecador perdido, y el complemento, que lo busca y se goza cuando se arrepiente",
            ref: "Lucas 15:1-7",
            explica: "El tema responde de qué hablo y el complemento, qué digo de eso. En Lucas 15:1-7, el tema podría ser cómo trata Dios al pecador perdido, y el complemento, que lo busca y se goza cuando se arrepiente.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es el propósito de un mensaje.",
            texto: "Un mensaje tiene un [[propósito]]: lo que Dios quiere que los [[oyentes]] sepan, crean y [[hagan]] después de escucharlo.",
            distractores: ["tema", "predicadores", "olviden"],
            errores: {
              tema: "El tema responde de qué hablo; el propósito es lo que Dios quiere que los oyentes sepan, crean y hagan.",
              predicadores: "El propósito mira a los oyentes: lo que deben saber, creer y hacer después de escuchar.",
              olviden: "El propósito es lo que Dios quiere que los oyentes sepan, crean y hagan.",
            },
            apoyo: "Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan después de escucharlo",
            ref: "Hechos 2:37-38",
            explica: "Cuando la gente oyó a Pedro, preguntó: «¿qué haremos?», y él respondió con un llamado claro. Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan.",
          },
          {
            consigna: "Completa el propósito que podría tener un mensaje de Lucas 15.",
            texto: "El propósito podría ser que los oyentes que están [[lejos]] vuelvan a Dios, y que la iglesia reciba con [[gozo]] a los que vuelven.",
            distractores: ["cerca", "sospecha"],
            errores: {
              cerca: "El propósito es que vuelvan a Dios los oyentes que están lejos.",
              sospecha: "La iglesia recibe con gozo a los que vuelven, como hay gozo en el cielo por un pecador que se arrepiente.",
            },
            apoyo: "Para Lucas 15, el propósito podría ser que los oyentes que están lejos vuelvan a Dios, y que la iglesia reciba con gozo a los que vuelven",
            ref: "Lucas 15:1-7",
            explica: "El propósito del mensaje coincide con el del texto: Dios busca al perdido y se goza cuando vuelve; por eso se busca que los que están lejos vuelvan, y que la iglesia los reciba con gozo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una joven que enseña en el culto de jóvenes te dice: Voy a usar Lucas 15:1-7 para que el grupo dé más ofrendas.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que busque lo que el texto pide: que los que están lejos vuelvan.", bien: true, explica: "El propósito del mensaje debe coincidir con el propósito del texto; para Lucas 15, que los que están lejos vuelvan a Dios." },
              { texto: "Que está bien: el propósito de un mensaje lo decide cada predicador.", explica: "No le hacemos decir al pasaje lo que queremos: buscamos que cumpla aquello para lo que Dios lo dio." },
              { texto: "Que no se preocupe: con tener la idea central ya no hace falta propósito.", explica: "Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan." },
              { texto: "Que junte varios propósitos en el mismo mensaje, para que algo quede.", explica: "El propósito sale del texto, y un error común es mezclar tres o cuatro temas en un solo mensaje." },
            ],
            apoyo: "El propósito del mensaje debe coincidir con el propósito del texto",
            ref: "Isaías 55:10-11",
            explica: "Dios dice de su palabra: «no volverá a mí vacía, sino que hará lo que yo quiero». Por eso el propósito del mensaje coincide con el del texto.",
          },
          {
            caso: "Un hermano que da el devocional en un culto de hogar te dice: Mi mensaje explica bien el pasaje, pero no sé qué esperar de los que lo oigan.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que defina qué quiere Dios que sepan, crean y hagan al escucharlo.", bien: true, explica: "Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan después de escucharlo." },
              { texto: "Que no espere nada: basta con que el mensaje sea bonito y ordenado.", explica: "Cuando la gente oyó a Pedro, preguntó qué haría, y él respondió con un llamado claro: el mensaje tiene un propósito." },
              { texto: "Que les pida lo que a él le parezca, aunque el texto diga otra cosa.", explica: "El propósito del mensaje debe coincidir con el propósito del texto." },
              { texto: "Que solo busque que aprendan datos del pasaje que antes no sabían.", explica: "El propósito no es solo lo que deben saber: también lo que deben creer y hacer." },
            ],
            apoyo: "Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan después de escucharlo",
            ref: "Hechos 2:37-38",
            explica: "Pedro respondió a la pregunta «¿qué haremos?» con un llamado claro. Cada mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre una buena idea central tiene un error. Tócala.",
            frases: [
              "Es fiel al texto: dice lo que el pasaje dice, no algo que se le añade.",
              "Es clara: se entiende a la primera.",
              "Es completa: una frase entera, con su tema y su complemento.",
              "Es larga: junta tres o cuatro temas para que nada falte.",
            ],
            malo: 3,
            correccion: "Es fácil de recordar: los oyentes pueden llevársela a casa. Mezclar tres o cuatro temas en un solo mensaje es un error común.",
            apoyo: "Fácil de recordar: los oyentes pueden llevársela a casa",
            explica: "Una buena idea central es fiel al texto, clara, completa y fácil de recordar: es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas.",
          },
          {
            consigna: "Una de estas frases sobre cómo evaluar una idea central tiene un error. Tócala.",
            frases: [
              "Una buena idea central se entiende a la primera.",
              "Una buena idea central puede añadir algo que el pasaje no dice.",
              "Una buena idea central es una frase entera, con tema y complemento.",
              "Una buena idea central se la pueden llevar a casa los oyentes.",
            ],
            malo: 1,
            correccion: "Una buena idea central es fiel al texto: dice lo que el pasaje dice, no algo que se le añade.",
            apoyo: "Fiel al texto: dice lo que el pasaje dice, no algo que se le añade",
            explica: "Para evaluar una idea central se mira si es fiel al texto, clara, completa y fácil de recordar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas",
            ref: "Lucas 15:1-7",
            situacion: "Vas a predicar Lucas 15:1-7 en el culto de jóvenes del viernes. Ya estudiaste el pasaje y ahora escribes la idea central.",
            escenas: [
              {
                id: "e1",
                narra: "En tu cuaderno tienes tres borradores de la idea central.",
                pregunta: "¿Con cuál te quedas?",
                opciones: [
                  { texto: "Dios busca al pecador perdido y se goza cuando se arrepiente.", valor: 2, explica: "Es fiel al texto, clara y completa: tiene su tema y su complemento, y se puede llevar a casa.", siguiente: "e2" },
                  { texto: "Cómo trata Dios al pecador perdido en la parábola de la oveja.", valor: 1, explica: "Es un buen tema, pero le falta el complemento, qué digo de eso: la idea central es una frase entera.", siguiente: "e2" },
                  { texto: "Dios busca al perdido, y además hay que orar, ayunar y servir más.", valor: 0, explica: "Mezcla varios temas y añade lo que el pasaje no dice: una idea, no tres sermones.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al leerla en voz alta, notas que ni tú la puedes repetir de memoria.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Dejas una sola verdad del texto, dicha en una frase clara.", valor: 2, explica: "Es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas.", siguiente: "e2" },
                  { texto: "La dejas así: cuantos más temas, más les servirá a los jóvenes.", valor: 0, explica: "Un error común es mezclar tres o cuatro temas en un solo mensaje.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un amigo lee tu idea y te dice: Agrégale que la oveja se perdió por desobediente; así queda más fuerte.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la idea dice lo que el pasaje dice, sin añadirle nada.", valor: 2, explica: "Fiel al texto: dice lo que el pasaje dice, no algo que se le añade." },
                  { texto: "Que se lo vas a agregar, porque así la idea queda más fuerte.", valor: 0, explica: "Una buena idea central es fiel al texto: no le añade lo que el pasaje no dice." },
                  { texto: "Que antes de decidir lo vas a buscar en el pasaje.", valor: 1, explica: "Volver al pasaje es bueno: la idea central solo dice lo que el pasaje dice." },
                ],
              },
              {
                id: "e3",
                narra: "La noche antes, te preguntas si la idea está lista.",
                pregunta: "¿Cómo lo compruebas?",
                opciones: [
                  { texto: "La dices en voz alta: si cabe en una frase clara, está lista.", valor: 2, explica: "Si no puedes decir tu mensaje en una frase, todavía no estás listo para predicarlo; si se entiende a la primera, es clara." },
                  { texto: "Cuentas cuántos versículos citas: con muchos, la idea es mejor.", valor: 0, explica: "El sermón de Pedro tiene muchos versículos citados, pero una sola idea: lo que cuenta es la idea." },
                  { texto: "Le preguntas a un hermano si la entiende a la primera.", valor: 1, explica: "Es una buena prueba de claridad; también conviene ver si es fiel al texto y fácil de recordar." },
                ],
              },
            ],
          },
          {
            apoyo: "Si no puedes decir tu mensaje en una frase, todavía no estás listo para predicarlo",
            ref: "Lucas 15:1-7",
            situacion: "La hermana que dirige el culto de hogar te pidió el devocional del martes. Ya estudiaste Lucas 15:1-7 y ahora vas a formular tu idea central.",
            escenas: [
              {
                id: "e1",
                narra: "Tu primer borrador dice solo: Las ovejas.",
                pregunta: "¿Qué le falta a esa idea?",
                opciones: [
                  { texto: "Ser una frase entera, con su tema y su complemento.", valor: 2, explica: "Completa: es una frase entera, con su tema y su complemento." },
                  { texto: "Nada: con una palabra los oyentes ya saben de qué hablo.", valor: 0, explica: "Al salir, nadie sabría decir en una frase de qué trató el mensaje." },
                  { texto: "Un tema: por ejemplo, cómo trata Dios al pecador perdido.", valor: 1, explica: "Es un buen tema, pero todavía falta el complemento: qué digo de eso." },
                ],
              },
              {
                id: "e2",
                narra: "Ahora tienes: Cómo trata Dios al pecador perdido.",
                pregunta: "¿Qué le agregas?",
                opciones: [
                  { texto: "El complemento: que lo busca y se goza cuando se arrepiente.", valor: 2, explica: "El tema responde de qué hablo y el complemento, qué digo de eso." },
                  { texto: "Dos temas más, para que el devocional tenga más contenido.", valor: 0, explica: "Un error común es mezclar tres o cuatro temas en un solo mensaje." },
                  { texto: "Una lista de versículos sobre ovejas de otros libros de la Biblia.", valor: 0, explica: "La idea central dice lo que el pasaje dice: le falta el complemento, qué digo de eso." },
                ],
              },
              {
                id: "e3",
                narra: "Le lees tu idea a un hermano de la célula.",
                pregunta: "¿Qué te muestra que la idea es clara y fácil de recordar?",
                opciones: [
                  { texto: "Que la entiende a la primera y la repite con sus palabras.", valor: 2, explica: "Clara: se entiende a la primera; fácil de recordar: los oyentes pueden llevársela a casa." },
                  { texto: "Que le parece muy profunda, aunque no sabe bien qué quiere decir.", valor: 0, explica: "Una buena idea central es clara: se entiende a la primera." },
                  { texto: "Que te pide que se la repitas para poder anotarla.", valor: 1, explica: "Quizá la entendió, pero una buena idea se recuerda: los oyentes pueden llevársela a casa." },
                ],
              },
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
            apoyo: "Haddon Robinson, en La predicación bíblica, enseña que un buen mensaje desarrolla una sola idea central, y que esa idea tiene dos partes",
            ref: "Lucas 15:1-7",
            clave: {
              id: "pr-n3-homiletica-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué dos partes tiene la idea central de un mensaje? Explica cada una con el ejemplo de Lucas 15:1-7.",
              ideas: [
                { id: "tema", peso: 35, texto: "El tema, que responde de qué hablo.", formas: ["de que (hablo|habla|hablamos|hablare|trata|tratamos)", "de que se habla", "de que voy a hablar", "(sobre|acerca) que (hablo|habla|trata)"] },
                { id: "complemento", peso: 35, texto: "El complemento, que responde qué digo de eso.", formas: ["que (digo|dice|decimos|dire) de (eso|esto|ese)", "que (digo|dice|decimos|dire) del tema", "que (digo|dice|decimos|dire) (sobre|acerca) (eso|esto|ese)", "que se dice de (eso|esto|ese)", "que se dice del tema", "que se dice sobre (eso|esto|ese|tema)"] },
                { id: "ejemplo", peso: 30, texto: "En Lucas 15:1-7, el tema podría ser cómo trata Dios al pecador perdido, y el complemento, que lo busca y se goza cuando se arrepiente.", formas: ["pecador perdido", "(lo|los) busca", "se goza", "(busca|buscar) al (pecador|perdido)", "trata dios al (pecador|perdido)"] },
              ],
              modelo: "La idea central tiene un tema, que responde de qué hablo, y un complemento, que responde qué digo de eso. En Lucas 15:1-7, el tema es cómo trata Dios al pecador perdido, y el complemento, que lo busca y se goza cuando se arrepiente.",
            },
          },
          {
            apoyo: "Si no puedes decir tu mensaje en una frase, todavía no estás listo para predicarlo",
            ref: "Hechos 2:36",
            clave: {
              id: "pr-n3-homiletica-1-3-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué un mensaje necesita una sola idea central, como el sermón de Pedro en Pentecostés?",
              ideas: [
                { id: "una", peso: 50, texto: "Porque es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas: todo el mensaje lleva a una sola idea.", formas: ["una sola (idea|verdad)", "una (verdad|idea) del texto", "olviden muchas", "(mezclar|mezcla|mezclan|mezclo|mezclamos) (tres|cuatro|varios|muchos) temas", "todo el (mensaje|sermon) lleva", "un solo tema"] },
                { id: "frase", peso: 50, texto: "Así los oyentes pueden decir en una frase de qué trató el mensaje y llevársela a casa.", formas: ["en una frase", "en una sola frase", "de que trato", "llevar*la a casa", "a casa", "facil de recordar", "recuerden bien", "(puedan|pueden|poder) recordar*"] },
              ],
              errores: [
                { id: "muchas", texto: "Es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas.", formas: ["mejor (dar|tener|decir|predicar|poner|mezclar) (muchas|varias) (ideas|verdades)", "mejor (dar|tener|decir|predicar|poner|mezclar) (muchos|varios) temas", "no hace falta una sola"], anula: "una" },
              ],
              modelo: "Porque es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas. Pedro citó muchos versículos, pero todo el mensaje llevaba a una sola idea, y así los oyentes pueden decirla en una frase y llevársela a casa.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La estructura del mensaje
    "n3-homiletica-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué sirve la estructura de un mensaje?", reverso: "Para que los oyentes sigan el camino hasta la idea central.", apoyo: "es lo que permite que los oyentes sigan el camino hasta la idea central" },
              { frente: "¿Qué hace la introducción?", reverso: "Capta la atención, presenta una necesidad o una pregunta y lleva al pasaje.", apoyo: "La introducción capta la atención, presenta una necesidad o una pregunta que el texto responde y lleva al pasaje" },
              { frente: "¿Cuántos puntos tiene el desarrollo?", reverso: "De dos a cuatro, que salen del texto.", apoyo: "El desarrollo tiene de dos a cuatro puntos que salen del texto y desarrollan la idea central" },
              { frente: "¿Qué hace la conclusión?", reverso: "Repite la idea central, llama a responder y termina a tiempo.", apoyo: "La conclusión repite la idea central con otras palabras, llama a responder de manera concreta y termina a tiempo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Desde dónde empezó Pablo su discurso en Atenas?", reverso: "Desde la realidad de sus oyentes: un altar al dios no conocido.", apoyo: "Pablo empezó desde la realidad de sus oyentes: había visto un altar al dios no conocido" },
              { frente: "¿Con qué terminó Pablo su discurso en Atenas?", reverso: "Con un llamado: Dios manda a todos que se arrepientan.", apoyo: "Y terminó con un llamado" },
              { frente: "¿Qué ayuda a los oyentes a pasar de un punto a otro?", reverso: "Una frase de transición.", apoyo: "Entre un punto y otro, una frase de transición ayuda a los oyentes a seguir el camino" },
              { frente: "¿Cuánto debe ocupar el bosquejo?", reverso: "Una sola página.", apoyo: "Escribe tu bosquejo en una sola página" },
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
            consigna: "¿Lo hace la introducción, el desarrollo o la conclusión? Lleva cada frase a su grupo.",
            grupos: ["La introducción", "El desarrollo", "La conclusión"],
            frases: [
              { texto: "Capta la atención de los oyentes", grupo: 0 },
              { texto: "Presenta una pregunta que el texto responde", grupo: 0 },
              { texto: "Lleva a los oyentes al pasaje", grupo: 0 },
              { texto: "Tiene de dos a cuatro puntos que salen del texto", grupo: 1 },
              { texto: "Explica, ilustra y aplica cada punto", grupo: 1 },
              { texto: "Repite la idea central con otras palabras", grupo: 2 },
              { texto: "Llama a responder de manera concreta", grupo: 2 },
              { texto: "Termina a tiempo", grupo: 2 },
            ],
            apoyo: "Un mensaje tiene introducción, desarrollo y conclusión",
            explica: "La introducción capta la atención y lleva al texto; el desarrollo tiene de dos a cuatro puntos que se explican, se ilustran y se aplican; y la conclusión repite la idea central y llama a responder.",
          },
          {
            consigna: "¿A qué parte del mensaje pertenece cada frase? Lleva cada frase a su grupo.",
            grupos: ["La introducción", "El desarrollo", "La conclusión"],
            frases: [
              { texto: "Empieza con una pregunta que conecta con el tema", grupo: 0 },
              { texto: "Una situación de la vida diaria que lleva al pasaje", grupo: 0 },
              { texto: "Frases de transición entre un punto y otro", grupo: 1 },
              { texto: "Puntos que salen del pasaje y desarrollan la idea central", grupo: 1 },
              { texto: "Explica en cada punto lo que dice el pasaje", grupo: 1 },
              { texto: "Lleva a los oyentes ante Dios con lo que oyeron", grupo: 2 },
              { texto: "Termina con un llamado, como Pablo en Atenas", grupo: 2 },
            ],
            apoyo: "La introducción capta la atención, presenta una necesidad o una pregunta que el texto responde y lleva al pasaje",
            explica: "La introducción es breve y lleva al texto; el desarrollo explica el pasaje punto por punto, con frases de transición; y la conclusión llama a responder y lleva a los oyentes ante Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el bosquejo de Lucas 15:1-7 en su página, de arriba abajo.",
            pasos: [
              "La idea central: Dios busca al perdido y se goza cuando vuelve",
              "La introducción",
              "Dios ve el valor de uno solo (15:4)",
              "Dios busca hasta encontrar (15:4-5)",
              "Dios se goza con el que vuelve (15:6-7)",
              "La conclusión",
            ],
            apoyo: "la idea central arriba, la introducción, los puntos con su versículo, su ilustración y su aplicación, y la conclusión",
            ref: "Lucas 15:1-7",
            explica: "El bosquejo cabe en una página: la idea central arriba, la introducción, los puntos en el orden del texto (15:4, 15:4-5 y 15:6-7) y la conclusión.",
          },
          {
            consigna: "Ordena lo que se hace en cada punto del desarrollo, del primero al último.",
            pasos: [
              "Se explica lo que dice el pasaje",
              "Se ilustra para que se entienda",
              "Se aplica a la vida",
              "Una frase de transición lleva al punto siguiente",
            ],
            apoyo: "En cada punto se explica lo que dice el pasaje, se ilustra para que se entienda y se aplica a la vida",
            explica: "En cada punto se explica lo que dice el pasaje, se ilustra para que se entienda y se aplica a la vida; entre un punto y otro, una frase de transición ayuda a seguir el camino.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El desarrollo tiene de dos a cuatro puntos que salen del texto y desarrollan la idea central",
            ref: "Lucas 15:1-7",
            situacion: "Vas a predicar Lucas 15:1-7 en tu célula. Tu idea central ya está escrita: Dios busca al perdido y se goza cuando vuelve. Ahora armas el bosquejo.",
            escenas: [
              {
                id: "e1",
                narra: "Te toca decidir los puntos del desarrollo.",
                pregunta: "¿De dónde los sacas?",
                opciones: [
                  { texto: "Del pasaje: tres puntos que siguen el texto y llevan a la idea.", valor: 2, explica: "Los puntos salen del texto y desarrollan la idea central: Dios ve el valor de uno solo, busca hasta encontrar y se goza con el que vuelve.", siguiente: "e2" },
                  { texto: "De tus temas favoritos, aunque el pasaje no hable de ninguno de ellos.", valor: 0, explica: "El desarrollo tiene puntos que salen del texto, no de lo que a uno le gusta.", siguiente: "e1b" },
                  { texto: "Del pasaje, pero con ocho puntos, uno por cada detalle que viste.", valor: 1, explica: "Salen del texto, pero son demasiados: el desarrollo tiene de dos a cuatro puntos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al revisar tu bosquejo, ves que ningún punto sale de Lucas 15.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves al pasaje y sacas de él los puntos del desarrollo.", valor: 2, explica: "Los puntos salen del texto y desarrollan la idea central.", siguiente: "e2" },
                  { texto: "Lo dejas así, porque los oyentes no van a notar ninguna diferencia.", valor: 0, explica: "La estructura permite que los oyentes sigan el camino hasta la idea central, y los puntos salen del texto.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya tienes tres puntos. Al ensayar, notas que pasas de uno a otro de golpe.",
                pregunta: "¿Qué agregas?",
                opciones: [
                  { texto: "Una frase de transición entre un punto y el siguiente.", valor: 2, explica: "Entre un punto y otro, una frase de transición ayuda a los oyentes a seguir el camino." },
                  { texto: "Un cuarto punto con otro tema, para que haya más variedad.", valor: 0, explica: "Los puntos desarrollan la idea central: no se agregan temas nuevos." },
                  { texto: "Una pausa larga, sin decir nada, entre un punto y otro.", valor: 1, explica: "Una pausa ayuda, pero lo que guía a los oyentes de un punto al otro es una frase de transición." },
                ],
              },
              {
                id: "e3",
                narra: "Te falta la conclusión, y se te ocurre una idea nueva muy interesante.",
                pregunta: "¿Cómo cierras el mensaje?",
                opciones: [
                  { texto: "Repites la idea central con otras palabras y llamas a responder.", valor: 2, explica: "La conclusión repite la idea central con otras palabras, llama a responder de manera concreta y termina a tiempo." },
                  { texto: "Abres la idea nueva al final, para dejar al grupo pensando en ella.", valor: 0, explica: "No es el momento de abrir un tema nuevo, sino de llevar a los oyentes ante Dios con lo que han oído." },
                  { texto: "Repites la idea central y terminas sin pedir ninguna respuesta.", valor: 1, explica: "Repetir la idea central es parte de la conclusión, pero también se llama a responder de manera concreta." },
                ],
              },
            ],
          },
          {
            apoyo: "Escribe tu bosquejo en una sola página: la idea central arriba, la introducción, los puntos con su versículo, su ilustración y su aplicación, y la conclusión",
            ref: "Lucas 15:1-7",
            situacion: "Te pidieron el devocional del culto de hogar del domingo. Ya tienes tu idea central y vas a escribir el bosquejo.",
            escenas: [
              {
                id: "e1",
                narra: "Tomas una hoja en blanco.",
                pregunta: "¿Qué escribes arriba?",
                opciones: [
                  { texto: "La idea central, para que todo el bosquejo lleve a ella.", valor: 2, explica: "La idea central va arriba: la estructura permite que los oyentes sigan el camino hasta ella." },
                  { texto: "La primera historia que se te ocurra, para que no se te olvide.", valor: 0, explica: "Arriba va la idea central; una historia corta puede ir en la introducción." },
                  { texto: "La cita del pasaje, y la idea central más abajo.", valor: 1, explica: "El pasaje es la base, pero arriba va la idea central: todo el bosquejo lleva a ella." },
                ],
              },
              {
                id: "e2",
                narra: "Ahora escribes la introducción.",
                pregunta: "¿Qué pones en ella?",
                opciones: [
                  { texto: "Una pregunta breve que el texto responde y que lleva al pasaje.", valor: 2, explica: "La introducción capta la atención, presenta una pregunta que el texto responde y lleva al pasaje; debe ser breve." },
                  { texto: "Una historia larga de quince minutos, para captar bien la atención.", valor: 0, explica: "La introducción debe ser breve: una pregunta, una historia corta o una situación de la vida diaria." },
                  { texto: "Una noticia del día que capta la atención, pero no lleva al texto.", valor: 1, explica: "Capta la atención, pero la introducción también presenta una pregunta que el texto responde y lleva al pasaje." },
                ],
              },
              {
                id: "e3",
                narra: "Terminas el bosquejo, y ocupa tres páginas.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo recortas hasta que quepa en una página, con lo esencial.", valor: 2, explica: "Escribe tu bosquejo en una sola página: si no cabe, probablemente tiene demasiado." },
                  { texto: "Lo dejas así: cuanto más largo, mejor preparado estará el mensaje.", valor: 0, explica: "Si el bosquejo no cabe en una página, probablemente tiene demasiado." },
                  { texto: "Escribes con letra más chica para que entre todo en una hoja.", valor: 0, explica: "El problema no es la hoja: si no cabe en una página, probablemente tiene demasiado." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo armó Pablo su discurso en Atenas? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pablo", texto: "Pablo en Atenas", x: 50, y: 12 },
              { id: "altar", texto: "El altar al dios no conocido", x: 15, y: 75 },
              { id: "dios", texto: "Dios, el creador, cerca de cada uno", x: 50, y: 90 },
              { id: "llamado", texto: "Un llamado a arrepentirse", x: 85, y: 75 },
            ],
            enlaces: [
              { de: "pablo", a: "altar", relacion: "empezó desde" },
              { de: "pablo", a: "dios", relacion: "anunció a" },
              { de: "pablo", a: "llamado", relacion: "terminó con" },
            ],
            distractores: ["se burló de", "calló sobre"],
            apoyo: "Introducción, desarrollo y conclusión: el discurso entero lleva a un llamado claro",
            ref: "Hechos 17:22-31",
            explica: "Pablo empezó desde la realidad de sus oyentes, el altar al dios no conocido; anunció a Dios, el creador, que está cerca de cada uno; y terminó con un llamado a arrepentirse.",
          },
          {
            consigna: "¿Qué hizo cada parte del discurso de Pablo en Atenas? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "intro", texto: "La introducción", x: 20, y: 15 },
              { id: "altar", texto: "El altar al dios no conocido", x: 80, y: 15 },
              { id: "desarrollo", texto: "El desarrollo", x: 20, y: 50 },
              { id: "creador", texto: "Dios creador, cerca de cada uno", x: 80, y: 50 },
              { id: "conclusion", texto: "La conclusión", x: 20, y: 85 },
              { id: "arrepentirse", texto: "Arrepentirse, porque Dios juzgará", x: 80, y: 85 },
            ],
            enlaces: [
              { de: "intro", a: "altar", relacion: "partió de" },
              { de: "desarrollo", a: "creador", relacion: "anunció a" },
              { de: "conclusion", a: "arrepentirse", relacion: "llamó a" },
            ],
            distractores: ["se burló de", "abrió un tema nuevo con"],
            apoyo: "Pablo empezó desde la realidad de sus oyentes",
            ref: "Hechos 17:22-31",
            explica: "La introducción partió de la realidad de los oyentes, el altar al dios no conocido; el desarrollo anunció al Dios creador, cerca de cada uno; y la conclusión llamó a arrepentirse, porque Dios juzgará al mundo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el discurso de Pablo en Atenas tiene un error. Tócala.",
            frases: [
              "Pablo empezó desde la realidad de sus oyentes.",
              "Pablo había visto en Atenas un altar al dios no conocido.",
              "En el desarrollo, Pablo dijo que Dios habita en templos hechos por manos.",
              "El discurso entero lleva a un llamado claro.",
            ],
            malo: 2,
            correccion: "Pablo dijo que Dios es el creador, no habita en templos hechos por manos y está cerca de cada uno.",
            apoyo: "Dios es el creador, no habita en templos hechos por manos y está cerca de cada uno",
            ref: "Hechos 17:24-29",
            explica: "Pablo empezó desde el altar al dios no conocido, desarrolló que Dios es el creador y está cerca de cada uno, y terminó con un llamado a arrepentirse.",
          },
          {
            consigna: "Una de estas frases sobre cómo terminó Pablo en Atenas tiene un error. Tócala.",
            frases: [
              "Pablo terminó su discurso con un llamado.",
              "Dijo que Dios manda a todos los hombres en todo lugar que se arrepientan.",
              "Dio como razón que Dios juzgará al mundo por el varón que resucitó.",
              "Terminó abriendo un tema nuevo, sin pedir ninguna respuesta.",
            ],
            malo: 3,
            correccion: "Terminó con un llamado claro: el discurso entero lleva a un llamado claro.",
            apoyo: "Introducción, desarrollo y conclusión: el discurso entero lleva a un llamado claro",
            ref: "Hechos 17:30-31",
            explica: "Pablo terminó con un llamado: Dios «ahora manda a todos los hombres en todo lugar, que se arrepientan», porque juzgará al mundo por el varón que resucitó de los muertos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un mensaje tiene introducción, desarrollo y conclusión, como el discurso de Pablo en Atenas",
            ref: "Hechos 17:22-31",
            clave: {
              id: "pr-n3-homiletica-1-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué función tienen la introducción, el desarrollo y la conclusión de un mensaje?",
              ideas: [
                { id: "intro", peso: 34, texto: "La introducción capta la atención y lleva al texto.", formas: ["capt* la atencion", "llam* la atencion", "lleva* al (texto|pasaje)", "llev* al (texto|pasaje)", "pregunta que el texto responde", "una necesidad"] },
                { id: "desarrollo", peso: 33, texto: "El desarrollo tiene de dos a cuatro puntos que salen del pasaje, se explican, se ilustran y se aplican.", formas: ["(dos|2) a (cuatro|4) puntos", "puntos que salen", "salen del (texto|pasaje)", "se explica*", "ilustr*", "se aplica*", "desarroll* la idea central"] },
                { id: "conclusion", peso: 33, texto: "La conclusión repite la idea central y llama a responder.", formas: ["repite la idea", "repet* la idea", "repit* la idea", "llam* a responder", "llam* a (una|la) respuesta", "termina a tiempo", "llev* ante dios"] },
              ],
              modelo: "La introducción capta la atención y lleva al texto. El desarrollo tiene de dos a cuatro puntos que salen del pasaje, y cada uno se explica, se ilustra y se aplica. La conclusión repite la idea central y llama a responder.",
            },
          },
          {
            apoyo: "Introducción, desarrollo y conclusión: el discurso entero lleva a un llamado claro",
            ref: "Hechos 17:22-31",
            clave: {
              id: "pr-n3-homiletica-1-4-a7-2",
              tipo: "corta",
              pregunta: "Usa el discurso de Pablo en Atenas para explicar qué hace la introducción, el desarrollo y la conclusión.",
              ideas: [
                { id: "intro", peso: 34, texto: "La introducción empezó desde la realidad de los oyentes, el altar al dios no conocido, para captar la atención y llevar al mensaje.", formas: ["altar", "dios no conocido", "realidad de (sus|los) oyentes", "capt* la atencion", "llev* al (texto|pasaje|tema)"] },
                { id: "desarrollo", peso: 33, texto: "El desarrollo explicó que Dios es el creador, no habita en templos hechos por manos y está cerca de cada uno.", formas: ["creador", "templos", "cerca de cada uno", "(esta|estaba) cerca", "creo el mundo"] },
                { id: "conclusion", peso: 33, texto: "La conclusión terminó con un llamado claro a arrepentirse.", formas: ["arrepent*", "un llamado", "llam* a responder", "llam* a (todos|todo)", "juzgar*", "resucit*"] },
              ],
              modelo: "En la introducción, Pablo partió del altar al dios no conocido, desde la realidad de sus oyentes. En el desarrollo explicó que Dios es el creador y está cerca de cada uno. En la conclusión hizo un llamado a arrepentirse.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Ilustrar, aplicar y mostrar a Cristo
    "n3-homiletica-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo hablaba Jesús a la gente, según Mateo?", reverso: "Con parábolas: «sin parábolas no les hablaba».", apoyo: "Mateo cuenta que Jesús «sin parábolas no les hablaba»" },
              { frente: "¿Qué hace visible una ilustración?", reverso: "Una verdad.", apoyo: "Una ilustración hace visible una verdad" },
              { frente: "¿Qué puede ser una ilustración?", reverso: "Una historia de la Biblia, una escena diaria, un hecho de la historia o un testimonio.", apoyo: "puede ser una historia de la Biblia, una escena de la vida diaria, un hecho de la historia o un testimonio" },
              { frente: "¿Cómo sirve al texto una buena ilustración?", reverso: "Lo aclara, sin reemplazarlo ni robarse la atención.", apoyo: "La buena ilustración sirve al texto: lo aclara, no lo reemplaza ni se roba la atención" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué cosas hablaba Jesús al enseñar?", reverso: "De semillas, ovejas, monedas, panes, lámparas y redes.", apoyo: "Jesús hablaba de semillas, ovejas, monedas, panes, lámparas y redes" },
              { frente: "¿Cuál es la meta al aplicar un mensaje?", reverso: "Que los oyentes sean hacedores de la palabra, y no solo que sepan más.", apoyo: "La meta no es que los oyentes sepan más, sino que sean «hacedores de la palabra»" },
              { frente: "¿De dónde viene el cambio verdadero?", reverso: "De la gracia de Dios y del poder del Espíritu.", apoyo: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu" },
              { frente: "En Lucas 15, ¿quién es el buen pastor que vino a buscar lo perdido?", reverso: "Jesús mismo.", apoyo: "En Lucas 15, por ejemplo, Jesús mismo es el buen pastor que vino a buscar lo perdido (Lucas 19:10)" },
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
            consigna: "¿Es una buena ilustración o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Así se ilustra", "Así no se ilustra"],
            frases: [
              { texto: "Una historia verdadera, breve y clara", grupo: 0 },
              { texto: "Un testimonio contado con permiso de la persona", grupo: 0 },
              { texto: "Una escena de la vida diaria que lleva de vuelta al texto", grupo: 0 },
              { texto: "Decir de qué libro o de qué predicador viene", grupo: 0 },
              { texto: "Una historia inventada contada como si hubiera pasado", grupo: 1 },
              { texto: "Contar la vida de un hermano sin su permiso", grupo: 1 },
              { texto: "Una anécdota tan larga que se roba la atención", grupo: 1 },
              { texto: "Burlarse de alguien para que la gente se ría", grupo: 1 },
            ],
            apoyo: "las ilustraciones hacen visible la verdad si son verdaderas, respetuosas, breves y llevan al texto",
            ref: "Mateo 13:34",
            explica: "La buena ilustración es verdadera, respeta a las personas, es breve y clara, lleva de vuelta al texto y dice de dónde viene.",
          },
          {
            consigna: "¿La ilustración sirve al texto o lo estorba? Lleva cada frase a su grupo.",
            grupos: ["Sirve al texto", "Estorba al texto"],
            frases: [
              { texto: "Aclara la verdad del pasaje", grupo: 0 },
              { texto: "Hace visible una verdad del texto", grupo: 0 },
              { texto: "Es breve y lleva de vuelta al pasaje", grupo: 0 },
              { texto: "Ocupa el lugar del texto", grupo: 1 },
              { texto: "Se roba la atención de los oyentes", grupo: 1 },
              { texto: "Es tan larga que el pasaje queda olvidado", grupo: 1 },
            ],
            apoyo: "La buena ilustración sirve al texto: lo aclara, no lo reemplaza ni se roba la atención",
            ref: "Mateo 13:34",
            explica: "La buena ilustración sirve al texto: lo aclara y lleva de vuelta a él; no lo reemplaza ni se roba la atención.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven que va a predicar en el culto de jóvenes te dice: Encontré una historia muy emotiva. No sé si pasó, pero la voy a contar como si me hubiera pasado a mí.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que no la cuente como algo que pasó: así no se ilustra con verdad.", bien: true, explica: "Que sea verdadera: nunca se inventa una historia y se cuenta como si hubiera pasado." },
              { texto: "Que la cuente así: si conmueve al grupo, no importa de dónde salió.", explica: "La verdad del mensaje se sostiene también con la honestidad del mensajero." },
              { texto: "Que la cuente como suya, pero que la haga más corta y más clara.", explica: "Ser breve y clara ayuda, pero primero tiene que ser verdadera: no se cuenta como si hubiera pasado." },
              { texto: "Que le cambie los nombres y la cuente como el testimonio de un hermano.", explica: "Nunca se inventan testimonios ni experiencias para impresionar." },
            ],
            apoyo: "Que sea verdadera: nunca se inventa una historia y se cuenta como si hubiera pasado",
            explica: "Una ilustración tiene que ser verdadera, y si viene de otro, se dice de dónde viene: la verdad del mensaje se sostiene también con la honestidad del mensajero.",
          },
          {
            caso: "Una hermana que dará el devocional en un culto de hogar te dice: Quiero contar lo que vivió mi vecina con su hijo; es perfecto para el tema, pero no le he preguntado.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que le pida permiso primero, o que no cuente su historia.", bien: true, explica: "Que respete a las personas: no se expone la vida de nadie sin su permiso." },
              { texto: "Que la cuente igual: como es verdadera, no hace falta ningún permiso.", explica: "Ser verdadera no basta: también tiene que respetar a las personas y no exponer la vida de nadie sin su permiso." },
              { texto: "Que la cuente con más detalles para que todos sepan de quién se trata.", explica: "Así se expone la vida de alguien: la buena ilustración respeta a las personas." },
              { texto: "Que la cuente en broma, para que el grupo se ría un poco con ella.", explica: "La buena ilustración respeta a las personas y no se burla de nadie." },
            ],
            apoyo: "Que respete a las personas: no se expone la vida de nadie sin su permiso ni se burla de nadie",
            explica: "La ilustración respeta a las personas: no se expone la vida de nadie sin su permiso ni se burla de nadie.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo es una buena aplicación.",
            texto: "La aplicación sale del propósito del [[pasaje]] y es [[concreta]]: dice qué hacer, con [[quién]] y cuándo.",
            distractores: ["predicador", "general", "prisa"],
            errores: {
              predicador: "La aplicación sale del propósito del pasaje, no del gusto del predicador.",
              general: "La aplicación es concreta: dice qué hacer, con quién y cuándo.",
              prisa: "Una aplicación concreta dice qué hacer, con quién y cuándo.",
            },
            apoyo: "La aplicación sale del propósito del pasaje y es concreta: dice qué hacer, con quién y cuándo",
            ref: "Santiago 1:22",
            explica: "La meta no es que los oyentes sepan más, sino que sean hacedores de la palabra: la aplicación sale del propósito del pasaje y dice qué hacer, con quién y cuándo.",
          },
          {
            consigna: "Completa de dónde viene el cambio verdadero.",
            texto: "Aplicar no es dar una lista de reglas para portarse bien: el cambio verdadero viene de la [[gracia]] de Dios y del poder del [[Espíritu]].",
            distractores: ["regla", "predicador"],
            errores: {
              regla: "Aplicar no es dar una lista de reglas: el cambio verdadero viene de la gracia de Dios.",
              predicador: "El cambio verdadero viene del poder del Espíritu, no del talento del que habla.",
            },
            apoyo: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu",
            explica: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu: por eso la aplicación lleva a confiar en Cristo, no solo a esforzarse más.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La aplicación sale del propósito del pasaje y es concreta: dice qué hacer, con quién y cuándo",
            ref: "Santiago 1:22",
            situacion: "Vas a enseñar Lucas 15:1-7 en tu célula. El propósito ya está escrito: que los que están lejos vuelvan a Dios, y que la iglesia reciba con gozo a los que vuelven. Ahora preparas la aplicación.",
            escenas: [
              {
                id: "e1",
                narra: "Piensas en cómo cerrar el estudio.",
                pregunta: "¿Qué aplicación propones?",
                opciones: [
                  { texto: "Que cada uno visite esta semana a un hermano que volvió a la iglesia.", valor: 2, explica: "Sale del propósito del pasaje y es concreta: dice qué hacer, con quién y cuándo.", siguiente: "e2" },
                  { texto: "Una lista de reglas: no faltar, llegar temprano y portarse siempre bien.", valor: 0, explica: "Aplicar no es dar una lista de reglas para portarse bien.", siguiente: "e1b" },
                  { texto: "Que todos reciban con gozo a los que vuelven a Dios.", valor: 1, explica: "Sale del propósito, pero todavía no dice qué hacer, con quién ni cuándo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un hermano pregunta: ¿Y eso qué tiene que ver con la oveja perdida?",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves al propósito del pasaje y sacas de ahí la aplicación.", valor: 2, explica: "La aplicación sale del propósito del pasaje.", siguiente: "e2" },
                  { texto: "Le dices que las reglas siempre ayudan, salgan o no del pasaje.", valor: 0, explica: "Aplicar no es dar una lista de reglas: la aplicación sale del propósito del pasaje.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En tu célula hay jóvenes, adultos, un nuevo creyente y una hermana que está sufriendo.",
                pregunta: "¿Qué tienes en cuenta?",
                opciones: [
                  { texto: "Piensas cómo se aplica a cada uno: al joven, al nuevo, al que sufre.", valor: 2, explica: "Conviene pensar en los distintos oyentes: el joven, el adulto, el nuevo creyente, el que sufre." },
                  { texto: "Hablas solo para los adultos, porque ellos son la mayoría del grupo de hoy.", valor: 0, explica: "La aplicación piensa en los distintos oyentes, no solo en la mayoría." },
                  { texto: "Das una aplicación tan general que sirva para todos por igual.", valor: 0, explica: "La aplicación es concreta, y conviene pensar en los distintos oyentes." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, alguien dice: Esta semana me voy a esforzar mucho para cumplirlo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que confíe en Cristo: el cambio viene de su gracia y del Espíritu.", valor: 2, explica: "La aplicación lleva a confiar en Cristo, no solo a esforzarse más: el cambio verdadero viene de la gracia de Dios y del poder del Espíritu." },
                  { texto: "Que sí: todo depende de cuánto se esfuerce él por su cuenta esta semana.", valor: 0, explica: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu, no solo del esfuerzo." },
                  { texto: "Que está bien, y que ore para que Dios lo ayude a esforzarse.", valor: 1, explica: "Orar es bueno, pero la aplicación lleva a confiar en Cristo, no solo a esforzarse más." },
                ],
              },
            ],
          },
          {
            apoyo: "Aplicar no es dar una lista de reglas para portarse bien",
            ref: "Santiago 1:22",
            situacion: "Te toca predicar en el culto de jóvenes, y ya tienes el texto, la idea central y el propósito. Hoy escribes la aplicación.",
            escenas: [
              {
                id: "e1",
                narra: "Tu primer borrador dice: Hay que ser mejores.",
                pregunta: "¿Qué haces con ese borrador?",
                opciones: [
                  { texto: "Lo vuelves concreto: qué hacer, con quién y cuándo.", valor: 2, explica: "La aplicación es concreta: dice qué hacer, con quién y cuándo." },
                  { texto: "Lo dejas así: una aplicación general le sirve a todo el mundo.", valor: 0, explica: "Así no dice qué hacer, con quién ni cuándo: la aplicación es concreta." },
                  { texto: "Le agregas más palabras para que suene más fuerte y emotivo.", valor: 0, explica: "Sonar fuerte no la hace concreta: la aplicación dice qué hacer, con quién y cuándo." },
                ],
              },
              {
                id: "e2",
                narra: "Un amigo te sugiere: Mejor dales una lista de diez reglas para portarse bien.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que aplicar no es dar reglas, sino llevar a confiar en Cristo.", valor: 2, explica: "Aplicar no es dar una lista de reglas para portarse bien: la aplicación lleva a confiar en Cristo." },
                  { texto: "Que sí: con muchas reglas claras, los jóvenes van a cambiar más rápido.", valor: 0, explica: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu, no de una lista de reglas." },
                  { texto: "Que primero vas a ver qué pide el propósito del pasaje.", valor: 1, explica: "Volver al propósito es bueno; además, aplicar no es dar una lista de reglas: lleva a confiar en Cristo." },
                ],
              },
              {
                id: "e3",
                narra: "Ya tienes una aplicación concreta para esta semana.",
                pregunta: "¿Cómo la presentas?",
                opciones: [
                  { texto: "Como respuesta a la gracia de Dios, con el poder del Espíritu.", valor: 2, explica: "El cambio verdadero viene de la gracia de Dios y del poder del Espíritu: la aplicación lleva a confiar en Cristo." },
                  { texto: "Como una tarea que cada uno debe cumplir solo, con su propio esfuerzo.", valor: 0, explica: "La aplicación lleva a confiar en Cristo, no solo a esforzarse más." },
                  { texto: "Como algo opcional, por si a alguien le sobra el tiempo.", valor: 0, explica: "La meta es que los oyentes sean hacedores de la palabra, no solo oidores." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Cristo en el centro del mensaje: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús les declaraba en todas las Escrituras lo que de él decían.", verdad: true, explica: "Así lo hizo Jesús, y por eso un mensaje cristiano muestra cómo el pasaje se relaciona con su persona y su obra.", apoyo: "Jesús les declaraba en todas las Escrituras lo que de él decían", ref: "Lucas 24:27" },
              { texto: "Para mostrar a Cristo, conviene inventar alegorías con cada detalle del pasaje.", verdad: false, explica: "Un mensaje cristiano muestra a Cristo sin inventar alegorías: las reglas sanas de Hermenéutica valen también aquí.", apoyo: "Un mensaje cristiano muestra cómo el pasaje se relaciona con la persona y la obra de Cristo, sin inventar alegorías" },
              { texto: "En Lucas 15, Jesús mismo es el buen pastor que vino a buscar lo perdido.", verdad: true, explica: "Jesús mismo es el buen pastor que vino a buscar lo perdido: así el pasaje se relaciona con su persona y su obra.", apoyo: "En Lucas 15, por ejemplo, Jesús mismo es el buen pastor que vino a buscar lo perdido (Lucas 19:10)", ref: "Lucas 19:10" },
            ],
          },
          {
            consigna: "Sobre mostrar a Cristo sin forzar el texto: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lo aprendido en Hermenéutica sobre las reglas sanas no vale al predicar.", verdad: false, explica: "Lo que se aprendió en Hermenéutica sobre las reglas sanas vale también aquí.", apoyo: "lo que se aprendió en Hermenéutica sobre las reglas sanas vale también aquí" },
              { texto: "Un mensaje cristiano muestra cómo el pasaje se relaciona con la obra de Cristo.", verdad: true, explica: "Un mensaje cristiano muestra cómo el pasaje se relaciona con la persona y la obra de Cristo.", apoyo: "Un mensaje cristiano muestra cómo el pasaje se relaciona con la persona y la obra de Cristo" },
              { texto: "Con tal de hablar de Cristo, se puede forzar el sentido del pasaje.", verdad: false, explica: "El mensaje muestra a Cristo en el centro sin forzar el texto.", apoyo: "el mensaje muestra a Cristo en el centro sin forzar el texto" },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un mensaje cristiano muestra cómo el pasaje se relaciona con la persona y la obra de Cristo, sin inventar alegorías",
            ref: "Lucas 24:27",
            clave: {
              id: "pr-n3-homiletica-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se muestra a Cristo en el centro de un mensaje sin forzar el texto? Da el ejemplo de Lucas 15.",
              ideas: [
                { id: "relacion", peso: 40, texto: "Se muestra cómo el pasaje se relaciona con la persona y la obra de Cristo.", formas: ["se relaciona con", "relacion* con (cristo|jesus)", "relacion* con la persona", "relacion* con su (obra|persona)", "persona y (la|su) obra", "persona y obra", "la obra de (cristo|jesus)", "su obra"] },
                { id: "alegorias", peso: 30, negativa: true, texto: "Sin inventar alegorías: las reglas sanas de Hermenéutica valen también aquí.", formas: ["sin inventar", "(no|sin|nunca) (invent*|forz*)", "reglas sanas", "hermeneutica", "sin forzar"] },
                { id: "pastor", peso: 30, texto: "En Lucas 15, Jesús mismo es el buen pastor que vino a buscar lo perdido.", formas: ["buen pastor", "jesus mismo", "(jesus|cristo) es el pastor", "el pastor es (jesus|cristo)", "buscar lo perdido", "vino a buscar"] },
              ],
              errores: [
                { id: "inventar", texto: "Se muestra a Cristo sin inventar alegorías ni forzar el texto.", formas: ["invent* alegori*", "invent* (una|unas) alegori*", "hacer alegori*", "hacer (una|unas) alegori*", "con alegori*", "forz* el (texto|pasaje|sentido)"], anula: "alegorias" },
              ],
              modelo: "Se muestra cómo el pasaje se relaciona con la persona y la obra de Cristo, sin inventar alegorías y con las reglas sanas de Hermenéutica. En Lucas 15, Jesús mismo es el buen pastor que vino a buscar lo perdido.",
            },
          },
          {
            apoyo: "Jesús les declaraba en todas las Escrituras lo que de él decían",
            ref: "Lucas 24:27",
            clave: {
              id: "pr-n3-homiletica-1-5-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué un mensaje cristiano debe mostrar a Cristo, y qué cuidado hay que tener al hacerlo?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Porque Jesús declaraba en todas las Escrituras lo que de él decían: el mensaje muestra cómo el pasaje se relaciona con su persona y su obra.", formas: ["todas las escrituras", "lo que de el decian", "de el (decian|dicen|hablan|hablaban)", "hablan de (el|jesus|cristo)", "se relaciona con", "persona y (su|la) obra", "su persona", "su obra"] },
                { id: "cuidado", peso: 50, negativa: true, texto: "Sin forzar el texto ni inventar alegorías, con las reglas sanas de Hermenéutica.", formas: ["sin forzar", "sin inventar", "(no|sin|nunca|ni) (forz*|invent*)", "reglas sanas", "hermeneutica"] },
              ],
              errores: [
                { id: "inventar", texto: "Se muestra a Cristo sin inventar alegorías ni forzar el texto.", formas: ["invent* alegori*", "invent* (una|unas) alegori*", "hacer alegori*", "hacer (una|unas) alegori*", "con alegori*", "forz* el (texto|pasaje|sentido)"], anula: "cuidado" },
              ],
              modelo: "Porque Jesús declaraba en todas las Escrituras lo que de él decían, y el mensaje muestra cómo el pasaje se relaciona con su persona y su obra. El cuidado es no forzar el texto ni inventar alegorías, y seguir las reglas sanas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Hablar en público con el poder de Dios
    "n3-homiletica-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le dijo Moisés a Dios sobre su manera de hablar?", reverso: "Que era tardo en el habla.", apoyo: "Moisés le dijo a Dios que era tardo en el habla" },
              { frente: "¿Por qué decía Jeremías que no sabía hablar?", reverso: "Porque era un niño.", apoyo: "Jeremías, que no sabía hablar porque era un niño" },
              { frente: "¿Adónde se mira al hablar en público?", reverso: "A las personas, no al piso ni solo a las notas.", apoyo: "Mira a las personas, no al piso ni solo a tus notas" },
              { frente: "¿Cómo se usa la voz al hablar en público?", reverso: "Claro y con un volumen que todos oigan, variando el tono y con pausas.", apoyo: "Habla claro y con un volumen que todos oigan; varía el tono y usa pausas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es mejor que un devocional largo y disperso?", reverso: "Un devocional corto.", apoyo: "Respeta el tiempo: un devocional corto es mejor que uno largo y disperso" },
              { frente: "¿Qué se hace con las palabras que el oyente no entiende?", reverso: "Se evitan, o se explican.", apoyo: "Evita las muletillas y las palabras que el oyente no entiende, o explícalas" },
              { frente: "¿Cómo deben ser la postura y los gestos?", reverso: "Una postura natural, con gestos que acompañen lo que dices.", apoyo: "Mantén una postura natural, con gestos que acompañen lo que dices" },
              { frente: "¿Qué hace la técnica y qué hace el Espíritu?", reverso: "La técnica ayuda a que el mensaje se oiga; el Espíritu hace que transforme.", apoyo: "La técnica ayuda a que el mensaje se oiga; el Espíritu hace que transforme" },
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
            consigna: "Une cada principio para hablar en público con lo que pide.",
            pares: [
              ["La voz", "Hablar claro y con un volumen que todos oigan"],
              ["La mirada", "Mirar a las personas, no al piso"],
              ["El cuerpo", "Una postura natural, con gestos que acompañen"],
              ["El tiempo", "Un devocional corto antes que uno largo y disperso"],
            ],
            apoyo: "Se habla con voz clara, mirando a las personas y respetando el tiempo",
            explica: "La voz clara, la mirada en las personas, una postura natural y el respeto del tiempo ayudan a que el mensaje se oiga.",
          },
          {
            consigna: "Une cada principio con un buen consejo para el que va a hablar.",
            pares: [
              ["La voz", "Variar el tono y usar pausas"],
              ["La mirada", "No quedarse solo en las notas"],
              ["El cuerpo", "Gestos que acompañen lo que se dice"],
              ["El tiempo", "Respetarlo: mejor corto que largo y disperso"],
              ["Las palabras", "Sin muletillas, y explicando las difíciles"],
            ],
            apoyo: "Aplicar principios para hablar en público con claridad: la voz, la mirada, el cuerpo y el tiempo",
            explica: "Al hablar en público se varía el tono y se usan pausas, se mira a las personas, los gestos acompañan lo que se dice, se respeta el tiempo y se evitan las muletillas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Moisés dijo que era tardo en el habla. ¿Qué prometió Dios enseñarle? Toca las palabras que lo dicen.",
            texto: "yo estaré con tu boca, y te enseñaré [[lo que hayas de hablar]]",
            apoyo: "Dios no le respondió a Moisés que hablaba bien, sino que le prometió: «yo estaré con tu boca, y te enseñaré lo que hayas de hablar»",
            ref: "Éxodo 4:12",
            explica: "Dios no le respondió a Moisés que hablaba bien: le prometió estar con su boca y enseñarle lo que había de hablar.",
          },
          {
            consigna: "Jeremías decía que no sabía hablar. ¿Qué puso Dios en su boca? Toca las palabras que lo dicen.",
            texto: "He aquí he puesto [[mis palabras]] en tu boca",
            apoyo: "A Jeremías le dijo: «He aquí he puesto mis palabras en tu boca» (Jeremías 1:9)",
            ref: "Jeremías 1:9",
            explica: "Jeremías decía que no sabía hablar porque era un niño, y Dios le dijo: «He aquí he puesto mis palabras en tu boca».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Me tiemblan las manos de pensar en dar el devocional. Creo que Dios no me llamó a hablar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es normal: que se prepare, ore y confíe en el que la envía.", bien: true, explica: "El temor a hablar es normal; la respuesta es la preparación, la oración y la confianza en el que nos envía." },
              { texto: "Que tiene razón: si siente temor, es señal de que no es su llamado.", explica: "Moisés y Jeremías también se sintieron incapaces: muchos de los que Dios usa para hablar empezaron así." },
              { texto: "Que el temor se quita solo con técnica: postura, voz y nada más.", explica: "La técnica ayuda a que el mensaje se oiga, pero el temor se enfrenta también con oración y confianza en Dios." },
              { texto: "Que finja seguridad, y así nadie notará que está nerviosa por dentro.", explica: "La respuesta al temor no es fingir, sino la preparación, la oración y la confianza en el que nos envía." },
            ],
            apoyo: "El temor a hablar es normal; la respuesta es la preparación, la oración y la confianza en el que nos envía",
            ref: "Éxodo 4:10-12",
            explica: "Muchos de los que Dios usa para hablar empezaron sintiéndose incapaces, como Moisés y Jeremías. El temor se enfrenta con preparación, oración y confianza en el que nos envía.",
          },
          {
            caso: "Un joven que va a predicar en el culto de jóvenes te dice: Soy muy joven y no sé hablar bien. Mejor espero a ser mayor.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Que Jeremías dijo lo mismo, y Dios puso sus palabras en su boca.", bien: true, explica: "Jeremías dijo que no sabía hablar porque era un niño, y Dios le dijo: «He aquí he puesto mis palabras en tu boca»." },
              { texto: "Que espere: Dios solo usa a los que ya hablan bien desde el principio.", explica: "Muchos de los que Dios usa para hablar empezaron sintiéndose incapaces." },
              { texto: "Que no ore por eso: basta con que hable más rápido y en voz alta.", explica: "Ora mientras preparas y antes de hablar: el Espíritu hace que el mensaje transforme." },
              { texto: "Que memorice frases de otros predicadores para parecer mayor.", explica: "La respuesta al temor es la preparación, la oración y la confianza en el que nos envía." },
            ],
            apoyo: "Muchos de los que Dios usa para hablar empezaron sintiéndose incapaces",
            ref: "Jeremías 1:6-9",
            explica: "Dios no le respondió a Jeremías que hablaba bien: puso sus palabras en su boca. El que te envía a hablar promete estar con tu boca.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para preparar tu enseñanza grabada, del primero al último.",
            pasos: [
              "Escoger un pasaje",
              "Estudiar el pasaje",
              "Escribir la idea central y el propósito",
              "Armar el bosquejo",
              "Buscar una ilustración y una aplicación",
              "Enseñar de diez a quince minutos",
            ],
            apoyo: "Prepárala con los pasos de esta materia: escoge un pasaje, estúdialo, escribe la idea central y el propósito, arma el bosquejo, busca una ilustración y una aplicación, y enseña de diez a quince minutos",
            explica: "Se escoge un pasaje, se estudia, se escriben la idea central y el propósito, se arma el bosquejo, se busca una ilustración y una aplicación, y se enseña de diez a quince minutos.",
          },
          {
            consigna: "Ordena cómo llegas al día de grabar tu enseñanza, del primer paso al último.",
            pasos: [
              "Estudiar el pasaje que escogiste",
              "Escribir la idea central y el propósito",
              "Armar el bosquejo con su ilustración y su aplicación",
              "Ensayar en voz alta y medir el tiempo",
              "Grabar la enseñanza en un lugar tranquilo",
            ],
            apoyo: "Ensaya en voz alta al menos dos veces y mide el tiempo",
            explica: "Primero se estudia el pasaje, se escriben la idea central y el propósito y se arma el bosquejo; antes de grabar, se ensaya en voz alta al menos dos veces y se mide el tiempo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Para cerrar el Nivel 3 se pide una enseñanza grabada aprobada",
            ref: "Proverbios 27:17",
            situacion: "Ya preparaste tu enseñanza para cerrar el Nivel 3: pasaje, idea central, bosquejo, ilustración y aplicación. Esta semana la vas a grabar.",
            escenas: [
              {
                id: "e1",
                narra: "Faltan tres días para grabar.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La ensayas en voz alta dos veces o más y mides el tiempo.", valor: 2, explica: "Antes de grabar: ensaya en voz alta al menos dos veces y mide el tiempo.", siguiente: "e2" },
                  { texto: "Nada: prefieres grabarla de una vez, sin ensayar, para que sea natural.", valor: 0, explica: "Antes de grabar se ensaya en voz alta al menos dos veces y se mide el tiempo.", siguiente: "e1b" },
                  { texto: "La lees en silencio una vez, para repasar lo que vas a decir.", valor: 1, explica: "Repasar ayuda, pero se ensaya en voz alta al menos dos veces y se mide el tiempo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Grabas sin ensayar, y al terminar ves que duró veinticinco minutos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La ensayas, la ajustas a diez o quince minutos y la grabas otra vez.", valor: 2, explica: "La enseñanza dura de diez a quince minutos: respeta el tiempo.", siguiente: "e2" },
                  { texto: "La entregas así, porque lo importante es lo que dijiste y no cuánto duró.", valor: 0, explica: "Respeta el tiempo: se enseña de diez a quince minutos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llega el día de grabar.",
                pregunta: "¿Dónde y cómo la grabas?",
                opciones: [
                  { texto: "En un lugar tranquilo y con buena luz, después de probar el sonido.", valor: 2, explica: "Busca un lugar tranquilo y con buena luz, y prueba el sonido." },
                  { texto: "En la cocina mientras la familia cena, así no pierdes más tiempo esperando.", valor: 0, explica: "Antes de grabar se busca un lugar tranquilo y con buena luz." },
                  { texto: "En un lugar tranquilo, sin probar antes cómo se oye el sonido.", valor: 1, explica: "El lugar tranquilo está bien; también se prueba el sonido." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de entregarla, se la muestras a un hermano de confianza, y te dice qué mejorar.",
                pregunta: "¿Cómo recibes lo que te dice?",
                opciones: [
                  { texto: "Lo escuchas con humildad y mejoras lo que haga falta.", valor: 2, explica: "Hierro con hierro se aguza: escucha con humildad lo que otros te digan de tu enseñanza." },
                  { texto: "Te defiendes, porque preparaste la enseñanza con mucho cuidado.", valor: 0, explica: "Un buen maestro sigue aprendiendo toda la vida: se escucha con humildad lo que otros dicen." },
                  { texto: "Le das las gracias y lo piensas, aunque te cuesta oírlo.", valor: 1, explica: "Es un buen comienzo: escucha con humildad, porque un buen maestro sigue aprendiendo toda la vida." },
                ],
              },
            ],
          },
          {
            apoyo: "Ora mientras preparas y antes de hablar, y confía en que el Espíritu Santo lleva la Palabra al corazón",
            ref: "1 Corintios 2:4-5",
            situacion: "Vas a grabar tu enseñanza del Nivel 3 sobre Lucas 15:1-7. Tienes listo el bosquejo, y hoy haces el último ensayo en voz alta delante de tu familia.",
            escenas: [
              {
                id: "e1",
                narra: "Al ensayar, notas que miras todo el tiempo tus notas.",
                pregunta: "¿Qué cambias?",
                opciones: [
                  { texto: "Miras a las personas, y a tus notas solo cuando hace falta.", valor: 2, explica: "Mira a las personas, no al piso ni solo a tus notas." },
                  { texto: "Lees todo de corrido, con los ojos en tus notas, para no equivocarte.", valor: 0, explica: "Se mira a las personas, no solo a las notas." },
                  { texto: "Miras al piso, para que las miradas no te pongan más nervioso.", valor: 0, explica: "Mira a las personas, no al piso." },
                ],
              },
              {
                id: "e2",
                narra: "Tu familia te dice que hablas muy bajo y siempre en el mismo tono.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con un volumen que todos oigan, varías el tono y haces pausas.", valor: 2, explica: "Habla claro y con un volumen que todos oigan; varía el tono y usa pausas." },
                  { texto: "Hablas mucho más rápido y sin pausas, para terminar antes y no cansar a nadie.", valor: 0, explica: "Se habla claro, variando el tono y usando pausas." },
                  { texto: "Subes el volumen, pero sigues en el mismo tono todo el tiempo.", valor: 1, explica: "El volumen ayuda; también conviene variar el tono y usar pausas." },
                ],
              },
              {
                id: "e3",
                narra: "Ya está todo listo para grabar mañana, y te sientes nervioso.",
                pregunta: "¿Qué haces esa noche?",
                opciones: [
                  { texto: "Oras y confías en que el Espíritu lleva la Palabra al corazón.", valor: 2, explica: "La técnica ayuda a que el mensaje se oiga; el Espíritu hace que transforme." },
                  { texto: "Ensayas cinco veces más esa noche, porque todo depende de tu técnica.", valor: 0, explica: "Prepararse es un deber, pero el Espíritu hace que el mensaje transforme: la técnica sola no basta." },
                  { texto: "Decides no grabar nada hasta que el temor se haya ido del todo.", valor: 0, explica: "El temor a hablar es normal; se enfrenta con preparación, oración y confianza en el que nos envía." },
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
            apoyo: "el temor a hablar se enfrenta con preparación, oración y confianza",
            ref: "Éxodo 4:10-12",
            clave: {
              id: "pr-n3-homiletica-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hizo Dios con el temor de Moisés y de Jeremías, y cómo enfrentas tú el temor a hablar?",
              ideas: [
                { id: "promesa", peso: 50, texto: "Dios prometió a Moisés estar con su boca y puso sus palabras en la boca de Jeremías.", formas: ["con (su|tu|mi) boca", "en (su|tu|mi) boca", "(puso|pone|pondria|dio|da|daria) sus palabras", "sus palabras en", "estar con (ellos|el|moises)", "estaria con (ellos|el)", "lo que (hayas|habia|tenia|debia) de hablar", "le (enseno|ensenaria|ensenaba) lo que", "le (enseno|ensenaria|ensenaba) a hablar"] },
                { id: "respuesta", peso: 50, texto: "El temor se enfrenta con preparación, oración y confianza en el que nos envía.", formas: ["prepar*", "(orar|oro|oracion|orando|ore|orare)", "confi* en (dios|el|quien)", "confianza"] },
              ],
              modelo: "Dios no les dijo que hablaban bien: prometió a Moisés estar con su boca y puso sus palabras en la boca de Jeremías. Yo enfrento el temor con preparación, oración y confianza en el que me envía.",
            },
          },
          {
            apoyo: "El que te envía a hablar promete estar con tu boca",
            ref: "Jeremías 1:6-9",
            clave: {
              id: "pr-n3-homiletica-1-6-a7-2",
              tipo: "corta",
              pregunta: "Si sientes temor de hablar en público, ¿qué te enseñan Moisés y Jeremías, y qué paso darás?",
              ideas: [
                { id: "incapaces", peso: 50, texto: "Ellos también se sintieron incapaces, y Dios prometió estar con su boca y poner sus palabras en ella: el temor es normal.", formas: ["incapac*", "tardo en el habla", "no sabia hablar", "era un nino", "(temor|miedo) es normal", "normal (sentir|tener) (temor|miedo)", "con (su|tu|mi) boca", "en (su|tu|mi) boca", "sus palabras"] },
                { id: "paso", peso: 50, texto: "Prepararme, orar y confiar en el que me envía.", formas: ["prepar*", "(orar|orare|oro|oracion|orando)", "confi*", "ensay*"] },
              ],
              modelo: "Ellos también se sintieron incapaces: Moisés era tardo en el habla y Jeremías decía que era un niño, pero Dios prometió estar con su boca. Mi paso será prepararme bien, orar y confiar en el que me envía.",
            },
          },
        ],
      },
    ],
  },
};
