/**
 * Nivel 5 · Materia 8 — Seminario de liderazgo ministerial (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Un método para estudiar casos con la Biblia, cuatro casos y el plan de ministerio propio. Los casos son ejemplos
 * compuestos a partir de situaciones comunes del ministerio: los nombres y los detalles no son de personas reales.
 * Las normas que se aplican vienen de las materias de ética, liderazgo, administración y teología pastoral.
 */
import type { LeccionContenido } from "../tipos";

export const N5_SEMINARIO: LeccionContenido[] = [
  {
    id: "n5-seminario-1",
    objetivos: [
      "Aplicar un método para estudiar un caso del ministerio a la luz de la Biblia.",
      "Distinguir los hechos de las suposiciones y el síntoma del problema de fondo.",
      "Valorar la oración, el consejo y la escucha antes de decidir.",
    ],
    paraEmpezar:
      "En el ministerio llegan situaciones que ningún libro describe tal cual. Por eso un líder necesita, además de conocimientos, un camino para pensar con la Biblia antes de decidir.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 18:13" },
      {
        t: "parrafo",
        texto:
          "«Al que responde palabra antes de oír, Le es fatuidad y oprobio». Muchos errores de liderazgo nacen de decidir antes de escuchar.",
      },
      { t: "versiculo", ref: "Proverbios 18:17" },
      {
        t: "parrafo",
        texto:
          "«Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre». Antes de juzgar, se escucha a todas las partes.",
      },
      { t: "subtitulo", texto: "El método" },
      {
        t: "lista",
        items: [
          "Los hechos: qué pasó, quiénes están involucrados y qué se sabe con certeza, sin suposiciones.",
          "El problema de fondo: lo que se ve suele ser un síntoma; hay que preguntar qué hay debajo.",
          "Los principios bíblicos: qué enseña la Escritura sobre esta situación.",
          "Las opciones: dos o tres caminos posibles, con sus consecuencias.",
          "La decisión: qué se hará, quién lo hará y cómo se comunicará.",
          "La evaluación: volver después y preguntar qué resultó y qué se aprendió.",
        ],
      },
      { t: "versiculo", ref: "Santiago 1:5" },
      {
        t: "parrafo",
        texto:
          "En cada paso se ora: «Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada». Y se busca el consejo de hermanos maduros (Proverbios 15:22).",
      },
      {
        t: "nota",
        titulo: "Sobre los casos de esta materia",
        texto:
          "Los casos que siguen son ejemplos compuestos a partir de situaciones comunes del ministerio. Los nombres y los detalles no corresponden a personas reales.",
      },
    ],
    ideaClave:
      "Para estudiar un caso del ministerio se siguen seis pasos: los hechos sin suposiciones, el problema de fondo, los principios bíblicos, las opciones con sus consecuencias, la decisión con su forma de comunicarla y la evaluación posterior. Antes de responder hay que oír, y escuchar a todas las partes, y en cada paso se pide sabiduría a Dios y consejo a hermanos maduros.",
    paraLaVida: {
      texto: "Pensar con la Biblia antes de decidir evita muchas heridas.",
      pregunta: "¿Qué decisión reciente habrías tomado distinto si hubieras seguido estos pasos?",
    },
  },
  {
    id: "n5-seminario-2",
    objetivos: [
      "Analizar un caso de desacuerdo en la iglesia con el método del seminario.",
      "Aplicar el modelo de Hechos 15 para resolver un desacuerdo que afecta a todos.",
      "Proponer pasos concretos para cuidar la unidad.",
    ],
    paraEmpezar:
      "Caso: en una iglesia, los jóvenes piden un culto con música actual y los mayores sienten que se pierde la reverencia. Hay comentarios en los pasillos, y dos familias dicen que se irán si las cosas cambian.",
    bloques: [
      { t: "subtitulo", texto: "Los hechos y el fondo" },
      {
        t: "parrafo",
        texto:
          "Los hechos: hay dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse. El problema de fondo no es solo la música: es cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias.",
      },
      { t: "subtitulo", texto: "El modelo de Hechos 15" },
      { t: "versiculo", ref: "Hechos 15:6-7" },
      {
        t: "parrafo",
        texto:
          "Ante una gran discusión, «se reunieron los apóstoles y los ancianos para conocer de este asunto». Escucharon a las partes, examinaron la Escritura (Hechos 15:15-17) y llegaron a un acuerdo.",
      },
      { t: "versiculo", ref: "Hechos 15:28" },
      {
        t: "parrafo",
        texto:
          "La decisión se comunicó por escrito y con humildad: «Porque ha parecido bien al Espíritu Santo, y a nosotros». Buscaron la dirección de Dios, no solo la mayoría.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Una propuesta" },
      {
        t: "lista",
        items: [
          "Los líderes escuchan por separado a cada grupo y después juntos.",
          "Enseñan sobre la adoración y sobre el amor que no busca lo suyo, distinguiendo lo bíblico de lo que es gusto personal.",
          "Proponen un camino que honre a los dos grupos: variedad en el culto, o espacios distintos que no dividan a la iglesia.",
          "Explican la decisión con sus razones y piden que las críticas se hablen de frente.",
          "Visitan a las familias molestas y vuelven a evaluar en unos meses.",
        ],
      },
      { t: "versiculo", ref: "Romanos 14:19" },
      {
        t: "parrafo",
        texto: "El criterio de Pablo guía la decisión: «Así que, sigamos lo que contribuye a la paz y a la mutua edificación».",
      },
    ],
    ideaClave:
      "En el caso del culto, el problema de fondo no es la música, sino cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias. Como en Hechos 15, los líderes escuchan a las partes, examinan la Escritura, buscan la dirección del Espíritu y comunican la decisión con sus razones; el criterio es seguir lo que contribuye a la paz y a la mutua edificación.",
    paraLaVida: {
      texto: "Las diferencias no tienen que dividir si se tratan con la Palabra y con amor.",
      pregunta: "¿Qué desacuerdo de tu iglesia o de tu grupo necesita tratarse con estos pasos?",
    },
  },
  {
    id: "n5-seminario-3",
    objetivos: [
      "Analizar un caso de dinero faltante con el método del seminario.",
      "Aplicar los principios de justicia: no acusar sin pruebas y escuchar a la persona.",
      "Proponer controles que protejan a la iglesia y a quienes manejan el dinero.",
    ],
    paraEmpezar:
      "Caso: en una iglesia pequeña, el tesorero cuenta solo las ofrendas desde hace años. Un mes, el banco muestra 800 dólares menos de lo que se anotó. Algunos ya hablan de robo.",
    bloques: [
      { t: "subtitulo", texto: "Los hechos y el fondo" },
      {
        t: "parrafo",
        texto:
          "Los hechos: hay una diferencia de 800 dólares y una sola persona maneja el dinero. No se sabe todavía si hubo un error, una pérdida o un robo. El problema de fondo es que la iglesia nunca tuvo controles.",
      },
      { t: "versiculo", ref: "Deuteronomio 19:15" },
      {
        t: "parrafo",
        texto:
          "La Ley pedía justicia: «por el testimonio de dos o tres testigos se mantendrá la acusación». No se acusa a nadie por sospechas ni por rumores.",
      },
      { t: "subtitulo", texto: "Una propuesta" },
      {
        t: "lista",
        items: [
          "Dos personas de confianza revisan con calma los registros y el banco.",
          "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano.",
          "Si fue un error, se corrige y se aprende. Si hubo un robo, se busca el arrepentimiento y la restitución, la persona deja ese servicio y se pide consejo legal.",
          "Desde ya, las ofrendas las cuentan dos personas que firman, se depositan pronto y se informa a la iglesia.",
          "Se pide a todos que no repitan rumores mientras se revisa el asunto.",
        ],
      },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto:
          "Pablo procuraba hacer las cosas honradamente «no sólo delante del Señor sino también delante de los hombres». Los controles protegen también al tesorero: con dos personas que cuentan, nadie queda bajo sospecha.",
      },
    ],
    ideaClave:
      "En el caso del dinero faltante, no se sabe todavía si hubo un error o un robo, y el problema de fondo es la falta de controles. No se acusa sin pruebas: se revisan los registros, se escucha a la persona en privado, se corrige el error o se busca la restitución y el consejo legal, y desde ya se ponen controles que protegen a la iglesia y a quienes manejan el dinero.",
    paraLaVida: {
      texto: "La justicia escucha antes de juzgar, y los buenos controles evitan muchas sospechas.",
      pregunta: "¿Qué rumor has repetido sin pruebas, y qué harás distinto la próxima vez?",
    },
  },
  {
    id: "n5-seminario-4",
    objetivos: [
      "Analizar el caso de un líder que cae con el método del seminario.",
      "Aplicar los principios de confrontación, disciplina y restauración de la Palabra.",
      "Proponer cómo cuidar a las personas heridas y a la iglesia.",
    ],
    paraEmpezar:
      "Caso: se descubre que un líder de jóvenes, casado, mantiene una relación inapropiada con una mujer adulta de la iglesia. La noticia empieza a correr por los teléfonos.",
    bloques: [
      { t: "subtitulo", texto: "Los hechos y el fondo" },
      {
        t: "parrafo",
        texto:
          "Los hechos se confirman con cuidado, escuchando a las personas involucradas. El problema de fondo es doble: un pecado grave que hiere a varias familias, y una iglesia que necesita verdad, justicia y cuidado.",
      },
      { t: "versiculo", ref: "2 Samuel 12:7" },
      {
        t: "parrafo",
        texto:
          "Cuando David pecó, Dios envió al profeta Natán a confrontarlo: «Tú eres aquel hombre». La confrontación es clara, en privado al principio y con la verdad.",
      },
      { t: "versiculo", ref: "2 Samuel 12:13" },
      {
        t: "parrafo",
        texto:
          "David respondió: «Pequé contra Jehová». Dios lo perdonó, pero las consecuencias de su pecado siguieron (2 Samuel 12:10-14). El perdón no borra todas las consecuencias.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Una propuesta" },
      {
        t: "lista",
        items: [
          "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias.",
          "El líder deja su servicio de inmediato y recibe disciplina y acompañamiento.",
          "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme.",
          "Si en algún caso estuviera involucrado un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades.",
          "La restauración espiritual se busca con mansedumbre; volver a un cargo, si llega, es un proceso largo y evaluado.",
        ],
      },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "La meta es restaurar: «restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado». Nadie está libre de caer.",
      },
    ],
    ideaClave:
      "En el caso del líder que cae, primero se confirman los hechos y se cuida a las personas heridas. Como Natán con David, se confronta con la verdad; el líder deja su servicio, recibe disciplina y acompañamiento, y la iglesia recibe información veraz y prudente. Si hay un menor o una persona vulnerable, se protege a la víctima y se reporta. El perdón no borra todas las consecuencias, y la restauración se busca con mansedumbre.",
    paraLaVida: {
      texto: "Nadie está libre de caer: la prevención empieza en tu propia vida.",
      pregunta: "¿Qué límite o qué rendición de cuentas necesitas para no caer en lo que viste en este caso?",
    },
  },
  {
    id: "n5-seminario-5",
    objetivos: [
      "Analizar el caso de una iglesia que crece más rápido que su organización.",
      "Aplicar los principios de Éxodo 18 y Hechos 6 a una iglesia en crecimiento.",
      "Proponer un camino para integrar y formar a los nuevos.",
    ],
    paraEmpezar:
      "Caso: una iglesia pasó de sesenta a doscientas personas en dos años. El pastor está agotado, muchos nuevos no conocen a nadie y los voluntarios son siempre los mismos.",
    bloques: [
      { t: "subtitulo", texto: "Los hechos y el fondo" },
      {
        t: "parrafo",
        texto:
          "Los hechos: crecimiento rápido, un pastor cansado, nuevos sin integrar y pocos que sirven. El problema de fondo es que la iglesia creció en número, pero no en líderes ni en organización.",
      },
      { t: "versiculo", ref: "Hechos 2:47" },
      {
        t: "parrafo",
        texto:
          "El crecimiento es una bendición: en Jerusalén «el Señor añadía cada día a la iglesia los que habían de ser salvos». Pero trae desafíos, como pasó en Hechos 6.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "El consejo de Jetro vuelve a servir: «No está bien lo que haces. Desfallecerás del todo». El pastor no puede atender a doscientas personas como atendía a sesenta.",
      },
      { t: "subtitulo", texto: "Una propuesta" },
      {
        t: "lista",
        items: [
          "Formar líderes: escoger a personas fieles y formarlas, como enseña 2 Timoteo 2:2.",
          "Abrir grupos pequeños donde cada persona sea conocida y cuidada.",
          "Ofrecer un camino claro para los nuevos: bienvenida, primeros pasos y la academia desde el Nivel 1.",
          "Invitar a servir personalmente, según los dones de cada uno.",
          "Proteger el descanso del pastor y repartir el cuidado pastoral en un equipo.",
        ],
      },
      { t: "versiculo", ref: "Hechos 6:7" },
      {
        t: "parrafo",
        texto:
          "Cuando la iglesia de Jerusalén se organizó, el resultado fue más crecimiento: «Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén».",
      },
    ],
    ideaClave:
      "En el caso de la iglesia que crece, el problema de fondo es que creció en número, pero no en líderes ni en organización. El crecimiento es obra del Señor, pero, como dijo Jetro, un solo pastor no puede con todo: hay que formar líderes, abrir grupos pequeños, dar a los nuevos un camino claro, invitar a servir y proteger el descanso del pastor. Cuando la iglesia se organizó en Hechos 6, la palabra siguió creciendo.",
    paraLaVida: {
      texto: "Una iglesia que crece necesita crecer también en líderes.",
      pregunta: "¿A quién nuevo de tu iglesia podrías acompañar para que se integre y empiece a servir?",
    },
  },
  {
    id: "n5-seminario-6",
    objetivos: [
      "Describir las partes de un plan de ministerio.",
      "Preparar el plan de ministerio propio: visión, diagnóstico, metas, equipo, recursos, calendario y evaluación.",
      "Valorar la planificación sometida a Dios y la rendición de cuentas.",
    ],
    paraEmpezar:
      "Después de estudiar casos de otros, llega el turno del propio ministerio: ¿hacia dónde te lleva Dios y cómo vas a caminar hacia allá?",
    bloques: [
      { t: "versiculo", ref: "Proverbios 16:3" },
      {
        t: "parrafo",
        texto:
          "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados». El plan empieza y termina en oración. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Las partes del plan" },
      {
        t: "lista",
        items: [
          "El llamado y la visión: a qué te llamó Dios y hacia dónde crees que lleva tu ministerio.",
          "El diagnóstico: las fortalezas, las debilidades, las oportunidades y los riesgos de tu ministerio.",
          "Las metas: pocas, claras, que se puedan medir y con fecha.",
          "El equipo: quiénes te ayudarán y cómo los formarás.",
          "Los recursos: lo que hace falta y un presupuesto sencillo.",
          "El calendario: qué se hará cada mes o cada trimestre.",
          "La evaluación: cómo y cuándo revisarás el avance, y a quién rendirás cuentas.",
          "El cuidado personal: tu vida con Dios, tu familia y tu descanso.",
        ],
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a calcular antes de edificar: «Porque ¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
      },
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto:
          "El plan se escribe: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Un plan escrito se puede compartir con el equipo, revisar y mejorar.",
      },
      {
        t: "nota",
        titulo: "Hacia el proyecto final",
        texto:
          "Este plan puede servir de base para el proyecto final del Nivel 5, que se presenta y se defiende en vivo. Escríbelo con tu pastor o con tu mentor, y revísalo cada trimestre.",
      },
    ],
    ideaClave:
      "Un plan de ministerio tiene ocho partes: el llamado y la visión, el diagnóstico, pocas metas claras con fecha, el equipo y su formación, los recursos con un presupuesto, el calendario, la evaluación con rendición de cuentas y el cuidado personal. Se calcula antes de edificar, se escribe para compartirlo y revisarlo, y todo se encomienda a Jehová.",
    paraLaVida: {
      texto: "Un plan escrito y encomendado a Dios convierte la visión en pasos.",
      pregunta: "¿Cuál será la primera meta de tu plan de ministerio, y para qué fecha?",
    },
  },
];
