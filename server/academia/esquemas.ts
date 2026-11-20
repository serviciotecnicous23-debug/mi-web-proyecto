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
  // Los Evangelios y Hechos
  "n3-evangelios-hechos-1": [
    // La lección describe los cuatro evangelios en una lista; el cuadro los pone lado a lado para comparar sus retratos de Jesús y distinguir los sinópticos de Juan.
    {
      t: "cuadro",
      titulo: "Cuatro retratos de un mismo Jesús",
      columnas: ["Evangelio", "Retrato de Jesús", "Cómo lo cuenta", "Texto clave"],
      filas: [
        [
          "Mateo (sinóptico)",
          "El Mesías, el Rey prometido que cumple las Escrituras",
          "Para lectores judíos: repite que se cumplió lo dicho por los profetas y reúne cinco grandes discursos",
          "Mateo 1:22-23",
        ],
        [
          "Marcos (sinóptico)",
          "El Hijo de Dios que vino a servir y a dar su vida en rescate",
          "Breve y lleno de acción; muchos lo creen el primero escrito, y una tradición antigua lo une a la predicación de Pedro",
          "Marcos 10:45",
        ],
        [
          "Lucas (sinóptico)",
          "El Salvador de todos, que busca a los perdidos, los pobres, las mujeres y los despreciados",
          "Para Teófilo y los no judíos, con lo que investigó entre testigos; destaca la oración y el Espíritu, y sigue en Hechos",
          "Lucas 19:10",
        ],
        [
          "Juan",
          "El Verbo eterno hecho carne, el Hijo que revela al Padre",
          "Distinto de los sinópticos: siete señales, largos discursos y los Yo soy, para que creamos y tengamos vida",
          "Juan 20:30-31",
        ],
      ],
    },
  ],
  "n3-evangelios-hechos-4": [
    // El sentido de la cruz y de la resurrección está repartido en varios párrafos; el cuadro reúne las claves (rescate, nuevo pacto, obra consumada, velo rasgado, testigos) que pide el escrito del examen final.
    {
      t: "cuadro",
      titulo: "La cruz y la tumba vacía: lo que significan",
      columnas: ["Clave", "Qué enseña", "Dónde leerlo"],
      filas: [
        [
          "Una muerte anunciada",
          "Casi un tercio de los evangelios cuenta su última semana: su muerte no fue un accidente, sino el propósito de su venida",
          "Marcos 8:31",
        ],
        [
          "Rescate",
          "Dio su vida como precio de nuestra libertad; como el siervo de Isaías 53, llevó el pecado de muchos",
          "Marcos 10:45; Isaías 53:12",
        ],
        [
          "Nuevo pacto",
          "En la última cena de la Pascua, la copa es el nuevo pacto en su sangre, el que anunciaron los profetas",
          "Lucas 22:19-20; Jeremías 31:31-34",
        ],
        [
          "Obra consumada",
          "Antes de entregar el espíritu declaró consumada su obra: la salvación quedó completa",
          "Juan 19:30",
        ],
        [
          "Velo rasgado",
          "El velo del templo se rasgó de arriba abajo: quedó abierto el camino a la presencia de Dios",
          "Marcos 15:38",
        ],
        [
          "Resurrección con testigos",
          "La tumba vacía y las apariciones a las mujeres, a Cefas, a los doce y a más de quinientos hermanos",
          "Mateo 28:1-10; 1 Corintios 15:3-6",
        ],
        [
          "Gran comisión",
          "Con toda potestad, el Resucitado envía a hacer discípulos de todas las naciones y promete estar con ellos",
          "Mateo 28:18-20",
        ],
      ],
    },
  ],
  "n3-evangelios-hechos-6": [
    // La lección enumera los viajes sin fechas; la línea de tiempo los ordena con fechas aproximadas, del envío desde Antioquía a los dos años en Roma, y muestra el avance hasta lo último de la tierra.
    {
      t: "linea",
      titulo: "Pablo, de Antioquía a Roma (Hechos 13 al 28)",
      eventos: [
        {
          fecha: "c. 47-48 d. C.",
          texto: "Primer viaje: el Espíritu aparta a Bernabé y a Saulo, que van de Antioquía a Chipre y a las ciudades de Galacia.",
          ref: "Hechos 13:2-4",
        },
        {
          fecha: "c. 49 d. C.",
          texto: "Concilio de Jerusalén: judíos y gentiles son salvos de igual modo, por la gracia del Señor Jesús.",
          ref: "Hechos 15:11",
        },
        {
          fecha: "c. 49-52 d. C.",
          texto: "Segundo viaje, con Silas: tras la visión del varón macedonio, el evangelio llega a Europa (Filipos, Tesalónica, Berea, Atenas y Corinto).",
          ref: "Hechos 16:9",
        },
        {
          fecha: "c. 53-57 d. C.",
          texto: "Tercer viaje: casi tres años en Éfeso; en Mileto se despide de los ancianos de esa iglesia.",
          ref: "Hechos 20:31",
        },
        {
          fecha: "c. 57 d. C.",
          texto: "En Jerusalén lo sacan del templo y el tribuno romano lo arresta; por un plan para matarlo, lo envían preso a Cesarea.",
          ref: "Hechos 21:30-33",
        },
        {
          fecha: "c. 57-59 d. C.",
          texto: "Dos años preso en Cesarea: comparece ante Félix y Festo, apela al César como ciudadano romano y habla ante Agripa.",
          ref: "Hechos 25:11-12",
        },
        {
          fecha: "c. 59-60 d. C.",
          texto: "Viaje a Roma: tormenta y naufragio; pasan tres meses en la isla de Malta antes de seguir.",
          ref: "Hechos 28:1-11",
        },
        {
          fecha: "c. 60-62 d. C.",
          texto: "Dos años en Roma, en una casa alquilada, predicando el reino abiertamente y sin impedimento. Así termina Hechos.",
          ref: "Hechos 28:30-31",
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
  // Homilética I
  "n3-homiletica-1-3": [
    // La lección no tiene video y formular la idea central es lo más difícil de la materia: el cuadro separa tema, complemento y propósito en los dos ejemplos de la lección.
    {
      t: "cuadro",
      titulo: "La idea central y el propósito en dos mensajes",
      columnas: ["Elemento", "Responde a", "Lucas 15:1-7", "Pedro en Pentecostés (Hechos 2)"],
      filas: [
        ["Tema", "¿De qué hablo?", "Cómo trata Dios al pecador perdido", "Jesús, a quien ellos crucificaron"],
        [
          "Complemento",
          "¿Qué digo de eso?",
          "Lo busca y se goza cuando se arrepiente",
          "Dios lo resucitó y le ha hecho Señor y Cristo",
        ],
        [
          "Idea central",
          "El tema y el complemento en una sola frase",
          "Dios busca al pecador perdido y se goza cuando vuelve",
          "Al Jesús que ellos crucificaron, Dios lo resucitó y le ha hecho Señor y Cristo",
        ],
        [
          "Propósito",
          "¿Qué deben saber, creer y hacer los oyentes?",
          "Que los que están lejos vuelvan a Dios y que la iglesia reciba con gozo al que vuelve",
          "Que reconozcan a Jesús como Señor y Cristo, se arrepientan y se bauticen (2:36-38)",
        ],
      ],
    },
  ],
  "n3-homiletica-1-4": [
    // Pone lado a lado lo que hace cada parte del mensaje y cómo se ve en Atenas y en Lucas 15, como modelo para armar el propio bosquejo.
    {
      t: "cuadro",
      titulo: "Las tres partes del mensaje, en Atenas y en Lucas 15",
      columnas: ["Parte", "Qué hace", "Pablo en Atenas (Hechos 17)", "Lucas 15:1-7"],
      filas: [
        [
          "Introducción",
          "Es breve: capta la atención, presenta una necesidad o una pregunta y lleva al texto",
          "Empieza por el altar al Dios no conocido que Pablo vio en la ciudad (17:22-23)",
          "Una pregunta breve: ¿alguna vez perdiste algo muy valioso?",
        ],
        [
          "Desarrollo",
          "De dos a cuatro puntos que salen del texto; cada uno se explica, se ilustra y se aplica, con transiciones",
          "Dios es el creador, no habita en templos hechos por manos y está cerca de cada uno (17:24-29)",
          "Dios ve el valor de uno solo, busca hasta encontrar y se goza con el que vuelve (15:4-7)",
        ],
        [
          "Conclusión",
          "Repite la idea central con otras palabras, llama a responder y termina a tiempo, sin temas nuevos",
          "Dios manda a todos que se arrepientan, porque juzgará al mundo por el varón que resucitó (17:30-31)",
          "Repite que Dios busca al perdido y llama a volver a él y a recibir con gozo al que vuelve",
        ],
      ],
    },
  ],
  "n3-homiletica-1-6": [
    // La lección no tiene video y pide la enseñanza grabada: los pasos reúnen toda la materia en una guía para prepararla y revisarla.
    {
      t: "pasos",
      titulo: "De un pasaje a tu enseñanza grabada, paso a paso",
      pasos: [
        {
          titulo: "Escoge y estudia el pasaje",
          texto: "Un pasaje completo, con oración: obsérvalo, estudia su contexto y escribe en una frase lo que el autor quiso decir a sus primeros lectores (2 Timoteo 2:15).",
        },
        {
          titulo: "Escribe la idea central y el propósito",
          texto: "Una sola frase con su tema y su complemento, y lo que los oyentes deben saber, creer y hacer, que coincide con el propósito del pasaje (Isaías 55:11).",
        },
        {
          titulo: "Arma el bosquejo en una página",
          texto: "Una introducción breve que lleve al texto, de dos a cuatro puntos que salen del pasaje, cada uno con su versículo, y una conclusión que repite la idea y llama a responder.",
        },
        {
          titulo: "Ilustra, aplica y muestra a Cristo",
          texto: "Una ilustración verdadera y breve, una aplicación concreta (qué hacer, con quién y cuándo) y cómo el pasaje se relaciona con Cristo, sin forzarlo (Lucas 24:27).",
        },
        {
          titulo: "Ensaya en voz alta y mide el tiempo",
          texto: "Al menos dos veces: voz clara, pausas, sin muletillas, la mirada en las personas y no solo en tus notas, y de diez a quince minutos.",
        },
        {
          titulo: "Prepara el lugar, ora y graba",
          texto: "Un lugar tranquilo y con buena luz; prueba el sonido. Ora antes de hablar y confía en el poder del Espíritu, no en tu talento (1 Corintios 2:4-5).",
        },
        {
          titulo: "Pide una opinión y mejora",
          texto: "Pide a alguien de confianza que te escuche y te diga qué mejorar, y recíbelo con humildad: hierro con hierro se aguza (Proverbios 27:17).",
        },
      ],
    },
  ],
  // Historia de la iglesia I
  "n3-historia-1-4": [
    // La lección cuenta los tres concilios en prosa; el cuadro pone lado a lado el error, la confesión y la base bíblica de cada uno.
    {
      t: "cuadro",
      titulo: "Los tres grandes concilios y lo que confesaron",
      columnas: ["Concilio", "El error que enfrentó", "Lo que confesó", "Base bíblica"],
      filas: [
        [
          "Nicea (325)",
          "Arrio: el Hijo es una criatura y hubo un tiempo en que no existía",
          "El Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios",
          "Juan 1:1-3",
        ],
        [
          "Constantinopla (381)",
          "Los que negaban que el Espíritu Santo fuera Dios como el Padre y el Hijo",
          "Completó el credo de Nicea: el Espíritu, con el Padre y el Hijo, es adorado y glorificado",
          "Mateo 28:19; Hechos 5:3-4",
        ],
        [
          "Calcedonia (451)",
          "Los que mezclaban la divinidad y la humanidad de Cristo, o lo dividían en dos personas",
          "Cristo es una sola persona, verdadero Dios y verdadero hombre, en dos naturalezas, sin mezcla y sin división",
          "Juan 1:14; Colosenses 2:9",
        ],
      ],
    },
  ],
  "n3-historia-1-5": [
    // La lección recorre ocho siglos solo en prosa; la línea ordena a Agustín, los monjes, las misiones y los cambios de la Edad Media.
    {
      t: "linea",
      titulo: "Agustín, los monjes y la Edad Media: siglos III al XI",
      eventos: [
        {
          fecha: "Fines del siglo III",
          texto: "Antonio de Egipto se va al desierto para llevar una vida apartada y entregada a Dios.",
        },
        {
          fecha: "386",
          texto: "Agustín, nacido en Tagaste en 354, oye en Milán una voz que dice: toma y lee. Entonces abre las cartas de Pablo y se convierte.",
          ref: "Romanos 13:13-14",
        },
        {
          fecha: "410",
          texto: "Roma es saqueada; en respuesta, Agustín escribirá La ciudad de Dios: los imperios caen, pero el reino de Dios permanece.",
        },
        {
          fecha: "430",
          texto: "Muere Agustín, obispo de Hipona. Frente a Pelagio había enseñado que la salvación es por gracia, no por las propias fuerzas.",
          ref: "Efesios 2:8-9",
        },
        { fecha: "Siglo V", texto: "Patricio lleva el evangelio a Irlanda.", ref: "Mateo 28:19-20" },
        {
          fecha: "476",
          texto: "Cae el Imperio romano de Occidente, y la iglesia queda como la institución más fuerte de Europa.",
        },
        {
          fecha: "c. 530",
          texto: "Benito de Nursia escribe una regla para los monasterios: oración, lectura y trabajo.",
        },
        { fecha: "Siglo VIII", texto: "Bonifacio predica el evangelio en Germania." },
        {
          fecha: "1054",
          texto: "El gran cisma separa las iglesias de Oriente y de Occidente: de ahí vienen la ortodoxa y la católica romana.",
        },
        { fecha: "1095", texto: "Comienzan las cruzadas para tomar Jerusalén por las armas, con mucha violencia." },
      ],
    },
  ],
  "n3-historia-1-6": [
    // La lección no tiene video y da sus fechas solo en prosa; la línea muestra en orden cómo la Biblia volvió al pueblo, hasta la Reina-Valera.
    {
      t: "linea",
      titulo: "Volver a la Palabra: de Valdo a la Reina-Valera",
      eventos: [
        {
          fecha: "c. 1173",
          texto: "Pedro Valdo, comerciante rico de Lyon, deja sus riquezas, hace traducir partes de la Biblia a la lengua del pueblo y predica.",
          ref: "Hechos 5:29",
        },
        {
          fecha: "c. 1330-1384",
          texto: "Juan Wiclef, profesor en Oxford, enseña que la Biblia está por encima del papa, y sus seguidores la traducen toda al inglés.",
        },
        {
          fecha: "1415",
          texto: "El 6 de julio, Juan Hus, que predicaba en Praga en la lengua del pueblo, muere en la hoguera, condenado por el Concilio de Constanza.",
          ref: "Hebreos 13:7",
        },
        {
          fecha: "c. 1455",
          texto: "Juan Gutenberg imprime en Alemania la primera Biblia con tipos móviles, y los libros se vuelven más baratos.",
        },
        {
          fecha: "1516",
          texto: "Erasmo publica el Nuevo Testamento en griego: los estudiosos pueden leerlo en su idioma original.",
        },
        {
          fecha: "1517",
          texto: "El 31 de octubre, Martín Lutero publica sus 95 tesis en Wittenberg, y comienza la Reforma.",
        },
        { fecha: "1569", texto: "Casiodoro de Reina publica su traducción de la Biblia completa al español." },
        {
          fecha: "1602",
          texto: "Cipriano de Valera publica su revisión de la obra de Reina; de ella viene la Reina-Valera de 1960.",
          ref: "Isaías 40:8",
        },
      ],
    },
  ],
  // Cuidado y consejería básica
  "n3-consejeria-basica-1": [
    // Ordena en un vistazo los tres niveles que la lección da en lista, para que el alumno ubique cada caso en el nivel que le corresponde.
    {
      t: "cuadro",
      titulo: "Los tres niveles de ayuda",
      columnas: ["Nivel", "Quién ayuda", "Qué hace o atiende"],
      filas: [
        [
          "El cuidado entre hermanos",
          "Todo creyente; el maduro puede animar y aconsejar con la Palabra (Romanos 15:14)",
          "Escucha, ora, anima con la Palabra y acompaña; es el centro de esta materia",
        ],
        [
          "La consejería pastoral",
          "El pastor y los líderes preparados",
          "Acompaña problemas más hondos, como las crisis de familia o el pecado que se repite",
        ],
        [
          "La ayuda profesional",
          "Médicos, psicólogos y consejeros profesionales",
          "Atiende lo que pide una formación especial, como la depresión grave, las adicciones o los traumas",
        ],
      ],
    },
  ],
  "n3-consejeria-basica-4": [
    // La lección explica en un párrafo el orden de la ayuda en una crisis; los pasos lo vuelven una guía fácil de recordar en el momento en que hace falta.
    {
      t: "pasos",
      titulo: "Primeros pasos en una crisis, como Dios con Elías",
      pasos: [
        {
          titulo: "A salvo, calmada y acompañada",
          texto: "Ante un accidente, una enfermedad grave, la pérdida del trabajo o una ruptura, lo primero es la seguridad y la calma de la persona. No la dejes sola.",
        },
        {
          titulo: "Lo básico antes que el discurso",
          texto: "Dios no regañó a Elías: primero lo dejó dormir y le dio de comer (1 Reyes 19:5-8). Cuida el descanso, la comida y lo práctico.",
        },
        {
          titulo: "Escucha y habla después",
          texto: "Solo después Dios le habló. Deja que la persona cuente lo que vive, sin regañarla; la Palabra y el consejo llegan a su tiempo.",
        },
        {
          titulo: "La red de apoyo",
          texto: "Ayúdala a buscar a su familia y a la iglesia, para que no lleve sola su carga (Gálatas 6:2).",
        },
        {
          titulo: "Si hace falta, los profesionales",
          texto: "Cuando la crisis pide una formación especial, ayúdala a buscar a los profesionales y sigue a su lado: derivar no es abandonar.",
        },
        {
          titulo: "Si habla de morir, busca ayuda ya",
          texto: "Tómalo siempre en serio, no lo guardes en secreto y no dejes sola a la persona. En la lección 5 verás qué hacer.",
        },
      ],
    },
  ],
  "n3-consejeria-basica-5": [
    // Ante el riesgo de suicidio hay que actuar sin dudar: los pasos dejan claro qué hacer y en qué orden, con los números de ayuda a la mano.
    {
      t: "pasos",
      titulo: "Si alguien habla de quitarse la vida",
      pasos: [
        {
          titulo: "Tómalo siempre en serio",
          texto: "No le digas que exagera ni esperes a ver si se le pasa. La Escritura manda salvar a los que están en peligro de muerte (Proverbios 24:11).",
        },
        {
          titulo: "Pregunta con calma",
          texto: "Pregúntale si está pensando en hacerse daño. Preguntar no le da la idea, y puede salvarle la vida.",
        },
        {
          titulo: "No la dejes sola",
          texto: "Quédate con la persona mientras buscas ayuda. Tu presencia la acompaña y la protege.",
        },
        {
          titulo: "No prometas guardar el secreto",
          texto: "Cuando hay peligro para la vida, el secreto no se guarda. Dile con amor que vas a buscar ayuda para cuidarla.",
        },
        {
          titulo: "Avisa de inmediato",
          texto: "Avisa a tu pastor y a su familia. Si hay peligro inmediato, llama al 911 en los Estados Unidos o al número de emergencias de tu país.",
        },
        {
          titulo: "La línea 988, de día y de noche",
          texto: "En los Estados Unidos, la línea 988 de prevención del suicidio y crisis atiende a toda hora. En español: marca 988 y presiona 2, o envía AYUDA por texto al 988.",
        },
        {
          titulo: "Sigue cerca",
          texto: "Derivar es seguir amando: ora por la persona, visítala y anímala a seguir el tratamiento o el acompañamiento que recibe.",
        },
      ],
    },
  ],
  // Teología sistemática I: la Biblia y Dios
  "n4-sistematica-1-1": [
    // La lección presenta las dos revelaciones en párrafos seguidos; el cuadro las pone lado a lado y fija por qué solo la especial anuncia el evangelio.
    {
      t: "cuadro",
      titulo: "Revelación general y revelación especial",
      columnas: ["Aspecto", "Revelación general", "Revelación especial"],
      filas: [
        [
          "¿Por qué medio?",
          "La creación y la conciencia",
          "Los hechos de Dios en la historia, su palabra a profetas y apóstoles y, sobre todo, su Hijo",
        ],
        [
          "¿A quién llega?",
          "A todas las personas, en todo lugar (Salmos 19:4)",
          "A quienes oyen su Palabra, que quedó escrita en la Biblia",
        ],
        [
          "¿Qué da a conocer?",
          "Su eterno poder y deidad, y la obra de su ley escrita en el corazón",
          "A Dios como Padre, por medio de su Hijo, y su salvación",
        ],
        [
          "¿Basta para salvar?",
          "No: deja a todos sin excusa y muestra nuestra culpa, pero no anuncia el evangelio",
          "Anuncia el evangelio de Cristo, que se recibe por la fe al oír la Palabra (Romanos 10:17)",
        ],
        ["Textos clave", "Salmos 19:1-4; Romanos 1:19-20; Romanos 2:14-15", "Hebreos 1:1-2; Juan 1:18; Juan 14:9"],
      ],
    },
  ],
  "n4-sistematica-1-3": [
    // La lección no tiene video y resume en un párrafo cómo nos llegó el texto; la línea ordena en el tiempo las copias y los hallazgos que lo respaldan, hasta la RV1960 que lee el alumno.
    {
      t: "linea",
      titulo: "Cómo nos llegó la Biblia: de las copias antiguas a la RV1960",
      eventos: [
        {
          fecha: "c. siglo II a. C.",
          texto: "Se copia en hebreo el Gran Rollo de Isaías, con todo el libro; es uno de los rollos que en 1947 se hallarán en Qumrán.",
        },
        {
          fecha: "Siglo I d. C.",
          texto: "Los apóstoles y sus colaboradores escriben en griego los libros del Nuevo Testamento. Los escritos originales no se conservan.",
        },
        {
          fecha: "c. siglo II d. C.",
          texto: "Se copia el Papiro 52, con versículos de Juan 18: uno de los manuscritos más antiguos del Nuevo Testamento; su fecha exacta se discute.",
          ref: "Juan 18:31-33",
        },
        {
          fecha: "Siglo IV",
          texto: "Se copian los códices Vaticano y Sinaítico, Biblias en griego escritas en pergamino; el Sinaítico conserva todo el Nuevo Testamento.",
        },
        {
          fecha: "c. 1008 d. C.",
          texto: "Se copia el Códice de Leningrado, el manuscrito completo más antiguo que se conserva de la Biblia hebrea.",
        },
        {
          fecha: "1569",
          texto: "Casiodoro de Reina publica en Basilea la Biblia del Oso, la primera Biblia completa en castellano traducida del hebreo y del griego.",
        },
        {
          fecha: "1602",
          texto: "Cipriano de Valera publica en Ámsterdam su revisión de la Biblia de Reina: de ahí el nombre Reina-Valera.",
        },
        {
          fecha: "1947",
          texto: "Se descubren en Qumrán, junto al mar Muerto, rollos del Antiguo Testamento unos mil años más antiguos que las copias conocidas.",
          ref: "Isaías 40:8",
        },
        {
          fecha: "1960",
          texto: "Las Sociedades Bíblicas publican la revisión de 1960 de la Reina-Valera, la versión que usa esta academia.",
        },
      ],
    },
  ],
  "n4-sistematica-1-5": [
    // La lección reparte los atributos entre una lista y un párrafo; el cuadro los reúne con su pasaje y su aplicación, que es lo que pide el objetivo o5.
    {
      t: "cuadro",
      titulo: "Los atributos de Dios: qué significan y qué cambian en tu vida",
      columnas: ["Atributo", "Qué significa", "Pasaje", "Para la vida"],
      filas: [
        [
          "Eterno (solo de Dios)",
          "No tiene principio ni fin",
          "Salmos 90:2",
          "Ha sido refugio de su pueblo de generación en generación (Salmos 90:1)",
        ],
        [
          "Inmutable (solo de Dios)",
          "No cambia en su ser, en su carácter ni en sus promesas",
          "Malaquías 3:6",
          "Sus promesas de hoy son tan firmes como las que hizo a Abraham",
        ],
        [
          "Omnipresente (solo de Dios)",
          "Está en todo lugar con todo su ser",
          "Salmos 139:7-10",
          "Nunca estás solo: no hay lugar donde él no esté",
        ],
        [
          "Omnisciente (solo de Dios)",
          "Lo sabe todo, también lo que pensamos",
          "Salmos 139:1-4",
          "Puedes orarle con sinceridad: conoce tus palabras aun antes de que las digas",
        ],
        [
          "Omnipotente (solo de Dios)",
          "Puede hacer todo lo que quiere, de acuerdo con su naturaleza",
          "Jeremías 32:17",
          "Nada es difícil para él: llévale en oración lo que parece imposible",
        ],
        [
          "Santo (lo comparte en parte)",
          "Su perfección moral y su separación de todo lo malo",
          "Isaías 6:3",
          "Llama a sus hijos a ser santos en toda su manera de vivir (1 Pedro 1:15-16)",
        ],
        [
          "Amor (lo comparte en parte)",
          "Da sin que lo merezcamos: envió a su Hijo en propiciación por nuestros pecados",
          "1 Juan 4:8-10",
          "Si Dios nos amó así, debemos amarnos unos a otros (1 Juan 4:11)",
        ],
        [
          "Justo y fiel (lo comparte en parte)",
          "Todos sus caminos son rectitud, y sus misericordias son nuevas cada mañana",
          "Deuteronomio 32:4; Lamentaciones 3:22-23",
          "Sus promesas se cumplen, y en la cruz es el justo y el que justifica al que cree (Romanos 3:26)",
        ],
      ],
    },
  ],
  // Teología sistemática II: Cristo y el Espíritu Santo
  "n4-sistematica-2-1": [
    // comprobado: oEmbed de YouTube respondió: título Por qué Jesús se llamó a sí mismo el Hijo del Hombre; canal Proyecto Biblia (6:02). Según el guion original de BibleProject (Son of Man), el Hijo del Hombre de Daniel 7 se sienta en el trono divino y es adorado junto a Dios, y Jesús reclama ese título ante el sanedrín (Mateo 26:63-64).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=e2ILANmZ4Kk",
      titulo: "Por qué Jesús se llamó a sí mismo el Hijo del Hombre",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n4-sistematica-2-2": [
    // Pone lado a lado los cuatro errores que nombra la lección, la verdad que cada uno niega y su respuesta bíblica, para que el alumno no los confunda.
    {
      t: "cuadro",
      titulo: "Los errores sobre la persona de Cristo y la fe de Calcedonia",
      columnas: ["Postura", "Qué enseña", "Qué niega o deforma", "Respuesta de la Escritura"],
      filas: [
        [
          "Docetismo",
          "Jesús solo parecía hombre: su cuerpo era una apariencia.",
          "Su verdadera humanidad.",
          "Participó de carne y sangre (Hebreos 2:14) y crecía en sabiduría y en estatura (Lucas 2:52).",
        ],
        [
          "Arrianismo",
          "El Hijo era la primera y más alta criatura, pero no Dios eterno.",
          "Su verdadera deidad.",
          "El Verbo era Dios y todo fue hecho por él (Juan 1:1-3); Nicea (325) lo confesó de la misma sustancia que el Padre.",
        ],
        [
          "Nestorianismo",
          "Dividía a Cristo en dos personas, una divina y otra humana.",
          "La unidad de su persona.",
          "Hay un solo mediador, Jesucristo hombre (1 Timoteo 2:5), y el Verbo mismo fue hecho carne (Juan 1:14).",
        ],
        [
          "Eutiquianismo",
          "Mezclaba las dos naturalezas en una sola.",
          "La distinción de sus dos naturalezas.",
          "Siendo en forma de Dios, tomó forma de siervo (Filipenses 2:6-7): es Dios y es hombre, sin mezcla.",
        ],
        [
          "Fe de Calcedonia (451)",
          "Una sola persona en dos naturalezas, la divina y la humana: la unión hipostática.",
          "Nada: las une sin mezcla ni cambio, sin división ni separación.",
          "Verdadero Dios y verdadero hombre: por eso es el único mediador (1 Timoteo 2:5).",
        ],
      ],
    },
  ],
  "n4-sistematica-2-3": [
    // comprobado: oEmbed de YouTube respondió: título Sacrificio y Propiciación; canal Proyecto Biblia (6:11). Según el guion original de BibleProject (Sacrifice and Atonement), el sacrificio muere en lugar del pecador, y la muerte de Jesús es rescate (Marcos 10:45) y sacrificio de expiación (Romanos 3:25), seguida de su resurrección.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=54xtkWfl840",
      titulo: "Sacrificio y propiciación",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n4-sistematica-2-4": [
    // comprobado: oEmbed de YouTube respondió: título Evangelio de Lucas 24; canal Proyecto Biblia (5:36). Su descripción en el canal: los discípulos hallan la tumba vacía y se encuentran con Jesús resucitado, y Lucas prepara la continuación en Hechos.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=WHlHoQy3bVk",
      titulo: "Evangelio de Lucas 24: la resurrección",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n4-sistematica-2-5": [
    // Ubica en el tiempo lo que enseña la lección: la promesa de Juan 15:26, la confesión de Constantinopla y el debate posterior entre Oriente y Occidente.
    {
      t: "linea",
      titulo: "La iglesia confiesa al Espíritu Santo: de Juan 15:26 al Filioque",
      eventos: [
        {
          fecha: "c. 30-33 d. C.",
          texto: "Jesús promete el Consolador, el Espíritu de verdad, que procede del Padre y que él enviará.",
          ref: "Juan 15:26",
        },
        {
          fecha: "325",
          texto: "Nicea confiesa al Hijo de la misma sustancia que el Padre; del Espíritu, su credo solo dice que creemos en él.",
        },
        {
          fecha: "c. 360",
          texto: "Los pneumatómacos (los que combaten al Espíritu) niegan que sea Dios; Atanasio les responde en sus cartas a Serapión.",
        },
        {
          fecha: "c. 375",
          texto: "Basilio de Cesarea escribe el tratado Sobre el Espíritu Santo, en defensa de su deidad y de su gloria junto al Padre y al Hijo.",
        },
        {
          fecha: "381",
          texto: "Constantinopla lo confiesa Señor y dador de vida, que procede del Padre y con el Padre y el Hijo es adorado y glorificado.",
        },
        {
          fecha: "451",
          texto: "El concilio de Calcedonia lee y aprueba el credo de 381, que hoy se llama niceno-constantinopolitano.",
        },
        {
          fecha: "589",
          texto: "Se considera que el tercer concilio de Toledo añadió al texto latino del credo que el Espíritu procede del Padre y del Hijo (Filioque).",
        },
        {
          fecha: "1054",
          texto: "Oriente y Occidente se separan, y la disputa sobre el Filioque es una de las causas de la ruptura.",
        },
      ],
    },
  ],
  "n4-sistematica-2-6": [
    // Convierte en un método que el líder puede seguir en el culto las pruebas que da la lección para discernir, junto con las de 1 Corintios 13 y 14.
    {
      t: "pasos",
      titulo: "Cómo examinar una manifestación espiritual en la iglesia",
      pasos: [
        {
          titulo: "¿Confiesa a Jesucristo venido en carne?",
          texto: "Es la primera prueba: el espíritu que confiesa que Jesucristo ha venido en carne es de Dios, y el que no lo confiesa no es de Dios (1 Juan 4:1-3).",
        },
        {
          titulo: "¿Concuerda con la Escritura?",
          texto: "La Biblia es la autoridad final: nadie, ni un ángel del cielo, puede anunciar otro evangelio (Gálatas 1:8). Como en Berea, se escudriñan las Escrituras (Hechos 17:11).",
        },
        {
          titulo: "¿Edifica a la iglesia?",
          texto: "La manifestación del Espíritu se da para provecho (1 Corintios 12:7) y todo debe hacerse para edificación (1 Corintios 14:26), no para exaltar a quien la trae.",
        },
        {
          titulo: "¿Se ejerce con amor?",
          texto: "Sin amor, las lenguas, la profecía y aun la fe que traslada los montes no aprovechan (1 Corintios 13:1-3). El amor nunca deja de ser (1 Corintios 13:8).",
        },
        {
          titulo: "¿Se hace con orden?",
          texto: "En lenguas hablan dos o tres, por turno, y uno interpreta; los profetas hablan dos o tres, y los demás juzgan. Dios no es Dios de confusión, sino de paz (1 Corintios 14:27-33).",
        },
        {
          titulo: "¿Qué fruto deja?",
          texto: "Jesús enseñó que a los falsos profetas se los reconoce por sus frutos (Mateo 7:15-20): se mira la vida de quien ministra y lo que produce en la iglesia.",
        },
        {
          titulo: "Retener lo bueno sin apagar al Espíritu",
          texto: "No se apaga al Espíritu ni se menosprecian las profecías: se examina todo y se retiene lo bueno (1 Tesalonicenses 5:19-21), sin impedir el hablar lenguas (1 Corintios 14:39).",
        },
      ],
    },
  ],
  // Teología sistemática III: el hombre, el pecado y la salvación
  "n4-sistematica-3-2": [
    // comprobado: oEmbed respondió título: El pecado implica más de lo que te imaginas (te lo explicaremos); canal: Proyecto Biblia. Es Khata / Pecado, serie Malas palabras (bibleproject.com/es/videos/khata-pecado/). Su guion: el pecado como fallar en amar a Dios y al prójimo, su poder (Romanos 5–7) y Cristo que cargó nuestros pecados (1 Pedro 2:22-24).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=Nt5vWY81H30",
      titulo: "El pecado implica más de lo que te imaginas",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n4-sistematica-3-3": [
    // La lección compara dos posiciones llenas de matices; verlas lado a lado, junto a lo que comparten, ayuda a compararlas con respeto (objetivo o3).
    {
      t: "cuadro",
      titulo: "Calvinismo y arminianismo: en qué difieren y en qué coinciden",
      columnas: ["Tema", "Calvinismo", "Arminianismo", "En lo que coinciden"],
      filas: [
        [
          "En la línea de",
          "Juan Calvino y el Sínodo de Dort (1618 y 1619)",
          "Jacobo Arminio y luego Juan Wesley; la ha seguido la mayoría de las iglesias pentecostales",
          "Las dos son posiciones evangélicas; la declaración de fe del ministerio no entra en esta pregunta",
        ],
        [
          "La elección",
          "Dios elige a quienes salvará sin depender de nada en ellos",
          "Dios elige a los que sabe de antemano que creerán",
          "La Biblia enseña una elección en Cristo desde antes de la fundación del mundo (Efesios 1:4-6)",
        ],
        [
          "La gracia",
          "La gracia de Dios lleva a los elegidos con seguridad a la fe",
          "Dios da a todos una gracia que les permite responder",
          "La gracia toma la iniciativa: nadie viene a Cristo si el Padre no lo trae (Juan 6:44)",
        ],
        [
          "Lo que subraya",
          "Que la salvación es toda de Dios, de la elección a la gloria (Romanos 8:29-30)",
          "Que Dios quiere que todos sean salvos y no quiere que ninguno perezca (1 Timoteo 2:4; 2 Pedro 3:9)",
          "Solo por gracia; el ser humano es responsable de arrepentirse y creer, y el evangelio se anuncia a todos",
        ],
      ],
    },
    // comprobado: oEmbed respondió título: La respuesta constante de Dios a pesar de tus errores; canal: Proyecto Biblia. Es Khen / Gracia, serie Carácter de Dios (bibleproject.com/es/videos/khen-gracia/). Su guion presenta la gracia como favor inmerecido, de Éxodo 34:6 a Juan 1:14 y Efesios 2:8. No toca la elección.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=CZtgCMtuoJo",
      titulo: "Gracia: la respuesta constante de Dios a pesar de tus errores",
      fuente: "Proyecto Biblia",
      minutos: 5,
    },
  ],
  "n4-sistematica-3-4": [
    // El objetivo o4 pide distinguir tres verdades que suelen confundirse; el cuadro muestra qué es cada una, quién obra, qué cambia y su fruto.
    {
      t: "cuadro",
      titulo: "Conversión, regeneración y justificación: qué es cada una",
      columnas: ["Pregunta", "Conversión", "Regeneración", "Justificación"],
      filas: [
        [
          "Qué es",
          "Arrepentirse, que es dar la espalda al pecado, y creer, que es volverse a Cristo y confiar en él",
          "El nuevo nacimiento: el Espíritu hace del creyente una nueva criatura",
          "Una declaración de Dios, como la sentencia de un juez: el pecador que cree es declarado justo",
        ],
        [
          "Quién obra",
          "El ser humano, que responde a la gracia de Dios",
          "El Espíritu Santo, no el esfuerzo humano",
          "Dios, que justifica al impío que cree, sin las obras de la ley",
        ],
        [
          "Qué cambia",
          "La dirección de la vida: del pecado hacia Dios",
          "La naturaleza: le da una vida nueva desde adentro",
          "La posición ante Dios: de culpable a justo",
        ],
        [
          "Su fruto",
          "Los pecados son borrados (Hechos 3:19)",
          "Las cosas viejas pasaron y todo es hecho nuevo",
          "Paz para con Dios por medio de Jesucristo (Romanos 5:1)",
        ],
        ["Texto clave", "Hechos 20:21", "2 Corintios 5:17", "Romanos 3:28; Romanos 4:3-5; Gálatas 2:16"],
      ],
    },
  ],
  "n4-sistematica-3-6": [
    // El sílabo pide acompañar con la Escritura a quien duda de su salvación; los pasos llevan la lección a la práctica sin tomar partido en la perseverancia.
    {
      t: "pasos",
      titulo: "Cómo acompañar a un hermano que duda de su salvación",
      pasos: [
        {
          titulo: "Escucha de dónde viene la duda",
          texto: "Pregunta con calma qué lo hace dudar: un pecado, una prueba, una emoción o una enseñanza que oyó. Escucha antes de responder y no lo avergüences.",
        },
        {
          titulo: "Vuelve con él al evangelio",
          texto: "La salvación es por gracia, por medio de la fe en Cristo, y no por obras (Efesios 2:8-9); tampoco depende de lo que uno siente. Pregúntale si se ha arrepentido y si confía en Cristo.",
        },
        {
          titulo: "Afírmalo en las promesas",
          texto: "Lean juntos Romanos 8:38-39, Juan 10:28-29 y 1 Juan 5:13: su seguridad descansa en el amor de Dios y en la fidelidad de Cristo, no en lo fuerte que se siente.",
        },
        {
          titulo: "Si teme perderla, presenta las dos posiciones",
          texto: "Para los calvinistas, quien nació de nuevo nunca la pierde; para los arminianos, puede perderla quien se aparta de manera definitiva. El ministerio aún debe confirmar su posición.",
        },
        {
          titulo: "Anímalo a hacer firme su vocación",
          texto: "Las dos posiciones llaman a lo mismo: hacer firme la vocación (2 Pedro 1:10) y permanecer en Cristo con la Palabra, la oración y la iglesia. Si un pecado lo acusa, guíalo a confesarlo (1 Juan 1:9).",
        },
        {
          titulo: "Sigue a su lado",
          texto: "Ora con él, déjale un pasaje para la semana y vuelve a buscarlo. La duda se acompaña con paciencia: no se resuelve en una sola conversación.",
        },
      ],
    },
    // comprobado: oEmbed respondió título: Resumen del libro de Romanos: un panorama completo animado (parte 2); canal: Proyecto Biblia. Cubre Romanos 5–16, con Romanos 8, y ya se usa en otras materias de la academia.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=ZqScL0dHLsM",
      titulo: "Resumen del libro de Romanos (parte 2)",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  // Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos
  "n4-sistematica-4-3": [
    // La lección explica las dos ordenanzas en un solo párrafo; el cuadro las pone lado a lado para comparar quién las ordenó, quiénes las reciben, cómo se celebran y qué significan.
    {
      t: "cuadro",
      titulo: "Las dos ordenanzas: el bautismo en agua y la Santa Cena",
      columnas: ["Aspecto", "El bautismo en agua", "La Santa Cena"],
      filas: [
        [
          "Quién la ordenó",
          "Cristo, al dar la gran comisión (Mateo 28:19)",
          "Cristo, la noche en que fue entregado (1 Corintios 11:23-25)",
        ],
        [
          "Quiénes la reciben",
          "Los que se arrepintieron y creyeron (Hechos 2:38-41)",
          "Los creyentes, que se examinan a sí mismos (1 Corintios 11:28)",
        ],
        [
          "Cómo se celebra",
          "En agua, por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo",
          "Con el pan y la copa, que se toman en memoria de Cristo (1 Corintios 11:24-25)",
        ],
        [
          "Qué significa",
          "Testimonio de que murieron al pecado y resucitaron a una vida nueva (Romanos 6:4)",
          "Memorial de su muerte, comunión con Cristo y con su pueblo, y anuncio de su venida (1 Corintios 10:16-17; 11:26)",
        ],
      ],
    },
    // comprobado: oEmbed de YouTube respondió el título ¿Qué significa dar testimonio? y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 4:52.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=C5JAZuSpYfQ",
      titulo: "¿Qué significa dar testimonio?",
      fuente: "Proyecto Biblia",
      minutos: 5,
    },
  ],
  "n4-sistematica-4-4": [
    // comprobado: oEmbed de YouTube respondió el título Ángeles, querubines y su rol en el reino espiritual y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 5:31. Es el episodio Ángeles y querubines de la serie Dios y los seres espirituales (bibleproject.com/es/videos/angeles-y-querubines/).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=35Tzm7hmoOc",
      titulo: "Ángeles, querubines y su rol en el reino espiritual",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  "n4-sistematica-4-5": [
    // Junto a una tumba el líder tiene que distinguir enseguida la esperanza bíblica de los tres errores de la nota; el cuadro pone cada error frente a la Escritura.
    {
      t: "cuadro",
      titulo: "Después de la muerte: tres errores y lo que enseña la Biblia",
      columnas: ["Idea", "Qué enseña", "Base o respuesta bíblica"],
      filas: [
        [
          "La reencarnación",
          "Que el ser humano vuelve a nacer en otra vida",
          "Se muere una sola vez, y después viene el juicio (Hebreos 9:27)",
        ],
        [
          "El sueño del alma",
          "Que el muerto queda sin conciencia hasta la resurrección (adventistas y testigos de Jehová)",
          "Pablo esperaba estar presente al Señor al dejar el cuerpo (2 Corintios 5:8)",
        ],
        [
          "El purgatorio",
          "Que hay una purificación después de la muerte (iglesia católica)",
          "No aparece en la Escritura: la obra de Cristo basta para limpiar al creyente (Hebreos 10:14; Lucas 23:43)",
        ],
        [
          "Lo que enseña la Biblia",
          "El creyente está con Cristo, consciente y en paz; el que murió sin Cristo espera el juicio",
          "Filipenses 1:21-23; 2 Corintios 5:8; Lucas 23:43; Hebreos 9:27",
        ],
        [
          "La esperanza final",
          "Todos resucitarán: unos para vida y otros para condenación",
          "El cuerpo del creyente resucitará incorruptible y glorioso (Juan 5:28-29; 1 Corintios 15:42-44)",
        ],
      ],
    },
  ],
  "n4-sistematica-4-6": [
    // La lección presenta cinco posiciones en párrafos y en una lista; el cuadro empieza por lo que todos confiesan y ordena las posiciones lado a lado, sin tomar partido.
    {
      t: "cuadro",
      titulo: "El arrebatamiento y el milenio: las posiciones evangélicas",
      columnas: ["Posición", "Qué enseña", "Quiénes la sostienen"],
      filas: [
        [
          "Lo que todos confiesan",
          "Cristo volverá en persona y de manera visible; los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas",
          "Todos los cristianos; el ministerio aún debe confirmar el orden de los últimos tiempos (artículo 16)",
        ],
        [
          "Pretribulacionismo",
          "El arrebatamiento ocurrirá antes de la gran tribulación",
          "Las Asambleas de Dios y muchas iglesias pentecostales",
        ],
        [
          "Postribulacionismo",
          "El arrebatamiento ocurrirá al final de la tribulación, en la venida visible de Cristo",
          "Otros evangélicos; hay también posiciones intermedias",
        ],
        [
          "Premilenarismo",
          "Cristo vendrá antes del milenio y reinará mil años en la tierra",
          "Las Asambleas de Dios y muchos evangélicos",
        ],
        [
          "Amilenarismo",
          "Los mil años son una figura del reinado presente de Cristo, desde su resurrección hasta su venida",
          "La sistematizó Agustín; es la más común en la iglesia católica y en muchas iglesias reformadas y luteranas",
        ],
        [
          "Postmilenarismo",
          "El evangelio se extenderá y traerá un largo tiempo de paz; después vendrá Cristo",
          "Muchos puritanos y Jonathan Edwards",
        ],
      ],
    },
    // comprobado: oEmbed de YouTube respondió el título Estudiamos el “Día del Señor” en la Biblia (esto es lo que encontramos) y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 6:13. Es el video Día del Señor de la colección Temas bíblicos (bibleproject.com/es/videos/dia-del-senor/).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=ioMYiUOC2mk",
      titulo: "Día del Señor",
      fuente: "Proyecto Biblia",
      minutos: 6,
    },
  ],
  // Libros poéticos y proféticos
  "n4-poeticos-profeticos-2": [
    // La lección es toda prosa; el cuadro pone lado a lado la pregunta, el error, lo que se descubre y la conclusión de cada libro (objetivo o2).
    {
      t: "cuadro",
      titulo: "Job y Eclesiastés: dos libros para cuando la vida no se entiende",
      columnas: ["Aspecto", "Job", "Eclesiastés"],
      filas: [
        ["La pregunta", "¿Por qué sufre una persona justa?", "¿Qué sentido tiene la vida si todo pasa pronto?"],
        [
          "La respuesta equivocada",
          "La de sus amigos: todo sufrimiento es castigo por algún pecado; Dios los reprendió (Job 42:7).",
          "Buscar el sentido solo bajo el sol: en el placer, el trabajo, la riqueza y aun la sabiduría.",
        ],
        [
          "Lo que se descubre",
          "Dios no le explica todo a Job, sino que se le revela desde el torbellino (Job 38:1-4).",
          "Todo eso es vapor: pasa pronto, no se puede atrapar y no llena el corazón (Eclesiastés 1:2-3).",
        ],
        [
          "La conclusión",
          "Job, que había oído de Dios, ahora lo ve; se humilla y confía en él (Job 42:5-6).",
          "Temer a Dios y guardar sus mandamientos, porque él juzgará toda obra (Eclesiastés 12:13-14).",
        ],
        [
          "Para la vida hoy",
          "Acompañar al que sufre con humildad, sin acusarlo, y dejar en manos de Dios lo que no entendemos.",
          "No esperar que el placer, el trabajo o la riqueza llenen el corazón, y vivir cada día delante de Dios.",
        ],
      ],
    },
  ],
  "n4-poeticos-profeticos-3": [
    // El objetivo o3 pide orar con los lamentos; los pasos convierten el Salmo 13 de la lección en un camino que el alumno puede seguir en su propio dolor.
    {
      t: "pasos",
      titulo: "Cómo orar con un salmo de lamento: el ejemplo del Salmo 13",
      pasos: [
        {
          titulo: "Lee el salmo despacio",
          texto: "Lee el Salmo 13 en voz alta, si puedes. Fíjate en lo que siente David, en sus preguntas y en cómo cambia su tono del principio al final.",
        },
        {
          titulo: "Lleva tu queja con honestidad",
          texto: "David pregunta cuatro veces hasta cuándo (Salmos 13:1-2). Dile a Dios con sinceridad lo que sientes, también tus preguntas: no tienes que esconderle nada.",
        },
        {
          titulo: "Convierte la queja en petición",
          texto: "David le pide a Dios que lo mire, que le responda y que alumbre sus ojos (Salmos 13:3-4). Pide con palabras concretas lo que necesitas.",
        },
        {
          titulo: "Declara tu confianza",
          texto: "David termina confiando en la misericordia de Dios y cantándole por el bien que le ha hecho (Salmos 13:5-6). Recuerda también lo que Dios ya hizo por ti.",
        },
        {
          titulo: "Haz tuya la oración",
          texto: "Ora con tus propias palabras siguiendo el mismo camino: queja, petición y confianza. Vuelve a él cada vez que el dolor no te deje saber qué decirle a Dios.",
        },
      ],
    },
  ],
  "n4-poeticos-profeticos-5": [
    // La lección agrupa a los profetas por épocas, sin fechas; la línea los ubica en la historia de Israel, frente a Asiria, frente a Babilonia y después del regreso (objetivo o5).
    {
      t: "linea",
      titulo: "Los profetas en su tiempo: de Amós a Malaquías",
      eventos: [
        {
          fecha: "c. 760 a. C.",
          texto: "Bajo Jeroboam II, Amós y luego Oseas llaman al reino del norte a dejar la idolatría y la injusticia. Jonás es de ese mismo siglo.",
          ref: "Amós 1:1",
        },
        {
          fecha: "c. 740 a. C.",
          texto: "El año en que murió el rey Uzías, Isaías ve al Señor sentado en un trono alto. Poco después, en Judá, profetiza también Miqueas.",
          ref: "Isaías 6:1",
        },
        {
          fecha: "c. 722 a. C.",
          texto: "Asiria toma Samaria y lleva cautivo al reino del norte, como le habían advertido sus profetas.",
          ref: "2 Reyes 17:6",
        },
        {
          fecha: "c. 626 a. C.",
          texto: "Dios llama a Jeremías en el año trece del rey Josías; profetizará hasta que Jerusalén sea llevada cautiva.",
          ref: "Jeremías 1:2-3",
        },
        {
          fecha: "c. 605 a. C.",
          texto: "Nabucodonosor lleva a Babilonia a Daniel y a otros jóvenes de Judá. En esos años, Dios le muestra a Habacuc que levanta a los caldeos.",
          ref: "Daniel 1:1-6",
        },
        {
          fecha: "c. 593 a. C.",
          texto: "Entre los cautivos, junto al río Quebar, Ezequiel ve visiones de Dios en el quinto año de la deportación del rey Joaquín.",
          ref: "Ezequiel 1:1-3",
        },
        {
          fecha: "c. 586 a. C.",
          texto: "Babilonia quema el templo y destruye Jerusalén. Lamentaciones llora sobre la ciudad que quedó sola.",
          ref: "2 Reyes 25:8-10",
        },
        {
          fecha: "c. 538 a. C.",
          texto: "Ciro, rey de Persia, deja volver a los judíos para reedificar el templo, como Dios lo había anunciado por Jeremías.",
          ref: "Esdras 1:1-3",
        },
        {
          fecha: "520 a. C.",
          texto: "En el año segundo del rey Darío, Hageo y Zacarías animan al pueblo a reconstruir la casa de Dios.",
          ref: "Hageo 1:1",
        },
        {
          fecha: "c. 430 a. C.",
          texto: "Malaquías, el último profeta del Antiguo Testamento, llama a volver a Dios y anuncia al mensajero que preparará el camino.",
          ref: "Malaquías 3:1",
        },
      ],
    },
  ],
  // Epístolas y Apocalipsis
  "n4-epistolas-apocalipsis-1": [
    // comprobado: oEmbed de YouTube respondió el título Resumen del libro de Gálatas: un panorama completo animado y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 10:17 en YouTube. La academia ya lo usa con el título corto en otras materias.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=kMJLgLOWb3I",
      titulo: "Resumen del libro de Gálatas",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  "n4-epistolas-apocalipsis-2": [
    // comprobado: oEmbed de YouTube respondió el título Resumen del libro de 1 Corintios: un panorama completo animado y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 9:53 en YouTube. La academia ya lo usa con el título corto en otras materias.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=6f0kym4bUmE",
      titulo: "Resumen del libro de 1 Corintios",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  "n4-epistolas-apocalipsis-3": [
    // comprobado: oEmbed de YouTube respondió el título Resumen del libro de Efesios: un panorama completo animado y el canal Proyecto Biblia (https://www.youtube.com/@ProyectoBibliaOficial); dura 10:28 en YouTube. La academia ya lo usa con el título corto en otras materias.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=yJgym5MGzM4",
      titulo: "Resumen del libro de Efesios",
      fuente: "Proyecto Biblia",
      minutos: 10,
    },
  ],
  "n4-epistolas-apocalipsis-4": [
    // La lección 4 cierra las cartas de Pablo: la línea ordena en el tiempo lo visto en las lecciones 1 a 4, desde las primeras cartas hasta 2 Timoteo, la última.
    {
      t: "linea",
      titulo: "Las cartas de Pablo en el tiempo",
      eventos: [
        {
          fecha: "c. 48 (se discute)",
          texto: "Gálatas: si es anterior al concilio de Jerusalén (Hechos 15), sería su primera carta; otros la fechan unos años después.",
          ref: "Gálatas 1:6-7",
        },
        {
          fecha: "c. 50-51",
          texto: "1 y 2 Tesalonicenses, desde Corinto, a una iglesia fundada en pocas semanas (Hechos 17:1-10): esperar al Señor trabajando.",
          ref: "1 Tesalonicenses 1:9-10",
        },
        {
          fecha: "c. 53-55",
          texto: "1 Corintios, desde Éfeso: las divisiones, la inmoralidad, los pleitos, los dones, el amor y la resurrección.",
          ref: "1 Corintios 16:8",
        },
        {
          fecha: "c. 55-56",
          texto: "2 Corintios, desde Macedonia: el ministerio de la reconciliación, la ofrenda para Jerusalén y el poder en la debilidad.",
          ref: "2 Corintios 7:5",
        },
        {
          fecha: "c. 57",
          texto: "Romanos, desde Corinto, antes de llevar a Jerusalén la ofrenda de las iglesias; Pablo quería seguir hasta España.",
          ref: "Romanos 15:24-26",
        },
        {
          fecha: "c. 60-62",
          texto: "Efesios, Filipenses, Colosenses y Filemón, desde la prisión: la tradición dice que en Roma; otros proponen Éfeso o Cesarea.",
          ref: "Hechos 28:30",
        },
        {
          fecha: "c. 62-64",
          texto: "1 Timoteo y Tito, según la tradición, entre su primera y su última prisión, a sus colaboradores en Éfeso y en Creta.",
          ref: "1 Timoteo 1:3",
        },
        {
          fecha: "c. 64-67",
          texto: "2 Timoteo, su última carta, desde su segunda prisión en Roma, poco antes de morir en tiempos de Nerón, según la tradición.",
          ref: "2 Timoteo 4:6-8",
        },
      ],
    },
  ],
  "n4-epistolas-apocalipsis-5": [
    // Pone lado a lado a Pablo y a Santiago para que se vea que responden preguntas distintas y no se contradicen, el punto que más confunde de la lección.
    {
      t: "cuadro",
      titulo: "Pablo y Santiago: la fe y las obras",
      columnas: ["Aspecto", "Pablo", "Santiago"],
      filas: [
        [
          "La pregunta que responde",
          "¿Cómo es justificado el pecador delante de Dios?",
          "¿Cómo se reconoce que una fe es verdadera?",
        ],
        [
          "Las obras de que habla",
          "Las obras de la ley, que no son la base de la justificación (Romanos 3:28)",
          "Las obras que nacen de la fe y la muestran (Santiago 2:18)",
        ],
        [
          "El error que combate",
          "Confiar en la ley o en las propias obras para ser salvo (Gálatas 2:16)",
          "Una fe de solo palabras, que no cambia la vida (Santiago 2:14-17)",
        ],
        [
          "El ejemplo de Abraham",
          "Creyó a Dios y le fue contado por justicia (Romanos 4:3)",
          "Mostró su fe al ofrecer a Isaac sobre el altar (Santiago 2:21-23)",
        ],
        [
          "Su texto clave",
          "Salvos por gracia, por medio de la fe, para buenas obras (Efesios 2:8-10)",
          "La fe sin obras está muerta (Santiago 2:17)",
        ],
        [
          "En qué coinciden",
          "La fe que vale es la que obra por el amor (Gálatas 5:6)",
          "La fe actúa junto con las obras y por ellas se perfecciona (Santiago 2:22)",
        ],
      ],
    },
  ],
  "n4-epistolas-apocalipsis-6": [
    // Convierte la nota para el líder en un método paso a paso, para preparar un estudio del Apocalipsis con equilibrio y sin tomar partido en lo que se discute.
    {
      t: "pasos",
      titulo: "Cómo estudiar un pasaje del Apocalipsis",
      pasos: [
        {
          titulo: "Empieza por Cristo",
          texto: "El libro es la revelación de Jesucristo (Apocalipsis 1:1). Pregunta primero qué enseña el pasaje sobre él: su gloria, su obra como el Cordero y su victoria.",
        },
        {
          titulo: "Piensa en los primeros lectores",
          texto: "Juan escribió a siete iglesias reales de Asia (Apocalipsis 1:11): unas sufrían persecución y otras estaban tibias o en peligro. Pregunta qué les decía a ellas antes de aplicarlo a hoy.",
        },
        {
          titulo: "Lee los símbolos con la Biblia",
          texto: "El libro habla con visiones y símbolos. A veces los explica: los candeleros son las iglesias (Apocalipsis 1:20). Otros vienen del Antiguo Testamento: la bestia de Apocalipsis 13 recuerda a Daniel 7.",
        },
        {
          titulo: "Subraya lo que es claro",
          texto: "La gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final. Ese mensaje está por encima de las diferencias de interpretación.",
        },
        {
          titulo: "Compara las lecturas con respeto",
          texto: "Si el pasaje se lee distinto en las lecturas preterista, historicista, futurista e idealista, presenta las posturas con respeto. El arrebatamiento y el milenio se estudian en Teología sistemática IV.",
        },
        {
          titulo: "Aplica sin poner fechas",
          texto: "Termina con lo que el libro pide: guardar lo escrito, ser fieles y orar por la venida del Señor (Apocalipsis 1:3; 22:20). No pongas fechas ni digas con seguridad quién es hoy cada símbolo.",
        },
      ],
    },
  ],
  // Homilética II: predicación expositiva
  "n4-homiletica-2-2": [
    // Convierte la lista de pasos de la lección en un ejemplo resuelto con su mismo pasaje, para que el alumno vea cada paso hecho.
    {
      t: "pasos",
      titulo: "Del pasaje a la idea del sermón: Filipenses 4:10-13 paso a paso",
      pasos: [
        {
          titulo: "El contexto histórico",
          texto: "Quién, a quién, cuándo y por qué: Pablo escribe a la iglesia de Filipos mientras está preso, y le agradece la ofrenda que le llevó Epafrodito (Filipenses 1:13; 4:10, 18).",
        },
        {
          titulo: "El contexto literario",
          texto: "Lee el párrafo entero y no solo el versículo 13: los versículos 11 y 12 lo preparan y el 14 vuelve a la ofrenda. Es una carta, y este párrafo es la nota de gratitud de su final.",
        },
        {
          titulo: "Las palabras y la gramática",
          texto: "Marca los verbos de aprender y de saber (4:11-12), la palabra clave contentarse y el contraste entre abundancia y necesidad: así se entiende la palabra todo de 4:13.",
        },
        {
          titulo: "La idea exegética",
          texto: "Tema: cómo pudo Pablo estar contento en cualquier situación. Complemento: lo aprendió porque Cristo lo fortalecía, en la abundancia y en la escasez.",
        },
        {
          titulo: "La idea homilética",
          texto: "La misma verdad, dicha con claridad y fácil de recordar para hoy: en Cristo puedes estar contento en cualquier situación.",
        },
        {
          titulo: "El puente",
          texto: "El principio vale para todos los tiempos: el contentamiento viene de Cristo, no de lo que tienes. Llévalo al que perdió el trabajo y al que prospera; 4:13 no es una promesa de lograr cualquier meta.",
        },
      ],
    },
  ],
  "n4-homiletica-2-3": [
    // Pone los cinco géneros lado a lado, con lo que se busca, cómo se predica y el error de cada uno, para compararlos de un vistazo.
    {
      t: "cuadro",
      titulo: "Cómo predicar cada género",
      columnas: ["Género", "Qué buscar", "Cómo predicarlo", "Error que evitar"],
      filas: [
        [
          "Narración",
          "La trama, el conflicto y lo que Dios hace: el héroe es Dios (1 Samuel 17:47).",
          "Contar la historia y mostrar al Dios que salva a su pueblo; así apunta a Cristo.",
          "Moralizar: convertir la historia en un consejo moral suelto.",
        ],
        [
          "Epístola",
          "El argumento y sus conectores: por tanto, porque, pero.",
          "Razonar paso a paso y predicar párrafos completos.",
          "Sacar frases aisladas de su argumento.",
        ],
        [
          "Poesía y salmos",
          "El paralelismo, las imágenes y el sentimiento.",
          "Predicar de modo que la iglesia ore y adore.",
          "Tratarlo como una lista de datos y perder su tono de oración y adoración.",
        ],
        [
          "Parábola",
          "El punto principal que Jesús quiso enseñar a sus oyentes (Lucas 18:1).",
          "Enseñar ese punto; un personaje puede ser un contraste, como el juez injusto.",
          "Alegorizar: convertir cada detalle en un símbolo.",
        ],
        [
          "Profecía",
          "Su mensaje en su tiempo y su cumplimiento en Cristo.",
          "En orden: su tiempo, Cristo y, con humildad, lo que falta por cumplirse.",
          "Empezar por las fechas del fin o quedarse en su tiempo sin llegar a Cristo.",
        ],
      ],
    },
  ],
  "n4-homiletica-2-6": [
    // Convierte la rúbrica en preguntas con sus puntos, para que el alumno revise su sermón antes de presentarlo.
    {
      t: "cuadro",
      titulo: "La rúbrica del sermón del Nivel 4 como lista para revisarte",
      columnas: ["Criterio", "Puntos", "Pregunta para revisarte"],
      filas: [
        ["Fidelidad al texto", "25", "¿El mensaje de mi sermón es el mensaje del pasaje, leído en su contexto?"],
        ["Idea central y propósito", "15", "¿Puedo decir mi idea central en una frase y para qué la predico?"],
        ["Estructura", "15", "¿Mis puntos salen del texto, en su orden, y los unen transiciones claras?"],
        [
          "Cristo y la gracia",
          "15",
          "¿Muestro lo que Cristo hizo, sin forzar el texto, para que la obediencia nazca de la gracia?",
        ],
        [
          "Aplicación e ilustraciones",
          "15",
          "¿Digo qué hacer, cuándo y con quién? ¿Mis ilustraciones son verdaderas y breves?",
        ],
        ["Entrega", "15", "¿Hablo con claridad, miro a los oyentes y termino entre 20 y 30 minutos?"],
        ["Total", "100", "Se aprueba con 70. Antes de presentarlo, pide a un hermano maduro que la use contigo."],
      ],
    },
  ],
  // Historia de la iglesia II
  "n4-historia-2-2": [
    // La lección junta muchos nombres y fechas, de Zúrich a Sevilla y de Tyndale a Trento; la línea los ordena y muestra que la Biblia en español nació en plena persecución.
    {
      t: "linea",
      titulo: "La Reforma se extiende: de Zúrich a la Reina-Valera (1519-1602)",
      eventos: [
        {
          fecha: "1519",
          texto: "En Zúrich, Ulrico Zuinglio comienza a predicar la Biblia libro por libro.",
          ref: "Hechos 17:11",
        },
        {
          fecha: "1525",
          texto: "Los anabautistas comienzan a bautizar solo a creyentes que confiesan su fe y piden que la iglesia no dependa del Estado.",
        },
        { fecha: "1526", texto: "William Tyndale publica el Nuevo Testamento en inglés." },
        {
          fecha: "1536",
          texto: "Juan Calvino publica la Institución de la religión cristiana y después enseña en Ginebra.",
        },
        { fecha: "1536", texto: "Tyndale muere ejecutado: la Biblia en la lengua del pueblo costó sangre." },
        {
          fecha: "1545-1563",
          texto: "El Concilio de Trento corrige algunos abusos, pero rechaza la justificación solo por la fe.",
        },
        {
          fecha: "1557",
          texto: "Por temor a la Inquisición, huyen monjes de San Isidoro del Campo, en Sevilla; entre ellos, Reina y Valera.",
        },
        {
          fecha: "1569",
          texto: "En Basilea, Casiodoro de Reina publica la Biblia del Oso, la primera Biblia completa en español traducida de los originales.",
          ref: "Isaías 40:8",
        },
        {
          fecha: "1602",
          texto: "Cipriano de Valera publica su revisión de la Biblia de Reina. De esa obra viene la Reina-Valera.",
        },
      ],
    },
  ],
  "n4-historia-2-3": [
    // La lección presenta cinco movimientos seguidos; el cuadro los pone lado a lado para analizar qué aportó cada uno y qué los une (objetivo o3).
    {
      t: "cuadro",
      titulo: "Los movimientos de renovación después de la Reforma",
      columnas: ["Movimiento", "Dónde, cuándo y quiénes", "Qué aportó"],
      filas: [
        [
          "Puritanos",
          "Inglaterra, siglos XVI y XVII; muchos emigraron a América.",
          "El llamado a purificar la iglesia y a vivir toda la vida bajo la Palabra.",
        ],
        [
          "Pietismo",
          "Alemania, fines del siglo XVII: Felipe Jacobo Spener (Pia desideria, 1675) y Augusto Francke, en Halle.",
          "Piedad personal, estudio de la Biblia en grupos y obras de misericordia, como el orfanato de Francke.",
        ],
        [
          "Moravos",
          "Herrnhut (Sajonia), en tierras del conde Zinzendorf; avivamiento de 1727.",
          "Una cadena de oración de unos cien años y, desde 1732, misioneros a muchos lugares del mundo.",
        ],
        [
          "Metodismo",
          "Inglaterra: Juan Wesley (1703-1791), ministro anglicano; Aldersgate, 24 de mayo de 1738.",
          "Seguridad de la salvación, predicación al aire libre por décadas y grupos que cuidaron a miles de nuevos creyentes.",
        ],
        [
          "Gran Despertar",
          "Colonias inglesas de América, desde la década de 1730: Jonathan Edwards y George Whitefield.",
          "Despertó a las colonias con la predicación profunda de Edwards y la de Whitefield, a multitudes al aire libre.",
        ],
        [
          "Lo que tienen en común",
          "Europa y América, entre los siglos XVI y XVIII.",
          "Unieron la sana doctrina con una fe viva: conversión personal, santidad, oración y misión.",
        ],
      ],
    },
  ],
  "n4-historia-2-5": [
    // La lección va de Topeka (1901) a hoy; la línea fija el orden de los hechos y separa el nacimiento del movimiento (1901-1906) de la renovación carismática (desde 1960).
    {
      t: "linea",
      titulo: "El movimiento pentecostal: de Topeka (1901) a hoy",
      eventos: [
        {
          fecha: "1 de enero de 1901",
          texto: "En la escuela bíblica de Charles Parham, en Topeka, Kansas, Agnes Ozman habla en lenguas mientras oran por ella.",
          ref: "Joel 2:28-29",
        },
        {
          fecha: "1906",
          texto: "En la calle Azusa de Los Ángeles, William J. Seymour, hijo de antiguos esclavos, dirige un avivamiento de unos tres años.",
          ref: "Hechos 2:1-4",
        },
        {
          fecha: "Desde 1906",
          texto: "Negros, blancos e hispanos oran juntos en una época de separación racial, y de Azusa salen misioneros a todo el mundo.",
          ref: "Gálatas 3:28",
        },
        {
          fecha: "1907-1908",
          texto: "La Iglesia de Dios en Cristo y la Iglesia de Dios de Cleveland, Tennessee, que ya existían, se hacen pentecostales.",
        },
        { fecha: "1914", texto: "Se organizan las Asambleas de Dios en Hot Springs, Arkansas." },
        {
          fecha: "Década de 1920",
          texto: "De la obra de Aimee Semple McPherson en Los Ángeles nace la Iglesia Internacional del Evangelio Cuadrangular.",
        },
        {
          fecha: "Desde 1960",
          texto: "La renovación carismática lleva la experiencia pentecostal a iglesias históricas: episcopal, luterana y católica.",
        },
        {
          fecha: "Hoy",
          texto: "Pentecostales y carismáticos son cientos de millones, sobre todo en América Latina, África y Asia.",
          ref: "Hechos 1:8",
        },
      ],
    },
  ],
  // Apologética
  "n4-apologetica-2": [
    // Pone lado a lado los tres argumentos, lo que observan y a qué apuntan, y recuerda su alcance antes de la idea clave.
    {
      t: "cuadro",
      titulo: "Tres argumentos que muestran que creer en Dios es razonable",
      columnas: ["Argumento", "Lo que observamos", "A qué apunta", "Texto bíblico"],
      filas: [
        [
          "El comienzo del universo",
          "Lo que comienza a existir tiene una causa, y la ciencia habla de un comienzo del universo",
          "A una causa fuera del tiempo, del espacio y de la materia: eterna, poderosa y personal",
          "Génesis 1:1; Romanos 1:20",
        ],
        [
          "El orden y el diseño",
          "Leyes estables, medidas exactas que permiten la vida y la información compleja del ADN",
          "A una mente que lo diseñó, como el reloj hace pensar en un relojero",
          "Salmos 19:1",
        ],
        [
          "La ley moral",
          "Todos reconocen que algunas cosas están mal siempre, aunque no cumplan esa ley",
          "A un Legislador moral, que escribió la obra de su ley en el corazón",
          "Romanos 2:14-15",
        ],
        [
          "Los tres juntos",
          "La creación, el orden del mundo y la conciencia hablan de Dios",
          "A que creer es razonable y nadie tiene excusa, aunque conocer a Dios como Padre pide su Palabra, el Espíritu y la fe",
          "Romanos 1:20; Hebreos 11:6",
        ],
      ],
    },
  ],
  "n4-apologetica-4": [
    // Compara cada explicación con los hechos de la lección y deja ver por qué solo la resurrección los explica todos.
    {
      t: "cuadro",
      titulo: "Cuatro explicaciones de la tumba vacía y de las apariciones",
      columnas: ["Explicación", "Qué propone", "Frente a los hechos"],
      filas: [
        [
          "El robo del cuerpo",
          "Los discípulos se llevaron el cuerpo y mintieron; ya se decía entonces (Mateo 28:13-15)",
          "Nadie da la vida por lo que sabe que es mentira, y ellos lo anunciaron aun a costa de la suya",
        ],
        [
          "El desmayo",
          "Jesús no murió en la cruz: solo se desmayó y despertó en la tumba",
          "Los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte",
        ],
        [
          "Las alucinaciones",
          "Los discípulos creyeron verlo, pero eran visiones de su mente",
          "Quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba",
        ],
        [
          "La resurrección",
          "Dios levantó a Jesús de los muertos, como dicen los testigos (Hechos 2:24, 32)",
          "Da cuenta de todo: la muerte, la tumba vacía, las apariciones y el cambio de los discípulos, de Pablo y de Jacobo",
        ],
      ],
    },
  ],
  "n4-apologetica-5": [
    // Ordena las respuestas de la lección en el orden en que se dan a quien sufre: primero la compasión y después las razones.
    {
      t: "pasos",
      titulo: "Cómo acompañar y responder a quien pregunta por su dolor",
      pasos: [
        {
          titulo: "Primero, acompañar",
          texto: "Escucha, quédate a su lado y llora con él. Los argumentos vienen después, si los pide: Jesús lloró ante la tumba de Lázaro antes de resucitarlo (Juan 11:35).",
        },
        {
          titulo: "De dónde viene el mal",
          texto: "Dios creó un mundo bueno en gran manera. El mal no viene de él: entró por la desobediencia humana, en un mundo creado con libertad para amar (Génesis 1:31; Romanos 5:12).",
        },
        {
          titulo: "Dios obra aun en el dolor",
          texto: "Dios no siempre explica cada sufrimiento, como se ve en Job, pero promete obrar para bien en la vida de los que le aman (Romanos 8:28).",
        },
        {
          titulo: "La respuesta de la cruz",
          texto: "Dios no es indiferente: el Hijo entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección.",
        },
        {
          titulo: "La esperanza final",
          texto: "Las aflicciones de hoy no se comparan con la gloria venidera, y Dios promete un mundo nuevo sin muerte, llanto ni dolor (Romanos 8:18; Apocalipsis 21:4).",
        },
      ],
    },
  ],
  // Ética cristiana y ministerial
  "n4-etica-1": [
    // Pone lado a lado las dos posturas que la lección compara y muestra por qué el relativismo no puede condenar el abuso.
    {
      t: "cuadro",
      titulo: "Ética cristiana y relativismo moral, frente a frente",
      columnas: ["Pregunta", "Ética cristiana", "Relativismo moral"],
      filas: [
        [
          "¿En qué se funda lo bueno?",
          "En el carácter de Dios, que es santo, justo y amor (1 Pedro 1:15-16)",
          "En lo que cada persona o cada cultura prefiere",
        ],
        [
          "¿Quién dice qué está bien?",
          "Dios, en su Palabra, y Cristo con su ejemplo (2 Timoteo 3:16-17; 1 Pedro 2:21)",
          "Cada uno decide por sí mismo lo que está bien o mal",
        ],
        [
          "¿Hay verdades morales para todos?",
          "Sí: hay un bien y un mal reales, porque Dios existe y ha hablado",
          "No: dice que no hay verdades morales para todos",
        ],
        [
          "¿Se puede condenar el abuso?",
          "Sí: la injusticia y el abuso están mal de verdad, aunque alguien los apruebe",
          "No con coherencia: si todo fuera relativo, nadie podría decir que están mal",
        ],
        [
          "¿Con qué se mide una decisión?",
          "Con el doble amor: a Dios y al prójimo (Mateo 22:37-40)",
          "Con lo que a cada uno le parece bien en el momento",
        ],
        [
          "¿A qué lleva?",
          "A una mente renovada en la que el Espíritu produce su fruto (Romanos 12:2; Gálatas 5:22-23)",
          "Al caos de los jueces, cuando cada uno hacía lo que quería (Jueces 21:25)",
        ],
      ],
    },
  ],
  "n4-etica-2": [
    // La lección enseña un método: verlo en orden, cada paso con su versículo, ayuda a usarlo en cualquier decisión, también en lo que la Biblia no menciona.
    {
      t: "pasos",
      titulo: "Cómo tomar una decisión moral, paso a paso",
      pasos: [
        {
          titulo: "Lo que manda o prohíbe la Biblia",
          texto: "Si la Biblia lo dice claramente, se obedece. Si no lo menciona, se siguen los pasos que vienen, con la Palabra como lámpara (Salmos 119:105).",
        },
        {
          titulo: "Los principios bíblicos que se aplican",
          texto: "El amor al prójimo, la santidad y la verdad valen para todo, aunque el tema sea nuevo (Mateo 22:37-40).",
        },
        {
          titulo: "La conciencia iluminada por la Palabra",
          texto: "Si uno duda, se detiene y lo examina con la Escritura, porque lo que no se hace con fe es pecado (Romanos 14:23). La conciencia se educa con la Palabra.",
        },
        {
          titulo: "El consejo de creyentes maduros",
          texto: "Un pastor o un hermano maduro ayuda a ver lo que uno no ve: hay seguridad en contar con muchos consejeros (Proverbios 11:14).",
        },
        {
          titulo: "Las tres preguntas de Pablo",
          texto: "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza? Lo lícito se usa con amor, sin hacer tropezar al débil ni dejarse dominar (1 Corintios 10:23-31; 8:9; 6:12).",
        },
        {
          titulo: "Orar, pedir sabiduría y decidir",
          texto: "Dios da sabiduría abundantemente y sin reproche al que se la pide (Santiago 1:5). Luego se decide, y todo se hace para su gloria (1 Corintios 10:31).",
        },
      ],
    },
  ],
  "n4-etica-6": [
    // Reúne las normas de la lección con su base bíblica en un solo cuadro, para revisar con él un ministerio o una iglesia.
    {
      t: "cuadro",
      titulo: "Normas de ética ministerial: qué piden y en qué se apoyan",
      columnas: ["Norma", "Qué se hace", "Base bíblica"],
      filas: [
        [
          "Transparencia en el dinero",
          "Las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia",
          "2 Corintios 8:20-21",
        ],
        [
          "Autoridad sin abuso",
          "El que dirige sirve y es ejemplo; no se enseñorea de los demás y rinde cuentas",
          "1 Pedro 5:2-3",
        ],
        [
          "Relaciones apropiadas",
          "No se aconseja a solas a alguien del otro sexo en un lugar cerrado; se evita toda apariencia de mal",
          "1 Tesalonicenses 5:22",
        ],
        [
          "Confidencialidad con límites",
          "Se guarda lo que se confía, salvo cuando hay peligro para la vida o abuso",
          "Proverbios 11:13; 31:8-9",
        ],
        [
          "Honestidad en el púlpito",
          "No se inventan testimonios ni se usan sermones ajenos sin decirlo",
          "Efesios 4:25",
        ],
        [
          "Protección de menores",
          "Siempre dos adultos, se verifica a quien sirve, puertas abiertas o con ventana; toda sospecha se reporta a la autoridad",
          "Mateo 18:6; Romanos 13:1",
        ],
        [
          "Restauración del que cae",
          "Con mansedumbre: deja el cargo por un tiempo, recibe disciplina y acompañamiento y repara el daño; nada se encubre",
          "Gálatas 6:1",
        ],
      ],
    },
  ],
  // Teología pastoral
  "n5-teologia-pastoral-2": [
    // La lección nombra los peligros en una lista y los remedios en otros párrafos; el cuadro une cada peligro con su señal y su remedio bíblico.
    {
      t: "cuadro",
      titulo: "Los peligros del ministerio y su remedio bíblico",
      columnas: ["Peligro", "Cómo se nota", "El remedio que enseña la Palabra"],
      filas: [
        [
          "El profesionalismo",
          "Predicar y orar por oficio, sin un corazón encendido.",
          "Perseverar en la oración y en la Palabra, como los apóstoles (Hechos 6:4).",
        ],
        [
          "El orgullo",
          "Creer que la obra depende de uno.",
          "Recordar que la grey es de Dios y servir revestido de humildad (1 Pedro 5:2-6).",
        ],
        [
          "El aislamiento",
          "No tener a nadie a quien rendir cuentas.",
          "Rendir cuentas a alguien que pregunte por su vida con Dios, su matrimonio o soltería y su dinero (Proverbios 27:17).",
        ],
        [
          "La doble vida",
          "Enseñar la santidad sin vivirla.",
          "Cuidar primero la propia vida y después la doctrina (1 Timoteo 4:16).",
        ],
        [
          "La agenda sin descanso",
          "Tanto trabajo que no queda tiempo ni para comer.",
          "Apartarse a orar, como Jesús, y descansar un poco, como él invitó a sus discípulos (Marcos 1:35; Marcos 6:31).",
        ],
      ],
    },
  ],
  "n5-teologia-pastoral-4": [
    // El objetivo de la lección es planificar la enseñanza; los pasos convierten la nota del plan anual en un método que el alumno puede seguir.
    {
      t: "pasos",
      titulo: "Cómo planificar la enseñanza de la iglesia para un año",
      pasos: [
        {
          titulo: "Conocer al rebaño",
          texto: "Ora y conoce a tu iglesia o a tu grupo antes de elegir temas: quiénes son nuevos, qué necesitan las familias y qué errores circulan. Pablo pide mirar por todo el rebaño (Hechos 20:28).",
        },
        {
          titulo: "Elegir libros completos de la Biblia",
          texto: "Escoge para el año un evangelio, una carta y un libro del Antiguo Testamento, y predícalos de principio a fin, para dar todo el consejo de Dios (Hechos 20:27).",
        },
        {
          titulo: "Sumar los temas que la iglesia necesita",
          texto: "Agrega los temas que tu iglesia necesita y no solo tus favoritos, porque toda la Escritura sirve para enseñar y para corregir (2 Timoteo 3:16).",
        },
        {
          titulo: "Repartir en público y por las casas",
          texto: "Ordena qué se enseña en el culto, en las clases y en los grupos pequeños, como Pablo en Éfeso (Hechos 20:20). Los niveles de esta academia pueden servir de apoyo.",
        },
        {
          titulo: "Formar maestros fieles",
          texto: "Escoge hermanos fieles y prepáralos para que enseñen también a otros, y así la Palabra llegue a todos (2 Timoteo 2:2).",
        },
        {
          titulo: "Proteger del error",
          texto: "Incluye la sana doctrina y corrige con mansedumbre a los que se oponen (Tito 1:9; 2 Timoteo 2:24-25). Una iglesia bien alimentada con la Palabra resiste mejor el error.",
        },
        {
          titulo: "Predicar con constancia y revisar",
          texto: "Predica a tiempo y fuera de tiempo (2 Timoteo 4:2). Al final del año, revisa con tus maestros qué aprendió la iglesia y qué falta para el plan siguiente.",
        },
      ],
    },
  ],
  "n5-teologia-pastoral-5": [
    // La lección lee los reproches de Ezequiel 34 y después las prácticas de visitación; el cuadro une cada reproche con lo que Dios espera y cómo se hace hoy.
    {
      t: "cuadro",
      titulo: "Ezequiel 34: lo que Dios reprocha y el cuidado que espera hoy",
      columnas: ["Lo que Dios reprocha (Ezequiel 34:2-4)", "Lo que espera del pastor", "Cómo se practica hoy"],
      filas: [
        [
          "Se apacentaban a sí mismos.",
          "Servir al rebaño, no servirse de él.",
          "Conocer a cada oveja por nombre: su historia, sus luchas y su familia (Juan 10:3).",
        ],
        [
          "No fortalecieron a las débiles.",
          "Fortalecer a las débiles.",
          "Visitar a los ancianos, a los que viven solos y a los nuevos, para que se sientan en familia.",
        ],
        [
          "No curaron a la enferma.",
          "Curar a la enferma.",
          "Visitar al enfermo con una lectura breve y respeto por el lugar, y orar por él (Santiago 5:14).",
        ],
        [
          "No vendaron a la perniquebrada (la de la pierna rota).",
          "Vendar a la herida.",
          "Acompañar al herido y referir a tiempo al médico, al psicólogo, al abogado o a las autoridades.",
        ],
        [
          "No volvieron al redil a la descarriada ni buscaron a la perdida.",
          "Traer de vuelta a la descarriada y buscar a la perdida.",
          "Buscar sin reproches a los que dejaron de venir (Lucas 15:4), con un equipo que visite y avise.",
        ],
        [
          "Las dominaron con dureza y con violencia.",
          "Guiar con mansedumbre y con el ejemplo.",
          "Cuidar sin señorío, siendo ejemplo de la grey (1 Pedro 5:3).",
        ],
      ],
    },
  ],
  // Administración y gobierno de la iglesia
  "n5-administracion-2": [
    // Pone lado a lado las tres formas históricas, la forma mixta de muchas iglesias pentecostales y lo que todas necesitan, que la lección presenta por separado.
    {
      t: "cuadro",
      titulo: "Las formas de gobierno de la iglesia",
      columnas: ["Forma", "Quién gobierna", "Rasgo principal", "La siguen"],
      filas: [
        [
          "Episcopal",
          "Obispos",
          "Supervisan a varias iglesias y a sus pastores.",
          "Las iglesias católica, ortodoxa, anglicana y metodista, entre otras.",
        ],
        [
          "Presbiteriana",
          "Ancianos",
          "Gobiernan juntos en cada iglesia y en concilios regionales.",
          "Las iglesias presbiterianas y reformadas.",
        ],
        [
          "Congregacional",
          "La congregación",
          "Toma las decisiones principales, y cada iglesia es autónoma.",
          "Las iglesias bautistas y muchas iglesias independientes.",
        ],
        [
          "Mixta",
          "Pastor, consejo y asamblea",
          "El pastor guía, el consejo lo acompaña y la asamblea aprueba ciertas decisiones, según los estatutos.",
          "Muchas iglesias, también pentecostales.",
        ],
        [
          "Lo que todas necesitan",
          "Líderes de buen carácter",
          "Decisiones claras, rendición de cuentas y la guía de la Palabra y del Espíritu Santo.",
          "Toda iglesia sana, cualquiera que sea su forma de gobierno.",
        ],
      ],
    },
  ],
  "n5-administracion-3": [
    // Reúne en un cuadro lo que la lección reparte en tres apartados: qué hace cada servicio, qué se les pide y dónde lo enseña la Palabra.
    {
      t: "cuadro",
      titulo: "Los que guían, los que sirven y los equipos",
      columnas: ["Servicio", "Qué hace", "Qué se les pide", "Base bíblica"],
      filas: [
        [
          "Ancianos, pastores u obispos",
          "Enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño.",
          "Irreprensibles, sobrios, prudentes y aptos para enseñar.",
          "Hechos 20:28; 1 Pedro 5:2; 1 Timoteo 3:2",
        ],
        [
          "Diáconos",
          "Sirven en lo práctico, como los siete de Hechos 6, que se encargaron de atender a las viudas.",
          "Honestos, sin doblez, y sometidos a prueba primero.",
          "Filipenses 1:1; 1 Timoteo 3:8-10; Hechos 6:1-6",
        ],
        [
          "Equipos de servicio",
          "Alabanza, niños, bienvenida, visitación, medios o limpieza, cada uno con su propósito escrito y su responsable.",
          "De buen testimonio, llenos del Espíritu Santo y de sabiduría, y preparados antes de servir.",
          "Hechos 6:3",
        ],
        [
          "Todos los que sirven",
          "Sirven al Señor en lo visible y en lo escondido, y saben a quién rinden cuentas.",
          "Primero el carácter; con menores, siempre las normas de protección.",
          "1 Pedro 4:10; Colosenses 3:23",
        ],
      ],
    },
  ],
  "n5-administracion-5": [
    // Aplica paso a paso el ciclo de la lección (orar, evaluar, fijar metas, organizar y revisar) a Nehemías, el ejemplo con que empieza la lección.
    {
      t: "pasos",
      titulo: "El ciclo de planificación en la obra de Nehemías",
      pasos: [
        {
          titulo: "Preguntar y orar",
          texto: "Nehemías preguntó por Jerusalén; al saber que el muro estaba derribado, lloró, ayunó y oró por días delante del Dios de los cielos (Nehemías 1:2-4).",
        },
        {
          titulo: "Presentar un pedido claro",
          texto: "Ante el rey oró otra vez y habló con claridad: señaló un tiempo y pidió cartas para los gobernadores y madera para las puertas y el muro (Nehemías 2:4-8).",
        },
        {
          titulo: "Evaluar cómo estamos",
          texto: "Ya en Jerusalén, recorrió de noche los muros derribados y vio el daño con sus propios ojos antes de anunciar el plan (Nehemías 2:12-16).",
        },
        {
          titulo: "Fijar una meta clara",
          texto: "Mostró a los líderes y al pueblo el mal en que estaban y cómo Dios lo había ayudado, y propuso una meta: edificar el muro. Ellos se animaron a la obra (Nehemías 2:17-18).",
        },
        {
          titulo: "Organizar responsables",
          texto: "Cada grupo reparó un tramo, muchos frente a su propia casa: sacerdotes, gente de otras ciudades, plateros y comerciantes (Nehemías 3:1-2, 10, 28, 32).",
        },
        {
          titulo: "Revisar y ajustar",
          texto: "Ante las amenazas oraron y pusieron guardia de día y de noche; la mitad trabajaba y la otra mitad vigilaba, y Nehemías dio una señal de trompeta para reunirse (Nehemías 4:9, 16-20).",
        },
        {
          titulo: "Terminar y dar la gloria a Dios",
          texto: "El muro se terminó en cincuenta y dos días, y aun los enemigos reconocieron que Dios había hecho esa obra (Nehemías 6:15-16).",
        },
      ],
    },
  ],
  // Didáctica: cómo enseñar
  "n5-didactica-2": [
    // La lección da las siete leyes sin su nombre; el cuadro las nombra, como lo hacen las preguntas del banco, y muestra cómo usar cada una en clase.
    {
      t: "cuadro",
      titulo: "Las siete leyes de la enseñanza de Gregory",
      columnas: ["Ley", "Lo que pide", "En tu clase"],
      filas: [
        [
          "Del maestro",
          "Conocer bien lo que se va a enseñar.",
          "Estudia a fondo el pasaje antes de la clase y sigue aprendiendo (2 Timoteo 2:15).",
        ],
        [
          "Del alumno",
          "Que el alumno preste atención con interés.",
          "Empieza con una pregunta, una historia breve o un problema que despierte el interés.",
        ],
        [
          "Del lenguaje",
          "Usar un lenguaje que maestro y alumno entiendan.",
          "Explica las palabras difíciles y pon el sentido, como los levitas (Nehemías 8:8).",
        ],
        [
          "De la lección",
          "Avanzar de lo que el alumno ya sabe a lo que todavía no sabe.",
          "Parte de lo que el grupo conoce y llévalo paso a paso hacia la madurez (Hebreos 5:12-14).",
        ],
        [
          "Del proceso de enseñanza",
          "Despertar y guiar la mente del alumno, en vez de solo darle respuestas.",
          "Haz preguntas que obliguen a cada uno a pensar, como Jesús (Mateo 16:15).",
        ],
        [
          "Del proceso de aprendizaje",
          "Que el alumno reproduzca con sus palabras lo que aprendió.",
          "Pide a algunos alumnos que expliquen la idea clave con sus palabras.",
        ],
        [
          "Del repaso y la aplicación",
          "Repasar y aplicar lo aprendido.",
          "Cierra con preguntas de repaso y una aplicación, y vuelve al tema en las clases siguientes.",
        ],
      ],
    },
  ],
  "n5-didactica-3": [
    // Es una lección de método y sin video: los pasos ordenan la preparación de una clase, del objetivo a la mejora para la próxima vez.
    {
      t: "pasos",
      titulo: "Cómo preparar una clase bíblica, paso a paso",
      pasos: [
        {
          titulo: "Escribe el objetivo",
          texto: "Pregúntate qué podrá hacer el alumno al terminar y escríbelo con un verbo que se pueda comprobar (explicar, citar, comparar, aplicar), según los niveles de Bloom.",
        },
        {
          titulo: "Estudia el pasaje en su contexto",
          texto: "Busca su sentido para leerlo con claridad y explicarlo de modo que se entienda (Nehemías 8:8), y mira cómo lleva a Cristo (Lucas 24:27).",
        },
        {
          titulo: "Ordena las partes de la clase",
          texto: "Para empezar, una pregunta o una historia; después, la Palabra explicada, la idea clave en una frase, la aplicación para la vida y el repaso: el mismo orden de las lecciones de la academia.",
        },
        {
          titulo: "Escribe el plan",
          texto: "Anota el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas. Así enseñas con orden y respetas el tiempo.",
        },
        {
          titulo: "Prepárala también de rodillas",
          texto: "Ora por tus alumnos por su nombre y pide al Espíritu Santo que abra su entendimiento.",
        },
        {
          titulo: "Mejórala para la próxima vez",
          texto: "Después de la clase, vuelve a tu plan: anota qué ayudó a aprender y qué cambiarás. El plan escrito te permite mejorar cada clase.",
        },
      ],
    },
  ],
  "n5-didactica-4": [
    // La lección presenta en dos listas los métodos de Jesús y los de hoy; el cuadro une cada método con su pasaje y con su uso en clase.
    {
      t: "cuadro",
      titulo: "Los métodos de Jesús y cómo usarlos hoy",
      columnas: ["Método", "Cómo lo usó Jesús", "Cómo usarlo hoy"],
      filas: [
        [
          "Las preguntas",
          "Preguntó a sus discípulos quién decían ellos que era él (Mateo 16:15).",
          "Pregunta y conversa en grupos pequeños para que cada uno piense y responda.",
        ],
        [
          "Las historias",
          "Hablaba a la gente por parábolas (Mateo 13:34).",
          "Cuenta una historia o presenta un caso real que se resuelva con la Biblia.",
        ],
        [
          "Los objetos de la vida diaria",
          "Enseñó con las aves del cielo y los lirios del campo (Mateo 6:26-28).",
          "Usa objetos de la vida diaria de tus alumnos y recursos visuales: mapas, líneas de tiempo, videos y esquemas.",
        ],
        [
          "El ejemplo",
          "Lavó los pies de sus discípulos para enseñarles a servir (Juan 13:14-15).",
          "Vive lo que enseñas: tu ejemplo enseña más que tus palabras.",
        ],
        [
          "La práctica",
          "Envió a los setenta de dos en dos y después escuchó lo que vivieron (Lucas 10:1, 17).",
          "Enseña a orar orando y a evangelizar evangelizando; después conversa con ellos sobre lo vivido.",
        ],
        [
          "La conversación personal",
          "Habló con Nicodemo de noche y con la samaritana junto al pozo (Juan 3 y 4).",
          "Dedica tiempo personal y sin prisa, en un lugar visible, al alumno que tiene dudas o necesidades propias.",
        ],
        [
          "La explicación",
          "En el camino a Emaús les explicó lo que las Escrituras decían de él (Lucas 24:27).",
          "Usa una exposición breve para presentar lo que el alumno no puede descubrir solo.",
        ],
      ],
    },
  ],
  // Liderazgo II: formar líderes y equipos
  "n5-liderazgo-2-2": [
    // La lección no tiene video: la línea ordena en el tiempo cómo Bernabé abrió puertas a Saulo y a Marcos, y cómo Marcos volvió a ser útil.
    {
      t: "linea",
      titulo: "Bernabé, Saulo y Juan Marcos: formar y dar otra oportunidad",
      eventos: [
        {
          fecha: "c. 35-37 d. C.",
          texto: "En Jerusalén todos temen a Saulo, pero Bernabé lo presenta a los apóstoles. Después los hermanos lo envían a Tarso.",
          ref: "Hechos 9:26-30",
        },
        {
          fecha: "c. 43-45 d. C.",
          texto: "Bernabé va a Tarso a buscar a Saulo y lo lleva a Antioquía, donde enseñan todo un año a mucha gente.",
          ref: "Hechos 11:25-26",
        },
        {
          fecha: "c. 44-46 d. C.",
          texto: "Llevan a Jerusalén la ayuda de Antioquía para el hambre (Hechos 11:29-30) y vuelven con Juan Marcos.",
          ref: "Hechos 12:25",
        },
        {
          fecha: "c. 46-49 d. C.",
          texto: "El Espíritu Santo los aparta y salen de Antioquía con Juan de ayudante. En Perge, Juan los deja y vuelve a Jerusalén.",
          ref: "Hechos 13:2-13",
        },
        {
          fecha: "c. 49-50 d. C.",
          texto: "Tras el concilio, Pablo no quiere llevar a Marcos y se separan: Bernabé va con Marcos a Chipre, y Pablo con Silas.",
          ref: "Hechos 15:36-40",
        },
        {
          fecha: "c. 60-62 d. C.",
          texto: "Desde la prisión, Pablo pide a los colosenses que reciban a Marcos y lo cuenta entre sus colaboradores.",
          ref: "Colosenses 4:10-11",
        },
        {
          fecha: "c. 64-67 d. C.",
          texto: "En su última carta, Pablo pide a Timoteo que traiga a Marcos, porque le es útil para el ministerio.",
          ref: "2 Timoteo 4:11",
        },
      ],
    },
  ],
  "n5-liderazgo-2-5": [
    // La lección no tiene video: reúne en un solo orden Mateo 18, Mateo 5 y los pasos de Sande, con la excepción del abuso, para usarlos en un conflicto real.
    {
      t: "pasos",
      titulo: "Del conflicto a la reconciliación, paso a paso",
      pasos: [
        {
          titulo: "Distingue la ofensa del delito",
          texto: "Este camino es para las ofensas entre hermanos. Si hay abuso o un delito, primero se protege a la víctima y se acude a las autoridades.",
        },
        {
          titulo: "Busca la gloria de Dios",
          texto: "Ora y pregúntate qué honra a Dios en este conflicto. La meta es ganar a tu hermano, no la discusión (1 Corintios 10:31; Mateo 18:15).",
        },
        {
          titulo: "Saca primero la viga de tu ojo",
          texto: "Reconoce tu parte antes de señalar la del otro. Si fuiste tú quien ofendió, no esperes: ve a reconciliarte antes de presentar tu ofrenda (Mateo 7:5; 5:23-24).",
        },
        {
          titulo: "Habla a solas y de frente",
          texto: "Si tu hermano pecó contra ti, habla con él en privado, no a sus espaldas. Escucha antes de responder y responde con calma (Mateo 18:15; Santiago 1:19; Proverbios 15:1).",
        },
        {
          titulo: "Si no escucha, vuelve con uno o dos",
          texto: "Pide a una o dos personas maduras que te acompañen. A veces hace falta alguien que medie: Pablo pidió a un compañero fiel que ayudara a Evodia y a Síntique (Mateo 18:16; Filipenses 4:2-3).",
        },
        {
          titulo: "Solo al final, ante la iglesia",
          texto: "Si aun así no escucha, el asunto se lleva a la iglesia. Es el último recurso, nunca el primero (Mateo 18:17).",
        },
        {
          titulo: "Cuando escuche, restaura y perdona",
          texto: "En el paso en que tu hermano te escuche, restáuralo con mansedumbre, cuidándote a ti mismo, y perdona como Cristo te perdonó. Ataca el problema, no a la persona (Gálatas 6:1; Colosenses 3:13).",
        },
      ],
    },
  ],
  // Griego y hebreo bíblicos para el estudio
  "n5-idiomas-1": [
    // Ordena en el tiempo lo que la lección cuenta de los idiomas y de las copias, y deja ver de un vistazo el camino del texto hasta la Reina-Valera.
    {
      t: "linea",
      titulo: "Cómo llegó la Biblia hasta tu idioma",
      eventos: [
        {
          fecha: "334-323 a. C.",
          texto: "Las conquistas de Alejandro Magno llevan el griego común, el koiné, por todo el Mediterráneo oriental.",
        },
        {
          fecha: "Siglos III-II a. C.",
          texto: "En Alejandría, los judíos traducen el Antiguo Testamento al griego: la Septuaginta, que el Nuevo Testamento cita muchas veces.",
        },
        {
          fecha: "c. 30-33 d. C.",
          texto: "Sobre la cruz de Jesús, el título se escribe en hebreo, en griego y en latín.",
          ref: "Juan 19:19-20",
        },
        {
          fecha: "Siglo I d. C.",
          texto: "Se escribe el Nuevo Testamento en griego koiné, la lengua común de su tiempo.",
        },
        {
          fecha: "c. siglos VII-X",
          texto: "Los masoretas, escribas judíos, copian con gran cuidado el texto hebreo y le añaden los signos de las vocales.",
        },
        {
          fecha: "1008",
          texto: "Se copia el códice de Leningrado, el manuscrito completo más antiguo que se conserva de la Biblia hebrea.",
        },
        {
          fecha: "1569",
          texto: "Casiodoro de Reina publica en Basilea la Biblia del Oso, su traducción al español desde el hebreo y el griego.",
        },
        { fecha: "1602", texto: "Cipriano de Valera publica en Ámsterdam su revisión de la traducción de Reina." },
        {
          fecha: "1960",
          texto: "Las Sociedades Bíblicas publican la revisión Reina-Valera 1960, la que usa esta academia.",
        },
        {
          fecha: "Hoy",
          texto: "Se conservan más de cinco mil manuscritos griegos del Nuevo Testamento: Dios cuida su Palabra hasta el detalle.",
          ref: "Mateo 5:18",
        },
      ],
    },
  ],
  "n5-idiomas-5": [
    // Une en un solo ejemplo resuelto los seis pasos de la lección y el estudio de jésed, que la lección presenta por separado.
    {
      t: "pasos",
      titulo: "Un estudio de palabras resuelto: jésed en el Salmo 136",
      pasos: [
        {
          titulo: "Escoge la palabra",
          texto: "El Salmo 136 repite en sus veintiséis versículos que la misericordia de Dios es para siempre: misericordia es la palabra que hay que estudiar.",
        },
        {
          titulo: "Busca la palabra original",
          texto: "Con la concordancia de Strong o un interlineal se ve que misericordia traduce jésed, el número 2617 del hebreo.",
        },
        {
          titulo: "Mira dónde más aparece",
          texto: "Jésed aparece cuando Dios se revela a Moisés como grande en misericordia (Éxodo 34:6), en sus pactos con su pueblo y en la lealtad de Rut (Rut 1:8; 3:10).",
        },
        {
          titulo: "Lee cada uso en su contexto",
          texto: "En esos pasajes jésed no es un sentimiento pasajero: es amor leal, el de Dios que cumple sus promesas y el de quien se mantiene fiel a otro.",
        },
        {
          titulo: "Compara con un diccionario",
          texto: "Un diccionario expositivo, como el de W. E. Vine, sirve para comparar lo que anotaste en los pasajes antes de concluir.",
        },
        {
          titulo: "Vuelve al pasaje",
          texto: "El Salmo 136 celebra el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle: un amor fiel que no se acaba.",
        },
      ],
    },
  ],
  "n5-idiomas-6": [
    // La lección da los errores y el buen uso en dos listas; el cuadro pone frente a cada error su remedio, para repasar y para preparar una enseñanza.
    {
      t: "cuadro",
      titulo: "Errores comunes con el griego y el hebreo, y cómo evitarlos",
      columnas: ["Error", "Qué es", "Cómo evitarlo"],
      filas: [
        [
          "La falacia de la raíz",
          "Creer que una palabra significa siempre lo que significaban sus partes.",
          "Mirar cómo se usa la palabra en su tiempo y en su pasaje: el sentido lo da el uso, no el origen.",
        ],
        [
          "El anacronismo",
          "Leer en una palabra antigua un sentido que vino después, como decir que dýnamis es dinamita, un invento del siglo XIX.",
          "Preguntar qué entendían el autor y sus lectores: dýnamis es poder, fuerza, capacidad (Romanos 1:16).",
        ],
        [
          "Cargar todos los sentidos",
          "Poner a la vez en un pasaje todos los sentidos que una palabra puede tener.",
          "Escoger el sentido que pide el contexto: en cada pasaje el autor usa uno.",
        ],
        [
          "Exagerar los sinónimos",
          "Ver grandes diferencias entre palabras parecidas, como agapáo y filéo en Juan 21:15-17.",
          "Ver cómo las usa el autor: Juan emplea las dos para el amor del Padre al Hijo (Juan 3:35; 5:20).",
        ],
        [
          "Corregir la traducción para lucirse",
          "Decir que la Biblia está mal traducida sin conocer bien la lengua.",
          "Comparar traducciones fieles, decir de dónde salen los datos y reconocer lo que no se sabe (2 Corintios 4:2).",
        ],
      ],
    },
  ],
  // Exégesis de un libro: Romanos
  "n5-exegesis-1": [
    // La lección da el contexto en pocas líneas (Corinto, hacia el año 57); la línea ordena los hechos que lo explican, desde la iglesia que Pablo no fundó hasta su llegada a Roma, para practicar el primer paso del método (objetivo o1).
    {
      t: "linea",
      titulo: "El contexto histórico de Romanos: de Pentecostés a Roma",
      eventos: [
        {
          fecha: "c. 30-33 d. C.",
          texto: "En Pentecostés oyen el evangelio visitantes de Roma, judíos y prosélitos. No se sabe con certeza quién fundó la iglesia allí.",
          ref: "Hechos 2:10",
        },
        {
          fecha: "c. 49 d. C.",
          texto: "Claudio manda que todos los judíos salgan de Roma (la fecha se discute). Aquila y Priscila llegan a Corinto, donde Pablo los conoce.",
          ref: "Hechos 18:2",
        },
        {
          fecha: "c. 50-52 d. C.",
          texto: "Pablo pasa un año y seis meses en Corinto. Una inscripción hallada en Delfos sitúa al procónsul Galión hacia el 51-52.",
          ref: "Hechos 18:11",
        },
        {
          fecha: "54 d. C.",
          texto: "Muere el emperador Claudio y reina Nerón. Cuando Pablo escribe Romanos, Priscila y Aquila ya están otra vez en Roma.",
          ref: "Romanos 16:3",
        },
        {
          fecha: "c. 57 d. C.",
          texto: "Probablemente en sus tres meses en Grecia (Hechos 20:3), Pablo escribe desde Corinto y recomienda a Febe, diaconisa en Cencrea, su puerto.",
          ref: "Romanos 16:1",
        },
        {
          fecha: "c. 57 d. C.",
          texto: "Pablo lleva a Jerusalén la ofrenda de Macedonia y Acaya para los santos pobres; tras un alboroto en el templo, lo arrestan (Hechos 21).",
          ref: "Romanos 15:25-26",
        },
        {
          fecha: "c. 57-59 d. C.",
          texto: "Pasa dos años preso en Cesarea bajo el gobernador Félix. Ante Festo, su sucesor, apela a César (Hechos 25:11).",
          ref: "Hechos 24:27",
        },
        {
          fecha: "c. 60-62 d. C.",
          texto: "Llega a Roma, pero preso. Dos años en una casa alquilada predica el reino de Dios. La Biblia no dice si llegó a España.",
          ref: "Hechos 28:30-31",
        },
      ],
    },
  ],
  "n5-exegesis-3": [
    // La lección resume en una frase la comparación de Romanos 5:12-21; el cuadro pone a Adán y a Cristo lado a lado, versículo por versículo, para analizar el contraste y el mucho más de la gracia (objetivo o3).
    {
      t: "cuadro",
      titulo: "Adán y Cristo en Romanos 5:12-21: dos hombres, dos resultados",
      columnas: ["En el texto", "Adán: el pecado y la muerte", "Cristo: la gracia y la vida"],
      filas: [
        [
          "La figura (5:14-15)",
          "Adán es figura del que había de venir.",
          "Cristo es el que había de venir, y su don no fue como la transgresión de Adán.",
        ],
        [
          "Lo que entró (5:12, 15)",
          "Por un hombre entró el pecado en el mundo, y por el pecado la muerte, que pasó a todos los hombres.",
          "Por la gracia de un hombre, Jesucristo, abundaron mucho más para los muchos la gracia y el don de Dios.",
        ],
        [
          "El veredicto (5:16)",
          "El juicio vino a causa de un solo pecado, para condenación.",
          "El don vino a causa de muchas transgresiones, para justificación.",
        ],
        [
          "Lo que reina (5:17)",
          "Por la transgresión de uno solo reinó la muerte.",
          "Los que reciben la abundancia de la gracia y del don de la justicia reinarán en vida por Jesucristo.",
        ],
        [
          "El resultado (5:18-19)",
          "Por su transgresión vino la condenación; por su desobediencia, los muchos fueron constituidos pecadores.",
          "Por su justicia vino la justificación de vida; por su obediencia, los muchos serán constituidos justos.",
        ],
        [
          "El final (5:20-21)",
          "Con la ley, el pecado abundó y reinó para muerte.",
          "Cuando el pecado abundó, sobreabundó la gracia, que reina por la justicia para vida eterna.",
        ],
      ],
    },
  ],
  "n5-exegesis-5": [
    // La lección presenta dos lecturas sobre la elección y dos sobre el futuro de Israel; el cuadro separa lo que dice el texto de dónde se lee distinto y de lo que todos afirman, para evaluarlas con respeto (objetivo o5).
    {
      t: "cuadro",
      titulo: "Romanos 9 a 11: lo que enseña y cómo lo leen los evangélicos",
      columnas: ["Pasaje", "Lo que enseña", "Las lecturas evangélicas"],
      filas: [
        [
          "Romanos 9:6",
          "La palabra de Dios no ha fallado: no todos los que descienden de Israel son israelitas.",
          "Aquí todos coinciden: Dios cumple su palabra en el Israel de la promesa.",
        ],
        [
          "Romanos 9:14-16",
          "No depende del que quiere ni del que corre, sino de Dios que tiene misericordia; y en Dios no hay injusticia.",
          "Calvinistas: elección de personas para salvación. Muchos arminianos: de pueblos y personas para un papel en la historia.",
        ],
        [
          "Romanos 10:9-15",
          "Confesar que Jesús es el Señor y creer que Dios le levantó: todo el que invoque será salvo, y hacen falta mensajeros.",
          "Aquí todos coinciden: la salvación es por gracia, por medio de la fe, y la iglesia tiene que predicar.",
        ],
        [
          "Romanos 11:25-26",
          "Israel tiene un endurecimiento en parte, hasta que entre la plenitud de los gentiles; luego todo Israel será salvo.",
          "Unos: una conversión futura del pueblo judío. Otros: todo Israel es el conjunto de los redimidos, judíos y gentiles.",
        ],
        [
          "Romanos 11:33",
          "Pablo termina con adoración por la profundidad de la sabiduría y de la ciencia de Dios.",
          "Aquí todos coinciden: donde no lo entendemos todo, adoramos.",
        ],
      ],
    },
  ],
  // Teología del avivamiento
  "n5-avivamiento-1": [
    // La lección distingue las tres cosas en una lista breve; el cuadro las pone lado a lado (qué es, a quién alcanza, cómo ocurre y su base) para fijar la definición que pide el objetivo o1.
    {
      t: "cuadro",
      titulo: "Avivamiento, evangelización y despertar: tres cosas distintas",
      columnas: ["Aspecto", "Avivamiento", "Evangelización", "Despertar"],
      filas: [
        [
          "Qué es",
          "Dios devuelve la vida a su iglesia y la despierta a la santidad, la oración y el primer amor.",
          "La iglesia anuncia el evangelio a los que no creen.",
          "Un avivamiento que se desborda y transforma a una sociedad entera.",
        ],
        [
          "A quién alcanza",
          "Primero al pueblo de Dios; desde él, alcanza con poder a los perdidos.",
          "A los que todavía no creen en Cristo.",
          "A toda una sociedad, más allá de la iglesia.",
        ],
        [
          "Cómo ocurre",
          "Lo envía Dios por su Espíritu: nadie lo fabrica, pero se busca con oración, arrepentimiento y obediencia a la Palabra.",
          "La hace la iglesia: una campaña se planea y se anuncia, y puede ser fruto de un avivamiento.",
          "Es el mismo avivamiento, obra del Espíritu, cuando se desborda fuera de la iglesia.",
        ],
        [
          "Base o ejemplo",
          "Salmos 85:6; Habacuc 3:2; Hechos 3:19; artículo 15 de la declaración de fe.",
          "Marcos 16:15; por ejemplo, una campaña de evangelización.",
          "El Gran Despertar del siglo XVIII en las colonias británicas de América (lección 4).",
        ],
      ],
    },
  ],
  "n5-avivamiento-4": [
    // La lección no tiene video y su historia abarca casi dos siglos; la línea de tiempo ordena de un vistazo los avivamientos y sus frutos, con la carta de Wesley de 1791 en su lugar (objetivo o4).
    {
      t: "linea",
      titulo: "De Herrnhut a Valparaíso: los avivamientos y sus frutos",
      eventos: [
        {
          fecha: "1727",
          texto: "La comunidad morava de Herrnhut, Alemania, vive un avivamiento en la Santa Cena; nace una cadena de oración y salen cientos de misioneros.",
        },
        {
          fecha: "Desde 1734",
          texto: "Gran Despertar en las colonias británicas de América, con Jonathan Edwards en Northampton y la predicación de George Whitefield.",
        },
        {
          fecha: "Desde 1738",
          texto: "Avivamiento metodista en Inglaterra: Juan y Carlos Wesley y Whitefield predican al aire libre a los mineros y a los pobres.",
        },
        {
          fecha: "1791",
          texto: "Juan Wesley escribe su última carta a William Wilberforce para animarlo en su lucha contra el comercio de esclavos.",
        },
        {
          fecha: "1801",
          texto: "Cane Ridge, Kentucky: uno de los comienzos del Segundo Gran Despertar en Estados Unidos, que sigue con la predicación de Charles Finney.",
        },
        {
          fecha: "1857-1858",
          texto: "Avivamiento de oración de Nueva York, que empieza con una reunión de oración de mediodía en la calle Fulton.",
        },
        { fecha: "1904-1905", texto: "Avivamiento de Gales, con el joven Evan Roberts." },
        {
          fecha: "1906",
          texto: "Calle Azusa, Los Ángeles, con William J. Seymour: cuna del pentecostalismo moderno, que se extiende por todo el mundo.",
        },
        {
          fecha: "1907",
          texto: "Avivamiento de Pyongyang, en Corea, que estalla en enero durante unas reuniones de estudio de la Biblia.",
        },
        {
          fecha: "1909",
          texto: "Valparaíso, Chile, con el misionero Willis C. Hoover: origen de la Iglesia Metodista Pentecostal de Chile.",
        },
      ],
    },
  ],
  "n5-avivamiento-5": [
    // La lección no tiene video y da varios criterios uno tras otro; los pasos los vuelven un método para examinar lo que sucede en un culto sin apagar al Espíritu (objetivo o5).
    {
      t: "pasos",
      titulo: "Cómo examinar lo que sucede en un culto",
      pasos: [
        {
          titulo: "Ni lo apagues ni lo aceptes todo",
          texto: "Empieza por el equilibrio de Pablo: no apagar lo que Dios hace, por miedo o por frialdad, pero examinarlo todo y retener solo lo bueno (1 Tesalonicenses 5:19-21).",
        },
        {
          titulo: "Mira qué lugar le da a Cristo",
          texto: "Es la prueba principal: una obra del Espíritu confiesa a Jesucristo venido en carne y lo exalta como Hijo de Dios y Salvador (1 Juan 4:1-3).",
        },
        {
          titulo: "Mira el fruto en las vidas",
          texto: "Al árbol se le conoce por su fruto: ¿la gente deja el pecado y crece en amor a Dios y al prójimo? (Mateo 7:16-17).",
        },
        {
          titulo: "Pésalo con la Escritura",
          texto: "Una obra verdadera aumenta el amor y el respeto por la Biblia y lleva a la verdad, no a la confusión; lo que contradice la Palabra no se retiene (1 Juan 4:6).",
        },
        {
          titulo: "No decidas por las manifestaciones",
          texto: "Las lágrimas, los temblores o los gritos no prueban por sí solos que una obra sea de Dios, ni que no lo sea, como enseñó Jonathan Edwards en 1741: deciden Cristo y el fruto.",
        },
        {
          titulo: "Cuida el orden",
          texto: "Las manifestaciones del Espíritu no se oponen al orden: Dios es Dios de paz y no de confusión, y todo se hace con decencia y con orden (1 Corintios 14:33, 40).",
        },
        {
          titulo: "Rechaza el fuego extraño",
          texto: "La presencia de Dios no se fabrica con manipulación de las emociones, presión para dar dinero ni espectáculo: lo que Dios no manda no aviva a su iglesia (Levítico 10:1-2).",
        },
      ],
    },
  ],
  // Seminario de liderazgo ministerial
  "n5-seminario-1": [
    // Reúne en una sola vista los seis pasos que la materia usa en todos sus casos, con los versículos de la lección que los sostienen.
    {
      t: "pasos",
      titulo: "El método del seminario: seis pasos con oración y consejo",
      pasos: [
        {
          titulo: "Los hechos",
          texto: "Qué pasó, quiénes están involucrados y qué se sabe con certeza. Se separa lo comprobado de lo supuesto y se escucha a todas las partes antes de responder (Proverbios 18:13, 17).",
        },
        {
          titulo: "El problema de fondo",
          texto: "Lo que se ve suele ser un síntoma. Se pregunta qué hay debajo, sin quedarse en la primera queja ni en el primer culpable.",
        },
        {
          titulo: "Los principios bíblicos",
          texto: "Qué enseña la Escritura sobre esta situación, leída en su contexto. Se pide sabiduría a Dios, que la da con generosidad y sin reprochar (Santiago 1:5).",
        },
        {
          titulo: "Las opciones",
          texto: "Dos o tres caminos posibles, cada uno con sus consecuencias, pensados con el consejo de hermanos maduros (Proverbios 15:22).",
        },
        { titulo: "La decisión", texto: "Qué se hará, quién lo hará y cómo se comunicará, con sus razones." },
        {
          titulo: "La evaluación",
          texto: "Volver después y preguntar qué resultó y qué se aprendió. La oración y el consejo acompañan cada paso, no solo el primero.",
        },
      ],
    },
  ],
  "n5-seminario-2": [
    // Pone lado a lado cada paso de Hechos 15 y su aplicación al caso, para ver cómo se lleva un modelo bíblico a una situación de hoy.
    {
      t: "cuadro",
      titulo: "Del modelo de Hechos 15 al caso del culto",
      columnas: ["Paso", "En Hechos 15", "En el caso del culto"],
      filas: [
        [
          "Escuchar a las partes",
          "Se reunieron para conocer el asunto y, tras mucha discusión, oyeron a Pedro, a Bernabé y a Pablo (Hechos 15:6-12).",
          "Los líderes escuchan a cada grupo por separado y después juntos.",
        ],
        [
          "Examinar la Escritura",
          "Jacobo mostró que las palabras de los profetas concordaban con lo que Dios estaba haciendo (Hechos 15:13-17).",
          "Enseñan sobre la adoración y el amor, distinguiendo lo bíblico de lo que es gusto personal.",
        ],
        [
          "Buscar la dirección de Dios",
          "Decidieron lo que pareció bien al Espíritu Santo y a ellos, no solo lo que quería una mayoría (Hechos 15:28).",
          "Oran y proponen un camino que honre a los dos grupos: variedad en el culto o espacios que no dividan.",
        ],
        [
          "Comunicar la decisión",
          "Escribieron una carta y enviaron a Judas y a Silas para explicarla también de palabra (Hechos 15:22-27).",
          "Explican la decisión con sus razones y piden que las críticas se hablen de frente.",
        ],
        [
          "Acompañar después",
          "Judas y Silas consolaron a los hermanos, y después lo acordado se entregó a las iglesias (Hechos 15:32; 16:4-5).",
          "Visitan a las familias molestas y vuelven a evaluar en unos meses.",
        ],
      ],
    },
  ],
  "n5-seminario-6": [
    // Muestra las ocho partes con un ejemplo completo, como modelo para escribir el plan propio que puede servir de base para el proyecto final.
    {
      t: "cuadro",
      titulo: "Las ocho partes del plan, con un ejemplo",
      columnas: ["Parte del plan", "Qué responde", "Ejemplo: un ministerio de bienvenida"],
      filas: [
        [
          "El llamado y la visión",
          "A qué me llamó Dios y hacia dónde lleva mi ministerio. Todo se encomienda a Él (Proverbios 16:3).",
          "Recibir a los que llegan, para que ninguna visita se vaya sin ser conocida y acompañada.",
        ],
        [
          "El diagnóstico",
          "Las fortalezas, las debilidades, las oportunidades y los riesgos.",
          "Hay hermanos amables, pero nadie anota a las visitas; llegan nuevos cada semana; el riesgo es el cansancio.",
        ],
        [
          "Las metas",
          "Pocas, claras, que se puedan medir y con fecha, escritas para compartirlas (Habacuc 2:2).",
          "Llamar a cada visita en su primera semana e inscribir a diez nuevos en el Nivel 1 antes de diciembre.",
        ],
        [
          "El equipo",
          "Quiénes ayudarán y cómo se los formará.",
          "Seis hermanos de bienvenida, formados en dos reuniones cada trimestre.",
        ],
        [
          "Los recursos",
          "Lo que hace falta y un presupuesto sencillo: calcular antes de edificar (Lucas 14:28).",
          "Tarjetas de bienvenida, una lista de contactos y un presupuesto pequeño para un café al mes.",
        ],
        [
          "El calendario",
          "Qué se hará cada mes o cada trimestre.",
          "Enero: formar al equipo; febrero: empezar las llamadas; cada mes: un café con los nuevos.",
        ],
        [
          "La evaluación",
          "Cómo y cuándo se revisa el avance, y a quién se rinden cuentas.",
          "Cada trimestre, con el pastor: cuántos nuevos se quedaron y qué hay que mejorar.",
        ],
        [
          "El cuidado personal",
          "La vida con Dios, la familia y el descanso de quien sirve.",
          "Oración diaria, una noche libre con la familia y turnos para no servir todos los domingos.",
        ],
      ],
    },
  ],
  // Evangelismo personal avanzado
  "evangelismo-misiones-1-2": [
    // Pone cada distorsión frente a lo que enseña la Escritura, para reconocerla en una conversación o en un mensaje.
    {
      t: "cuadro",
      titulo: "El evangelio de la Escritura frente a sus distorsiones",
      columnas: ["Aspecto", "Un evangelio distorsionado", "El evangelio de la Escritura"],
      filas: [
        [
          "El centro",
          "Lo que yo puedo ganar: una vida mejor, dinero o éxito.",
          "Cristo, que murió por nuestros pecados, fue sepultado y resucitó al tercer día (1 Corintios 15:3-4).",
        ],
        [
          "La salvación",
          "Un premio por portarse bien: las obras.",
          "Un regalo de Dios: por gracia, por medio de la fe, y no por obras (Efesios 2:8-9).",
        ],
        [
          "Lo que promete",
          "Dinero, salud o éxito seguros a cambio de la fe o de una ofrenda: la prosperidad.",
          "La reconciliación con Dios (2 Corintios 5:19-20); la piedad no es un medio de ganar dinero (1 Timoteo 6:5-10).",
        ],
        [
          "El pecado y la cruz",
          "Se callan para no incomodar: un Jesús sin cruz.",
          "Se anuncian con amor: Cristo se dio por nuestros pecados (Gálatas 1:4), y no hay otro evangelio (Gálatas 1:6-7).",
        ],
        [
          "La respuesta",
          "Dar por salvo a alguien solo porque repitió unas palabras.",
          "Arrepentirse y creer en el evangelio (Marcos 1:15); la oración expresa esa fe, pero salva Cristo.",
        ],
        [
          "El resultado",
          "Una decisión que no cambia la vida.",
          "Un discípulo que sigue a Cristo cargando su cruz (Lucas 14:27).",
        ],
      ],
    },
  ],
  "evangelismo-misiones-1-3": [
    // La lección pide comparar a Pablo en la sinagoga y en el Areópago: el cuadro pone lado a lado lo que cambió y lo que no.
    {
      t: "cuadro",
      titulo: "Tesalónica y Atenas: otro punto de partida, el mismo evangelio",
      columnas: ["Aspecto", "En la sinagoga de Tesalónica", "En el Areópago de Atenas"],
      filas: [
        [
          "Quiénes oían",
          "Judíos que conocían las Escrituras, y griegos piadosos (Hechos 17:1-4).",
          "Filósofos epicúreos y estoicos, y atenienses que no conocían la Biblia (Hechos 17:18-21).",
        ],
        [
          "El punto de partida",
          "Las Escrituras, que ellos ya conocían (Hechos 17:2-3).",
          "Un altar que ellos veían, con la inscripción al Dios no conocido (Hechos 17:23).",
        ],
        [
          "Cómo habló",
          "Discutió con ellos tres días de reposo, explicando y mostrando con las Escrituras (Hechos 17:2-3).",
          "Anunció al Dios creador, que da a todos vida, y citó a poetas de ellos (Hechos 17:24-28).",
        ],
        [
          "El centro del mensaje",
          "Que el Cristo debía padecer y resucitar, y que Jesús es el Cristo (Hechos 17:3).",
          "El llamado a arrepentirse y el juicio por el varón que Dios levantó de los muertos (Hechos 17:30-31).",
        ],
        [
          "Lo que pasó",
          "Algunos creyeron, con muchos griegos piadosos; otros, con celos, alborotaron la ciudad (Hechos 17:4-5).",
          "Unos se burlaron, otros quisieron oír más, y algunos creyeron, como Dionisio y Dámaris (Hechos 17:32-34).",
        ],
        [
          "Para hoy",
          "Con quien conoce la Biblia, parte de ella y muéstrale a Cristo en las Escrituras.",
          "Con quien no la conoce, parte de lo que ve y vive, y llévalo a Cristo resucitado.",
        ],
      ],
    },
  ],
  "evangelismo-misiones-1-4": [
    // Reúne en una sola vista los cuatro ejemplos de la lección, con lo que hizo cada uno y lo que enseña para evangelizar a los suyos.
    {
      t: "cuadro",
      titulo: "Cuatro ejemplos: el evangelio con la familia y los amigos",
      columnas: ["Ejemplo", "Qué hizo", "Qué aprendemos"],
      filas: [
        [
          "El hombre de Gadara (Marcos 5:18-20)",
          "Quería irse con Jesús, pero Jesús lo envió a contar a los suyos lo que el Señor había hecho con él.",
          "Tu casa es tu primer campo misionero: cuenta lo que Dios hizo contigo.",
        ],
        [
          "Cornelio (Hechos 10:24-27)",
          "Reunió en su casa a sus parientes y amigos cercanos para oír a Pedro.",
          "Abre tu casa e invita a los tuyos a oír la palabra.",
        ],
        [
          "El carcelero de Filipos (Hechos 16:31-34)",
          "Él y todos los de su casa oyeron la palabra; se bautizó con los suyos y se regocijó con toda su casa.",
          "Toda la casa necesita oír el evangelio, y cada persona debe creer.",
        ],
        [
          "Felipe (Juan 1:45-46)",
          "Cuando su amigo Natanael dudó, no discutió: lo invitó a ver a Jesús por sí mismo.",
          "No hace falta ganar la discusión: invita a conocer a Jesús.",
        ],
      ],
    },
  ],
  // Campañas y cruzadas
  "evangelismo-misiones-2-2": [
    // Ordena en el tiempo los ejemplos de la lección, de Pablo en Éfeso a Billy Graham, y muestra que salir a predicar adonde está la gente no es un invento moderno.
    {
      t: "linea",
      titulo: "De Pablo a Billy Graham: la predicación pública en la historia",
      eventos: [
        {
          fecha: "Siglo I d. C.",
          texto: "Pablo enseña cada día, durante dos años, en la escuela de Tiranno, en Éfeso: judíos y griegos de toda Asia oyen la palabra del Señor.",
          ref: "Hechos 19:9-10",
        },
        {
          fecha: "Febrero de 1739",
          texto: "George Whitefield empieza a predicar al aire libre a los mineros de Kingswood, cerca de Bristol, que casi nunca entraban en una iglesia.",
        },
        {
          fecha: "Abril de 1739",
          texto: "John Wesley sigue su ejemplo y predica al aire libre en Bristol: los dos llevan el evangelio adonde está la gente.",
        },
        {
          fecha: "1918",
          texto: "Nace Billy Graham, el evangelista estadounidense que en el siglo XX predicará en campañas en muchos países.",
        },
        {
          fecha: "1957",
          texto: "La campaña de Billy Graham en el Madison Square Garden de Nueva York se extiende por dieciséis semanas.",
        },
        {
          fecha: "2018",
          texto: "Muere Billy Graham. Sus campañas se preparaban con tiempo, con las iglesias de cada ciudad y con consejeros para los que respondían.",
        },
      ],
    },
  ],
  "evangelismo-misiones-2-4": [
    // Pone lado a lado el llamado honesto y el que manipula, que es justo lo que esta lección enseña a distinguir.
    {
      t: "cuadro",
      titulo: "Llamado honesto o manipulación: cómo distinguirlos",
      columnas: ["Aspecto", "Llamado honesto", "Llamado que manipula", "Base bíblica"],
      filas: [
        [
          "El centro del mensaje",
          "Jesucristo crucificado, anunciado como Señor.",
          "El predicador, sus historias o promesas de éxito.",
          "1 Corintios 2:2; 2 Corintios 4:5",
        ],
        [
          "En qué confía",
          "En el poder de Dios, para que la fe no se funde en la sabiduría humana.",
          "En palabras persuasivas, trucos y emociones fabricadas.",
          "1 Corintios 2:4-5",
        ],
        [
          "Lo que explica",
          "Qué es responder: arrepentirse de los pecados y confiar en Cristo.",
          "Pide levantar la mano o pasar al frente sin explicar qué significa.",
          "Hechos 2:38",
        ],
        [
          "La libertad",
          "Da tiempo y libertad, sin presión ni música que manipule.",
          "Repite el llamado, sube la música y apura diciendo que el tiempo se acaba.",
          "2 Corintios 4:2",
        ],
        [
          "Las promesas",
          "Solo ofrece lo que Dios prometió en su Palabra.",
          "Promete lo que Dios no prometió para que la gente pase.",
          "2 Corintios 4:2",
        ],
        [
          "El paso visible",
          "Invita a pasar al frente o a hablar con un consejero, sin decir que eso salva.",
          "Da a entender que pasar al frente es lo que salva.",
          "Hechos 2:38; Efesios 2:8-9",
        ],
        [
          "Lo que sigue",
          "Explica los pasos siguientes: la Biblia, la oración y una iglesia cercana.",
          "Termina en la emoción del momento, sin decir qué sigue.",
          "Hechos 2:41-42",
        ],
      ],
    },
  ],
  "evangelismo-misiones-2-5": [
    // Une en un solo camino lo que hace el consejero y lo que hace el equipo de seguimiento, desde la noche de la campaña hasta las primeras semanas.
    {
      t: "pasos",
      titulo: "Del llamado al discipulado: cómo se cuida a quien responde",
      pasos: [
        {
          titulo: "Recibir y escuchar",
          texto: "Un consejero maduro y preparado, de una de las iglesias que participan, recibe a la persona y la escucha: qué decidió y por qué.",
        },
        {
          titulo: "Explicar el evangelio y orar",
          texto: "Le explica con la Biblia qué es arrepentirse y confiar en Cristo, y ora con ella, sin presionarla ni prometerle lo que no puede cumplir.",
        },
        {
          titulo: "Anotar los datos con permiso",
          texto: "Solo si la persona lo permite, anota sus datos y los entrega a la iglesia más cercana a su casa, para que pueda congregarse cerca.",
        },
        { titulo: "Contactar pronto", texto: "En los días siguientes, alguien de esa iglesia la llama o la visita." },
        {
          titulo: "Integrarla en la iglesia",
          texto: "La invita a un grupo de nuevos creyentes y a los cultos, y le da una Biblia con un plan de lectura sencillo.",
        },
        {
          titulo: "Asignarle un acompañante",
          texto: "Se le asigna un acompañante que la cuide en sus primeras semanas, como en la consolidación que se estudió en el Nivel 3.",
        },
        {
          titulo: "Llevar un registro",
          texto: "Se anota cada contacto para que nadie se pierda. La meta es un discípulo maduro en Cristo y un fruto que permanezca (Colosenses 1:28; Juan 15:16).",
        },
      ],
    },
  ],
  // Teología bíblica de las misiones
  "evangelismo-misiones-3-2": [
    // La lección recorre cinco pasajes seguidos sin un resumen; el cuadro los reúne y muestra que desde Génesis Dios piensa en todas las naciones.
    {
      t: "cuadro",
      titulo: "La misión de Dios en el Antiguo Testamento",
      columnas: ["Pasaje", "Lo que enseña", "Para la iglesia hoy"],
      filas: [
        [
          "Génesis 12:1-3 y Gálatas 3:8",
          "En Abram serán benditas todas las familias de la tierra; Pablo lo llama el evangelio anunciado de antemano.",
          "Dios nos bendice para que seamos bendición a todos los pueblos.",
        ],
        [
          "Éxodo 19:5-6",
          "Toda la tierra es de Dios; Israel debía ser un reino de sacerdotes que mostrara a Dios a las naciones.",
          "Como real sacerdocio, la iglesia está entre Dios y los demás para mostrarlo (1 Pedro 2:9).",
        ],
        [
          "Salmos 67:1-2",
          "Se pide la bendición de Dios para que su camino y su salvación se conozcan en todas las naciones.",
          "Pedimos bendición con un propósito: que otros conozcan a Dios.",
        ],
        [
          "Isaías 49:6 y Hechos 13:47",
          "El Siervo es luz de las naciones; Pablo y Bernabé aplicaron estas palabras a su misión entre los gentiles.",
          "La salvación de Dios debe llegar hasta lo último de la tierra.",
        ],
        [
          "Jonás 4:1-2 y 4:11",
          "Jonás no quería que Nínive, ciudad enemiga, recibiera misericordia; Dios le muestra su piedad por esa gran ciudad.",
          "El corazón de Dios es más grande que nuestros prejuicios.",
        ],
      ],
    },
  ],
  "evangelismo-misiones-3-3": [
    // El objetivo pide interpretar la gran comisión según Mateo y Lucas; el cuadro compara su base, su mandato, su alcance y lo que sostiene a los enviados.
    {
      t: "cuadro",
      titulo: "La gran comisión según Mateo y según Lucas",
      columnas: ["Aspecto", "Mateo 28:18-20", "Lucas 24:46-48"],
      filas: [
        [
          "En qué se apoya",
          "En la autoridad de Cristo: toda potestad le es dada en el cielo y en la tierra.",
          "En lo que estaba escrito: el Cristo debía padecer y resucitar al tercer día.",
        ],
        [
          "Qué manda",
          "Ir y hacer discípulos: bautizarlos y enseñarles a guardar todo lo que Jesús mandó.",
          "Predicar en su nombre el arrepentimiento y el perdón de pecados.",
        ],
        [
          "A quiénes llega",
          "A todas las naciones: cada pueblo con su propia lengua y su propia cultura.",
          "A todas las naciones, comenzando desde Jerusalén.",
        ],
        [
          "El papel de los enviados",
          "Hacer discípulos que aprendan a obedecer a Cristo.",
          "Ser testigos de estas cosas: que el Cristo padeció y resucitó.",
        ],
        [
          "Lo que los sostiene",
          "La presencia de Jesús con ellos todos los días, hasta el fin del mundo.",
          "La promesa del Padre: serían investidos de poder desde lo alto (Lucas 24:49).",
        ],
      ],
    },
  ],
  "evangelismo-misiones-3-5": [
    // La lección enumera la estrategia de Pablo; los pasos la ordenan como un método, con la base bíblica de cada uno, para plantar obras que sigan sin el misionero.
    {
      t: "pasos",
      titulo: "La estrategia misionera de Pablo, paso a paso",
      pasos: [
        {
          titulo: "Ir adonde Cristo no es conocido",
          texto: "Pablo se esforzó por predicar donde Cristo no había sido nombrado, para no edificar sobre fundamento ajeno, y buscaba a los que nunca habían oído de él (Romanos 15:20-21).",
        },
        {
          titulo: "Empezar en ciudades clave",
          texto: "Comenzaba en ciudades importantes, desde donde el evangelio se extendía a la región: tras dos años en Éfeso, todos los que vivían en la provincia de Asia oyeron la palabra (Hechos 19:10).",
        },
        {
          titulo: "Trabajar en equipo",
          texto: "No servía solo: trabajó con Bernabé, Silas, Timoteo, Priscila y Aquila, y con otros colaboradores.",
        },
        {
          titulo: "Adaptarse sin cambiar el evangelio",
          texto: "Siendo libre, se hizo siervo de todos para ganar a más: se acercaba a judíos y gentiles en su cultura, pero seguía bajo la ley de Cristo y no cambiaba el mensaje (1 Corintios 9:19-22).",
        },
        {
          titulo: "Plantar, fortalecer y dejar líderes",
          texto: "Volvía a las ciudades para confirmar a los discípulos, constituía ancianos en cada iglesia y, después de orar con ayunos, los encomendaba al Señor (Hechos 14:21-23).",
        },
        {
          titulo: "Seguir cuidando y rendir cuentas",
          texto: "Cuidaba a las iglesias con visitas y cartas, con preocupación por todas ellas (2 Corintios 11:28), y contaba a la iglesia que lo envió lo que Dios había hecho (Hechos 14:26-27).",
        },
      ],
    },
  ],
  // Misión transcultural
  "evangelismo-misiones-4-3": [
    // Pone en una tabla las preguntas de la lección para distinguir el evangelio de las costumbres, con lo que se hace y un ejemplo de cada caso.
    {
      t: "cuadro",
      titulo: "El evangelio y las costumbres: qué se hace con cada una",
      columnas: ["El caso", "Qué se hace", "Ejemplo"],
      filas: [
        [
          "Algo que la Biblia manda o prohíbe",
          "Se obedece en toda cultura, porque la Escritura es la medida de todas.",
          "Decir la verdad y honrar el matrimonio (Efesios 4:25; Hebreos 13:4).",
        ],
        [
          "Una costumbre del misionero",
          "No se impone: el evangelio no exige cambiar de cultura (Hechos 15:19).",
          "Su estilo de música, de ropa o de culto.",
        ],
        [
          "Una costumbre del pueblo que no contradice la Palabra",
          "Se conserva, y aun puede usarse para adorar a Dios.",
          "La hospitalidad, el respeto a los mayores, su comida y su música.",
        ],
        [
          "Una costumbre del pueblo que contradice la Palabra",
          "No se conserva: el evangelio la transforma.",
          "Las ofrendas a los ídolos o a los espíritus (Hechos 15:20; 1 Tesalonicenses 1:9).",
        ],
      ],
    },
  ],
  "evangelismo-misiones-4-4": [
    // Ordena en el tiempo la historia que cuenta la lección, de Nehemías 8 a la Reina-Valera de hoy, y recuerda que la tarea de traducir no ha terminado.
    {
      t: "linea",
      titulo: "La Palabra en la lengua del pueblo: de Esdras a la Reina-Valera",
      eventos: [
        {
          fecha: "c. 445 a. C.",
          texto: "En tiempos de Esdras se lee la ley al pueblo, y los levitas ponen el sentido para que todos entiendan.",
          ref: "Nehemías 8:7-8",
        },
        {
          fecha: "1569",
          texto: "En el exilio, Casiodoro de Reina publica en Basilea la Biblia del Oso: la primera Biblia completa en español traducida de los originales.",
        },
        {
          fecha: "1602",
          texto: "Cipriano de Valera publica su revisión de la Biblia de Reina, tras unos veinte años de trabajo. De ahí viene el nombre Reina-Valera.",
        },
        {
          fecha: "1960",
          texto: "Las Sociedades Bíblicas en América Latina publican la revisión de 1960, la más usada por los evangélicos de habla hispana.",
        },
        {
          fecha: "Hoy",
          texto: "Todavía hay pueblos sin la Biblia completa en su lengua: la misión apoya la traducción y forma maestros que la enseñen.",
          ref: "Romanos 10:17",
        },
      ],
    },
  ],
  "evangelismo-misiones-4-5": [
    // Une en un solo recorrido el llamado, la preparación, las etapas del choque cultural y el regreso, que la lección explica por partes.
    {
      t: "pasos",
      titulo: "El camino del misionero: del llamado al regreso",
      pasos: [
        {
          titulo: "El llamado confirmado",
          texto: "Dios llama, como en la visión de Macedonia (Hechos 16:9-10), y el equipo y la iglesia confirman el llamado antes de partir.",
        },
        {
          titulo: "La preparación",
          texto: "Antes de ir, se prepara en la Palabra, la lengua, la cultura y la salud, sabiendo que habrá pruebas (2 Corintios 11:26-27).",
        },
        {
          titulo: "El envío",
          texto: "No va solo: lo envía una iglesia que ora, lo sostiene y le pide cuentas, como Antioquía envió a Bernabé y a Saulo (Hechos 13:2-3).",
        },
        {
          titulo: "La llegada",
          texto: "Al principio todo parece nuevo y atractivo. Así empieza el choque cultural, un proceso normal que conviene conocer antes de ir.",
        },
        {
          titulo: "Los días difíciles",
          texto: "Después llegan el cansancio, la frustración y la nostalgia. No es falta de fe: se habla de ello, se ora y se sigue adelante.",
        },
        {
          titulo: "La adaptación",
          texto: "Con el tiempo viene la adaptación. Ayudan el descanso, el cuidado del cónyuge y de los hijos, y la comunicación con la iglesia.",
        },
        {
          titulo: "El regreso",
          texto: "Volver también es parte del camino: la iglesia lo recibe, lo escucha y lo acompaña, como Antioquía recibió a Pablo y a Bernabé (Hechos 14:26-28).",
        },
      ],
    },
  ],
  // Plantación de iglesias
  "evangelismo-misiones-5-2": [
    // La lección no tiene video ni esquema: el cuadro reúne sus cinco ejemplos bíblicos y lo que cada uno enseña del llamado, el carácter y el equipo.
    {
      t: "cuadro",
      titulo: "El plantador y su equipo en el Nuevo Testamento",
      columnas: ["Ejemplo bíblico", "Qué dice el texto", "Qué enseña al plantador"],
      filas: [
        [
          "Antioquía (Hechos 13:2-3)",
          "El Espíritu Santo apartó a Bernabé y a Saulo, y la iglesia ayunó, oró, les impuso las manos y los despidió.",
          "Se va con un llamado confirmado y con el respaldo de la iglesia que envía.",
        ],
        [
          "Los que guían la iglesia (1 Timoteo 3:1-7; Tito 1:5-9)",
          "Pablo pide una vida irreprensible, una casa bien gobernada y buen testimonio de los de afuera.",
          "Antes que los dones importa el carácter: la vida con Dios, la familia, la integridad y la perseverancia.",
        ],
        [
          "Priscila y Aquila (Romanos 16:3-5)",
          "Pablo los llama sus colaboradores en Cristo Jesús y manda saludar a la iglesia que se reunía en su casa.",
          "Nadie planta solo: la obra se hace en equipo y en las casas.",
        ],
        [
          "Un oficio en Corinto (Hechos 18:3-4)",
          "Pablo trabajó con Priscila y Aquila en el oficio de hacer tiendas, y cada día de reposo discutía en la sinagoga.",
          "Un oficio puede sostener al plantador mientras la iglesia crece, sin dejar de anunciar el evangelio.",
        ],
        [
          "Un año y seis meses (Hechos 18:11)",
          "Pablo se quedó en Corinto enseñándoles la palabra de Dios.",
          "Plantar una iglesia pide paciencia y enseñanza constante de la Palabra.",
        ],
      ],
    },
  ],
  "evangelismo-misiones-5-5": [
    // Pone frente a frente la iglesia que depende del plantador y la que madura, para analizar cada punto de la lección: líderes, servicio, orden y autonomía.
    {
      t: "cuadro",
      titulo: "De depender del plantador a una iglesia que madura",
      columnas: ["Aspecto", "Si todo depende del plantador", "Si la iglesia madura"],
      filas: [
        [
          "Liderazgo",
          "El plantador guía y decide todo, y nadie más se prepara para guiar.",
          "Se forman líderes del lugar desde el principio, como los ancianos que Tito debía establecer en cada ciudad (Tito 1:5).",
        ],
        [
          "Servicio",
          "Unos pocos lo hacen todo y los demás solo asisten.",
          "Cada creyente es preparado para la obra del ministerio según sus dones (Efesios 4:11-12).",
        ],
        [
          "Formación",
          "El plantador enseña, pero nadie aprende a enseñar a otros.",
          "Lo que se enseña se encarga a hermanos fieles que puedan enseñar también a otros (2 Timoteo 2:2).",
        ],
        [
          "Orden",
          "No hay orden, o se copian muchas reglas que ahogan a una iglesia pequeña.",
          "Un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras.",
        ],
        [
          "Sostén y gobierno",
          "Si el plantador o la ayuda de afuera faltan, la iglesia se detiene.",
          "Camina hacia sostenerse y gobernarse por sí misma, con sus propios líderes.",
        ],
        [
          "Extensión",
          "Espera que otros evangelicen y planten por ella.",
          "Camina hacia extenderse por sí misma y llevar el evangelio a otros lugares.",
        ],
        [
          "Relación con la iglesia que envió",
          "Control en todo, o ninguna relación.",
          "Apoyo y rendición de cuentas, sin perder el vínculo.",
        ],
      ],
    },
  ],
  "evangelismo-misiones-5-6": [
    // Ordena en seis pasos, cada uno con su ejemplo bíblico, lo que la lección pide para que una iglesia nueva plante otra, y sirve al objetivo de diseñar esos pasos.
    {
      t: "pasos",
      titulo: "De iglesia nueva a iglesia que planta otra",
      pasos: [
        {
          titulo: "Enseñar la misión desde el primer día",
          texto: "Desde el principio se enseña que la iglesia existe para la misión, como los filipenses, que tuvieron comunión en el evangelio desde el primer día (Filipenses 1:5).",
        },
        {
          titulo: "Orar por nuevos lugares",
          texto: "La iglesia ora por barrios, ciudades y pueblos sin iglesia. En Antioquía, el llamado llegó mientras sus profetas y maestros ministraban al Señor y ayunaban (Hechos 13:1-2).",
        },
        {
          titulo: "Formar futuros plantadores",
          texto: "Se forma con constancia a los que un día irán. En Éfeso, Pablo separó a los discípulos y discutía cada día en la escuela de Tiranno; en dos años, toda Asia oyó la palabra (Hechos 19:9-10).",
        },
        {
          titulo: "Enviar un equipo con bendición",
          texto: "Cuando el llamado se confirma, la iglesia envía al equipo con ayuno, oración e imposición de manos, como Antioquía envió a Bernabé y a Saulo (Hechos 13:3).",
        },
        {
          titulo: "Acompañar sin controlar",
          texto: "La iglesia madre sigue unida a la hija con apoyo y amistad, sin controlarla, confiando en que el que comenzó la buena obra la perfeccionará (Filipenses 1:6).",
        },
        {
          titulo: "La hija también siembra",
          texto: "La meta es que la iglesia hija extienda a su vez la palabra, como Tesalónica: desde allí se divulgó en Macedonia y Acaya, y su fe se extendió a todo lugar (1 Tesalonicenses 1:8).",
        },
      ],
    },
  ],
  // El ministerio pastoral
  "pastoral-1-4": [
    // La lección da el camino de Mateo 18 en un párrafo y sus principios en una lista; los pasos los ordenan de principio a fin, desde el caso de un delito hasta el perdón que restaura.
    {
      t: "pasos",
      titulo: "Corregir para restaurar: el camino de Mateo 18",
      pasos: [
        {
          titulo: "Antes de corregir, mira qué pasó",
          texto: "Distingue el pecado de una diferencia de opinión. Si puede haber un delito, como el abuso de un menor, protege primero a la víctima y denúncialo a las autoridades, como manda la ley.",
        },
        {
          titulo: "Habla con él a solas",
          texto: "Empieza siempre por lo más privado. La meta es ganar a tu hermano, no castigarlo ni humillarlo (Mateo 18:15). Hazlo con mansedumbre, porque tú también puedes ser tentado (Gálatas 6:1).",
        },
        {
          titulo: "Si no te oye, vuelve con uno o dos",
          texto: "Toma contigo a uno o dos testigos y habla otra vez con él (Mateo 18:16). Avanza al paso siguiente solo si hace falta.",
        },
        {
          titulo: "Solo al final, dilo a la iglesia",
          texto: "Si tampoco los oye, se lleva el asunto a la iglesia (Mateo 18:17). El pastor actúa junto con otros líderes, no solo, y deja constancia con discreción.",
        },
        {
          titulo: "Perdona, consuela y confirma el amor",
          texto: "Cuando hay arrepentimiento, la disciplina termina: se perdona y se consuela al hermano, para que no lo consuma la tristeza, y se le confirma el amor (2 Corintios 2:6-8).",
        },
      ],
    },
  ],
  "pastoral-1-5": [
    // La lección anuncia los peligros con cuatro pasajes y da las medidas en otra lista; el cuadro une cada peligro con su texto y con la medida que lo enfrenta.
    {
      t: "cuadro",
      titulo: "Los peligros para el rebaño y cómo protegerlo",
      columnas: ["El peligro", "Lo que advierte la Biblia", "Cómo se protege al rebaño"],
      filas: [
        [
          "Los lobos de afuera",
          "Entrarán lobos rapaces que no perdonarán al rebaño (Hechos 20:29)",
          "Velar, como pidió Pablo a los ancianos de Éfeso (Hechos 20:31)",
        ],
        [
          "Los que se levantan adentro",
          "Se levantarán hombres que hablen cosas perversas para arrastrar tras sí a los discípulos (Hechos 20:30)",
          "Enseñar la sana doctrina y advertir con claridad sobre los errores",
        ],
        [
          "La avaricia de los falsos maestros",
          "Introducen herejías encubiertamente y por avaricia hacen mercadería del rebaño (2 Pedro 2:1-3)",
          "Manejar el dinero entre dos personas y con cuentas claras",
        ],
        [
          "El abuso de poder",
          "Dios reprendió a los pastores que se enseñorearon de las ovejas con dureza y con violencia (Ezequiel 34:4)",
          "Tener un camino para que cualquiera pueda denunciar un abuso sin miedo",
        ],
        [
          "El daño a los pequeños",
          "Jesús fue tajante con quien hace tropezar a uno de estos pequeños (Mateo 18:6)",
          "Revisar y capacitar a quien sirve con niños, nunca dejarlo solo con un menor y denunciar toda sospecha: en Texas es ley",
        ],
      ],
    },
  ],
  // Consejería pastoral
  "pastoral-2-2": [
    // Lleva el ejemplo resuelto de la samaritana a los pasos de una consulta pastoral que pide la nota de la lección, con el versículo de Juan 4 que muestra cada uno.
    {
      t: "pasos",
      titulo: "Una conversación pastoral con el método de Jesús (Juan 4)",
      pasos: [
        {
          titulo: "Acércate y escucha antes de hablar",
          texto: "Jesús inició la conversación con un pedido sencillo y cruzó las barreras de su tiempo (Juan 4:7-9). Antes de dar respuestas, da tu tiempo.",
        },
        {
          titulo: "Entiende la necesidad real",
          texto: "Jesús partió de la necesidad del momento: el agua (Juan 4:7). Busca entender qué le pasa de verdad a la persona.",
        },
        {
          titulo: "Ilumina con la Palabra",
          texto: "Del agua del pozo, Jesús pasó al agua viva, el don de Dios (Juan 4:10). Lleva la conversación de lo cotidiano a lo profundo.",
        },
        {
          titulo: "Nombra con amor lo que haya que nombrar",
          texto: "Jesús nombró el pecado de la mujer sin humillarla, y reconoció lo que ella había dicho con verdad (Juan 4:16-18).",
        },
        {
          titulo: "Señala a Dios y ora con la persona",
          texto: "Jesús le habló del Padre y de la verdadera adoración (Juan 4:23-24). Lleva a la persona a Dios y ora con ella.",
        },
        {
          titulo: "Acuerden un paso y acompaña",
          texto: "La mujer dejó su cántaro y fue ella misma a contarlo a su ciudad (Juan 4:28-29). Deja que la persona actúe: acuerden un paso concreto y, después, acompáñala.",
        },
      ],
    },
  ],
  "pastoral-2-5": [
    // La lección distingue el perdón de la reconciliación solo en una nota; el cuadro los pone lado a lado, con su base bíblica y el cuidado de la víctima de abuso.
    {
      t: "cuadro",
      titulo: "Perdonar y reconciliarse no son lo mismo",
      columnas: ["Qué comparamos", "Perdonar", "Reconciliarse"],
      filas: [
        [
          "De quién depende",
          "De uno mismo",
          "De los dos; por eso Pablo pide la paz en cuanto dependa de nosotros (Romanos 12:18)",
        ],
        [
          "Por qué se hace",
          "Porque Dios nos perdonó en Cristo (Efesios 4:32)",
          "Porque Jesús la pone antes que la ofrenda en el altar (Mateo 5:23-24)",
        ],
        [
          "Lo que pide",
          "Dejar toda amargura, enojo e ira, y ser misericordiosos (Efesios 4:31-32)",
          "Un cambio real: pedir perdón sin excusas, perdonar y acordar pasos para reparar el daño",
        ],
        [
          "Ante el abuso",
          "La víctima puede perdonar",
          "Nunca se le pide volver a una situación de violencia ni ponerse en peligro",
        ],
      ],
    },
  ],
  // Ordenanzas y ceremonias
  "pastoral-3-1": [
    // Pone lado a lado lo que distingue a las ordenanzas de las ceremonias, que la lección explica en una lista, para que el alumno las distinga de un vistazo.
    {
      t: "cuadro",
      titulo: "Ordenanzas y ceremonias: en qué se distinguen",
      columnas: ["Qué comparamos", "Las ordenanzas", "Las ceremonias"],
      filas: [
        [
          "Cuáles son",
          "Dos: el bautismo en agua y la Santa Cena",
          "Por ejemplo, la presentación de niños, la boda y el funeral",
        ],
        [
          "Su base",
          "Un mandato del Señor: por eso se llaman ordenanzas (Mateo 28:19; 1 Corintios 11:24)",
          "No tienen un mandato directo, pero sí un fundamento bíblico",
        ],
        [
          "Sus elementos",
          "No se cambian: el agua, el pan y la copa",
          "Se adaptan a la cultura y a cada familia, siempre que honren a Dios",
        ],
        [
          "Cuándo se celebran",
          "En todo tiempo y lugar; la primera iglesia las practicó desde el principio (Hechos 2:41-42)",
          "En los momentos importantes de una familia, para bendecirla y acompañarla",
        ],
      ],
    },
  ],
  "pastoral-3-5": [
    // Ordena en el tiempo lo que la lección reparte en varias listas y una nota: la consejería, la licencia y sus plazos en Texas, el ensayo, la boda y la devolución de la licencia.
    {
      t: "linea",
      titulo: "Una boda en Texas, de la consejería a la licencia devuelta",
      eventos: [
        {
          fecha: "Antes de la boda",
          texto: "Consejería prematrimonial de cuatro a seis encuentros. El pastor conversa con los novios sobre su fe antes de comprometerse a casarlos.",
          ref: "2 Corintios 6:14",
        },
        {
          fecha: "La licencia",
          texto: "Los novios la sacan en la oficina del secretario del condado (County Clerk). Vence a los 90 días: la boda tiene que ser antes.",
        },
        {
          fecha: "72 horas después",
          texto: "Ya pueden casarse. Hay excepciones a esa espera, como haber tomado el curso Twogether in Texas, que además rebaja el costo de la licencia.",
        },
        {
          fecha: "Un día antes",
          texto: "Ensayar con los novios y el cortejo el orden de la ceremonia, que el pastor tiene por escrito.",
        },
        {
          fecha: "El día de la boda",
          texto: "Revisar la licencia antes de empezar: los nombres, la fecha y que no esté vencida. Después de la ceremonia, firmarla.",
        },
        {
          fecha: "Dentro de 30 días",
          texto: "El oficiante completa la licencia y la devuelve al condado: sin ese paso, el matrimonio no queda registrado.",
        },
      ],
    },
  ],
  "pastoral-3-6": [
    // El duelo no termina con el funeral: la línea reúne en orden lo que la lección enseña antes, durante y después del funeral, hasta el aniversario.
    {
      t: "linea",
      titulo: "Acompañar a una familia en duelo, antes y después del funeral",
      eventos: [
        {
          fecha: "Lo antes posible",
          texto: "Visitar a la familia, escuchar, orar y ofrecer ayuda práctica. La presencia del pastor dice más que muchas palabras.",
          ref: "Romanos 12:15",
        },
        {
          fecha: "Antes del funeral",
          texto: "Planear con la familia las lecturas, los cantos, quién dará la semblanza y las costumbres que quieren honrar.",
        },
        {
          fecha: "El funeral",
          texto: "Un servicio sencillo y con esperanza: bienvenida, lectura, cantos, semblanza, un mensaje de diez a quince minutos y oración.",
          ref: "Juan 11:25-26",
        },
        { fecha: "En el cementerio", texto: "Una lectura breve y una oración.", ref: "1 Corintios 15:55" },
        {
          fecha: "A la semana y al mes",
          texto: "Llamar o visitar a la familia, y pedir a la iglesia que siga cerca.",
        },
        { fecha: "Con los meses", texto: "Si el dolor no deja vivir a alguien, ayudarlo a buscar ayuda profesional." },
        {
          fecha: "El primer año",
          texto: "Llamar o visitar otra vez en el primer cumpleaños, en las fiestas y en el aniversario.",
        },
      ],
    },
  ],
  // Visitación y cuidado del rebaño
  "pastoral-4-3": [
    // La lección da la visita al hospital en una lista y el acompañamiento del que se muere en un párrafo y una nota; el cuadro los compara aspecto por aspecto.
    {
      t: "cuadro",
      titulo: "Visitar al enfermo y acompañar al que se está muriendo",
      columnas: ["Qué cuidar", "En el hospital", "Junto a quien se está muriendo"],
      filas: [
        [
          "Con quién coordinar",
          "Pregunta en la recepción o a la enfermera si puedes pasar: el hospital protege la privacidad del paciente",
          "En cuidados paliativos (hospice), coordina con el capellán o con el equipo médico",
        ],
        [
          "Cuánto y cada cuánto",
          "Sé breve: de diez a quince minutos, o menos si la persona está cansada",
          "Visítala más seguido",
        ],
        ["La Palabra", "Un pasaje breve, como el Salmo 23", "Las promesas de Jesús, como Juan 14:1-3"],
        [
          "La oración",
          "Ora con fe y, si lo piden, unge con aceite junto con otro anciano (Santiago 5:14)",
          "Ora, canta en voz baja si la familia lo desea y recuérdale el evangelio",
        ],
        ["La familia", "Cuida también a la familia que espera en el pasillo", "Acompaña a los suyos"],
        [
          "Lo que no se hace",
          "No te sientes en la cama ni toques los aparatos, y no des consejos médicos",
          "No prometas una sanidad que Dios no prometió, ni quites la esperanza",
        ],
      ],
    },
  ],
  "pastoral-4-5": [
    // La lección da en un solo paso del ejemplo resuelto la respuesta a tres de las causas por las que alguien se aleja, y en una nota la de quien se fue a otra iglesia; el cuadro une cada caso con un ejemplo y con su respuesta.
    {
      t: "cuadro",
      titulo: "Cuando alguien deja de venir: lo que pasó y cómo responder",
      columnas: ["Lo que pasó", "Por ejemplo", "Cómo responder"],
      filas: [
        ["Una herida", "Alguien de la iglesia lo ofendió o se sintió ignorado", "Pedir perdón si la iglesia falló"],
        [
          "Una crisis",
          "Una enfermedad, un duelo, el desempleo o un problema en la familia",
          "Acompañarlo en la crisis",
        ],
        [
          "Un pecado",
          "Un pecado que le da vergüenza",
          "Hablar con amor del pecado: quien lo hace volver de su error salva de muerte un alma (Santiago 5:19-20)",
        ],
        [
          "Se fue a otra iglesia",
          "Ahora se congrega en otra iglesia sana",
          "Bendecirlo y despedirlo en paz, sin hablar mal de él ni de su nueva iglesia",
        ],
      ],
    },
  ],
  // Predicación pastoral
  "pastoral-5-3": [
    // La lección enseña a lamentar y a esperar con cinco textos en párrafos separados; el cuadro muestra en cada uno el dolor que reconoce y lo que enseña al predicador.
    {
      t: "cuadro",
      titulo: "Lamentar y esperar: cinco textos para predicar en la crisis",
      columnas: ["El texto", "El dolor que no esconde", "Lo que enseña al predicador"],
      filas: [
        [
          "Job 2:13",
          "Su dolor era muy grande, y sus amigos se sentaron con él siete días y siete noches sin decirle palabra",
          "Acompañar antes de explicar: los amigos se equivocaron después, al explicar lo que no sabían",
        ],
        [
          "Salmos 46:1-2",
          "No niega la tormenta, aunque la tierra sea removida",
          "Afirmar que Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones",
        ],
        [
          "Lamentaciones 3:21-23",
          "Jeremías lloró sobre una ciudad destruida",
          "Lamentar y recordar que las misericordias de Dios son nuevas cada mañana",
        ],
        [
          "Juan 16:33",
          "Jesús no prometió una vida sin dolor: en el mundo tendremos aflicción",
          "Anunciar la esperanza: Jesús venció al mundo",
        ],
        [
          "Habacuc 3:17-18",
          "Aunque la higuera no florezca ni haya frutos en las vides",
          "Creer y gozarse en el Dios de la salvación cuando todo falta",
        ],
      ],
    },
  ],
  "pastoral-5-5": [
    // Convierte la regla de la verdad en amor y la diferencia entre exhortar y atacar en un método para preparar y predicar un mensaje que corrige.
    {
      t: "pasos",
      titulo: "Corregir desde el púlpito con la verdad en amor",
      pasos: [
        {
          titulo: "Examina tu corazón",
          texto: "Antes de un mensaje fuerte, pregúntate si lo dices porque el texto lo dice o porque estás dolido. Si estás herido con alguien, háblale en privado primero (Mateo 18:15).",
        },
        {
          titulo: "Mira qué necesita cada uno",
          texto: "No todos necesitan lo mismo: amonesta a los ociosos, alienta a los de poco ánimo y sostén a los débiles (1 Tesalonicenses 5:14). Consolar también es predicar (Isaías 40:1).",
        },
        {
          titulo: "Predica desde el texto, no desde el enojo",
          texto: "La exhortación nace del texto bíblico. La regla es la verdad en amor: la verdad sin amor hiere, y el amor sin verdad engaña (Efesios 4:15).",
        },
        {
          titulo: "Habla del pecado, no de una persona",
          texto: "No señales a nadie delante de todos, e inclúyete a ti mismo: la exhortación no habla siempre de los otros.",
        },
        {
          titulo: "Ofrece la gracia y un camino de vuelta",
          texto: "No dejes solo culpa. Pablo corrigió con muchas lágrimas, para que supieran cuán grande era su amor por ellos (2 Corintios 2:4).",
        },
        {
          titulo: "Sé fiel, aunque la verdad moleste",
          texto: "A veces decir la verdad molesta (Gálatas 4:16). El pastor no busca agradar a todos, sino ser fiel.",
        },
      ],
    },
  ],
  // Teología de la adoración
  "alabanza-1-1": [
    // La lección distingue alabar de adorar en un solo párrafo; el cuadro pone las dos lado a lado y muestra con el Salmo 95 que van juntas.
    {
      t: "cuadro",
      titulo: "Alabar y adorar: distintas, pero juntas",
      columnas: ["Aspecto", "Alabar", "Adorar"],
      filas: [
        ["Qué es", "Celebrar a Dios por lo que es y por lo que hace", "Inclinarse delante de Dios y rendirle la vida"],
        [
          "Con qué actitud",
          "Con gratitud y con gozo, sin olvidar sus beneficios",
          "Con humildad: reconocer que él es Dios y nosotros sus criaturas",
        ],
        [
          "Cómo se expresa",
          "Con cantos de júbilo y palabras de gratitud",
          "Postrándose, arrodillándose y entregándole lo más amado",
        ],
        [
          "Un ejemplo bíblico",
          "Salmos 103:1-2: bendecir a Jehová sin olvidar ninguno de sus beneficios",
          "Génesis 22:5: Abraham sube al monte a adorar, dispuesto a entregar a Isaac",
        ],
        [
          "En el Salmo 95",
          "Versículos 1-2: cantar con júbilo y llegar ante él con alabanza",
          "Versículo 6: adorar, postrarse y arrodillarse delante del Hacedor",
        ],
        [
          "Lo que no es",
          "No es solo la parte rápida del culto: es celebrar a Dios con gratitud y gozo",
          "No es solo la parte lenta del culto: es una respuesta del corazón",
        ],
      ],
    },
  ],
  "alabanza-1-3": [
    // La lección recorre siglos de historia de Israel; la línea ordena el tabernáculo, la música de David, el templo y los salmos, y muestra que el canto siguió hasta el regreso del destierro.
    {
      t: "linea",
      titulo: "La adoración de Israel: del tabernáculo al regreso del destierro",
      eventos: [
        {
          fecha: "c. 1445 a. C.",
          texto: "Moisés levanta el tabernáculo en el desierto y la gloria de Jehová lo llena: Dios habita con su pueblo. La fecha del éxodo se discute.",
          ref: "Éxodo 40:34-35",
        },
        {
          fecha: "c. 1000 a. C.",
          texto: "David lleva el arca a Jerusalén y pone levitas que alaben ante ella; su canto reúne partes de los Salmos 105, 96 y 106.",
          ref: "1 Crónicas 16:4-36",
        },
        {
          fecha: "c. 970 a. C.",
          texto: "Ya anciano, David organiza a los músicos del culto: 288 instruidos en el canto, que sirven por turnos, el maestro con el discípulo.",
          ref: "1 Crónicas 25:7-8",
        },
        {
          fecha: "c. 966-959 a. C.",
          texto: "Salomón edifica el templo en siete años. Después, en su dedicación, los músicos cantan a una y la gloria de Jehová llena la casa.",
          ref: "2 Crónicas 5:13-14",
        },
        {
          fecha: "587/586 a. C.",
          texto: "Babilonia quema el templo y lleva cautivo al pueblo. En el Salmo 137, los desterrados cuelgan sus arpas: ¿cómo cantar en tierra extraña?",
          ref: "Salmos 137:1-4",
        },
        {
          fecha: "c. 536 a. C.",
          texto: "De regreso del destierro, al echar los cimientos del nuevo templo, los levitas alaban como lo ordenó David: Dios es bueno.",
          ref: "Esdras 3:10-11",
        },
      ],
    },
  ],
  "alabanza-1-5": [
    // La lección explica por separado el espíritu y la verdad; el cuadro los pone frente a frente, con su base bíblica y lo que pasa cuando falta cada uno, como pide el objetivo o5.
    {
      t: "cuadro",
      titulo: "En espíritu y en verdad: las dos marcas de la adoración verdadera",
      columnas: ["Aspecto", "En espíritu", "En verdad"],
      filas: [
        [
          "Qué significa",
          "Adorar desde el interior, con el corazón, movidos por el Espíritu Santo",
          "Adorar conforme a quien Dios es, como se revela en su Palabra y en Cristo",
        ],
        ["Base bíblica", "Juan 4:24; Efesios 5:18-19; Isaías 29:13", "Juan 4:24; Juan 17:17; Colosenses 3:16"],
        [
          "Por qué importa",
          "Dios es Espíritu: no busca solo voces, sino adoradores de corazón",
          "Lo que cantamos enseña: muchos aprenden lo que creen de Dios por los cantos que repiten",
        ],
        [
          "Qué pasa si falta",
          "Honra de labios: se canta lo correcto, pero el corazón está lejos de Dios",
          "Se canta de Dios lo que la Biblia no dice, y el canto enseña un error",
        ],
      ],
    },
  ],
  // El adorador: carácter y vida
  "alabanza-2-2": [
    // La lección no tiene video y enseña un proceso, de la medida de Dios a la confesión, la limpieza, el servicio y la restauración: los pasos lo ordenan para repasarlo.
    {
      t: "pasos",
      titulo: "El camino de la santidad del que sirve en la alabanza",
      pasos: [
        {
          titulo: "Mirar la medida de Dios",
          texto: "Para estar en su presencia hacen falta manos limpias, lo que hacemos, y corazón puro, lo que pensamos y deseamos (Salmos 24:3-4).",
        },
        {
          titulo: "Reconocer el pecado sin excusas",
          texto: "Al ver la gloria de Dios, Isaías se reconoció hombre inmundo de labios. Delante de Dios vemos lo que somos (Isaías 6:5).",
        },
        {
          titulo: "Confesar y recibir la limpieza de Dios",
          texto: "Un serafín tocó la boca de Isaías con un carbón del altar, y su culpa fue quitada. Si confesamos, Dios nos perdona y nos limpia de toda maldad (Isaías 6:6-7; 1 Juan 1:9).",
        },
        {
          titulo: "Servir después de ser limpiado",
          texto: "Solo después de ser limpiado, Isaías respondió al llamado de Dios (Isaías 6:8). Los que usamos la voz para adorar necesitamos labios limpiados por Dios.",
        },
        {
          titulo: "Cuidar la santidad toda la semana",
          texto: "Lo que miro y escucho, cómo hablo también en las redes, la pureza sexual, la honestidad y el trato a mi familia: lo que hago el sábado se oye el domingo.",
        },
        {
          titulo: "Si caes, déjate restaurar",
          texto: "Ante un pecado grave, lo sano es apartarse un tiempo de la plataforma, ser restaurado con el acompañamiento de los pastores y volver cuando ellos lo vean listo.",
        },
      ],
    },
  ],
  "alabanza-2-4": [
    // Es la lección que pide planificar la vida devocional (objetivo o4) y no tiene video: los pasos convierten su lista en un plan que el alumno puede seguir.
    {
      t: "pasos",
      titulo: "Un plan sencillo para tu tiempo diario con Dios",
      pasos: [
        {
          titulo: "Escoger la buena parte",
          texto: "Antes de servir, estar con el Señor. Como María a los pies de Jesús, no dejes que los quehaceres del ministerio te quiten lo único necesario (Lucas 10:39-42).",
        },
        {
          titulo: "Fijar una hora y un lugar",
          texto: "Un tiempo fijo cada día, aunque sea corto. Jesús se levantó muy de mañana y se fue a un lugar desierto para orar (Marcos 1:35).",
        },
        {
          titulo: "Leer la Biblia con un plan",
          texto: "Lee en orden, con un plan, y medita en lo que lees. La Palabra alimenta lo que después cantamos (Salmos 1:2).",
        },
        {
          titulo: "Orar con un salmo y con tus palabras",
          texto: "Haz tuya la oración de un salmo, como la sed de Dios del Salmo 63, y sigue con tus propias palabras (Salmos 63:1).",
        },
        {
          titulo: "Cantarle a Dios a solas",
          texto: "Canta sin público, solo para él. Lo que se ve en la plataforma nace de lo que se vive en lo secreto.",
        },
        {
          titulo: "Escribir lo que Dios enseña",
          texto: "Anota en un cuaderno lo que Dios te enseña cada día: te ayudará a recordarlo y a vivirlo.",
        },
        {
          titulo: "Ayunar a veces",
          texto: "De vez en cuando, aparta un tiempo de ayuno para buscar a Dios, como se estudió en las disciplinas espirituales.",
        },
      ],
    },
  ],
  "alabanza-2-6": [
    // La lección presenta cuatro ejemplos seguidos de adoración en el dolor: el cuadro los pone lado a lado para comparar la prueba, la respuesta y lo que enseña cada uno.
    {
      t: "cuadro",
      titulo: "Adorar en la prueba: cuatro ejemplos de la Biblia",
      columnas: ["Ejemplo", "La prueba", "Cómo adoró", "Lo que enseña"],
      filas: [
        [
          "Job (Job 1:20-21)",
          "Perdió sus bienes y a sus hijos en un solo día.",
          "Rasgó su manto, se postró en tierra, adoró y bendijo el nombre de Jehová.",
          "Adorar en el dolor no es fingir que no duele: hizo duelo y adoró a la vez.",
        ],
        [
          "Pablo y Silas (Hechos 16:25)",
          "Fueron azotados y encerrados en la cárcel de Filipos.",
          "A medianoche oraban y cantaban himnos a Dios.",
          "La adoración en la noche también es testimonio: los presos los oían.",
        ],
        [
          "Habacuc (Habacuc 3:17-18)",
          "Imaginó la peor escasez: sin higos, sin uvas, sin ovejas y sin vacas.",
          "Declaró que, con todo, se alegraría en Jehová, el Dios de su salvación.",
          "Su gozo no dependía de las circunstancias, sino de Dios.",
        ],
        [
          "Pablo a los filipenses (Filipenses 4:4)",
          "Escribía desde la cárcel.",
          "Pidió regocijarse en el Señor siempre.",
          "El gozo cristiano no niega el dolor: confía en el Señor dentro de él.",
        ],
      ],
    },
  ],
  // Dirigir el ministerio de alabanza
  "alabanza-3-3": [
    // Esta lección no tiene video y trae dos listas aparte; los pasos las unen en un solo camino, de la oración al ensayo.
    {
      t: "pasos",
      titulo: "Preparar el culto y el ensayo, paso a paso",
      pasos: [
        {
          titulo: "Orar por el culto y por la iglesia",
          texto: "Todo empieza días antes, delante de Dios: se ora por el culto y por la iglesia que va a cantar.",
        },
        {
          titulo: "Hablar con el pastor",
          texto: "Se conversa sobre el tema y el mensaje del día, para que los cantos sirvan a lo que se va a predicar.",
        },
        {
          titulo: "Escoger los cantos y su orden",
          texto: "Se eligen los cantos y se ordenan para que el culto fluya con sentido. Se deciden los tonos y quién canta cada parte.",
        },
        {
          titulo: "Preparar las transiciones y las lecturas",
          texto: "Se piensa cómo pasar de un canto a otro y qué textos bíblicos se leerán. Improvisarlo todo cada domingo no es más espiritual: suele ser falta de preparación.",
        },
        {
          titulo: "Enviar la lista al equipo con tiempo",
          texto: "La lista y los recursos llegan al equipo con días de anticipación, porque el diligente planifica y no se apresura alocadamente (Proverbios 21:5).",
        },
        {
          titulo: "Ensayar lo que cuesta",
          texto: "Se empieza a tiempo, con oración y una palabra breve. Se repasa lo difícil, los principios, los finales y las transiciones, y se prueba el sonido con los técnicos.",
        },
        {
          titulo: "Terminar a tiempo y servir con júbilo",
          texto: "El ensayo termina a tiempo, cuidando a las familias del equipo. Se da lo mejor de corazón, como para el Señor (Colosenses 3:23): excelencia, no perfeccionismo.",
        },
      ],
    },
  ],
  "alabanza-3-4": [
    // El objetivo de la lección es distinguir guiar de manipular; el cuadro pone frente a frente lo que enseñan su lista y su nota.
    {
      t: "cuadro",
      titulo: "Guiar al pueblo, sin estorbar ni manipular",
      columnas: ["En qué se ve", "Así se guía", "Así se estorba o se manipula"],
      filas: [
        [
          "La meta",
          "Que todo el pueblo participe y alabe a Jehová (Esdras 3:11)",
          "Provocar una emoción o una reacción a la fuerza",
        ],
        [
          "Las palabras",
          "Pocas y claras: una frase o un versículo que centra al pueblo en Dios",
          "Un sermón entre canto y canto",
        ],
        ["La invitación", "Explica, anima y deja libre a cada uno", "Hacer sentir culpable al que no responde"],
        ["Lo que se anuncia", "La verdad de Dios, con la lectura de la Escritura", "Promesas que Dios no hizo"],
        [
          "La música",
          "Señales claras al equipo para repetir, terminar o seguir",
          "Repetir sin fin o subir el volumen para forzar una reacción",
        ],
        [
          "El orden",
          "Todo decentemente y con orden, con espacio a lo espontáneo (1 Corintios 14:40)",
          "Silencios largos, señales que nadie entiende y cambios sin aviso",
        ],
        ["Quién obra", "El Espíritu Santo, en cada corazón", "Los trucos del que dirige"],
      ],
    },
  ],
  "alabanza-3-6": [
    // La lección da los problemas en una lista y sus versículos en los párrafos; el cuadro los une para consultarlo cuando surja un conflicto.
    {
      t: "cuadro",
      titulo: "Problemas comunes del equipo y su respuesta bíblica",
      columnas: ["Problema", "Cómo se responde", "Base bíblica"],
      filas: [
        ["Celos y competencia", "Servir por turnos, honrar a cada uno y cultivar la humildad", "Santiago 3:16"],
        ["Conflictos personales", "Hablar primero a solas, sin chismes ni bandos", "Mateo 18:15"],
        [
          "Quejas por el volumen o el estilo",
          "Escuchar con mansedumbre, ajustar lo razonable y enseñar",
          "Proverbios 15:1",
        ],
        [
          "Gustos musicales distintos",
          "Buscar un mismo sentir: la unidad de la iglesia vale más que el gusto de cualquiera",
          "Romanos 15:5-6",
        ],
        [
          "Impuntualidad y falta de preparación",
          "Acuerdos claros y amor firme, hablados con la persona",
          "Proverbios 21:5; Mateo 18:15",
        ],
        ["El músico estrella", "Una conversación honesta sobre humildad y servicio", "Marcos 10:45; Santiago 3:16"],
        ["Cansancio", "Turnos, descanso y cuidado de las familias", "Marcos 6:31"],
      ],
    },
  ],
  // La música en la historia de la iglesia
  "alabanza-4-3": [
    // La lección cruza varios siglos; la línea ordena a Ambrosio, Agustín, san Benito y Gregorio Magno, y muestra cómo el pueblo fue quedando callado.
    {
      t: "linea",
      titulo: "De Ambrosio al pueblo callado: el canto antiguo y medieval",
      eventos: [
        { fecha: "Siglo IV", texto: "Ambrosio, obispo de Milán, escribe himnos para que el pueblo cante." },
        {
          fecha: "c. 387",
          texto: "Agustín, recién convertido y bautizado en Milán, llora de emoción al oír los himnos y cantos de la iglesia (Confesiones IX).",
        },
        {
          fecha: "Siglo VI",
          texto: "La Regla de san Benito pide cantar los 150 salmos cada semana: los monasterios guardan el canto de los salmos.",
        },
        {
          fecha: "590-604",
          texto: "Papado de Gregorio Magno. La tradición le asocia el canto llano, que por eso se llama canto gregoriano.",
        },
        {
          fecha: "Edad Media",
          texto: "El culto de Occidente se celebra en latín, que el pueblo ya no entiende; el canto queda en manos de clérigos, monjes y coros.",
          ref: "1 Corintios 14:16",
        },
      ],
    },
  ],
  "alabanza-4-4": [
    // Pone lado a lado el canto medieval y el de la Reforma, y muestra qué le devolvieron Lutero y Calvino al pueblo y con qué base bíblica.
    {
      t: "cuadro",
      titulo: "Lo que cambió la Reforma en el canto del pueblo",
      columnas: ["Aspecto", "En la Edad Media", "Con la Reforma (siglo XVI)"],
      filas: [
        ["Quién canta", "Sobre todo los clérigos, los monjes y los coros", "Toda la congregación, no solo el coro"],
        [
          "En qué lengua",
          "En latín, que la mayoría del pueblo ya no entendía",
          "En la lengua del pueblo: Lutero, en alemán; Calvino, en francés",
        ],
        [
          "Qué se canta",
          "El canto llano o gregoriano, en latín y sin acompañamiento",
          "Himnos y salmos en verso, llenos de la Palabra y de doctrina",
        ],
        [
          "Un ejemplo",
          "Los 150 salmos que los monjes cantaban cada semana, según la Regla de san Benito",
          "Castillo fuerte es nuestro Dios (Salmo 46) y el Salterio de Ginebra (1562)",
        ],
        [
          "El pueblo",
          "Queda como espectador y canta cada vez menos",
          "Vuelve a cantar, con melodías que puede aprender",
        ],
        [
          "Lo que dice la Biblia",
          "Sin entender, nadie puede decir el amén (1 Corintios 14:16)",
          "Cantar con el espíritu y también con el entendimiento (1 Corintios 14:15)",
        ],
      ],
    },
  ],
  "alabanza-4-5": [
    // La lección presenta seis personas de Inglaterra, los Estados Unidos y España; la línea las ordena por los años de su vida y resume el aporte de cada una.
    {
      t: "linea",
      titulo: "Los himnos de los avivamientos: quiénes y cuándo",
      eventos: [
        {
          fecha: "1674-1748",
          texto: "Isaac Watts escribe en Inglaterra cientos de himnos y salmos en verso, y ayuda a que se canten himnos nuevos sobre Cristo.",
        },
        {
          fecha: "1707-1788",
          texto: "Charles Wesley, hermano de Juan Wesley, escribe miles de himnos en el avivamiento metodista: el pueblo aprende la fe cantando.",
        },
        {
          fecha: "1783-1826",
          texto: "El inglés Reginald Heber escribe Santo, santo, santo, himno a la Trinidad. Más tarde lo traduce al español Juan Bautista Cabrera.",
        },
        {
          fecha: "1820-1915",
          texto: "Fanny Crosby, ciega desde muy pequeña, escribe miles de himnos en los Estados Unidos.",
        },
        {
          fecha: "1837-1916",
          texto: "Juan Bautista Cabrera, primer obispo protestante de España, escribe y traduce himnos evangélicos en español.",
        },
        {
          fecha: "1840-1908",
          texto: "Ira D. Sankey canta en las campañas del evangelista D. L. Moody, y sus cantos se difunden por todo el mundo.",
        },
      ],
    },
  ],
  // Sonido y técnica al servicio del culto
  "alabanza-5-1": [
    // comprobado: oEmbed: título "Espíritu de Dios", canal "Proyecto Biblia" (https://www.youtube.com/@ProyectoBibliaOficial). Dura 8:12; en su descripción, el capítulo 2:20 es "El Espíritu empodera a José y a Bezalel" (cómo el Espíritu capacita a las personas para tareas específicas).
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=kuLz0G4qhDU",
      titulo: "Espíritu de Dios",
      fuente: "Proyecto Biblia",
      minutos: 8,
    },
  ],
  "alabanza-5-3": [
    // El objetivo de la lección es distinguir: el cuadro pone lado a lado los dos tipos de micrófono, cómo se usan y las funciones básicas de la consola, con su para qué en el culto.
    {
      t: "cuadro",
      titulo: "Los micrófonos y la consola: qué es cada cosa y para qué sirve",
      columnas: ["Lo que hay que conocer", "Qué es o qué hace", "Para qué sirve en el culto"],
      filas: [
        [
          "Micrófono dinámico",
          "Resistente y menos sensible.",
          "Es el más usado para las voces en la plataforma y para muchos instrumentos.",
        ],
        [
          "Micrófono de condensador",
          "Más sensible y detallado; necesita la alimentación fantasma de la consola.",
          "Se usa, por ejemplo, para coros o instrumentos acústicos.",
        ],
        [
          "Cómo se usa el micrófono",
          "Cerca de la boca y apuntado a la fuente, lejos de los parlantes y de los monitores.",
          "Suena más claro y capta menos ruido de la sala.",
        ],
        [
          "Ganancia",
          "Ajusta cuánta señal entra de cada micrófono.",
          "Que la señal quede bien medida: se ajusta primero, con la persona cantando o hablando como en el culto.",
        ],
        [
          "Ecualización",
          "Realza o recorta graves, medios y agudos.",
          "Que cada voz e instrumento suene claro, sin estorbar a los demás.",
        ],
        [
          "Mezcla",
          "El volumen de cada canal en relación con los otros.",
          "Que el conjunto suene equilibrado: la voz que guía y la letra se entienden, y la congregación puede oírse cantar.",
        ],
        [
          "Envíos",
          "Mandan una mezcla distinta a los monitores de la plataforma.",
          "Que los músicos y los cantantes se oigan en la plataforma.",
        ],
      ],
    },
    // comprobado: oEmbed: título "#4 ¿El canto congregacional debería ser el instrumento principal de la iglesia?", canal "9Marcas" (https://www.youtube.com/@9Marcas). Dura 2:27; según la descripción, responde el pastor Sugel Michelén, de la Iglesia Bíblica del Señor Jesucristo (República Dominicana). Su tema es el de la nota de la lección: la mezcla sirve al canto de la congregación.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=kucQ4YQ8VhI",
      titulo: "¿El canto congregacional debería ser el instrumento principal de la iglesia?",
      fuente: "9Marcas (Sugel Michelén)",
      minutos: 2,
    },
  ],
  "alabanza-5-4": [
    // La lección explica el acople, los monitores y el volumen en párrafos; los pasos los ordenan en un método que el técnico puede seguir en la prueba de sonido y en el culto.
    {
      t: "pasos",
      titulo: "Cómo prevenir el acople y cuidar el volumen, paso a paso",
      pasos: [
        {
          titulo: "Ubicar bien micrófonos y parlantes",
          texto: "Los micrófonos no van frente a los parlantes ni demasiado cerca de los monitores, y los parlantes apuntan a la gente. Así no se forma el círculo que produce el pitido.",
        },
        {
          titulo: "Cuidar la ganancia",
          texto: "No se sube demasiado. Si alguien habla o canta muy bajo, se le pide que se acerque al micrófono en lugar de subir mucho el volumen.",
        },
        {
          titulo: "Recortar lo que se dispara",
          texto: "Con la ecualización se recorta la frecuencia que se dispara, para que no provoque el acople.",
        },
        {
          titulo: "Silenciar lo que no se usa",
          texto: "Los micrófonos que no se están usando se bajan o se silencian.",
        },
        {
          titulo: "Preparar los monitores en su justa medida",
          texto: "Cada músico pide lo que necesita (su voz, el teclado, el ritmo) y el técnico prepara esas mezclas. Si suenan demasiado fuerte, llegan a la sala y provocan acople.",
        },
        {
          titulo: "Si aparece el acople, actuar enseguida",
          texto: "Se baja enseguida el canal o el envío que lo provoca.",
        },
        {
          titulo: "Decidir el volumen pensando en todos",
          texto: "Hay ancianos, niños, visitas y personas con audífonos: que nadie sufra y que la congregación pueda oírse cantar, mirando también por lo de los otros (Filipenses 2:4).",
        },
      ],
    },
  ],
  "alabanza-5-5": [
    // comprobado: oEmbed: título "Culto VIRTUAL o PRESENCIAL ¿Es lo mismo? | Pensemos Bíblicamente con Sugel Michelén", canal "Eternidad+" (https://www.youtube.com/@eternidadplus). Dura 5:07; la descripción dice que es una producción de Radio Eternidad, y el canal (República Dominicana) se presenta como plataforma de recursos para la edificación de la Iglesia. Su tema es el de la lección: la transmisión no reemplaza a la iglesia reunida.
    {
      t: "video",
      url: "https://www.youtube.com/watch?v=D4A_jsZrm7Y",
      titulo: "Culto virtual o presencial: ¿es lo mismo?",
      fuente: "Eternidad+ (Sugel Michelén)",
      minutos: 5,
    },
  ],
  "alabanza-5-6": [
    // Ordena en el tiempo de un culto la seguridad, el cuidado del equipo y el trabajo con los músicos, que la lección presenta en listas separadas.
    {
      t: "pasos",
      titulo: "Antes, durante y después del culto: un equipo seguro y en orden",
      pasos: [
        {
          titulo: "Llegar temprano y orar juntos",
          texto: "Técnicos y músicos llegan temprano para la prueba de sonido y oran juntos antes del culto, porque sirven al mismo Señor.",
        },
        {
          titulo: "Revisar la seguridad",
          texto: "Cables ordenados y asegurados para que nadie tropiece, enchufes sin sobrecargar, ninguna extensión dañada, y el agua y las bebidas lejos de la consola.",
        },
        {
          titulo: "Encender en orden",
          texto: "El equipo se enciende en orden y los parlantes al final. Todos saben dónde están los interruptores y la salida de emergencia.",
        },
        {
          titulo: "Acordar las señales",
          texto: "El técnico y el director se ponen de acuerdo en las señales: más volumen, menos, repetir o terminar.",
        },
        {
          titulo: "Servir con amabilidad",
          texto: "Durante el culto, las indicaciones se piden y se dan con amabilidad, nunca con gritos ni gestos de enojo: todo decentemente y con orden (1 Corintios 14:40).",
        },
        {
          titulo: "Apagar al revés y guardar con cuidado",
          texto: "Al terminar, los parlantes se apagan primero. Los cables se guardan enrollados sin torcerlos, y el equipo se limpia, se revisa y se anota en el inventario (Proverbios 27:23; Lucas 16:10).",
        },
        {
          titulo: "Formar a otros",
          texto: "Se forma a nuevos técnicos para que el servicio no dependa de una sola persona. Dios puso en el corazón de Bezaleel y de Aholiab que pudieran enseñar (Éxodo 35:34).",
        },
      ],
    },
  ],
  // Educación cristiana de la niñez
  "ninez-1-1": [
    // La lección apoya el ministerio en cuatro textos repartidos en párrafos; el cuadro los reúne con lo que dice cada uno y lo que significa para el ministerio, para explicar por qué se enseña a los niños (objetivo o1).
    {
      t: "cuadro",
      titulo: "Por qué enseñar a los niños: cuatro textos y lo que enseñan",
      columnas: ["Texto", "Lo que dice", "Lo que significa para el ministerio"],
      filas: [
        [
          "Salmos 78:4-7",
          "Israel contaba a la generación venidera las obras de Dios, para que pusiera en él su confianza.",
          "Enseñar a los niños es contarles lo que Dios hizo, para que confíen en él y no olviden sus obras.",
        ],
        [
          "Deuteronomio 6:6-7",
          "Con la Palabra en el corazón, los padres la repiten a sus hijos en casa, en el camino, al acostarse y al levantarse.",
          "La fe se enseña en la vida diaria, y se vive en la casa y en la iglesia, que trabajan juntas.",
        ],
        [
          "Mateo 19:14",
          "Jesús corrigió a los discípulos que estorbaban a los niños, porque de los que son como ellos es el reino de los cielos.",
          "Los niños no son solo el futuro de la iglesia: ya son parte de ella.",
        ],
        [
          "Lucas 2:52",
          "Jesús crecía en sabiduría, en estatura y en gracia para con Dios y los hombres.",
          "La educación cristiana forma a toda la persona: su mente, su cuerpo y su relación con Dios y con los demás.",
        ],
      ],
    },
  ],
  "ninez-1-3": [
    // La lección cuenta las escenas en párrafos y da sus enseñanzas en una lista aparte; el cuadro une cada escena con lo que hizo Jesús y lo que enseña al ministerio (objetivo o3).
    {
      t: "cuadro",
      titulo: "Jesús y los niños: lo que hizo y lo que nos enseña",
      columnas: ["Escena", "Lo que hizo Jesús", "Lo que enseña al ministerio"],
      filas: [
        [
          "¿Quién es el mayor? (Mateo 18:2-5)",
          "Puso a un niño en medio: hay que hacerse como niños para entrar al reino, y recibirlo en su nombre es recibir a Jesús.",
          "Los niños van en el centro, no en el rincón, y los adultos aprenden de su confianza y su humildad.",
        ],
        [
          "Le traen niños (Marcos 10:13-16)",
          "Se indignó con los discípulos que los estorbaban; los tomó en brazos, puso las manos sobre ellos y los bendecía.",
          "Jesús reprende que se estorbe a un niño que viene a él: tuvo tiempo, brazos y bendición para los niños.",
        ],
        [
          "Hosanna en el templo (Mateo 21:15-16)",
          "Cuando los líderes se molestaron por la alabanza de los muchachos, les respondió con un salmo.",
          "Los niños pueden creer, orar y adorar de verdad.",
        ],
        [
          "Su advertencia (Mateo 18:6)",
          "Advirtió con mucha seriedad contra quien hace tropezar a uno de estos pequeños.",
          "Recibir a un niño también es cuidarlo: el amor por los niños va siempre junto con su protección.",
        ],
      ],
    },
  ],
  // El niño y su fe
  "ninez-2-2": [
    // Los consejos para responder están repartidos entre los versículos y dos notas; los pasos los ordenan en una manera de responder con honestidad y con palabras claras (objetivo o2).
    {
      t: "pasos",
      titulo: "Cómo responder la pregunta de un niño",
      pasos: [
        {
          titulo: "Recibe la pregunta como una puerta",
          texto: "La Biblia espera que los hijos pregunten (Deuteronomio 6:20). Preguntas como dónde vive Dios o por qué murió el abuelo son una puerta para enseñar.",
        },
        {
          titulo: "Si nace de un dolor, escucha primero",
          texto: "Si la pregunta viene de una pérdida, como la muerte de alguien, escucha primero y responde con ternura.",
        },
        {
          titulo: "Cuenta lo que Dios hizo",
          texto: "En Israel, la respuesta empezaba con una historia: cómo Dios sacó a su pueblo de Egipto con mano poderosa (Deuteronomio 6:21).",
        },
        {
          titulo: "Habla conforme a lo que puede oír",
          texto: "Jesús enseñaba conforme a lo que podían oír (Marcos 4:33), y Pablo dio leche a los que empezaban (1 Corintios 3:1-2): primero lo sencillo y lo claro.",
        },
        {
          titulo: "Cuida las imágenes que confunden",
          texto: "Un niño pequeño piensa de forma literal: si le pide a Jesús que entre en su corazón, puede imaginarlo en su pecho. Explica la imagen o usa palabras claras: confiar en él, pedirle perdón y seguirlo.",
        },
        {
          titulo: "Si no sabes, dilo",
          texto: "Cuando no sepas una respuesta, dilo con honestidad: está bien decir no sé. Y busquen juntos en la Biblia.",
        },
      ],
    },
  ],
  "ninez-2-4": [
    // Las preguntas difíciles se responden en párrafos y notas; el cuadro pone cada una junto a su base bíblica y a la respuesta prudente, sin tomar partido en lo que la declaración de fe deja por confirmar (objetivo o4).
    {
      t: "cuadro",
      titulo: "Las preguntas difíciles de los padres, con la Biblia y con prudencia",
      columnas: ["La pregunta", "La base", "Cómo responder"],
      filas: [
        [
          "¿Desde cuándo responde un niño por sí mismo?",
          "La Biblia habla de hijos que todavía no saben lo bueno ni lo malo (Deuteronomio 1:39), pero no da una edad exacta.",
          "Muchas iglesias evangélicas hablan de una edad de la responsabilidad: cuando cada niño entiende el pecado y la gracia.",
        ],
        [
          "¿Qué pasa con un niño que muere pequeño?",
          "David dijo que él iría a su hijo muerto, aunque el niño no volvería; muchos ven ahí una esperanza (2 Samuel 12:23).",
          "Muchas iglesias evangélicas confían en que Dios lo recibe por su gracia; el pastor consuela a la familia sin especular.",
        ],
        [
          "¿Cuándo puede bautizarse mi hijo?",
          "En Samaria se bautizaban cuando creyeron (Hechos 8:12); el ministerio bautiza a quienes se arrepintieron y creyeron.",
          "Cuando entiende y confiesa su fe, y no por su edad, con el acuerdo de sus padres y según la práctica de la iglesia.",
        ],
        [
          "¿Puede un niño recibir el Espíritu Santo?",
          "Dios prometió derramar su Espíritu sobre toda carne, y la promesa es también para los hijos (Joel 2:28; Hechos 2:39).",
          "Sí: se lo acompaña con alegría y sin presión; las lenguas como señal inicial quedan por confirmar.",
        ],
      ],
    },
  ],
  // Métodos para enseñar a niños
  "ninez-3-1": [
    // La lección da las siete leyes en una lista y su aplicación en otra; los pasos las juntan, ley por ley, en el orden de una clase sobre el buen samaritano (objetivo o1).
    {
      t: "pasos",
      titulo: "Las siete leyes de Gregory en una clase, paso a paso",
      pasos: [
        {
          titulo: "Conoce bien lo que vas a enseñar",
          texto: "La ley del maestro. Para una clase sobre el buen samaritano, estudia Lucas 10:25-37 durante la semana y ora por la clase.",
        },
        {
          titulo: "Gana su atención",
          texto: "La ley del alumno: el niño aprende cuando presta atención con interés. Empieza con una pregunta: ¿alguna vez alguien te ayudó cuando estabas lastimado?",
        },
        {
          titulo: "Usa palabras que entienda",
          texto: "La ley del lenguaje: usa palabras que el niño entiende y explica las nuevas, como samaritano o levita.",
        },
        {
          titulo: "Ve de lo conocido a lo nuevo",
          texto: "La ley de la lección: parte de algo conocido, un vecino que ayuda, para llegar a lo nuevo: el prójimo es también el que es diferente.",
        },
        {
          titulo: "Despierta su mente",
          texto: "La ley del proceso de enseñar: para que piensen por sí mismos, pregunta qué habrían hecho ellos, en lugar de darles la respuesta.",
        },
        {
          titulo: "Que lo diga con sus palabras",
          texto: "La ley del proceso de aprender: cada niño cuenta la historia con sus propias palabras.",
        },
        {
          titulo: "Repasa y aplica",
          texto: "La ley del repaso y la aplicación: lo aprendido se repasa y se vive. Piensen juntos a quién pueden ayudar esta semana.",
        },
      ],
    },
  ],
  "ninez-3-2": [
    // Los consejos para contar una historia están en una lista, un párrafo y una nota de cuidado; el cuadro pone frente a frente lo que se hace y lo que se evita para contarla con fidelidad y llevarla a Jesús (objetivo o2).
    {
      t: "cuadro",
      titulo: "Contar una historia bíblica: lo que sí y lo que no",
      columnas: ["Al preparar y al contar", "Lo que sí", "Lo que no"],
      filas: [
        ["La fuente", "Leer el pasaje varias veces en la Biblia.", "Prepararla solo con un libro de historias."],
        ["Los hechos", "Contarlos con fidelidad al texto.", "Cambiarlos para que la historia sea más emocionante."],
        [
          "La verdad central",
          "Encontrar qué enseña la historia acerca de Dios, y dejar que ella muestre a Dios.",
          "Convertir cada historia en una regla moral.",
        ],
        [
          "El final",
          "Llevarla a Jesús, como la de Zaqueo: el Hijo del Hombre vino a buscar y a salvar lo perdido (Lucas 19:10).",
          "Terminar solo en una lección de buena conducta.",
        ],
        [
          "La manera de contarla",
          "Ensayarla en voz alta, con la mirada en los niños y un apoyo visual sencillo.",
          "Contarla con la mirada puesta en el papel.",
        ],
      ],
    },
  ],
  // Protección de menores
  "ninez-4-5": [
    // Lo que se hace al escuchar, lo que pide la ley en Texas y lo que no se hace están en tres listas y un párrafo; el cuadro los junta tema por tema, sin agregar nada a la ley (objetivo o5).
    {
      t: "cuadro",
      titulo: "Si un niño cuenta un abuso: lo que se hace y lo que no",
      columnas: ["Aspecto", "Lo que se hace", "Lo que no se hace"],
      filas: [
        [
          "La reacción",
          "Mantener la calma, aunque duela, y dejarlo hablar con sus palabras, sin interrumpirlo.",
          "Mostrar espanto o enojo: el niño podría pensar que el enojo es con él.",
        ],
        [
          "Lo que se le dice",
          "Creerle, y decirle que hizo bien en contarlo y que no es su culpa.",
          "Prometerle guardar el secreto.",
        ],
        [
          "Las preguntas",
          "Dejarlas a los investigadores.",
          "Hacerle muchas preguntas, o preguntas que sugieran la respuesta, como ¿fue tal persona?",
        ],
        [
          "Lo que contó",
          "Anotarlo cuanto antes, con sus mismas palabras, la fecha y la hora, y contarlo solo a quienes pueden ayudarlo.",
          "Contarlo a otros hermanos que no necesitan saberlo.",
        ],
        [
          "El reporte",
          "De inmediato, a la Línea directa de Texas, 1-800-252-5400; en una emergencia o si corre peligro ahora, al 911.",
          "Esperar a tener pruebas o a que el pastor decida: basta con causa razonable, y la ley obliga también al pastor.",
        ],
        [
          "La iglesia",
          "Avisar al responsable del ministerio, para proteger a los demás niños; pero eso no reemplaza el reporte.",
          "Creer que avisar al pastor cumple la ley, o resolverlo con una disculpa, una reunión o una disciplina de la iglesia.",
        ],
        [
          "La investigación",
          "Dejarla a las autoridades: es su tarea.",
          "Investigar por cuenta propia, o buscar a otros niños para preguntarles.",
        ],
        [
          "La persona acusada",
          "Dejar que actúen primero las autoridades.",
          "Hablar con ella o con su familia: podría poner al niño en peligro o borrar pruebas.",
        ],
      ],
    },
  ],
  "ninez-4-6": [
    // La lección cuenta el error de la casa de David en una lista y la respuesta de la iglesia en otras dos; el cuadro los pone frente a frente, punto por punto (objetivo o6).
    {
      t: "cuadro",
      titulo: "Lo que salió mal con Tamar y lo que hace la iglesia",
      columnas: ["Qué se mira", "En la casa de David (2 Samuel 13)", "Lo que hace la iglesia"],
      filas: [
        [
          "La víctima",
          "Absalón le pidió a Tamar que callara.",
          "No la hace callar: le cree, no la culpa y cuida su privacidad.",
        ],
        [
          "El agresor",
          "Se lo cuidó porque era de la familia: era su hermano.",
          "No lo protege por ser de la familia de la fe: el acusado deja todo servicio con menores mientras lo investigan.",
        ],
        [
          "El daño",
          "Se le quitó importancia, como si no hubiera por qué angustiarse.",
          "No le quita importancia: los ayuda a recibir atención profesional de alguien con experiencia en el trauma de los niños.",
        ],
        [
          "El que tenía autoridad",
          "David se enojó mucho, pero la Biblia no cuenta que hiciera algo.",
          "No se queda en el enojo: actúa, colabora con las autoridades y revisa qué regla falló.",
        ],
        [
          "Lo que vino después",
          "Tamar quedó sola y desconsolada, y dos años después Absalón hizo matar a Amnón.",
          "Acompaña con paciencia: visita a la familia, ora con ella y cuida que el niño pueda volver a una clase segura.",
        ],
      ],
    },
  ],
  // Organizar el ministerio infantil
  "ninez-5-2": [
    // La lección parte del consejo de Jetro y después describe el equipo; el cuadro pone lado a lado lo que vivió Moisés y lo que eso significa para el ministerio de niños (objetivo o2).
    {
      t: "cuadro",
      titulo: "El consejo de Jetro y el equipo del ministerio de niños",
      columnas: ["Aspecto", "Moisés y Jetro (Éxodo 18)", "En el ministerio de niños"],
      filas: [
        [
          "El problema",
          "Moisés atendía solo a todo el pueblo; Jetro le dijo que desfallecería, porque no podría hacerlo solo (Éxodo 18:17-18).",
          "Muchos ministerios dependen de una sola persona que hace todo, hasta que se cansa.",
        ],
        [
          "La salida",
          "Buscar ayudantes y repartir el trabajo.",
          "Formar un equipo: el líder no hace todo, sino que prepara a otros para servir (Efesios 4:11-12).",
        ],
        [
          "A quiénes elegir",
          "Hombres de virtud y de verdad, temerosos de Dios y que aborrezcan la avaricia (Éxodo 18:21).",
          "Personas de carácter: cada voluntario pasa por los pasos de la selección que se estudian en Protección de menores.",
        ],
        [
          "El orden",
          "Jefes de millares, de centenas, de cincuenta y de diez.",
          "Un coordinador que rinde cuentas al pastor, y un líder por cada grupo de edad que guía a sus maestros.",
        ],
      ],
    },
  ],
  "ninez-5-3": [
    // Los grupos por edad están en una lista y la guía de adultos por sala en un párrafo aparte; la línea recorre las edades del niño y junta en cada etapa lo que se hace y cuántos adultos se recomiendan, sin bajar nunca de dos por sala (objetivo o3).
    {
      t: "linea",
      titulo: "Los grupos de la cuna a los doce años, con dos adultos o más por sala",
      eventos: [
        {
          fecha: "0 a 2 años",
          texto: "La cuna: cuidado amoroso, canciones y oraciones sencillas. Como guía, muchas iglesias ponen un adulto por cada tres o cuatro bebés.",
        },
        {
          fecha: "3 a 5 años",
          texto: "Los preescolares: historias cortas, canciones con gestos y actividades con las manos; como guía, un adulto por cada seis u ocho.",
        },
        {
          fecha: "6 a 9 años",
          texto: "Los escolares: historias, juegos de repaso, versículos de memoria y trabajos en grupo; como guía, un adulto por cada diez o doce.",
        },
        {
          fecha: "10 a 12 años",
          texto: "Los preadolescentes: preguntas abiertas, conversación y servicio. Como en toda sala, al menos dos adultos seleccionados.",
        },
      ],
    },
  ],
  "ninez-5-5": [
    // Lo que la lección dice del seguimiento está repartido entre la Escuela Bíblica de Vacaciones, las otras puertas, un párrafo y una nota; los pasos lo ordenan desde la inscripción hasta un mes después (objetivo o5).
    {
      t: "pasos",
      titulo: "El seguimiento de una familia nueva, paso a paso",
      pasos: [
        {
          titulo: "Hazlo parte del plan",
          texto: "El seguimiento es parte del plan de cada actividad, no un agregado.",
        },
        {
          titulo: "Anota sus datos con permiso",
          texto: "En la inscripción de la Escuela Bíblica de Vacaciones se anotan los datos de cada niño, sus alergias, el teléfono de los padres y su permiso.",
        },
        {
          titulo: "Recibe bien a la familia",
          texto: "Alguien acompaña a la familia nueva y le explica cómo funciona el registro.",
        },
        {
          titulo: "Actúa con respeto",
          texto: "Con las familias que no son cristianas, se pide el permiso de los padres, se les cuenta lo que se enseña y nunca se presiona a un niño para que tome una decisión.",
        },
        {
          titulo: "Llámala o visítala pronto",
          texto: "A la visita se la llama en la semana; después de la Escuela Bíblica de Vacaciones, se llama o se visita a cada familia nueva en las dos semanas siguientes y se la invita a la iglesia.",
        },
        {
          titulo: "Mira quién sigue viniendo",
          texto: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después.",
        },
      ],
    },
  ],
  // Discipulado de jóvenes
  "juventud-1-2": [
    // La lección da los ocho principios y su ejemplo en dos listas separadas; el cuadro une cada principio con lo que hizo Jesús y con lo que hace hoy el líder, que es lo que pide el objetivo o2.
    {
      t: "cuadro",
      titulo: "Los ocho principios de Coleman: de Jesús al líder de hoy",
      columnas: ["Principio", "Lo que hizo Jesús", "Lo que hace el líder con tres jóvenes"],
      filas: [
        [
          "Selección",
          "Pasó la noche orando y, al hacerse de día, eligió a doce para acompañarlos de cerca (Lucas 6:12-13)",
          "Ora durante un mes y elige a tres jóvenes con hambre de Dios, del mismo sexo que él",
        ],
        [
          "Asociación",
          "Pasó tiempo con ellos: los estableció para que estuvieran con él (Marcos 3:14)",
          "Se reúne con ellos cada semana y comparte la vida: un partido, una comida, un servicio",
        ],
        [
          "Consagración",
          "Les pidió obediencia: no solo los llamó a creer, sino a seguirlo (Mateo 4:19)",
          "Les pide un compromiso sencillo: leer la Biblia cada día y llegar a la reunión",
        ],
        [
          "Impartición",
          "Se dio a sí mismo y les dio su Espíritu; les dio a conocer todo lo que oyó del Padre (Juan 15:15)",
          "Les cuenta su testimonio, también sus luchas, y ora por cada uno por su nombre",
        ],
        [
          "Demostración",
          "Les mostró cómo vivir, orar y servir",
          "Los lleva con él cuando visita a un enfermo o habla de Jesús con un amigo",
        ],
        [
          "Delegación",
          "Les dio tareas y los envió a predicar (Marcos 3:14)",
          "Les pide que dirijan la oración o un juego en la reunión de jóvenes",
        ],
        [
          "Supervisión",
          "Los escuchó al volver y los corrigió",
          "Después conversan sobre cómo les fue y qué pueden mejorar",
        ],
        [
          "Reproducción",
          "Esperó que hicieran otros discípulos",
          "Al año, cada uno empieza a acompañar a un joven menor que él",
        ],
      ],
    },
  ],
  "juventud-1-3": [
    // La lección cuenta en cuatro textos cómo creció la relación de Pablo y Timoteo; la línea muestra ese camino en orden, del joven elegido al hijo que sirve junto a su padre, el modelo de la mentoría que pide el objetivo o3.
    {
      t: "linea",
      titulo: "Pablo y Timoteo: de joven de buen testimonio a hijo amado y fiel",
      eventos: [
        {
          fecha: "Al principio",
          texto: "Timoteo es un joven creyente del que dan buen testimonio los hermanos. Pablo quiere que vaya con él y lo lleva consigo.",
          ref: "Hechos 16:1-3",
        },
        {
          fecha: "En el camino",
          texto: "Timoteo aprende viendo a Pablo: sigue su doctrina, su conducta, su propósito y su fe. Aprende lo que enseña y también cómo vive.",
          ref: "2 Timoteo 3:10",
        },
        {
          fecha: "Con el tiempo",
          texto: "Llega a ser de confianza: Pablo lo envía en su lugar, como su hijo amado y fiel en el Señor.",
          ref: "1 Corintios 4:17",
        },
        {
          fecha: "Años después",
          texto: "Pablo dice que Timoteo ha servido con él en el evangelio como hijo a padre: el discipulado se parece a una familia.",
          ref: "Filipenses 2:20-22",
        },
      ],
    },
  ],
  "juventud-1-5": [
    // La lección muestra un plan semanal ya hecho y, en una nota, cómo armarlo; los pasos ordenan cómo prepararlo junto con un joven, que es lo que pide el objetivo o5.
    {
      t: "pasos",
      titulo: "Cómo armar con un joven su plan de vida espiritual",
      pasos: [
        {
          titulo: "Vivirlo tú primero",
          texto: "No le des a un joven un plan que tú no vives: lo que le pides, primero lo practicas tú.",
        },
        {
          titulo: "Armarlo con él",
          texto: "No se lo impongas: ármalo con él, a partir de las disciplinas del discípulo, que son leer la Biblia, orar, memorizar, congregarse, servir y cuidar el teléfono y las redes.",
        },
        {
          titulo: "Empezar con poco e ir sumando",
          texto: "Elijan primero un hábito pequeño y concreto, como diez minutos antes de la escuela para leer un capítulo de un evangelio y orar por el día; después sumen otros.",
        },
        {
          titulo: "Decidir antes de la tentación",
          texto: "Como Daniel, que propuso en su corazón no contaminarse (Daniel 1:8), el joven decide antes de la tentación, no en medio de ella; por ejemplo, a qué hora deja el teléfono fuera del cuarto.",
        },
        {
          titulo: "Contar cada semana cómo le fue",
          texto: "Cada semana, por ejemplo el domingo, el joven te cuenta cómo le fue con el plan.",
        },
        {
          titulo: "Si falla, empezar de nuevo",
          texto: "Un día perdido no es el final: al día siguiente vuelve a empezar. Lo que sostiene la fe en el tiempo no son las emociones, sino los hábitos de cada día.",
        },
        {
          titulo: "Celebrar cada paso",
          texto: "Celebra cada avance. Como un deportista entrena su cuerpo, el joven entrena su vida espiritual, porque la piedad sirve para todo (1 Timoteo 4:7-8).",
        },
      ],
    },
  ],
  // Cosmovisión cristiana y cultura
  "juventud-2-1": [
    // La lección enseña los cuatro actos en una lista y los aplica a una idea en otra; el cuadro los junta para que el alumno vea cómo sirven de lentes para mirar cualquier idea (objetivo o1).
    {
      t: "cuadro",
      titulo: "Los cuatro actos de la Biblia, aplicados a una idea de la cultura",
      columnas: ["Acto", "La pregunta que responde", "Lo que dice la Biblia", "Ante la idea: el ser humano es solo un animal"],
      filas: [
        [
          "La creación",
          "¿De dónde venimos?",
          "Dios hizo todo bueno, y al ser humano a su imagen",
          "Cada persona tiene un valor que no depende de lo que haga",
        ],
        [
          "La caída",
          "¿Qué salió mal?",
          "El ser humano desobedeció (Génesis 3:6), y el pecado dañó su relación con Dios, con los demás y con la creación",
          "Puede actuar como un animal porque el pecado dañó su corazón, pero ese no es su diseño",
        ],
        [
          "La redención",
          "¿Hay solución?",
          "Dios envió a su Hijo para rescatarnos y hacer nuevas todas las cosas",
          "Cristo vino a restaurar la imagen de Dios en nosotros",
        ],
        [
          "La consumación",
          "¿Hacia dónde vamos?",
          "Cristo volverá, y la creación será libertada de la corrupción (Romanos 8:21)",
          "Nuestro destino no es desaparecer, sino la vida con Dios para siempre",
        ],
      ],
    },
  ],
  "juventud-2-5": [
    // La lección da por separado las maneras de responder a la cultura, las cuatro preguntas, los textos y un ejemplo; los pasos los unen en un método para examinar lo que el joven escucha y mira, y para crear (objetivo o5).
    {
      t: "pasos",
      titulo: "Ante una canción, una serie o un juego: discernir y crear",
      pasos: [
        {
          titulo: "Ni rechazarlo todo ni aceptarlo todo",
          texto: "Rechazarlo todo no enseña a pensar ni a hablar con los que no creen, y aceptarlo todo lleva a pensar como el mundo. El camino es examinarlo todo y retener lo bueno (1 Tesalonicenses 5:21).",
        },
        {
          titulo: "Preguntar qué dice de Dios y del ser humano",
          texto: "¿Qué dice de Dios, o qué calla sobre él? ¿Qué dice del ser humano y de lo que lo hace feliz? En la canción del ejemplo, Dios no aparece y la felicidad es el placer de hoy.",
        },
        {
          titulo: "Mirar qué llama bueno y adónde empuja",
          texto: "¿Qué presenta como bueno y qué como malo? ¿Qué provoca pensar, sentir o hacer? Esa canción llama bueno a sentirse bien y empuja a decidir sin pensar en el futuro ni en los demás.",
        },
        {
          titulo: "Retener lo verdadero y ver lo que falta",
          texto: "Todo se mide con lo verdadero, lo honesto, lo justo, lo puro y lo amable (Filipenses 4:8). La canción acierta en que el presente es un regalo, pero le falta que el mañana importa.",
        },
        {
          titulo: "Decidir delante del Señor",
          texto: "Todo se hace en el nombre del Señor Jesús (Colosenses 3:17). El joven decide si le conviene escucharla o verla, y sobre todo aprende a no creerle.",
        },
        {
          titulo: "Crear algo que muestre a Dios",
          texto: "Además de discernir, el joven puede hacer canciones, historias, videos y juegos buenos, que muestren la verdad y la belleza de Dios.",
        },
      ],
    },
  ],
  // Consejería juvenil
  "juventud-3-4": [
    // La lección trata los conflictos de familia y, en una nota aparte, la casa que no es segura; el cuadro pone las dos situaciones lado a lado para que el consejero no confunda un conflicto con un abuso que se debe reportar (objetivo o4).
    {
      t: "cuadro",
      titulo: "Un conflicto en casa o una casa que no es segura",
      columnas: ["Aspecto", "Un conflicto familiar", "Una casa que no es segura"],
      filas: [
        [
          "Ejemplos",
          "Conflictos por las reglas, el teléfono o los amigos; padres que se separan; una familia nueva; padres que no creen",
          "El joven cuenta que lo golpean, que abusan de él o que no lo cuidan",
        ],
        [
          "Lo que hace el consejero",
          "No toma partido: escucha al joven y, cuando conviene, a sus padres, y los ayuda a escucharse y a llegar a acuerdos",
          "No lo trata como un conflicto familiar: lo reporta",
        ],
        [
          "Cómo se atiende",
          "Una reunión en la que cada uno habla sin ser interrumpido, sin gritos ni insultos, con un acuerdo pequeño y oración",
          "Se reporta de inmediato a la línea 1-800-252-5400, o al 911 si hay peligro ahora",
        ],
        [
          "Quién debe actuar",
          "Si el joven es menor de edad, sus padres siguen siendo los responsables: el consejero los ayuda, no los reemplaza",
          "En Texas, toda persona con causa razonable para creer que un menor sufre abuso o negligencia debe reportarlo",
        ],
      ],
    },
  ],
  "juventud-3-6": [
    // La lección explica en listas separadas los límites del secreto, lo que pide la ley de Texas y cuándo derivar; el cuadro ordena esas tres respuestas con su cuándo, su qué y su base, para evaluarlas como pide el objetivo o6.
    {
      t: "cuadro",
      titulo: "Guardar la confianza, reportar y derivar",
      columnas: ["Aspecto", "Guardar la confianza", "Reportar", "Derivar"],
      filas: [
        [
          "Cuándo",
          "Siempre, salvo que el joven u otra persona estén en peligro",
          "Cuando hay causa razonable para creer que un menor sufre abuso o negligencia",
          "En casos como el riesgo de suicidio, el abuso o una adicción con dependencia, y en todo lo que supera su preparación",
        ],
        [
          "Qué hace el consejero",
          "No lo comenta con otros, y explica estos límites desde la primera conversación",
          "Lo reporta de inmediato a la línea 1-800-252-5400, o al 911 si hay peligro ahora",
          "No deja solo al joven: en una crisis llama al 988, o al 911 si hay peligro ahora, y usa la lista de ayuda",
        ],
        [
          "Su base",
          "El de espíritu fiel guarda el secreto (Proverbios 11:13)",
          "Código de Familia de Texas, sección 261.101, sin excepción para los pastores ni para las conversaciones confidenciales",
          "Nadie aconseja solo, y pedir ayuda a otros es sabiduría (Proverbios 11:14; Proverbios 12:15)",
        ],
      ],
    },
  ],
  // Liderazgo juvenil
  "juventud-4-1": [
    // La lección cuenta en párrafos sueltos cómo usó Dios a David, a Daniel y a Ester; el cuadro los compara y saca de cada uno lo que aprende el líder joven (objetivo o1).
    {
      t: "cuadro",
      titulo: "David, Daniel y Ester: jóvenes que Dios usó para guiar",
      columnas: ["Quién", "Lo que muestra el texto", "Lo que aprende el líder joven"],
      filas: [
        [
          "David",
          "Saúl lo vio muchacho, pero él enfrentó a Goliat en el nombre de Jehová de los ejércitos (1 Samuel 17:33, 45)",
          "Muchos miran la edad; Dios mira la fe. El líder joven no confía en sí mismo, sino en Dios",
        ],
        [
          "Daniel y sus amigos",
          "Siendo muchachos, Dios les dio conocimiento e inteligencia en las letras y las ciencias (Daniel 1:17)",
          "Dios prepara a sus líderes también en el estudio y en el trabajo",
        ],
        [
          "Ester",
          "Le dijeron que quizá había llegado al reino para esa hora (Ester 4:14)",
          "Dios pone a los jóvenes en lugares donde pueden hacer una diferencia",
        ],
        [
          "Todos ellos",
          "Eran jóvenes cuando empezaron, y Dios no esperó a que fueran mayores: los formó en el camino",
          "Dios sigue haciendo lo mismo hoy en el ministerio juvenil",
        ],
      ],
    },
  ],
  "juventud-4-4": [
    // La lección da la regla para los desacuerdos en una nota y la historia de Marcos en dos textos; los pasos los unen en una manera de manejar un desacuerdo y dar segundas oportunidades (objetivo o4).
    {
      t: "pasos",
      titulo: "Cuando hay un desacuerdo en el equipo de liderazgo",
      pasos: [
        {
          titulo: "Saber que hasta los grandes tuvieron desacuerdos",
          texto: "Pablo y Bernabé discutieron por Marcos, que los había dejado en un viaje, y tuvieron tal desacuerdo que se separaron (Hechos 15:37-39).",
        },
        {
          titulo: "Revestirse de humildad",
          texto: "Pedro pide a los jóvenes estar sujetos a los mayores, y a todos, ser sumisos unos a otros y revestirse de humildad (1 Pedro 5:5). En el equipo, todos aprenden unos de otros.",
        },
        {
          titulo: "Hablarlo en privado, con la verdad en amor",
          texto: "El desacuerdo se conversa entre los que lo tienen, con honestidad y con amor, y nunca delante de los jóvenes.",
        },
        {
          titulo: "Si no se resuelve, pedir ayuda al pastor",
          texto: "El líder de jóvenes rinde cuentas a los pastores de la iglesia: si el desacuerdo sigue, se pide ayuda al pastor.",
        },
        {
          titulo: "Dar segundas oportunidades",
          texto: "Años después, Pablo pidió a Timoteo que le trajera a Marcos, porque le era útil para el ministerio (2 Timoteo 4:11). El joven que falló una vez llegó a ser útil.",
        },
      ],
    },
  ],
  // Evangelismo entre jóvenes
  "juventud-5-2": [
    // La lección enseña en dos listas el evangelio en cuatro partes y el testimonio en tres; el cuadro los pone lado a lado para que el joven sepa qué cuenta cada uno, cómo termina y qué cuidar (objetivo o2).
    {
      t: "cuadro",
      titulo: "El evangelio y el testimonio, lado a lado",
      columnas: ["Aspecto", "El evangelio", "El testimonio"],
      filas: [
        [
          "Su centro",
          "Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día (1 Corintios 15:3-4)",
          "Cómo conociste a Jesús y qué cambió en tu vida",
        ],
        ["Sus partes", "Dios, el problema, Cristo y la respuesta", "Antes, el encuentro y después, en dos minutos"],
        [
          "Cómo termina",
          "Con la respuesta: arrepentirse, creer en Jesús y recibir por gracia la vida eterna (Romanos 6:23)",
          "Con una pregunta, como ¿alguna vez pensaste en esto?, para que la conversación siga",
        ],
        [
          "Lo que se cuida",
          "Que no suene a una lista de reglas para ser bueno: es un regalo, por gracia y no por obras (Efesios 2:8-9)",
          "Evitar palabras que solo entienden los de la iglesia, detalles que exageran el pasado y un tono de superioridad",
        ],
      ],
    },
  ],
  "juventud-5-6": [
    // La lección da cinco textos seguidos y un ejemplo para el amigo que dice que no; el cuadro ordena qué hacer en cada situación y qué texto lo sostiene, para evaluar cómo perseverar (objetivo o6).
    {
      t: "cuadro",
      titulo: "Ante las dudas, el rechazo y el cansancio",
      columnas: ["Situación", "Qué hacer", "Lo que enseña la Biblia"],
      filas: [
        [
          "Un amigo que duda",
          "No despreciar sus dudas: acompañarlas con paciencia y con razones",
          "Judas pide convencer a los que dudan, y Jesús no rechazó a Tomás por dudar (Judas 1:22; Juan 20:27-28)",
        ],
        [
          "Un amigo que dice que no",
          "Respetar su respuesta, sin tomarla como algo personal, seguir siendo su amigo y orar por él cada día",
          "Es el Espíritu Santo, no nosotros, quien convence de pecado, de justicia y de juicio (Juan 16:8)",
        ],
        [
          "Cuando no se ve fruto",
          "Celebrar cada conversación sobre la fe, no solo cada decisión: sembrar también es fruto",
          "Uno planta y otro riega, pero el crecimiento lo da Dios (1 Corintios 3:6)",
        ],
        [
          "Cuando dan ganas de rendirse",
          "Seguir viviendo la fe y, más adelante, volver a invitar sin presión",
          "No cansarse de hacer bien, porque a su tiempo se cosecha si no se desmaya (Gálatas 6:9)",
        ],
      ],
    },
  ],
  // Consejería matrimonial
  "familia-consejeria-1-5": [
    // La lección enseña los pasos y, en una nota aparte, lo que nunca se le dice a una víctima; el cuadro los pone frente a frente para que la seguridad vaya siempre primero.
    {
      t: "cuadro",
      titulo: "Ante la violencia en el hogar: lo que se hace y lo que nunca",
      columnas: ["Aspecto", "Lo que se hace", "Lo que nunca se hace"],
      filas: [
        [
          "Cuando la víctima lo cuenta",
          "Creerle, agradecerle y decirle que no es su culpa y que hizo bien en contarlo.",
          "Decirle que aguante por el bien del matrimonio.",
        ],
        [
          "Su seguridad",
          "Preguntar si ella y sus hijos corren peligro ahora; si el peligro es inmediato, llamar al 911.",
          "Pedirle que ore para que el otro cambie mientras sigue en peligro.",
        ],
        [
          "La ayuda",
          "Darle la Línea Nacional sobre la Violencia Doméstica, 1-800-799-7233, y ayudarla con un plan de seguridad.",
          "Confrontar solo al agresor: eso puede aumentar el peligro.",
        ],
        [
          "Los hijos",
          "Si sufren maltrato, reportarlo como pide la ley en Texas, a la línea 1-800-252-5400.",
          "Callarlo: la ley pide reportarlo.",
        ],
        [
          "La Biblia",
          "Recordar que manda a los maridos amar a sus esposas y no ser ásperos con ellas (Colosenses 3:19).",
          "Usar un texto sobre el respeto o la sujeción para justificar el maltrato, o decirle que se sujete más.",
        ],
        [
          "La pareja",
          "Una reconciliación solo se piensa cuando hay seguridad y un cambio de verdad, comprobado en el tiempo.",
          "Proponer una consejería de pareja mientras haya violencia: también puede aumentar el peligro.",
        ],
      ],
    },
  ],
  "familia-consejeria-1-6": [
    // La lección enumera las etapas del matrimonio; la línea las ordena en el tiempo y les suma los mentores y los hábitos que la misma lección propone para cuidarlas.
    {
      t: "linea",
      titulo: "El matrimonio, etapa por etapa",
      eventos: [
        {
          fecha: "Recién casados",
          texto: "Aprenden a vivir juntos, a decidir juntos y a dejar padre y madre. Un matrimonio mentor con años de camino puede acompañarlos.",
          ref: "Tito 2:3-5",
        },
        {
          fecha: "Llegan los hijos",
          texto: "Traen el cansancio, menos tiempo para los dos y nuevas tareas. Ayuda guardar un tiempo a solas cada semana, sin teléfonos.",
        },
        {
          fecha: "Los años intensos",
          texto: "Pesan el trabajo, los hijos adolescentes y las deudas. Ayuda hablar del dinero y de los planes antes de que haya problemas.",
        },
        { fecha: "El nido vacío", texto: "Cuando los hijos se van, el desafío es volver a encontrarse como pareja." },
        { fecha: "La vejez", texto: "Toca cuidar la salud, cuidarse el uno al otro y prepararse para la viudez." },
        {
          fecha: "En todas las etapas",
          texto: "Orar y leer la Biblia juntos, y pedir ayuda a tiempo: con Dios en el centro, el matrimonio es más fuerte que dos personas solas.",
          ref: "Eclesiastés 4:12",
        },
      ],
    },
  ],
  // Consejería familiar
  "familia-consejeria-2-4": [
    // La lección trae en dos listas aparte los desafíos de la familia ensamblada y lo que ayuda o daña; el cuadro los une para que se vea qué responder a cada desafío.
    {
      t: "cuadro",
      titulo: "La familia ensamblada: cada desafío y cómo responder",
      columnas: ["Tema", "El desafío", "Lo que ayuda", "Lo que daña"],
      filas: [
        [
          "Los hijos",
          "Sienten que querer al padrastro o a la madrastra es traicionar a su papá o a su mamá.",
          "Dar tiempo, porque unirse lleva años.",
          "Esperar que todos se quieran enseguida.",
        ],
        [
          "Las costumbres",
          "Cada familia trae sus costumbres, sus reglas y sus heridas.",
          "Crear tradiciones nuevas de la familia.",
          "Borrar las costumbres de los hijos.",
        ],
        [
          "La autoridad",
          "El padrastro o la madrastra quiere corregir antes de haberse ganado la confianza.",
          "Que se gane la confianza antes de corregir.",
          "Imponer la autoridad desde el primer día.",
        ],
        [
          "El otro padre o madre",
          "Sigue presente, y a veces hay conflictos por los hijos, las visitas o el dinero.",
          "Hablar con respeto del otro padre o de la otra madre.",
          "Criticarlos delante de los hijos.",
        ],
        [
          "La pareja",
          "Tiene poco tiempo para sí misma, y los hijos a veces intentan dividirla.",
          "Que la pareja se una y decida junta.",
          "Que cada uno defienda solo a sus hijos.",
        ],
      ],
    },
  ],
  "familia-consejeria-2-6": [
    // La lección cuenta la historia de José en varios párrafos; la línea ordena su camino, de la herida al perdón que bendice, que es lo que pide explicar el primer objetivo.
    {
      t: "linea",
      titulo: "José y sus hermanos: el camino de la reconciliación",
      eventos: [
        {
          fecha: "Al principio",
          texto: "Sus hermanos venden a José, y es llevado a Egipto.",
          ref: "Génesis 37:27-28",
        },
        {
          fecha: "Años después",
          texto: "José se da a conocer a sus hermanos y no niega el mal: les recuerda que ellos lo vendieron.",
          ref: "Génesis 45:4",
        },
        {
          fecha: "En ese encuentro",
          texto: "Ve también la mano de Dios: les dice que Dios lo envió delante de ellos para preservar la vida.",
          ref: "Génesis 45:5",
        },
        {
          fecha: "Al morir su padre",
          texto: "Sus hermanos temen que José se vengue del mal que le hicieron.",
          ref: "Génesis 50:15",
        },
        {
          fecha: "Entonces",
          texto: "José responde que ellos pensaron mal contra él, pero Dios lo encaminó a bien; promete sustentarlos y les habla al corazón.",
          ref: "Génesis 50:20-21",
        },
      ],
    },
  ],
  // Duelo y crisis
  "familia-consejeria-3-3": [
    // La lección reparte en un párrafo, una lista, el ejemplo del suicidio y una nota cuándo un duelo se complica; los pasos lo ordenan para saber qué notar, cuándo actuar enseguida y a quién derivar.
    {
      t: "pasos",
      titulo: "Cuando el duelo se complica: qué notar y cuándo derivar",
      pasos: [
        {
          titulo: "Conocer el trastorno de duelo prolongado",
          texto: "La Asociación Estadounidense de Psiquiatría lo reconoce desde 2022: pasado al menos un año de la muerte (seis meses en un niño o adolescente), el anhelo y el dolor no dejan llevar la vida diaria.",
        },
        {
          titulo: "Notar las señales",
          texto: "No puede trabajar, comer ni cuidarse después de muchos meses; habla de que no quiere vivir o de irse con el que murió; se aísla, bebe o usa drogas para no sentir, o una culpa no lo deja en paz.",
        },
        {
          titulo: "Después de un suicidio, preguntar con cariño",
          texto: "El dolor puede traer pensamientos de muerte a los que quedan: se les pregunta con cariño cómo están, y se tiene a mano la línea 988.",
        },
        {
          titulo: "Si habla de quitarse la vida, actuar ya",
          texto: "No dejarlo solo y llamar al 988; si está en peligro inmediato, al 911. Lo que dijo en confianza no se guarda cuando hay una vida en peligro.",
        },
        {
          titulo: "No diagnosticar, sino derivar",
          texto: "Al consejero no le toca diagnosticar, pero sí notar las señales y derivar: a un consejero profesional o, después de un suicidio, a un grupo de apoyo para las familias que perdieron a alguien así.",
        },
      ],
    },
  ],
  "familia-consejeria-3-5": [
    // La lección trae en tres listas los principios de la OMS, la ayuda que sirve o hace daño y el ejemplo de la inundación; el cuadro los junta, principio por principio, en una sola vista.
    {
      t: "cuadro",
      titulo: "Observar, escuchar y conectar: lo que sirve y lo que hace daño",
      columnas: ["Principio", "Lo que hace el que ayuda", "Lo que hace daño", "En la inundación"],
      filas: [
        [
          "Observar",
          "Ver si el lugar es seguro, quién necesita ayuda urgente y quién está muy angustiado.",
          "Llegar por su cuenta a un lugar peligroso, sin coordinarse con las autoridades.",
          "Seguir las indicaciones de las autoridades, no entrar en las zonas de peligro y llamar a cada familia.",
        ],
        [
          "Escuchar",
          "Acercarse con respeto, preguntar qué necesita y escuchar sin presionar a nadie a contar lo que vivió.",
          "Suponer y llevar lo que nadie pidió, obligarlo a contar lo que vivió o decir que el desastre es un castigo de Dios.",
          "Un equipo acompaña a las familias, escucha sin presionar y ora con quien lo pida.",
        ],
        [
          "Conectar",
          "Ayudar a cubrir lo básico (1 Reyes 19:5-7), a encontrar a los seres queridos y a llegar a la ayuda que hace falta.",
          "Prometer lo que no se puede cumplir, en vez de decir solo lo que se sabe.",
          "Abrir el templo, si es seguro, con agua, comida y ropa seca, y ayudar a pedir la ayuda oficial de emergencia.",
        ],
      ],
    },
  ],
  // Adicciones y restauración
  "familia-consejeria-4-4": [
    // La lección pregunta qué hacer después de una caída; los pasos reúnen su respuesta, que está repartida entre la comparación, el plan de Lucía y la nota para el líder.
    {
      t: "pasos",
      titulo: "Después de una caída: volver a levantarse paso a paso",
      pasos: [
        {
          titulo: "No esconderla",
          texto: "Contarlo ese mismo día a la persona de confianza: el secreto hace crecer la recaída. Un tropiezo que se reconoce enseguida permite volver al plan.",
        },
        {
          titulo: "Recibir con la verdad y con la gracia",
          texto: "El consejero no recibe a la persona con un sermón, sino como Jesús recibió a Pedro, que lo había negado tres veces (Juan 21:15-17).",
        },
        {
          titulo: "Recordar que no es el final",
          texto: "El justo puede caer siete veces y volver a levantarse (Proverbios 24:16). Según NIDA, una recaída no significa que el tratamiento fracasó.",
        },
        {
          titulo: "Volver a pedir ayuda",
          texto: "Volver al grupo y al médico: la recaída es una señal de que hay que retomar o ajustar el tratamiento.",
        },
        {
          titulo: "Cuidar el riesgo de una sobredosis",
          texto: "Si la recaída fue con opioides, el riesgo de una sobredosis es mayor, porque el cuerpo ya no está acostumbrado.",
        },
        {
          titulo: "Revisar el plan de prevención",
          texto: "Mirar de nuevo las situaciones de riesgo y las señales tempranas, decidir qué hacer en cada caso y dar gracias por cada día.",
        },
      ],
    },
  ],
  "familia-consejeria-4-5": [
    // La lección presenta en párrafos lo que enseña la Biblia sobre los ojos, el dinero y el tiempo; el cuadro lo ordena por adicción, con su daño y lo que dicen los manuales de salud.
    {
      t: "cuadro",
      titulo: "Los ojos, el dinero y el tiempo: tres adicciones de hoy",
      columnas: ["La adicción", "Lo que enseña la Biblia", "Lo que hay que saber"],
      filas: [
        [
          "La pornografía",
          "Hacer pacto con los ojos (Job 31:1) y saber que mirar para codiciar ya es adulterar en el corazón (Mateo 5:28).",
          "No es inofensiva: hiere el corazón, el matrimonio y a las personas que aparecen en ella.",
        ],
        [
          "El juego de apuestas",
          "Querer enriquecerse hace caer en tentación y lazo, y el amor al dinero es raíz de todos los males (1 Timoteo 6:9-10).",
          "Deja deudas y familias rotas; la Asociación Estadounidense de Psiquiatría reconoce el trastorno por juego como adicción.",
        ],
        [
          "Las pantallas",
          "Andar como sabios y no como necios, aprovechando bien el tiempo (Efesios 5:15-16).",
          "Pueden robar las horas de la familia, del descanso y de Dios. La OMS reconoce el trastorno por uso de videojuegos.",
        ],
      ],
    },
  ],
  // Ética y límites del consejero
  "familia-consejeria-5-3": [
    // La lección dice que los límites se ponen antes de necesitarlos; el cuadro junta las reglas que protegen con lo que se hace cuando aparece la señal, según lo que cuida cada una.
    {
      t: "cuadro",
      titulo: "Los límites con el otro sexo: antes y cuando aparece una señal",
      columnas: ["Lo que se cuida", "Antes: los límites", "Cuando aparece una señal"],
      filas: [
        [
          "El lugar",
          "Nunca a solas con alguien del otro sexo en un lugar privado; las conversaciones largas, con el cónyuge u otro consejero.",
          "Cambiar el marco: que la consejería siga con un consejero del mismo sexo, o con el cónyuge del consejero presente.",
        ],
        [
          "Lo que se habla y se escribe",
          "No hablar de la propia intimidad ni de los problemas del propio matrimonio, ni escribirse mensajes personales de noche.",
          "Responder con respeto y con claridad, y proponer que reciba ayuda junto con su cónyuge.",
        ],
        [
          "La rendición de cuentas",
          "Contarle al cónyuge y a otro líder con quién se está aconsejando, sin los detalles.",
          "Contárselo al pastor o a otro líder, y al propio cónyuge, sin los detalles de la consejería.",
        ],
        [
          "El corazón",
          "Guardar el corazón (Proverbios 4:23) y huir de la tentación, como José (Génesis 39:12).",
          "Tomar la señal como una alerta, no como un cumplido, y revisar el propio corazón delante de Dios.",
        ],
      ],
    },
  ],
  "familia-consejeria-5-5": [
    // La lección trae en dos listas cuándo derivar y la red de recursos; el cuadro une cada caso con a quién acudir, y cierra con el permiso que se pide y con derivar sin abandonar.
    {
      t: "cuadro",
      titulo: "Cuándo derivar y a quién acudir, sin dejar de acompañar",
      columnas: ["Cuándo", "A quién y cómo"],
      filas: [
        ["Riesgo de suicidio o de hacerle daño a otro", "Los números de emergencia: el 911 y la línea 988."],
        [
          "Señales de una enfermedad mental, como una depresión grave",
          "Un médico o un psicólogo de confianza que respete la fe, de preferencia que atienda en español.",
        ],
        ["Una adicción que necesita tratamiento médico", "Un médico y la línea de ayuda de SAMHSA, 1-800-662-4357."],
        [
          "Un trauma profundo, como un abuso sexual",
          "Dos o tres nombres de la lista. Si quien abusó sigue cerca de niños, consultar enseguida con el pastor cómo reportarlo.",
        ],
        [
          "Hace falta un abogado, un médico o un servicio social",
          "Médicos, abogados con licencia, representantes acreditados para inmigración y los servicios sociales de la zona.",
        ],
        [
          "No hay avance, o el caso supera al consejero",
          "Un profesional que respete la fe, como un terapeuta matrimonial y familiar o un consejero con licencia.",
        ],
        [
          "Antes de hablar con un profesional",
          "Pedir permiso a la persona, salvo si una vida corre peligro o la ley obliga a reportar.",
        ],
        [
          "Después de derivar",
          "Seguir acompañando con su permiso: orar, verse y preguntarle cómo le va, sin hacer la parte del terapeuta.",
        ],
      ],
    },
  ],
  // Teología de la oración
  "intercesion-1-3": [
    // La lección enseña a orar conforme a la voluntad de Dios; los pasos la vuelven un camino que el alumno puede seguir en su propia oración, como pide el objetivo o3.
    {
      t: "pasos",
      titulo: "Cómo orar buscando la voluntad de Dios",
      pasos: [
        {
          titulo: "Empieza por Dios",
          texto: "Como enseña el Padre nuestro, antes de pedir lo tuyo, pide que su nombre sea santificado, que venga su reino y que se haga su voluntad (Mateo 6:9-10).",
        },
        {
          titulo: "Busca su voluntad en la Palabra",
          texto: "Mucho de lo que Dios quiere ya está en la Biblia: la salvación de los perdidos, la santidad de los suyos y la unidad de la iglesia.",
        },
        {
          titulo: "Si la Biblia lo dice claro, ora con confianza",
          texto: "Si pedimos conforme a su voluntad, él nos oye, y sabemos que tenemos lo que le hemos pedido (1 Juan 5:14-15).",
        },
        {
          titulo: "Dile con sinceridad lo que sientes",
          texto: "En Getsemaní, Jesús no calló su angustia: pidió al Padre que, si era posible, pasara de él la copa (Mateo 26:39).",
        },
        {
          titulo: "Ríndete a lo que él quiera",
          texto: "Cuando no sabes qué quiere Dios, termina como Jesús: que se haga la voluntad del Padre y no la tuya. Confía en él más que en tus deseos.",
        },
      ],
    },
  ],
  "intercesion-1-5": [
    // La lección presenta tres respuestas de Dios; el cuadro las pone lado a lado con un ejemplo bíblico de cada una, para que el alumno evalúe sus oraciones sin concluir que Dios no oyó (objetivo o5).
    {
      t: "cuadro",
      titulo: "Sí, no o espera: las respuestas de Dios a la oración",
      columnas: ["Respuesta", "Ejemplo bíblico", "Lo que aprendemos"],
      filas: [
        [
          "Sí",
          "Ana pidió un hijo, y Dios le dio lo que le pidió (1 Samuel 1:27).",
          "Dios concede lo que pedimos conforme a su voluntad (1 Juan 5:14-15).",
        ],
        [
          "No",
          "Pablo rogó tres veces al Señor que le quitara el aguijón; él le dijo que le bastaba su gracia (2 Corintios 12:8-9).",
          "Dios da algo mejor: su gracia, porque su poder se perfecciona en la debilidad.",
        ],
        [
          "Espera",
          "Dios le dijo a Habacuc que, aunque la visión tardara, la esperara, porque sin duda vendría (Habacuc 2:3).",
          "Los tiempos de Dios no son los nuestros, pero él cumple.",
        ],
        [
          "En todos los casos",
          "Jesús enseñó a orar siempre y no desmayar (Lucas 18:1).",
          "Dios oyó. Perseverar no es presionar a Dios, sino seguir confiando en él.",
        ],
      ],
    },
  ],
  "intercesion-1-6": [
    // La lección nombra cinco estorbos en textos distintos; el cuadro une cada uno con su base bíblica y con lo que el creyente hace para quitarlo, que es lo que pide el objetivo o6.
    {
      t: "cuadro",
      titulo: "Lo que estorba la oración y cómo quitar el estorbo",
      columnas: ["Estorbo", "Lo que dice la Biblia", "Qué hacer"],
      filas: [
        [
          "El pecado que se guarda",
          "Las iniquidades hacen división entre nosotros y Dios (Isaías 59:1-2; Salmos 66:18).",
          "Confesarlo, porque Dios es fiel y justo para perdonar al que confiesa (1 Juan 1:9).",
        ],
        [
          "El rencor",
          "Jesús manda perdonar cuando oramos, si tenemos algo contra alguno (Marcos 11:25).",
          "Perdonar y buscar la reconciliación.",
        ],
        [
          "La duda",
          "El que duda es como la onda del mar, arrastrada por el viento (Santiago 1:6-7).",
          "Pedir con fe, confiando en el Dios que oye.",
        ],
        [
          "El mal trato en el hogar",
          "Pedro pide a los maridos honrar a su esposa para que sus oraciones no tengan estorbo (1 Pedro 3:7).",
          "Vivir sabiamente con la esposa y honrarla, y cuidar el trato en toda la familia.",
        ],
        [
          "Pedir solo para los propios deleites",
          "Se pide y no se recibe cuando se pide mal (Santiago 4:3).",
          "Pedir para la gloria de Dios y el bien de otros.",
        ],
      ],
    },
  ],
  // Intercesión bíblica
  "intercesion-2-2": [
    // La lección cuenta los seis ruegos en una sola frase; el cuadro los pone uno debajo de otro con la respuesta de Dios a cada uno, para analizar la humildad y la perseverancia de Abraham (objetivo o2).
    {
      t: "cuadro",
      titulo: "Abraham ruega por Sodoma: lo que pidió y lo que Dios respondió",
      columnas: ["Abraham", "Dios", "Cita"],
      filas: [
        [
          "Se acerca y apela al Juez de toda la tierra: ¿y si hay cincuenta justos?",
          "Si los halla, perdonará a todo el lugar por amor a ellos.",
          "Génesis 18:23-26",
        ],
        [
          "Aunque se sabe polvo y ceniza, sigue: ¿y si faltan cinco de los cincuenta?",
          "No la destruirá si halla cuarenta y cinco.",
          "Génesis 18:27-28",
        ],
        ["Vuelve a hablarle: ¿y si hay cuarenta?", "No lo hará por amor a los cuarenta.", "Génesis 18:29"],
        ["Le pide que no se enoje: ¿y si hay treinta?", "No lo hará si halla treinta.", "Génesis 18:30"],
        [
          "Ya se ha atrevido a hablar a su Señor: ¿y si hay veinte?",
          "No la destruirá por amor a los veinte.",
          "Génesis 18:31",
        ],
        [
          "Pide hablar solamente una vez más: ¿y si hay diez?",
          "No la destruirá por amor a los diez.",
          "Génesis 18:32",
        ],
        [
          "Cuando Jehová acaba de hablarle, vuelve a su lugar.",
          "No había ni diez justos: destruyó las ciudades, pero se acordó de Abraham y sacó a Lot.",
          "Génesis 18:33; 19:29",
        ],
      ],
    },
  ],
  "intercesion-2-4": [
    // La lección presenta a los tres intercesores uno tras otro; el cuadro los pone lado a lado para comparar qué los movió a orar, cómo oraron, qué reconocieron y en qué se apoyaron (objetivo o4).
    {
      t: "cuadro",
      titulo: "Samuel, Daniel y Nehemías: cómo oraron por su pueblo",
      columnas: ["Aspecto", "Samuel", "Daniel", "Nehemías"],
      filas: [
        [
          "Qué lo movió a orar",
          "Ya era anciano cuando el pueblo, que había pedido rey, le rogó que orara por ellos (1 Samuel 12:2, 19).",
          "Leyó en Jeremías que las desolaciones de Jerusalén durarían setenta años (Daniel 9:2).",
          "Supo que el muro de Jerusalén estaba derribado y sus puertas quemadas (Nehemías 1:3).",
        ],
        [
          "Cómo oró",
          "Se comprometió a no dejar de rogar por el pueblo (1 Samuel 12:23).",
          "En oración y ruego, con ayuno, cilicio y ceniza (Daniel 9:3).",
          "Lloró, hizo duelo por días, ayunó y oró día y noche (Nehemías 1:4-6).",
        ],
        [
          "Lo que reconoció",
          "Que dejar de orar por el pueblo sería pecar contra Jehová (1 Samuel 12:23).",
          "Que todos habían pecado: se incluyó él mismo en el pecado del pueblo (Daniel 9:5).",
          "Que él y la casa de su padre habían pecado: como Daniel, se incluyó (Nehemías 1:6).",
        ],
        [
          "En qué se apoyó",
          "En que Jehová no desamparará a su pueblo, por su gran nombre (1 Samuel 12:22).",
          "En las muchas misericordias de Dios, no en sus propias justicias (Daniel 9:18).",
          "En el Dios grande y temible que guarda el pacto y la misericordia (Nehemías 1:5).",
        ],
        [
          "Qué nos enseña",
          "Orar por los suyos es parte del servicio, y va junto con la enseñanza del buen camino.",
          "El intercesor se incluye en la confesión y descansa en la misericordia de Dios.",
          "La oración prepara el trabajo: oró y pidió al rey que lo enviara a reedificar (Nehemías 2:4-5).",
        ],
      ],
    },
  ],
  "intercesion-2-6": [
    // La lección enseña por quiénes y cómo interceder; los pasos lo vuelven un plan concreto para armar la lista de intercesión que pide al final (objetivo o6).
    {
      t: "pasos",
      titulo: "Tu lista de intercesión, paso a paso",
      pasos: [
        {
          titulo: "Escribe por quiénes vas a orar",
          texto: "Pon nombres de cada grupo: autoridades, hermanos y los que predican, obreros de la mies, los que sufren, los que no conocen a Cristo y aun los que te ofendieron (1 Timoteo 2:1-2; Mateo 5:44).",
        },
        {
          titulo: "Pide algo concreto para cada uno",
          texto: "Por los perdidos, su salvación (Romanos 10:1); por los que predican, denuedo para anunciar el evangelio (Efesios 6:19); por los hermanos, firmeza en todo lo que Dios quiere (Colosenses 4:12).",
        },
        {
          titulo: "Da gracias por cada persona",
          texto: "Interceder no es solo pedir: Pablo exhorta a hacer también acciones de gracias por todos los hombres (1 Timoteo 2:1).",
        },
        {
          titulo: "Ora con perseverancia",
          texto: "Vuelve a orar, no una sola vez: Epafras rogaba siempre y encarecidamente, y la iglesia oraba sin cesar por Pedro en la cárcel (Colosenses 4:12; Hechos 12:5).",
        },
        {
          titulo: "Anota las respuestas",
          texto: "Un cuaderno te ayuda a no olvidar a nadie y a ver cómo responde Dios, para darle gracias por cada respuesta.",
        },
        {
          titulo: "Ora a solas y también en grupo",
          texto: "Intercede a solas y también con otros, como los muchos que oraban reunidos en casa de María, la madre de Juan Marcos, mientras Pedro estaba preso (Hechos 12:5, 12).",
        },
        {
          titulo: "Guarda lo que te confían",
          texto: "No cuentes a otros los problemas ajenos con la excusa de pedir oración: el que anda en chismes descubre el secreto, pero el fiel lo guarda (Proverbios 11:13).",
        },
      ],
    },
  ],
  // El ayuno bíblico
  "intercesion-3-2": [
    // Pone lado a lado los seis ayunos de la lección con su motivo y su forma, y separa los extraordinarios de los que se pueden practicar.
    {
      t: "cuadro",
      titulo: "Seis ayunos del Antiguo Testamento",
      columnas: ["Quién", "Motivo", "Cómo ayunó", "Lo que enseña"],
      filas: [
        [
          "Moisés (Éxodo 34:28)",
          "Estar con Dios en el monte mientras recibía las palabras del pacto",
          "Cuarenta días y cuarenta noches sin comer pan ni beber agua",
          "Fue extraordinario y sostenido por Dios: no es un modelo para imitar",
        ],
        [
          "David (2 Samuel 12:16)",
          "El dolor por su hijo enfermo",
          "Rogó a Dios por el niño y ayunó",
          "El ayuno acompaña la intercesión en el dolor",
        ],
        [
          "Esdras (Esdras 8:21-23)",
          "Pedir camino derecho y protección antes de un viaje peligroso",
          "Proclamó ayuno junto al río Ahava para todos los que viajaban con él",
          "Dios les fue propicio: se ayuna al pedir dirección y protección",
        ],
        [
          "Ester (Ester 4:16)",
          "Una amenaza de muerte contra todo su pueblo",
          "Tres días sin comer ni beber, junto con los judíos de Susa",
          "Fue breve y excepcional: ayunar sin agua puede ser peligroso",
        ],
        [
          "Nínive (Jonás 3:5-10)",
          "Arrepentirse ante el anuncio del juicio",
          "Toda la ciudad, del mayor al menor, ayunó y se volvió de su mal camino",
          "Dios tuvo misericordia: el ayuno acompaña el arrepentimiento",
        ],
        [
          "Daniel (Daniel 10:2-3)",
          "Buscar a Dios en tres semanas de aflicción",
          "Ayuno parcial: sin manjar delicado, carne ni vino",
          "Se puede ayunar dejando lo agradable, no todo alimento",
        ],
      ],
    },
  ],
  "intercesion-3-4": [
    // Ayuda a evaluar el propio ayuno, como pide la lección, comparando punto por punto el ayuno vacío con el que Dios escogió.
    {
      t: "cuadro",
      titulo: "El ayuno vacío y el ayuno que Dios escogió",
      columnas: ["Qué se mira", "El ayuno vacío", "El ayuno que Dios escogió"],
      filas: [
        [
          "Para quién se ayuna",
          "Por costumbre religiosa, sin Dios en el centro (Zacarías 7:5)",
          "Para Dios: él es el centro del ayuno",
        ],
        [
          "El trato a los demás",
          "Oprime a los trabajadores y vive en contiendas (Isaías 58:3-4)",
          "Desata las ligaduras de impiedad y suelta las cargas de opresión (Isaías 58:6)",
        ],
        [
          "El necesitado",
          "Busca su propio gusto (Isaías 58:3)",
          "Parte su pan con el hambriento, alberga al pobre y cubre al desnudo (Isaías 58:7)",
        ],
        [
          "La actitud",
          "Orgullo: presenta sus méritos y se compara con otros (Lucas 18:11-12)",
          "Humildad: no se ayuna para sentirse mejor que otros",
        ],
        [
          "La respuesta de Dios",
          "No le hace caso, y el pueblo se queja (Isaías 58:3-4)",
          "Promete oír y responder al que lo invoca (Isaías 58:8-9)",
        ],
      ],
    },
  ],
  "intercesion-3-5": [
    // Reúne en un solo orden el propósito, el cuidado de la salud, la forma y los pasos, que la lección presenta por separado.
    {
      t: "pasos",
      titulo: "Cómo preparar un ayuno con propósito",
      pasos: [
        {
          titulo: "Define el propósito",
          texto: "Decide por qué vas a ayunar y por quién vas a orar. El ayuno es para buscar a Dios, no una dieta ni una forma de presionarlo.",
        },
        {
          titulo: "Revisa tu salud",
          texto: "Consulta antes a tu médico si tienes diabetes u otra enfermedad, tomas medicinas, estás embarazada o amamantando, tienes o tuviste un trastorno de la alimentación, eres menor de edad o adulto mayor.",
        },
        {
          titulo: "Elige la forma",
          texto: "Un ayuno normal, bebiendo agua, o uno parcial, como Daniel (Daniel 10:3). Personal y en secreto, o el que proclama la iglesia. El ayuno sin agua es excepcional y puede ser peligroso.",
        },
        { titulo: "Empieza con poco", texto: "Una comida o un día, antes de pensar en ayunos más largos." },
        {
          titulo: "Llena el tiempo con Dios",
          texto: "Usa el tiempo de las comidas para orar y leer la Biblia, y bebe agua. Si es un ayuno personal, no lo anuncies (Mateo 6:17-18).",
        },
        {
          titulo: "Cuida el cuerpo hasta el final",
          texto: "Si hay mareo fuerte, dolor o confusión, suspende el ayuno y busca ayuda. Termina con una comida liviana: tu cuerpo es templo del Espíritu Santo (1 Corintios 6:19).",
        },
        {
          titulo: "Anota lo que Dios te muestra",
          texto: "Escribe lo que Dios te enseñó en la oración y en su Palabra durante el ayuno.",
        },
      ],
    },
  ],
  // Guerra espiritual bíblica y equilibrada
  "intercesion-4-4": [
    // La lección enseña un orden, someterse y después resistir, y estos pasos lo vuelven un camino práctico para la lucha de cada día.
    {
      t: "pasos",
      titulo: "Resistir al diablo en el orden de Santiago 4:7",
      pasos: [
        {
          titulo: "Someterse primero a Dios",
          texto: "Santiago 4:7 tiene un orden: primero someterse a Dios y después resistir al diablo. No se puede resistir al diablo mientras se resiste a Dios.",
        },
        {
          titulo: "Ser honesto con el propio pecado",
          texto: "No todo se le puede echar al diablo: cada uno es tentado por su propia concupiscencia (Santiago 1:14). Hay que arrepentirse y buscar ayuda.",
        },
        {
          titulo: "Cerrar las puertas abiertas",
          texto: "No dar lugar al diablo (Efesios 4:26-27): arreglar el enojo antes de que se ponga el sol, confesar el pecado y apartarse de lo que hace caer.",
        },
        {
          titulo: "Resistir con la Escritura, como Jesús",
          texto: "Jesús respondió cada tentación con la Escritura (Mateo 4:4, 7, 10). El creyente aprende versículos para usarlos cuando llega la tentación.",
        },
        {
          titulo: "Llevar cautivo cada pensamiento",
          texto: "Las fortalezas son argumentos que se levantan contra el conocimiento de Dios: se derriban con la verdad de Dios, llevando cautivo todo pensamiento a la obediencia a Cristo (2 Corintios 10:3-5).",
        },
        {
          titulo: "Confiar en la promesa",
          texto: "A quien se somete a Dios y resiste, la Biblia le promete que el diablo huirá (Santiago 4:7). Así pasó en el desierto: el diablo dejó a Jesús (Mateo 4:11).",
        },
      ],
    },
  ],
  "intercesion-4-5": [
    // La lección narra cinco escenas y una ley sin resumen final; el cuadro las pone lado a lado para analizar cómo actuaron Jesús y los apóstoles.
    {
      t: "cuadro",
      titulo: "Ante los espíritus malos: qué muestra y qué enseña cada pasaje",
      columnas: ["Pasaje", "Lo que muestra", "La enseñanza para hoy"],
      filas: [
        [
          "Jesús en la sinagoga (Marcos 1:23-27)",
          "Con su sola palabra, Jesús hizo salir al espíritu inmundo; la gente se asombró de su autoridad.",
          "Jesús no necesitó rituales: tiene autoridad, y los espíritus le obedecen.",
        ],
        [
          "Los setenta (Lucas 10:17-20)",
          "Volvieron con gozo porque aun los demonios se les sujetaban en el nombre de Jesús.",
          "El gozo mayor no es el poder sobre los espíritus, sino tener el nombre escrito en los cielos.",
        ],
        [
          "Pablo en Filipos (Hechos 16:16-18)",
          "Pablo mandó en el nombre de Jesucristo que el espíritu de adivinación saliera de la muchacha, y salió en esa hora.",
          "Se actúa con la autoridad del nombre de Jesús, sin espectáculo.",
        ],
        [
          "Los hijos de Esceva (Hechos 19:13-16)",
          "Usaron el nombre de Jesús como un conjuro; el hombre del espíritu malo los dominó y huyeron desnudos y heridos.",
          "El nombre de Jesús no es una fórmula mágica: la autoridad es de los que le pertenecen.",
        ],
        [
          "Los que creyeron en Éfeso (Hechos 19:17-20)",
          "Muchos creyentes confesaron sus hechos, y muchos que practicaban la magia quemaron sus libros ante todos.",
          "El fruto verdadero es el arrepentimiento: se rompe con lo oculto y crece la palabra del Señor.",
        ],
        [
          "La ley de Dios (Deuteronomio 18:10-12)",
          "Dios prohíbe a su pueblo la adivinación, la hechicería, los encantamientos y consultar a los muertos.",
          "El creyente rompe con lo oculto: brujería, adivinación, cartas, ouija y consultar a los muertos.",
        ],
      ],
    },
  ],
  "intercesion-4-6": [
    // Pone frente a frente cada error, cómo se ve en la práctica y su corrección bíblica, para evaluar con discernimiento lo que se llama guerra espiritual.
    {
      t: "cuadro",
      titulo: "Los errores de la guerra espiritual y la corrección bíblica",
      columnas: ["El error", "Cómo se ve", "Lo que enseña la Biblia"],
      filas: [
        [
          "Vivir con miedo",
          "Ver demonios en todo y vivir asustado del enemigo.",
          "Dios no nos dio espíritu de cobardía, sino de poder, de amor y de dominio propio (2 Timoteo 1:7).",
        ],
        [
          "La arrogancia",
          "Hablarle al diablo con burla o con insultos.",
          "Ni el arcángel Miguel lanzó juicio de maldición: dejó la reprensión al Señor (Judas 1:9).",
        ],
        [
          "Creer en toda manifestación",
          "Aceptar algo como de Dios solo porque impresiona.",
          "Probar los espíritus: lo que no concuerda con la Escritura no viene de Dios (1 Juan 4:1).",
        ],
        [
          "Inventar métodos",
          "Dedicarse a identificar o a atar espíritus sobre las ciudades.",
          "Daniel no le habló al príncipe de Persia: oró a Dios con humildad y fue oído (Daniel 10:12-13).",
        ],
        [
          "Culpar al diablo",
          "Decir que el propio pecado fue obra del enemigo.",
          "Cada uno es tentado por su propia concupiscencia: se asume la responsabilidad (Santiago 1:14).",
        ],
      ],
    },
  ],
  // La oración en los avivamientos
  "intercesion-5-4": [
    // La lección reúne varias historias a lo largo de más de un siglo; la línea de tiempo las ordena y muestra cómo la oración unida precedió a los despertares y a las misiones.
    {
      t: "linea",
      titulo: "Los despertares: oración unida y misiones (1734-1858)",
      eventos: [
        {
          fecha: "1734-1735",
          texto: "Avivamiento en la iglesia de Jonathan Edwards, en Northampton, Nueva Inglaterra.",
        },
        { fecha: "Década de 1740", texto: "Llega el Gran Despertar, en el que también predica Jorge Whitefield." },
        {
          fecha: "1747",
          texto: "Edwards publica un llamado a que los cristianos de distintos lugares oren juntos por un derramamiento del Espíritu.",
          ref: "Zacarías 8:20-22",
        },
        {
          fecha: "1784",
          texto: "Pastores bautistas de Inglaterra leen el llamado de Edwards y empiezan reuniones mensuales de oración por el avivamiento y las naciones.",
        },
        { fecha: "1793", texto: "Guillermo Carey, que oraba con aquellos pastores, parte como misionero a la India." },
        {
          fecha: "Agosto de 1806",
          texto: "Cinco estudiantes del Williams College, en Massachusetts, oran por las naciones junto a un pajar, refugiados de una tormenta.",
        },
        {
          fecha: "1810",
          texto: "De aquella reunión sale la primera gran sociedad de misiones al extranjero de los Estados Unidos.",
        },
        {
          fecha: "Septiembre de 1857",
          texto: "Jeremías Lanphier invita a orar al mediodía en la calle Fulton, en Nueva York; el primer día llegan solo seis personas.",
          ref: "Mateo 18:19-20",
        },
        {
          fecha: "1858",
          texto: "Miles oran al mediodía en muchas ciudades; se habla de cientos de miles de convertidos, aunque las cifras varían.",
          ref: "Salmos 51:10-13",
        },
      ],
    },
  ],
  "intercesion-5-5": [
    // La lección narra cuatro avivamientos en cuatro países; el cuadro los pone lado a lado para ver lo que se repite: oración antes del fuego y confesión sincera.
    {
      t: "cuadro",
      titulo: "Cuatro avivamientos de comienzos del siglo XX",
      columnas: ["Avivamiento", "Quién", "Cómo empezó", "Lo que se destacó"],
      filas: [
        [
          "Gales, 1904",
          "Evan Roberts, antiguo minero del carbón que se preparaba para el ministerio",
          "Roberts oró durante años; las reuniones de oración y confesión se extendieron por todo el país",
          "Confesar todo pecado conocido y obedecer pronto al Espíritu; se calculan unas cien mil conversiones en pocos meses",
        ],
        [
          "Calle Azusa, Los Ángeles, 1906",
          "William J. Seymour, predicador afroamericano",
          "Reuniones de oración en una casa de la calle Bonnie Brae; en abril de 1906 empezó allí el avivamiento",
          "Personas de muchas razas y naciones juntas; de allí el movimiento pentecostal se extendió por el mundo",
        ],
        [
          "Pyongyang, Corea, 1907",
          "Los creyentes de la iglesia de Jangdaehyun; entre los primeros en confesar, Gil Seon-ju",
          "Reuniones de estudio bíblico en enero de 1907",
          "Confesión pública de pecados, con lágrimas; la iglesia coreana conserva hasta hoy la oración de madrugada",
        ],
        [
          "Valparaíso, Chile, 1909",
          "La iglesia metodista del pastor Willis C. Hoover",
          "Oró desde 1907 por un derramamiento del Espíritu, tras leer un folleto sobre un avivamiento en la India",
          "Se extendió a Santiago y nació la Iglesia Metodista Pentecostal, una de las raíces del pentecostalismo latinoamericano",
        ],
      ],
    },
  ],
  "intercesion-5-6": [
    // Es la lección que lleva a la práctica: los pasos ordenan el plan de oración que pide el objetivo o6, cada uno con su base bíblica y varios con un ejemplo de la historia estudiada.
    {
      t: "pasos",
      titulo: "Un plan para orar hoy por avivamiento",
      pasos: [
        {
          titulo: "Anhelar la presencia de Dios",
          texto: "Pedir, como Isaías, que Dios rompa los cielos y descienda (Isaías 64:1). Se busca a Dios mismo, no emociones fabricadas ni un espectáculo.",
        },
        {
          titulo: "Empezar por el propio corazón",
          texto: "Humillarse, buscar el rostro de Dios y apartarse del pecado (2 Crónicas 7:14), confesándolo como en Gales y en Corea. El avivamiento que se pide para la iglesia empieza en uno mismo.",
        },
        {
          titulo: "Orar con otros, con constancia",
          texto: "Formar un grupo o una cadena de oración, como los moravos y la calle Fulton: Jesús está en medio de los que se reúnen en su nombre (Mateo 18:19-20).",
        },
        {
          titulo: "Pedir valor para anunciar a Cristo",
          texto: "Como la iglesia amenazada de Hechos 4:29-31, no pedir comodidad sino denuedo para hablar la palabra de Dios.",
        },
        {
          titulo: "Orar por la ciudad y por las naciones",
          texto: "Rogar al Señor de la mies que envíe obreros a la propia ciudad y a las naciones (Mateo 9:37-38), y estar dispuestos a ir, como los moravos y Carey.",
        },
        {
          titulo: "Examinarlo todo por la Palabra y el fruto",
          texto: "No apagar al Espíritu, pero examinarlo todo y retener lo bueno, con orden (1 Tesalonicenses 5:19-21; 1 Corintios 14:40). Su fruto lo muestra (Mateo 7:16-20): amor, santidad, unidad y misión.",
        },
      ],
    },
  ],
  // Fundamentos de la capellanía
  "capellania-1-2": [
    // La lección enseña la presencia con tres textos, una lista de escucha y un caso; los pasos los ordenan en el camino que siguió Jesús con los de Emaús: acercarse, preguntar, escuchar y solo después hablar.
    {
      t: "pasos",
      titulo: "Estar presente, como Jesús en el camino a Emaús",
      pasos: [
        {
          titulo: "Acercarse y quedarse",
          texto: "Dios no nos ayudó desde lejos: el Verbo habitó entre nosotros, y Jesús se acercó y caminó con los de Emaús (Juan 1:14; Lucas 24:15). El capellán va, se presenta y pregunta si puede quedarse.",
        },
        {
          titulo: "Preguntar antes de hablar",
          texto: "Jesús les preguntó de qué hablaban y por qué estaban tristes (Lucas 24:17). El capellán mira a la persona, se sienta a su altura si puede y hace preguntas abiertas: ¿cómo está viviendo esto?",
        },
        {
          titulo: "Escuchar sin apurar",
          texto: "Deja silencios sin llenarlos de consejos, repite con otras palabras lo que oyó para que la persona se sienta comprendida y respeta sus lágrimas, su enojo y sus dudas.",
        },
        {
          titulo: "Hablar después de escuchar",
          texto: "Solo después de escucharlos, Jesús les explicó las Escrituras (Lucas 24:27). El capellán ofrece la oración sin imponerla, y si la persona dice que no, lo respeta.",
        },
        {
          titulo: "Despedirse y volver",
          texto: "Al despedirse, le dice cuándo puede volver, y lo cumple. Y no va solo: Cristo está con él y con la persona que visita (Mateo 28:20).",
        },
      ],
    },
  ],
  "capellania-1-4": [
    // La lección reparte entre una lista de formación, una comparación y una nota lo que pide cada camino; el cuadro junta la base, el servicio, la formación y los requisitos del voluntario y del profesional en una sola vista.
    {
      t: "cuadro",
      titulo: "El capellán voluntario y el profesional: lo que pide cada camino",
      columnas: ["Qué se compara", "Capellán voluntario", "Capellán profesional"],
      filas: [
        [
          "La base",
          "El llamado de Dios, el aval de su iglesia y un buen testimonio (Hechos 13:2-3; 1 Timoteo 3:7)",
          "La misma: el llamado de Dios, el aval de su iglesia y un buen testimonio",
        ],
        [
          "Su servicio",
          "Sirve algunas horas y suele visitar a los que piden una visita",
          "Es parte del equipo: atiende las crisis, asesora al personal y coordina a los voluntarios",
        ],
        [
          "Su formación",
          "La capacitación que pide cada hospital o cárcel",
          "Larga y supervisada: estudios de posgrado y la educación pastoral clínica (CPE)",
        ],
        [
          "Lo que se le pide",
          "Pasar una revisión de antecedentes",
          "Para certificarse con la APC: maestría, cuatro unidades de CPE, el aval de su grupo de fe y 2,000 horas de experiencia",
        ],
        [
          "Seguir aprendiendo",
          "Sobre el duelo, las crisis, las otras religiones y las normas de su institución",
          "También: en todos los casos, el capellán sigue aprendiendo",
        ],
      ],
    },
  ],
  // Capellanía hospitalaria
  "capellania-2-2": [
    // La lección equilibra la fe y la humildad con cuatro textos; el cuadro pone lado a lado lo que muestra cada uno y lo que aprende de él el capellán: Dios sana, su gracia basta y la medicina no se opone a la fe.
    {
      t: "cuadro",
      titulo: "Orar por un enfermo: lo que enseñan cuatro textos",
      columnas: ["Texto", "Lo que muestra", "Lo que aprende el capellán"],
      filas: [
        [
          "Santiago 5:14-15",
          "El enfermo llama a los ancianos de la iglesia, que oran por él y lo ungen con aceite en el nombre del Señor",
          "Orar con fe: la declaración de fe enseña que Dios sana hoy en respuesta a la oración de fe (artículo 11)",
        ],
        [
          "2 Reyes 20:5",
          "Dios oyó la oración del rey Ezequías, vio sus lágrimas y lo sanó",
          "Dios sana: el capellán pide la sanidad con fe",
        ],
        [
          "2 Corintios 12:8-9",
          "Pablo rogó tres veces que Dios le quitara su aguijón, y Dios le respondió que le bastaba su gracia",
          "A veces Dios sana y a veces sostiene con su gracia: no prometer lo que solo Dios decide ni culpar al enfermo",
        ],
        [
          "1 Timoteo 5:23",
          "Pablo le aconsejó a Timoteo un remedio por su estómago y por sus frecuentes enfermedades",
          "La fe y la medicina no se oponen: buscar la sanidad de Dios no se opone a recibir atención médica",
        ],
      ],
    },
  ],
  "capellania-2-3": [
    // La lección da las normas de privacidad y de higiene en un párrafo, una lista y un caso; los pasos las ordenan como se viven en cada visita, desde antes de ir hasta después de salir.
    {
      t: "pasos",
      titulo: "Cada visita en el hospital, con orden y con cuidado",
      pasos: [
        {
          titulo: "No visitar si está enfermo",
          texto: "Si el capellán está enfermo o con fiebre, no visita, para no contagiar a nadie: piensa primero en el bien del paciente (Filipenses 2:4).",
        },
        {
          titulo: "Recibir solo lo necesario",
          texto: "En los Estados Unidos, la ley HIPAA permite que el hospital le dé al clero el nombre, el lugar, el estado general y la afiliación religiosa del paciente, si este fue informado y no se opuso.",
        },
        {
          titulo: "Coordinar con la enfermera",
          texto: "Preguntarle si es un buen momento y qué cuidados pide. En cuidados intensivos, la visita es corta y se coordina con ella.",
        },
        {
          titulo: "Lavarse las manos y protegerse",
          texto: "Lavarse las manos o usar el gel antes de entrar, y ponerse la bata, los guantes o la mascarilla cuando lo pide el aislamiento.",
        },
        {
          titulo: "Cuidar al paciente en la visita",
          texto: "No tocar los equipos médicos ni mover al paciente, ni darle comida o bebida sin preguntar al personal. En cuidados intensivos, muchas veces no puede hablar, pero puede oír: hablarle con calma.",
        },
        {
          titulo: "Lavarse otra vez al salir",
          texto: "Lavarse las manos o usar el gel después de la visita y, si la familia está en la sala de espera, acompañarla un momento.",
        },
        {
          titulo: "Guardar lo que vio y oyó",
          texto: "No buscar más información de la que necesita ni compartirla, no sacar fotos y no publicar nada en las redes, ni para pedir oración: el de espíritu fiel guarda lo que sabe (Proverbios 11:13).",
        },
      ],
    },
  ],
  // Capellanía penitenciaria
  "capellania-3-3": [
    // La lección pide distinguir el perdón de Dios de las consecuencias del delito sin olvidar a las víctimas; el cuadro une cada verdad con su texto y con lo que hace el capellán en la visita.
    {
      t: "cuadro",
      titulo: "La culpa, el perdón y las consecuencias: lo que hace el capellán",
      columnas: ["Qué se mira", "Lo que enseña la Biblia", "Lo que hace el capellán"],
      filas: [
        [
          "La culpa",
          "Un ladrón reconoció en la cruz que padecía justamente por lo que había hecho (Lucas 23:40-41)",
          "Escucha sin justificar el delito ni condenar a la persona",
        ],
        [
          "El perdón",
          "Jesús le prometió que ese mismo día estaría con él en el paraíso (Lucas 23:42-43)",
          "Le muestra que en Cristo hay perdón para el que se arrepiente, y ora con él para que confiese su pecado a Dios",
        ],
        [
          "Las consecuencias",
          "El perdón de Cristo llegó al ladrón, aunque siguió en la cruz",
          "Le explica que el perdón no quita la sentencia, y lo anima a cumplirla con un corazón nuevo",
        ],
        [
          "Las víctimas",
          "Pablo pensó también en el que había sido dañado y ofreció pagar lo que Onésimo debiera (Filemón 1:18)",
          "No las desprecia ni les pide perdonar pronto; si el preso quiere reparar, solo por los caminos de la ley y sin buscarlas",
        ],
        [
          "La justicia y la misericordia",
          "Dios pide las dos cosas juntas: justicia y misericordia, con humildad ante él (Miqueas 6:8)",
          "No le dice si es inocente o culpable en su caso, que lo deciden los tribunales: lo acompaña como persona ante Dios",
        ],
      ],
    },
  ],
  "capellania-3-5": [
    // La lección da las señales de la manipulación en una lista y la respuesta prudente en una comparación, una nota y un caso; el cuadro pone frente a cada señal su respuesta, para amar sin ser ingenuo.
    {
      t: "cuadro",
      titulo: "Las señales de la manipulación y la respuesta prudente",
      columnas: ["La señal", "Cómo se ve", "La respuesta prudente"],
      filas: [
        [
          "Los halagos",
          "Usted es el único que me entiende",
          "No creerlo todo: el simple todo lo cree, pero el avisado mira bien sus pasos (Proverbios 14:15)",
        ],
        [
          "Los favores que crecen",
          "Primero una estampilla, después una llamada, después un paquete",
          "No hacer favores a escondidas ni entrar o sacar nada sin permiso: ni una carta, ni un dulce, ni un mensaje",
        ],
        [
          "Las historias de urgencia",
          "Una necesidad urgente, como una madre muy enferma, para que el voluntario rompa una regla",
          "Escuchar con compasión y orar, explicar que la regla no lo permite y ofrecer el camino oficial: el capellán de la unidad",
        ],
        [
          "Los pedidos personales",
          "Dinero, datos personales o contacto fuera de la cárcel",
          "No dar su teléfono, su dirección ni ningún otro dato personal, y contar el pedido al capellán supervisor",
        ],
        [
          "Los intentos de separar",
          "Apartar al voluntario de su capellán o de su equipo",
          "Avisar al capellán cuando algo incomoda, sin callarlo para no quedar mal, y seguir sirviendo sin rencor",
        ],
      ],
    },
  ],
  // Emergencias y desastres
  "capellania-4-3": [
    // La lección dice qué frases no usar y, en otros párrafos, qué enseña la Biblia y qué hacer; el cuadro los junta, para que el alumno sepa qué hacer en lugar de cada frase que lastima.
    {
      t: "cuadro",
      titulo: "Después del desastre: lo que lastima y lo que ayuda",
      columnas: ["Lo que lastima", "Lo que enseña la Biblia", "Lo que hace el capellán"],
      filas: [
        [
          "Decir que el desastre fue un castigo por los pecados de las víctimas",
          "Los que murieron cuando cayó la torre de Siloé no eran más culpables que los demás (Lucas 13:4-5)",
          "Le dice con amor lo que enseñó Jesús, y le recuerda que Dios no lo abandona y está cerca de los que sufren",
        ],
        [
          "Querer explicarlo todo, como decir que todo pasa por algo cuando la persona sigue en shock",
          "Los amigos de Job consolaron bien mientras callaron siete días (Job 2:11-13), y se equivocaron al querer explicarlo",
          "No tiene que explicar por qué pasó: se queda a su lado y escucha, sin apurarse a responder",
        ],
        [
          "Decir que no debe llorar ni enojarse, porque eso es falta de fe",
          "La Biblia permite el lamento: los salmos y las Lamentaciones le dicen a Dios lo que duele",
          "Le ofrece orar, aunque quiera decirle a Dios lo que le duele, y le recuerda que sus misericordias son nuevas cada mañana",
        ],
      ],
    },
  ],
  "capellania-4-6": [
    // La lección reparte en varias listas la preparación de la iglesia y el cuidado de sus voluntarios; la línea los ordena en el tiempo: antes, durante y después del desastre.
    {
      t: "linea",
      titulo: "Antes, durante y después del desastre: la iglesia y sus voluntarios",
      eventos: [
        {
          fecha: "Antes del desastre",
          texto: "La iglesia hace un plan de emergencia para el templo y para las familias, porque la sabiduría se prepara antes.",
          ref: "Proverbios 22:3",
        },
        {
          fecha: "Antes, en cada casa",
          texto: "La iglesia anima a guardar agua para al menos tres días: un galón por persona por día, como recomienda la guía Listo del gobierno.",
        },
        {
          fecha: "Antes, con otros",
          texto: "Se une a una organización de ayuda en los desastres y capacita a sus voluntarios.",
        },
        {
          fecha: "Durante el desastre",
          texto: "Sirve cuando lo piden las autoridades o la organización, por ejemplo como albergue o como centro de comida.",
        },
        {
          fecha: "En cada turno",
          texto: "Los voluntarios trabajan en equipo, por turnos y con descanso: como le advirtió Jetro a Moisés, nadie puede hacerlo solo.",
          ref: "Éxodo 18:17-18",
        },
        {
          fecha: "Al terminar",
          texto: "Descansan, como Jesús llevó aparte a sus discípulos, y hablan de lo que vieron con su supervisor y con un compañero de confianza.",
          ref: "Marcos 6:31",
        },
        {
          fecha: "Si no mejora",
          texto: "El voluntario busca a un profesional de la salud mental. La línea de SAMHSA, 1-800-985-5990, atiende también a los que ayudan.",
        },
        {
          fecha: "Los meses siguientes",
          texto: "La iglesia acompaña a las familias durante meses, porque la recuperación tarda.",
        },
      ],
    },
  ],
  // Marco legal y ético del capellán
  "capellania-5-2": [
    // La lección da los límites del secreto en una lista, una comparación, una nota y un caso; el cuadro los junta por situación, con lo que hace el capellán y por qué, para decidir qué se guarda y qué se reporta.
    {
      t: "cuadro",
      titulo: "Qué guarda y qué reporta el capellán en Texas",
      columnas: ["La situación", "Qué hace el capellán", "Por qué"],
      filas: [
        [
          "Antes de que le confíen algo",
          "Puede decir que guarda todo, salvo una vida en peligro o el abuso de un niño, un anciano o una persona con discapacidad",
          "Así nadie se siente traicionado después",
        ],
        [
          "Le confiesa un pecado del que se arrepiente",
          "Lo guarda y lo acompaña en su arrepentimiento",
          "No pone a nadie en peligro; la regla 505 protege lo que se dice en confianza al ministro como consejero espiritual",
        ],
        [
          "Le cuenta sus dudas de fe o sus problemas de familia",
          "Lo guarda",
          "El de espíritu fiel guarda el secreto (Proverbios 11:13)",
        ],
        [
          "Hay motivos para creer que un niño sufre abuso o negligencia",
          "Lo reporta enseguida a la línea de abuso de Texas y avisa a su supervisor, sin investigar por su cuenta",
          "Todos deben reportarlo, también el clero, y el privilegio no lo impide (Código de Familia, sección 261.101)",
        ],
        [
          "Hay motivos para creer que una persona mayor o con discapacidad sufre abuso, negligencia o explotación",
          "Lo reporta enseguida",
          "La ley también lo pide a quien tenga esos motivos (Código de Recursos Humanos, sección 48.051)",
        ],
        ["Piensa quitarse la vida o hacerle daño a otro", "Busca ayuda de inmediato", "Hay una vida en peligro"],
        [
          "La institución pide reportarlo, como un plan de fuga o de violencia",
          "Lo reporta según las reglas del hospital o de la prisión",
          "El capellán sigue también las normas de la institución donde sirve",
        ],
      ],
    },
  ],
  "capellania-5-6": [
    // La lección compara la norma que limita con la orden de pecar y lo muestra en un caso; los pasos convierten eso en un camino para distinguir una de otra y responder con respeto.
    {
      t: "pasos",
      titulo: "Cuando la institución pide algo contra su conciencia",
      pasos: [
        {
          titulo: "Escuchar y agradecer",
          texto: "Agradecer la confianza y escuchar qué necesitan la institución y la persona que hay que atender.",
        },
        {
          titulo: "Distinguir: ¿limita o pide pecar?",
          texto: "Una norma que limita, como no repartir folletos sin permiso, no es lo mismo que una orden de pecar, como negar a Cristo, mentir en un informe o esconder un abuso.",
        },
        {
          titulo: "Si la norma lo limita, obedecer",
          texto: "La obedece aunque le incomode, porque Dios pide someterse a las autoridades (Romanos 13:1).",
        },
        {
          titulo: "Si lo obliga a pecar, decirlo con respeto",
          texto: "Obedece a Dios antes que a los hombres, como Pedro y Juan, y explica con respeto que su conciencia no se lo permite (Hechos 4:19-20).",
        },
        {
          titulo: "Facilitar que otro atienda",
          texto: "Busca con la institución a quien pueda dar esa atención, como un líder de la fe de la persona, y ofrece su compañía en lo que sí puede hacer.",
        },
        {
          titulo: "Informar y preguntar ante la duda",
          texto: "Informa a su supervisor y anota lo que se hizo. Si tiene una duda legal, pregunta al departamento legal de la institución o a un abogado, y no decide solo.",
        },
        {
          titulo: "Aceptar las consecuencias y seguir amando",
          texto: "Como Daniel, que siguió orando sin armar un escándalo, acepta las consecuencias y sigue sirviendo con el mismo amor, sin criticar la fe de nadie (Daniel 6:10).",
        },
      ],
    },
  ],
};
