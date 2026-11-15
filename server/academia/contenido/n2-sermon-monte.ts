/**
 * Nivel 2 · Materia 5 — El Sermón del monte (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * El Sermón se enseña como el retrato de la vida en el reino, no como un camino para ganar la salvación. Donde la
 * enseñanza toca el abuso o la violencia (Mateo 5:38-39), se aclara que Jesús prohíbe la venganza, no la justicia ni la
 * protección (Romanos 12:19; 13:4).
 * Referencias: John R. W. Stott, «El Sermón del Monte»; D. Martyn Lloyd-Jones, «El Sermón del Monte» (Banner of Truth);
 * la serie «El Sermón del Monte» de Proyecto Biblia.
 */
import type { LeccionContenido } from "../tipos";

export const N2_SERMON_MONTE: LeccionContenido[] = [
  {
    id: "n2-sermon-monte-1",
    objetivos: [
      "Ubicar el Sermón del monte en el Evangelio de Mateo y en el anuncio del reino.",
      "Describir las partes del Sermón del monte.",
      "Explicar para quién es el Sermón y por qué no es un camino para ganar la salvación.",
    ],
    paraEmpezar:
      "Mateo 5 a 7 reúne la enseñanza más conocida de Jesús. Muchos la admiran, aun sin ser creyentes, pero Jesús no la dio para que la admiremos: la dio para que sus discípulos la vivan.",
    bloques: [
      { t: "subtitulo", texto: "El reino de los cielos se ha acercado" },
      { t: "versiculo", ref: "Mateo 4:17" },
      {
        t: "parrafo",
        texto:
          "Jesús comenzó a predicar diciendo: «Arrepentíos, porque el reino de los cielos se ha acercado». El reino es el gobierno de Dios que llega con Jesús, el Rey. Mateo cuenta que recorría Galilea enseñando, predicando el evangelio del reino y sanando toda enfermedad (Mateo 4:23). El Sermón del monte describe cómo es la vida de quienes entran en ese reino.",
      },
      { t: "subtitulo", texto: "Jesús se sienta a enseñar" },
      { t: "versiculo", ref: "Mateo 5:1-2" },
      {
        t: "parrafo",
        texto:
          "Al ver la multitud, Jesús «subió al monte; y sentándose, vinieron a él sus discípulos». Los maestros de Israel enseñaban sentados. Así como la ley se dio en el monte Sinaí, Jesús, el Hijo de Dios, enseña desde el monte la voluntad de Dios con su propia autoridad.",
      },
      { t: "subtitulo", texto: "Las partes del Sermón" },
      {
        t: "lista",
        items: [
          "El carácter del discípulo: las bienaventuranzas, la sal y la luz (5:3-16).",
          "Una justicia mayor: Jesús cumple la ley y la lleva al corazón (5:17-48).",
          "La piedad delante del Padre: dar, orar y ayunar en lo secreto (6:1-18).",
          "El tesoro y la confianza: Dios o las riquezas, y no afanarse (6:19-34).",
          "Las relaciones y la gran decisión: no juzgar, pedir, la regla de oro y los dos caminos (7:1-27).",
        ],
      },
      {
        t: "nota",
        titulo: "No es un camino para ganarse el cielo",
        texto:
          "El Sermón del monte no enseña a ganar la salvación con buenas obras. Jesús habla a sus discípulos: describe la vida nueva de quienes ya lo siguen, una vida que solo es posible por su gracia y por el poder del Espíritu Santo.",
      },
      { t: "versiculo", ref: "Mateo 7:28-29" },
      {
        t: "parrafo",
        texto:
          "Al terminar, la gente se admiraba, porque Jesús les enseñaba «como quien tiene autoridad, y no como los escribas». No citaba a otros maestros: hablaba como el Rey que tiene derecho a decir cómo se vive en su reino.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/introduccion-al-sermon-el-monte/", titulo: "Introducción al sermón del monte", fuente: "Proyecto Biblia", minutos: 6 },
    ],
    ideaClave:
      "El Sermón del monte (Mateo 5 a 7) es la enseñanza del Rey sobre la vida en su reino: no es un camino para ganar la salvación, sino el retrato del discípulo que vive por la gracia de Dios, y Jesús lo enseña con autoridad propia.",
    paraLaVida: {
      texto: "Jesús no busca admiradores, sino discípulos.",
      pregunta: "¿Qué parte del Sermón del monte te cuesta más vivir hoy?",
    },
  },
  {
    id: "n2-sermon-monte-2",
    objetivos: [
      "Explicar qué significa ser bienaventurado según Jesús.",
      "Describir las bienaventuranzas y sus promesas.",
      "Reconocer cómo el reino de Dios da vuelta a los valores del mundo.",
    ],
    paraEmpezar:
      "El mundo llama felices a los ricos, a los fuertes y a los famosos. Jesús empieza su sermón llamando dichosos a otros: a los pobres en espíritu, a los que lloran, a los mansos. Son las bienaventuranzas.",
    bloques: [
      { t: "versiculo", ref: "Mateo 5:3-6" },
      {
        t: "parrafo",
        texto:
          "Bienaventurado quiere decir dichoso, feliz por la aprobación de Dios. No es un sentimiento pasajero: es el veredicto de Dios sobre quien vive en su reino. Cada bienaventuranza describe un rasgo del discípulo y termina con una promesa.",
      },
      { t: "subtitulo", texto: "El retrato del discípulo" },
      {
        t: "lista",
        items: [
          "Los pobres en espíritu reconocen que no tienen nada que ofrecer a Dios y dependen de su gracia: «de ellos es el reino de los cielos».",
          "Los que lloran se duelen por su pecado y por el dolor del mundo, y Dios los consuela.",
          "Los mansos no son débiles: tienen la fuerza bajo el control de Dios y no se imponen por la fuerza.",
          "Los que tienen hambre y sed de justicia anhelan vivir como Dios manda y ver su justicia en el mundo: «ellos serán saciados».",
        ],
      },
      { t: "versiculo", ref: "Mateo 5:7-12" },
      {
        t: "lista",
        items: [
          "Los misericordiosos perdonan y ayudan, porque han recibido misericordia.",
          "Los de limpio corazón aman a Dios con sinceridad, sin doblez: «ellos verán a Dios».",
          "Los pacificadores buscan la reconciliación entre las personas y con Dios: «serán llamados hijos de Dios».",
          "Los perseguidos por causa de la justicia no deben sorprenderse: así persiguieron a los profetas, y su galardón es grande en los cielos.",
        ],
      },
      {
        t: "nota",
        titulo: "Al revés del mundo",
        texto:
          "Las bienaventuranzas no son grupos de personas distintas: son rasgos de cada discípulo. El reino de Dios da vuelta a los valores del mundo: los que el mundo desprecia son los que Dios llama dichosos.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/las-bienaventuranzas/", titulo: "Las Bienaventuranzas", fuente: "Proyecto Biblia", minutos: 7 },
    ],
    ideaClave:
      "Las bienaventuranzas describen el carácter del discípulo: depende de Dios, se quebranta por el pecado, es manso, tiene hambre de justicia, es misericordioso, sincero, pacificador y firme en la persecución; Dios llama dichosos a quienes viven así.",
    paraLaVida: {
      texto: "La dicha que Jesús promete no depende de las circunstancias, sino de pertenecer a su reino.",
      pregunta: "¿Cuál de las bienaventuranzas necesitas pedirle a Dios que forme en ti esta semana?",
    },
  },
  {
    id: "n2-sermon-monte-3",
    objetivos: [
      "Explicar qué significa ser sal de la tierra y luz del mundo.",
      "Explicar cómo Jesús cumple la ley y los profetas.",
      "Describir la justicia mayor que pide Jesús.",
    ],
    paraEmpezar:
      "Después de describir el carácter del discípulo, Jesús habla de su influencia. Un discípulo no vive escondido: su vida se nota, como la sal en la comida y la luz en la noche.",
    bloques: [
      { t: "subtitulo", texto: "Sal de la tierra y luz del mundo" },
      { t: "versiculo", ref: "Mateo 5:13-16" },
      {
        t: "parrafo",
        texto:
          "La sal da sabor y preserva de la corrupción; la luz disipa las tinieblas y muestra el camino. Jesús no manda a sus discípulos a ser sal y luz: dice que ya lo son. «Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder».",
      },
      {
        t: "parrafo",
        texto:
          "La luz no se enciende para esconderla debajo de un almud. Las buenas obras del discípulo apuntan a Dios: «para que vean vuestras buenas obras, y glorifiquen a vuestro Padre».",
      },
      { t: "subtitulo", texto: "Jesús cumple la ley" },
      { t: "versiculo", ref: "Mateo 5:17-20" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «no he venido para abrogar, sino para cumplir». Él cumple la ley y los profetas: obedece perfectamente la voluntad de Dios, cumple las promesas y las figuras del Antiguo Testamento y muestra el verdadero sentido de los mandamientos.",
      },
      {
        t: "nota",
        titulo: "Una justicia mayor",
        texto:
          "Los escribas y fariseos cuidaban las reglas por fuera. Jesús pide una justicia mayor: no más reglas, sino un corazón cambiado. Esa justicia empieza cuando Dios nos declara justos por la fe en Cristo y sigue cuando su Espíritu escribe su ley en el corazón (Jeremías 31:33; Romanos 8:4).",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/jesus-cumple-la-ley/", titulo: "Jesús cumple la ley", fuente: "Proyecto Biblia", minutos: 7 },
    ],
    ideaClave:
      "Los discípulos son la sal de la tierra y la luz del mundo, y sus buenas obras glorifican al Padre; Jesús no vino a abrogar la ley sino a cumplirla, y pide una justicia mayor que nace de un corazón transformado por su gracia.",
    paraLaVida: {
      texto: "La luz no hace ruido: simplemente alumbra.",
      pregunta: "¿Dónde quiere Dios que tu vida sea sal y luz esta semana: en tu casa, en tu trabajo o en tu escuela?",
    },
  },
  {
    id: "n2-sermon-monte-4",
    objetivos: [
      "Explicar la frase de Jesús «Pero yo os digo» y su autoridad.",
      "Describir cómo Jesús lleva los mandamientos al corazón: la ira, la pureza, la palabra y la venganza.",
      "Aplicar el mandamiento de amar a los enemigos.",
    ],
    paraEmpezar:
      "Seis veces Jesús cita lo que «fue dicho», y seis veces responde con autoridad propia. No anula la ley: va a su raíz, al corazón, donde nacen el pecado y la obediencia.",
    bloques: [
      { t: "subtitulo", texto: "La ira y la reconciliación" },
      { t: "versiculo", ref: "Mateo 5:21-24" },
      {
        t: "parrafo",
        texto:
          "La ley decía «No matarás», pero Jesús enseña que el enojo y el desprecio ya son culpables delante de Dios. Por eso, antes de presentar una ofrenda, hay que ir y reconciliarse: «reconcíliate primero con tu hermano».",
      },
      { t: "subtitulo", texto: "La pureza del corazón" },
      { t: "versiculo", ref: "Mateo 5:27-28" },
      {
        t: "parrafo",
        texto:
          "El adulterio no empieza en el acto, sino en la mirada y en el deseo. Jesús llama a cuidar los ojos y el corazón, y a cortar con firmeza lo que nos lleva a pecar (Mateo 5:29-30). Sobre el divorcio, Jesús defiende el pacto del matrimonio (Mateo 5:31-32); la materia Familia y relaciones lo estudia con más detalle.",
      },
      { t: "subtitulo", texto: "La palabra y la venganza" },
      { t: "versiculo", ref: "Mateo 5:37" },
      {
        t: "parrafo",
        texto:
          "El discípulo no necesita juramentos para que le crean: su palabra es verdad. Y frente al mal, Jesús enseña a no devolver golpe por golpe. La ley del «Ojo por ojo, y diente por diente» ponía un límite al castigo que daban los jueces; no autorizaba la venganza personal.",
      },
      { t: "versiculo", ref: "Mateo 5:38-39" },
      {
        t: "nota",
        titulo: "Poner la otra mejilla no es quedarse en el abuso",
        texto:
          "Jesús prohíbe la venganza personal, no la justicia. Dios dio autoridades para castigar el mal (Romanos 13:4), y quien sufre violencia o abuso puede y debe buscar protección. Lo que Jesús nos quita es el deseo de vengarnos: dejamos el juicio en manos de Dios (Romanos 12:19).",
      },
      { t: "subtitulo", texto: "Amar a los enemigos" },
      { t: "versiculo", ref: "Mateo 5:43-48" },
      {
        t: "parrafo",
        texto:
          "Jesús manda: «Amad a vuestros enemigos, bendecid a los que os maldicen». Así somos como nuestro Padre, que hace salir su sol sobre malos y buenos. Ser perfectos, como el Padre es perfecto, es amar de forma completa, también a quien no lo merece.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/los-juramentos-las-represalias-y-el-amor-a-los-enemigos/", titulo: "Los juramentos, las represalias y el amor a los enemigos", fuente: "Proyecto Biblia", minutos: 9 },
    ],
    ideaClave:
      "Jesús lleva los mandamientos al corazón: el enojo, la mirada impura, la palabra falsa y la venganza ya son pecado delante de Dios; el discípulo se reconcilia, cuida su corazón, dice la verdad, no se venga y ama aun a sus enemigos, como el Padre.",
    paraLaVida: {
      texto: "La reconciliación no puede esperar hasta después del culto.",
      pregunta: "¿Con quién necesitas reconciliarte, o por quién que te hizo daño necesitas empezar a orar?",
    },
  },
  {
    id: "n2-sermon-monte-5",
    objetivos: [
      "Explicar la advertencia de Jesús contra la piedad para ser vistos.",
      "Describir lo que enseña Jesús sobre el tesoro, el corazón y las riquezas.",
      "Aplicar la enseñanza de Jesús sobre la ansiedad y buscar primero el reino de Dios.",
    ],
    paraEmpezar:
      "Se puede hacer algo bueno por una razón equivocada. Jesús examina el motivo de nuestra piedad y el lugar de nuestro tesoro, porque ahí se ve a quién servimos de verdad.",
    bloques: [
      { t: "subtitulo", texto: "Para ser vistos o para el Padre" },
      { t: "versiculo", ref: "Mateo 6:1-4" },
      {
        t: "parrafo",
        texto:
          "Jesús advierte: «Guardaos de hacer vuestra justicia delante de los hombres, para ser vistos de ellos». Dar, orar y ayunar son buenos (los estudiaste en Disciplinas espirituales), pero pierden su recompensa si se hacen para el aplauso. El Padre «que ve en lo secreto» es quien recompensa.",
      },
      {
        t: "parrafo",
        texto:
          "En el centro del sermón, Jesús enseña el Padre Nuestro (Mateo 6:9-13): la oración que pone primero el nombre, el reino y la voluntad de Dios, y después nuestras necesidades.",
      },
      { t: "subtitulo", texto: "Donde está tu tesoro" },
      { t: "versiculo", ref: "Mateo 6:19-21" },
      {
        t: "parrafo",
        texto:
          "Lo que atesoramos revela lo que amamos: «donde esté vuestro tesoro, allí estará también vuestro corazón». Los tesoros de la tierra se pierden; los del cielo, como la generosidad, la fidelidad y las personas que ganamos para Cristo, permanecen.",
      },
      { t: "versiculo", ref: "Mateo 6:24" },
      {
        t: "nota",
        titulo: "Dos señores",
        texto:
          "Nadie puede servir a Dios y a las riquezas. El dinero es un buen siervo, pero un amo cruel: el discípulo lo usa para servir a Dios y al prójimo, y no vive para él.",
      },
      { t: "subtitulo", texto: "No os afanéis" },
      { t: "versiculo", ref: "Mateo 6:31-34" },
      {
        t: "parrafo",
        texto:
          "Jesús invita a mirar las aves del cielo y los lirios del campo (Mateo 6:26-30): si el Padre los cuida, cuánto más a sus hijos. La ansiedad se vence con confianza y con prioridades nuevas: «buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas».",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/las-riquezas-y-las-preocupaciones/", titulo: "Las riquezas y las preocupaciones", fuente: "Proyecto Biblia", minutos: 8 },
    ],
    ideaClave:
      "Jesús pide una piedad sincera, delante del Padre y no para ser vistos; un corazón cuyo tesoro está en el cielo, que sirve a Dios y no a las riquezas; y una confianza que vence la ansiedad buscando primero el reino de Dios.",
    paraLaVida: {
      texto: "Tu agenda y tu cuenta del banco cuentan dónde está tu corazón.",
      pregunta: "¿Qué preocupación vas a entregar hoy al Padre, y qué paso darás para buscar primero su reino?",
    },
  },
  {
    id: "n2-sermon-monte-6",
    objetivos: [
      "Distinguir entre juzgar con hipocresía y discernir con humildad.",
      "Explicar la promesa de pedir, buscar y llamar, y la regla de oro.",
      "Describir los dos caminos y los dos cimientos con que termina el Sermón.",
    ],
    paraEmpezar:
      "Jesús termina su sermón con una decisión. No basta con oír palabras hermosas: hay dos puertas, dos caminos, dos árboles y dos casas, y cada oyente escoge sobre qué edificar.",
    bloques: [
      { t: "subtitulo", texto: "No juzguéis" },
      { t: "versiculo", ref: "Mateo 7:1-5" },
      {
        t: "parrafo",
        texto:
          "Jesús prohíbe el juicio hipócrita, que mira «la paja que está en el ojo de tu hermano» y no ve la viga en el propio. No prohíbe el discernimiento: el mismo capítulo pide reconocer a los falsos profetas por sus frutos (Mateo 7:15-20). El orden es claro: primero examinarme yo, y después ayudar a mi hermano con humildad.",
      },
      { t: "subtitulo", texto: "Pedid, buscad, llamad" },
      { t: "versiculo", ref: "Mateo 7:7-12" },
      {
        t: "parrafo",
        texto:
          "El Padre celestial es mejor que el mejor padre de la tierra: «¿cuánto más vuestro Padre que está en los cielos dará buenas cosas a los que le pidan?». De esa bondad nace la regla de oro: tratar a los demás como queremos ser tratados, porque «esto es la ley y los profetas».",
      },
      { t: "subtitulo", texto: "Dos caminos, dos árboles, dos casas" },
      { t: "versiculo", ref: "Mateo 7:13-14" },
      {
        t: "lista",
        items: [
          "Dos puertas y dos caminos: el ancho, que lleva a la perdición, y el angosto, que lleva a la vida (7:13-14).",
          "Dos árboles: el bueno da buenos frutos y el malo, malos; por sus frutos se conoce a los falsos profetas (7:15-20).",
          "Dos confesiones: no basta con decir Señor, Señor; entra el que hace la voluntad del Padre (7:21-23).",
          "Dos constructores: uno edifica sobre la roca y otro sobre la arena (7:24-27).",
        ],
      },
      { t: "versiculo", ref: "Mateo 7:24-27" },
      {
        t: "parrafo",
        texto:
          "Las dos casas se ven iguales en días de sol; la diferencia aparece en la tormenta. El prudente es el que oye las palabras de Jesús «y las hace»; el insensato también oye, pero no obedece. Edificar sobre la roca es poner por obra lo que Jesús enseña, confiando en Él.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/la-decision/", titulo: "La decisión", fuente: "Proyecto Biblia", minutos: 8 },
    ],
    ideaClave:
      "Jesús prohíbe el juicio hipócrita, promete que el Padre da buenas cosas a quienes le piden, resume la ley en la regla de oro y termina con una decisión: entrar por la puerta estrecha y edificar la vida sobre la roca, oyendo y haciendo sus palabras.",
    paraLaVida: {
      texto: "Las tormentas no deciden si la casa cae: lo decide el cimiento.",
      pregunta: "¿Qué enseñanza del Sermón del monte pondrás por obra esta semana para edificar sobre la roca?",
    },
  },
];
