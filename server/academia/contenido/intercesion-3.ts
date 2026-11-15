/**
 * Especialidad Intercesión y oración · Materia 3 — El ayuno bíblico (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Qué es el ayuno bíblico, los ayunos del Antiguo Testamento, el ayuno de Jesús y de la iglesia, el ayuno que Dios
 * escogió, cómo ayunar con sabiduría y cuidando la salud, y los peligros y los frutos del ayuno. Los consejos de salud son
 * generales: quien tenga una enfermedad o tome medicinas consulta a su médico.
 */
import type { LeccionContenido } from "../tipos";

export const INTERCESION_3: LeccionContenido[] = [
  {
    id: "intercesion-3-1",
    objetivos: [
      "Definir el ayuno bíblico como dejar de comer por un tiempo para buscar a Dios.",
      "Explicar por qué Jesús esperaba que sus discípulos ayunaran.",
      "Distinguir el ayuno de una dieta o de una forma de presionar a Dios.",
    ],
    paraEmpezar:
      "Muchos han oído hablar del ayuno, pero pocos saben qué enseña la Biblia sobre él. Empezamos por lo básico: qué es y cómo lo enseñó Jesús.",
    bloques: [
      { t: "versiculo", ref: "Mateo 6:16-18" },
      {
        t: "parrafo",
        texto:
          "Jesús no dice si ayunáis, sino «Cuando ayunéis». Da por hecho que sus discípulos ayunarán, y enseña cómo: no para mostrarlo a los hombres, «sino a tu Padre que está en secreto». El ayuno es algo entre el creyente y Dios.",
      },
      {
        t: "parrafo",
        texto:
          "En la Biblia, ayunar es dejar de comer por un tiempo para buscar a Dios: para humillarse delante de él, para orar con más dedicación, para pedir dirección o para expresar arrepentimiento y dolor. No es una dieta para bajar de peso ni una huelga de hambre para obligar a Dios: es una manera de decirle con todo el ser que lo necesitamos más que al pan.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1), con el Sermón del monte", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 9:14-15" },
      {
        t: "parrafo",
        texto:
          "Cuando le preguntaron por qué sus discípulos no ayunaban, Jesús respondió que mientras el esposo estaba con ellos era tiempo de fiesta, y añadió: «Pero vendrán días cuando el esposo les será quitado, y entonces ayunarán». Esos días son los nuestros: la iglesia ayuna mientras espera a su Señor.",
      },
      { t: "subtitulo", texto: "Volverse a Dios de corazón" },
      { t: "versiculo", ref: "Joel 2:12-13" },
      {
        t: "parrafo",
        texto:
          "Por el profeta Joel, Dios llama: «convertíos a mí con todo vuestro corazón, con ayuno y lloro y lamento». Y aclara lo que importa: «Rasgad vuestro corazón, y no vuestros vestidos». El ayuno vale cuando acompaña un corazón que se vuelve a Dios.",
      },
      {
        t: "lista",
        items: [
          "Ayunar es dejar de comer por un tiempo para buscar a Dios.",
          "Jesús dijo cuando ayunéis: lo espera de sus discípulos.",
          "Se hace delante del Padre, no para que nos vean.",
          "Va unido a la oración y a la Palabra.",
          "No es una dieta ni una forma de presionar a Dios.",
        ],
      },
    ],
    ideaClave:
      "Ayunar es dejar de comer por un tiempo para buscar a Dios. Jesús dijo cuando ayunéis, y anunció que sus discípulos ayunarían cuando el esposo les fuera quitado. Se ayuna delante del Padre que ve en lo secreto, con un corazón que se vuelve a él: rasgad vuestro corazón, y no vuestros vestidos.",
    paraLaVida: {
      texto: "El ayuno es decirle a Dios: te necesito más que al pan.",
      pregunta: "¿Qué lugar ha tenido el ayuno en tu vida hasta hoy?",
    },
  },
  {
    id: "intercesion-3-2",
    objetivos: [
      "Describir ayunos del Antiguo Testamento y sus motivos.",
      "Reconocer que el ayuno acompañaba momentos de dolor, necesidad, peligro y arrepentimiento.",
      "Distinguir los ayunos extraordinarios de los que el creyente puede practicar.",
    ],
    paraEmpezar: "En el Antiguo Testamento, el pueblo de Dios ayunaba en los momentos decisivos. Cada ayuno tiene su historia y su motivo.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 34:28" },
      {
        t: "parrafo",
        texto:
          "Moisés estuvo con Dios en el monte «cuarenta días y cuarenta noches; no comió pan, ni bebió agua», mientras recibía las palabras del pacto. Fue un ayuno extraordinario, sostenido por Dios mismo, y no es un modelo para imitar.",
      },
      { t: "versiculo", ref: "2 Samuel 12:16" },
      {
        t: "parrafo",
        texto: "David ayunó por su hijo enfermo: «Entonces David rogó a Dios por el niño; y ayunó David». El ayuno acompañaba la intercesión en el dolor.",
      },
      { t: "versiculo", ref: "Esdras 8:21-23" },
      {
        t: "parrafo",
        texto:
          "Antes de un viaje peligroso, Esdras proclamó ayuno «para solicitar de él camino derecho para nosotros, y para nuestros niños, y para todos nuestros bienes». Y cuenta el resultado: «Ayunamos, pues, y pedimos a nuestro Dios sobre esto, y él nos fue propicio».",
      },
      { t: "versiculo", ref: "Ester 4:16" },
      {
        t: "parrafo",
        texto:
          "Ante una amenaza contra todo su pueblo, Ester pidió: «ayunad por mí, y no comáis ni bebáis en tres días, noche y día». Fue un ayuno breve, de todo el pueblo, ante un peligro de muerte.",
      },
      { t: "versiculo", ref: "Jonás 3:5-10" },
      {
        t: "parrafo",
        texto:
          "Cuando Jonás anunció el juicio, «los hombres de Nínive creyeron a Dios, y proclamaron ayuno». Fue un ayuno de arrepentimiento: «conviértase cada uno de su mal camino». Y Dios tuvo misericordia: «se arrepintió del mal que había dicho que les haría, y no lo hizo».",
      },
      { t: "versiculo", ref: "Daniel 10:2-3" },
      {
        t: "parrafo",
        texto:
          "Daniel hizo un ayuno parcial durante tres semanas: «No comí manjar delicado, ni entró en mi boca carne ni vino». No dejó todo alimento: dejó lo agradable para buscar a Dios.",
      },
      {
        t: "nota",
        titulo: "Los ayunos sin agua",
        texto:
          "Los cuarenta días de Moisés sin comer ni beber agua fueron un hecho extraordinario. Ayunar sin agua puede ser peligroso para la salud, sobre todo por más de un día. En la lección 5 veremos cómo ayunar con sabiduría.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "lista",
        items: [
          "Moisés: en la presencia de Dios, un ayuno extraordinario.",
          "David: en el dolor, rogando por su hijo.",
          "Esdras: pidiendo dirección y protección.",
          "Ester: ante un peligro de muerte, con todo el pueblo.",
          "Nínive: en arrepentimiento.",
          "Daniel: un ayuno parcial para buscar a Dios.",
        ],
      },
    ],
    ideaClave:
      "En el Antiguo Testamento, el pueblo de Dios ayunaba en los momentos decisivos: Moisés en la presencia de Dios, David en el dolor, Esdras al pedir dirección y protección, Ester ante el peligro, Nínive en arrepentimiento y Daniel en un ayuno parcial. Algunos ayunos fueron extraordinarios y no son un modelo para imitar.",
    paraLaVida: {
      texto: "El ayuno acompaña los momentos en que más necesitamos a Dios.",
      pregunta: "¿Qué situación de tu vida o de tu iglesia te mueve hoy a buscar a Dios con ayuno?",
    },
  },
  {
    id: "intercesion-3-3",
    objetivos: [
      "Describir el ayuno de Jesús en el desierto y su respuesta al tentador.",
      "Explicar cómo ayunaba la iglesia primitiva al buscar la dirección de Dios.",
      "Relacionar el ayuno con el servicio y con el envío.",
    ],
    paraEmpezar:
      "El Nuevo Testamento muestra a Jesús ayunando antes de empezar su ministerio, y a la iglesia ayunando cuando necesitaba la dirección de Dios.",
    bloques: [
      { t: "versiculo", ref: "Mateo 4:1-4" },
      {
        t: "parrafo",
        texto:
          "Jesús «fue llevado por el Espíritu al desierto», y allí, «después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre». Cuando el tentador le propuso convertir las piedras en pan, Jesús respondió con la Escritura.",
      },
      { t: "versiculo", ref: "Deuteronomio 8:3" },
      {
        t: "parrafo",
        texto:
          "Citó Deuteronomio: «no sólo de pan vivirá el hombre, mas de todo lo que sale de la boca de Jehová vivirá el hombre». Esa es la lección más profunda del ayuno: nuestra vida depende de Dios y de su Palabra más que del pan.",
      },
      { t: "versiculo", ref: "Lucas 2:37" },
      {
        t: "parrafo",
        texto:
          "Antes aún, Ana, una mujer de edad avanzada, servía a Dios en el templo «de noche y de día con ayunos y oraciones». El ayuno puede ser parte de una vida entera dedicada a Dios.",
      },
      { t: "subtitulo", texto: "La iglesia ayuna" },
      { t: "versiculo", ref: "Hechos 13:2-3" },
      {
        t: "parrafo",
        texto:
          "En Antioquía, la iglesia ayunaba mientras servía al Señor: «Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Y antes de enviarlos, volvieron a ayunar: «habiendo ayunado y orado, les impusieron las manos y los despidieron».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 14:23" },
      {
        t: "parrafo",
        texto:
          "Al establecer líderes en las iglesias nuevas, hicieron lo mismo: «y habiendo orado con ayunos, los encomendaron al Señor en quien habían creído». Las decisiones importantes se tomaban buscando a Dios con ayuno.",
      },
      { t: "versiculo", ref: "2 Corintios 11:27" },
      {
        t: "parrafo",
        texto: "Pablo, entre sus trabajos por el evangelio, menciona «muchos ayunos». El ayuno era parte de la vida de los que servían.",
      },
      {
        t: "lista",
        items: [
          "Jesús ayunó guiado por el Espíritu, antes de su ministerio.",
          "Respondió al tentador: no sólo de pan vivirá el hombre.",
          "Ana servía con ayunos y oraciones.",
          "La iglesia de Antioquía ayunaba al servir y al enviar.",
          "Se ayunaba al encomendar a los líderes al Señor.",
        ],
      },
    ],
    ideaClave:
      "Jesús ayunó cuarenta días guiado por el Espíritu y venció al tentador con la Palabra: no sólo de pan vivirá el hombre. La iglesia primitiva ayunaba mientras servía al Señor, al recibir la dirección del Espíritu, al enviar a los misioneros y al encomendar a sus líderes.",
    paraLaVida: {
      texto: "Las decisiones importantes merecen tiempo de oración y ayuno.",
      pregunta: "¿Qué decisión de tu vida o de tu ministerio quieres poner delante de Dios con ayuno?",
    },
  },
  {
    id: "intercesion-3-4",
    objetivos: [
      "Explicar por qué Dios rechazó el ayuno de Israel en Isaías 58.",
      "Describir el ayuno que Dios escogió: justicia y misericordia.",
      "Evaluar el propio ayuno a la luz de Isaías 58.",
    ],
    paraEmpezar: "Israel ayunaba y se quejaba de que Dios no le hacía caso. La respuesta de Dios es una de las páginas más fuertes de la Biblia.",
    bloques: [
      { t: "versiculo", ref: "Isaías 58:3-7" },
      {
        t: "parrafo",
        texto:
          "El pueblo pregunta: «¿Por qué, dicen, ayunamos, y no hiciste caso?». Y Dios responde con lo que veía: «en el día de vuestro ayuno buscáis vuestro propio gusto, y oprimís a todos vuestros trabajadores». Ayunaban, pero seguían en contiendas y en injusticia.",
      },
      { t: "subtitulo", texto: "El ayuno que Dios escogió" },
      {
        t: "parrafo",
        texto:
          "Dios no rechaza el ayuno: rechaza el ayuno vacío. Y dice cuál es el que él escogió: «desatar las ligaduras de impiedad, soltar las cargas de opresión, y dejar ir libres a los quebrantados, y que rompáis todo yugo». Es el versículo de memoria de esta materia. Y sigue: «que partas tu pan con el hambriento, y a los pobres errantes albergues en casa».",
      },
      { t: "versiculo", ref: "Isaías 58:8-9" },
      {
        t: "parrafo",
        texto: "A ese ayuno Dios le hace promesas: «Entonces invocarás, y te oirá Jehová; clamarás, y dirá él: Heme aquí».",
      },
      { t: "versiculo", ref: "Zacarías 7:5" },
      {
        t: "parrafo",
        texto:
          "Por el profeta Zacarías, Dios hace una pregunta que todo el que ayuna debe escuchar: «¿habéis ayunado para mí?». El ayuno puede volverse una costumbre religiosa sin Dios en el centro.",
      },
      { t: "versiculo", ref: "Lucas 18:11-12" },
      {
        t: "parrafo",
        texto:
          "Jesús contó de un fariseo que se presentaba ante Dios con su lista de méritos: «ayuno dos veces a la semana, doy diezmos de todo lo que gano». Ayunaba, pero con orgullo, comparándose con los demás. Ese ayuno no lo acercó a Dios.",
      },
      {
        t: "lista",
        items: [
          "Dios rechaza el ayuno que convive con la injusticia.",
          "El ayuno que él escogió va unido a la justicia y a la misericordia.",
          "Se ayuna para Dios, no por costumbre.",
          "No se ayuna para sentirse mejor que otros.",
          "A ese ayuno, Dios promete: invocarás, y te oirá Jehová.",
        ],
      },
    ],
    ideaClave:
      "Dios no rechaza el ayuno, sino el ayuno vacío: el que busca el propio gusto, oprime al trabajador o se llena de orgullo. El ayuno que él escogió desata las ligaduras de impiedad, suelta las cargas de opresión y parte el pan con el hambriento. A ese ayuno, Dios promete: invocarás, y te oirá Jehová.",
    paraLaVida: {
      texto: "Un ayuno sin misericordia es solo hambre.",
      pregunta: "¿Qué acto de justicia o de misericordia podría acompañar tu próximo ayuno?",
    },
  },
  {
    id: "intercesion-3-5",
    objetivos: [
      "Describir las clases de ayuno que aparecen en la Biblia.",
      "Aplicar pasos prácticos para un ayuno con propósito.",
      "Reconocer cuándo hay que cuidar la salud y consultar al médico.",
    ],
    paraEmpezar: "Saber que el ayuno es bíblico no basta: hay que saber hacerlo con sabiduría, sin dañar el cuerpo que Dios nos dio.",
    bloques: [
      { t: "subtitulo", texto: "Clases de ayuno" },
      {
        t: "lista",
        items: [
          "Ayuno normal: dejar de comer por un tiempo, bebiendo agua.",
          "Ayuno parcial: dejar ciertos alimentos, como Daniel.",
          "Ayuno sin agua: excepcional y breve, como el de Ester; puede ser peligroso.",
          "Ayuno personal: entre el creyente y Dios, en secreto.",
          "Ayuno congregacional: cuando la iglesia lo proclama.",
        ],
      },
      { t: "versiculo", ref: "Joel 2:15" },
      {
        t: "parrafo",
        texto:
          "Hay ayunos de toda la congregación: «Tocad trompeta en Sion, proclamad ayuno, convocad asamblea». En la iglesia, el ayuno de todos se proclama con sabiduría pastoral, y cada uno participa según su salud.",
      },
      { t: "versiculo", ref: "Mateo 6:17-18" },
      {
        t: "parrafo",
        texto:
          "Y hay ayunos personales, que no se anuncian: «Pero tú, cuando ayunes, unge tu cabeza y lava tu rostro, para no mostrar a los hombres que ayunas».",
      },
      { t: "subtitulo", texto: "Pasos para un ayuno con propósito" },
      {
        t: "lista",
        items: [
          "Define el propósito: por qué vas a ayunar y por quién vas a orar.",
          "Empieza con poco: una comida o un día, antes de ayunos más largos.",
          "Usa el tiempo de las comidas para orar y leer la Biblia.",
          "Bebe agua durante el ayuno.",
          "Termina con una comida liviana.",
          "Anota lo que Dios te muestra.",
        ],
      },
      {
        t: "nota",
        titulo: "Cuidar la salud",
        texto:
          "El ayuno no es igual para todos. Quien tenga diabetes u otra enfermedad, tome medicinas, esté embarazada o amamantando, tenga o haya tenido un trastorno de la alimentación, sea una persona mayor o sea menor de edad, debe consultar a su médico antes de ayunar, y puede buscar otra forma, como un ayuno parcial. Si durante el ayuno hay mareo fuerte, dolor o confusión, hay que suspenderlo y buscar ayuda.",
      },
      { t: "versiculo", ref: "1 Corintios 6:19-20" },
      {
        t: "parrafo",
        texto:
          "El cuerpo es de Dios: «vuestro cuerpo es templo del Espíritu Santo». Ayunar con sabiduría es también una manera de honrarlo: «glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu».",
      },
      {
        t: "parrafo",
        texto:
          "Algunos creyentes se abstienen también de otras cosas por un tiempo, como las redes sociales o la televisión, para dar ese tiempo a Dios. Es una práctica útil, aunque en la Biblia el ayuno es dejar el alimento.",
      },
    ],
    ideaClave:
      "En la Biblia hay ayunos normales, parciales y, de forma excepcional, sin agua; personales en secreto y de toda la congregación. Un buen ayuno tiene un propósito, empieza con poco, llena con oración y Palabra el tiempo de las comidas y cuida la salud: quien tenga una enfermedad o tome medicinas consulta a su médico, porque el cuerpo es templo del Espíritu Santo.",
    paraLaVida: {
      texto: "Ayunar con sabiduría también honra a Dios.",
      pregunta: "¿Qué propósito y qué forma de ayuno puedes planear esta semana, cuidando tu salud?",
    },
  },
  {
    id: "intercesion-3-6",
    objetivos: [
      "Reconocer los peligros del ayuno: buscar ser visto, ganar méritos o presionar a Dios.",
      "Explicar por qué la dureza con el cuerpo no vence por sí sola a la carne.",
      "Describir los frutos del ayuno: humildad, dependencia, dirección y compasión.",
    ],
    paraEmpezar: "Como toda práctica espiritual, el ayuno puede torcerse. Conocer sus peligros ayuda a recibir sus frutos.",
    bloques: [
      { t: "subtitulo", texto: "Los peligros" },
      { t: "versiculo", ref: "Mateo 6:16" },
      {
        t: "parrafo",
        texto:
          "El primer peligro es ayunar para que nos vean. De los hipócritas que mostraban su ayuno, Jesús dijo: «de cierto os digo que ya tienen su recompensa». Si lo que se busca es el aplauso, el aplauso es todo lo que se recibe.",
      },
      {
        t: "parrafo",
        texto:
          "El segundo es pensar que el ayuno gana méritos o que obliga a Dios, como una huelga de hambre. Con el ayuno no compramos nada: la gracia de Dios es un regalo. Ayunamos para humillarnos y buscarlo, no para presionarlo.",
      },
      { t: "versiculo", ref: "Colosenses 2:23" },
      {
        t: "parrafo",
        texto:
          "El tercero es creer que la dureza con el cuerpo nos hace santos. Pablo advierte que las reglas de «duro trato del cuerpo» tienen fama de sabiduría, «pero no tienen valor alguno contra los apetitos de la carne». El ayuno no reemplaza la obra del Espíritu ni la obediencia.",
      },
      { t: "subtitulo", texto: "Los frutos" },
      { t: "versiculo", ref: "Salmos 35:13" },
      {
        t: "parrafo",
        texto:
          "El salmista dice: «Afligí con ayuno mi alma». El ayuno nos humilla delante de Dios. Y él lo hizo «cuando ellos enfermaron»: el ayuno también es intercesión por otros.",
      },
      { t: "versiculo", ref: "1 Reyes 21:27-29" },
      {
        t: "parrafo",
        texto:
          "Aun el rey Acab, cuando se humilló con ayuno, recibió una respuesta. Dios le dijo a Elías: «¿No has visto cómo Acab se ha humillado delante de mí?». Dios mira al que se humilla.",
      },
      {
        t: "lista",
        items: [
          "Humildad delante de Dios.",
          "Dependencia: no sólo de pan vivirá el hombre.",
          "Más hambre de oración y de la Palabra.",
          "Dirección para las decisiones, como en Antioquía.",
          "Compasión por otros, cuando va unido a la misericordia.",
        ],
      },
    ],
    ideaClave:
      "El ayuno se tuerce cuando se hace para ser visto, para ganar méritos o presionar a Dios, o cuando se cree que la dureza con el cuerpo vence a la carne. Bien vivido, da frutos: humildad delante de Dios, dependencia de él, más hambre de oración y de su Palabra, dirección y compasión por otros. Dios mira al que se humilla.",
    paraLaVida: {
      texto: "El fruto del ayuno no se mide en kilos, sino en humildad.",
      pregunta: "¿Cuál de los peligros del ayuno necesitas cuidar más?",
    },
  },
];
