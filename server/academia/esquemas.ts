/**
 * Los bloques que agregó la revisión del sistema de estudio (docs/academia-auditoria.md) a lecciones ya publicadas: los
 * esquemas visuales (línea de tiempo, cuadro comparativo y pasos) y los videos de las materias que no tenían ninguno.
 * Van al final de la lectura de su lección, antes de «La idea clave», como resumen visual; así no cambian los números de
 * los bloques que la lección ya tenía (el cuaderno guarda cada resaltado con el número de su bloque). Cada dato se
 * comprobó con fuentes: lo redactó un agente y lo revisaron otros dos (contenido y Biblia; fuentes, videos y forma).
 * index.ts los suma al contenido. Por id de lección.
 */
import type { Bloque } from "./tipos";

export const BLOQUES_EXTRA: Record<string, Bloque[]> = {
  // La salvación: nueva vida en Cristo
  "n1-salvacion-2": [
    // Ordena el evangelio de la lección en cinco pasos con sus versículos, para que el alumno pueda explicarlo con la Biblia en la mano, como pide el sílabo.
    {
      t: "pasos",
      titulo: "Cómo explicar el evangelio con la Biblia en la mano",
      pasos: [
        {
          titulo: "Todos hemos pecado",
          texto: "Pecar es apartarse de lo que Dios quiere. No es solo cometer crímenes graves: también son pecado el orgullo, la mentira y el rencor. Nadie llega a la medida santa de Dios (Romanos 3:23).",
        },
        {
          titulo: "El pecado nos separa de Dios",
          texto: "No es un detalle sin importancia: nos separa de Dios, que es santo. Y lo que el pecado nos da a cambio es la muerte (Isaías 59:2; Romanos 6:23).",
        },
        {
          titulo: "Dios dio el primer paso",
          texto: "Dios nos amó y dio a su Hijo. No esperó a que fuéramos buenos: Cristo murió por nosotros cuando todavía éramos pecadores (Juan 3:16; Romanos 5:8).",
        },
        {
          titulo: "Cristo murió en nuestro lugar y resucitó",
          texto: "Jesús vivió sin pecado, cargó en la cruz con el castigo que merecíamos y al tercer día resucitó (Isaías 53:5-6; 1 Pedro 2:22-24; 1 Corintios 15:3-4).",
        },
        {
          titulo: "La vida eterna es un regalo",
          texto: "No se compra ni se gana: se recibe al arrepentirse y creer en Jesús. Las buenas obras vienen después, como fruto de la salvación y no como su precio (Romanos 6:23; Marcos 1:15; Efesios 2:10).",
        },
      ],
    },
  ],
  "n1-salvacion-3": [
    // Pone lado a lado lo que es y lo que no es cada palabra clave de la lección, para corregir las confusiones más comunes sobre cómo se recibe la salvación.
    {
      t: "cuadro",
      titulo: "Arrepentimiento, fe, gracia y confesión: lo que es y lo que no es",
      columnas: ["Palabra clave", "Lo que no es", "Lo que sí es", "Base bíblica"],
      filas: [
        [
          "Arrepentimiento",
          "Solo sentir tristeza o vergüenza; tampoco es un castigo con el que pagamos los pecados.",
          "Cambiar de mentalidad y de dirección: dejar de justificar el pecado y volverse a Dios, que borra los pecados.",
          "Marcos 1:15; Hechos 3:19",
        ],
        [
          "Fe",
          "Solo aceptar que Jesús existió o que Dios es real: hasta los demonios creen que hay un solo Dios.",
          "Confianza personal: apoyar todo el peso de la vida en lo que Jesús hizo por mí.",
          "Santiago 2:19; Romanos 10:10",
        ],
        [
          "Gracia",
          "Un premio que se gana portándose bien o haciendo buenas obras.",
          "El favor de Dios que no merecemos: Él nos da lo bueno que no ganamos, y toda la gloria es suya.",
          "Efesios 2:8-9",
        ],
        [
          "Confesar con la boca",
          "Repetir unas palabras exactas, como si la fórmula fuera la que salva.",
          "Declarar abiertamente que Jesús es mi Señor: la fe nace en el corazón, pero se dice y se vive.",
          "Romanos 10:9-10",
        ],
      ],
    },
  ],
  "n1-salvacion-4": [
    // Convierte la lección en una guía práctica para el creyente nuevo que duda: volver a la promesa de Dios y no a lo que siente, como enseña 1 Juan 5:11-13.
    {
      t: "pasos",
      titulo: "Qué hacer cuando dudas de tu salvación",
      pasos: [
        {
          titulo: "Vuelve a la promesa",
          texto: "Lee 1 Juan 5:11-13. Juan escribió para que los creyentes sepan que tienen vida eterna: el que tiene al Hijo tiene la vida.",
        },
        {
          titulo: "No te guíes por lo que sientes",
          texto: "Los sentimientos cambian de un día a otro; lo que Dios prometió no cambia. Tu seguridad descansa en su Palabra, no en un día bueno.",
        },
        {
          titulo: "Recuerda quién hizo la obra",
          texto: "Nacer de nuevo no fue fruto de tu fuerza de voluntad: el Espíritu Santo te dio una vida nueva por dentro cuando creíste en Jesús (Juan 3:5-6; Tito 3:5).",
        },
        {
          titulo: "Mira tu nueva identidad",
          texto: "En Cristo eres una nueva criatura. Todavía habrá luchas y tentaciones, pero lo viejo ya no tiene la última palabra sobre tu vida (2 Corintios 5:17).",
        },
        {
          titulo: "Si fallaste, vuelve y confiesa",
          texto: "Un hijo que tropieza no deja de ser hijo. Confiesa tu pecado a Dios y recibe su perdón: Él te levanta y te corrige con amor (1 Juan 1:9).",
        },
        {
          titulo: "Sigue creciendo",
          texto: "Crecer lleva tiempo, pero el cambio de fondo ya empezó. Quien sabe que es amado por Dios quiere agradarle y no pecar (1 Juan 2:1).",
        },
      ],
    },
  ],
  // La oración: hablar con Dios
  "n1-oracion-2": [
    // Reúne en una sola vista cada parte del modelo, lo que enseña y cómo orarla con palabras propias, que es lo que la lección pide practicar.
    {
      t: "cuadro",
      titulo: "Las partes del Padre Nuestro (Mateo 6:9-13)",
      columnas: ["La parte", "Lo que enseña", "Cómo orarla con mis palabras"],
      filas: [
        [
          "Padre nuestro que estás en los cielos",
          "Nos acercamos a un Padre que nos ama y es grande. Decimos nuestro porque oramos como familia.",
          "Padre, gracias porque soy tu hijo y puedo hablar contigo.",
        ],
        [
          "Santificado sea tu nombre",
          "Pedimos que Dios sea honrado como santo, empezando por nuestra propia vida.",
          "Señor, que hoy mis palabras y mis actos honren tu nombre.",
        ],
        [
          "Venga tu reino",
          "Anhelamos que Dios reine en los corazones y en el mundo, y que Cristo vuelva.",
          "Reina en mi casa, en mi iglesia y en mi ciudad. Ven, Señor Jesús.",
        ],
        [
          "Hágase tu voluntad",
          "Rendimos nuestros planes a lo que Dios quiere, como hizo Jesús en Getsemaní (Mateo 26:39).",
          "Te entrego mis planes de hoy: que se haga lo que tú quieres.",
        ],
        [
          "El pan nuestro de cada día",
          "Confiamos en Dios para lo que necesitamos hoy, sin afanarnos por el mañana.",
          "Dame hoy lo que necesito para mi casa, mi trabajo y mi salud.",
        ],
        [
          "Perdónanos como perdonamos",
          "Pedimos perdón y nos comprometemos a perdonar a otros (Mateo 6:14-15).",
          "Perdóname lo que hice mal y ayúdame a perdonar a quien me ofendió.",
        ],
        [
          "No nos metas en tentación, mas líbranos del mal",
          "Pedimos fuerzas para no caer y protección contra el maligno.",
          "Dame fuerzas para decir no al pecado y guárdame del maligno.",
        ],
        [
          "Tuyo es el reino, el poder y la gloria",
          "Terminamos como empezamos: con Dios en el centro, porque todo es suyo para siempre.",
          "Todo es tuyo, Señor: a ti sea la gloria hoy y siempre. Amén.",
        ],
      ],
    },
  ],
  "n1-oracion-3": [
    // La parábola enseña por contraste y es fácil creer que Dios es como el juez; el cuadro muestra que es todo lo contrario.
    {
      t: "cuadro",
      titulo: "El juez injusto y nuestro Dios (Lucas 18:1-8)",
      columnas: ["Qué comparamos", "El juez injusto", "Nuestro Dios"],
      filas: [
        [
          "Cómo es",
          "No temía a Dios ni respetaba a nadie (Lucas 18:2).",
          "Es justo y está cerca de todos los que le invocan (Salmos 145:17-18).",
        ],
        [
          "Quién le pide",
          "Una viuda que venía a él una y otra vez (Lucas 18:3-5).",
          "Sus escogidos, que claman a Él día y noche (Lucas 18:7).",
        ],
        [
          "Por qué responde",
          "Solo para que la viuda dejara de molestarlo (Lucas 18:4-5).",
          "Porque es justo y nos ama: no hay que cansarlo, sino seguir confiando en Él.",
        ],
        [
          "Cuándo responde",
          "Al principio no quiso; respondió después de un tiempo (Lucas 18:4).",
          "Jesús asegura que les hará justicia pronto (Lucas 18:7-8).",
        ],
        [
          "Lo que aprendemos",
          "Si hasta un juez injusto respondió a quien insistía…",
          "…¡cuánto más Dios responderá a quien ora siempre y no desmaya (Lucas 18:1)!",
        ],
      ],
    },
  ],
  "n1-oracion-4": [
    // La lección cita estos ejemplos en párrafos distintos; el cuadro los junta con lo que enseña cada uno para el tiempo diario y el ayuno.
    {
      t: "cuadro",
      titulo: "Ejemplos bíblicos de oración diaria y de ayuno",
      columnas: ["Ejemplo", "Qué hizo", "Qué aprendo"],
      filas: [
        [
          "Jesús (Marcos 1:35)",
          "Tras un día lleno de gente, se levantó muy de mañana, aún a oscuras, y fue a un lugar desierto a orar.",
          "Aun con mucho trabajo, apartar cada día un tiempo a solas con el Padre.",
        ],
        [
          "Daniel (Daniel 6:10)",
          "Oraba y daba gracias tres veces al día, como solía hacerlo, aun después del edicto que lo prohibía.",
          "La constancia: la oración era su hábito diario, no algo solo para la crisis.",
        ],
        [
          "Lo que enseñó Jesús (Mateo 6:16-18)",
          "Habló del ayuno como algo que sus discípulos harían, en lo secreto y sin aparentar.",
          "Se ayuna delante del Padre, no para que otros lo noten.",
        ],
        [
          "La iglesia de Antioquía (Hechos 13:1-3)",
          "Sus profetas y maestros ministraban al Señor y ayunaban; el Espíritu Santo habló y enviaron a Bernabé y a Saulo.",
          "Ayunar y orar para buscar la dirección de Dios antes de decidir.",
        ],
        [
          "Ester (Ester 4:16)",
          "Ayunó tres días con sus doncellas y pidió a los judíos de Susa que ayunaran antes de presentarse ante el rey.",
          "Ayunar en tiempos de gran necesidad, poniendo el problema en manos de Dios.",
        ],
        [
          "Esdras (Esdras 8:21-23)",
          "Proclamó ayuno junto al río Ahava para pedir a Dios un camino seguro, en vez de pedir soldados al rey.",
          "Ayunar para humillarse ante Dios y depender de Él, no de nuestras fuerzas.",
        ],
      ],
    },
  ],
  // La Biblia, Palabra de Dios
  "n1-biblia-1": [
    // La lección cuenta cómo nos llegó la Biblia a lo largo de muchos siglos; la línea ordena esas épocas, de Moisés a la Reina-Valera 1960.
    {
      t: "linea",
      titulo: "Cómo nos llegó la Biblia",
      eventos: [
        {
          fecha: "c. 1400 a. C.",
          texto: "Moisés escribe la Ley (la fecha exacta se discute). Así empiezan unos 1500 años en que Dios inspira a unos cuarenta escritores.",
          ref: "Éxodo 24:4",
        },
        {
          fecha: "c. 430 a. C.",
          texto: "Profetiza Malaquías, el último profeta del Antiguo Testamento. Sus 39 libros se escribieron sobre todo en hebreo y en parte en arameo.",
          ref: "Malaquías 1:1",
        },
        {
          fecha: "Siglo I d. C.",
          texto: "Los apóstoles y sus colaboradores escriben en griego los 27 libros del Nuevo Testamento.",
          ref: "2 Pedro 3:15-16",
        },
        {
          fecha: "Siglos I al XV",
          texto: "Hasta que llega la imprenta, la Biblia se copia a mano con gran cuidado. Hoy se conservan miles de manuscritos antiguos.",
        },
        {
          fecha: "1569",
          texto: "Casiodoro de Reina publica en Basilea la Biblia del Oso, la primera Biblia completa impresa en español.",
        },
        {
          fecha: "1602",
          texto: "Cipriano de Valera publica en Ámsterdam su revisión de la traducción de Reina: de ahí el nombre Reina-Valera.",
        },
        {
          fecha: "1947",
          texto: "En Qumrán aparecen los primeros rollos del mar Muerto. Uno de Isaías es unos mil años más antiguo que las copias hebreas conocidas.",
        },
        {
          fecha: "1960",
          texto: "Las Sociedades Bíblicas en América Latina publican la revisión Reina-Valera 1960, la que usan la academia y la Biblioteca de la web.",
        },
      ],
    },
  ],
  "n1-biblia-2": [
    // La lección presenta cada testamento por separado; el cuadro los pone lado a lado: libros, idioma, pacto, secciones y cómo hablan de Jesús.
    {
      t: "cuadro",
      titulo: "Los dos testamentos, lado a lado",
      columnas: ["Tema", "Antiguo Testamento", "Nuevo Testamento"],
      filas: [
        ["Cuántos libros", "39 libros", "27 libros (entre los dos, 66)"],
        ["Idioma original", "Sobre todo hebreo, con algunas partes en arameo", "Griego"],
        [
          "El pacto",
          "El antiguo pacto, que Dios hizo con Israel",
          "El nuevo pacto en la sangre de Cristo (Lucas 22:20)",
        ],
        [
          "Qué cuenta",
          "La creación, el pacto de Dios con Israel y las promesas del Mesías",
          "La vida de Jesús, el nacimiento de la iglesia y la esperanza de su regreso",
        ],
        [
          "Sus secciones",
          "Ley (5), históricos (12), poéticos (5), profetas mayores (5) y profetas menores (12)",
          "Evangelios (4), Hechos (1), cartas de Pablo (13), cartas generales (8) y Apocalipsis (1)",
        ],
        ["Primero y último", "Empieza en Génesis y termina en Malaquías", "Empieza en Mateo y termina en Apocalipsis"],
        [
          "Cómo habla de Jesús",
          "Lo anuncia: Jesús dijo que de Él hablan la ley de Moisés, los profetas y los salmos (Lucas 24:44)",
          "Cuenta que el Mesías prometido ya vino, murió y resucitó, y que volverá",
        ],
      ],
    },
  ],
  "n1-biblia-4": [
    // La lección explica qué es meditar y obedecer, pero sin un ejemplo; los pasos lo muestran con Salmos 119:105, el versículo de memoria de la materia.
    {
      t: "pasos",
      titulo: "Meditar y obedecer un versículo: ejemplo con Salmos 119:105",
      pasos: [
        {
          titulo: "Escoge el versículo del día",
          texto: "Hoy, Salmos 119:105, el versículo de memoria de esta materia. Léelo despacio, varias veces, en tu Biblia.",
        },
        {
          titulo: "Piensa en lo que dice",
          texto: "La Palabra es lámpara a mis pies: alumbra el paso que tengo delante. Y es lumbrera a mi camino: me muestra hacia dónde va mi vida.",
        },
        {
          titulo: "Pregúntate qué significa para ti",
          texto: "¿En qué decisión de esta semana necesito la luz de Dios? Por ejemplo, cómo usar mi tiempo o qué responder en una conversación difícil.",
        },
        {
          titulo: "Conviértelo en oración",
          texto: "Habla con Dios usando el versículo: pídele que alumbre tu paso en esa decisión y que te guíe por su Palabra.",
        },
        {
          titulo: "Decide qué vas a hacer",
          texto: "Escoge un paso concreto y hazlo hoy: por ejemplo, buscar lo que la Biblia dice sobre esa decisión y actuar como ella enseña. No te quedes solo en oír (Santiago 1:22).",
        },
        {
          titulo: "Vuelve a él durante el día",
          texto: "Repítelo en la mañana, al mediodía y en la noche hasta guardarlo en tu corazón (Salmos 119:11).",
        },
      ],
    },
  ],
  // El Espíritu Santo en mi vida
  "n1-espiritu-1": [
    // Reúne en una tabla las pruebas bíblicas de que el Espíritu es una Persona, es Dios y vive en el creyente: los tres objetivos de la lección, cada uno con su cita.
    {
      t: "cuadro",
      titulo: "El Espíritu Santo: una Persona divina que vive en ti",
      columnas: ["Lo que dice la Biblia", "Lo que nos enseña", "Dónde lo dice"],
      filas: [
        ["Jesús lo llama otro Consolador", "Es alguien llamado a nuestro lado para ayudarnos", "Juan 14:16"],
        ["Enseña todas las cosas y recuerda lo que Jesús dijo", "Es una Persona: tiene entendimiento", "Juan 14:26"],
        ["Se le puede entristecer", "Es una Persona: tiene sentimientos; una fuerza no se entristece", "Efesios 4:30"],
        ["Reparte los dones a cada uno como Él quiere", "Es una Persona: tiene voluntad propia", "1 Corintios 12:11"],
        [
          "Ananías mintió al Espíritu, y Pedro le dijo que había mentido a Dios",
          "El Espíritu Santo es Dios",
          "Hechos 5:3-4",
        ],
        [
          "Se bautiza en el nombre del Padre, del Hijo y del Espíritu Santo",
          "Es Dios junto al Padre y al Hijo: la Trinidad, un solo Dios en tres Personas",
          "Mateo 28:19",
        ],
        [
          "Mora con los creyentes y está en ellos; el cuerpo es su templo",
          "En el Antiguo Testamento venía sobre algunos para tareas especiales; hoy vive en todo creyente",
          "Juan 14:17; 1 Corintios 6:19",
        ],
      ],
    },
  ],
  "n1-espiritu-2": [
    // La lección presenta su obra en varios pasajes; los pasos la ordenan desde antes de creer hasta la transformación de cada día, con la base bíblica de cada uno.
    {
      t: "pasos",
      titulo: "La obra del Espíritu en ti, desde antes de creer",
      pasos: [
        {
          titulo: "Antes de creer: te convence",
          texto: "Te muestra tu pecado y te presenta a Jesús como el único camino (Juan 16:8-9). Por eso evangelizamos orando: es Él quien convence.",
        },
        {
          titulo: "Al creer: te da nueva vida",
          texto: "Te hace nacer de nuevo; sin el nuevo nacimiento nadie puede entrar en el reino de Dios (Juan 3:5).",
        },
        {
          titulo: "Te da seguridad: eres hijo de Dios",
          texto: "Da testimonio a tu espíritu de que eres hijo de Dios; por eso puedes llamarle Abba, Padre, con cercanía y confianza (Romanos 8:15-16).",
        },
        {
          titulo: "Cada día: te guía a la verdad",
          texto: "Te ayuda a entender la Palabra y te guía en tus decisiones, pero nunca contradice la Biblia que Él inspiró (Juan 16:13; 1 Juan 4:1).",
        },
        {
          titulo: "Cuando oras: intercede por ti",
          texto: "Cuando no sabes qué pedir como conviene, el Espíritu te ayuda en tu debilidad e intercede por ti (Romanos 8:26).",
        },
        {
          titulo: "Toda la vida: te transforma",
          texto: "Te santifica poco a poco y te va transformando a la imagen de Cristo (2 Corintios 3:18).",
        },
      ],
    },
  ],
  "n1-espiritu-3": [
    // Ubica en el tiempo la promesa, la espera y Pentecostés, que la lección cuenta con varios pasajes, y muestra que la promesa siguió después (Hechos 2:39).
    {
      t: "linea",
      titulo: "La promesa del Espíritu: de Joel a Pentecostés y después",
      eventos: [
        {
          fecha: "Antes de Cristo",
          texto: "El profeta Joel anuncia que Dios derramará su Espíritu sobre todos: hijos e hijas, ancianos, jóvenes y siervos.",
          ref: "Joel 2:28-29",
        },
        {
          fecha: "Antes de la cruz",
          texto: "La noche antes de morir, Jesús dice a sus discípulos que les conviene que Él se vaya, porque así les enviará el Consolador.",
          ref: "Juan 16:7",
        },
        {
          fecha: "Durante 40 días",
          texto: "Jesús resucitado se presenta vivo a sus apóstoles, les habla del reino de Dios y les manda esperar en Jerusalén la promesa del Padre.",
          ref: "Hechos 1:3-4",
        },
        {
          fecha: "Al cabo de 40 días",
          texto: "Les promete poder cuando venga sobre ellos el Espíritu Santo, para ser sus testigos, y sube al cielo ante sus ojos.",
          ref: "Hechos 1:8-9",
        },
        {
          fecha: "Unos diez días",
          texto: "Unos ciento veinte creyentes esperan en Jerusalén y perseveran unánimes en oración.",
          ref: "Hechos 1:12-15",
        },
        {
          fecha: "Día de Pentecostés",
          texto: "Viene un estruendo como de viento recio y lenguas como de fuego; todos son llenos del Espíritu y hablan en otras lenguas.",
          ref: "Hechos 2:1-4",
        },
        {
          fecha: "Ese mismo día",
          texto: "Pedro explica que se cumplió lo anunciado por Joel y predica a Cristo; como tres mil personas son bautizadas.",
          ref: "Hechos 2:14-41",
        },
        {
          fecha: "Años después",
          texto: "La promesa sigue: en casa de Cornelio (Hechos 10:44-46) y en Éfeso, el Espíritu viene sobre otros creyentes y hablan en lenguas.",
          ref: "Hechos 19:6",
        },
      ],
    },
  ],
  // El bautismo y la Santa Cena
  "n1-bautismo-cena-1": [
    // La lección es solo prosa; el cuadro une lo que se ve en el agua, lo que hizo Cristo y lo que declara el creyente según Romanos 6:3-4, el versículo de memoria.
    {
      t: "cuadro",
      titulo: "El bautismo, una imagen viva del evangelio",
      columnas: ["En el bautismo", "Lo que hizo Cristo", "Lo que declara el creyente"],
      filas: [
        [
          "El creyente baja al agua",
          "Murió por nuestros pecados (1 Corintios 15:3)",
          "Que murió al pecado con Cristo (Romanos 6:2-3)",
        ],
        [
          "Es sumergido en el agua",
          "Fue sepultado (1 Corintios 15:4)",
          "Que fue sepultado con Él (Romanos 6:4; Colosenses 2:12)",
        ],
        [
          "Sale del agua",
          "Resucitó al tercer día (1 Corintios 15:4)",
          "Que resucitó con Él para andar en vida nueva (Romanos 6:4; Colosenses 2:12)",
        ],
        [
          "Lo hace delante de la iglesia",
          "Mandó hacer discípulos y bautizarlos (Mateo 28:19)",
          "Que ya es de Jesús y le obedece; el agua no lo salva, da testimonio de su fe (Efesios 2:8-9)",
        ],
      ],
    },
  ],
  "n1-bautismo-cena-2": [
    // Pone en fila los cuatro ejemplos de Hechos que da la lección, para que se vea el orden que mide el objetivo o2: primero se oye y se cree, después viene el bautismo.
    {
      t: "cuadro",
      titulo: "Primero creer, después bautizarse: cuatro ejemplos de Hechos",
      columnas: ["El ejemplo", "Qué oyeron", "Cómo respondieron", "Su bautismo"],
      filas: [
        [
          "La multitud en Jerusalén, en Pentecostés (Hechos 2:36-41)",
          "Pedro les anunció que Dios hizo Señor y Cristo a Jesús, a quien crucificaron",
          "Les dolió el corazón y recibieron su palabra, que los llamaba a arrepentirse",
          "Fueron bautizados; aquel día se añadieron como tres mil personas",
        ],
        [
          "La gente de Samaria (Hechos 8:5, 12)",
          "Felipe les anunciaba el evangelio del reino de Dios y el nombre de Jesucristo",
          "Creyeron el mensaje de Felipe",
          "Se bautizaban hombres y mujeres",
        ],
        [
          "El eunuco etíope, camino a Gaza (Hechos 8:26-38)",
          "Felipe le anunció el evangelio de Jesús, comenzando por Isaías 53",
          "Creyó y confesó que Jesucristo es el Hijo de Dios",
          "Bajaron ambos al agua y Felipe lo bautizó",
        ],
        [
          "El carcelero de Filipos (Hechos 16:30-34)",
          "Pablo y Silas le hablaron la palabra del Señor a él y a todos los de su casa",
          "Creyó en el Señor Jesucristo, como le dijeron Pablo y Silas",
          "En seguida, esa misma noche, se bautizó con todos los suyos",
        ],
      ],
    },
  ],
  "n1-bautismo-cena-3": [
    // Muestra cómo la Pascua de Éxodo 12 anunciaba a Cristo, nuestra pascua, y deja claro qué representan el pan y la copa; la lección lo cuenta en prosa.
    {
      t: "cuadro",
      titulo: "De la Pascua a la Santa Cena",
      columnas: ["Lo que comparamos", "La Pascua (Éxodo 12)", "La Santa Cena"],
      filas: [
        [
          "Lo que recuerda",
          "Cómo Dios libró a Israel de la esclavitud en Egipto (Éxodo 12:14, 17; 13:3)",
          "La muerte de Jesús, que dio su cuerpo y su sangre por nosotros (Lucas 22:19-20)",
        ],
        [
          "El cordero",
          "Un cordero sin defecto por cada familia (Éxodo 12:3, 5)",
          "Cristo, el Cordero de Dios y nuestra pascua, sacrificado por nosotros (Juan 1:29; 1 Corintios 5:7)",
        ],
        [
          "La sangre",
          "En los postes y el dintel: al ver la sangre, el Señor pasó de largo (Éxodo 12:7, 13)",
          "La copa: su sangre del nuevo pacto, derramada para perdón de los pecados (Mateo 26:28)",
        ],
        [
          "El pan",
          "Panes sin levadura, comidos con el cordero aquella noche (Éxodo 12:8)",
          "El pan partido: su cuerpo, entregado por nosotros (Lucas 22:19)",
        ],
        [
          "Cuándo se celebra",
          "De año en año, por todas sus generaciones (Éxodo 12:14; 13:10)",
          "Con regularidad, sin fecha fija en la Biblia, hasta que Él venga (Hechos 2:42; 1 Corintios 11:26)",
        ],
      ],
    },
  ],
  // La iglesia, mi nueva familia
  "n1-iglesia-1": [
    // Reúne en un cuadro todo lo que la lección dice que es la iglesia, con su base bíblica, para repasarlo de un vistazo antes de la idea clave.
    {
      t: "cuadro",
      titulo: "La iglesia según la Biblia: pueblo, familia, cuerpo y templo",
      columnas: ["La iglesia es", "Qué enseña", "Base bíblica"],
      filas: [
        [
          "Un pueblo llamado",
          "La asamblea de los que Dios llamó de las tinieblas a su luz admirable: son personas, no un edificio.",
          "1 Pedro 2:9",
        ],
        [
          "De Cristo",
          "Jesús la edifica, la ganó con su propia sangre y es su cabeza.",
          "Mateo 16:18; Hechos 20:28; Colosenses 1:18",
        ],
        [
          "Una familia",
          "Ya no somos extranjeros: Dios es nuestro Padre y los creyentes son nuestros hermanos.",
          "Efesios 2:19",
        ],
        [
          "Un cuerpo",
          "Cada creyente es un miembro con una función; si uno padece, todos se duelen con él.",
          "1 Corintios 12:26-27",
        ],
        [
          "Un templo",
          "Juntos somos edificados para morada de Dios en el Espíritu, sobre Jesucristo, la principal piedra del ángulo.",
          "Efesios 2:20-22",
        ],
        [
          "Universal y local",
          "Todos los creyentes de todo tiempo y lugar, y la congregación donde te cuidan y tus pastores velan por tu alma.",
          "Hebreos 13:17",
        ],
      ],
    },
  ],
  "n1-iglesia-2": [
    // Pone lado a lado las prácticas de Hechos 2:42-47 y cómo vivirlas cada semana, que es lo que pide el tercer objetivo de la lección.
    {
      t: "cuadro",
      titulo: "Hechos 2:42-47: la primera iglesia y mi iglesia hoy",
      columnas: ["Aspecto", "En la primera iglesia", "Hoy en mi iglesia"],
      filas: [
        [
          "La doctrina de los apóstoles",
          "Perseveraban en la enseñanza de los apóstoles: aprendían la Palabra (Hechos 2:42).",
          "Llego con el corazón preparado para escuchar la Palabra y obedecerla.",
        ],
        [
          "La comunión unos con otros",
          "Estaban juntos y repartían lo que tenían según la necesidad de cada uno (Hechos 2:44-45).",
          "Me uno a un grupo pequeño, aprendo el nombre de mis hermanos y ayudo al necesitado.",
        ],
        [
          "El partimiento del pan",
          "Partían el pan en las casas y comían juntos con alegría y sencillez de corazón (Hechos 2:46).",
          "Participo de la Santa Cena y comparto la mesa con mis hermanos.",
        ],
        [
          "Las oraciones",
          "Perseveraban en las oraciones y alababan a Dios (Hechos 2:42, 47).",
          "Oro por mis hermanos y me uno a la oración de la iglesia.",
        ],
        [
          "Congregarse",
          "Se reunían cada día en el templo, y también en las casas (Hechos 2:46).",
          "No dejo de congregarme: voy al culto y a mi grupo, y animo a otros (Hebreos 10:24-25).",
        ],
        [
          "El fruto",
          "El Señor añadía cada día a la iglesia los que habían de ser salvos (Hechos 2:47).",
          "Recibo con amor a los que llegan, para que se sientan en familia.",
        ],
      ],
    },
  ],
  "n1-iglesia-4": [
    // La lección va toda en párrafos; los pasos convierten lo que enseña sobre el diezmo y la ofrenda en una guía práctica para la decisión que pide al final.
    {
      t: "pasos",
      titulo: "Cómo dar con orden, alegría y fe",
      pasos: [
        {
          titulo: "Reconoce que todo es de Dios",
          texto: "De Jehová es la tierra y su plenitud (Salmos 24:1). Tu tiempo, tus talentos y tus bienes te los confía Dios: eres su administrador, y se te pide ser fiel (1 Corintios 4:2).",
        },
        {
          titulo: "Decide en tu corazón",
          texto: "Cada uno dé como propuso en su corazón, no con tristeza ni por necesidad (2 Corintios 9:7). Dar no es pagarle a Dios: es adorarle y confiar en Él.",
        },
        {
          titulo: "Aparta con orden",
          texto: "Pablo pidió que cada primer día de la semana cada uno pusiera aparte algo, según hubiera prosperado (1 Corintios 16:2). Planéalo; no esperes a ver si te sobra.",
        },
        {
          titulo: "Trae el diezmo y tus ofrendas",
          texto: "El diezmo, la décima parte de lo que recibes, tiene base bíblica (Malaquías 3:10; Mateo 23:23) y es el punto de partida de la generosidad; las ofrendas son dádivas voluntarias, además del diezmo.",
        },
        {
          titulo: "Acuérdate de los pobres",
          texto: "La generosidad alcanza también al necesitado (Gálatas 2:10), como en la primera iglesia, que repartía según la necesidad de cada uno (Hechos 2:45).",
        },
        {
          titulo: "Da con gratitud y confía",
          texto: "No das para comprar bendiciones: das porque Dios te dio primero a su Hijo (Juan 3:16), y confías en que Él suplirá lo que te falta (Filipenses 4:19).",
        },
      ],
    },
  ],
  // Una vida nueva: santidad y victoria
  "n1-vida-nueva-2": [
    // La lección da las armas en una lista; los pasos las ordenan como un plan para el momento de la tentación.
    {
      t: "pasos",
      titulo: "Cuando llega la tentación: el plan para vencer",
      pasos: [
        {
          titulo: "Prepárate antes de que llegue",
          texto: "Conoce tus puntos débiles y pon límites a tiempo: lugares, horarios, amistades o aplicaciones que te alejan de Dios (Romanos 13:14). Es más fácil decir que no a tiempo que salir después.",
        },
        {
          titulo: "Recuerda que ser tentado no es pecar",
          texto: "Jesús fue tentado en todo, pero sin pecado (Hebreos 4:15). El pecado empieza cuando abrazas el mal deseo y le dices sí a lo que Dios dice no (Santiago 1:14-15).",
        },
        {
          titulo: "Responde con la Palabra",
          texto: "Jesús respondió a las tres tentaciones con la Escritura (Mateo 4:4, 7, 10). Guarda versículos en tu corazón, como 1 Corintios 10:13, para responder igual (Salmos 119:11).",
        },
        {
          titulo: "Ora en ese mismo momento",
          texto: "Jesús manda velar y orar para no entrar en tentación (Mateo 26:41). Pídele fuerzas ahí mismo: Él fue tentado y puede socorrer a los que son tentados (Hebreos 2:18).",
        },
        {
          titulo: "Toma la salida que Dios te da",
          texto: "Dios es fiel y junto con la tentación da la salida (1 Corintios 10:13): apaga la pantalla, cambia de camino o sal corriendo, como José, que dejó su ropa y huyó (Génesis 39:12).",
        },
        {
          titulo: "Resiste y busca a tus hermanos",
          texto: "Sométete a Dios y resiste al diablo, y él huirá de ti (Santiago 4:7). Cuéntale a un hermano de confianza y oren juntos: mejores son dos que uno (Eclesiastés 4:9-10).",
        },
      ],
    },
  ],
  "n1-vida-nueva-3": [
    // Pone lado a lado las dos tristezas que la lección distingue, con David, Pedro y Judas, para que el alumno reconozca cuál lo mueve.
    {
      t: "cuadro",
      titulo: "Dos tristezas: la que te devuelve a Dios y la que te aleja",
      columnas: ["Pregunta", "La tristeza según Dios", "La tristeza del mundo"],
      filas: [
        ["¿Qué produce?", "Arrepentimiento para salvación (2 Corintios 7:10)", "Muerte (2 Corintios 7:10)"],
        [
          "¿Qué hace con el pecado?",
          "Lo confiesa a Dios sin excusas y se aparta de él (Proverbios 28:13; 1 Juan 1:9)",
          "Se queda en el remordimiento, sin buscar el perdón de Dios",
        ],
        [
          "¿Hacia dónde lleva?",
          "De vuelta a Dios, que no desprecia al corazón contrito y humillado (Salmos 51:17)",
          "Lejos de Dios: el enemigo acusa para que te escondas (Apocalipsis 12:10)",
        ],
        [
          "¿Quién la vivió?",
          "David, que reconoció su pecado ante Natán (2 Samuel 12:7-13), y Pedro, que lloró amargamente (Lucas 22:61-62)",
          "Judas, que sintió remordimiento, pero no volvió a Jesús (Mateo 27:3-5)",
        ],
        [
          "¿Cómo terminó?",
          "Dios perdonó a David (2 Samuel 12:13); Jesús restauró a Pedro y le encargó sus ovejas (Juan 21:15-17)",
          "Sin volver a Jesús, Judas terminó en muerte (Mateo 27:5)",
        ],
      ],
    },
  ],
  "n1-vida-nueva-4": [
    // El objetivo de la lección pide pasos concretos para perdonar; el esquema ordena lo que enseña y pone primero que perdonar no obliga a quedarse en peligro.
    {
      t: "pasos",
      titulo: "Perdonar y buscar la paz, paso a paso",
      pasos: [
        {
          titulo: "Si hay peligro, protégete primero",
          texto: "Ante el abuso o el maltrato, pide ayuda y ponte a salvo: perdonar no te obliga a quedarte en peligro (Proverbios 22:3) ni borra las consecuencias legales de un delito (Romanos 13:4).",
        },
        {
          titulo: "Recuerda cuánto te perdonó Dios",
          texto: "Perdonamos como Dios nos perdonó en Cristo (Efesios 4:32). Al siervo de la parábola le perdonaron diez mil talentos, y él no quiso perdonar cien denarios (Mateo 18:23-35).",
        },
        {
          titulo: "Reconoce el daño y el dolor",
          texto: "Perdonar no es decir que lo malo estuvo bien ni negar el dolor. Cuéntale a Dios en oración lo que pasó y cuánto te dolió (Salmos 62:8).",
        },
        {
          titulo: "Decide no cobrar la deuda",
          texto: "Renuncia a vengarte y deja la justicia en manos de Dios (Romanos 12:19). Quita de ti la amargura, el enojo y la ira (Efesios 4:31).",
        },
        {
          titulo: "Ora por quien te hirió",
          texto: "Jesús manda bendecir a los que nos maldicen y orar por los que nos ultrajan y nos persiguen (Mateo 5:44).",
        },
        {
          titulo: "Busca la paz en lo que dependa de ti",
          texto: "Si es posible y seguro, procura la paz (Romanos 12:18): pide perdón si también ofendiste. La confianza no siempre vuelve de inmediato: se reconstruye con el tiempo.",
        },
        {
          titulo: "Renueva la decisión cuando duela",
          texto: "Si vuelve el recuerdo, entrégale otra vez a Dios la deuda: perdonar puede ser una decisión que se renueva. Si lo necesitas, busca consejería en tu iglesia.",
        },
      ],
    },
  ],
  // Compartir mi fe
  "n1-compartir-fe-2": [
    // Pone lado a lado el modelo de Pablo y el testimonio del alumno, para que prepare el suyo parte por parte y lo cierre con una invitación.
    {
      t: "cuadro",
      titulo: "El testimonio en tres partes y su cierre: Pablo y tú",
      columnas: ["Momento", "Pablo ante Agripa (Hechos 26)", "Tu testimonio"],
      filas: [
        [
          "Antes",
          "Perseguía a los creyentes y hacía muchas cosas contra el nombre de Jesús (Hechos 26:9-11).",
          "Cómo era tu vida sin Cristo y qué te faltaba, sin hacer ver el pecado como algo atractivo (Efesios 5:12).",
        ],
        [
          "El encuentro",
          "En el camino a Damasco, una luz del cielo lo rodeó y oyó la voz de Jesús (Hechos 26:12-16).",
          "Cómo oíste el evangelio, cómo te arrepentiste y creíste en Jesús.",
        ],
        [
          "Después",
          "No fue rebelde a la visión celestial y anunció que se arrepintiesen y se convirtiesen a Dios (Hechos 26:19-20).",
          "Qué cambió en tu vida: el perdón, la paz y la esperanza que tienes ahora.",
        ],
        [
          "El cierre",
          "Deseaba que todos los que lo oían llegaran a ser como él (Hechos 26:29).",
          "Una invitación a conocer a Jesús. Todo en unos tres minutos, con palabras sencillas y hablando más de Jesús que de ti.",
        ],
      ],
    },
  ],
  "n1-compartir-fe-3": [
    // Reúne en orden las cuatro verdades, sus versículos y la invitación, para practicar la conversación completa con la Biblia abierta.
    {
      t: "pasos",
      titulo: "El evangelio en 5 minutos, paso a paso",
      pasos: [
        {
          titulo: "Dios te ama",
          texto: "Lee Juan 3:16 con la persona: Dios la ama y quiere darle vida eterna. Explícalo con palabras sencillas y pregúntale si lo entiende.",
        },
        {
          titulo: "El pecado nos separa de Dios",
          texto: "Lee Romanos 3:23 y 6:23: todos pecaron, y la paga del pecado es muerte; pero la dádiva de Dios es vida eterna en Cristo Jesús.",
        },
        {
          titulo: "Cristo murió y resucitó por nosotros",
          texto: "Lee Romanos 5:8: Cristo murió por nosotros siendo aún pecadores. Y según 1 Corintios 15:3-4, fue sepultado y resucitó al tercer día.",
        },
        {
          titulo: "Recibirlo por la fe",
          texto: "Lee Hechos 3:19 y Romanos 10:9-10: hay que arrepentirse, creer en el corazón y confesar con la boca que Jesús es el Señor.",
        },
        {
          titulo: "Invitar sin presionar",
          texto: "Si la persona quiere recibir a Jesús, guíala en una oración sencilla. Lo que salva es la fe sincera, no las palabras exactas. Nunca presiones: el Espíritu Santo es quien convence (Juan 16:8).",
        },
        {
          titulo: "Si todavía no quiere",
          texto: "Respeta su decisión, sigue siendo su amigo y sigue orando por ella. Uno planta, otro riega, pero el crecimiento lo da Dios (1 Corintios 3:6).",
        },
      ],
    },
  ],
  "n1-compartir-fe-4": [
    // Une la oración, el ejemplo de Andrés y el acompañamiento en un solo camino que se repite, como pide 2 Timoteo 2:2.
    {
      t: "pasos",
      titulo: "Orar, traer y acompañar: el ciclo del discípulo",
      pasos: [
        {
          titulo: "Ora por nombre",
          texto: "Ora cada día por las personas de tu lista: que Dios les abra los ojos y que pongan su confianza en Él, porque quiere que todos sean salvos (1 Timoteo 2:1-4).",
        },
        {
          titulo: "Pide una puerta abierta",
          texto: "Pide a Dios la oportunidad y las palabras, como Pablo pedía que oraran para que el Señor abriera puerta para la palabra (Colosenses 4:3-4).",
        },
        {
          titulo: "Tráelo a Jesús, como Andrés",
          texto: "Andrés buscó a su hermano Simón y lo trajo a Jesús (Juan 1:40-42). Nunca sabes lo que Dios hará con la persona que traes.",
        },
        {
          titulo: "Acompáñalo desde la primera semana",
          texto: "Llámalo o escríbele, invítalo a la iglesia y siéntate con él. Lean juntos el Evangelio de Juan y oren juntos (Marcos 3:14; 1 Tesalonicenses 2:7-8).",
        },
        {
          titulo: "Anímalo a dar los siguientes pasos",
          texto: "Anímalo a bautizarse y a empezar el Nivel 1 de esta academia, y preséntale a tu pastor y a otros hermanos.",
        },
        {
          titulo: "Que él acompañe a otros",
          texto: "Pablo pidió a Timoteo encargar lo aprendido a hombres fieles que enseñaran también a otros (2 Timoteo 2:2). El que hoy es acompañado, mañana acompañará a otro.",
        },
      ],
    },
  ],
  // Panorama del Antiguo Testamento
  "n2-panorama-at-1": [
    // Pone en una tabla los 39 libros con su sección y su tema, también los que la lección resume como de Josué a Ester y de Oseas a Malaquías.
    {
      t: "cuadro",
      titulo: "Las cinco secciones del Antiguo Testamento (39 libros)",
      columnas: ["Sección", "Libros", "De qué tratan"],
      filas: [
        [
          "La Ley o Pentateuco (5)",
          "Génesis, Éxodo, Levítico, Números y Deuteronomio",
          "Los comienzos y el pacto de Dios con Israel",
        ],
        [
          "Libros históricos (12)",
          "Josué, Jueces, Rut, 1 y 2 Samuel, 1 y 2 Reyes, 1 y 2 Crónicas, Esdras, Nehemías y Ester",
          "La vida de Israel en su tierra, el reino, la caída y el regreso del exilio",
        ],
        [
          "Libros poéticos (5)",
          "Job, Salmos, Proverbios, Eclesiastés y Cantares",
          "La oración, la adoración y la sabiduría del pueblo de Dios",
        ],
        [
          "Profetas mayores (5)",
          "Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel",
          "Mensajes de Dios: llamado a volver a Él, juicio y esperanza; se llaman mayores por lo largo de sus libros",
        ],
        [
          "Profetas menores (12)",
          "Oseas, Joel, Amós, Abdías, Jonás, Miqueas, Nahum, Habacuc, Sofonías, Hageo, Zacarías y Malaquías",
          "El mismo mensaje en libros más cortos, no menos importantes: Miqueas anunció dónde nacería el Mesías",
        ],
      ],
    },
  ],
  "n2-panorama-at-4": [
    // La lección recorre casi mil años de historia; la línea ordena con sus fechas cada momento, de Josué a la caída de Jerusalén.
    {
      t: "linea",
      titulo: "De la conquista a la caída de Jerusalén",
      eventos: [
        {
          fecha: "c. 1400 a. C.",
          texto: "Josué guía a Israel en la conquista de la tierra prometida (otros la fechan en el siglo XIII a. C.).",
          ref: "Josué 11:23",
        },
        {
          fecha: "Hasta c. 1050 a. C.",
          texto: "Tiempo de los jueces, como Débora, Gedeón y Sansón. En esos días vive Rut, bisabuela del rey David.",
          ref: "Jueces 2:16",
        },
        {
          fecha: "c. 1050 a. C.",
          texto: "Samuel, el último juez, unge a Saúl como primer rey; pero Saúl desobedece a Dios.",
          ref: "1 Samuel 10:1",
        },
        {
          fecha: "c. 1000 a. C.",
          texto: "David, el rey que Dios eligió, hace de Jerusalén su capital, y Dios le promete un trono eterno.",
          ref: "2 Samuel 7:16",
        },
        {
          fecha: "c. 966 a. C.",
          texto: "Salomón, hijo de David, comienza a construir el templo de Jerusalén.",
          ref: "1 Reyes 6:1",
        },
        {
          fecha: "c. 930 a. C.",
          texto: "Salomón se aparta de Dios en su vejez; tras su muerte, el reino se divide: Israel al norte y Judá al sur.",
          ref: "1 Reyes 12:19-20",
        },
        {
          fecha: "722 a. C.",
          texto: "Asiria toma Samaria: cae el reino del norte y su pueblo es llevado cautivo.",
          ref: "2 Reyes 17:6",
        },
        {
          fecha: "c. 622 a. C.",
          texto: "En el reinado de Josías se halla en el templo el libro de la ley, y él quita los ídolos; aun así, Judá vuelve a apartarse.",
          ref: "2 Reyes 22:8",
        },
        {
          fecha: "586 a. C.",
          texto: "Babilonia destruye Jerusalén y su templo, y lleva cautiva a gran parte del pueblo de Judá.",
          ref: "2 Reyes 25:9",
        },
      ],
    },
  ],
  "n2-panorama-at-6": [
    // Ordena con fechas el exilio y el regreso, y ubica a Ester entre el templo terminado y la llegada de Esdras.
    {
      t: "linea",
      titulo: "Del exilio en Babilonia al último profeta",
      eventos: [
        {
          fecha: "c. 605 a. C.",
          texto: "Nabucodonosor lleva a Babilonia a Daniel y a otros jóvenes de Judá.",
          ref: "Daniel 1:1-6",
        },
        {
          fecha: "597 a. C.",
          texto: "El rey Joaquín y miles de judíos van cautivos a Babilonia; entre ellos, Ezequiel, que allí será profeta.",
          ref: "Ezequiel 1:1-3",
        },
        {
          fecha: "586 a. C.",
          texto: "Babilonia destruye Jerusalén y el templo; pero Dios ya había prometido por Jeremías traer de vuelta a su pueblo.",
          ref: "2 Reyes 25:9",
        },
        {
          fecha: "538 a. C.",
          texto: "Ciro, rey de Persia, deja volver a los judíos para reconstruir el templo: se cumple la palabra de Jeremías.",
          ref: "Esdras 1:1-3",
        },
        {
          fecha: "c. 516 a. C.",
          texto: "Con el ánimo de los profetas Hageo y Zacarías, el pueblo termina de reconstruir el templo.",
          ref: "Esdras 6:14-15",
        },
        {
          fecha: "c. 478 a. C.",
          texto: "Ester llega a ser reina de Persia; años después arriesga su vida para salvar a su pueblo de un decreto de muerte.",
          ref: "Ester 2:17",
        },
        {
          fecha: "c. 458 a. C.",
          texto: "Esdras, escriba y sacerdote, llega a Jerusalén y enseña la ley de Dios al pueblo.",
          ref: "Esdras 7:8-10",
        },
        {
          fecha: "c. 445 a. C.",
          texto: "Nehemías, copero del rey de Persia, dirige la reconstrucción de los muros: se terminan en 52 días.",
          ref: "Nehemías 6:15",
        },
        {
          fecha: "c. 430 a. C.",
          texto: "Malaquías, el último profeta, anuncia al mensajero que preparará el camino; siguen unos 400 años sin otro libro de la Escritura.",
          ref: "Malaquías 3:1",
        },
      ],
    },
  ],
  // Panorama del Nuevo Testamento
  "n2-panorama-nt-1": [
    // La lección recorre cuatro siglos en pocas líneas; la línea de tiempo ordena los imperios y muestra cómo Dios preparó el cumplimiento del tiempo.
    {
      t: "linea",
      titulo: "Entre los dos testamentos: Dios prepara el camino",
      eventos: [
        {
          fecha: "Siglo V a. C.",
          texto: "Malaquías, el último profeta del Antiguo Testamento, anuncia al mensajero que preparará el camino. Gobierna Persia.",
          ref: "Malaquías 3:1",
        },
        {
          fecha: "334-323 a. C.",
          texto: "Alejandro Magno conquista el Imperio persa y extiende el griego, el idioma en que se escribirá el Nuevo Testamento.",
        },
        {
          fecha: "Siglo III a. C.",
          texto: "En Alejandría de Egipto, los judíos comienzan a traducir el Antiguo Testamento al griego: la versión de los Setenta.",
        },
        { fecha: "63 a. C.", texto: "El general romano Pompeyo toma Jerusalén, y Judea queda bajo el poder de Roma." },
        {
          fecha: "27 a. C.-14 d. C.",
          texto: "Gobierna Augusto, el primer emperador romano: con los caminos y la paz de Roma, el evangelio podrá viajar rápido.",
          ref: "Lucas 2:1",
        },
        {
          fecha: "c. 6-4 a. C.",
          texto: "Jesús nace en Belén, en días del rey Herodes: Dios envía a su Hijo en el cumplimiento del tiempo.",
          ref: "Mateo 2:1",
        },
      ],
    },
  ],
  "n2-panorama-nt-2": [
    // El objetivo es comparar los cuatro retratos de Jesús: en columnas se ve de un vistazo el énfasis de cada evangelio y por qué tres son sinópticos.
    {
      t: "cuadro",
      titulo: "Los cuatro evangelios, lado a lado",
      columnas: ["Evangelio", "Presenta a Jesús como", "Rasgo propio", "Texto clave"],
      filas: [
        [
          "Mateo",
          "El Rey prometido, el hijo de David",
          "Sinóptico. Mateo, el cobrador de impuestos, escribe sobre todo para judíos: en Jesús se cumplen las Escrituras",
          "Mateo 1:1",
        ],
        [
          "Marcos",
          "El Siervo que vino a dar su vida en rescate por muchos",
          "Sinóptico. Es el más corto y cuenta la historia con prisa y con acción",
          "Marcos 10:45",
        ],
        [
          "Lucas",
          "El Salvador de todos, que busca a los perdidos, a los pobres y a los marginados",
          "Sinóptico. Lucas, el médico, lo investigó todo con cuidado y lo escribió por orden para Teófilo",
          "Lucas 19:10",
        ],
        [
          "Juan",
          "El Hijo de Dios, el Verbo eterno que se hizo carne",
          "No es sinóptico. Juan, el discípulo amado, cuenta otras señales y largos discursos, sobre todo en Jerusalén",
          "Juan 20:31",
        ],
      ],
    },
  ],
  "n2-panorama-nt-4": [
    // Hechos abarca unos treinta años; las fechas aproximadas ubican Pentecostés, los viajes de Pablo y su llegada a Roma dentro del plan de Hechos 1:8.
    {
      t: "linea",
      titulo: "De Jerusalén a Roma: el evangelio en marcha",
      eventos: [
        {
          fecha: "c. 30 o 33 d. C.",
          texto: "En Jerusalén, el día de Pentecostés, viene el Espíritu Santo, nace la iglesia y unas tres mil personas son bautizadas.",
          ref: "Hechos 2:41",
        },
        {
          fecha: "c. 34 d. C.",
          texto: "Tras la muerte de Esteban, la persecución esparce a los creyentes; Saulo, el perseguidor, se encuentra con Jesús camino a Damasco.",
          ref: "Hechos 9:3-5",
        },
        {
          fecha: "c. 46-48 d. C.",
          texto: "Primer viaje: la iglesia de Antioquía envía a Bernabé y a Saulo, llamado también Pablo, a Chipre y a Asia Menor.",
          ref: "Hechos 13:2-3",
        },
        {
          fecha: "c. 49 d. C.",
          texto: "Concilio de Jerusalén: Pedro recuerda lo que Dios hizo con Cornelio; los gentiles son salvos por la gracia, sin exigirles la ley de Moisés.",
          ref: "Hechos 15:7-11",
        },
        {
          fecha: "c. 49-52 d. C.",
          texto: "Segundo viaje: el evangelio pasa a Europa y nacen iglesias en Filipos, Tesalónica y Corinto.",
          ref: "Hechos 16:9-10",
        },
        {
          fecha: "c. 52-57 d. C.",
          texto: "Tercer viaje: Pablo enseña unos tres años en Éfeso y vuelve a visitar las iglesias de Macedonia y Grecia.",
          ref: "Hechos 20:31",
        },
        {
          fecha: "c. 57-59 d. C.",
          texto: "Pablo es arrestado en Jerusalén y pasa dos años preso en Cesarea; allí apela a César.",
          ref: "Hechos 25:11",
        },
        {
          fecha: "c. 60-62 d. C.",
          texto: "Preso en Roma, en una casa alquilada, Pablo predica el reino de Dios con toda libertad durante dos años.",
          ref: "Hechos 28:30-31",
        },
      ],
    },
  ],
  // Doctrinas fundamentales
  "n2-doctrinas-3": [
    // La lección no trae resumen al final: los pasos ordenan los artículos 5 y 6 como se explica el evangelio a otra persona y preparan la pregunta escrita sobre cómo se salva una persona.
    {
      t: "pasos",
      titulo: "Cómo explicar la salvación con la Biblia",
      pasos: [
        {
          titulo: "La dignidad: creados a imagen de Dios",
          texto: "Dios creó al ser humano, hombre y mujer, a su imagen (Génesis 1:27). Toda persona lleva esa imagen y tiene una dignidad única.",
        },
        {
          titulo: "El problema: todos pecaron",
          texto: "Por la desobediencia de Adán el pecado entró en el mundo, y con él la muerte (Romanos 5:12). Todos pecaron y están separados de Dios (Romanos 3:23): nadie puede salvarse a sí mismo.",
        },
        {
          titulo: "El regalo: por gracia, no por obras",
          texto: "La salvación es un regalo de Dios: se recibe por gracia, por medio de la fe en Cristo, y no por obras, para que nadie pueda jactarse (Efesios 2:8-9).",
        },
        {
          titulo: "La respuesta: arrepentirse y creer en Cristo",
          texto: "Quien se arrepiente y cree en Cristo es perdonado, justificado y adoptado como hijo de Dios (Hechos 3:19; Romanos 10:9-10; Juan 1:12).",
        },
        {
          titulo: "Un nuevo comienzo: nacer de nuevo",
          texto: "La salvación no es una mejora de la vida vieja: Jesús enseñó que quien no nace de nuevo no puede ver el reino de Dios (Juan 3:3).",
        },
        {
          titulo: "La seguridad: las promesas de Dios",
          texto: "El creyente puede saber que tiene vida eterna, apoyado en lo que Dios escribió y no en sus sentimientos (1 Juan 5:13), y la Biblia lo llama a permanecer firme en la fe (Hebreos 3:14).",
        },
      ],
    },
  ],
  "n2-doctrinas-4": [
    // Es la lección más cargada, con cuatro artículos y dos puntos por confirmar, y no trae resumen: el cuadro separa de un vistazo lo que creemos de lo que queda por confirmar.
    {
      t: "cuadro",
      titulo: "Los cuatro artículos sobre el Espíritu Santo",
      columnas: ["Artículo", "Lo que creemos", "Base bíblica", "Punto por confirmar"],
      filas: [
        [
          "Artículo 4: El Espíritu Santo",
          "Es una persona divina, no una fuerza: convence de pecado, hace nacer de nuevo, vive en el creyente y le da seguridad.",
          "Juan 16:7-8; Romanos 8:16",
          "Ninguno",
        ],
        [
          "Artículo 9: El bautismo en el Espíritu",
          "Es una promesa para todo creyente, distinta del nuevo nacimiento, que da poder para testificar y servir.",
          "Hechos 1:8; Hechos 2:4; Hechos 2:38-39",
          "Si hablar en lenguas es la señal física inicial y necesaria, o una manifestación que se espera sin ser la única señal.",
        ],
        [
          "Artículo 10: Los dones del Espíritu",
          "Siguen vigentes: son para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, orden y bajo la Palabra.",
          "1 Corintios 12:7; 1 Corintios 14:40",
          "Ninguno",
        ],
        [
          "Artículo 11: La sanidad divina",
          "Dios sana hoy en respuesta a la oración de fe; buscar su sanidad no se opone a recibir atención médica.",
          "Santiago 5:14-15",
          "Si la sanidad está provista en la expiación de Cristo, o se presenta solo como una promesa en respuesta a la oración.",
        ],
      ],
    },
  ],
  "n2-doctrinas-5": [
    // La lección explica por separado las dos ordenanzas y no trae resumen: el cuadro las compara lado a lado, que es lo que pide la pregunta escrita sobre el bautismo y la Santa Cena.
    {
      t: "cuadro",
      titulo: "Las dos ordenanzas: el bautismo en agua y la Santa Cena",
      columnas: ["Aspecto", "El bautismo en agua", "La Santa Cena"],
      filas: [
        [
          "Qué es",
          "Un testimonio de que el creyente murió al pecado y resucitó a una vida nueva.",
          "Un memorial de la muerte del Señor, y comunión con él y con su pueblo.",
        ],
        [
          "Quiénes participan",
          "Los que se arrepintieron y creyeron en Cristo.",
          "Los creyentes que se examinan a sí mismos.",
        ],
        [
          "Cómo se hace",
          "Por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo.",
          "Se come el pan y se bebe la copa en memoria del Señor.",
        ],
        [
          "Hacia dónde mira",
          "A la vida nueva: como Cristo resucitó, el creyente anda en vida nueva.",
          "A la cruz y a su venida: anuncia la muerte del Señor hasta que él venga.",
        ],
        ["Base bíblica", "Romanos 6:4; Mateo 28:19", "1 Corintios 11:23-26; 1 Corintios 11:28"],
      ],
    },
  ],
  // Disciplinas espirituales
  "n2-disciplinas-1": [
    // Pone lado a lado la distinción central de la lección: las disciplinas como medios de gracia y no como méritos.
    {
      t: "cuadro",
      titulo: "La disciplina que nace de la gracia y el legalismo",
      columnas: ["Aspecto", "La disciplina que nace de la gracia", "El legalismo"],
      filas: [
        [
          "El motivo",
          "Conocer a Dios y estar con Él, porque ya nos ama en Cristo",
          "Ganar el amor de Dios o ser aceptados por Él",
        ],
        [
          "La salvación",
          "Es por gracia, por medio de la fe, y no por obras (Efesios 2:8-9)",
          "Se piensa que se gana cumpliendo reglas",
        ],
        [
          "Delante de quién",
          "Delante del Padre, que ve en lo secreto (Mateo 6:6)",
          "Delante de la gente, para aparentar (Mateo 6:1)",
        ],
        [
          "Quién nos cambia",
          "El Espíritu del Señor, que nos transforma de gloria en gloria (2 Corintios 3:18)",
          "Solo el esfuerzo propio, sin depender de Dios",
        ],
        [
          "El modelo",
          "Jesús, que se apartaba a lugares desiertos para orar (Lucas 5:16)",
          "Los fariseos, que hacían sus obras para ser vistos (Mateo 23:5)",
        ],
      ],
    },
  ],
  "n2-disciplinas-2": [
    // Convierte la definición de meditación bíblica en un método que el alumno practica con el mismo salmo de la lección.
    {
      t: "pasos",
      titulo: "Cómo meditar un pasaje: ejemplo con Salmos 1:1-3",
      pasos: [
        {
          titulo: "Lee despacio",
          texto: "Lee Salmos 1:1-3 dos o tres veces, sin prisa, y repite las frases que más te llamen la atención.",
        },
        {
          titulo: "Observa lo que dice",
          texto: "¿Quién es bienaventurado? El que no anda en el consejo de los malos y tiene su delicia en la ley de Jehová. ¿A qué se parece? A un árbol junto a corrientes de aguas.",
        },
        {
          titulo: "Pregunta qué enseña de Dios",
          texto: "Dios bendice al que recibe su Palabra: como el agua sostiene al árbol, ella le da estabilidad y fruto a su tiempo.",
        },
        {
          titulo: "Pregunta qué te pide a ti",
          texto: "Te pide deleitarte en su Palabra, meditar en ella de día y de noche y no seguir el consejo de quienes te alejan de Dios.",
        },
        {
          titulo: "Guárdalo en el corazón",
          texto: "Memoriza una frase del pasaje y repítela durante el día, para no pecar contra Dios (Salmos 119:11).",
        },
        {
          titulo: "Obedece hoy",
          texto: "Elige una acción concreta para hoy: la meditación bíblica llena la mente con la Palabra para hacer lo que está escrito (Josué 1:8).",
        },
      ],
    },
    // comprobado: oEmbed de YouTube respondió: título "Salmo 1 • Los bienaventurados y los impíos", canal "Proyecto Biblia" (6:05; trata el árbol y la paja del Salmo 1 y aquello en lo que meditamos)
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=JKssLyqHhYA",
      titulo: "Salmo 1: los bienaventurados y los impíos",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n2-disciplinas-3": [
    // comprobado: oEmbed de YouTube respondió: título "Cómo NO debes de hacer oraciones, dar ni ayunar", canal "Proyecto Biblia" (7:04). Es el episodio 6 de El sermón del monte, Advertencias sobre las prácticas religiosas (bibleproject.com/es/videos/advertencias-sobre-las-practicas-religiosas/); según su guion oficial (SOTM06) trata dar, orar y ayunar en lo secreto (Mateo 6:1-6, 16-18) y deja el Padre Nuestro para el episodio 7
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=DXvB7LFS3AI",
      titulo: "Advertencias sobre las prácticas religiosas (El sermón del monte)",
      fuente: "Proyecto Biblia",
      minutos: 7,
    },
  ],
  "n2-disciplinas-5": [
    // La lección lo resume en una frase; los pasos lo vuelven una práctica diaria que une el silencio, la oración y el diario.
    {
      t: "pasos",
      titulo: "El examen del corazón al final del día, paso a paso",
      pasos: [
        {
          titulo: "Apártate unos minutos",
          texto: "Busca un lugar tranquilo y deja el teléfono a un lado, como Jesús, que buscaba un lugar apartado para orar (Marcos 1:35).",
        },
        {
          titulo: "Aquieta tu corazón ante Dios",
          texto: "Recuerda que estás delante de Él. El silencio bíblico no es vaciar la mente, sino estar atento a Dios (Salmos 46:10).",
        },
        {
          titulo: "Pídele que te examine",
          texto: "Ora como David: pide a Dios que conozca tu corazón y vea si hay en ti camino de perversidad (Salmos 139:23-24).",
        },
        {
          titulo: "Repasa tu día y da gracias",
          texto: "Recorre lo que viviste hoy y da gracias a Dios por lo bueno: su voluntad es que demos gracias en todo (1 Tesalonicenses 5:18).",
        },
        {
          titulo: "Confiesa lo malo",
          texto: "Nombra delante de Dios lo que hiciste mal y confía en que Él perdona al que confiesa (1 Juan 1:9).",
        },
        {
          titulo: "Pide su guía para mañana",
          texto: "Presenta a Dios lo que viene y pídele que te guíe en el camino eterno (Salmos 139:24).",
        },
        {
          titulo: "Escríbelo en tu diario",
          texto: "Anota lo que Dios te enseñó, tus oraciones y sus respuestas. Así recordarás sus obras, como el salmista (Salmos 77:11-12).",
        },
      ],
    },
  ],
  "n2-disciplinas-6": [
    // comprobado: oEmbed de YouTube respondió: título "Esta mentira puede impedirte vivir generosamente", canal "Proyecto Biblia" (5:38; video temático Generosidad: Dios como anfitrión generoso frente a la mentalidad de escasez)
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=ersM5W_hVeY",
      titulo: "Generosidad",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  // El Sermón del monte
  "n2-sermon-monte-2": [
    // La lección reparte las bienaventuranzas en dos listas y no da todas sus promesas; el cuadro junta cada rasgo, su sentido y su promesa para repasarlos de un vistazo.
    {
      t: "cuadro",
      titulo: "Las bienaventuranzas: el retrato del discípulo (Mateo 5:3-12)",
      columnas: ["Bienaventurados", "Qué significa", "La promesa"],
      filas: [
        [
          "Los pobres en espíritu (5:3)",
          "Reconocen que no tienen nada que ofrecer a Dios y dependen de su gracia",
          "De ellos es el reino de los cielos",
        ],
        ["Los que lloran (5:4)", "Se duelen por su pecado y por el dolor del mundo", "Recibirán consolación"],
        [
          "Los mansos (5:5)",
          "Tienen la fuerza bajo el control de Dios y no se imponen por la fuerza",
          "Recibirán la tierra por heredad",
        ],
        [
          "Los que tienen hambre y sed de justicia (5:6)",
          "Anhelan vivir como Dios manda y ver su justicia en el mundo",
          "Serán saciados",
        ],
        [
          "Los misericordiosos (5:7)",
          "Perdonan y ayudan, porque han recibido misericordia",
          "Alcanzarán misericordia",
        ],
        ["Los de limpio corazón (5:8)", "Aman a Dios con sinceridad, sin doblez", "Verán a Dios"],
        [
          "Los pacificadores (5:9)",
          "Buscan la reconciliación entre las personas y con Dios",
          "Serán llamados hijos de Dios",
        ],
        [
          "Los perseguidos por causa de la justicia (5:10-12)",
          "Sufren por vivir como Dios manda y por causa de Cristo, como sufrieron los profetas",
          "De ellos es el reino de los cielos, y su galardón es grande en los cielos",
        ],
      ],
    },
  ],
  "n2-sermon-monte-4": [
    // La lección recorre por partes las seis veces que Jesús responde con autoridad propia; el cuadro las pone lado a lado para ver cómo lleva cada mandamiento al corazón.
    {
      t: "cuadro",
      titulo: "Lo que fue dicho y lo que enseña Jesús (Mateo 5:21-48)",
      columnas: ["Lo que fue dicho", "Lo que enseña Jesús", "Lo que hace el discípulo"],
      filas: [
        [
          "No matarás (5:21-26)",
          "El enojo y el desprecio contra el hermano ya son culpables delante de Dios",
          "Se reconcilia con su hermano antes de presentar su ofrenda",
        ],
        [
          "No cometerás adulterio (5:27-30)",
          "El adulterio empieza en la mirada y en el deseo del corazón",
          "Cuida sus ojos y su corazón, y corta con firmeza lo que lo hace caer",
        ],
        [
          "Dar carta de divorcio (5:31-32)",
          "Defiende el pacto del matrimonio (lo amplía la materia Familia y relaciones)",
          "Honra el matrimonio como un pacto de fidelidad para toda la vida",
        ],
        [
          "No jurar en falso y cumplir los juramentos (5:33-37)",
          "No hace falta jurar: la palabra del discípulo es verdad",
          "Dice sí cuando es sí y no cuando es no",
        ],
        [
          "Ojo por ojo, y diente por diente (5:38-42)",
          "Esa ley ponía límite al castigo de los jueces; Jesús prohíbe la venganza personal",
          "No devuelve golpe por golpe y deja el juicio a Dios; ante el abuso, busca protección",
        ],
        [
          "Amar al prójimo y aborrecer al enemigo (5:43-48)",
          "Amar también a los enemigos, como el Padre, que hace salir su sol sobre malos y buenos",
          "Bendice, hace bien y ora por quienes le hacen daño",
        ],
      ],
    },
  ],
  "n2-sermon-monte-5": [
    // La lección trata la piedad, el tesoro, el dinero y la ansiedad en párrafos separados; el cuadro muestra de un vistazo que todo Mateo 6 contrapone vivir para ser vistos o para las cosas y vivir para el Padre.
    {
      t: "cuadro",
      titulo: "Mateo 6: lo que Jesús advierte y lo que pide",
      columnas: ["Tema", "Lo que Jesús advierte", "Lo que Jesús pide"],
      filas: [
        [
          "Dar limosna (6:1-4)",
          "Dar para ser alabados por los hombres, como quien toca trompeta",
          "Dar en secreto: el Padre que ve en lo secreto es quien recompensa",
        ],
        [
          "Orar (6:5-15)",
          "Orar para ser vistos o con vanas repeticiones",
          "Orar al Padre en lo secreto, poniendo primero su nombre, su reino y su voluntad",
        ],
        [
          "Ayunar (6:16-18)",
          "Demudar el rostro para mostrar a los demás que se ayuna",
          "Ayunar sin aparentar, delante del Padre que está en secreto",
        ],
        [
          "El tesoro (6:19-21)",
          "Hacer tesoros en la tierra, donde la polilla y el orín corrompen",
          "Hacer tesoros en el cielo, porque donde está el tesoro está el corazón",
        ],
        [
          "Los dos señores (6:24)",
          "Servir a las riquezas y vivir para el dinero",
          "Servir a Dios y usar el dinero para servirle a Él y al prójimo",
        ],
        [
          "El afán (6:25-34)",
          "Afanarse por la comida, la bebida y el vestido",
          "Confiar en el Padre, que cuida las aves y los lirios, y buscar primero su reino",
        ],
      ],
    },
  ],
  // Mayordomía cristiana
  "n2-mayordomia-3": [
    // Pone lado a lado a los tres siervos para ver de un vistazo que Dios premia la fidelidad, no la cantidad.
    {
      t: "cuadro",
      titulo: "Los tres siervos de la parábola de los talentos",
      columnas: ["Siervo", "Qué hizo", "Qué le dijo el señor", "Qué enseña"],
      filas: [
        [
          "El que recibió cinco talentos",
          "Negoció con ellos y ganó otros cinco (Mateo 25:16, 20)",
          "Lo elogió como siervo bueno y fiel, le confió más y lo invitó a entrar en su gozo (Mateo 25:21)",
          "El fiel en lo poco recibe más responsabilidad y el gozo de su señor",
        ],
        [
          "El que recibió dos talentos",
          "Hizo lo mismo y ganó otros dos (Mateo 25:17, 22)",
          "Le dijo las mismas palabras que al primero (Mateo 25:23)",
          "Con menos, recibió el mismo elogio: Dios premia la fidelidad, no la cantidad",
        ],
        [
          "El que recibió un talento",
          "Por miedo, lo escondió en la tierra (Mateo 25:18, 25)",
          "Lo llamó siervo malo y negligente, y mandó quitarle el talento (Mateo 25:26-28)",
          "Su problema no fue tener poco, sino no usarlo: quien conoce la bondad de Dios no entierra lo recibido",
        ],
      ],
    },
  ],
  "n2-mayordomia-4": [
    // Ayuda a distinguir el dar bíblico del evangelio de la prosperidad, que es lo que más confunde en este tema.
    {
      t: "cuadro",
      titulo: "Dar como enseña la Biblia frente al evangelio de la prosperidad",
      columnas: ["Pregunta", "Dar como enseña la Biblia", "El evangelio de la prosperidad"],
      filas: [
        [
          "¿Qué se da?",
          "El diezmo, que aparece antes de la ley, en la ley y en las palabras de Jesús, y ofrendas voluntarias",
          "Dinero, con la idea de que obliga a Dios a hacernos ricos",
        ],
        [
          "¿Por qué se da?",
          "Por gratitud, por fe y por amor, porque Dios nos dio primero a su Hijo",
          "Por interés: se da para recibir más, como quien hace un negocio con Dios",
        ],
        [
          "¿Cómo se da?",
          "Con orden, en proporción a lo recibido y con alegría (1 Corintios 16:2; 2 Corintios 9:7)",
          "Con la mira puesta en la ganancia que se espera recibir a cambio",
        ],
        [
          "¿Para qué se da?",
          "Para sostener la obra de Dios y a sus obreros, y para ayudar a los necesitados (1 Corintios 9:13-14; Gálatas 2:10)",
          "Para enriquecerse, aunque los que quieren enriquecerse caen en tentación y lazo (1 Timoteo 6:9)",
        ],
        [
          "¿Qué hacer?",
          "Dar con alegría y manejar las ofrendas con honradez (2 Corintios 8:21): Dios bendice al generoso, pero no se le compra",
          "No seguirlo: Pablo manda a Timoteo apartarse de los que toman la piedad como fuente de ganancia (1 Timoteo 6:5)",
        ],
      ],
    },
  ],
  "n2-mayordomia-6": [
    // Convierte las prioridades de la lección en un método que el alumno puede seguir para hacer su propio presupuesto.
    {
      t: "pasos",
      titulo: "Un presupuesto sencillo, paso a paso",
      pasos: [
        {
          titulo: "Siéntate y calcula",
          texto: "Antes de gastar, anota lo que entra al mes y lo que tienes que pagar, como el que se sienta primero y calcula los gastos antes de edificar (Lucas 14:28).",
        },
        {
          titulo: "Primero, para Dios",
          texto: "Aparta el diezmo y las ofrendas antes que lo demás, con orden y con alegría (Proverbios 3:9; 1 Corintios 16:2; 2 Corintios 9:7).",
        },
        {
          titulo: "Después, el ahorro",
          texto: "Guarda una parte para las emergencias, aunque sea pequeña, como la hormiga que junta su comida en el tiempo de la siega (Proverbios 6:6-8).",
        },
        {
          titulo: "Cubre las necesidades",
          texto: "Paga la vivienda, la comida, los servicios, el transporte y la salud: así provees para los tuyos (1 Timoteo 5:8).",
        },
        {
          titulo: "Paga las deudas a tiempo",
          texto: "Cumple con lo que debes y no contraigas deudas nuevas para consumir, porque el que toma prestado queda como siervo del que presta (Proverbios 22:7).",
        },
        {
          titulo: "Lo que sobra, para los deseos",
          texto: "Usa lo que quede para lo que deseas, sin gastar más de lo que entra: así el presupuesto le dice al dinero adónde ir.",
        },
        {
          titulo: "Con honradez en todo",
          texto: "Paga los impuestos, no engañes en los negocios y no salgas fiador a la ligera: el dinero manejado con honradez es un testimonio (Romanos 13:7; Proverbios 11:1; 22:26-27).",
        },
      ],
    },
  ],
  // Familia y relaciones
  "n2-familia-1": [
    // comprobado: oEmbed: título "7.º mandamiento: No cometerás adulterio", canal "Proyecto Biblia"
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=HJUrEJKlq1c",
      titulo: "7.º mandamiento: No cometerás adulterio",
      fuente: "Proyecto Biblia",
      minutos: 5,
    },
  ],
  "n2-familia-2": [
    // Pone lado a lado la autoridad que sirve, como Cristo, y el control que domina, que es justo lo que la lección pide distinguir.
    {
      t: "cuadro",
      titulo: "La autoridad que sirve y el control que domina",
      columnas: ["Aspecto", "La autoridad que sirve", "El control que domina"],
      filas: [
        [
          "Su punto de partida",
          "Someterse unos a otros en el temor de Dios (Efesios 5:21)",
          "Exige que lo obedezcan, pero él no se somete a nadie",
        ],
        [
          "Su modelo",
          "Cristo, que amó a la iglesia y se entregó por ella (Efesios 5:25)",
          "Busca mandar más, no servir más",
        ],
        [
          "Su actitud",
          "Servir, cuidar y entregarse, como Jesús al lavar los pies de sus discípulos (Juan 13:14-15)",
          "Controlar, imponerse y humillar",
        ],
        [
          "Sus palabras",
          "Habla con respeto aun en los desacuerdos (Efesios 4:29)",
          "Grita, insulta y menosprecia (Efesios 4:31)",
        ],
        [
          "El trato a la esposa",
          "La honra como coheredera de la gracia de la vida (1 Pedro 3:7)",
          "La trata como inferior o como alguien a quien hay que vigilar",
        ],
        [
          "Las decisiones",
          "Se ponen de acuerdo en el dinero, la crianza y el tiempo",
          "Decide solo y no escucha a su cónyuge",
        ],
        [
          "Su fruto",
          "Un hogar en paz, con confianza y respeto",
          "Miedo y heridas; la violencia física, verbal o sexual es pecado",
        ],
        [
          "Si hay violencia",
          "Nunca la usa: ser cabeza no da permiso para controlar, humillar ni golpear",
          "Quien la sufre busca protección: el pastor, la familia y, si hace falta, las autoridades (Romanos 13:4)",
        ],
      ],
    },
  ],
  "n2-familia-4": [
    // comprobado: oEmbed: título "La soltería no es un castigo", canal "Coalición por el Evangelio" (habla Jeanine Martínez, según la descripción)
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=UJzCKfhC05Q",
      titulo: "La soltería no es un castigo",
      fuente: "Coalición por el Evangelio",
      minutos: 6,
    },
  ],
  "n2-familia-5": [
    // Ordena en pasos lo que la lección enseña para levantarse después de una caída, para que el alumno sepa qué hacer y no se quede en la culpa.
    {
      t: "pasos",
      titulo: "El camino de la restauración después de caer",
      pasos: [
        {
          titulo: "Confesar el pecado a Dios",
          texto: "Sin esconderlo ni excusarlo. Dios es fiel y justo para perdonar y limpiar a quien confiesa su pecado (1 Juan 1:9). Caer no te descalifica para siempre.",
        },
        {
          titulo: "Buscar ayuda pastoral",
          texto: "Contarlo al pastor o a un líder maduro para recibir consejo y oración. Confesarse las faltas y orar unos por otros trae sanidad (Santiago 5:16).",
        },
        {
          titulo: "Romper con lo que te hace caer",
          texto: "Cortar con firmeza la ocasión: aplicaciones, lugares o compañías. José no se quedó a discutir con la tentación: huyó (Génesis 39:12; 1 Corintios 6:18).",
        },
        {
          titulo: "Rendir cuentas a alguien de confianza",
          texto: "Tener a alguien maduro en la fe que te pregunte cómo vas, ore contigo y te ayude a levantarte si tropiezas (Eclesiastés 4:9-10).",
        },
        {
          titulo: "Cuidar los ojos y la mente",
          texto: "Poner límites a lo que miras (Mateo 5:28) y llenar la mente de todo lo verdadero, honesto, justo y puro (Filipenses 4:8).",
        },
        {
          titulo: "Empezar de nuevo con su gracia",
          texto: "Vivir cada día como templo del Espíritu Santo, comprado por precio (1 Corintios 6:19-20). Si vuelves a tropezar, vuelve pronto a Dios y sigue adelante.",
        },
      ],
    },
    // comprobado: oEmbed: título "Cómo guardar tu pureza sexual", canal "Coalición por el Evangelio"
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=5a9F0ujRZOY",
      titulo: "Cómo guardar tu pureza sexual",
      fuente: "Coalición por el Evangelio",
      minutos: 5,
    },
  ],
  "n2-familia-6": [
    // Convierte los consejos de la lección en un camino ordenado para resolver un conflicto en casa, con la base bíblica de cada paso.
    {
      t: "pasos",
      titulo: "Cómo resolver un conflicto en la familia",
      pasos: [
        {
          titulo: "No dejar que el enojo dure",
          texto: "Aun enojados, no pecar: el enojo no debe durar hasta el otro día ni dar lugar al diablo (Efesios 4:26-27). Buscar el momento de hablar pronto y con calma.",
        },
        {
          titulo: "Escuchar antes de responder",
          texto: "Ser pronto para oír, lento para hablar y lento para enojarse (Santiago 1:19). Escuchar hasta entender lo que el otro siente.",
        },
        {
          titulo: "Hablar del problema, no atacar a la persona",
          texto: "Decir lo que duele sin gritos, insultos ni reproches del pasado, solo con palabras que edifiquen (Efesios 4:29).",
        },
        {
          titulo: "Pedir perdón sin excusas",
          texto: "Reconocer la propia parte sin culpar al otro ni justificarse. Jesús pide reconciliarse con el hermano antes de presentar la ofrenda (Mateo 5:23-24).",
        },
        {
          titulo: "Perdonar de verdad",
          texto: "Perdonar de la manera que Cristo nos perdonó (Colosenses 3:13), sin llevar la cuenta de las ofensas (Mateo 18:21-22).",
        },
        {
          titulo: "Buscar ayuda cuando solos no se puede",
          texto: "Acudir al pastor o a un consejero cristiano (Gálatas 6:2). Si hay violencia o peligro, no esperar: proteger a los que sufren, sobre todo a los niños, y llamar a las autoridades.",
        },
      ],
    },
  ],
  // Evangelismo personal
  "n2-evangelismo-personal-2": [
    // Ordena en siete pasos el modelo de conversación que la lección saca de Juan 4, para recordarlo y aplicarlo.
    {
      t: "pasos",
      titulo: "El modelo de Jesús con la samaritana, paso a paso",
      pasos: [
        {
          titulo: "Tomar la iniciativa",
          texto: "Jesús habló primero y empezó con algo cotidiano, una necesidad común: le pidió de beber junto al pozo (Juan 4:7).",
        },
        {
          titulo: "Cruzar las barreras",
          texto: "Él era judío y ella samaritana, Él era hombre y ella mujer, y ella llevaba una vida quebrantada; aun así, le habló (Juan 4:9; 4:27).",
        },
        {
          titulo: "Pasar a lo espiritual",
          texto: "Del agua del pozo pasó al agua viva y despertó su interés con una promesa: un agua que quita la sed para siempre (Juan 4:10-14).",
        },
        {
          titulo: "Tocar la vida con verdad",
          texto: "Le habló con verdad, y sin desprecio, de los maridos que había tenido (Juan 4:16-18).",
        },
        {
          titulo: "No desviarse en discusiones",
          texto: "Cuando ella sacó la discusión sobre el lugar de la adoración, respondió y volvió a lo central: adorar al Padre en espíritu y en verdad (Juan 4:19-24).",
        },
        {
          titulo: "Revelarse como el Mesías",
          texto: "Cuando ella habló del Mesías que esperaba, Jesús le dijo que era Él, el que hablaba con ella (Juan 4:25-26).",
        },
        {
          titulo: "El fruto: otros creen",
          texto: "La mujer dejó su cántaro y fue a contarlo a la ciudad; por una sola conversación, muchos samaritanos creyeron (Juan 4:28-29; 4:39-42).",
        },
      ],
    },
  ],
  "n2-evangelismo-personal-4": [
    // Reúne en una tabla de consulta rápida las objeciones de la lección, cómo responderlas y su cita, y qué hacer cuando no se sabe la respuesta.
    {
      t: "cuadro",
      titulo: "Objeciones comunes y cómo responderlas",
      columnas: ["La objeción o la pregunta", "Cómo responder", "Base bíblica"],
      filas: [
        [
          "Todos los caminos llevan a Dios",
          "Con respeto y sin despreciar a nadie: Jesús es el camino, y solo Él murió y resucitó por nuestros pecados.",
          "Juan 14:6; Hechos 4:12",
        ],
        [
          "Soy buena persona",
          "Comparados con la santidad de Dios, todos pecamos; la salvación no se gana siendo bueno: es por gracia.",
          "Romanos 3:23-24",
        ],
        [
          "¿Por qué Dios permite el sufrimiento?",
          "Primero acompañar y escuchar. El mal entró por el pecado; Cristo sufrió y venció al mundo; Dios enjugará toda lágrima.",
          "Romanos 5:12; 1 Pedro 2:21; Juan 16:33; Apocalipsis 21:4",
        ],
        [
          "La Biblia fue cambiada",
          "Se conservan miles de manuscritos antiguos del Nuevo Testamento, y Lucas investigó con cuidado lo que escribió.",
          "Lucas 1:1-4",
        ],
        [
          "La iglesia está llena de hipócritas",
          "Hay creyentes que fallan, pero no seguimos a los cristianos, sino a Cristo, que nunca pecó.",
          "Hebreos 4:15",
        ],
        ["Ahora no tengo tiempo", "Nadie sabe si tendrá un mañana, y hoy es el día de salvación.", "2 Corintios 6:2"],
        [
          "Una pregunta que no sabes responder",
          "Decir con sencillez que no lo sabes, estudiarlo y volver a conversar: la humildad abre más puertas.",
          "1 Pedro 3:15",
        ],
      ],
    },
  ],
  "n2-evangelismo-personal-5": [
    // La lección reparte la invitación entre la explicación, la lista, la seguridad y la nota final; los pasos la ordenan de principio a fin.
    {
      t: "pasos",
      titulo: "Cómo invitar a alguien a recibir a Cristo",
      pasos: [
        {
          titulo: "Explicar qué es arrepentirse y creer",
          texto: "Arrepentirse es cambiar de mente y de dirección: dejar el pecado y volverse a Dios (Hechos 2:38; 3:19). Creer es confiar en Jesús como Salvador y Señor (Hechos 16:31).",
        },
        {
          titulo: "Preguntar con sencillez",
          texto: "Cuando entienda el evangelio, no te detengas por miedo: pregúntale si hay algo que le impida recibir hoy a Cristo, sin presionar ni manipular.",
        },
        {
          titulo: "Sin palabras mágicas",
          texto: "Dios mira el corazón que se arrepiente y cree: con el corazón se cree, y con la boca se confiesa a Jesús como Señor (Romanos 10:9-10).",
        },
        {
          titulo: "Orar juntos",
          texto: "Invítala a orar con sus propias palabras, o a repetir contigo una oración sencilla: reconocer su pecado, pedir perdón, creer que Jesús murió y resucitó, y recibirlo como Señor.",
        },
        {
          titulo: "Mostrar la seguridad",
          texto: "La seguridad de la salvación no depende de lo que se siente, sino de la promesa de Dios: el que tiene al Hijo tiene la vida (1 Juan 5:11-13).",
        },
        {
          titulo: "Si dice que todavía no",
          texto: "Respeta su decisión, sigue siendo su amigo y sigue orando. Deja la puerta abierta: invítala a la iglesia o a leer el Evangelio de Juan.",
        },
      ],
    },
  ],
  // Dones espirituales y servicio
  "n2-dones-1": [
    // Pone lado a lado las tres ideas que la lección distingue y que más se confunden: los talentos, los dones y el fruto del Espíritu.
    {
      t: "cuadro",
      titulo: "Talentos, dones y fruto: en qué se distinguen",
      columnas: ["Aspecto", "Talentos naturales", "Dones espirituales", "Fruto del Espíritu"],
      filas: [
        [
          "Qué es",
          "Una capacidad que Dios nos dio al nacer y que también se pone a su servicio (Colosenses 3:23)",
          "Una capacidad que el Espíritu Santo da al creyente para edificar a la iglesia",
          "El carácter de Cristo formado en nosotros",
        ],
        [
          "Quién lo da",
          "Dios, de quien desciende toda buena dádiva (Santiago 1:17)",
          "El Espíritu Santo, a cada uno como Él quiere (1 Corintios 12:11)",
          "El Espíritu Santo, que lo produce en el creyente (Gálatas 5:22)",
        ],
        [
          "En quién se ve",
          "En toda persona, desde que nace",
          "En cada creyente: nadie en Cristo se queda sin don (1 Pedro 4:10)",
          "En el creyente que anda en el Espíritu (Gálatas 5:25)",
        ],
        [
          "Qué muestra",
          "Lo que Dios nos dio al crearnos",
          "Lo que Dios hace por medio de nosotros, para provecho de todos (1 Corintios 12:7)",
          "Lo que Dios hace en nosotros",
        ],
        [
          "Ejemplos",
          "La música, la organización",
          "Profecía, enseñanza, sanidades, misericordia",
          "Amor, gozo, paz, paciencia (Gálatas 5:22-23)",
        ],
      ],
    },
  ],
  "n2-dones-3": [
    // Junta los dos pasajes de la lección en un solo cuadro: cada don de Romanos 12, cómo pide Pablo usarlo y si es para hablar o para servir (1 Pedro 4:11).
    {
      t: "cuadro",
      titulo: "Los dones de Romanos 12:6-8: qué hacen y cómo se usan",
      columnas: ["Don", "Qué hace", "Cómo se usa (Romanos 12:6-8)", "Grupo (1 Pedro 4:11)"],
      filas: [
        [
          "Profecía",
          "Habla de parte de Dios para edificar, exhortar y consolar (1 Corintios 14:3)",
          "Conforme a la medida de la fe",
          "Para hablar",
        ],
        ["Servicio", "Ayuda en las necesidades prácticas de la iglesia", "En servir", "Para servir"],
        ["Enseñanza", "Explica la Palabra para que otros la entiendan", "En la enseñanza", "Para hablar"],
        ["Exhortación", "Anima y alienta a otros a seguir a Cristo", "En la exhortación", "Para hablar"],
        ["Repartir", "Da de lo suyo a los que tienen necesidad", "Con liberalidad", "Para servir"],
        ["Presidir", "Dirige y organiza la obra", "Con solicitud", "Para servir"],
        [
          "Hacer misericordia",
          "Cuida a los que sufren, como quien visita a los enfermos",
          "Con alegría",
          "Para servir",
        ],
      ],
    },
    // comprobado: oEmbed respondió título "Resumen del libro de Romanos: un panorama completo animado (parte 2)" y canal "Proyecto Biblia"; dura 9:53 en YouTube. Su tramo de Romanos 12-13 (cerca del minuto 8) muestra los dones para servirse unos a otros: servir, dirigir, enseñar, profetizar y dar (afiche oficial de BibleProject).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=ZqScL0dHLsM",
      titulo: "Resumen del libro de Romanos (parte 2)",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  "n2-dones-4": [
    // Muestra en orden la cadena de Efesios 4:11-16: Cristo da líderes que preparan a todos para servir, y así el cuerpo crece hasta la madurez.
    {
      t: "pasos",
      titulo: "Efesios 4:11-16: de los ministerios a la madurez",
      pasos: [
        {
          titulo: "Cristo da los ministerios",
          texto: "Él mismo constituyó apóstoles, profetas, evangelistas, pastores y maestros, y los dio a su iglesia (Efesios 4:11).",
        },
        {
          titulo: "Los líderes preparan a los santos",
          texto: "Perfeccionar a los santos es prepararlos y equiparlos para servir: el buen líder no lo hace todo, sino que prepara a otros (Efesios 4:12).",
        },
        {
          titulo: "Todos los santos sirven",
          texto: "La obra del ministerio no es solo del pastor: cada creyente sirve con el don que ha recibido (Efesios 4:12; 1 Pedro 4:10).",
        },
        {
          titulo: "El cuerpo de Cristo se edifica",
          texto: "Ese es el fin de los ministerios: la edificación del cuerpo de Cristo, que crece cuando cada miembro hace su parte (Efesios 4:12, 16).",
        },
        {
          titulo: "La meta: unidad, conocimiento y madurez",
          texto: "Llegar a la unidad de la fe y del conocimiento del Hijo de Dios, a la medida de la estatura de la plenitud de Cristo (Efesios 4:13).",
        },
        {
          titulo: "Firmes en la verdad, creciendo en amor",
          texto: "Ya no niños llevados por todo viento de doctrina, sino siguiendo la verdad en amor y creciendo en Cristo, que es la cabeza (Efesios 4:14-15).",
        },
      ],
    },
    // comprobado: oEmbed respondió título "Resumen del libro de Efesios: un panorama completo animado" y canal "Proyecto Biblia"; dura 10:28 en YouTube. Su parte de Efesios 4:1-16 presenta un solo Espíritu y muchos dones (apóstol, profeta, evangelista, pastor, maestro) para edificar la iglesia (afiche oficial de BibleProject).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=yJgym5MGzM4",
      titulo: "Resumen del libro de Efesios",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  "n2-dones-5": [
    // comprobado: oEmbed respondió título "Resumen del libro de 1 Corintios: un panorama completo animado" y canal "Proyecto Biblia"; dura 9:53 en YouTube. Su parte de 1 Corintios 11-14 (la reunión) enseña que el Espíritu obra por medio de todos para edificar y amar, sin distraer a otros y con reuniones ordenadas (afiche y guía oficiales de BibleProject).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=6f0kym4bUmE",
      titulo: "Resumen del libro de 1 Corintios",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  // Hermenéutica
  "n3-hermeneutica-2": [
    // Los tres ejemplos están en párrafos separados; el cuadro pone lado a lado la lectura común y la del contexto para repasar el método.
    {
      t: "cuadro",
      titulo: "Tres versículos leídos en su contexto",
      columnas: ["Versículo", "Cómo se suele citar", "Lo que muestra el contexto", "Lectura fiel"],
      filas: [
        [
          "Filipenses 4:13",
          "Como promesa de lograr cualquier meta que uno se proponga.",
          "Pablo escribe preso (1:13), agradece una ofrenda (4:10, 18) y dice que aprendió a contentarse (4:11-12).",
          "Cristo da fuerza para vivir fiel y contento en la escasez y en la abundancia.",
        ],
        [
          "Jeremías 29:11",
          "Como promesa de que a cada creyente le irá bien en todo y pronto.",
          "Carta a los cautivos en Babilonia: edificar, plantar y procurar la paz de la ciudad durante setenta años (29:5-10).",
          "Dios es fiel a sus propósitos de bien aun en la prueba, aunque su tiempo no sea el nuestro.",
        ],
        [
          "Mateo 18:20",
          "Como promesa para las reuniones pequeñas de oración.",
          "Los pasos para restaurar al hermano que peca: a solas, con uno o dos testigos y ante la iglesia (18:15-17).",
          "Cristo está en medio de la iglesia que actúa de acuerdo y en su nombre; y siempre está con los suyos (28:20).",
        ],
      ],
    },
  ],
  "n3-hermeneutica-4": [
    // La lección recorre ocho géneros en muchos párrafos; el cuadro los reúne con la forma de leer cada uno y el error que evita.
    {
      t: "cuadro",
      titulo: "Los géneros literarios: cómo se lee cada uno",
      columnas: ["Género", "Cómo se lee", "Error que evitar"],
      filas: [
        [
          "Narrativa: los relatos de Génesis a Ester, los evangelios y Hechos",
          "Enseña por lo que cuenta; se mira lo que el libro repite y aprueba, y lo que enseña el resto de la Escritura.",
          "Creer que aprueba todo lo que describe, como el pecado de David (2 Samuel 11:27).",
        ],
        [
          "Ley: la ley de Moisés",
          "Se busca el principio que revela el carácter de Dios, como hizo Pablo con Deuteronomio 25:4 (1 Corintios 9:9-11).",
          "Pensar que ya no enseña nada, u olvidar que sus sacrificios se cumplen en Cristo (Hebreos 10:1-14).",
        ],
        [
          "Poesía: Salmos, Job, Cantares, Lamentaciones y muchas partes de los profetas",
          "Con su paralelismo, imágenes y emociones: la segunda línea repite, completa o contrasta la primera (Salmos 19:1-2).",
          "Leerla como un informe, o tomar sus imágenes como si fueran datos.",
        ],
        [
          "Sabiduría: Proverbios, Eclesiastés y Job",
          "Principios generales para vivir en el temor de Dios; el sabio discierne cuándo conviene cada uno (Proverbios 26:4-5).",
          "Tomar un proverbio como una promesa que se cumple siempre de forma automática.",
        ],
        [
          "Profecía",
          "Se pregunta a quién hablaba el profeta, en qué momento de la historia y qué cumplimiento muestra el Nuevo Testamento.",
          "Verla solo como anuncio del futuro y olvidar su llamado a volver al pacto.",
        ],
        [
          "Evangelios y parábolas",
          "Cuatro retratos de Jesús; cada parábola suele tener una idea central y responde a una situación (Lucas 15:1-2).",
          "Leer una parábola como una alegoría, con un mensaje escondido en cada detalle.",
        ],
        [
          "Epístolas: cartas a iglesias o a personas",
          "Se leen completas, como cartas reales, reconstruyendo la situación a la que respondían.",
          "Citar versículos sueltos sin saber a qué problema respondía la carta.",
        ],
        [
          "Apocalíptica: partes de Daniel y Zacarías, y Apocalipsis",
          "Sus símbolos se explican con el mismo texto y con el resto de la Escritura (Apocalipsis 1:20).",
          "Interpretar los símbolos con la imaginación, o leer una visión como un mapa.",
        ],
      ],
    },
  ],
  "n3-hermeneutica-5": [
    // La lección no tiene video y da las reglas y los errores por separado; los pasos los juntan en un camino para examinar lo que se oye, como pide su tercer objetivo.
    {
      t: "pasos",
      titulo: "Cómo examinar una enseñanza, como los de Berea",
      pasos: [
        {
          titulo: "Recibir la palabra y escudriñar",
          texto: "Los de Berea recibieron la palabra con toda solicitud y escudriñaban cada día las Escrituras para ver si era así, aun lo que enseñaba Pablo (Hechos 17:11).",
        },
        {
          titulo: "Leer el pasaje completo",
          texto: "No basta con que las palabras estén en la Biblia: también el diablo citó el Salmo 91 (Mateo 4:5-6). Mira qué dice el contexto del versículo.",
        },
        {
          titulo: "Compararlo con el resto de la Escritura",
          texto: "La Escritura interpreta a la Escritura: Jesús respondió con otra parte de ella (Mateo 4:7). Ningún texto se interpreta en contra del resto de la Biblia.",
        },
        {
          titulo: "Apoyarse en los pasajes claros",
          texto: "Lo claro ilumina lo oscuro: la doctrina se edifica sobre pasajes claros y repetidos, no sobre un versículo difícil como 1 Corintios 15:29.",
        },
        {
          titulo: "Leerlo con Cristo en el centro",
          texto: "Toda la Biblia cuenta una sola historia de salvación, que culmina en Cristo (Lucas 24:44); lo que en el Antiguo era sombra se ve con claridad en el Nuevo (Hebreos 1:1-2; 10:1).",
        },
        {
          titulo: "Descartar los errores comunes",
          texto: "Pregunta si se saca de contexto, se alegoriza, se ignora el género, se lee solo lo que uno quiere oír o se abre la Biblia al azar.",
        },
        {
          titulo: "Examinarlo con humildad y en comunidad",
          texto: "Nadie tiene derecho a darle a la Escritura el sentido que quiera (2 Pedro 1:20-21): se examina con la iglesia, sus maestros y lo que los fieles han enseñado por siglos.",
        },
      ],
    },
  ],
  // Métodos de estudio bíblico
  "n3-metodos-estudio-3": [
    // Reúne en un ejemplo resuelto los pasos de la lección con Efesios 2:1-10, el pasaje observado en la lección 2, y sirve de modelo para el estudio inductivo breve que pide el examen.
    {
      t: "pasos",
      titulo: "Ejemplo resuelto: interpretar y aplicar Efesios 2:1-10",
      pasos: [
        {
          titulo: "Empieza por lo que observaste",
          texto: "En Efesios 2:1-10 viste el contraste entre muertos en pecados (2:1) y Pero Dios (2:4), la palabra gracia tres veces y los conectores porque y para que.",
        },
        {
          titulo: "Convierte cada observación en pregunta",
          texto: "¿Qué significa gracia? ¿Por qué dice no por obras? ¿Qué relación hay entre no ser salvos por obras y ser creados para buenas obras? Responde primero con el pasaje y su contexto.",
        },
        {
          titulo: "Deja que la Escritura explique la Escritura",
          texto: "Busca las referencias cruzadas: Romanos 3:24 dice que somos justificados gratuitamente por su gracia, y Tito 3:5, que Dios nos salvó por su misericordia y no por obras.",
        },
        {
          titulo: "Escribe la idea central en una frase",
          texto: "Dios, por su gracia, nos dio vida en Cristo cuando estábamos muertos, para que vivamos haciendo las buenas obras que él preparó. Si no puedes resumirlo, todavía no lo entendiste: vuelve al texto.",
        },
        {
          titulo: "Hazte las cinco preguntas de aplicación",
          texto: "¿Hay un pecado que dejar, una promesa que creer, un ejemplo que seguir o un mandato que obedecer? ¿Qué me enseña sobre Dios, para adorarlo?",
        },
        {
          titulo: "Decide algo personal, concreto y medible",
          texto: "No basta con decir voy a hacer más buenas obras. Mejor: esta semana voy a visitar a la hermana que está enferma y a llevarle algo de comer (Efesios 2:10; Santiago 1:22).",
        },
      ],
    },
  ],
  "n3-metodos-estudio-5": [
    // La lección enseña a ubicar cada libro en su época, pero no muestra la línea de tiempo: aquí se ve completa, con fechas aproximadas y los libros de cada etapa, y con Amós como ejemplo.
    {
      t: "linea",
      titulo: "La historia bíblica y sus libros en una línea de tiempo",
      eventos: [
        {
          fecha: "c. 2100-1800 a. C.",
          texto: "Los patriarcas Abraham, Isaac, Jacob y José, cuya historia narra Génesis desde el capítulo 12. Sus fechas son aproximadas.",
          ref: "Génesis 12:1-3",
        },
        {
          fecha: "c. 1446 a. C.",
          texto: "El éxodo con Moisés y la ley en el Sinaí (otros lo fechan hacia 1260 a. C.), que narran los libros de Éxodo a Deuteronomio.",
          ref: "Éxodo 12:41",
        },
        {
          fecha: "c. 1400-1050 a. C.",
          texto: "La conquista de Canaán con Josué y el tiempo de los jueces, que narran Josué, Jueces y Rut.",
          ref: "Jueces 2:16",
        },
        {
          fecha: "c. 1050-930 a. C.",
          texto: "El reino unido de Saúl, David y Salomón, que narran 1 y 2 Samuel y 1 Reyes. De ese tiempo son muchos salmos y proverbios.",
          ref: "1 Reyes 4:32",
        },
        {
          fecha: "c. 930 a. C.",
          texto: "El reino se divide: Israel al norte, hasta que Asiria toma Samaria en 722 a. C., y Judá al sur. Lo narran 1 y 2 Reyes.",
          ref: "1 Reyes 12:19-20",
        },
        {
          fecha: "c. 760-750 a. C.",
          texto: "Amós profetiza en días de Uzías y de Jeroboam, en una época de prosperidad: por eso denuncia el lujo y la injusticia.",
          ref: "Amós 1:1",
        },
        {
          fecha: "c. 586 a. C.",
          texto: "Babilonia destruye Jerusalén y el templo, y lleva al pueblo al exilio. De ese tiempo son Jeremías, Lamentaciones, Ezequiel y Daniel.",
          ref: "2 Reyes 25:8-11",
        },
        {
          fecha: "c. 538 a. C.",
          texto: "Ciro permite el regreso, y el templo se reedifica hacia 516 a. C. De esa época son Esdras, Nehemías, Ester, Hageo, Zacarías y Malaquías.",
          ref: "Esdras 1:1-3",
        },
        {
          fecha: "c. 6-4 a. C.",
          texto: "Tras unos cuatro siglos entre los testamentos, nace Jesús en días de Herodes, bajo el Imperio romano. Lo cuentan los evangelios.",
          ref: "Mateo 2:1",
        },
        {
          fecha: "c. 30-100 d. C.",
          texto: "La iglesia del primer siglo: Pentecostés, los viajes de Pablo y las cartas. De entonces son Hechos, las epístolas y Apocalipsis.",
          ref: "Hechos 2:1-4",
        },
      ],
    },
  ],
  "n3-metodos-estudio-6": [
    // La lección explica las cuatro maneras una tras otra; el cuadro las pone lado a lado, con cuándo conviene cada una, que es lo que pide su primer objetivo.
    {
      t: "cuadro",
      titulo: "Cuatro maneras de estudiar la Biblia",
      columnas: ["Manera", "Cómo se hace", "Cuándo conviene", "Ejemplo y consejo"],
      filas: [
        [
          "Por libro",
          "Se lee el libro entero varias veces, se anotan su tema, su propósito y su estructura, y se titula cada sección.",
          "Para conocer un libro a fondo. Es la más completa, y el estudio por tema se apoya en ella.",
          "Antes de estudiar Efesios 2:1-10, lee toda la carta, de una sentada si puedes: cada parte se ve a la luz del todo.",
        ],
        [
          "Por tema",
          "Se escoge un tema, se buscan con la concordancia los pasajes que lo tratan y se ordena lo que enseñan.",
          "Para saber lo que toda la Biblia enseña sobre un asunto, como la oración o la generosidad.",
          "Cuidado: leer cada pasaje en su contexto y no armar una doctrina con frases sueltas.",
        ],
        [
          "Por palabra",
          "Se sigue una palabra importante en todos sus usos y se mira lo que la rodea en cada frase.",
          "Para descubrir la riqueza de una palabra clave, como gracia.",
          "Gracia traduce el griego charis, número 5485 de Strong. Cuidado: una palabra se entiende por su uso en cada frase.",
        ],
        [
          "Biográfico",
          "Se sigue a una persona por todos los pasajes donde aparece, que se encuentran con la concordancia.",
          "Para aprender lecciones del ejemplo de una persona, como la generosidad o la paciencia.",
          "Bernabé: generoso (Hechos 4:36-37), recibió a Saulo (Hechos 9:27) y dio otra oportunidad a Marcos (Hechos 15:37-39).",
        ],
      ],
    },
  ],
  // Pentateuco y libros históricos
  "n3-pentateuco-historicos-2": [
    // Reúne en un solo cuadro lo que Éxodo y Levítico enseñaban y cómo se cumple en Cristo, que es lo que la lección pide explicar.
    {
      t: "cuadro",
      titulo: "Éxodo y Levítico y su cumplimiento en Cristo",
      columnas: ["En Éxodo y Levítico", "Lo que enseñaba a Israel", "En Cristo y en la iglesia"],
      filas: [
        [
          "La Pascua (Éxodo 12:13)",
          "La sangre del cordero en las puertas libró a los primogénitos: Dios salva por la sangre.",
          "Cristo es nuestra pascua, sacrificado por nosotros (1 Corintios 5:7).",
        ],
        [
          "El pacto del Sinaí (Éxodo 19:5-6)",
          "Dios hizo pacto con un pueblo ya rescatado: la obediencia responde a la liberación.",
          "En Cristo, la iglesia es un pueblo de sacerdotes, santo y apartado para Dios (1 Pedro 2:9).",
        ],
        [
          "El tabernáculo (Éxodo 25:8)",
          "Su meta era que Dios habitara en medio de su pueblo.",
          "En Jesús, el Verbo hecho carne, Dios vino a vivir en medio de su pueblo (Juan 1:14).",
        ],
        [
          "Los sacrificios (Levítico 17:11)",
          "El pecado trae muerte y Dios provee un sustituto: la sangre hace expiación.",
          "Cristo se ofreció una sola vez, y su sacrificio basta para siempre (Hebreos 10:12-14).",
        ],
        [
          "El Día de la Expiación (Levítico 16)",
          "Una vez al año, el sumo sacerdote entraba al Lugar Santísimo con la sangre del sacrificio.",
          "Cristo entró una vez para siempre con su propia sangre (Hebreos 9:11-12).",
        ],
        [
          "La santidad (Levítico 19:2)",
          "El Dios santo llama a su pueblo a vivir en santidad cada día y a amar al prójimo.",
          "El creyente es llamado a vivir en santidad en todo, porque Dios es santo (1 Pedro 1:15-16).",
        ],
      ],
    },
  ],
  "n3-pentateuco-historicos-5": [
    // La lección recorre unos cinco siglos de reyes; la línea pone en orden los hechos y sus fechas aproximadas para no perderse.
    {
      t: "linea",
      titulo: "De Saúl al exilio: el reino en Samuel, Reyes y Crónicas",
      eventos: [
        {
          fecha: "c. 1050 a. C.",
          texto: "El pueblo pide un rey como las naciones. Samuel unge a Saúl, que empieza bien, pero desobedece.",
          ref: "1 Samuel 10:1",
        },
        {
          fecha: "c. 1010-970 a. C.",
          texto: "Reina David, el pastor que Dios escogió. Lleva el arca a Jerusalén y Dios le promete un trono para siempre.",
          ref: "2 Samuel 7:16",
        },
        {
          fecha: "c. 970-930 a. C.",
          texto: "Reina Salomón y construye el templo, pero en su vejez su corazón se aparta de Dios.",
          ref: "1 Reyes 11:4",
        },
        {
          fecha: "c. 930 a. C.",
          texto: "El reino se divide: Israel al norte y Judá al sur, con la casa de David.",
          ref: "1 Reyes 12:16",
        },
        {
          fecha: "c. 874-853 a. C.",
          texto: "En los días del rey Acab, Elías llama al pueblo, en el monte Carmelo, a dejar de vacilar entre Jehová y Baal.",
          ref: "1 Reyes 18:21",
        },
        {
          fecha: "c. 722 a. C.",
          texto: "Asiria toma Samaria y el reino del norte termina, porque el pueblo se apartó de Jehová.",
          ref: "2 Reyes 17:6-7",
        },
        {
          fecha: "c. 622 a. C.",
          texto: "En el reinado de Josías se halla el libro de la ley en el templo, y el rey hace una gran reforma.",
          ref: "2 Reyes 22:8",
        },
        {
          fecha: "c. 586 a. C.",
          texto: "Babilonia destruye Jerusalén y el templo, y lleva al pueblo de Judá al exilio.",
          ref: "2 Reyes 25:9",
        },
        {
          fecha: "c. 561 a. C.",
          texto: "En Babilonia, el rey Joaquín, descendiente de David, sale de la cárcel: la promesa sigue viva.",
          ref: "2 Reyes 25:27",
        },
        {
          fecha: "Tras el 538 a. C.",
          texto: "Crónicas, escrito para los que volvieron del exilio, cuenta otra vez la historia y los llama a buscar a Dios.",
          ref: "2 Crónicas 36:22-23",
        },
      ],
    },
  ],
  "n3-pentateuco-historicos-6": [
    // Ordena el regreso paso a paso y muestra que Ester sucede entre el templo terminado y la llegada de Esdras, aunque su libro vaya después.
    {
      t: "linea",
      titulo: "El regreso del exilio: de Ciro a Nehemías",
      eventos: [
        {
          fecha: "c. 538 a. C.",
          texto: "Ciro, rey de Persia, permite a los judíos volver y reconstruir el templo, como Dios lo anunció por Jeremías.",
          ref: "Esdras 1:1",
        },
        {
          fecha: "c. 536 a. C.",
          texto: "Con Zorobabel, los que volvieron echan los cimientos del templo; luego la oposición detiene la obra.",
          ref: "Esdras 3:10",
        },
        {
          fecha: "c. 520 a. C.",
          texto: "Los profetas Hageo y Zacarías animan al pueblo, y la obra del templo se reanuda.",
          ref: "Esdras 5:1",
        },
        { fecha: "c. 516 a. C.", texto: "Se termina el templo, en el sexto año del rey Darío.", ref: "Esdras 6:15" },
        {
          fecha: "c. 483-473 a. C.",
          texto: "En la corte del rey Asuero, Ester arriesga su vida, el pueblo es librado y nace la fiesta de Purim.",
          ref: "Ester 9:26",
        },
        {
          fecha: "c. 458 a. C.",
          texto: "Llega Esdras, sacerdote y escriba, dispuesto a estudiar la ley, cumplirla y enseñarla al pueblo.",
          ref: "Esdras 7:10",
        },
        {
          fecha: "c. 445 a. C.",
          texto: "Nehemías, copero del rey, llega a Jerusalén; con oración y trabajo, el muro se termina en cincuenta y dos días.",
          ref: "Nehemías 6:15",
        },
        {
          fecha: "c. 445 a. C.",
          texto: "Esdras lee la ley ante el pueblo y los levitas explican su sentido: la renovación viene por la Palabra.",
          ref: "Nehemías 8:8",
        },
      ],
    },
  ],
  // La persona y obra del Espíritu Santo
  "n3-espiritu-santo-2": [
    // La lección recorre la obra del Espíritu desde Génesis hasta Jesús; la línea ordena esos momentos y muestra la promesa de Joel cumplida en Pentecostés.
    {
      t: "linea",
      titulo: "El Espíritu Santo de la creación a Pentecostés",
      eventos: [
        {
          fecha: "En el principio",
          texto: "En la creación, el Espíritu de Dios se movía sobre las aguas: donde había desorden y vacío, preparaba la vida.",
          ref: "Génesis 1:2",
        },
        {
          fecha: "Época de los jueces",
          texto: "El Espíritu de Jehová viene sobre jueces como Otoniel (Jueces 3:10) y Gedeón para librar a Israel: viene sobre algunos, para una tarea.",
          ref: "Jueces 6:34",
        },
        {
          fecha: "Siglo XI a. C.",
          texto: "Samuel unge a David, y desde ese día el Espíritu de Jehová viene sobre él para la tarea de ser rey.",
          ref: "1 Samuel 16:13",
        },
        {
          fecha: "Siglo VI a. C.",
          texto: "Desde el exilio en Babilonia, Ezequiel anuncia que Dios pondrá su Espíritu dentro de su pueblo para que ande en sus estatutos.",
          ref: "Ezequiel 36:26-27",
        },
        {
          fecha: "Fecha debatida",
          texto: "Joel anuncia que Dios derramará su Espíritu sobre toda carne: hijos e hijas, ancianos y jóvenes, siervos y siervas.",
          ref: "Joel 2:28-29",
        },
        {
          fecha: "c. 6-4 a. C.",
          texto: "El Espíritu Santo viene sobre María, y Jesús es concebido por obra del Espíritu.",
          ref: "Lucas 1:35",
        },
        {
          fecha: "c. 26-29 d. C.",
          texto: "Mientras Jesús ora en su bautismo, el Espíritu Santo desciende sobre él como paloma; lleno del Espíritu, vuelve del Jordán (Lucas 4:1).",
          ref: "Lucas 3:21-22",
        },
        {
          fecha: "En su ministerio",
          texto: "En Nazaret lee de Isaías que el Espíritu está sobre él; ungido con el Espíritu y con poder, anda haciendo bienes y sanando (Hechos 10:38).",
          ref: "Lucas 4:18",
        },
        {
          fecha: "c. 30-33 d. C.",
          texto: "En Pentecostés, Pedro explica que se cumple la promesa de Joel: Dios derrama su Espíritu sobre los que creen.",
          ref: "Hechos 2:16-17",
        },
      ],
    },
  ],
  "n3-espiritu-santo-4": [
    // Pone lado a lado Pentecostés, Samaria y Éfeso, que la lección analiza, y Cesarea, que cita su nota: se ve lo que tienen en común y lo que varía, sin tomar partido sobre las lenguas como señal.
    {
      t: "cuadro",
      titulo: "Cuatro relatos de Hechos: cuando el Espíritu vino sobre ellos",
      columnas: ["Relato", "Quiénes eran", "Cómo y cuándo vino", "Qué pasó"],
      filas: [
        [
          "Pentecostés (Hechos 2:1-4)",
          "Los discípulos reunidos en Jerusalén, que ya creían en Jesús",
          "Estando todos juntos, vino del cielo un estruendo como de viento y lenguas como de fuego",
          "Todos fueron llenos del Espíritu y hablaron en otras lenguas, según el Espíritu les daba que hablasen",
        ],
        [
          "Samaria (Hechos 8:14-17)",
          "Samaritanos que habían creído y habían sido bautizados en el nombre de Jesús",
          "Cuando Pedro y Juan oraron por ellos y les impusieron las manos",
          "Recibían el Espíritu; el texto no dice cómo se notó, pero Simón vio que se daba (Hechos 8:18)",
        ],
        [
          "Cesarea (Hechos 10:44-48)",
          "Cornelio, centurión gentil y temeroso de Dios, con sus parientes y amigos",
          "Mientras Pedro aún predicaba, antes del bautismo en agua",
          "El Espíritu cayó sobre todos los que oían; hablaban en lenguas y magnificaban a Dios",
        ],
        [
          "Éfeso (Hechos 19:1-7)",
          "Unos doce discípulos que solo conocían el bautismo de Juan",
          "Después de ser bautizados en el nombre del Señor Jesús, cuando Pablo les impuso las manos",
          "Vino sobre ellos el Espíritu Santo; hablaban en lenguas y profetizaban",
        ],
      ],
    },
  ],
  "n3-espiritu-santo-6": [
    // La lección enseña con Hechos 16:6-7 que el Espíritu guía el servicio; seguir el viaje paso a paso hasta la visión de Macedonia muestra cómo se planifica, se ora y se obedece.
    {
      t: "pasos",
      titulo: "Ejemplo resuelto: el Espíritu guía a Pablo hasta Macedonia",
      pasos: [
        {
          titulo: "Un plan para servir",
          texto: "Pablo quería volver a visitar a los hermanos de las ciudades donde había anunciado la palabra, y salió con Silas confirmando a las iglesias (Hechos 15:36-41).",
        },
        {
          titulo: "El Espíritu cierra Asia",
          texto: "Al pasar por Frigia y Galacia, el Espíritu Santo les prohibió hablar la palabra en Asia (Hechos 16:6).",
        },
        {
          titulo: "Otra puerta que no se abre",
          texto: "Al llegar a Misia intentaron ir a Bitinia, pero el Espíritu no se lo permitió. Pasando junto a Misia, bajaron a Troas (Hechos 16:7-8).",
        },
        {
          titulo: "Dios muestra el camino",
          texto: "De noche, Pablo vio en visión a un varón macedonio que le rogaba que pasara a Macedonia para ayudarlos (Hechos 16:9).",
        },
        {
          titulo: "Obediencia en seguida",
          texto: "Procuraron partir en seguida, seguros de que Dios los llamaba a anunciar el evangelio en Macedonia (Hechos 16:10).",
        },
        {
          titulo: "Lo que aprende el obrero",
          texto: "Planifica y ora, y está dispuesto a que el Espíritu cambie sus planes: él guía el servicio, aun cerrando puertas, hacia donde Dios lo quiere llevar.",
        },
      ],
    },
  ],
  // Evangelismo y consolidación
  "n3-evangelismo-consolidacion-2": [
    // La lección reparte el método en varias partes (oración, equipo, casas, normas y el después); los pasos lo ordenan como una salida real.
    {
      t: "pasos",
      titulo: "Una salida de evangelismo en equipo",
      pasos: [
        {
          titulo: "Orar al Señor de la mies",
          texto: "Como Jesús mandó a los setenta, el equipo ruega al Señor de la mies que envíe obreros (Lucas 10:2). Los intercesores oran por las personas y por el equipo antes, durante y después.",
        },
        {
          titulo: "Organizar el equipo",
          texto: "El líder prepara el plan, reparte las tareas (quienes oran, quienes hablan y quienes acompañan) y cuida la seguridad. Se sale con el conocimiento de los líderes de la iglesia.",
        },
        {
          titulo: "Salir de dos en dos",
          texto: "Nadie sale solo: en pareja o en grupo se animan, se cuidan, se corrigen y dan un testimonio más firme (Lucas 10:1).",
        },
        {
          titulo: "Entrar con paz y buscar al hijo de paz",
          texto: "Se saluda con paz y se busca a la persona que recibe el mensaje y abre su casa a otros (Lucas 10:5-6). Servir a la comunidad también abre puertas.",
        },
        {
          titulo: "Respetar y cuidar a cada persona",
          texto: "No se discute ni se insiste con quien no quiere escuchar. Con los menores, solo con permiso de sus padres y nunca a solas. Fotos y datos, solo con permiso (Colosenses 4:5-6).",
        },
        {
          titulo: "Reunirse al terminar",
          texto: "El equipo ora por las personas, revisa los contactos y reparte quién llamará a cada una. Sin este paso, el evangelismo no da fruto que permanezca.",
        },
      ],
    },
  ],
  "n3-evangelismo-consolidacion-3": [
    // La lección trata cuatro medios en secciones separadas; el cuadro los compara de un vistazo y muestra lo que no cambia en ninguno.
    {
      t: "cuadro",
      titulo: "Cuatro medios, un mismo mensaje",
      columnas: ["Medio", "Lo que pide", "El seguimiento"],
      filas: [
        [
          "Campañas, como Felipe en Samaria (Hechos 8:5-6)",
          "Oración por semanas, invitación clara, predicación centrada en Cristo y un llamado sin manipulación",
          "Un equipo listo para atender a cada persona que responde",
        ],
        [
          "La calle y la plaza, como Pablo en Atenas (Hechos 17:17)",
          "Mensaje corto y claro, testimonios reales, literatura bien hecha y permiso donde haga falta",
          "Conversar con quien se detiene y, con su permiso, anotar cómo contactarlo",
        ],
        [
          "La radio, que entra en casas, carros, hospitales y cárceles",
          "Presentar a Cristo con claridad y contar historias de vidas cambiadas",
          "Invitar a llamar o escribir, y dar seguimiento a quienes responden",
        ],
        [
          "Las redes sociales (2 Timoteo 2:24-25)",
          "Contenido breve, verdadero y centrado en Cristo; responder con amor y sin peleas",
          "Pasar a un mensaje privado y, si la persona quiere, a una iglesia cercana",
        ],
        [
          "En todos los medios",
          "El mismo mensaje, Cristo muerto y resucitado, con respeto y sin presión; fotos y datos de alguien, solo con su permiso",
          "Contar los resultados con honestidad: el fruto son personas que siguen creciendo en una iglesia",
        ],
      ],
    },
  ],
  "n3-evangelismo-consolidacion-4": [
    // La diferencia entre decisiones y discípulos es el centro de la lección; el cuadro la muestra punto por punto, con sus textos.
    {
      t: "cuadro",
      titulo: "Conseguir decisiones o hacer discípulos",
      columnas: ["Aspecto", "Si la meta es solo la decisión", "Si la meta es hacer discípulos"],
      filas: [
        [
          "Hasta dónde llega",
          "Hasta el sí de la persona",
          "Hasta bautizarla y enseñarle a guardar todo lo que Jesús mandó (Mateo 28:19-20)",
        ],
        [
          "Las primeras semanas",
          "El nuevo creyente queda solo con sus preguntas y presiones",
          "Alguien lo cuida a su lado con ternura, como la nodriza (1 Tesalonicenses 2:7)",
        ],
        ["El seguimiento", "Se deja para después, si alguien lo pide", "Se planea junto con el evangelismo"],
        ["Lo que se cuenta", "Las decisiones del día", "Los que permanecen, crecen y empiezan a servir"],
        [
          "El resultado",
          "Muchos quedan sin raíz y no perduran (Mateo 13:20-21)",
          "Creyentes firmes y maduros en Cristo (Colosenses 1:28)",
        ],
        ["La imagen", "Una casa con la puerta de atrás abierta", "Una cosecha recogida, guardada y cuidada"],
      ],
    },
  ],
  // Liderazgo cristiano I
  "n3-liderazgo-1-3": [
    // Pone lado a lado el modelo del buen pastor de 1 Pedro 5 y las señales del poder que se tuerce, como en Diótrefes, para que el alumno reconozca a tiempo el abuso de poder.
    {
      t: "cuadro",
      titulo: "El buen pastor y el poder que se tuerce",
      columnas: ["Aspecto", "El buen pastor", "El poder que se tuerce"],
      filas: [
        [
          "Por qué sirve",
          "Voluntariamente y con ánimo pronto, no por fuerza (1 Pedro 5:2)",
          "Porque le gusta tener el primer lugar, como a Diótrefes (3 Juan 1:9)",
        ],
        [
          "Lo que busca",
          "El bien del rebaño, no la ganancia deshonesta (1 Pedro 5:2)",
          "Su propio provecho, en lo económico, en lo emocional o en lo sexual",
        ],
        [
          "Cómo trata a las personas",
          "Sin señorío: va delante como ejemplo de la grey (1 Pedro 5:3)",
          "Las controla y las manipula con la culpa, el miedo o supuestas revelaciones",
        ],
        [
          "A quién pide lealtad",
          "A Cristo, el Príncipe de los pastores: el rebaño es de Dios, no del líder (1 Pedro 5:2, 4)",
          "A su propia persona, en vez de a Cristo",
        ],
        [
          "Con los demás hermanos",
          "Los estima como superiores a él mismo (Filipenses 2:3)",
          "No los recibe y expulsa de la iglesia a los que quieren recibirlos, como Diótrefes (3 Juan 1:10)",
        ],
        [
          "Ante las preguntas",
          "Rinde cuentas, acepta la corrección y nunca encubre un abuso",
          "Esconde las cosas, no rinde cuentas y castiga a quien pregunta",
        ],
      ],
    },
  ],
  "n3-liderazgo-1-5": [
    // Compara los dos casos bíblicos de la lección y muestra que delegar empieza por escoger bien y deja al líder libre para lo principal.
    {
      t: "cuadro",
      titulo: "Delegar en la Biblia: Moisés y los apóstoles",
      columnas: ["Aspecto", "Moisés (Éxodo 18)", "Los apóstoles (Hechos 6)"],
      filas: [
        [
          "El problema",
          "Atendía él solo al pueblo desde la mañana hasta la tarde (Éxodo 18:13-14)",
          "Las viudas de los griegos eran desatendidas en la distribución diaria (Hechos 6:1)",
        ],
        [
          "La respuesta del líder",
          "Escuchó el consejo de Jetro e hizo todo lo que le dijo (Éxodo 18:24)",
          "Convocaron a los discípulos y les propusieron una solución (Hechos 6:2-3)",
        ],
        [
          "A quiénes escogieron",
          "Varones de virtud, temerosos de Dios, de verdad y que aborrecieran la avaricia (Éxodo 18:21)",
          "Siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría (Hechos 6:3)",
        ],
        [
          "Lo que el líder conservó",
          "Llevar los asuntos a Dios, enseñar al pueblo y juzgar los casos graves (Éxodo 18:19-22)",
          "La oración y el ministerio de la palabra (Hechos 6:4)",
        ],
        [
          "El resultado",
          "Según Jetro, Moisés podría sostenerse y el pueblo iría en paz a su lugar (Éxodo 18:23)",
          "Crecía la palabra del Señor y se multiplicaban los discípulos (Hechos 6:7)",
        ],
      ],
    },
  ],
  "n3-liderazgo-1-6": [
    // Convierte el relato de Hechos 15 en un método que el alumno puede seguir cuando su equipo enfrenta un conflicto o una decisión difícil.
    {
      t: "pasos",
      titulo: "Cómo enfrentó la iglesia un conflicto en Hechos 15",
      pasos: [
        {
          titulo: "Enfrentar el conflicto a tiempo",
          texto: "En Antioquía hubo una fuerte discusión sobre si los gentiles debían circuncidarse para ser salvos; no la escondieron: la llevaron a los apóstoles y a los ancianos en Jerusalén (Hechos 15:1-2).",
        },
        {
          titulo: "Reunir a los responsables",
          texto: "Los apóstoles y los ancianos se reunieron para considerar juntos el asunto: con muchos consejeros los planes se afirman (Hechos 15:6; Proverbios 15:22).",
        },
        {
          titulo: "Escuchar a todas las partes",
          texto: "Oyeron a los que pedían guardar la ley de Moisés y, después de mucha discusión, a Pedro, a Bernabé y a Pablo, que contaron lo que Dios había hecho entre los gentiles (Hechos 15:5-12).",
        },
        {
          titulo: "Buscar lo que dice la Escritura",
          texto: "Jacobo mostró que lo sucedido concordaba con las palabras de los profetas (Hechos 15:13-18; Amós 9:11-12). La decisión se apoyó en la Palabra, no solo en opiniones.",
        },
        {
          titulo: "Decidir en unidad con la guía del Espíritu",
          texto: "Llegaron a un acuerdo y escribieron que había parecido bien al Espíritu Santo y a ellos: la guía de Dios y el discernimiento del grupo van juntos (Hechos 15:25, 28).",
        },
        {
          titulo: "Comunicar con claridad y cuidar a los hermanos",
          texto: "Enviaron una carta con Judas y Silas, que explicaron lo mismo de palabra; al leerla, los hermanos se alegraron por la consolación (Hechos 15:22-31).",
        },
      ],
    },
  ],
};
