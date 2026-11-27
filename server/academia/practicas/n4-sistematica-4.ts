/**
 * Las prácticas de «Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-sistematica-4.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada afirmación sigue la lección con sus mismas palabras, y lo que la lección atribuye a una
 * tradición o a la declaración de fe se pregunta con esa misma atribución. Dos puntos de la declaración de fe están por
 * confirmar, y ninguna actividad pregunta por ellos ni por sus posiciones:
 * - el ministerio de la mujer (lección 2, artículo 13): su objetivo 3 se practica solo con lo que la lección afirma sin
 *   reservas: que las dos posiciones las sostienen cristianos que aman la Escritura, y que las dos afirman que hombres y
 *   mujeres llevan por igual la imagen de Dios y reciben los dones del Espíritu para servir;
 * - el orden de los últimos tiempos, el arrebatamiento y el milenio (lección 6, artículo 16): su objetivo 2 se practica
 *   solo con lo que dice 1 Tesalonicenses 4:16-17, con que los evangélicos difieren sobre el momento y con lo central que
 *   confiesan todas las posiciones. Tampoco se pregunta si el tribunal de Cristo y el gran trono blanco son dos juicios.
 * Tampoco se pregunta lo que la lección deja abierto o atribuye a otros: la roca de Mateo 16:18, Isaías 14 y Ezequiel 28,
 * si los siete de Hechos 6 fueron los primeros diáconos, ni lo que enseñan las Asambleas de Dios sobre la posesión.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_SISTEMATICA_4: PracticasMateria = {
  materia: "n4-sistematica-4",
  mision: {
    titulo: "La iglesia que espera a su Señor",
    intro: "Tu pastor te pidió dar una serie de clases a los nuevos líderes de la iglesia. Te van a preguntar qué es la iglesia y cómo se gobierna, cuál es su misión y qué significan sus dos ordenanzas, qué enseña la Biblia de los ángeles y los demonios, qué pasa después de la muerte y qué esperamos de la venida de Cristo. Repasa las seis lecciones para tener cada respuesta lista, empezando siempre por lo que la Biblia dice con claridad.",
    cierre: "Ya puedes enseñar que la iglesia es de Cristo y nada la vencerá; que la guían líderes de carácter que preparan a todos para la obra; que existe para adorar, edificar, evangelizar y servir; que el enemigo es real, pero Cristo ya triunfó; que junto a una tumba la esperanza tiene nombre, resurrección; y que la venida de Cristo no es para especular, sino para vivir preparado.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La naturaleza de la iglesia
    "n4-sistematica-4-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién edifica la iglesia, según Mateo 16:18?", reverso: "Cristo: la iglesia es suya, y nada la vencerá.", apoyo: "La iglesia es de Cristo, porque él la edifica, y nada la vencerá" },
              { frente: "¿Qué es la iglesia universal?", reverso: "El cuerpo de Cristo: todos los que han creído en él, de todo lugar y de toda época.", apoyo: "La iglesia universal es el cuerpo de Cristo: todos los que han creído en él, de todo lugar y de toda época" },
              { frente: "¿Qué es la iglesia local?", reverso: "La expresión visible del cuerpo de Cristo en un lugar: la congregación que se reúne.", apoyo: "La iglesia local es la expresión visible de ese cuerpo en un lugar" },
              { frente: "¿Qué le dice la lección a quien va a la iglesia?", reverso: "No solo vas a la iglesia: eres parte de ella.", apoyo: "No solo vas a la iglesia: eres parte de ella" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué palabra usa el Nuevo Testamento para la iglesia?", reverso: "Ekklesía: la asamblea de los llamados.", apoyo: "La palabra del Nuevo Testamento es ekklesía, la asamblea de los llamados" },
              { frente: "¿Qué dijo Jesús de las puertas del Hades?", reverso: "Que no prevalecerán contra su iglesia.", apoyo: "Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella»" },
              { frente: "¿Con quiénes se reúne la congregación de la iglesia local?", reverso: "Con sus líderes y sus miembros.", apoyo: "la congregación que se reúne, con sus líderes y sus miembros" },
              { frente: "¿Qué artículo de la declaración de fe enseña la iglesia universal y la local?", reverso: "El artículo 12.", apoyo: "El artículo 12 de la declaración de fe enseña las dos" },
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
            consigna: "Completa la diferencia entre la iglesia universal y la iglesia local.",
            texto: "La iglesia [[universal]] reúne a todos los que han creído en Cristo, de toda época; la iglesia [[local]] es la congregación que se reúne con sus [[líderes]] y sus miembros.",
            distractores: ["antigua", "invisible", "ángeles"],
            errores: {
              antigua: "La iglesia universal reúne a todos los que han creído en Cristo, de todo lugar y de toda época, no solo a los de antes.",
              invisible: "La iglesia local es la expresión visible del cuerpo de Cristo en un lugar.",
              "ángeles": "La congregación de la iglesia local se reúne con sus líderes y sus miembros.",
            },
            apoyo: "La iglesia local es la expresión visible de ese cuerpo en un lugar: la congregación que se reúne, con sus líderes y sus miembros",
            ref: "Efesios 1:22-23",
            explica: "La iglesia universal es el cuerpo de Cristo: todos los que han creído en él, de todo lugar y de toda época. La local es la congregación que se reúne en un lugar, con sus líderes y sus miembros.",
          },
          {
            consigna: "Completa qué quiere decir la palabra iglesia y de quién es.",
            texto: "La palabra del Nuevo Testamento es [[ekklesía]], la asamblea de los [[llamados]]: la iglesia es de Cristo, porque él la [[edifica]], y nada la vencerá.",
            distractores: ["sinagoga", "famosos", "abandona"],
            errores: {
              sinagoga: "La palabra del Nuevo Testamento para la iglesia es ekklesía.",
              famosos: "La ekklesía es la asamblea de los llamados.",
              abandona: "La iglesia es de Cristo, porque él la edifica, y nada la vencerá.",
            },
            apoyo: "La palabra del Nuevo Testamento es ekklesía, la asamblea de los llamados",
            ref: "Mateo 16:18",
            explica: "La ekklesía es la asamblea de los llamados. Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella»: la iglesia es de Cristo, y nada la vencerá.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Habla de la iglesia universal o de la iglesia local? Lleva cada frase a su grupo.",
            grupos: ["La iglesia universal", "La iglesia local"],
            frases: [
              { texto: "Todos los que han creído en Cristo, de toda época", grupo: 0 },
              { texto: "Los creyentes de todos los lugares del mundo", grupo: 0 },
              { texto: "El cuerpo de todos los creyentes", grupo: 0 },
              { texto: "La congregación que se reúne en un lugar", grupo: 1 },
              { texto: "Tiene sus líderes y sus miembros en un lugar", grupo: 1 },
              { texto: "La expresión visible del cuerpo de Cristo en un lugar", grupo: 1 },
            ],
            apoyo: "La iglesia universal es el cuerpo de Cristo: todos los que han creído en él, de todo lugar y de toda época",
            ref: "Efesios 1:22-23",
            explica: "La iglesia universal es el cuerpo de todos los creyentes, de todo lugar y de toda época; la local es la congregación que se reúne en un lugar, con sus líderes y sus miembros.",
          },
          {
            consigna: "¿Así presenta la Biblia a la iglesia, o no? Lleva cada frase a su grupo.",
            grupos: ["Así la presenta la Biblia", "Así no la presenta la Biblia"],
            frases: [
              { texto: "Un pueblo: lo que somos en Cristo", grupo: 0 },
              { texto: "La asamblea de los llamados", grupo: 0 },
              { texto: "La obra que Cristo edifica y que nada vencerá", grupo: 0 },
              { texto: "Un edificio al que vamos los domingos", grupo: 1 },
              { texto: "Una obra humana que un día será vencida", grupo: 1 },
              { texto: "Un lugar que visitamos de vez en cuando", grupo: 1 },
            ],
            apoyo: "La Biblia habla de la iglesia como de un pueblo: no es un lugar al que vamos, sino lo que somos en Cristo",
            ref: "Mateo 16:18",
            explica: "La Biblia habla de la iglesia como de un pueblo: no es un lugar al que vamos, sino lo que somos en Cristo. Es la asamblea de los llamados, que Cristo edifica y que nada vencerá.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada imagen de la iglesia con lo que enseña la lección.",
            pares: [
              ["Un cuerpo", "Muchos miembros: nadie sobra y nadie se basta solo"],
              ["Un templo santo", "Crece sobre el fundamento de los apóstoles y profetas"],
              ["Un pueblo de sacerdotes", "Cada creyente puede acercarse a Dios por medio de Cristo"],
              ["Una familia", "Los creyentes son miembros de la familia de Dios"],
            ],
            apoyo: "La Biblia la presenta como un cuerpo, una familia, un templo y un pueblo de sacerdotes",
            explica: "En el cuerpo nadie sobra y nadie se basta solo; el templo crece sobre el fundamento de los apóstoles y profetas; en el pueblo de sacerdotes cada creyente se acerca a Dios por medio de Cristo; y somos miembros de la familia de Dios.",
          },
          {
            consigna: "Une cada pasaje con la imagen de la iglesia que presenta.",
            pares: [
              ["1 Corintios 12:12-13", "Un cuerpo con muchos miembros, por un solo Espíritu"],
              ["Efesios 2:19-22", "Una familia y un templo santo en el Señor"],
              ["1 Pedro 2:9", "Un pueblo: «linaje escogido, real sacerdocio, nación santa»"],
            ],
            apoyo: "Es una familia y un templo: somos «miembros de la familia de Dios»",
            explica: "1 Corintios 12 presenta a la iglesia como un cuerpo con muchos miembros; Efesios 2, como una familia y un templo santo; y 1 Pedro 2:9, como un pueblo de sacerdotes.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿En qué perseveraban los primeros creyentes? Toca las palabras que nombran las cuatro marcas.",
            texto: "perseveraban en la [[doctrina]] de los apóstoles, en la [[comunión]] unos con otros, en el [[partimiento del pan]] y en las [[oraciones]]",
            apoyo: "Esas cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración",
            ref: "Hechos 2:42",
            explica: "Los primeros creyentes perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración.",
          },
          {
            consigna: "¿Qué palabras de Hechos 2:42 nombran la Santa Cena y la oración? Tócalas.",
            texto: "perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el [[partimiento del pan]] y en las [[oraciones]]",
            apoyo: "Esas cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración",
            ref: "Hechos 2:42",
            explica: "El partimiento del pan es la Santa Cena, y las oraciones son la oración: dos de las cuatro marcas, junto con la doctrina de los apóstoles y la comunión.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de célula te dice: Mi grupo va muy bien: este mes vinieron cuarenta personas.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que también mire si perseveran en la Palabra, la comunión, la Santa Cena y la oración.", bien: true, explica: "Una iglesia no se mide solo por cuántos asisten, sino por si persevera en la doctrina, la comunión, el partimiento del pan y la oración." },
              { texto: "Que con eso basta, porque una iglesia sana se mide por cuántas personas asisten cada semana.", explica: "Que vengan muchos es bueno, pero una iglesia no se mide solo por cuántos asisten." },
              { texto: "Que ahora se dedique a traer más gente y deje la enseñanza para el culto del domingo.", explica: "La enseñanza de la Palabra es una de las cuatro marcas, y las marcas se cuidan también en los grupos y en las casas." },
              { texto: "Que no se preocupe por orar en el grupo, porque la oración le toca solo al pastor.", explica: "La oración es una de las cuatro marcas: se cuida en el culto, en los grupos y en las casas." },
            ],
            apoyo: "Una iglesia no se mide solo por cuántos asisten, sino por si persevera en la doctrina, la comunión, el partimiento del pan y la oración",
            ref: "Hechos 2:42-47",
            explica: "Las cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración. Se cuidan en el culto, en los grupos y en las casas.",
          },
          {
            caso: "Una hermana nueva te dice: La iglesia donde me congrego es pequeña. ¿Cómo sé si es una iglesia sana?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Si persevera en la Palabra, la comunión, la Santa Cena y la oración.", bien: true, explica: "Esas cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración." },
              { texto: "Si tiene un edificio grande y muchas personas que asisten cada domingo.", explica: "Una iglesia no se mide solo por cuántos asisten, sino por si persevera en las cuatro marcas." },
              { texto: "Si sus cultos son muy largos y todos salen muy emocionados cada semana.", explica: "Las marcas de una iglesia sana son la Palabra, la comunión, la Santa Cena y la oración." },
              { texto: "Si cada miembro sirve por su cuenta, sin necesitar de los demás hermanos.", explica: "En el cuerpo de Cristo nadie sobra y nadie se basta solo, y la comunión unos con otros es una de las marcas." },
            ],
            apoyo: "Esas cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración",
            ref: "Hechos 2:42-47",
            explica: "Una iglesia sana, grande o pequeña, persevera como los primeros creyentes: en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Nadie sobra y nadie se basta solo",
            ref: "1 Corintios 12:12-13; 1 Pedro 2:9",
            clave: {
              id: "pr-n4-sistematica-4-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñan sobre la iglesia la imagen del cuerpo y la del pueblo de sacerdotes?",
              ideas: [
                { id: "cuerpo", peso: 50, texto: "El cuerpo es uno y tiene muchos miembros: nadie sobra y nadie se basta solo.", formas: ["nadie sobra", "se basta solo", "bastar* solo", "muchos miembros", "todos somos (necesarios|importantes)", "todos son (necesarios|importantes)", "nos necesitamos", "necesitamos (unos|los|otros)", "cada miembro (es|tiene|cuenta|importa)", "un solo espiritu", "sin importar (el|su) origen"] },
                { id: "sacerdotes", peso: 50, texto: "Cada creyente es sacerdote: puede acercarse a Dios por medio de Cristo y servirle.", formas: ["cada creyente (es|puede)", "todos somos sacerdotes", "todos son sacerdotes", "creyentes (son|somos) sacerdotes", "acerc* a dios", "por medio de cristo", "sacerdocio de todos", "podemos servirle", "puede servirle", "servirle"] },
              ],
              modelo: "La imagen del cuerpo enseña que la iglesia tiene muchos miembros: nadie sobra y nadie se basta solo. La del pueblo de sacerdotes enseña que cada creyente puede acercarse a Dios por medio de Cristo y servirle.",
            },
          },
          {
            apoyo: "Es una familia y un templo: somos «miembros de la familia de Dios»",
            ref: "Efesios 2:19-22",
            clave: {
              id: "pr-n4-sistematica-4-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña Efesios 2:19-22 cuando presenta a la iglesia como una familia y como un templo?",
              ideas: [
                { id: "familia", peso: 50, texto: "Los creyentes somos miembros de la familia de Dios.", formas: ["miembros de la familia", "familia de dios", "hijos de dios", "somos hermanos", "somos familia", "pertenec* a (la|su) familia"] },
                { id: "templo", peso: 50, texto: "Todo el edificio va creciendo para ser un templo santo, sobre el fundamento de los apóstoles y profetas, con Cristo como la principal piedra del ángulo.", formas: ["templo santo", "va creciendo", "crec*", "fundamento", "piedra (principal|angulo|angular)", "principal piedra", "edificio"] },
              ],
              modelo: "Enseña que los creyentes somos miembros de la familia de Dios, y que todo el edificio va creciendo para ser un templo santo, sobre el fundamento de los apóstoles y profetas, con Cristo como la principal piedra del ángulo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El gobierno y los ministerios de la iglesia
    "n4-sistematica-4-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hicieron Pablo y Bernabé en cada iglesia, después de orar con ayunos?", reverso: "Constituyeron ancianos.", apoyo: "Pablo y Bernabé «constituyeron ancianos en cada iglesia», después de orar con ayunos" },
              { frente: "En el Nuevo Testamento, ¿qué tarea comparten anciano, obispo y pastor?", reverso: "Guiar y cuidar la congregación.", apoyo: "anciano (presbítero), obispo (supervisor) y pastor se usan para la misma tarea de guiar y cuidar la congregación" },
              { frente: "¿En qué sirven los diáconos?", reverso: "En las necesidades prácticas.", apoyo: "Los diáconos sirven en las necesidades prácticas" },
              { frente: "En el gobierno episcopal, ¿quién guía la iglesia?", reverso: "Los obispos.", apoyo: "Episcopal: la iglesia es guiada por obispos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué combinan muchas iglesias pentecostales?", reverso: "Rasgos de las tres formas de gobierno.", apoyo: "Muchas iglesias pentecostales combinan rasgos de las tres" },
              { frente: "En el gobierno presbiteriano, ¿quién guía la iglesia?", reverso: "Ancianos reunidos en consejos.", apoyo: "Presbiteriana: la iglesia es guiada por ancianos reunidos en consejos" },
              { frente: "En el gobierno congregacional, ¿quién toma las decisiones principales?", reverso: "La congregación.", apoyo: "Congregacional: la congregación toma las decisiones principales" },
              { frente: "¿Qué pide la Biblia, aunque no impone una sola forma de gobierno?", reverso: "Orden, líderes de carácter y rendición de cuentas.", apoyo: "La Biblia no impone una sola forma, pero sí pide orden, líderes de carácter y rendición de cuentas" },
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
            consigna: "Une cada forma de gobierno con quién guía la iglesia o toma las decisiones.",
            pares: [
              ["Episcopal", "La iglesia es guiada por obispos"],
              ["Presbiteriana", "La guían ancianos reunidos en consejos"],
              ["Congregacional", "La congregación toma las decisiones principales"],
              ["Muchas iglesias pentecostales", "Combinan rasgos de las tres formas"],
            ],
            apoyo: "Hay tres formas históricas de gobierno: episcopal, presbiteriana y congregacional",
            explica: "En la forma episcopal guían los obispos; en la presbiteriana, ancianos reunidos en consejos; en la congregacional, la congregación toma las decisiones principales. Muchas iglesias pentecostales combinan rasgos de las tres.",
          },
          {
            consigna: "Une cada forma de gobierno con algunas de las iglesias que la siguen.",
            pares: [
              ["Episcopal", "La católica, la ortodoxa, la anglicana y la metodista"],
              ["Presbiteriana", "Las iglesias reformadas"],
              ["Congregacional", "Las iglesias bautistas"],
            ],
            apoyo: "Episcopal: la iglesia es guiada por obispos. La siguen la iglesia católica, la ortodoxa, la anglicana y la metodista",
            explica: "La forma episcopal la siguen la iglesia católica, la ortodoxa, la anglicana y la metodista; la presbiteriana, las iglesias presbiterianas y reformadas; y la congregacional, las bautistas y congregacionales.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el gobierno de la iglesia tiene un error. Tócala.",
            frases: [
              "La Biblia no da un organigrama, pero sí da principios claros.",
              "En la forma congregacional, la iglesia es guiada por obispos.",
              "En la forma presbiteriana, guían ancianos reunidos en consejos.",
              "La Biblia pide orden, líderes de carácter y rendición de cuentas.",
            ],
            malo: 1,
            correccion: "En la forma congregacional, la congregación toma las decisiones principales; la guiada por obispos es la episcopal.",
            apoyo: "Congregacional: la congregación toma las decisiones principales",
            explica: "Episcopal: guían los obispos. Presbiteriana: ancianos reunidos en consejos. Congregacional: la congregación toma las decisiones principales.",
          },
          {
            consigna: "Una de estas frases sobre los líderes y el gobierno de la iglesia tiene un error. Tócala.",
            frases: [
              "Muchas iglesias pentecostales combinan rasgos de las tres formas.",
              "En el Nuevo Testamento, anciano, obispo y pastor se usan para la misma tarea.",
              "La Biblia impone una sola forma de gobierno para todas las iglesias.",
              "Los diáconos sirven en las necesidades prácticas.",
            ],
            malo: 2,
            correccion: "La Biblia no impone una sola forma, pero sí pide orden, líderes de carácter y rendición de cuentas.",
            apoyo: "La Biblia no impone una sola forma, pero sí pide orden, líderes de carácter y rendición de cuentas",
            explica: "La Biblia no impone una sola forma de gobierno: muchas iglesias pentecostales combinan rasgos de las tres. Lo que sí pide es orden, líderes de carácter y rendición de cuentas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa para qué dio Cristo los ministerios de Efesios 4.",
            texto: "Cristo dio apóstoles, profetas, evangelistas, pastores y maestros con un [[propósito]]: que los líderes [[preparen]] a todos los [[santos]] para la obra del ministerio.",
            distractores: ["castigo", "dominen", "ángeles"],
            errores: {
              castigo: "Cristo dio los ministerios con un propósito: «perfeccionar a los santos para la obra del ministerio».",
              dominen: "Los líderes no hacen toda la obra: preparan a todos para hacerla.",
              "ángeles": "Los ministerios preparan a todos los santos, es decir, a todos los creyentes, para la obra.",
            },
            apoyo: "Los líderes no hacen toda la obra: preparan a todos para hacerla",
            ref: "Efesios 4:11-13",
            explica: "Cristo dio los ministerios para «perfeccionar a los santos para la obra del ministerio»: los líderes no hacen toda la obra, preparan a todos para hacerla.",
          },
          {
            consigna: "Completa los requisitos del líder.",
            texto: "Los requisitos del líder son sobre todo de [[carácter]]: que sea apto para [[enseñar]], que gobierne bien su [[casa]] y que tenga buen testimonio.",
            distractores: ["dinero", "mandar", "empresa"],
            errores: {
              dinero: "Los requisitos del líder son sobre todo de carácter.",
              mandar: "Pablo pide que el líder sea «apto para enseñar».",
              empresa: "Pablo pide que el líder «gobierne bien su casa».",
            },
            apoyo: "Los requisitos del líder son sobre todo de carácter",
            ref: "1 Timoteo 3:1-7",
            explica: "Los requisitos del líder son sobre todo de carácter: que sea «irreprensible», «apto para enseñar», que «gobierne bien su casa» y que tenga «buen testimonio de los de afuera».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Cristo da ministerios para preparar a todos los santos para la obra, y pide líderes de carácter probado",
            ref: "1 Timoteo 3:1-7",
            situacion: "Eres pastor asistente. El pastor te pide ayuda para escoger a quien va a dirigir una nueva célula de jóvenes.",
            escenas: [
              {
                id: "e1",
                narra: "Te proponen a un joven que se convirtió hace dos meses. Canta muy bien y todos lo quieren.",
                pregunta: "¿Qué recomiendas?",
                opciones: [
                  { texto: "Que espere y sirva primero junto a un líder: no debe ser un neófito.", valor: 2, explica: "Pablo advierte que el líder no sea «un neófito», para que el orgullo no lo haga caer." },
                  { texto: "Que dirija la célula, pero con un líder maduro que lo acompañe de cerca.", valor: 1, explica: "Acompañarlo es bueno, pero Pablo advierte que el líder no sea «un neófito», para que el orgullo no lo haga caer." },
                  { texto: "Que la dirija ya: si canta bien y todos lo quieren, eso es lo que importa.", valor: 0, explica: "Los requisitos del líder son sobre todo de carácter, no de talento ni de simpatía." },
                ],
              },
              {
                id: "e2",
                narra: "Hay otra candidata. Lleva años en la iglesia, cuida bien su casa y sus vecinos hablan bien de ella.",
                pregunta: "¿Qué miras todavía?",
                opciones: [
                  { texto: "Si es apta para enseñar, porque tendrá que guiar el estudio.", valor: 2, explica: "Pablo pide que el líder sea «apto para enseñar», además de que «gobierne bien su casa» y tenga «buen testimonio de los de afuera»." },
                  { texto: "Si tiene tiempo libre para preparar las reuniones de cada semana.", valor: 1, explica: "Tener tiempo ayuda, pero los requisitos del líder son sobre todo de carácter, y uno de ellos es ser «apto para enseñar»." },
                  { texto: "Si tiene más estudios que los demás, para que todos la respeten.", valor: 0, explica: "Los requisitos del líder son sobre todo de carácter, no de estudios ni de prestigio." },
                ],
              },
              {
                id: "e3",
                narra: "Ya escogieron a la nueva líder. Ella quiere hacerlo todo sola, para que nada salga mal.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que prepare a otros para servir: el líder no hace toda la obra.", valor: 2, explica: "Cristo dio los ministerios para «perfeccionar a los santos para la obra del ministerio»: los líderes preparan a todos para hacerla." },
                  { texto: "Que reparta las tareas pequeñas y se quede ella con las importantes.", valor: 1, explica: "Repartir ayuda, pero el líder no hace toda la obra: prepara a otros para hacerla, también en lo importante." },
                  { texto: "Que siga así: un buen líder no necesita la ayuda de nadie.", valor: 0, explica: "Los líderes no hacen toda la obra: preparan a todos para hacerla." },
                ],
              },
            ],
          },
          {
            apoyo: "Pablo advierte que no sea «un neófito», para que el orgullo no lo haga caer",
            ref: "Efesios 4:11-13",
            situacion: "Eres maestro en la escuela de líderes de tu iglesia. Hoy guías a un grupo de nuevos líderes en lo que la Biblia pide de ellos.",
            escenas: [
              {
                id: "e1",
                narra: "Un alumno dice: La obra la hace el pastor; los demás solo venimos a escuchar.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Cristo dio los ministerios para preparar a todos para la obra.", valor: 2, explica: "Cristo dio los ministerios para «perfeccionar a los santos para la obra del ministerio»: los líderes preparan a todos para hacerla." },
                  { texto: "Que el pastor sí necesita ayuda, porque tiene demasiado trabajo solo.", valor: 1, explica: "Es verdad que el líder no hace toda la obra, pero la razón es otra: Cristo da ministerios para preparar a todos los santos." },
                  { texto: "Que tiene razón: servir en la obra les toca solo a los pastores y líderes.", valor: 0, explica: "Los líderes no hacen toda la obra: preparan a todos para hacerla." },
                ],
              },
              {
                id: "e2",
                narra: "Otro alumno pregunta qué es lo más importante en un líder.",
                pregunta: "¿Qué le contestas?",
                opciones: [
                  { texto: "Su carácter: que sea irreprensible y tenga buen testimonio.", valor: 2, explica: "Los requisitos del líder son sobre todo de carácter: que sea «irreprensible» y que tenga «buen testimonio de los de afuera»." },
                  { texto: "Que sepa enseñar bien, aunque no gobierne bien su propia casa.", valor: 1, explica: "Ser «apto para enseñar» es un requisito, pero también que «gobierne bien su casa»." },
                  { texto: "Que sea muy conocido y atraiga a mucha gente a las reuniones.", valor: 0, explica: "Los requisitos del líder son sobre todo de carácter, no de fama." },
                ],
              },
              {
                id: "e3",
                narra: "Una alumna pregunta por qué Pablo pide que el líder no sea un neófito.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Para que el orgullo no lo haga caer, como advierte Pablo.", valor: 2, explica: "Pablo advierte que el líder no sea «un neófito», para que el orgullo no lo haga caer." },
                  { texto: "Porque primero tiene que crecer en la fe antes de guiar a otros.", valor: 1, explica: "Es cierto que necesita crecer, pero la razón que da Pablo es otra: que el orgullo no lo haga caer." },
                  { texto: "Porque un creyente nuevo no puede servir en nada en la iglesia.", valor: 0, explica: "Pablo no dice que no pueda servir: advierte que el líder no sea un neófito, para que el orgullo no lo haga caer." },
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
            consigna: "Sobre lo que afirman las dos posiciones acerca del ministerio de la mujer: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las dos posiciones sobre el ministerio de la mujer las sostienen cristianos que aman la Escritura.", verdad: true, explica: "La lección lo dice así: las dos posiciones las sostienen cristianos que aman la Escritura.", apoyo: "Las dos posiciones las sostienen cristianos que aman la Escritura" },
              { texto: "Solo una de las dos posiciones afirma que la mujer lleva la imagen de Dios.", verdad: false, explica: "Las dos posiciones afirman que hombres y mujeres llevan por igual la imagen de Dios.", apoyo: "las dos afirman que hombres y mujeres llevan por igual la imagen de Dios" },
              { texto: "Las dos posiciones afirman que hombres y mujeres reciben los dones del Espíritu para servir.", verdad: true, explica: "Las dos afirman que hombres y mujeres llevan por igual la imagen de Dios y reciben los dones del Espíritu para servir.", apoyo: "las dos afirman que hombres y mujeres llevan por igual la imagen de Dios y reciben los dones del Espíritu para servir" },
            ],
          },
          {
            consigna: "Para presentar con respeto las posiciones sobre el ministerio de la mujer: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Hombres y mujeres llevan por igual la imagen de Dios.", verdad: true, explica: "Es lo que afirman las dos posiciones: hombres y mujeres llevan por igual la imagen de Dios.", apoyo: "hombres y mujeres llevan por igual la imagen de Dios" },
              { texto: "Quien piensa distinto sobre el ministerio de la mujer no ama la Escritura.", verdad: false, explica: "Las dos posiciones las sostienen cristianos que aman la Escritura.", apoyo: "Las dos posiciones las sostienen cristianos que aman la Escritura" },
              { texto: "Los dones del Espíritu para servir son solo para los varones.", verdad: false, explica: "Las dos posiciones afirman que hombres y mujeres reciben los dones del Espíritu para servir.", apoyo: "reciben los dones del Espíritu para servir" },
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
            apoyo: "Cristo da ministerios para preparar a todos los santos para la obra, y pide líderes de carácter probado",
            ref: "Efesios 4:11-13; 1 Timoteo 3:1-7",
            clave: {
              id: "pr-n4-sistematica-4-2-a7-1",
              tipo: "corta",
              pregunta: "¿Para qué dio Cristo los ministerios de Efesios 4, y de qué son sobre todo los requisitos del líder?",
              ideas: [
                { id: "preparar", peso: 50, texto: "Para perfeccionar a los santos para la obra del ministerio: los líderes no hacen toda la obra, preparan a todos para hacerla.", formas: ["perfeccion* a los santos", "prepar* a (todos|los|otros|cada)", "prepar* (santos|creyentes|hermanos)", "para la obra", "no hacen toda la obra", "no hace toda la obra", "capacit*", "equip*"] },
                { id: "caracter", peso: 50, texto: "Los requisitos del líder son sobre todo de carácter: irreprensible, apto para enseñar, que gobierne bien su casa y no sea un neófito.", formas: ["caracter", "irreprensible", "apto para ensenar", "gobierne bien su casa", "buen testimonio", "neofito"] },
              ],
              errores: [
                { id: "hacen-todo", texto: "Los líderes no hacen toda la obra: preparan a todos para hacerla.", formas: ["(lideres|pastores|pastor|lider) (hacen|hace|haga|hagan) toda la obra", "hacer toda la obra"], anula: "preparar" },
              ],
              modelo: "Cristo dio los ministerios para perfeccionar a los santos para la obra del ministerio: los líderes preparan a todos para hacerla. Y los requisitos del líder son sobre todo de carácter: que sea irreprensible y tenga buen testimonio.",
            },
          },
          {
            apoyo: "Pablo advierte que no sea «un neófito», para que el orgullo no lo haga caer",
            ref: "1 Timoteo 3:1-7",
            clave: {
              id: "pr-n4-sistematica-4-2-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué pide Pablo que el líder no sea un neófito, y qué otros requisitos de carácter nombra?",
              ideas: [
                { id: "orgullo", peso: 50, texto: "Para que el orgullo no lo haga caer.", formas: ["orgullo", "envanec*", "soberbi*", "orgullos*"] },
                { id: "otros", peso: 50, texto: "Que sea irreprensible, apto para enseñar, que gobierne bien su casa y que tenga buen testimonio de los de afuera.", formas: ["irreprensible", "apto para ensenar", "gobierne bien", "su casa", "buen testimonio", "testimonio", "los de afuera"] },
              ],
              modelo: "Pablo pide que no sea un neófito para que el orgullo no lo haga caer. Además pide que sea irreprensible, apto para enseñar, que gobierne bien su casa y que tenga buen testimonio de los de afuera.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La misión de la iglesia y sus ordenanzas
    "n4-sistematica-4-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué mandó Jesús con toda potestad en sus manos?", reverso: "Ir y hacer discípulos a todas las naciones.", apoyo: "Jesús mandó: «id, y haced discípulos a todas las naciones»" },
              { frente: "¿Qué prometió Jesús junto con ese mandato?", reverso: "Estar con los suyos todos los días, hasta el fin del mundo.", apoyo: "Y prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo»" },
              { frente: "¿Con qué poder cumple la iglesia su misión?", reverso: "Con el poder del Espíritu Santo, no con sus fuerzas.", apoyo: "Y la iglesia no la cumple con sus fuerzas" },
              { frente: "¿Qué artículo de la declaración de fe resume la misión de la iglesia?", reverso: "El artículo 12, con las palabras de Marcos.", apoyo: "La declaración de fe del ministerio (artículo 12) resume la misión con las palabras de Marcos" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Mateo 28, ¿qué dos cosas incluye hacer discípulos?", reverso: "Bautizarlos y enseñarles a guardar lo que Jesús mandó.", apoyo: "sino hacer discípulos: «bautizándolos» y «enseñándoles que guarden todas las cosas que os he mandado»" },
              { frente: "Según Hechos 1:8, ¿qué recibirían los discípulos?", reverso: "Poder, cuando viniera sobre ellos el Espíritu Santo.", apoyo: "«recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos»" },
              { frente: "¿Qué puede olvidar una iglesia muy ocupada?", reverso: "Para qué existe.", apoyo: "Una iglesia puede estar muy ocupada y aun así olvidar para qué existe" },
              { frente: "Según Marcos 16:15, ¿qué se predica, y a quién?", reverso: "El evangelio, a toda criatura.", apoyo: "«Id por todo el mundo y predicad el evangelio a toda criatura»" },
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
            consigna: "Completa lo que mandó y lo que prometió Jesús en la gran comisión.",
            texto: "Jesús mandó ir a todas las [[naciones]] y hacer discípulos, y prometió estar con los suyos todos los [[días]], hasta el fin del [[mundo]].",
            distractores: ["iglesias", "domingos", "templo"],
            errores: {
              iglesias: "Jesús mandó: «id, y haced discípulos a todas las naciones».",
              domingos: "Jesús prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo».",
              templo: "La promesa es hasta el fin del mundo.",
            },
            apoyo: "Y prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo»",
            ref: "Mateo 28:18-20",
            explica: "Con toda potestad en sus manos, Jesús mandó ir y hacer discípulos a todas las naciones, y prometió estar con los suyos todos los días, hasta el fin del mundo.",
          },
          {
            consigna: "Completa con qué poder cumple la iglesia su misión.",
            texto: "La iglesia cumple su misión con el [[poder]] del Espíritu Santo, para ser [[testigos]] de Cristo y predicar el [[evangelio]] a toda criatura.",
            distractores: ["dinero", "jueces", "castigo"],
            errores: {
              dinero: "La iglesia no cumple la misión con sus fuerzas: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo».",
              jueces: "Jesús dijo: «me seréis testigos».",
              castigo: "La misión es «predicad el evangelio a toda criatura».",
            },
            apoyo: "Y la iglesia no la cumple con sus fuerzas",
            ref: "Marcos 16:15-16; Hechos 1:8",
            explica: "La declaración de fe resume la misión con Marcos: «Id por todo el mundo y predicad el evangelio a toda criatura». Y la iglesia la cumple con el poder del Espíritu Santo, como testigos de Cristo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de evangelismo te dice: Este año la meta es que mucha gente levante la mano y crea. Con eso cumplimos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la tarea es hacer discípulos: bautizarlos y enseñarles lo que Jesús mandó.", bien: true, explica: "La tarea no es solo que las personas crean, sino hacer discípulos: «bautizándolos» y «enseñándoles que guarden todas las cosas que os he mandado»." },
              { texto: "Que tiene razón: la misión de la iglesia termina el día en que la persona cree.", explica: "La tarea no es solo que las personas crean, sino hacer discípulos." },
              { texto: "Que mejor espere a que la gente llegue sola al templo, sin salir a buscarla.", explica: "Jesús mandó: «id, y haced discípulos a todas las naciones»: la iglesia sale a cumplir su misión." },
              { texto: "Que primero junte sus propias fuerzas, y después pida el poder del Espíritu.", explica: "La iglesia no cumple la misión con sus fuerzas: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos»." },
            ],
            apoyo: "La tarea no es solo que las personas crean, sino hacer discípulos",
            ref: "Mateo 28:18-20",
            explica: "La gran comisión no pide solo que las personas crean: pide hacer discípulos, bautizarlos y enseñarles a guardar todo lo que Jesús mandó.",
          },
          {
            caso: "Una hermana del grupo de evangelismo te dice: Somos pocos y sin recursos. ¿Cómo vamos a cumplir la gran comisión?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Con el poder del Espíritu: la iglesia no la cumple con sus fuerzas.", bien: true, explica: "La iglesia no cumple la misión con sus fuerzas: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos»." },
              { texto: "No podemos: esa misión era solo para los apóstoles del primer siglo.", explica: "Jesús prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo»: la misión sigue hasta hoy." },
              { texto: "Esperando a tener más dinero y más gente antes de salir a predicar.", explica: "La iglesia no espera tener fuerzas propias: cumple la misión con el poder del Espíritu Santo." },
              { texto: "Dejándole el evangelismo a otra iglesia que sea más grande que la nuestra.", explica: "La misión es de toda la iglesia: «Id por todo el mundo y predicad el evangelio a toda criatura»." },
            ],
            apoyo: "Y la iglesia no la cumple con sus fuerzas",
            ref: "Hechos 1:8",
            explica: "La iglesia no cumple la misión con sus fuerzas, sino con el poder del Espíritu Santo. Y Jesús prometió estar con los suyos todos los días, hasta el fin del mundo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada tarea de la iglesia con hacia dónde va.",
            pares: [
              ["La adoración", "Hacia Dios: la iglesia existe primero para glorificarlo"],
              ["La edificación", "Hacia dentro: los creyentes crecen juntos en Cristo"],
              ["La evangelización", "Hacia fuera: anuncia el evangelio y hace discípulos"],
              ["El servicio", "Hacia el prójimo: muestra el amor de Dios con obras"],
            ],
            apoyo: "Cumple cuatro tareas: adora a Dios, edifica a los creyentes, evangeliza al mundo y sirve al prójimo",
            explica: "La adoración va hacia Dios; la edificación, hacia dentro; la evangelización, hacia fuera; y el servicio, hacia el prójimo, con obras de misericordia.",
          },
          {
            consigna: "Une cada tarea de la iglesia con lo que dice de ella la lección.",
            pares: [
              ["La adoración", "Glorificar a Dios, que es para lo que la iglesia existe primero"],
              ["La edificación", "Es obra de todos: el cuerpo crece con la actividad propia de cada miembro"],
              ["La evangelización", "Anunciar el evangelio y hacer discípulos"],
              ["El servicio", "Hacer bien a todos, y mayormente a los de la familia de la fe"],
            ],
            apoyo: "La edificación es obra de todos: el cuerpo crece «según la actividad propia de cada miembro» y va «edificándose en amor»",
            explica: "La adoración glorifica a Dios; la edificación es obra de todos los miembros; la evangelización anuncia el evangelio y hace discípulos; y el servicio hace bien a todos, y mayormente a los de la familia de la fe.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las cuatro tareas de la iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La edificación de la iglesia es obra solo de los pastores.", verdad: false, explica: "La edificación es obra de todos: el cuerpo crece «según la actividad propia de cada miembro».", apoyo: "La edificación es obra de todos" },
              { texto: "La iglesia existe primero para glorificar a Dios.", verdad: true, explica: "La adoración va hacia Dios: la iglesia existe primero para glorificarlo.", apoyo: "La adoración, hacia Dios: la iglesia existe primero para glorificarlo" },
              { texto: "El servicio de la iglesia no se queda dentro de la iglesia.", verdad: true, explica: "El servicio va hacia el prójimo: «hagamos bien a todos, y mayormente a los de la familia de la fe».", apoyo: "El servicio no se queda dentro de la iglesia" },
            ],
          },
          {
            consigna: "Sobre la evangelización y el servicio de la iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La iglesia anuncia el evangelio solo con palabras, sin obras.", verdad: false, explica: "La iglesia anuncia el evangelio con palabras y lo muestra con obras.", apoyo: "La iglesia anuncia el evangelio con palabras y lo muestra con obras" },
              { texto: "La evangelización anuncia el evangelio y hace discípulos.", verdad: true, explica: "La evangelización va hacia fuera: anuncia el evangelio y hace discípulos.", apoyo: "La evangelización, hacia fuera: anuncia el evangelio y hace discípulos" },
              { texto: "El servicio de la iglesia es solo para los de la familia de la fe.", verdad: false, explica: "Pablo dice: «hagamos bien a todos, y mayormente a los de la familia de la fe».", apoyo: "«hagamos bien a todos, y mayormente a los de la familia de la fe»", ref: "Gálatas 6:10" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cristo le dejó dos ordenanzas: el bautismo en agua de los que creyeron y la Santa Cena, memorial de su muerte hasta que él venga",
            ref: "1 Corintios 11:23-26",
            titulo: "La clase de los nuevos creyentes",
            relato: [
              "Eres maestro de la clase para nuevos creyentes. El próximo domingo habrá bautismos en agua, y el mes que viene la iglesia celebrará la Santa Cena.",
              "Tres jóvenes que se convirtieron hace poco llegan con preguntas: Andrés quiere saber quiénes se bautizan, Lucía qué significa el bautismo y Pedro para qué se celebra la Santa Cena.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Andrés pregunta: ¿A quiénes se bautiza en agua?",
                opciones: [
                  { texto: "A los que se arrepintieron y creyeron en Cristo.", bien: true, explica: "El bautismo en agua es de los que se arrepintieron y creyeron, como enseña el artículo 8 de la declaración de fe." },
                  { texto: "A todos los que asisten al culto, aunque todavía no hayan creído.", explica: "El bautismo en agua es de los que se arrepintieron y creyeron." },
                  { texto: "Solo a los que llevan muchos años sirviendo en la iglesia.", explica: "El bautismo es de los que se arrepintieron y creyeron, no un premio a los años de servicio." },
                ],
                apoyo: "El bautismo en agua, por inmersión, de los que se arrepintieron y creyeron",
                explica: "Cristo dejó a su iglesia el bautismo en agua, por inmersión, de los que se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo.",
              },
              {
                tipo: "situacion",
                pregunta: "Lucía pregunta: ¿De qué es testimonio el bautismo en agua?",
                opciones: [
                  { texto: "De que murieron al pecado y resucitaron a una vida nueva.", bien: true, explica: "El bautismo es testimonio de que murieron al pecado y resucitaron a una vida nueva." },
                  { texto: "De que el agua misma les borró todos sus pecados para siempre.", explica: "El bautismo es un testimonio, y las ordenanzas son señales de la gracia que se recibe por la fe." },
                  { texto: "De que ya no caerán nunca más en ninguna tentación.", explica: "El bautismo es testimonio de que murieron al pecado y resucitaron a una vida nueva." },
                ],
                apoyo: "como testimonio de que murieron al pecado y resucitaron a una vida nueva",
                explica: "El bautismo en agua es testimonio de que murieron al pecado y resucitaron a una vida nueva: una señal de la gracia que se recibe por la fe.",
              },
              {
                tipo: "situacion",
                pregunta: "Pedro pregunta: ¿Para qué celebramos la Santa Cena?",
                opciones: [
                  { texto: "En memoria de Cristo, en comunión con él y anunciando su venida.", bien: true, explica: "La Santa Cena se celebra «en memoria de mí», como comunión con Cristo y con su pueblo y como anuncio de su venida." },
                  { texto: "Para ganar otra vez el perdón cada mes, porque sin ella no hay salvación.", explica: "Las ordenanzas son señales de la gracia que se recibe por la fe: la Cena es memorial, comunión y anuncio de su venida." },
                  { texto: "Para recordar a los apóstoles y su costumbre de comer juntos.", explica: "La Santa Cena se celebra en memoria de Cristo: «la muerte del Señor anunciáis hasta que él venga»." },
                ],
                apoyo: "Y la Santa Cena, que se celebra «en memoria de mí», como comunión con Cristo y con su pueblo y como anuncio de su venida",
                explica: "La Santa Cena se celebra «en memoria de mí», como comunión con Cristo y con su pueblo, y como anuncio de su venida: «la muerte del Señor anunciáis hasta que él venga».",
              },
              {
                tipo: "explica",
                apoyo: "Cristo le dejó dos ordenanzas: el bautismo en agua de los que creyeron y la Santa Cena, memorial de su muerte hasta que él venga",
                clave: {
                  id: "pr-n4-sistematica-4-3-a6-1",
                  tipo: "corta",
                  pregunta: "Al final de la clase, ¿qué les dices en pocas palabras sobre el sentido del bautismo y de la Santa Cena?",
                  ideas: [
                    { id: "bautismo", peso: 50, texto: "El bautismo en agua es testimonio de que murieron al pecado y resucitaron a una vida nueva.", formas: ["murieron al pecado", "muert* al pecado", "mori* al pecado", "vida nueva", "nueva vida", "resucit* a una", "testimonio"] },
                    { id: "cena", peso: 50, texto: "La Santa Cena se celebra en memoria de Cristo, en comunión con él y con su pueblo, anunciando su muerte hasta que él venga.", formas: ["en memoria", "memoria de (cristo|jesus|el|mi|su)", "memorial", "recordar* (cristo|jesus|muerte)", "recuerd* (cristo|jesus|muerte)", "comunion", "hasta que (el|cristo|jesus) venga", "anunci* su (muerte|venida)"] },
                  ],
                  errores: [
                    { id: "agua-salva", texto: "El bautismo es un testimonio: las ordenanzas son señales de la gracia que se recibe por la fe.", formas: ["el agua (quita|lava|borra|limpia) (los|el|nuestros|sus|tus)", "el bautismo (salva|perdona)"], anula: "bautismo" },
                    { id: "cena-salva", texto: "La Santa Cena es memorial, comunión y anuncio de su venida, no una manera de ganar el perdón.", formas: ["(cena|pan) (salva|perdona)", "gana* (el|la) (perdon|salvacion)"], anula: "cena" },
                  ],
                  modelo: "El bautismo en agua es un testimonio de que murieron al pecado y resucitaron a una vida nueva. La Santa Cena se celebra en memoria de Cristo, en comunión con él y con su pueblo, anunciando su muerte hasta que él venga.",
                },
              },
            ],
          },
          {
            apoyo: "Cristo dejó a su iglesia dos ordenanzas, como enseña el artículo 8 de la declaración de fe",
            ref: "Mateo 28:18-20; 1 Corintios 11:23-26",
            titulo: "El domingo de bautismos",
            relato: [
              "Eres pastor asistente. El domingo habrá bautismos en agua, y el pastor te pide explicar el sentido de las ordenanzas antes de empezar.",
              "Entre los visitantes hay familiares de los que se van a bautizar. Algunos vienen de otras iglesias y nunca han visto un bautismo por inmersión.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo explicas de dónde vienen las dos ordenanzas?",
                opciones: [
                  { texto: "Cristo mismo las dejó a su iglesia: el bautismo y la Santa Cena.", bien: true, explica: "Cristo dejó a su iglesia dos ordenanzas: se llaman así porque Cristo las ordenó." },
                  { texto: "Las inventaron los primeros pastores para ordenar mejor el culto.", explica: "Las ordenanzas no las inventaron los pastores: Cristo las ordenó y las dejó a su iglesia." },
                  { texto: "Son costumbres de cada iglesia, y cada una puede cambiarlas a su gusto.", explica: "Cristo dejó a su iglesia dos ordenanzas, como enseña el artículo 8 de la declaración de fe." },
                ],
                apoyo: "La mayoría de los evangélicos habla de dos ordenanzas, porque Cristo las ordenó",
                explica: "Cristo dejó a su iglesia dos ordenanzas, el bautismo en agua y la Santa Cena. Se llaman ordenanzas porque Cristo las ordenó.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo se bautiza, según el artículo 8 de la declaración de fe?",
                opciones: [
                  { texto: "Por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo.", bien: true, explica: "El artículo 8 enseña el bautismo en agua, por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo." },
                  { texto: "Por inmersión, pero solo en el nombre del pastor que los va a bautizar.", explica: "Se bautiza en el nombre del Padre, del Hijo y del Espíritu Santo." },
                  { texto: "Con agua o sin agua, porque lo que importa es la intención de cada corazón.", explica: "Cristo dejó el bautismo en agua, por inmersión, de los que se arrepintieron y creyeron." },
                ],
                apoyo: "El bautismo en agua, por inmersión, de los que se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo",
                explica: "El bautismo es en agua, por inmersión, de los que se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo.",
              },
              {
                tipo: "situacion",
                pregunta: "Un familiar te pregunta: ¿Qué quiere decir que ellos se bauticen?",
                opciones: [
                  { texto: "Es testimonio de que murieron al pecado y resucitaron a una vida nueva.", bien: true, explica: "El bautismo es testimonio de que murieron al pecado y resucitaron a una vida nueva." },
                  { texto: "Es la manera de entrar al cielo, aunque no hayan creído en Cristo de verdad.", explica: "El bautismo es de los que se arrepintieron y creyeron: es testimonio de su vida nueva." },
                  { texto: "Es una costumbre bonita, pero no quiere decir nada en especial.", explica: "El bautismo tiene un sentido: es testimonio de que murieron al pecado y resucitaron a una vida nueva." },
                ],
                apoyo: "como testimonio de que murieron al pecado y resucitaron a una vida nueva",
                explica: "El bautismo en agua de los que se arrepintieron y creyeron es testimonio de que murieron al pecado y resucitaron a una vida nueva.",
              },
              {
                tipo: "explica",
                apoyo: "Y la Santa Cena, que se celebra «en memoria de mí», como comunión con Cristo y con su pueblo y como anuncio de su venida",
                clave: {
                  id: "pr-n4-sistematica-4-3-a6-2",
                  tipo: "corta",
                  pregunta: "El mes que viene la iglesia celebrará la Santa Cena. ¿Qué les explicarás a los recién bautizados sobre su sentido?",
                  ideas: [
                    { id: "memoria", peso: 35, texto: "Se celebra en memoria de Cristo.", formas: ["en memoria", "memoria de (cristo|jesus|el|mi|su)", "memorial", "recordar* (cristo|jesus|muerte)", "recuerd* (cristo|jesus|muerte)"] },
                    { id: "comunion", peso: 35, texto: "Es comunión con Cristo y con su pueblo.", formas: ["comunion", "unidos (a|con) cristo", "con su pueblo", "con los hermanos"] },
                    { id: "venida", peso: 30, texto: "Anuncia la muerte del Señor hasta que él venga.", formas: ["hasta que (el|cristo|jesus) venga", "anunci* (su|la) (muerte|venida)", "su venida", "hasta que vuelva", "volvera"] },
                  ],
                  errores: [
                    { id: "cena-salva", texto: "La Santa Cena es memorial, comunión y anuncio de su venida, no una manera de ganar el perdón.", formas: ["(cena|pan) (salva|perdona)", "gana* (el|la) (perdon|salvacion)"], anula: "memoria" },
                  ],
                  modelo: "La Santa Cena se celebra en memoria de Cristo. Es comunión con él y con su pueblo, y anuncia la muerte del Señor hasta que él venga.",
                },
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
            apoyo: "La misión de la iglesia es la gran comisión: ir, hacer discípulos, bautizarlos y enseñarles, con el poder del Espíritu Santo",
            ref: "Mateo 28:18-20; Hechos 1:8",
            clave: {
              id: "pr-n4-sistematica-4-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es la misión de la iglesia según la gran comisión, y con qué poder la cumple?",
              ideas: [
                { id: "discipulos", peso: 50, texto: "Hacer discípulos a todas las naciones: bautizarlos y enseñarles a guardar lo que Jesús mandó.", formas: ["hacer discipulos", "haced discipulos", "discipul*", "bautiz* y ensen*", "ensenarles", "predic* el evangelio", "todas las naciones"] },
                { id: "poder", peso: 50, texto: "La cumple con el poder del Espíritu Santo, no con sus fuerzas.", formas: ["poder del espiritu", "espiritu santo", "con (el|su) poder", "no con sus fuerzas", "no con (nuestras|sus|las) fuerzas", "no con (nuestras|sus|las) propias fuerzas"] },
              ],
              modelo: "La misión de la iglesia es hacer discípulos a todas las naciones: bautizarlos y enseñarles a guardar todo lo que Jesús mandó. Y no la cumple con sus fuerzas, sino con el poder del Espíritu Santo.",
            },
          },
          {
            apoyo: "La tarea no es solo que las personas crean, sino hacer discípulos",
            ref: "Mateo 28:18-20",
            clave: {
              id: "pr-n4-sistematica-4-3-a7-2",
              tipo: "corta",
              pregunta: "Según la gran comisión, ¿por qué no basta con que las personas crean, y qué prometió Jesús a los que la cumplen?",
              ideas: [
                { id: "discipulos", peso: 50, texto: "Porque la tarea es hacer discípulos: bautizarlos y enseñarles a guardar lo que Jesús mandó.", formas: ["hacer discipulos", "haced discipulos", "discipul*", "bautiz* y ensen*", "ensenarles", "guardar (todo|lo|todas)", "que guarden"] },
                { id: "presencia", peso: 50, texto: "Prometió estar con ellos todos los días, hasta el fin del mundo.", formas: ["todos los dias", "fin del mundo", "estar con (nosotros|ellos|vosotros|suyos|ustedes)", "estara con (nosotros|ellos|vosotros|suyos|ustedes)", "esta con (nosotros|ellos|vosotros|suyos|ustedes)", "estoy con (vosotros|ustedes|nosotros)", "su presencia"] },
              ],
              modelo: "Porque la tarea no es solo que crean, sino hacer discípulos: bautizarlos y enseñarles a guardar lo que Jesús mandó. Y Jesús prometió estar con ellos todos los días, hasta el fin del mundo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Los ángeles, Satanás y los demonios
    "n4-sistematica-4-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué son los ángeles, según Colosenses 1:16?", reverso: "Seres espirituales creados por Dios.", apoyo: "Los ángeles son seres espirituales creados por Dios" },
              { frente: "¿A favor de quiénes sirven los ángeles?", reverso: "De los que serán herederos de la salvación.", apoyo: "Son «espíritus ministradores, enviados para servicio a favor de los que serán herederos de la salvación»" },
              { frente: "¿Qué le dijo el ángel a Juan cuando quiso adorarlo?", reverso: "Que adorara a Dios.", apoyo: "cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios" },
              { frente: "¿Qué no inventa el líder sobre los ángeles?", reverso: "Nombres, jerarquías ni mensajes que la Escritura no da.", apoyo: "Hace bien el líder en no inventar nombres, jerarquías ni mensajes de ángeles que la Escritura no da" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Los ángeles son personas que murieron?", reverso: "No: son seres espirituales creados.", apoyo: "No son personas que murieron, y no se les adora" },
              { frente: "¿Qué ángeles nombra la Biblia?", reverso: "Pocos: Gabriel y el arcángel Miguel.", apoyo: "La Biblia nombra a pocos: Gabriel, que dijo «estoy delante de Dios», y «el arcángel Miguel»" },
              { frente: "¿Cómo llama el salmo a los ángeles?", reverso: "Poderosos en fortaleza, que ejecutan su palabra.", apoyo: "el salmo los llama «Poderosos en fortaleza, que ejecutáis su palabra»" },
              { frente: "¿Qué hacemos donde la Escritura calla sobre los ángeles?", reverso: "Callamos.", apoyo: "Aquí nos quedamos con lo que la Escritura dice, y donde ella calla, callamos" },
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
            consigna: "¿Lo enseña la Biblia sobre los ángeles o es una idea que no viene de ella? Lleva cada frase a su grupo.",
            grupos: ["Lo enseña la Biblia", "No viene de la Biblia"],
            frases: [
              { texto: "Son seres espirituales creados por Dios", grupo: 0 },
              { texto: "Sirven a favor de los herederos de la salvación", grupo: 0 },
              { texto: "Ejecutan la palabra de Dios", grupo: 0 },
              { texto: "Son personas buenas que murieron", grupo: 1 },
              { texto: "Se les puede adorar si nos ayudan", grupo: 1 },
              { texto: "Cada creyente puede conocer el nombre de su ángel", grupo: 1, explica: "La Biblia nombra a pocos, y el líder no inventa nombres de ángeles que la Escritura no da." },
            ],
            apoyo: "No son personas que murieron, y no se les adora",
            ref: "Hebreos 1:14; Salmos 103:20",
            explica: "Los ángeles son seres espirituales creados por Dios que sirven a favor de los herederos de la salvación. No son personas que murieron, no se les adora y el líder no inventa sus nombres.",
          },
          {
            consigna: "¿Lo dice la Escritura o es algo que el líder no debe inventar? Lleva cada frase a su grupo.",
            grupos: ["Lo dice la Escritura", "El líder no lo inventa"],
            frases: [
              { texto: "Gabriel dijo que está delante de Dios", grupo: 0 },
              { texto: "La Biblia nombra al arcángel Miguel", grupo: 0 },
              { texto: "Juan no debía adorar al ángel, sino a Dios", grupo: 0 },
              { texto: "Una lista con los nombres de muchos ángeles", grupo: 1 },
              { texto: "Mensajes nuevos que habría dado un ángel", grupo: 1 },
              { texto: "Jerarquías de ángeles que la Biblia no da", grupo: 1 },
            ],
            apoyo: "Hace bien el líder en no inventar nombres, jerarquías ni mensajes de ángeles que la Escritura no da",
            ref: "Lucas 1:19; Judas 1:9",
            explica: "La Biblia nombra a pocos: Gabriel y el arcángel Miguel. Donde la Escritura calla, callamos: el líder no inventa nombres, jerarquías ni mensajes de ángeles.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los ángeles tiene un error. Tócala.",
            frases: [
              "Los ángeles son seres espirituales creados por Dios.",
              "Los ángeles son enviados para servicio a favor de los herederos de la salvación.",
              "Cuando Juan quiso adorar a un ángel, el ángel aceptó su adoración.",
              "La Biblia nombra a pocos ángeles.",
            ],
            malo: 2,
            correccion: "Cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios.",
            apoyo: "cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios",
            ref: "Hebreos 1:14",
            explica: "A los ángeles no se les adora: cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios (Apocalipsis 22:8-9).",
          },
          {
            consigna: "Una de estas frases sobre los ángeles y la Escritura tiene un error. Tócala.",
            frases: [
              "Los ángeles no son personas que murieron.",
              "El salmo llama a los ángeles poderosos en fortaleza.",
              "La Biblia da los nombres de todos los ángeles y su orden.",
              "Gabriel dijo que está delante de Dios.",
            ],
            malo: 2,
            correccion: "La Biblia nombra a pocos: Gabriel y el arcángel Miguel. El líder no inventa nombres ni jerarquías de ángeles.",
            apoyo: "La Biblia nombra a pocos",
            ref: "Lucas 1:19; Judas 1:9",
            explica: "La Biblia nombra a pocos ángeles, Gabriel y el arcángel Miguel. Donde la Escritura calla, callamos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre la derrota del diablo.",
            texto: "El diablo es real, pero ya fue [[vencido]]: Cristo triunfó sobre los principados en la [[cruz]], y el creyente lo [[resiste]] firme en la fe.",
            distractores: ["perdonado", "ley", "teme"],
            errores: {
              perdonado: "El diablo no fue perdonado: ya fue vencido.",
              ley: "Cristo despojó a los principados y a las potestades, «triunfando sobre ellos en la cruz».",
              teme: "El creyente no vive con miedo, sino que obedece: «resistid firmes en la fe».",
            },
            apoyo: "Por eso el creyente no vive con miedo, sino que obedece: «resistid firmes en la fe»",
            ref: "Colosenses 2:15; 1 Pedro 5:8-9",
            explica: "El diablo es real, pero no es igual a Dios ni está fuera de su control, y ya fue vencido en la cruz. Por eso el creyente no vive con miedo: lo resiste firme en la fe.",
          },
          {
            consigna: "Completa lo que dice la Biblia de Satanás y sus ángeles.",
            texto: "El diablo es la serpiente antigua, que [[engaña]] al mundo entero; sus [[ángeles]] fueron arrojados con él, y Cristo los [[venció]] en la cruz.",
            distractores: ["salva", "profetas", "perdonó"],
            errores: {
              salva: "El diablo es «la serpiente antigua», «el cual engaña al mundo entero».",
              profetas: "Apocalipsis dice: «sus ángeles fueron arrojados con él».",
              "perdonó": "Cristo no los perdonó: los venció en la cruz.",
            },
            apoyo: "Satanás y los demonios son ángeles caídos que engañan y atacan, pero Cristo los venció en la cruz",
            ref: "Apocalipsis 12:9",
            explica: "El diablo es «la serpiente antigua», «el cual engaña al mundo entero», y «sus ángeles fueron arrojados con él». Pero Cristo los venció en la cruz.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué dice la Biblia de Satanás y de los que se relacionan con él? Elige la relación de cada enlace.",
            nodos: [
              { id: "s", texto: "Satanás", x: 50, y: 50 },
              { id: "m", texto: "El mundo entero", x: 50, y: 10 },
              { id: "a", texto: "Sus ángeles", x: 12, y: 30 },
              { id: "c", texto: "Cristo", x: 88, y: 30 },
              { id: "f", texto: "El creyente", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "s", a: "m", relacion: "engaña a" },
              { de: "a", a: "s", relacion: "fueron arrojados con" },
              { de: "c", a: "s", relacion: "triunfó en la cruz sobre" },
              { de: "f", a: "s", relacion: "resiste firme en la fe a" },
            ],
            distractores: ["vive con miedo de", "es igual a"],
            apoyo: "Satanás y los demonios son ángeles caídos que engañan y atacan, pero Cristo los venció en la cruz",
            ref: "Apocalipsis 12:9; Colosenses 2:15",
            explica: "Satanás engaña al mundo entero, y sus ángeles fueron arrojados con él. Pero Cristo triunfó sobre ellos en la cruz, y el creyente lo resiste firme en la fe, sin miedo.",
          },
          {
            consigna: "¿Quién tiene el control y quién ya venció? Elige la relación de cada enlace.",
            nodos: [
              { id: "d", texto: "El diablo", x: 50, y: 50 },
              { id: "g", texto: "Dios", x: 50, y: 10 },
              { id: "c", texto: "Cristo", x: 12, y: 80 },
              { id: "p", texto: "Los principados y las potestades", x: 50, y: 90 },
              { id: "f", texto: "El creyente", x: 88, y: 30 },
            ],
            enlaces: [
              { de: "g", a: "d", relacion: "tiene bajo su control a" },
              { de: "c", a: "p", relacion: "despojó en la cruz a" },
              { de: "f", a: "d", relacion: "resiste firme a" },
            ],
            distractores: ["es igual a", "tiene miedo de"],
            apoyo: "Pero no es igual a Dios ni está fuera de su control, y ya fue vencido",
            ref: "Colosenses 2:15; 1 Pedro 5:8-9",
            explica: "El diablo no es igual a Dios ni está fuera de su control. Cristo despojó a los principados y a las potestades, triunfando sobre ellos en la cruz, y el creyente lo resiste firme en la fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo, no en el diablo",
            ref: "1 Pedro 5:8-9",
            situacion: "Eres líder de una célula. Un hermano nuevo ve demonios detrás de cada problema, y el grupo empieza a hablar más del diablo que de Cristo.",
            escenas: [
              {
                id: "e1",
                narra: "En la reunión, el hermano dice: Se me dañó el carro; seguro fue un demonio. Hay que reprenderlo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le recuerdas que el enemigo ya fue vencido, y los guías a mirar a Cristo.", valor: 2, explica: "El líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo, no en el diablo.", siguiente: "e2" },
                  { texto: "Le pides que mejor no hablen de eso, y cambias de tema enseguida en la reunión.", valor: 1, explica: "Así no le das demasiada atención, pero tampoco enseñas lo que dice la Biblia: el enemigo existe y fue vencido.", siguiente: "e2" },
                  { texto: "Dedicas la reunión a hablar de los demonios y de todo lo que pueden hacer.", valor: 0, explica: "Ese es uno de los dos errores: interesarse en los demonios de manera excesiva y malsana.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al terminar, varios del grupo dicen que ahora tienen miedo de volver a su casa.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que Cristo ya triunfó, y el creyente no vive con miedo.", valor: 2, explica: "Cristo despojó «a los principados y a las potestades», «triunfando sobre ellos en la cruz»: el creyente no vive con miedo, sino que obedece.", siguiente: "e2" },
                  { texto: "Que hacen bien en temer, porque el diablo es tan fuerte como Dios.", valor: 0, explica: "El diablo es real, pero no es igual a Dios ni está fuera de su control, y ya fue vencido.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una semana después, otro miembro dice: Yo no creo en el diablo; eso es un cuento para asustar a los niños.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el diablo es real, pero Cristo ya lo venció en la cruz.", valor: 2, explica: "El enemigo es real, pero Cristo ya triunfó: el líder no niega el mundo espiritual ni le da demasiada atención." },
                  { texto: "Que eso no importa mucho, mientras ame a Dios y a su prójimo.", valor: 1, explica: "Amar a Dios es lo central, pero la Biblia enseña que el diablo es real: «como león rugiente, anda alrededor buscando a quien devorar»." },
                  { texto: "Que tiene razón: hoy ya nadie cree en esas cosas tan antiguas.", valor: 0, explica: "Ese es el error opuesto: no creer en los demonios." },
                ],
              },
              {
                id: "e3",
                narra: "Quieres preparar una enseñanza sobre este tema para la próxima reunión.",
                pregunta: "¿Qué enfoque eliges?",
                opciones: [
                  { texto: "El enemigo existe y fue vencido, y ponemos los ojos en Cristo.", valor: 2, explica: "Así lo enseña la lección: el líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo, no en el diablo." },
                  { texto: "Una lista de versículos sobre el diablo, sin llegar a hablar de la cruz.", valor: 1, explica: "Los versículos ayudan, pero falta lo central: Cristo ya triunfó en la cruz." },
                  { texto: "Los nombres y rangos de los demonios que traen otros libros y videos.", valor: 0, explica: "Donde la Escritura calla, callamos: el líder no inventa nombres ni jerarquías." },
                ],
              },
            ],
          },
          {
            apoyo: "El creyente los resiste firme en la fe, sin negar el mundo espiritual y sin darle más atención que la que le da la Biblia",
            ref: "Colosenses 2:15",
            situacion: "Eres maestro de jóvenes y vas a dar una clase sobre el mundo espiritual. En el grupo hay de todo: unos se ríen del tema y otros están obsesionados con él.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven dice: El diablo es solo un símbolo del mal; no existe de verdad.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la Biblia enseña que el diablo es real, aunque ya fue vencido.", valor: 2, explica: "El diablo es real: «como león rugiente, anda alrededor buscando a quien devorar». Pero ya fue vencido." },
                  { texto: "Que lean juntos 1 Pedro 5:8 en la clase, y que después lo conversen con calma.", valor: 1, explica: "Leer la Escritura es bueno, pero falta decirle lo que ella enseña: el enemigo es real, y Cristo ya triunfó." },
                  { texto: "Que tiene razón: hoy ningún cristiano serio cree que el diablo existe.", valor: 0, explica: "Ese es uno de los dos errores opuestos: no creer en los demonios." },
                ],
              },
              {
                id: "e2",
                narra: "Otra joven cuenta que pasa horas viendo videos sobre demonios y posesiones.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que ponga los ojos en Cristo, no en el diablo, y deje ese interés.", valor: 2, explica: "El líder pone los ojos en Cristo, no en el diablo: interesarse en los demonios de manera excesiva y malsana es uno de los dos errores." },
                  { texto: "Que vea menos videos, aunque siga buscando todo lo que pueda del tema.", valor: 1, explica: "Ver menos ayuda, pero el problema es el interés excesivo y malsano: hay que poner los ojos en Cristo." },
                  { texto: "Que siga: cuanto más sepa de los demonios, más fuerte será su fe.", valor: 0, explica: "Interesarse en los demonios de manera excesiva y malsana es uno de los dos errores opuestos." },
                ],
              },
              {
                id: "e3",
                narra: "Al final de la clase, alguien pregunta: Entonces, ¿le tenemos miedo al diablo o no?",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Que no: Cristo ya lo venció, y lo resistimos firmes en la fe.", valor: 2, explica: "Cristo despojó «a los principados y a las potestades», «triunfando sobre ellos en la cruz». Por eso el creyente no vive con miedo: «resistid firmes en la fe»." },
                  { texto: "Que un poco de miedo es bueno, para que nunca nos descuidemos en nada.", valor: 1, explica: "El creyente no se descuida, pero no vive con miedo, sino que obedece: «resistid firmes en la fe»." },
                  { texto: "Que sí: anda suelto por el mundo entero, y ni Dios lo puede detener.", valor: 0, explica: "El diablo no es igual a Dios ni está fuera de su control, y ya fue vencido." },
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
            apoyo: "C. S. Lewis advirtió, en el prólogo de Cartas del diablo a su sobrino, sobre dos errores opuestos: no creer en los demonios, o interesarse en ellos de manera excesiva y malsana",
            ref: "1 Pedro 5:8-9",
            clave: {
              id: "pr-n4-sistematica-4-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cuáles son los dos errores opuestos sobre los demonios, y qué hace el líder para evitarlos?",
              ideas: [
                { id: "negar", peso: 35, texto: "Uno es no creer en los demonios: negar el mundo espiritual.", formas: ["no creer en (los|el|ellos)", "no cree* en (los|el|ellos)", "no creer que (existen|existan)", "negar (el|que|su|la|los)", "niega* (el|que|su|la|los)", "negarlo", "negarlos", "no exist*", "no son reales", "no es real", "incredul*"] },
                { id: "exceso", peso: 35, texto: "El otro es interesarse en ellos de manera excesiva y malsana: darles demasiada atención.", formas: ["excesiv*", "malsan*", "demasiad* atencion", "demasiado interes", "obsesion*", "darle* (mucha|demasiada|mas) atencion", "ver demonios en todo"] },
                { id: "cristo", peso: 30, texto: "El líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo.", formas: ["ojos en cristo", "mira* a cristo", "fue vencido", "esta vencido", "cristo (lo|los) vencio", "cristo ya (lo|los) vencio", "cristo ya triunfo", "cristo triunfo", "venci* en la cruz", "triunf* en la cruz"] },
              ],
              modelo: "Un error es no creer en los demonios, negar el mundo espiritual. El otro es interesarse en ellos de manera excesiva y malsana. El líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo.",
            },
          },
          {
            apoyo: "El enemigo es real, pero Cristo ya triunfó",
            ref: "Colosenses 2:15; 1 Pedro 5:8-9",
            clave: {
              id: "pr-n4-sistematica-4-4-a7-2",
              tipo: "corta",
              pregunta: "Un grupo de tu iglesia tiene miedo del diablo. ¿Qué les enseñas, según la lección?",
              ideas: [
                { id: "real", peso: 30, texto: "Que el diablo es real: como león rugiente, anda buscando a quien devorar.", formas: ["es real", "existe", "leon rugiente", "anda alrededor", "busca* a quien devorar"] },
                { id: "vencido", peso: 40, texto: "Pero ya fue vencido: Cristo triunfó en la cruz, y el diablo no es igual a Dios ni está fuera de su control.", formas: ["vencido", "vencio", "triunf*", "despoj*", "control de dios", "su control", "bajo (el|su) control", "no es igual a dios", "en la cruz"] },
                { id: "resistir", peso: 30, texto: "Por eso el creyente no vive con miedo, sino que lo resiste firme en la fe.", formas: ["resist*", "firmes en la fe", "firme en la fe", "sin miedo", "no (vive|vivimos|viven|vivan) con miedo", "no (tener|tengan|tenemos|tienen) miedo", "no (temer|teman|tememos)"] },
              ],
              modelo: "Les enseño que el diablo es real, pero que ya fue vencido: Cristo triunfó sobre los principados en la cruz, y el diablo no está fuera del control de Dios. Por eso no vivimos con miedo: lo resistimos firmes en la fe.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La muerte, el estado intermedio y la resurrección
    "n4-sistematica-4-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas veces muere el ser humano, según Hebreos 9:27?", reverso: "Una sola vez: no hay lugar para la reencarnación.", apoyo: "está establecido «que mueran una sola vez, y después de esto el juicio»" },
              { frente: "¿Dónde está el creyente entre la muerte y la resurrección?", reverso: "Con Cristo, consciente y en paz.", apoyo: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz" },
              { frente: "¿Para qué cuenta Jesús el relato del rico y Lázaro?", reverso: "Para advertir, más que para describir cada detalle.", apoyo: "aunque Jesús lo cuenta para advertir más que para describir cada detalle" },
              { frente: "¿Qué esperan los que mueren sin Cristo?", reverso: "El juicio, separados de Dios.", apoyo: "Los que mueren sin Cristo esperan el juicio separados de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué la Biblia no deja lugar a la reencarnación?", reverso: "Porque morimos una sola vez, y después viene el juicio.", apoyo: "Por eso la Biblia no deja lugar a la reencarnación" },
              { frente: "¿Qué quería Pablo, según 2 Corintios 5:8?", reverso: "Estar ausente del cuerpo y presente al Señor.", apoyo: "quería estar «ausentes del cuerpo, y presentes al Señor»" },
              { frente: "Junto a una tumba, ¿de dónde tiene que salir lo que diga el líder?", reverso: "De la Escritura.", apoyo: "Lo que diga ese día tiene que salir de la Escritura" },
              { frente: "¿Qué le dijo Jesús al ladrón arrepentido?", reverso: "Que ese mismo día estaría con él en el paraíso.", apoyo: "Jesús le dijo al ladrón arrepentido: «hoy estarás conmigo en el paraíso»" },
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
            consigna: "¿Cuántas veces mueren los hombres, y qué viene después? Toca las palabras que lo dicen.",
            texto: "que mueran [[una sola vez]], y después de esto [[el juicio]]",
            apoyo: "está establecido «que mueran una sola vez, y después de esto el juicio»",
            ref: "Hebreos 9:27",
            explica: "Está establecido que los hombres mueran una sola vez, y después de esto el juicio: por eso la Biblia no deja lugar a la reencarnación.",
          },
          {
            consigna: "¿Qué le prometió Jesús al ladrón arrepentido? Toca cuándo, con quién y dónde estaría.",
            texto: "[[hoy]] estarás [[conmigo]] en el [[paraíso]]",
            apoyo: "Jesús le dijo al ladrón arrepentido: «hoy estarás conmigo en el paraíso»",
            ref: "Lucas 23:43",
            explica: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz: «hoy estarás conmigo en el paraíso».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la muerte tiene un error. Tócala.",
            frases: [
              "La muerte no es el final.",
              "La muerte es un nuevo comienzo en otra vida.",
              "Está establecido que los hombres mueran una sola vez.",
              "Después de la muerte viene el juicio.",
            ],
            malo: 1,
            correccion: "La muerte no es el final, ni un nuevo comienzo en otra vida: morimos una sola vez, y después viene el juicio.",
            apoyo: "La muerte no es el final, ni un nuevo comienzo en otra vida",
            ref: "Hebreos 9:27",
            explica: "Está establecido que los hombres mueran «una sola vez, y después de esto el juicio»: por eso la Biblia no deja lugar a la reencarnación.",
          },
          {
            consigna: "Una de estas frases sobre lo que pasa después de la muerte tiene un error. Tócala.",
            frases: [
              "Entre la muerte y la resurrección, el creyente está con Cristo.",
              "El creyente que murió está consciente y en paz.",
              "Los que mueren sin Cristo esperan el juicio separados de Dios.",
              "Al morir, el creyente pierde la conciencia hasta la resurrección.",
            ],
            malo: 3,
            correccion: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz.",
            apoyo: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz",
            ref: "Filipenses 1:21-23; 2 Corintios 5:8",
            explica: "Pablo deseaba «partir y estar con Cristo, lo cual es muchísimo mejor», y quería estar «ausentes del cuerpo, y presentes al Señor».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿A cuál de los tres errores pertenece cada frase? Lleva cada frase a su grupo.",
            grupos: ["La reencarnación", "El sueño del alma", "El purgatorio"],
            frases: [
              { texto: "Volver a nacer en otra vida", grupo: 0 },
              { texto: "Contradice que morimos una sola vez", grupo: 0 },
              { texto: "Un nuevo comienzo en otra vida después de morir", grupo: 0 },
              { texto: "El muerto no tiene conciencia hasta la resurrección", grupo: 1 },
              { texto: "Lo enseñan los adventistas y los testigos de Jehová", grupo: 1 },
              { texto: "Una purificación después de la muerte", grupo: 2 },
              { texto: "Lo enseña la iglesia católica", grupo: 2 },
            ],
            apoyo: "La Biblia no enseña la reencarnación, el sueño del alma ni el purgatorio",
            explica: "La reencarnación contradice que morimos una sola vez; el sueño del alma, que enseñan los adventistas y los testigos de Jehová, dice que el muerto no tiene conciencia; y el purgatorio, que enseña la iglesia católica, sería una purificación después de la muerte.",
          },
          {
            consigna: "¿Lo enseña la Biblia o es un error sobre lo que pasa después de la muerte? Lleva cada frase a su grupo.",
            grupos: ["Lo enseña la Biblia", "Es un error"],
            frases: [
              { texto: "Morimos una sola vez, y después viene el juicio", grupo: 0 },
              { texto: "El creyente que muere está con Cristo, consciente y en paz", grupo: 0 },
              { texto: "La obra de Cristo basta para limpiar al creyente", grupo: 0 },
              { texto: "El alma vuelve a nacer en otro cuerpo", grupo: 1 },
              { texto: "El muerto queda sin conciencia hasta la resurrección", grupo: 1 },
              { texto: "El creyente necesita una purificación después de morir", grupo: 1 },
            ],
            apoyo: "la obra de Cristo basta para limpiar al creyente",
            ref: "Hebreos 9:27; 2 Corintios 5:8",
            explica: "Morimos una sola vez; el creyente está con Cristo, consciente y en paz; y la obra de Cristo basta para limpiarlo. La reencarnación, el sueño del alma y el purgatorio no los enseña la Biblia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es un cuerpo espiritual.",
            texto: "Un cuerpo espiritual es un cuerpo lleno de la [[vida]] del Espíritu, como el de Jesús resucitado, que [[comió]] con sus discípulos y se dejó [[tocar]].",
            distractores: ["sombra", "ayunó", "olvidar"],
            errores: {
              sombra: "Un cuerpo espiritual no es un fantasma ni una sombra: es un cuerpo lleno de la vida del Espíritu.",
              "ayunó": "Jesús resucitado comió con sus discípulos (Lucas 24:39-43).",
              olvidar: "Jesús resucitado se dejó tocar: su cuerpo era real.",
            },
            apoyo: "Un «cuerpo espiritual» no es un fantasma, sino un cuerpo lleno de la vida del Espíritu, como el de Jesús resucitado, que comió con sus discípulos y se dejó tocar",
            ref: "1 Corintios 15:42-44",
            explica: "El cuerpo resucitado será el mismo y a la vez transformado. Un cuerpo espiritual no es un fantasma, sino un cuerpo lleno de la vida del Espíritu, como el de Jesús, que comió con sus discípulos y se dejó tocar.",
          },
          {
            consigna: "Completa lo que enseña la lección sobre la resurrección.",
            texto: "Todos resucitarán: unos para [[vida]] y otros para condenación, y el [[cuerpo]] del creyente será transformado, incorruptible y [[glorioso]].",
            distractores: ["olvido", "recuerdo", "invisible"],
            errores: {
              olvido: "Jesús enseñó que unos «saldrán a resurrección de vida», y otros, «a resurrección de condenación».",
              recuerdo: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo.",
              invisible: "El cuerpo del creyente será transformado, incorruptible y glorioso, como el de Jesús, que se dejó tocar.",
            },
            apoyo: "Todos resucitarán, unos para vida y otros para condenación, y el cuerpo del creyente será transformado, incorruptible y glorioso",
            ref: "Juan 5:28-29; 1 Corintios 15:42-44",
            explica: "Todos resucitarán, unos para vida y otros para condenación. El cuerpo del creyente será el mismo y a la vez transformado: «Se siembra en corrupción, resucitará en incorrupción».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Junto a una tumba, la esperanza cristiana tiene nombre: resurrección",
            ref: "Filipenses 1:21-23; 1 Corintios 15:42-44",
            titulo: "Junto a la tumba de doña Marta",
            relato: [
              "Doña Marta, una hermana fiel de la iglesia, murió esta semana después de una larga enfermedad. El pastor está de viaje y te pide acompañar a la familia en el entierro.",
              "Su nieto Daniel, de quince años, te pregunta al llegar: ¿Dónde está mi abuela ahora? ¿Se acabó todo?",
              "Su hija Rosa está muy triste, porque una vecina le dijo que su mamá tal vez vuelva a nacer en otra vida.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a Daniel sobre dónde está su abuela?",
                opciones: [
                  { texto: "Que está con Cristo, consciente y en paz, porque creyó en él.", bien: true, explica: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz." },
                  { texto: "Que está dormida y no sabe nada hasta el día de la resurrección.", explica: "Ese es el sueño del alma: Pablo esperaba estar «presentes al Señor»." },
                  { texto: "Que tal vez se está purificando antes de poder ver a Dios.", explica: "El purgatorio no aparece en la Escritura: la obra de Cristo basta para limpiar al creyente." },
                ],
                apoyo: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz",
                explica: "Pablo deseaba «partir y estar con Cristo, lo cual es muchísimo mejor»: el creyente que muere está con Cristo, consciente y en paz.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices a Rosa sobre lo que le dijo la vecina?",
                opciones: [
                  { texto: "Que la Biblia dice que morimos una sola vez: no vuelve a nacer en otra vida.", bien: true, explica: "La reencarnación contradice que morimos «una sola vez»." },
                  { texto: "Que puede ser, porque en realidad nadie sabe bien lo que pasa después de la muerte.", explica: "Lo que el líder dice junto a una tumba sale de la Escritura, y la Escritura sí lo dice: morimos una sola vez." },
                  { texto: "Que no le haga caso a nadie, y que mejor trate de no pensar en la muerte.", explica: "Junto a una tumba, la esperanza cristiana tiene nombre: el líder la anuncia con la Escritura." },
                ],
                apoyo: "La reencarnación contradice que morimos «una sola vez»",
                explica: "Está establecido que los hombres «mueran una sola vez, y después de esto el juicio»: la Biblia no deja lugar a la reencarnación.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es la esperanza que anuncias junto a la tumba?",
                opciones: [
                  { texto: "La resurrección del cuerpo: resucitará incorruptible y glorioso.", bien: true, explica: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo." },
                  { texto: "Que solo su alma sigue viva, y que el cuerpo ya no importa para nada.", explica: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo." },
                  { texto: "Que su recuerdo vivirá para siempre en el corazón de toda la familia.", explica: "El recuerdo es valioso, pero la esperanza cristiana tiene nombre: resurrección." },
                ],
                apoyo: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo",
                explica: "Junto a una tumba, la esperanza cristiana tiene nombre: resurrección. «Se siembra en corrupción, resucitará en incorrupción».",
              },
              {
                tipo: "explica",
                apoyo: "Junto a una tumba, la esperanza cristiana tiene nombre: resurrección",
                clave: {
                  id: "pr-n4-sistematica-4-5-a6-1",
                  tipo: "corta",
                  pregunta: "Rosa te pide unas palabras para la familia. ¿Qué les dices, con la Escritura, sobre doña Marta y la esperanza?",
                  ideas: [
                    { id: "concristo", peso: 50, texto: "Doña Marta está con Cristo, consciente y en paz: partir y estar con Cristo es muchísimo mejor.", formas: ["con cristo", "con el senor", "presente* al senor", "con jesus", "en el paraiso", "conscient*", "muchisimo mejor"] },
                    { id: "resurreccion", peso: 50, texto: "Y la esperanza es la resurrección: su cuerpo resucitará incorruptible y glorioso.", formas: ["resurrec*", "resucit*", "incorrup*", "cuerpo glorioso", "glorios*", "cuerpo transformado"] },
                  ],
                  modelo: "Doña Marta está con Cristo, consciente y en paz, porque partir y estar con Cristo es muchísimo mejor. Y nuestra esperanza tiene nombre: resurrección. Su cuerpo, que hoy se siembra en corrupción, resucitará incorruptible y glorioso.",
                },
              },
            ],
          },
          {
            apoyo: "Lo que diga ese día tiene que salir de la Escritura",
            ref: "2 Corintios 5:8; 1 Corintios 15:42-44",
            titulo: "La pregunta de la hermana Carmen",
            relato: [
              "Visitas cada semana a la hermana Carmen, una creyente de ochenta años que está muy enferma. Hoy te recibe con su Biblia abierta.",
              "Te dice: No le tengo miedo a la muerte, pero quiero entender. ¿Qué me pasará cuando muera?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre lo que pasará después de morir?",
                opciones: [
                  { texto: "Que estará con Cristo, consciente y en paz: eso es muchísimo mejor.", bien: true, explica: "Pablo deseaba «partir y estar con Cristo, lo cual es muchísimo mejor»." },
                  { texto: "Que volverá a nacer en otra vida, para seguir aprendiendo lo que le falta.", explica: "La reencarnación contradice que morimos «una sola vez»." },
                  { texto: "Que quedará sin conciencia hasta el día de la resurrección.", explica: "Ese es el sueño del alma: Pablo esperaba estar «presentes al Señor»." },
                ],
                apoyo: "Pablo deseaba «partir y estar con Cristo, lo cual es muchísimo mejor»",
                explica: "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz.",
              },
              {
                tipo: "situacion",
                pregunta: "Carmen pregunta: ¿Tendré que pasar un tiempo purificándome antes de ver al Señor?",
                opciones: [
                  { texto: "No: la obra de Cristo basta para limpiar al creyente.", bien: true, explica: "El purgatorio no aparece en la Escritura: la obra de Cristo basta para limpiar al creyente." },
                  { texto: "Sí: todo creyente necesita purificarse después de la muerte.", explica: "El purgatorio, que la iglesia católica enseña como una purificación después de la muerte, no aparece en la Escritura." },
                  { texto: "Depende de cuántas buenas obras haya hecho usted en su vida.", explica: "La obra de Cristo basta para limpiar al creyente." },
                ],
                apoyo: "la obra de Cristo basta para limpiar al creyente",
                explica: "La obra de Cristo basta para limpiar al creyente: el que muere en Cristo está con él, consciente y en paz.",
              },
              {
                tipo: "situacion",
                pregunta: "Carmen pregunta: ¿Y qué pasará con este cuerpo tan cansado?",
                opciones: [
                  { texto: "Resucitará transformado, incorruptible, como el de Jesús resucitado.", bien: true, explica: "El cuerpo resucitado será el mismo y a la vez transformado: «Se siembra en corrupción, resucitará en incorrupción»." },
                  { texto: "Se quedará en la tumba para siempre, porque lo que importa es el alma.", explica: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo." },
                  { texto: "Volverá igual que ahora, con la misma enfermedad y el mismo cansancio.", explica: "El cuerpo resucitado será el mismo y a la vez transformado, incorruptible." },
                ],
                apoyo: "El cuerpo resucitado será el mismo y a la vez transformado",
                explica: "El cuerpo resucitado será el mismo y a la vez transformado: lleno de la vida del Espíritu, como el de Jesús resucitado.",
              },
              {
                tipo: "explica",
                apoyo: "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo",
                clave: {
                  id: "pr-n4-sistematica-4-5-a6-2",
                  tipo: "corta",
                  pregunta: "Carmen te pide que le escribas en una tarjeta lo que le dijiste. ¿Qué le escribes?",
                  ideas: [
                    { id: "concristo", peso: 50, texto: "Al morir estará con Cristo, consciente y en paz, presente al Señor.", formas: ["con cristo", "con el senor", "presente* al senor", "con jesus", "en el paraiso", "conscient*", "muchisimo mejor"] },
                    { id: "resurreccion", peso: 50, texto: "Su cuerpo resucitará transformado, incorruptible y glorioso.", formas: ["resurrec*", "resucit*", "incorrup*", "cuerpo glorioso", "glorios*", "cuerpo transformado", "transformad*"] },
                  ],
                  modelo: "Querida Carmen: cuando muera, usted estará con Cristo, consciente y en paz, presente al Señor. Y su cuerpo cansado resucitará transformado, incorruptible y glorioso, como el de Jesús resucitado.",
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
            apoyo: "La reencarnación contradice que morimos «una sola vez»",
            ref: "Hebreos 9:27; 2 Corintios 5:8",
            clave: {
              id: "pr-n4-sistematica-4-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la Biblia no deja lugar a la reencarnación ni al sueño del alma?",
              ideas: [
                { id: "vez", peso: 50, texto: "Porque está establecido que los hombres mueran una sola vez, y después de esto el juicio.", formas: ["una sola vez", "(morimos|mueren|muere|morir|mueran) solo una", "(morimos|mueren|muere|morir|mueran) solamente una", "despues de esto el juicio", "viene el juicio", "despues el juicio"] },
                { id: "presentes", peso: 50, texto: "Porque Pablo esperaba estar ausente del cuerpo y presente al Señor: el creyente está con Cristo, consciente.", formas: ["presente* al senor", "ausente* del cuerpo", "con cristo", "conscient*", "con el senor", "en el paraiso", "partir y estar"] },
              ],
              modelo: "Porque está establecido que los hombres mueran una sola vez, y después de esto el juicio. Y porque Pablo esperaba estar ausente del cuerpo y presente al Señor: el creyente que muere está con Cristo, consciente.",
            },
          },
          {
            apoyo: "y el purgatorio, que la iglesia católica enseña como una purificación después de la muerte, no aparece en la Escritura: la obra de Cristo basta para limpiar al creyente",
            ref: "Hebreos 9:27",
            clave: {
              id: "pr-n4-sistematica-4-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña el purgatorio, y por qué la lección dice que no es bíblico?",
              ideas: [
                { id: "purificacion", peso: 50, texto: "Enseña una purificación después de la muerte.", formas: ["purific*", "purgar*", "limpi* despues", "despues de la muerte", "despues de morir"] },
                { id: "obra", peso: 50, texto: "No aparece en la Escritura: la obra de Cristo basta para limpiar al creyente.", formas: ["obra de cristo", "cristo basta", "basta para limpiar", "no aparece en la (escritura|biblia)", "sangre de cristo", "cristo ya (nos|lo|los) limpi*"] },
              ],
              modelo: "El purgatorio enseña una purificación después de la muerte. Pero no aparece en la Escritura, porque la obra de Cristo basta para limpiar al creyente.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La venida de Cristo, el juicio y la eternidad
    "n4-sistematica-4-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo volverá Cristo, según confiesan todos los cristianos?", reverso: "En persona y de manera visible.", apoyo: "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible" },
              { frente: "¿Quién sabe el día y la hora de la venida de Cristo?", reverso: "Nadie, ni aun los ángeles de los cielos.", apoyo: "«del día y la hora nadie sabe, ni aun los ángeles de los cielos»" },
              { frente: "¿Qué pasó con todos los que anunciaron una fecha?", reverso: "Se equivocaron.", apoyo: "Todos los que han anunciado una fecha se han equivocado" },
              { frente: "¿A qué nos llama Jesús mientras esperamos su venida?", reverso: "A velar y a estar preparados.", apoyo: "El llamado de Jesús es a velar y a estar preparados" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo llama Tito 2:13 a la venida de Cristo?", reverso: "La esperanza bienaventurada de la iglesia.", apoyo: "Su venida es «la esperanza bienaventurada» de la iglesia" },
              { frente: "¿Qué dice Hechos 1:11 de la venida de Jesús?", reverso: "Que este mismo Jesús vendrá así como lo vieron ir al cielo.", apoyo: "«Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo»" },
              { frente: "¿Por dónde empieza el líder al hablar de los últimos tiempos?", reverso: "Por lo que la Biblia dice con claridad.", apoyo: "El líder empieza por lo que la Biblia dice con claridad" },
              { frente: "¿Qué promete Dios a los redimidos?", reverso: "Un cielo nuevo y una tierra nueva, donde él morará con ellos.", apoyo: "Para los redimidos, Dios promete «un cielo nuevo y una tierra nueva», donde «él morará con ellos»" },
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
            consigna: "Completa lo que confiesan todos los cristianos sobre la venida de Cristo.",
            texto: "Todos los cristianos confiesan que Cristo volverá en [[persona]] y de manera [[visible]]: su venida es la [[esperanza]] bienaventurada de la iglesia.",
            distractores: ["espíritu", "simbólica", "amenaza"],
            errores: {
              "espíritu": "Cristo volverá en persona: «Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo».",
              "simbólica": "Todos los cristianos confiesan que Cristo volverá de manera visible.",
              amenaza: "Su venida es «la esperanza bienaventurada» de la iglesia.",
            },
            apoyo: "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible",
            ref: "Hechos 1:11; Tito 2:13",
            explica: "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible, así como lo vieron ir al cielo. Su venida es «la esperanza bienaventurada» de la iglesia.",
          },
          {
            consigna: "Completa lo que pide Jesús mientras esperamos su venida.",
            texto: "Nadie sabe el día de la venida de Cristo: todos los que anunciaron una [[fecha]] se equivocaron, y el llamado de Jesús es a [[velar]] y a estar preparados.",
            distractores: ["esperanza", "dormir"],
            errores: {
              esperanza: "Su venida es «la esperanza bienaventurada»; los que se equivocaron son los que anunciaron una fecha.",
              dormir: "El llamado de Jesús es a velar y a estar preparados.",
            },
            apoyo: "Todos los que han anunciado una fecha se han equivocado",
            ref: "Mateo 24:36",
            explica: "«del día y la hora nadie sabe, ni aun los ángeles de los cielos». Todos los que han anunciado una fecha se han equivocado; el llamado de Jesús es a velar y a estar preparados.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Vi en internet a un predicador que ya calculó el año exacto de la venida de Cristo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que nadie sabe el día ni la hora: Jesús nos llama a velar y a estar preparados.", bien: true, explica: "«del día y la hora nadie sabe, ni aun los ángeles de los cielos»: el llamado de Jesús es a velar y a estar preparados." },
              { texto: "Que lo anote, porque con tantos cálculos esta vez sí puede acertar la fecha.", explica: "Nadie puede poner fecha: todos los que han anunciado una fecha se han equivocado." },
              { texto: "Que deje de esperar la venida de Cristo, porque nadie puede saber cuándo será.", explica: "Nadie sabe el día, pero la venida de Cristo es «la esperanza bienaventurada» de la iglesia." },
              { texto: "Que le crea al predicador, porque estudió mucho la Biblia y sabe más que los demás.", explica: "Ni aun los ángeles de los cielos saben el día y la hora: nadie puede poner fecha." },
            ],
            apoyo: "Nadie puede poner fecha",
            ref: "Mateo 24:36",
            explica: "Nadie puede poner fecha, y todos los que han anunciado una se han equivocado. La esperanza de la venida de Cristo no es para especular, sino para vivir preparado.",
          },
          {
            caso: "Un joven nuevo de tu célula te dice: Eso de que Jesús va a volver es solo una forma de hablar; no vendrá de verdad.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Jesús volverá en persona y de manera visible, como lo vieron ir al cielo.", bien: true, explica: "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible." },
              { texto: "Que tiene razón: la venida de Cristo es solo una idea bonita para animarnos a todos.", explica: "La venida de Cristo no es una idea: es «la esperanza bienaventurada» de la iglesia." },
              { texto: "Que Jesús volverá solamente en el corazón de cada una de las personas que creen.", explica: "Cristo volverá en persona: «Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo»." },
              { texto: "Que nadie puede saber si volverá, así que mejor no hablar más de eso.", explica: "Nadie sabe el día ni la hora, pero todos los cristianos confiesan que Cristo volverá." },
            ],
            apoyo: "«Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo»",
            ref: "Hechos 1:11",
            explica: "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible, como lo vieron ir al cielo: su venida es la esperanza de la iglesia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Pablo, ¿quiénes resucitarán primero? Toca las palabras que lo dicen.",
            texto: "[[los muertos en Cristo]] resucitarán primero",
            apoyo: "Pablo enseña que «los muertos en Cristo resucitarán primero»",
            ref: "1 Tesalonicenses 4:16-17",
            explica: "Pablo enseña que «los muertos en Cristo resucitarán primero», y que los creyentes que vivan serán arrebatados juntamente con ellos para recibir al Señor.",
          },
          {
            consigna: "Según Pablo, ¿para qué serán arrebatados los creyentes que vivan? Toca las palabras que lo dicen.",
            texto: "seremos arrebatados juntamente con ellos en las nubes [[para recibir al Señor]] en el aire",
            apoyo: "los creyentes que vivan «seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire»",
            ref: "1 Tesalonicenses 4:16-17",
            explica: "Los creyentes que vivan «seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire». De la traducción latina de esa frase viene la palabra rapto.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que confiesan todas las posiciones acerca de los últimos tiempos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todas las posiciones sobre los últimos tiempos confiesan que Cristo volverá en persona.", verdad: true, explica: "Todas las posiciones confiesan lo central: Cristo volverá en persona, los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas.", apoyo: "Todas las posiciones confiesan lo central: Cristo volverá en persona, los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas" },
              { texto: "Solo una de las posiciones sobre los últimos tiempos confiesa que los muertos resucitarán.", verdad: false, explica: "Todas las posiciones confiesan que los muertos resucitarán y que habrá juicio.", apoyo: "Todas las posiciones confiesan lo central" },
              { texto: "Los evangélicos difieren sobre el momento del arrebatamiento.", verdad: true, explica: "Los evangélicos difieren sobre el momento, pero todas las posiciones confiesan lo central.", apoyo: "Los evangélicos difieren sobre el momento" },
            ],
          },
          {
            consigna: "Sobre el arrebatamiento y lo central de la fe: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La palabra rapto viene de la traducción latina de una frase de Pablo sobre ser arrebatados.", verdad: true, explica: "De la traducción latina de la frase «seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire» viene la palabra rapto.", apoyo: "De la traducción latina de esa frase viene la palabra rapto" },
              { texto: "Según Pablo, los creyentes que vivan irán primero, y los muertos en Cristo resucitarán después.", verdad: false, explica: "Pablo enseña que «los muertos en Cristo resucitarán primero», y que los que vivan serán arrebatados juntamente con ellos.", apoyo: "Pablo enseña que «los muertos en Cristo resucitarán primero»", ref: "1 Tesalonicenses 4:16-17" },
              { texto: "Quien piensa distinto sobre el milenio no confiesa la venida de Cristo.", verdad: false, explica: "Todas las posiciones confiesan lo central: Cristo volverá en persona, los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas.", apoyo: "Todas las posiciones confiesan lo central: Cristo volverá en persona" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Habrá juicio, y el destino será eterno",
            ref: "2 Corintios 5:10; Mateo 25:46; Apocalipsis 21:1-4",
            titulo: "La clase de los jueves",
            relato: [
              "Eres maestro de la escuela bíblica. Este jueves toca hablar del juicio y de la eternidad, y el grupo llega con preguntas.",
              "Un alumno nuevo, que ya creyó en Cristo, dice que tiene miedo del juicio. Otra alumna comenta que un amigo le dijo que, al final, todos se salvarán.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "El alumno nuevo pregunta: ¿Me van a condenar en el tribunal de Cristo?",
                opciones: [
                  { texto: "No: es para recibir según tu servicio, porque la salvación es por gracia.", bien: true, explica: "El tribunal de Cristo no es un juicio para condenación, porque la salvación es por gracia, sino para recibir según su servicio." },
                  { texto: "Sí: si tus obras no alcanzan, ese tribunal te condena aunque hayas creído.", explica: "No es un juicio para condenación, porque la salvación es por gracia." },
                  { texto: "No: los creyentes nunca tendrán que dar cuenta de nada de lo que hicieron.", explica: "Los creyentes comparecerán «ante el tribunal de Cristo, para que cada uno reciba según lo que haya hecho»." },
                ],
                apoyo: "No es un juicio para condenación, porque la salvación es por gracia, sino para recibir según su servicio",
                explica: "Los creyentes comparecerán «ante el tribunal de Cristo, para que cada uno reciba según lo que haya hecho»: no para condenación, sino para recibir según su servicio.",
              },
              {
                tipo: "situacion",
                pregunta: "La alumna pregunta: ¿Es verdad que al final todos se salvarán?",
                opciones: [
                  { texto: "No: Jesús habló de castigo eterno y de vida eterna, con la misma palabra.", bien: true, explica: "Jesús usó la misma palabra para los dos destinos: «E irán éstos al castigo eterno, y los justos a la vida eterna»." },
                  { texto: "Sí: Dios es amor, y por eso al final de todo nadie quedará fuera de su reino.", explica: "La iglesia rechaza el universalismo, la idea de que al final todos se salvarán." },
                  { texto: "Nadie lo puede saber, porque la Biblia no dice nada del destino eterno.", explica: "La Biblia sí lo dice: «E irán éstos al castigo eterno, y los justos a la vida eterna»." },
                ],
                apoyo: "Por eso la iglesia rechaza el universalismo, la idea de que al final todos se salvarán",
                explica: "Jesús usó la misma palabra para los dos destinos, castigo eterno y vida eterna: por eso la iglesia rechaza el universalismo.",
              },
              {
                tipo: "situacion",
                pregunta: "Otro alumno pregunta: ¿Qué vio Juan en Apocalipsis 20 sobre el juicio?",
                opciones: [
                  { texto: "Un gran trono blanco, y a los muertos juzgados cada uno según sus obras.", bien: true, explica: "Juan vio «un gran trono blanco», y los muertos «fueron juzgados cada uno según sus obras»." },
                  { texto: "Un trono vacío, porque al final de los tiempos ya no habrá juicio para nadie.", explica: "Juan vio «un gran trono blanco»: habrá juicio." },
                  { texto: "A los muertos juzgados solamente según cuánto sufrieron en esta vida.", explica: "Los muertos «fueron juzgados cada uno según sus obras»." },
                ],
                apoyo: "Juan vio «un gran trono blanco», y los muertos «fueron juzgados cada uno según sus obras»",
                explica: "Juan vio un gran trono blanco, y los muertos fueron juzgados cada uno según sus obras: habrá juicio, y el destino será eterno.",
              },
              {
                tipo: "explica",
                apoyo: "Para los redimidos, Dios promete «un cielo nuevo y una tierra nueva», donde «él morará con ellos»",
                clave: {
                  id: "pr-n4-sistematica-4-6-a6-1",
                  tipo: "corta",
                  pregunta: "Para cerrar la clase con esperanza, ¿qué promete Dios a los redimidos en Apocalipsis 21?",
                  ideas: [
                    { id: "nuevo", peso: 50, texto: "Un cielo nuevo y una tierra nueva, donde él morará con ellos.", formas: ["cielo nuevo", "tierra nueva", "nuevos cielos", "cielos nuevos", "morara con", "vivira con (ellos|nosotros)", "habitara con", "estara con (ellos|nosotros)"] },
                    { id: "dolor", peso: 50, texto: "Ya no habrá muerte, ni llanto, ni clamor, ni dolor.", formas: ["no habra muerte", "no habra llanto", "no habra dolor", "no habra clamor", "ni llanto", "ni dolor", "ni clamor", "sin (muerte|llanto|dolor|clamor)", "no (existira|existiran|habra) (muerte|llanto|dolor)","(quitara|acabara|terminara|enjugara) (el|la|todo|toda) (dolor|llanto|muerte|lagrima*)"] },
                  ],
                  modelo: "Dios promete a los redimidos un cielo nuevo y una tierra nueva, donde él morará con ellos. Allí ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.",
                },
              },
            ],
          },
          {
            apoyo: "Jesús usó la misma palabra para los dos destinos",
            ref: "2 Corintios 5:10; Mateo 25:46",
            titulo: "Un mensaje para el culto de jóvenes",
            relato: [
              "El pastor te pidió predicar en el culto de jóvenes sobre la eternidad. Quiere que el mensaje sea fiel a la Escritura y lleno de esperanza.",
              "Mientras lo preparas, un joven del grupo te escribe: ¿Para qué voy a servir a Dios, si de todos modos ya soy salvo?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al joven?",
                opciones: [
                  { texto: "Que comparecerá ante el tribunal de Cristo para recibir según su servicio.", bien: true, explica: "Los creyentes comparecerán «ante el tribunal de Cristo, para que cada uno reciba según lo que haya hecho»." },
                  { texto: "Que tiene razón: lo que haga un creyente después de creer ya no importa nada.", explica: "Los creyentes comparecerán ante el tribunal de Cristo para recibir según su servicio." },
                  { texto: "Que sirva mucho, porque si no, Cristo lo va a condenar en el juicio final.", explica: "El tribunal de Cristo no es un juicio para condenación, porque la salvación es por gracia." },
                ],
                apoyo: "Los creyentes comparecerán «ante el tribunal de Cristo, para que cada uno reciba según lo que haya hecho»",
                explica: "El tribunal de Cristo no es un juicio para condenación, porque la salvación es por gracia, sino para recibir según su servicio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué texto usas para mostrar que los dos destinos son eternos?",
                opciones: [
                  { texto: "Mateo 25:46: castigo eterno para unos y vida eterna para los justos.", bien: true, explica: "Jesús usó la misma palabra para los dos destinos: «E irán éstos al castigo eterno, y los justos a la vida eterna»." },
                  { texto: "Apocalipsis 21:1-4: ya no habrá muerte, ni llanto, ni clamor, ni dolor.", explica: "Ese texto habla del destino de los redimidos; el de los dos destinos es Mateo 25:46." },
                  { texto: "Hechos 1:11: este mismo Jesús vendrá como lo vieron ir al cielo.", explica: "Ese texto habla de la venida de Cristo; el de los dos destinos es Mateo 25:46." },
                ],
                apoyo: "Jesús usó la misma palabra para los dos destinos",
                explica: "En Mateo 25:46 Jesús usó la misma palabra para los dos destinos: castigo eterno y vida eterna.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo describes en el mensaje el destino de los redimidos?",
                opciones: [
                  { texto: "Un cielo nuevo y una tierra nueva, donde Dios morará con ellos.", bien: true, explica: "Para los redimidos, Dios promete «un cielo nuevo y una tierra nueva», donde «él morará con ellos»." },
                  { texto: "Un descanso sin fin, lejos de Dios y de todos los demás redimidos.", explica: "Dios promete morar con ellos: «él morará con ellos»." },
                  { texto: "Una vida igual a la de ahora, con sus muertes y sus llantos de siempre.", explica: "Dios promete que «ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor»." },
                ],
                apoyo: "Para los redimidos, Dios promete «un cielo nuevo y una tierra nueva», donde «él morará con ellos»",
                explica: "Los redimidos tendrán vida eterna con Dios en los cielos nuevos y la tierra nueva, donde ya no habrá muerte ni llanto.",
              },
              {
                tipo: "explica",
                apoyo: "E irán éstos al castigo eterno, y los justos a la vida eterna",
                clave: {
                  id: "pr-n4-sistematica-4-6-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe el cierre del mensaje: ¿qué destinos enseñó Jesús en Mateo 25:46, y cuánto duran?",
                  ideas: [
                    { id: "castigo", peso: 50, texto: "Unos irán al castigo eterno.", formas: ["castigo eterno", "eterno castigo", "castigo para siempre", "condenacion eterna", "castigo que (dura|durara) para siempre"] },
                    { id: "vida", peso: 50, texto: "Los justos irán a la vida eterna, con la misma palabra: los dos destinos son eternos.", formas: ["vida eterna", "los justos", "vida para siempre", "misma palabra", "los dos (son|seran) eternos", "ambos (son|seran) eternos"] },
                  ],
                  modelo: "Jesús enseñó dos destinos con la misma palabra: unos irán al castigo eterno, y los justos a la vida eterna. Los dos son eternos; por eso la iglesia rechaza la idea de que al final todos se salvarán.",
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
            apoyo: "No es un juicio para condenación, porque la salvación es por gracia, sino para recibir según su servicio",
            ref: "2 Corintios 5:10",
            clave: {
              id: "pr-n4-sistematica-4-6-a7-1",
              tipo: "corta",
              pregunta: "¿Para qué comparecerán los creyentes ante el tribunal de Cristo, y por qué no es un juicio para condenación?",
              ideas: [
                { id: "servicio", peso: 50, texto: "Para que cada uno reciba según lo que haya hecho: según su servicio.", formas: ["segun (lo|su) (haya|servicio|hecho|hizo|obras)", "segun su servicio", "recib* segun", "recompens*", "lo que (haya|hayamos|hizo|hicimos|hicieron) hecho"] },
                { id: "gracia", peso: 50, texto: "No es para condenación, porque la salvación es por gracia.", formas: ["por gracia", "salvacion es por", "ya (son|somos|es) salvos", "es (la|por) gracia", "de gracia"] },
              ],
              modelo: "Los creyentes comparecerán ante el tribunal de Cristo para que cada uno reciba según lo que haya hecho, según su servicio. No es un juicio para condenación, porque la salvación es por gracia.",
            },
          },
          {
            apoyo: "Por eso la iglesia rechaza el universalismo, la idea de que al final todos se salvarán",
            ref: "Mateo 25:46",
            clave: {
              id: "pr-n4-sistematica-4-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseñó Jesús en Mateo 25:46 sobre los dos destinos, y por qué la iglesia rechaza el universalismo?",
              ideas: [
                { id: "destinos", peso: 50, texto: "Que unos irán al castigo eterno, y los justos a la vida eterna.", formas: ["castigo eterno", "eterno castigo", "castigo para siempre", "condenacion eterna"] },
                { id: "palabra", peso: 50, texto: "Usó la misma palabra para los dos destinos: si la vida es eterna, el castigo también; no todos se salvarán.", formas: ["misma palabra", "igual de eterno", "no todos", "los dos (son|seran) eternos", "ambos (son|seran) eternos", "tan eterno", "eterno para (los|ambos)", "para los dos"] },
              ],
              modelo: "Jesús enseñó que unos irán al castigo eterno, y los justos a la vida eterna. Usó la misma palabra para los dos destinos; por eso la iglesia rechaza el universalismo: no todos se salvarán al final.",
            },
          },
        ],
      },
    ],
  },
};
