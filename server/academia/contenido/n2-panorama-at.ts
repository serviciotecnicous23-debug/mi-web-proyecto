/**
 * Nivel 2 · Materia 1 — Panorama del Antiguo Testamento (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Datos históricos comprobados en dos fuentes: Henrietta C. Mears, «Lo que nos dice la Biblia»; Samuel J. Schultz,
 * «Habla el Antiguo Testamento»; Henry H. Halley, «Compendio manual de la Biblia». Las fechas antiguas se dan como
 * aproximadas («hacia», «alrededor de»), como las dan esas obras.
 */
import type { LeccionContenido } from "../tipos";

export const N2_PANORAMA_AT: LeccionContenido[] = [
  {
    id: "n2-panorama-at-1",
    objetivos: [
      "Nombrar las cinco secciones del Antiguo Testamento y cuántos libros tiene cada una.",
      "Explicar por qué el Antiguo Testamento es parte de la Biblia del cristiano.",
      "Reconocer la promesa de Génesis 3:15 como el hilo que une toda la historia.",
    ],
    paraEmpezar:
      "Cuando Jesús resucitado caminó con dos discípulos hacia Emaús, les explicó quién era Él usando solo una Biblia: la que hoy llamamos Antiguo Testamento. Para entender a Cristo, hay que conocer las Escrituras que Él mismo leyó.",
    bloques: [
      { t: "subtitulo", texto: "La Biblia que Jesús leyó" },
      { t: "versiculo", ref: "Lucas 24:27" },
      {
        t: "parrafo",
        texto:
          "Jesús empezó «desde Moisés» y siguió por «todos los profetas», mostrando lo que las Escrituras decían de Él. El Antiguo Testamento no es una parte vieja que ya no sirve: es el primer tomo de una sola historia, la de Dios rescatando a la humanidad, que llega a su punto más alto en Jesucristo.",
      },
      { t: "versiculo", ref: "Romanos 15:4" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que lo que se escribió antes se escribió para nuestra enseñanza. Las historias de Abraham, de Moisés, de David o de los profetas nos enseñan quién es Dios, cómo es el corazón humano y cómo Dios cumple lo que promete. Por eso nos dan paciencia, consuelo y esperanza.",
      },
      { t: "subtitulo", texto: "Cinco secciones, treinta y nueve libros" },
      {
        t: "lista",
        items: [
          "La Ley o Pentateuco (5 libros): Génesis, Éxodo, Levítico, Números y Deuteronomio. Los comienzos y el pacto de Dios con Israel.",
          "Los libros históricos (12): de Josué a Ester. La vida de Israel en su tierra, el reino, la caída y el regreso del exilio.",
          "Los libros poéticos (5): Job, Salmos, Proverbios, Eclesiastés y Cantares. La oración, la adoración y la sabiduría del pueblo de Dios.",
          "Los profetas mayores (5): Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel.",
          "Los profetas menores (12): de Oseas a Malaquías.",
        ],
      },
      {
        t: "nota",
        titulo: "Mayores y menores",
        texto:
          "Los profetas se llaman mayores o menores por lo largo de sus libros, no por su importancia. Un libro corto como Miqueas anunció dónde nacería el Mesías (Miqueas 5:2).",
      },
      { t: "versiculo", ref: "Lucas 24:44" },
      {
        t: "parrafo",
        texto:
          "Los judíos ordenan los mismos libros en tres grupos: la Ley, los Profetas y los Escritos, y los Salmos encabezan los Escritos. Por eso Jesús habló de «la ley de Moisés», «los profetas» y «los salmos»: estaba nombrando toda la Escritura de su tiempo.",
      },
      { t: "subtitulo", texto: "El hilo de toda la historia" },
      { t: "versiculo", ref: "Génesis 3:15" },
      {
        t: "parrafo",
        texto:
          "Apenas el ser humano cayó en el pecado, Dios prometió que un descendiente de la mujer heriría la cabeza de la serpiente. Esa promesa es como un hilo rojo que atraviesa todo el Antiguo Testamento: se hace más clara con Abraham, con Moisés, con David y con los profetas, hasta cumplirse en Jesús, que venció al diablo en la cruz.",
      },
    ],
    ideaClave:
      "El Antiguo Testamento tiene 39 libros en cinco secciones y cuenta la primera parte de una sola historia: Dios cumpliendo su promesa de salvación, que se cumple en Cristo.",
    paraLaVida: {
      texto: "Leer el Antiguo Testamento es conocer mejor a Jesús.",
      pregunta: "¿Qué parte del Antiguo Testamento conoces menos, y cómo podrías empezar a leerla esta semana?",
    },
  },
  {
    id: "n2-panorama-at-2",
    objetivos: [
      "Resumir los grandes momentos de Génesis: creación, caída, diluvio, Babel y los patriarcas.",
      "Explicar la promesa de Dios a Abraham y por qué es importante para el creyente.",
      "Reconocer cómo Dios obró en la vida de José para bien de su pueblo.",
    ],
    paraEmpezar:
      "Génesis quiere decir origen. En sus cincuenta capítulos están los comienzos de casi todo: el universo, el ser humano, el matrimonio, el pecado, las naciones y el pueblo de Israel. Y, sobre todo, el comienzo del plan de Dios para salvar.",
    bloques: [
      { t: "subtitulo", texto: "La creación y la caída (Génesis 1 a 3)" },
      { t: "versiculo", ref: "Génesis 1:1" },
      { t: "versiculo", ref: "Génesis 1:27" },
      {
        t: "parrafo",
        texto:
          "Dios creó todo con su palabra y vio que era bueno. Al ser humano lo hizo a su imagen, varón y hembra, para tener comunión con Él y cuidar la creación. Pero Adán y Eva desobedecieron, y el pecado trajo la separación de Dios, el dolor y la muerte. Aun así, Dios no los abandonó: los buscó, los vistió y les dio la promesa de un Salvador (Génesis 3:15).",
      },
      { t: "subtitulo", texto: "El diluvio y Babel (Génesis 4 a 11)" },
      {
        t: "parrafo",
        texto:
          "El pecado se extendió: Caín mató a su hermano y la maldad llegó a llenar la tierra. Dios juzgó al mundo con el diluvio, pero salvó a Noé y a su familia en el arca, y después hizo pacto con él con la señal del arco iris (Génesis 9:13). Más tarde, en Babel, los hombres quisieron hacerse un nombre sin Dios, y Él confundió su lengua y los esparció por la tierra.",
      },
      { t: "subtitulo", texto: "Abraham: el llamado y la promesa (Génesis 12 a 25)" },
      { t: "versiculo", ref: "Génesis 12:1-3" },
      {
        t: "parrafo",
        texto:
          "Unos dos mil años antes de Cristo, Dios llamó a Abram a dejar su tierra en Ur de los caldeos y le hizo tres promesas: una tierra, una descendencia que sería una gran nación y una bendición para todas las familias de la tierra. Esa última promesa se cumple en Jesús, descendiente de Abraham, por quien la bendición llega a todos los pueblos (Gálatas 3:8).",
      },
      { t: "versiculo", ref: "Génesis 15:6" },
      {
        t: "parrafo",
        texto:
          "Abraham creyó a Dios y le fue contado por justicia. Mucho antes de la ley, la Biblia muestra que Dios declara justo al que cree en Él. Pablo usa este versículo para enseñar que somos salvos por la fe (Romanos 4:3).",
      },
      { t: "subtitulo", texto: "Isaac, Jacob y José (Génesis 25 a 50)" },
      {
        t: "parrafo",
        texto:
          "Dios confirmó su promesa a Isaac, el hijo que nació cuando todo parecía imposible, y después a Jacob, a quien cambió el nombre por Israel. Los doce hijos de Jacob dieron origen a las doce tribus. José, vendido por sus hermanos, llegó a gobernar Egipto y salvó a su familia del hambre. Así Israel terminó viviendo en Egipto.",
      },
      { t: "versiculo", ref: "Génesis 50:20" },
      { t: "video", url: "https://bibleproject.com/es/videos/genesis-1-11/", titulo: "Resumen del libro de Génesis (parte 1): Génesis 1-11", fuente: "Proyecto Biblia", minutos: 8 },
      {
        t: "nota",
        titulo: "Dios sigue obrando",
        texto: "José pudo decir a sus hermanos que lo que ellos pensaron para mal, Dios lo encaminó a bien. Ningún dolor queda fuera del alcance de los planes de Dios (Romanos 8:28).",
      },
    ],
    ideaClave:
      "Génesis cuenta el origen de todo y del pecado, y el comienzo del plan de salvación: Dios promete a Abraham que en su descendencia serán benditas todas las familias de la tierra.",
    paraLaVida: {
      texto: "Abraham creyó cuando todavía no veía la promesa cumplida.",
      pregunta: "¿Qué promesa de Dios te cuesta creer hoy, y qué te enseña la historia de Abraham sobre esperar en Él?",
    },
  },
  {
    id: "n2-panorama-at-3",
    objetivos: [
      "Contar cómo Dios libró a Israel de Egipto y qué significó la Pascua.",
      "Explicar el pacto del Sinaí y el propósito de la ley y del tabernáculo.",
      "Resumir el mensaje de Levítico, Números y Deuteronomio.",
    ],
    paraEmpezar:
      "Cuatrocientos años después de José, los descendientes de Jacob ya no eran una familia: eran un pueblo numeroso y esclavo en Egipto. El libro de Éxodo cuenta cómo Dios escuchó su clamor y los sacó con mano poderosa para hacerlos su pueblo.",
    bloques: [
      { t: "subtitulo", texto: "Dios llama a Moisés (Éxodo 1 a 4)" },
      { t: "versiculo", ref: "Éxodo 3:14" },
      {
        t: "parrafo",
        texto:
          "Desde una zarza que ardía sin consumirse, Dios llamó a Moisés y le reveló su nombre: «YO SOY EL QUE SOY». Es el Dios que existe por sí mismo, que no cambia y que está presente con su pueblo. Jesús usó ese mismo nombre para hablar de sí (Juan 8:58).",
      },
      { t: "subtitulo", texto: "Las plagas, la Pascua y el mar Rojo (Éxodo 5 a 15)" },
      { t: "versiculo", ref: "Éxodo 12:13" },
      {
        t: "parrafo",
        texto:
          "Faraón endureció su corazón, y Dios envió diez plagas sobre Egipto. En la última, la muerte de los primogénitos, cada familia israelita sacrificó un cordero y puso su sangre en los postes de la puerta: al ver la sangre, el Señor pasaba de largo. Esa fue la primera Pascua. Después Dios abrió el mar Rojo, su pueblo pasó en seco y el ejército de Faraón quedó bajo las aguas.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/exodo-1-18/", titulo: "Resumen del libro de Éxodo (parte 1): Éxodo 1-18", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "Cristo, nuestra pascua",
        texto: "El cordero de la Pascua señalaba a Jesús. Pablo escribe que Cristo, nuestra pascua, ya fue sacrificado por nosotros (1 Corintios 5:7): su sangre nos libra del juicio.",
      },
      { t: "subtitulo", texto: "El pacto del Sinaí (Éxodo 19 a 40)" },
      { t: "versiculo", ref: "Éxodo 19:5-6" },
      { t: "versiculo", ref: "Éxodo 20:2-3" },
      {
        t: "parrafo",
        texto:
          "En el monte Sinaí, Dios hizo pacto con Israel. Primero recordó lo que ya había hecho —los sacó de la esclavitud— y después les dio los Diez Mandamientos y sus leyes: la ley no era el precio para ser salvos, sino la manera de vivir del pueblo que Dios ya había rescatado. También mandó construir el tabernáculo, la tienda donde Él habitaría en medio de ellos.",
      },
      { t: "subtitulo", texto: "Levítico, Números y Deuteronomio" },
      { t: "versiculo", ref: "Levítico 19:2" },
      {
        t: "lista",
        items: [
          "Levítico enseña a acercarse a un Dios santo: los sacrificios, el sacerdocio y el día de la expiación. Todo apuntaba al sacrificio perfecto de Cristo (Hebreos 10:10).",
          "Números cuenta los cuarenta años en el desierto: por su incredulidad, aquella generación no entró en la tierra prometida, pero Dios siguió guiando y sustentando a su pueblo (Números 14:33-34).",
          "Deuteronomio recoge los últimos discursos de Moisés antes de entrar a Canaán: el llamado a amar a Dios con todo el corazón y a obedecer su palabra.",
        ],
      },
      { t: "versiculo", ref: "Deuteronomio 6:4-5" },
    ],
    ideaClave:
      "En el Éxodo Dios libra a Israel por la sangre del cordero, hace pacto con él en el Sinaí y le da su ley y su tabernáculo: el pueblo rescatado aprende a vivir en santidad con Dios en medio.",
    paraLaVida: {
      texto: "Dios primero salva y después enseña a vivir.",
      pregunta: "¿Obedeces a Dios para ganar su amor o porque ya te amó y te rescató? ¿Qué cambia entre una cosa y la otra?",
    },
  },
  {
    id: "n2-panorama-at-4",
    objetivos: [
      "Resumir la historia de Israel desde la conquista hasta la caída de Jerusalén.",
      "Explicar el pacto de Dios con David y su relación con el Mesías.",
      "Reconocer las consecuencias de la desobediencia en la historia de Israel.",
    ],
    paraEmpezar:
      "Los libros históricos cuentan casi mil años de la vida de Israel. Hay victorias y derrotas, reyes fieles y reyes malvados. Pero en medio de todo se ve una verdad: Dios es fiel aunque su pueblo no lo sea.",
    bloques: [
      { t: "subtitulo", texto: "La conquista y los jueces (Josué, Jueces y Rut)" },
      { t: "versiculo", ref: "Josué 1:8-9" },
      {
        t: "parrafo",
        texto:
          "Después de Moisés, Josué guió al pueblo a la tierra prometida. Dios le pidió meditar en su ley de día y de noche y le prometió estar con él. Cuando Israel se apartaba de Dios, venía la opresión; cuando clamaba, Dios levantaba jueces que lo libraban, como Débora, Gedeón o Sansón. Fue un tiempo de desorden, en que cada uno hacía lo que bien le parecía (Jueces 21:25).",
      },
      {
        t: "parrafo",
        texto:
          "En medio de esos días oscuros, el libro de Rut cuenta la fidelidad de una mujer moabita que eligió al Dios de Israel. Rut fue bisabuela del rey David y está en la genealogía de Jesús (Mateo 1:5).",
      },
      { t: "subtitulo", texto: "El reino: Saúl, David y Salomón (1 y 2 Samuel, 1 Reyes)" },
      {
        t: "parrafo",
        texto:
          "El último juez fue Samuel. El pueblo pidió un rey, y Saúl fue el primero, pero desobedeció a Dios. Entonces Dios eligió a David, un joven pastor, porque Él mira el corazón (1 Samuel 16:7). Hacia el año 1000 antes de Cristo, David hizo de Jerusalén su capital.",
      },
      { t: "versiculo", ref: "2 Samuel 7:16" },
      {
        t: "parrafo",
        texto:
          "Dios prometió a David que su trono sería estable eternamente. Ningún rey humano cumplió del todo esa promesa: se cumple en Jesús, el Hijo de David, cuyo reino no tendrá fin (Lucas 1:32-33). Salomón, hijo de David, construyó el templo de Jerusalén, pero al final de su vida se apartó de Dios.",
      },
      { t: "subtitulo", texto: "El reino dividido y la caída (1 y 2 Reyes, 1 y 2 Crónicas)" },
      {
        t: "lista",
        items: [
          "Hacia el año 930 antes de Cristo, después de Salomón, el reino se dividió en dos: Israel al norte, con diez tribus, y Judá al sur, con Jerusalén.",
          "El reino del norte se apartó de Dios desde el principio: ninguno de sus reyes lo siguió de corazón. En el 722 antes de Cristo cayó ante Asiria y su pueblo fue llevado cautivo (2 Reyes 17:6).",
          "Judá tuvo algunos reyes que buscaron a Dios, como Ezequías y Josías, pero también siguió a los ídolos. En el 586 antes de Cristo, Babilonia destruyó Jerusalén y su templo (2 Reyes 25:9).",
        ],
      },
      {
        t: "nota",
        titulo: "Los libros de Crónicas",
        texto: "Crónicas vuelve a contar la historia del reino desde Judá y el templo, escrita para los que regresaron del exilio, para recordarles que Dios no había olvidado su promesa a David.",
      },
    ],
    ideaClave:
      "De Josué a Crónicas, Israel vive en su tierra, tiene reyes y se aparta de Dios hasta caer ante Asiria y Babilonia; pero Dios mantiene su promesa a David, que se cumple en Jesús, el Rey eterno.",
    paraLaVida: {
      texto: "Dios mira el corazón.",
      pregunta: "¿Qué ocupa el trono de tu corazón hoy? ¿Hay algo que se ha puesto en el lugar de Dios?",
    },
  },
  {
    id: "n2-panorama-at-5",
    objetivos: [
      "Describir el propósito de los libros poéticos y de sabiduría.",
      "Explicar cuál era la misión de los profetas.",
      "Identificar profecías del Antiguo Testamento que se cumplieron en Jesús.",
    ],
    paraEmpezar:
      "Además de historia, el Antiguo Testamento tiene oraciones, cantos, consejos para la vida y mensajes de los profetas. Son libros que hablan al corazón: enseñan a orar en el dolor, a vivir con sabiduría y a esperar en las promesas de Dios.",
    bloques: [
      { t: "subtitulo", texto: "Los libros poéticos: orar, adorar y vivir con sabiduría" },
      { t: "versiculo", ref: "Salmos 1:1-2" },
      {
        t: "lista",
        items: [
          "Job enfrenta la pregunta del sufrimiento del justo y termina adorando a un Dios más grande que su dolor.",
          "Salmos es el libro de oración y alabanza del pueblo de Dios: hay salmos de gozo, de lamento, de arrepentimiento y de confianza.",
          "Proverbios enseña la sabiduría para la vida diaria: el trabajo, las palabras, el dinero, la familia y las amistades.",
          "Eclesiastés muestra que todo es vanidad sin Dios y concluye con el llamado a temerle y guardar sus mandamientos (Eclesiastés 12:13).",
          "Cantares celebra el amor entre el esposo y la esposa como un regalo de Dios.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 1:7" },
      { t: "subtitulo", texto: "Los profetas: la voz de Dios a su pueblo" },
      {
        t: "parrafo",
        texto:
          "Los profetas fueron mensajeros que Dios levantó, sobre todo en los años del reino dividido, del exilio y del regreso. No eran adivinos: hablaban de parte de Dios. Denunciaban la idolatría y la injusticia, llamaban al pueblo al arrepentimiento, anunciaban el juicio si no se volvían a Dios y daban esperanza con las promesas de restauración y del Mesías.",
      },
      { t: "versiculo", ref: "Jeremías 31:31-33" },
      {
        t: "parrafo",
        texto:
          "Jeremías anunció un nuevo pacto, en el que Dios escribiría su ley en el corazón de su pueblo. Jesús dijo en la última cena que su sangre era la del nuevo pacto (Lucas 22:20).",
      },
      { t: "subtitulo", texto: "Promesas del Mesías que se cumplieron en Jesús" },
      {
        t: "lista",
        items: [
          "Nacería de una virgen (Isaías 7:14), y se cumplió en Mateo 1:22-23.",
          "Nacería en Belén (Miqueas 5:2), y se cumplió en Mateo 2:1-6.",
          "Llevaría nuestros pecados y por sus llagas seríamos curados (Isaías 53:5-6), y se cumplió en la cruz (1 Pedro 2:24).",
          "Entraría a Jerusalén humilde, montado en un asno (Zacarías 9:9), y se cumplió en Mateo 21:4-5.",
        ],
      },
      { t: "versiculo", ref: "Isaías 53:5" },
    ],
    ideaClave:
      "Los libros poéticos enseñan a orar y a vivir con sabiduría, y los profetas llamaron al pueblo a volver a Dios y anunciaron al Mesías: sus promesas se cumplieron en Jesús.",
    paraLaVida: {
      texto: "Los salmos te dan palabras para hablar con Dios en todo momento.",
      pregunta: "¿Qué salmo podrías orar esta semana con tus propias palabras, y por qué ese?",
    },
  },
  {
    id: "n2-panorama-at-6",
    objetivos: [
      "Contar el exilio en Babilonia y el regreso de Judá a su tierra.",
      "Describir la obra de Esdras, Nehemías y Ester.",
      "Explicar cómo termina el Antiguo Testamento y cómo prepara la venida de Cristo.",
    ],
    paraEmpezar:
      "Jerusalén había caído y el templo estaba en ruinas. Parecía el final. Pero Dios había dicho por Jeremías que el exilio duraría setenta años y que después traería a su pueblo de vuelta (Jeremías 29:10). Dios cumple su palabra, aun en tierra extraña.",
    bloques: [
      { t: "subtitulo", texto: "En Babilonia: Daniel y Ezequiel" },
      { t: "versiculo", ref: "Daniel 1:8" },
      {
        t: "parrafo",
        texto:
          "Daniel fue llevado joven a Babilonia con otros jóvenes de Judá, y propuso en su corazón no contaminarse. Él y sus amigos se mantuvieron fieles a Dios en el palacio, en el horno de fuego y en el foso de los leones, y Dios les dio sabiduría. Ezequiel, profeta entre los cautivos, anunció que Dios daría a su pueblo un corazón nuevo y su Espíritu (Ezequiel 36:26-27).",
      },
      { t: "subtitulo", texto: "El regreso: Esdras y Nehemías" },
      { t: "versiculo", ref: "Esdras 1:1-3" },
      {
        t: "lista",
        items: [
          "En el 538 antes de Cristo, Ciro, rey de Persia, permitió a los judíos volver a Jerusalén para reconstruir el templo. Con ánimo de los profetas Hageo y Zacarías, lo terminaron hacia el 516 antes de Cristo.",
          "Esdras, escriba y sacerdote, enseñó la ley de Dios al pueblo y lo llamó a volver a Él (Esdras 7:10).",
          "Nehemías, copero del rey de Persia, volvió a Jerusalén y dirigió la reconstrucción de los muros, que se terminaron en cincuenta y dos días a pesar de la oposición (Nehemías 6:15).",
        ],
      },
      { t: "subtitulo", texto: "Ester: Dios cuida a su pueblo" },
      { t: "versiculo", ref: "Ester 4:14" },
      {
        t: "parrafo",
        texto:
          "Ester, una joven judía que llegó a ser reina de Persia, arriesgó su vida para salvar a su pueblo de un decreto de muerte. El libro no menciona el nombre de Dios, pero toda la historia muestra su mano guiando cada detalle.",
      },
      { t: "subtitulo", texto: "Malaquías y la espera del Mesías" },
      { t: "versiculo", ref: "Malaquías 3:1" },
      {
        t: "parrafo",
        texto:
          "Malaquías, el último de los profetas, escribió unos cuatrocientos años antes de Cristo. Llamó al pueblo a dejar la indiferencia y anunció que Dios enviaría su mensajero delante de Él. Después vinieron unos cuatrocientos años en que no se escribió otro libro de la Escritura, hasta que Juan el Bautista preparó el camino del Señor (Mateo 11:10).",
      },
      { t: "versiculo", ref: "Gálatas 4:4" },
      {
        t: "nota",
        titulo: "La historia continúa",
        texto: "El Antiguo Testamento termina esperando. El Nuevo Testamento empieza con el cumplimiento: Jesucristo, hijo de David, hijo de Abraham (Mateo 1:1).",
      },
    ],
    ideaClave:
      "Después del exilio, Dios trajo a su pueblo de vuelta: reconstruyeron el templo y los muros, y Malaquías cerró el Antiguo Testamento anunciando al mensajero que prepararía la venida del Señor.",
    paraLaVida: {
      texto: "Dios cumple sus promesas a su tiempo.",
      pregunta: "¿Qué ruinas de tu vida necesitan reconstrucción, y qué te enseña Nehemías sobre empezar con oración?",
    },
  },
];
