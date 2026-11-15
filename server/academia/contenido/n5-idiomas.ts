/**
 * Nivel 5 · Materia 5 — Griego y hebreo bíblicos para el estudio (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * No es un curso de gramática: da lo básico para estudiar mejor con herramientas (los idiomas de la Biblia y cómo llegó
 * el texto, los alfabetos, palabras clave, Strong, interlineales y diccionarios, el estudio de palabras y los errores
 * comunes). Los números de Strong citados (griego 26 y 3056; hebreo 2617 y 7965) son los de la concordancia de Strong.
 */
import type { LeccionContenido } from "../tipos";

export const N5_IDIOMAS: LeccionContenido[] = [
  {
    id: "n5-idiomas-1",
    objetivos: [
      "Identificar en qué idiomas se escribió la Biblia y qué partes están en arameo.",
      "Explicar qué es el griego koiné y qué fue la Septuaginta.",
      "Describir cómo llegó el texto bíblico hasta nuestras traducciones.",
    ],
    paraEmpezar:
      "La Biblia que lees se escribió hace miles de años en otros idiomas. Tu Biblia en español es una traducción fiel, pero conocer un poco de los idiomas originales ayuda a ver detalles que enriquecen el estudio.",
    bloques: [
      { t: "versiculo", ref: "Juan 19:19-20" },
      {
        t: "parrafo",
        texto:
          "Sobre la cruz, el título de Jesús «estaba escrito en hebreo, en griego y en latín». Esos idiomas muestran el mundo en que se escribió la Biblia.",
      },
      { t: "subtitulo", texto: "Tres idiomas" },
      {
        t: "lista",
        items: [
          "Hebreo: casi todo el Antiguo Testamento.",
          "Arameo, un idioma hermano del hebreo: algunas partes de Esdras (4:8 a 6:18 y 7:12-26), de Daniel (2:4 a 7:28) y un versículo de Jeremías (10:11).",
          "Griego: todo el Nuevo Testamento.",
        ],
      },
      { t: "versiculo", ref: "Daniel 2:4" },
      {
        t: "parrafo",
        texto:
          "El mismo texto marca el cambio: «Entonces hablaron los caldeos al rey en lengua aramea». Desde ese versículo hasta el final del capítulo 7, el libro de Daniel está escrito en arameo.",
      },
      { t: "subtitulo", texto: "El griego koiné y la Septuaginta" },
      {
        t: "parrafo",
        texto:
          "El Nuevo Testamento no se escribió en el griego clásico de los filósofos, sino en el koiné, el griego común que se hablaba en todo el Mediterráneo después de las conquistas de Alejandro Magno. Siglos antes de Cristo, en Alejandría, los judíos tradujeron el Antiguo Testamento al griego: es la Septuaginta, y los autores del Nuevo Testamento la citan muchas veces.",
      },
      { t: "subtitulo", texto: "De los originales a tu Biblia" },
      {
        t: "parrafo",
        texto:
          "La Biblia se copió a mano durante siglos y con gran cuidado. Los masoretas, escribas judíos de la Edad Media, añadieron al texto hebreo los signos de las vocales, y el manuscrito completo más antiguo que se conserva de la Biblia hebrea, el códice de Leningrado, es del año 1008. Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos. La Reina-Valera viene de la traducción de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602).",
      },
      { t: "versiculo", ref: "Mateo 5:18" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo que «ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido». La jota es la yod, la letra más pequeña del alfabeto hebreo, y la tilde, un pequeño trazo de una letra. Dios cuida su Palabra hasta el detalle. Es el versículo de memoria de esta materia.",
      },
      {
        t: "nota",
        titulo: "Con humildad",
        texto:
          "No hace falta ser experto para estudiar bien la Biblia: las buenas traducciones son fieles. Conocer un poco de los idiomas originales sirve para ver más detalles, no para despreciar tu Biblia ni para lucirte.",
      },
    ],
    ideaClave:
      "El Antiguo Testamento se escribió en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego koiné, el griego común de su tiempo. La Septuaginta tradujo el Antiguo Testamento al griego antes de Cristo, y la Biblia se copió con gran cuidado hasta llegar a traducciones como la Reina-Valera. Dios cuida su Palabra hasta la jota y la tilde.",
    paraLaVida: {
      texto: "Tu Biblia es un tesoro que Dios preservó con cuidado a lo largo de los siglos.",
      pregunta: "¿Qué te gustaría entender mejor de tu Biblia al conocer los idiomas originales?",
    },
  },
  {
    id: "n5-idiomas-2",
    objetivos: [
      "Describir el alfabeto hebreo: 22 consonantes, de derecha a izquierda, con vocales añadidas.",
      "Explicar el sentido de palabras clave del hebreo como shalom, YHWH, Elohim, torá, rúaj y néfesh.",
      "Usar ese conocimiento para leer mejor el Antiguo Testamento.",
    ],
    paraEmpezar:
      "Si abres una Biblia hebrea, la primera página está donde esperarías encontrar la última: el hebreo se lee de derecha a izquierda.",
    bloques: [
      { t: "subtitulo", texto: "El alfabeto hebreo" },
      {
        t: "lista",
        items: [
          "Tiene 22 letras, todas consonantes.",
          "Se escribe y se lee de derecha a izquierda.",
          "Las vocales son puntos y rayitas que los masoretas añadieron debajo, encima o dentro de las letras.",
          "Las letras son álef, bet, guímel, dálet, he, vav, zayin, jet, tet, yod, kaf, lámed, mem, nun, sámej, ayin, pe, tsade, qof, resh, shin y tav.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "El Salmo 119 está ordenado con esas 22 letras: tiene 22 estrofas de ocho versículos, y en hebreo los versículos de cada estrofa empiezan con la misma letra. Por eso muchas Biblias ponen sobre cada estrofa el nombre de una letra: Alef, Bet, Guímel, y así hasta el final.",
      },
      { t: "subtitulo", texto: "Palabras clave" },
      { t: "versiculo", ref: "Números 6:24-26" },
      {
        t: "parrafo",
        texto:
          "Shalom se traduce paz, pero es mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios y con los demás. La bendición de los sacerdotes termina así: «Jehová alce sobre ti su rostro, y ponga en ti paz».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ayvlscZUZ0c", titulo: "Shalom - Paz", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Deuteronomio 6:4" },
      {
        t: "parrafo",
        texto:
          "El nombre propio de Dios se escribe en hebreo con cuatro consonantes, YHWH. Por reverencia, los judíos dejaron de pronunciarlo y leían en su lugar Adonai, Señor. La Reina-Valera lo traduce Jehová: «Oye, Israel: Jehová nuestro Dios, Jehová uno es». Elohim, en cambio, es la palabra general para Dios.",
      },
      {
        t: "lista",
        items: [
          "Torá: instrucción. Se traduce ley, pero es la enseñanza de Dios para su pueblo.",
          "Rúaj: espíritu, y también viento y aliento (Génesis 1:2; Ezequiel 37:9).",
          "Néfesh: alma, pero también vida, persona, el ser entero.",
          "Amén: viene de una raíz que significa firme, seguro, digno de confianza.",
        ],
      },
      {
        t: "nota",
        titulo: "Un idioma de imágenes",
        texto:
          "El hebreo prefiere las imágenes concretas: Dios es roca, escudo y pastor. Al leer el Antiguo Testamento, presta atención a esas imágenes.",
      },
    ],
    ideaClave:
      "El hebreo tiene 22 consonantes, se lee de derecha a izquierda y sus vocales las añadieron los masoretas. Palabras como shalom, que es plenitud y no solo paz, el nombre YHWH, que la Reina-Valera traduce Jehová, Elohim, torá, rúaj y néfesh tienen un sentido rico que ayuda a leer mejor el Antiguo Testamento.",
    paraLaVida: {
      texto: "Cada palabra de Dios tiene una riqueza que vale la pena descubrir.",
      pregunta: "¿Cuál de estas palabras hebreas te ayuda a conocer mejor a Dios, y por qué?",
    },
  },
  {
    id: "n5-idiomas-3",
    objetivos: [
      "Describir el alfabeto griego y reconocer algunas de sus letras.",
      "Explicar el sentido de palabras clave del Nuevo Testamento: lógos, ágape, cháris, pístis, euangélion, ekklesía, metánoia y koinonía.",
      "Usar ese conocimiento para leer mejor el Nuevo Testamento.",
    ],
    paraEmpezar: "El Señor se presenta como el Alfa y la Omega: la primera y la última letra del alfabeto griego.",
    bloques: [
      { t: "versiculo", ref: "Apocalipsis 1:8" },
      {
        t: "parrafo",
        texto: "«Yo soy el Alfa y la Omega, principio y fin, dice el Señor». Él es el principio y el fin de todo, como la primera y la última letra.",
      },
      { t: "subtitulo", texto: "El alfabeto griego" },
      {
        t: "lista",
        items: [
          "Tiene 24 letras y se lee de izquierda a derecha, como el español.",
          "Muchas letras se parecen a las nuestras, porque nuestro alfabeto viene en parte del griego.",
          "Las letras son alfa, beta, gamma, delta, épsilon, zeta, eta, theta, iota, kappa, lambda, mi, ni, xi, ómicron, pi, ro, sigma, tau, ípsilon, fi, ji, psi y omega.",
        ],
      },
      { t: "versiculo", ref: "Juan 1:1" },
      {
        t: "parrafo",
        texto:
          "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios». Verbo traduce lógos: la palabra, el mensaje, la razón. Juan presenta a Jesús como la Palabra de Dios hecha carne (Juan 1:14).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=rkSRDC49Dtc", titulo: "Lo que significa que Jesús sea la Palabra de Dios", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "subtitulo", texto: "Más palabras clave" },
      {
        t: "lista",
        items: [
          "Ágape: el amor que se da por el bien del otro, como el de Dios, que es amor (1 Juan 4:8).",
          "Cháris: gracia, el favor que no merecemos (Efesios 2:8).",
          "Pístis: fe, que es confianza, y también fidelidad.",
          "Euangélion: evangelio, buena noticia; se usaba para anunciar una victoria o el nacimiento de un rey.",
          "Ekklesía: iglesia; en las ciudades griegas era la asamblea de los ciudadanos convocados.",
          "Metánoia: arrepentimiento, un cambio de mente que lleva a un cambio de vida.",
          "Koinonía: comunión, tener algo en común y compartirlo (Hechos 2:42).",
        ],
      },
      {
        t: "nota",
        titulo: "Una palabra, varios sentidos",
        texto:
          "Una palabra puede tener varios sentidos, y el contexto decide cuál usa el autor en cada pasaje. Lo veremos en la lección de los errores comunes.",
      },
    ],
    ideaClave:
      "El griego tiene 24 letras y se lee como el español; el Señor es el Alfa y la Omega. Palabras como lógos (la Palabra), ágape (el amor que se da), cháris (gracia), pístis (fe y fidelidad), euangélion (buena noticia), ekklesía (asamblea), metánoia (cambio de mente) y koinonía (comunión) abren la riqueza del Nuevo Testamento.",
    paraLaVida: {
      texto: "Las palabras del Nuevo Testamento describen una vida nueva: gracia, fe, amor y comunión.",
      pregunta: "¿Cuál de estas palabras griegas quieres ver más en tu vida esta semana?",
    },
  },
  {
    id: "n5-idiomas-4",
    objetivos: [
      "Usar la concordancia de Strong y sus números para encontrar la palabra original.",
      "Explicar para qué sirven un interlineal, un diccionario expositivo y un léxico.",
      "Escoger herramientas confiables, impresas o digitales, para el estudio.",
    ],
    paraEmpezar:
      "No necesitas leer griego para descubrir qué palabra original hay detrás de un versículo. Basta con saber usar algunas herramientas.",
    bloques: [
      { t: "versiculo", ref: "Hechos 17:11" },
      {
        t: "parrafo",
        texto:
          "Los de Berea recibieron la palabra con toda solicitud, «escudriñando cada día las Escrituras para ver si estas cosas eran así». Las herramientas de estudio sirven para escudriñar mejor.",
      },
      { t: "subtitulo", texto: "La concordancia de Strong" },
      {
        t: "parrafo",
        texto:
          "James Strong publicó en 1890 una concordancia exhaustiva que da un número a cada palabra hebrea y griega de la Biblia. La Nueva concordancia Strong exhaustiva, en español, está hecha sobre la Reina-Valera 1960, y sus diccionarios del hebreo y del griego van por separado. Por ejemplo, ágape es el número 26 del griego y lógos el 3056; jésed es el 2617 del hebreo y shalom el 7965. Con ese número se encuentran el sentido de la palabra y todos los lugares donde aparece.",
      },
      { t: "subtitulo", texto: "Otras herramientas" },
      {
        t: "lista",
        items: [
          "El interlineal: el texto hebreo o griego con la traducción palabra por palabra debajo, como el Nuevo Testamento interlineal de Francisco Lacueva y el Antiguo Testamento interlineal de Ricardo Cerni.",
          "El diccionario expositivo: explica las palabras originales que hay detrás de las palabras en español, como el de W. E. Vine.",
          "El léxico: el diccionario de la lengua original, para quien ya conoce la gramática.",
          "Las Biblias de estudio y los programas digitales, que unen todo esto con los números de Strong.",
        ],
      },
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto:
          "El obrero aprobado es el que «usa bien la palabra de verdad». Las herramientas ayudan, pero no reemplazan la lectura atenta del contexto ni la guía del Espíritu Santo.",
      },
      {
        t: "nota",
        titulo: "Herramientas confiables",
        texto:
          "Prefiere obras reconocidas y fuentes que digan de dónde sacan sus datos. En internet abundan explicaciones de palabras hebreas y griegas que no tienen ningún fundamento.",
      },
    ],
    ideaClave:
      "La concordancia de Strong da un número a cada palabra hebrea y griega: con él se encuentran su sentido y los lugares donde aparece. El interlineal muestra el texto original palabra por palabra, el diccionario expositivo explica las palabras de fondo y el léxico sirve a quien conoce la gramática. Las herramientas ayudan a escudriñar, pero no reemplazan el contexto.",
    paraLaVida: {
      texto: "Las buenas herramientas convierten la curiosidad en estudio serio.",
      pregunta: "¿Qué herramienta vas a conseguir o aprender a usar este mes?",
    },
  },
  {
    id: "n5-idiomas-5",
    objetivos: [
      "Seguir los pasos de un estudio de palabras: la palabra original, sus usos, el contexto y el diccionario.",
      "Aplicar los pasos al estudio de la palabra hebrea jésed.",
      "Presentar con sencillez el resultado de un estudio de palabras.",
    ],
    paraEmpezar:
      "En el Salmo 136, la misma frase se repite en cada uno de sus veintiséis versículos. ¿Qué palabra hebrea hay detrás, y por qué importa tanto?",
    bloques: [
      { t: "subtitulo", texto: "Los pasos" },
      {
        t: "lista",
        items: [
          "Escoge una palabra importante del pasaje.",
          "Busca la palabra original y su número en la concordancia de Strong o en un interlineal.",
          "Mira dónde más aparece, sobre todo en el mismo libro y en el mismo autor.",
          "Lee cada uso en su contexto y anota los sentidos que encuentras.",
          "Consulta un diccionario expositivo para comparar.",
          "Vuelve al pasaje y pregunta qué sentido usa el autor allí.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo: jésed" },
      { t: "versiculo", ref: "Salmos 136:1-3" },
      {
        t: "parrafo",
        texto:
          "La palabra que la Reina-Valera traduce misericordia en «Porque para siempre es su misericordia» es jésed, el número 2617 del hebreo en la concordancia de Strong.",
      },
      { t: "versiculo", ref: "Éxodo 34:6" },
      {
        t: "parrafo",
        texto:
          "Aparece cuando Dios se revela a Moisés: «¡Jehová! ¡Jehová! fuerte, misericordioso y piadoso; tardo para la ira, y grande en misericordia y verdad». Aparece también en los pactos de Dios con su pueblo y en la lealtad entre personas, como la de Rut con su suegra (Rut 1:8; 3:10).",
      },
      {
        t: "parrafo",
        texto:
          "La conclusión del estudio: jésed es el amor leal de Dios, que cumple sus promesas a su pueblo aunque el pueblo falle. Cuando el Salmo 136 repite que su misericordia es para siempre, celebra un amor fiel que no se acaba.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=GBoth3FRATU", titulo: "Dios te ama, pero ¿eso qué significa?", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Un estudio para compartir",
        texto:
          "Al enseñar, no hace falta mostrar todos los pasos. Basta con explicar en palabras sencillas lo que descubriste y cómo cambia la lectura del pasaje.",
      },
    ],
    ideaClave:
      "Un estudio de palabras busca la palabra original con la concordancia de Strong o un interlineal, mira dónde más aparece, lee cada uso en su contexto, consulta un diccionario y vuelve al pasaje. Así, jésed, que la Reina-Valera traduce misericordia, resulta ser el amor leal de Dios, que cumple sus promesas aunque su pueblo falle.",
    paraLaVida: {
      texto: "La misericordia de Dios es un amor leal que no se acaba.",
      pregunta: "¿Qué palabra de tu lectura bíblica de esta semana vas a estudiar con estos pasos?",
    },
  },
  {
    id: "n5-idiomas-6",
    objetivos: [
      "Reconocer errores comunes en el uso del griego y del hebreo, como la falacia de la raíz y el anacronismo.",
      "Explicar por qué el contexto decide el sentido de una palabra.",
      "Usar los idiomas originales en la enseñanza con humildad y sencillez.",
    ],
    paraEmpezar:
      "Quizás has oído que el poder del evangelio es dinamita, porque en griego se dice dýnamis. Suena bien, pero es un error.",
    bloques: [
      { t: "versiculo", ref: "Romanos 1:16" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que el evangelio «es poder de Dios para salvación a todo aquel que cree». Poder traduce dýnamis. La dinamita se inventó en 1867, así que Pablo no podía pensar en ella: dýnamis es poder, fuerza, capacidad. Este error se llama anacronismo: leer en una palabra antigua un sentido que vino después.",
      },
      { t: "subtitulo", texto: "Errores que hay que evitar" },
      {
        t: "lista",
        items: [
          "La falacia de la raíz: creer que una palabra significa siempre lo que significaban sus partes. El sentido lo da el uso, no el origen de la palabra.",
          "El anacronismo: leer en una palabra antigua un sentido moderno.",
          "Cargar todos los sentidos a la vez: una palabra tiene varios sentidos, pero en cada pasaje el autor usa uno.",
          "Exagerar las diferencias entre sinónimos: a veces los autores usan dos palabras distintas para decir lo mismo.",
          "Corregir la traducción para lucirse: si no conoces bien la lengua, no digas que la Biblia está mal traducida.",
        ],
      },
      { t: "versiculo", ref: "Juan 21:15-17" },
      {
        t: "parrafo",
        texto:
          "En Juan 21, Jesús pregunta tres veces a Pedro si lo ama, y en griego usa dos verbos, agapáo y filéo. Algunos explican grandes diferencias entre ellos, pero Juan usa los dos para el amor del Padre al Hijo (Juan 3:35 y 5:20), así que no conviene basar la enseñanza en esa diferencia. El centro del pasaje es otro: Pedro, que había negado tres veces a Jesús, es restaurado tres veces y recibe el encargo de apacentar sus ovejas.",
      },
      { t: "subtitulo", texto: "El buen uso en la enseñanza" },
      {
        t: "lista",
        items: [
          "Explica la idea en español sencillo; menciona la palabra original solo si ayuda.",
          "Compara varias traducciones fieles antes de concluir.",
          "Deja que el contexto decida el sentido.",
          "Di de dónde sacas tus datos y reconoce lo que no sabes.",
        ],
      },
      { t: "versiculo", ref: "2 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "Pablo no andaba «con astucia, ni adulterando la palabra de Dios, sino por la manifestación de la verdad». El estudio de los idiomas sirve para ser más fieles al texto, no para impresionar.",
      },
      {
        t: "nota",
        titulo: "Para seguir aprendiendo",
        texto:
          "Si quieres aprender a leer el griego del Nuevo Testamento, un buen comienzo es Introducción al griego bíblico, de Anita Henriques, Nelson Morales y Daniel S. Steffen (Vida).",
      },
    ],
    ideaClave:
      "Hay errores comunes que se deben evitar: la falacia de la raíz, el anacronismo, como decir que dýnamis es dinamita, cargar todos los sentidos a la vez y exagerar las diferencias entre sinónimos. El contexto decide el sentido. En la enseñanza, el idioma original se usa con sencillez y humildad, para ser más fieles al texto y no para impresionar.",
    paraLaVida: {
      texto: "Conocer los idiomas originales debe hacerte más humilde y más fiel, no más orgulloso.",
      pregunta: "¿Qué explicación de una palabra bíblica que escuchaste necesitas revisar con estas herramientas?",
    },
  },
];
