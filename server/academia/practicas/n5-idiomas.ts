/**
 * Las prácticas de «Griego y hebreo bíblicos para el estudio» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-idiomas.ts), con la guía de docs/academia-practicas.md.
 *
 * Las palabras griegas y hebreas van como las escribe la lección, con su transliteración y su sentido tal como ella los
 * da; los huecos de completar son palabras en español (las dinámicas de letras usan el alfabeto español). En Juan 21
 * (agapáo y filéo) solo se pregunta lo que la lección afirma, con sus mismas palabras.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_IDIOMAS: PracticasMateria = {
  materia: "n5-idiomas",
  mision: {
    titulo: "Hasta la jota y la tilde",
    intro: "Tu pastor te pidió un taller para los maestros de la iglesia: cómo usar el griego y el hebreo en el estudio sin ser expertos. Te van a preguntar en qué idiomas se escribió la Biblia y cómo llegó hasta nosotros, qué significan palabras como shalom, lógos, ágape y jésed, cómo se usan la concordancia de Strong, el interlineal y el diccionario, cómo se hace un estudio de palabras y qué errores hay que evitar. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes guiar a otros a estudiar mejor la Biblia con los idiomas originales: saber en qué idiomas se escribió y cómo llegó hasta nosotros, conocer sus palabras clave, usar la concordancia de Strong, el interlineal y el diccionario, hacer un estudio de palabras y enseñarlo con sencillez. Dios cuida su Palabra hasta la jota y la tilde, y conocer los idiomas originales debe hacerte más humilde y más fiel, no más orgulloso.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Los idiomas de la Biblia
    "n5-idiomas-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué idioma se escribió casi todo el Antiguo Testamento?", reverso: "En hebreo.", apoyo: "Hebreo: casi todo el Antiguo Testamento" },
              { frente: "¿En qué griego se escribió el Nuevo Testamento?", reverso: "En el koiné, el griego común que se hablaba en todo el Mediterráneo.", apoyo: "sino en el koiné, el griego común que se hablaba en todo el Mediterráneo" },
              { frente: "¿Qué parte del libro de Daniel está escrita en arameo?", reverso: "Desde 2:4 hasta el final del capítulo 7.", apoyo: "Desde ese versículo hasta el final del capítulo 7, el libro de Daniel está escrito en arameo" },
              { frente: "¿Qué es la jota de la que habla Jesús en Mateo 5:18?", reverso: "La yod, la letra más pequeña del alfabeto hebreo.", apoyo: "La jota es la yod, la letra más pequeña del alfabeto hebreo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué idiomas estaba escrito el título de Jesús sobre la cruz?", reverso: "En hebreo, en griego y en latín.", apoyo: "Sobre la cruz, el título de Jesús «estaba escrito en hebreo, en griego y en latín»" },
              { frente: "¿Qué fue la Septuaginta?", reverso: "La traducción del Antiguo Testamento al griego, hecha por los judíos en Alejandría.", apoyo: "Siglos antes de Cristo, en Alejandría, los judíos tradujeron el Antiguo Testamento al griego: es la Septuaginta" },
              { frente: "¿Quiénes añadieron al texto hebreo los signos de las vocales?", reverso: "Los masoretas, escribas judíos de la Edad Media.", apoyo: "Los masoretas, escribas judíos de la Edad Media, añadieron al texto hebreo los signos de las vocales" },
              { frente: "¿Cuántos manuscritos griegos del Nuevo Testamento se conservan?", reverso: "Más de cinco mil.", apoyo: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos" },
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
            consigna: "¿En qué idioma está cada texto: hebreo, arameo o griego? Lleva cada frase a su grupo.",
            grupos: ["Hebreo", "Arameo", "Griego"],
            frases: [
              { texto: "Casi todo el Antiguo Testamento", grupo: 0 },
              { texto: "El texto al que los masoretas añadieron las vocales", grupo: 0, explica: "Los masoretas añadieron al texto hebreo los signos de las vocales." },
              { texto: "Daniel, desde 2:4 hasta el final del capítulo 7", grupo: 1 },
              { texto: "Esdras 4:8 a 6:18 y 7:12-26", grupo: 1 },
              { texto: "Un solo versículo de Jeremías, el 10:11", grupo: 1 },
              { texto: "Todo el Nuevo Testamento", grupo: 2 },
              { texto: "La Septuaginta, hecha en Alejandría", grupo: 2, explica: "La Septuaginta es el Antiguo Testamento traducido al griego." },
              { texto: "Los más de cinco mil manuscritos del Nuevo Testamento", grupo: 2, explica: "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos." },
            ],
            apoyo: "Arameo, un idioma hermano del hebreo: algunas partes de Esdras (4:8 a 6:18 y 7:12-26), de Daniel (2:4 a 7:28) y un versículo de Jeremías (10:11)",
            ref: "Daniel 2:4",
            explica: "Casi todo el Antiguo Testamento está en hebreo; algunas partes de Esdras y de Daniel y un versículo de Jeremías están en arameo; y el Nuevo Testamento, la Septuaginta y sus manuscritos están en griego.",
          },
          {
            consigna: "¿Se dice del Antiguo Testamento o del Nuevo Testamento? Lleva cada frase a su grupo.",
            grupos: ["Antiguo Testamento", "Nuevo Testamento"],
            frases: [
              { texto: "Casi todo se escribió en hebreo", grupo: 0 },
              { texto: "Tiene algunas partes en arameo", grupo: 0 },
              { texto: "La Septuaginta lo tradujo al griego", grupo: 0 },
              { texto: "Los masoretas le añadieron los signos de las vocales", grupo: 0 },
              { texto: "Se escribió en el koiné, el griego común", grupo: 1 },
              { texto: "Sus autores citan muchas veces la Septuaginta", grupo: 1 },
              { texto: "Se conservan más de cinco mil manuscritos griegos", grupo: 1 },
            ],
            apoyo: "El Antiguo Testamento se escribió en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego koiné, el griego común de su tiempo",
            explica: "El Antiguo Testamento se escribió en hebreo, con algunas partes en arameo, y la Septuaginta lo tradujo al griego. El Nuevo Testamento se escribió en griego koiné, y sus autores citan muchas veces la Septuaginta.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En Daniel 2:4 el mismo texto marca el cambio de idioma. ¿En qué lengua hablaron los caldeos al rey? Toca las palabras que lo dicen.",
            texto: "Entonces hablaron los caldeos al rey en [[lengua aramea]]",
            apoyo: "El mismo texto marca el cambio: «Entonces hablaron los caldeos al rey en lengua aramea»",
            ref: "Daniel 2:4",
            explica: "Los caldeos hablaron al rey «en lengua aramea»: desde ese versículo hasta el final del capítulo 7, el libro de Daniel está escrito en arameo.",
          },
          {
            consigna: "Sobre la cruz estaba el título de Jesús. ¿En qué idiomas estaba escrito? Toca las palabras que lo dicen.",
            texto: "estaba escrito en [[hebreo]], en [[griego]] y en [[latín]]",
            apoyo: "Esos idiomas muestran el mundo en que se escribió la Biblia",
            ref: "Juan 19:20",
            explica: "El título de Jesús «estaba escrito en hebreo, en griego y en latín». Esos idiomas muestran el mundo en que se escribió la Biblia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es el griego koiné.",
            texto: "El koiné era el griego [[común]] que se hablaba en todo el Mediterráneo después de las conquistas de Alejandro Magno, y en él se [[escribió]] el Nuevo Testamento.",
            distractores: ["clásico", "tradujo"],
            errores: {
              "clásico": "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común.",
              tradujo: "El Nuevo Testamento se escribió en koiné; lo que se tradujo al griego fue el Antiguo Testamento, en la Septuaginta.",
            },
            apoyo: "sino en el koiné, el griego común que se hablaba en todo el Mediterráneo después de las conquistas de Alejandro Magno",
            explica: "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común que se hablaba en todo el Mediterráneo.",
          },
          {
            consigna: "Completa qué fue la Septuaginta.",
            texto: "Siglos [[antes]] de Cristo, en Alejandría, los judíos tradujeron el Antiguo Testamento al [[griego]]: es la Septuaginta, que los autores del Nuevo Testamento [[citan]] muchas veces.",
            distractores: ["después", "latín", "rechazan"],
            errores: {
              "después": "La Septuaginta se hizo siglos antes de Cristo, en Alejandría.",
              "latín": "Los judíos de Alejandría tradujeron el Antiguo Testamento al griego.",
              rechazan: "Los autores del Nuevo Testamento citan la Septuaginta muchas veces.",
            },
            apoyo: "Siglos antes de Cristo, en Alejandría, los judíos tradujeron el Antiguo Testamento al griego: es la Septuaginta, y los autores del Nuevo Testamento la citan muchas veces",
            explica: "La Septuaginta es la traducción del Antiguo Testamento al griego que hicieron los judíos en Alejandría, siglos antes de Cristo, y los autores del Nuevo Testamento la citan muchas veces.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "¿Cómo llegó el texto bíblico hasta tu Biblia? Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Los judíos traducen en Alejandría el Antiguo Testamento al griego", fecha: "Siglos antes de Cristo" },
              { texto: "Jesús habla de la jota y la tilde de la ley", fecha: "Mateo 5:18" },
              { texto: "El códice de Leningrado, la Biblia hebrea completa más antigua que se conserva", fecha: "Año 1008" },
              { texto: "Casiodoro de Reina hace la traducción de donde viene la Reina-Valera", fecha: "1569" },
              { texto: "Cipriano de Valera revisa la traducción de Casiodoro de Reina", fecha: "1602" },
            ],
            apoyo: "La Reina-Valera viene de la traducción de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602)",
            explica: "Siglos antes de Cristo nace la Septuaginta; después, Jesús habla de la jota y la tilde de la ley; el códice de Leningrado es del año 1008, y la Reina-Valera viene de la traducción de Reina (1569), revisada por Valera (1602).",
          },
          {
            consigna: "Ordena en el tiempo cómo llegó la Biblia hasta nuestras traducciones, del primer hecho al último.",
            eventos: [
              { texto: "Nace en Alejandría la Septuaginta, el Antiguo Testamento en griego", fecha: "Siglos antes de Cristo" },
              { texto: "Los autores del Nuevo Testamento citan muchas veces la Septuaginta", fecha: "En el Nuevo Testamento" },
              { texto: "El manuscrito completo más antiguo de la Biblia hebrea que se conserva", fecha: "1008: códice de Leningrado" },
              { texto: "Casiodoro de Reina hace su traducción de la Biblia", fecha: "1569" },
              { texto: "Cipriano de Valera revisa la traducción de Casiodoro de Reina", fecha: "1602" },
            ],
            apoyo: "La Biblia se copió a mano durante siglos y con gran cuidado",
            explica: "Primero la Septuaginta, siglos antes de Cristo, que después citan los autores del Nuevo Testamento; el códice de Leningrado es del año 1008; Casiodoro de Reina hizo su traducción en 1569 y Cipriano de Valera la revisó en 1602.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un alumno de la academia te dice: Mi Biblia es solo una traducción. Seguro que en tantos siglos el texto cambió mucho.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que se copió con gran cuidado, y las buenas traducciones son fieles.", bien: true, explica: "La Biblia se copió a mano durante siglos y con gran cuidado, y las buenas traducciones son fieles." },
              { texto: "Que tiene razón: solo quien lee hebreo y griego tiene la Biblia de verdad.", explica: "No hace falta ser experto para estudiar bien la Biblia: las buenas traducciones son fieles." },
              { texto: "Que de cómo se copió no se sabe nada, así que hay que creer sin preguntar.", explica: "La Biblia se copió con gran cuidado, y del Nuevo Testamento se conservan más de cinco mil manuscritos griegos." },
              { texto: "Que conviene que desprecie su traducción y aprenda primero los originales.", explica: "Conocer un poco de los idiomas originales sirve para ver más detalles, no para despreciar tu Biblia." },
            ],
            apoyo: "La Biblia se copió a mano durante siglos y con gran cuidado",
            explica: "La Biblia se copió a mano durante siglos y con gran cuidado; del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, y las buenas traducciones son fieles.",
          },
          {
            caso: "Una maestra de escuela dominical te dice: Quiero contarles a los niños de dónde viene nuestra Reina-Valera. ¿Qué les digo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que viene de Casiodoro de Reina, revisada por Cipriano de Valera.", bien: true, explica: "La Reina-Valera viene de la traducción de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602)." },
              { texto: "Que la tradujo Cipriano de Valera en 1569 y que nadie la revisó después.", explica: "La tradujo Casiodoro de Reina en 1569, y Cipriano de Valera la revisó en 1602." },
              { texto: "Que es una copia del códice de Leningrado que hicieron los masoretas.", explica: "El códice de Leningrado es el manuscrito completo más antiguo de la Biblia hebrea; la Reina-Valera viene de la traducción de Casiodoro de Reina." },
              { texto: "Que la escribieron en español los mismos autores del Nuevo Testamento.", explica: "El Nuevo Testamento se escribió en griego koiné; la Reina-Valera es una traducción." },
            ],
            apoyo: "La Reina-Valera viene de la traducción de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602)",
            explica: "La Biblia se copió con gran cuidado hasta llegar a traducciones como la Reina-Valera, que viene de la traducción de Casiodoro de Reina, revisada por Cipriano de Valera.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La Septuaginta tradujo el Antiguo Testamento al griego antes de Cristo",
            clave: {
              id: "pr-n5-idiomas-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el griego koiné y qué fue la Septuaginta?",
              ideas: [
                { id: "koine", peso: 50, texto: "El koiné es el griego común que se hablaba en todo el Mediterráneo; en él se escribió el Nuevo Testamento.", formas: ["griego comun", "comun", "todo el mediterraneo", "mediterraneo", "del pueblo", "de la gente", "cotidian*", "popular", "todos (hablaban|usaban)", "griego de todos", "(griego|lengua|idioma) (sencill*|normal)"] },
                { id: "septuaginta", peso: 50, texto: "La Septuaginta fue la traducción del Antiguo Testamento al griego, hecha en Alejandría siglos antes de Cristo.", formas: ["tradu* antiguo testamento", "antiguo testamento (al|en) griego", "tradu* al griego", "version griega"] },
              ],
              errores: [
                { id: "clasico", texto: "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común.", formas: ["koine (es|era|fue) griego clasico", "koine (es|era|fue) (el|un) griego clasico", "escribi* griego clasico", "escrit* griego clasico"], anula: "koine" },
                { id: "nuevo", texto: "La Septuaginta tradujo al griego el Antiguo Testamento, no el Nuevo.", formas: ["septuaginta tradu* nuevo testamento", "septuaginta (es|fue) (la|una) traduccion nuevo testamento"], anula: "septuaginta" },
              ],
              modelo: "El koiné es el griego común que se hablaba en todo el Mediterráneo, y en él se escribió el Nuevo Testamento. La Septuaginta fue la traducción del Antiguo Testamento al griego, hecha en Alejandría siglos antes de Cristo.",
            },
          },
          {
            apoyo: "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné",
            clave: {
              id: "pr-n5-idiomas-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano cree que el Nuevo Testamento se escribió en el griego de los filósofos. ¿Qué le explicas sobre el koiné y la Septuaginta?",
              ideas: [
                { id: "koine", peso: 50, texto: "Que no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común de su tiempo.", formas: ["griego comun", "comun", "todo el mediterraneo", "mediterraneo", "del pueblo", "de la gente", "cotidian*", "popular", "todos (hablaban|usaban)", "griego de todos", "(griego|lengua|idioma) (sencill*|normal)"] },
                { id: "septuaginta", peso: 50, texto: "Que sus autores citan muchas veces la Septuaginta, el Antiguo Testamento traducido al griego antes de Cristo.", formas: ["cit* septuaginta", "septuaginta (que|la) cit*", "cit* muchas veces", "tradu* antiguo testamento", "antiguo testamento (al|en) griego", "tradu* al griego"] },
              ],
              errores: [
                { id: "clasico", texto: "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné.", formas: ["escribi* griego clasico", "escrit* griego clasico", "escribi* griego filosofos", "escrit* griego filosofos", "tiene razon"], anula: "koine" },
              ],
              modelo: "Le explico que no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común de su tiempo. Y que sus autores citan muchas veces la Septuaginta, la traducción del Antiguo Testamento al griego.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El hebreo y sus palabras clave
    "n5-idiomas-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas letras tiene el alfabeto hebreo, y de qué clase son?", reverso: "22 letras, todas consonantes.", apoyo: "Tiene 22 letras, todas consonantes" },
              { frente: "¿En qué dirección se escribe y se lee el hebreo?", reverso: "De derecha a izquierda.", apoyo: "Se escribe y se lee de derecha a izquierda" },
              { frente: "¿Qué son las vocales del texto hebreo, y quiénes las añadieron?", reverso: "Puntos y rayitas que los masoretas añadieron debajo, encima o dentro de las letras.", apoyo: "Las vocales son puntos y rayitas que los masoretas añadieron debajo, encima o dentro de las letras" },
              { frente: "Además de paz, ¿qué es shalom?", reverso: "Plenitud, bienestar y relaciones en orden con Dios y con los demás.", apoyo: "es plenitud, bienestar y relaciones en orden con Dios y con los demás" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué una Biblia hebrea empieza donde esperarías la última página?", reverso: "Porque el hebreo se lee de derecha a izquierda.", apoyo: "Si abres una Biblia hebrea, la primera página está donde esperarías encontrar la última" },
              { frente: "¿Cómo está ordenado el Salmo 119?", reverso: "En 22 estrofas de ocho versículos; en hebreo, los de cada estrofa empiezan con la misma letra.", apoyo: "El Salmo 119 está ordenado con esas 22 letras" },
              { frente: "¿Qué leían los judíos en lugar del nombre YHWH, y por qué?", reverso: "Adonai, Señor, por reverencia.", apoyo: "Por reverencia, los judíos dejaron de pronunciarlo y leían en su lugar Adonai, Señor" },
              { frente: "¿Qué imágenes concretas usa el hebreo para hablar de Dios?", reverso: "Dios es roca, escudo y pastor.", apoyo: "El hebreo prefiere las imágenes concretas: Dios es roca, escudo y pastor" },
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
            consigna: "Sobre el alfabeto hebreo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El alfabeto hebreo tiene 22 letras, todas consonantes.", verdad: true, explica: "Así es: tiene 22 letras, todas consonantes; las vocales las añadieron los masoretas.", apoyo: "Tiene 22 letras, todas consonantes" },
              { texto: "El hebreo se escribe y se lee de izquierda a derecha, como el español.", verdad: false, explica: "El hebreo se escribe y se lee de derecha a izquierda.", apoyo: "Se escribe y se lee de derecha a izquierda" },
              { texto: "Las vocales del hebreo son puntos y rayitas que añadieron los masoretas.", verdad: true, explica: "Los masoretas las añadieron debajo, encima o dentro de las letras.", apoyo: "Las vocales son puntos y rayitas que los masoretas añadieron debajo, encima o dentro de las letras" },
            ],
          },
          {
            consigna: "Sobre las letras hebreas y el Salmo 119: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Salmo 119 tiene 22 estrofas, una por cada letra del alfabeto hebreo.", verdad: true, explica: "Está ordenado con las 22 letras: tiene 22 estrofas de ocho versículos.", apoyo: "El Salmo 119 está ordenado con esas 22 letras: tiene 22 estrofas de ocho versículos" },
              { texto: "Las vocales hebreas son letras grandes que van entre las consonantes.", verdad: false, explica: "Las vocales son puntos y rayitas que los masoretas añadieron debajo, encima o dentro de las letras.", apoyo: "Las vocales son puntos y rayitas" },
              { texto: "El alfabeto hebreo tiene cinco vocales y diecisiete consonantes.", verdad: false, explica: "El alfabeto hebreo tiene 22 letras, todas consonantes.", apoyo: "Tiene 22 letras, todas consonantes" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las cinco primeras letras del alfabeto hebreo, de la primera a la quinta.",
            pasos: ["Álef", "Bet", "Guímel", "Dálet", "He"],
            apoyo: "Las letras son álef, bet, guímel, dálet, he, vav, zayin, jet, tet, yod, kaf, lámed, mem, nun, sámej, ayin, pe, tsade, qof, resh, shin y tav",
            explica: "El alfabeto hebreo empieza con álef, bet, guímel, dálet y he. Muchas Biblias ponen sobre las estrofas del Salmo 119 los nombres de las letras, en ese orden.",
          },
          {
            consigna: "Ordena estas letras hebreas como van en el alfabeto, de la primera a la última.",
            pasos: ["Álef", "Guímel", "Yod", "Mem", "Tav"],
            apoyo: "Tiene 22 letras, todas consonantes",
            explica: "El alfabeto hebreo empieza con álef y termina con tav; en medio van, entre otras, guímel, yod y mem.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra hebrea con su sentido.",
            pares: [
              ["Shalom", "Plenitud, bienestar y relaciones en orden con Dios y con los demás"],
              ["Torá", "Instrucción: la enseñanza de Dios para su pueblo"],
              ["Rúaj", "Espíritu, y también viento y aliento"],
              ["Néfesh", "Alma, pero también vida, persona, el ser entero"],
              ["Elohim", "La palabra general para Dios"],
            ],
            apoyo: "Rúaj: espíritu, y también viento y aliento",
            explica: "Shalom es plenitud, bienestar y relaciones en orden; torá, la enseñanza de Dios para su pueblo; rúaj, espíritu, viento y aliento; néfesh, el ser entero; y Elohim, la palabra general para Dios.",
          },
          {
            consigna: "Une cada palabra con lo que dice de ella la lección.",
            pares: [
              ["YHWH", "El nombre propio de Dios, escrito con cuatro consonantes"],
              ["Adonai", "Señor: lo que los judíos leían en lugar del nombre"],
              ["Amén", "Viene de una raíz que significa firme, seguro, digno de confianza"],
              ["Shalom", "Se traduce paz, pero es mucho más que la ausencia de guerra"],
              ["Torá", "Se traduce ley, pero es la enseñanza de Dios"],
            ],
            apoyo: "Amén: viene de una raíz que significa firme, seguro, digno de confianza",
            explica: "YHWH es el nombre propio de Dios; en su lugar los judíos leían Adonai, Señor; amén viene de una raíz que significa firme; shalom es mucho más que la ausencia de guerra; y torá, la enseñanza de Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que dice la lección sobre el nombre de Dios.",
            texto: "El nombre YHWH se escribe con [[cuatro]] consonantes; los judíos leían en su lugar Adonai, [[Señor]], y la Reina-Valera lo traduce [[Jehová]].",
            distractores: ["siete", "Padre", "Dios"],
            errores: {
              siete: "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH.",
              Padre: "En lugar del nombre, los judíos leían Adonai, Señor.",
              Dios: "La Reina-Valera traduce el nombre YHWH como Jehová; Elohim es la palabra general para Dios.",
            },
            apoyo: "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH",
            ref: "Deuteronomio 6:4",
            explica: "El nombre propio de Dios, YHWH, tiene cuatro consonantes. Por reverencia, los judíos leían en su lugar Adonai, Señor, y la Reina-Valera lo traduce Jehová.",
          },
          {
            consigna: "Completa lo que significa shalom.",
            texto: "Shalom se traduce [[paz]], pero es mucho más que la ausencia de [[guerra]]: es [[plenitud]], bienestar y relaciones en orden con Dios y con los demás.",
            distractores: ["ley", "alegría", "tristeza"],
            errores: {
              ley: "Shalom se traduce paz; la que se traduce ley es la torá.",
              "alegría": "Shalom es mucho más que la ausencia de guerra.",
              tristeza: "Shalom es plenitud, bienestar y relaciones en orden con Dios y con los demás.",
            },
            apoyo: "Shalom se traduce paz, pero es mucho más que la ausencia de guerra",
            ref: "Números 6:24-26",
            explica: "Shalom se traduce paz, pero es mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La bendición de los sacerdotes termina así: «Jehová alce sobre ti su rostro, y ponga en ti paz»",
            ref: "Números 6:24-26",
            titulo: "La paz de la bendición",
            relato: [
              "Eres maestro de la clase de adultos, y este domingo vas a cerrar con la bendición de los sacerdotes: «Jehová alce sobre ti su rostro, y ponga en ti paz».",
              "Un alumno te pregunta: Cuando la bendición pide paz, ¿habla solo de que no haya guerra?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué palabra hebrea hay detrás de paz en esa bendición?",
                opciones: [
                  { texto: "Shalom, que se traduce paz.", bien: true, explica: "Shalom se traduce paz, y la bendición de los sacerdotes termina pidiendo esa paz." },
                  { texto: "Torá, que se traduce ley.", explica: "Torá se traduce ley; la palabra que se traduce paz es shalom." },
                  { texto: "Néfesh, que se traduce alma.", explica: "Néfesh es alma, vida, persona; la palabra que se traduce paz es shalom." },
                ],
                apoyo: "Shalom se traduce paz, pero es mucho más que la ausencia de guerra",
                explica: "Shalom se traduce paz, y la bendición de los sacerdotes termina así: «Jehová alce sobre ti su rostro, y ponga en ti paz».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al alumno sobre esa paz?",
                opciones: [
                  { texto: "Que es mucho más que no haber guerra: es plenitud y bienestar.", bien: true, explica: "Shalom es mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás." },
                  { texto: "Que sí: la bendición pide solamente que no haya guerra en el país.", explica: "Shalom se traduce paz, pero es mucho más que la ausencia de guerra." },
                  { texto: "Que es solo una palabra bonita, sin un sentido especial.", explica: "Shalom tiene un sentido rico: plenitud, bienestar y relaciones en orden con Dios y con los demás." },
                ],
                apoyo: "es plenitud, bienestar y relaciones en orden con Dios y con los demás",
                explica: "Shalom se traduce paz, pero es mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás.",
              },
              {
                tipo: "explica",
                apoyo: "Cada palabra de Dios tiene una riqueza que vale la pena descubrir",
                clave: {
                  id: "pr-n5-idiomas-2-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases cómo explicarás a la clase la paz que pide esa bendición.",
                  ideas: [
                    { id: "mas", peso: 40, texto: "Que shalom se traduce paz, pero es mucho más que la ausencia de guerra.", formas: ["mucho mas", "mas que", "no solo", "no es solo", "va mas alla", "mas alla"] },
                    { id: "plenitud", peso: 60, texto: "Que es plenitud, bienestar y relaciones en orden con Dios y con los demás.", formas: ["plenitud", "bienestar", "relaciones en orden", "en orden con dios", "en orden con los demas", "relacion* (con|en) (dios|orden)"] },
                  ],
                  errores: [
                    { id: "guerra", texto: "Shalom es mucho más que la ausencia de guerra.", formas: ["(es|significa) solo ausencia guerra", "(es|significa) solamente ausencia guerra", "solo que no haya guerra", "(es|significa) no haber guerra"], anula: "mas" },
                  ],
                  modelo: "Les explicaré que shalom se traduce paz, pero es mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás.",
                },
              },
            ],
          },
          {
            apoyo: "Elohim, en cambio, es la palabra general para Dios",
            ref: "Deuteronomio 6:4",
            titulo: "Jehová y Elohim",
            relato: [
              "Eres líder de un grupo de nuevos creyentes. Esta semana leen juntos Deuteronomio 6:4: «Oye, Israel: Jehová nuestro Dios, Jehová uno es».",
              "Una hermana del grupo te pregunta: ¿Jehová y Elohim son lo mismo?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hay en hebreo detrás de Jehová?",
                opciones: [
                  { texto: "El nombre propio de Dios, escrito con cuatro consonantes: YHWH.", bien: true, explica: "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH, y la Reina-Valera lo traduce Jehová." },
                  { texto: "Elohim, la palabra general que el hebreo usa para decir Dios.", explica: "Elohim es la palabra general para Dios; Jehová traduce el nombre propio, YHWH." },
                  { texto: "Adonai, la palabra que los judíos escribían siempre en el texto.", explica: "Adonai, Señor, es lo que los judíos leían en lugar del nombre; el nombre que se escribe es YHWH." },
                ],
                apoyo: "La Reina-Valera lo traduce Jehová",
                explica: "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH, y la Reina-Valera lo traduce Jehová.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Por qué los judíos dejaron de pronunciar ese nombre?",
                opciones: [
                  { texto: "Por reverencia, y en su lugar leían Adonai, Señor.", bien: true, explica: "Por reverencia, los judíos dejaron de pronunciarlo y leían en su lugar Adonai, Señor." },
                  { texto: "Porque se les olvidó cómo sonaban sus cuatro letras.", explica: "Lo dejaron de pronunciar por reverencia, y en su lugar leían Adonai, Señor." },
                  { texto: "Porque preferían decir siempre Elohim, la palabra general.", explica: "Lo dejaron de pronunciar por reverencia y leían Adonai, Señor; Elohim es la palabra general para Dios." },
                ],
                apoyo: "Por reverencia, los judíos dejaron de pronunciarlo y leían en su lugar Adonai, Señor",
                explica: "Por reverencia, los judíos dejaron de pronunciar el nombre YHWH y leían en su lugar Adonai, Señor.",
              },
              {
                tipo: "explica",
                apoyo: "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH",
                clave: {
                  id: "pr-n5-idiomas-2-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué le respondes a la hermana que pregunta si Jehová y Elohim son lo mismo?",
                  ideas: [
                    { id: "nombre", peso: 50, texto: "Jehová traduce el nombre propio de Dios, YHWH, que se escribe con cuatro consonantes.", formas: ["nombre propio", "yhwh", "cuatro consonantes", "su nombre", "nombre de dios"] },
                    { id: "elohim", peso: 50, texto: "Elohim es la palabra general para Dios.", formas: ["palabra general", "(termino|nombre|forma|manera) general", "general para (dios|decir)", "en general"] },
                  ],
                  errores: [
                    { id: "iguales", texto: "No son lo mismo: YHWH es el nombre propio de Dios, y Elohim, la palabra general para Dios.", formas: ["(son|es) lo mismo", "(son|es) la misma (palabra|cosa)", "significan lo mismo", "son iguales"], anula: "nombre" },
                    { id: "elohim-nombre", texto: "Elohim es la palabra general para Dios; el nombre propio es YHWH.", formas: ["elohim (es|era) nombre propio"], anula: "elohim" },
                    { id: "jehova-general", texto: "Jehová traduce YHWH, el nombre propio de Dios; la palabra general es Elohim.", formas: ["(jehova|yhwh) (es|era) (una|la) palabra general"], anula: "nombre" },
                  ],
                  modelo: "No son lo mismo. Jehová traduce YHWH, el nombre propio de Dios, que en hebreo se escribe con cuatro consonantes. Elohim, en cambio, es la palabra general para Dios.",
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
            apoyo: "Palabras como shalom, que es plenitud y no solo paz, el nombre YHWH, que la Reina-Valera traduce Jehová, Elohim, torá, rúaj y néfesh tienen un sentido rico que ayuda a leer mejor el Antiguo Testamento",
            clave: {
              id: "pr-n5-idiomas-2-a7-1",
              tipo: "corta",
              pregunta: "Explica con un ejemplo cómo conocer una palabra hebrea te ayuda a leer mejor el Antiguo Testamento.",
              ideas: [
                { id: "rico", peso: 40, texto: "Las palabras hebreas tienen un sentido rico, que va más allá de la traducción.", formas: ["sentido rico", "riqueza", "rico", "mucho mas", "mas que", "no solo", "no es solo", "mas profund*", "mas complet*", "mas amplio", "mas alla", "pero tambien", "tambien (significa|es|quiere)"] },
                { id: "ejemplo", peso: 60, texto: "Por ejemplo, shalom no es solo paz: es plenitud, bienestar y relaciones en orden; torá es la enseñanza de Dios; néfesh, el ser entero.", formas: ["plenitud", "bienestar", "relaciones en orden", "ensenanza de dios", "instruccion", "ser entero", "viento", "aliento", "palabra general", "nombre propio", "firme", "digno de confianza"] },
              ],
              modelo: "Las palabras hebreas tienen un sentido rico que ayuda a leer mejor el Antiguo Testamento. Por ejemplo, shalom no es solo paz ni la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás.",
            },
          },
          {
            apoyo: "El hebreo prefiere las imágenes concretas: Dios es roca, escudo y pastor",
            clave: {
              id: "pr-n5-idiomas-2-a7-2",
              tipo: "corta",
              pregunta: "Vas a leer con tu grupo un pasaje del Antiguo Testamento que llama a Dios roca y escudo. ¿A qué les pides que presten atención, y por qué?",
              ideas: [
                { id: "imagenes", peso: 50, texto: "A las imágenes concretas con que se habla de Dios: roca, escudo y pastor.", formas: ["imagen*", "figura*", "concret*"] },
                { id: "hebreo", peso: 50, texto: "Porque el hebreo prefiere las imágenes concretas.", formas: ["hebreo prefiere", "prefiere imagen*", "hebreo (usa|ama|tiene|es) imagen*", "hebreo (usa|ama|habla) (con|en) imagen*", "idioma de imagenes", "lengua de imagenes"] },
              ],
              modelo: "Les pido que presten atención a las imágenes concretas, como Dios es roca, escudo y pastor. Lo hago porque el hebreo prefiere las imágenes concretas, y al leer el Antiguo Testamento conviene notar esas imágenes.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El griego y sus palabras clave
    "n5-idiomas-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas letras tiene el alfabeto griego, y cómo se lee?", reverso: "24 letras, y se lee de izquierda a derecha, como el español.", apoyo: "Tiene 24 letras y se lee de izquierda a derecha, como el español" },
              { frente: "¿Por qué muchas letras griegas se parecen a las nuestras?", reverso: "Porque nuestro alfabeto viene en parte del griego.", apoyo: "Muchas letras se parecen a las nuestras, porque nuestro alfabeto viene en parte del griego" },
              { frente: "¿Qué son la alfa y la omega en el alfabeto griego?", reverso: "La primera y la última letra.", apoyo: "la primera y la última letra del alfabeto griego" },
              { frente: "¿Qué palabra griega traduce Verbo en Juan 1:1?", reverso: "Lógos: la palabra, el mensaje, la razón.", apoyo: "Verbo traduce lógos: la palabra, el mensaje, la razón" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo se presenta el Señor en Apocalipsis 1:8?", reverso: "Como el Alfa y la Omega, principio y fin.", apoyo: "El Señor se presenta como el Alfa y la Omega" },
              { frente: "¿Qué clase de amor es ágape?", reverso: "El amor que se da por el bien del otro, como el de Dios.", apoyo: "Ágape: el amor que se da por el bien del otro, como el de Dios, que es amor" },
              { frente: "¿Qué era la ekklesía en las ciudades griegas?", reverso: "La asamblea de los ciudadanos convocados.", apoyo: "en las ciudades griegas era la asamblea de los ciudadanos convocados" },
              { frente: "Si una palabra tiene varios sentidos, ¿qué decide cuál usa el autor?", reverso: "El contexto de cada pasaje.", apoyo: "el contexto decide cuál usa el autor en cada pasaje" },
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
            consigna: "Ordena las cinco primeras letras del alfabeto griego, de la primera a la quinta.",
            pasos: ["Alfa", "Beta", "Gamma", "Delta", "Épsilon"],
            apoyo: "Las letras son alfa, beta, gamma, delta, épsilon, zeta, eta, theta, iota, kappa, lambda, mi, ni, xi, ómicron, pi, ro, sigma, tau, ípsilon, fi, ji, psi y omega",
            explica: "El alfabeto griego empieza con alfa, beta, gamma, delta y épsilon. Muchas letras se parecen a las nuestras, porque nuestro alfabeto viene en parte del griego.",
          },
          {
            consigna: "Ordena estas letras griegas como van en el alfabeto, de la primera a la última.",
            pasos: ["Alfa", "Gamma", "Kappa", "Sigma", "Omega"],
            apoyo: "El Señor se presenta como el Alfa y la Omega: la primera y la última letra del alfabeto griego",
            ref: "Apocalipsis 1:8",
            explica: "El alfabeto griego empieza con alfa y termina con omega; en medio van, entre otras, gamma, kappa y sigma.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el alfabeto griego: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El alfabeto griego tiene 24 letras.", verdad: true, explica: "Tiene 24 letras y se lee de izquierda a derecha, como el español.", apoyo: "Tiene 24 letras y se lee de izquierda a derecha, como el español" },
              { texto: "El griego se lee de derecha a izquierda.", verdad: false, explica: "El griego se lee de izquierda a derecha, como el español.", apoyo: "se lee de izquierda a derecha, como el español" },
              { texto: "Nuestro alfabeto viene en parte del griego.", verdad: true, explica: "Por eso muchas letras griegas se parecen a las nuestras.", apoyo: "Muchas letras se parecen a las nuestras, porque nuestro alfabeto viene en parte del griego" },
            ],
          },
          {
            consigna: "Sobre el Alfa y la Omega y las letras griegas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La alfa y la omega son las dos primeras letras del alfabeto griego.", verdad: false, explica: "La alfa y la omega son la primera y la última letra del alfabeto griego.", apoyo: "la primera y la última letra del alfabeto griego" },
              { texto: "El Señor es el principio y el fin de todo, como la primera y la última letra.", verdad: true, explica: "«Yo soy el Alfa y la Omega, principio y fin, dice el Señor».", apoyo: "Él es el principio y el fin de todo, como la primera y la última letra", ref: "Apocalipsis 1:8" },
              { texto: "Las letras griegas no se parecen en nada a las nuestras.", verdad: false, explica: "Muchas letras se parecen a las nuestras, porque nuestro alfabeto viene en parte del griego.", apoyo: "Muchas letras se parecen a las nuestras" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra griega con su sentido.",
            pares: [
              ["Lógos", "La palabra, el mensaje, la razón"],
              ["Ágape", "El amor que se da por el bien del otro"],
              ["Cháris", "Gracia, el favor que no merecemos"],
              ["Pístis", "Fe, que es confianza, y también fidelidad"],
            ],
            apoyo: "Palabras como lógos (la Palabra), ágape (el amor que se da), cháris (gracia), pístis (fe y fidelidad)",
            explica: "Lógos es la palabra, el mensaje, la razón; ágape, el amor que se da por el bien del otro; cháris, gracia, el favor que no merecemos; y pístis, fe, que es confianza y también fidelidad.",
          },
          {
            consigna: "Une cada palabra griega con lo que significa.",
            pares: [
              ["Euangélion", "Buena noticia, como la de una victoria"],
              ["Ekklesía", "La asamblea de los ciudadanos convocados"],
              ["Metánoia", "Un cambio de mente que lleva a un cambio de vida"],
              ["Koinonía", "Tener algo en común y compartirlo"],
            ],
            apoyo: "euangélion (buena noticia), ekklesía (asamblea), metánoia (cambio de mente) y koinonía (comunión) abren la riqueza del Nuevo Testamento",
            explica: "Euangélion es buena noticia; ekklesía era la asamblea de los ciudadanos convocados; metánoia, un cambio de mente que lleva a un cambio de vida; y koinonía, tener algo en común y compartirlo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que significa euangélion.",
            texto: "Euangélion es el evangelio, la buena [[noticia]]: se usaba para anunciar una [[victoria]] o el nacimiento de un [[rey]].",
            distractores: ["obra", "derrota", "esclavo"],
            errores: {
              obra: "Euangélion es evangelio, buena noticia.",
              derrota: "Euangélion se usaba para anunciar una victoria o el nacimiento de un rey.",
              esclavo: "Euangélion se usaba para anunciar el nacimiento de un rey.",
            },
            apoyo: "Euangélion: evangelio, buena noticia; se usaba para anunciar una victoria o el nacimiento de un rey",
            explica: "Euangélion es evangelio, buena noticia: se usaba para anunciar una victoria o el nacimiento de un rey.",
          },
          {
            consigna: "Completa el sentido de metánoia y de koinonía.",
            texto: "Metánoia es un cambio de [[mente]] que lleva a un cambio de [[vida]], y koinonía es tener algo en [[común]] y compartirlo.",
            distractores: ["cuerpo", "templo", "secreto"],
            errores: {
              cuerpo: "Metánoia, arrepentimiento, es un cambio de mente.",
              templo: "El cambio de mente de la metánoia lleva a un cambio de vida.",
              secreto: "Koinonía es comunión: tener algo en común y compartirlo.",
            },
            apoyo: "Metánoia: arrepentimiento, un cambio de mente que lleva a un cambio de vida",
            explica: "Metánoia, arrepentimiento, es un cambio de mente que lleva a un cambio de vida; koinonía, comunión, es tener algo en común y compartirlo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Juan presenta a Jesús como la Palabra de Dios hecha carne",
            ref: "Juan 1:1",
            situacion: "Eres maestro de la clase de nuevos creyentes, y este domingo vas a enseñar Juan 1:1: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».",
            escenas: [
              {
                id: "e1",
                narra: "Preparas la clase y te detienes en la palabra Verbo.",
                pregunta: "¿Qué vas a explicar de esa palabra?",
                opciones: [
                  { texto: "Que traduce lógos: la palabra, el mensaje, la razón.", valor: 2, explica: "Verbo traduce lógos: la palabra, el mensaje, la razón.", siguiente: "e2" },
                  { texto: "Que habla de los verbos de la gramática, como correr o leer.", valor: 0, explica: "Verbo traduce lógos: la palabra, el mensaje, la razón; no habla de la gramática.", siguiente: "e1b" },
                  { texto: "Que es un nombre de Jesús, sin explicar qué significa.", valor: 1, explica: "Habla de Jesús, pero explicar que Verbo traduce lógos, la palabra, ayuda a leer mejor el pasaje.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "En la clase, un alumno pregunta: Entonces, ¿Jesús es un verbo, como correr?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Verbo traduce lógos, la palabra, y que habla de Jesús.", valor: 2, explica: "Verbo traduce lógos, y Juan presenta a Jesús como la Palabra de Dios hecha carne.", siguiente: "e2" },
                  { texto: "Que sí: por eso Jesús siempre está en acción, como un verbo.", valor: 0, explica: "Verbo traduce lógos: la palabra, el mensaje, la razón.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llegas a la parte central de la clase.",
                pregunta: "¿A quién presenta Juan con la palabra Verbo?",
                opciones: [
                  { texto: "A Jesús, la Palabra de Dios hecha carne.", valor: 2, explica: "Juan presenta a Jesús como la Palabra de Dios hecha carne (Juan 1:14)." },
                  { texto: "A la Biblia, y no a una persona.", valor: 0, explica: "Juan presenta a Jesús como la Palabra de Dios hecha carne (Juan 1:14)." },
                  { texto: "A un maestro que enseñaba buenas palabras.", valor: 0, explica: "Juan no presenta a un maestro más: presenta a Jesús como la Palabra de Dios hecha carne." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, una alumna pregunta: Si lógos es palabra, mensaje y razón, ¿cuál de esos sentidos tiene en cada pasaje?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el contexto decide cuál usa el autor en cada pasaje.", valor: 2, explica: "Una palabra puede tener varios sentidos, y el contexto decide cuál usa el autor en cada pasaje." },
                  { texto: "Que en cada pasaje valen siempre todos los sentidos a la vez.", valor: 0, explica: "Una palabra puede tener varios sentidos, y el contexto decide cuál usa el autor en cada pasaje." },
                  { texto: "Que cada maestro escoge el sentido que más le guste.", valor: 0, explica: "No lo decide el gusto del maestro: el contexto decide cuál usa el autor en cada pasaje." },
                ],
              },
            ],
          },
          {
            apoyo: "Las palabras del Nuevo Testamento describen una vida nueva: gracia, fe, amor y comunión",
            situacion: "Eres líder de jóvenes y preparas una serie con palabras clave del Nuevo Testamento: evangelio, iglesia y arrepentimiento.",
            escenas: [
              {
                id: "e1",
                narra: "Empiezas con la palabra evangelio.",
                pregunta: "¿Qué les explicas?",
                opciones: [
                  { texto: "Que traduce euangélion: buena noticia, como la de una victoria.", valor: 2, explica: "Euangélion es evangelio, buena noticia; se usaba para anunciar una victoria o el nacimiento de un rey." },
                  { texto: "Que es una palabra solo de la iglesia, que no tenía otro uso.", valor: 0, explica: "Euangélion se usaba para anunciar una victoria o el nacimiento de un rey." },
                  { texto: "Que es una buena noticia, pero sin decir qué palabra griega traduce.", valor: 1, explica: "Es buena noticia; y decir que traduce euangélion, que anunciaba una victoria, ayuda a ver su riqueza." },
                ],
              },
              {
                id: "e2",
                narra: "Sigues con la palabra iglesia.",
                pregunta: "¿Qué les cuentas de ekklesía?",
                opciones: [
                  { texto: "Que era la asamblea de los ciudadanos convocados.", valor: 2, explica: "Ekklesía es iglesia; en las ciudades griegas era la asamblea de los ciudadanos convocados." },
                  { texto: "Que era el nombre de un templo griego muy famoso.", valor: 0, explica: "En las ciudades griegas, la ekklesía era la asamblea de los ciudadanos convocados." },
                  { texto: "Que significa un edificio con bancas y un púlpito.", valor: 0, explica: "Ekklesía no era un edificio: era la asamblea de los ciudadanos convocados." },
                ],
              },
              {
                id: "e3",
                narra: "Un joven dice: Arrepentirse es solo sentirse mal por lo que hice.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que metánoia es un cambio de mente que lleva a cambiar de vida.", valor: 2, explica: "Metánoia, arrepentimiento, es un cambio de mente que lleva a un cambio de vida." },
                  { texto: "Que tiene razón: basta con sentirse mal un tiempo por lo que hizo.", valor: 0, explica: "Metánoia es un cambio de mente que lleva a un cambio de vida." },
                  { texto: "Que es cambiar la conducta, sin cambiar la manera de pensar.", valor: 0, explica: "Metánoia empieza por un cambio de mente, y ese cambio lleva a un cambio de vida." },
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
            apoyo: "Cháris: gracia, el favor que no merecemos (Efesios 2:8)",
            ref: "Efesios 2:8",
            clave: {
              id: "pr-n5-idiomas-3-a7-1",
              tipo: "corta",
              pregunta: "Un alumno lee la palabra gracia en Efesios 2:8. ¿Qué palabra griega hay detrás, y qué le explicas que significa?",
              ideas: [
                { id: "charis", peso: 40, texto: "Detrás de gracia está la palabra griega cháris.", formas: ["charis", "jaris", "kharis", "xaris"] },
                { id: "favor", peso: 60, texto: "Cháris es el favor que no merecemos.", formas: ["favor", "no merec*", "sin merec*", "inmerecid*"] },
              ],
              errores: [
                { id: "merecido", texto: "Cháris es el favor que no merecemos: no es un premio.", formas: ["(favor|gracia|regalo) (que|porque) (merecemos|ganamos)", "(es|un) premio"], anula: "favor" },
              ],
              modelo: "Detrás de gracia está la palabra griega cháris. Le explico que la gracia es el favor que no merecemos: Dios nos da su favor aunque no lo merecemos.",
            },
          },
          {
            apoyo: "Koinonía: comunión, tener algo en común y compartirlo (Hechos 2:42)",
            ref: "Hechos 2:42",
            clave: {
              id: "pr-n5-idiomas-3-a7-2",
              tipo: "corta",
              pregunta: "Tu grupo lee la palabra comunión en Hechos 2:42. ¿Qué palabra griega hay detrás, y cómo les explicas lo que significa?",
              ideas: [
                { id: "koinonia", peso: 40, texto: "Detrás de comunión está la palabra griega koinonía.", formas: ["koinonia", "coinonia", "kinonia"] },
                { id: "comun", peso: 60, texto: "Koinonía es tener algo en común y compartirlo.", formas: ["en comun", "compart*", "algo en comun", "tener en comun"] },
              ],
              modelo: "Detrás de comunión está la palabra griega koinonía. Les explico que koinonía es tener algo en común y compartirlo, y así se entiende mejor la comunión de Hechos 2:42.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Las herramientas del estudio
    "n5-idiomas-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué publicó James Strong en 1890?", reverso: "Una concordancia exhaustiva que da un número a cada palabra hebrea y griega de la Biblia.", apoyo: "James Strong publicó en 1890 una concordancia exhaustiva que da un número a cada palabra hebrea y griega de la Biblia" },
              { frente: "¿Qué número tiene lógos en el griego de la concordancia de Strong?", reverso: "El 3056.", apoyo: "ágape es el número 26 del griego y lógos el 3056" },
              { frente: "¿Qué es un interlineal?", reverso: "El texto hebreo o griego con la traducción palabra por palabra debajo.", apoyo: "El interlineal: el texto hebreo o griego con la traducción palabra por palabra debajo" },
              { frente: "¿Qué hacían cada día los de Berea?", reverso: "Escudriñaban las Escrituras para ver si lo que oían era así.", apoyo: "Los de Berea recibieron la palabra con toda solicitud, «escudriñando cada día las Escrituras para ver si estas cosas eran así»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Sobre qué traducción está hecha la Nueva concordancia Strong exhaustiva?", reverso: "Sobre la Reina-Valera 1960.", apoyo: "La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960" },
              { frente: "¿Qué explica un diccionario expositivo, como el de W. E. Vine?", reverso: "Las palabras originales que hay detrás de las palabras en español.", apoyo: "El diccionario expositivo: explica las palabras originales que hay detrás de las palabras en español, como el de W. E. Vine" },
              { frente: "¿Para quién es el léxico?", reverso: "Para quien ya conoce la gramática de la lengua original.", apoyo: "El léxico: el diccionario de la lengua original, para quien ya conoce la gramática" },
              { frente: "¿Qué no reemplazan las herramientas de estudio?", reverso: "Ni la lectura atenta del contexto ni la guía del Espíritu Santo.", apoyo: "Las herramientas ayudan, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo" },
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
            consigna: "Completa qué hace la concordancia de Strong.",
            texto: "Strong publicó en 1890 una concordancia que da un [[número]] a cada palabra hebrea y griega de la Biblia; con él se encuentran su [[sentido]] y los [[lugares]] donde aparece.",
            distractores: ["nombre", "precio", "idiomas"],
            errores: {
              nombre: "La concordancia de Strong da un número a cada palabra hebrea y griega de la Biblia.",
              precio: "Con el número de Strong se encuentra el sentido de la palabra.",
              idiomas: "Con el número se encuentran todos los lugares donde aparece la palabra.",
            },
            apoyo: "James Strong publicó en 1890 una concordancia exhaustiva que da un número a cada palabra hebrea y griega de la Biblia",
            explica: "La concordancia de Strong da un número a cada palabra hebrea y griega de la Biblia, y con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece.",
          },
          {
            consigna: "Completa los ejemplos de números de Strong.",
            texto: "En la concordancia de Strong, ágape es el número 26 del [[griego]] y jésed es el 2617 del [[hebreo]]; con el número se encuentra la palabra [[original]].",
            distractores: ["latín", "español", "moderna"],
            errores: {
              "latín": "Ágape es el número 26 del griego.",
              "español": "Jésed es el número 2617 del hebreo.",
              moderna: "Con el número de Strong se encuentra la palabra original que hay detrás del versículo.",
            },
            apoyo: "Por ejemplo, ágape es el número 26 del griego y lógos el 3056; jésed es el 2617 del hebreo y shalom el 7965",
            explica: "Ágape es el número 26 del griego y jésed el 2617 del hebreo: con el número de Strong se encuentran la palabra original, su sentido y los lugares donde aparece.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada herramienta con lo que hace.",
            pares: [
              ["El interlineal", "Pone la traducción palabra por palabra debajo del texto original"],
              ["El diccionario expositivo", "Explica las palabras originales detrás de las palabras en español"],
              ["El léxico", "Es el diccionario de la lengua original, para quien sabe gramática"],
              ["La concordancia de Strong", "Da un número a cada palabra hebrea y griega"],
            ],
            apoyo: "El interlineal muestra el texto original palabra por palabra, el diccionario expositivo explica las palabras de fondo y el léxico sirve a quien conoce la gramática",
            explica: "El interlineal pone la traducción palabra por palabra debajo del texto; el diccionario expositivo explica las palabras de fondo; el léxico sirve a quien conoce la gramática; y la Strong da un número a cada palabra.",
          },
          {
            consigna: "Une cada herramienta con lo que dice de ella la lección.",
            pares: [
              ["Interlineal", "Muestra el texto original palabra por palabra"],
              ["Diccionario expositivo", "Explica las palabras de fondo"],
              ["Léxico", "Sirve a quien conoce la gramática"],
              ["Número de Strong", "Lleva al sentido y a los lugares donde aparece la palabra"],
              ["Programas digitales", "Unen las herramientas con los números de Strong"],
            ],
            apoyo: "Las Biblias de estudio y los programas digitales, que unen todo esto con los números de Strong",
            explica: "El interlineal muestra el texto original palabra por palabra; el diccionario expositivo explica las palabras de fondo; el léxico sirve a quien conoce la gramática; el número de Strong lleva al sentido y a los lugares; y los programas digitales lo unen todo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece",
            ref: "Hechos 17:11",
            titulo: "El número del amor",
            relato: [
              "Eres maestro de la academia y preparas una clase sobre el amor. Quieres saber qué palabra griega hay detrás de la palabra amor en un versículo del Nuevo Testamento.",
              "No lees griego, pero en la biblioteca de la iglesia hay varias herramientas de estudio.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces para encontrar la palabra original sin saber griego?",
                opciones: [
                  { texto: "Busco amor en la concordancia de Strong y miro su número.", bien: true, explica: "La concordancia de Strong da un número a cada palabra hebrea y griega: no necesitas leer griego." },
                  { texto: "Busco en internet cualquier explicación sobre la palabra amor.", explica: "En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento." },
                  { texto: "Compro un léxico, aunque todavía no conozco nada de gramática.", explica: "El léxico es el diccionario de la lengua original, para quien ya conoce la gramática." },
                ],
                apoyo: "No necesitas leer griego para descubrir qué palabra original hay detrás de un versículo",
                explica: "Basta con saber usar algunas herramientas: la concordancia de Strong da un número a cada palabra hebrea y griega de la Biblia.",
              },
              {
                tipo: "situacion",
                pregunta: "La concordancia te lleva a ágape. ¿Qué número tiene en el griego?",
                opciones: [
                  { texto: "El 26.", bien: true, explica: "En la concordancia de Strong, ágape es el número 26 del griego." },
                  { texto: "El 3056.", explica: "El 3056 es lógos; ágape es el número 26 del griego." },
                  { texto: "El 2617.", explica: "El 2617 es jésed, del hebreo; ágape es el número 26 del griego." },
                ],
                apoyo: "Por ejemplo, ágape es el número 26 del griego y lógos el 3056",
                explica: "En la concordancia de Strong, ágape es el número 26 del griego y lógos el 3056.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué encuentras con ese número?",
                opciones: [
                  { texto: "El sentido de la palabra y todos los lugares donde aparece.", bien: true, explica: "Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece." },
                  { texto: "Solo cómo se pronuncia esa palabra en el griego de aquel tiempo.", explica: "Con el número de Strong se encuentran el sentido de la palabra y todos los lugares donde aparece." },
                  { texto: "La opinión que tenía James Strong sobre cada versículo.", explica: "La concordancia da un número a cada palabra; con él se encuentran su sentido y los lugares donde aparece." },
                ],
                apoyo: "Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece",
                explica: "Con el número de Strong se encuentran el sentido de la palabra y todos los lugares donde aparece.",
              },
              {
                tipo: "explica",
                apoyo: "La concordancia de Strong da un número a cada palabra hebrea y griega",
                clave: {
                  id: "pr-n5-idiomas-4-a4-1",
                  tipo: "corta",
                  pregunta: "Explica a tus alumnos, en dos o tres frases, cómo encontraste la palabra original con la Strong.",
                  ideas: [
                    { id: "numero", peso: 50, texto: "Busqué la palabra en la concordancia de Strong, que da un número a cada palabra hebrea y griega: ágape es el 26.", formas: ["numero", "26", "veintiseis", "un numero a cada"] },
                    { id: "sentido", peso: 50, texto: "Con ese número encontré el sentido de la palabra y todos los lugares donde aparece.", formas: ["sentido", "su significado", "el significado", "lo que significa", "lugares donde aparece", "donde (aparece|sale|esta)", "todos los lugares", "otros (lugares|versiculos|pasajes)"] },
                  ],
                  errores: [
                    { id: "internet", texto: "En internet abundan explicaciones sin fundamento: la palabra original se encuentra con la concordancia de Strong.", formas: ["en internet", "una pagina"], anula: "sentido" },
                  ],
                  modelo: "Busqué la palabra amor en la concordancia de Strong, que da un número a cada palabra hebrea y griega: ágape es el número 26. Con ese número encontré el sentido de la palabra y todos los lugares donde aparece.",
                },
              },
            ],
          },
          {
            apoyo: "La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960, y sus diccionarios del hebreo y del griego van por separado",
            ref: "2 Timoteo 2:15",
            titulo: "Los lugares de shalom",
            relato: [
              "Eres pastor y vas a predicar sobre shalom. Quieres encontrar todos los lugares donde aparece esa palabra hebrea.",
              "En la oficina de la iglesia está la Nueva concordancia Strong exhaustiva, en español, y la abres.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Sobre qué traducción está hecha esa concordancia en español?",
                opciones: [
                  { texto: "Sobre la Reina-Valera 1960.", bien: true, explica: "La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960." },
                  { texto: "Sobre el interlineal de Lacueva.", explica: "El de Lacueva es un Nuevo Testamento interlineal; la Strong en español está hecha sobre la Reina-Valera 1960." },
                  { texto: "Sobre el diccionario de Vine.", explica: "El de Vine es un diccionario expositivo; la Strong en español está hecha sobre la Reina-Valera 1960." },
                ],
                apoyo: "La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960",
                explica: "La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960.",
              },
              {
                tipo: "situacion",
                pregunta: "¿En qué diccionario de la Strong buscas el número de shalom?",
                opciones: [
                  { texto: "En el del hebreo: los dos diccionarios van por separado.", bien: true, explica: "Sus diccionarios del hebreo y del griego van por separado, y shalom es una palabra hebrea." },
                  { texto: "En el del griego, porque los dos diccionarios van juntos.", explica: "Los diccionarios del hebreo y del griego van por separado, y shalom es del hebreo." },
                  { texto: "En cualquiera, porque el número es el mismo en los dos.", explica: "Los diccionarios van por separado: shalom es el 7965 del hebreo." },
                ],
                apoyo: "sus diccionarios del hebreo y del griego van por separado",
                explica: "En la Strong en español, los diccionarios del hebreo y del griego van por separado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué número tiene shalom en el hebreo?",
                opciones: [
                  { texto: "El 7965.", bien: true, explica: "En la concordancia de Strong, shalom es el 7965 del hebreo." },
                  { texto: "El 2617.", explica: "El 2617 es jésed; shalom es el 7965 del hebreo." },
                  { texto: "El 3056.", explica: "El 3056 es lógos, del griego; shalom es el 7965 del hebreo." },
                ],
                apoyo: "jésed es el 2617 del hebreo y shalom el 7965",
                explica: "Jésed es el 2617 del hebreo y shalom el 7965.",
              },
              {
                tipo: "explica",
                apoyo: "Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece",
                clave: {
                  id: "pr-n5-idiomas-4-a4-2",
                  tipo: "corta",
                  pregunta: "¿Para qué te sirve el número de shalom en la concordancia, y cuál es ese número?",
                  ideas: [
                    { id: "numero", peso: 40, texto: "Shalom es el número 7965 del hebreo.", formas: ["7965", "siete mil novecientos"] },
                    { id: "sirve", peso: 60, texto: "Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece.", formas: ["sentido", "su significado", "el significado", "lo que significa", "lugares", "donde aparece", "donde (sale|esta)", "versiculos", "pasajes", "citas"] },
                  ],
                  modelo: "Shalom es el número 7965 del diccionario del hebreo. Con ese número encuentro el sentido de la palabra y todos los lugares donde aparece en la Biblia, para preparar mi predicación.",
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
            consigna: "¿Es una fuente confiable para el estudio o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Fuente confiable", "Fuente poco confiable"],
            frases: [
              { texto: "Una obra reconocida, como el diccionario de Vine", grupo: 0 },
              { texto: "Una fuente que dice de dónde saca sus datos", grupo: 0 },
              { texto: "La Nueva concordancia Strong exhaustiva", grupo: 0 },
              { texto: "Una explicación de internet sin ningún fundamento", grupo: 1 },
              { texto: "Una fuente que no dice de dónde saca sus datos", grupo: 1 },
              { texto: "Un mensaje sobre el griego que nadie sabe quién escribió", grupo: 1 },
            ],
            apoyo: "Prefiere obras reconocidas y fuentes que digan de dónde sacan sus datos",
            explica: "Conviene preferir obras reconocidas y fuentes que digan de dónde sacan sus datos: en internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.",
          },
          {
            consigna: "¿Así se escoge bien una herramienta de estudio o no? Lleva cada frase a su grupo.",
            grupos: ["Así se escoge bien", "Así no se escoge"],
            frases: [
              { texto: "Preferir una obra reconocida", grupo: 0 },
              { texto: "Ver si la fuente dice de dónde saca sus datos", grupo: 0 },
              { texto: "Escoger una impresa o una digital, si es confiable", grupo: 0 },
              { texto: "Creer lo que dice cualquier página de internet", grupo: 1 },
              { texto: "Quedarse con la explicación más llamativa, aunque no tenga fundamento", grupo: 1 },
              { texto: "Usar una fuente que no dice de dónde saca sus datos", grupo: 1 },
            ],
            apoyo: "En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento",
            explica: "Las herramientas pueden ser impresas o digitales, pero confiables: obras reconocidas y fuentes que digan de dónde sacan sus datos, porque en internet abundan explicaciones sin ningún fundamento.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un alumno de la academia te dice: Quiero comprar un léxico griego, pero todavía no sé nada de gramática griega.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que empiece con un interlineal o un diccionario expositivo.", bien: true, explica: "El léxico es para quien ya conoce la gramática. No necesitas leer griego: el interlineal muestra el texto palabra por palabra y el diccionario expositivo explica las palabras de fondo." },
              { texto: "Que lo compre igual: el léxico es la herramienta para principiantes.", explica: "El léxico es el diccionario de la lengua original, para quien ya conoce la gramática." },
              { texto: "Que no estudie palabras: sin gramática no le sirve ninguna herramienta.", explica: "No necesitas leer griego para descubrir qué palabra original hay detrás de un versículo: basta con saber usar algunas herramientas." },
              { texto: "Que use solo explicaciones de internet, que son más fáciles.", explica: "En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento." },
            ],
            apoyo: "El léxico: el diccionario de la lengua original, para quien ya conoce la gramática",
            explica: "El léxico sirve a quien ya conoce la gramática; el interlineal muestra el texto original palabra por palabra y el diccionario expositivo explica las palabras de fondo.",
          },
          {
            caso: "Una hermana que enseña en la escuela dominical te dice: Quiero ver qué palabra griega hay debajo de cada palabra de un versículo, pero no leo griego.",
            pregunta: "¿Qué herramienta le recomiendas?",
            opciones: [
              { texto: "Un interlineal, con la traducción palabra por palabra debajo.", bien: true, explica: "El interlineal es el texto hebreo o griego con la traducción palabra por palabra debajo." },
              { texto: "Un léxico, que es el diccionario para quien no sabe gramática.", explica: "El léxico es el diccionario de la lengua original, para quien ya conoce la gramática." },
              { texto: "Un diccionario común de español, que explica las palabras modernas.", explica: "Para ver el texto original palabra por palabra sirve el interlineal; el diccionario expositivo explica las palabras de fondo." },
              { texto: "Ninguna: sin leer griego no se puede ver la palabra original.", explica: "No necesitas leer griego para descubrir qué palabra original hay detrás de un versículo." },
            ],
            apoyo: "El interlineal: el texto hebreo o griego con la traducción palabra por palabra debajo",
            explica: "El interlineal muestra el texto hebreo o griego con la traducción palabra por palabra debajo, como el Nuevo Testamento interlineal de Francisco Lacueva.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Las herramientas ayudan, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n5-idiomas-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo escoges una herramienta confiable para el estudio, y qué lugar le das en tu estudio?",
              ideas: [
                { id: "confiable", peso: 50, texto: "Prefiero obras reconocidas y fuentes que digan de dónde sacan sus datos.", formas: ["obras reconocidas", "reconocid*", "de donde (sacan|saca|sale|vienen|viene)", "sus datos", "fuente* (seria*|confiable*)", "fundamento"] },
                { id: "contexto", peso: 50, texto: "Las herramientas ayudan, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo.", formas: ["no reemplaz*", "no sustitu*", "contexto", "espiritu santo", "guia del espiritu", "lectura atenta"] },
              ],
              errores: [
                { id: "reemplaza", texto: "Las herramientas ayudan, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo.", formas: ["(herramienta*|strong|interlineal|diccionario*) reemplaz*", "(herramienta*|strong|interlineal|diccionario*) sustitu*", "ya no hace falta", "ya no necesito"], anula: "contexto" },
                { id: "internet", texto: "En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.", formas: ["cualquier (pagina|sitio|explicacion)", "lo que diga internet", "todo lo de internet"], anula: "confiable" },
              ],
              modelo: "Prefiero obras reconocidas y fuentes que digan de dónde sacan sus datos. Las herramientas me ayudan a escudriñar mejor, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo.",
            },
          },
          {
            apoyo: "Prefiere obras reconocidas y fuentes que digan de dónde sacan sus datos",
            clave: {
              id: "pr-n5-idiomas-4-a7-2",
              tipo: "corta",
              pregunta: "Un joven de tu grupo te muestra una explicación de una palabra griega que encontró en internet. ¿Qué le aconsejas y por qué?",
              ideas: [
                { id: "fuentes", peso: 50, texto: "Que prefiera obras reconocidas y fuentes que digan de dónde sacan sus datos.", formas: ["obras reconocidas", "reconocid*", "de donde (saca|sacan|sale|viene|vienen)", "sus datos", "fuente* (seria*|confiable*)", "revis* la fuente", "quien lo escribio"] },
                { id: "internet", peso: 50, negativa: true, texto: "Porque en internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.", formas: ["sin fundamento", "ningun fundamento", "no (tienen|tiene) fundamento", "sin base", "no (tienen|tiene) base", "abundan", "inventad*"] },
              ],
              errores: [
                { id: "todo", texto: "En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.", formas: ["todo lo (que|de) internet", "(internet|la pagina) (siempre )?tiene razon", "(es|son) verdad todo"], anula: "internet" },
              ],
              modelo: "Le aconsejo que prefiera obras reconocidas y fuentes que digan de dónde sacan sus datos, porque en internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Cómo hacer un estudio de palabras
    "n5-idiomas-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es el primer paso de un estudio de palabras?", reverso: "Escoger una palabra importante del pasaje.", apoyo: "Escoge una palabra importante del pasaje" },
              { frente: "¿Dónde se busca la palabra original y su número?", reverso: "En la concordancia de Strong o en un interlineal.", apoyo: "Busca la palabra original y su número en la concordancia de Strong o en un interlineal" },
              { frente: "Al mirar dónde más aparece la palabra, ¿qué se mira sobre todo?", reverso: "El mismo libro y el mismo autor.", apoyo: "Mira dónde más aparece, sobre todo en el mismo libro y en el mismo autor" },
              { frente: "¿Qué se pregunta al volver al pasaje?", reverso: "Qué sentido usa el autor allí.", apoyo: "Vuelve al pasaje y pregunta qué sentido usa el autor allí" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué palabra hebrea traduce la Reina-Valera como misericordia en el Salmo 136?", reverso: "Jésed, el número 2617 del hebreo en la concordancia de Strong.", apoyo: "es jésed, el número 2617 del hebreo en la concordancia de Strong" },
              { frente: "¿Cuántas veces se repite la misma frase en el Salmo 136?", reverso: "En cada uno de sus veintiséis versículos.", apoyo: "En el Salmo 136, la misma frase se repite en cada uno de sus veintiséis versículos" },
              { frente: "¿En qué lealtad entre personas aparece jésed?", reverso: "En la de Rut con su suegra.", apoyo: "Aparece también en los pactos de Dios con su pueblo y en la lealtad entre personas, como la de Rut con su suegra" },
              { frente: "Al enseñar un estudio de palabras, ¿hace falta mostrar todos los pasos?", reverso: "No: basta con explicar en palabras sencillas lo que descubriste.", apoyo: "Al enseñar, no hace falta mostrar todos los pasos" },
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
            consigna: "Ordena los pasos de un estudio de palabras, del primero al último.",
            pasos: [
              "Escoger una palabra importante del pasaje",
              "Buscar la palabra original y su número en la Strong o en un interlineal",
              "Mirar dónde más aparece, sobre todo en el mismo libro y autor",
              "Leer cada uso en su contexto y anotar los sentidos",
              "Consultar un diccionario expositivo para comparar",
              "Volver al pasaje y preguntar qué sentido usa el autor allí",
            ],
            apoyo: "Un estudio de palabras busca la palabra original con la concordancia de Strong o un interlineal, mira dónde más aparece, lee cada uso en su contexto, consulta un diccionario y vuelve al pasaje",
            explica: "Se escoge la palabra, se busca la original y su número, se mira dónde más aparece, se lee cada uso en su contexto, se consulta un diccionario expositivo y se vuelve al pasaje.",
          },
          {
            consigna: "Una alumna quiere estudiar una palabra de su lectura de esta semana. Ordena lo que debe hacer, del primer paso al último.",
            pasos: [
              "Buscar con la Strong o un interlineal la palabra original",
              "Ver dónde más aparece esa palabra",
              "Leer cada uso en su contexto",
              "Comparar con un diccionario expositivo",
              "Volver al pasaje para ver qué sentido usa el autor",
            ],
            apoyo: "Lee cada uso en su contexto y anota los sentidos que encuentras",
            explica: "Primero se busca la palabra original y dónde más aparece; después se lee cada uso en su contexto, se compara con un diccionario y, al final, se vuelve al pasaje.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la conclusión del estudio de jésed.",
            texto: "Jésed es el amor [[leal]] de Dios, que [[cumple]] sus promesas a su pueblo aunque el pueblo [[falle]].",
            distractores: ["lejano", "olvida", "obedezca"],
            errores: {
              lejano: "Jésed es el amor leal de Dios.",
              olvida: "El amor leal de Dios cumple sus promesas a su pueblo.",
              obedezca: "Dios cumple sus promesas aunque el pueblo falle: es un amor fiel que no se acaba.",
            },
            apoyo: "jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle",
            ref: "Éxodo 34:6",
            explica: "La conclusión del estudio: jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle.",
          },
          {
            consigna: "Completa lo que celebra el Salmo 136.",
            texto: "Cuando el Salmo 136 [[repite]] que su misericordia es para [[siempre]], celebra un amor [[fiel]] que no se acaba.",
            distractores: ["niega", "pocos", "débil"],
            errores: {
              niega: "El Salmo 136 repite en cada uno de sus versículos que su misericordia es para siempre.",
              pocos: "El Salmo 136 dice que su misericordia es para siempre.",
              "débil": "El Salmo 136 celebra un amor fiel que no se acaba.",
            },
            apoyo: "Cuando el Salmo 136 repite que su misericordia es para siempre, celebra un amor fiel que no se acaba",
            ref: "Salmos 136:1-3",
            explica: "Jésed, que la Reina-Valera traduce misericordia, es el amor leal de Dios: cuando el Salmo 136 repite que su misericordia es para siempre, celebra un amor fiel que no se acaba.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La palabra que la Reina-Valera traduce misericordia en «Porque para siempre es su misericordia» es jésed, el número 2617 del hebreo en la concordancia de Strong",
            ref: "Salmos 136:1-3",
            titulo: "La misericordia del Salmo 136",
            relato: [
              "Eres maestro de la academia y preparas un estudio para los líderes de célula sobre el Salmo 136, donde la misma frase se repite en cada versículo: «Porque para siempre es su misericordia».",
              "Decides hacer un estudio de la palabra misericordia, siguiendo los pasos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Ya escogiste la palabra misericordia. ¿Qué haces ahora?",
                opciones: [
                  { texto: "Busco la palabra original y su número en la Strong o un interlineal.", bien: true, explica: "Es el paso que sigue: buscar la palabra original y su número en la concordancia de Strong o en un interlineal." },
                  { texto: "Busco qué significa misericordia en un diccionario común del español.", explica: "El estudio busca la palabra original que hay detrás, con la concordancia de Strong o un interlineal." },
                  { texto: "Decido qué significa y después busco versículos que lo confirmen.", explica: "El estudio va paso a paso: busca la palabra original, mira dónde más aparece y lee cada uso en su contexto." },
                ],
                apoyo: "Busca la palabra original y su número en la concordancia de Strong o en un interlineal",
                explica: "Después de escoger la palabra, se busca la palabra original y su número: misericordia traduce jésed, el 2617 del hebreo.",
              },
              {
                tipo: "situacion",
                pregunta: "Descubres que es jésed, el 2617. ¿Dónde más la buscas?",
                opciones: [
                  { texto: "Donde más aparece, como cuando Dios se revela a Moisés.", bien: true, explica: "Jésed aparece cuando Dios se revela a Moisés, en los pactos de Dios con su pueblo y en la lealtad entre personas." },
                  { texto: "En ningún otro lugar: lo que dicen otros pasajes no ayuda al estudio.", explica: "Un paso del estudio es mirar dónde más aparece, sobre todo en el mismo libro y en el mismo autor." },
                  { texto: "Solo en un sitio de internet que explique palabras hebreas.", explica: "El paso es mirar dónde más aparece la palabra en la Biblia y leer cada uso en su contexto." },
                ],
                apoyo: "Mira dónde más aparece, sobre todo en el mismo libro y en el mismo autor",
                explica: "Jésed aparece cuando Dios se revela a Moisés: «¡Jehová! ¡Jehová! fuerte, misericordioso y piadoso; tardo para la ira, y grande en misericordia y verdad».",
              },
              {
                tipo: "situacion",
                pregunta: "Ya leíste cada uso en su contexto y anotaste los sentidos. ¿Qué haces ahora?",
                opciones: [
                  { texto: "Consulto un diccionario expositivo para comparar.", bien: true, explica: "Después de leer cada uso en su contexto, se consulta un diccionario expositivo para comparar." },
                  { texto: "Concluyo sin volver al pasaje, con lo que ya anoté.", explica: "Falta comparar con un diccionario expositivo y volver al pasaje para ver qué sentido usa el autor allí." },
                  { texto: "Escojo el sentido que más me guste de los que anoté.", explica: "Se vuelve al pasaje y se pregunta qué sentido usa el autor allí, no el que más guste." },
                ],
                apoyo: "Consulta un diccionario expositivo para comparar",
                explica: "Después de leer cada uso en su contexto, se consulta un diccionario expositivo y se vuelve al pasaje.",
              },
              {
                tipo: "explica",
                apoyo: "La conclusión del estudio: jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle",
                clave: {
                  id: "pr-n5-idiomas-5-a4-1",
                  tipo: "corta",
                  pregunta: "Vuelves al Salmo 136. ¿Qué concluye tu estudio sobre jésed, y qué celebra el salmo cuando lo repite?",
                  ideas: [
                    { id: "leal", peso: 50, texto: "Jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle.", formas: ["amor leal", "leal", "leales", "lealtad de dios", "cumple sus promesas", "cumple* promesa*", "aunque (el|su) pueblo falle", "aunque fall*", "fiel a sus promesas"] },
                    { id: "siempre", peso: 50, texto: "El salmo celebra un amor fiel que no se acaba: su misericordia es para siempre.", formas: ["no se acaba", "nunca se acaba", "para siempre", "amor fiel", "eterno", "no termina", "nunca termina", "no se termina"] },
                  ],
                  modelo: "Mi estudio concluye que jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle. Cuando el salmo repite que su misericordia es para siempre, celebra un amor fiel que no se acaba.",
                },
              },
            ],
          },
          {
            apoyo: "Aparece también en los pactos de Dios con su pueblo y en la lealtad entre personas, como la de Rut con su suegra",
            ref: "Éxodo 34:6",
            titulo: "Jésed en la historia de Rut",
            relato: [
              "Eres pastor y preparas una serie sobre el libro de Rut. Tu interlineal te muestra que en Rut 1:8 y 3:10 aparece la palabra hebrea jésed.",
              "Quieres hacer bien el estudio de palabras antes de predicar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué número tiene jésed en la concordancia de Strong?",
                opciones: [
                  { texto: "El 2617 del hebreo.", bien: true, explica: "Jésed es el número 2617 del hebreo en la concordancia de Strong." },
                  { texto: "El 2617 del griego.", explica: "Jésed es una palabra hebrea: el número 2617 del hebreo." },
                  { texto: "El 136, como el número del salmo.", explica: "Jésed es el número 2617 del hebreo en la concordancia de Strong." },
                ],
                apoyo: "jésed, el número 2617 del hebreo en la concordancia de Strong",
                explica: "La palabra que la Reina-Valera traduce misericordia es jésed, el número 2617 del hebreo en la concordancia de Strong.",
              },
              {
                tipo: "situacion",
                pregunta: "Además de la lealtad de Rut, ¿dónde más aparece jésed?",
                opciones: [
                  { texto: "Cuando Dios se revela a Moisés y en los pactos con su pueblo.", bien: true, explica: "Jésed aparece cuando Dios se revela a Moisés y en los pactos de Dios con su pueblo." },
                  { texto: "En ningún otro lugar: es una palabra solo del libro de Rut.", explica: "Aparece también cuando Dios se revela a Moisés y en los pactos de Dios con su pueblo." },
                  { texto: "Solo en los salmos, y nunca en las historias del pueblo de Dios.", explica: "Aparece cuando Dios se revela a Moisés, en los pactos de Dios con su pueblo y en la lealtad entre personas." },
                ],
                apoyo: "Aparece cuando Dios se revela a Moisés",
                explica: "Jésed aparece cuando Dios se revela a Moisés, en los pactos de Dios con su pueblo y en la lealtad entre personas, como la de Rut con su suegra.",
              },
              {
                tipo: "situacion",
                pregunta: "Leíste cada uso en su contexto y consultaste un diccionario. ¿Cuál es el último paso?",
                opciones: [
                  { texto: "Volver al pasaje y ver qué sentido usa el autor allí.", bien: true, explica: "El último paso es volver al pasaje y preguntar qué sentido usa el autor allí." },
                  { texto: "Predicar a la vez todos los sentidos que encontré.", explica: "El último paso es volver al pasaje y preguntar qué sentido usa el autor allí." },
                  { texto: "Buscar otra palabra y dejar este estudio para otro día.", explica: "Falta el último paso: volver al pasaje y preguntar qué sentido usa el autor allí." },
                ],
                apoyo: "Vuelve al pasaje y pregunta qué sentido usa el autor allí",
                explica: "El estudio termina en el pasaje: se pregunta qué sentido usa el autor allí.",
              },
              {
                tipo: "explica",
                apoyo: "jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle",
                clave: {
                  id: "pr-n5-idiomas-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué concluye tu estudio sobre jésed, y dónde lo encontraste además de Rut?",
                  ideas: [
                    { id: "leal", peso: 50, texto: "Jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle.", formas: ["amor leal", "leal", "leales", "lealtad de dios", "cumple sus promesas", "cumple* promesa*", "aunque (el|su) pueblo falle", "aunque fall*", "fiel a sus promesas"] },
                    { id: "usos", peso: 50, texto: "Aparece cuando Dios se revela a Moisés y en los pactos de Dios con su pueblo.", formas: ["moises", "pacto*", "exodo", "se revela", "revelo"] },
                  ],
                  modelo: "Mi estudio concluye que jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle. Además de Rut, aparece cuando Dios se revela a Moisés y en los pactos de Dios con su pueblo.",
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
            consigna: "Jésed aparece cuando Dios se revela a Moisés. ¿En qué es grande Dios, según ese pasaje? Toca las palabras que lo dicen.",
            texto: "tardo para la ira, y grande en [[misericordia y verdad]]",
            apoyo: "Aparece cuando Dios se revela a Moisés",
            ref: "Éxodo 34:6",
            explica: "Dios se revela a Moisés: «¡Jehová! ¡Jehová! fuerte, misericordioso y piadoso; tardo para la ira, y grande en misericordia y verdad».",
          },
          {
            consigna: "En el Salmo 136 la misma frase se repite en cada versículo. ¿Por cuánto tiempo es la misericordia de Dios? Toca las palabras que lo dicen.",
            texto: "Porque [[para siempre]] es su misericordia",
            apoyo: "Cuando el Salmo 136 repite que su misericordia es para siempre, celebra un amor fiel que no se acaba",
            ref: "Salmos 136:1",
            explica: "El Salmo 136 repite «Porque para siempre es su misericordia»: celebra el jésed de Dios, un amor fiel que no se acaba.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje",
            ref: "Salmos 136:1",
            situacion: "Terminaste tu estudio de jésed, y tu pastor te pide compartirlo en el culto de oración del miércoles.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes muchas notas: el número de Strong, cada uso en su contexto y lo que dice el diccionario.",
                pregunta: "¿Cómo lo vas a presentar?",
                opciones: [
                  { texto: "Explicas en palabras sencillas lo que descubriste.", valor: 2, explica: "Al enseñar, no hace falta mostrar todos los pasos: basta con explicar en palabras sencillas lo que descubriste.", siguiente: "e2" },
                  { texto: "Muestras uno por uno todos los pasos y todas tus notas.", valor: 0, explica: "Al enseñar, no hace falta mostrar todos los pasos.", siguiente: "e1b" },
                  { texto: "Cuentas lo que descubriste, con muchas palabras técnicas.", valor: 1, explica: "Contar lo que descubriste está bien, pero se explica en palabras sencillas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A los pocos minutos, varios hermanos se pierden entre tantos números y pasos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Dejas los pasos y dices en sencillo lo que descubriste.", valor: 2, explica: "Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje.", siguiente: "e2" },
                  { texto: "Sigues hasta mostrar todos los pasos, porque son importantes.", valor: 0, explica: "Al enseñar, no hace falta mostrar todos los pasos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llega el momento de decir lo que descubriste.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que jésed es el amor leal de Dios, que cumple sus promesas.", valor: 2, explica: "Es la conclusión del estudio: jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle." },
                  { texto: "Que lo más importante del estudio es el número 2617 de la Strong.", valor: 0, explica: "Lo que se comparte es lo que descubriste: jésed es el amor leal de Dios." },
                  { texto: "Que la palabra tiene un sentido muy rico, sin decir cuál es.", valor: 1, explica: "Es cierto, pero conviene decir lo que descubriste: jésed es el amor leal de Dios." },
                ],
              },
              {
                id: "e3",
                narra: "Para cerrar, quieres mostrar cómo cambia la lectura del salmo.",
                pregunta: "¿Cómo terminas?",
                opciones: [
                  { texto: "Muestras que el salmo celebra un amor fiel que no se acaba.", valor: 2, explica: "Cuando el Salmo 136 repite que su misericordia es para siempre, celebra un amor fiel que no se acaba." },
                  { texto: "Pides que todos memoricen los seis pasos del estudio de palabras.", valor: 0, explica: "Al enseñar, no hace falta mostrar todos los pasos: basta con explicar cómo cambia la lectura del pasaje." },
                  { texto: "Terminas con la lista de todos los lugares donde aparece jésed.", valor: 0, explica: "Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje." },
                ],
              },
            ],
          },
          {
            apoyo: "Al enseñar, no hace falta mostrar todos los pasos",
            ref: "Salmos 136:1",
            situacion: "Eres maestra de la escuela dominical de niños. Estudiaste la palabra misericordia del Salmo 136, y hoy se la vas a enseñar a los niños.",
            escenas: [
              {
                id: "e1",
                narra: "Preparas lo que vas a decir.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Contarles en palabras sencillas lo que descubriste.", valor: 2, explica: "Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje." },
                  { texto: "Explicarles cómo se usa la concordancia de Strong.", valor: 1, explica: "Puede servir, pero al enseñar no hace falta mostrar todos los pasos." },
                  { texto: "Enseñarles a decir la palabra jésed y su número de memoria.", valor: 0, explica: "Lo que se comparte es lo que descubriste y cómo cambia la lectura del pasaje." },
                ],
              },
              {
                id: "e2",
                narra: "Una niña pregunta: ¿Qué quiere decir que su misericordia es para siempre?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Dios nos ama con un amor fiel que no se acaba.", valor: 2, explica: "La misericordia de Dios es un amor leal que no se acaba." },
                  { texto: "Que Dios nos quiere solo cuando nos portamos bien.", valor: 0, explica: "Jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle." },
                  { texto: "Que es una frase bonita que el salmo repite muchas veces.", valor: 1, explica: "Es verdad que el salmo la repite, pero celebra un amor fiel que no se acaba." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar la clase, piensas si tu enseñanza sirvió.",
                pregunta: "¿Qué te muestra que sí?",
                opciones: [
                  { texto: "Que entendieron mejor lo que dice el Salmo 136.", valor: 2, explica: "Basta con explicar lo que descubriste y cómo cambia la lectura del pasaje." },
                  { texto: "Que aprendieron de memoria el número 2617 de la Strong.", valor: 0, explica: "No hace falta mostrar todos los pasos: lo que importa es cómo cambia la lectura del pasaje." },
                  { texto: "Que quedaron impresionados con todo lo que sabes de hebreo.", valor: 0, explica: "Lo que se comparte, en palabras sencillas, es lo que descubriste y cómo cambia la lectura del pasaje." },
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
            apoyo: "Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje",
            ref: "Salmos 136:1",
            clave: {
              id: "pr-n5-idiomas-5-a7-1",
              tipo: "corta",
              pregunta: "Un hermano te pide que le cuentes, sin palabras técnicas, lo que descubriste de la misericordia en el Salmo 136. ¿Qué le dices?",
              ideas: [
                { id: "leal", peso: 50, texto: "Que la misericordia, jésed, es el amor leal de Dios, que cumple sus promesas aunque su pueblo falle.", formas: ["amor leal", "leal", "leales", "lealtad de dios", "cumple sus promesas", "cumple* promesa*", "aunque (el|su) pueblo falle", "aunque fall*", "fiel a sus promesas"] },
                { id: "lectura", peso: 50, texto: "Que el salmo celebra un amor fiel que no se acaba: su misericordia es para siempre.", formas: ["no se acaba", "nunca se acaba", "para siempre", "amor fiel", "eterno", "no termina", "nunca termina", "no se termina"] },
              ],
              modelo: "Le digo que la misericordia de Dios es un amor leal: Dios cumple sus promesas a su pueblo aunque el pueblo falle. Por eso el salmo repite que su misericordia es para siempre: celebra un amor fiel que no se acaba.",
            },
          },
          {
            apoyo: "Al enseñar, no hace falta mostrar todos los pasos",
            clave: {
              id: "pr-n5-idiomas-5-a7-2",
              tipo: "corta",
              pregunta: "Vas a enseñar a tu célula lo que descubriste en un estudio de palabras. ¿Cómo lo presentas, y qué haces con los pasos del estudio?",
              ideas: [
                { id: "sencillo", peso: 50, texto: "Explico en palabras sencillas lo que descubrí y cómo cambia la lectura del pasaje.", formas: ["palabras sencillas", "sencill*", "simple*", "lo que descubr*", "como cambia", "cambia la lectura"] },
                { id: "pasos", peso: 50, texto: "No hace falta mostrar todos los pasos.", formas: ["no hace falta", "no es necesario", "no necesito mostrar", "no hay que mostrar", "no muestro todos", "no los muestro", "sin mostrar todos", "no todos los pasos"] },
              ],
              errores: [
                { id: "todos", texto: "Al enseñar, no hace falta mostrar todos los pasos.", formas: ["hay que mostrar todos", "debo mostrar todos", "debes mostrar todos", "deben mostrar todos", "conviene mostrar todos", "mostrar siempre todos"], anula: "pasos" },
              ],
              modelo: "Lo presento en palabras sencillas: digo lo que descubrí y cómo cambia la lectura del pasaje. No hace falta mostrar todos los pasos del estudio, como los números de Strong o cada uso de la palabra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Errores comunes y buen uso
    "n5-idiomas-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el anacronismo?", reverso: "Leer en una palabra antigua un sentido moderno.", apoyo: "El anacronismo: leer en una palabra antigua un sentido moderno" },
              { frente: "¿Cuándo se inventó la dinamita?", reverso: "En 1867: Pablo no podía pensar en ella.", apoyo: "La dinamita se inventó en 1867, así que Pablo no podía pensar en ella" },
              { frente: "¿Qué significa dýnamis?", reverso: "Poder, fuerza, capacidad.", apoyo: "dýnamis es poder, fuerza, capacidad" },
              { frente: "¿Qué es la falacia de la raíz?", reverso: "Creer que una palabra significa siempre lo que significaban sus partes.", apoyo: "La falacia de la raíz: creer que una palabra significa siempre lo que significaban sus partes" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué da el sentido a una palabra: el uso o el origen?", reverso: "El uso, no el origen de la palabra.", apoyo: "El sentido lo da el uso, no el origen de la palabra" },
              { frente: "¿Qué dos verbos usa Jesús en griego en Juan 21?", reverso: "Agapáo y filéo.", apoyo: "en griego usa dos verbos, agapáo y filéo" },
              { frente: "¿Para qué sirve el estudio de los idiomas?", reverso: "Para ser más fieles al texto, no para impresionar.", apoyo: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar" },
              { frente: "¿Qué se hace antes de concluir el sentido de un pasaje?", reverso: "Comparar varias traducciones fieles.", apoyo: "Compara varias traducciones fieles antes de concluir" },
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
            consigna: "¿Qué error es cada ejemplo: anacronismo, falacia de la raíz o exagerar las diferencias entre sinónimos? Lleva cada frase a su grupo.",
            grupos: ["Anacronismo", "Falacia de la raíz", "Exagerar diferencias entre sinónimos"],
            frases: [
              { texto: "Decir que el poder del evangelio es dinamita", grupo: 0 },
              { texto: "Leer en una palabra antigua un sentido moderno", grupo: 0 },
              { texto: "Pensar en un invento de 1867 al leer a Pablo", grupo: 0 },
              { texto: "Creer que una palabra significa siempre lo que significaban sus partes", grupo: 1 },
              { texto: "Buscar el sentido en el origen de la palabra y no en su uso", grupo: 1 },
              { texto: "Explicar grandes diferencias entre agapáo y filéo", grupo: 2 },
              { texto: "Creer que dos palabras distintas nunca dicen lo mismo", grupo: 2 },
            ],
            apoyo: "Hay errores comunes que se deben evitar: la falacia de la raíz, el anacronismo, como decir que dýnamis es dinamita, cargar todos los sentidos a la vez y exagerar las diferencias entre sinónimos",
            explica: "Decir que dýnamis es dinamita es un anacronismo: leer en una palabra antigua un sentido que vino después. Creer que una palabra significa siempre lo que sus partes es la falacia de la raíz. Y explicar grandes diferencias entre agapáo y filéo es exagerar las diferencias entre sinónimos.",
          },
          {
            consigna: "¿Es cargar todos los sentidos a la vez o corregir la traducción para lucirse? Lleva cada frase a su grupo.",
            grupos: ["Cargar todos los sentidos a la vez", "Corregir la traducción para lucirse"],
            frases: [
              { texto: "Decir que en un pasaje la palabra significa todo lo que puede significar", grupo: 0 },
              { texto: "Olvidar que en cada pasaje el autor usa un solo sentido", grupo: 0 },
              { texto: "Explicar todos los sentidos de una palabra como si valieran juntos", grupo: 0 },
              { texto: "Decir que la Biblia está mal traducida sin conocer bien la lengua", grupo: 1 },
              { texto: "Corregir la Reina-Valera en público para impresionar", grupo: 1 },
              { texto: "Usar el griego para mostrar que uno sabe más que la traducción", grupo: 1 },
            ],
            apoyo: "Corregir la traducción para lucirse: si no conoces bien la lengua, no digas que la Biblia está mal traducida",
            explica: "Cargar todos los sentidos a la vez olvida que en cada pasaje el autor usa uno; corregir la traducción para lucirse es decir que la Biblia está mal traducida sin conocer bien la lengua.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un predicador invitado te dice: El domingo voy a enseñar que el evangelio es dinamita, porque en griego poder se dice dýnamis.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es un anacronismo: la dinamita se inventó en 1867.", bien: true, explica: "Leer en una palabra antigua un sentido que vino después es un anacronismo: la dinamita se inventó en 1867, y Pablo no podía pensar en ella." },
              { texto: "Que es una idea muy buena, porque dýnamis viene de dinamita.", explica: "Es al revés en el tiempo: la dinamita se inventó en 1867, así que Pablo no podía pensar en ella." },
              { texto: "Que mejor cargue a dýnamis con todos sus sentidos a la vez.", explica: "Cargar todos los sentidos a la vez es otro error: dýnamis es poder, fuerza, capacidad." },
              { texto: "Que eso se llama falacia de la raíz, y que es una buena idea.", explica: "Es un anacronismo, leer en una palabra antigua un sentido que vino después, y es un error que hay que evitar." },
            ],
            apoyo: "Este error se llama anacronismo: leer en una palabra antigua un sentido que vino después",
            ref: "Romanos 1:16",
            explica: "La dinamita se inventó en 1867, así que Pablo no podía pensar en ella: dýnamis es poder, fuerza, capacidad. Leer en una palabra antigua un sentido que vino después es un anacronismo.",
          },
          {
            caso: "Una alumna de la academia te dice: Leí que el sentido verdadero de una palabra siempre está en sus partes, en su raíz.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es la falacia de la raíz: el sentido lo da el uso.", bien: true, explica: "Creer que una palabra significa siempre lo que significaban sus partes es la falacia de la raíz: el sentido lo da el uso." },
              { texto: "Que tiene razón: el origen de la palabra decide su sentido.", explica: "El sentido lo da el uso, no el origen de la palabra." },
              { texto: "Que eso se llama anacronismo, porque mira el sentido moderno.", explica: "El anacronismo es leer en una palabra antigua un sentido moderno; creer que una palabra significa lo que sus partes es la falacia de la raíz." },
              { texto: "Que sí, y que por eso hay que cargar todos sus sentidos a la vez.", explica: "Una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno; y el sentido lo da el uso." },
            ],
            apoyo: "El sentido lo da el uso, no el origen de la palabra",
            explica: "Creer que una palabra significa siempre lo que significaban sus partes es la falacia de la raíz: el sentido lo da el uso, no el origen de la palabra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Juan 21:15-17 tiene un error. Tócala.",
            frases: [
              "En Juan 21, Jesús pregunta tres veces a Pedro si lo ama.",
              "En Juan 21, Jesús usa en griego dos verbos: agapáo y filéo.",
              "Juan siempre usa agapáo y filéo para dos amores muy distintos.",
              "El centro de Juan 21:15-17 es que Pedro es restaurado tres veces.",
            ],
            malo: 2,
            correccion: "Juan usa los dos verbos para el amor del Padre al Hijo (Juan 3:35 y 5:20), así que no conviene basar la enseñanza en esa diferencia.",
            apoyo: "Juan usa los dos para el amor del Padre al Hijo (Juan 3:35 y 5:20), así que no conviene basar la enseñanza en esa diferencia",
            ref: "Juan 21:15-17",
            explica: "Algunos explican grandes diferencias entre agapáo y filéo, pero Juan usa los dos para el amor del Padre al Hijo. El centro del pasaje es otro: Pedro, que había negado tres veces a Jesús, es restaurado tres veces.",
          },
          {
            consigna: "Una de estas frases sobre el sentido de las palabras tiene un error. Tócala.",
            frases: [
              "Una palabra puede tener varios sentidos.",
              "El contexto decide qué sentido usa el autor en cada pasaje.",
              "En cada pasaje conviene cargar todos los sentidos de una palabra a la vez.",
              "Antes de concluir, conviene comparar varias traducciones fieles.",
            ],
            malo: 2,
            correccion: "Una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno: el contexto decide cuál.",
            apoyo: "una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno",
            explica: "Cargar todos los sentidos a la vez es un error: una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno, y se deja que el contexto decida el sentido.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Di de dónde sacas tus datos y reconoce lo que no sabes",
            ref: "Juan 21:15-17",
            situacion: "Eres maestro de la academia y vas a enseñar Juan 21:15-17 a un grupo de líderes.",
            escenas: [
              {
                id: "e1",
                narra: "Al preparar la clase, lees un comentario que hace de agapáo y filéo dos amores muy distintos.",
                pregunta: "¿Qué haces con esa idea?",
                opciones: [
                  { texto: "No basas la enseñanza en esa diferencia.", valor: 2, explica: "Juan usa los dos para el amor del Padre al Hijo (Juan 3:35 y 5:20), así que no conviene basar la enseñanza en esa diferencia.", siguiente: "e2" },
                  { texto: "Haces de esa diferencia el centro de toda la clase.", valor: 0, explica: "No conviene basar la enseñanza en esa diferencia: Juan usa los dos para el amor del Padre al Hijo, y el centro del pasaje es otro.", siguiente: "e1b" },
                  { texto: "La mencionas de paso, sin revisar de dónde sale.", valor: 1, explica: "Mencionarla de paso no es el centro, pero di de dónde sacas tus datos; y Juan usa los dos verbos para el amor del Padre al Hijo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al ensayar, notas que toda tu clase gira alrededor de dos palabras griegas.",
                pregunta: "¿Qué cambias?",
                opciones: [
                  { texto: "Vuelves al centro del pasaje: Pedro es restaurado tres veces.", valor: 2, explica: "El centro del pasaje es otro: Pedro, que había negado tres veces a Jesús, es restaurado tres veces y recibe el encargo de apacentar sus ovejas.", siguiente: "e2" },
                  { texto: "Agregas más palabras griegas para que la clase impresione más.", valor: 0, explica: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la clase llegas a la explicación del pasaje.",
                pregunta: "¿Cómo lo explicas?",
                opciones: [
                  { texto: "En español sencillo, y mencionas el griego solo si ayuda.", valor: 2, explica: "Explica la idea en español sencillo; menciona la palabra original solo si ayuda." },
                  { texto: "Con muchas palabras griegas, para que vean cuánto sabes.", valor: 0, explica: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar." },
                  { texto: "Leyendo un párrafo técnico del comentario, sin explicarlo.", valor: 0, explica: "Explica la idea en español sencillo, y di de dónde sacas tus datos." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder te pregunta algo del griego que no sabes responder.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Reconoces que no lo sabes y le dices que lo vas a estudiar.", valor: 2, explica: "Di de dónde sacas tus datos y reconoce lo que no sabes." },
                  { texto: "Inventas una respuesta para no quedar mal delante del grupo.", valor: 0, explica: "Reconoce lo que no sabes: conocer los idiomas debe hacerte más humilde, no más orgulloso." },
                  { texto: "Le dices que en ese punto la Reina-Valera está mal traducida.", valor: 0, explica: "Si no conoces bien la lengua, no digas que la Biblia está mal traducida." },
                ],
              },
            ],
          },
          {
            apoyo: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar",
            ref: "Romanos 1:16",
            situacion: "Eres pastor, y el domingo vas a predicar Romanos 1:16, donde Pablo dice que el evangelio «es poder de Dios para salvación a todo aquel que cree».",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano te sugiere: Di que el poder del evangelio es dinamita; a la gente le encanta.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Explicar que dýnamis es poder, fuerza, capacidad.", valor: 2, explica: "Poder traduce dýnamis: poder, fuerza, capacidad. La dinamita se inventó en 1867.", siguiente: "e2" },
                  { texto: "Decir que dýnamis es dinamita, porque suena muy bien.", valor: 0, explica: "Suena bien, pero es un error: un anacronismo.", siguiente: "e1b" },
                  { texto: "Explicar que dýnamis es poder, sin decir de dónde sacas el dato.", valor: 1, explica: "Explicar bien el sentido es lo correcto; también conviene decir de dónde sacas tus datos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al preparar el sermón, recuerdas que la dinamita se inventó en 1867.",
                pregunta: "¿Qué haces con la idea del hermano?",
                opciones: [
                  { texto: "La dejas: Pablo no podía pensar en la dinamita.", valor: 2, explica: "La dinamita se inventó en 1867, así que Pablo no podía pensar en ella.", siguiente: "e2" },
                  { texto: "La mantienes, porque a la gente le va a gustar mucho.", valor: 0, explica: "Leer en una palabra antigua un sentido que vino después es un anacronismo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Quieres estar seguro del sentido de la palabra poder en el versículo.",
                pregunta: "¿Qué haces antes de concluir?",
                opciones: [
                  { texto: "Comparas varias traducciones fieles y lees el contexto.", valor: 2, explica: "Compara varias traducciones fieles antes de concluir, y deja que el contexto decida el sentido." },
                  { texto: "Escoges el sentido más llamativo que encuentres en internet.", valor: 0, explica: "Deja que el contexto decida el sentido, y di de dónde sacas tus datos." },
                  { texto: "Cargas en el versículo todos los sentidos posibles a la vez.", valor: 0, explica: "Una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno." },
                ],
              },
              {
                id: "e3",
                narra: "Al salir del culto, alguien te dice: ¡Cuánto griego sabe, pastor!",
                pregunta: "¿Qué piensas?",
                opciones: [
                  { texto: "Que el griego sirve para ser más fiel, no para impresionar.", valor: 2, explica: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar." },
                  { texto: "Que el próximo domingo usarás más griego para impresionar.", valor: 0, explica: "Conocer los idiomas originales debe hacerte más humilde y más fiel, no más orgulloso." },
                  { texto: "Que conviene decir más seguido que la Biblia está mal traducida.", valor: 0, explica: "Si no conoces bien la lengua, no digas que la Biblia está mal traducida." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el contexto y el sentido de las palabras: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno.", verdad: true, explica: "Por eso no se cargan todos los sentidos a la vez: el contexto decide el sentido.", apoyo: "una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno" },
              { texto: "El sentido de una palabra lo da su origen, no su uso.", verdad: false, explica: "Es al revés: el sentido lo da el uso, no el origen de la palabra.", apoyo: "El sentido lo da el uso, no el origen de la palabra" },
              { texto: "El contexto decide el sentido de una palabra.", verdad: true, explica: "Así lo dice la lección: el contexto decide el sentido.", apoyo: "El contexto decide el sentido" },
            ],
          },
          {
            consigna: "Sobre los sinónimos y el contexto: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "A veces los autores usan dos palabras distintas para decir lo mismo.", verdad: true, explica: "Por eso no conviene exagerar las diferencias entre sinónimos.", apoyo: "a veces los autores usan dos palabras distintas para decir lo mismo" },
              { texto: "Juan usa agapáo y filéo con sentidos opuestos en todos sus escritos.", verdad: false, explica: "Juan usa los dos para el amor del Padre al Hijo (Juan 3:35 y 5:20).", apoyo: "Juan usa los dos para el amor del Padre al Hijo", ref: "Juan 3:35" },
              { texto: "Una palabra significa siempre lo mismo, en cualquier pasaje.", verdad: false, explica: "Una palabra tiene varios sentidos, y se deja que el contexto decida el sentido.", apoyo: "Deja que el contexto decida el sentido" },
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
            apoyo: "Explica la idea en español sencillo; menciona la palabra original solo si ayuda",
            ref: "2 Corintios 4:2",
            clave: {
              id: "pr-n5-idiomas-6-a7-1",
              tipo: "corta",
              pregunta: "Vas a enseñar un pasaje y conoces la palabra griega que hay detrás. ¿Cómo vas a explicar la idea, y qué harás con lo que no sabes?",
              ideas: [
                { id: "sencillo", peso: 50, texto: "Explicaré la idea en español sencillo y mencionaré la palabra original solo si ayuda.", formas: ["espanol sencillo", "sencill*", "solo si ayuda", "palabras simples", "simple*", "en espanol"] },
                { id: "reconocer", peso: 50, negativa: true, texto: "Diré de dónde saco mis datos y reconoceré lo que no sé.", formas: ["reconoc* (que|lo)", "admit* (que|lo)", "acept* que no", "lo que no se", "que no lo se", "dire que no se", "decir que no se", "no lo se", "de donde saco", "de donde sacas", "mis datos"] },
              ],
              errores: [
                { id: "inventar", texto: "Reconoce lo que no sabes: no inventes una respuesta.", formas: ["invent*"], anula: "reconocer" },
              ],
              modelo: "Explicaré la idea en español sencillo y mencionaré la palabra original solo si ayuda. Diré de dónde saco mis datos, y lo que no sé lo reconoceré con humildad, sin inventar nada.",
            },
          },
          {
            apoyo: "Conocer los idiomas originales debe hacerte más humilde y más fiel, no más orgulloso",
            ref: "2 Corintios 4:2",
            clave: {
              id: "pr-n5-idiomas-6-a7-2",
              tipo: "corta",
              pregunta: "Un hermano te dice que estudiará griego para que en su iglesia vean cuánto sabe. ¿Qué le dices sobre para qué sirve conocer los idiomas originales?",
              ideas: [
                { id: "fieles", peso: 50, texto: "Que el estudio de los idiomas sirve para ser más fieles al texto, no para impresionar.", formas: ["mas fiel*", "fiel* al texto", "fidelidad", "ser fiel*", "fiel* a la palabra", "fiel* a la biblia"] },
                { id: "humilde", peso: 50, texto: "Que conocer los idiomas debe hacernos más humildes, no más orgullosos.", formas: ["humild*", "no mas orgullos*", "no orgullos*", "sin orgullo", "no para impresionar", "no para lucirse", "no impresionar", "no lucirse"] },
              ],
              errores: [
                { id: "impresionar", texto: "El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar.", formas: ["(sirve|sirven|es) para impresionar", "esta bien impresionar", "esta bien que vean", "tiene razon"], anula: "fieles" },
              ],
              modelo: "Le digo que el estudio de los idiomas sirve para ser más fieles al texto, no para impresionar. Conocer los idiomas originales debe hacernos más humildes y más fieles, no más orgullosos.",
            },
          },
        ],
      },
    ],
  },
};
