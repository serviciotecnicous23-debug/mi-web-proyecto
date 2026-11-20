/**
 * Especialidad Ministerio pastoral · Materia 5 (avanzada) — Predicación pastoral (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La predicación desde el oficio del pastor que conoce a su rebaño: sus tareas, el plan de predicación del año, la
 * predicación en las crisis, las ocasiones especiales, la corrección y el consuelo desde el púlpito y el crecimiento
 * del predicador. Trae ejemplos resueltos paso a paso. No repite Homilética I (Nivel 3) ni Homilética II (Nivel 4),
 * que enseñan a preparar el sermón: las lleva a la vida de una congregación.
 */
import type { LeccionContenido } from "../tipos";

export const PASTORAL_5: LeccionContenido[] = [
  {
    id: "pastoral-5-1",
    objetivos: [
      "Explicar en qué se distingue la predicación del pastor que conoce a su congregación.",
      "Reconocer las tareas de la predicación pastoral: alimentar, advertir, exhortar y consolar.",
      "Relacionar el púlpito con el cuidado del rebaño durante la semana.",
    ],
    paraEmpezar:
      "Un predicador invitado predica un buen sermón y se va. El pastor predica cada semana a las mismas personas, y el lunes las visita. Eso cambia la manera de predicar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Juan 21:15-17" },
      {
        t: "parrafo",
        texto:
          "Jesús restauró a Pedro con un encargo pastoral: «Apacienta mis corderos», «Pastorea mis ovejas», «Apacienta mis ovejas». Predicar es una forma de apacentar: de dar de comer al rebaño.",
      },
      { t: "versiculo", ref: "Ezequiel 3:17" },
      {
        t: "parrafo",
        texto:
          "Dios puso a Ezequiel «por atalaya a la casa de Israel»: «oirás, pues, tú la palabra de mi boca, y los amonestarás de mi parte». El pastor no predica de su parte, sino de parte de Dios.",
      },
      { t: "versiculo", ref: "1 Corintios 14:3" },
      {
        t: "parrafo",
        texto:
          "La palabra que viene de Dios edifica a la iglesia: habla «para edificación, exhortación y consolación». Un buen plan de predicación alimenta, anima y consuela.",
      },
      { t: "versiculo", ref: "2 Timoteo 4:2" },
      {
        t: "parrafo",
        texto:
          "Pablo le pide a Timoteo: «que prediques la palabra; que instes a tiempo y fuera de tiempo; redarguye, reprende, exhorta con toda paciencia y doctrina». La paciencia también es parte de la predicación pastoral.",
      },
      { t: "subtitulo", texto: "El predicador invitado y el pastor que predica" },
      {
        t: "lista",
        items: [
          "El invitado predica un mensaje; el pastor alimenta a un rebaño semana tras semana.",
          "El invitado conoce el texto; el pastor conoce el texto y a las personas que lo escuchan.",
          "El invitado se va al terminar; el pastor sigue el lunes con la visita, la consejería y el cuidado.",
          "El invitado puede sembrar; el pastor siembra, riega y espera la cosecha con paciencia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Mientras preparas el sermón, piensa en personas concretas: la viuda que perdió a su esposo, el joven que duda, la familia que se está mudando. No para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida.",
      },
    ],
    ideaClave:
      "Jesús le encargó a Pedro apacentar sus ovejas, y predicar es una forma de apacentar. Como el atalaya, el pastor habla de parte de Dios, y su palabra busca edificar, exhortar y consolar. A diferencia del predicador invitado, el pastor conoce el texto y a su gente, predica semana tras semana con paciencia y sigue el lunes con el cuidado del rebaño.",
    paraLaVida: {
      texto: "El pastor predica mejor cuando conoce a quienes lo escuchan.",
      pregunta: "¿En qué personas concretas de tu iglesia piensas cuando preparas un mensaje?",
    },
  },
  {
    id: "pastoral-5-2",
    objetivos: [
      "Explicar por qué el pastor anuncia todo el consejo de Dios.",
      "Combinar series por libros, de doctrina y de temas con el calendario de la iglesia.",
      "Armar un plan de predicación de un año, paso a paso.",
    ],
    paraEmpezar:
      "Si el pastor predica solo lo que se le ocurre cada semana, terminará predicando siempre lo mismo. Un plan lo ayuda a darle al rebaño toda la Palabra.",
    bloques: [
      { t: "versiculo", ref: "Hechos 20:27" },
      {
        t: "parrafo",
        texto:
          "Pablo pudo decirles a los ancianos de Éfeso: «no he rehuido anunciaros todo el consejo de Dios». No predicó solo sus temas favoritos: le dio a la iglesia toda la Palabra.",
      },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "«Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia». Si toda es útil, con el tiempo toda debe predicarse.",
      },
      { t: "versiculo", ref: "Lucas 24:27" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo, «comenzando desde Moisés, y siguiendo por todos los profetas», les mostró lo que las Escrituras decían de él. Un buen plan recorre el Antiguo y el Nuevo Testamento, y en todo lleva a Cristo.",
      },
      { t: "versiculo", ref: "Lucas 1:3" },
      {
        t: "parrafo",
        texto:
          "Lucas investigó «con diligencia» y escribió «por orden». Planificar no apaga al Espíritu: el mismo Espíritu que guía en el púlpito guía también en el escritorio.",
      },
      { t: "subtitulo", texto: "Las piezas del plan" },
      {
        t: "lista",
        items: [
          "Series por libros de la Biblia, que enseñan a leer la Palabra en su contexto.",
          "Series de doctrina, que afirman la fe de la iglesia según la declaración de fe.",
          "Series de temas para las necesidades de la congregación, como la familia, el dinero o el sufrimiento.",
          "Las fechas del calendario cristiano y de la comunidad: la Semana Santa, Pentecostés, la Navidad, el Día de las Madres y el de los Padres, Acción de Gracias y el aniversario de la iglesia.",
          "Un equilibrio entre el Antiguo y el Nuevo Testamento, y entre los géneros: narraciones, poesía, profecía, evangelios y cartas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan de predicación de un año" },
      {
        t: "lista",
        items: [
          "De enero a marzo: una serie por un libro, como Filipenses en ocho mensajes, y la preparación de la Semana Santa.",
          "Marzo o abril: la Semana Santa y la Resurrección, con un mensaje claro para los visitantes.",
          "De abril a junio: una serie de doctrina, como el Espíritu Santo, que llega a Pentecostés, junto con el Día de las Madres y el de los Padres.",
          "Julio y agosto: una serie de temas que pide la iglesia, como la familia o el trabajo, y un libro del Antiguo Testamento, como Rut o Jonás.",
          "De septiembre a noviembre: una serie por un evangelio o una carta, y Acción de Gracias.",
          "Diciembre: el Adviento y la Navidad.",
          "Cada trimestre: revisar el plan con los líderes, dejar espacio para lo inesperado y orar por la dirección del Espíritu.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Escribe el plan, pero tenlo en lápiz: una crisis, un avivamiento o una necesidad nueva pueden pedir que lo cambies. El plan está al servicio del rebaño, no al revés.",
      },
    ],
    ideaClave:
      "Pablo anunció todo el consejo de Dios, y toda la Escritura es útil, así que el pastor no predica solo sus temas favoritos. Un plan anual combina series por libros, de doctrina y de temas con las fechas del calendario cristiano y de la comunidad, y equilibra los testamentos y los géneros, llevando siempre a Cristo. Se escribe con diligencia y en oración, se revisa cada trimestre y deja espacio para lo inesperado.",
    paraLaVida: {
      texto: "Un plan de predicación es una forma de amar al rebaño con anticipación.",
      pregunta: "¿Qué parte de la Biblia nunca ha escuchado tu iglesia desde el púlpito?",
    },
  },
  {
    id: "pastoral-5-3",
    objetivos: [
      "Explicar cómo predica la Biblia en medio del dolor: el lamento y la esperanza.",
      "Reconocer cuándo cambiar el plan de predicación por una crisis.",
      "Preparar el mensaje del domingo después de una tragedia, paso a paso.",
    ],
    paraEmpezar:
      "A veces una semana lo cambia todo: muere un joven de la iglesia, un huracán destruye casas o una tragedia sacude a la ciudad. El domingo la gente llega con preguntas, y el pastor tiene que hablar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Job 2:13" },
      {
        t: "parrafo",
        texto:
          "Los amigos de Job empezaron bien: «se sentaron con él en tierra por siete días y siete noches, y ninguno le hablaba palabra, porque veían que su dolor era muy grande». Se equivocaron después, cuando quisieron explicar lo que no sabían. El pastor acompaña antes de explicar.",
      },
      { t: "versiculo", ref: "Salmos 46:1-2" },
      {
        t: "parrafo",
        texto:
          "El salmo no niega la tormenta, «aunque la tierra sea removida», pero afirma: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».",
      },
      { t: "versiculo", ref: "Lamentaciones 3:21-23" },
      {
        t: "parrafo",
        texto:
          "Jeremías lloró sobre una ciudad destruida, y en medio del lamento recordó: «Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad». La Biblia enseña a lamentar y a esperar.",
      },
      { t: "versiculo", ref: "Juan 16:33" },
      {
        t: "parrafo",
        texto:
          "Jesús no prometió una vida sin dolor: «En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el domingo después de una tragedia" },
      {
        t: "lista",
        items: [
          "Cambiar el plan: la serie puede esperar una semana; la iglesia herida, no.",
          "Nombrar el dolor con verdad, sin exagerar ni esconder lo que pasó, y respetando a las familias.",
          "Lamentar con la Biblia: leer un salmo de lamento o Lamentaciones 3.",
          "No explicar lo que Dios no explicó: no culpar a las víctimas ni dar razones que no sabemos.",
          "Anunciar la esperanza en Cristo, que sufrió con nosotros y venció a la muerte.",
          "Dar pasos concretos: orar juntos, ayudar a los afectados y decir dónde buscar consejo o ayuda profesional.",
          "Acompañar después: el mensaje no reemplaza las visitas ni el cuidado de la semana.",
        ],
      },
      { t: "versiculo", ref: "Habacuc 3:17-18" },
      {
        t: "parrafo",
        texto:
          "Habacuc enseña a creer cuando todo falta: «Aunque la higuera no florezca, Ni en las vides haya frutos», «Con todo, yo me alegraré en Jehová, Y me gozaré en el Dios de mi salvación».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En una crisis grande, como un desastre o una tragedia en la comunidad, coordina con otros pastores y con las autoridades antes de convocar. Y cuida lo que publicas en las redes: un mensaje apresurado puede herir a las familias.",
      },
    ],
    ideaClave:
      "En una crisis, el pastor acompaña antes de explicar, como los amigos de Job en sus primeros días. La Biblia enseña a lamentar y a esperar: Dios es nuestro amparo, sus misericordias son nuevas cada mañana y Jesús venció al mundo. El domingo después de una tragedia se cambia el plan, se nombra el dolor con verdad, se lamenta con la Escritura, no se explica lo que Dios no explicó, se anuncia la esperanza en Cristo y se dan pasos concretos; y el cuidado continúa durante la semana.",
    paraLaVida: {
      texto: "En la crisis, la iglesia no necesita respuestas fáciles, sino un Dios presente.",
      pregunta: "¿Qué pasaje bíblico leerías el domingo después de una tragedia en tu ciudad?",
    },
  },
  {
    id: "pastoral-5-4",
    objetivos: [
      "Explicar qué tienen de especial los mensajes de Navidad, Semana Santa, bodas y funerales.",
      "Predicar con claridad a los visitantes que no conocen el evangelio.",
      "Preparar un mensaje breve para un funeral, paso a paso.",
    ],
    paraEmpezar:
      "En Navidad, en Semana Santa, en una boda o en un funeral llegan personas que casi nunca van a la iglesia. Para muchas, será el único mensaje del año.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 4:5-6" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Andad sabiamente para con los de afuera, redimiendo el tiempo. Sea vuestra palabra siempre con gracia, sazonada con sal». En las ocasiones especiales, el pastor piensa en los de afuera.",
      },
      { t: "versiculo", ref: "Lucas 2:10-11" },
      {
        t: "parrafo",
        texto:
          "La Navidad es una buena noticia para todos: «os doy nuevas de gran gozo, que será para todo el pueblo: que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor».",
      },
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "La Semana Santa anuncia el centro del evangelio: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día».",
      },
      { t: "versiculo", ref: "Efesios 5:31-32" },
      {
        t: "parrafo",
        texto:
          "En una boda, el mensaje habla de la pareja y también de Cristo: «Grande es este misterio; mas yo digo esto respecto de Cristo y de la iglesia».",
      },
      { t: "versiculo", ref: "2 Corintios 5:1" },
      {
        t: "parrafo",
        texto:
          "En un funeral, el mensaje consuela con una esperanza firme: «si nuestra morada terrestre, este tabernáculo, se deshiciere, tenemos de Dios un edificio, una casa no hecha de manos, eterna, en los cielos».",
      },
      { t: "subtitulo", texto: "Para los que vienen pocas veces" },
      {
        t: "lista",
        items: [
          "Ser breve y claro: un texto, una idea y una invitación.",
          "Evitar las palabras que solo entiende la iglesia, o explicarlas.",
          "Hablar con respeto a todos, también a los que no creen o tienen otras creencias.",
          "Presentar el evangelio con sencillez y sin presionar.",
          "Invitar a un paso siguiente: una visita, un grupo o una conversación.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un mensaje de diez minutos para un funeral" },
      {
        t: "lista",
        items: [
          "Un texto: Juan 11:25-26 o 2 Corintios 5:1.",
          "Reconocer el dolor y la vida de la persona, con uno o dos recuerdos que compartió la familia.",
          "La idea central: en Cristo, la muerte no tiene la última palabra.",
          "La esperanza: Jesús murió y resucitó, y promete vida eterna al que cree en él.",
          "Una invitación sencilla a confiar en Cristo, sin presionar.",
          "Una oración por la familia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En las bodas y en los funerales el mensaje no es el centro: las personas lo son. Prepáralo bien, pero que sea breve, y deja que el amor por la familia se note más que tu elocuencia.",
      },
    ],
    ideaClave:
      "En Navidad, en Semana Santa, en las bodas y en los funerales llegan personas que casi nunca escuchan el evangelio, así que el pastor habla con sabiduría a los de afuera. La Navidad anuncia al Salvador; la Semana Santa, la muerte y la resurrección de Cristo; la boda, el misterio de Cristo y la iglesia; y el funeral, la casa eterna de Dios. El mensaje es breve y claro: un texto, una idea, el evangelio con sencillez y una invitación sin presionar.",
    paraLaVida: {
      texto: "Para alguien, tu mensaje de Navidad será el único sermón del año.",
      pregunta: "¿Cómo puedes preparar el próximo mensaje especial pensando en los que casi nunca vienen?",
    },
  },
  {
    id: "pastoral-5-5",
    objetivos: [
      "Explicar cómo el pastor corrige y consuela con la verdad en amor.",
      "Distinguir la exhortación bíblica del uso del púlpito para atacar a alguien.",
      "Ajustar el mensaje a la necesidad: los ociosos, los de poco ánimo y los débiles.",
    ],
    paraEmpezar:
      "El mismo sermón puede sanar o herir. Depende de si el pastor dice la verdad con amor o usa el púlpito para desahogarse.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=s-K5s7YpUC8", titulo: "Resumen del libro de Isaías (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Isaías 40:1-2" },
      {
        t: "parrafo",
        texto:
          "Dios manda a sus siervos: «Consolaos, consolaos, pueblo mío, dice vuestro Dios. Hablad al corazón de Jerusalén». Consolar también es predicar.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:14" },
      {
        t: "parrafo",
        texto:
          "No todos necesitan lo mismo: «que amonestéis a los ociosos, que alentéis a los de poco ánimo, que sostengáis a los débiles, que seáis pacientes para con todos». El pastor conoce a su rebaño y le da a cada uno la palabra que necesita.",
      },
      { t: "versiculo", ref: "Efesios 4:15" },
      {
        t: "parrafo",
        texto:
          "La regla es «siguiendo la verdad en amor». La verdad sin amor hiere; el amor sin verdad engaña.",
      },
      { t: "versiculo", ref: "2 Corintios 2:4" },
      {
        t: "parrafo",
        texto:
          "Pablo corrigió a los corintios con firmeza, pero así: «con muchas lágrimas, no para que fueseis contristados, sino para que supieseis cuán grande es el amor que os tengo».",
      },
      { t: "versiculo", ref: "Gálatas 4:16" },
      {
        t: "parrafo",
        texto:
          "A veces la verdad molesta: «¿Me he hecho, pues, vuestro enemigo, por deciros la verdad?». El pastor no busca agradar a todos, sino ser fiel.",
      },
      { t: "subtitulo", texto: "Exhortar no es atacar" },
      {
        t: "lista",
        items: [
          "La exhortación nace del texto bíblico; el ataque nace del enojo del predicador.",
          "La exhortación habla del pecado; el ataque señala a una persona delante de todos.",
          "La exhortación ofrece la gracia y un camino de vuelta; el ataque solo deja culpa.",
          "La exhortación incluye al predicador; el ataque habla siempre de los otros.",
          "Los asuntos personales se tratan en privado, como enseña Mateo 18:15, y no desde el púlpito.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de predicar un mensaje fuerte, pregúntate: ¿lo digo porque el texto lo dice, o porque estoy dolido? Si estás herido con alguien, habla con esa persona en privado antes de subir al púlpito.",
      },
    ],
    ideaClave:
      "Dios manda consolar a su pueblo y también corregirlo, y Pablo pide amonestar a los ociosos, alentar a los de poco ánimo y sostener a los débiles. La regla es la verdad en amor: Pablo corrigió con lágrimas para mostrar su amor, y aceptó que la verdad a veces molesta. La exhortación nace del texto, habla del pecado sin señalar a nadie, ofrece la gracia e incluye al predicador; los asuntos personales se tratan en privado.",
    paraLaVida: {
      texto: "Desde el púlpito se corrige con lágrimas, no con piedras.",
      pregunta: "¿Qué necesita hoy tu iglesia: más consuelo, más corrección o más ánimo?",
    },
  },
  {
    id: "pastoral-5-6",
    objetivos: [
      "Explicar por qué el predicador sigue aprendiendo toda la vida.",
      "Pedir y recibir retroalimentación sobre su predicación.",
      "Predicar con honestidad, sin apropiarse del trabajo de otros.",
    ],
    paraEmpezar:
      "Nadie llega a ser un predicador terminado. Los mejores siguen leyendo, escuchando consejos y orando cada semana.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "1 Timoteo 4:15-16" },
      {
        t: "parrafo",
        texto:
          "Pablo le dice a Timoteo: «Ocúpate en estas cosas; permanece en ellas, para que tu aprovechamiento sea manifiesto a todos». Y añade: «Ten cuidado de ti mismo y de la doctrina». El predicador cuida su vida y su enseñanza.",
      },
      { t: "versiculo", ref: "Hechos 18:24-26" },
      {
        t: "parrafo",
        texto:
          "Apolos era «varón elocuente, poderoso en las Escrituras», pero le faltaba algo. Priscila y Aquila «le tomaron aparte y le expusieron más exactamente el camino de Dios». Apolos aceptó la corrección y siguió creciendo.",
      },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman». Un predicador sabio pide consejo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: pedir retroalimentación" },
      {
        t: "lista",
        items: [
          "Elegir a dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos.",
          "Pedirles que respondan unas preguntas sencillas: ¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?",
          "Grabar el mensaje y escucharlo o verlo uno mismo, con una rúbrica sencilla.",
          "Elegir una sola cosa para mejorar en el mes siguiente, como la claridad, la aplicación o el tiempo.",
          "Agradecer cada consejo, aunque duela, y orar por lo aprendido.",
        ],
      },
      { t: "versiculo", ref: "2 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "El predicador es honesto: renuncia «a lo oculto y vergonzoso, no andando con astucia, ni adulterando la palabra de Dios». Predicar como propio el sermón de otro, o un texto que escribió una herramienta, es engañar a la iglesia; si usas una idea o una ilustración de otro, dilo.",
      },
      { t: "versiculo", ref: "Hebreos 13:7" },
      {
        t: "parrafo",
        texto:
          "Y el fruto se ve en la vida: «Acordaos de vuestros pastores, que os hablaron la palabra de Dios; considerad cuál haya sido el resultado de su conducta, e imitad su fe».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Aparta cada semana un tiempo fijo para preparar: leer el texto, orar, estudiar y escribir. Un buen hábito es empezar el sermón del domingo el lunes o el martes, para que tenga tiempo de madurar en tu corazón.",
      },
    ],
    ideaClave:
      "El predicador sigue creciendo toda la vida: cuida de sí mismo y de la doctrina, como Pablo le pidió a Timoteo. Como Apolos, recibe con humildad la corrección, y busca consejo, porque en la multitud de consejeros se afirman los planes. Pide retroalimentación a personas de confianza, escucha sus propios mensajes con una rúbrica y mejora una cosa a la vez. Y predica con honestidad: no presenta como propio el trabajo de otros.",
    paraLaVida: {
      texto: "El púlpito se renueva en el escritorio, en la oración y en la humildad de aprender.",
      pregunta: "¿A quién podrías pedirle este mes que te diga cómo recibe tus mensajes?",
    },
  },
];
