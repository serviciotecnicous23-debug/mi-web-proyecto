/**
 * Especialidad Estudios bíblicos avanzados · Materia 1 — Romanos: su teología y su historia (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia avanzada que no repite la Exégesis de un libro: Romanos (Nivel 5), que recorre la carta por secciones: aquí
 * se estudian la ocasión de la carta, su tema, las palabras de la salvación, la carta en la historia de la iglesia
 * (Agustín, Lutero, Wesley y Barth), los grandes debates (la nueva perspectiva sobre Pablo, Romanos 7 e Israel) y la carta
 * en la iglesia de hoy, con tres esquemas. La postura del ministerio sobre la elección y la perseverancia queda para su
 * declaración de fe.
 */
import type { LeccionContenido } from "../tipos";

export const BIBLICOS_AVANZADOS_1: LeccionContenido[] = [
  {
    id: "biblicos-avanzados-1-1",
    objetivos: [
      "Explicar quién escribió Romanos, a quiénes, desde dónde y hacia cuándo.",
      "Describir la iglesia de Roma, con judíos y gentiles, y lo que vivió con la expulsión de los judíos bajo Claudio.",
      "Explicar los propósitos de la carta según Romanos 1 y 15.",
    ],
    paraEmpezar:
      "Antes de estudiar lo que dice Romanos conviene saber por qué se escribió. Pablo no conocía en persona a la iglesia de Roma, pero quería visitarla camino a España. Era una iglesia de judíos y gentiles que había pasado tiempos difíciles, y la carta los llama a todos a la misma fe y a recibirse unos a otros.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=Ck4eA4DKBHQ", titulo: "Cartas del Nuevo Testamento: contexto literario", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Romanos 1:7" },
      {
        t: "parrafo",
        texto:
          "Pablo escribe «a todos los que estáis en Roma, amados de Dios, llamados a ser santos». No conocía en persona a la mayoría, pero los saluda como amados de Dios.",
      },
      { t: "versiculo", ref: "Romanos 15:23-24" },
      {
        t: "parrafo",
        texto:
          "Pablo ya había predicado desde Jerusalén hasta el Ilírico (Romanos 15:19) y no tenía más campo en esas regiones. Su plan era claro: «cuando vaya a España, iré a vosotros».",
      },
      { t: "versiculo", ref: "Romanos 16:1-2" },
      {
        t: "parrafo",
        texto:
          "«Os recomiendo además nuestra hermana Febe, la cual es diaconisa de la iglesia en Cencrea», el puerto de Corinto. Muchos estudiosos piensan que ella llevó la carta a Roma.",
      },
      { t: "subtitulo", texto: "La carta en su tiempo" },
      {
        t: "lista",
        items: [
          "Quién: Pablo, con Tercio, que la escribió a mano (Romanos 1:1; 16:22).",
          "Desde dónde: casi seguro desde Corinto, donde lo hospedaba Gayo (Romanos 16:23; 1 Corintios 1:14).",
          "Cuándo: hacia el año 57 (los estudiosos dan entre el 55 y el 58), al final de su tercer viaje y antes de llevar la ofrenda a Jerusalén (Romanos 15:25-26; Hechos 20:2-3).",
          "A quiénes: una iglesia de judíos y gentiles en la capital del imperio, que Pablo no había fundado; quizá empezó con los romanos que estaban en Jerusalén el día de Pentecostés (Hechos 2:10).",
          "Lo que vivieron: el historiador romano Suetonio cuenta que el emperador Claudio expulsó de Roma a los judíos por unos alborotos en torno a un tal Cresto, que muchos identifican con Cristo; la fecha más citada es el año 49. Entre los que salieron estaban Aquila y Priscila (Hechos 18:2), que cuando Pablo escribe ya han vuelto a Roma (Romanos 16:3).",
        ],
      },
      { t: "subtitulo", texto: "Los propósitos de la carta" },
      {
        t: "lista",
        items: [
          "Preparar su visita y pedir apoyo para llevar el evangelio a España (Romanos 15:24).",
          "Presentar con orden el evangelio que predicaba (Romanos 1:15-17).",
          "Unir a los creyentes judíos y gentiles en una misma fe y una misma alabanza (Romanos 15:7-9).",
          "Pedir oración por la ofrenda que llevaba a los pobres de Jerusalén (Romanos 15:25-31).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un tratado y una carta" },
      {
        t: "lista",
        items: [
          "Un tratado se escribe para cualquiera; Romanos se escribió a una iglesia concreta, con nombres y problemas (Romanos 16:3-16).",
          "Un tratado no tiene planes de viaje; Romanos sí, y explica por qué Pablo no había ido antes (Romanos 15:22-29).",
          "Por eso Romanos se entiende mejor cuando se conoce su situación: judíos y gentiles que debían recibirse unos a otros en Cristo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: presentar la ocasión de Romanos en cinco minutos" },
      {
        t: "lista",
        items: [
          "Paso 1, ubicar a Pablo: al final de su tercer viaje, en Corinto, antes de ir a Jerusalén.",
          "Paso 2, mostrar en un mapa Corinto, Roma, Jerusalén y España.",
          "Paso 3, contar lo que vivió la iglesia: la salida de los judíos de Roma y su regreso.",
          "Paso 4, leer juntos Romanos 15:23-24 y 16:1-2.",
          "Paso 5, decir el propósito en una frase: el evangelio une a judíos y gentiles en Cristo y debe llegar hasta España.",
          "Paso 6, preguntar al grupo qué divide hoy a los creyentes y cómo los une el evangelio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Las fechas de la vida de Pablo son aproximadas: los estudiosos dan un margen de uno o dos años. Dilo así, sin inventar una precisión que nadie tiene.",
      },
    ],
    ideaClave:
      "Pablo escribió Romanos casi seguro desde Corinto, al final de su tercer viaje, a una iglesia de judíos y gentiles que no había fundado (Romanos 1:7). Quería visitarlos camino a España (Romanos 15:24), presentarles con orden el evangelio, unirlos en una misma fe y pedir oración por la ofrenda para Jerusalén. Febe, diaconisa de Cencrea, probablemente llevó la carta (Romanos 16:1-2).",
    paraLaVida: {
      texto: "Leo Romanos como una carta a hermanos reales, que también me habla a mí.",
      pregunta: "¿Qué divisiones hay hoy entre los creyentes de tu ciudad que el evangelio de Romanos podría sanar?",
    },
  },
  {
    id: "biblicos-avanzados-1-2",
    objetivos: [
      "Explicar, con Romanos 1:17 y Habacuc 2:4, qué es la justicia de Dios que revela el evangelio.",
      "Distinguir las tres maneras en que se entiende la justicia de Dios en Romanos.",
      "Mostrar cómo la cruz une la justicia y la gracia de Dios (Romanos 3:21-26).",
    ],
    paraEmpezar:
      "Romanos tiene un tema que atraviesa toda la carta: en el evangelio se revela la justicia de Dios. Para muchos esa frase suena a castigo, y para Martín Lutero fue primero motivo de temor. Pero Pablo la presenta como la mejor noticia: el Dios justo actúa para salvar y declara justo al que cree.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Romanos 1:17" },
      {
        t: "parrafo",
        texto:
          "El tema de la carta en una frase: «en el evangelio la justicia de Dios se revela por fe y para fe». Pablo lo apoya en el profeta: «Mas el justo por la fe vivirá».",
      },
      { t: "versiculo", ref: "Habacuc 2:4" },
      {
        t: "parrafo",
        texto:
          "Habacuc vivió cuando Babilonia amenazaba a Judá. Dios le respondió que el soberbio no permanecería, «mas el justo por su fe vivirá»: el que confía en Dios tiene vida aunque todo tiemble. Pablo usa esa palabra para mostrar que la vida viene por la fe, no por las obras.",
      },
      { t: "versiculo", ref: "Romanos 3:21-22" },
      {
        t: "parrafo",
        texto:
          "«Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios». No es una justicia que el hombre fabrica cumpliendo la ley, sino la que viene «por medio de la fe en Jesucristo, para todos los que creen en él».",
      },
      { t: "subtitulo", texto: "Tres maneras de entender la justicia de Dios" },
      {
        t: "lista",
        items: [
          "Lo que Dios es: Dios es justo, siempre hace lo recto y no pasa por alto el pecado (Romanos 3:26).",
          "Lo que Dios da: la justicia que Dios regala al que cree, por la que es declarado justo (Romanos 5:17; Filipenses 3:9).",
          "Lo que Dios hace: su acción fiel para salvar a su pueblo y cumplir sus promesas, como anunció Isaías (Isaías 46:13).",
          "Muchos maestros ven las tres juntas en Romanos: el Dios justo actúa para salvar y regala su justicia al que cree.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la justicia propia y la justicia de Dios" },
      {
        t: "lista",
        items: [
          "La justicia propia se gana cumpliendo; la de Dios se recibe creyendo (Romanos 3:22).",
          "La propia deja al hombre orgulloso o desesperado; la de Dios lo deja en paz y agradecido (Romanos 5:1).",
          "La propia es para los que creen que la alcanzan; la de Dios es para todos los que creen, judíos y gentiles (Romanos 3:22-23).",
          "La propia termina en jactancia; la de Dios la excluye, porque todo es por gracia (Romanos 3:27).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: explicar Romanos 1:17 a un nuevo creyente" },
      {
        t: "lista",
        items: [
          "Paso 1, leer el versículo en su lugar: Pablo acaba de decir que no se avergüenza del evangelio, porque es poder de Dios para salvación (Romanos 1:16).",
          "Paso 2, buscar de dónde viene la cita: el justo por la fe vivirá es una palabra del profeta Habacuc (Habacuc 2:4).",
          "Paso 3, ver qué necesita el hombre: Romanos 1:18 a 3:20 muestra que todos pecaron, judíos y gentiles.",
          "Paso 4, ver qué da Dios: su justicia, por la fe en Jesucristo, aparte de la ley (Romanos 3:21-22).",
          "Paso 5, decirlo con palabras sencillas: Dios, que es justo, nos declara justos cuando confiamos en Jesús, y así tenemos vida.",
          "Paso 6, invitar a la respuesta: creer en Cristo y vivir cada día confiando en él.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No reduzcas la justicia de Dios a un castigo. En Romanos es, sobre todo, la buena noticia de que el Dios justo salva al que cree sin dejar de ser justo: él es el justo y el que justifica (Romanos 3:26).",
      },
    ],
    ideaClave:
      "El tema de Romanos es que en el evangelio se revela la justicia de Dios por la fe (Romanos 1:17), como anunció Habacuc 2:4. Es lo que Dios es, lo que da y lo que hace: el Dios justo actúa para salvar y declara justo al que cree en Jesucristo, judío o gentil, aparte de la ley (Romanos 3:21-22). No se gana: se recibe por la fe, y así queda excluida la jactancia.",
    paraLaVida: {
      texto: "Vivo confiado en la justicia que Dios me regala en Cristo, no en la mía.",
      pregunta: "¿En qué te sientes tentado a confiar en tu propia justicia en vez de en la de Cristo?",
    },
  },
  {
    id: "biblicos-avanzados-1-3",
    objetivos: [
      "Explicar las cinco imágenes de la salvación en Romanos: justificación, redención, propiciación, reconciliación y adopción.",
      "Relacionar cada imagen con su mundo: el tribunal, el mercado, el templo, la amistad y la familia.",
      "Explicar a otro creyente una de esas palabras con un ejemplo sencillo.",
    ],
    paraEmpezar:
      "Pablo no usa una sola palabra para hablar de la salvación. Toma imágenes de la vida de su tiempo: el tribunal, el mercado donde se compraban esclavos, el templo, las relaciones rotas y la familia. Cada una muestra una cara distinta de lo que Cristo hizo por nosotros, y juntas dan una idea completa.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=54xtkWfl840", titulo: "Sacrificio y Propiciación", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Romanos 3:24-25" },
      {
        t: "parrafo",
        texto:
          "En dos versículos hay tres palabras: somos «justificados gratuitamente por su gracia», «mediante la redención que es en Cristo Jesús», a quien Dios puso «como propiciación por medio de la fe en su sangre».",
      },
      { t: "versiculo", ref: "Romanos 5:10-11" },
      {
        t: "parrafo",
        texto:
          "Éramos enemigos, y «fuimos reconciliados con Dios por la muerte de su Hijo». Por eso Pablo se goza en Dios, porque «hemos recibido ahora la reconciliación».",
      },
      { t: "versiculo", ref: "Romanos 8:15" },
      {
        t: "parrafo",
        texto:
          "No recibimos un espíritu de esclavos para vivir con miedo, sino «el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!». Abba es la palabra aramea con que un hijo llamaba a su padre.",
      },
      { t: "subtitulo", texto: "Cinco palabras, cinco imágenes" },
      {
        t: "lista",
        items: [
          "Justificación, del tribunal: el juez declara justo al culpable que cree, porque Cristo cargó con su culpa (Romanos 3:24; 5:1).",
          "Redención, del mercado: pagar el precio para dejar libre a un esclavo; Cristo nos libró del pecado (Romanos 3:24; 6:18).",
          "Propiciación, del templo: el sacrificio que aparta la ira justa de Dios contra el pecado; la palabra griega es la misma del propiciatorio del arca (Romanos 3:25; Hebreos 9:5).",
          "Reconciliación, de la amistad: los enemigos pasan a ser amigos y tienen paz con Dios (Romanos 5:10-11).",
          "Adopción, de la familia: el que era esclavo pasa a ser hijo y heredero (Romanos 8:15-17).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que dice cada palabra y lo que no dice" },
      {
        t: "lista",
        items: [
          "Justificación: no es hacerse bueno poco a poco, que es la santificación, sino ser declarado justo por la fe (Romanos 4:5).",
          "Redención: no es un pago al diablo, sino la libertad que Cristo nos ganó con su vida (Romanos 3:24; Marcos 10:45).",
          "Propiciación: no es convencer a un Dios de mal humor; es Dios mismo quien, por amor, puso a Cristo como propiciación (Romanos 3:25; 1 Juan 4:10).",
          "Adopción: no es solo un título; trae el Espíritu, la confianza de llamar Padre a Dios y la herencia (Romanos 8:15-17).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: explicar la adopción a un joven que creció sin papá" },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar su historia con respeto, sin prisa y sin juzgar a su familia.",
          "Paso 2, leer juntos Romanos 8:15: no recibimos un espíritu de esclavitud, sino de adopción.",
          "Paso 3, explicar que en el mundo romano un hijo adoptado tenía los mismos derechos que un hijo de sangre y podía heredar.",
          "Paso 4, mostrar lo que Dios le da: el Espíritu que testifica que es hijo, la confianza de llamarlo Padre y la herencia con Cristo (Romanos 8:16-17).",
          "Paso 5, invitarlo a orar llamando Padre a Dios.",
          "Paso 6, acompañarlo con hermanos mayores en la fe que sean para él una familia en la iglesia (Marcos 10:29-30).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No te quedes con una sola imagen. Cada palabra muestra algo que las otras no muestran: la culpa quitada, la esclavitud rota, la ira apartada, la enemistad terminada y la familia nueva.",
      },
      {
        t: "cuadro",
        titulo: "Las palabras de la salvación en Romanos",
        columnas: ["Palabra", "La imagen", "Qué significa", "Texto"],
        filas: [
          ["Justificación", "El tribunal", "Dios declara justo al que cree", "Romanos 3:24; 5:1"],
          ["Redención", "El mercado de esclavos", "Cristo nos libra del pecado a un precio", "Romanos 3:24"],
          ["Propiciación", "El templo", "Cristo aparta la ira justa de Dios", "Romanos 3:25"],
          ["Reconciliación", "La amistad", "De enemigos pasamos a ser amigos de Dios", "Romanos 5:10-11"],
          ["Adopción", "La familia", "De esclavos pasamos a ser hijos y herederos", "Romanos 8:15-17"],
        ],
      },
    ],
    ideaClave:
      "Romanos describe la salvación con cinco imágenes: la justificación del tribunal, la redención del mercado, la propiciación del templo, la reconciliación de los enemigos y la adopción de la familia (Romanos 3:24-25; 5:10-11; 8:15). Juntas muestran que en Cristo somos declarados justos, libres, perdonados, amigos de Dios e hijos suyos.",
    paraLaVida: {
      texto: "Doy gracias porque en Cristo soy justificado, libre, reconciliado e hijo de Dios.",
      pregunta: "¿Cuál de las cinco palabras necesitas recordar más esta semana, y por qué?",
    },
  },
  {
    id: "biblicos-avanzados-1-4",
    objetivos: [
      "Contar cómo Romanos cambió la vida de Agustín, de Lutero y de Wesley.",
      "Explicar por qué Romanos 1:17 y 3:28 fueron el centro de la Reforma.",
      "Relacionar la seguridad de la salvación con Romanos 8:16.",
    ],
    paraEmpezar:
      "Pocos libros han cambiado tanto la historia de la iglesia como Romanos. Un joven africano que buscaba la verdad, un monje alemán angustiado por su pecado y un ministro inglés que no tenía paz encontraron en esta carta la gracia de Dios. Sus historias, contadas por ellos mismos, muestran que la Palabra sigue viva.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Romanos 13:13-14" },
      {
        t: "parrafo",
        texto:
          "En el año 386, en un jardín de Milán, Agustín oyó desde una casa vecina una voz, como de niño, que repetía: toma y lee. Abrió las cartas de Pablo y leyó: «vestíos del Señor Jesucristo, y no proveáis para los deseos de la carne». En sus Confesiones cuenta que con esas palabras se le fueron todas las dudas.",
      },
      { t: "versiculo", ref: "Romanos 3:28" },
      {
        t: "parrafo",
        texto:
          "Martín Lutero no entendía cómo un pecador podía estar en paz ante un Dios justo. Al estudiar Romanos entendió que la justicia de Dios es la que él regala por la fe, y escribió que se sintió nacido de nuevo, como si entrara al paraíso por puertas abiertas. Pablo lo resume así: «el hombre es justificado por fe sin las obras de la ley».",
      },
      { t: "versiculo", ref: "Romanos 8:16" },
      {
        t: "parrafo",
        texto:
          "El 24 de mayo de 1738, en una reunión en la calle Aldersgate de Londres, alguien leía el prefacio de Lutero a Romanos. Juan Wesley escribió en su diario que sintió su corazón extrañamente ardiente y que recibió la seguridad de que Cristo había quitado sus pecados. Es lo que dice Pablo: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».",
      },
      { t: "subtitulo", texto: "Tres vidas cambiadas por Romanos" },
      {
        t: "lista",
        items: [
          "Agustín: de una vida desordenada a Cristo, por Romanos 13:13-14; llegó a ser obispo de Hipona y uno de los grandes maestros de la iglesia.",
          "Lutero: enseñó Romanos en la Universidad de Wittenberg en 1515 y 1516, y en 1545 contó cómo Romanos 1:17 le abrió la puerta de la gracia; su descubrimiento estuvo en el centro de la Reforma.",
          "Wesley: de la duda a la seguridad de la salvación, al oír el prefacio de Lutero a Romanos; su predicación encendió el avivamiento metodista en Inglaterra.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que cada uno encontró en Romanos" },
      {
        t: "lista",
        items: [
          "Agustín encontró poder para dejar el pecado: vestirse de Cristo (Romanos 13:14).",
          "Lutero encontró la justicia que Dios regala por la fe (Romanos 1:17; 3:28).",
          "Wesley encontró la seguridad de ser hijo de Dios (Romanos 8:16).",
          "Karl Barth, en 1919, publicó un comentario a Romanos que sacudió a la teología liberal de su tiempo, porque volvía a poner a Dios y a su Palabra en el centro.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: usar una de estas historias en una enseñanza" },
      {
        t: "lista",
        items: [
          "Paso 1, escoger el texto: Romanos 8:16, la seguridad de ser hijo de Dios.",
          "Paso 2, explicar el texto primero: el Espíritu da testimonio a nuestro espíritu de que somos hijos (Romanos 8:14-16).",
          "Paso 3, contar la historia con sus datos ciertos: Wesley, Londres, 24 de mayo de 1738, el prefacio de Lutero a Romanos.",
          "Paso 4, usar sus propias palabras, sin adornarlas: sintió su corazón extrañamente ardiente.",
          "Paso 5, aplicar: la seguridad no viene de un sentimiento que se fabrica, sino de confiar en Cristo y del testimonio del Espíritu.",
          "Paso 6, invitar a los que todavía no tienen esa seguridad a orar y a hablar con un líder.",
        ],
      },
      {
        t: "linea",
        titulo: "Romanos en la historia de la iglesia",
        eventos: [
          { fecha: "386", texto: "Agustín lee Romanos 13:13-14 en un jardín de Milán y entrega su vida a Cristo." },
          { fecha: "1515 a 1516", texto: "Lutero enseña Romanos en la Universidad de Wittenberg." },
          { fecha: "1522", texto: "Lutero publica su prefacio a la carta a los Romanos." },
          { fecha: "1540", texto: "Juan Calvino publica su comentario a Romanos, el primero de sus comentarios." },
          { fecha: "24 de mayo de 1738", texto: "Juan Wesley oye leer el prefacio de Lutero en la calle Aldersgate y siente su corazón extrañamente ardiente." },
          { fecha: "1919", texto: "Karl Barth publica su comentario a Romanos, que sacude la teología de su tiempo." },
          { fecha: "1977", texto: "E. P. Sanders publica el libro que abre la llamada nueva perspectiva sobre Pablo." },
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Cuenta estas historias sin adornos: tenemos sus propios relatos, las Confesiones de Agustín, el prefacio de Lutero de 1545 y el diario de Wesley. Y recuerda que el movimiento de santidad, del que salió el pentecostalismo, tiene sus raíces en el avivamiento de Wesley.",
      },
    ],
    ideaClave:
      "Romanos ha cambiado vidas y épocas: Agustín se entregó a Cristo al leer Romanos 13:13-14 en el 386; Lutero entendió en Romanos 1:17 la justicia que Dios regala por la fe, el centro de la Reforma; y Wesley, el 24 de mayo de 1738, recibió la seguridad de la salvación al oír el prefacio de Lutero a Romanos (Romanos 8:16). La misma Palabra sigue obrando hoy.",
    paraLaVida: {
      texto: "Leo Romanos esperando que Dios me hable, como les habló a Agustín, a Lutero y a Wesley.",
      pregunta: "¿Qué versículo de Romanos ha marcado tu vida, y cómo lo contarías en un minuto?",
    },
  },
  {
    id: "biblicos-avanzados-1-5",
    objetivos: [
      "Explicar en qué consiste la nueva perspectiva sobre Pablo y qué le responde la lectura de la Reforma.",
      "Comparar las lecturas de Romanos 7 y de Romanos 9 a 11.",
      "Presentar un debate con respeto, distinguiendo lo que todos afirman de lo que se discute.",
    ],
    paraEmpezar:
      "Romanos no solo ha unido a los creyentes: también ha provocado grandes debates. ¿Qué son las obras de la ley? ¿Quién es el que dice miserable de mí en Romanos 7? ¿Qué significa que todo Israel será salvo? Un maestro maduro conoce las posturas, las presenta con justicia y se queda con lo que la Biblia afirma con claridad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 3:20" },
      {
        t: "parrafo",
        texto:
          "«por las obras de la ley ningún ser humano será justificado delante de él». Todos aceptan esta frase; la pregunta es qué quiere decir Pablo con las obras de la ley.",
      },
      { t: "versiculo", ref: "Romanos 7:24-25" },
      {
        t: "parrafo",
        texto:
          "«¡Miserable de mí! ¿quién me librará de este cuerpo de muerte? Gracias doy a Dios, por Jesucristo Señor nuestro». Unos leen aquí al creyente que todavía lucha con el pecado; otros, al hombre que trata de cumplir la ley con sus fuerzas, sin el Espíritu.",
      },
      { t: "versiculo", ref: "Romanos 11:25-26" },
      {
        t: "parrafo",
        texto:
          "Pablo habla de un misterio: a Israel le ha acontecido «endurecimiento en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo». El endurecimiento es en parte y por un tiempo.",
      },
      { t: "subtitulo", texto: "Primer debate: las obras de la ley" },
      {
        t: "lista",
        items: [
          "La lectura de la Reforma: las obras de la ley son todo lo que la ley manda, hecho para ganar el favor de Dios; el problema es querer ser justo por los propios méritos (Romanos 4:4-5).",
          "La nueva perspectiva: E. P. Sanders dijo en 1977 que el judaísmo del siglo primero no enseñaba ganar la salvación por obras, sino vivir dentro del pacto que Dios dio por gracia; James Dunn y N. T. Wright añadieron que las obras de la ley son sobre todo las señales que separaban a los judíos de los gentiles, como la circuncisión, las comidas y el sábado.",
          "La respuesta de muchos evangélicos: la nueva perspectiva tiene razón en que Pablo quiere unir a judíos y gentiles, pero Romanos 4:4-5 muestra que también rechaza confiar en las obras para ser justificado.",
        ],
      },
      { t: "subtitulo", texto: "Segundo debate: el yo de Romanos 7" },
      {
        t: "lista",
        items: [
          "El creyente que lucha: Agustín en sus últimos años, Lutero y Calvino leyeron aquí al cristiano, que ama la ley de Dios pero todavía siente el pecado (Romanos 7:22-23).",
          "El hombre bajo la ley: muchos padres griegos, Juan Wesley y muchos intérpretes de hoy ven al que trata de agradar a Dios con la ley y sin el Espíritu, que todavía no tiene la victoria de Romanos 8.",
          "En lo que coinciden: la victoria no viene de la fuerza propia, sino de Cristo y del Espíritu (Romanos 7:25; 8:1-4).",
        ],
      },
      { t: "subtitulo", texto: "Tercer debate: Israel y la elección" },
      {
        t: "lista",
        items: [
          "Todo Israel: unos piensan en una gran conversión futura del pueblo judío; otros, como Calvino, en todo el pueblo de Dios, judíos y gentiles; y otros, en todos los judíos escogidos a lo largo de la historia.",
          "La elección: unos leen Romanos 9 como la elección de personas para salvación, que es la postura calvinista; otros, como la elección de un pueblo y de su papel en el plan de Dios, que cada uno recibe por la fe, que es la postura arminiana.",
          "En lo que coinciden: Dios es fiel a sus promesas, la salvación es por su misericordia y todos deben oír el evangelio (Romanos 9:16; 10:13-14; 11:29).",
          "La postura del ministerio sobre la elección y la perseverancia la dirá su declaración de fe; aquí se presentan las lecturas sin escoger entre ellas.",
        ],
      },
      {
        t: "cuadro",
        titulo: "Dos lecturas de las obras de la ley",
        columnas: ["Pregunta", "La lectura de la Reforma", "La nueva perspectiva"],
        filas: [
          ["¿Qué son las obras de la ley?", "Todo lo que la ley manda, hecho para ganar el favor de Dios", "Sobre todo las señales que separaban a los judíos: circuncisión, comidas y sábado"],
          ["¿Cuál era el problema?", "Querer ser justo por los propios méritos", "Dejar fuera a los gentiles del pueblo de Dios"],
          ["¿Qué es la justificación?", "Ser declarado justo ante Dios por la fe", "También ser reconocido como parte del pueblo de Dios por la fe"],
          ["¿Qué subraya?", "La gracia ante el pecado de cada persona", "La unidad de judíos y gentiles en Cristo"],
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: presentar un debate sin dividir a la clase" },
      {
        t: "lista",
        items: [
          "Paso 1, empezar por lo que todos afirman: nadie es justificado por las obras de la ley (Romanos 3:20).",
          "Paso 2, presentar la primera postura con sus mejores razones y sus textos.",
          "Paso 3, presentar la segunda de la misma manera, sin burlarte de nadie.",
          "Paso 4, mostrar en qué tiene razón cada una y qué textos le cuestan.",
          "Paso 5, terminar en lo que la Biblia dice con claridad y en lo que el ministerio enseña.",
          "Paso 6, aplicar a la vida: confiar en la gracia y recibir al hermano de otro pueblo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "En un debate, primero di lo que todos afirman, después presenta cada postura con sus mejores razones y termina en lo que la Biblia afirma con claridad. Un buen maestro puede explicar una postura que no comparte tan bien que sus defensores estarían de acuerdo.",
      },
    ],
    ideaClave:
      "Romanos ha provocado grandes debates: qué son las obras de la ley, entre la lectura de la Reforma y la nueva perspectiva de Sanders, Dunn y Wright (Romanos 3:20); quién es el yo de Romanos 7, el creyente que lucha o el hombre bajo la ley; y qué significan la elección y que todo Israel será salvo (Romanos 11:26). Todos coinciden en que la salvación es por gracia, por la fe en Cristo, y en que Dios es fiel a sus promesas.",
    paraLaVida: {
      texto: "Estudio los debates con humildad y me quedo firme en lo que la Biblia dice con claridad.",
      pregunta: "¿Cómo presentarías a tu grupo una postura con la que no estás de acuerdo, de manera justa?",
    },
  },
  {
    id: "biblicos-avanzados-1-6",
    objetivos: [
      "Explicar, con Romanos 12:1-2, cómo la doctrina de Romanos lleva a una vida de adoración.",
      "Aplicar Romanos 14 y 15 a las diferencias entre hermanos de distintas culturas y costumbres.",
      "Planear un estudio de Romanos para un grupo pequeño de la iglesia.",
    ],
    paraEmpezar:
      "Romanos no termina en la doctrina. Después de once capítulos sobre la gracia de Dios, Pablo pide una vida entregada. Y buena parte de la carta trata un problema muy actual: cómo pueden vivir juntos en una iglesia creyentes de culturas, costumbres y opiniones distintas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=l75uPoo9Rs8", titulo: "Agape: un estudio de la palabra amor", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Romanos 12:1-2" },
      {
        t: "parrafo",
        texto:
          "«Os ruego por las misericordias de Dios, que presentéis vuestros cuerpos en sacrificio vivo». La doctrina de los capítulos 1 al 11 se vuelve adoración en la vida diaria: el cuerpo, la mente y las decisiones.",
      },
      { t: "versiculo", ref: "Romanos 14:1" },
      {
        t: "parrafo",
        texto:
          "«Recibid al débil en la fe, pero no para contender sobre opiniones». En Roma unos comían de todo y otros solo legumbres, unos guardaban ciertos días y otros no (Romanos 14:2-6). Pablo no pide que todos piensen igual en esas cosas, sino que se reciban.",
      },
      { t: "versiculo", ref: "Romanos 15:7" },
      {
        t: "parrafo",
        texto:
          "«Por tanto, recibíos los unos a los otros, como también Cristo nos recibió, para gloria de Dios». La medida es Cristo: él nos recibió cuando no lo merecíamos.",
      },
      { t: "subtitulo", texto: "Cómo vive hoy una iglesia de Romanos" },
      {
        t: "lista",
        items: [
          "Adora con todo: entrega el cuerpo y renueva la mente (Romanos 12:1-2).",
          "Sirve con sus dones, cada uno según la gracia que recibió (Romanos 12:6-8).",
          "Ama sin fingir y bendice al que la persigue (Romanos 12:9, 14).",
          "Respeta a las autoridades y no debe a nadie nada, sino el amor (Romanos 13:1, 8).",
          "Recibe al hermano distinto sin juzgarlo en lo que no es esencial (Romanos 14:1, 13).",
          "Sigue en la misión: Pablo quería llegar a España, donde Cristo no había sido nombrado (Romanos 15:20, 24).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo esencial y lo discutible" },
      {
        t: "lista",
        items: [
          "Lo esencial: que Cristo murió y resucitó, la salvación por gracia y la vida santa (Romanos 10:9; 6:1-2). Lo discutible en Roma: qué se come y qué días se guardan (Romanos 14:5-6).",
          "En lo esencial, firmeza; en lo discutible, libertad y amor; en todo, cuidar la conciencia del hermano (Romanos 14:15).",
          "En una iglesia hispana de hoy pueden ser discutibles el estilo de la música, las comidas de cada país o la manera de celebrar; el evangelio no lo es.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: dos familias que se juzgan" },
      {
        t: "parrafo",
        texto:
          "En tu iglesia, una familia llegada de un país guarda con cuidado ciertas costumbres para el domingo, y otra, llegada de otro país, no las guarda. Empiezan a criticarse en los pasillos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y escuchar a cada familia por separado, sin tomar partido.",
          "Paso 2, distinguir si el asunto es esencial o de conciencia: cada uno esté plenamente convencido en su propia mente (Romanos 14:5).",
          "Paso 3, leer juntos Romanos 14:1-13 y 15:7.",
          "Paso 4, pedir a cada uno que no menosprecie ni juzgue al otro (Romanos 14:3).",
          "Paso 5, buscar juntos lo que contribuye a la paz y a la mutua edificación (Romanos 14:19).",
          "Paso 6, darles una tarea en común, como servir en el mismo equipo, para que se reciban como Cristo los recibió.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Romanos 14 no habla del pecado claro, que la Biblia condena, sino de asuntos de conciencia. No uses este capítulo para dejar pasar el pecado ni para imponer tus costumbres a los demás.",
      },
      { t: "subtitulo", texto: "Un plan para estudiar Romanos en ocho reuniones" },
      {
        t: "lista",
        items: [
          "1. Romanos 1:1-17: el evangelio y la justicia de Dios.",
          "2. Romanos 1:18 a 3:20: todos pecaron.",
          "3. Romanos 3:21 a 4:25: justificados por la fe, como Abraham.",
          "4. Romanos 5: Adán y Cristo, y la paz con Dios.",
          "5. Romanos 6 a 8: la vida nueva en el Espíritu.",
          "6. Romanos 9 a 11: Israel y la fidelidad de Dios.",
          "7. Romanos 12 y 13: la vida transformada.",
          "8. Romanos 14 a 16: recibirse unos a otros y la misión.",
        ],
      },
    ],
    ideaClave:
      "Romanos lleva de la doctrina a la vida: por las misericordias de Dios presentamos el cuerpo en sacrificio vivo y renovamos la mente (Romanos 12:1-2). Una iglesia de Romanos sirve con sus dones, ama, respeta a las autoridades, sigue en la misión y recibe al hermano distinto como Cristo nos recibió (Romanos 15:7), con firmeza en lo esencial y amor en lo discutible (Romanos 14:1).",
    paraLaVida: {
      texto: "Recibo al hermano distinto como Cristo me recibió a mí.",
      pregunta: "¿A qué hermano de otra cultura o costumbre necesitas recibir mejor, y cómo lo harás?",
    },
  },
];
