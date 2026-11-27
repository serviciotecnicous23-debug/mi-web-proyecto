/**
 * Las prácticas de «Teología del avivamiento» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-avivamiento.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada afirmación sigue la lección con sus mismas palabras, y lo que la lección atribuye a la
 * declaración de fe (el artículo 15), a Jonathan Edwards o a la Iglesia Morava se pregunta con esa misma atribución. Las
 * lenguas como señal inicial del bautismo en el Espíritu son un punto de la declaración de fe por confirmar (lecciones 3
 * y 4): ninguna actividad pregunta por ese punto, ni por lo que se enseñó sobre él en la calle Azusa, ni por las lenguas.
 * Pentecostés se practica con la promesa de Joel, los discípulos unánimes y llenos del Espíritu Santo, y la iglesia que
 * nació con poder. Las manifestaciones (lección 5) se preguntan solo con lo que la lección afirma: para Edwards, las
 * lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea, y las
 * manifestaciones del Espíritu no se oponen al orden.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_AVIVAMIENTO: PracticasMateria = {
  materia: "n5-avivamiento",
  mision: {
    titulo: "Aviva tu obra en nuestro tiempo",
    intro: "Tu pastor te pidió que prepares a los líderes de la iglesia para una temporada de búsqueda de Dios. Te van a preguntar qué es de verdad un avivamiento, qué enseñan los de Ezequías, Josías y Esdras y Nehemías, qué pasó en Pentecostés y en el libro de los Hechos, qué hizo Dios en la historia desde Herrnhut hasta Valparaíso, cómo se discierne lo que sucede y cómo se busca el avivamiento y se cuidan sus frutos. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes guiar a la iglesia a buscar el avivamiento con oración, arrepentimiento y la Palabra, sin fabricar nada; a discernir con Cristo y el fruto, abierta al Espíritu y firme en la Palabra; y a cuidar sus frutos con discipulado y con obreros. El avivamiento empieza por el pueblo de Dios, y el pueblo de Dios empieza por ti.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Qué es el avivamiento?
    "n5-avivamiento-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es avivar, según la lección?", reverso: "Dar vida de nuevo a lo que ya era de Dios.", apoyo: "Avivar es dar vida de nuevo a lo que ya era de Dios" },
              { frente: "¿Dónde empieza el avivamiento: en el pueblo de Dios o en el mundo?", reverso: "En el pueblo de Dios, no en el mundo.", apoyo: "el avivamiento empieza en el pueblo de Dios, no en el mundo" },
              { frente: "¿Para qué cosas se usa a veces la palabra avivamiento?", reverso: "Para un culto emotivo, una campaña o una semana de reuniones.", apoyo: "La palabra avivamiento se usa para muchas cosas: un culto emotivo, una campaña, una semana de reuniones" },
              { frente: "Según el artículo 15, ¿a qué despierta el Espíritu a la iglesia?", reverso: "A la santidad, la oración y el primer amor.", apoyo: "la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor" },
            ],
          },
          {
            tarjetas: [
              { frente: "En la Biblia, ¿qué es el avivamiento, más que un culto emotivo?", reverso: "Dios devolviendo la vida a su pueblo.", apoyo: "En la Biblia es algo más profundo: Dios devolviendo la vida a su pueblo" },
              { frente: "¿Cómo se busca el avivamiento, según el artículo 15?", reverso: "Con oración, con arrepentimiento y con obediencia a la Palabra.", apoyo: "Se busca con oración, con arrepentimiento y con obediencia a la Palabra" },
              { frente: "Según el artículo 15, ¿a quiénes alcanza con poder la obra del Espíritu?", reverso: "A los perdidos.", apoyo: "y que alcanza con poder a los perdidos" },
              { frente: "¿A qué clase de corazón promete Dios vida, según Isaías 57:15?", reverso: "Al quebrantado y humilde de espíritu.", apoyo: "Dios promete vida a un tipo de corazón" },
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
            consigna: "Completa cómo define el avivamiento el artículo 15 de la declaración de fe.",
            texto: "El artículo 15 define el avivamiento como la obra del Espíritu que despierta a la iglesia a la [[santidad]], la oración y el primer [[amor]], y alcanza con [[poder]] a los perdidos.",
            distractores: ["emoción", "templo", "presión"],
            errores: {
              "emoción": "El avivamiento no es un culto emotivo: el Espíritu despierta a la iglesia a la santidad.",
              templo: "El Espíritu despierta a la iglesia a la santidad, la oración y el primer amor.",
              "presión": "El avivamiento alcanza con poder a los perdidos, no con presión.",
            },
            apoyo: "El artículo 15 de la declaración de fe lo define como la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos",
            explica: "El artículo 15 de la declaración de fe define el avivamiento como la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos.",
          },
          {
            consigna: "Completa lo que es avivar, según la lección.",
            texto: "Avivar es dar [[vida]] de nuevo a lo que ya era de Dios: el avivamiento empieza en su [[pueblo]] y lo lanza con poder hacia los [[perdidos]].",
            distractores: ["fama", "mundo", "templos"],
            errores: {
              fama: "Avivar es dar vida de nuevo a lo que ya era de Dios.",
              mundo: "El avivamiento empieza en el pueblo de Dios, no en el mundo.",
              templos: "El avivamiento lanza con poder al pueblo de Dios hacia los perdidos.",
            },
            apoyo: "Avivar es dar vida de nuevo a lo que ya era de Dios: el avivamiento empieza en el pueblo de Dios, no en el mundo",
            explica: "Avivar es dar vida de nuevo a lo que ya era de Dios. Por eso el avivamiento empieza en el pueblo de Dios, no en el mundo, y lo lanza con poder hacia los perdidos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué le pide el salmista a Dios que vuelva a hacer con su pueblo? Toca las palabras que lo dicen.",
            texto: "¿No volverás a [[darnos vida]], Para que tu pueblo se regocije en ti?",
            apoyo: "Avivar es dar vida de nuevo a lo que ya era de Dios",
            ref: "Salmos 85:6",
            explica: "El salmista ora: «¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?». Avivar es dar vida de nuevo a lo que ya era de Dios.",
          },
          {
            consigna: "Según Isaías 57:15, ¿con quién habita Dios? Toca las palabras que lo dicen.",
            texto: "con el [[quebrantado]] y [[humilde de espíritu]], para hacer vivir el espíritu de los humildes",
            apoyo: "Dios promete vida a un tipo de corazón",
            ref: "Isaías 57:15",
            explica: "Dios promete vida a un tipo de corazón: habita «con el quebrantado y humilde de espíritu, para hacer vivir el espíritu de los humildes».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es avivamiento, evangelización o un despertar? Lleva cada frase a su grupo.",
            grupos: ["Avivamiento", "Evangelización", "Un despertar"],
            frases: [
              { texto: "Dios renueva la vida de su iglesia", grupo: 0 },
              { texto: "Los creyentes vuelven a la santidad y al primer amor", grupo: 0 },
              { texto: "La iglesia vuelve a la oración", grupo: 0 },
              { texto: "La iglesia anuncia el evangelio a los que no creen", grupo: 1 },
              { texto: "Una campaña para anunciar el evangelio", grupo: 1, explica: "Una campaña puede ser fruto de un avivamiento, pero no es lo mismo: es evangelización." },
              { texto: "Una sociedad entera es transformada", grupo: 2 },
              { texto: "El avivamiento se desborda fuera de la iglesia", grupo: 2 },
              { texto: "Lo que pasó en el Gran Despertar del siglo XVIII", grupo: 2 },
            ],
            apoyo: "El avivamiento: Dios renueva la vida de su iglesia, y los creyentes vuelven a la santidad, la oración y el primer amor",
            explica: "En el avivamiento Dios renueva la vida de su iglesia; en la evangelización la iglesia anuncia el evangelio a los que no creen; y en un despertar el avivamiento se desborda y transforma a una sociedad entera.",
          },
          {
            consigna: "¿Qué muestra cada ejemplo: un avivamiento, la evangelización o un despertar? Lleva cada frase a su grupo.",
            grupos: ["Avivamiento", "Evangelización", "Un despertar"],
            frases: [
              { texto: "Una iglesia fría vuelve a orar y a amar a Dios", grupo: 0 },
              { texto: "Los creyentes se arrepienten y buscan la santidad", grupo: 0 },
              { texto: "El Espíritu despierta a la iglesia al primer amor", grupo: 0 },
              { texto: "Una semana de predicación en el parque para los que no creen", grupo: 1 },
              { texto: "Los hermanos visitan el barrio para anunciar el evangelio", grupo: 1 },
              { texto: "Toda una sociedad cambia porque el avivamiento se desborda", grupo: 2 },
              { texto: "Una nación entera es transformada, como en el siglo XVIII", grupo: 2 },
            ],
            apoyo: "Un despertar: el avivamiento se desborda y transforma a una sociedad entera, como el Gran Despertar del siglo XVIII",
            explica: "Cuando la iglesia vuelve a la santidad, la oración y el primer amor, es avivamiento; anunciar el evangelio a los que no creen es evangelización; y cuando el avivamiento se desborda y transforma a una sociedad entera, se habla de un despertar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el avivamiento y la evangelización: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una campaña de evangelización puede ser fruto de un avivamiento.", verdad: true, explica: "Una campaña puede ser fruto de un avivamiento, pero no es lo mismo: la evangelización anuncia el evangelio a los que no creen.", apoyo: "Una campaña puede ser fruto de un avivamiento, pero no es lo mismo" },
              { texto: "El avivamiento y una campaña de evangelización son lo mismo.", verdad: false, explica: "No es lo mismo: en el avivamiento Dios renueva la vida de su iglesia, y en la evangelización la iglesia anuncia el evangelio a los que no creen.", apoyo: "No es lo mismo que una campaña de evangelización, aunque la produce" },
              { texto: "En el avivamiento, Dios renueva la vida de su iglesia.", verdad: true, explica: "En el avivamiento, Dios renueva la vida de su iglesia, y los creyentes vuelven a la santidad, la oración y el primer amor.", apoyo: "El avivamiento: Dios renueva la vida de su iglesia" },
            ],
          },
          {
            consigna: "Sobre el avivamiento y el despertar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando el avivamiento transforma a toda una sociedad, se habla de un despertar.", verdad: true, explica: "En un despertar, el avivamiento se desborda y transforma a una sociedad entera, como el Gran Despertar del siglo XVIII.", apoyo: "cuando transforma a toda una sociedad se habla de un despertar" },
              { texto: "El avivamiento empieza en el mundo y después llega a la iglesia.", verdad: false, explica: "Avivar es dar vida de nuevo a lo que ya era de Dios: el avivamiento empieza en el pueblo de Dios, no en el mundo.", apoyo: "el avivamiento empieza en el pueblo de Dios, no en el mundo" },
              { texto: "Un despertar se queda dentro de la iglesia y no toca a la sociedad.", verdad: false, explica: "En un despertar, el avivamiento se desborda y transforma a una sociedad entera.", apoyo: "Un despertar: el avivamiento se desborda y transforma a una sociedad entera" },
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
            apoyo: "La necesidad de avivamiento se nota cuando una iglesia sigue trabajando, pero ha perdido el amor",
            ref: "Apocalipsis 2:4-5",
            situacion: "Eres el pastor de una iglesia con muchas actividades y buena enseñanza de la doctrina. En la reunión de líderes, una hermana confiesa que sirve cansada y que ya no ora como antes.",
            escenas: [
              {
                id: "e1",
                narra: "Otros líderes cuentan lo mismo: trabajan mucho, pero sin gozo y sin amor por el Señor.",
                pregunta: "¿Qué ves en tu iglesia?",
                opciones: [
                  { texto: "Una señal de que necesita avivamiento: trabaja, pero perdió el amor.", valor: 2, explica: "La necesidad de avivamiento se nota cuando una iglesia sigue trabajando, pero ha perdido el amor.", siguiente: "e2" },
                  { texto: "Una iglesia sana: si hay actividades y buena doctrina, no le falta nada.", valor: 0, explica: "Éfeso era activa y firme en la doctrina, y aun así Jesús le dijo: «has dejado tu primer amor».", siguiente: "e1b" },
                  { texto: "Un cansancio normal, aunque convendría orar un poco más por los líderes.", valor: 1, explica: "Orar por ellos ayuda, pero la señal es más profunda: la iglesia sigue trabajando, pero ha perdido el amor.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan los meses. Hay cada vez más actividades, pero menos oración y menos amor entre los hermanos.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Reconoces con los líderes que necesitan avivamiento, como Éfeso.", valor: 2, explica: "Como Éfeso, que era activa y firme en la doctrina, una iglesia puede seguir trabajando y haber perdido el amor: entonces necesita avivamiento.", siguiente: "e2" },
                  { texto: "Agregas todavía más actividades, para que nadie note que falta el amor.", valor: 0, explica: "Más actividades no devuelven el amor: la iglesia sigue trabajando, pero ha perdido el amor, y necesita avivamiento.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Los líderes te preguntan qué camino seguir.",
                pregunta: "¿Qué les propones?",
                opciones: [
                  { texto: "Recordar de dónde han caído, arrepentirse y hacer las primeras obras.", valor: 2, explica: "Es el camino que Jesús le dio a Éfeso: «Recuerda, por tanto, de dónde has caído, y arrepiéntete, y haz las primeras obras»." },
                  { texto: "Organizar un culto muy emotivo, para que todos vuelvan a sentirse bien.", valor: 0, explica: "La palabra avivamiento se usa para un culto emotivo, pero en la Biblia es algo más profundo: Dios devolviendo la vida a su pueblo." },
                  { texto: "Orar por un avivamiento, aunque sin arrepentirse de nada en particular.", valor: 1, explica: "Orar está bien, pero el avivamiento se busca con oración, con arrepentimiento y con obediencia a la Palabra." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder joven dice: Que se arrepientan los demás; yo estoy bien.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el pueblo de Dios empieza por cada uno de nosotros.", valor: 2, explica: "El avivamiento empieza por el pueblo de Dios, y el pueblo de Dios empieza por mí. Dios habita con el quebrantado y humilde de espíritu." },
                  { texto: "Que tiene razón: el problema casi siempre está en los otros hermanos.", valor: 0, explica: "El avivamiento empieza por el pueblo de Dios, y el pueblo de Dios empieza por mí." },
                  { texto: "Que primero tienen que arrepentirse los del mundo, que no creen en Cristo.", valor: 0, explica: "El avivamiento empieza en el pueblo de Dios, no en el mundo." },
                ],
              },
            ],
          },
          {
            apoyo: "Pedro unió el arrepentimiento con la renovación",
            ref: "Hechos 3:19",
            situacion: "Enseñas en la academia de líderes de tu iglesia. Un grupo de líderes de célula te pide ayuda: sus grupos se reúnen cada semana, pero la oración se enfrió.",
            escenas: [
              {
                id: "e1",
                narra: "Un líder te dice: Seguimos haciendo todo, pero por costumbre, sin amor.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que es como Éfeso: sigue trabajando, pero dejó su primer amor.", valor: 2, explica: "La necesidad de avivamiento se nota cuando una iglesia sigue trabajando, pero ha perdido el amor, como Éfeso.", siguiente: "e2" },
                  { texto: "Que la costumbre basta, mientras la doctrina del grupo esté bien.", valor: 0, explica: "Éfeso era firme en la doctrina, y aun así Jesús le dijo: «has dejado tu primer amor».", siguiente: "e1b" },
                  { texto: "Que ore por su grupo, aunque no haga falta cambiar nada más.", valor: 1, explica: "Orar está bien, pero Jesús le dio a Éfeso un camino: recordar de dónde había caído, arrepentirse y hacer las primeras obras.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al mes, el líder vuelve: su grupo sigue igual, frío y sin oración.",
                pregunta: "¿Qué le dices ahora?",
                opciones: [
                  { texto: "Que su grupo necesita avivamiento, porque perdió el amor.", valor: 2, explica: "La necesidad de avivamiento se nota cuando se sigue trabajando, pero se ha perdido el amor; y Dios promete vida a los humildes y quebrantados.", siguiente: "e2" },
                  { texto: "Que cierre el grupo, porque un grupo así ya no tiene arreglo.", valor: 0, explica: "Avivar es dar vida de nuevo a lo que ya era de Dios: Dios devuelve la vida a su pueblo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Los líderes quieren saber cómo se busca el avivamiento.",
                pregunta: "¿Qué les enseñas?",
                opciones: [
                  { texto: "Que se busca con oración, arrepentimiento y obediencia a la Palabra.", valor: 2, explica: "El artículo 15 de la declaración de fe dice que se busca con oración, con arrepentimiento y con obediencia a la Palabra." },
                  { texto: "Que llega con música más fuerte y con reuniones cada vez más largas.", valor: 0, explica: "En la Biblia el avivamiento es algo más profundo que un culto emotivo: Dios devolviendo la vida a su pueblo." },
                  { texto: "Que se busca orando, pero que arrepentirse es solo para los que no creen.", valor: 0, explica: "El avivamiento empieza en el pueblo de Dios: también los creyentes se arrepienten." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder pregunta: ¿Qué tiene que ver arrepentirse con la renovación que esperamos?",
                pregunta: "¿Qué le respondes con Hechos 3:19?",
                opciones: [
                  { texto: "Que Pedro unió el arrepentimiento con los tiempos de refrigerio.", valor: 2, explica: "Pedro unió el arrepentimiento con la renovación: «arrepentíos y convertíos, para que sean borrados vuestros pecados; para que vengan de la presencia del Señor tiempos de refrigerio»." },
                  { texto: "Que no tienen nada que ver: Dios renueva aunque nadie se arrepienta.", valor: 0, explica: "Pedro unió el arrepentimiento con la renovación." },
                  { texto: "Que el arrepentimiento es para el primer día, y después ya no hace falta.", valor: 0, explica: "A Éfeso, que ya era una iglesia, Jesús le pidió arrepentirse y hacer las primeras obras." },
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
            apoyo: "La necesidad de avivamiento se nota cuando una iglesia sigue trabajando, pero ha perdido el amor",
            ref: "Apocalipsis 2:4-5",
            clave: {
              id: "pr-n5-avivamiento-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cuándo se nota que una iglesia necesita avivamiento, y qué camino le dio Jesús a Éfeso?",
              ideas: [
                { id: "senal", peso: 50, texto: "Se nota cuando una iglesia sigue trabajando, pero ha perdido el amor: Éfeso había dejado su primer amor.", formas: ["primer amor", "perdi* el amor", "(perdio|perdido|pierde) (su|el) amor", "(dejo|dejado|dejaron|deja) (su|el|tu) (primer|amor)", "sin amor", "falta (de|el) amor", "sigue trabajando", "sigue (activa|haciendo)"] },
                { id: "camino", peso: 50, texto: "Jesús le dio el camino: recordar de dónde había caído, arrepentirse y hacer las primeras obras.", formas: ["recuerd*", "record*", "de donde (has|ha|habia|han) caido", "arrepent*", "primeras obras"] },
              ],
              modelo: "Se nota cuando una iglesia sigue trabajando, pero ha perdido el amor, como Éfeso, que había dejado su primer amor. Jesús le dio el camino: recordar de dónde había caído, arrepentirse y hacer las primeras obras.",
            },
          },
          {
            apoyo: "A Éfeso, que era activa y firme en la doctrina, Jesús le dijo: «has dejado tu primer amor»",
            ref: "Apocalipsis 2:4-5",
            clave: {
              id: "pr-n5-avivamiento-1-a7-2",
              tipo: "corta",
              pregunta: "Un pastor te dice: Mi iglesia trabaja mucho y tiene buena doctrina; no necesita avivamiento. ¿Qué le respondes con el ejemplo de Éfeso?",
              ideas: [
                { id: "efeso", peso: 50, texto: "Que Éfeso también era activa y firme en la doctrina, y Jesús le dijo que había dejado su primer amor.", formas: ["primer amor", "efeso (era|tambien|estaba|tenia)", "activa y firme", "firme en la doctrina", "(dejo|dejado|dejaron|deja) (su|el|tu) (primer|amor)", "perdi* el amor", "(perdio|perdido|pierde) (su|el) amor", "sin amor"] },
                { id: "camino", peso: 50, texto: "Que vuelva al camino que Jesús le dio a Éfeso: recordar de dónde cayó, arrepentirse y hacer las primeras obras.", formas: ["recuerd*", "record*", "de donde (has|ha|habia|han) caido", "arrepent*", "primeras obras"] },
              ],
              modelo: "Le respondo que Éfeso también era activa y firme en la doctrina, y Jesús le dijo que había dejado su primer amor. Una iglesia que trabaja sin amor necesita recordar de dónde cayó, arrepentirse y hacer las primeras obras.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Los avivamientos en el Antiguo Testamento
    "n5-avivamiento-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por dónde empezó Ezequías su avivamiento?", reverso: "Por la casa de Dios: abrió las puertas del templo y las reparó.", apoyo: "Ezequías empezó por la casa de Dios" },
              { frente: "Además de purificar el templo, ¿qué restauró y qué celebró Ezequías?", reverso: "Restauró la adoración y celebró la Pascua.", apoyo: "Purificó el templo, restauró la adoración y celebró la Pascua" },
              { frente: "¿Por dónde empezó el avivamiento con Josías?", reverso: "Por la Palabra: el libro de la ley, hallado en el templo.", apoyo: "Con Josías, el avivamiento empezó por la Palabra" },
              { frente: "¿Qué hizo Josías al oír las palabras del libro de la ley?", reverso: "Rasgó sus vestidos.", apoyo: "«cuando el rey hubo oído las palabras del libro de la ley, rasgó sus vestidos»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hubo en Jerusalén cuando Ezequías celebró la Pascua?", reverso: "Gran regocijo.", apoyo: "«Hubo entonces gran regocijo en Jerusalén»" },
              { frente: "¿Cómo renovó Josías el pacto?", reverso: "Con todo el corazón y con toda el alma, y todo el pueblo lo confirmó.", apoyo: "Luego renovó el pacto «con todo el corazón y con toda el alma»" },
              { frente: "Después del exilio, ¿cómo leían la ley en tiempos de Esdras?", reverso: "Claramente, y ponían el sentido para que entendieran.", apoyo: "«leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura»" },
              { frente: "¿Qué le dijo Nehemías al pueblo que lloraba por su pecado?", reverso: "Que el gozo de Jehová es su fuerza.", apoyo: "Nehemías le dijo: «el gozo de Jehová es vuestra fuerza»" },
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
            consigna: "Une a cada uno con lo que hizo en su avivamiento.",
            pares: [
              ["Ezequías", "Abrió las puertas de la casa de Jehová y celebró la Pascua"],
              ["Josías", "Rasgó sus vestidos al oír el libro de la ley"],
              ["Esdras", "Leyó la ley ante el pueblo después del exilio"],
              ["Nehemías", "Animó al pueblo que lloraba: el gozo de Jehová es su fuerza"],
            ],
            apoyo: "Los avivamientos del Antiguo Testamento, bajo Ezequías, Josías y Esdras y Nehemías, siguen un mismo camino",
            ref: "2 Crónicas 29:3; 2 Reyes 22:11; Nehemías 8:8-10",
            explica: "Ezequías empezó por la casa de Dios y celebró la Pascua; Josías rasgó sus vestidos al oír el libro de la ley; Esdras leyó la ley ante el pueblo después del exilio, y Nehemías le dijo que el gozo de Jehová es su fuerza.",
          },
          {
            consigna: "Une cada momento con lo que pasó en él.",
            pares: [
              ["El primer año del reinado de Ezequías", "Se abrieron y se repararon las puertas del templo"],
              ["La Pascua que celebró Ezequías", "Hubo gran regocijo en Jerusalén"],
              ["La reparación del templo en tiempos de Josías", "Se halló el libro de la ley"],
              ["La lectura de la ley con Esdras", "El pueblo lloró por su pecado"],
            ],
            apoyo: "Mientras reparaban el templo se halló el libro de la ley",
            ref: "2 Crónicas 30:26; Nehemías 8:9",
            explica: "En el primer año de su reinado, Ezequías abrió y reparó las puertas del templo, y en su Pascua hubo gran regocijo; con Josías, mientras reparaban el templo, se halló el libro de la ley; y cuando Esdras leyó la ley, el pueblo lloró por su pecado.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En tiempos de Esdras, ¿cómo leían el libro de la ley, y qué hacían para que el pueblo entendiera? Toca las palabras que lo dicen.",
            texto: "leían en el libro de la ley de Dios [[claramente]], y [[ponían el sentido]], de modo que entendiesen la lectura",
            apoyo: "Después del exilio, Esdras leyó la ley ante el pueblo",
            ref: "Nehemías 8:8",
            explica: "Después del exilio, Esdras leyó la ley ante el pueblo: «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».",
          },
          {
            consigna: "¿Qué hizo el rey Josías cuando oyó las palabras del libro de la ley? Toca las palabras que lo dicen.",
            texto: "cuando el rey hubo oído las palabras del libro de la ley, [[rasgó sus vestidos]]",
            apoyo: "Con Josías, el avivamiento empezó por la Palabra",
            ref: "2 Reyes 22:11",
            explica: "Con Josías, el avivamiento empezó por la Palabra: «cuando el rey hubo oído las palabras del libro de la ley, rasgó sus vestidos».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el camino que siguen los avivamientos del Antiguo Testamento, según la idea clave de la lección.",
            pasos: ["Alguien busca a Dios", "La Palabra se redescubre y se explica", "El pueblo se arrepiente", "La adoración y el pacto se renuevan", "Llega el gozo con cambios reales"],
            apoyo: "siguen un mismo camino: alguien busca a Dios, la Palabra se redescubre y se explica, el pueblo se arrepiente, la adoración y el pacto se renuevan, y llega el gozo con cambios reales",
            explica: "Los avivamientos del Antiguo Testamento siguen un mismo camino: alguien busca a Dios, la Palabra se redescubre y se explica, el pueblo se arrepiente, la adoración y el pacto se renuevan, y llega el gozo con cambios reales.",
          },
          {
            consigna: "Ordena lo que se repite en los avivamientos del Antiguo Testamento, en el orden en que lo presenta la lección.",
            pasos: [
              "Un líder o un grupo que busca a Dios",
              "La Palabra redescubierta y explicada",
              "El arrepentimiento y el quebranto por el pecado",
              "La adoración restaurada y el pacto renovado",
              "El gozo, con cambios reales en la vida del pueblo",
            ],
            apoyo: "Un líder o un grupo que busca a Dios",
            explica: "Lo que se repite: un líder o un grupo que busca a Dios, la Palabra redescubierta y explicada, el arrepentimiento y el quebranto por el pecado, la adoración restaurada y el pacto renovado, y el gozo, con cambios reales en la vida del pueblo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que se repite en los avivamientos del Antiguo Testamento.",
            texto: "En los avivamientos del Antiguo Testamento se repiten la [[Palabra]] redescubierta y explicada, el [[quebranto]] por el pecado y el [[gozo]], con cambios reales en la vida del pueblo.",
            distractores: ["tradición", "orgullo", "miedo"],
            errores: {
              "tradición": "En esos avivamientos se repite la Palabra redescubierta y explicada.",
              orgullo: "Se repiten el arrepentimiento y el quebranto por el pecado.",
              miedo: "Se repite el gozo, con cambios reales en la vida del pueblo.",
            },
            apoyo: "La Palabra redescubierta y explicada",
            explica: "En los avivamientos del Antiguo Testamento se repiten un líder o un grupo que busca a Dios, la Palabra redescubierta y explicada, el arrepentimiento y el quebranto por el pecado, la adoración restaurada y el pacto renovado, y el gozo.",
          },
          {
            consigna: "Completa por qué todo avivamiento bíblico vuelve a la Palabra.",
            texto: "Todo avivamiento bíblico vuelve a la [[Palabra]]: con Josías empezó cuando se halló el [[libro]] de la ley, y con Esdras se leyó la ley ante el [[pueblo]].",
            distractores: ["emoción", "trono", "rey"],
            errores: {
              "emoción": "Todo avivamiento bíblico vuelve a la Palabra.",
              trono: "Mientras reparaban el templo se halló el libro de la ley.",
              rey: "Después del exilio, Esdras leyó la ley ante el pueblo.",
            },
            apoyo: "Todo avivamiento bíblico vuelve a la Palabra",
            ref: "Nehemías 8:8",
            explica: "Todo avivamiento bíblico vuelve a la Palabra: con Josías empezó por la Palabra, cuando se halló el libro de la ley, y después del exilio Esdras leyó la ley ante el pueblo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de jóvenes te dice: 2 Crónicas 7:14 es una promesa para nuestra nación, como si fuéramos Israel con su tierra prometida.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que fue una promesa a Israel, pero su principio sigue vigente para el pueblo de Dios.", bien: true, explica: "2 Crónicas 7:14 fue una promesa a Israel bajo el antiguo pacto; la iglesia no es una nación, pero el principio sigue vigente para el pueblo de Dios." },
              { texto: "Que tiene razón: Dios hizo esa promesa a cada nación de hoy que tenga iglesias.", explica: "La iglesia no es una nación ni tiene una tierra prometida: la promesa fue a Israel bajo el antiguo pacto." },
              { texto: "Que ese versículo ya no tiene nada que decirle a la iglesia de hoy, porque fue para Israel.", explica: "El principio sigue vigente para el pueblo de Dios: cuando su pueblo se humilla y ora, Dios oye y perdona." },
              { texto: "Que es una promesa para los que no creen, y no para el pueblo de Dios en ningún tiempo.", explica: "El principio es para el pueblo de Dios: cuando su pueblo se humilla, ora, busca su rostro y se convierte, Dios oye y perdona." },
            ],
            apoyo: "2 Crónicas 7:14 es la respuesta de Dios a Salomón en la dedicación del templo, una promesa a Israel bajo el antiguo pacto",
            ref: "2 Crónicas 7:14",
            explica: "2 Crónicas 7:14 fue la respuesta de Dios a Salomón en la dedicación del templo, una promesa a Israel bajo el antiguo pacto. La iglesia no es una nación ni tiene una tierra prometida, pero el principio sigue vigente para el pueblo de Dios.",
          },
          {
            caso: "Una hermana del grupo de oración te dice: Si 2 Crónicas 7:14 fue para Israel, ya no tiene nada que ver con nosotros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que su principio sigue vigente: si el pueblo de Dios se humilla, Dios oye y perdona.", bien: true, explica: "La iglesia no es una nación ni tiene una tierra prometida, pero el principio sigue vigente: cuando su pueblo se humilla, ora, busca su rostro y se convierte, Dios oye y perdona." },
              { texto: "Que tiene razón: esa promesa quedó para el antiguo pacto y hoy ya no nos enseña nada.", explica: "Fue una promesa a Israel bajo el antiguo pacto, pero el principio sigue vigente para el pueblo de Dios." },
              { texto: "Que la iglesia es una nación con su propia tierra prometida, igual que el antiguo Israel.", explica: "La iglesia no es una nación ni tiene una tierra prometida." },
              { texto: "Que el versículo vale solo para los reyes, como Salomón, y no para el resto del pueblo.", explica: "Fue la respuesta de Dios a Salomón, pero el principio es para su pueblo: cuando su pueblo se humilla y ora, Dios oye y perdona." },
            ],
            apoyo: "La iglesia no es una nación ni tiene una tierra prometida, pero el principio sigue vigente para el pueblo de Dios",
            ref: "2 Crónicas 7:14",
            explica: "La iglesia no es una nación ni tiene una tierra prometida, pero el principio de 2 Crónicas 7:14 sigue vigente: cuando el pueblo de Dios se humilla, ora, busca su rostro y se convierte de sus malos caminos, Dios oye y perdona.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "cuando su pueblo se humilla, ora, busca su rostro y se convierte de sus malos caminos, Dios oye y perdona",
            ref: "2 Crónicas 7:14",
            clave: {
              id: "pr-n5-avivamiento-2-a7-1",
              tipo: "corta",
              pregunta: "¿En qué contexto se dio 2 Crónicas 7:14, y qué principio sigue vigente para el pueblo de Dios?",
              ideas: [
                { id: "contexto", peso: 50, texto: "Fue la respuesta de Dios a Salomón en la dedicación del templo: una promesa a Israel bajo el antiguo pacto.", formas: ["salomon", "dedicacion", "dedic* (del|el) templo", "(a|para) israel", "israel bajo", "antiguo pacto"] },
                { id: "principio", peso: 50, texto: "El principio sigue vigente: cuando su pueblo se humilla, ora, busca su rostro y se convierte de sus malos caminos, Dios oye y perdona.", formas: ["humill*", "busca* su rostro", "buscar su rostro", "malos caminos", "(dios|el) (oye|escucha|perdona)", "oye y perdona", "se convierte", "convierte* de"] },
              ],
              modelo: "Fue la respuesta de Dios a Salomón en la dedicación del templo, una promesa a Israel bajo el antiguo pacto. Su principio sigue vigente: cuando el pueblo de Dios se humilla, ora, busca su rostro y se convierte de sus malos caminos, Dios oye y perdona.",
            },
          },
          {
            apoyo: "2 Crónicas 7:14 fue una promesa a Israel en la dedicación del templo, y su principio sigue vigente para el pueblo de Dios",
            ref: "2 Crónicas 7:14",
            clave: {
              id: "pr-n5-avivamiento-2-a7-2",
              tipo: "corta",
              pregunta: "Un hermano usa 2 Crónicas 7:14 como una promesa para su país. ¿Qué le explicas sobre el contexto del versículo y lo que vale hoy para la iglesia?",
              ideas: [
                { id: "israel", peso: 50, texto: "Que fue una promesa a Israel bajo el antiguo pacto, en la dedicación del templo: la iglesia no es una nación ni tiene una tierra prometida.", formas: ["(a|para) israel", "israel bajo", "antiguo pacto", "salomon", "dedicacion", "dedic* (del|el) templo", "no es una nacion", "ni tiene una tierra"] },
                { id: "principio", peso: 50, texto: "Que su principio sigue vigente: cuando el pueblo de Dios se humilla, ora, busca su rostro y se convierte, Dios oye y perdona.", formas: ["humill*", "busca* su rostro", "buscar su rostro", "malos caminos", "(dios|el) (oye|escucha|perdona)", "oye y perdona", "se convierte", "convierte* de"] },
              ],
              errores: [
                { id: "pais", texto: "La iglesia no es una nación ni tiene una tierra prometida: fue una promesa a Israel bajo el antiguo pacto.", formas: ["(es|era) (una|la) promesa para (su|nuestro|el|cada|mi|este) (pais|nacion)", "(promete|prometio) (sanar|bendecir) (su|nuestro|el|cada|mi|este) (pais|nacion)", "la iglesia es una nacion"], anula: "israel" },
              ],
              modelo: "Le explico que fue una promesa a Israel bajo el antiguo pacto, en la dedicación del templo, y que la iglesia no es una nación. Pero su principio sigue vigente: cuando el pueblo de Dios se humilla, ora y se convierte, Dios oye y perdona.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Pentecostés y los avivamientos de Hechos
    "n5-avivamiento-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué había prometido Dios por el profeta Joel?", reverso: "Derramar su Espíritu sobre toda carne.", apoyo: "Dios lo había prometido por Joel: «derramaré mi Espíritu sobre toda carne»" },
              { frente: "¿Cómo estaban reunidos los discípulos el día de Pentecostés?", reverso: "Todos unánimes juntos.", apoyo: "En Pentecostés, los discípulos estaban «todos unánimes juntos»" },
              { frente: "En Pentecostés, ¿de quién fueron llenos todos?", reverso: "Del Espíritu Santo.", apoyo: "fueron todos llenos del Espíritu Santo" },
              { frente: "¿Qué es el libro de los Hechos, según la lección?", reverso: "La historia de una iglesia en avivamiento.", apoyo: "El libro de los Hechos es la historia de una iglesia en avivamiento" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál fue el primer fruto del avivamiento de Pentecostés?", reverso: "El arrepentimiento: se compungieron de corazón.", apoyo: "El primer fruto fue el arrepentimiento" },
              { frente: "¿Cuántas personas se añadieron aquel día?", reverso: "Como tres mil personas.", apoyo: "«se añadieron aquel día como tres mil personas»" },
              { frente: "En medio de la persecución, ¿qué pasó después de orar?", reverso: "Todos fueron llenos del Espíritu y hablaban con denuedo.", apoyo: "El avivamiento se renovó en medio de la persecución" },
              { frente: "¿Qué sigue obrando hoy, según la lección?", reverso: "El mismo Espíritu de Pentecostés.", apoyo: "El mismo Espíritu de Pentecostés sigue obrando hoy" },
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
            consigna: "Completa lo que pasó en Pentecostés, según la idea clave de la lección.",
            texto: "Pentecostés cumplió la [[promesa]] de Joel: el Espíritu se derramó sobre los discípulos [[unánimes]] y la iglesia [[nació]] con poder.",
            distractores: ["duda", "divididos", "murió"],
            errores: {
              duda: "Dios lo había prometido por Joel, y Pentecostés cumplió esa promesa.",
              divididos: "En Pentecostés, los discípulos estaban todos unánimes juntos.",
              "murió": "En Pentecostés la iglesia nació con poder.",
            },
            apoyo: "Pentecostés cumplió la promesa de Joel: el Espíritu se derramó sobre los discípulos unánimes y la iglesia nació con poder",
            ref: "Joel 2:28-29; Hechos 2:1-4",
            explica: "Pentecostés cumplió la promesa de Joel: el Espíritu se derramó sobre los discípulos unánimes y la iglesia nació con poder.",
          },
          {
            consigna: "Completa cómo cumplió Dios en Pentecostés lo que había prometido.",
            texto: "Dios lo había prometido por Joel, y en Pentecostés lo [[cumplió]]: derramó su [[Espíritu]] sobre los discípulos, que estaban todos [[juntos]].",
            distractores: ["olvidó", "enojo", "dispersos"],
            errores: {
              "olvidó": "En Pentecostés, Dios cumplió lo que había prometido por Joel.",
              enojo: "Dios había prometido: «derramaré mi Espíritu sobre toda carne».",
              dispersos: "En Pentecostés, los discípulos estaban «todos unánimes juntos».",
            },
            apoyo: "Dios lo había prometido por Joel: «derramaré mi Espíritu sobre toda carne»",
            ref: "Joel 2:28-29; Hechos 2:1-4",
            explica: "Dios lo había prometido por Joel: «derramaré mi Espíritu sobre toda carne». En Pentecostés se cumplió: los discípulos estaban «todos unánimes juntos», y «fueron todos llenos del Espíritu Santo».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada momento de Hechos con el fruto de su avivamiento.",
            pares: [
              ["Pentecostés", "Se añadieron aquel día como tres mil personas"],
              ["La iglesia perseguida, después de orar", "Hablaban con valentía la palabra de Dios"],
              ["Samaria", "Hubo gran gozo en aquella ciudad"],
              ["Éfeso", "Los creyentes quemaron los libros de magia"],
            ],
            apoyo: "Los avivamientos de Hechos, en Jerusalén, en Samaria y en Éfeso, muestran los mismos frutos",
            ref: "Hechos 2:41; Hechos 4:31; Hechos 8:8; Hechos 19:19",
            explica: "En Pentecostés se añadieron como tres mil personas; la iglesia perseguida, después de orar, fue llena del Espíritu y hablaba con denuedo la palabra; en Samaria hubo gran gozo, y en Éfeso los creyentes quemaron los libros de magia.",
          },
          {
            consigna: "Une cada fruto de los avivamientos de Hechos con lo que pasó.",
            pares: [
              ["El arrepentimiento", "Se compungieron de corazón y preguntaron qué hacer"],
              ["Las conversiones", "Se añadieron como tres mil personas"],
              ["La valentía en la persecución", "Hablaban con denuedo la palabra de Dios"],
              ["El gozo", "Samaria se llenó de alegría con la predicación de Cristo"],
              ["Una Palabra que crece", "En Éfeso crecía y prevalecía con poder"],
            ],
            apoyo: "muestran los mismos frutos: arrepentimiento, conversiones, valentía en la persecución, gozo y una Palabra que crece",
            ref: "Hechos 2:37-41; Hechos 4:31; Hechos 8:5-8; Hechos 19:18-20",
            explica: "Los avivamientos de Hechos muestran los mismos frutos: arrepentimiento (se compungieron de corazón), conversiones (como tres mil), valentía en la persecución (hablaban con denuedo), gozo (en Samaria) y una Palabra que crece (en Éfeso).",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Después de orar en medio de la persecución, ¿cómo hablaban la palabra de Dios? Toca las palabras que lo dicen.",
            texto: "todos fueron llenos del Espíritu Santo, y hablaban [[con denuedo]] la palabra de Dios",
            apoyo: "El avivamiento se renovó en medio de la persecución",
            ref: "Hechos 4:31",
            explica: "El avivamiento se renovó en medio de la persecución: después de orar, «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».",
          },
          {
            consigna: "En Éfeso, ¿qué pasaba con la palabra del Señor? Toca las palabras que lo dicen.",
            texto: "[[crecía y prevalecía poderosamente]] la palabra del Señor",
            apoyo: "En Éfeso, los creyentes confesaron sus prácticas y quemaron los libros de magia",
            ref: "Hechos 19:20",
            explica: "En Éfeso, los creyentes confesaron sus prácticas y quemaron los libros de magia, y así «crecía y prevalecía poderosamente la palabra del Señor».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Permanece de los avivamientos de Hechos para la iglesia de hoy, o va en contra de eso? Lleva cada frase a su grupo.",
            grupos: ["Permanece para la iglesia de hoy", "Va en contra de lo que permanece"],
            frases: [
              { texto: "La oración unida antes y durante el avivamiento", grupo: 0 },
              { texto: "La predicación de Cristo con poder y con la Palabra", grupo: 0 },
              { texto: "El arrepentimiento real, que cambia la conducta", grupo: 0 },
              { texto: "El gozo, la valentía y una iglesia que crece", grupo: 0 },
              { texto: "Un arrepentimiento de palabras, sin cambios en la conducta", grupo: 1 },
              { texto: "Una iglesia que calla por miedo a la persecución", grupo: 1 },
              { texto: "Una predicación sin Cristo y sin la Palabra", grupo: 1 },
            ],
            apoyo: "La oración unida antes y durante el avivamiento",
            explica: "De los avivamientos de Hechos permanecen la oración unida, la predicación de Cristo con poder y con la Palabra, el arrepentimiento real que cambia la conducta y aun el bolsillo, y el gozo, la valentía y una iglesia que crece.",
          },
          {
            consigna: "En la iglesia de hoy, ¿muestra lo que permanece de Hechos o va en contra de eso? Lleva cada frase a su grupo.",
            grupos: ["Muestra lo que permanece", "Va en contra de lo que permanece"],
            frases: [
              { texto: "La iglesia ora unida antes de salir a predicar", grupo: 0 },
              { texto: "Un hermano devuelve lo que había robado al arrepentirse", grupo: 0 },
              { texto: "Los creyentes predican a Cristo con valentía", grupo: 0 },
              { texto: "La congregación crece y vive con gozo", grupo: 0 },
              { texto: "Cada uno ora por su lado y nadie se une", grupo: 1 },
              { texto: "Se arrepienten en el culto, pero nada cambia en su vida", grupo: 1 },
              { texto: "Callan el evangelio para no tener problemas", grupo: 1 },
            ],
            apoyo: "El arrepentimiento real, que cambia la conducta y aun el bolsillo",
            explica: "Permanecen la oración unida, la predicación de Cristo con poder, el arrepentimiento real que cambia la conducta y aun el bolsillo, y el gozo, la valentía y una iglesia que crece.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La oración unida antes y durante el avivamiento",
            ref: "Hechos 4:31",
            situacion: "Eres pastor. Tu congregación quiere vivir lo que Dios hizo en los avivamientos de Hechos, y los líderes te piden un plan para los próximos meses.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión, cada líder propone algo distinto.",
                pregunta: "¿Con qué empiezas?",
                opciones: [
                  { texto: "Con oración unida, antes y durante lo que Dios haga.", valor: 2, explica: "Lo que permanece de Hechos empieza por la oración unida antes y durante el avivamiento.", siguiente: "e2" },
                  { texto: "Con un gran anuncio en las redes, para que venga mucha gente.", valor: 0, explica: "En Hechos, el avivamiento llegó con la oración unida, no con un anuncio.", siguiente: "e1b" },
                  { texto: "Con un estudio del libro de Hechos, y oración cuando haya tiempo.", valor: 1, explica: "Estudiar Hechos ayuda, pero lo que permanece empieza por la oración unida antes y durante el avivamiento.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El anuncio atrae a muchos visitantes, pero la iglesia sigue sin orar unida.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Convocas a toda la iglesia a orar unida, como en Hechos.", valor: 2, explica: "La oración unida antes y durante el avivamiento es lo primero que permanece de Hechos.", siguiente: "e2" },
                  { texto: "Preparas un anuncio todavía más grande para el mes que viene.", valor: 0, explica: "Lo que permanece de Hechos es la oración unida, no un anuncio más grande.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Después de una predicación, varios hermanos dicen que se arrepienten de sus pecados.",
                pregunta: "¿Qué fruto esperas ver en ellos?",
                opciones: [
                  { texto: "Un arrepentimiento real, que cambie la conducta y aun el bolsillo.", valor: 2, explica: "Lo que permanece es el arrepentimiento real, que cambia la conducta y aun el bolsillo, como en Éfeso." },
                  { texto: "Que lloren mucho durante el culto, aunque después todo siga igual que antes.", valor: 0, explica: "El arrepentimiento real cambia la conducta y aun el bolsillo: en Éfeso, los creyentes confesaron sus prácticas y quemaron los libros de magia." },
                  { texto: "Que levanten la mano al final, y con eso ya esté todo resuelto.", valor: 0, explica: "En Pentecostés el primer fruto fue el arrepentimiento: «se compungieron de corazón» y preguntaron qué hacer." },
                ],
              },
              {
                id: "e3",
                narra: "Al poco tiempo, unos vecinos se oponen a los hermanos que predican en el barrio.",
                pregunta: "¿Qué les enseñas?",
                opciones: [
                  { texto: "Que oren y sigan predicando a Cristo con valentía.", valor: 2, explica: "El avivamiento se renovó en medio de la persecución: después de orar, «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios»." },
                  { texto: "Que dejen de predicar en el barrio para no tener problemas.", valor: 0, explica: "En Hechos, la iglesia perseguida oró y habló con denuedo: la valentía es parte de lo que permanece." },
                  { texto: "Que respondan a los vecinos con enojo para defenderse.", valor: 0, explica: "Después de orar, los creyentes hablaban con denuedo la palabra de Dios: la valentía de Hechos no es enojo." },
                ],
              },
            ],
          },
          {
            apoyo: "El mismo Espíritu de Pentecostés sigue obrando hoy",
            ref: "Hechos 19:18-20",
            situacion: "Enseñas en la academia una clase para líderes nuevos sobre los avivamientos de Hechos. Al final, te hacen preguntas sobre lo que sirve para su iglesia hoy.",
            escenas: [
              {
                id: "e1",
                narra: "Un líder dice: Eso pasó hace dos mil años; hoy ya no pasa.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el mismo Espíritu de Pentecostés sigue obrando hoy.", valor: 2, explica: "El mismo Espíritu de Pentecostés sigue obrando hoy." },
                  { texto: "Que tiene razón: los avivamientos se quedaron en el libro de Hechos.", valor: 0, explica: "El libro de los Hechos es la historia de una iglesia en avivamiento, y el mismo Espíritu de Pentecostés sigue obrando hoy." },
                  { texto: "Que quizás pase hoy, pero solo en iglesias muy grandes y famosas.", valor: 0, explica: "El mismo Espíritu de Pentecostés sigue obrando hoy, y lo que permanece de Hechos es para la iglesia de hoy." },
                ],
              },
              {
                id: "e2",
                narra: "Una líder pregunta qué fruto del arrepentimiento enseña lo que pasó en Éfeso.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que los creyentes confesaron sus prácticas y quemaron sus libros de magia.", valor: 2, explica: "En Éfeso, los creyentes confesaron sus prácticas y quemaron los libros de magia: un arrepentimiento real, que cambia la conducta y aun el bolsillo." },
                  { texto: "Que en Éfeso nadie tuvo que dejar nada de su vida pasada para seguir a Cristo.", valor: 0, explica: "Los creyentes de Éfeso confesaron sus prácticas y quemaron los libros de magia, que valían cincuenta mil piezas de plata." },
                  { texto: "Que se arrepintieron en secreto, sin que cambiaran su conducta ni sus costumbres.", valor: 0, explica: "Lo que permanece es el arrepentimiento real, que cambia la conducta y aun el bolsillo." },
                ],
              },
              {
                id: "e3",
                narra: "Otra líder pregunta: ¿Qué debe buscar primero mi grupo para vivir esto hoy?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "La oración unida, antes y durante el avivamiento.", valor: 2, explica: "Lo que permanece empieza por la oración unida antes y durante el avivamiento, como en Hechos." },
                  { texto: "Nuevas actividades, para que nadie en el grupo se aburra.", valor: 0, explica: "De Hechos permanecen la oración unida, la predicación de Cristo, el arrepentimiento real y el gozo, no las actividades." },
                  { texto: "Predicar más a Cristo, aunque el grupo casi no ore unido.", valor: 1, explica: "Predicar a Cristo es parte de lo que permanece, pero antes y durante el avivamiento está la oración unida." },
                ],
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
            apoyo: "muestran los mismos frutos: arrepentimiento, conversiones, valentía en la persecución, gozo y una Palabra que crece",
            ref: "Hechos 2:37-41; Hechos 4:31",
            clave: {
              id: "pr-n5-avivamiento-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué frutos muestran los avivamientos del libro de los Hechos? Nombra tres y di dónde se vieron.",
              ideas: [
                { id: "arrepentimiento", peso: 35, texto: "Arrepentimiento y conversiones: en Pentecostés se compungieron de corazón y se añadieron como tres mil.", formas: ["arrepent*", "compung*", "conversion*", "convirt*", "tres mil", "anadieron"] },
                { id: "valentia", peso: 30, texto: "Valentía en la persecución: después de orar, hablaban con denuedo la palabra de Dios.", formas: ["valent*", "valor", "denuedo", "persecu*", "persegu*", "sin miedo"] },
                { id: "gozo", peso: 35, texto: "Gozo en Samaria y una Palabra que crece en Éfeso.", formas: ["gozo", "alegr*", "samaria", "palabra (crecia|crece|crecio)", "crecia", "prevalec*", "efeso", "magia"] },
              ],
              modelo: "Muestran arrepentimiento y conversiones, como en Pentecostés, cuando se compungieron de corazón y se añadieron como tres mil. También valentía en la persecución, porque hablaban con denuedo la palabra, y gozo en Samaria, con una Palabra que crecía en Éfeso.",
            },
          },
          {
            apoyo: "El arrepentimiento real, que cambia la conducta y aun el bolsillo",
            ref: "Hechos 19:18-20",
            clave: {
              id: "pr-n5-avivamiento-3-a7-2",
              tipo: "corta",
              pregunta: "¿Qué muestra lo que pasó en Éfeso sobre el arrepentimiento que trae un avivamiento?",
              ideas: [
                { id: "efeso", peso: 50, texto: "Que los creyentes confesaron sus prácticas y quemaron los libros de magia, que valían cincuenta mil piezas de plata.", formas: ["confes*", "quem*", "libros de magia", "magia", "cincuenta mil", "piezas de plata"] },
                { id: "real", peso: 50, texto: "Que es un arrepentimiento real, que cambia la conducta y aun el bolsillo, y así crecía la palabra del Señor.", formas: ["cambia la conducta", "cambi* (su|la|de) (conducta|vida|manera)", "bolsillo", "arrepentimiento real", "arrepentimiento de verdad", "palabra (crecia|crece|crecio)", "prevalec*"] },
              ],
              modelo: "Muestra que el arrepentimiento real cambia la conducta y aun el bolsillo: los creyentes confesaron sus prácticas y quemaron los libros de magia, que valían cincuenta mil piezas de plata. Así crecía la palabra del Señor.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La historia de los avivamientos
    "n5-avivamiento-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde y en qué año vivió un avivamiento la comunidad morava?", reverso: "En Herrnhut, Alemania, en 1727.", apoyo: "1727: en Herrnhut, Alemania, la comunidad morava vive un avivamiento durante la Santa Cena" },
              { frente: "¿Quién estaba en Northampton durante el Gran Despertar?", reverso: "Jonathan Edwards.", apoyo: "con Jonathan Edwards en Northampton y la predicación de George Whitefield" },
              { frente: "¿A quiénes predicaban al aire libre los Wesley y Whitefield?", reverso: "A los mineros y a los pobres.", apoyo: "que predicaban al aire libre a los mineros y a los pobres" },
              { frente: "¿Cómo empezó el avivamiento de oración de Nueva York?", reverso: "Con una reunión de mediodía en la calle Fulton.", apoyo: "que empezó con una reunión de mediodía en la calle Fulton" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué joven se asocia con el avivamiento de Gales, de 1904 y 1905?", reverso: "Evan Roberts.", apoyo: "1904 y 1905: el avivamiento de Gales, con el joven Evan Roberts" },
              { frente: "¿Qué fue la calle Azusa, en Los Ángeles, según la lección?", reverso: "La cuna del pentecostalismo moderno.", apoyo: "1906: la calle Azusa, en Los Ángeles, con William J. Seymour, cuna del pentecostalismo moderno" },
              { frente: "¿Qué iglesia tuvo su origen en Valparaíso, con el misionero Willis C. Hoover?", reverso: "La Iglesia Metodista Pentecostal de Chile.", apoyo: "con el misionero Willis C. Hoover, origen de la Iglesia Metodista Pentecostal de Chile" },
              { frente: "¿Qué fue Cane Ridge, en Kentucky, en 1801?", reverso: "Uno de los comienzos del Segundo Gran Despertar en Estados Unidos.", apoyo: "1801: Cane Ridge, en Kentucky, uno de los comienzos del Segundo Gran Despertar en Estados Unidos" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena estos avivamientos en el tiempo, del primero al último.",
            eventos: [
              { texto: "En Herrnhut, la comunidad morava vive un avivamiento durante la Santa Cena", fecha: "1727" },
              { texto: "El Gran Despertar en las colonias británicas de América", fecha: "De 1734 a 1742" },
              { texto: "Cane Ridge, en Kentucky, uno de los comienzos del Segundo Gran Despertar", fecha: "1801" },
              { texto: "El avivamiento de oración de Nueva York, en la calle Fulton", fecha: "1857 y 1858" },
              { texto: "El avivamiento de Gales, con el joven Evan Roberts", fecha: "1904 y 1905" },
              { texto: "La calle Azusa, en Los Ángeles, con William J. Seymour", fecha: "1906" },
            ],
            apoyo: "Desde Herrnhut en 1727, pasando por el Gran Despertar, el avivamiento metodista, Cane Ridge, la calle Fulton, Gales, la calle Azusa, Pyongyang y Valparaíso, Dios ha seguido avivando a su iglesia",
            explica: "Herrnhut fue en 1727; el Gran Despertar, de 1734 a 1742; Cane Ridge, en 1801; la calle Fulton, en 1857 y 1858; Gales, en 1904 y 1905; y la calle Azusa, en 1906.",
          },
          {
            consigna: "Ordena en el tiempo lo que pasó en estos avivamientos, del primero al último.",
            eventos: [
              { texto: "Nace en Herrnhut una cadena de oración, y de allí salen cientos de misioneros", fecha: "1727" },
              { texto: "El avivamiento metodista en Inglaterra, con Juan y Carlos Wesley", fecha: "Desde 1738" },
              { texto: "Cane Ridge, en Kentucky, en los comienzos del Segundo Gran Despertar", fecha: "1801" },
              { texto: "Una reunión de mediodía en la calle Fulton empieza un avivamiento de oración", fecha: "1857 y 1858" },
              { texto: "La calle Azusa, en Los Ángeles: la cuna del pentecostalismo moderno", fecha: "1906" },
              { texto: "Pyongyang, en Corea, y Valparaíso, en Chile, con Willis C. Hoover", fecha: "1907 y 1909" },
            ],
            apoyo: "Esta línea de tiempo resume algunos avivamientos de la historia",
            explica: "Herrnhut fue en 1727; el avivamiento metodista, desde 1738; Cane Ridge, en 1801; la calle Fulton, en 1857 y 1858; la calle Azusa, en 1906; y Pyongyang y Valparaíso, en 1907 y 1909.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada avivamiento con la persona que la lección nombra en él.",
            pares: [
              ["El Gran Despertar, en Northampton", "Jonathan Edwards"],
              ["El avivamiento metodista en Inglaterra", "Juan y Carlos Wesley"],
              ["El avivamiento de Gales", "El joven Evan Roberts"],
              ["La calle Azusa, en Los Ángeles", "William J. Seymour"],
              ["Valparaíso, en Chile", "El misionero Willis C. Hoover"],
            ],
            apoyo: "De 1734 a 1742: el Gran Despertar en las colonias británicas de América, con Jonathan Edwards en Northampton y la predicación de George Whitefield",
            explica: "Jonathan Edwards estuvo en Northampton, en el Gran Despertar; Juan y Carlos Wesley, en el avivamiento metodista; Evan Roberts, en Gales; William J. Seymour, en la calle Azusa; y Willis C. Hoover, en Valparaíso.",
          },
          {
            consigna: "Une cada lugar con lo que pasó allí, según la línea de tiempo.",
            pares: [
              ["Herrnhut, en Alemania", "La comunidad morava vive un avivamiento en la Santa Cena"],
              ["Cane Ridge, en Kentucky", "Uno de los comienzos del Segundo Gran Despertar"],
              ["La calle Fulton, en Nueva York", "Una reunión de mediodía que empezó un avivamiento de oración"],
              ["Valparaíso, en Chile", "El origen de la Iglesia Metodista Pentecostal de Chile"],
              ["Las colonias británicas de América", "El Gran Despertar, de 1734 a 1742"],
            ],
            apoyo: "1857 y 1858: el avivamiento de oración de Nueva York, que empezó con una reunión de mediodía en la calle Fulton",
            explica: "En Herrnhut la comunidad morava vivió un avivamiento durante la Santa Cena; Cane Ridge fue uno de los comienzos del Segundo Gran Despertar; en la calle Fulton empezó con una reunión de mediodía el avivamiento de oración de Nueva York; Valparaíso fue el origen de la Iglesia Metodista Pentecostal de Chile; y en las colonias británicas fue el Gran Despertar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué se parecen los avivamientos de la historia.",
            texto: "Los avivamientos se [[parecen]] entre sí porque el [[Señor]] es el mismo: en todos hay oración perseverante, predicación de la [[Palabra]], conversiones, santidad, gozo y misión.",
            distractores: ["oponen", "hombre", "tradición"],
            errores: {
              oponen: "Los avivamientos se parecen entre sí: oración, Palabra, convicción de pecado, conversiones, santidad, gozo y misión.",
              hombre: "Se parecen porque el Señor es el mismo: «Jesucristo es el mismo ayer, y hoy, y por los siglos».",
              "tradición": "En los avivamientos hay predicación de la Palabra.",
            },
            apoyo: "Los avivamientos se parecen porque el Señor es el mismo: oración, Palabra, convicción de pecado, conversiones, santidad, gozo y misión",
            ref: "Hebreos 13:8",
            explica: "Las épocas y los lugares cambian, pero el Señor no: «Jesucristo es el mismo ayer, y hoy, y por los siglos». Por eso los avivamientos se parecen: oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión.",
          },
          {
            consigna: "Completa lo que tienen en común los avivamientos de la historia.",
            texto: "Aunque cambian las épocas, en todos los avivamientos hay [[oración]], convicción de [[pecado]], conversiones, [[santidad]], gozo y misión.",
            distractores: ["ruido", "éxito", "fama"],
            errores: {
              ruido: "En los avivamientos hay oración perseverante.",
              "éxito": "En los avivamientos hay convicción de pecado.",
              fama: "En los avivamientos hay conversiones, santidad, gozo y misión.",
            },
            apoyo: "Por eso los avivamientos se parecen entre sí: oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión",
            ref: "Hebreos 13:8",
            explica: "Las épocas y los lugares cambian, pero el Señor no. Por eso los avivamientos se parecen entre sí: oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿De qué avivamiento salió cada fruto, según la lección? Lleva cada frase a su grupo.",
            grupos: ["Del avivamiento metodista", "Del avivamiento moravo", "De la calle Azusa"],
            frases: [
              { texto: "Escuelas y ayuda a los pobres", grupo: 0 },
              { texto: "Ayuda a los presos", grupo: 0 },
              { texto: "Un impulso contra la esclavitud", grupo: 0 },
              { texto: "Un gran movimiento misionero", grupo: 1 },
              { texto: "Cientos de misioneros que salieron de Herrnhut", grupo: 1 },
              { texto: "Iglesias pentecostales en todo el mundo", grupo: 2 },
              { texto: "La cuna del pentecostalismo moderno", grupo: 2 },
            ],
            apoyo: "Del avivamiento moravo salió un gran movimiento misionero, y de la calle Azusa, iglesias pentecostales en todo el mundo",
            explica: "Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud; del moravo, un gran movimiento misionero; y de la calle Azusa, iglesias pentecostales en todo el mundo.",
          },
          {
            consigna: "Según la lección, ¿de qué avivamiento salió cada cosa? Lleva cada frase a su grupo.",
            grupos: ["Del avivamiento metodista", "Del avivamiento moravo", "De la calle Azusa"],
            frases: [
              { texto: "El ánimo de Wesley a Wilberforce contra el comercio de esclavos", grupo: 0 },
              { texto: "La ayuda a los pobres", grupo: 0 },
              { texto: "Las escuelas", grupo: 0 },
              { texto: "Una cadena de oración que, según la Iglesia Morava, duró unos cien años", grupo: 1 },
              { texto: "El gran movimiento misionero", grupo: 1 },
              { texto: "Las iglesias pentecostales en todo el mundo", grupo: 2 },
              { texto: "El pentecostalismo moderno, que nació allí", grupo: 2 },
            ],
            apoyo: "Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud",
            explica: "Del avivamiento metodista salieron escuelas, ayuda a los pobres y un impulso contra la esclavitud: en 1791 Juan Wesley escribió su última carta a William Wilberforce. Del moravo salieron la cadena de oración y un gran movimiento misionero, y de la calle Azusa, iglesias pentecostales en todo el mundo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Los avivamientos son pura emoción; pasan y no dejan nada.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los verdaderos dejaron frutos que duran, como escuelas y misiones.", bien: true, explica: "Los avivamientos verdaderos dejaron frutos que duran: escuelas, ayuda a los pobres y a los presos, un impulso contra la esclavitud y un gran movimiento misionero." },
              { texto: "Que tiene razón: un avivamiento solo cambia lo que se siente en el culto.", explica: "Los avivamientos verdaderos dejaron frutos que duran en la iglesia y en la sociedad." },
              { texto: "Que los frutos no importan, porque lo que vale es lo que se vive en el momento.", explica: "Los verdaderos se conocen por los frutos que duran: del avivamiento moravo salió un gran movimiento misionero." },
              { texto: "Que solo dejaron iglesias llenas, pero nada que se notara en la sociedad.", explica: "Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud." },
            ],
            apoyo: "Los avivamientos verdaderos dejaron frutos que duran",
            explica: "Los avivamientos verdaderos dejaron frutos que duran. Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud; del moravo, un gran movimiento misionero; y de la calle Azusa, iglesias pentecostales en todo el mundo.",
          },
          {
            caso: "Una maestra de escuela dominical te dice: El avivamiento no tiene nada que ver con la sociedad; es solo para la iglesia.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que del avivamiento metodista salieron escuelas y ayuda a los pobres y a los presos.", bien: true, explica: "Los verdaderos dejan frutos que duran en la iglesia y en la sociedad: del metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud." },
              { texto: "Que tiene razón: los avivamientos nunca cambiaron nada fuera de las paredes del templo.", explica: "Los avivamientos verdaderos dejaron frutos en la sociedad: en 1791 Juan Wesley escribió su última carta a William Wilberforce para animarlo en su lucha contra el comercio de esclavos." },
              { texto: "Que la sociedad cambia sola, sin que haga falta ningún avivamiento de parte de Dios.", explica: "Los frutos en la sociedad salieron de los avivamientos: del metodista salieron escuelas y ayuda a los pobres." },
              { texto: "Que lo único que dejaron los avivamientos fueron reuniones muy emotivas y llenas.", explica: "Los avivamientos verdaderos dejaron frutos que duran, no solo reuniones." },
            ],
            apoyo: "Los verdaderos dejan frutos que duran en la iglesia y en la sociedad",
            explica: "Los verdaderos dejan frutos que duran en la iglesia y en la sociedad. Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud: en 1791 Juan Wesley escribió su última carta a William Wilberforce para animarlo en su lucha contra el comercio de esclavos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Las épocas y los lugares cambian, pero el Señor no",
            ref: "Hebreos 13:8",
            clave: {
              id: "pr-n5-avivamiento-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué se parecen entre sí los avivamientos de la historia, y en qué se parecen?",
              ideas: [
                { id: "senor", peso: 40, texto: "Porque el Señor es el mismo: Jesucristo es el mismo ayer, y hoy, y por los siglos.", formas: ["(senor|dios|jesucristo|jesus|cristo) (es|sigue) (el|siendo) mismo", "el mismo ayer", "ayer y hoy", "no cambia", "nunca cambia", "mismo senor", "mismo dios"] },
                { id: "palabra", peso: 30, texto: "En todos hay oración perseverante y predicación de la Palabra.", formas: ["oracion*", "orar", "oraban", "predica*", "palabra"] },
                { id: "conviccion", peso: 30, texto: "Hay convicción de pecado, conversiones, santidad, gozo y misión.", formas: ["conviccion", "convers*", "convirt*", "santid*", "gozo", "mision"] },
              ],
              modelo: "Se parecen porque el Señor es el mismo: Jesucristo es el mismo ayer, y hoy, y por los siglos. En todos hay oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión.",
            },
          },
          {
            apoyo: "La historia de lo que Dios hizo alimenta la fe en lo que puede hacer",
            ref: "Salmos 78:4",
            clave: {
              id: "pr-n5-avivamiento-4-a7-2",
              tipo: "corta",
              pregunta: "Desde Herrnhut hasta Valparaíso, ¿qué tienen en común los avivamientos, y qué dejan los verdaderos?",
              ideas: [
                { id: "comun", peso: 50, texto: "Tienen en común la oración, la Palabra, la convicción de pecado, las conversiones, la santidad, el gozo y la misión.", formas: ["oracion*", "orar", "palabra", "predica*", "conviccion", "convers*", "santid*", "gozo", "mision"] },
                { id: "frutos", peso: 50, texto: "Los verdaderos dejan frutos que duran en la iglesia y en la sociedad.", formas: ["frutos que duran", "fruto* (duradero*|permanente*)", "(dejan|dejaron|deja) frutos", "frutos (en|para) la (iglesia|sociedad)", "la sociedad", "escuelas", "misioneros", "esclavitud", "pobres"] },
              ],
              modelo: "Tienen en común la oración, la Palabra, la convicción de pecado, las conversiones, la santidad, el gozo y la misión, porque el Señor es el mismo. Los verdaderos dejan frutos que duran en la iglesia y en la sociedad.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El discernimiento: examinadlo todo
    "n5-avivamiento-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dos cosas necesita a la vez el líder ante la obra de Dios?", reverso: "Apertura al Espíritu y discernimiento.", apoyo: "El líder necesita dos cosas a la vez: apertura al Espíritu y discernimiento" },
              { frente: "¿Cuáles son los dos errores ante lo que Dios hace?", reverso: "Apagarlo por miedo o por frialdad, o aceptar cualquier cosa sin examinarla.", apoyo: "Un error es apagar lo que Dios hace, por miedo o por frialdad; el otro, aceptar cualquier cosa sin examinarla" },
              { frente: "¿Cuál es la prueba principal de un espíritu?", reverso: "Cristo: si confiesa que Jesucristo ha venido en carne.", apoyo: "La prueba principal es Cristo" },
              { frente: "Según la lección, ¿cuál es la segunda prueba de una obra?", reverso: "El fruto: por sus frutos los conoceréis.", apoyo: "Y la segunda, el fruto: «Por sus frutos los conoceréis»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué aparece también donde Dios obra con poder?", reverso: "Excesos, imitaciones y engaños.", apoyo: "Donde Dios obra con poder también aparecen excesos, imitaciones y engaños" },
              { frente: "¿Qué manda Pablo hacer con todo, y qué retener?", reverso: "Examinarlo todo y retener lo bueno.", apoyo: "Examinadlo todo; retened lo bueno" },
              { frente: "¿Qué no hay que menospreciar, según Pablo?", reverso: "Las profecías.", apoyo: "No menospreciéis las profecías" },
              { frente: "¿Cómo resume la lección la actitud del líder?", reverso: "Abierto al Espíritu y firme en la Palabra, las dos cosas a la vez.", apoyo: "Abierto al Espíritu y firme en la Palabra: las dos cosas a la vez" },
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
            consigna: "Pablo da el equilibrio en tres frases. ¿Qué manda hacer con todo, y con lo bueno? Toca las palabras que lo dicen.",
            texto: "No apaguéis al Espíritu. No menospreciéis las profecías. [[Examinadlo todo]]; [[retened lo bueno]]",
            apoyo: "Pablo da el equilibrio en tres frases",
            ref: "1 Tesalonicenses 5:19-21",
            explica: "Pablo da el equilibrio: «No apaguéis al Espíritu. No menospreciéis las profecías. Examinadlo todo; retened lo bueno». Un error es apagar lo que Dios hace; el otro, aceptar cualquier cosa sin examinarla.",
          },
          {
            consigna: "Según 1 Juan 4:2, ¿qué confiesa el espíritu que es de Dios? Toca las palabras que lo dicen.",
            texto: "Todo espíritu que confiesa que [[Jesucristo ha venido en carne]], es de Dios",
            apoyo: "La prueba principal es Cristo",
            ref: "1 Juan 4:2",
            explica: "Para examinarlo todo, la prueba principal es Cristo: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "Para Jonathan Edwards, ¿es una señal de una obra verdadera del Espíritu o no prueba nada por sí sola? Lleva cada frase a su grupo.",
            grupos: ["Señal de una obra verdadera", "No prueba nada por sí sola"],
            frases: [
              { texto: "Exalta a Jesús como Hijo de Dios y Salvador", grupo: 0 },
              { texto: "Lleva a dejar el pecado", grupo: 0 },
              { texto: "Aumenta el amor y el respeto por la Escritura", grupo: 0 },
              { texto: "Lleva a la verdad, no a la confusión", grupo: 0 },
              { texto: "Produce amor a Dios y al prójimo", grupo: 0 },
              { texto: "Las lágrimas", grupo: 1 },
              { texto: "Los temblores", grupo: 1 },
              { texto: "Los gritos", grupo: 1 },
            ],
            apoyo: "Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos",
            ref: "1 Juan 4:1-3",
            explica: "Según Edwards, una obra verdadera exalta a Jesús, lleva a dejar el pecado, aumenta el amor por la Escritura, lleva a la verdad y produce amor. Las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea.",
          },
          {
            consigna: "¿Muestra una obra verdadera, según las señales de Edwards, o no prueba nada por sí sola? Lleva cada frase a su grupo.",
            grupos: ["Muestra una obra verdadera", "No prueba nada por sí sola"],
            frases: [
              { texto: "Los nuevos hablan de Jesús como su Salvador", grupo: 0 },
              { texto: "Un comerciante deja de engañar a sus clientes", grupo: 0 },
              { texto: "Los hermanos leen la Biblia con más amor y respeto", grupo: 0 },
              { texto: "Crece el amor entre los hermanos y por el prójimo", grupo: 0 },
              { texto: "Muchos lloran durante el culto", grupo: 1 },
              { texto: "Alguien tiembla mientras oran por él", grupo: 1 },
              { texto: "Se oyen gritos en la reunión", grupo: 1 },
            ],
            apoyo: "la prueba son sus frutos",
            ref: "Mateo 7:15-17",
            explica: "Hablar de Jesús como Salvador, dejar el pecado, amar la Escritura y amar al prójimo son señales de una obra verdadera. Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Edwards también vio excesos, pero no rechazó la obra por ellos",
            ref: "1 Juan 4:1-3",
            titulo: "Las noches de oración en el barrio",
            relato: [
              "Eres pastor. Desde hace un mes, la iglesia ora cada noche, y muchos vecinos han empezado a venir.",
              "En las reuniones algunos lloran, otros tiemblan, y un joven grita mientras oran por él. Un hermano te dice que eso no puede ser de Dios; otro, que todo lo que pasa es de Dios.",
              "Esta semana, un vecino devolvió lo que había robado, y varias familias empezaron a leer la Biblia juntas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas a discernir lo que pasa?",
                opciones: [
                  { texto: "Miro si exalta a Cristo y qué frutos deja, sin apagarlo ni aceptarlo todo.", bien: true, explica: "El líder no apaga al Espíritu, pero lo examina todo: las pruebas son Cristo y el fruto." },
                  { texto: "Lo acepto todo, porque donde hay tanta emoción tiene que estar Dios obrando.", explica: "Aceptar cualquier cosa sin examinarla es uno de los dos errores: el líder lo examina todo y retiene lo bueno." },
                  { texto: "Lo rechazo todo, porque en las reuniones hay lágrimas, temblores y gritos.", explica: "Apagar lo que Dios hace, por miedo o por frialdad, es el otro error: Edwards vio excesos, pero no rechazó la obra por ellos." },
                  { texto: "Espero a ver cuánta gente viene, porque el número de personas prueba si es de Dios.", explica: "Las pruebas son Cristo y el fruto, no cuánta gente llega." },
                ],
                apoyo: "Las pruebas son Cristo y el fruto",
                explica: "El líder no apaga al Espíritu, pero lo examina todo y retiene lo bueno: las pruebas son Cristo y el fruto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con las lágrimas, los temblores y los gritos?",
                opciones: [
                  { texto: "No los tomo como prueba de que sea de Dios, ni de que no lo sea.", bien: true, explica: "Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos." },
                  { texto: "Los tomo como la prueba más segura de que Dios está obrando en la iglesia.", explica: "Para Edwards, las manifestaciones no prueban por sí mismas que una obra sea de Dios: la prueba son sus frutos." },
                  { texto: "Los prohíbo y cierro de inmediato las reuniones de oración de cada noche.", explica: "Edwards también vio excesos, pero no rechazó la obra por ellos: apagar lo que Dios hace es un error." },
                  { texto: "Pido a todos que lloren y griten, para que las reuniones tengan más poder.", explica: "La presencia de Dios no se fabrica con manipulación de las emociones: eso es fuego extraño." },
                ],
                apoyo: "Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos",
                explica: "Edwards también vio excesos, pero no rechazó la obra por ellos: las manifestaciones no prueban nada por sí solas; la prueba son los frutos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué te muestra el vecino que devolvió lo que había robado?",
                opciones: [
                  { texto: "Una señal de obra verdadera: lleva a dejar el pecado.", bien: true, explica: "Una obra verdadera del Espíritu se opone al reino de Satanás: lleva a dejar el pecado." },
                  { texto: "Nada importante: lo que cuenta es lo que se siente en el culto.", explica: "La prueba son los frutos, no lo que se siente: una obra verdadera lleva a dejar el pecado." },
                  { texto: "Que el vecino solo quiere que lo vean, y no hay que fijarse en eso.", explica: "Por sus frutos los conoceréis: dejar el pecado es una señal de una obra verdadera." },
                ],
                apoyo: "Se opone al reino de Satanás: lleva a dejar el pecado",
                explica: "Una obra verdadera del Espíritu se opone al reino de Satanás: lleva a dejar el pecado. Y las familias que leen la Biblia muestran otra señal: aumenta el amor y el respeto por la Escritura.",
              },
              {
                tipo: "explica",
                apoyo: "Las pruebas son Cristo y el fruto: una obra verdadera exalta a Jesús, aleja del pecado, ama la Escritura, lleva a la verdad y produce amor, como enseñó Jonathan Edwards",
                clave: {
                  id: "pr-n5-avivamiento-5-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué les dirás a los dos hermanos que opinan distinto sobre lo que pasa en las reuniones?",
                  ideas: [
                    { id: "examinar", peso: 40, texto: "Que no hay que apagar al Espíritu ni aceptar todo sin examinarlo: examinadlo todo, retened lo bueno.", formas: ["examin*", "retene*", "reteng*", "lo bueno", "no apag*", "ni apag*", "sin apagar", "discern*"] },
                    { id: "frutos", peso: 40, texto: "Que la prueba son los frutos: exaltar a Cristo, dejar el pecado, amar la Escritura y amar al prójimo.", formas: ["fruto*", "exalt*", "dej* el pecado", "devolvi*", "leen la biblia", "lean la biblia", "(prueba|pruebas) (es|son) cristo"] },
                    { id: "manifestaciones", peso: 20, texto: "Que las lágrimas, los temblores o los gritos no prueban por sí mismos que sea de Dios, ni que no lo sea.", formas: ["lagrimas", "temblor*", "grito*", "manifestaciones", "no prueba*", "por si (solas|solos|mismas|mismos)"] },
                  ],
                  errores: [
                    { id: "prueban", texto: "Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea.", formas: ["(lagrimas|temblores|gritos|manifestaciones) (prueban|muestran|demuestran)", "(prueba|muestra|demuestra) que (es|viene) de dios"], anula: "manifestaciones" },
                  ],
                  modelo: "Les diré que no hay que apagar al Espíritu ni aceptar todo sin examinarlo. Las lágrimas, los temblores o los gritos no prueban nada por sí solos; la prueba son los frutos, como el vecino que devolvió lo robado y las familias que leen la Biblia.",
                },
              },
            ],
          },
          {
            apoyo: "Lleva a la verdad, no a la confusión",
            ref: "1 Corintios 14:33",
            titulo: "El predicador del fuego nuevo",
            relato: [
              "Eres el pastor de una iglesia en avivamiento. Un domingo, un predicador invitado anuncia que trae un fuego nuevo.",
              "Durante el culto todos hablan a la vez, nadie escucha la Palabra, y al final el predicador pide una ofrenda especial para quienes quieran recibir más poder.",
              "Algunos hermanos salen confundidos; otros te piden que lo invites cada mes.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te dice 1 Corintios 14:33 sobre ese culto?",
                opciones: [
                  { texto: "Que Dios no es Dios de confusión, sino de paz.", bien: true, explica: "Las manifestaciones del Espíritu no se oponen al orden: «Dios no es Dios de confusión, sino de paz»." },
                  { texto: "Que mientras más confusión haya, más cerca está Dios de la iglesia.", explica: "«Dios no es Dios de confusión, sino de paz»: una obra verdadera lleva a la verdad, no a la confusión." },
                  { texto: "Que el orden siempre apaga al Espíritu cuando hay un avivamiento.", explica: "Las manifestaciones del Espíritu no se oponen al orden: «hágase todo decentemente y con orden»." },
                ],
                apoyo: "Las manifestaciones del Espíritu no se oponen al orden",
                explica: "Las manifestaciones del Espíritu no se oponen al orden: «Dios no es Dios de confusión, sino de paz», y «hágase todo decentemente y con orden».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué es esa ofrenda para recibir más poder?",
                opciones: [
                  { texto: "Presión para dar dinero: fuego extraño, que Dios no manda.", bien: true, explica: "La presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo." },
                  { texto: "Una manera bíblica de recibir más del Espíritu Santo en el culto.", explica: "Nadab y Abiú ofrecieron «fuego extraño, que él nunca les mandó»: lo que Dios no manda no aviva a su iglesia." },
                  { texto: "Una buena idea, siempre que el predicador sea muy conocido.", explica: "La presencia de Dios no se fabrica con presión para dar dinero, venga de quien venga." },
                ],
                apoyo: "la presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo",
                explica: "Nadab y Abiú ofrecieron fuego extraño, que Dios nunca les mandó: es una advertencia para todo ministerio. La presencia de Dios no se fabrica con presión para dar dinero.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué señal de una obra verdadera falta en ese culto, según Edwards?",
                opciones: [
                  { texto: "Que lleve a la verdad, no a la confusión.", bien: true, explica: "Una obra verdadera lleva a la verdad, no a la confusión, y aumenta el amor y el respeto por la Escritura." },
                  { texto: "Que llegue mucha gente, porque eso prueba que la obra es de Dios.", explica: "Las pruebas son Cristo y el fruto, no cuánta gente llega." },
                  { texto: "Que haya mucho ruido, porque el silencio apaga siempre al Espíritu.", explica: "Una obra verdadera lleva a la verdad, no a la confusión: «Dios no es Dios de confusión, sino de paz»." },
                ],
                apoyo: "Lleva a la verdad, no a la confusión",
                explica: "Según Edwards, una obra verdadera lleva a la verdad, no a la confusión, y aumenta el amor y el respeto por la Escritura. En ese culto nadie escuchaba la Palabra.",
              },
              {
                tipo: "explica",
                apoyo: "Lo que Dios no manda no aviva a su iglesia",
                clave: {
                  id: "pr-n5-avivamiento-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué les dirás a los hermanos que quieren invitar cada mes a ese predicador?",
                  ideas: [
                    { id: "fuego", peso: 50, texto: "Que la presencia de Dios no se fabrica con presión para dar dinero ni con espectáculo: eso es fuego extraño.", formas: ["fuego extrano", "no se fabrica", "fabric*", "manipul*", "presion", "espectaculo", "dios no (manda|mando)", "no (lo|la) manda"] },
                    { id: "orden", peso: 50, texto: "Que Dios no es Dios de confusión, sino de paz, y una obra verdadera lleva a la verdad.", formas: ["no es dios de confusion", "no es de confusion", "no (hay|haya|trae|quiere) confusion", "sin confusion", "de paz", "con orden", "en orden", "decentemente", "lleva a la verdad"] },
                  ],
                  errores: [
                    { id: "invitar", texto: "Lo que Dios no manda no aviva a su iglesia.", formas: ["hay que invitarlo", "vamos a invitarlo", "debemos invitarlo", "que venga cada mes", "que vuelva cada mes"], anula: "fuego" },
                  ],
                  modelo: "Les diré que no lo inviten, porque Dios no es Dios de confusión, sino de paz, y la presencia de Dios no se fabrica con presión para dar dinero ni con espectáculo: eso es fuego extraño.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los excesos y las imitaciones en los avivamientos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Donde Dios obra con poder también aparecen excesos, imitaciones y engaños.", verdad: true, explica: "Donde Dios obra con poder también aparecen excesos, imitaciones y engaños: por eso el líder necesita apertura al Espíritu y discernimiento.", apoyo: "Donde Dios obra con poder también aparecen excesos, imitaciones y engaños" },
              { texto: "Edwards rechazó la obra del Gran Despertar porque vio excesos en ella.", verdad: false, explica: "Edwards también vio excesos, pero no rechazó la obra por ellos: la prueba son sus frutos.", apoyo: "Edwards también vio excesos, pero no rechazó la obra por ellos" },
              { texto: "Nadab y Abiú ofrecieron fuego extraño, que Dios nunca les mandó.", verdad: true, explica: "Nadab y Abiú ofrecieron «fuego extraño, que él nunca les mandó»: es una advertencia para todo ministerio.", apoyo: "Nadab y Abiú ofrecieron «fuego extraño, que él nunca les mandó»", ref: "Levítico 10:1-2" },
            ],
          },
          {
            consigna: "Sobre el fuego extraño y el orden: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La presencia de Dios se puede fabricar con espectáculo y manipulación.", verdad: false, explica: "La presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo.", apoyo: "la presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo" },
              { texto: "Las manifestaciones del Espíritu se oponen al orden.", verdad: false, explica: "Las manifestaciones del Espíritu no se oponen al orden: «Dios no es Dios de confusión, sino de paz».", apoyo: "Las manifestaciones del Espíritu no se oponen al orden", ref: "1 Corintios 14:33" },
              { texto: "Lo que se fabrica con manipulación es fuego extraño.", verdad: true, explica: "Lo dice la lección: lo que se fabrica con manipulación es fuego extraño, y lo que Dios no manda no aviva a su iglesia.", apoyo: "lo que se fabrica con manipulación es fuego extraño" },
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
            consigna: "Una de estas frases sobre el fuego extraño tiene un error. Tócala.",
            frases: [
              "Nadab y Abiú ofrecieron fuego extraño, que Dios nunca les mandó.",
              "El fuego extraño es una advertencia para todo ministerio.",
              "La presencia de Dios se fabrica con presión para dar dinero.",
              "Lo que Dios no manda no aviva a su iglesia.",
            ],
            malo: 2,
            correccion: "La presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo.",
            apoyo: "Es una advertencia para todo ministerio",
            ref: "Levítico 10:1-2",
            explica: "Nadab y Abiú ofrecieron fuego extraño, que Dios nunca les mandó: es una advertencia para todo ministerio. La presencia de Dios no se fabrica, y lo que Dios no manda no aviva a su iglesia.",
          },
          {
            consigna: "Una de estas frases sobre las manifestaciones y el orden tiene un error. Tócala.",
            frases: [
              "Las manifestaciones del Espíritu no se oponen al orden.",
              "Dios no es Dios de confusión, sino de paz.",
              "Pablo pide que todo se haga decentemente y con orden.",
              "Mientras más confusión haya en un culto, más seguro es que viene de Dios.",
            ],
            malo: 3,
            correccion: "Dios no es Dios de confusión, sino de paz: una obra verdadera lleva a la verdad, no a la confusión.",
            apoyo: "Las manifestaciones del Espíritu no se oponen al orden",
            ref: "1 Corintios 14:33; 1 Corintios 14:40",
            explica: "Las manifestaciones del Espíritu no se oponen al orden: «Dios no es Dios de confusión, sino de paz», y «hágase todo decentemente y con orden».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El líder no apaga al Espíritu, pero lo examina todo y retiene lo bueno",
            ref: "1 Tesalonicenses 5:19-21",
            clave: {
              id: "pr-n5-avivamiento-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué equilibrio da Pablo en 1 Tesalonicenses 5:19-21, y cuáles son los dos errores que evita?",
              ideas: [
                { id: "equilibrio", peso: 40, texto: "No apagar al Espíritu, pero examinarlo todo y retener lo bueno.", formas: ["examin*", "retene*", "reteng*", "lo bueno"] },
                { id: "apagar", peso: 30, texto: "Un error es apagar lo que Dios hace, por miedo o por frialdad.", formas: ["apag*", "miedo", "frialdad", "frio*"] },
                { id: "aceptar", peso: 30, texto: "El otro error es aceptar cualquier cosa sin examinarla.", formas: ["acept* cualquier", "acept* todo", "sin examinar*", "cualquier cosa", "creer todo", "cree todo"] },
              ],
              errores: [
                { id: "aceptar-todo", texto: "Aceptar cualquier cosa sin examinarla es uno de los dos errores.", formas: ["hay que aceptar*", "debemos aceptar*", "se debe aceptar*", "hay que creer todo"], anula: "aceptar" },
                { id: "examinar-apaga", texto: "Pablo manda examinarlo todo y retener lo bueno: examinar no apaga al Espíritu.", formas: ["si uno examina", "si se examina", "examinar (es|apaga)", "examina* apaga*", "no hay que examinar", "no examin* nada"], anula: "equilibrio" },
              ],
              modelo: "Pablo dice que no apaguemos al Espíritu, pero que lo examinemos todo y retengamos lo bueno. Así evita dos errores: apagar lo que Dios hace, por miedo o por frialdad, y aceptar cualquier cosa sin examinarla.",
            },
          },
          {
            apoyo: "Abierto al Espíritu y firme en la Palabra: las dos cosas a la vez",
            ref: "1 Tesalonicenses 5:19-21",
            clave: {
              id: "pr-n5-avivamiento-5-a7-2",
              tipo: "corta",
              pregunta: "Un líder te dice: Para no equivocarme, en mi iglesia no permito nada que no entienda. ¿Qué le respondes con lo que enseña Pablo?",
              ideas: [
                { id: "noapagar", peso: 50, texto: "Que no apague al Espíritu: apagar lo que Dios hace, por miedo o por frialdad, también es un error.", formas: ["no apag*", "ni apag*", "sin apagar", "no menospreci*", "apertura", "abierto al espiritu", "es un error apagar*", "error (es|de|seria) apagar*", "apagar* (es|seria|tambien) (un|es) error", "apag* lo que dios hace (es|seria|tambien)"] },
                { id: "examinar", peso: 50, texto: "Que lo examine todo y retenga lo bueno: abierto al Espíritu y firme en la Palabra.", formas: ["examin*", "retene*", "reteng*", "lo bueno", "firme en la palabra", "discern*"] },
              ],
              errores: [
                { id: "razon", texto: "Apagar lo que Dios hace, por miedo o por frialdad, también es un error.", formas: ["tiene razon", "tienes razon", "hace bien", "haces bien"], anula: "noapagar" },
                { id: "examinar-apaga", texto: "Pablo manda examinarlo todo y retener lo bueno: examinar no es falta de fe.", formas: ["si uno examina", "si se examina", "examinar (es|apaga)", "examina* apaga*", "no hay que examinar", "no examin* nada"], anula: "examinar" },
              ],
              modelo: "Le respondo que no apague al Espíritu, porque apagar lo que Dios hace por miedo también es un error. Pablo dice que lo examine todo y retenga lo bueno: abierto al Espíritu y firme en la Palabra, las dos cosas a la vez.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Buscar el avivamiento y sostener sus frutos
    "n5-avivamiento-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién fabrica el avivamiento?", reverso: "Nadie: es obra soberana de Dios.", apoyo: "El avivamiento es obra soberana de Dios: nadie lo fabrica" },
              { frente: "¿Qué hacían los discípulos antes de Pentecostés?", reverso: "Perseveraban unánimes en oración y ruego.", apoyo: "Antes de Pentecostés, los discípulos «perseveraban unánimes en oración y ruego»" },
              { frente: "¿Qué promete Dios a los que se acercan a él?", reverso: "Que él se acercará a ellos.", apoyo: "Dios promete: «Acercaos a Dios, y él se acercará a vosotros»" },
              { frente: "¿Cómo llama Oseas a buscar a Jehová?", reverso: "Preparar la tierra: hacer barbecho.", apoyo: "Oseas lo llama preparar la tierra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pide Santiago a los de doble ánimo?", reverso: "Que purifiquen sus corazones.", apoyo: "«Pecadores, limpiad las manos; y vosotros los de doble ánimo, purificad vuestros corazones»" },
              { frente: "¿Qué hace la iglesia mientras espera a Dios?", reverso: "Ora, se arrepiente y vuelve a la Palabra, sin fabricar nada.", apoyo: "La iglesia ora, se arrepiente y vuelve a la Palabra, y espera a Dios sin fabricar nada" },
              { frente: "Si la iglesia prepara la tierra, ¿quién manda la lluvia?", reverso: "Dios: la lluvia la manda él.", apoyo: "Prepara la tierra hoy; la lluvia la manda Dios" },
              { frente: "Según Oseas, ¿de qué es tiempo?", reverso: "De buscar a Jehová.", apoyo: "«haced para vosotros barbecho; porque es el tiempo de buscar a Jehová»" },
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
            consigna: "Completa cómo busca la iglesia el avivamiento, según la idea clave.",
            texto: "La iglesia busca el avivamiento con oración [[unida]], arrepentimiento, [[limpieza]] del corazón y la Palabra, preparando la [[tierra]] sin fabricar nada.",
            distractores: ["dividida", "dureza", "fiesta"],
            errores: {
              dividida: "Antes de Pentecostés, los discípulos perseveraban unánimes en oración: la oración es unida.",
              dureza: "Santiago pide limpieza: purificad vuestros corazones.",
              fiesta: "Oseas lo llama preparar la tierra.",
            },
            apoyo: "la iglesia lo busca con oración unida, arrepentimiento, limpieza del corazón y la Palabra, preparando la tierra sin fabricar nada",
            ref: "Hechos 1:14; Santiago 4:8",
            explica: "El avivamiento es obra de Dios, pero la iglesia lo busca con oración unida, arrepentimiento, limpieza del corazón y la Palabra, preparando la tierra sin fabricar nada.",
          },
          {
            consigna: "Completa lo que hace la iglesia mientras espera a Dios.",
            texto: "Como pide Oseas, la iglesia hace [[barbecho]]: ora, se arrepiente, vuelve a la [[Palabra]] y [[espera]] a Dios sin fabricar nada.",
            distractores: ["negocio", "rutina", "presiona"],
            errores: {
              negocio: "Oseas lo llama preparar la tierra: haced para vosotros barbecho.",
              rutina: "La iglesia ora, se arrepiente y vuelve a la Palabra.",
              presiona: "La iglesia espera a Dios sin fabricar nada: el avivamiento es obra soberana de Dios.",
            },
            apoyo: "La iglesia ora, se arrepiente y vuelve a la Palabra, y espera a Dios sin fabricar nada",
            ref: "Oseas 10:12",
            explica: "Oseas lo llama preparar la tierra: «haced para vosotros barbecho; porque es el tiempo de buscar a Jehová». La iglesia ora, se arrepiente y vuelve a la Palabra, y espera a Dios sin fabricar nada.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "Según la lección, ¿qué une al avivamiento, la cosecha, los obreros y la iglesia? Elige la relación de cada enlace.",
            nodos: [
              { id: "aviv", texto: "Un avivamiento", x: 18, y: 15 },
              { id: "cosecha", texto: "La cosecha", x: 82, y: 15 },
              { id: "obreros", texto: "Obreros", x: 82, y: 50 },
              { id: "iglesia", texto: "La iglesia en avivamiento", x: 18, y: 70 },
              { id: "lideres", texto: "Líderes", x: 50, y: 92 },
              { id: "misioneros", texto: "Misioneros", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "aviv", a: "cosecha", relacion: "trae" },
              { de: "cosecha", a: "obreros", relacion: "pide" },
              { de: "iglesia", a: "lideres", relacion: "forma" },
              { de: "iglesia", a: "misioneros", relacion: "envía" },
            ],
            distractores: ["apaga", "fabrica"],
            apoyo: "Un avivamiento trae cosecha, y la cosecha pide obreros",
            ref: "Mateo 9:37-38",
            explica: "Un avivamiento trae cosecha, y la cosecha pide obreros: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies». Por eso la iglesia en avivamiento forma líderes y envía misioneros.",
          },
          {
            consigna: "¿Cómo se sostienen los frutos de un avivamiento, según la lección? Elige la relación de cada enlace.",
            nodos: [
              { id: "nuevos", texto: "Los nuevos creyentes", x: 20, y: 15 },
              { id: "doctrina", texto: "La doctrina de los apóstoles", x: 78, y: 15 },
              { id: "wesley", texto: "Juan Wesley", x: 20, y: 50 },
              { id: "clases", texto: "Las clases metodistas", x: 78, y: 50 },
              { id: "frutos", texto: "Los frutos del avivamiento", x: 20, y: 85 },
              { id: "discipulado", texto: "El discipulado", x: 78, y: 85 },
            ],
            enlaces: [
              { de: "nuevos", a: "doctrina", relacion: "perseveraban en la" },
              { de: "wesley", a: "clases", relacion: "hizo lo mismo con" },
              { de: "frutos", a: "discipulado", relacion: "se pierden sin el" },
            ],
            distractores: ["despreciaron la", "crecen solos sin el"],
            apoyo: "Sin discipulado, los frutos de un avivamiento se pierden",
            ref: "Hechos 2:42",
            explica: "Después de Pentecostés, los nuevos creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Juan Wesley hizo lo mismo con las clases metodistas. Sin discipulado, los frutos de un avivamiento se pierden.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Sin discipulado, los frutos de un avivamiento se pierden",
            ref: "Hechos 2:42",
            titulo: "Cuarenta nuevos en tres meses",
            relato: [
              "Eres pastor de una iglesia pequeña. Después de meses de oración unida, en tres meses llegaron a Cristo cuarenta personas.",
              "Los nuevos vienen los domingos, pero entre semana nadie los acompaña, y algunos ya empiezan a faltar.",
              "Tus líderes están contentos, pero cansados, y te piden un plan.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué es lo primero que necesitan los nuevos creyentes?",
                opciones: [
                  { texto: "Discipulado: doctrina, comunión, el partimiento del pan y oraciones.", bien: true, explica: "Los nuevos creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones»." },
                  { texto: "Más cultos grandes los domingos, para que vean cuánto está creciendo la iglesia.", explica: "Después de Pentecostés, los nuevos creyentes no quedaron sueltos: sin discipulado, los frutos se pierden." },
                  { texto: "Nada especial: si de verdad creyeron, van a seguir firmes por sí solos.", explica: "Sin discipulado, los frutos de un avivamiento se pierden." },
                ],
                apoyo: "Después de Pentecostés, los nuevos creyentes no quedaron sueltos",
                explica: "Después de Pentecostés, los nuevos creyentes no quedaron sueltos: perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo los organizas, como hizo Juan Wesley?",
                opciones: [
                  { texto: "En pequeños grupos donde cada uno da cuenta de su vida espiritual.", bien: true, explica: "Juan Wesley hizo lo mismo con las clases metodistas: pequeños grupos donde cada uno daba cuenta de su vida espiritual." },
                  { texto: "En una sola reunión grande, donde nadie tiene que hablar de su vida.", explica: "Las clases metodistas eran pequeños grupos donde cada uno daba cuenta de su vida espiritual." },
                  { texto: "Cada uno por su cuenta, con un libro para leer solo en su casa.", explica: "Los nuevos no quedaron sueltos: perseveraban en la comunión unos con otros." },
                ],
                apoyo: "Juan Wesley hizo lo mismo con las clases metodistas, pequeños grupos donde cada uno daba cuenta de su vida espiritual",
                explica: "Juan Wesley hizo lo mismo que la iglesia de Hechos con las clases metodistas: pequeños grupos donde cada uno daba cuenta de su vida espiritual.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con tus líderes cansados?",
                opciones: [
                  { texto: "Ruegas por más obreros y formas nuevos líderes entre los hermanos.", bien: true, explica: "La cosecha pide obreros: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies». Por eso la iglesia en avivamiento forma líderes." },
                  { texto: "Les pides que trabajen todavía más horas, hasta que pase la cosecha.", explica: "Un avivamiento trae cosecha, y la cosecha pide obreros: la iglesia forma líderes y envía misioneros." },
                  { texto: "Lo haces todo tú solo, para no cansar a ninguno de los líderes.", explica: "Depender de una sola persona es uno de los errores que apagan el avivamiento." },
                ],
                apoyo: "Un avivamiento trae cosecha, y la cosecha pide obreros",
                explica: "Un avivamiento trae cosecha, y la cosecha pide obreros: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies». Por eso la iglesia en avivamiento forma líderes y envía misioneros.",
              },
              {
                tipo: "explica",
                apoyo: "Sus frutos se sostienen con discipulado, como en Hechos 2:42 y en las clases metodistas, y con la formación y el envío de obreros",
                clave: {
                  id: "pr-n5-avivamiento-6-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras tu plan para que no se pierdan los frutos de este avivamiento.",
                  ideas: [
                    { id: "discipulado", peso: 50, texto: "Discipular a los nuevos: doctrina, comunión, el partimiento del pan y oraciones, en pequeños grupos.", formas: ["discipul*", "pequenos grupos", "grupos pequenos", "clases", "doctrina", "comunion", "acompan*", "dar cuenta", "den cuenta", "rendir cuentas", "rind* cuentas"] },
                    { id: "obreros", peso: 50, texto: "Formar líderes y rogar al Señor de la mies que envíe obreros.", formas: ["obrero*", "form* (lideres|nuevos|obreros|a los)", "nuevos lideres", "lideres nuevos", "rog*", "rueg*", "envi* (misioneros|obreros)", "misioner*"] },
                  ],
                  modelo: "Voy a discipular a los nuevos en pequeños grupos, con la doctrina, la comunión, el partimiento del pan y las oraciones, donde cada uno dé cuenta de su vida. Y voy a rogar por obreros y formar nuevos líderes.",
                },
              },
            ],
          },
          {
            apoyo: "Por eso la iglesia en avivamiento forma líderes y envía misioneros",
            ref: "Mateo 9:37-38",
            titulo: "El avivamiento de los jóvenes",
            relato: [
              "Eres el líder de jóvenes de tu iglesia. En el último año, muchos jóvenes llegaron a Cristo y el grupo se triplicó.",
              "Todo depende de ti: tú predicas, tú aconsejas y tú organizas cada reunión. Ya no das abasto.",
              "El pastor te pide un plan para cuidar lo que Dios está haciendo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el primer riesgo que ves en este avivamiento?",
                opciones: [
                  { texto: "Que dependa de una sola persona: de mí.", bien: true, explica: "Depender de una sola persona es uno de los errores que apagan el avivamiento." },
                  { texto: "Que lleguen todavía más jóvenes de los que caben en el salón.", explica: "Un avivamiento trae cosecha, y la cosecha pide obreros: el riesgo no es que lleguen muchos." },
                  { texto: "Que haya pocas actividades y los jóvenes empiecen a aburrirse.", explica: "El avivamiento se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones, no por falta de actividades." },
                ],
                apoyo: "Se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones",
                explica: "El avivamiento se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones: depender de una sola persona es uno de esos errores.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces para no cargar solo con toda la obra?",
                opciones: [
                  { texto: "Ruego por obreros y formo líderes entre los mismos jóvenes.", bien: true, explica: "La cosecha pide obreros: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies». La iglesia en avivamiento forma líderes." },
                  { texto: "Busco un predicador famoso que venga a llenar las reuniones.", explica: "Depender de una sola persona apaga el avivamiento, aunque sea alguien famoso." },
                  { texto: "Sigo igual y le pido a Dios más fuerzas para hacerlo todo yo.", explica: "Un avivamiento trae cosecha, y la cosecha pide obreros: no depende de una sola persona." },
                ],
                apoyo: "Un avivamiento trae cosecha, y la cosecha pide obreros",
                explica: "Un avivamiento trae cosecha, y la cosecha pide obreros. Por eso la iglesia en avivamiento forma líderes y envía misioneros.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo cuidas a los jóvenes que llegaron a Cristo?",
                opciones: [
                  { texto: "Con discipulado en pequeños grupos donde cada uno da cuenta de su vida.", bien: true, explica: "Sin discipulado, los frutos se pierden: Juan Wesley lo hizo con las clases metodistas, pequeños grupos donde cada uno daba cuenta de su vida espiritual." },
                  { texto: "Con más eventos grandes, para que vengan con ganas a la iglesia cada semana.", explica: "Convertir el avivamiento en un evento es uno de los errores que lo apagan." },
                  { texto: "Dejándolos solos, porque si su fe es real, no necesitan a nadie que los guíe.", explica: "Dejar a los nuevos sin discipulado es uno de los errores que apagan el avivamiento." },
                ],
                apoyo: "Sin discipulado, los frutos de un avivamiento se pierden",
                explica: "Sin discipulado, los frutos de un avivamiento se pierden. Juan Wesley lo hizo con las clases metodistas, pequeños grupos donde cada uno daba cuenta de su vida espiritual.",
              },
              {
                tipo: "explica",
                apoyo: "Por eso la iglesia en avivamiento forma líderes y envía misioneros",
                clave: {
                  id: "pr-n5-avivamiento-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué le propones al pastor para cuidar este avivamiento de jóvenes?",
                  ideas: [
                    { id: "lideres", peso: 50, texto: "Formar líderes y rogar por obreros, para que no dependa de una sola persona.", formas: ["obrero*", "form* (lideres|nuevos|obreros|a los|jovenes)", "nuevos lideres", "lideres nuevos", "rog*", "rueg*", "no depend*", "misioner*"] },
                    { id: "discipulado", peso: 50, texto: "Discipular a los nuevos en pequeños grupos donde cada uno dé cuenta de su vida.", formas: ["discipul*", "pequenos grupos", "grupos pequenos", "clases", "dar cuenta", "den cuenta", "rendir cuentas", "rind* cuentas", "acompan*", "doctrina"] },
                  ],
                  modelo: "Le propongo formar líderes entre los mismos jóvenes y rogar por obreros, para que la obra no dependa de una sola persona. Y discipular a los nuevos en pequeños grupos donde cada uno dé cuenta de su vida espiritual.",
                },
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
            consigna: "¿Ayuda a sostener el avivamiento o es un error que lo apaga? Lleva cada frase a su grupo.",
            grupos: ["Lo sostiene", "Lo apaga"],
            frases: [
              { texto: "Discipular a los nuevos creyentes", grupo: 0 },
              { texto: "Formar líderes y enviar misioneros", grupo: 0 },
              { texto: "Pequeños grupos donde cada uno da cuenta de su vida", grupo: 0 },
              { texto: "Convertirlo en un evento que se anuncia y se programa", grupo: 1 },
              { texto: "Buscar las manifestaciones más que a Dios", grupo: 1 },
              { texto: "Depender de una sola persona", grupo: 1 },
              { texto: "Despreciar la doctrina", grupo: 1 },
              { texto: "Dejar a los nuevos sin discipulado", grupo: 1 },
            ],
            apoyo: "Convertirlo en un evento que se anuncia y se programa, buscar las manifestaciones más que a Dios, depender de una sola persona, despreciar la doctrina o dejar a los nuevos sin discipulado",
            explica: "Los frutos se sostienen con discipulado y con la formación y el envío de obreros. El avivamiento se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones, cuando se desprecia la doctrina o se deja a los nuevos sin discipulado.",
          },
          {
            consigna: "En una iglesia en avivamiento, ¿esto lo cuida o es un error que lo apaga? Lleva cada frase a su grupo.",
            grupos: ["Lo cuida", "Es un error que lo apaga"],
            frases: [
              { texto: "El pastor forma a nuevos líderes entre los convertidos", grupo: 0 },
              { texto: "Los nuevos estudian la doctrina de los apóstoles en grupos", grupo: 0 },
              { texto: "La iglesia sigue orando unida aunque todavía no ve fruto", grupo: 0 },
              { texto: "Un cartel anuncia: avivamiento el sábado a las siete", grupo: 1 },
              { texto: "Todos esperan al mismo predicador para que algo pase", grupo: 1 },
              { texto: "Se busca que haya más manifestaciones en cada culto", grupo: 1 },
              { texto: "Se dice que la doctrina no importa si hay mucho fuego", grupo: 1 },
            ],
            apoyo: "Se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones",
            ref: "Gálatas 6:9",
            explica: "Lo cuidan el discipulado, la formación de obreros y la perseverancia: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos». Lo apagan volverlo un evento, depender de una persona, buscar las manifestaciones más que a Dios y despreciar la doctrina.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de célula te dice: Llevamos un año orando por avivamiento y no vemos nada. Creo que vamos a dejarlo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no se cansen de hacer bien: a su tiempo segarán, si no desmayan.", bien: true, explica: "Para los que esperan y todavía no ven fruto: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos»." },
              { texto: "Que tiene razón: si en un año no pasó nada, Dios no quiere avivar a su iglesia.", explica: "El avivamiento es obra soberana de Dios: la iglesia prepara la tierra, y la lluvia la manda Dios a su tiempo." },
              { texto: "Que organicen un gran evento, para que por fin pase algo en la célula.", explica: "Convertirlo en un evento que se anuncia y se programa es uno de los errores que apagan el avivamiento." },
              { texto: "Que busquen manifestaciones fuertes, para que todos sepan que Dios está ahí.", explica: "Buscar las manifestaciones más que a Dios es uno de los errores que apagan el avivamiento." },
            ],
            apoyo: "Y para los que esperan y todavía no ven fruto",
            ref: "Gálatas 6:9",
            explica: "Para los que esperan y todavía no ven fruto: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos». La iglesia prepara la tierra; la lluvia la manda Dios.",
          },
          {
            caso: "Una líder de alabanza te dice: Hagamos un cartel que diga Avivamiento el sábado a las siete, y así vendrá el fuego.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el avivamiento no se programa: se busca con oración y arrepentimiento.", bien: true, explica: "Convertirlo en un evento que se anuncia y se programa es un error: la iglesia lo busca con oración unida, arrepentimiento y la Palabra." },
              { texto: "Que es una buena idea, porque si se anuncia bien, el avivamiento llega solo.", explica: "El avivamiento es obra soberana de Dios: nadie lo fabrica, ni con un anuncio." },
              { texto: "Que mejor lo anuncie para el domingo, cuando viene más gente a la iglesia.", explica: "Convertirlo en un evento que se anuncia y se programa apaga el avivamiento, sea el día que sea." },
              { texto: "Que invite a un predicador famoso, porque de él depende que venga el fuego.", explica: "Depender de una sola persona es uno de los errores que apagan el avivamiento." },
            ],
            apoyo: "Convertirlo en un evento que se anuncia y se programa",
            explica: "Convertirlo en un evento que se anuncia y se programa es un error que apaga el avivamiento. El avivamiento es obra soberana de Dios: la iglesia lo busca con oración unida, arrepentimiento y la Palabra, sin fabricar nada.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El avivamiento es obra de Dios, pero la iglesia lo busca con oración unida, arrepentimiento, limpieza del corazón y la Palabra, preparando la tierra sin fabricar nada",
            ref: "Oseas 10:12",
            clave: {
              id: "pr-n5-avivamiento-6-a7-1",
              tipo: "corta",
              pregunta: "Si el avivamiento es obra soberana de Dios, ¿qué hace la iglesia para buscarlo?",
              ideas: [
                { id: "tierra", peso: 30, texto: "Prepara la tierra y espera a Dios sin fabricar nada.", formas: ["nadie lo fabrica", "no se fabrica", "sin fabricar", "prepar* la tierra", "barbecho", "espera* a dios", "lluvia"] },
                { id: "oracion", peso: 40, texto: "Ora unida y se acerca a Dios.", formas: ["ora*", "unanimes", "unid*", "(se|nos|me|te|les) acerc*", "acercarse", "acercarnos", "acercandose", "acerqu*"] },
                { id: "arrepentimiento", peso: 30, texto: "Se arrepiente, limpia su corazón y vuelve a la Palabra.", formas: ["arrepent*", "limpi*", "purific*", "palabra", "santid*"] },
              ],
              modelo: "Nadie lo fabrica, pero la iglesia prepara la tierra: ora unida y se acerca a Dios, se arrepiente, limpia su corazón y vuelve a la Palabra, y espera a Dios sin fabricar nada.",
            },
          },
          {
            apoyo: "Prepara la tierra hoy; la lluvia la manda Dios",
            ref: "Santiago 4:8",
            clave: {
              id: "pr-n5-avivamiento-6-a7-2",
              tipo: "corta",
              pregunta: "La lección dice: Prepara la tierra hoy; la lluvia la manda Dios. ¿Qué quiere decir eso para la iglesia que busca el avivamiento?",
              ideas: [
                { id: "lluvia", peso: 40, texto: "Que el avivamiento es obra soberana de Dios: nadie lo fabrica.", formas: ["obra soberana", "soberan*", "nadie lo fabrica", "no se fabrica", "sin fabricar", "lo manda dios", "dios lo (manda|da|envia)", "obra de dios"] },
                { id: "orar", peso: 30, texto: "Que la iglesia prepara la tierra orando unida y acercándose a Dios.", formas: ["ora*", "unanimes", "unid*", "(se|nos|me|te|les) acerc*", "acercarse", "acercarnos", "acercandose", "acerqu*"] },
                { id: "arrepentirse", peso: 30, texto: "Que se arrepiente, limpia su corazón y vuelve a la Palabra.", formas: ["arrepent*", "limpi*", "purific*", "palabra", "barbecho"] },
              ],
              modelo: "Quiere decir que el avivamiento es obra soberana de Dios: nadie lo fabrica. Pero la iglesia prepara la tierra: ora unida, se acerca a Dios, se arrepiente, limpia su corazón y vuelve a la Palabra.",
            },
          },
        ],
      },
    ],
  },
};
