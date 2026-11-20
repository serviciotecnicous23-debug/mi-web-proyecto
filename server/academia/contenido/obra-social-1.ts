/**
 * Especialidad Obra social y misericordia · Materia 1 — Teología de la compasión (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia bíblica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: el Dios que ve al necesitado,
 * la justicia para el pobre en la ley y los profetas, la compasión de Jesús, el buen samaritano, la primera iglesia y los
 * pobres, y la palabra y la obra juntas, con lo que dice el Pacto de Lausana de 1974 (artículos 5 y 6) y la distinción
 * entre alivio, rehabilitación y desarrollo de Corbett y Fikkert, comprobados.
 */
import type { LeccionContenido } from "../tipos";

export const OBRA_SOCIAL_1: LeccionContenido[] = [
  {
    id: "obra-social-1-1",
    objetivos: [
      "Explicar, con Éxodo 3:7, que Dios ve, oye y conoce el dolor de los que sufren.",
      "Reconocer a los cuatro vulnerables de la ley: el huérfano, la viuda, el extranjero y el pobre.",
      "Mirar a los necesitados de tu barrio como Dios los mira.",
    ],
    paraEmpezar:
      "La compasión no empieza en nosotros: empieza en Dios. Antes de mandar a su pueblo que ayudara al pobre, Dios se presentó como el que ve la aflicción, oye el clamor y baja a librar. Servir al necesitado es imitar el corazón de Dios.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 3:7" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo a Moisés: «Bien he visto la aflicción de mi pueblo que está en Egipto, y he oído su clamor». Dios ve, oye y conoce las angustias de los que sufren, y en el versículo siguiente dice que ha descendido para librarlos.",
      },
      { t: "versiculo", ref: "Deuteronomio 10:18" },
      {
        t: "parrafo",
        texto:
          "Dios es el que «hace justicia al huérfano y a la viuda; que ama también al extranjero dándole pan y vestido». Su amor se ve en cosas concretas: pan, vestido y justicia.",
      },
      { t: "versiculo", ref: "Salmos 146:9" },
      {
        t: "parrafo",
        texto:
          "El salmista canta: «Jehová guarda a los extranjeros; Al huérfano y a la viuda sostiene». Los que no tienen quién los defienda tienen a Dios por defensor.",
      },
      { t: "subtitulo", texto: "Lo que enseña la Biblia" },
      {
        t: "lista",
        items: [
          "Dios ve, oye y conoce el sufrimiento, y actúa para librar (Éxodo 3:7-8).",
          "La ley nombra una y otra vez a cuatro vulnerables: la viuda, el huérfano, el extranjero y el pobre (Zacarías 7:10).",
          "Dios se presenta como su defensor: les hace justicia, les da pan y vestido, los sostiene y los guarda.",
          "La pobreza no siempre es culpa del pobre: hay opresión, enfermedad, desastres y abandono; y el que oprime al pobre afrenta a su Hacedor (Proverbios 14:31).",
          "Cada persona lleva la imagen de Dios (Génesis 1:27): su dignidad no depende de lo que tiene.",
          "El pueblo que fue extranjero en Egipto debía amar al extranjero, recordando de dónde lo sacó Dios (Deuteronomio 10:19).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: mirar como el mundo y mirar como Dios" },
      {
        t: "lista",
        items: [
          "Como el mundo: ver al pobre como un problema o un número. Como Dios: verlo como una persona con nombre, hecha a su imagen.",
          "Como el mundo: pensar que cada uno tiene lo que se merece. Como Dios: saber que muchos sufren por la injusticia, la enfermedad o un desastre.",
          "Como el mundo: ayudar solo al que nos cae bien. Como Dios: amar también al extranjero y al que no puede devolver el favor.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el mapa de los que sufren en el barrio" },
      {
        t: "parrafo",
        texto:
          "Una iglesia quiere empezar a servir en su barrio, pero no sabe por dónde. El pastor le pide al grupo de misericordia que primero aprenda a ver como Dios ve.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar juntos con Éxodo 3:7, pidiendo ojos para ver la aflicción que tenemos cerca.",
          "Paso 2, caminar el barrio y anotar lo que se ve: ancianos solos, familias recién llegadas, madres solas y personas sin trabajo.",
          "Paso 3, escuchar a los vecinos, a las escuelas y a los negocios, y preguntar qué necesitan y qué tienen.",
          "Paso 4, poner nombre a las personas y no solo a los problemas: doña Carmen, que vive sola; la familia Ramírez, que acaba de llegar.",
          "Paso 5, buscar en la Biblia cómo trata Dios a cada grupo: la viuda, el huérfano, el extranjero y el pobre.",
          "Paso 6, presentar a la iglesia lo que vieron y orar por un primer paso de servicio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La compasión empieza con mirar. Antes de organizar programas, enseña a tu equipo a ver a las personas con su nombre y a escuchar su historia; así el servicio nace del corazón de Dios y no de la lástima.",
      },
      {
        t: "cuadro",
        titulo: "Los cuatro vulnerables en la ley de Dios",
        columnas: ["Quién", "Lo que mandaba la ley", "Cómo se vive hoy"],
        filas: [
          ["El huérfano", "Dejarle parte de la cosecha y no torcer su derecho (Deuteronomio 24:17-19)", "Acompañar a los niños sin padres y apoyar a las familias que los cuidan"],
          ["La viuda", "No tomar en prenda su ropa y dejarle la gavilla olvidada (Deuteronomio 24:17-19)", "Visitar y ayudar a las viudas y a las madres solas"],
          ["El extranjero", "Amarlo, porque Israel también fue extranjero en Egipto (Deuteronomio 10:19)", "Recibir con respeto y ayuda práctica a las familias que llegan de otros países"],
          ["El pobre", "Abrirle la mano y prestarle lo que necesite (Deuteronomio 15:7-8)", "Ayudar con lo que falta y caminar con él hacia un futuro mejor"],
        ],
      },
    ],
    ideaClave:
      "Dios ve la aflicción, oye el clamor y conoce las angustias de su pueblo, y baja a librar (Éxodo 3:7-8). Se presenta como el defensor del huérfano, la viuda, el extranjero y el pobre, y les da pan y vestido (Deuteronomio 10:18). Por eso la compasión de la iglesia no nace de la lástima, sino del corazón de Dios: mirar a cada persona con su nombre, como imagen de Dios, y actuar.",
    paraLaVida: {
      texto: "Le pido a Dios ojos para ver a los que sufren cerca de mí.",
      pregunta: "¿Quién en tu barrio está solo, sin trabajo o recién llegado, y todavía no lo has visto?",
    },
  },
  {
    id: "obra-social-1-2",
    objetivos: [
      "Explicar cómo la ley de Dios cuidaba al pobre con la espiga, el diezmo del tercer año y el año de remisión.",
      "Reconocer lo que los profetas, como Isaías y Amós, enseñaron sobre el culto y la justicia.",
      "Aplicar el principio de la espiga: ayudar abriendo oportunidades y no solo con regalos.",
    ],
    paraEmpezar:
      "En la ley de Moisés, la ayuda al pobre no era solo una buena idea: estaba escrita en la manera de cosechar, de prestar y de diezmar. Y cuando el pueblo se olvidó, los profetas le recordaron que el culto sin justicia no agrada a Dios.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=f984fG4-xlE", titulo: "Resumen del libro de Rut", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Levítico 19:9-10" },
      {
        t: "parrafo",
        texto:
          "El campesino no debía segar «hasta el último rincón» ni recoger «el fruto caído de tu viña; para el pobre y para el extranjero lo dejarás». El pobre trabajaba y recogía con sus manos, con dignidad: no lo recibía todo hecho.",
      },
      { t: "versiculo", ref: "Deuteronomio 15:11" },
      {
        t: "parrafo",
        texto:
          "La ley dice: «no faltarán menesterosos en medio de la tierra; por eso yo te mando, diciendo: Abrirás tu mano a tu hermano». Que siempre haya pobres no es una excusa para no ayudar: es la razón para abrir la mano.",
      },
      { t: "versiculo", ref: "Isaías 58:6-7" },
      {
        t: "parrafo",
        texto:
          "El ayuno que Dios escogió es soltar las cargas de opresión, y «que partas tu pan con el hambriento, y a los pobres errantes albergues en casa». El culto y la justicia van juntos.",
      },
      { t: "subtitulo", texto: "Cómo cuidaba la ley al pobre" },
      {
        t: "lista",
        items: [
          "La espiga: dejar los bordes del campo y lo que caía, para que el pobre y el extranjero recogieran (Levítico 19:9-10), como lo hizo Rut en el campo de Booz (Rut 2).",
          "El diezmo del tercer año, guardado en las ciudades para el levita, el extranjero, el huérfano y la viuda (Deuteronomio 14:28-29).",
          "El año de remisión: cada siete años se perdonaban las deudas entre hermanos (Deuteronomio 15:1-2).",
          "Prestar al hermano empobrecido sin cobrarle interés (Levítico 25:35-37).",
          "Pagar su jornal al trabajador pobre el mismo día (Deuteronomio 24:14-15).",
          "Los profetas denunciaron a los que oprimían al pobre y pidieron que corriera el juicio como las aguas (Amós 5:24).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el regalo y la espiga" },
      {
        t: "lista",
        items: [
          "El regalo: le doy al pobre lo que necesita hoy. La espiga: le abro una puerta para que trabaje y saque su propio pan.",
          "El regalo: hace falta en una emergencia. La espiga: ayuda a salir adelante con dignidad.",
          "El culto sin justicia: cantar y ayunar mientras se oprime al trabajador. El ayuno que Dios escogió: soltar las cargas y partir el pan con el hambriento.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la despensa y la espiga" },
      {
        t: "parrafo",
        texto:
          "Una iglesia reparte despensas cada mes, y casi siempre vienen las mismas familias. El equipo se pregunta cómo ayudar como enseña la ley: con dignidad y con futuro.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, leer Levítico 19:9-10 y Rut 2 para entender el principio de la espiga.",
          "Paso 2, seguir dando la despensa a quien la necesita, porque el hambre de hoy no espera.",
          "Paso 3, conversar con cada familia: qué sabe hacer, qué trabajo busca y qué le impide salir adelante.",
          "Paso 4, abrir espigas: una clase de inglés, una bolsa de trabajo con los negocios de los hermanos y ayuda para hacer un currículum.",
          "Paso 5, invitar a las familias que lo deseen a servir también en la despensa, como voluntarias.",
          "Paso 6, revisar cada tres meses cuántas familias consiguieron trabajo o ya no necesitan la despensa.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La ley de Dios unía la ayuda con la dignidad: el pobre recogía en el campo con sus manos. Cuando ayudes, pregúntate si estás dando un regalo, que a veces hace falta, o abriendo una espiga, que ayuda a salir adelante.",
      },
    ],
    ideaClave:
      "La ley de Dios cuidaba al pobre en la vida diaria: la espiga en los bordes del campo, el diezmo del tercer año para el extranjero, el huérfano y la viuda, el año de remisión, el préstamo sin interés y el jornal pagado a tiempo. Que siempre haya pobres es la razón para abrir la mano (Deuteronomio 15:11). Y los profetas enseñaron que el culto sin justicia no agrada a Dios: el ayuno que él escogió es partir el pan con el hambriento (Isaías 58:7).",
    paraLaVida: {
      texto: "Doy con generosidad y busco abrir puertas para que otros salgan adelante.",
      pregunta: "¿A quién podrías abrirle una espiga este mes: un trabajo, una clase o un contacto?",
    },
  },
  {
    id: "obra-social-1-3",
    objetivos: [
      "Explicar, con Mateo 9:36, qué movía a Jesús a la compasión.",
      "Reconocer en Lucas 4:18-19 la misión de Jesús con los pobres y los oprimidos.",
      "Imitar a Jesús al acercarse a una persona que sufre.",
    ],
    paraEmpezar:
      "Los evangelios repiten que Jesús tuvo compasión: de las multitudes, del leproso y de la viuda que enterraba a su hijo. Jesús no miraba de lejos: se acercaba, tocaba, daba de comer y anunciaba el reino.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=bPzhlL9zKmg", titulo: "Resumen del libro de Lucas (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Mateo 9:36" },
      {
        t: "parrafo",
        texto:
          "«Y al ver las multitudes, tuvo compasión de ellas; porque estaban desamparadas y dispersas como ovejas que no tienen pastor». Jesús vio, sintió y actuó: enseguida pidió que se orara por obreros para la mies (Mateo 9:37-38).",
      },
      { t: "versiculo", ref: "Lucas 4:18-19" },
      {
        t: "parrafo",
        texto:
          "En Nazaret, Jesús leyó al profeta Isaías: el Señor «me ha ungido para dar buenas nuevas a los pobres». Su misión tocaba a toda la persona: la buena noticia, la sanidad, la libertad y la vista.",
      },
      { t: "versiculo", ref: "Lucas 7:13" },
      {
        t: "parrafo",
        texto:
          "Ante la viuda de Naín, que enterraba a su único hijo, «cuando el Señor la vio, se compadeció de ella, y le dijo: No llores». Y le devolvió a su hijo con vida. Jesús vio el dolor de una mujer que se quedaba sola.",
      },
      { t: "subtitulo", texto: "Lo que hacía la compasión de Jesús" },
      {
        t: "lista",
        items: [
          "Veía: se fijaba en las multitudes cansadas y en la persona que todos ignoraban (Mateo 9:36).",
          "Sentía: la palabra griega que usan los evangelios para su compasión viene de una que significa las entrañas (Strong G4697); era un dolor de adentro.",
          "Se acercaba y tocaba: extendió la mano y tocó al leproso, al que nadie tocaba (Marcos 1:41).",
          "Daba de comer: tuvo compasión de la multitud, sanó a los enfermos y alimentó a cinco mil (Mateo 14:14-21).",
          "Anunciaba el reino: enseñaba, predicaba el evangelio y sanaba; la compasión no reemplazaba la Palabra (Mateo 9:35).",
          "Formaba obreros: pidió orar por obreros y envió a los doce (Mateo 9:37 a 10:1).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la lástima y la compasión" },
      {
        t: "lista",
        items: [
          "La lástima mira de lejos y dice pobrecito. La compasión se acerca y pregunta qué necesitas.",
          "La lástima da para quitarse la culpa. La compasión acompaña hasta que la persona se levanta.",
          "La lástima humilla al que recibe. La compasión lo trata como a alguien amado por Dios.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la vecina que perdió a su esposo" },
      {
        t: "parrafo",
        texto:
          "Una vecina del templo, que no es de la iglesia, enviudó hace dos semanas. Tiene tres hijos y no sabe cómo pagará la renta. Un grupo de hermanas quiere ayudarla como lo haría Jesús.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, ir a verla en persona, como Jesús se acercó a la viuda de Naín, y escucharla sin prisa.",
          "Paso 2, llorar con ella y orar si ella lo acepta, sin sermones ni explicaciones de por qué pasó.",
          "Paso 3, preguntarle qué necesita primero: comida, ayuda con los niños, los papeles o la renta.",
          "Paso 4, cubrir lo urgente con el fondo de ayuda de la iglesia, como lo decidan sus encargados.",
          "Paso 5, acompañarla en las semanas siguientes con visitas y con alguien que la ayude con los trámites.",
          "Paso 6, invitarla con amor a conocer a Jesús, sin poner como condición de la ayuda que venga a la iglesia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Jesús veía, sentía y actuaba, y nunca separó la compasión de la Palabra. Ayuda a tu equipo a acercarse a las personas con respeto y a ofrecer el evangelio con amor, sin poner la ayuda como condición.",
      },
    ],
    ideaClave:
      "Jesús tuvo compasión de las multitudes desamparadas (Mateo 9:36), del leproso, al que tocó, y de la viuda de Naín. Su compasión veía, sentía por dentro y actuaba: sanaba, daba de comer y anunciaba el reino, porque fue ungido para dar buenas nuevas a los pobres (Lucas 4:18). La lástima mira de lejos; la compasión se acerca, acompaña y trata a la persona con dignidad.",
    paraLaVida: {
      texto: "Me acerco a la persona que sufre, en vez de mirarla de lejos.",
      pregunta: "¿Hay alguien a quien has mirado con lástima y Dios te pide que te acerques con compasión?",
    },
  },
  {
    id: "obra-social-1-4",
    objetivos: [
      "Explicar la parábola del buen samaritano y la pregunta que Jesús cambió.",
      "Relacionar Mateo 25:40 y Gálatas 6:10 con el servicio a todos, empezando por la familia de la fe.",
      "Decidir cómo ayudar a alguien que no es de la iglesia y que es diferente.",
    ],
    paraEmpezar:
      "Un intérprete de la ley le preguntó a Jesús quién era su prójimo, como buscando hasta dónde estaba obligado a amar. Jesús le contestó con una historia y le dio vuelta a la pregunta: no se trata de quién merece mi ayuda, sino de quién se porta como prójimo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 10:33-34" },
      {
        t: "parrafo",
        texto:
          "Un sacerdote y un levita pasaron de largo, pero un samaritano «fue movido a misericordia; y acercándose, vendó sus heridas». Judíos y samaritanos no se trataban entre sí (Juan 4:9): el que ayudó era el menos esperado.",
      },
      { t: "versiculo", ref: "Lucas 10:36-37" },
      {
        t: "parrafo",
        texto:
          "Jesús preguntó cuál de los tres fue el prójimo del herido, y el intérprete respondió que el que usó de misericordia. Entonces Jesús le dijo: «Ve, y haz tú lo mismo».",
      },
      { t: "versiculo", ref: "Mateo 25:40" },
      {
        t: "parrafo",
        texto:
          "El Rey dirá: «en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis». Dar de comer al hambriento, recibir al forastero y visitar al enfermo y al preso es servir a Cristo.",
      },
      { t: "subtitulo", texto: "Lo que enseña la parábola" },
      {
        t: "lista",
        items: [
          "El prójimo no se define por la raza, la religión ni el idioma: es cualquiera que está en necesidad en mi camino.",
          "La religión sin misericordia pasa de largo: el sacerdote y el levita conocían la ley y no se detuvieron.",
          "La misericordia cuesta: el samaritano dio su tiempo, su aceite y su vino, su cabalgadura y su dinero (Lucas 10:34-35).",
          "La misericordia sigue: dejó pagado el mesón y prometió volver.",
          "La iglesia hace bien a todos, y mayormente a los de la familia de la fe (Gálatas 6:10): primero cuida a sus hermanos, pero no se queda ahí.",
          "En el más pequeño servimos a Cristo (Mateo 25:40).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la pregunta del intérprete y la pregunta de Jesús" },
      {
        t: "lista",
        items: [
          "El intérprete preguntó quién es mi prójimo, buscando un límite. Jesús preguntó quién se portó como prójimo, buscando un corazón.",
          "El intérprete pensaba a quién estaba obligado a ayudar. Jesús le enseñó a ser el que ayuda.",
          "El sacerdote tenía razones para no detenerse. El samaritano tuvo misericordia para detenerse.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el hombre que duerme frente al templo" },
      {
        t: "parrafo",
        texto:
          "Un hombre sin hogar duerme algunas noches en la entrada del templo. Unos hermanos quieren que lo saquen y otros quieren ayudarlo. El consejo pide un plan como el del buen samaritano.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, acercarse a saludarlo, preguntarle su nombre y cómo está, sin prisa ni desprecio.",
          "Paso 2, cubrir lo urgente: una comida caliente, agua y una cobija, y orar con él si lo acepta.",
          "Paso 3, ayudarlo a llegar a un albergue o a una organización de la ciudad que atiende a las personas sin hogar.",
          "Paso 4, poner reglas claras de seguridad: dos voluntarios juntos, un horario y un responsable.",
          "Paso 5, seguir acompañándolo: volver a verlo, como el samaritano prometió volver.",
          "Paso 6, enseñar a la iglesia la parábola, para que nadie pase de largo por miedo o por prisa.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuidar a una persona que vive en la calle pide amor y sabiduría. Sirvan siempre en pareja, conozcan los servicios de la ciudad y no prometan lo que no pueden cumplir: la misericordia que dura es la que se organiza bien.",
      },
    ],
    ideaClave:
      "En la parábola del buen samaritano, Jesús cambió la pregunta: no quién merece mi ayuda, sino quién se porta como prójimo. El sacerdote y el levita pasaron de largo; el samaritano fue movido a misericordia, se acercó, pagó y prometió volver. La iglesia hace bien a todos, y mayormente a los de la familia de la fe (Gálatas 6:10), sabiendo que lo que hace al más pequeño se lo hace a Cristo (Mateo 25:40).",
    paraLaVida: {
      texto: "No paso de largo: me detengo ante el que está herido en mi camino.",
      pregunta: "¿Junto a quién has pasado de largo por prisa o por miedo, y qué harás la próxima vez?",
    },
  },
  {
    id: "obra-social-1-5",
    objetivos: [
      "Describir cómo la iglesia de Jerusalén cuidaba a los necesitados (Hechos 2, 4 y 6).",
      "Explicar la ofrenda de Pablo para los pobres de Jerusalén y el principio de la igualdad (2 Corintios 8).",
      "Proponer una manera de organizar la ayuda en una iglesia de hoy.",
    ],
    paraEmpezar:
      "La iglesia nació llena del Espíritu Santo y desde el principio compartió sus bienes con los necesitados. Cuando hubo un problema con la ayuda a las viudas, lo resolvió con orden. Y Pablo, el apóstol de los gentiles, recogió ofrendas para los pobres de Jerusalén. La compasión estaba en el corazón de la iglesia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 4:34-35" },
      {
        t: "parrafo",
        texto:
          "«No había entre ellos ningún necesitado», porque los que tenían heredades las vendían, y «se repartía a cada uno según su necesidad». Lo hacían libremente: lo vendido estaba en su poder (Hechos 5:4).",
      },
      { t: "versiculo", ref: "Gálatas 2:10" },
      {
        t: "parrafo",
        texto:
          "Cuando los apóstoles de Jerusalén aprobaron el ministerio de Pablo entre los gentiles, solo le pidieron «que nos acordásemos de los pobres», y Pablo dice: «lo cual también procuré con diligencia hacer».",
      },
      { t: "versiculo", ref: "2 Corintios 8:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo no pedía que unos quedaran en estrechez para aliviar a otros, sino «que en este tiempo, con igualdad, la abundancia vuestra supla la escasez de ellos». Hoy das tú; mañana tal vez recibas.",
      },
      { t: "subtitulo", texto: "Cómo servía la primera iglesia" },
      {
        t: "lista",
        items: [
          "Compartía sus bienes de buena voluntad y repartía según la necesidad de cada uno (Hechos 2:44-45).",
          "Cuando las viudas de los griegos eran desatendidas, escogió a siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría, para el servicio de las mesas (Hechos 6:1-3).",
          "Así los apóstoles siguieron en la oración y en el ministerio de la palabra, y la palabra crecía (Hechos 6:4 y 7).",
          "Dorcas abundaba en buenas obras y en limosnas, y hacía túnicas y vestidos para las viudas (Hechos 9:36 y 39).",
          "La iglesia de Antioquía envió socorro a los hermanos de Judea en tiempo de hambre, cada uno conforme a lo que tenía (Hechos 11:28-30).",
          "Las iglesias de Macedonia dieron aun más allá de sus fuerzas para los santos de Jerusalén (2 Corintios 8:1-4).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda desordenada y la ayuda organizada" },
      {
        t: "lista",
        items: [
          "Desordenada: cada uno ayuda a quien conoce, y algunos quedan olvidados. Organizada: un equipo de buen testimonio se ocupa de que nadie sea desatendido.",
          "Desordenada: el pastor lo hace todo y descuida la Palabra. Organizada: los encargados sirven y el pastor sigue en la oración y la Palabra.",
          "Desordenada: se da sin cuentas claras. Organizada: la ofrenda se maneja con transparencia, como Pablo con la ofrenda para Jerusalén (2 Corintios 8:20-21).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las hermanas olvidadas" },
      {
        t: "parrafo",
        texto:
          "En una iglesia grande, varias hermanas mayores que viven solas se quejan de que nadie las visita, mientras otras reciben ayuda de sus amigos del grupo. El pastor recuerda Hechos 6.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar la queja sin defenderse, como los apóstoles atendieron la murmuración de los griegos.",
          "Paso 2, hacer la lista de las hermanas mayores que viven solas, con sus necesidades.",
          "Paso 3, escoger un equipo de buen testimonio, lleno del Espíritu y de sabiduría, para atenderlas.",
          "Paso 4, repartir las visitas para que cada hermana tenga a alguien que la llame y la visite.",
          "Paso 5, usar el fondo de ayuda con reglas claras para las necesidades que el equipo encuentre.",
          "Paso 6, informar a la iglesia lo que se hace y dar gracias a Dios, para que la palabra siga creciendo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Hechos 6 muestra que la compasión necesita orden: cuando la ayuda se organiza bien, nadie queda olvidado y los pastores pueden dedicarse a la oración y a la Palabra.",
      },
      {
        t: "cuadro",
        titulo: "Cómo organizó la ayuda la primera iglesia",
        columnas: ["El problema", "Lo que hizo la iglesia", "Para hoy"],
        filas: [
          ["Hermanos sin lo necesario", "Repartir a cada uno según su necesidad (Hechos 4:34-35)", "Un fondo de ayuda con reglas claras"],
          ["Viudas desatendidas", "Escoger a siete de buen testimonio para servir (Hechos 6:1-3)", "Un equipo que vele por que nadie quede olvidado"],
          ["Hambre en Judea", "Enviar socorro, cada uno conforme a lo que tenía (Hechos 11:29-30)", "Responder juntos cuando otra iglesia sufre"],
          ["Pobres en Jerusalén", "Una ofrenda manejada con transparencia (2 Corintios 8:20-21)", "Cuentas claras de cada ofrenda especial"],
        ],
      },
    ],
    ideaClave:
      "La primera iglesia compartía según la necesidad de cada uno, y no había necesitado entre ellos (Hechos 4:34-35). Cuando las viudas fueron desatendidas, escogió a siete de buen testimonio para servir, y la palabra siguió creciendo (Hechos 6). Antioquía envió socorro en tiempo de hambre, los apóstoles pidieron acordarse de los pobres (Gálatas 2:10), y Pablo recogió una ofrenda con igualdad y transparencia (2 Corintios 8).",
    paraLaVida: {
      texto: "Comparto lo que tengo y ayudo a que en mi iglesia nadie quede olvidado.",
      pregunta: "¿Quién en tu iglesia podría estar desatendido sin que nadie lo note?",
    },
  },
  {
    id: "obra-social-1-6",
    objetivos: [
      "Explicar, con Santiago 2:15-17 y 1 Juan 3:17-18, por qué la fe verdadera se ve en las obras.",
      "Reconocer qué es la misión integral y el lugar de la evangelización en ella.",
      "Distinguir el alivio, la rehabilitación y el desarrollo para ayudar sin hacer daño.",
    ],
    paraEmpezar:
      "Algunos piensan que la iglesia solo debe predicar, y otros, que basta con ayudar. La Biblia une las dos cosas: anunciamos a Cristo con palabras y lo mostramos con obras. Pero ayudar bien también se aprende, porque hay ayudas que, sin querer, hacen daño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Santiago 2:15-17" },
      {
        t: "parrafo",
        texto:
          "Si alguien le dice al hermano necesitado «Id en paz, calentaos y saciaos», pero no le da lo que necesita, ¿de qué sirve? «Así también la fe, si no tiene obras, es muerta en sí misma».",
      },
      { t: "versiculo", ref: "1 Juan 3:17-18" },
      {
        t: "parrafo",
        texto:
          "Juan pregunta cómo mora el amor de Dios en el que cierra su corazón al hermano necesitado, y pide: «no amemos de palabra ni de lengua, sino de hecho y en verdad».",
      },
      { t: "versiculo", ref: "Efesios 2:10" },
      {
        t: "parrafo",
        texto:
          "Somos salvos por gracia y no por obras, y fuimos «creados en Cristo Jesús para buenas obras». Las obras no nos salvan: son el fruto de la salvación.",
      },
      { t: "subtitulo", texto: "La misión integral" },
      {
        t: "lista",
        items: [
          "El evangelio anuncia que Cristo murió por nuestros pecados y resucitó (1 Corintios 15:3-4); nada lo reemplaza.",
          "La compasión muestra ese evangelio con obras: Jesús enseñaba, predicaba y sanaba (Mateo 9:35).",
          "El Pacto de Lausana (1974) afirma, en su artículo 5, que la evangelización y la participación sociopolítica son parte del deber cristiano.",
          "El mismo pacto dice, en su artículo 6, que en la misión de servicio sacrificial de la iglesia la evangelización es primordial.",
          "En América Latina, René Padilla llamó misión integral a esta unión de la palabra y la obra.",
          "La ayuda nunca se condiciona a que la persona crea o venga al culto: se da por amor, y el evangelio se ofrece con respeto.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: alivio, rehabilitación y desarrollo" },
      {
        t: "lista",
        items: [
          "Alivio: ayuda urgente y por poco tiempo en una crisis, como comida y techo después de un incendio.",
          "Rehabilitación: ayudar a que la persona vuelva a estar como antes de la crisis, con su participación activa, como encontrar un nuevo trabajo.",
          "Desarrollo: un camino más largo en el que la persona crece más allá de donde estaba, caminando con otros.",
          "Corbett y Fikkert advierten que uno de los errores más graves es dar alivio donde hace falta rehabilitación o desarrollo: se crea dependencia y se quita la dignidad.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la Navidad de los juguetes" },
      {
        t: "parrafo",
        texto:
          "Cada Navidad, una iglesia regala juguetes a los niños de un barrio pobre. Este año, un padre le dice al pastor que se siente avergonzado de que sus hijos reciban regalos de extraños delante de él.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar al padre con humildad y agradecerle su sinceridad.",
          "Paso 2, preguntarse si la Navidad es una crisis: no lo es, así que regalarlo todo no es lo mejor.",
          "Paso 3, buscar un camino de desarrollo: una venta de juguetes nuevos a precios muy bajos, donde los padres compran los regalos de sus hijos.",
          "Paso 4, invitar a los padres del barrio a trabajar en la venta y a decidir juntos en qué se usa lo que se recaude.",
          "Paso 5, ofrecer en el mismo lugar una celebración con el mensaje de la Navidad, abierta a todos.",
          "Paso 6, evaluar después con los padres cómo se sintieron y qué cambiar el año siguiente.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Ayudar bien empieza con una pregunta: ¿es una crisis o es una necesidad de largo plazo? En una crisis se da alivio con generosidad; en lo demás se camina con las personas, respetando su dignidad y lo que ellas pueden hacer.",
      },
      {
        t: "pasos",
        titulo: "Cómo ayudar sin hacer daño",
        pasos: [
          { titulo: "Orar y mirar", texto: "Pedir a Dios ojos para ver y conocer a la persona por su nombre." },
          { titulo: "Preguntar si es una crisis", texto: "En una crisis se da alivio enseguida; si no, se busca la rehabilitación o el desarrollo." },
          { titulo: "Escuchar", texto: "Preguntar qué necesita, qué sabe hacer y qué tiene, antes de decidir por ella." },
          { titulo: "Hacer con ella, no por ella", texto: "Que la persona participe y decida, para no crear dependencia." },
          { titulo: "Unir la obra y la palabra", texto: "Servir con amor y ofrecer el evangelio con respeto, sin condicionar la ayuda." },
          { titulo: "Acompañar y evaluar", texto: "Seguir cerca con el tiempo y revisar si la ayuda levanta a la persona o la hace depender." },
        ],
      },
    ],
    ideaClave:
      "La fe sin obras está muerta (Santiago 2:17), y el amor verdadero es de hecho y en verdad (1 Juan 3:18): fuimos creados en Cristo para buenas obras, aunque las obras no nos salvan. La misión integral une el evangelio y la compasión, y la evangelización sigue siendo primordial (Pacto de Lausana, 1974). Para ayudar sin hacer daño se distingue el alivio, para una crisis, de la rehabilitación y el desarrollo, que se hacen con la persona y no por ella.",
    paraLaVida: {
      texto: "Muestro con obras el amor que anuncio con palabras.",
      pregunta: "¿Tu ayuda a los demás levanta a las personas o las hace depender de ti?",
    },
  },
];
