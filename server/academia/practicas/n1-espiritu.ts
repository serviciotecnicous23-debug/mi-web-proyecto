// Las prácticas de las lecciones de «El Espíritu Santo en mi vida» (Nivel 1). Hechas con el modelo de n1-salvacion.ts:
// cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_ESPIRITU: PracticasMateria = {
  materia: "n1-espiritu",
  mision: {
    titulo: "Dios cerca de ti",
    intro: "Una amiga que acaba de creer te pregunta quién es el Espíritu Santo y qué hace en la vida del creyente. Repasa las cuatro lecciones para explicarle quién es Él, cómo obra en ti, qué pasó en Pentecostés y cómo andar con Él cada día.",
    cierre: "Ya puedes explicar que el Espíritu Santo es una Persona divina, cómo obra en el creyente, para quién es la promesa de Pentecostés y cómo andar en el Espíritu cada día.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Quién es el Espíritu Santo
    "n1-espiritu-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quién describe la palabra Consolador?", reverso: "A alguien que es llamado a nuestro lado para ayudarnos.", apoyo: "La palabra describe a alguien que es llamado a nuestro lado para ayudarnos." },
              { frente: "¿Qué hace el Espíritu que muestra que es una Persona?", reverso: "Enseña, recuerda, guía y testifica.", apoyo: "el Espíritu enseña, recuerda, guía y testifica" },
              { frente: "¿Qué le dijo Pedro a Ananías cuando mintió al Espíritu Santo?", reverso: "Que no había mentido a los hombres, sino a Dios.", apoyo: "Pedro le dijo que no había mentido a los hombres, sino a Dios" },
              { frente: "¿En quién vive hoy el Espíritu Santo?", reverso: "En todo creyente.", apoyo: "hoy vive en todo creyente" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué prometió Jesús a sus discípulos?", reverso: "Otro Consolador: el Espíritu Santo.", apoyo: "Jesús prometió a sus discípulos otro Consolador." },
              { frente: "¿Por qué sabemos que el Espíritu Santo no es una fuerza?", reverso: "Porque se le puede entristecer, y una fuerza no se entristece.", apoyo: "Una fuerza no se entristece; una persona, sí." },
              { frente: "¿Qué enseña la doctrina de la Trinidad?", reverso: "Que hay un solo Dios en tres Personas: el Padre, el Hijo y el Espíritu Santo.", apoyo: "un solo Dios en tres Personas" },
              { frente: "¿Qué dice Pablo de nuestro cuerpo?", reverso: "Que es templo del Espíritu Santo.", apoyo: "nuestro cuerpo es templo del Espíritu Santo" },
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
            consigna: "¿El Espíritu Santo es una Persona o una fuerza? Di si cada frase es verdad o es un error.",
            afirmaciones: [
              { texto: "El Espíritu Santo es una fuerza o una energía que sale de Dios.", verdad: false, explica: "La Biblia enseña que el Espíritu Santo es una Persona: enseña, recuerda, guía y testifica.", apoyo: "La Biblia enseña algo mucho más hermoso: es una Persona, es Dios, y vive en cada creyente.", ref: "Juan 14:16-17" },
              { texto: "Al Espíritu Santo se le puede entristecer.", verdad: true, explica: "Lo dice Efesios 4:30. Una fuerza no se entristece; una persona, sí.", apoyo: "se le puede entristecer (Efesios 4:30)", ref: "Efesios 4:30" },
              { texto: "El Espíritu Santo reparte dones como Él quiere.", verdad: true, explica: "Lo dice 1 Corintios 12:11: el Espíritu decide, como lo hace una persona.", apoyo: "reparte dones como Él quiere (1 Corintios 12:11)", ref: "1 Corintios 12:11" },
            ],
          },
          {
            consigna: "¿El Espíritu Santo es una Persona o una fuerza? Di si cada frase es verdad o es un error.",
            afirmaciones: [
              { texto: "La palabra Consolador describe a alguien que es llamado a nuestro lado para ayudarnos.", verdad: true, explica: "Jesús prometió otro Consolador: alguien que está a nuestro lado para ayudarnos.", apoyo: "La palabra describe a alguien que es llamado a nuestro lado para ayudarnos.", ref: "Juan 14:16" },
              { texto: "El Espíritu Santo es una energía, como la electricidad.", verdad: false, explica: "Una energía no enseña ni se entristece. Jesús habla del Espíritu como de una persona.", apoyo: "Jesús habla de Él como de una persona", ref: "Juan 14:16-17" },
              { texto: "El Espíritu Santo enseña y recuerda, como lo hace una persona.", verdad: true, explica: "Jesús dijo que el Espíritu nos enseñaría y nos recordaría sus palabras.", apoyo: "el Espíritu enseña, recuerda, guía y testifica", ref: "Juan 14:26" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "¿Cómo sabemos que el Espíritu Santo es Dios? Completa cada espacio con la palabra que falta.",
            texto: "Cuando Ananías mintió al Espíritu Santo, Pedro le dijo que no había mentido a los hombres, sino a [[Dios]]. Jesús mandó bautizar en el nombre del Padre, del Hijo y del Espíritu Santo: un solo Dios en tres [[Personas]].",
            distractores: ["Pedro", "fuerzas", "dioses"],
            errores: {
              Pedro: "Pedro también era un hombre. Mentirle al Espíritu Santo es mentirle a Dios.",
              fuerzas: "El Padre, el Hijo y el Espíritu Santo no son fuerzas: son tres Personas.",
              dioses: "No son tres dioses: es un solo Dios en tres Personas.",
            },
            apoyo: "Cuando Ananías mintió al Espíritu Santo, Pedro le dijo que no había mentido a los hombres, sino a Dios",
            ref: "Hechos 5:3-4; Mateo 28:19",
            explica: "Mentirle al Espíritu Santo es mentirle a Dios, y su nombre está junto al del Padre y del Hijo: el Espíritu Santo es Dios.",
          },
          {
            consigna: "¿Quién es el Espíritu Santo? Completa cada espacio con la palabra que falta.",
            texto: "Jesús mandó bautizar en el nombre del Padre, del [[Hijo]] y del Espíritu Santo: un solo [[Dios]] en tres Personas. Esta es la doctrina de la [[Trinidad]].",
            distractores: ["Ananías", "dioses", "fuerza"],
            errores: {
              "Ananías": "Ananías no va aquí: Jesús mandó bautizar en el nombre del Padre, del Hijo y del Espíritu Santo.",
              dioses: "No son tres dioses: es un solo Dios en tres Personas.",
              fuerza: "El Espíritu Santo no es una fuerza: es una Persona, y es Dios.",
            },
            apoyo: "un solo Dios en tres Personas. Esta es la doctrina de la Trinidad",
            ref: "Mateo 28:19",
            explica: "El Padre, el Hijo y el Espíritu Santo son un solo Dios en tres Personas: el Espíritu Santo es Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "¿En quién vive el Espíritu Santo? Una de estas frases tiene un error: tócala.",
            frases: [
              "Jesús dijo que el Espíritu moraría con sus discípulos y estaría en ellos.",
              "En el Antiguo Testamento, el Espíritu venía sobre algunas personas para tareas especiales.",
              "Hoy el Espíritu Santo vive solo en algunos creyentes especiales.",
              "Nuestro cuerpo es templo del Espíritu Santo.",
            ],
            malo: 2,
            correccion: "Hoy el Espíritu Santo vive en todo creyente.",
            apoyo: "En el Antiguo Testamento, el Espíritu venía sobre algunas personas para tareas especiales; hoy vive en todo creyente.",
            ref: "Juan 14:17; 1 Corintios 6:19",
            explica: "En el Antiguo Testamento el Espíritu venía sobre algunos para tareas especiales; hoy vive en cada creyente.",
          },
          {
            consigna: "¿Qué hace el Espíritu en el creyente? Una de estas frases tiene un error: tócala.",
            frases: [
              "El mismo Espíritu que levantó a Jesús de los muertos vive en el creyente.",
              "El Espíritu Santo es una idea lejana que no tiene que ver con tu vida diaria.",
              "El Espíritu Santo te consuela y te enseña la Palabra.",
              "El Espíritu Santo te da fuerzas para vivir como Jesús.",
            ],
            malo: 1,
            correccion: "El Espíritu Santo no es una idea lejana: es Dios cerca de ti.",
            apoyo: "El Espíritu Santo no es una idea lejana: es Dios cerca de ti.",
            ref: "Romanos 8:11",
            explica: "El Espíritu vive en el creyente: te consuela, te enseña y te da fuerzas. No estás solo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Te mudaste a otra ciudad por trabajo. No conoces a nadie y una noche te sientes muy solo.",
            pregunta: "¿Qué verdad de la lección te ayuda esa noche?",
            opciones: [
              { texto: "Dios está lejos: lo encontraré cuando vuelva a mi iglesia de antes.", explica: "El Espíritu Santo no es una idea lejana: vive en el creyente, también en esa ciudad nueva." },
              { texto: "No estoy solo: el Espíritu Santo vive en mí, me consuela y me da fuerzas.", bien: true, explica: "Es lo que enseña la lección: el Espíritu vive en el creyente, te consuela, te enseña la Palabra y te da fuerzas." },
              { texto: "El Espíritu solo acompaña a los pastores y a los creyentes más fuertes.", explica: "Eso se parece a lo que pasaba en el Antiguo Testamento, con algunas personas. Hoy el Espíritu vive en todo creyente." },
              { texto: "El Espíritu Santo es una fuerza que solo se siente en los cultos.", explica: "El Espíritu Santo no es una fuerza: es una Persona que vive en el creyente." },
            ],
            apoyo: "Él te consuela, te enseña la Palabra y te da fuerzas para vivir como Jesús.",
            ref: "Romanos 8:11",
            explica: "El Espíritu Santo vive en ti dondequiera que estés: te consuela, te enseña la Palabra y te da fuerzas.",
          },
          {
            caso: "Tu prima empezó a ir a la iglesia hace poco. Te dice: El Espíritu Santo vive en los pastores, pero no en gente sencilla como yo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es verdad: el Espíritu solo viene sobre algunas personas para tareas especiales.", explica: "Así era en el Antiguo Testamento. Hoy el Espíritu vive en todo creyente." },
              { texto: "Si crees en Jesús, el Espíritu vive en ti: tu cuerpo es su templo.", bien: true, explica: "Hoy el Espíritu vive en todo creyente, y Pablo dice que nuestro cuerpo es templo del Espíritu Santo." },
              { texto: "Tienes que esperar a ser más madura para que el Espíritu viva en ti.", explica: "El Espíritu no vive solo en los más maduros: vive en todo creyente." },
              { texto: "El Espíritu no vive en nadie: es una fuerza que Dios manda de vez en cuando.", explica: "El Espíritu Santo es una Persona, y Jesús dijo que estaría en sus discípulos." },
            ],
            apoyo: "Por eso Pablo dice que nuestro cuerpo es templo del Espíritu Santo (1 Corintios 6:19).",
            ref: "Juan 14:17; 1 Corintios 6:19",
            explica: "El Espíritu Santo no vive solo en algunos: vive en todo creyente, y su cuerpo es templo del Espíritu.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Una fuerza no se entristece; una persona, sí.",
            ref: "Efesios 4:30",
            clave: {
              id: "pr-n1-espiritu-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que el Espíritu Santo es una Persona y no una fuerza?",
              ideas: [
                { id: "hace", peso: 50, texto: "Hace lo que hace una persona: enseña, recuerda, guía y testifica, y reparte dones como Él quiere.", formas: ["ensen*", "recuerd*", "guia*", "testific*", "testimonio", "reparte*", "consol*", "consuel*", "ayud*", "decide*"] },
                { id: "triste", peso: 50, texto: "Se le puede entristecer, y una fuerza no se entristece.", formas: ["entristec*", "no se entristec*", "triste*", "sentimient*", "siente*"] },
              ],
              modelo: "Porque hace lo que hace una persona: enseña, recuerda, guía y testifica, y reparte dones como Él quiere. Además se le puede entristecer, y una fuerza no se entristece.",
            },
          },
          {
            apoyo: "Jesús habla de Él como de una persona",
            ref: "Juan 14:26",
            clave: {
              id: "pr-n1-espiritu-1-a6-2",
              tipo: "corta",
              pregunta: "Un compañero de trabajo dice que el Espíritu Santo es una energía. ¿Qué le explicas?",
              ideas: [
                { id: "persona", peso: 40, texto: "No es una energía: es una Persona.", formas: ["es una persona", "una persona", "es persona", "no es una (energia|fuerza|cosa)", "no es (energia|fuerza)", "es alguien"] },
                { id: "hace", peso: 30, texto: "Enseña, recuerda, guía y testifica, como una persona.", formas: ["ensen*", "recuerd*", "guia*", "testific*", "reparte*", "consol*", "consuel*", "ayud*"] },
                { id: "triste", peso: 30, texto: "Se le puede entristecer, y una energía no se entristece.", formas: ["entristec*", "no se entristec*", "triste*", "sentimient*", "siente*"] },
              ],
              modelo: "Le explico que el Espíritu Santo no es una energía, sino una Persona: enseña, recuerda, guía y testifica. Además, se le puede entristecer, y una energía no se entristece.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Su obra en el creyente
    "n1-espiritu-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Jesús, ¿de qué convence el Espíritu al mundo?", reverso: "De pecado, de justicia y de juicio.", apoyo: "Jesús dijo que el Espíritu convencería al mundo de pecado, de justicia y de juicio." },
              { frente: "¿Qué hace el Espíritu para llevar a alguien a Cristo?", reverso: "Le abre los ojos, le muestra su pecado y le presenta a Jesús como el único camino.", apoyo: "el Espíritu abre los ojos, muestra el pecado y presenta a Jesús como el único camino" },
              { frente: "¿Qué le asegura el Espíritu a nuestro espíritu?", reverso: "Que somos hijos de Dios.", apoyo: "Él da testimonio a nuestro espíritu de que somos sus hijos." },
              { frente: "¿Con qué se prueba una voz que dice venir del Espíritu?", reverso: "Con la Palabra que el Espíritu inspiró.", apoyo: "la prueba es siempre la Palabra que el Espíritu inspiró" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hizo el Espíritu en tu vida antes de que creyeras?", reverso: "Te mostró tu necesidad de Dios y te acercó a Jesús.", apoyo: "te mostró tu necesidad de Dios y te acercó a Jesús" },
              { frente: "¿Por qué evangelizamos orando?", reverso: "Porque es el Espíritu quien convence.", apoyo: "Por eso evangelizamos orando: es el Espíritu quien convence." },
              { frente: "¿Qué expresa llamar a Dios «Abba, Padre»?", reverso: "Cercanía y confianza.", apoyo: "una expresión de cercanía y de confianza" },
              { frente: "¿Cómo nos santifica el Espíritu?", reverso: "Transformándonos poco a poco a la imagen de Cristo.", apoyo: "transformándonos poco a poco a la imagen de Cristo" },
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
            caso: "Tu hermano no cree en Jesús. Muchas veces discutiste con él, tratando de ganarle con argumentos.",
            pregunta: "¿Qué haces ahora?",
            opciones: [
              { texto: "Busco argumentos más fuertes: si lo convenzo con la mente, va a creer.", explica: "Nadie llega a Cristo solo por su inteligencia: es el Espíritu quien abre los ojos." },
              { texto: "Le sigo hablando de Jesús y oro por él, porque es el Espíritu quien convence.", bien: true, explica: "Así lo enseña la lección: evangelizamos orando, porque el Espíritu muestra el pecado y presenta a Jesús." },
              { texto: "Dejo de hablarle de Jesús: si no ha creído ya, nunca va a creer.", explica: "El Espíritu sigue obrando: Él abre los ojos y presenta a Jesús. Por eso seguimos orando." },
              { texto: "Lo presiono todos los días hasta que diga que sí, aunque no entienda.", explica: "La presión no abre los ojos: es el Espíritu quien muestra el pecado y presenta a Jesús." },
            ],
            apoyo: "Por eso evangelizamos orando: es el Espíritu quien convence.",
            ref: "Juan 16:8",
            explica: "Hablamos de Jesús y oramos, porque solo el Espíritu abre los ojos, muestra el pecado y presenta a Jesús como el único camino.",
          },
          {
            caso: "Una compañera de trabajo te pregunta: ¿Por qué ahora eres creyente, si antes no te importaba Dios?",
            pregunta: "¿Qué le cuentas, según la lección?",
            opciones: [
              { texto: "Un día lo pensé bien y lo descubrí yo solo, con mi inteligencia.", explica: "Nadie llega a Cristo solo por su inteligencia: el Espíritu abre los ojos." },
              { texto: "El Espíritu Santo me mostró mi necesidad de Dios y me acercó a Jesús.", bien: true, explica: "Desde antes de creer, el Espíritu ya obraba: te mostró tu necesidad de Dios y te acercó a Jesús." },
              { texto: "Fue pura suerte: estuve en el lugar correcto en el momento justo.", explica: "No fue suerte: el Espíritu Santo ya estaba obrando en tu vida antes de que creyeras." },
              { texto: "Me convenció lo bien que hablaba el predicador, y nada más.", explica: "Es el Espíritu quien convence: Él abre los ojos y presenta a Jesús como el único camino." },
            ],
            apoyo: "Desde antes de creer, el Espíritu Santo ya estaba obrando en tu vida: te mostró tu necesidad de Dios y te acercó a Jesús.",
            ref: "Juan 16:8",
            explica: "Antes de que creyeras, el Espíritu ya obraba: te mostró tu necesidad de Dios y te acercó a Jesús.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada frase con lo que significa.",
            pares: [
              ["Nacer de nuevo", "Recibir la vida nueva que da el Espíritu"],
              ["El testimonio del Espíritu", "Él nos asegura que somos hijos de Dios"],
              ["Llamar a Dios «Abba, Padre»", "Hablarle con cercanía y confianza"],
            ],
            apoyo: "El Espíritu nos hace nacer de nuevo (Juan 3:5) y nos da la seguridad de ser hijos de Dios",
            ref: "Juan 3:5; Romanos 8:14-16",
            explica: "El Espíritu nos da vida nueva y nos asegura que somos hijos de Dios; por eso le hablamos a Dios como a un Padre cercano.",
          },
          {
            consigna: "Une cada pregunta con su respuesta, según la lección.",
            pares: [
              ["¿Quién nos hace nacer de nuevo, según Juan 3:5?", "El Espíritu Santo"],
              ["¿Qué testifica el Espíritu a nuestro espíritu?", "Que somos hijos de Dios"],
              ["¿Con qué palabras podemos llamar a Dios?", "«Abba, Padre»"],
            ],
            apoyo: "Por eso podemos llamar a Dios «Abba, Padre», una expresión de cercanía y de confianza.",
            ref: "Juan 3:5; Romanos 8:15-16",
            explica: "El Espíritu nos da vida nueva y la seguridad de ser hijos: por eso le decimos a Dios Padre, con confianza.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Viene del Espíritu o no? Lleva cada frase a su grupo.",
            grupos: ["Viene del Espíritu", "No viene del Espíritu"],
            frases: [
              { texto: "Una ayuda para entender la Biblia", grupo: 0 },
              { texto: "Una guía para tus decisiones, de acuerdo con la Biblia", grupo: 0 },
              { texto: "Una ayuda para orar cuando no sabes qué pedir", grupo: 0 },
              { texto: "Un cambio, poco a poco, a la imagen de Cristo", grupo: 0 },
              { texto: "Una voz que te dice algo contrario a la Biblia", grupo: 1, explica: "Una supuesta voz que contradice la Biblia no viene del Espíritu Santo." },
              { texto: "Un impulso a desobedecer la Palabra", grupo: 1, explica: "El Espíritu guía siempre de acuerdo con la Palabra que Él inspiró." },
            ],
            apoyo: "Una supuesta voz que contradice la Biblia no viene del Espíritu Santo.",
            ref: "Juan 16:13; 1 Juan 4:1",
            explica: "El Espíritu nos guía a la verdad y nunca contradice la Biblia: lo que va contra la Palabra no viene de Él.",
          },
          {
            consigna: "¿Lo hace el Espíritu o nunca lo hace? Lleva cada frase a su grupo.",
            grupos: ["Lo hace el Espíritu", "Nunca lo hace el Espíritu"],
            frases: [
              { texto: "Nos ayuda a entender la Palabra", grupo: 0 },
              { texto: "Nos guía en nuestras decisiones", grupo: 0 },
              { texto: "Nos guía a toda la verdad", grupo: 0 },
              { texto: "Contradice la Biblia que Él mismo inspiró", grupo: 1, explica: "El Espíritu nunca contradice lo que Él mismo inspiró en la Biblia." },
              { texto: "Nos guía en contra de la Palabra", grupo: 1, explica: "El Espíritu guía siempre de acuerdo con la Palabra que Él inspiró." },
            ],
            apoyo: "nunca contradice lo que Él mismo inspiró en la Biblia",
            ref: "Juan 16:13; 1 Juan 4:1",
            explica: "El Espíritu guía siempre de acuerdo con la Palabra: por eso todo lo que escuchamos se prueba con la Biblia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "¿Cómo nos guía el Espíritu? Una de estas frases tiene un error: tócala.",
            frases: [
              "El Espíritu nos ayuda a entender la Palabra.",
              "El Espíritu nos guía en nuestras decisiones.",
              "Si una voz me dice algo contrario a la Biblia, debo obedecerla.",
              "Juan enseña a probar los espíritus.",
            ],
            malo: 2,
            correccion: "Una supuesta voz que contradice la Biblia no viene del Espíritu Santo.",
            apoyo: "Juan enseña a probar los espíritus (1 Juan 4:1), y la prueba es siempre la Palabra que el Espíritu inspiró.",
            ref: "1 Juan 4:1",
            explica: "El Espíritu nunca contradice lo que Él mismo inspiró: toda voz se prueba con la Biblia.",
          },
          {
            consigna: "¿Cómo obra el Espíritu en nosotros? Una de estas frases tiene un error: tócala.",
            frases: [
              "El Espíritu nos ayuda a orar cuando no sabemos qué pedir.",
              "A veces el Espíritu nos pide hacer lo contrario de lo que dice la Biblia.",
              "El Espíritu nos transforma poco a poco a la imagen de Cristo.",
              "Dejarse guiar por el Espíritu es una decisión de cada día.",
            ],
            malo: 1,
            correccion: "El Espíritu nunca contradice lo que Él mismo inspiró en la Biblia.",
            apoyo: "El Espíritu nos ayuda a entender la Palabra, nos guía en nuestras decisiones y nunca contradice lo que Él mismo inspiró en la Biblia.",
            ref: "Juan 16:13",
            explica: "El Espíritu inspiró la Biblia y guía siempre de acuerdo con ella.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Nadie llega a Cristo solo por su inteligencia: el Espíritu abre los ojos, muestra el pecado y presenta a Jesús como el único camino.",
            ref: "Juan 16:8",
            clave: {
              id: "pr-n1-espiritu-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué oramos cuando le hablamos de Jesús a alguien?",
              ideas: [
                { id: "convence", peso: 60, texto: "Porque es el Espíritu quien convence: abre los ojos, muestra el pecado y presenta a Jesús.", formas: ["convenc*", "abr* (los|sus) ojos", "muestr* (el|su|sus) pecado*", "present* a (jesus|cristo)", "acerc* a (jesus|cristo)", "lleva* a (jesus|cristo)", "unico camino"] },
                { id: "no-solo", peso: 40, texto: "Nadie llega a Cristo solo por su inteligencia ni por nuestros argumentos.", formas: ["nadie llega", "nadie (puede|viene|cree)", "no (llega|llegan|llegamos|viene|vienen)", "solo por (su|la|nuestra|nuestras|nuestros|sus) (inteligencia|palabras|argumentos|fuerzas)", "no (por|con) (su|la|nuestra|nuestras|nuestros|sus|mis) (inteligencia|palabras|argumentos|fuerzas)", "no (podemos|puedo|puede) convencer", "no (nosotros|yo)"], negativa: true },
              ],
              modelo: "Porque nadie llega a Cristo solo por su inteligencia. Es el Espíritu quien convence de pecado, abre los ojos y presenta a Jesús como el único camino.",
            },
          },
          {
            apoyo: "El Espíritu Santo convence de pecado",
            ref: "Juan 16:8",
            clave: {
              id: "pr-n1-espiritu-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué hace el Espíritu Santo para llevar a una persona a Cristo?",
              ideas: [
                { id: "pecado", peso: 50, texto: "Le abre los ojos y le muestra su pecado: convence de pecado.", formas: ["convenc*", "abr* (los|sus) ojos", "muestr* (el|su|sus) pecado*", "pecado*", "necesidad de dios", "necesita a dios"] },
                { id: "jesus", peso: 50, texto: "Le presenta a Jesús como el único camino y lo acerca a Él.", formas: ["present* a (jesus|cristo)", "unico camino", "el camino", "acerc*", "muestr* a (jesus|cristo)"] },
              ],
              modelo: "El Espíritu Santo abre los ojos de la persona y le muestra su pecado y su necesidad de Dios. Luego le presenta a Jesús como el único camino.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. La promesa del poder
    "n1-espiritu-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Antes de subir al cielo, ¿qué les mandó Jesús hacer a sus discípulos?", reverso: "Esperar: primero tenían que recibir poder.", apoyo: "Les dijo que esperaran: primero tenían que recibir poder." },
              { frente: "¿Qué nombre le dio Jesús a lo que iban a recibir?", reverso: "Bautismo con el Espíritu Santo.", apoyo: "Jesús llamó bautismo con el Espíritu Santo a lo que iban a recibir" },
              { frente: "En Pentecostés, ¿qué hicieron todos al ser llenos del Espíritu?", reverso: "Hablaron en otras lenguas, según el Espíritu les daba que hablasen.", apoyo: "hablaron en otras lenguas, según el Espíritu les daba que hablasen" },
              { frente: "¿Para quién es la promesa del Espíritu?", reverso: "Para todo creyente, también hoy.", apoyo: "es para todo creyente, también hoy" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué es el poder del Espíritu?", reverso: "Para servir y testificar de Cristo con valentía, no para lucirse.", apoyo: "El poder del Espíritu no es para lucirse, sino para servir y testificar de Cristo con valentía." },
              { frente: "¿Cuándo llegó el día de Pentecostés?", reverso: "Unos diez días después de que Jesús subió al cielo.", apoyo: "Unos diez días después de que Jesús subió al cielo" },
              { frente: "¿Cuántas personas recibieron la palabra de Pedro en Pentecostés?", reverso: "Unas tres mil.", apoyo: "unas tres mil personas recibieron su palabra" },
              { frente: "¿A quiénes dará el Padre el Espíritu Santo, según Jesús?", reverso: "A los que se lo pidan.", apoyo: "el Padre celestial dará el Espíritu Santo a los que se lo pidan" },
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
            consigna: "¿Qué les mandó Jesús antes de subir al cielo? Completa cada espacio con la palabra que falta.",
            texto: "Antes de subir al cielo, Jesús no mandó a sus discípulos a predicar de inmediato: les dijo que debían [[esperar]]. Primero tenían que recibir [[poder]] para ser sus [[testigos]].",
            distractores: ["predicar", "fama", "jueces"],
            errores: {
              predicar: "Jesús no los mandó a predicar de inmediato: primero tenían que esperar y recibir poder.",
              fama: "El poder del Espíritu no es para lucirse: es para servir y testificar de Cristo.",
              jueces: "Jesús no dijo jueces: dijo que serían sus testigos.",
            },
            apoyo: "Jesús prometió el bautismo con el Espíritu Santo para darnos poder y ser sus testigos",
            ref: "Hechos 1:4-5, 8",
            explica: "Jesús les mandó esperar: primero tenían que recibir el poder del Espíritu para ser sus testigos.",
          },
          {
            consigna: "¿Para qué es el poder del Espíritu? Completa cada espacio con la palabra que falta.",
            texto: "Jesús llamó [[bautismo]] con el Espíritu Santo a lo que iban a recibir. El poder del Espíritu no es para lucirse, sino para [[servir]] y testificar de Cristo. Serían sus testigos desde Jerusalén hasta lo último de la [[tierra]].",
            distractores: ["juicio", "lucirse", "ciudad"],
            errores: {
              juicio: "Jesús no habló de juicio: llamó bautismo con el Espíritu Santo a lo que iban a recibir.",
              lucirse: "Al revés: el poder del Espíritu no es para lucirse, sino para servir.",
              ciudad: "Jesús no habló de una sola ciudad: dijo desde Jerusalén hasta lo último de la tierra.",
            },
            apoyo: "Jesús llamó bautismo con el Espíritu Santo a lo que iban a recibir, y explicó para qué: para ser sus testigos desde Jerusalén hasta lo último de la tierra",
            ref: "Hechos 1:5, 8",
            explica: "Jesús prometió el bautismo con el Espíritu Santo. Su poder es para servir y testificar de Cristo hasta lo último de la tierra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que pasó el día de Pentecostés, del primero al último.",
            pasos: [
              "En la fiesta de Pentecostés, los discípulos estaban reunidos",
              "Vino un estruendo como de un viento recio",
              "Aparecieron lenguas como de fuego sobre cada uno",
              "Todos fueron llenos del Espíritu Santo y hablaron en otras lenguas",
              "Pedro predicó con poder",
              "Unas tres mil personas recibieron la palabra de Pedro",
            ],
            apoyo: "Vino un estruendo como de un viento recio, aparecieron lenguas como de fuego sobre cada uno, y todos fueron llenos del Espíritu Santo",
            ref: "Hechos 2:1-4, 41",
            explica: "Primero vinieron el estruendo y las lenguas como de fuego; luego todos fueron llenos y hablaron en otras lenguas. Ese mismo día Pedro predicó y unas tres mil personas recibieron su palabra.",
          },
          {
            consigna: "Ordena desde la promesa de Jesús hasta la predicación de Pedro.",
            pasos: [
              "Jesús prometió poder y les dijo que esperaran",
              "Jesús subió al cielo",
              "Unos diez días después, llegó la fiesta de Pentecostés",
              "Todos fueron llenos del Espíritu Santo y hablaron en otras lenguas",
              "Pedro predicó con poder ese mismo día",
            ],
            apoyo: "Unos diez días después de que Jesús subió al cielo, en la fiesta de Pentecostés, los discípulos estaban reunidos.",
            ref: "Hechos 1:4-5; 2:1-4",
            explica: "Jesús prometió poder y mandó esperar antes de subir al cielo. Unos diez días después, en Pentecostés, todos fueron llenos del Espíritu y Pedro predicó con poder.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "¿Para quién es la promesa del Espíritu? Di si cada frase es verdad o es un error.",
            afirmaciones: [
              { texto: "La promesa del Espíritu fue solo para los apóstoles.", verdad: false, explica: "La promesa del Espíritu no fue solo para los apóstoles: es para todo creyente, también hoy.", apoyo: "La promesa del Espíritu no fue solo para los apóstoles", ref: "Hechos 2:39" },
              { texto: "Pedro dijo que la promesa era también para sus hijos y para los que estaban lejos.", verdad: true, explica: "Así lo dice Hechos 2:39: la promesa es para todos los que el Señor llama.", apoyo: "Pedro dijo que la promesa era para ellos, para sus hijos y para todos los que estaban lejos", ref: "Hechos 2:39" },
              { texto: "Jesús dijo que el Padre dará el Espíritu Santo a los que se lo pidan.", verdad: true, explica: "Así lo dice Lucas 11:13. Por eso buscamos a Dios en oración con un corazón sincero.", apoyo: "Jesús dijo que el Padre celestial dará el Espíritu Santo a los que se lo pidan (Lucas 11:13).", ref: "Lucas 11:13" },
            ],
          },
          {
            consigna: "¿Para quién es la promesa del Espíritu? Di si cada frase es verdad o es un error.",
            afirmaciones: [
              { texto: "La promesa del Espíritu es para todo creyente, también hoy.", verdad: true, explica: "Pedro dijo que era para ellos, para sus hijos y para todos los que estaban lejos.", apoyo: "es para todo creyente, también hoy", ref: "Hechos 2:38-39" },
              { texto: "La promesa del Espíritu terminó con los primeros discípulos.", verdad: false, explica: "La promesa también era para sus hijos y para todos los que estaban lejos: es para todo creyente, también hoy.", apoyo: "Pedro dijo que la promesa era para ellos, para sus hijos y para todos los que estaban lejos", ref: "Hechos 2:39" },
              { texto: "Para recibir el Espíritu Santo hay que ganárselo con años de buenas obras.", verdad: false, explica: "Jesús no dijo que se gana: dijo que el Padre lo dará a los que se lo pidan. Lo buscamos en oración, con fe.", apoyo: "el Padre celestial dará el Espíritu Santo a los que se lo pidan", ref: "Lucas 11:13" },
              { texto: "En el libro de los Hechos, los creyentes llenos del Espíritu testificaron con poder.", verdad: true, explica: "Cuando fueron llenos del Espíritu, hablaron en lenguas, profetizaron y testificaron con poder.", apoyo: "cuando los creyentes fueron llenos del Espíritu, hablaron en lenguas, profetizaron y testificaron con poder", ref: "Hechos 10:44-46; 19:6" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "En el grupo de jóvenes, un amigo que creyó hace poco te dice: Eso del poder del Espíritu fue para los apóstoles; no es para gente como yo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: eso pasó una sola vez, con los apóstoles, y ya no pasa más.", explica: "La promesa no fue solo para los apóstoles: Pedro dijo que era también para todos los que estaban lejos." },
              { texto: "La promesa es para todo creyente, también para ti. Pide al Padre el Espíritu.", bien: true, explica: "Así lo enseña Hechos 2:39, y Jesús dijo que el Padre dará el Espíritu Santo a los que se lo pidan." },
              { texto: "Primero tienes que llevar muchos años en la iglesia para poder recibirlo.", explica: "Jesús no habló de años en la iglesia: dijo que el Padre dará el Espíritu Santo a los que se lo pidan." },
              { texto: "Eso es solo para los pastores y los líderes, no para gente nueva como tú.", explica: "La promesa del Espíritu es para todo creyente, también hoy." },
            ],
            apoyo: "La promesa del Espíritu no fue solo para los apóstoles: es para todo creyente, también hoy.",
            ref: "Hechos 2:38-39; Lucas 11:13",
            explica: "La promesa de Pentecostés es para todo creyente, también hoy. Se pide al Padre con fe y con un corazón sincero.",
          },
          {
            caso: "Tu tía es creyente desde hace poco. Te dice: Quiero ser llena del Espíritu para servir a Dios, pero no sé qué hacer.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Pídeselo al Padre con fe y busca a Dios en oración con un corazón sincero.", bien: true, explica: "Jesús dijo que el Padre celestial dará el Espíritu Santo a los que se lo pidan." },
              { texto: "No pierdas el tiempo: eso fue solo para la iglesia del principio.", explica: "La promesa del Espíritu no fue solo para los apóstoles: es para todo creyente, también hoy." },
              { texto: "Primero tienes que ganártelo con muchos años de buenas obras.", explica: "Jesús no dijo que se gana: dijo que el Padre lo dará a los que se lo pidan." },
              { texto: "Eso es para lucirse en la iglesia; para servir no lo necesitas.", explica: "El poder del Espíritu no es para lucirse, sino para servir y testificar de Cristo." },
            ],
            apoyo: "Busca a Dios en oración con un corazón sincero.",
            ref: "Lucas 11:13; Hechos 2:39",
            explica: "La promesa es también para ella: se pide al Padre con fe, buscándolo en oración con un corazón sincero.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "y explicó para qué: para ser sus testigos desde Jerusalén hasta lo último de la tierra",
            ref: "Hechos 1:8",
            clave: {
              id: "pr-n1-espiritu-3-a6-1",
              tipo: "corta",
              pregunta: "¿Para qué prometió Jesús el poder del Espíritu Santo?",
              ideas: [
                { id: "testigos", peso: 50, texto: "Para ser sus testigos hasta lo último de la tierra.", formas: ["testig*", "testific*", "testimonio", "hablar de (jesus|cristo)", "predic*", "evangeliz*", "ultimo de la tierra"] },
                { id: "servir", peso: 50, texto: "No es para lucirse, sino para servir y testificar con valentía.", formas: ["servir", "sirv*", "servici*", "no (es|era) para lucir*", "no para lucir*", "ni para lucir*", "valentia", "valient*", "valor"] },
              ],
              modelo: "Jesús prometió el poder del Espíritu para que fuéramos sus testigos hasta lo último de la tierra. Ese poder no es para lucirse, sino para servir y testificar con valentía.",
            },
          },
          {
            apoyo: "Antes de subir al cielo, Jesús no mandó a sus discípulos a predicar de inmediato.",
            ref: "Hechos 1:4-8",
            clave: {
              id: "pr-n1-espiritu-3-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué Jesús les dijo a sus discípulos que esperaran antes de salir a predicar?",
              ideas: [
                { id: "poder", peso: 50, texto: "Primero tenían que recibir poder: el bautismo con el Espíritu Santo.", formas: ["recib* poder", "recib* el espiritu", "poder del espiritu", "bautismo (con|en|del) el espiritu", "bautismo del espiritu", "bautiz* con el espiritu", "llen* del espiritu", "poder"] },
                { id: "testigos", peso: 50, texto: "Para ser sus testigos con valentía, hasta lo último de la tierra.", formas: ["testig*", "testific*", "testimonio", "ultimo de la tierra", "valentia", "valient*", "servir"] },
              ],
              modelo: "Porque primero tenían que recibir poder: el bautismo con el Espíritu Santo. Con ese poder serían sus testigos y testificarían de Cristo con valentía hasta lo último de la tierra.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Andar en el Espíritu
    "n1-espiritu-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Entre qué dos cosas hay una lucha dentro del creyente?", reverso: "Entre los deseos de la carne y el Espíritu.", apoyo: "Dentro del creyente hay una lucha entre los deseos de la carne" },
              { frente: "En la lucha del creyente, ¿qué es la carne?", reverso: "La vieja naturaleza que quiere su propio camino.", apoyo: "la vieja naturaleza que quiere su propio camino" },
              { frente: "Según Pablo, ¿cómo vencemos los deseos de la carne?", reverso: "Andando en el Espíritu, no con fuerza de voluntad.", apoyo: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu" },
              { frente: "¿Qué es el fruto del Espíritu?", reverso: "El carácter de Cristo formándose en nosotros.", apoyo: "El fruto del Espíritu es el carácter de Cristo formándose en nosotros" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es andar en el Espíritu?", reverso: "Depender de Él cada día, escuchar su voz y obedecer.", apoyo: "dependiendo de Él cada día, escuchando su voz y obedeciendo" },
              { frente: "¿Qué cualidades forman el fruto del Espíritu?", reverso: "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.", apoyo: "amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza" },
              { frente: "¿Por qué Pablo dice fruto, en singular?", reverso: "Porque crece junto, como un todo, y crece con el tiempo, como un árbol.", apoyo: "Pablo dice fruto, en singular: crece junto, como un todo, y crece con el tiempo, como un árbol." },
              { frente: "¿Qué le pidió Pablo a Timoteo?", reverso: "Que avivara el fuego del don de Dios que estaba en él.", apoyo: "Pablo le pidió a Timoteo que avivara el fuego del don de Dios que estaba en él" },
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
            consigna: "¿Es un deseo de la carne o es andar en el Espíritu? Lleva cada frase a su grupo.",
            grupos: ["Los deseos de la carne", "Andar en el Espíritu"],
            frases: [
              { texto: "Querer siempre mi propio camino", grupo: 0 },
              { texto: "Hacer solo lo que yo quiero", grupo: 0 },
              { texto: "Seguir a la vieja naturaleza", grupo: 0 },
              { texto: "Depender del Espíritu cada día", grupo: 1 },
              { texto: "Escuchar la voz del Espíritu", grupo: 1 },
              { texto: "Obedecer pronto lo que el Espíritu me muestra", grupo: 1 },
            ],
            apoyo: "Dentro del creyente hay una lucha entre los deseos de la carne",
            ref: "Gálatas 5:16-17",
            explica: "La carne es la vieja naturaleza que quiere su propio camino; andar en el Espíritu es depender de Él, escuchar su voz y obedecer.",
          },
          {
            consigna: "Según Pablo, ¿así vencemos la carne o no? Lleva cada frase a su grupo.",
            grupos: ["Así vencemos la carne", "Así no vencemos la carne"],
            frases: [
              { texto: "Andando en el Espíritu", grupo: 0 },
              { texto: "Dependiendo del Espíritu cada día", grupo: 0 },
              { texto: "Escuchando la voz del Espíritu y obedeciendo", grupo: 0 },
              { texto: "Con fuerza de voluntad", grupo: 1, explica: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu." },
              { texto: "Con mis propias fuerzas", grupo: 1 },
              { texto: "Esforzándome yo solo", grupo: 1 },
            ],
            apoyo: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu",
            ref: "Gálatas 5:16",
            explica: "Pablo no dice que venzamos con fuerza de voluntad: vencemos andando en el Espíritu, dependiendo de Él cada día.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la lista del fruto del Espíritu con las palabras que faltan, en su orden.",
            texto: "El fruto del Espíritu es amor, [[gozo]], paz, [[paciencia]], benignidad, bondad, fe, mansedumbre y [[templanza]].",
            distractores: ["fuerza", "riqueza", "orgullo"],
            errores: {
              fuerza: "La fuerza no está en la lista. Y Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu.",
              riqueza: "La riqueza no está en la lista: el fruto es el carácter de Cristo formándose en nosotros.",
              orgullo: "El orgullo no está en la lista: el fruto es el carácter de Cristo formándose en nosotros.",
            },
            apoyo: "amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza",
            ref: "Gálatas 5:22-23",
            explica: "Son las nueve cualidades del carácter de Cristo: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.",
          },
          {
            consigna: "¿Cómo es el fruto del Espíritu? Completa cada espacio con la palabra que falta.",
            texto: "El fruto del Espíritu es el [[carácter]] de Cristo formándose en nosotros. Pablo dice fruto, en [[singular]]: crece junto, como un todo, y crece con el [[tiempo]], como un árbol.",
            distractores: ["orgullo", "plural", "esfuerzo"],
            errores: {
              orgullo: "El orgullo no es parte del fruto: el fruto es el carácter de Cristo formándose en nosotros.",
              plural: "Pablo no dice frutos: dice fruto, en singular, porque crece junto, como un todo.",
              esfuerzo: "El fruto no crece con fuerza de voluntad: crece con el tiempo, como un árbol, cuando permanecemos cerca de Dios.",
            },
            apoyo: "Pablo dice fruto, en singular: crece junto, como un todo, y crece con el tiempo, como un árbol.",
            ref: "Gálatas 5:22-23",
            explica: "El fruto es el carácter de Cristo en nosotros: es uno solo, crece junto y crece con el tiempo, como un árbol.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "¿Qué haces en cada momento? Une cada momento con su hábito.",
            pares: [
              ["Al empezar el día", "Entrégate a Dios y pídele que te llene de su Espíritu"],
              ["Cuando lees la Biblia", "Recuerda que el Espíritu usa lo que lees"],
              ["Cuando el Espíritu te muestra qué hacer", "Obedece pronto"],
              ["Cuando fallas", "Confiesa enseguida, en lugar de esconderte"],
            ],
            apoyo: "Obedece pronto cuando Él te muestra algo.",
            ref: "Efesios 5:18; Colosenses 3:16; 1 Juan 1:9",
            explica: "Andar en el Espíritu se aprende con hábitos de cada día: empezar con Dios, leer la Palabra, obedecer pronto y confesar enseguida.",
          },
          {
            consigna: "¿Cómo andar en el Espíritu? Une el comienzo de cada frase con su final.",
            pares: [
              ["Empieza el día entregándote a Dios", "y pidiéndole que te llene de su Espíritu"],
              ["Llena tu mente de la Palabra:", "el Espíritu usa lo que lees"],
              ["Confiesa enseguida", "cuando fallas, en lugar de esconderte"],
              ["Avivar el fuego es", "darle al Espíritu Santo el primer lugar, cada día"],
            ],
            apoyo: "Llena tu mente de la Palabra: el Espíritu usa lo que lees (Colosenses 3:16).",
            ref: "Efesios 5:18; Colosenses 3:16; 1 Juan 1:9; 2 Timoteo 1:6",
            explica: "Son hábitos para andar en el Espíritu: empezar el día con Dios, leer la Palabra, confesar enseguida y darle al Espíritu el primer lugar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "En el trabajo, un compañero te provoca y le respondes con enojo delante de todos. Al rato te sientes mal por lo que hiciste.",
            pregunta: "¿Qué haces para seguir andando en el Espíritu?",
            opciones: [
              { texto: "Hago como si nada hubiera pasado y espero que todos se olviden pronto.", explica: "Eso es esconderse. La lección enseña a confesar enseguida cuando fallas." },
              { texto: "Se lo confieso a Dios enseguida, sin esconderme, y sigo dependiendo de Él.", bien: true, explica: "Es uno de los hábitos de la lección: confesar enseguida cuando fallas, en lugar de esconderte (1 Juan 1:9)." },
              { texto: "Me prometo que con mi fuerza de voluntad esto no volverá a pasar.", explica: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu." },
              { texto: "Espero hasta el domingo para arreglar este asunto con Dios en la iglesia.", explica: "No hace falta esperar: confiesa enseguida cuando fallas." },
            ],
            apoyo: "Confiesa enseguida cuando fallas, en lugar de esconderte (1 Juan 1:9).",
            ref: "1 Juan 1:9",
            explica: "Andar en el Espíritu incluye confesar enseguida cuando fallas, sin esconderte, y volver a depender de Él.",
          },
          {
            caso: "Cada mañana sales corriendo al trabajo con el teléfono en la mano, y casi nunca hablas con Dios.",
            pregunta: "¿Qué hábito de la lección te ayuda a empezar distinto?",
            opciones: [
              { texto: "Empezar el día entregándome a Dios y pidiéndole que me llene de su Espíritu.", bien: true, explica: "Es el primer hábito de la lección para andar en el Espíritu (Efesios 5:18)." },
              { texto: "Dejar a Dios para el domingo, que es el único día en que tengo tiempo.", explica: "Andar en el Espíritu es depender de Él cada día, no solo un día a la semana." },
              { texto: "Esperar a vivir un momento especial en un culto antes de buscar a Dios.", explica: "Ser lleno del Espíritu no es solo vivir un momento especial: es aprender a caminar con Él cada día." },
              { texto: "Portarme mejor con mi fuerza de voluntad, sin perder tiempo orando.", explica: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu y dependiendo de Él." },
            ],
            apoyo: "Empieza el día entregándote a Dios y pidiéndole que te llene de su Espíritu",
            ref: "Efesios 5:18; Gálatas 5:25",
            explica: "Andar en el Espíritu empieza cada mañana: entregarte a Dios y pedirle que te llene de su Espíritu.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu: dependiendo de Él cada día, escuchando su voz y obedeciendo.",
            ref: "Gálatas 5:16-17",
            clave: {
              id: "pr-n1-espiritu-4-a6-1",
              tipo: "corta",
              pregunta: "¿Cómo vence el creyente los deseos de la carne, según Pablo?",
              ideas: [
                { id: "no-voluntad", peso: 40, texto: "No con fuerza de voluntad.", formas: ["no (con|por) (fuerza|fuerzas|voluntad|esfuerzo)", "ni (con|por) (fuerza|fuerzas|voluntad|esfuerzo)", "fuerza de voluntad no", "no (es|basta|alcanza|sirve) (la|su|mi|nuestra) fuerza", "no (depende|viene) de (la|su|mi|nuestra) (fuerza|voluntad)", "no (fuerza|fuerzas|voluntad|esfuerzo)"], negativa: true },
                { id: "andar", peso: 60, texto: "Andando en el Espíritu: dependiendo de Él cada día, escuchando su voz y obedeciendo.", formas: ["and* en el espiritu", "camin* (en|con) el espiritu", "depend*", "escuch* (su|la) voz", "obedec*", "con el espiritu", "por el espiritu"] },
              ],
              modelo: "El creyente no vence con fuerza de voluntad, sino andando en el Espíritu: dependiendo de Él cada día, escuchando su voz y obedeciendo lo que Él le muestra.",
            },
          },
          {
            apoyo: "Andar en el Espíritu es depender de Él cada día; así vencemos los deseos de la carne y crece en nosotros el fruto del Espíritu.",
            ref: "Gálatas 5:16-17",
            clave: {
              id: "pr-n1-espiritu-4-a6-2",
              tipo: "corta",
              pregunta: "Explica la lucha que hay dentro del creyente y cómo se gana.",
              ideas: [
                { id: "carne", peso: 50, texto: "Es una lucha entre los deseos de la carne, la vieja naturaleza que quiere su propio camino, y el Espíritu.", formas: ["carne", "vieja naturaleza", "naturaleza vieja", "propio camino", "(mi|su|nuestra) manera"] },
                { id: "andar", peso: 50, texto: "Se gana andando en el Espíritu, dependiendo de Él cada día.", formas: ["and* en el espiritu", "camin* (en|con) el espiritu", "depend*", "escuch* (su|la) voz", "obedec*"] },
              ],
              modelo: "Dentro del creyente luchan los deseos de la carne, la vieja naturaleza que quiere su propio camino, y el Espíritu. Se gana andando en el Espíritu, dependiendo de Él cada día.",
            },
          },
        ],
      },
    ],
  },
};
