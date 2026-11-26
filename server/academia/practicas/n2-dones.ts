/**
 * Las prácticas de «Dones espirituales y servicio» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-dones.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_DONES: PracticasMateria = {
  materia: "n2-dones",
  mision: {
    titulo: "Un don para servir",
    intro: "Un grupo de creyentes nuevos de tu iglesia quiere empezar a servir y te hace muchas preguntas: qué son los dones, cuáles nombra la Biblia, para qué dio Cristo los ministerios, cómo se usan con amor y con orden, y por dónde empezar. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar qué son los dones y para qué los da Dios, describir los dones y los ministerios que enseña la Biblia, usarlos con amor, orden y discernimiento, y dar tu primer paso para servir en la iglesia.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Los dones: regalos del Espíritu para servir
    "n2-dones-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién da los dones espirituales?", reverso: "El Espíritu Santo: Él los reparte a cada creyente.", apoyo: "capacidades que el Espíritu Santo reparte a cada creyente" },
              { frente: "¿Los dones son premios o adornos?", reverso: "Ni lo uno ni lo otro: son herramientas para el bien de todos.", apoyo: "Los dones no son premios ni adornos: son herramientas para el bien de todos." },
              { frente: "¿Qué son los talentos naturales?", reverso: "Capacidades que Dios nos dio al nacer, como la música o la organización.", apoyo: "Los talentos naturales son capacidades que Dios nos dio al nacer, como la música o la organización" },
              { frente: "¿Qué es el fruto del Espíritu?", reverso: "El carácter de Cristo formado en nosotros: amor, gozo, paz, paciencia.", apoyo: "El fruto del Espíritu es el carácter de Cristo formado en nosotros: amor, gozo, paz, paciencia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué diversidad enseña Pablo en 1 Corintios 12?", reverso: "Diversidad de dones, de ministerios y de operaciones.", apoyo: "hay diversidad de dones, de ministerios y de operaciones" },
              { frente: "¿Quién está detrás de la diversidad de dones, según Pablo?", reverso: "Un mismo Espíritu, un mismo Señor y un mismo Dios.", apoyo: "pero un mismo Espíritu, un mismo Señor y un mismo Dios" },
              { frente: "¿Qué muestran los dones y qué muestra el fruto?", reverso: "Los dones, lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros.", apoyo: "Los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros." },
              { frente: "¿Quién ha recibido al menos un don?", reverso: "Todo el que ha creído en Cristo, no solo los pastores ni los músicos.", apoyo: "Si has creído en Cristo, el Espíritu te ha dado al menos un don para servir a otros" },
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
            consigna: "Completa qué son los dones espirituales y para qué los da Dios.",
            texto: "Los dones espirituales son [[capacidades]] que el Espíritu Santo da al creyente para [[edificar]] a la iglesia: son [[herramientas]] para el bien de todos.",
            distractores: ["premios", "impresionar", "adornos"],
            errores: {
              premios: "Los dones no son premios ni adornos: son capacidades que el Espíritu da al creyente.",
              impresionar: "El Espíritu da los dones para edificar a la iglesia: son para el bien de todos.",
              adornos: "Los dones no son adornos: son herramientas para el bien de todos.",
            },
            apoyo: "Los dones espirituales son capacidades que el Espíritu Santo da al creyente para edificar a la iglesia",
            ref: "1 Corintios 12:7, 11",
            explica: "El Espíritu Santo da los dones para edificar a la iglesia: no son premios ni adornos, sino herramientas para el bien de todos.",
          },
          {
            consigna: "Completa para quién es tu don.",
            texto: "Tu don no es para ti: es para los [[demás]]. El Espíritu Santo reparte los dones a cada creyente para [[provecho]] de todos.",
            distractores: ["mejores", "orgullo", "premio"],
            errores: {
              mejores: "Los dones no son para los mejores: el Espíritu los reparte a cada creyente.",
              orgullo: "Tu don no es para ti: el Espíritu lo da para provecho de todos.",
              premio: "Los dones no son premios: el Espíritu los da para provecho de todos.",
            },
            apoyo: "Tu don no es para ti: es para los demás.",
            ref: "1 Corintios 12:7",
            explica: "El Espíritu reparte los dones para provecho de todos: tu don es para servir a los demás.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un talento natural, un don espiritual o el fruto del Espíritu? Lleva cada frase a su grupo.",
            grupos: ["Talento natural", "Don espiritual", "Fruto del Espíritu"],
            frases: [
              { texto: "Una capacidad que Dios nos dio al nacer", grupo: 0 },
              { texto: "Lo que tenemos desde que nacimos, como la música", grupo: 0, explica: "La lección pone la música como ejemplo de talento natural, que también se pone al servicio de Dios." },
              { texto: "Una capacidad que el Espíritu da al creyente", grupo: 1 },
              { texto: "Lo que Dios hace por medio de nosotros", grupo: 1 },
              { texto: "Algo que el Espíritu reparte para edificar a la iglesia", grupo: 1 },
              { texto: "El carácter de Cristo formado en nosotros", grupo: 2 },
              { texto: "Lo que Dios hace en nosotros", grupo: 2 },
              { texto: "Amor, gozo, paz, paciencia", grupo: 2 },
            ],
            apoyo: "Los talentos naturales son capacidades que Dios nos dio al nacer",
            ref: "1 Corintios 12:11; Gálatas 5:22-23",
            explica: "Los talentos los recibimos al nacer; los dones los da el Espíritu al creyente para edificar a la iglesia; el fruto es el carácter de Cristo formado en nosotros.",
          },
          {
            consigna: "¿Habla de los dones o del fruto del Espíritu? Lleva cada frase a su grupo.",
            grupos: ["Los dones del Espíritu", "El fruto del Espíritu"],
            frases: [
              { texto: "Lo que Dios hace a través de nosotros", grupo: 0 },
              { texto: "Capacidades que el Espíritu reparte a cada uno", grupo: 0 },
              { texto: "Herramientas para el bien de todos", grupo: 0 },
              { texto: "Lo que Dios forma dentro de nosotros", grupo: 1 },
              { texto: "El carácter de Cristo en el creyente", grupo: 1 },
              { texto: "Amor, gozo, paz y paciencia", grupo: 1 },
            ],
            apoyo: "Los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros",
            ref: "Gálatas 5:22-23",
            explica: "Los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros: el carácter de Cristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre quién recibe los dones: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Solo los pastores y los músicos reciben dones del Espíritu.", verdad: false, explica: "Pedro dice cada uno: no solo los pastores ni los músicos.", apoyo: "Pedro dice cada uno: no solo los pastores ni los músicos", ref: "1 Pedro 4:10" },
              { texto: "Si has creído en Cristo, el Espíritu te ha dado al menos un don.", verdad: true, explica: "Nadie en Cristo se queda sin don: el Espíritu da al menos uno a cada creyente.", apoyo: "Si has creído en Cristo, el Espíritu te ha dado al menos un don para servir a otros", ref: "1 Pedro 4:10" },
              { texto: "El don que recibe cada creyente es para servir a otros.", verdad: true, explica: "Cada uno recibe un don para servir a otros, como buen administrador de la multiforme gracia de Dios.", apoyo: "como buen administrador de la multiforme gracia de Dios", ref: "1 Pedro 4:10" },
            ],
          },
          {
            consigna: "Sobre quién recibe los dones: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los dones del Espíritu son para unos pocos creyentes especiales.", verdad: false, explica: "El Espíritu reparte dones a cada creyente: nadie en Cristo se queda sin don.", apoyo: "nadie en Cristo se queda sin don", ref: "1 Corintios 12:7" },
              { texto: "Todo creyente ha recibido al menos un don.", verdad: true, explica: "Pedro dice cada uno: si has creído en Cristo, el Espíritu te dio al menos un don para servir.", apoyo: "el Espíritu te ha dado al menos un don para servir a otros", ref: "1 Pedro 4:10" },
              { texto: "Los dones son un premio para los creyentes más destacados.", verdad: false, explica: "Los dones no son premios ni adornos: el Espíritu los da a cada creyente para el bien de todos.", apoyo: "Los dones no son premios ni adornos" },
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
            caso: "Una hermana de tu célula te dice: Yo no canto ni predico; creo que Dios no me dio ningún don.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Si has creído en Cristo, el Espíritu te dio al menos un don a ti.", bien: true, explica: "Es lo que enseña Pedro: cada uno ha recibido un don, no solo los pastores ni los músicos." },
              { texto: "Es verdad: los dones del Espíritu son para los que cantan o predican.", explica: "Pedro dice cada uno: no solo los pastores ni los músicos reciben dones." },
              { texto: "Sirve mucho y pórtate bien; cuando lo merezcas, Dios te dará un don.", explica: "Los dones no son premios: el Espíritu los da a cada creyente para el bien de todos." },
              { texto: "No te preocupes: los dones no importan mucho en la vida del creyente.", explica: "Los dones son herramientas para el bien de todos: tu don es para servir a los demás." },
            ],
            apoyo: "Si has creído en Cristo, el Espíritu te ha dado al menos un don para servir a otros",
            ref: "1 Pedro 4:10",
            explica: "Pedro dice cada uno: nadie en Cristo se queda sin don, aunque no cante ni predique.",
          },
          {
            caso: "Un joven nuevo de la iglesia te dice: Mi hermano mayor tiene muchos dones; a mí no me tocó ninguno.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Nadie en Cristo se queda sin don: el Espíritu también te dio uno.", bien: true, explica: "Si ha creído en Cristo, el Espíritu le ha dado al menos un don para servir a otros." },
              { texto: "Puede ser: Dios da dones a unos creyentes y a otros no les da ninguno.", explica: "Pedro dice cada uno: todo creyente ha recibido al menos un don." },
              { texto: "Espera a ser pastor; entonces el Espíritu te dará tus primeros dones.", explica: "Pedro dice cada uno: no solo los pastores ni los músicos reciben dones." },
              { texto: "Los dones son premios: si eres tan fiel como tu hermano, tendrás uno.", explica: "Los dones no son premios ni adornos: el Espíritu los reparte a cada creyente." },
            ],
            apoyo: "nadie en Cristo se queda sin don",
            ref: "1 Pedro 4:10",
            explica: "Todo el que ha creído en Cristo ha recibido al menos un don: nadie en Cristo se queda sin don.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros",
            ref: "Gálatas 5:22-23",
            clave: {
              id: "pr-n2-dones-1-a6-1",
              tipo: "corta",
              pregunta: "¿En qué se distinguen los dones espirituales del fruto del Espíritu?",
              ideas: [
                { id: "dones", peso: 50, texto: "Los dones muestran lo que Dios hace por medio de nosotros, para edificar a la iglesia.", formas: ["por medio de (nosotros|mi|ti|uno|el|ellos)", "a traves de (nosotros|mi|ti|uno)", "edific* iglesia", "para (servir|ayudar) a (otros|demas)", "capacidad*", "herramienta*"] },
                { id: "fruto", peso: 50, texto: "El fruto muestra lo que Dios hace en nosotros: el carácter de Cristo.", formas: ["caracter", "en nosotros", "dentro de (nosotros|mi|ti|uno)", "amor gozo", "de cristo formado"] },
              ],
              modelo: "Los dones muestran lo que Dios hace por medio de nosotros para edificar a la iglesia. El fruto muestra lo que Dios hace en nosotros: el carácter de Cristo, con amor, gozo, paz y paciencia.",
            },
          },
          {
            apoyo: "Los talentos naturales son capacidades que Dios nos dio al nacer, como la música o la organización, y también se ponen a su servicio",
            ref: "1 Corintios 12:11",
            clave: {
              id: "pr-n2-dones-1-a6-2",
              tipo: "corta",
              pregunta: "¿En qué se diferencia un talento natural de un don espiritual?",
              ideas: [
                { id: "talento", peso: 50, texto: "El talento natural es una capacidad que Dios nos dio al nacer.", formas: ["al nacer", "nac*", "de nacimiento", "desde (pequeno|chico|nino|siempre)"] },
                { id: "don", peso: 50, texto: "El don espiritual lo da el Espíritu Santo al creyente para edificar a la iglesia.", formas: ["espiritu santo", "el espiritu (da|reparte|dio|regala)", "(da|dio|reparte) el espiritu", "dado por el espiritu", "viene del espiritu", "al creyente", "a cada creyente", "edific* iglesia", "para la iglesia"] },
              ],
              errores: [
                { id: "fruto", texto: "El don espiritual no es lo mismo que el fruto: los dones muestran lo que Dios hace por medio de nosotros; el fruto, lo que hace en nosotros.", formas: ["don es el fruto", "dones son el fruto", "lo mismo que el fruto", "igual que el fruto", "igual al fruto"], anula: "don" },
              ],
              modelo: "El talento natural es una capacidad que Dios nos dio al nacer, como la música. El don espiritual lo da el Espíritu Santo al creyente para edificar a la iglesia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Los dones del Espíritu en 1 Corintios 12
    "n2-dones-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dones son de palabra y de conocimiento?", reverso: "Palabra de sabiduría, palabra de ciencia y discernimiento de espíritus.", apoyo: "Dones de palabra y de conocimiento: palabra de sabiduría, palabra de ciencia y discernimiento de espíritus" },
              { frente: "¿Qué dones son de poder?", reverso: "Fe, dones de sanidades y hacer milagros.", apoyo: "Dones de poder: fe, dones de sanidades y hacer milagros" },
              { frente: "¿Qué dones son de expresión?", reverso: "Profecía, diversos géneros de lenguas e interpretación de lenguas.", apoyo: "Dones de expresión: profecía, diversos géneros de lenguas e interpretación de lenguas" },
              { frente: "¿Quién decide qué don recibe cada uno?", reverso: "El Espíritu: Él reparte a cada uno como Él quiere.", apoyo: "y el Espíritu decide cuál y cuándo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo recibimos los dones?", reverso: "Por gracia: nadie elige su don ni lo compra.", apoyo: "Nadie elige su don ni lo compra: lo recibimos por gracia" },
              { frente: "¿Hasta cuándo siguen vigentes los dones?", reverso: "Hasta que Cristo vuelva, cuando veremos cara a cara.", apoyo: "todos los dones siguen vigentes hasta que Cristo vuelva, cuando veremos cara a cara" },
              { frente: "¿Qué manda la Biblia hacer con lo que se dice en nombre del Espíritu?", reverso: "Examinarlo todo y retener lo bueno.", apoyo: "La Biblia manda examinarlo todo y retener lo bueno" },
              { frente: "¿Qué hace siempre una profecía verdadera?", reverso: "Edifica, exhorta y consuela, y nunca contradice la Escritura.", apoyo: "una profecía verdadera nunca contradice la Escritura y siempre edifica, exhorta y consuela" },
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
            consigna: "¿De qué grupo es cada don de 1 Corintios 12? Lleva cada don a su grupo.",
            grupos: ["Dones de palabra y de conocimiento", "Dones de poder", "Dones de expresión"],
            frases: [
              { texto: "Palabra de sabiduría", grupo: 0 },
              { texto: "Palabra de ciencia", grupo: 0 },
              { texto: "Discernimiento de espíritus", grupo: 0 },
              { texto: "Fe", grupo: 1 },
              { texto: "Dones de sanidades", grupo: 1 },
              { texto: "Hacer milagros", grupo: 1 },
              { texto: "Profecía", grupo: 2 },
              { texto: "Interpretación de lenguas", grupo: 2 },
            ],
            apoyo: "Dones de poder: fe, dones de sanidades y hacer milagros",
            ref: "1 Corintios 12:8-10",
            explica: "La lección agrupa así los dones de 1 Corintios 12: de palabra y de conocimiento, de poder y de expresión.",
          },
          {
            consigna: "¿Es un don de palabra y de conocimiento o un don de expresión? Lleva cada don a su grupo.",
            grupos: ["Dones de palabra y de conocimiento", "Dones de expresión"],
            frases: [
              { texto: "Palabra de sabiduría", grupo: 0 },
              { texto: "Palabra de ciencia", grupo: 0 },
              { texto: "Discernimiento de espíritus", grupo: 0 },
              { texto: "Profecía", grupo: 1 },
              { texto: "Diversos géneros de lenguas", grupo: 1 },
              { texto: "Interpretación de lenguas", grupo: 1 },
            ],
            apoyo: "Dones de expresión: profecía, diversos géneros de lenguas e interpretación de lenguas",
            ref: "1 Corintios 12:8-10",
            explica: "Sabiduría, ciencia y discernimiento de espíritus son dones de palabra y de conocimiento; profecía, lenguas e interpretación, dones de expresión.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Cómo reparte el Espíritu los dones? Toca las palabras que lo dicen.",
            texto: "uno y el mismo Espíritu, repartiendo a cada uno en particular [[como él quiere]]",
            apoyo: "Nadie elige su don ni lo compra: lo recibimos por gracia, y el Espíritu decide cuál y cuándo",
            ref: "1 Corintios 12:11",
            explica: "El Espíritu reparte los dones como Él quiere: Él decide cuál y cuándo.",
          },
          {
            consigna: "¿A quién reparte el Espíritu los dones? Toca las palabras que lo dicen.",
            texto: "uno y el mismo Espíritu, repartiendo [[a cada uno en particular]] como él quiere",
            apoyo: "el Espíritu reparte dones de palabra, de poder y de expresión a cada uno como Él quiere",
            ref: "1 Corintios 12:11",
            explica: "El mismo Espíritu reparte a cada uno en particular, como Él quiere: nadie elige su don.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo se reciben los dones tiene un error. Tócala.",
            frases: [
              "El Espíritu reparte los dones a cada uno como Él quiere.",
              "Cada creyente elige el don que más le gusta.",
              "Los dones se reciben por gracia.",
              "El Espíritu decide cuál don da y cuándo lo da.",
            ],
            malo: 1,
            correccion: "Nadie elige su don: el Espíritu lo reparte como Él quiere.",
            apoyo: "Nadie elige su don ni lo compra: lo recibimos por gracia, y el Espíritu decide cuál y cuándo",
            ref: "1 Corintios 12:11",
            explica: "El don no se elige ni se compra: se recibe por gracia, y el Espíritu decide cuál y cuándo.",
          },
          {
            consigna: "Una de estas frases sobre el reparto de los dones tiene un error. Tócala.",
            frases: [
              "Todos los dones los hace uno y el mismo Espíritu.",
              "Los dones los recibimos por gracia.",
              "Un don se puede comprar si uno paga lo suficiente.",
              "El Espíritu reparte a cada uno en particular, como Él quiere.",
            ],
            malo: 2,
            correccion: "Nadie compra su don: lo recibimos por gracia.",
            apoyo: "Nadie elige su don ni lo compra",
            ref: "1 Corintios 12:11",
            explica: "Los dones son de gracia: el Espíritu los reparte a cada uno en particular, como Él quiere.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo que también es creyente te dice: La profecía y las lenguas fueron solo para la iglesia del principio.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Siguen: Pablo dijo que no faltaba ningún don mientras esperamos a Cristo.", bien: true, explica: "Pablo escribió que a la iglesia no le faltaba ningún don, esperando la manifestación de Cristo: los dones siguen vigentes hasta que Él vuelva." },
              { texto: "Tienes razón: esos dones se acabaron cuando murieron los primeros apóstoles.", explica: "La lección enseña que todos los dones siguen vigentes hasta que Cristo vuelva." },
              { texto: "Siguen, y todo lo que alguien diga en nombre del Espíritu viene de Dios.", explica: "No todo lo que se dice en nombre del Espíritu viene de Dios: la Biblia manda examinarlo todo." },
              { texto: "Solo siguen algunos; los dones de poder y de expresión ya no hacen falta.", explica: "La lección habla de todos los dones: siguen vigentes hasta que Cristo vuelva." },
            ],
            apoyo: "Pablo escribió que a la iglesia no le faltaba ningún don, «esperando la manifestación» de nuestro Señor Jesucristo",
            ref: "1 Corintios 1:7",
            explica: "Todos los dones siguen vigentes hasta que Cristo vuelva, y se usan con discernimiento, a la luz de la Escritura.",
          },
          {
            caso: "Tu prima, que empezó a ir a la iglesia, te pregunta: ¿Dios todavía obra con dones como en el libro de los Hechos?",
            pregunta: "¿Qué le contestas?",
            opciones: [
              { texto: "Sí: el mismo Espíritu que obró en la iglesia de los Hechos obra hoy.", bien: true, explica: "Los dones siguen vigentes hasta que Cristo vuelva, y se usan con discernimiento." },
              { texto: "No: los dones fueron solo para los primeros cristianos, antes de la Biblia.", explica: "La lección enseña que todos los dones siguen vigentes hasta que Cristo vuelva." },
              { texto: "Sí, y por eso no hace falta examinar lo que se dice en nombre de Dios.", explica: "No todo lo que se dice en nombre del Espíritu viene de Dios: la Biblia manda examinarlo todo y retener lo bueno." },
              { texto: "Nadie lo sabe: la Biblia no dice nada sobre si los dones siguen o no.", explica: "Pablo escribió que a la iglesia no le faltaba ningún don, esperando la manifestación de Cristo." },
            ],
            apoyo: "El mismo Espíritu que obró en la iglesia de los Hechos obra hoy.",
            ref: "1 Corintios 1:7; 13:12",
            explica: "Las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los dones hoy: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo escribió que a la iglesia no le faltaba ningún don, esperando la manifestación de Cristo.", verdad: true, explica: "Por eso las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva.", apoyo: "Pablo escribió que a la iglesia no le faltaba ningún don", ref: "1 Corintios 1:7" },
              { texto: "Las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva.", verdad: true, explica: "Siguen vigentes hasta que Cristo vuelva, cuando veremos cara a cara.", apoyo: "las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva", ref: "1 Corintios 13:12" },
              { texto: "Todo lo que se dice en nombre del Espíritu viene de Dios.", verdad: false, explica: "No todo viene de Dios: la Biblia manda examinarlo todo y retener lo bueno.", apoyo: "No todo lo que se dice en nombre del Espíritu viene de Dios", ref: "1 Tesalonicenses 5:21" },
            ],
          },
          {
            consigna: "Sobre los dones hoy: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los dones del Espíritu terminaron con la iglesia del libro de los Hechos.", verdad: false, explica: "El mismo Espíritu que obró en la iglesia de los Hechos obra hoy: los dones siguen vigentes hasta que Cristo vuelva.", apoyo: "El mismo Espíritu que obró en la iglesia de los Hechos obra hoy" },
              { texto: "Una profecía verdadera puede contradecir la Escritura.", verdad: false, explica: "Una profecía verdadera nunca contradice la Escritura y siempre edifica, exhorta y consuela.", apoyo: "una profecía verdadera nunca contradice la Escritura", ref: "1 Corintios 14:3" },
              { texto: "La Biblia manda examinarlo todo y retener lo bueno.", verdad: true, explica: "Así se usan los dones con discernimiento, a la luz de la Escritura.", apoyo: "La Biblia manda examinarlo todo y retener lo bueno", ref: "1 Tesalonicenses 5:21" },
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
            apoyo: "Por eso las iglesias pentecostales creen que todos los dones siguen vigentes hasta que Cristo vuelva",
            ref: "1 Corintios 1:7; 13:12",
            clave: {
              id: "pr-n2-dones-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué creemos que los dones siguen vigentes hoy?",
              ideas: [
                { id: "faltaba", peso: 50, negativa: true, texto: "Pablo escribió que a la iglesia no le faltaba ningún don, esperando la manifestación de Cristo.", formas: ["faltaba", "esperando la manifestacion", "manifestacion de (nuestro|cristo|jesucristo|jesus|el)", "1 corintios 1 7"] },
                { id: "hasta", peso: 50, texto: "Por eso siguen vigentes hasta que Cristo vuelva, cuando lo veremos cara a cara.", formas: ["hasta que (cristo|jesus|jesucristo|el|senor) (vuelva|venga|regrese)", "hasta la (venida|vuelta|segunda)", "venida de (cristo|jesus|jesucristo)", "cara a cara"] },
              ],
              modelo: "Porque Pablo escribió que a la iglesia no le faltaba ningún don, esperando la manifestación de nuestro Señor Jesucristo. Por eso los dones siguen vigentes hasta que Cristo vuelva y lo veamos cara a cara.",
            },
          },
          {
            apoyo: "siguen vigentes hasta la venida de Cristo y se usan con discernimiento, a la luz de la Escritura",
            ref: "1 Tesalonicenses 5:21",
            clave: {
              id: "pr-n2-dones-2-a7-2",
              tipo: "corta",
              pregunta: "¿Hasta cuándo siguen vigentes los dones, y cómo se deben usar hoy?",
              ideas: [
                { id: "hasta", peso: 50, texto: "Siguen vigentes hasta que Cristo vuelva.", formas: ["hasta que (cristo|jesus|jesucristo|el|senor) (vuelva|venga|regrese)", "hasta la (venida|vuelta|segunda)", "venida de (cristo|jesus|jesucristo)", "cara a cara"] },
                { id: "discernir", peso: 50, texto: "Se usan con discernimiento, a la luz de la Escritura: se examina todo y se retiene lo bueno.", formas: ["discern*", "examin*", "a la luz de la (escritura|biblia|palabra)", "reten* lo bueno", "con la (escritura|biblia|palabra)"] },
              ],
              modelo: "Los dones siguen vigentes hasta que Cristo vuelva. Hoy se usan con discernimiento, a la luz de la Escritura: se examina todo lo que se dice y se retiene lo bueno.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Dones para hablar y para servir
    "n2-dones-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué compara Pablo a la iglesia en Romanos 12?", reverso: "Con un cuerpo: muchos miembros, pero no todos con la misma función.", apoyo: "Pablo compara la iglesia con un cuerpo: muchos miembros, pero no todos con la misma función" },
              { frente: "¿Qué dones nombra Romanos 12:6-8?", reverso: "Profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia.", apoyo: "profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia" },
              { frente: "¿Cómo pide Pablo usar los dones en Romanos 12?", reverso: "Con fe, con liberalidad, con solicitud y con alegría.", apoyo: "Y pide usarlos con fe, con liberalidad, con solicitud y con alegría" },
              { frente: "¿Cuál es el fin de todos los dones, según 1 Pedro 4:11?", reverso: "Que en todo sea Dios glorificado por Jesucristo.", apoyo: "En los dos casos, el fin es el mismo: que en todo sea Dios glorificado por Jesucristo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dones para hablar nombra la lección?", reverso: "Enseñar, exhortar, predicar y aconsejar.", apoyo: "Dones para hablar: enseñar, exhortar, predicar, aconsejar" },
              { frente: "¿Qué dones para servir nombra la lección?", reverso: "Ayudar, organizar, dar, cuidar y hospedar.", apoyo: "Dones para servir: ayudar, organizar, dar, cuidar, hospedar" },
              { frente: "¿Cómo se usan los dones para hablar?", reverso: "Hablando conforme a las palabras de Dios.", apoyo: "Se usan hablando conforme a las palabras de Dios" },
              { frente: "¿Qué dice Pablo de los miembros que parecen más débiles?", reverso: "Que son los más necesarios.", apoyo: "Pablo dice que los miembros que parecen más débiles son los más necesarios" },
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
            consigna: "Sobre los dones de Romanos 12: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo compara la iglesia con un cuerpo de muchos miembros.", verdad: true, explica: "Son muchos miembros, pero no todos con la misma función.", apoyo: "Pablo compara la iglesia con un cuerpo", ref: "Romanos 12:4-5" },
              { texto: "En la iglesia, todos los miembros tienen la misma función.", verdad: false, explica: "Hay muchos miembros, pero no todos con la misma función.", apoyo: "muchos miembros, pero no todos con la misma función", ref: "Romanos 12:4" },
              { texto: "Romanos 12 nombra la enseñanza, la exhortación y la misericordia entre los dones.", verdad: true, explica: "También nombra la profecía, el servicio, repartir y presidir.", apoyo: "profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia", ref: "Romanos 12:6-8" },
            ],
          },
          {
            consigna: "Sobre los dones de Romanos 12: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los dones de Romanos 12 se dan según los méritos de cada uno.", verdad: false, explica: "Romanos 12 dice que tenemos diferentes dones según la gracia que nos es dada.", apoyo: "Tenemos «diferentes dones, según la gracia que nos es dada»", ref: "Romanos 12:6" },
              { texto: "Pablo pide usar los dones con tristeza.", verdad: false, explica: "Pablo pide usarlos con fe, con liberalidad, con solicitud y con alegría.", apoyo: "Y pide usarlos con fe, con liberalidad, con solicitud y con alegría", ref: "Romanos 12:8" },
              { texto: "Repartir y presidir están entre los dones que nombra Romanos 12.", verdad: true, explica: "Romanos 12 nombra profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia.", apoyo: "profecía, servicio, enseñanza, exhortación, repartir, presidir y hacer misericordia", ref: "Romanos 12:6-8" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un don para hablar o un don para servir? Lleva cada frase a su grupo.",
            grupos: ["Dones para hablar", "Dones para servir"],
            frases: [
              { texto: "Enseñar", grupo: 0 },
              { texto: "Exhortar", grupo: 0 },
              { texto: "Predicar", grupo: 0 },
              { texto: "Aconsejar", grupo: 0 },
              { texto: "Ayudar", grupo: 1 },
              { texto: "Organizar", grupo: 1 },
              { texto: "Cuidar", grupo: 1 },
              { texto: "Hospedar", grupo: 1 },
            ],
            apoyo: "Dones para hablar: enseñar, exhortar, predicar, aconsejar",
            ref: "1 Pedro 4:11",
            explica: "Enseñar, exhortar, predicar y aconsejar son dones para hablar; ayudar, organizar, dar, cuidar y hospedar, dones para servir.",
          },
          {
            consigna: "¿Usa un don para hablar o un don para servir? Lleva cada frase a su grupo.",
            grupos: ["Un don para hablar", "Un don para servir"],
            frases: [
              { texto: "Enseñar la Biblia a un grupo de niños", grupo: 0 },
              { texto: "Exhortar a un hermano a seguir firme", grupo: 0 },
              { texto: "Aconsejar a una amiga con la Palabra", grupo: 0 },
              { texto: "Predicar el evangelio a un vecino", grupo: 0 },
              { texto: "Hospedar en casa a un hermano que viene de lejos", grupo: 1 },
              { texto: "Cuidar a un hermano enfermo", grupo: 1 },
              { texto: "Organizar las sillas antes de la reunión", grupo: 1 },
              { texto: "Dar comida a una familia necesitada", grupo: 1 },
            ],
            apoyo: "Dones para servir: ayudar, organizar, dar, cuidar, hospedar",
            ref: "1 Pedro 4:11",
            explica: "Enseñar, exhortar, aconsejar y predicar son dones para hablar; hospedar, cuidar, organizar y dar son dones para servir.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se usan los dos grupos de dones de 1 Pedro 4:11.",
            texto: "Los dones para [[hablar]] se usan conforme a las palabras de Dios; los dones para [[servir]], conforme al poder que Dios da. El fin de los dos es que en todo Dios sea [[glorificado]].",
            distractores: ["mandar", "lucirse", "olvidado"],
            errores: {
              mandar: "1 Pedro 4:11 habla de dones para hablar y para servir, y el fin es que en todo sea Dios glorificado.",
              lucirse: "El fin de los dones es que en todo sea Dios glorificado por Jesucristo.",
              olvidado: "En los dos casos, el fin es que en todo sea Dios glorificado por Jesucristo.",
            },
            apoyo: "Se usan hablando conforme a las palabras de Dios",
            ref: "1 Pedro 4:11",
            explica: "Quien habla, habla conforme a las palabras de Dios; quien sirve, conforme al poder que Dios da; el fin es que en todo sea Dios glorificado.",
          },
          {
            consigna: "Completa los dos grandes grupos de dones de 1 Pedro 4:11.",
            texto: "Ayudar, organizar, dar, cuidar y hospedar son dones para [[servir]]: se usan conforme al [[poder]] que Dios da. Enseñar y aconsejar son dones para [[hablar]].",
            distractores: ["presumir", "capricho", "mandar"],
            errores: {
              presumir: "Ayudar, organizar, dar, cuidar y hospedar son dones para servir, y el fin es que Dios sea glorificado.",
              capricho: "Los dones para servir se usan conforme al poder que Dios da.",
              mandar: "Enseñar y aconsejar son dones para hablar: se usan conforme a las palabras de Dios.",
            },
            apoyo: "Dones para servir: ayudar, organizar, dar, cuidar, hospedar. Se usan conforme al poder que Dios da",
            ref: "1 Pedro 4:11",
            explica: "1 Pedro 4:11 muestra dos grandes grupos: los dones para hablar, conforme a las palabras de Dios, y los dones para servir, conforme al poder que Dios da.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu iglesia te dice: Yo solo atiendo el sonido; eso no es un don de verdad, como predicar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Atender el sonido también es servir con un don de Dios: es necesario.", bien: true, explica: "La lección lo dice así: el que atiende el sonido también sirve con dones de Dios." },
              { texto: "Tienes razón: los dones de verdad son los que se ven en la reunión.", explica: "Los dones que no se ven también son de Dios: los miembros que parecen más débiles son los más necesarios." },
              { texto: "Sigue con el sonido hasta que Dios te dé un don de verdad, más importante.", explica: "En el cuerpo de Cristo no hay miembros de sobra: atender el sonido ya es servir con un don de Dios." },
              { texto: "Déjalo y busca algo que la gente note, para que tu servicio valga más.", explica: "Los miembros que parecen más débiles son los más necesarios: no hace falta que se note." },
            ],
            apoyo: "El que limpia el templo, el que recibe a las visitas, el que ora en secreto y el que atiende el sonido también sirven con dones de Dios",
            ref: "1 Corintios 12:22",
            explica: "Algunos dones se notan mucho y otros casi no se ven, pero todos son necesarios.",
          },
          {
            caso: "Una hermana mayor de tu iglesia te dice: Ya no puedo hacer mucho; solo oro en mi casa y recibo a las visitas.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Orar en secreto y recibir a las visitas también es servir con dones de Dios.", bien: true, explica: "La lección nombra al que ora en secreto y al que recibe a las visitas entre los que sirven con dones de Dios." },
              { texto: "Eso es poco: los dones de verdad son enseñar y predicar delante de todos.", explica: "En el cuerpo de Cristo no hay miembros de sobra: los dones que no se ven también son de Dios." },
              { texto: "Con su edad ya cumplió: ahora les toca a los jóvenes servir en la iglesia.", explica: "Su servicio sigue siendo necesario: en el cuerpo de Cristo no hay miembros de sobra." },
              { texto: "Eso no cuenta mucho: en la iglesia solo valen los dones que todos pueden ver.", explica: "Pablo dice que los miembros que parecen más débiles son los más necesarios." },
            ],
            apoyo: "En el cuerpo de Cristo no hay miembros de sobra.",
            ref: "1 Corintios 12:22",
            explica: "Orar en secreto y recibir a las visitas también es servir con dones de Dios: en el cuerpo de Cristo todos son necesarios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los dones que no se ven tiene un error. Tócala.",
            frases: [
              "El que limpia el templo también sirve con un don de Dios.",
              "Los miembros que parecen más débiles son los más necesarios.",
              "Solo son necesarios los dones que se notan en la reunión.",
              "El que ora en secreto también sirve con un don de Dios.",
            ],
            malo: 2,
            correccion: "Todos los dones son necesarios, también los que no se ven.",
            apoyo: "Pablo dice que los miembros que parecen más débiles son los más necesarios",
            ref: "1 Corintios 12:22",
            explica: "Los dones que no se ven también son de Dios: los miembros que parecen más débiles son los más necesarios.",
          },
          {
            consigna: "Una de estas frases sobre los dones en la iglesia tiene un error. Tócala.",
            frases: [
              "El que recibe a las visitas sirve con un don de Dios.",
              "Atender el sonido vale menos que enseñar en la iglesia.",
              "En el cuerpo de Cristo no hay miembros de sobra.",
              "Todos los dones se usan para la gloria de Dios.",
            ],
            malo: 1,
            correccion: "El que atiende el sonido también sirve con dones de Dios: todos son necesarios.",
            apoyo: "todos son necesarios y se usan con fe, con alegría y para la gloria de Dios",
            ref: "1 Corintios 12:22",
            explica: "En el cuerpo de Cristo no hay miembros de sobra: el que enseña y el que atiende el sonido sirven con dones de Dios.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En los dos casos, el fin es el mismo: que en todo sea Dios glorificado por Jesucristo",
            ref: "1 Pedro 4:11",
            clave: {
              id: "pr-n2-dones-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cuáles son los dos grandes grupos de dones de 1 Pedro 4:11, y cuál es el fin de los dos?",
              ideas: [
                { id: "hablar", peso: 35, texto: "Los dones para hablar, como enseñar, exhortar, predicar o aconsejar.", formas: ["para hablar", "hablar", "ensen*", "exhort*", "predic*", "aconsej*"] },
                { id: "servir", peso: 35, texto: "Los dones para servir, como ayudar, organizar, dar, cuidar u hospedar.", formas: ["para servir", "servir", "ayud*", "organiz*", "cuid*", "hosped*"] },
                { id: "gloria", peso: 30, texto: "En los dos casos, el fin es que en todo sea Dios glorificado.", formas: ["glorific*", "gloria", "honr*"] },
              ],
              modelo: "Son los dones para hablar, como enseñar y exhortar, y los dones para servir, como ayudar y cuidar. En los dos casos el fin es que en todo sea Dios glorificado.",
            },
          },
          {
            apoyo: "Se usan conforme al poder que Dios da",
            ref: "1 Pedro 4:11",
            clave: {
              id: "pr-n2-dones-3-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo se usan los dones para hablar y los dones para servir, según 1 Pedro 4:11?",
              ideas: [
                { id: "palabras", peso: 40, texto: "Los dones para hablar se usan conforme a las palabras de Dios.", formas: ["habl* conforme a (las|la) palabra*", "habl* palabra* dios", "habl* (la|las) palabra*", "habl* biblia"] },
                { id: "poder", peso: 40, texto: "Los dones para servir se usan conforme al poder que Dios da.", formas: ["servi* conforme al poder", "servi* poder", "sirv* poder", "servi* fuerza* dios", "sirv* fuerza* dios"] },
                { id: "gloria", peso: 20, texto: "Para que en todo sea Dios glorificado.", formas: ["glorific*", "gloria", "honr*"] },
              ],
              errores: [
                { id: "hablar-poder", texto: "Los dones para hablar se usan conforme a las palabras de Dios.", formas: ["habl* con el poder", "habl* conforme al poder"], anula: "palabras" },
                { id: "servir-palabras", texto: "Los dones para servir se usan conforme al poder que Dios da.", formas: ["servi* conforme a (las|sus|la) palabra*", "sirv* conforme a (las|sus|la) palabra*", "servi* con (las|sus|la) palabra*"], anula: "poder" },
              ],
              modelo: "Los dones para hablar se usan hablando conforme a las palabras de Dios, y los dones para servir, conforme al poder que Dios da, para que en todo Dios sea glorificado.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Los ministerios que edifican
    "n2-dones-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué ministerios nombra Efesios 4:11?", reverso: "Apóstoles, profetas, evangelistas, pastores y maestros.", apoyo: "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros" },
              { frente: "¿A quiénes perfeccionan los ministerios de Efesios 4:11, y para qué?", reverso: "A los santos, para la obra del ministerio.", apoyo: "a fin de perfeccionar a los santos para la obra del ministerio" },
              { frente: "¿Qué ya no debemos ser, según Efesios 4:14?", reverso: "Niños llevados por todo viento de doctrina.", apoyo: "Ya no niños llevados por todo viento de doctrina" },
              { frente: "¿Cuál es el mejor líder, según la lección?", reverso: "El que prepara a otros, no el que hace todo.", apoyo: "El mejor líder no es el que hace todo, sino el que prepara a otros." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la meta, según Efesios 4:13?", reverso: "La unidad, el conocimiento de Cristo y la madurez.", apoyo: "la meta es la unidad, el conocimiento de Cristo y la madurez" },
              { frente: "¿Quién constituyó los ministerios de Efesios 4:11?", reverso: "Cristo: Él los dio a la iglesia.", apoyo: "Cristo dio a la iglesia apóstoles, profetas, evangelistas, pastores y maestros" },
              { frente: "¿Quiénes hacen la obra del ministerio?", reverso: "Todos los creyentes: los líderes los preparan.", apoyo: "Los líderes preparan; todos los creyentes sirven" },
              { frente: "¿Qué palabra de Efesios 4:12 dice lo que se hace con los santos?", reverso: "Perfeccionar: prepararlos para servir.", apoyo: "para preparar a todos los creyentes para servir" },
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
            consigna: "Sobre los ministerios de Efesios 4:11: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Efesios 4:11 nombra a los apóstoles, los profetas y los evangelistas.", verdad: true, explica: "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros.", apoyo: "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
              { texto: "Según Efesios 4:11, el único ministerio que Cristo dio es el de pastor.", verdad: false, explica: "Efesios 4:11 nombra cinco: apóstoles, profetas, evangelistas, pastores y maestros.", apoyo: "Cristo dio a la iglesia apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
              { texto: "Los pastores y los maestros están entre los ministerios de Efesios 4:11.", verdad: true, explica: "Pastores y maestros cierran la lista de Efesios 4:11.", apoyo: "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
            ],
          },
          {
            consigna: "Sobre los ministerios de Efesios 4:11: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Fue Cristo quien constituyó los ministerios de Efesios 4:11.", verdad: true, explica: "Cristo constituyó esos ministerios y los dio a la iglesia.", apoyo: "Cristo dio a la iglesia apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
              { texto: "Los ministerios de Efesios 4:11 los creó la iglesia.", verdad: false, explica: "Fue Cristo quien los constituyó y los dio a la iglesia.", apoyo: "Cristo constituyó apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
              { texto: "Efesios 4:11 nombra solo a los apóstoles y a los profetas.", verdad: false, explica: "Nombra cinco: apóstoles, profetas, evangelistas, pastores y maestros.", apoyo: "Cristo dio a la iglesia apóstoles, profetas, evangelistas, pastores y maestros", ref: "Efesios 4:11" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué hacen los ministerios con los santos? Toca la palabra que lo dice.",
            texto: "a fin de [[perfeccionar]] a los santos para la obra del ministerio, para la edificación del cuerpo de Cristo",
            apoyo: "Los líderes preparan; todos los creyentes sirven",
            ref: "Efesios 4:12",
            explica: "Los ministerios perfeccionan, es decir, preparan a los santos: los líderes preparan y todos los creyentes sirven.",
          },
          {
            consigna: "¿Para qué obra se prepara a los santos? Toca las palabras que lo dicen.",
            texto: "a fin de perfeccionar a los santos para la [[obra del ministerio]], para la edificación del cuerpo de Cristo",
            apoyo: "para preparar a todos los creyentes para servir",
            ref: "Efesios 4:12",
            explica: "Los santos son preparados para la obra del ministerio, y así se edifica el cuerpo de Cristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu iglesia te dice: El pastor es el que tiene que hacer todo el trabajo; yo solo vengo a escuchar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Efesios 4 enseña que los líderes preparan y todos los creyentes servimos.", bien: true, explica: "Cristo dio los ministerios para perfeccionar a los santos para la obra del ministerio." },
              { texto: "Tienes razón: servir en la iglesia es un trabajo solo de los líderes.", explica: "Los líderes preparan, pero todos los creyentes sirven: el cuerpo crece cuando cada miembro hace su parte." },
              { texto: "Está bien que el pastor lo haga todo; tú puedes ayudarle a veces, si quieres.", explica: "La obra del ministerio es de todos los creyentes: los líderes preparan y todos sirven." },
              { texto: "Deja eso a los que tienen ministerios; los demás no tenemos ninguna parte.", explica: "El cuerpo crece cuando cada miembro hace su parte." },
            ],
            apoyo: "Los líderes preparan; todos los creyentes sirven",
            ref: "Efesios 4:11-12",
            explica: "Los ministerios existen para preparar a todos los creyentes para servir: todos hacemos la obra del ministerio.",
          },
          {
            caso: "Tu amiga Paola te dice: Mi líder quiere prepararme para servir, pero servir es cosa de los líderes, ¿no?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "No: los líderes preparan, y todos los creyentes servimos en la obra.", bien: true, explica: "Es lo que enseña Efesios 4: Cristo dio los ministerios para preparar a todos para servir." },
              { texto: "Sí: la obra del ministerio la hacen solo los apóstoles, profetas y pastores.", explica: "Los ministerios perfeccionan a los santos para la obra del ministerio: todos los creyentes sirven." },
              { texto: "No vale la pena: si tu líder sabe hacerlo, es mejor que lo haga él.", explica: "El mejor líder no es el que hace todo, sino el que prepara a otros." },
              { texto: "Sí: tú solo mira cómo sirven los líderes y aprende desde tu asiento.", explica: "El cuerpo crece cuando cada miembro hace su parte." },
            ],
            apoyo: "El mejor líder no es el que hace todo, sino el que prepara a otros.",
            ref: "Efesios 4:12",
            explica: "Cristo dio los ministerios para preparar a todos los creyentes para servir: los líderes preparan y todos sirven.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Para qué dio Cristo los ministerios? Elige cómo se une cada idea con la siguiente.",
            nodos: [
              { id: "cristo", texto: "Cristo", x: 25, y: 10 },
              { id: "ministerios", texto: "Los ministerios", x: 75, y: 36 },
              { id: "santos", texto: "Los santos", x: 25, y: 64 },
              { id: "obra", texto: "La obra del ministerio", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "cristo", a: "ministerios", relacion: "constituyó" },
              { de: "ministerios", a: "santos", relacion: "perfeccionan a" },
              { de: "santos", a: "obra", relacion: "hacen" },
            ],
            distractores: ["reemplazan a", "miran de lejos"],
            apoyo: "a fin de perfeccionar a los santos para la obra del ministerio",
            ref: "Efesios 4:11-12",
            explica: "Cristo constituyó los ministerios; los ministerios perfeccionan a los santos, y los santos hacen la obra del ministerio.",
          },
          {
            consigna: "¿Cómo se unen estas ideas de Efesios 4? Elige la relación de cada enlace.",
            nodos: [
              { id: "lideres", texto: "Los líderes", x: 25, y: 10 },
              { id: "creyentes", texto: "Todos los creyentes", x: 75, y: 36 },
              { id: "obra", texto: "La obra del ministerio", x: 25, y: 64 },
              { id: "cuerpo", texto: "El cuerpo de Cristo", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "lideres", a: "creyentes", relacion: "preparan a" },
              { de: "creyentes", a: "obra", relacion: "sirven en" },
              { de: "obra", a: "cuerpo", relacion: "edifica" },
            ],
            distractores: ["hacen todo en lugar de", "divide"],
            apoyo: "Los líderes preparan; todos los creyentes sirven",
            ref: "Efesios 4:12",
            explica: "Los líderes preparan a todos los creyentes; los creyentes sirven en la obra del ministerio, y así se edifica el cuerpo de Cristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es parte de la meta de Efesios 4 o no lo es? Lleva cada frase a su grupo.",
            grupos: ["La meta de Efesios 4", "No es la meta"],
            frases: [
              { texto: "La unidad de la fe", grupo: 0 },
              { texto: "El conocimiento del Hijo de Dios", grupo: 0 },
              { texto: "La madurez, a la medida de la plenitud de Cristo", grupo: 0 },
              { texto: "Ser llevados por todo viento de doctrina", grupo: 1, explica: "La meta es ya no ser niños llevados por todo viento de doctrina." },
              { texto: "Que los líderes hagan todo el trabajo", grupo: 1, explica: "Los líderes preparan; todos los creyentes sirven." },
              { texto: "Seguir siendo niños en la fe", grupo: 1 },
            ],
            apoyo: "la meta es la unidad, el conocimiento de Cristo y la madurez",
            ref: "Efesios 4:13-14",
            explica: "La meta es la unidad de la fe y del conocimiento del Hijo de Dios, y la madurez: ya no niños llevados por todo viento de doctrina.",
          },
          {
            consigna: "¿Ayuda al cuerpo a crecer hacia la meta o lo estorba? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a crecer", "Estorba el crecimiento"],
            frases: [
              { texto: "Seguir la verdad en amor", grupo: 0 },
              { texto: "Que cada miembro haga su parte", grupo: 0 },
              { texto: "Dejarse preparar para servir", grupo: 0 },
              { texto: "Dejar todo el trabajo al pastor", grupo: 1 },
              { texto: "Creer cualquier viento de doctrina", grupo: 1 },
              { texto: "Mirar desde lejos sin hacer su parte", grupo: 1 },
            ],
            apoyo: "El cuerpo crece «siguiendo la verdad en amor», cuando cada miembro hace su parte",
            ref: "Efesios 4:14-16",
            explica: "El cuerpo crece siguiendo la verdad en amor, cuando cada miembro hace su parte; los vientos de doctrina y dejar todo a unos pocos lo estorban.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "la meta es la unidad, el conocimiento de Cristo y la madurez",
            ref: "Efesios 4:13-14",
            clave: {
              id: "pr-n2-dones-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es la meta de los ministerios, según Efesios 4:13?",
              ideas: [
                { id: "unidad", peso: 35, texto: "La unidad de la fe.", formas: ["unidad", "unid*"] },
                { id: "conocimiento", peso: 30, texto: "El conocimiento del Hijo de Dios.", formas: ["conocimiento", "conoc* hijo", "conoc* cristo", "conoc* jesus"] },
                { id: "madurez", peso: 35, texto: "La madurez: ya no ser niños llevados por todo viento de doctrina.", formas: ["madur*", "varon perfecto", "plenitud", "estatura", "ya no ninos", "dejar de ser ninos", "crec*"] },
              ],
              modelo: "La meta es que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios, y a la madurez de Cristo, sin ser niños llevados por todo viento de doctrina.",
            },
          },
          {
            apoyo: "El cuerpo crece «siguiendo la verdad en amor», cuando cada miembro hace su parte",
            ref: "Efesios 4:15-16",
            clave: {
              id: "pr-n2-dones-4-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo crece el cuerpo de Cristo hacia la madurez, según Efesios 4:15-16?",
              ideas: [
                { id: "verdad-amor", peso: 50, texto: "Siguiendo la verdad en amor.", formas: ["verdad en amor", "siguiendo la verdad", "verdad con amor", "verdad y amor", "verdad amor"] },
                { id: "cada-miembro", peso: 50, texto: "Cuando cada miembro hace su parte.", formas: ["cada miembro", "su parte", "cada uno (sirve|sirva|aporta)", "todos (sirven|servimos)"] },
              ],
              modelo: "El cuerpo de Cristo crece siguiendo la verdad en amor, cuando cada miembro hace su parte: los líderes preparan y todos los creyentes sirven.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El camino más excelente: el amor y el orden
    "n2-dones-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es quien habla lenguas, profetiza y tiene toda la fe, pero no tiene amor?", reverso: "Nada: sin amor, nada es.", apoyo: "si no tiene amor, nada es" },
              { frente: "La lección compara los dones con un instrumento. ¿Qué es el amor?", reverso: "La manera de tocarlo.", apoyo: "los dones son el instrumento; el amor, la manera de tocarlo" },
              { frente: "¿Qué prueba que un don se usa como Dios quiere?", reverso: "El amor.", apoyo: "El amor es la prueba de que un don se usa como Dios quiere." },
              { frente: "¿Para qué debe hacerse todo en la reunión?", reverso: "Para edificación de la iglesia.", apoyo: "Todo debe hacerse para edificación" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el camino aún más excelente?", reverso: "El amor: sin él, los dones no valen nada.", apoyo: "Sin amor los dones no valen nada: el amor es el camino más excelente" },
              { frente: "¿Cómo van las lenguas en la reunión?", reverso: "Con interpretación, para que todos entiendan.", apoyo: "Las lenguas en la reunión van con interpretación, para que todos entiendan" },
              { frente: "¿Qué se hace con las profecías en la reunión?", reverso: "Se juzgan: los demás examinan lo que se dice.", apoyo: "Las profecías se juzgan: los demás examinan lo que se dice" },
              { frente: "¿De qué es Dios, según 1 Corintios 14:33?", reverso: "De paz, no de confusión.", apoyo: "Dios no es Dios de confusión, sino de paz" },
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
            consigna: "Completa por qué el amor es el camino más excelente.",
            texto: "El amor es un camino aún más [[excelente]]: los dones son el [[instrumento]]; el amor, la manera de [[tocarlo]].",
            distractores: ["pequeño", "premio", "guardarlo"],
            errores: {
              pequeño: "Pablo dice que el amor es un camino aún más excelente.",
              premio: "La lección compara los dones con un instrumento: el amor es la manera de tocarlo.",
              guardarlo: "El equilibrio bíblico no rechaza los dones: el amor es la manera de usarlos.",
            },
            apoyo: "El amor es un camino aún más excelente (1 Corintios 12:31): los dones son el instrumento; el amor, la manera de tocarlo",
            ref: "1 Corintios 12:31",
            explica: "Los dones son el instrumento y el amor es la manera de tocarlo: sin amor, los dones no valen nada.",
          },
          {
            consigna: "Completa lo que pasa con los dones sin amor.",
            texto: "Aunque alguien hable lenguas, profetice y tenga toda la [[fe]], si no tiene amor, nada es. El amor es la [[prueba]] de que un don se usa como [[Dios]] quiere.",
            distractores: ["fama", "duda", "cada uno"],
            errores: {
              fama: "Pablo habla de tener toda la fe: aun así, sin amor, nada es.",
              duda: "El amor es la prueba de que un don se usa como Dios quiere.",
              "cada uno": "El don se usa como Dios quiere, y el amor es la prueba.",
            },
            apoyo: "Aunque alguien hable lenguas humanas y angélicas, profetice y tenga toda la fe, si no tiene amor, nada es",
            ref: "1 Corintios 13:1-3",
            explica: "Ni las lenguas, ni la profecía, ni toda la fe valen sin amor: el amor muestra que el don se usa como Dios quiere.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la reunión con el orden que enseña 1 Corintios 14.",
            pares: [
              ["Todo en la reunión", "Debe hacerse para edificación"],
              ["Las lenguas en la reunión", "Van con interpretación, para que todos entiendan"],
              ["Las profecías", "Se juzgan: los demás examinan lo que se dice"],
              ["Dios", "No es Dios de confusión, sino de paz"],
            ],
            apoyo: "Todo debe hacerse para edificación: lo que no edifica a la iglesia, no es para la reunión",
            ref: "1 Corintios 14:26-40",
            explica: "En la reunión todo se hace para edificación y con orden: las lenguas con interpretación y las profecías juzgadas, porque Dios es Dios de paz.",
          },
          {
            consigna: "Une cada pregunta con el principio de orden que la responde.",
            pares: [
              ["¿Para qué debe hacerse todo en la reunión?", "Para edificación de la iglesia"],
              ["¿Qué necesitan las lenguas en la reunión?", "Interpretación, para que todos entiendan"],
              ["¿Qué hacen los demás con una profecía?", "Examinan lo que se dice"],
              ["¿De qué no es Dios, según Pablo?", "De confusión: es Dios de paz"],
            ],
            apoyo: "Dios no es Dios de confusión, sino de paz (1 Corintios 14:33): hágase todo decentemente y con orden",
            ref: "1 Corintios 14:26-40",
            explica: "Todo se hace para edificación: las lenguas con interpretación, las profecías examinadas y todo decentemente y con orden.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se usan los dones con equilibrio bíblico o no? Lleva cada frase a su grupo.",
            grupos: ["Con equilibrio bíblico", "Sin equilibrio bíblico"],
            frases: [
              { texto: "Examinar todo lo que se dice", grupo: 0 },
              { texto: "Retener lo bueno", grupo: 0 },
              { texto: "Usar los dones con orden en la reunión", grupo: 0 },
              { texto: "Apagar al Espíritu", grupo: 1, explica: "Pablo manda no apagar al Espíritu." },
              { texto: "Menospreciar las profecías", grupo: 1, explica: "Pablo manda no menospreciar las profecías." },
              { texto: "Rechazar todos los dones por miedo al desorden", grupo: 1 },
              { texto: "Usar los dones sin ningún orden", grupo: 1 },
            ],
            apoyo: "El equilibrio bíblico no rechaza los dones ni los usa sin orden",
            ref: "1 Tesalonicenses 5:19-21",
            explica: "El equilibrio bíblico no apaga al Espíritu ni menosprecia las profecías, pero lo examina todo, retiene lo bueno y usa los dones con orden.",
          },
          {
            consigna: "¿Muestra el equilibrio bíblico o lo rompe? Lleva cada frase a su grupo.",
            grupos: ["Muestra el equilibrio bíblico", "Rompe el equilibrio bíblico"],
            frases: [
              { texto: "Escuchar una profecía y examinarla", grupo: 0 },
              { texto: "Quedarse con lo bueno de lo que se dijo", grupo: 0 },
              { texto: "Interpretar las lenguas en la reunión", grupo: 0 },
              { texto: "Burlarse de las profecías", grupo: 1 },
              { texto: "Creer todo lo que se dice sin examinarlo", grupo: 1 },
              { texto: "Prohibir todos los dones en la iglesia", grupo: 1 },
            ],
            apoyo: "Examinadlo todo; retened lo bueno",
            ref: "1 Tesalonicenses 5:19-21",
            explica: "Ni apagar ni descuidar: no se rechazan los dones ni se usan sin orden; se examina todo y se retiene lo bueno.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué dos cosas manda hacer Pablo para discernir lo que se dice? Toca las palabras que las dicen.",
            texto: "No apaguéis al Espíritu. No menospreciéis las profecías. [[Examinadlo todo]]; [[retened lo bueno]]",
            apoyo: "sin apagar al Espíritu y examinándolo todo",
            ref: "1 Tesalonicenses 5:19-21",
            explica: "Discernir es examinarlo todo y retener lo bueno, sin apagar al Espíritu ni menospreciar las profecías.",
          },
          {
            consigna: "Pablo prohíbe dos cosas. Toca las dos palabras que dicen qué no debemos hacer.",
            texto: "No [[apaguéis]] al Espíritu. No [[menospreciéis]] las profecías. Examinadlo todo; retened lo bueno",
            apoyo: "El equilibrio bíblico no rechaza los dones ni los usa sin orden",
            ref: "1 Tesalonicenses 5:19-21",
            explica: "El equilibrio bíblico no apaga al Espíritu ni menosprecia las profecías: lo examina todo y retiene lo bueno.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amiga Sara te dice: En la reunión alguien me dio una profecía y no sé qué pensar.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "No la desprecies ni la sigas sin más: examínala y retén lo bueno.", bien: true, explica: "Es lo que manda Pablo: no menospreciar las profecías, examinarlo todo y retener lo bueno." },
              { texto: "Haz todo lo que te dijeron: toda profecía que se da viene de Dios.", explica: "Las profecías se juzgan: los demás examinan lo que se dice." },
              { texto: "Ignórala por completo: las profecías ya no son para la iglesia de hoy.", explica: "Pablo manda no menospreciar las profecías: el equilibrio bíblico no rechaza los dones." },
              { texto: "Pídele a otra persona otra profecía, hasta que una te guste más.", explica: "Lo que se dice se examina, y se retiene lo bueno, no lo que más nos guste." },
            ],
            apoyo: "Las profecías se juzgan: los demás examinan lo que se dice",
            ref: "1 Corintios 14:29; 1 Tesalonicenses 5:20-21",
            explica: "Una profecía no se desprecia ni se acepta sin más: se examina y se retiene lo bueno.",
          },
          {
            caso: "Un compañero de tu célula te dice: Yo prefiero una iglesia sin dones; así no hay desorden.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Pablo manda no apagar al Espíritu: los dones se usan con orden.", bien: true, explica: "El equilibrio bíblico no rechaza los dones ni los usa sin orden." },
              { texto: "Tienes razón: los dones causan desorden, y es mejor no tenerlos.", explica: "Pablo manda no apagar al Espíritu: lo que se busca es el orden, no quitar los dones." },
              { texto: "Al revés: lo mejor es usar los dones como cada uno sienta, sin orden.", explica: "Dios no es Dios de confusión, sino de paz: todo se hace decentemente y con orden." },
              { texto: "Lo único que importa es el orden; el amor y los dones dan lo mismo.", explica: "Sin amor los dones no valen nada, y el equilibrio bíblico no rechaza los dones." },
            ],
            apoyo: "El equilibrio bíblico no rechaza los dones ni los usa sin orden.",
            ref: "1 Tesalonicenses 5:19; 1 Corintios 14:40",
            explica: "Ni apagar ni descuidar: los dones no se rechazan, y se usan decentemente y con orden.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Sin amor los dones no valen nada: el amor es el camino más excelente",
            ref: "1 Corintios 12:31; 13:1-3",
            clave: {
              id: "pr-n2-dones-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el amor es el camino más excelente para usar los dones?",
              ideas: [
                { id: "sin-amor", peso: 50, negativa: true, texto: "Sin amor, los dones no valen nada: quien los tiene sin amor, nada es.", formas: ["sin amor", "nada es", "dones no (valen|vale) nada", "dones no (sirven|sirve) de nada", "dones pierden su sentido"] },
                { id: "manera", peso: 50, texto: "El amor es la manera de usar el don como Dios quiere: los dones son el instrumento; el amor, la manera de tocarlo.", formas: ["manera de (tocar*|usar*)", "instrumento", "(usa|use|usar|usan|usen) como dios quiere", "la prueba", "prueba de que"] },
              ],
              errores: [
                { id: "mas-dones", texto: "Sin amor los dones no valen nada: el amor es el camino más excelente.", formas: ["dones son mas importantes que el amor", "dones valen mas que el amor", "mas importantes que el amor", "mas importante que el amor"], anula: "sin-amor" },
                { id: "mas-dones-manera", texto: "El amor es la manera de usar los dones como Dios quiere.", formas: ["dones son mas importantes que el amor", "dones valen mas que el amor", "mas importantes que el amor", "mas importante que el amor"], anula: "manera" },
              ],
              modelo: "Porque sin amor los dones no valen nada: aunque alguien tenga toda la fe, si no tiene amor, nada es. Los dones son el instrumento, y el amor es la manera de tocarlo.",
            },
          },
          {
            apoyo: "El amor es la prueba de que un don se usa como Dios quiere.",
            ref: "1 Corintios 13:1-3",
            clave: {
              id: "pr-n2-dones-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña 1 Corintios 13 sobre usar un don sin amor?",
              ideas: [
                { id: "nada", peso: 50, negativa: true, texto: "Quien usa un don sin amor, nada es: sin amor, los dones no valen nada.", formas: ["nada es", "sin amor no (es|soy|somos|eres) nada", "don* no (vale|valen) nada", "don* no (sirve|sirven) de nada", "don* pierden su sentido"] },
                { id: "prueba", peso: 50, texto: "El amor es la prueba de que un don se usa como Dios quiere.", formas: ["prueba", "(usa|use|usar|usan|usen) como dios quiere", "manera de (tocar*|usar*)", "instrumento", "mas excelente"] },
              ],
              errores: [
                { id: "amor-poco", texto: "Sin amor, nada es: el amor es la prueba de que un don se usa como Dios quiere.", formas: ["amor no es nada", "amor no importa", "amor no es importante", "amor no vale nada", "amor no hace falta"], anula: "nada" },
              ],
              modelo: "Enseña que quien usa un don sin amor, nada es, aunque hable lenguas o profetice. El amor es la prueba de que un don se usa como Dios quiere.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Descubrir tu don y servir
    "n2-dones-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo colocó Dios los miembros en el cuerpo?", reverso: "Como Él quiso: cada uno en su lugar.", apoyo: "Dios puso a cada miembro en el cuerpo como Él quiso" },
              { frente: "¿Dónde se descubre el don, según la lección?", reverso: "En movimiento: sirviendo en distintas áreas.", apoyo: "Sirve en distintas áreas: el don se descubre en movimiento." },
              { frente: "¿Qué pregunta te ayuda a observar el fruto de tu servicio?", reverso: "¿Tu servicio edifica a otros?", apoyo: "Observa el fruto: ¿tu servicio edifica a otros?" },
              { frente: "¿Con qué empieza todo servicio?", reverso: "Con una entrega: una vida rendida a Dios como sacrificio vivo.", apoyo: "Todo servicio empieza con una entrega" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué pedir en oración para descubrir tu don?", reverso: "Porque el Espíritu reparte los dones y el Padre da buenas cosas a los que le piden.", apoyo: "Pide en oración: el Espíritu reparte los dones, y el Padre da buenas cosas a los que le piden" },
              { frente: "¿Por qué escuchar a los líderes y a los hermanos maduros?", reverso: "Porque ellos ven lo que Dios hace en ti.", apoyo: "Escucha a los líderes y a los hermanos maduros: ellos ven lo que Dios hace en ti." },
              { frente: "¿Qué puede ser tu llamado?", reverso: "La necesidad que te duele: fíjate en lo que te da gozo y carga.", apoyo: "Fíjate en lo que te da gozo y carga: la necesidad que te duele puede ser tu llamado." },
              { frente: "¿Hay que conocer tu don para empezar a servir?", reverso: "No: sirviendo lo conocerás.", apoyo: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás." },
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
            consigna: "Une cada paso para descubrir tu don con lo que enseña la lección.",
            pares: [
              ["Pide en oración", "El Padre da buenas cosas a los que le piden"],
              ["Sirve en distintas áreas", "El don se descubre en movimiento"],
              ["Observa el fruto", "¿Tu servicio edifica a otros?"],
              ["Escucha a los hermanos maduros", "Ellos ven lo que Dios hace en ti"],
              ["Fíjate en lo que te da gozo y carga", "La necesidad que te duele puede ser tu llamado"],
            ],
            apoyo: "el don se descubre orando, sirviendo, mirando el fruto y escuchando a los maduros",
            ref: "Lucas 11:13; 1 Corintios 12:18",
            explica: "El don se descubre orando, sirviendo, mirando el fruto, escuchando a los maduros y fijándote en lo que te da gozo y carga.",
          },
          {
            consigna: "¿Qué paso para descubrir tu don estás dando? Une cada situación con su paso.",
            pares: [
              ["Le pides a Dios que te muestre dónde servir", "Pedir en oración"],
              ["Ayudas un mes con los niños y otro con el sonido", "Servir en distintas áreas"],
              ["Te preguntas si tu servicio edifica a otros", "Observar el fruto"],
              ["Tu líder te cuenta lo que ve que Dios hace en ti", "Escuchar a los líderes y a los maduros"],
              ["Te duele ver a los enfermos solos y quieres ayudar", "Fijarte en lo que te da gozo y carga"],
            ],
            apoyo: "Fíjate en lo que te da gozo y carga: la necesidad que te duele puede ser tu llamado",
            ref: "Lucas 11:13",
            explica: "Cada paso ayuda a descubrir el don: orar, servir en distintas áreas, mirar el fruto, escuchar a los maduros y fijarse en la necesidad que te duele.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Cómo colocó Dios los miembros en el cuerpo? Toca las palabras que lo dicen.",
            texto: "cada uno de ellos en el cuerpo, [[como él quiso]]",
            apoyo: "Tu lugar en el cuerpo es un diseño de Dios.",
            ref: "1 Corintios 12:18",
            explica: "Dios colocó cada miembro como Él quiso: tu lugar en el cuerpo es un diseño de Dios.",
          },
          {
            consigna: "¿A cuáles de los miembros colocó Dios en el cuerpo? Toca las palabras que lo dicen.",
            texto: "[[cada uno de ellos]] en el cuerpo, como él quiso",
            apoyo: "Dios puso a cada miembro en el cuerpo como Él quiso",
            ref: "1 Corintios 12:18",
            explica: "Dios colocó a cada uno de los miembros: nadie puede decir que no lo necesitan, y nadie debe pensar que no sirve.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el lugar de cada miembro en el cuerpo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios colocó cada miembro en el cuerpo como Él quiso.", verdad: true, explica: "Tu lugar en el cuerpo es un diseño de Dios.", apoyo: "Dios puso a cada miembro en el cuerpo como Él quiso", ref: "1 Corintios 12:18" },
              { texto: "Algunos miembros del cuerpo de Cristo están de sobra.", verdad: false, explica: "Nadie puede decir que no lo necesitan, y nadie debe pensar que no sirve.", apoyo: "Nadie puede decir que no lo necesitan, y nadie debe pensar que no sirve", ref: "1 Corintios 12:21-22" },
              { texto: "Tu lugar en el cuerpo es un diseño de Dios.", verdad: true, explica: "Dios colocó a cada miembro en el cuerpo como Él quiso.", apoyo: "Tu lugar en el cuerpo es un diseño de Dios", ref: "1 Corintios 12:18" },
            ],
          },
          {
            consigna: "Sobre el lugar de cada miembro en el cuerpo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Algunos creyentes son menos necesarios que otros en el cuerpo de Cristo.", verdad: false, explica: "Nadie puede decir que no lo necesitan: cada miembro está en el cuerpo porque Dios lo colocó allí.", apoyo: "Nadie puede decir que no lo necesitan", ref: "1 Corintios 12:21-22" },
              { texto: "Dios decidió el lugar de cada miembro en el cuerpo.", verdad: true, explica: "Dios colocó los miembros, cada uno de ellos en el cuerpo, como Él quiso.", apoyo: "Dios puso a cada miembro en el cuerpo como Él quiso", ref: "1 Corintios 12:18" },
              { texto: "Tu lugar en el cuerpo es cuestión de suerte.", verdad: false, explica: "Tu lugar en el cuerpo es un diseño de Dios: Él colocó los miembros como quiso.", apoyo: "Tu lugar en el cuerpo es un diseño de Dios", ref: "1 Corintios 12:18" },
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
            consigna: "Ordena el camino para empezar a servir, del primer paso al último.",
            pasos: [
              "Entregar tu vida a Dios como sacrificio vivo",
              "Hablar con el líder de un ministerio y ofrecer tu ayuda",
              "Servir un mes en ese ministerio",
              "Mirar el fruto: ¿tu servicio edifica a otros?",
            ],
            apoyo: "Todo servicio empieza con una entrega",
            ref: "Romanos 12:1",
            explica: "Todo servicio empieza con una entrega. Luego hablas con un líder y ofreces tu ayuda, sirves y miras si tu servicio edifica a otros.",
          },
          {
            consigna: "Mateo quiere servir en su iglesia. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Se entrega a Dios como sacrificio vivo",
              "Habla esta semana con el líder de recibir a las personas",
              "Le ofrece su ayuda y sirve un mes en ese ministerio",
              "Escucha lo que su líder ve que Dios hace en él",
            ],
            apoyo: "Habla esta semana con el líder de un ministerio de tu iglesia y ofrece tu ayuda",
            ref: "Romanos 12:1",
            explica: "Primero se entrega a Dios; luego habla con un líder, ofrece su ayuda y sirve. Al servir, los líderes ven lo que Dios hace en él.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amigo Daniel te dice: Quiero servir en la iglesia, pero primero quiero estar seguro de cuál es mi don.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Empieza a servir esta semana: sirviendo vas a conocer tu don.", bien: true, explica: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás." },
              { texto: "Espera hasta que alguien te diga con certeza cuál es tu don.", explica: "El don se descubre en movimiento: sirviendo en distintas áreas." },
              { texto: "Sirve solo en algo que se vea, para que tu don se note pronto.", explica: "Un corazón rendido a Dios sirve con alegría donde sea necesario." },
              { texto: "Mira desde lejos cómo sirven otros hasta saber cuál es el tuyo.", explica: "El don se descubre sirviendo, no mirando desde lejos." },
            ],
            apoyo: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás.",
            ref: "1 Corintios 12:18; Romanos 12:1",
            explica: "Un corazón rendido a Dios sirve con alegría donde sea necesario, aunque su don todavía no esté claro.",
          },
          {
            caso: "Una hermana de tu célula te dice: Quiero empezar a servir, pero no sé qué hacer primero.",
            pregunta: "¿Qué primer paso le propones?",
            opciones: [
              { texto: "Habla esta semana con el líder de un ministerio y ofrécele tu ayuda.", bien: true, explica: "Es el primer paso que propone la lección: hablar con el líder de un ministerio y ofrecer tu ayuda." },
              { texto: "Espera a que el pastor te llame; él sabrá cuándo estás lista para servir.", explica: "No hace falta esperar: un primer paso es hablar con el líder de un ministerio y ofrecer tu ayuda." },
              { texto: "Primero lee todo sobre los dones; servir puede esperar unos años más.", explica: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás." },
              { texto: "Ofrécete solo si te dejan hacer lo que más te guste y lo que más se vea.", explica: "Un corazón rendido a Dios sirve con alegría donde sea necesario." },
            ],
            apoyo: "Habla esta semana con el líder de un ministerio de tu iglesia y ofrece tu ayuda",
            ref: "Romanos 12:1",
            explica: "Puede ayudar en recibir a las personas, enseñar a los niños, la alabanza, el sonido, la oración, la visitación o la limpieza.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Habla esta semana con el líder de un ministerio de tu iglesia y ofrece tu ayuda",
            ref: "Romanos 12:1",
            clave: {
              id: "pr-n2-dones-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál será tu primer paso concreto para servir en tu iglesia esta semana?",
              ideas: [
                { id: "lider", peso: 50, texto: "Hablar con el líder de un ministerio.", formas: ["lider*", "encargad*", "pastor*", "habl* con"] },
                { id: "ayuda", peso: 50, texto: "Ofrecer tu ayuda en un área concreta: recibir a las personas, los niños, la alabanza, el sonido, la oración, la visitación o la limpieza.", formas: ["ofrec*", "ayud*", "recibir", "ninos", "alabanza", "sonido", "oracion", "orar", "visit*", "limpi*", "servir en", "sirv*"] },
              ],
              modelo: "Esta semana voy a hablar con el líder del ministerio de los niños y le voy a ofrecer mi ayuda para enseñar a los niños los domingos.",
            },
          },
          {
            apoyo: "No esperes a conocer tu don para empezar a servir: sirviendo lo conocerás.",
            ref: "Romanos 12:1",
            clave: {
              id: "pr-n2-dones-6-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo empiezas a servir si todavía no sabes cuál es tu don?",
              ideas: [
                { id: "sirviendo", peso: 50, texto: "No espero a conocer mi don: sirviendo lo conoceré.", formas: ["sirviendo", "en movimiento", "al servir", "empiez* a servir", "empezar a servir", "no espero", "no esperar"] },
                { id: "paso", peso: 50, texto: "Hablo con el líder de un ministerio y le ofrezco mi ayuda.", formas: ["lider*", "habl* con", "ofrec*", "ofrez*", "ayuda*", "ministerio"] },
              ],
              errores: [
                { id: "esperar", texto: "No hace falta esperar a conocer tu don: sirviendo lo conocerás.", formas: ["primero espero", "espero a (que|saber|conocer|tener)", "despues de (saberlo|saber|conocerlo|conocer)", "hasta (saber|conocer|que sepa)"], anula: "sirviendo" },
              ],
              modelo: "No espero a conocer mi don: empiezo a servir, porque sirviendo lo conoceré. Esta semana hablo con el líder de un ministerio y le ofrezco mi ayuda.",
            },
          },
        ],
      },
    ],
  },
};
