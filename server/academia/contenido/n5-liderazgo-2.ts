/**
 * Nivel 5 · Materia 4 — Liderazgo II: formar líderes y equipos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue a Liderazgo cristiano I: multiplicar líderes, identificarlos y formarlos, delegar, trabajar en equipo, resolver
 * conflictos y dirigir con visión, servicio y un plan de sucesión (Ogden, Maxwell y Sande). Quién puede ejercer cada
 * cargo, también el ministerio de la mujer, no se decide aquí: es un punto de la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N5_LIDERAZGO_2: LeccionContenido[] = [
  {
    id: "n5-liderazgo-2-1",
    objetivos: [
      "Explicar el modelo de Jesús para formar líderes: estar con ellos y enviarlos.",
      "Describir las cuatro generaciones de 2 Timoteo 2:2.",
      "Distinguir entre sumar y multiplicar en el ministerio.",
    ],
    paraEmpezar:
      "Un líder que lo hace todo solo puede sumar; un líder que forma a otros multiplica. Jesús pasó unos tres años con doce, y hoy su iglesia está en todo el mundo.",
    bloques: [
      { t: "versiculo", ref: "Marcos 3:14" },
      {
        t: "parrafo",
        texto:
          "Jesús «estableció a doce, para que estuviesen con él, y para enviarlos a predicar». Primero estar con él; después ser enviados. Los líderes se forman en la cercanía, no solo en las clases.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo le pide a Timoteo: «Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros». En un solo versículo hay cuatro generaciones: Pablo, Timoteo, los hombres fieles y los otros. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Sumar o multiplicar" },
      {
        t: "parrafo",
        texto:
          "Si un líder gana a una persona cada año, al cabo de diez años habrá sumado diez. Si cada año cada uno forma a otra persona que hace lo mismo, el grupo se duplica cada año: en diez años son más de mil. La multiplicación empieza despacio, pero llega mucho más lejos.",
      },
      { t: "subtitulo", texto: "El grupo pequeño" },
      {
        t: "parrafo",
        texto:
          "Greg Ogden propone formar discípulos en grupos de tres o cuatro personas que se reúnen durante un tiempo para estudiar la Palabra, orar, rendirse cuentas y aplicar lo aprendido, con el compromiso de que después cada uno forme su propio grupo.",
      },
      { t: "versiculo", ref: "Lucas 6:40" },
      {
        t: "parrafo",
        texto:
          "«El discípulo no es superior a su maestro; mas todo el que fuere perfeccionado, será como su maestro». Por eso el líder cuida primero su propia vida: forma a otros a su semejanza.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      {
        t: "nota",
        titulo: "Nadie es indispensable",
        texto: "El líder que no forma a otros deja un vacío cuando se va. El que multiplica deja una obra que sigue sin él.",
      },
    ],
    ideaClave:
      "Jesús formó líderes estando con ellos y enviándolos. 2 Timoteo 2:2 muestra cuatro generaciones que se forman unas a otras: Pablo, Timoteo, los hombres fieles y los otros. Sumar es hacerlo todo uno mismo; multiplicar es formar a otros que formen a otros, por ejemplo en grupos de tres o cuatro.",
    paraLaVida: {
      texto: "Tu ministerio se mide también por los que siguen sirviendo cuando tú no estás.",
      pregunta: "¿A quién podrías empezar a formar como líder este año?",
    },
  },
  {
    id: "n5-liderazgo-2-2",
    objetivos: [
      "Reconocer las señales de un líder en formación: carácter probado, disposición para aprender, corazón de siervo y amor por las personas.",
      "Describir los pasos para formar a un líder, de mirar a hacer.",
      "Valorar la paciencia y la segunda oportunidad en la formación de líderes.",
    ],
    paraEmpezar:
      "Bernabé vio en Saulo, el antiguo perseguidor, a un futuro apóstol, y en Juan Marcos, que había abandonado un viaje, a un siervo útil. Formar líderes empieza por saber mirar.",
    bloques: [
      { t: "versiculo", ref: "Hechos 11:25-26" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos de Jerusalén todavía temían a Saulo, Bernabé lo presentó a los apóstoles (Hechos 9:26-27). Más tarde fue a buscarlo a Tarso y lo llevó a Antioquía, donde «se congregaron allí todo un año con la iglesia, y enseñaron a mucha gente».",
      },
      { t: "subtitulo", texto: "Señales de un líder en formación" },
      {
        t: "lista",
        items: [
          "Carácter probado: es fiel en lo poco (Lucas 16:10).",
          "Disposición para aprender: recibe la corrección sin ofenderse.",
          "Corazón de siervo: sirve aunque nadie lo vea.",
          "Amor por las personas: otros lo siguen porque los cuida.",
          "Dones que la iglesia reconoce.",
        ],
      },
      { t: "versiculo", ref: "1 Timoteo 3:10" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que los que van a servir «sean sometidos a prueba primero». La responsabilidad se da poco a poco, y se observa cómo la maneja cada uno.",
      },
      { t: "subtitulo", texto: "Cuatro pasos para formar" },
      {
        t: "lista",
        items: [
          "Yo lo hago y tú miras.",
          "Yo lo hago y tú me ayudas.",
          "Tú lo haces y yo te ayudo.",
          "Tú lo haces y yo miro; después, tú formas a otro.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Así aprendieron los doce: vieron a Jesús enseñar y sanar, lo acompañaron, fueron enviados de dos en dos y volvieron a contarle lo que habían hecho (Marcos 6:7, 30).",
      },
      { t: "subtitulo", texto: "Una segunda oportunidad" },
      { t: "versiculo", ref: "2 Timoteo 4:11" },
      {
        t: "parrafo",
        texto:
          "Pablo y Bernabé se separaron por causa de Juan Marcos, que los había dejado en el primer viaje (Hechos 15:37-39). Años después, Pablo escribió: «Toma a Marcos y tráele contigo, porque me es útil para el ministerio». Quien falló puede ser restaurado y volver a ser útil.",
      },
      {
        t: "nota",
        titulo: "No escojas por la apariencia",
        texto:
          "Samuel creyó que Eliab sería el rey por su aspecto, pero Dios le dijo que él mira el corazón (1 Samuel 16:7). No escojas líderes solo por su talento o su simpatía.",
      },
    ],
    ideaClave:
      "Un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas. Se forma poco a poco, con responsabilidades que crecen: yo lo hago y tú miras, hasta que tú lo haces y yo miro. Como Bernabé con Saulo y con Marcos, el que forma líderes sabe ver lo que la persona puede llegar a ser y da segundas oportunidades.",
    paraLaVida: {
      texto: "Mira a las personas como Dios las mira: por su corazón y por lo que pueden llegar a ser.",
      pregunta: "¿Qué paso de formación darás con la persona en la que pensaste en la lección anterior?",
    },
  },
  {
    id: "n5-liderazgo-2-3",
    objetivos: [
      "Explicar el consejo de Jetro a Moisés y sus principios.",
      "Describir cómo delegaron los apóstoles en Hechos 6 y cuál fue el resultado.",
      "Aplicar los pasos para delegar con claridad, autoridad y seguimiento.",
    ],
    paraEmpezar:
      "Moisés atendía al pueblo desde la mañana hasta la tarde. Su suegro lo vio y le dijo algo que todo líder necesita oír.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 18:17-23" },
      {
        t: "parrafo",
        texto:
          "Jetro le dijo: «No está bien lo que haces. Desfallecerás del todo, tú, y también este pueblo que está contigo; porque el trabajo es demasiado pesado para ti». El líder que no delega se agota y frena a los demás.",
      },
      { t: "subtitulo", texto: "El consejo de Jetro" },
      {
        t: "lista",
        items: [
          "Moisés enseña a todos las leyes y el camino por donde deben andar (Éxodo 18:20).",
          "Escoge de entre el pueblo personas capaces, temerosas de Dios, de verdad, que aborrezcan la avaricia (18:21).",
          "Las pone como jefes de grupos de mil, de cien, de cincuenta y de diez (18:21).",
          "Ellas atienden los asuntos pequeños, y los graves llegan a Moisés (18:22).",
        ],
      },
      {
        t: "parrafo",
        texto: "El resultado lo anunció Jetro: «Así aliviarás la carga de sobre ti, y la llevarán ellos contigo».",
      },
      { t: "versiculo", ref: "Hechos 6:1-7" },
      {
        t: "parrafo",
        texto:
          "Cuando las viudas de los griegos eran desatendidas, los apóstoles dijeron: «No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas». La iglesia escogió a siete hombres «de buen testimonio, llenos del Espíritu Santo y de sabiduría», y los apóstoles siguieron en la oración y en el ministerio de la palabra. El resultado: «crecía la palabra del Señor».",
      },
      { t: "subtitulo", texto: "Cómo delegar bien" },
      {
        t: "lista",
        items: [
          "Delega en la persona adecuada, según su carácter y sus dones.",
          "Explica con claridad qué se espera, para cuándo y con qué recursos.",
          "Da también la autoridad para hacerlo, no solo la tarea.",
          "Acompaña y pide cuentas en fechas acordadas.",
          "Reconoce el trabajo y corrige con paciencia.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "Delegar no es abandonar",
        texto:
          "Delegar no es soltar una carga sobre otro y desaparecer. El líder sigue cerca, enseña, apoya y responde por el resultado.",
      },
    ],
    ideaClave:
      "Jetro enseñó a Moisés a delegar: enseñar a todos, escoger personas capaces y temerosas de Dios, ponerlas sobre grupos y atender solo lo grave. En Hechos 6, los apóstoles delegaron el servicio de las mesas y la palabra del Señor crecía. Delegar bien es dar la tarea con claridad y autoridad, acompañar y pedir cuentas.",
    paraLaVida: {
      texto: "Lo que haces tú solo termina contigo; lo que delegas bien, se multiplica.",
      pregunta: "¿Qué tarea de tu ministerio deberías delegar, y en quién?",
    },
  },
  {
    id: "n5-liderazgo-2-4",
    objetivos: [
      "Explicar la iglesia como un cuerpo con muchos miembros y dones.",
      "Describir las marcas de un equipo sano: propósito común, roles claros, unidad, confianza y rendición de cuentas.",
      "Aplicar prácticas para reuniones de equipo que sirvan.",
    ],
    paraEmpezar:
      "Nehemías reconstruyó el muro de Jerusalén en cincuenta y dos días. No lo hizo solo: cada grupo trabajó en su parte.",
    bloques: [
      { t: "versiculo", ref: "Nehemías 4:6" },
      {
        t: "parrafo",
        texto:
          "«Edificamos, pues, el muro, y toda la muralla fue terminada hasta la mitad de su altura, porque el pueblo tuvo ánimo para trabajar». Cada grupo reparó su tramo, algunos frente a su propia casa (Nehemías 3), y juntos terminaron el muro en cincuenta y dos días (Nehemías 6:15).",
      },
      { t: "versiculo", ref: "Eclesiastés 4:9-10" },
      {
        t: "parrafo",
        texto:
          "«Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero». En un equipo, unos sostienen a otros.",
      },
      { t: "subtitulo", texto: "Un cuerpo, muchos miembros" },
      { t: "versiculo", ref: "1 Corintios 12:12" },
      {
        t: "parrafo",
        texto:
          "«Porque así como el cuerpo es uno, y tiene muchos miembros, pero todos los miembros del cuerpo, siendo muchos, son un solo cuerpo, así también Cristo». En un equipo cristiano, cada uno aporta sus dones y nadie sobra (1 Corintios 12:21-22).",
      },
      { t: "subtitulo", texto: "Las marcas de un equipo sano" },
      {
        t: "lista",
        items: [
          "Un propósito común que todos conocen.",
          "Roles claros: cada uno sabe qué le toca.",
          "Unidad y humildad: cada uno estima a los demás como superiores a sí mismo (Filipenses 2:3).",
          "Confianza para decir la verdad con amor y para pedir ayuda.",
          "Rendición de cuentas: se cumple lo acordado.",
        ],
      },
      { t: "subtitulo", texto: "Reuniones que sirven" },
      {
        t: "lista",
        items: [
          "Empezar con la Palabra y la oración.",
          "Una agenda conocida de antemano y un horario que se respeta.",
          "Que todos puedan hablar y que nadie domine la reunión.",
          "Terminar con acuerdos claros: qué se hará, quién lo hará y para cuándo.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "El enemigo de la unidad",
        texto:
          "Las divisiones casi siempre empiezan por el orgullo y la crítica a escondidas. El líder guarda la unidad hablando de frente y con amor (Efesios 4:3).",
      },
    ],
    ideaClave:
      "La iglesia es un cuerpo con muchos miembros, y cada uno aporta sus dones. Un equipo sano tiene un propósito común, roles claros, unidad y humildad, confianza y rendición de cuentas, y sus reuniones terminan en acuerdos claros. Como en tiempos de Nehemías, cuando el pueblo tiene ánimo para trabajar juntos, la obra se termina.",
    paraLaVida: {
      texto: "Juntos llegamos más lejos que solos.",
      pregunta: "¿Qué marca de un equipo sano necesita fortalecer tu equipo, y qué harás para lograrlo?",
    },
  },
  {
    id: "n5-liderazgo-2-5",
    objetivos: [
      "Explicar los pasos bíblicos para resolver un conflicto, según Mateo 18 y Mateo 5.",
      "Aplicar principios para tratar un conflicto con humildad y verdad.",
      "Describir ejemplos bíblicos de conflictos y de cómo se resolvieron.",
    ],
    paraEmpezar:
      "Pablo y Bernabé, dos grandes misioneros, tuvieron un desacuerdo tan fuerte que se separaron. Los conflictos llegan también a los mejores equipos.",
    bloques: [
      { t: "versiculo", ref: "Mateo 18:15-17" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «Por tanto, si tu hermano peca contra ti, ve y repréndele estando tú y él solos; si te oyere, has ganado a tu hermano». Primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia.",
      },
      { t: "versiculo", ref: "Mateo 5:23-24" },
      {
        t: "parrafo",
        texto:
          "Y si eres tú el que ofendió: «deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano, y entonces ven y presenta tu ofrenda». La reconciliación no puede esperar.",
      },
      { t: "subtitulo", texto: "El camino del pacificador" },
      {
        t: "parrafo",
        texto:
          "Ken Sande, en su libro Pacificadores, resume el camino en cuatro pasos: buscar ante todo la gloria de Dios, sacar primero la viga del propio ojo (Mateo 7:5), restaurar al otro con mansedumbre (Gálatas 6:1) e ir a reconciliarse.",
      },
      {
        t: "lista",
        items: [
          "Escucha antes de responder (Santiago 1:19).",
          "Habla en privado y de frente, no a espaldas.",
          "Responde con calma: la blanda respuesta quita la ira (Proverbios 15:1).",
          "Ataca el problema, no a la persona: busca la solución, no ganar la discusión.",
          "Perdona como Cristo te perdonó (Colosenses 3:13).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplos bíblicos" },
      { t: "versiculo", ref: "Filipenses 4:2-3" },
      {
        t: "parrafo",
        texto:
          "Pablo rogó a Evodia y a Síntique «que sean de un mismo sentir en el Señor», y pidió a un compañero fiel que las ayudara: a veces hace falta alguien que medie. En Hechos 15, la iglesia resolvió un conflicto sobre la doctrina escuchando a todos, examinando la Escritura y buscando la dirección del Espíritu Santo. Y aunque Pablo y Bernabé se separaron por Juan Marcos (Hechos 15:39), años después Pablo reconoció que Marcos le era útil (2 Timoteo 4:11).",
      },
      {
        t: "nota",
        titulo: "Cuando hay abuso o delito",
        texto:
          "El camino de Mateo 18 es para las ofensas entre hermanos. Si hay abuso o un delito, primero se protege a la víctima y se acude a las autoridades, como enseña la materia de ética.",
      },
    ],
    ideaClave:
      "Jesús enseñó a resolver los conflictos hablando primero a solas, después con uno o dos más y solo al final ante la iglesia, y a buscar la reconciliación sin demora cuando uno ofendió. El pacificador busca la gloria de Dios, saca primero la viga de su propio ojo, restaura con mansedumbre y va a reconciliarse; escucha, habla de frente y perdona.",
    paraLaVida: {
      texto: "Un conflicto bien resuelto puede dejar a un equipo más unido que antes.",
      pregunta: "¿Con quién tienes un conflicto pendiente, y qué primer paso darás esta semana?",
    },
  },
  {
    id: "n5-liderazgo-2-6",
    objetivos: [
      "Explicar qué es una visión y cómo se convierte en metas y planes.",
      "Describir el liderazgo de servicio que enseñó Jesús.",
      "Planificar la sucesión según los ejemplos de Moisés y Josué y de Elías y Eliseo.",
    ],
    paraEmpezar:
      "Un líder sin visión solo mantiene lo que hay; un líder con visión lleva a otros hacia lo que Dios quiere hacer. Pero la visión de Jesús incluía una toalla y una cruz.",
    bloques: [
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo a Habacuc: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». En su contexto se refiere al mensaje que Dios dio al profeta, pero muestra un principio útil: lo que Dios pone en el corazón se escribe y se explica con claridad, para que otros puedan avanzar con ello.",
      },
      { t: "subtitulo", texto: "La visión y el plan" },
      {
        t: "lista",
        items: [
          "La visión responde a la pregunta: ¿hacia dónde nos lleva Dios?",
          "Las metas dicen qué se logrará y para cuándo.",
          "El plan dice quién hará qué, con qué recursos y en qué orden.",
          "Todo se encomienda a Dios (Proverbios 16:3).",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Nehemías oró, pidió al rey cartas y madera para la obra, recorrió los muros de noche y solo entonces compartió la visión con el pueblo (Nehemías 2).",
      },
      { t: "subtitulo", texto: "Líderes que sirven" },
      { t: "versiculo", ref: "Marcos 10:43-45" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «el que quiera hacerse grande entre vosotros será vuestro servidor». Él mismo «no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».",
      },
      { t: "subtitulo", texto: "Preparar a los que vienen detrás" },
      { t: "versiculo", ref: "Deuteronomio 31:7-8" },
      {
        t: "parrafo",
        texto:
          "Moisés preparó a Josué durante años y, delante de todo Israel, le dijo: «Esfuérzate y anímate». Elías llamó a Eliseo echando sobre él su manto (1 Reyes 19:19), y al final Eliseo recogió ese manto y siguió su obra (2 Reyes 2:13-15). El líder sabio prepara a quien seguirá la obra cuando él ya no esté.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Cuidar al líder",
        texto:
          "Un líder con visión también cuida su vida: descansa, ora, cuida a su familia y rinde cuentas. Nadie puede llevar a otros más lejos de lo que él mismo camina con Dios.",
      },
    ],
    ideaClave:
      "La visión responde hacia dónde nos lleva Dios, se escribe con claridad y se convierte en metas y planes, como hizo Nehemías. Jesús enseñó que el grande es el que sirve, y él mismo vino a servir y a dar su vida. El líder sabio prepara a quien seguirá la obra, como Moisés con Josué y Elías con Eliseo.",
    paraLaVida: {
      texto: "La mejor visión es la que se cumple también por medio de los que tú formaste.",
      pregunta: "¿Quién podría seguir tu ministerio si mañana tuvieras que dejarlo, y qué harás para prepararlo?",
    },
  },
];
