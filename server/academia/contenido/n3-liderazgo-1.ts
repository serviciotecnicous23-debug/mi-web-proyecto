/**
 * Nivel 3 · Materia 7 — Liderazgo cristiano I (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El liderazgo como servicio, el carácter del líder, la vida con Dios, el trabajo en equipo, los conflictos y la
 * formación de nuevos líderes. Las cualidades de 1 Timoteo 3 se toman como el carácter que todo líder debe buscar; quién
 * puede ocupar cada cargo de la iglesia (también el ministerio de la mujer) lo dice la declaración de fe del ministerio,
 * todavía por confirmar, y no se decide aquí. Advierte contra el abuso de poder y pide rendir cuentas.
 */
import type { LeccionContenido } from "../tipos";

export const N3_LIDERAZGO_1: LeccionContenido[] = [
  {
    id: "n3-liderazgo-1-1",
    objetivos: [
      "Explicar el liderazgo cristiano según la enseñanza de Jesús en Marcos 10:42-45.",
      "Distinguir el liderazgo espiritual del liderazgo que se apoya solo en la capacidad humana.",
      "Reconocer los ámbitos en que todo creyente ejerce influencia: la familia, el grupo, el equipo y la iglesia.",
    ],
    paraEmpezar:
      "Santiago y Juan le pidieron a Jesús sentarse a su derecha y a su izquierda en su gloria, y los otros diez se enojaron con ellos. Querían lo mismo: ser los primeros. Jesús aprovechó la discusión para enseñar qué es ser grande en su reino.",
    bloques: [
      { t: "versiculo", ref: "Marcos 10:42-45" },
      {
        t: "parrafo",
        texto:
          "Jesús comparó dos maneras de ejercer autoridad. Los gobernantes de las naciones «se enseñorean de ellas»; en cambio, dijo: «Pero no será así entre vosotros». El que quiera hacerse grande será «vuestro servidor», porque el Hijo del Hombre vino para servir y dar su vida. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Qué es el liderazgo cristiano" },
      {
        t: "parrafo",
        texto:
          "Liderar es influir en otros. El liderazgo cristiano es influir en las personas para que sigan a Cristo y cumplan el propósito de Dios, sirviéndolas como él. No se mide por el título ni por cuántos obedecen, sino por cuántos crecen y por cuánto se parece el líder a Jesús.",
      },
      { t: "versiculo", ref: "1 Timoteo 3:1" },
      {
        t: "parrafo",
        texto:
          "Pablo dice: «Si alguno anhela obispado, buena obra desea». Desear servir en el liderazgo es bueno, pero el motivo importa: no se busca un lugar de honor, sino una obra, un trabajo al servicio de los demás.",
      },
      { t: "subtitulo", texto: "Liderazgo espiritual" },
      {
        t: "parrafo",
        texto:
          "J. Oswald Sanders, en Liderazgo espiritual, contrasta al líder que confía en sí mismo con el que confía en Dios. El primero se apoya en su carisma, sus métodos y su experiencia; el segundo también usa sus dones, pero depende del Espíritu Santo, busca la voluntad de Dios y dirige con humildad. Las capacidades sirven, pero no bastan: la obra de Dios se hace con la fuerza de Dios (Zacarías 4:6).",
      },
      { t: "versiculo", ref: "Zacarías 4:6" },
      { t: "subtitulo", texto: "Todos influimos" },
      {
        t: "lista",
        items: [
          "En la familia: los padres guían a sus hijos y los esposos se edifican mutuamente.",
          "En el grupo pequeño: el líder cuida, enseña y anima a sus hermanos.",
          "En un equipo de ministerio: el coordinador organiza, acompaña y forma a otros.",
          "En la iglesia y en la comunidad: cada creyente es ejemplo con su vida.",
        ],
      },
      {
        t: "nota",
        titulo: "El líder no es un jefe",
        texto:
          "Un jefe manda desde arriba; un líder cristiano va delante con el ejemplo y se pone al lado de los demás para servir. Su autoridad viene de Dios y de su vida, no de su cargo.",
      },
    ],
    ideaClave:
      "El liderazgo cristiano es influir en las personas para que sigan a Cristo, sirviéndolas como él: «Pero no será así entre vosotros». Desear servir es buena obra; el líder espiritual usa sus dones, pero depende de Dios, y todos ejercemos influencia en la familia, el grupo, el equipo y la iglesia.",
    paraLaVida: {
      texto: "Tu grandeza en el reino se mide por tu servicio.",
      pregunta: "¿En qué lugar ejerces hoy influencia sobre otros, y cómo podrías servirlos mejor esta semana?",
    },
  },
  {
    id: "n3-liderazgo-1-2",
    objetivos: [
      "Describir las cualidades de carácter que Pablo pide a los líderes en 1 Timoteo 3.",
      "Explicar por qué la integridad y la humildad son la base del liderazgo.",
      "Evaluar la propia vida a la luz del carácter del líder.",
    ],
    paraEmpezar:
      "Cuando Pablo explicó a Timoteo cómo escoger líderes para la iglesia, casi no habló de talentos ni de habilidades: habló de carácter. Lo que el líder es pesa más que lo que sabe hacer.",
    bloques: [
      { t: "versiculo", ref: "1 Timoteo 3:2-7" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que el líder sea «irreprensible», es decir, que nadie pueda acusarlo con razón. Y describe su carácter: «sobrio, prudente, decoroso, hospedador, apto para enseñar». Pide también que no sea «un neófito», un creyente recién convertido, y que tenga «buen testimonio de los de afuera». Estas cualidades, que Pablo pide a los ancianos y a los diáconos, describen el carácter que todo líder cristiano debe buscar.",
      },
      {
        t: "lista",
        items: [
          "En su vida personal: sobrio, prudente, decoroso, no dado al vino, no pendenciero, amable, apacible, no avaro.",
          "En su casa: gobierna bien su familia, con amor y orden.",
          "En su fe: no es un recién convertido, sino alguien probado.",
          "En la comunidad: tiene buen testimonio también entre los que no son creyentes.",
          "En el ministerio: es hospitalario y apto para enseñar.",
        ],
      },
      { t: "subtitulo", texto: "La integridad" },
      { t: "versiculo", ref: "Proverbios 11:3" },
      {
        t: "parrafo",
        texto:
          "«La integridad de los rectos los encaminará». Integridad es ser la misma persona en público y en privado, en el templo y en la casa, en lo grande y en lo pequeño. Un líder puede tener muchos dones, pero si pierde la integridad pierde la confianza, y sin confianza nadie lo sigue.",
      },
      { t: "subtitulo", texto: "La humildad" },
      { t: "versiculo", ref: "1 Pedro 5:5" },
      {
        t: "parrafo",
        texto:
          "Pedro les recuerda a los líderes y a todos que «Dios resiste a los soberbios, y da gracia a los humildes». El líder humilde reconoce sus errores, escucha, pide perdón, da el reconocimiento a otros y sabe que todo lo que tiene lo recibió de Dios.",
      },
      { t: "versiculo", ref: "Hechos 20:28" },
      {
        t: "parrafo",
        texto:
          "Pablo dijo a los ancianos de Éfeso: «mirad por vosotros, y por todo el rebaño». El orden importa: el líder cuida primero su propia vida, porque no puede llevar a otros adonde él no va.",
      },
      {
        t: "nota",
        titulo: "El carácter va antes que el talento",
        texto:
          "Saúl tenía estatura y presencia; David tenía un corazón conforme a Dios. El talento puede abrir una puerta, pero solo el carácter sostiene a un líder en el tiempo.",
      },
    ],
    ideaClave:
      "La Biblia pide al líder, antes que talentos, carácter: irreprensible, sobrio, prudente, decoroso, hospedador, apto para enseñar, probado en la fe y con buen testimonio. La integridad le da confianza y la humildad le trae la gracia de Dios; por eso el líder mira primero por sí mismo y después por el rebaño.",
    paraLaVida: {
      texto: "Lo que eres cuando nadie te ve es lo que eres como líder.",
      pregunta: "¿Qué cualidad de 1 Timoteo 3 necesitas cultivar más, y qué paso concreto darás para crecer en ella?",
    },
  },
  {
    id: "n3-liderazgo-1-3",
    objetivos: [
      "Explicar el ejemplo de Jesús al lavar los pies de sus discípulos.",
      "Aplicar el modelo del buen pastor de 1 Pedro 5:2-3.",
      "Reconocer las señales del abuso de poder y cómo prevenirlo.",
    ],
    paraEmpezar:
      "La noche antes de morir, sabiendo que el Padre le había dado todas las cosas, Jesús se levantó de la cena, se ciñó una toalla y lavó los pies de sus discípulos. El que tenía toda la autoridad hizo el trabajo del último siervo.",
    bloques: [
      { t: "versiculo", ref: "Juan 13:14-15" },
      {
        t: "parrafo",
        texto:
          "Jesús explicó lo que había hecho: «vosotros también debéis lavaros los pies los unos a los otros. Porque ejemplo os he dado». El líder cristiano no está por encima del servicio humilde: lo encabeza.",
      },
      { t: "versiculo", ref: "Filipenses 2:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Nada hagáis por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demás como superiores a él mismo». Y pone el ejemplo de Cristo, que siendo Dios se despojó a sí mismo y se hizo siervo hasta la muerte de cruz (Filipenses 2:6-8).",
      },
      { t: "subtitulo", texto: "Como un buen pastor" },
      { t: "versiculo", ref: "1 Pedro 5:2-3" },
      {
        t: "parrafo",
        texto:
          "Pedro describe al líder como un pastor que cuida el rebaño de Dios, que no es suyo: «no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto; no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey». Sirve con gusto, con motivos limpios y con el ejemplo.",
      },
      { t: "subtitulo", texto: "Cuando el poder se tuerce" },
      { t: "versiculo", ref: "3 Juan 1:9" },
      {
        t: "parrafo",
        texto:
          "Juan habla de Diótrefes, «al cual le gusta tener el primer lugar entre ellos», que rechazaba a otros y los echaba de la iglesia. El liderazgo se tuerce cuando se usa para uno mismo. Estas son algunas señales de alarma:",
      },
      {
        t: "lista",
        items: [
          "Controlar la vida de los demás o exigir lealtad a la persona del líder en vez de a Cristo.",
          "Manipular con la culpa, el miedo o supuestas revelaciones para que otros obedezcan.",
          "Aprovecharse de las personas en lo económico, en lo emocional o en lo sexual.",
          "Esconder las cosas, no rendir cuentas a nadie y castigar a quien hace preguntas.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La protección está en rendir cuentas: el líder trabaja bajo la supervisión pastoral, maneja con transparencia el dinero y las decisiones, y acepta la corrección. Un abuso nunca se encubre: se informa a los pastores y, cuando hay delito, a las autoridades.",
      },
      {
        t: "nota",
        titulo: "Servir no es dejarse usar",
        texto:
          "Servir como Jesús no significa decir que sí a todo ni dejar que otros abusen. Jesús servía con propósito, ponía límites y se apartaba a orar. El servicio sano tiene amor y también sabiduría.",
      },
    ],
    ideaClave:
      "Jesús lavó los pies de sus discípulos y nos dio ejemplo; Pablo pide humildad y Pedro describe al líder como pastor que sirve voluntariamente, sin ganancia deshonesta y sin señorío, siendo ejemplo. El poder se tuerce cuando se usa para uno mismo, como Diótrefes; por eso el líder rinde cuentas y nunca encubre un abuso.",
    paraLaVida: {
      texto: "La toalla de Jesús es el símbolo del liderazgo cristiano.",
      pregunta: "¿A quién podrías servir esta semana de una manera humilde que nadie vea?",
    },
  },
  {
    id: "n3-liderazgo-1-4",
    objetivos: [
      "Explicar por qué la vida con Dios es la fuente del liderazgo cristiano.",
      "Describir el ejemplo de oración de Jesús, de Moisés y de Nehemías.",
      "Aplicar el cuidado del descanso, de la familia y del ejemplo personal.",
    ],
    paraEmpezar:
      "Muchos líderes cristianos no caen por falta de capacidad, sino por agotamiento, por descuidar su familia o por abandonar su vida con Dios. El liderazgo empieza en lo secreto.",
    bloques: [
      { t: "subtitulo", texto: "La presencia de Dios primero" },
      { t: "versiculo", ref: "Éxodo 33:15" },
      {
        t: "parrafo",
        texto:
          "Moisés le dijo a Dios: «Si tu presencia no ha de ir conmigo, no nos saques de aquí». Prefería quedarse en el desierto con Dios antes que avanzar sin él. El líder espiritual sabe que su fuerza no está en sus planes, sino en la presencia de Dios.",
      },
      { t: "versiculo", ref: "Marcos 1:35" },
      {
        t: "parrafo",
        texto:
          "Jesús, con toda la multitud buscándolo, se levantaba de madrugada para orar en un lugar desierto. Nehemías, ante la pregunta del rey, oró antes de responder: «Entonces oré al Dios de los cielos» (Nehemías 2:4). La oración no es un adorno del liderazgo: es su motor.",
      },
      { t: "versiculo", ref: "Nehemías 2:4" },
      { t: "versiculo", ref: "Hechos 6:4" },
      {
        t: "parrafo",
        texto:
          "Cuando las tareas crecieron, los apóstoles organizaron el servicio para poder decir: «nosotros persistiremos en la oración y en el ministerio de la palabra». Un líder que no tiene tiempo para orar y estudiar la Palabra tiene que reorganizar su agenda.",
      },
      { t: "subtitulo", texto: "El descanso y los límites" },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos volvieron cansados de la misión, Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco». Descansar no es pereza: es obedecer el ritmo que Dios dio a la vida. El líder agotado sirve mal y termina enfermo o amargado.",
      },
      { t: "subtitulo", texto: "La familia y el ejemplo" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios? (1 Timoteo 3:5). La familia es el primer ministerio del líder casado. Y a Timoteo, que era joven, le pidió que fuera ejemplo en todo:",
      },
      { t: "versiculo", ref: "1 Timoteo 4:12" },
      { t: "versiculo", ref: "1 Timoteo 4:16" },
      {
        t: "parrafo",
        texto:
          "Pablo resume el cuidado del líder: «Ten cuidado de ti mismo y de la doctrina». Cuidar la propia vida no es egoísmo: es la condición para poder cuidar a otros por mucho tiempo.",
      },
      {
        t: "nota",
        titulo: "Una regla sencilla",
        texto:
          "Separa cada día un tiempo con Dios, cada semana un día de descanso y un tiempo con tu familia, y cada año unos días para evaluar tu vida y tu ministerio. Escribe esa regla y pide a alguien que te pregunte por ella.",
      },
    ],
    ideaClave:
      "El liderazgo cristiano nace de la vida con Dios: Moisés no quería avanzar sin su presencia, Jesús oraba de madrugada y Nehemías oraba antes de hablar. El líder cuida la oración y la Palabra, descansa como Jesús enseñó, atiende su familia y es ejemplo, teniendo cuidado de sí mismo y de la doctrina.",
    paraLaVida: {
      texto: "No puedes dar lo que no recibes de Dios.",
      pregunta: "¿Cómo está hoy tu tiempo con Dios, tu descanso y tu familia, y qué ajuste necesitas hacer?",
    },
  },
  {
    id: "n3-liderazgo-1-5",
    objetivos: [
      "Explicar el consejo de Jetro a Moisés y su aplicación al trabajo en equipo.",
      "Describir cómo la iglesia de Hechos 6 resolvió un problema delegando.",
      "Aplicar los pasos para delegar con confianza y cuidar la unidad del equipo.",
    ],
    paraEmpezar:
      "Moisés atendía él solo al pueblo desde la mañana hasta la tarde. Su suegro Jetro lo vio y le hizo una advertencia que sigue salvando ministerios: así no vas a durar.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Jetro le dijo: «No está bien lo que haces», y le explicó por qué: «el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo». Le aconsejó enseñar al pueblo y escoger hombres capaces, temerosos de Dios y honrados, para que juzgaran los asuntos pequeños, mientras él atendía los grandes (Éxodo 18:19-22).",
      },
      { t: "versiculo", ref: "Éxodo 18:21" },
      { t: "subtitulo", texto: "Una iglesia que delega" },
      { t: "versiculo", ref: "Hechos 6:3-4" },
      {
        t: "parrafo",
        texto:
          "Cuando las viudas de los griegos fueron desatendidas, los apóstoles no lo resolvieron solos ni lo ignoraron. Pidieron a la iglesia buscar siete varones «de buen testimonio, llenos del Espíritu Santo y de sabiduría» para encargarles ese trabajo, y ellos siguieron en la oración y la Palabra. El resultado fue que la palabra del Señor crecía (Hechos 6:7).",
      },
      { t: "subtitulo", texto: "Un cuerpo, muchos miembros" },
      { t: "versiculo", ref: "Romanos 12:4-5" },
      {
        t: "parrafo",
        texto:
          "La iglesia es un cuerpo con muchos miembros, y no todos tienen la misma función. El buen líder no hace todo: descubre los dones de cada uno y los pone a servir. Además, «Mejores son dos que uno» (Eclesiastés 4:9): en equipo se trabaja mejor, se levanta al que cae y se resiste más.",
      },
      { t: "versiculo", ref: "Eclesiastés 4:9-10" },
      { t: "subtitulo", texto: "Cómo delegar" },
      {
        t: "lista",
        items: [
          "Escoger personas fieles y con el carácter adecuado, no solo disponibles.",
          "Explicar con claridad la tarea, el resultado esperado y hasta dónde llega su autoridad.",
          "Dar las herramientas y acompañar al principio.",
          "Dejar hacer, sin quitarle la tarea a la primera dificultad.",
          "Evaluar juntos, corregir con amor y reconocer el trabajo bien hecho.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Nehemías reconstruyó el muro en cincuenta y dos días porque cada familia trabajó en su parte (Nehemías 3). Un líder que delega multiplica su trabajo y forma a otros; uno que lo hace todo se agota y deja a los demás sin crecer.",
      },
      {
        t: "nota",
        titulo: "La unidad del equipo",
        texto:
          "Un equipo se cuida con comunicación clara, metas compartidas, oración juntos y reconocimiento. Los rumores y las críticas a espaldas de otros destruyen la confianza: los problemas se hablan de frente y con amor.",
      },
    ],
    ideaClave:
      "Jetro advirtió a Moisés que no podía hacerlo todo solo y le aconsejó delegar en personas capaces y temerosas de Dios; los apóstoles delegaron en siete varones llenos del Espíritu y la palabra crecía. La iglesia es un cuerpo con muchos dones: el buen líder escoge, explica, acompaña, deja hacer, evalúa y cuida la unidad del equipo.",
    paraLaVida: {
      texto: "Lo que haces solo se termina contigo; lo que haces en equipo te sobrevive.",
      pregunta: "¿Qué tarea podrías delegar este mes, y a quién podrías formar para que la haga?",
    },
  },
  {
    id: "n3-liderazgo-1-6",
    objetivos: [
      "Aplicar principios bíblicos para resolver conflictos en un equipo o en un grupo.",
      "Tomar decisiones con oración, Escritura y consejo.",
      "Explicar cómo formar nuevos líderes y terminar bien la carrera.",
    ],
    paraEmpezar:
      "Donde hay personas hay conflictos, y donde hay liderazgo hay decisiones difíciles. La pregunta no es si llegarán, sino cómo los enfrentará el líder.",
    bloques: [
      { t: "subtitulo", texto: "Los conflictos" },
      { t: "versiculo", ref: "Efesios 4:2-3" },
      {
        t: "parrafo",
        texto:
          "Pablo pide soportarnos con paciencia y amor, «solícitos en guardar la unidad del Espíritu en el vínculo de la paz». Jesús enseñó a hablar primero a solas con quien nos ofendió (Mateo 18:15). El líder no esconde los conflictos ni los agranda: los enfrenta a tiempo, escucha a todas las partes y busca la reconciliación.",
      },
      {
        t: "parrafo",
        texto:
          "La iglesia de Jerusalén enfrentó un conflicto serio sobre los gentiles: se reunieron, escucharon, buscaron la Escritura y llegaron a una decisión común (Hechos 15). Incluso Pablo y Bernabé tuvieron un desacuerdo fuerte y se separaron (Hechos 15:39); años después, Pablo escribió que Marcos le era útil para el ministerio (2 Timoteo 4:11). Dios puede sanar los conflictos y sacar fruto de ellos.",
      },
      { t: "subtitulo", texto: "Las decisiones" },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos son frustrados donde no hay consejo; mas en la multitud de consejeros se afirman». El líder sabio no decide solo: ora, busca lo que dice la Escritura, pide consejo a personas maduras y escucha a su equipo. Santiago promete sabiduría al que la pide con fe (Santiago 1:5).",
      },
      { t: "versiculo", ref: "Santiago 1:5" },
      { t: "versiculo", ref: "Hechos 15:28" },
      {
        t: "parrafo",
        texto:
          "La carta del concilio de Jerusalén dice: «Porque ha parecido bien al Espíritu Santo, y a nosotros». Las buenas decisiones en la iglesia unen la guía del Espíritu con el discernimiento de un grupo que busca a Dios en unidad.",
      },
      { t: "subtitulo", texto: "Formar nuevos líderes" },
      {
        t: "parrafo",
        texto:
          "Moisés formó a Josué, y Dios le mandó poner las manos sobre él delante del pueblo (Números 27:18-20). Elías formó a Eliseo; Bernabé, a Pablo; y Pablo, a Timoteo, a quien le encargó formar a otros (2 Timoteo 2:2). Un líder cristiano no termina su tarea hasta que hay otros preparados para continuarla.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Terminar bien" },
      { t: "versiculo", ref: "2 Timoteo 4:7" },
      {
        t: "parrafo",
        texto:
          "Al final de su vida, Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe». Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final.",
      },
      {
        t: "nota",
        titulo: "Para el Nivel 4 y el 5",
        texto:
          "Esta materia es el comienzo. En el Nivel 5, Liderazgo II trata cómo formar líderes y equipos, delegar con visión y resolver conflictos más complejos.",
      },
    ],
    ideaClave:
      "El líder enfrenta los conflictos a tiempo, con paciencia y buscando la unidad, como en Hechos 15; decide con oración, Escritura y consejo, uniendo la guía del Espíritu y el discernimiento del grupo; forma a otros que continúen la obra, como Moisés con Josué y Pablo con Timoteo, y busca terminar bien la carrera.",
    paraLaVida: {
      texto: "Un buen líder se mide también por los líderes que deja.",
      pregunta: "¿A quién estás formando hoy para que algún día haga lo que tú haces?",
    },
  },
];
