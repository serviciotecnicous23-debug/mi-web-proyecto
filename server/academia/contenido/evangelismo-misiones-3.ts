/**
 * Especialidad Evangelismo y misiones · Materia 3 — Teología bíblica de las misiones (avanzada; sílabo en
 * shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La misión de Dios de Génesis a Apocalipsis. No enseña el orden de los acontecimientos del fin (el rapto y el milenio
 * son puntos de la declaración de fe por confirmar): estudia la tarea que Jesús dio a su iglesia y su meta.
 * El dato de COMIBAM (São Paulo, 1987) se comprobó en varias fuentes.
 */
import type { LeccionContenido } from "../tipos";

export const EVANGELISMO_MISIONES_3: LeccionContenido[] = [
  {
    id: "evangelismo-misiones-3-1",
    objetivos: [
      "Explicar que la misión nace en el amor de Dios.",
      "Relacionar el envío del Hijo con el envío de la iglesia (Juan 20:21).",
      "Distinguir la misión de Dios de las misiones, sus formas concretas.",
    ],
    paraEmpezar:
      "Muchos piensan que las misiones son un programa más de la iglesia. La Biblia muestra algo más profundo: la misión empieza en Dios, que ama al mundo y envía.",
    bloques: [
      { t: "versiculo", ref: "Juan 20:21" },
      {
        t: "parrafo",
        texto: "Jesús resucitado dijo a sus discípulos: «Como me envió el Padre, así también yo os envío». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "Juan 3:16" },
      {
        t: "parrafo",
        texto:
          "La misión nace del amor de Dios: «Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito». El Padre envió al Hijo, y el Hijo envía a la iglesia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Isaías 6:8" },
      {
        t: "parrafo",
        texto: "Isaías oyó la pregunta de Dios: «¿A quién enviaré, y quién irá por nosotros?», y respondió: «Heme aquí, envíame a mí».",
      },
      { t: "subtitulo", texto: "La misión y las misiones" },
      {
        t: "parrafo",
        texto:
          "La misión es la obra de Dios en el mundo, en la que él invita a participar a su pueblo: anunciar el evangelio a todas las naciones, hacer discípulos y servir con amor. Las misiones, en plural, son las formas concretas de esa obra: enviar obreros, plantar iglesias, traducir la Biblia y servir donde Cristo no es conocido.",
      },
      {
        t: "lista",
        items: [
          "La misión empieza en Dios, no en la iglesia.",
          "Nace del amor de Dios por el mundo.",
          "El Padre envía al Hijo, y el Hijo envía a la iglesia.",
          "Cada creyente es invitado a responder: heme aquí.",
        ],
      },
    ],
    ideaClave:
      "La misión empieza en Dios: de tal manera amó al mundo que envió a su Hijo, y Jesús resucitado envía a la iglesia como el Padre lo envió a él. La misión es la obra de Dios en la que participa su pueblo, y las misiones son sus formas concretas. Como Isaías, el creyente responde: heme aquí, envíame a mí.",
    paraLaVida: {
      texto: "No eres tú el que inventa la misión: Dios te invita a la suya.",
      pregunta: "¿Qué cambia en tu manera de servir si la misión empieza en Dios y no en ti?",
    },
  },
  {
    id: "evangelismo-misiones-3-2",
    objetivos: [
      "Explicar la promesa de Génesis 12:3 y su relación con el evangelio.",
      "Describir el llamado de Israel a mostrar a Dios a las naciones.",
      "Reconocer en el libro de Jonás la compasión de Dios por los pueblos.",
    ],
    paraEmpezar: "La misión no empieza en el Nuevo Testamento. Desde Génesis, Dios tiene en mente a todas las familias de la tierra.",
    bloques: [
      { t: "versiculo", ref: "Génesis 12:1-3" },
      {
        t: "parrafo",
        texto:
          "Dios llamó a Abram y le prometió: «serán benditas en ti todas las familias de la tierra». Escogió a un hombre y a su descendencia para bendecir a todos los pueblos.",
      },
      { t: "versiculo", ref: "Gálatas 3:8" },
      {
        t: "parrafo",
        texto:
          "Pablo explica que esa promesa era el evangelio anunciado de antemano: la Escritura «dio de antemano la buena nueva a Abraham, diciendo: En ti serán benditas todas las naciones».",
      },
      { t: "versiculo", ref: "Éxodo 19:5-6" },
      {
        t: "parrafo",
        texto:
          "A Israel, Dios le recordó que «mía es toda la tierra» y le dijo: «vosotros me seréis un reino de sacerdotes, y gente santa». Un sacerdote está entre Dios y los demás: Israel debía mostrar a Dios a las naciones.",
      },
      { t: "versiculo", ref: "Isaías 49:6" },
      {
        t: "parrafo",
        texto:
          "Por medio del profeta, Dios habló de su Siervo: «también te di por luz de las naciones, para que seas mi salvación hasta lo postrero de la tierra». En Hechos 13:47, Pablo y Bernabé aplicaron estas palabras a su misión entre los gentiles.",
      },
      { t: "versiculo", ref: "Salmos 67:1-2" },
      {
        t: "parrafo",
        texto:
          "El salmista pide la bendición de Dios con un propósito: «Para que sea conocido en la tierra tu camino, En todas las naciones tu salvación».",
      },
      { t: "subtitulo", texto: "Jonás y la compasión de Dios" },
      {
        t: "parrafo",
        texto:
          "Jonás huyó porque no quería que Nínive, una ciudad enemiga de Israel, recibiera la misericordia de Dios (Jonás 4:1-2). El libro termina con una pregunta de Dios sobre su compasión por esa gran ciudad (Jonás 4:11). El corazón de Dios es más grande que nuestros prejuicios.",
      },
    ],
    ideaClave:
      "Desde Génesis, Dios tiene en mente a todas las naciones: prometió a Abraham que en él serían benditas todas las familias de la tierra, y Pablo llama a esa promesa el evangelio anunciado de antemano. Israel fue llamado a ser un reino de sacerdotes, el Siervo de Dios es luz de las naciones, y el libro de Jonás muestra la compasión de Dios aun por una ciudad enemiga.",
    paraLaVida: {
      texto: "Dios bendice a su pueblo para que sea bendición a otros.",
      pregunta: "¿Hacia qué grupo de personas sientes que tu corazón es más pequeño que el de Dios?",
    },
  },
  {
    id: "evangelismo-misiones-3-3",
    objetivos: [
      "Explicar la gran comisión según Mateo y Lucas.",
      "Identificar la autoridad y la presencia de Cristo como base de la misión.",
      "Interpretar la palabra naciones como pueblos con su lengua y su cultura.",
    ],
    paraEmpezar: "La gran comisión no es un mandato suelto al final de los evangelios: es la conclusión de toda la historia de la promesa a Abraham.",
    bloques: [
      { t: "versiculo", ref: "Mateo 28:18-20" },
      {
        t: "parrafo",
        texto:
          "Jesús empezó por su autoridad: «Toda potestad me es dada en el cielo y en la tierra». Por eso mandó: «id, y haced discípulos a todas las naciones», y prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo».",
      },
      {
        t: "parrafo",
        texto:
          "La palabra que se traduce naciones no habla de países con fronteras, sino de pueblos: grupos con su propia lengua y su propia cultura. La meta es que haya discípulos de Cristo en cada pueblo.",
      },
      { t: "versiculo", ref: "Lucas 24:46-48" },
      {
        t: "parrafo",
        texto:
          "En Lucas, Jesús muestra que la misión estaba escrita: el Cristo debía padecer y resucitar, «y que se predicase en su nombre el arrepentimiento y el perdón de pecados en todas las naciones, comenzando desde Jerusalén». Y añadió: «vosotros sois testigos de estas cosas».",
      },
      { t: "versiculo", ref: "Mateo 24:14" },
      {
        t: "parrafo",
        texto:
          "Jesús anunció que «será predicado este evangelio del reino en todo el mundo, para testimonio a todas las naciones». La misión de la iglesia tiene un horizonte: llegar a todos los pueblos.",
      },
      {
        t: "nota",
        titulo: "Sobre los últimos tiempos",
        texto:
          "Esta materia no enseña el orden de los acontecimientos del fin, que es un punto de la declaración de fe del ministerio por confirmar: estudia la tarea que Jesús dio a su iglesia.",
      },
    ],
    ideaClave:
      "La gran comisión concluye la historia de la promesa a Abraham. Con toda autoridad, Jesús mandó hacer discípulos a todas las naciones, es decir, a todos los pueblos con su lengua y su cultura, y prometió estar con los suyos todos los días. En Lucas, la misión estaba escrita: predicar en su nombre el arrepentimiento y el perdón en todas las naciones, y los discípulos son testigos.",
    paraLaVida: {
      texto: "La autoridad y la presencia de Cristo sostienen al que obedece la gran comisión.",
      pregunta: "¿Qué pueblo o grupo cultural vive cerca de ti y todavía no tiene discípulos de Cristo?",
    },
  },
  {
    id: "evangelismo-misiones-3-4",
    objetivos: [
      "Explicar el camino de la misión en Hechos 1:8.",
      "Describir cómo la iglesia de Antioquía llegó a ser una iglesia que envía.",
      "Aplicar el ejemplo de Antioquía a la iglesia local.",
    ],
    paraEmpezar:
      "El libro de Hechos muestra cómo el evangelio salió de Jerusalén hacia los pueblos, impulsado por el Espíritu Santo y llevado también por creyentes comunes.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "Jesús prometió: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra». El libro de Hechos sigue ese camino.",
      },
      { t: "versiculo", ref: "Hechos 11:19-21" },
      {
        t: "parrafo",
        texto:
          "Los creyentes esparcidos por la persecución llegaron a Antioquía, y algunos «hablaron también a los griegos, anunciando el evangelio del Señor Jesús», y «gran número creyó y se convirtió al Señor». Fueron creyentes comunes, y no los apóstoles, los que cruzaron esa frontera.",
      },
      { t: "versiculo", ref: "Hechos 13:1-3" },
      {
        t: "parrafo",
        texto:
          "En la iglesia de Antioquía, mientras ministraban al Señor y ayunaban, el Espíritu Santo dijo: «Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Y la iglesia, «habiendo ayunado y orado, les impusieron las manos y los despidieron».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Una iglesia que envía" },
      {
        t: "lista",
        items: [
          "Ora y busca la dirección de Dios, como Antioquía.",
          "Reconoce a los que Dios llama y los prepara.",
          "Los envía con el respaldo de toda la iglesia.",
          "Los sostiene con oración, comunicación y ofrendas.",
          "Recibe sus informes y celebra lo que Dios hace (Hechos 14:26-27).",
        ],
      },
    ],
    ideaClave:
      "En Hechos, el evangelio sale de Jerusalén hacia lo último de la tierra con el poder del Espíritu Santo. Creyentes comunes llevaron el evangelio a los griegos de Antioquía, y esa iglesia, mientras ministraba y ayunaba, envió a Bernabé y a Saulo. Una iglesia que envía ora, reconoce a los llamados, los envía, los sostiene y celebra lo que Dios hace.",
    paraLaVida: {
      texto: "Toda iglesia local puede ser una Antioquía.",
      pregunta: "¿Qué puede hacer tu iglesia para llegar a ser una iglesia que envía?",
    },
  },
  {
    id: "evangelismo-misiones-3-5",
    objetivos: [
      "Describir la estrategia misionera de Pablo.",
      "Explicar el principio de Romanos 15:20.",
      "Aplicar el modelo de plantar, fortalecer y dejar líderes locales.",
    ],
    paraEmpezar: "Pablo no viajaba sin rumbo: tenía una estrategia, guiada por el Espíritu y por la Escritura.",
    bloques: [
      { t: "versiculo", ref: "Romanos 15:20-21" },
      {
        t: "parrafo",
        texto:
          "Pablo se esforzó «a predicar el evangelio, no donde Cristo ya hubiese sido nombrado, para no edificar sobre fundamento ajeno». Buscaba a los que nunca habían oído de Cristo.",
      },
      { t: "versiculo", ref: "Hechos 14:21-23" },
      {
        t: "parrafo",
        texto:
          "En su primer viaje, después de anunciar el evangelio y hacer discípulos, volvió a las ciudades «confirmando los ánimos de los discípulos», y «constituyeron ancianos en cada iglesia». Plantaba, fortalecía y dejaba líderes.",
      },
      { t: "versiculo", ref: "1 Corintios 9:19" },
      {
        t: "parrafo",
        texto: "Siendo libre, Pablo dice: «me he hecho siervo de todos para ganar a mayor número».",
      },
      { t: "subtitulo", texto: "La estrategia de Pablo" },
      {
        t: "lista",
        items: [
          "Ir adonde Cristo no era conocido.",
          "Empezar en ciudades importantes, desde donde el evangelio se extendía a toda la región (Hechos 19:10).",
          "Trabajar en equipo: Bernabé, Silas, Timoteo, Priscila y Aquila.",
          "Adaptarse a la cultura sin cambiar el evangelio (1 Corintios 9:19-22).",
          "Formar líderes locales y dejarles la obra (Hechos 14:23).",
          "Seguir cuidando a las iglesias con visitas y cartas (2 Corintios 11:28).",
        ],
      },
      {
        t: "nota",
        titulo: "Un misionero que rendía cuentas",
        texto:
          "Al terminar su primer viaje, Pablo volvió a Antioquía y contó a la iglesia lo que Dios había hecho (Hechos 14:26-27): el misionero no trabaja solo, sino enviado y acompañado por su iglesia.",
      },
    ],
    ideaClave:
      "Pablo tenía una estrategia: predicar donde Cristo no era conocido, empezar en ciudades desde donde el evangelio se extendía, trabajar en equipo, adaptarse a la cultura sin cambiar el evangelio, formar líderes locales y seguir cuidando a las iglesias. Plantaba, fortalecía y dejaba ancianos, y rendía cuentas a la iglesia que lo había enviado.",
    paraLaVida: {
      texto: "La buena misión planta iglesias que pueden seguir sin el misionero.",
      pregunta: "¿Qué parte de la estrategia de Pablo le falta más a la manera en que tu iglesia hace misiones?",
    },
  },
  {
    id: "evangelismo-misiones-3-6",
    objetivos: [
      "Describir la meta de la misión según Apocalipsis 5 y 7.",
      "Explicar las formas de participar en la misión: orar, ir, enviar, dar y recibir.",
      "Valorar la participación de las iglesias de América Latina en la misión mundial.",
    ],
    paraEmpezar: "Toda misión necesita una meta. La Biblia termina mostrando cuál es la meta de la misión de Dios.",
    bloques: [
      { t: "versiculo", ref: "Apocalipsis 7:9-10" },
      {
        t: "parrafo",
        texto:
          "Juan vio «una gran multitud, la cual nadie podía contar, de todas naciones y tribus y pueblos y lenguas», que clamaba: «La salvación pertenece a nuestro Dios que está sentado en el trono, y al Cordero». Esa es la meta de la misión: adoradores de Cristo de todos los pueblos.",
      },
      { t: "versiculo", ref: "Apocalipsis 5:9" },
      {
        t: "parrafo",
        texto: "El cántico al Cordero celebra que «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación».",
      },
      { t: "subtitulo", texto: "Cómo participar" },
      {
        t: "lista",
        items: [
          "Orar: por los pueblos que no conocen a Cristo y por los misioneros (Mateo 9:38).",
          "Ir: algunos son llamados a cruzar fronteras de cultura, de lengua o de país.",
          "Enviar y sostener: la iglesia que envía cuida a sus misioneros.",
          "Dar: como los filipenses, que sostuvieron a Pablo.",
          "Recibir: acoger a los extranjeros que viven cerca, un campo misionero a la puerta de casa.",
        ],
      },
      { t: "versiculo", ref: "3 Juan 1:5-8" },
      {
        t: "parrafo",
        texto:
          "Juan elogió a Gayo por recibir a los hermanos que viajaban por el evangelio, y concluyó: «Nosotros, pues, debemos acoger a tales personas, para que cooperemos con la verdad».",
      },
      { t: "versiculo", ref: "Filipenses 4:15-16" },
      {
        t: "parrafo",
        texto:
          "Al principio, solo los filipenses participaron con Pablo «en razón de dar y recibir». Los que dan y los que van comparten la misma obra.",
      },
      { t: "subtitulo", texto: "Las iglesias de América Latina en la misión" },
      {
        t: "parrafo",
        texto:
          "Durante mucho tiempo, América Latina recibió misioneros de otros continentes. En 1987 se celebró en São Paulo, Brasil, el primer Congreso Misionero Iberoamericano (COMIBAM), que animó a las iglesias de habla hispana y portuguesa a pasar de ser campo misionero a ser también fuerza misionera. El teólogo peruano Samuel Escobar ha escrito sobre este tiempo de misión desde América Latina.",
      },
    ],
    ideaClave:
      "La meta de la misión es una multitud de todas las naciones, tribus, pueblos y lenguas que adora a Dios y al Cordero, redimida por su sangre. Todos participan: orando, yendo, enviando y sosteniendo, dando y recibiendo a los extranjeros. Desde COMIBAM, en 1987, las iglesias de América Latina se animan a ser no solo campo misionero, sino también fuerza misionera.",
    paraLaVida: {
      texto: "Cada creyente tiene un lugar en la misión de Dios.",
      pregunta: "¿Cuál de las formas de participar (orar, ir, enviar, dar o recibir) vas a practicar este año, y cómo?",
    },
  },
];
