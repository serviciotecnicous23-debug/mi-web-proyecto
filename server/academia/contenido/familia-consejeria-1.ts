/**
 * Especialidad Familia y consejería · Materia 1 — Consejería matrimonial (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el matrimonio según Dios y el lugar del
 * consejero, la consejería prematrimonial, la comunicación y los conflictos, la infidelidad, el perdón y la restauración,
 * la violencia en el hogar (con la Línea Nacional sobre la Violencia Doméstica, comprobada) y el acompañamiento de los
 * matrimonios en cada etapa. Sigue el artículo 14 de la declaración de fe; no reemplaza la terapia profesional.
 */
import type { LeccionContenido } from "../tipos";

export const FAMILIA_CONSEJERIA_1: LeccionContenido[] = [
  {
    id: "familia-consejeria-1-1",
    objetivos: [
      "Explicar el diseño de Dios para el matrimonio como un pacto para toda la vida.",
      "Describir el lugar del consejero matrimonial de la iglesia y sus límites.",
      "Dirigir la primera conversación con un matrimonio que pide ayuda.",
    ],
    paraEmpezar:
      "Muchos matrimonios piden ayuda cuando ya están muy heridos. El consejero de la iglesia no puede resolverlo todo, pero puede escuchar, llevarlos a la Palabra, darles esperanza y saber cuándo buscar más ayuda.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Génesis 2:18" },
      {
        t: "parrafo",
        texto:
          "En el principio, Dios dijo: «No es bueno que el hombre esté solo; le haré ayuda idónea para él». El matrimonio nace del corazón de Dios, no de una costumbre humana.",
      },
      { t: "versiculo", ref: "Mateo 19:4-6" },
      {
        t: "parrafo",
        texto:
          "Jesús volvió al principio: «el que los hizo al principio, varón y hembra los hizo», y concluyó: «lo que Dios juntó, no lo separe el hombre». La declaración de fe del ministerio enseña que el matrimonio entre un hombre y una mujer es un pacto de amor y fidelidad para toda la vida (artículo 14).",
      },
      { t: "versiculo", ref: "Efesios 5:25" },
      {
        t: "parrafo",
        texto:
          "El modelo es Cristo: «Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella». El amor del matrimonio es un amor que se entrega.",
      },
      { t: "versiculo", ref: "Efesios 5:33" },
      {
        t: "parrafo",
        texto:
          "Y Pablo lo resume así: «cada uno de vosotros ame también a su mujer como a sí mismo; y la mujer respete a su marido». El amor y el respeto se necesitan uno al otro.",
      },
      { t: "subtitulo", texto: "El lugar del consejero de la iglesia" },
      {
        t: "lista",
        items: [
          "Escucha a los dos y no toma partido.",
          "Lleva a los dos a la Palabra y a la gracia de Dios, no a su propia opinión.",
          "Guarda la confianza, con los límites que se explican desde el principio: el peligro para una vida, el abuso de un menor o la violencia.",
          "Sabe cuándo derivar a un consejero o terapeuta matrimonial profesional, sin dejar de acompañar.",
          "Nunca aconseja a solas a una persona del otro sexo en un lugar privado.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera conversación con un matrimonio" },
      {
        t: "lista",
        items: [
          "Paso 1, recibirlos juntos: un lugar tranquilo y visible, y si es posible, el consejero con su esposa.",
          "Paso 2, explicar el marco: cuánto durarán las conversaciones, qué queda en confianza y qué no.",
          "Paso 3, escuchar a cada uno: los dos cuentan su versión sin ser interrumpidos.",
          "Paso 4, buscar lo bueno: ¿qué los unió? ¿Qué cosas buenas siguen teniendo?",
          "Paso 5, nombrar el problema principal con sus palabras, sin culpar a nadie.",
          "Paso 6, un primer paso: un pequeño compromiso para esa semana, y orar juntos.",
          "Paso 7, preguntar por la seguridad: si hay violencia, se habla con cada uno por separado y se sigue lo que enseña la lección 5.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La consejería de la iglesia no reemplaza la terapia profesional. Cuando hay violencia, adicciones, depresión grave o problemas que te superan, deriva a un profesional y sigue acompañando con oración y con la comunidad de la iglesia.",
      },
    ],
    ideaClave:
      "Dios vio que no era bueno que el hombre estuviera solo y creó el matrimonio; Jesús enseñó que lo que Dios juntó no lo separe el hombre, y la declaración de fe lo enseña como un pacto de amor y fidelidad para toda la vida. El modelo es el amor de Cristo que se entrega, con amor y respeto. El consejero de la iglesia escucha a los dos, no toma partido, los lleva a la Palabra, guarda la confianza con sus límites y sabe cuándo derivar.",
    paraLaVida: {
      texto: "El amor del matrimonio es un amor que se entrega.",
      pregunta: "¿Qué matrimonio de tu iglesia necesita hoy que alguien lo escuche?",
    },
  },
  {
    id: "familia-consejeria-1-2",
    objetivos: [
      "Explicar para qué sirve la consejería prematrimonial.",
      "Planear un ciclo de conversaciones prematrimoniales.",
      "Ayudar a una pareja a hablar de los temas que suelen evitar.",
    ],
    paraEmpezar:
      "Muchos problemas del matrimonio se podrían haber conversado antes de la boda. La consejería prematrimonial no es un trámite: es una oportunidad para empezar bien.",
    bloques: [
      { t: "versiculo", ref: "Amós 3:3" },
      {
        t: "parrafo",
        texto:
          "El profeta pregunta: «¿Andarán dos juntos, si no estuvieren de acuerdo?». La pareja que conversa antes de casarse llega más unida al camino.",
      },
      { t: "versiculo", ref: "2 Corintios 6:14" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «No os unáis en yugo desigual con los incrédulos». La fe compartida es la base: el consejero pregunta con amor y con claridad cómo vive cada uno su fe.",
      },
      { t: "versiculo", ref: "Hebreos 13:4" },
      {
        t: "parrafo",
        texto:
          "Y recuerda la dignidad del pacto: «Honroso sea en todos el matrimonio, y el lecho sin mancilla». La pureza antes de la boda prepara la fidelidad después.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un ciclo de seis conversaciones" },
      {
        t: "lista",
        items: [
          "Conversación 1, la historia y la fe: cómo se conocieron, cómo conocieron a Cristo y por qué quieren casarse.",
          "Conversación 2, las expectativas y los roles: qué espera cada uno del otro y cómo se reparten las tareas.",
          "Conversación 3, la comunicación y los conflictos: cómo discuten hoy y cómo pueden hacerlo mejor.",
          "Conversación 4, el dinero: deudas, presupuesto, ahorro y generosidad.",
          "Conversación 5, la intimidad y la sexualidad: con respeto, con la Biblia y con un matrimonio mentor del mismo sexo si hace falta.",
          "Conversación 6, las familias de origen, los hijos y la boda: cómo dejarán padre y madre, y cómo será la ceremonia.",
        ],
      },
      { t: "subtitulo", texto: "Los temas que las parejas suelen evitar" },
      {
        t: "lista",
        items: [
          "Las deudas y los hábitos de gasto.",
          "Las heridas del pasado, como un abuso o relaciones anteriores.",
          "Las adicciones, también la pornografía.",
          "La relación con los padres y los suegros.",
          "Si quieren tener hijos, cuántos y cuándo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "En Texas, las parejas que toman un curso prematrimonial aprobado pueden casarse sin esperar las 72 horas después de recibir la licencia, como se vio en la materia Ordenanzas y ceremonias. Pero el propósito de la consejería no es el trámite, sino el matrimonio.",
      },
      {
        t: "nota",
        titulo: "Cuando hay señales de alarma",
        texto:
          "Si en las conversaciones aparecen control, celos que asustan, violencia o una adicción sin tratar, el consejero lo dice con claridad y con amor, y recomienda esperar y buscar ayuda antes de la boda.",
      },
    ],
    ideaClave:
      "¿Andarán dos juntos si no están de acuerdo? La consejería prematrimonial ayuda a la pareja a conversar antes de la boda: su historia y su fe, sin yugo desigual, sus expectativas, la comunicación, el dinero, la intimidad, las familias de origen y los hijos. El consejero ayuda a hablar de los temas que suelen evitarse y, ante señales de alarma como la violencia o una adicción, recomienda esperar y buscar ayuda.",
    paraLaVida: {
      texto: "La consejería prematrimonial no es un trámite: es una oportunidad para empezar bien.",
      pregunta: "¿Qué tema le costaría más conversar a una pareja que conoces antes de casarse?",
    },
  },
  {
    id: "familia-consejeria-1-3",
    objetivos: [
      "Reconocer los hábitos que dañan la comunicación del matrimonio y los que la sanan.",
      "Enseñar a un matrimonio a discutir sin herirse.",
      "Usar los lenguajes del amor para ayudar a una pareja a entenderse.",
    ],
    paraEmpezar:
      "Todos los matrimonios discuten. La diferencia entre un matrimonio sano y uno herido no es que uno discuta y el otro no, sino cómo discuten y cómo se reconcilian.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Efesios 4:26" },
      {
        t: "parrafo",
        texto:
          "La Biblia no prohíbe el enojo, pero le pone límites: «Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo». Los conflictos no se guardan para mañana.",
      },
      { t: "versiculo", ref: "Efesios 4:29" },
      {
        t: "parrafo",
        texto:
          "Las palabras construyen o destruyen: «Ninguna palabra corrompida salga de vuestra boca, sino la que sea buena para la necesaria edificación».",
      },
      { t: "versiculo", ref: "Efesios 4:31-32" },
      {
        t: "parrafo",
        texto:
          "Y Pablo da el camino: «Quítense de vosotros toda amargura, enojo, ira, gritería y maledicencia», «Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros».",
      },
      { t: "subtitulo", texto: "Hábitos que dañan y hábitos que sanan" },
      {
        t: "lista",
        items: [
          "Daña la crítica que ataca a la persona; sana la queja que habla de un hecho: me dolió que no llamaras.",
          "Daña el desprecio, las burlas y los gestos de superioridad; sana el respeto, aun en el desacuerdo.",
          "Daña ponerse a la defensiva; sana reconocer la parte de responsabilidad.",
          "Daña el silencio que castiga; sana pedir una pausa y volver a hablar cuando los dos estén calmados.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una conversación difícil en cinco pasos" },
      {
        t: "lista",
        items: [
          "Paso 1, elegir el momento: no en medio de la discusión, sino cuando los dos estén calmados.",
          "Paso 2, hablar de uno mismo: yo me siento solo cuando llegas tarde y no avisas, en lugar de tú nunca piensas en mí.",
          "Paso 3, escuchar y repetir: el otro repite lo que entendió antes de responder.",
          "Paso 4, buscar un acuerdo pequeño: avisar con un mensaje si va a llegar tarde.",
          "Paso 5, cerrar con perdón y oración: pedirse perdón por lo que cada uno hizo mal, y orar juntos.",
        ],
      },
      { t: "subtitulo", texto: "Los lenguajes del amor" },
      {
        t: "parrafo",
        texto:
          "Gary Chapman, en Los 5 lenguajes del amor, explica que cada persona siente el amor de una manera distinta: con palabras de afirmación, con tiempo de calidad, con regalos, con actos de servicio o con el contacto físico. Muchas veces los dos se aman, pero cada uno lo expresa en un idioma que el otro no entiende. Ayudarlos a descubrir el lenguaje del otro abre caminos.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No te conviertas en juez de quién tiene la razón. Tu tarea es ayudarlos a escucharse y a hablar con gracia, para que ellos mismos encuentren el camino.",
      },
    ],
    ideaClave:
      "La Biblia permite el enojo pero le pone límites: no pecar y no dejar que el sol se ponga sobre el enojo; ninguna palabra corrompida, sino la que edifica, y quitar la amargura y la gritería para ser benignos y perdonarse. Dañan la crítica, el desprecio, la defensiva y el silencio que castiga; sanan la queja sin ataque, el respeto, la responsabilidad y la pausa. Una conversación difícil elige el momento, habla de uno mismo, escucha y repite, busca un acuerdo pequeño y cierra con perdón; y los lenguajes del amor ayudan a que cada uno entienda cómo ama el otro.",
    paraLaVida: {
      texto: "La diferencia no está en si discuten, sino en cómo discuten y cómo se reconcilian.",
      pregunta: "¿Qué hábito que daña la comunicación ves más seguido en los matrimonios que acompañas?",
    },
  },
  {
    id: "familia-consejeria-1-4",
    objetivos: [
      "Acompañar a un matrimonio después de una infidelidad, paso a paso.",
      "Distinguir el perdón, la confianza y la reconciliación.",
      "Explicar con respeto lo que enseña la Biblia sobre el divorcio y las posiciones de las iglesias.",
    ],
    paraEmpezar:
      "Pocas heridas son tan profundas como la infidelidad. Algunos matrimonios se rompen; otros, con mucho trabajo y con la gracia de Dios, se restauran. El consejero acompaña ese camino con verdad y con esperanza.",
    bloques: [
      { t: "versiculo", ref: "Oseas 3:1" },
      {
        t: "parrafo",
        texto:
          "Dios le pidió al profeta Oseas algo muy difícil: «Ve, ama a una mujer amada de su compañero, aunque adúltera, como el amor de Jehová para con los hijos de Israel». La historia de Oseas muestra que el amor de Dios puede restaurar lo que parecía perdido.",
      },
      { t: "versiculo", ref: "Colosenses 3:13" },
      {
        t: "parrafo",
        texto:
          "El perdón tiene un modelo: «De la manera que Cristo os perdonó, así también hacedlo vosotros». Pero perdonar no significa que la herida sana en un día.",
      },
      { t: "subtitulo", texto: "El perdón, la confianza y la reconciliación" },
      {
        t: "lista",
        items: [
          "El perdón: es una decisión delante de Dios de no cobrar la deuda; no depende de que el otro cambie.",
          "La confianza: se reconstruye con el tiempo y con hechos; no se puede exigir de inmediato.",
          "La reconciliación: necesita a los dos; el que falló se arrepiente de verdad y el herido decide volver a confiar poco a poco.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el camino de la restauración" },
      {
        t: "lista",
        items: [
          "Paso 1, terminar la relación: el que fue infiel la corta del todo, sin contacto.",
          "Paso 2, confesar y pedir perdón: sin culpar al otro ni a las circunstancias.",
          "Paso 3, transparencia: el teléfono, las cuentas y los horarios quedan a la vista.",
          "Paso 4, consejería: con el pastor y, muchas veces, con un consejero profesional.",
          "Paso 5, tiempo: el herido puede tener días buenos y días malos; el que falló tiene paciencia.",
          "Paso 6, renovar el pacto: cuando los dos están listos, pueden renovar sus promesas delante de Dios.",
        ],
      },
      { t: "versiculo", ref: "Mateo 19:9" },
      { t: "versiculo", ref: "1 Corintios 7:15" },
      { t: "subtitulo", texto: "Lo que enseña la Biblia sobre el divorcio" },
      {
        t: "lista",
        items: [
          "Dios aborrece el repudio, y su plan es un matrimonio para toda la vida.",
          "Jesús habló de una excepción: «salvo por causa de fornicación».",
          "Pablo habló del creyente abandonado por un cónyuge que no cree: «Pero si el incrédulo se separa, sepárese».",
          "Las iglesias evangélicas no aplican estos textos del mismo modo, sobre todo sobre un nuevo matrimonio: unas lo permiten en esos casos y otras no.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La declaración de fe enseña que el matrimonio es un pacto para toda la vida (artículo 14). Cómo se aplica a cada caso de divorcio y de nuevo matrimonio lo acompañan los pastores, con la Biblia y con misericordia. El consejero no decide solo ni promete lo que no le corresponde.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La persona herida necesita escuchar que no tuvo la culpa de la infidelidad del otro. Y el que falló necesita escuchar que hay perdón en Cristo, aunque las consecuencias no desaparezcan.",
      },
    ],
    ideaClave:
      "Dios pidió a Oseas amar a una esposa infiel, y su historia muestra que el amor de Dios puede restaurar lo que parecía perdido; perdonamos como Cristo nos perdonó. El perdón es una decisión delante de Dios, la confianza se reconstruye con tiempo y hechos, y la reconciliación necesita a los dos. La restauración pide terminar la relación, confesar, transparencia, consejería, tiempo y, al final, renovar el pacto. Sobre el divorcio, Jesús habló de la fornicación y Pablo del abandono del incrédulo; las iglesias no los aplican igual, y cada caso lo acompañan los pastores.",
    paraLaVida: {
      texto: "Perdonar no significa que la herida sana en un día.",
      pregunta: "¿Qué necesita escuchar hoy la persona herida, y qué necesita escuchar la que falló?",
    },
  },
  {
    id: "familia-consejeria-1-5",
    objetivos: [
      "Reconocer las formas de la violencia en el hogar.",
      "Responder a una persona que cuenta que su cónyuge la maltrata, poniendo primero su seguridad.",
      "Explicar por qué la Biblia nunca justifica el maltrato en el matrimonio.",
    ],
    paraEmpezar:
      "La violencia en el hogar también ocurre en familias que van a la iglesia. Muchas víctimas callan por miedo, por vergüenza o porque alguien les dijo que debían aguantar. La iglesia debe ser un lugar seguro para decir la verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Colosenses 3:19" },
      {
        t: "parrafo",
        texto:
          "La Biblia es clara: «Maridos, amad a vuestras mujeres, y no seáis ásperos con ellas». Ningún texto sobre el respeto o la sujeción justifica el maltrato.",
      },
      { t: "versiculo", ref: "1 Pedro 3:7" },
      {
        t: "parrafo",
        texto:
          "Pedro pide al marido vivir con su esposa «sabiamente, dando honor a la mujer», y le advierte que el maltrato afecta su relación con Dios: «para que vuestras oraciones no tengan estorbo».",
      },
      { t: "versiculo", ref: "Salmos 11:5" },
      {
        t: "parrafo",
        texto: "Dios no es neutral ante la violencia: «al malo y al que ama la violencia, su alma los aborrece».",
      },
      { t: "subtitulo", texto: "Las formas de la violencia en el hogar" },
      {
        t: "lista",
        items: [
          "Física: golpes, empujones, encierros o amenazas con armas.",
          "Emocional: insultos, humillaciones, amenazas y aislamiento de la familia y los amigos.",
          "Sexual: obligar a tener relaciones o a hacer lo que la persona no quiere.",
          "Económica: quitarle el dinero, prohibirle trabajar o controlar cada gasto para dominarla.",
          "El control: revisar el teléfono, decidir con quién habla y adónde va, y usar los celos para dominar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una esposa cuenta que su esposo la golpea" },
      {
        t: "lista",
        items: [
          "Paso 1, creerle y agradecerle: decirle que no es su culpa y que hizo bien en contarlo.",
          "Paso 2, preguntar por su seguridad: ¿corre peligro ahora? ¿Y sus hijos? Si hay peligro inmediato, se llama al 911.",
          "Paso 3, darle la Línea Nacional sobre la Violencia Doméstica, 1-800-799-7233, que atiende las 24 horas, de manera confidencial y también en español; o escribir START al 88788.",
          "Paso 4, ayudarla con un plan de seguridad: un lugar adonde ir, documentos, dinero y un teléfono, con la ayuda de la línea o de un refugio.",
          "Paso 5, no confrontar solo al agresor ni proponer una consejería de pareja mientras haya violencia: eso puede aumentar el peligro.",
          "Paso 6, si los hijos sufren maltrato, reportarlo como pide la ley en Texas, a la línea 1-800-252-5400.",
          "Paso 7, acompañarla: la iglesia la rodea con oración, ayuda práctica y apoyo, también si necesita una orden de protección de la corte.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "El agresor también necesita ayuda, pero la ayuda empieza por hacerse responsable y aceptar consecuencias, con un programa especializado. Una reconciliación solo se piensa cuando hay seguridad y un cambio de verdad, comprobado en el tiempo.",
      },
      {
        t: "nota",
        titulo: "Lo que nunca se dice",
        texto:
          "Nunca le digas a una víctima que aguante por el bien del matrimonio, que se sujete más o que ore para que el otro cambie mientras sigue en peligro. Primero, su seguridad y la de sus hijos.",
      },
    ],
    ideaClave:
      "La Biblia manda a los maridos amar a sus esposas y no ser ásperos con ellas, vivir con ellas sabiamente dando honor, y Dios aborrece al que ama la violencia: ningún texto justifica el maltrato. La violencia en el hogar puede ser física, emocional, sexual, económica o de control. Ante una víctima, se le cree, se pregunta por su seguridad, se llama al 911 si hay peligro, se le da la Línea Nacional sobre la Violencia Doméstica, se arma un plan de seguridad, no se propone consejería de pareja mientras haya violencia, se reporta si los hijos sufren y la iglesia la acompaña.",
    paraLaVida: {
      texto: "Primero, la seguridad de la víctima y la de sus hijos.",
      pregunta: "¿Tiene tu iglesia a mano el número de la línea de violencia doméstica y de un refugio cercano?",
    },
  },
  {
    id: "familia-consejeria-1-6",
    objetivos: [
      "Describir los desafíos de cada etapa del matrimonio.",
      "Organizar un programa de matrimonios mentores en la iglesia.",
      "Prevenir las crisis con hábitos que fortalecen el matrimonio.",
    ],
    paraEmpezar:
      "Un matrimonio no vive siempre la misma etapa. Los recién casados, los padres de niños pequeños y los que quedan solos cuando los hijos se van enfrentan desafíos distintos. La iglesia puede acompañarlos en cada una.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Eclesiastés 4:12" },
      {
        t: "parrafo",
        texto:
          "El sabio lo dice así: «cordón de tres dobleces no se rompe pronto». Un matrimonio con Dios en el centro es más fuerte que dos personas solas.",
      },
      { t: "versiculo", ref: "Cantares 8:7" },
      {
        t: "parrafo",
        texto: "Y el amor verdadero resiste: «Las muchas aguas no podrán apagar el amor, Ni lo ahogarán los ríos».",
      },
      { t: "subtitulo", texto: "Las etapas del matrimonio" },
      {
        t: "lista",
        items: [
          "Los recién casados: aprender a vivir juntos, a decidir juntos y a dejar padre y madre.",
          "La llegada de los hijos: el cansancio, menos tiempo para los dos y nuevas tareas.",
          "Los años intensos: el trabajo, los hijos adolescentes y las deudas.",
          "El nido vacío: volver a encontrarse como pareja cuando los hijos se van.",
          "La vejez: la salud, el cuidado mutuo y la preparación para la viudez.",
        ],
      },
      { t: "versiculo", ref: "Tito 2:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que las mujeres mayores enseñen a las jóvenes, «que enseñen a las mujeres jóvenes a amar a sus maridos y a sus hijos». Los matrimonios con experiencia pueden acompañar a los más jóvenes.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un programa de matrimonios mentores" },
      {
        t: "lista",
        items: [
          "Paso 1, elegir: el pastor invita a matrimonios con buen testimonio y con años de camino.",
          "Paso 2, preparar: los mentores reciben una capacitación sobre cómo escuchar, qué guardar en confianza y cuándo derivar.",
          "Paso 3, unir: cada matrimonio mentor acompaña a uno o dos matrimonios jóvenes.",
          "Paso 4, reunirse: una vez al mes, en una casa o comiendo juntos, conversan con un libro o un pasaje como guía.",
          "Paso 5, orar: los mentores oran cada semana por los matrimonios que acompañan.",
          "Paso 6, evaluar: a los seis meses se conversa cómo va, y el pastor sigue disponible para los casos difíciles.",
        ],
      },
      { t: "subtitulo", texto: "Hábitos que fortalecen el matrimonio" },
      {
        t: "lista",
        items: [
          "Orar y leer la Biblia juntos, aunque sea un poco cada día.",
          "Tener un tiempo a solas cada semana, sin teléfonos.",
          "Hablar del dinero y de los planes antes de que haya problemas.",
          "Pedir ayuda a tiempo, sin esperar a que la herida sea grande.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un retiro de matrimonios al año, un taller y los matrimonios mentores previenen muchas crisis. Es más fácil cuidar un matrimonio sano que reparar uno roto.",
      },
    ],
    ideaClave:
      "Cordón de tres dobleces no se rompe pronto, y las muchas aguas no pueden apagar el amor. Cada etapa del matrimonio trae sus desafíos: los recién casados, la llegada de los hijos, los años intensos, el nido vacío y la vejez. Como pidió Pablo que las mayores enseñen a las jóvenes, un programa de matrimonios mentores acompaña a los más jóvenes con preparación, reuniones, oración y evaluación, y los hábitos de orar juntos, tener tiempo a solas, hablar del dinero y pedir ayuda a tiempo previenen muchas crisis.",
    paraLaVida: {
      texto: "Es más fácil cuidar un matrimonio sano que reparar uno roto.",
      pregunta: "¿Qué matrimonio de tu iglesia podría ser mentor de uno más joven?",
    },
  },
];
