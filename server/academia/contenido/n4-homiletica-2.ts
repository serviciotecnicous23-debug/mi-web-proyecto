/**
 * Nivel 4 · Materia 7 — Homilética II: predicación expositiva (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue a Homilética I (Nivel 3): predicar un pasaje de modo que su idea central sea la del sermón, del estudio del
 * texto a la idea homilética, según el género, con estructura, aplicación, Cristo en el centro y un llamado. Prepara el
 * sermón evaluado con rúbrica que pide el Nivel 4; la rúbrica de la lección 6 es la de la academia.
 */
import type { LeccionContenido } from "../tipos";

export const N4_HOMILETICA_2: LeccionContenido[] = [
  {
    id: "n4-homiletica-2-1",
    objetivos: [
      "Definir la predicación expositiva y distinguirla de otras maneras de predicar.",
      "Explicar su base bíblica: predicar la Palabra y todo el consejo de Dios.",
      "Valorar los beneficios de predicar pasajes y libros completos.",
    ],
    paraEmpezar:
      "En Homilética I aprendiste a preparar una enseñanza breve. Ahora darás un paso más: predicar un pasaje de modo que su idea central sea la idea central del sermón.",
    bloques: [
      { t: "versiculo", ref: "Hechos 20:26-27" },
      {
        t: "parrafo",
        texto:
          "Pablo les dijo a los ancianos de Éfeso: «no he rehuido anunciaros todo el consejo de Dios». La predicación expositiva explica y aplica un pasaje de la Biblia de modo que el mensaje del sermón sea el mensaje del texto. El texto no es un trampolín para hablar de otra cosa: es el que manda.",
      },
      { t: "subtitulo", texto: "Tres maneras de predicar" },
      {
        t: "lista",
        items: [
          "Temática: parte de un tema y reúne versículos de varios lugares. Es útil, pero corre el riesgo de sacar los textos de su contexto.",
          "Textual: parte de un versículo o de una frase y la desarrolla.",
          "Expositiva: parte de un pasaje completo, y su idea central gobierna todo el sermón.",
        ],
      },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Es lo que hacían los levitas en tiempos de Esdras: leían en el libro de la ley de Dios «claramente, y ponían el sentido, de modo que entendiesen la lectura». Y es lo que Pablo le pidió a Timoteo: predicar la palabra (2 Timoteo 4:2).",
      },
      { t: "subtitulo", texto: "Por qué predicar así" },
      {
        t: "lista",
        items: [
          "La autoridad está en la Palabra, no en el predicador.",
          "La iglesia aprende a leer la Biblia en su contexto.",
          "Al predicar libros completos se anuncia todo el consejo de Dios, también los temas difíciles.",
          "El predicador se protege de sus temas favoritos y de sus propias opiniones.",
        ],
      },
      { t: "versiculo", ref: "Hebreos 4:12" },
      {
        t: "parrafo",
        texto:
          "«Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos». El poder del sermón no está en la creatividad del predicador, sino en la Palabra que expone, aplicada por el Espíritu.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Expositiva no es aburrida",
        texto:
          "Predicar de manera expositiva no es leer un comentario en voz alta. Una buena exposición tiene una idea clara, estructura, ilustraciones y aplicación, y llega al corazón.",
      },
    ],
    ideaClave:
      "La predicación expositiva explica y aplica un pasaje de modo que el mensaje del sermón sea el mensaje del texto, como Pablo, que anunció todo el consejo de Dios. A diferencia de la temática y la textual, parte de un pasaje completo. Su poder está en la Palabra viva y eficaz, y protege a la iglesia de las opiniones del predicador.",
    paraLaVida: {
      texto: "Cuando el texto manda, Dios habla con más claridad que el predicador.",
      pregunta: "¿Qué libro de la Biblia te gustaría predicar completo, pasaje por pasaje, y por qué?",
    },
  },
  {
    id: "n4-homiletica-2-2",
    objetivos: [
      "Aplicar los pasos para estudiar un pasaje: su contexto histórico, literario y gramatical.",
      "Formular la idea exegética del pasaje y convertirla en la idea homilética del sermón.",
      "Explicar el puente entre el mundo bíblico y el de los oyentes.",
    ],
    paraEmpezar:
      "Entre el pasaje y el púlpito hay un camino: primero entender qué quiso decir el autor a sus lectores, y después qué dice hoy a tus oyentes.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto:
          "Usar bien la palabra de verdad exige trabajo. Haddon Robinson propone ir de la idea exegética, lo que el pasaje dijo a sus primeros lectores, a la idea homilética, la misma verdad dicha para los oyentes de hoy.",
      },
      { t: "subtitulo", texto: "Los pasos del estudio" },
      {
        t: "lista",
        items: [
          "El contexto histórico: quién escribió, a quién, cuándo y por qué.",
          "El contexto literario: qué hay antes y después, y de qué género es.",
          "Las palabras y la gramática: los verbos, los conectores y las palabras clave.",
          "La idea exegética: en una frase, con su tema y su complemento, lo que dijo el autor.",
          "La idea homilética: esa misma verdad, dicha de manera clara y fácil de recordar para hoy.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo: Filipenses 4:10-13" },
      { t: "versiculo", ref: "Filipenses 4:11-13" },
      {
        t: "parrafo",
        texto:
          "Pablo escribe desde la cárcel para agradecer una ofrenda. En su contexto, «Todo lo puedo en Cristo que me fortalece» no es una promesa de lograr cualquier meta, sino el secreto del contentamiento: «he aprendido a contentarme, cualquiera que sea mi situación». Idea exegética: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía. Idea homilética: en Cristo puedes estar contento en cualquier situación.",
      },
      { t: "subtitulo", texto: "El puente" },
      {
        t: "parrafo",
        texto:
          "Entre el mundo de la Biblia y el de hoy hay una distancia de idioma, de cultura y de tiempo. El predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto. Toda la Escritura sigue siendo útil hoy (2 Timoteo 3:16).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VdUHlPn_gTM", titulo: "Contexto en la narrativa bíblica", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Cuidado con el versículo suelto",
        texto:
          "Muchos errores de predicación vienen de sacar un versículo de su contexto, como Filipenses 4:13. Lee siempre el párrafo completo antes de predicar una frase.",
      },
    ],
    ideaClave:
      "Para predicar un pasaje se estudia su contexto histórico, literario y gramatical, y se escribe la idea exegética: lo que el autor dijo a sus lectores. Después se formula la idea homilética: la misma verdad dicha para hoy. El predicador construye un puente entre el mundo bíblico y el de sus oyentes, sin cambiar el sentido del texto.",
    paraLaVida: {
      texto: "Antes de decir qué significa para ti, pregunta qué significó para ellos.",
      pregunta: "¿Qué versículo has oído usar fuera de su contexto, y qué dice en realidad su párrafo?",
    },
  },
  {
    id: "n4-homiletica-2-3",
    objetivos: [
      "Explicar cómo predicar una narración, una epístola, un salmo, una parábola y un texto profético.",
      "Aplicar las preguntas propias de cada género al preparar un sermón.",
      "Evitar los errores comunes de cada género: alegorizar, moralizar o sacar versos sueltos.",
    ],
    paraEmpezar:
      "No se predica igual una historia que una carta, ni un salmo que una profecía. Cada género pide una manera propia de leer y de predicar.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "lista",
        items: [
          "Narración: busca la trama, el conflicto y lo que Dios hace; el héroe es Dios, no solo el personaje. Evita convertir cada historia en un consejo moral suelto.",
          "Epístola: sigue el argumento y sus conectores (por tanto, porque, pero) y predica párrafos, no frases aisladas.",
          "Poesía y salmos: atiende al paralelismo, a las imágenes y al sentimiento, y predica para que la iglesia ore y adore.",
          "Parábolas: busca el punto principal que Jesús quiso enseñar a sus oyentes; no conviertas cada detalle en un símbolo.",
          "Profecía: primero su mensaje en su tiempo, después su cumplimiento en Cristo y, con humildad, lo que falta por cumplirse.",
        ],
      },
      { t: "subtitulo", texto: "Un ejemplo con una narración" },
      { t: "versiculo", ref: "1 Samuel 17:45-47" },
      {
        t: "parrafo",
        texto:
          "La historia de David y Goliat no es ante todo un consejo para vencer tus gigantes. David mismo dice el punto: «Jehová no salva con espada y con lanza; porque de Jehová es la batalla». El sermón muestra al Dios que salva a su pueblo, y así apunta a Cristo, que venció a nuestro enemigo por nosotros.",
      },
      { t: "subtitulo", texto: "Un ejemplo con una parábola" },
      { t: "versiculo", ref: "Lucas 18:1-8" },
      {
        t: "parrafo",
        texto:
          "En la parábola del juez injusto, Lucas dice el punto antes de contarla: la necesidad «de orar siempre, y no desmayar». El juez no representa a Dios: es un contraste. Si un juez injusto atendió a la viuda, ¡cuánto más Dios hará justicia a sus escogidos!",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ThYkTFw_oBc", titulo: "Los estilos literarios en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "nota",
        titulo: "Que el género dé forma al sermón",
        texto:
          "Un buen sermón respeta el tono del texto: una historia se puede contar, un salmo puede llevar a la oración y una carta se puede razonar paso a paso.",
      },
    ],
    ideaClave:
      "Cada género se predica a su manera: en la narración el héroe es Dios; en la epístola se sigue el argumento; en la poesía se atiende a las imágenes y al sentimiento; en las parábolas se busca el punto principal; en la profecía, su tiempo, su cumplimiento en Cristo y lo que falta. Así se evita alegorizar, moralizar o sacar versos sueltos.",
    paraLaVida: {
      texto: "Respetar el género es respetar la manera en que Dios quiso hablar.",
      pregunta: "¿Qué historia bíblica has oído predicar como un simple consejo moral, y cuál era su punto sobre Dios?",
    },
  },
  {
    id: "n4-homiletica-2-4",
    objetivos: [
      "Organizar un sermón expositivo con introducción, puntos que salen del texto y conclusión.",
      "Distinguir el sermón deductivo del inductivo.",
      "Aplicar transiciones y un bosquejo que siga el movimiento del pasaje.",
    ],
    paraEmpezar:
      "Un sermón expositivo sigue el movimiento del texto: sus puntos salen del pasaje, en el orden en que el autor los desarrolla.",
    bloques: [
      { t: "versiculo", ref: "Hechos 2:36-38" },
      {
        t: "parrafo",
        texto:
          "El sermón de Pedro en Pentecostés tiene una estructura clara: parte de lo que la gente estaba viendo (Hechos 2:14-21), presenta a Jesús crucificado y resucitado con las Escrituras (2:22-35), resume su idea: «Dios le ha hecho Señor y Cristo», y termina con un llamado: «Arrepentíos, y bautícese cada uno de vosotros».",
      },
      { t: "subtitulo", texto: "Deductivo o inductivo" },
      {
        t: "lista",
        items: [
          "Deductivo: presenta la idea central al principio y después la explica, la prueba y la aplica.",
          "Inductivo: empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento.",
        ],
      },
      { t: "subtitulo", texto: "Los puntos salen del texto" },
      { t: "versiculo", ref: "Efesios 2:1-10" },
      {
        t: "parrafo",
        texto:
          "En Efesios 2:1-10, el texto mismo da el bosquejo: lo que éramos, muertos en pecados (2:1-3); lo que Dios hizo: «Pero Dios, que es rico en misericordia», nos dio vida con Cristo (2:4-7); y para qué: salvos por gracia para buenas obras (2:8-10). El predicador no inventa los puntos: los encuentra en el pasaje.",
      },
      {
        t: "lista",
        items: [
          "La idea central, escrita en una frase.",
          "Puntos que salen del texto y desarrollan esa idea.",
          "Transiciones que unen un punto con el siguiente.",
          "Una conclusión que repite la idea y llama a responder.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Menos es más",
        texto:
          "Un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas.",
      },
    ],
    ideaClave:
      "El sermón expositivo sigue el movimiento del pasaje: sus puntos salen del texto, en el orden del autor, y desarrollan una sola idea central. Puede ser deductivo, con la idea al principio, o inductivo, con la idea al final. Como Pedro en Pentecostés, tiene una introducción, un desarrollo con las Escrituras, la idea central y un llamado.",
    paraLaVida: {
      texto: "Deja que el pasaje te dé el bosquejo; no se lo impongas.",
      pregunta: "¿Qué bosquejo sale de un pasaje que te gustaría predicar, siguiendo su propio orden?",
    },
  },
  {
    id: "n4-homiletica-2-5",
    objetivos: [
      "Formular aplicaciones específicas a partir del propósito del pasaje.",
      "Mostrar a Cristo en el sermón y llevar a la gracia, no solo al esfuerzo.",
      "Hacer un llamado claro y respetuoso a responder a la Palabra.",
    ],
    paraEmpezar:
      "Un sermón que explica bien el texto pero no toca la vida está incompleto. La Palabra pide una respuesta.",
    bloques: [
      { t: "versiculo", ref: "Santiago 1:22-25" },
      {
        t: "parrafo",
        texto:
          "El que oye y no hace es como quien se mira en un espejo y olvida cómo es; pero el que persevera en la Palabra «será bienaventurado en lo que hace». La aplicación responde a la pregunta: ¿qué quiere Dios que hagamos con esta verdad?",
      },
      { t: "subtitulo", texto: "Aplicar con precisión" },
      {
        t: "lista",
        items: [
          "Sale del propósito del pasaje, no de las ideas del predicador.",
          "Es específica: dice qué hacer, cuándo y con quién.",
          "Habla a distintos oyentes: el joven, la familia, el que duda, el que sufre.",
          "Se aplica primero al predicador.",
        ],
      },
      { t: "subtitulo", texto: "Cristo y la gracia" },
      { t: "versiculo", ref: "1 Corintios 2:1-2" },
      { t: "versiculo", ref: "2 Corintios 5:20-21" },
      {
        t: "parrafo",
        texto:
          "Pablo se propuso no saber entre los corintios «cosa alguna sino a Jesucristo, y a éste crucificado». Es el versículo de memoria de esta materia. Predicaba como embajador: «os rogamos en nombre de Cristo: Reconciliaos con Dios». Todo sermón debe mostrar lo que Cristo hizo, para que la obediencia nazca de la gracia y no solo del esfuerzo humano.",
      },
      { t: "subtitulo", texto: "El llamado" },
      { t: "versiculo", ref: "Hechos 2:37-41" },
      {
        t: "parrafo",
        texto:
          "Al final, el predicador invita a responder: a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar. El llamado es claro, sincero y sin presión manipuladora: la decisión es obra del Espíritu en el corazón. En Pentecostés, «los que recibieron su palabra fueron bautizados».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Ilustrar con la verdad",
        texto:
          "Como en Homilética I, las ilustraciones deben ser verdaderas, respetuosas y breves, y estar al servicio del texto.",
      },
    ],
    ideaClave:
      "La aplicación sale del propósito del pasaje, es específica, habla a distintos oyentes y empieza por el predicador. El sermón muestra a Cristo crucificado, para que la obediencia nazca de la gracia. Y termina con un llamado claro y sin manipulación, confiando en que el Espíritu obra en el corazón.",
    paraLaVida: {
      texto: "Predica a Cristo: él es el centro y el poder de todo sermón.",
      pregunta: "¿Qué aplicación concreta y qué llamado haría el último pasaje que estudiaste?",
    },
  },
  {
    id: "n4-homiletica-2-6",
    objetivos: [
      "Preparar la entrega del sermón: las notas, la voz, el tiempo y la presencia.",
      "Usar la rúbrica de la academia para evaluar un sermón.",
      "Preparar el sermón evaluado con rúbrica que pide el Nivel 4.",
    ],
    paraEmpezar:
      "Para cerrar el Nivel 4 se pide un sermón evaluado con rúbrica. Esta lección te muestra cómo se evaluará y cómo prepararte.",
    bloques: [
      { t: "versiculo", ref: "1 Timoteo 4:13-16" },
      {
        t: "parrafo",
        texto:
          "Pablo le pidió a Timoteo: «ocúpate en la lectura, la exhortación y la enseñanza», y también: «Ten cuidado de ti mismo y de la doctrina». La entrega importa, pero el predicador se prepara primero a sí mismo.",
      },
      { t: "subtitulo", texto: "La entrega" },
      {
        t: "lista",
        items: [
          "Usa notas breves o un bosquejo; no leas todo el manuscrito.",
          "Habla con naturalidad, mirando a la congregación.",
          "Respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos.",
          "Ora antes y depende del Espíritu Santo.",
        ],
      },
      { t: "subtitulo", texto: "La rúbrica del sermón" },
      {
        t: "lista",
        items: [
          "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje (25 puntos).",
          "Una idea central clara y un propósito definido (15 puntos).",
          "Estructura: puntos que salen del texto y transiciones (15 puntos).",
          "Cristo y la gracia en el centro, sin forzar el texto (15 puntos).",
          "Aplicación concreta e ilustraciones verdaderas (15 puntos).",
          "Entrega: claridad, contacto con los oyentes y tiempo (15 puntos).",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Un maestro de la academia evalúa el sermón con esta rúbrica, y se aprueba con 70 puntos. Cómo presentarlo, grabado o en vivo, lo indicará la academia cuando llegues a ese requisito. Mientras tanto, practica con ella.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      {
        t: "nota",
        titulo: "Escúchate a ti mismo",
        texto:
          "Grábate y escúchate antes de presentar tu sermón. Pide a un hermano maduro que use la rúbrica contigo y te diga qué mejorar.",
      },
    ],
    ideaClave:
      "Para la entrega se usan notas breves, se habla con naturalidad, se respeta el tiempo y se depende del Espíritu, cuidando primero la propia vida y la doctrina. El sermón del Nivel 4 se evalúa con una rúbrica de 100 puntos: fidelidad al texto, idea central, estructura, Cristo, aplicación y entrega; se aprueba con 70.",
    paraLaVida: {
      texto: "Prepárate a ti mismo antes de preparar el sermón.",
      pregunta: "¿Qué parte de la rúbrica te cuesta más, y cómo vas a practicarla antes de presentar tu sermón?",
    },
  },
];
