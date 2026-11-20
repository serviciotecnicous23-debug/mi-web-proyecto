/**
 * Especialidad Estudios bíblicos avanzados · Materia 3 — Daniel y Apocalipsis (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia avanzada que va más allá del panorama de Libros poéticos y proféticos y de Epístolas y Apocalipsis (Nivel 4)
 * y de la escatología de Teología sistemática IV: la literatura apocalíptica, Daniel 1 a 6 y sus visiones, Cristo y las
 * siete iglesias, las maneras de leer el Apocalipsis y la nueva creación, con tres esquemas. Datos comprobados: Daniel 1:1 y
 * el 605 a. C.; las dos posturas sobre la fecha del libro (siglo VI a. C. o hacia el 167 al 164 a. C.) y Porfirio; el arameo
 * de Daniel 2:4 a 7:28; las ocho copias de Daniel en Qumrán; el Apocalipsis hacia el 95, bajo Domiciano, según Ireneo, o
 * antes del 70; las cuatro escuelas (Alcázar, 1614; Ribera; Milligan, 1889); el 666 y el 616. Las posturas sobre el
 * milenio y el rapto se presentan sin escoger entre ellas: la del ministerio la dirá su declaración de fe.
 */
import type { LeccionContenido } from "../tipos";

export const BIBLICOS_AVANZADOS_3: LeccionContenido[] = [
  {
    id: "biblicos-avanzados-3-1",
    objetivos: [
      "Explicar qué es la literatura apocalíptica y en qué se parecen Daniel y el Apocalipsis.",
      "Interpretar un símbolo del Apocalipsis con la ayuda del mismo libro y del Antiguo Testamento.",
      "Evitar los errores más comunes al leer la profecía apocalíptica.",
    ],
    paraEmpezar:
      "Daniel y el Apocalipsis no se leen como un periódico ni como una carta. Usan visiones, bestias, números y colores para mostrar lo que no se ve: que Dios gobierna la historia y que su reino vencerá. Para entenderlos hay que aprender a leer sus símbolos con la misma Biblia, y no con la imaginación ni con las noticias del día.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6XQd-Z4h6zM", titulo: "Cómo leer la literatura apocalíptica", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Daniel 7:15-16" },
      {
        t: "parrafo",
        texto:
          "Daniel mismo no entendía sus visiones: se le turbó el espíritu y se acercó a uno de los que asistían, y «le pregunté la verdad acerca de todo esto». El ángel le dio la interpretación. Muchas veces la Biblia misma explica sus símbolos.",
      },
      { t: "versiculo", ref: "Apocalipsis 1:1-3" },
      {
        t: "parrafo",
        texto:
          "El libro se llama «La revelación de Jesucristo»: no es un enigma escondido, sino algo que Dios quiere mostrar. Y trae una bendición: «Bienaventurado el que lee, y los que oyen las palabras de esta profecía, y guardan las cosas en ella escritas».",
      },
      { t: "versiculo", ref: "Apocalipsis 1:19-20" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo explica la primera visión: «las siete estrellas son los ángeles de las siete iglesias, y los siete candeleros que has visto, son las siete iglesias». Es la primera regla para leer el libro: dejar que el texto explique sus símbolos.",
      },
      { t: "subtitulo", texto: "Cómo es la literatura apocalíptica" },
      {
        t: "lista",
        items: [
          "Visiones y sueños, muchas veces con un ángel que los explica (Daniel 7:16; Apocalipsis 17:7).",
          "Símbolos: bestias, cuernos, colores y números que representan reinos, poderes y realidades espirituales.",
          "Números con sentido: el siete habla de plenitud, el doce del pueblo de Dios, el mil de una gran cantidad.",
          "Un mensaje para tiempos de prueba: Dios gobierna, el mal no tiene la última palabra y los fieles serán vindicados.",
          "Una mirada al cielo y a la historia a la vez: lo que pasa en la tierra se ve desde el trono de Dios (Apocalipsis 4).",
        ],
      },
      {
        t: "cuadro",
        titulo: "Cómo leer los símbolos del Apocalipsis",
        columnas: ["Símbolo", "Dónde", "Qué significa", "Cómo lo sabemos"],
        filas: [
          ["Las siete estrellas", "Apocalipsis 1:16, 20", "Los ángeles de las siete iglesias", "Jesús lo explica en el mismo capítulo"],
          ["Los siete candeleros", "Apocalipsis 1:12, 20", "Las siete iglesias", "Jesús lo explica en el mismo capítulo"],
          ["El Cordero inmolado", "Apocalipsis 5:6", "Cristo crucificado y resucitado", "El cántico del capítulo 5 y Juan 1:29"],
          ["La mujer que es Babilonia", "Apocalipsis 17:18", "La gran ciudad que reina sobre los reyes de la tierra", "El ángel lo explica en el mismo capítulo"],
        ],
      },
      { t: "subtitulo", texto: "Comparación: buena lectura y mala lectura" },
      {
        t: "lista",
        items: [
          "La buena lectura deja que la Biblia explique sus símbolos; la mala los explica con las noticias del día.",
          "La buena lectura busca el mensaje para los primeros lectores y para nosotros; la mala olvida que Juan escribió a siete iglesias reales (Apocalipsis 1:4).",
          "La buena lectura termina en adoración y fidelidad; la mala termina en miedo, curiosidad o fechas.",
          "La buena lectura reconoce que del día y la hora nadie sabe (Mateo 24:36); la mala pone fechas y se equivoca.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: interpretar un símbolo" },
      {
        t: "lista",
        items: [
          "Paso 1, leer el símbolo en su contexto: el Cordero como inmolado, en medio del trono (Apocalipsis 5:6).",
          "Paso 2, buscar si el mismo libro lo explica: el cántico dice que fue inmolado y que con su sangre redimió para Dios a gente de toda nación (Apocalipsis 5:9).",
          "Paso 3, buscar el trasfondo en el Antiguo Testamento: el cordero de la Pascua (Éxodo 12) y el siervo llevado como cordero (Isaías 53:7).",
          "Paso 4, ver cómo lo usa el resto del Nuevo Testamento: he aquí el Cordero de Dios (Juan 1:29).",
          "Paso 5, decir el sentido con sencillez: el que vence no es un león violento, sino Cristo crucificado y resucitado.",
          "Paso 6, aplicar: adorar al Cordero y vencer como él, con fidelidad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No conviertas el Apocalipsis en un rompecabezas de noticias. Empieza por lo claro, deja que la Biblia explique sus símbolos y lleva siempre a la clase a adorar a Cristo y a serle fiel.",
      },
    ],
    ideaClave:
      "Daniel y el Apocalipsis son literatura apocalíptica: visiones, símbolos y números que muestran que Dios gobierna la historia y que su reino vencerá. El Apocalipsis es «La revelación de Jesucristo» y trae bendición al que lo lee y lo guarda (Apocalipsis 1:1-3). La primera regla es dejar que la Biblia explique sus símbolos, como Jesús explica las estrellas y los candeleros (Apocalipsis 1:20), sin poner fechas.",
    paraLaVida: {
      texto: "Leo la profecía para adorar a Cristo y serle fiel, no para alimentar el miedo o la curiosidad.",
      pregunta: "¿Qué símbolo del Apocalipsis te ha confundido, y cómo lo buscarías ahora en la misma Biblia?",
    },
  },
  {
    id: "biblicos-avanzados-3-2",
    objetivos: [
      "Explicar el trasfondo de Daniel: el exilio en Babilonia y las dos posturas sobre la fecha del libro.",
      "Describir cómo Daniel y sus amigos fueron fieles a Dios sin dejar de servir en Babilonia (Daniel 1 a 6).",
      "Aplicar su ejemplo a la vida de un creyente que vive en una cultura que no conoce a Dios.",
    ],
    paraEmpezar:
      "Daniel fue llevado joven a Babilonia, lejos de su tierra, de su templo y de su familia. Le cambiaron el nombre, le enseñaron otra lengua y lo pusieron al servicio del rey. Los capítulos 1 al 6 cuentan cómo él y sus amigos sirvieron bien en un imperio pagano sin dejar de ser fieles a su Dios. Es una palabra muy cercana para los que viven como extranjeros.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yBO4FjCebrI", titulo: "Resumen del libro de Daniel", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Daniel 1:8" },
      {
        t: "parrafo",
        texto:
          "«Y Daniel propuso en su corazón no contaminarse con la porción de la comida del rey». No se rebeló ni despreció a sus maestros: pidió con respeto otra comida, y Dios le dio gracia ante el jefe de los eunucos (Daniel 1:9).",
      },
      { t: "versiculo", ref: "Daniel 3:17-18" },
      {
        t: "parrafo",
        texto:
          "Ante el horno de fuego, los tres amigos dijeron: «nuestro Dios a quien servimos puede librarnos», «Y si no, sepas, oh rey, que no serviremos a tus dioses». Su fe no dependía de que Dios hiciera lo que ellos querían.",
      },
      { t: "versiculo", ref: "Daniel 6:10" },
      {
        t: "parrafo",
        texto:
          "Cuando prohibieron orar a otro que no fuera el rey, Daniel siguió como siempre: «se arrodillaba tres veces al día, y oraba y daba gracias delante de su Dios, como lo solía hacer antes». Su fidelidad en público nació de su costumbre en privado.",
      },
      { t: "subtitulo", texto: "El trasfondo del libro" },
      {
        t: "lista",
        items: [
          "Daniel 1:1 sitúa la primera deportación en el tercer año del rey Joacim, hacia el 605 antes de Cristo, cuando Nabucodonosor sitió Jerusalén.",
          "El libro tiene dos idiomas: de Daniel 2:4 a 7:28 está en arameo, la lengua del imperio, y el resto en hebreo.",
          "Dos partes: los relatos de Daniel y sus amigos en la corte (capítulos 1 al 6) y las visiones (capítulos 7 al 12).",
          "Entre los manuscritos del mar Muerto se hallaron ocho copias de Daniel, todas incompletas.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: dos posturas sobre la fecha de Daniel" },
      {
        t: "lista",
        items: [
          "La postura conservadora: el libro es del siglo VI antes de Cristo, del tiempo de Daniel, y sus profecías anuncian de verdad lo que vendría.",
          "La postura crítica: el libro se terminó hacia el 167 al 164 antes de Cristo, en tiempos de Antíoco IV Epífanes, que persiguió a los judíos; ya en el siglo III después de Cristo el filósofo Porfirio lo fechaba así.",
          "Los creyentes que sostienen la primera postura recuerdan que Jesús habló de la abominación desoladora que anunció el profeta Daniel (Mateo 24:15).",
          "Las dos posturas coinciden en el mensaje: Dios gobierna los reinos y sostiene a los suyos en la persecución.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven creyente en un trabajo que presiona" },
      {
        t: "parrafo",
        texto:
          "Un joven de la iglesia consiguió un buen trabajo, pero su jefe le pide que mienta a los clientes para vender más.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, leer Daniel 1: Daniel sirvió bien al rey, pero propuso en su corazón no contaminarse.",
          "Paso 2, distinguir lo que puede aceptar, como aprender y trabajar duro, de lo que no puede, como mentir.",
          "Paso 3, hablar con respeto con su jefe y proponer otra manera de hacer bien el trabajo, como Daniel con el jefe de los eunucos.",
          "Paso 4, estar dispuesto a perder algo antes que negar a Dios: y si no, no serviremos a tus dioses.",
          "Paso 5, mantener su vida de oración en privado, como Daniel en su casa.",
          "Paso 6, confiar en que Dios da gracia y sabiduría a los que le son fieles (Daniel 1:17).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Daniel es un modelo para los creyentes que viven como inmigrantes o como minoría: sirvió con excelencia, aprendió la cultura, respetó a las autoridades y no negoció su fe. No hace falta escoger entre ser buen ciudadano y ser fiel a Dios.",
      },
    ],
    ideaClave:
      "Daniel fue llevado a Babilonia hacia el 605 antes de Cristo (Daniel 1:1). Él y sus amigos sirvieron en un imperio pagano sin dejar de ser fieles: propuso no contaminarse (Daniel 1:8), los tres amigos no adoraron la estatua aunque Dios no los librara (Daniel 3:17-18) y Daniel siguió orando tres veces al día (Daniel 6:10). Sobre la fecha del libro hay dos posturas, pero las dos ven el mismo mensaje: Dios gobierna los reinos.",
    paraLaVida: {
      texto: "Sirvo con excelencia donde Dios me puso, sin negociar mi fe.",
      pregunta: "¿En qué parte de tu trabajo o de tu escuela necesitas proponer en tu corazón no contaminarte?",
    },
  },
  {
    id: "biblicos-avanzados-3-3",
    objetivos: [
      "Explicar el mensaje central de las visiones de Daniel: los reinos humanos pasan y el reino de Dios permanece.",
      "Relacionar el hijo de hombre de Daniel 7:13-14 con Jesús, el Hijo del Hombre.",
      "Comparar las lecturas de los cuatro reinos y de las setenta semanas sin perder el mensaje del libro.",
    ],
    paraEmpezar:
      "En Daniel 2 el rey sueña con una estatua de cuatro metales que una piedra destruye; en Daniel 7, Daniel ve cuatro bestias y a uno como un hijo de hombre que recibe un reino eterno. Los detalles se discuten, pero el mensaje es claro: los imperios suben y caen, y el reino de Dios vendrá y no será destruido. Jesús tomó de aquí su título favorito: el Hijo del Hombre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=e2ILANmZ4Kk", titulo: "Por qué Jesús se llamó a sí mismo el Hijo del Hombre", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Daniel 2:44" },
      {
        t: "parrafo",
        texto:
          "La piedra del sueño representa esto: «el Dios del cielo levantará un reino que no será jamás destruido». Los reinos de la estatua caen; el reino de Dios permanece para siempre.",
      },
      { t: "versiculo", ref: "Daniel 7:13-14" },
      {
        t: "parrafo",
        texto:
          "Después de las bestias, Daniel ve «con las nubes del cielo» a «uno como un hijo de hombre», que recibe «dominio, gloria y reino». Ante el sumo sacerdote, Jesús dijo que verían al Hijo del Hombre viniendo en las nubes del cielo (Marcos 14:62).",
      },
      { t: "versiculo", ref: "Daniel 12:2-3" },
      {
        t: "parrafo",
        texto:
          "El libro termina con una de las promesas más claras del Antiguo Testamento sobre la resurrección: «muchos de los que duermen en el polvo de la tierra serán despertados, unos para vida eterna». Y «los que enseñan la justicia a la multitud» brillarán como las estrellas.",
      },
      {
        t: "cuadro",
        titulo: "Los cuatro reinos de Daniel 2 y 7",
        columnas: ["Daniel 2", "Daniel 7", "Lectura tradicional", "Otra lectura"],
        filas: [
          ["La cabeza de oro", "El león", "Babilonia", "Babilonia"],
          ["El pecho de plata", "El oso", "Medos y persas", "Media"],
          ["El vientre de bronce", "El leopardo", "Grecia", "Persia"],
          ["Las piernas de hierro", "La cuarta bestia", "Roma", "Grecia, con Alejandro y sus sucesores"],
          ["La piedra", "El hijo de hombre", "El reino de Dios", "El reino de Dios"],
        ],
      },
      { t: "subtitulo", texto: "Las setenta semanas de Daniel 9" },
      {
        t: "lista",
        items: [
          "Daniel 9:24-27 habla de setenta semanas, que casi todos entienden como semanas de años, hasta la venida de un ungido.",
          "Lectura mesiánica: se cuentan desde un decreto del rey Artajerjes, en el 458 o en el 445 antes de Cristo, y llegan al ministerio o a la muerte de Jesús.",
          "Lectura dispensacional: sesenta y nueve semanas llegan hasta el Mesías, y la última semana queda para el futuro.",
          "Lectura crítica: todo se cumple en el siglo II antes de Cristo, con Antíoco IV y la profanación del templo.",
          "Daniel mismo pone el centro en otra parte: en la oración de arrepentimiento y en la misericordia de Dios (Daniel 9:18-19).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que todos afirman y lo que se discute" },
      {
        t: "lista",
        items: [
          "Todos afirman que Dios gobierna los reinos y los pone y los quita (Daniel 2:21).",
          "Todos afirman que el reino de Dios vendrá y será eterno (Daniel 2:44; 7:14).",
          "Se discute quiénes son el tercer y el cuarto reino, y cómo contar las setenta semanas.",
          "Un buen maestro presenta las lecturas con honestidad y no hace depender la fe de una sola tabla.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: enseñar Daniel 7 en una clase" },
      {
        t: "lista",
        items: [
          "Paso 1, leer todo el capítulo en voz alta, sin detenerse primero en los detalles.",
          "Paso 2, preguntar qué es lo más claro: las bestias pasan y el hijo de hombre recibe un reino eterno.",
          "Paso 3, mostrar el cuadro de los cuatro reinos y explicar las dos lecturas.",
          "Paso 4, unir Daniel 7:13-14 con las palabras de Jesús sobre el Hijo del Hombre (Marcos 14:62).",
          "Paso 5, aplicar: los poderes de hoy también pasarán, y nuestra esperanza está en el reino de Cristo.",
          "Paso 6, terminar adorando al que recibió dominio, gloria y reino.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "No pierdas la clase en cálculos. Las visiones de Daniel se escribieron para dar esperanza a un pueblo perseguido: los imperios pasan, el reino de Dios permanece y los que enseñan la justicia brillarán para siempre.",
      },
    ],
    ideaClave:
      "Las visiones de Daniel muestran que los reinos humanos pasan y que el Dios del cielo levantará un reino que no será jamás destruido (Daniel 2:44). Uno como un hijo de hombre recibe dominio, gloria y reino eternos (Daniel 7:13-14), y Jesús se presentó como ese Hijo del Hombre. Se discuten los cuatro reinos y las setenta semanas, pero todos afirman que Dios gobierna la historia y que habrá resurrección (Daniel 12:2-3).",
    paraLaVida: {
      texto: "Vivo con esperanza, porque los reinos pasan y el reino de Cristo permanece para siempre.",
      pregunta: "¿Qué poder de este mundo te causa temor, y cómo cambia tu mirada saber que el reino de Dios permanece?",
    },
  },
  {
    id: "biblicos-avanzados-3-4",
    objetivos: [
      "Explicar el trasfondo del Apocalipsis: Juan en Patmos, las siete iglesias de Asia y las dos posturas sobre su fecha.",
      "Describir el patrón de las cartas a las siete iglesias (Apocalipsis 2 y 3).",
      "Aplicar el mensaje de una de las cartas a una iglesia de hoy.",
    ],
    paraEmpezar:
      "El Apocalipsis empieza con una visión de Cristo en medio de su iglesia. Juan estaba desterrado en la isla de Patmos por causa de la palabra de Dios (Apocalipsis 1:9), y recibió cartas para siete iglesias reales de la provincia romana de Asia, en lo que hoy es Turquía. Antes de mostrar el futuro, Jesús habla a su iglesia del presente.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=PgV57gK-Xow", titulo: "Resumen del libro de Apocalipsis (parte 1)", fuente: "Proyecto Biblia", minutos: 15 },
      { t: "versiculo", ref: "Apocalipsis 1:17-18" },
      {
        t: "parrafo",
        texto:
          "Juan cayó como muerto, pero Cristo puso su diestra sobre él: «No temas; yo soy el primero y el último; y el que vivo, y estuve muerto; mas he aquí que vivo por los siglos de los siglos». El Señor de la iglesia es el que venció a la muerte.",
      },
      { t: "versiculo", ref: "Apocalipsis 2:10" },
      {
        t: "parrafo",
        texto:
          "A la iglesia de Esmirna, pobre y perseguida, Jesús no le promete librarla del sufrimiento, sino estar con ella: «Sé fiel hasta la muerte, y yo te daré la corona de la vida».",
      },
      { t: "versiculo", ref: "Apocalipsis 3:20" },
      {
        t: "parrafo",
        texto:
          "A Laodicea, una iglesia rica y tibia, Jesús le dice: «He aquí, yo estoy a la puerta y llamo». Es una invitación a una iglesia que lo había dejado afuera, y a cada persona que oiga su voz.",
      },
      { t: "subtitulo", texto: "Las siete iglesias y lo que Cristo les dice" },
      {
        t: "lista",
        items: [
          "Éfeso: trabaja y no tolera a los malos, pero dejó su primer amor (Apocalipsis 2:2-4).",
          "Esmirna: pobre y perseguida, pero rica; no recibe ningún reproche (Apocalipsis 2:9-10).",
          "Pérgamo: retiene el nombre de Cristo donde está el trono de Satanás, pero tolera falsas enseñanzas (Apocalipsis 2:13-14).",
          "Tiatira: crece en amor y servicio, pero tolera a la mujer Jezabel (Apocalipsis 2:19-20).",
          "Sardis: tiene nombre de que vive, y está muerta (Apocalipsis 3:1).",
          "Filadelfia: tiene poca fuerza, pero guarda la palabra, y Cristo le abre una puerta (Apocalipsis 3:8).",
          "Laodicea: no es fría ni caliente; se cree rica y no ve su pobreza (Apocalipsis 3:15-17).",
        ],
      },
      { t: "subtitulo", texto: "El patrón de las cartas" },
      {
        t: "lista",
        items: [
          "Cristo se presenta con un rasgo de la visión del capítulo 1.",
          "Dice yo conozco tus obras: sabe lo que vive cada iglesia.",
          "Elogia lo bueno, cuando lo hay.",
          "Reprende lo malo y llama al arrepentimiento.",
          "Promete algo al que venciere.",
          "Termina igual: el que tiene oído, oiga lo que el Espíritu dice a las iglesias (Apocalipsis 2:7).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: dos posturas sobre la fecha del Apocalipsis" },
      {
        t: "lista",
        items: [
          "La mayoría lo fecha hacia el año 95, al final del reinado de Domiciano, como dice Ireneo en el siglo II.",
          "Otros lo fechan antes del año 70, en tiempos de Nerón, antes de la destrucción del templo.",
          "La fecha cambia algunos detalles de la interpretación, pero no el mensaje: Cristo es Señor y su iglesia debe ser fiel.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una iglesia que perdió su primer amor" },
      {
        t: "lista",
        items: [
          "Paso 1, leer la carta a Éfeso completa (Apocalipsis 2:1-7).",
          "Paso 2, reconocer lo bueno: trabajo, paciencia y doctrina sana.",
          "Paso 3, nombrar el problema sin rodeos: hacen muchas cosas, pero sin el amor del principio.",
          "Paso 4, seguir el remedio de Cristo: recordar de dónde cayeron, arrepentirse y volver a las primeras obras (Apocalipsis 2:5).",
          "Paso 5, planear juntos cómo volver al amor: oración, adoración y servicio con gozo.",
          "Paso 6, recordar la promesa: al que venciere le dará a comer del árbol de la vida (Apocalipsis 2:7).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Antes de hablar del futuro, deja que tu iglesia escuche lo que Cristo le dice hoy. Las siete cartas son un espejo: cada iglesia puede encontrarse en alguna de ellas.",
      },
    ],
    ideaClave:
      "El Apocalipsis empieza con Cristo resucitado en medio de su iglesia: «No temas; yo soy el primero y el último» (Apocalipsis 1:17-18). Juan escribió desde Patmos, hacia el año 95 según la mayoría o antes del 70 según otros, a siete iglesias reales de Asia. Cada carta sigue un patrón: Cristo conoce sus obras, elogia, reprende, llama al arrepentimiento y promete al que venza, como a Esmirna (Apocalipsis 2:10) y a Laodicea (Apocalipsis 3:20).",
    paraLaVida: {
      texto: "Escucho lo que el Espíritu dice a mi iglesia y respondo con arrepentimiento y fidelidad.",
      pregunta: "¿A cuál de las siete iglesias se parece más tu iglesia, y qué le diría Cristo hoy?",
    },
  },
  {
    id: "biblicos-avanzados-3-5",
    objetivos: [
      "Describir las cuatro maneras de leer el Apocalipsis: preterista, historicista, futurista e idealista.",
      "Comparar las posturas sobre el milenio y sobre el rapto con sus textos principales.",
      "Enseñar estos temas con respeto, sin poner fechas y con el centro en Cristo.",
    ],
    paraEmpezar:
      "Pocos libros se han leído de tantas maneras como el Apocalipsis. Unos ven en él la historia del siglo primero; otros, la historia de la iglesia; otros, el fin de los tiempos; otros, la lucha de siempre entre Dios y el mal. Y los creyentes no piensan igual sobre el milenio ni sobre el rapto. Conocer las posturas ayuda a enseñar con humildad y a no perder el mensaje.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ioMYiUOC2mk", titulo: "Estudiamos el Día del Señor en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Apocalipsis 4:11" },
      {
        t: "parrafo",
        texto:
          "Antes de los sellos y las trompetas, Juan ve el trono de Dios y oye la adoración: «Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas». Toda lectura del libro debe empezar aquí: Dios está en el trono.",
      },
      { t: "versiculo", ref: "Apocalipsis 5:9-10" },
      {
        t: "parrafo",
        texto:
          "El único digno de abrir el libro es el Cordero: «porque tú fuiste inmolado, y con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación». La historia está en las manos del Cristo crucificado.",
      },
      { t: "versiculo", ref: "Apocalipsis 20:4" },
      {
        t: "parrafo",
        texto:
          "Este es el texto del milenio: los fieles «vivieron y reinaron con Cristo mil años». Los creyentes lo han entendido de varias maneras, y todos afirman lo mismo al final: Cristo vence y los suyos reinan con él.",
      },
      {
        t: "cuadro",
        titulo: "Las cuatro maneras de leer el Apocalipsis",
        columnas: ["Escuela", "Qué dice", "Algunos que la siguieron"],
        filas: [
          ["Preterista", "Casi todo se cumplió en el siglo primero, con Jerusalén o con Roma", "Luis de Alcázar (1614) y, hoy, Kenneth Gentry"],
          ["Historicista", "El libro anuncia la historia de la iglesia hasta el fin", "Joaquín de Fiore, los reformadores e Isaac Newton"],
          ["Futurista", "La mayor parte describe hechos todavía futuros, al final de la historia", "Francisco Ribera y, después, J. N. Darby"],
          ["Idealista", "El libro muestra con símbolos la lucha de siempre entre Dios y el mal", "William Milligan (1889)"],
        ],
      },
      { t: "subtitulo", texto: "Las posturas sobre el milenio" },
      {
        t: "lista",
        items: [
          "Premilenarismo histórico: Cristo vuelve antes de un reino de mil años, y no separa a Israel de la iglesia; lo sostuvieron Papías e Ireneo, y en el siglo XX George Ladd.",
          "Premilenarismo dispensacional: distingue a Israel de la iglesia, y pone el rapto antes de siete años de tribulación; lo enseñaron J. N. Darby y C. I. Scofield.",
          "Posmilenarismo: Cristo vuelve después de un largo tiempo de avance del evangelio; lo sostuvo Jonathan Edwards.",
          "Amilenarismo: los mil años son simbólicos y hablan del reinado presente de Cristo con su iglesia; lo enseñó Agustín.",
        ],
      },
      { t: "subtitulo", texto: "Las posturas sobre el rapto" },
      {
        t: "lista",
        items: [
          "Pretribulacionismo: la iglesia es arrebatada antes de la gran tribulación.",
          "Mesotribulacionismo: el arrebatamiento ocurre a la mitad de la tribulación.",
          "Postribulacionismo: ocurre al final, junto con la segunda venida de Cristo.",
          "Pre-ira: ocurre en la segunda mitad, antes de que se derrame la ira de Dios.",
          "Todos se apoyan en la promesa de que los muertos en Cristo resucitarán y los que vivan serán arrebatados para recibir al Señor (1 Tesalonicenses 4:16-17).",
          "La postura del ministerio sobre el milenio y el rapto la dirá su declaración de fe; aquí se presentan sin escoger entre ellas.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que todos afirman y lo que se discute" },
      {
        t: "lista",
        items: [
          "Todos afirman que Cristo vuelve en persona, que habrá resurrección y juicio, y que Dios hará nuevas todas las cosas.",
          "Se discute el orden de los hechos, el sentido de los mil años y el momento del rapto.",
          "Nadie sabe el día ni la hora (Mateo 24:36): los que pusieron fechas se equivocaron.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el número 666" },
      {
        t: "lista",
        items: [
          "Paso 1, leer el texto: Apocalipsis 13:18 pide entendimiento y dice que es número de hombre.",
          "Paso 2, explicar la costumbre antigua de dar valor de número a las letras.",
          "Paso 3, presentar la hipótesis más común: el nombre Nerón César escrito en hebreo suma 666, y escrito de otra forma suma 616, número que aparece en algunos manuscritos antiguos.",
          "Paso 4, aclarar que es una hipótesis, no un hecho, y que hay otras lecturas.",
          "Paso 5, no buscar el número en nombres de personas ni en productos de hoy.",
          "Paso 6, aplicar: no adorar a la bestia ni recibir su marca es ser fiel al Cordero en todo (Apocalipsis 14:12).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "Puedes enseñar estas posturas sin dividir a la iglesia: presenta cada una con sus textos, di en qué coinciden todas, no pongas fechas y termina siempre en Cristo, que es digno, que vence y que viene.",
      },
    ],
    ideaClave:
      "El Apocalipsis se ha leído de cuatro maneras: preterista, historicista, futurista e idealista. Los creyentes no piensan igual sobre el milenio (Apocalipsis 20:4) ni sobre el rapto, pero todos afirman que Dios está en el trono (Apocalipsis 4:11), que el Cordero inmolado es digno (Apocalipsis 5:9-10), que Cristo vuelve y que nadie sabe el día ni la hora. La postura del ministerio la dirá su declaración de fe.",
    paraLaVida: {
      texto: "Espero a Cristo con fe y con humildad, sin poner fechas y sin despreciar al que piensa distinto.",
      pregunta: "¿Cómo explicarías a un nuevo creyente las distintas posturas sobre el milenio sin confundirlo?",
    },
  },
  {
    id: "biblicos-avanzados-3-6",
    objetivos: [
      "Explicar, con Apocalipsis 19 a 22, cómo termina la historia de la Biblia: Cristo vence y Dios hace nuevas todas las cosas.",
      "Relacionar la nueva creación con el principio de la Biblia: el jardín, el árbol de la vida y Dios con su pueblo.",
      "Aplicar la esperanza del Apocalipsis a la vida, la adoración y la misión de la iglesia hoy.",
    ],
    paraEmpezar:
      "El Apocalipsis no termina con una bestia ni con un desastre, sino con una boda, una ciudad y un jardín. Cristo vuelve, el mal es juzgado y Dios viene a vivir con su pueblo en un cielo nuevo y una tierra nueva. La historia que empezó en Génesis con un jardín termina en una ciudad jardín, y la iglesia responde: ven, Señor Jesús.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=DMXA-GERRzY", titulo: "Resumen del libro de Apocalipsis (parte 2)", fuente: "Proyecto Biblia", minutos: 15 },
      { t: "versiculo", ref: "Apocalipsis 19:11" },
      {
        t: "parrafo",
        texto:
          "Juan vio «el cielo abierto; y he aquí un caballo blanco, y el que lo montaba se llamaba Fiel y Verdadero, y con justicia juzga y pelea». El que vuelve es el mismo Cordero que fue inmolado.",
      },
      { t: "versiculo", ref: "Apocalipsis 21:3-4" },
      {
        t: "parrafo",
        texto:
          "La meta de la historia es esta: «He aquí el tabernáculo de Dios con los hombres, y él morará con ellos». Y «Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».",
      },
      { t: "versiculo", ref: "Apocalipsis 22:20" },
      {
        t: "parrafo",
        texto:
          "La última promesa de la Biblia es de Jesús: «Ciertamente vengo en breve». Y la última oración es de la iglesia: «Amén; sí, ven, Señor Jesús».",
      },
      { t: "subtitulo", texto: "Cómo termina la historia" },
      {
        t: "lista",
        items: [
          "Cae Babilonia, la ciudad del orgullo y de la injusticia (Apocalipsis 18:2).",
          "Se celebran las bodas del Cordero con su pueblo (Apocalipsis 19:7-9).",
          "Cristo vuelve como Fiel y Verdadero, y vence a la bestia (Apocalipsis 19:11, 20).",
          "Los muertos son juzgados delante del gran trono blanco (Apocalipsis 20:11-12).",
          "Dios hace un cielo nuevo y una tierra nueva, y la nueva Jerusalén desciende del cielo (Apocalipsis 21:1-2).",
          "Vuelven el río y el árbol de la vida, y los siervos de Dios verán su rostro (Apocalipsis 22:1-4).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el principio y el final de la Biblia" },
      {
        t: "lista",
        items: [
          "En Génesis Dios crea los cielos y la tierra; en el Apocalipsis hace un cielo nuevo y una tierra nueva (Génesis 1:1; Apocalipsis 21:1).",
          "En Génesis el hombre pierde el árbol de la vida; en el Apocalipsis el árbol vuelve y sus hojas sanan a las naciones (Génesis 3:22-24; Apocalipsis 22:2).",
          "En Génesis entra la muerte; en el Apocalipsis ya no habrá muerte (Génesis 3:19; Apocalipsis 21:4).",
          "En Génesis el hombre se esconde de Dios; en el Apocalipsis verán su rostro (Génesis 3:8; Apocalipsis 22:4).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: consolar a una familia en un funeral" },
      {
        t: "lista",
        items: [
          "Paso 1, acompañar en silencio y escuchar antes de hablar.",
          "Paso 2, leer Apocalipsis 21:3-4 despacio, sin explicaciones largas.",
          "Paso 3, decir con sencillez la esperanza: Dios enjugará toda lágrima y ya no habrá muerte.",
          "Paso 4, no prometer lo que la Biblia no dice ni poner fechas al regreso de Cristo.",
          "Paso 5, recordar que la esperanza está en Cristo, que estuvo muerto y vive para siempre (Apocalipsis 1:18).",
          "Paso 6, orar con la familia y seguir acompañándola después del funeral.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el maestro",
        texto:
          "El Apocalipsis se escribió para dar esperanza, no miedo. Termina cada clase del libro con la nueva creación y con la oración de la iglesia: ven, Señor Jesús. Y recuerda que la esperanza mueve a la misión, porque el Cordero redimió gente de toda nación (Apocalipsis 7:9).",
      },
    ],
    ideaClave:
      "El Apocalipsis termina con esperanza: cae Babilonia, se celebran las bodas del Cordero, Cristo vuelve como Fiel y Verdadero (Apocalipsis 19:11), el mal es juzgado y Dios hace un cielo nuevo y una tierra nueva donde morará con su pueblo y enjugará toda lágrima (Apocalipsis 21:3-4). La Biblia que empezó en un jardín termina en una ciudad jardín, y la iglesia responde: ven, Señor Jesús (Apocalipsis 22:20).",
    paraLaVida: {
      texto: "Vivo con la esperanza de la nueva creación y oro: ven, Señor Jesús.",
      pregunta: "¿Qué cambia en tu manera de sufrir, de servir y de evangelizar saber que Dios enjugará toda lágrima?",
    },
  },
];
