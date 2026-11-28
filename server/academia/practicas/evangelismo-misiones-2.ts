/**
 * Las prácticas de «Campañas y cruzadas» (especialidad Evangelismo y misiones, materia 2). Hechas solo con lo que dice
 * cada lección (server/academia/contenido/evangelismo-misiones-2.ts), con la guía de docs/academia-practicas.md.
 *
 * Profundiza la lección «Campañas, calle, radio y redes» del Nivel 3 (n3-evangelismo-consolidacion): sus actividades no
 * se repiten aquí. Hechos 2:38 se cita tal como lo trae la lección, sin preguntar qué papel tiene el bautismo (las
 * iglesias lo entienden de maneras distintas). De los compromisos de Modesto se pregunta lo que la lección enseña de cada
 * área; la decisión de Billy Graham y su equipo de no quedarse nunca a solas con una mujer que no fuera su esposa no se
 * pregunta ni se pide como norma.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_EVANGELISMO_MISIONES_2: PracticasMateria = {
  materia: "evangelismo-misiones-2",
  mision: {
    titulo: "Haz obra de evangelista: la campaña de tu ciudad",
    intro: "Las iglesias de tu ciudad quieren hacer juntas una campaña evangelística, y te piden que ayudes a prepararla. Vas a recorrer todo el camino: ver cómo se anunció el evangelio en público en la Biblia y en la historia, preparar la campaña con oración, unidad y un presupuesto, cuidar el mensaje y el llamado, formar a los consejeros y el seguimiento, y evaluarla con integridad. Repasa las seis lecciones para tener lista cada parte.",
    cierre: "Ya sabes servir en una campaña: con la compasión de Jesús por las multitudes, aprendiendo de la historia, con oración, unidad y cuentas claras, con un mensaje claro y un llamado honesto, con consejeros y un seguimiento que une a cada persona con una iglesia, y con una integridad que cuida el testimonio. Es lo que Pablo le pidió a Timoteo: «haz obra de evangelista, cumple tu ministerio».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La proclamación pública en la Biblia
    "evangelismo-misiones-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es una campaña o cruzada evangelística?", reverso: "Un tiempo de predicación pública del evangelio, muchas veces con varias iglesias juntas.", apoyo: "Una campaña o cruzada evangelística es un tiempo de predicación pública del evangelio, muchas veces con varias iglesias juntas" },
              { frente: "¿De qué nace una campaña?", reverso: "De la compasión de Jesús por las multitudes, no del deseo de llenar un lugar.", apoyo: "Una campaña nace de esa compasión, no del deseo de llenar un lugar" },
              { frente: "¿Qué pasó cuando Jonás predicó por las calles de Nínive?", reverso: "Los hombres de Nínive creyeron a Dios, y la ciudad se volvió de su mal camino.", apoyo: "la ciudad entera se volvió de su mal camino" },
              { frente: "¿Por qué muchos prefieren decir campaña y no cruzada?", reverso: "Porque cruzada recuerda las guerras de la Edad Media, que nada tienen que ver con el evangelio.", apoyo: "La palabra cruzada recuerda las guerras de la Edad Media, que nada tienen que ver con el evangelio" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le pidió Pablo a Timoteo en el versículo de memoria de esta materia?", reverso: "«haz obra de evangelista, cumple tu ministerio».", apoyo: "Pablo animó a Timoteo: «haz obra de evangelista, cumple tu ministerio»" },
              { frente: "¿Cuántas personas se añadieron el día de Pentecostés?", reverso: "Como tres mil personas.", apoyo: "Ese día se añadieron como tres mil personas" },
              { frente: "¿A quién predicaba Felipe en Samaria?", reverso: "A Cristo; y había gran gozo en aquella ciudad.", apoyo: "En Samaria, Felipe «les predicaba a Cristo»" },
              { frente: "¿Qué fruto buscaba la iglesia: una multitud o algo más?", reverso: "No una multitud, sino discípulos que perseveraran.", apoyo: "El fruto que buscaba la iglesia no era una multitud, sino discípulos que perseveraran" },
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
            consigna: "Une a cada uno con lo que hizo al anunciar en público el mensaje de Dios.",
            pares: [
              ["Jesús", "Recorría las ciudades y aldeas, enseñando y predicando"],
              ["Jonás", "Predicó por las calles de Nínive"],
              ["Pedro", "Se puso en pie con los once y alzó la voz"],
              ["Felipe", "Les predicaba a Cristo a los de Samaria"],
            ],
            apoyo: "La proclamación pública del evangelio está en toda la Biblia",
            explica: "Jesús recorría ciudades y aldeas con compasión por las multitudes, Jonás predicó en Nínive, Pedro alzó la voz en Pentecostés y Felipe predicó a Cristo en Samaria.",
          },
          {
            consigna: "¿Dónde anunció cada uno el mensaje de Dios? Une a cada uno con su lugar.",
            pares: [
              ["Jesús", "En todas las ciudades y aldeas"],
              ["Jonás", "Por las calles de Nínive"],
              ["Pedro, con los once", "Ante una multitud en Jerusalén"],
              ["Felipe", "En una ciudad de Samaria"],
            ],
            apoyo: "Jonás predicó en Nínive, Pedro alzó la voz en Pentecostés y Felipe predicó a Cristo en Samaria",
            explica: "La Biblia está llena de anuncios públicos del mensaje de Dios: Jesús en las ciudades y aldeas, Jonás en Nínive, Pedro en Jerusalén y Felipe en Samaria.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Jonás 3:5",
            consigna: "Jonás predicó por las calles de Nínive. ¿Qué hicieron los hombres de la ciudad, y a quién? Toca las palabras que lo dicen.",
            texto: "los hombres de Nínive [[creyeron]] a [[Dios]]",
            apoyo: "la ciudad entera se volvió de su mal camino",
            explica: "Jonás predicó por las calles de Nínive, y «los hombres de Nínive creyeron a Dios»: la ciudad entera se volvió de su mal camino (Jonás 3:10).",
          },
          {
            ref: "Hechos 2:14",
            consigna: "En Pentecostés, Pedro se puso en pie con los once. ¿Qué hizo entonces ante la multitud? Toca las palabras que lo dicen.",
            texto: "poniéndose en pie con los once, [[alzó]] la [[voz]]",
            apoyo: "Pedro alzó la voz en Pentecostés",
            explica: "En Pentecostés, Pedro, «poniéndose en pie con los once, alzó la voz» ante una multitud en Jerusalén, y ese día se añadieron como tres mil personas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Busca discípulos o solo números? Lleva cada frase a su grupo.",
            grupos: ["Busca discípulos", "Busca solo números"],
            frases: [
              { texto: "Que los nuevos perseveren en la doctrina de los apóstoles", grupo: 0 },
              { texto: "Que los nuevos sigan unidos en la comunión unos con otros", grupo: 0 },
              { texto: "Que los que creyeron sigan firmes después de la campaña", grupo: 0 },
              { texto: "Llenar el lugar para que se vea una gran multitud", grupo: 1 },
              { texto: "Contar cuántos vinieron y no saber más de ellos", grupo: 1 },
              { texto: "Anunciar una cifra grande y olvidar a los nuevos", grupo: 1 },
            ],
            apoyo: "El fruto que buscaba la iglesia no era una multitud, sino discípulos que perseveraran",
            ref: "Hechos 2:41-42",
            explica: "En Pentecostés se añadieron como tres mil personas, y lo más importante vino después: perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones.",
          },
          {
            consigna: "Después de una campaña, ¿cada noticia habla de discípulos o solo de números? Lleva cada frase a su grupo.",
            grupos: ["Habla de discípulos", "Habla solo de números"],
            frases: [
              { texto: "Un mes después, los nuevos estudian la Biblia en una iglesia", grupo: 0 },
              { texto: "Los nuevos creyentes oran juntos cada semana", grupo: 0 },
              { texto: "Los que creyeron siguen en la comunión de la iglesia", grupo: 0 },
              { texto: "Vinieron tantos que no cabía nadie más", grupo: 1 },
              { texto: "Fue la reunión más grande que se ha hecho en la ciudad", grupo: 1 },
              { texto: "Pasaron adelante muchos, pero nadie sabe quiénes eran", grupo: 1 },
            ],
            apoyo: "Reconocer que la proclamación pública busca discípulos, y no solo números",
            ref: "Hechos 2:41-42",
            explica: "El fruto que buscaba la iglesia no era una multitud, sino discípulos que perseveraran: en la doctrina de los apóstoles, en la comunión y en las oraciones.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del comité de la campaña te dice: Hagámosla en el estadio, para llenarlo y que la ciudad vea cuántos somos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que una campaña nace de la compasión por las personas, no de llenar un lugar.", bien: true, explica: "Jesús, al ver las multitudes, tuvo compasión de ellas: una campaña nace de esa compasión, no del deseo de llenar un lugar." },
              { texto: "Que tiene razón: si el estadio se llena, la campaña ya cumplió su propósito.", explica: "Una campaña nace de la compasión de Jesús por las multitudes, no del deseo de llenar un lugar." },
              { texto: "Que mejor no hagan nada en público, porque el mensaje de Dios se anuncia en privado.", explica: "La Biblia está llena de anuncios públicos del mensaje de Dios: Jesús, Jonás, Pedro y Felipe predicaron en público." },
              { texto: "Que lo importante es que la ciudad vea lo fuerte que es la iglesia evangélica.", explica: "Una campaña empieza con la compasión de Jesús por las personas, no con mostrar cuántos somos." },
            ],
            apoyo: "Una campaña nace de esa compasión, no del deseo de llenar un lugar",
            ref: "Mateo 9:35-36",
            explica: "«al ver las multitudes, tuvo compasión de ellas». Una campaña nace de esa compasión, no del deseo de llenar un lugar.",
          },
          {
            caso: "Una joven del grupo de evangelismo te dice: ¿Para qué una campaña en ese barrio? Ahí nadie viene a la iglesia; no vale la pena.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Jesús tuvo compasión de las multitudes, y de ahí nace una campaña.", bien: true, explica: "Una campaña empieza con la compasión de Jesús por las personas, también por las que nunca vienen a la iglesia." },
              { texto: "Que tiene razón: es mejor esperar a que esas personas lleguen solas al templo.", explica: "Jesús recorría todas las ciudades y aldeas, enseñando y predicando: no esperaba a que llegaran." },
              { texto: "Que solo vale la pena si en ese barrio se puede reunir a muchísima gente.", explica: "Una campaña nace de la compasión, no del deseo de llenar un lugar." },
              { texto: "Que mejor hagan la campaña en otro barrio, donde la gente ya va a la iglesia.", explica: "Una campaña empieza con la compasión de Jesús por las personas: él tuvo compasión de las multitudes." },
            ],
            apoyo: "Una campaña empieza con la compasión de Jesús por las personas",
            ref: "Mateo 9:35-36",
            explica: "Jesús recorría las ciudades y aldeas, y «al ver las multitudes, tuvo compasión de ellas». Una campaña empieza con esa compasión por las personas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la compasión que mueve una campaña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús, al ver las multitudes, tuvo compasión de ellas.", verdad: true, explica: "Así lo dice Mateo: «al ver las multitudes, tuvo compasión de ellas».", apoyo: "«al ver las multitudes, tuvo compasión de ellas»", ref: "Mateo 9:36" },
              { texto: "Una campaña nace del deseo de llenar un lugar.", verdad: false, explica: "Una campaña nace de la compasión de Jesús por las multitudes, no del deseo de llenar un lugar.", apoyo: "Una campaña nace de esa compasión, no del deseo de llenar un lugar" },
              { texto: "Jesús esperaba en un solo lugar a que las multitudes llegaran a él.", verdad: false, explica: "«Recorría Jesús todas las ciudades y aldeas», enseñando y predicando.", apoyo: "«Recorría Jesús todas las ciudades y aldeas», enseñando y predicando", ref: "Mateo 9:35" },
            ],
          },
          {
            consigna: "Sobre el motivo de una campaña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una campaña empieza con la compasión de Jesús por las personas.", verdad: true, explica: "Así lo dice la lección: una campaña nace de la compasión, no del deseo de llenar un lugar.", apoyo: "Una campaña empieza con la compasión de Jesús por las personas" },
              { texto: "Jesús recorría todas las ciudades y aldeas, enseñando y predicando.", verdad: true, explica: "«Recorría Jesús todas las ciudades y aldeas», y al ver las multitudes tuvo compasión de ellas.", apoyo: "«Recorría Jesús todas las ciudades y aldeas», enseñando y predicando", ref: "Mateo 9:35" },
              { texto: "El motivo de una campaña es mostrar cuántos creyentes somos.", verdad: false, explica: "Una campaña nace de la compasión por las personas, no del deseo de llenar un lugar.", apoyo: "Una campaña nace de esa compasión, no del deseo de llenar un lugar" },
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
            apoyo: "El fruto que buscaba la iglesia no era una multitud, sino discípulos que perseveraran",
            ref: "Hechos 2:41-42",
            clave: {
              id: "pr-evangelismo-misiones-2-1-a7-1",
              tipo: "corta",
              pregunta: "En Pentecostés se añadieron como tres mil personas. ¿Qué fue lo más importante después, y qué fruto buscaba la iglesia?",
              ideas: [
                { id: "persevera", peso: 50, texto: "Lo más importante vino después: perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones.", formas: ["persever*", "doctrina", "comunion", "partimiento", "partir el pan", "las oraciones", "oraban juntos", "(segu*|sigu*) firmes", "(segu*|sigu*) en la (iglesia|doctrina|comunion)", "ensenanza de los apostoles", "aprend* la palabra"] },
                { id: "discipulos", peso: 50, texto: "La iglesia no buscaba una multitud, sino discípulos que perseveraran.", formas: ["discipul*", "no buscaba una multitud", "no buscaba multitudes", "no era una multitud", "no es una multitud", "no solo numeros", "no solo los numeros", "mas que una multitud"] },
              ],
              errores: [
                { id: "multitud", texto: "La iglesia no buscaba una multitud, sino discípulos que perseveraran.", formas: ["(buscaba|busca|buscaban) (una|la) multitud", "(buscaba|busca|buscaban) (numeros|cantidad)", "lo importante (fue|era|es) (el|la) (numero|cantidad|multitud)", "lo importante fueron las tres mil"], anula: "discipulos" },
              ],
              modelo: "Lo más importante vino después: los nuevos perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones. La iglesia no buscaba una multitud, sino discípulos que perseveraran.",
            },
          },
          {
            apoyo: "Reconocer que la proclamación pública busca discípulos, y no solo números",
            ref: "Hechos 2:41-42",
            clave: {
              id: "pr-evangelismo-misiones-2-1-a7-2",
              tipo: "corta",
              pregunta: "Un líder dice que una campaña fue un éxito porque llegaron miles de personas. ¿Qué le responderías, con lo que pasó después de Pentecostés?",
              ideas: [
                { id: "despues", peso: 50, texto: "Que en Pentecostés lo más importante vino después: los nuevos perseveraban en la doctrina, en la comunión y en las oraciones.", formas: ["persever*", "doctrina", "comunion", "partimiento", "partir el pan", "las oraciones", "oraban juntos", "(segu*|sigu*) firmes", "(segu*|sigu*) en la (iglesia|doctrina|comunion)", "ensenanza de los apostoles", "aprend* la palabra"] },
                { id: "discipulos", peso: 50, texto: "Que el fruto no es una multitud, sino discípulos que perseveran.", formas: ["discipul*", "no es una multitud", "no era una multitud", "no buscaba una multitud", "no solo numeros", "no solo los numeros", "no se mide por", "mas que una multitud"] },
              ],
              errores: [
                { id: "exito", texto: "El fruto no es una multitud: la iglesia buscaba discípulos que perseveraran.", formas: ["el exito (es|son|esta) (la|una|los|el) (multitud|miles|numeros|numero|cantidad|gente)", "lo importante (es|son|fue|fueron) (la|los|el) (multitud|miles|numeros|cantidad)", "basta con (llenar|que lleguen)"], anula: "discipulos" },
              ],
              modelo: "Le respondería que en Pentecostés lo más importante vino después: los nuevos perseveraban en la doctrina de los apóstoles, en la comunión y en las oraciones. El fruto no es una multitud, sino discípulos que perseveran.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Lecciones de la historia
    "evangelismo-misiones-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde enseñó Pablo cada día durante dos años?", reverso: "En un lugar público: la escuela de uno llamado Tiranno.", apoyo: "Pablo enseñó cada día en un lugar público, «en la escuela de uno llamado Tiranno», durante dos años" },
              { frente: "¿Esperaron Whitefield y Wesley a que la gente llegara al templo?", reverso: "No: salieron a buscarla y llevaron el evangelio adonde estaba.", apoyo: "Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla" },
              { frente: "¿Quién siguió el ejemplo de Whitefield en Bristol, en abril de 1739?", reverso: "John Wesley.", apoyo: "En abril de ese mismo año, John Wesley siguió su ejemplo en Bristol" },
              { frente: "¿Cuánto duró la campaña de Billy Graham en Nueva York, en 1957?", reverso: "Dieciséis semanas, en el Madison Square Garden.", apoyo: "En 1957, su campaña en el Madison Square Garden de Nueva York se extendió por dieciséis semanas" },
            ],
          },
          {
            tarjetas: [
              { frente: "Mientras Pablo enseñaba en la escuela de Tiranno, ¿quiénes oyeron la palabra?", reverso: "Todos los que habitaban en Asia, judíos y griegos.", apoyo: "de manera que todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús" },
              { frente: "¿Qué clase de gente eran los mineros de Kingswood?", reverso: "Gente que casi nunca entraba en una iglesia.", apoyo: "gente que casi nunca entraba en una iglesia" },
              { frente: "¿Cómo se preparaban las campañas de Billy Graham?", reverso: "Con tiempo, con las iglesias de cada ciudad y con consejeros preparados.", apoyo: "Sus campañas se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían" },
              { frente: "¿Qué errores hubo en algunas campañas de la historia?", reverso: "Buscaron números, emociones o dinero.", apoyo: "En la historia también hubo campañas que buscaron números, emociones o dinero" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo estos momentos de la predicación pública, del primero al último.",
            eventos: [
              { texto: "Pablo enseña cada día en la escuela de Tiranno, y toda Asia oye la palabra", fecha: "Hechos 19:9-10" },
              { texto: "Whitefield empieza a predicar al aire libre a los mineros de Kingswood", fecha: "Febrero de 1739" },
              { texto: "John Wesley sigue a Whitefield y predica al aire libre en Bristol", fecha: "Abril de 1739" },
              { texto: "Nace el evangelista estadounidense Billy Graham", fecha: "1918" },
              { texto: "Billy Graham predica dieciséis semanas en Nueva York", fecha: "1957" },
            ],
            apoyo: "En 1739, Whitefield y luego Wesley llevaron el evangelio al aire libre, adonde estaba la gente",
            explica: "Pablo enseñó dos años en un lugar público, y toda Asia oyó la palabra. En febrero de 1739, Whitefield predicó al aire libre a los mineros de Kingswood, y en abril Wesley siguió su ejemplo. Billy Graham (1918-2018) predicó en Nueva York en 1957.",
          },
          {
            consigna: "¿Qué pasó primero? Ordena estos hechos de la historia, del más antiguo al más reciente.",
            eventos: [
              { texto: "Judíos y griegos de Asia oyen la palabra del Señor Jesús", fecha: "Hechos 19:9-10" },
              { texto: "Whitefield sale a buscar a gente que casi nunca entraba en una iglesia", fecha: "Febrero de 1739" },
              { texto: "Wesley sigue el ejemplo de Whitefield en Bristol", fecha: "Abril de 1739" },
              { texto: "Nace Billy Graham, evangelista de las campañas del siglo XX", fecha: "1918" },
              { texto: "La campaña del Madison Square Garden dura dieciséis semanas", fecha: "1957" },
            ],
            apoyo: "En abril de ese mismo año, John Wesley siguió su ejemplo en Bristol",
            explica: "Pablo enseñó en la escuela de Tiranno, y judíos y griegos de Asia oyeron la palabra. En febrero de 1739, Whitefield salió a buscar a los mineros de Kingswood, y en abril Wesley siguió su ejemplo. Billy Graham nació en 1918, y en 1957 su campaña de Nueva York duró dieciséis semanas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de las campañas de Billy Graham con lo que dice la lección.",
            pares: [
              ["La preparación", "Se hacía con tiempo"],
              ["Las iglesias de cada ciudad", "Participaban en la preparación"],
              ["Los consejeros preparados", "Atendían a quienes respondían"],
              ["La campaña de Nueva York, en 1957", "Se extendió por dieciséis semanas"],
            ],
            apoyo: "Sus campañas se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían",
            explica: "Las campañas de Billy Graham se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían. La de Nueva York, en 1957, duró dieciséis semanas.",
          },
          {
            consigna: "¿Qué hacía cada uno en las campañas de Billy Graham? Une a cada uno con su parte.",
            pares: [
              ["Billy Graham", "Predicaba en campañas en muchos países"],
              ["Las iglesias de la ciudad", "Se unían a la preparación de la campaña"],
              ["Los consejeros", "Estaban preparados para atender a los que respondían"],
              ["Nueva York, 1957", "Una campaña de dieciséis semanas"],
            ],
            apoyo: "Sus campañas se preparaban con tiempo",
            explica: "Billy Graham predicó en campañas en muchos países. Sus campañas se preparaban con tiempo, con las iglesias de cada ciudad y con consejeros preparados; la de Nueva York, en 1957, duró dieciséis semanas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué enseña la historia para las campañas de hoy? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "hoy", texto: "Una campaña de hoy", x: 50, y: 50 },
              { id: "gente", texto: "Adonde está la gente", x: 15, y: 12 },
              { id: "cristo", texto: "Cristo, con claridad", x: 85, y: 12 },
              { id: "iglesias", texto: "Las iglesias del lugar", x: 15, y: 88 },
              { id: "responden", texto: "Los que responden", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "hoy", a: "gente", relacion: "sale" },
              { de: "hoy", a: "cristo", relacion: "predica a" },
              { de: "hoy", a: "iglesias", relacion: "trabaja unida con" },
              { de: "hoy", a: "responden", relacion: "cuida a" },
            ],
            distractores: ["espera a", "critica a"],
            apoyo: "La historia enseña a salir adonde está la gente, predicar a Cristo con claridad, trabajar unidos y cuidar a los que responden",
            explica: "La historia enseña a salir adonde está la gente, predicar a Cristo con claridad, trabajar unidos con las iglesias del lugar y cuidar a los que responden, para que lleguen a ser discípulos.",
          },
          {
            consigna: "¿Qué hicieron los que llevaron el evangelio adonde estaba la gente? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pablo", texto: "Pablo", x: 15, y: 12 },
              { id: "publico", texto: "Un lugar público", x: 85, y: 12 },
              { id: "whitefield", texto: "Whitefield y Wesley", x: 15, y: 50 },
              { id: "airelibre", texto: "Al aire libre", x: 85, y: 50 },
              { id: "graham", texto: "Billy Graham", x: 15, y: 88 },
              { id: "iglesias", texto: "Las iglesias de cada ciudad", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "pablo", a: "publico", relacion: "enseñó cada día en" },
              { de: "whitefield", a: "airelibre", relacion: "predicaron" },
              { de: "graham", a: "iglesias", relacion: "preparaba sus campañas con" },
            ],
            distractores: ["esperaron en el templo", "criticó a"],
            apoyo: "La historia de la iglesia está llena de creyentes que salieron a buscar a la gente",
            explica: "Pablo enseñó cada día en un lugar público, Whitefield y Wesley predicaron al aire libre y Billy Graham preparaba sus campañas con las iglesias de cada ciudad. La historia enseña a salir adonde está la gente y a trabajar unidos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La historia de la iglesia está llena de creyentes que salieron a buscar a la gente",
            ref: "Romanos 10:14-15",
            situacion: "Tu iglesia quiere anunciar el evangelio en un barrio nuevo de la ciudad, donde casi nadie entra en una iglesia. El pastor te pide ayuda para planearlo con lo que enseña la historia.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión, alguien propone: Pongamos un cartel en la puerta del templo y esperemos a que vengan.",
                pregunta: "¿Qué propones tú?",
                opciones: [
                  { texto: "Salir al barrio, adonde está la gente, como Whitefield y Wesley.", valor: 2, explica: "Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla.", siguiente: "e2" },
                  { texto: "Esperar en el templo: el que quiera oír el evangelio vendrá solo.", valor: 0, explica: "Pablo pregunta: «¿Y cómo oirán sin haber quien les predique?». La historia enseña a salir adonde está la gente.", siguiente: "e1b" },
                  { texto: "Poner el cartel y, si en un mes nadie viene, salir a buscarlos.", valor: 1, explica: "Salir es lo que enseña la historia, pero no hace falta esperar un mes: se sale adonde está la gente.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un mes, y nadie del barrio llega al templo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Propones salir a buscarlos al barrio, adonde están.", valor: 2, explica: "Whitefield y Wesley llevaron el evangelio adonde estaba la gente.", siguiente: "e2" },
                  { texto: "Concluyes que en ese barrio nadie quiere oír el evangelio.", valor: 0, explica: "¿Cómo oirán sin haber quien les predique? La historia enseña a salir adonde está la gente.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya decidieron salir. En el barrio hay otras dos iglesias evangélicas.",
                pregunta: "¿Qué hacen con ellas?",
                opciones: [
                  { texto: "Las invitan a trabajar unidos en el barrio.", valor: 2, explica: "La historia enseña a trabajar unidos con las iglesias del lugar, como en las campañas de Billy Graham." },
                  { texto: "Las dejan fuera, para que el fruto sea solo de su iglesia.", valor: 0, explica: "La historia enseña a trabajar unidos con las iglesias del lugar." },
                  { texto: "Les avisan la fecha, pero preparan todo ustedes solos.", valor: 1, explica: "Avisar está bien, pero la historia enseña a trabajar unidos con las iglesias del lugar." },
                ],
              },
              {
                id: "e3",
                narra: "Después de la primera reunión en la plaza, doce personas quieren saber más de Cristo.",
                pregunta: "¿Qué hacen con ellas?",
                opciones: [
                  { texto: "Las cuidan, para que lleguen a ser discípulos.", valor: 2, explica: "La historia enseña a cuidar a los que responden, para que lleguen a ser discípulos." },
                  { texto: "Anotan el número en el informe y pasan a otra cosa.", valor: 0, explica: "También hubo campañas que buscaron números; la historia enseña a cuidar a los que responden." },
                  { texto: "Les dan una invitación al templo y esperan que vuelvan.", valor: 1, explica: "Invitar ayuda, pero hay que cuidar a los que responden para que lleguen a ser discípulos." },
                ],
              },
            ],
          },
          {
            apoyo: "Salir adonde está la gente",
            ref: "Romanos 10:14-15",
            situacion: "Eres parte del equipo de evangelismo de tu iglesia. Quieren alcanzar a los trabajadores del mercado central, que casi nunca entran en una iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Alguien propone una gran noche en el templo con un cantante famoso, para que vengan muchos.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Ir al mercado, adonde están, y predicarles a Cristo.", valor: 2, explica: "Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla.", siguiente: "e2" },
                  { texto: "Hacer la noche: lo importante es que el templo se llene.", valor: 0, explica: "También hubo campañas que buscaron números o emociones; la historia enseña a salir adonde está la gente.", siguiente: "e1b" },
                  { texto: "Hacer la noche, y repartir invitaciones en el mercado.", valor: 1, explica: "Invitar ayuda, pero la historia enseña a salir adonde está la gente.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "La noche se llenó de hermanos de otras iglesias, pero casi nadie del mercado vino.",
                pregunta: "¿Qué aprendes?",
                opciones: [
                  { texto: "Que hay que salir adonde está la gente.", valor: 2, explica: "Es lo que enseña la historia: salir adonde está la gente, como Whitefield y Wesley.", siguiente: "e2" },
                  { texto: "Que fue un éxito, porque el templo se llenó como nunca.", valor: 0, explica: "En la historia también hubo campañas que buscaron números: la gente del mercado no oyó el evangelio.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya están en el mercado, y te dan cinco minutos para hablar.",
                pregunta: "¿Qué dices?",
                opciones: [
                  { texto: "Predicas a Cristo con claridad y palabras sencillas.", valor: 2, explica: "La historia enseña a predicar a Cristo con claridad." },
                  { texto: "Cuentas chistes para que se rían, sin hablar de Cristo.", valor: 0, explica: "Lo que se predica es a Cristo, con claridad." },
                  { texto: "Hablas de Cristo, pero con palabras que pocos entienden.", valor: 1, explica: "Hablar de Cristo está bien, pero la historia enseña a predicarlo con claridad." },
                ],
              },
              {
                id: "e3",
                narra: "Tres vendedores te dicen que quieren seguir a Cristo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los cuidas con tu iglesia, para que sean discípulos.", valor: 2, explica: "La historia enseña a cuidar a los que responden, para que lleguen a ser discípulos." },
                  { texto: "Los felicitas y no vuelves a buscarlos nunca más.", valor: 0, explica: "Hay que cuidar a los que responden, para que lleguen a ser discípulos." },
                  { texto: "Les das la dirección del templo y esperas que lleguen.", valor: 1, explica: "Darles la dirección ayuda, pero hay que cuidarlos para que lleguen a ser discípulos." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre las campañas de Billy Graham tiene un error. Tócala.",
            frases: [
              "Billy Graham predicó en campañas en muchos países.",
              "Las campañas de Billy Graham se preparaban con tiempo.",
              "Billy Graham preparaba cada campaña sin las iglesias del lugar.",
              "Las campañas de Billy Graham tenían consejeros preparados.",
            ],
            malo: 2,
            correccion: "Sus campañas se preparaban con la participación de las iglesias de cada ciudad.",
            apoyo: "Sus campañas se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían",
            explica: "Las campañas de Billy Graham se preparaban con tiempo, con la participación de las iglesias de cada ciudad y con consejeros preparados para atender a quienes respondían.",
          },
          {
            consigna: "Una de estas frases sobre Billy Graham y su campaña de Nueva York tiene un error. Tócala.",
            frases: [
              "Billy Graham fue un evangelista estadounidense.",
              "En 1957, Billy Graham predicó en el Madison Square Garden.",
              "La campaña de Billy Graham en Nueva York duró una sola noche.",
              "Las campañas de Billy Graham contaban con las iglesias de cada ciudad.",
            ],
            malo: 2,
            correccion: "La campaña de Nueva York, en 1957, se extendió por dieciséis semanas.",
            apoyo: "la de Nueva York, en 1957, duró dieciséis semanas",
            explica: "En 1957, la campaña de Billy Graham en el Madison Square Garden de Nueva York se extendió por dieciséis semanas.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Llevaron el evangelio adonde estaba la gente",
            ref: "Romanos 10:14",
            clave: {
              id: "pr-evangelismo-misiones-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hicieron Whitefield y Wesley en 1739, y qué enseña su ejemplo?",
              ideas: [
                { id: "airelibre", peso: 50, texto: "Whitefield predicó al aire libre a los mineros de Kingswood, y Wesley siguió su ejemplo en Bristol.", formas: ["aire libre", "predic* a los mineros", "mineros de kingswood", "afuera", "fuera del templo", "fuera de la iglesia", "en la calle", "en las calles", "en el campo"] },
                { id: "salir", peso: 50, texto: "Llevaron el evangelio adonde estaba la gente: no esperaron a que llegara al templo, salieron a buscarla.", formas: ["donde (esta|estaba|estan|estaban) la gente", "adonde (esta|estaba|estan|estaban)", "salieron a buscar*", "salir a buscar*", "ir a buscar*", "fueron a buscar*", "buscar a la gente", "buscaron a la gente", "llevaron el evangelio", "llevar el evangelio", "sin esperar*"] },
              ],
              errores: [
                { id: "esperar", texto: "Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla.", formas: ["esperaron a que llegara", "esperaron a que llegaran", "esperaron a que vinieran", "esperar a que lleguen", "esperar a que vengan", "hay que esperar*"], anula: "salir" },
              ],
              modelo: "En 1739, Whitefield predicó al aire libre a los mineros de Kingswood, y Wesley siguió su ejemplo en Bristol. Su ejemplo enseña a llevar el evangelio adonde está la gente, sin esperar a que llegue al templo.",
            },
          },
          {
            apoyo: "Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla",
            ref: "Romanos 10:14-15",
            clave: {
              id: "pr-evangelismo-misiones-2-2-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Si alguien quiere oír el evangelio, que venga al templo. ¿Qué le enseña el ejemplo de Whitefield y Wesley?",
              ideas: [
                { id: "salieron", peso: 50, texto: "Que no esperaron a que la gente llegara al templo: salieron a buscarla y predicaron al aire libre.", formas: ["salieron", "salir a", "sal* a buscar*", "ir a buscar*", "fueron a buscar*", "buscar a la gente", "buscarla", "aire libre", "predic* a los mineros"] },
                { id: "oiran", peso: 50, texto: "Que hay que llevar el evangelio adonde está la gente, porque ¿cómo oirán sin haber quien les predique?", formas: ["como oiran", "quien les predique", "sin haber quien", "donde (esta|estaba|estan|estaban) la gente", "adonde (esta|estaba|estan|estaban)", "llevar el evangelio", "llevaron el evangelio", "casi nunca entra*"] },
              ],
              errores: [
                { id: "venga", texto: "Whitefield y Wesley no esperaron a que la gente llegara al templo.", formas: ["hay que esperar*", "mejor esperar*", "deb* esperar*", "esperar a que lleguen", "esperar a que vengan"], anula: "salieron" },
              ],
              modelo: "Le enseña que Whitefield y Wesley no esperaron a que la gente llegara al templo: salieron a buscarla y predicaron al aire libre. Hay que llevar el evangelio adonde está la gente, porque ¿cómo oirán sin haber quien les predique?",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Preparar una campaña
    "evangelismo-misiones-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dan las iglesias de una ciudad cuando se unen para anunciar a Cristo?", reverso: "Testimonio de la unidad por la que Jesús oró.", apoyo: "Cuando las iglesias de una ciudad se unen para anunciar a Cristo, dan testimonio de esa unidad" },
              { frente: "¿Qué se forma al invitar a las iglesias de la zona?", reverso: "Un comité con responsables.", apoyo: "Unir: invitar a las iglesias de la zona y formar un comité con responsables" },
              { frente: "¿Qué se define antes de la campaña?", reverso: "El propósito, el público, el lugar y las fechas.", apoyo: "Definir: el propósito, el público, el lugar y las fechas" },
              { frente: "¿Qué puede dejar una campaña sin presupuesto?", reverso: "Deudas y un mal testimonio.", apoyo: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué empieza una campaña bien preparada?", reverso: "Con oración, unidad y un plan, no con un escenario.", apoyo: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan" },
              { frente: "¿Desde cuándo oran por la campaña los grupos de cada iglesia?", reverso: "Desde meses antes.", apoyo: "Orar: grupos de oración en cada iglesia, desde meses antes" },
              { frente: "¿A quiénes se prepara antes de la campaña?", reverso: "A los consejeros, los músicos, los ujieres y el equipo de seguimiento.", apoyo: "Preparar: a los consejeros, los músicos, los ujieres y el equipo de seguimiento" },
              { frente: "¿Qué necesita un evento público, además de los permisos de la ciudad?", reverso: "Un plan de seguridad y las normas de protección de menores.", apoyo: "Un evento público necesita los permisos de la ciudad, un plan de seguridad y las normas de protección de menores" },
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
            consigna: "Ordena los pasos para preparar una campaña como los presenta la lección, del primero al último.",
            pasos: [
              "Orar: grupos de oración en cada iglesia, desde meses antes",
              "Unir: invitar a las iglesias de la zona y formar un comité",
              "Definir: el propósito, el público, el lugar y las fechas",
              "Calcular: el presupuesto y los recursos, con cuentas claras",
              "Preparar: a los consejeros, los músicos y los ujieres",
              "Invitar: en persona y por los medios",
            ],
            apoyo: "Después vienen los pasos: unir a las iglesias, definir el propósito, calcular el presupuesto, cumplir los permisos y la seguridad, preparar a los equipos e invitar en persona",
            explica: "Primero se ora y se unen las iglesias; después se definen el propósito, el público, el lugar y las fechas, se calcula el presupuesto, se cumplen los permisos y la seguridad, se prepara a los equipos y se invita en persona y por los medios.",
          },
          {
            consigna: "Tu iglesia quiere preparar una campaña con otras de la zona. Ordena lo que hacen, como enseña la lección, del primer paso al último.",
            pasos: [
              "Forman grupos de oración en cada iglesia, meses antes",
              "Invitan a las iglesias de la zona y nombran responsables",
              "Deciden el propósito, el público, el lugar y las fechas",
              "Hacen el presupuesto, con cuentas claras",
              "Piden los permisos y planean la seguridad y el cuidado de los niños",
              "Preparan a los consejeros y al equipo de seguimiento",
            ],
            apoyo: "Una campaña empieza con oración y unidad",
            explica: "Una campaña empieza con oración y unidad. Después vienen los pasos: definir el propósito, calcular el presupuesto, cumplir los permisos y la seguridad, preparar a los equipos e invitar en persona.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Hechos 1:14",
            consigna: "Antes de Pentecostés, ¿cómo perseveraban los discípulos? Toca las palabras que lo dicen.",
            texto: "perseveraban [[unánimes]] en [[oración]] y [[ruego]]",
            apoyo: "La preparación espiritual va primero",
            explica: "Antes de Pentecostés, los discípulos «perseveraban unánimes en oración y ruego». Por eso, al preparar una campaña, la preparación espiritual va primero.",
          },
          {
            ref: "Juan 17:21",
            consigna: "Jesús oró para que todos fueran uno. ¿Para qué? Toca las palabras que lo dicen.",
            texto: "para que el [[mundo]] [[crea]] que tú me enviaste",
            apoyo: "Cuando las iglesias de una ciudad se unen para anunciar a Cristo, dan testimonio de esa unidad",
            explica: "Jesús oró «para que todos sean uno», y añadió: «para que el mundo crea que tú me enviaste». Cuando las iglesias de una ciudad se unen para anunciar a Cristo, dan testimonio de esa unidad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que va primero al preparar una campaña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una campaña bien preparada empieza con el escenario.", verdad: false, explica: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan.", apoyo: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan" },
              { texto: "Al preparar una campaña, la preparación espiritual va primero.", verdad: true, explica: "Antes de Pentecostés, los discípulos «perseveraban unánimes en oración y ruego».", apoyo: "La preparación espiritual va primero", ref: "Hechos 1:14" },
              { texto: "La unidad de las iglesias también predica.", verdad: true, explica: "Cuando las iglesias de una ciudad se unen para anunciar a Cristo, dan testimonio de la unidad por la que Jesús oró.", apoyo: "La unidad de las iglesias también predica", ref: "Juan 17:21" },
            ],
          },
          {
            consigna: "Sobre la oración y la unidad en una campaña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús oró para que todos sean uno, para que el mundo crea.", verdad: true, explica: "Jesús oró «para que todos sean uno», y añadió: «para que el mundo crea que tú me enviaste».", apoyo: "Jesús oró para que fuéramos uno para que el mundo crea", ref: "Juan 17:21" },
              { texto: "Los grupos de oración por la campaña empiezan la semana anterior.", verdad: false, explica: "Se forman grupos de oración en cada iglesia desde meses antes.", apoyo: "Orar: grupos de oración en cada iglesia, desde meses antes" },
              { texto: "Es mejor que cada iglesia haga su campaña sola, sin unirse a otras.", verdad: false, explica: "Una campaña empieza con oración y unidad: se invita a las iglesias de la zona y se forma un comité con responsables.", apoyo: "Unir: invitar a las iglesias de la zona y formar un comité con responsables" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Jesús enseñó a calcular antes de edificar",
            ref: "Lucas 14:28",
            titulo: "Las cuentas de la campaña",
            relato: [
              "Cuatro iglesias de tu zona oran desde hace meses por una campaña en el parque, y ya formaron un comité. A ti te nombraron responsable de las cuentas.",
              "En la reunión, un hermano propone alquilar un escenario enorme y traer un grupo musical famoso. Dice: Lo pagamos después, con las ofrendas de la campaña.",
              "Todavía nadie sabe cuánto costará todo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones antes de contratar nada?",
                opciones: [
                  { texto: "Calcular el presupuesto y los recursos, con cuentas claras.", bien: true, explica: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos»." },
                  { texto: "Contratar todo ya, y pagarlo después con las ofrendas de la campaña.", explica: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio." },
                  { texto: "Dejar las cuentas para el final, cuando se sepa cuánto se gastó.", explica: "Las cuentas se hacen antes: Jesús enseñó a calcular antes de edificar." },
                ],
                apoyo: "Calcular: el presupuesto y los recursos, con cuentas claras",
                explica: "Como el que va a edificar, primero se sienta y calcula los gastos: así se prepara también una campaña.",
              },
              {
                tipo: "situacion",
                pregunta: "Las cuentas muestran que el escenario enorme cuesta más de lo que tienen. ¿Qué propones?",
                opciones: [
                  { texto: "Un plan que se pueda pagar, para no dejar deudas.", bien: true, explica: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio." },
                  { texto: "Pedir un préstamo y esperar que la gente dé más esa noche.", explica: "Así la campaña puede dejar deudas y un mal testimonio." },
                  { texto: "Contratarlo igual, porque un escenario enorme atrae a más gente.", explica: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan." },
                ],
                apoyo: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio",
                explica: "Jesús enseñó a calcular antes de edificar: con un presupuesto, la campaña no deja deudas ni un mal testimonio.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano dice que hacer un presupuesto es falta de fe. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que Jesús mismo enseñó a calcular los gastos antes de edificar.", bien: true, explica: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos»." },
                  { texto: "Que tiene razón: con fe no hace falta saber cuánto cuesta la campaña.", explica: "Jesús mismo enseñó a calcular antes de edificar." },
                  { texto: "Que el presupuesto lo hace el pastor solo, sin mostrárselo a nadie.", explica: "El presupuesto y los recursos se calculan con cuentas claras." },
                ],
                apoyo: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos»",
                explica: "Calcular sigue la enseñanza de Jesús: el que va a edificar «no se sienta primero y calcula los gastos».",
              },
              {
                tipo: "explica",
                apoyo: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio",
                clave: {
                  id: "pr-evangelismo-misiones-2-3-a5-1",
                  tipo: "corta",
                  pregunta: "¿Por qué tu campaña necesita un presupuesto con cuentas claras? Usa Lucas 14:28.",
                  ideas: [
                    { id: "calcular", peso: 50, texto: "Porque Jesús enseñó a calcular los gastos antes de edificar.", formas: ["calcul*", "los gastos", "antes de edificar", "antes de construir", "se sienta primero", "sentarse primero", "sentarnos primero"] },
                    { id: "deudas", peso: 50, negativa: true, texto: "Porque una campaña sin presupuesto puede dejar deudas y un mal testimonio.", formas: ["deuda*", "endeud*", "mal testimonio", "dan* el testimonio", "cuid* el testimonio", "buen testimonio"] },
                  ],
                  modelo: "Porque Jesús enseñó a calcular los gastos antes de edificar: el que edifica se sienta primero y calcula. Una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
                },
              },
            ],
          },
          {
            apoyo: "Calcular: el presupuesto y los recursos, con cuentas claras",
            ref: "Lucas 14:28",
            titulo: "La campaña de los jóvenes",
            relato: [
              "Los jóvenes de tres iglesias quieren hacer una campaña en la cancha del barrio dentro de dos meses. Ya oran juntos cada semana.",
              "Uno de ellos propone comprar luces, sonido y camisetas para todos, y pagarlo con una rifa que todavía no han hecho.",
              "Te piden que los ayudes a ordenar los gastos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen primero con la lista de compras?",
                opciones: [
                  { texto: "Calcular cuánto cuesta y con qué recursos cuentan ya.", bien: true, explica: "Jesús enseñó a calcular antes de edificar: primero se calculan el presupuesto y los recursos." },
                  { texto: "Comprar todo ahora, y ver después cómo pagarlo con la rifa.", explica: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio." },
                  { texto: "Comprar solo lo que pida el joven que tuvo la idea.", explica: "Los gastos se deciden con un presupuesto y cuentas claras, no por lo que pida uno." },
                ],
                apoyo: "Jesús enseñó a calcular antes de edificar",
                explica: "Antes de comprar, se calculan el presupuesto y los recursos, con cuentas claras.",
              },
              {
                tipo: "situacion",
                pregunta: "El cálculo muestra que no alcanza para todo. ¿Qué hacen?",
                opciones: [
                  { texto: "Dejan lo que no pueden pagar, para no quedar con deudas.", bien: true, explica: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio." },
                  { texto: "Compran todo con la tarjeta de crédito de alguno de los padres.", explica: "Así la campaña puede dejar deudas y un mal testimonio." },
                  { texto: "Compran igual, y piensan en cómo pagar cuando llegue la factura.", explica: "Jesús enseñó a calcular antes de edificar, no después." },
                ],
                apoyo: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio",
                explica: "Calcular antes evita que la campaña deje deudas y un mal testimonio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo llevan el dinero de la campaña?",
                opciones: [
                  { texto: "Con cuentas claras, que conocen todos los responsables.", bien: true, explica: "El presupuesto y los recursos se llevan con cuentas claras." },
                  { texto: "Cada joven gasta lo que cree necesario, sin anotar nada.", explica: "Sin cuentas claras, la campaña puede dejar deudas y un mal testimonio." },
                  { texto: "Lo guarda un solo joven, que no le informa a nadie.", explica: "Las cuentas de la campaña son claras: las conocen los responsables." },
                ],
                apoyo: "Calcular: el presupuesto y los recursos, con cuentas claras",
                explica: "Las cuentas claras cuidan el testimonio de la campaña.",
              },
              {
                tipo: "explica",
                apoyo: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos»",
                clave: {
                  id: "pr-evangelismo-misiones-2-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué enseña Lucas 14:28 para la campaña de los jóvenes?",
                  ideas: [
                    { id: "calcular", peso: 50, texto: "A calcular primero los gastos y los recursos, como el que va a edificar.", formas: ["calcul*", "los gastos", "antes de edificar", "antes de construir", "se sienta primero", "sentarse primero", "sentarnos primero", "presupuesto"] },
                    { id: "deudas", peso: 50, negativa: true, texto: "Para que la campaña no deje deudas ni un mal testimonio.", formas: ["deuda*", "endeud*", "mal testimonio", "dan* el testimonio", "cuid* el testimonio", "buen testimonio"] },
                  ],
                  modelo: "Enseña a sentarse primero y calcular los gastos y los recursos, como el que va a edificar. Así la campaña de los jóvenes no deja deudas ni un mal testimonio.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se aplica Lucas 14:28 a una campaña.",
            texto: "Antes de la campaña se [[calcula]] el presupuesto con cuentas [[claras]], porque sin él la campaña puede dejar [[deudas]].",
            distractores: ["olvida", "secretas", "ganancias"],
            errores: {
              olvida: "Jesús enseñó a calcular antes de edificar: el presupuesto se calcula antes.",
              secretas: "El presupuesto y los recursos se calculan con cuentas claras.",
              ganancias: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
            },
            apoyo: "Calcular: el presupuesto y los recursos, con cuentas claras",
            ref: "Lucas 14:28",
            explica: "Jesús enseñó a calcular antes de edificar. Por eso el presupuesto se calcula con cuentas claras: una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
          },
          {
            consigna: "Completa la enseñanza de Jesús sobre calcular, aplicada a una campaña.",
            texto: "Jesús enseñó a [[calcular]] antes de [[edificar]]: una campaña sin presupuesto puede dejar [[deudas]] y un mal testimonio.",
            distractores: ["gastar", "descansar", "regalos"],
            errores: {
              gastar: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos».",
              descansar: "La enseñanza es calcular antes de edificar.",
              regalos: "Una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
            },
            apoyo: "Jesús enseñó a calcular antes de edificar",
            ref: "Lucas 14:28",
            explica: "Jesús enseñó a calcular antes de edificar: «no se sienta primero y calcula los gastos». Una campaña sin presupuesto puede dejar deudas y un mal testimonio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Una campaña empieza con oración y unidad",
            ref: "Hechos 1:14; Juan 17:21",
            clave: {
              id: "pr-evangelismo-misiones-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la oración y la unidad van primero al preparar una campaña?",
              ideas: [
                { id: "oracion", peso: 50, texto: "Porque la preparación espiritual va primero: antes de Pentecostés, los discípulos perseveraban unánimes en oración.", formas: ["preparacion espiritual", "espiritual*", "persever*", "unanimes", "oracion y ruego", "antes de pentecostes", "como los discipulos"] },
                { id: "unidad", peso: 50, texto: "Porque Jesús oró para que todos sean uno, para que el mundo crea: la unidad de las iglesias también predica.", formas: ["sean uno", "seamos uno", "fueramos uno", "fueran uno", "ser uno", "mundo (crea|cree|crean)", "tambien predica", "unidad predica", "dan testimonio", "da testimonio", "testimonio de (la|esa) unidad"] },
              ],
              modelo: "Porque la preparación espiritual va primero: antes de Pentecostés, los discípulos perseveraban unánimes en oración. Y Jesús oró para que todos sean uno, para que el mundo crea; la unidad de las iglesias también predica.",
            },
          },
          {
            apoyo: "Una campaña bien preparada no empieza con un escenario, sino con oración, unidad y un plan",
            ref: "Hechos 1:14; Juan 17:21",
            clave: {
              id: "pr-evangelismo-misiones-2-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano quiere empezar la campaña alquilando el escenario. ¿Qué le explicas sobre lo que va primero, y por qué?",
              ideas: [
                { id: "oracion", peso: 50, texto: "Que una campaña no empieza con un escenario, sino con oración: la preparación espiritual va primero.", formas: ["oracion", "orar", "oremos", "orando", "preparacion espiritual", "persever*"] },
                { id: "unidad", peso: 50, texto: "Que también va primero la unidad de las iglesias, que da testimonio: Jesús oró para que sean uno.", formas: ["unidad", "unir*", "(unidos|unidas|unida|unido)", "sean uno", "seamos uno", "fueramos uno", "mundo crea", "dan testimonio", "da testimonio", "tambien predica"] },
              ],
              errores: [
                { id: "escenario", texto: "Una campaña bien preparada no empieza con un escenario.", formas: ["empie* (con|por) el escenario", "empie* (con|por) un escenario", "lo primero (es|seria) el escenario"], anula: "oracion" },
              ],
              modelo: "Le explico que una campaña no empieza con un escenario, sino con oración y unidad. La preparación espiritual va primero, y la unidad de las iglesias da testimonio, porque Jesús oró para que sean uno, para que el mundo crea.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El mensaje y el llamado
    "evangelismo-misiones-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué se propuso saber Pablo entre los corintios?", reverso: "Solo a Jesucristo, y a éste crucificado.", apoyo: "Pablo se propuso «no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado»" },
              { frente: "Según Pablo, ¿en qué debía estar fundada la fe de los oyentes?", reverso: "En el poder de Dios, no en palabras persuasivas de humana sabiduría.", apoyo: "para que la fe de ellos estuviera fundada «en el poder de Dios»" },
              { frente: "¿A qué renunció Pablo al predicar?", reverso: "A los trucos: no andaba con astucia ni adulteraba la palabra de Dios.", apoyo: "Pablo renunció a los trucos" },
              { frente: "En una campaña, ¿a qué momento apunta todo?", reverso: "Al momento en que se predica el evangelio.", apoyo: "En una campaña, todo apunta al momento en que se predica el evangelio" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién es el protagonista de la predicación en una campaña?", reverso: "Cristo, no el evangelista.", apoyo: "El protagonista no es el evangelista, sino Cristo" },
              { frente: "¿Qué explica un llamado honesto que significa responder?", reverso: "Arrepentirse de los pecados y confiar en Cristo.", apoyo: "Explica qué significa responder: arrepentirse de los pecados y confiar en Cristo" },
              { frente: "¿A qué paso visible puede invitar el llamado?", reverso: "A pasar al frente o hablar con un consejero, sin decir que ese gesto salva.", apoyo: "Invita a dar un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto es lo que salva" },
              { frente: "Después de responder, ¿qué sigue, según el llamado honesto?", reverso: "La Biblia, la oración y una iglesia cercana.", apoyo: "Explica lo que sigue: la Biblia, la oración y una iglesia cercana" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un llamado honesto o es manipulación? Lleva cada frase a su grupo.",
            grupos: ["Llamado honesto", "Manipulación"],
            frases: [
              { texto: "Explicar qué es arrepentirse y confiar en Cristo", grupo: 0 },
              { texto: "Dar tiempo y libertad para responder", grupo: 0 },
              { texto: "Invitar a hablar con un consejero", grupo: 0 },
              { texto: "Decir que pasar al frente es lo que salva", grupo: 1 },
              { texto: "Poner una música que mueva las emociones", grupo: 1, explica: "El llamado honesto da libertad, sin música que manipule." },
              { texto: "Prometer que se acabarán todos sus problemas", grupo: 1, explica: "El llamado no promete lo que Dios no prometió." },
              { texto: "Insistir hasta que alguien pase adelante", grupo: 1 },
            ],
            apoyo: "Da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas",
            explica: "El llamado honesto explica qué es arrepentirse y creer, da tiempo y libertad, invita a un paso visible sin confundirlo con lo que salva y muestra lo que sigue. No presiona, no engaña ni promete lo que Dios no prometió.",
          },
          {
            consigna: "¿Qué dice el evangelista en cada frase: un llamado honesto o manipulación? Lleva cada frase a su grupo.",
            grupos: ["Es un llamado honesto", "Es manipulación"],
            frases: [
              { texto: "Si quieres seguir a Cristo, puedes hablar con un consejero", grupo: 0 },
              { texto: "Piénsalo con calma: nadie te va a apurar", grupo: 0 },
              { texto: "Responder es arrepentirte de tus pecados y confiar en Cristo", grupo: 0 },
              { texto: "Si pasas al frente, ya eres salvo", grupo: 1, explica: "El paso visible no es lo que salva." },
              { texto: "Pasa al frente, y mañana tendrás el trabajo que buscas", grupo: 1, explica: "Es una promesa falsa: el llamado no promete lo que Dios no prometió." },
              { texto: "No termino hasta que alguien más pase adelante", grupo: 1 },
            ],
            apoyo: "El llamado no presiona, no engaña ni promete lo que Dios no prometió",
            explica: "El llamado honesto explica qué significa responder, da tiempo y libertad e invita a un paso visible. La manipulación presiona, engaña diciendo que el gesto salva o promete lo que Dios no prometió.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "2 Corintios 4:5",
            consigna: "Pablo no se predicaba a sí mismo. ¿A quién predicaba, y como qué? Toca las palabras que lo dicen.",
            texto: "Porque no nos predicamos a nosotros mismos, sino a [[Jesucristo]] como [[Señor]]",
            apoyo: "El protagonista no es el evangelista, sino Cristo",
            explica: "«Porque no nos predicamos a nosotros mismos, sino a Jesucristo como Señor». El protagonista no es el evangelista, sino Cristo.",
          },
          {
            ref: "2 Corintios 4:2",
            consigna: "Pablo renunció a los trucos. ¿Qué dos cosas no hacía? Toca las palabras que lo dicen.",
            texto: "no andando con [[astucia]], ni [[adulterando]] la palabra de Dios",
            apoyo: "Pablo renunció a los trucos",
            explica: "Pablo renunció a los trucos: «no andando con astucia, ni adulterando la palabra de Dios». El mensaje se predica en el poder de Dios, no con trucos de persuasión.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El llamado honesto confía en el poder de Dios, no en la presión",
            ref: "Hechos 2:38",
            titulo: "El llamado de la última noche",
            relato: [
              "Eres parte del comité de una campaña de cinco iglesias. El evangelista invitado se enfermó, y te piden predicar la última noche y hacer el llamado.",
              "Un músico te ofrece: Cuando hagas el llamado, pongo una música muy emotiva, para que la gente llore y pase al frente.",
              "Mientras preparas lo que dirás, recuerdas lo que respondió Pedro cuando la multitud preguntó qué debía hacer.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué vas a explicar que significa responder al evangelio?",
                opciones: [
                  { texto: "Arrepentirse de los pecados y confiar en Cristo.", bien: true, explica: "Un llamado honesto explica qué significa responder: arrepentirse de los pecados y confiar en Cristo." },
                  { texto: "Prometerle a Dios que desde hoy serán mejores personas.", explica: "Responder es arrepentirse de los pecados y confiar en Cristo." },
                  { texto: "Sentir una emoción fuerte con la música del final.", explica: "Responder no es una emoción: es arrepentirse de los pecados y confiar en Cristo." },
                ],
                apoyo: "Explica qué significa responder: arrepentirse de los pecados y confiar en Cristo",
                explica: "El llamado honesto explica qué es arrepentirse y creer.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al músico?",
                opciones: [
                  { texto: "Que el llamado da tiempo y libertad, sin música que manipule.", bien: true, explica: "El llamado honesto da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas." },
                  { texto: "Que sí: mientras más lloren, más sincera será su decisión.", explica: "El llamado honesto confía en el poder de Dios, no en la presión ni en las emociones." },
                  { texto: "Que la ponga más fuerte, para que nadie se distraiga ni se vaya.", explica: "El llamado da tiempo y libertad, sin música que manipule." },
                ],
                apoyo: "Da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas",
                explica: "El llamado honesto confía en el poder de Dios, no en la presión.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A qué paso visible invitas a los que quieren responder?",
                opciones: [
                  { texto: "A pasar al frente o hablar con un consejero, sin decir que eso salva.", bien: true, explica: "El llamado invita a un paso visible sin confundirlo con lo que salva." },
                  { texto: "A pasar al frente, y les dices que con ese gesto ya quedan salvados para siempre.", explica: "El paso visible no es lo que salva: responder es arrepentirse y confiar en Cristo." },
                  { texto: "A ninguno: que cada uno se vaya a su casa sin hablar con nadie.", explica: "El llamado invita a dar un paso visible, como pasar al frente o hablar con un consejero." },
                ],
                apoyo: "Invita a dar un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto es lo que salva",
                explica: "El paso visible ayuda, pero no es lo que salva.",
              },
              {
                tipo: "explica",
                apoyo: "El llamado es honesto: explica qué es arrepentirse y creer, da libertad, invita a un paso visible sin confundirlo con lo que salva y muestra lo que sigue",
                clave: {
                  id: "pr-evangelismo-misiones-2-4-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases lo que dirás en el llamado: qué significa responder y qué sigue después.",
                  ideas: [
                    { id: "responder", peso: 50, texto: "Responder es arrepentirse de los pecados y confiar en Cristo.", formas: ["arrepent*", "arrepient*", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en (cristo|jesus|jesucristo|dios)", "cre* en (cristo|jesus|jesucristo)", "deja* (tus|sus|el|los|su) pecado*", "volver* a dios", "volv* a dios"] },
                    { id: "sigue", peso: 50, texto: "Después siguen la Biblia, la oración y una iglesia cercana.", formas: ["biblia", "la palabra", "orar", "oracion", "iglesia cercana", "una iglesia", "congreg*"] },
                  ],
                  errores: [
                    { id: "gesto", texto: "Pasar al frente es un paso visible, pero no es lo que salva.", formas: ["pasar al frente (los|te|lo|les|nos|las) salva", "si (pasas|pasan|pasa) al frente (eres|son|es|estas|estan|esta|quedas|quedan|seras|seran) salv*", "lo que salva es pasar"], anula: "responder" },
                  ],
                  modelo: "Responder al evangelio es arrepentirse de los pecados y confiar en Cristo. Si quieres hacerlo, puedes pasar al frente o hablar con un consejero. Después sigue leer la Biblia, orar y unirte a una iglesia cercana.",
                },
              },
            ],
          },
          {
            apoyo: "Explica qué significa responder: arrepentirse de los pecados y confiar en Cristo",
            ref: "Hechos 2:38",
            titulo: "El llamado en la plaza",
            relato: [
              "Tu iglesia hace una campaña en la plaza del barrio. Esta noche predica Óscar, el líder de jóvenes, y es la primera vez que hará el llamado.",
              "Antes de empezar te pide ayuda: Voy a decir que pasen todos los que quieran ser felices. Y si alguien duda, lo apuro para que no cambie de idea.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas sobre lo que va a decir?",
                opciones: [
                  { texto: "Que explique qué es responder: arrepentirse y confiar en Cristo.", bien: true, explica: "Un llamado honesto explica qué significa responder: arrepentirse de los pecados y confiar en Cristo." },
                  { texto: "Que está bien así: mientras menos explique, más personas pasarán.", explica: "El llamado honesto explica qué significa responder." },
                  { texto: "Que invite a pasar a los que quieran tener éxito en la vida.", explica: "Eso promete lo que Dios no prometió: responder es arrepentirse y confiar en Cristo." },
                ],
                apoyo: "Explica qué significa responder: arrepentirse de los pecados y confiar en Cristo",
                explica: "Responder al evangelio es arrepentirse de los pecados y confiar en Cristo, y el llamado lo explica.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué le dices sobre apurar al que duda?",
                opciones: [
                  { texto: "Que le dé tiempo y libertad, sin presionarlo.", bien: true, explica: "El llamado honesto da tiempo y libertad: sin presión." },
                  { texto: "Que sí lo apure, antes de que cambie de idea y se vaya.", explica: "El llamado no presiona: confía en el poder de Dios." },
                  { texto: "Que lo tome del brazo y lo lleve él mismo hasta el frente.", explica: "El llamado da tiempo y libertad, sin presión." },
                ],
                apoyo: "Da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas",
                explica: "El llamado honesto confía en el poder de Dios, no en la presión.",
              },
              {
                tipo: "situacion",
                pregunta: "Al terminar, ¿qué les dice a los que respondieron?",
                opciones: [
                  { texto: "Lo que sigue: la Biblia, la oración y una iglesia cercana.", bien: true, explica: "El llamado honesto explica lo que sigue: la Biblia, la oración y una iglesia cercana." },
                  { texto: "Que ya está todo hecho, y que desde ahora no necesitan nada más.", explica: "El llamado muestra lo que sigue: la Biblia, la oración y una iglesia cercana." },
                  { texto: "Que vuelvan a verlo en la próxima campaña, el año que viene.", explica: "Lo que sigue es la Biblia, la oración y una iglesia cercana, desde ahora." },
                ],
                apoyo: "Explica lo que sigue: la Biblia, la oración y una iglesia cercana",
                explica: "El llamado honesto muestra lo que sigue.",
              },
              {
                tipo: "explica",
                apoyo: "Invita a dar un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto es lo que salva",
                clave: {
                  id: "pr-evangelismo-misiones-2-4-a4-2",
                  tipo: "corta",
                  pregunta: "Ayuda a Óscar a preparar su llamado: ¿qué debe explicar, y a qué paso visible puede invitar?",
                  ideas: [
                    { id: "responder", peso: 50, texto: "Debe explicar que responder es arrepentirse de los pecados y confiar en Cristo.", formas: ["arrepent*", "arrepient*", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en (cristo|jesus|jesucristo|dios)", "cre* en (cristo|jesus|jesucristo)", "deja* (tus|sus|el|los|su) pecado*", "volver* a dios", "volv* a dios"] },
                    { id: "paso", peso: 50, texto: "Puede invitar a un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto salva.", formas: ["pasar al frente", "pase* al frente", "pasen al frente", "venir al frente", "pasar adelante", "pasen adelante", "hablar con un consejero", "un consejero", "paso visible"] },
                  ],
                  errores: [
                    { id: "gesto", texto: "Pasar al frente es un paso visible, pero no es lo que salva.", formas: ["pasar al frente (los|te|lo|les|nos|las) salva", "si (pasas|pasan|pasa) al frente (eres|son|es|estas|estan|esta|quedas|quedan|seras|seran) salv*", "lo que salva es pasar"], anula: "paso" },
                  ],
                  modelo: "Debe explicar que responder es arrepentirse de los pecados y confiar en Cristo. Puede invitar a un paso visible, como pasar al frente o hablar con un consejero, sin decir que ese gesto es lo que salva.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se predica el mensaje en una campaña.",
            texto: "En una campaña, el mensaje se predica con [[claridad]] y en el [[poder]] de Dios, y su protagonista es [[Cristo]].",
            distractores: ["rodeos", "miedo", "Pablo"],
            errores: {
              rodeos: "El mensaje se predica con claridad.",
              miedo: "Se predica en el poder de Dios, no con trucos de persuasión.",
              Pablo: "Pablo no se predicaba a sí mismo: el protagonista no es el evangelista, sino Cristo.",
            },
            apoyo: "predicado con claridad y en el poder de Dios, no con trucos de persuasión",
            ref: "1 Corintios 2:1-5",
            explica: "El mensaje es Cristo crucificado y resucitado, predicado con claridad y en el poder de Dios, no con trucos de persuasión. El protagonista no es el evangelista, sino Cristo.",
          },
          {
            consigna: "Completa a qué renunció Pablo y a quién predicaba.",
            texto: "Pablo [[renunció]] a los trucos de persuasión: confiaba en el [[poder]] de Dios y predicaba a Jesucristo como [[Señor]].",
            distractores: ["recurrió", "enojo", "pretexto"],
            errores: {
              "recurrió": "Pablo renunció a los trucos: «no andando con astucia, ni adulterando la palabra de Dios».",
              enojo: "La fe de los oyentes debía estar fundada en el poder de Dios.",
              pretexto: "Pablo predicaba a Jesucristo como Señor: el protagonista no es el evangelista, sino Cristo.",
            },
            apoyo: "Pablo renunció a los trucos",
            ref: "2 Corintios 4:2-5",
            explica: "Pablo renunció a los trucos: «no andando con astucia, ni adulterando la palabra de Dios». Y decía: «Porque no nos predicamos a nosotros mismos, sino a Jesucristo como Señor».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "El evangelista invitado te dice: En el llamado voy a prometer que el que pase al frente saldrá de sus deudas esta misma semana.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el llamado no promete lo que Dios no prometió.", bien: true, explica: "El llamado honesto da tiempo y libertad, sin presión y sin promesas falsas." },
              { texto: "Que está bien, porque así más personas se animarán a pasar.", explica: "Prometer lo que Dios no prometió es manipular: el llamado confía en el poder de Dios." },
              { texto: "Que lo prometa solo a los que tienen las deudas más grandes.", explica: "Sigue siendo una promesa falsa: el llamado no promete lo que Dios no prometió." },
              { texto: "Que mejor prometa un trabajo nuevo, que es más fácil de creer.", explica: "También sería una promesa falsa: el llamado no engaña." },
            ],
            apoyo: "El llamado no presiona, no engaña ni promete lo que Dios no prometió",
            ref: "2 Corintios 4:2",
            explica: "Pablo renunció a los trucos. El llamado honesto no presiona, no engaña ni promete lo que Dios no prometió.",
          },
          {
            caso: "Una líder del comité te dice: Si nadie pasa al frente, el evangelista va a insistir y a insistir hasta que alguien se levante.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el llamado honesto no presiona: confía en el poder de Dios.", bien: true, explica: "El llamado honesto confía en el poder de Dios, no en la presión." },
              { texto: "Que está bien: si insiste lo suficiente, alguien terminará pasando.", explica: "Insistir hasta que alguien se levante es presión: el llamado da tiempo y libertad." },
              { texto: "Que mejor cierre las puertas, para que nadie se vaya antes de tiempo.", explica: "El llamado da tiempo y libertad, sin presión." },
              { texto: "Que deje el llamado para otro día, sin explicar qué es responder.", explica: "El llamado explica qué significa responder e invita a dar un paso, con libertad." },
            ],
            apoyo: "El llamado honesto confía en el poder de Dios, no en la presión",
            ref: "1 Corintios 2:4-5",
            explica: "Un llamado honesto da tiempo y libertad: sin presión, sin música que manipule y sin promesas falsas. Confía en el poder de Dios.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El llamado no presiona, no engaña ni promete lo que Dios no prometió",
            ref: "2 Corintios 4:2",
            clave: {
              id: "pr-evangelismo-misiones-2-4-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se distingue un llamado honesto de la manipulación?",
              ideas: [
                { id: "honesto", peso: 50, texto: "El llamado honesto explica qué significa responder y da tiempo y libertad.", formas: ["explic* que significa", "explic* lo que significa", "explic* que es", "da tiempo", "dar tiempo", "dando tiempo", "libertad", "que decida", "cada uno decida", "no (los|las|la|lo) apur*", "con calma"] },
                { id: "sinpresion", peso: 50, negativa: true, texto: "No presiona, no engaña ni promete lo que Dios no prometió: confía en el poder de Dios.", formas: ["no presion*", "sin presion*", "no engan*", "sin engan*", "ni engan*", "sin manipul*", "no manipul*", "sin promesas falsas", "no promet*", "ni promet*", "manipulacion presion*", "manipulacion engan*", "poder de dios", "su poder", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en dios", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en el poder"] },
              ],
              errores: [
                { id: "presionar", texto: "El llamado honesto no presiona.", formas: ["hay que presionar*", "deb* presionar*", "conviene presionar*", "presion* (mas|fuerte)", "us* la presion", "us* mas presion"], anula: "sinpresion" },
              ],
              modelo: "El llamado honesto explica qué significa responder, arrepentirse y confiar en Cristo, y da tiempo y libertad. No presiona, no engaña ni promete lo que Dios no prometió, porque confía en el poder de Dios.",
            },
          },
          {
            apoyo: "El llamado honesto confía en el poder de Dios, no en la presión",
            ref: "1 Corintios 2:4-5",
            clave: {
              id: "pr-evangelismo-misiones-2-4-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que un llamado sin presión no da resultados. ¿Qué le respondes?",
              ideas: [
                { id: "poder", peso: 50, texto: "Que el llamado honesto confía en el poder de Dios, no en la presión.", formas: ["poder de dios", "su poder", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en dios", "(confia|confiar|confiamos|confiando|confie|confien|confian|confiaba) en el poder", "obra de dios", "dios (obra|convence|salva|actua|da)", "lo da dios", "dios es el que"] },
                { id: "libertad", peso: 50, texto: "Que el llamado da tiempo y libertad, sin presión, sin música que manipule y sin promesas falsas.", formas: ["libertad", "que decida", "cada uno decida", "da tiempo", "dar tiempo", "sin musica", "sin promesas falsas", "sin manipul*", "con calma"] },
              ],
              errores: [
                { id: "resultados", texto: "El llamado honesto confía en el poder de Dios, no en la presión.", formas: ["la presion (da|trae|logra|consigue) (resultados|fruto)", "con presion (hay|llegan|vienen) (resultados|mas)", "hay que presionar*", "deb* presionar*", "presion* (mas|fuerte)"], anula: "poder" },
              ],
              modelo: "Le respondo que el llamado honesto confía en el poder de Dios, no en la presión. Por eso da tiempo y libertad, sin presión, sin música que manipule y sin promesas falsas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Consejeros y seguimiento
    "evangelismo-misiones-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo ocurre lo más importante de una campaña?", reverso: "Después de que se apagan las luces, al cuidar a los que respondieron.", apoyo: "Lo más importante de una campaña ocurre después de que se apagan las luces" },
              { frente: "¿Quién es el consejero de una campaña?", reverso: "Un creyente maduro y preparado, de una de las iglesias que participan.", apoyo: "Es un creyente maduro y preparado, de una de las iglesias que participan" },
              { frente: "¿A quién entrega el consejero los datos de la persona?", reverso: "A la iglesia más cercana a su casa, y solo con su permiso.", apoyo: "Anota sus datos solo con su permiso y los entrega a la iglesia más cercana a su casa" },
              { frente: "¿Cuál es la meta: una tarjeta llena o algo más?", reverso: "Un discípulo maduro, no una tarjeta llena.", apoyo: "La meta no es una tarjeta llena, sino un discípulo maduro" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué clase de fruto quiere Jesús?", reverso: "Un fruto que dure: que permanezca.", apoyo: "Jesús quiere un fruto que dure" },
              { frente: "¿Qué se le da al nuevo creyente para leer?", reverso: "Una Biblia y un plan de lectura sencillo.", apoyo: "Darle una Biblia y un plan de lectura sencillo" },
              { frente: "¿Para qué se lleva un registro en el seguimiento?", reverso: "Para que nadie se pierda.", apoyo: "Llevar un registro para que nadie se pierda" },
              { frente: "¿Cuándo se planifica la consolidación de una campaña?", reverso: "Desde el principio, no al final.", apoyo: "se planifica desde el principio, no al final" },
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
            consigna: "¿Así sirve el consejero de una campaña, o así no? Lleva cada frase a su grupo.",
            grupos: ["Así sirve el consejero", "Así no sirve el consejero"],
            frases: [
              { texto: "Escucha a la persona antes de hablarle", grupo: 0 },
              { texto: "Le explica el evangelio con la Biblia", grupo: 0 },
              { texto: "Ora con la persona que respondió", grupo: 0 },
              { texto: "Anota sus datos solo con su permiso", grupo: 0 },
              { texto: "La presiona para que llene la tarjeta", grupo: 1 },
              { texto: "Le promete que la llamará cada día, aunque no pueda", grupo: 1, explica: "El consejero no promete lo que no puede cumplir." },
              { texto: "Guarda sus datos y no se los pasa a ninguna iglesia", grupo: 1, explica: "Los datos se entregan a la iglesia más cercana a su casa." },
            ],
            apoyo: "Escucha a la persona, le explica el evangelio con la Biblia y ora con ella",
            explica: "El consejero escucha, explica el evangelio con la Biblia, ora con la persona y, con su permiso, pasa sus datos a la iglesia más cercana a su casa. No presiona ni promete lo que no puede cumplir.",
          },
          {
            consigna: "¿Es tarea del consejero o del equipo de seguimiento? Lleva cada frase a su grupo.",
            grupos: ["Tarea del consejero", "Tarea del seguimiento"],
            frases: [
              { texto: "Escuchar a la persona que respondió", grupo: 0 },
              { texto: "Explicar el evangelio con la Biblia y orar con la persona", grupo: 0 },
              { texto: "Pedir permiso para anotar los datos de la persona", grupo: 0 },
              { texto: "Llamar o visitar a cada persona en los días siguientes", grupo: 1 },
              { texto: "Invitar a cada uno a un grupo de nuevos creyentes", grupo: 1 },
              { texto: "Asignar a cada uno un acompañante que lo cuide", grupo: 1 },
              { texto: "Llevar un registro para que nadie se pierda", grupo: 1 },
            ],
            apoyo: "El consejero escucha, explica el evangelio con la Biblia, ora y, con permiso, pasa los datos a una iglesia cercana",
            explica: "El consejero escucha, explica el evangelio con la Biblia, ora y, con permiso, pasa los datos a una iglesia cercana. El seguimiento contacta pronto, invita a un grupo, da una Biblia, asigna un acompañante y lleva un registro.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "No presiona ni promete lo que no puede cumplir",
            ref: "Colosenses 1:28",
            situacion: "Eres consejero en una campaña de varias iglesias. Al terminar el llamado, una señora llamada Rosa se acerca llorando y te dice que quiere cambiar su vida.",
            escenas: [
              {
                id: "e1",
                narra: "Rosa está nerviosa y empieza a contarte lo que le pasa.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La escuchas con atención antes de hablarle.", valor: 2, explica: "El consejero escucha a la persona, le explica el evangelio con la Biblia y ora con ella.", siguiente: "e2" },
                  { texto: "La interrumpes y le pides que llene la tarjeta rápido.", valor: 0, explica: "El consejero no presiona: primero escucha a la persona.", siguiente: "e1b" },
                  { texto: "Le lees varios versículos sin preguntarle qué le pasa.", valor: 1, explica: "Usar la Biblia está bien, pero primero se escucha a la persona.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Rosa llena la tarjeta, pero se ve confundida y quiere irse.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón, la escuchas y le explicas el evangelio.", valor: 2, explica: "La meta no es una tarjeta llena, sino un discípulo maduro.", siguiente: "e2" },
                  { texto: "La dejas ir: la tarjeta ya está llena, y eso es lo que importa.", valor: 0, explica: "La meta no es una tarjeta llena, sino un discípulo maduro.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Rosa te pregunta qué tiene que hacer para seguir a Cristo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le explicas el evangelio con la Biblia y oras con ella.", valor: 2, explica: "Es la tarea del consejero: explica el evangelio con la Biblia y ora con la persona." },
                  { texto: "Le dices que con haber pasado al frente ya está todo hecho.", valor: 0, explica: "El consejero le explica el evangelio con la Biblia y ora con ella." },
                  { texto: "Oras con ella, pero no le explicas el evangelio con la Biblia.", valor: 1, explica: "Orar está bien, pero el consejero también explica el evangelio con la Biblia." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de despedirse, quieres que una iglesia la cuide.",
                pregunta: "¿Qué haces con sus datos?",
                opciones: [
                  { texto: "Con su permiso, los anotas y los pasas a la iglesia más cercana.", valor: 2, explica: "El consejero anota sus datos solo con su permiso y los entrega a la iglesia más cercana a su casa." },
                  { texto: "Los anotas sin preguntarle y los pones en el grupo de la iglesia.", valor: 0, explica: "Los datos se anotan solo con el permiso de la persona." },
                  { texto: "Los anotas con su permiso, pero no se los pasas a ninguna iglesia.", valor: 1, explica: "Pedir permiso está bien, pero los datos se entregan a la iglesia más cercana a su casa." },
                ],
              },
            ],
          },
          {
            apoyo: "Anota sus datos solo con su permiso y los entrega a la iglesia más cercana a su casa",
            ref: "Colosenses 1:28",
            situacion: "Eres consejero en la campaña de tu ciudad. Un joven llamado Diego respondió al llamado, y lo acompañas a un lado para conversar.",
            escenas: [
              {
                id: "e1",
                narra: "Diego te dice: No sé si esto es para mí; tengo muchas preguntas.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas y respondes sus preguntas con la Biblia.", valor: 2, explica: "El consejero escucha a la persona y le explica el evangelio con la Biblia.", siguiente: "e2" },
                  { texto: "Le dices que no piense tanto y que firme la tarjeta ya.", valor: 0, explica: "El consejero no presiona.", siguiente: "e1b" },
                  { texto: "Le das un folleto y le dices que lo lea en su casa.", valor: 1, explica: "Un folleto ayuda, pero el consejero escucha y explica el evangelio con la Biblia.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Diego firma, pero se nota que lo hizo por compromiso.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón por apurarlo y lo escuchas con calma.", valor: 2, explica: "El consejero escucha y no presiona.", siguiente: "e2" },
                  { texto: "Lo felicitas y lo cuentas como una decisión más del día.", valor: 0, explica: "Cada tarjeta de decisión es una persona que necesita un hermano.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Diego te pregunta si lo vas a llamar todos los días.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le dices con sinceridad lo que sí podrás cumplir.", valor: 2, explica: "El consejero no promete lo que no puede cumplir." },
                  { texto: "Le prometes que sí, aunque sabes que no podrás hacerlo.", valor: 0, explica: "El consejero no promete lo que no puede cumplir." },
                  { texto: "Le dices que no lo sabes todavía, y cambias de tema.", valor: 1, explica: "No prometer está bien, pero es mejor decirle con claridad lo que sí podrás hacer." },
                ],
              },
              {
                id: "e3",
                narra: "Diego vive lejos de tu iglesia, pero cerca de otra de las iglesias que participan.",
                pregunta: "¿Qué haces con sus datos?",
                opciones: [
                  { texto: "Con su permiso, los pasas a la iglesia más cercana a su casa.", valor: 2, explica: "El consejero entrega los datos a la iglesia más cercana a la casa de la persona." },
                  { texto: "Los guardas para tu iglesia, aunque a él le quede muy lejos de casa.", valor: 0, explica: "Los datos se entregan a la iglesia más cercana a su casa." },
                  { texto: "Le das la dirección de esa iglesia, pero no le avisas a nadie.", valor: 1, explica: "Darle la dirección ayuda, pero los datos se entregan a esa iglesia para que lo busquen." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace el seguimiento con cada persona que respondió.",
            texto: "El seguimiento [[contacta]] pronto a cada persona, la invita a un [[grupo]] de nuevos creyentes y lleva un [[registro]] para que nadie se pierda.",
            distractores: ["olvida", "comité", "secreto"],
            errores: {
              olvida: "El seguimiento contacta pronto a cada persona: una llamada o una visita en los días siguientes.",
              "comité": "A la persona se la invita a un grupo de nuevos creyentes y a los cultos de una iglesia cercana.",
              secreto: "Se lleva un registro para que nadie se pierda.",
            },
            apoyo: "El seguimiento contacta pronto, invita a un grupo, da una Biblia, asigna un acompañante y lleva un registro",
            ref: "Juan 15:16",
            explica: "El seguimiento contacta pronto a cada persona, la invita a un grupo de nuevos creyentes y a una iglesia cercana, le da una Biblia y un plan de lectura, le asigna un acompañante y lleva un registro para que nadie se pierda.",
          },
          {
            consigna: "Completa cómo se cuida en el seguimiento al nuevo creyente.",
            texto: "Al nuevo creyente se le hace pronto una [[llamada]] o una visita, se le da una [[Biblia]] con un plan de lectura y se le asigna alguien que lo [[cuide]].",
            distractores: ["multa", "revista", "juzgue"],
            errores: {
              multa: "Se contacta pronto a cada persona: una llamada o una visita en los días siguientes.",
              revista: "Se le da una Biblia y un plan de lectura sencillo.",
              juzgue: "Se le asigna un acompañante que la cuide, como en la consolidación.",
            },
            apoyo: "Asignarle un acompañante que la cuide, como en la consolidación",
            ref: "Juan 15:16",
            explica: "El seguimiento contacta pronto a cada persona con una llamada o una visita, le da una Biblia y un plan de lectura sencillo y le asigna un acompañante que la cuide, como en la consolidación.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la consolidación en una campaña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La consolidación es la otra mitad de toda campaña.", verdad: true, explica: "La consolidación que se estudió en el Nivel 3 es la otra mitad de toda campaña.", apoyo: "La consolidación que se estudió en el Nivel 3 es la otra mitad de toda campaña" },
              { texto: "La consolidación se planifica al final, cuando la campaña ya terminó.", verdad: false, explica: "La consolidación se planifica desde el principio, no al final.", apoyo: "se planifica desde el principio, no al final" },
              { texto: "Lo más importante de una campaña ocurre en la noche del llamado.", verdad: false, explica: "Lo más importante ocurre después de que se apagan las luces: cuidar a los que respondieron.", apoyo: "Lo más importante de una campaña ocurre después de que se apagan las luces: cuidar a los que respondieron" },
            ],
          },
          {
            consigna: "Sobre el fruto que Jesús quiere: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús quiere un fruto que permanezca.", verdad: true, explica: "«os he puesto para que vayáis y llevéis fruto, y vuestro fruto permanezca».", apoyo: "Jesús quiere un fruto que dure", ref: "Juan 15:16" },
              { texto: "La meta de una campaña es llenar las tarjetas de decisión.", verdad: false, explica: "La meta no es una tarjeta llena, sino un discípulo maduro.", apoyo: "La meta no es una tarjeta llena, sino un discípulo maduro", ref: "Colosenses 1:28" },
              { texto: "Cada tarjeta de decisión es una persona que necesita un hermano.", verdad: true, explica: "Por eso el seguimiento asigna a cada persona un acompañante que la cuide.", apoyo: "Cada tarjeta de decisión es una persona que necesita un hermano" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una líder del comité de la campaña te escribe: Ya pasó una semana y nadie ha llamado a los que respondieron. ¿Esperamos al próximo culto?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los llamen o visiten ya, y los inviten a una iglesia cercana.", bien: true, explica: "Hay que contactar pronto a cada persona y unirla con una iglesia cercana." },
              { texto: "Que esperen: si de verdad creyeron, ellos solos buscarán una iglesia.", explica: "Lo más importante de una campaña ocurre después: cuidar a los que respondieron." },
              { texto: "Que les manden a todos el mismo mensaje y den el trabajo por hecho.", explica: "El seguimiento contacta a cada persona y le asigna un acompañante que la cuide." },
              { texto: "Que llamen solo a los que viven cerca de la iglesia más grande.", explica: "Cada persona se une con la iglesia más cercana a su casa." },
            ],
            apoyo: "Contactar pronto a cada persona: una llamada o una visita en los días siguientes",
            ref: "Juan 15:16",
            explica: "El seguimiento contacta pronto a cada persona, con una llamada o una visita, y la invita a un grupo de nuevos creyentes y a los cultos de una iglesia cercana.",
          },
          {
            caso: "Un pastor de las iglesias que participan te dice: Ya repartimos las tarjetas entre las iglesias, pero nadie sabe quién llamó a quién.",
            pregunta: "¿Qué le propones?",
            opciones: [
              { texto: "Llevar un registro de cada persona, para que nadie se pierda.", bien: true, explica: "El seguimiento lleva un registro para que nadie se pierda." },
              { texto: "No preocuparse: cada iglesia sabrá qué hacer con sus tarjetas.", explica: "Sin un registro, alguien se puede perder." },
              { texto: "Guardar todas las tarjetas en una caja hasta la próxima campaña.", explica: "El seguimiento contacta pronto a cada persona, en los días siguientes." },
              { texto: "Llamar a todos otra vez, sin anotar nada, por si acaso.", explica: "Llamar ayuda, pero se lleva un registro para que nadie se pierda." },
            ],
            apoyo: "Llevar un registro para que nadie se pierda",
            ref: "Juan 15:16",
            explica: "El seguimiento lleva un registro para que nadie se pierda, y une a cada persona con una iglesia cercana.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La consolidación que se estudió en el Nivel 3 es la otra mitad de toda campaña: se planifica desde el principio, no al final",
            ref: "Juan 15:16",
            clave: {
              id: "pr-evangelismo-misiones-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la consolidación es la otra mitad de toda campaña, y cuándo se planifica?",
              ideas: [
                { id: "despues", peso: 50, texto: "Porque lo más importante viene después: cuidar a los que respondieron, para que su fruto permanezca.", formas: ["cuid* a los que", "cuid* a (las|los) (personas|nuevos)", "se apagan las luces", "fruto permane*", "fruto que permane*", "fruto que (dure|dura)", "permane*", "discipulo maduro", "nadie se pierda", "no se pierda*", "se pierd*"] },
                { id: "principio", peso: 50, texto: "Se planifica desde el principio, no al final.", formas: ["desde el principio", "desde el inicio", "desde el comienzo", "al principio", "al inicio", "antes de la campana", "desde antes"] },
              ],
              errores: [
                { id: "final", texto: "La consolidación se planifica desde el principio, no al final.", formas: ["se planifica al final", "se planea al final", "planific* al final"], anula: "principio" },
              ],
              modelo: "Porque lo más importante de una campaña viene después: cuidar a los que respondieron, para que su fruto permanezca. Por eso la consolidación se planifica desde el principio, no al final.",
            },
          },
          {
            apoyo: "La meta no es una tarjeta llena, sino un discípulo maduro",
            ref: "Colosenses 1:28; Juan 15:16",
            clave: {
              id: "pr-evangelismo-misiones-2-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Lo nuestro es predicar en la campaña; del seguimiento ya se ocupará alguien. ¿Qué le respondes?",
              ideas: [
                { id: "fruto", peso: 50, texto: "Que Jesús quiere un fruto que permanezca: la meta es un discípulo maduro, no una tarjeta llena.", formas: ["fruto permane*", "fruto que permane*", "fruto que dure", "permane*", "discipulo maduro", "discipul*", "perfecto en cristo", "no una tarjeta", "no es una tarjeta"] },
                { id: "mitad", peso: 50, texto: "Que la consolidación es la otra mitad de toda campaña, y se planifica desde el principio.", formas: ["otra mitad", "la mitad", "desde el principio", "desde el inicio", "al principio", "planific*", "parte de la campana"] },
              ],
              modelo: "Le respondo que Jesús quiere un fruto que permanezca: la meta es un discípulo maduro, no una tarjeta llena. La consolidación es la otra mitad de toda campaña, y se planifica desde el principio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Integridad y evaluación
    "evangelismo-misiones-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde y cuándo se hicieron los compromisos de Modesto?", reverso: "En Modesto, California, en 1948.", apoyo: "En 1948, en Modesto, California" },
              { frente: "¿Cómo se maneja el dinero, según los compromisos de Modesto?", reverso: "Con transparencia y sin buscar ganancia.", apoyo: "El dinero: manejarlo con transparencia y sin buscar ganancia" },
              { frente: "¿Qué no se exagera al informar?", reverso: "Ni los números ni los resultados.", apoyo: "La honestidad: no exagerar los números ni los resultados al informar" },
              { frente: "¿Qué se hace con las iglesias del lugar?", reverso: "No criticarlas, sino trabajar con ellas.", apoyo: "Las iglesias del lugar: no criticarlas, sino trabajar con ellas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué puede pasar con una campaña que reúne a miles si falta la integridad?", reverso: "Puede dañar el testimonio del evangelio.", apoyo: "Una campaña puede reunir a miles y, aun así, dañar el testimonio del evangelio si falta la integridad" },
              { frente: "¿Cómo se procura manejar el dinero, según 2 Corintios 8:21?", reverso: "Honradamente, delante del Señor y también delante de los hombres.", apoyo: "Con el dinero se procura hacer las cosas honradamente «no sólo delante del Señor sino también delante de los hombres»" },
              { frente: "¿Cuántas personas cuentan las ofrendas?", reverso: "Dos personas.", apoyo: "dos personas que cuentan las ofrendas e informe final" },
              { frente: "¿Qué se evita con el compromiso de la pureza?", reverso: "Toda situación que dé lugar a la tentación o a la sospecha.", apoyo: "La pureza: evitar toda situación que diera lugar a la tentación o a la sospecha" },
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
            consigna: "Une cada compromiso de Modesto con lo que pide.",
            pares: [
              ["El dinero", "Manejarlo con transparencia y sin buscar ganancia"],
              ["La pureza", "Evitar lo que dé lugar a la tentación o a la sospecha"],
              ["La honestidad", "No exagerar los números ni los resultados al informar"],
              ["Las iglesias del lugar", "No criticarlas, sino trabajar con ellas"],
            ],
            apoyo: "se comprometieron a cuidar cuatro áreas",
            explica: "En 1948, en Modesto, Billy Graham y su equipo se comprometieron a cuidar el dinero, la pureza, la honestidad al informar y el trabajo con las iglesias del lugar.",
          },
          {
            consigna: "Une cada compromiso de Modesto con un ejemplo de cómo se cumple.",
            pares: [
              ["El dinero", "Presupuesto conocido, dos que cuentan y un informe final"],
              ["La pureza", "No dar lugar a la tentación ni a la sospecha"],
              ["La honestidad", "Informar los números reales, sin exagerar"],
              ["Las iglesias del lugar", "Trabajar con ellas en vez de criticarlas"],
            ],
            apoyo: "presupuesto conocido, dos personas que cuentan las ofrendas e informe final",
            explica: "El dinero se maneja con un presupuesto conocido, dos personas que cuentan las ofrendas e informe final; la pureza evita lo que dé lugar a la tentación o a la sospecha; la honestidad no exagera los números; y con las iglesias del lugar se trabaja, sin criticarlas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Tesalonicenses 2:5",
            consigna: "¿Qué palabras nunca usó Pablo, y qué no encubrió? Toca las palabras que lo dicen.",
            texto: "nunca usamos de palabras [[lisonjeras]], como sabéis, ni encubrimos [[avaricia]]; Dios es testigo",
            apoyo: "el evangelista no usa palabras lisonjeras ni encubre avaricia",
            explica: "Pablo podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo». Así también el evangelista no usa palabras lisonjeras ni encubre avaricia.",
          },
          {
            ref: "1 Tesalonicenses 2:4",
            consigna: "Pablo hablaba para agradar a alguien. ¿A quién no, y a quién sí? Toca las dos palabras que lo dicen.",
            texto: "no como para agradar a los [[hombres]], sino a [[Dios]]",
            apoyo: "La integridad del evangelista también es parte del mensaje",
            explica: "Pablo hablaba «no como para agradar a los hombres, sino a Dios». La integridad del evangelista también es parte del mensaje.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Como Pablo, el evangelista no usa palabras lisonjeras ni encubre avaricia, y maneja el dinero honradamente",
            ref: "1 Tesalonicenses 2:3-5",
            titulo: "Las ofrendas de la campaña",
            relato: [
              "Eres el tesorero de una campaña de cuatro iglesias. El evangelista invitado predica con claridad, y cada noche se recoge una ofrenda para los gastos.",
              "Un ayudante del evangelista te dice: Déjame contar la ofrenda a mí solo, en el cuarto de atrás; así terminamos más rápido.",
              "Esa misma noche, el evangelista piensa alabar desde el púlpito a los que dan más, para que los demás den también.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al ayudante?",
                opciones: [
                  { texto: "Que las ofrendas las cuentan dos personas, y todo va al informe.", bien: true, explica: "Con el dinero se procura hacer las cosas honradamente: presupuesto conocido, dos personas que cuentan las ofrendas e informe final." },
                  { texto: "Que sí, porque el ayudante del evangelista es de toda confianza.", explica: "El dinero se maneja honradamente también delante de los hombres: dos personas cuentan las ofrendas." },
                  { texto: "Que mejor nadie la cuente, y que se gaste según vaya haciendo falta.", explica: "El dinero se maneja con transparencia: presupuesto conocido, dos que cuentan e informe final." },
                ],
                apoyo: "presupuesto conocido, dos personas que cuentan las ofrendas e informe final",
                explica: "Con el dinero se procura hacer las cosas honradamente «no sólo delante del Señor sino también delante de los hombres».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices al evangelista sobre alabar a los que dan más?",
                opciones: [
                  { texto: "Que Pablo nunca usó palabras lisonjeras ni encubrió avaricia.", bien: true, explica: "Pablo podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo»." },
                  { texto: "Que está bien, porque así la campaña tendrá más dinero para los gastos.", explica: "Buscar dinero con palabras que agradan es usar palabras lisonjeras." },
                  { texto: "Que lo haga, pero sin decir los nombres de los que dieron más.", explica: "Seguiría buscando el dinero con palabras que agradan: Pablo nunca usó palabras lisonjeras." },
                ],
                apoyo: "Pablo podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo»",
                explica: "Pablo hablaba «no como para agradar a los hombres, sino a Dios».",
              },
              {
                tipo: "situacion",
                pregunta: "Al terminar la campaña, ¿qué haces con las cuentas?",
                opciones: [
                  { texto: "Presentas un informe final, para que las cuentas queden claras.", bien: true, explica: "Una campaña íntegra termina con un informe final y cuentas claras." },
                  { texto: "Las guardas, porque las cuentas de la campaña no son asunto de nadie.", explica: "El dinero se maneja honradamente delante del Señor y también delante de los hombres." },
                  { texto: "Informas solo lo que se recogió, sin decir en qué se gastó.", explica: "El informe es honesto y las cuentas quedan claras." },
                ],
                apoyo: "¿Las cuentas quedaron claras y el informe fue honesto?",
                explica: "Con el dinero se procura hacer las cosas honradamente: presupuesto conocido, dos personas que cuentan las ofrendas e informe final.",
              },
              {
                tipo: "explica",
                apoyo: "Pablo podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia; Dios es testigo»",
                clave: {
                  id: "pr-evangelismo-misiones-2-6-a4-1",
                  tipo: "corta",
                  pregunta: "Según 1 Tesalonicenses 2:3-5, ¿cómo debe hablar el evangelista, y cómo debe manejar el dinero?",
                  ideas: [
                    { id: "lisonja", peso: 50, negativa: true, texto: "No usa palabras lisonjeras: habla para agradar a Dios, no a los hombres.", formas: ["lisonj*", "halag*", "adular", "adulando", "adulacion", "agrad* a dios", "no agrad* a los hombres", "no para agradar", "no como para agradar"] },
                    { id: "avaricia", peso: 50, negativa: true, texto: "No encubre avaricia: maneja el dinero honradamente, delante del Señor y de los hombres.", formas: ["avaric*", "codici*", "honrado", "honrada", "honradez", "honradamente", "transparen*", "sin buscar ganancia", "delante de los hombres", "delante del senor", "cuentas claras"] },
                  ],
                  errores: [
                    { id: "usa-lisonja", texto: "Pablo nunca usó palabras lisonjeras.", formas: ["(usa|usar|use|usen|usamos) palabras lisonj*", "halag* a los que (dan|dieron|ofrendan)"], anula: "lisonja" },
                    { id: "encubre", texto: "Pablo no encubría avaricia.", formas: ["encubr* avaric*", "encubr* la avaric*", "buscar ganancia", "busca* ganancia"], anula: "avaricia" },
                  ],
                  modelo: "Debe hablar sin palabras lisonjeras, para agradar a Dios y no a los hombres. Y no debe encubrir avaricia: maneja el dinero honradamente, delante del Señor y también de los hombres.",
                },
              },
            ],
          },
          {
            apoyo: "La integridad del evangelista también es parte del mensaje",
            ref: "1 Tesalonicenses 2:3-5",
            titulo: "El evangelista invitado",
            relato: [
              "Eres parte del comité de una campaña de varias iglesias. Invitaron a un evangelista conocido, que predicará cuatro noches.",
              "El primer día, el evangelista te pide en privado que una parte de las ofrendas sea para él, sin que lo sepan las iglesias.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al evangelista?",
                opciones: [
                  { texto: "Que no: el presupuesto es conocido y nada se encubre.", bien: true, explica: "Pablo nunca encubrió avaricia, y con el dinero se procura hacer las cosas honradamente delante de los hombres." },
                  { texto: "Que sí, porque predica muy bien y se lo tiene bien merecido.", explica: "El dinero se maneja con transparencia y sin buscar ganancia." },
                  { texto: "Que sí, pero solo si la parte que pide es pequeña.", explica: "Lo que se esconde a las iglesias, aunque sea poco, encubre avaricia." },
                ],
                apoyo: "El dinero: manejarlo con transparencia y sin buscar ganancia",
                explica: "En Modesto, Billy Graham y su equipo se comprometieron a manejar el dinero con transparencia y sin buscar ganancia.",
              },
              {
                tipo: "situacion",
                pregunta: "La segunda noche, notas que el evangelista suaviza el mensaje para que nadie se moleste. ¿Qué le dices?",
                opciones: [
                  { texto: "Que se habla para agradar a Dios, no a los hombres.", bien: true, explica: "Pablo hablaba «no como para agradar a los hombres, sino a Dios»." },
                  { texto: "Nada: si la gente está contenta, la campaña va muy bien.", explica: "Pablo no hablaba para agradar a los hombres, sino a Dios." },
                  { texto: "Que lo suavice más todavía, para que la gente vuelva mañana.", explica: "Pablo nunca usó palabras lisonjeras: hablaba para agradar a Dios." },
                ],
                apoyo: "Hablaba «no como para agradar a los hombres, sino a Dios»",
                explica: "El evangelista no usa palabras lisonjeras: habla para agradar a Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "Al final, el evangelista quiere informar que respondieron mil personas, aunque fueron doscientas. ¿Qué haces?",
                opciones: [
                  { texto: "Informas los números reales, sin exagerar nada.", bien: true, explica: "La honestidad: no exagerar los números ni los resultados al informar." },
                  { texto: "Pones mil, porque así las iglesias se animan más.", explica: "Exagerar los números daña el testimonio: el informe es honesto." },
                  { texto: "No pones ningún número, para que nadie haga preguntas.", explica: "El informe es honesto: dice los números reales." },
                ],
                apoyo: "La honestidad: no exagerar los números ni los resultados al informar",
                explica: "La integridad del evangelista también es parte del mensaje.",
              },
              {
                tipo: "explica",
                apoyo: "Como Pablo, el evangelista no usa palabras lisonjeras ni encubre avaricia, y maneja el dinero honradamente",
                clave: {
                  id: "pr-evangelismo-misiones-2-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías al evangelista, con las palabras de Pablo en 1 Tesalonicenses 2:3-5?",
                  ideas: [
                    { id: "agradar", peso: 50, texto: "Que no hable para agradar a los hombres, sino a Dios.", formas: ["agrad* a dios", "agradarle a dios", "sino a dios", "no a los hombres", "no para agradar", "no como para agradar", "sin palabras lisonj*", "ni palabras lisonj*", "no (use|usar|usa) palabras lisonj*"] },
                    { id: "avaricia", peso: 50, negativa: true, texto: "Que no encubra avaricia: el dinero se maneja honradamente.", formas: ["avaric*", "codici*", "honrado", "honrada", "honradez", "honradamente", "transparen*", "sin buscar ganancia", "delante de los hombres", "cuentas claras", "presupuesto conocido"] },
                  ],
                  errores: [
                    { id: "agradar-hombres", texto: "Pablo hablaba no como para agradar a los hombres, sino a Dios.", formas: ["(hable|hablar|habla|predique|predicar) para agradar a (los|la) (hombres|gente)", "(agrade|agradar) a la gente"], anula: "agradar" },
                    { id: "encubre", texto: "Pablo no encubría avaricia.", formas: ["encubr* avaric*", "encubr* la avaric*", "buscar ganancia", "busca* ganancia"], anula: "avaricia" },
                  ],
                  modelo: "Le diría que, como Pablo, no hable para agradar a los hombres, sino a Dios, y que nunca encubra avaricia: el dinero se maneja honradamente, con un presupuesto conocido y un informe final.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Esta pregunta evalúa el fruto de la campaña, o solo mira los números? Lleva cada frase a su grupo.",
            grupos: ["Evalúa el fruto", "Solo mira los números"],
            frases: [
              { texto: "¿Cuántos siguen en una iglesia meses después?", grupo: 0 },
              { texto: "¿Se predicó a Cristo con claridad?", grupo: 0 },
              { texto: "¿Las iglesias quedaron más unidas?", grupo: 0 },
              { texto: "¿Hay más creyentes que evangelizan?", grupo: 0 },
              { texto: "¿Cuántas sillas se llenaron cada noche?", grupo: 1 },
              { texto: "¿Cuántos pasaron al frente, sin saber más de ellos?", grupo: 1 },
              { texto: "¿Fue la campaña más grande de la ciudad?", grupo: 1 },
            ],
            apoyo: "Una campaña se evalúa por su fruto: discípulos que permanecen, y no solo números",
            explica: "Una campaña se evalúa por su fruto: cuántos siguen en una iglesia meses después, si se predicó a Cristo con claridad y si las iglesias quedaron más unidas y con más creyentes que evangelizan.",
          },
          {
            consigna: "¿Así se evalúa una campaña con honestidad, o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se evalúa con honestidad", "Así no se evalúa"],
            frases: [
              { texto: "Revisar si las cuentas quedaron claras", grupo: 0 },
              { texto: "Preguntar qué aprendimos para la próxima vez", grupo: 0 },
              { texto: "Contar cuántos siguen en una iglesia meses después", grupo: 0 },
              { texto: "Redondear hacia arriba los números del informe", grupo: 1, explica: "La honestidad: no exagerar los números ni los resultados al informar." },
              { texto: "Medir el éxito solo por la gente que llegó", grupo: 1 },
              { texto: "Callar lo que salió mal, para no desanimar a nadie", grupo: 1, explica: "Evaluar con honestidad pregunta qué aprendimos para la próxima vez." },
            ],
            apoyo: "¿Qué aprendimos para la próxima vez?",
            explica: "Evaluar con honestidad pregunta cuántos siguen en una iglesia meses después, si las cuentas quedaron claras y el informe fue honesto, y qué aprendimos para la próxima vez.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los compromisos de Modesto tiene un error. Tócala.",
            frases: [
              "En 1948, Billy Graham y su equipo hablaron de los problemas que habían desacreditado a muchos evangelistas.",
              "Se comprometieron a manejar el dinero con transparencia y sin buscar ganancia.",
              "Decidieron informar números más altos, para animar a las iglesias.",
              "Se comprometieron a no criticar a las iglesias del lugar, sino a trabajar con ellas.",
            ],
            malo: 2,
            correccion: "Se comprometieron a no exagerar los números ni los resultados al informar.",
            apoyo: "La honestidad: no exagerar los números ni los resultados al informar",
            explica: "En Modesto se comprometieron a cuidar cuatro áreas: el dinero, la pureza, la honestidad al informar y el trabajo con las iglesias del lugar.",
          },
          {
            consigna: "Una de estas frases sobre las cuatro áreas que cuidaron en Modesto tiene un error. Tócala.",
            frases: [
              "Billy Graham y su equipo se comprometieron a cuidar cuatro áreas.",
              "La pureza: evitar lo que diera lugar a la tentación o a la sospecha.",
              "El dinero: manejarlo en secreto, sin rendir cuentas a nadie.",
              "La honestidad: no exagerar los resultados al informar.",
            ],
            malo: 2,
            correccion: "El dinero: manejarlo con transparencia y sin buscar ganancia.",
            apoyo: "El dinero: manejarlo con transparencia y sin buscar ganancia",
            explica: "En Modesto, Billy Graham y su equipo se comprometieron a manejar el dinero con transparencia y sin buscar ganancia.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Una campaña se evalúa por su fruto: discípulos que permanecen, y no solo números",
            ref: "Juan 15:16",
            clave: {
              id: "pr-evangelismo-misiones-2-6-a7-1",
              tipo: "corta",
              pregunta: "Una campaña reunió a cinco mil personas, pero meses después casi nadie sigue en una iglesia. ¿Cómo la evalúas, y por qué?",
              ideas: [
                { id: "fruto", peso: 50, texto: "Se evalúa por su fruto, discípulos que permanecen, y no solo por sus números.", formas: ["por su fruto", "por el fruto", "su fruto", "discipul*", "permane*", "no solo numeros", "no solo por los numeros", "no solo por sus numeros", "no por los numeros", "no por (el|la) (cantidad|numero)"] },
                { id: "honesto", peso: 50, texto: "Hay que decirlo con honestidad y aprender para la próxima vez.", formas: ["honest*", "aprend*", "proxima vez", "reconoc*", "con verdad", "sin exagerar", "decir la verdad"] },
              ],
              errores: [
                { id: "exito", texto: "Una campaña se evalúa por su fruto, y no solo por sus números.", formas: ["fue un exito", "fue exitosa", "salio muy bien", "se evalua por (los|el|la) (numeros|numero|cantidad|asistencia)", "lo que cuenta (es|son) (la|los|el) (cantidad|numeros|gente)"], anula: "fruto" },
              ],
              modelo: "La evalúo por su fruto, no solo por sus números: lo que importa son discípulos que permanecen en una iglesia meses después. Hay que decirlo con honestidad en el informe y aprender para la próxima vez.",
            },
          },
          {
            apoyo: "Evaluar una campaña por su fruto y no solo por sus números",
            ref: "Juan 15:16",
            clave: {
              id: "pr-evangelismo-misiones-2-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué no basta con contar cuántas personas llegaron para evaluar una campaña?",
              ideas: [
                { id: "fruto", peso: 50, texto: "Porque una campaña se evalúa por su fruto: discípulos que siguen en una iglesia meses después.", formas: ["por su fruto", "por el fruto", "su fruto", "el fruto", "discipul*", "permane*", "siguen en (una|la) iglesia", "meses despues"] },
                { id: "preguntas", peso: 50, texto: "Porque también hay que preguntar si se predicó a Cristo con claridad, si las iglesias quedaron más unidas y si las cuentas quedaron claras.", formas: ["con claridad", "predic* a cristo", "mas unidas", "(unidos|unidas|unida|unido)", "cuentas claras", "las cuentas", "informe honesto", "evangeliz*", "aprend*", "proxima vez"] },
              ],
              modelo: "Porque una campaña se evalúa por su fruto: discípulos que siguen en una iglesia meses después, y no solo números. También hay que preguntar si se predicó a Cristo con claridad, si las iglesias quedaron más unidas y si las cuentas quedaron claras.",
            },
          },
        ],
      },
    ],
  },
};
