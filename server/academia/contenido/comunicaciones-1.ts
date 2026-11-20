/**
 * Especialidad Comunicaciones y medios · Materia 1 — Evangelismo en redes (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el evangelio en el mundo digital (con los
 * datos del Centro de Investigaciones Pew de su encuesta de 2023, comprobados), conocer a la gente que está en las redes,
 * el contenido que edifica, de la pantalla a la mesa, las redes de la iglesia con su política (con la ley COPPA,
 * comprobada) y medir con sabiduría. No repite Evangelismo personal avanzado ni Evangelismo entre jóvenes.
 */
import type { LeccionContenido } from "../tipos";

export const COMUNICACIONES_1: LeccionContenido[] = [
  {
    id: "comunicaciones-1-1",
    objetivos: [
      "Explicar por qué las redes son hoy una plaza donde se puede anunciar el evangelio.",
      "Explicar, con Mateo 10:27 y con Pablo en la plaza de Atenas, el llamado a hablar donde está la gente.",
      "Dar los primeros pasos de una iglesia en las redes, con un propósito claro.",
    ],
    paraEmpezar:
      "Hoy mucha gente pasa horas cada día en el teléfono: ve videos, lee mensajes y conversa en las redes. Allí también se hacen preguntas sobre Dios. La iglesia no reemplaza el templo con una pantalla, pero puede llevar el evangelio a donde está la gente.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 10:27" },
      {
        t: "parrafo",
        texto:
          "Jesús les dijo a sus discípulos: «Lo que os digo en tinieblas, decidlo en la luz; y lo que oís al oído, proclamadlo desde las azoteas». Las azoteas eran el lugar desde donde se anunciaba algo a todo el pueblo.",
      },
      { t: "versiculo", ref: "Hechos 17:17" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo no se quedó solo en la sinagoga: hablaba «en la plaza cada día con los que concurrían». La plaza era el lugar donde la gente se encontraba y conversaba.",
      },
      { t: "versiculo", ref: "1 Corintios 9:22" },
      {
        t: "parrafo",
        texto:
          "Pablo se acercaba a cada persona sin cambiar el mensaje: «a todos me he hecho de todo, para que de todos modos salve a algunos».",
      },
      { t: "subtitulo", texto: "Las redes de hoy" },
      {
        t: "parrafo",
        texto:
          "Según el Centro de Investigaciones Pew, en una encuesta de 2023 en los Estados Unidos, YouTube y Facebook eran las plataformas más usadas por los adultos, y entre los adultos hispanos el 54 % usaba WhatsApp y el 49 % TikTok. Cada red tiene su manera de hablar: no se comparte igual en un grupo de WhatsApp que en un video corto.",
      },
      { t: "subtitulo", texto: "Comparación: la plaza de Atenas y la plaza digital" },
      {
        t: "lista",
        items: [
          "En Atenas: Pablo hablaba con los que pasaban. En las redes: cada publicación la ven personas que no van a la iglesia.",
          "En Atenas: había muchas voces y muchas ideas. En las redes: el evangelio compite con miles de mensajes cada día.",
          "En Atenas: unos se burlaron, otros quisieron oír más y algunos creyeron. En las redes: también habrá burlas, preguntas y personas que buscan a Dios.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: los primeros pasos de una iglesia en las redes" },
      {
        t: "parrafo",
        texto:
          "La iglesia El Buen Pastor, de unos ochenta miembros, quiere empezar a compartir el evangelio en las redes, pero no sabe por dónde empezar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y escribir para qué estarán en las redes: anunciar a Cristo, invitar a la iglesia y acompañar a las personas.",
          "Paso 2, preguntarse a quién quieren alcanzar: los vecinos del barrio, las familias jóvenes, los que no hablan inglés.",
          "Paso 3, elegir una o dos redes donde esa gente ya está, en vez de abrir cuentas en todas.",
          "Paso 4, formar un equipo pequeño con el permiso del pastor, sin dejar las cuentas en manos de una sola persona.",
          "Paso 5, empezar con algo sencillo y constante, como un versículo y una reflexión corta cada semana.",
          "Paso 6, responder a cada persona que escriba, y después de unos meses revisar qué se aprendió.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las redes no reemplazan a la iglesia reunida: ayudan a que más personas lleguen a ella. Lo que se publica es parte del testimonio de la iglesia, y por eso se cuida tanto como un sermón.",
      },
    ],
    ideaClave:
      "Jesús mandó proclamar desde las azoteas lo que oímos de él, y Pablo hablaba en la plaza cada día con los que pasaban, haciéndose a todos de todo sin cambiar el mensaje. Hoy las redes son una plaza donde está la gente, y cada red tiene su manera de hablar. La iglesia empieza con un propósito claro, sabe a quién quiere alcanzar, elige pocas redes, trabaja en equipo, publica con constancia y responde a las personas.",
    paraLaVida: {
      texto: "Lo que Cristo me dijo al oído, lo puedo anunciar en la plaza de hoy.",
      pregunta: "¿A quién de tus contactos le podrías compartir hoy algo de Cristo?",
    },
  },
  {
    id: "comunicaciones-1-2",
    objetivos: [
      "Explicar, con Pablo en el Areópago, por qué hay que conocer a las personas antes de hablarles.",
      "Escuchar a la gente de las redes como Jesús escuchó a la samaritana.",
      "Hacer el retrato de una persona a la que la iglesia quiere alcanzar.",
    ],
    paraEmpezar:
      "En las redes es fácil hablar sin escuchar, y el que no conoce a la gente termina contestando preguntas que nadie hizo. Antes de publicar, la iglesia necesita conocer a las personas: qué viven, qué preguntan y qué les duele.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "Antes de hablar en el Areópago, Pablo observó la ciudad: «pasando y mirando vuestros santuarios, hallé también un altar». Partió de lo que ellos conocían para anunciarles al Dios que no conocían.",
      },
      { t: "versiculo", ref: "Juan 4:7-10" },
      {
        t: "parrafo",
        texto:
          "Jesús empezó la conversación con la samaritana por algo de todos los días: «Dame de beber». De ahí la llevó a hablar del «agua viva».",
      },
      { t: "versiculo", ref: "1 Pedro 3:15" },
      {
        t: "parrafo",
        texto:
          "Y la Biblia pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros».",
      },
      { t: "subtitulo", texto: "Qué preguntarse antes de publicar" },
      {
        t: "lista",
        items: [
          "¿A quién le hablamos: qué edad tiene, dónde vive, qué idioma habla?",
          "¿Qué vive esa persona: el trabajo, la familia, la soledad, la migración, las deudas, una enfermedad?",
          "¿Qué pregunta sobre Dios, sobre la vida y sobre la iglesia?",
          "¿Qué red usa, y a qué hora la mira?",
          "¿Qué palabras entiende, y cuáles son solo de la iglesia?",
        ],
      },
      { t: "subtitulo", texto: "Comparación: hablarle a la gente y hablar con la gente" },
      {
        t: "lista",
        items: [
          "Hablarle: publica lo que quiere decir. Hablar con: publica lo que responde a lo que la gente pregunta.",
          "Hablarle: usa palabras de la iglesia, como santificación o unción, sin explicarlas. Hablar con: usa palabras de todos los días.",
          "Hablarle: no lee los comentarios. Hablar con: escucha, pregunta y responde.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el retrato de una persona" },
      {
        t: "parrafo",
        texto:
          "El equipo de redes de la iglesia quiere alcanzar a las madres jóvenes del barrio, y hace el retrato de una persona para pensar en ella cada vez que publique.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, darle un nombre y una historia: Laura, de 29 años, trabaja en una tienda y cría sola a dos niños.",
          "Paso 2, escribir lo que vive: está cansada, le preocupa el dinero y se siente sola.",
          "Paso 3, escribir lo que pregunta: si Dios la ve, cómo criar a sus hijos y dónde encontrar ayuda.",
          "Paso 4, anotar qué red usa y cuándo: Facebook y WhatsApp, de noche, cuando los niños se duermen.",
          "Paso 5, planear lo que le serviría: un versículo de ánimo, un consejo para la crianza y la invitación al grupo de madres.",
          "Paso 6, preguntarles a madres reales de la iglesia si el retrato se parece a lo que viven, y corregirlo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El retrato sirve para pensar en personas reales, no para encasillarlas. Nunca se usan los datos privados de alguien para armarlo, y el equipo escucha también a los que piensan distinto.",
      },
    ],
    ideaClave:
      "Pablo observó la ciudad antes de hablar en el Areópago, Jesús empezó con la samaritana por algo de todos los días, y la Biblia pide estar preparados para responder con mansedumbre. Antes de publicar, la iglesia se pregunta a quién le habla, qué vive, qué pregunta, qué red usa y qué palabras entiende. Habla con la gente y no solo le habla, y hace el retrato de una persona para no olvidar a quién quiere alcanzar.",
    paraLaVida: {
      texto: "Antes de hablar, escucho.",
      pregunta: "¿Qué pregunta sobre Dios le has oído a alguien que no va a la iglesia?",
    },
  },
  {
    id: "comunicaciones-1-3",
    objetivos: [
      "Explicar, con Proverbios 25:11 y Colosenses 4:6, cómo es una palabra que edifica en las redes.",
      "Elegir el formato que conviene a cada mensaje: un texto, una imagen, un video corto o una transmisión.",
      "Planear una semana de publicaciones con propósito.",
    ],
    paraEmpezar:
      "En las redes se publican millones de mensajes cada día. Lo que la iglesia comparte tiene que ser verdadero, claro y útil para la vida, y tiene que decirse en el formato que la gente sí mira.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AG4jqCUapng", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Proverbios 25:11" },
      {
        t: "parrafo",
        texto:
          "«Manzana de oro con figuras de plata Es la palabra dicha como conviene». La palabra correcta, en el momento justo, es un regalo.",
      },
      { t: "versiculo", ref: "Colosenses 4:6" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno».",
      },
      { t: "versiculo", ref: "Filipenses 4:8" },
      {
        t: "parrafo",
        texto:
          "Y da una medida para todo lo que publicamos: «todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre».",
      },
      { t: "subtitulo", texto: "Los formatos y para qué sirven" },
      {
        t: "lista",
        items: [
          "Un texto corto o una imagen con un versículo: para animar, y para que se comparta.",
          "Un video corto: para contar un testimonio o explicar una idea en menos de un minuto.",
          "Una transmisión en vivo: para el culto o un estudio bíblico, con alguien que conversa en el chat.",
          "Un mensaje en un grupo de WhatsApp: para avisar, orar juntos y cuidar a los que ya conocemos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el contenido que edifica y el que solo llama la atención" },
      {
        t: "lista",
        items: [
          "Edifica: dice la verdad completa. Solo llama la atención: exagera o promete milagros para ganar vistas.",
          "Edifica: muestra a Cristo. Solo llama la atención: muestra al predicador o a la iglesia.",
          "Edifica: anima y enseña. Solo llama la atención: busca pelea con otros para que lo compartan.",
          "Edifica: da crédito y respeta los derechos de autor. Solo llama la atención: usa música o imágenes ajenas sin permiso.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una semana de publicaciones" },
      {
        t: "parrafo",
        texto:
          "El equipo de redes planea una semana para la serie del mes, sobre el cuidado de Dios.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, el lunes, una imagen con Mateo 6:26 y una pregunta: ¿qué te preocupa hoy?",
          "Paso 2, el miércoles, un video corto de un hermano que cuenta cómo Dios lo sostuvo cuando perdió su trabajo, con su permiso.",
          "Paso 3, el viernes, una invitación al culto del domingo, con la hora, la dirección y una foto del lugar.",
          "Paso 4, el domingo, la transmisión del culto, con alguien del equipo que salude y responda en el chat.",
          "Paso 5, revisar cada publicación antes de subirla: que sea verdadera, clara, con gracia y sin errores.",
          "Paso 6, al final de la semana, leer los comentarios y los mensajes, y responder a cada persona.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La música, las fotos y los videos tienen dueño. Para publicar un culto con canciones hace falta la licencia que corresponde, y para usar una foto o una canción ajena hace falta permiso; esto se estudia en Video y transmisiones.",
      },
    ],
    ideaClave:
      "La palabra dicha como conviene es una manzana de oro, la Biblia pide que hablemos siempre con gracia, y Filipenses 4:8 da la medida: lo verdadero, lo honesto, lo justo, lo puro y lo amable. Cada formato sirve para algo: el texto y la imagen animan, el video corto cuenta, la transmisión reúne y el grupo de WhatsApp cuida. La iglesia publica lo que edifica y no lo que solo llama la atención, planea su semana con propósito y revisa cada publicación antes de subirla.",
    paraLaVida: {
      texto: "Antes de publicar, me pregunto si es verdadero, si es amable y si edifica.",
      pregunta: "¿Qué versículo te gustaría compartir esta semana, y con quién?",
    },
  },
  {
    id: "comunicaciones-1-4",
    objetivos: [
      "Explicar, con el venid y ved de Jesús, por qué el evangelismo en redes busca un encuentro personal.",
      "Responder con amor los comentarios y los mensajes privados.",
      "Acompañar a una persona que escribe que quiere conocer a Dios, hasta la comunidad de la iglesia.",
    ],
    paraEmpezar:
      "Una publicación puede despertar una pregunta, pero la fe crece en las relaciones. El evangelismo en redes no termina con un me gusta: busca una conversación, una visita y un lugar en la mesa de la iglesia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 1:39" },
      {
        t: "parrafo",
        texto:
          "Cuando dos discípulos de Juan quisieron saber dónde vivía Jesús, él les respondió: «Venid y ved». Fueron, y «se quedaron con él aquel día».",
      },
      { t: "versiculo", ref: "Hechos 8:30-31" },
      {
        t: "parrafo",
        texto:
          "El etíope leía a Isaías y no lo entendía. Felipe se acercó y le preguntó: «Pero ¿entiendes lo que lees?». Muchos que leen algo de la Biblia en las redes también necesitan a alguien que les explique.",
      },
      { t: "versiculo", ref: "Hechos 2:46-47" },
      {
        t: "parrafo",
        texto:
          "La primera iglesia se reunía en el templo y en las casas, y «el Señor añadía cada día a la iglesia los que habían de ser salvos».",
      },
      { t: "subtitulo", texto: "Cómo responder en las redes" },
      {
        t: "lista",
        items: [
          "A tiempo: responder los mensajes en uno o dos días, y avisar si se va a tardar más.",
          "Con amor: saludar por su nombre, agradecer que escribió y responder lo que preguntó.",
          "Con paciencia: no discutir en los comentarios; si alguien ataca, responder una vez con mansedumbre o invitarlo a conversar en privado.",
          "Con cuidado: no publicar los pedidos de oración con nombres ni detalles sin permiso.",
          "Con prudencia: con los menores de edad no se conversa en privado; se los anima a hablar con sus padres y se avisa a un líder.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el seguimiento que acompaña y el que se olvida" },
      {
        t: "lista",
        items: [
          "Acompaña: responde, y ofrece orar, una llamada o un café. Se olvida: da un me gusta y nada más.",
          "Acompaña: presenta a la persona con alguien de la iglesia de su edad o de su barrio. Se olvida: le manda la dirección y espera que llegue sola.",
          "Acompaña: le escribe después de la visita para saber cómo está. Se olvida: no vuelve a escribirle.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: quiero saber más de Dios" },
      {
        t: "parrafo",
        texto:
          "Un hombre le escribe a la página de la iglesia a las once de la noche: vi su video y quiero saber más de Dios, pero me da vergüenza ir a una iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, responderle esa misma noche o a la mañana siguiente, con su nombre y con cariño.",
          "Paso 2, preguntarle qué le llamó la atención del video y qué está viviendo, y escucharlo.",
          "Paso 3, compartirle con sencillez quién es Jesús, y ofrecerle orar por él.",
          "Paso 4, invitarlo a un paso fácil: un estudio bíblico en línea, un café con un hermano o el culto, con alguien que lo reciba en la puerta.",
          "Paso 5, presentarlo con un hermano de su edad que le escriba antes del domingo y lo espere.",
          "Paso 6, después de la primera visita, escribirle para saber cómo le fue, y seguir acompañándolo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las conversaciones con hombres las atienden hombres, y las de mujeres, mujeres, siempre desde las cuentas de la iglesia y no desde cuentas personales. Si alguien habla de quitarse la vida, se busca ayuda enseguida: en los Estados Unidos se puede llamar o enviar un mensaje de texto al 988.",
      },
      {
        t: "pasos",
        titulo: "De la pantalla a la mesa: el camino de una conversación",
        pasos: [
          {
            titulo: "Responder a tiempo",
            texto: "En uno o dos días, con el nombre de la persona y con cariño, agradeciendo que escribió y respondiendo lo que preguntó.",
          },
          {
            titulo: "Escuchar",
            texto: "Preguntarle qué le llamó la atención y qué está viviendo, como Felipe, que se acercó al que leía sin entender (Hechos 8:30-31).",
          },
          {
            titulo: "Compartir y orar",
            texto: "Contarle con sencillez quién es Jesús y ofrecerle orar por ella, sin discutir en los comentarios.",
          },
          {
            titulo: "Invitar a un paso fácil",
            texto: "Un estudio bíblico, un café con un hermano o el culto, porque Jesús dijo: venid y ved (Juan 1:39).",
          },
          {
            titulo: "Presentarla con alguien",
            texto: "Un hermano de su edad o de su barrio que le escriba antes del domingo y la reciba en la puerta.",
          },
          {
            titulo: "Seguir acompañando",
            texto: "Escribirle después de la primera visita y seguir a su lado, como el Señor añadía cada día a la iglesia (Hechos 2:46-47).",
          },
        ],
      },
    ],
    ideaClave:
      "Jesús dijo venid y ved, Felipe se acercó al que leía sin entender, y el Señor añadía a la iglesia a los que se salvaban. En las redes se responde a tiempo, con amor, con paciencia, con cuidado y con prudencia, sin conversar en privado con menores. El seguimiento acompaña: escucha, ora, presenta a la persona con alguien de la iglesia y sigue a su lado después de la primera visita, para que pase de la pantalla a la mesa.",
    paraLaVida: {
      texto: "Una publicación abre la puerta; una relación invita a entrar.",
      pregunta: "¿A quién podrías invitar esta semana a dar un paso más?",
    },
  },
  {
    id: "comunicaciones-1-5",
    objetivos: [
      "Explicar, con 1 Corintios 14:40, por qué las redes de la iglesia necesitan orden.",
      "Proteger a los niños y la privacidad de todos al publicar fotos y videos.",
      "Escribir una política sencilla de redes para la iglesia.",
    ],
    paraEmpezar:
      "Las cuentas de la iglesia hablan en nombre de toda la congregación. Si no hay reglas claras, una publicación descuidada, la foto de un niño sin permiso o una cuenta robada pueden hacer mucho daño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "Pablo cierra su enseñanza sobre el culto con una regla para todo: «pero hágase todo decentemente y con orden».",
      },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto:
          "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño». Prevenir también es sabiduría.",
      },
      { t: "versiculo", ref: "Mateo 18:10" },
      {
        t: "parrafo",
        texto: "Jesús pidió cuidar a los niños: «Mirad que no menospreciéis a uno de estos pequeños».",
      },
      { t: "subtitulo", texto: "Lo que debe decir la política de redes" },
      {
        t: "lista",
        items: [
          "Quién publica: un equipo con el permiso del pastor, y al menos dos personas con acceso a cada cuenta.",
          "Cómo se cuidan las cuentas: contraseñas largas y distintas, guardadas en un lugar seguro, y la verificación en dos pasos.",
          "Los niños: no se publican fotos de menores sin el permiso escrito de sus padres, y nunca con su nombre completo ni con datos de dónde estudian o viven.",
          "Los adultos: se respeta a quien no quiere salir en una foto, y se quita una foto si alguien lo pide.",
          "Los pedidos de oración y los testimonios: solo con permiso, y sin detalles que expongan a nadie.",
          "Las respuestas: con amor y sin discutir; los temas delicados, en privado.",
        ],
      },
      { t: "subtitulo", texto: "Los niños en internet" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos, la ley COPPA pide que los sitios y los servicios dirigidos a menores de 13 años tengan el permiso verificable de los padres antes de recoger sus datos, y por eso la mayoría de las redes piden al menos 13 años. La iglesia no abre cuentas para los niños ni les pide sus datos por internet sin sus padres.",
      },
      { t: "subtitulo", texto: "Comparación: unas redes con orden y unas redes sin orden" },
      {
        t: "lista",
        items: [
          "Con orden: varias personas tienen acceso y rinden cuentas. Sin orden: una sola persona tiene la contraseña, y si se va, la cuenta se pierde.",
          "Con orden: cada foto de un niño tiene el permiso de sus padres. Sin orden: se suben todas las fotos del campamento con los nombres.",
          "Con orden: se revisa antes de publicar. Sin orden: se publica con enojo o con prisa.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: escribir la política de redes" },
      {
        t: "parrafo",
        texto:
          "El pastor le pide al equipo de comunicaciones que escriba una política de redes de una página para presentarla a los líderes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escribir el propósito: anunciar a Cristo, invitar a la iglesia y cuidar a la congregación.",
          "Paso 2, nombrar el equipo, quién aprueba lo que se publica y quiénes tienen acceso a cada cuenta.",
          "Paso 3, escribir las reglas de seguridad: las contraseñas, la verificación en dos pasos y qué hacer si roban una cuenta.",
          "Paso 4, escribir las reglas de las fotos: el permiso escrito para los niños, sin nombres, y quitar una foto cuando alguien lo pida.",
          "Paso 5, escribir cómo se responde y qué se hace con los temas delicados, como un abuso o un pedido de ayuda urgente.",
          "Paso 6, presentarla a los líderes, firmarla, guardarla y revisarla cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si alguien cuenta en las redes que un niño sufre abuso, no se discute en público: se reporta enseguida a las autoridades, como pide la ley de Texas, y se avisa al pastor. La política es una guía general, no un consejo legal.",
      },
      {
        t: "cuadro",
        titulo: "La política de redes de la iglesia en una mirada",
        columnas: ["Tema", "Qué dice la política", "Por qué"],
        filas: [
          ["Quién publica", "Un equipo con el permiso del pastor, y al menos dos personas con acceso a cada cuenta", "Para que haya orden y nadie se lleve la cuenta (1 Corintios 14:40)"],
          ["Las cuentas", "Contraseñas largas y distintas, guardadas en un lugar seguro, y la verificación en dos pasos", "El avisado ve el mal y se previene (Proverbios 22:3)"],
          ["Los niños", "Sus fotos, solo con el permiso escrito de sus padres, sin su nombre ni dónde estudian o viven", "Jesús pide no menospreciar a los pequeños (Mateo 18:10)"],
          ["Los adultos", "Se respeta a quien no quiere salir, y se quita una foto si alguien lo pide", "Por respeto a cada persona"],
          ["Los pedidos de oración", "Solo con permiso, y sin detalles que expongan a nadie", "Para guardar la confianza de cada uno"],
          ["Las respuestas", "Con amor y sin discutir; los temas delicados, en privado", "Para que las redes muestren el amor de Cristo"],
        ],
      },
    ],
    ideaClave:
      "Todo se hace decentemente y con orden, el avisado ve el mal y se previene, y Jesús pide no menospreciar a los pequeños. La iglesia escribe una política de redes: quién publica y quién tiene acceso, cómo se cuidan las cuentas, el permiso escrito de los padres para las fotos de los niños, sin sus nombres, el respeto a quien no quiere salir y cómo se responde. La ley COPPA protege a los menores de 13 años, y la iglesia no recoge datos de los niños sin sus padres.",
    paraLaVida: {
      texto: "Cuidar a los pequeños también es cuidar lo que publicamos.",
      pregunta: "¿Tu iglesia tiene por escrito quién publica y cómo se cuidan las fotos de los niños?",
    },
  },
  {
    id: "comunicaciones-1-6",
    objetivos: [
      "Explicar, con 1 Corintios 3:6-7, que Dios da el crecimiento aunque nosotros sembremos y reguemos.",
      "Distinguir los números que importan de los que solo halagan.",
      "Leer los números de un mes y decidir qué mejorar.",
    ],
    paraEmpezar:
      "Las redes muestran números todo el tiempo: vistas, me gusta, seguidores. Esos números pueden ayudar a mejorar, pero también pueden volverse un ídolo o un desánimo. El que siembra en las redes necesita sabiduría para medir y paciencia para perseverar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 3:6-7" },
      {
        t: "parrafo",
        texto: "Pablo explicó: «Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios».",
      },
      { t: "versiculo", ref: "Gálatas 6:9" },
      {
        t: "parrafo",
        texto:
          "Y anima a no rendirse: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos».",
      },
      { t: "versiculo", ref: "Isaías 55:11" },
      {
        t: "parrafo",
        texto: "Dios promete que su palabra «no volverá a mí vacía, sino que hará lo que yo quiero».",
      },
      { t: "subtitulo", texto: "Los números que importan" },
      {
        t: "lista",
        items: [
          "El alcance y las vistas: cuántas personas vieron algo. Sirven para saber si el mensaje llega.",
          "Las conversaciones: cuántas personas comentaron o escribieron. Muestran si el mensaje toca a la gente.",
          "Los pasos: cuántas personas pidieron oración, vinieron a un estudio o visitaron la iglesia.",
          "El fruto: cuántas siguen viniendo, crecen en su fe y sirven, que es lo que Dios hace con el tiempo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: medir con sabiduría y medir con vanidad" },
      {
        t: "lista",
        items: [
          "Con sabiduría: mira las conversaciones y los pasos. Con vanidad: solo mira los me gusta.",
          "Con sabiduría: aprende de lo que no funcionó. Con vanidad: se desanima o se compara con otras iglesias.",
          "Con sabiduría: le da la gloria a Dios por el fruto. Con vanidad: se la queda para sí.",
          "Con sabiduría: nunca compra seguidores ni infla los números. Con vanidad: busca parecer más grande de lo que es.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: leer los números del mes" },
      {
        t: "parrafo",
        texto:
          "Después de tres meses en las redes, el equipo se reúne con el pastor para revisar los números de octubre: muchas vistas en los videos cortos, pocas en los textos largos, doce mensajes privados y tres personas que visitaron la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y darle gracias a Dios por cada persona, no solo por los números.",
          "Paso 2, ver qué publicaciones abrieron conversaciones: los testimonios cortos dieron más mensajes.",
          "Paso 3, ver qué no funcionó: los textos largos casi no se leyeron, así que se acortarán.",
          "Paso 4, revisar el seguimiento: de los doce mensajes, tres llegaron a la iglesia; preguntar qué pasó con los demás.",
          "Paso 5, decidir un solo cambio para el mes siguiente, como un testimonio corto cada semana.",
          "Paso 6, seguir sembrando con paciencia, y volver a revisar en un mes.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los números no miden la fidelidad de un equipo ni el valor de una persona. Una iglesia pequeña que acompaña bien a cinco personas hace más que una cuenta con miles de seguidores que nadie atiende.",
      },
    ],
    ideaClave:
      "Nosotros plantamos y regamos, pero Dios da el crecimiento; no nos cansemos de hacer bien, y su palabra no vuelve vacía. Los números que importan son el alcance, las conversaciones, los pasos y el fruto. Se mide con sabiduría y no con vanidad: se aprende de lo que no funcionó, no se compara, no se compran seguidores y se le da la gloria a Dios. Cada mes se revisan los números, se decide un cambio y se sigue sembrando.",
    paraLaVida: {
      texto: "Yo siembro y riego; Dios da el crecimiento.",
      pregunta: "¿Qué semilla puedes sembrar hoy, aunque nadie la vea?",
    },
  },
];
