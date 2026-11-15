/**
 * Especialidad Intercesión y oración · Materia 1 — Teología de la oración (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El Dios que oye, orar al Padre por el Hijo en el Espíritu, la oración y la voluntad de Dios, por qué orar si Dios ya
 * sabe, cuando Dios dice no o espera, y lo que estorba la oración. Lo que el ministerio enseña sobre la sanidad divina
 * queda para la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const INTERCESION_1: LeccionContenido[] = [
  {
    id: "intercesion-1-1",
    objetivos: [
      "Explicar que la oración es una relación con un Dios personal que oye.",
      "Describir la invitación de Dios a clamar a él.",
      "Valorar la confianza con que el creyente se acerca al trono de la gracia.",
    ],
    paraEmpezar: "Antes de aprender a orar mejor, hay que saber a quién se ora. La oración cristiana no es un ritual ni una fórmula: es hablar con un Dios que oye.",
    bloques: [
      { t: "versiculo", ref: "Salmos 65:2" },
      {
        t: "parrafo",
        texto: "El salmista llama a Dios por lo que hace: «Tú oyes la oración; A ti vendrá toda carne». Los ídolos tienen oídos y no oyen; el Dios vivo escucha a los suyos.",
      },
      { t: "versiculo", ref: "Jeremías 33:3" },
      {
        t: "parrafo",
        texto:
          "Dios mismo invita a orar: «Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces». Es el versículo de memoria de esta materia. La oración no empieza en nuestra necesidad, sino en la invitación de Dios.",
      },
      { t: "versiculo", ref: "Salmos 145:18" },
      {
        t: "parrafo",
        texto: "Y promete su cercanía: «Cercano está Jehová a todos los que le invocan, A todos los que le invocan de veras». Lo que Dios busca es sinceridad, no palabras perfectas.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Con confianza" },
      { t: "versiculo", ref: "Hebreos 4:16" },
      {
        t: "parrafo",
        texto:
          "Por Cristo, el creyente no se acerca con miedo: «Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia y hallar gracia para el oportuno socorro». Es un trono, porque Dios es Rey; y es de gracia, porque nos recibe por Cristo.",
      },
      {
        t: "lista",
        items: [
          "Dios es personal: oye, responde y se acerca.",
          "Dios invita: la oración es su idea antes que la nuestra.",
          "Dios es Rey: se ora con reverencia.",
          "Dios es Padre: se ora con confianza.",
          "Dios busca sinceridad: se ora de veras, no para cumplir.",
        ],
      },
    ],
    ideaClave:
      "La oración es una relación con un Dios personal que oye. Él mismo invita: clama a mí, y yo te responderé; y está cercano a los que le invocan de veras. Por Cristo nos acercamos confiadamente al trono de la gracia: con la reverencia que merece el Rey y la confianza de los hijos.",
    paraLaVida: {
      texto: "Orar no es informarle a Dios: es encontrarse con él.",
      pregunta: "¿Cómo cambiaría tu oración si recordaras cada vez que Dios te está escuchando?",
    },
  },
  {
    id: "intercesion-1-2",
    objetivos: [
      "Explicar la oración al Padre, por medio del Hijo, en el Espíritu.",
      "Describir qué significa orar en el nombre de Jesús.",
      "Reconocer la ayuda del Espíritu Santo en la oración.",
    ],
    paraEmpezar: "La oración cristiana tiene forma de Trinidad: oramos al Padre, por medio del Hijo, con la ayuda del Espíritu Santo.",
    bloques: [
      { t: "versiculo", ref: "Efesios 2:18" },
      {
        t: "parrafo",
        texto:
          "Pablo lo resume en un versículo: «porque por medio de él los unos y los otros tenemos entrada por un mismo Espíritu al Padre». La entrada es por Cristo, la ayuda es del Espíritu y el destino es el Padre.",
      },
      { t: "subtitulo", texto: "En el nombre de Jesús" },
      { t: "versiculo", ref: "Juan 16:23-24" },
      {
        t: "parrafo",
        texto:
          "Jesús prometió: «todo cuanto pidiereis al Padre en mi nombre, os lo dará», y añadió: «pedid, y recibiréis, para que vuestro gozo sea cumplido». Orar en su nombre no es repetir una frase al final como una fórmula: es orar por medio de él, confiando en su obra y pidiendo lo que él pediría.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "El Espíritu nos ayuda" },
      { t: "versiculo", ref: "Romanos 8:26-27" },
      {
        t: "parrafo",
        texto:
          "Muchas veces no sabemos qué pedir. Pablo consuela: «el Espíritu nos ayuda en nuestra debilidad», y «el Espíritu mismo intercede por nosotros», y lo hace «conforme a la voluntad de Dios». Aun cuando nos faltan las palabras, no oramos solos.",
      },
      {
        t: "nota",
        titulo: "Los dones del Espíritu en la oración",
        texto:
          "Lo que el ministerio enseña sobre la oración en lenguas y su lugar en la vida del creyente es un punto de la declaración de fe por confirmar. Esta materia se queda en lo que el texto afirma: el Espíritu nos ayuda a orar conforme a la voluntad de Dios.",
      },
      {
        t: "lista",
        items: [
          "Al Padre: a él se dirige la oración, como enseñó Jesús.",
          "Por el Hijo: él es el camino y el mediador.",
          "En el Espíritu: él nos ayuda en la debilidad.",
        ],
      },
    ],
    ideaClave:
      "Por medio de Cristo tenemos entrada por un mismo Espíritu al Padre. Orar en el nombre de Jesús es orar por medio de él, confiando en su obra y pidiendo lo que él pediría, no repetir una fórmula. Y el Espíritu nos ayuda en nuestra debilidad e intercede conforme a la voluntad de Dios.",
    paraLaVida: {
      texto: "Cuando no sabes qué decir, el Espíritu no te deja solo.",
      pregunta: "¿Usas el nombre de Jesús como una fórmula o como una confianza?",
    },
  },
  {
    id: "intercesion-1-3",
    objetivos: [
      "Explicar la relación entre la oración y la voluntad de Dios.",
      "Describir la oración de Jesús en Getsemaní.",
      "Aplicar la confianza de 1 Juan 5:14-15 a la propia oración.",
    ],
    paraEmpezar: "Una oración madura no busca que Dios haga nuestra voluntad, sino que su voluntad se haga en nosotros y en el mundo.",
    bloques: [
      { t: "versiculo", ref: "Mateo 6:9-10" },
      {
        t: "parrafo",
        texto:
          "En el Padre nuestro, Jesús pone primero a Dios: «santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra». Antes de pedir por lo nuestro, pedimos que Dios sea honrado y que su voluntad se cumpla.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 26:39" },
      {
        t: "parrafo",
        texto:
          "En Getsemaní, Jesús derramó su angustia con sinceridad: «Padre mío, si es posible, pase de mí esta copa», y se rindió: «pero no sea como yo quiero, sino como tú». Orar conforme a la voluntad de Dios no es callar lo que sentimos, sino confiar en él más que en nuestros deseos.",
      },
      { t: "versiculo", ref: "1 Juan 5:14-15" },
      {
        t: "parrafo",
        texto:
          "Juan da una gran confianza: «si pedimos alguna cosa conforme a su voluntad, él nos oye», y «sabemos que tenemos las peticiones que le hayamos hecho». Por eso el que ora busca conocer la voluntad de Dios en su Palabra.",
      },
      {
        t: "lista",
        items: [
          "Dios ya reveló mucho de su voluntad en la Biblia: la salvación de los perdidos, la santidad de los suyos, la unidad de la iglesia.",
          "Cuando la Biblia lo dice claro, se ora con plena confianza.",
          "Cuando no sabemos, oramos con sinceridad y nos rendimos: hágase tu voluntad.",
        ],
      },
    ],
    ideaClave:
      "La oración pone primero a Dios: santificado sea tu nombre, venga tu reino, hágase tu voluntad. Jesús en Getsemaní derramó su angustia y se rindió: no sea como yo quiero, sino como tú. Si pedimos conforme a su voluntad, él nos oye; por eso el que ora busca esa voluntad en la Palabra.",
    paraLaVida: {
      texto: "Hágase tu voluntad es la oración más difícil y la más segura.",
      pregunta: "¿En qué petición tuya necesitas decir hoy: no sea como yo quiero, sino como tú?",
    },
  },
  {
    id: "intercesion-1-4",
    objetivos: [
      "Responder a la pregunta de por qué orar si Dios ya sabe lo que necesitamos.",
      "Explicar la oración como un medio que Dios mismo estableció.",
      "Distinguir pedir bien de pedir mal.",
    ],
    paraEmpezar: "Si Dios ya sabe lo que necesitamos, ¿para qué orar? Es una pregunta honesta, y la Biblia la responde.",
    bloques: [
      { t: "versiculo", ref: "Mateo 6:7-8" },
      {
        t: "parrafo",
        texto:
          "Jesús lo dijo claro: «vuestro Padre sabe de qué cosas tenéis necesidad, antes que vosotros le pidáis». Por eso no hacen falta «vanas repeticiones», como si Dios se convenciera por la cantidad de palabras. Y sin embargo, en los versículos siguientes, Jesús enseña a orar.",
      },
      { t: "versiculo", ref: "Santiago 4:2-3" },
      {
        t: "parrafo",
        texto:
          "Santiago muestra que la oración cambia las cosas: «no tenéis lo que deseáis, porque no pedís». Dios decidió obrar por medio de la oración de su pueblo. Pero también advierte: «Pedís, y no recibís, porque pedís mal, para gastar en vuestros deleites».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Lucas 11:9-10" },
      {
        t: "parrafo",
        texto: "Jesús anima a perseverar: «Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá». Pedir, buscar y llamar hablan de una oración insistente y confiada.",
      },
      {
        t: "lista",
        items: [
          "Dios estableció la oración como un medio para obrar: no tenemos porque no pedimos.",
          "La oración nos cambia a nosotros: nos hace depender de Dios y conocerlo.",
          "La oración nos une a la obra de Dios en el mundo.",
          "Pedir bien es pedir para la gloria de Dios y el bien de otros, no solo para los propios deleites.",
        ],
      },
    ],
    ideaClave:
      "Dios ya sabe lo que necesitamos, y por eso no hacen falta vanas repeticiones; pero él mismo estableció la oración como medio para obrar: no tenemos porque no pedimos. La oración también nos cambia y nos une a su obra. Se pide con insistencia y confianza, y se pide bien: para la gloria de Dios y no solo para los propios deleites.",
    paraLaVida: {
      texto: "La oración no informa a Dios: lo honra y nos transforma.",
      pregunta: "¿Qué cosa no has recibido porque, en verdad, nunca la pediste?",
    },
  },
  {
    id: "intercesion-1-5",
    objetivos: [
      "Explicar las respuestas de Dios cuando dice no o cuando dice espera.",
      "Describir la experiencia de Pablo con el aguijón en la carne.",
      "Valorar la perseverancia en la oración.",
    ],
    paraEmpezar: "Todo creyente ha orado por algo que no llegó, o que tardó mucho. ¿Significa que Dios no oyó?",
    bloques: [
      { t: "subtitulo", texto: "Cuando Dios dice no" },
      { t: "versiculo", ref: "2 Corintios 12:8-9" },
      {
        t: "parrafo",
        texto:
          "Pablo tuvo un aguijón en la carne y oró: «tres veces he rogado al Señor, que lo quite de mí». La respuesta fue otra: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad». Dios oyó, pero respondió con algo mejor que lo que Pablo pedía.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Cuando Dios dice espera" },
      { t: "versiculo", ref: "Habacuc 2:3" },
      {
        t: "parrafo",
        texto:
          "A Habacuc, que esperaba una respuesta, Dios le dijo: «aunque tardare, espéralo, porque sin duda vendrá, no tardará». Los tiempos de Dios no son los nuestros, pero él cumple.",
      },
      { t: "versiculo", ref: "Lucas 18:1" },
      {
        t: "parrafo",
        texto: "Por eso Jesús enseñó una parábola «sobre la necesidad de orar siempre, y no desmayar». Perseverar en la oración no es presionar a Dios: es seguir confiando en él.",
      },
      {
        t: "nota",
        titulo: "La oración por los enfermos",
        texto:
          "La Biblia manda orar por los enfermos, y Dios sana. Lo que el ministerio enseña sobre la sanidad divina, como la sanidad en la expiación, es un punto de la declaración de fe por confirmar. Esta lección afirma lo que todos los textos enseñan: Dios oye siempre, y su gracia basta también cuando la respuesta no es la que esperábamos.",
      },
      {
        t: "lista",
        items: [
          "Sí: Dios concede lo que pedimos.",
          "No: Dios da algo mejor, como su gracia en la debilidad.",
          "Espera: Dios cumple a su tiempo.",
          "En todos los casos, Dios oyó.",
        ],
      },
    ],
    ideaClave:
      "Dios oye siempre, pero no siempre responde como pedimos. A Pablo le dijo: bástate mi gracia, porque mi poder se perfecciona en la debilidad; a Habacuc: aunque tardare, espéralo. Por eso hay que orar siempre y no desmayar, confiando en que Dios responde sí, no o espera, siempre para nuestro bien.",
    paraLaVida: {
      texto: "Un no de Dios también es una respuesta de amor.",
      pregunta: "¿Qué oración que no fue respondida como esperabas necesitas poner hoy en las manos de Dios?",
    },
  },
  {
    id: "intercesion-1-6",
    objetivos: [
      "Reconocer lo que estorba la oración según la Biblia.",
      "Explicar la relación entre el pecado, el perdón y la oración.",
      "Aplicar la fe y la reconciliación a la vida de oración.",
    ],
    paraEmpezar: "Dios oye la oración, pero la Biblia también habla de cosas que la estorban. Conocerlas ayuda a orar con un corazón limpio.",
    bloques: [
      { t: "versiculo", ref: "Isaías 59:1-2" },
      {
        t: "parrafo",
        texto:
          "El problema nunca es Dios: «no se ha acortado la mano de Jehová para salvar, ni se ha agravado su oído para oír». El problema es otro: «vuestras iniquidades han hecho división entre vosotros y vuestro Dios».",
      },
      { t: "versiculo", ref: "Salmos 66:18" },
      {
        t: "parrafo",
        texto: "El salmista lo reconoce: «Si en mi corazón hubiese yo mirado a la iniquidad, El Señor no me habría escuchado». El pecado que se guarda y no se confiesa enfría la oración.",
      },
      { t: "versiculo", ref: "Marcos 11:24-25" },
      {
        t: "parrafo",
        texto:
          "Jesús une la fe y el perdón: «todo lo que pidiereis orando, creed que lo recibiréis», y en seguida: «cuando estéis orando, perdonad, si tenéis algo contra alguno». No se puede pedir perdón a Dios guardando rencor contra otro.",
      },
      { t: "versiculo", ref: "Santiago 1:6-7" },
      {
        t: "parrafo",
        texto: "Santiago pide orar «con fe, no dudando nada», porque el que duda es como «la onda del mar, que es arrastrada por el viento».",
      },
      { t: "versiculo", ref: "1 Pedro 3:7" },
      {
        t: "parrafo",
        texto: "Pedro habla aun del hogar: los maridos deben vivir sabiamente con su esposa, honrándola, «para que vuestras oraciones no tengan estorbo». La manera de tratar a la familia afecta la vida de oración.",
      },
      {
        t: "lista",
        items: [
          "El pecado que no se confiesa.",
          "El rencor y la falta de perdón.",
          "La duda y la falta de fe.",
          "Las malas relaciones en el hogar.",
          "Pedir solo para los propios deleites.",
        ],
      },
    ],
    ideaClave:
      "Dios puede oír y salvar; lo que estorba la oración está en nosotros: el pecado que se guarda, el rencor que no perdona, la duda, las malas relaciones en el hogar y las peticiones egoístas. Por eso el que ora confiesa su pecado, perdona, pide con fe y cuida a su familia.",
    paraLaVida: {
      texto: "A veces lo primero que hay que hacer para orar es perdonar.",
      pregunta: "¿Hay algo que necesitas confesar o alguien a quien necesitas perdonar antes de seguir orando?",
    },
  },
];
