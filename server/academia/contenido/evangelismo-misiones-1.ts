/**
 * Especialidad Evangelismo y misiones · Materia 1 — Evangelismo personal avanzado (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue a «Compartir mi fe» (Nivel 1), «Evangelismo personal» (Nivel 2) y «Evangelismo y consolidación» (Nivel 3): no
 * repite lo básico, sino que profundiza en el corazón del evangelista, la claridad del mensaje, hablar según la persona,
 * la familia y los amigos, la valentía y formar a otros.
 */
import type { LeccionContenido } from "../tipos";

export const EVANGELISMO_MISIONES_1: LeccionContenido[] = [
  {
    id: "evangelismo-misiones-1-1",
    objetivos: [
      "Explicar qué movía a Pablo a evangelizar, según 2 Corintios 5.",
      "Reconocer la carga por los perdidos como parte del corazón del evangelista.",
      "Comenzar una lista de oración por personas concretas que no conocen a Cristo.",
    ],
    paraEmpezar:
      "Se puede saber mucho de evangelismo y no hablar nunca de Cristo. Lo que suele faltar no es un método, sino un corazón movido por Dios.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 11:30" },
      {
        t: "parrafo",
        texto: "«El fruto del justo es árbol de vida; Y el que gana almas es sabio». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "2 Corintios 5:14" },
      {
        t: "parrafo",
        texto:
          "Pablo explica qué lo movía: «Porque el amor de Cristo nos constriñe». No evangelizaba por obligación ni por ganar discusiones, sino porque el amor de Cristo lo empujaba.",
      },
      { t: "versiculo", ref: "2 Corintios 5:20" },
      {
        t: "parrafo",
        texto:
          "Por eso se veía como un enviado: «somos embajadores en nombre de Cristo». El embajador no habla en su propio nombre, sino que lleva el mensaje del que lo envió, y lo hace rogando: «Reconciliaos con Dios».",
      },
      { t: "subtitulo", texto: "La carga por los perdidos" },
      { t: "versiculo", ref: "Romanos 10:1" },
      {
        t: "parrafo",
        texto:
          "Pablo escribió de los suyos: «el anhelo de mi corazón, y mi oración a Dios por Israel, es para salvación». El evangelista no ve a las personas como números, sino como gente que Dios ama y que necesita a Cristo.",
      },
      { t: "subtitulo", texto: "Orar por personas con nombre" },
      { t: "versiculo", ref: "1 Timoteo 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que se ore «por todos los hombres», porque Dios «quiere que todos los hombres sean salvos y vengan al conocimiento de la verdad». El evangelismo empieza de rodillas.",
      },
      {
        t: "lista",
        items: [
          "Escribe los nombres de tres a cinco personas que no conocen a Cristo.",
          "Ora por ellas cada día: que Dios abra su corazón y te dé oportunidades de hablarles.",
          "Ora también por ti: amor, valentía y palabras sabias.",
          "Anota las oportunidades que Dios te da y cómo respondiste.",
        ],
      },
    ],
    ideaClave:
      "El evangelismo nace de un corazón movido por el amor de Cristo: somos embajadores que ruegan en su nombre que las personas se reconcilien con Dios. Como Pablo, el evangelista siente carga por los perdidos y ora por ellos, porque Dios quiere que todos sean salvos. Una lista corta de personas por las que se ora cada día es el primer paso.",
    paraLaVida: {
      texto: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona.",
      pregunta: "¿Quiénes son las tres a cinco personas por las que vas a orar cada día?",
    },
  },
  {
    id: "evangelismo-misiones-1-2",
    objetivos: [
      "Resumir el evangelio con 1 Corintios 15:3-4 y Marcos 1:15.",
      "Reconocer las distorsiones más comunes del evangelio.",
      "Explicar por qué el evangelio llama a seguir a Cristo, y no solo a tomar una decisión.",
    ],
    paraEmpezar:
      "Un mensaje puede usar palabras cristianas y, aun así, no ser el evangelio. Por eso el evangelista necesita tener muy claro lo que anuncia.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo resume lo que enseñó primero: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día». El centro del evangelio es Cristo, su muerte por nuestros pecados y su resurrección.",
      },
      { t: "versiculo", ref: "Marcos 1:15" },
      {
        t: "parrafo",
        texto:
          "Jesús llamó a responder: «arrepentíos, y creed en el evangelio». El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él.",
      },
      { t: "versiculo", ref: "Gálatas 1:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo advirtió a los gálatas que algunos querían «pervertir el evangelio de Cristo». No hay otro evangelio: cambiar el mensaje es perderlo.",
      },
      { t: "subtitulo", texto: "Distorsiones comunes" },
      {
        t: "lista",
        items: [
          "Las obras: presentar la salvación como premio por portarse bien, cuando es por gracia, por medio de la fe (Efesios 2:8-9).",
          "La prosperidad: prometer dinero, salud o éxito seguros a cambio de la fe o de una ofrenda.",
          "Un Jesús sin cruz: ofrecer una vida mejor sin hablar del pecado, del arrepentimiento ni de la cruz.",
          "Una oración sin cambio: dar por salvo a alguien solo porque repitió unas palabras. La oración expresa la fe, pero salva Cristo, por medio de una fe que se arrepiente.",
        ],
      },
      { t: "versiculo", ref: "Lucas 14:27" },
      {
        t: "parrafo",
        texto:
          "Jesús fue honesto con las multitudes: «el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo». Un evangelismo fiel invita a seguir a Cristo, no solo a levantar la mano.",
      },
    ],
    ideaClave:
      "El evangelio es Cristo, que murió por nuestros pecados y resucitó, y llama a arrepentirse y creer. No hay otro evangelio: las obras, la prosperidad, un Jesús sin cruz o una oración sin arrepentimiento lo distorsionan. Un evangelismo fiel invita a seguir a Cristo, cargando su cruz.",
    paraLaVida: {
      texto: "Un mensaje claro protege a la persona y honra a Cristo.",
      pregunta: "¿Qué parte del evangelio te cuesta más explicar con claridad, y cómo la vas a practicar?",
    },
  },
  {
    id: "evangelismo-misiones-1-3",
    objetivos: [
      "Comparar cómo anunció Pablo el evangelio en la sinagoga y en el Areópago.",
      "Aplicar el principio de 1 Corintios 9:22 sin cambiar el mensaje.",
      "Adaptar una conversación a la historia de cada persona.",
    ],
    paraEmpezar:
      "No es lo mismo hablar con alguien que conoce la Biblia que con alguien que nunca la abrió. Pablo cambiaba el punto de partida, pero no el mensaje.",
    bloques: [
      { t: "versiculo", ref: "Hechos 17:2-3" },
      {
        t: "parrafo",
        texto:
          "Con los judíos de Tesalónica, que conocían las Escrituras, Pablo fue «declarando y exponiendo por medio de las Escrituras, que era necesario que el Cristo padeciese, y resucitase de los muertos».",
      },
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "En Atenas, ante personas que no conocían la Biblia, empezó por algo que ellos veían cada día: un altar «AL DIOS NO CONOCIDO». Desde allí les anunció al Dios creador y a Cristo resucitado (Hechos 17:24-31).",
      },
      { t: "versiculo", ref: "1 Corintios 9:22" },
      {
        t: "parrafo",
        texto:
          "Pablo lo explica así: «a todos me he hecho de todo, para que de todos modos salve a algunos». Se adaptan el lenguaje, los ejemplos y el punto de partida; el evangelio no cambia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Escuchar antes de hablar" },
      {
        t: "lista",
        items: [
          "Quien creció en la iglesia: puede saber mucho, pero necesita la gracia de Cristo y no solo la religión.",
          "Quien tiene otra religión: con respeto, partir de lo que comparten y llevar la conversación a Cristo, sin burlas ni ataques.",
          "Quien duda o no cree: escuchar sus preguntas, responder con honestidad y ofrecer leer juntos un evangelio.",
          "Quien fue herido en una iglesia: reconocer el daño que vivió y mostrar que Cristo es distinto de los errores de los creyentes.",
        ],
      },
      {
        t: "nota",
        titulo: "Sin cambiar el mensaje",
        texto:
          "Adaptarse no es callar el pecado ni la cruz. Pablo se acercaba a cada grupo para ganarlo, pero siempre anunció a Cristo crucificado y resucitado (1 Corintios 2:2; 15:3-4).",
      },
    ],
    ideaClave:
      "Pablo cambiaba el punto de partida según la persona: con los que conocían las Escrituras partía de ellas, y en Atenas partió de un altar al Dios no conocido. Se hizo de todo para salvar a algunos, pero nunca cambió el mensaje. Por eso el evangelista escucha primero la historia de cada persona.",
    paraLaVida: {
      texto: "Escuchar bien es la mitad de una buena conversación sobre Cristo.",
      pregunta: "¿Con qué persona de tu lista necesitas escuchar más antes de hablar, y qué le preguntarás?",
    },
  },
  {
    id: "evangelismo-misiones-1-4",
    objetivos: [
      "Explicar el valor de la familia y los amigos en el evangelismo.",
      "Aplicar los ejemplos del gadareno, de Cornelio, del carcelero de Filipos y de Felipe.",
      "Planificar cómo compartir la fe con los suyos con paciencia.",
    ],
    paraEmpezar:
      "Muchas personas llegan a Cristo por medio de alguien que ya conocen: un familiar, un amigo o un compañero de trabajo.",
    bloques: [
      { t: "versiculo", ref: "Marcos 5:19" },
      {
        t: "parrafo",
        texto:
          "Al hombre que liberó en Gadara, Jesús le dijo: «Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo». Su primer campo misionero fue su propia casa.",
      },
      { t: "versiculo", ref: "Hechos 10:24" },
      {
        t: "parrafo",
        texto:
          "Cuando Pedro llegó a Cesarea, Cornelio lo estaba esperando, «habiendo convocado a sus parientes y amigos más íntimos». Abrió su casa para que los suyos oyeran el evangelio.",
      },
      { t: "versiculo", ref: "Hechos 16:31-34" },
      {
        t: "parrafo",
        texto:
          "Al carcelero de Filipos le dijeron: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa». Después le hablaron la palabra del Señor a él y a todos los de su casa, y él se regocijó con toda su familia.",
      },
      {
        t: "nota",
        titulo: "Tú y tu casa",
        texto:
          "La promesa no quiere decir que la familia se salva por la fe de uno solo: todos los de la casa oyeron la palabra, y cada persona necesita creer.",
      },
      { t: "versiculo", ref: "Juan 1:45-46" },
      {
        t: "parrafo",
        texto: "Cuando su amigo Natanael dudó, Felipe no discutió: le dijo «Ven y ve».",
      },
      { t: "subtitulo", texto: "Con los tuyos, con paciencia" },
      {
        t: "lista",
        items: [
          "Vive lo que crees: el cambio en tu vida habla antes que tus palabras.",
          "Ora por cada uno por su nombre y espera las oportunidades.",
          "Cuenta lo que Dios hizo contigo, con humildad y sin sermones.",
          "Invita a los tuyos a una comida, a un estudio en casa o a una actividad de la iglesia.",
          "No presiones ni discutas: respeta su tiempo y sigue amándolos.",
        ],
      },
    ],
    ideaClave:
      "Muchas personas llegan a Cristo por alguien que conocen. Jesús envió al hombre liberado a contar a los suyos lo que el Señor hizo; Cornelio reunió a sus parientes y amigos; el carcelero oyó la palabra con toda su casa, y Felipe invitó a su amigo a ver. Con la familia y los amigos se evangeliza con la vida, la oración, el testimonio y la paciencia.",
    paraLaVida: {
      texto: "Tu casa y tus amigos son tu primer campo misionero.",
      pregunta: "¿A quién de tu familia o de tus amigos podrías invitar este mes a una comida o a un estudio?",
    },
  },
  {
    id: "evangelismo-misiones-1-5",
    objetivos: [
      "Explicar cómo oró la iglesia ante las amenazas en Hechos 4.",
      "Evaluar los temores que frenan el evangelismo.",
      "Aplicar la oración por valentía antes de compartir la fe.",
    ],
    paraEmpezar:
      "Muchos creyentes no evangelizan por miedo: al rechazo, a no saber qué decir o a perder amistades. La iglesia de los primeros días también conoció el miedo y las amenazas.",
    bloques: [
      { t: "versiculo", ref: "Hechos 4:29-31" },
      {
        t: "parrafo",
        texto:
          "Amenazados por las autoridades, los creyentes no pidieron que las amenazas pasaran, sino esto: «concede a tus siervos que con todo denuedo hablen tu palabra». Y la respuesta fue que «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Efesios 6:19-20" },
      {
        t: "parrafo",
        texto:
          "Aun Pablo pedía oración para tener valor: que «al abrir mi boca me sea dada palabra para dar a conocer con denuedo el misterio del evangelio».",
      },
      { t: "subtitulo", texto: "Cuando aparece el miedo" },
      {
        t: "lista",
        items: [
          "El miedo al rechazo: muchas veces se rechaza el mensaje y no a ti, y el fruto lo da Dios.",
          "El miedo a no saber qué decir: cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta.",
          "El miedo a perder la amistad: habla con respeto y con amor; una amistad verdadera soporta una conversación sincera.",
          "Antes de hablar, ora: pide denuedo, como la iglesia de Hechos 4.",
        ],
      },
      { t: "versiculo", ref: "Hechos 20:24" },
      {
        t: "parrafo",
        texto:
          "Pablo veía su vida al servicio de la misión: «con tal que acabe mi carrera con gozo, y el ministerio que recibí del Señor Jesús, para dar testimonio del evangelio de la gracia de Dios».",
      },
    ],
    ideaClave:
      "El miedo es común, pero no tiene la última palabra. Amenazada, la iglesia de Hechos 4 pidió denuedo para hablar la palabra y fue llena del Espíritu Santo; aun Pablo pedía oración para hablar con valor. El evangelista ora antes de hablar, enfrenta sus temores con la verdad y recuerda que el fruto lo da Dios.",
    paraLaVida: {
      texto: "El valor para hablar de Cristo se pide en oración.",
      pregunta: "¿Qué temor te frena más al compartir tu fe, y qué le vas a pedir a Dios esta semana?",
    },
  },
  {
    id: "evangelismo-misiones-1-6",
    objetivos: [
      "Explicar cómo preparó y envió Jesús a sus discípulos para evangelizar.",
      "Aplicar 2 Timoteo 2:2 a la formación de nuevos evangelistas.",
      "Diseñar un plan sencillo para formar a otro creyente.",
    ],
    paraEmpezar:
      "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra.",
    bloques: [
      { t: "versiculo", ref: "Lucas 10:1-2" },
      {
        t: "parrafo",
        texto:
          "Jesús no envió a sus discípulos sin preparación: los mandó «de dos en dos», con instrucciones, y les pidió orar al Señor de la mies, porque «La mies a la verdad es mucha, mas los obreros pocos».",
      },
      { t: "versiculo", ref: "Hechos 8:4" },
      {
        t: "parrafo",
        texto:
          "Cuando la persecución dispersó a la iglesia de Jerusalén, no solo hablaban los apóstoles: «los que fueron esparcidos iban por todas partes anunciando el evangelio». Cada creyente era un testigo.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo pidió a Timoteo que formara a otros: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros». Así el evangelio pasa de una generación a otra.",
      },
      { t: "subtitulo", texto: "Un plan para formar a otro" },
      {
        t: "lista",
        items: [
          "Escoge a una persona fiel y disponible.",
          "Muéstrale: que te acompañe cuando compartes tu fe.",
          "Háganlo juntos: preparen su testimonio y el evangelio en pocas palabras.",
          "Déjala hacerlo: que ella hable y tú la acompañes.",
          "Evalúen juntos, oren y celebren lo que Dios hace.",
          "Anímala a formar a otra persona.",
        ],
      },
      { t: "versiculo", ref: "Lucas 15:7" },
      {
        t: "parrafo",
        texto: "En todo esto hay gozo: «habrá más gozo en el cielo por un pecador que se arrepiente».",
      },
    ],
    ideaClave:
      "Jesús preparó y envió a sus discípulos de dos en dos, y pidió orar por más obreros. En Hechos, cada creyente anunciaba el evangelio, y Pablo pidió a Timoteo formar a fieles que enseñaran a otros. Para formar a otro: escoger a alguien fiel, mostrarle, hacerlo juntos, dejarlo hacer, evaluar y animarlo a multiplicar.",
    paraLaVida: {
      texto: "El evangelismo que se enseña se multiplica.",
      pregunta: "¿A quién podrías invitar a acompañarte la próxima vez que compartas tu fe?",
    },
  },
];
