/**
 * Especialidad Ministerio pastoral · Materia 4 — Visitación y cuidado del rebaño (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El cuidado pastoral en la práctica: conocer a las ovejas (el mapa del rebaño), la visita en el hogar, la visita a los
 * enfermos y a los que se mueren, los ancianos, los presos y los que están solos, la búsqueda de la oveja perdida y un
 * plan de cuidado con toda la iglesia. Cada tarea trae su ejemplo resuelto paso a paso. Sigue el artículo 11 de la
 * declaración de fe (la sanidad divina) y deja por confirmar lo que la declaración deja por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const PASTORAL_4: LeccionContenido[] = [
  {
    id: "pastoral-4-1",
    objetivos: [
      "Explicar por qué el pastor conoce y visita a sus ovejas.",
      "Distinguir al buen pastor del asalariado.",
      "Armar un mapa del rebaño para que nadie quede sin cuidado.",
    ],
    paraEmpezar:
      "Un pastor puede predicar a cientos de personas y no conocer a ninguna. La Biblia pide algo más: conocer a cada oveja por su nombre y por su necesidad.",
    bloques: [
      { t: "versiculo", ref: "Juan 10:11-14" },
      {
        t: "parrafo",
        texto:
          "Jesús es el modelo: «Yo soy el buen pastor; y conozco mis ovejas, y las mías me conocen». El buen pastor «su vida da por las ovejas», mientras que el asalariado huye, «y no le importan las ovejas».",
      },
      { t: "versiculo", ref: "Proverbios 27:23" },
      {
        t: "parrafo",
        texto:
          "El sabio lo dice como un consejo práctico para quien cuida un rebaño: «Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños». Conocer el estado de cada uno pide tiempo, visitas y un oído atento.",
      },
      { t: "versiculo", ref: "Ezequiel 34:11-12" },
      {
        t: "parrafo",
        texto:
          "Dios mismo es el pastor que busca: «He aquí yo, yo mismo iré a buscar mis ovejas, y las reconoceré». El pastor de una iglesia imita a ese Pastor.",
      },
      { t: "versiculo", ref: "Jeremías 3:15" },
      {
        t: "parrafo",
        texto:
          "Y Dios promete «pastores según mi corazón, que os apacienten con ciencia y con inteligencia»: con corazón, y también con sabiduría y con orden.",
      },
      { t: "subtitulo", texto: "El buen pastor y el asalariado" },
      {
        t: "lista",
        items: [
          "El buen pastor conoce a sus ovejas por su nombre; el asalariado solo conoce los números.",
          "El buen pastor se queda cuando viene el peligro; el asalariado huye.",
          "El buen pastor busca a la que falta; al asalariado no le importa.",
          "El buen pastor sirve al rebaño; el asalariado se sirve del rebaño.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el mapa del rebaño" },
      {
        t: "lista",
        items: [
          "Hacer una lista de todos los miembros y de los que asisten, con su teléfono y su dirección.",
          "Asignar a cada persona a un grupo o a un líder que la cuide, para que nadie quede fuera.",
          "Marcar a los que necesitan más cuidado: los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir.",
          "Anotar las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos.",
          "Revisar el mapa cada mes con los líderes y orar por cada nombre.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Guarda los datos del rebaño con cuidado: solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso. Conocer a las ovejas es un privilegio, no un archivo de chismes.",
      },
    ],
    ideaClave:
      "Jesús, el buen pastor, conoce a sus ovejas y da su vida por ellas; el asalariado huye porque no le importan. El pastor imita a Dios, que busca a sus ovejas, y es diligente en conocer el estado de cada una. Para que nadie quede sin cuidado, arma un mapa del rebaño: cada persona con un líder, los que necesitan más atención marcados, las fechas importantes anotadas y una revisión cada mes, en oración.",
    paraLaVida: {
      texto: "Las ovejas no siguen a un pastor que no conocen.",
      pregunta: "¿Hay alguien en tu iglesia a quien nadie conoce de verdad?",
    },
  },
  {
    id: "pastoral-4-2",
    objetivos: [
      "Explicar el valor bíblico de la visita pastoral en las casas.",
      "Planear una visita con prudencia y con un propósito.",
      "Hacer una visita pastoral paso a paso.",
    ],
    paraEmpezar:
      "En una visita, el pastor ve lo que nunca vería desde el púlpito: la casa, la familia, las fotos en la pared y las cargas que no se cuentan el domingo.",
    bloques: [
      { t: "versiculo", ref: "Hechos 20:20" },
      {
        t: "parrafo",
        texto:
          "Pablo enseñó «públicamente y por las casas». La enseñanza desde el púlpito y la visita a las casas van juntas.",
      },
      { t: "versiculo", ref: "Lucas 19:5-6" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo se invitó a la casa de Zaqueo: «hoy es necesario que pose yo en tu casa», y Zaqueo «le recibió gozoso». Esa visita le cambió la vida.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 2:7-8" },
      {
        t: "parrafo",
        texto:
          "Pablo cuidaba a los creyentes «como la nodriza que cuida con ternura a sus propios hijos», y quería entregarles «no sólo el evangelio de Dios, sino también nuestras propias vidas». La visita es el evangelio con tiempo y con cariño.",
      },
      { t: "subtitulo", texto: "Antes de ir" },
      {
        t: "lista",
        items: [
          "Tener un propósito: conocer a una familia nueva, acompañar una crisis, celebrar un nacimiento o animar a alguien que se alejó.",
          "Llamar antes y acordar el día y la hora.",
          "Ir de a dos, y nunca solo a la casa de una persona del otro sexo ni a la de un menor.",
          "Orar antes de llegar por la persona y por lo que van a encontrar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una visita paso a paso" },
      {
        t: "lista",
        items: [
          "Saludar, agradecer que los reciban y conversar de la vida de la familia.",
          "Escuchar más que hablar: preguntar cómo están de verdad y qué necesitan.",
          "Leer un pasaje breve que responda a lo que escucharon, como un salmo.",
          "Orar por cada persona de la casa, por su nombre.",
          "Ofrecer ayuda práctica si hace falta y acordar el siguiente paso.",
          "Despedirse a tiempo: de veinte a treinta minutos suelen bastar.",
          "Después, anotar con discreción lo que haya que recordar y avisar al líder de su grupo.",
        ],
      },
      { t: "versiculo", ref: "Romanos 12:13" },
      {
        t: "parrafo",
        texto:
          "La visita también abre la puerta a la ayuda: «compartiendo para las necesidades de los santos; practicando la hospitalidad». A veces lo que más predica es una bolsa de comida o una mano para arreglar algo.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No uses la visita para cobrar diezmos ni para pedir favores. Y si en una casa descubres violencia, abuso o un riesgo para la vida, no lo guardes: actúa como pide la ley y busca ayuda.",
      },
    ],
    ideaClave:
      "Pablo enseñó públicamente y por las casas, y Jesús entró en la casa de Zaqueo. La visita pastoral es el evangelio con tiempo y con cariño. Se prepara con un propósito, una llamada previa y oración, y se hace de a dos, con prudencia. En la casa se escucha más de lo que se habla, se lee un pasaje breve, se ora por cada persona, se ofrece ayuda y se acuerda el siguiente paso. Y después se anota con discreción.",
    paraLaVida: {
      texto: "Una visita a tiempo puede valer más que diez sermones.",
      pregunta: "¿A qué familia de tu iglesia nunca la ha visitado nadie?",
    },
  },
  {
    id: "pastoral-4-3",
    objetivos: [
      "Explicar lo que pide Santiago 5 cuando un creyente está enfermo.",
      "Visitar a un enfermo en el hospital con respeto y prudencia.",
      "Acompañar a un enfermo grave o a quien se está muriendo, y a su familia.",
    ],
    paraEmpezar:
      "En un hospital, la visita del pastor le recuerda al enfermo que no está solo y que Dios no lo olvidó.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Mateo 25:35-36" },
      {
        t: "parrafo",
        texto:
          "Jesús cuenta la visita al enfermo como hecha a él mismo: «enfermo, y me visitasteis».",
      },
      { t: "versiculo", ref: "Santiago 5:14-15" },
      {
        t: "parrafo",
        texto:
          "Santiago dice qué hacer: «¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor». Y promete: «la oración de fe salvará al enfermo, y el Señor lo levantará».",
      },
      {
        t: "nota",
        titulo: "La declaración de fe",
        texto:
          "La declaración de fe del ministerio enseña que Dios sana hoy en respuesta a la oración de fe, que la sanidad se ministra con la oración y la unción con aceite, y que buscar la sanidad de Dios no se opone a recibir atención médica (artículo 11). Queda por confirmar si se enseña que la sanidad está provista en la expiación, como enseña el pentecostalismo clásico, o si se presenta solo como una promesa de Dios en respuesta a la oración.",
      },
      { t: "versiculo", ref: "2 Corintios 12:9" },
      {
        t: "parrafo",
        texto:
          "El pastor ora con fe y deja el resultado en las manos de Dios. Cuando la sanidad no llega, la gracia sí: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una visita al hospital" },
      {
        t: "lista",
        items: [
          "Pregunta en la recepción o a la enfermera si puedes pasar: el hospital protege la privacidad del paciente y puede pedirte que te identifiques como su pastor.",
          "Lávate las manos al entrar y al salir, y respeta los avisos de aislamiento.",
          "Toca a la puerta, preséntate y pregunta si es buen momento.",
          "No te sientes en la cama ni toques los aparatos, y no des consejos médicos.",
          "Escucha, lee un pasaje breve, como el Salmo 23, y ora con fe; si lo piden, unge con aceite junto con otro anciano.",
          "Sé breve: de diez a quince minutos, o menos si la persona está cansada.",
          "Cuida también a la familia que espera en el pasillo.",
        ],
      },
      { t: "versiculo", ref: "Juan 14:1-3" },
      {
        t: "parrafo",
        texto:
          "Junto a quien se está muriendo, el pastor lee las promesas de Jesús: «No se turbe vuestro corazón; creéis en Dios, creed también en mí». Ora, canta en voz baja si la familia lo desea, le recuerda el evangelio y acompaña a los suyos.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si la persona entra en cuidados paliativos (hospice), visítala más seguido y coordina con el capellán o con el equipo médico. No prometas una sanidad que Dios no prometió, ni quites la esperanza: ora con fe y acompaña con amor.",
      },
    ],
    ideaClave:
      "Visitar al enfermo es visitar a Cristo. Santiago pide llamar a los ancianos para que oren con fe y unjan con aceite, y la declaración de fe del ministerio enseña que Dios sana hoy en respuesta a la oración, sin oponerse a la atención médica; si la sanidad está provista en la expiación es un punto por confirmar. En el hospital, el pastor respeta las reglas, es breve, escucha, lee y ora, y cuida a la familia. Junto a quien se muere, lee las promesas de Jesús y acompaña.",
    paraLaVida: {
      texto: "En el hospital, la presencia del pastor dice: Dios no te olvidó.",
      pregunta: "¿Quién de tu iglesia está enfermo y todavía no ha recibido una visita?",
    },
  },
  {
    id: "pastoral-4-4",
    objetivos: [
      "Explicar el mandato bíblico de visitar a los que no pueden venir.",
      "Planear el cuidado de los ancianos y de los que no salen de casa.",
      "Organizar con prudencia la visita a los presos.",
    ],
    paraEmpezar:
      "Hay ovejas que ya no pueden llegar a la iglesia: los ancianos, los enfermos que no salen de casa y los que están presos. Si la iglesia no va, se quedan solos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Santiago 1:27" },
      {
        t: "parrafo",
        texto:
          "La fe verdadera también se mide en visitas: «Visitar a los huérfanos y a las viudas en sus tribulaciones». Los que están solos son prioridad para Dios.",
      },
      { t: "versiculo", ref: "Levítico 19:32" },
      { t: "versiculo", ref: "Salmos 71:9" },
      {
        t: "parrafo",
        texto:
          "Dios manda: «Delante de las canas te levantarás, y honrarás el rostro del anciano». Y el anciano ora: «No me deseches en el tiempo de la vejez». La iglesia responde a esa oración cuando no olvida a sus mayores.",
      },
      { t: "subtitulo", texto: "Los que no salen de casa" },
      {
        t: "lista",
        items: [
          "Un calendario de visitas, para que cada uno reciba al menos una al mes.",
          "Llevarles la Santa Cena con un diácono.",
          "Llevarles la grabación del culto, o ayudarlos a verlo en línea.",
          "Llamarlos por teléfono entre visita y visita.",
          "Visitar también a los que viven en un asilo o en un centro de cuidado, avisando en la recepción y siguiendo sus horarios.",
        ],
      },
      { t: "versiculo", ref: "Hebreos 13:3" },
      { t: "versiculo", ref: "Mateo 25:35-36" },
      {
        t: "parrafo",
        texto:
          "«Acordaos de los presos, como si estuvierais presos juntamente con ellos». Jesús lo dice de sí mismo: «en la cárcel, y vinisteis a mí».",
      },
      { t: "versiculo", ref: "2 Timoteo 1:16" },
      {
        t: "parrafo",
        texto:
          "Onesíforo visitó a Pablo cuando estaba preso: «muchas veces me confortó, y no se avergonzó de mis cadenas».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: empezar a visitar la cárcel" },
      {
        t: "lista",
        items: [
          "Averiguar las reglas: las cárceles del condado y las prisiones del estado suelen pedir que los voluntarios se registren, pasen una revisión de antecedentes y reciban una capacitación.",
          "Coordinar con el capellán y seguir sus reglas al pie de la letra.",
          "Visitar a los presos de la iglesia y también a sus familias, que muchas veces quedan solas.",
          "No llevar ni recibir nada sin permiso, y no hacer promesas legales.",
          "Acompañar al preso cuando salga: la vuelta a la vida y a la iglesia también necesita un pastor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Forma un equipo para estas visitas: hay hermanos que no predican, pero tienen el don de acompañar. Y cuida a los que cuidan: quien atiende a un familiar enfermo o anciano también necesita que lo visiten.",
      },
    ],
    ideaClave:
      "La religión pura visita a los huérfanos y a las viudas, honra a los ancianos y se acuerda de los presos, porque lo que se hace por ellos se hace por Cristo. La iglesia arma un calendario para que los que no salen de casa reciban visitas, la Santa Cena y el culto, y visita los asilos según sus reglas. El ministerio en la cárcel se hace con el permiso, la capacitación y las reglas de cada lugar, y acompaña también a las familias y a quien sale libre.",
    paraLaVida: {
      texto: "Nadie debería envejecer, enfermar o estar preso sin que su iglesia lo visite.",
      pregunta: "¿A qué anciano o a qué preso de tu iglesia podrías visitar este mes?",
    },
  },
  {
    id: "pastoral-4-5",
    objetivos: [
      "Explicar el corazón del pastor que busca a la oveja que falta.",
      "Reconocer a tiempo a los que se están alejando, y por qué.",
      "Visitar a quien dejó de venir, sin acusar y con esperanza.",
    ],
    paraEmpezar:
      "Nadie se va de la iglesia de un día para otro. Primero falta un domingo, luego tres, y un día ya nadie pregunta por él.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 15:4-7" },
      {
        t: "parrafo",
        texto:
          "El pastor de la parábola deja las noventa y nueve «y va tras la que se perdió, hasta encontrarla». Y cuando la encuentra, no la regaña: «la pone sobre sus hombros gozoso».",
      },
      { t: "versiculo", ref: "Ezequiel 34:16" },
      {
        t: "parrafo",
        texto:
          "Dios hace lo que los malos pastores no hacían: «Yo buscaré la perdida, y haré volver al redil la descarriada».",
      },
      { t: "versiculo", ref: "Hebreos 10:24-25" },
      {
        t: "parrafo",
        texto:
          "La iglesia se cuida mutuamente: «considerémonos unos a otros», y no deja de congregarse, «como algunos tienen por costumbre».",
      },
      { t: "subtitulo", texto: "Por qué se alejan" },
      {
        t: "lista",
        items: [
          "Una herida: alguien de la iglesia los ofendió o se sintieron ignorados.",
          "Una crisis: una enfermedad, un duelo, el desempleo o un problema en la familia.",
          "Las dudas, o una fe que se enfrió.",
          "Un pecado que les da vergüenza.",
          "Un cambio: un trabajo con un horario nuevo, una mudanza o el cuidado de un familiar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: buscar a quien dejó de venir" },
      {
        t: "lista",
        items: [
          "Notar la ausencia: el líder del grupo avisa cuando alguien falta dos o tres semanas seguidas.",
          "Llamar sin reproches: Te extrañamos, ¿cómo estás?",
          "Visitar para escuchar: preguntar qué pasó y dejar que cuente su historia sin interrumpir.",
          "Responder a la causa: pedir perdón si la iglesia falló, acompañar la crisis o hablar con amor del pecado.",
          "Invitar a volver con un paso concreto, como reunirse en un grupo pequeño.",
          "Celebrar su regreso, sin hacerle sentir que tiene que dar explicaciones.",
        ],
      },
      { t: "versiculo", ref: "Santiago 5:19-20" },
      {
        t: "parrafo",
        texto:
          "Buscar al que se fue es una obra que salva: «el que haga volver al pecador del error de su camino, salvará de muerte un alma, y cubrirá multitud de pecados».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si alguien se fue a otra iglesia sana, bendícelo y despídelo en paz, sin hablar mal de él ni de su nueva iglesia. No todo el que se va se perdió; pero todo el que se va merece que alguien pregunte por él.",
      },
    ],
    ideaClave:
      "El buen pastor va tras la oveja que se perdió hasta encontrarla, y cuando la encuentra la carga con gozo. Nadie se va de golpe: se aleja por una herida, una crisis, las dudas, un pecado o un cambio de vida. La iglesia nota la ausencia a tiempo, llama sin reproches, visita para escuchar, responde a la causa, invita con un paso concreto y celebra el regreso. Y si alguien se va a otra iglesia sana, lo despide en paz.",
    paraLaVida: {
      texto: "Cada silla vacía tiene un nombre.",
      pregunta: "¿Quién dejó de venir a tu iglesia y todavía nadie lo ha llamado?",
    },
  },
  {
    id: "pastoral-4-6",
    objetivos: [
      "Explicar por qué el cuidado del rebaño es tarea de todo el cuerpo.",
      "Organizar equipos y líderes para que nadie quede sin cuidado.",
      "Formar a los que visitan y cuidar a los que cuidan.",
    ],
    paraEmpezar:
      "Ningún pastor puede visitar a todos. Pero una iglesia organizada puede hacer que nadie se quede sin visita.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 6:1-4" },
      {
        t: "parrafo",
        texto:
          "Cuando las viudas de los griegos «eran desatendidas en la distribución diaria», los apóstoles no lo hicieron todo solos. Dijeron: «No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas», y buscaron «siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría».",
      },
      { t: "versiculo", ref: "1 Corintios 12:25-26" },
      {
        t: "parrafo",
        texto:
          "En el cuerpo de Cristo, «los miembros todos se preocupen los unos por los otros», y «si un miembro padece, todos los miembros se duelen con él». El cuidado es tarea de todos.",
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "parrafo",
        texto:
          "Cada uno cuida con su don: «Cada uno según el don que ha recibido, minístrelo a los otros».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan de cuidado" },
      {
        t: "lista",
        items: [
          "Los líderes de grupo cuidan a las personas de su grupo y avisan cuando alguien falta o tiene una necesidad.",
          "Los diáconos atienden las necesidades prácticas: comidas, transporte o ayuda en una mudanza.",
          "Un equipo de visitación visita a los enfermos, a los ancianos y a los que no salen de casa.",
          "Un equipo de oración recibe los pedidos y ora con discreción.",
          "El pastor atiende las crisis más graves, forma a los líderes y revisa con ellos el mapa del rebaño cada mes.",
          "Un protocolo de crisis dice quién llama a quién cuando alguien muere, se enferma de gravedad o sufre una emergencia.",
        ],
      },
      { t: "versiculo", ref: "Gálatas 6:10" },
      {
        t: "parrafo",
        texto:
          "El cuidado empieza en la iglesia, pero no se queda ahí: «hagamos bien a todos, y mayormente a los de la familia de la fe».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso. Y cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten.",
      },
    ],
    ideaClave:
      "Los apóstoles no lo hicieron todo solos: eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra. En el cuerpo de Cristo todos se preocupan por todos, y cada uno sirve con su don. Un plan de cuidado reparte la tarea entre los líderes de grupo, los diáconos, un equipo de visitación, un equipo de oración y el pastor, con un protocolo para las crisis. El pastor forma a los que visitan y cuida a los que cuidan.",
    paraLaVida: {
      texto: "El pastor no tiene que llegar a todos; tiene que asegurarse de que alguien llegue.",
      pregunta: "¿Qué parte del plan de cuidado le falta a tu iglesia?",
    },
  },
];
