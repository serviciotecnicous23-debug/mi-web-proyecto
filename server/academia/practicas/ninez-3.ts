/**
 * Las prácticas de la materia `ninez-3` (especialidad). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/ninez-3.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_NINEZ_3: PracticasMateria = {
  materia: "ninez-3",
  mision: {
    titulo: "Tu clase de niños, de la semana al domingo",
    intro: "El ministerio de niños de tu iglesia te confió una clase para los próximos meses, y el primer domingo se acerca. Vas a prepararla como enseña esta materia: con las siete leyes de Gregory, una historia bíblica contada con fidelidad, buenas preguntas y actividades para cada edad, una clase de una hora bien planificada, una disciplina con amor y firmeza, y una semana de oración y preparación. Repasa las seis lecciones para tener listo cada paso.",
    cierre: "Ya sabes enseñar a los niños con método: conocer lo que enseñas, ganar su atención y usar palabras que entiendan; contar la historia con fidelidad y llevarla a Jesús; preguntar y hacerlos participar; planificar la hora con oración; corregir con amor y firmeza, sin humillar; y vivir primero lo que enseñas. Enseñar no es terminar la lección: es que el niño entienda.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Las siete leyes de la enseñanza
    "ninez-3-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice la ley del maestro?", reverso: "Que el maestro conoce bien lo que va a enseñar.", apoyo: "La ley del maestro: conoce bien lo que va a enseñar" },
              { frente: "Según la ley del alumno, ¿cuándo aprende el alumno?", reverso: "Cuando presta atención con interés.", apoyo: "La ley del alumno: el alumno aprende cuando presta atención con interés" },
              { frente: "Según la ley del lenguaje, ¿qué palabras se usan?", reverso: "Palabras que el alumno entiende.", apoyo: "La ley del lenguaje: se usan palabras que el alumno entiende" },
              { frente: "Según la ley de la lección, ¿desde dónde y hacia dónde se va?", reverso: "De lo conocido a lo desconocido.", apoyo: "La ley de la lección: se va de lo conocido a lo desconocido" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según la ley del proceso de enseñar, ¿qué se despierta en el alumno?", reverso: "Su mente, para que piense por sí mismo.", apoyo: "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo" },
              { frente: "Según la ley del proceso de aprender, ¿cómo dice el alumno la verdad?", reverso: "Con sus propias palabras.", apoyo: "La ley del proceso de aprender: el alumno dice la verdad con sus propias palabras" },
              { frente: "Según la ley del repaso y la aplicación, ¿qué se hace con lo aprendido?", reverso: "Se repasa y se vive.", apoyo: "La ley del repaso y la aplicación: lo aprendido se repasa y se vive" },
              { frente: "¿En qué año publicó John Milton Gregory sus siete leyes?", reverso: "En 1884.", apoyo: "John Milton Gregory publicó estas leyes en 1884" },
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
            consigna: "Completa lo que dicen dos de las siete leyes de Gregory.",
            texto: "Según la ley del alumno, el alumno aprende cuando presta atención con [[interés]]; según la ley del [[lenguaje]], se usan [[palabras]] que el alumno entiende.",
            distractores: ["miedo", "silencio", "gritos"],
            errores: {
              miedo: "La ley del alumno dice que el alumno aprende cuando presta atención con interés.",
              silencio: "Es la ley del lenguaje: se usan palabras que el alumno entiende.",
              gritos: "La ley del lenguaje pide usar palabras que el alumno entiende.",
            },
            apoyo: "La ley del alumno: el alumno aprende cuando presta atención con interés",
            explica: "La ley del alumno dice que el alumno aprende cuando presta atención con interés; la ley del lenguaje, que se usan palabras que el alumno entiende.",
          },
          {
            consigna: "Completa lo que dicen otras dos leyes de Gregory.",
            texto: "Según la ley del proceso de enseñar, se [[despierta]] la mente del alumno para que [[piense]] por sí mismo. Según la ley del repaso y la aplicación, lo aprendido se repasa y se [[vive]].",
            distractores: ["llena", "repita", "olvida"],
            errores: {
              llena: "La ley del proceso de enseñar dice que se despierta la mente del alumno, para que piense por sí mismo.",
              repita: "Se despierta la mente del alumno para que piense por sí mismo.",
              olvida: "Según la ley del repaso y la aplicación, lo aprendido se repasa y se vive.",
            },
            apoyo: "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo",
            explica: "Según la ley del proceso de enseñar, se despierta la mente del alumno para que piense por sí mismo; y según la ley del repaso y la aplicación, lo aprendido se repasa y se vive.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Esdras y los maestros de Israel: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Esdras primero estudió la ley, después vivió lo que estudiaba y después la enseñó.", verdad: true, explica: "Así lo dice la lección: Esdras preparó su corazón para inquirir la ley, para cumplirla y para enseñarla.", apoyo: "Primero estudió, después vivió lo que estudiaba y después enseñó", ref: "Esdras 7:10" },
              { texto: "Esdras enseñó la ley en Israel antes de estudiarla y de cumplirla.", verdad: false, explica: "Esdras «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos»: primero estudió y vivió, y después enseñó.", apoyo: "Esdras fue un buen maestro porque «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos»", ref: "Esdras 7:10" },
              { texto: "Los maestros de Israel leían la ley claramente y ponían el sentido.", verdad: true, explica: "Así lo dice Nehemías 8:8: «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", apoyo: "«leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura»", ref: "Nehemías 8:8" },
            ],
          },
          {
            consigna: "Sobre la meta de los maestros de Israel y la del maestro de niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando los maestros de Israel enseñaban, la meta era terminar la lectura.", verdad: false, explica: "La meta no era terminar la lectura, sino que todos entendieran.", apoyo: "La meta no era terminar la lectura, sino que todos entendieran", ref: "Nehemías 8:8" },
              { texto: "Enseñar no es terminar la lección: es que el niño entienda.", verdad: true, explica: "Como los maestros de Israel, que ponían el sentido para que todos entendieran, el maestro de niños busca que el niño entienda.", apoyo: "Enseñar no es terminar la lección: es que el niño entienda" },
              { texto: "Las siete leyes de Gregory ayudan a enseñar como Esdras y los maestros de Israel.", verdad: true, explica: "Esdras estudió, vivió y enseñó la Palabra, y los maestros de Israel ponían el sentido para que todos entendieran: las siete leyes de Gregory ayudan a enseñar así.", apoyo: "Las siete leyes de Gregory ayudan a enseñar así" },
              { texto: "Un maestro que dice cosas verdaderas durante una hora siempre logra que todos aprendan.", verdad: false, explica: "Un maestro puede decir cosas verdaderas durante una hora sin que nadie aprenda: enseñar no es solo hablar.", apoyo: "Un maestro puede decir cosas verdaderas durante una hora sin que nadie aprenda" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Antes de enseñar, ¿qué preparó Esdras su corazón para hacer con la ley de Jehová? Toca las palabras que lo dicen.",
            texto: "había preparado su corazón para [[inquirir]] la ley de Jehová y para [[cumplirla]], y para enseñar en Israel sus estatutos y decretos",
            apoyo: "Primero estudió, después vivió lo que estudiaba y después enseñó",
            ref: "Esdras 7:10",
            explica: "Esdras preparó su corazón para inquirir la ley de Jehová y para cumplirla, y después para enseñarla: primero estudió, después vivió lo que estudiaba y después enseñó.",
          },
          {
            consigna: "Los maestros de Israel leían la ley. ¿Cómo la leían, y qué buscaban al poner el sentido? Toca las dos palabras que lo dicen.",
            texto: "leían en el libro de la ley de Dios [[claramente]], y ponían el sentido, de modo que [[entendiesen]] la lectura",
            apoyo: "La meta no era terminar la lectura, sino que todos entendieran",
            ref: "Nehemías 8:8",
            explica: "Leían claramente y ponían el sentido, de modo que entendiesen la lectura: la meta no era terminar la lectura, sino que todos entendieran.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Sirven para cualquier clase, y mucho más para enseñar la Palabra a los niños",
            ref: "Lucas 10:25-37",
            titulo: "La clase del buen samaritano",
            relato: [
              "Eres maestro en la clase de niños de tu iglesia. El domingo vas a enseñar la parábola del buen samaritano, en Lucas 10:25-37.",
              "Quieres preparar y dar la clase con las siete leyes de Gregory, para que los niños aprendan de verdad.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Para cumplir la ley del maestro, ¿qué haces durante la semana?",
                opciones: [
                  { texto: "Estudio Lucas 10:25-37 y oro por la clase.", bien: true, explica: "La ley del maestro: conoce bien lo que va a enseñar. El maestro estudia el pasaje durante la semana y ora por la clase." },
                  { texto: "Leo el pasaje el domingo, al llegar.", explica: "Para conocer bien lo que vas a enseñar, el pasaje se estudia durante la semana." },
                  { texto: "Busco un juego divertido y dejo el pasaje para el final.", explica: "Primero el maestro conoce bien lo que va a enseñar: estudia el pasaje y ora por la clase." },
                ],
                apoyo: "El maestro: estudia Lucas 10:25-37 durante la semana y ora por la clase",
                explica: "La ley del maestro pide conocer bien lo que vas a enseñar: estudiar el pasaje durante la semana y orar por la clase.",
              },
              {
                tipo: "situacion",
                pregunta: "Para cumplir la ley del alumno, ¿cómo empiezas la clase?",
                opciones: [
                  { texto: "Con una pregunta que despierte su interés.", bien: true, explica: "El alumno aprende cuando presta atención con interés, y una pregunta despierta el interés." },
                  { texto: "Pidiendo silencio y leyendo todo el pasaje de corrido.", explica: "Leer todo de corrido no gana su atención: el alumno aprende cuando presta atención con interés." },
                  { texto: "Con un regaño a los que llegaron tarde, para que se callen.", explica: "El alumno aprende cuando presta atención con interés: se empieza con una pregunta que despierte el interés." },
                ],
                apoyo: "El alumno: empieza con una pregunta que despierta el interés: ¿alguna vez alguien te ayudó cuando estabas lastimado?",
                explica: "La ley del alumno: el alumno aprende cuando presta atención con interés. Por eso la clase empieza con una pregunta, como ¿alguna vez alguien te ayudó cuando estabas lastimado?",
              },
              {
                tipo: "situacion",
                pregunta: "Un niño te pregunta qué es un levita. Para cumplir la ley del lenguaje, ¿qué haces?",
                opciones: [
                  { texto: "Le explico la palabra con otras que él entiende.", bien: true, explica: "La ley del lenguaje: se usan palabras que el alumno entiende. En el ejemplo, el maestro explica palabras como samaritano o levita." },
                  { texto: "Sigo adelante: es una palabra que ya aprenderá de grande.", explica: "Según la ley del lenguaje, el maestro explica palabras como samaritano o levita." },
                  { texto: "Le digo que lo busque en casa.", explica: "La ley del lenguaje pide usar palabras que el alumno entiende: el maestro explica palabras como levita." },
                ],
                apoyo: "El lenguaje: explica palabras como samaritano o levita",
                explica: "La ley del lenguaje: se usan palabras que el alumno entiende. Por eso el maestro explica palabras como samaritano o levita.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya contaste la historia. Para cumplir la ley del proceso de enseñar, ¿qué haces?",
                opciones: [
                  { texto: "Les pregunto qué habrían hecho ellos.", bien: true, explica: "Así se despierta la mente del alumno para que piense por sí mismo." },
                  { texto: "Les doy la respuesta, para no perder tiempo.", explica: "El maestro pregunta qué habrían hecho ellos, en lugar de darles la respuesta." },
                  { texto: "Les leo lo que deben pensar de la historia.", explica: "Se despierta la mente del alumno para que piense por sí mismo, en lugar de darle la respuesta." },
                ],
                apoyo: "Enseñar: pregunta qué habrían hecho ellos, en lugar de darles la respuesta",
                explica: "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo, en lugar de darle la respuesta.",
              },
              {
                tipo: "explica",
                apoyo: "Aprender: cada niño cuenta la historia con sus propias palabras",
                clave: {
                  id: "pr-ninez-3-1-a5-1",
                  tipo: "corta",
                  pregunta: "¿Cómo terminas la clase para cumplir las dos últimas leyes: la del proceso de aprender y la del repaso y la aplicación?",
                  ideas: [
                    { id: "palabras", peso: 50, texto: "Cada niño cuenta la historia con sus propias palabras.", formas: ["propias palabras", "sus palabras", "palabras suyas", "a su manera", "a su modo"] },
                    { id: "aplicar", peso: 50, texto: "Piensan a quién pueden ayudar esta semana: lo aprendido se repasa y se vive.", formas: ["a quien (pueden|puede|puedo|podemos|podrian|van|vamos) ayudar", "esta semana", "repas*", "se vive", "(vivir|vivan|viva|vivirlo|vivamos|vivirla)", "aplic* (lo|la) (aprendido|historia|leccion)"] },
                  ],
                  modelo: "Pido a cada niño que cuente la historia con sus propias palabras. Después repasamos lo aprendido y cada uno piensa a quién puede ayudar esta semana, para vivirlo.",
                },
              },
            ],
          },
          {
            apoyo: "Antes de cada clase, repasa las siete leyes como una lista",
            titulo: "Diez minutos antes de la clase",
            relato: [
              "Eres ayudante en la clase de niños, y la maestra te pidió dar la clase de este domingo. Ya estudiaste el pasaje durante la semana.",
              "El sábado, con tu cuaderno, repasas las siete leyes de Gregory como una lista, para preparar bien la clase.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Para la ley del maestro, ¿qué te preguntas?",
                opciones: [
                  { texto: "¿Sé bien lo que voy a enseñar?", bien: true, explica: "Es la primera pregunta de la lista: la ley del maestro pide conocer bien lo que va a enseñar." },
                  { texto: "¿Cuántos niños vendrán?", explica: "La ley del maestro pregunta si sabes bien lo que vas a enseñar." },
                  { texto: "¿Cuánto tiempo puedo hablar sin parar?", explica: "Enseñar no es solo hablar: la ley del maestro pide conocer bien lo que va a enseñar." },
                ],
                apoyo: "¿sé bien lo que voy a enseñar?",
                explica: "La ley del maestro: conoce bien lo que va a enseñar.",
              },
              {
                tipo: "situacion",
                pregunta: "Para la ley del alumno, ¿qué te preguntas?",
                opciones: [
                  { texto: "¿Cómo voy a ganar su atención?", bien: true, explica: "El alumno aprende cuando presta atención con interés." },
                  { texto: "¿Cómo hago para que no me interrumpan?", explica: "La ley del alumno pregunta cómo ganar su atención, porque el alumno aprende cuando presta atención con interés." },
                  { texto: "¿Cuántas páginas les voy a leer?", explica: "La ley del alumno pregunta cómo vas a ganar su atención." },
                ],
                apoyo: "¿Cómo voy a ganar su atención?",
                explica: "La ley del alumno: el alumno aprende cuando presta atención con interés.",
              },
              {
                tipo: "situacion",
                pregunta: "Para la ley del lenguaje, ¿qué te preguntas?",
                opciones: [
                  { texto: "¿Qué palabras tendré que explicar?", bien: true, explica: "La ley del lenguaje: se usan palabras que el alumno entiende." },
                  { texto: "¿Qué palabras difíciles los harán admirarme?", explica: "La ley del lenguaje pide usar palabras que el alumno entiende." },
                  { texto: "¿Cuántos versículos podré leer sin parar?", explica: "La ley del lenguaje pregunta qué palabras tendrás que explicar." },
                ],
                apoyo: "¿Qué palabras tendré que explicar?",
                explica: "La ley del lenguaje: se usan palabras que el alumno entiende, y el maestro explica las que hacen falta.",
              },
              {
                tipo: "explica",
                apoyo: "Diez minutos de esa revisión cambian la clase",
                clave: {
                  id: "pr-ninez-3-1-a5-2",
                  tipo: "corta",
                  pregunta: "Otro ayudante te dice que repasar las leyes antes de la clase es perder el tiempo. ¿Qué le respondes?",
                  ideas: [
                    { id: "cambian", peso: 50, texto: "Que diez minutos de esa revisión cambian la clase.", formas: ["cambi* la clase", "la clase cambia", "(mejoran|mejorar) la clase", "(cambian|cambia) (mucho|todo)", "(gran|mucha) diferencia", "(hacen|hace) (la|una) diferencia"] },
                    { id: "entienda", peso: 50, texto: "Que enseñar no es terminar la lección, sino que el niño entienda: las leyes ayudan a que aprenda de verdad.", formas: ["(nino|ninos) (entienda|entiendan|aprenda|aprendan)", "aprend* de verdad", "no es terminar", "que (entienda|entiendan)", "que (aprenda|aprendan)"] },
                  ],
                  errores: [
                    { id: "terminar", texto: "Enseñar no es terminar la lección: es que el niño entienda.", formas: ["(importante|meta) es terminar", "hay que terminar"], anula: "entienda" },
                  ],
                  modelo: "Le respondo que diez minutos de esa revisión cambian la clase. Enseñar no es terminar la lección, sino que el niño entienda, y las siete leyes ayudan a que aprenda de verdad.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre las leyes de Gregory tiene un error. Tócala.",
            frases: [
              "La ley del maestro: el maestro conoce bien lo que va a enseñar.",
              "La ley del lenguaje: se usan palabras difíciles, para que el alumno crezca.",
              "La ley de la lección: se va de lo conocido a lo desconocido.",
              "La ley del repaso y la aplicación: lo aprendido se repasa y se vive.",
            ],
            malo: 1,
            correccion: "La ley del lenguaje: se usan palabras que el alumno entiende.",
            apoyo: "La ley del lenguaje: se usan palabras que el alumno entiende",
            explica: "La ley del lenguaje pide usar palabras que el alumno entiende, como cuando el maestro explica palabras como samaritano o levita.",
          },
          {
            consigna: "Una de estas frases sobre las leyes de Gregory tiene un error. Tócala.",
            frases: [
              "La ley del alumno: el alumno aprende cuando presta atención con interés.",
              "La ley del proceso de enseñar: el maestro da la respuesta, para que el alumno no piense.",
              "La ley del proceso de aprender: el alumno dice la verdad con sus propias palabras.",
              "John Milton Gregory publicó estas leyes en 1884.",
            ],
            malo: 1,
            correccion: "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo.",
            apoyo: "La ley del proceso de enseñar: se despierta la mente del alumno para que piense por sí mismo",
            explica: "El maestro despierta la mente del alumno para que piense por sí mismo: en el ejemplo, pregunta qué habrían hecho ellos, en lugar de darles la respuesta.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Esdras preparó su corazón para estudiar, vivir y enseñar la Palabra",
            ref: "Esdras 7:10",
            clave: {
              id: "pr-ninez-3-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo enseñaban Esdras y los maestros de Israel, y qué tienen que ver con las siete leyes de Gregory?",
              ideas: [
                { id: "esdras", peso: 40, texto: "Esdras primero estudió la Palabra, después la vivió y después la enseñó.", formas: ["primero estudi*", "estudi* (vivi*|cumpl*|obedec*)", "estudiar vivir", "inquir*", "vivio lo que", "(vivio|vivirla|cumplio|cumplirla|obedecio) (la|lo)", "(preparo|preparado) su corazon"] },
                { id: "entender", peso: 30, texto: "Los maestros leían claramente y ponían el sentido para que todos entendieran.", formas: ["claramente", "pon* el sentido", "(daban|explicaban|explicar|explicaba) el sentido", "todos entendieran", "(entendieran|entendiesen|entendiera)"] },
                { id: "leyes", peso: 30, texto: "Las siete leyes de Gregory ayudan a enseñar así.", formas: ["ayudan a ensenar", "leyes (ayudan|sirven|ensenan)", "ensenar asi", "de la misma manera", "lo mismo que", "igual que (ellos|esdras)", "como (ellos|esdras)"] },
              ],
              modelo: "Esdras primero estudió la Palabra, después la vivió y después la enseñó; y los maestros leían claramente y ponían el sentido para que todos entendieran. Las siete leyes de Gregory ayudan a enseñar así.",
            },
          },
          {
            apoyo: "La meta no era terminar la lectura, sino que todos entendieran",
            ref: "Nehemías 8:8",
            clave: {
              id: "pr-ninez-3-1-a7-2",
              tipo: "corta",
              pregunta: "Un maestro dice: Lo importante es terminar la lección a tiempo. ¿Qué le respondes con el ejemplo de los maestros de Israel?",
              ideas: [
                { id: "meta", peso: 50, texto: "Que la meta no era terminar la lectura, sino que todos entendieran: enseñar es que el niño entienda.", formas: ["no era terminar", "no es terminar", "que todos entendieran", "que (el|los) (nino|ninos) (entienda|entiendan)", "(entendieran|entendiesen)", "que entiendan"] },
                { id: "sentido", peso: 50, texto: "Que los maestros de Israel leían claramente y ponían el sentido.", formas: ["claramente", "pon* el sentido", "(daban|explicaban|explicar|explicaba) el sentido"] },
              ],
              errores: [
                { id: "terminar", texto: "La meta no es terminar la lección, sino que el niño entienda.", formas: ["(importante|meta) es terminar", "(importante|meta) era terminar", "hay que terminar"], anula: "meta" },
              ],
              modelo: "Le respondo que los maestros de Israel leían claramente y ponían el sentido. Su meta no era terminar la lectura, sino que todos entendieran, y enseñar es que el niño entienda.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Contar historias bíblicas
    "ninez-3-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué recuerdan los niños por muchos años, aunque olviden una explicación?", reverso: "Una buena historia.", apoyo: "Los niños pueden olvidar una explicación, pero recuerdan una buena historia por muchos años" },
              { frente: "¿Les hablaba Jesús a la gente sin parábolas?", reverso: "No: sin parábolas no les hablaba.", apoyo: "Y sin parábolas no les hablaba" },
              { frente: "¿Cómo pasaba la fe de Israel de generación en generación?", reverso: "Contando historias.", apoyo: "La fe de Israel pasaba de generación en generación contando historias" },
              { frente: "¿Qué puede hacer una historia bien contada?", reverso: "Acompañar a un niño toda la vida.", apoyo: "Una historia bien contada puede acompañar a un niño toda la vida" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué contaba el salmista que les contaron sus padres?", reverso: "Cosas escondidas desde tiempos antiguos.", apoyo: "El salmista contaba «cosas escondidas desde tiempos antiguos, Las cuales hemos oído y entendido; Que nuestros padres nos las contaron»" },
              { frente: "¿Por qué contar bien las historias de la Biblia es tan importante?", reverso: "Porque los niños recuerdan una buena historia por muchos años.", apoyo: "Por eso contar bien las historias de la Biblia es una de las tareas más importantes del maestro" },
              { frente: "¿Conforme a qué les hablaba Jesús con parábolas?", reverso: "Conforme a lo que podían oír.", apoyo: "conforme a lo que podían oír" },
              { frente: "¿A quién lleva la historia, y no solo a una lección de buena conducta?", reverso: "A Jesús.", apoyo: "La historia lleva a Jesús, y no solo a una lección de buena conducta" },
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
            consigna: "¿Cómo les hablaba Jesús la palabra a sus oyentes? Toca las palabras que lo dicen.",
            texto: "[[Con muchas parábolas]] como estas les hablaba la palabra, conforme a lo que podían oír",
            apoyo: "Jesús enseñaba con historias",
            ref: "Marcos 4:33",
            explica: "Jesús enseñaba con historias: con muchas parábolas les hablaba la palabra, conforme a lo que podían oír, y sin parábolas no les hablaba.",
          },
          {
            consigna: "Según el salmista, ¿quiénes les contaron las cosas que oyeron y entendieron? Toca las palabras que lo dicen.",
            texto: "Las cuales hemos oído y entendido; Que [[nuestros padres]] nos las contaron",
            apoyo: "La fe de Israel pasaba de generación en generación contando historias",
            ref: "Salmos 78:3",
            explica: "El salmista contaba lo que había oído y entendido, porque sus padres se lo contaron: la fe de Israel pasaba de generación en generación contando historias.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena la historia de Zaqueo como la prepara la lección, del comienzo al final.",
            pasos: [
              "Comienzo: ¿alguna vez no pudiste ver algo porque había mucha gente?",
              "Problema: Zaqueo era pequeño de estatura y la gente lo despreciaba",
              "Tensión: Jesús se detuvo, lo miró y lo llamó por su nombre",
              "Momento más alto: Jesús fue a su casa, y Zaqueo cambió",
              "Final: Jesús vino a buscar y a salvar lo que se había perdido",
            ],
            apoyo: "Ordenarla: un comienzo que atrape, un problema, un momento de tensión y un final",
            ref: "Lucas 19:1-10",
            explica: "La historia de Zaqueo tiene un comienzo que atrapa, un problema, un momento de tensión, el momento más alto y un final que lleva a Jesús: el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.",
          },
          {
            consigna: "Ordena lo que pasa en la historia de Zaqueo, como la cuenta la lección, de lo primero a lo último.",
            pasos: [
              "Zaqueo, rico y pequeño de estatura, no puede ver a Jesús por la gente",
              "Se sube a un árbol para ver a Jesús",
              "Jesús se detiene, lo mira y lo llama por su nombre",
              "Jesús va a su casa, y Zaqueo cambia: dará a los pobres",
              "El final: el Hijo del Hombre vino a buscar y a salvar lo perdido",
            ],
            apoyo: "Tensión: se subió a un árbol para ver a Jesús, y Jesús se detuvo, lo miró y lo llamó por su nombre",
            ref: "Lucas 19:1-10",
            explica: "Zaqueo no podía ver a Jesús por la gente; se subió a un árbol, y Jesús se detuvo y lo llamó por su nombre; fue a su casa, y Zaqueo cambió; y el final: el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se prepara una historia bíblica.",
            texto: "Para preparar una historia, el maestro la lee en la [[Biblia]], encuentra su verdad [[central]] y la [[ensaya]] en voz alta, con la mirada en los niños.",
            distractores: ["película", "escondida", "improvisa"],
            errores: {
              "película": "La historia se lee varias veces en la Biblia, y no solo en un libro de historias.",
              escondida: "Se encuentra la verdad central: qué enseña la historia acerca de Dios.",
              improvisa: "La historia se ensaya en voz alta, con la mirada en los niños y no en el papel.",
            },
            apoyo: "Encontrar la verdad central: qué enseña la historia acerca de Dios",
            explica: "Para preparar una historia, el maestro la lee varias veces en la Biblia, encuentra su verdad central, la ordena, la ensaya en voz alta y prepara un apoyo visual sencillo.",
          },
          {
            consigna: "Completa cómo se ordena una historia bíblica.",
            texto: "Se ordena la historia con un comienzo que [[atrape]], un [[problema]], un momento de [[tensión]] y un final.",
            distractores: ["aburra", "sermón", "recreo"],
            errores: {
              aburra: "La historia empieza con un comienzo que atrape.",
              "sermón": "Después del comienzo viene un problema, como el de Zaqueo, a quien la gente despreciaba.",
              recreo: "Antes del final hay un momento de tensión, como cuando Jesús se detuvo y llamó a Zaqueo por su nombre.",
            },
            apoyo: "Ordenarla: un comienzo que atrape, un problema, un momento de tensión y un final",
            explica: "La historia se ordena con un comienzo que atrape, un problema, un momento de tensión y un final, como la de Zaqueo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Cuéntala con fidelidad y deja que muestre a Dios",
            ref: "Lucas 19:1-10",
            situacion: "Es domingo, y vas a contar la historia de Zaqueo en la clase de los escolares. Ya la estudiaste en la Biblia y la ensayaste.",
            escenas: [
              {
                id: "e1",
                narra: "Antes de empezar, una ayudante te dice: Agrégale un perro que persigue a Zaqueo, para que sea más emocionante.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La cuentas como está en la Biblia, sin agregar nada.", valor: 2, explica: "No cambies los hechos de la Biblia para hacerla más emocionante: cuéntala con fidelidad.", siguiente: "e2" },
                  { texto: "Agregas el perro: a los niños les encantan esas cosas.", valor: 0, explica: "No cambies los hechos de la Biblia para hacerla más emocionante.", siguiente: "e1b" },
                  { texto: "Lo agregas, pero avisas que esa parte no está en la Biblia.", valor: 1, explica: "Avisar es honesto, pero la historia se cuenta con fidelidad, sin cambiar los hechos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un niño te pregunta: ¿Eso del perro también está en la Biblia?",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices que no y cuentas lo que dice la Biblia.", valor: 2, explica: "Cuéntala con fidelidad y deja que muestre a Dios.", siguiente: "e2" },
                  { texto: "Le dices que sí, para que la historia no pierda su emoción.", valor: 0, explica: "No cambies los hechos de la Biblia para hacerla más emocionante.", siguiente: "e2" },
                  { texto: "Le dices que no, y sigues con la clase.", valor: 1, explica: "Decir la verdad está bien; también conviene volver a contar la historia como está en la Biblia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llegas al momento en que Zaqueo se sube al árbol para ver a Jesús.",
                pregunta: "¿Cómo sigues contándola?",
                opciones: [
                  { texto: "Mirándolos: Jesús lo miró y lo llamó por su nombre.", valor: 2, explica: "Se cuenta con la mirada en los niños y no en el papel: Jesús se detuvo, lo miró y lo llamó por su nombre." },
                  { texto: "Leyendo tus notas, sin levantar la vista del papel.", valor: 1, explica: "Contar lo que dice la Biblia está bien, pero la historia se ensaya para contarla con la mirada en los niños y no en el papel." },
                  { texto: "Diciendo que Jesús lo regañó por haberse subido a un árbol.", valor: 0, explica: "Eso cambia los hechos: Jesús se detuvo, lo miró y lo llamó por su nombre." },
                ],
              },
              {
                id: "e3",
                narra: "Llegas al final de la historia.",
                pregunta: "¿Cómo la terminas?",
                opciones: [
                  { texto: "Con Jesús, que vino a buscar y a salvar lo perdido.", valor: 2, explica: "La historia lleva a Jesús, y no solo a una lección de buena conducta: el Hijo del Hombre vino a buscar y a salvar lo que se había perdido." },
                  { texto: "Con una regla: hay que ser generosos como fue Zaqueo.", valor: 0, explica: "No conviertas cada historia en una regla moral: la historia lleva a Jesús." },
                  { texto: "Con Zaqueo, para que lo imiten y se porten bien.", valor: 0, explica: "La historia lleva a Jesús, y no solo a una lección de buena conducta." },
                ],
              },
            ],
          },
          {
            apoyo: "La cuenta con fidelidad, sin cambiar los hechos, y la lleva a Jesús",
            ref: "Lucas 19:10",
            situacion: "Eres maestra de la clase de los más pequeños, y preparas la historia de Zaqueo para el domingo.",
            escenas: [
              {
                id: "e1",
                narra: "Encuentras un libro de historias con dibujos bonitos de Zaqueo.",
                pregunta: "¿De dónde preparas la historia?",
                opciones: [
                  { texto: "La leo varias veces en la Biblia, no solo en el libro.", valor: 2, explica: "Se lee el pasaje varias veces en la Biblia, y no solo en un libro de historias.", siguiente: "e2" },
                  { texto: "Solo del libro, que ya trae todo resumido.", valor: 0, explica: "Se lee el pasaje varias veces en la Biblia, y no solo en un libro de historias.", siguiente: "e1b" },
                  { texto: "La leo una vez en la Biblia y después solo uso el libro.", valor: 1, explica: "Leerla en la Biblia está bien, pero el pasaje se lee varias veces en la Biblia.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al leer Lucas 19, ves que el libro cambió algunos hechos de la historia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cuento los hechos como están en la Biblia.", valor: 2, explica: "No cambies los hechos de la Biblia: cuéntala con fidelidad.", siguiente: "e2" },
                  { texto: "Cuento lo del libro, porque es más emocionante.", valor: 0, explica: "No cambies los hechos de la Biblia para hacerla más emocionante.", siguiente: "e2" },
                  { texto: "Le pregunto al pastor qué hacer.", valor: 1, explica: "Pedir consejo está bien, pero la lección es clara: no cambies los hechos de la Biblia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ahora buscas la verdad central de la historia.",
                pregunta: "¿Cuál escoges?",
                opciones: [
                  { texto: "Jesús vino a buscar y a salvar lo que se había perdido.", valor: 2, explica: "La verdad central dice qué enseña la historia acerca de Dios, y lleva a Jesús." },
                  { texto: "Hay que devolver lo que uno ha quitado a los demás.", valor: 0, explica: "Eso convierte la historia en una regla moral: la historia lleva a Jesús." },
                  { texto: "Los niños pequeños también pueden subirse a los árboles.", valor: 0, explica: "La verdad central dice qué enseña la historia acerca de Dios." },
                ],
              },
              {
                id: "e3",
                narra: "Terminas de contarla y quieres llevarla a la vida de los niños.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Jesús te conoce por tu nombre y quiere estar contigo.", valor: 2, explica: "Para tu vida: Jesús te conoce por tu nombre y quiere estar contigo." },
                  { texto: "Si no se portan bien, Jesús no va a querer estar con ustedes.", valor: 0, explica: "La historia lleva a Jesús, y no solo a una lección de buena conducta: Jesús vino a buscar lo que se había perdido." },
                  { texto: "Sean buenos como Zaqueo, que devolvió lo que había quitado.", valor: 0, explica: "No conviertas cada historia en una regla moral: la historia lleva a Jesús." },
                ],
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
            consigna: "¿Así se cuenta la historia con fidelidad, o no? Lleva cada frase a su grupo.",
            grupos: ["Así se cuenta con fidelidad", "Así no se cuenta"],
            frases: [
              { texto: "Contar los hechos como están en la Biblia", grupo: 0 },
              { texto: "Dejar que la historia muestre a Dios", grupo: 0 },
              { texto: "Terminar en Jesús, que vino a buscar lo perdido", grupo: 0 },
              { texto: "Agregar hechos para que sea más emocionante", grupo: 1 },
              { texto: "Convertir cada historia en una regla moral", grupo: 1 },
              { texto: "Terminar solo con una lección de buena conducta", grupo: 1 },
            ],
            apoyo: "No cambies los hechos de la Biblia para hacerla más emocionante, ni conviertas cada historia en una regla moral",
            explica: "Se cuenta con fidelidad, sin cambiar los hechos, y se deja que la historia muestre a Dios y lleve a Jesús; no se le agregan hechos ni se convierte en una regla moral.",
          },
          {
            consigna: "Al contar la historia de Zaqueo, ¿es fiel al texto o lo cambia? Lleva cada frase a su grupo.",
            grupos: ["Es fiel al texto", "Cambia el texto"],
            frases: [
              { texto: "Zaqueo era jefe de los cobradores de impuestos", grupo: 0 },
              { texto: "Jesús se detuvo, lo miró y lo llamó por su nombre", grupo: 0 },
              { texto: "Zaqueo daría a los pobres y devolvería lo que había quitado", grupo: 0 },
              { texto: "Zaqueo era el hombre más alto de la ciudad", grupo: 1 },
              { texto: "Jesús pasó de largo sin mirar a Zaqueo", grupo: 1 },
              { texto: "Zaqueo se escondió de Jesús detrás de un árbol", grupo: 1 },
            ],
            apoyo: "La cuenta con fidelidad, sin cambiar los hechos, y la lleva a Jesús",
            ref: "Lucas 19:1-10",
            explica: "Zaqueo era rico, jefe de los cobradores de impuestos y pequeño de estatura; se subió a un árbol, y Jesús lo miró y lo llamó por su nombre; y Zaqueo cambió: daría a los pobres y devolvería lo que había quitado.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La historia lleva a Jesús, y no solo a una lección de buena conducta",
            ref: "Lucas 19:10",
            clave: {
              id: "pr-ninez-3-2-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se cuenta una historia bíblica con fidelidad, y adónde debe llevar a los niños?",
              ideas: [
                { id: "fiel", peso: 50, texto: "Se cuenta con fidelidad, sin cambiar los hechos de la Biblia para hacerla más emocionante.", formas: ["sin cambiar", "sin (agregar|inventar|anadir|quitar)", "los hechos", "(como|tal) (esta|dice) la biblia", "como esta en la biblia", "fiel*", "fidelidad"] },
                { id: "jesus", peso: 50, texto: "Debe llevar a Jesús, y no solo a una lección de buena conducta.", formas: ["a jesus", "a cristo", "muestre a dios", "mostrar a dios", "vino a buscar", "salvar lo (que|perdido)"] },
              ],
              errores: [
                { id: "cambiar", texto: "La historia se cuenta con fidelidad, sin cambiar los hechos de la Biblia.", formas: ["(cambiar|cambian|cambia|cambio|cambiamos|agregar|inventar) los hechos", "(pueden|puede|podemos|puedes) (cambiar|agregar|inventar)"], anula: "fiel" },
              ],
              modelo: "Se cuenta con fidelidad, sin cambiar los hechos de la Biblia para hacerla más emocionante. Y debe llevar a los niños a Jesús, que vino a buscar y a salvar lo perdido, y no solo a una regla de conducta.",
            },
          },
          {
            apoyo: "No cambies los hechos de la Biblia para hacerla más emocionante, ni conviertas cada historia en una regla moral",
            ref: "Lucas 19:1-10",
            clave: {
              id: "pr-ninez-3-2-a7-2",
              tipo: "corta",
              pregunta: "Una maestra terminó la historia de Zaqueo diciendo: Por eso hay que portarse bien. ¿Qué le aconsejas?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Que la lleve a Jesús: el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.", formas: ["a jesus", "a cristo", "hijo del hombre", "vino a buscar", "salvar lo (que|perdido)", "te conoce por tu nombre", "quiere estar contigo"] },
                { id: "regla", peso: 50, texto: "Que no la convierta en una regla moral ni solo en una lección de buena conducta.", formas: ["no (convierta|convertir|convertirla|termine|terminar|reduzca|reducir|la)", "no solo (portarse|porten|una|a|en)", "mas que (portarse|una)", "ni (una|en) (regla|leccion)", "sin (convertir|convertirla)"] },
              ],
              modelo: "Le aconsejo que no convierta la historia en una regla moral ni solo en una lección de buena conducta. Que la lleve a Jesús: el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Preguntas, actividades y juegos
    "ninez-3-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué ayudan las preguntas de memoria?", reverso: "Para recordar la historia.", apoyo: "De memoria: ¿qué pasó?, ¿quién lo hizo? Ayudan a recordar la historia" },
              { frente: "¿Para qué ayudan las preguntas de comprensión?", reverso: "Para pensar.", apoyo: "De comprensión: ¿por qué lo hizo?, ¿qué nos enseña de Dios? Ayudan a pensar" },
              { frente: "¿Adónde llevan las preguntas de aplicación?", reverso: "A la vida.", apoyo: "De aplicación: ¿qué harías tú?, ¿a quién puedes ayudar? Llevan a la vida" },
              { frente: "¿Con qué tarea terminó Jesús después de la parábola?", reverso: "«Ve, y haz tú lo mismo».", apoyo: "Y terminó con una tarea: «Ve, y haz tú lo mismo»" },
            ],
          },
          {
            tarjetas: [
              { frente: "Si preguntas ¿qué harías tú?, ¿qué clase de pregunta haces?", reverso: "Una pregunta de aplicación.", apoyo: "De aplicación: ¿qué harías tú?, ¿a quién puedes ayudar? Llevan a la vida" },
              { frente: "¿Qué pregunta de Jesús llevó a Pedro a confesar quién era él?", reverso: "«Y vosotros, ¿quién decís que soy yo?»", apoyo: "Jesús enseñaba con preguntas: «Y vosotros, ¿quién decís que soy yo?»" },
              { frente: "Según Santiago 1:22, ¿qué deben ser los niños, y no solo oidores?", reverso: "Hacedores de la palabra.", apoyo: "porque los niños aprenden haciendo y deben ser hacedores de la palabra" },
              { frente: "¿Qué convierte la clase en un encuentro?", reverso: "Las preguntas y las actividades.", apoyo: "Las preguntas y las actividades convierten la clase en un encuentro" },
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
            consigna: "¿Es una pregunta de memoria, de comprensión o de aplicación? Lleva cada frase a su grupo.",
            grupos: ["De memoria", "De comprensión", "De aplicación"],
            frases: [
              { texto: "¿Qué pasó?", grupo: 0 },
              { texto: "¿Quién lo hizo?", grupo: 0 },
              { texto: "¿Por qué lo hizo?", grupo: 1 },
              { texto: "¿Qué nos enseña de Dios?", grupo: 1 },
              { texto: "¿Qué harías tú?", grupo: 2 },
              { texto: "¿A quién puedes ayudar?", grupo: 2 },
              { texto: "¿Qué vas a hacer esta semana?", grupo: 2 },
            ],
            apoyo: "Usar preguntas de memoria, de comprensión y de aplicación",
            explica: "Las de memoria (¿qué pasó?, ¿quién lo hizo?) ayudan a recordar la historia; las de comprensión (¿por qué lo hizo?, ¿qué nos enseña de Dios?) ayudan a pensar; y las de aplicación (¿qué harías tú?) llevan a la vida.",
          },
          {
            consigna: "Después de la parábola del buen samaritano, ¿es una pregunta de memoria, de comprensión o de aplicación? Lleva cada frase a su grupo.",
            grupos: ["De memoria", "De comprensión", "De aplicación"],
            frases: [
              { texto: "¿Quién ayudó al hombre que cayó en manos de los ladrones?", grupo: 0 },
              { texto: "¿Qué tarea dio Jesús al terminar la parábola?", grupo: 0 },
              { texto: "¿Por qué ayudó el samaritano al hombre herido?", grupo: 1 },
              { texto: "¿Qué nos enseña esta parábola acerca de Dios?", grupo: 1 },
              { texto: "¿A quién puedes ayudar tú esta semana?", grupo: 2 },
              { texto: "¿Qué harías tú si vieras a alguien lastimado?", grupo: 2 },
              { texto: "¿Cómo vas a tratar como prójimo a alguien esta semana?", grupo: 2 },
            ],
            apoyo: "El maestro usa preguntas de memoria, de comprensión y de aplicación",
            ref: "Lucas 10:36-37",
            explica: "Preguntar quién ayudó o qué tarea dio Jesús es de memoria; por qué ayudó o qué enseña de Dios, de comprensión; y qué harías tú o a quién puedes ayudar, de aplicación.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada edad con las actividades que le recomienda la lección.",
            pares: [
              ["Los más pequeños", "Canciones con gestos, láminas y títeres"],
              ["Los escolares", "Dramatizaciones, juegos de repaso y mapas"],
              ["Los preadolescentes", "Conversaciones con preguntas abiertas"],
            ],
            apoyo: "Los más pequeños: canciones con gestos, láminas, títeres y manualidades sencillas",
            explica: "Los más pequeños: canciones con gestos, láminas, títeres y manualidades sencillas; los escolares: dramatizaciones, juegos de repaso, mapas y trabajos en grupo; los preadolescentes: conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo.",
          },
          {
            consigna: "¿Para qué edad recomienda la lección cada actividad? Une cada edad con la suya.",
            pares: [
              ["Los más pequeños", "Manualidades sencillas"],
              ["Los escolares", "Trabajos en grupo"],
              ["Los preadolescentes", "Proyectos de servicio y lectura de la Biblia en grupo"],
            ],
            apoyo: "Los preadolescentes: conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo",
            explica: "Las manualidades sencillas son para los más pequeños; los trabajos en grupo, para los escolares; y los proyectos de servicio y la lectura de la Biblia en grupo, para los preadolescentes.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una maestra de los preadolescentes te dice: Les traje títeres y láminas, pero se aburren y no participan.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que pruebe conversaciones con preguntas abiertas y proyectos de servicio.", bien: true, explica: "Para los preadolescentes, la lección propone conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo." },
              { texto: "Que use más títeres y canciones con gestos, hasta que se acostumbren.", explica: "Los títeres y las canciones con gestos son para los más pequeños: las actividades se eligen según la edad." },
              { texto: "Que les dé una charla larga, porque a esa edad ya no necesitan actividades.", explica: "Los niños aprenden haciendo: por eso la clase incluye actividades que ponen en práctica la verdad." },
              { texto: "Que les ponga un video y deje la Biblia para cuando sean mayores.", explica: "Con los preadolescentes se lee la Biblia en grupo: es una de las actividades para su edad." },
            ],
            apoyo: "Los preadolescentes: conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo",
            explica: "Las actividades se eligen según la edad: con los preadolescentes, conversaciones con preguntas abiertas, proyectos de servicio y lectura de la Biblia en grupo.",
          },
          {
            caso: "El maestro de los más pequeños te dice: Les leo la historia sentados y en silencio, y se distraen enseguida.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que use canciones con gestos, láminas, títeres y manualidades.", bien: true, explica: "Es lo que la lección propone para los más pequeños: canciones con gestos, láminas, títeres y manualidades sencillas." },
              { texto: "Que les dé un proyecto de servicio, como hacen con los preadolescentes.", explica: "Los proyectos de servicio son para los preadolescentes: las actividades se eligen según la edad." },
              { texto: "Que les exija más silencio.", explica: "Un niño que solo escucha aprende poco: los niños aprenden haciendo." },
              { texto: "Que los ponga a conversar con preguntas abiertas durante toda la clase.", explica: "Las conversaciones con preguntas abiertas son para los preadolescentes: las actividades se eligen según la edad." },
            ],
            apoyo: "Los más pequeños: canciones con gestos, láminas, títeres y manualidades sencillas",
            explica: "Un niño que solo escucha aprende poco. Con los más pequeños, la lección propone canciones con gestos, láminas, títeres y manualidades sencillas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un buen juego de repaso tiene un objetivo, preguntas variadas, equipos pequeños y termina en la aplicación",
            ref: "Santiago 1:22",
            titulo: "El juego de repaso del domingo",
            relato: [
              "Eres maestra de los escolares en la clase de niños de tu iglesia. Este domingo quieres terminar con un juego de repaso de la historia de la semana.",
              "Otra maestra te cuenta que, la última vez que hizo un juego, sus niños solo recordaban quién había ganado.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué decides primero?",
                opciones: [
                  { texto: "El objetivo: repasar la historia y su verdad central.", bien: true, explica: "Primero se elige el objetivo: repasar la historia de la semana y su verdad central." },
                  { texto: "El premio: algo grande para el equipo que gane al final.", explica: "El juego es una herramienta, no la meta: primero se elige el objetivo." },
                  { texto: "Las reglas, para que el juego dure toda la clase.", explica: "El juego es una herramienta, no la meta: primero se elige qué se quiere repasar." },
                ],
                apoyo: "Elegir el objetivo: repasar la historia de la semana y su verdad central",
                explica: "El juego es una herramienta, no la meta: se empieza por el objetivo, repasar la historia de la semana y su verdad central.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué preguntas preparas?",
                opciones: [
                  { texto: "Cinco: dos de memoria, dos de comprensión y una de aplicación.", bien: true, explica: "Así el juego tiene preguntas variadas: ayudan a recordar la historia, a pensar y a llevarla a la vida." },
                  { texto: "Veinte preguntas de memoria, para que el juego dure más tiempo.", explica: "Un buen juego tiene preguntas variadas: de memoria, de comprensión y de aplicación." },
                  { texto: "Cinco preguntas difíciles, para saber quién es el más listo.", explica: "Se preparan preguntas variadas y se forman equipos pequeños, para que todos participen." },
                ],
                apoyo: "Preparar cinco preguntas: dos de memoria, dos de comprensión y una de aplicación",
                explica: "Las preguntas variadas ayudan a recordar la historia, a pensar y a llevarla a la vida.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo formas los equipos?",
                opciones: [
                  { texto: "En equipos pequeños, para que todos participen.", bien: true, explica: "Los equipos pequeños hacen que todos participen y que nadie quede expuesto." },
                  { texto: "Cada niño solo contra todos, para ver quién sabe más.", explica: "Se forman equipos pequeños, para que todos participen y nadie quede expuesto." },
                  { texto: "En dos equipos grandes, para que haya más emoción.", explica: "Con equipos pequeños todos participan y nadie queda expuesto." },
                ],
                apoyo: "Formar equipos pequeños, para que todos participen y nadie quede expuesto",
                explica: "Los equipos pequeños hacen que todos participen y que nadie quede expuesto.",
              },
              {
                tipo: "situacion",
                pregunta: "Un niño responde mal una pregunta. ¿Qué haces?",
                opciones: [
                  { texto: "Corriges su respuesta con cariño.", bien: true, explica: "Las respuestas se celebran, y las que no son correctas se corrigen con cariño." },
                  { texto: "Le quitas un punto a su equipo delante de todos.", explica: "Las respuestas que no son correctas se corrigen con cariño, y nadie queda expuesto." },
                  { texto: "Dejas pasar el error.", explica: "Las respuestas que no son correctas se corrigen, y se corrigen con cariño." },
                ],
                apoyo: "Celebrar las respuestas y corregir con cariño las que no son correctas",
                explica: "En el juego se celebran las respuestas y se corrigen con cariño las que no son correctas.",
              },
              {
                tipo: "explica",
                apoyo: "Terminar con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana?",
                clave: {
                  id: "pr-ninez-3-3-a5-1",
                  tipo: "corta",
                  pregunta: "¿Cómo terminas el juego, y por qué así, para que no les pase lo mismo que a los niños de la otra maestra?",
                  ideas: [
                    { id: "aplicacion", peso: 50, texto: "Con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana?", formas: ["pregunta de aplicacion", "que (vas|van|vamos) a hacer", "que (haran|harias|hare|haremos)", "esta semana", "con la aplicacion", "sin puntos"] },
                    { id: "herramienta", peso: 50, negativa: true, texto: "Porque el juego es una herramienta, no la meta: si solo recuerdan quién ganó, no cumplió su tarea.", formas: ["herramienta", "no (es|era) la meta", "(solo|nada) (recuerdan|recuerden|recordaban|sepan|saben) quien gano", "cumpl* su tarea"] },
                  ],
                  modelo: "Termino con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana? Porque el juego es una herramienta, no la meta, y no sirve si los niños solo recuerdan quién ganó.",
                },
              },
            ],
          },
          {
            apoyo: "El juego es una herramienta, no la meta",
            titulo: "Solo recordaban quién ganó",
            relato: [
              "Eres el líder del ministerio de niños. Un maestro de los escolares preparó un juego de repaso con veinte preguntas de memoria y un premio para el equipo ganador.",
              "Al terminar la clase, le preguntas a un niño qué aprendió, y solo te dice qué equipo ganó.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestra eso al maestro?",
                opciones: [
                  { texto: "Que el juego no cumplió su tarea: era la herramienta, no la meta.", bien: true, explica: "Si la clase terminó y los niños solo recuerdan quién ganó, el juego no cumplió su tarea." },
                  { texto: "Que el juego salió muy bien, porque todos los niños se divirtieron.", explica: "El juego es una herramienta, no la meta: si solo recuerdan quién ganó, no cumplió su tarea." },
                  { texto: "Que el premio era muy pequeño.", explica: "El juego no es para el premio: es una herramienta para repasar la historia y su verdad central." },
                ],
                apoyo: "si la clase terminó y los niños solo recuerdan quién ganó, el juego no cumplió su tarea",
                explica: "El juego es una herramienta, no la meta: si los niños solo recuerdan quién ganó, el juego no cumplió su tarea.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué preguntas le sugieres para el próximo juego?",
                opciones: [
                  { texto: "Dos de memoria, dos de comprensión y una de aplicación.", bien: true, explica: "Así el juego tiene preguntas variadas: para recordar, para pensar y para llevar la verdad a la vida." },
                  { texto: "Más preguntas de memoria, pero más difíciles que las de hoy.", explica: "Un buen juego tiene preguntas variadas, no solo de memoria." },
                  { texto: "Solo preguntas de aplicación, sin repasar nada de la historia.", explica: "El juego repasa la historia y su verdad central: dos de memoria, dos de comprensión y una de aplicación." },
                ],
                apoyo: "Preparar cinco preguntas: dos de memoria, dos de comprensión y una de aplicación",
                explica: "Un buen juego tiene preguntas variadas: dos de memoria, dos de comprensión y una de aplicación.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo le sugieres que termine el juego?",
                opciones: [
                  { texto: "Con la pregunta de aplicación, sin puntos.", bien: true, explica: "El juego termina en la aplicación, sin puntos: ¿qué vas a hacer esta semana?" },
                  { texto: "Con la entrega del premio al equipo que ganó.", explica: "Si termina en el premio, los niños solo recuerdan quién ganó: el juego termina en la aplicación." },
                  { texto: "Con una pregunta de memoria que valga el doble.", explica: "La última pregunta es la de aplicación, y va sin puntos." },
                ],
                apoyo: "Terminar con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana?",
                explica: "El juego termina con la pregunta de aplicación, sin puntos: ¿qué vas a hacer esta semana?",
              },
              {
                tipo: "explica",
                apoyo: "Un buen juego de repaso tiene un objetivo, preguntas variadas, equipos pequeños y termina en la aplicación",
                clave: {
                  id: "pr-ninez-3-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le explicas al maestro sobre cómo es un juego de repaso que enseña y no solo entretiene?",
                  ideas: [
                    { id: "objetivo", peso: 34, texto: "Tiene un objetivo: repasar la historia de la semana y su verdad central.", formas: ["un objetivo", "(elegir|elige|tener|tiene|tenga) (un|el|su) objetivo", "(objetivo|meta) (es|sea) repas*", "para repas*", "verdad central", "repas* la historia"] },
                    { id: "variadas", peso: 33, texto: "Tiene preguntas variadas y equipos pequeños, para que todos participen.", formas: ["preguntas variadas", "(memoria|comprension)", "equipos pequenos", "todos participen", "nadie quede expuesto"] },
                    { id: "aplicacion", peso: 33, texto: "Termina en la aplicación, sin puntos.", formas: ["(termina|terminar|termine|terminamos|cierra|cerrar) (con|en) la (aplicacion|pregunta)", "(termina|terminar|termine|terminamos|cierra|cerrar) (con|en) (aplicacion|una)", "termin* aplic*", "sin puntos", "que (vas|van) a hacer"] },
                  ],
                  errores: [
                    { id: "ganar", texto: "El juego es una herramienta, no la meta: no es para ver quién gana.", formas: ["es ganar", "para ganar"], anula: "objetivo" },
                    { id: "grandes", texto: "Se forman equipos pequeños, para que todos participen y nadie quede expuesto.", formas: ["equipos grandes"], anula: "variadas" },
                  ],
                  modelo: "Le explico que un juego que enseña tiene un objetivo, repasar la historia y su verdad central; tiene preguntas variadas y equipos pequeños para que todos participen; y termina con la pregunta de aplicación, sin puntos.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el juego de repaso tiene un error. Tócala.",
            frases: [
              "Primero se elige el objetivo: repasar la historia de la semana y su verdad central.",
              "Se preparan cinco preguntas: dos de memoria, dos de comprensión y una de aplicación.",
              "Se forman equipos grandes, para que solo participen los que saben más.",
              "Se termina con la pregunta de aplicación, sin puntos.",
            ],
            malo: 2,
            correccion: "Se forman equipos pequeños, para que todos participen y nadie quede expuesto.",
            apoyo: "Formar equipos pequeños, para que todos participen y nadie quede expuesto",
            explica: "Un buen juego de repaso tiene un objetivo, preguntas variadas, equipos pequeños para que todos participen y termina en la aplicación.",
          },
          {
            consigna: "Una de estas frases sobre los juegos de la clase tiene un error. Tócala.",
            frases: [
              "El juego es una herramienta, no la meta.",
              "En el juego se celebran las respuestas y se corrigen con cariño las que no son correctas.",
              "Si los niños solo recuerdan quién ganó, el juego cumplió su tarea.",
              "Los niños aprenden haciendo: deben ser hacedores de la palabra.",
            ],
            malo: 2,
            correccion: "Si la clase terminó y los niños solo recuerdan quién ganó, el juego no cumplió su tarea.",
            apoyo: "si la clase terminó y los niños solo recuerdan quién ganó, el juego no cumplió su tarea",
            explica: "El juego es una herramienta, no la meta: si los niños solo recuerdan quién ganó, el juego no cumplió su tarea.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Usar preguntas de memoria, de comprensión y de aplicación",
            ref: "Lucas 10:36-37",
            clave: {
              id: "pr-ninez-3-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tres clases de preguntas usa el maestro de niños, y para qué sirve cada una?",
              ideas: [
                { id: "memoria", peso: 34, texto: "Las de memoria ayudan a recordar la historia: ¿qué pasó?, ¿quién lo hizo?", formas: ["memoria recordar", "memoria (recuerd*|acord*)", "recordar la historia", "que paso", "quien lo hizo"] },
                { id: "comprension", peso: 33, texto: "Las de comprensión ayudan a pensar: ¿por qué lo hizo?, ¿qué nos enseña de Dios?", formas: ["comprension pensar", "comprension (entender|entiend*|razon*)", "ayudan a pensar", "por que lo hizo", "ensena de dios", "ensena (sobre|acerca) dios"] },
                { id: "aplicacion", peso: 33, texto: "Las de aplicación llevan a la vida: ¿qué harías tú?, ¿a quién puedes ayudar?", formas: ["aplicacion vida", "aplic* vida", "a la vida", "a su vida", "que harias", "a quien (puedes|pueden) ayudar"] },
              ],
              modelo: "Usa preguntas de memoria, que ayudan a recordar la historia; de comprensión, que ayudan a pensar; y de aplicación, que llevan la verdad a la vida del niño.",
            },
          },
          {
            apoyo: "¿Qué pregunta de aplicación harías después de la historia del buen samaritano?",
            ref: "Lucas 10:36-37",
            clave: {
              id: "pr-ninez-3-3-a7-2",
              tipo: "corta",
              pregunta: "Escribe tres preguntas para después de la parábola del buen samaritano: una de memoria, una de comprensión y una de aplicación.",
              ideas: [
                { id: "memoria", peso: 34, texto: "Una de memoria, como ¿quién ayudó al hombre?: ayuda a recordar qué pasó y quién lo hizo.", formas: ["(quien|quienes) (ayudo|paso|pasaron|fue|era|hizo|lo|le|cayo)", "que (paso|hizo|hicieron)", "que le paso", "quien lo hizo", "(cuantos|cuales) (eran|fueron|pasaron)"] },
                { id: "comprension", peso: 33, texto: "Una de comprensión, como ¿por qué lo ayudó?: ayuda a pensar por qué lo hizo y qué nos enseña de Dios.", formas: ["por que", "que nos ensena", "que (ensena|aprendemos)", "ensena de dios"] },
                { id: "aplicacion", peso: 33, texto: "Una de aplicación, como ¿a quién puedes ayudar tú?: lleva a la vida.", formas: ["que harias", "a quien (puedes|podemos|pueden|vas)", "que (vas|van|vamos) a hacer", "como (puedes|podemos|pueden) ayudar", "(puedes|podrias) ayudar", "tu (harias|ayudarias)"] },
              ],
              modelo: "De memoria: ¿quién ayudó al hombre que cayó en manos de los ladrones? De comprensión: ¿por qué lo ayudó el samaritano? De aplicación: ¿a quién puedes ayudar tú esta semana?",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Una clase de una hora
    "ninez-3-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde empieza la preparación de una clase?", reverso: "En oración.", apoyo: "La preparación de una clase empieza en oración" },
              { frente: "¿Qué tres partes tiene el objetivo de una clase?", reverso: "Qué sabrán, qué sentirán y qué harán.", apoyo: "Antes: escribir un objetivo con tres partes: qué sabrán, qué sentirán y qué harán" },
              { frente: "¿Qué es preparar una clase para niños?", reverso: "Servir a Cristo.", apoyo: "Preparar una clase para niños es servir a Cristo" },
              { frente: "¿Qué vale más que tres horas improvisadas?", reverso: "Una hora bien preparada.", apoyo: "Una hora bien preparada vale más que tres improvisadas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo se recibe a cada niño en la bienvenida?", reverso: "Por su nombre, y se registra su llegada.", apoyo: "Bienvenida (5 minutos): recibir a cada niño por su nombre y registrar su llegada" },
              { frente: "En el cierre, ¿a quién se entrega a cada niño?", reverso: "A quien lo trajo.", apoyo: "Cierre (5 minutos): oración, una tarea para la casa y entregar a cada niño a quien lo trajo" },
              { frente: "¿Qué es el horario de la clase: una guía o una ley?", reverso: "Una guía, no una ley.", apoyo: "El horario es una guía, no una ley" },
              { frente: "¿Cuándo se prepara la clase?", reverso: "Durante la semana, no el sábado por la noche.", apoyo: "Prepara la clase durante la semana, no el sábado por la noche" },
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
            consigna: "En el objetivo de una clase sobre Zaqueo, ¿es lo que los niños sabrán, sentirán o harán? Lleva cada frase a su grupo.",
            grupos: ["Lo que sabrán", "Lo que sentirán", "Lo que harán"],
            frases: [
              { texto: "Que cuenten cómo Jesús llamó a Zaqueo por su nombre", grupo: 0 },
              { texto: "Que cuenten la historia de Zaqueo con sus palabras", grupo: 0 },
              { texto: "Que se sepan amados por Jesús", grupo: 1 },
              { texto: "Que se sepan buscados por Jesús", grupo: 1 },
              { texto: "Que esta semana saluden a un compañero que está solo", grupo: 2 },
              { texto: "Que esta semana inviten a jugar a un niño nuevo", grupo: 2 },
              { texto: "Que esta semana oren por un compañero de la clase", grupo: 2 },
            ],
            apoyo: "Escribir el objetivo de una clase con lo que el niño sabrá, sentirá y hará",
            explica: "En el ejemplo de la lección, saber es que los niños cuenten cómo Jesús llamó a Zaqueo por su nombre; sentir, que se sepan amados y buscados por Jesús; y hacer, que esta semana saluden por su nombre a un compañero que está solo.",
          },
          {
            consigna: "¿Qué parte del objetivo es cada frase: saber, sentir o hacer? Lleva cada frase a su grupo.",
            grupos: ["Saber", "Sentir", "Hacer"],
            frases: [
              { texto: "Que digan de memoria el versículo de la clase", grupo: 0 },
              { texto: "Que cuenten la historia de la semana con sus palabras", grupo: 0 },
              { texto: "Que se sientan amados por Dios", grupo: 1 },
              { texto: "Que se sepan buscados y amados por Jesús", grupo: 1 },
              { texto: "Que esta semana ayuden en casa sin que se lo pidan", grupo: 2 },
              { texto: "Que esta semana saluden por su nombre a un niño solo", grupo: 2 },
              { texto: "Que el domingo traigan a un amigo a la clase", grupo: 2 },
            ],
            apoyo: "Una clase se planifica con un objetivo de tres partes, qué sabrán, qué sentirán y qué harán",
            explica: "El objetivo tiene tres partes: qué sabrán, qué sentirán y qué harán. En el ejemplo de la lección: que cuenten cómo Jesús llamó a Zaqueo, que se sepan amados y buscados por Jesús, y que esta semana saluden a un compañero que está solo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las partes de la clase de una hora como las presenta la lección, de la primera a la última.",
            pasos: [
              "Bienvenida: recibir a cada niño por su nombre",
              "Alabanza y oración: cantos con gestos y oraciones",
              "Historia bíblica: contada con fidelidad",
              "Actividad: un juego, una manualidad o una dramatización",
              "Versículo y aplicación: qué harán esta semana",
              "Cierre: oración y entregar a cada niño a quien lo trajo",
            ],
            apoyo: "con sus partes: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre",
            explica: "La clase va así: bienvenida (5 minutos), alabanza y oración (10), historia bíblica (15), actividad (15), versículo y aplicación (10) y cierre (5).",
          },
          {
            consigna: "Ordena lo que pasa en la clase de una hora, del principio al final.",
            pasos: [
              "Recibes a cada niño por su nombre y registras su llegada",
              "Cantan con gestos y los niños oran",
              "Cuentas la historia con un apoyo visual",
              "Hacen un juego que refuerza la verdad",
              "Aprenden el versículo y piensan qué harán esta semana",
              "Oran, reciben una tarea y entregas a cada niño a quien lo trajo",
            ],
            apoyo: "Organizar las partes de una clase y su tiempo",
            explica: "Primero la bienvenida, después la alabanza y la oración, la historia bíblica, la actividad, el versículo con la aplicación y, al final, el cierre.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la clase con el tiempo que le da la lección.",
            pares: [
              ["La bienvenida", "5 minutos"],
              ["La alabanza y la oración", "10 minutos"],
              ["La historia bíblica", "15 minutos"],
              ["La clase entera", "Una hora"],
            ],
            apoyo: "Historia bíblica (15 minutos): contada con fidelidad y con un apoyo visual",
            explica: "En el ejemplo de la lección, la bienvenida dura 5 minutos; la alabanza y la oración, 10; la historia bíblica, 15; y toda la clase, una hora.",
          },
          {
            consigna: "Une cada parte de la clase con lo que dice de ella la lección.",
            pares: [
              ["La actividad", "Dura 15 minutos y refuerza la verdad"],
              ["El versículo y la aplicación", "Dura 10 minutos: piensan qué harán esta semana"],
              ["El cierre", "Dura 5 minutos: oración y una tarea para la casa"],
              ["El horario", "Es una guía, no una ley"],
            ],
            apoyo: "Actividad (15 minutos): un juego, una manualidad o una dramatización que refuerce la verdad",
            explica: "La actividad dura 15 minutos y refuerza la verdad; el versículo y la aplicación, 10; y el cierre, 5, con oración, una tarea para la casa y la entrega de cada niño a quien lo trajo. Y el horario es una guía, no una ley.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Planificar una clase completa de una hora, paso a paso",
            ref: "Colosenses 3:23",
            titulo: "La clase de Zaqueo, paso a paso",
            relato: [
              "El líder del ministerio de niños te pidió dar la clase de una hora del próximo domingo, sobre Zaqueo.",
              "Es lunes. Tienes tu Biblia, tu cuaderno y toda la semana para preparar la clase.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas a preparar la clase?",
                opciones: [
                  { texto: "Orando, y después escribiendo el objetivo.", bien: true, explica: "La preparación de una clase empieza en oración, y antes de todo se escribe el objetivo." },
                  { texto: "Buscando una manualidad bonita.", explica: "La actividad ayuda, pero la preparación empieza en oración y con el objetivo." },
                  { texto: "Esperando al sábado por la noche, cuando tengas más tiempo.", explica: "Prepara la clase durante la semana, no el sábado por la noche." },
                ],
                apoyo: "La preparación de una clase empieza en oración",
                explica: "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados»: la preparación de una clase empieza en oración.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué objetivo escribes para la clase?",
                opciones: [
                  { texto: "Qué sabrán, qué sentirán y qué harán los niños.", bien: true, explica: "El objetivo tiene tres partes: qué sabrán, qué sentirán y qué harán." },
                  { texto: "Que los niños pasen un rato bonito y no se aburran.", explica: "El objetivo dice qué sabrán, qué sentirán y qué harán los niños." },
                  { texto: "Que terminemos todas las partes a tiempo, sin falta.", explica: "El horario es una guía, no una ley: el objetivo dice qué sabrán, qué sentirán y qué harán." },
                ],
                apoyo: "Antes: escribir un objetivo con tres partes: qué sabrán, qué sentirán y qué harán",
                explica: "Por ejemplo: que cuenten cómo Jesús llamó a Zaqueo por su nombre, que se sepan amados y buscados por Jesús, y que esta semana saluden a un compañero que está solo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo repartes la hora?",
                opciones: [
                  { texto: "Bienvenida, alabanza, historia, actividad, versículo y cierre.", bien: true, explica: "Así son las partes de la clase: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre." },
                  { texto: "Cuarenta minutos de historia y veinte de juegos, sin ningún cierre.", explica: "La clase tiene sus partes y termina con un cierre: oración, una tarea para la casa y la entrega de cada niño a quien lo trajo." },
                  { texto: "Una hora entera de juegos.", explica: "El juego es una de las actividades, pero la clase tiene sus partes: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre." },
                ],
                apoyo: "y con sus partes: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre",
                explica: "En el ejemplo: bienvenida (5 minutos), alabanza y oración (10), historia bíblica (15), actividad (15), versículo y aplicación (10) y cierre (5).",
              },
              {
                tipo: "situacion",
                pregunta: "Al terminar la clase, ¿qué haces con cada niño?",
                opciones: [
                  { texto: "Lo entrego a quien lo trajo.", bien: true, explica: "En el cierre se entrega a cada niño a quien lo trajo." },
                  { texto: "Lo dejo salir solo, para que busque a sus padres.", explica: "En el cierre se entrega a cada niño a quien lo trajo." },
                  { texto: "Lo dejo esperando afuera mientras ordeno el salón.", explica: "Cada niño se entrega a quien lo trajo." },
                ],
                apoyo: "Cierre (5 minutos): oración, una tarea para la casa y entregar a cada niño a quien lo trajo",
                explica: "El cierre lleva oración, una tarea para la casa y la entrega de cada niño a quien lo trajo.",
              },
              {
                tipo: "explica",
                apoyo: "Prepara la clase durante la semana, no el sábado por la noche, y ten un plan para lo inesperado",
                clave: {
                  id: "pr-ninez-3-4-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué harás durante la semana para que el domingo estés listo también para lo que no esperas?",
                  ideas: [
                    { id: "semana", peso: 50, texto: "Preparar la clase durante la semana, no el sábado por la noche.", formas: ["durante la semana", "(lunes|martes|miercoles|jueves|viernes)", "no el sabado", "con tiempo", "a tiempo", "antes del sabado"] },
                    { id: "plan", peso: 50, texto: "Tener un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que termina antes.", formas: ["plan para lo inesperado", "para lo inesperado", "un plan", "plan b", "por si (pasa|llega|algo|un|una|acaso|hay)", "nino nuevo", "nino que llora", "termin* antes", "actividad (extra|mas)", "actividad de reserva"] },
                  ],
                  modelo: "Prepararé la clase durante la semana, no el sábado por la noche. Y tendré un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que termina antes de tiempo.",
                },
              },
            ],
          },
          {
            apoyo: "Con los más pequeños conviene cambiar de actividad más a menudo",
            titulo: "Una hora con los más pequeños",
            relato: [
              "Este domingo das la clase de los más pequeños, con el horario del ejemplo de la lección: bienvenida, alabanza y oración, historia, actividad, versículo y aplicación, y cierre.",
              "A los pocos minutos de la historia, los niños ya no te escuchan. Además, llega un niño nuevo que no conoces.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el horario?",
                opciones: [
                  { texto: "Cambio de actividad más a menudo: el horario es una guía.", bien: true, explica: "Con los más pequeños conviene cambiar de actividad más a menudo: el horario es una guía, no una ley." },
                  { texto: "Sigo con los quince minutos de historia, porque el horario es ley.", explica: "El horario es una guía, no una ley, y se adapta a la edad." },
                  { texto: "Termino antes la clase, porque los pequeños no pueden aprender.", explica: "Con los más pequeños no se termina la clase: se cambia de actividad más a menudo." },
                ],
                apoyo: "El horario es una guía, no una ley",
                explica: "Con los más pequeños conviene cambiar de actividad más a menudo; con los mayores, la historia y la conversación pueden durar más.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo recibes al niño nuevo?",
                opciones: [
                  { texto: "Le pregunto su nombre, lo saludo y registro su llegada.", bien: true, explica: "En la bienvenida se recibe a cada niño por su nombre y se registra su llegada." },
                  { texto: "Le digo que se siente atrás y espere a que termine la clase.", explica: "A cada niño se le recibe por su nombre y se registra su llegada." },
                  { texto: "Sigo con la clase sin saludarlo.", explica: "Un niño nuevo es parte de lo inesperado: se le recibe por su nombre y se registra su llegada." },
                ],
                apoyo: "Bienvenida (5 minutos): recibir a cada niño por su nombre y registrar su llegada",
                explica: "A cada niño se le recibe por su nombre y se registra su llegada, también al niño nuevo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué te enseña este domingo para la próxima clase?",
                opciones: [
                  { texto: "A tener un plan para lo inesperado.", bien: true, explica: "Hay que tener un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que terminó antes de tiempo." },
                  { texto: "A no dejar entrar niños nuevos durante la clase.", explica: "Un niño nuevo no se queda afuera: es parte de lo inesperado para lo que hay que tener un plan." },
                  { texto: "A preparar la clase el sábado por la noche.", explica: "Prepara la clase durante la semana, no el sábado por la noche." },
                ],
                apoyo: "ten un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que terminó antes de tiempo",
                explica: "Prepara la clase durante la semana y ten un plan para lo inesperado: un niño nuevo, un niño que llora o una actividad que terminó antes de tiempo.",
              },
              {
                tipo: "explica",
                apoyo: "Una clase planificada con oración deja tiempo para escuchar, para orar y para lo inesperado",
                clave: {
                  id: "pr-ninez-3-4-a5-2",
                  tipo: "corta",
                  pregunta: "¿Por qué una clase planificada con oración te ayuda en un domingo como este?",
                  ideas: [
                    { id: "tiempo", peso: 50, texto: "Porque deja tiempo para escuchar, para orar y para lo inesperado.", formas: ["deja tiempo", "tiempo para", "para escuchar", "para orar", "para lo inesperado"] },
                    { id: "improvisada", peso: 50, texto: "Porque una clase improvisada se nota, y una hora bien preparada vale más que tres improvisadas.", formas: ["improvisad*", "vale mas", "bien preparada", "se nota"] },
                  ],
                  errores: [
                    { id: "improvisar", texto: "Una clase improvisada se nota: una hora bien preparada vale más que tres improvisadas.", formas: ["improvisad* (es|son) mejor", "mejor improvis*"], anula: "improvisada" },
                  ],
                  modelo: "Porque una clase planificada con oración deja tiempo para escuchar, para orar y para lo inesperado. Una clase improvisada se nota, y una hora bien preparada vale más que tres improvisadas.",
                },
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
            caso: "Una ayudante de la clase de niños te dice: Es solo una clase de niños; no vale la pena prepararla tanto.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que preparar una clase para niños es servir a Cristo, de corazón.", bien: true, explica: "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres»: preparar una clase para niños es servir a Cristo." },
              { texto: "Que tiene razón: con los niños basta con improvisar un poco.", explica: "Una clase improvisada se nota: una hora bien preparada vale más que tres improvisadas." },
              { texto: "Que solo la prepare bien cuando el pastor venga a ver la clase.", explica: "Se hace de corazón, como para el Señor y no para los hombres." },
              { texto: "Que se la deje a otro maestro que tenga más tiempo libre que ella.", explica: "Preparar una clase para niños es servir a Cristo: se prepara durante la semana, con oración." },
            ],
            apoyo: "Preparar una clase para niños es servir a Cristo",
            ref: "Colosenses 3:23",
            explica: "Preparar una clase para niños es servir a Cristo de corazón, y una hora bien preparada vale más que tres improvisadas.",
          },
          {
            caso: "Un maestro nuevo de la clase de niños te dice: Ya tengo el horario listo; ¿cuándo debería orar por la clase?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Desde el principio: la preparación de la clase empieza en oración.", bien: true, explica: "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados»: la preparación de una clase empieza en oración." },
              { texto: "Al final, cuando ya tenga todo listo para el domingo por la mañana.", explica: "La preparación de una clase empieza en oración, no al final." },
              { texto: "Cuando le sobre tiempo, porque lo más importante es tener el horario.", explica: "El horario es una guía, no una ley; y la preparación empieza en oración." },
              { texto: "Solo si algo sale mal, para pedir ayuda en medio de la clase.", explica: "La oración no es solo para cuando algo sale mal: la preparación de una clase empieza en oración." },
            ],
            apoyo: "La preparación de una clase empieza en oración",
            ref: "Proverbios 16:3",
            explica: "La preparación de una clase empieza en oración, y una clase planificada con oración deja tiempo para escuchar, para orar y para lo inesperado.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Escribir el objetivo de una clase con lo que el niño sabrá, sentirá y hará",
            clave: {
              id: "pr-ninez-3-4-a7-1",
              tipo: "corta",
              pregunta: "Escribe el objetivo de una clase sobre Zaqueo con sus tres partes: lo que los niños sabrán, sentirán y harán.",
              ideas: [
                { id: "saber", peso: 34, texto: "Sabrán: que cuenten cómo Jesús llamó a Zaqueo por su nombre.", formas: ["(cuenten|cuente|contar|cuentan|narren|narrar) la", "(cuenten|cuente|contar|cuentan|narren|narrar) como", "(digan|diga|expliquen|explique) (como|quien)", "llam* por su nombre", "llamo a zaqueo", "historia de zaqueo"] },
                { id: "sentir", peso: 33, texto: "Sentirán: que se sepan amados y buscados por Jesús.", formas: ["amad*", "buscad*", "(sientan|sienta|sentiran) (amor|amados|que|gozo|alegria|buscados)", "los ama", "los busca", "(amor|ama) de (jesus|dios)"] },
                { id: "hacer", peso: 33, texto: "Harán: que esta semana saluden por su nombre a un compañero que está solo.", formas: ["salud*", "esta semana", "ayud*", "invit*", "(haran|hagan|haga) (algo|un|una)"] },
              ],
              modelo: "Sabrán: que los niños cuenten cómo Jesús llamó a Zaqueo por su nombre. Sentirán: que se sepan amados y buscados por Jesús. Harán: que esta semana saluden a un compañero que está solo.",
            },
          },
          {
            apoyo: "Una clase se planifica con un objetivo de tres partes, qué sabrán, qué sentirán y qué harán",
            clave: {
              id: "pr-ninez-3-4-a7-2",
              tipo: "corta",
              pregunta: "Una maestra escribió este objetivo: Que los niños aprendan la historia de Zaqueo. ¿Qué le falta, según la lección?",
              ideas: [
                { id: "sentir", peso: 50, texto: "Le falta qué sentirán: por ejemplo, que se sepan amados y buscados por Jesús.", formas: ["amad*", "buscad*", "sentir*", "sient*"] },
                { id: "hacer", peso: 50, texto: "Y le falta qué harán: algo concreto esta semana, como saludar a un compañero que está solo.", formas: ["esta semana", "salud*", "haran", "hacer", "hagan", "concret*"] },
              ],
              modelo: "Le faltan las tres partes del objetivo: qué sabrán, qué sentirán y qué harán. Por ejemplo, que se sepan amados y buscados por Jesús, y que esta semana saluden a un compañero que está solo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La disciplina con amor y firmeza
    "ninez-3-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué quita la blanda respuesta?", reverso: "La ira.", apoyo: "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor»" },
              { frente: "¿Qué hace un maestro que grita?", reverso: "Enciende todavía más el desorden.", apoyo: "Un maestro que grita enciende todavía más el desorden" },
              { frente: "¿Dónde empieza la disciplina?", reverso: "En el corazón del maestro.", apoyo: "La disciplina empieza en el corazón del maestro" },
              { frente: "¿Qué enseña también la manera de corregir?", reverso: "Quién es Dios.", apoyo: "La manera de corregir también enseña quién es Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Colosenses 3:21, ¿qué no deben hacer los padres con sus hijos?", reverso: "Exasperarlos, para que no se desalienten.", apoyo: "Pablo advierte a los padres: «no exasperéis a vuestros hijos, para que no se desalienten»" },
              { frente: "Según 1 Corintios 13:5, ¿qué no guarda el amor?", reverso: "Rencor.", apoyo: "«no se irrita, no guarda rencor»" },
              { frente: "¿Con qué va siempre junto la firmeza?", reverso: "Con el respeto y la protección.", apoyo: "La firmeza va siempre junto con el respeto y la protección" },
              { frente: "La semana siguiente, ¿qué pasa con el niño que se portó mal?", reverso: "Empieza de nuevo.", apoyo: "La semana siguiente, el niño que se portó mal empieza de nuevo" },
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
            consigna: "¿Cómo se unen estas ideas sobre la disciplina en la clase? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "disciplina", texto: "La disciplina", x: 18, y: 15 },
              { id: "corazon", texto: "El corazón del maestro", x: 18, y: 82 },
              { id: "amor", texto: "El amor", x: 50, y: 15 },
              { id: "clase", texto: "La clase", x: 50, y: 82 },
              { id: "firmeza", texto: "La firmeza", x: 82, y: 15 },
              { id: "respeto", texto: "El respeto y la protección", x: 82, y: 82 },
            ],
            enlaces: [
              { de: "disciplina", a: "corazon", relacion: "empieza en" },
              { de: "amor", a: "clase", relacion: "es la regla de" },
              { de: "firmeza", a: "respeto", relacion: "va siempre junto con" },
            ],
            distractores: ["reemplaza a", "se opone a"],
            apoyo: "La disciplina empieza en el corazón del maestro",
            explica: "La disciplina empieza en el corazón del maestro; el amor es la regla de la clase; y la firmeza va siempre junto con el respeto y la protección.",
          },
          {
            consigna: "¿Qué produce cada manera de responder? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "blanda", texto: "La blanda respuesta", x: 18, y: 15 },
              { id: "ira", texto: "La ira", x: 18, y: 82 },
              { id: "aspera", texto: "La palabra áspera", x: 50, y: 15 },
              { id: "furor", texto: "El furor", x: 50, y: 82 },
              { id: "grita", texto: "Un maestro que grita", x: 82, y: 15 },
              { id: "desorden", texto: "El desorden", x: 82, y: 82 },
            ],
            enlaces: [
              { de: "blanda", a: "ira", relacion: "quita" },
              { de: "aspera", a: "furor", relacion: "hace subir" },
              { de: "grita", a: "desorden", relacion: "enciende todavía más" },
            ],
            distractores: ["esconde", "deja igual"],
            apoyo: "Un maestro que grita enciende todavía más el desorden",
            ref: "Proverbios 15:1",
            explica: "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor». Y un maestro que grita enciende todavía más el desorden.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se previene el desorden en la clase, o no? Lleva cada frase a su grupo.",
            grupos: ["Así se previene el desorden", "Así no se previene"],
            frases: [
              { texto: "Pocas reglas, claras y dichas en positivo", grupo: 0 },
              { texto: "Rutinas que se repiten cada semana", grupo: 0 },
              { texto: "Una clase bien preparada y activa", grupo: 0 },
              { texto: "Notar y nombrar lo que los niños hacen bien", grupo: 0 },
              { texto: "Muchas reglas, confusas y dichas en negativo", grupo: 1 },
              { texto: "Cambiar cada semana el orden de la clase", grupo: 1 },
              { texto: "Una clase aburrida, sin nada que hacer", grupo: 1, explica: "La lección lo dice así: el aburrimiento trae desorden." },
              { texto: "Fijarse solo en lo que los niños hacen mal", grupo: 1 },
            ],
            apoyo: "Prevenir el desorden con reglas claras, rutinas y una clase activa",
            explica: "Se previene con pocas reglas claras y en positivo, rutinas que se repiten cada semana, una clase bien preparada y activa, y atención positiva: el aburrimiento trae desorden.",
          },
          {
            consigna: "¿Es una regla dicha en positivo, o no? Lleva cada frase a su grupo.",
            grupos: ["Dicha en positivo", "No está dicha en positivo"],
            frases: [
              { texto: "Escuchamos cuando otro habla", grupo: 0 },
              { texto: "Cuidamos los materiales", grupo: 0 },
              { texto: "Tratamos a todos con respeto", grupo: 0 },
              { texto: "No interrumpas al que habla", grupo: 1 },
              { texto: "No rompas los materiales", grupo: 1 },
              { texto: "Prohibido pelear en la clase", grupo: 1 },
            ],
            apoyo: "Pocas reglas, claras y dichas en positivo: escuchamos cuando otro habla, cuidamos los materiales y tratamos a todos con respeto",
            explica: "Las reglas de la clase son pocas, claras y dichas en positivo: escuchamos cuando otro habla, cuidamos los materiales y tratamos a todos con respeto.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Un niño interrumpe una y otra vez. Ordena lo que hace el maestro, del primer paso al último.",
            pasos: [
              "Se acerca con calma y le habla en voz baja",
              "Le recuerda la regla y le da una opción",
              "Si sigue, aplica una consecuencia breve que ya conoce",
              "Al final, habla con él a solas, a la vista de otros adultos",
              "Si el problema se repite, conversa con sus padres",
            ],
            apoyo: "Ante un niño que interrumpe, el maestro se acerca con calma, le recuerda la regla con una opción, le da una tarea, aplica una consecuencia breve que ya conoce, habla con él al final y, si hace falta, con sus padres",
            explica: "Primero se acerca con calma y le habla en voz baja; le recuerda la regla con una opción y le da una tarea; si sigue, aplica una consecuencia breve que ya conoce; al final habla con él a solas, a la vista de otros adultos; y si el problema se repite, conversa con sus padres.",
          },
          {
            consigna: "Ordena cómo responde la maestra a un niño que no deja de interrumpir, de lo primero a lo último.",
            pasos: [
              "Va hacia él tranquila y le habla bajito, sin humillarlo",
              "Le dice: puedes escuchar aquí o sentarte junto a mí",
              "Como sigue, el niño espera un turno del juego",
              "Al terminar la clase, le dice que lo aprecia, a la vista de otros adultos",
              "Como el problema se repite, conversa con sus padres",
            ],
            apoyo: "Al final, hablar con él a solas, pero a la vista de otros adultos, y decirle que lo aprecias",
            explica: "Primero se acerca con calma, sin humillarlo; le recuerda la regla con una opción; si sigue, aplica una consecuencia breve, como esperar un turno del juego; al final habla con él a solas, a la vista de otros adultos; y si se repite, conversa con sus padres.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Corregir a un niño sin humillarlo y saber qué nunca se hace",
            ref: "Proverbios 15:1",
            situacion: "Das la clase de los escolares. A mitad de la historia, Mateo interrumpe una y otra vez, y los demás se ríen.",
            escenas: [
              {
                id: "e1",
                narra: "Mateo vuelve a interrumpir mientras cuentas la historia.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Te acercas con calma y le hablas en voz baja.", valor: 2, explica: "Acercarse con calma y hablarle en voz baja, sin humillarlo delante de los demás: la blanda respuesta quita la ira.", siguiente: "e2" },
                  { texto: "Le gritas desde el frente para que se calle.", valor: 0, explica: "Nunca uses los gritos: un maestro que grita enciende todavía más el desorden.", siguiente: "e1b" },
                  { texto: "Le recuerdas la regla delante de toda la clase.", valor: 1, explica: "Recordarle la regla está bien, pero primero acércate con calma y háblale en voz baja, sin humillarlo delante de los demás.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Mateo se pone rojo, y algunos niños se burlan de él.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Calmas a la clase y le hablas a él en voz baja.", valor: 2, explica: "La blanda respuesta quita la ira: el maestro corrige sin humillar y sin desanimar.", siguiente: "e2" },
                  { texto: "Te unes a la risa, para que así aprenda su lección.", valor: 0, explica: "Nunca uses las burlas: la firmeza va siempre junto con el respeto.", siguiente: "e2" },
                  { texto: "Calmas a la clase y sigues.", valor: 1, explica: "Calmar a la clase ayuda, pero también te acercas a Mateo y le hablas en voz baja, sin humillarlo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya estás junto a Mateo.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Puedes escuchar aquí o sentarte junto a mí.", valor: 2, explica: "Recordarle la regla y darle una opción: puedes escuchar aquí o sentarte junto a mí." },
                  { texto: "Recuerda la regla: escuchamos cuando otro habla.", valor: 1, explica: "Recordarle la regla está bien; también se le da una opción: puedes escuchar aquí o sentarte junto a mí." },
                  { texto: "Si vuelves a hablar, te quedas solo en el pasillo.", valor: 0, explica: "Nunca dejes a un niño fuera de la vista de un adulto como castigo." },
                ],
              },
              {
                id: "e3",
                narra: "Termina la clase. Al final Mateo se portó mejor, aunque le costó.",
                pregunta: "¿Qué haces con él?",
                opciones: [
                  { texto: "A solas, pero a la vista de otros adultos, le dices que lo aprecias.", valor: 2, explica: "Al final, hablar con él a solas, pero a la vista de otros adultos, y decirle que lo aprecias." },
                  { texto: "Lo llevas a un salón vacío y cierras la puerta para hablarle a solas.", valor: 0, explica: "Se habla con él a solas, pero a la vista de otros adultos: la firmeza va siempre junto con el respeto y la protección." },
                  { texto: "Le dices delante de todos que lo aprecias.", valor: 1, explica: "Decirle que lo aprecias está bien, pero la lección pide hablar con él a solas, a la vista de otros adultos." },
                ],
              },
            ],
          },
          {
            apoyo: "Nunca usa el castigo físico, los gritos, las burlas ni el encierro, y no guarda rencor",
            ref: "1 Corintios 13:4-5",
            situacion: "Eres ayudante en la clase de los más pequeños. Daniel le quita los materiales a otro niño y lo empuja.",
            escenas: [
              {
                id: "e1",
                narra: "Daniel vuelve a quitarle los materiales a su compañero.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te acercas con calma y le recuerdas la regla.", valor: 2, explica: "Acercarse con calma y recordarle la regla: cuidamos los materiales y tratamos a todos con respeto.", siguiente: "e2" },
                  { texto: "Le das una palmada en la mano para que aprenda.", valor: 0, explica: "Nunca uses el castigo físico: la firmeza va siempre junto con el respeto y la protección.", siguiente: "e1b" },
                  { texto: "Le quitas los materiales y sigues con la clase.", valor: 1, explica: "Cuidar los materiales está bien, pero primero acércate con calma y recuérdale la regla.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Daniel se pone a llorar, y los demás niños se asustan.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Te calmas y le hablas en voz baja.", valor: 2, explica: "La blanda respuesta quita la ira: el maestro se acerca con calma y le habla en voz baja.", siguiente: "e2" },
                  { texto: "Lo mandas a esperar solo en el pasillo.", valor: 0, explica: "Nunca dejes a un niño fuera de la vista de un adulto como castigo.", siguiente: "e2" },
                  { texto: "Esperas a que se le pase.", valor: 1, explica: "Esperar con calma ayuda, pero el maestro se acerca y le habla en voz baja.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Daniel se queda quieto un momento, pero pronto vuelve a molestar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le das una tarea, como repartir los materiales.", valor: 2, explica: "Darle una tarea que lo ayude a participar, como repartir los materiales." },
                  { texto: "Le recuerdas otra vez la regla.", valor: 1, explica: "Recordar la regla ayuda, pero el paso siguiente es darle una tarea que lo ayude a participar." },
                  { texto: "Les dices a todos que es el niño más malo de la clase.", valor: 0, explica: "Nunca uses las burlas: el maestro corrige sin humillar y sin desanimar." },
                ],
              },
              {
                id: "e3",
                narra: "Aun con la tarea, Daniel vuelve a empujar a su compañero.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Aplicas una consecuencia breve que ya conoce.", valor: 2, explica: "Si sigue, aplicar una consecuencia breve que ya conoce, como esperar un turno del juego." },
                  { texto: "Lo encierras en otro salón hasta que se calme.", valor: 0, explica: "Nunca uses el encierro, ni dejes a un niño fuera de la vista de un adulto como castigo." },
                  { texto: "Lo dejas sin jugar durante todo el mes que viene.", valor: 0, explica: "La consecuencia es breve y ya la conoce, como esperar un turno del juego; y la semana siguiente el niño empieza de nuevo." },
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
            consigna: "Sobre lo que nunca se hace al corregir a un niño: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Con los niños de la clase nunca se usa el castigo físico.", verdad: true, explica: "Nunca uses el castigo físico, los gritos, las burlas ni el encierro.", apoyo: "Nunca uses el castigo físico, los gritos, las burlas ni el encierro" },
              { texto: "Como castigo, se puede dejar a un niño solo, fuera de la vista de los adultos.", verdad: false, explica: "Nunca dejes a un niño fuera de la vista de un adulto como castigo.", apoyo: "Nunca dejes a un niño fuera de la vista de un adulto como castigo" },
              { texto: "Si el problema se repite, el maestro conversa con los padres para entender qué le pasa al niño.", verdad: true, explica: "Si el problema se repite, se conversa con sus padres para entender qué le pasa.", apoyo: "Si el problema se repite, conversar con sus padres para entender qué le pasa" },
            ],
          },
          {
            consigna: "Sobre cómo se corrige a un niño en la clase: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para corregir a un niño, el maestro se acerca con calma y le habla en voz baja.", verdad: true, explica: "Se acerca con calma y le habla en voz baja, sin humillarlo delante de los demás.", apoyo: "Acercarse con calma y hablarle en voz baja, sin humillarlo delante de los demás" },
              { texto: "Una burla a tiempo ayuda a que el niño aprenda a portarse bien.", verdad: false, explica: "Nunca uses las burlas: el maestro corrige sin humillar ni desanimar.", apoyo: "Nunca uses el castigo físico, los gritos, las burlas ni el encierro" },
              { texto: "Al final, el maestro habla con el niño a escondidas, lejos de la vista de otros adultos.", verdad: false, explica: "Se habla con él a solas, pero a la vista de otros adultos.", apoyo: "Al final, hablar con él a solas, pero a la vista de otros adultos, y decirle que lo aprecias" },
              { texto: "La semana siguiente, el niño que se portó mal empieza de nuevo.", verdad: true, explica: "El amor «no se irrita, no guarda rencor»: la semana siguiente, el niño empieza de nuevo.", apoyo: "La semana siguiente, el niño que se portó mal empieza de nuevo" },
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
            apoyo: "Explicar la disciplina en la clase como amor y firmeza a la vez",
            ref: "1 Corintios 13:4-5",
            clave: {
              id: "pr-ninez-3-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la disciplina en la clase de niños es amor y firmeza a la vez?",
              ideas: [
                { id: "amor", peso: 50, texto: "Porque el amor es la regla de la clase: el maestro corrige con calma, sin desanimar y sin guardar rencor.", formas: ["regla de la clase", "con calma", "sin (desanimar|humillar|gritar|rencor|burlas)", "blanda respuesta", "no guarda rencor", "sin guardar rencor", "empieza de nuevo", "fruto del espiritu", "con paciencia"] },
                { id: "firmeza", peso: 50, texto: "Y porque es firme: pone reglas claras y aplica consecuencias breves, siempre con respeto y protección.", formas: ["reglas claras", "(recuerda|recordar|pone|poner) (la|las) (regla|reglas)", "consecuencia*", "con respeto", "respeto y proteccion", "respeto y la proteccion", "proteccion"] },
              ],
              modelo: "Porque el amor es la regla de la clase: el maestro corrige con calma, sin desanimar y sin guardar rencor. Y es firme: recuerda las reglas y aplica consecuencias breves, siempre con respeto y protección.",
            },
          },
          {
            apoyo: "Un maestro que grita enciende todavía más el desorden",
            ref: "Proverbios 15:1",
            clave: {
              id: "pr-ninez-3-5-a7-2",
              tipo: "corta",
              pregunta: "Un maestro dice: Si no grito, los niños no me respetan. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "blanda", peso: 50, texto: "Que la blanda respuesta quita la ira, y un maestro que grita enciende todavía más el desorden.", formas: ["blanda respuesta", "quita la ira", "enciende (todavia|mas)", "(enciende|aumenta|empeora|trae) el desorden", "mas desorden", "palabra aspera"] },
                { id: "corazon", peso: 50, texto: "Que la disciplina empieza en su corazón, con el fruto del Espíritu, y la firmeza va con el respeto.", formas: ["corazon del maestro", "su corazon", "fruto del espiritu", "con respeto", "el respeto", "paciencia", "mansedumbre", "con calma"] },
              ],
              errores: [
                { id: "gritar", texto: "Nunca uses los gritos: un maestro que grita enciende todavía más el desorden.", formas: ["hay que gritar", "(debe|debes|conviene|necesita) gritar", "(gritar|gritos) (ayuda|ayudan|sirve|sirven|funciona|funcionan)"], anula: "blanda" },
              ],
              modelo: "Le respondo que la blanda respuesta quita la ira, y que un maestro que grita enciende todavía más el desorden. La disciplina empieza en su corazón, con el fruto del Espíritu, y la firmeza va siempre con el respeto.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La vida y la semana del maestro
    "ninez-3-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué aprenden más los niños: de lo que ven o de lo que escuchan?", reverso: "De lo que ven en su maestro.", apoyo: "Los niños aprenden más de lo que ven en su maestro que de lo que escuchan" },
              { frente: "¿De qué maestro se acuerdan los niños?", reverso: "Del que los amó, los llamó por su nombre y vivió lo que enseñaba.", apoyo: "se acuerdan del maestro que los amó, los llamó por su nombre y vivió lo que enseñaba" },
              { frente: "¿Qué pudo decir Pablo a los corintios?", reverso: "«Sed imitadores de mí, así como yo de Cristo».", apoyo: "Pablo pudo decir: «Sed imitadores de mí, así como yo de Cristo»" },
              { frente: "¿Qué hace el maestro antes de enseñar una lección?", reverso: "La vive.", apoyo: "Antes de enseñar una lección, el maestro la vive" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le pidió Pablo a Tito?", reverso: "Ser ejemplo de buenas obras, con integridad y seriedad en la enseñanza.", apoyo: "pidió a Tito ser ejemplo de buenas obras, con integridad y seriedad" },
              { frente: "Según Hebreos 13:17, ¿cómo cuidan las almas los que las cuidan?", reverso: "Como quienes han de dar cuenta.", apoyo: "Los que cuidan almas lo hacen «como quienes han de dar cuenta»" },
              { frente: "¿Cómo enseña un maestro cansado?", reverso: "Peor.", apoyo: "Un maestro cansado enseña peor" },
              { frente: "Antes de servir, ¿qué debe pasar cada maestro?", reverso: "La selección y la capacitación de protección de menores.", apoyo: "Y que cada maestro pase por la selección y la capacitación de protección de menores antes de servir" },
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
            consigna: "Pablo pidió a los corintios que lo imitaran. ¿A quién imitaba él? Toca la palabra que lo dice.",
            texto: "Sed imitadores de mí, así como yo de [[Cristo]]",
            apoyo: "Los niños aprenden más de lo que ven en su maestro que de lo que escuchan",
            ref: "1 Corintios 11:1",
            explica: "Pablo pudo decir que lo imitaran como él imitaba a Cristo. Los niños aprenden más de lo que ven en su maestro que de lo que escuchan.",
          },
          {
            consigna: "¿Qué le pidió Pablo a Tito que mostrara en la enseñanza? Toca las palabras que lo dicen.",
            texto: "presentándote tú en todo como ejemplo de buenas obras; en la enseñanza mostrando [[integridad]], [[seriedad]]",
            apoyo: "La vida del maestro también enseña",
            ref: "Tito 2:7",
            explica: "Pablo le pidió a Tito ser en todo ejemplo de buenas obras y mostrar en la enseñanza integridad y seriedad: la vida del maestro también enseña.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un maestro de tu equipo te dice: Lo que importa es lo que enseño en la clase; mi vida fuera de la clase es asunto mío.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los niños aprenden más de lo que ven en su maestro que de lo que oyen.", bien: true, explica: "Los niños aprenden más de lo que ven en su maestro que de lo que escuchan: la vida del maestro también enseña." },
              { texto: "Que tiene razón, mientras enseñe la lección con fidelidad cada domingo.", explica: "La vida del maestro también enseña: antes de enseñar una lección, el maestro la vive." },
              { texto: "Que su vida solo importa cuando los padres de los niños lo están mirando.", explica: "Pablo le pidió a Tito ser en todo ejemplo de buenas obras, no solo cuando lo miran." },
              { texto: "Que basta con que los niños no se enteren de lo que hace fuera de la clase.", explica: "Los niños aprenden de lo que ven: Pablo pudo decir «Sed imitadores de mí, así como yo de Cristo»." },
            ],
            apoyo: "La vida del maestro también enseña",
            ref: "Tito 2:7",
            explica: "Los niños aprenden más de lo que ven en su maestro que de lo que escuchan: Pablo pidió a Tito ser en todo ejemplo de buenas obras.",
          },
          {
            caso: "Una maestra cansada te dice: Los niños se olvidan de todo lo que les enseño; no sé para qué me esfuerzo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que se acuerdan del maestro que los amó y vivió lo que enseñaba.", bien: true, explica: "Los niños se olvidan de muchas lecciones, pero se acuerdan del maestro que los amó, los llamó por su nombre y vivió lo que enseñaba." },
              { texto: "Que tiene razón: con los niños no vale la pena esforzarse tanto.", explica: "El maestro de niños cuida a los pequeños delante de Dios, y lo hace con alegría." },
              { texto: "Que les dé más tareas para la casa, para que no olviden nada nunca.", explica: "Los niños aprenden de lo que ven: se acuerdan del maestro que los amó y vivió lo que enseñaba." },
              { texto: "Que les repita cada lección hasta que la sepan toda de memoria.", explica: "Los niños se olvidan de muchas lecciones, pero se acuerdan del maestro que vivió lo que enseñaba." },
            ],
            apoyo: "Los niños se olvidan de muchas lecciones, pero se acuerdan del maestro que los amó, los llamó por su nombre y vivió lo que enseñaba",
            explica: "Los niños se olvidan de muchas lecciones, pero se acuerdan del maestro que los amó, los llamó por su nombre y vivió lo que enseñaba.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena la semana del maestro, desde el domingo de una clase hasta la clase siguiente.",
            eventos: [
              { texto: "Anota cómo salió la clase y ora por cada niño por su nombre", fecha: "El domingo" },
              { texto: "Lee el pasaje de la próxima clase y busca su verdad central", fecha: "El lunes o el martes" },
              { texto: "Prepara la historia, la actividad y los materiales", fecha: "A mitad de semana" },
              { texto: "Llega temprano, prepara el salón y ora con el equipo", fecha: "Antes de la clase" },
            ],
            apoyo: "Su semana tiene un ritmo: orar por cada niño, estudiar el pasaje a tiempo, preparar la clase, buscar a los que faltan, llegar temprano y aprender con el equipo",
            explica: "El domingo anota cómo salió la clase y ora por cada niño; el lunes o el martes lee el pasaje y busca su verdad central; a mitad de semana prepara la historia, la actividad y los materiales; y antes de la clase llega temprano y ora con el equipo.",
          },
          {
            consigna: "Ordena lo que hace la maestra desde que termina su clase del domingo hasta la clase siguiente.",
            eventos: [
              { texto: "Después de dar su clase, ora por cada niño por su nombre", fecha: "El domingo" },
              { texto: "Busca la verdad central del pasaje que va a enseñar", fecha: "El lunes o el martes" },
              { texto: "Tiene lista la historia y los materiales de la actividad", fecha: "A mitad de semana" },
              { texto: "Prepara el salón y ora con su equipo", fecha: "Antes de la clase" },
            ],
            apoyo: "El domingo: anotar cómo salió la clase y orar por cada niño por su nombre",
            explica: "Su semana tiene un ritmo: el domingo ora por cada niño; el lunes o el martes estudia el pasaje; a mitad de semana prepara la historia y los materiales; y antes de la clase prepara el salón y ora con el equipo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace el maestro durante la semana y una vez al mes.",
            texto: "Durante la semana, el maestro llama o escribe a los [[padres]] de un niño que [[faltó]], y una vez al [[mes]] se reúne con los demás maestros para aprender y evaluar.",
            distractores: ["vecinos", "llegó", "año"],
            errores: {
              vecinos: "Durante la semana se llama o se escribe a los padres de un niño que faltó.",
              "llegó": "El maestro busca a los que faltan: llama o escribe a los padres de un niño que faltó.",
              "año": "La reunión con los demás maestros es una vez al mes, para aprender y evaluar.",
            },
            apoyo: "Durante la semana: llamar o escribir a los padres de un niño que faltó",
            explica: "Durante la semana, el maestro llama o escribe a los padres de un niño que faltó; y una vez al mes se reúne con los demás maestros para aprender y evaluar.",
          },
          {
            consigna: "Completa lo que hace el maestro antes de la clase.",
            texto: "Antes de la clase, el maestro llega [[temprano]], prepara el [[salón]] y [[ora]] con el equipo.",
            distractores: ["tarde", "almuerzo", "discute"],
            errores: {
              tarde: "Antes de la clase, el maestro llega temprano.",
              almuerzo: "El maestro llega temprano y prepara el salón.",
              discute: "Antes de la clase, el maestro ora con el equipo.",
            },
            apoyo: "Antes de la clase: llegar temprano, preparar el salón y orar con el equipo",
            explica: "Antes de la clase, el maestro llega temprano, prepara el salón y ora con el equipo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El líder cuida a los maestros para que descansen y sirvan bien",
            ref: "Hebreos 13:17",
            situacion: "Eres el líder del ministerio de niños de tu iglesia. Tienes un equipo de seis maestros, y una de ellas sirve todos los domingos desde hace un año.",
            escenas: [
              {
                id: "e1",
                narra: "La maestra te dice que está cansada y que hace meses no puede estar en el culto de los adultos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Organizas turnos para que los maestros roten y descansen.", valor: 2, explica: "Cuida a tus maestros: que roten y descansen, que no sirvan todos los domingos sin parar y que puedan estar también en el culto de los adultos.", siguiente: "e2" },
                  { texto: "Le pides que siga igual, porque no hay quién la reemplace.", valor: 0, explica: "Un maestro cansado enseña peor: el líder cuida a los maestros para que descansen y sirvan bien.", siguiente: "e1b" },
                  { texto: "Le das un domingo libre, pero sin cambiar los turnos.", valor: 1, explica: "Un descanso ayuda, pero los maestros rotan para que no sirvan todos los domingos sin parar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al mes, la maestra llega tarde, sin preparar la clase y sin ánimo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Hablas con ella y organizas turnos para que descanse.", valor: 2, explica: "Un maestro cansado enseña peor: que roten y descansen.", siguiente: "e2" },
                  { texto: "La regañas delante del equipo por llegar tarde y sin preparar.", valor: 0, explica: "El líder cuida a los maestros para que descansen y sirvan bien.", siguiente: "e2" },
                  { texto: "Le das un domingo libre.", valor: 1, explica: "Un descanso ayuda, pero los maestros rotan para que no sirvan todos los domingos sin parar.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano que llegó hace poco a la iglesia quiere empezar a enseñar a los niños este domingo.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que antes pase por la selección y la capacitación de protección de menores.", valor: 2, explica: "Cada maestro pasa por la selección y la capacitación de protección de menores antes de servir." },
                  { texto: "Que empiece este domingo con un grupo de niños, mientras lo vas conociendo mejor.", valor: 0, explica: "Antes de servir, cada maestro pasa por la selección y la capacitación de protección de menores." },
                  { texto: "Que ayude este domingo solo con un grupo, y que se capacite más adelante.", valor: 0, explica: "La selección y la capacitación de protección de menores van antes de servir, no después." },
                ],
              },
              {
                id: "e3",
                narra: "Llega la reunión del mes con el equipo de maestros.",
                pregunta: "¿Para qué la usas?",
                opciones: [
                  { texto: "Para aprender juntos y evaluar las clases.", valor: 2, explica: "Una vez al mes: reunirse con los demás maestros para aprender y evaluar." },
                  { texto: "Solo para repartir los turnos del mes que viene.", valor: 1, explica: "Repartir los turnos ayuda a que descansen, pero la reunión del mes es para aprender y evaluar." },
                  { texto: "Para señalar delante de todos al maestro que peor enseña.", valor: 0, explica: "El líder cuida y forma a su equipo: la reunión es para aprender y evaluar juntos." },
                ],
              },
            ],
          },
          {
            apoyo: "Cuidar y formar al equipo de maestros",
            situacion: "Eres la líder del ministerio de niños, y vas a formar un equipo nuevo para la clase de los escolares.",
            escenas: [
              {
                id: "e1",
                narra: "Tres hermanos se ofrecen para ser maestros de los niños.",
                pregunta: "¿Qué haces antes de que empiecen a servir?",
                opciones: [
                  { texto: "Pasan por la selección y la capacitación de protección de menores.", valor: 2, explica: "Que cada maestro pase por la selección y la capacitación de protección de menores antes de servir.", siguiente: "e2" },
                  { texto: "Empiezan este domingo, y más adelante, si hay tiempo, los capacitas.", valor: 0, explica: "La selección y la capacitación de protección de menores van antes de servir.", siguiente: "e1b" },
                  { texto: "Los capacitas tú misma en una charla, sin pasar por la selección.", valor: 0, explica: "Cada maestro pasa por la selección y también por la capacitación de protección de menores.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un padre de familia te pregunta si los nuevos maestros ya pasaron por la selección.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Haces que primero pasen la selección y la capacitación.", valor: 2, explica: "Que cada maestro pase por la selección y la capacitación de protección de menores antes de servir.", siguiente: "e2" },
                  { texto: "Le dices que ya los conoces bien y que eso no hace falta.", valor: 0, explica: "Cada maestro pasa por la selección y la capacitación de protección de menores antes de servir, aunque lo conozcas.", siguiente: "e2" },
                  { texto: "Le dices que no se preocupe.", valor: 0, explica: "La selección y la capacitación de protección de menores van antes de servir.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya están sirviendo, y armas el calendario de los domingos.",
                pregunta: "¿Cómo lo organizas?",
                opciones: [
                  { texto: "Con turnos, para que roten, descansen y vayan al culto.", valor: 2, explica: "Que roten y descansen, que no sirvan todos los domingos sin parar y que puedan estar también en el culto de los adultos." },
                  { texto: "Todos sirven cada domingo, sin parar.", valor: 0, explica: "Un maestro cansado enseña peor: que no sirvan todos los domingos sin parar." },
                  { texto: "Con turnos, aunque nunca puedan ir al culto de los adultos.", valor: 1, explica: "Rotar ayuda, pero también conviene que puedan estar en el culto de los adultos." },
                ],
              },
              {
                id: "e3",
                narra: "Después de unos meses, quieres ayudarles a enseñar mejor.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te reúnes con ellos cada mes para aprender y evaluar.", valor: 2, explica: "Una vez al mes: reunirse con los demás maestros para aprender y evaluar." },
                  { texto: "Les mandas por mensaje una lista de errores, sin reunirte.", valor: 0, explica: "El líder forma a su equipo: una vez al mes se reúnen para aprender y evaluar." },
                  { texto: "Les das un libro y les pides que lo lean por su cuenta.", valor: 1, explica: "Leer ayuda, pero una vez al mes conviene reunirse con los demás maestros para aprender y evaluar." },
                ],
              },
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
            apoyo: "Cuida a tus maestros: que roten y descansen, que no sirvan todos los domingos sin parar y que puedan estar también en el culto de los adultos",
            clave: {
              id: "pr-ninez-3-6-a7-1",
              tipo: "corta",
              pregunta: "Eres líder del ministerio de niños. ¿Cómo vas a cuidar a tus maestros, según la lección?",
              ideas: [
                { id: "descanso", peso: 34, texto: "Que roten y descansen, y que no sirvan todos los domingos sin parar.", formas: ["rot*", "descans*", "turn*", "(domingos|dias) libre*", "sin parar"] },
                { id: "culto", peso: 33, texto: "Que puedan estar también en el culto de los adultos.", formas: ["culto de los adultos", "culto", "(ir|vayan|esten|estar) al culto"] },
                { id: "proteccion", peso: 33, texto: "Que cada maestro pase por la selección y la capacitación de protección de menores antes de servir.", formas: ["proteccion de menores", "seleccion", "capacit*", "proteccion"] },
              ],
              errores: [
                { id: "sin-descanso", texto: "Cuida a tus maestros: que roten y descansen.", formas: ["no hace falta que descansen", "no (necesitan|necesita) descans*", "ni (descansen|descanse)"], anula: "descanso" },
                { id: "sin-culto", texto: "Que puedan estar también en el culto de los adultos.", formas: ["ni que vayan al culto", "no (vayan|van|ir|esten|estar) al culto"], anula: "culto" },
                { id: "sin-proteccion", texto: "Cada maestro pasa por la selección y la capacitación de protección de menores antes de servir.", formas: ["(capacitacion|seleccion|proteccion) no es necesari*", "(capacitacion|seleccion|proteccion) no hace falta"], anula: "proteccion" },
              ],
              modelo: "Voy a organizar turnos para que roten y descansen, y para que puedan estar también en el culto de los adultos. Además, cada maestro pasará por la selección y la capacitación de protección de menores antes de servir.",
            },
          },
          {
            apoyo: "Y que cada maestro pase por la selección y la capacitación de protección de menores antes de servir",
            clave: {
              id: "pr-ninez-3-6-a7-2",
              tipo: "corta",
              pregunta: "Un hermano nuevo quiere empezar a servir este domingo, y una maestra sirve todos los domingos sin descanso. ¿Qué haces con cada uno, según la lección?",
              ideas: [
                { id: "proteccion", peso: 50, texto: "Al hermano nuevo, que primero pase por la selección y la capacitación de protección de menores.", formas: ["proteccion de menores", "seleccion", "capacit*", "proteccion"] },
                { id: "descanso", peso: 50, texto: "A la maestra, que rote y descanse: un maestro cansado enseña peor.", formas: ["rot*", "descans*", "turnos", "cansado", "ensena peor", "culto de los adultos"] },
              ],
              errores: [
                { id: "sin-seleccion", texto: "Cada maestro pasa por la selección y la capacitación de protección de menores antes de servir.", formas: ["(empiece|empieza|empezar|sirva|servir) este domingo", "que empiece ya", "(empiece|sirva) enseguida"], anula: "proteccion" },
              ],
              modelo: "Al hermano nuevo le pido que primero pase por la selección y la capacitación de protección de menores. A la maestra la pongo en turnos para que rote y descanse, porque un maestro cansado enseña peor.",
            },
          },
        ],
      },
    ],
  },
};
