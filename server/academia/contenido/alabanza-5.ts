/**
 * Especialidad Alabanza y adoración · Materia 5 — Sonido y técnica al servicio del culto (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El técnico como servidor (Bezaleel), el sonido y la sala, los micrófonos y la consola, los monitores, el acople y el
 * volumen, la proyección, la transmisión y los derechos de autor, y la seguridad, el cuidado del equipo y el trabajo
 * en equipo. Lo técnico se explica con lo básico y general: cada sistema tiene su manual.
 */
import type { LeccionContenido } from "../tipos";

export const ALABANZA_5: LeccionContenido[] = [
  {
    id: "alabanza-5-1",
    objetivos: [
      "Explicar por qué el servicio técnico es un ministerio.",
      "Describir el ejemplo de Bezaleel.",
      "Valorar el servicio que no se ve.",
    ],
    paraEmpezar: "Nadie aplaude al que maneja el sonido cuando todo sale bien, pero todos lo notan cuando algo falla. Es un servicio escondido, y es un ministerio.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 31:2-5" },
      {
        t: "parrafo",
        texto:
          "Para construir el tabernáculo, Dios llamó a un artesano: «Mira, yo he llamado por nombre a Bezaleel», y dijo: «lo he llenado del Espíritu de Dios, en sabiduría y en inteligencia, en ciencia y en todo arte». El trabajo técnico, hecho para Dios, también es un llamado y un don.",
      },
      { t: "versiculo", ref: "Éxodo 35:35" },
      {
        t: "parrafo",
        texto: "La Biblia insiste: Dios llenó a esos artesanos «de sabiduría de corazón, para que hagan toda obra de arte y de invención». La habilidad técnica es un regalo de Dios para servir a su pueblo.",
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "parrafo",
        texto: "Pedro enseña: «Cada uno según el don que ha recibido, minístrelo a los otros». El técnico ministra a la iglesia con su don, igual que el que canta o el que predica.",
      },
      { t: "versiculo", ref: "1 Corintios 12:21-22" },
      {
        t: "parrafo",
        texto:
          "En el cuerpo de Cristo, «los miembros del cuerpo que parecen más débiles, son los más necesarios». Sin un buen sonido, la predicación no se entiende y la iglesia no puede cantar unida.",
      },
      { t: "versiculo", ref: "Colosenses 3:23" },
      {
        t: "lista",
        items: [
          "Sirve «de corazón, como para el Señor y no para los hombres».",
          "Ora por el culto, aunque esté detrás de la consola.",
          "Llega temprano y prepara con cuidado.",
          "Se mantiene atento todo el culto, también en la predicación.",
          "Aprende siempre y enseña a otros.",
        ],
      },
    ],
    ideaClave:
      "El servicio técnico es un ministerio: Dios llamó a Bezaleel y lo llenó de su Espíritu, en sabiduría y en todo arte, para el tabernáculo. Cada uno ministra a los otros con el don que recibió, y los miembros que parecen más débiles son los más necesarios. El técnico sirve de corazón, como para el Señor, aunque nadie lo vea.",
    paraLaVida: {
      texto: "Detrás de la consola también se adora.",
      pregunta: "¿Cómo puedes hacer de tu servicio técnico un acto de adoración y no solo una tarea?",
    },
  },
  {
    id: "alabanza-5-2",
    objetivos: [
      "Explicar por qué la claridad del sonido es el primer propósito del técnico.",
      "Describir de manera básica cómo viaja el sonido en una sala.",
      "Reconocer lo que ayuda y lo que estorba a que se entienda.",
    ],
    paraEmpezar: "El sonido de la iglesia tiene un propósito: que la Palabra se entienda y que el pueblo pueda cantar unido. Todo lo demás está al servicio de eso.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 14:8" },
      {
        t: "parrafo",
        texto:
          "Pablo usa una imagen sonora: «Y si la trompeta diere sonido incierto, ¿quién se preparará para la batalla?». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "1 Corintios 14:9" },
      {
        t: "parrafo",
        texto: "Y lo aplica a lo que se dice en la iglesia: si no se da «palabra bien comprensible, ¿cómo se entenderá lo que decís?». El sonido existe para que se entienda.",
      },
      { t: "versiculo", ref: "Nehemías 8:3-4" },
      {
        t: "parrafo",
        texto:
          "Cuando Esdras leyó la ley, «los oídos de todo el pueblo estaban atentos al libro de la ley», y Esdras estaba «sobre un púlpito de madera que habían hecho para ello». Prepararon un lugar alto para que todos vieran y oyeran: un cuidado técnico al servicio de la Palabra.",
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto: "Y leían «claramente, y ponían el sentido, de modo que entendiesen la lectura». La meta del técnico es la misma: que todos entiendan.",
      },
      { t: "subtitulo", texto: "Cómo viaja el sonido" },
      {
        t: "lista",
        items: [
          "El sonido sale de la fuente (la voz o el instrumento), lo capta el micrófono y la consola lo envía a los parlantes.",
          "En la sala, el sonido rebota en las paredes, el piso y el techo; si rebota demasiado, se mezcla y cuesta entender.",
          "Las superficies duras y vacías hacen más eco; las cortinas, las alfombras y la gente lo absorben.",
          "Los parlantes deben apuntar a la gente, no a las paredes ni a los micrófonos.",
          "El sonido no se oye igual en todos los lugares: hay que caminar la sala y escuchar desde varios puntos.",
        ],
      },
      {
        t: "nota",
        titulo: "Cada sistema es distinto",
        texto: "Esta materia da lo básico. Cada iglesia tiene su sala y su equipo: lean el manual de su consola y de sus parlantes, y aprendan de quien ya lo conoce.",
      },
    ],
    ideaClave:
      "El primer propósito del sonido es que se entienda: una trompeta que da sonido incierto no sirve, y sin palabra bien comprensible nadie entiende. En tiempos de Esdras prepararon un púlpito para que todos oyeran, y leían claramente para que entendieran. El técnico conoce lo básico de cómo viaja el sonido en la sala y escucha desde varios lugares.",
    paraLaVida: {
      texto: "El mejor sonido es el que nadie nota porque todo se entiende.",
      pregunta: "¿Desde qué lugar de tu iglesia nunca has escuchado cómo suena el culto?",
    },
  },
  {
    id: "alabanza-5-3",
    objetivos: [
      "Distinguir de manera básica los tipos de micrófonos y su uso.",
      "Explicar qué hacen la ganancia, la ecualización y la mezcla.",
      "Aplicar el principio de que la mezcla sirve al canto de la congregación.",
    ],
    paraEmpezar: "La consola puede asustar con tantos botones, pero sus funciones básicas son pocas, y todas sirven a una sola meta: un sonido claro y equilibrado.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 22:29" },
      {
        t: "parrafo",
        texto: "La Biblia valora el trabajo bien hecho: «¿Has visto hombre solícito en su trabajo? Delante de los reyes estará». Aprender a usar bien el equipo es parte de servir con excelencia.",
      },
      { t: "subtitulo", texto: "Los micrófonos" },
      {
        t: "lista",
        items: [
          "Dinámicos: resistentes y menos sensibles; son los más usados para las voces en la plataforma y para muchos instrumentos.",
          "De condensador: más sensibles y detallados; necesitan alimentación de la consola (la llamada alimentación fantasma) y se usan, por ejemplo, para coros o instrumentos acústicos.",
          "La distancia importa: cerca de la boca suenan más claros y captan menos ruido de la sala.",
          "Se apuntan a la fuente y lejos de los parlantes y de los monitores.",
        ],
      },
      { t: "subtitulo", texto: "La consola" },
      {
        t: "lista",
        items: [
          "Ganancia: ajusta cuánta señal entra de cada micrófono. Se ajusta primero, con la persona cantando o hablando como lo hará en el culto.",
          "Ecualización: realza o recorta graves, medios y agudos para que cada voz e instrumento suene claro, sin estorbar a los demás.",
          "Mezcla: el volumen de cada canal en relación con los otros, para que el conjunto suene equilibrado.",
          "Envíos: mandan una mezcla distinta a los monitores de la plataforma.",
        ],
      },
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto: "Pablo pide ser «obrero que no tiene de qué avergonzarse». El técnico estudia su equipo, practica y aprende de sus errores.",
      },
      {
        t: "nota",
        titulo: "La mezcla sirve a la congregación",
        texto:
          "En el culto, la mezcla no es un concierto: la voz que guía debe oírse clara, la letra debe entenderse y los instrumentos deben acompañar, no tapar. La congregación tiene que poder oírse cantar.",
      },
    ],
    ideaClave:
      "El técnico solícito aprende su equipo. Los micrófonos dinámicos son resistentes y comunes en las voces; los de condensador son más sensibles y necesitan alimentación fantasma. La ganancia se ajusta primero, la ecualización aclara cada sonido y la mezcla los equilibra. Todo sirve para que la letra se entienda y la congregación pueda cantar.",
    paraLaVida: {
      texto: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor.",
      pregunta: "¿Qué parte del equipo de tu iglesia necesitas aprender a usar mejor?",
    },
  },
  {
    id: "alabanza-5-4",
    objetivos: [
      "Explicar qué es el acople y cómo se evita.",
      "Describir el uso de los monitores en la plataforma.",
      "Evaluar el volumen adecuado pensando en toda la congregación.",
    ],
    paraEmpezar: "Un chillido agudo en medio de la oración, o una música tan fuerte que nadie oye su propia voz: dos problemas comunes que el técnico puede prevenir.",
    bloques: [
      { t: "subtitulo", texto: "El acople" },
      {
        t: "parrafo",
        texto:
          "El acople, o retroalimentación, ocurre cuando un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo que produce un pitido o un zumbido. Se previene ubicando bien micrófonos y parlantes, sin subir demasiado la ganancia y recortando con la ecualización la frecuencia que se dispara.",
      },
      {
        t: "lista",
        items: [
          "No poner los micrófonos frente a los parlantes ni demasiado cerca de los monitores.",
          "Pedir a quien habla o canta que se acerque al micrófono, en lugar de subir mucho el volumen.",
          "Bajar o silenciar los micrófonos que no se están usando.",
          "Si aparece el acople, bajar enseguida el canal o el envío que lo provoca.",
        ],
      },
      { t: "subtitulo", texto: "Los monitores" },
      {
        t: "parrafo",
        texto:
          "Los monitores son los parlantes que miran a la plataforma, para que los músicos y los cantantes se oigan. Cada uno pide lo que necesita (su voz, el teclado, el ritmo), y el técnico prepara esas mezclas. Lo justo: si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople.",
      },
      { t: "subtitulo", texto: "El volumen" },
      { t: "versiculo", ref: "Filipenses 2:4" },
      {
        t: "parrafo",
        texto:
          "El volumen se decide pensando en todos: «no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros». Hay ancianos, niños, visitas y personas con audífonos. Un volumen muy alto durante mucho tiempo puede dañar el oído, y si la música tapa a la congregación, el pueblo deja de cantar.",
      },
      { t: "versiculo", ref: "1 Corintios 13:1" },
      {
        t: "parrafo",
        texto: "Pablo dice que sin amor somos «como metal que resuena, o címbalo que retiñe». El ruido sin amor no edifica; el sonido pensado con amor por todos, sí.",
      },
    ],
    ideaClave:
      "El acople nace cuando un micrófono capta el sonido de un parlante y se forma un círculo; se previene ubicando bien micrófonos, parlantes y monitores, cuidando la ganancia y la ecualización. Los monitores ayudan a que la plataforma se oiga, en su justa medida. El volumen se decide mirando por lo de los otros: que nadie sufra y que la congregación pueda oírse cantar.",
    paraLaVida: {
      texto: "El volumen correcto es el que ayuda a cantar a la abuela y al joven.",
      pregunta: "¿A quién de tu iglesia podrías preguntar cómo le llega el sonido del culto?",
    },
  },
  {
    id: "alabanza-5-5",
    objetivos: [
      "Aplicar criterios de claridad a la proyección de letras y textos.",
      "Explicar los cuidados de una transmisión en vivo.",
      "Valorar el respeto a los derechos de autor de los cantos.",
    ],
    paraEmpezar: "Hoy el ministerio técnico también incluye las pantallas y las transmisiones: más gente puede seguir el culto, y eso trae nuevas responsabilidades.",
    bloques: [
      { t: "subtitulo", texto: "La proyección" },
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo a Habacuc: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Lo que se proyecta tiene que leerse fácil y a tiempo.",
      },
      {
        t: "lista",
        items: [
          "Letra grande, clara y con buen contraste con el fondo.",
          "Pocas líneas por pantalla y sin faltas de ortografía.",
          "Cambiar la diapositiva un poco antes de que se cante la línea.",
          "Revisar los textos bíblicos y las letras antes del culto.",
        ],
      },
      { t: "subtitulo", texto: "La transmisión" },
      {
        t: "lista",
        items: [
          "Avisar que el culto se transmite.",
          "No mostrar a niños ni a personas que no lo autorizaron, y cuidar los momentos de oración por personas y situaciones privadas.",
          "Probar la conexión, el audio y la cámara antes de empezar.",
          "Recordar que la transmisión no reemplaza la comunión de la iglesia reunida.",
        ],
      },
      { t: "subtitulo", texto: "Los derechos de autor" },
      { t: "versiculo", ref: "Romanos 13:7" },
      {
        t: "parrafo",
        texto:
          "Los cantos tienen autores, y la Biblia manda: «Pagad a todos lo que debéis: al que tributo, tributo; al que impuesto, impuesto; al que respeto, respeto; al que honra, honra». Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias. Existen licencias para iglesias, como las de CCLI; cada iglesia debe informarse y tener los permisos que le correspondan.",
      },
      {
        t: "nota",
        titulo: "Honrar al que escribe",
        texto: "Respetar los derechos de autor es honrar el trabajo de los hermanos que escriben los cantos que nos ayudan a adorar, y dar buen testimonio de integridad.",
      },
    ],
    ideaClave:
      "Lo que se proyecta se escribe claro, como en tablas, para que corra el que lee: letra grande, pocas líneas, sin faltas y a tiempo. La transmisión se avisa, cuida la privacidad de los niños y de quienes no lo autorizaron, y no reemplaza a la iglesia reunida. Y como hay que pagar a todos lo que se debe, la iglesia respeta los derechos de autor y tiene sus licencias.",
    paraLaVida: {
      texto: "La integridad también se ve en una pantalla.",
      pregunta: "¿Sabes si tu iglesia tiene los permisos para los cantos que proyecta o transmite?",
    },
  },
  {
    id: "alabanza-5-6",
    objetivos: [
      "Describir las normas básicas de seguridad del equipo técnico.",
      "Explicar el cuidado y el mantenimiento del equipo como mayordomía.",
      "Aplicar el trabajo en equipo entre los técnicos y los músicos.",
    ],
    paraEmpezar: "El equipo de sonido es una ofrenda de la iglesia, y las personas que lo usan son más valiosas que el equipo. Cuidar las dos cosas es parte del ministerio.",
    bloques: [
      { t: "subtitulo", texto: "Seguridad primero" },
      {
        t: "lista",
        items: [
          "Cables ordenados y asegurados, para que nadie tropiece.",
          "No sobrecargar los enchufes ni usar extensiones dañadas.",
          "Encender el equipo en orden y apagarlo al revés: los parlantes se encienden al final y se apagan primero.",
          "Mantener el agua y las bebidas lejos de la consola.",
          "Saber dónde están los interruptores y la salida de emergencia.",
        ],
      },
      { t: "subtitulo", texto: "Cuidar lo que es de Dios" },
      { t: "versiculo", ref: "Proverbios 27:23" },
      {
        t: "parrafo",
        texto:
          "El pastor sabio sabe cómo están sus animales: «Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños». Del mismo modo, el técnico conoce el estado de su equipo: guarda los cables enrollados sin torcerlos, limpia, revisa y lleva un inventario.",
      },
      { t: "versiculo", ref: "Lucas 16:10" },
      {
        t: "parrafo",
        texto: "Jesús enseñó: «El que es fiel en lo muy poco, también en lo más es fiel». La fidelidad se ve en lo pequeño: un cable bien guardado, una pila cambiada a tiempo.",
      },
      { t: "subtitulo", texto: "Un solo equipo" },
      {
        t: "lista",
        items: [
          "Llegar temprano para la prueba de sonido.",
          "Ponerse de acuerdo con el director en las señales: más volumen, menos, repetir o terminar.",
          "Pedir y dar indicaciones con amabilidad, nunca con gritos ni gestos de enojo.",
          "Orar juntos antes del culto: técnicos y músicos sirven al mismo Señor.",
          "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona.",
        ],
      },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "nota",
        titulo: "Decentemente y con orden",
        texto: "La regla del culto vale también detrás de la consola: «hágase todo decentemente y con orden». Un equipo técnico ordenado, que se comunica bien, sirve con paz.",
      },
    ],
    ideaClave:
      "Las personas valen más que el equipo, por eso la seguridad va primero: cables ordenados, enchufes sin sobrecargar y el encendido en orden. El equipo se cuida como mayordomía, conociendo su estado como el pastor conoce sus ovejas, con fidelidad en lo poco. Técnicos y músicos son un solo equipo: llegan temprano, se ponen de acuerdo en las señales, oran juntos y forman a otros.",
    paraLaVida: {
      texto: "Un cable bien guardado también es fidelidad.",
      pregunta: "¿Qué cuidado del equipo o de la seguridad se está descuidando en tu iglesia?",
    },
  },
];
