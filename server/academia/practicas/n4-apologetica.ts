/**
 * Las prácticas de «Apologética» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-apologetica.ts), con la guía de docs/academia-practicas.md.
 * Los grupos de la lección 6 se nombran solo como los nombra la lección y con sus mismas afirmaciones.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_APOLOGETICA: PracticasMateria = {
  materia: "n4-apologetica",
  mision: {
    titulo: "Siempre preparados para responder",
    intro: "Tu pastor te encargó un taller para los jóvenes que empiezan la universidad. Allí les preguntan si Dios existe, si se puede confiar en la Biblia, si Jesús de verdad resucitó, por qué un Dios bueno permite el mal y cómo saber si un grupo enseña el evangelio. Repasa las seis lecciones para ayudarles a dar razones de su fe con mansedumbre y reverencia.",
    cierre: "Ya puedes ayudar a otros a dar razones de la fe: creer en Dios es razonable, la Biblia es confiable, Cristo resucitó y la cruz es la respuesta más profunda de Dios al mal. Y sabes probar los espíritus y responder con la Biblia, con paciencia y con amor, siempre preparado, como pide 1 Pedro 3:15.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Qué es la apologética?
    "n4-apologetica-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué palabra griega viene apologética?", reverso: "De apología, la palabra que se traduce defensa.", apoyo: "La palabra griega que se traduce defensa es apología" },
              { frente: "¿Qué es la apologética?", reverso: "La tarea de dar razones de la fe.", apoyo: "de ahí viene apologética, la tarea de dar razones de la fe" },
              { frente: "¿Con qué actitud pide Pedro presentar defensa?", reverso: "Con mansedumbre y reverencia.", apoyo: "siempre preparados, con mansedumbre y reverencia" },
              { frente: "Según Juan 16:8, ¿quién convence de pecado?", reverso: "Solo el Espíritu Santo.", apoyo: "solo el Espíritu Santo convence de pecado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué no es la apologética?", reverso: "Pelear ni ganar discusiones.", apoyo: "No es pelear ni ganar discusiones" },
              { frente: "¿Para qué sirve la apologética?", reverso: "Para quitar los obstáculos que impiden escuchar el evangelio y fortalecer a los que dudan.", apoyo: "La apologética sirve para quitar los obstáculos que impiden escuchar el evangelio" },
              { frente: "¿Qué puede esconder una pregunta sobre Dios?", reverso: "Un dolor o una mala experiencia.", apoyo: "Muchas veces una pregunta sobre Dios esconde un dolor o una mala experiencia" },
              { frente: "¿Qué es prepararte para responder?", reverso: "Una forma de amar a quien pregunta.", apoyo: "Prepararte para responder es una forma de amar a quien pregunta" },
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
            consigna: "Completa de dónde viene el nombre de la apologética y qué es.",
            texto: "La palabra griega que se traduce [[defensa]] es apología: de ahí viene apologética, la tarea de dar [[razones]] de la fe.",
            distractores: ["ataque", "excusas", "burlas"],
            errores: {
              ataque: "La palabra griega apología se traduce defensa, y la apologética no es pelear ni ganar discusiones.",
              excusas: "La apologética es la tarea de dar razones de la fe.",
              burlas: "Se defiende la fe con respeto por la persona, escuchando sus preguntas y sin burlarse.",
            },
            apoyo: "La palabra griega que se traduce defensa es apología",
            ref: "1 Pedro 3:15",
            explica: "La palabra griega que se traduce defensa es apología: de ahí viene apologética, la tarea de dar razones de la fe.",
          },
          {
            consigna: "Completa para qué sirve la apologética.",
            texto: "La apologética sirve para quitar los obstáculos que impiden escuchar el [[evangelio]] y para fortalecer la fe de los [[creyentes]] que tienen [[dudas]].",
            distractores: ["rumor", "enemigos", "certezas"],
            errores: {
              rumor: "La apologética quita los obstáculos que impiden escuchar el evangelio.",
              enemigos: "La apologética fortalece la fe de los creyentes que tienen dudas.",
              certezas: "Fortalece la fe de los creyentes que tienen dudas.",
            },
            apoyo: "La apologética sirve para quitar los obstáculos que impiden escuchar el evangelio y para fortalecer la fe de los creyentes que tienen dudas",
            ref: "2 Corintios 10:5",
            explica: "Pablo habla de llevar cautivo todo pensamiento a la obediencia a Cristo: la apologética quita los obstáculos que impiden escuchar el evangelio y fortalece a los creyentes que tienen dudas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Con qué actitud pide Pedro presentar defensa? Toca las dos palabras que lo dicen.",
            texto: "siempre preparados para presentar defensa con [[mansedumbre]] y [[reverencia]] ante todo el que os demande razón de la esperanza que hay en vosotros",
            apoyo: "siempre preparados, con mansedumbre y reverencia",
            ref: "1 Pedro 3:15",
            explica: "Pedro pide estar siempre preparados para presentar defensa con mansedumbre y reverencia: la manera importa tanto como el argumento.",
          },
          {
            consigna: "¿Cómo debe ser el siervo del Señor? Toca las tres palabras que dicen cómo sí debe ser.",
            texto: "el siervo del Señor no debe ser contencioso, sino [[amable]] para con todos, [[apto]] para enseñar, [[sufrido]]",
            apoyo: "La manera importa tanto como el argumento",
            ref: "2 Timoteo 2:24-25",
            explica: "El siervo del Señor no debe ser contencioso, sino amable para con todos, apto para enseñar, sufrido: se defiende la fe con respeto por la persona.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se defiende la fe o así no se defiende? Lleva cada frase a su grupo.",
            grupos: ["Así se defiende la fe", "Así no se defiende la fe"],
            frases: [
              { texto: "Con respeto por la persona", grupo: 0 },
              { texto: "Escuchando sus preguntas", grupo: 0 },
              { texto: "Siendo amable para con todos", grupo: 0 },
              { texto: "Burlándose de quien pregunta", grupo: 1 },
              { texto: "Peleando para ganar la discusión", grupo: 1, explica: "La apologética no es pelear ni ganar discusiones." },
              { texto: "Siendo contencioso con quien no cree", grupo: 1, explica: "El siervo del Señor no debe ser contencioso, sino amable para con todos." },
            ],
            apoyo: "se defiende la fe con respeto por la persona, escuchando sus preguntas y sin burlarse",
            ref: "2 Timoteo 2:24-25",
            explica: "La manera importa tanto como el argumento: se defiende la fe con respeto por la persona, escuchando sus preguntas y sin burlarse. No es pelear ni ganar discusiones.",
          },
          {
            consigna: "¿Es defender la fe con mansedumbre y reverencia, o sin ellas? Lleva cada frase a su grupo.",
            grupos: ["Con mansedumbre y reverencia", "Sin mansedumbre ni reverencia"],
            frases: [
              { texto: "Escuchar primero a quien pregunta", grupo: 0 },
              { texto: "Ofrecer compasión antes que argumentos, cuando hace falta", grupo: 0 },
              { texto: "Confiar en que el Espíritu Santo es quien convence", grupo: 0 },
              { texto: "Ridiculizar las dudas de los demás", grupo: 1 },
              { texto: "Creer que mis argumentos convencen de pecado", grupo: 1, explica: "Solo el Espíritu Santo convence de pecado, y la fe es un regalo de Dios." },
              { texto: "Responder sin escuchar el dolor que hay detrás", grupo: 1, explica: "Muchas veces una pregunta sobre Dios esconde un dolor: se escucha primero." },
            ],
            apoyo: "Escucha primero: a veces la persona necesita compasión antes que argumentos",
            explica: "Se defiende la fe con mansedumbre y reverencia: se escucha primero, a veces se ofrece compasión antes que argumentos, y se confía en que solo el Espíritu Santo convence de pecado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte del ejemplo de Pablo con lo que hizo o enseñó.",
            pares: [
              ["En Tesalónica, con los judíos", "Partía de las Escrituras"],
              ["En Atenas, con los griegos", "Partió de lo que ellos conocían"],
              ["En las dos ciudades", "El mensaje era el mismo, dicho para sus oyentes"],
              ["En 2 Corintios 10:5", "Derribar argumentos y llevar todo pensamiento a Cristo"],
            ],
            apoyo: "Con los judíos partía de las Escrituras; en Atenas, con los griegos, partió de lo que ellos conocían",
            ref: "Hechos 17:2-3",
            explica: "Con los judíos, Pablo partía de las Escrituras; con los griegos, de lo que ellos conocían: su altar al Dios no conocido y sus poetas. El mensaje era el mismo, pero dicho para sus oyentes.",
          },
          {
            consigna: "Une cada idea del ejemplo de Pablo con lo que le corresponde.",
            pares: [
              ["Lo que Pablo expuso en Tesalónica", "Que el Cristo debía padecer y resucitar"],
              ["Lo que Pablo usó en Atenas", "Su altar al Dios no conocido y sus poetas"],
              ["Lo que no cambió de una ciudad a otra", "El mensaje"],
              ["Quien convence de pecado", "Solo el Espíritu Santo"],
            ],
            apoyo: "El mensaje era el mismo, pero dicho para sus oyentes",
            ref: "Hechos 17:22-31",
            explica: "En Tesalónica, Pablo expuso por las Escrituras que el Cristo debía padecer y resucitar; en Atenas partió de su altar al Dios no conocido y de sus poetas. El mensaje era el mismo, y es el Espíritu quien convence.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Pablo razonaba desde las Escrituras con los judíos y desde lo que conocían con los griegos, confiando en que el Espíritu convence",
            ref: "Hechos 17:22-31",
            situacion: "Eres maestro de jóvenes. Un vecino que no cree en la Biblia te pregunta, delante de otros, por qué crees en Jesús.",
            escenas: [
              {
                id: "e1",
                narra: "Te lo pregunta con algo de enojo: ¿Cómo puedes creer en un Dios que nadie ve?",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Le preguntas con calma qué lo lleva a pensar así, y lo escuchas.", valor: 2, explica: "Muchas veces una pregunta sobre Dios esconde un dolor o una mala experiencia: escucha primero.", siguiente: "e2" },
                  { texto: "Le das enseguida tres argumentos para mostrarle que se equivoca.", valor: 1, explica: "Primero se escucha: a veces la persona necesita compasión antes que argumentos.", siguiente: "e2" },
                  { texto: "Le dices delante de todos que su pregunta es tonta y cambias de tema.", valor: 0, explica: "Se defiende la fe con respeto por la persona, escuchando sus preguntas y sin burlarse.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Tu vecino se molesta y dice: ¿Ves? Los creyentes no aguantan una pregunta.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón y le dices que de verdad quieres escuchar su pregunta.", valor: 2, explica: "El siervo del Señor no debe ser contencioso, sino amable para con todos: la manera importa tanto como el argumento.", siguiente: "e2" },
                  { texto: "Le respondes que él tampoco sabe nada, para quedar tú por encima de él.", valor: 0, explica: "La apologética no es pelear ni ganar discusiones, sino ayudar a otros a ver que la fe en Cristo es verdadera y razonable.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Tu vecino te cuenta que no acepta la Biblia como prueba de nada.",
                pregunta: "¿Cómo sigues, a la manera de Pablo?",
                opciones: [
                  { texto: "Partes de lo que él ya conoce, como Pablo en Atenas, y llegas a Cristo.", valor: 2, explica: "En Atenas, con los griegos, Pablo partió de lo que ellos conocían: el mensaje era el mismo, pero dicho para sus oyentes." },
                  { texto: "Le citas varios versículos de todos modos, como hacía Pablo en Tesalónica.", valor: 1, explica: "Con los judíos Pablo partía de las Escrituras; en Atenas, con los griegos, partió de lo que ellos conocían." },
                  { texto: "Le das un mensaje distinto, más a su gusto, para no perder al amigo.", valor: 0, explica: "Pablo lo decía para sus oyentes, pero el mensaje era el mismo." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, tu vecino te dice que lo va a pensar, pero que todavía no cree.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le agradeces la charla y confías en que el Espíritu es quien convence.", valor: 2, explica: "Solo el Espíritu Santo convence de pecado, y la fe es un regalo de Dios." },
                  { texto: "Le prometes que la próxima vez traerás mejores argumentos que lo harán creer.", valor: 1, explica: "Prepararte para responder es una forma de amar a quien pregunta, pero solo el Espíritu Santo convence de pecado." },
                  { texto: "Insistes y le dices que no se va de ahí hasta que crea en Jesús.", valor: 0, explica: "La apologética no es pelear ni ganar discusiones: solo el Espíritu Santo convence de pecado." },
                ],
              },
            ],
          },
          {
            apoyo: "Con los judíos partía de las Escrituras; en Atenas, con los griegos, partió de lo que ellos conocían",
            ref: "Hechos 17:2-3",
            situacion: "Eres maestro de la escuela dominical. Esta semana vas a hablar de Jesús con dos personas: tu tío, que lee la Biblia desde niño, y una vecina que nunca la ha leído.",
            escenas: [
              {
                id: "e1",
                narra: "Tu tío conoce bien la Biblia, pero no cree que Jesús sea el Cristo.",
                pregunta: "¿Desde dónde le hablas?",
                opciones: [
                  { texto: "Desde las Escrituras, como Pablo con los judíos de Tesalónica.", valor: 2, explica: "Con los judíos Pablo partía de las Escrituras: exponía por medio de ellas que era necesario que el Cristo padeciese y resucitase." },
                  { texto: "Desde tus propias vivencias, sin abrir la Biblia que él conoce tan bien.", valor: 1, explica: "Con los judíos Pablo partía de las Escrituras, y tu tío las conoce bien." },
                  { texto: "Desde una discusión fuerte, para demostrarle que está equivocado.", valor: 0, explica: "La apologética no es pelear ni ganar discusiones." },
                ],
              },
              {
                id: "e2",
                narra: "Tu vecina nunca ha leído la Biblia, pero conoce muy bien los dichos y las canciones de su tierra.",
                pregunta: "¿Cómo empiezas con ella?",
                opciones: [
                  { texto: "Partes de lo que ella conoce, como Pablo con los poetas de Atenas.", valor: 2, explica: "En Atenas, con los griegos, Pablo partió de lo que ellos conocían: su altar al Dios no conocido y sus poetas." },
                  { texto: "Le lees un pasaje largo sin explicarle nada, como lo harías con tu tío.", valor: 1, explica: "Con los judíos Pablo partía de las Escrituras; con los griegos partió de lo que ellos conocían." },
                  { texto: "Le hablas solo de sus dichos y canciones, y nunca llegas a Cristo.", valor: 0, explica: "Pablo partió de lo que conocían, pero el mensaje era el mismo." },
                ],
              },
              {
                id: "e3",
                narra: "Un amigo te pregunta por qué no les hablaste igual a los dos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el mensaje fue el mismo, pero dicho para cada uno, como Pablo.", valor: 2, explica: "Así lo hacía Pablo: el mensaje era el mismo, pero dicho para sus oyentes." },
                  { texto: "Que lo importante es el mensaje, y que la manera de decirlo da igual.", valor: 1, explica: "La manera importa tanto como el argumento: Pablo decía el mismo mensaje para sus oyentes." },
                  { texto: "Que a cada uno le diste el evangelio que más le iba a gustar oír.", valor: 0, explica: "Pablo cambiaba la manera de decirlo, no el mensaje: el mensaje era el mismo." },
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
            apoyo: "La apologética es dar razones de la fe, como pide 1 Pedro 3:15",
            ref: "1 Pedro 3:15",
            clave: {
              id: "pr-n4-apologetica-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es la apologética, y qué pide 1 Pedro 3:15 a los creyentes?",
              ideas: [
                { id: "razones", peso: 40, texto: "La apologética es la tarea de dar razones de la fe: su nombre viene de apología, defensa.", formas: ["razon* (fe|esperanza)", "dar razon*", "dar (las|una|buenas) razon*", "defend* fe", "apologia", "defensa"] },
                { id: "preparados", peso: 30, texto: "Pedro pide estar siempre preparados para presentar defensa.", formas: ["siempre preparad*", "estar preparad*", "preparad*", "(estemos|estar|estes|esten|estamos|vivir) listos", "listos para"] },
                { id: "actitud", peso: 30, texto: "Y hacerlo con mansedumbre y reverencia, con respeto por la persona.", formas: ["mansedumbre", "reverencia", "respeto", "amable*", "amabilidad", "con amor", "humild*", "sin (pelear|burla*)"] },
              ],
              errores: [
                { id: "pelear", texto: "La apologética no es pelear ni ganar discusiones, sino ayudar a otros a ver que la fe en Cristo es verdadera y razonable.", formas: ["es (pelear|discutir|atacar)", "ganar* (la|las) discusion*", "ganar* (el|los) debate*"], anula: "razones" },
              ],
              modelo: "La apologética es la tarea de dar razones de la fe; su nombre viene de apología, que se traduce defensa. 1 Pedro 3:15 pide estar siempre preparados para presentar defensa con mansedumbre y reverencia.",
            },
          },
          {
            apoyo: "No es pelear, sino quitar obstáculos para que otros escuchen el evangelio y fortalecer a los que dudan",
            ref: "2 Corintios 10:5",
            clave: {
              id: "pr-n4-apologetica-1-a7-2",
              tipo: "corta",
              pregunta: "¿Para qué sirve la apologética, si no es para pelear ni para ganar discusiones?",
              ideas: [
                { id: "obstaculos", peso: 50, texto: "Sirve para quitar los obstáculos que impiden escuchar el evangelio.", formas: ["quitar (los|obstaculo*|barrera*)", "obstaculo*", "barrera*", "(escuchar|escuchen|oir|oigan) el evangelio", "impiden"] },
                { id: "fortalecer", peso: 50, texto: "Y para fortalecer la fe de los creyentes que tienen dudas.", formas: ["fortalec*", "(los|creyentes|hermanos|que) (dudan|duden)", "tienen dudas", "con dudas", "afirmar la fe", "animar a los que"] },
              ],
              modelo: "La apologética sirve para quitar los obstáculos que impiden escuchar el evangelio y para fortalecer la fe de los creyentes que tienen dudas. Ayuda a otros a ver que la fe en Cristo es verdadera y razonable.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La existencia de Dios
    "n4-apologetica-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué tiene todo lo que comienza a existir?", reverso: "Una causa.", apoyo: "Lo que comienza a existir tiene una causa" },
              { frente: "Si el universo comenzó, ¿cómo debe ser su causa?", reverso: "Eterna, poderosa y personal, fuera del tiempo, del espacio y de la materia.", apoyo: "necesita una causa que esté fuera del tiempo, del espacio y de la materia" },
              { frente: "¿Qué ejemplo usa la lección para el argumento del diseño?", reverso: "Así como un reloj hace pensar en un relojero.", apoyo: "Así como un reloj hace pensar en un relojero, el orden del mundo apunta a una mente que lo diseñó" },
              { frente: "¿A quién apunta la ley moral que todos reconocen?", reverso: "A un Legislador moral.", apoyo: "Esa ley moral que todos reconocen, aunque no la cumplan, apunta a un Legislador moral" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué habla la ciencia moderna sobre el universo?", reverso: "De un comienzo del universo.", apoyo: "La ciencia moderna habla de un comienzo del universo" },
              { frente: "¿Qué muestra el universo, según el argumento del diseño?", reverso: "Orden y precisión: leyes estables, medidas exactas y la información del ADN.", apoyo: "El universo muestra orden y precisión" },
              { frente: "¿Qué ejemplo da la lección de algo que está mal siempre?", reverso: "Torturar a un niño por diversión.", apoyo: "Todos sabemos que algunas cosas están mal siempre, como torturar a un niño por diversión" },
              { frente: "¿Le teme la fe bíblica a la ciencia?", reverso: "No: muchos de sus pioneros, como Kepler, Newton y Pasteur, creían en Dios.", apoyo: "La fe bíblica no le teme a la ciencia: muchos de sus pioneros, como Kepler, Newton y Pasteur, creían en Dios" },
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
            consigna: "¿De qué argumento es cada frase: del comienzo, del diseño o el moral? Lleva cada frase a su grupo.",
            grupos: ["El argumento del comienzo", "El argumento del diseño", "El argumento moral"],
            frases: [
              { texto: "Lo que comienza a existir tiene una causa", grupo: 0 },
              { texto: "La ciencia habla de un comienzo del universo", grupo: 0 },
              { texto: "Se necesita una causa fuera del tiempo y del espacio", grupo: 0 },
              { texto: "Leyes estables y medidas exactas", grupo: 1 },
              { texto: "La información compleja del ADN", grupo: 1 },
              { texto: "Un reloj hace pensar en un relojero", grupo: 1 },
              { texto: "Algunas cosas están mal siempre", grupo: 2 },
              { texto: "Todos reconocen una ley, aunque no la cumplan", grupo: 2 },
            ],
            apoyo: "el orden y el diseño del mundo apuntan a una mente",
            explica: "Lo que comienza a existir tiene una causa, y el universo comenzó; el orden y el diseño apuntan a una mente; la ley moral escrita en la conciencia apunta a un Legislador.",
          },
          {
            consigna: "¿A qué apunta cada señal: a una causa que creó, a una mente que diseñó o a un Legislador moral? Lleva cada frase a su grupo.",
            grupos: ["A una causa que creó", "A una mente que diseñó", "A un Legislador moral"],
            frases: [
              { texto: "El universo comenzó a existir", grupo: 0 },
              { texto: "Todo lo que comienza tiene una causa", grupo: 0 },
              { texto: "Las medidas exactas que permiten la vida", grupo: 1 },
              { texto: "El orden y la precisión del universo", grupo: 1 },
              { texto: "Las leyes estables del mundo", grupo: 1 },
              { texto: "La ley moral que todos reconocen", grupo: 2 },
              { texto: "La conciencia que da testimonio", grupo: 2 },
              { texto: "Saber que torturar a un niño está mal", grupo: 2 },
            ],
            apoyo: "la ley moral escrita en la conciencia apunta a un Legislador",
            explica: "El comienzo del universo apunta a una causa que decidió crear; el orden y la precisión, a una mente que lo diseñó; y la ley moral que todos reconocen, a un Legislador moral.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el argumento del comienzo del universo.",
            texto: "Si el universo [[comenzó]], necesita una causa que esté fuera del [[tiempo]], del espacio y de la materia, capaz de decidir [[crear]].",
            distractores: ["terminó", "cielo", "destruir"],
            errores: {
              "terminó": "El argumento parte de que el universo comenzó: lo que comienza a existir tiene una causa.",
              cielo: "La causa está fuera del tiempo, del espacio y de la materia.",
              destruir: "La causa es eterna, inmensamente poderosa y personal, capaz de decidir crear.",
            },
            apoyo: "Si el universo comenzó, necesita una causa que esté fuera del tiempo, del espacio y de la materia",
            ref: "Génesis 1:1",
            explica: "Lo que comienza a existir tiene una causa. Si el universo comenzó, necesita una causa fuera del tiempo, del espacio y de la materia: eterna, poderosa y personal, capaz de decidir crear.",
          },
          {
            consigna: "Completa el argumento del orden y el diseño.",
            texto: "El universo muestra orden y [[precisión]]: leyes [[estables]], medidas exactas que permiten la [[vida]] y una información compleja como la del ADN.",
            distractores: ["desorden", "caóticas", "muerte"],
            errores: {
              desorden: "El universo muestra orden y precisión.",
              "caóticas": "El universo muestra leyes estables.",
              muerte: "Sus medidas exactas permiten la vida.",
            },
            apoyo: "El universo muestra orden y precisión: leyes estables, medidas exactas que permiten la vida",
            ref: "Salmos 19:1",
            explica: "El universo muestra orden y precisión: leyes estables, medidas exactas que permiten la vida y la información del ADN. Así como un reloj hace pensar en un relojero, ese orden apunta a una mente que lo diseñó.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que enseña sobre Dios.",
            pares: [
              ["Romanos 1:20", "Su «eterno poder y deidad» se ven desde la creación"],
              ["Salmos 19:1", "«Los cielos cuentan la gloria de Dios»"],
              ["Romanos 2:14-15", "La obra de la ley está escrita en el corazón"],
              ["Génesis 1:1", "«En el principio creó Dios los cielos y la tierra»"],
            ],
            apoyo: "Pablo afirma que el «eterno poder y deidad» de Dios se hacen claramente visibles desde la creación del mundo",
            explica: "Romanos 1:20 dice que el eterno poder y deidad de Dios se ven desde la creación; Salmos 19:1, que los cielos cuentan su gloria; Romanos 2:14-15, que la obra de la ley está escrita en el corazón; y Génesis 1:1, que Dios creó los cielos y la tierra.",
          },
          {
            consigna: "¿Con qué pasaje concuerda cada argumento? Une cada argumento con su pasaje.",
            pares: [
              ["El universo comenzó y tiene una causa", "Génesis 1:1"],
              ["El orden del mundo apunta a una mente", "Salmos 19:1"],
              ["La ley moral apunta a un Legislador", "Romanos 2:14-15"],
              ["El eterno poder de Dios se ve en lo creado", "Romanos 1:20"],
            ],
            apoyo: "Eso concuerda con la primera frase de la Biblia",
            explica: "El comienzo del universo concuerda con Génesis 1:1; el orden del mundo, con Salmos 19:1; la ley moral escrita en la conciencia, con Romanos 2:14-15; y Romanos 1:20 dice que el eterno poder de Dios se ve desde la creación.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que pueden hacer los argumentos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los argumentos muestran que la fe es razonable y quitan excusas.", verdad: true, explica: "Eso es lo que pueden hacer: muestran que la fe es razonable y quitan excusas.", apoyo: "muestran que la fe es razonable y quitan excusas" },
              { texto: "Un buen argumento obliga a cualquier persona a creer en Dios.", verdad: false, explica: "Estos argumentos no obligan a nadie a creer ni llevan por sí solos a Cristo.", apoyo: "Estos argumentos no obligan a nadie a creer" },
              { texto: "Para conocer a Dios como Padre hacen falta su Palabra y la obra del Espíritu.", verdad: true, explica: "Para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu.", apoyo: "Para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu", ref: "Hebreos 11:6" },
            ],
          },
          {
            consigna: "Sobre los argumentos, la ciencia y la fe: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los argumentos llevan por sí solos a una persona a Cristo.", verdad: false, explica: "No llevan por sí solos a Cristo: hacen falta la revelación de su Palabra y la obra del Espíritu.", apoyo: "ni llevan por sí solos a Cristo" },
              { texto: "Los argumentos muestran que la fe es razonable, pero no reemplazan la fe.", verdad: true, explica: "Muestran que la fe es razonable, pero «sin fe es imposible agradar a Dios».", apoyo: "muestran que la fe es razonable, pero no reemplazan la fe", ref: "Hebreos 11:6" },
              { texto: "Lo que la Biblia rechaza es la ciencia.", verdad: false, explica: "Lo que la Biblia rechaza no es la ciencia, sino la idea de que el universo no tiene Creador.", apoyo: "Lo que la Biblia rechaza no es la ciencia, sino la idea de que el universo no tiene Creador" },
              { texto: "Kepler, Newton y Pasteur, pioneros de la ciencia, creían en Dios.", verdad: true, explica: "La fe bíblica no le teme a la ciencia: muchos de sus pioneros creían en Dios.", apoyo: "muchos de sus pioneros, como Kepler, Newton y Pasteur, creían en Dios" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Le di a mi amigo los tres argumentos y no creyó. ¿Qué hice mal?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los argumentos muestran que la fe es razonable, pero no obligan a creer.", bien: true, explica: "Estos argumentos no obligan a nadie a creer ni llevan por sí solos a Cristo: muestran que la fe es razonable y quitan excusas." },
              { texto: "Que le faltó un argumento más fuerte: con el argumento correcto, su amigo ya creería.", explica: "Ningún argumento obliga a creer: para conocer a Dios hacen falta su Palabra y la fe." },
              { texto: "Que no vuelva a usarlos, porque los argumentos no sirven para nada.", explica: "Los argumentos sí sirven: muestran que la fe es razonable y quitan excusas." },
              { texto: "Que le insista cada día con los mismos argumentos hasta que crea.", explica: "Estos argumentos no obligan a nadie a creer: hacen falta la Palabra de Dios y la obra del Espíritu." },
            ],
            apoyo: "Estos argumentos no obligan a nadie a creer ni llevan por sí solos a Cristo",
            ref: "Hebreos 11:6",
            explica: "Los argumentos muestran que la fe es razonable y quitan excusas, pero para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu.",
          },
          {
            caso: "Un hermano de tu célula te dice: Si estos argumentos muestran que Dios existe, ya no necesito tener fe.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que muestran que creer es razonable, pero «sin fe es imposible agradar a Dios».", bien: true, explica: "Los argumentos muestran que la fe es razonable, pero no reemplazan la fe." },
              { texto: "Que tiene razón: con los argumentos ya se conoce a Dios como Padre, sin necesidad de fe.", explica: "Para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu." },
              { texto: "Que los argumentos están mal, porque la fe no tiene nada de razonable.", explica: "Creer en Dios es razonable: eso es lo que muestran los argumentos." },
              { texto: "Que la fe es solo para quienes todavía no conocen estos argumentos.", explica: "Los argumentos no reemplazan la fe: «sin fe es imposible agradar a Dios»." },
            ],
            apoyo: "Para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu",
            ref: "Hebreos 11:6",
            explica: "Los argumentos muestran que la fe es razonable, pero no reemplazan la fe: para conocer a Dios hacen falta su Palabra y la fe.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Lo que comienza a existir tiene una causa, y el universo comenzó",
            ref: "Génesis 1:1",
            clave: {
              id: "pr-n4-apologetica-2-a7-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras el argumento del comienzo del universo: ¿qué dice y a qué conclusión llega?",
              ideas: [
                { id: "causa", peso: 50, texto: "Lo que comienza a existir tiene una causa, y el universo comenzó.", formas: ["comienza a existir", "empieza a existir", "comenz* a existir", "empez* a existir", "tiene (una|su) causa", "tienen (una|su) causa", "universo (comenzo|empezo)", "un comienzo", "un principio", "tuvo (un|su) (comienzo|principio|inicio)"] },
                { id: "conclusion", peso: 50, texto: "Necesita una causa fuera del tiempo, del espacio y de la materia: eterna, poderosa y personal, como dice Génesis 1:1.", formas: ["fuera del tiempo", "fuera del espacio", "fuera de la materia", "eterna", "eterno", "poderos*", "decidi* crear", "en el principio", "(un|el) creador"] },
              ],
              errores: [
                { id: "siempre-existio", texto: "La ciencia moderna habla de un comienzo del universo, y lo que comienza a existir tiene una causa.", formas: ["universo (siempre|ha) existi*", "siempre existio", "siempre ha existido", "(materia|universo) es etern*", "no (tiene|necesita|tuvo) (una|ninguna|un) (causa|comienzo|principio)"], anula: "causa" },
                { id: "siempre-existio-2", texto: "Si el universo comenzó, necesita una causa que esté fuera del tiempo, del espacio y de la materia.", formas: ["universo (siempre|ha) existi*", "siempre existio", "siempre ha existido", "(materia|universo) es etern*", "no (tiene|necesita|tuvo) (una|ninguna|un) (causa|comienzo|principio)"], anula: "conclusion" },
              ],
              modelo: "Todo lo que comienza a existir tiene una causa, y la ciencia dice que el universo comenzó. Por eso necesita una causa fuera del tiempo, del espacio y de la materia: eterna, poderosa y personal, como dice Génesis 1:1.",
            },
          },
          {
            apoyo: "la ley moral escrita en la conciencia apunta a un Legislador",
            ref: "Romanos 2:14-15",
            clave: {
              id: "pr-n4-apologetica-2-a7-2",
              tipo: "corta",
              pregunta: "Explica con tus palabras el argumento moral: ¿qué sabemos todos, y a quién apunta eso?",
              ideas: [
                { id: "ley", peso: 50, texto: "Todos sabemos que algunas cosas están mal siempre, como torturar a un niño por diversión: es una ley moral que todos reconocen.", formas: ["mal siempre", "siempre (esta|estan) mal", "(es|son|esta|estan) (malo|mala|malas|malos) siempre", "tortur*", "ley moral", "todos (reconoc*|sabemos|saben|conocen)", "(la|lo) reconocen", "dano a un nino"] },
                { id: "legislador", peso: 50, texto: "Esa ley apunta a un Legislador moral: Pablo dice que está escrita en el corazón, y la conciencia da testimonio.", formas: ["legislador", "apunta a (dios|un|alguien)", "viene de dios", "dios (la|lo) (puso|escribio)", "escrita en el corazon", "en el corazon", "conciencia (da|dando) testimonio"] },
              ],
              errores: [
                { id: "cada-uno", texto: "Todos sabemos que algunas cosas están mal siempre: es una ley moral que todos reconocen, aunque no la cumplan.", formas: ["cada (uno|persona|quien) decide", "depende de cada", "no hay (una|ninguna) ley", "nada (esta|es) mal siempre", "invento de la sociedad", "la sociedad (la|las|lo|los) invento"], anula: "ley" },
              ],
              modelo: "Todos sabemos que algunas cosas están mal siempre, como torturar a un niño por diversión. Esa ley moral que todos reconocen apunta a un Legislador moral: Pablo dice que está escrita en el corazón.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. ¿Es confiable la Biblia?
    "n4-apologetica-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántos manuscritos griegos del Nuevo Testamento se conservan?", reverso: "Más de cinco mil, muchos más que de cualquier otro libro antiguo.", apoyo: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos" },
              { frente: "¿Qué mostraron los rollos del mar Muerto?", reverso: "Que el Antiguo Testamento se copió con gran fidelidad durante unos mil años.", apoyo: "Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad durante unos mil años" },
              { frente: "¿Cómo se presenta la Biblia, según la lección?", reverso: "Como el testimonio de hechos reales, en lugares y tiempos concretos.", apoyo: "La Biblia no se presenta como un libro de mitos, sino como el testimonio de hechos reales" },
              { frente: "¿Qué hizo Lucas antes de escribir a Teófilo?", reverso: "Investigó con diligencia todas las cosas desde su origen.", apoyo: "Lucas escribió después de haber «investigado con diligencia todas las cosas desde su origen»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Tenemos los originales de la Biblia?", reverso: "No, pero podemos saber con gran seguridad lo que decían.", apoyo: "No tenemos los originales, pero sí podemos saber con gran seguridad lo que decían" },
              { frente: "¿Qué menciona la inscripción hallada en Tel Dan?", reverso: "La casa de David.", apoyo: "Una inscripción hallada en Tel Dan en 1993 menciona la casa de David" },
              { frente: "¿En cuántos años y por cuántos autores se escribió la Biblia?", reverso: "En unos mil quinientos años, por unos cuarenta autores.", apoyo: "la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores" },
              { frente: "¿Qué nos asegura el testimonio del Espíritu Santo?", reverso: "Que la Biblia es la Palabra de Dios.", apoyo: "que nos asegura que la Biblia es la Palabra de Dios" },
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
            consigna: "Completa por qué el texto del Nuevo Testamento es confiable.",
            texto: "Del Nuevo Testamento se conservan más de cinco mil manuscritos [[griegos]], muchos más que de cualquier otro [[libro]] antiguo, y algunos fragmentos son de pocas generaciones después de los [[apóstoles]].",
            distractores: ["latinos", "templo", "profetas"],
            errores: {
              latinos: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos.",
              templo: "Son muchos más manuscritos que de cualquier otro libro antiguo.",
              profetas: "Algunos fragmentos son de pocas generaciones después de los apóstoles.",
            },
            apoyo: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, muchos más que de cualquier otro libro antiguo",
            explica: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, más que de cualquier otro libro antiguo, y algunos fragmentos son de pocas generaciones después de los apóstoles.",
          },
          {
            consigna: "Completa lo que mostraron los rollos del mar Muerto.",
            texto: "Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran [[fidelidad]] durante unos mil años. No tenemos los originales, pero sí podemos saber con gran [[seguridad]] lo que decían.",
            distractores: ["descuido", "duda", "prisa"],
            errores: {
              descuido: "Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad.",
              duda: "Aunque no tenemos los originales, sí podemos saber con gran seguridad lo que decían.",
              prisa: "El Antiguo Testamento se copió con gran fidelidad durante unos mil años.",
            },
            apoyo: "No tenemos los originales, pero sí podemos saber con gran seguridad lo que decían",
            explica: "Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad durante unos mil años: no tenemos los originales, pero sí podemos saber con gran seguridad lo que decían.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los hallazgos de la arqueología: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una piedra hallada en Cesarea lleva el nombre de Poncio Pilato.", verdad: true, explica: "Una piedra hallada en Cesarea en 1961 lleva el nombre de Poncio Pilato, el gobernador que juzgó a Jesús.", apoyo: "Una piedra hallada en Cesarea en 1961 lleva el nombre de Poncio Pilato" },
              { texto: "La inscripción hallada en Tel Dan menciona a Poncio Pilato.", verdad: false, explica: "La inscripción de Tel Dan menciona la casa de David; el nombre de Pilato está en una piedra hallada en Cesarea.", apoyo: "Una inscripción hallada en Tel Dan en 1993 menciona la casa de David" },
              { texto: "La arqueología prueba la fe.", verdad: false, explica: "La arqueología no prueba la fe, pero una y otra vez ha confirmado nombres, lugares y costumbres que la Biblia menciona.", apoyo: "La arqueología no prueba la fe" },
            ],
          },
          {
            consigna: "Sobre lo que ha confirmado la arqueología: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El estanque de Siloé se descubrió en Jerusalén en 2004.", verdad: true, explica: "El estanque de Siloé, donde Jesús mandó lavarse a un ciego, se descubrió en Jerusalén en 2004.", apoyo: "se descubrió en Jerusalén en 2004", ref: "Juan 9:7" },
              { texto: "La arqueología ha confirmado nombres, lugares y costumbres que la Biblia menciona.", verdad: true, explica: "La arqueología no prueba la fe, pero una y otra vez ha confirmado nombres, lugares y costumbres de la Biblia.", apoyo: "una y otra vez ha confirmado nombres, lugares y costumbres que la Biblia menciona" },
              { texto: "Poncio Pilato es el rey que algunos decían que nunca existió.", verdad: false, explica: "El rey que algunos decían que nunca existió es David; Poncio Pilato fue el gobernador que juzgó a Jesús.", apoyo: "menciona la casa de David, el rey que algunos decían que nunca existió" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada hallazgo con el lugar y el año en que se halló.",
            pares: [
              ["La inscripción que menciona la casa de David", "Tel Dan, en 1993"],
              ["La piedra con el nombre de Poncio Pilato", "Cesarea, en 1961"],
              ["El estanque de Siloé", "Jerusalén, en 2004"],
            ],
            apoyo: "la arqueología ha confirmado nombres y lugares como la casa de David, Poncio Pilato y el estanque de Siloé",
            explica: "En Tel Dan, en 1993, se halló la inscripción de la casa de David; en Cesarea, en 1961, la piedra con el nombre de Pilato; y en Jerusalén, en 2004, se descubrió el estanque de Siloé.",
          },
          {
            consigna: "Une cada nombre o lugar que confirmó la arqueología con lo que dice de él la lección.",
            pares: [
              ["David", "El rey que algunos decían que nunca existió"],
              ["Poncio Pilato", "El gobernador que juzgó a Jesús"],
              ["El estanque de Siloé", "Donde Jesús mandó lavarse a un ciego"],
            ],
            apoyo: "Una piedra hallada en Cesarea en 1961 lleva el nombre de Poncio Pilato, el gobernador que juzgó a Jesús",
            ref: "Juan 9:7",
            explica: "La inscripción de Tel Dan menciona la casa de David, el rey que algunos decían que nunca existió; la piedra de Cesarea, a Pilato, el gobernador que juzgó a Jesús; y en Jerusalén se descubrió el estanque de Siloé.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la unidad de la Biblia tiene un error. Tócala.",
            frases: [
              "La Biblia se escribió a lo largo de unos mil quinientos años.",
              "La escribieron unos cuarenta autores.",
              "Cada autor dejó un mensaje distinto, sin relación con los demás.",
              "Su mensaje es que Dios rescata a su pueblo por medio de Cristo.",
            ],
            malo: 2,
            correccion: "Aunque la escribieron unos cuarenta autores, la Biblia tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo.",
            apoyo: "tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo",
            explica: "Aunque la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores, tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo.",
          },
          {
            consigna: "Una de estas frases sobre las profecías tiene un error. Tócala.",
            frases: [
              "Dios dice que anuncia «lo por venir desde el principio».",
              "Miqueas 5:2 anunció el nacimiento en Belén.",
              "Isaías 53 habla del siervo sufriente.",
              "Esas profecías se cumplieron en Jesús pocos días después.",
            ],
            malo: 3,
            correccion: "Esas profecías se cumplieron en Jesús siglos después.",
            apoyo: "se cumplieron en Jesús siglos después",
            ref: "Isaías 46:9-10",
            explica: "Profecías como el nacimiento en Belén (Miqueas 5:2) o el siervo sufriente (Isaías 53) se cumplieron en Jesús siglos después: Dios anuncia lo por venir desde el principio.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu clase te dice: La Biblia la escribieron muchos autores en muchos siglos; seguro no tiene un mensaje claro.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que, aunque son unos cuarenta autores, tiene un solo mensaje: Dios rescata por Cristo.", bien: true, explica: "Aunque la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores, tiene un solo mensaje." },
              { texto: "Que tiene razón: cada autor escribió su propia idea, sin relación con los demás autores.", explica: "La Biblia tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo." },
              { texto: "Que la escribió un solo autor en pocos años, y por eso dice siempre lo mismo en todo.", explica: "La Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores." },
              { texto: "Que el mensaje no importa tanto: lo que vale de la Biblia son sus buenas historias.", explica: "Lo que muestra su origen divino es justamente su mensaje único a lo largo de siglos." },
            ],
            apoyo: "aunque la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores, tiene un solo mensaje",
            explica: "Aunque la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores, tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo.",
          },
          {
            caso: "Una vecina te dice: ¿Por qué crees que la Biblia viene de Dios y no solo de los hombres?",
            pregunta: "¿Qué evidencia de la lección le das?",
            opciones: [
              { texto: "Que sus profecías se cumplieron en Jesús, como la de Belén, y su mensaje es único.", bien: true, explica: "Sus profecías cumplidas y su mensaje único a lo largo de siglos muestran su origen divino." },
              { texto: "Que es el libro que más se vende en el mundo, y con eso basta para saber que es de Dios.", explica: "La lección da otras razones: las profecías cumplidas y su mensaje único a lo largo de siglos." },
              { texto: "Que nadie la copió nunca, y por eso la tenemos igual que cuando se escribió.", explica: "Se copió durante siglos: no tenemos los originales, pero sí podemos saber con gran seguridad lo que decían." },
              { texto: "Que la arqueología prueba la fe, y así ya no hace falta creer en nada más.", explica: "La arqueología no prueba la fe, pero ha confirmado nombres, lugares y costumbres de la Biblia." },
            ],
            apoyo: "sus profecías cumplidas y su mensaje único a lo largo de siglos muestran su origen divino",
            ref: "Isaías 46:9-10",
            explica: "Profecías como el nacimiento en Belén o el siervo sufriente se cumplieron en Jesús siglos después, y la Biblia tiene un solo mensaje a lo largo de siglos: eso muestra su origen divino.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "No tenemos los originales, pero sí podemos saber con gran seguridad lo que decían",
            clave: {
              id: "pr-n4-apologetica-3-a7-1",
              tipo: "corta",
              pregunta: "Alguien te dice que la Biblia se cambió con los siglos. ¿Por qué podemos confiar en el texto que tenemos?",
              ideas: [
                { id: "manuscritos", peso: 50, texto: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, más que de cualquier otro libro antiguo.", formas: ["manuscrit*", "cinco mil", "5000", "5 000", "miles de (copias|manuscritos)", "copias antiguas", "fragmentos"] },
                { id: "rollos", peso: 50, texto: "Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad durante unos mil años.", formas: ["mar muerto", "rollos", "fidelidad", "fielmente", "copio con (gran|mucho|mucha|cuidado)", "copiaron con (cuidado|fidelidad)", "copiado con"] },
              ],
              errores: [
                { id: "originales", texto: "No tenemos los originales, pero sí podemos saber con gran seguridad lo que decían.", formas: ["tenemos los originales", "(existen|hay|tenemos) los originales", "se conservan los originales"], anula: "manuscritos" },
              ],
              modelo: "Porque del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, más que de cualquier otro libro antiguo. Y los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad durante unos mil años.",
            },
          },
          {
            apoyo: "La Biblia no se presenta como un libro de mitos, sino como el testimonio de hechos reales, en lugares y tiempos concretos",
            ref: "Lucas 1:1-4",
            clave: {
              id: "pr-n4-apologetica-3-a7-2",
              tipo: "corta",
              pregunta: "¿Qué le responderías a alguien que dice que la Biblia es un libro de mitos? Usa dos evidencias de la lección.",
              ideas: [
                { id: "hechos", peso: 50, texto: "La Biblia se presenta como el testimonio de hechos reales, en lugares y tiempos concretos, como lo investigó Lucas.", formas: ["hechos reales", "testimonio", "lugares y tiempos", "tiempos concretos", "lugares (reales|concretos)", "investig*", "lucas"] },
                { id: "evidencia", peso: 50, texto: "La arqueología ha confirmado nombres y lugares, como la casa de David, Poncio Pilato y el estanque de Siloé.", formas: ["arqueolog*", "casa de david", "pilato", "siloe", "tel dan", "cesarea", "inscripcion", "manuscrit*", "mar muerto", "profecia*"] },
              ],
              modelo: "Le diría que la Biblia se presenta como el testimonio de hechos reales, en lugares y tiempos concretos, como lo investigó Lucas. Y que la arqueología ha confirmado nombres y lugares, como la casa de David, Poncio Pilato y el estanque de Siloé.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La resurrección de Jesús
    "n4-apologetica-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Pablo, ¿qué pasa si Cristo no resucitó?", reverso: "Vana es la predicación, y vana es también la fe.", apoyo: "si Cristo no resucitó, vana es nuestra fe" },
              { frente: "¿Qué transmite Pablo en 1 Corintios 15:3-8?", reverso: "Un resumen muy antiguo del evangelio.", apoyo: "Pablo transmite un resumen muy antiguo del evangelio" },
              { frente: "¿Qué añade Pablo sobre los testigos?", reverso: "Que muchos de ellos vivían todavía cuando él escribió.", apoyo: "Y añade que muchos de esos testigos vivían todavía cuando él escribió" },
              { frente: "¿Qué es la resurrección, además de un hecho que se defiende?", reverso: "Una persona viva a quien se conoce.", apoyo: "es una persona viva a quien se conoce" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué historiador no cristiano cuenta que Jesús murió crucificado?", reverso: "Tácito, además de los evangelios.", apoyo: "lo cuentan los evangelios y también historiadores no cristianos, como Tácito" },
              { frente: "¿Quiénes fueron las primeras testigos de la tumba vacía?", reverso: "Unas mujeres, algo que nadie habría inventado en esa cultura.", apoyo: "las primeras testigos fueron mujeres, algo que nadie habría inventado en esa cultura" },
              { frente: "¿Qué hacían los discípulos antes de anunciarlo con valor?", reverso: "Se escondían con miedo.", apoyo: "de esconderse con miedo pasaron a anunciarlo con valor" },
              { frente: "¿En qué descansa tu fe, según la lección?", reverso: "En una tumba vacía y en un Señor vivo.", apoyo: "Tu fe descansa en una tumba vacía y en un Señor vivo" },
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
            consigna: "Si Cristo no resucitó, ¿qué sería vano? Toca las dos palabras que lo dicen.",
            texto: "Y si Cristo no resucitó, vana es entonces nuestra [[predicación]], vana es también vuestra [[fe]]",
            apoyo: "La resurrección es el centro de la fe",
            ref: "1 Corintios 15:14",
            explica: "Si Cristo no resucitó, vana es la predicación y vana es la fe: por eso la resurrección es el centro de la fe cristiana.",
          },
          {
            consigna: "¿Qué palabra usa Pablo para decir cómo quedaría todo si Cristo no resucitó? Tócala cada vez que aparece.",
            texto: "Y si Cristo no resucitó, [[vana]] es entonces nuestra predicación, [[vana]] es también vuestra fe",
            apoyo: "si Cristo no resucitó, vana es nuestra fe",
            ref: "1 Corintios 15:14",
            explica: "Pablo lo dice dos veces: si Cristo no resucitó, vana es la predicación y vana es la fe. La resurrección es el centro de la fe cristiana.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada hecho que sostiene la resurrección con lo que lo muestra.",
            pares: [
              ["Jesús murió crucificado", "Lo cuentan los evangelios y también Tácito"],
              ["La tumba estaba vacía", "Las autoridades nunca mostraron el cuerpo"],
              ["Muchos lo vieron vivo", "En distintos lugares y momentos, solos y en grupo"],
              ["Los discípulos cambiaron", "Del miedo pasaron a anunciarlo con valor"],
              ["Enemigos y escépticos creyeron", "Pablo, que perseguía a la iglesia, y Jacobo"],
            ],
            apoyo: "La sostienen hechos: su muerte, la tumba vacía, las apariciones a muchos testigos y el cambio de los discípulos",
            explica: "Su muerte la cuentan los evangelios y Tácito; la tumba estaba vacía y nunca mostraron el cuerpo; muchos lo vieron vivo; los discípulos pasaron del miedo al valor; y creyeron Pablo y Jacobo.",
          },
          {
            consigna: "Une cada persona o grupo con lo que aporta a los hechos de la resurrección.",
            pares: [
              ["Tácito", "Un historiador no cristiano que cuenta su muerte"],
              ["Las mujeres", "Las primeras testigos de la tumba vacía"],
              ["Más de quinientos hermanos", "Lo vieron vivo a la vez"],
              ["Pablo", "Perseguía a la iglesia y llegó a creer"],
              ["Jacobo, el hermano de Jesús", "Antes no creía en él"],
            ],
            apoyo: "Enemigos y escépticos creyeron: Pablo, que perseguía a la iglesia, y Jacobo, el hermano de Jesús, que antes no creía en él",
            ref: "1 Corintios 15:3-8",
            explica: "Tácito cuenta su muerte; las primeras testigos de la tumba vacía fueron mujeres; más de quinientos hermanos lo vieron a la vez; y creyeron Pablo, que perseguía a la iglesia, y Jacobo, que antes no creía en él.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el resumen del evangelio que transmite Pablo en 1 Corintios 15:3-8, como él lo cuenta.",
            pasos: ["Cristo murió por nuestros pecados", "Fue sepultado", "Resucitó al tercer día", "Se apareció a Pedro y a los doce", "Se apareció a más de quinientos hermanos a la vez", "Se apareció a Jacobo y a todos los apóstoles"],
            apoyo: "que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día",
            ref: "1 Corintios 15:3-8",
            explica: "Pablo transmite que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día, y que se apareció a Pedro, a los doce, a más de quinientos hermanos a la vez, a Jacobo y a todos los apóstoles.",
          },
          {
            consigna: "Ordena a quiénes se apareció Cristo resucitado, como lo cuenta Pablo en 1 Corintios 15, del primero al último.",
            pasos: ["A Pedro", "A los doce", "A más de quinientos hermanos a la vez", "A Jacobo", "A todos los apóstoles"],
            apoyo: "se apareció a Pedro, a los doce, a más de quinientos hermanos a la vez, a Jacobo y a todos los apóstoles",
            ref: "1 Corintios 15:3-8",
            explica: "Pablo cuenta que Cristo se apareció a Pedro, a los doce, a más de quinientos hermanos a la vez, a Jacobo y a todos los apóstoles; y muchos de esos testigos vivían todavía cuando él escribió.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El robo, el desmayo y las alucinaciones no explican los hechos: Dios lo levantó",
            ref: "Hechos 2:24",
            titulo: "Las preguntas de la universidad",
            relato: [
              "Eres líder de jóvenes. Una joven de tu grupo estudia en la universidad, y sus compañeros le dieron tres explicaciones de por qué los discípulos creyeron que Jesús resucitó.",
              "Te las trae anotadas en su cuaderno: que robaron el cuerpo, que Jesús solo se desmayó y que todo fue una alucinación. Quiere saber qué responder.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Le dijeron que los discípulos robaron el cuerpo. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que nadie da la vida por lo que sabe que es mentira, y ellos la dieron.", bien: true, explica: "Los discípulos lo anunciaron con valor, aun a costa de su vida, y nadie da la vida por lo que sabe que es mentira." },
                  { texto: "Que es posible, pero que igual vale la pena creer aunque no haya pasado.", explica: "Si Cristo no resucitó, vana es nuestra fe: la fe se apoya en que Dios lo levantó." },
                  { texto: "Que las autoridades mostraron el cuerpo, y así se acabó la discusión.", explica: "Las autoridades nunca mostraron el cuerpo: la tumba estaba vacía." },
                ],
                apoyo: "nadie da la vida por lo que sabe que es mentira",
                explica: "Se ha dicho que los discípulos robaron el cuerpo, pero nadie da la vida por lo que sabe que es mentira.",
              },
              {
                tipo: "situacion",
                pregunta: "Le dijeron que Jesús solo se desmayó en la cruz. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que los soldados romanos sabían matar, y un hombre medio muerto no convence.", bien: true, explica: "Los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte." },
                  { texto: "Que es verdad, y que por eso los discípulos lo vieron después tan débil y herido.", explica: "Un hombre medio muerto no convence a nadie de que venció a la muerte: los discípulos anunciaron a un Señor vivo." },
                  { texto: "Que eso no importa, porque lo único que cuenta es lo que Jesús enseñó.", explica: "La resurrección es el centro de la fe: si Cristo no resucitó, vana es nuestra fe." },
                ],
                apoyo: "los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte",
                explica: "Se ha dicho que Jesús solo se desmayó, pero los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte.",
              },
              {
                tipo: "situacion",
                pregunta: "Le dijeron que los testigos tuvieron una alucinación. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que quinientas personas no tienen la misma alucinación a la vez.", bien: true, explica: "Quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba." },
                  { texto: "Que pudo ser, porque los que lo vieron estaban siempre solos y de noche.", explica: "Muchos lo vieron vivo, en distintos lugares y momentos, solos y en grupo." },
                  { texto: "Que da igual: la resurrección es solo un símbolo bonito de la esperanza.", explica: "La resurrección es un hecho de la historia y una persona viva a quien se conoce." },
                ],
                apoyo: "quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba",
                explica: "Se ha dicho que fueron alucinaciones, pero quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba.",
              },
              {
                tipo: "explica",
                apoyo: "La explicación que da cuenta de todos los hechos es la de los testigos",
                clave: {
                  id: "pr-n4-apologetica-4-a5-1",
                  tipo: "corta",
                  pregunta: "Al final, ¿qué le dirás a la joven sobre cuál es la explicación que da cuenta de todos los hechos, y por qué?",
                  ideas: [
                    { id: "testigos", peso: 50, texto: "La explicación que da cuenta de todos los hechos es la de los testigos: Dios levantó a Jesús de los muertos.", formas: ["(dios|padre) (lo|le) levant*", "dios levanto", "resucit*", "la de los testigos", "lo que dicen los testigos", "volvio a la vida", "esta vivo"] },
                    { id: "hechos", peso: 50, negativa: true, texto: "Las otras explicaciones no dan cuenta de la tumba vacía, de las apariciones a muchos ni del cambio de los discípulos.", formas: ["tumba vacia", "apariciones", "aparecio", "lo vieron", "cambio de los discipulos", "discipulos cambiaron", "dieron (la|su) vida", "quinientas personas", "quinientos"] },
                  ],
                  errores: [
                    { id: "mintieron", texto: "Nadie da la vida por lo que sabe que es mentira: la explicación que da cuenta de todos los hechos es la de los testigos.", formas: ["(testigos|discipulos) mintieron", "fue un robo"], anula: "testigos" },
                    { id: "mintieron-2", texto: "El robo, el desmayo y las alucinaciones no explican los hechos.", formas: ["(testigos|discipulos) mintieron", "fue un robo"], anula: "hechos" },
                  ],
                  modelo: "Le diré que la explicación que da cuenta de todos los hechos es la de los testigos: Dios levantó a Jesús de los muertos. El robo, el desmayo y la alucinación no explican la tumba vacía, las apariciones a muchos ni el cambio de los discípulos.",
                },
              },
            ],
          },
          {
            apoyo: "La explicación que da cuenta de todos los hechos es la de los testigos",
            ref: "Hechos 2:24",
            titulo: "Un documental que sembró dudas",
            relato: [
              "Eres pastor asistente. Un hermano de la iglesia vio un documental que decía que la resurrección se puede explicar de otras maneras, y ahora tiene dudas.",
              "Después del culto se queda a conversar contigo y te cuenta, una por una, las explicaciones que escuchó.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "El documental decía que los testigos tuvieron alucinaciones. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que quinientas personas no tienen la misma alucinación a la vez.", bien: true, explica: "Muchos lo vieron vivo, en distintos lugares y momentos, solos y en grupo: quinientas personas no tienen la misma alucinación a la vez." },
                  { texto: "Que es posible, porque siempre lo vio una sola persona, y nunca un grupo.", explica: "Muchos lo vieron vivo, solos y en grupo: más de quinientos hermanos lo vieron a la vez." },
                  { texto: "Que no importa si fue real, mientras a él le haga bien creerlo.", explica: "Si Cristo no resucitó, vana es nuestra fe: la resurrección es el centro de la fe." },
                ],
                apoyo: "quinientas personas no tienen la misma alucinación a la vez",
                explica: "Quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba.",
              },
              {
                tipo: "situacion",
                pregunta: "También decía que los discípulos inventaron todo. ¿Qué hecho le recuerdas?",
                opciones: [
                  { texto: "Que dieron la vida por anunciarlo, y nadie da la vida por lo que sabe que es mentira.", bien: true, explica: "Los discípulos cambiaron: de esconderse con miedo pasaron a anunciarlo con valor, aun a costa de su vida." },
                  { texto: "Que los discípulos nunca hablaron en público de la resurrección, por miedo a las autoridades.", explica: "De esconderse con miedo pasaron a anunciarlo con valor, aun a costa de su vida." },
                  { texto: "Que los discípulos eran valientes desde antes de la cruz, y no tuvieron que cambiar nada.", explica: "Los discípulos cambiaron: antes se escondían con miedo." },
                ],
                apoyo: "de esconderse con miedo pasaron a anunciarlo con valor, aun a costa de su vida",
                explica: "Los discípulos cambiaron: de esconderse con miedo pasaron a anunciarlo con valor, aun a costa de su vida, y nadie da la vida por lo que sabe que es mentira.",
              },
              {
                tipo: "situacion",
                pregunta: "Y decía que nadie sabe dónde quedó el cuerpo. ¿Qué hecho de la lección le muestras?",
                opciones: [
                  { texto: "Que la tumba estaba vacía y las autoridades nunca mostraron el cuerpo.", bien: true, explica: "La tumba estaba vacía, y las autoridades nunca mostraron el cuerpo." },
                  { texto: "Que las autoridades mostraron el cuerpo, pero los discípulos no les creyeron.", explica: "Las autoridades nunca mostraron el cuerpo." },
                  { texto: "Que los discípulos sabían dónde estaba el cuerpo y prefirieron callar.", explica: "Los discípulos no callaron: lo anunciaron con valor, aun a costa de su vida." },
                ],
                apoyo: "La tumba estaba vacía: las primeras testigos fueron mujeres, algo que nadie habría inventado en esa cultura, y las autoridades nunca mostraron el cuerpo",
                explica: "La tumba estaba vacía: las primeras testigos fueron mujeres, algo que nadie habría inventado en esa cultura, y las autoridades nunca mostraron el cuerpo.",
              },
              {
                tipo: "explica",
                apoyo: "Se ha dicho que Jesús solo se desmayó, pero los soldados romanos sabían matar",
                clave: {
                  id: "pr-n4-apologetica-4-a5-2",
                  tipo: "corta",
                  pregunta: "Al final te pregunta: ¿Y si Jesús solo se desmayó en la cruz? ¿Por qué esa explicación no da cuenta de los hechos?",
                  ideas: [
                    { id: "soldados", peso: 50, texto: "Los soldados romanos sabían matar: Jesús murió crucificado.", formas: ["sabian matar", "sabian (como|lo) matar", "sabian lo que hacian", "expertos en matar", "(soldados|romanos) se aseguraron", "(soldados|romanos) lo mataron", "lo mataron", "murio crucificado", "murio realmente", "murio de verdad", "realmente murio"] },
                    { id: "medio-muerto", peso: 50, negativa: true, texto: "Y un hombre medio muerto no convence a nadie de que venció a la muerte.", formas: ["medio muerto", "casi muerto", "herido", "debil", "no convence*", "vencio a la muerte", "venci* la muerte"] },
                  ],
                  errores: [
                    { id: "sobrevivio", texto: "Los soldados romanos sabían matar: Jesús murió crucificado.", formas: ["no sabian (matar|bien)", "sobrevivio", "se recupero", "no estaba muerto", "seguia vivo"], anula: "soldados" },
                    { id: "sobrevivio-2", texto: "Un hombre medio muerto no convence a nadie de que venció a la muerte.", formas: ["no sabian (matar|bien)", "sobrevivio", "se recupero", "no estaba muerto", "seguia vivo"], anula: "medio-muerto" },
                  ],
                  modelo: "Porque los soldados romanos sabían matar, y Jesús murió crucificado. Además, un hombre medio muerto no convence a nadie de que venció a la muerte: la explicación que da cuenta de todo es la de los testigos.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué no se sostiene la idea del desmayo.",
            texto: "Se ha dicho que Jesús solo se [[desmayó]], pero los soldados [[romanos]] sabían [[matar]].",
            distractores: ["escondió", "griegos", "curar"],
            errores: {
              "escondió": "Lo que se ha dicho es que Jesús solo se desmayó.",
              griegos: "La lección habla de los soldados romanos, que sabían matar.",
              curar: "Los soldados romanos sabían matar: un hombre medio muerto no convence a nadie de que venció a la muerte.",
            },
            apoyo: "Se ha dicho que Jesús solo se desmayó, pero los soldados romanos sabían matar",
            explica: "Se ha dicho que Jesús solo se desmayó, pero los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte.",
          },
          {
            consigna: "Completa cuál es la explicación que da cuenta de todos los hechos.",
            texto: "La explicación que da cuenta de todos los [[hechos]] es la de los [[testigos]]: Dios [[levantó]] a Jesús de los muertos.",
            distractores: ["mitos", "soldados", "olvidó"],
            errores: {
              mitos: "La explicación da cuenta de todos los hechos: la muerte, la tumba vacía, las apariciones y el cambio de los discípulos.",
              soldados: "La explicación que da cuenta de todos los hechos es la de los testigos.",
              "olvidó": "Jesús es aquel «al cual Dios levantó, sueltos los dolores de la muerte».",
            },
            apoyo: "La explicación que da cuenta de todos los hechos es la de los testigos",
            ref: "Hechos 2:24",
            explica: "El robo, el desmayo y las alucinaciones no explican los hechos. La explicación que da cuenta de todos es la de los testigos: Jesús, «al cual Dios levantó, sueltos los dolores de la muerte».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La resurrección es el centro de la fe: si Cristo no resucitó, vana es nuestra fe",
            ref: "1 Corintios 15:14",
            clave: {
              id: "pr-n4-apologetica-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la resurrección es el centro de la fe cristiana?",
              ideas: [
                { id: "vana", peso: 60, negativa: true, texto: "Porque si Cristo no resucitó, vana es nuestra predicación y vana es también nuestra fe.", formas: ["vana", "vano", "en vano", "sin sentido", "no (tendria|tiene) sentido", "no (sirve|serviria|valdria|vale)", "inutil"] },
                { id: "vivo", peso: 40, texto: "La fe descansa en un Señor vivo: la resurrección es una persona viva a quien se conoce.", formas: ["persona viva", "senor vivo", "esta vivo", "sigue vivo", "vive hoy", "(jesus|cristo|senor) (vive|vivo)", "venci* la muerte", "transform*", "tumba vacia", "dios lo levanto", "hecho de la historia", "hecho real"] },
              ],
              modelo: "Porque si Cristo no resucitó, vana es nuestra predicación y vana es también nuestra fe. Nuestra fe descansa en una tumba vacía y en un Señor vivo, una persona a quien se conoce.",
            },
          },
          {
            apoyo: "Tu fe descansa en una tumba vacía y en un Señor vivo",
            ref: "1 Corintios 15:14",
            clave: {
              id: "pr-n4-apologetica-4-a7-2",
              tipo: "corta",
              pregunta: "Un amigo te dice: Lo importante de Jesús son sus enseñanzas, no que haya resucitado. ¿Qué le respondes?",
              ideas: [
                { id: "vana", peso: 50, negativa: true, texto: "Que si Cristo no resucitó, vana es nuestra predicación y vana es también nuestra fe.", formas: ["vana", "vano", "en vano", "sin sentido", "no (tendria|tiene) sentido", "no (sirve|serviria|valdria|vale)", "inutil"] },
                { id: "centro", peso: 50, texto: "Que la resurrección es el centro de la fe: la fe descansa en un Señor vivo, porque Dios lo levantó.", formas: ["centro", "central", "lo mas importante", "fundamento", "se apoya", "descansa", "base de (la|nuestra)", "dios lo levanto", "esta vivo", "senor vivo"] },
              ],
              modelo: "Le diría que la resurrección es el centro de la fe, porque si Cristo no resucitó, vana es nuestra predicación y vana es también nuestra fe. Sus enseñanzas importan, pero la fe descansa en un Señor vivo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El problema del mal
    "n4-apologetica-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo era el mundo que Dios creó?", reverso: "Bueno en gran manera.", apoyo: "Dios creó un mundo «bueno en gran manera»" },
              { frente: "¿Por dónde entró el mal en el mundo?", reverso: "Por la desobediencia humana.", apoyo: "entró en el mundo por la desobediencia humana" },
              { frente: "¿Qué necesita el amor verdadero?", reverso: "Libertad, que incluía la posibilidad de rechazar a Dios.", apoyo: "el amor verdadero necesita libertad" },
              { frente: "¿Cuál es la respuesta más profunda de Dios al mal?", reverso: "La cruz, y no una teoría.", apoyo: "La respuesta más profunda de Dios al mal no es una teoría, sino la cruz" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Explica Dios siempre cada sufrimiento?", reverso: "No siempre, como vimos con Job, pero promete obrar aun en el dolor.", apoyo: "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor" },
              { frente: "¿Qué promete Dios para el final de la historia?", reverso: "Un mundo nuevo, sin muerte, ni llanto, ni dolor.", apoyo: "Dios promete un mundo nuevo" },
              { frente: "¿Qué hizo Jesús ante la tumba de Lázaro, antes de resucitarlo?", reverso: "Lloró.", apoyo: "Jesús lloró ante la tumba de Lázaro antes de resucitarlo" },
              { frente: "Con quien sufre, ¿cuándo vienen los argumentos?", reverso: "Después, si los pide: primero se acompaña y se llora.", apoyo: "los argumentos vienen después, si los pide" },
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
            consigna: "Sobre de dónde viene el mal: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios creó un mundo malo, y por eso hay sufrimiento.", verdad: false, explica: "Dios creó un mundo bueno en gran manera; el mal entró después, por la desobediencia humana.", apoyo: "Dios creó un mundo «bueno en gran manera»", ref: "Génesis 1:31" },
              { texto: "El mal entró en el mundo por la desobediencia humana.", verdad: true, explica: "«el pecado entró en el mundo por un hombre, y por el pecado la muerte».", apoyo: "entró en el mundo por la desobediencia humana", ref: "Romanos 5:12" },
              { texto: "El mal es obra de Dios.", verdad: false, explica: "El mal no viene de Dios: entró en el mundo por la desobediencia humana.", apoyo: "El mal no viene de Dios" },
            ],
          },
          {
            consigna: "Sobre por qué un Dios bueno permite el mal: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La libertad que Dios dio incluía la posibilidad de rechazarlo.", verdad: true, explica: "El amor verdadero necesita libertad, y esa libertad incluía la posibilidad de rechazarlo.", apoyo: "esa libertad incluía la posibilidad de rechazarlo" },
              { texto: "Dios siempre explica el porqué de cada sufrimiento.", verdad: false, explica: "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor.", apoyo: "Dios no siempre explica cada sufrimiento, como vimos con Job" },
              { texto: "Dios creó personas capaces de amar.", verdad: true, explica: "Dios creó personas capaces de amar, y el amor verdadero necesita libertad.", apoyo: "Dios creó personas capaces de amar" },
              { texto: "Un Dios que sufrió por nosotros es indiferente al dolor.", verdad: false, explica: "Un Dios que sufrió por nosotros no es indiferente al dolor.", apoyo: "Un Dios que sufrió por nosotros no es indiferente al dolor" },
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
            consigna: "Une cada respuesta bíblica al mal con lo que enseña la lección.",
            pares: [
              ["La libertad humana", "El amor verdadero necesita libertad"],
              ["La caída", "El pecado entró en el mundo por un hombre"],
              ["La cruz", "El Hijo de Dios cargó el mal sobre sí"],
              ["La esperanza final", "Un mundo nuevo, sin muerte ni llanto"],
            ],
            apoyo: "Describir las respuestas bíblicas: la libertad humana, la caída, la cruz y la esperanza final",
            explica: "El amor verdadero necesita libertad; el mal entró por la desobediencia humana; en la cruz, el Hijo de Dios cargó el mal sobre sí y lo venció; y Dios promete un mundo nuevo, sin muerte ni llanto.",
          },
          {
            consigna: "Une cada pasaje con lo que enseña sobre el mal y el dolor.",
            pares: [
              ["Génesis 1:31", "Dios creó un mundo «bueno en gran manera»"],
              ["Romanos 5:12", "«el pecado entró en el mundo por un hombre»"],
              ["Romanos 8:28", "«a los que aman a Dios, todas las cosas les ayudan a bien»"],
              ["Romanos 8:18", "«las aflicciones del tiempo presente no son comparables con la gloria venidera»"],
              ["Apocalipsis 21:4", "«Enjugará Dios toda lágrima de los ojos de ellos»"],
            ],
            apoyo: "promete obrar aun en el dolor",
            explica: "Dios creó un mundo bueno; el pecado entró por un hombre; Dios obra aun en el dolor; las aflicciones no se comparan con la gloria venidera; y Dios promete enjugar toda lágrima.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la respuesta de la cruz al mal.",
            texto: "En la [[cruz]], el Hijo de Dios [[cargó]] el mal sobre sí y lo [[venció]] con su resurrección.",
            distractores: ["teoría", "olvidó", "ocultó"],
            errores: {
              "teoría": "La respuesta más profunda de Dios al mal no es una teoría, sino la cruz.",
              "olvidó": "El Hijo de Dios entró en nuestro sufrimiento y cargó el mal sobre sí.",
              "ocultó": "Cargó el mal sobre sí y lo venció con su resurrección.",
            },
            apoyo: "el Hijo de Dios entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección",
            explica: "La respuesta más profunda de Dios al mal es la cruz: el Hijo de Dios entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección.",
          },
          {
            consigna: "Completa lo que Dios promete en medio del dolor.",
            texto: "Dios promete [[obrar]] aun en el dolor, y al final promete un mundo [[nuevo]] donde él enjugará toda [[lágrima]].",
            distractores: ["huir", "igual", "alegría"],
            errores: {
              huir: "Dios no está lejos del dolor: promete obrar aun en el dolor.",
              igual: "Dios promete un mundo nuevo.",
              "alegría": "En el mundo nuevo, Dios enjugará toda lágrima y ya no habrá llanto.",
            },
            apoyo: "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor",
            ref: "Apocalipsis 21:4",
            explica: "Dios promete obrar aun en el dolor, y la historia no termina en el mal: promete un mundo nuevo, donde «Enjugará Dios toda lágrima de los ojos de ellos».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide",
            ref: "Juan 11:35",
            titulo: "Una visita en el hospital",
            relato: [
              "Eres pastor asistente. Un hermano de la iglesia tuvo un accidente en su trabajo y lleva varias semanas en el hospital.",
              "Cuando llegas a visitarlo, su esposa te recibe llorando y te pregunta: ¿Por qué Dios permitió esto, si siempre le hemos servido?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La acompañas y lloras con ella; las explicaciones pueden esperar.", bien: true, explica: "Con quien sufre, primero acompaña y llora: así lo hizo Jesús ante la tumba de Lázaro." },
                  { texto: "Le explicas enseguida que el mal entró por la desobediencia humana.", explica: "Es verdad, pero no es el momento: con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide." },
                  { texto: "Le pides que no llore, porque llorar sería una falta de fe.", explica: "Jesús lloró ante la tumba de Lázaro antes de resucitarlo: llorar con quien sufre no es falta de fe." },
                ],
                apoyo: "Con quien sufre, primero acompaña y llora",
                explica: "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide. Jesús lloró ante la tumba de Lázaro antes de resucitarlo.",
              },
              {
                tipo: "situacion",
                pregunta: "Días después, ella te pide: Ahora sí, explícame por qué pasó. ¿Qué le dices?",
                opciones: [
                  { texto: "Que Dios no siempre explica cada sufrimiento, pero promete obrar aun en el dolor.", bien: true, explica: "Como vimos con Job, Dios no siempre explica cada sufrimiento, pero promete obrar aun en el dolor." },
                  { texto: "Que Dios te va a revelar hoy mismo el porqué exacto de todo lo que les pasó a ustedes.", explica: "Dios no siempre explica cada sufrimiento, como vimos con Job." },
                  { texto: "Que Dios no tiene nada que ver con su dolor, y que los dejó completamente solos en esto.", explica: "Dios no está lejos del dolor: promete obrar aun en él." },
                ],
                apoyo: "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor",
                explica: "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor: «a los que aman a Dios, todas las cosas les ayudan a bien».",
              },
              {
                tipo: "situacion",
                pregunta: "Ella te confiesa: Siento que a Dios no le importa lo que sufrimos. ¿Qué verdad le recuerdas?",
                opciones: [
                  { texto: "Que en la cruz el Hijo de Dios entró en nuestro sufrimiento: no es indiferente.", bien: true, explica: "Un Dios que sufrió por nosotros no es indiferente al dolor." },
                  { texto: "Que Dios está tan lejos en el cielo que no alcanza a ver lo que les pasa en el hospital.", explica: "Dios no está lejos del dolor: el Hijo de Dios entró en nuestro sufrimiento." },
                  { texto: "Que el sufrimiento de Jesús en la cruz no tiene nada que ver con el de ellos.", explica: "En la cruz, el Hijo de Dios entró en nuestro sufrimiento y cargó el mal sobre sí." },
                ],
                apoyo: "Un Dios que sufrió por nosotros no es indiferente al dolor",
                explica: "La respuesta más profunda de Dios al mal no es una teoría, sino la cruz: un Dios que sufrió por nosotros no es indiferente al dolor.",
              },
              {
                tipo: "explica",
                apoyo: "Dios promete un mundo nuevo",
                clave: {
                  id: "pr-n4-apologetica-5-a5-1",
                  tipo: "corta",
                  pregunta: "Antes de irte, ella te pregunta si esto va a terminar algún día. ¿Qué esperanza le compartes, y cómo se la dices?",
                  ideas: [
                    { id: "esperanza", peso: 50, texto: "Que la historia no termina en el mal: Dios promete un mundo nuevo, donde enjugará toda lágrima y no habrá más dolor.", formas: ["mundo nuevo", "nuevo mundo", "lagrima*", "llanto", "no habra (mas|muerte|dolor|llanto)", "no termina en el mal", "gloria venidera"] },
                    { id: "compasion", peso: 50, texto: "Se la dice con compasión: acompañándola y llorando con ella, sin prisa por los argumentos.", formas: ["compasion", "acompa*", "llor* con ella", "con (amor|carino|ternura)", "abraz*", "escuch*", "a su lado"] },
                  ],
                  modelo: "Le comparto, acompañándola con compasión, que la historia no termina en el mal: Dios promete un mundo nuevo, donde enjugará toda lágrima y ya no habrá muerte, ni llanto, ni dolor.",
                },
              },
            ],
          },
          {
            apoyo: "Cuando el dolor no tiene explicación, la cruz te recuerda que Dios no es indiferente",
            ref: "Romanos 8:18",
            titulo: "La pregunta en la célula",
            relato: [
              "Eres líder de una célula de jóvenes. Hace dos semanas, un muchacho del grupo perdió a su mejor amigo en un accidente.",
              "Hoy, en la reunión, pregunta con lágrimas: Si Dios es bueno y todopoderoso, ¿por qué no lo impidió?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces en ese momento?",
                opciones: [
                  { texto: "Te acercas a él, lo acompañas y lloras con él antes de responder.", bien: true, explica: "Con quien sufre, primero la compasión: primero acompaña y llora." },
                  { texto: "Sigues con el estudio que preparaste, para no salirte del tema de hoy.", explica: "Con quien sufre, primero acompaña y llora: el estudio puede esperar." },
                  { texto: "Le das enseguida una larga explicación sobre de dónde viene el mal.", explica: "Los argumentos vienen después, si los pide: primero se acompaña y se llora." },
                ],
                apoyo: "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide",
                explica: "Con quien sufre, primero la compasión: Jesús lloró ante la tumba de Lázaro antes de resucitarlo.",
              },
              {
                tipo: "situacion",
                pregunta: "Semanas después, él quiere hablar de su pregunta. ¿Qué le explicas sobre el origen del mal?",
                opciones: [
                  { texto: "Que el mal no viene de Dios: entró por la desobediencia humana.", bien: true, explica: "Dios creó un mundo bueno en gran manera, y el mal entró por la desobediencia humana." },
                  { texto: "Que Dios creó el mal junto con el mundo, para probarnos a todos.", explica: "El mal no viene de Dios: Dios creó un mundo bueno en gran manera." },
                  { texto: "Que el mal no existe, y que su dolor es solo una idea de su cabeza.", explica: "El mal sí entró en el mundo, por la desobediencia humana: la Biblia no esquiva la pregunta del sufrimiento." },
                ],
                apoyo: "El mal no viene de Dios: entró en el mundo por la desobediencia humana",
                explica: "Dios creó un mundo «bueno en gran manera». El mal no viene de Dios: entró en el mundo por la desobediencia humana.",
              },
              {
                tipo: "situacion",
                pregunta: "Él te pregunta: ¿Este dolor va a durar para siempre? ¿Qué esperanza le das?",
                opciones: [
                  { texto: "Que Dios promete un mundo nuevo, donde enjugará toda lágrima.", bien: true, explica: "La historia no termina en el mal: Dios promete un mundo nuevo, sin muerte, ni llanto, ni dolor." },
                  { texto: "Que el dolor es lo último que hay, y la historia termina en el mal.", explica: "La historia no termina en el mal: Dios promete un mundo nuevo." },
                  { texto: "Que no piense en eso, porque la Biblia no dice nada del futuro.", explica: "Dios promete un mundo nuevo: «Enjugará Dios toda lágrima de los ojos de ellos»." },
                ],
                apoyo: "Y la historia no termina en el mal",
                explica: "La historia no termina en el mal: Dios promete un mundo nuevo, donde «Enjugará Dios toda lágrima de los ojos de ellos».",
              },
              {
                tipo: "explica",
                apoyo: "La respuesta más profunda de Dios al mal no es una teoría, sino la cruz",
                clave: {
                  id: "pr-n4-apologetica-5-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías de la cruz, para que sepa que Dios no es indiferente a su dolor?",
                  ideas: [
                    { id: "entro", peso: 50, texto: "En la cruz, el Hijo de Dios entró en nuestro sufrimiento y cargó el mal sobre sí.", formas: ["entro en nuestro (sufrimiento|dolor)", "cargo el mal", "cargo pecado*", "cargo (dolor|sufrimiento)", "sufrio (por|con) (nosotros|ellos|todos|ti)", "padecio"] },
                    { id: "vencio", peso: 50, texto: "Y lo venció con su resurrección: un Dios que sufrió por nosotros no es indiferente al dolor.", formas: ["venci*", "resurrec*", "resucit*", "no es indiferente", "(le|nos|te) importa"] },
                  ],
                  errores: [
                    { id: "cuento", texto: "El Hijo de Dios cargó el mal sobre sí y lo venció con su resurrección.", formas: ["(es|fue) un (cuento|mito)", "solo un (cuento|mito)", "no resucito"], anula: "vencio" },
                  ],
                  modelo: "Le diría que en la cruz el Hijo de Dios entró en nuestro sufrimiento y cargó el mal sobre sí, y que lo venció con su resurrección. Un Dios que sufrió por nosotros no es indiferente a su dolor.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se acompaña a quien sufre, o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se acompaña a quien sufre", "Así no se acompaña a quien sufre"],
            frases: [
              { texto: "Llorar con quien sufre", grupo: 0 },
              { texto: "Acompañar antes de dar argumentos", grupo: 0 },
              { texto: "Dar argumentos después, si los pide", grupo: 0 },
              { texto: "Darle enseguida una explicación de su dolor", grupo: 1 },
              { texto: "Decirle que llorar es falta de fe", grupo: 1, explica: "Jesús lloró ante la tumba de Lázaro antes de resucitarlo." },
              { texto: "Decirle que a Dios no le importa su dolor", grupo: 1, explica: "Un Dios que sufrió por nosotros no es indiferente al dolor." },
            ],
            apoyo: "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide",
            ref: "Juan 11:35",
            explica: "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide. Así lo hizo Jesús, que lloró ante la tumba de Lázaro.",
          },
          {
            consigna: "¿Qué va primero con quien sufre: la compasión o los argumentos? Lleva cada frase a su grupo.",
            grupos: ["Primero, la compasión", "Primero, los argumentos"],
            frases: [
              { texto: "Acompañarlo en su dolor", grupo: 0 },
              { texto: "Llorar con él, como Jesús ante Lázaro", grupo: 0 },
              { texto: "Esperar a que él pida los argumentos", grupo: 0 },
              { texto: "Explicarle de entrada por qué existe el mal", grupo: 1 },
              { texto: "Responderle con un estudio antes de acompañarlo", grupo: 1 },
              { texto: "Corregir enseguida lo que dice en su dolor", grupo: 1 },
            ],
            apoyo: "Con quien sufre, primero la compasión",
            ref: "Juan 11:35",
            explica: "Con quien sufre, primero la compasión: se acompaña y se llora, y los argumentos vienen después, si los pide.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El mal no viene de Dios: entró por la desobediencia humana en un mundo creado bueno y con libertad para amar",
            ref: "Romanos 5:12",
            clave: {
              id: "pr-n4-apologetica-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué hay mal en un mundo que Dios creó bueno? Explica la libertad humana y la caída.",
              ideas: [
                { id: "libertad", peso: 50, texto: "Dios creó personas capaces de amar, y el amor verdadero necesita libertad, que incluía la posibilidad de rechazarlo.", formas: ["necesita libertad", "amor (verdadero|real) necesita", "capaces de amar", "posibilidad de rechazar*", "rechazar*", "libertad (para|de) (amar|elegir|escoger|decidir|rechazar*)", "libres (para|de)", "elegi*", "escog*"] },
                { id: "caida", peso: 50, texto: "El mal no viene de Dios: entró en el mundo por la desobediencia humana, por el pecado de un hombre.", formas: ["desobedien*", "desobedec*", "desobedeci*", "pecado entro", "entro (el|en|al) (pecado|mal|mundo)", "por un hombre", "la caida", "adan", "pecaron", "por el pecado", "el pecado"] },
              ],
              errores: [
                { id: "mal-de-dios", texto: "El mal no viene de Dios: entró en el mundo por la desobediencia humana.", formas: ["dios (creo|hizo|causo|trajo|envio|mando) el mal", "el mal viene de dios", "dios es (el|la) (autor|causa|culpable|origen) del mal"], anula: "caida" },
              ],
              modelo: "Porque Dios creó personas capaces de amar, y el amor verdadero necesita libertad, que incluía la posibilidad de rechazarlo. El mal no viene de Dios: entró en el mundo por la desobediencia humana.",
            },
          },
          {
            apoyo: "Dios no siempre explica cada dolor, pero obra en él para bien, sufrió con nosotros en la cruz, venció el mal con la resurrección y promete un mundo sin lágrimas",
            ref: "Apocalipsis 21:4",
            clave: {
              id: "pr-n4-apologetica-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué responde la Biblia al mal con la cruz y con la esperanza final?",
              ideas: [
                { id: "cruz", peso: 50, texto: "En la cruz, el Hijo de Dios entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección.", formas: ["cargo el mal", "cargo pecado*", "cargo (dolor|sufrimiento)", "entro en nuestro (sufrimiento|dolor)", "sufrio (por|con) (nosotros|todos)", "venci*", "resurrec*", "resucit*", "no es indiferente"] },
                { id: "final", peso: 50, texto: "Dios promete un mundo nuevo, donde enjugará toda lágrima y ya no habrá muerte, ni llanto, ni dolor.", formas: ["mundo nuevo", "nuevo mundo", "lagrima*", "llanto", "no habra (mas|muerte|dolor|llanto)", "no termina en el mal", "gloria venidera"] },
              ],
              modelo: "Con la cruz: el Hijo de Dios entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección. Y con la esperanza final: Dios promete un mundo nuevo, donde enjugará toda lágrima y no habrá más dolor.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Las sectas y las falsas doctrinas
    "n4-apologetica-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es una secta, según la lección?", reverso: "Un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe.", apoyo: "Una secta es un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe" },
              { frente: "Según Juan, ¿por qué hay que probar los espíritus?", reverso: "Porque muchos falsos profetas han salido por el mundo.", apoyo: "«no creáis a todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas han salido por el mundo»" },
              { frente: "¿Qué dice Pablo de quien anuncia otro evangelio?", reverso: "Que sea anatema, por amable que parezca el mensajero.", apoyo: "si alguno anuncia «otro evangelio diferente del que os hemos anunciado, sea anatema»" },
              { frente: "¿Cuál es la mejor defensa contra el error?", reverso: "Conocer bien la verdad.", apoyo: "La mejor defensa contra el error es conocer bien la verdad" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué tres preguntas descubren una secta?", reverso: "Quién es Jesús, cuál es el evangelio y cuál es la autoridad.", apoyo: "Tres preguntas la descubren: quién es Jesús, cuál es el evangelio y cuál es la autoridad" },
              { frente: "¿Cómo aprenden los cajeros a reconocer los billetes falsos?", reverso: "Estudiando bien los verdaderos.", apoyo: "Los cajeros aprenden a reconocer los billetes falsos estudiando bien los verdaderos" },
              { frente: "¿Qué son las personas que siguen estos grupos?", reverso: "No son enemigos, sino gente que Dios ama.", apoyo: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama" },
              { frente: "¿Con qué se les responde a quienes siguen estos grupos?", reverso: "Con la Biblia, con paciencia y con amabilidad.", apoyo: "Se les responde con la Biblia, con paciencia y con amabilidad" },
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
            consigna: "¿Qué pregunta examina cada punto: quién es Jesús, cuál es el evangelio o cuál es la autoridad? Lleva cada frase a su grupo.",
            grupos: ["¿Quién es Jesús?", "¿Cuál es el evangelio?", "¿Cuál es la autoridad?"],
            frases: [
              { texto: "Si lo confiesan como el Hijo eterno, Dios hecho hombre", grupo: 0 },
              { texto: "Si lo hacen un ángel o una criatura", grupo: 0 },
              { texto: "Si lo ven solo como un maestro más", grupo: 0 },
              { texto: "Si la salvación es por gracia por medio de la fe", grupo: 1 },
              { texto: "Si hay que cumplir las reglas del grupo para salvarse", grupo: 1 },
              { texto: "Si añaden otro libro a la Biblia", grupo: 2 },
              { texto: "Si siguen a un profeta que no se puede cuestionar", grupo: 2 },
              { texto: "Si tienen un líder que nadie puede cuestionar", grupo: 2 },
            ],
            apoyo: "Tres preguntas la descubren: quién es Jesús, cuál es el evangelio y cuál es la autoridad",
            explica: "Quién es Jesús: el Hijo eterno, Dios hecho hombre, o un ángel, una criatura o un maestro más. Cuál es el evangelio: por gracia por medio de la fe, o por cumplir reglas. Cuál es la autoridad: la Biblia, o la Biblia más otro libro, un profeta o un líder.",
          },
          {
            consigna: "¿Es una señal de la fe bíblica o una señal de falsa doctrina? Lleva cada frase a su grupo.",
            grupos: ["Señal de la fe bíblica", "Señal de falsa doctrina"],
            frases: [
              { texto: "Confiesan a Jesús como Dios hecho hombre", grupo: 0 },
              { texto: "Enseñan la salvación por gracia por medio de la fe", grupo: 0 },
              { texto: "Su autoridad es la Biblia, sin añadirle otro libro", grupo: 0 },
              { texto: "Hacen de Jesús un ángel o una criatura", grupo: 1 },
              { texto: "Enseñan que uno se salva por cumplir las reglas del grupo", grupo: 1 },
              { texto: "Ponen a un líder que no se puede cuestionar", grupo: 1 },
              { texto: "Anuncian otro evangelio diferente", grupo: 1, explica: "Pablo fue tajante: si alguno anuncia otro evangelio diferente, sea anatema." },
            ],
            apoyo: "Una secta es un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe",
            explica: "La fe bíblica confiesa a Jesús como el Hijo eterno, Dios hecho hombre, enseña la salvación por gracia por medio de la fe y tiene a la Biblia como autoridad. Una secta dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es una secta.",
            texto: "Una secta es un grupo que dice seguir a [[Cristo]] o la Biblia, pero niega verdades [[centrales]] de la fe.",
            distractores: ["Moisés", "menores"],
            errores: {
              "Moisés": "Una secta dice seguir a Cristo o la Biblia.",
              menores: "Una secta niega verdades centrales de la fe.",
            },
            apoyo: "Una secta es un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe",
            ref: "1 Juan 4:1-3",
            explica: "Una secta es un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe: por eso hay que probar los espíritus.",
          },
          {
            consigna: "Completa cuál es la mejor defensa contra el error.",
            texto: "La mejor defensa contra el error es conocer bien la [[verdad]]: leer la [[Biblia]], aprender las doctrinas [[básicas]] y estar unido a una iglesia [[sana]].",
            distractores: ["mentira", "prensa", "secretas", "famosa"],
            errores: {
              mentira: "La mejor defensa contra el error es conocer bien la verdad, como los cajeros estudian bien los billetes verdaderos.",
              prensa: "Conocer bien la verdad es leer la Biblia.",
              secretas: "Se aprenden las doctrinas básicas.",
              famosa: "Se está unido a una iglesia sana.",
            },
            apoyo: "La mejor defensa contra el error es conocer bien la verdad",
            explica: "La mejor defensa contra el error es conocer bien la verdad: leer la Biblia, aprender las doctrinas básicas y estar unido a una iglesia sana. Los cajeros reconocen los billetes falsos estudiando bien los verdaderos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada grupo con lo que enseña, según la lección.",
            pares: [
              ["Los Testigos de Jehová", "Niegan la deidad de Cristo y usan una traducción propia de la Biblia"],
              ["Los mormones", "Añaden a la Biblia el Libro de Mormón y otros escritos"],
              ["El evangelio de la prosperidad", "Promete riqueza y salud a cambio de fe o de ofrendas"],
            ],
            apoyo: "Los Testigos de Jehová niegan la Trinidad y la deidad de Cristo, y usan una traducción propia de la Biblia",
            explica: "Los Testigos de Jehová niegan la Trinidad y la deidad de Cristo y usan una traducción propia; los mormones añaden el Libro de Mormón y otros escritos; y el evangelio de la prosperidad promete riqueza y salud a cambio de fe o de ofrendas.",
          },
          {
            consigna: "Une cada grupo con otra de sus enseñanzas, según la lección.",
            pares: [
              ["Los grupos unicitarios", "Niegan que Dios exista en tres personas"],
              ["Los mormones", "Enseñan que Dios fue antes un hombre"],
              ["El evangelio de la prosperidad", "Convierte a Dios en un medio para obtener cosas"],
            ],
            apoyo: "Los grupos unicitarios niegan que Dios exista en tres personas",
            explica: "Los grupos unicitarios niegan que Dios exista en tres personas; los mormones enseñan que Dios fue antes un hombre; y el evangelio de la prosperidad convierte a Dios en un medio para obtener cosas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Se les responde con la Biblia, con paciencia y con amabilidad",
            ref: "2 Timoteo 2:24-26",
            situacion: "Eres maestro de la escuela dominical. Un sábado tocan a tu puerta dos personas muy amables, con un folleto sobre la Biblia, y te invitan a conversar.",
            escenas: [
              {
                id: "e1",
                narra: "Te saludan con una sonrisa y te ofrecen el folleto.",
                pregunta: "¿Cómo los recibes?",
                opciones: [
                  { texto: "Los saludas con amabilidad y conversas con ellos, con tu Biblia a mano.", valor: 2, explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama: se les responde con la Biblia, con paciencia y con amabilidad.", siguiente: "e2" },
                  { texto: "Aceptas conversar, pero sin abrir la Biblia: solo con tus propias ideas.", valor: 1, explica: "Fuiste amable, pero a quienes siguen estos grupos se les responde con la Biblia.", siguiente: "e2" },
                  { texto: "Les dices que son enemigos de Dios y les cierras la puerta de golpe.", valor: 0, explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama y que a veces busca a Dios con sinceridad.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Detrás de la puerta recuerdas que ellos no son enemigos, sino gente que Dios ama. Todavía están en la acera.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Sales, les pides perdón por tu manera y les ofreces conversar.", valor: 2, explica: "Se les responde con la Biblia, con paciencia y con amabilidad.", siguiente: "e2" },
                  { texto: "Te quedas adentro, porque con gente así ya no vale la pena hablar de Dios.", valor: 0, explica: "Son gente que Dios ama y que a veces busca a Dios con sinceridad.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Ya conversando, te dicen que Jesús fue una criatura muy especial, pero no Dios hecho hombre.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les preguntas quién es Jesús para ellos y respondes con la Biblia.", valor: 2, explica: "La primera pregunta para examinar es quién es Jesús: si lo confiesan como el Hijo eterno, Dios hecho hombre, o lo hacen una criatura. Y se responde con la Biblia." },
                  { texto: "Les dices con amabilidad que no estás de acuerdo, sin mostrarles por qué.", valor: 1, explica: "Fuiste amable, pero se les responde con la Biblia: la primera pregunta para examinar es quién es Jesús." },
                  { texto: "Aceptas lo que dicen, porque son muy amables y suenan convincentes.", valor: 0, explica: "No importa cuán amable o convincente parezca el mensajero: se examina quién es Jesús." },
                ],
              },
              {
                id: "e3",
                narra: "Te dicen que, además de la Biblia, hay que obedecer a un líder que no se puede cuestionar.",
                pregunta: "¿Qué piensas, y cómo se lo dices?",
                opciones: [
                  { texto: "Que la autoridad es la Biblia, y se lo dices con paciencia y sin burla.", valor: 2, explica: "La tercera pregunta examina la autoridad: la Biblia, o la Biblia más un líder que no se puede cuestionar. Y se responde con paciencia y con amabilidad." },
                  { texto: "Que eso está mal, y se lo dices con firmeza, aunque terminas un poco enojado.", valor: 1, explica: "Lo que piensas es correcto, pero se les responde con paciencia y con amabilidad." },
                  { texto: "Que si el líder es sincero, da igual lo que enseñe sobre la Biblia.", valor: 0, explica: "La tercera pregunta es cuál es la autoridad: la Biblia, o la Biblia más otro libro, un profeta o un líder que no se puede cuestionar." },
                ],
              },
              {
                id: "e4",
                narra: "Antes de irse, te preguntan si pueden volver otro día.",
                pregunta: "¿Qué les respondes?",
                opciones: [
                  { texto: "Que sí, y que seguirán conversando con la Biblia, con paciencia.", valor: 2, explica: "Se les responde con la Biblia, con paciencia y con amabilidad, «por si quizá Dios les conceda que se arrepientan para conocer la verdad»." },
                  { texto: "Que pueden volver, pero que tú solo vas a escuchar, sin decir nada.", valor: 1, explica: "Escucharlos es bueno, pero se les responde con la Biblia." },
                  { texto: "Que no vuelvan nunca, porque gente como ellos no busca a Dios.", valor: 0, explica: "Son gente que Dios ama y que a veces busca a Dios con sinceridad." },
                ],
              },
            ],
          },
          {
            apoyo: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama y que a veces busca a Dios con sinceridad",
            ref: "Gálatas 1:8",
            situacion: "Eres líder de jóvenes. Un joven nuevo del grupo te cuenta que un compañero de trabajo lo invita a un grupo que promete riqueza y salud a cambio de ofrendas.",
            escenas: [
              {
                id: "e1",
                narra: "El joven te dice: Me aseguran que si ofrendo mucho, Dios me va a dar dinero y salud.",
                pregunta: "¿Qué le ayudas a ver primero?",
                opciones: [
                  { texto: "Que examine ese mensaje con una pregunta: ¿cuál es el evangelio?", valor: 2, explica: "Una de las tres preguntas es cuál es el evangelio: ese mensaje convierte a Dios en un medio para obtener cosas." },
                  { texto: "Que mejor no vaya, aunque no le expliques por qué ese mensaje es otro.", valor: 1, explica: "Le falta lo principal: aprender a examinar el mensaje con la pregunta ¿cuál es el evangelio?" },
                  { texto: "Que vaya sin miedo: si le prometen bendiciones, es un mensaje de Dios.", valor: 0, explica: "Ese mensaje promete riqueza y salud a cambio de fe o de ofrendas, y convierte a Dios en un medio para obtener cosas." },
                ],
              },
              {
                id: "e2",
                narra: "Él te pregunta qué tiene de malo, si su compañero es una persona muy buena.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no importa cuán amable parezca el mensajero, si anuncia otro evangelio.", valor: 2, explica: "Pablo fue tajante: si alguno anuncia otro evangelio, sea anatema; no importa cuán amable o convincente parezca el mensajero." },
                  { texto: "Que lo que importa es el mensaje, aunque no le muestres en la Biblia por qué.", valor: 1, explica: "Es verdad que importa el mensaje, pero a quien pregunta se le responde con la Biblia." },
                  { texto: "Que si su compañero es tan buena persona, lo que enseña tiene que ser cierto.", valor: 0, explica: "No importa cuán amable o convincente parezca el mensajero: se examina el evangelio que anuncia." },
                ],
              },
              {
                id: "e3",
                narra: "El joven quiere saber cómo hablarle a su compañero.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que le hable con la Biblia, con paciencia y amabilidad: Dios lo ama.", valor: 2, explica: "Las personas que siguen estos grupos son gente que Dios ama: se les responde con la Biblia, con paciencia y con amabilidad." },
                  { texto: "Que le pase un folleto con la verdad y no vuelva a tocar el tema con él.", valor: 1, explica: "Darle la verdad es bueno, pero se responde con paciencia, conversando con la Biblia." },
                  { texto: "Que se burle de ese grupo delante de todos, para que su compañero lo deje.", valor: 0, explica: "No son enemigos, sino gente que Dios ama: se les responde con paciencia y con amabilidad." },
                ],
              },
              {
                id: "e4",
                narra: "Al final, el joven te confiesa que no sabe bien qué cree, y teme dejarse convencer.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Que lea la Biblia, aprenda las doctrinas básicas y esté en una iglesia sana.", valor: 2, explica: "La mejor defensa contra el error es conocer bien la verdad: leer la Biblia, aprender las doctrinas básicas y estar unido a una iglesia sana." },
                  { texto: "Que estudie a fondo todos los errores de ese grupo, para poder rebatirlos uno por uno.", valor: 1, explica: "La mejor defensa es conocer bien la verdad, como los cajeros, que reconocen los billetes falsos estudiando bien los verdaderos." },
                  { texto: "Que deje de leer la Biblia por un tiempo, para no confundirse todavía más.", valor: 0, explica: "Al revés: la mejor defensa contra el error es conocer bien la verdad, leyendo la Biblia." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu prima te escribe: Me uní a un grupo que enseña que Jesús es un ángel. Allí me tratan con mucho cariño.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la quieres y te gustaría ver con ella en la Biblia quién es Jesús.", bien: true, explica: "Las personas que siguen estos grupos son gente que Dios ama: se les responde con la Biblia, con paciencia y con amabilidad." },
              { texto: "Que ya no es de la familia mientras siga en ese grupo de enemigos de Dios.", explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama." },
              { texto: "Que da lo mismo lo que crea de Jesús, si allí la tratan con tanto cariño.", explica: "No importa cuán amable o convincente parezca el mensajero: la primera pregunta es quién es Jesús." },
              { texto: "Que ese grupo es ridículo y que solo una tonta creería algo así de Jesús.", explica: "Se les responde con la Biblia, con paciencia y con amabilidad." },
            ],
            apoyo: "Se les responde con la Biblia, con paciencia y con amabilidad",
            ref: "2 Timoteo 2:24-26",
            explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama. Se les responde con la Biblia, con paciencia y con amabilidad.",
          },
          {
            caso: "Un hermano de tu célula te dice: Mi cuñado se unió a un grupo que niega la deidad de Cristo. ¿Le dejo de hablar?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que siga cerca de él y le responda con la Biblia, con paciencia y con amor.", bien: true, explica: "A quienes siguen estos grupos se les responde con la Biblia, con paciencia y con amor." },
              { texto: "Que sí: quien niega la deidad de Cristo ya es un enemigo de la familia.", explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama." },
              { texto: "Que no le diga nada, porque lo importante es que sea sincero en lo que cree.", explica: "La primera pregunta para examinar es quién es Jesús: si lo confiesan como el Hijo eterno, Dios hecho hombre." },
              { texto: "Que lo convenza discutiendo hasta que reconozca que está equivocado.", explica: "Se les responde con paciencia y con amabilidad, «por si quizá Dios les conceda que se arrepientan para conocer la verdad»." },
            ],
            apoyo: "A quienes siguen estos grupos se les responde con la Biblia, con paciencia y con amor",
            ref: "2 Timoteo 2:24-26",
            explica: "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama y que a veces busca a Dios con sinceridad: se les responde con la Biblia, con paciencia y con amor.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Tres preguntas la descubren: quién es Jesús, cuál es el evangelio y cuál es la autoridad",
            ref: "1 Juan 4:1-3",
            clave: {
              id: "pr-n4-apologetica-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tres preguntas ayudan a reconocer una secta o una falsa doctrina?",
              ideas: [
                { id: "jesus", peso: 34, texto: "¿Quién es Jesús? ¿Lo confiesan como el Hijo eterno, Dios hecho hombre?", formas: ["quien es jesus", "quien es cristo", "hijo eterno", "dios hecho hombre", "deidad de (cristo|jesus)", "sobre jesus", "(dicen|creen|ensenan) de jesus"] },
                { id: "evangelio", peso: 33, texto: "¿Cuál es el evangelio? ¿La salvación es por gracia por medio de la fe, o por cumplir las reglas del grupo?", formas: ["cual es el evangelio", "que evangelio", "por gracia", "salvacion", "(se|nos|uno) salva*", "cumplir (las|sus) reglas", "reglas del grupo", "el evangelio"] },
                { id: "autoridad", peso: 33, texto: "¿Cuál es la autoridad? ¿La Biblia, o la Biblia más otro libro, un profeta o un líder?", formas: ["autoridad", "otro libro", "un profeta", "(un|su|el) lider", "solo la biblia", "la biblia mas"] },
              ],
              modelo: "La primera es quién es Jesús: si lo confiesan como el Hijo eterno, Dios hecho hombre. La segunda, cuál es el evangelio: si la salvación es por gracia por medio de la fe. La tercera, cuál es la autoridad: la Biblia o la Biblia más otro libro.",
            },
          },
          {
            apoyo: "La mejor defensa contra el error es conocer bien la verdad",
            ref: "1 Juan 4:1-3",
            clave: {
              id: "pr-n4-apologetica-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que hay que probar los espíritus, y cuál es la mejor defensa contra el error?",
              ideas: [
                { id: "probar", peso: 50, texto: "Que no hay que creer a todo el que habla de Dios, sino examinar si su enseñanza es de Dios, porque muchos falsos profetas han salido.", formas: ["no creer a todo", "no (creer|creerle|creerles) a (todo|todos|cualquiera)", "examin*", "si (son|es|viene|vienen) de dios", "falsos profetas", "verdades centrales", "comparar con la biblia", "(revisar|evaluar) (lo|si|que)"] },
                { id: "verdad", peso: 50, texto: "La mejor defensa es conocer bien la verdad: leer la Biblia, aprender las doctrinas básicas y estar unido a una iglesia sana.", formas: ["conocer bien la verdad", "conocer la verdad", "conoc* bien la (verdad|biblia)", "leer la biblia", "doctrinas basicas", "iglesia sana", "billetes", "cajeros"] },
              ],
              modelo: "Quiere decir no creer a todo el que habla de Dios, sino examinar si su enseñanza es de Dios, porque muchos falsos profetas han salido. La mejor defensa es conocer bien la verdad: leer la Biblia, aprender las doctrinas básicas y estar en una iglesia sana.",
            },
          },
        ],
      },
    ],
  },
};
