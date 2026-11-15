/**
 * Especialidad Evangelismo y misiones · Materia 2 — Campañas y cruzadas (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Los datos de historia (Whitefield y Wesley en 1739; Billy Graham en Nueva York en 1957 y los compromisos de Modesto en
 * 1948) se comprobaron en varias fuentes. Profundiza la lección «Campañas, calle, radio y redes» del Nivel 3.
 */
import type { LeccionContenido } from "../tipos";

export const EVANGELISMO_MISIONES_2: LeccionContenido[] = [
  {
    id: "evangelismo-misiones-2-1",
    objetivos: [
      "Describir ejemplos bíblicos de proclamación pública del evangelio.",
      "Explicar la compasión de Jesús por las multitudes como motivo de una campaña.",
      "Reconocer que la proclamación pública busca discípulos, y no solo números.",
    ],
    paraEmpezar:
      "Una campaña o cruzada evangelística es un tiempo de predicación pública del evangelio, muchas veces con varias iglesias juntas. La idea no nació en la época moderna: la Biblia está llena de anuncios públicos del mensaje de Dios.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 4:5" },
      {
        t: "parrafo",
        texto: "Pablo animó a Timoteo: «haz obra de evangelista, cumple tu ministerio». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "Mateo 9:35-38" },
      {
        t: "parrafo",
        texto:
          "«Recorría Jesús todas las ciudades y aldeas», enseñando y predicando, y «al ver las multitudes, tuvo compasión de ellas». Una campaña nace de esa compasión, no del deseo de llenar un lugar.",
      },
      { t: "versiculo", ref: "Jonás 3:4-5" },
      {
        t: "parrafo",
        texto:
          "Jonás predicó por las calles de Nínive, y «los hombres de Nínive creyeron a Dios»: la ciudad entera se volvió de su mal camino (Jonás 3:10).",
      },
      { t: "versiculo", ref: "Hechos 2:14" },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, Pedro, «poniéndose en pie con los once, alzó la voz» ante una multitud en Jerusalén. Ese día se añadieron como tres mil personas, y lo más importante vino después: «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».",
      },
      { t: "versiculo", ref: "Hechos 8:5-8" },
      {
        t: "parrafo",
        texto:
          "En Samaria, Felipe «les predicaba a Cristo», la gente «escuchaba atentamente» y «había gran gozo en aquella ciudad». Cuando creyeron, se bautizaban hombres y mujeres (Hechos 8:12).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "La palabra cruzada",
        texto:
          "Muchas iglesias hablan de campañas o de cruzadas evangelísticas. La palabra cruzada recuerda las guerras de la Edad Media, que nada tienen que ver con el evangelio; por eso muchos prefieren decir campaña.",
      },
    ],
    ideaClave:
      "La proclamación pública del evangelio está en toda la Biblia: Jesús recorría ciudades y aldeas con compasión por las multitudes, Jonás predicó en Nínive, Pedro alzó la voz en Pentecostés y Felipe predicó a Cristo en Samaria. El fruto que buscaba la iglesia no era una multitud, sino discípulos que perseveraran.",
    paraLaVida: {
      texto: "Una campaña empieza con la compasión de Jesús por las personas.",
      pregunta: "¿Por qué ciudad, barrio o grupo de personas sientes compasión, y qué podrías hacer para que oigan el evangelio?",
    },
  },
  {
    id: "evangelismo-misiones-2-2",
    objetivos: [
      "Describir la predicación al aire libre de Whitefield y Wesley.",
      "Explicar cómo se preparaban las campañas de Billy Graham.",
      "Sacar lecciones de la historia para las campañas de hoy.",
    ],
    paraEmpezar:
      "Dios ha usado la predicación pública en muchos momentos de la historia. Mirar algunos ejemplos ayuda a aprender de sus aciertos y también de los errores.",
    bloques: [
      { t: "versiculo", ref: "Hechos 19:9-10" },
      {
        t: "parrafo",
        texto:
          "Pablo enseñó cada día en un lugar público, «en la escuela de uno llamado Tiranno», durante dos años, «de manera que todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».",
      },
      { t: "subtitulo", texto: "Al aire libre: Whitefield y Wesley" },
      {
        t: "parrafo",
        texto:
          "En febrero de 1739, el predicador inglés George Whitefield empezó a predicar al aire libre a los mineros de Kingswood, cerca de Bristol, gente que casi nunca entraba en una iglesia. En abril de ese mismo año, John Wesley siguió su ejemplo en Bristol. Llevaron el evangelio adonde estaba la gente.",
      },
      { t: "versiculo", ref: "Romanos 10:14-15" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: «¿Y cómo oirán sin haber quien les predique?». Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla.",
      },
      { t: "subtitulo", texto: "Billy Graham y las campañas del siglo XX" },
      {
        t: "parrafo",
        texto:
          "El evangelista estadounidense Billy Graham (1918-2018) predicó en campañas en muchos países. En 1957, su campaña en el Madison Square Garden de Nueva York se extendió por dieciséis semanas. Sus campañas se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían.",
      },
      { t: "subtitulo", texto: "Lo que enseña la historia" },
      {
        t: "lista",
        items: [
          "Salir adonde está la gente.",
          "Predicar a Cristo con claridad.",
          "Trabajar unidos con las iglesias del lugar.",
          "Cuidar a los que responden, para que lleguen a ser discípulos.",
        ],
      },
      {
        t: "nota",
        titulo: "También hubo errores",
        texto:
          "En la historia también hubo campañas que buscaron números, emociones o dinero. Por eso esta materia dedica una lección entera a la integridad.",
      },
    ],
    ideaClave:
      "Pablo enseñó dos años en un lugar público y toda Asia oyó la palabra. En 1739, Whitefield y luego Wesley llevaron el evangelio al aire libre, adonde estaba la gente. En el siglo XX, Billy Graham predicó en campañas preparadas con tiempo, con las iglesias de cada ciudad y con consejeros; la de Nueva York, en 1957, duró dieciséis semanas. La historia enseña a salir adonde está la gente, predicar a Cristo con claridad, trabajar unidos y cuidar a los que responden.",
    paraLaVida: {
      texto: "La historia de la iglesia está llena de creyentes que salieron a buscar a la gente.",
      pregunta: "¿Dónde está la gente de tu ciudad que casi nunca entra en una iglesia, y cómo podría oír el evangelio?",
    },
  },
  {
    id: "evangelismo-misiones-2-3",
    objetivos: [
      "Describir los pasos para preparar una campaña.",
      "Explicar por qué la oración y la unidad van primero.",
      "Aplicar Lucas 14:28 al presupuesto y a los recursos de una campaña.",
    ],
    paraEmpezar: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:14" },
      {
        t: "parrafo",
        texto: "Antes de Pentecostés, los discípulos «perseveraban unánimes en oración y ruego». La preparación espiritual va primero.",
      },
      { t: "versiculo", ref: "Juan 17:21" },
      {
        t: "parrafo",
        texto:
          "Jesús oró «para que todos sean uno», y añadió: «para que el mundo crea que tú me enviaste». Cuando las iglesias de una ciudad se unen para anunciar a Cristo, dan testimonio de esa unidad.",
      },
      { t: "subtitulo", texto: "Los pasos" },
      {
        t: "lista",
        items: [
          "Orar: grupos de oración en cada iglesia, desde meses antes.",
          "Unir: invitar a las iglesias de la zona y formar un comité con responsables.",
          "Definir: el propósito, el público, el lugar y las fechas.",
          "Calcular: el presupuesto y los recursos, con cuentas claras.",
          "Cumplir: los permisos de la ciudad, la seguridad y el cuidado de los niños.",
          "Preparar: a los consejeros, los músicos, los ujieres y el equipo de seguimiento.",
          "Invitar: en persona y por los medios, empezando por las personas por las que cada iglesia ya ora.",
        ],
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos». Una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
      },
      {
        t: "nota",
        titulo: "Seguridad y protección",
        texto:
          "Un evento público necesita los permisos de la ciudad, un plan de seguridad y las normas de protección de menores. Para las dudas legales se consulta a un profesional.",
      },
    ],
    ideaClave:
      "Una campaña empieza con oración y unidad: los discípulos perseveraban unánimes en oración, y Jesús oró para que fuéramos uno para que el mundo crea. Después vienen los pasos: unir a las iglesias, definir el propósito, calcular el presupuesto, cumplir los permisos y la seguridad, preparar a los equipos e invitar en persona.",
    paraLaVida: {
      texto: "La unidad de las iglesias también predica.",
      pregunta: "¿Con qué iglesias de tu zona podrían orar juntos por una campaña, y quién podría dar el primer paso?",
    },
  },
  {
    id: "evangelismo-misiones-2-4",
    objetivos: [
      "Explicar las marcas de una predicación evangelística fiel.",
      "Distinguir un llamado honesto de la manipulación.",
      "Preparar un llamado al arrepentimiento y la fe.",
    ],
    paraEmpezar:
      "En una campaña, todo apunta al momento en que se predica el evangelio. Ahí el mensaje debe ser claro y el llamado, honesto.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 2:1-5" },
      {
        t: "parrafo",
        texto:
          "Pablo se propuso «no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado», y su predicación no fue «con palabras persuasivas de humana sabiduría», para que la fe de ellos estuviera fundada «en el poder de Dios».",
      },
      { t: "versiculo", ref: "2 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "Pablo renunció a los trucos: «no andando con astucia, ni adulterando la palabra de Dios». El llamado no presiona, no engaña ni promete lo que Dios no prometió.",
      },
      { t: "versiculo", ref: "2 Corintios 4:5" },
      {
        t: "parrafo",
        texto: "«Porque no nos predicamos a nosotros mismos, sino a Jesucristo como Señor». El protagonista no es el evangelista, sino Cristo.",
      },
      { t: "versiculo", ref: "Hechos 2:38" },
      {
        t: "parrafo",
        texto:
          "Cuando la multitud preguntó qué debía hacer, Pedro respondió: «Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados».",
      },
      { t: "subtitulo", texto: "Un llamado honesto" },
      {
        t: "lista",
        items: [
          "Explica qué significa responder: arrepentirse de los pecados y confiar en Cristo.",
          "Da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas.",
          "Invita a dar un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto es lo que salva.",
          "Explica lo que sigue: la Biblia, la oración y una iglesia cercana.",
        ],
      },
    ],
    ideaClave:
      "En una campaña, el mensaje es Cristo crucificado y resucitado, predicado con claridad y en el poder de Dios, no con trucos de persuasión. El llamado es honesto: explica qué es arrepentirse y creer, da libertad, invita a un paso visible sin confundirlo con lo que salva y muestra lo que sigue.",
    paraLaVida: {
      texto: "El llamado honesto confía en el poder de Dios, no en la presión.",
      pregunta: "¿Cómo explicarías en un minuto qué significa responder al evangelio?",
    },
  },
  {
    id: "evangelismo-misiones-2-5",
    objetivos: [
      "Explicar la tarea del consejero en una campaña.",
      "Aplicar un plan de seguimiento que una a cada persona con una iglesia.",
      "Valorar la consolidación como la otra mitad de toda campaña.",
    ],
    paraEmpezar: "Lo más importante de una campaña ocurre después de que se apagan las luces: cuidar a los que respondieron.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 1:28" },
      {
        t: "parrafo",
        texto:
          "Pablo trabajaba «a fin de presentar perfecto en Cristo Jesús a todo hombre». La meta no es una tarjeta llena, sino un discípulo maduro.",
      },
      { t: "subtitulo", texto: "El consejero" },
      {
        t: "lista",
        items: [
          "Es un creyente maduro y preparado, de una de las iglesias que participan.",
          "Escucha a la persona, le explica el evangelio con la Biblia y ora con ella.",
          "Anota sus datos solo con su permiso y los entrega a la iglesia más cercana a su casa.",
          "No presiona ni promete lo que no puede cumplir.",
        ],
      },
      { t: "versiculo", ref: "Juan 15:16" },
      {
        t: "parrafo",
        texto: "Jesús quiere un fruto que dure: «os he puesto para que vayáis y llevéis fruto, y vuestro fruto permanezca».",
      },
      { t: "subtitulo", texto: "El seguimiento" },
      {
        t: "lista",
        items: [
          "Contactar pronto a cada persona: una llamada o una visita en los días siguientes.",
          "Invitarla a un grupo de nuevos creyentes y a los cultos de una iglesia cercana.",
          "Darle una Biblia y un plan de lectura sencillo.",
          "Asignarle un acompañante que la cuide, como en la consolidación.",
          "Llevar un registro para que nadie se pierda.",
        ],
      },
      {
        t: "nota",
        titulo: "La otra mitad de la campaña",
        texto: "La consolidación que se estudió en el Nivel 3 es la otra mitad de toda campaña: se planifica desde el principio, no al final.",
      },
    ],
    ideaClave:
      "Lo más importante de una campaña viene después: cuidar a los que respondieron. El consejero escucha, explica el evangelio con la Biblia, ora y, con permiso, pasa los datos a una iglesia cercana. El seguimiento contacta pronto, invita a un grupo, da una Biblia, asigna un acompañante y lleva un registro, porque Jesús quiere un fruto que permanezca.",
    paraLaVida: {
      texto: "Cada tarjeta de decisión es una persona que necesita un hermano.",
      pregunta: "¿Estarías dispuesto a acompañar a un nuevo creyente durante sus primeras semanas?",
    },
  },
  {
    id: "evangelismo-misiones-2-6",
    objetivos: [
      "Explicar los cuatro compromisos de Modesto.",
      "Aplicar 1 Tesalonicenses 2:3-5 a la integridad del evangelista.",
      "Evaluar una campaña por su fruto y no solo por sus números.",
    ],
    paraEmpezar: "Una campaña puede reunir a miles y, aun así, dañar el testimonio del evangelio si falta la integridad.",
    bloques: [
      { t: "subtitulo", texto: "Los compromisos de Modesto" },
      {
        t: "parrafo",
        texto:
          "En 1948, en Modesto, California, Billy Graham y su equipo hablaron de los problemas que habían desacreditado a muchos evangelistas, y se comprometieron a cuidar cuatro áreas.",
      },
      {
        t: "lista",
        items: [
          "El dinero: manejarlo con transparencia y sin buscar ganancia.",
          "La pureza: evitar toda situación que diera lugar a la tentación o a la sospecha; ellos decidieron no quedarse nunca a solas con una mujer que no fuera su esposa.",
          "La honestidad: no exagerar los números ni los resultados al informar.",
          "Las iglesias del lugar: no criticarlas, sino trabajar con ellas.",
        ],
      },
      { t: "versiculo", ref: "1 Tesalonicenses 2:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo». Hablaba «no como para agradar a los hombres, sino a Dios».",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "Con el dinero se procura hacer las cosas honradamente «no sólo delante del Señor sino también delante de los hombres»: presupuesto conocido, dos personas que cuentan las ofrendas e informe final.",
      },
      { t: "subtitulo", texto: "Evaluar con honestidad" },
      {
        t: "lista",
        items: [
          "¿Cuántas personas respondieron, y cuántas siguen en una iglesia meses después?",
          "¿Se predicó a Cristo con claridad?",
          "¿Las iglesias quedaron más unidas y con más creyentes que evangelizan?",
          "¿Las cuentas quedaron claras y el informe fue honesto?",
          "¿Qué aprendimos para la próxima vez?",
        ],
      },
    ],
    ideaClave:
      "Una campaña necesita integridad. En 1948, Billy Graham y su equipo se comprometieron en Modesto a cuidar el dinero, la pureza, la honestidad al informar y el trabajo con las iglesias del lugar. Como Pablo, el evangelista no usa palabras lisonjeras ni encubre avaricia, y maneja el dinero honradamente. Una campaña se evalúa por su fruto: discípulos que permanecen, y no solo números.",
    paraLaVida: {
      texto: "La integridad del evangelista también es parte del mensaje.",
      pregunta: "¿Cuál de los compromisos de Modesto necesitas cuidar más en tu propio servicio?",
    },
  },
];
