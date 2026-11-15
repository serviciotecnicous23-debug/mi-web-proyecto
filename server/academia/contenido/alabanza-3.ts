/**
 * Especialidad Alabanza y adoración · Materia 3 — Dirigir el ministerio de alabanza (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El director como siervo que guía al pueblo, cómo escoger los cantos, preparar el culto y el ensayo, dirigir con orden y
 * sin manipular, formar el equipo y resolver los problemas comunes. Quién ejerce cada cargo queda para la declaración de
 * fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const ALABANZA_3: LeccionContenido[] = [
  {
    id: "alabanza-3-1",
    objetivos: [
      "Explicar el papel del director de alabanza como un siervo que guía al pueblo a Dios.",
      "Describir las cualidades de Quenanías y de los directores de cantores de Israel.",
      "Reconocer al director como alguien que adora delante del pueblo, no como un artista.",
    ],
    paraEmpezar: "El director de alabanza no es el cantante principal de un concierto: es un siervo que ayuda a toda la iglesia a volver la mirada a Dios.",
    bloques: [
      { t: "versiculo", ref: "1 Crónicas 15:22" },
      {
        t: "parrafo",
        texto:
          "Cuando David llevó el arca a Jerusalén, organizó a los levitas músicos, y «Quenanías, principal de los levitas en la música, fue puesto para dirigir el canto, porque era entendido en ello». Dos cosas se dicen de él: fue puesto por los responsables, y sabía de música.",
      },
      { t: "versiculo", ref: "Nehemías 12:46" },
      {
        t: "parrafo",
        texto:
          "Siglos después, en tiempos de Nehemías, el pueblo recordaba que «desde el tiempo de David y de Asaf, ya de antiguo, había un director de cantores para los cánticos y alabanzas y acción de gracias a Dios». Dirigir el canto del pueblo es un servicio antiguo en la Biblia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "subtitulo", texto: "Un siervo, no una estrella" },
      { t: "versiculo", ref: "Marcos 10:45" },
      {
        t: "parrafo",
        texto:
          "Jesús es el modelo de todo líder: «el Hijo del Hombre no vino para ser servido, sino para servir». El director sirve a Dios y al pueblo: no busca que lo miren a él, sino que todos miren a Cristo.",
      },
      { t: "versiculo", ref: "2 Crónicas 20:21-22" },
      {
        t: "parrafo",
        texto:
          "Cuando Judá enfrentó a un gran ejército, el rey Josafat puso cantores que alabaran a Jehová mientras salía la gente armada, y que dijesen: «Glorificad a Jehová, porque su misericordia es para siempre». No era una fórmula para ganar batallas: era un pueblo que confiaba en Dios y lo alababa antes de ver la victoria. El director ayuda al pueblo a confiar en Dios.",
      },
      {
        t: "lista",
        items: [
          "Guía: ayuda al pueblo a cantar y a responder a Dios, no actúa para él.",
          "Adora: es el primero en adorar con sinceridad.",
          "Conoce al pueblo: sabe qué puede cantar y qué está viviendo la iglesia.",
          "Se prepara: llega con todo planeado y ensayado.",
          "Obedece: sirve bajo la dirección de sus pastores.",
        ],
      },
      {
        t: "nota",
        titulo: "Quién puede dirigir",
        texto:
          "Quién puede ejercer cada cargo en la iglesia es un punto de la declaración de fe por confirmar. Cada iglesia nombra a sus directores de alabanza bajo la autoridad de sus pastores.",
      },
    ],
    ideaClave:
      "Dirigir el canto del pueblo es un servicio antiguo: Quenanías fue puesto para dirigir porque era entendido en ello, y desde David hubo directores de cantores. El director es un siervo, como Cristo, que vino a servir: guía al pueblo a mirar a Dios y a confiar en él, adora con sinceridad, conoce a la iglesia, se prepara y sirve bajo sus pastores.",
    paraLaVida: {
      texto: "El mejor director es el que menos se nota y más ayuda a cantar.",
      pregunta: "Cuando diriges o cantas, ¿la gente termina mirándote a ti o a Cristo?",
    },
  },
  {
    id: "alabanza-3-2",
    objetivos: [
      "Seleccionar canciones con criterios bíblicos y pastorales.",
      "Explicar por qué el pueblo debe poder cantar lo que se escoge.",
      "Equilibrar los cantos nuevos y los conocidos.",
    ],
    paraEmpezar: "Escoger los cantos de un culto es una de las tareas más importantes del director: lo que se canta enseña, forma y ayuda a adorar.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 3:16" },
      {
        t: "parrafo",
        texto:
          "Pablo habla de «salmos e himnos y cánticos espirituales», y de cantos que enseñan: «enseñándoos y exhortándoos unos a otros en toda sabiduría». Hay variedad de formas, pero un mismo propósito: que la palabra de Cristo more en el pueblo.",
      },
      { t: "versiculo", ref: "Salmos 47:7" },
      {
        t: "parrafo",
        texto: "El salmista pide: «Porque Dios es el Rey de toda la tierra; Cantad con inteligencia». El pueblo tiene que entender lo que canta.",
      },
      { t: "versiculo", ref: "Salmos 96:1" },
      {
        t: "parrafo",
        texto:
          "También hay lugar para lo nuevo: «Cantad a Jehová cántico nuevo; Cantad a Jehová, toda la tierra». Y el canto es de toda la congregación, no solo del equipo.",
      },
      { t: "versiculo", ref: "1 Corintios 14:26" },
      {
        t: "parrafo",
        texto: "En la reunión de la iglesia, la regla es clara: «Hágase todo para edificación». Un canto se escoge porque edifica a la iglesia, no solo porque está de moda o le gusta al equipo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=MnoXHW4Hqjs", titulo: "El arte de la poesía bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Cinco preguntas para escoger un canto" },
      {
        t: "lista",
        items: [
          "¿Dice la verdad sobre Dios, según la Biblia?",
          "¿Pone a Cristo y su obra en el centro?",
          "¿La puede cantar el pueblo? Una melodía clara y un tono cómodo para la congregación, no solo para el cantante.",
          "¿Sirve al tema del culto y al mensaje de ese día?",
          "¿Hay equilibrio entre lo nuevo y lo conocido, y entre cantos de distintas generaciones?",
        ],
      },
      {
        t: "nota",
        titulo: "Los cantos nuevos",
        texto: "Un canto nuevo se enseña con paciencia: se presenta, se repite algunos domingos seguidos y se acompaña con cantos que la iglesia ya conoce. Si todo es nuevo, el pueblo deja de cantar y solo escucha.",
      },
    ],
    ideaClave:
      "Lo que se canta enseña y forma. Se escogen cantos que dicen la verdad, ponen a Cristo en el centro, el pueblo puede entender y cantar, sirven al tema del culto y edifican a la iglesia. Hay lugar para el cántico nuevo, en equilibrio con lo conocido, para que toda la congregación cante con inteligencia.",
    paraLaVida: {
      texto: "Un culto no se mide por cuánto cantó el equipo, sino por cuánto cantó la iglesia.",
      pregunta: "¿Qué canto de tu lista habitual no pasaría las cinco preguntas?",
    },
  },
  {
    id: "alabanza-3-3",
    objetivos: [
      "Planificar un culto con su orden, sus cantos y sus transiciones.",
      "Organizar un ensayo provechoso.",
      "Distinguir la excelencia del perfeccionismo.",
    ],
    paraEmpezar: "Lo que pasa en un buen culto casi siempre empezó días antes: en la oración, en la planificación y en el ensayo.",
    bloques: [
      { t: "versiculo", ref: "Salmos 33:3" },
      {
        t: "parrafo",
        texto:
          "«Cantadle cántico nuevo; Hacedlo bien, tañendo con júbilo». Es el versículo de memoria de esta materia. Pide dos cosas que van juntas: hacerlo bien, con preparación y cuidado, y con júbilo, con un corazón alegre delante de Dios.",
      },
      { t: "versiculo", ref: "1 Crónicas 25:7-8" },
      {
        t: "parrafo",
        texto:
          "Los músicos del templo eran «instruidos en el canto para Jehová, todos los aptos», y servían por turnos, «lo mismo el maestro que el discípulo». La preparación era parte de su servicio.",
      },
      { t: "versiculo", ref: "Proverbios 21:5" },
      {
        t: "parrafo",
        texto:
          "La planificación también es sabiduría: «Los pensamientos del diligente ciertamente tienden a la abundancia; Mas todo el que se apresura alocadamente, de cierto va a la pobreza». Improvisar todo cada domingo no es más espiritual: suele ser falta de preparación.",
      },
      { t: "subtitulo", texto: "Preparar el culto" },
      {
        t: "lista",
        items: [
          "Orar por el culto y por la iglesia.",
          "Hablar con el pastor sobre el tema y el mensaje del día.",
          "Escoger los cantos y su orden, para que el culto fluya con sentido.",
          "Decidir los tonos y quién canta cada parte.",
          "Preparar las transiciones y los textos bíblicos que se leerán.",
          "Enviar la lista y los recursos al equipo con días de anticipación.",
        ],
      },
      { t: "subtitulo", texto: "Un ensayo provechoso" },
      {
        t: "lista",
        items: [
          "Empezar a tiempo, con oración y una palabra breve.",
          "Repasar lo difícil, no solo lo que ya sale bien.",
          "Ensayar los principios, los finales y las transiciones.",
          "Probar el sonido con los técnicos.",
          "Terminar a tiempo, cuidando a las familias del equipo.",
        ],
      },
      { t: "versiculo", ref: "Colosenses 3:23" },
      {
        t: "nota",
        titulo: "Excelencia no es perfeccionismo",
        texto:
          "La excelencia es dar lo mejor «de corazón, como para el Señor y no para los hombres». El perfeccionismo busca impresionar y no soporta un error. Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.",
      },
    ],
    ideaClave:
      "Hacedlo bien, tañendo con júbilo: preparación y alegría van juntas. Los músicos del templo eran instruidos y aptos, y el diligente planifica. Se prepara el culto con oración, con el pastor, con los cantos, los tonos y las transiciones, y el ensayo repasa lo difícil y termina a tiempo. La excelencia es dar lo mejor para el Señor, no el perfeccionismo que busca impresionar.",
    paraLaVida: {
      texto: "La espontaneidad del domingo descansa en la preparación del sábado.",
      pregunta: "¿Qué parte de tu preparación sueles dejar para el último momento?",
    },
  },
  {
    id: "alabanza-3-4",
    objetivos: [
      "Aplicar los principios de orden y sencillez al dirigir.",
      "Distinguir entre guiar al pueblo y manipularlo.",
      "Valorar lo espontáneo dentro del orden.",
    ],
    paraEmpezar: "Dirigir no es solo cantar adelante: es guiar a un pueblo con palabras, con señales y con el ejemplo, sin estorbar lo que Dios hace.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto: "La regla de Pablo para el culto es sencilla: «hágase todo decentemente y con orden». El orden no apaga al Espíritu: lo sirve.",
      },
      { t: "versiculo", ref: "1 Corintios 14:33" },
      {
        t: "parrafo",
        texto: "La razón está en Dios mismo: «pues Dios no es Dios de confusión, sino de paz». Un culto confuso, con silencios largos, señales que nadie entiende o cambios sin aviso, distrae al pueblo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Esdras 3:11" },
      {
        t: "parrafo",
        texto:
          "Cuando se pusieron los cimientos del templo después del exilio, los cantores alababan, «Y todo el pueblo aclamaba con gran júbilo, alabando a Jehová». La meta del director es esa: que todo el pueblo participe.",
      },
      { t: "subtitulo", texto: "Cómo se guía" },
      {
        t: "lista",
        items: [
          "Habla poco y claro: una frase o un versículo valen más que un sermón entre canto y canto.",
          "Lee la Escritura para centrar al pueblo en Dios.",
          "Invita sin presionar: explica, anima y deja libre.",
          "Mira a la congregación: canta con ella, no para ella.",
          "Da señales claras al equipo para repetir, terminar o seguir.",
          "Deja espacio a lo espontáneo, dentro del orden que preparó.",
        ],
      },
      {
        t: "nota",
        titulo: "Guiar no es manipular",
        texto:
          "Manipular es usar trucos para provocar una emoción: repetir sin fin, subir el volumen para forzar una reacción, prometer cosas que Dios no prometió o hacer sentir culpable al que no responde. Guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre en cada corazón.",
      },
    ],
    ideaClave:
      "Todo se hace decentemente y con orden, porque Dios no es Dios de confusión, sino de paz. El director guía con pocas palabras, con la Escritura, con señales claras y mirando al pueblo, para que todo el pueblo participe. Deja espacio a lo espontáneo dentro del orden, y nunca manipula: presenta la verdad y deja que el Espíritu obre.",
    paraLaVida: {
      texto: "Dios no necesita trucos para tocar un corazón.",
      pregunta: "¿Qué costumbre tuya al dirigir podría estar empujando al pueblo en vez de guiarlo?",
    },
  },
  {
    id: "alabanza-3-5",
    objetivos: [
      "Describir cómo se elige a los que sirven en el equipo de alabanza.",
      "Explicar cómo se forma y se acompaña al equipo.",
      "Reconocer la importancia de formar a otros que sigan la obra.",
    ],
    paraEmpezar: "Un ministerio de alabanza sano no depende de una sola persona: forma un equipo y forma a los que vendrán después.",
    bloques: [
      { t: "versiculo", ref: "1 Crónicas 25:1" },
      {
        t: "parrafo",
        texto:
          "David y los jefes «apartaron para el ministerio» a familias de músicos, y la Biblia los describe como «hombres idóneos para la obra de su ministerio». El servicio musical se tomaba en serio: se elegía y se apartaba a los que servirían.",
      },
      { t: "versiculo", ref: "1 Crónicas 25:7-8" },
      {
        t: "parrafo",
        texto:
          "Servían «entrando el pequeño con el grande, lo mismo el maestro que el discípulo». En un buen equipo, los que saben más enseñan a los que empiezan, y todos sirven juntos.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo le pidió a Timoteo: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros». El director forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Para servir en el equipo" },
      {
        t: "lista",
        items: [
          "Un testimonio de vida cristiana.",
          "Ser parte de la iglesia y de su vida, no solo de la plataforma.",
          "Capacidad musical o técnica, o disposición a aprender.",
          "Un corazón dispuesto a servir y a recibir corrección.",
          "Tiempo para ensayar y servir con constancia.",
        ],
      },
      { t: "subtitulo", texto: "Cómo se forma al equipo" },
      {
        t: "lista",
        items: [
          "Se invita y se conversa: por qué quiere servir y cómo está su vida con Dios.",
          "Se acompaña un tiempo: ensaya y sirve junto a alguien con experiencia.",
          "Se forma en lo técnico y en lo espiritual.",
          "Se le dan responsabilidades poco a poco.",
          "Se lo sigue acompañando y animando.",
        ],
      },
      {
        t: "nota",
        titulo: "Menores en el equipo",
        texto: "Si en el equipo hay niños o adolescentes, sirven con permiso de sus padres y se siguen las normas de protección de la iglesia: nunca a solas con un adulto, y siempre acompañados.",
      },
    ],
    ideaClave:
      "David apartó para el ministerio a músicos idóneos, y servían juntos el maestro y el discípulo. Se elige a los que sirven por su testimonio, su vida en la iglesia, su capacidad o disposición a aprender y su corazón dispuesto. Se los forma con acompañamiento, en lo técnico y en lo espiritual, y el director forma a otros que puedan enseñar también a otros.",
    paraLaVida: {
      texto: "Un buen director no se hace indispensable: forma a otros.",
      pregunta: "¿A quién podrías empezar a formar este año en el ministerio?",
    },
  },
  {
    id: "alabanza-3-6",
    objetivos: [
      "Evaluar los problemas más comunes del ministerio de alabanza.",
      "Proponer soluciones bíblicas a los conflictos del equipo.",
      "Valorar la unidad de la iglesia por encima de los gustos musicales.",
    ],
    paraEmpezar: "Donde hay personas, hay problemas: celos, quejas, conflictos y cansancio. La Biblia da caminos para enfrentarlos.",
    bloques: [
      { t: "versiculo", ref: "Santiago 3:16" },
      {
        t: "parrafo",
        texto:
          "Santiago advierte: «Porque donde hay celos y contención, allí hay perturbación y toda obra perversa». Los celos entre cantantes o músicos destruyen un equipo más rápido que cualquier error musical.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Mateo 18:15" },
      {
        t: "parrafo",
        texto:
          "Para los conflictos personales, Jesús dio un camino: «si tu hermano peca contra ti, ve y repréndele estando tú y él solos; si te oyere, has ganado a tu hermano». Primero a solas, sin chismes ni grupos de bandos.",
      },
      { t: "versiculo", ref: "Proverbios 15:1" },
      {
        t: "parrafo",
        texto: "Ante las quejas, ayuda el consejo de Proverbios: «La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor».",
      },
      { t: "versiculo", ref: "Romanos 15:5-6" },
      {
        t: "parrafo",
        texto:
          "Muchos conflictos son por gustos: el volumen, el estilo, los himnos o los coros nuevos. Pablo ora por un mismo sentir, «para que unánimes, a una voz, glorifiquéis al Dios y Padre de nuestro Señor Jesucristo». La unidad de la iglesia vale más que el gusto de cualquiera.",
      },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto: "Jesús también cuidó el cansancio de los suyos: «Venid vosotros aparte a un lugar desierto, y descansad un poco». Un equipo agotado no sirve bien: hacen falta turnos y descanso.",
      },
      {
        t: "lista",
        items: [
          "Celos y competencia: servir por turnos y honrar a cada uno.",
          "Conflictos personales: hablar primero a solas, como enseñó Jesús.",
          "Quejas por el volumen o el estilo: escuchar con mansedumbre, ajustar lo razonable y enseñar.",
          "Impuntualidad y falta de preparación: acuerdos claros y amor firme.",
          "El músico estrella: una conversación honesta sobre humildad y servicio.",
          "Cansancio: turnos, descanso y cuidado de las familias.",
        ],
      },
    ],
    ideaClave:
      "Donde hay celos y contención hay perturbación, y por eso el equipo cultiva la humildad. Los conflictos se hablan primero a solas, y la blanda respuesta quita la ira. La unidad de la iglesia, que glorifica a Dios a una voz, vale más que los gustos musicales, y un equipo sano también descansa.",
    paraLaVida: {
      texto: "Una canción desafinada se arregla en un ensayo; una relación rota, no tanto.",
      pregunta: "¿Hay alguien del equipo con quien necesitas hablar a solas esta semana?",
    },
  },
];
