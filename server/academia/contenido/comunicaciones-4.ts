/**
 * Especialidad Comunicaciones y medios · Materia 4 — Redacción y comunicación (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la palabra escrita al servicio del evangelio,
 * escribir claro (con la Ley de Redacción Clara de 2010, la ley pública 111-274, comprobada), los anuncios, los boletines
 * y los mensajes, escribir una historia o un artículo, hablar en público y comunicar en una crisis. Lo legal es una guía
 * general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const COMUNICACIONES_4: LeccionContenido[] = [
  {
    id: "comunicaciones-4-1",
    objetivos: [
      "Explicar, con Lucas 1:1-4, por qué la iglesia escribe con cuidado y con orden.",
      "Reconocer los escritos de una iglesia y a quién sirve cada uno.",
      "Escribir el texto de presentación de una iglesia.",
    ],
    paraEmpezar:
      "La iglesia escribe todo el tiempo: anuncios, mensajes, la página de internet, cartas, invitaciones. Lo que escribe habla de Cristo y de la iglesia, aunque el que lo escribió no esté presente. Por eso se escribe con cuidado, con orden y con verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=DTL5QW6Ez7s", titulo: "El nacimiento de Jesús: Lucas 1 y 2", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Lucas 1:1-4" },
      {
        t: "parrafo",
        texto:
          "Lucas investigó antes de escribir: «después de haber investigado con diligencia todas las cosas desde su origen, escribírtelas por orden», «para que conozcas bien la verdad de las cosas en las cuales has sido instruido».",
      },
      { t: "versiculo", ref: "Jeremías 30:2" },
      {
        t: "parrafo",
        texto: "Dios le dijo al profeta: «Escríbete en un libro todas las palabras que te he hablado». Lo escrito permanece.",
      },
      { t: "versiculo", ref: "Romanos 15:4" },
      {
        t: "parrafo",
        texto:
          "«Porque las cosas que se escribieron antes, para nuestra enseñanza se escribieron». Lo bien escrito sigue enseñando con los años.",
      },
      { t: "subtitulo", texto: "Los escritos de una iglesia" },
      {
        t: "lista",
        items: [
          "Los anuncios y el boletín: para que la iglesia sepa qué pasa y cómo participar.",
          "Los mensajes de WhatsApp y de las redes: breves, claros y amables.",
          "La página de internet: para el que todavía no conoce a la iglesia.",
          "Las cartas y los correos: para agradecer, invitar o informar con cuidado.",
          "Las historias y los artículos: para contar lo que Dios está haciendo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: escribir con cuidado y escribir con prisa" },
      {
        t: "lista",
        items: [
          "Con cuidado: se averigua antes de escribir. Con prisa: se escribe lo que se cree que pasó.",
          "Con cuidado: tiene orden, de lo más importante a lo menos importante. Con prisa: lo mezcla todo.",
          "Con cuidado: se revisan la ortografía y los datos. Con prisa: sale con errores y con la hora equivocada.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la presentación de la iglesia" },
      {
        t: "parrafo",
        texto:
          "La iglesia necesita un texto corto para su página de internet, para los que la buscan por primera vez.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, pensar en quién lo va a leer: alguien que nunca vino y quiere saber cómo es la iglesia.",
          "Paso 2, escribir en una frase quiénes somos: una iglesia que ama a Dios y a su ciudad.",
          "Paso 3, contar lo que va a encontrar: los horarios, lo que hay para los niños y cómo es un culto.",
          "Paso 4, decir en pocas palabras en qué creemos, con un enlace a la declaración de fe.",
          "Paso 5, terminar con una invitación clara, con la dirección, el teléfono y el correo.",
          "Paso 6, pedir que dos personas lo lean, corregir lo que no se entiende y revisar la ortografía.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo que se escribe en nombre de la iglesia lo revisa alguien con autoridad antes de publicarlo. Un error en un dato, como una hora o una dirección, puede dejar afuera a una familia.",
      },
    ],
    ideaClave:
      "Lucas investigó con diligencia y escribió por orden para que se conociera la verdad, Dios mandó escribir sus palabras, y lo que se escribió antes nos sigue enseñando. La iglesia escribe anuncios, mensajes, su página de internet, cartas e historias, y cada uno sirve a alguien. Escribe con cuidado y no con prisa: averigua antes, ordena de lo más importante a lo menos importante, revisa la ortografía y los datos, y pide que otro lo lea.",
    paraLaVida: {
      texto: "Lo que escribo también habla de Cristo.",
      pregunta: "¿Qué mensaje que vas a escribir esta semana podrías revisar con más cuidado?",
    },
  },
  {
    id: "comunicaciones-4-2",
    objetivos: [
      "Explicar, con 1 Corintios 14:19, por qué se escribe para que el otro entienda.",
      "Usar los principios del lenguaje claro: pensar en el lector, ordenar, frases cortas y palabras de todos los días.",
      "Reescribir un anuncio confuso para que se entienda a la primera.",
    ],
    paraEmpezar:
      "Un texto confuso cansa y se abandona; un texto claro se lee hasta el final y se recuerda. Escribir claro no es escribir pobre: es respetar al que lee, como Pablo, que prefería pocas palabras que se entendieran.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1), con el Sermón del monte", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "1 Corintios 14:19" },
      {
        t: "parrafo",
        texto:
          "Pablo dijo: «en la iglesia prefiero hablar cinco palabras con mi entendimiento, para enseñar también a otros, que diez mil palabras en lengua desconocida».",
      },
      { t: "versiculo", ref: "Mateo 5:37" },
      {
        t: "parrafo",
        texto: "Jesús enseñó a hablar sin rodeos: «Pero sea vuestro hablar: Sí, sí; no, no».",
      },
      { t: "versiculo", ref: "Proverbios 15:2" },
      {
        t: "parrafo",
        texto: "«La lengua de los sabios adornará la sabiduría». El sabio hace que lo bueno se entienda.",
      },
      { t: "subtitulo", texto: "Los principios del lenguaje claro" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos, la Ley de Redacción Clara de 2010 (Plain Writing Act) les pide a las agencias federales escribir de manera clara, breve y bien ordenada, pensando en quien va a leer. Con esa misma idea, la iglesia puede seguir estos principios:",
      },
      {
        t: "lista",
        items: [
          "Pensar en el lector: quién es, qué necesita saber y qué tiene que hacer.",
          "Poner primero lo más importante.",
          "Escribir frases cortas, con una idea en cada una.",
          "Usar palabras de todos los días, y explicar las palabras propias de la iglesia.",
          "Usar títulos, listas y espacios, para que el texto se lea fácil.",
          "Decir quién hace qué: por ejemplo, los jóvenes servirán la cena, en vez de la cena será servida.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un texto confuso y un texto claro" },
      {
        t: "lista",
        items: [
          "Confuso: se les comunica a los hermanos que, en virtud de la próxima celebración, se estará llevando a cabo una reunión preparatoria. Claro: reunión para preparar el aniversario, el jueves a las 7 de la noche, en el salón.",
          "Confuso: una sola frase de cinco líneas. Claro: tres frases cortas.",
          "Confuso: palabras como santificación, sin explicar. Claro: la misma idea, dicha con palabras de todos los días.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: reescribir un anuncio confuso" },
      {
        t: "parrafo",
        texto:
          "El anuncio dice: se invita a toda la membresía a hacerse presente con el fin de participar en la jornada de limpieza que se efectuará en las instalaciones del templo el día sábado venidero en horas de la mañana, siendo indispensable traer los implementos necesarios.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, buscar lo más importante: hay una limpieza del templo, y se necesita ayuda.",
          "Paso 2, sacar los datos: el sábado, en la mañana, en el templo, y hay que traer algo.",
          "Paso 3, averiguar lo que falta: la hora exacta y qué hay que traer.",
          "Paso 4, escribir con frases cortas: ayúdanos a limpiar el templo; sábado 14, de 8 a 11 de la mañana; trae guantes y una escoba.",
          "Paso 5, agregar a quién llamar: preguntas a la hermana Ana, al 555-0123.",
          "Paso 6, leerlo en voz alta y preguntarse si alguien nuevo lo entendería a la primera.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Escribir claro no es escribir sin respeto. Se trata con cariño al lector, se usa el usted o el tú según la costumbre de la iglesia, y se cuida la ortografía, porque los errores distraen.",
      },
    ],
    ideaClave:
      "Pablo prefería cinco palabras que se entendieran a diez mil que no, Jesús pidió hablar sin rodeos, y el sabio hace que la sabiduría se entienda. La Ley de Redacción Clara de 2010 pide escribir claro, breve y ordenado, pensando en quien lee. Con esa misma idea, la iglesia piensa en el lector, pone primero lo importante, usa frases cortas, palabras de todos los días, títulos y listas, y dice quién hace qué.",
    paraLaVida: {
      texto: "Escribo para que me entiendan a la primera.",
      pregunta: "¿Qué frase larga que sueles escribir podrías decir con pocas palabras?",
    },
  },
  {
    id: "comunicaciones-4-3",
    objetivos: [
      "Explicar, con la carta de Hechos 15, el valor de un mensaje claro que consuela.",
      "Escribir un anuncio con qué, cuándo, dónde, para quién y por qué.",
      "Adaptar un mismo anuncio al boletín, a WhatsApp y a las redes.",
    ],
    paraEmpezar:
      "Un buen anuncio responde las preguntas que la gente se hace antes de ir: qué es, cuándo, dónde, para quién y por qué vale la pena. Si falta una de esas respuestas, alguien se queda en casa.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 15:30-31" },
      {
        t: "parrafo",
        texto:
          "La iglesia de Jerusalén envió una carta clara a Antioquía, y al leerla, «se regocijaron por la consolación». Un buen mensaje informa y anima.",
      },
      { t: "versiculo", ref: "Lucas 14:21" },
      {
        t: "parrafo",
        texto:
          "En la parábola del banquete, el señor dijo: «Ve pronto por las plazas y las calles de la ciudad». La invitación se lleva a donde está la gente.",
      },
      { t: "versiculo", ref: "Proverbios 25:25" },
      {
        t: "parrafo",
        texto:
          "«Como el agua fría al alma sedienta, Así son las buenas nuevas de lejanas tierras». Una buena noticia bien dada refresca.",
      },
      { t: "subtitulo", texto: "Las cinco preguntas de un anuncio" },
      {
        t: "lista",
        items: [
          "Qué: el nombre del evento y en qué consiste.",
          "Cuándo: el día, la fecha y la hora de empezar y de terminar.",
          "Dónde: el lugar, con la dirección si es fuera del templo.",
          "Para quién: si es para todos, para los jóvenes o para las familias, y si hay algo para los niños.",
          "Por qué: el propósito, en una frase que invite.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un mismo anuncio en tres lugares" },
      {
        t: "lista",
        items: [
          "En el boletín: el anuncio completo, con las cinco preguntas y a quién preguntar.",
          "En WhatsApp: un mensaje corto con lo esencial, sin cadenas largas ni muchos emojis, y sin datos privados.",
          "En las redes: una imagen clara con la fecha y la hora, y un texto breve que invite.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el anuncio de una noche de oración" },
      {
        t: "parrafo",
        texto: "La iglesia tendrá una noche de oración por las familias y quiere anunciarla en los tres lugares.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, responder las cinco preguntas: noche de oración por las familias; viernes 21, de 7 a 9 de la noche; en el templo; para toda la iglesia, con cuidado de niños; para orar juntos por nuestros hogares.",
          "Paso 2, escribir el boletín con todo, y con el nombre de quien responde las preguntas.",
          "Paso 3, escribir el mensaje de WhatsApp: este viernes oramos por nuestras familias, a las 7 de la noche, en el templo; hay cuidado para los niños; ¡te esperamos!",
          "Paso 4, preparar la imagen para las redes, con la fecha, la hora y el lugar bien grandes.",
          "Paso 5, revisar que la fecha y la hora sean iguales en los tres lugares.",
          "Paso 6, enviar un recordatorio el mismo día, sin llenar de mensajes a la gente.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En los grupos de WhatsApp de la iglesia no se comparten datos privados, como los problemas de salud o de familia de alguien, sin su permiso, ni cadenas o noticias sin confirmar.",
      },
      {
        t: "cuadro",
        titulo: "Un mismo anuncio en tres lugares",
        columnas: ["Lugar", "Qué lleva", "Cuidado"],
        filas: [
          ["El boletín", "El anuncio completo: qué, cuándo, dónde, para quién y por qué, y a quién preguntar", "Revisar la fecha, la hora y la ortografía"],
          ["WhatsApp", "Un mensaje corto con lo esencial y una invitación", "Sin cadenas, sin muchos emojis y sin datos privados"],
          ["Las redes", "Una imagen clara con la fecha, la hora y el lugar, y un texto breve que invite", "Los mismos datos que en el boletín"],
          ["El recordatorio", "Un mensaje el mismo día", "Uno solo, sin llenar de mensajes a la gente"],
        ],
      },
    ],
    ideaClave:
      "La carta de Jerusalén informó y consoló, la invitación se lleva por las plazas y las calles, y la buena noticia refresca como el agua fría. Un buen anuncio responde qué, cuándo, dónde, para quién y por qué. El mismo anuncio se adapta: completo en el boletín, corto en WhatsApp y con una imagen clara en las redes, con los mismos datos en los tres lugares, sin llenar de mensajes a la gente ni compartir datos privados.",
    paraLaVida: {
      texto: "Un anuncio claro es una invitación bien hecha.",
      pregunta: "¿A quién podrías invitar esta semana con un mensaje claro y amable?",
    },
  },
  {
    id: "comunicaciones-4-4",
    objetivos: [
      "Explicar, con Proverbios 18:13 y Éxodo 23:1, por qué se averiguan los hechos antes de escribir.",
      "Escribir una historia con su título, su entrada, su cuerpo y su cierre.",
      "Contar lo que Dios hizo en un evento, con los datos comprobados y con permiso.",
    ],
    paraEmpezar:
      "Una historia bien escrita muestra lo que Dios está haciendo en la iglesia: un bautismo, una misión, una familia restaurada. Pero antes de escribirla hay que averiguar bien los hechos, pedirles permiso a las personas y decir la verdad sin adornarla.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 18:13" },
      {
        t: "parrafo",
        texto: "«Al que responde palabra antes de oír, Le es fatuidad y oprobio». Primero se escucha y se averigua.",
      },
      { t: "versiculo", ref: "Proverbios 18:17" },
      {
        t: "parrafo",
        texto:
          "«Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre». Hay que oír a las dos partes.",
      },
      { t: "versiculo", ref: "Éxodo 23:1" },
      {
        t: "parrafo",
        texto: "La ley es clara: «No admitirás falso rumor».",
      },
      { t: "subtitulo", texto: "Las partes de una historia" },
      {
        t: "lista",
        items: [
          "El título: corto y verdadero, que diga de qué trata.",
          "La entrada: el primer párrafo, con lo más importante: qué pasó, a quién, cuándo y dónde.",
          "El cuerpo: los detalles, las palabras de las personas, con su permiso, y lo que Dios hizo.",
          "El cierre: una frase que invite o que le dé la gloria a Dios.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una historia comprobada y un rumor" },
      {
        t: "lista",
        items: [
          "Comprobada: se habló con las personas y se revisaron los datos. Rumor: alguien lo contó y se dio por cierto.",
          "Comprobada: las citas son lo que la persona dijo. Rumor: se le ponen palabras en la boca.",
          "Comprobada: los números son exactos, o se dicen como aproximados. Rumor: se exageran.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la historia de un bautismo" },
      {
        t: "parrafo",
        texto:
          "El domingo se bautizaron siete personas, y el pastor te pide una historia corta para la página de la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, confirmar los datos con el pastor: cuántas personas, la fecha y el lugar.",
          "Paso 2, preguntarles a dos de los bautizados si quieren contar algo, y pedirles permiso para publicar sus palabras y su foto.",
          "Paso 3, escribir el título: siete personas se bautizaron este domingo.",
          "Paso 4, escribir la entrada: este domingo, siete personas fueron bautizadas en el culto de la mañana, después de terminar las clases para nuevos creyentes.",
          "Paso 5, en el cuerpo, poner las palabras que ellos dieron y un versículo, sin exagerar.",
          "Paso 6, cerrar con una invitación a las próximas clases, pedirle al pastor que la revise y publicarla.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No se publica el nombre completo ni la foto de nadie sin su permiso, ni los de los niños sin el permiso escrito de sus padres. Si una historia toca a otras personas, se les pregunta antes, o se cuenta sin exponerlas.",
      },
    ],
    ideaClave:
      "El que responde antes de oír se avergüenza, hay que oír a las dos partes, y la ley manda no admitir falso rumor. Una historia tiene su título, su entrada con lo más importante, su cuerpo con los detalles y su cierre. Se escribe con los datos comprobados, con las palabras que las personas dijeron y con su permiso, sin exagerar ni exponer a nadie, y se le pide al pastor que la revise.",
    paraLaVida: {
      texto: "Antes de escribir, averiguo.",
      pregunta: "¿Qué historia de lo que Dios hace en tu iglesia merece contarse?",
    },
  },
  {
    id: "comunicaciones-4-5",
    objetivos: [
      "Explicar, con Efesios 4:15 y Proverbios 16:24, cómo se habla con verdad y con amor.",
      "Preparar y dar los anuncios del culto en pocos minutos.",
      "Presentar a un invitado o dirigir un evento con claridad.",
    ],
    paraEmpezar:
      "Dar los anuncios, presentar a un predicador invitado o dirigir un evento también es comunicar. Muchas personas se ponen nerviosas al hablar en público, pero con preparación y con oración se puede hablar con claridad y con calidez.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Efesios 4:15" },
      {
        t: "parrafo",
        texto:
          "Pablo pide hablar «siguiendo la verdad en amor». La verdad sin amor hiere, y el amor sin verdad engaña.",
      },
      { t: "versiculo", ref: "Proverbios 16:24" },
      {
        t: "parrafo",
        texto: "«Panal de miel son los dichos suaves; Suavidad al alma y medicina para los huesos».",
      },
      { t: "versiculo", ref: "Hechos 2:14" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, Pedro, «poniéndose en pie con los once, alzó la voz y les habló». Habló con claridad y con valor.",
      },
      { t: "subtitulo", texto: "Cómo hablar en público" },
      {
        t: "lista",
        items: [
          "Preparar: saber qué se va a decir y en qué orden, con pocas notas.",
          "Empezar bien: saludar, decir quién eres y de qué vas a hablar.",
          "Hablar claro: despacio, en voz alta, mirando a la gente y no al papel.",
          "Ser breve: decir lo importante y terminar a tiempo.",
          "Cuidar la voz y el cuerpo: respirar hondo, sonreír y no jugar con el micrófono.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: unos anuncios preparados y unos improvisados" },
      {
        t: "lista",
        items: [
          "Preparados: tres anuncios en dos minutos. Improvisados: diez anuncios en quince minutos.",
          "Preparados: se dicen la fecha, la hora y el lugar. Improvisados: después les avisamos.",
          "Preparados: se invita con alegría. Improvisados: se regaña a los que no vinieron la vez pasada.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: los anuncios del domingo" },
      {
        t: "parrafo",
        texto: "Te toca dar los anuncios del culto del domingo, y tienes dos minutos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, pedir los anuncios el jueves y elegir los tres más importantes; los demás van en el boletín.",
          "Paso 2, escribir para cada uno qué, cuándo y dónde, en una o dos frases.",
          "Paso 3, ensayar en voz alta con un reloj, para no pasar de los dos minutos.",
          "Paso 4, el domingo, llegar temprano y probar el micrófono.",
          "Paso 5, saludar, dar los tres anuncios mirando a la gente y decir dónde ver los demás.",
          "Paso 6, terminar con una frase que invite, y devolver el culto a tiempo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Al presentar a un predicador invitado, se dice su nombre bien pronunciado, de dónde viene y por qué está con nosotros, en menos de un minuto. La presentación honra al invitado, pero la gloria es para Dios.",
      },
    ],
    ideaClave:
      "Se habla siguiendo la verdad en amor, los dichos suaves son medicina para el alma, y Pedro alzó la voz con claridad en Pentecostés. Para hablar en público se prepara lo que se dirá, se empieza bien, se habla claro y despacio mirando a la gente, se es breve y se cuida la voz. Los anuncios del culto se eligen, se escriben con qué, cuándo y dónde, se ensayan con un reloj y se dan con alegría.",
    paraLaVida: {
      texto: "Hablo con la verdad y con amor.",
      pregunta: "¿En qué ocasión podrías hablar en público esta semana, y cómo te prepararás?",
    },
  },
  {
    id: "comunicaciones-4-6",
    objetivos: [
      "Explicar, con Efesios 4:25 y Proverbios 26:20, por qué la iglesia habla con verdad y frena el chisme en una crisis.",
      "Seguir los pasos para comunicar en una crisis: averiguar, decidir quién habla, decir la verdad a tiempo y cuidar a las personas.",
      "Responder a un rumor que corre por WhatsApp.",
    ],
    paraEmpezar:
      "A veces llegan malas noticias: un accidente, una enfermedad grave, la caída de un líder o un rumor que se esparce. En esos momentos, lo que la iglesia dice y cómo lo dice puede sanar o puede herir. Una iglesia preparada comunica con verdad, con calma y con amor.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=i4C_o1AtR9o", titulo: "Libro de Proverbios: ¿cómo vivir una vida buena?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Efesios 4:25" },
      {
        t: "parrafo",
        texto:
          "«desechando la mentira, hablad verdad cada uno con su prójimo». En una crisis no se esconde la verdad, ni se inventa.",
      },
      { t: "versiculo", ref: "Proverbios 26:20" },
      {
        t: "parrafo",
        texto:
          "«Sin leña se apaga el fuego, Y donde no hay chismoso, cesa la contienda». El chisme alimenta el fuego.",
      },
      { t: "versiculo", ref: "Proverbios 15:1" },
      {
        t: "parrafo",
        texto: "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».",
      },
      { t: "subtitulo", texto: "Los pasos para comunicar en una crisis" },
      {
        t: "lista",
        items: [
          "Averiguar: qué pasó de verdad, antes de decir nada.",
          "Decidir quién habla: el pastor, o una sola persona que él elija, para que no haya muchas versiones.",
          "Cuidar a los afectados: hablar primero con ellos y proteger su privacidad.",
          "Decir la verdad a tiempo: con palabras sencillas, sin esconder ni exagerar, y sin dar detalles que no corresponden.",
          "Cumplir la ley: si hay abuso de un menor, se reporta a las autoridades, como pide la ley de Texas, y ningún delito se tapa.",
          "Seguir informando: decir cuándo habrá más noticias, y cumplirlo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que comunica bien y la que no" },
      {
        t: "lista",
        items: [
          "Bien: una sola voz, con la verdad. Mal: cada uno cuenta su versión.",
          "Bien: cuida a las víctimas y a sus familias. Mal: las expone o las culpa.",
          "Bien: responde con calma. Mal: responde con enojo en las redes.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un rumor en WhatsApp" },
      {
        t: "parrafo",
        texto:
          "Corre por WhatsApp un mensaje que dice que el tesorero se robó el dinero de la ofrenda, y muchos hermanos lo están reenviando.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no reenviarlo ni responder con enojo, y avisarle enseguida al pastor.",
          "Paso 2, averiguar con los responsables qué pasó de verdad, revisando las cuentas con dos personas.",
          "Paso 3, hablar primero en privado con el tesorero, escuchando su parte.",
          "Paso 4, que el pastor le envíe a la iglesia un mensaje claro y breve: qué se sabe, qué se está revisando y cuándo se informará.",
          "Paso 5, pedir con amor que no se reenvíen mensajes sin confirmar, porque donde no hay chismoso cesa la contienda.",
          "Paso 6, informar el resultado cuando esté listo, con la verdad, y si hubo una falta, seguir el proceso que corresponde.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En una crisis, la prisa por hablar puede hacer daño. Es mejor decir: estamos averiguando y les informaremos el jueves, que dar datos que después habrá que corregir. Lo legal de esta lección es una guía general, no un consejo legal.",
      },
      {
        t: "pasos",
        titulo: "Cómo comunica la iglesia en una crisis",
        pasos: [
          {
            titulo: "Averiguar",
            texto: "Saber qué pasó de verdad antes de decir nada, porque al que responde antes de oír le es fatuidad (Proverbios 18:13).",
          },
          {
            titulo: "Una sola voz",
            texto: "El pastor, o una persona que él elija, para que no haya muchas versiones.",
          },
          {
            titulo: "Cuidar a los afectados",
            texto: "Hablar primero con ellos y proteger su privacidad.",
          },
          {
            titulo: "La verdad a tiempo",
            texto: "Con palabras sencillas, sin esconder ni exagerar, hablando verdad con el prójimo (Efesios 4:25).",
          },
          {
            titulo: "Cumplir la ley",
            texto: "Reportar a las autoridades el abuso de un menor, como pide la ley de Texas, sin tapar ningún delito.",
          },
          {
            titulo: "Seguir informando",
            texto: "Decir cuándo habrá más noticias y cumplirlo, porque donde no hay chismoso cesa la contienda (Proverbios 26:20).",
          },
        ],
      },
    ],
    ideaClave:
      "La Biblia manda desechar la mentira y hablar verdad, donde no hay chismoso cesa la contienda, y la blanda respuesta quita la ira. En una crisis, la iglesia averigua antes de hablar, decide una sola voz, cuida primero a los afectados, dice la verdad a tiempo sin esconder ni exagerar, reporta el abuso de un menor, como pide la ley, sin tapar ningún delito, y sigue informando. Ante un rumor, no lo reenvía, averigua, escucha a las partes y responde con calma.",
    paraLaVida: {
      texto: "Antes de reenviar, pregunto si es verdad.",
      pregunta: "¿Qué mensaje sin confirmar podrías dejar de reenviar hoy?",
    },
  },
];
