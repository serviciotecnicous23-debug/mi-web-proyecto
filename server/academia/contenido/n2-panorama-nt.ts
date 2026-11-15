/**
 * Nivel 2 · Materia 2 — Panorama del Nuevo Testamento (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Datos históricos comprobados en dos fuentes: Merrill C. Tenney, «Nuestro Nuevo Testamento» (Portavoz); Henrietta C.
 * Mears, «Lo que nos dice la Biblia» (Vida); Henry H. Halley, «Compendio manual de la Biblia». Las fechas antiguas,
 * aproximadas. Los videos son de Proyecto Biblia (canal oficial en español, comprobado).
 * Los últimos tiempos se enseñan sin entrar en los puntos que la declaración de fe deja «a confirmar»: el orden de los
 * acontecimientos se estudia en el Nivel 4.
 */
import type { LeccionContenido } from "../tipos";

export const N2_PANORAMA_NT: LeccionContenido[] = [
  {
    id: "n2-panorama-nt-1",
    objetivos: [
      "Describir cómo cambió el mundo entre Malaquías y el nacimiento de Jesús.",
      "Explicar por qué se dice que Jesús vino en «el cumplimiento del tiempo».",
      "Nombrar los grupos religiosos que aparecen en los evangelios.",
      "Nombrar las cinco secciones del Nuevo Testamento y sus libros.",
    ],
    paraEmpezar:
      "Entre el último profeta del Antiguo Testamento y el nacimiento de Jesús pasaron unos cuatrocientos años sin un nuevo libro de la Escritura. Pero no fueron años vacíos: Dios estaba preparando el mundo para la llegada de su Hijo.",
    bloques: [
      { t: "subtitulo", texto: "Del imperio persa al romano" },
      {
        t: "lista",
        items: [
          "Persia gobernaba cuando terminó el Antiguo Testamento. Después, Alejandro Magno conquistó el oriente y extendió el idioma griego: el Nuevo Testamento se escribió en ese griego común.",
          "En Egipto, los judíos tradujeron el Antiguo Testamento al griego (la versión llamada de los Setenta), que usaron muchos de los primeros cristianos.",
          "Roma dominó todo el Mediterráneo: con sus caminos y su paz, el evangelio pudo viajar rápido de una ciudad a otra. Cuando nació Jesús, gobernaba el emperador Augusto (Lucas 2:1).",
        ],
      },
      { t: "versiculo", ref: "Gálatas 4:4" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que Dios envió a su Hijo «cuando vino el cumplimiento del tiempo». Un idioma común, caminos seguros, sinagogas en muchas ciudades y un pueblo que esperaba al Mesías: Dios había preparado todo para que la buena noticia llegara a las naciones.",
      },
      { t: "subtitulo", texto: "El pueblo judío en tiempos de Jesús" },
      {
        t: "lista",
        items: [
          "Los fariseos eran maestros muy estrictos con la ley y con las tradiciones de los ancianos; Jesús denunció su hipocresía (Mateo 23:27-28).",
          "Los saduceos eran del grupo sacerdotal; no creían en la resurrección (Mateo 22:23).",
          "Los escribas copiaban y enseñaban la ley. El concilio (el sanedrín) era el tribunal supremo de los judíos.",
          "La sinagoga era el lugar donde los judíos se reunían cada sábado para leer las Escrituras y orar; allí enseñaron Jesús y después Pablo (Lucas 4:16).",
        ],
      },
      { t: "versiculo", ref: "Marcos 1:15" },
      { t: "subtitulo", texto: "Los 27 libros del Nuevo Testamento" },
      {
        t: "lista",
        items: [
          "Los evangelios (4): Mateo, Marcos, Lucas y Juan. Cuentan la vida, la muerte y la resurrección de Jesús.",
          "La historia (1): Hechos. Cuenta cómo nació la iglesia y cómo el evangelio llegó hasta Roma.",
          "Las cartas de Pablo (13): de Romanos a Filemón, escritas a iglesias y a personas.",
          "Las cartas generales (8): Hebreos, Santiago, 1 y 2 Pedro, 1, 2 y 3 Juan y Judas. Se escribieron para muchas iglesias; Hebreos no dice quién la escribió.",
          "La profecía (1): Apocalipsis, la revelación de Jesucristo y la esperanza de su regreso.",
        ],
      },
      {
        t: "nota",
        titulo: "Dos testamentos, una sola historia",
        texto:
          "El Antiguo Testamento anuncia y prepara la llegada del Mesías; el Nuevo cuenta que vino, murió, resucitó y volverá. Por eso se leen juntos: el Nuevo Testamento cita al Antiguo cientos de veces.",
      },
    ],
    ideaClave:
      "Entre los testamentos, Dios preparó el mundo con un idioma común, los caminos de Roma y un pueblo que esperaba al Mesías: Jesús vino en el cumplimiento del tiempo. El Nuevo Testamento lo cuenta en 27 libros: los evangelios, Hechos, las cartas y Apocalipsis.",
    paraLaVida: {
      texto: "Dios prepara el camino antes de que lo veamos.",
      pregunta: "¿En qué momento de tu vida viste después que Dios había preparado las cosas antes de tiempo?",
    },
  },
  {
    id: "n2-panorama-nt-2",
    objetivos: [
      "Nombrar los cuatro evangelios y el énfasis de cada uno.",
      "Explicar por qué se llaman sinópticos los tres primeros.",
      "Reconocer el propósito con que Juan escribió su evangelio.",
    ],
    paraEmpezar:
      "¿Por qué hay cuatro evangelios y no uno solo? Porque cuatro testigos, guiados por el Espíritu Santo, nos dan cuatro retratos del mismo Jesús. Juntos muestran quién es Él con más riqueza que un solo relato.",
    bloques: [
      { t: "subtitulo", texto: "Cuatro retratos de un mismo Jesús" },
      {
        t: "lista",
        items: [
          "Mateo, el cobrador de impuestos que siguió a Jesús (Mateo 9:9), escribió sobre todo para lectores judíos: presenta a Jesús como el Rey prometido, el hijo de David, y muestra cómo se cumplieron en Él las Escrituras (Mateo 1:1, 22-23).",
          "Marcos escribe con prisa y con acción: «luego», «en seguida». Es el evangelio más corto. Presenta a Jesús como el siervo que vino a dar su vida en rescate por muchos (Marcos 10:45).",
          "Lucas, el médico compañero de Pablo (Colosenses 4:14), investigó todo con cuidado y escribió por orden para Teófilo (Lucas 1:1-4). Muestra a Jesús como el Salvador de todos, que busca a los perdidos, a los pobres y a los marginados (Lucas 19:10).",
          "Juan, el discípulo amado, empieza con el Verbo eterno que se hizo carne (Juan 1:1, 14) y presenta a Jesús como el Hijo de Dios, con sus señales y sus grandes palabras «Yo soy» (Juan 8:12).",
        ],
      },
      { t: "versiculo", ref: "Juan 20:31" },
      {
        t: "parrafo",
        texto:
          "Juan dice para qué escribió: para que creamos que Jesús es el Cristo, el Hijo de Dios, y para que creyendo tengamos vida en su nombre. Los evangelios no son solo biografías: son testimonios para llevarnos a la fe.",
      },
      { t: "subtitulo", texto: "Los evangelios sinópticos" },
      {
        t: "parrafo",
        texto:
          "Mateo, Marcos y Lucas se llaman sinópticos (la palabra significa que se pueden ver juntos) porque cuentan muchas de las mismas escenas en un orden parecido y se pueden leer uno al lado del otro. Juan, en cambio, cuenta otras señales y largos discursos de Jesús, sobre todo en Jerusalén.",
      },
      {
        t: "nota",
        titulo: "Cómo leerlos",
        texto:
          "Cuando una historia aparece en dos o tres evangelios, léelas juntas: cada uno agrega detalles. Por ejemplo, la alimentación de los cinco mil está en los cuatro (Juan 6:1-14).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
    ],
    ideaClave:
      "Los cuatro evangelios son cuatro testimonios inspirados de un mismo Jesús: el Rey (Mateo), el Siervo (Marcos), el Salvador de todos (Lucas) y el Hijo de Dios (Juan), escritos para que creamos y tengamos vida.",
    paraLaVida: {
      texto: "Leer los evangelios es conocer a Jesús de cerca.",
      pregunta: "¿Cuál de los cuatro retratos de Jesús necesitas mirar más en esta etapa de tu vida, y por qué?",
    },
  },
  {
    id: "n2-panorama-nt-3",
    objetivos: [
      "Resumir las grandes etapas de la vida y el ministerio de Jesús.",
      "Explicar el centro del evangelio: la muerte y la resurrección de Cristo.",
      "Relacionar la ascensión de Jesús con la misión de la iglesia.",
    ],
    paraEmpezar:
      "Los evangelios dedican mucho espacio a la última semana de Jesús. No es casualidad: su muerte y su resurrección son el corazón de la buena noticia. Pero antes hubo unos treinta años de vida escondida y unos tres años de ministerio que cambiaron la historia.",
    bloques: [
      { t: "subtitulo", texto: "Su nacimiento y su preparación" },
      {
        t: "parrafo",
        texto:
          "Jesús nació en Belén, como habían anunciado los profetas, de la virgen María, y creció en Nazaret (Lucas 2:1-7; 2:39-40). Cerca de los treinta años fue bautizado por Juan en el Jordán: el Espíritu descendió sobre Él y el Padre habló desde el cielo (Mateo 3:16-17). Después fue tentado en el desierto y venció respondiendo con las Escrituras (Mateo 4:1-11).",
      },
      { t: "subtitulo", texto: "Su ministerio: enseñar, sanar y llamar discípulos" },
      { t: "versiculo", ref: "Mateo 4:23" },
      {
        t: "parrafo",
        texto:
          "Durante unos tres años (Juan menciona varias Pascuas en ese tiempo), sobre todo en Galilea, Jesús anunció el reino de Dios, enseñó con parábolas, sanó enfermos, libró a los oprimidos y llamó a doce discípulos para que estuvieran con Él y después lo anunciaran (Marcos 3:14). Sus obras mostraban quién era, y sus palabras, cómo es Dios.",
      },
      { t: "subtitulo", texto: "Su muerte y su resurrección" },
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "En Jerusalén, Jesús celebró la Pascua con sus discípulos y fue entregado, juzgado y crucificado. Murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras. Se apareció a muchos durante cuarenta días (Hechos 1:3). La resurrección muestra que su sacrificio fue aceptado y que la muerte fue vencida.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Su ascensión y su promesa" },
      { t: "versiculo", ref: "Hechos 1:8-11" },
      {
        t: "nota",
        titulo: "La misión continúa",
        texto:
          "Antes de subir al cielo, Jesús prometió el poder del Espíritu Santo y envió a sus discípulos a ser sus testigos. Los ángeles dijeron que así como lo vieron ir al cielo, así vendrá.",
      },
    ],
    ideaClave:
      "Jesús nació en Belén, anunció el reino de Dios con palabras y obras, murió por nuestros pecados, resucitó al tercer día y subió al cielo, desde donde volverá; nos dejó la misión de ser sus testigos.",
    paraLaVida: {
      texto: "La resurrección lo cambia todo.",
      pregunta: "¿Qué temor o qué pérdida de tu vida se ve distinto a la luz de la resurrección de Jesús?",
    },
  },
  {
    id: "n2-panorama-nt-4",
    objetivos: [
      "Resumir el libro de Hechos siguiendo el plan de Hechos 1:8.",
      "Describir el día de Pentecostés y el nacimiento de la iglesia.",
      "Explicar cómo el evangelio llegó a los gentiles y por medio de Pablo a muchas naciones.",
    ],
    paraEmpezar:
      "Lucas escribió dos libros: el evangelio, sobre lo que Jesús comenzó a hacer y enseñar, y Hechos, sobre lo que siguió haciendo por medio de su Espíritu en la iglesia (Hechos 1:1). Hechos es la historia de una iglesia en marcha.",
    bloques: [
      { t: "subtitulo", texto: "El plan del libro" },
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "lista",
        items: [
          "En Jerusalén (capítulos 1 a 7): Pentecostés, la primera iglesia y el testimonio valiente de Pedro y de Esteban, el primer mártir.",
          "En Judea y en Samaria (capítulos 8 a 12): la persecución esparce a los creyentes, que anuncian el evangelio por donde van; Felipe predica en Samaria y Pedro lleva el evangelio a Cornelio, un centurión romano.",
          "Hasta lo último de la tierra (capítulos 13 a 28): los viajes misioneros de Pablo y su llegada a Roma.",
        ],
      },
      { t: "subtitulo", texto: "Pentecostés: nace la iglesia" },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Cincuenta días después de la Pascua, el Espíritu Santo vino sobre los discípulos reunidos, y comenzaron a hablar en otras lenguas. Pedro predicó a Cristo crucificado y resucitado, y unas tres mil personas creyeron y fueron bautizadas (Hechos 2:41). La primera iglesia perseveraba en la enseñanza de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones (Hechos 2:42).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "El evangelio llega a los gentiles" },
      {
        t: "parrafo",
        texto:
          "Saulo, que perseguía a la iglesia, se encontró con Jesús resucitado camino a Damasco y fue llamado a llevar el evangelio a los gentiles (Hechos 9:15). Dios mostró a Pedro, en casa de Cornelio, que también los gentiles reciben el Espíritu por la fe (Hechos 10:44-45), y el concilio de Jerusalén confirmó que la salvación es por la gracia, sin exigirles la ley de Moisés (Hechos 15:11).",
      },
      { t: "subtitulo", texto: "Los viajes de Pablo y Roma" },
      {
        t: "parrafo",
        texto:
          "Pablo hizo tres viajes misioneros por Asia Menor y Grecia, fundando iglesias en ciudades como Filipos, Tesalónica, Corinto y Éfeso. Después fue arrestado en Jerusalén y llevado preso a Roma, donde siguió predicando el reino de Dios con toda libertad (Hechos 28:30-31). Así termina el libro: abierto, como la misión que continúa.",
      },
    ],
    ideaClave:
      "Hechos cuenta cómo, con el poder del Espíritu Santo, el evangelio avanzó desde Jerusalén, por Judea y Samaria, hasta lo último de la tierra, y cómo nació y creció la iglesia entre judíos y gentiles.",
    paraLaVida: {
      texto: "El libro de Hechos sigue abierto: la misión continúa con nosotros.",
      pregunta: "¿Dónde es tu Jerusalén, tu Judea y tu «lo último de la tierra»? ¿A quién puedes llevar hoy la buena noticia?",
    },
  },
  {
    id: "n2-panorama-nt-5",
    objetivos: [
      "Distinguir las cartas de Pablo de las epístolas generales.",
      "Resumir el mensaje central de algunas cartas clave.",
      "Explicar cómo se complementan la fe y las obras en Pablo y en Santiago.",
    ],
    paraEmpezar:
      "Veintiuno de los veintisiete libros del Nuevo Testamento son cartas. Los apóstoles escribían a iglesias y a personas concretas, con problemas concretos. Por eso las cartas son tan prácticas: enseñan qué creer y cómo vivirlo.",
    bloques: [
      { t: "subtitulo", texto: "Las cartas de Pablo" },
      {
        t: "lista",
        items: [
          "A iglesias: Romanos, 1 y 2 Corintios, Gálatas, Efesios, Filipenses, Colosenses y 1 y 2 Tesalonicenses.",
          "A personas: 1 y 2 Timoteo, Tito y Filemón. Las tres primeras se llaman pastorales, porque orientan a líderes de iglesias; en Filemón, Pablo le pide que reciba a Onésimo como a un hermano amado.",
        ],
      },
      { t: "versiculo", ref: "Romanos 5:1" },
      {
        t: "parrafo",
        texto:
          "Romanos explica el evangelio con más orden que ninguna otra carta: todos pecaron, Dios justifica por la fe en Cristo, y el creyente vive una vida nueva por el Espíritu. Gálatas defiende esa misma libertad frente a quienes querían volver a la ley. Efesios muestra la iglesia como el cuerpo de Cristo, y Filipenses, escrita desde la prisión, el gozo en medio de las pruebas.",
      },
      { t: "subtitulo", texto: "Las epístolas generales" },
      {
        t: "parrafo",
        texto:
          "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y a los sacrificios antiguos, y anima a no volver atrás. Santiago enseña una fe que se ve en las obras. Pedro anima a los que sufren por su fe; Juan llama a andar en la luz y en el amor; y Judas advierte contra los falsos maestros. Se llaman generales porque se escribieron para muchas iglesias.",
      },
      { t: "subtitulo", texto: "Fe y obras: Pablo y Santiago" },
      { t: "versiculo", ref: "Efesios 2:8-10" },
      { t: "versiculo", ref: "Santiago 2:17-18" },
      {
        t: "nota",
        titulo: "No se contradicen",
        texto:
          "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras; Santiago, que esa fe verdadera se demuestra con obras. Somos salvos por la fe sola, pero la fe que salva nunca está sola: produce buenas obras.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
    ],
    ideaClave:
      "Las cartas del Nuevo Testamento enseñan qué creer y cómo vivir: somos justificados por la fe en Cristo, y esa fe verdadera se ve en una vida nueva y en buenas obras.",
    paraLaVida: {
      texto: "Las cartas fueron escritas para gente como tú.",
      pregunta: "¿Qué carta del Nuevo Testamento podrías leer completa esta semana, como si te la hubieran escrito a ti?",
    },
  },
  {
    id: "n2-panorama-nt-6",
    objetivos: [
      "Describir el propósito y el estilo del libro de Apocalipsis.",
      "Resumir el mensaje de las cartas a las siete iglesias.",
      "Explicar la esperanza final que anuncia Apocalipsis.",
    ],
    paraEmpezar:
      "Apocalipsis quiere decir revelación. Juan lo escribió desterrado en la isla de Patmos, en tiempos de persecución, para animar a las iglesias: Jesucristo reina, vuelve y hará nuevas todas las cosas.",
    bloques: [
      { t: "subtitulo", texto: "Un libro de visiones y de esperanza" },
      { t: "versiculo", ref: "Apocalipsis 1:1-3" },
      {
        t: "parrafo",
        texto:
          "Apocalipsis está escrito en un estilo de visiones y símbolos que los primeros lectores conocían por los profetas, como Daniel y Ezequiel. Por eso hay que leerlo con humildad, comparando la Escritura con la Escritura, sin perder de vista su mensaje central: Dios está en el trono y el Cordero vence.",
      },
      { t: "subtitulo", texto: "Las cartas a las siete iglesias (capítulos 2 y 3)" },
      {
        t: "parrafo",
        texto:
          "Cristo resucitado habla a siete iglesias de Asia: alaba lo bueno, corrige lo malo y promete premios al que venza. A Éfeso le dice que dejó su primer amor; a Laodicea, que es tibia. Esas cartas siguen hablando hoy a cada iglesia y a cada creyente.",
      },
      { t: "subtitulo", texto: "El trono, el Cordero y la victoria" },
      { t: "versiculo", ref: "Apocalipsis 5:12" },
      {
        t: "parrafo",
        texto:
          "En el cielo, Juan ve a Dios en su trono y al Cordero que fue inmolado, digno de abrir el libro de la historia. Después vienen juicios sobre el mal, la caída de los enemigos de Dios y la victoria final de Cristo. Los detalles del orden de los últimos tiempos se estudian en el Nivel 4; aquí basta lo seguro: Cristo volverá, juzgará al mundo y reinará.",
      },
      { t: "subtitulo", texto: "Todo hecho nuevo" },
      { t: "versiculo", ref: "Apocalipsis 21:3-5" },
      { t: "versiculo", ref: "Apocalipsis 22:20" },
      {
        t: "nota",
        titulo: "El final de la historia",
        texto:
          "La Biblia empieza con un huerto y termina con una ciudad donde Dios habita con su pueblo, sin llanto, ni dolor, ni muerte. Casi al final, la iglesia responde a la promesa de Cristo con una oración: «Amén; sí, ven, Señor Jesús».",
      },
    ],
    ideaClave:
      "Apocalipsis anima a la iglesia con la visión de Cristo que reina y vence: llama a las iglesias a ser fieles, anuncia su regreso y el día en que Dios hará nuevas todas las cosas.",
    paraLaVida: {
      texto: "La historia tiene un final, y está en las manos de Cristo.",
      pregunta: "¿Cómo cambia tu manera de vivir hoy saber que Jesús volverá y que Dios hará nuevas todas las cosas?",
    },
  },
];
