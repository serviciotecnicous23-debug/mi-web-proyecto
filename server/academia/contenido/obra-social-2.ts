/**
 * Especialidad Obra social y misericordia · Materia 2 — Diaconía y servicio (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: la diaconía como servicio,
 * el carácter y el orden de los que sirven, el fondo de ayuda (con la regla de la Publicación 526 del IRS sobre las
 * ofrendas señaladas para una persona), el cuidado práctico, la primera entrevista y los recursos de la comunidad (con
 * el 2-1-1 de Texas y el reporte del abuso: toda persona de inmediato, y los profesionales a más tardar en 24 horas), y
 * el corazón del que sirve. Quién ejerce cada cargo, y el ministerio de la mujer, quedan para la declaración de fe del
 * ministerio. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const OBRA_SOCIAL_2: LeccionContenido[] = [
  {
    id: "obra-social-2-1",
    objetivos: [
      "Explicar, con Marcos 10:45, que Jesús vino para servir y nos dio ejemplo.",
      "Reconocer qué significa la palabra diaconía y los dones de servicio y de misericordia.",
      "Servir en algo concreto con el poder que Dios da.",
    ],
    paraEmpezar:
      "La palabra diaconía viene del griego y quiere decir servicio. En el Nuevo Testamento, servir no es una tarea menor: es la manera de vivir de Jesús, que lavó los pies de sus discípulos. Toda la iglesia está llamada a servir, y algunos reciben dones especiales de servicio y de misericordia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 10:45" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos». El Señor de todo se hizo siervo.",
      },
      { t: "versiculo", ref: "Juan 13:14-15" },
      {
        t: "parrafo",
        texto:
          "Después de lavar los pies de sus discípulos, Jesús les dijo: «Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».",
      },
      { t: "versiculo", ref: "1 Pedro 4:11" },
      {
        t: "parrafo",
        texto:
          "Pedro escribe: «si alguno ministra, ministre conforme al poder que Dios da, para que en todo sea Dios glorificado». El servicio no se hace con nuestras fuerzas ni para nuestra gloria.",
      },
      { t: "subtitulo", texto: "Qué es la diaconía" },
      {
        t: "lista",
        items: [
          "En griego, diakonía (Strong G1248) es el servicio, y diákonos (Strong G1249), el que sirve; la misma familia de palabras se usa para servir a las mesas y para el ministerio de la palabra (Hechos 6:2 y 4).",
          "Todos los creyentes sirven: cada uno ministra a los otros con el don que recibió (1 Pedro 4:10).",
          "Algunos tienen el don del servicio y el de hacer misericordia, que se ejerce con alegría (Romanos 12:7-8).",
          "La diaconía de la iglesia cuida al cuerpo y al alma: comida, visitas, compañía y ayuda práctica.",
          "Servir es seguir a Jesús, que vino a servir (Marcos 10:45).",
          "Quién ejerce cada cargo en la iglesia queda para la declaración de fe del ministerio; esta materia trata del servicio de misericordia de toda la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: servir para ser visto y servir como Cristo" },
      {
        t: "lista",
        items: [
          "Para ser visto: busca el aplauso y el puesto. Como Cristo: lava los pies aunque nadie lo note.",
          "Para ser visto: sirve cuando le conviene. Como Cristo: sirve también cuando cuesta.",
          "Para ser visto: sirve con sus fuerzas y se agota. Como Cristo: sirve con el poder que Dios da y le da a él la gloria.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el hermano que no se siente útil" },
      {
        t: "parrafo",
        texto:
          "Un hermano quiere servir, pero dice que no tiene talentos para estar al frente. La encargada de la misericordia lo ayuda a encontrar su lugar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharlo y recordarle que Jesús vino a servir y no a ser servido.",
          "Paso 2, preguntarle qué le gusta hacer y qué sabe: manejar, cocinar, arreglar cosas o visitar.",
          "Paso 3, mostrarle las necesidades de la iglesia: llevar a los ancianos al médico, preparar comidas o reparar una casa.",
          "Paso 4, invitarlo a probar una tarea concreta por un mes, junto a un hermano con experiencia.",
          "Paso 5, orar con él para que sirva con el poder que Dios da (1 Pedro 4:11).",
          "Paso 6, conversar al final del mes sobre cómo le fue y dar gracias por su servicio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nadie es demasiado poco para servir. Ayuda a cada hermano a encontrar su lugar en la diaconía, y recuerda que el que sirve en lo práctico también le sirve al Señor.",
      },
    ],
    ideaClave:
      "La diaconía es el servicio: Jesús no vino para ser servido, sino para servir (Marcos 10:45), y nos dio ejemplo al lavar los pies de sus discípulos (Juan 13:15). Toda la iglesia sirve con los dones que recibió, algunos con el don del servicio y el de la misericordia, y lo hace con el poder que Dios da, para que él sea glorificado (1 Pedro 4:11).",
    paraLaVida: {
      texto: "Sirvo como Jesús, también cuando nadie me ve.",
      pregunta: "¿Qué tarea sencilla de servicio puedes tomar este mes en tu iglesia?",
    },
  },
  {
    id: "obra-social-2-2",
    objetivos: [
      "Describir cómo escogió la iglesia a los siete de Hechos 6 y para qué.",
      "Explicar el carácter que pide 1 Timoteo 3:8-10 a los que sirven.",
      "Organizar un equipo de misericordia con personas probadas y funciones claras.",
    ],
    paraEmpezar:
      "El servicio de misericordia toca dinero, casas y vidas en crisis. Por eso la Biblia pide que los que sirven tengan buen carácter, sean probados primero y trabajen con orden. Hechos 6 y 1 Timoteo 3 muestran cómo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Hechos 6:2-3" },
      {
        t: "parrafo",
        texto:
          "Los apóstoles dijeron que no era justo dejar la palabra de Dios «para servir a las mesas», y pidieron buscar «siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría». Hubo orden: la iglesia escogió y los apóstoles les encargaron la tarea.",
      },
      { t: "versiculo", ref: "1 Timoteo 3:8-10" },
      {
        t: "parrafo",
        texto:
          "Los que sirven deben ser «honestos, sin doblez, no dados a mucho vino, no codiciosos de ganancias deshonestas», y ser «sometidos a prueba primero».",
      },
      { t: "versiculo", ref: "Romanos 16:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo recomienda a Febe, «diaconisa de la iglesia en Cencrea», y pide que la ayuden, «porque ella ha ayudado a muchos». La iglesia reconocía y apoyaba a los que servían.",
      },
      { t: "subtitulo", texto: "El carácter del que sirve" },
      {
        t: "lista",
        items: [
          "Buen testimonio dentro y fuera de la iglesia (Hechos 6:3).",
          "Lleno del Espíritu y de sabiduría, para servir con amor y con buen juicio.",
          "Honesto y sin doblez: dice lo mismo a todos y no promete lo que no hará.",
          "No codicioso: el dinero de la misericordia nunca es para provecho propio.",
          "Probado primero: empieza con tareas pequeñas antes de recibir más (1 Timoteo 3:10).",
          "Quién ejerce cada cargo, y el ministerio de la mujer, quedan por confirmar en la declaración de fe del ministerio; aquí se habla del carácter de todos los que sirven.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un equipo improvisado y un equipo ordenado" },
      {
        t: "lista",
        items: [
          "Improvisado: ayuda el que tiene tiempo, sin saber qué hace el otro. Ordenado: cada uno sabe su tarea y a quién informa.",
          "Improvisado: cualquiera maneja el dinero. Ordenado: dos personas de confianza deciden y registran cada ayuda.",
          "Improvisado: entra a servir el que llegó ayer. Ordenado: primero se conoce y se prueba al que sirve.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el primer equipo de misericordia" },
      {
        t: "parrafo",
        texto:
          "El pastor quiere formar el primer equipo de misericordia de la iglesia, que hoy es solo una hermana que lo hace todo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y pedir a la iglesia que proponga a hermanos de buen testimonio.",
          "Paso 2, conversar con cada uno sobre su llamado, su carácter y su tiempo.",
          "Paso 3, empezar con tareas pequeñas para conocerlos y probarlos, como pide 1 Timoteo 3:10.",
          "Paso 4, repartir las funciones: quién recibe los pedidos, quién visita, quién lleva las cuentas y quién coordina.",
          "Paso 5, escribir las reglas del equipo: cómo se decide una ayuda, la confidencialidad y cómo se informa.",
          "Paso 6, presentar el equipo a la iglesia y orar por él, como en Hechos 6:6.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un equipo de misericordia necesita corazón y orden. Escoge a personas probadas, reparte las tareas y escribe las reglas antes de la primera crisis: así se protege a los que reciben y a los que sirven.",
      },
      {
        t: "cuadro",
        titulo: "Las funciones de un equipo de misericordia",
        columnas: ["Función", "Qué hace", "Cuidado especial"],
        filas: [
          ["Coordinación", "Organiza al equipo y lleva los casos al consejo", "No decide sola las ayudas grandes"],
          ["Recepción", "Recibe los pedidos y hace la primera entrevista", "Escucha con respeto y guarda la confidencialidad"],
          ["Visitas", "Visita a la familia y conoce su situación", "Siempre en pareja"],
          ["Tesorería", "Paga y registra cada ayuda", "Dos firmas y el pago directo a quien se le debe"],
          ["Recursos", "Conoce las ayudas de la comunidad", "Tiene al día la lista de lugares y teléfonos"],
        ],
      },
    ],
    ideaClave:
      "La primera iglesia escogió a siete de buen testimonio, llenos del Espíritu y de sabiduría, para servir a las mesas (Hechos 6:3), y Pablo pidió que los que sirven sean honestos, sin doblez, no codiciosos y probados primero (1 Timoteo 3:8-10). Un equipo de misericordia se forma con personas probadas, funciones claras y reglas escritas, y la iglesia reconoce a los que sirven, como Pablo a Febe.",
    paraLaVida: {
      texto: "Cuido mi carácter, porque el servicio se apoya en la confianza.",
      pregunta: "¿Hay algo en tu manera de servir que necesites ordenar o corregir?",
    },
  },
  {
    id: "obra-social-2-3",
    objetivos: [
      "Explicar los principios bíblicos para ayudar con dinero: la familia primero, el trabajo y la transparencia.",
      "Escribir las reglas de un fondo de ayuda de la iglesia.",
      "Decidir, con esas reglas, cómo responder a un pedido de dinero.",
    ],
    paraEmpezar:
      "Muchas iglesias tienen un fondo para ayudar a las personas en crisis: la renta, la luz o una medicina. Un fondo así hace mucho bien si tiene reglas claras; sin ellas, se vuelve injusto, se acaba pronto o se presta al abuso. La Biblia da los principios, y la ley pide algunos cuidados.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Timoteo 5:4" },
      {
        t: "parrafo",
        texto:
          "Si una viuda tiene hijos o nietos, «aprendan éstos primero a ser piadosos para con su propia familia». La familia es la primera red de ayuda; la iglesia ayuda donde la familia no puede.",
      },
      { t: "versiculo", ref: "2 Tesalonicenses 3:10" },
      {
        t: "parrafo",
        texto:
          "Pablo enseñó: «Si alguno no quiere trabajar, tampoco coma». La regla habla del que no quiere trabajar, no del que no puede: la ayuda anima a trabajar a quien puede hacerlo y sostiene al que no puede.",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "Pablo cuidaba la ofrenda «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres». El fondo se maneja con registros y rindiendo cuentas.",
      },
      { t: "subtitulo", texto: "Las reglas de un buen fondo" },
      {
        t: "lista",
        items: [
          "Un propósito escrito: para qué se usa el fondo y para qué no.",
          "Criterios claros: la necesidad real, quién puede pedir y cada cuánto, y un límite por familia.",
          "Decide un equipo, no una sola persona, y las ayudas grandes las aprueba el consejo.",
          "Se paga directamente a quien se le debe, como al dueño de la vivienda o a la compañía de la luz, en vez de dar efectivo.",
          "Cada ayuda se registra, se guarda la confidencialidad y se informa al consejo sin nombres.",
          "Las ofrendas para el fondo las administra la iglesia; según la Publicación 526 del IRS, no se deduce lo que se da señalado para una persona en particular, aunque se entregue por medio de la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda sin reglas y la ayuda con reglas" },
      {
        t: "lista",
        items: [
          "Sin reglas: recibe más el que insiste más. Con reglas: recibe el que más lo necesita.",
          "Sin reglas: se da efectivo y nadie sabe en qué se usó. Con reglas: se paga la cuenta y queda el recibo.",
          "Sin reglas: el fondo se acaba en enero. Con reglas: alcanza para todo el año, porque tiene un límite por familia.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el pedido para la renta" },
      {
        t: "parrafo",
        texto:
          "Un hombre llega el martes a la oficina de la iglesia y pide 600 dólares para la renta, porque dice que lo van a desalojar el viernes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharlo con respeto, en una entrevista con dos personas del equipo.",
          "Paso 2, preguntarle por su situación, su trabajo, su familia y otras ayudas que ya pidió, y pedirle el aviso del dueño.",
          "Paso 3, revisar las reglas del fondo: si cumple los criterios y cuánto se puede dar.",
          "Paso 4, si se aprueba, pagar directamente al dueño de la vivienda y guardar el recibo.",
          "Paso 5, conectarlo con otras ayudas de la comunidad para la renta y con una bolsa de trabajo.",
          "Paso 6, registrar la ayuda, llamarlo en dos semanas y orar por él.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo legal de esta materia es una guía general, no un consejo legal. Las reglas del fondo protegen al que recibe, al que sirve y a la iglesia: escríbelas antes de que llegue el primer pedido y revísalas cada año, y ante una duda de impuestos consulta a un contador.",
      },
      {
        t: "pasos",
        titulo: "Cómo se decide una ayuda del fondo",
        pasos: [
          { titulo: "Recibir el pedido", texto: "Escuchar con respeto, con dos personas del equipo, y anotar la necesidad." },
          { titulo: "Conocer la situación", texto: "Preguntar por el trabajo, la familia y otras ayudas, y pedir los papeles de la deuda." },
          { titulo: "Revisar las reglas", texto: "Ver si cumple los criterios y cuánto permite el límite por familia." },
          { titulo: "Decidir en equipo", texto: "Aprobar la ayuda entre dos o más, y llevar al consejo las grandes." },
          { titulo: "Pagar y registrar", texto: "Pagar directamente a quien se le debe, guardar el recibo y anotar la ayuda." },
          { titulo: "Acompañar", texto: "Conectar con otros recursos, llamar después y orar por la persona." },
        ],
      },
    ],
    ideaClave:
      "La Biblia enseña que la familia ayuda primero (1 Timoteo 5:4), que el que no quiere trabajar tampoco coma, aunque se sostiene al que no puede (2 Tesalonicenses 3:10), y que el dinero se maneja con honradez delante de Dios y de los hombres (2 Corintios 8:21). Un buen fondo de ayuda tiene un propósito escrito, criterios y límites, decide en equipo, paga directamente a quien se le debe, registra cada ayuda y guarda la confidencialidad.",
    paraLaVida: {
      texto: "Ayudo con generosidad y con orden.",
      pregunta: "¿Tu iglesia tiene reglas claras para ayudar con dinero, o recibe más el que insiste más?",
    },
  },
  {
    id: "obra-social-2-4",
    objetivos: [
      "Explicar, con Romanos 12:13 y Proverbios 3:27-28, por qué el servicio práctico es parte de la fe.",
      "Organizar ayudas prácticas: comidas, transporte, reparaciones y compañía.",
      "Cuidar la seguridad y el respeto al servir en las casas.",
    ],
    paraEmpezar:
      "Muchas veces la necesidad no es dinero, sino manos: una comida después de una operación, un viaje al médico, una puerta que no cierra o una tarde de compañía. Dorcas hacía túnicas para las viudas, y cuando murió, todas mostraban lo que ella había hecho. El servicio práctico se recuerda por años.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 12:13" },
      {
        t: "parrafo",
        texto:
          "Pablo pide vivir «compartiendo para las necesidades de los santos; practicando la hospitalidad». El amor se ve en la mesa abierta y en la mano que ayuda.",
      },
      { t: "versiculo", ref: "Proverbios 3:27-28" },
      {
        t: "parrafo",
        texto:
          "«No te niegues a hacer el bien a quien es debido, Cuando tuvieres poder para hacerlo». Si puedo ayudar hoy, no le digo a mi prójimo que vuelva mañana.",
      },
      { t: "versiculo", ref: "Hechos 9:39" },
      {
        t: "parrafo",
        texto:
          "Las viudas rodearon a Pedro llorando y «mostrando las túnicas y los vestidos que Dorcas hacía cuando estaba con ellas». Su servicio sencillo dejó huella.",
      },
      { t: "subtitulo", texto: "Ayudas prácticas que una iglesia puede organizar" },
      {
        t: "lista",
        items: [
          "Comidas: un calendario para llevar comida a una familia después de un nacimiento, una operación o un luto.",
          "Transporte: llevar a los ancianos y a los enfermos al médico, a la tienda o al templo.",
          "Reparaciones: arreglos sencillos en la casa de una viuda o de un anciano, con hermanos que saben del oficio.",
          "Compañía: visitas y llamadas a los que están solos, y un respiro para los que cuidan a un enfermo.",
          "Ropa y cosas de la casa: recibir y entregar lo que está en buen estado, con orden y con dignidad.",
          "Hospitalidad: abrir la casa a una familia recién llegada o a un hermano de paso (Romanos 12:13).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda que estorba y la ayuda que sirve" },
      {
        t: "lista",
        items: [
          "Estorba: llegar sin avisar a cualquier hora. Sirve: preguntar qué día y a qué hora conviene.",
          "Estorba: llevar ropa rota o sucia. Sirve: dar lo que uno mismo usaría.",
          "Estorba: arreglar algo sin saber y dejarlo peor. Sirve: mandar a quien sabe, o pagar a un profesional.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la hermana que sale del hospital" },
      {
        t: "parrafo",
        texto:
          "Una hermana de la iglesia, que vive sola, sale del hospital después de una operación de cadera y no puede manejar ni cocinar por un mes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, llamarla y preguntarle qué necesita y qué días le conviene recibir ayuda.",
          "Paso 2, hacer un calendario de comidas con hermanas y hermanos que se anoten por día.",
          "Paso 3, organizar el transporte a sus citas médicas con choferes que tengan licencia y seguro.",
          "Paso 4, revisar con su permiso si la casa necesita algo para que no se caiga, como una barra en el baño.",
          "Paso 5, que la visiten siempre dos personas o con aviso, respetando su casa y su intimidad.",
          "Paso 6, llamarla cada semana y terminar el plan cuando ya pueda valerse por sí misma.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El servicio en las casas pide respeto y cuidado: avisa antes de ir, visita en pareja, no tomes fotos sin permiso y protege a los niños y a los ancianos. Para los trabajos de electricidad, gas o techos, llama a un profesional.",
      },
    ],
    ideaClave:
      "El amor se ve en la mano que ayuda: compartir para las necesidades y practicar la hospitalidad (Romanos 12:13), y no negar el bien cuando se puede hacer (Proverbios 3:27). Una iglesia puede organizar comidas, transporte, reparaciones sencillas, compañía y hospitalidad, como Dorcas con sus túnicas, con respeto por la casa y la dignidad de cada persona y con cuidado por su seguridad.",
    paraLaVida: {
      texto: "No digo vuelve mañana si hoy puedo ayudar.",
      pregunta: "¿Qué ayuda práctica podrías dar esta semana a alguien que está enfermo o solo?",
    },
  },
  {
    id: "obra-social-2-5",
    objetivos: [
      "Explicar, con Proverbios 18:13, por qué se escucha antes de ayudar.",
      "Hacer una primera entrevista con respeto, sin ingenuidad y con confidencialidad.",
      "Orientar a una persona hacia los recursos de la comunidad.",
    ],
    paraEmpezar:
      "Antes de ayudar hay que escuchar. Una buena primera conversación muestra respeto, ayuda a entender la necesidad de verdad y evita errores: dar lo que no hace falta o caer en un engaño. Y muchas veces la mejor ayuda es saber a dónde orientar a la persona.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 18:13" },
      {
        t: "parrafo",
        texto:
          "«Al que responde palabra antes de oír, Le es fatuidad y oprobio». Escuchar primero no es perder el tiempo: es la base de una buena ayuda.",
      },
      { t: "versiculo", ref: "Proverbios 14:15" },
      {
        t: "parrafo",
        texto:
          "«El simple todo lo cree; Mas el avisado mira bien sus pasos». La compasión no es ingenua: pregunta, confirma y decide con cuidado.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:14" },
      {
        t: "parrafo",
        texto:
          "Pablo pide «que alentéis a los de poco ánimo, que sostengáis a los débiles, que seáis pacientes para con todos». Cada persona necesita algo distinto: aliento, sostén, paciencia y a veces una palabra firme.",
      },
      { t: "subtitulo", texto: "La primera entrevista" },
      {
        t: "lista",
        items: [
          "Recibir a la persona en un lugar tranquilo, con dos personas del equipo, y saludarla por su nombre.",
          "Escuchar su historia sin interrumpir y sin juzgar, y preguntarle qué necesita primero.",
          "Preguntar con respeto por su familia, su trabajo y las ayudas que ya recibe.",
          "Pedir, cuando haga falta, el papel de la deuda o del aviso, sin humillar.",
          "Guardar la confidencialidad: lo que cuenta queda en el equipo, salvo lo que la ley manda reportar, como la sospecha de abuso de un menor.",
          "Explicar con claridad lo que la iglesia puede hacer y lo que no, sin prometer lo que no se va a cumplir.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ingenuidad, la desconfianza y la prudencia" },
      {
        t: "lista",
        items: [
          "La ingenuidad lo cree todo y da sin preguntar. La desconfianza sospecha de todos y no ayuda a nadie. La prudencia escucha, confirma y ayuda con orden.",
          "La ingenuidad da efectivo al primero que llega. La prudencia paga la cuenta directamente.",
          "La desconfianza humilla con preguntas. La prudencia pregunta con respeto solo lo necesario.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la madre sin luz" },
      {
        t: "parrafo",
        texto:
          "Una madre llega a la iglesia llorando: le cortaron la luz y tiene un bebé. No sabe que hay ayudas en la ciudad.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recibirla con calma, ofrecerle algo de tomar y escucharla con dos hermanas del equipo.",
          "Paso 2, preguntarle qué pasó, quién vive con ella y qué ayudas tiene.",
          "Paso 3, ver con ella si el fondo de la iglesia puede pagar parte de la cuenta directamente a la compañía.",
          "Paso 4, orientarla a las ayudas de la comunidad para los servicios y la comida; en Texas, el 2-1-1 la conecta con esos programas.",
          "Paso 5, anotar el caso con su permiso y guardar la confidencialidad.",
          "Paso 6, llamarla al día siguiente para saber si ya tiene luz y orar por ella.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En Texas, toda persona que sospecha que un menor sufre abuso o abandono debe reportarlo de inmediato, y los profesionales, a más tardar en 24 horas, a la línea 1-800-252-5400 o al 911 si hay peligro. La confidencialidad del equipo nunca tapa un abuso.",
      },
      {
        t: "cuadro",
        titulo: "A dónde orientar según la necesidad",
        columnas: ["Necesidad", "Qué hace la iglesia", "A dónde orientar"],
        filas: [
          ["Comida", "La despensa y las comidas en una crisis", "El banco de alimentos y los programas de la ciudad"],
          ["Renta o servicios", "Una ayuda del fondo, pagada directamente", "Los programas de ayuda de la ciudad y del condado, por medio del 2-1-1"],
          ["Salud", "Transporte y compañía", "Las clínicas comunitarias"],
          ["Trabajo", "Una bolsa de trabajo con los negocios de los hermanos", "Las oficinas de empleo y las clases de oficios"],
          ["Crisis emocional", "Escuchar, orar y acompañar", "La línea 988, y el 911 si hay peligro"],
          ["Abuso de un menor", "Proteger y reportar como pide la ley", "La línea 1-800-252-5400, o el 911 si hay peligro"],
        ],
      },
    ],
    ideaClave:
      "Antes de ayudar se escucha, porque responder antes de oír es fatuidad (Proverbios 18:13), y la compasión no es ingenua: el avisado mira bien sus pasos (Proverbios 14:15). La primera entrevista recibe con respeto, escucha, pregunta lo necesario, guarda la confidencialidad y no promete de más. Muchas veces la mejor ayuda es orientar hacia los recursos de la comunidad, y la confidencialidad nunca tapa un abuso: en Texas se reporta de inmediato, y los profesionales a más tardar en 24 horas.",
    paraLaVida: {
      texto: "Escucho antes de responder y ayudo con prudencia.",
      pregunta: "¿Sabes a dónde orientar en tu ciudad a una familia que necesita comida, salud o trabajo?",
    },
  },
  {
    id: "obra-social-2-6",
    objetivos: [
      "Explicar, con Filipenses 2:3-4 y Mateo 6:3-4, cómo se sirve con humildad y sin buscar aplauso.",
      "Reconocer las señales del cansancio en el servicio y cómo prevenirlo.",
      "Hacer un plan para servir con alegría y por largo tiempo.",
    ],
    paraEmpezar:
      "El servicio de misericordia se ve muy bonito desde afuera, pero cansa: hay historias tristes, pedidos que no terminan y personas que no agradecen. Por eso el corazón del que sirve necesita humildad, motivos limpios y descanso, para no cansarse de hacer el bien.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Filipenses 2:3-4" },
      {
        t: "parrafo",
        texto:
          "«Nada hagáis por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demás como superiores a él mismo». El que sirve no se pone por encima del que recibe.",
      },
      { t: "versiculo", ref: "Mateo 6:3-4" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «cuando tú des limosna, no sepa tu izquierda lo que hace tu derecha». La ayuda no se publica para ganar fama, y se cuida la dignidad del que recibe.",
      },
      { t: "versiculo", ref: "Gálatas 6:9" },
      {
        t: "parrafo",
        texto:
          "«No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos». Dios ve el servicio fiel y da fuerzas para seguir.",
      },
      { t: "subtitulo", texto: "Cómo servir por largo tiempo" },
      {
        t: "lista",
        items: [
          "Servir con motivos limpios: por amor a Dios y al prójimo, no por aplauso (Mateo 6:3-4).",
          "Cuidar la dignidad del que recibe: no contar su historia ni publicar su foto sin permiso.",
          "Poner límites sanos: horarios, turnos y saber decir que no cuando algo no le toca a la iglesia.",
          "Reconocer las señales del cansancio: irritación, tristeza, dejar de orar o no querer ver a nadie.",
          "Descansar y pedir ayuda: Jesús también se apartaba a lugares desiertos para orar (Lucas 5:16).",
          "Servir con alegría, porque el que hace misericordia la hace con alegría (Romanos 12:8).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el siervo cansado y el siervo renovado" },
      {
        t: "lista",
        items: [
          "Cansado: cree que todo depende de él. Renovado: sabe que Dios es el que sostiene y el que da el fruto.",
          "Cansado: nunca dice que no. Renovado: sirve en lo que le toca y deja lo demás a otros.",
          "Cansado: deja de orar porque no tiene tiempo. Renovado: ora antes de servir, porque de ahí saca las fuerzas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la coordinadora agotada" },
      {
        t: "parrafo",
        texto:
          "La hermana que coordina la misericordia lleva tres años atendiendo pedidos casi todos los días. Últimamente llora sin razón y ya no quiere contestar el teléfono.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, que el pastor hable con ella con cariño, sin regaños, y la escuche.",
          "Paso 2, darle unas semanas de descanso mientras otros cubren su tarea.",
          "Paso 3, repartir la carga: un turno de teléfono por día y más hermanos en el equipo.",
          "Paso 4, ponerle límites claros: un horario para atender y un día libre por semana.",
          "Paso 5, animarla a cuidar su vida con Dios y a buscar a un consejero si la tristeza sigue.",
          "Paso 6, reconocer en público su servicio y dar gracias a Dios por ella.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuida a los que cuidan. Un equipo de misericordia sano tiene turnos, descanso, oración juntos y alguien que pregunte cómo están. Si alguien del equipo muestra una tristeza profunda o habla de quitarse la vida, se busca ayuda enseguida: la línea 988, o el 911 si hay peligro.",
      },
    ],
    ideaClave:
      "El que sirve lo hace con humildad, estimando a los demás como superiores a él mismo (Filipenses 2:3), y sin buscar aplauso, para que su limosna sea en secreto (Mateo 6:3-4). Para servir por largo tiempo hace falta cuidar la dignidad del que recibe, poner límites sanos, descansar, orar y pedir ayuda, sin cansarse de hacer el bien, porque a su tiempo segaremos (Gálatas 6:9).",
    paraLaVida: {
      texto: "Sirvo con humildad y cuido mis fuerzas para seguir sirviendo.",
      pregunta: "¿Qué límite sano necesitas poner para seguir sirviendo con alegría?",
    },
  },
];
