/**
 * Nivel 3 · Materia 10 — Cuidado y consejería básica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El primer nivel de ayuda, de hermano a hermano: escuchar, orar con otros y aconsejar con la Palabra, acompañar en el
 * duelo y en la crisis, saber cuándo derivar y proteger a los débiles, y la ética y el cuidado del que ayuda. No forma
 * consejeros profesionales: enseña a reconocer los límites y a pedir ayuda a tiempo. Lo que toca la ley (el deber de
 * reportar el abuso de un menor en Texas) y las líneas de ayuda (911, 988) se comprobaron en sus fuentes oficiales.
 */
import type { LeccionContenido } from "../tipos";

export const N3_CONSEJERIA_BASICA: LeccionContenido[] = [
  {
    id: "n3-consejeria-basica-1",
    objetivos: [
      "Explicar el llamado bíblico a sobrellevar las cargas los unos de los otros.",
      "Distinguir el cuidado entre hermanos, la consejería pastoral y la ayuda profesional.",
      "Reconocer los alcances y los límites de quien cuida y aconseja en la iglesia.",
    ],
    paraEmpezar:
      "Alguien de tu grupo te escribe a medianoche que ya no puede más. ¿Qué haces? Esta materia te prepara para responder con amor, con la Palabra y con prudencia.",
    bloques: [
      { t: "versiculo", ref: "Gálatas 6:2" },
      {
        t: "parrafo",
        texto:
          "Pablo manda: «Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo». Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo. Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Dios es el «Padre de misericordias y Dios de toda consolación». Él nos consuela en nuestras tribulaciones «para que podamos también nosotros consolar a los que están en cualquier tribulación». El consuelo que recibimos de Dios es el que compartimos con otros.",
      },
      { t: "subtitulo", texto: "Tres niveles de ayuda" },
      {
        t: "lista",
        items: [
          "El cuidado entre hermanos: escuchar, orar, animar con la Palabra y acompañar. Es para todo creyente, y es el centro de esta materia.",
          "La consejería pastoral: el pastor y los líderes preparados acompañan problemas más hondos, como las crisis de familia o el pecado que se repite.",
          "La ayuda profesional: médicos, psicólogos y consejeros profesionales atienden lo que pide una formación especial, como la depresión grave, las adicciones o los traumas.",
        ],
      },
      { t: "versiculo", ref: "Romanos 15:14" },
      {
        t: "parrafo",
        texto:
          "Pablo confiaba en que los creyentes de Roma estaban «llenos de bondad, llenos de todo conocimiento, de tal manera que podéis amonestaros los unos a los otros». Todo creyente maduro puede animar y aconsejar con la Palabra. Pero también hay que saber hasta dónde llega uno: no diagnosticamos enfermedades, no reemplazamos al médico ni al pastor, y no prometemos lo que no podemos cumplir.",
      },
      { t: "subtitulo", texto: "El modelo de Jesús" },
      { t: "versiculo", ref: "Isaías 9:6" },
      {
        t: "parrafo",
        texto:
          "El profeta anunció que el Mesías se llamaría «Admirable, Consejero». Jesús escuchaba, hacía preguntas, consolaba y decía la verdad con amor. Y prometió el Espíritu Santo, el Consolador, que nos ayuda a ayudar (Juan 14:16).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Cuidar no es controlar",
        texto:
          "Ayudar no es decidir por el otro ni meterse en todo. Acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones.",
      },
    ],
    ideaClave:
      "Todo creyente está llamado a sobrellevar las cargas de los otros (Gálatas 6:2) con el consuelo que recibe de Dios. Hay tres niveles de ayuda: el cuidado entre hermanos, la consejería pastoral y la ayuda profesional. Quien cuida sigue el modelo de Jesús, el Admirable Consejero, y conoce sus límites.",
    paraLaVida: {
      texto: "El consuelo que Dios te dio es para compartirlo.",
      pregunta: "¿Quién de tu grupo o de tu familia lleva una carga pesada, y cómo puedes ayudarle a llevarla esta semana?",
    },
  },
  {
    id: "n3-consejeria-basica-2",
    objetivos: [
      "Explicar por qué escuchar es el primer paso para ayudar, según Santiago 1:19 y Proverbios 18:13.",
      "Aplicar las habilidades para escuchar: atención, preguntas abiertas, reflejar y aceptar las emociones.",
      "Evitar los errores comunes al escuchar: interrumpir, juzgar y dar consejos rápidos.",
    ],
    paraEmpezar:
      "Muchas veces, la persona que sufre no necesita primero un consejo, sino alguien que la escuche de verdad. Escuchar bien es una forma de amar.",
    bloques: [
      { t: "versiculo", ref: "Santiago 1:19" },
      {
        t: "parrafo",
        texto:
          "Santiago pide que «todo hombre sea pronto para oír, tardo para hablar, tardo para airarse». Y Proverbios advierte: «Al que responde palabra antes de oír, Le es fatuidad y oprobio». Antes de hablar, hay que entender.",
      },
      { t: "versiculo", ref: "Proverbios 18:13" },
      { t: "subtitulo", texto: "Jesús escuchaba" },
      { t: "versiculo", ref: "Lucas 24:15-17" },
      {
        t: "parrafo",
        texto:
          "Camino a Emaús, Jesús se acercó a dos discípulos tristes y les preguntó: «¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?». Los dejó contar su dolor y solo después les abrió las Escrituras. Escuchar primero abre el corazón para recibir la Palabra.",
      },
      { t: "versiculo", ref: "Proverbios 20:5" },
      {
        t: "parrafo",
        texto:
          "«Como aguas profundas es el consejo en el corazón del hombre; Mas el hombre entendido lo alcanzará». Las buenas preguntas ayudan a sacar a la luz lo que la persona lleva dentro.",
      },
      { t: "subtitulo", texto: "Cómo escuchar" },
      {
        t: "lista",
        items: [
          "Da toda tu atención: guarda el teléfono, mira a la persona y busca un lugar tranquilo.",
          "Haz preguntas abiertas, que no se responden con sí o no: ¿cómo te sientes con eso?, ¿qué pasó después?",
          "Refleja lo que oyes: repite con tus palabras lo que entendiste, para que la persona sepa que la escuchas.",
          "Acepta sus emociones sin juzgarlas: la tristeza, el miedo o el enojo no se corrigen con un regaño.",
          "No interrumpas, no cuentes enseguida tu propia historia y no te apures a dar soluciones.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Romanos 12:15" },
      { t: "versiculo", ref: "Job 2:13" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Gozaos con los que se gozan; llorad con los que lloran». Los amigos de Job empezaron bien: se sentaron con él siete días en silencio, «porque veían que su dolor era muy grande». Se equivocaron después, cuando hablaron sin entender y lo culparon de su sufrimiento.",
      },
      {
        t: "nota",
        titulo: "El silencio también ayuda",
        texto:
          "No tienes que llenar cada silencio ni tener una respuesta para todo. A veces lo que más consuela es tu presencia.",
      },
    ],
    ideaClave:
      "Escuchar es el primer paso para ayudar: hay que ser pronto para oír y tardo para hablar (Santiago 1:19). Jesús escuchó a los de Emaús antes de enseñarles. Se escucha dando toda la atención, con preguntas abiertas, reflejando lo que se oye y aceptando las emociones, sin interrumpir, juzgar ni apurar consejos.",
    paraLaVida: {
      texto: "Escuchar bien es una forma de amar.",
      pregunta: "¿Qué te cuesta más al escuchar a otros, y qué vas a practicar esta semana?",
    },
  },
  {
    id: "n3-consejeria-basica-3",
    objetivos: [
      "Orar con la persona que sufre, de manera sencilla y sincera.",
      "Usar la Escritura con sabiduría y compasión para dar esperanza.",
      "Reconocer que la oración y la Palabra no se oponen a la ayuda médica.",
    ],
    paraEmpezar:
      "Decir que vas a orar por alguien es fácil. Detenerte a orar ahí mismo con esa persona puede cambiar su día.",
    bloques: [
      { t: "versiculo", ref: "Santiago 5:13-16" },
      {
        t: "parrafo",
        texto:
          "Santiago enseña a orar en toda situación: el afligido, que ore; el enfermo, que llame a los ancianos de la iglesia para que oren por él; y todos: «orad unos por otros, para que seáis sanados. La oración eficaz del justo puede mucho». Orar con alguien le recuerda que no está solo y que Dios escucha.",
      },
      { t: "subtitulo", texto: "Cómo orar con alguien" },
      {
        t: "lista",
        items: [
          "Pide permiso: ¿puedo orar contigo ahora?",
          "Ora corto y sencillo, con palabras que la persona entienda.",
          "Presenta a Dios lo que ella te contó, sin convertir la oración en un sermón.",
          "Pide paz, fortaleza y dirección, y da gracias por la fidelidad de Dios.",
        ],
      },
      { t: "versiculo", ref: "Filipenses 4:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña a llevar la ansiedad a Dios: «Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias». Y promete que la paz de Dios guardará el corazón y los pensamientos.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "La Palabra a su tiempo" },
      { t: "versiculo", ref: "Proverbios 25:11" },
      {
        t: "parrafo",
        texto:
          "«Manzana de oro con figuras de plata Es la palabra dicha como conviene». La Biblia consuela, corrige y da esperanza, pero se usa con sabiduría: un versículo lanzado sin escuchar puede herir. Escoge pocos pasajes, explícalos con amor y, si conviene, déjalos escritos para que la persona los lea otra vez.",
      },
      { t: "subtitulo", texto: "La fe y la medicina" },
      { t: "versiculo", ref: "Colosenses 4:14" },
      {
        t: "parrafo",
        texto:
          "La oración y la Palabra no se oponen a la ayuda médica. Lucas era «el médico amado», y Pablo le recomendó a Timoteo un remedio para su estómago (1 Timoteo 5:23). Oramos por los enfermos y confiamos en que Dios sana, y también animamos a la persona a seguir las indicaciones de su médico.",
      },
      {
        t: "nota",
        titulo: "Nunca le digas que le falta fe",
        texto:
          "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe. Pablo mismo dejó enfermo a Trófimo en Mileto (2 Timoteo 4:20). Acompaña, ora y sigue cerca.",
      },
    ],
    ideaClave:
      "Orar con la persona, de manera sencilla y sincera, le recuerda que Dios escucha: la oración eficaz del justo puede mucho (Santiago 5:16). La Palabra se usa con sabiduría y a su tiempo, para consolar y dar esperanza. La oración y la Palabra no se oponen a la ayuda médica, y nunca se culpa al que sufre de falta de fe.",
    paraLaVida: {
      texto: "Detente a orar con la persona en el momento: es un regalo enorme.",
      pregunta: "¿Qué pasaje de la Biblia te ha consolado, y con quién podrías compartirlo esta semana?",
    },
  },
  {
    id: "n3-consejeria-basica-4",
    objetivos: [
      "Explicar, con el ejemplo de Jesús en Betania, que se puede llorar con esperanza.",
      "Aplicar formas sanas de acompañar a quien vive un duelo.",
      "Describir los primeros pasos para ayudar en una crisis.",
    ],
    paraEmpezar:
      "Ante la muerte de un ser querido, muchos no saben qué decir y terminan diciendo frases que duelen. Jesús nos muestra otro camino.",
    bloques: [
      { t: "versiculo", ref: "Juan 11:32-36" },
      {
        t: "parrafo",
        texto:
          "Cuando María llegó llorando y le dijo: «Señor, si hubieses estado aquí, no habría muerto mi hermano», Jesús no la regañó. Se conmovió, y «Jesús lloró», aunque sabía que iba a resucitar a Lázaro. Llorar no es falta de fe.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 4:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo no dice que los creyentes no se entristezcan, sino que no se entristezcan «como los otros que no tienen esperanza». Lloramos, pero con la esperanza de la resurrección.",
      },
      { t: "subtitulo", texto: "Cómo acompañar en el duelo" },
      {
        t: "lista",
        items: [
          "Está presente: una visita, un abrazo o un mensaje dicen más que un discurso.",
          "Escucha y deja que la persona hable de su ser querido y de lo que siente.",
          "Ayuda en lo práctico: la comida, el transporte, el cuidado de los niños o los trámites.",
          "Vuelve semanas y meses después, cuando los demás ya se fueron, y recuerda las fechas difíciles.",
          "Evita las frases que duelen, como decir que Dios necesitaba otro ángel, que ya debería superarlo o que sabes exactamente cómo se siente.",
        ],
      },
      { t: "versiculo", ref: "Salmos 34:18" },
      {
        t: "parrafo",
        texto:
          "«Cercano está Jehová a los quebrantados de corazón; Y salva a los contritos de espíritu». El duelo lleva tiempo y no tiene un calendario fijo. Si después de mucho tiempo la persona no logra seguir con su vida, o si piensa en morir, hay que buscar más ayuda.",
      },
      { t: "subtitulo", texto: "Cuando llega una crisis" },
      { t: "versiculo", ref: "1 Reyes 19:4-8" },
      {
        t: "parrafo",
        texto:
          "Elías, agotado y con miedo, se deseó la muerte: «Basta ya, oh Jehová, quítame la vida». Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló. En una crisis, como un accidente, una enfermedad grave, la pérdida del trabajo o una ruptura, lo primero es lo básico: que la persona esté a salvo, calmada y acompañada. Después se le ayuda a buscar a su familia, a la iglesia y, si hace falta, a los profesionales.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Si alguien habla de quitarse la vida",
        texto:
          "Tómalo siempre en serio, no lo guardes en secreto y no dejes sola a la persona. Busca ayuda de inmediato: en la lección 5 verás qué hacer.",
      },
    ],
    ideaClave:
      "Jesús lloró ante la tumba de Lázaro: se puede llorar con esperanza. Para acompañar en el duelo se está presente, se escucha, se ayuda en lo práctico y se vuelve después, sin frases que duelen. En una crisis, como Dios hizo con Elías, primero se cuida lo básico y la seguridad, y luego se busca la red de apoyo.",
    paraLaVida: {
      texto: "Tu presencia en el dolor de otro vale más que tus palabras.",
      pregunta: "¿A quién que está de duelo o en crisis puedes visitar o llamar esta semana, y qué ayuda práctica le puedes dar?",
    },
  },
  {
    id: "n3-consejeria-basica-5",
    objetivos: [
      "Reconocer las situaciones que piden derivar a la persona al pastor o a un profesional.",
      "Explicar qué hacer ante el riesgo de suicidio y ante el abuso.",
      "Aplicar el principio bíblico de la multitud de consejeros y el deber de proteger al débil.",
    ],
    paraEmpezar:
      "Moisés quiso atender él solo todos los problemas del pueblo, y su suegro le dijo que así no estaba bien. Saber pedir ayuda también es parte de cuidar bien.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Jetro le dijo a Moisés: «No está bien lo que haces». El trabajo era demasiado pesado para uno solo. Quien cuida a otros necesita saber cuándo pasar el caso a alguien más preparado. Derivar no es abandonar: es buscar la mejor ayuda y seguir acompañando.",
      },
      { t: "versiculo", ref: "Proverbios 11:14" },
      {
        t: "parrafo",
        texto: "«Donde no hay dirección sabia, caerá el pueblo; Mas en la multitud de consejeros hay seguridad».",
      },
      { t: "subtitulo", texto: "Cuándo derivar" },
      {
        t: "lista",
        items: [
          "Cuando hay riesgo de suicidio o de que la persona se haga daño o haga daño a otros.",
          "Cuando hay violencia o abuso: contra un niño, una pareja, un anciano o una persona con discapacidad.",
          "Cuando hay una adicción que la persona no logra dejar, como el alcohol, las drogas, el juego o la pornografía.",
          "Cuando hay señales de una enfermedad mental: una tristeza profunda que no pasa, ver u oír cosas que no existen o un cambio grave de conducta.",
          "Cuando el problema es médico o legal, o cuando ya no sabes cómo ayudar.",
        ],
      },
      { t: "subtitulo", texto: "Si hay riesgo de suicidio" },
      {
        t: "parrafo",
        texto:
          "Si alguien habla de quitarse la vida, pregúntale con calma si está pensando en hacerse daño: preguntar no le da la idea, y puede salvarle la vida. No lo dejes solo, no prometas guardar el secreto y busca ayuda de inmediato: avisa a tu pastor y a su familia. Si hay peligro inmediato, llama al 911 en los Estados Unidos o al número de emergencias de tu país. En los Estados Unidos, la línea 988 de prevención del suicidio y crisis atiende de día y de noche, también en español.",
      },
      { t: "subtitulo", texto: "Proteger a los débiles" },
      { t: "versiculo", ref: "Proverbios 24:11" },
      {
        t: "parrafo",
        texto:
          "La Escritura manda: «Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte». El abuso de un menor nunca se guarda en secreto ni se arregla solo con una oración o un perdón: se protege a la víctima y se avisa a las autoridades. En Texas, por ejemplo, la ley obliga a toda persona que sospeche que un niño sufre abuso o descuido a reportarlo de inmediato, y no exime a los ministros; el reporte se hace a la línea de abuso de Texas (1-800-252-5400) o, si hay peligro inmediato, al 911. Sigue también las normas de protección de tu iglesia.",
      },
      { t: "versiculo", ref: "Romanos 13:3-4" },
      {
        t: "parrafo",
        texto:
          "Las autoridades están puestas por Dios para hacer justicia y castigar el mal: la autoridad «es servidor de Dios para tu bien». Avisarles cuando hay abuso o un delito no es traicionar a la iglesia: es obedecer a Dios y proteger al débil.",
      },
      {
        t: "nota",
        titulo: "Derivar es seguir amando",
        texto:
          "Después de derivar, sigue cerca: ora por la persona, visítala y anímala a seguir el tratamiento o el acompañamiento que recibe.",
      },
    ],
    ideaClave:
      "Como Moisés con el consejo de Jetro, quien cuida necesita saber cuándo derivar: ante el riesgo de suicidio, la violencia o el abuso, las adicciones, las señales de una enfermedad mental y los problemas médicos o legales. Ante el riesgo de suicidio no se deja sola a la persona y se busca ayuda de inmediato; el abuso se reporta a las autoridades. Derivar es seguir amando.",
    paraLaVida: {
      texto: "Pedir ayuda a tiempo puede salvar una vida.",
      pregunta: "¿Conoces los números de emergencia de tu país y a quién avisar en tu iglesia si alguien está en peligro?",
    },
  },
  {
    id: "n3-consejeria-basica-6",
    objetivos: [
      "Explicar la confidencialidad y sus límites.",
      "Aplicar normas de prudencia que protegen a la persona, a quien ayuda y a la iglesia.",
      "Cuidar la propia vida espiritual, el descanso y la rendición de cuentas.",
    ],
    paraEmpezar:
      "Una persona herida te abre su corazón. Lo que hagas con esa confianza puede ayudarla a sanar o herirla otra vez.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». Lo que te cuentan en confianza no se comenta con otros, ni siquiera como motivo de oración, sin permiso de la persona.",
      },
      { t: "subtitulo", texto: "Los límites del secreto" },
      {
        t: "parrafo",
        texto:
          "La confidencialidad tiene límites, y conviene decirlo desde el principio: no se guarda el secreto cuando hay peligro para la vida de la persona o de otros, ni cuando hay abuso de un menor o de otra persona vulnerable. En esos casos se avisa al pastor y a las autoridades, como viste en la lección 5.",
      },
      { t: "subtitulo", texto: "Normas de prudencia" },
      {
        t: "lista",
        items: [
          "Reúnete en lugares visibles o con otra persona cerca, sobre todo con alguien del otro sexo o con un menor.",
          "No toques a la persona sin su permiso y cuida tus palabras.",
          "No crees dependencia: ayuda a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti.",
          "No prometas lo que no puedes cumplir ni intentes ser el salvador de nadie.",
          "Si el caso te supera o te afecta, pídele ayuda a tu pastor.",
        ],
      },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "Pablo pide restaurar al que cayó «con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado». Quien ayuda también es frágil: necesita humildad, oración y personas a quienes rendir cuentas.",
      },
      { t: "subtitulo", texto: "Cuidar al que cuida" },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos volvieron cansados, Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco». Escuchar el dolor de otros cansa. Guarda tu tiempo con Dios, descansa, comparte con tu pastor lo que te pesa, sin romper la confidencialidad, y reconoce las señales del desgaste: la irritación, el insomnio o las ganas de alejarte de todos.",
      },
      {
        t: "nota",
        titulo: "Tu práctica en el Nivel 3",
        texto:
          "Lo que aprendiste aquí sirve para tu práctica ministerial: acompañar a un nuevo creyente, visitar a un enfermo o cuidar a los de tu grupo. Hazlo siempre bajo la guía de tu pastor.",
      },
    ],
    ideaClave:
      "El de espíritu fiel guarda el secreto (Proverbios 11:13), pero la confidencialidad tiene límites cuando hay peligro de vida o abuso. Quien ayuda sigue normas de prudencia: lugares visibles, no crear dependencia y no prometer lo que no puede cumplir. Y cuida su propia vida con humildad, rendición de cuentas y descanso, como enseñó Jesús.",
    paraLaVida: {
      texto: "Para cuidar bien a otros, también tienes que dejarte cuidar.",
      pregunta: "¿Qué norma de prudencia necesitas empezar a cumplir, y a quién le rendirás cuentas de tu servicio?",
    },
  },
];
