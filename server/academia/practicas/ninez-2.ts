/**
 * Las prácticas de la materia `ninez-2` (especialidad Niñez): el niño y su fe. Hechas solo con lo que dice cada lección
 * (server/academia/contenido/ninez-2.ts), con la guía de docs/academia-practicas.md.
 *
 * Las preguntas difíciles (lección 4) se practican con la misma atribución de la lección: la edad de la responsabilidad
 * es lo que enseñan muchas iglesias evangélicas, la esperanza en las palabras de David es lo que ven muchos, y ninguna
 * actividad dice qué pasa con los niños que mueren pequeños: solo que la Biblia no da una edad exacta ni lo explica todo,
 * y que ante el duelo se consuela con la misericordia de Dios, sin especular. La edad para bautizar sigue la práctica de
 * cada iglesia: ninguna actividad da una edad, y esperar a la adolescencia nunca va como error. La lección deja por
 * confirmar si hablar en lenguas es la señal inicial del bautismo en el Espíritu: ninguna actividad pregunta por las
 * lenguas, y el objetivo 3 de esa lección se practica solo con Joel 2:28, Hechos 2:39 y la nota para el líder.
 * En la lección 6, si un niño cuenta un abuso, las buenas opciones son las de la lección (creerle, agradecerle, no
 * prometerle el secreto, no investigar y avisar de inmediato al responsable del ministerio y a las autoridades); la
 * lección no da un plazo en horas, así que ninguna actividad lo pide, y los casos no traen detalles.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_NINEZ_2: PracticasMateria = {
  materia: "ninez-2",
  mision: {
    titulo: "Un lugar seguro para la fe de cada niño",
    intro:
      "Tu iglesia te pidió acompañar la fe de los niños del ministerio infantil, desde los más pequeños hasta los preadolescentes. Te harán preguntas los niños y también sus padres: cómo piensa cada edad, cómo se habla de Dios a un niño, cómo guiarlo a Cristo sin presión, cuándo se bautiza un niño que cree, cómo enseñarle a orar y a servir, y qué hacer con el niño que sufre. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes acompañar la fe de un niño: hablarle según su edad y con palabras claras, guiarlo a Cristo con calma y sin presión, responder las preguntas difíciles con la Biblia y con respeto, enseñarle a orar, adorar y servir, y ser un adulto seguro para el niño que sufre. Un niño no es un adulto pequeño ni un espectador: es parte de la iglesia.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Cómo crece la fe
    "ninez-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice Lucas 2:40 de Jesús cuando era niño?", reverso: "Que «el niño crecía y se fortalecía, y se llenaba de sabiduría».", apoyo: "Jesús mismo pasó por la niñez" },
              { frente: "¿Cómo aprende un niño de 2 a 5 años?", reverso: "Con los sentidos: imita y confía, y piensa de forma literal.", apoyo: "De 2 a 5 años: aprende con los sentidos, imita y confía, y piensa de forma literal" },
              { frente: "¿Qué le gusta a un niño de 6 a 9 años?", reverso: "Las reglas, los héroes y las historias; y pregunta por qué.", apoyo: "De 6 a 9 años: piensa en lo concreto, le gustan las reglas, los héroes y las historias, y pregunta por qué" },
              { frente: "¿Qué empieza a hacer un niño de 10 a 12 años?", reverso: "A pensar con ideas; pregunta, a veces duda y busca su lugar en el grupo.", apoyo: "De 10 a 12 años: empieza a pensar con ideas, pregunta y a veces duda, y busca su lugar en el grupo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Es un niño un adulto pequeño?", reverso: "No: piensa como niño, y así hay que hablarle.", apoyo: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle" },
              { frente: "Según estudios como los de Piaget, ¿cómo piensa el niño en cada etapa?", reverso: "El pequeño, de forma literal; el escolar, en lo concreto; el preadolescente, con ideas.", apoyo: "el niño pequeño piensa de forma literal, el escolar en lo concreto y el preadolescente empieza a razonar con ideas" },
              { frente: "¿A qué ritmo crece cada niño, según la lección?", reverso: "A su propio ritmo: las etapas son solo guías generales.", apoyo: "Son guías generales: cada niño crece a su ritmo" },
              { frente: "Según la imagen de Pedro, ¿qué se le da a cada edad?", reverso: "El alimento que puede recibir, como la leche al bebé.", apoyo: "A cada edad se le da el alimento que puede recibir" },
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
            consigna: "¿De qué etapa es cada rasgo del niño? Lleva cada frase a su grupo.",
            grupos: ["De 2 a 5 años", "De 6 a 9 años", "De 10 a 12 años"],
            frases: [
              { texto: "Aprende con los sentidos", grupo: 0 },
              { texto: "Imita y confía", grupo: 0 },
              { texto: "Piensa de forma literal", grupo: 0 },
              { texto: "Piensa en lo concreto", grupo: 1 },
              { texto: "Le gustan las reglas, los héroes y las historias", grupo: 1 },
              { texto: "Empieza a pensar con ideas", grupo: 2 },
              { texto: "Pregunta y a veces duda", grupo: 2 },
              { texto: "Busca su lugar en el grupo", grupo: 2 },
            ],
            apoyo: "de 2 a 5 años aprende con los sentidos, imita y confía; de 6 a 9 piensa en lo concreto y pregunta por qué; de 10 a 12 empieza a razonar con ideas, pregunta y duda",
            ref: "1 Corintios 13:11",
            explica: "De 2 a 5 años el niño aprende con los sentidos, imita, confía y piensa de forma literal; de 6 a 9 piensa en lo concreto y le gustan las reglas, los héroes y las historias; de 10 a 12 empieza a pensar con ideas, a veces duda y busca su lugar en el grupo.",
          },
          {
            consigna: "¿En qué etapa está el niño que se describe? Lleva cada frase a su grupo.",
            grupos: ["De 2 a 5 años", "De 6 a 9 años", "De 10 a 12 años"],
            frases: [
              { texto: "Copia lo que ve hacer a los adultos", grupo: 0 },
              { texto: "Entiende las palabras al pie de la letra", grupo: 0 },
              { texto: "Aprende tocando, mirando y oyendo", grupo: 0 },
              { texto: "Le encantan las historias de héroes", grupo: 1 },
              { texto: "Quiere saber cuáles son las reglas", grupo: 1 },
              { texto: "Empieza a razonar con ideas", grupo: 2 },
              { texto: "Quiere tener su lugar entre los del grupo", grupo: 2 },
              { texto: "Tiene dudas y las pregunta", grupo: 2 },
            ],
            apoyo: "Los estudios del desarrollo, como los de Jean Piaget, describen estos cambios",
            ref: "1 Corintios 13:11",
            explica: "El niño pequeño aprende con los sentidos, imita y piensa de forma literal; el de 6 a 9 años piensa en lo concreto y le gustan las reglas y los héroes; el de 10 a 12 empieza a razonar con ideas, pregunta, duda y busca su lugar en el grupo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada etapa con lo que la lección dice que necesita o que ya puede entender.",
            pares: [
              ["De 2 a 5 años", "Amor, rutinas y verdades sencillas"],
              ["De 6 a 9 años", "Puede entender el evangelio con palabras sencillas"],
              ["De 10 a 12 años", "Respuestas honestas y adultos que vivan lo que enseñan"],
            ],
            apoyo: "Necesita amor, rutinas y verdades sencillas: Dios me ama, Dios hizo todo, Jesús es mi amigo",
            ref: "1 Pedro 2:2",
            explica: "De 2 a 5 años el niño necesita amor, rutinas y verdades sencillas; de 6 a 9 puede entender el evangelio con palabras sencillas; y de 10 a 12 necesita respuestas honestas y adultos que vivan lo que enseñan.",
          },
          {
            consigna: "Une cada niño con lo que más necesita según su etapa.",
            pares: [
              ["Un niño que aprende con los sentidos y confía", "Verdades sencillas: Dios me ama, Dios hizo todo"],
              ["Un niño al que le gustan los héroes y las historias", "El evangelio dicho con palabras sencillas"],
              ["Un preadolescente que pregunta y a veces duda", "Respuestas honestas de adultos que viven lo que enseñan"],
            ],
            apoyo: "Necesita respuestas honestas y adultos que vivan lo que enseñan",
            ref: "1 Pedro 2:2",
            explica: "Al niño pequeño se le dan verdades sencillas, como Dios me ama y Dios hizo todo; el de 6 a 9 años puede entender el evangelio con palabras sencillas; y el preadolescente que duda necesita respuestas honestas y adultos que vivan lo que enseñan.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la imagen que usa Pedro para hablar del crecimiento.",
            texto: "Pedro usa la imagen del [[bebé]] que desea la [[leche]]: a cada edad se le da el [[alimento]] que puede recibir.",
            distractores: ["soldado", "carne", "castigo"],
            errores: {
              soldado: "Pedro usa la imagen del bebé, como niños recién nacidos.",
              carne: "El bebé desea la leche: «desead, como niños recién nacidos, la leche espiritual no adulterada».",
              castigo: "A cada edad se le da el alimento que puede recibir.",
            },
            apoyo: "Pedro usa la imagen del bebé que desea la leche",
            ref: "1 Pedro 2:2",
            explica: "Pedro usa la imagen del bebé que desea la leche espiritual para crecer: así, a cada edad se le da el alimento que puede recibir.",
          },
          {
            consigna: "Completa lo que necesita un niño de 2 a 5 años.",
            texto: "De 2 a 5 años, el niño necesita amor, [[rutinas]] y verdades [[sencillas]]: Dios me ama, Dios hizo todo, Jesús es mi [[amigo]].",
            distractores: ["castigos", "difíciles", "jefe"],
            errores: {
              castigos: "El niño pequeño necesita amor, rutinas y verdades sencillas.",
              "difíciles": "A esa edad se le dan verdades sencillas.",
              jefe: "Una de las verdades sencillas para esa edad es: Jesús es mi amigo.",
            },
            apoyo: "Necesita amor, rutinas y verdades sencillas: Dios me ama, Dios hizo todo, Jesús es mi amigo",
            ref: "1 Pedro 2:2",
            explica: "De 2 a 5 años el niño aprende con los sentidos y confía, y necesita amor, rutinas y verdades sencillas: Dios me ama, Dios hizo todo, Jesús es mi amigo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una maestra de la clase de niños te dice: Tengo niños de 4 y de 11 años en el mismo grupo, y les doy a todos la misma clase.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que los agrupe por edades cercanas y adapte la clase a su etapa.", bien: true, explica: "Es lo que enseña la lección: agrupar a los niños por edades cercanas y adaptar cada clase a su etapa." },
              { texto: "Que siga así: una misma verdad se enseña igual a todas las edades.", explica: "Una misma verdad se enseña de distinta manera a un niño de cuatro años y a uno de once." },
              { texto: "Que les hable a todos como a adultos pequeños, para que maduren.", explica: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle." },
              { texto: "Que enseñe solo a los mayores, y que los pequeños jueguen aparte.", explica: "Cada etapa tiene su lugar: a cada edad se le da el alimento que puede recibir." },
            ],
            apoyo: "Agrupa a los niños por edades cercanas y adapta cada clase a su etapa",
            explica: "Un niño de cuatro años y uno de once entienden cosas muy distintas: por eso se agrupa a los niños por edades cercanas y se adapta cada clase a su etapa.",
          },
          {
            caso: "Un maestro nuevo te dice: Voy a contar la misma historia bíblica a los de 4 años y a los de 11, con las mismas palabras.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la cuente de distinta manera a cada edad, porque entienden distinto.", bien: true, explica: "Un niño de cuatro años y uno de once pueden escuchar la misma historia bíblica y entender cosas muy distintas." },
              { texto: "Que está bien, porque todos los niños entienden igual la misma historia bíblica.", explica: "Conocer cómo piensa cada edad ayuda a enseñarle bien: cada edad entiende distinto." },
              { texto: "Que use con los de 4 años las ideas más difíciles, para que crezcan más rápido.", explica: "El niño pequeño necesita verdades sencillas: a cada edad se le da el alimento que puede recibir." },
              { texto: "Que les hable como a adultos pequeños, porque así aprenden a pensar como grandes.", explica: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle." },
            ],
            apoyo: "Una misma verdad se enseña de distinta manera a un niño de cuatro años y a uno de once",
            explica: "Una misma verdad se enseña de distinta manera a un niño de cuatro años y a uno de once: el pequeño piensa de forma literal, y el preadolescente empieza a razonar con ideas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un niño de cuatro años y uno de once pueden escuchar la misma historia bíblica y entender cosas muy distintas",
            ref: "1 Corintios 13:11",
            clave: {
              id: "pr-ninez-2-1-a6-1",
              tipo: "corta",
              pregunta: "Un niño de cuatro años y uno de once oyen la misma historia bíblica. ¿Por qué la entienden distinto, y qué hace el maestro?",
              ideas: [
                { id: "piensan", peso: 50, texto: "Cada edad piensa distinto: el pequeño piensa de forma literal y el de once empieza a razonar con ideas.", formas: ["literal*", "al pie de la letra", "razon* con ideas", "pens* con ideas", "piensa* con ideas", "en lo concreto", "concret*", "piensa* (distinto|diferente)", "(entienden|aprenden) (distinto|diferente)", "cada edad piensa", "como piensa cada edad", "con los sentidos"] },
                { id: "adapta", peso: 50, texto: "El maestro adapta la enseñanza a cada edad: agrupa por edades cercanas y da a cada edad el alimento que puede recibir.", formas: ["adap*", "agrup*", "edades cercanas", "(segun|a) (su|cada) (edad|etapa)", "alimento que puede", "de distinta manera", "de otra manera", "de manera distinta", "de forma distinta"] },
              ],
              errores: [
                { id: "adultos", texto: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle.", formas: ["como adultos pequenos", "como (un|a) adulto pequeno", "igual a (todos|todas)"], anula: "adapta" },
              ],
              modelo: "Porque cada edad piensa distinto: el de cuatro años piensa de forma literal y el de once empieza a razonar con ideas. Por eso el maestro agrupa a los niños por edades cercanas y adapta la clase a su etapa.",
            },
          },
          {
            apoyo: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle",
            ref: "1 Corintios 13:11",
            clave: {
              id: "pr-ninez-2-1-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que a los niños hay que enseñarles como a adultos pequeños. ¿Qué le respondes según la lección?",
              ideas: [
                { id: "nino", peso: 50, texto: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle.", formas: ["no es un adulto", "no son adultos", "piensa* como (nino|ninos)", "habl* como (nino|ninos)", "como (un|una) (nino|nina)", "piensa como nino"] },
                { id: "edad", peso: 50, texto: "Hay que adaptar la enseñanza a su edad: a cada edad se le da el alimento que puede recibir.", formas: ["adap*", "(segun|a) (su|cada) (edad|etapa)", "alimento que puede", "edades cercanas", "agrup*", "de distinta manera", "de manera distinta", "cada edad"] },
              ],
              errores: [
                { id: "razon", texto: "Un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle.", formas: ["tiene razon", "(ensenarles|hablarles|tratarlos|ensenar) como adultos"], anula: "nino" },
              ],
              modelo: "Le respondo que un niño no es un adulto pequeño: piensa como niño, y así hay que hablarle. Por eso adapto la enseñanza a su edad y le doy a cada edad el alimento que puede recibir.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Hablar de Dios a cada edad
    "ninez-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Deuteronomio 6:20, ¿qué espera la Biblia de los hijos?", reverso: "Que pregunten: «Mañana cuando te preguntare tu hijo».", apoyo: "La Biblia espera que los hijos pregunten" },
              { frente: "En Israel, ¿con qué empezaba la respuesta al hijo que preguntaba?", reverso: "Con una historia de lo que Dios hizo: los sacó de Egipto.", apoyo: "Y la respuesta empezaba con una historia" },
              { frente: "Según Marcos 4:33, ¿cómo enseñaba Jesús?", reverso: "Con historias, «conforme a lo que podían oír».", apoyo: "Jesús enseñaba con historias, «conforme a lo que podían oír»" },
              { frente: "¿Qué les dio Pablo a los que recién empezaban?", reverso: "«leche, y no vianda»: primero lo sencillo y lo claro.", apoyo: "Pablo dio a los que recién empezaban «leche, y no vianda»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué son las preguntas de un niño, según la lección?", reverso: "Una puerta abierta para enseñar.", apoyo: "Las preguntas de un niño son una puerta abierta para enseñar" },
              { frente: "¿Con qué palabras claras se le explica a un niño el pecado?", reverso: "Es desobedecer a Dios; todos lo hacemos, y nos separa de él.", apoyo: "El pecado: es desobedecer a Dios; todos lo hacemos, y nos separa de él" },
              { frente: "¿Qué hace el buen maestro con sus palabras?", reverso: "Las adapta a quien lo escucha.", apoyo: "El buen maestro adapta sus palabras a quien lo escucha" },
              { frente: "¿Qué se le dice a un niño de Dios, aunque no lo vemos?", reverso: "Que es real: creó todo, nos ama y siempre está con nosotros.", apoyo: "Dios: es el creador de todo, nos ama y siempre está con nosotros; no lo vemos, pero es real" },
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
            consigna: "Une cada verdad con las palabras claras que da la lección para un niño.",
            pares: [
              ["Dios", "El creador de todo, que nos ama y siempre está con nosotros"],
              ["El pecado", "Desobedecer a Dios, algo que nos separa de él"],
              ["Jesús", "El Hijo de Dios, que murió en la cruz y resucitó"],
              ["La salvación", "Confiar en Jesús, pedirle perdón y seguirlo"],
              ["El cielo", "Estar para siempre con Dios"],
            ],
            apoyo: "El maestro explica a Dios, el pecado, a Jesús, la salvación y el cielo con palabras claras",
            ref: "Marcos 4:33",
            explica: "Dios es el creador de todo, nos ama y siempre está con nosotros; el pecado es desobedecer a Dios; Jesús es el Hijo de Dios, que murió en la cruz y resucitó; la salvación es confiar en Jesús, pedirle perdón y seguirlo; y el cielo es estar para siempre con Dios.",
          },
          {
            consigna: "¿De qué verdad habla cada frase para niños? Une cada frase con su verdad.",
            pares: [
              ["No lo vemos, pero es real", "Dios"],
              ["Todos lo hacemos, y nos separa de Dios", "El pecado"],
              ["Murió por nuestros pecados y resucitó", "Jesús"],
              ["Nos hace hijos de Dios cuando confiamos en Jesús", "La salvación"],
              ["La Biblia no lo cuenta todo", "El cielo"],
            ],
            apoyo: "La salvación: es confiar en Jesús, pedirle perdón y seguirlo; él nos hace hijos de Dios",
            ref: "1 Corintios 3:1-2",
            explica: "A Dios no lo vemos, pero es real; el pecado lo hacemos todos y nos separa de Dios; Jesús murió por nuestros pecados y resucitó; en la salvación, Jesús nos hace hijos de Dios; y del cielo, la Biblia no lo cuenta todo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases para explicar la fe a un niño tiene un error. Tócala.",
            frases: [
              "Dios es el creador de todo, y siempre está con nosotros.",
              "El pecado es desobedecer a Dios, y nos separa de él.",
              "Jesús murió en la cruz por nuestros pecados, y se quedó en la tumba.",
              "La salvación es confiar en Jesús, pedirle perdón y seguirlo.",
            ],
            malo: 2,
            correccion: "Jesús es el Hijo de Dios, murió en la cruz por nuestros pecados y resucitó.",
            apoyo: "Jesús: es el Hijo de Dios, murió en la cruz por nuestros pecados y resucitó",
            explica: "Las palabras claras sobre Jesús dicen que es el Hijo de Dios, que murió en la cruz por nuestros pecados y que resucitó: no se quedó en la tumba.",
          },
          {
            consigna: "Una de estas frases sobre cómo explicar la fe a un niño tiene un error. Tócala.",
            frases: [
              "A Dios no lo vemos, pero es real.",
              "Todos pecamos: el pecado es desobedecer a Dios.",
              "La Biblia cuenta todo sobre el cielo, y nunca hay que decir no sé.",
              "Jesús nos hace hijos de Dios cuando confiamos en él.",
            ],
            malo: 2,
            correccion: "El cielo es estar para siempre con Dios; la Biblia no lo cuenta todo, y está bien decir no sé.",
            apoyo: "El cielo: es estar para siempre con Dios; la Biblia no lo cuenta todo, y está bien decir no sé",
            explica: "Sobre el cielo, la Biblia no lo cuenta todo: el maestro responde con honestidad, aun diciendo no sé.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo responder las preguntas de los niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando no sabes una respuesta, puedes decirlo y buscar juntos en la Biblia.", verdad: true, explica: "Cuando no sepas una respuesta, dilo con honestidad y busquen juntos en la Biblia.", apoyo: "Cuando no sepas una respuesta, dilo con honestidad y busquen juntos en la Biblia" },
              { texto: "Si no sabes la respuesta, es mejor inventar una para no quedar mal.", verdad: false, explica: "El maestro responde con honestidad, aun diciendo no sé.", apoyo: "responde con honestidad, aun diciendo no sé" },
              { texto: "Si la pregunta nace de un dolor, se escucha primero y se responde con ternura.", verdad: true, explica: "Si la pregunta nace de un dolor, como la muerte de alguien, el maestro escucha primero y responde con ternura.", apoyo: "Y si la pregunta nace de un dolor, como la muerte de alguien, escucha primero y responde con ternura" },
            ],
          },
          {
            consigna: "Sobre las preguntas de los niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las preguntas de un niño son una puerta abierta para enseñar.", verdad: true, explica: "Los niños preguntan mucho, y sus preguntas son una puerta para enseñar.", apoyo: "Las preguntas de un niño son una puerta abierta para enseñar" },
              { texto: "La Biblia no espera que los hijos pregunten por lo que Dios hizo.", verdad: false, explica: "La Biblia espera que los hijos pregunten: «Mañana cuando te preguntare tu hijo».", apoyo: "La Biblia espera que los hijos pregunten", ref: "Deuteronomio 6:20-21" },
              { texto: "Si un niño pregunta por la muerte de alguien, conviene responder rápido y seguir la clase.", verdad: false, explica: "Si la pregunta nace de un dolor, como la muerte de alguien, se escucha primero y se responde con ternura.", apoyo: "escucha primero y responde con ternura" },
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
            caso: "Un niño de tu clase te dice: Maestro, ¿los perros van al cielo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no lo sabes, y que pueden buscar juntos lo que dice la Biblia.", bien: true, explica: "Sobre el cielo, la Biblia no lo cuenta todo, y está bien decir no sé: cuando no sepas una respuesta, dilo con honestidad y busquen juntos en la Biblia." },
              { texto: "Que sí, que todos los perros van al cielo, para que se ponga contento.", explica: "No se inventan respuestas: el maestro responde con honestidad, aun diciendo no sé." },
              { texto: "Que esa pregunta no es importante, y que mejor preste atención.", explica: "Las preguntas de un niño son una puerta abierta para enseñar." },
              { texto: "Que no, y que no vuelva a preguntar cosas que no están en la clase.", explica: "Sus preguntas son una puerta para enseñar; y si no sabes la respuesta, se dice con honestidad." },
            ],
            apoyo: "El cielo: es estar para siempre con Dios; la Biblia no lo cuenta todo, y está bien decir no sé",
            explica: "Los niños preguntan mucho, también si los perros van al cielo. La Biblia no lo cuenta todo, y está bien decir no sé: el maestro responde con honestidad y busca con el niño en la Biblia.",
          },
          {
            caso: "Una niña de 7 años te dice: Mi abuelo murió ayer. ¿Por qué Dios dejó que se muriera?",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "La escuchas primero y le respondes con ternura, sin inventar nada.", bien: true, explica: "Si la pregunta nace de un dolor, como la muerte de alguien, se escucha primero y se responde con ternura; y lo que no sabes, lo dices con honestidad." },
              { texto: "Le das rápido una explicación cualquiera y sigues con la clase de hoy.", explica: "Ante una pregunta que nace de un dolor, primero se escucha y se responde con ternura." },
              { texto: "Le dices que ya no piense en eso, y que mejor se vaya a jugar un rato.", explica: "Sus preguntas son una puerta para enseñar: se escucha primero y se responde con ternura." },
              { texto: "Le das una respuesta segura que inventas, aunque no la sepas de verdad.", explica: "Cuando no sepas una respuesta, dilo con honestidad y busquen juntos en la Biblia." },
            ],
            apoyo: "Y si la pregunta nace de un dolor, como la muerte de alguien, escucha primero y responde con ternura",
            explica: "La pregunta de la niña nace de un dolor: se escucha primero, se responde con ternura y, si no sabes la respuesta, se dice con honestidad.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué una imagen puede confundir a un niño pequeño.",
            texto: "Pedirle a Jesús que entre en el [[corazón]] puede confundir a un niño pequeño que piensa de forma [[literal]]: puede imaginar a Jesús dentro de su [[pecho]].",
            distractores: ["templo", "alegre", "cuarto"],
            errores: {
              templo: "La imagen simbólica de la lección es pedirle a Jesús que entre en el corazón.",
              alegre: "El niño pequeño piensa de forma literal: por eso la imagen lo puede confundir.",
              cuarto: "Un niño que piensa de forma literal puede imaginar a Jesús dentro de su pecho.",
            },
            apoyo: "Las imágenes muy simbólicas, como pedirle a Jesús que entre en el corazón, pueden confundir a un niño pequeño que piensa de forma literal",
            explica: "Las imágenes muy simbólicas pueden confundir a un niño pequeño que piensa de forma literal: puede imaginar a Jesús dentro de su pecho. Por eso se explican, o se usan palabras claras.",
          },
          {
            consigna: "Completa qué hacer con las imágenes que confunden a un niño.",
            texto: "Explica las imágenes simbólicas, o usa palabras [[claras]]: confiar en Jesús, pedirle [[perdón]] y [[seguirlo]].",
            distractores: ["difíciles", "dinero", "olvidarlo"],
            errores: {
              "difíciles": "Con un niño pequeño se usan palabras claras.",
              dinero: "Las palabras claras son confiar en Jesús, pedirle perdón y seguirlo.",
              olvidarlo: "Las palabras claras dicen confiar en Jesús, pedirle perdón y seguirlo.",
            },
            apoyo: "Explícalas, o usa palabras claras: confiar en Jesús, pedirle perdón y seguirlo",
            explica: "Las imágenes muy simbólicas se explican, o se cambian por palabras claras: confiar en Jesús, pedirle perdón y seguirlo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "puede imaginar a Jesús dentro de su pecho",
            clave: {
              id: "pr-ninez-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la frase pedirle a Jesús que entre en el corazón puede confundir a un niño pequeño, y qué puedes hacer?",
              ideas: [
                { id: "literal", peso: 50, texto: "Porque el niño pequeño piensa de forma literal: puede imaginar a Jesús dentro de su pecho.", formas: ["literal*", "al pie de la letra", "dentro de su pecho", "en su pecho", "dentro del cuerpo", "dentro de su cuerpo", "pecho", "simbolic*"] },
                { id: "claras", peso: 50, texto: "Explicar la imagen o usar palabras claras: confiar en Jesús, pedirle perdón y seguirlo.", formas: ["palabras claras", "palabras sencillas", "explic* (la|esa) imagen", "explicarla", "explicarsela", "explicandola", "confiar en jesus", "confie en jesus", "pedirle perdon", "pida perdon", "seguirlo", "lo siga"] },
              ],
              modelo: "Porque un niño pequeño piensa de forma literal y puede imaginar a Jesús dentro de su pecho. Puedo explicarle la imagen o usar palabras claras: confiar en Jesús, pedirle perdón y seguirlo.",
            },
          },
          {
            apoyo: "Explícalas, o usa palabras claras: confiar en Jesús, pedirle perdón y seguirlo",
            clave: {
              id: "pr-ninez-2-2-a7-2",
              tipo: "corta",
              pregunta: "Un ayudante de la clase de los más pequeños les dice: Pídanle a Jesús que entre en su corazón. ¿Qué le aconsejas, y por qué?",
              ideas: [
                { id: "claras", peso: 50, texto: "Que explique la imagen o use palabras claras: confiar en Jesús, pedirle perdón y seguirlo.", formas: ["palabras claras", "palabras sencillas", "explic* (la|esa) imagen", "explicarla", "explicarsela", "explicandola", "confiar en jesus", "confien en jesus", "pedirle perdon", "pidan perdon", "seguirlo", "lo sigan"] },
                { id: "literal", peso: 50, texto: "Porque un niño pequeño piensa de forma literal y puede imaginar a Jesús dentro de su pecho.", formas: ["literal*", "al pie de la letra", "dentro de su pecho", "en su pecho", "dentro del cuerpo", "dentro de su cuerpo", "pecho", "simbolic*"] },
              ],
              modelo: "Le aconsejo usar palabras claras, como confiar en Jesús, pedirle perdón y seguirlo, o explicar la imagen. Porque un niño pequeño piensa de forma literal y puede imaginar a Jesús dentro de su pecho.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Guiar a un niño a Cristo
    "ninez-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empieza el evangelio, según la lección?", reverso: "Con el amor de Dios (Juan 3:16).", apoyo: "El evangelio empieza con el amor de Dios" },
              { frente: "¿A quiénes incluye el «todo aquel» de Juan 3:16?", reverso: "También a los niños.", apoyo: "Y «todo aquel» incluye a los niños" },
              { frente: "¿Por qué todos necesitamos a Jesús?", reverso: "Porque «todos pecaron, y están destituidos de la gloria de Dios».", apoyo: "Todos necesitamos a Jesús, «por cuanto todos pecaron, y están destituidos de la gloria de Dios»" },
              { frente: "Según Romanos 6:23, ¿qué es la salvación?", reverso: "Un regalo: «la dádiva de Dios es vida eterna».", apoyo: "La salvación es un regalo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué llega a ser el que confía en Jesús?", reverso: "Hijo de Dios (Juan 1:12).", apoyo: "El que confía en Jesús llega a ser hijo de Dios" },
              { frente: "¿Puede un niño creer en Jesús de verdad?", reverso: "Sí: por eso guiarlo a Cristo es un privilegio y una responsabilidad.", apoyo: "Un niño puede creer en Jesús de verdad" },
              { frente: "¿Cómo puede un niño confesar su fe?", reverso: "Con sus propias palabras.", apoyo: "Un niño puede decirlo con sus propias palabras" },
              { frente: "¿Qué buscamos al guiar a un niño, aunque tarde un poco más?", reverso: "Una fe verdadera.", apoyo: "Lo que buscamos es una fe verdadera, aunque tarde un poco más" },
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
            consigna: "¿Qué palabras de Juan 3:16 incluyen también a los niños? Tócalas.",
            texto: "para que [[todo aquel]] que en él cree, no se pierda, mas tenga vida eterna",
            apoyo: "Y «todo aquel» incluye a los niños",
            ref: "Juan 3:16",
            explica: "El evangelio empieza con el amor de Dios, y «todo aquel» incluye a los niños: un niño puede creer en Jesús de verdad.",
          },
          {
            consigna: "Según Romanos 6:23, ¿qué es la dádiva de Dios? Toca las palabras que lo dicen.",
            texto: "la dádiva de Dios es [[vida eterna]] en Cristo Jesús Señor nuestro",
            apoyo: "La salvación es un regalo",
            ref: "Romanos 6:23",
            explica: "«la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro»: la salvación es un regalo, y así se le explica a un niño.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena la conversación para guiar a un niño a Cristo, como en el ejemplo resuelto, del primer paso al último.",
            pasos: [
              "Escuchar qué sabe de Jesús y qué quiere hacer",
              "Explicar el evangelio con sencillez",
              "Comprobar que entiende, con preguntas sencillas",
              "Invitarlo sin presionar a orar con sus palabras",
              "Orar juntos y darle seguridad con la Palabra",
              "Contarles a sus padres y acompañarlo después",
            ],
            apoyo: "Ejemplo resuelto: una conversación paso a paso",
            ref: "Juan 1:12",
            explica: "Primero se escucha; después se explica el evangelio con sencillez y se comprueba que entiende; luego se invita sin presionar, se ora juntos con la seguridad de la Palabra y, al final, se les cuenta a sus padres y se acompaña al niño.",
          },
          {
            consigna: "Guías a Tomás, de 8 años, en una conversación sobre Jesús. Ordena lo que haces, del primer paso al último.",
            pasos: [
              "Le preguntas qué sabe de Jesús y qué quiere hacer",
              "Le explicas que Dios lo ama y que Jesús murió y resucitó",
              "Le haces preguntas sencillas para ver si entiende",
              "Le dices que puede orar ahora o cuando esté listo",
              "Oran juntos, y le lees Juan 1:12",
              "Se lo cuentan con alegría a sus padres",
            ],
            apoyo: "Invitar sin presionar: puede orar con sus propias palabras para confiar en Jesús, ahora o cuando esté listo",
            ref: "Juan 1:12",
            explica: "La conversación va paso a paso: escuchar, explicar con sencillez, comprobar que entiende, invitar sin presionar, orar juntos con la seguridad de Juan 1:12 y contarles con alegría a sus padres.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Invita sin presión o presiona al niño? Lleva cada frase a su grupo.",
            grupos: ["Invita sin presión", "Presiona al niño"],
            frases: [
              { texto: "Le dice que puede orar ahora o cuando esté listo", grupo: 0 },
              { texto: "Lo deja orar con sus propias palabras", grupo: 0 },
              { texto: "Espera una fe verdadera, aunque tarde un poco más", grupo: 0 },
              { texto: "Le ofrece un premio si pasa al frente", grupo: 1 },
              { texto: "Le mete miedo para que pase al frente", grupo: 1 },
              { texto: "Le dice que todos sus amigos ya pasaron al frente", grupo: 1, explica: "Eso es usar la presión del grupo." },
            ],
            apoyo: "Nunca uses premios, miedo ni la presión del grupo para que un niño pase al frente",
            explica: "Se invita sin presionar: el niño puede orar con sus propias palabras, ahora o cuando esté listo. Nunca se usan premios, miedo ni la presión del grupo para que pase al frente.",
          },
          {
            consigna: "¿Así se guía a un niño a Cristo o así no se guía? Lleva cada frase a su grupo.",
            grupos: ["Así se guía", "Así no se guía"],
            frases: [
              { texto: "Hablar con él con calma, en un lugar visible", grupo: 0 },
              { texto: "Hacerle preguntas sencillas para ver si entiende", grupo: 0 },
              { texto: "Orar juntos y darle seguridad con Juan 1:12", grupo: 0 },
              { texto: "Llevarlo a un salón apartado para hablar a solas", grupo: 1 },
              { texto: "Ponerle en la boca las respuestas que quieres oír", grupo: 1 },
              { texto: "Darle un dulce a cada niño que pasa al frente", grupo: 1 },
            ],
            apoyo: "La conversación se tiene con calma y en un lugar visible, comprobando que el niño entiende, invitando sin presión y orando juntos",
            explica: "La conversación se tiene con calma y en un lugar visible, nunca a solas ni apartado; se comprueba que entiende sin ponerle las respuestas en la boca, y nunca se usan premios para que pase al frente.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Escuchar: preguntarle qué sabe de Jesús y qué quiere hacer, con calma y en un lugar visible, nunca a solas ni apartado",
            ref: "Juan 1:12",
            titulo: "Daniel se queda después de la clase",
            relato: [
              "Eres maestra de la clase de niños. Hoy enseñaste que Jesús murió por nuestros pecados y resucitó.",
              "Al terminar, Daniel, de 8 años, se queda y te dice: Quiero ser amigo de Jesús para siempre. ¿Qué tengo que hacer?",
              "Los demás niños ya salen con sus padres, y en el salón quedan otros maestros recogiendo los materiales.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Dónde tienes la conversación con Daniel?",
                opciones: [
                  { texto: "Ahí mismo, con calma y a la vista de los otros maestros.", bien: true, explica: "La conversación se tiene con calma y en un lugar visible, nunca a solas ni apartado." },
                  { texto: "En un salón cerrado, a solas, para que nadie los interrumpa.", explica: "Con un niño se habla en un lugar visible, nunca a solas ni apartado." },
                  { texto: "Afuera, de prisa, antes de que lleguen a buscarlo sus padres.", explica: "La conversación se tiene con calma; y después se les cuenta a sus padres." },
                ],
                apoyo: "con calma y en un lugar visible, nunca a solas ni apartado",
                explica: "El primer paso es escuchar, con calma y en un lugar visible, nunca a solas ni apartado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Le preguntas qué sabe de Jesús y qué quiere hacer.", bien: true, explica: "Escuchar: preguntarle qué sabe de Jesús y qué quiere hacer." },
                  { texto: "Le pides que repita detrás de ti una oración larga.", explica: "Primero se escucha; después, el niño puede orar con sus propias palabras." },
                  { texto: "Le explicas todo de una vez, sin dejarlo hablar nada.", explica: "La conversación empieza por escuchar al niño." },
                ],
                apoyo: "Escuchar: preguntarle qué sabe de Jesús y qué quiere hacer",
                explica: "La conversación empieza por escuchar: qué sabe de Jesús y qué quiere hacer.",
              },
              {
                tipo: "situacion",
                pregunta: "Daniel contesta lo que cree que quieres oír. ¿Cómo compruebas que entiende?",
                opciones: [
                  { texto: "Con preguntas sencillas, sin ponerle las respuestas en la boca.", bien: true, explica: "Comprobar que entiende: hacerle preguntas sencillas, sin ponerle las respuestas en la boca." },
                  { texto: "Le dices tú las respuestas, y él solo tiene que decir que sí a todo.", explica: "Un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan." },
                  { texto: "Le prometes un premio si contesta bien todas tus preguntas.", explica: "Nunca se usan premios: buscamos una fe verdadera." },
                ],
                apoyo: "Comprobar que entiende: hacerle preguntas sencillas, sin ponerle las respuestas en la boca",
                explica: "Un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan: por eso se le hacen preguntas sencillas, sin ponerle las respuestas en la boca.",
              },
              {
                tipo: "explica",
                apoyo: "Invitar sin presionar: puede orar con sus propias palabras para confiar en Jesús, ahora o cuando esté listo",
                clave: {
                  id: "pr-ninez-2-3-a5-1",
                  tipo: "corta",
                  pregunta: "Daniel entiende el evangelio. ¿Cómo lo invitas a confiar en Jesús, y qué haces después de que ora?",
                  ideas: [
                    { id: "invitar", peso: 50, texto: "Lo invitas sin presionar: puede orar con sus propias palabras, ahora o cuando esté listo.", formas: ["sin presion*", "sin presionar*", "no lo presion*", "no lo (obligo|obligaria|fuerzo|forzaria)", "sin (obligarlo|forzarlo)", "sus propias palabras", "con sus palabras", "cuando (este|estes|quiera) listo", "ahora o cuando"] },
                    { id: "despues", peso: 50, texto: "Después oran juntos, le das seguridad con la Palabra, se lo cuentan a sus padres y lo acompañas a crecer.", formas: ["oramos juntos", "orar juntos", "oraremos juntos", "oro con el", "orare con el", "juan 1 12", "seguridad", "(contarles|cuento|contare|contamos|contaremos|decirles|digo|dire|avisar|aviso|avisare) (sus|los) (padres|papas)", "a sus (padres|papas)", "acompan* a crecer", "acompan* para que crezca", "acompan* despues", "seguir acompan*", "leer la biblia", "en un grupo"] },
                  ],
                  modelo: "Le digo que puede orar con sus propias palabras para confiar en Jesús, ahora o cuando esté listo, sin presión. Si ora, oramos juntos, le leo Juan 1:12, se lo contamos con alegría a sus padres y lo acompaño a crecer.",
                },
              },
            ],
          },
          {
            apoyo: "Nunca uses premios, miedo ni la presión del grupo para que un niño pase al frente",
            ref: "Romanos 10:9",
            titulo: "La última noche del campamento",
            relato: [
              "Eres líder en el campamento de niños. En la última noche, el predicador invita a los niños a pasar al frente.",
              "Otro líder ofrece una gorra a cada niño que pase, y varios pasan al frente con sus amigos.",
              "Después, Lucía, de 10 años, te dice: Pasé porque todos pasaron, pero no sé bien qué hice.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices al líder de las gorras?",
                opciones: [
                  { texto: "Que no use premios para que los niños pasen al frente.", bien: true, explica: "Nunca se usan premios, miedo ni la presión del grupo para que un niño pase al frente." },
                  { texto: "Que dé dos gorras, para que pasen todavía más niños al frente.", explica: "Con un niño, la presión puede conseguir una oración; solo la gracia produce una fe verdadera." },
                  { texto: "Que está bien, porque lo que importa es que todos oren esta noche.", explica: "Lo que buscamos es una fe verdadera, aunque tarde un poco más." },
                ],
                apoyo: "Nunca uses premios, miedo ni la presión del grupo para que un niño pase al frente",
                explica: "Un niño quiere agradar a los adultos: los premios pueden conseguir una oración, pero solo la gracia produce una fe verdadera.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con Lucía?",
                opciones: [
                  { texto: "La escuchas con calma y le explicas el evangelio con sencillez.", bien: true, explica: "Se escucha al niño con calma, y el evangelio se explica con sencillez." },
                  { texto: "Le dices que ya es salva, porque pasó al frente con todos los demás.", explica: "Lucía pasó por la presión del grupo y no sabe qué hizo: se la escucha y se le explica el evangelio con sencillez." },
                  { texto: "La regañas por haber pasado al frente sin entender lo que hacía.", explica: "Se la escucha con calma: un niño puede repetir lo que espera que los adultos oigan." },
                ],
                apoyo: "Explicar con sencillez: Dios te ama; todos hemos desobedecido a Dios; Jesús murió por nuestros pecados y resucitó; Dios nos regala el perdón",
                explica: "El evangelio se explica con sencillez: Dios te ama, todos hemos desobedecido a Dios, Jesús murió por nuestros pecados y resucitó, y Dios nos regala el perdón.",
              },
              {
                tipo: "situacion",
                pregunta: "Lucía entiende, pero dice que todavía no está lista para orar. ¿Qué haces?",
                opciones: [
                  { texto: "Le dices que puede orar cuando esté lista, y sigues cerca de ella.", bien: true, explica: "Invitar sin presionar: puede orar con sus propias palabras, ahora o cuando esté lista." },
                  { texto: "Le insistes hasta que ore, porque mañana se vuelve a su casa con sus papás.", explica: "Se invita sin presionar: lo que buscamos es una fe verdadera, aunque tarde un poco más." },
                  { texto: "Le dices que, si no ora hoy, Dios se va a enojar mucho con ella.", explica: "Nunca se usa el miedo para que un niño decida." },
                ],
                apoyo: "Invitar sin presionar: puede orar con sus propias palabras para confiar en Jesús, ahora o cuando esté listo",
                explica: "Con un niño, la presión puede conseguir una oración; solo la gracia produce una fe verdadera.",
              },
              {
                tipo: "explica",
                apoyo: "Un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan",
                clave: {
                  id: "pr-ninez-2-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Por qué con los niños no se usan premios, miedo ni la presión del grupo?",
                  ideas: [
                    { id: "agradar", peso: 50, texto: "Un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan.", formas: ["agradar*", "agrade*", "complacer*", "quedar bien", "darles gusto", "darle gusto", "repet* lo que", "repit* lo que", "lo que (espera|esperan|quieren|quiere) oigan", "(espera|esperan|quieren|quiere|queremos|quieres|esperamos|esperas) (oir|escuchar)"] },
                    { id: "fe", peso: 50, texto: "Buscamos una fe verdadera, aunque tarde un poco más: solo la gracia la produce.", formas: ["fe verdadera", "fe (real|genuina|sincera)", "creer de verdad", "crea de verdad", "crean de verdad", "solo la gracia", "aunque tarde"] },
                  ],
                  modelo: "Porque un niño quiere agradar a los adultos y puede repetir lo que espera que ellos oigan. La presión puede conseguir una oración, pero lo que buscamos es una fe verdadera, aunque tarde un poco más.",
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
            caso: "Un maestro de tu equipo te dice: Ayer Sofía oró para confiar en Jesús. ¿Se lo cuento a sus padres o lo dejamos entre nosotros?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que se lo cuente con alegría a sus padres, y que la acompañen.", bien: true, explica: "Después de la decisión se les cuenta a los padres y se acompaña al niño para que crezca." },
              { texto: "Que lo guarden entre ustedes, para que sus padres no se metan en eso.", explica: "El ejemplo resuelto termina así: contarles con alegría a sus padres y acompañarlo después." },
              { texto: "Que no hace falta: con esa oración, Sofía ya no necesita nada más.", explica: "Después de su decisión se acompaña al niño: leer la Biblia, orar y crecer en un grupo." },
              { texto: "Que espere a que Sofía sea mayor para contárselo a alguien más.", explica: "Se les cuenta a los padres con alegría, y se acompaña al niño desde ahora." },
            ],
            apoyo: "Contarles con alegría a sus padres y acompañarlo después: leer la Biblia, orar y crecer en un grupo",
            explica: "Después de la decisión, se les cuenta con alegría a los padres y se acompaña al niño: leer la Biblia, orar y crecer en un grupo.",
          },
          {
            caso: "La mamá de Andrés te dice: Andrés oró en tu clase para confiar en Jesús. ¿Qué hacemos ahora en casa?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que lean la Biblia y oren con él, y que siga creciendo en un grupo.", bien: true, explica: "Después de la decisión se acompaña al niño: leer la Biblia, orar y crecer en un grupo." },
              { texto: "Nada más: ya oró una vez, y con eso le basta para el resto de su vida.", explica: "Después de su decisión se acompaña al niño para que crezca." },
              { texto: "Que esperen a que sea grande para volver a hablarle de Jesús en casa.", explica: "El niño se acompaña desde ahora: leer la Biblia, orar y crecer en un grupo." },
              { texto: "Que lo dejen todo a la iglesia, porque la fe del niño no es cosa de la casa.", explica: "Se trabaja con los padres: se les cuenta con alegría y se acompaña al niño." },
            ],
            apoyo: "después se les cuenta a los padres y se acompaña al niño para que crezca",
            explica: "La conversación termina con los padres: se les cuenta con alegría y, juntos, se acompaña al niño para que crezca, leyendo la Biblia, orando y creciendo en un grupo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El evangelio se explica con sencillez: Dios te ama, todos pecamos, Jesús murió por nuestros pecados y resucitó, y la vida eterna es un regalo para el que confía en él",
            ref: "Romanos 6:23",
            clave: {
              id: "pr-ninez-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo explicarías el evangelio a un niño de siete años con tus propias palabras?",
              ideas: [
                { id: "amor", peso: 30, texto: "Dios te ama.", formas: ["dios (te|nos|lo|los|la) ama*", "dios (te|nos) quiere", "amor de dios", "te ama", "nos ama", "te quiere mucho"] },
                { id: "pecado", peso: 30, texto: "Todos hemos desobedecido a Dios: todos pecamos.", formas: ["desobedec*", "pecamos", "todos (pecamos|pecaron|hemos)", "hemos pecado", "hacemos lo malo", "hacemos cosas malas", "somos pecadores", "el pecado separa"] },
                { id: "jesus", peso: 40, texto: "Jesús murió por nuestros pecados y resucitó, y Dios nos regala el perdón y la vida eterna.", formas: ["murio (por|en)", "resucit*", "es un regalo", "regalo de dios", "el perdon", "dadiva", "vida eterna"] },
              ],
              modelo: "Le diría: Dios te ama mucho. Todos hemos desobedecido a Dios, y eso es pecado. Pero Jesús murió en la cruz por nuestros pecados y resucitó, y Dios nos regala el perdón y la vida eterna si confiamos en él.",
            },
          },
          {
            apoyo: "El que confía en Jesús llega a ser hijo de Dios",
            ref: "Juan 1:12",
            clave: {
              id: "pr-ninez-2-3-a7-2",
              tipo: "corta",
              pregunta: "Un niño te pregunta: ¿Cómo llego a ser hijo de Dios? ¿Qué le respondes con palabras sencillas?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Jesús murió por nuestros pecados y resucitó: la vida eterna es un regalo de Dios.", formas: ["murio (por|en)", "resucit*", "es un regalo", "regalo de dios", "el perdon", "dadiva", "vida eterna"] },
                { id: "confiar", peso: 50, texto: "El que confía en Jesús llega a ser hijo de Dios: puede orar con sus palabras para confiar en él.", formas: ["confi* en (jesus|el)", "cree* en (jesus|el)", "cree* en su nombre", "creer en (jesus|el)", "creyendo en (jesus|el)", "recib* a jesus", "le recibieron", "tus propias palabras", "con tus palabras"] },
              ],
              modelo: "Le respondo que Jesús murió por nuestros pecados y resucitó, y que la vida eterna es un regalo de Dios. El que confía en Jesús llega a ser hijo de Dios: puede orar con sus propias palabras para confiar en él.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Las preguntas difíciles
    "ninez-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice Deuteronomio 1:39 de algunos hijos?", reverso: "Que «no saben hoy lo bueno ni lo malo».", apoyo: "La Biblia habla de los hijos «que no saben hoy lo bueno ni lo malo»" },
              { frente: "¿Qué es la edad de la responsabilidad, según muchas iglesias evangélicas?", reverso: "Un momento, distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo.", apoyo: "un momento, distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo" },
              { frente: "¿Da la Biblia una edad exacta de la responsabilidad?", reverso: "No, ni explica todo lo que pasa con los niños que mueren pequeños.", apoyo: "La Biblia no da una edad exacta ni explica todo lo que pasa con los niños que mueren pequeños" },
              { frente: "¿Qué dijo David cuando murió su hijo pequeño?", reverso: "«Yo voy a él, mas él no volverá a mí».", apoyo: "Cuando murió su hijo pequeño, David dijo: «Yo voy a él, mas él no volverá a mí»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quiénes bautiza el ministerio, según el artículo 8 de su declaración de fe?", reverso: "A quienes se arrepintieron y creyeron.", apoyo: "La declaración de fe del ministerio bautiza a quienes se arrepintieron y creyeron (artículo 8)" },
              { frente: "¿Cuándo se bautiza un niño, según la declaración de fe del ministerio?", reverso: "Cuando entiende y confiesa su fe, y no por su edad.", apoyo: "por eso un niño se bautiza cuando entiende y confiesa su fe, y no por su edad" },
              { frente: "En Pentecostés, ¿para quiénes dijo Pedro que era también la promesa?", reverso: "Para los hijos (Hechos 2:39).", apoyo: "En Pentecostés, Pedro dijo que la promesa era también para los hijos (Hechos 2:39)" },
              { frente: "Ante una familia en duelo, ¿con qué consuela el pastor?", reverso: "Con la misericordia de Dios, sin especular.", apoyo: "Ante una familia en duelo, el pastor consuela con la misericordia de Dios y no especula" },
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
            consigna: "Sobre la edad de la responsabilidad: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La Biblia da una edad exacta en la que todo niño se vuelve responsable.", verdad: false, explica: "La Biblia no da una edad exacta ni explica todo lo que pasa con los niños que mueren pequeños.", apoyo: "La Biblia no da una edad exacta ni explica todo lo que pasa con los niños que mueren pequeños" },
              { texto: "Muchas iglesias evangélicas hablan de una edad de la responsabilidad, distinta en cada niño.", verdad: true, explica: "Hablan de un momento, distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo.", apoyo: "muchas iglesias evangélicas hablan de una edad de la responsabilidad, distinta en cada niño", ref: "Deuteronomio 1:39" },
              { texto: "Otras tradiciones explican de otra manera lo que pasa con los niños que mueren pequeños.", verdad: true, explica: "Muchas iglesias evangélicas confían en que Dios los recibe por su gracia, y otras tradiciones lo explican de otra manera.", apoyo: "Muchas iglesias evangélicas confían en que Dios los recibe por su gracia, y otras tradiciones lo explican de otra manera" },
            ],
          },
          {
            consigna: "Sobre los niños que mueren pequeños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Ante una familia en duelo, el pastor especula sobre lo que la Biblia no explica.", verdad: false, explica: "Ante una familia en duelo, el pastor consuela con la misericordia de Dios y no especula.", apoyo: "Ante una familia en duelo, el pastor consuela con la misericordia de Dios y no especula" },
              { texto: "Muchos ven en las palabras de David una esperanza para los niños que mueren antes de poder creer.", verdad: true, explica: "Cuando murió su hijo pequeño, David dijo: «Yo voy a él, mas él no volverá a mí».", apoyo: "Muchos ven en estas palabras una esperanza para los niños que mueren antes de poder creer", ref: "2 Samuel 12:23" },
              { texto: "Para muchas iglesias evangélicas, la edad de la responsabilidad es igual en todos los niños.", verdad: false, explica: "Hablan de un momento distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo.", apoyo: "un momento, distinto en cada niño, en que entiende el pecado y la gracia y responde por sí mismo" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una mamá de la iglesia, cuyo bebé murió hace poco, te dice: ¿Dónde está mi bebé ahora? ¿Qué dice la Biblia?",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "La consuelas con la misericordia de Dios, sin especular.", bien: true, explica: "Ante una familia en duelo se consuela con la misericordia de Dios y no se especula." },
              { texto: "Le describes con detalle todo lo que la Biblia no explica.", explica: "La Biblia no explica todo lo que pasa con los niños que mueren pequeños: ante el duelo no se especula." },
              { texto: "Le dices que eso dependía de si el bebé ya era responsable.", explica: "Ante una familia en duelo no se especula: se consuela con la misericordia de Dios." },
              { texto: "Le dices que no hay nada que decir, y le cambias de tema.", explica: "Son preguntas serias, y merecen respuestas con la Biblia y con respeto." },
            ],
            apoyo: "Ante una familia en duelo, el pastor consuela con la misericordia de Dios y no especula",
            explica: "La Biblia no da una edad exacta ni explica todo lo que pasa con los niños que mueren pequeños. Ante una familia en duelo, se consuela con la misericordia de Dios y no se especula.",
          },
          {
            caso: "Un papá te dice en la reunión de padres: Dígame la edad exacta en que un niño se vuelve responsable ante Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la Biblia no da una edad exacta; muchas iglesias hablan de un momento distinto en cada niño.", bien: true, explica: "La Biblia no da una edad exacta, y muchas iglesias evangélicas hablan de un momento distinto en cada niño, en que entiende el pecado y la gracia." },
              { texto: "Que es a los siete años exactos, porque así lo dice la Biblia, y que nadie lo explica de otra manera.", explica: "La Biblia no da una edad exacta, y otras tradiciones lo explican de otra manera." },
              { texto: "Que es a los doce años, y que las otras tradiciones están equivocadas y no merecen ningún respeto.", explica: "Las posiciones se presentan con respeto: la Biblia no da una edad exacta." },
              { texto: "Que de eso no se habla en la iglesia, porque es una pregunta que solo divide a los hermanos.", explica: "Son preguntas serias, y merecen respuestas con la Biblia y con respeto." },
            ],
            apoyo: "Son preguntas serias, y merecen respuestas con la Biblia y con respeto",
            explica: "La Biblia habla de los hijos que no saben lo bueno ni lo malo, pero no da una edad exacta. Muchas iglesias evangélicas hablan de un momento distinto en cada niño, y otras tradiciones lo explican de otra manera.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Se hace antes de bautizar a un niño o no se hace? Lleva cada frase a su grupo.",
            grupos: ["Se hace antes de bautizarlo", "No se hace"],
            frases: [
              { texto: "Conversar con él para ver si entiende el evangelio", grupo: 0 },
              { texto: "Que diga con sus propias palabras que confía en Jesús", grupo: 0 },
              { texto: "Hablar con sus padres y contar con su acuerdo", grupo: 0 },
              { texto: "Darle una clase de bautismo adaptada a su edad", grupo: 0 },
              { texto: "Bautizarlo solo porque ya cumplió cierta edad", grupo: 1, explica: "Un niño se bautiza cuando entiende y confiesa su fe, y no por su edad." },
              { texto: "Bautizarlo sin el acuerdo de sus padres", grupo: 1 },
              { texto: "Bautizarlo aunque todavía no entienda el evangelio", grupo: 1 },
            ],
            apoyo: "Hablar con sus padres y contar con su acuerdo",
            ref: "Hechos 8:12",
            explica: "Antes de bautizar a un niño se conversa con él para ver si entiende el evangelio y confía en Jesús, se habla con sus padres para contar con su acuerdo y se le da una clase adaptada a su edad.",
          },
          {
            consigna: "¿Sigue lo que enseña la lección sobre el bautismo de un niño o no lo sigue? Lleva cada frase a su grupo.",
            grupos: ["Sigue la lección", "No sigue la lección"],
            frases: [
              { texto: "Un niño se bautiza cuando entiende y confiesa su fe", grupo: 0 },
              { texto: "Sobre la edad, se sigue la práctica de tu iglesia", grupo: 0 },
              { texto: "La clase de bautismo se adapta a la edad del niño", grupo: 0 },
              { texto: "Un niño se bautiza por haber cumplido una edad", grupo: 1 },
              { texto: "Se bautiza al niño sin hablar antes con sus padres", grupo: 1 },
              { texto: "Se bautiza al niño aunque no pueda decir en qué cree", grupo: 1 },
            ],
            apoyo: "Las iglesias difieren en la edad: unas bautizan a los niños que confiesan su fe y otras prefieren esperar a la adolescencia; sigue la práctica de tu iglesia",
            ref: "Hechos 8:12",
            explica: "La declaración de fe bautiza a quienes se arrepintieron y creyeron: un niño se bautiza cuando entiende y confiesa su fe, y no por su edad, con el acuerdo de sus padres y según la práctica de la iglesia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "por eso un niño se bautiza cuando entiende y confiesa su fe, y no por su edad",
            ref: "Hechos 8:12",
            titulo: "Samuel quiere bautizarse",
            relato: [
              "Eres maestro de la clase de niños. Al terminar el culto, los papás de Samuel, de 7 años, se te acercan.",
              "Te cuentan que Samuel dice que ama a Jesús y que quiere bautizarse, como vio hacer a su hermano mayor.",
              "Te preguntan: ¿Puede bautizarse ya, o es muy pequeño?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué decide si Samuel puede bautizarse?",
                opciones: [
                  { texto: "Que entienda y confiese su fe, y no su edad.", bien: true, explica: "Un niño se bautiza cuando entiende y confiesa su fe, y no por su edad." },
                  { texto: "Que ya cumplió siete años, una edad suficiente.", explica: "Un niño no se bautiza por su edad, sino cuando entiende y confiesa su fe." },
                  { texto: "Que su hermano mayor ya se bautizó en la iglesia.", explica: "Lo que cuenta es la fe de Samuel: que entienda y confiese su fe." },
                ],
                apoyo: "por eso un niño se bautiza cuando entiende y confiesa su fe, y no por su edad",
                explica: "La declaración de fe del ministerio bautiza a quienes se arrepintieron y creyeron (artículo 8).",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Conversar con Samuel, para que diga con sus palabras en qué cree.", bien: true, explica: "Antes de bautizar a un niño se conversa con él para ver si entiende el evangelio y confía en Jesús, y que lo diga con sus propias palabras." },
                  { texto: "Anotarlo ya en la lista de los que se bautizan el próximo domingo.", explica: "Primero se conversa con el niño para ver si entiende el evangelio." },
                  { texto: "Pedirles a sus papás que lo convenzan en casa de que ya está listo.", explica: "El niño dice con sus propias palabras que confía en Jesús: nadie lo convence." },
                ],
                apoyo: "Conversar con el niño para ver si entiende el evangelio y confía en Jesús, y que lo diga con sus propias palabras",
                explica: "La conversación muestra si el niño entiende el evangelio y confía en Jesús.",
              },
              {
                tipo: "situacion",
                pregunta: "Samuel entiende el evangelio y confía en Jesús. ¿Qué sigue?",
                opciones: [
                  { texto: "Contar con el acuerdo de sus padres y darle una clase para su edad.", bien: true, explica: "Antes de bautizarlo se cuenta con el acuerdo de sus padres y se le da una clase de bautismo adaptada a su edad." },
                  { texto: "Bautizarlo esa misma tarde, sin darle ninguna clase de bautismo.", explica: "Antes se le da una clase de bautismo adaptada a su edad." },
                  { texto: "Darle la clase de bautismo de los adultos, igual que a todos los demás.", explica: "La clase de bautismo se adapta a su edad." },
                ],
                apoyo: "Darle una clase de bautismo adaptada a su edad",
                explica: "Antes de bautizar a un niño se habla con sus padres y se cuenta con su acuerdo, y se le da una clase de bautismo adaptada a su edad.",
              },
              {
                tipo: "explica",
                apoyo: "Las iglesias difieren en la edad: unas bautizan a los niños que confiesan su fe y otras prefieren esperar a la adolescencia; sigue la práctica de tu iglesia",
                clave: {
                  id: "pr-ninez-2-4-a5-1",
                  tipo: "corta",
                  pregunta: "Los papás de Samuel te preguntan si hay una edad para bautizarse. ¿Qué les respondes según la lección?",
                  ideas: [
                    { id: "fe", peso: 50, texto: "Un niño se bautiza cuando entiende y confiesa su fe, y no por su edad.", formas: ["entiend* y confies*", "confies* su fe", "confiesa su fe", "entiend* el evangelio", "cuando (crea|cree|entienda|entiende)", "no por (su|la) edad", "no depende de (la|su) edad", "arrepinti* y creyeron", "quienes (creen|creyeron)"] },
                    { id: "practica", peso: 50, texto: "Las iglesias difieren en la edad, y se sigue la práctica de la iglesia.", formas: ["practica de (la|tu|nuestra|mi|su) iglesia", "difieren", "cada iglesia", "unas bautizan", "otras (prefieren|esperan)", "adolescencia"] },
                  ],
                  modelo: "Les respondo que un niño se bautiza cuando entiende y confiesa su fe, y no por su edad. Las iglesias difieren en la edad, y se sigue la práctica de nuestra iglesia, con el acuerdo de ustedes.",
                },
              },
            ],
          },
          {
            apoyo: "Hablar con sus padres y contar con su acuerdo",
            ref: "Hechos 8:12",
            titulo: "Mariana pide bautizarse",
            relato: [
              "Eres líder de niños en una iglesia que bautiza a los niños que confiesan su fe.",
              "Mariana, de 9 años, te dice que confía en Jesús y que quiere bautizarse.",
              "Sus padres no vienen a la iglesia, y todavía no saben nada de su deseo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero con Mariana?",
                opciones: [
                  { texto: "Conversar con ella, para ver si entiende el evangelio.", bien: true, explica: "Antes de bautizar a un niño se conversa con él para ver si entiende el evangelio y confía en Jesús." },
                  { texto: "Bautizarla el domingo que viene, antes de que cambie de idea.", explica: "Primero se conversa con el niño para ver si entiende el evangelio y confía en Jesús." },
                  { texto: "Decirle que todavía es muy pequeña para pensar en bautizarse.", explica: "En su iglesia se bautiza a los niños que confiesan su fe: un niño se bautiza cuando entiende y confiesa su fe, y no por su edad." },
                ],
                apoyo: "Conversar con el niño para ver si entiende el evangelio y confía en Jesús, y que lo diga con sus propias palabras",
                explica: "Lo primero es conversar con ella, y que diga con sus propias palabras que confía en Jesús.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con sus padres?",
                opciones: [
                  { texto: "Hablar con ellos y contar con su acuerdo.", bien: true, explica: "Antes de bautizar a un niño se habla con sus padres y se cuenta con su acuerdo." },
                  { texto: "Bautizarla sin decirles, porque no vienen a la iglesia.", explica: "Se habla con sus padres y se cuenta con su acuerdo, vengan o no a la iglesia." },
                  { texto: "Que Mariana se lo cuente cuando ya esté bautizada.", explica: "El acuerdo de los padres va antes del bautismo." },
                ],
                apoyo: "Hablar con sus padres y contar con su acuerdo",
                explica: "Antes de bautizar a un niño se habla con sus padres y se cuenta con su acuerdo.",
              },
              {
                tipo: "situacion",
                pregunta: "Sus padres están de acuerdo. ¿Cómo la preparas?",
                opciones: [
                  { texto: "Con una clase de bautismo adaptada a su edad.", bien: true, explica: "Antes de bautizarla se le da una clase de bautismo adaptada a su edad." },
                  { texto: "Con la misma clase larga que reciben los adultos.", explica: "La clase de bautismo se adapta a la edad del niño." },
                  { texto: "Sin ninguna clase: si confía en Jesús, ya lo sabe todo.", explica: "Antes de bautizar a un niño se le da una clase de bautismo adaptada a su edad." },
                ],
                apoyo: "Darle una clase de bautismo adaptada a su edad",
                explica: "La clase de bautismo se adapta a la edad del niño.",
              },
              {
                tipo: "explica",
                apoyo: "La declaración de fe del ministerio bautiza a quienes se arrepintieron y creyeron (artículo 8)",
                clave: {
                  id: "pr-ninez-2-4-a5-2",
                  tipo: "corta",
                  pregunta: "¿A quiénes bautiza el ministerio según su declaración de fe, y qué ejemplo de la Biblia da la lección?",
                  ideas: [
                    { id: "creyeron", peso: 50, texto: "Bautiza a quienes se arrepintieron y creyeron (artículo 8).", formas: ["arrepinti*", "arrepent*", "arrepien*", "quienes (creen|creyeron|confiesan|confesaron)", "los que (creen|creyeron|confiesan|confesaron)", "creyeron", "confies* su fe", "entiend* y confies*", "articulo 8", "articulo ocho"] },
                    { id: "samaria", peso: 50, texto: "En Samaria, cuando creyeron a Felipe, se bautizaban hombres y mujeres.", formas: ["samaria", "felipe", "hombres y mujeres", "hechos 8"] },
                  ],
                  modelo: "El ministerio bautiza a quienes se arrepintieron y creyeron, como dice el artículo 8 de su declaración de fe. El ejemplo es Samaria: cuando creyeron a Felipe, se bautizaban hombres y mujeres.",
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
            consigna: "Completa la promesa del Espíritu para los hijos.",
            texto: "Dios prometió derramar su [[Espíritu]] sobre toda carne, y en Pentecostés Pedro dijo que la [[promesa]] era también para los [[hijos]].",
            distractores: ["enojo", "amenaza", "ángeles"],
            errores: {
              enojo: "Dios prometió: «derramaré mi Espíritu sobre toda carne».",
              amenaza: "Pedro dijo que la promesa era también para los hijos (Hechos 2:39).",
              "ángeles": "La promesa era también para los hijos: los niños también pueden recibir el Espíritu Santo.",
            },
            apoyo: "En Pentecostés, Pedro dijo que la promesa era también para los hijos (Hechos 2:39)",
            ref: "Joel 2:28",
            explica: "Dios prometió: «derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas». En Pentecostés, Pedro dijo que la promesa era también para los hijos: los niños también pueden recibir el Espíritu Santo.",
          },
          {
            consigna: "Completa cómo acompañar a un niño que quiere recibir el Espíritu Santo.",
            texto: "Acompaña con [[alegría]] al niño que quiera recibir el Espíritu Santo: enséñale lo que dice la [[Biblia]], [[ora]] con él y deja que Dios obre.",
            distractores: ["prisa", "moda", "discute"],
            errores: {
              prisa: "Al niño se le acompaña con alegría y sin presión, como a los adultos.",
              moda: "Al niño se le enseña lo que dice la Biblia.",
              discute: "El líder ora con él y deja que Dios obre.",
            },
            apoyo: "Cuando un niño quiera orar para recibir el Espíritu Santo, acompáñalo con alegría y sin presión, como a los adultos: enséñale lo que dice la Biblia, ora con él y deja que Dios obre",
            ref: "Joel 2:28",
            explica: "Cuando un niño quiera orar para recibir el Espíritu Santo, se le acompaña con alegría y sin presión, como a los adultos: se le enseña lo que dice la Biblia, se ora con él y se deja que Dios obre. Y se cuida que la emoción de un grupo no empuje a nadie.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los niños también pueden recibir el Espíritu Santo",
            ref: "Joel 2:28",
            clave: {
              id: "pr-ninez-2-4-a7-1",
              tipo: "corta",
              pregunta: "Unos padres te preguntan si su hija de diez años puede recibir el Espíritu Santo. ¿Qué les respondes con la Biblia?",
              ideas: [
                { id: "promesa", peso: 50, texto: "Sí: la promesa es también para los hijos; Joel dice que profetizarán vuestros hijos y vuestras hijas.", formas: ["promesa (es|era) (tambien|para)", "tambien para los (hijos|ninos)", "para (los|sus|vuestros) hijos", "hijos y (vuestras|sus|las) hijas", "profetizaran", "toda carne", "hechos 2 39", "joel", "pentecostes"] },
                { id: "acompanar", peso: 50, texto: "Pueden acompañarla con alegría y sin presión: enseñarle lo que dice la Biblia, orar con ella y dejar que Dios obre.", formas: ["sin presion*", "con alegria", "orar con ella", "oren con ella", "orando con ella", "orar por ella", "que dios obre", "ensen* lo que dice"] },
              ],
              modelo: "Les respondo que sí: Joel dice que profetizarán vuestros hijos y vuestras hijas, y Pedro dijo en Pentecostés que la promesa era también para los hijos. Pueden acompañarla con alegría y sin presión, orar con ella y dejar que Dios obre.",
            },
          },
          {
            apoyo: "En Pentecostés, Pedro dijo que la promesa era también para los hijos (Hechos 2:39)",
            ref: "Joel 2:28",
            clave: {
              id: "pr-ninez-2-4-a7-2",
              tipo: "corta",
              pregunta: "Un líder de niños dice que el Espíritu Santo es solo para los adultos. ¿Qué le enseñas con la lección?",
              ideas: [
                { id: "joel", peso: 50, texto: "Dios prometió derramar su Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas.", formas: ["toda carne", "derramar*", "profetizaran", "hijos y (vuestras|sus|las) hijas", "joel"] },
                { id: "pedro", peso: 50, texto: "En Pentecostés, Pedro dijo que la promesa era también para los hijos: los niños también pueden recibirlo.", formas: ["pentecostes", "pedro", "hechos 2 39", "promesa (es|era) (tambien|para)", "tambien para los (hijos|ninos)", "para los hijos", "ninos tambien pueden", "los ninos tambien"] },
              ],
              errores: [
                { id: "adultos", texto: "La promesa del Espíritu es también para los hijos: los niños también pueden recibirlo.", formas: ["solo para adultos", "solo para los adultos", "solo los adultos", "no es para (los|ninos)"], anula: "pedro" },
              ],
              modelo: "Le enseño que Dios prometió por Joel derramar su Espíritu sobre toda carne: profetizarán vuestros hijos y vuestras hijas. Y en Pentecostés Pedro dijo que la promesa era también para los hijos: los niños también pueden recibirlo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El niño que ora, adora y sirve
    "ninez-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo enseñó Jesús a orar?", reverso: "Con palabras sencillas: «Padre nuestro que estás en los cielos».", apoyo: "Jesús enseñó a orar con palabras sencillas" },
              { frente: "¿Qué oración es un buen modelo para los niños?", reverso: "El Padre nuestro.", apoyo: "El Padre nuestro es un buen modelo para los niños" },
              { frente: "¿Qué se hace con las peticiones de los niños?", reverso: "Se anotan, y después se celebran las respuestas.", apoyo: "Anotar las peticiones y celebrar las respuestas" },
              { frente: "¿Por qué cosas dan gracias los niños al orar?", reverso: "Por las cosas de cada día.", apoyo: "Dar gracias por las cosas de cada día" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué tiene la alabanza de los niños, según la lección?", reverso: "Poder delante de Dios.", apoyo: "La alabanza de los niños tiene poder delante de Dios" },
              { frente: "¿Cómo se aprenden de memoria los versículos cortos?", reverso: "Con música o con gestos.", apoyo: "Aprender de memoria versículos cortos, con música o con gestos, deja la Palabra en el corazón para toda la vida" },
              { frente: "¿Qué le dijo Pablo a Timoteo, que era joven?", reverso: "«sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza».", apoyo: "Pablo le dijo a Timoteo, que era joven" },
              { frente: "¿Qué siente un niño que sirve y es tomado en serio?", reverso: "Que pertenece a la iglesia.", apoyo: "Un niño que sirve y es tomado en serio siente que pertenece a la iglesia" },
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
            consigna: "Ordena la oración con los dedos de la mano como la da la lección, del primer dedo al último.",
            pasos: ["Alabar", "Pedir perdón", "Dar gracias", "Pedir por otros", "Pedir por uno mismo"],
            apoyo: "Usar los dedos de la mano: alabar, pedir perdón, dar gracias, pedir por otros y pedir por uno mismo",
            explica: "Con los dedos de la mano, el niño ora en este orden: alabar, pedir perdón, dar gracias, pedir por otros y pedir por uno mismo.",
          },
          {
            consigna: "Ordena lo que enseña el Padre nuestro como modelo para los niños, como lo presenta la lección, del principio al final.",
            pasos: ["Alabar a Dios", "Pedir que se haga la voluntad de Dios", "Pedir el pan", "Pedir el perdón", "Pedir ayuda contra el mal"],
            apoyo: "El Padre nuestro es un buen modelo para los niños: alabar, pedir que se haga la voluntad de Dios, pedir el pan, el perdón y la ayuda contra el mal",
            ref: "Mateo 6:9-13",
            explica: "El Padre nuestro enseña a alabar («santificado sea tu nombre»), a pedir que se haga la voluntad de Dios, y a pedir el pan, el perdón y la ayuda contra el mal.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una maestra de niños te dice: Mis niños no oran; solo repiten una oración larga que aprendieron de memoria.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que oren con frases cortas y con sus propias palabras.", bien: true, explica: "Una forma sencilla de orar con niños es orar con frases cortas y con sus propias palabras." },
              { texto: "Que les enseñe una oración todavía más larga, para que sepan más.", explica: "Jesús enseñó a orar con palabras sencillas." },
              { texto: "Que ore ella por todos, porque los niños todavía no saben orar.", explica: "Un niño puede orar: con frases cortas y con sus propias palabras." },
              { texto: "Que deje la oración para cuando sean grandes y entiendan mejor.", explica: "La fe de un niño no es solo escuchar historias: un niño puede orar." },
            ],
            apoyo: "Orar con frases cortas y con sus propias palabras",
            ref: "Mateo 6:9-13",
            explica: "Jesús enseñó a orar con palabras sencillas, y hay formas fáciles de orar con niños: con frases cortas y con sus propias palabras, dando gracias y pidiendo por otros.",
          },
          {
            caso: "Un papá te dice: Quiero orar con mi hijo de 6 años antes de dormir, pero no sé cómo empezar.",
            pregunta: "¿Qué le propones?",
            opciones: [
              { texto: "Que den gracias por las cosas del día y oren por la familia.", bien: true, explica: "Dos formas sencillas de orar con niños: dar gracias por las cosas de cada día y orar unos por otros, por la familia y por los enfermos." },
              { texto: "Que le lea una oración larga de un libro, y que el niño solo escuche.", explica: "El niño ora con frases cortas y con sus propias palabras." },
              { texto: "Que espere a que el niño tenga edad para orar por sí mismo.", explica: "Un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad." },
              { texto: "Que ore solo cuando el niño esté enfermo o tenga algún problema.", explica: "Se da gracias por las cosas de cada día, y se ora unos por otros." },
            ],
            apoyo: "Dar gracias por las cosas de cada día",
            ref: "Mateo 6:9-13",
            explica: "Hay formas sencillas de orar con niños: dar gracias por las cosas de cada día, orar unos por otros, por la familia y por los enfermos, y usar los dedos de la mano.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿De la boca de quiénes fundó Dios la fortaleza? Toca las palabras que lo dicen.",
            texto: "De la boca de los [[niños]] y de los que [[maman]], fundaste la fortaleza",
            apoyo: "La alabanza de los niños tiene poder delante de Dios",
            ref: "Salmos 8:2",
            explica: "«De la boca de los niños y de los que maman, fundaste la fortaleza»: la alabanza de los niños tiene poder delante de Dios.",
          },
          {
            consigna: "¿Dónde guardó el salmista los dichos de Dios? Toca las palabras que lo dicen.",
            texto: "[[En mi corazón]] he guardado tus dichos, Para no pecar contra ti",
            apoyo: "Aprender de memoria versículos cortos, con música o con gestos, deja la Palabra en el corazón para toda la vida",
            ref: "Salmos 119:11",
            explica: "«En mi corazón he guardado tus dichos, Para no pecar contra ti»: aprender versículos de memoria deja la Palabra en el corazón para toda la vida.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se guarda la Palabra en el corazón de un niño.",
            texto: "Aprender de memoria versículos [[cortos]], con [[música]] o con [[gestos]], deja la Palabra en el corazón para toda la vida.",
            distractores: ["largos", "castigos", "regaños"],
            errores: {
              largos: "Se aprenden de memoria versículos cortos.",
              castigos: "Los versículos se aprenden con música o con gestos.",
              "regaños": "Los versículos se aprenden con música o con gestos, no con regaños.",
            },
            apoyo: "Aprender de memoria versículos cortos, con música o con gestos, deja la Palabra en el corazón para toda la vida",
            ref: "Salmos 119:11",
            explica: "Aprender de memoria versículos cortos, con música o con gestos, deja la Palabra en el corazón para toda la vida, como el salmista que guardó los dichos de Dios.",
          },
          {
            consigna: "Completa lo que puede hacer un niño, según la lección.",
            texto: "Los niños pueden [[adorar]] y aprender de memoria la [[Palabra]]: su alabanza tiene [[poder]] delante de Dios.",
            distractores: ["dormir", "novela", "precio"],
            errores: {
              dormir: "Un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad.",
              novela: "Los niños aprenden de memoria la Palabra, y así la guardan en el corazón.",
              precio: "La alabanza de los niños tiene poder delante de Dios.",
            },
            apoyo: "La alabanza de los niños tiene poder delante de Dios",
            ref: "Salmos 8:2",
            explica: "Un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad, y la alabanza de los niños tiene poder delante de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué manera de servir corresponde a cada edad? Lleva cada frase a su grupo.",
            grupos: ["Los más pequeños", "Los escolares", "Los preadolescentes"],
            frases: [
              { texto: "Ayudar a ordenar", grupo: 0 },
              { texto: "Repartir materiales", grupo: 0 },
              { texto: "Saludar a los que llegan", grupo: 0 },
              { texto: "Leer un versículo", grupo: 1 },
              { texto: "Orar en voz alta", grupo: 1 },
              { texto: "Ayudar en una obra de teatro", grupo: 1 },
              { texto: "Ayudar con los más pequeños junto a un adulto", grupo: 2 },
              { texto: "Servir en la tecnología", grupo: 2 },
            ],
            apoyo: "Cada edad tiene maneras reales de servir",
            ref: "1 Timoteo 4:12",
            explica: "Los más pequeños pueden ayudar a ordenar, repartir materiales y saludar; los escolares, leer un versículo, orar en voz alta o ayudar en la alabanza o en una obra de teatro; y los preadolescentes, ayudar con los más pequeños junto a un adulto o servir en la tecnología.",
          },
          {
            consigna: "¿A qué edad le das cada tarea en tu iglesia? Lleva cada frase a su grupo.",
            grupos: ["Los más pequeños", "Los escolares", "Los preadolescentes"],
            frases: [
              { texto: "Dar la bienvenida a los que llegan a la clase", grupo: 0 },
              { texto: "Ordenar las sillas al terminar", grupo: 0 },
              { texto: "Repartir los lápices y las hojas", grupo: 0 },
              { texto: "Ayudar en la alabanza", grupo: 1 },
              { texto: "Leer el versículo del día", grupo: 1 },
              { texto: "Orar en voz alta por la clase", grupo: 1 },
              { texto: "Servir en un proyecto de ayuda a otros", grupo: 2 },
              { texto: "Cuidar a los pequeños junto a un adulto", grupo: 2 },
            ],
            apoyo: "Los preadolescentes: ayudar con los más pequeños junto a un adulto, servir en la tecnología o en proyectos de ayuda a otros",
            ref: "1 Timoteo 4:12",
            explica: "Los más pequeños saludan, ordenan y reparten materiales; los escolares leen un versículo, oran en voz alta o ayudan en la alabanza; y los preadolescentes ayudan con los más pequeños junto a un adulto o sirven en proyectos de ayuda a otros.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un niño que sirve y es tomado en serio siente que pertenece a la iglesia",
            ref: "1 Timoteo 4:12",
            clave: {
              id: "pr-ninez-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tarea real podría tener un niño en tu iglesia este mes? Da un ejemplo para su edad y di por qué importa.",
              ideas: [
                { id: "tarea", peso: 50, texto: "Una tarea real según su edad: ordenar, repartir materiales o saludar; leer un versículo u orar en voz alta; ayudar con los pequeños junto a un adulto o servir en la tecnología.", formas: ["orden*", "repart*", "salud*", "dar la bienvenida", "leer (un|el) versiculo", "voz alta", "alabanza", "teatro", "tecnolog*", "proyecto*", "con los pequenos", "junto a un adulto"] },
                { id: "pertenece", peso: 50, texto: "Porque un niño que sirve y es tomado en serio siente que pertenece a la iglesia: no es un espectador.", formas: ["pertenec*", "parte de la iglesia", "tomado en serio", "en serio", "espectador*"] },
              ],
              modelo: "Un niño escolar podría leer el versículo del día o ayudar en la alabanza este mes. Importa porque un niño que sirve y es tomado en serio siente que pertenece a la iglesia: no es un espectador.",
            },
          },
          {
            apoyo: "Un niño que ora, adora y sirve no es un espectador: es parte de la iglesia",
            ref: "1 Timoteo 4:12",
            clave: {
              id: "pr-ninez-2-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que los niños van a la iglesia solo a escuchar historias. ¿Qué le respondes según la lección?",
              ideas: [
                { id: "puede", peso: 50, texto: "Un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad.", formas: ["orar", "oran", "adoracion", "adorar a dios", "adoran a dios", "de memoria", "memoriz*", "servir", "sirven", "guardar la palabra"] },
                { id: "ejemplo", peso: 50, texto: "Como Timoteo, los niños pueden ser ejemplo: un niño que ora, adora y sirve es parte de la iglesia.", formas: ["ejemplo", "timoteo", "parte de la iglesia", "espectador*", "pertenec*"] },
              ],
              errores: [
                { id: "solo-historias", texto: "La fe de un niño no es solo escuchar historias.", formas: ["tiene razon", "solo escuchar historias", "solo escuchan historias"], anula: "puede" },
              ],
              modelo: "Le respondo que la fe de un niño no es solo escuchar historias: un niño puede orar, adorar, aprender de memoria la Palabra y servir de verdad. Como Timoteo, los niños también pueden ser ejemplo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Niños en situaciones difíciles
    "ninez-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué cargas pesadas pueden traer algunos niños a la clase?", reverso: "La muerte de un padre, un divorcio, una mudanza, la migración o un abuso.", apoyo: "Algunos niños llegan a la clase con cargas muy pesadas" },
              { frente: "¿Cómo se presenta Dios en Salmos 68:5?", reverso: "Como «Padre de huérfanos y defensor de viudas».", apoyo: "Dios se presenta como «Padre de huérfanos y defensor de viudas»" },
              { frente: "¿Qué necesita saber el niño que sufre?", reverso: "Que Dios está cerca, y verlo en adultos que se acercan.", apoyo: "El niño que sufre necesita saber que Dios está cerca, y verlo en adultos que se acercan" },
              { frente: "Si el maestro no puede resolverlo todo, ¿qué puede ser para el niño?", reverso: "Un lugar seguro.", apoyo: "El maestro no puede resolverlo todo, pero puede ser un lugar seguro" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué sentimientos del niño que sufre se aceptan al escucharlo?", reverso: "La tristeza, el enojo o el miedo.", apoyo: "Escucharlo sin apurarlo y aceptar lo que siente: tristeza, enojo o miedo" },
              { frente: "¿Qué advirtió Jesús en Mateo 18:10?", reverso: "«Mirad que no menospreciéis a uno de estos pequeños».", apoyo: "Jesús advirtió: «Mirad que no menospreciéis a uno de estos pequeños»" },
              { frente: "Si un niño cuenta un abuso, ¿qué no se le promete?", reverso: "Guardar el secreto.", apoyo: "no le prometas guardar el secreto" },
              { frente: "¿Qué le dio David a Mefi-boset, que era lisiado de los pies?", reverso: "Un lugar a su mesa: «tú comerás siempre a mi mesa».", apoyo: "y le dio un lugar a su mesa: «tú comerás siempre a mi mesa»" },
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
            consigna: "Sobre los niños que llegan con cargas pesadas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un divorcio o una mudanza pueden ser cargas muy pesadas para un niño.", verdad: true, explica: "Algunos niños llegan a la clase con cargas muy pesadas: la muerte de un padre, un divorcio, una mudanza, la separación de la familia por la migración o un abuso.", apoyo: "Algunos niños llegan a la clase con cargas muy pesadas: la muerte de un padre, un divorcio, una mudanza, la separación de la familia por la migración o un abuso" },
              { texto: "Un niño que sufre puede sentir tristeza, enojo o miedo.", verdad: true, explica: "Por eso se le escucha sin apurarlo y se acepta lo que siente: tristeza, enojo o miedo.", apoyo: "aceptar lo que siente: tristeza, enojo o miedo" },
              { texto: "El maestro puede y debe resolver todas las cargas de un niño.", verdad: false, explica: "El maestro no puede resolverlo todo, pero puede ser un lugar seguro.", apoyo: "El maestro no puede resolverlo todo, pero puede ser un lugar seguro" },
            ],
          },
          {
            consigna: "Sobre el niño que sufre: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La separación de la familia por la migración es una de las cargas que puede traer un niño.", verdad: true, explica: "Es una de las cargas muy pesadas con las que algunos niños llegan a la clase.", apoyo: "la separación de la familia por la migración" },
              { texto: "Si un niño siente enojo por su dolor, el maestro le pide que no lo sienta.", verdad: false, explica: "Al niño que sufre se le escucha sin apurarlo y se acepta lo que siente: tristeza, enojo o miedo.", apoyo: "Escucharlo sin apurarlo y aceptar lo que siente: tristeza, enojo o miedo" },
              { texto: "Un niño difícil o diferente sobra en la clase.", verdad: false, explica: "Ningún niño sobra: tampoco el que es difícil ni el que es diferente.", apoyo: "Ningún niño sobra: tampoco el que es difícil ni el que es diferente", ref: "Mateo 18:10" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El maestro acompaña al niño que sufre escuchándolo, diciendo la verdad con sencillez, manteniendo sus rutinas, trabajando con su familia, orando y pidiendo ayuda profesional cuando hace falta",
            ref: "Salmos 34:18",
            situacion: "Eres maestro de la clase de niños. Desde hace unas semanas, Mateo, de 8 años, llega callado y triste: sus padres se están divorciando.",
            escenas: [
              {
                id: "e1",
                narra: "Al terminar la clase, Mateo se queda atrás y empieza a contarte lo que pasa en su casa.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas sin apurarlo y aceptas lo que siente.", valor: 2, explica: "Al niño que sufre se le escucha sin apurarlo y se acepta lo que siente: tristeza, enojo o miedo.", siguiente: "e2" },
                  { texto: "Le dices que no esté triste, porque eso no le agrada a Dios.", valor: 0, explica: "Se acepta lo que siente el niño: tristeza, enojo o miedo.", siguiente: "e1b" },
                  { texto: "Lo escuchas un rato, pero lo apuras porque ya te tienes que ir.", valor: 1, explica: "Escucharlo está bien, pero sin apurarlo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Mateo baja la cabeza y deja de hablar.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Te sientas a su lado y lo invitas a contarte lo que siente.", valor: 2, explica: "Se escucha al niño sin apurarlo y se acepta lo que siente: necesita ver que Dios está cerca en adultos que se acercan.", siguiente: "e2" },
                  { texto: "Lo mandas a jugar con los demás, para que se olvide del tema.", valor: 0, explica: "El niño que sufre necesita saber que Dios está cerca, y verlo en adultos que se acercan.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Quieres ayudarlo más durante la semana.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con sus padres y oras con él: Dios lo ama y está cerca.", valor: 2, explica: "Se trabaja con sus padres o con quienes lo cuidan, y no a sus espaldas; y se ora con él, recordándole que Dios lo ama y está cerca." },
                  { texto: "Lo aconsejas a solas sobre el divorcio, sin decirles nada a sus padres.", valor: 0, explica: "Se trabaja con sus padres o con quienes lo cuidan, y no a sus espaldas." },
                  { texto: "Oras con él cada domingo, pero no hablas con sus padres.", valor: 1, explica: "Orar con él es bueno; también se trabaja con sus padres, y no a sus espaldas." },
                ],
              },
              {
                id: "e3",
                narra: "Pasan los meses, y la tristeza de Mateo no pasa: ya casi no quiere jugar ni estudiar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Con sus padres, buscan ayuda profesional para él.", valor: 2, explica: "Se pide ayuda profesional cuando el dolor no pasa o afecta su vida." },
                  { texto: "Esperas a que se le pase solo, sin decirles nada a sus padres.", valor: 0, explica: "Cuando el dolor no pasa o afecta su vida, se pide ayuda profesional, junto con sus padres." },
                  { texto: "Sigues orando con él, pero sin buscar ninguna otra ayuda.", valor: 1, explica: "Orar con él es bueno; y cuando el dolor no pasa o afecta su vida, también se pide ayuda profesional." },
                ],
              },
            ],
          },
          {
            apoyo: "Mantener las rutinas de la clase, que le dan seguridad",
            ref: "Salmos 68:5",
            situacion: "Eres maestra de la clase de niños. Valentina, de 6 años, perdió a su papá hace un mes, y ahora su abuela la trae a la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Valentina te pregunta: ¿Mi papá va a volver?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le dices la verdad con palabras sencillas y con ternura.", valor: 2, explica: "Se dice la verdad con palabras sencillas, sin inventar explicaciones.", siguiente: "e2" },
                  { texto: "Le dices que su papá se fue de viaje y que pronto volverá.", valor: 0, explica: "Se dice la verdad con palabras sencillas, sin inventar explicaciones.", siguiente: "e1b" },
                  { texto: "Le dices la verdad, pero de prisa, y sigues con la clase.", valor: 1, explica: "Decir la verdad está bien; también se la escucha sin apurarla.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A la semana, Valentina te dice: Mi papá todavía no volvió de su viaje.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Con su abuela, le dicen la verdad con palabras sencillas.", valor: 2, explica: "Se dice la verdad con palabras sencillas, sin inventar explicaciones, y se trabaja con quienes la cuidan.", siguiente: "e2" },
                  { texto: "Le inventas otra explicación, para que no se ponga triste.", valor: 0, explica: "Se dice la verdad, sin inventar explicaciones.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Valentina llora a veces en la clase, y los otros niños no saben qué hacer.",
                pregunta: "¿Qué haces con la clase?",
                opciones: [
                  { texto: "Mantienes las rutinas de la clase, que le dan seguridad.", valor: 2, explica: "Mantener las rutinas de la clase le da seguridad al niño que sufre." },
                  { texto: "Suspendes la clase cada vez que llora, hasta que se calme.", valor: 0, explica: "Las rutinas de la clase le dan seguridad: se mantienen." },
                  { texto: "Sigues la clase igual, sin acercarte a ella en ningún momento.", valor: 1, explica: "Mantener las rutinas está bien, pero el niño que sufre necesita ver que Dios está cerca en adultos que se acercan." },
                ],
              },
              {
                id: "e3",
                narra: "Su abuela te pregunta cómo puede ayudarla en casa.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que oren juntas y le recuerde que Dios la ama y está cerca.", valor: 2, explica: "Se ora con el niño y se le recuerda que Dios lo ama y está cerca: Dios se presenta como «Padre de huérfanos»." },
                  { texto: "Que no le hable más de su papá, para que lo olvide más rápido.", valor: 0, explica: "Al niño se le escucha y se acepta lo que siente: tristeza, enojo o miedo." },
                  { texto: "Que la deje llorar sola en su cuarto, hasta que se le pase.", valor: 0, explica: "El niño que sufre necesita saber que Dios está cerca, y verlo en adultos que se acercan." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un niño de 9 años te dice después de la clase: Un adulto me hace daño, pero no le digas a nadie, por favor.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le crees, le agradeces que te lo contó y no le prometes el secreto.", bien: true, explica: "Si un niño cuenta un abuso, se le cree, se le agradece que lo contó y no se le promete guardar el secreto." },
              { texto: "Le prometes que no se lo dirás a nadie, para que siga confiando en ti.", explica: "No se le promete guardar el secreto: se avisa de inmediato al responsable del ministerio y a las autoridades." },
              { texto: "Le haces muchas preguntas, para saber con detalle todo lo que pasó.", explica: "No se le hacen muchas preguntas ni se investiga por cuenta propia." },
              { texto: "Le dices que eso no puede ser, y que no invente cosas de los adultos.", explica: "Si un niño cuenta un abuso, se le cree." },
            ],
            apoyo: "Créele, agradécele que te lo contó y no le prometas guardar el secreto",
            explica: "Si un niño cuenta un abuso, se le cree, se le agradece que lo contó y no se le promete secreto; no se le hacen muchas preguntas, y se avisa de inmediato al responsable del ministerio y, como pide la ley en Texas, a las autoridades.",
          },
          {
            caso: "Tu ayudante en la clase te dice: Una niña me contó que alguien la lastima. ¿Investigo yo primero si es verdad?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no investigue: que avise de inmediato al responsable y a las autoridades.", bien: true, explica: "No se investiga por cuenta propia: se avisa de inmediato al responsable del ministerio y, como pide la ley en Texas, a las autoridades." },
              { texto: "Que sí: que hable primero con toda la familia de la niña para averiguar si es cierto.", explica: "No se investiga por cuenta propia: se avisa de inmediato al responsable del ministerio y a las autoridades." },
              { texto: "Que espere unas semanas, a ver si la niña lo vuelve a contar con más detalles.", explica: "Se avisa de inmediato, y no se le hacen muchas preguntas a la niña." },
              { texto: "Que lo guarden en secreto entre ustedes, para no meter a la iglesia en problemas.", explica: "Lo que cuenta un niño sobre un abuso no se guarda en secreto: se avisa de inmediato." },
            ],
            apoyo: "No le hagas muchas preguntas ni investigues por tu cuenta: avisa de inmediato al responsable del ministerio y, como pide la ley en Texas, a las autoridades",
            explica: "Si un niño cuenta un abuso, no se investiga por cuenta propia: se avisa de inmediato al responsable del ministerio y, como pide la ley en Texas, a las autoridades. Lo verás con detalle en la materia Protección de menores.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a incluir a un niño con discapacidad o no lo ayuda? Lleva cada frase a su grupo.",
            grupos: ["Lo incluye", "No lo incluye"],
            frases: [
              { texto: "Hablar con los padres para conocer lo que necesita", grupo: 0 },
              { texto: "Adaptar el espacio, los materiales y el tiempo", grupo: 0 },
              { texto: "Asignarle, si hace falta, un adulto que lo acompañe", grupo: 0 },
              { texto: "Enseñar a los demás niños a recibirlo con respeto", grupo: 0 },
              { texto: "Dejarlo fuera de la clase para que no interrumpa", grupo: 1, explica: "Ningún niño sobra: la iglesia hace lugar en su mesa a los niños con discapacidad." },
              { texto: "Dar la clase igual, sin adaptar nada para él", grupo: 1 },
              { texto: "Pedir a los demás niños que no se le acerquen", grupo: 1 },
            ],
            apoyo: "La iglesia también hace lugar en su mesa a los niños con discapacidad",
            ref: "Lucas 14:13",
            explica: "Para incluir a un niño con discapacidad se habla con sus padres, se adaptan el espacio, los materiales y el tiempo, se le asigna un adulto si hace falta y se enseña a los demás a recibirlo con respeto.",
          },
          {
            consigna: "¿Así se le hace lugar a un niño con discapacidad o así se le deja de lado? Lleva cada frase a su grupo.",
            grupos: ["Así se le hace lugar", "Así se le deja de lado"],
            frases: [
              { texto: "Preguntar a sus padres qué necesita el niño", grupo: 0 },
              { texto: "Darle más tiempo para terminar la actividad", grupo: 0 },
              { texto: "Poner a un adulto a su lado si hace falta", grupo: 0 },
              { texto: "Decirles a sus padres que no lo traigan más", grupo: 1 },
              { texto: "Dejarlo solo en un rincón del salón", grupo: 1 },
              { texto: "Reírse de él cuando se equivoca", grupo: 1, explica: "Jesús advirtió: «Mirad que no menospreciéis a uno de estos pequeños»." },
            ],
            apoyo: "Adaptar el espacio, los materiales y el tiempo",
            ref: "Lucas 14:13",
            explica: "Al niño con discapacidad se le hace lugar hablando con sus padres, adaptando el espacio, los materiales y el tiempo, y poniendo un adulto a su lado si hace falta: ningún niño sobra.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué le prometió David a Mefi-boset? Toca las palabras que lo dicen.",
            texto: "No tengas temor, porque yo a la verdad [[haré contigo misericordia]]",
            apoyo: "David recibió a Mefi-boset, que era lisiado de los pies",
            ref: "2 Samuel 9:7",
            explica: "David recibió a Mefi-boset, que era lisiado de los pies, y le dijo: «No tengas temor, porque yo a la verdad haré contigo misericordia». Así la iglesia hace lugar en su mesa a los niños con discapacidad.",
          },
          {
            consigna: "Según le dijo David a Mefi-boset, ¿dónde comería siempre? Toca las palabras que lo dicen.",
            texto: "tú comerás siempre [[a mi mesa]]",
            apoyo: "La iglesia también hace lugar en su mesa a los niños con discapacidad",
            ref: "2 Samuel 9:7",
            explica: "David le dio a Mefi-boset un lugar a su mesa: «tú comerás siempre a mi mesa». La iglesia también hace lugar en su mesa a los niños con discapacidad.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Y, como David con Mefi-boset, la iglesia hace lugar en su mesa a los niños con discapacidad",
            ref: "2 Samuel 9:7",
            clave: {
              id: "pr-ninez-2-6-a7-1",
              tipo: "corta",
              pregunta: "Como David con Mefi-boset, ¿qué hace la iglesia con los niños con discapacidad? Da un ejemplo de cómo incluirlos.",
              ideas: [
                { id: "mesa", peso: 50, texto: "La iglesia les hace lugar en su mesa, con misericordia: ningún niño sobra.", formas: ["lugar en (su|la) mesa", "(hace|hacer|haga|da|dar|dan|tiene|tienen) lugar", "un lugar", "su mesa", "a la mesa", "misericordia", "ningun nino sobra", "no sobra", "los recibe", "los recibimos"] },
                { id: "adaptar", peso: 50, texto: "Por ejemplo: hablar con los padres, adaptar el espacio, los materiales y el tiempo, darle un adulto que lo acompañe o enseñar a los demás a recibirlo con respeto.", formas: ["habl* con (los|sus) padres", "adap*", "el espacio", "los materiales", "un adulto", "acompan*", "con respeto", "lo que necesita"] },
              ],
              modelo: "Como David, la iglesia les hace lugar en su mesa con misericordia: ningún niño sobra. Por ejemplo, habla con los padres para conocer lo que el niño necesita y adapta el espacio, los materiales y el tiempo.",
            },
          },
          {
            apoyo: "Pedir ayuda profesional cuando el dolor no pasa o afecta su vida",
            ref: "Salmos 34:18",
            clave: {
              id: "pr-ninez-2-6-a7-2",
              tipo: "corta",
              pregunta: "¿Cuándo pide el maestro ayuda profesional para un niño que sufre, y por qué no lo hace todo él solo?",
              ideas: [
                { id: "cuando", peso: 50, texto: "Cuando el dolor no pasa o afecta su vida.", formas: ["dolor no pasa", "dolor no se", "tristeza no pasa", "no se le pasa", "no se va", "no se quita", "dolor (sigue|continua|dura)", "afecta su vida", "afecta (su|la) vida", "dura mucho", "sigue el dolor"] },
                { id: "terapeuta", peso: 50, texto: "Porque no es terapeuta, y no tiene que serlo: es un adulto seguro que escucha, ora y avisa a tiempo.", formas: ["no (es|soy|somos|eres) terapeuta*", "no (es|soy|somos|eres) psicolog*", "no (es|soy|somos|eres) medico", "adulto seguro", "avisa a tiempo", "no puede resolver* todo", "no puede todo"] },
              ],
              modelo: "Pide ayuda profesional cuando el dolor del niño no pasa o afecta su vida. No lo hace todo solo porque no es terapeuta, y no tiene que serlo: es un adulto seguro que escucha, ora y avisa a tiempo.",
            },
          },
        ],
      },
    ],
  },
};
