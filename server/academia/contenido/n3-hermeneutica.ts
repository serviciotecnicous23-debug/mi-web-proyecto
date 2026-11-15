/**
 * Nivel 3 · Materia 1 — Hermenéutica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Se enseñan los principios que comparten los institutos bíblicos evangélicos y pentecostales: la Escritura interpreta a
 * la Escritura, el contexto, el sentido normal del texto con sus figuras, los géneros literarios, Cristo en el centro, la
 * iluminación del Espíritu junto con el estudio diligente, y la aplicación fiel. Las doctrinas en las que difieren las
 * iglesias (los últimos tiempos, los dones) no se deciden aquí: se dan solo como ejemplos de método.
 */
import type { LeccionContenido } from "../tipos";

export const N3_HERMENEUTICA: LeccionContenido[] = [
  {
    id: "n3-hermeneutica-1",
    objetivos: [
      "Definir la hermenéutica y distinguir la exégesis de la eiségesis.",
      "Explicar por qué hace falta interpretar la Biblia: las distancias de idioma, cultura, historia, geografía y género.",
      "Describir el papel del Espíritu Santo y del estudio diligente en la interpretación.",
    ],
    paraEmpezar:
      "Un alto funcionario de Etiopía volvía a su tierra leyendo al profeta Isaías en su carro. Tenía el texto en las manos, pero no lo entendía. Felipe se le acercó y le hizo la pregunta que da origen a esta materia.",
    bloques: [
      { t: "versiculo", ref: "Hechos 8:30-31" },
      {
        t: "parrafo",
        texto:
          "El etíope respondió con sinceridad: «¿Y cómo podré, si alguno no me enseñare?». Felipe, comenzando desde esa misma escritura, le anunció el evangelio de Jesús (Hechos 8:35). Leer es el primer paso; entender lo que Dios quiso decir requiere aprender a interpretar.",
      },
      { t: "subtitulo", texto: "Qué es la hermenéutica" },
      { t: "versiculo", ref: "Lucas 24:27" },
      {
        t: "parrafo",
        texto:
          "La palabra viene del verbo griego hermēneuō, que significa interpretar o explicar. Lucas usa un verbo de la misma familia cuando cuenta que Jesús, en el camino a Emaús, «les declaraba en todas las Escrituras lo que de él decían». La hermenéutica es el estudio de los principios que permiten interpretar bien un texto. Aplicada a la Biblia, nos ayuda a entender lo que Dios dijo por medio de sus autores humanos y lo que eso significa para nosotros.",
      },
      {
        t: "lista",
        items: [
          "Exégesis (del griego, sacar hacia fuera): sacar del texto el sentido que su autor quiso darle.",
          "Eiségesis (meter hacia dentro): poner en el texto lo que uno ya piensa o quiere oír.",
          "El obrero fiel practica la exégesis: deja que el texto hable y se somete a lo que dice.",
        ],
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Cuando el pueblo volvió del exilio, Esdras y los levitas leyeron la ley delante de todos: «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura». Esa es la tarea de quien enseña la Palabra: leerla bien y explicarla para que se entienda.",
      },
      { t: "subtitulo", texto: "¿Por qué hace falta interpretar?" },
      {
        t: "parrafo",
        texto:
          "La Biblia es Palabra de Dios para todos los tiempos, pero fue escrita en otros idiomas, en otras culturas y para situaciones concretas. Entre aquellos primeros lectores y nosotros hay distancias que se recorren con cuidado:",
      },
      {
        t: "lista",
        items: [
          "El idioma: el Antiguo Testamento se escribió en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego.",
          "La cultura: costumbres, oficios, monedas, comidas y formas de saludar que no son las nuestras.",
          "La historia: imperios, reyes, guerras y la situación de cada iglesia que recibió una carta.",
          "La geografía: ciudades, caminos, montes y distancias que dan sentido a los relatos.",
          "El género: no se lee igual un salmo, una ley, una parábola o una visión.",
        ],
      },
      { t: "versiculo", ref: "2 Pedro 3:15-16" },
      {
        t: "parrafo",
        texto:
          "El mismo apóstol Pedro reconoce que en las cartas de Pablo hay «algunas difíciles de entender», y advierte que «los indoctos e inconstantes tuercen» las Escrituras para su propia perdición. Interpretar mal no es un asunto menor: puede llevar a otros por un camino equivocado.",
      },
      { t: "subtitulo", texto: "El Espíritu Santo y el estudio" },
      { t: "versiculo", ref: "1 Corintios 2:14" },
      { t: "versiculo", ref: "Lucas 24:44-45" },
      {
        t: "parrafo",
        texto:
          "Interpretar no es solo una técnica. El Espíritu Santo, que inspiró las Escrituras, ilumina al creyente para que las entienda y las reciba; el hombre natural, en cambio, no puede entender las cosas del Espíritu, «porque se han de discernir espiritualmente». Así obró Jesús con sus discípulos: «les abrió el entendimiento, para que comprendiesen las Escrituras».",
      },
      {
        t: "parrafo",
        texto:
          "La iluminación del Espíritu no reemplaza el estudio ni trae un sentido nuevo que contradiga lo escrito: el Espíritu nunca se contradice. Por eso la oración y la diligencia van juntas. Pablo le pidió a Timoteo que procurara con diligencia presentarse a Dios aprobado, como obrero que usa bien la palabra de verdad. Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "nota",
        titulo: "Un sentido, muchas aplicaciones",
        texto:
          "Cada pasaje tiene el sentido que Dios y su autor humano quisieron darle, y ese sentido no cambia con el lector. Lo que cambia son las aplicaciones: un mismo texto puede consolar a uno, corregir a otro y llamar a un tercero a servir.",
      },
    ],
    ideaClave:
      "La hermenéutica es el estudio de los principios para interpretar bien la Biblia: sacar del texto su sentido (exégesis) y no meterle el nuestro (eiségesis), recorriendo con cuidado las distancias de idioma, cultura, historia, geografía y género, con oración y diligencia, guiados por el Espíritu que la inspiró.",
    paraLaVida: {
      texto: "Antes de preguntar qué significa un texto para ti, pregúntate qué quiso decir a sus primeros lectores.",
      pregunta: "¿Qué versículo has usado alguna vez sin conocer su contexto, y qué harás para estudiarlo mejor?",
    },
  },
  {
    id: "n3-hermeneutica-2",
    objetivos: [
      "Identificar los círculos del contexto: el inmediato, el del libro, el de toda la Biblia y el histórico.",
      "Interpretar Filipenses 4:13, Jeremías 29:11 y Mateo 18:20 en su contexto.",
      "Formular las preguntas del contexto histórico de un libro: autor, lectores, fecha, lugar y situación.",
    ],
    paraEmpezar:
      "Si alguien leyera una sola frase de una carta tuya, podría entender lo contrario de lo que quisiste decir. Con la Biblia pasa lo mismo: un versículo separado de su lugar puede decir lo que Dios no dijo.",
    bloques: [
      { t: "subtitulo", texto: "Los círculos del contexto" },
      {
        t: "parrafo",
        texto: "El contexto es todo lo que rodea a un texto y le da sentido. Se estudia como círculos que se van abriendo:",
      },
      {
        t: "lista",
        items: [
          "El contexto inmediato: los versículos de antes y de después, y el párrafo completo.",
          "El libro: su propósito, su estructura y su tema principal.",
          "Toda la Biblia: la historia de la salvación, que tiene su centro en Cristo.",
          "El contexto histórico y cultural: el autor, los primeros lectores, la fecha, el lugar y la situación que motivó el escrito.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VdUHlPn_gTM", titulo: "Contexto en la narrativa bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Primer ejemplo: Filipenses 4:13" },
      { t: "versiculo", ref: "Filipenses 4:11-13" },
      {
        t: "parrafo",
        texto:
          "Este versículo se cita a menudo como la promesa de lograr cualquier meta. Los versículos de antes cambian la lectura: Pablo dice que ha aprendido a contentarse, «cualquiera que sea mi situación», y que sabe «vivir humildemente, y sé tener abundancia». Además, escribe desde la prisión (Filipenses 1:13) y para agradecer una ofrenda (4:10, 18). Lo que Pablo puede «en Cristo que me fortalece» es vivir fiel y contento en la escasez y en la abundancia.",
      },
      { t: "subtitulo", texto: "Segundo ejemplo: Jeremías 29:11" },
      { t: "versiculo", ref: "Jeremías 29:10-11" },
      {
        t: "parrafo",
        texto:
          "Jeremías escribió una carta a los judíos llevados cautivos a Babilonia (Jeremías 29:1-4). Antes de la promesa, Dios les dice: «Cuando en Babilonia se cumplan los setenta años, yo os visitaré». Y antes todavía, les manda edificar casas, plantar huertos y procurar la paz de la ciudad donde vivían (29:5-7). La promesa de «pensamientos de paz, y no de mal» era real, pero no anunciaba una salida rápida: setenta años eran casi una vida entera.",
      },
      {
        t: "parrafo",
        texto:
          "El principio sigue en pie para el pueblo de Dios: él es fiel a sus propósitos de bien aun en medio de la prueba, y su tiempo no siempre es el nuestro (Romanos 8:28). Lo que el texto no dice es que a cada creyente le irá bien en todo y pronto.",
      },
      { t: "subtitulo", texto: "Tercer ejemplo: Mateo 18:20" },
      { t: "versiculo", ref: "Mateo 18:15-20" },
      {
        t: "parrafo",
        texto:
          "Esta promesa suele recordarse en las reuniones pequeñas de oración. Es verdad que el Señor está siempre con los suyos (Mateo 28:20), pero el pasaje trata algo más concreto: cómo restaurar al hermano que peca, primero a solas, después con uno o dos testigos y, por último, delante de la iglesia (18:15-17). Cuando la iglesia actúa así, de acuerdo y en el nombre de Jesús, él promete estar «en medio de ellos».",
      },
      { t: "subtitulo", texto: "Las preguntas del contexto histórico" },
      {
        t: "lista",
        items: [
          "¿Quién lo escribió y a quién?",
          "¿Cuándo y desde dónde?",
          "¿Qué situación lo motivó: un problema, una pregunta, una persecución, una celebración?",
          "¿Qué quería lograr el autor con sus primeros lectores?",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Las introducciones de una Biblia de estudio, un buen diccionario bíblico y la lectura del libro completo responden muchas de estas preguntas. En la materia Métodos de estudio bíblico se practica con esas herramientas.",
      },
      {
        t: "nota",
        titulo: "Un texto fuera de contexto es un pretexto",
        texto:
          "El dicho es conocido y sigue siendo cierto: quien saca un versículo de su lugar termina usándolo para lo que quiere. Leer el capítulo completo es el primer paso de toda buena interpretación.",
      },
    ],
    ideaClave:
      "Cada texto se entiende en su lugar: sus versículos cercanos, su libro, la Biblia entera y su situación histórica. Sacado de ahí, se le puede hacer decir a Dios lo que no dijo.",
    paraLaVida: {
      texto: "Cuando leas un versículo que te gusta, lee también el capítulo completo.",
      pregunta: "Elige un versículo que sepas de memoria: ¿qué dicen los versículos de antes y de después, y cambia en algo lo que entendías?",
    },
  },
  {
    id: "n3-hermeneutica-3",
    objetivos: [
      "Explicar por qué el contexto decide el sentido de una palabra, con el ejemplo de la palabra mundo.",
      "Reconocer metáforas, símiles, hipérboles y antropomorfismos, y leerlos como figuras.",
      "Usar el trasfondo cultural para entender mejor un pasaje, como el encuentro de Jesús con la samaritana.",
    ],
    paraEmpezar:
      "Una misma palabra puede decir cosas distintas: banco puede ser un asiento o el lugar donde se guarda el dinero, y solo la frase dice cuál es. La Biblia también usa palabras con varios sentidos, figuras del lenguaje y costumbres de su tiempo.",
    bloques: [
      { t: "subtitulo", texto: "Las palabras se entienden en su frase" },
      { t: "versiculo", ref: "Juan 3:16" },
      { t: "versiculo", ref: "1 Juan 2:15-16" },
      {
        t: "parrafo",
        texto:
          "Juan usa la palabra mundo en los dos pasajes. En Juan 3:16 es la humanidad, a la que Dios amó tanto que dio a su Hijo. En 1 Juan 2:15 es otra cosa: «No améis al mundo, ni las cosas que están en el mundo», es decir, el sistema de valores que se opone a Dios, que el apóstol describe como «los deseos de la carne, los deseos de los ojos, y la vanagloria de la vida». La misma palabra, en el mismo autor, tiene sentidos distintos: el contexto decide.",
      },
      {
        t: "parrafo",
        texto:
          "Lo mismo pasa con otras palabras. Carne puede ser el cuerpo humano, como cuando el Verbo se hizo hombre (Juan 1:14), o la naturaleza que se inclina al pecado (Gálatas 5:16-17). Para saber cómo usa un autor una palabra, se buscan sus otros usos con una concordancia y se consulta un diccionario bíblico. Y el sentido de una palabra se aprende por su uso en la frase, no por su origen: lo que significaba una raíz siglos antes no decide lo que quiere decir en el texto.",
      },
      { t: "subtitulo", texto: "Las figuras del lenguaje" },
      {
        t: "parrafo",
        texto:
          "Los autores bíblicos, como todos, hablan con imágenes. Leerlas como figuras no es quitarles fuerza: es entenderlas como su autor quiso. Estas son las más comunes:",
      },
      {
        t: "lista",
        items: [
          "Metáfora: dice que algo es otra cosa para mostrar un parecido. Jesús dijo que él es la puerta (Juan 10:9): por él se entra a la salvación.",
          "Símil: compara con la palabra como. El justo será como árbol plantado junto a corrientes de aguas (Salmos 1:3).",
          "Hipérbole: exagera a propósito para que la idea se grabe. Sacarse el ojo que hace caer (Mateo 5:29) es un llamado a cortar de raíz con el pecado, no a mutilarse.",
          "Antropomorfismo: describe a Dios con rasgos humanos o de la creación para que lo entendamos. Dios nos cubre bajo sus alas (Salmos 91:4), aunque Dios es Espíritu (Juan 4:24).",
          "Pregunta retórica: pregunta para afirmar. Si Dios es por nosotros, ¿quién contra nosotros? (Romanos 8:31).",
        ],
      },
      { t: "versiculo", ref: "Juan 10:9" },
      { t: "video", url: "https://www.youtube.com/watch?v=8rWJMJmbvwU", titulo: "La metáfora en la poesía bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "La cultura del texto" },
      { t: "versiculo", ref: "Juan 4:7-9" },
      {
        t: "parrafo",
        texto:
          "Cuando Jesús le pidió agua a la mujer de Samaria, ella se sorprendió, y el evangelista explica por qué: «judíos y samaritanos no se tratan entre sí». Había siglos de enemistad entre los dos pueblos, y además los discípulos se maravillaron de que Jesús hablara con una mujer (Juan 4:27). Conocer ese trasfondo deja ver la grandeza de lo que hizo Jesús: cruzó esas barreras para ofrecerle el agua viva.",
      },
      {
        t: "nota",
        titulo: "¿Literal o figurado?",
        texto:
          "Interpretar literalmente es leer el texto en su sentido normal, el que su autor quiso darle, y ese sentido incluye sus figuras. El error está en los extremos: leer como figura lo que el autor presenta como historia, o leer al pie de la letra lo que es claramente una imagen.",
      },
    ],
    ideaClave:
      "Las palabras toman su sentido de la frase y del contexto; las figuras se leen como figuras, y la cultura del texto ilumina su mensaje. Leer literalmente es leer como el autor quiso ser entendido.",
    paraLaVida: {
      texto: "Cuando una palabra de la Biblia te parezca clara, mira si se usa igual en otros pasajes.",
      pregunta: "¿Qué imagen o figura de la Biblia te ha ayudado a conocer mejor a Dios, y qué enseña de él?",
    },
  },
  {
    id: "n3-hermeneutica-4",
    objetivos: [
      "Nombrar los principales géneros literarios de la Biblia y sus rasgos.",
      "Leer la narrativa, la ley, la poesía y la sabiduría según su género.",
      "Explicar cómo se leen la profecía, los evangelios y sus parábolas, las epístolas y la literatura apocalíptica.",
    ],
    paraEmpezar:
      "En un periódico hay noticias, opiniones, poemas, avisos y caricaturas, y nadie los lee de la misma manera. La Biblia es una biblioteca con muchos géneros literarios, y cada uno pide ser leído según su forma.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ThYkTFw_oBc", titulo: "Los estilos literarios en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "La narrativa" },
      { t: "versiculo", ref: "2 Samuel 11:27" },
      {
        t: "parrafo",
        texto:
          "Gran parte de la Biblia cuenta hechos: los libros de Génesis a Ester, los evangelios y Hechos. Son relatos verdaderos en los que Dios es el protagonista principal. La narrativa enseña sobre todo por medio de lo que cuenta, y por eso hay que preguntar qué quiso mostrar el autor. Lo que describe no siempre lo aprueba: el pecado de David con Betsabé se cuenta con detalle, y el mismo relato concluye que «esto que David había hecho, fue desagradable ante los ojos de Jehová».",
      },
      {
        t: "parrafo",
        texto:
          "Para saber si un hecho se cuenta como ejemplo que seguir o solo como lo que pasó, se mira lo que el mismo libro repite y aprueba, y lo que enseña el resto de la Escritura. Por ejemplo, el reemplazo de Judas se hizo echando suertes (Hechos 1:26), pero después la iglesia escogió a sus servidores y a sus ancianos de otra manera (Hechos 6:3; 14:23).",
      },
      { t: "subtitulo", texto: "La ley" },
      {
        t: "parrafo",
        texto:
          "La ley de Moisés muestra la santidad de Dios y su pacto con Israel. Jesús no vino a abrogarla, sino a cumplirla (Mateo 5:17), y en él se cumplen los sacrificios y las leyes del culto (Hebreos 10:1-14). Al leer una ley se busca el principio que revela el carácter de Dios. Pablo lo hizo con la orden de no ponerle bozal al buey que trilla (Deuteronomio 25:4): de ella sacó que quien trabaja en la obra del Señor debe recibir su sustento (1 Corintios 9:9-11).",
      },
      { t: "subtitulo", texto: "La poesía y la sabiduría" },
      { t: "versiculo", ref: "Salmos 19:1-2" },
      {
        t: "parrafo",
        texto:
          "Los Salmos, Job, Cantares, Lamentaciones y muchas partes de los profetas están escritos en poesía. Su rasgo principal es el paralelismo: la segunda línea repite, completa o contrasta la primera. «Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos» no habla de dos cosas distintas: dice lo mismo dos veces para que se grabe. La poesía usa imágenes y expresa emociones, y no se lee como un tratado.",
      },
      { t: "versiculo", ref: "Proverbios 26:4-5" },
      {
        t: "parrafo",
        texto:
          "Los libros de sabiduría (Proverbios, Eclesiastés y Job) enseñan a vivir en el temor de Dios. Los proverbios son principios generales, no promesas que se cumplen siempre de forma automática. Por eso dos proverbios seguidos pueden decir: «Nunca respondas al necio de acuerdo con su necedad» y «Responde al necio como merece su necedad». Los dos son sabios: el sabio discierne cuándo conviene callar y cuándo conviene responder.",
      },
      { t: "subtitulo", texto: "La profecía" },
      {
        t: "parrafo",
        texto:
          "Los profetas eran, ante todo, mensajeros del pacto: llamaban al pueblo a volver a Dios, denunciaban el pecado y la injusticia, y anunciaban juicio y esperanza. Algunas de sus profecías se cumplieron en la historia de Israel, otras en Cristo, y otras esperan su cumplimiento. Para leerlos se pregunta a quién hablaba el profeta, en qué momento de la historia y qué cumplimiento muestra el Nuevo Testamento.",
      },
      { t: "subtitulo", texto: "Los evangelios y las parábolas" },
      { t: "versiculo", ref: "Lucas 15:1-2" },
      {
        t: "parrafo",
        texto:
          "Los cuatro evangelios son cuatro retratos de Jesús, cada uno con su propósito. Las parábolas son relatos breves con los que Jesús enseñó sobre el reino; por lo general cada una tiene una idea central, o unas pocas, y no un mensaje escondido en cada detalle. Además, responden a una situación: las parábolas de la oveja, la moneda y el hijo perdidos fueron la respuesta de Jesús cuando los fariseos y los escribas murmuraban: «Este a los pecadores recibe, y con ellos come».",
      },
      { t: "subtitulo", texto: "Las epístolas" },
      {
        t: "parrafo",
        texto:
          "Las epístolas son cartas reales a iglesias o a personas con situaciones concretas: divisiones, falsas enseñanzas, preguntas, persecución. Se leen completas, como una carta, y se procura reconstruir la situación a partir del mismo texto. Su enseñanza vale para la iglesia de todos los tiempos, y se aplica mejor cuando se entiende a qué problema respondía.",
      },
      { t: "subtitulo", texto: "La literatura apocalíptica" },
      { t: "versiculo", ref: "Apocalipsis 1:20" },
      {
        t: "parrafo",
        texto:
          "Partes de Daniel y de Zacarías, y el libro de Apocalipsis, presentan visiones llenas de símbolos: bestias, números, colores, estrellas. Los símbolos no se interpretan con la imaginación. A veces el mismo texto los explica, como cuando Jesús dice que «las siete estrellas son los ángeles de las siete iglesias, y los siete candeleros que has visto, son las siete iglesias»; otras veces se entienden con el resto de la Escritura, sobre todo con el Antiguo Testamento. Su mensaje central es claro: Dios reina, y Cristo vencerá.",
      },
      {
        t: "nota",
        titulo: "Pregunta siempre por el género",
        texto:
          "Antes de interpretar un pasaje, pregunta qué clase de texto es. Muchos errores nacen de leer una poesía como un informe, un proverbio como una promesa, una parábola como una alegoría o una visión como un mapa.",
      },
    ],
    ideaClave:
      "La Biblia tiene muchos géneros literarios (narrativa, ley, poesía, sabiduría, profecía, evangelio y parábola, epístola y apocalíptica), y cada uno se lee según sus rasgos: preguntar qué clase de texto es evita muchos errores.",
    paraLaVida: {
      texto: "Esta semana, cuando leas la Biblia, fíjate en qué género estás leyendo antes de sacar conclusiones.",
      pregunta: "¿Qué género de la Biblia te cuesta más leer, y qué de esta lección te ayudará?",
    },
  },
  {
    id: "n3-hermeneutica-5",
    objetivos: [
      "Explicar las reglas sanas de interpretación: la Escritura interpreta a la Escritura, lo claro ilumina lo oscuro, Cristo en el centro y la revelación progresiva.",
      "Reconocer los errores comunes: sacar de contexto, alegorizar, edificar doctrina sobre un texto oscuro y leer con nuestras ideas.",
      "Examinar una enseñanza a la luz de la Escritura, como los creyentes de Berea.",
    ],
    paraEmpezar:
      "En el desierto, el diablo tentó a Jesús citando un salmo. Usó palabras de la Biblia, pero para torcer su sentido. Jesús no discutió con ideas propias: respondió con otra parte de la Escritura.",
    bloques: [
      { t: "versiculo", ref: "Mateo 4:5-7" },
      { t: "subtitulo", texto: "Cuatro reglas sanas" },
      {
        t: "parrafo",
        texto:
          "La primera regla es que la Escritura interpreta a la Escritura. El diablo citó el Salmo 91 para que Jesús se echara abajo desde el pináculo del templo, y Jesús le respondió: «Escrito está también: No tentarás al Señor tu Dios». Ningún texto se interpreta en contra del resto de la Biblia, porque toda ella procede del mismo Dios.",
      },
      {
        t: "parrafo",
        texto:
          "La segunda es que lo claro ilumina lo oscuro. Las doctrinas se edifican sobre los pasajes claros y repetidos de la Escritura, no sobre un versículo difícil que admite varias explicaciones. Pablo, por ejemplo, menciona a los que se bautizan por los muertos (1 Corintios 15:29), y no hay acuerdo sobre a qué práctica se refería: sería imprudente fundar una doctrina en ese versículo.",
      },
      { t: "versiculo", ref: "Lucas 24:44" },
      {
        t: "parrafo",
        texto:
          "La tercera es que Cristo es el centro de la Escritura. Jesús enseñó que era necesario que se cumpliese todo lo que estaba escrito de él «en la ley de Moisés, en los profetas y en los salmos». Toda la Biblia cuenta una sola historia de salvación, que llega a su punto más alto en la muerte y la resurrección de Jesús.",
      },
      { t: "versiculo", ref: "Hebreos 1:1-2" },
      {
        t: "parrafo",
        texto:
          "La cuarta es que la revelación es progresiva: Dios habló «muchas veces y de muchas maneras» por los profetas, y en estos postreros días nos habló por el Hijo. Lo que en el Antiguo Testamento era sombra se ve con claridad en el Nuevo. Por eso el Antiguo se lee a la luz de Cristo, y el Nuevo se entiende mejor con el Antiguo.",
      },
      { t: "subtitulo", texto: "Errores comunes" },
      {
        t: "lista",
        items: [
          "Sacar un versículo de su contexto y usarlo para lo que uno quiere.",
          "Alegorizar: buscar en cada detalle un sentido escondido que el autor no quiso dar.",
          "Edificar una doctrina o una práctica sobre un solo versículo oscuro.",
          "Leer con los lentes de nuestra cultura, de nuestras preferencias o de lo que queremos oír.",
          "Ignorar el género: tomar un proverbio como promesa, o una imagen poética como un dato.",
          "La ruleta bíblica: abrir la Biblia al azar y tomar lo primero que aparece como un mensaje de Dios.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo de alegoría" },
      { t: "versiculo", ref: "Lucas 10:36-37" },
      {
        t: "parrafo",
        texto:
          "Agustín de Hipona, uno de los grandes maestros de la iglesia antigua, explicó la parábola del buen samaritano como una alegoría: el hombre herido era Adán; Jerusalén, la ciudad celestial; los ladrones, el diablo y sus ángeles; el samaritano, Cristo; el mesón, la iglesia; y el mesonero, el apóstol Pablo. Muchas de esas verdades se enseñan en otros pasajes, pero no son lo que Jesús enseñó aquí. Jesús respondía a un intérprete de la ley que le preguntó quién es su prójimo (Lucas 10:25-29), y terminó con una orden clara: «Ve, y haz tú lo mismo».",
      },
      { t: "subtitulo", texto: "Interpretar con humildad, en comunidad" },
      { t: "versiculo", ref: "2 Pedro 1:20-21" },
      {
        t: "parrafo",
        texto:
          "Pedro enseña que la profecía de la Escritura no nació de la voluntad humana, sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo. Por eso nadie tiene derecho a darle el sentido que quiera: buscamos lo que Dios quiso decir, y lo examinamos con la iglesia, con los maestros que Dios le ha dado y con lo que los creyentes fieles han enseñado a lo largo de los siglos.",
      },
      { t: "versiculo", ref: "Hechos 17:11" },
      {
        t: "parrafo",
        texto:
          "Los creyentes de Berea son el modelo: recibieron la palabra con toda solicitud y, al mismo tiempo, iban «escudriñando cada día las Escrituras para ver si estas cosas eran así». Ni siquiera la enseñanza de Pablo quedaba fuera de ese examen. Toda predicación, todo libro y toda profecía se examinan con la Palabra.",
      },
      {
        t: "nota",
        titulo: "No basta con que esté en la Biblia",
        texto:
          "Cuando alguien te muestre un versículo para sostener algo extraño, no basta con que las palabras estén en la Biblia: también el diablo las citó. Pregunta qué dice su contexto y qué enseña el resto de la Escritura sobre el tema.",
      },
    ],
    ideaClave:
      "La Escritura interpreta a la Escritura, lo claro ilumina lo oscuro, Cristo es el centro y la revelación es progresiva. Con esas reglas, y examinando con humildad como los de Berea, se evitan errores como sacar de contexto, alegorizar o edificar doctrinas sobre un texto oscuro.",
    paraLaVida: {
      texto: "Examina con la Palabra lo que oyes y lo que lees, también lo que enseñan tus maestros.",
      pregunta: "¿Qué enseñanza has oído que convendría examinar con las Escrituras, como los de Berea?",
    },
  },
  {
    id: "n3-hermeneutica-6",
    objetivos: [
      "Distinguir el sentido original de un texto, su principio permanente y su aplicación de hoy.",
      "Distinguir entre la forma cultural de un mandato y el principio que enseña.",
      "Aplicar un pasaje a la vida con fidelidad: estudiarlo, cumplirlo y enseñarlo, como Esdras.",
    ],
    paraEmpezar:
      "Entender un pasaje no es el final del camino. Dios no dio su Palabra solo para que la expliquemos, sino para que la vivamos. ¿Cómo se pasa con fidelidad de lo que el texto significó entonces a lo que pide hoy?",
    bloques: [
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "De Esdras se dice que «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos». El orden es el camino del obrero: estudiar la Palabra, obedecerla él primero y después enseñarla a otros.",
      },
      { t: "subtitulo", texto: "Tres preguntas, un puente" },
      {
        t: "parrafo",
        texto:
          "Gordon Fee y Douglas Stuart describen dos tareas: la exégesis, que busca lo que el texto significó para sus primeros lectores, y la hermenéutica en sentido estricto, que busca lo que significa para nosotros hoy. Entre las dos, muchos maestros ven un puente: el principio que el texto enseña. El camino se resume en tres preguntas:",
      },
      {
        t: "lista",
        items: [
          "¿Qué significó para sus primeros lectores? Es el trabajo del contexto, las palabras y el género.",
          "¿Qué principio enseña que vale para todos los tiempos? Debe salir del texto y estar de acuerdo con el resto de la Escritura.",
          "¿Cómo se aplica hoy? En mi vida, en mi familia, en mi iglesia y en mi ministerio, de manera concreta.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo: la carne ofrecida a los ídolos" },
      { t: "versiculo", ref: "1 Corintios 8:9-13" },
      {
        t: "parrafo",
        texto:
          "En Corinto, mucha de la carne que se vendía en el mercado había sido ofrecida antes a los ídolos. Pablo enseña que un ídolo nada es (1 Corintios 8:4), pero algunos creyentes de conciencia débil se sentían manchados al comerla. Su consejo fue: «mirad que esta libertad vuestra no venga a ser tropezadero para los débiles». Hoy casi nadie compra carne sacrificada a los ídolos, pero el principio sigue vigente: el amor está dispuesto a renunciar a algo permitido para no hacer caer a un hermano. Un creyente puede evitar, delante de otro, una diversión o una costumbre que para ese hermano está ligada a su vida pasada.",
      },
      { t: "subtitulo", texto: "La forma cultural y el principio" },
      { t: "versiculo", ref: "Romanos 16:16" },
      {
        t: "parrafo",
        texto:
          "Algunos mandatos tienen una forma propia de su cultura. Pablo escribió: «Saludaos los unos a los otros con ósculo santo». El principio es el afecto fraternal y puro entre los creyentes; la forma puede ser un beso, un abrazo o un apretón de manos, según la costumbre de cada lugar. Para distinguir la forma del principio, se pregunta si el mandato se funda en la creación, en el carácter de Dios o en la obra de Cristo, que no cambian, o en una costumbre de aquel tiempo.",
      },
      {
        t: "nota",
        titulo: "Dos extremos que evitar",
        texto:
          "Uno es aplicarlo todo al pie de la letra sin ver la distancia cultural, y entonces obligar a lo que Dios no obliga. El otro es llamar cultural a todo lo que incomoda, y entonces desobedecer lo que Dios sí manda. La humildad, el estudio y el consejo de la iglesia guardan de los dos.",
      },
      { t: "versiculo", ref: "Santiago 1:22-25" },
      {
        t: "parrafo",
        texto:
          "La meta de toda interpretación es la obediencia. Santiago lo dice así: «sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos». Quien solo oye se parece al hombre que se mira en un espejo y luego olvida cómo era; quien persevera en la Palabra y la practica será bienaventurado en lo que hace.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jVNKGw8_bCQ", titulo: "Cartas del Nuevo Testamento: contexto histórico", fuente: "Proyecto Biblia", minutos: 6 },
    ],
    ideaClave:
      "Del texto a la vida se pasa con tres preguntas: qué significó para sus primeros lectores, qué principio permanente enseña y cómo se aplica hoy. Se distingue la forma cultural del principio, y la meta es obedecer: estudiar, cumplir y enseñar, como Esdras.",
    paraLaVida: {
      texto: "Elige el pasaje que leerás mañana y responde por escrito las tres preguntas.",
      pregunta: "¿Qué principio de la Palabra has entendido y todavía no practicas, y qué paso darás esta semana?",
    },
  },
];
