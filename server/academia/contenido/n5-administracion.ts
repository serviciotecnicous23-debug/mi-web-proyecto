/**
 * Nivel 5 · Materia 2 — Administración y gobierno de la iglesia (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La administración como don y mayordomía, las formas de gobierno de la iglesia, ancianos, diáconos y equipos, el
 * dinero con transparencia, planificar y comunicar, y lo legal básico en los Estados Unidos (con ejemplos de Texas),
 * siempre con la nota de consultar a un abogado o a un contador. Quién puede ejercer cada cargo, también el ministerio
 * de la mujer, no se decide aquí: es un punto de la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N5_ADMINISTRACION: LeccionContenido[] = [
  {
    id: "n5-administracion-1",
    objetivos: [
      "Explicar la administración como un don y una mayordomía al servicio de la misión.",
      "Distinguir entre una administración que sirve y una que solo controla.",
      "Valorar el orden en la iglesia a la luz de 1 Corintios 14.",
    ],
    paraEmpezar:
      "Una iglesia puede tener buena predicación y aun así perder a la gente por el desorden: horarios que cambian, dinero sin cuentas claras y tareas que nadie sabe quién hace.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 14:33" },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "Pablo recuerda que «Dios no es Dios de confusión, sino de paz», y concluye: «pero hágase todo decentemente y con orden». El orden no apaga al Espíritu: sirve para que todos sean edificados. Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "1 Corintios 12:28" },
      {
        t: "parrafo",
        texto:
          "Entre los dones que Dios puso en la iglesia, Pablo nombra a «los que administran». Organizar, planificar y llevar cuentas claras también es un servicio que Dios da a su pueblo.",
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "parrafo",
        texto:
          "Pedro llama a todos a servir «como buenos administradores de la multiforme gracia de Dios». Administrar es cuidar lo que es de Dios: personas, tiempo, dinero y bienes.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Una administración que sirve" },
      {
        t: "lista",
        items: [
          "Sirve a la misión: hacer discípulos, cuidar a la iglesia y servir al prójimo.",
          "Sirve a las personas: hace fácil participar, servir y crecer.",
          "Es transparente: todos saben cómo se decide y cómo se usa el dinero.",
          "No controla por controlar: las reglas existen para servir, no para ponerle trabas a la obra.",
        ],
      },
      {
        t: "nota",
        titulo: "Sobre los cargos",
        texto:
          "Quién puede ejercer cada cargo de la iglesia no se decide en esta materia: es un punto de la declaración de fe del ministerio por confirmar.",
      },
    ],
    ideaClave:
      "Dios no es Dios de confusión, sino de paz, y en su iglesia todo debe hacerse decentemente y con orden. Administrar es un don y una mayordomía: cuidar como buenos administradores las personas, el tiempo, el dinero y los bienes que son de Dios. Una buena administración sirve a la misión y a las personas, es transparente y no controla por controlar.",
    paraLaVida: {
      texto: "El orden bien entendido es una forma de amar a la iglesia.",
      pregunta: "¿Qué desorden en tu ministerio está estorbando el servicio, y qué paso darás para ordenarlo?",
    },
  },
  {
    id: "n5-administracion-2",
    objetivos: [
      "Describir las tres formas históricas de gobierno de la iglesia: episcopal, presbiteriana y congregacional.",
      "Explicar los ejemplos de gobierno que muestra el Nuevo Testamento.",
      "Reconocer el lugar de los estatutos y de la declaración de fe en el gobierno de cada iglesia.",
    ],
    paraEmpezar:
      "¿Quién decide en una iglesia: un obispo, un consejo de ancianos o la congregación? Las iglesias han respondido de maneras distintas a lo largo de la historia.",
    bloques: [
      { t: "versiculo", ref: "Hechos 14:23" },
      {
        t: "parrafo",
        texto:
          "Pablo y Bernabé, en las iglesias que nacieron en su viaje, «constituyeron ancianos en cada iglesia», y Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad (Tito 1:5). Desde el principio, las iglesias tuvieron líderes reconocidos.",
      },
      { t: "versiculo", ref: "Hechos 15:22" },
      {
        t: "parrafo",
        texto:
          "Cuando surgió una pregunta que afectaba a todas las iglesias, «pareció bien a los apóstoles y a los ancianos, con toda la iglesia» enviar una carta con la decisión. Hubo líderes que guiaron y una iglesia que participó.",
      },
      { t: "subtitulo", texto: "Tres formas de gobierno" },
      {
        t: "lista",
        items: [
          "Episcopal: obispos que supervisan a varias iglesias y a sus pastores. La siguen, entre otras, las iglesias católica, ortodoxa, anglicana y metodista.",
          "Presbiteriana: ancianos que gobiernan juntos en cada iglesia y en concilios regionales. La siguen las iglesias presbiterianas y reformadas.",
          "Congregacional: la congregación toma las decisiones principales, y cada iglesia es autónoma. La siguen las iglesias bautistas y muchas iglesias independientes.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Muchas iglesias, también pentecostales, combinan rasgos de estas formas: un pastor que guía, un consejo que lo acompaña y una asamblea que aprueba ciertas decisiones. Cada iglesia se gobierna según sus estatutos y su declaración de fe.",
      },
      {
        t: "nota",
        titulo: "Lo que todas necesitan",
        texto:
          "Cualquiera que sea la forma de gobierno, la iglesia necesita líderes de buen carácter, decisiones claras, rendición de cuentas y la guía de la Palabra y del Espíritu Santo.",
      },
    ],
    ideaClave:
      "Desde el principio, las iglesias tuvieron ancianos reconocidos, y en Hechos 15 los apóstoles y los ancianos decidieron con toda la iglesia. A lo largo de la historia hubo tres formas de gobierno: la episcopal, con obispos; la presbiteriana, con ancianos y concilios; y la congregacional, con la congregación. Muchas iglesias combinan rasgos de las tres, y cada una se gobierna según sus estatutos y su declaración de fe.",
    paraLaVida: {
      texto: "Conocer cómo se gobierna tu iglesia te ayuda a servir con orden y con unidad.",
      pregunta: "¿Cómo se toman las decisiones en tu iglesia, y qué dicen sus estatutos?",
    },
  },
  {
    id: "n5-administracion-3",
    objetivos: [
      "Describir las funciones de los ancianos o pastores y de los diáconos.",
      "Explicar los requisitos de carácter para los que sirven.",
      "Organizar equipos de servicio con funciones claras.",
    ],
    paraEmpezar: "Una iglesia sana no depende de una sola persona: tiene líderes que guían, diáconos que sirven y equipos que trabajan juntos.",
    bloques: [
      { t: "versiculo", ref: "Filipenses 1:1" },
      {
        t: "parrafo",
        texto:
          "Pablo saludó «a todos los santos en Cristo Jesús que están en Filipos, con los obispos y diáconos». Desde muy temprano hubo dos clases de servicio reconocido: los que guían y los que sirven en lo práctico.",
      },
      { t: "subtitulo", texto: "Los que guían" },
      {
        t: "parrafo",
        texto:
          "Los ancianos o pastores enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño (Hechos 20:28; 1 Pedro 5:2). Su primer requisito es el carácter: ser irreprensibles, sobrios, prudentes y aptos para enseñar (1 Timoteo 3:2).",
      },
      { t: "subtitulo", texto: "Los que sirven" },
      { t: "versiculo", ref: "1 Timoteo 3:8-10" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que los diáconos «deben ser honestos, sin doblez», y que sean sometidos a prueba primero. En Hechos 6, los siete se encargaron de atender a las viudas para que los apóstoles siguieran en la oración y la palabra.",
      },
      { t: "subtitulo", texto: "Equipos de servicio" },
      {
        t: "lista",
        items: [
          "Cada equipo tiene un propósito escrito: alabanza, niños, bienvenida, visitación, medios, limpieza.",
          "Cada equipo tiene un responsable y sabe a quién rinde cuentas.",
          "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad.",
          "En los equipos con menores se siguen siempre las normas de protección.",
          "Se agradece y se reconoce a los voluntarios.",
        ],
      },
      { t: "versiculo", ref: "Hechos 6:3" },
      {
        t: "parrafo",
        texto: "El criterio de Hechos 6 sigue vigente: personas «de buen testimonio, llenos del Espíritu Santo y de sabiduría».",
      },
      {
        t: "nota",
        titulo: "Sobre los cargos",
        texto:
          "Quién puede ser anciano, pastor o diácono es un punto de la declaración de fe del ministerio por confirmar. Aquí se estudian sus funciones y el carácter que pide la Palabra.",
      },
    ],
    ideaClave:
      "Desde el principio hubo obispos o ancianos que guían y diáconos que sirven en lo práctico. Los ancianos enseñan, cuidan, deciden y protegen al rebaño, y los diáconos atienden necesidades como en Hechos 6; para todos, lo primero es el carácter. Los equipos de servicio funcionan bien con un propósito escrito, un responsable, personas preparadas, normas de protección y gratitud.",
    paraLaVida: {
      texto: "Cada servicio en la iglesia, visible o escondido, es para el Señor.",
      pregunta: "¿Qué equipo de tu iglesia necesita un propósito más claro o un responsable, y cómo ayudarías?",
    },
  },
  {
    id: "n5-administracion-4",
    objetivos: [
      "Explicar los principios bíblicos para manejar el dinero de la iglesia.",
      "Aplicar controles básicos: presupuesto, dos personas que cuentan, registros e informes.",
      "Valorar la transparencia como protección para la iglesia y para sus líderes.",
    ],
    paraEmpezar:
      "Nada destruye tan rápido la confianza en una iglesia como el dinero mal manejado. Y nada la protege tanto como las cuentas claras.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 16:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo organizó la ofrenda para Jerusalén con orden: «Cada primer día de la semana cada uno de vosotros ponga aparte algo, según haya prosperado». Dar es adoración, y administrar lo que se da es responsabilidad.",
      },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto:
          "Pablo cuidaba la ofrenda «evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos», y enviaba a hermanos de confianza con ella (2 Corintios 8:16-23).",
      },
      { t: "subtitulo", texto: "Controles básicos" },
      {
        t: "lista",
        items: [
          "Un presupuesto anual aprobado según los estatutos.",
          "Las ofrendas las cuentan al menos dos personas que no son parientes, y las dos firman el registro.",
          "El dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal.",
          "Los gastos se aprueban por escrito y se guardan los recibos.",
          "Se presenta un informe financiero periódico a la iglesia o a su consejo.",
          "Una vez al año, personas que no manejan el dinero revisan las cuentas.",
        ],
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús preguntó: «Porque ¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?». Antes de un proyecto, la iglesia calcula los costos y ora.",
      },
      {
        t: "nota",
        titulo: "La transparencia protege",
        texto:
          "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha.",
      },
    ],
    ideaClave:
      "Dar es adoración, y administrar lo que se da es responsabilidad: Pablo organizó la ofrenda con orden y la cuidó para que nadie pudiera censurarlo. La iglesia necesita un presupuesto aprobado, dos personas que cuentan y firman, depósitos en la cuenta de la iglesia, gastos aprobados con recibos, informes periódicos y una revisión anual. Antes de un proyecto, se calculan los gastos y se ora.",
    paraLaVida: {
      texto: "Las cuentas claras son un testimonio para la iglesia y para el mundo.",
      pregunta: "¿Qué control básico falta en el manejo del dinero de tu ministerio?",
    },
  },
  {
    id: "n5-administracion-5",
    objetivos: [
      "Aplicar un ciclo de planificación: orar, evaluar, fijar metas, organizar y revisar.",
      "Organizar el calendario, los voluntarios y las reuniones de la iglesia.",
      "Comunicar con claridad lo que la iglesia decide y hace.",
    ],
    paraEmpezar:
      "Nehemías no empezó a reconstruir el muro con un discurso, sino con oración, preguntas y un plan. Planificar también es espiritual.",
    bloques: [
      { t: "versiculo", ref: "Nehemías 2:4-5" },
      {
        t: "parrafo",
        texto:
          "Cuando el rey le preguntó qué pedía, Nehemías dice: «Entonces oré al Dios de los cielos». Después presentó un pedido claro, con tiempos y recursos (Nehemías 2:6-8).",
      },
      { t: "subtitulo", texto: "El ciclo de planificación" },
      {
        t: "lista",
        items: [
          "Orar y escuchar a Dios juntos.",
          "Evaluar cómo estamos: qué funciona y qué no.",
          "Fijar pocas metas claras para el año, con fechas.",
          "Organizar: responsables, recursos y calendario.",
          "Revisar cada cierto tiempo y ajustar.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman». Los planes se hacen con el consejo del equipo, no a solas.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Calendario, voluntarios y reuniones" },
      {
        t: "lista",
        items: [
          "Un calendario anual de la iglesia, conocido por todos y con tiempo para preparar cada actividad.",
          "Voluntarios invitados personalmente, preparados para su tarea y agradecidos.",
          "Reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo.",
        ],
      },
      { t: "subtitulo", texto: "Comunicar bien" },
      {
        t: "parrafo",
        texto:
          "Lo que no se comunica, no existe para la iglesia. Los anuncios deben ser claros y a tiempo, por los medios que la gente usa, y las decisiones importantes se explican con sus razones.",
      },
      { t: "versiculo", ref: "Proverbios 16:9" },
      {
        t: "parrafo",
        texto: "Y todo plan se hace con humildad: «El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».",
      },
    ],
    ideaClave:
      "Planificar también es espiritual: Nehemías oró antes de presentar un plan claro. El ciclo es orar, evaluar, fijar pocas metas con fechas, organizar responsables y recursos, y revisar. Los planes se hacen con consejo; el calendario, los voluntarios y las reuniones con actas se organizan con tiempo; lo que se decide se comunica con claridad; y todo se encomienda a Dios, que endereza nuestros pasos.",
    paraLaVida: {
      texto: "Un buen plan, hecho en oración, libera tiempo para lo más importante: las personas.",
      pregunta: "¿Qué actividad de tu ministerio necesita un plan escrito con responsables y fechas?",
    },
  },
  {
    id: "n5-administracion-6",
    objetivos: [
      "Explicar la responsabilidad de la iglesia ante las leyes del país.",
      "Describir los pasos legales básicos de una iglesia en los Estados Unidos, con ejemplos de Texas.",
      "Reconocer cuándo hace falta el consejo de un abogado o de un contador.",
    ],
    paraEmpezar:
      "La iglesia es del Señor, pero vive en un país con leyes. Obedecerlas también es parte de su testimonio.",
    bloques: [
      { t: "versiculo", ref: "Mateo 22:21" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios». La iglesia obedece las leyes del país mientras no la obliguen a desobedecer a Dios (Hechos 5:29).",
      },
      { t: "versiculo", ref: "Tito 3:1" },
      {
        t: "parrafo",
        texto: "Pablo pide: «Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra».",
      },
      { t: "subtitulo", texto: "Lo legal básico en los Estados Unidos" },
      {
        t: "lista",
        items: [
          "Muchas iglesias se constituyen como corporación sin fines de lucro. En Texas, eso se hace presentando un certificado de formación ante la Secretaría de Estado.",
          "Los estatutos dicen cómo se gobierna la iglesia, y las actas guardan lo que se decide en sus reuniones.",
          "El número de identificación del empleador (EIN), que da el IRS, se usa para las cuentas bancarias y para los empleados.",
          "Las iglesias que cumplen los requisitos de la sección 501(c)(3) se consideran exentas de impuestos sin tener que pedirlo, aunque muchas piden la carta que lo reconoce. Sus fondos no pueden beneficiar a personas en particular.",
          "Para que un donante pueda deducir una donación de 250 dólares o más, necesita un reconocimiento escrito de la iglesia.",
          "Si la iglesia tiene empleados, debe cumplir con los impuestos sobre la nómina; la situación de los ministros tiene reglas especiales.",
          "En Texas, toda persona debe reportar la sospecha de abuso de un menor, también los ministros.",
          "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades.",
        ],
      },
      {
        t: "nota",
        titulo: "Consulte a un profesional",
        texto:
          "Esta lección es una guía general, no un consejo legal ni contable. Las leyes cambian y cada caso es distinto: para los trámites y las dudas, consulte a un abogado o a un contador con experiencia en iglesias. El IRS tiene una guía tributaria para iglesias y organizaciones religiosas, la Publicación 1828.",
      },
    ],
    ideaClave:
      "La iglesia da a César lo que es de César y a Dios lo que es de Dios: obedece las leyes del país mientras no la obliguen a desobedecer a Dios. En los Estados Unidos, muchas iglesias se constituyen como corporación sin fines de lucro, tienen estatutos y actas, un EIN y la exención de la sección 501(c)(3), dan recibos por las donaciones, cumplen con la nómina, reportan el abuso de menores y tienen seguros. Para los casos concretos se consulta a un abogado o a un contador.",
    paraLaVida: {
      texto: "Cumplir la ley con cuidado también es un testimonio.",
      pregunta: "¿Qué paso legal o administrativo necesita revisar tu iglesia con la ayuda de un profesional?",
    },
  },
];
