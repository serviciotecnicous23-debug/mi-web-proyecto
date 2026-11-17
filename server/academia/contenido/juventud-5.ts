/**
 * Especialidad Juventud · Materia 5 — Evangelismo entre jóvenes (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts). De Mateo 5:16 no se cita el
 * final, porque la RV1960 de la web trae una errata en ese tramo.
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: por qué alcanzar a los jóvenes, el evangelio
 * claro y el testimonio, la amistad y las conversaciones sobre la fe, la luz en la escuela y en las redes (con la Ley de
 * Igualdad de Acceso de 1984, comprobada), los eventos y el seguimiento, y las dudas, el rechazo y la perseverancia.
 */
import type { LeccionContenido } from "../tipos";

export const JUVENTUD_5: LeccionContenido[] = [
  {
    id: "juventud-5-1",
    objetivos: [
      "Explicar por qué la iglesia debe alcanzar a los jóvenes que no conocen a Cristo.",
      "Describir cómo los amigos llevan a los amigos a Jesús.",
      "Adaptar la manera de compartir la fe sin cambiar el mensaje.",
    ],
    paraEmpezar:
      "Muchos jóvenes nunca entrarían solos a una iglesia, pero sí escucharían a un amigo. Por eso los jóvenes creyentes son los mejores misioneros entre sus compañeros.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 10:14" },
      {
        t: "parrafo",
        texto:
          "Pablo hace una pregunta que sigue vigente: «¿Y cómo creerán en aquel de quien no han oído? ¿Y cómo oirán sin haber quien les predique?». Los jóvenes que no conocen a Cristo necesitan que alguien les hable de él.",
      },
      { t: "versiculo", ref: "Juan 1:40-42" },
      {
        t: "parrafo",
        texto:
          "Andrés conoció a Jesús e hizo lo primero que le salió: «Este halló primero a su hermano Simón, y le dijo: Hemos hallado al Mesías». Y «le trajo a Jesús». Así empieza muchas veces el evangelismo: uno que encontró a Cristo trae a otro.",
      },
      { t: "versiculo", ref: "1 Corintios 9:22" },
      {
        t: "parrafo",
        texto:
          "Pablo se acercaba a cada persona donde estaba: «a todos me he hecho de todo, para que de todos modos salve a algunos». Cambiaba la manera, no el mensaje.",
      },
      { t: "subtitulo", texto: "Lo que cambia y lo que no cambia" },
      {
        t: "lista",
        items: [
          "Cambia: el lenguaje, los ejemplos, los lugares y los medios, como la cancha, la escuela o las redes.",
          "No cambia: el evangelio de Jesucristo, que murió por nuestros pecados y resucitó.",
          "Cambia: la música, los juegos y la forma de las reuniones.",
          "No cambia: el llamado al arrepentimiento y a la fe.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el mapa de amigos de un joven" },
      {
        t: "lista",
        items: [
          "Paso 1, escribir: el joven anota los nombres de las personas con las que pasa más tiempo: en la casa, en la escuela, en el equipo, en el trabajo.",
          "Paso 2, elegir: marca a tres que no conocen a Cristo.",
          "Paso 3, orar: ora cada día por esos tres por su nombre.",
          "Paso 4, acercarse: busca pasar tiempo con ellos y ayudarlos cuando lo necesitan.",
          "Paso 5, hablar: cuando llegue la oportunidad, cuenta lo que Jesús hizo en su vida.",
          "Paso 6, invitar: los invita a una actividad de jóvenes o a leer juntos un evangelio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Pide a cada joven de tu grupo que haga su mapa de amigos, y oren juntos cada semana por esos nombres. Un ministerio que ora por nombres concretos empieza a ver nombres concretos llegar.",
      },
    ],
    ideaClave:
      "¿Cómo creerán en aquel de quien no han oído, si no hay quien les hable? Andrés halló primero a su hermano y lo trajo a Jesús, y Pablo se hacía de todo para salvar a algunos, cambiando la manera pero no el mensaje. Los jóvenes creyentes son los mejores misioneros entre sus compañeros: con un mapa de amigos eligen a tres, oran por ellos, se acercan, les cuentan lo que Jesús hizo y los invitan.",
    paraLaVida: {
      texto: "Uno que encontró a Cristo trae a otro.",
      pregunta: "¿Quiénes son los tres amigos por los que vas a orar cada día?",
    },
  },
  {
    id: "juventud-5-2",
    objetivos: [
      "Explicar el evangelio en cuatro partes, con palabras sencillas.",
      "Preparar un testimonio personal de dos minutos.",
      "Distinguir el evangelio de la gracia de una religión de obras.",
    ],
    paraEmpezar:
      "Muchos jóvenes cristianos aman a Jesús, pero no sabrían explicar el evangelio en dos minutos. Saberlo con claridad les da confianza para hablar cuando llegue la oportunidad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo resume lo primero que enseñaba: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día». Ese es el centro del evangelio.",
      },
      { t: "versiculo", ref: "Romanos 6:23" },
      {
        t: "parrafo",
        texto:
          "Y muestra el problema y el regalo: «Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro».",
      },
      { t: "versiculo", ref: "Efesios 2:8-9" },
      {
        t: "parrafo",
        texto:
          "La salvación no se gana: «Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe». El evangelio no es una lista de reglas para ser bueno, sino un regalo que se recibe.",
      },
      { t: "subtitulo", texto: "El evangelio en cuatro partes" },
      {
        t: "lista",
        items: [
          "Dios: nos creó y nos ama, y quiere que lo conozcamos.",
          "El problema: todos pecamos y nos apartamos de él, y el pecado trae muerte.",
          "Cristo: Jesús murió por nuestros pecados y resucitó al tercer día.",
          "La respuesta: arrepentirnos y creer en él, y recibir por gracia la vida eterna.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un testimonio de dos minutos" },
      {
        t: "lista",
        items: [
          "Parte 1, antes: cómo era tu vida sin Cristo, en una o dos frases; por ejemplo, me sentía solo y buscaba llenar ese vacío con las redes.",
          "Parte 2, el encuentro: cómo conociste a Jesús; por ejemplo, un amigo me invitó al grupo y allí entendí que Jesús murió por mí.",
          "Parte 3, después: qué cambió; por ejemplo, ahora sé que Dios me ama y tengo paz aunque haya problemas.",
          "Una pregunta para terminar: ¿alguna vez pensaste en esto? Así la conversación sigue.",
          "Lo que se evita: palabras que solo entienden los de la iglesia, detalles que exageran el pasado y un tono de superioridad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Practiquen en el grupo: cada joven escribe su testimonio en tres partes y lo cuenta a otro en dos minutos. Lo que se ensaya, se dice con más naturalidad cuando llega el momento.",
      },
    ],
    ideaClave:
      "El centro del evangelio es que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día; la paga del pecado es muerte, pero la dádiva de Dios es vida eterna, y la salvación es por gracia, por medio de la fe, no por obras. El joven puede explicarlo en cuatro partes, Dios, el problema, Cristo y la respuesta, y contar su testimonio en dos minutos: antes, el encuentro y después, con palabras sencillas y una pregunta al final.",
    paraLaVida: {
      texto: "El evangelio no es una lista de reglas: es un regalo que se recibe.",
      pregunta: "¿Podrías contar hoy tu testimonio en dos minutos?",
    },
  },
  {
    id: "juventud-5-3",
    objetivos: [
      "Explicar por qué la amistad abre la puerta al evangelio.",
      "Llevar una conversación cotidiana hacia la fe con preguntas sencillas.",
      "Mantener la amistad sin presionar ni manipular.",
    ],
    paraEmpezar:
      "Jesús fue criticado porque comía con publicanos y pecadores. Para él, la amistad con los que estaban lejos no era un riesgo: era su misión.",
    bloques: [
      { t: "versiculo", ref: "Lucas 5:29-32" },
      {
        t: "parrafo",
        texto:
          "Cuando Leví lo invitó a un banquete con sus amigos publicanos, los fariseos murmuraron: «¿Por qué coméis y bebéis con publicanos y pecadores?». Jesús respondió: «Los que están sanos no tienen necesidad de médico, sino los enfermos».",
      },
      { t: "versiculo", ref: "Proverbios 18:24" },
      {
        t: "parrafo",
        texto:
          "La amistad se cultiva: «El hombre que tiene amigos ha de mostrarse amigo; Y amigo hay más unido que un hermano». El joven que quiere ganar a sus amigos primero es un buen amigo.",
      },
      { t: "versiculo", ref: "Colosenses 4:5" },
      {
        t: "parrafo",
        texto: "Y lo hace con sabiduría: «Andad sabiamente para con los de afuera, redimiendo el tiempo».",
      },
      { t: "subtitulo", texto: "Preguntas que abren una conversación sobre la fe" },
      {
        t: "lista",
        items: [
          "¿Qué es lo que más te preocupa en estos días?",
          "¿Alguna vez has pensado de dónde venimos o para qué estamos aquí?",
          "¿Tu familia es religiosa? ¿Tú qué piensas de Dios?",
          "Si pudieras preguntarle algo a Dios, ¿qué le preguntarías?",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una conversación con un compañero de la escuela" },
      {
        t: "lista",
        items: [
          "Paso 1, la vida: el compañero cuenta que sus padres se están separando y que se siente mal.",
          "Paso 2, escuchar: el joven creyente lo escucha sin apurarse a dar consejos.",
          "Paso 3, una pregunta: ¿qué te ayuda cuando te sientes así?",
          "Paso 4, compartir: le cuenta con sencillez que a él lo ayuda saber que Dios lo ama y que puede orar.",
          "Paso 5, ofrecer: le pregunta si puede orar por él, en ese momento o durante la semana.",
          "Paso 6, seguir: le escribe unos días después para saber cómo está, y lo invita al grupo de jóvenes.",
        ],
      },
      {
        t: "nota",
        titulo: "Sin manipular",
        texto:
          "La amistad nunca es una trampa para convertir a alguien. Si el amigo no quiere hablar de Dios, se respeta y la amistad sigue. Amamos a las personas aunque no crean, porque Cristo nos amó primero.",
      },
    ],
    ideaClave:
      "Jesús comía con publicanos y pecadores, porque los enfermos necesitan médico; el que tiene amigos ha de mostrarse amigo, y el creyente anda sabiamente con los de afuera. La amistad abre la puerta al evangelio: el joven escucha, hace preguntas sencillas sobre la vida y sobre Dios, comparte con naturalidad lo que Dios hace en él, ofrece orar y sigue en contacto. Nunca manipula: si el amigo no quiere hablar de Dios, la amistad sigue.",
    paraLaVida: {
      texto: "El joven que quiere ganar a sus amigos primero es un buen amigo.",
      pregunta: "¿Qué pregunta podrías hacerle esta semana a un amigo que no conoce a Cristo?",
    },
  },
  {
    id: "juventud-5-4",
    objetivos: [
      "Explicar cómo un joven puede ser luz en la escuela.",
      "Describir los derechos de los estudiantes cristianos en las escuelas públicas de los Estados Unidos.",
      "Compartir la fe en las redes con respeto y sabiduría.",
    ],
    paraEmpezar:
      "Un joven pasa muchas horas por semana en la escuela, más que en cualquier otro lugar fuera de su casa. Ese es su campo misionero.",
    bloques: [
      { t: "versiculo", ref: "Mateo 5:14-15" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder». Y añadió que una luz no se pone debajo de un almud, sino que «alumbra a todos los que están en casa».",
      },
      { t: "versiculo", ref: "Filipenses 2:15" },
      {
        t: "parrafo",
        texto:
          "Pablo pide ser «irreprensibles y sencillos, hijos de Dios sin mancha en medio de una generación maligna y perversa, en medio de la cual resplandecéis como luminares en el mundo». La luz se ve primero en la conducta.",
      },
      { t: "versiculo", ref: "Daniel 6:10" },
      {
        t: "parrafo",
        texto:
          "Daniel no escondió su fe aunque había una ley en contra: «abiertas las ventanas de su cámara que daban hacia Jerusalén, se arrodillaba tres veces al día, y oraba». Vivió su fe con valor y con respeto.",
      },
      { t: "subtitulo", texto: "Lo que pueden hacer los estudiantes en las escuelas públicas de los Estados Unidos" },
      {
        t: "lista",
        items: [
          "Orar, leer la Biblia y hablar de su fe con sus compañeros, mientras no interrumpan las clases ni molesten a nadie.",
          "Formar un club cristiano: la Ley de Igualdad de Acceso de 1984 dice que una escuela secundaria pública que recibe fondos federales y permite clubes de estudiantes que no son parte de las clases debe permitir también clubes religiosos, con las mismas condiciones.",
          "La Corte Suprema confirmó esa ley en 1990.",
          "El club lo dirigen los estudiantes y es voluntario; se reúne en un horario que no es de clases, y un maestro puede estar presente para supervisar, sin dirigirlo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: empezar un club cristiano en la escuela" },
      {
        t: "lista",
        items: [
          "Paso 1, orar y reunir: dos o tres estudiantes creyentes oran juntos y deciden empezar.",
          "Paso 2, preguntar: averiguan en la escuela cómo se registra un club, igual que los demás.",
          "Paso 3, buscar un maestro: piden a un maestro que esté presente como supervisor.",
          "Paso 4, planear: una reunión por semana con un tiempo de oración, un pasaje corto y una conversación.",
          "Paso 5, invitar: invitan a sus compañeros con respeto, usando los mismos medios que los otros clubes.",
          "Paso 6, cuidar el testimonio: sin peleas ni burlas, y respetando a los que piensan distinto.",
        ],
      },
      { t: "subtitulo", texto: "La fe en las redes" },
      {
        t: "lista",
        items: [
          "Compartir con sencillez: un versículo, un testimonio corto o una invitación.",
          "No discutir con insultos ni responder a las provocaciones.",
          "No publicar fotos ni datos de otros sin su permiso.",
          "Ser el mismo en las redes que en la vida: los compañeros notan la diferencia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las reglas de cada escuela y de cada distrito pueden variar. Si surge un problema, que el joven hable con respeto con la escuela, junto con sus padres. Esta lección es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "Jesús llamó a los suyos la luz del mundo, que no se puede esconder, y Pablo pide resplandecer como luminares en medio de una generación perversa; Daniel oró con las ventanas abiertas aunque había una ley en contra. En las escuelas públicas de los Estados Unidos, los estudiantes pueden orar, leer la Biblia y hablar de su fe sin interrumpir las clases, y la Ley de Igualdad de Acceso de 1984 les permite formar clubes religiosos con las mismas condiciones que los demás. En las redes, el joven comparte con sencillez y respeto, y es el mismo que en la vida.",
    paraLaVida: {
      texto: "La escuela es el campo misionero del joven.",
      pregunta: "¿Hay en tu escuela, o en la de tus jóvenes, un grupo de estudiantes que ore junto?",
    },
  },
  {
    id: "juventud-5-5",
    objetivos: [
      "Planear un evento evangelístico para jóvenes paso a paso.",
      "Invitar a recibir a Cristo con claridad y sin presión.",
      "Dar seguimiento a los jóvenes que toman una decisión.",
    ],
    paraEmpezar:
      "Un evento puede abrir la puerta a muchos jóvenes que nunca vendrían a una reunión común. Pero lo que pasa después del evento importa tanto como el evento mismo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, «los que recibieron su palabra fueron bautizados». Y no terminó allí: «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». El fruto se cuida.",
      },
      { t: "versiculo", ref: "Colosenses 2:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo pide al que creyó: «de la manera que habéis recibido al Señor Jesucristo, andad en él; arraigados y sobreedificados en él». Una decisión necesita raíces.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una noche de amigos, paso a paso" },
      {
        t: "lista",
        items: [
          "Un mes antes: el equipo ora por la lista de amigos de cada joven y elige la actividad, como un torneo, una comida o un concierto.",
          "Tres semanas antes: cada joven invita en persona a sus amigos, y se piden los permisos de los padres de los menores.",
          "El día: una bienvenida cálida, la actividad, un mensaje breve y claro del evangelio y un tiempo para conversar en grupos.",
          "La invitación: se explica cómo recibir a Cristo y se invita a quien quiera a hablar con un líder, sin presión.",
          "La misma noche: cada joven que toma una decisión recibe un evangelio y conversa con un líder de su mismo sexo.",
          "Esa semana: el joven que lo invitó le escribe, y un líder lo llama para invitarlo al grupo pequeño.",
          "Las semanas siguientes: un mentor lo acompaña en los primeros pasos de la fe.",
        ],
      },
      { t: "subtitulo", texto: "Invitar sin presionar" },
      {
        t: "lista",
        items: [
          "Se explica con claridad lo que significa seguir a Cristo, también su costo.",
          "No se usa la música ni las emociones para forzar una decisión.",
          "No se cuentan manos levantadas para presumir.",
          "Se confía en que el Espíritu Santo es quien convence.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En los campamentos, muchos jóvenes toman decisiones. Antes de volver a casa, cada uno debe saber quién lo va a acompañar, y sus padres deben enterarse, para que la decisión tenga raíces.",
      },
    ],
    ideaClave:
      "En Pentecostés los que recibieron la palabra fueron bautizados y perseveraban en la doctrina, la comunión, el partimiento del pan y la oración; Pablo pide andar en Cristo, arraigados en él. Un evento evangelístico para jóvenes se prepara con oración e invitaciones personales, tiene un mensaje claro del evangelio y una invitación sin presión, y sigue con el contacto en la semana, el grupo pequeño y un mentor, porque una decisión necesita raíces.",
    paraLaVida: {
      texto: "Lo que pasa después del evento importa tanto como el evento.",
      pregunta: "¿Quién acompañaría hoy a un joven que recibe a Cristo en tu iglesia?",
    },
  },
  {
    id: "juventud-5-6",
    objetivos: [
      "Responder con paciencia a las dudas de los jóvenes.",
      "Seguir amando y orando por los que rechazan el evangelio.",
      "Perseverar en el evangelismo confiando en la obra de Dios.",
    ],
    paraEmpezar:
      "No todos los amigos dirán que sí al evangelio. Algunos dudarán, otros se burlarán y otros dirán que no. El joven que evangeliza necesita aprender a perseverar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Judas 1:22" },
      {
        t: "parrafo",
        texto: "Judas lo dice en pocas palabras: «A algunos que dudan, convencedlos». Las dudas no se desprecian: se acompañan con paciencia y con razones.",
      },
      { t: "versiculo", ref: "Juan 20:27-28" },
      {
        t: "parrafo",
        texto:
          "Jesús no rechazó a Tomás por dudar. Le dijo: «Pon aquí tu dedo, y mira mis manos», y Tomás terminó diciendo: «¡Señor mío, y Dios mío!».",
      },
      { t: "versiculo", ref: "Juan 16:8" },
      {
        t: "parrafo",
        texto:
          "No somos nosotros los que cambiamos los corazones. Jesús dijo del Espíritu Santo: «cuando él venga, convencerá al mundo de pecado, de justicia y de juicio».",
      },
      { t: "versiculo", ref: "1 Corintios 3:6" },
      {
        t: "parrafo",
        texto: "Pablo lo vivió así: «Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios». A veces uno siembra y otro cosecha.",
      },
      { t: "versiculo", ref: "Gálatas 6:9" },
      {
        t: "parrafo",
        texto: "Por eso no se rinde: «No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un amigo que dice que no" },
      {
        t: "lista",
        items: [
          "Paso 1, respetar: le agradeces que haya escuchado y no insistes ese día.",
          "Paso 2, no tomarlo como algo personal: dice que no al mensaje, no a ti.",
          "Paso 3, seguir siendo su amigo: lo sigues invitando a las cosas de siempre.",
          "Paso 4, orar: sigues orando por él cada día por su nombre.",
          "Paso 5, vivir: tu vida sigue mostrando a Cristo, sobre todo en los momentos difíciles.",
          "Paso 6, volver a invitar: más adelante, cuando haya una oportunidad, lo invitas otra vez, sin presión.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Celebra en el grupo cada conversación sobre la fe, no solo cada decisión. Así los jóvenes aprenden que sembrar también es fruto, y no se desaniman.",
      },
    ],
    ideaClave:
      "A los que dudan se los convence con paciencia, como Jesús con Tomás, que terminó diciendo Señor mío y Dios mío; el Espíritu Santo es el que convence de pecado, y Dios da el crecimiento aunque uno plante y otro riegue. El joven no se cansa de hacer bien, porque a su tiempo segará. Ante un amigo que dice que no, respeta, no lo toma como algo personal, sigue siendo su amigo, ora por él, vive su fe y lo vuelve a invitar más adelante.",
    paraLaVida: {
      texto: "Sembrar también es fruto.",
      pregunta: "¿Por qué amigo que dijo que no vas a seguir orando?",
    },
  },
];
