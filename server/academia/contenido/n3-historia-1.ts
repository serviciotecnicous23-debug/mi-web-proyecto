/**
 * Nivel 3 · Materia 9 — Historia de la iglesia I (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts): los títulos de libros y
 * las palabras de otros autores van sin comillas.
 * De Pentecostés a la víspera de la Reforma: la iglesia de los apóstoles, los mártires, la defensa de la fe, el canon y
 * los credos, Constantino y los concilios, Agustín y la Edad Media, y los que pidieron volver a la Biblia. Fechas y
 * hechos comprobados en González, Historia del cristianismo (Unilit), y Hurlbut, Historia de la iglesia cristiana
 * (Vida). La Reforma, los avivamientos y la iglesia en América Latina son la materia Historia de la iglesia II (Nivel 4).
 */
import type { LeccionContenido } from "../tipos";

export const N3_HISTORIA_1: LeccionContenido[] = [
  {
    id: "n3-historia-1-1",
    objetivos: [
      "Describir el nacimiento de la iglesia en Pentecostés y su vida en los primeros años.",
      "Explicar cómo se extendió el evangelio de Jerusalén al mundo romano.",
      "Reconocer a los Padres apostólicos y por qué estudiamos la historia de la iglesia.",
    ],
    paraEmpezar:
      "Jesús prometió edificar su iglesia. Veinte siglos después, la iglesia sigue en pie. Estudiar su historia es ver cómo Cristo cumplió su promesa, a pesar de las persecuciones, los errores y las divisiones.",
    bloques: [
      { t: "versiculo", ref: "Mateo 16:18" },
      {
        t: "parrafo",
        texto:
          "La historia de la iglesia es la historia de esa promesa: «las puertas del Hades no prevalecerán contra ella». La estudiamos para saber de dónde venimos, para aprender de los aciertos y de los errores de los que nos precedieron y para dar gracias a Dios. Esta materia va de Pentecostés a la víspera de la Reforma; la Reforma, los avivamientos y la iglesia en América Latina se estudian en Historia de la iglesia II, en el Nivel 4.",
      },
      { t: "subtitulo", texto: "Jerusalén: el nacimiento de la iglesia" },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "parrafo",
        texto:
          "En la fiesta de Pentecostés, cincuenta días después de la Pascua en que murió Jesús, el Espíritu Santo vino sobre los discípulos, Pedro predicó y se añadieron «como tres mil personas». Los primeros creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Eran judíos que creían que Jesús es el Mesías, y se reunían en el templo y en las casas.",
      },
      { t: "subtitulo", texto: "De Jerusalén al mundo" },
      { t: "versiculo", ref: "Hechos 8:4" },
      {
        t: "parrafo",
        texto:
          "La persecución que empezó con la muerte de Esteban esparció a los creyentes, y los que fueron esparcidos «iban por todas partes anunciando el evangelio». En Antioquía de Siria nació una iglesia de judíos y gentiles, y allí «a los discípulos se les llamó cristianos por primera vez». De Antioquía salieron Pablo y Bernabé, y en pocos años había iglesias en Asia Menor, en Grecia y en Roma.",
      },
      { t: "versiculo", ref: "Hechos 11:26" },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "parrafo",
        texto:
          "Varias cosas ayudaron a que el mensaje avanzara: los caminos y la paz del Imperio romano, el griego como lengua común y las sinagogas judías esparcidas por el mundo, donde Pablo solía empezar a predicar. Pero el motor fue el Espíritu Santo y el testimonio de creyentes comunes, como Jesús lo había anunciado: «me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».",
      },
      { t: "versiculo", ref: "Hechos 1:8" },
      { t: "subtitulo", texto: "Después de los apóstoles" },
      {
        t: "parrafo",
        texto:
          "En el año 70, los romanos destruyeron Jerusalén y su templo. Para entonces, el evangelio ya se había extendido por buena parte del Imperio. A los maestros de la generación que siguió a los apóstoles se les llama Padres apostólicos: entre ellos, Clemente de Roma, que escribió una carta a los corintios hacia el año 96; Ignacio de Antioquía, que escribió siete cartas camino del martirio en Roma; y Policarpo, obispo de Esmirna. Sus escritos son valiosos, pero no forman parte de la Biblia.",
      },
      {
        t: "nota",
        titulo: "Por qué nos importa",
        texto:
          "La iglesia no empezó con nosotros: somos parte de una gran nube de testigos (Hebreos 12:1). Conocer su historia nos hace humildes, agradecidos y firmes en la fe.",
      },
    ],
    ideaClave:
      "La iglesia nació en Pentecostés y, con el poder del Espíritu, se extendió de Jerusalén a Antioquía y al mundo romano, como Jesús lo anunció en Hechos 1:8. Después de los apóstoles enseñaron los Padres apostólicos, como Clemente, Ignacio y Policarpo. Estudiar esta historia es ver a Cristo cumplir su promesa de edificar su iglesia.",
    paraLaVida: {
      texto: "Eres parte de una historia de veinte siglos que Cristo mismo sigue escribiendo.",
      pregunta: "¿Quién te habló de Cristo, y quién le habló a esa persona? ¿Qué te dice eso de la historia de la iglesia?",
    },
  },
  {
    id: "n3-historia-1-2",
    objetivos: [
      "Describir las principales persecuciones del Imperio romano contra la iglesia, de Nerón a Diocleciano.",
      "Explicar por qué perseguían a los cristianos y cómo respondieron ellos.",
      "Aplicar el ejemplo de los mártires a la fidelidad de cada día.",
    ],
    paraEmpezar:
      "Para los romanos, honrar a los dioses y al emperador era parte de ser un buen ciudadano. Los cristianos adoraban a un solo Dios y confesaban que Jesús es el Señor. Por eso muchos pagaron con su vida.",
    bloques: [
      { t: "versiculo", ref: "Apocalipsis 2:8-10" },
      {
        t: "parrafo",
        texto:
          "A la iglesia de Esmirna, Jesús le dijo: «Sé fiel hasta la muerte, y yo te daré la corona de la vida». Durante casi tres siglos, ser cristiano podía costar la vida. A los que murieron por su fe los llamamos mártires, una palabra que viene del griego y significa testigos.",
      },
      { t: "subtitulo", texto: "Por qué los perseguían" },
      {
        t: "parrafo",
        texto:
          "Las persecuciones no fueron continuas ni ocurrieron en todo el Imperio a la vez: hubo épocas de calma y épocas de violencia. A los cristianos los acusaban falsamente de ateos, porque no adoraban a los dioses, y de enemigos del Imperio, porque no ofrecían sacrificios al emperador. También corrían rumores falsos sobre sus reuniones. En el fondo, el conflicto era quién es el Señor.",
      },
      { t: "subtitulo", texto: "De Nerón a Diocleciano" },
      {
        t: "lista",
        items: [
          "Nerón (año 64): culpó a los cristianos del incendio de Roma. Según una tradición antigua, Pedro y Pablo murieron en Roma en esos años.",
          "Policarpo, obispo de Esmirna (hacia el año 155): cuando le exigieron que maldijera a Cristo, respondió que lo había servido ochenta y seis años y que nunca le había hecho ningún mal; ¿cómo iba a negar a su Rey, que lo salvó?",
          "Perpetua y Felicidad (año 203, en Cartago): dos jóvenes recién convertidas, Perpetua, que amamantaba a su hijo, y Felicidad, una esclava que dio a luz en la cárcel, murieron antes que negar a Cristo.",
          "Decio (año 250): ordenó que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado. Muchos resistieron; otros negaron la fe por miedo.",
          "Diocleciano (desde el año 303): la gran persecución, la más dura. Se destruyeron templos, se quemaron Escrituras y se encarceló y mató a muchos creyentes.",
        ],
      },
      { t: "subtitulo", texto: "Cómo respondieron" },
      { t: "versiculo", ref: "Hechos 7:59-60" },
      {
        t: "parrafo",
        texto:
          "Los mártires no respondieron con odio. Siguieron el ejemplo de Esteban, que murió orando: «Señor, no les tomes en cuenta este pecado», y la palabra de Pedro: el que padece como cristiano, «no se avergüence, sino glorifique a Dios por ello».",
      },
      { t: "versiculo", ref: "1 Pedro 4:12-16" },
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "parrafo",
        texto:
          "Tertuliano, un maestro cristiano de Cartago, escribió hacia el año 197 que la sangre de los cristianos es semilla: cuanto más los perseguían, más crecía la iglesia. La fidelidad de los mártires fue uno de los testimonios más poderosos del evangelio.",
      },
      {
        t: "nota",
        titulo: "Los perseguidos de hoy",
        texto:
          "La persecución no es solo cosa del pasado: hoy también hay creyentes encarcelados o muertos por su fe en muchos países. Ora por ellos, como pide Hebreos 13:3, y pide a Dios fidelidad en las pruebas pequeñas de cada día.",
      },
    ],
    ideaClave:
      "Durante casi tres siglos, de Nerón (64) a Diocleciano (303), la iglesia sufrió persecuciones porque confesaba que Jesús, y no el emperador, es el Señor. Los mártires, como Policarpo, Perpetua y Felicidad, fueron fieles hasta la muerte sin responder con odio, y su testimonio hizo crecer a la iglesia: la sangre de los cristianos es semilla.",
    paraLaVida: {
      texto: "La fidelidad de los mártires empieza en las decisiones pequeñas de cada día.",
      pregunta: "¿En qué situación de tu vida te cuesta confesar a Cristo, y qué te enseña el ejemplo de los mártires?",
    },
  },
  {
    id: "n3-historia-1-3",
    objetivos: [
      "Describir la obra de los apologistas y de Ireneo frente a las falsas enseñanzas.",
      "Explicar cómo reconoció la iglesia los libros del Nuevo Testamento.",
      "Valorar los credos antiguos como resúmenes de la fe bíblica, bajo la autoridad de la Escritura.",
    ],
    paraEmpezar:
      "Además de la persecución de afuera, la iglesia enfrentó un peligro de adentro: maestros que mezclaban el evangelio con otras ideas. Judas ya había escrito que había que contender por la fe.",
    bloques: [
      { t: "versiculo", ref: "Judas 1:3" },
      {
        t: "parrafo",
        texto:
          "Judas exhorta a contender «ardientemente por la fe que ha sido una vez dada a los santos». En el siglo II, la iglesia tuvo que hacerlo en dos frentes: responder a las acusaciones de los paganos y enfrentar las falsas enseñanzas que surgían entre los que se llamaban cristianos.",
      },
      { t: "subtitulo", texto: "Los apologistas" },
      { t: "versiculo", ref: "1 Pedro 3:15" },
      {
        t: "parrafo",
        texto:
          "Pedro pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia». De la palabra griega que se traduce defensa, apología, viene el nombre de los apologistas, que escribieron para defender la fe. El más conocido es Justino Mártir, un filósofo que se convirtió a Cristo, escribió sus apologías hacia el año 150 y murió como mártir en Roma.",
      },
      { t: "subtitulo", texto: "Contra las falsas enseñanzas" },
      {
        t: "parrafo",
        texto:
          "Los gnósticos enseñaban que la materia es mala y que la salvación viene de un conocimiento secreto para unos pocos; muchos negaban que Jesús hubiera tenido un cuerpo verdadero. Marción, hacia el año 144, rechazó el Antiguo Testamento y se quedó solo con parte del Evangelio de Lucas y diez cartas de Pablo. Ireneo, obispo de Lyon y discípulo de Policarpo, escribió hacia el año 180 su obra Contra las herejías y mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles.",
      },
      { t: "versiculo", ref: "1 Juan 4:2-3" },
      {
        t: "parrafo",
        texto:
          "Juan ya había dado la prueba: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».",
      },
      { t: "subtitulo", texto: "El canon del Nuevo Testamento" },
      { t: "versiculo", ref: "2 Pedro 3:15-16" },
      {
        t: "parrafo",
        texto:
          "Frente a esas confusiones, la iglesia necesitaba saber con claridad qué libros eran Escritura. Ya Pedro contaba las cartas de Pablo junto a «las otras Escrituras». La iglesia no inventó el canon: reconoció los libros que Dios había inspirado, por su origen apostólico, su enseñanza fiel y su uso en las iglesias de todas partes. En el año 367, Atanasio de Alejandría escribió la lista de los 27 libros del Nuevo Testamento que tenemos hoy, y los concilios de Hipona (393) y de Cartago (397) reconocieron la misma lista.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=uMOc-YI0iaM", titulo: "¿Qué es la Biblia? ¿Cómo se formó? y, ¿cuál es su propósito?", fuente: "Proyecto Biblia" },
      { t: "subtitulo", texto: "Los credos" },
      { t: "versiculo", ref: "2 Timoteo 1:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo le pidió a Timoteo: «Retén la forma de las sanas palabras». Desde muy temprano, la iglesia resumió su fe en fórmulas breves que se confesaban en el bautismo. De una de ellas, usada en Roma en el siglo II, viene el Credo apostólico, cuya forma actual quedó fijada siglos después. No lo escribieron los apóstoles, pero resume lo que ellos enseñaron: un solo Dios, Padre, Hijo y Espíritu Santo, y la obra de Cristo.",
      },
      {
        t: "nota",
        titulo: "La Biblia, por encima de los credos",
        texto:
          "Los credos son útiles porque resumen la fe, pero su autoridad viene de que dicen lo que dice la Biblia. Solo la Escritura es la Palabra inspirada de Dios (2 Timoteo 3:16).",
      },
    ],
    ideaClave:
      "En el siglo II la iglesia defendió la fe: los apologistas, como Justino, respondieron a los paganos, e Ireneo enfrentó a los gnósticos y a Marción. La iglesia reconoció los 27 libros inspirados del Nuevo Testamento, que Atanasio listó en el año 367, y resumió su fe en credos como el Apostólico, siempre bajo la autoridad de la Escritura.",
    paraLaVida: {
      texto: "Conocer bien la fe te ayuda a defenderla con mansedumbre y reverencia.",
      pregunta: "¿Qué enseñanza falsa de hoy se parece a las que enfrentó la iglesia antigua, y cómo la responderías con la Biblia?",
    },
  },
  {
    id: "n3-historia-1-4",
    objetivos: [
      "Explicar el cambio que trajo Constantino para la iglesia, con sus bendiciones y sus peligros.",
      "Resumir lo que confesaron los concilios de Nicea, Constantinopla y Calcedonia sobre Cristo y el Espíritu Santo.",
      "Valorar la defensa de la deidad de Cristo frente al arrianismo.",
    ],
    paraEmpezar:
      "En pocos años, la iglesia pasó de ser perseguida a ser favorecida por el emperador. Fue un alivio enorme, pero también trajo peligros nuevos.",
    bloques: [
      {
        t: "parrafo",
        texto:
          "En el año 312, Constantino venció a su rival en la batalla del puente Milvio y atribuyó la victoria al Dios de los cristianos. En el 313, con el Edicto de Milán, se dio libertad de culto en el Imperio y terminaron las persecuciones. Más tarde, en el año 380, el emperador Teodosio hizo del cristianismo la religión oficial del Imperio.",
      },
      { t: "versiculo", ref: "Juan 18:36" },
      {
        t: "parrafo",
        texto:
          "La libertad fue una bendición: se pudieron construir templos, copiar las Escrituras y predicar abiertamente. Pero, cuando ser cristiano empezó a dar ventajas, muchos entraron a la iglesia sin una conversión verdadera, y el poder político empezó a mezclarse con la iglesia. Jesús había dicho: «Mi reino no es de este mundo».",
      },
      { t: "subtitulo", texto: "Arrio y el Concilio de Nicea" },
      { t: "versiculo", ref: "Juan 1:1-3" },
      {
        t: "parrafo",
        texto:
          "Arrio, un presbítero de Alejandría, enseñaba que el Hijo era la primera y más alta criatura de Dios, pero no Dios eterno: decía que hubo un tiempo en que el Hijo no existía. En el año 325 se reunió el Concilio de Nicea, el primer concilio general de la iglesia, y confesó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios. Así afirmaba lo que dice Juan: «el Verbo era Dios».",
      },
      {
        t: "parrafo",
        texto:
          "La lucha siguió durante décadas. Atanasio, obispo de Alejandría, defendió la deidad de Cristo aunque fue desterrado cinco veces. Él sabía lo que estaba en juego: si Cristo no es Dios, no puede salvarnos.",
      },
      { t: "subtitulo", texto: "Constantinopla y Calcedonia" },
      { t: "versiculo", ref: "Juan 1:14" },
      {
        t: "parrafo",
        texto:
          "En el año 381, el Concilio de Constantinopla completó el credo de Nicea y confesó la deidad del Espíritu Santo, que con el Padre y el Hijo es adorado y glorificado. En el 451, el Concilio de Calcedonia confesó que Jesucristo es una sola persona, verdadero Dios y verdadero hombre, en dos naturalezas, sin mezcla y sin división. Es lo que enseña Juan: «Y aquel Verbo fue hecho carne, y habitó entre nosotros».",
      },
      { t: "versiculo", ref: "Colosenses 2:8-9" },
      { t: "video", url: "https://www.youtube.com/watch?v=AG4jqCUapng", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Por qué importan los concilios",
        texto:
          "Los concilios no añadieron verdades a la Biblia: pusieron en palabras claras lo que la Escritura enseña sobre Cristo y la Trinidad, frente a errores que lo negaban. Los recibimos porque son fieles a la Escritura, que es la autoridad final.",
      },
    ],
    ideaClave:
      "Con Constantino y el Edicto de Milán (313) terminaron las persecuciones, pero el poder político se mezcló con la iglesia. Frente a Arrio, el Concilio de Nicea (325) confesó que el Hijo es verdadero Dios; el de Constantinopla (381), la deidad del Espíritu Santo, y el de Calcedonia (451), que Cristo es verdadero Dios y verdadero hombre.",
    paraLaVida: {
      texto: "La fe que confiesas sobre Cristo fue defendida con sacrificio: atesórala y apréndela bien.",
      pregunta: "¿Cómo le explicarías a alguien, con Juan 1:1 y 1:14, que Jesús es verdadero Dios y verdadero hombre?",
    },
  },
  {
    id: "n3-historia-1-5",
    objetivos: [
      "Describir la vida de Agustín y su enseñanza sobre la gracia.",
      "Explicar el papel de los monasterios y de las misiones en la Edad Media.",
      "Analizar los cambios de la iglesia medieval: el poder del papado, el cisma de 1054 y las cruzadas.",
    ],
    paraEmpezar:
      "Un joven brillante del norte de África buscó la verdad en la filosofía y en los placeres, hasta que un día, en un jardín de Milán, leyó unas palabras de la carta a los Romanos que cambiaron su vida.",
    bloques: [
      { t: "versiculo", ref: "Romanos 13:13-14" },
      {
        t: "parrafo",
        texto:
          "Agustín (354-430) nació en Tagaste, en el norte de África. Su madre, Mónica, oró por él durante años. En el año 386, en Milán, oyó una voz de niño que decía: toma y lee. Abrió las cartas de Pablo y leyó: «no en glotonerías y borracheras, no en lujurias y lascivias, no en contiendas y envidia, sino vestíos del Señor Jesucristo». Se convirtió, fue bautizado y llegó a ser obispo de Hipona.",
      },
      { t: "versiculo", ref: "Efesios 2:8-9" },
      {
        t: "parrafo",
        texto:
          "En sus Confesiones contó su conversión como una obra de la gracia de Dios. Frente a Pelagio, que enseñaba que el ser humano puede obedecer a Dios con sus propias fuerzas, Agustín enseñó que la salvación es por gracia, como dice Pablo: «por gracia sois salvos por medio de la fe». Cuando Roma fue saqueada en el año 410, escribió La ciudad de Dios: los imperios caen, pero el reino de Dios permanece.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Los monjes y las misiones" },
      {
        t: "parrafo",
        texto:
          "Cuando ser cristiano se volvió común, algunos creyentes buscaron una vida más entregada apartándose del mundo. Antonio de Egipto se fue al desierto a fines del siglo III, y más tarde Benito de Nursia escribió, hacia el año 530, una regla para los monasterios que ordenaba la vida en oración, lectura y trabajo. Durante siglos, los monasterios copiaron la Biblia a mano y fueron centros de estudio y de ayuda a los pobres.",
      },
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "La misión siguió: Patricio llevó el evangelio a Irlanda en el siglo V, y Bonifacio predicó en Germania en el siglo VIII. Así se cumplía el mandato: «id, y haced discípulos a todas las naciones».",
      },
      { t: "subtitulo", texto: "La iglesia en la Edad Media" },
      {
        t: "parrafo",
        texto:
          "En el año 476 cayó el Imperio romano de Occidente, y la iglesia quedó como la institución más fuerte de Europa. El obispo de Roma, el papa, fue reuniendo cada vez más poder, también político. En el año 1054, las iglesias de Oriente y de Occidente se separaron en el gran cisma, del que vienen la Iglesia ortodoxa y la Iglesia católica romana. Y desde 1095 se lanzaron las cruzadas para tomar Jerusalén por las armas, con mucha violencia.",
      },
      {
        t: "nota",
        titulo: "Luces y sombras",
        texto:
          "La Edad Media tuvo creyentes fieles, misioneros y estudiosos de la Biblia, pero también errores graves: la mezcla de la iglesia con el poder, la venta de cargos y la violencia en nombre de Cristo. La historia nos enseña a examinarlo todo a la luz de la Escritura.",
      },
    ],
    ideaClave:
      "Agustín (354-430) se convirtió al leer Romanos 13 y enseñó, frente a Pelagio, que la salvación es por gracia. Los monasterios copiaron y guardaron la Biblia, y misioneros como Patricio y Bonifacio llevaron el evangelio por Europa. En la Edad Media creció el poder del papado, Oriente y Occidente se separaron en 1054 y hubo cruzadas violentas.",
    paraLaVida: {
      texto: "Dios sigue llamando por su Palabra, como llamó a Agustín.",
      pregunta: "¿Qué pasaje de la Biblia te habló de manera especial en tu conversión o en tu vida con Dios?",
    },
  },
  {
    id: "n3-historia-1-6",
    objetivos: [
      "Describir a Pedro Valdo, Juan Wiclef y Juan Hus y su amor por la Biblia.",
      "Explicar cómo la imprenta y el estudio del griego prepararon la Reforma.",
      "Evaluar qué podemos aprender de quienes obedecieron a Dios antes que a los hombres.",
    ],
    paraEmpezar:
      "Durante siglos, la mayoría de los creyentes de Europa no podía leer la Biblia: estaba en latín, los libros eran caros y pocos sabían leer. Pero Dios levantó a hombres que quisieron volver a su Palabra.",
    bloques: [
      { t: "versiculo", ref: "Salmos 119:105" },
      {
        t: "parrafo",
        texto:
          "«Lámpara es a mis pies tu palabra». A fines de la Edad Media, varias voces pidieron que la iglesia volviera a la Escritura y que el pueblo pudiera leerla en su propia lengua. Fueron perseguidas, pero prepararon el camino de la Reforma.",
      },
      { t: "subtitulo", texto: "Pedro Valdo y los valdenses" },
      { t: "versiculo", ref: "Hechos 5:29" },
      {
        t: "parrafo",
        texto:
          "Pedro Valdo era un comerciante rico de Lyon, en Francia. Hacia el año 1173 dejó sus riquezas, hizo traducir partes de la Biblia a la lengua del pueblo y comenzó a predicar con otros. Cuando les prohibieron predicar sin permiso, siguieron predicando, convencidos de que «Es necesario obedecer a Dios antes que a los hombres», y fueron condenados y perseguidos.",
      },
      { t: "subtitulo", texto: "Juan Wiclef y Juan Hus" },
      {
        t: "parrafo",
        texto:
          "Juan Wiclef (hacia 1330-1384), profesor en Oxford, Inglaterra, enseñó que la Biblia es la autoridad suprema para la iglesia, por encima del papa, y criticó la riqueza del clero. Sus seguidores tradujeron por primera vez toda la Biblia al inglés. Por eso lo llamaron después la estrella de la mañana de la Reforma.",
      },
      {
        t: "parrafo",
        texto:
          "En Praga, Juan Hus (hacia 1372-1415) leyó los escritos de Wiclef y predicó en la lengua del pueblo contra los abusos de la iglesia. Lo llamaron al Concilio de Constanza con la promesa de que volvería a salvo, pero lo condenaron y lo quemaron en la hoguera el 6 de julio de 1415. Murió orando y confiando en Cristo.",
      },
      { t: "subtitulo", texto: "La imprenta y el umbral de la Reforma" },
      {
        t: "parrafo",
        texto:
          "Hacia el año 1455, Juan Gutenberg imprimió en Alemania la primera Biblia con tipos móviles, y los libros empezaron a ser más baratos y a circular más. En 1516, Erasmo publicó el Nuevo Testamento en griego, y los estudiosos pudieron leerlo en su idioma original. El 31 de octubre de 1517, Martín Lutero publicó sus 95 tesis en Wittenberg: así comenzó la Reforma, que se estudia en Historia de la iglesia II.",
      },
      { t: "versiculo", ref: "Isaías 40:8" },
      {
        t: "nota",
        titulo: "La Biblia en nuestra lengua",
        texto:
          "La Biblia que usamos viene de esa misma historia: Casiodoro de Reina tradujo la Biblia completa al español y la publicó en 1569, y Cipriano de Valera revisó su traducción en 1602. La Reina-Valera de 1960 es una revisión de aquella obra. «Mas la palabra del Dios nuestro permanece para siempre».",
      },
      { t: "versiculo", ref: "Hebreos 13:7-8" },
      {
        t: "parrafo",
        texto:
          "Hebreos pide: «Acordaos de vuestros pastores, que os hablaron la palabra de Dios; considerad cuál haya sido el resultado de su conducta, e imitad su fe». Y añade: «Jesucristo es el mismo ayer, y hoy, y por los siglos». Es el versículo de memoria de esta materia: el mismo Cristo que sostuvo a la iglesia durante veinte siglos te sostiene hoy.",
      },
    ],
    ideaClave:
      "Antes de la Reforma, Pedro Valdo, Juan Wiclef y Juan Hus pidieron volver a la Biblia y ponerla en la lengua del pueblo, y obedecieron a Dios antes que a los hombres aunque los persiguieron. La imprenta (hacia 1455) y el Nuevo Testamento griego de Erasmo (1516) prepararon el camino, y en 1517 comenzó la Reforma. Jesucristo es el mismo ayer, y hoy, y por los siglos.",
    paraLaVida: {
      texto: "Hoy tienes la Biblia en tu idioma y en tu teléfono: muchos dieron la vida para que así fuera.",
      pregunta: "¿Cómo vas a honrar ese regalo esta semana en tu lectura de la Biblia?",
    },
  },
];
