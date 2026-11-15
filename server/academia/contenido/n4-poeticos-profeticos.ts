/**
 * Nivel 4 · Materia 5 — Libros poéticos y proféticos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * De Job a Cantares y de Isaías a Malaquías, más a fondo que el Panorama del Antiguo Testamento (Nivel 2): la poesía
 * y la sabiduría, los Salmos, los profetas y las profecías del Mesías. Las maneras de ordenar los sucesos del fin
 * (el milenio y el rapto) no se deciden aquí: son Teología sistemática IV, que espera la declaración de fe.
 */
import type { LeccionContenido } from "../tipos";

export const N4_POETICOS_PROFETICOS: LeccionContenido[] = [
  {
    id: "n4-poeticos-profeticos-1",
    objetivos: [
      "Reconocer los libros poéticos y de sabiduría y su lugar en la Biblia.",
      "Explicar el paralelismo y las imágenes de la poesía hebrea.",
      "Explicar qué significa que el temor de Jehová es el principio de la sabiduría.",
    ],
    paraEmpezar:
      "Una parte grande del Antiguo Testamento está escrita en poesía. Para entenderla hay que leerla como poesía: con el corazón y la imaginación, y no como un manual.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 1:7" },
      {
        t: "parrafo",
        texto:
          "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares. A Job, Proverbios y Eclesiastés se les llama también libros de sabiduría: enseñan a vivir bajo la mirada de Dios. Todos parten de la misma base: «El principio de la sabiduría es el temor de Jehová». El temor de Jehová no es un miedo que aleja, sino una reverencia que se acerca a Dios con respeto y obediencia.",
      },
      { t: "subtitulo", texto: "Cómo funciona la poesía hebrea" },
      {
        t: "parrafo",
        texto:
          "La poesía hebrea no rima sonidos: rima ideas. A esto se le llama paralelismo: la segunda línea repite, contrasta o completa a la primera.",
      },
      { t: "versiculo", ref: "Salmos 19:1" },
      { t: "versiculo", ref: "Proverbios 15:1" },
      { t: "versiculo", ref: "Salmos 23:1" },
      {
        t: "lista",
        items: [
          "Repite con otras palabras: los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos (Salmos 19:1).",
          "Contrasta: la blanda respuesta quita la ira, mas la palabra áspera hace subir el furor (Proverbios 15:1).",
          "Completa o explica: Jehová es mi pastor; nada me faltará (Salmos 23:1).",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La poesía también habla con imágenes: Dios es roca, pastor, escudo y refugio. No se leen al pie de la letra, sino como figuras que dicen algo verdadero: Dios es firme, cuida, protege y abriga.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=MnoXHW4Hqjs", titulo: "El arte de la poesía bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Leer despacio",
        texto:
          "La poesía se lee despacio, en voz alta si se puede, preguntando qué imagen usa y qué sentimiento expresa. Muchos salmos fueron escritos para cantarse.",
      },
    ],
    ideaClave:
      "Los libros poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares; Job, Proverbios y Eclesiastés son además libros de sabiduría. La poesía hebrea rima ideas con el paralelismo y habla con imágenes. Su base es que el principio de la sabiduría es el temor de Jehová.",
    paraLaVida: {
      texto: "La sabiduría verdadera empieza de rodillas, con reverencia ante Dios.",
      pregunta: "¿Qué imagen de Dios en la poesía bíblica (roca, pastor, refugio) necesitas recordar hoy, y por qué?",
    },
  },
  {
    id: "n4-poeticos-profeticos-2",
    objetivos: [
      "Explicar el mensaje de Job sobre el sufrimiento del justo y el error de sus amigos.",
      "Explicar qué quiere decir Eclesiastés con vanidad y bajo el sol, y cuál es su conclusión.",
      "Aplicar estos libros a las preguntas difíciles de la vida.",
    ],
    paraEmpezar:
      "¿Por qué sufre una persona buena? ¿Qué sentido tiene la vida si todo pasa? Dos libros de la Biblia no esquivan estas preguntas: Job y Eclesiastés.",
    bloques: [
      { t: "versiculo", ref: "Job 1:20-22" },
      {
        t: "parrafo",
        texto:
          "Job perdió sus bienes, sus hijos y su salud, y dijo: «Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito». Sus amigos pensaban que todo sufrimiento es castigo por algún pecado, y lo acusaron. Pero se equivocaban: el libro muestra que Job era justo y que no todo dolor es un castigo. Al final, Dios se enojó con ellos porque no habían hablado de él lo recto (Job 42:7).",
      },
      { t: "versiculo", ref: "Job 38:1-4" },
      { t: "versiculo", ref: "Job 42:5-6" },
      {
        t: "parrafo",
        texto:
          "Dios no le dio a Job todas las explicaciones, sino algo mejor: se le reveló. Le preguntó: «¿Dónde estabas tú cuando yo fundaba la tierra?», y Job respondió: «De oídas te había oído; Mas ahora mis ojos te ven». La respuesta al sufrimiento no siempre es entender el porqué, sino conocer y confiar en quien gobierna el mundo.",
      },
      { t: "subtitulo", texto: "Eclesiastés: todo es vapor" },
      { t: "versiculo", ref: "Eclesiastés 1:2-3" },
      {
        t: "parrafo",
        texto:
          "«Vanidad de vanidades, todo es vanidad». La palabra hebrea que se traduce vanidad significa vapor o soplo: algo que no se puede atrapar y que pasa pronto. El Predicador observa la vida bajo el sol, es decir, sin mirar más allá de este mundo, y descubre que el placer, el trabajo, la riqueza y aun la sabiduría no llenan el corazón.",
      },
      { t: "versiculo", ref: "Eclesiastés 12:13-14" },
      {
        t: "parrafo",
        texto:
          "Pero el libro no termina en la desesperanza: «Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre». La vida tiene sentido cuando se vive delante de Dios, que juzgará toda obra.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "No hagas como los amigos de Job",
        texto:
          "Cuando alguien sufre, no lo acuses de que algo hizo mal. Job enseña a acompañar con humildad y a dejar en manos de Dios lo que no entendemos.",
      },
    ],
    ideaClave:
      "Job enseña que no todo sufrimiento es castigo: sus amigos se equivocaron, y Dios respondió revelándose, no explicándolo todo. Eclesiastés muestra que la vida bajo el sol es vapor que no se puede atrapar, y concluye: Teme a Dios, y guarda sus mandamientos. Los dos llevan a confiar en Dios cuando la vida no se entiende.",
    paraLaVida: {
      texto: "Cuando no entiendes el porqué, puedes confiar en quién te sostiene.",
      pregunta: "¿Qué pregunta difícil de tu vida necesitas poner en las manos de Dios, como Job?",
    },
  },
  {
    id: "n4-poeticos-profeticos-3",
    objetivos: [
      "Describir la estructura del libro de Salmos y sus principales tipos.",
      "Explicar cómo los salmos de lamento enseñan a orar en el dolor.",
      "Reconocer los salmos mesiánicos y su cumplimiento en Cristo.",
    ],
    paraEmpezar:
      "Los Salmos fueron el himnario y el libro de oración de Israel, y también los de Jesús. En ellos hay alabanza, gratitud, lágrimas, preguntas y esperanza.",
    bloques: [
      { t: "versiculo", ref: "Salmos 1:1-3" },
      { t: "versiculo", ref: "Salmos 150:6" },
      {
        t: "parrafo",
        texto:
          "El libro tiene ciento cincuenta salmos, agrupados en cinco libros. Empieza con dos caminos: el del justo, que «en la ley de Jehová está su delicia», y el de los malos. Termina con una explosión de alabanza: «Todo lo que respira alabe a JAH».",
      },
      { t: "subtitulo", texto: "Los tipos de salmos" },
      {
        t: "lista",
        items: [
          "Alabanza: celebran quién es Dios y lo que hace (Salmos 100).",
          "Lamento: presentan a Dios el dolor, la queja y la petición (Salmos 13).",
          "Acción de gracias: agradecen una respuesta de Dios (Salmos 30).",
          "Sabiduría: enseñan a vivir (Salmos 1).",
          "Reales y mesiánicos: hablan del rey de Israel y apuntan al Mesías (Salmos 2 y 110).",
        ],
      },
      { t: "subtitulo", texto: "Orar en el dolor" },
      { t: "versiculo", ref: "Salmos 13:1-6" },
      {
        t: "parrafo",
        texto:
          "En el Salmo 13, David empieza con una queja: «¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?». Después pide ayuda, y termina confiando: «Mas yo en tu misericordia he confiado». Los lamentos enseñan que se puede llevar a Dios todo lo que sentimos, con honestidad, y terminar en confianza.",
      },
      { t: "subtitulo", texto: "Los salmos y Cristo" },
      { t: "versiculo", ref: "Salmos 22:1" },
      { t: "versiculo", ref: "Hechos 2:34-35" },
      {
        t: "parrafo",
        texto:
          "En la cruz, Jesús oró con el Salmo 22: «Dios mío, Dios mío, ¿por qué me has desamparado?» (Mateo 27:46). Ese salmo describe, siglos antes, las manos y los pies horadados y la ropa echada a suertes (Salmos 22:16-18). Y Pedro, en Pentecostés, aplicó a Jesús resucitado el Salmo 110: «Dijo el Señor a mi Señor: Siéntate a mi diestra».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Ora con los salmos",
        texto:
          "Escoge un salmo y ora con él: léelo despacio y convierte sus palabras en tu oración. Así oraron Israel, Jesús y la iglesia durante siglos.",
      },
    ],
    ideaClave:
      "Los Salmos son el libro de oración de Israel: ciento cincuenta salmos en cinco libros, de alabanza, lamento, gratitud, sabiduría y salmos reales. Los lamentos enseñan a llevar a Dios el dolor con honestidad y a terminar confiando. Los salmos mesiánicos, como el 22 y el 110, se cumplen en Jesús.",
    paraLaVida: {
      texto: "No hay sentimiento que no puedas llevar a Dios: los Salmos te enseñan cómo.",
      pregunta: "¿Qué salmo vas a orar esta semana, y qué parte de tu vida le presentarás a Dios con él?",
    },
  },
  {
    id: "n4-poeticos-profeticos-4",
    objetivos: [
      "Explicar el propósito de Proverbios y cómo leer los proverbios como principios generales.",
      "Aplicar la sabiduría de Proverbios a la lengua, el trabajo, el dinero y las amistades.",
      "Explicar el mensaje de Cantares sobre el amor en el matrimonio.",
    ],
    paraEmpezar:
      "La sabiduría bíblica no es solo saber mucho, sino vivir bien: tomar buenas decisiones en lo de todos los días, bajo la mirada de Dios.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 3:5-6" },
      {
        t: "parrafo",
        texto:
          "«Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia». Proverbios presenta dos caminos: el de la sabiduría, que lleva a la vida, y el de la necedad, que lleva a la ruina. La sabiduría empieza en el temor de Jehová y se ve en la conducta diaria.",
      },
      { t: "subtitulo", texto: "Principios, no promesas automáticas" },
      { t: "versiculo", ref: "Proverbios 22:6" },
      {
        t: "parrafo",
        texto:
          "Los proverbios son principios generales de la vida, no promesas que se cumplen siempre de forma automática. «Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él» enseña lo que normalmente sucede con una buena crianza, pero no culpa a los padres fieles cuando un hijo se aparta. Por eso a veces dos proverbios parecen contradecirse: hay que saber cuándo aplicar cada uno (Proverbios 26:4-5).",
      },
      {
        t: "lista",
        items: [
          "La lengua: la blanda respuesta quita la ira (Proverbios 15:1).",
          "El trabajo: el perezoso pasa necesidad y el diligente prospera (Proverbios 6:6-11).",
          "El dinero: mejor es lo poco con el temor de Jehová que el gran tesoro con turbación (Proverbios 15:16).",
          "Las amistades: el que anda con sabios, sabio será (Proverbios 13:20).",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Cantares: el amor en el matrimonio" },
      { t: "versiculo", ref: "Cantares 8:6-7" },
      {
        t: "parrafo",
        texto:
          "El Cantar de los Cantares es un poema de amor entre un esposo y una esposa. Celebra la belleza, el deseo y la fidelidad del amor en el matrimonio: «fuerte es como la muerte el amor». Muchos creyentes han visto también en él un reflejo del amor fiel de Dios por su pueblo y de Cristo por su iglesia (Efesios 5:25), pero su primer sentido es el amor de los esposos, que es un regalo de Dios.",
      },
      { t: "versiculo", ref: "Cantares 2:7" },
      {
        t: "nota",
        titulo: "El amor tiene su tiempo",
        texto:
          "Cantares repite: «Que no despertéis ni hagáis velar al amor, Hasta que quiera». El amor y la intimidad tienen su tiempo y su lugar: el matrimonio.",
      },
    ],
    ideaClave:
      "Proverbios enseña a vivir con sabiduría desde el temor de Jehová: confiar en él, cuidar la lengua, trabajar con diligencia, usar bien el dinero y escoger buenas amistades. Sus dichos son principios generales, no promesas automáticas. Cantares celebra el amor fiel entre esposo y esposa como un regalo de Dios.",
    paraLaVida: {
      texto: "La sabiduría se nota en las decisiones pequeñas de cada día.",
      pregunta: "¿Qué proverbio necesitas poner en práctica esta semana: en tu lengua, tu trabajo, tu dinero o tus amistades?",
    },
  },
  {
    id: "n4-poeticos-profeticos-5",
    objetivos: [
      "Explicar quiénes eran los profetas y cómo se agrupan sus libros.",
      "Describir los mensajes principales de los profetas: el arrepentimiento, la justicia, el juicio y la esperanza.",
      "Aplicar los pasos para leer bien un texto profético.",
    ],
    paraEmpezar:
      "Los profetas no eran adivinos del futuro: eran mensajeros de Dios que llamaban a su pueblo a volver al pacto. Hablaban del presente y del futuro, siempre para que el pueblo se volviera a Dios.",
    bloques: [
      { t: "versiculo", ref: "Amós 3:7" },
      {
        t: "parrafo",
        texto:
          "«Porque no hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas». Los libros proféticos son dieciséis, además de Lamentaciones: los profetas mayores (Isaías, Jeremías, Ezequiel y Daniel) y los doce menores, de Oseas a Malaquías. Se les llama mayores o menores por el tamaño de sus libros, no por su importancia.",
      },
      { t: "subtitulo", texto: "En su tiempo" },
      {
        t: "lista",
        items: [
          "Frente a Asiria, antes del destierro: Isaías, Oseas, Amós, Miqueas y Jonás, entre otros.",
          "Frente a Babilonia y en el destierro: Jeremías, Ezequiel, Habacuc y Daniel.",
          "Después del regreso: Hageo, Zacarías y Malaquías.",
        ],
      },
      { t: "subtitulo", texto: "Lo que anunciaban" },
      { t: "versiculo", ref: "Amós 5:24" },
      { t: "versiculo", ref: "Miqueas 6:8" },
      {
        t: "parrafo",
        texto:
          "Los profetas llamaban al arrepentimiento y denunciaban la idolatría y la injusticia: «Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo». Miqueas resumió lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "Jeremías 31:31-33" },
      {
        t: "parrafo",
        texto:
          "También anunciaban juicio y, después del juicio, esperanza: Dios restauraría a su pueblo y haría un nuevo pacto: «Daré mi ley en su mente, y la escribiré en su corazón». Jesús dijo en la última cena que ese nuevo pacto se cumplía en su sangre (Lucas 22:20).",
      },
      { t: "subtitulo", texto: "Cómo leer a los profetas" },
      {
        t: "lista",
        items: [
          "Primero, qué dijo el profeta a su pueblo, en su tiempo.",
          "Después, cómo se cumple en Cristo y en su iglesia.",
          "Y, con humildad, qué falta por cumplirse en la venida de Cristo. Las maneras de ordenar los sucesos del fin se estudian en Teología sistemática IV.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=_Nf4IcDuyTc", titulo: "Resumen del libro de Jeremías", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Profetas para hoy",
        texto:
          "El llamado de los profetas sigue vivo: volver a Dios de corazón, dejar los ídolos y practicar la justicia con el prójimo, sobre todo con el pobre, la viuda y el extranjero.",
      },
    ],
    ideaClave:
      "Los profetas eran mensajeros de Dios que llamaban al pueblo a volver al pacto: denunciaban la idolatría y la injusticia, anunciaban juicio y, después, esperanza y un nuevo pacto. Sus libros son los profetas mayores y los doce menores. Se leen en su tiempo, a la luz de Cristo y con humildad sobre lo que falta por cumplirse.",
    paraLaVida: {
      texto: "Dios sigue pidiendo lo mismo: justicia, misericordia y humildad.",
      pregunta: "¿En qué área de tu vida necesitas oír hoy el llamado de los profetas a volver a Dios?",
    },
  },
  {
    id: "n4-poeticos-profeticos-6",
    objetivos: [
      "Identificar las principales profecías mesiánicas y su cumplimiento en Jesús.",
      "Explicar el mensaje del siervo sufriente de Isaías 53.",
      "Explicar cómo el Nuevo Testamento lee a los profetas a la luz de Cristo.",
    ],
    paraEmpezar:
      "Después de resucitar, Jesús les explicó a sus discípulos que tenía que cumplirse todo lo que estaba escrito de él. Los profetas apuntaban a él.",
    bloques: [
      { t: "versiculo", ref: "Lucas 24:44" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «era necesario que se cumpliese todo lo que está escrito de mí en la ley de Moisés, en los profetas y en los salmos». Estas son algunas de esas profecías:",
      },
      {
        t: "lista",
        items: [
          "Nacería de una virgen: Isaías 7:14, cumplido en Mateo 1:22-23.",
          "Nacería en Belén: Miqueas 5:2, cumplido en Mateo 2:4-6.",
          "Sería Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz: Isaías 9:6.",
          "Entraría en Jerusalén humilde, sobre un asno: Zacarías 9:9, cumplido en Mateo 21:4-5.",
          "Sería el Hijo del Hombre que recibe un reino eterno: Daniel 7:13-14, el título que Jesús usó para sí.",
          "Derramaría su Espíritu sobre toda carne: Joel 2:28, cumplido en Pentecostés (Hechos 2:16-17).",
        ],
      },
      { t: "versiculo", ref: "Miqueas 5:2" },
      { t: "subtitulo", texto: "El siervo sufriente" },
      { t: "versiculo", ref: "Isaías 53:3-6" },
      { t: "versiculo", ref: "Hechos 8:34-35" },
      {
        t: "parrafo",
        texto:
          "Isaías describe a un siervo despreciado que sufre por los pecados de otros: «Mas él herido fue por nuestras rebeliones, molido por nuestros pecados», y «Jehová cargó en él el pecado de todos nosotros». Unos siete siglos después, Felipe le explicó este pasaje a un funcionario etíope, y «comenzando desde esta escritura, le anunció el evangelio de Jesús».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=s-K5s7YpUC8", titulo: "Resumen del libro de Isaías (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Leer con Cristo en el centro",
        texto:
          "El Nuevo Testamento lee a los profetas a la luz de Cristo, sin forzar el texto: muestra cómo sus promesas se cumplen en su vida, su muerte, su resurrección y la venida del Espíritu. Lo que todavía falta se cumplirá en su segunda venida.",
      },
    ],
    ideaClave:
      "Los profetas anunciaron al Mesías: nacido de una virgen en Belén, Dios Fuerte, rey humilde, Hijo del Hombre, el que derramaría su Espíritu. Isaías 53 describe al siervo que sufre por nuestras rebeliones, y Felipe lo aplicó a Jesús. Todo lo escrito de él en la ley, los profetas y los salmos se cumple en Cristo.",
    paraLaVida: {
      texto: "Tu fe descansa en un Salvador anunciado durante siglos y fiel a cada promesa.",
      pregunta: "¿Qué profecía cumplida en Jesús te ayuda más a confiar en las promesas de Dios que todavía esperas?",
    },
  },
];
