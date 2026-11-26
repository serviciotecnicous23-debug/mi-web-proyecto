/**
 * Las prácticas de «El Sermón del monte» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-sermon-monte.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_SERMON_MONTE: PracticasMateria = {
  materia: "n2-sermon-monte",
  mision: {
    titulo: "La casa sobre la roca",
    intro: "Un amigo que empieza a seguir a Jesús te pide que lo acompañes a leer Mateo 5 a 7. Quiere saber para quién es el Sermón, cómo es el carácter del discípulo, qué pide Jesús del corazón, dónde poner la confianza y cómo edificar sobre la roca. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar el Sermón del monte: la vida en el reino que el Rey describe, que no se gana con obras y que se vive por su gracia, oyendo y haciendo sus palabras.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El Rey enseña en el monte
    "n2-sermon-monte-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pidió Jesús cuando comenzó a predicar?", reverso: "Arrepentirse, porque el reino de los cielos se ha acercado.", apoyo: "Jesús comenzó a predicar diciendo: «Arrepentíos, porque el reino de los cielos se ha acercado»" },
              { frente: "¿Qué es el reino de los cielos?", reverso: "El gobierno de Dios que llega con Jesús, el Rey.", apoyo: "El reino es el gobierno de Dios que llega con Jesús, el Rey." },
              { frente: "¿De qué vida habla el Sermón del monte?", reverso: "De la vida de quienes entran en el reino.", apoyo: "El Sermón del monte describe cómo es la vida de quienes entran en ese reino." },
              { frente: "¿Dónde está el Sermón del monte en la Biblia?", reverso: "En el Evangelio de Mateo, capítulos 5 a 7.", apoyo: "Mateo 5 a 7 reúne la enseñanza más conocida de Jesús." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Adónde subió Jesús al ver la multitud?", reverso: "Al monte: allí se sentó y vinieron a Él sus discípulos.", apoyo: "Al ver la multitud, Jesús «subió al monte; y sentándose, vinieron a él sus discípulos»" },
              { frente: "¿Por qué es importante que Jesús se sentara a enseñar?", reverso: "Porque los maestros de Israel enseñaban sentados.", apoyo: "Los maestros de Israel enseñaban sentados." },
              { frente: "¿Con qué autoridad enseña Jesús la voluntad de Dios?", reverso: "Con su propia autoridad: es el Hijo de Dios.", apoyo: "Jesús, el Hijo de Dios, enseña desde el monte la voluntad de Dios con su propia autoridad" },
              { frente: "¿A quiénes no citaba Jesús cuando enseñaba?", reverso: "A otros maestros: hablaba como el Rey de su reino.", apoyo: "No citaba a otros maestros: hablaba como el Rey que tiene derecho a decir cómo se vive en su reino." },
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
            ref: "Mateo 4:17",
            consigna: "¿Qué anunció Jesús que se había acercado? Toca esas palabras.",
            texto: "Arrepentíos, porque el [[reino de los cielos]] se ha acercado",
            apoyo: "El reino es el gobierno de Dios que llega con Jesús, el Rey.",
            explica: "Jesús anunció que el reino de los cielos se había acercado: el gobierno de Dios llega con Él, el Rey. El Sermón describe la vida de quienes entran en ese reino.",
          },
          {
            ref: "Mateo 7:29",
            consigna: "Al terminar el Sermón, ¿cómo decía la gente que enseñaba Jesús? Toca la palabra.",
            texto: "como quien tiene [[autoridad]], y no como los escribas",
            apoyo: "No citaba a otros maestros: hablaba como el Rey que tiene derecho a decir cómo se vive en su reino.",
            explica: "La gente se admiraba: Jesús no citaba a otros maestros, sino que enseñaba con autoridad propia, como el Rey de su reino.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las partes del Sermón del monte, de la primera a la última.",
            pasos: ["El carácter del discípulo", "Una justicia mayor", "La piedad delante del Padre", "El tesoro y la confianza", "Las relaciones y la gran decisión"],
            apoyo: "El carácter del discípulo: las bienaventuranzas, la sal y la luz (5:3-16).",
            explica: "El Sermón empieza con el carácter del discípulo (Mateo 5) y termina con la gran decisión de los dos caminos (Mateo 7).",
          },
          {
            consigna: "Ordena lo que enseña Jesús en el Sermón del monte, de Mateo 5 a Mateo 7.",
            pasos: ["Las bienaventuranzas, la sal y la luz", "Jesús cumple la ley y la lleva al corazón", "Dar, orar y ayunar en lo secreto", "Dios o las riquezas, y no afanarse", "No juzgar, pedir, la regla de oro y los dos caminos"],
            apoyo: "Las relaciones y la gran decisión: no juzgar, pedir, la regla de oro y los dos caminos (7:1-27).",
            explica: "Primero, el carácter del discípulo y la justicia mayor (Mateo 5); después, la piedad y la confianza (Mateo 6); al final, las relaciones y la gran decisión (Mateo 7).",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿En qué capítulo de Mateo lo enseña Jesús? Lleva cada frase a su grupo.",
            grupos: ["Mateo 5", "Mateo 6", "Mateo 7"],
            frases: [
              { texto: "Las bienaventuranzas", grupo: 0 },
              { texto: "La sal y la luz", grupo: 0 },
              { texto: "Jesús cumple la ley", grupo: 0 },
              { texto: "Dar, orar y ayunar en lo secreto", grupo: 1 },
              { texto: "Dios o las riquezas", grupo: 1 },
              { texto: "No afanarse", grupo: 1 },
              { texto: "No juzgar", grupo: 2 },
              { texto: "Los dos caminos", grupo: 2 },
            ],
            apoyo: "La piedad delante del Padre: dar, orar y ayunar en lo secreto (6:1-18).",
            explica: "Mateo 5 trae el carácter del discípulo y la justicia mayor; Mateo 6, la piedad y la confianza; Mateo 7, las relaciones y la gran decisión.",
          },
          {
            consigna: "¿En qué capítulo de Mateo está esta parte del Sermón? Lleva cada frase a su grupo.",
            grupos: ["Mateo 5", "Mateo 6", "Mateo 7"],
            frases: [
              { texto: "El carácter del discípulo", grupo: 0 },
              { texto: "Una justicia mayor", grupo: 0 },
              { texto: "Jesús lleva la ley al corazón", grupo: 0 },
              { texto: "La piedad delante del Padre", grupo: 1 },
              { texto: "El tesoro y la confianza", grupo: 1 },
              { texto: "La regla de oro", grupo: 2 },
              { texto: "Las relaciones y la gran decisión", grupo: 2 },
            ],
            apoyo: "Las relaciones y la gran decisión: no juzgar, pedir, la regla de oro y los dos caminos (7:1-27).",
            explica: "El Sermón va de Mateo 5 a 7: el carácter y la justicia mayor, después la piedad y la confianza, y al final las relaciones y la gran decisión.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre para quién es el Sermón del monte: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Sermón del monte enseña a ganar la salvación con buenas obras.", verdad: false, explica: "No es un camino para ganarse el cielo: describe la vida nueva de quienes ya siguen a Jesús.", apoyo: "El Sermón del monte no enseña a ganar la salvación con buenas obras." },
              { texto: "En el Sermón del monte, Jesús habla a sus discípulos.", verdad: true, explica: "Jesús describe la vida nueva de quienes ya lo siguen.", apoyo: "Jesús habla a sus discípulos: describe la vida nueva de quienes ya lo siguen", ref: "Mateo 5:1-2" },
              { texto: "La vida que describe el Sermón se logra con fuerza de voluntad.", verdad: false, explica: "Esa vida solo es posible por la gracia de Jesús y por el poder del Espíritu Santo.", apoyo: "una vida que solo es posible por su gracia y por el poder del Espíritu Santo" },
            ],
          },
          {
            consigna: "Sobre para quién es el Sermón del monte: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús dio el Sermón del monte para que sus discípulos lo vivan.", verdad: true, explica: "Muchos lo admiran, pero Jesús no busca admiradores, sino discípulos.", apoyo: "la dio para que sus discípulos la vivan" },
              { texto: "Jesús dio el Sermón del monte para que la gente lo admire.", verdad: false, explica: "Muchos lo admiran, aun sin ser creyentes, pero Jesús lo dio para que sus discípulos lo vivan.", apoyo: "Muchos la admiran, aun sin ser creyentes, pero Jesús no la dio para que la admiremos" },
              { texto: "La vida del Sermón es posible por la gracia de Jesús y el poder del Espíritu Santo.", verdad: true, explica: "No sale del esfuerzo humano: es la vida nueva que da la gracia de Dios.", apoyo: "una vida que solo es posible por su gracia y por el poder del Espíritu Santo" },
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
            caso: "Un compañero de trabajo te dice: Yo no necesito a Jesús; si vivo el Sermón del monte, ya me gano el cielo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si cumples el Sermón con mucho esfuerzo, Dios te va a aceptar.", explica: "El Sermón no enseña a ganar la salvación con buenas obras." },
              { texto: "No es para ganar el cielo: describe la vida de quien ya sigue a Jesús.", bien: true, explica: "Jesús habla a sus discípulos: la vida del Sermón es fruto de su gracia, no el precio del cielo." },
              { texto: "El Sermón es tan difícil que nadie lo vive; mejor ni lo intentes leer.", explica: "Jesús lo dio para que sus discípulos lo vivan, por su gracia y el poder del Espíritu Santo." },
              { texto: "Está bien que lo admires; con admirar lo que enseñó Jesús ya es suficiente.", explica: "Jesús no busca admiradores, sino discípulos." },
            ],
            apoyo: "El Sermón del monte no enseña a ganar la salvación con buenas obras.",
            explica: "El Sermón describe la vida nueva de quienes ya siguen a Jesús; esa vida es posible por su gracia y por el poder del Espíritu Santo.",
          },
          {
            caso: "Una amiga de tu iglesia te dice: Leí el Sermón del monte y me desanimé; yo nunca voy a poder vivir así.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Tienes razón: es solo para los muy santos; a ti te basta con admirarlo.", explica: "Jesús lo dio para que sus discípulos lo vivan, no para que lo admiren." },
              { texto: "Esfuérzate más cada día y con tus obras te vas a ganar el favor de Dios.", explica: "El Sermón no es un camino para ganarse el favor de Dios con buenas obras." },
              { texto: "No depende de tu fuerza: es posible por la gracia y el Espíritu Santo.", bien: true, explica: "La vida del Sermón solo es posible por la gracia de Jesús y por el poder del Espíritu Santo." },
              { texto: "No te preocupes: ese sermón era solo para la gente del tiempo de Jesús.", explica: "Jesús describe la vida nueva de quienes lo siguen: lo dio para que sus discípulos lo vivan." },
            ],
            apoyo: "una vida que solo es posible por su gracia y por el poder del Espíritu Santo",
            explica: "Jesús no pide que lo logremos solos: describe la vida nueva que su gracia hace posible en sus discípulos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús habla a sus discípulos: describe la vida nueva de quienes ya lo siguen, una vida que solo es posible por su gracia y por el poder del Espíritu Santo.",
            ref: "Mateo 5:1-2",
            clave: {
              id: "pr-n2-sermon-monte-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el Sermón del monte no es un camino para ganar la salvación?",
              ideas: [
                { id: "discipulos", peso: 50, texto: "Jesús habla a sus discípulos: describe la vida nueva de quienes ya lo siguen.", formas: ["discipulos", "ya lo siguen", "lo siguen", "seguidores", "vida nueva", "nueva vida"] },
                { id: "gracia", peso: 50, texto: "Esa vida solo es posible por su gracia y por el poder del Espíritu Santo.", formas: ["gracia", "espiritu santo", "poder del espiritu", "del espiritu"] },
              ],
              modelo: "Porque Jesús habla a sus discípulos: describe la vida nueva de quienes ya lo siguen. Esa vida no se gana con obras; solo es posible por su gracia y por el poder del Espíritu Santo.",
            },
          },
          {
            apoyo: "Jesús no busca admiradores, sino discípulos.",
            ref: "Mateo 5:1-2",
            clave: {
              id: "pr-n2-sermon-monte-1-a7-2",
              tipo: "corta",
              pregunta: "¿Para quiénes es el Sermón del monte, y para qué lo dio Jesús?",
              ideas: [
                { id: "discipulos", peso: 50, texto: "Es para sus discípulos, los que ya lo siguen.", formas: ["discipulos", "ya lo siguen", "lo siguen", "seguidores", "creyentes"] },
                { id: "vivir", peso: 50, texto: "Lo dio para que lo vivan, no solo para admirarlo.", formas: ["viv*", "practic*", "obedec*", "poner* por obra", "cumplir*"] },
              ],
              modelo: "Es para sus discípulos, los que ya lo siguen. Jesús no lo dio para que lo admiremos, sino para que lo vivamos: no busca admiradores, sino discípulos.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Las bienaventuranzas
    "n2-sermon-monte-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué quiere decir bienaventurado?", reverso: "Dichoso, feliz por la aprobación de Dios.", apoyo: "Bienaventurado quiere decir dichoso, feliz por la aprobación de Dios." },
              { frente: "¿A quiénes llama felices el mundo?", reverso: "A los ricos, a los fuertes y a los famosos.", apoyo: "El mundo llama felices a los ricos, a los fuertes y a los famosos." },
              { frente: "¿Con qué termina cada bienaventuranza?", reverso: "Con una promesa de Dios.", apoyo: "Cada bienaventuranza describe un rasgo del discípulo y termina con una promesa." },
              { frente: "¿Qué reconocen los pobres en espíritu?", reverso: "Que no tienen nada que ofrecer a Dios y dependen de su gracia.", apoyo: "Los pobres en espíritu reconocen que no tienen nada que ofrecer a Dios y dependen de su gracia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es la dicha de Jesús, si no es un sentimiento pasajero?", reverso: "El veredicto de Dios sobre quien vive en su reino.", apoyo: "No es un sentimiento pasajero: es el veredicto de Dios sobre quien vive en su reino." },
              { frente: "¿A quiénes llama dichosos Jesús al empezar su sermón?", reverso: "A los pobres en espíritu, a los que lloran y a los mansos.", apoyo: "Jesús empieza su sermón llamando dichosos a otros: a los pobres en espíritu, a los que lloran, a los mansos." },
              { frente: "¿Son las bienaventuranzas grupos de personas distintas?", reverso: "No: son rasgos de cada discípulo.", apoyo: "Las bienaventuranzas no son grupos de personas distintas: son rasgos de cada discípulo." },
              { frente: "¿Qué hace el reino de Dios con los valores del mundo?", reverso: "Les da vuelta: Dios llama dichosos a los que el mundo desprecia.", apoyo: "El reino de Dios da vuelta a los valores del mundo: los que el mundo desprecia son los que Dios llama dichosos." },
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
            consigna: "Completa qué quiere decir ser bienaventurado.",
            texto: "Bienaventurado quiere decir [[dichoso]], feliz por la [[aprobación]] de Dios. No es un sentimiento pasajero: es el [[veredicto]] de Dios sobre quien vive en su reino.",
            distractores: ["rico", "riqueza", "capricho"],
            errores: {
              rico: "El mundo llama felices a los ricos; Jesús llama dichosos a quienes viven en su reino.",
              riqueza: "La dicha que Jesús promete viene de la aprobación de Dios, no de lo que uno tiene.",
              capricho: "No es un capricho ni un sentimiento pasajero: es el veredicto de Dios.",
            },
            apoyo: "Bienaventurado quiere decir dichoso, feliz por la aprobación de Dios.",
            ref: "Mateo 5:3",
            explica: "Ser bienaventurado no es un sentimiento que va y viene: es lo que Dios dice de quien vive en su reino.",
          },
          {
            consigna: "Completa qué es una bienaventuranza.",
            texto: "Ser [[bienaventurado]] es ser dichoso por la aprobación de Dios. Cada bienaventuranza describe un [[rasgo]] del discípulo y termina con una [[promesa]].",
            distractores: ["famoso", "grupo", "advertencia"],
            errores: {
              famoso: "El mundo llama felices a los famosos; Jesús llama dichosos a quienes Dios aprueba.",
              grupo: "Las bienaventuranzas no son grupos de personas distintas: son rasgos de cada discípulo.",
              advertencia: "Cada bienaventuranza termina con una promesa de Dios.",
            },
            apoyo: "Cada bienaventuranza describe un rasgo del discípulo y termina con una promesa.",
            ref: "Mateo 5:3-12",
            explica: "Las bienaventuranzas retratan al discípulo: cada una describe un rasgo suyo y termina con una promesa de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada bienaventuranza con la promesa que la lección destaca.",
            pares: [
              ["Los pobres en espíritu", "De ellos es el reino de los cielos"],
              ["Los que lloran", "Dios los consuela"],
              ["Los de limpio corazón", "Verán a Dios"],
              ["Los pacificadores", "Serán llamados hijos de Dios"],
            ],
            apoyo: "Los de limpio corazón aman a Dios con sinceridad, sin doblez: «ellos verán a Dios»",
            ref: "Mateo 5:3-9",
            explica: "Cada bienaventuranza describe un rasgo del discípulo y termina con una promesa de Dios.",
          },
          {
            consigna: "Une cada bienaventuranza con lo que hace el discípulo.",
            pares: [
              ["Los pobres en espíritu", "Dependen de la gracia de Dios"],
              ["Los que lloran", "Se duelen por su pecado y por el dolor del mundo"],
              ["Los mansos", "Tienen la fuerza bajo el control de Dios"],
              ["Los misericordiosos", "Perdonan y ayudan, porque han recibido misericordia"],
              ["Los pacificadores", "Buscan la reconciliación entre las personas y con Dios"],
            ],
            apoyo: "Los misericordiosos perdonan y ayudan, porque han recibido misericordia.",
            ref: "Mateo 5:3-9",
            explica: "Las bienaventuranzas no son grupos de personas distintas: son rasgos de cada discípulo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el retrato del discípulo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los mansos son débiles que se dejan vencer por todos.", verdad: false, explica: "Los mansos no son débiles: tienen la fuerza bajo el control de Dios y no se imponen por la fuerza.", apoyo: "Los mansos no son débiles: tienen la fuerza bajo el control de Dios y no se imponen por la fuerza.", ref: "Mateo 5:5" },
              { texto: "Los de limpio corazón aman a Dios con sinceridad, sin doblez.", verdad: true, explica: "Jesús les promete que verán a Dios.", apoyo: "Los de limpio corazón aman a Dios con sinceridad, sin doblez", ref: "Mateo 5:8" },
              { texto: "Para los perseguidos por causa de la justicia, el galardón es grande en los cielos.", verdad: true, explica: "No deben sorprenderse: así persiguieron a los profetas.", apoyo: "su galardón es grande en los cielos", ref: "Mateo 5:10-12" },
            ],
          },
          {
            consigna: "Sobre el retrato del discípulo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los que tienen hambre y sed de justicia anhelan vivir como Dios manda.", verdad: true, explica: "También anhelan ver su justicia en el mundo, y Jesús promete que serán saciados.", apoyo: "Los que tienen hambre y sed de justicia anhelan vivir como Dios manda y ver su justicia en el mundo", ref: "Mateo 5:6" },
              { texto: "Los pobres en espíritu creen que tienen mucho que ofrecer a Dios.", verdad: false, explica: "Es al revés: reconocen que no tienen nada que ofrecer a Dios y dependen de su gracia.", apoyo: "Los pobres en espíritu reconocen que no tienen nada que ofrecer a Dios y dependen de su gracia", ref: "Mateo 5:3" },
              { texto: "Los misericordiosos perdonan y ayudan porque han recibido misericordia.", verdad: true, explica: "Dan lo que ellos mismos recibieron de Dios.", apoyo: "Los misericordiosos perdonan y ayudan, porque han recibido misericordia.", ref: "Mateo 5:7" },
              { texto: "Los perseguidos por causa de la justicia deben sorprenderse de que los persigan.", verdad: false, explica: "No deben sorprenderse: así persiguieron a los profetas, y su galardón es grande en los cielos.", apoyo: "Los perseguidos por causa de la justicia no deben sorprenderse: así persiguieron a los profetas", ref: "Mateo 5:10-12" },
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
            consigna: "¿A quiénes llama felices el mundo y a quiénes llama dichosos Jesús? Lleva cada frase a su grupo.",
            grupos: ["El mundo los llama felices", "Jesús los llama dichosos"],
            frases: [
              { texto: "Los ricos", grupo: 0 },
              { texto: "Los fuertes", grupo: 0 },
              { texto: "Los famosos", grupo: 0 },
              { texto: "Los pobres en espíritu", grupo: 1 },
              { texto: "Los que lloran", grupo: 1 },
              { texto: "Los mansos", grupo: 1, explica: "Los mansos no son débiles: tienen la fuerza bajo el control de Dios." },
            ],
            apoyo: "El mundo llama felices a los ricos, a los fuertes y a los famosos.",
            ref: "Mateo 5:3-5",
            explica: "El reino de Dios da vuelta a los valores del mundo: los que el mundo desprecia son los que Dios llama dichosos.",
          },
          {
            consigna: "¿Es la felicidad del mundo o la dicha que da Jesús? Lleva cada frase a su grupo.",
            grupos: ["Felices para el mundo", "Dichosos para Jesús"],
            frases: [
              { texto: "Los que tienen mucho dinero", grupo: 0 },
              { texto: "Los que todos conocen", grupo: 0 },
              { texto: "Los que se imponen por la fuerza", grupo: 0, explica: "Los mansos, a quienes Jesús llama dichosos, no se imponen por la fuerza." },
              { texto: "Los que dependen de la gracia de Dios", grupo: 1 },
              { texto: "Los que se duelen por su pecado", grupo: 1 },
              { texto: "Los que buscan la reconciliación", grupo: 1 },
              { texto: "Los perseguidos por causa de la justicia", grupo: 1 },
            ],
            apoyo: "El reino de Dios da vuelta a los valores del mundo: los que el mundo desprecia son los que Dios llama dichosos.",
            ref: "Mateo 5:3-12",
            explica: "Jesús llama dichosos a quienes el mundo no admira: los que dependen de Dios, se quebrantan por el pecado y buscan la paz.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu primo te dice: Ser manso es de débiles; en esta vida, el que no se impone pierde.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si no te impones por la fuerza, todos te van a pisar.", explica: "Jesús llama dichosos a los mansos, que no se imponen por la fuerza." },
              { texto: "El manso no es débil: tiene su fuerza bajo el control de Dios.", bien: true, explica: "Así lo explica la lección: los mansos no son débiles ni se imponen por la fuerza." },
              { texto: "Ser manso es dejar que todos hagan contigo lo que quieran.", explica: "Ser manso no es ser débil: es tener la fuerza bajo el control de Dios." },
              { texto: "Ser manso era para el tiempo de Jesús; hoy hay que saber imponerse.", explica: "Las bienaventuranzas son rasgos de cada discípulo: así vive quien pertenece al reino." },
            ],
            apoyo: "Los mansos no son débiles: tienen la fuerza bajo el control de Dios y no se imponen por la fuerza.",
            ref: "Mateo 5:5",
            explica: "El reino de Dios da vuelta a los valores del mundo: Jesús llama dichosos a los mansos.",
          },
          {
            caso: "Una compañera de trabajo te dice: Cuando tenga una casa grande y un buen sueldo, ahí sí voy a ser feliz.",
            pregunta: "¿Qué le compartes?",
            opciones: [
              { texto: "Tienes razón: los ricos y los famosos son los más felices de todos.", explica: "Eso dice el mundo. Jesús llama dichosos a los pobres en espíritu, a los que lloran y a los mansos." },
              { texto: "Para ser feliz con Dios hay que ser pobre: deja tu trabajo y tu casa.", explica: "Los pobres en espíritu reconocen que no tienen nada que ofrecer a Dios; no se trata de dejar el trabajo." },
              { texto: "La felicidad es solo un sentimiento pasajero; mejor no la busques más.", explica: "La dicha de Jesús no es un sentimiento pasajero: es el veredicto de Dios sobre quien vive en su reino." },
              { texto: "La dicha de Jesús no depende de tener cosas, sino de ser de su reino.", bien: true, explica: "La dicha que Jesús promete no depende de las circunstancias, sino de pertenecer a su reino." },
            ],
            apoyo: "La dicha que Jesús promete no depende de las circunstancias, sino de pertenecer a su reino.",
            ref: "Mateo 5:3",
            explica: "El mundo llama felices a los ricos y a los famosos; Jesús ofrece una dicha que no depende de las circunstancias.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Bienaventurado quiere decir dichoso, feliz por la aprobación de Dios.",
            ref: "Mateo 5:3-12",
            clave: {
              id: "pr-n2-sermon-monte-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué significa ser bienaventurado según Jesús?",
              ideas: [
                { id: "dichoso", peso: 50, texto: "Es ser dichoso, feliz por la aprobación de Dios.", formas: ["dichos*", "feliz", "felices", "aprobacion de dios", "aprob*"] },
                { id: "veredicto", peso: 50, texto: "No es un sentimiento pasajero: es el veredicto de Dios sobre quien vive en su reino.", formas: ["veredicto", "no es un sentimiento", "(vive|viven|vivir) en su reino", "pertenec* a su reino", "dios (dice|declara|aprueba)"] },
              ],
              modelo: "Ser bienaventurado es ser dichoso, feliz por la aprobación de Dios. No es un sentimiento pasajero: es el veredicto de Dios sobre quien vive en su reino.",
            },
          },
          {
            apoyo: "La dicha que Jesús promete no depende de las circunstancias, sino de pertenecer a su reino.",
            ref: "Mateo 5:3-12",
            clave: {
              id: "pr-n2-sermon-monte-2-a7-2",
              tipo: "corta",
              pregunta: "¿De qué depende la dicha que promete Jesús en las bienaventuranzas?",
              ideas: [
                { id: "reino", peso: 60, texto: "Depende de pertenecer a su reino.", formas: ["pertenec*", "su reino", "reino de dios", "reino de los cielos", "ser de su reino"] },
                { id: "circunstancias", peso: 40, negativa: true, texto: "No depende de las circunstancias.", formas: ["no depende de las circunstancias", "no depende* de (lo|las|como|cuanto)", "no (de|por) las circunstancias", "ni de las circunstancias", "aunque las circunstancias"] },
              ],
              modelo: "La dicha que Jesús promete no depende de las circunstancias, como el dinero o la salud, sino de pertenecer a su reino y vivir con la aprobación de Dios.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. La sal, la luz y una justicia mayor
    "n2-sermon-monte-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace la sal?", reverso: "Da sabor y preserva de la corrupción.", apoyo: "La sal da sabor y preserva de la corrupción" },
              { frente: "¿Qué hace la luz?", reverso: "Disipa las tinieblas y muestra el camino.", apoyo: "la luz disipa las tinieblas y muestra el camino" },
              { frente: "¿Manda Jesús a sus discípulos a ser sal y luz?", reverso: "No: dice que ya lo son.", apoyo: "Jesús no manda a sus discípulos a ser sal y luz: dice que ya lo son." },
              { frente: "¿Para qué ven los demás las buenas obras del discípulo?", reverso: "Para que glorifiquen al Padre.", apoyo: "Las buenas obras del discípulo apuntan a Dios: «para que vean vuestras buenas obras, y glorifiquen a vuestro Padre»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué habla Jesús después del carácter del discípulo?", reverso: "De su influencia: la vida del discípulo se nota.", apoyo: "Después de describir el carácter del discípulo, Jesús habla de su influencia." },
              { frente: "¿Qué no se hace con una luz encendida, según Jesús?", reverso: "Esconderla debajo de un almud.", apoyo: "La luz no se enciende para esconderla debajo de un almud." },
              { frente: "¿Qué no se puede esconder, según Jesús?", reverso: "Una ciudad asentada sobre un monte.", apoyo: "«Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder»" },
              { frente: "¿Cómo alumbra la luz del discípulo?", reverso: "Sin hacer ruido: simplemente alumbra.", apoyo: "La luz no hace ruido: simplemente alumbra." },
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
            consigna: "¿Lo hace la sal o lo hace la luz? Lleva cada frase a su grupo.",
            grupos: ["Lo que hace la sal", "Lo que hace la luz"],
            frases: [
              { texto: "Da sabor", grupo: 0 },
              { texto: "Preserva de la corrupción", grupo: 0 },
              { texto: "Se nota en la comida", grupo: 0 },
              { texto: "Disipa las tinieblas", grupo: 1 },
              { texto: "Muestra el camino", grupo: 1 },
              { texto: "Se nota en la noche", grupo: 1 },
            ],
            apoyo: "La sal da sabor y preserva de la corrupción; la luz disipa las tinieblas y muestra el camino.",
            ref: "Mateo 5:13-14",
            explica: "Así influye el discípulo: como la sal, da sabor y preserva de la corrupción; como la luz, disipa las tinieblas y muestra el camino.",
          },
          {
            consigna: "¿Así alumbra la luz del discípulo o no? Lleva cada frase a su grupo.",
            grupos: ["Así alumbra el discípulo", "Así no alumbra el discípulo"],
            frases: [
              { texto: "Su vida se nota, como una ciudad sobre un monte", grupo: 0 },
              { texto: "Sus buenas obras apuntan a Dios", grupo: 0 },
              { texto: "Alumbra sin hacer ruido", grupo: 0 },
              { texto: "Esconde su luz debajo de un almud", grupo: 1 },
              { texto: "Vive escondido para que nadie lo note", grupo: 1 },
              { texto: "Hace ruido para que lo miren a él", grupo: 1, explica: "La luz no hace ruido, y las buenas obras apuntan a Dios, no a uno mismo." },
            ],
            apoyo: "La luz no se enciende para esconderla debajo de un almud.",
            ref: "Mateo 5:14-16",
            explica: "El discípulo no vive escondido, pero tampoco busca su gloria: sus buenas obras apuntan al Padre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 5:14",
            consigna: "¿Qué dice Jesús que ya son sus discípulos? Toca esas palabras.",
            texto: "Vosotros sois la [[luz del mundo]]; una ciudad asentada sobre un monte no se puede esconder",
            apoyo: "Jesús no manda a sus discípulos a ser sal y luz: dice que ya lo son.",
            explica: "Jesús no dice que sus discípulos tienen que llegar a ser luz: dice que ya lo son, y una ciudad sobre un monte no se puede esconder.",
          },
          {
            ref: "Mateo 5:16",
            consigna: "Al ver las buenas obras del discípulo, ¿a quién glorifican los demás? Toca la palabra.",
            texto: "para que vean vuestras buenas obras, y glorifiquen a vuestro [[Padre]]",
            apoyo: "Las buenas obras del discípulo apuntan a Dios",
            explica: "Las buenas obras del discípulo no buscan su propia gloria: apuntan a Dios, para que glorifiquen al Padre.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo cumple Jesús la ley y los profetas.",
            texto: "Jesús vino para [[cumplir]] la ley y los profetas. Él [[obedece]] perfectamente la voluntad de Dios, cumple las [[promesas]] y las figuras del Antiguo Testamento y muestra el verdadero sentido de los mandamientos.",
            distractores: ["abolir", "cambia", "costumbres"],
            errores: {
              abolir: "Jesús dijo: «no he venido para abrogar, sino para cumplir».",
              cambia: "Jesús no cambia la voluntad de Dios: la obedece perfectamente.",
              costumbres: "Jesús cumple las promesas y las figuras del Antiguo Testamento.",
            },
            apoyo: "Él cumple la ley y los profetas: obedece perfectamente la voluntad de Dios, cumple las promesas y las figuras del Antiguo Testamento y muestra el verdadero sentido de los mandamientos.",
            ref: "Mateo 5:17",
            explica: "Jesús no anula la ley: la cumple obedeciendo a Dios en todo, cumpliendo lo que el Antiguo Testamento prometía y mostrando su verdadero sentido.",
          },
          {
            consigna: "Completa lo que dijo Jesús sobre la ley y cómo la cumple.",
            texto: "Jesús dijo que vino para [[cumplir]] la ley. Muestra el verdadero [[sentido]] de los mandamientos y cumple las promesas y las [[figuras]] del Antiguo Testamento.",
            distractores: ["abrogar", "olvido", "dudas"],
            errores: {
              abrogar: "Jesús dijo: «no he venido para abrogar, sino para cumplir».",
              olvido: "Jesús no hace olvidar los mandamientos: muestra su verdadero sentido.",
            },
            apoyo: "Jesús dijo: «no he venido para abrogar, sino para cumplir».",
            ref: "Mateo 5:17",
            explica: "Jesús cumple la ley y los profetas: obedece a Dios perfectamente, cumple lo que el Antiguo Testamento anunciaba y enseña lo que de verdad quieren decir los mandamientos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se une la justicia mayor con cada idea? Toca cada enlace y elige la relación.",
            nodos: [
              { id: "j", texto: "La justicia mayor", x: 50, y: 50 },
              { id: "a", texto: "Dios nos declara justos", x: 25, y: 12 },
              { id: "b", texto: "Su Espíritu escribe su ley", x: 75, y: 12 },
              { id: "c", texto: "Más reglas por fuera", x: 25, y: 88 },
              { id: "d", texto: "Un corazón cambiado", x: 75, y: 88 },
            ],
            enlaces: [
              { de: "j", a: "a", relacion: "empieza cuando" },
              { de: "j", a: "b", relacion: "sigue cuando" },
              { de: "j", a: "c", relacion: "no es" },
              { de: "j", a: "d", relacion: "es" },
            ],
            distractores: ["termina cuando", "se gana con"],
            apoyo: "Esa justicia empieza cuando Dios nos declara justos por la fe en Cristo y sigue cuando su Espíritu escribe su ley en el corazón",
            ref: "Mateo 5:20; Jeremías 31:33",
            explica: "La justicia mayor no es más reglas por fuera, sino un corazón cambiado: empieza cuando Dios nos declara justos por la fe en Cristo y sigue cuando su Espíritu escribe su ley en el corazón.",
          },
          {
            consigna: "¿Cómo se unen estas ideas sobre la justicia? Toca cada enlace y elige la relación.",
            nodos: [
              { id: "e", texto: "Los escribas y fariseos", x: 25, y: 12 },
              { id: "r", texto: "Las reglas por fuera", x: 25, y: 55 },
              { id: "jesus", texto: "Jesús", x: 75, y: 12 },
              { id: "m", texto: "Una justicia mayor", x: 75, y: 55 },
              { id: "c", texto: "Un corazón transformado", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "e", a: "r", relacion: "cuidaban" },
              { de: "jesus", a: "m", relacion: "pide" },
              { de: "m", a: "c", relacion: "nace de" },
            ],
            distractores: ["abroga", "se gana con"],
            apoyo: "Los escribas y fariseos cuidaban las reglas por fuera.",
            ref: "Mateo 5:20",
            explica: "Los escribas y fariseos cuidaban las reglas por fuera; Jesús pide una justicia mayor, que nace de un corazón transformado por su gracia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo te dice: Yo también soy cristiano, pero en la oficina prefiero que no se me note.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Haces bien: la fe es algo privado y en el trabajo no tiene por qué notarse.", explica: "Un discípulo no vive escondido: su vida se nota, como la sal en la comida y la luz en la noche." },
              { texto: "Un discípulo no vive escondido: tus buenas obras pueden mostrar al Padre.", bien: true, explica: "Jesús dice que sus discípulos ya son luz, y sus buenas obras apuntan a Dios." },
              { texto: "Tienes que predicarle a cada uno en voz alta, aunque te cueste el trabajo.", explica: "La luz no hace ruido: simplemente alumbra." },
              { texto: "Primero tienes que llegar a ser luz; cuando seas más santo, se te notará.", explica: "Jesús no manda a sus discípulos a ser sal y luz: dice que ya lo son." },
            ],
            apoyo: "Un discípulo no vive escondido: su vida se nota, como la sal en la comida y la luz en la noche.",
            ref: "Mateo 5:14-16",
            explica: "El discípulo ya es sal y luz: en el trabajo, su vida y sus buenas obras pueden apuntar a Dios sin hacer ruido.",
          },
          {
            caso: "Tu hermano te dice: Quiero que en el barrio todos vean lo buen cristiano que soy yo.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Muy bien: haz que todos hablen de ti, así el barrio te va a admirar.", explica: "Las buenas obras del discípulo apuntan a Dios, no a uno mismo." },
              { texto: "Mejor esconde tu fe; así nadie te va a criticar en el barrio.", explica: "La luz no se enciende para esconderla debajo de un almud." },
              { texto: "Que vean tus buenas obras, pero para que glorifiquen al Padre.", bien: true, explica: "Así lo dice Jesús: las buenas obras se ven para que glorifiquen al Padre." },
              { texto: "Para ser luz tienes que hacer mucho ruido y que todos te escuchen.", explica: "La luz no hace ruido: simplemente alumbra." },
            ],
            apoyo: "Las buenas obras del discípulo apuntan a Dios",
            ref: "Mateo 5:16",
            explica: "El discípulo no se esconde ni busca su propia gloria: su luz alumbra para que glorifiquen al Padre.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús pide una justicia mayor: no más reglas, sino un corazón cambiado.",
            ref: "Mateo 5:20",
            clave: {
              id: "pr-n2-sermon-monte-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué justicia mayor pide Jesús a sus discípulos?",
              ideas: [
                { id: "corazon", peso: 50, texto: "No más reglas por fuera, sino un corazón cambiado.", formas: ["corazon cambiado", "cambi* (el|su|nuestro|mi) corazon", "corazon transformado", "corazon nuevo", "nuevo corazon", "transform*", "por dentro"] },
                { id: "gracia", peso: 50, texto: "Empieza cuando Dios nos declara justos por la fe en Cristo y sigue con su Espíritu, que escribe su ley en el corazón.", formas: ["declara* justos", "nos declara", "por la fe", "fe en cristo", "espiritu", "gracia"] },
              ],
              modelo: "Jesús no pide más reglas por fuera, como los fariseos, sino un corazón cambiado. Esa justicia empieza cuando Dios nos declara justos por la fe en Cristo y sigue cuando su Espíritu escribe su ley en el corazón.",
            },
          },
          {
            apoyo: "Los escribas y fariseos cuidaban las reglas por fuera.",
            ref: "Mateo 5:20",
            clave: {
              id: "pr-n2-sermon-monte-3-a7-2",
              tipo: "corta",
              pregunta: "¿En qué se diferencia la justicia que pide Jesús de la de los escribas y fariseos?",
              ideas: [
                { id: "fuera", peso: 50, texto: "Los escribas y fariseos cuidaban las reglas por fuera.", formas: ["por fuera", "reglas", "apariencia*", "lo de afuera", "lo exterior"] },
                { id: "corazon", peso: 50, texto: "Jesús pide un corazón cambiado por su gracia.", formas: ["corazon", "por dentro", "transformad*", "gracia"] },
              ],
              modelo: "Los escribas y fariseos cuidaban las reglas por fuera. Jesús pide una justicia mayor: un corazón cambiado por su gracia, donde su Espíritu escribe su ley.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. El corazón de la ley
    "n2-sermon-monte-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas veces cita Jesús lo que «fue dicho»?", reverso: "Seis veces, y seis veces responde con autoridad propia.", apoyo: "Seis veces Jesús cita lo que «fue dicho», y seis veces responde con autoridad propia." },
              { frente: "¿Anula Jesús la ley cuando dice «Pero yo os digo»?", reverso: "No: va a su raíz, al corazón.", apoyo: "No anula la ley: va a su raíz, al corazón, donde nacen el pecado y la obediencia." },
              { frente: "¿Qué enseña Jesús sobre el enojo y el desprecio?", reverso: "Que ya son culpables delante de Dios.", apoyo: "Jesús enseña que el enojo y el desprecio ya son culpables delante de Dios" },
              { frente: "¿Qué hay que hacer antes de presentar una ofrenda?", reverso: "Ir y reconciliarse con el hermano.", apoyo: "antes de presentar una ofrenda, hay que ir y reconciliarse" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué frase responde Jesús a lo que «fue dicho»?", reverso: "«Pero yo os digo», con autoridad propia.", apoyo: "Seis veces Jesús cita lo que «fue dicho», y seis veces responde con autoridad propia." },
              { frente: "¿Dónde empieza el adulterio, según Jesús?", reverso: "En la mirada y en el deseo, no en el acto.", apoyo: "El adulterio no empieza en el acto, sino en la mirada y en el deseo." },
              { frente: "¿Por qué el discípulo no necesita juramentos?", reverso: "Porque su palabra es verdad.", apoyo: "El discípulo no necesita juramentos para que le crean: su palabra es verdad." },
              { frente: "¿Para qué servía la ley del «Ojo por ojo»?", reverso: "Para poner un límite al castigo que daban los jueces.", apoyo: "La ley del «Ojo por ojo, y diente por diente» ponía un límite al castigo que daban los jueces" },
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
            consigna: "Sobre «Pero yo os digo»: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Seis veces Jesús cita lo que fue dicho y responde con autoridad propia.", verdad: true, explica: "Jesús no repite a otros: responde con su propia autoridad.", apoyo: "Seis veces Jesús cita lo que «fue dicho», y seis veces responde con autoridad propia.", ref: "Mateo 5:21-22" },
              { texto: "Con «Pero yo os digo», Jesús anula la ley de Dios.", verdad: false, explica: "No anula la ley: va a su raíz, al corazón.", apoyo: "No anula la ley: va a su raíz, al corazón, donde nacen el pecado y la obediencia." },
              { texto: "Jesús va a la raíz de la ley: al corazón.", verdad: true, explica: "En el corazón nacen el pecado y la obediencia.", apoyo: "No anula la ley: va a su raíz, al corazón, donde nacen el pecado y la obediencia." },
            ],
          },
          {
            consigna: "Sobre «Pero yo os digo»: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para Jesús, lo único que cuenta es lo que hacemos por fuera.", verdad: false, explica: "Jesús va a la raíz, al corazón, donde nacen el pecado y la obediencia.", apoyo: "va a su raíz, al corazón, donde nacen el pecado y la obediencia" },
              { texto: "El pecado y la obediencia nacen en el corazón.", verdad: true, explica: "Por eso Jesús lleva los mandamientos al corazón.", apoyo: "va a su raíz, al corazón, donde nacen el pecado y la obediencia" },
              { texto: "Cuando Jesús dice «Pero yo os digo», solo da una opinión más.", verdad: false, explica: "Jesús responde con autoridad propia: no es una opinión más.", apoyo: "seis veces responde con autoridad propia" },
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
            consigna: "Une cada tema con lo que enseña Jesús en Mateo 5.",
            pares: [
              ["La ira", "El enojo y el desprecio ya son culpables delante de Dios"],
              ["La pureza", "El adulterio empieza en la mirada y en el deseo"],
              ["La palabra", "No hacen falta juramentos: la palabra del discípulo es verdad"],
              ["La venganza", "No devolver golpe por golpe"],
            ],
            apoyo: "Jesús lleva los mandamientos al corazón: el enojo, la mirada impura, la palabra falsa y la venganza ya son pecado delante de Dios",
            ref: "Mateo 5:21-39",
            explica: "En cada tema, Jesús va del acto al corazón: el enojo, la mirada impura, la palabra falsa y la venganza ya son pecado delante de Dios.",
          },
          {
            consigna: "Une cada caso con lo que hace el discípulo.",
            pares: [
              ["Frente al enojo con un hermano", "Va y se reconcilia"],
              ["Frente a la mirada impura", "Cuida sus ojos y su corazón"],
              ["Frente a la palabra falsa", "Dice la verdad"],
              ["Frente al mal que le hacen", "No se venga"],
            ],
            apoyo: "el discípulo se reconcilia, cuida su corazón, dice la verdad, no se venga y ama aun a sus enemigos, como el Padre",
            ref: "Mateo 5:21-39",
            explica: "El discípulo se reconcilia, cuida su corazón, dice la verdad y no se venga: obedece desde el corazón.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre lo que enseña Jesús está equivocada. Tócala.",
            frases: [
              "La ley decía «No matarás».",
              "Jesús enseña que el enojo y el desprecio ya son culpables delante de Dios.",
              "Según Jesús, el adulterio empieza solo cuando se comete el acto.",
              "Jesús llama a cortar con firmeza lo que nos lleva a pecar.",
            ],
            malo: 2,
            correccion: "El adulterio no empieza en el acto, sino en la mirada y en el deseo.",
            apoyo: "El adulterio no empieza en el acto, sino en la mirada y en el deseo.",
            ref: "Mateo 5:27-28",
            explica: "Jesús lleva el mandamiento al corazón: llama a cuidar los ojos y el corazón.",
          },
          {
            consigna: "Una de estas frases sobre lo que enseña Jesús está equivocada. Tócala.",
            frases: [
              "Antes de presentar una ofrenda, hay que ir y reconciliarse.",
              "El discípulo no necesita juramentos para que le crean.",
              "La ley del ojo por ojo autorizaba la venganza personal.",
              "Jesús enseña a no devolver golpe por golpe.",
            ],
            malo: 2,
            correccion: "Ponía un límite al castigo que daban los jueces; no autorizaba la venganza personal.",
            apoyo: "La ley del «Ojo por ojo, y diente por diente» ponía un límite al castigo que daban los jueces; no autorizaba la venganza personal.",
            ref: "Mateo 5:38-39",
            explica: "El ojo por ojo era un límite para los jueces, no un permiso para vengarse.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "Frente al mal que le hacen, ¿así responde el discípulo o no? Lleva cada frase a su grupo.",
            grupos: ["Así responde el discípulo al mal", "Así no responde el discípulo"],
            frases: [
              { texto: "No devuelve golpe por golpe", grupo: 0 },
              { texto: "Deja el juicio en manos de Dios", grupo: 0 },
              { texto: "Busca protección si sufre violencia o abuso", grupo: 0, explica: "Quien sufre violencia o abuso puede y debe buscar protección." },
              { texto: "Se venga por su cuenta", grupo: 1 },
              { texto: "Se queda en una situación de abuso", grupo: 1, explica: "Poner la otra mejilla no es quedarse en el abuso." },
              { texto: "Guarda el deseo de vengarse", grupo: 1, explica: "Lo que Jesús nos quita es el deseo de vengarnos." },
            ],
            apoyo: "Jesús prohíbe la venganza personal, no la justicia.",
            ref: "Mateo 5:38-39; Romanos 12:19",
            explica: "Jesús nos quita el deseo de vengarnos, pero no la justicia: Dios dio autoridades para castigar el mal, y quien sufre abuso debe buscar protección.",
          },
          {
            consigna: "Sobre la otra mejilla y la venganza, ¿así enseña Jesús o no? Lleva cada frase a su grupo.",
            grupos: ["Así enseña Jesús", "Así no enseña Jesús"],
            frases: [
              { texto: "Dios dio autoridades para castigar el mal", grupo: 0 },
              { texto: "El discípulo no se venga", grupo: 0 },
              { texto: "Quien sufre abuso puede y debe buscar protección", grupo: 0 },
              { texto: "Poner la otra mejilla es aguantar el abuso", grupo: 1, explica: "Poner la otra mejilla no es quedarse en el abuso: Jesús prohíbe la venganza, no la protección." },
              { texto: "Hay que devolver golpe por golpe", grupo: 1 },
              { texto: "El juicio queda en mis manos", grupo: 1, explica: "El discípulo deja el juicio en manos de Dios." },
            ],
            apoyo: "Dios dio autoridades para castigar el mal (Romanos 13:4), y quien sufre violencia o abuso puede y debe buscar protección.",
            ref: "Mateo 5:38-39; Romanos 13:4",
            explica: "Jesús prohíbe la venganza personal, no la justicia ni la protección: dejamos el juicio en manos de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu compañera de cuarto te dice: La vecina habla mal de nosotras; yo voy a hablar peor de ella.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Hazlo: ella empezó, así que se merece que le pagues con lo mismo.", explica: "Jesús enseña a no devolver golpe por golpe." },
              { texto: "No le hablemos nunca más; que se quede sola y aprenda la lección.", explica: "El desprecio también es culpable delante de Dios." },
              { texto: "Jesús manda bendecir a los que nos maldicen; oremos por ella.", bien: true, explica: "Es lo que manda Jesús: amar a los enemigos y bendecir a los que nos maldicen." },
              { texto: "Amar a los enemigos es solo para los pastores; tú defiéndete.", explica: "Jesús lo manda a todos sus discípulos: así somos como nuestro Padre." },
            ],
            apoyo: "Jesús manda: «Amad a vuestros enemigos, bendecid a los que os maldicen»",
            ref: "Mateo 5:44",
            explica: "Amar al enemigo es bendecir y orar, aun por quien habla mal de nosotros: así somos como nuestro Padre.",
          },
          {
            caso: "Tu primo te dice: Mi jefe me trata mal; no pienso saludarlo ni desearle nada bueno.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Tienes razón: a quien te trata mal no le debes ni un saludo ni nada bueno.", explica: "Jesús manda amar aun a los enemigos y bendecir a los que nos maldicen." },
              { texto: "Págale con la misma moneda: trátalo mal tú también hasta que cambie.", explica: "Jesús enseña a no devolver golpe por golpe." },
              { texto: "Jesús pide amar aun a quien no lo merece: ora por él y bendícelo.", bien: true, explica: "Ser perfectos como el Padre es amar de forma completa, también a quien no lo merece." },
              { texto: "Ama solo a los que te aman: eso es lo justo y lo hace todo el mundo.", explica: "El Padre hace salir su sol sobre malos y buenos: su amor es completo." },
            ],
            apoyo: "Ser perfectos, como el Padre es perfecto, es amar de forma completa, también a quien no lo merece.",
            ref: "Mateo 5:43-48",
            explica: "El discípulo ama como su Padre, que hace salir su sol sobre malos y buenos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Ser perfectos, como el Padre es perfecto, es amar de forma completa, también a quien no lo merece.",
            ref: "Mateo 5:48",
            clave: {
              id: "pr-n2-sermon-monte-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué quiere decir ser perfectos como el Padre es perfecto?",
              ideas: [
                { id: "completo", peso: 50, negativa: true, texto: "Es amar de forma completa, también a quien no lo merece.", formas: ["amar de forma completa", "amor completo", "amar completamente", "a quien no lo merece", "a los que no lo merecen", "no lo merece*", "enemigos"] },
                { id: "padre", peso: 50, texto: "Así somos como el Padre, que hace salir su sol sobre malos y buenos.", formas: ["sol sobre malos", "malos y buenos", "buenos y malos", "como (el|nuestro) padre", "como dios"] },
              ],
              modelo: "Ser perfectos como el Padre es amar de forma completa, también a quien no lo merece. Así somos como nuestro Padre, que hace salir su sol sobre malos y buenos.",
            },
          },
          {
            apoyo: "Así somos como nuestro Padre, que hace salir su sol sobre malos y buenos.",
            ref: "Mateo 5:44-45",
            clave: {
              id: "pr-n2-sermon-monte-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué manda Jesús hacer con los enemigos, y por qué?",
              ideas: [
                { id: "amar", peso: 50, texto: "Amarlos y bendecir a los que nos maldicen.", formas: ["amar* a (los|mis|nuestros|tus|sus) enemigos", "amarlos", "amad", "amemos", "amar*", "bendec*", "bendig*", "orar por"] },
                { id: "padre", peso: 50, texto: "Así somos como nuestro Padre, que hace salir su sol sobre malos y buenos.", formas: ["malos y buenos", "buenos y malos", "como (el|nuestro) padre", "como dios", "hijos (de|del) (dios|padre)"] },
              ],
              modelo: "Jesús manda amar a los enemigos y bendecir a los que nos maldicen. Así somos como nuestro Padre, que hace salir su sol sobre malos y buenos.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. La piedad en lo secreto y el tesoro en el cielo
    "n2-sermon-monte-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué advierte Jesús en Mateo 6:1?", reverso: "De hacer el bien delante de los hombres para ser vistos.", apoyo: "Jesús advierte: «Guardaos de hacer vuestra justicia delante de los hombres, para ser vistos de ellos»" },
              { frente: "¿Cuándo pierden su recompensa dar, orar y ayunar?", reverso: "Cuando se hacen para el aplauso.", apoyo: "pero pierden su recompensa si se hacen para el aplauso" },
              { frente: "¿Quién recompensa la piedad sincera?", reverso: "El Padre, que ve en lo secreto.", apoyo: "El Padre «que ve en lo secreto» es quien recompensa." },
              { frente: "¿Qué pone primero el Padre Nuestro?", reverso: "El nombre, el reino y la voluntad de Dios.", apoyo: "la oración que pone primero el nombre, el reino y la voluntad de Dios, y después nuestras necesidades" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Se puede hacer algo bueno por una razón equivocada?", reverso: "Sí: por eso Jesús examina el motivo de nuestra piedad.", apoyo: "Se puede hacer algo bueno por una razón equivocada." },
              { frente: "¿Por qué Jesús examina nuestro motivo y nuestro tesoro?", reverso: "Porque ahí se ve a quién servimos de verdad.", apoyo: "porque ahí se ve a quién servimos de verdad" },
              { frente: "¿Qué oración enseña Jesús en el centro del sermón?", reverso: "El Padre Nuestro.", apoyo: "En el centro del sermón, Jesús enseña el Padre Nuestro" },
              { frente: "En el Padre Nuestro, ¿qué va después del nombre, el reino y la voluntad de Dios?", reverso: "Nuestras necesidades.", apoyo: "la oración que pone primero el nombre, el reino y la voluntad de Dios, y después nuestras necesidades" },
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
            ref: "Mateo 6:1",
            consigna: "¿Con qué motivo no hay que hacer el bien, según Jesús? Toca esas palabras.",
            texto: "Guardaos de hacer vuestra justicia delante de los hombres, [[para ser vistos]] de ellos",
            apoyo: "pero pierden su recompensa si se hacen para el aplauso",
            explica: "Dar, orar y ayunar son buenos, pero hacerlos para ser vistos les quita su recompensa.",
          },
          {
            ref: "Mateo 6:6",
            consigna: "¿Dónde ve el Padre, que es quien recompensa? Toca la palabra.",
            texto: "que ve en lo [[secreto]]",
            apoyo: "El Padre «que ve en lo secreto» es quien recompensa.",
            explica: "El discípulo no busca el aplauso: el Padre ve en lo secreto, y Él es quien recompensa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Se hace para ser vistos o para el Padre? Lleva cada frase a su grupo.",
            grupos: ["Para ser vistos", "Para el Padre, en lo secreto"],
            frases: [
              { texto: "Dar una ofrenda y contárselo a todos", grupo: 0 },
              { texto: "Orar en voz alta para que me admiren", grupo: 0 },
              { texto: "Ayunar y publicarlo en mis redes", grupo: 0 },
              { texto: "Ayudar a un vecino sin decírselo a nadie", grupo: 1 },
              { texto: "Orar a solas con el Padre", grupo: 1 },
              { texto: "Dar sin buscar el aplauso", grupo: 1 },
            ],
            apoyo: "El Padre «que ve en lo secreto» es quien recompensa.",
            ref: "Mateo 6:1-6",
            explica: "Lo bueno hecho para el aplauso pierde su recompensa; el Padre ve en lo secreto y recompensa.",
          },
          {
            consigna: "¿Pierde su recompensa o la recompensa el Padre? Lleva cada frase a su grupo.",
            grupos: ["Pierde su recompensa", "El Padre lo recompensa"],
            frases: [
              { texto: "Hacer el bien para que me aplaudan", grupo: 0 },
              { texto: "Orar para que los demás me vean", grupo: 0 },
              { texto: "Dar delante de la gente para que me alaben", grupo: 0 },
              { texto: "Dar en secreto", grupo: 1 },
              { texto: "Ayunar sin que nadie lo note", grupo: 1 },
              { texto: "Servir a escondidas, solo para Dios", grupo: 1 },
            ],
            apoyo: "pero pierden su recompensa si se hacen para el aplauso",
            ref: "Mateo 6:1-18",
            explica: "Jesús examina el motivo: lo que se hace para el aplauso pierde su recompensa; lo que se hace para el Padre, Él lo recompensa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada idea con lo que enseña Jesús sobre el tesoro.",
            pares: [
              ["Lo que atesoramos", "Revela lo que amamos"],
              ["Los tesoros de la tierra", "Se pierden"],
              ["Los tesoros del cielo", "Permanecen"],
              ["El dinero", "Es un buen siervo, pero un amo cruel"],
            ],
            apoyo: "Lo que atesoramos revela lo que amamos",
            ref: "Mateo 6:19-21",
            explica: "El tesoro muestra el corazón: lo de la tierra se pierde y lo del cielo, como la generosidad y la fidelidad, permanece.",
          },
          {
            consigna: "Une cada comienzo con su final.",
            pares: [
              ["Donde está tu tesoro", "Allí está también tu corazón"],
              ["Nadie puede servir", "A Dios y a las riquezas"],
              ["El discípulo usa el dinero", "Para servir a Dios y al prójimo"],
              ["Tu agenda y tu cuenta del banco", "Cuentan dónde está tu corazón"],
            ],
            apoyo: "Tu agenda y tu cuenta del banco cuentan dónde está tu corazón.",
            ref: "Mateo 6:21, 24",
            explica: "Lo que hacemos con el tiempo y el dinero muestra a quién servimos: nadie puede servir a Dios y a las riquezas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa Mateo 6:33, el versículo para memorizar de la materia.",
            texto: "«buscad [[primeramente]] el reino de Dios y su [[justicia]], y todas estas cosas os serán [[añadidas]]»",
            distractores: ["solamente", "riqueza", "quitadas"],
            errores: {
              solamente: "Jesús dice primeramente: el reino de Dios va primero, y lo demás será añadido.",
              riqueza: "Se busca el reino de Dios y su justicia, no la riqueza.",
              quitadas: "Jesús promete que todas estas cosas serán añadidas.",
            },
            apoyo: "«buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas»",
            ref: "Mateo 6:33",
            explica: "Buscar primero el reino de Dios es la prioridad nueva que vence la ansiedad: el Padre añade lo demás.",
          },
          {
            consigna: "Completa cómo se vence la ansiedad, según Jesús.",
            texto: "La ansiedad se vence con [[confianza]] y con prioridades [[nuevas]]. Si el Padre cuida las aves del cielo y los [[lirios]] del campo, cuánto más a sus hijos.",
            distractores: ["esfuerzo", "viejas", "árboles"],
            errores: {
              esfuerzo: "La ansiedad no se vence con más esfuerzo, sino con confianza en el Padre.",
              viejas: "Jesús llama a prioridades nuevas: buscar primero el reino de Dios.",
            },
            apoyo: "La ansiedad se vence con confianza y con prioridades nuevas",
            ref: "Mateo 6:26-30",
            explica: "Mirar las aves y los lirios nos recuerda que el Padre cuida de sus hijos; por eso confiamos y buscamos primero su reino.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu esposa te dice: No sé cómo vamos a pagar la renta este mes; no puedo dejar de pensar en eso.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Preocúpate más; si no te afanas tú, nadie va a resolver lo de la renta.", explica: "Jesús dice: no os afanéis. La ansiedad se vence con confianza en el Padre." },
              { texto: "Confiemos en el Padre, que cuida las aves, y busquemos primero su reino.", bien: true, explica: "Es lo que enseña Jesús: confiar en el Padre y buscar primero su reino." },
              { texto: "Dios no se ocupa de esas cosas; eso nos toca resolverlo a nosotros solos.", explica: "Si el Padre cuida las aves del cielo y los lirios del campo, cuánto más a sus hijos." },
              { texto: "Dejemos de ir a la iglesia y trabajemos también los domingos para pagar.", explica: "Jesús llama a buscar primeramente el reino de Dios; las demás cosas serán añadidas." },
            ],
            apoyo: "La ansiedad se vence con confianza y con prioridades nuevas",
            ref: "Mateo 6:31-34",
            explica: "La ansiedad se vence con confianza en el Padre, que cuida de sus hijos, y con prioridades nuevas: su reino primero.",
          },
          {
            caso: "Un amigo te dice: Estoy tan ocupado haciendo dinero que ya no tengo tiempo para Dios.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Tranquilo: primero junta bastante dinero, y después ya buscarás a Dios.", explica: "Jesús llama a buscar primeramente el reino de Dios, no después." },
              { texto: "Está bien: el que trabaja tanto ya está sirviendo a Dios con su dinero.", explica: "Nadie puede servir a Dios y a las riquezas: el discípulo no vive para el dinero." },
              { texto: "Deja ya tu trabajo: el dinero es malo y Dios no quiere que lo tengas.", explica: "El dinero es un buen siervo: el discípulo lo usa para servir a Dios y al prójimo." },
              { texto: "Busca primero el reino de Dios; lo demás, el Padre te lo añadirá.", bien: true, explica: "Es la promesa de Mateo 6:33: buscar primero el reino, y todas estas cosas serán añadidas." },
            ],
            apoyo: "«buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas»",
            ref: "Mateo 6:33",
            explica: "El discípulo no vive para el dinero: pone primero el reino de Dios y confía en que el Padre añade lo demás.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Lo que atesoramos revela lo que amamos",
            ref: "Mateo 6:19-21",
            clave: {
              id: "pr-n2-sermon-monte-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseña Jesús cuando dice que donde está tu tesoro, allí está tu corazón?",
              ideas: [
                { id: "revela", peso: 50, texto: "Lo que atesoramos revela lo que amamos.", formas: ["revela*", "lo que amamos", "lo que amas", "lo que mas amamos", "muestra* lo que", "muestra* (a|lo) que"] },
                { id: "cielo", peso: 50, texto: "Los tesoros de la tierra se pierden; los del cielo permanecen.", formas: ["se pierde*", "permanec*", "tesoros del cielo", "tesoro en el cielo", "en el cielo"] },
              ],
              modelo: "Lo que atesoramos revela lo que amamos. Por eso conviene guardar tesoros en el cielo, como la generosidad y la fidelidad, que permanecen, porque los tesoros de la tierra se pierden.",
            },
          },
          {
            apoyo: "El dinero es un buen siervo, pero un amo cruel: el discípulo lo usa para servir a Dios y al prójimo, y no vive para él.",
            ref: "Mateo 6:24",
            clave: {
              id: "pr-n2-sermon-monte-5-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo usa el discípulo el dinero, según Jesús?",
              ideas: [
                { id: "siervo", peso: 50, texto: "Lo usa para servir a Dios y al prójimo.", formas: ["servir a dios", "servir al projimo", "al projimo", "ayudar*", "buen siervo", "lo usa para"] },
                { id: "amo", peso: 50, negativa: true, texto: "No vive para el dinero: nadie puede servir a Dios y a las riquezas.", formas: ["no vive para", "amo cruel", "nadie puede servir", "no se puede servir", "dos senores", "no sirve al dinero", "no sirve a las riquezas"] },
              ],
              modelo: "El discípulo usa el dinero para servir a Dios y al prójimo, pero no vive para él: el dinero es un buen siervo, pero un amo cruel, y nadie puede servir a Dios y a las riquezas.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Los dos caminos y la casa sobre la roca
    "n2-sermon-monte-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué tipo de juicio prohíbe Jesús?", reverso: "El juicio hipócrita, que ve la paja ajena y no la viga propia.", apoyo: "Jesús prohíbe el juicio hipócrita, que mira «la paja que está en el ojo de tu hermano» y no ve la viga en el propio." },
              { frente: "¿Prohíbe Jesús todo discernimiento?", reverso: "No: pide reconocer a los falsos profetas por sus frutos.", apoyo: "No prohíbe el discernimiento: el mismo capítulo pide reconocer a los falsos profetas por sus frutos" },
              { frente: "¿Qué orden enseña Jesús antes de corregir a otro?", reverso: "Primero examinarme yo, y después ayudar a mi hermano.", apoyo: "El orden es claro: primero examinarme yo, y después ayudar a mi hermano con humildad." },
              { frente: "¿Con qué termina Jesús su sermón?", reverso: "Con una decisión: cada oyente escoge sobre qué edificar.", apoyo: "Jesús termina su sermón con una decisión." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo es el Padre celestial comparado con los padres de la tierra?", reverso: "Es mejor que el mejor padre de la tierra.", apoyo: "El Padre celestial es mejor que el mejor padre de la tierra" },
              { frente: "¿Qué es la regla de oro?", reverso: "Tratar a los demás como queremos ser tratados.", apoyo: "De esa bondad nace la regla de oro: tratar a los demás como queremos ser tratados" },
              { frente: "¿De dónde nace la regla de oro?", reverso: "De la bondad del Padre, que da buenas cosas.", apoyo: "De esa bondad nace la regla de oro" },
              { frente: "¿Cuándo aparece la diferencia entre las dos casas?", reverso: "En la tormenta: en días de sol se ven iguales.", apoyo: "Las dos casas se ven iguales en días de sol; la diferencia aparece en la tormenta." },
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
            consigna: "¿Es juzgar con hipocresía o discernir con humildad? Lleva cada frase a su grupo.",
            grupos: ["Juzgar con hipocresía", "Discernir con humildad"],
            frases: [
              { texto: "Ver la paja en el ojo del hermano y no la viga en el propio", grupo: 0 },
              { texto: "Criticar a otros sin examinarme primero", grupo: 0 },
              { texto: "Señalar la falta del hermano sin ver la mía", grupo: 0 },
              { texto: "Examinarme yo primero", grupo: 1 },
              { texto: "Ayudar a mi hermano con humildad", grupo: 1 },
              { texto: "Reconocer a los falsos profetas por sus frutos", grupo: 1, explica: "Jesús no prohíbe el discernimiento: pide reconocer a los falsos profetas por sus frutos." },
            ],
            apoyo: "El orden es claro: primero examinarme yo, y después ayudar a mi hermano con humildad.",
            ref: "Mateo 7:1-5",
            explica: "Jesús prohíbe el juicio hipócrita, no el discernimiento: primero me examino yo y después ayudo a mi hermano con humildad.",
          },
          {
            consigna: "¿Lo prohíbe Jesús o lo pide? Lleva cada frase a su grupo.",
            grupos: ["Lo que Jesús prohíbe", "Lo que Jesús pide"],
            frases: [
              { texto: "El juicio hipócrita", grupo: 0 },
              { texto: "Fijarme solo en la falta ajena", grupo: 0 },
              { texto: "Corregir al hermano sin humildad", grupo: 0 },
              { texto: "El discernimiento", grupo: 1 },
              { texto: "Conocer el árbol por sus frutos", grupo: 1 },
              { texto: "Examinarme antes de ayudar a otro", grupo: 1 },
            ],
            apoyo: "Jesús prohíbe el juicio hipócrita, que mira «la paja que está en el ojo de tu hermano» y no ve la viga en el propio.",
            ref: "Mateo 7:1-5, 15-20",
            explica: "Jesús no pide cerrar los ojos al mal: pide discernir por los frutos, empezando por examinarse uno mismo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 7:11",
            consigna: "¿Qué dará el Padre a los que le pidan? Toca esas palabras.",
            texto: "¿cuánto más vuestro Padre que está en los cielos dará [[buenas cosas]] a los que le pidan?",
            apoyo: "El Padre celestial es mejor que el mejor padre de la tierra",
            explica: "Si un buen padre de la tierra da cosas buenas a sus hijos, cuánto más el Padre celestial a los que le piden.",
          },
          {
            ref: "Mateo 7:12",
            consigna: "¿Qué resume la regla de oro, según Jesús? Toca esas palabras.",
            texto: "esto es [[la ley y los profetas]]",
            apoyo: "De esa bondad nace la regla de oro: tratar a los demás como queremos ser tratados",
            explica: "Tratar a los demás como queremos ser tratados resume la ley y los profetas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu compañero de trabajo te dice: El jefe me culpó por un error tuyo; ¿le vas a decir la verdad?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "No puedo decirle la verdad: si lo hago, el jefe se va a enojar conmigo.", explica: "La regla de oro pide tratar a los demás como queremos ser tratados." },
              { texto: "Sí, le diré la verdad: yo querría que tú hicieras lo mismo por mí.", bien: true, explica: "Es la regla de oro: tratar a los demás como queremos ser tratados." },
              { texto: "Cada uno se defiende como puede en este trabajo; tú arréglatelas solo.", explica: "Tú querrías que otro dijera la verdad por ti: eso pide la regla de oro." },
              { texto: "Te digo después; primero voy a pensar si me conviene decirle la verdad.", explica: "La regla de oro no pregunta qué me conviene, sino cómo querría yo ser tratado." },
            ],
            apoyo: "De esa bondad nace la regla de oro: tratar a los demás como queremos ser tratados",
            ref: "Mateo 7:12",
            explica: "La regla de oro resume la ley y los profetas: trato a los demás como quiero ser tratado.",
          },
          {
            caso: "Tu hermana te dice: Ya le pedí a Dios por un trabajo muchas veces; creo que no le importo.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Tienes razón: Dios no se ocupa de cosas tan pequeñas como un trabajo.", explica: "El Padre celestial es mejor que el mejor padre de la tierra y da buenas cosas a los que le piden." },
              { texto: "Sigue pidiendo: el Padre es mejor que el mejor padre y da buenas cosas.", bien: true, explica: "Es la promesa de Jesús: cuánto más el Padre dará buenas cosas a los que le pidan." },
              { texto: "Prométele algo a cambio a Dios; así seguro que te va a responder pronto.", explica: "El Padre no da por un pago: da buenas cosas porque es bueno." },
              { texto: "Si Dios no te respondió a la primera vez, es que no te quiere ayudar.", explica: "Jesús invita a pedir, buscar y llamar, confiando en la bondad del Padre." },
            ],
            apoyo: "El Padre celestial es mejor que el mejor padre de la tierra",
            ref: "Mateo 7:7-11",
            explica: "Jesús invita a pedir, buscar y llamar, porque el Padre es bueno y da buenas cosas a los que le piden.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se unen estas ideas sobre la casa sobre la roca? Toca cada enlace y elige la relación.",
            nodos: [
              { id: "oir", texto: "Oír las palabras de Jesús", x: 25, y: 10 },
              { id: "hacer", texto: "Hacerlas, confiando en Él", x: 75, y: 32 },
              { id: "roca", texto: "Edificar sobre la roca", x: 25, y: 60 },
              { id: "tormenta", texto: "La tormenta", x: 75, y: 88 },
            ],
            enlaces: [
              { de: "oir", a: "hacer", relacion: "no basta sin" },
              { de: "hacer", a: "roca", relacion: "es" },
              { de: "roca", a: "tormenta", relacion: "se nota en" },
            ],
            distractores: ["reemplaza a", "se gana con"],
            apoyo: "Edificar sobre la roca es poner por obra lo que Jesús enseña, confiando en Él.",
            ref: "Mateo 7:24-27",
            explica: "No basta con oír: edificar sobre la roca es poner por obra lo que Jesús enseña, confiando en Él, y la diferencia aparece en la tormenta.",
          },
          {
            consigna: "¿Qué hace cada constructor con las palabras de Jesús? Toca cada enlace y elige la relación.",
            nodos: [
              { id: "pru", texto: "El prudente", x: 25, y: 12 },
              { id: "pal", texto: "Las palabras de Jesús", x: 75, y: 35 },
              { id: "ins", texto: "El insensato", x: 25, y: 60 },
              { id: "are", texto: "La arena", x: 75, y: 88 },
            ],
            enlaces: [
              { de: "pru", a: "pal", relacion: "oye y hace" },
              { de: "ins", a: "pal", relacion: "oye, pero no obedece" },
              { de: "ins", a: "are", relacion: "edifica sobre" },
            ],
            distractores: ["no basta con", "se gana con"],
            apoyo: "El prudente es el que oye las palabras de Jesús «y las hace»; el insensato también oye, pero no obedece.",
            ref: "Mateo 7:24-27",
            explica: "Los dos oyen las palabras de Jesús; el prudente las hace y edifica sobre la roca, y el insensato no obedece y edifica sobre la arena.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte del final del Sermón con lo que enseña.",
            pares: [
              ["El camino ancho", "Lleva a la perdición"],
              ["El camino angosto", "Lleva a la vida"],
              ["El árbol bueno", "Da buenos frutos"],
              ["Los falsos profetas", "Se conocen por sus frutos"],
            ],
            apoyo: "Dos puertas y dos caminos: el ancho, que lleva a la perdición, y el angosto, que lleva a la vida (7:13-14).",
            ref: "Mateo 7:13-20",
            explica: "Jesús termina con una decisión: dos puertas, dos caminos y dos árboles que se conocen por sus frutos.",
          },
          {
            consigna: "Une cada idea con lo que dice Jesús al final del Sermón.",
            pares: [
              ["El prudente", "Oye las palabras de Jesús y las hace"],
              ["El insensato", "Oye, pero no obedece"],
              ["Decir Señor, Señor", "No basta: entra el que hace la voluntad del Padre"],
              ["Las dos casas en días de sol", "Se ven iguales"],
            ],
            apoyo: "El prudente es el que oye las palabras de Jesús «y las hace»; el insensato también oye, pero no obedece.",
            ref: "Mateo 7:21-27",
            explica: "No basta con oír ni con decir Señor, Señor: entra el que hace la voluntad del Padre, y la diferencia aparece en la tormenta.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Las dos casas se ven iguales en días de sol; la diferencia aparece en la tormenta.",
            ref: "Mateo 7:24-27",
            clave: {
              id: "pr-n2-sermon-monte-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre el que edifica sobre la roca y el que edifica sobre la arena?",
              ideas: [
                { id: "hacer", peso: 60, texto: "El prudente oye las palabras de Jesús y las hace; el insensato oye, pero no obedece.", formas: ["las hace", "las pone por obra", "pone* por obra", "obedec*", "hace lo que", "hacer lo que", "hacerlo", "hacerlas", "lo hace", "cumpl*", "practic*"] },
                { id: "tormenta", peso: 40, texto: "La diferencia aparece en la tormenta: lo decide el cimiento.", formas: ["tormenta*", "cimiento*", "en la prueba", "dias de sol"] },
              ],
              modelo: "Los dos oyen las palabras de Jesús, pero el prudente las hace y el insensato no obedece. En días de sol las casas se ven iguales; la diferencia aparece en la tormenta, porque lo decide el cimiento.",
            },
          },
          {
            apoyo: "Edificar sobre la roca es poner por obra lo que Jesús enseña, confiando en Él.",
            ref: "Mateo 7:24",
            clave: {
              id: "pr-n2-sermon-monte-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué es edificar la vida sobre la roca?",
              ideas: [
                { id: "obra", peso: 60, texto: "Es poner por obra lo que Jesús enseña: oír sus palabras y hacerlas.", formas: ["poner* por obra", "pone* por obra", "hacer* (lo|sus|las)", "hacerlo", "hacerlas", "hacer lo que", "lo hace*", "las hace", "obedec*", "cumpl*", "practic*", "vivir lo que"] },
                { id: "confiar", peso: 40, texto: "Hacerlo confiando en Él.", formas: ["confi*", "fe en (el|jesus)"] },
              ],
              modelo: "Edificar sobre la roca es oír las palabras de Jesús y ponerlas por obra, confiando en Él. No basta con oír: hay que hacer lo que Él enseña.",
            },
          },
        ],
      },
    ],
  },
};
