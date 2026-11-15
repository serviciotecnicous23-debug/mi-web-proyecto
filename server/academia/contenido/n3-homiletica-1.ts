/**
 * Nivel 3 · Materia 8 — Homilética I (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Preparar y dar una enseñanza bíblica breve (un devocional, un estudio en grupo, una clase o una predicación corta):
 * partir del texto, formular la idea central y el propósito, organizar el mensaje, ilustrarlo y aplicarlo con Cristo en
 * el centro, y hablar en público dependiendo del Espíritu. Prepara la enseñanza grabada que pide el Nivel 3. La
 * predicación expositiva con rúbrica es la materia Homilética II (Nivel 4).
 */
import type { LeccionContenido } from "../tipos";

export const N3_HOMILETICA_1: LeccionContenido[] = [
  {
    id: "n3-homiletica-1-1",
    objetivos: [
      "Explicar el encargo de predicar y enseñar la Palabra según 2 Timoteo 4:1-2.",
      "Distinguir entre proclamar el evangelio y enseñar para formar discípulos.",
      "Reconocer la responsabilidad del que enseña y la fuente de su poder.",
    ],
    paraEmpezar:
      "Al final de su vida, desde la cárcel, Pablo le dejó a Timoteo un encargo solemne, delante de Dios y de Cristo. No le pidió que fuera famoso ni elocuente: le pidió que predicara la Palabra.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 4:1-2" },
      {
        t: "parrafo",
        texto:
          "El encargo es claro: «que prediques la palabra; que instes a tiempo y fuera de tiempo». Predicar la Palabra es anunciar lo que Dios dijo, no nuestras opiniones, y hacerlo con constancia, convenga o no. Pablo añade cómo: redarguyendo, reprendiendo y exhortando, «con toda paciencia y doctrina». Es el versículo de memoria de esta materia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Proclamar y enseñar" },
      { t: "versiculo", ref: "Mateo 4:23" },
      {
        t: "parrafo",
        texto:
          "Jesús recorría Galilea «enseñando en las sinagogas de ellos, y predicando el evangelio del reino». Las dos tareas van juntas. Proclamar es anunciar la buena noticia y llamar a responder. Enseñar es explicar con orden para que los creyentes crezcan. Un devocional, un estudio en un grupo, una clase o una predicación tienen tamaños distintos, pero los mismos principios.",
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "La homilética es el arte de preparar y comunicar ese mensaje. Su modelo más antiguo está en Nehemías: los levitas leían la ley «claramente, y ponían el sentido, de modo que entendiesen la lectura». Leer bien, explicar con claridad y ayudar a entender: esa es la tarea.",
      },
      { t: "subtitulo", texto: "El poder no está en la elocuencia" },
      { t: "versiculo", ref: "1 Corintios 2:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo, un hombre muy preparado, llegó a Corinto «con debilidad, y mucho temor y temblor», y dice que su predicación no fue «con palabras persuasivas de humana sabiduría, sino con demostración del Espíritu y de poder». Prepararse bien es un deber, pero la fe de los oyentes debe apoyarse en el poder de Dios, no en el talento del que habla.",
      },
      { t: "versiculo", ref: "Romanos 10:17" },
      { t: "subtitulo", texto: "Una gran responsabilidad" },
      { t: "versiculo", ref: "Santiago 3:1" },
      {
        t: "parrafo",
        texto:
          "Santiago advierte que los maestros recibirán un juicio más estricto. Pedro pide: «Si alguno habla, hable conforme a las palabras de Dios» (1 Pedro 4:11). Quien enseña debe hacerlo con temor de Dios, fiel al texto, y vivir primero lo que enseña.",
      },
      { t: "versiculo", ref: "1 Pedro 4:11" },
      {
        t: "nota",
        titulo: "Empieza por lo pequeño",
        texto:
          "Antes de predicar ante muchos, aprende a dar bien un devocional de cinco minutos o un estudio en un grupo pequeño. Los principios son los mismos, y la fidelidad en lo poco prepara para lo mucho.",
      },
    ],
    ideaClave:
      "Predicar y enseñar es anunciar lo que Dios dijo, con constancia, paciencia y doctrina: «que prediques la palabra». Se proclama el evangelio y se enseña para formar discípulos, como Jesús. El que enseña se prepara bien, pero depende del poder del Espíritu, y tiene la responsabilidad de hablar conforme a las palabras de Dios.",
    paraLaVida: {
      texto: "Cada vez que abres la Biblia para enseñar, hablas de parte de Dios: hazlo con temor y con gozo.",
      pregunta: "¿Dónde podrías empezar a enseñar la Palabra este mes: en tu casa, en un grupo o en un devocional?",
    },
  },
  {
    id: "n3-homiletica-1-2",
    objetivos: [
      "Explicar por qué un mensaje bíblico parte del texto y no de una idea propia.",
      "Seguir los pasos para estudiar un pasaje antes de enseñarlo.",
      "Escribir en una frase lo que el autor del pasaje quiso decir a sus primeros lectores.",
    ],
    paraEmpezar:
      "Hay quien decide primero qué quiere decir y después busca un versículo que lo apoye. Así la Biblia termina diciendo lo que el predicador quería. El camino correcto es el contrario: del pasaje al mensaje.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto:
          "El obrero aprobado usa bien la palabra de verdad. Por eso el mensaje nace del texto: se escoge un pasaje completo, como un párrafo, una historia o un salmo, y se deja que él marque el tema. En Hermenéutica y en Métodos de estudio aprendiste a interpretarlo y a estudiarlo; ahora lo pones al servicio de la enseñanza.",
      },
      { t: "subtitulo", texto: "Los pasos del estudio" },
      {
        t: "lista",
        items: [
          "Escoger un pasaje completo, no un versículo suelto.",
          "Orar y leerlo varias veces, si se puede en dos versiones.",
          "Observar: quién, qué, cuándo, dónde, por qué y cómo; palabras repetidas, contrastes y conectores.",
          "Estudiar el contexto, el género y las palabras importantes.",
          "Escribir en una frase lo que el autor quiso decir a sus primeros lectores.",
          "Al final, consultar las herramientas y uno o dos comentarios.",
        ],
      },
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "Esdras preparó su corazón «para inquirir la ley de Jehová y para cumplirla, y para enseñar». El que enseña estudia el pasaje para sí mismo antes de pensar en los demás: deja que el texto le hable, lo obedece y solo entonces lo enseña.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Un ejemplo: Lucas 15:1-7" },
      { t: "versiculo", ref: "Lucas 15:1-7" },
      {
        t: "parrafo",
        texto:
          "El contexto es decisivo: los fariseos murmuraban porque Jesús recibía a los pecadores (15:1-2), y él les contó la parábola de la oveja perdida. El pastor deja las noventa y nueve, busca a la perdida y, al encontrarla, se goza. Jesús explica el sentido: «habrá más gozo en el cielo por un pecador que se arrepiente» (15:7). Lo que Jesús quiso decir es que Dios busca al pecador perdido y se goza cuando vuelve.",
      },
      {
        t: "nota",
        titulo: "Primero el texto, después las ayudas",
        texto:
          "Si empiezas leyendo un comentario o un sermón ajeno, repetirás lo que otro vio. Estudia primero el pasaje con oración; después las ayudas confirmarán, corregirán o enriquecerán lo que encontraste.",
      },
    ],
    ideaClave:
      "Un mensaje bíblico va del pasaje al mensaje: se escoge un pasaje completo, se ora, se observa, se estudia su contexto y se escribe en una frase lo que el autor quiso decir, como hizo Jesús con la oveja perdida. El que enseña lo estudia primero para sí mismo, como Esdras, y deja las ayudas para el final.",
    paraLaVida: {
      texto: "Deja que el texto te hable a ti antes de pensar en lo que dirás a otros.",
      pregunta: "¿Qué pasaje te gustaría enseñar, y qué dicen los versículos que lo rodean?",
    },
  },
  {
    id: "n3-homiletica-1-3",
    objetivos: [
      "Formular la idea central de un mensaje con su tema y su complemento.",
      "Definir el propósito de un mensaje: qué deben saber, creer y hacer los oyentes.",
      "Evaluar si una idea central es fiel al texto, clara y fácil de recordar.",
    ],
    paraEmpezar:
      "Si al salir alguien te pregunta de qué trató el mensaje y nadie sabe decirlo en una frase, al mensaje le faltó una idea central. Los buenos mensajes desarrollan una sola gran idea.",
    bloques: [
      { t: "versiculo", ref: "Hechos 2:36" },
      {
        t: "parrafo",
        texto:
          "El sermón de Pedro en Pentecostés tiene muchos versículos citados, pero una sola idea, que él mismo resume al final: «a este Jesús a quien vosotros crucificasteis, Dios le ha hecho Señor y Cristo». Todo el mensaje lleva a esa frase.",
      },
      { t: "subtitulo", texto: "La idea central" },
      {
        t: "parrafo",
        texto:
          "Haddon Robinson, en La predicación bíblica, enseña que un buen mensaje desarrolla una sola idea central, y que esa idea tiene dos partes: un tema, que responde de qué hablo, y un complemento, que responde qué digo de eso. En Lucas 15:1-7, el tema podría ser cómo trata Dios al pecador perdido, y el complemento, que lo busca y se goza cuando se arrepiente.",
      },
      {
        t: "lista",
        items: [
          "Fiel al texto: dice lo que el pasaje dice, no algo que se le añade.",
          "Clara: se entiende a la primera.",
          "Completa: es una frase entera, con su tema y su complemento.",
          "Fácil de recordar: los oyentes pueden llevársela a casa.",
        ],
      },
      { t: "subtitulo", texto: "El propósito" },
      { t: "versiculo", ref: "Hechos 2:37-38" },
      {
        t: "parrafo",
        texto:
          "Cuando la gente oyó a Pedro, preguntó: «¿qué haremos?», y él les respondió con un llamado claro. Un mensaje tiene un propósito: lo que Dios quiere que los oyentes sepan, crean y hagan después de escucharlo. Para Lucas 15, el propósito podría ser que los oyentes que están lejos vuelvan a Dios, y que la iglesia reciba con gozo a los que vuelven.",
      },
      { t: "versiculo", ref: "Isaías 55:10-11" },
      {
        t: "parrafo",
        texto:
          "Dios dice de su palabra: «no volverá a mí vacía, sino que hará lo que yo quiero». El propósito del mensaje debe coincidir con el propósito del texto: no le hacemos decir al pasaje lo que queremos, sino que buscamos que cumpla aquello para lo que Dios lo dio.",
      },
      {
        t: "nota",
        titulo: "Una idea, no tres sermones",
        texto:
          "Un error común es mezclar tres o cuatro temas en un solo mensaje. Es mejor que los oyentes recuerden bien una verdad del texto que olviden muchas. Escribe tu idea central antes de escribir cualquier otra cosa.",
      },
    ],
    ideaClave:
      "Un buen mensaje desarrolla una sola idea central, como el sermón de Pedro: con un tema (de qué hablo) y un complemento (qué digo de eso), fiel al texto, clara y fácil de recordar. Además tiene un propósito, lo que los oyentes deben saber, creer y hacer, que coincide con el propósito del pasaje.",
    paraLaVida: {
      texto: "Si no puedes decir tu mensaje en una frase, todavía no estás listo para predicarlo.",
      pregunta: "¿Cuál sería la idea central, en una sola frase, del pasaje que quieres enseñar?",
    },
  },
  {
    id: "n3-homiletica-1-4",
    objetivos: [
      "Explicar la función de la introducción, el desarrollo y la conclusión de un mensaje.",
      "Organizar un bosquejo con puntos que salen del texto y desarrollan la idea central.",
      "Analizar la estructura del discurso de Pablo en Atenas.",
    ],
    paraEmpezar:
      "Una casa sin columnas se cae, y un mensaje sin estructura se pierde. La estructura no es un adorno: es lo que permite que los oyentes sigan el camino hasta la idea central.",
    bloques: [
      { t: "subtitulo", texto: "Un ejemplo en Atenas" },
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "Pablo empezó desde la realidad de sus oyentes: había visto un altar al dios no conocido, y dijo: «Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio». Después desarrolló su mensaje: Dios es el creador, no habita en templos hechos por manos y está cerca de cada uno (Hechos 17:24-29). Y terminó con un llamado:",
      },
      { t: "versiculo", ref: "Hechos 17:30-31" },
      {
        t: "parrafo",
        texto:
          "Dios «ahora manda a todos los hombres en todo lugar, que se arrepientan», porque juzgará al mundo por el varón que resucitó de los muertos. Introducción, desarrollo y conclusión: el discurso entero lleva a un llamado claro.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia" },
      { t: "subtitulo", texto: "La introducción" },
      {
        t: "parrafo",
        texto:
          "La introducción capta la atención, presenta una necesidad o una pregunta que el texto responde y lleva al pasaje. Debe ser breve: una pregunta, una historia corta o una situación de la vida diaria que conecte con el tema.",
      },
      { t: "subtitulo", texto: "El desarrollo" },
      {
        t: "parrafo",
        texto:
          "El desarrollo tiene de dos a cuatro puntos que salen del texto y desarrollan la idea central. En cada punto se explica lo que dice el pasaje, se ilustra para que se entienda y se aplica a la vida. Entre un punto y otro, una frase de transición ayuda a los oyentes a seguir el camino.",
      },
      {
        t: "lista",
        items: [
          "Idea central (Lucas 15:1-7): Dios busca al perdido y se goza cuando vuelve.",
          "1. Dios ve el valor de uno solo: deja las noventa y nueve por una oveja (15:4).",
          "2. Dios busca hasta encontrar: el pastor va tras la perdida hasta hallarla (15:4-5).",
          "3. Dios se goza con el que vuelve: hay gozo en el cielo por un pecador que se arrepiente (15:6-7).",
        ],
      },
      { t: "subtitulo", texto: "La conclusión" },
      {
        t: "parrafo",
        texto:
          "La conclusión repite la idea central con otras palabras, llama a responder de manera concreta y termina a tiempo. No es el momento de abrir un tema nuevo, sino de llevar a los oyentes ante Dios con lo que han oído.",
      },
      {
        t: "nota",
        titulo: "El bosquejo en una página",
        texto:
          "Escribe tu bosquejo en una sola página: la idea central arriba, la introducción, los puntos con su versículo, su ilustración y su aplicación, y la conclusión. Si no cabe en una página, probablemente tiene demasiado.",
      },
    ],
    ideaClave:
      "Un mensaje tiene introducción, desarrollo y conclusión, como el discurso de Pablo en Atenas: la introducción capta la atención y lleva al texto; el desarrollo tiene de dos a cuatro puntos que salen del pasaje, se explican, se ilustran y se aplican; y la conclusión repite la idea central y llama a responder.",
    paraLaVida: {
      texto: "Un buen bosquejo ayuda a los oyentes a seguir el camino y a ti a no perderte.",
      pregunta: "¿Qué dos o tres puntos salen del pasaje que vas a enseñar?",
    },
  },
  {
    id: "n3-homiletica-1-5",
    objetivos: [
      "Usar ilustraciones que aclaren el texto con verdad y respeto.",
      "Formular aplicaciones concretas que salen del propósito del pasaje.",
      "Mantener a Cristo en el centro del mensaje sin forzar el texto.",
    ],
    paraEmpezar:
      "Jesús hablaba de semillas, ovejas, monedas, panes, lámparas y redes. La gente sencilla lo entendía y lo recordaba, y las grandes verdades del reino se volvían cercanas.",
    bloques: [
      { t: "versiculo", ref: "Mateo 13:34" },
      { t: "subtitulo", texto: "Ilustrar" },
      {
        t: "parrafo",
        texto:
          "Mateo cuenta que Jesús «sin parábolas no les hablaba». Una ilustración hace visible una verdad: puede ser una historia de la Biblia, una escena de la vida diaria, un hecho de la historia o un testimonio. La buena ilustración sirve al texto: lo aclara, no lo reemplaza ni se roba la atención.",
      },
      {
        t: "lista",
        items: [
          "Que sea verdadera: nunca se inventa una historia y se cuenta como si hubiera pasado.",
          "Que respete a las personas: no se expone la vida de nadie sin su permiso ni se burla de nadie.",
          "Que sea breve y clara, y lleve de vuelta al texto.",
          "Que se diga de dónde viene, si es de un libro o de otro predicador.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", titulo: "Parábolas de Jesús", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Aplicar" },
      { t: "versiculo", ref: "Santiago 1:22" },
      {
        t: "parrafo",
        texto:
          "La meta no es que los oyentes sepan más, sino que sean «hacedores de la palabra». La aplicación sale del propósito del pasaje y es concreta: dice qué hacer, con quién y cuándo. Conviene pensar en los distintos oyentes: el joven, el adulto, el nuevo creyente, el que sufre.",
      },
      {
        t: "parrafo",
        texto:
          "Aplicar no es dar una lista de reglas para portarse bien. El cambio verdadero viene de la gracia de Dios y del poder del Espíritu: por eso la aplicación lleva a confiar en Cristo, no solo a esforzarse más.",
      },
      { t: "subtitulo", texto: "Cristo en el centro" },
      { t: "versiculo", ref: "Lucas 24:27" },
      {
        t: "parrafo",
        texto:
          "Jesús les declaraba en todas las Escrituras lo que de él decían. Un mensaje cristiano muestra cómo el pasaje se relaciona con la persona y la obra de Cristo, sin inventar alegorías: lo que se aprendió en Hermenéutica sobre las reglas sanas vale también aquí. En Lucas 15, por ejemplo, Jesús mismo es el buen pastor que vino a buscar lo perdido (Lucas 19:10).",
      },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "nota",
        titulo: "Honestidad al enseñar",
        texto:
          "Nunca se inventan testimonios, cifras ni experiencias para impresionar. Si usas el material de otro, dilo. La verdad del mensaje se sostiene también con la honestidad del mensajero.",
      },
    ],
    ideaClave:
      "Jesús enseñaba con parábolas: las ilustraciones hacen visible la verdad si son verdaderas, respetuosas, breves y llevan al texto. La aplicación sale del propósito del pasaje, es concreta y lleva a confiar en la gracia de Cristo, y el mensaje muestra a Cristo en el centro sin forzar el texto.",
    paraLaVida: {
      texto: "Enseña para que tus oyentes sean hacedores de la palabra, no solo oidores.",
      pregunta: "¿Qué ilustración verdadera y qué aplicación concreta usarías para el pasaje que vas a enseñar?",
    },
  },
  {
    id: "n3-homiletica-1-6",
    objetivos: [
      "Aplicar principios para hablar en público con claridad: la voz, la mirada, el cuerpo y el tiempo.",
      "Enfrentar el temor a hablar confiando en la ayuda de Dios, como Moisés y Jeremías.",
      "Preparar la enseñanza grabada que pide el Nivel 3.",
    ],
    paraEmpezar:
      "Moisés le dijo a Dios que era tardo en el habla, y Jeremías, que no sabía hablar porque era un niño. Muchos de los que Dios usa para hablar empezaron sintiéndose incapaces.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 4:10-12" },
      {
        t: "parrafo",
        texto:
          "Dios no le respondió a Moisés que hablaba bien, sino que le prometió: «yo estaré con tu boca, y te enseñaré lo que hayas de hablar». A Jeremías le dijo: «He aquí he puesto mis palabras en tu boca» (Jeremías 1:9). El temor a hablar es normal; la respuesta es la preparación, la oración y la confianza en el que nos envía.",
      },
      { t: "versiculo", ref: "Jeremías 1:6-9" },
      { t: "subtitulo", texto: "La voz, la mirada y el cuerpo" },
      {
        t: "lista",
        items: [
          "Habla claro y con un volumen que todos oigan; varía el tono y usa pausas.",
          "Mira a las personas, no al piso ni solo a tus notas.",
          "Mantén una postura natural, con gestos que acompañen lo que dices.",
          "Evita las muletillas y las palabras que el oyente no entiende, o explícalas.",
          "Respeta el tiempo: un devocional corto es mejor que uno largo y disperso.",
        ],
      },
      { t: "subtitulo", texto: "Con el poder del Espíritu" },
      {
        t: "parrafo",
        texto:
          "Pablo recuerda que su palabra fue «con demostración del Espíritu y de poder» (1 Corintios 2:4). Ora mientras preparas y antes de hablar, y confía en que el Espíritu Santo lleva la Palabra al corazón. La técnica ayuda a que el mensaje se oiga; el Espíritu hace que transforme.",
      },
      { t: "versiculo", ref: "1 Corintios 2:4-5" },
      { t: "subtitulo", texto: "Tu enseñanza grabada" },
      {
        t: "parrafo",
        texto:
          "Para cerrar el Nivel 3 se pide una enseñanza grabada aprobada. Prepárala con los pasos de esta materia: escoge un pasaje, estúdialo, escribe la idea central y el propósito, arma el bosquejo, busca una ilustración y una aplicación, y enseña de diez a quince minutos. Antes de grabar:",
      },
      {
        t: "lista",
        items: [
          "Ensaya en voz alta al menos dos veces y mide el tiempo.",
          "Busca un lugar tranquilo y con buena luz, y prueba el sonido.",
          "Pide a alguien de confianza que te escuche y te diga qué mejorar.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 27:17" },
      {
        t: "nota",
        titulo: "Recibir opiniones",
        texto:
          "Hierro con hierro se aguza. Escucha con humildad lo que otros te digan de tu enseñanza: un buen maestro sigue aprendiendo toda la vida.",
      },
    ],
    ideaClave:
      "Dios prometió a Moisés estar con su boca y puso sus palabras en la boca de Jeremías: el temor a hablar se enfrenta con preparación, oración y confianza. Se habla con voz clara, mirando a las personas y respetando el tiempo, dependiendo del poder del Espíritu, y así se prepara la enseñanza grabada del Nivel 3.",
    paraLaVida: {
      texto: "El que te envía a hablar promete estar con tu boca.",
      pregunta: "¿Qué te da más temor al hablar en público, y qué paso darás para prepararte mejor?",
    },
  },
];
