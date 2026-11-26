/**
 * Las prácticas de «Evangelismo y consolidación» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-evangelismo-consolidacion.ts), con la guía de docs/academia-practicas.md.
 * Sigue a «Evangelismo personal» (Nivel 2): ahora el evangelismo como ministerio de la iglesia (en equipo, en las casas,
 * en campañas, en la calle, en la radio y en las redes) y la consolidación del nuevo creyente, con escenarios para
 * evangelizar, acompañar y restaurar.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_EVANGELISMO_CONSOLIDACION: PracticasMateria = {
  materia: "n3-evangelismo-consolidacion",
  mision: {
    titulo: "Del primer saludo a un fruto que permanece",
    intro: "Tu iglesia va a dedicar un mes a evangelizar tu barrio y te pidió que ayudes a organizarlo: formar los equipos y salir de dos en dos, anunciar el evangelio en las casas, en la calle, por la radio y en las redes, y después consolidar a los que crean, paso a paso, hasta que echen raíces y empiecen a servir. Repasa las seis lecciones para que cada parte salga bien.",
    cierre: "Ya sabes evangelizar como embajador de Cristo, en equipo y con respeto, por todos los medios, y consolidar a los nuevos creyentes con un plan, con prudencia y con paciencia, para que su fruto permanezca y se multiplique.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El fundamento y la actitud del evangelismo
    "n3-evangelismo-consolidacion-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es el mensaje del evangelismo?", reverso: "El evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", apoyo: "El mensaje es el evangelio" },
              { frente: "¿De quién es el poder para ser testigos de Cristo?", reverso: "Del Espíritu Santo, que Jesús prometió.", apoyo: "El poder es el del Espíritu Santo, que Jesús prometió para que fuéramos sus testigos" },
              { frente: "¿Cuál es el motivo del evangelismo?", reverso: "El amor: «el amor de Cristo nos constriñe».", apoyo: "Y el motivo es el amor" },
              { frente: "¿Qué dos cosas no hace un embajador?", reverso: "No inventa el mensaje ni habla en su propio nombre.", apoyo: "El embajador no inventa el mensaje ni habla en su propio nombre" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quiénes son testigos de Cristo?", reverso: "Todos los creyentes.", apoyo: "Todos los creyentes son testigos" },
              { frente: "¿Qué don le dio Dios a Felipe, según Hechos 21:8?", reverso: "El don de evangelista.", apoyo: "Dios da a algunos el don de evangelista, como a Felipe" },
              { frente: "¿Qué hace el evangelista con los demás creyentes?", reverso: "Los prepara y los anima a evangelizar; no hace el trabajo de todos.", apoyo: "el evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo" },
              { frente: "¿Por qué la iglesia no espera a que la gente llegue sola?", reverso: "Porque la fe viene por el oír, y el oír, por alguien que habla.", apoyo: "La fe viene por el oír, y el oír, por alguien que habla" },
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
            consigna: "¿Qué tiene el evangelismo según la Biblia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "ev", texto: "El evangelismo", x: 50, y: 10 },
              { id: "cristo", texto: "Cristo murió y resucitó", x: 20, y: 55 },
              { id: "espiritu", texto: "El Espíritu Santo", x: 80, y: 55 },
              { id: "amor", texto: "El amor de Cristo", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "ev", a: "cristo", relacion: "su mensaje es" },
              { de: "ev", a: "espiritu", relacion: "su poder viene de" },
              { de: "ev", a: "amor", relacion: "su motivo es" },
            ],
            distractores: ["no necesita", "se hace sin"],
            apoyo: "El evangelismo tiene un mensaje (Cristo murió y resucitó), un poder (el Espíritu Santo) y un motivo (el amor de Cristo)",
            ref: "1 Corintios 15:3-4; Hechos 1:8; 2 Corintios 5:14",
            explica: "El mensaje es el evangelio: Cristo murió por nuestros pecados y resucitó. El poder es el del Espíritu Santo, y el motivo es el amor de Cristo.",
          },
          {
            consigna: "¿Cómo trabaja un embajador de Cristo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cristo", texto: "Cristo", x: 50, y: 10 },
              { id: "tu", texto: "Tú, su embajador", x: 50, y: 45 },
              { id: "mensaje", texto: "Su mensaje", x: 20, y: 88 },
              { id: "gente", texto: "Las personas", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "cristo", a: "tu", relacion: "te envía" },
              { de: "tu", a: "mensaje", relacion: "lo llevas fielmente" },
              { de: "tu", a: "gente", relacion: "les ruegas en su nombre" },
            ],
            distractores: ["lo inventas tú", "les hablas en tu nombre"],
            apoyo: "lleva fielmente la palabra de quien lo envía",
            ref: "2 Corintios 5:20",
            explica: "El embajador no inventa el mensaje ni habla en su propio nombre: lleva fielmente la palabra de quien lo envía. Somos embajadores en nombre de Cristo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el llamado de toda la iglesia y el don de evangelista: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todos los creyentes son testigos de Cristo.", verdad: true, explica: "Todos los creyentes son testigos; además, Dios da a algunos el don de evangelista.", apoyo: "Todos los creyentes son testigos", ref: "Hechos 1:8" },
              { texto: "Hablar de Cristo les toca solo a los que tienen el don de evangelista.", verdad: false, explica: "Todos los creyentes son testigos. El don de evangelista, Dios se lo da a algunos para preparar a todos.", apoyo: "Todos los creyentes son testigos, pero Dios da a algunos el don de evangelista" },
              { texto: "El evangelista prepara y anima a todos los creyentes a evangelizar.", verdad: true, explica: "El evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo.", apoyo: "el evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo", ref: "Efesios 4:11-12" },
            ],
          },
          {
            consigna: "Sobre Felipe, Timoteo y el don de evangelista: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El evangelista hace el trabajo de evangelizar por toda la iglesia.", verdad: false, explica: "El evangelista no hace el trabajo de todos: prepara y anima a todos a hacerlo.", apoyo: "el evangelista no hace el trabajo de todos", ref: "Efesios 4:11-12" },
              { texto: "Hechos llama a Felipe el evangelista.", verdad: true, explica: "Dios da a algunos el don de evangelista, como a Felipe, a quien Hechos llama «Felipe el evangelista».", apoyo: "a quien Hechos llama «Felipe el evangelista»", ref: "Hechos 21:8" },
              { texto: "Pablo le dijo a Timoteo que, como era pastor, dejara la obra de evangelista a otros.", verdad: false, explica: "A Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista».", apoyo: "A Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista»", ref: "2 Timoteo 4:5" },
              { texto: "Dones como el de evangelista existen para preparar a los santos para la obra del ministerio.", verdad: true, explica: "Esos dones existen «a fin de perfeccionar a los santos para la obra del ministerio».", apoyo: "Esos dones existen «a fin de perfeccionar a los santos para la obra del ministerio»", ref: "Efesios 4:11-12" },
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
            caso: "Un hermano de tu célula te dice: Yo no tengo el don de evangelista, así que hablar de Cristo no es para mí.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Todos los creyentes somos testigos, aunque no tengamos ese don.", bien: true, explica: "Es lo que enseña la lección: todos los creyentes son testigos, y Dios da a algunos, además, el don de evangelista." },
              { texto: "Tienes razón: eso déjaselo a los que tienen el don de evangelista.", explica: "Todos los creyentes son testigos: el evangelista no hace el trabajo de todos." },
              { texto: "Pídele al evangelista de la iglesia que les hable a tus amigos por ti.", explica: "El evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo." },
              { texto: "Espera a que Dios te dé ese don, y mientras tanto no hables de Cristo.", explica: "Para ser testigo no hace falta el don de evangelista: todos los creyentes son testigos." },
            ],
            apoyo: "Todos los creyentes son testigos",
            ref: "Hechos 1:8",
            explica: "Todos los creyentes son testigos. El evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo.",
          },
          {
            caso: "Un compañero de la academia te dice: Los pastores no tienen que evangelizar; para eso Dios da evangelistas.",
            pregunta: "¿Qué le respondes con la Biblia?",
            opciones: [
              { texto: "Pablo le dijo a Timoteo, que era pastor: «haz obra de evangelista».", bien: true, explica: "Es lo que dice la lección: a Timoteo, que era pastor, Pablo le pidió hacer obra de evangelista." },
              { texto: "Tienes razón: el pastor enseña a la iglesia y deja esa obra a otros.", explica: "A Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista»." },
              { texto: "Así es: el evangelista tiene el don y evangeliza por todos los demás.", explica: "El evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo." },
              { texto: "Un pastor solo evangeliza si también recibió el don de evangelista.", explica: "Todos los creyentes son testigos, y Pablo le pidió a Timoteo, que era pastor, hacer obra de evangelista." },
            ],
            apoyo: "A Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista»",
            ref: "2 Timoteo 4:5",
            explica: "Todos los creyentes son testigos, y Dios da a algunos el don de evangelista. Aun así, a Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Pedro 3:15",
            consigna: "¿Con qué actitud pide Pedro presentar defensa de nuestra esperanza? Toca las dos palabras.",
            texto: "siempre preparados para presentar defensa con [[mansedumbre]] y [[reverencia]] ante todo el que os demande razón de la esperanza que hay en vosotros",
            apoyo: "El que evangeliza habla con valor, pero sin arrogancia",
            explica: "Pedro pide estar siempre preparados para presentar defensa con mansedumbre y reverencia: el que evangeliza habla con valor, pero sin arrogancia.",
          },
          {
            ref: "Romanos 10:14",
            consigna: "Pablo explica la urgencia con dos preguntas. ¿Qué hace falta para creer, y qué hace falta para oír? Toca las dos palabras.",
            texto: "¿Y cómo creerán en aquel de quien no han [[oído]]? ¿Y cómo oirán sin haber quien les [[predique]]?",
            apoyo: "La fe viene por el oír, y el oír, por alguien que habla",
            explica: "La fe viene por el oír, y el oír, por alguien que habla. Por eso la iglesia no puede esperar a que la gente llegue sola: sale a buscarla, como su Señor.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la actitud del que evangeliza tiene un error. Tócala.",
            frases: [
              "El que evangeliza habla con valor, pero sin arrogancia.",
              "Escucha y respeta a quien no quiere oír.",
              "Insiste hasta que la persona diga que sí, porque es urgente.",
              "Confía en que es el Espíritu quien convence.",
            ],
            malo: 2,
            correccion: "Nadie se convierte por insistencia, engaño o miedo: respetar el no de una persona también es un testimonio.",
            apoyo: "Nadie se convierte por insistencia, engaño o miedo",
            ref: "1 Pedro 3:15",
            explica: "Se evangeliza con urgencia, pero con mansedumbre y respeto: anunciamos con claridad, oramos y dejamos que el Espíritu Santo obre.",
          },
          {
            consigna: "Una de estas frases sobre evangelizar sin presionar tiene un error. Tócala.",
            frases: [
              "La iglesia sale a buscar a la gente, como su Señor.",
              "Anunciamos con claridad y oramos por la persona.",
              "Un poco de miedo ayuda a que alguien se convierta.",
              "Respetar el no de una persona también es un testimonio.",
            ],
            malo: 2,
            correccion: "Nadie se convierte por insistencia, engaño o miedo: anunciamos con claridad, oramos y dejamos que el Espíritu Santo obre.",
            apoyo: "Respetar el no de una persona también es un testimonio",
            explica: "Evangelizar no es presionar: anunciamos con claridad, oramos y dejamos que el Espíritu Santo obre.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El evangelismo tiene un mensaje (Cristo murió y resucitó), un poder (el Espíritu Santo) y un motivo (el amor de Cristo)",
            ref: "2 Corintios 5:14",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es el mensaje, cuál es el poder y cuál es el motivo del evangelismo?",
              ideas: [
                { id: "mensaje", peso: 40, texto: "El mensaje es el evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", formas: ["murio", "muerte", "cruz", "resucit*", "sepult*", "tercer dia"] },
                { id: "poder", peso: 30, texto: "El poder es el del Espíritu Santo, que Jesús prometió para que fuéramos sus testigos.", formas: ["espiritu santo", "espiritu", "santo"] },
                { id: "motivo", peso: 30, texto: "El motivo es el amor de Cristo: «el amor de Cristo nos constriñe».", formas: ["amor", "nos ama", "constri*"] },
              ],
              errores: [
                { id: "poder-amor", texto: "El poder es el del Espíritu Santo; el amor de Cristo es el motivo.", formas: ["poder (es|viene) (el|del|de) amor"], anula: "poder" },
                { id: "motivo-espiritu", texto: "El motivo es el amor de Cristo; el poder es el del Espíritu Santo.", formas: ["motivo (es|viene) (el|del|de) espiritu"], anula: "motivo" },
              ],
              modelo: "El mensaje es el evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día. El poder es el del Espíritu Santo, que nos hace testigos, y el motivo es el amor de Cristo.",
            },
          },
          {
            apoyo: "El embajador no inventa el mensaje ni habla en su propio nombre",
            ref: "2 Corintios 5:20",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué significa para ti ser embajador de Cristo cuando hablas del evangelio?",
              ideas: [
                { id: "fiel", peso: 50, texto: "El embajador lleva fielmente la palabra de quien lo envía: no inventa el mensaje.", formas: ["fiel*", "quien (me|lo|nos|te) envi*", "(me|lo|nos|te) envi*", "lo que (dios|cristo|jesus|el) (dice|dijo|manda|mando)", "su palabra", "palabra de (dios|cristo|jesus)", "mensaje de (dios|cristo|jesus)", "(llevo|lleva|llevamos|llevar) (el|su) mensaje", "no invent*", "sin invent*", "sin cambi*", "tal como"] },
                { id: "nombre", peso: 50, texto: "Habla en nombre de Cristo, y no en su propio nombre: como si Dios rogase por medio de nosotros.", formas: ["en (nombre|lugar) de (cristo|dios|jesus)", "de parte de (cristo|dios|jesus)", "represent*", "rog*", "por medio de nosotros", "(dios|cristo) (habla|ruega|llama)", "enviado* (por|de) (cristo|dios|jesus)", "en su nombre", "no (hablo|habla|hablamos) en (mi|su|nuestro) nombre"] },
              ],
              errores: [
                { id: "invento", texto: "El embajador no inventa el mensaje: lleva fielmente la palabra de quien lo envía.", formas: ["(invent*|cambi*|adapt*) (el|mi|su|un|nuestro) mensaje"], anula: "fiel" },
                { id: "propio", texto: "El embajador no habla en su propio nombre, sino en nombre de Cristo.", formas: ["en (mi|su|nuestro|tu) propio nombre"], anula: "nombre" },
              ],
              modelo: "Ser embajador es hablar en nombre de Cristo, como si Dios rogase por medio de nosotros. No invento el mensaje ni hablo en mi propio nombre: llevo fielmente la palabra de quien me envía.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El evangelismo en equipo, en las casas y en la comunidad
    "n3-evangelismo-consolidacion-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo envió Jesús a los setenta?", reverso: "De dos en dos, delante de él.", apoyo: "Jesús envió a los setenta «de dos en dos delante de él»" },
              { frente: "¿Qué les mandó Jesús antes de enviarlos?", reverso: "Que oraran al Señor de la mies para que envíe obreros.", apoyo: "antes de enviarlos les mandó orar" },
              { frente: "¿Qué hacen dos que salen juntos a evangelizar?", reverso: "Se animan, se cuidan, se corrigen y dan un testimonio más firme.", apoyo: "dos se animan, se cuidan, se corrigen y dan un testimonio más firme" },
              { frente: "¿Qué hace el líder del equipo al final de la salida?", reverso: "Reúne al equipo para orar y evaluar.", apoyo: "reúne al equipo al final para orar y evaluar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién es el hijo de paz?", reverso: "La persona que recibe el mensaje y abre su casa a los demás.", apoyo: "la persona que recibe el mensaje y abre su casa a los demás" },
              { frente: "¿Cómo enseñó Pablo, según Hechos 20:20?", reverso: "Públicamente y por las casas.", apoyo: "Pablo enseñó «públicamente y por las casas»" },
              { frente: "¿Cómo se abren hoy puertas en la comunidad?", reverso: "Sirviendo: con visitas a los enfermos, ayuda en una necesidad o actividades para las familias.", apoyo: "Hoy también se abren puertas sirviendo a la comunidad" },
              { frente: "Además del mensaje, ¿qué otra cosa también predica?", reverso: "La manera de evangelizar: un equipo amable, puntual y respetuoso.", apoyo: "La manera de evangelizar también predica" },
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
            consigna: "Une cada parte del equipo de evangelismo con lo que hace.",
            pares: [
              ["Los intercesores", "Oran antes, durante y después por las personas y por el equipo"],
              ["Los que hablan", "Comparten el testimonio y el evangelio con claridad y respeto"],
              ["Los que acompañan", "Escuchan, oran con la persona y, si lo permite, anotan su contacto"],
              ["El líder", "Prepara el plan, reparte las tareas y cuida la seguridad"],
            ],
            apoyo: "Un equipo de evangelismo ora, habla, acompaña y tiene un líder",
            ref: "Lucas 10:1-2",
            explica: "Los intercesores oran; los que hablan comparten el testimonio y el evangelio; los que acompañan escuchan y, con permiso, anotan el contacto; y el líder prepara el plan y cuida la seguridad.",
          },
          {
            consigna: "¿Quién lo hace en el equipo de evangelismo? Une cada tarea con quien la hace.",
            pares: [
              ["Reunir al equipo al final para orar y evaluar", "El líder"],
              ["Orar antes, durante y después de la salida", "Los intercesores"],
              ["Contar su testimonio con claridad y respeto", "Los que hablan"],
              ["Orar con la persona y anotar su contacto, si ella lo permite", "Los que acompañan"],
            ],
            apoyo: "Los que acompañan: escuchan, oran con la persona y, si ella lo permite, anotan cómo contactarla para el seguimiento",
            ref: "Lucas 10:1-2",
            explica: "En un equipo bien organizado cada uno tiene su tarea: los intercesores oran, los que hablan comparten el testimonio, los que acompañan escuchan y anotan el contacto con permiso, y el líder reúne al final al equipo para orar y evaluar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué Jesús envió a sus discípulos de dos en dos.",
            texto: "El evangelismo empieza en la [[oración]] y se hace en [[compañía]]: dos se animan, se cuidan, se [[corrigen]] y dan un testimonio más firme.",
            distractores: ["prisa", "soledad", "critican"],
            errores: {
              prisa: "El evangelismo empieza en la oración: antes de enviarlos, Jesús les mandó orar.",
              soledad: "Jesús los envió de dos en dos: el evangelismo se hace en compañía.",
              critican: "Dos que salen juntos se animan, se cuidan y se corrigen.",
            },
            apoyo: "El evangelismo empieza en la oración y se hace en compañía",
            ref: "Lucas 10:1-2",
            explica: "Antes de enviarlos, Jesús les mandó orar, y los envió de dos en dos: así se animan, se cuidan, se corrigen y dan un testimonio más firme.",
          },
          {
            consigna: "Completa lo que hace el equipo después de salir a evangelizar.",
            texto: "Al terminar, el equipo se reúne para [[orar]] por las personas, revisar los [[contactos]] y repartir quién [[llamará]] a cada una.",
            distractores: ["discutir", "chismes", "olvidará"],
            errores: {
              discutir: "Al terminar, el equipo se reúne para orar por las personas.",
              chismes: "Se revisan los contactos que se anotaron con permiso, para el seguimiento.",
              "olvidará": "Se reparte quién llamará a cada persona: sin ese paso, el evangelismo no da fruto que permanezca.",
            },
            apoyo: "Al terminar, el equipo se reúne para orar por las personas, revisar los contactos y repartir quién llamará a cada una",
            explica: "Después de salir, el equipo ora, revisa los contactos y reparte las llamadas. Sin ese paso, el evangelismo se queda en un día de actividad y no da fruto que permanezca.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Jesús enseñó a entrar en las casas con un saludo de paz y a buscar al «hijo de paz»",
            ref: "Lucas 10:5-6",
            situacion: "Este sábado sales con tu pareja de evangelismo a visitar las casas de tu barrio, con el conocimiento de tus líderes.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera casa, un señor abre la puerta y los mira con desconfianza.",
                pregunta: "¿Cómo empiezan?",
                opciones: [
                  { texto: "Lo saludan con paz y amabilidad, y le dicen de qué iglesia vienen.", valor: 2, explica: "Jesús enseñó a entrar en las casas con un saludo de paz, y un equipo amable y respetuoso honra el mensaje que lleva.", siguiente: "e2" },
                  { texto: "Le dan un folleto con una sonrisa y pasan pronto a la casa siguiente.", valor: 1, explica: "La amabilidad ayuda, pero Jesús enseñó a entrar con un saludo de paz y a buscar a quien recibe el mensaje.", siguiente: "e2" },
                  { texto: "Lo asustan de entrada: le dicen que, si no se arrepiente hoy, se pierde.", valor: 0, explica: "Asustar no es el saludo de paz que enseñó Jesús: la manera de evangelizar también predica.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El señor se molesta, les dice que no le interesa y empieza a cerrar la puerta.",
                pregunta: "¿Qué hacen ahora?",
                opciones: [
                  { texto: "Piden perdón por la forma, lo bendicen y se van sin insistir.", valor: 2, explica: "Se respeta a quien no quiere escuchar, sin discutir ni insistir: la manera de evangelizar también predica." },
                  { texto: "Le dicen todavía más fuerte que es por su bien, mientras él cierra.", valor: 0, explica: "Se respeta a quien no quiere escuchar, sin discutir ni insistir." },
                ],
              },
              {
                id: "e2",
                narra: "En otra casa, doña Rosa los escucha con gusto y les ofrece reunir a sus vecinas en su sala.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Aceptan con gozo y coordinan con su líder para volver a enseñar allí.", valor: 2, explica: "Doña Rosa es un hijo de paz: recibe el mensaje y abre su casa a los demás. Pablo enseñó «públicamente y por las casas»." },
                  { texto: "Le agradecen y le dicen que, algún día, quizás puedan volver.", valor: 1, explica: "Es bueno volver, pero el hijo de paz abre su casa a los demás: esa puerta no se deja para algún día." },
                  { texto: "Le dicen que invite a sus vecinas al templo, porque en casas no se enseña.", valor: 0, explica: "Pablo enseñó «públicamente y por las casas»: el hijo de paz abre su casa a los demás." },
                ],
              },
              {
                id: "e3",
                narra: "Al final de la mañana, el equipo se vuelve a reunir.",
                pregunta: "¿Qué hacen ahora?",
                opciones: [
                  { texto: "Oran por las personas, revisan los contactos y reparten llamadas.", valor: 2, explica: "Al terminar, el equipo ora por las personas, revisa los contactos y reparte quién llamará a cada una." },
                  { texto: "Oran juntos por las casas que visitaron, y cada uno se va a la suya.", valor: 1, explica: "Orar es parte del cierre, pero sin repartir las llamadas el evangelismo se queda en un día de actividad." },
                  { texto: "Se despiden contentos, porque ya cumplieron con la salida de hoy.", valor: 0, explica: "Sin ese paso, el evangelismo se queda en un día de actividad y no da fruto que permanezca." },
                ],
              },
            ],
          },
          {
            apoyo: "Hoy también se abren puertas sirviendo a la comunidad",
            ref: "Hechos 20:20",
            situacion: "Eres líder de una célula. Quieren alcanzar a las familias de su barrio, donde casi nadie conoce la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "La célula se reúne para planear cómo empezar.",
                pregunta: "¿Qué propones primero?",
                opciones: [
                  { texto: "Orar al Señor de la mies y pensar cómo servir a las familias del barrio.", valor: 2, explica: "El evangelismo empieza en la oración, y hoy también se abren puertas sirviendo a la comunidad.", siguiente: "e2" },
                  { texto: "Organizar una actividad para las familias, y orar al final si hay tiempo.", valor: 1, explica: "Una actividad para las familias abre puertas, pero el evangelismo empieza en la oración.", siguiente: "e2" },
                  { texto: "Repartir folletos en todas las casas el sábado, sin detenerse a orar.", valor: 0, explica: "Antes de enviar a los setenta, Jesús les mandó orar: el evangelismo empieza en la oración.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Antes de salir, alguien recuerda que Jesús mandó orar antes de enviar a los setenta.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Se detienen a orar y piden al Señor de la mies que envíe obreros.", valor: 2, explica: "El evangelismo empieza en la oración y se hace en compañía." },
                  { texto: "Salen igual: ya está todo listo, y oran después si les queda tiempo.", valor: 0, explica: "Antes de enviarlos, Jesús les mandó orar: el evangelismo empieza en la oración." },
                ],
              },
              {
                id: "e2",
                narra: "Visitan a una vecina enferma, y su hija les agradece mucho la visita.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Oran por la enferma, si ella quiere, y se ofrecen a ayudar en algo.", valor: 2, explica: "Una visita a los enfermos y una ayuda en una necesidad abren puertas para el evangelio." },
                  { texto: "Le dejan un folleto a la hija y le dicen que la esperan el domingo.", valor: 1, explica: "Invitar es bueno, pero servir a la familia en su necesidad abre más la puerta." },
                  { texto: "Le toman una foto a la enferma, sin preguntarle, para pedir oración.", valor: 0, explica: "Hay que pedir permiso antes de tomar fotos o anotar datos." },
                ],
              },
              {
                id: "e3",
                narra: "La hija les dice que su mamá quiere que vuelvan, y que ella invitará a sus tías a escuchar.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Ven en ella un hijo de paz y fijan un día para volver a esa casa.", valor: 2, explica: "El hijo de paz es la persona que recibe el mensaje y abre su casa a los demás." },
                  { texto: "Le dicen que sí, pero no fijan un día ni se lo cuentan al equipo.", valor: 1, explica: "La puerta está abierta, pero un equipo bien organizado planea la visita." },
                  { texto: "Le piden que lleve a sus tías al templo, porque en casas no se enseña.", valor: 0, explica: "Pablo enseñó «públicamente y por las casas»." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuida el respeto, la seguridad y la privacidad, o no los cuida? Lleva cada frase a su grupo.",
            grupos: ["Así se cuida a las personas", "Así no se cuida a las personas"],
            frases: [
              { texto: "Salir en pareja y con el conocimiento de los líderes", grupo: 0 },
              { texto: "Pedir permiso antes de tomarle una foto a alguien", grupo: 0 },
              { texto: "Hablar con un menor solo con permiso de sus padres", grupo: 0 },
              { texto: "Pedir los permisos que exige un parque público", grupo: 0 },
              { texto: "Visitar casas a solas, sin que nadie lo sepa", grupo: 1 },
              { texto: "Discutir con un vecino que no quiere escuchar", grupo: 1 },
              { texto: "Anotar los datos de alguien sin pedirle permiso", grupo: 1 },
              { texto: "Hablar a solas con un niño en la calle", grupo: 1, explica: "Con los menores de edad se habla solo con permiso de sus padres y nunca a solas." },
            ],
            apoyo: "actúa con respeto, seguridad y cuidado de la privacidad",
            explica: "Se sale en pareja o en grupo y con el conocimiento de los líderes; se respeta a quien no quiere escuchar; con los menores, solo con permiso de sus padres y nunca a solas; y se pide permiso para fotos y datos.",
          },
          {
            consigna: "¿Es una norma del evangelismo o va contra las normas? Lleva cada frase a su grupo.",
            grupos: ["Es una norma del evangelismo", "Va contra las normas"],
            frases: [
              { texto: "Avisar a los líderes antes de salir a evangelizar", grupo: 0 },
              { texto: "Respetar a las otras iglesias del barrio", grupo: 0 },
              { texto: "Guardar los datos anotados solo para el seguimiento", grupo: 0 },
              { texto: "Despedirse con amabilidad de quien no quiere oír", grupo: 0 },
              { texto: "Seguir insistiendo cuando alguien ya dijo que no", grupo: 1 },
              { texto: "Subir a las redes la foto de una familia sin preguntarle", grupo: 1 },
              { texto: "Usar los datos anotados para algo distinto del seguimiento", grupo: 1, explica: "Los datos se guardan solo para el seguimiento." },
              { texto: "Quedarse a solas con un menor para hablarle de Cristo", grupo: 1 },
            ],
            apoyo: "Pedir permiso antes de tomar fotos o anotar datos, y guardarlos solo para el seguimiento",
            explica: "Se sale con el conocimiento de los líderes, se respeta a los vecinos y a las otras iglesias, se respeta a quien no quiere escuchar y los datos se guardan solo para el seguimiento.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu equipo te dice: Ese niño quiere saber más de Jesús; voy a llevarlo aparte para hablarle a solas.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no: con un menor, solo con permiso de sus padres y nunca a solas.", bien: true, explica: "Es la norma de la lección: con los menores de edad se habla solo con permiso de sus padres y nunca a solas." },
              { texto: "Que sí, pero que lo haga rápido para que nadie se preocupe por ellos.", explica: "Con un menor nunca se habla a solas, aunque sea un momento." },
              { texto: "Que sí: si el niño quiere oír, el permiso de los padres no hace falta.", explica: "Con los menores de edad se habla solo con permiso de sus padres." },
              { texto: "Que mejor le pida al niño su dirección y lo visite otro día él solo.", explica: "Los datos se piden con permiso, y con un menor nunca se está a solas." },
            ],
            apoyo: "Con los menores de edad: hablar solo con permiso de sus padres y nunca a solas",
            explica: "Con los menores de edad se habla solo con permiso de sus padres y nunca a solas: así se cuida a los niños y también al equipo.",
          },
          {
            caso: "Un líder de jóvenes te dice: Llevemos un parlante a la plaza el sábado; no hace falta pedirle permiso a nadie.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Pidamos los permisos de la plaza y cuidemos de no molestar a los vecinos.", bien: true, explica: "Es lo que pide la lección: pedir los permisos que exijan los lugares públicos y respetar a los vecinos." },
              { texto: "Tienes razón: el evangelio no necesita el permiso de nadie para anunciarse.", explica: "Se piden los permisos que exijan los lugares públicos: un equipo respetuoso honra el mensaje que lleva." },
              { texto: "Vamos sin permiso, y si alguien se queja, subimos el volumen del parlante.", explica: "Hay que respetar a los vecinos: la manera de evangelizar también predica." },
              { texto: "Pongámoslo frente a otra iglesia, para que su gente nos oiga también.", explica: "La lección pide respetar a los vecinos y a las otras iglesias." },
            ],
            apoyo: "Pedir los permisos que exijan los lugares públicos y respetar a los vecinos y a las otras iglesias",
            explica: "La manera de evangelizar también predica: un equipo amable, puntual y respetuoso pide los permisos y respeta a los vecinos y a las otras iglesias.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "la persona que recibe el mensaje y abre su casa a los demás",
            ref: "Lucas 10:5-6",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-2-a7-1",
              tipo: "corta",
              pregunta: "¿Quién es el hijo de paz, y cómo enseñó Jesús a entrar en las casas?",
              ideas: [
                { id: "persona", peso: 50, texto: "El hijo de paz es la persona que recibe el mensaje y abre su casa a los demás.", formas: ["recib* el mensaje", "recib* (la|el) (palabra|evangelio)", "acept* (el|la) (mensaje|evangelio|palabra)", "abr* su casa", "abr* (la|las|su|sus) puerta*", "abre su hogar", "(reun*|invit*|llam*) a (su|sus) (familia|vecin*|amig*)"] },
                { id: "saludo", peso: 50, texto: "Jesús enseñó a entrar en las casas con un saludo de paz.", formas: ["saludo de paz", "salud* (con|en) paz", "paz a (esta|la) casa", "con (el|un) saludo", "salud*"] },
              ],
              modelo: "El hijo de paz es la persona que recibe el mensaje y abre su casa a los demás, para que también escuchen. Jesús enseñó a entrar en las casas con un saludo de paz y a buscar a esa persona.",
            },
          },
          {
            apoyo: "Hoy también se abren puertas sirviendo a la comunidad: una visita a los enfermos, una ayuda en una necesidad, una actividad para las familias",
            ref: "Hechos 20:20",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-2-a7-2",
              tipo: "corta",
              pregunta: "Además de visitar las casas, ¿cómo se abren hoy puertas para el evangelio en la comunidad? Da un ejemplo.",
              ideas: [
                { id: "servir", peso: 50, texto: "Sirviendo a la comunidad.", formas: ["servi*", "sirv*", "ayud*"] },
                { id: "ejemplo", peso: 50, texto: "Por ejemplo, con una visita a los enfermos, una ayuda en una necesidad o una actividad para las familias.", formas: ["enferm*", "necesidad*", "actividad*", "familias", "comida", "hospital*"] },
              ],
              modelo: "Se abren puertas sirviendo a la comunidad: por ejemplo, con una visita a los enfermos, con una ayuda en una necesidad o con una actividad para las familias del barrio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Campañas, calle, radio y redes
    "n3-evangelismo-consolidacion-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo escuchaba la gente a Felipe en Samaria?", reverso: "Unánime, y escuchaba con atención.", apoyo: "«la gente, unánime, escuchaba atentamente las cosas que decía Felipe»" },
              { frente: "¿Para qué reúne una campaña a muchas personas?", reverso: "Para escuchar el evangelio.", apoyo: "Una campaña reúne a muchas personas para escuchar el evangelio" },
              { frente: "En Atenas, ¿dónde hablaba Pablo, además de la sinagoga?", reverso: "En la plaza, cada día, con los que concurrían.", apoyo: "En Atenas, Pablo hablaba en la sinagoga y también «en la plaza cada día con los que concurrían»" },
              { frente: "¿Qué pide el evangelismo en la calle?", reverso: "Sabiduría: un mensaje corto y claro, y la disposición a conversar.", apoyo: "El evangelismo en la calle pide sabiduría" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Adónde llega la radio?", reverso: "A casas, carros, hospitales y cárceles donde ningún predicador podría entrar.", apoyo: "La radio entra en casas, carros, hospitales y cárceles donde ningún predicador podría entrar" },
              { frente: "¿Cómo es un buen contenido en las redes?", reverso: "Breve, verdadero y centrado en Cristo.", apoyo: "Un buen contenido es breve, verdadero y centrado en Cristo" },
              { frente: "¿Adónde se pasan las conversaciones personales de las redes?", reverso: "A un mensaje privado y, si la persona quiere, a una iglesia cercana.", apoyo: "Las conversaciones personales se pasan a un mensaje privado" },
              { frente: "¿Cómo se mide el fruto de una campaña o de una publicación?", reverso: "Por las personas que conocen a Cristo y siguen creciendo en una iglesia.", apoyo: "El fruto no se mide por la cantidad de público o de vistas, sino por personas que conocen a Cristo y siguen creciendo en una iglesia" },
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
            consigna: "Completa cómo se prepara una campaña.",
            texto: "Una campaña reúne a muchas personas para escuchar el evangelio: con oración durante [[semanas]], con una invitación [[clara]] y con alabanza y predicación centradas en [[Cristo]].",
            distractores: ["minutos", "confusa", "emociones"],
            errores: {
              minutos: "Una campaña se prepara con oración durante semanas.",
              confusa: "La invitación de una campaña es clara.",
              emociones: "La alabanza y la predicación de una campaña están centradas en Cristo.",
            },
            apoyo: "con oración durante semanas, con una invitación clara, con alabanza y predicación centradas en Cristo",
            ref: "Hechos 8:5-6",
            explica: "Una campaña lleva oración durante semanas, una invitación clara, alabanza y predicación centradas en Cristo, un llamado sin manipulación y un equipo listo para atender a cada persona que responde.",
          },
          {
            consigna: "Completa lo que pide el evangelismo en la calle.",
            texto: "El evangelismo en la calle pide [[sabiduría]]: un mensaje [[corto]] y claro, testimonios reales y la disposición a [[conversar]] con quien se detiene.",
            distractores: ["prisa", "largo", "discutir"],
            errores: {
              prisa: "El evangelismo en la calle pide sabiduría.",
              largo: "En la calle el mensaje es corto y claro.",
              discutir: "Hay que estar dispuesto a conversar con quien se detiene, no a discutir.",
            },
            apoyo: "El evangelismo en la calle pide sabiduría: un mensaje corto y claro, testimonios reales, literatura bien hecha, permiso donde haga falta y la disposición a conversar con quien se detiene",
            ref: "Hechos 17:17",
            explica: "Como Pablo en la plaza, en la calle se necesita sabiduría: un mensaje corto y claro, testimonios reales, literatura bien hecha, permiso donde haga falta y la disposición a conversar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Hechos 8:6",
            consigna: "¿Cómo escuchaba la gente a Felipe en Samaria? Toca las dos palabras que lo dicen.",
            texto: "la gente, [[unánime]], escuchaba [[atentamente]] las cosas que decía Felipe",
            apoyo: "Una campaña reúne a muchas personas para escuchar el evangelio",
            explica: "Felipe predicó en Samaria, y «la gente, unánime, escuchaba atentamente las cosas que decía Felipe»: una campaña reúne a muchas personas para escuchar el evangelio.",
          },
          {
            ref: "Hechos 17:17",
            consigna: "En Atenas, ¿dónde hablaba Pablo además de la sinagoga, y cada cuánto? Toca las palabras que lo dicen.",
            texto: "en la [[plaza]] [[cada día]] con los que concurrían",
            apoyo: "El evangelismo en la calle pide sabiduría",
            explica: "En Atenas, Pablo hablaba en la sinagoga y también «en la plaza cada día con los que concurrían»: así se evangeliza en la calle y en la plaza.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se evangeliza en las redes, o así no se hace? Lleva cada frase a su grupo.",
            grupos: ["Así se evangeliza en las redes", "Así no se evangeliza en las redes"],
            frases: [
              { texto: "Publicar algo breve, verdadero y centrado en Cristo", grupo: 0 },
              { texto: "Responder con amor un comentario que critica", grupo: 0 },
              { texto: "Pasar una conversación personal a un mensaje privado", grupo: 0 },
              { texto: "Invitar a una iglesia cercana a quien lo quiera", grupo: 0 },
              { texto: "Entrar en peleas en los comentarios", grupo: 1 },
              { texto: "Publicar la foto de alguien sin su permiso", grupo: 1 },
              { texto: "Seguir en público una conversación personal", grupo: 1, explica: "Las conversaciones personales se pasan a un mensaje privado." },
            ],
            apoyo: "Un buen contenido es breve, verdadero y centrado en Cristo",
            ref: "2 Timoteo 2:24-25",
            explica: "Un buen contenido es breve, verdadero y centrado en Cristo; responde con amor y no entra en peleas; lo personal se pasa a un mensaje privado, y nunca se publican datos ni fotos sin permiso.",
          },
          {
            consigna: "¿Así evangeliza un programa de radio, o así no lo hace? Lleva cada frase a su grupo.",
            grupos: ["Así evangeliza la radio", "Así no evangeliza la radio"],
            frases: [
              { texto: "Presentar a Cristo con claridad", grupo: 0 },
              { texto: "Contar historias de vidas cambiadas", grupo: 0 },
              { texto: "Invitar a los oyentes a llamar o escribir", grupo: 0 },
              { texto: "Dar seguimiento a quienes responden", grupo: 0 },
              { texto: "Dejar sin respuesta a quien llamó para pedir oración", grupo: 1 },
              { texto: "Inventar historias para que el programa guste más", grupo: 1, explica: "El programa cuenta historias de vidas cambiadas: un buen contenido es verdadero." },
              { texto: "Hablar de muchas cosas sin presentar a Cristo", grupo: 1 },
            ],
            apoyo: "un programa de radio evangeliza cuando presenta a Cristo con claridad, cuenta historias de vidas cambiadas, invita a llamar o escribir y da seguimiento a quienes responden",
            explica: "La radio entra donde ningún predicador podría entrar, y un programa evangeliza cuando presenta a Cristo con claridad, cuenta vidas cambiadas, invita a llamar o escribir y da seguimiento.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la radio y las redes: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La radio llega a lugares donde ningún predicador podría entrar.", verdad: true, explica: "La radio entra en casas, carros, hospitales y cárceles donde ningún predicador podría entrar.", apoyo: "La radio entra en casas, carros, hospitales y cárceles donde ningún predicador podría entrar" },
              { texto: "En las redes conviene defender la fe discutiendo con quien se burla.", verdad: false, explica: "Se responden los comentarios con amor y no se entra en peleas, porque «el siervo del Señor no debe ser contencioso, sino amable para con todos».", apoyo: "responde los comentarios con amor y no entra en peleas", ref: "2 Timoteo 2:24" },
              { texto: "Basta con presentar a Cristo por la radio: el seguimiento sobra.", verdad: false, explica: "Un programa de radio evangeliza cuando también da seguimiento a quienes responden.", apoyo: "da seguimiento a quienes responden" },
            ],
          },
          {
            consigna: "Sobre evangelizar por las redes: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En las redes, el evangelio compite con miles de mensajes.", verdad: true, explica: "Por eso un buen contenido es breve, verdadero y centrado en Cristo.", apoyo: "En las redes, el evangelio compite con miles de mensajes" },
              { texto: "Un buen contenido en las redes es largo, para explicarlo todo.", verdad: false, explica: "Un buen contenido es breve, verdadero y centrado en Cristo.", apoyo: "Un buen contenido es breve, verdadero y centrado en Cristo" },
              { texto: "El siervo del Señor es amable para con todos, también en las redes.", verdad: true, explica: "En las redes se responde con amor, porque «el siervo del Señor no debe ser contencioso, sino amable para con todos».", apoyo: "«el siervo del Señor no debe ser contencioso, sino amable para con todos»", ref: "2 Timoteo 2:24" },
              { texto: "Para pedir oración, se puede publicar la foto de alguien sin su permiso.", verdad: false, explica: "Nunca se publican datos ni fotos de alguien sin su permiso.", apoyo: "Nunca se publican datos ni fotos de alguien sin su permiso" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "¿Se contaron los resultados con honestidad, sin inflar los números?",
            ref: "Hechos 8:5-6",
            situacion: "Tu iglesia hizo una campaña en el parque del barrio, y el pastor te pidió que ayudes a evaluarla con el equipo.",
            escenas: [
              {
                id: "e1",
                narra: "En la reunión del lunes, alguien dice: Vinieron unas 300 personas; ¡fue un éxito!",
                pregunta: "¿Qué preguntas primero?",
                opciones: [
                  { texto: "¿Quedó claro que Cristo murió y resucitó, y se llamó a la fe?", valor: 2, explica: "Lo primero es la fidelidad al mensaje: ¿se anunció con claridad que Cristo murió y resucitó, y se llamó al arrepentimiento y a la fe?" },
                  { texto: "¿Cuántas personas pasaron adelante cuando se hizo el llamado al final?", valor: 1, explica: "Importa, pero primero se evalúa la fidelidad al mensaje, y el fruto se ve en las personas que siguen creciendo." },
                  { texto: "¿Cuántas sillas faltaron? Para la próxima hay que traer muchas más.", valor: 0, explica: "El fruto no se mide por la cantidad de público, sino por personas que conocen a Cristo y siguen creciendo en una iglesia." },
                ],
              },
              {
                id: "e2",
                narra: "Alguien cuenta que en el llamado se insistió mucho, y que algunos pasaron adelante con miedo.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Que el próximo llamado sea claro, sin presión ni manipulación.", valor: 2, explica: "Una campaña lleva un llamado sin manipulación: ¿se respetó a las personas y se evitó toda presión?", siguiente: "e3" },
                  { texto: "Que se revise el llamado con el pastor antes de la próxima campaña.", valor: 1, explica: "Revisarlo está bien, pero ya se sabe lo que pide la lección: un llamado sin presión ni manipulación.", siguiente: "e3" },
                  { texto: "Que se insista igual, porque así pasan más personas adelante.", valor: 0, explica: "Se evalúa si se respetó a las personas y se evitó toda presión o manipulación.", siguiente: "e2b" },
                ],
              },
              {
                id: "e2b",
                narra: "El equipo de seguimiento cuenta que varios de los que pasaron con miedo ya no contestan.",
                pregunta: "¿Qué propones ahora?",
                opciones: [
                  { texto: "Reconocer el error: el llamado se hace sin presión ni manipulación.", valor: 2, explica: "Evaluar con verdad es reconocer lo que no se hizo bien: el llamado se hace sin manipulación." },
                  { texto: "Seguir igual, porque lo importante es cuántos pasaron adelante al final.", valor: 0, explica: "El fruto no se mide por números, sino por personas que conocen a Cristo y siguen creciendo." },
                ],
              },
              {
                id: "e3",
                narra: "Ahora toca preparar el informe de la campaña para la iglesia.",
                pregunta: "¿Qué pones en el informe?",
                opciones: [
                  { texto: "Los números reales, y quién llamará a los que dejaron su contacto.", valor: 2, explica: "Se cuentan los resultados con honestidad, y se dice cuántas personas quedaron con un contacto y quién las llamará." },
                  { texto: "Solo cuántas personas llegaron al parque, sin agregar ni quitar nada.", valor: 1, explica: "Es honesto, pero el fruto no se mide por el público: falta el seguimiento." },
                  { texto: "Una cifra redonda más alta, para que la iglesia se anime todavía más.", valor: 0, explica: "Los resultados se cuentan con honestidad, sin inflar los números." },
                ],
              },
            ],
          },
          {
            apoyo: "El fruto no se mide por la cantidad de público o de vistas",
            ref: "2 Timoteo 2:24-25",
            situacion: "Llevas un mes publicando videos cortos del ministerio en las redes, y el equipo de medios se reúne para evaluar.",
            escenas: [
              {
                id: "e1",
                narra: "Un video tuvo miles de vistas, pero casi no habla de Cristo.",
                pregunta: "¿Qué dices en la reunión?",
                opciones: [
                  { texto: "Que el mensaje va primero: los próximos, centrados en Cristo.", valor: 2, explica: "Los medios cambian, el mensaje no: un buen contenido es breve, verdadero y centrado en Cristo." },
                  { texto: "Que lo dejen publicado, pero que el próximo hable más de Cristo.", valor: 1, explica: "Va mejor, pero cada contenido debe estar centrado en Cristo." },
                  { texto: "Que hagan más videos como ese, porque las vistas son el fruto.", valor: 0, explica: "El fruto no se mide por la cantidad de vistas, sino por personas que conocen a Cristo." },
                ],
              },
              {
                id: "e2",
                narra: "Diez personas escribieron por mensaje privado para pedir oración.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Responder a cada una con amor y, si quiere, acercarla a una iglesia.", valor: 2, explica: "Las conversaciones personales siguen en privado y, si la persona quiere, pasan a una iglesia cercana." },
                  { texto: "Contestarles a todas con el mismo mensaje de bendición, ya escrito antes.", valor: 1, explica: "Responder es bueno, pero cada persona merece una respuesta con amor y un seguimiento." },
                  { texto: "Publicar sus nombres y sus pedidos, para que toda la iglesia ore.", valor: 0, explica: "Nunca se publican datos ni fotos de alguien sin su permiso." },
                ],
              },
              {
                id: "e3",
                narra: "El pastor pregunta cómo les fue este mes en las redes.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Cuántos pidieron oración y quién los acompaña, contado con verdad.", valor: 2, explica: "Se cuentan los resultados con honestidad, y se dice quién dará seguimiento a cada persona." },
                  { texto: "El número exacto de vistas que tuvo cada video, sin agregar ni quitar.", valor: 1, explica: "Es honesto, pero el fruto no se mide por las vistas." },
                  { texto: "Un número de vistas redondeado hacia arriba, para que el pastor se anime.", valor: 0, explica: "Los resultados se cuentan con honestidad, sin inflar los números." },
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
            apoyo: "El fruto no se mide por la cantidad de público o de vistas, sino por personas que conocen a Cristo y siguen creciendo en una iglesia",
            ref: "Hechos 8:5-6",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se evalúa una actividad de evangelismo, y en qué se mide su fruto?",
              ideas: [
                { id: "mensaje", peso: 50, texto: "Se evalúa si se anunció con claridad que Cristo murió y resucitó, si se respetó a las personas y si los resultados se contaron con honestidad.", formas: ["murio", "resucit*", "con claridad", "fiel*", "arrepent*", "respet*", "honest*", "sin inflar"] },
                { id: "fruto", peso: 50, texto: "El fruto no se mide por la cantidad de público o de vistas, sino por personas que conocen a Cristo y siguen creciendo en una iglesia.", formas: ["siguen creciendo", "sigan creciendo", "crec*", "conoc* a (cristo|jesus|dios)", "discipul*", "permanec*"] },
              ],
              errores: [
                { id: "numeros", texto: "El fruto no se mide por la cantidad de público o de vistas.", formas: ["mide por (la|el|los|las) (cantidad|numero|numeros|vistas|publico|gente)", "mide (con|en) (la|el|los|las) (cantidad|numero|numeros|vistas|publico)", "fruto (son|es) (la|el|los|las) (cantidad|numero|numeros|vistas|publico)"], anula: "fruto" },
              ],
              modelo: "Se evalúa si se anunció con claridad que Cristo murió y resucitó, si se respetó a las personas y si se contaron los resultados con honestidad. El fruto no se mide por el público, sino por personas que conocen a Cristo y siguen creciendo.",
            },
          },
          {
            apoyo: "¿Se contaron los resultados con honestidad, sin inflar los números?",
            ref: "Hechos 8:5-6",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-3-a7-2",
              tipo: "corta",
              pregunta: "Después de una campaña, ¿qué preguntas te haces para evaluarla con verdad?",
              ideas: [
                { id: "mensaje", peso: 35, texto: "¿Se anunció con claridad que Cristo murió y resucitó, y se llamó al arrepentimiento y a la fe?", formas: ["murio", "resucit*", "con claridad", "arrepent*", "llam* a la fe", "el mensaje"] },
                { id: "respeto", peso: 30, negativa: true, texto: "¿Se respetó a las personas y se evitó toda presión o manipulación?", formas: ["respet*", "presion*", "manipul*"] },
                { id: "seguimiento", peso: 35, texto: "¿Cuántas personas quedaron con un contacto para el seguimiento, y quién las llamará? ¿Se contaron los resultados con honestidad?", formas: ["seguimiento", "contacto*", "llamar*", "honest*", "inflar", "numeros"] },
              ],
              modelo: "Me pregunto si se anunció con claridad que Cristo murió y resucitó y se llamó a la fe; si se respetó a las personas, sin presión ni manipulación; y cuántas quedaron con un contacto para el seguimiento, contando todo con honestidad.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La consolidación: cuidar el fruto
    "n3-evangelismo-consolidacion-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es consolidar?", reverso: "Afirmar, dar firmeza: acompañar al que creyó para que eche raíces.", apoyo: "Consolidar es afirmar, dar firmeza" },
              { frente: "¿Adónde volvieron Pablo y Bernabé en el primer viaje?", reverso: "A las ciudades donde había nuevos creyentes, para confirmarlos en la fe.", apoyo: "volvieron a las ciudades donde había nuevos creyentes" },
              { frente: "¿Por qué son decisivas las primeras semanas?", reverso: "Porque tiene preguntas y presiones, y todavía no conoce la Biblia ni la iglesia.", apoyo: "Las primeras semanas son decisivas" },
              { frente: "¿Cómo es la fe que no tiene raíz?", reverso: "De corta duración.", apoyo: "Sin raíz, la fe es de corta duración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con quiénes compara Pedro a los nuevos creyentes?", reverso: "Con niños recién nacidos, que desean la leche espiritual para crecer.", apoyo: "Pedro compara a los nuevos creyentes con niños recién nacidos" },
              { frente: "¿Cómo cuidó Pablo a los tesalonicenses?", reverso: "«como la nodriza que cuida con ternura a sus propios hijos».", apoyo: "Pablo cuidó así a los tesalonicenses" },
              { frente: "¿Qué manda la gran comisión?", reverso: "Hacer discípulos, bautizándolos y enseñándoles a guardar lo que Jesús mandó.", apoyo: "La gran comisión no manda conseguir decisiones, sino hacer discípulos" },
              { frente: "¿A qué se parece una iglesia que evangeliza mucho y consolida poco?", reverso: "A una casa con la puerta de atrás abierta.", apoyo: "se parece a una casa con la puerta de atrás abierta" },
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
            consigna: "Completa qué es consolidar.",
            texto: "Consolidar es [[afirmar]], dar [[firmeza]]: acompañar al que creyó para que eche [[raíces]] en Cristo y en la iglesia.",
            distractores: ["presionar", "prisa", "dudas"],
            errores: {
              presionar: "Consolidar es afirmar: acompañar al que creyó, no presionarlo.",
              prisa: "Consolidar es dar firmeza al que creyó.",
              dudas: "Se acompaña al que creyó para que eche raíces en Cristo y en la iglesia.",
            },
            apoyo: "Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia",
            ref: "Hechos 14:21-22",
            explica: "Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia.",
          },
          {
            consigna: "Completa el ejemplo de consolidación del primer viaje de Pablo.",
            texto: "Consolidar es afirmar al nuevo creyente para que eche raíces, como hicieron Pablo y [[Bernabé]] al [[volver]] a [[confirmar]] a los discípulos.",
            distractores: ["Pedro", "negarse", "juzgar"],
            errores: {
              Pedro: "En el primer viaje fueron Pablo y Bernabé.",
              negarse: "Pablo y Bernabé volvieron a las ciudades donde había nuevos creyentes.",
              juzgar: "Volvieron a confirmar los ánimos de los discípulos, exhortándolos a permanecer en la fe.",
            },
            apoyo: "como hicieron Pablo y Bernabé al volver a confirmar a los discípulos",
            ref: "Hechos 14:21-22",
            explica: "Pablo y Bernabé no solo anunciaron el evangelio: volvieron a las ciudades donde había nuevos creyentes para confirmar a los discípulos. Eso es consolidar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 13:21",
            consigna: "En la parábola del sembrador, ¿qué le falta al que recibe la palabra con gozo, y cómo es su fe? Toca las palabras que lo dicen.",
            texto: "pero no tiene [[raíz]] en sí, sino que es de [[corta duración]]",
            apoyo: "Sin raíz, la fe es de corta duración",
            explica: "Hay quien recibe la palabra con gozo, «pero no tiene raíz en sí, sino que es de corta duración»: por eso el nuevo creyente necesita a alguien a su lado.",
          },
          {
            ref: "Hechos 14:22",
            consigna: "Al volver a las ciudades, ¿qué hacían Pablo y Bernabé con los discípulos? Toca las dos palabras que lo dicen.",
            texto: "[[confirmando]] los ánimos de los discípulos, [[exhortándoles]] a que permaneciesen en la fe",
            apoyo: "Pablo y Bernabé no solo anunciaron el evangelio",
            explica: "Pablo y Bernabé volvieron a las ciudades donde había nuevos creyentes, «confirmando los ánimos de los discípulos, exhortándoles a que permaneciesen en la fe».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que enseña sobre el cuidado del nuevo creyente.",
            pares: [
              ["Hechos 14:21-22", "Pablo y Bernabé volvieron a confirmar a los discípulos"],
              ["Mateo 13:20-21", "Quien recibe la palabra con gozo, pero sin raíz, dura poco"],
              ["1 Pedro 2:2", "Como niños recién nacidos, desean la leche espiritual"],
              ["1 Tesalonicenses 2:7-8", "Pablo cuidó a los nuevos creyentes como una nodriza"],
            ],
            apoyo: "el nuevo creyente necesita cuidado como un recién nacido",
            explica: "Pablo y Bernabé volvieron a confirmar a los discípulos; la parábola muestra que sin raíz la fe dura poco; Pedro compara a los nuevos creyentes con recién nacidos, y Pablo los cuidó como una nodriza.",
          },
          {
            consigna: "Une cada imagen de la lección con lo que enseña sobre el nuevo creyente.",
            pares: [
              ["Una cosecha", "No termina al cortar el fruto: hay que recogerlo, guardarlo y cuidarlo"],
              ["Un recién nacido", "No se alimenta solo: alguien lo cuida"],
              ["Una nodriza", "Cuida con ternura a sus propios hijos"],
              ["El que no tiene raíz", "Recibe la palabra con gozo, pero es de corta duración"],
            ],
            apoyo: "Un recién nacido no se alimenta solo: alguien lo cuida",
            ref: "1 Pedro 2:2",
            explica: "Con los nuevos creyentes pasa como con la cosecha: hay que cuidarlos. Un recién nacido no se alimenta solo, y Pablo cuidó a los suyos como una nodriza; sin raíz, la fe es de corta duración.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Se queda en conseguir una decisión o busca hacer un discípulo? Lleva cada frase a su grupo.",
            grupos: ["Se queda en una decisión", "Busca hacer un discípulo"],
            frases: [
              { texto: "Contar las manos levantadas y no volver a llamar a nadie", grupo: 0 },
              { texto: "Dar por terminado el trabajo cuando la persona dice que sí", grupo: 0 },
              { texto: "Celebrar el sí y dejar que cada uno siga solo", grupo: 0 },
              { texto: "Bautizarlo y enseñarle a guardar lo que Jesús mandó", grupo: 1 },
              { texto: "Planear el seguimiento junto con el evangelismo", grupo: 1 },
              { texto: "Acompañarlo hasta que eche raíces en Cristo y en la iglesia", grupo: 1 },
              { texto: "Enseñarle con sabiduría para que madure en Cristo", grupo: 1 },
            ],
            apoyo: "la meta no es conseguir decisiones, sino hacer discípulos maduros en Cristo",
            ref: "Colosenses 1:28",
            explica: "La gran comisión no manda conseguir decisiones, sino hacer discípulos, bautizándolos y enseñándoles a guardar todo lo que Jesús mandó.",
          },
          {
            consigna: "¿Es conseguir decisiones o es hacer discípulos? Lleva cada frase a su grupo.",
            grupos: ["Conseguir decisiones", "Hacer discípulos"],
            frases: [
              { texto: "Anunciar el evangelio y no volver nunca a esa ciudad", grupo: 0, explica: "Pablo y Bernabé volvieron a las ciudades donde había nuevos creyentes." },
              { texto: "Medir el éxito solo por cuántos dijeron que sí", grupo: 0 },
              { texto: "Invitar a muchos y no cuidar a los que ya entraron", grupo: 0 },
              { texto: "Volver a confirmar a los que creyeron, como Pablo y Bernabé", grupo: 1 },
              { texto: "Enseñarles a guardar todo lo que Jesús mandó", grupo: 1 },
              { texto: "Ayudar a cada uno a madurar en Cristo", grupo: 1 },
              { texto: "Acompañar a cada uno hasta que eche raíces", grupo: 1 },
            ],
            apoyo: "La gran comisión no manda conseguir decisiones, sino hacer discípulos",
            ref: "Mateo 28:19-20",
            explica: "Hacer discípulos es bautizarlos y enseñarles a guardar todo lo que Jesús mandó, hasta que maduren en Cristo; una decisión sola no basta.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre decisiones y discípulos tiene un error. Tócala.",
            frases: [
              "La gran comisión manda hacer discípulos, bautizándolos y enseñándoles.",
              "Pablo enseñaba para que cada creyente llegara a ser maduro en Cristo.",
              "El evangelismo termina cuando la persona dice que sí.",
              "Planear el seguimiento es parte de planear el evangelismo.",
            ],
            malo: 2,
            correccion: "El evangelismo no termina en el sí: la meta es hacer discípulos maduros en Cristo.",
            apoyo: "El evangelismo no termina en el sí",
            ref: "Colosenses 1:28",
            explica: "La gran comisión no manda conseguir decisiones, sino hacer discípulos: por eso planear el seguimiento es parte de planear el evangelismo.",
          },
          {
            consigna: "Una de estas frases sobre la meta de la consolidación tiene un error. Tócala.",
            frases: [
              "Una iglesia que consolida poco pierde a muchos de los que entran.",
              "Hacer discípulos incluye bautizarlos y enseñarles.",
              "Lo importante es cuántas decisiones se consiguen, no lo que pasa después.",
              "La meta es que cada creyente madure en Cristo.",
            ],
            malo: 2,
            correccion: "La meta no es conseguir decisiones, sino hacer discípulos maduros en Cristo.",
            apoyo: "la meta no es conseguir decisiones, sino hacer discípulos maduros en Cristo",
            ref: "Mateo 28:19-20",
            explica: "Una iglesia que evangeliza mucho y consolida poco se parece a una casa con la puerta de atrás abierta: entra mucha gente y se va otra tanta.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia",
            ref: "Hechos 14:21-22",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es consolidar, y por qué es parte del evangelismo?",
              ideas: [
                { id: "afirmar", peso: 50, texto: "Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia.", formas: ["afirm*", "firmeza", "dar firm*", "ech* raices", "raices", "acompa* al que (creyo|cree|creyeron)", "acompa* (a los|al|a un|a una) (nuevo*|que)"] },
                { id: "parte", peso: 50, texto: "Sin raíz, la fe es de corta duración: el evangelismo no termina en el sí, y planear el seguimiento es parte de planear el evangelismo.", formas: ["corta duracion", "dura poco", "sin raiz", "no termina", "seguimiento", "se (va|van|pierde|pierden|enfria|enfrian)", "puerta de atras", "hacer discipulos"] },
              ],
              modelo: "Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia. Es parte del evangelismo porque sin raíz la fe es de corta duración, y el evangelismo no termina en el sí.",
            },
          },
          {
            apoyo: "Planear el seguimiento es parte de planear el evangelismo",
            ref: "Hechos 14:21-22",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-4-a7-2",
              tipo: "corta",
              pregunta: "Una iglesia evangeliza mucho y consolida poco. ¿A qué se parece, y qué le hace falta?",
              ideas: [
                { id: "puerta", peso: 50, texto: "Se parece a una casa con la puerta de atrás abierta: entra mucha gente y se va otra tanta.", formas: ["puerta de atras", "puerta (trasera|abierta)", "se va otra tanta", "se (va|van) (otra|otros|muchos|igual)", "entra mucha gente", "(entra|entran) (y|pero) (salen|sale|se)", "se (pierde|pierden)"] },
                { id: "seguimiento", peso: 50, texto: "Le hace falta planear el seguimiento como parte de planear el evangelismo, para acompañar a los que creen.", formas: ["seguimiento", "acompa*", "cuid* a (los|las|quienes)", "hacer discipulos", "consolidar (a|mas|mejor|bien)", "eche* raices", "ech* raices"] },
              ],
              modelo: "Se parece a una casa con la puerta de atrás abierta: entra mucha gente y se va otra tanta. Le hace falta planear el seguimiento como parte del evangelismo, para acompañar a los que creen hasta que echen raíces.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El plan de consolidación y el consolidador
    "n3-evangelismo-consolidacion-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo es el primer contacto con el nuevo creyente?", reverso: "En las primeras 24 a 48 horas.", apoyo: "El primer contacto, en las primeras 24 a 48 horas" },
              { frente: "¿Para qué es la primera llamada o el primer mensaje?", reverso: "Para saludar, orar y escuchar.", apoyo: "una llamada o un mensaje para saludar, orar y escuchar" },
              { frente: "¿En qué se apoya la seguridad de la salvación?", reverso: "En la promesa de Dios, no en lo que la persona siente un día.", apoyo: "La seguridad de la salvación no se apoya en lo que la persona siente un día, sino en la promesa de Dios" },
              { frente: "Si la consolidación no es un programa frío, ¿qué es?", reverso: "Amor organizado.", apoyo: "No es un programa frío: es amor organizado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hicieron Priscila y Aquila con Apolos?", reverso: "Lo tomaron aparte y le explicaron mejor el camino de Dios.", apoyo: "Cuando Priscila y Aquila oyeron a Apolos" },
              { frente: "¿Quién es el consolidador?", reverso: "Un creyente maduro que acompaña con paciencia.", apoyo: "El consolidador es un creyente maduro que acompaña con paciencia" },
              { frente: "¿A quién lleva el consolidador a la persona que acompaña?", reverso: "A Cristo y a la iglesia, no a depender de él.", apoyo: "No la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia" },
              { frente: "¿Qué se hace con lo que la persona cuenta en confianza?", reverso: "Se guarda con discreción.", apoyo: "Lo que la persona cuenta en confianza se guarda con discreción" },
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
            consigna: "Ordena los primeros seis pasos del plan de consolidación, del primero al último.",
            pasos: [
              "El primer contacto, en las primeras 24 a 48 horas",
              "La visita, para conocerla, orar juntos y aclarar sus dudas",
              "La seguridad de la salvación, con la Palabra",
              "El bautismo, como obediencia al Señor",
              "La integración: un grupo pequeño, el culto y otros creyentes",
              "El discipulado: estudiar juntos lo básico de la fe",
            ],
            apoyo: "Un plan de consolidación tiene pasos claros",
            ref: "Hechos 2:41-42",
            explica: "El plan va del contacto en las primeras 24 a 48 horas a la visita, la seguridad de la salvación, el bautismo, la integración y el discipulado; y al final viene el servicio.",
          },
          {
            consigna: "Ordena los pasos del plan de consolidación que siguen a la primera llamada, hasta el servicio.",
            pasos: [
              "Visitarla en su casa o en un lugar cómodo para ella",
              "Mostrarle en la Palabra que quien tiene al Hijo tiene la vida",
              "Acompañarla a bautizarse, como obediencia al Señor",
              "Llevarla a un grupo pequeño, al culto y a otros creyentes",
              "Estudiar juntos lo básico de la fe, como el Nivel 1",
              "Ayudarla a descubrir sus dones y a empezar a servir",
            ],
            apoyo: "el contacto en 24 a 48 horas, la visita, la seguridad de la salvación, el bautismo, la integración, el discipulado y el servicio",
            ref: "1 Juan 5:11-13; Hechos 2:41-42",
            explica: "Después del primer contacto vienen la visita, la seguridad de la salvación, el bautismo, la integración, el discipulado y el servicio: descubrir sus dones y algún día acompañar a otro.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es prudente en el acompañamiento o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Así se acompaña con prudencia", "Así no se acompaña"],
            frases: [
              { texto: "Acompañar a una persona del mismo sexo", grupo: 0 },
              { texto: "Visitar en pareja o en familia a alguien del otro sexo", grupo: 0 },
              { texto: "Guardar con discreción lo que te contó en confianza", grupo: 0 },
              { texto: "Avisar enseguida al pastor si habla de hacerse daño", grupo: 0 },
              { texto: "Reunirse a solas con un menor sin avisar a sus padres", grupo: 1 },
              { texto: "Contar en la célula lo que te dijo en confianza", grupo: 1 },
              { texto: "Tratar tú solo una adicción, sin avisar al pastor", grupo: 1 },
              { texto: "Hacer que la persona dependa de ti en todo", grupo: 1, explica: "El consolidador no la hace depender de sí mismo: la lleva a Cristo y a la iglesia." },
            ],
            apoyo: "El consolidador acompaña con paciencia y prudencia",
            explica: "El acompañamiento personal se hace entre personas del mismo sexo, o en pareja o en familia; con menores, con conocimiento de sus padres; lo contado en confianza se guarda, y ante una crisis grave se busca enseguida al pastor.",
          },
          {
            consigna: "¿Lo hace un buen consolidador o no? Lleva cada frase a su grupo.",
            grupos: ["Lo hace un buen consolidador", "No lo hace un buen consolidador"],
            frases: [
              { texto: "Llama, visita y ora con la persona", grupo: 0 },
              { texto: "Estudia la Biblia con ella, con paciencia", grupo: 0 },
              { texto: "La presenta a otros hermanos de la iglesia", grupo: 0 },
              { texto: "La lleva a Cristo y a la iglesia", grupo: 0 },
              { texto: "Hace que solo confíe en él", grupo: 1 },
              { texto: "Se cansa y la deja si no avanza rápido", grupo: 1, explica: "El consolidador acompaña con paciencia." },
              { texto: "Evita que conozca a otros hermanos", grupo: 1 },
            ],
            apoyo: "El consolidador es un creyente maduro que acompaña con paciencia: llama, visita, ora, estudia la Biblia con la persona y la presenta a otros hermanos",
            ref: "Hechos 18:26",
            explica: "Como Priscila y Aquila con Apolos, el consolidador acompaña con paciencia: llama, visita, ora, estudia la Biblia con la persona y la presenta a otros hermanos, y no la hace depender de sí mismo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un nuevo creyente que acompañas te dice: Contigo aprendo mucho; no necesito la célula ni conocer a nadie más.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Me alegra, pero ven conmigo a la célula: necesitas a la iglesia.", bien: true, explica: "El consolidador no hace depender de sí mismo a la persona: la lleva a Cristo y a la iglesia y la presenta a otros hermanos." },
              { texto: "Está bien: mientras me tengas a mí, no te hace falta nadie más.", explica: "El consolidador no la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia." },
              { texto: "Entonces no vayas a la célula; mejor nos vemos tú y yo cada semana.", explica: "La integración es parte del plan: un grupo pequeño, el culto y la amistad con otros creyentes." },
              { texto: "Si no vas a la célula, ya no te voy a acompañar; tú verás lo que haces.", explica: "El consolidador acompaña con paciencia." },
            ],
            apoyo: "No la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia",
            ref: "Hechos 2:42",
            explica: "El consolidador acompaña con paciencia y presenta a la persona a otros hermanos: no la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia.",
          },
          {
            caso: "Una joven que acompañas te escribe: Te cuento algo, pero no se lo digas a nadie: a veces pienso en hacerme daño.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le agradeces y buscas enseguida al pastor y la ayuda adecuada.", bien: true, explica: "Es lo que pide la lección: si aparecen ideas de hacerse daño, se busca enseguida al pastor y la ayuda adecuada." },
              { texto: "Le prometes que no se lo dirás a nadie y oras por ella tú solo en casa.", explica: "Ante ideas de hacerse daño, no se queda en secreto: se busca enseguida al pastor y la ayuda adecuada." },
              { texto: "Lo cuentas en el grupo de la célula, para que todos oren por ella.", explica: "Lo que la persona cuenta en confianza se guarda con discreción: se busca al pastor y la ayuda adecuada." },
              { texto: "Le dices que eso se le pasará si ora más, y cambias de tema.", explica: "Es una situación que supera al consolidador: se busca enseguida al pastor y la ayuda adecuada." },
            ],
            apoyo: "Si aparecen una crisis grave, adicciones, violencia o ideas de hacerse daño, se busca enseguida al pastor y la ayuda adecuada",
            explica: "Lo que la persona cuenta en confianza se guarda con discreción, pero ante ideas de hacerse daño se busca enseguida al pastor y la ayuda adecuada.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Ninguna persona que creyó debería pasar sola su primera semana como creyente",
            ref: "1 Juan 5:13",
            situacion: "Para tu práctica del Nivel 3, tu iglesia te encargó acompañar a Andrés, que recibió a Cristo el domingo en el culto.",
            escenas: [
              {
                id: "e1",
                narra: "Es lunes. El domingo, Andrés te dio su número para el seguimiento.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo llamas hoy para saludarlo, orar con él y escucharlo.", valor: 2, explica: "El primer contacto es en las primeras 24 a 48 horas: una llamada o un mensaje para saludar, orar y escuchar.", siguiente: "e2" },
                  { texto: "Le escribes un saludo corto y esperas a verlo en el culto.", valor: 1, explica: "Un mensaje es un buen primer contacto, pero también es para orar y escuchar.", siguiente: "e2" },
                  { texto: "Esperas al próximo domingo para saludarlo en el culto.", valor: 0, explica: "El primer contacto es en las primeras 24 a 48 horas: ninguna persona que creyó debería pasar sola su primera semana.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Llega el domingo, y Andrés no viene al culto.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lo llamas ese mismo día para saludarlo, orar con él y escucharlo.", valor: 2, explica: "Aunque sea tarde, el seguimiento empieza con una llamada para saludar, orar y escuchar." },
                  { texto: "Esperas a que él te busque cuando esté listo, para no molestarlo más.", valor: 0, explica: "La consolidación es amor organizado, para que ninguna persona que creyó quede sola." },
                ],
              },
              {
                id: "e2",
                narra: "En la visita, Andrés te dice: El domingo sentí algo muy fuerte, pero hoy no siento nada. ¿Seré salvo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le muestras en 1 Juan 5 que quien tiene al Hijo tiene la vida.", valor: 2, explica: "La seguridad de la salvación no se apoya en lo que la persona siente un día, sino en la promesa de Dios." },
                  { texto: "Le cuentas que a ti también te pasó, y que no se preocupe.", valor: 1, explica: "Le das ánimo, pero la seguridad se muestra en la Palabra: quien tiene al Hijo tiene la vida." },
                  { texto: "Le dices que ore hasta volver a sentir lo que sintió el domingo.", valor: 0, explica: "La seguridad no se apoya en lo que la persona siente un día, sino en la promesa de Dios." },
                ],
              },
              {
                id: "e3",
                narra: "Unas semanas después, Andrés se bautizó, pero todavía no conoce a nadie en la iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo llevas a un grupo pequeño y le presentas a otros hermanos.", valor: 2, explica: "La integración es un grupo pequeño, el culto y la amistad con otros creyentes." },
                  { texto: "Le pasas la dirección de una célula para que vaya cuando pueda.", valor: 1, explica: "Es un paso, pero el consolidador lo presenta a otros hermanos y lo acompaña." },
                  { texto: "Le dices que con tu amistad le basta y que no necesita a nadie más.", valor: 0, explica: "El consolidador no lo hace depender de sí mismo: lo lleva a Cristo y a la iglesia." },
                ],
              },
            ],
          },
          {
            apoyo: "Para cerrar el Nivel 3 se pide consolidar a un nuevo creyente",
            ref: "2 Timoteo 2:2",
            situacion: "Vas a preparar tu práctica del Nivel 3: acompañar a un nuevo creyente, en coordinación con tu iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Todavía no sabes a quién vas a acompañar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con tu iglesia: puede ser alguien que guiaste o te encarguen.", valor: 2, explica: "Puede ser alguien a quien tú mismo guiaste a Cristo o alguien que tu iglesia te encargue." },
                  { texto: "Esperas a guiar tú mismo a alguien a Cristo, aunque pasen los meses.", valor: 1, explica: "Puede ser alguien que guiaste, pero también alguien que tu iglesia te encargue." },
                  { texto: "Buscas por tu cuenta a alguien, sin decirle nada a nadie de tu iglesia.", valor: 0, explica: "La práctica se hace en coordinación con tu iglesia." },
                ],
              },
              {
                id: "e2",
                narra: "Tu iglesia te encarga a Lucía, que creyó en la última campaña. Necesitas saber cómo contactarla.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides permiso, anotas solo lo necesario y lo guardas con cuidado.", valor: 2, explica: "Sus datos y su historia le pertenecen: se anota con permiso, solo lo necesario, y se guarda con cuidado." },
                  { texto: "Anotas su número y después, otro día, le preguntas si le parece bien.", valor: 1, explica: "El permiso se pide antes de anotar." },
                  { texto: "Anotas todo lo que puedas saber de ella, por si algún día te sirve.", valor: 0, explica: "Se anota solo lo necesario: sus datos y su historia le pertenecen." },
                ],
              },
              {
                id: "e3",
                narra: "Ya tienes el plan de los pasos para acompañar a Lucía.",
                pregunta: "¿Cómo lo llevas adelante?",
                opciones: [
                  { texto: "Paso a paso, en coordinación con tu iglesia y con tu líder.", valor: 2, explica: "Se acompaña al nuevo creyente en estos pasos, en coordinación con tu iglesia." },
                  { texto: "Con tu iglesia, pero saltándote los pasos que te parezcan de más.", valor: 1, explica: "Cada paso del plan tiene su lugar, desde el primer contacto hasta el servicio." },
                  { texto: "Tú solo y sin contarle nada a nadie, para que nadie se meta en eso.", valor: 0, explica: "La práctica se hace en coordinación con tu iglesia." },
                ],
              },
              {
                id: "e4",
                narra: "Meses después, Lucía ya sirve en la iglesia.",
                pregunta: "¿Qué le enseñas ahora?",
                opciones: [
                  { texto: "A acompañar a otro, como Pablo le enseñó a Timoteo.", valor: 2, explica: "Lo que había oído, Timoteo debía encargarlo a hombres fieles que fueran idóneos para enseñar también a otros." },
                  { texto: "A seguir sirviendo, aunque todavía no piense en acompañar a nadie.", valor: 1, explica: "Servir es un gran paso, y algún día también acompañará a otro." },
                  { texto: "Que ya terminó, y que ya no necesita aprender nada más.", valor: 0, explica: "El servicio lleva a descubrir sus dones y, algún día, a acompañar a otro." },
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
            consigna: "Sobre tu práctica del Nivel 3: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para cerrar el Nivel 3 se pide consolidar a un nuevo creyente.", verdad: true, explica: "Se pide acompañarlo en los pasos del plan, en coordinación con tu iglesia.", apoyo: "Para cerrar el Nivel 3 se pide consolidar a un nuevo creyente" },
              { texto: "La persona que acompañes tiene que ser alguien que tú guiaste a Cristo.", verdad: false, explica: "Puede ser alguien a quien tú mismo guiaste a Cristo o alguien que tu iglesia te encargue.", apoyo: "Puede ser alguien a quien tú mismo guiaste a Cristo o alguien que tu iglesia te encargue" },
              { texto: "La práctica se hace en coordinación con tu iglesia.", verdad: true, explica: "Se acompaña al nuevo creyente en los pasos del plan, en coordinación con tu iglesia.", apoyo: "acompañarlo en estos pasos, en coordinación con tu iglesia" },
            ],
          },
          {
            consigna: "Sobre los datos de la persona que acompañas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Conviene anotar todos los datos que puedas de la persona.", verdad: false, explica: "Se pide su permiso, se anota solo lo necesario y se guarda con cuidado.", apoyo: "Pide su permiso, anota solo lo necesario y guárdalo con cuidado" },
              { texto: "Los datos y la historia de la persona le pertenecen a ella.", verdad: true, explica: "Por eso se anotan con permiso y se guardan con cuidado.", apoyo: "sus datos y su historia le pertenecen" },
              { texto: "Para el seguimiento, se puede anotar su contacto sin pedirle permiso.", verdad: false, explica: "Para dar seguimiento hace falta saber cómo contactar a la persona, pero primero se pide su permiso.", apoyo: "Para dar seguimiento hace falta saber cómo contactar a la persona" },
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
            apoyo: "El consolidador es un creyente maduro que acompaña con paciencia",
            ref: "Hechos 18:26",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hace el consolidador, y adónde lleva a la persona que acompaña?",
              ideas: [
                { id: "hace", peso: 50, texto: "Acompaña con paciencia: llama, visita, ora, estudia la Biblia con la persona y la presenta a otros hermanos.", formas: ["llam*", "visit*", "ora (con|por)", "oramos", "orar (con|por|juntos)", "estudi* la biblia", "estudi* (con|juntos)", "present* a otros", "paciencia"] },
                { id: "lleva", peso: 50, texto: "La lleva a Cristo y a la iglesia, no a depender de él.", formas: ["a cristo y a la iglesia", "lleva* a cristo", "a la iglesia", "a cristo", "no (la|lo) (hace|haga) depend*"] },
              ],
              errores: [
                { id: "depender", texto: "El consolidador no hace depender de sí mismo a la persona: la lleva a Cristo y a la iglesia.", formas: ["(hace|haga|hacer) (que|la|lo) depend*", "depend* de (el|mi|ti|si) mismo", "depend* del consolidador"], anula: "lleva" },
              ],
              modelo: "El consolidador acompaña con paciencia: llama, visita, ora, estudia la Biblia con la persona y la presenta a otros hermanos. No la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia.",
            },
          },
          {
            apoyo: "El acompañamiento personal se hace entre personas del mismo sexo, o en pareja o en familia",
            ref: "Hechos 18:26",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué normas de prudencia sigue el consolidador cuando acompaña a alguien?",
              ideas: [
                { id: "sexo", peso: 35, texto: "El acompañamiento personal se hace entre personas del mismo sexo, o en pareja o en familia; con menores, con conocimiento de sus padres y nunca a solas.", formas: ["mismo sexo", "en pareja", "en familia", "menor*", "padres", "nunca a solas", "no a solas"] },
                { id: "discrecion", peso: 30, texto: "Lo que la persona cuenta en confianza se guarda con discreción.", formas: ["discre*", "en confianza", "confidencial*", "secreto*", "guard* lo que"] },
                { id: "ayuda", peso: 35, texto: "Si aparecen una crisis grave, adicciones, violencia o ideas de hacerse daño, se busca enseguida al pastor y la ayuda adecuada.", formas: ["pastor", "ayuda adecuada", "crisis", "adiccion*", "violencia", "hacerse dano", "profesional*"] },
              ],
              modelo: "Acompaña a personas del mismo sexo, o en pareja o en familia; con menores, siempre con conocimiento de sus padres y nunca a solas. Guarda con discreción lo que le cuentan en confianza, y ante una crisis grave busca enseguida al pastor y la ayuda adecuada.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Obstáculos, restauración y fruto que permanece
    "n3-evangelismo-consolidacion-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pide Pablo a los espirituales cuando alguien cae?", reverso: "Que lo restauren con espíritu de mansedumbre.", apoyo: "Pablo pide a los espirituales: «restauradle con espíritu de mansedumbre»" },
              { frente: "¿Qué cosas no son restaurar?", reverso: "Justificar el pecado o humillar al que cayó.", apoyo: "Restaurar no es justificar el pecado ni humillar al que cayó" },
              { frente: "¿En qué consiste restaurar al que cayó?", reverso: "En ayudarlo a confesar, recibir el perdón y volver a caminar.", apoyo: "es ayudarlo a confesar, recibir el perdón y volver a caminar" },
              { frente: "¿Por qué el consolidador no se asusta ante las caídas?", reverso: "Porque sabe que Dios termina la obra que empieza.", apoyo: "El consolidador no se asusta: sabe que Dios termina la obra que empieza" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién da el crecimiento?", reverso: "Dios: nosotros sembramos, regamos y acompañamos.", apoyo: "nosotros sembramos, regamos y acompañamos, y él da el crecimiento" },
              { frente: "¿Qué situaciones superan al consolidador?", reverso: "Adicciones, violencia en el hogar, abuso, depresión profunda o ideas de hacerse daño.", apoyo: "Hay situaciones que superan al consolidador" },
              { frente: "¿Para qué nos eligió y nos puso Jesús?", reverso: "Para que vayamos y llevemos fruto, y nuestro fruto permanezca.", apoyo: "Jesús nos eligió y nos puso «para que vayáis y llevéis fruto, y vuestro fruto permanezca»" },
              { frente: "¿Cuándo se completa el círculo?", reverso: "Cuando el que fue acompañado empieza a acompañar a otro.", apoyo: "cuando el que fue acompañado empieza a acompañar a otro, el círculo se completa" },
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
            consigna: "Une cada obstáculo del nuevo creyente con lo que necesita.",
            pares: [
              ["La oposición de la familia o de los amigos", "Ánimo, oración y sabiduría para responder con amor"],
              ["Las antiguas amistades y costumbres", "Nuevas amistades en la iglesia y ayuda práctica para cambiar"],
              ["Las dudas", "Respuestas de la Palabra y alguien que escuche sin juzgar"],
              ["Las caídas", "Saber que hay perdón y restauración en Cristo"],
              ["La falta de tiempo o de constancia", "Un plan sencillo y alguien que lo acompañe"],
            ],
            apoyo: "El nuevo creyente enfrenta oposición, viejas costumbres, dudas y caídas",
            explica: "Ante la oposición necesita ánimo, oración y sabiduría; ante las viejas costumbres, nuevas amistades; ante las dudas, la Palabra y alguien que escuche; ante las caídas, perdón; y ante la falta de tiempo, un plan sencillo.",
          },
          {
            consigna: "¿Qué obstáculo enfrenta cada nuevo creyente? Une cada caso con su obstáculo.",
            pares: [
              ["Su familia se burla de él por ir a la iglesia", "La oposición de la familia"],
              ["Sus amigos de antes lo buscan para volver a lo mismo", "Las antiguas amistades y costumbres"],
              ["Tiene preguntas sobre la Biblia que nadie le ha respondido", "Las dudas"],
              ["Cayó en un pecado y cree que Dios ya no lo perdona", "Las caídas"],
              ["Entre el trabajo y la casa, ya no lee la Biblia", "La falta de tiempo o de constancia"],
            ],
            apoyo: "La falta de tiempo o de constancia: necesita un plan sencillo y alguien que lo acompañe",
            explica: "Los obstáculos más comunes son la oposición de la familia, las antiguas amistades y costumbres, las dudas, las caídas y la falta de tiempo o de constancia. Para cada uno, el consolidador sabe qué necesita.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo puede acompañar el consolidador, o es una situación que lo supera? Lleva cada frase a su grupo.",
            grupos: ["El consolidador puede acompañarlo", "Lo supera: se avisa al pastor"],
            frases: [
              { texto: "Tiene dudas sobre la Biblia", grupo: 0 },
              { texto: "Su familia se opone a su fe", grupo: 0 },
              { texto: "No encuentra tiempo para orar", grupo: 0 },
              { texto: "Hay violencia en su hogar", grupo: 1 },
              { texto: "Tiene una adicción", grupo: 1 },
              { texto: "Sufre una depresión profunda", grupo: 1 },
              { texto: "Tiene ideas de hacerse daño", grupo: 1 },
              { texto: "Sufrió un abuso", grupo: 1 },
            ],
            apoyo: "En esos casos se avisa enseguida al pastor y se busca la ayuda adecuada",
            explica: "Hay situaciones que superan al consolidador: adicciones, violencia en el hogar, abuso, depresión profunda o ideas de hacerse daño. En esos casos se avisa enseguida al pastor y se busca la ayuda adecuada.",
          },
          {
            consigna: "¿Es un obstáculo común del nuevo creyente, o una situación que supera al consolidador? Lleva cada frase a su grupo.",
            grupos: ["Un obstáculo común", "Supera al consolidador"],
            frases: [
              { texto: "Lo invitan a volver a sus costumbres de antes", grupo: 0 },
              { texto: "Volvió a caer y siente vergüenza", grupo: 0 },
              { texto: "Sus amigos se burlan de su nueva fe", grupo: 0 },
              { texto: "Le cuesta ser constante en la lectura", grupo: 0 },
              { texto: "Cuenta que en su casa lo golpean", grupo: 1, explica: "Es violencia en el hogar: se avisa enseguida al pastor y, cuando hay peligro, también a las autoridades." },
              { texto: "Habla de hacerse daño", grupo: 1 },
              { texto: "No puede dejar una adicción", grupo: 1 },
            ],
            apoyo: "Hay situaciones que superan al consolidador",
            explica: "La oposición, las viejas costumbres, las dudas, las caídas y la falta de constancia son obstáculos comunes. Las adicciones, la violencia, el abuso, la depresión profunda o las ideas de hacerse daño superan al consolidador.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Restaurar no es justificar el pecado ni humillar al que cayó: es ayudarlo a confesar, recibir el perdón y volver a caminar",
            ref: "Gálatas 6:1-2",
            situacion: "Acompañas a Daniela, que creyó hace dos meses. Hoy te escribe avergonzada: le mintió a su jefe para cubrir un error, y ya no quiere volver a la célula.",
            escenas: [
              {
                id: "e1",
                narra: "Daniela te dice: Fallé; ya no merezco estar en la iglesia.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que en Cristo hay perdón, y que la ayudarás a confesarlo.", valor: 2, explica: "Restaurar es ayudarla a confesar, recibir el perdón y volver a caminar.", siguiente: "e2" },
                  { texto: "Que Dios la perdona, y que mejor no hablen más del asunto.", valor: 1, explica: "Hay perdón en Cristo, pero restaurar es también ayudarla a confesar y a volver a caminar.", siguiente: "e2" },
                  { texto: "Que no se preocupe, porque una mentira así no es pecado.", valor: 0, explica: "Restaurar no es justificar el pecado.", siguiente: "e1b" },
                  { texto: "Que tiene razón, y que vuelva cuando demuestre que cambió.", valor: 0, explica: "Restaurar no es humillar al que cayó: Pablo pide restaurarlo con espíritu de mansedumbre.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Daniela te pregunta: Entonces, ¿no tengo que pedirle perdón a Dios?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que sí: la vas a ayudar a confesarlo y a recibir el perdón.", valor: 2, explica: "Restaurar no es justificar el pecado: es ayudarla a confesar, recibir el perdón y volver a caminar." },
                  { texto: "Que no hace falta, porque Dios ya lo pasó por alto y lo olvidó.", valor: 0, explica: "Restaurar no es justificar el pecado." },
                ],
              },
              {
                id: "e2",
                narra: "Daniela confiesa su pecado a Dios en oración, contigo a su lado.",
                pregunta: "¿Cómo la sigues ayudando?",
                opciones: [
                  { texto: "La animas a volver a la célula y sigues a su lado con paciencia.", valor: 2, explica: "Sobrellevar las cargas unos de otros es cumplir la ley de Cristo: ella necesita volver a caminar acompañada." },
                  { texto: "La animas a volver a la célula, pero ya no la llamas en la semana.", valor: 1, explica: "Volver a la célula es bueno, pero el consolidador la sigue acompañando con paciencia." },
                  { texto: "Cuentas en la célula lo que hizo, para que todos estén atentos.", valor: 0, explica: "Restaurar no es humillar al que cayó." },
                ],
              },
              {
                id: "e3",
                narra: "Mientras la ayudas, piensas que tú nunca caerías en algo así.",
                pregunta: "¿Qué recuerdas?",
                opciones: [
                  { texto: "Que Pablo pide restaurar cuidándose cada uno a sí mismo.", valor: 2, explica: "Pablo pide restaurar con espíritu de mansedumbre, cuidándose cada uno a sí mismo." },
                  { texto: "Que los espirituales ya no necesitan cuidarse de nada.", valor: 0, explica: "Pablo pide a los espirituales restaurar cuidándose cada uno a sí mismo." },
                  { texto: "Que ella tiene que aprender de ti, que nunca has fallado así.", valor: 0, explica: "Se restaura con espíritu de mansedumbre, cuidándose cada uno a sí mismo." },
                ],
              },
            ],
          },
          {
            apoyo: "El consolidador trabaja con esperanza",
            ref: "Filipenses 1:6",
            situacion: "Acompañas a Jorge desde hace tres meses. Hoy te cuenta que se enojó con su vecino, le dijo palabras muy duras y ahora se siente un hipócrita.",
            escenas: [
              {
                id: "e1",
                narra: "Jorge te dice: Creo que esto de la fe no es para mí.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Dios termina la obra que empieza, y en Cristo hay perdón.", valor: 2, explica: "El consolidador trabaja con esperanza: «el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo»." },
                  { texto: "Que no se desanime, que la próxima vez se va a controlar mejor.", valor: 1, explica: "Animarlo es bueno, pero primero necesita saber que hay perdón y restauración en Cristo." },
                  { texto: "Que todos se enojan, y que lo que dijo no tiene importancia.", valor: 0, explica: "Restaurar no es justificar el pecado." },
                  { texto: "Que quizás tenga razón, y que lo piense bien antes de seguir.", valor: 0, explica: "El consolidador no se asusta: sabe que Dios termina la obra que empieza." },
                ],
              },
              {
                id: "e2",
                narra: "Jorge quiere arreglar las cosas con Dios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras con él para que confiese su pecado y reciba el perdón.", valor: 2, explica: "Restaurar es ayudarlo a confesar, recibir el perdón y volver a caminar." },
                  { texto: "Le dices que ore solo en su casa y que después te cuente.", valor: 1, explica: "Orar en casa es bueno, pero restaurar es ayudarlo: el consolidador lo acompaña." },
                  { texto: "Le das una lista de reglas para que se gane otra vez el perdón.", valor: 0, explica: "El que cae necesita saber que hay perdón y restauración en Cristo: el perdón se recibe." },
                ],
              },
              {
                id: "e3",
                narra: "Unos días después, Jorge vuelve a la célula, todavía un poco avergonzado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo recibes con alegría y sigues acompañándolo con paciencia.", valor: 2, explica: "Sobrellevar las cargas unos de otros es cumplir la ley de Cristo." },
                  { texto: "Lo saludas, pero esperas a que él te busque si necesita algo.", valor: 1, explica: "Saludarlo está bien, pero el consolidador sigue a su lado con paciencia." },
                  { texto: "Les recuerdas a todos lo que pasó, para que él no lo repita.", valor: 0, explica: "Restaurar no es humillar al que cayó." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Gálatas 6:1",
            consigna: "Cuando alguien cae, ¿qué pide Pablo a los espirituales, y con qué espíritu? Toca las dos palabras.",
            texto: "[[restauradle]] con espíritu de [[mansedumbre]]",
            apoyo: "Restaurar no es justificar el pecado ni humillar al que cayó",
            explica: "Pablo pide a los espirituales: «restauradle con espíritu de mansedumbre», cuidándose cada uno a sí mismo. Restaurar no es justificar el pecado ni humillar al que cayó.",
          },
          {
            ref: "Filipenses 1:6",
            consigna: "¿Por qué el consolidador trabaja con esperanza? Toca las dos palabras que dicen lo que Dios hace con la buena obra.",
            texto: "el que [[comenzó]] en vosotros la buena obra, la [[perfeccionará]] hasta el día de Jesucristo",
            apoyo: "El consolidador trabaja con esperanza",
            explica: "El consolidador trabaja con esperanza, porque sabe que «el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo». La obra es de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el círculo completo, del primer paso al último.",
            pasos: ["Evangelizar", "Consolidar", "Discipular", "Enviar"],
            apoyo: "Evangelizar, consolidar, discipular y enviar",
            explica: "Evangelizar, consolidar, discipular y enviar: cuando el que fue acompañado empieza a acompañar a otro, el círculo se completa y la iglesia crece como en Hechos.",
          },
          {
            consigna: "Ordena cómo se multiplica el fruto, del primer paso al último.",
            pasos: [
              "Una persona escucha el evangelio y cree",
              "Alguien la acompaña para que eche raíces",
              "Permanece en Cristo y crece como discípulo",
              "Un día acompaña a otro nuevo creyente",
            ],
            apoyo: "discípulos que permanecen en Cristo, crecen y un día acompañan a otros",
            ref: "Juan 15:16",
            explica: "La meta no son números, sino discípulos que permanecen en Cristo, crecen y un día acompañan a otros: así el fruto se multiplica, de generación en generación.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La meta del evangelismo y de la consolidación no son números, sino discípulos que permanecen en Cristo, crecen y un día acompañan a otros",
            ref: "Juan 15:16",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es la meta del evangelismo y de la consolidación, y cómo se multiplica el fruto?",
              ideas: [
                { id: "discipulos", peso: 50, texto: "La meta no son números, sino discípulos que permanecen en Cristo y crecen.", formas: ["discipul*", "permanec*", "crec*", "madur*"] },
                { id: "otros", peso: 50, texto: "Un día acompañan a otros: cuando el que fue acompañado acompaña a otro, el fruto se multiplica.", formas: ["acompa* a (otro*|otra*)", "(ensen*|forma*|discipul*|lleva*|gana*) a (otro*|otra*)", "generacion*", "el circulo"] },
              ],
              errores: [
                { id: "numeros", texto: "La meta no son números, sino discípulos que permanecen en Cristo.", formas: ["meta (son|es) (los|el|la|muchas|mas) (numeros|numero|cantidad|decisiones|personas)", "importante (son|es) (los|el|la) (numeros|numero|cantidad)"], anula: "discipulos" },
              ],
              modelo: "La meta no son números, sino discípulos que permanecen en Cristo y crecen. El fruto se multiplica cuando el que fue acompañado empieza a acompañar a otros, de generación en generación.",
            },
          },
          {
            apoyo: "cuando el que fue acompañado empieza a acompañar a otro, el círculo se completa y la iglesia crece como en Hechos",
            ref: "Juan 15:16",
            clave: {
              id: "pr-n3-evangelismo-consolidacion-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué es el círculo completo de la consolidación, y cuándo se completa?",
              ideas: [
                { id: "pasos", peso: 50, texto: "Evangelizar, consolidar, discipular y enviar.", formas: ["evangeliz* consolid*", "consolid* discipul*", "discipul* envi*", "evangeliz* discipul*", "evangeliz* envi*"] },
                { id: "completa", peso: 50, texto: "Se completa cuando el que fue acompañado empieza a acompañar a otro.", formas: ["acompa* a (otro*|otra*)", "(empieza|comienza|empiece|empiezan) a acompa*", "fue acompa*", "(ensen*|forma*|discipul*) a (otro*|otra*)"] },
              ],
              modelo: "El círculo completo es evangelizar, consolidar, discipular y enviar. Se completa cuando el que fue acompañado empieza a acompañar a otro, y así la iglesia crece como en Hechos.",
            },
          },
        ],
      },
    ],
  },
};
