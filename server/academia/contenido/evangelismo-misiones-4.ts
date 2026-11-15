/**
 * Especialidad Evangelismo y misiones · Materia 4 — Misión transcultural (avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Cruzar culturas con el evangelio: la cultura, el modelo de la encarnación, el evangelio y las costumbres, la lengua del
 * corazón (la Biblia del Oso, 1569, y la revisión de Valera, 1602), el misionero y su familia, y las naciones que viven
 * en nuestra propia ciudad.
 */
import type { LeccionContenido } from "../tipos";

export const EVANGELISMO_MISIONES_4: LeccionContenido[] = [
  {
    id: "evangelismo-misiones-4-1",
    objetivos: [
      "Explicar qué es la cultura y qué significa cruzar una frontera cultural con el evangelio.",
      "Describir cómo Dios llevó a Pedro a la casa de Cornelio.",
      "Reconocer los prejuicios que frenan la misión.",
    ],
    paraEmpezar:
      "Todos vivimos dentro de una cultura: una manera de hablar, de comer, de vestir, de saludar y de ver el mundo. Llevar el evangelio a otro pueblo pide cruzar esa frontera, como le pasó a Pedro.",
    bloques: [
      { t: "versiculo", ref: "Hechos 10:34-35" },
      {
        t: "parrafo",
        texto:
          "En casa de Cornelio, un centurión romano, Pedro dijo: «En verdad comprendo que Dios no hace acepción de personas, sino que en toda nación se agrada del que le teme y hace justicia». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "Hechos 10:15" },
      {
        t: "parrafo",
        texto: "Antes de enviarlo, Dios le mostró una visión y le dijo: «Lo que Dios limpió, no lo llames tú común».",
      },
      { t: "versiculo", ref: "Hechos 10:28" },
      {
        t: "parrafo",
        texto:
          "Pedro reconoció el muro que había aprendido desde niño: «Vosotros sabéis cuán abominable es para un varón judío juntarse o acercarse a un extranjero; pero a mí me ha mostrado Dios que a ningún hombre llame común o inmundo».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "¿Qué es la cultura?" },
      {
        t: "parrafo",
        texto:
          "La cultura es la manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de entender el mundo. Tiene cosas buenas, cosas neutras y cosas que el evangelio corrige, y el misionero aprende a distinguirlas.",
      },
      {
        t: "lista",
        items: [
          "Lo que se conserva: lo bueno de cada pueblo, como la hospitalidad o el respeto a los mayores.",
          "Lo neutro: la comida, la ropa, la música o la manera de saludar.",
          "Lo que el evangelio transforma: lo que contradice la Palabra, como la idolatría o la injusticia.",
        ],
      },
      { t: "versiculo", ref: "Hechos 17:26-27" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo enseñó que Dios «de una sangre ha hecho todo el linaje de los hombres». Todos los pueblos tienen el mismo origen y la misma necesidad de Dios.",
      },
    ],
    ideaClave:
      "Cada pueblo tiene su cultura, con cosas buenas, neutras y otras que el evangelio transforma. Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles: no hace acepción de personas, y de una sangre hizo a todo el linaje de los hombres. El misionero reconoce sus prejuicios y cruza fronteras con el evangelio.",
    paraLaVida: {
      texto: "El primer muro que hay que cruzar suele estar en nuestro propio corazón.",
      pregunta: "¿Hacia qué grupo de personas tienes un prejuicio que Dios quiere quitarte?",
    },
  },
  {
    id: "evangelismo-misiones-4-2",
    objetivos: [
      "Explicar la encarnación de Cristo como modelo de la misión.",
      "Aplicar el principio de identificación de 1 Corintios 9:20.",
      "Valorar la humildad y el servicio del misionero.",
    ],
    paraEmpezar: "El mayor cruce de fronteras de la historia lo hizo Dios mismo: el Hijo de Dios se hizo hombre y vivió entre nosotros.",
    bloques: [
      { t: "versiculo", ref: "Juan 1:14" },
      {
        t: "parrafo",
        texto:
          "«Y aquel Verbo fue hecho carne, y habitó entre nosotros». Jesús no anunció la salvación desde lejos: vino, vivió en un pueblo, habló su lengua y compartió su vida.",
      },
      { t: "versiculo", ref: "Filipenses 2:5-7" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús», que «se despojó a sí mismo, tomando forma de siervo». El misionero sigue ese camino de humildad.",
      },
      { t: "versiculo", ref: "1 Corintios 9:20" },
      {
        t: "parrafo",
        texto:
          "Pablo lo aplicó a su vida: «Me he hecho a los judíos como judío, para ganar a los judíos». Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio.",
      },
      { t: "versiculo", ref: "Rut 1:16" },
      {
        t: "parrafo",
        texto:
          "Rut, una moabita, se unió al pueblo de Noemí con estas palabras: «Tu pueblo será mi pueblo, y tu Dios mi Dios». Su historia muestra lo que es abrazar de corazón a otro pueblo.",
      },
      { t: "subtitulo", texto: "Marcas de un misionero que se identifica" },
      {
        t: "lista",
        items: [
          "Vive cerca de la gente y comparte su vida.",
          "Aprende la lengua y las costumbres con paciencia.",
          "Escucha antes de enseñar y aprende de la gente.",
          "Sirve con humildad, sin sentirse superior.",
          "Ama a las personas, y no solo los proyectos.",
        ],
      },
    ],
    ideaClave:
      "La encarnación es el modelo de la misión: el Verbo se hizo carne y habitó entre nosotros, y Cristo se despojó a sí mismo tomando forma de siervo. Como Pablo, que se hizo a los judíos como judío, el misionero se identifica con la gente: vive cerca, aprende la lengua, escucha y sirve con humildad, sin pecar y sin cambiar el evangelio.",
    paraLaVida: {
      texto: "Cristo no nos amó a distancia: vino a vivir con nosotros.",
      pregunta: "¿Qué tendrías que dejar de lado para acercarte de verdad a una persona de otra cultura?",
    },
  },
  {
    id: "evangelismo-misiones-4-3",
    objetivos: [
      "Explicar cómo resolvió el concilio de Jerusalén la relación entre el evangelio y la cultura.",
      "Distinguir el evangelio de las costumbres del misionero.",
      "Evaluar qué costumbres puede conservar una iglesia nueva.",
    ],
    paraEmpezar: "Un riesgo de la misión es llevar, junto con el evangelio, las costumbres propias como si fueran parte de él.",
    bloques: [
      { t: "versiculo", ref: "Hechos 15:19-20" },
      {
        t: "parrafo",
        texto:
          "La iglesia se preguntó si los gentiles debían hacerse judíos para seguir a Cristo. Jacobo propuso «que no se inquiete a los gentiles que se convierten a Dios», y pedirles solo lo necesario.",
      },
      { t: "versiculo", ref: "Gálatas 3:28" },
      {
        t: "parrafo",
        texto:
          "En Cristo, las diferencias no separan: «Ya no hay judío ni griego», porque «todos vosotros sois uno en Cristo Jesús». Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "Tres preguntas para distinguir" },
      {
        t: "lista",
        items: [
          "¿Lo manda o lo prohíbe la Biblia? Entonces se obedece en toda cultura.",
          "¿Es solo una costumbre del misionero, como un estilo de música, de ropa o de culto? Entonces no se impone.",
          "¿Es una costumbre del pueblo que no contradice la Palabra? Entonces se puede conservar, y aun usar para adorar a Dios.",
        ],
      },
      {
        t: "nota",
        titulo: "Cuidado con los dos extremos",
        texto:
          "Uno es imponer la cultura del misionero como si fuera el evangelio. El otro es aceptar todo lo de una cultura, también lo que contradice la Palabra. La Escritura es la medida de todas las culturas.",
      },
    ],
    ideaClave:
      "El concilio de Jerusalén decidió no inquietar a los gentiles con las costumbres judías: el evangelio no exige cambiar de cultura, sino seguir a Cristo, y en él todos somos uno. Para distinguir, se pregunta si algo lo manda la Biblia, si es solo una costumbre del misionero o si es una costumbre del pueblo que no contradice la Palabra. La Escritura es la medida de todas las culturas.",
    paraLaVida: {
      texto: "El evangelio no es de ninguna cultura, y es para todas.",
      pregunta: "¿Qué costumbre de tu iglesia podrías confundir con el evangelio si fueras a otro pueblo?",
    },
  },
  {
    id: "evangelismo-misiones-4-4",
    objetivos: [
      "Explicar por qué importa anunciar el evangelio en la lengua de cada pueblo.",
      "Describir el valor de la traducción de la Biblia, con el ejemplo de la Biblia en español.",
      "Aplicar el principio de Nehemías 8:8 al comunicar el mensaje.",
    ],
    paraEmpezar:
      "Una persona puede entender un idioma aprendido, pero hay una lengua que le habla al corazón: la de su casa y de su infancia.",
    bloques: [
      { t: "versiculo", ref: "Romanos 10:17" },
      {
        t: "parrafo",
        texto: "«Así que la fe es por el oír, y el oír, por la palabra de Dios». Y para oír de verdad, hace falta entender.",
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Cuando se leyó la ley al pueblo en tiempos de Esdras, «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura». Comunicar bien es lograr que la gente entienda.",
      },
      { t: "subtitulo", texto: "La Biblia en español" },
      {
        t: "parrafo",
        texto:
          "En 1569, Casiodoro de Reina publicó la primera Biblia completa traducida al español desde los idiomas originales, conocida como la Biblia del Oso. En 1602, Cipriano de Valera publicó su revisión. De ese trabajo viene la Reina-Valera que leemos hoy. Todavía hay pueblos que no tienen la Biblia completa en su propia lengua.",
      },
      { t: "subtitulo", texto: "Comunicar el mensaje" },
      {
        t: "lista",
        items: [
          "Aprender la lengua de la gente, aunque cueste años.",
          "Usar palabras, ejemplos e historias que la gente entienda.",
          "Comprobar lo que la gente entendió, y no solo lo que se dijo.",
          "Apoyar la traducción de la Biblia y la formación de líderes que la enseñen en su lengua.",
        ],
      },
    ],
    ideaClave:
      "La fe es por el oír, y para oír hay que entender: como los que ponían el sentido para que el pueblo entendiera, el misionero comunica en la lengua del corazón. La Biblia en español nació del trabajo de Casiodoro de Reina, que la publicó en 1569, y de la revisión de Cipriano de Valera en 1602. Todavía hay pueblos que esperan la Biblia en su lengua.",
    paraLaVida: {
      texto: "Leer la Biblia en tu lengua es un regalo que costó la vida de muchos.",
      pregunta: "¿Cómo podrías explicar el evangelio con palabras que entienda alguien que nunca fue a una iglesia?",
    },
  },
  {
    id: "evangelismo-misiones-4-5",
    objetivos: [
      "Describir el llamado y la preparación del misionero.",
      "Reconocer los desafíos del choque cultural y de la vida en otro país.",
      "Proponer cómo cuidar al misionero y a su familia.",
    ],
    paraEmpezar: "Ir a otro pueblo es una aventura de fe, pero también trae cansancio, soledad y pruebas para las que hay que prepararse.",
    bloques: [
      { t: "versiculo", ref: "Hechos 16:9-10" },
      {
        t: "parrafo",
        texto:
          "Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos», y su equipo partió «dando por cierto que Dios nos llamaba para que les anunciásemos el evangelio». La misión empieza con el llamado de Dios, confirmado por el equipo.",
      },
      { t: "versiculo", ref: "2 Corintios 11:26-27" },
      {
        t: "parrafo",
        texto: "Pablo no ocultó lo que costaba: «en trabajo y fatiga, en muchos desvelos, en hambre y sed». El misionero necesita saber que habrá pruebas.",
      },
      { t: "subtitulo", texto: "El choque cultural" },
      {
        t: "parrafo",
        texto:
          "Al llegar a otra cultura, muchos misioneros pasan por un tiempo de desconcierto: al principio todo parece nuevo y atractivo; después llegan el cansancio, la frustración y la nostalgia; y con el tiempo viene la adaptación. Ese proceso se llama choque cultural, y es normal.",
      },
      { t: "subtitulo", texto: "Cuidar al misionero" },
      {
        t: "lista",
        items: [
          "Prepararse antes de ir: la Palabra, la lengua, la cultura y la salud.",
          "Ir enviado por una iglesia, y no solo.",
          "Cuidar al cónyuge y a los hijos, que también cruzan la frontera.",
          "Tener descanso, alguien a quien rendir cuentas y comunicación con la iglesia.",
          "Volver también es parte del camino: la iglesia recibe y acompaña al misionero cuando regresa.",
        ],
      },
    ],
    ideaClave:
      "La misión empieza con el llamado de Dios, como la visión de Macedonia, confirmado por el equipo y la iglesia. Pablo no ocultó el costo: trabajo, fatiga, desvelos, hambre y sed. El choque cultural es normal y se supera con el tiempo. El misionero se prepara, va enviado, cuida a su familia, descansa, rinde cuentas y es recibido por su iglesia al volver.",
    paraLaVida: {
      texto: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba.",
      pregunta: "¿Qué misionero conoces, y cómo podrías cuidarlo a él o a su familia este mes?",
    },
  },
  {
    id: "evangelismo-misiones-4-6",
    objetivos: [
      "Explicar el mandato bíblico de amar al extranjero.",
      "Reconocer a los inmigrantes de la ciudad como un campo misionero.",
      "Planificar cómo una iglesia puede alcanzar a otra cultura en su propia ciudad.",
    ],
    paraEmpezar: "No hace falta tomar un avión para hacer misión transcultural: en muchas ciudades viven personas de muchos países y lenguas.",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 10:18-19" },
      {
        t: "parrafo",
        texto:
          "Dios «ama también al extranjero dándole pan y vestido», y mandó a Israel: «Amaréis, pues, al extranjero; porque extranjeros fuisteis en la tierra de Egipto».",
      },
      { t: "versiculo", ref: "Mateo 25:35" },
      {
        t: "parrafo",
        texto: "Jesús enseñó que recibir al forastero es recibirlo a él: «fui forastero, y me recogisteis».",
      },
      { t: "versiculo", ref: "Jeremías 29:7" },
      {
        t: "parrafo",
        texto:
          "A los judíos que vivían lejos de su tierra, en Babilonia, Dios les dijo: «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová». El que vive en otra tierra también puede bendecir a su ciudad.",
      },
      { t: "subtitulo", texto: "Una iglesia que alcanza a otras culturas" },
      {
        t: "lista",
        items: [
          "Conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan.",
          "Servir primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias.",
          "Hacer amistad y abrir la casa.",
          "Ofrecer estudios bíblicos en su lengua, o con alguien que traduzca.",
          "Formar líderes de esa misma cultura para que la obra continúe.",
        ],
      },
      {
        t: "nota",
        titulo: "Las iglesias hispanas",
        texto:
          "Muchas iglesias hispanas de los Estados Unidos nacieron entre inmigrantes. Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas.",
      },
    ],
    ideaClave:
      "Dios ama al extranjero y mandó a su pueblo amarlo; Jesús enseñó que recibir al forastero es recibirlo a él, y a los que vivían lejos de su tierra Dios les pidió buscar la paz de su ciudad. En muchas ciudades, las naciones están a la puerta de casa: la iglesia las conoce, las sirve, hace amistad, les ofrece la Palabra en su lengua y forma líderes de su misma cultura.",
    paraLaVida: {
      texto: "Las naciones también viven en tu calle.",
      pregunta: "¿Qué familia de otro país vive cerca de ti, y qué podrías hacer para servirla?",
    },
  },
];
