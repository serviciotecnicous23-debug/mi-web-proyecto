/**
 * Nivel 4 · Materia 9 — Apologética (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Dar razones de la fe con mansedumbre y reverencia: la existencia de Dios, la confiabilidad de la Biblia, la
 * resurrección, el problema del mal y las sectas. Los datos de la arqueología y de la historia se comprobaron en sus
 * fuentes; los grupos se describen por lo que ellos mismos enseñan, sin burla.
 */
import type { LeccionContenido } from "../tipos";

export const N4_APOLOGETICA: LeccionContenido[] = [
  {
    id: "n4-apologetica-1",
    objetivos: [
      "Explicar qué es la apologética y su base bíblica en 1 Pedro 3:15.",
      "Describir la actitud con que se defiende la fe: mansedumbre y reverencia.",
      "Analizar cómo Pablo razonó con judíos y con griegos.",
    ],
    paraEmpezar:
      "Un compañero te pregunta por qué crees en Jesús. ¿Qué le dirías? La apologética te prepara para dar razones de tu fe con amor.",
    bloques: [
      { t: "versiculo", ref: "1 Pedro 3:15" },
      {
        t: "parrafo",
        texto:
          "Pedro pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros». La palabra griega que se traduce defensa es apología: de ahí viene apologética, la tarea de dar razones de la fe. No es pelear ni ganar discusiones, sino ayudar a otros a ver que la fe en Cristo es verdadera y razonable. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Con mansedumbre y reverencia" },
      { t: "versiculo", ref: "2 Timoteo 2:24-25" },
      {
        t: "parrafo",
        texto:
          "«el siervo del Señor no debe ser contencioso, sino amable para con todos, apto para enseñar, sufrido». La manera importa tanto como el argumento: se defiende la fe con respeto por la persona, escuchando sus preguntas y sin burlarse. Y siempre recordamos que solo el Espíritu Santo convence de pecado (Juan 16:8) y que la fe es un regalo de Dios.",
      },
      { t: "subtitulo", texto: "El ejemplo de Pablo" },
      { t: "versiculo", ref: "Hechos 17:2-3" },
      {
        t: "parrafo",
        texto:
          "En Tesalónica, Pablo «discutió con ellos, declarando y exponiendo por medio de las Escrituras, que era necesario que el Cristo padeciese, y resucitase de los muertos». Con los judíos partía de las Escrituras; en Atenas, con los griegos, partió de lo que ellos conocían: su altar al Dios no conocido y sus poetas (Hechos 17:22-31). El mensaje era el mismo, pero dicho para sus oyentes.",
      },
      { t: "versiculo", ref: "2 Corintios 10:5" },
      {
        t: "parrafo",
        texto:
          "Pablo habla también de derribar argumentos y de llevar «cautivo todo pensamiento a la obediencia a Cristo». La apologética sirve para quitar los obstáculos que impiden escuchar el evangelio y para fortalecer la fe de los creyentes que tienen dudas.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia" },
      {
        t: "nota",
        titulo: "La pregunta detrás de la pregunta",
        texto:
          "Muchas veces una pregunta sobre Dios esconde un dolor o una mala experiencia. Escucha primero: a veces la persona necesita compasión antes que argumentos.",
      },
    ],
    ideaClave:
      "La apologética es dar razones de la fe, como pide 1 Pedro 3:15: siempre preparados, con mansedumbre y reverencia. No es pelear, sino quitar obstáculos para que otros escuchen el evangelio y fortalecer a los que dudan. Pablo razonaba desde las Escrituras con los judíos y desde lo que conocían con los griegos, confiando en que el Espíritu convence.",
    paraLaVida: {
      texto: "Prepararte para responder es una forma de amar a quien pregunta.",
      pregunta: "¿Qué pregunta sobre la fe te han hecho que no supiste responder, y cómo te prepararás?",
    },
  },
  {
    id: "n4-apologetica-2",
    objetivos: [
      "Explicar el argumento del comienzo del universo, el del diseño y el moral.",
      "Relacionar estos argumentos con lo que enseñan Salmos 19 y Romanos 1 y 2.",
      "Evaluar el alcance de los argumentos: muestran que la fe es razonable, pero no reemplazan la fe.",
    ],
    paraEmpezar:
      "La Biblia no empieza probando que Dios existe, pero da pistas de por qué creer en él es razonable: la creación, el orden del mundo y la conciencia.",
    bloques: [
      { t: "versiculo", ref: "Romanos 1:20" },
      {
        t: "parrafo",
        texto:
          "Pablo afirma que el «eterno poder y deidad» de Dios se hacen claramente visibles desde la creación del mundo. A lo largo de la historia, los creyentes han presentado varios argumentos que muestran que creer en Dios es razonable.",
      },
      { t: "subtitulo", texto: "Todo lo que comienza tiene una causa" },
      { t: "versiculo", ref: "Génesis 1:1" },
      {
        t: "parrafo",
        texto:
          "Lo que comienza a existir tiene una causa. La ciencia moderna habla de un comienzo del universo. Si el universo comenzó, necesita una causa que esté fuera del tiempo, del espacio y de la materia: eterna, inmensamente poderosa y personal, capaz de decidir crear. Eso concuerda con la primera frase de la Biblia: «En el principio creó Dios los cielos y la tierra».",
      },
      { t: "subtitulo", texto: "El orden y el diseño" },
      { t: "versiculo", ref: "Salmos 19:1" },
      {
        t: "parrafo",
        texto:
          "El universo muestra orden y precisión: leyes estables, medidas exactas que permiten la vida y, en los seres vivos, una información compleja como la del ADN. Así como un reloj hace pensar en un relojero, el orden del mundo apunta a una mente que lo diseñó: «Los cielos cuentan la gloria de Dios».",
      },
      { t: "subtitulo", texto: "La ley moral" },
      { t: "versiculo", ref: "Romanos 2:14-15" },
      {
        t: "parrafo",
        texto:
          "Todos sabemos que algunas cosas están mal siempre, como torturar a un niño por diversión. Esa ley moral que todos reconocen, aunque no la cumplan, apunta a un Legislador moral. Pablo dice que la obra de la ley está escrita en el corazón, «dando testimonio su conciencia».",
      },
      { t: "subtitulo", texto: "Lo que pueden y lo que no pueden hacer" },
      { t: "versiculo", ref: "Hebreos 11:6" },
      {
        t: "parrafo",
        texto:
          "Estos argumentos no obligan a nadie a creer ni llevan por sí solos a Cristo: muestran que la fe es razonable y quitan excusas. Para conocer a Dios como Padre hace falta la revelación de su Palabra y la obra del Espíritu, porque «sin fe es imposible agradar a Dios».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "La ciencia y la fe",
        texto:
          "La fe bíblica no le teme a la ciencia: muchos de sus pioneros, como Kepler, Newton y Pasteur, creían en Dios. Lo que la Biblia rechaza no es la ciencia, sino la idea de que el universo no tiene Creador.",
      },
    ],
    ideaClave:
      "Creer en Dios es razonable. Lo que comienza a existir tiene una causa, y el universo comenzó; el orden y el diseño del mundo apuntan a una mente; la ley moral escrita en la conciencia apunta a un Legislador. Estos argumentos muestran que la fe es razonable, pero para conocer a Dios hacen falta su Palabra y la fe.",
    paraLaVida: {
      texto: "La creación entera habla de Dios: aprende a escucharla y a señalarla.",
      pregunta: "¿Cuál de estos argumentos te parece más claro para conversar con un amigo que duda, y por qué?",
    },
  },
  {
    id: "n4-apologetica-3",
    objetivos: [
      "Explicar por qué el texto de la Biblia que tenemos es confiable.",
      "Describir hallazgos de la arqueología que confirman datos bíblicos.",
      "Explicar el valor de las profecías cumplidas y de la unidad de la Biblia.",
    ],
    paraEmpezar:
      "Muchos dicen que la Biblia es un libro de mitos o que se cambió con los siglos. Hay buenas razones para confiar en ella.",
    bloques: [
      { t: "versiculo", ref: "Lucas 1:1-4" },
      {
        t: "parrafo",
        texto:
          "Lucas escribió después de haber «investigado con diligencia todas las cosas desde su origen», para que Teófilo conociera «bien la verdad». La Biblia no se presenta como un libro de mitos, sino como el testimonio de hechos reales, en lugares y tiempos concretos.",
      },
      { t: "subtitulo", texto: "Un texto bien conservado" },
      {
        t: "parrafo",
        texto:
          "Del Nuevo Testamento se conservan más de cinco mil manuscritos griegos, muchos más que de cualquier otro libro antiguo, y algunos fragmentos son de pocas generaciones después de los apóstoles. Los rollos del mar Muerto mostraron que el Antiguo Testamento se copió con gran fidelidad durante unos mil años. No tenemos los originales, pero sí podemos saber con gran seguridad lo que decían.",
      },
      { t: "subtitulo", texto: "La arqueología" },
      {
        t: "lista",
        items: [
          "Una inscripción hallada en Tel Dan en 1993 menciona la casa de David, el rey que algunos decían que nunca existió.",
          "Una piedra hallada en Cesarea en 1961 lleva el nombre de Poncio Pilato, el gobernador que juzgó a Jesús.",
          "El estanque de Siloé, donde Jesús mandó lavarse a un ciego (Juan 9:7), se descubrió en Jerusalén en 2004.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La arqueología no prueba la fe, pero una y otra vez ha confirmado nombres, lugares y costumbres que la Biblia menciona.",
      },
      { t: "subtitulo", texto: "Profecías cumplidas y un solo mensaje" },
      { t: "versiculo", ref: "Isaías 46:9-10" },
      {
        t: "parrafo",
        texto:
          "Dios dice que él anuncia «lo por venir desde el principio». Profecías como el nacimiento en Belén (Miqueas 5:2) o el siervo sufriente (Isaías 53) se cumplieron en Jesús siglos después. Y aunque la Biblia se escribió a lo largo de unos mil quinientos años, por unos cuarenta autores, tiene un solo mensaje: Dios rescata a su pueblo por medio de Cristo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Una confianza razonable",
        texto:
          "Estas evidencias no reemplazan el testimonio del Espíritu Santo, que nos asegura que la Biblia es la Palabra de Dios, pero muestran que confiar en ella no es ciego ni irracional.",
      },
    ],
    ideaClave:
      "La Biblia es confiable: se presenta como testimonio de hechos reales; su texto se conservó en miles de manuscritos; la arqueología ha confirmado nombres y lugares como la casa de David, Poncio Pilato y el estanque de Siloé; y sus profecías cumplidas y su mensaje único a lo largo de siglos muestran su origen divino.",
    paraLaVida: {
      texto: "Puedes leer la Biblia con confianza: es la verdad de Dios en la historia.",
      pregunta: "¿Qué evidencia de esta lección te ayudaría a responder a alguien que dice que la Biblia es un libro de mitos?",
    },
  },
  {
    id: "n4-apologetica-4",
    objetivos: [
      "Explicar por qué la resurrección es el centro de la fe cristiana.",
      "Describir los hechos que sostienen la resurrección: la muerte, la tumba vacía, las apariciones y el cambio de los discípulos.",
      "Evaluar las explicaciones alternativas y por qué no explican los hechos.",
    ],
    paraEmpezar:
      "Pablo dijo que si Cristo no resucitó, nuestra fe es vana. La fe cristiana se apoya en un hecho de la historia: la resurrección de Jesús.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 15:14" },
      { t: "versiculo", ref: "1 Corintios 15:3-8" },
      {
        t: "parrafo",
        texto:
          "«Y si Cristo no resucitó, vana es entonces nuestra predicación, vana es también vuestra fe». Pablo transmite un resumen muy antiguo del evangelio: que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día, y que se apareció a Pedro, a los doce, a más de quinientos hermanos a la vez, a Jacobo y a todos los apóstoles. Y añade que muchos de esos testigos vivían todavía cuando él escribió.",
      },
      { t: "subtitulo", texto: "Los hechos" },
      {
        t: "lista",
        items: [
          "Jesús murió crucificado: lo cuentan los evangelios y también historiadores no cristianos, como Tácito.",
          "La tumba estaba vacía: las primeras testigos fueron mujeres, algo que nadie habría inventado en esa cultura, y las autoridades nunca mostraron el cuerpo.",
          "Muchos lo vieron vivo, en distintos lugares y momentos, solos y en grupo.",
          "Los discípulos cambiaron: de esconderse con miedo pasaron a anunciarlo con valor, aun a costa de su vida.",
          "Enemigos y escépticos creyeron: Pablo, que perseguía a la iglesia, y Jacobo, el hermano de Jesús, que antes no creía en él (Juan 7:5).",
        ],
      },
      { t: "subtitulo", texto: "Las otras explicaciones" },
      { t: "versiculo", ref: "Hechos 2:24" },
      {
        t: "parrafo",
        texto:
          "Se ha dicho que los discípulos robaron el cuerpo, pero nadie da la vida por lo que sabe que es mentira. Se ha dicho que Jesús solo se desmayó, pero los soldados romanos sabían matar, y un hombre medio muerto no convence a nadie de que venció a la muerte. Se ha dicho que fueron alucinaciones, pero quinientas personas no tienen la misma alucinación a la vez, y una alucinación no vacía una tumba. La explicación que da cuenta de todos los hechos es la de los testigos: Jesús, «al cual Dios levantó, sueltos los dolores de la muerte».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Más que un argumento",
        texto:
          "La resurrección no es solo un hecho que se defiende: es una persona viva a quien se conoce. Cristo resucitado sigue transformando vidas hoy.",
      },
    ],
    ideaClave:
      "La resurrección es el centro de la fe: si Cristo no resucitó, vana es nuestra fe. La sostienen hechos: su muerte, la tumba vacía, las apariciones a muchos testigos y el cambio de los discípulos y de escépticos como Pablo y Jacobo. El robo, el desmayo y las alucinaciones no explican los hechos: Dios lo levantó.",
    paraLaVida: {
      texto: "Tu fe descansa en una tumba vacía y en un Señor vivo.",
      pregunta: "¿Cómo le contarías a un amigo, en tres frases, por qué crees que Jesús resucitó?",
    },
  },
  {
    id: "n4-apologetica-5",
    objetivos: [
      "Explicar la pregunta de por qué un Dios bueno permite el mal.",
      "Describir las respuestas bíblicas: la libertad humana, la caída, la cruz y la esperanza final.",
      "Aplicar estas verdades con compasión a quien sufre.",
    ],
    paraEmpezar:
      "Si Dios es bueno y todopoderoso, ¿por qué hay tanto sufrimiento? Es una de las preguntas más difíciles, y la Biblia no la esquiva.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:31" },
      { t: "versiculo", ref: "Romanos 5:12" },
      {
        t: "parrafo",
        texto:
          "Dios creó un mundo «bueno en gran manera». El mal no viene de Dios: entró en el mundo por la desobediencia humana: «el pecado entró en el mundo por un hombre, y por el pecado la muerte». Dios creó personas capaces de amar, y el amor verdadero necesita libertad; esa libertad incluía la posibilidad de rechazarlo.",
      },
      { t: "subtitulo", texto: "Dios no está lejos del dolor" },
      { t: "versiculo", ref: "Romanos 8:18" },
      { t: "versiculo", ref: "Romanos 8:28" },
      {
        t: "parrafo",
        texto:
          "Dios no siempre explica cada sufrimiento, como vimos con Job, pero promete obrar aun en el dolor: «a los que aman a Dios, todas las cosas les ayudan a bien». Y Pablo afirma que «las aflicciones del tiempo presente no son comparables con la gloria venidera».",
      },
      { t: "subtitulo", texto: "La respuesta de la cruz" },
      {
        t: "parrafo",
        texto:
          "La respuesta más profunda de Dios al mal no es una teoría, sino la cruz: el Hijo de Dios entró en nuestro sufrimiento, cargó el mal sobre sí y lo venció con su resurrección. Un Dios que sufrió por nosotros no es indiferente al dolor.",
      },
      { t: "versiculo", ref: "Apocalipsis 21:4" },
      {
        t: "parrafo",
        texto:
          "Y la historia no termina en el mal. Dios promete un mundo nuevo, donde «Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=A3ifTHYTmMQ", titulo: "Resumen del libro de Job", fuente: "Proyecto Biblia", minutos: 13 },
      {
        t: "nota",
        titulo: "Primero, la compasión",
        texto:
          "Con quien sufre, primero acompaña y llora; los argumentos vienen después, si los pide. Jesús lloró ante la tumba de Lázaro antes de resucitarlo (Juan 11:35).",
      },
    ],
    ideaClave:
      "El mal no viene de Dios: entró por la desobediencia humana en un mundo creado bueno y con libertad para amar. Dios no siempre explica cada dolor, pero obra en él para bien, sufrió con nosotros en la cruz, venció el mal con la resurrección y promete un mundo sin lágrimas. Con quien sufre, primero la compasión.",
    paraLaVida: {
      texto: "Cuando el dolor no tiene explicación, la cruz te recuerda que Dios no es indiferente.",
      pregunta: "¿Cómo acompañarías a alguien que pregunta por qué Dios permitió su sufrimiento?",
    },
  },
  {
    id: "n4-apologetica-6",
    objetivos: [
      "Reconocer las señales de una secta o de una falsa doctrina.",
      "Describir las enseñanzas principales de algunos grupos que niegan la fe bíblica.",
      "Aplicar una manera bíblica y amable de responder a quienes los siguen.",
    ],
    paraEmpezar:
      "Tocan a tu puerta dos personas muy amables con un folleto sobre la Biblia. ¿Cómo sabes si lo que enseñan es el evangelio?",
    bloques: [
      { t: "versiculo", ref: "1 Juan 4:1-3" },
      {
        t: "parrafo",
        texto:
          "Juan advierte: «no creáis a todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas han salido por el mundo». Una secta es un grupo que dice seguir a Cristo o la Biblia, pero niega verdades centrales de la fe.",
      },
      { t: "subtitulo", texto: "Tres preguntas para examinar" },
      {
        t: "lista",
        items: [
          "¿Quién es Jesús? ¿Lo confiesan como el Hijo eterno, Dios hecho hombre, o lo hacen un ángel, una criatura o un maestro más?",
          "¿Cuál es el evangelio? ¿La salvación es por gracia por medio de la fe, o por cumplir las reglas del grupo?",
          "¿Cuál es la autoridad? ¿La Biblia, o la Biblia más otro libro, un profeta o un líder que no se puede cuestionar?",
        ],
      },
      { t: "versiculo", ref: "Gálatas 1:8" },
      {
        t: "parrafo",
        texto:
          "Pablo fue tajante: si alguno anuncia «otro evangelio diferente del que os hemos anunciado, sea anatema». No importa cuán amable o convincente parezca el mensajero.",
      },
      { t: "subtitulo", texto: "Algunos ejemplos" },
      {
        t: "lista",
        items: [
          "Los Testigos de Jehová niegan la Trinidad y la deidad de Cristo, y usan una traducción propia de la Biblia.",
          "Los mormones añaden a la Biblia el Libro de Mormón y otros escritos, y enseñan que Dios fue antes un hombre.",
          "El evangelio de la prosperidad promete riqueza y salud a cambio de fe o de ofrendas, y convierte a Dios en un medio para obtener cosas.",
          "Los grupos unicitarios niegan que Dios exista en tres personas, como se estudió en Teología sistemática I.",
        ],
      },
      { t: "versiculo", ref: "2 Timoteo 2:24-26" },
      {
        t: "parrafo",
        texto:
          "Las personas que siguen estos grupos no son enemigos, sino gente que Dios ama y que a veces busca a Dios con sinceridad. Se les responde con la Biblia, con paciencia y con amabilidad, «por si quizá Dios les conceda que se arrepientan para conocer la verdad».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=wQtMnuBzb4c", titulo: "Resumen de los libros de 1-3 Juan", fuente: "Proyecto Biblia", minutos: 11 },
      {
        t: "nota",
        titulo: "Conoce bien la verdad",
        texto:
          "La mejor defensa contra el error es conocer bien la verdad: leer la Biblia, aprender las doctrinas básicas y estar unido a una iglesia sana. Los cajeros aprenden a reconocer los billetes falsos estudiando bien los verdaderos.",
      },
    ],
    ideaClave:
      "Hay que probar los espíritus: una secta dice seguir a Cristo o la Biblia, pero niega verdades centrales. Tres preguntas la descubren: quién es Jesús, cuál es el evangelio y cuál es la autoridad. A quienes siguen estos grupos se les responde con la Biblia, con paciencia y con amor, y la mejor defensa es conocer bien la verdad.",
    paraLaVida: {
      texto: "Conocer bien la verdad te protege del error y te prepara para ayudar a otros.",
      pregunta: "¿Qué harías si alguien de tu familia empieza a seguir un grupo que niega la deidad de Cristo?",
    },
  },
];
