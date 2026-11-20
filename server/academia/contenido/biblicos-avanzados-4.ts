/**
 * Especialidad Estudios bíblicos avanzados · Materia 4 — Geografía e historia bíblica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La tierra y la historia de la Biblia, de los patriarcas al mundo romano, con tres esquemas. Datos comprobados: las cinco
 * franjas de la tierra; el mar Muerto, a unos 440 metros bajo el nivel del mar y bajando; las lluvias temprana y tardía; el
 * camino real (Números 20:17); las dos fechas que se proponen para el éxodo (hacia el 1446 o hacia el 1270 al 1250 a. C.);
 * David hacia el 1010 al 970 y Salomón hacia el 970 al 931; la división del reino en el 931 o 930; Samaria en el 722;
 * Jerusalén en el 587 o 586; Babilonia cae en el 539; el templo se termina en el 515; Nehemías en el 445; Issos en el 333;
 * Antíoco IV en el 167 y la dedicación en el 164; Pompeyo en el 63; Herodes del 37 al 4 a. C.; Augusto, Tiberio y Pilato; el
 * año 15 de Tiberio hacia el 28 o 29 d. C.; el templo destruido en el 70. Las fechas antiguas son aproximadas.
 */
import type { LeccionContenido } from "../tipos";

export const BIBLICOS_AVANZADOS_4: LeccionContenido[] = [
  {
    id: "biblicos-avanzados-4-1",
    objetivos: [
      "Describir las cinco franjas de la tierra de Israel, de oeste a este, y su clima.",
      "Explicar por qué la tierra dependía de la lluvia y cómo eso enseñaba a confiar en Dios (Deuteronomio 11:10-12).",
      "Usar la geografía para entender mejor un pasaje bíblico.",
    ],
    paraEmpezar:
      "Dios no escogió para su pueblo un desierto ni un imperio, sino una franja pequeña de tierra entre el mar y el desierto, en el puente entre Egipto y Mesopotamia. Por allí pasaban los ejércitos y los comerciantes. Conocer sus montes, sus valles, sus caminos y sus lluvias ayuda a entender muchas páginas de la Biblia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Deuteronomio 8:7-9" },
      {
        t: "parrafo",
        texto:
          "Moisés describe la tierra prometida: «tierra de arroyos, de aguas, de fuentes y de manantiales», «tierra de trigo y cebada, de vides, higueras y granados; tierra de olivos, de aceite y de miel». Era buena, pero no era fácil.",
      },
      { t: "versiculo", ref: "Deuteronomio 11:10-12" },
      {
        t: "parrafo",
        texto:
          "No era como Egipto, que se regaba con el río Nilo. Era «tierra de montes y de vegas, que bebe las aguas de la lluvia del cielo; tierra de la cual Jehová tu Dios cuida». Vivir allí era aprender a depender de Dios cada año.",
      },
      { t: "versiculo", ref: "Salmos 125:2" },
      {
        t: "parrafo",
        texto:
          "La geografía también enseña: «Como Jerusalén tiene montes alrededor de ella, Así Jehová está alrededor de su pueblo». Los peregrinos que subían a la ciudad veían los montes y recordaban la protección de Dios.",
      },
      {
        t: "cuadro",
        titulo: "Las cinco franjas de la tierra, de oeste a este",
        columnas: ["Región", "Cómo es", "Lugares bíblicos"],
        filas: [
          ["Llanura costera", "Tierra baja junto al mar, por donde pasaba la gran ruta de la costa", "Jope y Cesarea"],
          ["Sefela", "Colinas bajas entre la costa y los montes", "El valle de Ela"],
          ["Región montañosa central", "Montes donde estaban muchas de las ciudades principales", "Jerusalén, Belén y Siquem"],
          ["Valle del Jordán", "Una gran depresión, con el mar de Galilea y el mar Muerto", "Jericó"],
          ["Transjordania", "Mesetas al este del Jordán, por donde pasaba el camino real", "Moab y Galaad"],
        ],
      },
      { t: "subtitulo", texto: "El clima y los caminos" },
      {
        t: "lista",
        items: [
          "Las lluvias caen de octubre a mayo: la temprana al empezar, la tardía al final y la mayor parte en el invierno; el verano es seco (Deuteronomio 11:14).",
          "El mar Muerto está a unos 440 metros bajo el nivel del mar, y baja más de un metro cada año: es la tierra firme más baja del planeta.",
          "Por la costa pasaba la gran ruta internacional entre Egipto y Mesopotamia, que hoy muchos llaman la Vía del Mar, por Isaías 9:1.",
          "Por Transjordania pasaba el camino real, el que Moisés pidió usar para cruzar Edom (Números 20:17).",
          "Al norte, el mar de Galilea y su región fértil; al sur, el Neguev, seco y de pastoreo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: Egipto y la tierra prometida" },
      {
        t: "lista",
        items: [
          "Egipto dependía del río y del trabajo del hombre para regar; la tierra prometida dependía de la lluvia del cielo (Deuteronomio 11:10-11).",
          "En Egipto el pueblo era esclavo; en la tierra prometida debía vivir libre, pero obediente y confiado.",
          "Por eso la sequía en la Biblia muchas veces es un llamado a volver a Dios, como en los días de Elías (1 Reyes 17:1).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el buen samaritano y el camino de Jericó" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Lucas 10:30: un hombre descendía de Jerusalén a Jericó.",
          "Paso 2, buscar la geografía: Jerusalén está en los montes, y Jericó en el valle del Jordán, cerca del mar Muerto.",
          "Paso 3, notar la bajada: en unos 25 kilómetros el camino baja más de mil metros, por un desierto de rocas.",
          "Paso 4, entender el peligro: era un camino solitario, ideal para los ladrones.",
          "Paso 5, ver cómo la geografía hace más vivo el relato: el samaritano se detuvo en un lugar peligroso.",
          "Paso 6, aplicar: el amor al prójimo se arriesga, aun en los caminos difíciles.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Un mapa en la mano cambia una clase. Cada vez que leas un pasaje con lugares, ubica en el mapa dónde pasa, si se sube o se baja, si es costa, monte o desierto, y pregunta qué añade eso al relato.",
      },
    ],
    ideaClave:
      "La tierra de la Biblia es una franja pequeña entre el mar y el desierto, con cinco regiones de oeste a este: la llanura costera, la Sefela, los montes centrales, el valle del Jordán, con el mar Muerto a unos 440 metros bajo el nivel del mar, y Transjordania. Era una buena tierra (Deuteronomio 8:7-9) que bebía de la lluvia del cielo y enseñaba a depender de Dios (Deuteronomio 11:10-12).",
    paraLaVida: {
      texto: "Leo la Biblia con un mapa en la mano y aprendo a depender de Dios, que cuida su tierra y a su pueblo.",
      pregunta: "¿Qué pasaje bíblico que conoces podrías entender mejor si miras dónde ocurrió?",
    },
  },
  {
    id: "biblicos-avanzados-4-2",
    objetivos: [
      "Ubicar en el tiempo a los patriarcas, el éxodo, la conquista y el reino de David y Salomón.",
      "Comparar las dos fechas que se proponen para el éxodo, con sus razones.",
      "Explicar cómo la historia de Israel muestra la fidelidad de Dios a su promesa a Abraham.",
    ],
    paraEmpezar:
      "La historia de Israel empieza con un llamado: Dios dijo a Abram que dejara su tierra. Siguen siglos de promesa, esclavitud y liberación, hasta que el pueblo se establece en la tierra y tiene un rey. Las fechas antiguas no siempre son exactas, pero el hilo es claro: Dios cumple lo que promete.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Génesis 12:1" },
      {
        t: "parrafo",
        texto:
          "Todo empieza con una palabra de Dios: «Vete de tu tierra y de tu parentela, y de la casa de tu padre, a la tierra que te mostraré». Abram salió de Ur de los caldeos, pasó por Harán y llegó a Canaán (Génesis 11:31; 12:5).",
      },
      { t: "versiculo", ref: "Éxodo 12:40-41" },
      {
        t: "parrafo",
        texto:
          "La familia de Jacob bajó a Egipto en tiempo de hambre, y allí se multiplicó. «El tiempo que los hijos de Israel habitaron en Egipto fue cuatrocientos treinta años», hasta que Dios los sacó con mano fuerte.",
      },
      { t: "versiculo", ref: "1 Reyes 6:1" },
      {
        t: "parrafo",
        texto:
          "Este versículo une el éxodo con el reino: Salomón empezó el templo «En el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto, el cuarto año del principio del reino de Salomón». Con él se calcula una de las fechas del éxodo.",
      },
      { t: "subtitulo", texto: "De la promesa al reino" },
      {
        t: "lista",
        items: [
          "Los patriarcas: Abraham, Isaac y Jacob viven como extranjeros en Canaán, con la promesa de la tierra (Génesis 12 a 50).",
          "Egipto: la familia de Jacob llega con José y termina esclavizada (Éxodo 1:8-11).",
          "El éxodo y el desierto: Dios saca a su pueblo, le da la ley en el Sinaí y lo lleva cuarenta años por el desierto.",
          "La conquista y los jueces: Josué entra en la tierra, y después vienen siglos de jueces, de caídas y de liberaciones.",
          "El reino: Saúl, el primer rey; David, hacia el 1010 al 970 antes de Cristo, que hace de Jerusalén su capital; y Salomón, hacia el 970 al 931, que construye el templo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: dos fechas para el éxodo" },
      {
        t: "lista",
        items: [
          "Fecha temprana, hacia el 1446 antes de Cristo: se suma a los 480 años de 1 Reyes 6:1 el cuarto año de Salomón, hacia el 966.",
          "Fecha tardía, hacia el 1270 al 1250 antes de Cristo, en tiempos del faraón Ramsés II: se apoya en la ciudad de Ramesés que construyeron los israelitas (Éxodo 1:11) y en algunos datos arqueológicos.",
          "Algunos leen los 480 años como una cifra que suma doce generaciones de cuarenta años.",
          "Las dos posturas creen que el éxodo ocurrió; la discusión es sobre cuándo. No hay que hacer depender la fe de una sola fecha.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: hacer una línea del tiempo para una clase" },
      {
        t: "lista",
        items: [
          "Paso 1, escoger los grandes momentos: Abraham, el éxodo, la conquista, los jueces y el reino.",
          "Paso 2, poner las fechas más firmes primero: David hacia el 1010 y Salomón hacia el 970 antes de Cristo.",
          "Paso 3, marcar con claridad las fechas que se discuten, como la del éxodo, con sus dos posturas.",
          "Paso 4, añadir un versículo clave para cada momento: Génesis 12:1, Éxodo 12:41 y 1 Reyes 6:1.",
          "Paso 5, mostrar el hilo: la promesa a Abraham se cumple paso a paso.",
          "Paso 6, pedir a la clase que ubique en la línea un personaje que conozca, como Rut o Samuel.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Antes del reino de David las fechas son aproximadas y algunas se discuten. Dilo con honestidad: la Biblia no se escribió como un libro de fechas, sino como la historia de un Dios que cumple sus promesas.",
      },
    ],
    ideaClave:
      "La historia de Israel empieza con el llamado de Abram (Génesis 12:1), sigue con los 430 años en Egipto (Éxodo 12:40-41), el éxodo, la conquista y los jueces, y llega al reino de David, hacia el 1010 al 970 antes de Cristo, y de Salomón, que empezó el templo (1 Reyes 6:1). Para el éxodo se proponen dos fechas, hacia el 1446 o hacia el 1270 al 1250, pero el hilo es claro: Dios cumple su promesa.",
    paraLaVida: {
      texto: "Confío en el Dios que cumplió su promesa a Abraham a lo largo de los siglos.",
      pregunta: "¿Qué promesa de Dios estás esperando, y qué te enseña la historia de Israel sobre su fidelidad?",
    },
  },
  {
    id: "biblicos-avanzados-4-3",
    objetivos: [
      "Explicar cómo se dividió el reino y en qué se diferenciaban Israel, al norte, y Judá, al sur.",
      "Ubicar los imperios de Asiria y Babilonia y las caídas de Samaria y de Jerusalén.",
      "Relacionar a los profetas con el momento de la historia en que hablaron.",
    ],
    paraEmpezar:
      "Después de Salomón el reino se partió en dos. El norte, Israel, tuvo su capital en Samaria; el sur, Judá, siguió en Jerusalén con los reyes de la casa de David. Durante dos siglos y medio los dos reinos vivieron entre la fidelidad y la idolatría, mientras crecían dos imperios: Asiria y Babilonia. Los profetas hablaron en medio de esa historia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8V-TefJJc0g", titulo: "Resumen de los libros de 1 y 2 Reyes", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Reyes 12:16" },
      {
        t: "parrafo",
        texto:
          "Roboam, hijo de Salomón, no quiso aliviar la carga del pueblo, y las tribus del norte respondieron: «¿Qué parte tenemos nosotros con David?». Así, hacia el 931 o el 930 antes de Cristo, el reino se dividió.",
      },
      { t: "versiculo", ref: "2 Reyes 17:6" },
      {
        t: "parrafo",
        texto:
          "El reino del norte cayó primero: «el rey de Asiria tomó Samaria, y llevó a Israel cautivo a Asiria». Fue en el 722 antes de Cristo, después de un largo sitio. La Biblia explica que fue por haber dejado a Dios (2 Reyes 17:7).",
      },
      { t: "versiculo", ref: "2 Reyes 25:8-9" },
      {
        t: "parrafo",
        texto:
          "Judá duró más, pero también cayó. El capitán de Nabucodonosor «quemó la casa de Jehová, y la casa del rey, y todas las casas de Jerusalén». Fue en el 587 o en el 586 antes de Cristo, según cómo se cuenten los años.",
      },
      {
        t: "linea",
        titulo: "Del reino unido al exilio",
        eventos: [
          { fecha: "Hacia el 1010 a. C.", texto: "David comienza a reinar, y más tarde hace de Jerusalén su capital.", ref: "2 Samuel 5:4-7" },
          { fecha: "Hacia el 970 a. C.", texto: "Salomón sucede a David y construye el templo.", ref: "1 Reyes 6:1" },
          { fecha: "931 o 930 a. C.", texto: "El reino se divide: Israel al norte y Judá al sur.", ref: "1 Reyes 12:16" },
          { fecha: "722 a. C.", texto: "Asiria toma Samaria y lleva cautivo al reino del norte.", ref: "2 Reyes 17:6" },
          { fecha: "701 a. C.", texto: "Senaquerib, rey de Asiria, invade Judá en los días de Ezequías, pero Jerusalén no cae.", ref: "2 Reyes 18:13" },
          { fecha: "605 a. C.", texto: "Nabucodonosor sitia Jerusalén y lleva a Babilonia a los primeros cautivos, entre ellos Daniel.", ref: "Daniel 1:1" },
          { fecha: "597 a. C.", texto: "El rey Joaquín es llevado cautivo a Babilonia con muchos de Jerusalén.", ref: "2 Reyes 24:12" },
          { fecha: "587 o 586 a. C.", texto: "Babilonia destruye Jerusalén y quema el templo.", ref: "2 Reyes 25:8-9" },
        ],
      },
      { t: "subtitulo", texto: "Comparación: Israel y Judá" },
      {
        t: "lista",
        items: [
          "Israel, al norte: diez tribus, su capital en Samaria y varias familias de reyes que se reemplazaron con golpes de Estado; cayó en el 722.",
          "Judá, al sur: su capital en Jerusalén, con el templo, y una sola familia de reyes, la de David; cayó en el 587 o 586.",
          "Los dos tuvieron reyes que siguieron a Dios y reyes que lo dejaron, y a los dos Dios les mandó profetas.",
        ],
      },
      { t: "subtitulo", texto: "Los profetas en su tiempo" },
      {
        t: "lista",
        items: [
          "Elías y Eliseo, en el reino del norte, contra la idolatría de Baal (1 Reyes 18).",
          "Amós y Oseas, en el norte antes de la caída de Samaria, contra la injusticia y la infidelidad.",
          "Isaías y Miqueas, en Judá en tiempos de Asiria, con la promesa del Mesías.",
          "Jeremías, en Judá antes y durante la caída de Jerusalén, llamando al arrepentimiento.",
          "Ezequiel y Daniel, en el exilio en Babilonia.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ubicar un libro profético" },
      {
        t: "lista",
        items: [
          "Paso 1, leer el primer versículo del libro: muchas veces dice en qué reyes habló el profeta (Isaías 1:1).",
          "Paso 2, buscar a esos reyes en 1 y 2 Reyes para saber qué pasaba.",
          "Paso 3, ubicar el momento en la línea del tiempo: antes o después de la caída de Samaria o de Jerusalén.",
          "Paso 4, ver qué imperio amenazaba: Asiria o Babilonia.",
          "Paso 5, leer el mensaje del profeta a la luz de esa situación.",
          "Paso 6, aplicar a hoy lo que Dios pedía entonces: volver a él, practicar la justicia y confiar en su promesa.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Leer a los profetas sin su historia es como leer cartas sin saber quién las escribió ni a quién. Ten a mano la línea del tiempo y 1 y 2 Reyes cuando enseñes un libro profético.",
      },
    ],
    ideaClave:
      "Hacia el 931 o 930 antes de Cristo el reino se dividió (1 Reyes 12:16): Israel, al norte, con su capital en Samaria, cayó ante Asiria en el 722 (2 Reyes 17:6); Judá, al sur, con Jerusalén y la casa de David, cayó ante Babilonia en el 587 o 586, cuando fue quemado el templo (2 Reyes 25:8-9). Los profetas hablaron en medio de esa historia, llamando a volver a Dios.",
    paraLaVida: {
      texto: "Aprendo de la historia de Israel a volver a Dios antes de que lleguen las consecuencias.",
      pregunta: "¿Qué profeta te gustaría estudiar, y en qué momento de la historia de Israel habló?",
    },
  },
  {
    id: "biblicos-avanzados-4-4",
    objetivos: [
      "Explicar cómo terminó el exilio con Ciro, rey de Persia, y cómo se reconstruyó el templo.",
      "Ubicar a Zorobabel, Esdras y Nehemías en el tiempo de los persas.",
      "Aplicar la manera en que Dios cumplió su palabra de los setenta años a la confianza en sus promesas hoy.",
    ],
    paraEmpezar:
      "En Babilonia el pueblo lloró junto a los ríos, lejos de su tierra. Pero Dios había prometido por Jeremías que volverían. En el 539 antes de Cristo Babilonia cayó ante los persas, y Ciro permitió el regreso. Los libros de Esdras, Nehemías, Hageo y Zacarías cuentan cómo un pueblo pequeño reconstruyó el templo, los muros y su vida con Dios.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Jeremías 29:10" },
      {
        t: "parrafo",
        texto:
          "Antes del regreso hubo una promesa: «Cuando en Babilonia se cumplan los setenta años, yo os visitaré, y despertaré sobre vosotros mi buena palabra, para haceros volver a este lugar».",
      },
      { t: "versiculo", ref: "Esdras 1:1-2" },
      {
        t: "parrafo",
        texto:
          "Dios cumplió: «En el primer año de Ciro rey de Persia, para que se cumpliese la palabra de Jehová por boca de Jeremías, despertó Jehová el espíritu de Ciro». Ciro tomó Babilonia en el 539 antes de Cristo, y su primer año como rey de Babilonia fue el 538.",
      },
      { t: "versiculo", ref: "Nehemías 2:5" },
      {
        t: "parrafo",
        texto:
          "Casi un siglo después, Nehemías, copero del rey Artajerjes, oró y pidió: «envíame a Judá, a la ciudad de los sepulcros de mis padres, y la reedificaré». Fue en el año veinte de Artajerjes, hacia el 445 antes de Cristo (Nehemías 2:1).",
      },
      { t: "subtitulo", texto: "Las etapas del regreso" },
      {
        t: "lista",
        items: [
          "El primer grupo vuelve con Zorobabel y el sumo sacerdote Josué, y pone los cimientos del templo (Esdras 2 y 3).",
          "La obra se detiene por la oposición, y Dios levanta a los profetas Hageo y Zacarías para animarla (Esdras 5:1).",
          "El templo se termina en el sexto año del rey Darío, hacia el 515 antes de Cristo (Esdras 6:15).",
          "Esdras, escriba y sacerdote, llega para enseñar la ley, hacia el 458 antes de Cristo (Esdras 7:10).",
          "Nehemías llega hacia el 445 y reconstruye los muros de Jerusalén en cincuenta y dos días (Nehemías 6:15).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: Babilonia y Persia con los pueblos vencidos" },
      {
        t: "lista",
        items: [
          "Babilonia llevaba cautivos a los pueblos vencidos y destruía sus templos, como hizo con Jerusalén.",
          "Persia permitía que muchos pueblos volvieran a sus tierras y restauraran sus templos, y así lo hizo con los judíos (Esdras 1:2-4).",
          "La Biblia ve detrás de esa política la mano de Dios, que despertó el espíritu de Ciro (Esdras 1:1).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: animar a una iglesia que reconstruye" },
      {
        t: "parrafo",
        texto:
          "Una iglesia pequeña perdió su local y a muchos miembros después de una división, y ahora quiere empezar de nuevo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recordar la promesa: Dios cumplió su palabra de los setenta años y sigue fiel (Jeremías 29:10).",
          "Paso 2, empezar por lo primero, como el pueblo que levantó el altar antes que los muros (Esdras 3:2-3).",
          "Paso 3, no rendirse ante la oposición y escuchar a los que animan, como Hageo y Zacarías.",
          "Paso 4, orar antes de actuar, como Nehemías ante el rey (Nehemías 2:4).",
          "Paso 5, repartir el trabajo para que cada familia reconstruya su parte (Nehemías 3).",
          "Paso 6, volver a la Palabra, como el pueblo con Esdras (Nehemías 8:8).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "El regreso del exilio es una historia de comienzos humildes: el segundo templo era más pequeño que el de Salomón, y algunos lloraban al verlo (Esdras 3:12). Pero Dios estaba con ellos. No menosprecies los comienzos pequeños.",
      },
    ],
    ideaClave:
      "Dios prometió por Jeremías el regreso después de setenta años (Jeremías 29:10) y lo cumplió: Ciro, rey de Persia, tomó Babilonia en el 539 antes de Cristo y en su primer año permitió volver (Esdras 1:1-2). El templo se terminó hacia el 515; Esdras llegó a enseñar la ley hacia el 458 y Nehemías reconstruyó los muros hacia el 445 (Nehemías 2:5). Dios es fiel a su palabra.",
    paraLaVida: {
      texto: "Confío en que Dios cumple su palabra y me ayuda a reconstruir lo que se cayó.",
      pregunta: "¿Qué área de tu vida o de tu iglesia necesita ser reconstruida, y cuál sería el primer paso?",
    },
  },
  {
    id: "biblicos-avanzados-4-5",
    objetivos: [
      "Describir los principales hechos del tiempo entre el Antiguo y el Nuevo Testamento.",
      "Explicar el origen de la fiesta de la dedicación (Juan 10:22) y de los grupos judíos del tiempo de Jesús.",
      "Explicar cómo ese tiempo preparó el mundo para la venida de Cristo (Gálatas 4:4).",
    ],
    paraEmpezar:
      "Entre Malaquías y Mateo pasan unos cuatrocientos años sin un profeta en la Biblia, pero no sin historia. Llegaron los griegos, se tradujo la Biblia hebrea al griego, un rey quiso borrar la fe de Israel, los macabeos lucharon por ella y al final llegó Roma. Cuando el Nuevo Testamento empieza, el mundo es otro, y Dios lo había preparado.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Daniel 8:21-22" },
      {
        t: "parrafo",
        texto:
          "Daniel vio un macho cabrío con un gran cuerno, y el ángel le explicó: «El macho cabrío es el rey de Grecia, y el cuerno grande que tenía entre sus ojos es el rey primero». Muchos ven aquí a Alejandro Magno y a los cuatro reinos en que se dividió su imperio.",
      },
      { t: "versiculo", ref: "Juan 10:22-23" },
      {
        t: "parrafo",
        texto:
          "«Celebrábase en Jerusalén la fiesta de la dedicación. Era invierno». Esa fiesta, hoy llamada Janucá, recordaba la purificación del templo en el 164 antes de Cristo, después de que Antíoco IV lo profanara.",
      },
      { t: "versiculo", ref: "Gálatas 4:4" },
      {
        t: "parrafo",
        texto:
          "Pablo mira hacia atrás y dice: «Pero cuando vino el cumplimiento del tiempo, Dios envió a su Hijo». Muchos ven en ese tiempo una preparación: una lengua común, caminos, paz y una Biblia en griego que leían los judíos en todo el imperio.",
      },
      {
        t: "linea",
        titulo: "Entre los dos testamentos",
        eventos: [
          { fecha: "333 a. C.", texto: "Alejandro Magno vence a los persas en Issos y pronto domina todo el oriente." },
          { fecha: "323 a. C.", texto: "Muere Alejandro y sus generales se reparten el imperio.", ref: "Daniel 8:22" },
          { fecha: "Siglo III a. C.", texto: "En Alejandría se traduce al griego la ley de Moisés: empieza la Septuaginta." },
          { fecha: "Hacia el 200 a. C.", texto: "Judea pasa de los Ptolomeos de Egipto a los Seléucidas de Siria." },
          { fecha: "167 a. C.", texto: "Antíoco IV Epífanes profana el templo y persigue a los judíos fieles." },
          { fecha: "164 a. C.", texto: "Los macabeos purifican el templo: nace la fiesta de la dedicación.", ref: "Juan 10:22" },
          { fecha: "63 a. C.", texto: "El general romano Pompeyo toma Jerusalén." },
          { fecha: "37 al 4 a. C.", texto: "Herodes el Grande reina en Judea y amplía el templo." },
        ],
      },
      { t: "subtitulo", texto: "Lo que dejó ese tiempo" },
      {
        t: "lista",
        items: [
          "La Septuaginta: la Biblia hebrea traducida al griego, que usaron muchos judíos y los primeros cristianos.",
          "Las sinagogas: lugares para leer y enseñar la ley, en Judea y en todo el imperio.",
          "Los grupos judíos: fariseos, saduceos y esenios, que aparecen o crecen en este tiempo.",
          "La esperanza del Mesías: muchos esperaban que Dios enviara a su ungido para librar a su pueblo.",
          "Los libros de los Macabeos cuentan esta historia; están en las Biblias católicas, pero no en las evangélicas, y sirven como fuente histórica.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el mundo de Malaquías y el mundo de Mateo" },
      {
        t: "lista",
        items: [
          "En Malaquías gobiernan los persas; en Mateo gobiernan los romanos, con reyes como Herodes.",
          "En Malaquías la lengua común es el arameo; en Mateo, además, el griego une a todo el imperio.",
          "En Malaquías no se habla de fariseos ni de saduceos; en Mateo son protagonistas.",
          "En Malaquías se promete que vendrá el mensajero del Señor (Malaquías 3:1); en Mateo llega Juan el Bautista (Mateo 11:10).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: explicar por qué no hay libros entre Malaquías y Mateo" },
      {
        t: "lista",
        items: [
          "Paso 1, decir que pasaron unos cuatrocientos años sin nuevos libros proféticos en la Biblia evangélica.",
          "Paso 2, mostrar la línea del tiempo: griegos, Ptolomeos, Seléucidas, macabeos y romanos.",
          "Paso 3, explicar qué son los libros de los Macabeos y por qué no están en nuestras Biblias.",
          "Paso 4, mostrar lo que nació en ese tiempo: la Septuaginta, las sinagogas y los grupos judíos.",
          "Paso 5, leer Gálatas 4:4: Dios envió a su Hijo en el cumplimiento del tiempo.",
          "Paso 6, concluir: el silencio no fue abandono; Dios estaba preparando el mundo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Conocer este tiempo explica muchas cosas del Nuevo Testamento: por qué hay fariseos y saduceos, por qué se celebra la fiesta de la dedicación, por qué los apóstoles citan muchas veces la Septuaginta y por qué el evangelio pudo extenderse tan rápido.",
      },
    ],
    ideaClave:
      "Entre los dos testamentos pasaron unos cuatrocientos años: Alejandro venció en el 333 antes de Cristo y su reino se dividió (Daniel 8:21-22); se tradujo la Biblia al griego; Antíoco IV profanó el templo en el 167, los macabeos lo purificaron en el 164, origen de la fiesta de la dedicación (Juan 10:22-23); Roma llegó en el 63 y Herodes reinó hasta el 4. Así llegó el cumplimiento del tiempo (Gálatas 4:4).",
    paraLaVida: {
      texto: "Confío en que Dios obra aun en los tiempos en que parece callar.",
      pregunta: "¿Cuándo te pareció que Dios callaba, y cómo viste después que estaba preparando algo?",
    },
  },
  {
    id: "biblicos-avanzados-4-6",
    objetivos: [
      "Describir el mundo romano en que vivieron Jesús y Pablo: los emperadores, los gobernantes y las regiones.",
      "Usar Lucas 2:1 y 3:1 para ubicar en la historia el nacimiento y el ministerio de Jesús.",
      "Explicar, con Hechos 17:26, cómo Dios gobierna los tiempos y los lugares de los pueblos.",
    ],
    paraEmpezar:
      "Jesús nació en una provincia pequeña del imperio más grande de su tiempo. Lucas lo cuenta con nombres y fechas: Augusto, Tiberio, Pilato, Herodes. No es un cuento de había una vez, sino historia. Y Pablo, que recorrió ese mismo imperio, dijo en Atenas que Dios fijó los tiempos y los límites de los pueblos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=bPzhlL9zKmg", titulo: "Resumen del libro de Lucas (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Lucas 2:1" },
      {
        t: "parrafo",
        texto:
          "«Aconteció en aquellos días, que se promulgó un edicto de parte de Augusto César, que todo el mundo fuese empadronado». Augusto gobernó desde el 27 antes de Cristo hasta el 14 después de Cristo, y su decreto llevó a José y a María a Belén.",
      },
      { t: "versiculo", ref: "Lucas 3:1" },
      {
        t: "parrafo",
        texto:
          "Lucas fecha el comienzo del ministerio de Juan «En el año decimoquinto del imperio de Tiberio César, siendo gobernador de Judea Poncio Pilato». El cálculo más común pone ese año hacia el 28 o el 29 después de Cristo.",
      },
      { t: "versiculo", ref: "Hechos 17:26" },
      {
        t: "parrafo",
        texto:
          "En Atenas Pablo dijo que Dios «de una sangre ha hecho todo el linaje de los hombres», y «les ha prefijado el orden de los tiempos, y los límites de su habitación». La historia y la geografía están en las manos de Dios.",
      },
      { t: "subtitulo", texto: "Los que gobernaban en tiempos de Jesús" },
      {
        t: "lista",
        items: [
          "Augusto, emperador del 27 antes de Cristo al 14 después de Cristo (Lucas 2:1).",
          "Tiberio, emperador del 14 al 37 (Lucas 3:1).",
          "Herodes el Grande, rey de Judea hasta su muerte, hacia el 4 antes de Cristo; Jesús nació en sus días (Mateo 2:1).",
          "Herodes Antipas, tetrarca de Galilea, el que mató a Juan el Bautista (Lucas 3:1; Marcos 6:27).",
          "Poncio Pilato, prefecto de Judea del 26 al 36 (Lucas 3:1).",
          "Caifás, sumo sacerdote en Jerusalén (Juan 18:13).",
        ],
      },
      { t: "subtitulo", texto: "Las regiones del tiempo de Jesús" },
      {
        t: "lista",
        items: [
          "Galilea, al norte, alrededor del mar de Galilea: allí se crió Jesús y hizo gran parte de su ministerio.",
          "Samaria, en el centro: sus habitantes y los judíos no se trataban (Juan 4:9).",
          "Judea, al sur, con Jerusalén y el templo.",
          "Perea, al este del Jordán, y la Decápolis, un grupo de ciudades griegas (Marcos 5:20).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el mundo que preparó el evangelio" },
      {
        t: "lista",
        items: [
          "Los caminos romanos y la paz del imperio permitían viajar por tierra y por mar.",
          "El griego común se hablaba en todo el oriente, y en griego se escribió el Nuevo Testamento.",
          "Las sinagogas de los judíos en muchas ciudades fueron la primera puerta para Pablo (Hechos 17:2).",
          "Pero el mismo imperio también persiguió: Tito destruyó el templo de Jerusalén en el año 70.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ubicar en la historia el ministerio de Jesús" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Lucas 3:1-2 y anotar los nombres: Tiberio, Pilato, Herodes, Felipe, Lisanias, Anás y Caifás.",
          "Paso 2, buscar sus fechas: el año 15 de Tiberio cae, según el cálculo más común, hacia el 28 o 29 después de Cristo.",
          "Paso 3, notar que Pilato gobernó del 26 al 36: el ministerio de Jesús cabe dentro de esos años.",
          "Paso 4, ver en el mapa dónde gobernaba cada uno: Judea, Galilea, Iturea y Abilinia.",
          "Paso 5, sacar la lección: Lucas presenta a Jesús en la historia real, con nombres que podemos comprobar.",
          "Paso 6, aplicar: nuestra fe no descansa en mitos, sino en hechos que ocurrieron en un lugar y un tiempo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No pongas un año exacto donde la historia da un margen. Di hacia el 28 o el 29, o del 26 al 36. La precisión honesta enseña más que una fecha inventada.",
      },
    ],
    ideaClave:
      "Jesús nació bajo Augusto (Lucas 2:1) y comenzó su ministerio bajo Tiberio y Pilato, hacia el 28 o 29 después de Cristo (Lucas 3:1), en un imperio con caminos, paz y una lengua común. Galilea, Samaria y Judea eran sus regiones, y Roma destruyó el templo en el 70. Pablo recordó que Dios fijó el orden de los tiempos y los límites de los pueblos (Hechos 17:26).",
    paraLaVida: {
      texto: "Vivo mi fe sabiendo que Dios gobierna los tiempos y los lugares, también los míos.",
      pregunta: "¿Por qué crees que Dios te puso en este país y en este tiempo, y qué quiere hacer contigo aquí?",
    },
  },
];
