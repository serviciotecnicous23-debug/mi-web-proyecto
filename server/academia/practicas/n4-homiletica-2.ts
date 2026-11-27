/**
 * Las prácticas de «Homilética II: predicación expositiva» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-homiletica-2.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_HOMILETICA_2: PracticasMateria = {
  materia: "n4-homiletica-2",
  mision: {
    titulo: "Del pasaje al púlpito: tu sermón del Nivel 4",
    intro: "Tu pastor te pidió predicar en un culto de la iglesia, y será también tu ensayo para el sermón evaluado con rúbrica que pide el Nivel 4. Vas a recorrer todo el camino: escoger un pasaje y dejar que el texto mande, estudiar su contexto, pasar de la idea exegética a la homilética, respetar su género, armar un bosquejo que siga el pasaje, aplicarlo con Cristo en el centro, hacer un llamado claro y preparar tu entrega. Repasa las seis lecciones para tener listo cada paso.",
    cierre: "Ya sabes preparar un sermón expositivo: dejar que el texto mande, estudiar el pasaje en su contexto, decir su verdad para hoy sin cambiar su sentido, respetar su género, seguir su movimiento, aplicarlo con precisión, mostrar a Cristo y llamar a responder sin presión. Cuando el texto manda, Dios habla con más claridad que el predicador.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La predicación expositiva
    "n4-homiletica-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace la predicación expositiva con un pasaje de la Biblia?", reverso: "Lo explica y lo aplica, de modo que el mensaje del sermón sea el mensaje del texto.", apoyo: "La predicación expositiva explica y aplica un pasaje de la Biblia de modo que el mensaje del sermón sea el mensaje del texto" },
              { frente: "En la predicación expositiva, ¿qué lugar tiene el texto?", reverso: "Es el que manda: no es un trampolín para hablar de otra cosa.", apoyo: "El texto no es un trampolín para hablar de otra cosa: es el que manda" },
              { frente: "¿De qué parte la predicación temática?", reverso: "De un tema, y reúne versículos de varios lugares.", apoyo: "Temática: parte de un tema y reúne versículos de varios lugares" },
              { frente: "¿De qué parte la predicación textual?", reverso: "De un versículo o de una frase, que desarrolla.", apoyo: "Textual: parte de un versículo o de una frase y la desarrolla" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué parte la predicación expositiva?", reverso: "De un pasaje completo, cuya idea central gobierna todo el sermón.", apoyo: "Expositiva: parte de un pasaje completo, y su idea central gobierna todo el sermón" },
              { frente: "¿Qué riesgo corre la predicación temática?", reverso: "Sacar los textos de su contexto.", apoyo: "Es útil, pero corre el riesgo de sacar los textos de su contexto" },
              { frente: "¿Es lo mismo predicar de manera expositiva que leer un comentario en voz alta?", reverso: "No: una buena exposición tiene idea clara, estructura, ilustraciones y aplicación.", apoyo: "Predicar de manera expositiva no es leer un comentario en voz alta" },
              { frente: "Cuando el texto manda, ¿quién habla con más claridad?", reverso: "Dios, con más claridad que el predicador.", apoyo: "Cuando el texto manda, Dios habla con más claridad que el predicador" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es predicación temática, textual o expositiva? Lleva cada frase a su grupo.",
            grupos: ["Temática", "Textual", "Expositiva"],
            frases: [
              { texto: "Parte de un tema y reúne versículos de varios lugares", grupo: 0 },
              { texto: "Junta versículos de distintos libros sobre un mismo asunto", grupo: 0 },
              { texto: "Corre el riesgo de sacar los textos de su contexto", grupo: 0 },
              { texto: "Parte de un versículo o de una frase y la desarrolla", grupo: 1 },
              { texto: "Toma una sola frase de la Biblia como punto de partida", grupo: 1 },
              { texto: "Parte de un pasaje completo", grupo: 2 },
              { texto: "La idea central del pasaje gobierna todo el sermón", grupo: 2 },
              { texto: "El mensaje del sermón es el mensaje del texto", grupo: 2 },
            ],
            apoyo: "A diferencia de la temática y la textual, parte de un pasaje completo",
            ref: "Hechos 20:27",
            explica: "La temática parte de un tema y reúne versículos de varios lugares; la textual parte de un versículo o de una frase; la expositiva parte de un pasaje completo, y su idea central gobierna todo el sermón.",
          },
          {
            consigna: "¿Qué manera de predicar muestra cada ejemplo: temática, textual o expositiva? Lleva cada frase a su grupo.",
            grupos: ["Temática", "Textual", "Expositiva"],
            frases: [
              { texto: "Un sermón sobre la oración con versículos de cinco libros", grupo: 0 },
              { texto: "Una serie sobre la familia con textos de aquí y de allá", grupo: 0 },
              { texto: "Un mensaje que desarrolla una sola frase de Hebreos 4:12", grupo: 1 },
              { texto: "Un sermón que toma 2 Timoteo 4:2 y desarrolla sus frases", grupo: 1 },
              { texto: "Predicar un libro de la Biblia, pasaje por pasaje", grupo: 2 },
              { texto: "Predicar un pasaje entero y dejar que su idea guíe el sermón", grupo: 2 },
              { texto: "Explicar y aplicar un pasaje completo, sin usarlo de trampolín", grupo: 2 },
            ],
            apoyo: "Expositiva: parte de un pasaje completo, y su idea central gobierna todo el sermón",
            explica: "Reunir versículos de varios lugares sobre un tema es predicación temática; desarrollar un versículo o una frase es textual; y partir de un pasaje completo, dejando que su idea gobierne el sermón, es expositiva.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Pablo habló a los ancianos de Éfeso. ¿Qué no rehuyó anunciarles? Toca las palabras que lo dicen.",
            texto: "no he rehuido anunciaros [[todo el consejo de Dios]]",
            apoyo: "Pablo les dijo a los ancianos de Éfeso: «no he rehuido anunciaros todo el consejo de Dios»",
            ref: "Hechos 20:27",
            explica: "Pablo no rehuyó anunciar todo el consejo de Dios. Así también, al predicar libros completos se anuncia todo el consejo de Dios, también los temas difíciles.",
          },
          {
            consigna: "En tiempos de Esdras, los levitas leían la ley claramente. ¿Qué hacían además para que entendieran la lectura? Toca las palabras que lo dicen.",
            texto: "claramente, y [[ponían el sentido]], de modo que entendiesen la lectura",
            apoyo: "Es lo que hacían los levitas en tiempos de Esdras",
            ref: "Nehemías 8:8",
            explica: "Los levitas leían en el libro de la ley de Dios claramente y ponían el sentido, de modo que entendieran la lectura: eso hace la predicación expositiva.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la base bíblica de la predicación expositiva: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo les dijo a los ancianos de Éfeso que no rehuyó anunciarles todo el consejo de Dios.", verdad: true, explica: "Así lo dijo: «no he rehuido anunciaros todo el consejo de Dios».", apoyo: "Pablo les dijo a los ancianos de Éfeso: «no he rehuido anunciaros todo el consejo de Dios»", ref: "Hechos 20:27" },
              { texto: "Pablo le pidió a Timoteo que predicara sus propias opiniones.", verdad: false, explica: "Pablo le pidió a Timoteo que predicara la palabra; y la predicación expositiva protege a la iglesia de las opiniones del predicador.", apoyo: "Y es lo que Pablo le pidió a Timoteo: predicar la palabra (2 Timoteo 4:2)", ref: "2 Timoteo 4:2" },
              { texto: "En tiempos de Esdras, los levitas leían la ley y ponían el sentido.", verdad: true, explica: "Leían en el libro de la ley de Dios «claramente, y ponían el sentido, de modo que entendiesen la lectura».", apoyo: "Es lo que hacían los levitas en tiempos de Esdras", ref: "Nehemías 8:8" },
            ],
          },
          {
            consigna: "Sobre la Palabra que se predica: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según Hebreos 4:12, la palabra de Dios es viva y eficaz.", verdad: true, explica: "«Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos».", apoyo: "«Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos»", ref: "Hebreos 4:12" },
              { texto: "Los levitas leían la ley de prisa, sin explicar su sentido.", verdad: false, explica: "La leían «claramente, y ponían el sentido, de modo que entendiesen la lectura».", apoyo: "leían en el libro de la ley de Dios «claramente, y ponían el sentido, de modo que entendiesen la lectura»", ref: "Nehemías 8:8" },
              { texto: "Pablo anunció a los de Éfeso solo una parte del consejo de Dios.", verdad: false, explica: "Pablo no rehuyó anunciarles todo el consejo de Dios.", apoyo: "como Pablo, que anunció todo el consejo de Dios", ref: "Hechos 20:27" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada uno con lo que dice la lección sobre por qué predicar así.",
            pares: [
              ["La autoridad", "Está en la Palabra, no en el predicador"],
              ["La iglesia", "Aprende a leer la Biblia en su contexto"],
              ["El predicador", "Se protege de sus propios temas favoritos"],
              ["Los temas difíciles", "También se anuncian al predicar libros completos"],
            ],
            apoyo: "La iglesia aprende a leer la Biblia en su contexto",
            ref: "Hechos 20:27",
            explica: "La autoridad está en la Palabra, no en el predicador; la iglesia aprende a leer la Biblia en su contexto; el predicador se protege de sus temas favoritos y de sus propias opiniones; y al predicar libros completos se anuncian también los temas difíciles.",
          },
          {
            consigna: "Une cada idea con lo que enseña la lección sobre el poder y el valor de la exposición.",
            pares: [
              ["El poder del sermón", "No está en la creatividad del predicador"],
              ["La Palabra que se expone", "Es viva y eficaz, y la aplica el Espíritu"],
              ["Una buena exposición", "Tiene idea clara, estructura y aplicación"],
              ["Predicar libros completos", "Anuncia todo el consejo de Dios"],
            ],
            apoyo: "El poder del sermón no está en la creatividad del predicador, sino en la Palabra que expone, aplicada por el Espíritu",
            ref: "Hebreos 4:12",
            explica: "El poder del sermón no está en la creatividad del predicador, sino en la Palabra viva y eficaz que expone, aplicada por el Espíritu. Una buena exposición tiene idea clara, estructura y aplicación, y al predicar libros completos se anuncia todo el consejo de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Al predicar libros completos se anuncia todo el consejo de Dios, también los temas difíciles",
            ref: "Hechos 20:27",
            situacion: "Eres pastor asistente, y te piden predicar en el culto de los miércoles durante tres meses. Quieres que la iglesia crezca en la Palabra.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes que decidir qué vas a predicar cada semana.",
                pregunta: "¿Qué plan escoges?",
                opciones: [
                  { texto: "Predicar un libro completo, pasaje por pasaje.", valor: 2, explica: "Al predicar libros completos se anuncia todo el consejo de Dios, y la iglesia aprende a leer la Biblia en su contexto.", siguiente: "e2" },
                  { texto: "Predicar cada semana sobre el tema que más te guste.", valor: 0, explica: "Predicar pasajes y libros completos protege al predicador de sus temas favoritos y de sus propias opiniones.", siguiente: "e1b" },
                  { texto: "Tomar cada semana un versículo distinto y desarrollarlo.", valor: 1, explica: "Es predicación textual; pero al predicar libros completos se anuncia todo el consejo de Dios, también los temas difíciles.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A la tercera semana, notas que tus sermones repiten siempre tus mismas ideas.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cambias a predicar un libro, pasaje por pasaje.", valor: 2, explica: "Así el predicador se protege de sus temas favoritos y de sus propias opiniones.", siguiente: "e2" },
                  { texto: "Sigues igual, porque esos temas a ti te hacen mucho bien.", valor: 0, explica: "Predicar pasajes y libros completos protege al predicador de sus temas favoritos y de sus propias opiniones.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Vas por la mitad del libro, y el pasaje de esta semana trata un tema difícil.",
                pregunta: "¿Qué haces con ese pasaje?",
                opciones: [
                  { texto: "Lo predicas: también es parte del consejo de Dios.", valor: 2, explica: "Al predicar libros completos se anuncia todo el consejo de Dios, también los temas difíciles." },
                  { texto: "Lo saltas y pasas al siguiente, que es más agradable.", valor: 0, explica: "Pablo no rehuyó anunciar todo el consejo de Dios: tampoco se saltan los temas difíciles." },
                  { texto: "Lo predicas, pero sin aplicarlo, para no incomodar a nadie.", valor: 1, explica: "Predicarlo está bien, pero la predicación expositiva explica y aplica el pasaje, también cuando el tema es difícil." },
                ],
              },
              {
                id: "e3",
                narra: "Un hermano te dice: La predicación expositiva es aburrida; es como leer un comentario.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que una buena exposición tiene idea clara, estructura y aplicación.", valor: 2, explica: "Predicar de manera expositiva no es leer un comentario en voz alta: una buena exposición tiene una idea clara, estructura, ilustraciones y aplicación, y llega al corazón." },
                  { texto: "Que tiene razón, y que desde ahora leerás más comentarios en voz alta.", valor: 0, explica: "Predicar de manera expositiva no es leer un comentario en voz alta." },
                  { texto: "Que el poder del sermón está en tu creatividad, y la usarás más.", valor: 0, explica: "El poder del sermón no está en la creatividad del predicador, sino en la Palabra que expone, aplicada por el Espíritu." },
                ],
              },
            ],
          },
          {
            apoyo: "El predicador se protege de sus temas favoritos y de sus propias opiniones",
            ref: "Hebreos 4:12",
            situacion: "Eres maestro de la escuela dominical de adultos, y tu pastor te pide preparar la enseñanza de los próximos meses.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano te propone: Haz una serie con tus temas favoritos, así enseñas cómodo.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Enseñar un libro completo de la Biblia, pasaje por pasaje.", valor: 2, explica: "Así el predicador se protege de sus temas favoritos y de sus propias opiniones, y se anuncia todo el consejo de Dios.", siguiente: "e2" },
                  { texto: "Hacer la serie con tus temas favoritos, como te dijo.", valor: 0, explica: "Predicar pasajes y libros completos protege al predicador de sus temas favoritos y de sus propias opiniones.", siguiente: "e1b" },
                  { texto: "Hacer una serie de temas, cada uno con versículos de varios lugares.", valor: 1, explica: "La predicación temática es útil, pero corre el riesgo de sacar los textos de su contexto.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al preparar la serie, notas que los versículos que escogiste dicen justo lo que tú ya pensabas.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Dejas que el texto mande y enseñas un pasaje completo.", valor: 2, explica: "El texto no es un trampolín para hablar de otra cosa: es el que manda.", siguiente: "e2" },
                  { texto: "Sigues adelante, porque así tus opiniones quedan más firmes.", valor: 0, explica: "La predicación expositiva protege a la iglesia de las opiniones del predicador.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya van varias clases del libro. Una alumna te dice: Ahora entiendo los versículos dentro de su contexto.",
                pregunta: "¿Qué te muestra eso?",
                opciones: [
                  { texto: "Que la iglesia aprende a leer la Biblia en su contexto.", valor: 2, explica: "Es uno de los beneficios de predicar así: la iglesia aprende a leer la Biblia en su contexto." },
                  { texto: "Que conviene terminar pronto el libro y volver a los temas.", valor: 0, explica: "Al predicar pasajes y libros completos, la iglesia aprende a leer la Biblia en su contexto." },
                  { texto: "Que tus explicaciones valen más que lo que dice el texto.", valor: 0, explica: "La autoridad está en la Palabra, no en el predicador." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de cada clase, piensas de dónde vendrá el fruto de lo que enseñas.",
                pregunta: "¿En qué confías?",
                opciones: [
                  { texto: "En la Palabra que expones, aplicada por el Espíritu.", valor: 2, explica: "El poder del sermón no está en la creatividad del predicador, sino en la Palabra que expone, aplicada por el Espíritu." },
                  { texto: "En tu creatividad: con buenas ideas, la gente va a cambiar.", valor: 0, explica: "El poder no está en la creatividad del predicador, sino en la Palabra viva y eficaz." },
                  { texto: "En tu fama de buen maestro entre los hermanos de la clase.", valor: 0, explica: "La autoridad está en la Palabra, no en el predicador." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La predicación expositiva explica y aplica un pasaje de modo que el mensaje del sermón sea el mensaje del texto",
            ref: "Hechos 20:27",
            clave: {
              id: "pr-n4-homiletica-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es la predicación expositiva, y en qué se diferencia de la temática y de la textual?",
              ideas: [
                { id: "mensaje", peso: 40, texto: "Explica y aplica un pasaje de modo que el mensaje del sermón sea el mensaje del texto.", formas: ["mensaje del texto", "mensaje del pasaje", "mensaje de la biblia", "lo que dice el (texto|pasaje)", "el texto manda", "texto es el que manda", "explic* y aplic*"] },
                { id: "pasaje", peso: 30, texto: "Parte de un pasaje completo, y su idea central gobierna todo el sermón.", formas: ["pasaje complet*", "pasaje entero", "texto complet*", "parrafo complet*", "idea central (gobierna|manda|guia|dirige)"] },
                { id: "otras", peso: 30, texto: "La temática parte de un tema y reúne versículos de varios lugares; la textual parte de un versículo o de una frase.", formas: ["de un tema", "un solo tema", "reun* versiculos", "junta* versiculos", "versiculos de (varios|distintos|muchos|diferentes) (lugares|libros|partes)", "de un versiculo", "un solo versiculo", "una frase"] },
              ],
              errores: [
                { id: "expositiva-versiculo", texto: "La expositiva parte de un pasaje completo, no de un versículo, de una frase ni de un tema.", formas: ["expositiva parte de un versiculo", "expositiva parte de una frase", "expositiva parte de un tema"], anula: "pasaje" },
                { id: "trampolin", texto: "El texto no es un trampolín para hablar de otra cosa: es el que manda.", formas: ["texto es un trampolin", "texto sirve de trampolin", "us* el texto (como|de) trampolin"], anula: "mensaje" },
              ],
              modelo: "La predicación expositiva explica y aplica un pasaje de modo que el mensaje del sermón sea el mensaje del texto. Parte de un pasaje completo, mientras que la temática parte de un tema y la textual, de un versículo o de una frase.",
            },
          },
          {
            apoyo: "Expositiva: parte de un pasaje completo, y su idea central gobierna todo el sermón",
            ref: "Hechos 20:27",
            clave: {
              id: "pr-n4-homiletica-2-1-a7-2",
              tipo: "corta",
              pregunta: "Un amigo dice que la predicación textual y la expositiva son lo mismo. ¿Qué le explicas?",
              ideas: [
                { id: "textual", peso: 50, texto: "La textual parte de un versículo o de una frase y la desarrolla.", formas: ["textual parte de un versiculo", "textual (parte|sale|empieza) de una frase", "de un versiculo", "un solo versiculo", "una frase", "desarroll* (un|una|el|la) (versiculo|frase)"] },
                { id: "expositiva", peso: 50, texto: "La expositiva parte de un pasaje completo, y su idea central gobierna todo el sermón: el mensaje del sermón es el del texto.", formas: ["pasaje complet*", "pasaje entero", "texto complet*", "idea central (gobierna|manda|guia|dirige)", "mensaje del (texto|pasaje)", "el texto manda"] },
              ],
              errores: [
                { id: "expositiva-versiculo", texto: "La expositiva parte de un pasaje completo; la que parte de un versículo o de una frase es la textual.", formas: ["expositiva parte de un versiculo", "expositiva parte de una frase", "expositiva (desarrolla|toma) (un|una) (versiculo|frase)"], anula: "expositiva" },
                { id: "textual-pasaje", texto: "La textual parte de un versículo o de una frase; la que parte de un pasaje completo es la expositiva.", formas: ["textual parte de un pasaje", "textual (toma|predica) un pasaje"], anula: "textual" },
              ],
              modelo: "No son lo mismo. La textual parte de un versículo o de una frase y la desarrolla. La expositiva parte de un pasaje completo, y su idea central gobierna todo el sermón, de modo que el mensaje del sermón es el mensaje del texto.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Del texto a la idea del sermón
    "n4-homiletica-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué propone Haddon Robinson para predicar un pasaje?", reverso: "Ir de la idea exegética a la idea homilética.", apoyo: "Haddon Robinson propone ir de la idea exegética, lo que el pasaje dijo a sus primeros lectores, a la idea homilética" },
              { frente: "¿Qué se pregunta al estudiar el contexto histórico?", reverso: "Quién escribió, a quién, cuándo y por qué.", apoyo: "El contexto histórico: quién escribió, a quién, cuándo y por qué" },
              { frente: "¿Qué se mira al estudiar el contexto literario?", reverso: "Qué hay antes y después, y de qué género es.", apoyo: "El contexto literario: qué hay antes y después, y de qué género es" },
              { frente: "¿Qué se estudia en las palabras y la gramática?", reverso: "Los verbos, los conectores y las palabras clave.", apoyo: "Las palabras y la gramática: los verbos, los conectores y las palabras clave" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué exige usar bien la palabra de verdad?", reverso: "Exige trabajo.", apoyo: "Usar bien la palabra de verdad exige trabajo" },
              { frente: "¿Desde dónde escribe Pablo a los filipenses, y para qué?", reverso: "Desde la cárcel, para agradecer una ofrenda.", apoyo: "Pablo escribe desde la cárcel para agradecer una ofrenda" },
              { frente: "¿Qué distancia hay entre el mundo de la Biblia y el de hoy?", reverso: "Una distancia de idioma, de cultura y de tiempo.", apoyo: "Entre el mundo de la Biblia y el de hoy hay una distancia de idioma, de cultura y de tiempo" },
              { frente: "¿Qué conviene leer siempre antes de predicar una frase?", reverso: "El párrafo completo.", apoyo: "Lee siempre el párrafo completo antes de predicar una frase" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué parte del estudio mira cada pregunta: el contexto histórico, el literario o la gramática? Lleva cada frase a su grupo.",
            grupos: ["Contexto histórico", "Contexto literario", "Palabras y gramática"],
            frases: [
              { texto: "¿Quién escribió el pasaje, y a quién?", grupo: 0 },
              { texto: "¿Cuándo se escribió, y por qué?", grupo: 0 },
              { texto: "¿Qué hay antes y después del pasaje?", grupo: 1 },
              { texto: "¿De qué género es el pasaje?", grupo: 1 },
              { texto: "¿Qué verbos usa el autor?", grupo: 2 },
              { texto: "¿Qué conectores unen las frases?", grupo: 2 },
              { texto: "¿Cuáles son las palabras clave?", grupo: 2 },
            ],
            apoyo: "Para predicar un pasaje se estudia su contexto histórico, literario y gramatical",
            ref: "2 Timoteo 2:15",
            explica: "El contexto histórico pregunta quién escribió, a quién, cuándo y por qué; el literario, qué hay antes y después y de qué género es; y la gramática mira los verbos, los conectores y las palabras clave.",
          },
          {
            consigna: "Estudias Filipenses 4:10-13. ¿Qué parte del estudio es cada paso: el contexto histórico, el literario o la gramática? Lleva cada frase a su grupo.",
            grupos: ["Contexto histórico", "Contexto literario", "Palabras y gramática"],
            frases: [
              { texto: "Ver que Pablo escribe desde la cárcel", grupo: 0 },
              { texto: "Saber que escribe para agradecer una ofrenda", grupo: 0 },
              { texto: "Preguntar a quiénes escribe Pablo la carta", grupo: 0 },
              { texto: "Leer el párrafo completo, del versículo 10 al 13", grupo: 1 },
              { texto: "Notar que el pasaje es parte de una carta", grupo: 1 },
              { texto: "Fijarse en los verbos, como «he aprendido»", grupo: 2 },
              { texto: "Buscar las palabras clave del párrafo", grupo: 2 },
            ],
            apoyo: "Pablo escribe desde la cárcel para agradecer una ofrenda",
            ref: "Filipenses 4:10-13",
            explica: "Que Pablo escribe desde la cárcel para agradecer una ofrenda es parte del contexto histórico: quién escribió, a quién, cuándo y por qué. El párrafo y el género son el contexto literario, y los verbos y las palabras clave, la gramática.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos del estudio de un pasaje como los presenta la lección, del primero al último.",
            pasos: [
              "El contexto histórico: quién escribió, a quién, cuándo y por qué",
              "El contexto literario: qué hay antes y después, y su género",
              "Las palabras y la gramática: verbos, conectores y palabras clave",
              "La idea exegética: lo que dijo el autor, en una frase",
              "La idea homilética: esa misma verdad, dicha para hoy",
            ],
            apoyo: "Aplicar los pasos para estudiar un pasaje: su contexto histórico, literario y gramatical",
            ref: "2 Timoteo 2:15",
            explica: "Primero se estudian el contexto histórico, el literario y la gramática; después se escribe la idea exegética, lo que dijo el autor; y al final, la idea homilética: esa misma verdad, dicha para hoy.",
          },
          {
            consigna: "Preparas un sermón de Filipenses 4:10-13. Ordena tu trabajo como enseña la lección, del primer paso al último.",
            pasos: [
              "Ver que Pablo escribe desde la cárcel para agradecer una ofrenda",
              "Leer el párrafo completo, del versículo 10 al 13",
              "Fijarse en los verbos, como «he aprendido a contentarme»",
              "Escribir: Pablo aprendió a estar contento porque Cristo lo fortalecía",
              "Decir para hoy: en Cristo puedes estar contento en cualquier situación",
            ],
            apoyo: "Idea exegética: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía",
            ref: "Filipenses 4:10-13",
            explica: "Primero el contexto histórico (Pablo escribe desde la cárcel), después el literario (el párrafo completo) y la gramática (los verbos); luego la idea exegética y, al final, la homilética: en Cristo puedes estar contento en cualquier situación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que propone Haddon Robinson.",
            texto: "Robinson propone ir de la idea [[exegética]], lo que el pasaje dijo a sus primeros [[lectores]], a la idea homilética, la misma [[verdad]] dicha para los oyentes de hoy.",
            distractores: ["personal", "traductores", "opinión"],
            errores: {
              personal: "Lo que el pasaje dijo a sus primeros lectores se llama la idea exegética.",
              traductores: "La idea exegética es lo que el pasaje dijo a sus primeros lectores.",
              "opinión": "La idea homilética es la misma verdad del pasaje, dicha para los oyentes de hoy, y no una opinión.",
            },
            apoyo: "Haddon Robinson propone ir de la idea exegética, lo que el pasaje dijo a sus primeros lectores, a la idea homilética, la misma verdad dicha para los oyentes de hoy",
            ref: "2 Timoteo 2:15",
            explica: "La idea exegética es lo que el pasaje dijo a sus primeros lectores; la homilética es la misma verdad dicha para los oyentes de hoy.",
          },
          {
            consigna: "Completa la idea exegética de Filipenses 4:10-13.",
            texto: "Idea exegética: Pablo aprendió a estar [[contento]] en la abundancia y en la [[escasez]] porque [[Cristo]] lo fortalecía.",
            distractores: ["quejoso", "riqueza", "nadie"],
            errores: {
              quejoso: "Pablo aprendió a estar contento: es el secreto del contentamiento.",
              riqueza: "Pablo aprendió a estar contento tanto en la abundancia como en la escasez.",
              nadie: "Pablo estaba contento porque Cristo lo fortalecía.",
            },
            apoyo: "Idea exegética: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía",
            ref: "Filipenses 4:11-13",
            explica: "La idea exegética dice lo que dijo el autor: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía. La homilética lo dice para hoy: en Cristo puedes estar contento en cualquier situación.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Muchos errores de predicación vienen de sacar un versículo de su contexto, como Filipenses 4:13",
            ref: "Filipenses 4:10-13",
            titulo: "El versículo del torneo",
            relato: [
              "Eres líder de jóvenes. El sábado hay un torneo de fútbol entre las iglesias, y te piden un mensaje corto antes del primer partido.",
              "Un joven del equipo te sugiere: Predica «Todo lo puedo en Cristo que me fortalece». Así salimos a ganar.",
              "Abres tu Biblia y empiezas a preparar el mensaje con los pasos del estudio.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero con el versículo que te sugirió?",
                opciones: [
                  { texto: "Leo el párrafo completo, Filipenses 4:10-13, y su contexto.", bien: true, explica: "Lee siempre el párrafo completo antes de predicar una frase: muchos errores vienen de sacar un versículo de su contexto." },
                  { texto: "Lo predico tal cual, porque se entiende solo, sin más contexto.", explica: "Muchos errores de predicación vienen de sacar un versículo de su contexto, como Filipenses 4:13." },
                  { texto: "Busco otros versículos sobre ganar para reforzar la misma idea.", explica: "Antes de buscar otros versículos, se estudia el contexto histórico, literario y gramatical del pasaje." },
                ],
                apoyo: "Lee siempre el párrafo completo antes de predicar una frase",
                explica: "Antes de predicar una frase se lee el párrafo completo y se estudia su contexto histórico, literario y gramatical.",
              },
              {
                tipo: "situacion",
                pregunta: "Al estudiar el contexto, ¿qué descubres sobre el versículo 13?",
                opciones: [
                  { texto: "Que es el secreto del contentamiento, no una promesa de ganar.", bien: true, explica: "En su contexto, el versículo no es una promesa de lograr cualquier meta, sino el secreto del contentamiento." },
                  { texto: "Que es una promesa de lograr cualquier meta que uno se proponga.", explica: "En su contexto no es una promesa de lograr cualquier meta: Pablo habla de contentarse en cualquier situación." },
                  { texto: "Que Pablo lo escribió a unos atletas antes de una competencia.", explica: "Pablo escribe desde la cárcel para agradecer una ofrenda." },
                ],
                apoyo: "En su contexto, «Todo lo puedo en Cristo que me fortalece» no es una promesa de lograr cualquier meta, sino el secreto del contentamiento",
                explica: "Pablo escribe desde la cárcel para agradecer una ofrenda, y dice: «he aprendido a contentarme, cualquiera que sea mi situación».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es la idea exegética del pasaje?",
                opciones: [
                  { texto: "Pablo aprendió a contentarse en todo, porque Cristo lo fortalecía.", bien: true, explica: "La idea exegética dice en una frase lo que dijo el autor: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía." },
                  { texto: "Pablo aprendió que con fe se gana cualquier meta que uno se proponga.", explica: "Eso cambia el sentido del texto: el versículo no es una promesa de lograr cualquier meta." },
                  { texto: "En Cristo tú puedes estar contento en cualquier situación de tu vida.", explica: "Esa es la idea homilética, la misma verdad dicha para hoy; la exegética dice lo que el autor dijo a sus lectores." },
                ],
                apoyo: "Idea exegética: Pablo aprendió a estar contento en la abundancia y en la escasez porque Cristo lo fortalecía",
                explica: "La idea exegética es lo que el pasaje dijo a sus primeros lectores; después viene la homilética, la misma verdad dicha para los oyentes de hoy.",
              },
              {
                tipo: "explica",
                apoyo: "El predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto",
                clave: {
                  id: "pr-n4-homiletica-2-2-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué les dirás a los jóvenes antes del partido, para llevarles el pasaje sin cambiar su sentido?",
                  ideas: [
                    { id: "contento", peso: 50, texto: "Que en Cristo pueden estar contentos en cualquier situación, ganen o pierdan.", formas: ["content*", "cualquier situacion", "ganen o pierdan", "ganar o perder", "gane o pierda", "ganemos o perdamos", "(si|aunque) (pierden|perdemos|pierdan|perdamos|pierde)", "abundancia", "escasez"] },
                    { id: "promesa", peso: 50, negativa: true, texto: "Que el versículo no es una promesa de ganar: Cristo los fortalece en todo.", formas: ["no es una promesa", "no (promete|garantiza|asegura)", "(cristo|el|dios) (los|nos|les|te|me) fortalece", "fortalec*", "fuerza de cristo"] },
                  ],
                  errores: [
                    { id: "ganar", texto: "En su contexto, el versículo no es una promesa de lograr cualquier meta.", formas: ["promet* ganar*", "promesa de ganar*", "promesa de (victoria|triunfo|exito)", "garantiza* ganar*", "garantiza* (la|el) (victoria|triunfo)"], anula: "promesa" },
                  ],
                  modelo: "Les diré que en Cristo pueden estar contentos en cualquier situación, ganen o pierdan, porque él los fortalece. El versículo no es una promesa de ganar el partido, sino el secreto del contentamiento.",
                },
              },
            ],
          },
          {
            apoyo: "Lee siempre el párrafo completo antes de predicar una frase",
            ref: "Filipenses 4:10-13",
            titulo: "Un sermón para tiempos de escasez",
            relato: [
              "Eres pastor asistente. En la iglesia hay varias familias que perdieron su trabajo este año, y el pastor te pide predicar el domingo.",
              "Escoges Filipenses 4:10-13. Un hermano te advierte: Cuidado, que muchos usan el versículo 13 para prometer éxito.",
              "Decides estudiar bien el pasaje antes de escribir tu sermón.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te dice el contexto histórico de la carta?",
                opciones: [
                  { texto: "Que Pablo escribe desde la cárcel para agradecer una ofrenda.", bien: true, explica: "Ese es el contexto histórico: quién escribió, a quién, cuándo y por qué." },
                  { texto: "Que Pablo escribe en un tiempo de abundancia, para pedir más dinero.", explica: "Pablo escribe desde la cárcel, y lo hace para agradecer una ofrenda." },
                  { texto: "Que el contexto no importa, porque el versículo se entiende solo.", explica: "Muchos errores de predicación vienen de sacar un versículo de su contexto." },
                ],
                apoyo: "Pablo escribe desde la cárcel para agradecer una ofrenda",
                explica: "El contexto histórico responde quién escribió, a quién, cuándo y por qué: Pablo escribe desde la cárcel para agradecer una ofrenda.",
              },
              {
                tipo: "situacion",
                pregunta: "Al leer el párrafo completo, ¿de qué habla el versículo 13?",
                opciones: [
                  { texto: "Del secreto de estar contento en cualquier situación.", bien: true, explica: "El párrafo lo dice: «he aprendido a contentarme, cualquiera que sea mi situación»." },
                  { texto: "De una promesa de lograr cualquier meta que uno se proponga.", explica: "En su contexto, el versículo no es una promesa de lograr cualquier meta." },
                  { texto: "De cómo salir muy pronto de la escasez con la ayuda de Dios.", explica: "Pablo no habla de salir de la escasez: aprendió a estar contento en la abundancia y en la escasez." },
                ],
                apoyo: "el secreto del contentamiento: «he aprendido a contentarme, cualquiera que sea mi situación»",
                explica: "El versículo 13 es el secreto del contentamiento: Pablo aprendió a contentarse, cualquiera que fuera su situación.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál será la idea homilética de tu sermón?",
                opciones: [
                  { texto: "En Cristo puedes estar contento en cualquier situación.", bien: true, explica: "Es la misma verdad del pasaje, dicha de manera clara y fácil de recordar para hoy." },
                  { texto: "Pablo aprendió a contentarse porque Cristo lo fortalecía.", explica: "Esa es la idea exegética, lo que dijo el autor; la homilética es esa misma verdad dicha para hoy." },
                  { texto: "Si tienes fe, Dios te va a devolver pronto tu trabajo.", explica: "Eso cambia el sentido del texto: el versículo no es una promesa de lograr cualquier meta." },
                ],
                apoyo: "Idea homilética: en Cristo puedes estar contento en cualquier situación",
                explica: "La idea homilética es esa misma verdad, dicha de manera clara y fácil de recordar para hoy, sin cambiar el sentido del texto.",
              },
              {
                tipo: "explica",
                apoyo: "Haddon Robinson propone ir de la idea exegética, lo que el pasaje dijo a sus primeros lectores, a la idea homilética, la misma verdad dicha para los oyentes de hoy",
                clave: {
                  id: "pr-n4-homiletica-2-2-a5-2",
                  tipo: "corta",
                  pregunta: "¿En qué se diferencian la idea exegética y la idea homilética de tu sermón? Usa Filipenses 4:10-13.",
                  ideas: [
                    { id: "exegetica", peso: 50, texto: "La idea exegética es lo que el pasaje dijo a sus primeros lectores: Pablo aprendió a estar contento porque Cristo lo fortalecía.", formas: ["primeros lectores", "sus lectores", "los lectores", "lo que (dijo|escribio) (pablo|el)", "lo que quiso decir", "pablo aprendio", "(lo|le) fortalecia", "dijo a (sus|los) (lectores|filipenses|primeros|hermanos)", "en su tiempo"] },
                    { id: "homiletica", peso: 50, texto: "La homilética es la misma verdad dicha para hoy: en Cristo puedes estar contento en cualquier situación.", formas: ["misma verdad", "para hoy", "oyentes de hoy", "(puedes|podemos|pueden|puedo) estar content*", "cualquier situacion", "dicha para"] },
                  ],
                  errores: [
                    { id: "exegetica-hoy", texto: "La idea exegética es lo que el pasaje dijo a sus primeros lectores; la verdad dicha para hoy es la homilética.", formas: ["exegetica (es|dice) la misma verdad", "exegetica para hoy", "exegetica (es|dice) lo que (significa|dice) hoy"], anula: "exegetica" },
                    { id: "homiletica-lectores", texto: "La idea homilética es la misma verdad dicha para los oyentes de hoy; lo que se dijo a los primeros lectores es la exegética.", formas: ["homiletica (es|dice) lo que (dijo|escribio) pablo", "homiletica primeros lectores", "homiletica sus lectores"], anula: "homiletica" },
                  ],
                  modelo: "La idea exegética es lo que el pasaje dijo a sus primeros lectores: Pablo aprendió a estar contento porque Cristo lo fortalecía. La homilética es la misma verdad para hoy: en Cristo puedes estar contento en cualquier situación.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un maestro de jóvenes te dice: Estas cartas son de hace dos mil años; para que sirvan hoy, les cambio el sentido por uno más moderno.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que busque el principio que vale para todos los tiempos, sin cambiar el sentido.", bien: true, explica: "El predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto." },
              { texto: "Que está bien: cada generación puede darle al texto el sentido que más le sirva.", explica: "El puente se construye sin cambiar el sentido del texto." },
              { texto: "Que no enseñe esas cartas, porque ya no tienen nada que decirles a los jóvenes.", explica: "Toda la Escritura sigue siendo útil hoy (2 Timoteo 3:16)." },
              { texto: "Que solo explique lo que les dijeron a sus lectores, sin llevarlo a la vida de hoy.", explica: "El predicador lleva el principio a la vida de sus oyentes: después de la idea exegética viene la homilética." },
            ],
            apoyo: "El predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto",
            ref: "2 Timoteo 3:16",
            explica: "Entre el mundo de la Biblia y el de hoy hay una distancia de idioma, de cultura y de tiempo; el predicador la cruza con un puente, sin cambiar el sentido del texto.",
          },
          {
            caso: "Una hermana que da el estudio en su célula te dice: Explico bien lo que el pasaje significó para ellos, pero no sé cómo llevarlo a nuestra vida.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que busque el principio que vale para todos los tiempos y lo lleve a su grupo.", bien: true, explica: "Así se construye el puente: el principio que vale para todos los tiempos llega a la vida de los oyentes, sin cambiar el sentido del texto." },
              { texto: "Que deje el pasaje y hable de un tema actual que les interese más a todos.", explica: "El puente lleva el pasaje a la vida de los oyentes; no cambia el pasaje por otro tema." },
              { texto: "Que le dé al texto un sentido nuevo, aunque no sea el que tuvo para ellos.", explica: "El puente se construye sin cambiar el sentido del texto." },
              { texto: "Que no lo intente, porque lo que significó para ellos no tiene que ver con hoy.", explica: "Toda la Escritura sigue siendo útil hoy (2 Timoteo 3:16)." },
            ],
            apoyo: "busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes",
            ref: "2 Timoteo 3:16",
            explica: "Después de entender lo que el pasaje significó para ellos, el predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El predicador construye un puente: busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto",
            ref: "2 Timoteo 3:16",
            clave: {
              id: "pr-n4-homiletica-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el puente que construye el predicador entre el mundo bíblico y el de sus oyentes, y qué cuidado tiene al hacerlo?",
              ideas: [
                { id: "distancia", peso: 30, texto: "Entre el mundo de la Biblia y el de hoy hay una distancia de idioma, de cultura y de tiempo.", formas: ["distancia", "idioma*", "cultura*", "lengua*", "dos mil anos", "otra epoca"] },
                { id: "principio", peso: 40, texto: "El predicador busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes.", formas: ["principio", "todos los tiempos", "vale (para|en) (todo|todos|siempre|hoy)", "sirve (para|en) (todo|todos|siempre|hoy)", "lo lleva a", "llev* a la vida", "a la vida de", "aplic* a (hoy|la)"] },
                { id: "sentido", peso: 30, negativa: true, texto: "Sin cambiar el sentido del texto.", formas: ["sin cambiar", "(no|sin|nunca) (cambia|cambiar|cambiarle|cambie|cambien|altera|alterar|torcer|tuerce)", "mismo sentido", "respet* el sentido"] },
              ],
              errores: [
                { id: "cambiar", texto: "El puente se construye sin cambiar el sentido del texto.", formas: ["(cambiar|cambiarle|cambia|cambiamos) el sentido", "(dar|darle|da|damos) (otro|nuevo) sentido", "sentido (nuevo|moderno|distinto)"], anula: "sentido" },
              ],
              modelo: "Entre el mundo de la Biblia y el de hoy hay una distancia de idioma, de cultura y de tiempo. El predicador busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto.",
            },
          },
          {
            apoyo: "Toda la Escritura sigue siendo útil hoy (2 Timoteo 3:16)",
            ref: "2 Timoteo 3:16",
            clave: {
              id: "pr-n4-homiletica-2-2-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la Biblia es demasiado antigua para hablarnos hoy. ¿Qué le explicas sobre el puente que construye el predicador?",
              ideas: [
                { id: "util", peso: 30, texto: "Toda la Escritura sigue siendo útil hoy.", formas: ["sigue siendo util", "es util", "util (hoy|para)", "toda la escritura", "sigue hablando", "(puede|sigue) (hablarnos|hablando)", "vale para hoy", "sirve (hoy|para)"] },
                { id: "principio", peso: 40, texto: "El predicador busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes.", formas: ["principio", "todos los tiempos", "vale (para|en) (todo|todos|siempre)", "lo lleva a", "llev* a la vida", "a la vida de", "aplic* a (hoy|la)"] },
                { id: "sentido", peso: 30, negativa: true, texto: "Sin cambiar el sentido del texto.", formas: ["sin cambiar", "(no|sin|nunca) (cambia|cambiar|cambiarle|cambie|cambien|altera|alterar|torcer|tuerce)", "mismo sentido", "respet* el sentido"] },
              ],
              errores: [
                { id: "cambiar", texto: "El puente se construye sin cambiar el sentido del texto.", formas: ["(cambiar|cambiarle|cambia|cambiamos) el sentido", "(dar|darle|da|damos) (otro|nuevo) sentido", "sentido (nuevo|moderno|distinto)"], anula: "sentido" },
              ],
              modelo: "Le explico que toda la Escritura sigue siendo útil hoy. Hay distancia de idioma, de cultura y de tiempo, pero el predicador busca el principio que vale para todos los tiempos y lo lleva a la vida de sus oyentes, sin cambiar el sentido del texto.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Predicar según el género
    "n4-homiletica-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué tres cosas se buscan en una narración?", reverso: "La trama, el conflicto y lo que Dios hace.", apoyo: "Narración: busca la trama, el conflicto y lo que Dios hace" },
              { frente: "En una narración, ¿quién es el héroe de la historia?", reverso: "Dios, no solo el personaje.", apoyo: "el héroe es Dios, no solo el personaje" },
              { frente: "¿Cómo se predica una epístola?", reverso: "Siguiendo el argumento y sus conectores, y predicando párrafos.", apoyo: "Epístola: sigue el argumento y sus conectores (por tanto, porque, pero) y predica párrafos, no frases aisladas" },
              { frente: "¿A qué se atiende en la poesía y los salmos?", reverso: "Al paralelismo, a las imágenes y al sentimiento.", apoyo: "Poesía y salmos: atiende al paralelismo, a las imágenes y al sentimiento" },
            ],
          },
          {
            tarjetas: [
              { frente: "En una parábola, ¿qué se busca?", reverso: "El punto principal que Jesús quiso enseñar a sus oyentes.", apoyo: "Parábolas: busca el punto principal que Jesús quiso enseñar a sus oyentes" },
              { frente: "En una profecía, ¿qué se mira primero?", reverso: "Su mensaje en su tiempo.", apoyo: "Profecía: primero su mensaje en su tiempo" },
              { frente: "¿Para qué se predica un salmo?", reverso: "Para que la iglesia ore y adore.", apoyo: "predica para que la iglesia ore y adore" },
              { frente: "¿Qué respeta un buen sermón?", reverso: "El tono del texto.", apoyo: "Un buen sermón respeta el tono del texto" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada género con la manera de predicarlo.",
            pares: [
              ["Una narración", "Mostrar que el héroe es Dios, no solo el personaje"],
              ["Una epístola", "Seguir el argumento y predicar párrafos"],
              ["Un salmo", "Atender a las imágenes y llevar a orar y adorar"],
              ["Una parábola", "Buscar el punto principal que Jesús quiso enseñar"],
              ["Una profecía", "Su tiempo, su cumplimiento en Cristo y lo que falta"],
            ],
            apoyo: "Cada género se predica a su manera",
            ref: "2 Timoteo 3:16-17",
            explica: "En la narración el héroe es Dios; en la epístola se sigue el argumento; en la poesía se atiende a las imágenes y al sentimiento; en las parábolas se busca el punto principal; en la profecía, su tiempo, su cumplimiento en Cristo y lo que falta.",
          },
          {
            consigna: "Une cada texto con lo que enseña la lección sobre cómo predicarlo.",
            pares: [
              ["Una historia", "Se puede contar"],
              ["Un salmo", "Puede llevar a la oración"],
              ["Una carta", "Se puede razonar paso a paso"],
              ["Una parábola", "Se predica su punto principal, no cada detalle"],
              ["Una profecía", "Se predica primero su mensaje en su tiempo"],
            ],
            apoyo: "Un buen sermón respeta el tono del texto: una historia se puede contar, un salmo puede llevar a la oración y una carta se puede razonar paso a paso",
            explica: "Un buen sermón respeta el tono del texto: una historia se puede contar, un salmo puede llevar a la oración y una carta se puede razonar paso a paso. En la parábola se busca el punto principal, y en la profecía, primero su mensaje en su tiempo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿En qué género te haces cada pregunta: narración, epístola o parábola? Lleva cada frase a su grupo.",
            grupos: ["Narración", "Epístola", "Parábola"],
            frases: [
              { texto: "¿Cuál es la trama y cuál es el conflicto?", grupo: 0 },
              { texto: "¿Qué hace Dios en esta historia?", grupo: 0 },
              { texto: "¿Quién es el héroe: Dios o solo el personaje?", grupo: 0 },
              { texto: "¿Qué conectores unen el argumento?", grupo: 1 },
              { texto: "¿Qué dice el párrafo completo, y no solo la frase?", grupo: 1 },
              { texto: "¿Qué punto principal quiso enseñar Jesús?", grupo: 2 },
              { texto: "¿Cuál es el punto, sin hacer de cada detalle un símbolo?", grupo: 2 },
            ],
            apoyo: "Aplicar las preguntas propias de cada género al preparar un sermón",
            explica: "En la narración se buscan la trama, el conflicto y lo que Dios hace; en la epístola, el argumento y sus conectores, por párrafos; y en la parábola, el punto principal que Jesús quiso enseñar.",
          },
          {
            consigna: "¿En qué género te haces cada pregunta: un salmo, una profecía o una epístola? Lleva cada frase a su grupo.",
            grupos: ["Salmo", "Profecía", "Epístola"],
            frases: [
              { texto: "¿Qué paralelismo hay entre sus versos?", grupo: 0 },
              { texto: "¿Qué imágenes usa y qué sentimiento expresa?", grupo: 0 },
              { texto: "¿Cómo puede llevar a la iglesia a orar y adorar?", grupo: 0 },
              { texto: "¿Qué mensaje tuvo en su tiempo?", grupo: 1 },
              { texto: "¿Cómo se cumplió en Cristo?", grupo: 1 },
              { texto: "¿Qué indica el por tanto que une el argumento?", grupo: 2 },
              { texto: "¿Qué dice el párrafo, y no solo una frase aislada?", grupo: 2 },
            ],
            apoyo: "Cada género pide una manera propia de leer y de predicar",
            explica: "En el salmo se atiende al paralelismo, a las imágenes y al sentimiento; en la profecía, a su mensaje en su tiempo y a su cumplimiento en Cristo; y en la epístola, al argumento, a sus conectores y a los párrafos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La historia de David y Goliat no es ante todo un consejo para vencer tus gigantes",
            ref: "1 Samuel 17:45-47",
            titulo: "David y Goliat en el campamento",
            relato: [
              "Te toca predicar en el campamento de jóvenes, y escoges 1 Samuel 17, la historia de David y Goliat.",
              "Un compañero te pasa su bosquejo: Cinco pasos para vencer tus gigantes. Te dice que siempre gusta mucho.",
              "Antes de decidir, estudias el pasaje según su género.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué género es el pasaje, y qué buscas en él?",
                opciones: [
                  { texto: "Una narración: busco la trama, el conflicto y lo que Dios hace.", bien: true, explica: "En una narración se busca la trama, el conflicto y lo que Dios hace: el héroe es Dios." },
                  { texto: "Una parábola: busco qué representa cada uno de los detalles de la historia.", explica: "Es una narración; y ni siquiera en una parábola se convierte cada detalle en un símbolo." },
                  { texto: "Una epístola: busco sus conectores y predico solo una frase.", explica: "Es una narración; y en una epístola se predican párrafos, no frases aisladas." },
                ],
                apoyo: "Narración: busca la trama, el conflicto y lo que Dios hace",
                explica: "En una narración se busca la trama, el conflicto y lo que Dios hace; el héroe es Dios, no solo el personaje.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el punto del pasaje, según lo dice David mismo?",
                opciones: [
                  { texto: "Que Jehová salva, porque de Jehová es la batalla.", bien: true, explica: "David mismo dice el punto: «Jehová no salva con espada y con lanza; porque de Jehová es la batalla»." },
                  { texto: "Que con valor cualquiera puede vencer a sus gigantes.", explica: "La historia no es ante todo un consejo para vencer tus gigantes: de Jehová es la batalla." },
                  { texto: "Que una buena puntería gana cualquier batalla.", explica: "«Jehová no salva con espada y con lanza; porque de Jehová es la batalla»." },
                ],
                apoyo: "David mismo dice el punto: «Jehová no salva con espada y con lanza; porque de Jehová es la batalla»",
                explica: "El sermón sigue el punto que da el mismo texto: Jehová salva a su pueblo, porque de Jehová es la batalla.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo apunta tu sermón a Cristo?",
                opciones: [
                  { texto: "Muestra al Dios que salva, y a Cristo, que venció por nosotros.", bien: true, explica: "El sermón muestra al Dios que salva a su pueblo, y así apunta a Cristo, que venció a nuestro enemigo por nosotros." },
                  { texto: "Hace de cada piedra de David un símbolo de una virtud cristiana.", explica: "Eso convierte cada detalle en un símbolo: el sermón muestra al Dios que salva a su pueblo." },
                  { texto: "Dice que Cristo nos da fuerza para vencer a nuestros gigantes.", explica: "Sigue siendo el consejo de vencer gigantes: el sermón apunta a Cristo, que venció a nuestro enemigo por nosotros." },
                ],
                apoyo: "El sermón muestra al Dios que salva a su pueblo, y así apunta a Cristo, que venció a nuestro enemigo por nosotros",
                explica: "La historia muestra al Dios que salva a su pueblo, y así apunta a Cristo, que venció a nuestro enemigo por nosotros.",
              },
              {
                tipo: "explica",
                apoyo: "Narración: busca la trama, el conflicto y lo que Dios hace; el héroe es Dios, no solo el personaje. Evita convertir cada historia en un consejo moral suelto",
                clave: {
                  id: "pr-n4-homiletica-2-3-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a tu compañero sobre su bosquejo Cinco pasos para vencer tus gigantes?",
                  ideas: [
                    { id: "moral", peso: 40, texto: "Que convierte la historia en un consejo moral suelto: no es ante todo un consejo para vencer gigantes.", formas: ["consejo moral", "consejos morales", "moraliz*", "no es un consejo", "no es solo un consejo", "no es ante todo", "solo un consejo", "simple consejo"] },
                    { id: "dios", peso: 40, texto: "Que el héroe es Dios: de Jehová es la batalla, y él salva a su pueblo.", formas: ["heroe es dios", "dios es el heroe", "de jehova es la batalla", "batalla es de (dios|jehova)", "dios (salva|pelea|vence|gana)", "jehova (salva|pelea|vence)", "salva a su pueblo", "lo que dios hace", "lo que hace dios"] },
                    { id: "cristo", peso: 20, texto: "Que apunta a Cristo, que venció a nuestro enemigo por nosotros.", formas: ["cristo vencio", "cristo gano", "vencio por", "nuestro enemigo", "apunta a cristo", "(muestra|mostrar|apunta|lleva) a cristo", "por nosotros"] },
                  ],
                  modelo: "Le diría que su bosquejo convierte la historia en un consejo moral suelto. El héroe es Dios: David mismo dice que de Jehová es la batalla. El sermón muestra al Dios que salva a su pueblo y apunta a Cristo, que venció a nuestro enemigo por nosotros.",
                },
              },
            ],
          },
          {
            apoyo: "En la parábola del juez injusto, Lucas dice el punto antes de contarla",
            ref: "Lucas 18:1-8",
            titulo: "La viuda y el juez injusto",
            relato: [
              "La hermana que dirige el grupo de oración te pide predicar el viernes, y escoges Lucas 18:1-8, la parábola del juez injusto.",
              "En una reunión, alguien comenta: Entonces Dios es como ese juez: hay que insistirle mucho para que nos atienda.",
              "Te propones predicar la parábola según su género.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Dónde encuentras el punto principal de la parábola?",
                opciones: [
                  { texto: "Lucas lo dice antes de contarla: orar siempre y no desmayar.", bien: true, explica: "Lucas dice el punto antes de contarla: la necesidad «de orar siempre, y no desmayar»." },
                  { texto: "En el significado oculto de cada uno de los detalles de la historia.", explica: "En las parábolas no se convierte cada detalle en un símbolo: se busca el punto principal." },
                  { texto: "En lo que cada oyente sienta que la parábola le dice hoy.", explica: "Se busca el punto principal que Jesús quiso enseñar a sus oyentes." },
                ],
                apoyo: "Lucas dice el punto antes de contarla: la necesidad «de orar siempre, y no desmayar»",
                explica: "En las parábolas se busca el punto principal que Jesús quiso enseñar a sus oyentes, y aquí Lucas lo dice antes de contarla.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a quien dijo que Dios es como ese juez?",
                opciones: [
                  { texto: "Que el juez no representa a Dios: es un contraste.", bien: true, explica: "El juez no representa a Dios: es un contraste. Si un juez injusto atendió a la viuda, ¡cuánto más Dios hará justicia a sus escogidos!" },
                  { texto: "Que tiene razón: a Dios hay que cansarlo para que actúe.", explica: "El juez no representa a Dios: es un contraste." },
                  { texto: "Que el juez representa a la iglesia, y la viuda, a Israel.", explica: "Eso convierte cada detalle en un símbolo; y el juez es un contraste, no un retrato de Dios." },
                ],
                apoyo: "El juez no representa a Dios: es un contraste",
                explica: "Si un juez injusto atendió a la viuda, ¡cuánto más Dios hará justicia a sus escogidos!",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué cuidado propio de las parábolas tienes al prepararla?",
                opciones: [
                  { texto: "No convertir cada detalle de la parábola en un símbolo.", bien: true, explica: "En las parábolas se busca el punto principal: no se convierte cada detalle en un símbolo." },
                  { texto: "Buscar un sentido oculto en cada detalle de la historia.", explica: "Eso es alegorizar: en las parábolas se busca el punto principal." },
                  { texto: "Sacar de ella un consejo moral suelto para cada oyente.", explica: "Convertir el texto en un consejo moral suelto es moralizar; en la parábola se busca el punto principal que Jesús quiso enseñar." },
                ],
                apoyo: "no conviertas cada detalle en un símbolo",
                explica: "Así se evita alegorizar: se predica el punto principal que Jesús quiso enseñar a sus oyentes.",
              },
              {
                tipo: "explica",
                apoyo: "Si un juez injusto atendió a la viuda, ¡cuánto más Dios hará justicia a sus escogidos!",
                clave: {
                  id: "pr-n4-homiletica-2-3-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases el punto de la parábola del juez injusto, como lo predicarías.",
                  ideas: [
                    { id: "orar", peso: 50, texto: "Hay que orar siempre y no desmayar.", formas: ["orar siempre", "oremos siempre", "orando siempre", "ora siempre", "no desmay*", "sin desmayar", "persever* oracion", "seguir orando", "no dej* de orar", "nunca dej* de orar"] },
                    { id: "contraste", peso: 50, texto: "Si un juez injusto atendió a la viuda, cuánto más Dios hará justicia a sus escogidos.", formas: ["cuanto mas", "hara justicia", "hace justicia", "sus escogidos", "es un contraste", "contraste", "no representa a dios", "dios no es como (el|ese) juez", "mucho mas dios"] },
                  ],
                  modelo: "Debemos orar siempre y no desmayar. El juez no representa a Dios, es un contraste: si un juez injusto atendió a la viuda, cuánto más Dios hará justicia a sus escogidos.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo evitar los errores de cada género tiene un error. Tócala.",
            frases: [
              "En una narración, evita convertir cada historia en un consejo moral suelto.",
              "En una epístola, predica párrafos, no frases aisladas.",
              "En una parábola, convierte cada detalle en un símbolo.",
              "En una profecía, mira primero su mensaje en su tiempo.",
            ],
            malo: 2,
            correccion: "En una parábola, busca el punto principal que Jesús quiso enseñar: no conviertas cada detalle en un símbolo.",
            apoyo: "Parábolas: busca el punto principal que Jesús quiso enseñar a sus oyentes; no conviertas cada detalle en un símbolo",
            explica: "Respetar el género evita alegorizar, moralizar o sacar versos sueltos: en la parábola no se convierte cada detalle en un símbolo.",
          },
          {
            consigna: "Una de estas frases sobre los ejemplos de la lección tiene un error. Tócala.",
            frases: [
              "David mismo dice el punto de su historia: de Jehová es la batalla.",
              "La historia de David y Goliat es ante todo un consejo para vencer tus gigantes.",
              "En la parábola del juez injusto, el juez no representa a Dios.",
              "Lucas dice el punto de la parábola antes de contarla.",
            ],
            malo: 1,
            correccion: "La historia de David y Goliat no es ante todo un consejo para vencer tus gigantes: muestra al Dios que salva a su pueblo.",
            apoyo: "La historia de David y Goliat no es ante todo un consejo para vencer tus gigantes",
            ref: "1 Samuel 17:47",
            explica: "Convertir la historia en un consejo para vencer gigantes es moralizar: el sermón muestra al Dios que salva a su pueblo, y así apunta a Cristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo se predica cada género: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En una epístola se sigue el argumento y sus conectores, como por tanto, porque y pero.", verdad: true, explica: "Así se predica una epístola: se sigue el argumento y sus conectores, y se predican párrafos, no frases aisladas.", apoyo: "Epístola: sigue el argumento y sus conectores (por tanto, porque, pero)" },
              { texto: "Un salmo se predica para que la iglesia ore y adore.", verdad: true, explica: "En la poesía y los salmos se atiende al paralelismo, a las imágenes y al sentimiento, y se predica para que la iglesia ore y adore.", apoyo: "predica para que la iglesia ore y adore" },
              { texto: "En una narración, el héroe es solo el personaje principal, no Dios.", verdad: false, explica: "En la narración el héroe es Dios, no solo el personaje.", apoyo: "el héroe es Dios, no solo el personaje" },
            ],
          },
          {
            consigna: "Sobre la profecía, el tono y el género: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En una profecía se mira primero su cumplimiento, y solo después su tiempo.", verdad: false, explica: "Primero su mensaje en su tiempo, después su cumplimiento en Cristo y, con humildad, lo que falta por cumplirse.", apoyo: "Profecía: primero su mensaje en su tiempo, después su cumplimiento en Cristo y, con humildad, lo que falta por cumplirse" },
              { texto: "Un buen sermón respeta el tono del texto.", verdad: true, explica: "Una historia se puede contar, un salmo puede llevar a la oración y una carta se puede razonar paso a paso.", apoyo: "Un buen sermón respeta el tono del texto" },
              { texto: "Todos los géneros de la Biblia se predican de la misma manera.", verdad: false, explica: "Cada género pide una manera propia de leer y de predicar.", apoyo: "Cada género pide una manera propia de leer y de predicar" },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Así se evita alegorizar, moralizar o sacar versos sueltos",
            ref: "2 Timoteo 3:16-17",
            clave: {
              id: "pr-n4-homiletica-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tres errores comunes se evitan al respetar el género, y en qué consiste cada uno?",
              ideas: [
                { id: "moralizar", peso: 34, texto: "Moralizar: convertir cada historia en un consejo moral suelto.", formas: ["moraliz*", "consejo moral", "consejos morales"] },
                { id: "alegorizar", peso: 33, texto: "Alegorizar: convertir cada detalle en un símbolo.", formas: ["alegoriz*", "alegori*", "cada detalle", "simbolo*"] },
                { id: "sueltos", peso: 33, texto: "Sacar versos sueltos: predicar frases aisladas en vez de párrafos.", formas: ["versos sueltos", "verso suelto", "versiculos sueltos", "versiculo suelto", "frases aisladas", "frase aislada", "fuera de contexto", "fuera de su contexto", "parrafos"] },
              ],
              modelo: "Se evita moralizar, que es convertir cada historia en un consejo moral suelto; alegorizar, que es convertir cada detalle en un símbolo; y sacar versos sueltos, que es predicar frases aisladas en vez de párrafos.",
            },
          },
          {
            apoyo: "Parábolas: busca el punto principal que Jesús quiso enseñar a sus oyentes; no conviertas cada detalle en un símbolo",
            ref: "Lucas 18:1-8",
            clave: {
              id: "pr-n4-homiletica-2-3-a7-2",
              tipo: "corta",
              pregunta: "Un compañero predicó la parábola del juez injusto diciendo que el juez representa a Dios. ¿Qué error cometió, y cómo se corrige?",
              ideas: [
                { id: "simbolo", peso: 50, texto: "Convirtió un detalle en un símbolo: el juez no representa a Dios, es un contraste.", formas: ["no representa a dios", "contraste", "simbolo*", "alegori*", "cada detalle", "un detalle"] },
                { id: "punto", peso: 50, texto: "Se busca el punto principal: orar siempre y no desmayar, porque cuánto más Dios hará justicia.", formas: ["punto principal", "orar siempre", "no desmay*", "sin desmayar", "cuanto mas", "hara justicia", "sus escogidos", "lo que jesus quiso ensenar"] },
              ],
              modelo: "Convirtió un detalle en un símbolo: el juez no representa a Dios, es un contraste. Se corrige buscando el punto principal: orar siempre y no desmayar, porque si un juez injusto atendió a la viuda, cuánto más Dios hará justicia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La estructura del sermón expositivo
    "n4-homiletica-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué orden salen los puntos de un sermón expositivo?", reverso: "En el orden en que el autor los desarrolla en el pasaje.", apoyo: "sus puntos salen del pasaje, en el orden en que el autor los desarrolla" },
              { frente: "¿De qué partió Pedro en su sermón de Pentecostés?", reverso: "De lo que la gente estaba viendo.", apoyo: "parte de lo que la gente estaba viendo (Hechos 2:14-21)" },
              { frente: "¿Con qué frase resumió Pedro su idea?", reverso: "«Dios le ha hecho Señor y Cristo».", apoyo: "resume su idea: «Dios le ha hecho Señor y Cristo»" },
              { frente: "¿Con qué terminó Pedro su sermón?", reverso: "Con un llamado: «Arrepentíos, y bautícese cada uno de vosotros».", apoyo: "y termina con un llamado: «Arrepentíos, y bautícese cada uno de vosotros»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Inventa el predicador los puntos del sermón?", reverso: "No: los encuentra en el pasaje.", apoyo: "El predicador no inventa los puntos: los encuentra en el pasaje" },
              { frente: "¿Qué hace la conclusión del sermón?", reverso: "Repite la idea y llama a responder.", apoyo: "Una conclusión que repite la idea y llama a responder" },
              { frente: "¿Qué unen las transiciones?", reverso: "Un punto con el siguiente.", apoyo: "Transiciones que unen un punto con el siguiente" },
              { frente: "¿Qué vale más que diez ideas sueltas?", reverso: "Un sermón con tres puntos claros que salen del texto.", apoyo: "Un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las partes del sermón de Pedro en Pentecostés, del principio al final.",
            pasos: [
              "Parte de lo que la gente estaba viendo",
              "Presenta a Jesús crucificado y resucitado con las Escrituras",
              "Resume su idea: «Dios le ha hecho Señor y Cristo»",
              "Termina con un llamado a arrepentirse",
            ],
            apoyo: "El sermón de Pedro en Pentecostés tiene una estructura clara",
            ref: "Hechos 2:14-38",
            explica: "Pedro partió de lo que la gente estaba viendo (Hechos 2:14-21), presentó a Jesús crucificado y resucitado con las Escrituras (2:22-35), resumió su idea: «Dios le ha hecho Señor y Cristo», y terminó con un llamado.",
          },
          {
            consigna: "Ordena el bosquejo de un sermón expositivo de Efesios 2:1-10, de arriba abajo.",
            pasos: [
              "La introducción",
              "Lo que éramos: muertos en pecados",
              "Lo que Dios hizo: nos dio vida con Cristo",
              "Para qué: salvos por gracia para buenas obras",
              "La conclusión: repite la idea y llama a responder",
            ],
            apoyo: "En Efesios 2:1-10, el texto mismo da el bosquejo",
            ref: "Efesios 2:1-10",
            explica: "El texto mismo da el bosquejo: lo que éramos (2:1-3), lo que Dios hizo (2:4-7) y para qué (2:8-10). Antes va la introducción, y al final, una conclusión que repite la idea y llama a responder.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un sermón deductivo o inductivo? Lleva cada frase a su grupo.",
            grupos: ["Deductivo", "Inductivo"],
            frases: [
              { texto: "Presenta la idea central al principio", grupo: 0 },
              { texto: "Después de decir la idea, la explica, la prueba y la aplica", grupo: 0 },
              { texto: "Abre con la idea central y luego la desarrolla", grupo: 0 },
              { texto: "Empieza con preguntas", grupo: 1 },
              { texto: "Empieza con la historia del pasaje", grupo: 1 },
              { texto: "Llega a la idea central al final, como un descubrimiento", grupo: 1 },
            ],
            apoyo: "Puede ser deductivo, con la idea al principio, o inductivo, con la idea al final",
            explica: "El deductivo presenta la idea central al principio y después la explica, la prueba y la aplica; el inductivo empieza con preguntas o con la historia y llega a la idea al final, como un descubrimiento.",
          },
          {
            consigna: "Predicas Efesios 2:1-10. ¿Cada manera de hacerlo es deductiva o inductiva? Lleva cada frase a su grupo.",
            grupos: ["Deductiva", "Inductiva"],
            frases: [
              { texto: "Empiezas diciendo: Dios nos dio vida por su gracia, y luego lo explicas", grupo: 0 },
              { texto: "Dices la idea central en la primera frase del sermón", grupo: 0 },
              { texto: "Presentas la idea y después la pruebas con el pasaje", grupo: 0 },
              { texto: "Empiezas preguntando: ¿qué éramos antes de que Dios nos diera vida?", grupo: 1 },
              { texto: "Cuentas primero lo que éramos y llegas a la idea al final", grupo: 1 },
              { texto: "Guardas la idea central para el final, como un descubrimiento", grupo: 1 },
            ],
            apoyo: "Inductivo: empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento",
            ref: "Efesios 2:1-10",
            explica: "Si la idea central va al principio y después se explica, se prueba y se aplica, el sermón es deductivo; si empieza con preguntas o con la historia y llega a la idea al final, es inductivo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una joven que dará el estudio en el culto de jóvenes te dice: Mi mensaje empieza con preguntas y dice la idea central al final. ¿Lo estoy haciendo mal?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no: es inductivo, y llega a la idea como un descubrimiento.", bien: true, explica: "El inductivo empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento." },
              { texto: "Que sí: un sermón expositivo siempre dice la idea central al principio.", explica: "Puede ser deductivo, con la idea al principio, o inductivo, con la idea al final." },
              { texto: "Que no importa, porque un sermón no necesita tener una idea central.", explica: "Los puntos del sermón desarrollan una sola idea central." },
              { texto: "Que es deductivo, porque deduce la idea de sus preguntas al final.", explica: "El deductivo presenta la idea central al principio; el que llega a ella al final es el inductivo." },
            ],
            apoyo: "Inductivo: empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento",
            explica: "Un sermón expositivo puede ser deductivo, con la idea al principio, o inductivo, con la idea al final, como un descubrimiento.",
          },
          {
            caso: "Un hermano que predicará en el culto de hogar te dice: Voy a decir la idea central al principio, y después la explico, la pruebo y la aplico.",
            pregunta: "¿Qué clase de sermón está preparando?",
            opciones: [
              { texto: "Un sermón deductivo, con la idea central al principio.", bien: true, explica: "Deductivo: presenta la idea central al principio y después la explica, la prueba y la aplica." },
              { texto: "Un sermón inductivo, porque al final aplica la idea central.", explica: "El inductivo llega a la idea central al final; el que la presenta al principio es el deductivo." },
              { texto: "Un sermón inductivo, porque empieza por lo que dice el pasaje.", explica: "Lo que decide es dónde va la idea central: al principio, deductivo; al final, inductivo." },
              { texto: "Un sermón sin estructura, porque no empieza con ninguna historia.", explica: "Empezar con la idea central es la estructura del sermón deductivo." },
            ],
            apoyo: "Deductivo: presenta la idea central al principio y después la explica, la prueba y la aplica",
            explica: "El sermón deductivo presenta la idea central al principio y después la explica, la prueba y la aplica.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo da el bosquejo Efesios 2:1-10? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pasaje", texto: "Efesios 2:1-10", x: 50, y: 12 },
              { id: "muertos", texto: "Muertos en pecados (2:1-3)", x: 15, y: 72 },
              { id: "vida", texto: "Nos dio vida con Cristo (2:4-7)", x: 50, y: 90 },
              { id: "obras", texto: "Salvos por gracia para buenas obras", x: 85, y: 72 },
            ],
            enlaces: [
              { de: "pasaje", a: "muertos", relacion: "lo que éramos" },
              { de: "pasaje", a: "vida", relacion: "lo que Dios hizo" },
              { de: "pasaje", a: "obras", relacion: "para qué" },
            ],
            distractores: ["lo que dice otro libro", "lo que opina el predicador"],
            apoyo: "El predicador no inventa los puntos: los encuentra en el pasaje",
            ref: "Efesios 2:1-10",
            explica: "El texto mismo da el bosquejo: lo que éramos, muertos en pecados (2:1-3); lo que Dios hizo, nos dio vida con Cristo (2:4-7); y para qué: salvos por gracia para buenas obras (2:8-10).",
          },
          {
            consigna: "¿Cómo se unen las partes de un bosquejo que sigue el pasaje? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "idea", texto: "La idea central", x: 50, y: 10 },
              { id: "puntos", texto: "Los puntos", x: 50, y: 50 },
              { id: "texto", texto: "El texto", x: 15, y: 88 },
              { id: "transiciones", texto: "Las transiciones", x: 85, y: 88 },
              { id: "conclusion", texto: "La conclusión", x: 85, y: 22 },
            ],
            enlaces: [
              { de: "puntos", a: "texto", relacion: "salen del" },
              { de: "puntos", a: "idea", relacion: "desarrollan" },
              { de: "transiciones", a: "puntos", relacion: "unen" },
              { de: "conclusion", a: "idea", relacion: "repite" },
            ],
            distractores: ["reemplazan", "contradicen"],
            apoyo: "Puntos que salen del texto y desarrollan esa idea",
            explica: "Los puntos salen del texto y desarrollan la idea central; las transiciones unen un punto con el siguiente; y la conclusión repite la idea y llama a responder.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Deja que el pasaje te dé el bosquejo; no se lo impongas",
            ref: "Efesios 2:1-10",
            titulo: "Un bosquejo para Efesios 2:1-10",
            relato: [
              "Tu pastor te pide predicar Efesios 2:1-10 en el culto del domingo. Ya estudiaste el pasaje y escribiste su idea central en una frase.",
              "Un amigo te ofrece su bosquejo de siete puntos sobre la gracia, con versículos de muchos libros.",
              "Prefieres que el texto te dé el bosquejo, y te pones a trabajar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿De dónde sacas los puntos de tu sermón?",
                opciones: [
                  { texto: "Del pasaje, en el orden en que Pablo los desarrolla.", bien: true, explica: "Los puntos salen del pasaje, en el orden en que el autor los desarrolla." },
                  { texto: "Del bosquejo de tu amigo, que ya tiene siete puntos listos.", explica: "El predicador no inventa los puntos ni los toma prestados: los encuentra en el pasaje." },
                  { texto: "De tus ideas favoritas sobre la gracia, en el orden que quieras.", explica: "Deja que el pasaje te dé el bosquejo; no se lo impongas." },
                ],
                apoyo: "sus puntos salen del pasaje, en el orden en que el autor los desarrolla",
                explica: "Un sermón expositivo sigue el movimiento del texto: sus puntos salen del pasaje, en el orden en que el autor los desarrolla.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué tres puntos te da el pasaje?",
                opciones: [
                  { texto: "Lo que éramos, lo que Dios hizo y para qué nos salvó.", bien: true, explica: "El texto mismo da el bosquejo: lo que éramos (2:1-3), lo que Dios hizo (2:4-7) y para qué (2:8-10)." },
                  { texto: "La fe, la oración y el ayuno, uno por cada semana del mes.", explica: "Esos puntos no salen del pasaje: el predicador los encuentra en el texto." },
                  { texto: "Lo que Dios hizo, lo que éramos y lo que ganamos con eso.", explica: "Los puntos van en el orden del autor: lo que éramos, lo que Dios hizo y para qué." },
                ],
                apoyo: "En Efesios 2:1-10, el texto mismo da el bosquejo",
                explica: "En Efesios 2:1-10 el texto mismo da el bosquejo, en su propio orden.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano te oye ensayar y te dice que se perdió entre el primer punto y el segundo. ¿Qué te falta?",
                opciones: [
                  { texto: "Una transición que una un punto con el siguiente.", bien: true, explica: "Las transiciones unen un punto con el siguiente." },
                  { texto: "Un cuarto punto nuevo, para que haya más variedad.", explica: "Menos es más: un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas." },
                  { texto: "Hablar más rápido, para que no se note el cambio.", explica: "Lo que une un punto con el siguiente es una transición." },
                ],
                apoyo: "Transiciones que unen un punto con el siguiente",
                explica: "Entre un punto y el siguiente va una transición que los une.",
              },
              {
                tipo: "explica",
                apoyo: "Una conclusión que repite la idea y llama a responder",
                clave: {
                  id: "pr-n4-homiletica-2-4-a6-1",
                  tipo: "corta",
                  pregunta: "¿Cómo terminarás tu sermón de Efesios 2:1-10?",
                  ideas: [
                    { id: "repite", peso: 50, texto: "Con una conclusión que repite la idea central.", formas: ["repit* la idea", "repet* la idea", "repite la idea", "vuelv* a (decir|repetir)", "resum* la idea", "idea central otra vez", "idea central de nuevo"] },
                    { id: "llamado", peso: 50, texto: "Y con un llamado a responder.", formas: ["llam* a responder", "un llamado", "invit* a (responder|creer|arrepentirse|recibir|obedecer|orar)", "pedir* una respuesta", "que respondan"] },
                  ],
                  modelo: "Terminaré con una conclusión que repite la idea central: Dios, rico en misericordia, nos dio vida con Cristo por su gracia. Después haré un llamado a responder a esa gracia.",
                },
              },
            ],
          },
          {
            apoyo: "Un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas",
            ref: "Efesios 2:1-10",
            titulo: "Diez ideas para un retiro",
            relato: [
              "Te invitaron a predicar en un retiro de jóvenes, y escogiste Efesios 2:1-10.",
              "Tu primer borrador tiene diez ideas sobre la gracia, cada una con su historia, y ninguna sigue el orden del pasaje.",
              "El pastor te dice: Deja que el pasaje te dé el bosquejo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con las diez ideas de tu borrador?",
                opciones: [
                  { texto: "Las cambio por tres puntos claros que salen del texto.", bien: true, explica: "Un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas." },
                  { texto: "Las dejo todas, porque así el sermón tiene más contenido.", explica: "Menos es más: diez ideas sueltas valen menos que tres puntos claros que salen del texto." },
                  { texto: "Agrego dos ideas más, para que no falte nada sobre la gracia.", explica: "El predicador no inventa los puntos: los encuentra en el pasaje." },
                ],
                apoyo: "Un sermón con tres puntos claros que salen del texto vale más que diez ideas sueltas",
                explica: "Menos es más: los puntos salen del texto y desarrollan una sola idea central.",
              },
              {
                tipo: "situacion",
                pregunta: "¿En qué orden pones los puntos?",
                opciones: [
                  { texto: "En el orden en que el autor los desarrolla en el pasaje.", bien: true, explica: "Los puntos salen del texto, en el orden del autor." },
                  { texto: "Del más fácil al más difícil, según lo que tú prefieras.", explica: "Deja que el pasaje te dé el bosquejo; no se lo impongas." },
                  { texto: "Primero lo que Dios hizo, y al final lo que éramos antes.", explica: "El texto da el orden: lo que éramos, lo que Dios hizo y para qué." },
                ],
                apoyo: "sus puntos salen del texto, en el orden del autor, y desarrollan una sola idea central",
                explica: "El sermón expositivo sigue el movimiento del pasaje: sus puntos van en el orden del autor.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué ayuda a los jóvenes a pasar de un punto al siguiente sin perderse?",
                opciones: [
                  { texto: "Las transiciones, que unen un punto con el siguiente.", bien: true, explica: "Las transiciones unen un punto con el siguiente." },
                  { texto: "Una historia nueva entre punto y punto, aunque no se relacione.", explica: "Lo que une un punto con el siguiente es una transición, no una historia suelta." },
                  { texto: "Cambiar de tema en cada punto, para que nadie se aburra.", explica: "Los puntos desarrollan una sola idea central, y las transiciones los unen." },
                ],
                apoyo: "Transiciones que unen un punto con el siguiente",
                explica: "Las transiciones unen un punto con el siguiente, y así los oyentes siguen el movimiento del pasaje.",
              },
              {
                tipo: "explica",
                apoyo: "lo que éramos, muertos en pecados (2:1-3); lo que Dios hizo: «Pero Dios, que es rico en misericordia», nos dio vida con Cristo (2:4-7); y para qué: salvos por gracia para buenas obras (2:8-10)",
                clave: {
                  id: "pr-n4-homiletica-2-4-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe tu bosquejo de Efesios 2:1-10 en tres puntos, en el orden del pasaje.",
                  ideas: [
                    { id: "eramos", peso: 34, texto: "Lo que éramos: muertos en pecados (2:1-3).", formas: ["lo que eramos", "muertos", "estabamos muertos", "en pecados", "en (nuestros|sus) pecados"] },
                    { id: "hizo", peso: 33, texto: "Lo que Dios hizo: nos dio vida con Cristo (2:4-7).", formas: ["lo que dios hizo", "dio vida", "vida con cristo", "rico en misericordia", "pero dios"] },
                    { id: "para", peso: 33, texto: "Para qué: salvos por gracia para buenas obras (2:8-10).", formas: ["buenas obras", "para buenas", "salvos por gracia"] },
                  ],
                  modelo: "Primero, lo que éramos: muertos en pecados. Segundo, lo que Dios hizo: el Dios rico en misericordia nos dio vida con Cristo. Tercero, para qué: somos salvos por gracia para buenas obras.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Puede ser deductivo, con la idea al principio, o inductivo, con la idea al final",
            ref: "Hechos 2:36-38",
            clave: {
              id: "pr-n4-homiletica-2-4-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia un sermón deductivo de uno inductivo?",
              ideas: [
                { id: "deductivo", peso: 50, texto: "El deductivo presenta la idea central al principio y después la explica, la prueba y la aplica.", formas: ["al principio", "al inicio", "al comienzo", "desde el (principio|inicio|comienzo)", "(empieza|comienza|abre|inicia|arranca) con la idea", "primero (dice|presenta|pone|da) la idea", "explic* prueb*", "(luego|despues) la (prueba|explica)"] },
                { id: "inductivo", peso: 50, texto: "El inductivo empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento.", formas: ["al final", "descubr*", "con preguntas", "con una pregunta", "con la historia", "llega a la idea"] },
              ],
              errores: [
                { id: "deductivo-final", texto: "El deductivo presenta la idea al principio; el que llega a ella al final es el inductivo.", formas: ["deductiv* al final", "deductiv* idea final", "deductiv* (deja|guarda|lleva|pone) final", "deductiv* llega* idea", "deductiv* (empieza|comienza|abre) preguntas", "deductiv* como descubr*"], anula: "deductivo" },
                { id: "inductivo-principio", texto: "El inductivo llega a la idea al final; el que la presenta al principio es el deductivo.", formas: ["inductiv* al principio", "inductiv* idea principio", "inductiv* idea inicio", "inductiv* idea primero", "inductiv* (empieza|comienza|abre|inicia|arranca) idea", "inductiv* explic* prueb*"], anula: "inductivo" },
              ],
              modelo: "El deductivo presenta la idea central al principio y después la explica, la prueba y la aplica. El inductivo empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento.",
            },
          },
          {
            apoyo: "Inductivo: empieza con preguntas o con la historia y llega a la idea central al final, como un descubrimiento",
            ref: "Efesios 2:1-10",
            clave: {
              id: "pr-n4-homiletica-2-4-a7-2",
              tipo: "corta",
              pregunta: "Si predicas Efesios 2:1-10 de manera inductiva, ¿cómo empiezas y dónde dices la idea central? ¿Y si lo haces deductivo?",
              ideas: [
                { id: "inductivo", peso: 50, texto: "Inductivo: empiezo con preguntas o con la historia, y digo la idea central al final, como un descubrimiento.", formas: ["al final", "descubr*", "con preguntas", "con una pregunta", "con la historia", "con lo que eramos", "pregunt*"] },
                { id: "deductivo", peso: 50, texto: "Deductivo: digo la idea central al principio y después la explico, la pruebo y la aplico.", formas: ["al principio", "al inicio", "al comienzo", "desde el (principio|inicio|comienzo)", "primero (digo|diria|presento|presentaria) la idea", "explic* prob*"] },
              ],
              errores: [
                { id: "inductivo-principio", texto: "En el inductivo la idea central llega al final, como un descubrimiento.", formas: ["inductiv* al principio", "inductiv* idea principio", "inductiv* idea inicio", "inductiv* (empieza|empezaria|comienza|comenzaria|abre|abriria) idea"], anula: "inductivo" },
                { id: "deductivo-final", texto: "En el deductivo la idea central va al principio.", formas: ["deductiv* al final", "deductiv* idea final", "deductiv* (deja|dejaria|guarda|guardaria|lleva|pone) final", "deductiv* llega* idea", "deductiv* (empieza|empezaria|comienza|comenzaria) preguntas"], anula: "deductivo" },
              ],
              modelo: "De manera inductiva empezaría con preguntas, como qué éramos antes de que Dios nos diera vida, y diría la idea central al final, como un descubrimiento. De manera deductiva diría la idea al principio y después la explicaría, la probaría y la aplicaría.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Aplicación, Cristo y el llamado
    "n4-homiletica-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo es el que oye la Palabra y no la hace?", reverso: "Como quien se mira en un espejo y olvida cómo es.", apoyo: "El que oye y no hace es como quien se mira en un espejo y olvida cómo es" },
              { frente: "¿A qué pregunta responde la aplicación?", reverso: "¿Qué quiere Dios que hagamos con esta verdad?", apoyo: "La aplicación responde a la pregunta: ¿qué quiere Dios que hagamos con esta verdad?" },
              { frente: "¿De dónde sale la aplicación?", reverso: "Del propósito del pasaje, no de las ideas del predicador.", apoyo: "Sale del propósito del pasaje, no de las ideas del predicador" },
              { frente: "¿A quién se le aplica primero el sermón?", reverso: "Al predicador.", apoyo: "Se aplica primero al predicador" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dice una aplicación específica?", reverso: "Qué hacer, cuándo y con quién.", apoyo: "Es específica: dice qué hacer, cuándo y con quién" },
              { frente: "¿A qué oyentes habla la aplicación?", reverso: "Al joven, a la familia, al que duda y al que sufre.", apoyo: "Habla a distintos oyentes: el joven, la familia, el que duda, el que sufre" },
              { frente: "¿Cómo queda un sermón que explica bien el texto pero no toca la vida?", reverso: "Incompleto.", apoyo: "Un sermón que explica bien el texto pero no toca la vida está incompleto" },
              { frente: "¿Qué pide la Palabra?", reverso: "Una respuesta.", apoyo: "La Palabra pide una respuesta" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿La aplicación es precisa o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Aplica con precisión", "No aplica con precisión"],
            frases: [
              { texto: "Sale del propósito del pasaje", grupo: 0 },
              { texto: "Dice qué hacer, cuándo y con quién", grupo: 0 },
              { texto: "Piensa en el joven, en la familia y en el que sufre", grupo: 0 },
              { texto: "El predicador se la aplica primero a sí mismo", grupo: 0 },
              { texto: "Sale de las ideas del predicador", grupo: 1 },
              { texto: "Pide en general que todos cambien algún día", grupo: 1 },
              { texto: "Habla a un solo tipo de oyente", grupo: 1 },
              { texto: "La pide a los demás, pero no al predicador", grupo: 1 },
            ],
            apoyo: "La aplicación sale del propósito del pasaje, es específica, habla a distintos oyentes y empieza por el predicador",
            ref: "Santiago 1:22-25",
            explica: "La aplicación sale del propósito del pasaje, no de las ideas del predicador; dice qué hacer, cuándo y con quién; habla a distintos oyentes; y se aplica primero al predicador.",
          },
          {
            consigna: "¿Qué rasgo de una buena aplicación muestra cada ejemplo? Lleva cada frase a su grupo.",
            grupos: ["Dice qué, cuándo y con quién", "Habla a distintos oyentes", "Se aplica primero al predicador"],
            frases: [
              { texto: "Esta semana, llama a tu hermano y pídele perdón", grupo: 0 },
              { texto: "El viernes, ora diez minutos con un amigo", grupo: 0 },
              { texto: "Mañana, en el trabajo, habla de Cristo con un compañero", grupo: 0 },
              { texto: "Si eres joven, esta verdad te habla a ti", grupo: 1 },
              { texto: "Y tú, que hoy sufres, escucha lo que el texto te dice", grupo: 1 },
              { texto: "Antes de pedirlo a otros, el predicador lo obedece", grupo: 2 },
              { texto: "Yo soy el primero que necesita obedecer este pasaje", grupo: 2 },
            ],
            apoyo: "Es específica: dice qué hacer, cuándo y con quién",
            explica: "Una aplicación precisa dice qué hacer, cuándo y con quién; habla a distintos oyentes, como el joven o el que sufre; y se aplica primero al predicador.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La aplicación responde a la pregunta: ¿qué quiere Dios que hagamos con esta verdad?",
            ref: "Santiago 1:22-25",
            titulo: "Una aplicación para la célula",
            relato: [
              "Eres líder de célula y vas a predicar Santiago 1:22-25 el jueves. El pasaje enseña que el que oye y no hace es como quien se mira en un espejo y olvida cómo es.",
              "En tu célula hay dos jóvenes, una familia con niños, un hermano que duda de su fe y una hermana que está sufriendo.",
              "Ya explicaste bien el texto en tu bosquejo; ahora preparas la aplicación.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué pregunta te haces para preparar la aplicación?",
                opciones: [
                  { texto: "¿Qué quiere Dios que hagamos con esta verdad?", bien: true, explica: "La aplicación responde a la pregunta: ¿qué quiere Dios que hagamos con esta verdad?" },
                  { texto: "¿Qué tema me gustaría predicar este jueves?", explica: "La aplicación sale del propósito del pasaje, no de las ideas del predicador." },
                  { texto: "¿Qué podría decir para que el grupo se emocione?", explica: "La aplicación responde qué quiere Dios que hagamos con esta verdad." },
                ],
                apoyo: "La aplicación responde a la pregunta: ¿qué quiere Dios que hagamos con esta verdad?",
                explica: "Un sermón que explica bien el texto pero no toca la vida está incompleto: la Palabra pide una respuesta.",
              },
              {
                tipo: "situacion",
                pregunta: "Antes del jueves, ¿a quién le aplicas primero el pasaje?",
                opciones: [
                  { texto: "A mí mismo: la aplicación empieza por el predicador.", bien: true, explica: "La aplicación se aplica primero al predicador." },
                  { texto: "A la hermana que sufre, porque es quien más lo necesita.", explica: "La aplicación habla a distintos oyentes, pero se aplica primero al predicador." },
                  { texto: "Al hermano que duda, para que el jueves deje de dudar.", explica: "Antes de aplicarla a los demás, el predicador se la aplica a sí mismo." },
                ],
                apoyo: "Se aplica primero al predicador",
                explica: "La aplicación empieza por el predicador: él es el primero que debe hacer lo que oye.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo piensas en los que te van a escuchar el jueves?",
                opciones: [
                  { texto: "Pienso cómo le habla el pasaje a cada uno de ellos.", bien: true, explica: "La aplicación habla a distintos oyentes: el joven, la familia, el que duda, el que sufre." },
                  { texto: "Preparo una sola aplicación para el que más asiste.", explica: "La aplicación habla a distintos oyentes, no a uno solo." },
                  { texto: "No pienso en ellos: la aplicación es igual para todos.", explica: "La aplicación piensa en el joven, en la familia, en el que duda y en el que sufre." },
                ],
                apoyo: "Habla a distintos oyentes: el joven, la familia, el que duda, el que sufre",
                explica: "Una buena aplicación habla a distintos oyentes: el joven, la familia, el que duda, el que sufre.",
              },
              {
                tipo: "explica",
                apoyo: "Es específica: dice qué hacer, cuándo y con quién",
                clave: {
                  id: "pr-n4-homiletica-2-5-a3-1",
                  tipo: "corta",
                  pregunta: "Escribe una aplicación específica de Santiago 1:22-25 para tu célula: qué harán, cuándo y con quién.",
                  ideas: [
                    { id: "que", peso: 34, texto: "Qué hacer: poner en práctica lo que oyeron, en algo concreto.", formas: ["poner en practica", "pondr* en practica", "pongan en practica", "ponemos en practica", "practic*", "hacer lo que", "haremos lo que", "hare lo que", "haran lo que", "obedec*", "cumpl*", "visit*", "llam*", "orar*", "ayud*", "perdon*", "servir*"] },
                    { id: "cuando", peso: 33, texto: "Cuándo: un día o un tiempo concreto.", formas: ["esta semana", "este (mes|fin)", "fin de semana", "(lunes|martes|miercoles|jueves|viernes|sabado|domingo|sabados|domingos)", "manana", "hoy", "cada (dia|manana|noche|tarde|semana)", "todos los dias"] },
                    { id: "quien", peso: 33, texto: "Con quién: una persona o un grupo concreto.", formas: ["con (familia|hermano|hermana|hermanos|hermanas|esposa|esposo|hijos|hijo|hija|hijas|amigo|amiga|amigos|amigas|vecino|vecina|vecinos|companero|companera|companeros|grupo|celula|padres|madre|padre|pareja|jovenes|joven|alguien)", "en (familia|pareja|grupo)", "a (familia|hermano|hermana|vecino|vecina|amigo|amiga|companero|companera|alguien)"] },
                  ],
                  modelo: "Esta semana, cada uno pondrá en práctica lo que oyó: el sábado visitaremos con nuestra familia a un vecino que sufre y oraremos con él, en vez de solo oír la Palabra.",
                },
              },
            ],
          },
          {
            apoyo: "Sale del propósito del pasaje, no de las ideas del predicador",
            ref: "Santiago 1:22-25",
            titulo: "El sermón del culto de jóvenes",
            relato: [
              "Te toca predicar Santiago 1:22-25 en el culto de jóvenes del sábado. Ya tienes la idea central: no basta con oír la Palabra; hay que hacerla.",
              "Un compañero te dice: Aprovecha y aplícalo al noviazgo, que es mi tema favorito.",
              "Mientras preparas, notas que tú tampoco has puesto en práctica algo que oíste hace poco.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con la idea de tu compañero?",
                opciones: [
                  { texto: "Saco la aplicación del propósito del pasaje, no de su tema.", bien: true, explica: "La aplicación sale del propósito del pasaje, no de las ideas del predicador." },
                  { texto: "La acepto, porque el noviazgo es un tema que les interesa a todos.", explica: "La aplicación sale del propósito del pasaje, no del tema favorito de nadie." },
                  { texto: "Junto su tema con el mío, para que el sermón sea más largo.", explica: "La aplicación sale del propósito del pasaje, no de las ideas del predicador." },
                ],
                apoyo: "Sale del propósito del pasaje, no de las ideas del predicador",
                explica: "La aplicación responde qué quiere Dios que hagamos con esta verdad, y eso lo dice el propósito del pasaje.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál de estas aplicaciones es específica?",
                opciones: [
                  { texto: "Esta semana, cada uno hará con un amigo algo de lo que oyó hoy.", bien: true, explica: "Es específica: dice qué hacer, cuándo y con quién." },
                  { texto: "Desde hoy, todos tenemos que ser jóvenes mucho más obedientes a Dios.", explica: "Es demasiado general: no dice qué hacer, cuándo ni con quién." },
                  { texto: "Que cada uno piense en el noviazgo esta semana, cuando tenga tiempo.", explica: "No sale del propósito del pasaje, ni dice qué hacer ni con quién." },
                ],
                apoyo: "Es específica: dice qué hacer, cuándo y con quién",
                explica: "Una aplicación específica dice qué hacer, cuándo y con quién.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con lo que tú no has puesto en práctica?",
                opciones: [
                  { texto: "Lo pongo en práctica yo primero, antes de predicarlo.", bien: true, explica: "La aplicación se aplica primero al predicador." },
                  { texto: "Lo dejo así: el sermón es para los jóvenes, no para mí.", explica: "La aplicación empieza por el predicador." },
                  { texto: "Lo predico con más fuerza, para que no se note que yo fallo.", explica: "Antes de pedirlo a otros, el predicador se aplica el pasaje a sí mismo." },
                ],
                apoyo: "Se aplica primero al predicador",
                explica: "El predicador es el primer oyente de su sermón: la aplicación empieza por él.",
              },
              {
                tipo: "explica",
                apoyo: "La aplicación sale del propósito del pasaje, es específica, habla a distintos oyentes y empieza por el predicador",
                clave: {
                  id: "pr-n4-homiletica-2-5-a3-2",
                  tipo: "corta",
                  pregunta: "Según la lección, ¿cómo debe ser la aplicación de tu sermón para los jóvenes?",
                  ideas: [
                    { id: "proposito", peso: 34, texto: "Sale del propósito del pasaje, no de las ideas del predicador.", formas: ["proposito del (pasaje|texto)", "sale del (pasaje|texto)", "del pasaje", "no de (las|mis|sus|tus) ideas"] },
                    { id: "especifica", peso: 33, texto: "Es específica: dice qué hacer, cuándo y con quién.", formas: ["especific*", "concret*", "que hacer", "con quien"] },
                    { id: "oyentes", peso: 33, texto: "Habla a distintos oyentes y se aplica primero al predicador.", formas: ["primero al predicador", "primero a mi", "a mi mismo", "aplic* primero", "yo primero", "primero yo", "(empieza|empiece|empiezo|comienza|comience) por (el|mi)", "distintos oyentes", "(cada|diferentes|varios|distintos) (oyente|oyentes|tipo)", "el que (duda|sufre)"] },
                  ],
                  errores: [
                    { id: "ideas", texto: "La aplicación sale del propósito del pasaje, no de las ideas del predicador.", formas: ["(sale|salir|salga|viene|venir|venga) de (las|mis|sus|tus) ideas", "(sale|salir|salga) del (gusto|tema) del predicador"], anula: "proposito" },
                  ],
                  modelo: "La aplicación sale del propósito del pasaje, no de mis ideas. Es específica: dice qué hacer, cuándo y con quién. Habla a distintos oyentes, como el joven y el que duda, y se aplica primero a mí, el predicador.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué se propuso saber Pablo entre los corintios? Toca las palabras que lo dicen.",
            texto: "cosa alguna sino a [[Jesucristo]], y a éste [[crucificado]]",
            apoyo: "Pablo se propuso no saber entre los corintios «cosa alguna sino a Jesucristo, y a éste crucificado»",
            ref: "1 Corintios 2:2",
            explica: "Pablo se propuso no saber entre los corintios cosa alguna sino a Jesucristo, y a éste crucificado. Por eso todo sermón debe mostrar lo que Cristo hizo.",
          },
          {
            consigna: "Pablo predicaba como embajador. ¿A qué rogaba en nombre de Cristo? Toca las palabras que lo dicen.",
            texto: "os rogamos en nombre de Cristo: [[Reconciliaos con Dios]]",
            apoyo: "Predicaba como embajador: «os rogamos en nombre de Cristo: Reconciliaos con Dios»",
            ref: "2 Corintios 5:20",
            explica: "Como embajador, Pablo rogaba en nombre de Cristo: reconciliaos con Dios. Todo sermón muestra lo que Cristo hizo, para que la obediencia nazca de la gracia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué todo sermón muestra lo que Cristo hizo.",
            texto: "Todo sermón debe [[mostrar]] lo que [[Cristo]] hizo, para que la obediencia nazca de la [[gracia]] y no solo del esfuerzo humano.",
            distractores: ["esconder", "Pablo", "culpa"],
            errores: {
              esconder: "Todo sermón debe mostrar lo que Cristo hizo.",
              Pablo: "El sermón muestra lo que Cristo hizo: Pablo se propuso no saber cosa alguna sino a Jesucristo, y a éste crucificado.",
              culpa: "La obediencia nace de la gracia, y no solo del esfuerzo humano.",
            },
            apoyo: "Todo sermón debe mostrar lo que Cristo hizo, para que la obediencia nazca de la gracia y no solo del esfuerzo humano",
            ref: "1 Corintios 2:2",
            explica: "Todo sermón muestra lo que Cristo hizo, para que la obediencia nazca de la gracia y no solo del esfuerzo humano.",
          },
          {
            consigna: "Completa lo que dice la lección sobre Cristo en el sermón.",
            texto: "Predica a Cristo: él es el [[centro]] y el [[poder]] de todo sermón.",
            distractores: ["adorno", "pretexto"],
            errores: {
              adorno: "Cristo es el centro de todo sermón, no un adorno.",
              pretexto: "Cristo es el poder de todo sermón.",
            },
            apoyo: "Predica a Cristo: él es el centro y el poder de todo sermón",
            ref: "1 Corintios 2:2",
            explica: "Cristo es el centro y el poder de todo sermón: el sermón muestra a Cristo crucificado, para que la obediencia nazca de la gracia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El llamado es claro, sincero y sin presión manipuladora: la decisión es obra del Espíritu en el corazón",
            ref: "Hechos 2:37-41",
            situacion: "Vas a predicar en el culto de evangelismo del sábado, y al final harás el llamado. Ya tienes tu sermón listo, con Cristo en el centro.",
            escenas: [
              {
                id: "e1",
                narra: "Llega el final del sermón.",
                pregunta: "¿Cómo haces el llamado?",
                opciones: [
                  { texto: "Invitas con claridad a creer en Cristo y a arrepentirse.", valor: 2, explica: "Al final, el predicador invita a responder: a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar.", siguiente: "e2" },
                  { texto: "Dices que nadie se va hasta que respondan al menos diez personas.", valor: 0, explica: "El llamado es claro, sincero y sin presión manipuladora.", siguiente: "e1b" },
                  { texto: "Invitas a responder, pero tan vago que nadie entiende a qué.", valor: 1, explica: "Invitar está bien, pero el llamado es claro: a creer en Cristo, a arrepentirse, a obedecer o a orar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Algunos se ven incómodos y miran la puerta.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Quitas la presión y los invitas con sinceridad a responder.", valor: 2, explica: "La decisión es obra del Espíritu en el corazón: el llamado es sincero y sin presión.", siguiente: "e2" },
                  { texto: "Insistes más fuerte y subes la música para mover a la gente.", valor: 0, explica: "Eso es presión manipuladora: la decisión es obra del Espíritu en el corazón.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Nadie responde todavía, y un hermano te dice al oído: Cuenta una historia triste, aunque la inventes, a ver si alguien se mueve.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que confías en que el Espíritu obra en el corazón.", valor: 2, explica: "La decisión es obra del Espíritu en el corazón: el llamado es claro, sincero y sin presión manipuladora." },
                  { texto: "Que tiene razón: conmover a la gente asegura las decisiones.", valor: 0, explica: "Las ilustraciones deben ser verdaderas, respetuosas y breves; y el llamado es sin presión manipuladora." },
                  { texto: "Que la contarás, aunque la historia no sea verdadera.", valor: 0, explica: "Las ilustraciones deben ser verdaderas, y el llamado es sincero." },
                ],
              },
              {
                id: "e3",
                narra: "Después del culto, una joven te dice que quiere arrepentirse y seguir a Cristo.",
                pregunta: "¿Qué piensas de lo que pasó?",
                opciones: [
                  { texto: "Que es obra del Espíritu en su corazón, no de tu talento.", valor: 2, explica: "La decisión es obra del Espíritu en el corazón." },
                  { texto: "Que tu manera de hablar fue lo que la convenció de verdad.", valor: 0, explica: "La decisión es obra del Espíritu en el corazón, no de la habilidad del predicador." },
                  { texto: "Que respondió porque el llamado duró más que otras veces.", valor: 0, explica: "No es la duración del llamado: la decisión es obra del Espíritu en el corazón." },
                ],
              },
            ],
          },
          {
            apoyo: "Al final, el predicador invita a responder: a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar",
            ref: "2 Corintios 5:20",
            situacion: "Predicas el domingo en tu iglesia sobre Santiago 1:22-25. Ya explicaste el pasaje, lo aplicaste y mostraste lo que Cristo hizo.",
            escenas: [
              {
                id: "e1",
                narra: "Llegas al llamado final.",
                pregunta: "¿A qué invitas a la iglesia?",
                opciones: [
                  { texto: "A obedecer en un punto concreto lo que oyeron hoy.", valor: 2, explica: "El predicador invita a responder: a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar." },
                  { texto: "A volver la semana que viene para seguir oyendo más.", valor: 0, explica: "La Palabra pide una respuesta: el que oye y no hace es como quien se mira en un espejo y olvida cómo es." },
                  { texto: "A orar por el sermón, sin decir qué deben responder.", valor: 1, explica: "Orar es una respuesta, pero el llamado es claro: dice a qué se invita." },
                ],
              },
              {
                id: "e2",
                narra: "Mientras invitas, piensas en cómo decirlo.",
                pregunta: "¿Cómo haces la invitación?",
                opciones: [
                  { texto: "Con claridad y sinceridad, sin presionar a nadie.", valor: 2, explica: "El llamado es claro, sincero y sin presión manipuladora." },
                  { texto: "Diciendo que Dios castigará hoy a quien no responda.", valor: 0, explica: "Eso es presión manipuladora: la decisión es obra del Espíritu en el corazón." },
                  { texto: "Con palabras tan suaves que nadie entiende qué se le pide.", valor: 1, explica: "No presionar está bien, pero el llamado también es claro." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un diácono te dice: Hoy nadie respondió; la próxima vez presiona más.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la decisión es obra del Espíritu en el corazón.", valor: 2, explica: "El llamado es claro y sincero, y la decisión es obra del Espíritu en el corazón." },
                  { texto: "Que tiene razón: el fruto depende de cuánto presione yo.", valor: 0, explica: "El llamado es sin presión manipuladora: la decisión es obra del Espíritu." },
                  { texto: "Que dejarás de hacer llamados, porque ya no sirven.", valor: 0, explica: "La Palabra pide una respuesta: al final, el predicador invita a responder." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El llamado es claro, sincero y sin presión manipuladora: la decisión es obra del Espíritu en el corazón",
            ref: "Hechos 2:37-41",
            clave: {
              id: "pr-n4-homiletica-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo debe ser el llamado al final del sermón, y por qué no se usa presión manipuladora?",
              ideas: [
                { id: "claro", peso: 50, texto: "Es claro y sincero: invita a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar.", formas: ["claro", "clara", "claridad", "sincer*", "invit* a (creer|arrepentirse|obedecer|orar|responder)", "a creer en cristo", "arrepent*", "a obedecer"] },
                { id: "espiritu", peso: 50, texto: "No usa presión, porque la decisión es obra del Espíritu en el corazón.", formas: ["obra del espiritu", "espiritu (obra|santo|en|convence|mueve)", "el espiritu", "del espiritu"] },
              ],
              errores: [
                { id: "presion", texto: "El llamado es sin presión manipuladora.", formas: ["hay que presionar", "debe* presionar", "conviene presionar", "us* presion", "presion* mas", "manipul*"], anula: "espiritu" },
              ],
              modelo: "El llamado es claro y sincero: invita a creer en Cristo, a arrepentirse, a obedecer en un punto concreto o a orar. No usa presión manipuladora, porque la decisión es obra del Espíritu en el corazón.",
            },
          },
          {
            apoyo: "Y termina con un llamado claro y sin manipulación, confiando en que el Espíritu obra en el corazón",
            ref: "Hechos 2:37-41",
            clave: {
              id: "pr-n4-homiletica-2-5-a7-2",
              tipo: "corta",
              pregunta: "Al final del sermón, ¿qué hace el predicador con el llamado, y qué le toca al Espíritu?",
              ideas: [
                { id: "invita", peso: 50, texto: "El predicador invita a responder con claridad y sinceridad: a creer, a arrepentirse, a obedecer o a orar.", formas: ["invit*", "claro", "clara", "claridad", "sincer*", "a creer", "arrepent*", "a obedecer", "a orar"] },
                { id: "decision", peso: 50, texto: "La decisión es obra del Espíritu en el corazón: por eso no hay presión manipuladora.", formas: ["la decision", "decide", "(convence|obra|mueve|cambia|toca) corazon", "en el corazon", "obra del espiritu"] },
              ],
              errores: [
                { id: "presion", texto: "El llamado es sin presión manipuladora.", formas: ["hay que presionar", "debe* presionar", "conviene presionar", "us* presion", "presion* mas", "manipul*"], anula: "decision" },
              ],
              modelo: "El predicador invita con claridad y sinceridad a responder: a creer en Cristo, a arrepentirse, a obedecer o a orar. La decisión es obra del Espíritu en el corazón, por eso no usa presión manipuladora.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La entrega y el sermón con rúbrica
    "n4-homiletica-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué le pidió Pablo a Timoteo que se ocupara?", reverso: "En la lectura, la exhortación y la enseñanza.", apoyo: "Pablo le pidió a Timoteo: «ocúpate en la lectura, la exhortación y la enseñanza»" },
              { frente: "¿Qué conviene usar al predicar, en vez de leer todo el manuscrito?", reverso: "Notas breves o un bosquejo.", apoyo: "Usa notas breves o un bosquejo; no leas todo el manuscrito" },
              { frente: "¿Cuánto dura el sermón del nivel?", reverso: "Entre 20 y 30 minutos.", apoyo: "Respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos" },
              { frente: "¿Qué hace el predicador antes de predicar?", reverso: "Ora y depende del Espíritu Santo.", apoyo: "Ora antes y depende del Espíritu Santo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué le pidió Pablo a Timoteo que tuviera cuidado?", reverso: "De sí mismo y de la doctrina.", apoyo: "y también: «Ten cuidado de ti mismo y de la doctrina»" },
              { frente: "¿Cómo se habla al predicar?", reverso: "Con naturalidad, mirando a la congregación.", apoyo: "Habla con naturalidad, mirando a la congregación" },
              { frente: "¿Qué conviene hacer con tu sermón antes de presentarlo?", reverso: "Grabarte y escucharte.", apoyo: "Grábate y escúchate antes de presentar tu sermón" },
              { frente: "¿A quién se prepara primero el predicador?", reverso: "A sí mismo.", apoyo: "La entrega importa, pero el predicador se prepara primero a sí mismo" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se prepara la entrega del sermón.",
            texto: "Para la entrega se usan notas [[breves]], se habla con naturalidad, se respeta el [[tiempo]] y se depende del [[Espíritu]].",
            distractores: ["largas", "aplauso", "público"],
            errores: {
              largas: "Se usan notas breves o un bosquejo; no se lee todo el manuscrito.",
              aplauso: "Se respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos.",
              "público": "El predicador ora antes y depende del Espíritu Santo.",
            },
            apoyo: "Para la entrega se usan notas breves, se habla con naturalidad, se respeta el tiempo y se depende del Espíritu",
            ref: "1 Timoteo 4:13-16",
            explica: "Para la entrega se usan notas breves, se habla con naturalidad mirando a la congregación, se respeta el tiempo y se depende del Espíritu Santo.",
          },
          {
            consigna: "Completa el consejo para escucharte antes de presentar tu sermón.",
            texto: "Grábate y [[escúchate]] antes de presentar tu sermón. Pide a un hermano [[maduro]] que use la [[rúbrica]] contigo y te diga qué mejorar.",
            distractores: ["olvídate", "novato", "cámara"],
            errores: {
              "olvídate": "Grábate y escúchate antes de presentar tu sermón.",
              novato: "Se le pide a un hermano maduro que use la rúbrica contigo.",
              "cámara": "El hermano maduro usa contigo la rúbrica y te dice qué mejorar.",
            },
            apoyo: "Grábate y escúchate antes de presentar tu sermón. Pide a un hermano maduro que use la rúbrica contigo y te diga qué mejorar",
            explica: "Antes de presentar tu sermón, grábate y escúchate, y pide a un hermano maduro que use la rúbrica contigo y te diga qué mejorar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la rúbrica con lo que evalúa.",
            pares: [
              ["Fidelidad al texto", "Que el mensaje del sermón sea el mensaje del pasaje"],
              ["Idea central", "Una idea clara y un propósito definido"],
              ["Estructura", "Puntos que salen del texto y transiciones"],
              ["Cristo y la gracia", "En el centro, sin forzar el texto"],
              ["Entrega", "Claridad, contacto con los oyentes y tiempo"],
            ],
            apoyo: "El sermón del Nivel 4 se evalúa con una rúbrica de 100 puntos: fidelidad al texto, idea central, estructura, Cristo, aplicación y entrega",
            explica: "La rúbrica evalúa la fidelidad al texto, una idea central clara con su propósito, una estructura con puntos que salen del texto y transiciones, a Cristo y la gracia en el centro, la aplicación y la entrega.",
          },
          {
            consigna: "Une cada parte de la evaluación con lo que dice la lección.",
            pares: [
              ["Fidelidad al texto", "Vale 25 puntos, la parte que más vale"],
              ["Aplicación", "Concreta, con ilustraciones verdaderas"],
              ["Para aprobar el sermón", "Hacen falta 70 puntos"],
              ["La rúbrica completa", "Suma 100 puntos"],
              ["Quien evalúa el sermón", "Un maestro de la academia"],
            ],
            apoyo: "Un maestro de la academia evalúa el sermón con esta rúbrica, y se aprueba con 70 puntos",
            explica: "Un maestro de la academia evalúa el sermón con una rúbrica de 100 puntos, y se aprueba con 70. La fidelidad al texto vale 25 puntos, y la aplicación pide ser concreta y con ilustraciones verdaderas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Usar la rúbrica de la academia para evaluar un sermón",
            ref: "2 Timoteo 2:15",
            titulo: "La rúbrica en la mano",
            relato: [
              "Un compañero de la academia te pide que uses la rúbrica con su sermón de práctica sobre Efesios 2:1-10, antes de que lo presente.",
              "Su sermón sigue el pasaje y muestra la gracia de Cristo, pero lee todo el manuscrito sin mirar a nadie, y dura 45 minutos.",
              "Además, sus tres puntos no tienen transiciones, y los oyentes se pierden al pasar de uno a otro.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿En qué parte de la rúbrica pierde puntos por leer todo y pasarse del tiempo?",
                opciones: [
                  { texto: "En la entrega, que mide claridad, contacto y tiempo.", bien: true, explica: "La entrega evalúa la claridad, el contacto con los oyentes y el tiempo." },
                  { texto: "En la fidelidad al texto, que es la parte que vale 25 puntos.", explica: "Su sermón sigue el pasaje: lo que falla al leer todo y pasarse del tiempo es la entrega." },
                  { texto: "En la idea central, porque no la dijo en una sola frase.", explica: "El caso no dice eso: leer todo el manuscrito y pasarse del tiempo afecta la entrega." },
                ],
                apoyo: "Entrega: claridad, contacto con los oyentes y tiempo (15 puntos)",
                explica: "En la entrega se usan notas breves, se habla mirando a la congregación y se respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y en qué parte pierde por no tener transiciones?",
                opciones: [
                  { texto: "En la estructura: puntos que salen del texto y transiciones.", bien: true, explica: "La estructura evalúa los puntos que salen del texto y las transiciones." },
                  { texto: "En la aplicación, porque sus ilustraciones no eran verdaderas.", explica: "El caso no habla de sus ilustraciones: las transiciones son parte de la estructura." },
                  { texto: "En Cristo y la gracia, porque forzó el texto para hablar de él.", explica: "Su sermón muestra la gracia de Cristo: las transiciones son parte de la estructura." },
                ],
                apoyo: "Estructura: puntos que salen del texto y transiciones (15 puntos)",
                explica: "La estructura pide puntos que salen del texto y transiciones que unen un punto con el siguiente.",
              },
              {
                tipo: "situacion",
                pregunta: "Al sumar, le das 66 puntos. ¿Qué le dices?",
                opciones: [
                  { texto: "Que todavía no aprueba, porque hacen falta 70 puntos.", bien: true, explica: "El sermón se aprueba con 70 puntos." },
                  { texto: "Que ya aprueba, porque pasó de la mitad de los puntos.", explica: "No basta con pasar de la mitad: se aprueba con 70 puntos." },
                  { texto: "Que aprueba, porque la fidelidad al texto es lo único que cuenta.", explica: "La rúbrica tiene seis partes que suman 100 puntos, y se aprueba con 70." },
                ],
                apoyo: "se aprueba con 70 puntos",
                explica: "Un maestro de la academia evalúa el sermón con la rúbrica, y se aprueba con 70 puntos.",
              },
              {
                tipo: "explica",
                apoyo: "Usa notas breves o un bosquejo; no leas todo el manuscrito",
                clave: {
                  id: "pr-n4-homiletica-2-6-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué le aconsejas para mejorar su entrega antes de presentar el sermón?",
                  ideas: [
                    { id: "notas", peso: 34, texto: "Que use notas breves o un bosquejo, y no lea todo el manuscrito.", formas: ["notas breves", "bosquejo", "no (lea|leer|leas) todo", "sin leer", "no (lea|leer|leas) el manuscrito", "deje* el manuscrito", "dejar el manuscrito"] },
                    { id: "mirar", peso: 33, texto: "Que hable con naturalidad, mirando a la congregación.", formas: ["naturalidad", "natural", "mir* a la (congregacion|gente|iglesia)", "mir* a (los|las) (oyentes|personas|hermanos)", "contacto con", "contacto visual"] },
                    { id: "tiempo", peso: 33, texto: "Que respete el tiempo: entre 20 y 30 minutos.", formas: ["20 y 30", "veinte y treinta", "(20|veinte) a (30|treinta)", "respet* el tiempo", "(30|treinta) minutos", "acort*", "menos tiempo"] },
                  ],
                  modelo: "Le aconsejo usar notas breves o un bosquejo y no leer todo el manuscrito, hablar con naturalidad mirando a la congregación y respetar el tiempo, entre 20 y 30 minutos.",
                },
              },
            ],
          },
          {
            apoyo: "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje (25 puntos)",
            ref: "2 Timoteo 2:15",
            titulo: "Buena voz, poco texto",
            relato: [
              "Un compañero de la academia te pide que uses la rúbrica con la grabación de su sermón de práctica sobre Filipenses 4:10-13.",
              "Su entrega es excelente: habla con naturalidad, mira a la congregación y termina a los 25 minutos.",
              "Pero usa el versículo 13 como una promesa de lograr cualquier meta, y casi no explica el párrafo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿En qué parte de la rúbrica pierde más puntos?",
                opciones: [
                  { texto: "En la fidelidad al texto, la parte que vale 25 puntos.", bien: true, explica: "La fidelidad al texto pide que el mensaje del sermón sea el mensaje del pasaje, y es la parte que más vale." },
                  { texto: "En la entrega, porque terminó antes de los 30 minutos.", explica: "El sermón del nivel dura entre 20 y 30 minutos: su entrega fue buena." },
                  { texto: "En la estructura, porque habló con demasiada naturalidad.", explica: "Hablar con naturalidad es parte de una buena entrega." },
                ],
                apoyo: "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje (25 puntos)",
                explica: "Si el mensaje del sermón no es el mensaje del pasaje, se pierde la parte que más vale de la rúbrica: la fidelidad al texto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué parte de la rúbrica sí la tiene muy bien?",
                opciones: [
                  { texto: "La entrega: claridad, contacto con los oyentes y tiempo.", bien: true, explica: "Habló con naturalidad, miró a la congregación y respetó el tiempo." },
                  { texto: "La fidelidad, porque citó el versículo 13 de memoria.", explica: "Citar el versículo no basta: la fidelidad pide que el mensaje del sermón sea el del pasaje." },
                  { texto: "La aplicación, porque prometió que todos lograrán sus metas.", explica: "La aplicación pide ser concreta y con ilustraciones verdaderas, y sale del pasaje." },
                ],
                apoyo: "Entrega: claridad, contacto con los oyentes y tiempo (15 puntos)",
                explica: "La entrega evalúa la claridad, el contacto con los oyentes y el tiempo, y en eso estuvo muy bien.",
              },
              {
                tipo: "situacion",
                pregunta: "Con la entrega perfecta y lo demás muy bajo, suma 62 puntos. ¿Qué le dices?",
                opciones: [
                  { texto: "Que no aprueba, porque hacen falta 70 de los 100 puntos.", bien: true, explica: "El sermón se aprueba con 70 puntos." },
                  { texto: "Que aprueba, porque la entrega es lo que más notan todos.", explica: "La entrega vale 15 puntos; se aprueba con 70 de los 100 de la rúbrica." },
                  { texto: "Que aprueba, porque 62 es más de la mitad de 100.", explica: "No basta con pasar de la mitad: se aprueba con 70 puntos." },
                ],
                apoyo: "se aprueba con 70 puntos",
                explica: "Una buena entrega no basta: el sermón se aprueba con 70 de los 100 puntos de la rúbrica.",
              },
              {
                tipo: "explica",
                apoyo: "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje (25 puntos)",
                clave: {
                  id: "pr-n4-homiletica-2-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué debe cambiar primero en su sermón, y por qué eso primero?",
                  ideas: [
                    { id: "pasaje", peso: 50, texto: "Que el mensaje del sermón sea el mensaje del pasaje: leer el párrafo completo y predicar el contentamiento.", formas: ["mensaje del (pasaje|texto)", "parrafo complet*", "su contexto", "el contexto", "contentamiento", "content*", "no es una promesa"] },
                    { id: "vale", peso: 50, texto: "Porque la fidelidad al texto vale 25 puntos, la parte que más vale.", formas: ["25", "veinticinco", "mas (vale|puntos|importante)", "la que mas", "vale mas"] },
                  ],
                  modelo: "Debe hacer que el mensaje del sermón sea el mensaje del pasaje: leer el párrafo completo y predicar el contentamiento en Cristo. Es lo primero porque la fidelidad al texto vale 25 puntos, la parte que más vale.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la rúbrica del sermón: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La fidelidad al texto es la parte de la rúbrica que más puntos vale.", verdad: true, explica: "Vale 25 puntos; las otras cinco partes valen 15 cada una.", apoyo: "Fidelidad al texto: el mensaje del sermón es el mensaje del pasaje (25 puntos)" },
              { texto: "El sermón del Nivel 4 se aprueba con 50 puntos.", verdad: false, explica: "Un maestro de la academia evalúa el sermón con la rúbrica, y se aprueba con 70 puntos.", apoyo: "se aprueba con 70 puntos" },
              { texto: "La rúbrica pide a Cristo y la gracia en el centro, sin forzar el texto.", verdad: true, explica: "Es una de las seis partes de la rúbrica, y vale 15 puntos.", apoyo: "Cristo y la gracia en el centro, sin forzar el texto (15 puntos)" },
            ],
          },
          {
            consigna: "Sobre la entrega y la evaluación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un maestro de la academia evalúa el sermón con la rúbrica.", verdad: true, explica: "Así lo dice la lección, y se aprueba con 70 puntos.", apoyo: "Un maestro de la academia evalúa el sermón con esta rúbrica" },
              { texto: "En la rúbrica, la entrega vale más que la fidelidad al texto.", verdad: false, explica: "La entrega vale 15 puntos, y la fidelidad al texto, 25.", apoyo: "Entrega: claridad, contacto con los oyentes y tiempo (15 puntos)" },
              { texto: "El sermón del nivel dura entre 40 y 50 minutos.", verdad: false, explica: "Respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos.", apoyo: "el sermón del nivel dura entre 20 y 30 minutos" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Prepárate a ti mismo antes de preparar el sermón",
            ref: "1 Timoteo 4:16",
            situacion: "Ya terminaste las lecciones del Nivel 4 y te preparas para el sermón evaluado con rúbrica. Faltan tres semanas.",
            escenas: [
              {
                id: "e1",
                narra: "Hoy empiezas a prepararte.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Te preparas tú: oras y cuidas tu vida y la doctrina.", valor: 2, explica: "«Ten cuidado de ti mismo y de la doctrina»: el predicador se prepara primero a sí mismo.", siguiente: "e2" },
                  { texto: "Escribes el manuscrito entero para leerlo el día del sermón.", valor: 0, explica: "Usa notas breves o un bosquejo; no leas todo el manuscrito.", siguiente: "e1b" },
                  { texto: "Buscas el pasaje, pero dejas la oración para el último día.", valor: 1, explica: "Buscar el pasaje está bien, pero el predicador se prepara primero a sí mismo: ora y depende del Espíritu Santo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al ensayar leyendo el manuscrito, no levantas los ojos del papel.",
                pregunta: "¿Qué cambias?",
                opciones: [
                  { texto: "Pasas a notas breves y hablas mirando a la congregación.", valor: 2, explica: "Usa notas breves o un bosquejo, y habla con naturalidad, mirando a la congregación.", siguiente: "e2" },
                  { texto: "Lo lees más rápido, para que nadie note que estás leyendo.", valor: 0, explica: "No leas todo el manuscrito: usa notas breves y mira a la congregación.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya tienes tu sermón. Antes de presentarlo, quieres saber cómo va.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te grabas y pides a un hermano maduro que use la rúbrica contigo.", valor: 2, explica: "Grábate y escúchate antes de presentar tu sermón, y pide a un hermano maduro que use la rúbrica contigo." },
                  { texto: "Lo presentas así, sin escucharte antes, para que suene espontáneo y fresco.", valor: 0, explica: "Grábate y escúchate antes de presentar tu sermón." },
                  { texto: "Te grabas y te escuchas, pero no le pides a nadie su opinión.", valor: 1, explica: "Escucharte ayuda; también conviene pedir a un hermano maduro que use la rúbrica contigo y te diga qué mejorar." },
                ],
              },
              {
                id: "e3",
                narra: "Al escucharte, ves que tu sermón dura 45 minutos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo acortas para que dure entre 20 y 30 minutos, sin prisa.", valor: 2, explica: "Respeta el tiempo: el sermón del nivel dura entre 20 y 30 minutos." },
                  { texto: "Lo dejas así: lo importante es decir todo lo que preparaste.", valor: 0, explica: "La entrega también evalúa el tiempo: el sermón del nivel dura entre 20 y 30 minutos." },
                  { texto: "Hablas más rápido, para que todo quepa en 30 minutos.", valor: 1, explica: "Cumples el tiempo, pero la entrega también evalúa la claridad: mejor ajustar el sermón." },
                ],
              },
            ],
          },
          {
            apoyo: "Mientras tanto, practica con ella",
            ref: "2 Timoteo 2:15",
            situacion: "Te preparas para el sermón evaluado del Nivel 4. Ya escogiste el pasaje y tienes la idea central, el bosquejo y la aplicación.",
            escenas: [
              {
                id: "e1",
                narra: "Quieres saber cómo te evaluarán.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Practicas con la rúbrica, parte por parte, desde ahora.", valor: 2, explica: "Mientras tanto, practica con ella: fidelidad al texto, idea central, estructura, Cristo, aplicación y entrega." },
                  { texto: "Te concentras solo en la entrega, que es lo que más se ve.", valor: 0, explica: "La entrega vale 15 puntos; la fidelidad al texto vale 25, y la rúbrica tiene seis partes." },
                  { texto: "Repasas solo la fidelidad al texto, porque es la que más vale.", valor: 1, explica: "La fidelidad al texto vale 25 puntos, pero la rúbrica tiene seis partes: practica con todas." },
                ],
              },
              {
                id: "e2",
                narra: "Al revisar con la rúbrica, notas que tu sermón casi no menciona a Cristo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Muestras lo que Cristo hizo, sin forzar el texto.", valor: 2, explica: "La rúbrica pide a Cristo y la gracia en el centro, sin forzar el texto." },
                  { texto: "Agregas una frase sobre Cristo al final, aunque no salga del pasaje.", valor: 0, explica: "Cristo y la gracia van en el centro, sin forzar el texto." },
                  { texto: "Lo dejas así, porque la rúbrica solo mira la entrega.", valor: 0, explica: "La rúbrica tiene seis partes, y una de ellas es Cristo y la gracia en el centro." },
                ],
              },
              {
                id: "e3",
                narra: "La noche antes del sermón te sientes nervioso.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras antes y dependes del Espíritu Santo.", valor: 2, explica: "Ora antes y depende del Espíritu Santo." },
                  { texto: "Reescribes todo el sermón esa misma noche.", valor: 0, explica: "Ya te preparaste: ahora ora y depende del Espíritu Santo." },
                  { texto: "Ensayas una vez más, confiando solo en tu técnica.", valor: 1, explica: "Ensayar ayuda, pero ora antes y depende del Espíritu Santo." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Para la entrega se usan notas breves, se habla con naturalidad, se respeta el tiempo y se depende del Espíritu, cuidando primero la propia vida y la doctrina",
            ref: "1 Timoteo 4:16",
            clave: {
              id: "pr-n4-homiletica-2-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo te vas a preparar para el sermón evaluado del Nivel 4? Menciona tres cosas que harás.",
              ideas: [
                { id: "mismo", peso: 34, texto: "Prepararme a mí mismo: orar, depender del Espíritu y cuidar mi vida y la doctrina.", formas: ["(orar|orare|oracion|orando|oro)", "espiritu", "cuid* mi vida", "cuidado de mi", "a mi mismo", "mi vida", "la doctrina"] },
                { id: "rubrica", peso: 33, texto: "Practicar con la rúbrica: grabarme, escucharme y pedir a un hermano maduro que la use conmigo.", formas: ["rubrica", "grab*", "escuch*", "hermano maduro"] },
                { id: "entrega", peso: 33, texto: "Cuidar la entrega: notas breves, naturalidad y entre 20 y 30 minutos.", formas: ["notas breves", "bosquejo", "naturalidad", "natural", "mir* a la (congregacion|gente|iglesia)", "20 y 30", "(30|treinta) minutos", "respet* el tiempo"] },
              ],
              modelo: "Primero me prepararé a mí mismo: oraré y cuidaré mi vida y la doctrina. Después practicaré con la rúbrica, me grabaré y pediré a un hermano maduro que me evalúe. Y usaré notas breves y respetaré el tiempo, entre 20 y 30 minutos.",
            },
          },
          {
            apoyo: "Pide a un hermano maduro que use la rúbrica contigo y te diga qué mejorar",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n4-homiletica-2-6-a7-2",
              tipo: "corta",
              pregunta: "Faltan dos semanas para tu sermón evaluado del Nivel 4. ¿Cómo vas a practicar antes, y qué puntaje necesitas para aprobar?",
              ideas: [
                { id: "practicar", peso: 50, texto: "Grabarme, escucharme y pedir a un hermano maduro que use la rúbrica conmigo y me diga qué mejorar.", formas: ["grab*", "escuch*", "hermano maduro", "que mejorar", "(me|nos) (diga|evalue|corrija)", "rubrica"] },
                { id: "aprobar", peso: 50, texto: "Se aprueba con 70 de los 100 puntos de la rúbrica.", formas: ["70", "setenta"] },
              ],
              modelo: "Me voy a grabar y a escuchar, y le pediré a un hermano maduro que use la rúbrica conmigo y me diga qué mejorar. Para aprobar necesito 70 de los 100 puntos de la rúbrica.",
            },
          },
        ],
      },
    ],
  },
};
