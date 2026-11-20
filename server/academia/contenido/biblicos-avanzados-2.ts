/**
 * Especialidad Estudios bíblicos avanzados · Materia 2 — Hechos: la misión de la iglesia primitiva (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia avanzada que va más allá de Los Evangelios y Hechos (Nivel 3): Lucas como historiador y teólogo, el plan del
 * libro, Pentecostés y el Espíritu, la iglesia de Jerusalén y el concilio, los viajes de Pablo y la plantación de iglesias,
 * y los juicios de Pablo hasta Roma, con tres esquemas. Datos comprobados: la carta de Claudio en Delfos fecha a Galión hacia
 * el 51 y el 52; los politarcas en inscripciones de Tesalónica y Macedonia; los pasajes en nosotros (16:10-17; 20:5-15;
 * 21:1-18; 27:1 a 28:16); el concilio hacia el 49; los viajes hacia el 46 al 48, 49 al 52 y 53 al 57; Festo hacia el 59 y
 * Roma hacia el 60 al 62. La postura del ministerio sobre las lenguas y el bautismo en el Espíritu queda para su declaración
 * de fe.
 */
import type { LeccionContenido } from "../tipos";

export const BIBLICOS_AVANZADOS_2: LeccionContenido[] = [
  {
    id: "biblicos-avanzados-2-1",
    objetivos: [
      "Explicar, con Lucas 1:1-4 y Hechos 1:1-3, quién escribió Hechos y para qué.",
      "Reconocer en Hechos las huellas de un historiador cuidadoso: los pasajes en nosotros y los datos que confirman otras fuentes.",
      "Explicar lo que Lucas quiere enseñar como teólogo, no solo como historiador.",
    ],
    paraEmpezar:
      "Hechos es la segunda parte de una obra en dos tomos: el evangelio de Lucas cuenta lo que Jesús comenzó a hacer y a enseñar, y Hechos, lo que siguió haciendo por medio de su Espíritu y de su iglesia. Su autor investigó con cuidado, viajó con Pablo y escribió para que Teófilo conociera bien la verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=bPzhlL9zKmg", titulo: "Resumen del libro de Lucas (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Lucas 1:1-4" },
      {
        t: "parrafo",
        texto:
          "Lucas no inventó una historia: dice que investigó «con diligencia todas las cosas desde su origen» y que escribió «por orden», para que Teófilo conociera bien la verdad. Habló con los que vieron los hechos con sus ojos.",
      },
      { t: "versiculo", ref: "Hechos 1:1-3" },
      {
        t: "parrafo",
        texto:
          "«En el primer tratado, oh Teófilo, hablé acerca de todas las cosas que Jesús comenzó a hacer y a enseñar». La palabra comenzó deja ver la idea del libro: Jesús resucitado sigue obrando por su Espíritu en la iglesia.",
      },
      { t: "versiculo", ref: "Hechos 16:10" },
      {
        t: "parrafo",
        texto:
          "De pronto el relato pasa de ellos a nosotros: «en seguida procuramos partir para Macedonia». Es uno de los pasajes en primera persona del plural, donde el autor parece contar lo que vivió junto a Pablo.",
      },
      { t: "subtitulo", texto: "Quién era Lucas" },
      {
        t: "lista",
        items: [
          "Un médico, compañero de Pablo, a quien él llama el médico amado (Colosenses 4:14; Filemón 24).",
          "Fiel hasta el final: cuando muchos dejaron a Pablo, solo Lucas estaba con él (2 Timoteo 4:11).",
          "La tradición antigua, desde Ireneo en el siglo II, le atribuye el tercer evangelio y Hechos.",
          "Escribió a Teófilo, quizá un hombre de posición que ya había sido instruido en la fe (Lucas 1:3-4).",
        ],
      },
      { t: "subtitulo", texto: "Las huellas de un historiador cuidadoso" },
      {
        t: "lista",
        items: [
          "Los pasajes en nosotros: Hechos 16:10-17; 20:5-15; 21:1-18 y 27:1 a 28:16, donde el autor se cuenta dentro del grupo.",
          "Galión, procónsul de Acaya (Hechos 18:12): una carta del emperador Claudio grabada en Delfos lo nombra procónsul, y permite fechar su gobierno hacia el 51 y el 52; es el punto más firme para fechar la vida de Pablo.",
          "Los politarcas: el título que Lucas da a las autoridades de Tesalónica (Hechos 17:6) aparece en inscripciones de esa ciudad y de Macedonia, algunas del tiempo de Augusto.",
          "Los títulos correctos: Lucas llama procónsul al gobernador de Chipre y al de Acaya, que eran provincias gobernadas por el senado de Roma (Hechos 13:7; 18:12).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el historiador y el teólogo" },
      {
        t: "lista",
        items: [
          "Como historiador, Lucas cuida los lugares, los nombres, los viajes y los tiempos.",
          "Como teólogo, escoge y ordena lo que cuenta para enseñar: el Espíritu guía la misión, el evangelio es para todos y nada lo puede detener (Hechos 1:8; 28:31).",
          "Las dos cosas van juntas: Lucas cuenta lo que pasó para que el lector conozca bien la verdad (Lucas 1:4).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: explicar a un joven por qué confiar en Hechos" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Lucas 1:1-4: Lucas investigó con diligencia y escribió por orden.",
          "Paso 2, mostrar los pasajes en nosotros: el autor estuvo en muchos de los viajes que cuenta.",
          "Paso 3, mostrar un dato que confirma otra fuente: Galión, procónsul de Acaya, nombrado en una carta grabada en Delfos.",
          "Paso 4, explicar que la arqueología no prueba la fe, pero muestra que Lucas fue un historiador cuidadoso.",
          "Paso 5, leer Hechos 1:3: Jesús se presentó vivo con muchas pruebas indubitables.",
          "Paso 6, invitarlo a leer Hechos completo, como Teófilo, para conocer bien la verdad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No exageres los datos: algunos estudiosos discuten si el autor viajó de verdad con Pablo. Presenta las evidencias con honestidad; el cuidado de Lucas habla por sí mismo.",
      },
    ],
    ideaClave:
      "Lucas, el médico amado y compañero de Pablo, escribió Hechos como segunda parte de su evangelio, después de investigar con diligencia (Lucas 1:1-4). Como historiador cuida los nombres y los lugares, como Galión, procónsul de Acaya hacia el 51 y el 52; y como teólogo muestra que Jesús sigue obrando por su Espíritu en la iglesia (Hechos 1:1-3). Los pasajes en nosotros dejan ver que viajó con Pablo (Hechos 16:10).",
    paraLaVida: {
      texto: "Confío en la Palabra que Lucas investigó con cuidado, y la leo para conocer bien la verdad.",
      pregunta: "¿Qué parte de Hechos te gustaría investigar mejor, como hizo Lucas, para enseñarla con más seguridad?",
    },
  },
  {
    id: "biblicos-avanzados-2-2",
    objetivos: [
      "Explicar cómo Hechos 1:8 da el plan de todo el libro.",
      "Reconocer los seis resúmenes del crecimiento de la palabra que dividen el libro.",
      "Aplicar el plan de Hechos 1:8 a la misión de la iglesia local.",
    ],
    paraEmpezar:
      "Antes de subir al cielo, Jesús dio a sus discípulos un mapa: Jerusalén, Judea, Samaria y lo último de la tierra. Hechos sigue ese mapa paso a paso, desde Jerusalén hasta Roma, la capital del imperio. Y cada cierto tiempo Lucas se detiene para decir lo mismo: la palabra del Señor crecía.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "«me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra». Es la promesa, la tarea y el plan del libro: primero el poder del Espíritu, después el testimonio.",
      },
      { t: "versiculo", ref: "Hechos 6:7" },
      {
        t: "parrafo",
        texto:
          "«Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén». Es el primero de los resúmenes con que Lucas cierra cada etapa del libro.",
      },
      { t: "versiculo", ref: "Hechos 12:24" },
      {
        t: "parrafo",
        texto:
          "Herodes persiguió a la iglesia y mató a Jacobo, pero murió poco después, y «la palabra del Señor crecía y se multiplicaba». Nada pudo detenerla.",
      },
      { t: "subtitulo", texto: "El plan de Hechos 1:8" },
      {
        t: "lista",
        items: [
          "Jerusalén (capítulos 1 al 7): Pentecostés, la primera iglesia, la persecución y Esteban.",
          "Judea y Samaria (capítulos 8 al 12): Felipe en Samaria, la conversión de Saulo, Pedro en la casa de Cornelio y la iglesia de Antioquía.",
          "Hasta lo último de la tierra (capítulos 13 al 28): los viajes de Pablo y su llegada a Roma.",
        ],
      },
      { t: "subtitulo", texto: "Los seis resúmenes del crecimiento" },
      {
        t: "lista",
        items: [
          "Muchos estudiosos, siguiendo al inglés C. H. Turner, dividen Hechos en seis partes, cada una cerrada por un resumen del avance de la palabra.",
          "Hechos 6:7: la palabra crece en Jerusalén.",
          "Hechos 9:31: las iglesias tienen paz en Judea, Galilea y Samaria.",
          "Hechos 12:24: la palabra crece aun en medio de la persecución.",
          "Hechos 16:5: las iglesias se confirman en la fe y crecen cada día.",
          "Hechos 19:20: la palabra prevalece poderosamente en Éfeso.",
          "Hechos 28:30-31: Pablo predica en Roma sin impedimento.",
        ],
      },
      {
        t: "cuadro",
        titulo: "El plan de Hechos según Hechos 1:8",
        columnas: ["Parte", "Capítulos", "Lugar", "Personajes principales"],
        filas: [
          ["Primera", "1 al 7", "Jerusalén", "Pedro, Juan y Esteban"],
          ["Segunda", "8 al 12", "Judea y Samaria", "Felipe, Saulo, Pedro y Cornelio"],
          ["Tercera", "13 al 28", "Hasta lo último de la tierra", "Pablo, Bernabé, Silas y Lucas"],
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que se queda y la iglesia que envía" },
      {
        t: "lista",
        items: [
          "La iglesia de Jerusalén se quedó en la ciudad hasta que la persecución la esparció, y los esparcidos anunciaban el evangelio por todas partes (Hechos 8:1, 4).",
          "La iglesia de Antioquía oró, ayunó y envió a dos de sus mejores líderes, Bernabé y Saulo (Hechos 13:1-3).",
          "Dios usó los dos caminos, pero Hechos anima a enviar sin esperar a que llegue la persecución.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el Hechos 1:8 de tu iglesia" },
      {
        t: "lista",
        items: [
          "Paso 1, leer Hechos 1:8 y orar por el poder del Espíritu para ser testigos.",
          "Paso 2, tu Jerusalén: el barrio y las familias de la iglesia.",
          "Paso 3, tu Judea: la ciudad y la región.",
          "Paso 4, tu Samaria: los grupos cercanos con los que hay distancia o prejuicio.",
          "Paso 5, lo último de la tierra: apoyar una misión en otro país o entre otro pueblo.",
          "Paso 6, escribir una acción concreta para cada círculo este año, con sus responsables.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El plan de Hechos 1:8 no es una escalera que se sube un peldaño a la vez: la iglesia de Antioquía seguía sirviendo en su ciudad mientras enviaba misioneros. Una iglesia puede trabajar en los cuatro círculos al mismo tiempo.",
      },
    ],
    ideaClave:
      "Hechos 1:8 es el plan del libro: el Espíritu da poder para ser testigos en Jerusalén (capítulos 1 al 7), en Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28). Seis resúmenes, como Hechos 6:7 y 12:24, cierran cada etapa diciendo que la palabra del Señor crecía, y el libro termina con Pablo predicando en Roma sin impedimento (Hechos 28:30-31).",
    paraLaVida: {
      texto: "Soy testigo de Cristo en mi Jerusalén, mi Judea, mi Samaria y hasta lo último de la tierra.",
      pregunta: "¿Quiénes son la Samaria de tu iglesia, los cercanos con los que hay distancia, y cómo podrían alcanzarlos?",
    },
  },
  {
    id: "biblicos-avanzados-2-3",
    objetivos: [
      "Explicar, con Hechos 2:1-4, lo que pasó en Pentecostés y por qué es el comienzo de la misión.",
      "Comparar los relatos de Hechos donde los creyentes reciben el Espíritu: Jerusalén, Samaria, Cesarea y Éfeso.",
      "Presentar con respeto cómo leen estos relatos las iglesias pentecostales y otras iglesias evangélicas.",
    ],
    paraEmpezar:
      "Jesús mandó a los discípulos esperar en Jerusalén la promesa del Padre. En Pentecostés el Espíritu Santo vino con poder, y la iglesia salió a dar testimonio. Hechos vuelve una y otra vez al Espíritu: él guía, da valor, abre puertas y llena a los creyentes. Por eso algunos lo llaman los Hechos del Espíritu Santo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Pentecostés era la fiesta de la cosecha, cincuenta días después de la Pascua. Ese día vino un estruendo como de viento, aparecieron lenguas como de fuego, y «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen». Los judíos de muchas naciones los oyeron hablar en su propia lengua (Hechos 2:6-11).",
      },
      { t: "versiculo", ref: "Hechos 2:38-39" },
      {
        t: "parrafo",
        texto:
          "Pedro predicó a Cristo resucitado y llamó al arrepentimiento: «recibiréis el don del Espíritu Santo. Porque para vosotros es la promesa, y para vuestros hijos, y para todos los que están lejos». La promesa no fue solo para los apóstoles.",
      },
      { t: "versiculo", ref: "Hechos 10:44-46" },
      {
        t: "parrafo",
        texto:
          "En la casa de Cornelio, un gentil, «el Espíritu Santo cayó sobre todos los que oían el discurso», y los creyentes judíos se asombraron, «Porque los oían que hablaban en lenguas, y que magnificaban a Dios». Así Dios mostró que el evangelio también era para los gentiles.",
      },
      { t: "subtitulo", texto: "Cuatro momentos en que los creyentes reciben el Espíritu" },
      {
        t: "lista",
        items: [
          "Jerusalén, en Pentecostés: los discípulos son llenos del Espíritu y hablan en otras lenguas (Hechos 2:4).",
          "Samaria: creyeron y fueron bautizados, pero recibieron el Espíritu cuando Pedro y Juan les impusieron las manos; el texto no nombra las lenguas, aunque Simón vio que algo pasaba (Hechos 8:14-18).",
          "Cesarea: el Espíritu cae sobre Cornelio y su casa mientras Pedro predica, y hablan en lenguas (Hechos 10:44-46).",
          "Éfeso: unos discípulos de Juan el Bautista creen en Jesús, Pablo les impone las manos y hablan en lenguas y profetizan (Hechos 19:1-6).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: dos maneras de leer estos relatos" },
      {
        t: "lista",
        items: [
          "Las iglesias pentecostales clásicas enseñan que el bautismo en el Espíritu Santo es una experiencia de poder para el servicio, que puede venir después de la conversión, y que hablar en otras lenguas es su señal inicial (Hechos 1:8; 2:4).",
          "Otras iglesias evangélicas enseñan que todo creyente recibe el Espíritu al creer, que Pentecostés fue un momento único en la historia y que las lenguas son uno de los dones, que no todos tienen (1 Corintios 12:30).",
          "Las dos coinciden en que el Espíritu es la promesa del Padre, en que da poder para ser testigos y en que la iglesia lo necesita cada día (Hechos 1:8; Efesios 5:18).",
          "La postura del ministerio sobre las lenguas y el bautismo en el Espíritu la dirá su declaración de fe; aquí se presentan las lecturas con respeto.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: estudiar el Espíritu en Hechos con un grupo" },
      {
        t: "lista",
        items: [
          "Paso 1, leer en voz alta los cuatro relatos: Hechos 2, 8, 10 y 19.",
          "Paso 2, hacer una tabla con lo que pasó antes, cómo vino el Espíritu y lo que pasó después en cada uno.",
          "Paso 3, notar lo que se repite: la fe en Jesús, el poder, la alabanza y el testimonio.",
          "Paso 4, notar lo que cambia: a veces con imposición de manos, a veces sin ella; a veces se nombran las lenguas y una vez no.",
          "Paso 5, explicar cómo leen estos relatos las distintas iglesias, sin burlarse de ninguna.",
          "Paso 6, terminar orando juntos por la llenura del Espíritu para ser testigos (Hechos 4:31).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Hechos no es solo historia del pasado: muestra lo que el Espíritu sigue haciendo. Pero enseña con cuidado: distingue lo que el texto dice de lo que cada tradición concluye, y no midas la espiritualidad de un hermano por una sola experiencia.",
      },
    ],
    ideaClave:
      "En Pentecostés el Espíritu Santo vino con poder, los discípulos hablaron en otras lenguas y la iglesia salió a dar testimonio (Hechos 2:1-4). La promesa es para todos los que el Señor llame (Hechos 2:38-39), y alcanzó a samaritanos, a gentiles como Cornelio (Hechos 10:44-46) y a los discípulos de Éfeso. Las iglesias leen de distinta manera estos relatos, pero todas afirman que el Espíritu da poder para ser testigos.",
    paraLaVida: {
      texto: "Pido cada día la llenura del Espíritu para ser testigo de Cristo.",
      pregunta: "¿En qué lugar de tu vida necesitas el valor que el Espíritu dio a los discípulos para hablar de Jesús?",
    },
  },
  {
    id: "biblicos-avanzados-2-4",
    objetivos: [
      "Describir, con Hechos 2:42, la vida de la primera iglesia de Jerusalén.",
      "Explicar qué problema resolvió el concilio de Jerusalén y qué decidió (Hechos 15).",
      "Aplicar el modo en que el concilio resolvió un conflicto a un desacuerdo de la iglesia de hoy.",
    ],
    paraEmpezar:
      "La iglesia de Jerusalén nació en Pentecostés y creció rápido: enseñanza, comunión, oración y un amor que compartía los bienes. Pero también tuvo problemas: quejas por las viudas, persecución y una pregunta que pudo dividirla: ¿tenían los gentiles que hacerse judíos para ser cristianos? La manera en que la resolvió sigue enseñando hoy.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 2:42" },
      {
        t: "parrafo",
        texto:
          "La primera iglesia «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Se reunían en el templo y por las casas, y compartían lo que tenían con los necesitados (Hechos 2:44-46).",
      },
      { t: "versiculo", ref: "Hechos 15:10-11" },
      {
        t: "parrafo",
        texto:
          "Algunos enseñaban que los gentiles debían circuncidarse para ser salvos (Hechos 15:1). En la reunión, Pedro recordó lo que Dios hizo con Cornelio y concluyó: «creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos».",
      },
      { t: "versiculo", ref: "Hechos 15:28-29" },
      {
        t: "parrafo",
        texto:
          "La carta del concilio dijo: «ha parecido bien al Espíritu Santo, y a nosotros, no imponeros ninguna carga más que estas cosas necesarias». A los gentiles no se les pidió la circuncisión, pero sí que se apartaran de la idolatría y de la inmoralidad, y que cuidaran la comunión con los hermanos judíos.",
      },
      { t: "subtitulo", texto: "Cómo resolvió el concilio un conflicto que pudo dividir a la iglesia" },
      {
        t: "lista",
        items: [
          "No escondieron el problema: subieron a Jerusalén a tratarlo con los apóstoles y los ancianos (Hechos 15:2).",
          "Escucharon los hechos: Pedro, Bernabé y Pablo contaron lo que Dios hacía entre los gentiles (Hechos 15:7-12).",
          "Fueron a las Escrituras: Jacobo citó a los profetas, que anunciaron que los gentiles buscarían al Señor (Hechos 15:15-17).",
          "Decidieron juntos, buscando la dirección del Espíritu (Hechos 15:22, 28).",
          "Lo comunicaron bien: por carta y con hermanos de confianza que la explicaron en persona (Hechos 15:22-27).",
          "El resultado fue gozo y consuelo en las iglesias (Hechos 15:31).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo esencial y lo que se pidió por amor" },
      {
        t: "lista",
        items: [
          "Lo esencial: la salvación es por la gracia del Señor Jesús, para judíos y gentiles por igual (Hechos 15:11).",
          "Lo que no se impuso: la circuncisión y la carga de la ley, que ni sus padres pudieron llevar (Hechos 15:10).",
          "Lo que se pidió: apartarse de la idolatría y de la fornicación, y cuidar la mesa compartida con los hermanos judíos, absteniéndose de sangre y de ahogado (Hechos 15:29).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un desacuerdo que divide a la iglesia" },
      {
        t: "parrafo",
        texto:
          "En tu iglesia, un grupo dice que los nuevos creyentes deben vestirse y comportarse como los miembros antiguos para ser aceptados de verdad, y los nuevos se sienten rechazados.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no esconder el problema: llevarlo a los líderes de la iglesia.",
          "Paso 2, escuchar a los dos grupos y lo que Dios está haciendo entre los nuevos.",
          "Paso 3, volver a las Escrituras: la salvación es por gracia, no por costumbres (Hechos 15:11).",
          "Paso 4, separar lo esencial, que es la fe en Cristo y la vida santa, de las costumbres que no son mandamiento.",
          "Paso 5, decidir juntos, orando, y comunicar la decisión con claridad y con amor.",
          "Paso 6, pedir a los dos grupos lo que cuida la comunión, como hizo el concilio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El concilio no resolvió el conflicto con un voto apurado ni con el silencio. Escuchó, fue a la Palabra, buscó al Espíritu y comunicó bien. Esa es una buena guía para cualquier desacuerdo serio en la iglesia.",
      },
    ],
    ideaClave:
      "La iglesia de Jerusalén perseveraba en la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones (Hechos 2:42). Ante la pregunta de si los gentiles debían circuncidarse, el concilio escuchó, fue a las Escrituras, buscó al Espíritu y decidió que la salvación es por la gracia del Señor Jesús para todos (Hechos 15:11), sin imponer más carga que lo necesario (Hechos 15:28-29).",
    paraLaVida: {
      texto: "Busco resolver los desacuerdos como el concilio: con la Palabra, el Espíritu y el amor.",
      pregunta: "¿Qué costumbre de tu iglesia podría estar pesando sobre los nuevos creyentes como si fuera un mandamiento?",
    },
  },
  {
    id: "biblicos-avanzados-2-5",
    objetivos: [
      "Describir los tres viajes misioneros de Pablo, con sus fechas aproximadas y sus ciudades principales.",
      "Explicar el método de Pablo para plantar iglesias, con Hechos 13:2-3, 14:23 y 17:2-3.",
      "Aplicar ese método a la plantación de una iglesia o de un grupo nuevo hoy.",
    ],
    paraEmpezar:
      "Desde Antioquía, Pablo y sus compañeros llevaron el evangelio por Chipre, Asia Menor, Macedonia y Grecia. En unos diez años, más o menos del 46 al 57, dejaron iglesias en ciudades clave del imperio. No lo hicieron al azar: oraban, seguían al Espíritu, empezaban por la sinagoga, formaban líderes y volvían a visitar a las iglesias.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=v0t5OzcBgPY", titulo: "Hechos 13-20", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Hechos 13:2-3" },
      {
        t: "parrafo",
        texto:
          "La misión nació en una iglesia que oraba: «Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado». La iglesia los despidió con ayuno, oración e imposición de manos.",
      },
      { t: "versiculo", ref: "Hechos 14:23" },
      {
        t: "parrafo",
        texto:
          "En el viaje de regreso, Pablo y Bernabé volvieron a las iglesias nuevas: «constituyeron ancianos en cada iglesia, y habiendo orado con ayunos, los encomendaron al Señor». No dejaron las iglesias sin líderes.",
      },
      { t: "versiculo", ref: "Hechos 17:2-3" },
      {
        t: "parrafo",
        texto:
          "«Y Pablo, como acostumbraba, fue a ellos», a la sinagoga, y les mostró por las Escrituras que el Cristo tenía que padecer y resucitar. Empezaba por los que ya conocían las Escrituras, y desde allí llegaba a los gentiles.",
      },
      { t: "subtitulo", texto: "Los tres viajes" },
      {
        t: "lista",
        items: [
          "Primer viaje, hacia el 46 al 48: con Bernabé, por Chipre y el sur de Galacia, en Antioquía de Pisidia, Iconio, Listra y Derbe (Hechos 13 y 14).",
          "Segundo viaje, hacia el 49 al 52: con Silas, y después con Timoteo y Lucas; por primera vez en Europa: Filipos, Tesalónica, Berea, Atenas y Corinto, donde se quedó un año y seis meses (Hechos 15:36 a 18:22).",
          "Tercer viaje, hacia el 53 al 57: casi tres años en Éfeso, desde donde la palabra llegó a toda Asia, y después Macedonia y Grecia (Hechos 18:23 a 21:16; 19:10).",
        ],
      },
      { t: "subtitulo", texto: "El método de Pablo" },
      {
        t: "lista",
        items: [
          "Orar y seguir al Espíritu, aun cuando cerraba unas puertas y abría otras (Hechos 13:2; 16:6-10).",
          "Ir a las ciudades principales, desde donde el evangelio se extendía por la región (Hechos 19:10).",
          "Empezar por la sinagoga y por los que temían a Dios, y luego ir a los gentiles (Hechos 17:2-4).",
          "Trabajar en equipo: Bernabé, Silas, Timoteo, Lucas, Priscila y Aquila (Hechos 18:2-3, 18).",
          "Sostenerse con su oficio de hacer tiendas cuando hacía falta (Hechos 18:3; 20:34).",
          "Formar líderes, volver a visitar las iglesias y escribirles (Hechos 14:21-23; 15:36).",
        ],
      },
      {
        t: "cuadro",
        titulo: "Los tres viajes de Pablo",
        columnas: ["Viaje", "Fechas aproximadas", "Compañeros", "Ciudades principales"],
        filas: [
          ["Primero", "Hacia el 46 al 48", "Bernabé y Juan Marcos", "Chipre, Antioquía de Pisidia, Iconio, Listra y Derbe"],
          ["Segundo", "Hacia el 49 al 52", "Silas, Timoteo y Lucas", "Filipos, Tesalónica, Berea, Atenas y Corinto"],
          ["Tercero", "Hacia el 53 al 57", "Timoteo, Erasto y otros", "Éfeso, Macedonia, Grecia, Troas y Mileto"],
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: abrir un grupo nuevo en otro barrio" },
      {
        t: "lista",
        items: [
          "Paso 1, orar con la iglesia y buscar la dirección del Espíritu, como en Antioquía.",
          "Paso 2, formar un equipo de dos o tres familias, en vez de enviar a una persona sola.",
          "Paso 3, empezar por las puertas abiertas: familiares, amigos y personas que buscan a Dios.",
          "Paso 4, enseñar la Palabra con claridad en una casa, como Pablo en la casa de Justo (Hechos 18:7).",
          "Paso 5, formar líderes del mismo grupo desde el principio.",
          "Paso 6, volver, acompañar y mantener el contacto: la iglesia madre sigue cerca.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Pablo no plantó iglesias para que dependieran de él. Formó ancianos, los encomendó al Señor y siguió adelante. Planta pensando en el día en que el grupo nuevo tenga sus propios líderes.",
      },
    ],
    ideaClave:
      "Pablo hizo tres viajes, más o menos del 46 al 48, del 49 al 52 y del 53 al 57, y dejó iglesias en ciudades clave como Filipos, Tesalónica, Corinto y Éfeso. Su método fue claro: orar y seguir al Espíritu (Hechos 13:2-3), empezar por la sinagoga y explicar las Escrituras (Hechos 17:2-3), trabajar en equipo, formar ancianos en cada iglesia (Hechos 14:23) y volver a visitarlas.",
    paraLaVida: {
      texto: "Sirvo a la misión en equipo, formando a otros para que sigan la obra.",
      pregunta: "¿A quién podrías empezar a formar hoy para que dirija un grupo o una obra nueva mañana?",
    },
  },
  {
    id: "biblicos-avanzados-2-6",
    objetivos: [
      "Narrar el camino de Pablo desde su arresto en Jerusalén hasta Roma (Hechos 21 a 28).",
      "Explicar por qué Lucas dedica tanto espacio a las defensas de Pablo ante las autoridades.",
      "Aplicar el final abierto de Hechos a la misión de la iglesia hoy.",
    ],
    paraEmpezar:
      "Los últimos capítulos de Hechos parecen el relato de un fracaso: Pablo arrestado, dos años preso en Cesarea, juzgado, en medio de un naufragio. Pero Lucas muestra lo contrario: en cada paso Pablo da testimonio ante gobernadores y reyes, Dios cumple su promesa de llevarlo a Roma, y el libro termina con el evangelio predicado sin impedimento.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jWG-433qdWM", titulo: "Hechos 21-28", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Hechos 26:22-23" },
      {
        t: "parrafo",
        texto:
          "Ante el rey Agripa, Pablo resume su vida: «habiendo obtenido auxilio de Dios, persevero hasta el día de hoy, dando testimonio a pequeños y a grandes». Su defensa es, en realidad, la predicación de Cristo resucitado.",
      },
      { t: "versiculo", ref: "Hechos 27:23-24" },
      {
        t: "parrafo",
        texto:
          "En medio de la tormenta, el ángel de Dios le dijo: «Pablo, no temas; es necesario que comparezcas ante César». La promesa de Dios estaba por encima del mar y de los hombres.",
      },
      { t: "versiculo", ref: "Hechos 28:30-31" },
      {
        t: "parrafo",
        texto:
          "El libro termina con Pablo en una casa alquilada, recibiendo a todos, «predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento». Lucas no cuenta el final de Pablo: el que no termina es el evangelio.",
      },
      { t: "subtitulo", texto: "Por qué Lucas cuenta tanto los juicios" },
      {
        t: "lista",
        items: [
          "Para mostrar que los cristianos no eran un peligro para Roma: varias autoridades no hallaron delito en Pablo (Hechos 23:29; 25:25; 26:31-32).",
          "Para mostrar que Jesús cumplió su palabra: sus testigos hablarían ante gobernadores y reyes (Lucas 21:12-13; Hechos 9:15).",
          "Para mostrar que la fe en Cristo es la esperanza de Israel: Pablo está preso por la esperanza de la resurrección (Hechos 26:6-8; 28:20).",
          "Para animar a los creyentes perseguidos: Dios estaba con Pablo en la cárcel y en el mar (Hechos 23:11; 27:23-24).",
        ],
      },
      {
        t: "linea",
        titulo: "De Jerusalén a Roma",
        eventos: [
          { fecha: "Hacia el 57", texto: "Pablo es arrestado en el templo de Jerusalén y se defiende ante el pueblo y ante el concilio.", ref: "Hechos 21:27-33" },
          { fecha: "Hacia el 57 al 59", texto: "Pasa dos años preso en Cesarea y se defiende ante el gobernador Félix.", ref: "Hechos 24:27" },
          { fecha: "Hacia el 59", texto: "Ante el gobernador Festo apela a César, y da testimonio ante el rey Agripa.", ref: "Hechos 25:11" },
          { fecha: "Hacia el 59 y el 60", texto: "Viaja preso a Roma, naufraga y pasa el invierno en la isla de Malta.", ref: "Hechos 27:41-44" },
          { fecha: "Hacia el 60", texto: "Llega a Roma, y los hermanos salen a recibirlo en el camino.", ref: "Hechos 28:15" },
          { fecha: "Hacia el 60 al 62", texto: "Vive dos años en una casa alquilada, predicando el reino de Dios sin impedimento.", ref: "Hechos 28:30-31" },
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que parecía y lo que era" },
      {
        t: "lista",
        items: [
          "Parecía que Pablo estaba vencido, preso y encadenado; en realidad el evangelio llegaba a gobernadores, reyes y soldados (Filipenses 1:12-13).",
          "Parecía que la tormenta los hundiría; en realidad Dios salvó a las doscientas setenta y seis personas de la nave (Hechos 27:37, 44).",
          "Parecía que el libro quedaba sin final; en realidad el final queda abierto para que la iglesia siga la misión.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un hermano preso pregunta si Dios se olvidó de él" },
      {
        t: "lista",
        items: [
          "Paso 1, visitarlo y escucharlo, acordándote de él como si estuvieras preso con él (Hebreos 13:3).",
          "Paso 2, leer Hechos 23:11: el Señor se le presentó a Pablo de noche en la cárcel y le dijo que tuviera ánimo.",
          "Paso 3, mostrarle que Pablo siguió dando testimonio preso, ante los guardias y las autoridades.",
          "Paso 4, animarlo a orar y a leer la Palabra cada día.",
          "Paso 5, ayudarlo a ver cómo puede dar testimonio donde está.",
          "Paso 6, seguir visitándolo y acompañar a su familia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Hechos 28 no cuenta el juicio final de Pablo ni su muerte. Lucas termina con el evangelio en marcha. No presentes como historia de Hechos lo que viene de la tradición posterior.",
      },
    ],
    ideaClave:
      "Desde su arresto en Jerusalén, hacia el año 57, hasta Roma, Pablo dio testimonio ante Félix, Festo y el rey Agripa (Hechos 26:22-23); Dios lo guardó en el naufragio y lo llevó a Roma, como le había prometido (Hechos 27:23-24). Hechos termina con Pablo predicando el reino de Dios abiertamente y sin impedimento (Hechos 28:30-31): la historia sigue abierta en la misión de la iglesia.",
    paraLaVida: {
      texto: "Doy testimonio de Cristo también en medio de las pruebas.",
      pregunta: "¿Qué situación difícil de tu vida podría convertirse en una puerta para dar testimonio?",
    },
  },
];
