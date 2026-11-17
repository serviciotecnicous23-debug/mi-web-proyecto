/**
 * Especialidad Ministerio pastoral · Materia 2 (avanzada) — Consejería pastoral (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La consejería desde el oficio del pastor: qué es y sus enfoques evangélicos, el método de Jesús con la samaritana
 * (ejemplo resuelto), la culpa y el perdón, la ansiedad y la tristeza profunda, la reconciliación, y la confidencialidad,
 * la derivación y los límites. No repite Cuidado y consejería básica (Nivel 3) ni la especialidad Familia y consejería.
 * No reemplaza la atención de un profesional de la salud.
 */
import type { LeccionContenido } from "../tipos";

export const PASTORAL_2: LeccionContenido[] = [
  {
    id: "pastoral-2-1",
    objetivos: [
      "Definir la consejería pastoral y su meta.",
      "Distinguirla de la atención de un profesional de la salud.",
      "Comparar con respeto los enfoques evangélicos de la consejería.",
    ],
    paraEmpezar:
      "Tarde o temprano, alguien toca la puerta del pastor con el corazón roto. La consejería pastoral es una de las formas más antiguas del cuidado del rebaño.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 1:28" },
      {
        t: "parrafo",
        texto:
          "La meta de Pablo era clara: «amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría, a fin de presentar perfecto en Cristo Jesús a todo hombre». La consejería pastoral es la Palabra aplicada a una persona en su situación, para que madure en Cristo.",
      },
      { t: "versiculo", ref: "Isaías 50:4" },
      {
        t: "parrafo",
        texto:
          "Isaías describe al siervo de Dios con una lengua «para saber hablar palabras al cansado», y con un oído atento «para que oiga como los sabios». Antes de hablar, el consejero escucha.",
      },
      { t: "versiculo", ref: "Romanos 15:14" },
      {
        t: "parrafo",
        texto:
          "No es solo tarea del pastor: Pablo confiaba en que los creyentes estaban «llenos de bondad, llenos de todo conocimiento, de tal manera que podéis amonestaros los unos a los otros». El pastor aconseja y también forma a otros para hacerlo.",
      },
      { t: "subtitulo", texto: "Pastoral, no clínica" },
      {
        t: "parrafo",
        texto:
          "El pastor no es psicólogo ni médico, y no necesita serlo para aconsejar con la Palabra. Pero sí necesita saber cuándo una persona necesita, además, la ayuda de un profesional de la salud: una depresión grave, una adicción, un trauma o un riesgo para su vida.",
      },
      { t: "versiculo", ref: "Proverbios 11:14" },
      {
        t: "parrafo",
        texto:
          "«en la multitud de consejeros hay seguridad»: trabajar junto con médicos, psicólogos cristianos y otros pastores es sabiduría, no falta de fe.",
      },
      { t: "subtitulo", texto: "Tres enfoques evangélicos" },
      {
        t: "lista",
        items: [
          "La consejería noutética de Jay Adams: aconseja solo con la Escritura y desconfía de la psicología. Su nombre viene de la palabra griega que se traduce amonestar.",
          "La integración, como la de Gary Collins: usa con discernimiento lo que la psicología ha aprendido, con la Escritura como autoridad.",
          "El modelo de Larry Crabb: una consejería bíblica que se vive en la iglesia local y llega a las necesidades profundas del corazón.",
        ],
      },
      {
        t: "nota",
        titulo: "Con respeto",
        texto:
          "Los tres enfoques reconocen la autoridad de la Escritura, y difieren en cuánto usar de la psicología. El pastor puede aprender de todos, siempre con la Palabra como regla.",
      },
    ],
    ideaClave:
      "La consejería pastoral es la Palabra aplicada a una persona en su situación, para que madure en Cristo, y empieza por escuchar. No es solo tarea del pastor: los creyentes pueden aconsejarse unos a otros. El pastor no reemplaza al profesional de la salud, y trabaja con otros cuando hace falta. Los enfoques evangélicos, el noutético, el de la integración y el de Crabb, difieren en el uso de la psicología, pero todos ponen la Escritura como autoridad.",
    paraLaVida: {
      texto: "Aconsejar es acompañar a otro hacia la madurez en Cristo.",
      pregunta: "¿Qué casos de tu iglesia necesitan, además de tu consejo, la ayuda de un profesional?",
    },
  },
  {
    id: "pastoral-2-2",
    objetivos: [
      "Describir cómo acompañó Jesús a la mujer samaritana.",
      "Identificar los pasos de una conversación pastoral.",
      "Aplicar esos pasos a un caso real.",
    ],
    paraEmpezar:
      "Jesús nunca dio una clase de consejería, pero su conversación con la mujer samaritana es un ejemplo completo de cómo acompañar a una persona herida.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 4:7-10" },
      {
        t: "parrafo",
        texto:
          "Jesús empezó con algo sencillo: «Dame de beber». Rompió las barreras de su tiempo, porque «judíos y samaritanos no se tratan entre sí», y pasó de lo cotidiano a lo profundo: «Si conocieras el don de Dios».",
      },
      { t: "versiculo", ref: "Juan 4:16-18" },
      {
        t: "parrafo",
        texto:
          "Cuando llegó el momento, Jesús tocó la herida con verdad y sin desprecio: «cinco maridos has tenido, y el que ahora tienes no es tu marido». Y reconoció lo que ella había dicho bien: «esto has dicho con verdad».",
      },
      { t: "versiculo", ref: "Juan 4:28-29" },
      {
        t: "parrafo",
        texto:
          "El encuentro terminó en una vida cambiada: la mujer «dejó su cántaro», fue a la ciudad y dijo: «Venid, ved a un hombre que me ha dicho todo cuanto he hecho».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: los pasos de la conversación" },
      {
        t: "lista",
        items: [
          "Acercarse: Jesús inició la conversación y cruzó las barreras.",
          "Conectar: partió de la necesidad del momento, el agua.",
          "Llevar a lo profundo: pasó del agua del pozo al agua viva.",
          "Decir la verdad con amor: nombró el pecado sin humillar.",
          "Señalar a Dios: le habló del Padre y de la verdadera adoración (Juan 4:23-24).",
          "Dejar que la persona actúe: ella misma fue a contarlo a su ciudad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En una consulta, sigue el mismo camino: escucha antes de hablar, entiende la necesidad real, ilumina con la Palabra, nombra con amor lo que haya que nombrar, ora con la persona y acuerden un paso concreto. Después, acompaña.",
      },
    ],
    ideaClave:
      "Jesús acompañó a la mujer samaritana en una conversación que es un modelo: se acercó cruzando barreras, partió de una necesidad cotidiana, la llevó a lo profundo, le dijo la verdad sin humillarla, le señaló a Dios y la dejó actuar. El consejero pastoral sigue ese camino: escucha, entiende, ilumina con la Palabra, ora, acuerda un paso y acompaña.",
    paraLaVida: {
      texto: "Antes de dar respuestas, Jesús dio su tiempo.",
      pregunta: "¿Qué paso del camino de Jesús con la samaritana te cuesta más en tus conversaciones?",
    },
  },
  {
    id: "pastoral-2-3",
    objetivos: [
      "Distinguir la culpa verdadera de la falsa culpa.",
      "Explicar la diferencia entre la tristeza según Dios y la tristeza del mundo.",
      "Aplicar la promesa del perdón en la consejería.",
    ],
    paraEmpezar:
      "Muchas personas que llegan a consejería cargan culpa: unas por pecados que no han confesado, y otras por pecados que Dios ya perdonó.",
    bloques: [
      { t: "versiculo", ref: "Salmos 32:3-5" },
      {
        t: "parrafo",
        texto:
          "David describe lo que hace la culpa escondida: «Mientras callé, se envejecieron mis huesos». Y lo que hace la confesión: «Mi pecado te declaré, y no encubrí mi iniquidad», «Y tú perdonaste la maldad de mi pecado».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "1 Juan 1:9" },
      {
        t: "parrafo",
        texto:
          "La promesa es firme: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad». El perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios.",
      },
      { t: "versiculo", ref: "2 Corintios 7:10" },
      {
        t: "parrafo",
        texto:
          "Pablo distingue dos tristezas: «la tristeza que es según Dios produce arrepentimiento para salvación», «pero la tristeza del mundo produce muerte». La primera lleva a Dios y a cambiar; la segunda hunde a la persona en sí misma.",
      },
      { t: "subtitulo", texto: "Dos culpas distintas" },
      {
        t: "lista",
        items: [
          "La culpa verdadera: hay un pecado real. Se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón.",
          "La falsa culpa: la persona se culpa por lo que no fue pecado, o por un pecado que Dios ya perdonó. Se enfrenta con la verdad de la Palabra.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Ante alguien que confiesa, no te escandalices ni lo humilles: guarda la confidencia, ora con él y anúnciale con claridad la promesa del perdón. Si hay un delito o una persona en peligro, la confidencia tiene límites, como verás en la última lección.",
      },
    ],
    ideaClave:
      "La culpa escondida pesa hasta en el cuerpo, y la confesión trae el perdón de Dios, que es fiel y justo para perdonar. La tristeza según Dios lleva al arrepentimiento y a la vida; la del mundo, a la muerte. El consejero distingue la culpa verdadera, que se confiesa y se repara, de la falsa culpa, que se enfrenta con la verdad del perdón.",
    paraLaVida: {
      texto: "La culpa se resuelve en la cruz, no en el castigo propio.",
      pregunta: "¿Cómo ayudarías a alguien que dice que Dios no puede perdonarlo?",
    },
  },
  {
    id: "pastoral-2-4",
    objetivos: [
      "Explicar lo que la Biblia enseña sobre la ansiedad y el abatimiento.",
      "Reconocer cuándo la tristeza necesita atención médica.",
      "Acompañar con la Palabra, la oración y la ayuda adecuada.",
    ],
    paraEmpezar:
      "La ansiedad y la depresión llegan también a los creyentes. Los salmos muestran que los fieles conocieron el abatimiento, y que Dios no los rechazó.",
    bloques: [
      { t: "versiculo", ref: "Salmos 42:5" },
      {
        t: "parrafo",
        texto:
          "El salmista se habla a sí mismo en medio de la angustia: «¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? Espera en Dios». La Biblia no esconde la tristeza de los fieles: les enseña a llevarla delante de Dios.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ayvlscZUZ0c", titulo: "Shalom - Paz", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Filipenses 4:6-7" },
      { t: "versiculo", ref: "1 Pedro 5:7" },
      {
        t: "parrafo",
        texto:
          "Frente al afán, la Palabra invita a orar: «sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias», y promete «la paz de Dios, que sobrepasa todo entendimiento». Podemos ir «echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros».",
      },
      { t: "versiculo", ref: "Mateo 11:28" },
      {
        t: "parrafo",
        texto: "Jesús invita a los cansados: «Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar».",
      },
      { t: "subtitulo", texto: "Cuándo hace falta ayuda médica" },
      {
        t: "lista",
        items: [
          "La tristeza dura más de dos semanas y afecta el sueño, el apetito o el trabajo.",
          "La persona ya no disfruta de nada, o siente que su vida no tiene sentido.",
          "Hay ataques de pánico, o la ansiedad no la deja funcionar.",
          "Aparecen pensamientos de muerte o de hacerse daño.",
        ],
      },
      {
        t: "nota",
        titulo: "Fe y medicina",
        texto:
          "Tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos. La depresión no siempre es fruto de un pecado. Si alguien piensa en quitarse la vida, no lo dejes solo y busquen ayuda de inmediato: en Estados Unidos, el 988 atiende por teléfono o por mensaje, también en español.",
      },
    ],
    ideaClave:
      "Los fieles de la Biblia también conocieron el abatimiento, y Dios les enseñó a esperar en él y a llevarle su ansiedad en oración. El consejero acompaña con la Palabra y la oración, y reconoce cuándo hace falta ayuda médica: una tristeza que dura y paraliza, el pánico o los pensamientos de muerte. Ir al médico no es falta de fe, y ante el riesgo de suicidio se busca ayuda de inmediato.",
    paraLaVida: {
      texto: "Dios no rechaza al abatido: lo invita a descansar.",
      pregunta: "¿Cómo acompañarías a un hermano con depresión sin decirle que su problema es falta de fe?",
    },
  },
  {
    id: "pastoral-2-5",
    objetivos: [
      "Explicar por qué la reconciliación es prioridad en la vida cristiana.",
      "Describir los pasos para ayudar a dos personas a reconciliarse.",
      "Distinguir el perdón de la reconciliación.",
    ],
    paraEmpezar:
      "Muchas consultas pastorales nacen de un conflicto: entre esposos, entre hermanos de la iglesia o en una familia. Dios pone la reconciliación antes que la ofrenda.",
    bloques: [
      { t: "versiculo", ref: "Mateo 5:23-24" },
      {
        t: "parrafo",
        texto:
          "Jesús puso la paz con el hermano antes que el culto: «deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano».",
      },
      { t: "versiculo", ref: "Romanos 12:18" },
      {
        t: "parrafo",
        texto:
          "Pablo es realista: «Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres». No siempre depende de uno, pero lo que depende de uno se hace.",
      },
      { t: "versiculo", ref: "Efesios 4:31-32" },
      {
        t: "parrafo",
        texto:
          "El camino pasa por dejar «toda amargura, enojo, ira, gritería y maledicencia», y ser «misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo».",
      },
      { t: "subtitulo", texto: "Cómo ayudar a reconciliar" },
      {
        t: "lista",
        items: [
          "Escuchar a cada parte por separado, sin tomar partido antes de tiempo.",
          "Ayudar a cada uno a ver primero su propia parte de la culpa.",
          "Guiar a pedir perdón con claridad y sin excusas, y a perdonar.",
          "Acordar pasos concretos para reparar el daño y cambiar.",
          "Acompañar después: la confianza se reconstruye con el tiempo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Ken Sande, en su libro Pacificadores, resume el camino en cuatro pasos: glorificar a Dios en el conflicto, sacar primero la viga del propio ojo (Mateo 7:5), restaurar con mansedumbre y reconciliarse.",
      },
      {
        t: "nota",
        titulo: "Perdonar no es lo mismo que reconciliarse",
        texto:
          "El perdón depende de uno y se da porque Dios nos perdonó. La reconciliación necesita a los dos y un cambio real. Una víctima de abuso puede perdonar sin volver a ponerse en peligro: el pastor nunca le pide que regrese a una situación de violencia.",
      },
    ],
    ideaClave:
      "Jesús puso la reconciliación antes que la ofrenda, y Pablo pide estar en paz con todos en lo que dependa de nosotros, dejando la amargura y perdonando como Dios nos perdonó. El consejero escucha a cada parte, ayuda a cada uno a ver su propia culpa, guía a pedir perdón y a perdonar, acuerda pasos y acompaña. Perdonar no es lo mismo que reconciliarse, y nunca se le pide a una víctima volver a la violencia.",
    paraLaVida: {
      texto: "La paz que depende de ti, búscala hoy.",
      pregunta: "¿Con quién necesitas tú dar el primer paso hacia la reconciliación?",
    },
  },
  {
    id: "pastoral-2-6",
    objetivos: [
      "Explicar el valor de la confidencialidad y sus límites.",
      "Reconocer cuándo derivar a un profesional.",
      "Aplicar medidas que protegen al aconsejado y al consejero.",
    ],
    paraEmpezar:
      "La confianza es el corazón de la consejería. Pero el amor también sabe cuándo una confidencia no puede guardarse, y cuándo otro puede ayudar mejor.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "La Palabra condena el chisme: «El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». El pastor no comparte lo que oye en consejería, ni siquiera como motivo de oración, sin permiso.",
      },
      { t: "versiculo", ref: "Proverbios 24:11" },
      {
        t: "parrafo",
        texto:
          "Pero hay situaciones en que callar sería dejar a alguien en peligro: «Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte». La confidencialidad tiene límites cuando hay riesgo de suicidio, peligro para otra persona o abuso de un menor o de un anciano. En Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo.",
      },
      { t: "subtitulo", texto: "Cuándo derivar" },
      {
        t: "lista",
        items: [
          "Cuando hay riesgo para la vida de la persona o de otros.",
          "Cuando hay una enfermedad mental, una adicción o un trauma que piden tratamiento.",
          "Cuando hay violencia en el hogar o asuntos legales.",
          "Cuando el caso supera tu preparación o tu tiempo.",
          "Cuando hay un conflicto de intereses o una relación muy cercana con la persona.",
        ],
      },
      { t: "subtitulo", texto: "Medidas de protección" },
      {
        t: "lista",
        items: [
          "Aconsejar en un lugar con visibilidad, como una oficina con ventana o con otra persona cerca.",
          "Con una persona del otro sexo, buscar horarios y lugares prudentes, o que haya otra persona presente.",
          "Explicar al comienzo qué se guarda en confidencia y qué no.",
          "Anotar lo esencial con discreción y guardarlo en un lugar seguro.",
          "Pedir supervisión o consejo a otro pastor cuando haga falta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto: "Derivar no es abandonar: el pastor sigue acompañando en oración y en la vida de la iglesia mientras el profesional atiende lo que le toca.",
      },
    ],
    ideaClave:
      "El pastor guarda las confidencias, porque el chisme destruye la confianza. Pero la confidencialidad tiene límites cuando hay riesgo de muerte, peligro para otros o abuso de un menor o de un anciano, que en Texas se debe denunciar. El consejero deriva cuando el caso lo supera, explica desde el principio qué guarda y qué no, aconseja con prudencia y a la vista, y sigue acompañando.",
    paraLaVida: {
      texto: "Guardar un secreto es fidelidad; callar un peligro no lo es.",
      pregunta: "¿Qué le dirías a alguien, al empezar una consulta, sobre lo que guardarás en confidencia y lo que no?",
    },
  },
];
