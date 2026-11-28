/**
 * Las prácticas de la materia `evangelismo-misiones-3` (especialidad). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/evangelismo-misiones-3.ts), con la guía de docs/academia-practicas.md.
 * «Teología bíblica de las misiones»: la misión de Dios de Génesis a Apocalipsis. No pregunta nada sobre el orden de los
 * acontecimientos del fin (punto de la declaración de fe por confirmar): solo la tarea que Jesús dio a su iglesia y su
 * meta. Sigue a «Evangelismo personal» (Nivel 2) y a «Evangelismo y consolidación» (Nivel 3) sin repetir sus actividades.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_EVANGELISMO_MISIONES_3: PracticasMateria = {
  materia: "evangelismo-misiones-3",
  mision: {
    titulo: "Como me envió el Padre: la escuela de misiones de tu iglesia",
    intro: "Tu pastor te pidió que prepares una escuela de misiones para la iglesia. Vas a enseñar que la misión empieza en Dios, que ama al mundo y envía; que desde Abraham Dios tiene en mente a todas las familias de la tierra; que Jesús, con toda autoridad, mandó hacer discípulos a todos los pueblos; que el Espíritu Santo impulsó a la iglesia de Antioquía a enviar; que Pablo plantaba, fortalecía y dejaba líderes; y que la meta es una multitud de todas las naciones que adora al Cordero. Repasa las seis lecciones para que cada clase salga bien.",
    cierre: "Ya puedes enseñar la misión de Dios de Génesis a Apocalipsis: el Padre envió al Hijo, y el Hijo envía a la iglesia; la promesa a Abraham alcanza a todas las naciones; la autoridad y la presencia de Cristo sostienen la gran comisión; toda iglesia local puede ser una Antioquía; y cada creyente tiene un lugar en la misión de Dios: orar, ir, enviar, dar y recibir.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El Dios que envía
    "evangelismo-misiones-3-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde empieza la misión, según la lección?", reverso: "En Dios, no en la iglesia.", apoyo: "La misión empieza en Dios, no en la iglesia" },
              { frente: "¿Qué dijo Jesús resucitado a sus discípulos en Juan 20:21?", reverso: "«Como me envió el Padre, así también yo os envío».", apoyo: "Jesús resucitado dijo a sus discípulos: «Como me envió el Padre, así también yo os envío»" },
              { frente: "¿Qué pregunta oyó Isaías de parte de Dios?", reverso: "«¿A quién enviaré, y quién irá por nosotros?»", apoyo: "Isaías oyó la pregunta de Dios: «¿A quién enviaré, y quién irá por nosotros?»" },
              { frente: "¿Qué son las misiones, en plural?", reverso: "Las formas concretas de la obra de Dios, como enviar obreros y plantar iglesias.", apoyo: "Las misiones, en plural, son las formas concretas de esa obra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De dónde nace la misión?", reverso: "Del amor de Dios por el mundo.", apoyo: "Nace del amor de Dios por el mundo" },
              { frente: "Según Juan 3:16, ¿qué hizo Dios porque amó al mundo?", reverso: "Dio a su Hijo unigénito.", apoyo: "«Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito»" },
              { frente: "¿Cómo envía Jesús resucitado a la iglesia?", reverso: "Como el Padre lo envió a él.", apoyo: "Jesús resucitado envía a la iglesia como el Padre lo envió a él" },
              { frente: "¿Qué es la misión?", reverso: "La obra de Dios en el mundo, en la que él invita a participar a su pueblo.", apoyo: "La misión es la obra de Dios en el mundo, en la que él invita a participar a su pueblo" },
              { frente: "¿Qué respondió Isaías cuando Dios preguntó a quién enviaría?", reverso: "«Heme aquí, envíame a mí».", apoyo: "y respondió: «Heme aquí, envíame a mí»" },
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
            consigna: "Completa de dónde nace la misión.",
            texto: "La misión nace del [[amor]] de Dios por el [[mundo]]: el Padre envió a su [[Hijo]], y Jesús resucitado envía a la iglesia.",
            distractores: ["temor", "templo", "ángel"],
            errores: {
              temor: "La misión no nace del temor, sino del amor: «de tal manera amó Dios al mundo».",
              templo: "Dios ama al mundo: por eso su pueblo anuncia el evangelio a todas las naciones.",
              "ángel": "El Padre envió a su Hijo: «de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito».",
            },
            apoyo: "Nace del amor de Dios por el mundo",
            ref: "Juan 3:16",
            explica: "La misión nace del amor de Dios por el mundo: de tal manera amó al mundo que dio a su Hijo. El Padre envió al Hijo, y el Hijo envía a la iglesia.",
          },
          {
            consigna: "Completa lo que dice la lección sobre dónde empieza la misión.",
            texto: "La misión [[empieza]] en Dios, no en la iglesia, y nace de su amor por el mundo. Por eso cada [[creyente]] es invitado a responder, como Isaías: heme aquí.",
            distractores: ["termina", "apóstol"],
            errores: {
              termina: "La lección dice que la misión empieza en Dios: él ama al mundo y envía.",
              "apóstol": "No solo los apóstoles: cada creyente es invitado a responder, como Isaías: heme aquí.",
            },
            apoyo: "Cada creyente es invitado a responder: heme aquí",
            ref: "Isaías 6:8",
            explica: "La misión empieza en Dios, no en la iglesia, y nace de su amor por el mundo. Dios invita a cada creyente a participar, y el creyente responde, como Isaías: heme aquí.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo pasa el envío del Padre a la iglesia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "padre", texto: "El Padre", x: 20, y: 10 },
              { id: "hijo", texto: "El Hijo", x: 80, y: 36 },
              { id: "iglesia", texto: "La iglesia", x: 20, y: 64 },
              { id: "naciones", texto: "Todas las naciones", x: 80, y: 90 },
            ],
            enlaces: [
              { de: "padre", a: "hijo", relacion: "envió al" },
              { de: "hijo", a: "iglesia", relacion: "envía a la" },
              { de: "iglesia", a: "naciones", relacion: "anuncia el evangelio a" },
            ],
            distractores: ["reemplaza a la", "se aleja de"],
            apoyo: "El Padre envió al Hijo, y el Hijo envía a la iglesia",
            ref: "Juan 20:21",
            explica: "Jesús resucitado dijo: «Como me envió el Padre, así también yo os envío». El Padre envió al Hijo, el Hijo envía a la iglesia, y la iglesia participa en la obra de Dios: anunciar el evangelio a todas las naciones.",
          },
          {
            consigna: "Juan 3:16 y Juan 20:21 unen el amor de Dios con dos envíos. Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "padre", texto: "El Padre", x: 15, y: 12 },
              { id: "mundo", texto: "El mundo", x: 85, y: 12 },
              { id: "jesus", texto: "Jesús resucitado", x: 15, y: 88 },
              { id: "discipulos", texto: "Sus discípulos", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "padre", a: "mundo", relacion: "amó de tal manera al" },
              { de: "padre", a: "jesus", relacion: "envió a" },
              { de: "jesus", a: "discipulos", relacion: "envía, como fue enviado, a" },
            ],
            distractores: ["olvidó al", "deja solos a"],
            apoyo: "Jesús resucitado envía a la iglesia como el Padre lo envió a él",
            ref: "Juan 20:21",
            explica: "De tal manera amó Dios al mundo que dio a su Hijo. Y Jesús resucitado envía a sus discípulos como el Padre lo envió a él: «Como me envió el Padre, así también yo os envío».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Habla de la misión de Dios o de las misiones, sus formas concretas? Lleva cada frase a su grupo.",
            grupos: ["La misión de Dios", "Las misiones, sus formas concretas"],
            frases: [
              { texto: "Es la obra de Dios en el mundo", grupo: 0 },
              { texto: "Empieza en Dios, no en la iglesia", grupo: 0 },
              { texto: "Nace del amor de Dios por el mundo", grupo: 0 },
              { texto: "Dios invita a su pueblo a participar en ella", grupo: 0 },
              { texto: "Enviar obreros", grupo: 1 },
              { texto: "Plantar iglesias", grupo: 1 },
              { texto: "Traducir la Biblia", grupo: 1 },
              { texto: "Servir donde Cristo no es conocido", grupo: 1 },
            ],
            apoyo: "Las misiones, en plural, son las formas concretas de esa obra: enviar obreros, plantar iglesias, traducir la Biblia y servir donde Cristo no es conocido",
            explica: "La misión es la obra de Dios en el mundo: empieza en él, nace de su amor y en ella participa su pueblo. Las misiones son sus formas concretas: enviar obreros, plantar iglesias, traducir la Biblia y servir donde Cristo no es conocido.",
          },
          {
            consigna: "¿Es parte de la misión, la obra de Dios, o es una de las misiones, una forma concreta? Lleva cada frase a su grupo.",
            grupos: ["La misión: la obra de Dios", "Las misiones: formas concretas"],
            frases: [
              { texto: "Anunciar el evangelio a todas las naciones", grupo: 0 },
              { texto: "Hacer discípulos y servir con amor", grupo: 0 },
              { texto: "La obra de Dios en el mundo, en la que participa su pueblo", grupo: 0 },
              { texto: "La iglesia envía a una familia como obreros a otro país", grupo: 1 },
              { texto: "Un equipo planta una iglesia en un barrio nuevo", grupo: 1 },
              { texto: "Unos hermanos traducen la Biblia a la lengua de un pueblo", grupo: 1 },
              { texto: "Un grupo sirve en un lugar donde Cristo no es conocido", grupo: 1 },
            ],
            apoyo: "La misión es la obra de Dios en el mundo, en la que él invita a participar a su pueblo: anunciar el evangelio a todas las naciones, hacer discípulos y servir con amor",
            explica: "La misión es la obra de Dios en el mundo: anunciar el evangelio a todas las naciones, hacer discípulos y servir con amor. Las misiones son sus formas concretas, como enviar obreros, plantar iglesias, traducir la Biblia y servir donde Cristo no es conocido.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del comité de misiones te dice: Las misiones son un programa más de la iglesia; si este año falta dinero, se quitan.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "La misión empieza en Dios, que ama al mundo y envía; no es un programa.", bien: true, explica: "La Biblia muestra algo más profundo que un programa: la misión empieza en Dios, que ama al mundo y envía." },
              { texto: "Tienes razón: es un programa más, y se quita cuando no alcanza el dinero.", explica: "La misión no es un programa más de la iglesia: empieza en Dios y nace de su amor por el mundo." },
              { texto: "Es un programa importante, pero les toca solo a los que se van muy lejos.", explica: "La misión es la obra de Dios en la que participa su pueblo: cada creyente es invitado a responder." },
              { texto: "La misión empieza cuando la iglesia decide tener su programa de misiones.", explica: "La misión empieza en Dios, no en la iglesia." },
            ],
            apoyo: "La Biblia muestra algo más profundo: la misión empieza en Dios, que ama al mundo y envía",
            ref: "Juan 3:16",
            explica: "La misión no es un programa más: empieza en Dios, que de tal manera amó al mundo que dio a su Hijo. La iglesia participa en la obra de Dios.",
          },
          {
            caso: "Un líder de jóvenes te dice: Voy a inventar una misión a mi manera, y después le pediré a Dios que la bendiga.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "La misión empieza en Dios, que ama al mundo; él te invita a la suya.", bien: true, explica: "No eres tú el que inventa la misión: Dios te invita a la suya. Empieza en Dios y nace de su amor por el mundo." },
              { texto: "Muy bien: la misión empieza cuando a alguien se le ocurre una buena idea.", explica: "La misión no empieza en una idea nuestra: empieza en Dios, que ama al mundo y envía." },
              { texto: "Hazla funcionar primero, y después Dios se va a sumar a tu buen plan.", explica: "Dios no se suma a nuestros planes: él invita a su pueblo a participar en su obra." },
              { texto: "Mejor no hagas nada: la misión es solo para los que se van a otro país.", explica: "Cada creyente es invitado a responder, como Isaías: heme aquí." },
            ],
            apoyo: "No eres tú el que inventa la misión: Dios te invita a la suya",
            ref: "Isaías 6:8",
            explica: "La misión empieza en Dios y nace de su amor por el mundo. No la inventamos nosotros: Dios nos invita a participar en la suya.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El Padre envió al Hijo, y el Hijo envía a la iglesia",
            ref: "Juan 20:21",
            clave: {
              id: "pr-evangelismo-misiones-3-1-a6-1",
              tipo: "corta",
              pregunta: "Según Juan 20:21, ¿qué relación hay entre el envío del Hijo y el envío de la iglesia?",
              ideas: [
                { id: "padre", peso: 50, texto: "El Padre envió al Hijo, porque amó al mundo.", formas: ["padre envi*", "padre mand*", "envi* al hijo", "envi* a su hijo", "mand* al hijo", "mand* a su hijo", "dio a su hijo", "entrego a su hijo", "envi* a jesus", "mand* a jesus", "jesus fue enviado", "hijo fue enviado", "cristo fue enviado", "como me envio"] },
                { id: "iglesia", peso: 50, texto: "Jesús resucitado envía a la iglesia como el Padre lo envió a él.", formas: ["envi* a la iglesia", "mand* a la iglesia", "envi* a (sus|los) discipulos", "mand* a (sus|los) discipulos", "envi* a nosotros", "envi* a los creyentes", "nos envi*", "nos mand*", "asi tambien", "de la misma manera", "igual que el padre", "la iglesia es enviada", "somos enviados"] },
              ],
              errores: [
                { id: "empieza-iglesia", texto: "La misión empieza en Dios, no en la iglesia.", formas: ["(empieza|comienza|nace) en la iglesia", "la iglesia (inventa|empieza|comienza) la mision"], anula: "padre" },
              ],
              modelo: "El Padre envió al Hijo porque amó al mundo, y Jesús resucitado envía a la iglesia como el Padre lo envió a él: «Como me envió el Padre, así también yo os envío».",
            },
          },
          {
            apoyo: "Jesús resucitado dijo a sus discípulos: «Como me envió el Padre, así también yo os envío»",
            ref: "Juan 20:21",
            clave: {
              id: "pr-evangelismo-misiones-3-1-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la misión es solo cosa de los misioneros. ¿Qué le explicas con Juan 20:21?",
              ideas: [
                { id: "envio", peso: 50, texto: "Jesús resucitado dijo: como me envió el Padre, así también yo os envío.", formas: ["como me envio", "asi tambien yo", "padre (me|lo|le) envio", "padre envi*", "padre mand*", "envi* al hijo", "envi* a su hijo", "envi* a jesus", "como el padre", "igual que el padre"] },
                { id: "todos", peso: 50, texto: "Jesús envía a toda la iglesia, y cada creyente es invitado a responder: heme aquí.", formas: ["envi* a la iglesia", "mand* a la iglesia", "envi* a sus discipulos", "envi* a los discipulos", "envi* a los creyentes", "envi* a todos", "toda la iglesia", "(cada|todo) (creyente|cristiano|discipulo)", "todos los (creyentes|cristianos|discipulos)", "heme aqui", "nos envi*", "nos mand*", "todos somos (enviados|llamados|invitados)"] },
              ],
              errores: [
                { id: "solo-misioneros", texto: "La misión no es solo de los misioneros: Jesús envía a la iglesia.", formas: ["(es|son) solo (de|para) los misioneros", "solo (los|las) misioneros"], anula: "todos" },
                { id: "solo-apostoles", texto: "Jesús no envía solo a los apóstoles: envía a toda la iglesia.", formas: ["solo para los doce", "solo para los apostoles", "solo a los apostoles", "solo los apostoles"], anula: "todos" },
              ],
              modelo: "Le explico que Jesús resucitado dijo: «Como me envió el Padre, así también yo os envío». Jesús envía a toda la iglesia, y cada creyente es invitado a responder: heme aquí.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La promesa a Abraham y la misión de Israel
    "evangelismo-misiones-3-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le prometió Dios a Abram en Génesis 12:3?", reverso: "Que en él serían benditas todas las familias de la tierra.", apoyo: "Dios llamó a Abram y le prometió: «serán benditas en ti todas las familias de la tierra»" },
              { frente: "¿Qué le dijo Dios a Israel en Éxodo 19:6?", reverso: "«vosotros me seréis un reino de sacerdotes, y gente santa».", apoyo: "y le dijo: «vosotros me seréis un reino de sacerdotes, y gente santa»" },
              { frente: "¿Qué hace un sacerdote, según la lección?", reverso: "Está entre Dios y los demás.", apoyo: "Un sacerdote está entre Dios y los demás" },
              { frente: "¿Con qué propósito pide el salmista la bendición de Dios en el Salmo 67?", reverso: "Para que en todas las naciones se conozca su salvación.", apoyo: "El salmista pide la bendición de Dios con un propósito" },
              { frente: "¿Por qué huyó Jonás?", reverso: "Porque no quería que Nínive recibiera la misericordia de Dios.", apoyo: "Jonás huyó porque no quería que Nínive, una ciudad enemiga de Israel, recibiera la misericordia de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Desde dónde tiene Dios en mente a todas las familias de la tierra?", reverso: "Desde Génesis: la misión no empieza en el Nuevo Testamento.", apoyo: "Desde Génesis, Dios tiene en mente a todas las familias de la tierra" },
              { frente: "¿Para qué escogió Dios a Abram y a su descendencia?", reverso: "Para bendecir a todos los pueblos.", apoyo: "Escogió a un hombre y a su descendencia para bendecir a todos los pueblos" },
              { frente: "¿Cómo llama Pablo a la promesa hecha a Abraham?", reverso: "El evangelio anunciado de antemano.", apoyo: "Pablo explica que esa promesa era el evangelio anunciado de antemano" },
              { frente: "¿Quiénes aplicaron Isaías 49:6 a su misión entre los gentiles?", reverso: "Pablo y Bernabé, en Hechos 13:47.", apoyo: "En Hechos 13:47, Pablo y Bernabé aplicaron estas palabras a su misión entre los gentiles" },
              { frente: "¿Con qué termina el libro de Jonás?", reverso: "Con una pregunta de Dios sobre su compasión por Nínive.", apoyo: "El libro termina con una pregunta de Dios sobre su compasión por esa gran ciudad (Jonás 4:11)" },
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
            consigna: "Dios llamó a Abram y le hizo una promesa. ¿Quiénes serían benditas en él? Toca las palabras que lo dicen.",
            texto: "serán benditas en ti [[todas las familias de la tierra]]",
            apoyo: "Escogió a un hombre y a su descendencia para bendecir a todos los pueblos",
            ref: "Génesis 12:3",
            explica: "Dios le prometió a Abram: «serán benditas en ti todas las familias de la tierra». Escogió a un hombre y a su descendencia para bendecir a todos los pueblos.",
          },
          {
            consigna: "Pablo explica qué era la promesa hecha a Abraham. ¿Qué le dio de antemano la Escritura? Toca las palabras que lo dicen.",
            texto: "dio de antemano la [[buena nueva]] a Abraham, diciendo: En ti serán benditas todas las naciones",
            apoyo: "Pablo explica que esa promesa era el evangelio anunciado de antemano",
            ref: "Gálatas 3:8",
            explica: "La Escritura «dio de antemano la buena nueva a Abraham»: la promesa de bendecir a todas las naciones era el evangelio anunciado de antemano.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el llamado que Dios le dio a Israel.",
            texto: "Un sacerdote está entre Dios y los [[demás]]. Por eso Israel, un reino de sacerdotes y gente [[santa]], debía [[mostrar]] a Dios a las naciones.",
            distractores: ["ángeles", "rica", "ocultar"],
            errores: {
              "ángeles": "Un sacerdote está entre Dios y los demás: Israel estaba entre Dios y las naciones.",
              rica: "Dios le dijo a Israel: «vosotros me seréis un reino de sacerdotes, y gente santa».",
              ocultar: "Israel no debía guardar a Dios para sí: debía mostrarlo a las naciones.",
            },
            apoyo: "Un sacerdote está entre Dios y los demás: Israel debía mostrar a Dios a las naciones",
            ref: "Éxodo 19:5-6",
            explica: "Dios le dijo a Israel: «vosotros me seréis un reino de sacerdotes, y gente santa». Un sacerdote está entre Dios y los demás: Israel debía mostrar a Dios a las naciones.",
          },
          {
            consigna: "Completa lo que dicen Isaías y el salmista sobre las naciones.",
            texto: "Dios dio a su Siervo por [[luz]] de las naciones, y el salmista pide la [[bendición]] de Dios para que en todas las naciones se conozca su [[salvación]].",
            distractores: ["juez", "riqueza", "condena"],
            errores: {
              juez: "Dios dice de su Siervo: «también te di por luz de las naciones».",
              riqueza: "El salmista pide la bendición de Dios con un propósito: que las naciones lo conozcan.",
              condena: "El salmista pide: «Para que sea conocido en la tierra tu camino, En todas las naciones tu salvación».",
            },
            apoyo: "El salmista pide la bendición de Dios con un propósito",
            ref: "Isaías 49:6; Salmos 67:1-2",
            explica: "Dios dio a su Siervo «por luz de las naciones», y el salmista pide la bendición de Dios con un propósito: que en todas las naciones se conozca su salvación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el llamado de Israel: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios le recordó a Israel que toda la tierra es suya.", verdad: true, explica: "Dios le recordó a Israel que «mía es toda la tierra», y lo llamó a ser un reino de sacerdotes.", apoyo: "A Israel, Dios le recordó que «mía es toda la tierra»", ref: "Éxodo 19:5" },
              { texto: "Israel fue escogido para guardar a Dios solo para sí.", verdad: false, explica: "Un sacerdote está entre Dios y los demás: Israel debía mostrar a Dios a las naciones.", apoyo: "Israel debía mostrar a Dios a las naciones", ref: "Éxodo 19:6" },
              { texto: "Un sacerdote está entre Dios y los demás.", verdad: true, explica: "Por eso Israel, llamado a ser un reino de sacerdotes, debía mostrar a Dios a las naciones.", apoyo: "Un sacerdote está entre Dios y los demás" },
            ],
          },
          {
            consigna: "Sobre el Siervo de Dios y el Salmo 67: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según Isaías 49:6, el Siervo de Dios sería luz solo para Israel.", verdad: false, explica: "Dios dice de su Siervo: «también te di por luz de las naciones, para que seas mi salvación hasta lo postrero de la tierra».", apoyo: "el Siervo de Dios es luz de las naciones", ref: "Isaías 49:6" },
              { texto: "Pablo y Bernabé aplicaron Isaías 49:6 a su misión entre los gentiles.", verdad: true, explica: "En Hechos 13:47 aplicaron esas palabras a su misión entre los gentiles.", apoyo: "En Hechos 13:47, Pablo y Bernabé aplicaron estas palabras a su misión entre los gentiles", ref: "Hechos 13:47" },
              { texto: "En el Salmo 67, el salmista pide la bendición de Dios solo para disfrutarla.", verdad: false, explica: "La pide con un propósito: «Para que sea conocido en la tierra tu camino, En todas las naciones tu salvación».", apoyo: "El salmista pide la bendición de Dios con un propósito", ref: "Salmos 67:1-2" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El corazón de Dios es más grande que nuestros prejuicios",
            ref: "Jonás 4:11",
            situacion: "Eres el coordinador de misiones de tu iglesia. Al otro lado del río hay un barrio con el que el tuyo tiene una vieja enemistad, y nadie quiere llevarle el evangelio.",
            escenas: [
              {
                id: "e1",
                narra: "En la reunión de oración, un hermano dice: Que se queden sin el evangelio; ellos nos han hecho mucho daño.",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Le recuerdas que Dios tuvo compasión aun de Nínive, una gran ciudad enemiga.", valor: 2, explica: "El libro de Jonás muestra la compasión de Dios aun por una ciudad enemiga: el corazón de Dios es más grande que nuestros prejuicios.", siguiente: "e2" },
                  { texto: "Le das la razón: Dios tiene compasión solo de los que nos tratan bien a nosotros.", valor: 0, explica: "Jonás huyó porque no quería que Nínive recibiera la misericordia de Dios; pero Dios tuvo compasión de esa gran ciudad.", siguiente: "e1b" },
                  { texto: "Oras por ese barrio, pero propones esperar a que ellos cambien antes de ir allá.", valor: 1, explica: "Orar está bien, pero Dios bendice a su pueblo para que sea bendición a otros, también a los que nos parecen enemigos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Otros hermanos asienten, y sientes que tu propio corazón también se cierra hacia ese barrio.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Reconoces tu prejuicio ante Dios y le pides un corazón como el suyo.", valor: 2, explica: "El corazón de Dios es más grande que nuestros prejuicios: el libro de Jonás termina con una pregunta de Dios sobre su compasión.", siguiente: "e2" },
                  { texto: "Lo dejas así: con ese barrio no se puede, y Dios lo va a entender muy bien.", valor: 0, explica: "Dios tuvo compasión aun de Nínive, una ciudad enemiga de Israel.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El pastor aprueba que la iglesia empiece a servir en ese barrio, y te pide preparar al equipo.",
                pregunta: "¿Con qué actitud lo preparas?",
                opciones: [
                  { texto: "Con la actitud de Dios, que bendice a su pueblo para que bendiga a otros.", valor: 2, explica: "Dios bendice a su pueblo para que sea bendición a otros, también a los que antes fueron enemigos." },
                  { texto: "Con desconfianza: que vayan, pero que no se queden a comer con nadie de allá.", valor: 0, explica: "El corazón de Dios es más grande que nuestros prejuicios: su compasión llega a toda esa gente." },
                  { texto: "Con ganas de servir, aunque todavía con algo de desconfianza hacia ellos.", valor: 1, explica: "Servir está bien, pero el corazón de Dios es más grande que nuestros prejuicios: pídele un corazón como el suyo." },
                ],
              },
              {
                id: "e3",
                narra: "Meses después, varias familias de ese barrio creen en Cristo, y un hermano se queja: Ellos no merecían esa misericordia.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Jonás pensó igual de Nínive, y Dios le preguntó por su compasión.", valor: 2, explica: "Jonás no quería que Nínive recibiera la misericordia de Dios, y el libro termina con una pregunta de Dios sobre su compasión por esa gran ciudad." },
                  { texto: "Que tiene razón, pero que ahora ya no se puede hacer nada para evitarlo.", valor: 0, explica: "Es el mismo error de Jonás: el corazón de Dios es más grande que nuestros prejuicios." },
                  { texto: "Que esas familias tendrán que ganarse primero el cariño de toda la iglesia.", valor: 0, explica: "Jonás no quería que Nínive recibiera la misericordia de Dios; pero Dios tuvo compasión de esa ciudad enemiga." },
                ],
              },
            ],
          },
          {
            apoyo: "el libro de Jonás muestra la compasión de Dios aun por una ciudad enemiga",
            ref: "Jonás 4:1-2",
            situacion: "Eres maestro de la escuela de misiones de tu iglesia. La clase va a escoger por qué pueblo orar este año, y uno de los propuestos es de un país vecino con el que tu país tuvo una guerra.",
            escenas: [
              {
                id: "e1",
                narra: "Un alumno dice: Por ese pueblo no; mi abuelo peleó contra ellos.",
                pregunta: "¿Cómo lo guías?",
                opciones: [
                  { texto: "Leen juntos Jonás 4 y ven la compasión de Dios por una ciudad enemiga.", valor: 2, explica: "El libro de Jonás muestra la compasión de Dios aun por una ciudad enemiga: el corazón de Dios es más grande que nuestros prejuicios.", siguiente: "e2" },
                  { texto: "Le das la razón y quitas a ese pueblo de la lista de oración del año.", valor: 0, explica: "Así pensó Jonás: no quería que Nínive, una ciudad enemiga de Israel, recibiera la misericordia de Dios.", siguiente: "e1b" },
                  { texto: "Le pides que lo piense en casa y sigues la clase sin tocar más el tema.", valor: 1, explica: "Darle tiempo está bien, pero el libro de Jonás habla justo de esto: la compasión de Dios aun por una ciudad enemiga.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al terminar la clase, el alumno parece aliviado, pero tú no estás en paz con lo que decidiste.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a poner a ese pueblo en la lista de oración y le explicas por qué.", valor: 2, explica: "Desde Génesis, Dios tiene en mente a todas las familias de la tierra, también a las de un pueblo enemigo.", siguiente: "e2" },
                  { texto: "Lo dejas así, porque al fin y al cabo hay muchos otros pueblos por alcanzar.", valor: 0, explica: "El corazón de Dios es más grande que nuestros prejuicios: no deja fuera a una ciudad enemiga.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Otra alumna pregunta: ¿Por qué Jonás huyó en vez de ir a Nínive?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Porque no quería que Nínive, su enemiga, recibiera la misericordia de Dios.", valor: 2, explica: "Así lo dice el libro: Jonás huyó porque no quería que Nínive, una ciudad enemiga de Israel, recibiera la misericordia de Dios (Jonás 4:1-2)." },
                  { texto: "Porque tenía mucho miedo de que los de Nínive lo mataran por llevarles su mensaje.", valor: 0, explica: "La lección dice que Jonás huyó porque no quería que Nínive recibiera la misericordia de Dios." },
                  { texto: "Porque Dios todavía no le había dicho con toda claridad qué debía hacer allí.", valor: 0, explica: "Jonás huyó porque no quería que Nínive, una ciudad enemiga de Israel, recibiera la misericordia de Dios." },
                ],
              },
              {
                id: "e3",
                narra: "Al cerrar la clase, quieres dejarles una pregunta para pensar durante la semana.",
                pregunta: "¿Cuál escoges?",
                opciones: [
                  { texto: "¿Hacia qué grupo siento que mi corazón es más pequeño que el de Dios?", valor: 2, explica: "Es la pregunta de la lección: el corazón de Dios es más grande que nuestros prejuicios." },
                  { texto: "¿Qué pueblos lejanos me gustaría visitar algún día como misionero o misionera?", valor: 1, explica: "Pensar en los pueblos es bueno, pero el libro de Jonás pregunta por los que nos cuesta amar." },
                  { texto: "¿Qué pueblos merecen más que otros recibir la misericordia de Dios?", valor: 0, explica: "Jonás no quería que Nínive recibiera la misericordia de Dios; pero el corazón de Dios es más grande que nuestros prejuicios." },
                ],
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
            apoyo: "Pablo explica que esa promesa era el evangelio anunciado de antemano",
            ref: "Génesis 12:3; Gálatas 3:8",
            clave: {
              id: "pr-evangelismo-misiones-3-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué le prometió Dios a Abram en Génesis 12:3, y qué relación tiene esa promesa con el evangelio?",
              ideas: [
                { id: "familias", peso: 50, texto: "Que en él serían benditas todas las familias de la tierra: Dios lo escogió para bendecir a todos los pueblos.", formas: ["todas las familias", "familias de la tierra", "todos los pueblos", "todas las naciones", "bendecir a todos", "bendecir a todas", "seran benditas", "serian benditas", "benditas todas", "bendicion para todos", "bendicion para todas", "bendicion para el mundo"] },
                { id: "evangelio", peso: 50, texto: "Pablo explica que esa promesa era el evangelio anunciado de antemano.", formas: ["evangelio anunciado", "anunciado de antemano", "de antemano", "buena nueva", "buenas nuevas", "promesa era el evangelio", "promesa es el evangelio", "evangelio por adelantado", "evangelio antes de tiempo", "anuncio del evangelio"] },
              ],
              errores: [
                { id: "solo-israel", texto: "La promesa no era solo para Israel: en Abram serían benditas todas las familias de la tierra.", formas: ["solo para israel", "solo para los judios", "solo para su familia", "solo para abraham", "solo para abram", "solo para sus descendientes"], anula: "familias" },
              ],
              modelo: "Dios le prometió a Abram que en él serían benditas todas las familias de la tierra: lo escogió para bendecir a todos los pueblos. Pablo explica que esa promesa era el evangelio anunciado de antemano.",
            },
          },
          {
            apoyo: "La misión no empieza en el Nuevo Testamento",
            ref: "Gálatas 3:8",
            clave: {
              id: "pr-evangelismo-misiones-3-2-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la misión empezó con los apóstoles. ¿Qué le muestras con la promesa a Abraham?",
              ideas: [
                { id: "genesis", peso: 50, texto: "Que la misión no empieza en el Nuevo Testamento: desde Génesis, Dios tiene en mente a todas las familias de la tierra.", formas: ["desde genesis", "en genesis", "antiguo testamento", "no empieza en el nuevo", "no empezo en el nuevo", "no empezo con los apostoles", "antes de los apostoles", "desde abraham", "desde abram", "todas las familias", "familias de la tierra", "todas las naciones", "todos los pueblos"] },
                { id: "evangelio", peso: 50, texto: "Que esa promesa era el evangelio anunciado de antemano, como explica Pablo.", formas: ["evangelio anunciado", "anunciado de antemano", "de antemano", "buena nueva", "buenas nuevas", "promesa era el evangelio", "promesa es el evangelio", "evangelio por adelantado", "evangelio antes de tiempo", "anuncio del evangelio"] },
              ],
              errores: [
                { id: "apostoles", texto: "La misión no empieza en el Nuevo Testamento: desde Génesis, Dios tiene en mente a todas las familias de la tierra.", formas: ["empezo con los apostoles", "comenzo con los apostoles", "nacio con los apostoles", "empieza en el nuevo testamento", "empezo en el nuevo testamento"], anula: "genesis" },
              ],
              modelo: "Le muestro que la misión no empieza en el Nuevo Testamento: desde Génesis, Dios tiene en mente a todas las familias de la tierra. Pablo explica que la promesa a Abraham era el evangelio anunciado de antemano.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Jesús y las naciones
    "evangelismo-misiones-3-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empezó Jesús la gran comisión en Mateo 28?", reverso: "Con su autoridad: «Toda potestad me es dada en el cielo y en la tierra».", apoyo: "Jesús empezó por su autoridad: «Toda potestad me es dada en el cielo y en la tierra»" },
              { frente: "¿Qué mandó Jesús en Mateo 28:19?", reverso: "«id, y haced discípulos a todas las naciones».", apoyo: "Por eso mandó: «id, y haced discípulos a todas las naciones»" },
              { frente: "¿Qué prometió Jesús a los que envía?", reverso: "Estar con ellos todos los días.", apoyo: "y prometió estar con los suyos todos los días" },
              { frente: "¿Qué historia concluye la gran comisión?", reverso: "La historia de la promesa a Abraham.", apoyo: "La gran comisión concluye la historia de la promesa a Abraham" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Lucas, ¿qué muestra Jesús sobre la misión?", reverso: "Que la misión estaba escrita.", apoyo: "En Lucas, Jesús muestra que la misión estaba escrita" },
              { frente: "Según Lucas 24:47, ¿qué se predicaría en su nombre en todas las naciones?", reverso: "El arrepentimiento y el perdón de pecados.", apoyo: "«y que se predicase en su nombre el arrepentimiento y el perdón de pecados en todas las naciones, comenzando desde Jerusalén»" },
              { frente: "Según Lucas, ¿desde dónde comenzaría la predicación a todas las naciones?", reverso: "Desde Jerusalén.", apoyo: "comenzando desde Jerusalén" },
              { frente: "¿Qué les dijo Jesús a los discípulos en Lucas 24:48?", reverso: "«vosotros sois testigos de estas cosas».", apoyo: "Y añadió: «vosotros sois testigos de estas cosas»" },
              { frente: "¿Qué horizonte tiene la misión de la iglesia?", reverso: "Llegar a todos los pueblos.", apoyo: "La misión de la iglesia tiene un horizonte: llegar a todos los pueblos" },
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
            consigna: "¿Lo dice Jesús en Mateo 28 o en Lucas 24? Lleva cada frase a su grupo.",
            grupos: ["Mateo 28:18-20", "Lucas 24:46-48"],
            frases: [
              { texto: "Toda potestad le es dada en el cielo y en la tierra", grupo: 0 },
              { texto: "Manda hacer discípulos a todas las naciones", grupo: 0 },
              { texto: "Promete estar con los suyos todos los días", grupo: 0 },
              { texto: "El Cristo debía padecer y resucitar", grupo: 1 },
              { texto: "Se predicaría el arrepentimiento y el perdón de pecados", grupo: 1 },
              { texto: "La predicación comenzaría desde Jerusalén", grupo: 1 },
              { texto: "Los discípulos son testigos de estas cosas", grupo: 1 },
            ],
            apoyo: "En Lucas, Jesús muestra que la misión estaba escrita",
            ref: "Mateo 28:18-20; Lucas 24:46-48",
            explica: "En Mateo, Jesús empieza por su autoridad, manda hacer discípulos a todas las naciones y promete estar con los suyos todos los días. En Lucas muestra que la misión estaba escrita: el Cristo debía padecer y resucitar, y se predicaría en su nombre el arrepentimiento y el perdón, comenzando desde Jerusalén.",
          },
          {
            consigna: "¿Qué evangelio cuenta cada parte de la gran comisión: Mateo o Lucas? Lleva cada frase a su grupo.",
            grupos: ["Según Mateo", "Según Lucas"],
            frases: [
              { texto: "Jesús empieza por su autoridad", grupo: 0 },
              { texto: "Jesús manda ir y hacer discípulos", grupo: 0 },
              { texto: "Jesús promete su presencia todos los días", grupo: 0 },
              { texto: "La misión ya estaba escrita", grupo: 1 },
              { texto: "Predicar en su nombre el perdón de pecados", grupo: 1 },
              { texto: "Los discípulos son testigos", grupo: 1 },
            ],
            apoyo: "Con toda autoridad, Jesús mandó hacer discípulos a todas las naciones",
            ref: "Mateo 28:18-20; Lucas 24:46-48",
            explica: "Mateo cuenta que, con toda autoridad, Jesús mandó hacer discípulos a todas las naciones y prometió estar con los suyos todos los días. Lucas muestra que la misión estaba escrita: predicar en su nombre el arrepentimiento y el perdón, y los discípulos son testigos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿En qué se apoya Jesús antes de mandar a sus discípulos? Toca las palabras que lo dicen.",
            texto: "[[Toda potestad]] me es dada en el cielo y en la tierra",
            apoyo: "Jesús empezó por su autoridad",
            ref: "Mateo 28:18",
            explica: "Jesús empezó por su autoridad: «Toda potestad me es dada en el cielo y en la tierra». Por eso mandó hacer discípulos a todas las naciones.",
          },
          {
            consigna: "¿Qué promete Jesús a los que obedecen la gran comisión? Toca las palabras que lo dicen.",
            texto: "[[yo estoy con vosotros todos los días]], hasta el fin del mundo",
            apoyo: "La autoridad y la presencia de Cristo sostienen al que obedece la gran comisión",
            ref: "Mateo 28:20",
            explica: "Jesús prometió: «yo estoy con vosotros todos los días». La autoridad y la presencia de Cristo sostienen al que obedece la gran comisión.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué quiere decir naciones en la gran comisión.",
            texto: "En la gran comisión, la palabra naciones habla de [[pueblos]]: grupos con su propia [[lengua]] y su propia [[cultura]], y no de países con fronteras.",
            distractores: ["gobiernos", "bandera", "moneda"],
            errores: {
              gobiernos: "La palabra naciones no habla de países ni de sus gobiernos, sino de pueblos.",
              bandera: "Un pueblo es un grupo con su propia lengua y su propia cultura; la bandera es de los países con fronteras.",
              moneda: "La lección dice que un pueblo tiene su propia lengua y su propia cultura; la moneda es cosa de los países.",
            },
            apoyo: "La palabra que se traduce naciones no habla de países con fronteras, sino de pueblos: grupos con su propia lengua y su propia cultura",
            ref: "Mateo 28:19",
            explica: "La palabra que se traduce naciones no habla de países con fronteras, sino de pueblos: grupos con su propia lengua y su propia cultura. La meta es que haya discípulos de Cristo en cada pueblo.",
          },
          {
            consigna: "Completa cuál es la meta de la gran comisión.",
            texto: "La meta de la gran comisión es que haya discípulos de Cristo en cada [[pueblo]]: en cada grupo con su propia lengua y su propia [[cultura]].",
            distractores: ["país", "frontera"],
            errores: {
              "país": "La palabra naciones no habla de países con fronteras, sino de pueblos.",
              frontera: "Un pueblo es un grupo con su propia lengua y su propia cultura; las fronteras son de los países.",
            },
            apoyo: "La meta es que haya discípulos de Cristo en cada pueblo",
            ref: "Mateo 28:19",
            explica: "La meta es que haya discípulos de Cristo en cada pueblo, es decir, en cada grupo con su propia lengua y su propia cultura, y no solo en cada país.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un diácono de tu iglesia te dice: En nuestro país ya hay iglesias en todas las ciudades, así que aquí la gran comisión ya se cumplió.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Naciones son pueblos con su lengua y su cultura: ¿tiene discípulos cada pueblo?", bien: true, explica: "La palabra naciones no habla de países con fronteras, sino de pueblos; la meta es que haya discípulos de Cristo en cada pueblo." },
              { texto: "Tienes razón: si hay iglesias en cada ciudad, ya no hace falta pensar en nadie más.", explica: "La meta no es tener iglesias en cada ciudad, sino discípulos de Cristo en cada pueblo, con su lengua y su cultura." },
              { texto: "Sí, aquí ya se cumplió; ahora la misión es solo para los países de otros continentes.", explica: "Naciones no son países: son pueblos, grupos con su propia lengua y su propia cultura, también los que viven cerca." },
              { texto: "Las naciones son los países: con iglesias en cada país, la tarea ya quedó terminada.", explica: "La palabra naciones no habla de países con fronteras: un pueblo es un grupo con su lengua y su cultura." },
            ],
            apoyo: "La meta es que haya discípulos de Cristo en cada pueblo",
            ref: "Mateo 28:19",
            explica: "La palabra que se traduce naciones no habla de países con fronteras, sino de pueblos: grupos con su propia lengua y su propia cultura. La meta es que haya discípulos de Cristo en cada pueblo.",
          },
          {
            caso: "Un joven de la escuela de misiones te dice: Naciones quiere decir países; basta con que haya una iglesia en cada país del mundo.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que naciones habla de pueblos: grupos con su propia lengua y su propia cultura.", bien: true, explica: "Así lo enseña la lección: la palabra que se traduce naciones no habla de países con fronteras, sino de pueblos." },
              { texto: "Que tiene razón: el mandato es tener al menos una iglesia en cada país del mapa.", explica: "La meta es que haya discípulos de Cristo en cada pueblo, no solo una iglesia en cada país." },
              { texto: "Que naciones habla solo de los pueblos que viven lejos, en otros continentes.", explica: "Un pueblo es un grupo con su propia lengua y su propia cultura, y puede vivir cerca de nosotros." },
              { texto: "Que naciones quiere decir las ciudades grandes, donde vive la mayor cantidad de gente.", explica: "La palabra naciones no habla de ciudades ni de países, sino de pueblos con su lengua y su cultura." },
            ],
            apoyo: "La palabra que se traduce naciones no habla de países con fronteras, sino de pueblos",
            ref: "Mateo 28:19",
            explica: "La palabra que se traduce naciones habla de pueblos: grupos con su propia lengua y su propia cultura. La meta es que haya discípulos de Cristo en cada pueblo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la base de la misión tiene un error. Tócala.",
            frases: [
              "Jesús empezó la gran comisión hablando de su autoridad.",
              "La base de la misión es la autoridad que tiene la iglesia.",
              "Jesús prometió estar con los suyos todos los días.",
              "La presencia de Cristo sostiene al que obedece la gran comisión.",
            ],
            malo: 1,
            correccion: "La base de la misión es la autoridad de Cristo: «Toda potestad me es dada en el cielo y en la tierra».",
            apoyo: "La autoridad y la presencia de Cristo sostienen al que obedece la gran comisión",
            ref: "Mateo 28:18-20",
            explica: "Jesús empezó por su autoridad, no por la de la iglesia, y prometió estar con los suyos todos los días: su autoridad y su presencia sostienen al que obedece.",
          },
          {
            consigna: "Una de estas frases sobre la autoridad y la presencia de Cristo tiene un error. Tócala.",
            frases: [
              "Jesús tiene toda potestad en el cielo y en la tierra.",
              "Jesús mandó hacer discípulos con toda su autoridad.",
              "Jesús envía a los suyos, pero los deja solos en la tarea.",
              "La autoridad y la presencia de Cristo sostienen la misión.",
            ],
            malo: 2,
            correccion: "Jesús no deja solos a los suyos: prometió «yo estoy con vosotros todos los días».",
            apoyo: "y prometió estar con los suyos todos los días",
            ref: "Mateo 28:20",
            explica: "Con toda autoridad, Jesús mandó hacer discípulos a todas las naciones, y prometió estar con los suyos todos los días.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Con toda autoridad, Jesús mandó hacer discípulos a todas las naciones",
            ref: "Mateo 28:18-20; Lucas 24:46-48",
            clave: {
              id: "pr-evangelismo-misiones-3-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué dice Jesús en la gran comisión según Mateo 28, y qué añade Lucas 24?",
              ideas: [
                { id: "mateo", peso: 50, texto: "En Mateo, con toda autoridad, Jesús manda hacer discípulos a todas las naciones y promete estar con los suyos todos los días.", formas: ["haced discipulos", "hacer discipulos", "haga* discipulos", "hagamos discipulos", "toda potestad", "toda autoridad", "su autoridad", "todos los dias", "estoy con vosotros", "estar con los suyos", "estar con nosotros", "estara con nosotros"] },
                { id: "lucas", peso: 50, texto: "En Lucas, la misión estaba escrita: predicar en su nombre el arrepentimiento y el perdón en todas las naciones, y los discípulos son testigos.", formas: ["estaba escrita", "estaba escrito", "arrepentimiento", "perdon de pecados", "perdon de los pecados", "el perdon", "testigos", "desde jerusalen", "padecer y resucitar"] },
              ],
              modelo: "En Mateo, con toda autoridad, Jesús manda hacer discípulos a todas las naciones y promete estar con los suyos todos los días. Lucas añade que la misión estaba escrita: predicar en su nombre el arrepentimiento y el perdón, y los discípulos son testigos.",
            },
          },
          {
            apoyo: "La gran comisión concluye la historia de la promesa a Abraham",
            ref: "Mateo 28:18-20",
            clave: {
              id: "pr-evangelismo-misiones-3-3-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué la gran comisión no es un mandato suelto al final de los evangelios, y qué manda Jesús en ella?",
              ideas: [
                { id: "abraham", peso: 50, texto: "Porque concluye toda la historia de la promesa a Abraham.", formas: ["promesa a abraham", "promesa a abram", "historia de la promesa", "conclu* la historia", "conclu* toda la historia", "conclusion de la historia", "abraham"] },
                { id: "mandato", peso: 50, texto: "Con toda autoridad, Jesús manda hacer discípulos a todas las naciones, y promete estar con los suyos todos los días.", formas: ["haced discipulos", "hacer discipulos", "haga* discipulos", "todas las naciones", "todos los pueblos", "toda potestad", "toda autoridad", "todos los dias"] },
              ],
              errores: [
                { id: "suelto", texto: "La gran comisión no es un mandato suelto: concluye la historia de la promesa a Abraham.", formas: ["es un mandato suelto", "es un mandato aislado"], anula: "abraham" },
              ],
              modelo: "Porque es la conclusión de toda la historia de la promesa a Abraham. En ella, con toda autoridad, Jesús manda hacer discípulos a todas las naciones y promete estar con los suyos todos los días.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El Espíritu y la iglesia que envía
    "evangelismo-misiones-3-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde serían testigos los discípulos, según Hechos 1:8?", reverso: "En Jerusalén, en toda Judea, en Samaria y hasta lo último de la tierra.", apoyo: "Jesús prometió: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra»" },
              { frente: "¿Quiénes llevaron el evangelio a los griegos de Antioquía?", reverso: "Creyentes comunes, esparcidos por la persecución, y no los apóstoles.", apoyo: "Fueron creyentes comunes, y no los apóstoles, los que cruzaron esa frontera" },
              { frente: "¿Qué dijo el Espíritu Santo a la iglesia de Antioquía?", reverso: "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", apoyo: "el Espíritu Santo dijo: «Apartadme a Bernabé y a Saulo para la obra a que los he llamado»" },
              { frente: "¿Qué puede llegar a ser toda iglesia local?", reverso: "Una Antioquía: una iglesia que envía.", apoyo: "Toda iglesia local puede ser una Antioquía" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Hechos, ¿quién impulsa el evangelio de Jerusalén hacia los pueblos?", reverso: "El Espíritu Santo.", apoyo: "impulsado por el Espíritu Santo y llevado también por creyentes comunes" },
              { frente: "¿Qué hacía la iglesia de Antioquía cuando habló el Espíritu Santo?", reverso: "Ministraba al Señor y ayunaba.", apoyo: "En la iglesia de Antioquía, mientras ministraban al Señor y ayunaban, el Espíritu Santo dijo" },
              { frente: "¿Qué pasó cuando algunos hablaron del Señor Jesús a los griegos en Antioquía?", reverso: "«gran número creyó y se convirtió al Señor».", apoyo: "y «gran número creyó y se convirtió al Señor»" },
              { frente: "¿Cómo sostiene una iglesia que envía a sus misioneros?", reverso: "Con oración, comunicación y ofrendas.", apoyo: "Los sostiene con oración, comunicación y ofrendas" },
              { frente: "¿Qué hace una iglesia que envía cuando le llegan noticias de sus misioneros?", reverso: "Recibe sus informes y celebra lo que Dios hace.", apoyo: "Recibe sus informes y celebra lo que Dios hace (Hechos 14:26-27)" },
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
            consigna: "Ordena el camino de los testigos según Hechos 1:8, del primer lugar al último.",
            pasos: ["Jerusalén", "Toda Judea", "Samaria", "Hasta lo último de la tierra"],
            apoyo: "El libro de Hechos sigue ese camino",
            ref: "Hechos 1:8",
            explica: "Jesús prometió: «me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra». El libro de Hechos sigue ese camino.",
          },
          {
            consigna: "Ordena la promesa de Hechos 1:8, del primer paso al último.",
            pasos: [
              "Recibir poder cuando venga el Espíritu Santo",
              "Ser testigos en Jerusalén",
              "Ser testigos en toda Judea y en Samaria",
              "Ser testigos hasta lo último de la tierra",
            ],
            apoyo: "En Hechos, el evangelio sale de Jerusalén hacia lo último de la tierra con el poder del Espíritu Santo",
            ref: "Hechos 1:8",
            explica: "Primero, el poder del Espíritu Santo; después, testigos en Jerusalén, en toda Judea, en Samaria y hasta lo último de la tierra. El libro de Hechos sigue ese camino.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "¿Cómo llegó Antioquía a ser una iglesia que envía? Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Jesús promete el poder del Espíritu Santo para ser sus testigos", fecha: "Hechos 1:8" },
              { texto: "Creyentes esparcidos por la persecución hablan a los griegos de Antioquía", fecha: "Hechos 11:19-21" },
              { texto: "Mientras ministran y ayunan, el Espíritu aparta a Bernabé y a Saulo", fecha: "Hechos 13:1-3" },
              { texto: "La iglesia recibe sus informes y celebra lo que Dios hace", fecha: "Hechos 14:26-27" },
            ],
            apoyo: "Creyentes comunes llevaron el evangelio a los griegos de Antioquía, y esa iglesia, mientras ministraba y ayunaba, envió a Bernabé y a Saulo",
            explica: "Jesús prometió el poder del Espíritu (Hechos 1:8). Creyentes esparcidos hablaron a los griegos de Antioquía (Hechos 11), esa iglesia envió a Bernabé y a Saulo (Hechos 13) y después recibió sus informes y celebró lo que Dios hizo (Hechos 14).",
          },
          {
            consigna: "Ordena en el tiempo lo que cuenta Hechos de la iglesia que envía, del primer hecho al último.",
            eventos: [
              { texto: "Con el poder del Espíritu, los discípulos serán testigos hasta lo último de la tierra", fecha: "Hechos 1:8" },
              { texto: "En Antioquía, gran número de griegos cree y se convierte al Señor", fecha: "Hechos 11:19-21" },
              { texto: "La iglesia ayuna, ora, impone las manos a Bernabé y a Saulo y los despide", fecha: "Hechos 13:1-3" },
              { texto: "La iglesia que los envió escucha lo que Dios hizo y lo celebra", fecha: "Hechos 14:26-27" },
            ],
            apoyo: "Una iglesia que envía ora, reconoce a los llamados, los envía, los sostiene y celebra lo que Dios hace",
            explica: "Primero, la promesa del poder del Espíritu (Hechos 1:8); después, griegos que creen en Antioquía (Hechos 11); luego la iglesia ayuna, ora y despide a Bernabé y a Saulo (Hechos 13), y al final celebra lo que Dios hizo (Hechos 14).",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la iglesia de Antioquía: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Fueron los apóstoles los que llevaron el evangelio a los griegos de Antioquía.", verdad: false, explica: "Fueron creyentes comunes, y no los apóstoles, los que cruzaron esa frontera.", apoyo: "Fueron creyentes comunes, y no los apóstoles, los que cruzaron esa frontera", ref: "Hechos 11:19-21" },
              { texto: "El Espíritu Santo habló mientras la iglesia ministraba al Señor y ayunaba.", verdad: true, explica: "Mientras ministraban al Señor y ayunaban, el Espíritu Santo dijo: «Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", apoyo: "En la iglesia de Antioquía, mientras ministraban al Señor y ayunaban, el Espíritu Santo dijo", ref: "Hechos 13:2" },
              { texto: "Cuando les hablaron del Señor Jesús a los griegos, gran número creyó y se convirtió.", verdad: true, explica: "Así lo dice Hechos: «gran número creyó y se convirtió al Señor».", apoyo: "y «gran número creyó y se convirtió al Señor»", ref: "Hechos 11:21" },
            ],
          },
          {
            consigna: "Sobre cómo envió Antioquía a Bernabé y a Saulo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Bernabé y Saulo decidieron irse por su cuenta, sin que la iglesia lo supiera.", verdad: false, explica: "La iglesia, «habiendo ayunado y orado, les impusieron las manos y los despidieron».", apoyo: "Y la iglesia, «habiendo ayunado y orado, les impusieron las manos y los despidieron»", ref: "Hechos 13:3" },
              { texto: "Antes de despedirlos, la iglesia ayunó, oró y les impuso las manos.", verdad: true, explica: "«habiendo ayunado y orado, les impusieron las manos y los despidieron»: los envió con el respaldo de toda la iglesia.", apoyo: "Los envía con el respaldo de toda la iglesia", ref: "Hechos 13:3" },
              { texto: "Los creyentes llegaron a Antioquía porque la persecución los había esparcido.", verdad: true, explica: "Los creyentes esparcidos por la persecución llegaron a Antioquía y hablaron también a los griegos.", apoyo: "Los creyentes esparcidos por la persecución llegaron a Antioquía", ref: "Hechos 11:19" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Toda iglesia local puede ser una Antioquía",
            ref: "Hechos 13:1-3",
            titulo: "Una Antioquía en tu barrio",
            relato: [
              "Eres el coordinador de misiones de una iglesia pequeña. Nunca ha enviado a nadie, y el pastor te pide un plan para que llegue a ser una iglesia que envía.",
              "En la iglesia hay una pareja joven que desde hace tiempo siente el llamado a servir donde Cristo no es conocido, y ya sirve con fidelidad en la congregación.",
              "Algunos hermanos opinan que primero hay que juntar el dinero, y que de lo demás se ocupará la pareja cuando esté allá.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por dónde empiezas tu plan?",
                opciones: [
                  { texto: "Por orar con toda la iglesia y buscar juntos la dirección de Dios.", bien: true, explica: "Una iglesia que envía ora y busca la dirección de Dios, como Antioquía, que ministraba al Señor y ayunaba." },
                  { texto: "Por juntar todo el dinero, y después ya se verá qué quiere Dios.", explica: "El primer paso de Antioquía fue orar y buscar la dirección de Dios; el sostén viene después." },
                  { texto: "Por comprar los pasajes de la pareja, para que se vaya cuanto antes.", explica: "Antes de enviar, la iglesia ora, busca la dirección de Dios y reconoce a los que Dios llama." },
                ],
                apoyo: "Ora y busca la dirección de Dios, como Antioquía",
                explica: "En Antioquía, mientras ministraban al Señor y ayunaban, el Espíritu Santo habló: una iglesia que envía empieza por orar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué hace la iglesia con la pareja que siente el llamado?",
                opciones: [
                  { texto: "La reconoce como llamada por Dios y la prepara antes de enviarla.", bien: true, explica: "Una iglesia que envía reconoce a los que Dios llama y los prepara." },
                  { texto: "Le dice que se vaya por su cuenta, si de verdad siente el llamado.", explica: "Una iglesia que envía los envía con el respaldo de toda la iglesia, no por su cuenta." },
                  { texto: "Le pide que espere hasta que la iglesia sea mucho más grande.", explica: "Toda iglesia local puede ser una Antioquía: reconoce a los que Dios llama y los prepara." },
                ],
                apoyo: "Reconoce a los que Dios llama y los prepara",
                explica: "En Antioquía, el Espíritu Santo apartó a Bernabé y a Saulo para la obra a que los había llamado, y la iglesia los reconoció.",
              },
              {
                tipo: "situacion",
                pregunta: "Llega el día de enviarlos. ¿Cómo los despide la iglesia?",
                opciones: [
                  { texto: "Con ayuno y oración, les imponen las manos con el respaldo de todos.", bien: true, explica: "Antioquía, «habiendo ayunado y orado, les impusieron las manos y los despidieron»: los envió con el respaldo de toda la iglesia." },
                  { texto: "Con un saludo rápido en la puerta, al terminar el culto del domingo.", explica: "Una iglesia que envía despide a sus misioneros con el respaldo de toda la iglesia, con ayuno y oración." },
                  { texto: "Solo el pastor los despide, para no quitarle tiempo al culto de todos.", explica: "Los envía con el respaldo de toda la iglesia, como Antioquía." },
                ],
                apoyo: "Los envía con el respaldo de toda la iglesia",
                explica: "Como Antioquía, la iglesia ayuna, ora, les impone las manos y los despide con el respaldo de todos.",
              },
              {
                tipo: "explica",
                apoyo: "Los sostiene con oración, comunicación y ofrendas",
                clave: {
                  id: "pr-evangelismo-misiones-3-4-a5-1",
                  tipo: "corta",
                  pregunta: "Ya están en el campo. ¿Qué hará la iglesia con ellos desde ahora, según el ejemplo de Antioquía?",
                  ideas: [
                    { id: "sostiene", peso: 50, texto: "Sostenerlos con oración, comunicación y ofrendas.", formas: ["orar*", "oracion", "oremos", "orando", "ofrend*", "comunic*", "sosten*", "escrib*", "llamarlos", "llamandol*", "llamadas", "telefon*", "videollamad*", "mand* dinero", "dar dinero"] },
                    { id: "informes", peso: 50, texto: "Recibir sus informes y celebrar lo que Dios hace.", formas: ["informe*", "celebr*", "lo que dios hace", "lo que dios hizo", "lo que dios ha hecho", "lo que dios esta haciendo", "nos cuenten", "escuch* sus", "sus noticias", "reportes"] },
                  ],
                  modelo: "La iglesia los sostendrá con oración, comunicación y ofrendas. Y cuando vuelvan, recibirá sus informes y celebrará lo que Dios hace por medio de ellos.",
                },
              },
            ],
          },
          {
            apoyo: "Una iglesia que envía ora, reconoce a los llamados, los envía, los sostiene y celebra lo que Dios hace",
            ref: "Hechos 13:1-3",
            titulo: "El misionero olvidado",
            relato: [
              "Hace dos años, tu iglesia envió a un hermano a servir en un pueblo de otra lengua. Lo despidieron con un culto especial, pero desde entonces casi nadie ora por él.",
              "Las ofrendas para su sostén bajaron, y nadie le escribe. El hermano te cuenta que se siente solo.",
              "El pastor te nombra coordinador de misiones y te pide que la iglesia vuelva a ser una iglesia que envía.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Según el ejemplo de Antioquía, ¿qué le está faltando a tu iglesia?",
                opciones: [
                  { texto: "Sostener cada mes al misionero con oración, comunicación y ofrendas.", bien: true, explica: "Una iglesia que envía no solo despide: sostiene a sus misioneros con oración, comunicación y ofrendas." },
                  { texto: "Nada más: ya lo despidió con un culto especial, y con eso basta para siempre.", explica: "Despedirlo fue un paso; una iglesia que envía también lo sostiene con oración, comunicación y ofrendas." },
                  { texto: "Pedirle que vuelva, porque una iglesia como la nuestra no puede enviar.", explica: "Toda iglesia local puede ser una Antioquía." },
                ],
                apoyo: "Los sostiene con oración, comunicación y ofrendas",
                explica: "Una iglesia que envía ora, reconoce a los llamados, los envía, los sostiene y celebra lo que Dios hace.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo vuelves a poner a orar a la iglesia por él?",
                opciones: [
                  { texto: "Reúnes a la iglesia para orar por él con regularidad, cada semana.", bien: true, explica: "Una iglesia que envía sostiene a sus misioneros con oración, comunicación y ofrendas." },
                  { texto: "Le pides al pastor que ore por él una vez al año, en el culto misionero.", explica: "Una sola oración al año no es sostener: la iglesia lo sostiene con oración, comunicación y ofrendas." },
                  { texto: "Dejas la oración para cuando él avise que tiene alguna emergencia.", explica: "La iglesia que envía sostiene a sus misioneros con oración, no solo en las emergencias." },
                ],
                apoyo: "Ora y busca la dirección de Dios, como Antioquía",
                explica: "Antioquía oraba y buscaba la dirección de Dios; una iglesia que envía sigue orando por los que envió.",
              },
              {
                tipo: "situacion",
                pregunta: "El misionero viene de visita. ¿Qué hace la iglesia?",
                opciones: [
                  { texto: "Recibe su informe con alegría y celebra lo que Dios hace allá.", bien: true, explica: "Una iglesia que envía recibe sus informes y celebra lo que Dios hace (Hechos 14:26-27)." },
                  { texto: "Le pide que cuente muy rápido, porque el culto ya tiene otras cosas.", explica: "La iglesia que envía escucha sus informes y celebra lo que Dios hace." },
                  { texto: "Le pregunta solo cuánto dinero gastó desde que se fue a servir allá.", explica: "La iglesia recibe sus informes y celebra lo que Dios hace, no solo las cuentas." },
                ],
                apoyo: "Recibe sus informes y celebra lo que Dios hace (Hechos 14:26-27)",
                explica: "Como Antioquía, la iglesia que envía recibe los informes de sus misioneros y celebra lo que Dios hace.",
              },
              {
                tipo: "explica",
                apoyo: "Los sostiene con oración, comunicación y ofrendas",
                clave: {
                  id: "pr-evangelismo-misiones-3-4-a5-2",
                  tipo: "corta",
                  pregunta: "¿Cómo va a sostener tu iglesia a su misionero desde ahora?",
                  ideas: [
                    { id: "oracion", peso: 34, texto: "Orando por él con regularidad.", formas: ["orar*", "oracion", "oremos", "orando", "intercedi*"] },
                    { id: "comunicacion", peso: 33, texto: "Escribiéndole y llamándolo: con comunicación.", formas: ["comunic*", "escrib*", "llamarlo", "llamarle", "llamandol*", "llamadas", "telefon*", "videollamad*", "mensaje*", "carta*", "visit*", "hablar con el", "como esta"] },
                    { id: "ofrendas", peso: 33, texto: "Con ofrendas para su sostén.", formas: ["ofrend*", "dinero", "aport*", "dar para", "dando para", "donativ*", "sosten* economic*"] },
                  ],
                  modelo: "Desde ahora la iglesia orará por él cada semana, le escribiremos para saber cómo está y lo sostendremos con nuestras ofrendas. Cuando venga, recibiremos su informe y celebraremos lo que Dios hace.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Toda iglesia local puede ser una Antioquía",
            ref: "Hechos 13:1-3",
            clave: {
              id: "pr-evangelismo-misiones-3-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué puede hacer tu iglesia para llegar a ser una iglesia que envía, como Antioquía?",
              ideas: [
                { id: "ora", peso: 34, texto: "Orar y buscar la dirección de Dios, como Antioquía.", formas: ["orar*", "oracion", "oremos", "orando", "ayun*", "direccion de dios", "buscar a dios", "busc* la direccion", "busc* la voluntad"] },
                { id: "envia", peso: 33, texto: "Reconocer a los que Dios llama, prepararlos y enviarlos con el respaldo de toda la iglesia.", formas: ["reconoc*", "prepar*", "enviarlos", "enviar a los", "enviar obreros", "respaldo", "impon* las manos", "los que dios llama", "los llamados", "apartar*", "despedir*"] },
                { id: "sostiene", peso: 33, texto: "Sostenerlos con oración, comunicación y ofrendas, y celebrar lo que Dios hace.", formas: ["sosten*", "ofrend*", "comunic*", "informe*", "celebr*", "apoy* a los misioneros", "cuid* a (sus|los) misioneros"] },
              ],
              modelo: "Puede orar y buscar la dirección de Dios, como Antioquía; reconocer a los que Dios llama, prepararlos y enviarlos con el respaldo de toda la iglesia; y sostenerlos con oración, comunicación y ofrendas, celebrando lo que Dios hace.",
            },
          },
          {
            apoyo: "Fueron creyentes comunes, y no los apóstoles, los que cruzaron esa frontera",
            ref: "Hechos 11:19-21",
            clave: {
              id: "pr-evangelismo-misiones-3-4-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Somos una iglesia sencilla, sin apóstoles ni misioneros famosos; enviar no es para nosotros. ¿Qué le respondes con el ejemplo de Antioquía?",
              ideas: [
                { id: "comunes", peso: 50, texto: "Que fueron creyentes comunes, y no los apóstoles, los que llevaron el evangelio a los griegos de Antioquía.", formas: ["creyentes comunes", "gente comun", "hermanos comunes", "personas comunes", "creyentes sencillos", "gente sencilla", "hermanos sencillos", "no fueron los apostoles", "no eran los apostoles", "no los apostoles", "esparcidos"] },
                { id: "antioquia", peso: 50, texto: "Que toda iglesia local puede ser una Antioquía: orar, reconocer a los llamados, enviarlos y sostenerlos.", formas: ["toda iglesia", "cualquier iglesia", "una antioquia", "iglesia local", "(podemos|puede|pueden|podriamos) ser (como|una) antioquia"] },
              ],
              errores: [
                { id: "apostoles", texto: "No fueron los apóstoles: fueron creyentes comunes los que cruzaron esa frontera.", formas: ["fueron los apostoles los que", "fueron los apostoles quienes", "eran los apostoles los que"], anula: "comunes" },
              ],
              modelo: "Le respondo que fueron creyentes comunes, y no los apóstoles, los que llevaron el evangelio a los griegos de Antioquía. Toda iglesia local puede ser una Antioquía: orar, reconocer a los llamados, enviarlos y sostenerlos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Pablo, el misionero
    "evangelismo-misiones-3-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Viajaba Pablo sin rumbo?", reverso: "No: tenía una estrategia, guiada por el Espíritu y por la Escritura.", apoyo: "Pablo no viajaba sin rumbo: tenía una estrategia, guiada por el Espíritu y por la Escritura" },
              { frente: "¿A quiénes buscaba Pablo al predicar?", reverso: "A los que nunca habían oído de Cristo.", apoyo: "Buscaba a los que nunca habían oído de Cristo" },
              { frente: "¿Con quiénes trabajaba Pablo en equipo?", reverso: "Con Bernabé, Silas, Timoteo, Priscila y Aquila.", apoyo: "Trabajar en equipo: Bernabé, Silas, Timoteo, Priscila y Aquila" },
              { frente: "¿Cómo seguía Pablo cuidando a las iglesias?", reverso: "Con visitas y cartas.", apoyo: "Seguir cuidando a las iglesias con visitas y cartas (2 Corintios 11:28)" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde empezaba Pablo su trabajo?", reverso: "En ciudades importantes, desde donde el evangelio se extendía a toda la región.", apoyo: "Empezar en ciudades importantes, desde donde el evangelio se extendía a toda la región (Hechos 19:10)" },
              { frente: "¿Qué hacía Pablo con la cultura de cada lugar?", reverso: "Se adaptaba a ella sin cambiar el evangelio.", apoyo: "Adaptarse a la cultura sin cambiar el evangelio (1 Corintios 9:19-22)" },
              { frente: "En el primer viaje de Pablo, ¿qué se constituyó en cada iglesia?", reverso: "Ancianos: líderes locales.", apoyo: "y «constituyeron ancianos en cada iglesia»" },
              { frente: "¿Qué hizo Pablo al terminar su primer viaje?", reverso: "Volvió a Antioquía y contó a la iglesia lo que Dios había hecho.", apoyo: "Al terminar su primer viaje, Pablo volvió a Antioquía y contó a la iglesia lo que Dios había hecho (Hechos 14:26-27)" },
              { frente: "¿Qué clase de iglesias planta la buena misión?", reverso: "Iglesias que pueden seguir sin el misionero.", apoyo: "La buena misión planta iglesias que pueden seguir sin el misionero" },
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
            consigna: "Une cada parte de la estrategia de Pablo con lo que hacía.",
            pares: [
              ["Ir adonde Cristo no era conocido", "Buscaba a los que nunca habían oído de Cristo"],
              ["Trabajar en equipo", "Servía con Bernabé, Silas, Timoteo, Priscila y Aquila"],
              ["Formar líderes locales", "Constituía ancianos en cada iglesia"],
              ["Seguir cuidando a las iglesias", "Las visitaba y les escribía cartas"],
            ],
            apoyo: "Pablo tenía una estrategia: predicar donde Cristo no era conocido, empezar en ciudades desde donde el evangelio se extendía, trabajar en equipo, adaptarse a la cultura sin cambiar el evangelio, formar líderes locales y seguir cuidando a las iglesias",
            explica: "Pablo predicaba donde Cristo no era conocido, trabajaba en equipo, formaba líderes locales y constituía ancianos, y seguía cuidando a las iglesias con visitas y cartas.",
          },
          {
            consigna: "Une cada idea sobre la estrategia de Pablo con lo que le corresponde.",
            pares: [
              ["Una estrategia, no un viaje sin rumbo", "Guiada por el Espíritu y por la Escritura"],
              ["Empezar en ciudades importantes", "Desde allí el evangelio se extendía a toda la región"],
              ["Adaptarse a la cultura", "Sin cambiar el evangelio"],
              ["Rendir cuentas a su iglesia", "Contó en Antioquía lo que Dios había hecho"],
            ],
            apoyo: "Empezar en ciudades importantes, desde donde el evangelio se extendía a toda la región (Hechos 19:10)",
            ref: "Hechos 14:26-27",
            explica: "Pablo tenía una estrategia, guiada por el Espíritu y por la Escritura: empezaba en ciudades importantes, desde donde el evangelio se extendía a toda la región; se adaptaba a la cultura sin cambiar el evangelio, y rendía cuentas a la iglesia que lo envió.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Dónde se esforzaba Pablo por predicar el evangelio? Toca las palabras que lo dicen.",
            texto: "a predicar el evangelio, [[no donde Cristo ya hubiese sido nombrado]], para no edificar sobre fundamento ajeno",
            apoyo: "Buscaba a los que nunca habían oído de Cristo",
            ref: "Romanos 15:20",
            explica: "Pablo se esforzó «a predicar el evangelio, no donde Cristo ya hubiese sido nombrado»: buscaba a los que nunca habían oído de Cristo.",
          },
          {
            consigna: "Pablo no predicaba donde Cristo ya era conocido. ¿Para qué? Toca las palabras que lo dicen.",
            texto: "no donde Cristo ya hubiese sido nombrado, [[para no edificar sobre fundamento ajeno]]",
            apoyo: "Ir adonde Cristo no era conocido",
            ref: "Romanos 15:20",
            explica: "Pablo predicaba donde Cristo no era conocido, «para no edificar sobre fundamento ajeno»: buscaba a los que nunca habían oído de Cristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La buena misión planta iglesias que pueden seguir sin el misionero",
            ref: "Hechos 14:21-23",
            situacion: "Eres misionero en un pueblo donde Cristo no era conocido. En dos años, un grupo de familias creyó en Cristo y se reúne en una casa.",
            escenas: [
              {
                id: "e1",
                narra: "El grupo crece, y todo depende de ti: predicas, enseñas, visitas y decides todo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Empiezas a formar a dos creyentes fieles para dejarles la obra.", valor: 2, explica: "Pablo formaba líderes locales y les dejaba la obra: la buena misión planta iglesias que pueden seguir sin el misionero.", siguiente: "e2" },
                  { texto: "Sigues haciéndolo todo tú, porque así nadie se equivoca en nada.", valor: 0, explica: "La buena misión planta iglesias que pueden seguir sin el misionero: Pablo formaba líderes locales.", siguiente: "e1b" },
                  { texto: "Pides que otro misionero venga a ayudarte con todo el trabajo.", valor: 1, explica: "Trabajar en equipo es parte de la estrategia de Pablo, pero también formaba líderes locales y les dejaba la obra.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Te enfermas un mes, y el grupo casi deja de reunirse porque nadie sabe qué hacer.",
                pregunta: "¿Qué aprendes?",
                opciones: [
                  { texto: "Que debes formar líderes locales en el grupo y dejarles la obra.", valor: 2, explica: "Pablo constituía ancianos en cada iglesia: plantaba, fortalecía y dejaba líderes.", siguiente: "e2" },
                  { texto: "Que no puedes enfermarte nunca, y que vas a trabajar todavía más.", valor: 0, explica: "La buena misión planta iglesias que pueden seguir sin el misionero.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya hay dos líderes preparados, y te toca ir a otro pueblo donde nadie ha oído de Cristo.",
                pregunta: "¿Qué haces con la iglesia que dejas?",
                opciones: [
                  { texto: "Dejas la obra a los líderes y vuelves a visitarlos y a escribirles.", valor: 2, explica: "Pablo volvía a las ciudades confirmando los ánimos de los discípulos y seguía cuidando a las iglesias con visitas y cartas." },
                  { texto: "Te vas y no vuelves a saber nada de ellos, porque ya tienen sus líderes.", valor: 0, explica: "Pablo seguía cuidando a las iglesias con visitas y cartas." },
                  { texto: "Te quedas unos años más con ellos, aunque ya pueden seguir sin ti.", valor: 1, explica: "Cuidarlos está bien, pero Pablo iba adonde Cristo no era conocido y dejaba la obra a los líderes locales." },
                ],
              },
              {
                id: "e3",
                narra: "La iglesia que te envió te pide noticias del trabajo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les cuentas lo que Dios ha hecho y rindes cuentas de tu trabajo.", valor: 2, explica: "Al terminar su primer viaje, Pablo volvió a Antioquía y contó a la iglesia lo que Dios había hecho: el misionero no trabaja solo." },
                  { texto: "Les dices que el trabajo es tuyo y que no tienen por qué saber nada de él.", valor: 0, explica: "El misionero no trabaja solo, sino enviado y acompañado por su iglesia." },
                  { texto: "Les mandas unas fotos bonitas, pero sin contarles cómo va la obra.", valor: 1, explica: "Mandar noticias está bien, pero Pablo contó a la iglesia lo que Dios había hecho." },
                ],
              },
            ],
          },
          {
            apoyo: "Plantaba, fortalecía y dejaba líderes",
            ref: "Hechos 14:21-23",
            situacion: "Tu iglesia plantó una congregación nueva en un barrio de la ciudad, y el pastor te nombró responsable de acompañarla durante su primer año.",
            escenas: [
              {
                id: "e1",
                narra: "Ya hay un grupo de nuevos discípulos que se reúne cada semana.",
                pregunta: "¿Qué te propones para este año?",
                opciones: [
                  { texto: "Fortalecerlos en la fe y formar entre ellos líderes que sigan la obra.", valor: 2, explica: "Pablo plantaba, fortalecía y dejaba líderes: volvía confirmando los ánimos de los discípulos y constituía ancianos.", siguiente: "e2" },
                  { texto: "Que la congregación dependa siempre de tu iglesia para todo lo que haga.", valor: 0, explica: "La buena misión planta iglesias que pueden seguir sin el misionero.", siguiente: "e1b" },
                  { texto: "Seguir anunciando el evangelio, sin pensar todavía en formar líderes.", valor: 1, explica: "Anunciar el evangelio es el primer paso; Pablo también fortalecía a los discípulos y dejaba líderes.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Seis meses después, la congregación no da un paso sin preguntarte, y nadie quiere hacerse cargo de nada.",
                pregunta: "¿Qué cambias?",
                opciones: [
                  { texto: "Empiezas a formar a líderes locales para poder dejarles la obra.", valor: 2, explica: "Pablo formaba líderes locales y les dejaba la obra (Hechos 14:23).", siguiente: "e2" },
                  { texto: "Nada: así te aseguras de que todo salga siempre como tú lo quieres.", valor: 0, explica: "La buena misión planta iglesias que pueden seguir sin el misionero.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Dos creyentes maduros muestran fidelidad, y la congregación los respeta.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los preparas y, junto con la iglesia, los reconoces como líderes.", valor: 2, explica: "«constituyeron ancianos en cada iglesia»: Pablo formaba líderes locales y les dejaba la obra." },
                  { texto: "Los dejas como ayudantes, pero las decisiones siguen siendo solo tuyas.", valor: 0, explica: "Pablo formaba líderes locales y les dejaba la obra; no la guardaba para sí." },
                  { texto: "Les das la responsabilidad de una vez, sin prepararlos antes en nada.", valor: 1, explica: "Dejarles la obra es la meta, pero Pablo formaba a los líderes locales antes de dejársela." },
                ],
              },
              {
                id: "e3",
                narra: "Termina tu año, y la congregación ya sigue adelante con sus líderes.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Sigues cuidándola con visitas y mensajes, sin quitarles la obra.", valor: 2, explica: "Pablo seguía cuidando a las iglesias con visitas y cartas." },
                  { texto: "La olvidas por completo, porque ya no es tu responsabilidad ni tu tarea.", valor: 0, explica: "Pablo seguía cuidando a las iglesias con visitas y cartas." },
                  { texto: "Vuelves cada semana para decidir tú todo lo que ellos deben hacer.", valor: 0, explica: "Pablo dejaba la obra a los líderes locales y los seguía cuidando: la buena misión planta iglesias que pueden seguir sin el misionero." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que hizo Pablo en su primer viaje, del primer paso al último.",
            pasos: ["Anunciar el evangelio", "Hacer discípulos", "Volver a las ciudades confirmando los ánimos", "Constituir ancianos en cada iglesia"],
            apoyo: "Plantaba, fortalecía y dejaba líderes",
            ref: "Hechos 14:21-23",
            explica: "En su primer viaje, Pablo anunció el evangelio e hizo discípulos; después volvió a las ciudades confirmando los ánimos de los discípulos, y constituyeron ancianos en cada iglesia.",
          },
          {
            consigna: "Ordena el modelo de Pablo para una obra nueva, del primer paso al último.",
            pasos: [
              "Plantar: anunciar el evangelio y hacer discípulos",
              "Fortalecer: confirmar los ánimos de los discípulos",
              "Dejar líderes: formarlos y dejarles la obra",
              "Seguir cuidando a la iglesia con visitas y cartas",
            ],
            apoyo: "Plantaba, fortalecía y dejaba ancianos, y rendía cuentas a la iglesia que lo había enviado",
            ref: "Hechos 14:21-23",
            explica: "Pablo plantaba, fortalecía y dejaba líderes, y después seguía cuidando a las iglesias con visitas y cartas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la estrategia de Pablo tiene un error. Tócala.",
            frases: [
              "Pablo iba adonde Cristo no era conocido.",
              "Pablo empezaba en ciudades importantes, desde donde el evangelio se extendía.",
              "Pablo trabajaba siempre solo, sin compañeros de equipo.",
              "Pablo se adaptaba a la cultura sin cambiar el evangelio.",
            ],
            malo: 2,
            correccion: "Pablo trabajaba en equipo: con Bernabé, Silas, Timoteo, Priscila y Aquila.",
            apoyo: "Trabajar en equipo: Bernabé, Silas, Timoteo, Priscila y Aquila",
            explica: "La estrategia de Pablo incluía trabajar en equipo, con Bernabé, Silas, Timoteo, Priscila y Aquila.",
          },
          {
            consigna: "Una de estas frases sobre cómo trabajaba Pablo tiene un error. Tócala.",
            frases: [
              "Pablo no viajaba sin rumbo: tenía una estrategia.",
              "Pablo cambiaba el evangelio para adaptarse a cada cultura.",
              "Pablo formaba líderes locales y les dejaba la obra.",
              "Pablo seguía cuidando a las iglesias con visitas y cartas.",
            ],
            malo: 1,
            correccion: "Pablo se adaptaba a la cultura sin cambiar el evangelio.",
            apoyo: "Adaptarse a la cultura sin cambiar el evangelio (1 Corintios 9:19-22)",
            ref: "1 Corintios 9:19",
            explica: "Pablo se hizo siervo de todos para ganar a mayor número: se adaptaba a la cultura, pero sin cambiar el evangelio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Buscaba a los que nunca habían oído de Cristo",
            ref: "Romanos 15:20",
            clave: {
              id: "pr-evangelismo-misiones-3-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué principio enseña Romanos 15:20 sobre dónde predicaba Pablo?",
              ideas: [
                { id: "donde", peso: 50, negativa: true, texto: "Pablo se esforzaba por predicar donde Cristo no había sido nombrado, entre los que nunca habían oído de él.", formas: ["no (habia|hubiese|habian|han|ha|era) sido nombrado", "no (era|es) conocido", "no (lo|le) conocian", "no conocian a cristo", "nunca (habian|han|habia) oido", "no (habian|han) oido", "no (habian|han) escuchado", "nunca (habian|han) escuchado", "donde no se conocia", "adonde cristo no"] },
                { id: "fundamento", peso: 50, negativa: true, texto: "Para no edificar sobre fundamento ajeno.", formas: ["fundamento ajeno", "edificar sobre", "construir sobre", "fundamento de otro", "fundamento de otros", "trabajo de otro", "trabajo de otros", "obra de otro", "obra de otros"] },
              ],
              errores: [
                { id: "ajeno", texto: "Pablo no edificaba sobre fundamento ajeno: predicaba donde Cristo no era conocido.", formas: ["edificar sobre fundamento ajeno", "edificaba sobre", "edifica sobre fundamento ajeno", "para edificar sobre", "construir sobre el trabajo", "predicaba donde ya (conocian|conocen|habian|habia)"], anula: "fundamento" },
              ],
              modelo: "Pablo se esforzaba por predicar el evangelio donde Cristo no había sido nombrado, para no edificar sobre fundamento ajeno. Buscaba a los que nunca habían oído de Cristo.",
            },
          },
          {
            apoyo: "Ir adonde Cristo no era conocido",
            ref: "Romanos 15:20",
            clave: {
              id: "pr-evangelismo-misiones-3-5-a7-2",
              tipo: "corta",
              pregunta: "Tu iglesia quiere abrir una obra nueva. ¿Qué le enseña el principio de Romanos 15:20 sobre dónde abrirla?",
              ideas: [
                { id: "donde", peso: 60, negativa: true, texto: "Que la abra donde Cristo no es conocido, entre los que nunca han oído de él.", formas: ["no (habia|hubiese|habian|han|ha|era|es) sido nombrado", "no (era|es) conocido", "no (lo|le) (conocen|conocian)", "no conocen a cristo", "no conocian a cristo", "nunca (habian|han|habia) oido", "no (habian|han) oido", "no (habian|han) escuchado", "nunca (habian|han) escuchado", "donde no (hay|existe|existen) (iglesia|iglesias|creyentes)", "adonde cristo no", "donde cristo no"] },
                { id: "fundamento", peso: 40, negativa: true, texto: "Para no edificar sobre fundamento ajeno.", formas: ["fundamento ajeno", "edificar sobre", "construir sobre", "fundamento de otro", "fundamento de otros", "trabajo de otro", "trabajo de otros", "obra de otro", "obra de otros"] },
              ],
              errores: [
                { id: "ajeno", texto: "El principio es no edificar sobre fundamento ajeno.", formas: ["edificar sobre fundamento ajeno", "edifica sobre fundamento ajeno", "edificaremos sobre", "para edificar sobre", "construir sobre el trabajo"], anula: "fundamento" },
                { id: "donde-hay", texto: "Pablo buscaba a los que nunca habían oído de Cristo, no los lugares donde ya era conocido.", formas: ["donde ya (hay|existen) (iglesias|creyentes)", "donde ya (conocen|conocian) a cristo"], anula: "donde" },
              ],
              modelo: "Le enseña a abrirla donde Cristo no es conocido, entre los que nunca han oído de él, como hacía Pablo. Así no edifica sobre fundamento ajeno.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Toda nación, tribu y lengua
    "evangelismo-misiones-3-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué vio Juan en Apocalipsis 7:9?", reverso: "Una gran multitud que nadie podía contar, de todas naciones, tribus, pueblos y lenguas.", apoyo: "Juan vio «una gran multitud, la cual nadie podía contar, de todas naciones y tribus y pueblos y lenguas»" },
              { frente: "¿Qué celebra el cántico al Cordero en Apocalipsis 5:9?", reverso: "Que con su sangre nos redimió para Dios, de todo linaje, lengua, pueblo y nación.", apoyo: "El cántico al Cordero celebra que «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación»" },
              { frente: "¿Por qué elogió Juan a Gayo?", reverso: "Por recibir a los hermanos que viajaban por el evangelio.", apoyo: "Juan elogió a Gayo por recibir a los hermanos que viajaban por el evangelio" },
              { frente: "¿Qué se celebró en São Paulo, Brasil, en 1987?", reverso: "El primer Congreso Misionero Iberoamericano (COMIBAM).", apoyo: "En 1987 se celebró en São Paulo, Brasil, el primer Congreso Misionero Iberoamericano (COMIBAM)" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la meta de la misión, según el final de la Biblia?", reverso: "Adoradores de Cristo de todos los pueblos.", apoyo: "Esa es la meta de la misión: adoradores de Cristo de todos los pueblos" },
              { frente: "¿Qué clamaba la gran multitud que vio Juan?", reverso: "«La salvación pertenece a nuestro Dios que está sentado en el trono, y al Cordero».", apoyo: "que clamaba: «La salvación pertenece a nuestro Dios que está sentado en el trono, y al Cordero»" },
              { frente: "¿Por quiénes se ora en la misión?", reverso: "Por los pueblos que no conocen a Cristo y por los misioneros.", apoyo: "Orar: por los pueblos que no conocen a Cristo y por los misioneros (Mateo 9:38)" },
              { frente: "¿Qué comparten los que dan y los que van?", reverso: "La misma obra.", apoyo: "Los que dan y los que van comparten la misma obra" },
              { frente: "¿A qué animó COMIBAM a las iglesias de habla hispana y portuguesa?", reverso: "A pasar de ser campo misionero a ser también fuerza misionera.", apoyo: "que animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera" },
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
            consigna: "¿De dónde viene la gran multitud que vio Juan? Toca las palabras que lo dicen.",
            texto: "una gran multitud, la cual nadie podía contar, de [[todas naciones y tribus y pueblos y lenguas]]",
            apoyo: "Esa es la meta de la misión: adoradores de Cristo de todos los pueblos",
            ref: "Apocalipsis 7:9",
            explica: "Juan vio una gran multitud «de todas naciones y tribus y pueblos y lenguas». Esa es la meta de la misión: adoradores de Cristo de todos los pueblos.",
          },
          {
            consigna: "El cántico al Cordero celebra a los que él redimió. ¿De dónde son? Toca las palabras que lo dicen.",
            texto: "con tu sangre nos has redimido para Dios, [[de todo linaje y lengua y pueblo y nación]]",
            apoyo: "La meta de la misión es una multitud de todas las naciones, tribus, pueblos y lenguas que adora a Dios y al Cordero, redimida por su sangre",
            ref: "Apocalipsis 5:9",
            explica: "El cántico al Cordero celebra que «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación»: la meta es una multitud de todos los pueblos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada forma de participar en la misión con lo que enseña la lección.",
            pares: [
              ["Orar", "Por los pueblos que no conocen a Cristo y por los misioneros"],
              ["Ir", "Cruzar fronteras de cultura, de lengua o de país"],
              ["Enviar y sostener", "La iglesia que envía cuida a sus misioneros"],
              ["Dar", "Como los filipenses, que participaron con Pablo dando"],
              ["Recibir", "Acoger a los extranjeros que viven cerca"],
            ],
            apoyo: "Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros",
            explica: "Todos participan: se ora por los pueblos y por los misioneros; algunos van y cruzan fronteras; la iglesia envía y sostiene; se da, como los filipenses; y se recibe a los extranjeros que viven cerca.",
          },
          {
            consigna: "Une cada ejemplo con la forma de participar en la misión que muestra.",
            pares: [
              ["Una familia ora cada semana por un pueblo que no conoce a Cristo", "Orar"],
              ["Una joven cruza a otro país y a otra lengua para servir", "Ir"],
              ["La iglesia despide a una pareja y la cuida en el campo", "Enviar y sostener"],
              ["Un hermano da para la obra, como los filipenses", "Dar"],
              ["Una familia acoge a los extranjeros que viven en su calle", "Recibir"],
            ],
            apoyo: "Cada creyente tiene un lugar en la misión de Dios",
            explica: "Cada creyente tiene un lugar en la misión: orar por los pueblos, ir a cruzar fronteras, enviar y sostener a los misioneros, dar como los filipenses y recibir a los extranjeros que viven cerca.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cada creyente tiene un lugar en la misión de Dios",
            ref: "3 Juan 1:5-8",
            titulo: "Un lugar para cada uno",
            relato: [
              "Eres el coordinador de misiones de tu iglesia, y preparas el domingo misionero del año.",
              "Una hermana mayor te dice que ella no puede ir a ningún país, y que por eso la misión no es para ella.",
              "Esa misma semana llega a la ciudad un hermano que viaja por el evangelio y necesita dónde quedarse unos días.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la hermana?",
                opciones: [
                  { texto: "Que cada creyente tiene un lugar: puede orar, dar y recibir.", bien: true, explica: "Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros." },
                  { texto: "Que tiene razón: la misión es solo para los que pueden ir lejos.", explica: "Ir es una forma de participar, pero no la única: cada creyente tiene un lugar en la misión de Dios." },
                  { texto: "Que, si no puede ir, por lo menos no estorbe a los que sí van.", explica: "Cada creyente tiene un lugar en la misión: también se participa orando, dando y recibiendo." },
                ],
                apoyo: "Cada creyente tiene un lugar en la misión de Dios",
                explica: "Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué hace la iglesia con el hermano que necesita dónde quedarse?",
                opciones: [
                  { texto: "Lo acoge, como Gayo recibió a los que viajaban por el evangelio.", bien: true, explica: "Juan elogió a Gayo por recibirlos: «Nosotros, pues, debemos acoger a tales personas, para que cooperemos con la verdad»." },
                  { texto: "Le dice que busque un hotel, porque no es un misionero de la iglesia.", explica: "Juan elogió a Gayo por recibir a los hermanos que viajaban por el evangelio." },
                  { texto: "Lo recibe, pero solo si promete predicar el domingo en el culto principal.", explica: "Juan elogió a Gayo por recibirlos y pidió acoger a tales personas, «para que cooperemos con la verdad»." },
                ],
                apoyo: "Juan elogió a Gayo por recibir a los hermanos que viajaban por el evangelio",
                explica: "«Nosotros, pues, debemos acoger a tales personas, para que cooperemos con la verdad».",
              },
              {
                tipo: "situacion",
                pregunta: "La hermana quiere ofrendar para la misión, pero cree que eso vale menos que ir. ¿Qué le dices?",
                opciones: [
                  { texto: "Que los que dan y los que van comparten la misma obra.", bien: true, explica: "Al principio, solo los filipenses participaron con Pablo «en razón de dar y recibir»: los que dan y los que van comparten la misma obra." },
                  { texto: "Que sí vale menos que ir, pero que al menos algo es algo.", explica: "Los que dan y los que van comparten la misma obra." },
                  { texto: "Que dar no es participar: la misión es solo de los que van allá.", explica: "Dar es una forma de participar, como los filipenses, que sostuvieron a Pablo." },
                ],
                apoyo: "Los que dan y los que van comparten la misma obra",
                explica: "Los filipenses participaron con Pablo dando: los que dan y los que van comparten la misma obra.",
              },
              {
                tipo: "explica",
                apoyo: "Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros",
                clave: {
                  id: "pr-evangelismo-misiones-3-6-a4-1",
                  tipo: "corta",
                  pregunta: "En el domingo misionero, ¿cómo explicarás las formas de participar en la misión?",
                  ideas: [
                    { id: "orar", peso: 34, texto: "Orar por los pueblos que no conocen a Cristo y por los misioneros.", formas: ["orar*", "oracion", "orando", "oremos", "intercedi*"] },
                    { id: "ir-enviar", peso: 33, texto: "Ir a cruzar fronteras, o enviar y sostener a los misioneros.", formas: ["yendo", "ir a", "cruzar fronteras", "cruzando fronteras", "envi*", "sosten*", "otro pais"] },
                    { id: "dar-recibir", peso: 33, texto: "Dar, como los filipenses, y recibir a los extranjeros que viven cerca.", formas: ["dar", "dando", "daremos", "ofrend*", "recib*", "acog*", "extranjeros"] },
                  ],
                  modelo: "Explicaré que todos participan: orando por los pueblos y por los misioneros, yendo a cruzar fronteras, enviando y sosteniendo a los misioneros, dando como los filipenses y recibiendo a los extranjeros que viven cerca.",
                },
              },
            ],
          },
          {
            apoyo: "Recibir: acoger a los extranjeros que viven cerca, un campo misionero a la puerta de casa",
            ref: "3 Juan 1:5-8",
            titulo: "La familia de la otra cuadra",
            relato: [
              "Tu célula quiere participar en la misión este año, pero nadie del grupo puede ir a otro país.",
              "A la otra cuadra se mudó una familia que viene de otro país y habla otra lengua. Casi no conoce a nadie.",
              "Además, la iglesia sostiene a una misionera que sirve en un pueblo donde Cristo no es conocido.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices al grupo, que se siente fuera de la misión?",
                opciones: [
                  { texto: "Que cada creyente tiene un lugar: también orando, dando y recibiendo.", bien: true, explica: "Cada creyente tiene un lugar en la misión de Dios: orar, ir, enviar, dar y recibir." },
                  { texto: "Que este año no pueden participar, porque nadie del grupo puede ir lejos.", explica: "Ir es solo una de las formas: cada creyente tiene un lugar en la misión de Dios." },
                  { texto: "Que la misión les toca a los pastores y al comité, no a una célula como esta.", explica: "Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros." },
                ],
                apoyo: "Cada creyente tiene un lugar en la misión de Dios",
                explica: "Todos participan en la misión de Dios, aunque no todos vayan a otro país.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué hace la célula con la familia que se mudó a la otra cuadra?",
                opciones: [
                  { texto: "La acoge con cariño: es un campo misionero a la puerta de casa.", bien: true, explica: "Recibir es acoger a los extranjeros que viven cerca, un campo misionero a la puerta de casa." },
                  { texto: "Espera a que aprenda bien nuestra lengua para hablarle de Cristo.", explica: "Recibir es acoger a los extranjeros que viven cerca: se empieza por acogerlos." },
                  { texto: "La deja tranquila: la misión es en otros países, no en esta calle.", explica: "Los extranjeros que viven cerca son un campo misionero a la puerta de casa." },
                ],
                apoyo: "Recibir: acoger a los extranjeros que viven cerca, un campo misionero a la puerta de casa",
                explica: "La misión también está a la puerta de casa: se participa recibiendo a los extranjeros que viven cerca.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo participa la célula con la misionera que sostiene la iglesia?",
                opciones: [
                  { texto: "Ora cada semana por ella y por su pueblo, y da también para su sostén.", bien: true, explica: "Se ora por los pueblos que no conocen a Cristo y por los misioneros, y se da, como los filipenses, que sostuvieron a Pablo." },
                  { texto: "Lee sus noticias cuando llegan, y con eso ya cumple su parte de la misión.", explica: "Leer sus noticias es bueno, pero se participa orando por ella y dando para su sostén." },
                  { texto: "No hace nada, porque eso le toca solo al comité de misiones de la iglesia.", explica: "Cada creyente tiene un lugar: orar por los misioneros y dar para su sostén." },
                ],
                apoyo: "Orar: por los pueblos que no conocen a Cristo y por los misioneros (Mateo 9:38)",
                explica: "La célula participa orando por la misionera y por su pueblo, y dando para su sostén.",
              },
              {
                tipo: "explica",
                apoyo: "Cada creyente tiene un lugar en la misión de Dios",
                clave: {
                  id: "pr-evangelismo-misiones-3-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué forma de participar va a practicar tu célula este año, y cómo lo hará?",
                  ideas: [
                    { id: "forma", peso: 50, texto: "Una forma de participar: orar, ir, enviar y sostener, dar o recibir.", formas: ["orar*", "oracion", "orando", "oremos", "dar", "dando", "daremos", "ofrend*", "recib*", "acog*", "envi*", "sosten*"] },
                    { id: "como", peso: 50, texto: "Cómo lo hará, con algo concreto: cuándo y con quién.", formas: ["cada semana", "cada mes", "cada domingo", "cada dia", "cada (lunes|martes|miercoles|jueves|viernes|sabado)", "todos los (dias|meses|domingos|lunes|martes|miercoles|jueves|viernes|sabados)", "esta semana", "este (mes|sabado|domingo)", "el (lunes|martes|miercoles|jueves|viernes|sabado|domingo)", "visit*", "invit*", "a comer", "a cenar", "a almorzar", "llevar* comida"] },
                  ],
                  modelo: "Este año la célula va a recibir a la familia de la otra cuadra: el sábado la visitaremos y la invitaremos a comer. Y cada semana oraremos por la misionera y daremos una ofrenda para su sostén.",
                },
              },
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
            caso: "Un pastor amigo te dice: En América Latina somos campo misionero; enviar misioneros es cosa de otros continentes.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Desde COMIBAM, en 1987, nuestras iglesias se animan a ser también fuerza misionera.", bien: true, explica: "En 1987, COMIBAM animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera." },
              { texto: "Tienes razón: siempre recibiremos misioneros, y nunca nos tocará a nosotros enviarlos.", explica: "Durante mucho tiempo, América Latina recibió misioneros; desde COMIBAM sus iglesias se animan a ser también fuerza misionera." },
              { texto: "Así es: nuestras iglesias primero tienen que ser ricas, y solo después podrán enviar.", explica: "Los que dan y los que van comparten la misma obra: las iglesias de América Latina se animan a ser también fuerza misionera." },
              { texto: "Enviar está bien, pero solo a los países vecinos que hablan nuestra misma lengua.", explica: "La meta de la misión es una multitud de todas las naciones, tribus, pueblos y lenguas." },
            ],
            apoyo: "Desde COMIBAM, en 1987, las iglesias de América Latina se animan a ser no solo campo misionero, sino también fuerza misionera",
            explica: "Durante mucho tiempo, América Latina recibió misioneros de otros continentes. En 1987, COMIBAM animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera.",
          },
          {
            caso: "Una joven de la escuela de misiones te dice: ¿Para qué estudiar COMIBAM? Eso fue en Brasil hace mucho, y no tiene que ver con nosotros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Animó a las iglesias de habla hispana y portuguesa a ser también fuerza misionera.", bien: true, explica: "COMIBAM, celebrado en São Paulo en 1987, animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera." },
              { texto: "Tienes razón: fue un congreso de Brasil, y era solo para los que hablan portugués allí.", explica: "Fue el primer Congreso Misionero Iberoamericano, y animó a las iglesias de habla hispana y portuguesa." },
              { texto: "Sirve como un dato de historia, pero no cambia nada de lo que hacen nuestras iglesias.", explica: "COMIBAM animó a nuestras iglesias a pasar de ser campo misionero a ser también fuerza misionera." },
              { texto: "Fue donde las iglesias de otros continentes decidieron mandarnos más y más misioneros.", explica: "Fue al revés: animó a las iglesias de habla hispana y portuguesa a ser también fuerza misionera." },
            ],
            apoyo: "que animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera",
            explica: "En 1987 se celebró en São Paulo, Brasil, el primer COMIBAM, que animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre América Latina en la misión: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Durante mucho tiempo, América Latina recibió misioneros de otros continentes.", verdad: true, explica: "Así fue; y en 1987, COMIBAM animó a sus iglesias a ser también fuerza misionera.", apoyo: "Durante mucho tiempo, América Latina recibió misioneros de otros continentes" },
              { texto: "El primer COMIBAM se celebró en 1987 en São Paulo, Brasil.", verdad: true, explica: "En 1987 se celebró en São Paulo, Brasil, el primer Congreso Misionero Iberoamericano (COMIBAM).", apoyo: "En 1987 se celebró en São Paulo, Brasil, el primer Congreso Misionero Iberoamericano (COMIBAM)" },
              { texto: "COMIBAM animó a las iglesias a dejar de enviar y a solo recibir misioneros.", verdad: false, explica: "Fue al revés: las animó a pasar de ser campo misionero a ser también fuerza misionera.", apoyo: "a pasar de ser campo misionero a ser también fuerza misionera" },
            ],
          },
          {
            consigna: "Sobre COMIBAM y Samuel Escobar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "COMIBAM fue un congreso solo para las iglesias de habla portuguesa.", verdad: false, explica: "Animó a las iglesias de habla hispana y portuguesa.", apoyo: "que animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera" },
              { texto: "Samuel Escobar es un teólogo peruano que ha escrito sobre la misión desde América Latina.", verdad: true, explica: "El teólogo peruano Samuel Escobar ha escrito sobre este tiempo de misión desde América Latina.", apoyo: "El teólogo peruano Samuel Escobar ha escrito sobre este tiempo de misión desde América Latina" },
              { texto: "Desde COMIBAM, las iglesias de América Latina se ven solo como campo misionero.", verdad: false, explica: "Desde COMIBAM se animan a ser no solo campo misionero, sino también fuerza misionera.", apoyo: "Desde COMIBAM, en 1987, las iglesias de América Latina se animan a ser no solo campo misionero, sino también fuerza misionera" },
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
            apoyo: "La meta de la misión es una multitud de todas las naciones, tribus, pueblos y lenguas que adora a Dios y al Cordero, redimida por su sangre",
            ref: "Apocalipsis 7:9-10",
            clave: {
              id: "pr-evangelismo-misiones-3-6-a7-1",
              tipo: "corta",
              pregunta: "Según Apocalipsis 5 y 7, ¿cuál es la meta de la misión de Dios?",
              ideas: [
                { id: "multitud", peso: 50, texto: "Una gran multitud de todas las naciones, tribus, pueblos y lenguas.", formas: ["todas las naciones", "todas naciones", "todos los pueblos", "toda nacion", "toda lengua", "toda tribu", "todo linaje", "todo pueblo", "tribus", "lenguas", "linajes", "gran multitud", "cada pueblo"] },
                { id: "adora", peso: 50, texto: "Que adora a Dios y al Cordero, redimida por su sangre.", formas: ["ador*", "al cordero", "el cordero", "su sangre", "la sangre", "redimid*", "redencion", "la salvacion pertenece", "alab*"] },
              ],
              modelo: "La meta de la misión es una gran multitud de todas las naciones, tribus, pueblos y lenguas que adora a Dios y al Cordero, redimida por su sangre: adoradores de Cristo de todos los pueblos.",
            },
          },
          {
            apoyo: "Toda misión necesita una meta",
            ref: "Apocalipsis 5:9",
            clave: {
              id: "pr-evangelismo-misiones-3-6-a7-2",
              tipo: "corta",
              pregunta: "Un hermano pregunta para qué tanto esfuerzo misionero. ¿Qué meta le muestras con el final de la Biblia?",
              ideas: [
                { id: "pueblos", peso: 50, texto: "Adoradores de Cristo de todos los pueblos: una multitud de todas las naciones, tribus, pueblos y lenguas.", formas: ["todas las naciones", "todas naciones", "todos los pueblos", "toda nacion", "toda lengua", "toda tribu", "todo linaje", "todo pueblo", "tribus", "lenguas", "linajes", "gran multitud", "cada pueblo"] },
                { id: "cordero", peso: 50, texto: "Que adoran a Dios y al Cordero, que los redimió con su sangre.", formas: ["ador*", "al cordero", "el cordero", "su sangre", "la sangre", "redimi*", "redencion", "la salvacion pertenece", "alab*"] },
              ],
              modelo: "Le muestro que la meta de la misión son adoradores de Cristo de todos los pueblos: una gran multitud de todas las naciones y lenguas que adora a Dios y al Cordero, que la redimió con su sangre.",
            },
          },
        ],
      },
    ],
  },
};
