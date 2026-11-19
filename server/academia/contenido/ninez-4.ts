/**
 * Especialidad Niñez · Materia 4 — Protección de menores (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: por qué la iglesia protege a los niños,
 * las formas y las señales del abuso, la política de protección y la selección de los voluntarios, las reglas de cada
 * domingo, qué hacer cuando un niño cuenta algo, con lo que pide la ley en Texas (Código de Familia, secciones 261.101,
 * 261.106 y 261.109, verificadas), y el cuidado de las víctimas, de sus familias y de la iglesia. Es una guía general,
 * no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const NINEZ_4: LeccionContenido[] = [
  {
    id: "ninez-4-1",
    objetivos: [
      "Explicar por qué proteger a los niños es parte del amor de Dios y de la tarea de la iglesia.",
      "Distinguir los mitos de la realidad sobre el abuso de niños en las iglesias.",
      "Explicar qué es una política de protección y a quién protege.",
    ],
    paraEmpezar:
      "Muchas iglesias piensan que el abuso de niños es algo que pasa afuera. Pero también ha pasado en iglesias, y casi siempre donde nadie lo esperaba. Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=VsGlbwF4HtI", titulo: "Imagen de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Génesis 1:27" },
      {
        t: "parrafo",
        texto:
          "Cada niño lleva la imagen de Dios: «Y creó Dios al hombre a su imagen, a imagen de Dios lo creó». Su valor no depende de su edad ni de lo que pueda hacer. Por eso dañar a un niño es una ofensa contra él y contra su Creador.",
      },
      { t: "versiculo", ref: "Mateo 18:6" },
      {
        t: "parrafo",
        texto:
          "Jesús habló con mucha seriedad: «Y cualquiera que haga tropezar a alguno de estos pequeños que creen en mí, mejor le fuera que se le colgase al cuello una piedra de molino de asno, y que se le hundiese en lo profundo del mar». Pocas advertencias del Señor son tan fuertes.",
      },
      { t: "versiculo", ref: "Mateo 18:14" },
      {
        t: "parrafo",
        texto:
          "Y el Padre no quiere perder a ninguno: «no es la voluntad de vuestro Padre que está en los cielos, que se pierda uno de estos pequeños». Cuidar a los niños es parte de esa voluntad.",
      },
      { t: "versiculo", ref: "Salmos 82:3-4" },
      {
        t: "parrafo",
        texto:
          "Dios le pide a su pueblo: «Defended al débil y al huérfano; Haced justicia al afligido y al menesteroso». Los niños están entre los más débiles de la iglesia: no pueden defenderse solos, y muchas veces no saben contar lo que les pasa.",
      },
      { t: "subtitulo", texto: "Mitos y realidades" },
      {
        t: "lista",
        items: [
          "Mito: eso no pasa en nuestra iglesia. Realidad: el abuso también ha ocurrido en iglesias, y quien quiere dañar a un niño busca los lugares donde hay mucha confianza y pocas reglas.",
          "Mito: el abusador es un desconocido. Realidad: la mayoría de las veces es alguien que el niño conoce y en quien confía.",
          "Mito: a un abusador se le nota. Realidad: muchas veces es amable, servicial y respetado.",
          "Mito: si pasara algo, el niño lo contaría. Realidad: muchos niños nunca lo cuentan, por miedo, por vergüenza o porque los amenazaron.",
          "Mito: las reglas ofenden a los buenos voluntarios. Realidad: el buen voluntario las agradece, porque cuidan a los niños y también lo cuidan a él de una acusación falsa.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Por eso la iglesia no deja la protección a la buena voluntad de cada uno. Tiene una política de protección escrita: un documento que dice quién puede servir con niños, cómo se los cuida cada domingo y qué se hace si alguien sospecha algo. Las próximas lecciones la arman parte por parte.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el primer paso de una iglesia que no tiene política" },
      {
        t: "lista",
        items: [
          "Paso 1, decidir: el pastor y el coordinador de niños acuerdan que la iglesia tendrá una política escrita, aunque nunca haya pasado nada.",
          "Paso 2, formar un equipo: invitan a un maestro con experiencia, a un padre y, si lo hay, a un hermano que trabaje con niños en su profesión, como un maestro de escuela o una enfermera.",
          "Paso 3, mirar lo que ya se hace: anotan cómo se recibe a los niños, quién está en cada sala y qué pasa a la salida.",
          "Paso 4, buscar modelos: leen el protocolo de una alianza evangélica o el manual de otra iglesia, en lugar de empezar de cero.",
          "Paso 5, escribir y aprobar: redactan la política con las partes de las próximas lecciones, y el liderazgo la aprueba.",
          "Paso 6, enseñarla: la presentan a todos los maestros y a los padres, y fijan una fecha para revisarla cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una iglesia no necesita haber tenido un caso para tener una política. Se escribe antes, como se pone un extintor antes del incendio. Y se revisa una vez al año con el pastor y los maestros.",
      },
    ],
    ideaClave:
      "Cada niño lleva la imagen de Dios, y Jesús advirtió con mucha seriedad contra quien hace tropezar a uno de estos pequeños; el Padre no quiere que se pierda ninguno, y su pueblo defiende al débil. El abuso también ha ocurrido en iglesias, la mayoría de las veces por alguien conocido y de confianza, y muchos niños nunca lo cuentan. Por eso la iglesia tiene una política de protección escrita, que cuida a los niños y también a los que sirven.",
    paraLaVida: {
      texto: "Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús.",
      pregunta: "¿Tiene tu iglesia una política de protección escrita? ¿Quiénes la conocen?",
    },
  },
  {
    id: "ninez-4-2",
    objetivos: [
      "Describir las formas del abuso y de la negligencia.",
      "Reconocer las señales que pueden indicar que un niño sufre.",
      "Explicar el proceso con que un abusador se gana la confianza y busca el secreto.",
    ],
    paraEmpezar:
      "No se puede proteger a un niño de lo que no se conoce. El maestro no es un investigador, pero sí debe saber qué es el abuso, cómo se nota y cómo actúa quien quiere dañar a un niño.",
    bloques: [
      { t: "subtitulo", texto: "Las formas del abuso" },
      {
        t: "lista",
        items: [
          "El abuso físico: golpes o daños en el cuerpo del niño que no son accidentes.",
          "El abuso emocional: humillar, amenazar, rechazar o aterrorizar al niño de manera constante.",
          "El abuso sexual: cualquier contacto o conducta sexual de un adulto, o de alguien mayor, con un niño, aun sin tocarlo, como mostrarle pornografía.",
          "La negligencia: no darle al niño lo que necesita para vivir y estar seguro, como la comida, el cuidado médico o la supervisión.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto:
          "La Biblia elogia la prudencia: «El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño». El maestro prudente aprende a ver las señales a tiempo.",
      },
      { t: "subtitulo", texto: "Señales que pueden indicar que algo pasa" },
      {
        t: "lista",
        items: [
          "Heridas o moretones sin explicación, o con una explicación que no cuadra.",
          "Miedo a una persona en particular, o miedo a irse a casa.",
          "Cambios bruscos de conducta: un niño alegre que se vuelve triste, agresivo o muy callado.",
          "Conductas o palabras sexuales que no son propias de su edad.",
          "Volver a conductas de un niño más pequeño, como mojar la cama.",
          "Hambre constante, ropa siempre sucia o falta de cuidado médico.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Una señal sola no prueba nada: un niño puede estar triste por muchas razones. Pero varias señales juntas, o algo que el niño cuenta, son causa para actuar, como se verá en la lección 5.",
      },
      { t: "subtitulo", texto: "Cómo actúa quien quiere dañar a un niño" },
      {
        t: "lista",
        items: [
          "Elige a un niño: muchas veces uno que está solo, que necesita atención o que tiene problemas en casa.",
          "Se gana la confianza del niño y de su familia: regalos, favores, atención especial, ayuda con el transporte.",
          "Busca estar a solas con él: paseos, mensajes privados, clases particulares.",
          "Rompe los límites poco a poco: juegos de contacto, cosquillas, bromas y conversaciones que no son para su edad.",
          "Asegura el secreto: le dice que es un secreto entre los dos, lo hace sentir culpable o lo amenaza.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "En inglés este proceso se llama grooming; en español se habla de la preparación o la manipulación del niño. Los adultos que lo conocen pueden cortarlo en los primeros pasos, mucho antes de que haya abuso.",
      },
      { t: "versiculo", ref: "Juan 3:20-21" },
      {
        t: "parrafo",
        texto:
          "Jesús lo explicó: «todo aquel que hace lo malo, aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas». El que quiere dañar a un niño busca el secreto. Por eso las reglas de protección llenan de luz el ministerio: nada se hace a escondidas.",
      },
      { t: "versiculo", ref: "Efesios 5:11" },
      {
        t: "parrafo",
        texto:
          "Y la iglesia no calla lo malo: «no participéis en las obras infructuosas de las tinieblas, sino más bien reprendedlas».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ¿qué ves en este caso?" },
      {
        t: "lista",
        items: [
          "El caso: un ayudante de treinta años le trae regalos solo a una niña de nueve años, le pide su número para escribirle y se ofrece a llevarla sola a su casa después del culto.",
          "Paso 1, mirar los hechos: hay favoritismo, mensajes privados y un intento de quedarse a solas con ella.",
          "Paso 2, nombrar el riesgo: son pasos del proceso de manipulación, aunque todavía no haya abuso.",
          "Paso 3, actuar con las reglas: el coordinador le recuerda la política: nada de mensajes privados con menores, y ningún adulto lleva solo a un niño.",
          "Paso 4, anotar y avisar: el coordinador escribe lo que pasó, con la fecha, y lo informa al pastor.",
          "Paso 5, si hay más: si aparece una señal de abuso o la niña cuenta algo, se reporta a las autoridades, como se verá en la lección 5.",
        ],
      },
      {
        t: "nota",
        titulo: "Ver no es acusar",
        texto:
          "Reconocer una señal no es acusar a nadie: es aplicar las reglas a todos por igual. El buen voluntario no se ofende cuando se le recuerda la política.",
      },
    ],
    ideaClave:
      "El abuso puede ser físico, emocional o sexual, o puede ser negligencia. Hay señales que pueden indicar que un niño sufre, aunque una sola no prueba nada. Quien quiere dañar a un niño sigue un proceso: lo elige, se gana su confianza y la de su familia, busca estar a solas con él, rompe los límites poco a poco y asegura el secreto. El que hace lo malo aborrece la luz; por eso las reglas llenan de luz el ministerio y cortan ese proceso a tiempo.",
    paraLaVida: {
      texto: "El maestro no investiga, pero aprende a ver a tiempo.",
      pregunta: "¿Qué regla de tu ministerio cortaría el proceso de manipulación en sus primeros pasos?",
    },
  },
  {
    id: "ninez-4-3",
    objetivos: [
      "Describir las partes de una política de protección escrita.",
      "Seguir paso a paso la selección de un voluntario para el ministerio de niños.",
      "Explicar por qué la selección cuida a los niños y también a los que sirven.",
    ],
    paraEmpezar:
      "La primera protección de un niño es quién está a su lado. Por eso no cualquiera enseña en la clase de niños, aunque tenga buena voluntad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "1 Timoteo 5:22" },
      {
        t: "parrafo",
        texto:
          "Pablo le pidió a Timoteo: «No impongas con ligereza las manos a ninguno, ni participes en pecados ajenos». Poner a alguien en un servicio sin conocerlo es hacerlo con ligereza.",
      },
      { t: "versiculo", ref: "1 Timoteo 3:7" },
      {
        t: "parrafo",
        texto:
          "Y de los que dirigen dijo: «También es necesario que tenga buen testimonio de los de afuera». Lo que se sabe de una persona fuera de la iglesia también cuenta.",
      },
      { t: "subtitulo", texto: "Las partes de una política de protección" },
      {
        t: "parrafo",
        texto:
          "Los Estándares Internacionales de Protección Infantil Organizacional, de Keeping Children Safe, ordenan la protección en cuatro áreas. Sirven de guía para armar la política de la iglesia:",
      },
      {
        t: "lista",
        items: [
          "La política: un documento escrito y aprobado que dice cómo la iglesia protege a los niños.",
          "Las personas: quién puede servir con niños, cómo se lo selecciona y cómo se lo capacita.",
          "Los procedimientos: las reglas de cada domingo y lo que se hace si alguien sospecha algo o un niño cuenta algo.",
          "La rendición de cuentas: quién revisa que se cumpla, y cada cuánto se revisa la política.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la selección de un voluntario, paso a paso" },
      {
        t: "lista",
        items: [
          "Paso 1, asistir un tiempo: muchas iglesias piden que la persona asista unos seis meses antes de servir con niños.",
          "Paso 2, la solicitud: la persona llena un formulario con sus datos, dónde ha servido con niños y si alguna vez fue acusada o condenada por dañar a un menor.",
          "Paso 3, las referencias: dos o tres personas que la conocen; mejor si una es de otro ministerio donde sirvió con niños.",
          "Paso 4, la entrevista: el coordinador conversa con ella sobre su fe, su experiencia y la política de protección.",
          "Paso 5, la verificación de antecedentes: se consultan sus antecedentes penales y el registro público de delincuentes sexuales; en Texas, el del Departamento de Seguridad Pública.",
          "Paso 6, la capacitación: aprende la política, las señales del abuso y qué hacer si un niño cuenta algo.",
          "Paso 7, el comienzo acompañado: sirve unas semanas junto a un maestro con experiencia.",
          "Paso 8, renovar: la verificación y la capacitación se repiten cada cierto tiempo, según la política.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 14:15" },
      {
        t: "parrafo",
        texto:
          "El sabio no se deja llevar por las apariencias: «El simple todo lo cree; Mas el avisado mira bien sus pasos». Una buena impresión no reemplaza los pasos.",
      },
      {
        t: "parrafo",
        texto:
          "La selección no es una acusación. Todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años. Así se cuida a los niños, y también a los que sirven.",
      },
      {
        t: "nota",
        titulo: "Los adolescentes que ayudan",
        texto:
          "Los adolescentes pueden ayudar en la clase y aprender a servir, pero no cuentan como uno de los dos adultos de la sala, y nunca se quedan a solas con los niños.",
      },
    ],
    ideaClave:
      "Pablo pidió no imponer las manos con ligereza y buscar a quienes tienen buen testimonio de los de afuera. Una política de protección escrita ordena cuatro áreas: la política, las personas, los procedimientos y la rendición de cuentas. Cada voluntario pasa por los mismos pasos: asistir un tiempo, la solicitud, las referencias, la entrevista, la verificación de antecedentes, la capacitación, un comienzo acompañado y la renovación. El avisado mira bien sus pasos, y una buena impresión no los reemplaza.",
    paraLaVida: {
      texto: "Una buena impresión no reemplaza los pasos.",
      pregunta: "¿Cuál de los ocho pasos de la selección falta hoy en tu ministerio?",
    },
  },
  {
    id: "ninez-4-4",
    objetivos: [
      "Aplicar la regla de los dos adultos y las demás reglas de supervisión.",
      "Organizar el registro de entrada y salida de los niños.",
      "Distinguir el contacto y la comunicación apropiados de los que no lo son.",
    ],
    paraEmpezar:
      "Una política que se queda en un cajón no protege a nadie. La protección se ve cada domingo: en quién está en la sala, en cómo se recibe y se entrega a cada niño, y en cómo se comportan los adultos.",
    bloques: [
      { t: "versiculo", ref: "Nehemías 4:9" },
      {
        t: "parrafo",
        texto:
          "Cuando reconstruían el muro, el pueblo oró y vigiló: «Entonces oramos a nuestro Dios, y por causa de ellos pusimos guarda contra ellos de día y de noche». La iglesia hace lo mismo: ora por los niños y también pone guardas.",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "Pablo manejaba la ofrenda con testigos, «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres». En el ministerio de niños, eso significa que todo se hace a la vista de otros.",
      },
      { t: "subtitulo", texto: "Las reglas básicas" },
      {
        t: "lista",
        items: [
          "La regla de los dos adultos: nunca hay un solo adulto a solas con un niño; en cada sala hay al menos dos adultos seleccionados, mejor si no son de la misma familia.",
          "Puertas abiertas o con ventana: lo que pasa en la sala se puede ver desde afuera.",
          "El registro de entrada y salida: cada niño se anota al llegar, y solo se entrega a quien lo trajo o a quien sus padres autorizaron.",
          "El baño: los pequeños van en grupo con un adulto que espera en la puerta, y los pañales se cambian a la vista de otro adulto.",
          "El contacto apropiado: un abrazo de lado, chocar las manos o una mano en el hombro; nunca un contacto que el niño no quiere, ni en las partes privadas del cuerpo.",
          "La comunicación: ningún adulto se escribe en privado con un niño; los mensajes van a los padres o a un grupo donde hay otro adulto.",
          "Las fotos: solo con el permiso de los padres, y sin publicar el nombre del niño ni dónde vive.",
          "La salud y las emergencias: una ficha con las alergias y el teléfono de los padres, un botiquín y un plan para salir de la sala contando a cada niño.",
        ],
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:22" },
      {
        t: "parrafo",
        texto:
          "Las reglas también protegen al maestro: «Absteneos de toda especie de mal». El que nunca se queda a solas con un niño está protegido de una acusación falsa.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un domingo, paso a paso" },
      {
        t: "lista",
        items: [
          "Antes de abrir: llegan los dos maestros, oran juntos y revisan la sala: la ventana de la puerta, el botiquín y la lista de alergias.",
          "La llegada: un adulto atiende el registro; cada niño recibe una etiqueta con un número, y quien lo trae recibe otra con el mismo número.",
          "Durante la clase: los dos maestros están siempre en la sala; si un niño va al baño, va con otros niños y con un adulto que espera en la puerta.",
          "Si falta un maestro: la clase se une con otra sala, o se busca a otro adulto seleccionado; nunca se queda uno solo.",
          "La salida: el maestro entrega a cada niño solo a quien tiene la etiqueta con su número.",
          "Si viene otra persona: si alguien sin etiqueta quiere llevarse a un niño, no se le entrega; el maestro llama a los padres.",
          "Al final: los maestros anotan cualquier herida, pelea o cosa extraña, y se la cuentan a los padres y al coordinador.",
        ],
      },
      {
        t: "nota",
        titulo: "Si alguien no cumple",
        texto:
          "Cuando un voluntario no cumple una regla, el coordinador se lo recuerda en privado. Si lo repite, deja de servir hasta que la cumpla. Las reglas valen para todos.",
      },
    ],
    ideaClave:
      "Nehemías oró y puso guardas, y Pablo hacía las cosas honradamente delante del Señor y de los hombres. Cada domingo la protección se ve en la regla de los dos adultos, las puertas con ventana, el registro de entrada y salida con etiquetas, el cuidado en el baño, el contacto y la comunicación apropiados, el permiso para las fotos y el plan de emergencias. Las reglas cuidan a los niños, y también protegen a los maestros de una acusación falsa.",
    paraLaVida: {
      texto: "Una política que se queda en un cajón no protege a nadie.",
      pregunta: "¿Qué regla de esta lección se rompe más seguido en tu iglesia?",
    },
  },
  {
    id: "ninez-4-5",
    objetivos: [
      "Responder con calma, y sin preguntas que sugieran la respuesta, cuando un niño cuenta un abuso.",
      "Explicar lo que pide la ley de Texas a quien sospecha un abuso o una negligencia.",
      "Reportar a las autoridades y avisar a la iglesia, sin investigar por cuenta propia.",
    ],
    paraEmpezar:
      "Puede pasar en cualquier momento: al final de la clase, un niño te cuenta algo que te deja sin palabras. Lo que hagas en los minutos siguientes puede cambiar su vida.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Proverbios 31:8-9" },
      {
        t: "parrafo",
        texto:
          "El sabio pide: «Abre tu boca por el mudo En el juicio de todos los desvalidos». Un niño que sufre un abuso casi no tiene voz. El adulto que lo escucha y lo reporta habla por él.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un niño te cuenta algo" },
      {
        t: "lista",
        items: [
          "Paso 1, mantener la calma: aunque te duela, no muestres espanto ni enojo; el niño podría pensar que te enojaste con él.",
          "Paso 2, escuchar: deja que hable con sus palabras, sin interrumpirlo.",
          "Paso 3, creerle y agradecerle: dile que hizo bien en contarlo y que no es su culpa.",
          "Paso 4, no prometer el secreto: dile que lo vas a contar solo a las personas que pueden ayudarlo.",
          "Paso 5, no interrogar: no hagas muchas preguntas ni preguntas que sugieran la respuesta, como ¿fue tal persona?; las preguntas las hacen los investigadores.",
          "Paso 6, escribir: anota cuanto antes lo que dijo, con sus mismas palabras, la fecha y la hora.",
          "Paso 7, reportar de inmediato: llama a la línea de reporte y avisa al responsable del ministerio.",
        ],
      },
      { t: "subtitulo", texto: "Lo que pide la ley en Texas" },
      {
        t: "lista",
        items: [
          "Toda persona que tiene causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato (Código de Familia de Texas, sección 261.101).",
          "Los profesionales, como los maestros, las enfermeras, los médicos y los empleados de guarderías, deben reportarlo a más tardar 24 horas después de tener causa razonable para creerlo, y no pueden pedirle a otro que lo haga por ellos.",
          "La obligación vale sin excepción también para quienes reciben confidencias, como los pastores, los abogados y los consejeros.",
          "No reportar a sabiendas es un delito menor de clase A (sección 261.109).",
          "Se reporta a la Línea directa de Texas para reportar abuso, al 1-800-252-5400, a cualquier hora, o por internet en txabusehotline.org cuando no es una emergencia.",
          "En una emergencia, o si el niño corre peligro ahora, se llama al 911.",
          "La ley protege a quien reporta de buena fe (sección 261.106).",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades. Avisar a la iglesia también es necesario, para proteger a los demás niños, pero no reemplaza el reporte. Y no hace falta tener pruebas: basta con tener causa razonable para creerlo. Investigar es tarea de las autoridades.",
      },
      { t: "versiculo", ref: "Romanos 13:3-4" },
      {
        t: "parrafo",
        texto:
          "Dios puso a las autoridades para proteger: la autoridad «es servidor de Dios para tu bien», y castiga «al que hace lo malo». Reportar un abuso no es traicionar a la iglesia: es dejar que el servidor de Dios haga su trabajo.",
      },
      { t: "subtitulo", texto: "Lo que no se hace" },
      {
        t: "lista",
        items: [
          "No se investiga por cuenta propia, ni se busca a otros niños para preguntarles.",
          "No se habla con la persona acusada ni con su familia antes de que actúen las autoridades: podría poner al niño en peligro o borrar pruebas.",
          "No se espera a tener pruebas, ni a que el pastor decida.",
          "No se resuelve en privado con una disculpa, una reunión o una disciplina de la iglesia en lugar del reporte.",
          "No se cuenta a otros hermanos que no necesitan saberlo.",
        ],
      },
      { t: "versiculo", ref: "Lucas 8:17" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «nada hay oculto, que no haya de ser manifestado». La iglesia que esconde un abuso para cuidar su nombre pierde su testimonio y deja solo al niño.",
      },
      {
        t: "nota",
        titulo: "Fuera de Texas",
        texto:
          "Esta lección es una guía general, no un consejo legal. En otros estados y países la ley cambia: averigua lo que pide la tuya y anota en la política el número para reportar.",
      },
    ],
    ideaClave:
      "Cuando un niño cuenta un abuso, el adulto abre la boca por el que no tiene voz: mantiene la calma, escucha, le cree, no promete el secreto, no lo interroga, escribe lo que dijo y lo reporta de inmediato. En Texas, toda persona con causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo enseguida, los profesionales a más tardar en 24 horas, sin excepción para los pastores, a la línea 1-800-252-5400 o al 911 en una emergencia. Contárselo al pastor no reemplaza el reporte, y no se investiga por cuenta propia.",
    paraLaVida: {
      texto: "No esperes a tener pruebas: basta con tener causa razonable para creerlo.",
      pregunta: "¿Saben todos los maestros de tu iglesia a qué número se reporta un abuso?",
    },
  },
  {
    id: "ninez-4-6",
    objetivos: [
      "Explicar, con la historia de Tamar, lo que la iglesia no debe hacer ante un abuso.",
      "Acompañar a un niño y a su familia después de un abuso.",
      "Distinguir el perdón, la confianza y las consecuencias.",
    ],
    paraEmpezar:
      "Reportar es el primer paso, no el último. Después quedan un niño herido, una familia que sufre y una iglesia que necesita saber qué hacer. La Biblia también cuenta lo que pasa cuando una familia del pueblo de Dios hace silencio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "2 Samuel 13:20-21" },
      {
        t: "parrafo",
        texto:
          "Tamar, la hija de David, fue violada por su medio hermano Amnón. Su hermano Absalón le dijo: «Pues calla ahora, hermana mía; tu hermano es; no se angustie tu corazón por esto». Y del rey dice: «Y luego que el rey David oyó todo esto, se enojó mucho», pero la Biblia no cuenta que hiciera algo. «Y se quedó Tamar desconsolada en casa de Absalón su hermano».",
      },
      { t: "subtitulo", texto: "Lo que salió mal en la casa de David" },
      {
        t: "lista",
        items: [
          "Se hizo callar a la víctima: «Pues calla ahora, hermana mía».",
          "Se cuidó al agresor porque era de la familia: «tu hermano es».",
          "Se le quitó importancia al daño: «no se angustie tu corazón por esto».",
          "El que tenía autoridad se enojó, pero no actuó.",
          "La víctima quedó sola y desconsolada, y el silencio terminó en más violencia: dos años después, Absalón hizo matar a Amnón.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La iglesia aprende de ese error: no hace callar a la víctima, no protege al agresor porque es de la familia de la fe, no le quita importancia al daño y no se queda en el enojo. Actúa.",
      },
      { t: "subtitulo", texto: "Acompañar al niño y a su familia" },
      {
        t: "lista",
        items: [
          "Creerles y no culparlos: el niño no tuvo la culpa, y la familia necesita apoyo, no sospechas.",
          "Protegerlos del contacto con la persona acusada, también dentro de la iglesia.",
          "Cuidar su privacidad: su nombre y su historia no se cuentan.",
          "Ayudarlos a recibir ayuda profesional, de alguien con experiencia en el trauma de los niños.",
          "Acompañarlos con paciencia: la sanidad lleva tiempo, y no se los presiona para que hablen ni para que perdonen pronto.",
          "Seguir a su lado: visitarlos, orar con ellos y cuidar que el niño pueda volver a una clase segura.",
        ],
      },
      { t: "versiculo", ref: "Salmos 147:3" },
      {
        t: "parrafo",
        texto:
          "Dios es el que sana: «El sana a los quebrantados de corazón, Y venda sus heridas». La iglesia no reemplaza la ayuda profesional, pero acompaña con la esperanza de un Dios que venda las heridas.",
      },
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo llama a Dios «Padre de misericordias y Dios de toda consolación, el cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar a los que están en cualquier tribulación». El consuelo que la iglesia recibió de Dios es el que ahora ofrece.",
      },
      { t: "subtitulo", texto: "El perdón, la confianza y las consecuencias" },
      {
        t: "lista",
        items: [
          "El perdón: es un paso del corazón delante de Dios, que no se le exige con prisa a la víctima.",
          "La confianza: se gana con el tiempo y con hechos; quien dañó a un niño no vuelve a servir con niños.",
          "Las consecuencias: la ley sigue su curso, aunque haya arrepentimiento.",
          "La asistencia: si una persona que cometió un abuso quiere congregarse, muchas iglesias le piden un acuerdo escrito: siempre acompañada por un adulto designado, nunca en las áreas de los niños y nunca en un servicio con menores.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: lo que hace el liderazgo después de un reporte" },
      {
        t: "lista",
        items: [
          "Paso 1, proteger: la persona acusada deja todo servicio con menores mientras las autoridades investigan.",
          "Paso 2, cooperar: el liderazgo colabora con las autoridades y no hace su propia investigación.",
          "Paso 3, acompañar: un líder de confianza visita a la familia del niño y le ofrece ayuda.",
          "Paso 4, informar con prudencia: se le dice a la iglesia lo necesario, sin el nombre de la víctima y con consejo legal.",
          "Paso 5, revisar: se revisa la política: ¿qué regla falló o no se cumplió?",
          "Paso 6, seguir cuidando: el niño y su familia siguen siendo parte del rebaño.",
        ],
      },
      { t: "versiculo", ref: "Isaías 1:17" },
      {
        t: "parrafo",
        texto:
          "Dios le pide a su pueblo: «aprended a hacer el bien; buscad el juicio, restituid al agraviado, haced justicia al huérfano». Cuidar a la víctima es hacer justicia al que no puede defenderse.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Ten a mano, antes de que haga falta, el nombre de un consejero profesional con experiencia en niños y el de un abogado que pueda orientar a la iglesia.",
      },
    ],
    ideaClave:
      "En la casa de David se hizo callar a Tamar, se protegió al agresor, se le quitó importancia al daño y el rey se enojó pero no actuó; la víctima quedó desconsolada y el silencio terminó en más violencia. La iglesia actúa: cree al niño y a su familia, los protege del acusado, cuida su privacidad, los ayuda a recibir ayuda profesional y los acompaña con paciencia, con el consuelo del Dios que sana a los quebrantados de corazón. El perdón no devuelve la confianza: quien dañó a un niño no vuelve a servir con niños, y la ley sigue su curso.",
    paraLaVida: {
      texto: "Reportar es el primer paso, no el último.",
      pregunta: "¿Quién acompañaría hoy a una familia de tu iglesia si un niño contara un abuso?",
    },
  },
];
