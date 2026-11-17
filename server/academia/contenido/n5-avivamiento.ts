/**
 * Nivel 5 · Materia 7 — Teología del avivamiento (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Los principios bíblicos, la historia y el discernimiento del avivamiento, con el artículo 15 de la declaración de fe.
 * Las lenguas como señal inicial del bautismo en el Espíritu son un punto de la declaración de fe por confirmar. La
 * especialidad de Intercesión y oración cuenta el papel de la oración en estos avivamientos; aquí no se repite.
 */
import type { LeccionContenido } from "../tipos";

export const N5_AVIVAMIENTO: LeccionContenido[] = [
  {
    id: "n5-avivamiento-1",
    objetivos: [
      "Definir el avivamiento con la Escritura y con la declaración de fe.",
      "Distinguir el avivamiento de una campaña de evangelización y de un despertar general.",
      "Reconocer las señales de una iglesia que necesita avivamiento.",
    ],
    paraEmpezar:
      "La palabra avivamiento se usa para muchas cosas: un culto emotivo, una campaña, una semana de reuniones. En la Biblia es algo más profundo: Dios devolviendo la vida a su pueblo.",
    bloques: [
      { t: "versiculo", ref: "Salmos 85:6" },
      { t: "versiculo", ref: "Habacuc 3:2" },
      {
        t: "parrafo",
        texto:
          "El salmista ora: «¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?». Y Habacuc clama: «aviva tu obra en medio de los tiempos». Avivar es dar vida de nuevo a lo que ya era de Dios: el avivamiento empieza en el pueblo de Dios, no en el mundo.",
      },
      {
        t: "parrafo",
        texto:
          "El artículo 15 de la declaración de fe lo define como la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos. Se busca con oración, con arrepentimiento y con obediencia a la Palabra.",
      },
      { t: "subtitulo", texto: "Tres cosas distintas" },
      {
        t: "lista",
        items: [
          "El avivamiento: Dios renueva la vida de su iglesia, y los creyentes vuelven a la santidad, la oración y el primer amor.",
          "La evangelización: la iglesia anuncia el evangelio a los que no creen. Una campaña puede ser fruto de un avivamiento, pero no es lo mismo.",
          "Un despertar: el avivamiento se desborda y transforma a una sociedad entera, como el Gran Despertar del siglo XVIII.",
        ],
      },
      { t: "versiculo", ref: "Isaías 57:15" },
      {
        t: "parrafo",
        texto: "Dios promete vida a un tipo de corazón: habita «con el quebrantado y humilde de espíritu, para hacer vivir el espíritu de los humildes».",
      },
      { t: "versiculo", ref: "Apocalipsis 2:4-5" },
      {
        t: "parrafo",
        texto:
          "La necesidad de avivamiento se nota cuando una iglesia sigue trabajando, pero ha perdido el amor. A Éfeso, que era activa y firme en la doctrina, Jesús le dijo: «has dejado tu primer amor», y le dio el camino: «Recuerda, por tanto, de dónde has caído, y arrepiéntete, y haz las primeras obras».",
      },
      { t: "versiculo", ref: "Hechos 3:19" },
      {
        t: "parrafo",
        texto:
          "Pedro unió el arrepentimiento con la renovación: «arrepentíos y convertíos, para que sean borrados vuestros pecados; para que vengan de la presencia del Señor tiempos de refrigerio».",
      },
    ],
    ideaClave:
      "El avivamiento es la obra del Espíritu que devuelve la vida al pueblo de Dios: lo despierta a la santidad, la oración y el primer amor, y lo lanza con poder hacia los perdidos. No es lo mismo que una campaña de evangelización, aunque la produce, y cuando transforma a toda una sociedad se habla de un despertar. Dios lo da a los humildes y quebrantados, y se busca con oración, arrepentimiento y obediencia a la Palabra.",
    paraLaVida: {
      texto: "El avivamiento empieza por el pueblo de Dios, y el pueblo de Dios empieza por mí.",
      pregunta: "¿Qué señales de haber dejado el primer amor ves hoy en tu vida o en tu ministerio?",
    },
  },
  {
    id: "n5-avivamiento-2",
    objetivos: [
      "Describir los avivamientos bajo Ezequías, Josías y Esdras y Nehemías.",
      "Identificar los patrones que se repiten en ellos.",
      "Leer 2 Crónicas 7:14 en su contexto.",
    ],
    paraEmpezar:
      "El Antiguo Testamento registra varios momentos en que Dios renovó a su pueblo después de años de frialdad. Se parecen mucho entre sí.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "2 Crónicas 29:3" },
      { t: "versiculo", ref: "2 Crónicas 30:26" },
      {
        t: "parrafo",
        texto:
          "Ezequías empezó por la casa de Dios: «En el primer año de su reinado, en el mes primero, abrió las puertas de la casa de Jehová, y las reparó». Purificó el templo, restauró la adoración y celebró la Pascua, y «Hubo entonces gran regocijo en Jerusalén».",
      },
      { t: "versiculo", ref: "2 Reyes 22:11" },
      { t: "versiculo", ref: "2 Reyes 23:3" },
      {
        t: "parrafo",
        texto:
          "Con Josías, el avivamiento empezó por la Palabra. Mientras reparaban el templo se halló el libro de la ley, y «cuando el rey hubo oído las palabras del libro de la ley, rasgó sus vestidos». Luego renovó el pacto «con todo el corazón y con toda el alma», y «todo el pueblo confirmó el pacto».",
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      { t: "versiculo", ref: "Nehemías 8:10" },
      {
        t: "parrafo",
        texto:
          "Después del exilio, Esdras leyó la ley ante el pueblo: «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura». El pueblo lloró por su pecado (Nehemías 8:9), y Nehemías le dijo: «el gozo de Jehová es vuestra fuerza».",
      },
      { t: "subtitulo", texto: "Lo que se repite" },
      {
        t: "lista",
        items: [
          "Un líder o un grupo que busca a Dios.",
          "La Palabra redescubierta y explicada.",
          "El arrepentimiento y el quebranto por el pecado.",
          "La adoración restaurada y el pacto renovado.",
          "El gozo, con cambios reales en la vida del pueblo.",
        ],
      },
      { t: "versiculo", ref: "2 Crónicas 7:14" },
      {
        t: "parrafo",
        texto:
          "2 Crónicas 7:14 es la respuesta de Dios a Salomón en la dedicación del templo, una promesa a Israel bajo el antiguo pacto. La iglesia no es una nación ni tiene una tierra prometida, pero el principio sigue vigente para el pueblo de Dios: cuando su pueblo se humilla, ora, busca su rostro y se convierte de sus malos caminos, Dios oye y perdona.",
      },
    ],
    ideaClave:
      "Los avivamientos del Antiguo Testamento, bajo Ezequías, Josías y Esdras y Nehemías, siguen un mismo camino: alguien busca a Dios, la Palabra se redescubre y se explica, el pueblo se arrepiente, la adoración y el pacto se renuevan, y llega el gozo con cambios reales. 2 Crónicas 7:14 fue una promesa a Israel en la dedicación del templo, y su principio sigue vigente para el pueblo de Dios.",
    paraLaVida: {
      texto: "Todo avivamiento bíblico vuelve a la Palabra.",
      pregunta: "¿Qué lugar tiene la lectura clara de la Palabra en tu iglesia, y cómo podría crecer?",
    },
  },
  {
    id: "n5-avivamiento-3",
    objetivos: [
      "Explicar Pentecostés como el cumplimiento de la promesa de Joel.",
      "Describir los frutos de los avivamientos del libro de los Hechos.",
      "Reconocer lo que permanece de esos avivamientos para la iglesia de hoy.",
    ],
    paraEmpezar:
      "El libro de los Hechos es la historia de una iglesia en avivamiento: empieza con un derramamiento del Espíritu y sigue con varios más.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Joel 2:28-29" },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Dios lo había prometido por Joel: «derramaré mi Espíritu sobre toda carne». En Pentecostés, los discípulos estaban «todos unánimes juntos», y «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».",
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "Muchas iglesias pentecostales enseñan que hablar en otras lenguas es la señal inicial del bautismo en el Espíritu, como en Pentecostés. Es un punto de la declaración de fe por confirmar (artículo 9), que se estudia en la materia La persona y obra del Espíritu Santo, del Nivel 3.",
      },
      { t: "versiculo", ref: "Hechos 2:37-41" },
      {
        t: "parrafo",
        texto:
          "El primer fruto fue el arrepentimiento: «se compungieron de corazón» y preguntaron qué hacer. Pedro respondió: «Arrepentíos, y bautícese cada uno de vosotros», y «se añadieron aquel día como tres mil personas».",
      },
      { t: "versiculo", ref: "Hechos 4:31" },
      {
        t: "parrafo",
        texto:
          "El avivamiento se renovó en medio de la persecución: después de orar, «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».",
      },
      { t: "versiculo", ref: "Hechos 8:5-8" },
      { t: "versiculo", ref: "Hechos 19:18-20" },
      {
        t: "parrafo",
        texto:
          "En Samaria, la predicación de Cristo con señales trajo «gran gozo en aquella ciudad». En Éfeso, los creyentes confesaron sus prácticas y quemaron los libros de magia, «y hecha la cuenta de su precio, hallaron que era cincuenta mil piezas de plata». Así «crecía y prevalecía poderosamente la palabra del Señor».",
      },
      { t: "subtitulo", texto: "Lo que permanece" },
      {
        t: "lista",
        items: [
          "La oración unida antes y durante el avivamiento.",
          "La predicación de Cristo con poder y con la Palabra.",
          "El arrepentimiento real, que cambia la conducta y aun el bolsillo.",
          "El gozo, la valentía y una iglesia que crece.",
        ],
      },
    ],
    ideaClave:
      "Pentecostés cumplió la promesa de Joel: el Espíritu se derramó sobre los discípulos unánimes y la iglesia nació con poder. Los avivamientos de Hechos, en Jerusalén, en Samaria y en Éfeso, muestran los mismos frutos: arrepentimiento, conversiones, valentía en la persecución, gozo y una Palabra que crece. Las lenguas como señal inicial del bautismo en el Espíritu son un punto de la declaración de fe por confirmar.",
    paraLaVida: {
      texto: "El mismo Espíritu de Pentecostés sigue obrando hoy.",
      pregunta: "¿Cuál de los frutos de los avivamientos de Hechos necesita más tu congregación?",
    },
  },
  {
    id: "n5-avivamiento-4",
    objetivos: [
      "Ubicar en el tiempo los principales avivamientos desde el siglo XVIII.",
      "Analizar lo que esos avivamientos tienen en común.",
      "Reconocer los frutos que dejaron en la iglesia y en la sociedad.",
    ],
    paraEmpezar: "Dios no dejó de avivar a su iglesia después de Hechos. Conocer esa historia anima la fe y enseña a discernir.",
    bloques: [
      { t: "versiculo", ref: "Salmos 78:4" },
      {
        t: "parrafo",
        texto:
          "El salmista se propone contar «a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo». Esta línea de tiempo resume algunos avivamientos de la historia; la especialidad de Intercesión y oración cuenta el papel de la oración en ellos.",
      },
      { t: "subtitulo", texto: "Una línea de tiempo" },
      {
        t: "lista",
        items: [
          "1727: en Herrnhut, Alemania, la comunidad morava vive un avivamiento durante la Santa Cena; nace una cadena de oración que, según la Iglesia Morava, duró unos cien años, y de allí salen cientos de misioneros.",
          "De 1734 a 1742: el Gran Despertar en las colonias británicas de América, con Jonathan Edwards en Northampton y la predicación de George Whitefield.",
          "Desde 1738: el avivamiento metodista en Inglaterra, con Juan y Carlos Wesley y Whitefield, que predicaban al aire libre a los mineros y a los pobres.",
          "1801: Cane Ridge, en Kentucky, uno de los comienzos del Segundo Gran Despertar en Estados Unidos, que siguió con la predicación de Charles Finney.",
          "1857 y 1858: el avivamiento de oración de Nueva York, que empezó con una reunión de mediodía en la calle Fulton.",
          "1904 y 1905: el avivamiento de Gales, con el joven Evan Roberts.",
          "1906: la calle Azusa, en Los Ángeles, con William J. Seymour, cuna del pentecostalismo moderno.",
          "1907 y 1909: Pyongyang, en Corea, y Valparaíso, en Chile, con el misionero Willis C. Hoover, origen de la Iglesia Metodista Pentecostal de Chile.",
        ],
      },
      { t: "versiculo", ref: "Hebreos 13:8" },
      {
        t: "parrafo",
        texto:
          "Las épocas y los lugares cambian, pero el Señor no: «Jesucristo es el mismo ayer, y hoy, y por los siglos». Por eso los avivamientos se parecen entre sí: oración perseverante, predicación de la Palabra, convicción de pecado, conversiones, santidad, gozo y misión.",
      },
      { t: "subtitulo", texto: "Los frutos en la sociedad" },
      {
        t: "parrafo",
        texto:
          "Los avivamientos verdaderos dejaron frutos que duran. Del avivamiento metodista salieron escuelas, ayuda a los pobres y a los presos, y un impulso contra la esclavitud: en 1791 Juan Wesley escribió su última carta a William Wilberforce para animarlo en su lucha contra el comercio de esclavos. Del avivamiento moravo salió un gran movimiento misionero, y de la calle Azusa, iglesias pentecostales en todo el mundo.",
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "En la calle Azusa se enseñó que hablar en lenguas es la señal inicial del bautismo en el Espíritu. La posición del ministerio sobre esa señal es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "Desde Herrnhut en 1727, pasando por el Gran Despertar, el avivamiento metodista, Cane Ridge, la calle Fulton, Gales, la calle Azusa, Pyongyang y Valparaíso, Dios ha seguido avivando a su iglesia. Los avivamientos se parecen porque el Señor es el mismo: oración, Palabra, convicción de pecado, conversiones, santidad, gozo y misión. Los verdaderos dejan frutos que duran en la iglesia y en la sociedad.",
    paraLaVida: {
      texto: "La historia de lo que Dios hizo alimenta la fe en lo que puede hacer.",
      pregunta: "¿Qué avivamiento de la línea de tiempo te gustaría estudiar más, y por qué?",
    },
  },
  {
    id: "n5-avivamiento-5",
    objetivos: [
      "Explicar el equilibrio entre no apagar al Espíritu y examinarlo todo.",
      "Aplicar las señales de una obra verdadera del Espíritu según Jonathan Edwards.",
      "Reconocer los excesos y las imitaciones que acompañan a los avivamientos.",
    ],
    paraEmpezar:
      "Donde Dios obra con poder también aparecen excesos, imitaciones y engaños. El líder necesita dos cosas a la vez: apertura al Espíritu y discernimiento.",
    bloques: [
      { t: "versiculo", ref: "1 Tesalonicenses 5:19-21" },
      {
        t: "parrafo",
        texto:
          "Pablo da el equilibrio en tres frases: «No apaguéis al Espíritu. No menospreciéis las profecías. Examinadlo todo; retened lo bueno». Un error es apagar lo que Dios hace, por miedo o por frialdad; el otro, aceptar cualquier cosa sin examinarla.",
      },
      { t: "versiculo", ref: "1 Juan 4:1-3" },
      { t: "versiculo", ref: "Mateo 7:15-17" },
      {
        t: "parrafo",
        texto:
          "La prueba principal es Cristo: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios». Y la segunda, el fruto: «Por sus frutos los conoceréis».",
      },
      { t: "subtitulo", texto: "Las señales de una obra verdadera" },
      {
        t: "parrafo",
        texto:
          "En 1741, en medio del Gran Despertar, Jonathan Edwards publicó un estudio sobre las señales de una obra del Espíritu de Dios, basado en 1 Juan 4. Edwards también vio excesos, pero no rechazó la obra por ellos. Sus señales pueden resumirse así:",
      },
      {
        t: "lista",
        items: [
          "Exalta a Jesús como Hijo de Dios y Salvador.",
          "Se opone al reino de Satanás: lleva a dejar el pecado.",
          "Aumenta el amor y el respeto por la Escritura.",
          "Lleva a la verdad, no a la confusión.",
          "Produce amor a Dios y al prójimo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Para Edwards, las lágrimas, los temblores o los gritos no prueban por sí mismos que una obra sea de Dios, ni que no lo sea: la prueba son sus frutos.",
      },
      { t: "versiculo", ref: "1 Corintios 14:33" },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto: "Las manifestaciones del Espíritu no se oponen al orden: «Dios no es Dios de confusión, sino de paz», y «hágase todo decentemente y con orden».",
      },
      { t: "versiculo", ref: "Levítico 10:1-2" },
      {
        t: "nota",
        titulo: "Fuego extraño",
        texto:
          "Nadab y Abiú ofrecieron «fuego extraño, que él nunca les mandó». Es una advertencia para todo ministerio: la presencia de Dios no se fabrica con manipulación de las emociones, con presión para dar dinero ni con espectáculo. Lo que Dios no manda no aviva a su iglesia.",
      },
    ],
    ideaClave:
      "El líder no apaga al Espíritu, pero lo examina todo y retiene lo bueno. Las pruebas son Cristo y el fruto: una obra verdadera exalta a Jesús, aleja del pecado, ama la Escritura, lleva a la verdad y produce amor, como enseñó Jonathan Edwards. Las manifestaciones no prueban nada por sí solas, Dios no es Dios de confusión, y lo que se fabrica con manipulación es fuego extraño.",
    paraLaVida: {
      texto: "Abierto al Espíritu y firme en la Palabra: las dos cosas a la vez.",
      pregunta: "¿Hacia qué error tiende más tu ministerio: apagar al Espíritu o no examinar lo que sucede?",
    },
  },
  {
    id: "n5-avivamiento-6",
    objetivos: [
      "Describir lo que la iglesia hace para buscar el avivamiento.",
      "Planificar cómo sostener los frutos de un avivamiento en la iglesia local.",
      "Evitar los errores que apagan o desvían un avivamiento.",
    ],
    paraEmpezar:
      "El avivamiento es obra soberana de Dios: nadie lo fabrica. Pero la Biblia muestra cómo se lo busca y cómo se cuidan sus frutos.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:14" },
      { t: "versiculo", ref: "Santiago 4:8" },
      {
        t: "parrafo",
        texto:
          "Antes de Pentecostés, los discípulos «perseveraban unánimes en oración y ruego». Dios promete: «Acercaos a Dios, y él se acercará a vosotros», y a la vez pide limpieza: «Pecadores, limpiad las manos; y vosotros los de doble ánimo, purificad vuestros corazones».",
      },
      { t: "versiculo", ref: "Oseas 10:12" },
      {
        t: "parrafo",
        texto:
          "Oseas lo llama preparar la tierra: «haced para vosotros barbecho; porque es el tiempo de buscar a Jehová». La iglesia ora, se arrepiente y vuelve a la Palabra, y espera a Dios sin fabricar nada.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3clgkz-40Sw", titulo: "Qué significa la idea de santidad en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Sostener los frutos" },
      { t: "versiculo", ref: "Hechos 2:42" },
      {
        t: "parrafo",
        texto:
          "Después de Pentecostés, los nuevos creyentes no quedaron sueltos: «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Juan Wesley hizo lo mismo con las clases metodistas, pequeños grupos donde cada uno daba cuenta de su vida espiritual. Sin discipulado, los frutos de un avivamiento se pierden.",
      },
      { t: "versiculo", ref: "Mateo 9:37-38" },
      {
        t: "parrafo",
        texto:
          "Un avivamiento trae cosecha, y la cosecha pide obreros: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies». Por eso la iglesia en avivamiento forma líderes y envía misioneros.",
      },
      { t: "versiculo", ref: "Gálatas 6:9" },
      {
        t: "nota",
        titulo: "Errores que apagan el avivamiento",
        texto:
          "Convertirlo en un evento que se anuncia y se programa, buscar las manifestaciones más que a Dios, depender de una sola persona, despreciar la doctrina o dejar a los nuevos sin discipulado. Y para los que esperan y todavía no ven fruto: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos».",
      },
    ],
    ideaClave:
      "El avivamiento es obra de Dios, pero la iglesia lo busca con oración unida, arrepentimiento, limpieza del corazón y la Palabra, preparando la tierra sin fabricar nada. Sus frutos se sostienen con discipulado, como en Hechos 2:42 y en las clases metodistas, y con la formación y el envío de obreros. Se apaga cuando se vuelve un evento, una persona o una búsqueda de manifestaciones.",
    paraLaVida: {
      texto: "Prepara la tierra hoy; la lluvia la manda Dios.",
      pregunta: "¿Qué paso concreto darás este mes para preparar tu vida y tu iglesia para un avivamiento?",
    },
  },
];
