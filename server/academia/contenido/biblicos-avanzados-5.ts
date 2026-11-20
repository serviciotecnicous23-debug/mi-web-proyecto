/**
 * Especialidad Estudios bíblicos avanzados · Materia 5 — Trasfondo y arqueología bíblica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La arqueología y sus límites, los hallazgos del Antiguo y del Nuevo Testamento, los manuscritos y el texto, la vida
 * diaria y el mundo religioso judío, con tres esquemas. Datos comprobados en sus museos y fuentes: la estela de Merneptah
 * (hacia el 1208 a. C., hallada por Petrie en 1896); la de Tel Dan (1993 y 1994, siglo IX a. C.); la de Mesa (1868, en el
 * Louvre); la inscripción de Siloé (1880, hacia el 700 a. C., en Estambul, sin el nombre de Ezequías); los prismas de
 * Senaquerib (691 y 689 a. C.); el Cilindro de Ciro (1879, sin mención de los judíos); los amuletos de Ketef Hinom (1979,
 * hacia el 600 a. C.); las tablillas de Joaquín (Berlín); la bula de Ezequías (anunciada en 2015); Qumrán (1947) y el Gran
 * Rollo de Isaías (hacia el 125 a. C.); los códices de Alepo y de Leningrado; el papiro P52 (siglo II); el Códice Sinaítico;
 * la piedra de Pilato (1961); el osario de Caifás (1990); Betesda; el estanque de Siloé (2004); la sinagoga de Magdala
 * (2009) y la inscripción de Teódoto (1913). La arqueología ilumina la Biblia, pero no prueba la fe.
 */
import type { LeccionContenido } from "../tipos";

export const BIBLICOS_AVANZADOS_5: LeccionContenido[] = [
  {
    id: "biblicos-avanzados-5-1",
    objetivos: [
      "Explicar qué es la arqueología bíblica y cómo trabaja: el tel, los estratos, la cerámica y el carbono 14.",
      "Distinguir lo que la arqueología puede mostrar de lo que no puede probar.",
      "Evaluar con cuidado una noticia de un hallazgo antes de usarla en una enseñanza.",
    ],
    paraEmpezar:
      "La arqueología estudia lo que dejaron los pueblos antiguos: casas, vasijas, monedas, inscripciones y tumbas. Gracias a ella entendemos mejor el mundo de la Biblia. Pero también se usa mal: unos la presentan como si probara cada versículo, y otros como si negara la Biblia. Un buen maestro sabe qué puede decir la arqueología y qué no.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jVNKGw8_bCQ", titulo: "Cartas del Nuevo Testamento: contexto histórico", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Lucas 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Lucas trabajó como un buen investigador: escribió «después de haber investigado con diligencia todas las cosas desde su origen», para que Teófilo conociera «bien la verdad». La fe cristiana no teme a la historia.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:21" },
      {
        t: "parrafo",
        texto:
          "«Examinadlo todo; retened lo bueno». Esto vale también para las noticias de hallazgos: hay que examinar quién lo dice, dónde se halló y qué dicen los que saben, antes de repetirlo.",
      },
      { t: "versiculo", ref: "Hebreos 11:1" },
      {
        t: "parrafo",
        texto:
          "«Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve». La arqueología puede mostrar que los lugares y los reyes de la Biblia existieron, pero no puede probar que Dios habló ni que Cristo salva: eso se recibe por la fe.",
      },
      { t: "subtitulo", texto: "Cómo trabaja la arqueología" },
      {
        t: "lista",
        items: [
          "El tel: un montículo formado por las capas de ciudades que se construyeron una sobre otra a lo largo de los siglos.",
          "Los estratos: cada capa es un período; las más profundas son, por lo general, las más antiguas.",
          "La cerámica: cada época tuvo sus formas de vasijas, y sus pedazos ayudan a fechar cada capa; Flinders Petrie fue de los primeros en usarla así, en 1890.",
          "El carbono 14: fecha restos orgánicos, como madera o semillas, y necesita calibrarse.",
          "Las inscripciones: textos grabados en piedra, en arcilla o en metal, que nombran reyes, pueblos y hechos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que la arqueología puede y lo que no puede" },
      {
        t: "lista",
        items: [
          "Puede mostrar que existieron personas, lugares y costumbres de la Biblia, como reyes nombrados en inscripciones.",
          "Puede iluminar un texto, mostrando cómo eran las casas, los caminos o las ciudades.",
          "No puede probar las verdades de la fe, como la resurrección o el perdón de los pecados (Hebreos 11:1).",
          "Que todavía no se haya hallado algo no prueba que no existió: falta mucho por excavar y mucho se perdió.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una noticia en las redes" },
      {
        t: "parrafo",
        texto:
          "Un hermano comparte un video que asegura que se halló el arca de Noé, con fotos impresionantes, y te pide que lo anuncies en la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no compartirlo de inmediato: examinadlo todo (1 Tesalonicenses 5:21).",
          "Paso 2, ver quién lo dice: un arqueólogo con una excavación oficial o un canal que busca vistas.",
          "Paso 3, buscar si lo publicó una institución seria, como una autoridad de antigüedades o una universidad.",
          "Paso 4, recordar que ha habido falsificaciones: en 2020 se supo que dieciséis fragmentos atribuidos a los manuscritos del mar Muerto que tenía un museo eran falsos.",
          "Paso 5, si no hay fuentes serias, no anunciarlo, aunque parezca favorable a la fe.",
          "Paso 6, enseñar a la iglesia que nuestra fe no depende de noticias sensacionales, sino de la Palabra.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "La verdad no necesita exageraciones. Usa la arqueología con honestidad: di lo que muestra un hallazgo, lo que se discute y lo que no prueba. Así la iglesia aprende a amar la verdad.",
      },
    ],
    ideaClave:
      "La arqueología estudia lo que dejaron los pueblos antiguos: los teles y sus estratos, la cerámica, el carbono 14 y las inscripciones. Ilumina el mundo de la Biblia y muestra que muchos de sus lugares y reyes existieron, pero no prueba las verdades de la fe, que se reciben por fe (Hebreos 11:1). Como Lucas investigó con diligencia (Lucas 1:3-4), examinamos todo y retenemos lo bueno (1 Tesalonicenses 5:21).",
    paraLaVida: {
      texto: "Amo la verdad: examino las noticias antes de repetirlas y descanso en la Palabra.",
      pregunta: "¿Qué noticia sobre la Biblia compartiste o creíste sin comprobarla, y qué harías ahora distinto?",
    },
  },
  {
    id: "biblicos-avanzados-5-2",
    objetivos: [
      "Describir los principales hallazgos del Antiguo Testamento: las estelas de Merneptah, Tel Dan y Mesa, Siloé, los prismas de Senaquerib y Ketef Hinom.",
      "Relacionar cada hallazgo con su texto bíblico, sin decir más de lo que muestra.",
      "Usar un hallazgo para enseñar un pasaje del Antiguo Testamento.",
    ],
    paraEmpezar:
      "Durante mucho tiempo algunos dijeron que los reyes de Israel eran leyendas. Pero la tierra fue devolviendo piedras con nombres: Israel, la casa de David, Omri, Ezequías. Cada hallazgo tiene su historia, sus límites y su debate, y juntos muestran que la Biblia habla de un mundo real.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=9lWr9EZchWg", titulo: "Resumen del libro de Isaías (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Reyes 3:4-5" },
      {
        t: "parrafo",
        texto:
          "La Biblia dice que «Mesa rey de Moab» pagaba tributo a Israel y que «muerto Acab, el rey de Moab se rebeló contra el rey de Israel». En 1868 se halló en Dibón una estela del mismo Mesa que cuenta su rebelión contra Israel y nombra a Omri y a su hijo.",
      },
      { t: "versiculo", ref: "2 Reyes 20:20" },
      {
        t: "parrafo",
        texto:
          "La Biblia recuerda «cómo hizo el estanque y el conducto, y metió las aguas en la ciudad». En 1880 se halló dentro de un túnel de Jerusalén una inscripción que cuenta cómo los obreros cavaron desde los dos extremos hasta encontrarse. Es de hacia el 700 antes de Cristo, aunque no nombra a Ezequías.",
      },
      { t: "versiculo", ref: "Números 6:24-26" },
      {
        t: "parrafo",
        texto:
          "«Jehová te bendiga, y te guarde». En 1979 se hallaron en Ketef Hinom, Jerusalén, dos pequeños amuletos de plata con estas palabras de la bendición sacerdotal. La mayoría los fecha hacia el 600 antes de Cristo: es el texto más antiguo que se conoce que coincide con un pasaje bíblico.",
      },
      {
        t: "cuadro",
        titulo: "Hallazgos del Antiguo Testamento",
        columnas: ["Hallazgo", "Fecha", "Qué muestra", "Dónde está"],
        filas: [
          ["Estela de Merneptah", "Hacia el 1208 a. C.", "La mención de Israel más antigua aceptada fuera de la Biblia", "En Egipto"],
          ["Estela de Mesa", "Siglo IX a. C.", "La rebelión de Mesa, rey de Moab, después de Acab (2 Reyes 3:4-5)", "Museo del Louvre"],
          ["Estela de Tel Dan", "Siglo IX a. C.", "Una mención de la casa de David", "Museo de Israel"],
          ["Inscripción de Siloé", "Hacia el 700 a. C.", "Un túnel de agua que se relaciona con la obra de Ezequías (2 Reyes 20:20)", "Museo Arqueológico de Estambul"],
          ["Prismas de Senaquerib", "691 y 689 a. C.", "Ezequías encerrado en Jerusalén como un pájaro en una jaula", "Museo Británico, Chicago y Museo de Israel"],
          ["Amuletos de Ketef Hinom", "Hacia el 600 a. C.", "La bendición sacerdotal de Números 6:24-26", "Museo de Israel"],
        ],
      },
      { t: "subtitulo", texto: "Otros hallazgos y sus límites" },
      {
        t: "lista",
        items: [
          "La estela de Merneptah fue hallada por Flinders Petrie en 1896 en Tebas, Egipto.",
          "La estela de Tel Dan apareció en 1993 y 1994; la mayoría lee en ella casa de David, aunque unos pocos lo discuten.",
          "Los prismas de Senaquerib cuentan su campaña del 701, pero no dicen que tomara Jerusalén, como tampoco lo dice la Biblia (2 Reyes 19:35-36).",
          "El Cilindro de Ciro, hallado en Babilonia en 1879, cuenta que Ciro devolvió a los pueblos a sus lugares; no nombra a los judíos, pero muestra la política que vemos en Esdras 1.",
          "Las tablillas de las raciones de Babilonia nombran a Joaquín, rey de Judá, y a sus cinco hijos, cautivos en Babilonia (2 Reyes 24:15).",
          "La impresión del sello del rey Ezequías, hallada junto al templo y anunciada en 2015, es la primera de un rey de Israel o de Judá hallada en una excavación científica.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: decir lo justo y decir de más" },
      {
        t: "lista",
        items: [
          "Decir lo justo: la estela de Mesa confirma que Mesa existió y se rebeló contra Israel.",
          "Decir de más: que la estela narra toda la guerra de 2 Reyes 3; no la narra.",
          "Decir lo justo: el Cilindro de Ciro muestra su política de devolver a los pueblos.",
          "Decir de más: que el cilindro menciona a los judíos o es el decreto de Esdras 1; no lo es.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: enseñar 2 Reyes 18 y 19 con los prismas" },
      {
        t: "lista",
        items: [
          "Paso 1, leer 2 Reyes 18:13 a 19:37: Senaquerib invade Judá y amenaza a Jerusalén.",
          "Paso 2, mostrar la frase de los prismas: Ezequías quedó encerrado en Jerusalén como un pájaro en una jaula.",
          "Paso 3, notar lo que el rey asirio no dice: no cuenta que tomara la ciudad.",
          "Paso 4, leer lo que dice la Biblia: Dios libró a Jerusalén y Senaquerib volvió a Nínive (2 Reyes 19:35-36).",
          "Paso 5, aplicar: el orgullo del imperio no pudo con la oración de Ezequías (2 Reyes 19:15-19).",
          "Paso 6, cerrar con la idea: la arqueología ilumina la historia, y la Biblia muestra la mano de Dios en ella.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Cita los hallazgos con su fecha, su lugar y su límite. Una frase como esta piedra confirma que el rey existió es honesta; una frase como esta piedra prueba toda la Biblia no lo es.",
      },
    ],
    ideaClave:
      "La tierra ha devuelto piedras con nombres de la Biblia: la estela de Merneptah nombra a Israel hacia el 1208 antes de Cristo; la de Mesa cuenta la rebelión de Moab (2 Reyes 3:4-5); la de Tel Dan menciona la casa de David; la inscripción de Siloé cuenta la obra de un túnel de agua (2 Reyes 20:20); y los amuletos de Ketef Hinom guardan la bendición de Números 6:24-26. Cada hallazgo se cita con lo que muestra y con su límite.",
    paraLaVida: {
      texto: "Doy gracias porque la Biblia habla de un mundo real, y cuido de no decir más de lo que muestran las pruebas.",
      pregunta: "¿Qué hallazgo de esta lección te gustaría usar para enseñar un pasaje, y cómo lo presentarías con honestidad?",
    },
  },
  {
    id: "biblicos-avanzados-5-3",
    objetivos: [
      "Explicar cómo llegó hasta nosotros el texto de la Biblia: los rollos, los códices y los manuscritos.",
      "Describir la importancia de los manuscritos del mar Muerto y de los manuscritos antiguos del Nuevo Testamento.",
      "Responder con datos a la idea de que la Biblia se cambió con el tiempo.",
    ],
    paraEmpezar:
      "No tenemos los escritos originales de Moisés, de Isaías ni de Pablo: tenemos copias, hechas a mano durante siglos. Algunos piensan que por eso la Biblia se fue cambiando. Pero los manuscritos antiguos, sobre todo los del mar Muerto, mostraron algo sorprendente: el texto se copió con mucho cuidado. La palabra de Dios permanece.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K-zhPqcHBlU", titulo: "Aprende cómo el lenguaje original de la Biblia afecta cómo la lees hoy en día", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Isaías 40:8" },
      {
        t: "parrafo",
        texto:
          "«Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre». Dios usó a escribas fieles para guardar su palabra a lo largo de los siglos.",
      },
      { t: "versiculo", ref: "Jeremías 36:27-28" },
      {
        t: "parrafo",
        texto:
          "El rey Joacim quemó el rollo de Jeremías, pero Dios le dijo al profeta: «Vuelve a tomar otro rollo, y escribe en él todas las palabras primeras». Ni el fuego de un rey pudo borrar su palabra.",
      },
      { t: "versiculo", ref: "Lucas 4:17" },
      {
        t: "parrafo",
        texto:
          "En la sinagoga de Nazaret, a Jesús «se le dio el libro del profeta Isaías», un rollo, y halló el lugar que quería leer. Las Escrituras se copiaban en rollos y se leían en voz alta.",
      },
      {
        t: "linea",
        titulo: "Cómo llegó a nosotros el texto de la Biblia",
        eventos: [
          { fecha: "Hacia el 600 a. C.", texto: "Los amuletos de Ketef Hinom llevan grabada la bendición de Números 6:24-26.", ref: "Números 6:24-26" },
          { fecha: "Hacia el 125 a. C.", texto: "Se copia el Gran Rollo de Isaías, que siglos después aparecerá en Qumrán.", ref: "Isaías 40:8" },
          { fecha: "Siglo II d. C.", texto: "El papiro P52 conserva unos versículos de Juan 18; es uno de los manuscritos más antiguos del Nuevo Testamento." },
          { fecha: "Hacia el 325 al 360", texto: "Se copia el Códice Sinaítico, con todo el Nuevo Testamento." },
          { fecha: "Hacia el 930", texto: "Se copia el Códice de Alepo, un texto masorético del Antiguo Testamento." },
          { fecha: "1008", texto: "Se copia el Códice de Leningrado, la Biblia hebrea completa más antigua que se conserva." },
          { fecha: "1947", texto: "Se descubren en Qumrán los primeros manuscritos del mar Muerto." },
        ],
      },
      { t: "subtitulo", texto: "Los manuscritos del mar Muerto" },
      {
        t: "lista",
        items: [
          "En 1947 se hallaron los primeros en una cueva de Qumrán, cerca del mar Muerto; después aparecieron muchos más en otras cuevas.",
          "Entre ellos hay copias o fragmentos de casi todos los libros del Antiguo Testamento.",
          "El Gran Rollo de Isaías, de hacia el 125 antes de Cristo, es unos mil años más antiguo que los manuscritos medievales que se usaban antes.",
          "Al comparar el Gran Rollo de Isaías con los manuscritos medievales, se vio que el texto se había copiado con gran cuidado: las diferencias son, en su mayoría, de ortografía y de detalles pequeños.",
          "Cuidado con los fragmentos que aparecieron en el mercado después de 2002: varios resultaron falsificaciones.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el Antiguo y el Nuevo Testamento" },
      {
        t: "lista",
        items: [
          "El Antiguo Testamento lo copiaron escribas judíos con reglas muy estrictas, y los masoretas añadieron las vocales y las notas.",
          "El Nuevo Testamento se conserva en miles de manuscritos griegos, más que cualquier otra obra antigua.",
          "El papiro P52, del siglo II, y el Códice Sinaítico, del siglo IV, muestran que el texto estaba en uso muy pronto.",
          "Las diferencias entre las copias se estudian con cuidado, y ninguna cambia una doctrina central de la fe.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: alguien dice que la Biblia se cambió" },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar la duda con respeto: es una pregunta honesta para muchos.",
          "Paso 2, explicar que no tenemos los originales, sino copias, como pasa con todos los libros antiguos.",
          "Paso 3, mostrar los manuscritos del mar Muerto: el Gran Rollo de Isaías es mil años más antiguo que los manuscritos que se usaban antes, y el texto es casi igual.",
          "Paso 4, mostrar que el Nuevo Testamento tiene miles de manuscritos, algunos muy antiguos, como el P52.",
          "Paso 5, reconocer que hay pequeñas diferencias entre las copias, y que se estudian abiertamente.",
          "Paso 6, invitarlo a leer la Biblia por sí mismo, porque la palabra de Dios permanece para siempre (Isaías 40:8).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No digas que no hay ninguna diferencia entre los manuscritos: sí las hay, y casi todas son pequeñas. La verdad dicha con exactitud convence más que una exageración.",
      },
    ],
    ideaClave:
      "No tenemos los originales, sino copias hechas con cuidado: el Gran Rollo de Isaías, de hacia el 125 antes de Cristo, hallado en Qumrán en 1947, es casi igual a los manuscritos de mil años después; y el Nuevo Testamento tiene miles de manuscritos, algunos muy antiguos, como el P52 del siglo II. Dios guardó su palabra aun cuando un rey quemó el rollo (Jeremías 36:27-28): la palabra del Dios nuestro permanece para siempre (Isaías 40:8).",
    paraLaVida: {
      texto: "Leo la Biblia con confianza, porque Dios guardó su palabra a lo largo de los siglos.",
      pregunta: "¿Cómo responderías a un amigo que cree que la Biblia se fue cambiando con el tiempo?",
    },
  },
  {
    id: "biblicos-avanzados-5-4",
    objetivos: [
      "Describir cómo eran las casas, la familia, las comidas y el trabajo en tiempos bíblicos.",
      "Explicar un pasaje del Nuevo Testamento a la luz de las costumbres de su tiempo.",
      "Evitar leer la Biblia con las costumbres de hoy en vez de las de su tiempo.",
    ],
    paraEmpezar:
      "La Biblia se escribió en un mundo muy distinto del nuestro: casas de piedra con techos planos, familias grandes, comidas sencillas, trabajo en el campo y una cultura del honor y la hospitalidad. Cuando conocemos ese mundo, muchas escenas cobran vida, y evitamos poner en la Biblia las costumbres de nuestro tiempo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=VdUHlPn_gTM", titulo: "Contexto en la narrativa bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Lucas 2:7" },
      {
        t: "parrafo",
        texto:
          "María «lo acostó en un pesebre, porque no había lugar para ellos en el mesón». El pesebre era el comedero de los animales. Muchos estudiosos piensan que en las casas sencillas de entonces los animales se guardaban de noche en la parte baja de la misma casa, y que allí estaba el pesebre.",
      },
      { t: "versiculo", ref: "Marcos 2:4" },
      {
        t: "parrafo",
        texto:
          "Los amigos del paralítico «descubrieron el techo de donde estaba, y haciendo una abertura, bajaron el lecho». Los techos eran planos, de vigas, ramas y barro, y se subía a ellos por una escalera de afuera.",
      },
      { t: "versiculo", ref: "Juan 2:6" },
      {
        t: "parrafo",
        texto:
          "En la boda de Caná había «seis tinajas de piedra para agua, conforme al rito de la purificación de los judíos». Las vasijas de piedra se usaban para la pureza ritual, y en Galilea y en Jerusalén se han hallado talleres y vasijas de piedra de ese tiempo.",
      },
      { t: "subtitulo", texto: "La vida diaria" },
      {
        t: "lista",
        items: [
          "La casa: de piedra o de adobe, con pocas habitaciones, un patio y el techo plano, que también se usaba para trabajar y para orar (Hechos 10:9).",
          "La familia: grande, con padres, hijos, abuelos y parientes; el padre era la cabeza de la casa.",
          "La comida: pan, aceite, aceitunas, higos, uvas, legumbres y pescado; la carne era para las fiestas (Lucas 15:23).",
          "El trabajo: el campo, el pastoreo, la pesca y los oficios, como el de carpintero (Marcos 6:3).",
          "El año: se sembraba en el otoño, con las primeras lluvias, y se cosechaba en la primavera y el verano.",
          "La hospitalidad: recibir al que llegaba era un deber y un honor (Lucas 11:5-6).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: leer con ojos de hoy y leer con ojos de entonces" },
      {
        t: "lista",
        items: [
          "Con ojos de hoy, el mesón parece un hotel con habitaciones; con ojos de entonces, era un lugar sencillo de hospedaje o el cuarto de huéspedes de una casa.",
          "Con ojos de hoy, romper un techo parece una locura; con ojos de entonces, un techo de barro y ramas se podía abrir y reparar.",
          "Con ojos de hoy, lavarse las manos es solo higiene; con ojos de entonces, también era un asunto de pureza ritual (Marcos 7:3).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la parábola del amigo a medianoche" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Lucas 11:5-8: un amigo llega de viaje a medianoche y no hay pan en la casa.",
          "Paso 2, conocer la costumbre: recibir mal a un huésped era una vergüenza para la familia y para el pueblo.",
          "Paso 3, ver la casa: la familia dormía junta en una sola habitación, y levantarse despertaba a todos.",
          "Paso 4, entender el pedido: el que pide insiste porque el honor de la hospitalidad está en juego.",
          "Paso 5, ver la enseñanza de Jesús: si un vecino da por la insistencia, cuánto más dará el Padre (Lucas 11:13).",
          "Paso 6, aplicar: orar con confianza y con perseverancia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Antes de aplicar un pasaje a hoy, pregunta qué entendían los primeros oyentes. Un libro de usos y costumbres de los tiempos bíblicos y un mapa son dos de las mejores herramientas de un maestro.",
      },
    ],
    ideaClave:
      "La Biblia se escribió en un mundo de casas de techo plano (Marcos 2:4), familias grandes, comidas sencillas, trabajo en el campo, hospitalidad y pureza ritual, como las tinajas de piedra de Caná (Juan 2:6). Conocer esas costumbres, como el pesebre de Lucas 2:7, hace vivas las escenas y evita leer la Biblia con los ojos de hoy en vez de los de su tiempo.",
    paraLaVida: {
      texto: "Leo la Biblia preguntando cómo la entendían sus primeros oyentes.",
      pregunta: "¿Qué costumbre de los tiempos bíblicos te ayudó a entender mejor un pasaje que ya conocías?",
    },
  },
  {
    id: "biblicos-avanzados-5-5",
    objetivos: [
      "Describir el templo, la sinagoga y las fiestas del mundo religioso judío en tiempos de Jesús.",
      "Distinguir a los fariseos, los saduceos, los esenios y los zelotes.",
      "Explicar un encuentro de Jesús con los fariseos o los saduceos a la luz de lo que creía cada grupo.",
    ],
    paraEmpezar:
      "Jesús era judío, y vivió la fe de su pueblo: iba a la sinagoga cada sábado, subía a Jerusalén en las fiestas y discutía con los maestros. Para entender los evangelios hay que conocer ese mundo: el templo y sus sacerdotes, la sinagoga y sus lectores, y los grupos que pensaban distinto sobre la ley, la resurrección y Roma.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=t56W2zp823Q", titulo: "Por qué el templo es tan importante en la Biblia", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 4:16" },
      {
        t: "parrafo",
        texto:
          "Jesús «en el día de reposo entró en la sinagoga, conforme a su costumbre, y se levantó a leer». La sinagoga era el lugar de la lectura y la enseñanza de las Escrituras. Una inscripción hallada en Jerusalén en 1913 cuenta que un sacerdote llamado Teódoto construyó una sinagoga para la lectura de la ley y la enseñanza de los mandamientos.",
      },
      { t: "versiculo", ref: "Hechos 23:8" },
      {
        t: "parrafo",
        texto:
          "Pablo conocía bien a los dos grupos principales: «los saduceos dicen que no hay resurrección, ni ángel, ni espíritu; pero los fariseos afirman estas cosas». Por eso, cuando habló de la resurrección ante el concilio, los dos grupos se dividieron (Hechos 23:6-7).",
      },
      { t: "versiculo", ref: "Marcos 7:3-4" },
      {
        t: "parrafo",
        texto:
          "Los fariseos guardaban con cuidado «la tradición de los ancianos»: lavarse las manos, los vasos y los jarros. Jesús no despreció la pureza, pero les dijo que no pusieran las tradiciones humanas por encima del mandamiento de Dios (Marcos 7:8).",
      },
      { t: "subtitulo", texto: "Los grupos judíos del tiempo de Jesús" },
      {
        t: "lista",
        items: [
          "Los fariseos: maestros de la ley y de la tradición oral, muy respetados por el pueblo; creían en la resurrección y en los ángeles.",
          "Los saduceos: unidos a las familias de los sumos sacerdotes y al templo; no creían en la resurrección (Mateo 22:23).",
          "Los esenios: un grupo que vivía con reglas estrictas de pureza; no aparecen en el Nuevo Testamento, y muchos los relacionan con Qumrán.",
          "Los zelotes: querían echar a Roma, aun por la fuerza; uno de los doce fue Simón, llamado el Zelote (Lucas 6:15).",
          "Los escribas: expertos en copiar y explicar la ley, muchos de ellos fariseos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el templo y la sinagoga" },
      {
        t: "lista",
        items: [
          "El templo: había uno solo, en Jerusalén; allí servían los sacerdotes y se ofrecían los sacrificios.",
          "La sinagoga: había muchas, en cada pueblo y en la diáspora; allí se leían la ley y los profetas, se oraba y se enseñaba (Hechos 13:15).",
          "Las fiestas de peregrinación: tres veces al año los varones subían a Jerusalén, en la fiesta de los panes sin levadura, en la de las semanas y en la de los tabernáculos (Deuteronomio 16:16).",
          "El Sanedrín: el gran concilio de Jerusalén, presidido por el sumo sacerdote; la Misná, escrita hacia el año 200, dice que tenía setenta y un miembros.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la pregunta de los saduceos sobre la resurrección" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Mateo 22:23-33: los saduceos preguntan de quién será esposa en la resurrección una mujer que tuvo siete maridos.",
          "Paso 2, saber quiénes eran: no creían en la resurrección, y la pregunta era una trampa para ridiculizarla.",
          "Paso 3, ver la respuesta de Jesús: erraban por no conocer las Escrituras ni el poder de Dios (Mateo 22:29).",
          "Paso 4, notar el texto que usa: Dios es Dios de Abraham, de Isaac y de Jacob, Dios de vivos (Mateo 22:32).",
          "Paso 5, ver el efecto: la gente se admiraba de su doctrina (Mateo 22:33).",
          "Paso 6, aplicar: la esperanza de la resurrección descansa en el poder de Dios y en su Palabra.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No conviertas a los fariseos en caricaturas. Muchos eran sinceros, y algunos creyeron, como Nicodemo y Pablo. Jesús criticó la hipocresía, no el amor por la ley de Dios.",
      },
    ],
    ideaClave:
      "Jesús vivió la fe de su pueblo: iba a la sinagoga conforme a su costumbre (Lucas 4:16) y subía al templo en las fiestas. En su tiempo había fariseos, que guardaban la tradición de los ancianos (Marcos 7:3-4) y creían en la resurrección; saduceos, unidos al templo, que no la creían (Hechos 23:8); esenios, a quienes muchos relacionan con Qumrán; y zelotes. Conocerlos aclara muchos pasajes de los evangelios.",
    paraLaVida: {
      texto: "Amo la Palabra de Dios sin poner mis tradiciones por encima de ella.",
      pregunta: "¿Qué tradición de tu iglesia o de tu familia podría estar ocupando el lugar del mandamiento de Dios?",
    },
  },
  {
    id: "biblicos-avanzados-5-6",
    objetivos: [
      "Describir los principales hallazgos del Nuevo Testamento: la piedra de Pilato, el osario de Caifás, Betesda, Siloé y la sinagoga de Magdala.",
      "Relacionar cada hallazgo con su texto, diciendo lo que muestra y lo que se discute.",
      "Usar un hallazgo del Nuevo Testamento para enseñar un pasaje de los evangelios.",
    ],
    paraEmpezar:
      "Los evangelios nombran lugares y personas que se pueden buscar: un estanque con cinco pórticos, otro llamado Siloé, un sumo sacerdote llamado Caifás, un gobernador llamado Poncio Pilato. En el último siglo la arqueología ha encontrado varios de ellos. Cada hallazgo hace más concreta la historia y nos recuerda que Jesús caminó por lugares reales.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 5:2" },
      {
        t: "parrafo",
        texto:
          "Juan describe «un estanque, llamado en hebreo Betesda, el cual tiene cinco pórticos». Junto a la iglesia de Santa Ana, en Jerusalén, se excavaron dos estanques separados por un dique; muchos piensan que los cuatro lados y el dique explican los cinco pórticos, aunque quedan pocos restos de ellos.",
      },
      { t: "versiculo", ref: "Juan 9:7" },
      {
        t: "parrafo",
        texto:
          "Jesús le dijo al ciego: «Ve a lavarte en el estanque de Siloé». En 2004, durante unas obras, aparecieron las gradas de un gran estanque del tiempo de Jesús en la Ciudad de David. Muchos lo identifican con el Siloé de Juan 9, aunque algunos estudiosos lo discuten.",
      },
      { t: "versiculo", ref: "Mateo 26:57" },
      {
        t: "parrafo",
        texto:
          "A Jesús «le llevaron al sumo sacerdote Caifás». En 1990 se halló en Jerusalén un osario, una caja de piedra para los huesos, con el nombre de José hijo de Caifás. Es probable que sea el del sumo sacerdote, aunque no es seguro.",
      },
      {
        t: "cuadro",
        titulo: "Hallazgos del Nuevo Testamento",
        columnas: ["Hallazgo", "Dónde y cuándo", "Qué muestra", "Texto"],
        filas: [
          ["La piedra de Pilato", "Cesarea, 1961", "Poncio Pilato con el título de prefecto de Judea", "Lucas 3:1"],
          ["El osario de Caifás", "Jerusalén, 1990", "José hijo de Caifás, probablemente el sumo sacerdote", "Mateo 26:57"],
          ["El estanque de Betesda", "Jerusalén, junto a Santa Ana", "Un estanque doble cerca de la puerta de las ovejas", "Juan 5:2"],
          ["El estanque de Siloé", "Jerusalén, 2004", "Un gran estanque del tiempo de Jesús", "Juan 9:7"],
          ["La sinagoga de Magdala", "Galilea, 2009", "Una sinagoga del siglo primero, anterior al año 70", "Lucas 4:16"],
          ["La carta de Claudio en Delfos", "Delfos, Grecia", "Galión, procónsul de Acaya hacia el 51 y el 52", "Hechos 18:12"],
        ],
      },
      { t: "subtitulo", texto: "Lo que muestran y lo que se discute" },
      {
        t: "lista",
        items: [
          "La piedra de Pilato apareció en 1961 en el teatro de Cesarea, usada como escalón; lleva el nombre de Poncio Pilato y su título de prefecto de Judea, con algunas letras perdidas.",
          "La sinagoga de Magdala, hallada en 2009, es la primera del tiempo del segundo templo hallada en Galilea, y tiene una piedra labrada con un candelabro de siete brazos.",
          "El osario de Caifás probablemente fue del sumo sacerdote, pero no es seguro.",
          "Que el estanque hallado en 2004 sea el Siloé de Juan 9 es lo más aceptado, aunque se discute.",
          "Los cinco pórticos de Betesda son una interpretación de los restos, no un hallazgo indiscutido.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un dato confirmado y una conjetura" },
      {
        t: "lista",
        items: [
          "Un dato confirmado: Pilato fue prefecto de Judea; lo dice una inscripción con su nombre.",
          "Una conjetura: que la sinagoga de Teódoto sea la de los libertos de Hechos 6:9; puede ser, pero no se sabe.",
          "El buen maestro separa con claridad lo uno de lo otro.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: enseñar Juan 5 con el estanque de Betesda" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Juan 5:1-9: un hombre enfermo desde hacía treinta y ocho años junto al estanque.",
          "Paso 2, mostrar la ubicación: junto a la puerta de las ovejas, cerca del templo, donde hoy está la iglesia de Santa Ana.",
          "Paso 3, explicar lo que se halló: dos estanques separados por un dique.",
          "Paso 4, decir con honestidad lo que se discute: cómo eran exactamente los cinco pórticos.",
          "Paso 5, volver al centro del relato: Jesús sanó al que nadie ayudaba a meterse en el agua (Juan 5:7-8).",
          "Paso 6, aplicar: Jesús ve al que lleva años esperando y lo levanta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Los hallazgos no son el centro: el centro es Cristo. Úsalos para que la clase vea que el evangelio sucedió en lugares reales, y después lleva la atención al que sanó, enseñó, murió y resucitó.",
      },
    ],
    ideaClave:
      "La arqueología ha hallado lugares y nombres de los evangelios: la piedra de Pilato (1961), el osario de José hijo de Caifás (1990), los estanques de Betesda (Juan 5:2) y de Siloé (Juan 9:7), y la sinagoga de Magdala (2009). Unos datos están confirmados, como el título de Pilato, y otros se discuten, como los cinco pórticos. Muestran que Jesús caminó por lugares reales, y el centro sigue siendo él.",
    paraLaVida: {
      texto: "Enseño el evangelio como historia real y pongo siempre a Cristo en el centro.",
      pregunta: "¿Qué hallazgo del Nuevo Testamento te ayudaría a explicar a un amigo que Jesús es una persona histórica?",
    },
  },
];
