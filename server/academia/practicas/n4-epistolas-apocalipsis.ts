/**
 * Las prácticas de «Epístolas y Apocalipsis» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-epistolas-apocalipsis.ts), con la guía de docs/academia-practicas.md.
 *
 * Las fechas que la lección da con cautela se preguntan con esa misma cautela («según la mayoría de los estudiosos»,
 * «según la tradición»), y la fecha de Gálatas, que se discute, no se pregunta. En el Apocalipsis ninguna actividad toma
 * posición sobre las cuatro maneras de leerlo: se pregunta solo lo que la lección dice de cada una y que se comparan con
 * respeto. El orden de los últimos tiempos (el arrebatamiento y el milenio) es un punto de la declaración de fe por
 * confirmar: ninguna actividad pregunta por él, y la estructura del libro se practica sin los capítulos 17 al 20 y sin
 * ordenar sus partes, para que nada se lea como un orden de los acontecimientos del fin.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_EPISTOLAS_APOCALIPSIS: PracticasMateria = {
  materia: "n4-epistolas-apocalipsis",
  mision: {
    titulo: "Dios nos ha hablado por el Hijo",
    intro: "Tu pastor te pidió que prepares un recorrido por las cartas del Nuevo Testamento y el Apocalipsis para los nuevos líderes de la iglesia. Te van a preguntar por el evangelio de la gracia en Romanos y Gálatas, por los problemas de Corinto, por las cartas de la prisión y las pastorales, por Hebreos, Santiago, Pedro, Juan y Judas, y por cómo leer el Apocalipsis sin miedo. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes enseñar las cartas con fidelidad: el evangelio de la gracia, al que no se le añade nada; una iglesia con problemas que no está sin esperanza; Cristo supremo sobre todo; líderes que guardan la fe y forman a otros; una fe que se nota en la vida; y el mensaje claro del Apocalipsis: Cristo vence, y la iglesia fiel espera su venida orando: ven, Señor Jesús.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Romanos y Gálatas: el evangelio de la gracia
    "n4-epistolas-apocalipsis-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Desde qué ciudad escribió Pablo la carta a los Romanos?", reverso: "Desde Corinto, hacia el año 57 según la mayoría de los estudiosos.", apoyo: "Pablo escribió a los Romanos desde Corinto, hacia el año 57 según la mayoría de los estudiosos" },
              { frente: "¿Qué es el evangelio, según el tema de Romanos?", reverso: "Poder de Dios para salvación a todo aquel que cree.", apoyo: "el evangelio «es poder de Dios para salvación a todo aquel que cree»" },
              { frente: "¿Qué enseñaban algunos a los creyentes gentiles, según Gálatas?", reverso: "Que debían circuncidarse y guardar la ley para ser salvos.", apoyo: "algunos enseñaban que los creyentes gentiles debían circuncidarse y guardar la ley para ser salvos" },
              { frente: "¿Para qué es la libertad que trae la gracia?", reverso: "No para pecar, sino para andar en el Espíritu.", apoyo: "No es libertad para pecar, sino para andar en el Espíritu" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué relación tenía Pablo con la iglesia de Roma?", reverso: "No la había fundado, y quería visitarla de camino a España.", apoyo: "No había fundado esa iglesia y quería visitarla de camino a España" },
              { frente: "¿Cómo une Pablo el diagnóstico y el remedio en Romanos?", reverso: "Todos pecaron, y son justificados gratuitamente por su gracia.", apoyo: "Pablo une el diagnóstico y el remedio: «todos pecaron, y están destituidos de la gloria de Dios»" },
              { frente: "¿De qué se asombra Pablo en la carta a los Gálatas?", reverso: "De que siguieran un evangelio diferente, cuando no hay otro.", apoyo: "Pablo se asombra de que siguieran «un evangelio diferente», y aclara: «No que haya otro»" },
              { frente: "¿Qué le pasó a Juan Wesley en 1738, en Londres?", reverso: "Sintió su corazón arder mientras oía leer el prefacio de Lutero a Romanos.", apoyo: "en 1738 Juan Wesley sintió su corazón ardiendo de una manera extraña mientras oía leer, en una reunión en Londres, el prefacio de Lutero a Romanos" },
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
            consigna: "¿Qué camino sigue la carta a los Romanos? Ordena sus partes, del capítulo 1 al 16.",
            pasos: ["Todos pecaron, judíos y gentiles", "La justificación por la fe, con el ejemplo de Abraham", "La vida nueva en el Espíritu", "Dios y el pueblo de Israel", "La vida práctica de la iglesia"],
            apoyo: "Romanos es la exposición más ordenada del evangelio: todos pecaron, y Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu",
            ref: "Romanos 3:23-24",
            explica: "Romanos sigue este camino: todos pecaron (capítulos 1 al 3), la justificación por la fe (3 al 5), la vida nueva en el Espíritu (6 al 8), Dios y el pueblo de Israel (9 al 11) y la vida práctica de la iglesia (12 al 16).",
          },
          {
            consigna: "Romanos va del diagnóstico a la vida práctica. Ordena sus partes, de la primera a la última.",
            pasos: ["Judíos y gentiles: todos pecaron", "Justificados por la fe, como Abraham", "Sin condenación: la vida nueva en el Espíritu", "Dios y su pueblo Israel", "Una vida entregada: la vida práctica de la iglesia"],
            apoyo: "desde el capítulo 12 Pablo pide una vida entregada",
            ref: "Romanos 12:1-2",
            explica: "Primero el diagnóstico, todos pecaron (capítulos 1 al 3), y el remedio, la justificación por la fe (3 al 5). Después, la vida nueva en el Espíritu (6 al 8), Dios e Israel (9 al 11) y, desde el capítulo 12, una vida entregada.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el tema central de la carta a los Romanos.",
            texto: "Romanos es la exposición más [[ordenada]] del evangelio: todos pecaron, y Dios [[justifica]] por su [[gracia]] a todo el que cree.",
            distractores: ["breve", "condena", "ley"],
            errores: {
              breve: "Romanos es la exposición más ordenada del evangelio en el Nuevo Testamento.",
              condena: "Dios justifica gratuitamente por su gracia a todo el que cree.",
              ley: "Dios justifica por su gracia; Gálatas defiende ese evangelio contra los que querían añadirle la ley.",
            },
            apoyo: "Romanos es la exposición más ordenada del evangelio: todos pecaron, y Dios justifica gratuitamente por su gracia a todo el que cree",
            ref: "Romanos 3:23-24",
            explica: "Romanos es la exposición más ordenada del evangelio. Pablo une el diagnóstico y el remedio: todos pecaron, y son justificados gratuitamente por su gracia.",
          },
          {
            consigna: "Completa cuándo y para qué escribió Pablo a los Romanos.",
            texto: "Pablo escribió a los Romanos desde [[Corinto]], antes de llevar a Jerusalén la [[ofrenda]] de las iglesias, y quería visitar Roma de camino a [[España]].",
            distractores: ["Éfeso", "carta", "Egipto"],
            errores: {
              "Éfeso": "Pablo escribió a los Romanos desde Corinto.",
              carta: "Pablo escribió antes de llevar a Jerusalén la ofrenda de las iglesias.",
              Egipto: "Pablo quería visitar la iglesia de Roma de camino a España.",
            },
            apoyo: "Pablo escribió a los Romanos desde Corinto, hacia el año 57 según la mayoría de los estudiosos, antes de llevar a Jerusalén la ofrenda de las iglesias",
            ref: "Romanos 15:24-26",
            explica: "Pablo escribió desde Corinto, hacia el año 57 según la mayoría de los estudiosos, antes de llevar a Jerusalén la ofrenda de las iglesias. No había fundado la iglesia de Roma y quería visitarla de camino a España.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la carta a los Gálatas tiene un error. Tócala.",
            frases: [
              "En Gálatas, Pablo escribe con urgencia.",
              "Algunos enseñaban que los gentiles debían circuncidarse para ser salvos.",
              "Pablo acepta añadir la ley al evangelio, si también se cree en Cristo.",
              "Pablo llama a estar firmes en la libertad con que Cristo nos hizo libres.",
            ],
            malo: 2,
            correccion: "Pablo no acepta añadirle nada: se asombra de que siguieran un evangelio diferente, y aclara que no hay otro.",
            apoyo: "Pablo se asombra de que siguieran «un evangelio diferente», y aclara: «No que haya otro»",
            ref: "Gálatas 1:6-7",
            explica: "Algunos querían añadirle la ley al evangelio. Pablo responde que no hay otro evangelio, y llama a estar firmes en la libertad de Cristo.",
          },
          {
            consigna: "Una de estas frases sobre el problema de Gálatas y la respuesta de Pablo tiene un error. Tócala.",
            frases: [
              "Gálatas responde a los que querían añadirle la ley al evangelio.",
              "Pablo aclara que no hay otro evangelio.",
              "Para Pablo, la libertad de Cristo es libertad para pecar.",
              "Gálatas llama a dar el fruto del Espíritu.",
            ],
            malo: 2,
            correccion: "La libertad de Cristo no es libertad para pecar, sino para andar en el Espíritu.",
            apoyo: "No es libertad para pecar, sino para andar en el Espíritu",
            ref: "Gálatas 5:1",
            explica: "Gálatas defiende el evangelio de la gracia contra los que querían añadirle la ley, y llama a vivir firmes en la libertad de Cristo, que es para andar en el Espíritu y dar su fruto.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Gálatas defiende ese mismo evangelio contra los que querían añadirle la ley",
            ref: "Gálatas 1:6-7",
            titulo: "Otro evangelio en la célula",
            relato: [
              "Eres líder de una célula. Hace poco se convirtieron varias personas que nunca habían ido a una iglesia.",
              "Un maestro que vino de visita les dijo que creer en Cristo no basta: para ser salvos, también deben guardar la ley.",
              "Los nuevos están confundidos, y una de ellas te pregunta si Cristo no es suficiente.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué problema de la carta a los Gálatas se repite en tu célula?",
                opciones: [
                  { texto: "Le añaden la ley al evangelio, como los que pedían guardarla para ser salvos.", bien: true, explica: "Es el problema de Gálatas: algunos enseñaban que los creyentes gentiles debían circuncidarse y guardar la ley para ser salvos." },
                  { texto: "Enseñan que la gracia es libertad para pecar, y que da igual cómo se viva.", explica: "El maestro no dijo eso. El problema de Gálatas era otro: querían añadirle la ley al evangelio." },
                  { texto: "Enseñan que nadie pecó, y que por eso nadie necesita ser justificado por Dios.", explica: "El maestro no dijo eso. El problema de Gálatas era añadirle la ley al evangelio de la gracia." },
                  { texto: "Enseñan que Dios justifica solo a los que nacieron judíos, y no a los gentiles.", explica: "El maestro no dijo eso: dijo que hay que añadir la ley para ser salvos, que es el problema de Gálatas." },
                ],
                apoyo: "algunos enseñaban que los creyentes gentiles debían circuncidarse y guardar la ley para ser salvos",
                explica: "Algunos enseñaban que los creyentes gentiles debían circuncidarse y guardar la ley para ser salvos: querían añadirle la ley al evangelio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la hermana nueva, con la respuesta de Pablo?",
                opciones: [
                  { texto: "Que no hay otro evangelio: Cristo nos hizo libres, y a la gracia no se le añade nada.", bien: true, explica: "Pablo se asombra de que siguieran un evangelio diferente, y aclara que no hay otro: hay que estar firmes en la libertad con que Cristo nos hizo libres." },
                  { texto: "Que crea en Cristo y que también guarde la ley, para estar más segura de su salvación.", explica: "Eso es añadirle la ley al evangelio: Pablo aclara que no hay otro evangelio." },
                  { texto: "Que cada maestro trae su propio evangelio, y que escoja el que mejor le parezca a ella.", explica: "Pablo aclara: «No que haya otro». No hay otro evangelio." },
                  { texto: "Que como ya es libre, puede vivir como quiera, porque nada de lo que haga va a importar.", explica: "La libertad de Cristo no es libertad para pecar, sino para andar en el Espíritu." },
                ],
                apoyo: "Al evangelio de la gracia no se le añade nada: se cree y se vive",
                explica: "Gálatas defiende el evangelio de la gracia contra los que querían añadirle la ley: no hay otro evangelio.",
              },
              {
                tipo: "explica",
                apoyo: "Gálatas defiende ese mismo evangelio contra los que querían añadirle la ley, y llama a vivir firmes en la libertad de Cristo",
                ref: "Gálatas 5:1",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-1-a5-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras qué le responderías al maestro visitante, con la respuesta de Pablo en Gálatas.",
                  ideas: [
                    { id: "otro", peso: 40, texto: "No hay otro evangelio: el que le añade la ley a la fe en Cristo sigue un evangelio diferente.", formas: ["no (hay|existe) otro", "no que haya otro", "evangelio diferente", "otro evangelio", "un solo evangelio", "unico evangelio", "evangelio distinto"] },
                    { id: "gracia", peso: 30, texto: "La salvación es por la gracia, por la fe en Cristo, sin añadirle la ley.", formas: ["gracia", "gratuit*", "por (la|medio de la) fe", "fe en cristo", "cristo (basta|es suficiente)", "solo (cristo|creer)", "basta (cristo|creer|con creer)"] },
                    { id: "libertad", peso: 30, texto: "Hay que estar firmes en la libertad con que Cristo nos hizo libres.", formas: ["libertad", "libres", "libre", "firmes"] },
                  ],
                  errores: [
                    { id: "otro-valido", texto: "Pablo aclara que no hay otro evangelio.", formas: ["(hay|existe|existen) (otro|otros|dos|varios|muchos) evangelio*"], anula: "otro" },
                  ],
                  modelo: "Le diría con respeto que no hay otro evangelio: si a la fe en Cristo se le añade la ley, ya es un evangelio diferente. Somos salvos por la gracia, y debemos estar firmes en la libertad con que Cristo nos hizo libres.",
                },
              },
            ],
          },
          {
            apoyo: "Al evangelio de la gracia no se le añade nada: se cree y se vive",
            ref: "Gálatas 5:1",
            titulo: "Las reglas para ser aceptado",
            relato: [
              "Eres maestro de la clase de nuevos creyentes. Un joven de la clase lleva meses sin paz.",
              "Alguien le enseñó que Dios solo lo aceptará si cumple bien la ley, y él siente que nunca hace lo suficiente.",
              "Quieres ayudarlo con lo que enseñan Romanos y Gálatas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le explicas primero sobre cómo Dios nos acepta?",
                opciones: [
                  { texto: "Que todos pecaron, y que Dios justifica gratuitamente por su gracia al que cree.", bien: true, explica: "Pablo une el diagnóstico y el remedio: todos pecaron, y son justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús." },
                  { texto: "Que Dios lo aceptará el día en que cumpla toda la ley sin fallar ni una sola vez.", explica: "Nadie es aceptado así: todos pecaron, y Dios justifica gratuitamente por su gracia a todo el que cree." },
                  { texto: "Que Dios solo acepta a los que ya dejaron de pecar, y que por eso se esfuerce más.", explica: "Todos pecaron, y son justificados gratuitamente por su gracia, no por su esfuerzo." },
                  { texto: "Que la gracia le ayuda a ganar con sus obras la salvación que todavía le falta.", explica: "La justificación es gratuita, por su gracia: al evangelio de la gracia no se le añade nada." },
                ],
                apoyo: "todos pecaron, y Dios justifica gratuitamente por su gracia a todo el que cree",
                ref: "Romanos 3:23-24",
                explica: "Pablo une el diagnóstico y el remedio: todos pecaron, y son justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús.",
              },
              {
                tipo: "situacion",
                pregunta: "El joven pregunta si debe añadir la ley para estar más seguro. ¿Qué le enseña Gálatas?",
                opciones: [
                  { texto: "Que no hay otro evangelio: para ser salvo, a la gracia no se le añade la ley.", bien: true, explica: "Pablo se asombra de que siguieran un evangelio diferente, y aclara que no hay otro. Al evangelio de la gracia no se le añade nada." },
                  { texto: "Que sí: la gracia lo salva solo a medias, y la ley termina de salvarlo después.", explica: "Eso es un evangelio diferente: Gálatas defiende el evangelio de la gracia contra los que querían añadirle la ley." },
                  { texto: "Que puede escoger: unos se salvan por la ley y otros se salvan por la gracia.", explica: "No hay dos evangelios: Pablo aclara que no hay otro." },
                  { texto: "Que la ley es lo principal, y que la gracia solo ayuda a los que fallan mucho.", explica: "Dios justifica gratuitamente por su gracia a todo el que cree: la gracia no es una ayuda para unos pocos." },
                ],
                apoyo: "Gálatas defiende ese mismo evangelio contra los que querían añadirle la ley",
                ref: "Gálatas 1:6-7",
                explica: "Pablo se asombra de que siguieran un evangelio diferente, y aclara que no hay otro. Al evangelio de la gracia no se le añade nada.",
              },
              {
                tipo: "explica",
                apoyo: "Al evangelio de la gracia no se le añade nada: se cree y se vive",
                ref: "Gálatas 5:22-23",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-1-a5-2",
                  tipo: "corta",
                  pregunta: "El joven te pregunta: Entonces, si no me salvo por cumplir la ley, ¿ya no importa cómo vivo? ¿Qué le respondes?",
                  ideas: [
                    { id: "nada", peso: 35, texto: "Al evangelio de la gracia no se le añade nada: la salvación se recibe creyendo.", formas: ["se cree", "creyendo", "creer en cristo", "por (la|su) fe", "por fe", "por (la|su) gracia", "por gracia", "no se le (anade|agrega|suma) nada", "nada se le (anade|agrega|suma)", "no se (anade|agrega) nada", "gratuit*", "gratis", "regalo"] },
                    { id: "vive", peso: 40, texto: "Pero el evangelio también se vive: la libertad no es para pecar, sino para andar en el Espíritu.", formas: ["se vive", "si importa", "claro que importa", "importa (mucho|como)", "andar en el espiritu", "and* en el espiritu", "vivir en el espiritu", "en el espiritu", "no (es|son) para pecar", "no para pecar"] },
                    { id: "fruto", peso: 25, texto: "Y da el fruto del Espíritu: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", formas: ["fruto", "frutos", "amor", "gozo", "paz", "paciencia", "benignidad", "bondad", "mansedumbre", "templanza"] },
                  ],
                  errores: [
                    { id: "pecar", texto: "La libertad de Cristo no es libertad para pecar, sino para andar en el Espíritu.", formas: ["libertad para pecar", "puede* pecar", "pued* vivir como quier*"], anula: "vive" },
                  ],
                  modelo: "Le diría que a la gracia no se le añade nada: la salvación se recibe creyendo, no cumpliendo la ley. Pero el evangelio también se vive: la libertad no es para pecar, sino para andar en el Espíritu y dar su fruto.",
                },
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
            consigna: "Sobre la justificación y la vida en el Espíritu: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La justificación no deja al creyente igual.", verdad: true, explica: "La justificación no deja al creyente igual: «ninguna condenación hay para los que están en Cristo Jesús», y Pablo pide una vida entregada.", apoyo: "La justificación no deja al creyente igual", ref: "Romanos 8:1" },
              { texto: "Primero hay que dar el fruto del Espíritu para que Dios nos justifique.", verdad: false, explica: "Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu, que da su fruto.", apoyo: "Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu" },
              { texto: "Desde el capítulo 12 de Romanos, Pablo pide una vida entregada.", verdad: true, explica: "Pablo pide: «que presentéis vuestros cuerpos en sacrificio vivo», y «transformaos por medio de la renovación de vuestro entendimiento».", apoyo: "desde el capítulo 12 Pablo pide una vida entregada", ref: "Romanos 12:1-2" },
            ],
          },
          {
            consigna: "Sobre la gracia, la libertad y el Espíritu: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La libertad que trae la gracia es libertad para pecar.", verdad: false, explica: "No es libertad para pecar, sino para andar en el Espíritu.", apoyo: "No es libertad para pecar, sino para andar en el Espíritu", ref: "Gálatas 5:1" },
              { texto: "Dios justifica a todo el que cree para una vida nueva en el Espíritu.", verdad: true, explica: "Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu.", apoyo: "Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu" },
              { texto: "Quien fue justificado por la fe ya no necesita ser transformado.", verdad: false, explica: "La justificación no deja al creyente igual. Pablo pide: «transformaos por medio de la renovación de vuestro entendimiento».", apoyo: "La justificación no deja al creyente igual", ref: "Romanos 12:2" },
              { texto: "Andar en el Espíritu da su fruto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.", verdad: true, explica: "La libertad de Cristo es para andar en el Espíritu, cuyo fruto es «amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza».", apoyo: "sino para andar en el Espíritu, cuyo fruto es «amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza»", ref: "Gálatas 5:22-23" },
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
            apoyo: "La justificación no deja al creyente igual",
            ref: "Romanos 8:1",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se relaciona la justificación por la fe con la vida nueva en el Espíritu, según Romanos?",
              ideas: [
                { id: "gracia", peso: 35, texto: "Dios justifica gratuitamente por su gracia a todo el que cree.", formas: ["por (su|la) gracia", "por gracia", "gratuit*", "al que cree", "todo el que cree", "los que creen", "el que cree"] },
                { id: "igual", peso: 35, texto: "La justificación no deja al creyente igual: ya no hay condenación, y empieza una vida nueva en el Espíritu.", formas: ["no (lo|nos|te|le|la) deja igual", "no deja igual", "ninguna condenacion", "sin condenacion", "no hay condenacion", "para una vida", "lleva a una vida", "para que (viva|vivamos|vivan|vivas)", "cambia (la|su|nuestra|mi|tu) vida", "nos cambia", "lo cambia"] },
                { id: "entrega", peso: 30, texto: "Pablo pide una vida entregada: el cuerpo en sacrificio vivo y la renovación del entendimiento.", formas: ["entregad*", "entrega*", "sacrificio vivo", "transform*", "renov*", "entendimiento"] },
              ],
              errores: [
                { id: "justificar-obras", texto: "Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu.", formas: ["justific* como premio", "para que dios nos justifique", "para que nos justifique", "para ser justificados", "justificacion es por obras", "justificacion es por las obras", "nos justifica por (las|nuestras|buenas) obras", "ganar* la justificacion", "merec* la justificacion"], anula: "gracia" },
              ],
              modelo: "Dios justifica gratuitamente por su gracia a todo el que cree, y eso no lo deja igual: ya no hay condenación y empieza una vida nueva en el Espíritu. Por eso Pablo pide una vida entregada, transformada por la renovación del entendimiento.",
            },
          },
          {
            apoyo: "No es libertad para pecar, sino para andar en el Espíritu",
            ref: "Gálatas 5:1",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-1-a7-2",
              tipo: "corta",
              pregunta: "Si somos justificados por gracia y no por la ley, ¿para qué es la libertad que trae la gracia, según Gálatas?",
              ideas: [
                { id: "pecar", peso: 30, texto: "No es libertad para pecar.", formas: ["no es libertad para pec*", "no es para pec*", "no son para pec*", "no para pec*", "no pecar", "sin pecar", "dejar de pecar"] },
                { id: "espiritu", peso: 40, texto: "Es libertad para andar en el Espíritu.", formas: ["andar en el espiritu", "and* en el espiritu", "vivir en el espiritu", "viv* en el espiritu", "guiad* por el espiritu", "en el espiritu", "conforme al espiritu", "segun el espiritu", "por el espiritu"] },
                { id: "fruto", peso: 30, texto: "Así se da el fruto del Espíritu: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", formas: ["fruto", "frutos", "amor", "gozo", "paz", "paciencia", "benignidad", "bondad", "mansedumbre", "templanza"] },
              ],
              errores: [
                { id: "para-pecar", texto: "La libertad de Cristo no es libertad para pecar.", formas: ["libertad para pecar", "es para pecar", "puede* pecar", "pued* vivir como quier*"], anula: "pecar" },
              ],
              modelo: "La libertad que trae la gracia no es libertad para pecar, sino para andar en el Espíritu. Quien anda en el Espíritu da su fruto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. 1 y 2 Corintios: una iglesia con dones y con problemas
    "n4-epistolas-apocalipsis-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo era la ciudad de Corinto?", reverso: "Rica y comercial, con dos puertos y fama de inmoralidad.", apoyo: "Corinto era una ciudad rica y comercial, con dos puertos y fama de inmoralidad" },
              { frente: "¿Cuánto tiempo se quedó Pablo en Corinto al fundar la iglesia?", reverso: "Un año y medio, en su segundo viaje.", apoyo: "Pablo fundó allí la iglesia en su segundo viaje y se quedó un año y medio" },
              { frente: "¿Cuál era el primer problema de la iglesia de Corinto?", reverso: "La división: unos decían ser de Pablo, otros de Apolos y otros de Cefas.", apoyo: "El primero era la división: unos decían ser de Pablo, otros de Apolos y otros de Cefas" },
              { frente: "¿Qué pasa con los dones sin amor?", reverso: "No edifican.", apoyo: "Los dones sin amor no edifican" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Desde dónde escribió Pablo 1 Corintios?", reverso: "Desde Éfeso, hacia los años 53 a 55.", apoyo: "Escribió 1 Corintios desde Éfeso (1 Corintios 16:8), hacia los años 53 a 55" },
              { frente: "¿Qué pone Pablo en medio de la enseñanza sobre los dones?", reverso: "El capítulo del amor.", apoyo: "En medio de la enseñanza sobre los dones, en los capítulos 12 al 14, Pablo pone el capítulo del amor" },
              { frente: "¿Qué ven muchos estudiosos en 1 Corintios 15:3-4?", reverso: "Uno de los resúmenes más antiguos de la fe de la iglesia.", apoyo: "Muchos estudiosos ven aquí uno de los resúmenes más antiguos de la fe de la iglesia" },
              { frente: "¿Qué ministerio nos dio Dios, según 2 Corintios?", reverso: "El ministerio de la reconciliación.", apoyo: "Dios «nos dio el ministerio de la reconciliación»" },
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
            consigna: "Completa cómo era la ciudad de Corinto.",
            texto: "Corinto era una ciudad [[rica]] y comercial, con dos [[puertos]] y fama de inmoralidad.",
            distractores: ["pobre", "templos", "agrícola"],
            errores: {
              pobre: "Corinto era una ciudad rica.",
              templos: "Corinto tenía dos puertos.",
              "agrícola": "Corinto era una ciudad rica y comercial.",
            },
            apoyo: "Corinto era una ciudad rica y comercial, con dos puertos y fama de inmoralidad",
            explica: "Corinto era una ciudad rica y comercial, con dos puertos y fama de inmoralidad. Allí fundó Pablo la iglesia, en su segundo viaje.",
          },
          {
            consigna: "Completa cómo nació la iglesia de Corinto y desde dónde le escribió Pablo.",
            texto: "Pablo fundó la iglesia de Corinto en su [[segundo]] viaje, se quedó un [[año]] y medio y después escribió 1 Corintios desde [[Éfeso]].",
            distractores: ["primer", "mes", "Roma"],
            errores: {
              primer: "Pablo fundó la iglesia de Corinto en su segundo viaje.",
              mes: "Pablo se quedó en Corinto un año y medio.",
              Roma: "Pablo escribió 1 Corintios desde Éfeso.",
            },
            apoyo: "Pablo fundó allí la iglesia en su segundo viaje y se quedó un año y medio",
            ref: "Hechos 18:11",
            explica: "Pablo fundó la iglesia de Corinto en su segundo viaje y se quedó un año y medio. Escribió 1 Corintios desde Éfeso, hacia los años 53 a 55.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un problema de la iglesia de Corinto o parte de la respuesta de Pablo? Lleva cada frase a su grupo.",
            grupos: ["Un problema de Corinto", "La respuesta de Pablo"],
            frases: [
              { texto: "Unos decían ser de Pablo, otros de Apolos y otros de Cefas", grupo: 0 },
              { texto: "Algunos negaban la resurrección de los muertos", grupo: 0 },
              { texto: "Había pleitos entre hermanos", grupo: 0 },
              { texto: "Había desorden en el culto", grupo: 0 },
              { texto: "Rogar que no haya divisiones entre ellos", grupo: 1 },
              { texto: "Poner el amor por encima de los dones", grupo: 1 },
              { texto: "Recordar que Cristo murió y resucitó al tercer día", grupo: 1 },
              { texto: "Corregir con el evangelio de la cruz", grupo: 1 },
            ],
            apoyo: "Pablo la corrigió con amor y con el evangelio: la cruz, el amor por encima de los dones y la resurrección de Cristo",
            ref: "1 Corintios 1:10",
            explica: "Corinto tenía divisiones, inmoralidad, pleitos, desorden en el culto y dudas sobre la resurrección. Pablo la corrigió con amor y con el evangelio: la cruz, el amor por encima de los dones y la resurrección de Cristo.",
          },
          {
            consigna: "¿De qué tema de 1 Corintios trata cada frase? Lleva cada frase a su grupo.",
            grupos: ["Sobre la división", "Sobre los dones", "Sobre la resurrección"],
            frases: [
              { texto: "Unos decían ser de Pablo y otros de Apolos", grupo: 0 },
              { texto: "Pablo ruega que no haya divisiones entre ellos", grupo: 0 },
              { texto: "El capítulo del amor, en medio de los capítulos 12 al 14", grupo: 1 },
              { texto: "Los dones sin amor no edifican", grupo: 1 },
              { texto: "El amor es sufrido y benigno, y no tiene envidia", grupo: 1 },
              { texto: "Algunos negaban la resurrección de los muertos", grupo: 2 },
              { texto: "Cristo fue sepultado y resucitó al tercer día", grupo: 2 },
            ],
            apoyo: "Después responde, uno por uno, a la inmoralidad, a los pleitos entre hermanos, al matrimonio, a la comida ofrecida a los ídolos, al orden del culto, a los dones del Espíritu y a la resurrección",
            ref: "1 Corintios 13:4-7",
            explica: "Pablo ruega que no haya divisiones; en medio de la enseñanza sobre los dones pone el capítulo del amor, porque los dones sin amor no edifican; y a los que negaban la resurrección les responde con el corazón del evangelio.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué tres hechos del evangelio recuerda Pablo a los que negaban la resurrección? Toca las palabras que los dicen.",
            texto: "Que Cristo [[murió]] por nuestros pecados, conforme a las Escrituras; y que fue [[sepultado]], y que [[resucitó]] al tercer día",
            apoyo: "Algunos negaban la resurrección de los muertos, y Pablo responde con el corazón del evangelio",
            ref: "1 Corintios 15:3-4",
            explica: "Ante los que negaban la resurrección, Pablo responde con el corazón del evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.",
          },
          {
            consigna: "En el capítulo del amor, ¿qué es el amor? Toca las dos palabras que lo dicen.",
            texto: "El amor es [[sufrido]], es [[benigno]]; el amor no tiene envidia",
            apoyo: "En medio de la enseñanza sobre los dones, en los capítulos 12 al 14, Pablo pone el capítulo del amor",
            ref: "1 Corintios 13:4",
            explica: "En medio de la enseñanza sobre los dones, Pablo pone el capítulo del amor: «El amor es sufrido, es benigno; el amor no tiene envidia». Los dones sin amor no edifican.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "En 2 Corintios presenta el ministerio de la reconciliación, la generosidad alegre y el poder de Dios que se perfecciona en la debilidad",
            ref: "2 Corintios 12:9",
            situacion: "Eres pastor asistente en una iglesia que pasa por un tiempo difícil. Te toca cuidar tu ministerio, animar a la generosidad y servir aunque estés cansado.",
            escenas: [
              {
                id: "e1",
                narra: "Unos hermanos critican tu trabajo y dicen, a tus espaldas, que no eres un buen ministro.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con ellos, defiendes tu ministerio con humildad y les abres tu corazón.", valor: 2, explica: "Así hizo Pablo en 2 Corintios: defiende su ministerio ante quienes lo criticaban, y abre su corazón." },
                  { texto: "No dices nada y sigues con tu trabajo, aunque la crítica crezca en la iglesia.", valor: 1, explica: "Seguir sirviendo es bueno, pero Pablo no se calló: defendió su ministerio ante quienes lo criticaban, y abrió su corazón." },
                  { texto: "Les respondes con dureza delante de todos, para que nadie más se atreva a criticarte.", valor: 0, explica: "Pablo defendió su ministerio ante quienes lo criticaban abriéndoles su corazón, no con dureza." },
                ],
              },
              {
                id: "e2",
                narra: "La iglesia va a recoger una ofrenda para familias pobres del barrio.",
                pregunta: "¿Cómo animas a los hermanos a dar?",
                opciones: [
                  { texto: "Les pides que cada uno dé como propuso en su corazón, con alegría.", valor: 2, explica: "En los capítulos 8 y 9, Pablo anima a la ofrenda: «Cada uno dé como propuso en su corazón», «porque Dios ama al dador alegre»." },
                  { texto: "Les explicas la necesidad y pides que den, sin hablarles de dar con alegría.", valor: 1, explica: "Explicar la necesidad está bien, pero Pablo anima a dar como cada uno propuso en su corazón, porque Dios ama al dador alegre." },
                  { texto: "Los presionas para que den más, aunque muchos terminen dando con tristeza.", valor: 0, explica: "Dios ama al dador alegre: cada uno dé como propuso en su corazón." },
                ],
              },
              {
                id: "e3",
                narra: "Al final de un mes muy duro, te sientes débil y piensas que no sirves para el ministerio.",
                pregunta: "¿Qué recuerdas?",
                opciones: [
                  { texto: "Que su gracia te basta, y que su poder se perfecciona en la debilidad.", valor: 2, explica: "Es la lección más profunda de la vida de Pablo: el Señor le dijo «Bástate mi gracia; porque mi poder se perfecciona en la debilidad»." },
                  { texto: "Que debes descansar unos días y después seguir solo con tus propias fuerzas.", valor: 1, explica: "Descansar puede ayudar, pero el poder que sostiene el ministerio es el de Dios, que se perfecciona en la debilidad." },
                  { texto: "Que un buen ministro nunca se siente débil, y que debes esconder lo que te pasa.", valor: 0, explica: "Pablo compartió la lección más profunda de su vida: el poder de Dios se perfecciona en la debilidad." },
                ],
              },
            ],
          },
          {
            apoyo: "Una iglesia con problemas no es una iglesia sin esperanza",
            ref: "2 Corintios 5:18-20",
            situacion: "Eres líder de jóvenes. Este mes te toca predicar en el culto juvenil y organizar una ofrenda para una familia necesitada.",
            escenas: [
              {
                id: "e1",
                narra: "Llevas días cansado y tienes miedo de no estar a la altura para predicar.",
                pregunta: "¿Con qué actitud vas a predicar?",
                opciones: [
                  { texto: "Confiando en que su gracia te basta y su poder se perfecciona en la debilidad.", valor: 2, explica: "Es la lección más profunda de la vida de Pablo: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad»." },
                  { texto: "Esforzándote el doble, para que nadie se dé cuenta de que te sientes débil y cansado.", valor: 1, explica: "Prepararse bien es bueno, pero el poder de Dios se perfecciona en la debilidad, no en nuestras fuerzas." },
                  { texto: "No predicas: piensas que Dios solo usa a los que nunca se sienten débiles ni cansados.", valor: 0, explica: "El Señor le dijo a Pablo que su poder se perfecciona en la debilidad." },
                ],
              },
              {
                id: "e2",
                narra: "En el sermón vas a explicar qué significa servir a Cristo.",
                pregunta: "¿Qué enseñas, con 2 Corintios 5?",
                opciones: [
                  { texto: "Que Dios nos dio el ministerio de la reconciliación: somos embajadores de Cristo.", valor: 2, explica: "Dios «nos dio el ministerio de la reconciliación», y por eso «somos embajadores en nombre de Cristo»." },
                  { texto: "Que servir es importante, aunque no explicas en nombre de quién servimos ni para qué.", valor: 1, explica: "Es verdad, pero 2 Corintios dice más: Dios nos dio el ministerio de la reconciliación, y somos embajadores en nombre de Cristo." },
                  { texto: "Que el ministerio es la manera de ganar el respeto y la admiración de los demás.", valor: 0, explica: "En 2 Corintios, el ministerio es el de la reconciliación: somos embajadores en nombre de Cristo." },
                ],
              },
              {
                id: "e3",
                narra: "Para la ofrenda, un joven quiere dar, pero dice que lo hace solo porque se siente presionado.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que dé como propuso en su corazón, porque Dios ama al dador alegre.", valor: 2, explica: "Pablo anima a la ofrenda así: «Cada uno dé como propuso en su corazón», «porque Dios ama al dador alegre»." },
                  { texto: "Que lo piense y ore, y que dé después, aunque no le hablas de la alegría de dar.", valor: 1, explica: "Pensarlo está bien, pero Pablo pide dar como cada uno propuso en su corazón, porque Dios ama al dador alegre." },
                  { texto: "Que dé de todos modos, aunque sea con tristeza: lo que importa es la cantidad.", valor: 0, explica: "Dios ama al dador alegre: cada uno dé como propuso en su corazón." },
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
            consigna: "Sobre la enseñanza de 2 Corintios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En 2 Corintios, Pablo defiende su ministerio ante quienes lo criticaban.", verdad: true, explica: "Pablo defiende su ministerio ante quienes lo criticaban, y abre su corazón.", apoyo: "En 2 Corintios Pablo defiende su ministerio ante quienes lo criticaban, y abre su corazón" },
              { texto: "Según 2 Corintios, el poder de Dios se perfecciona en la fuerza del ministro.", verdad: false, explica: "El Señor le dijo a Pablo: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", apoyo: "el poder de Dios que se perfecciona en la debilidad", ref: "2 Corintios 12:9" },
              { texto: "En los capítulos 8 y 9, Pablo anima a la ofrenda para los pobres de Jerusalén.", verdad: true, explica: "En los capítulos 8 y 9 anima a la ofrenda para los pobres de Jerusalén: «Cada uno dé como propuso en su corazón».", apoyo: "En los capítulos 8 y 9 anima a la ofrenda para los pobres de Jerusalén", ref: "2 Corintios 9:7" },
            ],
          },
          {
            consigna: "Sobre el ministerio, la generosidad y la debilidad en 2 Corintios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo pide que cada uno dé como propuso en su corazón.", verdad: true, explica: "«Cada uno dé como propuso en su corazón», «porque Dios ama al dador alegre».", apoyo: "«Cada uno dé como propuso en su corazón»", ref: "2 Corintios 9:7" },
              { texto: "Según 2 Corintios, a Dios le da igual si damos con alegría o sin ella.", verdad: false, explica: "Pablo anima a dar como cada uno propuso en su corazón, «porque Dios ama al dador alegre».", apoyo: "«porque Dios ama al dador alegre»", ref: "2 Corintios 9:7" },
              { texto: "Pablo dice que Dios nos dio el ministerio de la reconciliación.", verdad: true, explica: "Dios «nos dio el ministerio de la reconciliación», y por eso «somos embajadores en nombre de Cristo».", apoyo: "Dios «nos dio el ministerio de la reconciliación»", ref: "2 Corintios 5:18-20" },
              { texto: "Pablo esconde sus debilidades para que nadie dude de su ministerio.", verdad: false, explica: "Pablo abre su corazón y comparte la lección más profunda de su vida: el poder de Dios se perfecciona en la debilidad.", apoyo: "Y comparte la lección más profunda de su vida", ref: "2 Corintios 12:9" },
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
            apoyo: "el Señor le dijo «Bástate mi gracia; porque mi poder se perfecciona en la debilidad»",
            ref: "2 Corintios 12:9",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué te enseña 2 Corintios 12:9 sobre tus propias debilidades en el ministerio?",
              ideas: [
                { id: "gracia", peso: 50, texto: "La gracia del Señor basta.", formas: ["gracia basta", "gracia me basta", "gracia te basta", "gracia nos basta", "gracia es suficiente", "bastate", "basta", "suficiente", "me alcanza"] },
                { id: "poder", peso: 50, texto: "Su poder se perfecciona en la debilidad.", formas: ["perfecciona*", "su poder", "poder de dios", "poder del senor", "poder de cristo", "poder (en|de) (la|mi|nuestra) debilidad"] },
              ],
              modelo: "Me enseña lo que el Señor le dijo a Pablo: su gracia me basta, porque su poder se perfecciona en la debilidad. Por eso puedo seguir sirviendo, confiando en su gracia y no en mis propias fuerzas.",
            },
          },
          {
            apoyo: "En 2 Corintios presenta el ministerio de la reconciliación, la generosidad alegre y el poder de Dios que se perfecciona en la debilidad",
            ref: "2 Corintios 9:7",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña 2 Corintios sobre cómo dar y sobre el ministerio que Dios nos dio?",
              ideas: [
                { id: "dar", peso: 50, texto: "Cada uno dé como propuso en su corazón, porque Dios ama al dador alegre.", formas: ["como propuso", "propuso en su corazon", "dador alegre", "con alegria", "alegre*", "de corazon", "en su corazon", "en (mi|tu|nuestro) corazon"] },
                { id: "reconciliacion", peso: 50, texto: "Dios nos dio el ministerio de la reconciliación: somos embajadores en nombre de Cristo.", formas: ["reconcilia*", "embajador*", "en nombre de cristo"] },
              ],
              modelo: "Enseña que cada uno dé como propuso en su corazón, porque Dios ama al dador alegre. Y que Dios nos dio el ministerio de la reconciliación: somos embajadores en nombre de Cristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Las cartas de la prisión
    "n4-epistolas-apocalipsis-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuáles son las cuatro cartas de la prisión?", reverso: "Efesios, Filipenses, Colosenses y Filemón.", apoyo: "Las cartas de la prisión son Efesios, Filipenses, Colosenses y Filemón" },
              { frente: "¿Cómo se llama Pablo a sí mismo en estas cartas?", reverso: "Preso en el Señor.", apoyo: "Pablo se llama a sí mismo «preso en el Señor»" },
              { frente: "¿Dónde ubica la tradición estas cartas, y en qué años?", reverso: "En su primera prisión en Roma, hacia los años 60 a 62.", apoyo: "La tradición ubica estas cartas en su primera prisión en Roma, hacia los años 60 a 62" },
              { frente: "Pablo estaba encadenado. ¿Y la Palabra?", reverso: "La Palabra no estaba encadenada.", apoyo: "Pablo estaba encadenado, pero la Palabra no" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué cartas parecen haber viajado juntas, y con quiénes?", reverso: "Efesios, Colosenses y Filemón, con Tíquico y Onésimo.", apoyo: "Efesios, Colosenses y Filemón parecen haber viajado juntas, con Tíquico y Onésimo" },
              { frente: "Además de Roma, ¿qué lugares proponen algunos estudiosos para esta prisión?", reverso: "Éfeso o Cesarea.", apoyo: "algunos estudiosos proponen Éfeso o Cesarea" },
              { frente: "¿Cuál es la carta más breve de Pablo?", reverso: "Filemón.", apoyo: "Filemón es la carta más breve de Pablo" },
              { frente: "¿Cuál es la carta del gozo?", reverso: "Filipenses.", apoyo: "Filipenses es la carta del gozo" },
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
            consigna: "Une cada carta de la prisión con su mensaje.",
            pares: [
              ["Efesios", "La salvación por gracia y la iglesia, cuerpo de Cristo, llamada a la unidad"],
              ["Filipenses", "El gozo y la humildad de Cristo"],
              ["Colosenses", "Cristo es supremo y nada se le debe añadir"],
              ["Filemón", "El evangelio transforma las relaciones"],
            ],
            apoyo: "Las cartas de la prisión son Efesios, Filipenses, Colosenses y Filemón",
            explica: "Efesios presenta la salvación por gracia y la iglesia como cuerpo de Cristo, llamada a la unidad; Filipenses enseña el gozo y la humildad de Cristo; Colosenses afirma que Cristo es supremo; y Filemón muestra cómo el evangelio transforma las relaciones.",
          },
          {
            consigna: "Une cada carta de la prisión con lo que dice de ella la lección.",
            pares: [
              ["Efesios", "Termina con la armadura de Dios"],
              ["Filipenses", "Desde la cárcel: «Regocijaos en el Señor siempre»"],
              ["Colosenses", "Responde a una enseñanza que añadía reglas humanas a Cristo"],
              ["Filemón", "La carta más breve de Pablo"],
            ],
            apoyo: "Filipenses es la carta del gozo",
            explica: "Efesios termina con la armadura de Dios; Filipenses es la carta del gozo, escrita desde la cárcel; Colosenses responde a los que añadían filosofías y reglas humanas a Cristo; y Filemón es la carta más breve de Pablo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña Efesios sobre la salvación.",
            texto: "La salvación es por [[gracia]] y no por obras, pero tiene un [[propósito]]: Dios nos [[creó]] en Cristo para hacer buenas obras.",
            distractores: ["méritos", "precio", "pagó"],
            errores: {
              "méritos": "La salvación es «por gracia», «no por obras».",
              precio: "La salvación tiene un propósito: las buenas obras.",
              "pagó": "Somos «creados en Cristo Jesús para buenas obras».",
            },
            apoyo: "La salvación es «por gracia», «no por obras», pero tiene un propósito: somos «creados en Cristo Jesús para buenas obras»",
            ref: "Efesios 2:8-10",
            explica: "Efesios enseña que la salvación es por gracia, no por obras, pero tiene un propósito: somos creados en Cristo Jesús para buenas obras.",
          },
          {
            consigna: "Completa cómo respondió Pablo a lo que enseñaban en Colosas.",
            texto: "En Colosas circulaba una enseñanza que añadía filosofías y [[reglas]] humanas a Cristo, y Pablo respondió con la [[grandeza]] de Cristo, la [[cabeza]] de la iglesia.",
            distractores: ["oraciones", "pobreza", "sombra"],
            errores: {
              oraciones: "En Colosas circulaba una enseñanza que añadía filosofías y reglas humanas a Cristo.",
              pobreza: "Pablo responde con la grandeza de Cristo.",
              sombra: "Cristo es la cabeza del cuerpo que es la iglesia.",
            },
            apoyo: "En Colosas circulaba una enseñanza que añadía filosofías y reglas humanas a Cristo",
            ref: "Colosenses 1:15-18",
            explica: "En Colosas añadían filosofías y reglas humanas a Cristo. Pablo responde con la grandeza de Cristo: es la imagen del Dios invisible, todo fue creado por medio de él y para él, y él es la cabeza de la iglesia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "Cristo y la iglesia en Colosenses: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios invisible", x: 15, y: 12 },
              { id: "todo", texto: "Todo", x: 85, y: 12 },
              { id: "cristo", texto: "Cristo", x: 50, y: 45 },
              { id: "iglesia", texto: "La iglesia", x: 22, y: 88 },
              { id: "reglas", texto: "Las reglas humanas", x: 78, y: 88 },
            ],
            enlaces: [
              { de: "cristo", a: "dios", relacion: "es la imagen del" },
              { de: "todo", a: "cristo", relacion: "fue creado por medio de" },
              { de: "cristo", a: "iglesia", relacion: "es la cabeza de" },
              { de: "reglas", a: "cristo", relacion: "no se le deben añadir a" },
            ],
            distractores: ["se le añaden a", "se olvida de"],
            apoyo: "Pablo responde con la grandeza de Cristo",
            ref: "Colosenses 1:15-18",
            explica: "Pablo responde con la grandeza de Cristo: es la imagen del Dios invisible, todo fue creado por medio de él y para él, y él es la cabeza de la iglesia. Por eso nada se le debe añadir.",
          },
          {
            consigna: "La salvación y la iglesia en Efesios: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "gracia", texto: "La gracia", x: 15, y: 12 },
              { id: "obras", texto: "Las buenas obras", x: 85, y: 12 },
              { id: "salv", texto: "La salvación", x: 50, y: 40 },
              { id: "iglesia", texto: "La iglesia", x: 50, y: 70 },
              { id: "cristo", texto: "Cristo", x: 15, y: 92 },
              { id: "unidad", texto: "La unidad del Espíritu", x: 85, y: 92 },
            ],
            enlaces: [
              { de: "salv", a: "gracia", relacion: "es por" },
              { de: "salv", a: "obras", relacion: "tiene como propósito" },
              { de: "iglesia", a: "cristo", relacion: "es el cuerpo de" },
              { de: "iglesia", a: "unidad", relacion: "está llamada a guardar" },
            ],
            distractores: ["se gana con", "es lo contrario de"],
            apoyo: "Efesios presenta la salvación por gracia y la iglesia como cuerpo de Cristo, llamada a la unidad",
            ref: "Efesios 2:8-10",
            explica: "La salvación es por gracia, no por obras, pero tiene un propósito: somos creados en Cristo Jesús para buenas obras. La iglesia es el cuerpo de Cristo, llamada a guardar la unidad del Espíritu en el vínculo de la paz.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de tu iglesia te dice: Con lo mal que me va, ya no tengo ánimo para servir con gozo.",
            pregunta: "¿Qué le compartes de Filipenses?",
            opciones: [
              { texto: "Que Pablo, desde la cárcel, escribió: «Regocijaos en el Señor siempre».", bien: true, explica: "Es lo que enseña Filipenses, la carta del gozo: Pablo escribió sus cartas de gozo encadenado." },
              { texto: "Que el gozo solo llega cuando todo va bien, así que espere a que pase la crisis.", explica: "Pablo no esperó a que todo fuera bien: desde la cárcel escribió la carta del gozo." },
              { texto: "Que deje de servir por un tiempo, hasta que sus circunstancias cambien del todo.", explica: "Pablo siguió sirviendo encadenado: una circunstancia difícil puede convertirse en un lugar de servicio." },
              { texto: "Que finja alegría delante de los demás, aunque por dentro no la sienta nunca.", explica: "Filipenses llama a regocijarse en el Señor siempre, como Pablo, que lo escribió desde la cárcel." },
            ],
            apoyo: "Pablo escribió sus cartas de gozo encadenado",
            ref: "Filipenses 4:4",
            explica: "Filipenses es la carta del gozo: desde la cárcel Pablo escribe «Regocijaos en el Señor siempre». Pablo escribió sus cartas de gozo encadenado.",
          },
          {
            caso: "Un compañero del equipo de alabanza te dice: Yo debería ser el líder; no me toca servir en tareas tan pequeñas.",
            pregunta: "¿Qué ejemplo de Filipenses le recuerdas?",
            opciones: [
              { texto: "El de Cristo, que se despojó a sí mismo y tomó forma de siervo.", bien: true, explica: "Es el centro de Filipenses: Cristo «se despojó a sí mismo, tomando forma de siervo»." },
              { texto: "El de los líderes que solo sirven cuando les dan un cargo importante.", explica: "El ejemplo de Filipenses es el de Cristo, que se humilló a sí mismo." },
              { texto: "Ninguno: la humildad es buena, pero no tiene que ver con cómo se sirve.", explica: "Filipenses pone en el centro a Cristo, que tomó forma de siervo: así se sirve." },
              { texto: "El de Pablo, que pedía que lo trataran como el más grande de los apóstoles.", explica: "Filipenses no pone ese ejemplo: en el centro está Cristo, que se humilló a sí mismo." },
            ],
            apoyo: "En el centro está el ejemplo de Cristo",
            ref: "Filipenses 2:5-8",
            explica: "En el centro de Filipenses está el ejemplo de Cristo, que «se despojó a sí mismo, tomando forma de siervo», y «se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El evangelio cambia las relaciones",
            ref: "Filemón 1:15-16",
            titulo: "El regreso de Daniel",
            relato: [
              "Eres pastor asistente. Don Ramón, un hermano de la iglesia, tiene un taller. Hace dos años, Daniel, un joven que trabajaba con él, se apartó de él de mala manera.",
              "Ahora Daniel se convirtió y empezó a venir a la iglesia. Don Ramón no quiere ni saludarlo.",
              "Don Ramón te pide consejo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué carta de Pablo trata un caso parecido?",
                opciones: [
                  { texto: "Filemón, la carta en que Pablo pide recibir a Onésimo como hermano amado.", bien: true, explica: "En Filemón, Pablo pide recibir como hermano amado a Onésimo, que se había apartado de Filemón y se había convertido." },
                  { texto: "Filipenses, la carta del gozo que Pablo escribió estando preso y encadenado.", explica: "Filipenses es la carta del gozo, pero el caso de alguien que se apartó y se convirtió está en Filemón." },
                  { texto: "Colosenses, la carta contra la enseñanza que añadía reglas humanas a Cristo.", explica: "Colosenses responde a los que añadían reglas humanas a Cristo; el caso parecido está en Filemón." },
                  { texto: "Efesios, la carta que termina hablando de la armadura de Dios para la iglesia.", explica: "Efesios termina con la armadura de Dios; el caso parecido está en Filemón." },
                ],
                apoyo: "Le pide a Filemón que reciba a Onésimo, el esclavo que se había apartado de él y se había convertido",
                explica: "Filemón es la carta más breve de Pablo: le pide a Filemón que reciba a Onésimo, que se había apartado de él y se había convertido.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas a don Ramón, con lo que Pablo le pidió a Filemón?",
                opciones: [
                  { texto: "Que reciba a Daniel ya no como el empleado que se fue, sino como hermano amado.", bien: true, explica: "Pablo pide recibir a Onésimo «no ya como esclavo, sino como más que esclavo, como hermano amado»." },
                  { texto: "Que lo deje venir a la iglesia, pero que no le vuelva a dirigir nunca la palabra.", explica: "Pablo pide recibirlo como hermano amado: el evangelio cambia las relaciones." },
                  { texto: "Que le pida al pastor que mande a Daniel a otra iglesia, para no tener que verlo.", explica: "Filemón no lo manda lejos: Pablo le pide que lo reciba como hermano amado." },
                  { texto: "Que lo reciba, pero que le recuerde siempre lo que hizo, para que no lo olvide.", explica: "Pablo pide recibirlo como hermano amado, no como alguien a quien se le cobra el pasado." },
                ],
                apoyo: "El evangelio cambia las relaciones",
                ref: "Filemón 1:15-16",
                explica: "Pablo le pide a Filemón que reciba a Onésimo «no ya como esclavo, sino como más que esclavo, como hermano amado». El evangelio cambia las relaciones.",
              },
              {
                tipo: "explica",
                apoyo: "Filemón muestra cómo el evangelio transforma las relaciones",
                ref: "Filemón 1:15-16",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-3-a6-1",
                  tipo: "corta",
                  pregunta: "Escríbele a don Ramón, en pocas palabras, cómo recibir ahora a Daniel, y por qué.",
                  ideas: [
                    { id: "hermano", peso: 40, texto: "Daniel se convirtió: ahora es su hermano amado.", formas: ["hermano amado", "hermano", "hermanos", "se convirtio", "convertido", "en cristo"] },
                    { id: "cambia", peso: 40, texto: "El evangelio cambia las relaciones.", formas: ["cambia las relaciones", "cambia la relacion", "cambia (su|tu|nuestra) relacion", "transforma las relaciones", "transforma la relacion", "evangelio cambia", "evangelio transforma", "cambia todo"] },
                    { id: "filemon", peso: 20, texto: "Así se lo pidió Pablo a Filemón con Onésimo.", formas: ["filemon", "onesimo"] },
                  ],
                  modelo: "Don Ramón, reciba a Daniel ya no como el empleado que se fue, sino como un hermano amado, como Pablo le pidió a Filemón con Onésimo. Daniel se convirtió, y el evangelio cambia las relaciones.",
                },
              },
            ],
          },
          {
            apoyo: "Pablo escribió sus cartas de gozo encadenado",
            ref: "Filipenses 4:4",
            titulo: "Servir desde el hospital",
            relato: [
              "Eres líder de un grupo de oración. Tuviste un accidente y vas a pasar varias semanas en el hospital.",
              "Te sientes inútil, porque ya no puedes ir a las reuniones ni visitar a los hermanos.",
              "Un hermano del grupo viene a verte y te cuenta que el grupo discute por quién debe dirigir mientras no estás.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te enseña Filipenses para este tiempo en el hospital?",
                opciones: [
                  { texto: "Que Pablo escribió la carta del gozo encadenado: la Palabra no estaba presa.", bien: true, explica: "Cuatro cartas salieron de una prisión: Pablo estaba encadenado, pero la Palabra no. Desde allí escribió la carta del gozo." },
                  { texto: "Que el gozo depende de las circunstancias, y que ahora no te toca sentirlo.", explica: "Pablo escribió sus cartas de gozo encadenado: el gozo de Filipenses es en el Señor, siempre." },
                  { texto: "Que un líder que no puede ir a las reuniones ya no tiene ninguna forma de servir.", explica: "Pablo sirvió desde la cárcel: una circunstancia difícil puede convertirse en un lugar de servicio." },
                  { texto: "Que Dios te apartó del servicio, y que solo podrás volver a servir cuando sanes.", explica: "Pablo estaba encadenado, pero siguió sirviendo: la Palabra no estaba encadenada." },
                ],
                apoyo: "Pablo estaba encadenado, pero la Palabra no",
                explica: "Cuatro cartas del Nuevo Testamento salieron de una prisión: Pablo estaba encadenado, pero la Palabra no. Filipenses, la carta del gozo, la escribió desde la cárcel.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le recomiendas enseñar al grupo que discute por quién debe dirigir?",
                opciones: [
                  { texto: "El ejemplo de Cristo, que se humilló a sí mismo y tomó forma de siervo.", bien: true, explica: "En el centro de Filipenses está el ejemplo de Cristo, que se despojó a sí mismo, tomando forma de siervo." },
                  { texto: "Que cada uno defienda su derecho a dirigir, porque se merece ese lugar.", explica: "Filipenses enseña la humildad de Cristo, que se humilló a sí mismo." },
                  { texto: "Que se dividan en dos grupos, para que cada grupo tenga su propio líder.", explica: "La iglesia está llamada a guardar la unidad del Espíritu en el vínculo de la paz." },
                  { texto: "Que el más capaz se imponga, aunque los demás se sientan humillados por él.", explica: "El ejemplo de Filipenses es el de Cristo, que tomó forma de siervo." },
                ],
                apoyo: "Filipenses enseña el gozo y la humildad de Cristo",
                ref: "Filipenses 2:5-8",
                explica: "En el centro de Filipenses está el ejemplo de Cristo, que se despojó a sí mismo, tomando forma de siervo, y se humilló a sí mismo.",
              },
              {
                tipo: "explica",
                apoyo: "Pablo escribió sus cartas de gozo encadenado",
                ref: "Filipenses 4:4",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-3-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué te enseña Filipenses para vivir este tiempo en el hospital, y cómo puedes servir desde allí?",
                  ideas: [
                    { id: "gozo", peso: 40, texto: "Pablo escribió sus cartas de gozo encadenado: puedo regocijarme en el Señor siempre.", formas: ["gozo", "regocij*", "alegri*", "alegre*", "gozos*"] },
                    { id: "encadenado", peso: 30, texto: "Pablo estaba encadenado, pero la Palabra no.", formas: ["encaden*", "carcel", "preso", "prision", "palabra no"] },
                    { id: "servir", peso: 30, texto: "Una circunstancia difícil puede convertirse en un lugar de servicio.", formas: ["orar", "orando", "oracion", "animar*", "animando", "compart*", "aconsej*", "escribi*", "visit*", "testimoni*", "llam*", "lugar de servicio", "desde aqui", "desde la cama"] },
                  ],
                  modelo: "Filipenses me enseña que Pablo escribió sus cartas de gozo encadenado, y la Palabra no estaba presa. Aquí también puedo regocijarme en el Señor siempre, y servir orando por los hermanos y animando a los que me visitan.",
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
            apoyo: "Efesios presenta la salvación por gracia y la iglesia como cuerpo de Cristo, llamada a la unidad",
            ref: "Efesios 4:1-3",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñan Efesios y Colosenses sobre Cristo y la iglesia?",
              ideas: [
                { id: "cuerpo", peso: 50, texto: "Efesios presenta la iglesia como el cuerpo de Cristo, llamada a la unidad.", formas: ["cuerpo de cristo", "unidad", "unid*", "vinculo de la paz", "por gracia", "buenas obras", "armadura"] },
                { id: "supremo", peso: 50, texto: "Colosenses afirma que Cristo es supremo y que nada se le debe añadir.", formas: ["supremo", "suprem*", "nada se le anade", "nada se le debe anadir", "no se le anade nada", "no se le debe anadir", "sin anadir*", "grandeza", "cabeza", "imagen del dios invisible", "todo fue creado", "por medio de el"] },
              ],
              modelo: "Efesios presenta la salvación por gracia y a la iglesia como el cuerpo de Cristo, llamada a guardar la unidad del Espíritu. Colosenses afirma que Cristo es supremo, la cabeza de la iglesia, y que nada se le debe añadir.",
            },
          },
          {
            apoyo: "Colosenses afirma que Cristo es supremo y que nada se le debe añadir",
            ref: "Colosenses 1:15-18",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-3-a7-2",
              tipo: "corta",
              pregunta: "En Colosas añadían filosofías y reglas humanas a Cristo. ¿Qué le responderías hoy a quien enseña eso, con Colosenses, y qué le pedirías a la iglesia, con Efesios?",
              ideas: [
                { id: "grandeza", peso: 50, texto: "Cristo es supremo: la imagen del Dios invisible, por quien todo fue creado, la cabeza de la iglesia; nada se le debe añadir.", formas: ["supremo", "suprem*", "grandeza", "cabeza", "imagen del dios invisible", "imagen de dios", "todo fue creado", "creado por medio de el", "nada se le anade", "nada se le debe anadir", "no se le debe anadir", "no se le anade nada", "cristo basta", "cristo es suficiente"] },
                { id: "unidad", peso: 50, texto: "Que ande como es digno de su vocación, guardando la unidad del Espíritu en el vínculo de la paz.", formas: ["unidad", "unid*", "vinculo de la paz", "digno de la vocacion", "como es digno"] },
              ],
              modelo: "Le respondería con Colosenses que Cristo es supremo: es la imagen del Dios invisible y la cabeza de la iglesia, y nada se le debe añadir. Y con Efesios le pediría a la iglesia guardar la unidad del Espíritu en el vínculo de la paz.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Tesalonicenses y las cartas pastorales
    "n4-epistolas-apocalipsis-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En cuánto tiempo fundó Pablo la iglesia de Tesalónica?", reverso: "En pocas semanas, antes de tener que salir de la ciudad.", apoyo: "Pablo fundó la iglesia de Tesalónica en pocas semanas, antes de tener que salir de la ciudad" },
              { frente: "¿Desde dónde escribió Pablo a los tesalonicenses?", reverso: "Desde Corinto, hacia los años 50 y 51.", apoyo: "le escribió desde Corinto hacia los años 50 y 51" },
              { frente: "¿Qué hicieron algunos mientras esperaban la venida del Señor?", reverso: "Dejaron de trabajar.", apoyo: "Algunos dejaron de trabajar esperándola" },
              { frente: "¿Por qué se llaman pastorales 1 y 2 Timoteo y Tito?", reverso: "Porque Pablo instruye a dos colaboradores que dirigían iglesias.", apoyo: "se llaman cartas pastorales porque Pablo instruye a dos colaboradores que dirigían iglesias, en Éfeso y en Creta" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué se habían convertido los creyentes de Tesalónica?", reverso: "De los ídolos a Dios, para servirle y esperar de los cielos a su Hijo.", apoyo: "Aquellos creyentes se habían convertido «de los ídolos a Dios, para servir al Dios vivo y verdadero, y esperar de los cielos a su Hijo»" },
              { frente: "¿Qué hace la esperanza en el creyente, según la lección?", reverso: "No lo hace perezoso, sino fiel.", apoyo: "La esperanza no hace perezosos, sino fieles" },
              { frente: "¿De qué tres temas hablan las cartas pastorales?", reverso: "De la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia.", apoyo: "Hablan de la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia" },
              { frente: "¿Cuál es la última carta de Pablo?", reverso: "2 Timoteo, escrita en su segunda prisión en Roma.", apoyo: "2 Timoteo es la última carta de Pablo, escrita en su segunda prisión en Roma" },
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
            consigna: "Completa lo que pasó en Tesalónica mientras esperaban al Señor.",
            texto: "Las cartas a Tesalónica hablan mucho de la [[venida]] del Señor, y algunos dejaron de [[trabajar]] mientras la esperaban.",
            distractores: ["ley", "orar"],
            errores: {
              ley: "Las dos cartas hablan mucho de la venida del Señor.",
              orar: "Algunos dejaron de trabajar esperando la venida del Señor, y Pablo fue claro: «Si alguno no quiere trabajar, tampoco coma».",
            },
            apoyo: "Las dos cartas hablan mucho de la venida del Señor. Algunos dejaron de trabajar esperándola",
            ref: "2 Tesalonicenses 3:10",
            explica: "Las dos cartas hablan mucho de la venida del Señor. Algunos dejaron de trabajar esperándola, y Pablo fue claro: la esperanza no hace perezosos, sino fieles.",
          },
          {
            consigna: "Completa a qué animan 1 y 2 Tesalonicenses.",
            texto: "1 y 2 Tesalonicenses, de las primeras cartas de Pablo, animan a una iglesia [[nueva]] a esperar al Señor trabajando y viviendo en [[santidad]].",
            distractores: ["rica", "pereza"],
            errores: {
              rica: "Tesalónica era una iglesia nueva: Pablo la fundó en pocas semanas.",
              pereza: "La esperanza no hace perezosos, sino fieles: se espera al Señor viviendo en santidad.",
            },
            apoyo: "1 y 2 Tesalonicenses, de las primeras cartas de Pablo, animan a una iglesia nueva a esperar la venida del Señor trabajando y viviendo en santidad",
            ref: "1 Tesalonicenses 1:9-10",
            explica: "1 y 2 Tesalonicenses, de las primeras cartas de Pablo, animan a una iglesia nueva a esperar la venida del Señor trabajando y viviendo en santidad.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Como el Señor viene pronto, dejé mi trabajo para dedicarme solo a esperarlo.",
            pregunta: "¿Qué le respondes, con lo que enseñan las cartas a Tesalónica?",
            opciones: [
              { texto: "Que Pablo fue claro: si alguno no quiere trabajar, tampoco coma.", bien: true, explica: "Es la respuesta de Pablo a los que dejaron de trabajar: la esperanza no hace perezosos, sino fieles." },
              { texto: "Que hace bien: si el Señor viene pronto, el trabajo ya no tiene ningún sentido.", explica: "Pablo corrigió a los que dejaron de trabajar esperando al Señor: «Si alguno no quiere trabajar, tampoco coma»." },
              { texto: "Que deje de esperar la venida del Señor, porque eso lo está volviendo perezoso.", explica: "La esperanza es buena: los tesalonicenses se convirtieron para servir a Dios y esperar de los cielos a su Hijo. La esperanza no hace perezosos, sino fieles." },
              { texto: "Que espere sin trabajar, pero que les pida a los hermanos que lo mantengan.", explica: "Pablo fue claro: «Si alguno no quiere trabajar, tampoco coma»." },
            ],
            apoyo: "Algunos dejaron de trabajar esperándola, y Pablo fue claro: «Si alguno no quiere trabajar, tampoco coma»",
            ref: "2 Tesalonicenses 3:10",
            explica: "Las dos cartas hablan mucho de la venida del Señor. Algunos dejaron de trabajar esperándola, y Pablo fue claro: la esperanza no hace perezosos, sino fieles.",
          },
          {
            caso: "Una joven del grupo de estudio te dice: Si Jesús viene, ¿para qué estudiar y esforzarme en mi trabajo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la esperanza no hace perezosos, sino fieles: al Señor se le espera trabajando.", bien: true, explica: "Pablo animó a la iglesia nueva de Tesalónica a esperar la venida del Señor trabajando y viviendo en santidad." },
              { texto: "Que tiene razón: esperar al Señor es más espiritual que estudiar o que trabajar bien.", explica: "Pablo corrigió a los que dejaron de trabajar esperando al Señor: la esperanza no hace perezosos, sino fieles." },
              { texto: "Que no piense en la venida del Señor, porque eso solo la distrae de lo que tiene que hacer.", explica: "Los tesalonicenses esperaban de los cielos al Hijo de Dios: la esperanza es buena, y hace fieles." },
              { texto: "Que trabaje solo lo justo, y que el resto del tiempo se quede quieta esperando.", explica: "Pablo fue claro: «Si alguno no quiere trabajar, tampoco coma»." },
            ],
            apoyo: "La esperanza no hace perezosos, sino fieles",
            ref: "1 Tesalonicenses 1:9-10",
            explica: "1 y 2 Tesalonicenses animan a una iglesia nueva a esperar la venida del Señor trabajando y viviendo en santidad: la esperanza no hace perezosos, sino fieles.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de las cartas pastorales con lo que dice la lección.",
            pares: [
              ["Las cartas pastorales", "1 Timoteo, 2 Timoteo y Tito"],
              ["A quiénes van", "A dos colaboradores que dirigían iglesias"],
              ["De qué hablan", "De la sana doctrina, los requisitos de los líderes y el cuidado de la iglesia"],
              ["Su base", "La Escritura, inspirada por Dios"],
              ["Su plan", "La multiplicación de maestros fieles"],
            ],
            apoyo: "Las cartas pastorales, 1 y 2 Timoteo y Tito, enseñan la sana doctrina, los requisitos de los líderes y la multiplicación de maestros fieles, con la Escritura inspirada como base",
            explica: "Se llaman pastorales porque Pablo instruye a dos colaboradores que dirigían iglesias. Hablan de la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia, con la Escritura inspirada como base y el plan de la multiplicación.",
          },
          {
            consigna: "Une cada pasaje de las cartas pastorales con lo que enseña.",
            pares: [
              ["1 Timoteo 4:12", "Pablo anima a Timoteo, que era joven, a ser ejemplo de los creyentes"],
              ["2 Timoteo 2:2", "El plan de la multiplicación: encargar lo aprendido a fieles que enseñen"],
              ["2 Timoteo 3:16-17", "Toda la Escritura es inspirada por Dios y útil para enseñar"],
              ["2 Timoteo 4:7-8", "Pablo se despide: peleó la buena batalla y guardó la fe"],
            ],
            apoyo: "Y le da el plan de la multiplicación",
            explica: "Pablo anima a Timoteo, que era joven, a ser ejemplo (1 Timoteo 4:12); le da el plan de la multiplicación (2 Timoteo 2:2); la base de todo es la Escritura (2 Timoteo 3:16-17); y se despide habiendo guardado la fe (2 Timoteo 4:7-8).",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las cartas pastorales: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las cartas pastorales hablan de la sana doctrina y del cuidado de la iglesia.", verdad: true, explica: "Hablan de la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia.", apoyo: "Hablan de la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia" },
              { texto: "Todos los estudiosos están de acuerdo en quién escribió las cartas pastorales.", verdad: false, explica: "Algunos estudiosos dudan de que Pablo las escribiera, pero las cartas se presentan como suyas y la iglesia antigua las recibió así.", apoyo: "Algunos estudiosos dudan de que Pablo las escribiera" },
              { texto: "Las cartas pastorales se presentan como cartas de Pablo, y la iglesia antigua las recibió así.", verdad: true, explica: "Aunque algunos estudiosos dudan de que Pablo las escribiera, las cartas se presentan como suyas y la iglesia antigua las recibió así.", apoyo: "las cartas se presentan como suyas y la iglesia antigua las recibió así" },
            ],
          },
          {
            consigna: "Sobre el propósito de las cartas pastorales: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo escribió las cartas pastorales a iglesias nuevas que acababa de fundar.", verdad: false, explica: "Se llaman pastorales porque Pablo instruye a dos colaboradores que dirigían iglesias, en Éfeso y en Creta.", apoyo: "se llaman cartas pastorales porque Pablo instruye a dos colaboradores que dirigían iglesias, en Éfeso y en Creta" },
              { texto: "En las cartas pastorales, la base de todo es la Palabra.", verdad: true, explica: "«Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia».", apoyo: "La base de todo es la Palabra", ref: "2 Timoteo 3:16-17" },
              { texto: "Según la tradición, 2 Timoteo fue escrita poco antes de la muerte de Pablo.", verdad: true, explica: "2 Timoteo es la última carta de Pablo, escrita en su segunda prisión en Roma, poco antes de morir en tiempos de Nerón, según la tradición.", apoyo: "2 Timoteo es la última carta de Pablo, escrita en su segunda prisión en Roma, poco antes de morir en tiempos de Nerón, según la tradición" },
              { texto: "2 Timoteo es una de las primeras cartas de Pablo.", verdad: false, explica: "2 Timoteo es la última carta de Pablo; 1 y 2 Tesalonicenses son de sus primeras cartas.", apoyo: "2 Timoteo es la última carta de Pablo" },
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
            apoyo: "El líder que termina bien es el que guardó la fe y formó a otros",
            ref: "1 Timoteo 4:12; 2 Timoteo 2:2",
            situacion: "Tienes 24 años y te acaban de encargar el ministerio de jóvenes de tu iglesia, como a Timoteo.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión, un hermano mayor comenta que eres demasiado joven para dirigir.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Procuras ser ejemplo en palabra, conducta, amor, espíritu, fe y pureza.", valor: 2, explica: "Pablo anima a Timoteo, que era joven: «sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza»." },
                  { texto: "Le respondes con calma que tu pastor te eligió, y sigues con la reunión.", valor: 1, explica: "Responder con calma está bien, pero lo que Pablo le pide a Timoteo es ser ejemplo de los creyentes." },
                  { texto: "Le dices que los mayores ya no entienden a los jóvenes, y que mejor no opine.", valor: 0, explica: "Así no se responde: Pablo le pide a Timoteo que sea ejemplo de los creyentes en palabra y conducta." },
                ],
              },
              {
                id: "e2",
                narra: "Un joven del grupo empieza a enseñar ideas que no están de acuerdo con la Biblia.",
                pregunta: "¿En qué te apoyas para corregirlo?",
                opciones: [
                  { texto: "En la Escritura, que es útil para enseñar, para redargüir y para corregir.", valor: 2, explica: "La base de todo es la Palabra: «Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia»." },
                  { texto: "En tu experiencia, y después le muestras algún versículo que te parezca útil.", valor: 1, explica: "La experiencia ayuda, pero la base de todo es la Palabra." },
                  { texto: "En tu autoridad de líder: le prohíbes hablar, sin explicarle nada de la Biblia.", valor: 0, explica: "Las cartas pastorales enseñan la sana doctrina con la Escritura inspirada como base." },
                ],
              },
              {
                id: "e3",
                narra: "Tienes tanto trabajo que no te alcanza el tiempo, y todo depende de ti.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Encargas lo que aprendiste a fieles que puedan enseñar también a otros.", valor: 2, explica: "Es el plan de la multiplicación: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros»." },
                  { texto: "Buscas ayudantes para las tareas, aunque no les enseñas lo que sabes.", valor: 1, explica: "Repartir tareas ayuda, pero el plan de Pablo es formar maestros fieles que enseñen también a otros." },
                  { texto: "Lo sigues haciendo todo tú, porque nadie lo va a hacer tan bien como tú.", valor: 0, explica: "El líder que termina bien es el que guardó la fe y formó a otros." },
                ],
              },
            ],
          },
          {
            apoyo: "Las cartas pastorales, 1 y 2 Timoteo y Tito, enseñan la sana doctrina, los requisitos de los líderes y la multiplicación de maestros fieles, con la Escritura inspirada como base",
            ref: "2 Timoteo 3:16-17",
            situacion: "Eres pastor asistente. Tu pastor te pide que formes a un grupo de nuevos maestros para la escuela dominical.",
            escenas: [
              {
                id: "e1",
                narra: "Preparas la primera clase y piensas qué base darles.",
                pregunta: "¿Qué pones como base de la clase?",
                opciones: [
                  { texto: "La Escritura, inspirada por Dios y útil para enseñar y para corregir.", valor: 2, explica: "La base de todo es la Palabra: «Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia»." },
                  { texto: "Los mejores libros de enseñanza que conoces, con algunos versículos.", valor: 1, explica: "Los buenos libros ayudan, pero en las cartas pastorales la base de todo es la Palabra." },
                  { texto: "Tus propias ideas, porque los alumnos confían en todo lo que tú les dices.", valor: 0, explica: "Las cartas pastorales enseñan la sana doctrina, con la Escritura inspirada como base." },
                ],
              },
              {
                id: "e2",
                narra: "Al terminar el curso, uno de los nuevos maestros te pregunta qué debe hacer con lo que aprendió.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que lo encargue a otros fieles que puedan enseñar también a otros.", valor: 2, explica: "Es el plan de la multiplicación que Pablo le da a Timoteo: encargar lo aprendido a fieles que sean idóneos para enseñar también a otros." },
                  { texto: "Que lo guarde bien en su cuaderno, para repasarlo cada semana.", valor: 1, explica: "Repasar ayuda, pero el plan de Pablo es la multiplicación de maestros fieles." },
                  { texto: "Que no lo comparta todavía, porque enseñar a otros es solo para el pastor.", valor: 0, explica: "El plan de la multiplicación es enseñar a fieles que enseñen también a otros." },
                ],
              },
              {
                id: "e3",
                narra: "Tu pastor, ya mayor, te dice que quiere terminar bien su ministerio.",
                pregunta: "¿Qué le recuerdas de 2 Timoteo?",
                opciones: [
                  { texto: "Que Pablo se despidió habiendo guardado la fe y formado a otros.", valor: 2, explica: "El líder que termina bien es el que guardó la fe y formó a otros: «He peleado la buena batalla, he acabado la carrera, he guardado la fe»." },
                  { texto: "Que Pablo trabajó mucho hasta el final, sin decirle nada de guardar la fe.", valor: 1, explica: "Falta lo principal: Pablo se despide diciendo que guardó la fe, y el líder que termina bien es el que guardó la fe y formó a otros." },
                  { texto: "Que lo importante es que la gente recuerde todo lo que él logró en su vida.", valor: 0, explica: "El líder que termina bien es el que guardó la fe y formó a otros." },
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
            apoyo: "El líder que termina bien es el que guardó la fe y formó a otros",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-4-a7-1",
              tipo: "corta",
              pregunta: "Según la lección, ¿cómo es el líder que termina bien, y qué plan le dio Pablo a Timoteo para eso?",
              ideas: [
                { id: "fe", peso: 50, texto: "El que guardó la fe, como Pablo al despedirse.", formas: ["guard* la fe", "fiel hasta el final", "acabado la carrera", "acabo la carrera", "buena batalla", "fiel a la fe"] },
                { id: "formar", peso: 50, texto: "El que formó a otros: encargar lo aprendido a fieles que sean idóneos para enseñar también a otros.", formas: ["form* a otros", "encarg*", "ensen* a otros", "ensen* tambien a otros", "multiplic*", "fieles que", "hombres fieles", "discipul*"] },
              ],
              modelo: "El líder que termina bien es el que guardó la fe y formó a otros. Pablo le dio a Timoteo el plan de la multiplicación: encargar lo aprendido a fieles que sean idóneos para enseñar también a otros.",
            },
          },
          {
            apoyo: "Pablo anima a Timoteo, que era joven",
            ref: "1 Timoteo 4:12; 2 Timoteo 3:16-17",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-4-a7-2",
              tipo: "corta",
              pregunta: "Eres un líder joven, como Timoteo. ¿Qué te pide Pablo en 1 Timoteo 4:12, y cuál es la base de tu ministerio según 2 Timoteo 3:16?",
              ideas: [
                { id: "ejemplo", peso: 50, texto: "Ser ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.", formas: ["ejemplo", "conducta", "pureza"] },
                { id: "escritura", peso: 50, texto: "La base es la Escritura, inspirada por Dios y útil para enseñar, redargüir, corregir e instruir en justicia.", formas: ["escritura*", "la palabra de dios", "la biblia", "inspirada", "util para ensenar", "redarguir", "corregir", "instruir en justicia"] },
              ],
              modelo: "Pablo me pide ser ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza, aunque sea joven. Y la base de mi ministerio es la Escritura, inspirada por Dios y útil para enseñar, redargüir, corregir e instruir en justicia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Hebreos y las cartas generales
    "n4-epistolas-apocalipsis-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas cartas vienen después de las de Pablo, escritas por otros?", reverso: "Ocho: Hebreos, Santiago, dos de Pedro, tres de Juan y Judas.", apoyo: "Después de las cartas de Pablo vienen ocho cartas escritas por otros" },
              { frente: "¿Quién escribió la carta a los Hebreos?", reverso: "La carta no lo dice; ya Orígenes reconoció que solo Dios sabe quién fue.", apoyo: "Hebreos no dice quién la escribió" },
              { frente: "¿A quiénes muestra Hebreos que Cristo es superior?", reverso: "A los ángeles, a Moisés y al sacerdocio de Aarón.", apoyo: "muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón" },
              { frente: "¿Qué abre el sacrificio de Cristo, según Hebreos?", reverso: "Un nuevo pacto.", apoyo: "su sacrificio abre un nuevo pacto" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En quiénes se ha pensado como autor de Hebreos?", reverso: "En Pablo, en Apolos o en Bernabé.", apoyo: "Se ha pensado en Pablo, en Apolos o en Bernabé" },
              { frente: "¿A quiénes parece dirigida la carta a los Hebreos?", reverso: "A creyentes de origen judío.", apoyo: "La carta, que parece dirigida a creyentes de origen judío" },
              { frente: "¿Qué es el capítulo 11 de Hebreos?", reverso: "La gran galería de la fe.", apoyo: "El capítulo 11 es la gran galería de la fe" },
              { frente: "¿Qué les advierte Hebreos a sus lectores?", reverso: "Que no vuelvan atrás.", apoyo: "Por eso les advierte que no vuelvan atrás" },
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
            consigna: "Completa el tema de la carta a los Hebreos.",
            texto: "La carta a los Hebreos parece dirigida a creyentes de origen [[judío]], y muestra que Cristo es [[superior]] a todo lo anterior y que su sacrificio abre un nuevo [[pacto]].",
            distractores: ["romano", "igual", "templo"],
            errores: {
              romano: "La carta parece dirigida a creyentes de origen judío.",
              igual: "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón.",
              templo: "El sacrificio de Cristo abre un nuevo pacto.",
            },
            apoyo: "Hebreos, de autor desconocido, muestra que Cristo es superior a todo lo anterior y que su sacrificio abre un nuevo pacto",
            ref: "Hebreos 1:1-2",
            explica: "La carta, que parece dirigida a creyentes de origen judío, muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón, y que su sacrificio abre un nuevo pacto.",
          },
          {
            consigna: "Completa cómo empieza Hebreos su gran tema.",
            texto: "Hebreos empieza con su gran [[tema]]: el Dios que antes habló por los [[profetas]] ahora nos habla por medio de su [[Hijo]].",
            distractores: ["final", "reyes", "templo"],
            errores: {
              final: "Hebreos empieza con su gran tema.",
              reyes: "Antes, Dios habló muchas veces y de muchas maneras por los profetas.",
              templo: "En estos postreros días, Dios nos ha hablado por el Hijo.",
            },
            apoyo: "Empieza con su gran tema: Dios, que habló «muchas veces y de muchas maneras» por los profetas, «en estos postreros días nos ha hablado por el Hijo»",
            ref: "Hebreos 1:1-2",
            explica: "Hebreos empieza con su gran tema: Dios, que habló muchas veces y de muchas maneras por los profetas, en estos postreros días nos ha hablado por el Hijo. Cristo es mejor.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la carta a los Hebreos tiene un error. Tócala.",
            frases: [
              "Hebreos no dice quién la escribió.",
              "Parece dirigida a creyentes de origen judío.",
              "Muestra que Moisés es superior a Cristo.",
              "Enseña que el sacrificio de Cristo abre un nuevo pacto.",
            ],
            malo: 2,
            correccion: "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón.",
            apoyo: "muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón",
            explica: "Hebreos, de autor desconocido, muestra que Cristo es superior a todo lo anterior: a los ángeles, a Moisés y al sacerdocio de Aarón.",
          },
          {
            consigna: "Una de estas frases sobre el gran tema de Hebreos tiene un error. Tócala.",
            frases: [
              "Hebreos empieza diciendo que Dios nos ha hablado por el Hijo.",
              "Muestra que Cristo es superior al sacerdocio de Aarón.",
              "Enseña que el sacrificio de Cristo deja todo igual que antes.",
              "Por eso advierte a sus lectores que no vuelvan atrás.",
            ],
            malo: 2,
            correccion: "El sacrificio de Cristo abre un nuevo pacto.",
            apoyo: "su sacrificio abre un nuevo pacto",
            ref: "Hebreos 1:1-2",
            explica: "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón, y que su sacrificio abre un nuevo pacto. Por eso advierte que no vuelvan atrás.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Santiago enseña que la fe verdadera se muestra con obras, en armonía con Pablo",
            ref: "Santiago 2:17-18",
            titulo: "¿Pablo contra Santiago?",
            relato: [
              "Eres maestro de la escuela dominical de adultos. En la clase, dos hermanos discuten.",
              "Uno dice que Pablo enseña que no somos justificados por obras. El otro lee en Santiago que la fe, si no tiene obras, es muerta.",
              "Los dos te preguntan quién tiene la razón, y si la Biblia se contradice.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué les dices primero?",
                opciones: [
                  { texto: "Que Santiago no contradice a Pablo: los dos enseñan en armonía.", bien: true, explica: "Santiago no contradice a Pablo: enseña que la fe verdadera se muestra con obras, en armonía con Pablo." },
                  { texto: "Que Santiago contradice a Pablo, y que cada uno debe escoger a uno.", explica: "La lección es clara: Santiago no contradice a Pablo." },
                  { texto: "Que Santiago no es Escritura, porque Lutero tuvo dudas sobre ella.", explica: "Lutero tuvo dudas sobre esta carta, pero la iglesia la recibió como parte de la Escritura." },
                  { texto: "Que Pablo cambió de idea después de leer la carta de Santiago.", explica: "No hace falta: Santiago no contradice a Pablo, y los dos enseñan en armonía." },
                ],
                apoyo: "No contradice a Pablo",
                explica: "Santiago no contradice a Pablo. Lutero tuvo dudas sobre esta carta, pero la iglesia la recibió como parte de la Escritura.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo les explicas lo que enseña cada uno?",
                opciones: [
                  { texto: "Pablo: las obras no son la base de la justificación. Santiago: la fe verdadera se muestra con obras.", bien: true, explica: "Pablo enseña que las obras no son la base de la justificación; Santiago enseña que la fe verdadera se muestra con obras." },
                  { texto: "Pablo: las obras son la base de la justificación. Santiago: la fe verdadera no necesita mostrarse en nada.", explica: "Es al revés: para Pablo las obras no son la base de la justificación, y para Santiago la fe verdadera se muestra con obras." },
                  { texto: "Pablo: la fe sola no alcanza para la justificación. Santiago: son las obras las que nos justifican siempre.", explica: "Pablo enseña que las obras no son la base de la justificación; Santiago, que la fe verdadera se muestra con obras." },
                  { texto: "Pablo: basta con decir que uno cree, aunque no viva distinto. Santiago: la fe es solo un sentimiento.", explica: "Santiago lo dice así: «yo te mostraré mi fe por mis obras». La fe verdadera se muestra con obras." },
                ],
                apoyo: "Pablo enseña que las obras no son la base de la justificación; Santiago enseña que la fe verdadera se muestra con obras",
                ref: "Santiago 2:17-18",
                explica: "Pablo enseña que las obras no son la base de la justificación; Santiago enseña que la fe verdadera se muestra con obras: «yo te mostraré mi fe por mis obras».",
              },
              {
                tipo: "explica",
                apoyo: "Santiago enseña que la fe verdadera se muestra con obras, en armonía con Pablo",
                ref: "Santiago 2:17-18",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-5-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras cómo armonizas lo que enseñan Pablo y Santiago sobre la fe y las obras.",
                  ideas: [
                    { id: "armonia", peso: 20, texto: "No se contradicen: están en armonía.", formas: ["armoni*", "no se contradic*", "no (lo|le|la) contradic*", "no contradic*", "no hay contradiccion", "de acuerdo", "complement*", "no se oponen"] },
                    { id: "pablo", peso: 40, texto: "Pablo enseña que las obras no son la base de la justificación.", formas: ["obras no son la base", "no son la base", "no somos justificados por obras", "no somos justificados por las obras", "no por obras", "no por las obras", "base de la justificacion", "no nos justifican", "no nos salvan", "no salvan"] },
                    { id: "santiago", peso: 40, texto: "Santiago enseña que la fe verdadera se muestra con obras.", formas: ["se muestra con obras", "se muestra con las obras", "muestr* (la|su|mi|tu) fe", "fe verdadera", "fe viva", "fe sin obras", "fe muerta", "es muerta", "si no tiene obras", "se nota"] },
                  ],
                  errores: [
                    { id: "obras-base", texto: "Pablo enseña que las obras no son la base de la justificación.", formas: ["obras son la base", "obras nos justifican", "obras nos salvan", "salv* por obras", "salv* por las obras", "justificad* por obras", "justificad* por las obras"], anula: "pablo" },
                    { id: "contradice", texto: "Santiago no contradice a Pablo.", formas: ["si se contradic*", "se contradicen", "santiago contradice", "pablo contradice"], anula: "armonia" },
                  ],
                  modelo: "Pablo y Santiago no se contradicen. Pablo enseña que las obras no son la base de la justificación, y Santiago enseña que la fe verdadera se muestra con obras: la fe que salva se nota en la vida.",
                },
              },
            ],
          },
          {
            apoyo: "La fe que salva es la misma que se nota en la vida",
            ref: "Santiago 2:17-18",
            titulo: "Creer sin que se note",
            relato: [
              "Eres líder de una célula. Un joven dice que cree en Cristo, pero en su casa y en su trabajo nadie lo nota.",
              "Cuando le hablas de cambiar, te responde: Pablo dice que no me salvo por obras; entonces no importa cómo vivo.",
              "Quieres ayudarlo con lo que enseñan Pablo y Santiago.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué parte de lo que dice el joven es correcta, según la lección?",
                opciones: [
                  { texto: "Que las obras no son la base de la justificación: eso enseña Pablo.", bien: true, explica: "Es verdad que Pablo enseña que las obras no son la base de la justificación; lo que no es verdad es que por eso no importe cómo vive." },
                  { texto: "Que no importa cómo vive, y que Santiago también está de acuerdo con eso.", explica: "Santiago enseña lo contrario: la fe verdadera se muestra con obras." },
                  { texto: "Que Pablo y Santiago enseñan cosas opuestas, y que él puede escoger a Pablo.", explica: "Santiago no contradice a Pablo: los dos enseñan en armonía." },
                  { texto: "Ninguna: Pablo enseña que somos salvos por obras, igual que Santiago.", explica: "Pablo enseña que las obras no son la base de la justificación." },
                ],
                apoyo: "Pablo enseña que las obras no son la base de la justificación",
                explica: "Pablo enseña que las obras no son la base de la justificación; Santiago enseña que la fe verdadera se muestra con obras.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestras de la carta de Santiago?",
                opciones: [
                  { texto: "Que la fe verdadera se muestra con obras: la fe sin obras es muerta.", bien: true, explica: "Santiago escribe: «la fe, si no tiene obras, es muerta en sí misma», y «yo te mostraré mi fe por mis obras»." },
                  { texto: "Que las obras son la base de la justificación, y no la fe en Cristo.", explica: "Santiago no contradice a Pablo: las obras no son la base de la justificación, pero la fe verdadera se muestra con obras." },
                  { texto: "Que la fe es algo privado, y que por eso no tiene por qué notarse afuera.", explica: "Santiago enseña que la fe verdadera se muestra con obras: la fe que salva se nota en la vida." },
                  { texto: "Que Santiago no cuenta, porque Lutero tuvo dudas sobre su carta.", explica: "Lutero tuvo dudas sobre esta carta, pero la iglesia la recibió como parte de la Escritura." },
                ],
                apoyo: "Santiago enseña que la fe verdadera se muestra con obras",
                ref: "Santiago 2:17-18",
                explica: "Santiago escribe una carta muy práctica: «la fe, si no tiene obras, es muerta en sí misma». La fe verdadera se muestra con obras.",
              },
              {
                tipo: "explica",
                apoyo: "La fe que salva es la misma que se nota en la vida",
                ref: "Santiago 2:18",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-5-a4-2",
                  tipo: "corta",
                  pregunta: "Explícale al joven, en pocas palabras, por qué sí importa cómo vive, aunque no se salve por obras.",
                  ideas: [
                    { id: "nota", peso: 50, texto: "La fe que salva es la misma que se nota en la vida.", formas: ["se nota", "notar*", "en la vida", "en (tu|su|mi|nuestra) vida", "se ve", "se ven", "se vea", "se ver", "verse", "visible", "en (tu|su) casa"] },
                    { id: "muestra", peso: 50, texto: "La fe verdadera se muestra con obras: la fe sin obras es muerta.", formas: ["muestr*", "fe sin obras", "fe muerta", "es muerta", "muerta", "fe verdadera", "fe viva", "por (mis|tus|sus|las) obras"] },
                  ],
                  modelo: "Porque la fe que salva es la misma que se nota en la vida. No te salvas por tus obras, pero la fe verdadera se muestra con obras: si tu fe no tiene obras, es una fe muerta.",
                },
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
            consigna: "¿Qué dice Santiago de la fe que no tiene obras? Toca la palabra que lo dice.",
            texto: "la fe, si no tiene obras, es [[muerta]] en sí misma",
            apoyo: "Santiago, que la tradición identifica con el hermano del Señor, escribe una carta muy práctica",
            ref: "Santiago 2:17",
            explica: "Santiago escribe una carta muy práctica: «la fe, si no tiene obras, es muerta en sí misma». No contradice a Pablo: enseña que la fe verdadera se muestra con obras.",
          },
          {
            consigna: "¿Por medio de qué muestra Santiago su fe? Toca las palabras que lo dicen.",
            texto: "yo te mostraré mi fe por [[mis obras]]",
            apoyo: "Santiago enseña que la fe verdadera se muestra con obras",
            ref: "Santiago 2:18",
            explica: "Santiago enseña que la fe verdadera se muestra con obras: «yo te mostraré mi fe por mis obras». Y Pablo enseña que las obras no son la base de la justificación.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué carta lo enseña: 1 Pedro, 2 Pedro y Judas, o las cartas de Juan? Lleva cada frase a su grupo.",
            grupos: ["1 Pedro", "2 Pedro y Judas", "Las cartas de Juan"],
            frases: [
              { texto: "Anima a creyentes que sufrían", grupo: 0 },
              { texto: "Dios nos hizo renacer para una esperanza viva", grupo: 0 },
              { texto: "La esperanza viva viene por la resurrección de Jesucristo", grupo: 0 },
              { texto: "Advierten contra los falsos maestros", grupo: 1 },
              { texto: "Hay que contender por la fe dada una vez a los santos", grupo: 1 },
              { texto: "Enseñan el amor, la verdad y la seguridad", grupo: 2 },
              { texto: "Se escribieron para que sepamos que tenemos vida eterna", grupo: 2 },
            ],
            apoyo: "Pedro anima en el sufrimiento con una esperanza viva, Juan enseña el amor y la seguridad de la vida eterna, y Judas y 2 Pedro llaman a defender la fe ante los falsos maestros",
            ref: "1 Pedro 1:3; 1 Juan 5:13; Judas 1:3",
            explica: "1 Pedro anima a los que sufren con una esperanza viva; 2 Pedro y Judas advierten contra los falsos maestros; y las cartas de Juan enseñan el amor, la verdad y la seguridad de la vida eterna.",
          },
          {
            consigna: "¿Qué carta le ayuda a cada uno: 1 Pedro, 2 Pedro y Judas, o las cartas de Juan? Lleva cada frase a su grupo.",
            grupos: ["1 Pedro", "2 Pedro y Judas", "Las cartas de Juan"],
            frases: [
              { texto: "Una familia sufre burlas y pérdidas por su fe", grupo: 0 },
              { texto: "Un joven que sufre necesita una esperanza viva", grupo: 0 },
              { texto: "Llega un maestro que cambia la fe dada una vez a los santos", grupo: 1 },
              { texto: "La iglesia debe defender la fe ante un falso maestro", grupo: 1 },
              { texto: "Una hermana duda de si tiene vida eterna", grupo: 2 },
              { texto: "Un grupo necesita aprender el amor y la verdad", grupo: 2 },
              { texto: "Un creyente nuevo quiere estar seguro de su vida eterna", grupo: 2 },
            ],
            apoyo: "1 Pedro anima a creyentes que sufrían",
            ref: "1 Pedro 1:3; 1 Juan 5:13; Judas 1:3",
            explica: "1 Pedro anima a los que sufren con una esperanza viva; 2 Pedro y Judas llaman a defender la fe ante los falsos maestros; y las cartas de Juan enseñan el amor, la verdad y la seguridad de la vida eterna.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pedro anima en el sufrimiento con una esperanza viva, Juan enseña el amor y la seguridad de la vida eterna, y Judas y 2 Pedro llaman a defender la fe ante los falsos maestros",
            ref: "1 Pedro 1:3; 1 Juan 5:13; Judas 1:3",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué mensaje tienen las cartas de Pedro, las de Juan y la de Judas?",
              ideas: [
                { id: "pedro", peso: 34, texto: "1 Pedro anima a los que sufren con una esperanza viva, por la resurrección de Jesucristo.", formas: ["esperanza viva", "esperanza", "sufr*", "renacer", "resurreccion"] },
                { id: "juan", peso: 33, texto: "Las cartas de Juan enseñan el amor, la verdad y la seguridad de la vida eterna.", formas: ["amor", "verdad", "seguridad", "vida eterna", "seguros"] },
                { id: "judas", peso: 33, texto: "Judas y 2 Pedro llaman a defender la fe ante los falsos maestros.", formas: ["falsos maestros", "falso* maestro*", "defend* la fe", "contend*", "advierten", "advierte"] },
              ],
              modelo: "1 Pedro anima a los creyentes que sufren con una esperanza viva, por la resurrección de Jesucristo. Las cartas de Juan enseñan el amor, la verdad y la seguridad de la vida eterna. Judas y 2 Pedro llaman a defender la fe ante los falsos maestros.",
            },
          },
          {
            apoyo: "Y las cartas de Juan enseñan el amor, la verdad y la seguridad: «para que sepáis que tenéis vida eterna»",
            ref: "1 Pedro 1:3; 1 Juan 5:13; Judas 1:3",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-5-a7-2",
              tipo: "corta",
              pregunta: "Una iglesia sufre, algunos dudan de su salvación y llegan falsos maestros. ¿Qué carta les ayuda en cada cosa, y qué les dice?",
              ideas: [
                { id: "pedro", peso: 34, texto: "Para el sufrimiento, 1 Pedro: Dios nos hizo renacer para una esperanza viva.", formas: ["1 pedro", "primera de pedro", "primera carta de pedro", "esperanza viva", "renacer", "resurreccion"] },
                { id: "juan", peso: 33, texto: "Para la duda, las cartas de Juan: se escribieron para que sepamos que tenemos vida eterna.", formas: ["juan", "vida eterna", "seguridad", "sepamos", "sepan", "sepais"] },
                { id: "judas", peso: 33, texto: "Ante los falsos maestros, Judas y 2 Pedro: hay que contender por la fe dada una vez a los santos.", formas: ["judas", "2 pedro", "segunda de pedro", "segunda carta de pedro", "contend*", "defend* la fe", "una vez dada"] },
              ],
              modelo: "Para el sufrimiento, 1 Pedro: Dios nos hizo renacer para una esperanza viva. Para la duda, las cartas de Juan: se escribieron para que sepamos que tenemos vida eterna. Ante los falsos maestros, Judas y 2 Pedro: hay que contender por la fe.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. El Apocalipsis
    "n4-epistolas-apocalipsis-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo se presenta el Apocalipsis en su primer versículo?", reverso: "Como la revelación de Jesucristo, dada a su siervo Juan.", apoyo: "Es «La revelación de Jesucristo», dada «a su siervo Juan»" },
              { frente: "¿Dónde estaba Juan cuando recibió la revelación?", reverso: "Desterrado en la isla de Patmos, por causa de la palabra de Dios.", apoyo: "que estaba desterrado «en la isla llamada Patmos, por causa de la palabra de Dios y el testimonio de Jesucristo»" },
              { frente: "¿Qué tres cosas es el Apocalipsis a la vez?", reverso: "Profecía, carta a siete iglesias y apocalipsis.", apoyo: "Es a la vez profecía, carta a siete iglesias y apocalipsis, un mensaje en visiones y símbolos" },
              { frente: "¿Qué promete el libro a quien lo lee, y con qué oración termina?", reverso: "Una bendición, y termina pidiendo que Jesús venga.", apoyo: "Pero empieza con una bendición para quien lo lee y termina con una oración: que Jesús venga" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Hacia qué año fecha el libro la mayoría de los estudiosos?", reverso: "Hacia el año 95, en tiempos de Domiciano; otros, antes del año 70.", apoyo: "La mayoría de los estudiosos lo fecha hacia el año 95, en tiempos del emperador Domiciano, como dijo Ireneo; otros lo ubican antes del año 70" },
              { frente: "¿Qué es un apocalipsis, como forma de escribir?", reverso: "Un mensaje en visiones y símbolos.", apoyo: "un mensaje en visiones y símbolos" },
              { frente: "¿Con quién empieza todo en el Apocalipsis?", reverso: "Con Cristo: la visión de Cristo glorificado.", apoyo: "Todo empieza con Cristo" },
              { frente: "¿Qué oyó Juan cuando cayó como muerto a los pies de Cristo?", reverso: "Que no temiera: Cristo es el primero y el último, y tiene las llaves de la muerte.", apoyo: "Juan cayó «como muerto a sus pies», y oyó: «No temas; yo soy el primero y el último»" },
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
            consigna: "Completa qué clase de libro es el Apocalipsis.",
            texto: "El Apocalipsis es una [[profecía]] y una [[carta]] a siete iglesias, y también un apocalipsis: un mensaje en [[visiones]] y símbolos.",
            distractores: ["poesía", "canción", "leyes"],
            errores: {
              "poesía": "El Apocalipsis es a la vez profecía, carta y apocalipsis.",
              "canción": "El Apocalipsis es una carta a siete iglesias.",
              leyes: "Como apocalipsis, es un mensaje en visiones y símbolos.",
            },
            apoyo: "Es a la vez profecía, carta a siete iglesias y apocalipsis, un mensaje en visiones y símbolos",
            ref: "Apocalipsis 1:1-3",
            explica: "El Apocalipsis es a la vez profecía, carta a siete iglesias y apocalipsis, un mensaje en visiones y símbolos. Y promete una bendición para quien lo lee.",
          },
          {
            consigna: "Completa a quién se dio la revelación y dónde estaba.",
            texto: "El libro es la revelación de Jesucristo, dada a su siervo [[Juan]] en la [[isla]] de [[Patmos]], adonde lo habían desterrado por causa de la palabra de Dios.",
            distractores: ["Pablo", "cárcel", "Roma"],
            errores: {
              Pablo: "La revelación fue dada a su siervo Juan.",
              "cárcel": "Juan estaba desterrado en la isla llamada Patmos.",
              Roma: "Juan estaba desterrado en la isla llamada Patmos.",
            },
            apoyo: "El Apocalipsis es la revelación de Jesucristo dada a Juan en Patmos",
            ref: "Apocalipsis 1:9",
            explica: "Es «La revelación de Jesucristo», dada «a su siervo Juan», que estaba desterrado «en la isla llamada Patmos, por causa de la palabra de Dios y el testimonio de Jesucristo».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo está organizado el Apocalipsis tiene un error. Tócala.",
            frases: [
              "El capítulo 1 trae la visión de Cristo glorificado.",
              "Los capítulos 2 y 3 traen las cartas a las siete iglesias de Asia.",
              "Los capítulos 4 y 5 traen el cielo nuevo y la tierra nueva.",
              "Los capítulos 6 al 16 traen los sellos, las trompetas y las copas.",
            ],
            malo: 2,
            correccion: "Los capítulos 4 y 5 traen el trono de Dios y el Cordero; el cielo nuevo y la tierra nueva están en los capítulos 21 y 22.",
            apoyo: "Capítulos 4 y 5: el trono de Dios y el Cordero",
            explica: "El libro empieza con la visión de Cristo glorificado (1), sigue con las cartas a las siete iglesias (2 y 3), el trono de Dios y el Cordero (4 y 5) y los sellos, las trompetas y las copas (6 al 16), y termina con el cielo nuevo y la tierra nueva (21 y 22).",
          },
          {
            consigna: "Una de estas frases sobre el autor, la fecha y el género del Apocalipsis tiene un error. Tócala.",
            frases: [
              "Es la revelación de Jesucristo, dada a su siervo Juan.",
              "Juan estaba desterrado en la isla llamada Patmos.",
              "Todos los estudiosos lo fechan antes del año 70.",
              "Es a la vez profecía, carta a siete iglesias y apocalipsis.",
            ],
            malo: 2,
            correccion: "La mayoría de los estudiosos lo fecha hacia el año 95, en tiempos de Domiciano; otros lo ubican antes del año 70.",
            apoyo: "La mayoría de los estudiosos lo fecha hacia el año 95, en tiempos del emperador Domiciano, como dijo Ireneo; otros lo ubican antes del año 70",
            ref: "Apocalipsis 1:9",
            explica: "La fecha se dice con cautela: la mayoría de los estudiosos lo fecha hacia el año 95, como dijo Ireneo, y otros lo ubican antes del año 70.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada manera de leer el Apocalipsis con lo que dice del libro.",
            pares: [
              ["Preterista", "La mayor parte se cumplió en el siglo I"],
              ["Historicista", "Describe la historia de la iglesia hasta la venida de Cristo"],
              ["Futurista", "Desde el capítulo 4, describe sobre todo los acontecimientos del fin"],
              ["Idealista", "Presenta en símbolos la lucha de todos los tiempos entre el reino de Dios y el mal"],
            ],
            apoyo: "Se lee de cuatro maneras principales, preterista, historicista, futurista e idealista",
            explica: "La preterista ve la mayor parte cumplida en el siglo I; la historicista, la historia de la iglesia hasta la venida de Cristo; la futurista, desde el capítulo 4, sobre todo los acontecimientos del fin; y la idealista, la lucha de todos los tiempos entre el reino de Dios y el mal.",
          },
          {
            consigna: "Une cada manera de leer el Apocalipsis con lo que ve en el libro.",
            pares: [
              ["Lectura preterista", "La caída de Jerusalén y la persecución de Roma, en el siglo I"],
              ["Lectura historicista", "La historia de la iglesia, desde el siglo I hasta la venida de Cristo"],
              ["Lectura futurista", "Sobre todo los acontecimientos del fin, desde el capítulo 4"],
              ["Lectura idealista", "La lucha de siempre entre el reino de Dios y el mal, en símbolos"],
            ],
            apoyo: "Muchos maestros combinan estas lecturas",
            explica: "Cada lectura mira el libro de otra manera: la preterista, el siglo I; la historicista, la historia de la iglesia; la futurista, los acontecimientos del fin; la idealista, la lucha de todos los tiempos. Muchos maestros combinan estas lecturas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un alumno de tu clase de adultos te dice: Los que leen el Apocalipsis de otra manera que yo no saben nada de la Biblia.",
            pregunta: "¿Qué le respondes, según la lección?",
            opciones: [
              { texto: "Que las cuatro maneras se comparan con respeto, y que muchos maestros las combinan.", bien: true, explica: "La lección presenta con respeto las cuatro maneras principales de leerlo, y dice que muchos maestros combinan estas lecturas." },
              { texto: "Que tiene razón, y que en la clase solo vas a dejar hablar a los que piensan igual que él.", explica: "Las cuatro maneras de leerlo se comparan con respeto: muchos maestros combinan estas lecturas." },
              { texto: "Que nadie sabe nada del Apocalipsis, así que es mejor no leerlo ni estudiarlo nunca más.", explica: "El libro promete: «Bienaventurado el que lee, y los que oyen las palabras de esta profecía»." },
              { texto: "Que las diferencias son tan grandes que el libro no tiene ningún mensaje claro para hoy.", explica: "Por encima de las diferencias, el mensaje es claro: el Cordero que fue inmolado es digno, y Cristo vence." },
            ],
            apoyo: "Muchos maestros combinan estas lecturas",
            explica: "El Apocalipsis se lee de cuatro maneras principales: preterista, historicista, futurista e idealista. Muchos maestros combinan estas lecturas, y por encima de las diferencias, el mensaje es claro.",
          },
          {
            caso: "Un hermano nuevo te escribe: Leí que hay varias maneras de leer el Apocalipsis. ¿Cuáles son?",
            pregunta: "¿Qué le respondes, según la lección?",
            opciones: [
              { texto: "Cuatro principales: preterista, historicista, futurista e idealista.", bien: true, explica: "Son las cuatro maneras principales de leerlo, y muchos maestros las combinan." },
              { texto: "Una sola: las demás maneras son inventos de los que no creen en la Biblia.", explica: "La lección presenta con respeto cuatro maneras principales de leerlo." },
              { texto: "Ninguna: el libro es tan oscuro que nadie puede leerlo ni entenderlo.", explica: "El libro empieza con una bendición para quien lo lee." },
              { texto: "Dos: la de los que lo leen con miedo y la de los que lo leen con fe.", explica: "Las cuatro maneras principales son la preterista, la historicista, la futurista y la idealista." },
            ],
            apoyo: "Se lee de cuatro maneras principales, preterista, historicista, futurista e idealista",
            explica: "El Apocalipsis se lee de cuatro maneras principales: preterista, historicista, futurista e idealista. Muchos maestros combinan estas lecturas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Evita poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro: muchos lo han hecho y se han equivocado",
            ref: "Apocalipsis 1:17-18",
            titulo: "El video que asustó a la célula",
            relato: [
              "Eres líder de una célula. Una hermana compartió en el grupo un video que dice en qué año será el fin y quién es hoy cada personaje del Apocalipsis.",
              "Varios están asustados. Un joven dice que ya no quiere leer el Apocalipsis, porque le da miedo.",
              "Te piden que el próximo jueves enseñes sobre el libro.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con lo que dice el video?",
                opciones: [
                  { texto: "Enseñas a no poner fechas ni identificar con seguridad a nadie de hoy con los símbolos.", bien: true, explica: "La lección aconseja evitar poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro: muchos lo han hecho y se han equivocado." },
                  { texto: "Lo usas en la célula, porque al fin alguien explicó en qué año exacto será el fin del mundo.", explica: "Muchos han puesto fechas y se han equivocado: la lección aconseja evitarlo." },
                  { texto: "Lo apoyas, pero cambias el año del fin por otro que a ti te parece más seguro y más bíblico.", explica: "La lección aconseja evitar poner fechas: muchos lo han hecho y se han equivocado." },
                  { texto: "Prohíbes que se lea el Apocalipsis en la célula, para que ya nadie más se vuelva a asustar.", explica: "El libro empieza con una bendición para quien lo lee: no se escribió para asustar a la iglesia." },
                ],
                apoyo: "Evita poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro",
                explica: "La lección aconseja evitar poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro: muchos lo han hecho y se han equivocado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Por dónde empiezas a enseñar el jueves?",
                opciones: [
                  { texto: "Por lo que es claro: la gloria de Cristo, el llamado a ser fieles y la esperanza final.", bien: true, explica: "La lección aconseja enseñar el Apocalipsis empezando por lo que es claro: la gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final." },
                  { texto: "Por los símbolos más difíciles del libro, para que todos vean que tú sí los entiendes bien.", explica: "Se empieza por lo que es claro: la gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final." },
                  { texto: "Por las fechas del fin, para que la célula sepa con seguridad cuánto tiempo le queda ya.", explica: "La lección aconseja evitar poner fechas: muchos lo han hecho y se han equivocado." },
                  { texto: "Por el juicio de Dios solamente, para que todos tengan mucho miedo y así se arrepientan.", explica: "El juicio de Dios es parte de lo claro, pero el libro no se escribió para asustar a la iglesia, sino para darle esperanza." },
                ],
                apoyo: "Enseña el Apocalipsis empezando por lo que es claro: la gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final",
                explica: "Enseña el Apocalipsis empezando por lo que es claro: la gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final.",
              },
              {
                tipo: "explica",
                apoyo: "El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza",
                ref: "Apocalipsis 1:3",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-6-a6-1",
                  tipo: "corta",
                  pregunta: "El joven te dice: El Apocalipsis me da miedo. ¿Qué le respondes, con lo que enseña la lección?",
                  ideas: [
                    { id: "esperanza", peso: 40, texto: "El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza.", formas: ["esperanza", "no se escribio para asustar", "no es para asustar", "no para asustar", "consuel*", "para animar*", "no temas"] },
                    { id: "vence", peso: 40, texto: "Cristo vence: la iglesia que sufre no está perdida.", formas: ["cristo vence", "vence", "vencio", "vencera", "victoria", "no esta perdida", "triunf*", "gana"] },
                    { id: "bendicion", peso: 20, texto: "El libro empieza con una bendición para quien lo lee.", formas: ["bendicion", "bienaventurado", "bendice", "bendecido", "bendito"] },
                  ],
                  modelo: "Le diría que el Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza: Cristo vence, y la iglesia que sufre no está perdida. Además, el libro promete una bendición para quien lo lee.",
                },
              },
            ],
          },
          {
            apoyo: "La iglesia que sufre no está perdida: Cristo vence",
            ref: "Apocalipsis 5:9-10",
            titulo: "Una iglesia cansada",
            relato: [
              "Eres pastor asistente en una congregación pequeña. Este año varias familias pasaron por enfermedades, pérdidas de trabajo y burlas por su fe.",
              "El pastor te pide que prediques una serie corta sobre el Apocalipsis para animarlos.",
              "Un hermano del equipo te sugiere que hables sobre todo de quién es hoy cada personaje del libro.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al hermano del equipo?",
                opciones: [
                  { texto: "Que no conviene identificar con seguridad a personas de hoy con los símbolos del libro.", bien: true, explica: "La lección aconseja evitarlo: muchos lo han hecho y se han equivocado." },
                  { texto: "Que sí: saber quién es hoy cada personaje es lo que más anima a una iglesia que sufre.", explica: "Lo que anima es el mensaje claro: Cristo vence. Identificar con seguridad a personas de hoy con los símbolos es algo que la lección aconseja evitar." },
                  { texto: "Que es buena idea, y que además vas a anunciar en qué año exacto va a ser el fin del mundo.", explica: "La lección aconseja evitar poner fechas: muchos lo han hecho y se han equivocado." },
                  { texto: "Que mejor no predicas del Apocalipsis, porque es un libro que nadie en la iglesia entiende.", explica: "El libro promete una bendición para quien lo lee, y su mensaje central es claro." },
                ],
                apoyo: "Evita poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro",
                explica: "Evita poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro: muchos lo han hecho y se han equivocado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué mensaje del Apocalipsis necesita oír esta iglesia que sufre?",
                opciones: [
                  { texto: "Que la iglesia que sufre no está perdida: el Cordero es digno y Cristo vence.", bien: true, explica: "Por encima de las diferencias, el mensaje es claro: el Cordero que fue inmolado es digno, y la iglesia que sufre no está perdida: Cristo vence." },
                  { texto: "Que su sufrimiento muestra que Dios ya se olvidó de ellos, y que no los escucha.", explica: "La iglesia que sufre no está perdida: Cristo vence." },
                  { texto: "Que el libro se escribió para asustar a la iglesia, y para que así se porte mejor.", explica: "El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza." },
                  { texto: "Que lo más importante es saber las fechas del fin, mucho más que confiar en Cristo.", explica: "La lección aconseja evitar poner fechas, y enseñar primero lo que es claro: la gloria de Cristo y la esperanza final." },
                ],
                apoyo: "La iglesia que sufre no está perdida: Cristo vence",
                ref: "Apocalipsis 5:9-10",
                explica: "El Cordero que fue inmolado es digno, porque «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación». La iglesia que sufre no está perdida: Cristo vence.",
              },
              {
                tipo: "explica",
                apoyo: "Por eso el libro termina orando: «Amén; sí, ven, Señor Jesús»",
                ref: "Apocalipsis 22:20",
                clave: {
                  id: "pr-n4-epistolas-apocalipsis-6-a6-2",
                  tipo: "corta",
                  pregunta: "¿Con qué oración termina el Apocalipsis, y por qué es una buena forma de cerrar tu serie?",
                  ideas: [
                    { id: "ven", peso: 40, texto: "Termina orando: Amén; sí, ven, Señor Jesús.", formas: ["ven senor jesus", "ven senor", "ven jesus", "si ven", "que jesus venga", "que venga", "venga"] },
                    { id: "espera", peso: 30, texto: "La iglesia fiel espera su venida orando.", formas: ["espera* su venida", "su venida", "esperar*", "espera", "esperamos", "fiel*"] },
                    { id: "vence", peso: 30, texto: "Porque el mensaje es claro: Cristo vence, y la iglesia que sufre no está perdida.", formas: ["cristo vence", "vence", "victoria", "esperanza", "no esta perdida"] },
                  ],
                  modelo: "Termina orando: Amén; sí, ven, Señor Jesús. Es una buena forma de cerrar, porque la iglesia fiel espera su venida orando, con la esperanza de que Cristo vence y de que la iglesia que sufre no está perdida.",
                },
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
            apoyo: "Su mensaje central es claro: el Cordero inmolado es digno, Cristo vence, y la iglesia fiel espera su venida orando: ven, Señor Jesús",
            ref: "Apocalipsis 5:9-10; 11:15; 22:20",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-6-a7-1",
              tipo: "corta",
              pregunta: "Por encima de las diferencias, ¿cuál es el mensaje central del Apocalipsis para la iglesia?",
              ideas: [
                { id: "cordero", peso: 35, texto: "El Cordero que fue inmolado es digno: con su sangre nos redimió.", formas: ["cordero", "digno", "inmolado", "redimi*", "su sangre"] },
                { id: "vence", peso: 35, texto: "Cristo vence: los reinos del mundo son de nuestro Señor, y la iglesia que sufre no está perdida.", formas: ["cristo vence", "vence", "vencio", "vencera", "victoria", "gana", "no esta perdida", "no estan perdidos", "reinos del mundo", "triunf*"] },
                { id: "venida", peso: 30, texto: "La iglesia fiel espera su venida orando: ven, Señor Jesús.", formas: ["ven senor", "ven jesus", "su venida", "espera*", "venga", "vendra", "venida"] },
              ],
              modelo: "El mensaje central es claro: el Cordero que fue inmolado es digno, porque con su sangre nos redimió. Cristo vence, y la iglesia que sufre no está perdida. Por eso la iglesia fiel espera su venida orando: ven, Señor Jesús.",
            },
          },
          {
            apoyo: "El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza",
            ref: "Apocalipsis 11:15",
            clave: {
              id: "pr-n4-epistolas-apocalipsis-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué parte del mensaje central del Apocalipsis necesita oír hoy tu congregación, y por qué?",
              ideas: [
                { id: "parte", peso: 60, texto: "Una parte del mensaje central: el Cordero inmolado es digno, Cristo vence, la iglesia que sufre no está perdida o la iglesia espera su venida orando.", formas: ["cordero", "digno", "vence", "vencio", "victoria", "no esta perdida", "no estan perdidos", "reinos del mundo", "ven senor", "su venida", "redimi*"] },
                { id: "esperanza", peso: 40, texto: "Porque el Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza.", formas: ["esperanza", "anim*", "consuel*", "fortale*", "no se escribio para asustar", "no es para asustar", "no para asustar", "sin miedo", "no tener miedo", "no temer", "no tema*"] },
              ],
              modelo: "Mi congregación necesita oír que Cristo vence y que la iglesia que sufre no está perdida, porque muchos están cansados. El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza.",
            },
          },
        ],
      },
    ],
  },
};
