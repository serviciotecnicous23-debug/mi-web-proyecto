/**
 * Especialidad Alabanza y adoración · Materia 1 — Teología de la adoración (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Qué es adorar, Dios en el centro, la adoración del Antiguo Testamento (el tabernáculo, el templo y los salmos), lo que
 * cambió con Cristo, adorar en espíritu y en verdad, y la adoración de toda la vida y la del cielo.
 */
import type { LeccionContenido } from "../tipos";

export const ALABANZA_1: LeccionContenido[] = [
  {
    id: "alabanza-1-1",
    objetivos: [
      "Explicar qué es adorar según la Biblia.",
      "Distinguir la alabanza de la adoración, y ver cómo van juntas.",
      "Reconocer que adorar es responder a quien Dios es con toda la vida.",
    ],
    paraEmpezar:
      "Muchos piensan que adorar es cantar las canciones lentas del domingo. La Biblia muestra que es mucho más: es la respuesta de toda la persona a quien Dios es.",
    bloques: [
      { t: "versiculo", ref: "Juan 4:20-21" },
      {
        t: "parrafo",
        texto:
          "Junto al pozo de Sicar, una mujer samaritana le hizo a Jesús una pregunta sobre el lugar: «Nuestros padres adoraron en este monte, y vosotros decís que en Jerusalén es el lugar donde se debe adorar». Jesús le respondió que «la hora viene cuando ni en este monte ni en Jerusalén adoraréis al Padre».",
      },
      { t: "versiculo", ref: "Juan 4:23-24" },
      {
        t: "parrafo",
        texto:
          "Para Jesús, lo importante no era el lugar, sino el adorador: «los verdaderos adoradores adorarán al Padre en espíritu y en verdad; porque también el Padre tales adoradores busca que le adoren». Es el versículo de memoria de esta materia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Adorar es inclinarse delante de Dios" },
      { t: "versiculo", ref: "Salmos 95:6" },
      {
        t: "parrafo",
        texto:
          "En hebreo y en griego, las palabras que se traducen adorar hablan de inclinarse o postrarse delante de alguien. Por eso el salmista invita: «Venid, adoremos y postrémonos; Arrodillémonos delante de Jehová nuestro Hacedor». Adorar es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros somos sus criaturas.",
      },
      { t: "versiculo", ref: "Génesis 22:5" },
      {
        t: "parrafo",
        texto:
          "Cuando Abraham subió al monte para entregar a Isaac, les dijo a sus siervos: «yo y el muchacho iremos hasta allí y adoraremos». Para Abraham, adorar era entregarle a Dios lo más amado. La adoración no empieza en la música: empieza en un corazón que se rinde.",
      },
      { t: "versiculo", ref: "Mateo 4:10" },
      {
        t: "parrafo",
        texto: "Jesús le respondió al tentador con la Escritura: «Al Señor tu Dios adorarás, y a él sólo servirás». La adoración es solo para Dios, y adorar y servir van juntos.",
      },
      { t: "subtitulo", texto: "Alabanza y adoración" },
      { t: "versiculo", ref: "Salmos 103:1-2" },
      {
        t: "parrafo",
        texto:
          "Se suele distinguir entre las dos. Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y con gozo: «Bendice, alma mía, a Jehová, Y no olvides ninguno de sus beneficios». Adorar es inclinarse delante de él y rendirle la vida. En la Biblia van juntas: el mismo Salmo 95 empieza con cantos de júbilo y sigue con postrarse delante del Señor.",
      },
      {
        t: "lista",
        items: [
          "La adoración no es solo música: la música es una de sus formas.",
          "No es un estilo, lento o rápido: es una respuesta del corazón.",
          "No es solo un sentimiento: es reconocer la verdad de quién es Dios.",
          "No es un espectáculo: Dios es el centro, no los músicos ni el público.",
          "Es una respuesta a Dios con todo el ser, el domingo y toda la semana.",
        ],
      },
    ],
    ideaClave:
      "Adorar es inclinarse delante de Dios: reconocer que él es Dios y rendirle la vida. Jesús enseñó que lo importante no es el lugar, sino adorar al Padre en espíritu y en verdad. La alabanza celebra a Dios por lo que es y hace; la adoración se rinde delante de él; las dos van juntas, y la adoración es solo para Dios.",
    paraLaVida: {
      texto: "Dios no busca solo canciones: busca adoradores.",
      pregunta: "¿Qué parte de tu vida todavía no has rendido delante de Dios?",
    },
  },
  {
    id: "alabanza-1-2",
    objetivos: [
      "Explicar por qué Dios es el único digno de la adoración.",
      "Describir cómo la visión de Dios en Isaías 6 lleva a adorar.",
      "Reconocer las formas de idolatría que pueden colarse en la alabanza.",
    ],
    paraEmpezar: "La adoración bíblica no empieza con nosotros, ni con lo que sentimos, ni con la música: empieza con Dios.",
    bloques: [
      { t: "versiculo", ref: "Apocalipsis 4:11" },
      {
        t: "parrafo",
        texto:
          "En el cielo, los que rodean el trono dicen: «Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas». Dios es digno de la adoración por quién es: el Creador de todo.",
      },
      { t: "versiculo", ref: "Isaías 6:1-3" },
      {
        t: "parrafo",
        texto:
          "Isaías vio al Señor «sentado sobre un trono alto y sublime», y oyó a los serafines que decían: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria». Cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Lo que adoramos de Dios" },
      {
        t: "lista",
        items: [
          "Es santo: distinto de todo y sin mancha.",
          "Es el Creador: todo existe por su voluntad.",
          "Es bueno y misericordioso: su amor no se acaba.",
          "Es fiel: cumple lo que promete.",
          "Es el Salvador: envió a su Hijo por nosotros.",
        ],
      },
      { t: "versiculo", ref: "Romanos 11:36" },
      {
        t: "parrafo",
        texto: "Pablo termina su enseñanza sobre la salvación con adoración: «Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos».",
      },
      { t: "subtitulo", texto: "Solo a Dios" },
      { t: "versiculo", ref: "Éxodo 20:3-5" },
      {
        t: "parrafo",
        texto:
          "El primer mandamiento dice: «No tendrás dioses ajenos delante de mí», y el segundo prohíbe hacerse imágenes para inclinarse ante ellas. Un ídolo es cualquier cosa que ocupa el lugar de Dios en el corazón.",
      },
      { t: "versiculo", ref: "Apocalipsis 22:9" },
      {
        t: "parrafo",
        texto: "Cuando Juan se postró ante un ángel, el ángel lo detuvo: «Mira, no lo hagas; porque yo soy consiervo tuyo», y le dijo: «Adora a Dios». Ni los ángeles ni las personas reciben la adoración que es de Dios.",
      },
      {
        t: "nota",
        titulo: "Ídolos que se cuelan en la alabanza",
        texto:
          "La música, la emoción del momento, el talento del cantante, el aplauso o el estilo preferido pueden ocupar el lugar de Dios sin que nos demos cuenta. Una señal es cuando el culto se mide por lo que sentimos o por lo bien que salió, y no por si Dios fue honrado.",
      },
    ],
    ideaClave:
      "Dios es el centro de la adoración: es digno porque es el Creador, santo, bueno, fiel y Salvador. Isaías adoró al ver la santidad de Dios. La adoración es solo para él: ni los ángeles ni las personas la reciben, y cualquier cosa que ocupe su lugar, aun la música o la emoción, se vuelve un ídolo.",
    paraLaVida: {
      texto: "La pregunta del culto no es si me gustó, sino si Dios fue honrado.",
      pregunta: "¿Qué cosa buena podría estar ocupando el lugar de Dios en tu alabanza?",
    },
  },
  {
    id: "alabanza-1-3",
    objetivos: [
      "Describir el sentido del tabernáculo y del templo en la adoración de Israel.",
      "Explicar cómo David organizó la música del culto.",
      "Reconocer el lugar de los salmos en la adoración del pueblo de Dios.",
    ],
    paraEmpezar: "Para entender la adoración del Nuevo Testamento hay que conocer la del Antiguo: la tienda en el desierto, el templo y el libro de cantos de Israel.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 25:8" },
      {
        t: "parrafo",
        texto:
          "En el desierto, Dios le dijo a Moisés: «Y harán un santuario para mí, y habitaré en medio de ellos». El tabernáculo enseñaba que Dios quiere vivir con su pueblo, y también que solo se acerca a él quien es purificado: por eso estaban el altar, los sacrificios y los sacerdotes.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "subtitulo", texto: "David y la música del culto" },
      { t: "versiculo", ref: "1 Crónicas 16:29" },
      {
        t: "parrafo",
        texto:
          "Cuando David llevó el arca a Jerusalén, el pueblo cantó: «Dad a Jehová la honra debida a su nombre; Traed ofrenda, y venid delante de él; Postraos delante de Jehová en la hermosura de la santidad». David apartó a levitas para cantar y tocar instrumentos en el culto, con turnos y con maestros (1 Crónicas 25).",
      },
      { t: "versiculo", ref: "2 Crónicas 5:13-14" },
      {
        t: "parrafo",
        texto:
          "En la dedicación del templo de Salomón, los músicos «cantaban todos a una, para alabar y dar gracias a Jehová», diciendo: «Porque él es bueno, porque su misericordia es para siempre». Entonces la casa se llenó de una nube, «porque la gloria de Jehová había llenado la casa de Dios».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "subtitulo", texto: "Los salmos, el libro de cantos de Israel" },
      { t: "versiculo", ref: "Salmos 100:1-5" },
      {
        t: "parrafo",
        texto:
          "Los salmos son oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza. El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza», y da la razón: «Porque Jehová es bueno; para siempre es su misericordia».",
      },
      {
        t: "lista",
        items: [
          "Dios toma la iniciativa: él quiere habitar con su pueblo.",
          "A Dios se lo adora con santidad, y no de cualquier manera.",
          "La adoración se prepara con orden: hubo músicos apartados y formados.",
          "Se adora con gozo, con gratitud y con música, todo el pueblo junto.",
          "Los salmos enseñan a llevar a Dios toda la vida, también el dolor.",
        ],
      },
    ],
    ideaClave:
      "En el Antiguo Testamento, el tabernáculo y el templo mostraban que Dios quiere habitar con su pueblo y que se lo adora con santidad. David organizó la música del culto con levitas apartados y formados, y en la dedicación del templo la gloria de Dios llenó la casa mientras cantaban a una. Los salmos fueron el libro de cantos de Israel, para toda la vida.",
    paraLaVida: {
      texto: "Los salmos tienen palabras para la alegría y también para las lágrimas.",
      pregunta: "¿Qué salmo podrías hacer tu oración esta semana?",
    },
  },
  {
    id: "alabanza-1-4",
    objetivos: [
      "Explicar cómo Cristo cumplió el templo y los sacrificios.",
      "Describir el sacrificio de alabanza y el sacerdocio de todos los creyentes.",
      "Reconocer cómo adoraba la primera iglesia.",
    ],
    paraEmpezar: "Con Jesús, la adoración no se quedó en un edificio ni en los sacrificios de animales: todo encontró su cumplimiento en él.",
    bloques: [
      { t: "versiculo", ref: "Juan 2:19-21" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Destruid este templo, y en tres días lo levantaré», y Juan explica que «él hablaba del templo de su cuerpo». Ahora el lugar de encuentro con Dios no es un edificio, sino una persona: Jesucristo.",
      },
      { t: "versiculo", ref: "Hebreos 10:19-22" },
      {
        t: "parrafo",
        texto:
          "Por eso Hebreos dice que tenemos «libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo», por un camino «nuevo y vivo». Y nos invita: «acerquémonos con corazón sincero, en plena certidumbre de fe». Adoramos por medio de Cristo, no por nuestros méritos ni por un rito.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "El sacrificio de alabanza" },
      { t: "versiculo", ref: "Hebreos 13:15" },
      {
        t: "parrafo",
        texto:
          "Cristo se ofreció una vez para siempre, y ya no hacen falta sacrificios de animales. Lo que ofrecemos ahora es otro sacrificio: «ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza, es decir, fruto de labios que confiesan su nombre».",
      },
      { t: "versiculo", ref: "1 Pedro 2:5" },
      {
        t: "parrafo",
        texto:
          "Pedro enseña que todos los creyentes somos «sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo». La adoración no es solo de los músicos o de los líderes: cada creyente es un sacerdote que adora.",
      },
      { t: "subtitulo", texto: "Cómo adoraba la primera iglesia" },
      { t: "versiculo", ref: "Hechos 2:46-47" },
      {
        t: "parrafo",
        texto:
          "Los primeros creyentes se reunían en el templo y en las casas, y «comían juntos con alegría y sencillez de corazón, alabando a Dios». Su vida de adoración unía la enseñanza de los apóstoles, la comunión, el partimiento del pan, las oraciones y la alabanza (Hechos 2:42-47).",
      },
      {
        t: "lista",
        items: [
          "Antes, un lugar: Jerusalén. Ahora, una persona: Jesucristo.",
          "Antes, sacrificios que se repetían. Ahora, el sacrificio de Cristo, una vez para siempre.",
          "Antes, un grupo de sacerdotes. Ahora, todos los creyentes son sacerdotes.",
          "Antes, el templo. Ahora, la iglesia reunida y cada día de la vida.",
        ],
      },
    ],
    ideaClave:
      "Cristo cumplió el templo y los sacrificios: él es el lugar de encuentro con Dios, y por su sangre tenemos libertad para acercarnos al Padre. Ya no ofrecemos animales, sino sacrificio de alabanza por medio de él, y todos los creyentes somos un sacerdocio santo. La primera iglesia adoraba con alegría, en el templo y en las casas.",
    paraLaVida: {
      texto: "Nadie llega a Dios por lo bien que canta, sino por la sangre de Cristo.",
      pregunta: "¿Te acercas a Dios confiando en Cristo, o en lo que tú haces?",
    },
  },
  {
    id: "alabanza-1-5",
    objetivos: [
      "Explicar qué significa adorar en espíritu y en verdad.",
      "Evaluar si un canto dice la verdad sobre Dios.",
      "Valorar la adoración con el corazón y con el entendimiento.",
    ],
    paraEmpezar: "Jesús no dio una lista de estilos ni de horarios para adorar: dio dos marcas de la adoración verdadera, en espíritu y en verdad.",
    bloques: [
      { t: "versiculo", ref: "Juan 4:24" },
      {
        t: "parrafo",
        texto:
          "«Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren». En espíritu: desde el interior, con el corazón, movidos por el Espíritu Santo. En verdad: conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
      },
      { t: "subtitulo", texto: "En verdad: la Palabra" },
      { t: "versiculo", ref: "Juan 17:17" },
      {
        t: "parrafo",
        texto:
          "Jesús oró: «tu palabra es verdad». Un canto adora en verdad cuando dice de Dios lo que la Biblia dice. Lo que cantamos también enseña: muchas personas aprenden lo que creen sobre Dios por las canciones que repiten.",
      },
      { t: "versiculo", ref: "Colosenses 3:16" },
      {
        t: "parrafo",
        texto:
          "Pablo une la Palabra y el canto: «La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría, cantando con gracia en vuestros corazones al Señor con salmos e himnos y cánticos espirituales».",
      },
      { t: "subtitulo", texto: "En espíritu: el corazón y el Espíritu Santo" },
      { t: "versiculo", ref: "Isaías 29:13" },
      {
        t: "parrafo",
        texto:
          "Dios se quejó de un pueblo que lo honraba solo de palabra: «este pueblo se acerca a mí con su boca, y con sus labios me honra, pero su corazón está lejos de mí». Cantar la verdad sin el corazón no es adoración verdadera.",
      },
      { t: "versiculo", ref: "Efesios 5:18-19" },
      {
        t: "parrafo",
        texto:
          "La adoración es obra del Espíritu: «sed llenos del Espíritu, hablando entre vosotros con salmos, con himnos y cánticos espirituales, cantando y alabando al Señor en vuestros corazones».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:15" },
      {
        t: "parrafo",
        texto:
          "Pablo pide equilibrio: «cantaré con el espíritu, pero cantaré también con el entendimiento». La adoración no apaga la mente ni el corazón: los une.",
      },
      {
        t: "nota",
        titulo: "Los dones del Espíritu en el culto",
        texto:
          "En 1 Corintios 14, Pablo habla de los dones del Espíritu en la reunión de la iglesia. Lo que el ministerio enseña sobre ellos, como el hablar en lenguas, es un punto de la declaración de fe por confirmar y se estudia en su materia.",
      },
      {
        t: "lista",
        items: [
          "¿Dice de Dios lo que la Biblia dice?",
          "¿Pone a Cristo y su obra en el centro, y no a nosotros?",
          "¿Se entiende, para que todos puedan cantarlo con el entendimiento?",
          "¿Ayuda al pueblo a responder a Dios con el corazón?",
        ],
      },
    ],
    ideaClave:
      "Adorar en espíritu es adorar con el corazón, movidos por el Espíritu Santo; adorar en verdad es adorar conforme a quien Dios es, como se revela en su Palabra. Un canto adora en verdad cuando dice lo que la Biblia dice, y Dios rechaza la honra de labios sin el corazón. La adoración une el espíritu y el entendimiento.",
    paraLaVida: {
      texto: "Cantamos lo que creemos, y terminamos creyendo lo que cantamos.",
      pregunta: "¿Qué canto que repites con frecuencia deberías revisar con la Biblia en la mano?",
    },
  },
  {
    id: "alabanza-1-6",
    objetivos: [
      "Explicar la adoración como un sacrificio vivo de toda la vida.",
      "Relacionar la adoración con la justicia y la misericordia.",
      "Describir la adoración eterna del pueblo de Dios.",
    ],
    paraEmpezar: "El culto del domingo dura unas horas, pero la adoración no termina cuando se apagan los instrumentos: sigue el lunes en la casa, en el trabajo y en la calle.",
    bloques: [
      { t: "versiculo", ref: "Romanos 12:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo ruega «que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional». Toda la vida es adoración: lo que hacemos con el cuerpo, con el tiempo y con las decisiones. Por eso añade: «No os conforméis a este siglo, sino transformaos».",
      },
      { t: "versiculo", ref: "1 Corintios 10:31" },
      {
        t: "parrafo",
        texto: "Aun lo más sencillo puede ser adoración: «Si, pues, coméis o bebéis, o hacéis otra cosa, hacedlo todo para la gloria de Dios».",
      },
      { t: "subtitulo", texto: "La adoración que Dios rechaza" },
      { t: "versiculo", ref: "Amós 5:21-24" },
      {
        t: "parrafo",
        texto:
          "Israel tenía fiestas, ofrendas y mucha música, pero vivía en la injusticia. Dios dijo: «Quita de mí la multitud de tus cantares, pues no escucharé las salmodias de tus instrumentos. Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo».",
      },
      { t: "versiculo", ref: "Miqueas 6:8" },
      {
        t: "parrafo",
        texto: "Miqueas resume lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios». La alabanza del culto y la vida de la semana tienen que decir lo mismo.",
      },
      {
        t: "lista",
        items: [
          "En la casa: amar y servir a la familia.",
          "En el trabajo: ser honesto y trabajar de corazón.",
          "Con el prójimo: practicar la justicia y la misericordia.",
          "Con el cuerpo: vivir en santidad.",
          "Con el dinero: dar con generosidad y ayudar al necesitado.",
        ],
      },
      { t: "subtitulo", texto: "La adoración que no termina" },
      { t: "versiculo", ref: "Apocalipsis 5:9-13" },
      {
        t: "parrafo",
        texto:
          "La historia termina en adoración. En el cielo cantan un nuevo cántico al Cordero: «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación». Y toda la creación dice: «Al que está sentado en el trono, y al Cordero, sea la alabanza, la honra, la gloria y el poder, por los siglos de los siglos».",
      },
      {
        t: "nota",
        titulo: "Un ensayo para la eternidad",
        texto: "Cada vez que la iglesia adora, con gente de distintos pueblos y lenguas, ensaya lo que hará para siempre delante del trono.",
      },
    ],
    ideaClave:
      "La adoración abarca toda la vida: presentar el cuerpo en sacrificio vivo y hacerlo todo para la gloria de Dios. Dios rechaza la música del culto cuando la vida niega la justicia y la misericordia. La historia termina en la adoración eterna al Cordero, con gente de todo linaje, lengua, pueblo y nación.",
    paraLaVida: {
      texto: "El lunes también es día de culto.",
      pregunta: "¿Dónde, fuera del templo, puedes adorar a Dios esta semana con tus actos?",
    },
  },
];
