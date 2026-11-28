/**
 * Las prácticas de la materia `pastoral-5` (especialidad «Ministerio pastoral»), «Predicación pastoral». Hechas solo
 * con lo que dice cada lección (server/academia/contenido/pastoral-5.ts), con la guía de docs/academia-practicas.md.
 *
 * Todo se mira desde el púlpito del pastor que conoce a su rebaño. No se repiten las actividades de «Teología pastoral»
 * (Nivel 5: el encargo de Juan 21 y 2 Timoteo 4, el plan de enseñanza del año y la visita en la crisis), de Homilética I
 * y II (cómo se arma un sermón) ni de «Ordenanzas y ceremonias» (el orden del funeral). Nada se pregunta sobre quién
 * puede ocupar cada cargo ni sobre el ministerio de la mujer, y las series de doctrina se nombran sin entrar en lo que
 * dice la declaración de fe.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_PASTORAL_5: PracticasMateria = {
  materia: "pastoral-5",
  mision: {
    titulo: "Un año de púlpito con tu rebaño",
    intro:
      "Una iglesia te pidió que la pastorees desde el púlpito durante todo un año. Vas a predicar como el pastor que conoce a su gente, armar el plan de predicación del año, hablar el domingo después de una tragedia, preparar los mensajes de Navidad, de Semana Santa, de una boda y de un funeral, corregir y consolar con la verdad en amor, y seguir creciendo como predicador. Repasa las seis lecciones para tener lista cada respuesta.",
    cierre:
      "Ya sabes predicar como pastor: alimentar, advertir, exhortar y consolar a un rebaño que conoces; darle todo el consejo de Dios con un plan en lápiz; acompañar y anunciar la esperanza en la crisis; hablar con claridad a los de afuera; corregir con lágrimas y no con piedras; y seguir aprendiendo con humildad y honestidad. El púlpito se renueva en el escritorio, en la oración y en la humildad de aprender.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La predicación del pastor
    "pastoral-5-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según la lección, ¿qué es predicar?", reverso: "Una forma de apacentar: de dar de comer al rebaño.", apoyo: "Predicar es una forma de apacentar: de dar de comer al rebaño" },
              { frente: "Como el atalaya, ¿de parte de quién habla el pastor?", reverso: "De parte de Dios, no de su propia parte.", apoyo: "El pastor no predica de su parte, sino de parte de Dios" },
              { frente: "El invitado conoce el texto. ¿Qué conoce además el pastor?", reverso: "A las personas que lo escuchan.", apoyo: "el pastor conoce el texto y a las personas que lo escuchan" },
              { frente: "¿Qué hace el pastor el lunes, después de predicar?", reverso: "Sigue con la visita, la consejería y el cuidado.", apoyo: "el pastor sigue el lunes con la visita, la consejería y el cuidado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo predica mejor el pastor?", reverso: "Cuando conoce a quienes lo escuchan.", apoyo: "El pastor predica mejor cuando conoce a quienes lo escuchan" },
              { frente: "El invitado puede sembrar. ¿Qué hace el pastor?", reverso: "Siembra, riega y espera la cosecha con paciencia.", apoyo: "el pastor siembra, riega y espera la cosecha con paciencia" },
              { frente: "¿Para qué habla la palabra que viene de Dios?", reverso: "Habla «para edificación, exhortación y consolación».", apoyo: "La palabra que viene de Dios edifica a la iglesia" },
              { frente: "Mientras preparas el sermón, ¿en quiénes piensas?", reverso: "En personas concretas: la viuda, el joven que duda, la familia que se está mudando.", apoyo: "Mientras preparas el sermón, piensa en personas concretas" },
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
            consigna: "Une lo que hace el predicador invitado con lo que hace el pastor que predica.",
            pares: [
              ["El invitado predica un mensaje", "El pastor alimenta a un rebaño semana tras semana"],
              ["El invitado conoce el texto", "El pastor conoce el texto y a las personas que lo escuchan"],
              ["El invitado se va al terminar", "El pastor sigue el lunes con la visita y el cuidado"],
              ["El invitado puede sembrar", "El pastor siembra, riega y espera la cosecha"],
            ],
            apoyo: "El invitado predica un mensaje; el pastor alimenta a un rebaño semana tras semana",
            explica: "El invitado predica un mensaje, conoce el texto, se va al terminar y puede sembrar. El pastor alimenta a un rebaño semana tras semana, conoce también a las personas, sigue el lunes con el cuidado y espera la cosecha con paciencia.",
          },
          {
            consigna: "Une cada pregunta sobre el pastor que predica con lo que dice la lección.",
            pares: [
              ["¿Qué conoce el pastor?", "El texto y a las personas que lo escuchan"],
              ["¿A quiénes predica cada semana?", "A las mismas personas"],
              ["¿Qué hace el lunes?", "Visita a su gente y sigue con su cuidado"],
              ["¿Cómo espera la cosecha?", "Con paciencia, después de sembrar y regar"],
            ],
            apoyo: "El pastor predica cada semana a las mismas personas, y el lunes las visita",
            explica: "El pastor conoce el texto y a las personas que lo escuchan; predica cada semana a las mismas personas; el lunes las visita y sigue con la consejería y el cuidado; y espera la cosecha con paciencia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Dios puso a Ezequiel por atalaya. ¿De parte de quién debía amonestar al pueblo? Toca las palabras que lo dicen.",
            texto: "oirás, pues, tú la palabra de mi boca, y los amonestarás [[de mi parte]]",
            apoyo: "El pastor no predica de su parte, sino de parte de Dios",
            ref: "Ezequiel 3:17",
            explica: "Dios le dijo al atalaya: «oirás, pues, tú la palabra de mi boca, y los amonestarás de mi parte». Así también, el pastor no predica de su parte, sino de parte de Dios.",
          },
          {
            consigna: "Pablo le pide a Timoteo que predique la palabra y que inste a tiempo y fuera de tiempo. ¿Qué tres tareas le pide después? Toca las palabras que lo dicen.",
            texto: "que prediques la palabra; que instes a tiempo y fuera de tiempo; [[redarguye]], [[reprende]], [[exhorta]] con toda paciencia y doctrina",
            apoyo: "La paciencia también es parte de la predicación pastoral",
            ref: "2 Timoteo 4:2",
            explica: "Pablo le pide a Timoteo: «redarguye, reprende, exhorta con toda paciencia y doctrina». La paciencia también es parte de la predicación pastoral.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace el pastor cuando predica.",
            texto: "Predicar es una forma de [[apacentar]]: de dar de comer al [[rebaño]]. Como el [[atalaya]], el pastor habla de parte de Dios.",
            distractores: ["entretener", "público", "actor"],
            errores: {
              entretener: "Predicar es una forma de apacentar: de dar de comer al rebaño.",
              "público": "Predicar es dar de comer al rebaño que el pastor conoce y cuida.",
              actor: "Dios puso a Ezequiel «por atalaya a la casa de Israel»: el pastor no predica de su parte, sino de parte de Dios.",
            },
            apoyo: "Predicar es una forma de apacentar: de dar de comer al rebaño",
            ref: "Juan 21:15-17",
            explica: "Predicar es una forma de apacentar, de dar de comer al rebaño. Y como el atalaya, el pastor no predica de su parte, sino de parte de Dios.",
          },
          {
            consigna: "Completa lo que busca la palabra que predica el pastor.",
            texto: "La palabra que viene de Dios [[edifica]] a la iglesia, la exhorta y la [[consuela]]; y Pablo pide exhortar con toda [[paciencia]] y doctrina.",
            distractores: ["divide", "acusa", "prisa"],
            errores: {
              divide: "La palabra que viene de Dios edifica a la iglesia.",
              acusa: "La palabra que viene de Dios habla «para edificación, exhortación y consolación».",
              prisa: "Pablo pide exhortar «con toda paciencia y doctrina»: la paciencia también es parte de la predicación pastoral.",
            },
            apoyo: "La paciencia también es parte de la predicación pastoral",
            ref: "1 Corintios 14:3",
            explica: "La palabra que viene de Dios edifica a la iglesia: habla para edificación, exhortación y consolación. Y Pablo pide exhortar con toda paciencia y doctrina: la paciencia también es parte de la predicación pastoral.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de la iglesia te dice: El predicador invitado del domingo predicó un gran sermón. ¿Por qué no lo traen cada semana en lugar del pastor?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el pastor conoce el texto y también a su gente, y la cuida toda la semana.", bien: true, explica: "El invitado conoce el texto; el pastor conoce el texto y a las personas que lo escuchan, predica semana tras semana y sigue el lunes con el cuidado." },
              { texto: "Que tiene razón: lo único que importa es que el sermón suene bien cada domingo.", explica: "El invitado predica un mensaje y se va; el pastor alimenta a un rebaño semana tras semana." },
              { texto: "Que el invitado no conoce el texto tan bien como lo conoce el pastor de la iglesia.", explica: "La lección no dice eso: el invitado conoce el texto; el pastor conoce el texto y a las personas que lo escuchan." },
              { texto: "Que el pastor predica mejor porque habla más tiempo que cualquier invitado.", explica: "La diferencia no está en el tiempo: el pastor predica mejor cuando conoce a quienes lo escuchan." },
            ],
            apoyo: "A diferencia del predicador invitado, el pastor conoce el texto y a su gente",
            explica: "A diferencia del predicador invitado, el pastor conoce el texto y a su gente, predica semana tras semana con paciencia y sigue el lunes con el cuidado del rebaño.",
          },
          {
            caso: "Un líder de jóvenes te dice: Para predicar me basta con conocer bien el texto. No necesito conocer a los jóvenes del grupo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que se predica mejor cuando se conoce a quienes escuchan.", bien: true, explica: "El pastor predica mejor cuando conoce a quienes lo escuchan: conoce el texto y también a las personas." },
              { texto: "Que tiene razón: el texto es lo único que hace falta conocer.", explica: "El invitado conoce el texto; el pastor conoce el texto y a las personas que lo escuchan." },
              { texto: "Que conocerlos le sirve para señalarlos desde el púlpito.", explica: "Se piensa en personas concretas, no para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida." },
              { texto: "Que, si conoce a cada joven, ya no le hace falta el texto.", explica: "El pastor conoce el texto y a las personas: no deja el texto por conocer a su gente." },
            ],
            apoyo: "El pastor predica mejor cuando conoce a quienes lo escuchan",
            explica: "El pastor predica mejor cuando conoce a quienes lo escuchan. Piensa en personas concretas, no para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "No para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida",
            situacion: "Eres pastor de una iglesia pequeña y conoces bien a tu congregación. Esta semana preparas el sermón del domingo.",
            escenas: [
              {
                id: "e1",
                narra: "El martes empiezas a preparar el sermón.",
                pregunta: "¿En qué piensas mientras lo preparas?",
                opciones: [
                  { texto: "En personas concretas, como la viuda o el joven que duda.", valor: 2, explica: "Mientras preparas el sermón, piensa en personas concretas: la viuda que perdió a su esposo, el joven que duda, la familia que se está mudando.", siguiente: "e2" },
                  { texto: "En un sermón que impresione, sin pensar en los que te escuchan.", valor: 0, explica: "El pastor predica mejor cuando conoce a quienes lo escuchan.", siguiente: "e1b" },
                  { texto: "Solo en el texto; después verás a quién le puede servir.", valor: 1, explica: "Conocer el texto está bien, pero el pastor conoce el texto y a las personas que lo escuchan.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al releerlo, notas que tu sermón no le habla a nadie de tu iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo vuelves a preparar pensando en los que lo van a escuchar.", valor: 2, explica: "El pastor predica mejor cuando conoce a quienes lo escuchan.", siguiente: "e2" },
                  { texto: "Lo dejas así: lo que importa es que suene bien desde el púlpito.", valor: 0, explica: "Mientras preparas el sermón, piensa en personas concretas, para que la Palabra llegue a su vida.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El domingo, mientras predicas, ves a la viuda que perdió a su esposo hace poco.",
                pregunta: "¿Qué haces con lo que sabes de ella?",
                opciones: [
                  { texto: "Dejas que la Palabra llegue a su vida, sin señalarla.", valor: 2, explica: "Se piensa en personas concretas, no para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida." },
                  { texto: "La pones de ejemplo en el sermón, para que todos sepan lo que vive.", valor: 0, explica: "No se piensa en las personas para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el lunes. El sermón ya pasó.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Sigues con la visita, la consejería y el cuidado.", valor: 2, explica: "El invitado se va al terminar; el pastor sigue el lunes con la visita, la consejería y el cuidado." },
                  { texto: "Descansas del rebaño hasta el próximo sermón del domingo.", valor: 0, explica: "El pastor no solo predica: sigue el lunes con la visita, la consejería y el cuidado." },
                  { texto: "Llamas a la viuda solo para saber si le gustó el sermón.", valor: 1, explica: "Llamarla está bien, pero el cuidado del lunes es la visita, la consejería y el cuidado del rebaño." },
                ],
              },
            ],
          },
          {
            apoyo: "el pastor siembra, riega y espera la cosecha con paciencia",
            ref: "2 Timoteo 4:2",
            situacion: "Eres pastor. En tu iglesia hay un joven que duda de su fe y una familia que se está mudando de ciudad.",
            escenas: [
              {
                id: "e1",
                narra: "Preparas el mensaje del domingo.",
                pregunta: "¿Cómo usas lo que sabes del joven que duda?",
                opciones: [
                  { texto: "Piensas en él para que la Palabra llegue a su vida.", valor: 2, explica: "Mientras preparas el sermón, piensa en personas concretas, como el joven que duda, para que la Palabra llegue a su vida.", siguiente: "e2" },
                  { texto: "Preparas una parte para corregirlo delante de toda la iglesia.", valor: 0, explica: "No se piensa en las personas para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida.", siguiente: "e1b" },
                  { texto: "No piensas en nadie: el sermón es igual para todos.", valor: 1, explica: "No señalar a nadie está bien, pero el pastor predica mejor cuando conoce a quienes lo escuchan.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El sábado, al repasar, ves que esa parte lo va a exponer delante de todos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La quitas y oras para que la Palabra llegue a su vida.", valor: 2, explica: "Se piensa en las personas no para señalarlas desde el púlpito, sino para que la Palabra llegue a su vida.", siguiente: "e2" },
                  { texto: "La dejas, para que todos sepan que él anda dudando de su fe.", valor: 0, explica: "No se piensa en las personas para señalarlas desde el púlpito.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Al terminar el culto, la familia que se está mudando se despide de prisa.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Esa semana la visitas y la acompañas en la mudanza.", valor: 2, explica: "El invitado se va al terminar; el pastor sigue el lunes con la visita, la consejería y el cuidado." },
                  { texto: "Nada más: ya le predicaste el domingo, y con eso basta.", valor: 0, explica: "El pastor no se va al terminar: sigue el lunes con la visita, la consejería y el cuidado." },
                  { texto: "Le mandas la grabación del sermón para que la escuche.", valor: 1, explica: "Está bien, pero el pastor sigue con la visita, la consejería y el cuidado." },
                ],
              },
              {
                id: "e3",
                narra: "Pasan las semanas, y el joven sigue con sus dudas.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Sigues sembrando y regando, y esperas con paciencia.", valor: 2, explica: "El pastor siembra, riega y espera la cosecha con paciencia." },
                  { texto: "Dejas de buscarlo, porque ya no ves ningún fruto en él.", valor: 0, explica: "El pastor siembra, riega y espera la cosecha con paciencia: la paciencia también es parte de la predicación pastoral." },
                  { texto: "Sigues predicándole, pero dejas de visitarlo y de cuidarlo.", valor: 1, explica: "Seguir predicando está bien, pero el pastor también sigue con la visita y el cuidado, y espera la cosecha con paciencia." },
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
            apoyo: "sigue el lunes con el cuidado del rebaño",
            ref: "Juan 21:15-17",
            clave: {
              id: "pr-pastoral-5-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué relación hay entre lo que el pastor predica el domingo y lo que hace durante la semana?",
              ideas: [
                { id: "conoce", peso: 35, texto: "Conoce a las personas que lo escuchan y piensa en ellas al preparar el sermón.", formas: ["conoc* a (las|su|sus|quienes|cada|la|los)", "conoc* bien a", "personas concretas", "piens* en (las|ellas|ellos|su|sus|cada|la|los)", "pensa* en (las|ellas|ellos|su|sus|cada|la|los)", "su gente", "quienes lo escuchan", "las personas que (lo|le) escuchan"] },
                { id: "semana", peso: 35, texto: "Sigue el lunes con la visita, la consejería y el cuidado del rebaño.", formas: ["el lunes", "visit*", "consejeria", "cuidado", "cuid* (a|al|del|de) (su|sus|la|las|los|el)"] },
                { id: "paciencia", peso: 30, texto: "Predica semana tras semana a las mismas personas, con paciencia.", formas: ["semana tras semana", "cada semana", "pacien*", "siembra", "riega", "cosecha", "mismas personas", "todas las semanas"] },
              ],
              errores: [
                { id: "nada-que-ver", texto: "El púlpito y el cuidado van juntos: el pastor sigue el lunes con la visita, la consejería y el cuidado.", formas: ["no tiene que ver", "no se relaciona*", "no hay relacion", "ninguna relacion"], anula: "semana" },
              ],
              modelo: "El pastor conoce a las personas que lo escuchan y piensa en ellas al preparar el sermón. Predica semana tras semana con paciencia, y el lunes sigue con la visita, la consejería y el cuidado del rebaño.",
            },
          },
          {
            apoyo: "El invitado se va al terminar; el pastor sigue el lunes con la visita, la consejería y el cuidado",
            ref: "2 Timoteo 4:2",
            clave: {
              id: "pr-pastoral-5-1-a7-2",
              tipo: "corta",
              pregunta: "Un pastor dice: Mi trabajo es predicar bien el domingo; lo demás no tiene que ver con el púlpito. ¿Qué le explicas?",
              ideas: [
                { id: "conoce", peso: 35, texto: "Que el pastor conoce a las personas que lo escuchan y piensa en ellas al preparar el sermón.", formas: ["conoc* a (las|su|sus|quienes|cada|la|los)", "conoc* bien a", "personas concretas", "piens* en (las|ellas|ellos|su|sus|cada|la|los)", "pensa* en (las|ellas|ellos|su|sus|cada|la|los)", "su gente", "quienes lo escuchan", "las personas que (lo|le) escuchan"] },
                { id: "semana", peso: 35, texto: "Que sigue el lunes con la visita, la consejería y el cuidado del rebaño.", formas: ["el lunes", "visit*", "consejeria", "cuidado", "cuid* (a|al|del|de) (su|sus|la|las|los|el)"] },
                { id: "invitado", peso: 30, texto: "Que, a diferencia del invitado, que se va al terminar, el pastor alimenta a su rebaño semana tras semana.", formas: ["invitado", "no es (un|como|el) invitado", "a diferencia del invitado", "se va al terminar", "no se va", "semana tras semana", "cada semana", "pacien*", "siembra", "riega", "cosecha"] },
              ],
              modelo: "A diferencia del invitado, que se va al terminar, el pastor conoce a las personas que lo escuchan y piensa en ellas al preparar el sermón. Y el lunes sigue con la visita, la consejería y el cuidado del rebaño.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El plan de predicación del año
    "pastoral-5-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pudo decirles Pablo a los ancianos de Éfeso?", reverso: "Que no había rehuido anunciarles todo el consejo de Dios.", apoyo: "Pablo pudo decirles a los ancianos de Éfeso: «no he rehuido anunciaros todo el consejo de Dios»" },
              { frente: "Si toda la Escritura es útil, ¿qué debe predicarse con el tiempo?", reverso: "Toda la Escritura.", apoyo: "Si toda es útil, con el tiempo toda debe predicarse" },
              { frente: "¿Qué termina predicando el que predica solo lo que se le ocurre?", reverso: "Siempre lo mismo.", apoyo: "Si el pastor predica solo lo que se le ocurre cada semana, terminará predicando siempre lo mismo" },
              { frente: "¿Adónde lleva en todo un buen plan de predicación?", reverso: "A Cristo, como hizo Jesús desde Moisés y los profetas.", apoyo: "Un buen plan recorre el Antiguo y el Nuevo Testamento, y en todo lleva a Cristo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Apaga al Espíritu planificar la predicación?", reverso: "No: el Espíritu que guía en el púlpito guía también en el escritorio.", apoyo: "Planificar no apaga al Espíritu: el mismo Espíritu que guía en el púlpito guía también en el escritorio" },
              { frente: "¿Cómo investigó Lucas, y cómo escribió?", reverso: "Investigó con diligencia y escribió por orden.", apoyo: "Lucas investigó «con diligencia» y escribió «por orden»" },
              { frente: "Según la lección, ¿qué es un plan de predicación?", reverso: "Una forma de amar al rebaño con anticipación.", apoyo: "Un plan de predicación es una forma de amar al rebaño con anticipación" },
              { frente: "¿Al servicio de quién está el plan?", reverso: "Del rebaño, y no al revés.", apoyo: "El plan está al servicio del rebaño, no al revés" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre por qué el pastor anuncia todo el consejo de Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo no predicó solo sus temas favoritos: le dio a la iglesia toda la Palabra.", verdad: true, explica: "Pablo pudo decir: «no he rehuido anunciaros todo el consejo de Dios». No predicó solo sus temas favoritos.", apoyo: "No predicó solo sus temas favoritos: le dio a la iglesia toda la Palabra", ref: "Hechos 20:27" },
              { texto: "Como algunas partes de la Escritura no son útiles, se pueden dejar sin predicar.", verdad: false, explica: "«Toda la Escritura es inspirada por Dios, y útil»: si toda es útil, con el tiempo toda debe predicarse.", apoyo: "Si toda es útil, con el tiempo toda debe predicarse", ref: "2 Timoteo 3:16-17" },
              { texto: "Un buen plan recorre el Antiguo y el Nuevo Testamento, y en todo lleva a Cristo.", verdad: true, explica: "Jesús mismo, comenzando desde Moisés y siguiendo por todos los profetas, mostró lo que las Escrituras decían de él.", apoyo: "Un buen plan recorre el Antiguo y el Nuevo Testamento, y en todo lleva a Cristo", ref: "Lucas 24:27" },
            ],
          },
          {
            consigna: "Sobre el plan de predicación y toda la Palabra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Planificar la predicación apaga la obra del Espíritu.", verdad: false, explica: "Planificar no apaga al Espíritu: el mismo Espíritu que guía en el púlpito guía también en el escritorio.", apoyo: "Planificar no apaga al Espíritu: el mismo Espíritu que guía en el púlpito guía también en el escritorio", ref: "Lucas 1:3" },
              { texto: "El pastor que predica solo lo que se le ocurre cada semana termina predicando siempre lo mismo.", verdad: true, explica: "Por eso un plan lo ayuda a darle al rebaño toda la Palabra.", apoyo: "Un plan lo ayuda a darle al rebaño toda la Palabra" },
              { texto: "Para llevar a Cristo, basta con predicar el Nuevo Testamento.", verdad: false, explica: "Jesús, «comenzando desde Moisés, y siguiendo por todos los profetas», mostró lo que las Escrituras decían de él: un buen plan recorre los dos testamentos.", apoyo: "Jesús mismo, «comenzando desde Moisés, y siguiendo por todos los profetas», les mostró lo que las Escrituras decían de él", ref: "Lucas 24:27" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué pieza del plan es cada una: una serie por un libro, una serie de temas o una fecha del calendario? Lleva cada frase a su grupo.",
            grupos: ["Serie por un libro", "Serie de temas", "Fecha del calendario"],
            frases: [
              { texto: "Filipenses, en ocho mensajes", grupo: 0 },
              { texto: "El libro de Rut", grupo: 0 },
              { texto: "El libro de Jonás", grupo: 0 },
              { texto: "La familia", grupo: 1 },
              { texto: "El dinero", grupo: 1 },
              { texto: "El sufrimiento", grupo: 1 },
              { texto: "La Semana Santa", grupo: 2 },
              { texto: "Acción de Gracias", grupo: 2 },
            ],
            apoyo: "Series de temas para las necesidades de la congregación, como la familia, el dinero o el sufrimiento",
            explica: "Filipenses, Rut y Jonás son series por libros; la familia, el dinero y el sufrimiento, series de temas para las necesidades de la congregación; y la Semana Santa y Acción de Gracias, fechas del calendario.",
          },
          {
            consigna: "¿Le da equilibrio al plan del año o lo desequilibra? Lleva cada frase a su grupo.",
            grupos: ["Le da equilibrio", "Lo desequilibra"],
            frases: [
              { texto: "Predicar libros del Antiguo y del Nuevo Testamento", grupo: 0 },
              { texto: "Pasar por narraciones, poesía, profecía, evangelios y cartas", grupo: 0 },
              { texto: "Sumar una serie de temas que pide la iglesia", grupo: 0 },
              { texto: "Tener en cuenta las fechas del calendario cristiano", grupo: 0 },
              { texto: "Predicar todo el año solo cartas del Nuevo Testamento", grupo: 1, explica: "Un buen plan equilibra los testamentos y los géneros." },
              { texto: "Predicar siempre los temas favoritos del pastor", grupo: 1, explica: "Pablo no predicó solo sus temas favoritos: le dio a la iglesia toda la Palabra." },
              { texto: "Olvidar las fechas del calendario de la comunidad", grupo: 1, explica: "El plan combina las series con las fechas del calendario cristiano y de la comunidad." },
            ],
            apoyo: "Un equilibrio entre el Antiguo y el Nuevo Testamento, y entre los géneros: narraciones, poesía, profecía, evangelios y cartas",
            explica: "Un plan anual combina series por libros, de doctrina y de temas con las fechas del calendario, y equilibra los testamentos y los géneros. Predicar solo cartas, solo los temas favoritos o sin las fechas lo desequilibra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el consejo sobre cómo tener el plan escrito.",
            texto: "Escribe el plan, pero tenlo en [[lápiz]]: una [[crisis]], un avivamiento o una necesidad nueva pueden pedir que lo [[cambies]].",
            distractores: ["piedra", "rutina", "olvides"],
            errores: {
              piedra: "El plan se escribe, pero en lápiz: se puede cambiar.",
              rutina: "Lo que puede pedir un cambio es una crisis, un avivamiento o una necesidad nueva.",
              olvides: "Una crisis o una necesidad nueva pueden pedir que cambies el plan, no que lo olvides: el plan está al servicio del rebaño.",
            },
            apoyo: "Escribe el plan, pero tenlo en lápiz",
            explica: "El plan se escribe, pero se tiene en lápiz: una crisis, un avivamiento o una necesidad nueva pueden pedir que se cambie. El plan está al servicio del rebaño, no al revés.",
          },
          {
            consigna: "Completa lo que se hace con el plan cada trimestre.",
            texto: "Cada trimestre se [[revisa]] el plan con los [[líderes]], se deja [[espacio]] para lo inesperado y se ora por la dirección del Espíritu.",
            distractores: ["olvida", "vecinos", "cerrado"],
            errores: {
              olvida: "Cada trimestre se revisa el plan con los líderes.",
              vecinos: "El plan se revisa con los líderes.",
              cerrado: "El plan deja espacio para lo inesperado.",
            },
            apoyo: "Cada trimestre: revisar el plan con los líderes, dejar espacio para lo inesperado y orar por la dirección del Espíritu",
            explica: "Cada trimestre se revisa el plan con los líderes, se deja espacio para lo inesperado y se ora por la dirección del Espíritu.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena el plan de predicación del ejemplo resuelto, de enero a diciembre.",
            eventos: [
              { texto: "Una serie por un libro, como Filipenses en ocho mensajes", fecha: "De enero a marzo" },
              { texto: "La Semana Santa y la Resurrección, con un mensaje para los visitantes", fecha: "Marzo o abril" },
              { texto: "Una serie de doctrina que llega a Pentecostés", fecha: "De abril a junio" },
              { texto: "Una serie de temas y un libro del Antiguo Testamento", fecha: "Julio y agosto" },
              { texto: "Una serie por un evangelio o una carta, y Acción de Gracias", fecha: "De septiembre a noviembre" },
              { texto: "El Adviento y la Navidad", fecha: "Diciembre" },
            ],
            apoyo: "Ejemplo resuelto: un plan de predicación de un año",
            explica: "De enero a marzo, un libro como Filipenses; en marzo o abril, la Semana Santa; de abril a junio, una serie de doctrina que llega a Pentecostés; en julio y agosto, temas y un libro del Antiguo Testamento; de septiembre a noviembre, un evangelio o una carta y Acción de Gracias; y en diciembre, el Adviento y la Navidad.",
          },
          {
            consigna: "Ordena las fechas y las series del plan del año, de la primera a la última.",
            eventos: [
              { texto: "Preparar la Semana Santa mientras se predica Filipenses", fecha: "De enero a marzo" },
              { texto: "Un mensaje claro de la Resurrección para los visitantes", fecha: "Marzo o abril" },
              { texto: "El Día de las Madres y el de los Padres", fecha: "De abril a junio" },
              { texto: "Un libro del Antiguo Testamento, como Rut o Jonás", fecha: "Julio y agosto" },
              { texto: "Acción de Gracias", fecha: "De septiembre a noviembre" },
              { texto: "El Adviento", fecha: "Diciembre" },
            ],
            apoyo: "Marzo o abril: la Semana Santa y la Resurrección, con un mensaje claro para los visitantes",
            explica: "De enero a marzo se prepara la Semana Santa; en marzo o abril se predica la Resurrección para los visitantes; de abril a junio llegan el Día de las Madres y el de los Padres; en julio y agosto, un libro como Rut o Jonás; de septiembre a noviembre, Acción de Gracias; y en diciembre, el Adviento.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Se escribe con diligencia y en oración, se revisa cada trimestre y deja espacio para lo inesperado",
            ref: "Lucas 1:3",
            situacion: "Eres pastor, y en enero escribes el plan de predicación del año. Vas a empezar con una serie por Filipenses.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano te dice: Planificar es apagar al Espíritu; mejor predique lo que Dios le dé cada semana.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el Espíritu que guía en el púlpito guía en el escritorio.", valor: 2, explica: "Planificar no apaga al Espíritu: el mismo Espíritu que guía en el púlpito guía también en el escritorio.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que desde hoy predicarás lo que se te ocurra.", valor: 0, explica: "Si el pastor predica solo lo que se le ocurre cada semana, terminará predicando siempre lo mismo.", siguiente: "e1b" },
                  { texto: "Que solo planificarás la Semana Santa y la Navidad, y nada más.", valor: 1, explica: "Las fechas son parte del plan, pero un plan anual también combina series por libros, de doctrina y de temas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A los dos meses, notas que tus sermones repiten siempre lo mismo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Escribes un plan para el año, con diligencia y en oración.", valor: 2, explica: "Un plan lo ayuda a darle al rebaño toda la Palabra; se escribe con diligencia y en oración.", siguiente: "e2" },
                  { texto: "Sigues igual: lo que se te ocurre cada semana es suficiente.", valor: 0, explica: "Si el pastor predica solo lo que se le ocurre cada semana, terminará predicando siempre lo mismo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En abril revisas el plan con los líderes, y ven que la iglesia pide ayuda con el trabajo.",
                pregunta: "¿Qué haces con el plan?",
                opciones: [
                  { texto: "Sumas una serie sobre el trabajo para julio y agosto.", valor: 2, explica: "Julio y agosto pueden traer una serie de temas que pide la iglesia, como la familia o el trabajo." },
                  { texto: "No lo tocas: el plan ya está escrito y no se cambia.", valor: 0, explica: "El plan se tiene en lápiz: una necesidad nueva puede pedir que lo cambies." },
                  { texto: "Lo hablas con los líderes, pero lo dejas para el año siguiente.", valor: 1, explica: "Revisarlo con los líderes está bien, pero el plan está al servicio del rebaño: una necesidad nueva puede pedir que lo cambies." },
                ],
              },
              {
                id: "e3",
                narra: "En octubre, una tragedia sacude a la ciudad.",
                pregunta: "¿Qué haces con la serie que estás predicando?",
                opciones: [
                  { texto: "Cambias el plan: está al servicio del rebaño, no al revés.", valor: 2, explica: "Una crisis puede pedir que cambies el plan: el plan está al servicio del rebaño, no al revés." },
                  { texto: "Sigues con la serie como si nada, porque así la escribiste.", valor: 0, explica: "El plan se escribe, pero se tiene en lápiz: una crisis puede pedir que lo cambies." },
                  { texto: "Terminas la serie y, al final, hablas un poco de lo que pasó.", valor: 1, explica: "Hablar de lo que pasó está bien, pero el plan está al servicio del rebaño: una crisis puede pedir que lo cambies ya." },
                ],
              },
            ],
          },
          {
            apoyo: "Un plan anual combina series por libros, de doctrina y de temas con las fechas del calendario cristiano y de la comunidad",
            ref: "Lucas 24:27",
            situacion: "Eres pastor, y vas a armar con los líderes el plan de predicación del próximo año.",
            escenas: [
              {
                id: "e1",
                narra: "Revisan lo que predicaste este año: casi todo fue de las cartas del Nuevo Testamento.",
                pregunta: "¿Qué propones para el plan nuevo?",
                opciones: [
                  { texto: "Equilibrar los testamentos y los géneros, y llevar a Cristo.", valor: 2, explica: "Un buen plan equilibra el Antiguo y el Nuevo Testamento y los géneros, y en todo lleva a Cristo.", siguiente: "e2" },
                  { texto: "Seguir con las cartas: ahí está todo lo que la iglesia necesita.", valor: 0, explica: "Toda la Escritura es útil: con el tiempo, toda debe predicarse.", siguiente: "e1b" },
                  { texto: "Sumar un libro del Antiguo Testamento, sin mirar los géneros.", valor: 1, explica: "Va mejor, pero el plan también equilibra los géneros: narraciones, poesía, profecía, evangelios y cartas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un joven te pregunta por qué la iglesia nunca ha escuchado a los profetas desde el púlpito.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que toda la Escritura es útil, y los pondrás en el plan.", valor: 2, explica: "Si toda la Escritura es útil, con el tiempo toda debe predicarse.", siguiente: "e2" },
                  { texto: "Que los profetas son difíciles y que es mejor no predicarlos.", valor: 0, explica: "Pablo no rehuyó anunciar todo el consejo de Dios: con el tiempo, toda la Escritura debe predicarse.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ahora ponen en el plan las fechas del año.",
                pregunta: "¿Qué fechas tienen en cuenta?",
                opciones: [
                  { texto: "Las del calendario cristiano y las de la comunidad.", valor: 2, explica: "El plan combina las series con las fechas del calendario cristiano y de la comunidad: la Semana Santa, Pentecostés, la Navidad, el Día de las Madres y el de los Padres, Acción de Gracias y el aniversario de la iglesia." },
                  { texto: "Ninguna: las fechas distraen de la serie que toca predicar.", valor: 0, explica: "El plan anual combina las series con las fechas del calendario cristiano y de la comunidad." },
                  { texto: "Solo la Navidad, porque es la fecha que más gente trae.", valor: 1, explica: "La Navidad es una de las fechas, pero el plan tiene en cuenta todo el calendario cristiano y el de la comunidad." },
                ],
              },
              {
                id: "e3",
                narra: "El plan del año ya está escrito.",
                pregunta: "¿Qué acuerdan hacer con él?",
                opciones: [
                  { texto: "Revisarlo cada trimestre y dejar espacio para lo inesperado.", valor: 2, explica: "Cada trimestre se revisa el plan con los líderes, se deja espacio para lo inesperado y se ora por la dirección del Espíritu." },
                  { texto: "Cumplirlo al pie de la letra, pase lo que pase en la iglesia.", valor: 0, explica: "El plan se tiene en lápiz: una crisis, un avivamiento o una necesidad nueva pueden pedir que lo cambies." },
                  { texto: "Revisarlo solo al terminar el año, para armar el siguiente.", valor: 1, explica: "Revisarlo está bien, pero se revisa cada trimestre y deja espacio para lo inesperado." },
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
            apoyo: "Pablo anunció todo el consejo de Dios, y toda la Escritura es útil, así que el pastor no predica solo sus temas favoritos",
            ref: "Hechos 20:27",
            clave: {
              id: "pr-pastoral-5-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el pastor no predica solo sus temas favoritos?",
              ideas: [
                { id: "consejo", peso: 50, texto: "Porque Pablo anunció todo el consejo de Dios: le dio a la iglesia toda la Palabra.", formas: ["todo el consejo", "consejo de dios", "toda la palabra", "toda la biblia", "no rehuy*", "no he rehuido"] },
                { id: "util", peso: 50, texto: "Porque toda la Escritura es útil, y con el tiempo toda debe predicarse.", formas: ["toda la escritura", "es util", "son utiles", "toda (es|sea) util", "toda debe predicarse", "(predicar|predicarse|predicarla) toda", "inspirada"] },
              ],
              modelo: "Porque Pablo anunció todo el consejo de Dios y le dio a la iglesia toda la Palabra. Además, toda la Escritura es útil, y si toda es útil, con el tiempo toda debe predicarse.",
            },
          },
          {
            apoyo: "Un buen plan recorre el Antiguo y el Nuevo Testamento, y en todo lleva a Cristo",
            ref: "Lucas 24:27",
            clave: {
              id: "pr-pastoral-5-2-a7-2",
              tipo: "corta",
              pregunta: "Tu iglesia nunca ha escuchado un sermón de los profetas. ¿Por qué conviene ponerlos en el plan de predicación?",
              ideas: [
                { id: "util", peso: 50, texto: "Porque toda la Escritura es útil, y con el tiempo toda debe predicarse.", formas: ["toda la escritura", "es util", "son utiles", "toda (es|sea) util", "toda debe predicarse", "(predicar|predicarse|predicarla) toda", "inspirada", "todo el consejo"] },
                { id: "cristo", peso: 50, texto: "Porque Jesús, comenzando desde Moisés y siguiendo por todos los profetas, mostró lo que decían de él: un buen plan recorre los dos testamentos y lleva a Cristo.", formas: ["desde moises", "siguiendo por todos", "lleva* a cristo", "(apunta*|habla*) de cristo", "(apunta*|habla*) (de|a) jesus", "decian de (el|jesus|cristo)", "antiguo y nuevo", "antiguo y el nuevo", "los dos testamentos", "ambos testamentos"] },
              ],
              modelo: "Porque toda la Escritura es útil, y con el tiempo toda debe predicarse. Además, Jesús, comenzando desde Moisés y siguiendo por todos los profetas, mostró lo que decían de él: un buen plan recorre los dos testamentos y lleva a Cristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Predicar en la crisis
    "pastoral-5-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo empezaron bien los amigos de Job?", reverso: "Se sentaron con él siete días y siete noches, sin hablarle.", apoyo: "Los amigos de Job empezaron bien" },
              { frente: "¿Cuándo se equivocaron los amigos de Job?", reverso: "Cuando quisieron explicar lo que no sabían.", apoyo: "Se equivocaron después, cuando quisieron explicar lo que no sabían" },
              { frente: "¿Qué no niega el Salmo 46, y qué afirma?", reverso: "No niega la tormenta, pero afirma que Dios es nuestro amparo y fortaleza.", apoyo: "El salmo no niega la tormenta" },
              { frente: "¿Prometió Jesús una vida sin dolor?", reverso: "No: «En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo».", apoyo: "Jesús no prometió una vida sin dolor" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué enseña la Biblia a hacer en medio del dolor?", reverso: "A lamentar y a esperar.", apoyo: "La Biblia enseña a lamentar y a esperar" },
              { frente: "¿Sobre qué lloró Jeremías?", reverso: "Sobre una ciudad destruida.", apoyo: "Jeremías lloró sobre una ciudad destruida" },
              { frente: "Según Jeremías, ¿cuándo son nuevas las misericordias de Dios?", reverso: "Cada mañana: «grande es tu fidelidad».", apoyo: "Nuevas son cada mañana; grande es tu fidelidad" },
              { frente: "En la crisis, ¿qué necesita la iglesia en lugar de respuestas fáciles?", reverso: "Un Dios presente.", apoyo: "En la crisis, la iglesia no necesita respuestas fáciles, sino un Dios presente" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En medio del lamento, Jeremías recordó la misericordia de Jehová. ¿Cuándo son nuevas sus misericordias? Toca las palabras que lo dicen.",
            texto: "porque nunca decayeron sus misericordias. Nuevas son [[cada mañana]]; grande es tu fidelidad",
            apoyo: "La Biblia enseña a lamentar y a esperar",
            ref: "Lamentaciones 3:22-23",
            explica: "En medio del lamento, Jeremías recordó: «Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad».",
          },
          {
            consigna: "El salmo no niega la tormenta. ¿Qué tres cosas dice que es Dios para nosotros? Toca las palabras que lo dicen.",
            texto: "Dios es nuestro [[amparo]] y [[fortaleza]], Nuestro [[pronto auxilio]] en las tribulaciones",
            apoyo: "El salmo no niega la tormenta",
            ref: "Salmos 46:1",
            explica: "El salmo no niega la tormenta, «aunque la tierra sea removida», pero afirma: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace el pastor en una crisis.",
            texto: "En una crisis, el pastor [[acompaña]] antes de explicar, como los amigos de [[Job]] en sus primeros [[días]].",
            distractores: ["corrige", "Pedro", "años"],
            errores: {
              corrige: "En una crisis, el pastor acompaña antes de explicar.",
              Pedro: "Fueron los amigos de Job los que «se sentaron con él en tierra por siete días y siete noches».",
              "años": "Los amigos de Job empezaron bien en sus primeros días; se equivocaron después, cuando quisieron explicar lo que no sabían.",
            },
            apoyo: "En una crisis, el pastor acompaña antes de explicar, como los amigos de Job en sus primeros días",
            ref: "Job 2:13",
            explica: "Los amigos de Job empezaron bien: se sentaron con él siete días y siete noches sin hablarle. Se equivocaron después, cuando quisieron explicar lo que no sabían. El pastor acompaña antes de explicar.",
          },
          {
            consigna: "Completa cómo enseña la Biblia a vivir el dolor.",
            texto: "La Biblia enseña a [[lamentar]] y a esperar: Dios es nuestro [[amparo]], sus misericordias son nuevas cada [[mañana]] y Jesús venció al mundo.",
            distractores: ["olvidar", "enemigo", "siglo"],
            errores: {
              olvidar: "La Biblia enseña a lamentar y a esperar: el salmo no niega la tormenta.",
              enemigo: "«Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».",
              siglo: "«Nuevas son cada mañana; grande es tu fidelidad».",
            },
            apoyo: "La Biblia enseña a lamentar y a esperar: Dios es nuestro amparo, sus misericordias son nuevas cada mañana y Jesús venció al mundo",
            ref: "Lamentaciones 3:21-23",
            explica: "La Biblia enseña a lamentar y a esperar: Dios es nuestro amparo, sus misericordias son nuevas cada mañana y Jesús venció al mundo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del equipo de alabanza te dice el sábado: Pastor, murió el joven Daniel en el accidente. ¿Mañana seguimos con la serie de Filipenses, como estaba en el plan?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la serie puede esperar una semana; la iglesia herida, no.", bien: true, explica: "Cambiar el plan: la serie puede esperar una semana; la iglesia herida, no." },
              { texto: "Que sí: el plan es el plan, y cambiarlo sería dejar de confiar.", explica: "A veces una semana lo cambia todo: la serie puede esperar una semana; la iglesia herida, no." },
              { texto: "Que seguiremos la serie y al final diremos unas palabras del joven.", explica: "El domingo la gente llega con preguntas, y el pastor tiene que hablar: ese domingo se cambia el plan." },
              { texto: "Que es mejor suspender el culto hasta que pase el dolor de todos.", explica: "El domingo la gente llega con preguntas, y el pastor tiene que hablar." },
            ],
            apoyo: "Cambiar el plan: la serie puede esperar una semana; la iglesia herida, no",
            explica: "A veces una semana lo cambia todo, como cuando muere un joven de la iglesia. El domingo la gente llega con preguntas: la serie puede esperar una semana; la iglesia herida, no.",
          },
          {
            caso: "Una hermana de la iglesia te dice: Pastor, el huracán destruyó varias casas del barrio. ¿El domingo va a hablar de eso o va a seguir con lo que tenía planeado?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que cambiarás el plan, porque la iglesia herida no puede esperar.", bien: true, explica: "A veces una semana lo cambia todo: un huracán destruye casas. La serie puede esperar una semana; la iglesia herida, no." },
              { texto: "Que seguirás el plan, porque cambiarlo es dejarse llevar por la emoción.", explica: "La serie puede esperar una semana; la iglesia herida, no." },
              { texto: "Que hablarás del huracán dentro de un mes, cuando todo esté en calma.", explica: "El domingo la gente llega con preguntas, y el pastor tiene que hablar." },
              { texto: "Que no hace falta hablar de eso: cada familia vive su propio dolor.", explica: "El domingo la gente llega con preguntas, y el pastor tiene que hablar: nombra el dolor con verdad." },
            ],
            apoyo: "A veces una semana lo cambia todo: muere un joven de la iglesia, un huracán destruye casas o una tragedia sacude a la ciudad",
            explica: "Cuando un huracán destruye casas, el domingo la gente llega con preguntas, y el pastor tiene que hablar: la serie puede esperar una semana; la iglesia herida, no.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se predica el domingo después de una tragedia o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se predica", "Así no se predica"],
            frases: [
              { texto: "Nombrar el dolor con verdad, respetando a las familias", grupo: 0 },
              { texto: "Leer un salmo de lamento o Lamentaciones 3", grupo: 0 },
              { texto: "Anunciar la esperanza en Cristo, que venció a la muerte", grupo: 0 },
              { texto: "Decir dónde buscar consejo o ayuda profesional", grupo: 0 },
              { texto: "Culpar a las víctimas de lo que pasó", grupo: 1, explica: "No se explica lo que Dios no explicó: no se culpa a las víctimas." },
              { texto: "Dar razones de por qué pasó, aunque no las sepamos", grupo: 1, explica: "No se dan razones que no sabemos." },
              { texto: "Exagerar lo que pasó para conmover a la gente", grupo: 1, explica: "Se nombra el dolor con verdad, sin exagerar ni esconder lo que pasó." },
            ],
            apoyo: "No explicar lo que Dios no explicó: no culpar a las víctimas ni dar razones que no sabemos",
            explica: "El domingo después de una tragedia se nombra el dolor con verdad, se lamenta con la Biblia, se anuncia la esperanza en Cristo y se dan pasos concretos; no se culpa a las víctimas, no se dan razones que no sabemos ni se exagera lo que pasó.",
          },
          {
            consigna: "¿Ayuda a la iglesia herida o la puede herir más? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a la iglesia herida", "La puede herir más"],
            frases: [
              { texto: "Orar juntos por los afectados", grupo: 0 },
              { texto: "Organizar ayuda para las familias afectadas", grupo: 0 },
              { texto: "Seguir con las visitas durante la semana", grupo: 0 },
              { texto: "Esconder lo que pasó, como si nada", grupo: 1, explica: "Se nombra el dolor con verdad, sin exagerar ni esconder lo que pasó." },
              { texto: "Publicar en las redes un mensaje apresurado", grupo: 1, explica: "Un mensaje apresurado puede herir a las familias." },
              { texto: "Explicar por qué Dios permitió lo que pasó", grupo: 1, explica: "No se explica lo que Dios no explicó: no se dan razones que no sabemos." },
            ],
            apoyo: "Y cuida lo que publicas en las redes: un mensaje apresurado puede herir a las familias",
            explica: "Ayudan los pasos concretos: orar juntos, ayudar a los afectados y acompañar después. Pueden herir más esconder lo que pasó, publicar un mensaje apresurado o explicar lo que Dios no explicó.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El domingo después de una tragedia se cambia el plan, se nombra el dolor con verdad, se lamenta con la Escritura",
            ref: "Lamentaciones 3:21-23",
            titulo: "El domingo después del accidente",
            relato: [
              "Eres pastor. El jueves murió Daniel, un joven de la iglesia, en un accidente de carro. Su familia está deshecha, y muchos jóvenes no entienden lo que pasó.",
              "Ibas por la mitad de una serie de Filipenses. Ya decidiste cambiar el plan esta semana, y ahora preparas el mensaje del domingo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo hablarás de lo que pasó?",
                opciones: [
                  { texto: "Nombraré el dolor con verdad, sin exagerar ni esconder nada.", bien: true, explica: "Se nombra el dolor con verdad, sin exagerar ni esconder lo que pasó, y respetando a las familias." },
                  { texto: "Contaré los detalles del accidente, para que todos entiendan bien.", explica: "Se nombra el dolor con verdad, pero respetando a las familias y sin exagerar." },
                  { texto: "No lo mencionaré, para no poner más tristes a los hermanos.", explica: "Se nombra el dolor con verdad, sin esconder lo que pasó." },
                ],
                apoyo: "Nombrar el dolor con verdad, sin exagerar ni esconder lo que pasó, y respetando a las familias",
                explica: "El domingo después de una tragedia se nombra el dolor con verdad, sin exagerar ni esconder lo que pasó, y respetando a las familias.",
              },
              {
                tipo: "situacion",
                pregunta: "Un joven te pregunta: ¿Por qué Dios se llevó a Daniel? ¿Qué dirás desde el púlpito?",
                opciones: [
                  { texto: "No explicaré lo que Dios no explicó, ni culparé a nadie.", bien: true, explica: "No se explica lo que Dios no explicó: no se culpa a las víctimas ni se dan razones que no sabemos." },
                  { texto: "Que Dios se lo llevó porque algo en su vida no andaba bien.", explica: "Eso culpa a la víctima: no se explica lo que Dios no explicó." },
                  { texto: "Daré tres razones seguras de por qué Dios permitió el accidente.", explica: "No se dan razones que no sabemos: los amigos de Job se equivocaron cuando quisieron explicar lo que no sabían." },
                ],
                apoyo: "No explicar lo que Dios no explicó: no culpar a las víctimas ni dar razones que no sabemos",
                explica: "El pastor acompaña antes de explicar: no culpa a las víctimas ni da razones que no sabe.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasaje leerás para lamentar con la Biblia?",
                opciones: [
                  { texto: "Leeré un salmo de lamento o el capítulo 3 de Lamentaciones.", bien: true, explica: "Se lamenta con la Biblia: se lee un salmo de lamento o Lamentaciones 3." },
                  { texto: "Un pasaje de fiesta, para cambiarle el ánimo a todos.", explica: "La Biblia enseña a lamentar y a esperar: ese domingo se lamenta con la Escritura." },
                  { texto: "Ninguno: en un día así, mejor contar una historia que distraiga.", explica: "Se lamenta con la Biblia: se lee un salmo de lamento o Lamentaciones 3." },
                ],
                apoyo: "Lamentar con la Biblia: leer un salmo de lamento o Lamentaciones 3",
                explica: "Jeremías lloró sobre una ciudad destruida, y en medio del lamento recordó que las misericordias de Dios son nuevas cada mañana.",
              },
              {
                tipo: "explica",
                apoyo: "Anunciar la esperanza en Cristo, que sufrió con nosotros y venció a la muerte",
                clave: {
                  id: "pr-pastoral-5-3-a6-1",
                  tipo: "corta",
                  pregunta: "¿Cómo terminarás el mensaje del domingo, y qué harás después del culto?",
                  ideas: [
                    { id: "esperanza", peso: 35, texto: "Anunciaré la esperanza en Cristo, que sufrió con nosotros y venció a la muerte.", formas: ["esperanza", "vencio a la muerte", "venci* la muerte", "resucit*", "cristo (sufrio|vencio)", "sufrio con nosotros"] },
                    { id: "pasos", peso: 35, texto: "Daré pasos concretos: orar juntos, ayudar a la familia y decir dónde buscar consejo o ayuda profesional.", formas: ["orar* juntos", "orem* juntos", "oraremos", "orar* por (la|su|los|las)", "pasos concretos", "ayud* a la familia", "ayud* a (los|las) (afectados|familias|padres|hermanos)", "consejo", "ayuda profesional", "profesional*"] },
                    { id: "acompanar", peso: 30, texto: "Y acompañaré después: el mensaje no reemplaza las visitas ni el cuidado de la semana.", formas: ["acompan*", "visit*", "cuidado", "cuidar* (a|de) (la|su|los|las)", "durante la semana", "toda la semana"] },
                  ],
                  modelo: "Terminaré anunciando la esperanza en Cristo, que sufrió con nosotros y venció a la muerte. Daremos pasos concretos: oraremos juntos por la familia y diré dónde buscar ayuda profesional. Durante la semana visitaré y acompañaré a la familia de Daniel.",
                },
              },
            ],
          },
          {
            apoyo: "En una crisis grande, como un desastre o una tragedia en la comunidad, coordina con otros pastores y con las autoridades antes de convocar",
            ref: "Salmos 46:1-2",
            titulo: "El domingo después del huracán",
            relato: [
              "Eres pastor en un pueblo de la costa. El martes pasó un huracán: muchas casas quedaron destruidas, también las de varias familias de la iglesia.",
              "La ciudad entera está herida, y quieres convocar a un culto de oración para todo el pueblo. Además, el domingo te toca predicar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Antes de convocar el culto de oración para todo el pueblo, ¿qué haces?",
                opciones: [
                  { texto: "Coordino con otros pastores y con las autoridades.", bien: true, explica: "En una crisis grande, como un desastre, se coordina con otros pastores y con las autoridades antes de convocar." },
                  { texto: "Lo anuncio enseguida en las redes, con todos los detalles.", explica: "Antes de convocar se coordina con otros pastores y con las autoridades, y se cuida lo que se publica en las redes." },
                  { texto: "Lo convoco yo solo, sin hablar con nadie, para ganar tiempo.", explica: "En una crisis grande se coordina con otros pastores y con las autoridades antes de convocar." },
                ],
                apoyo: "coordina con otros pastores y con las autoridades antes de convocar",
                explica: "En una crisis grande, como un desastre o una tragedia en la comunidad, el pastor coordina con otros pastores y con las autoridades antes de convocar.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano te pide que publiques ya en las redes lo que piensas del huracán. ¿Qué haces?",
                opciones: [
                  { texto: "Cuido lo que publico: un mensaje apresurado puede herir.", bien: true, explica: "Se cuida lo que se publica en las redes: un mensaje apresurado puede herir a las familias." },
                  { texto: "Publico enseguida por qué creo que Dios mandó el huracán.", explica: "Un mensaje apresurado puede herir a las familias, y no se explica lo que Dios no explicó." },
                  { texto: "Publico fotos de las familias afectadas para que todos las vean.", explica: "Se cuida lo que se publica: un mensaje apresurado puede herir a las familias." },
                ],
                apoyo: "Y cuida lo que publicas en las redes: un mensaje apresurado puede herir a las familias",
                explica: "Lo que se publica en las redes también se cuida: un mensaje apresurado puede herir a las familias.",
              },
              {
                tipo: "situacion",
                pregunta: "El domingo, ¿qué texto ayuda a la iglesia a esperar en Dios en medio de la tormenta?",
                opciones: [
                  { texto: "El Salmo 46: Dios es nuestro amparo y nuestra fortaleza.", bien: true, explica: "El salmo no niega la tormenta, pero afirma: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones»." },
                  { texto: "Ninguno: es mejor contar historias que distraigan a la gente.", explica: "La Biblia enseña a lamentar y a esperar: ese domingo se lee la Escritura." },
                  { texto: "Uno que muestre que el huracán fue un castigo para el pueblo.", explica: "No se explica lo que Dios no explicó: no se culpa a las víctimas ni se dan razones que no sabemos." },
                ],
                apoyo: "El salmo no niega la tormenta",
                explica: "El salmo no niega la tormenta, «aunque la tierra sea removida», pero afirma que Dios es nuestro amparo y fortaleza.",
              },
              {
                tipo: "explica",
                apoyo: "Dar pasos concretos: orar juntos, ayudar a los afectados y decir dónde buscar consejo o ayuda profesional",
                clave: {
                  id: "pr-pastoral-5-3-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué pasos concretos le darás a la iglesia el domingo, además del mensaje?",
                  ideas: [
                    { id: "orar", peso: 34, texto: "Orar juntos.", formas: ["orar* juntos", "orem* juntos", "oraremos", "orar* por (la|las|los|el|su|sus)", "oracion", "orando"] },
                    { id: "ayudar", peso: 33, texto: "Ayudar a los afectados.", formas: ["ayud* a (los|las) afectad*", "ayud* a (los|las) (familias|vecinos|damnificados|hermanos)", "ayud* a quienes", "ayudar a los que", "organiz* (la|una) ayuda", "recog* (ayuda|comida|ropa|viveres|ofrendas)", "llev* (comida|ropa|agua|viveres)", "comida", "ropa", "reconstru*"] },
                    { id: "consejo", peso: 33, texto: "Decir dónde buscar consejo o ayuda profesional.", formas: ["consejo", "ayuda profesional", "profesional*", "consejer*", "donde buscar"] },
                  ],
                  modelo: "Oraremos juntos por las familias afectadas. Organizaremos la ayuda para los afectados, con comida y ropa, y diré dónde buscar consejo o ayuda profesional para los que la necesiten.",
                },
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
            apoyo: "La Biblia enseña a lamentar y a esperar",
            ref: "Lamentaciones 3:21-23",
            clave: {
              id: "pr-pastoral-5-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo enseña la Biblia a predicar en medio del dolor?",
              ideas: [
                { id: "lamento", peso: 50, texto: "Enseña a lamentar: el salmo no niega la tormenta, y Jeremías lloró sobre una ciudad destruida.", formas: ["lament*", "llor*", "no niega la tormenta", "no niega el dolor", "nombr* el dolor", "el dolor con verdad"] },
                { id: "esperanza", peso: 50, texto: "Y a esperar: Dios es nuestro amparo, sus misericordias son nuevas cada mañana y Jesús venció al mundo.", formas: ["esperanza", "esperar", "espera", "esperamos", "amparo", "cada manana", "misericordia*", "vencio al mundo", "fidelidad", "fortaleza"] },
              ],
              errores: [
                { id: "sin-dolor", texto: "Jesús no prometió una vida sin dolor: «En el mundo tendréis aflicción».", formas: ["promet* una vida sin dolor", "promet* que no (habra|tendremos|vamos)"], anula: "esperanza" },
              ],
              modelo: "La Biblia enseña a lamentar y a esperar. El salmo no niega la tormenta, y Jeremías lloró sobre su ciudad destruida; pero Dios es nuestro amparo, sus misericordias son nuevas cada mañana y Jesús venció al mundo.",
            },
          },
          {
            apoyo: "Jeremías lloró sobre una ciudad destruida, y en medio del lamento recordó",
            ref: "Lamentaciones 3:21-23",
            clave: {
              id: "pr-pastoral-5-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que un creyente con fe no debe llorar ni lamentarse por nada. ¿Qué le explicas con la Biblia?",
              ideas: [
                { id: "lamento", peso: 50, texto: "Que la Biblia enseña a lamentar: Jeremías lloró sobre una ciudad destruida, y Jesús no prometió una vida sin dolor.", formas: ["ensen* a lamentar", "lamentar y esperar", "jeremias lloro", "jeremias lamento", "lloro sobre", "no prometio una vida sin dolor", "tendreis afliccion", "aflicc*", "no niega la tormenta", "tambien llor*", "se puede llorar", "podemos llorar"] },
                { id: "esperanza", peso: 50, texto: "Y a esperar en medio del lamento: Dios es nuestro amparo y sus misericordias son nuevas cada mañana.", formas: ["esperanza", "esperar", "espera", "esperamos", "amparo", "cada manana", "misericordia*", "vencio al mundo", "fidelidad", "fortaleza"] },
              ],
              modelo: "Le explico que la Biblia enseña a lamentar y a esperar. Jeremías lloró sobre una ciudad destruida, y Jesús no prometió una vida sin dolor; pero las misericordias de Dios son nuevas cada mañana y Jesús venció al mundo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Las ocasiones especiales
    "pastoral-5-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quiénes llegan en Navidad, en Semana Santa, en una boda o en un funeral?", reverso: "Personas que casi nunca van a la iglesia.", apoyo: "En Navidad, en Semana Santa, en una boda o en un funeral llegan personas que casi nunca van a la iglesia" },
              { frente: "¿Qué anuncia la Semana Santa?", reverso: "El centro del evangelio: Cristo murió, fue sepultado y resucitó.", apoyo: "La Semana Santa anuncia el centro del evangelio" },
              { frente: "En una boda, ¿de quién habla el mensaje, además de la pareja?", reverso: "De Cristo y de la iglesia.", apoyo: "En una boda, el mensaje habla de la pareja y también de Cristo" },
              { frente: "¿Con qué consuela el mensaje en un funeral?", reverso: "Con una esperanza firme: una casa eterna en los cielos.", apoyo: "En un funeral, el mensaje consuela con una esperanza firme" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué la Navidad es una buena noticia para todos?", reverso: "Porque nos ha nacido un Salvador, que es Cristo el Señor.", apoyo: "La Navidad es una buena noticia para todos" },
              { frente: "En las ocasiones especiales, ¿en quiénes piensa el pastor?", reverso: "En los de afuera.", apoyo: "En las ocasiones especiales, el pastor piensa en los de afuera" },
              { frente: "En las bodas y en los funerales, ¿es el mensaje el centro?", reverso: "No: las personas lo son.", apoyo: "En las bodas y en los funerales el mensaje no es el centro: las personas lo son" },
              { frente: "Para alguien, ¿qué será tu mensaje de Navidad?", reverso: "El único sermón del año.", apoyo: "Para alguien, tu mensaje de Navidad será el único sermón del año" },
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
            consigna: "Une cada ocasión con lo que anuncia su mensaje.",
            pares: [
              ["La Navidad", "Al Salvador que nos ha nacido"],
              ["La Semana Santa", "La muerte y la resurrección de Cristo"],
              ["La boda", "El misterio de Cristo y la iglesia"],
              ["El funeral", "La casa eterna de Dios"],
            ],
            apoyo: "La Navidad anuncia al Salvador; la Semana Santa, la muerte y la resurrección de Cristo; la boda, el misterio de Cristo y la iglesia; y el funeral, la casa eterna de Dios",
            explica: "La Navidad anuncia al Salvador; la Semana Santa, la muerte y la resurrección de Cristo; la boda, el misterio de Cristo y la iglesia; y el funeral, la casa eterna de Dios.",
          },
          {
            consigna: "Une cada ocasión con las palabras de la Biblia que cita la lección para su mensaje.",
            pares: [
              ["La Navidad", "«os doy nuevas de gran gozo, que será para todo el pueblo»"],
              ["La Semana Santa", "«Que Cristo murió por nuestros pecados»"],
              ["La boda", "«Grande es este misterio»"],
              ["El funeral", "«una casa no hecha de manos, eterna, en los cielos»"],
            ],
            apoyo: "La Navidad es una buena noticia para todos",
            explica: "La Navidad trae «nuevas de gran gozo»; la Semana Santa anuncia que Cristo murió por nuestros pecados y resucitó; la boda habla del misterio de Cristo y la iglesia; y el funeral, de una casa eterna en los cielos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se les predica a los que vienen pocas veces o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se les predica", "Así no se les predica"],
            frases: [
              { texto: "Un texto, una idea y una invitación", grupo: 0 },
              { texto: "Explicar las palabras que solo entiende la iglesia", grupo: 0 },
              { texto: "Hablar con respeto a los que no creen", grupo: 0 },
              { texto: "Invitar a una visita, a un grupo o a una conversación", grupo: 0 },
              { texto: "Un sermón largo, con muchas ideas", grupo: 1, explica: "Para los que vienen pocas veces: ser breve y claro, un texto, una idea y una invitación." },
              { texto: "Presionar para que decidan ahí mismo", grupo: 1, explica: "El evangelio se presenta con sencillez y sin presionar." },
              { texto: "Burlarse de los que tienen otras creencias", grupo: 1, explica: "Se habla con respeto a todos, también a los que no creen o tienen otras creencias." },
            ],
            apoyo: "Ser breve y claro: un texto, una idea y una invitación",
            explica: "Para los que vienen pocas veces, el mensaje es breve y claro, explica las palabras de la iglesia, habla con respeto a todos, presenta el evangelio sin presionar e invita a un paso siguiente.",
          },
          {
            consigna: "Preparas el mensaje de Navidad, y vendrán muchos visitantes. ¿Lo dejas en tu mensaje o lo quitas? Lleva cada frase a su grupo.",
            grupos: ["Lo dejo", "Lo quito"],
            frases: [
              { texto: "El anuncio de que nos ha nacido un Salvador", grupo: 0 },
              { texto: "El evangelio, dicho con sencillez", grupo: 0 },
              { texto: "Una invitación a un grupo o a una conversación", grupo: 0 },
              { texto: "Palabras de iglesia que nadie les explica", grupo: 1, explica: "Se evitan las palabras que solo entiende la iglesia, o se explican." },
              { texto: "Una lista larga de temas, uno tras otro", grupo: 1, explica: "Se es breve y claro: un texto, una idea y una invitación." },
              { texto: "Un llamado con presión para que respondan ya", grupo: 1, explica: "El evangelio se presenta con sencillez y sin presionar." },
            ],
            apoyo: "Presentar el evangelio con sencillez y sin presionar",
            explica: "El mensaje de Navidad anuncia al Salvador, presenta el evangelio con sencillez e invita a un paso siguiente; se quitan las palabras que solo entiende la iglesia sin explicarlas, las muchas ideas y la presión.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana te dice: Para Navidad voy a traer a mi esposo, que nunca va a la iglesia. Pastor, ¿va a hablar con esas palabras difíciles que solo entendemos nosotros?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que evitarás esas palabras, o las explicarás, y serás claro.", bien: true, explica: "Para los que vienen pocas veces se evitan las palabras que solo entiende la iglesia, o se explican." },
              { texto: "Que sí: los visitantes tienen que aprender cómo habla la iglesia.", explica: "Se evitan las palabras que solo entiende la iglesia, o se explican: el pastor piensa en los de afuera." },
              { texto: "Que no hablarás del evangelio, para que su esposo no se incomode.", explica: "En Navidad se anuncia al Salvador: el evangelio se presenta con sencillez y sin presionar." },
              { texto: "Que esa noche le pedirás a su esposo que pase al frente a decidir.", explica: "El evangelio se presenta con sencillez y sin presionar, y se invita a un paso siguiente." },
            ],
            apoyo: "Evitar las palabras que solo entiende la iglesia, o explicarlas",
            explica: "Para alguien, el mensaje de Navidad será el único sermón del año: se evitan las palabras que solo entiende la iglesia, o se explican, y el evangelio se presenta con sencillez y sin presionar.",
          },
          {
            caso: "Un joven de la iglesia te dice: A la boda de mi hermana vienen muchos amigos que no creen. Pastor, ¿va a aprovechar para presionarlos a que se conviertan?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que presentarás el evangelio con sencillez y sin presionar.", bien: true, explica: "El evangelio se presenta con sencillez y sin presionar, con respeto a todos, también a los que no creen." },
              { texto: "Que sí: es la única oportunidad, y hay que presionarlos esa noche.", explica: "El evangelio se presenta con sencillez y sin presionar." },
              { texto: "Que no hablarás de Cristo, porque en una boda eso no se hace.", explica: "En una boda, el mensaje habla de la pareja y también de Cristo: «Grande es este misterio; mas yo digo esto respecto de Cristo y de la iglesia»." },
              { texto: "Que les dirás delante de todos lo equivocadas que son sus creencias.", explica: "Se habla con respeto a todos, también a los que no creen o tienen otras creencias." },
            ],
            apoyo: "Hablar con respeto a todos, también a los que no creen o tienen otras creencias",
            explica: "En una boda el mensaje habla de la pareja y también de Cristo; se habla con respeto a todos y el evangelio se presenta con sencillez y sin presionar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el mensaje de diez minutos para un funeral, como lo presenta la lección.",
            pasos: [
              "Leer un texto, como Juan 11:25-26 o 2 Corintios 5:1",
              "Reconocer el dolor y la vida de la persona",
              "Decir la idea central: en Cristo, la muerte no tiene la última palabra",
              "Anunciar la esperanza: Jesús murió y resucitó",
              "Invitar con sencillez a confiar en Cristo, sin presionar",
              "Orar por la familia",
            ],
            apoyo: "Ejemplo resuelto: un mensaje de diez minutos para un funeral",
            ref: "2 Corintios 5:1",
            explica: "El mensaje empieza con un texto, reconoce el dolor y la vida de la persona, dice la idea central, anuncia la esperanza, invita con sencillez a confiar en Cristo y termina con una oración por la familia.",
          },
          {
            consigna: "Preparas el mensaje para el funeral de doña Marta. Ordénalo como enseña la lección, del principio al final.",
            pasos: [
              "Leer 2 Corintios 5:1",
              "Contar uno o dos recuerdos que compartió su familia",
              "Decir que en Cristo la muerte no tiene la última palabra",
              "Anunciar que Jesús promete vida eterna al que cree en él",
              "Invitar sin presión a confiar en Cristo",
              "Orar por su esposo y por sus hijos",
            ],
            apoyo: "Reconocer el dolor y la vida de la persona, con uno o dos recuerdos que compartió la familia",
            ref: "2 Corintios 5:1",
            explica: "Primero el texto; después el dolor y la vida de doña Marta, con uno o dos recuerdos de su familia; luego la idea central y la esperanza; una invitación sin presionar; y al final, una oración por la familia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "En las bodas y en los funerales el mensaje no es el centro: las personas lo son",
            ref: "2 Corintios 5:1",
            titulo: "Diez minutos para despedir a don Ernesto",
            relato: [
              "Eres pastor. Murió don Ernesto, un hermano de la iglesia de 80 años, y su familia te pide el mensaje del funeral.",
              "Vendrán muchos parientes y vecinos que casi nunca van a la iglesia, y algunos no creen. Tienes diez minutos para el mensaje.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Su hija te cuenta que don Ernesto cuidaba un huerto y regalaba lo que cosechaba. ¿Qué haces con ese recuerdo?",
                opciones: [
                  { texto: "Lo uso para reconocer el dolor y la vida de don Ernesto.", bien: true, explica: "El mensaje reconoce el dolor y la vida de la persona, con uno o dos recuerdos que compartió la familia." },
                  { texto: "Lo dejo fuera: en un funeral solo se habla de la doctrina.", explica: "El mensaje reconoce el dolor y la vida de la persona, con uno o dos recuerdos de la familia." },
                  { texto: "Lo cuento largo, con todos los detalles que pueda reunir.", explica: "Son uno o dos recuerdos, en un mensaje breve: el mensaje no es el centro, las personas lo son." },
                ],
                apoyo: "Reconocer el dolor y la vida de la persona, con uno o dos recuerdos que compartió la familia",
                explica: "Con uno o dos recuerdos que compartió la familia, el mensaje reconoce el dolor y la vida de la persona.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál será la idea central de tu mensaje?",
                opciones: [
                  { texto: "Que en Cristo, la muerte no tiene la última palabra.", bien: true, explica: "Esa es la idea central del mensaje: en Cristo, la muerte no tiene la última palabra." },
                  { texto: "Que don Ernesto fue el hombre más bueno de todo el pueblo.", explica: "Se reconoce la vida de la persona, pero la idea central es que en Cristo la muerte no tiene la última palabra." },
                  { texto: "Que todos debemos vivir muchos años, como vivió él.", explica: "La idea central es la esperanza en Cristo: la muerte no tiene la última palabra." },
                ],
                apoyo: "La idea central: en Cristo, la muerte no tiene la última palabra",
                explica: "El mensaje tiene una idea: en Cristo, la muerte no tiene la última palabra.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo invitarás a los que no creen?",
                opciones: [
                  { texto: "Con una invitación sencilla a confiar en Cristo, sin presionar.", bien: true, explica: "Al final va una invitación sencilla a confiar en Cristo, sin presionar." },
                  { texto: "Les diré que, si no se deciden hoy, no volverán a ver a don Ernesto.", explica: "Eso es presionar: la invitación es sencilla y sin presionar." },
                  { texto: "No los invitaré a nada, porque en un funeral no se habla de la fe.", explica: "El mensaje anuncia la esperanza y hace una invitación sencilla a confiar en Cristo, sin presionar." },
                ],
                apoyo: "Una invitación sencilla a confiar en Cristo, sin presionar",
                explica: "El mensaje termina con una invitación sencilla a confiar en Cristo, sin presionar, y con una oración por la familia.",
              },
              {
                tipo: "explica",
                apoyo: "La esperanza: Jesús murió y resucitó, y promete vida eterna al que cree en él",
                clave: {
                  id: "pr-pastoral-5-4-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases la esperanza que anunciarás en el funeral de don Ernesto.",
                  ideas: [
                    { id: "resucito", peso: 50, texto: "Jesús murió y resucitó, y promete vida eterna al que cree en él.", formas: ["resucit*", "vida eterna", "promete vida", "el que cree", "quien cree", "los que creen", "todo el que cree"] },
                    { id: "casa", peso: 50, texto: "En Cristo, la muerte no tiene la última palabra: tenemos de Dios una casa eterna en los cielos.", formas: ["muerte no tiene la ultima palabra", "no tiene la ultima palabra", "casa eterna", "casa no hecha", "un edificio", "en los cielos", "morada", "tabernaculo"] },
                  ],
                  modelo: "En Cristo, la muerte no tiene la última palabra. Jesús murió y resucitó, y promete vida eterna al que cree en él; por eso tenemos de Dios una casa eterna en los cielos.",
                },
              },
            ],
          },
          {
            apoyo: "Prepáralo bien, pero que sea breve, y deja que el amor por la familia se note más que tu elocuencia",
            ref: "Juan 11:25-26",
            titulo: "Unas palabras para la familia de doña Rosa",
            relato: [
              "Murió de repente doña Rosa, la vecina de una familia de tu iglesia. Su familia no va a ninguna iglesia, pero te pide unas palabras en el funeral.",
              "Varios de sus hijos tienen otras creencias, y la sala estará llena. Tienes dos días para preparar el mensaje.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo será tu mensaje?",
                opciones: [
                  { texto: "Bien preparado y breve: un texto, una idea y una invitación.", bien: true, explica: "Para los que vienen pocas veces: ser breve y claro, un texto, una idea y una invitación." },
                  { texto: "Largo, para aprovechar a todos los que casi nunca escuchan.", explica: "Se prepara bien, pero que sea breve: un texto, una idea y una invitación." },
                  { texto: "Improvisado en el momento, porque en un funeral nadie escucha.", explica: "Prepáralo bien, pero que sea breve." },
                ],
                apoyo: "Ser breve y claro: un texto, una idea y una invitación",
                explica: "En los funerales el mensaje se prepara bien, pero es breve: un texto, una idea y una invitación.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo hablarás a los hijos que tienen otras creencias?",
                opciones: [
                  { texto: "Con respeto, como a todos los que están en la sala.", bien: true, explica: "Se habla con respeto a todos, también a los que no creen o tienen otras creencias." },
                  { texto: "Les mostraré delante de todos por qué están equivocados.", explica: "Se habla con respeto a todos, también a los que tienen otras creencias." },
                  { texto: "No los miraré en todo el mensaje, para que no se incomoden.", explica: "Se habla con respeto a todos: el amor por la familia se nota más que la elocuencia." },
                ],
                apoyo: "Hablar con respeto a todos, también a los que no creen o tienen otras creencias",
                explica: "En el funeral se habla con respeto a todos, también a los que no creen o tienen otras creencias.",
              },
              {
                tipo: "situacion",
                pregunta: "Al terminar, ¿qué les ofreces a los hijos de doña Rosa?",
                opciones: [
                  { texto: "Un paso siguiente, como una visita o una conversación.", bien: true, explica: "Se invita a un paso siguiente: una visita, un grupo o una conversación." },
                  { texto: "Una hoja para que se hagan miembros de la iglesia ese mismo día.", explica: "Se invita a un paso siguiente, sin presionar: una visita, un grupo o una conversación." },
                  { texto: "Nada más: con el mensaje del funeral ya quedó todo dicho.", explica: "Después del mensaje se invita a un paso siguiente: una visita, un grupo o una conversación." },
                ],
                apoyo: "Invitar a un paso siguiente: una visita, un grupo o una conversación",
                explica: "Para los que vienen pocas veces, el mensaje invita a un paso siguiente: una visita, un grupo o una conversación.",
              },
              {
                tipo: "explica",
                apoyo: "En las bodas y en los funerales el mensaje no es el centro: las personas lo son",
                clave: {
                  id: "pr-pastoral-5-4-a6-2",
                  tipo: "corta",
                  pregunta: "En el funeral de doña Rosa, ¿qué debe notarse más en tu mensaje, y por qué?",
                  ideas: [
                    { id: "amor", peso: 50, texto: "El amor por la familia, más que la elocuencia del pastor.", formas: ["amor por la familia", "amor a la familia", "amor por (ellos|ellas|los|sus)", "el amor", "carino por la familia", "carino a la familia", "carino por (ellos|ellas|los|sus)", "amor"] },
                    { id: "personas", peso: 50, texto: "Porque en los funerales el mensaje no es el centro: las personas lo son.", formas: ["las personas lo son", "las personas son el centro", "el centro son las personas", "no es el centro", "la familia es (el|lo) (centro|importante|mas)", "lo importante (es|son) (la|las)"] },
                  ],
                  modelo: "Debe notarse más el amor por la familia que mi elocuencia, porque en un funeral el mensaje no es el centro: las personas lo son.",
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
            apoyo: "El mensaje es breve y claro: un texto, una idea, el evangelio con sencillez y una invitación sin presionar",
            ref: "Colosenses 4:5-6",
            clave: {
              id: "pr-pastoral-5-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo predicas con claridad a los visitantes que casi nunca escuchan el evangelio?",
              ideas: [
                { id: "breve", peso: 34, texto: "Con un mensaje breve y claro: un texto, una idea y una invitación.", formas: ["breve", "corto", "un texto", "una idea", "una sola idea", "pocas ideas"] },
                { id: "palabras", peso: 33, texto: "Evito las palabras que solo entiende la iglesia, o las explico.", formas: ["evit* (las|esas) palabras", "explic* (las|esas|cada|sus) palabras", "palabras (sencillas|claras|faciles)", "sin palabras (de|que|dificiles)", "lenguaje (sencillo|claro)"] },
                { id: "sencillez", peso: 33, texto: "Presento el evangelio con sencillez y sin presionar, e invito a un paso siguiente.", formas: ["sencill*", "sin presion*", "no presion*", "paso siguiente", "siguiente paso", "una visita", "una conversacion"] },
              ],
              modelo: "Les predico un mensaje breve y claro: un texto, una idea y una invitación. Evito las palabras que solo entiende la iglesia, o las explico, y presento el evangelio con sencillez y sin presionar.",
            },
          },
          {
            apoyo: "La Semana Santa anuncia el centro del evangelio",
            ref: "1 Corintios 15:3-4",
            clave: {
              id: "pr-pastoral-5-4-a7-2",
              tipo: "corta",
              pregunta: "Para Semana Santa llegarán muchos visitantes. ¿Qué anunciarás, y cómo lo dirás para que lo entiendan?",
              ideas: [
                { id: "centro", peso: 50, texto: "El centro del evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", formas: ["murio por (nuestros|los|mis|sus) pecados", "resucit*", "centro del evangelio", "sepultado", "murio y resucito", "tercer dia"] },
                { id: "claro", peso: 50, texto: "Con un mensaje breve y claro, sin palabras que solo entiende la iglesia, y una invitación sin presionar.", formas: ["breve", "corto", "sencill*", "sin presion*", "no presion*", "evit* (las|esas) palabras", "explic* (las|esas|cada|sus) palabras", "palabras (sencillas|claras|faciles)", "sin palabras (de|que|dificiles)", "un texto", "una idea"] },
              ],
              modelo: "Anunciaré el centro del evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día. Lo diré con un mensaje breve y claro, sin palabras que solo entiende la iglesia, y con una invitación sin presionar.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Corregir y consolar desde el púlpito
    "pastoral-5-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué manda Dios a sus siervos en Isaías 40?", reverso: "«Consolaos, consolaos, pueblo mío»: consolar también es predicar.", apoyo: "Consolar también es predicar" },
              { frente: "¿Cuál es la regla para corregir y consolar?", reverso: "Seguir la verdad en amor.", apoyo: "La regla es «siguiendo la verdad en amor»" },
              { frente: "¿Qué hace la verdad sin amor?", reverso: "Hiere.", apoyo: "La verdad sin amor hiere" },
              { frente: "¿Qué hace el amor sin verdad?", reverso: "Engaña.", apoyo: "el amor sin verdad engaña" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué corrigió Pablo con lágrimas a los corintios?", reverso: "Para que supieran cuán grande era su amor.", apoyo: "Pablo corrigió con lágrimas para mostrar su amor" },
              { frente: "Si no busca agradar a todos, ¿qué busca el pastor?", reverso: "Ser fiel.", apoyo: "El pastor no busca agradar a todos, sino ser fiel" },
              { frente: "¿Con qué se corrige desde el púlpito, y con qué no?", reverso: "Con lágrimas, no con piedras.", apoyo: "Desde el púlpito se corrige con lágrimas, no con piedras" },
              { frente: "¿De qué depende que el mismo sermón sane o hiera?", reverso: "De si el pastor dice la verdad con amor o usa el púlpito para desahogarse.", apoyo: "Depende de si el pastor dice la verdad con amor o usa el púlpito para desahogarse" },
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
            consigna: "Completa la regla para corregir y consolar.",
            texto: "Dios manda [[consolar]] a su pueblo, y la regla es la verdad en amor: la verdad sin amor [[hiere]] y el amor sin verdad [[engaña]].",
            distractores: ["castigar", "sana", "salva"],
            errores: {
              castigar: "Dios manda: «Consolaos, consolaos, pueblo mío, dice vuestro Dios».",
              sana: "La verdad sin amor hiere.",
              salva: "El amor sin verdad engaña.",
            },
            apoyo: "La verdad sin amor hiere; el amor sin verdad engaña",
            ref: "Efesios 4:15",
            explica: "Dios manda consolar a su pueblo, y la regla es «siguiendo la verdad en amor»: la verdad sin amor hiere; el amor sin verdad engaña.",
          },
          {
            consigna: "Completa cómo corrigió Pablo a los corintios.",
            texto: "Pablo corrigió a los corintios con [[firmeza]], pero con muchas [[lágrimas]], para mostrar su [[amor]].",
            distractores: ["burla", "risas", "poder"],
            errores: {
              burla: "Pablo corrigió a los corintios con firmeza.",
              risas: "Pablo corrigió «con muchas lágrimas».",
              poder: "Pablo corrigió con lágrimas para mostrar su amor: «para que supieseis cuán grande es el amor que os tengo».",
            },
            apoyo: "Pablo corrigió a los corintios con firmeza",
            ref: "2 Corintios 2:4",
            explica: "Pablo corrigió a los corintios con firmeza, pero «con muchas lágrimas», para que supieran cuán grande era su amor.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es exhortación bíblica o es un ataque desde el púlpito? Lleva cada frase a su grupo.",
            grupos: ["Exhortación bíblica", "Ataque desde el púlpito"],
            frases: [
              { texto: "Nace del texto bíblico", grupo: 0 },
              { texto: "Habla del pecado", grupo: 0 },
              { texto: "Ofrece la gracia y un camino de vuelta", grupo: 0 },
              { texto: "Incluye al predicador", grupo: 0 },
              { texto: "Nace del enojo del predicador", grupo: 1 },
              { texto: "Señala a una persona delante de todos", grupo: 1 },
              { texto: "Solo deja culpa", grupo: 1 },
              { texto: "Habla siempre de los otros", grupo: 1 },
            ],
            apoyo: "La exhortación nace del texto bíblico; el ataque nace del enojo del predicador",
            explica: "La exhortación nace del texto, habla del pecado, ofrece la gracia y un camino de vuelta e incluye al predicador; el ataque nace del enojo, señala a una persona delante de todos, solo deja culpa y habla siempre de los otros.",
          },
          {
            consigna: "¿Qué muestra cada ejemplo: una exhortación bíblica o un ataque desde el púlpito? Lleva cada frase a su grupo.",
            grupos: ["Exhortación bíblica", "Ataque desde el púlpito"],
            frases: [
              { texto: "Predica sobre la mentira porque el pasaje de la serie habla de eso", grupo: 0 },
              { texto: "Dice: Yo también necesito obedecer este texto", grupo: 0 },
              { texto: "Termina mostrando el perdón de Dios y cómo volver a él", grupo: 0 },
              { texto: "Predica sobre el chisme porque está dolido con un hermano", grupo: 1, explica: "El ataque nace del enojo del predicador; si estás herido con alguien, habla con esa persona en privado." },
              { texto: "Mira a un hermano y dice: Algunos aquí son unos mentirosos", grupo: 1, explica: "El ataque señala a una persona delante de todos." },
              { texto: "Habla del pecado de los demás, pero nunca del suyo", grupo: 1, explica: "La exhortación incluye al predicador; el ataque habla siempre de los otros." },
              { texto: "Termina con un regaño, sin ofrecer un camino de vuelta", grupo: 1, explica: "La exhortación ofrece la gracia y un camino de vuelta; el ataque solo deja culpa." },
            ],
            apoyo: "La exhortación nace del texto, habla del pecado sin señalar a nadie, ofrece la gracia e incluye al predicador",
            explica: "Es exhortación la que nace del pasaje, incluye al predicador y ofrece el perdón y un camino de vuelta; es ataque la que nace del enojo, señala a alguien, habla solo de los otros o deja solo culpa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano te dice: Pastor, Ramón me ofendió delante de todos. El domingo predique sobre la ofensa, para que todos sepan quién es él.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los asuntos personales se tratan en privado, no en el púlpito.", bien: true, explica: "Los asuntos personales se tratan en privado, como enseña Mateo 18:15, y no desde el púlpito." },
              { texto: "Que sí: así Ramón aprenderá la lección delante de toda la iglesia.", explica: "La exhortación habla del pecado; el ataque señala a una persona delante de todos." },
              { texto: "Que predicarás de eso sin decir su nombre, pero mirándolo a él.", explica: "Aunque no diga su nombre, sigue siendo señalar a una persona: los asuntos personales se tratan en privado." },
              { texto: "Que no lo hablarás con nadie, porque las ofensas es mejor callarlas.", explica: "Los asuntos personales no se callan: se tratan en privado, como enseña Mateo 18:15." },
            ],
            apoyo: "Los asuntos personales se tratan en privado, como enseña Mateo 18:15, y no desde el púlpito",
            ref: "Mateo 18:15",
            explica: "Los asuntos personales se tratan en privado, como enseña Mateo 18:15, y no desde el púlpito: la exhortación habla del pecado, pero no señala a una persona delante de todos.",
          },
          {
            caso: "Un compañero de ministerio te dice: Estoy muy dolido con un hermano de mi iglesia, y el domingo le voy a predicar un mensaje fuerte para que aprenda.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que hable antes en privado con ese hermano, y no desde el púlpito.", bien: true, explica: "Si estás herido con alguien, habla con esa persona en privado antes de subir al púlpito." },
              { texto: "Que lo predique, pero sin decir su nombre, para que nadie se dé cuenta.", explica: "Antes de predicar un mensaje fuerte, pregúntate: ¿lo digo porque el texto lo dice, o porque estoy dolido?" },
              { texto: "Que predique fuerte: así el hermano sentirá lo mismo que él siente.", explica: "Eso nace del enojo del predicador: la exhortación nace del texto bíblico." },
              { texto: "Que lo deje pasar y nunca hable con ese hermano de lo que pasó.", explica: "Si estás herido con alguien, habla con esa persona en privado." },
            ],
            apoyo: "Si estás herido con alguien, habla con esa persona en privado antes de subir al púlpito",
            explica: "Antes de predicar un mensaje fuerte, hay que preguntarse: ¿lo digo porque el texto lo dice, o porque estoy dolido? Si estás herido con alguien, habla con esa persona en privado antes de subir al púlpito.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "No todos necesitan lo mismo. ¿Qué pide Pablo hacer con cada uno? Toca las palabras que lo dicen.",
            texto: "que [[amonestéis]] a los ociosos, que [[alentéis]] a los de poco ánimo, que [[sostengáis]] a los débiles",
            apoyo: "No todos necesitan lo mismo",
            ref: "1 Tesalonicenses 5:14",
            explica: "Pablo pide «que amonestéis a los ociosos, que alentéis a los de poco ánimo, que sostengáis a los débiles, que seáis pacientes para con todos»: cada uno recibe la palabra que necesita.",
          },
          {
            consigna: "Pablo pide ser paciente con todos. ¿A qué grupos nombra para darles una palabra distinta? Toca las palabras que lo dicen.",
            texto: "que amonestéis a los [[ociosos]], que alentéis a los de [[poco ánimo]], que sostengáis a los [[débiles]], que seáis pacientes para con todos",
            apoyo: "El pastor conoce a su rebaño y le da a cada uno la palabra que necesita",
            ref: "1 Tesalonicenses 5:14",
            explica: "Pablo nombra a los ociosos, a los de poco ánimo y a los débiles: el pastor conoce a su rebaño y le da a cada uno la palabra que necesita.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Dios manda consolar a su pueblo y también corregirlo, y Pablo pide amonestar a los ociosos, alentar a los de poco ánimo y sostener a los débiles",
            ref: "1 Tesalonicenses 5:14",
            situacion: "Eres pastor, y esta semana preparas el sermón del domingo. Conoces bien a tu iglesia y lo que vive cada uno.",
            escenas: [
              {
                id: "e1",
                narra: "Varios jóvenes dejaron de servir y pasan los cultos sin hacer nada.",
                pregunta: "¿Qué palabra necesitan?",
                opciones: [
                  { texto: "Que los amonestes con amor, como pide Pablo con los ociosos.", valor: 2, explica: "Pablo pide «que amonestéis a los ociosos»; y la regla es la verdad en amor.", siguiente: "e2" },
                  { texto: "Ninguna: mejor no decirles nada, para que no se vayan de la iglesia.", valor: 0, explica: "El amor sin verdad engaña: Pablo pide amonestar a los ociosos.", siguiente: "e1b" },
                  { texto: "Solo ánimo, sin decirles nada de que dejaron de servir en la iglesia.", valor: 1, explica: "El ánimo ayuda, pero a los ociosos Pablo pide amonestarlos, con la verdad en amor.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un mes, y los jóvenes siguen igual.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Los amonestas en privado, con la verdad en amor.", valor: 2, explica: "A los ociosos se los amonesta, siguiendo la verdad en amor.", siguiente: "e2" },
                  { texto: "Los avergüenzas delante de toda la iglesia, para que reaccionen.", valor: 0, explica: "El ataque señala a una persona delante de todos y solo deja culpa.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una familia de la iglesia perdió el trabajo y está desanimada.",
                pregunta: "¿Qué palabra necesita?",
                opciones: [
                  { texto: "Aliento, porque Pablo pide alentar a los de poco ánimo.", valor: 2, explica: "Pablo pide «que alentéis a los de poco ánimo»." },
                  { texto: "Una reprensión, porque le falta fe para salir adelante.", valor: 0, explica: "No todos necesitan lo mismo: a los de poco ánimo se los alienta." },
                  { texto: "Ánimo, pero solo con un mensaje general para toda la iglesia.", valor: 1, explica: "Alentar está bien, pero el pastor conoce a su rebaño y le da a cada uno la palabra que necesita." },
                ],
              },
              {
                id: "e3",
                narra: "Hay creyentes nuevos que caen y se levantan, y les cuesta seguir.",
                pregunta: "¿Qué palabra necesitan?",
                opciones: [
                  { texto: "Sostén y paciencia, como pide Pablo con los débiles.", valor: 2, explica: "Pablo pide «que sostengáis a los débiles, que seáis pacientes para con todos»." },
                  { texto: "Una amonestación fuerte, para que dejen de fallar ya.", valor: 0, explica: "A los débiles no se los amonesta: se los sostiene, con paciencia." },
                  { texto: "Paciencia, pero dejándolos solos para que aprendan a seguir.", valor: 1, explica: "La paciencia es para todos, pero a los débiles Pablo pide sostenerlos." },
                ],
              },
            ],
          },
          {
            apoyo: "Ajustar el mensaje a la necesidad: los ociosos, los de poco ánimo y los débiles",
            ref: "1 Tesalonicenses 5:14",
            situacion: "Eres pastor. Esta semana visitaste a tres hermanos de tu iglesia antes de preparar el sermón: Tomás, Lucía y Andrés.",
            escenas: [
              {
                id: "e1",
                narra: "Tomás pasa los días sin hacer nada y dejó de lado todas sus responsabilidades.",
                pregunta: "¿Qué palabra necesita Tomás?",
                opciones: [
                  { texto: "Que lo amonestes con amor, como pide Pablo.", valor: 2, explica: "Pablo pide «que amonestéis a los ociosos», siguiendo la verdad en amor.", siguiente: "e2" },
                  { texto: "Que lo dejes así, para no incomodarlo ni perderlo.", valor: 0, explica: "El amor sin verdad engaña: a los ociosos se los amonesta.", siguiente: "e1b" },
                  { texto: "Que lo alientes, sin hablarle nada de su descuido.", valor: 1, explica: "El ánimo ayuda, pero a los ociosos Pablo pide amonestarlos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan dos semanas, y Tomás sigue igual.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le hablas en privado, con la verdad en amor.", valor: 2, explica: "La regla es «siguiendo la verdad en amor».", siguiente: "e2" },
                  { texto: "Lo nombras desde el púlpito como un mal ejemplo.", valor: 0, explica: "El ataque señala a una persona delante de todos: los asuntos personales se tratan en privado.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Lucía perdió a su mamá hace poco y está sin fuerzas.",
                pregunta: "¿Qué palabra necesita Lucía?",
                opciones: [
                  { texto: "Que la alientes y la consueles, como pide Pablo.", valor: 2, explica: "Pablo pide «que alentéis a los de poco ánimo», y Dios manda consolar a su pueblo." },
                  { texto: "Que la reprendas por estar triste tanto tiempo.", valor: 0, explica: "A los de poco ánimo no se los reprende: se los alienta. Consolar también es predicar." },
                  { texto: "Que la amonestes con suavidad, para que reaccione.", valor: 1, explica: "La suavidad está bien, pero a los de poco ánimo Pablo pide alentarlos." },
                ],
              },
              {
                id: "e3",
                narra: "Andrés es nuevo en la fe y cae una y otra vez.",
                pregunta: "¿Qué palabra necesita Andrés?",
                opciones: [
                  { texto: "Que lo sostengas, y que seas paciente con él.", valor: 2, explica: "Pablo pide «que sostengáis a los débiles, que seáis pacientes para con todos»." },
                  { texto: "Que lo expongas ante todos, para que escarmiente.", valor: 0, explica: "El ataque señala a una persona delante de todos y solo deja culpa." },
                  { texto: "Que lo sostengas, pero solo si deja de caer pronto.", valor: 1, explica: "Sostenerlo está bien, pero con paciencia: «que seáis pacientes para con todos»." },
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
            apoyo: "La regla es la verdad en amor: Pablo corrigió con lágrimas para mostrar su amor, y aceptó que la verdad a veces molesta",
            ref: "Efesios 4:15",
            clave: {
              id: "pr-pastoral-5-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué regla sigue el pastor cuando corrige desde el púlpito, y qué ejemplo dio Pablo?",
              ideas: [
                { id: "regla", peso: 50, texto: "La verdad en amor: la verdad sin amor hiere, y el amor sin verdad engaña.", formas: ["verdad en amor", "verdad con amor", "sin amor hiere", "hier*", "engan*"] },
                { id: "lagrimas", peso: 50, texto: "Pablo corrigió con firmeza, pero con lágrimas, para mostrar su amor.", formas: ["lagrima*", "llor*", "mostrar su amor", "cuan grande", "con firmeza"] },
              ],
              modelo: "La regla es seguir la verdad en amor, porque la verdad sin amor hiere y el amor sin verdad engaña. Pablo corrigió a los corintios con firmeza, pero con muchas lágrimas, para mostrar cuán grande era su amor.",
            },
          },
          {
            apoyo: "Dios manda consolar a su pueblo y también corregirlo",
            ref: "Isaías 40:1-2",
            clave: {
              id: "pr-pastoral-5-5-a7-2",
              tipo: "corta",
              pregunta: "Un pastor dice: Desde el púlpito solo hay que corregir; consolar es cosa de las visitas. ¿Qué le respondes?",
              ideas: [
                { id: "consuela", peso: 50, texto: "Que Dios manda consolar a su pueblo: consolar también es predicar.", formas: ["consolar tambien es predicar", "tambien es predicar", "manda consolar", "consolaos", "hablad al corazon", "consol* a su pueblo", "consol* al pueblo"] },
                { id: "regla", peso: 50, texto: "Que la regla es la verdad en amor: Pablo corrigió, pero con lágrimas, para mostrar su amor.", formas: ["verdad en amor", "verdad con amor", "sin amor hiere", "lagrima*", "mostrar su amor", "cuan grande"] },
              ],
              modelo: "Le respondo que Dios manda consolar a su pueblo: «Consolaos, consolaos, pueblo mío». Consolar también es predicar. Y cuando corrige, la regla es la verdad en amor, como Pablo, que corrigió con lágrimas para mostrar su amor.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. El predicador que sigue creciendo
    "pastoral-5-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Llega alguien a ser un predicador terminado?", reverso: "No: los mejores siguen leyendo, escuchando consejos y orando.", apoyo: "Nadie llega a ser un predicador terminado" },
              { frente: "Apolos era elocuente, pero le faltaba algo. ¿Qué hicieron con él?", reverso: "Lo tomaron aparte y le expusieron más exactamente el camino de Dios.", apoyo: "Apolos era «varón elocuente, poderoso en las Escrituras», pero le faltaba algo" },
              { frente: "¿Qué hizo Apolos con la corrección?", reverso: "La aceptó y siguió creciendo.", apoyo: "Apolos aceptó la corrección y siguió creciendo" },
              { frente: "¿Qué cuida el predicador, según Pablo a Timoteo?", reverso: "Su vida y su enseñanza.", apoyo: "El predicador cuida su vida y su enseñanza" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde se renueva el púlpito?", reverso: "En el escritorio, en la oración y en la humildad de aprender.", apoyo: "El púlpito se renueva en el escritorio, en la oración y en la humildad de aprender" },
              { frente: "Según Proverbios 15:22, ¿qué hace un predicador sabio?", reverso: "Pide consejo.", apoyo: "Un predicador sabio pide consejo" },
              { frente: "¿Cuándo conviene empezar el sermón del domingo?", reverso: "El lunes o el martes, para que madure en el corazón.", apoyo: "Un buen hábito es empezar el sermón del domingo el lunes o el martes" },
              { frente: "¿Dónde se ve el fruto del que predica?", reverso: "En la vida: en el resultado de su conducta.", apoyo: "Y el fruto se ve en la vida" },
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
            consigna: "Completa por qué el predicador nunca deja de aprender.",
            texto: "Nadie llega a ser un predicador [[terminado]]. Los mejores siguen [[leyendo]], escuchando [[consejos]] y orando cada semana.",
            distractores: ["humilde", "durmiendo", "aplausos"],
            errores: {
              humilde: "Nadie llega a ser un predicador terminado: el púlpito se renueva en la humildad de aprender.",
              durmiendo: "Los mejores siguen leyendo, escuchando consejos y orando cada semana.",
              aplausos: "Los mejores siguen escuchando consejos: un predicador sabio pide consejo.",
            },
            apoyo: "Nadie llega a ser un predicador terminado",
            explica: "Nadie llega a ser un predicador terminado: los mejores siguen leyendo, escuchando consejos y orando cada semana.",
          },
          {
            consigna: "Completa lo que pasó con Apolos.",
            texto: "Apolos era un varón [[elocuente]], pero aceptó que lo tomaran [[aparte]] para exponerle mejor el camino de Dios, y siguió [[creciendo]].",
            distractores: ["callado", "preso", "cayendo"],
            errores: {
              callado: "Apolos era «varón elocuente, poderoso en las Escrituras».",
              preso: "«le tomaron aparte y le expusieron más exactamente el camino de Dios».",
              cayendo: "Apolos aceptó la corrección y siguió creciendo.",
            },
            apoyo: "Apolos aceptó la corrección y siguió creciendo",
            ref: "Hechos 18:24-26",
            explica: "Apolos era elocuente y poderoso en las Escrituras, pero le faltaba algo: lo tomaron aparte, le expusieron más exactamente el camino de Dios, y él aceptó la corrección y siguió creciendo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo pedir retroalimentación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Conviene elegir a dos o tres personas de confianza para que opinen de tus mensajes.", verdad: true, explica: "Se eligen dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos.", apoyo: "Elegir a dos o tres personas de confianza" },
              { texto: "Lo mejor es tratar de mejorarlo todo a la vez, en una sola semana.", verdad: false, explica: "Se elige una sola cosa para mejorar en el mes siguiente, como la claridad, la aplicación o el tiempo.", apoyo: "Elegir una sola cosa para mejorar en el mes siguiente, como la claridad, la aplicación o el tiempo" },
              { texto: "Un predicador sabio pide consejo.", verdad: true, explica: "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman».", apoyo: "Un predicador sabio pide consejo", ref: "Proverbios 15:22" },
            ],
          },
          {
            consigna: "Sobre recibir consejos y corrección: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando un consejo duele, es mejor no volver a pedir consejos.", verdad: false, explica: "Se agradece cada consejo, aunque duela, y se ora por lo aprendido: un predicador sabio pide consejo.", apoyo: "Agradecer cada consejo, aunque duela, y orar por lo aprendido" },
              { texto: "Por ser elocuente, Apolos ya sabía todo lo que necesitaba.", verdad: false, explica: "Apolos era «varón elocuente, poderoso en las Escrituras», pero le faltaba algo; aceptó la corrección y siguió creciendo.", apoyo: "Apolos aceptó la corrección y siguió creciendo", ref: "Hechos 18:24-26" },
              { texto: "El predicador puede grabar su mensaje y escucharlo con una rúbrica sencilla.", verdad: true, explica: "Grabar el mensaje y escucharlo o verlo uno mismo, con una rúbrica sencilla, es parte de pedir retroalimentación.", apoyo: "Grabar el mensaje y escucharlo o verlo uno mismo, con una rúbrica sencilla" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Pide retroalimentación a personas de confianza, escucha sus propios mensajes con una rúbrica y mejora una cosa a la vez",
            ref: "Proverbios 15:22",
            titulo: "Tres personas y tres preguntas",
            relato: [
              "Eres pastor desde hace diez años, y sientes que tus sermones se quedaron estancados.",
              "Decides pedir retroalimentación sobre tu predicación durante el próximo mes.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quiénes eliges para que te den su opinión?",
                opciones: [
                  { texto: "A un anciano, a alguien joven y a alguien sin cargos.", bien: true, explica: "Se eligen dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos." },
                  { texto: "Solo a los que siempre te felicitan después de cada culto.", explica: "Se eligen dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos." },
                  { texto: "A toda la iglesia, con una encuesta abierta en las redes.", explica: "Se eligen dos o tres personas de confianza." },
                ],
                apoyo: "Elegir a dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos",
                explica: "Para pedir retroalimentación se eligen dos o tres personas de confianza: un anciano, alguien joven y alguien que no tenga cargos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué les pides que respondan después de cada mensaje?",
                opciones: [
                  { texto: "¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?", bien: true, explica: "Se les pide que respondan unas preguntas sencillas: ¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?" },
                  { texto: "¿Te gustó mi voz? ¿Fue mejor que el sermón del otro pastor?", explica: "Las preguntas son sencillas y miran el mensaje: ¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?" },
                  { texto: "Nada concreto: que digan lo que quieran, cuando ellos quieran.", explica: "Se les pide que respondan unas preguntas sencillas." },
                ],
                apoyo: "Pedirles que respondan unas preguntas sencillas: ¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?",
                explica: "Tres preguntas sencillas ayudan a saber cómo se recibe el mensaje: ¿Qué entendiste? ¿Qué te pide Dios? ¿Qué no quedó claro?",
              },
              {
                tipo: "situacion",
                pregunta: "Además de lo que te digan, ¿qué haces tú?",
                opciones: [
                  { texto: "Grabo el mensaje y lo escucho con una rúbrica sencilla.", bien: true, explica: "Se graba el mensaje y uno mismo lo escucha o lo ve, con una rúbrica sencilla." },
                  { texto: "Nada más: con la opinión de los demás ya es suficiente.", explica: "Además, se graba el mensaje y uno mismo lo escucha o lo ve, con una rúbrica sencilla." },
                  { texto: "Escucho solo los mensajes que todos dicen que fueron buenos.", explica: "Se graba el mensaje y uno mismo lo escucha con una rúbrica sencilla, para ver qué mejorar." },
                ],
                apoyo: "Grabar el mensaje y escucharlo o verlo uno mismo, con una rúbrica sencilla",
                explica: "El predicador también se escucha a sí mismo: graba el mensaje y lo escucha o lo ve con una rúbrica sencilla.",
              },
              {
                tipo: "explica",
                apoyo: "Agradecer cada consejo, aunque duela, y orar por lo aprendido",
                clave: {
                  id: "pr-pastoral-5-6-a4-1",
                  tipo: "corta",
                  pregunta: "Las tres personas coinciden: la aplicación no quedó clara y el sermón fue largo. ¿Qué harás con lo que te dijeron?",
                  ideas: [
                    { id: "una", peso: 50, texto: "Elegir una sola cosa para mejorar en el mes siguiente, como la aplicación.", formas: ["una sola cosa", "una cosa a la vez", "una cosa por (mes|vez)", "primero (la|el|mejorar) (aplicacion|tiempo|claridad)", "(mejorar|mejorare|trabajar|trabajare) (la|el|en) (aplicacion|tiempo|claridad)"] },
                    { id: "agradecer", peso: 50, texto: "Agradecer cada consejo, aunque duela, y orar por lo aprendido.", formas: ["agradec*", "dar gracias", "dare gracias", "orar* por lo aprendido", "orare por", "orar por (lo|esto|eso)"] },
                  ],
                  modelo: "Les agradeceré cada consejo, aunque duela, y oraré por lo aprendido. Después elegiré una sola cosa para mejorar el mes siguiente: primero la aplicación, y más adelante el tiempo.",
                },
              },
            ],
          },
          {
            apoyo: "Como Apolos, recibe con humildad la corrección, y busca consejo",
            ref: "Hechos 18:24-26",
            titulo: "La grabación del domingo",
            relato: [
              "Eres pastor. El domingo predicaste sobre la oración, y un hermano grabó el mensaje en video.",
              "Esta semana apartas un tiempo para revisar cómo predicas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con la grabación?",
                opciones: [
                  { texto: "La veo yo mismo, con una rúbrica sencilla.", bien: true, explica: "Se graba el mensaje y uno mismo lo escucha o lo ve, con una rúbrica sencilla." },
                  { texto: "La borro: verme predicar solo me hará sentir mal.", explica: "Escuchar o ver el propio mensaje con una rúbrica sencilla es parte de pedir retroalimentación." },
                  { texto: "La publico, para que me feliciten en las redes.", explica: "La grabación es para escucharla o verla uno mismo, con una rúbrica sencilla." },
                ],
                apoyo: "Grabar el mensaje y escucharlo o verlo uno mismo, con una rúbrica sencilla",
                explica: "El predicador escucha o ve su propio mensaje, con una rúbrica sencilla.",
              },
              {
                tipo: "situacion",
                pregunta: "Al verla, notas varios errores. ¿Qué te propones?",
                opciones: [
                  { texto: "Mejorar una sola cosa este mes, como la claridad.", bien: true, explica: "Se elige una sola cosa para mejorar en el mes siguiente, como la claridad, la aplicación o el tiempo." },
                  { texto: "Corregir todos los errores para el próximo domingo.", explica: "Se mejora una cosa a la vez: se elige una sola para el mes siguiente." },
                  { texto: "Dejar de predicar hasta que lo hagas sin ningún error.", explica: "Nadie llega a ser un predicador terminado: se mejora una cosa a la vez." },
                ],
                apoyo: "Elegir una sola cosa para mejorar en el mes siguiente, como la claridad, la aplicación o el tiempo",
                explica: "El predicador mejora una cosa a la vez: elige una sola para el mes siguiente.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano de confianza te dice algo que te duele sobre tu sermón. ¿Qué haces?",
                opciones: [
                  { texto: "Le agradezco, aunque duela, y oro por lo aprendido.", bien: true, explica: "Se agradece cada consejo, aunque duela, y se ora por lo aprendido." },
                  { texto: "Le pido que no me vuelva a decir nada sobre mis sermones.", explica: "En la multitud de consejeros se afirman los planes: un predicador sabio pide consejo." },
                  { texto: "Le doy la razón delante de él, pero me quedo resentido.", explica: "Se agradece cada consejo, aunque duela: Apolos aceptó la corrección y siguió creciendo." },
                ],
                apoyo: "Agradecer cada consejo, aunque duela, y orar por lo aprendido",
                explica: "Como Apolos, el predicador recibe con humildad la corrección: agradece cada consejo, aunque duela.",
              },
              {
                tipo: "explica",
                apoyo: "Apolos aceptó la corrección y siguió creciendo",
                clave: {
                  id: "pr-pastoral-5-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué te enseña Apolos sobre recibir la corrección de tus sermones?",
                  ideas: [
                    { id: "aceptar", peso: 50, texto: "Que Apolos, aunque era elocuente y poderoso en las Escrituras, aceptó la corrección con humildad.", formas: ["acept* la correccion", "acept* (que|lo|le)", "humildad", "humilde", "se dej* (corregir|ensenar)", "recib* (con|el) (humildad|consejo)"] },
                    { id: "crecer", peso: 50, texto: "Y que siguió creciendo: nadie llega a ser un predicador terminado.", formas: ["sigui* creciendo", "crec*", "sigui* aprendiendo", "predicador terminado", "esta terminado"] },
                  ],
                  modelo: "Apolos era elocuente y poderoso en las Escrituras, pero le faltaba algo. Aceptó con humildad la corrección y siguió creciendo. Así también yo recibo la corrección, porque nadie llega a ser un predicador terminado.",
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
            consigna: "¿Es predicar con honestidad o es engañar a la iglesia? Lleva cada frase a su grupo.",
            grupos: ["Predica con honestidad", "Engaña a la iglesia"],
            frases: [
              { texto: "Decir de quién es la ilustración que usas", grupo: 0 },
              { texto: "Contar que una idea la tomaste de un libro", grupo: 0 },
              { texto: "Preparar tu sermón leyendo el texto, orando y estudiando", grupo: 0 },
              { texto: "Predicar como propio el sermón de otro", grupo: 1 },
              { texto: "Leer como tuyo un texto que escribió una herramienta", grupo: 1 },
              { texto: "Usar la idea de otro sin decirlo", grupo: 1 },
            ],
            apoyo: "si usas una idea o una ilustración de otro, dilo",
            explica: "Predicar como propio el sermón de otro, o un texto que escribió una herramienta, es engañar a la iglesia; si usas una idea o una ilustración de otro, dilo.",
          },
          {
            consigna: "¿Este predicador es honesto con la iglesia o la engaña? Lleva cada frase a su grupo.",
            grupos: ["Es honesto", "La engaña"],
            frases: [
              { texto: "Dice: Esta ilustración se la escuché a un pastor amigo", grupo: 0 },
              { texto: "Cita el libro de donde tomó una idea", grupo: 0 },
              { texto: "Empieza el lunes a preparar su propio sermón", grupo: 0 },
              { texto: "Copia un sermón de internet y lo presenta como suyo", grupo: 1 },
              { texto: "Pide un sermón a una herramienta y lo predica como propio", grupo: 1 },
              { texto: "Cuenta como suya una historia que le pasó a otro", grupo: 1 },
            ],
            apoyo: "Predicar como propio el sermón de otro, o un texto que escribió una herramienta, es engañar a la iglesia",
            explica: "El predicador honesto dice de quién es la idea o la ilustración que usa y prepara su propio sermón; presentar como propio el sermón de otro, o un texto de una herramienta, es engañar a la iglesia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El predicador es honesto: renuncia «a lo oculto y vergonzoso, no andando con astucia, ni adulterando la palabra de Dios»",
            ref: "2 Corintios 4:2",
            situacion: "Eres pastor. Fue una semana muy ocupada, y es sábado en la noche: todavía no tienes listo el sermón del domingo.",
            escenas: [
              {
                id: "e1",
                narra: "En internet encuentras un sermón excelente sobre el mismo pasaje.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Preparas tu mensaje y, si usas una idea suya, lo dices.", valor: 2, explica: "Si usas una idea o una ilustración de otro, dilo: el predicador es honesto.", siguiente: "e2" },
                  { texto: "Lo predicas tal cual el domingo, como si lo hubieras hecho tú.", valor: 0, explica: "Predicar como propio el sermón de otro es engañar a la iglesia.", siguiente: "e1b" },
                  { texto: "No lo usas, y el domingo predicas algo sin haber preparado nada.", valor: 1, explica: "No engañas a nadie, pero aparta cada semana un tiempo fijo para preparar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El domingo, un hermano te felicita por lo original de tu sermón.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices la verdad: era el sermón de otro predicador.", valor: 2, explica: "El predicador es honesto: no presenta como propio el trabajo de otros.", siguiente: "e2" },
                  { texto: "Le das las gracias y dejas que siga creyendo que era tuyo.", valor: 0, explica: "Predicar como propio el sermón de otro es engañar a la iglesia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El lunes, una herramienta te ofrece escribirte el sermón del próximo domingo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "No lo presentas como propio: preparas tú el mensaje.", valor: 2, explica: "Predicar como propio un texto que escribió una herramienta es engañar a la iglesia." },
                  { texto: "Lo aceptas y lo predicas como si lo hubieras escrito tú.", valor: 0, explica: "Predicar como propio un texto que escribió una herramienta es engañar a la iglesia." },
                ],
              },
              {
                id: "e3",
                narra: "Quieres que no te vuelva a pasar lo del sábado.",
                pregunta: "¿Qué cambias en tu semana?",
                opciones: [
                  { texto: "Apartas un tiempo fijo y empiezas el lunes o el martes.", valor: 2, explica: "Aparta cada semana un tiempo fijo para preparar; un buen hábito es empezar el sermón el lunes o el martes." },
                  { texto: "Nada: siempre habrá un sermón en internet para el sábado.", valor: 0, explica: "Predicar como propio el sermón de otro es engañar a la iglesia; aparta cada semana un tiempo fijo." },
                  { texto: "Preparas el sermón el sábado temprano, en vez de en la noche.", valor: 1, explica: "Es mejor que la noche, pero un buen hábito es empezar el lunes o el martes, para que madure en tu corazón." },
                ],
              },
            ],
          },
          {
            apoyo: "Y predica con honestidad: no presenta como propio el trabajo de otros",
            ref: "2 Corintios 4:2",
            situacion: "Eres pastor, y esta semana preparas un sermón sobre el perdón. Estás leyendo un libro que te ayuda mucho.",
            escenas: [
              {
                id: "e1",
                narra: "El libro trae una ilustración muy buena para tu sermón.",
                pregunta: "¿Cómo la usas?",
                opciones: [
                  { texto: "La cuentas y dices de qué libro la tomaste.", valor: 2, explica: "Si usas una idea o una ilustración de otro, dilo.", siguiente: "e2" },
                  { texto: "La cuentas como si te hubiera pasado a ti.", valor: 0, explica: "Presentar como propio el trabajo de otros es engañar a la iglesia.", siguiente: "e1b" },
                  { texto: "No la usas, aunque te ayudaría a explicar el texto.", valor: 1, explica: "No engañas, pero puedes usarla: si usas una ilustración de otro, dilo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Después del culto, un joven te pregunta si de verdad te pasó lo que contaste.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices la verdad, y le pides perdón por contarla así.", valor: 2, explica: "El predicador es honesto: renuncia a lo oculto y vergonzoso.", siguiente: "e2" },
                  { texto: "Le dices que sí, para no arruinar el efecto de la historia.", valor: 0, explica: "Presentar como propio lo que es de otro es engañar a la iglesia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un amigo predicador te ofrece su sermón completo sobre el perdón.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Se lo agradeces, pero preparas tu propio mensaje.", valor: 2, explica: "El predicador no presenta como propio el trabajo de otros: prepara su mensaje y, si usa una idea de otro, lo dice." },
                  { texto: "Lo predicas como tuyo, porque nadie se va a enterar.", valor: 0, explica: "Predicar como propio el sermón de otro es engañar a la iglesia." },
                  { texto: "Le cambias algunas palabras para que no se note de quién es.", valor: 0, explica: "Sigue siendo presentar como propio el sermón de otro: es engañar a la iglesia." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del año, piensas en lo que verá tu iglesia de tu ministerio.",
                pregunta: "¿En qué confías?",
                opciones: [
                  { texto: "En que el fruto se ve en la vida y en la conducta.", valor: 2, explica: "«Acordaos de vuestros pastores, que os hablaron la palabra de Dios; considerad cuál haya sido el resultado de su conducta, e imitad su fe»." },
                  { texto: "En que recuerden lo elocuente que fuiste en el púlpito.", valor: 0, explica: "El fruto se ve en la vida: en el resultado de la conducta del que predica." },
                  { texto: "En la cantidad de sermones famosos que pudiste predicar.", valor: 0, explica: "Lo que se recuerda es la conducta y la fe: el fruto se ve en la vida." },
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
            apoyo: "El predicador sigue creciendo toda la vida: cuida de sí mismo y de la doctrina, como Pablo le pidió a Timoteo",
            ref: "1 Timoteo 4:15-16",
            clave: {
              id: "pr-pastoral-5-6-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el predicador sigue aprendiendo toda la vida?",
              ideas: [
                { id: "terminado", peso: 40, texto: "Porque nadie llega a ser un predicador terminado: los mejores siguen leyendo, escuchando consejos y orando.", formas: ["predicador terminado", "esta terminado", "nadie llega", "nunca (termina|terminamos|acaba|deja)", "siguen leyendo", "sigue leyendo", "seguir leyendo", "leyendo"] },
                { id: "cuida", peso: 30, texto: "Porque cuida de sí mismo y de la doctrina, como Pablo le pidió a Timoteo.", formas: ["cuid* de si mismo", "cuid* (su|la) (vida|doctrina|ensenanza)", "la doctrina", "si mismo", "ocupate", "permanece en"] },
                { id: "apolos", peso: 30, texto: "Como Apolos, recibe con humildad la corrección y busca consejo.", formas: ["apolos", "acept* la correccion", "humildad", "humilde", "consejo*", "consejeros"] },
              ],
              modelo: "Porque nadie llega a ser un predicador terminado: los mejores siguen leyendo, escuchando consejos y orando. El predicador cuida de sí mismo y de la doctrina, y como Apolos, recibe con humildad la corrección y busca consejo.",
            },
          },
          {
            apoyo: "Como Apolos, recibe con humildad la corrección, y busca consejo, porque en la multitud de consejeros se afirman los planes",
            ref: "Proverbios 15:22",
            clave: {
              id: "pr-pastoral-5-6-a7-2",
              tipo: "corta",
              pregunta: "Un predicador con muchos años dice: Ya sé predicar, y no necesito que nadie me aconseje. ¿Qué le respondes?",
              ideas: [
                { id: "apolos", peso: 50, texto: "Que Apolos era elocuente y poderoso en las Escrituras, y aun así aceptó la corrección y siguió creciendo.", formas: ["apolos", "acept* la correccion", "sigui* creciendo", "le faltaba", "nadie llega", "predicador terminado"] },
                { id: "consejo", peso: 50, texto: "Que en la multitud de consejeros se afirman los planes: un predicador sabio pide consejo.", formas: ["multitud de consejeros", "consejeros", "(pide|pedir|pida|busca|buscar|busque) consejo", "predicador sabio", "sabio pide", "se afirman"] },
              ],
              modelo: "Le respondo que Apolos era elocuente y poderoso en las Escrituras, y aun así aceptó la corrección y siguió creciendo. Además, en la multitud de consejeros se afirman los planes: un predicador sabio pide consejo.",
            },
          },
        ],
      },
    ],
  },
};
