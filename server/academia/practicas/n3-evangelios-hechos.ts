/**
 * Las prácticas de «Los Evangelios y Hechos» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-evangelios-hechos.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_EVANGELIOS_HECHOS: PracticasMateria = {
  materia: "n3-evangelios-hechos",
  mision: {
    titulo: "De Jerusalén hasta lo último de la tierra",
    intro: "Tu pastor te pidió que prepares a los nuevos maestros de la escuela dominical para enseñar los Evangelios y Hechos. Te van a preguntar por qué hay cuatro evangelios, quién es Jesús, qué es el reino de Dios, qué pasó en la cruz y en la tumba vacía, y cómo llegó el evangelio de Jerusalén a Roma. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes guiar a otros por los Evangelios y Hechos: una sola buena noticia en cuatro relatos, Jesús verdadero Dios y verdadero hombre, el reino que ya está aquí y todavía no del todo, la cruz y la tumba vacía, y una misión que empezó en Jerusalén y sigue abierta. Cada generación de la iglesia escribe el capítulo siguiente: ahora te toca a ti.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Cuatro relatos de un evangelio
    "n3-evangelios-hechos-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa la palabra griega euangelion?", reverso: "Buena noticia.", apoyo: "La palabra evangelio viene del griego euangelion, buena noticia" },
              { frente: "¿Por qué los títulos antiguos dicen el evangelio según Mateo, según Marcos…?", reverso: "Porque es un solo evangelio contado por cuatro autores.", apoyo: "es un solo evangelio contado por cuatro autores" },
              { frente: "¿En qué se apoyan los evangelios?", reverso: "En testigos que vieron a Jesús con sus propios ojos.", apoyo: "Los evangelios se apoyan en testigos" },
              { frente: "¿A quién escribió Lucas su evangelio, y para qué?", reverso: "A Teófilo, para que conociera bien la verdad de lo que le habían enseñado.", apoyo: "y escribió a Teófilo «para que conozcas bien la verdad de las cosas en las cuales has sido instruido»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo son los cuatro evangelios?", reverso: "Cuatro relatos de una misma buena noticia sobre Jesús.", apoyo: "Así son los cuatro evangelios: cuatro relatos de una misma buena noticia sobre Jesús" },
              { frente: "Cuando cuatro testigos cuentan un mismo hecho, ¿qué destaca cada uno?", reverso: "Lo que vio y lo que quiere que entiendan sus oyentes.", apoyo: "cada uno destaca lo que vio y lo que quiere que entiendan sus oyentes" },
              { frente: "¿Qué hizo Lucas antes de escribir su evangelio?", reverso: "Investigó con diligencia lo que enseñaron los testigos.", apoyo: "Lucas investigó con diligencia lo que enseñaron" },
              { frente: "¿Qué dice Pedro en 2 Pedro 1:16 sobre lo que anunciaron?", reverso: "Que no siguieron fábulas: vieron con sus propios ojos la majestad de Cristo.", apoyo: "Pedro dice que no siguieron fábulas, sino que vieron con sus propios ojos la majestad de Cristo" },
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
            consigna: "Completa qué es un evangelio.",
            texto: "La palabra evangelio viene del [[griego]] euangelion, buena [[noticia]], y es un solo evangelio contado por cuatro [[autores]].",
            distractores: ["hebreo", "ley", "iglesias"],
            errores: {
              hebreo: "La palabra evangelio viene del griego euangelion.",
              ley: "Euangelion quiere decir buena noticia.",
              iglesias: "Es un solo evangelio contado por cuatro autores: Mateo, Marcos, Lucas y Juan.",
            },
            apoyo: "es un solo evangelio contado por cuatro autores",
            ref: "Marcos 1:1",
            explica: "Evangelio viene del griego euangelion, buena noticia. Por eso los títulos antiguos dicen según Mateo, según Marcos, según Lucas y según Juan: es un solo evangelio contado por cuatro autores.",
          },
          {
            consigna: "Completa por qué los cuatro evangelios no se contradicen.",
            texto: "Las diferencias entre los evangelios son perspectivas distintas de [[testigos]], y juntos dan un [[retrato]] más [[completo]] de Jesús.",
            distractores: ["enemigos", "enredo", "confuso"],
            errores: {
              enemigos: "Son perspectivas distintas de testigos que escogieron qué contar y cómo ordenarlo.",
              enredo: "Juntos dan un retrato de Jesús, no un enredo.",
              confuso: "Juntos dan un retrato más completo de Jesús que el que daría uno solo.",
            },
            apoyo: "son perspectivas distintas de testigos que escogieron qué contar y cómo ordenarlo para sus lectores",
            explica: "Las diferencias entre los evangelios no son contradicciones: son perspectivas distintas de testigos. Juntos dan un retrato más completo de Jesús que el que daría uno solo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es de los evangelios sinópticos o del evangelio de Juan? Lleva cada frase a su grupo.",
            grupos: ["Los sinópticos", "El evangelio de Juan"],
            frases: [
              { texto: "Se pueden ver juntos", grupo: 0 },
              { texto: "Muchos de los mismos hechos", grupo: 0 },
              { texto: "Un orden parecido entre ellos", grupo: 0 },
              { texto: "Marcos, que según muchos se escribió primero", grupo: 0 },
              { texto: "Siete señales escogidas", grupo: 1 },
              { texto: "Largos discursos de Jesús", grupo: 1 },
              { texto: "Las declaraciones Yo soy", grupo: 1 },
              { texto: "Para que creyendo tengamos vida", grupo: 1 },
            ],
            apoyo: "Mateo, Marcos y Lucas se llaman sinópticos, que significa que se pueden ver juntos",
            ref: "Juan 20:30-31",
            explica: "Los sinópticos se pueden ver juntos: cuentan muchos de los mismos hechos y en un orden parecido. Juan cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy.",
          },
          {
            consigna: "¿Describe a los sinópticos o al evangelio de Juan? Lleva cada frase a su grupo.",
            grupos: ["Los sinópticos", "El evangelio de Juan"],
            frases: [
              { texto: "Su nombre significa que se pueden ver juntos", grupo: 0 },
              { texto: "Mateo, Marcos y Lucas", grupo: 0 },
              { texto: "Muchos hechos en común, en un orden parecido", grupo: 0 },
              { texto: "El evangelio más reflexivo", grupo: 1 },
              { texto: "Jesús, el Verbo eterno hecho carne", grupo: 1 },
              { texto: "El Hijo que revela al Padre", grupo: 1 },
              { texto: "Escrito para que creamos y tengamos vida", grupo: 1 },
            ],
            apoyo: "Juan, el más reflexivo: Jesús es el Verbo eterno hecho carne, el Hijo que revela al Padre, para que creamos y tengamos vida",
            ref: "Juan 20:31",
            explica: "Mateo, Marcos y Lucas son sinópticos: se pueden ver juntos. Juan es el más reflexivo: muestra a Jesús como el Verbo eterno hecho carne, el Hijo que revela al Padre, para que creamos y tengamos vida.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada evangelio con el retrato de Jesús que pinta.",
            pares: [
              ["Mateo", "El Mesías, el Rey prometido, que cumple las Escrituras"],
              ["Marcos", "El Hijo de Dios que vino a servir"],
              ["Lucas", "El Salvador de todos, que busca a los perdidos"],
              ["Juan", "El Verbo eterno hecho carne, el Hijo que revela al Padre"],
            ],
            apoyo: "Cada uno pinta un retrato: el Rey prometido, el Siervo, el Salvador de todos y el Verbo hecho carne",
            explica: "Mateo muestra a Jesús como el Rey prometido; Marcos, como el Hijo de Dios que vino a servir; Lucas, como el Salvador de todos; y Juan, como el Verbo eterno hecho carne.",
          },
          {
            consigna: "Une cada evangelio con lo que lo distingue.",
            pares: [
              ["Mateo", "Repite que algo sucedió para que se cumpliese lo dicho por los profetas"],
              ["Marcos", "Breve y lleno de acción"],
              ["Lucas", "Destaca la oración y el Espíritu Santo, y continúa en Hechos"],
              ["Juan", "El más reflexivo de los cuatro"],
            ],
            apoyo: "Mateo, para lectores judíos: Jesús es el Mesías, el Rey prometido, que cumple las Escrituras",
            explica: "Mateo, para lectores judíos, repite que se cumplió lo dicho por los profetas; Marcos es breve y lleno de acción; Lucas destaca la oración y el Espíritu Santo, y Juan es el más reflexivo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven que visita tu célula te dice: Los evangelios no cuentan todo igual; para mí, eso prueba que se contradicen.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no se contradicen: son testigos que escogieron qué contar.", bien: true, explica: "Las diferencias no son contradicciones: son perspectivas distintas de testigos que escogieron qué contar y cómo ordenarlo." },
              { texto: "Que tiene razón: si todos fueran verdad, los cuatro dirían lo mismo.", explica: "Cuando cuatro testigos cuentan un mismo hecho, cada uno destaca lo que vio: juntos dan un retrato más completo." },
              { texto: "Que basta con leer uno solo, porque los otros tres ya sobran.", explica: "Juntos dan un retrato más completo de Jesús que el que daría uno solo." },
              { texto: "Que las diferencias no importan, porque nadie vio lo que pasó.", explica: "Los evangelios se apoyan en testigos: vieron con sus propios ojos lo que contaron." },
            ],
            apoyo: "Las diferencias entre los evangelios no son contradicciones",
            explica: "Cuando cuatro testigos cuentan un mismo hecho, cada uno destaca lo que vio: así son los cuatro evangelios, cuatro relatos de una misma buena noticia.",
          },
          {
            caso: "Una joven de tu célula te dice: Si la buena noticia es una sola, ¿por qué la Biblia trae cuatro evangelios?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque es un solo evangelio contado por cuatro autores, con cuatro retratos.", bien: true, explica: "Los cuatro relatos cuentan una sola buena noticia, y cada uno pinta un retrato de Jesús." },
              { texto: "Porque cada autor anunció una buena noticia distinta de la de los otros.", explica: "Es un solo evangelio: los títulos antiguos dicen según Mateo, según Marcos, según Lucas y según Juan." },
              { texto: "Porque la iglesia no supo cuál era el bueno y se quedó con los cuatro.", explica: "Los cuatro se apoyan en testigos, y juntos dan un retrato más completo de Jesús." },
              { texto: "Porque cada evangelio se escribió para corregir los errores de los anteriores.", explica: "Las diferencias no son contradicciones ni errores: son perspectivas distintas de testigos." },
            ],
            apoyo: "Los evangelios son cuatro relatos de una sola buena noticia, basados en testigos",
            explica: "Es un solo evangelio contado por cuatro autores: cuatro relatos de una sola buena noticia, basados en testigos, que juntos dan un retrato más completo de Jesús.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Antes de enseñar un pasaje de un evangelio, pregunta qué quiere mostrar ese evangelista con él",
            situacion: "Eres maestro de la escuela dominical. El domingo vas a enseñar un milagro que cuentan Mateo y Lucas.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes tu Biblia abierta en los dos relatos.",
                pregunta: "¿Por dónde empiezas a preparar la clase?",
                opciones: [
                  { texto: "Te preguntas qué quiere mostrar cada evangelista con ese milagro.", valor: 2, explica: "Antes de enseñar un pasaje de un evangelio, se pregunta qué quiere mostrar ese evangelista con él.", siguiente: "e2" },
                  { texto: "Lees uno de los dos relatos y preparas la clase solo con ese.", valor: 1, explica: "Es un buen comienzo, pero el mismo milagro puede tener un acento distinto en Mateo y en Lucas.", siguiente: "e2" },
                  { texto: "Juntas los dos relatos en uno sin fijarte en lo que destaca cada uno.", valor: 0, explica: "Cada evangelista pinta su retrato de Jesús: el mismo milagro puede tener un acento distinto.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al mezclar los relatos, ya no ves lo que destaca cada evangelista.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Vuelves a cada relato y miras qué retrato de Jesús pinta cada uno.", valor: 2, explica: "Así ves el acento de cada uno, según el retrato de Jesús que pinta.", siguiente: "e2" },
                  { texto: "Sigues con tu mezcla, porque al fin y al cabo el milagro es el mismo.", valor: 0, explica: "El milagro es el mismo, pero cada evangelista escogió qué contar y cómo ordenarlo para sus lectores.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la clase, un alumno dice: Mateo y Lucas no lo cuentan igual; entonces uno de los dos se equivocó.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que son perspectivas distintas de testigos, no contradicciones.", valor: 2, explica: "Las diferencias entre los evangelios no son contradicciones: son perspectivas distintas de testigos que escogieron qué contar." },
                  { texto: "Que los dos relatos son verdad, aunque no sepas explicar por qué.", valor: 1, explica: "Es cierto, pero puedes explicarle más: cada testigo escogió qué contar y cómo ordenarlo para sus lectores." },
                  { texto: "Que no se fije en esas diferencias y siga atento a la clase.", valor: 0, explica: "Su pregunta merece respuesta: las diferencias son perspectivas distintas, y juntas dan un retrato más completo." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar la clase, quieres dejarles una tarea para la semana.",
                pregunta: "¿Qué tarea les dejas?",
                opciones: [
                  { texto: "Leer un evangelio completo, de principio a fin, preguntando quién es Jesús.", valor: 2, explica: "Es lo que propone la lección: leer un evangelio completo como se lee una biografía, preguntando quién es Jesús." },
                  { texto: "Leer otra vez el milagro de hoy en el evangelio que cada uno prefiera.", valor: 1, explica: "Releerlo ayuda, pero la lección propone más: leer un evangelio completo, de principio a fin." },
                  { texto: "Leer solo los versículos más conocidos de cada uno de los cuatro evangelios.", valor: 0, explica: "Un evangelio se lee como una biografía: de principio a fin, no a pedazos." },
                ],
              },
            ],
          },
          {
            apoyo: "El mismo milagro puede tener un acento distinto en Mateo y en Lucas, según el retrato de Jesús que cada uno pinta",
            situacion: "Eres líder de una célula. Esta semana van a estudiar juntos un pasaje del evangelio de Lucas.",
            escenas: [
              {
                id: "e1",
                narra: "Te sientas a preparar el estudio.",
                pregunta: "¿Qué te preguntas primero?",
                opciones: [
                  { texto: "Qué quiere mostrar Lucas de Jesús con este pasaje.", valor: 2, explica: "Antes de enseñar un pasaje de un evangelio, se pregunta qué quiere mostrar ese evangelista con él." },
                  { texto: "Qué dice el pasaje, sin pensar en el resto del libro.", valor: 1, explica: "Es bueno mirar el pasaje, pero conviene preguntar qué retrato de Jesús pinta Lucas con él." },
                  { texto: "Qué opina la célula del pasaje, antes de leerlo.", valor: 0, explica: "Lo primero es qué quiere mostrar el evangelista con el pasaje, no lo que opina cada uno." },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano pregunta qué retrato de Jesús pinta Lucas.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "El del Salvador de todos, que busca a los perdidos.", valor: 2, explica: "Lucas, para Teófilo y para los no judíos, muestra a Jesús como el Salvador de todos, que busca a los perdidos." },
                  { texto: "El del Rey prometido, que cumple lo que dijeron los profetas.", valor: 0, explica: "Ese es el retrato de Mateo, que escribe para lectores judíos." },
                  { texto: "El del Hijo de Dios, que vino a servir, en un relato breve.", valor: 0, explica: "Ese es el retrato de Marcos, breve y lleno de acción." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, una hermana dice que no ve para qué leer los otros evangelios si ya leyó Lucas.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que juntos dan un retrato de Jesús más completo que uno solo.", valor: 2, explica: "Las diferencias son perspectivas distintas de testigos, y juntos dan un retrato más completo de Jesús que el que daría uno solo." },
                  { texto: "Que los lea, porque en cada uno hay cosas que no están en Lucas.", valor: 1, explica: "Es cierto que cada uno escogió qué contar; lo principal es que juntos dan un retrato más completo de Jesús." },
                  { texto: "Que tiene razón: con uno de los cuatro evangelios ya basta.", valor: 0, explica: "Cada evangelio pinta su retrato, y juntos dan un retrato más completo de Jesús." },
                ],
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
            apoyo: "Mateo, Marcos y Lucas se llaman sinópticos, que significa que se pueden ver juntos",
            ref: "Juan 20:30-31",
            clave: {
              id: "pr-n3-evangelios-hechos-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué significa que Mateo, Marcos y Lucas sean sinópticos, y en qué es distinto el evangelio de Juan?",
              ideas: [
                { id: "juntos", peso: 50, texto: "Sinópticos significa que se pueden ver juntos: cuentan muchos de los mismos hechos y en un orden parecido.", formas: ["(ver|verse|ven|vemos|vistos|leer|leen|leerse|leidos|mirar|miran|mirarse) juntos", "mismos hechos", "hechos parecidos", "hechos en comun", "orden parecido", "mismo orden", "orden similar", "se parecen"] },
                { id: "juan", peso: 50, texto: "Juan es distinto: cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy, para que creyendo tengamos vida.", formas: ["siete senales", "senales", "discursos", "yo soy", "para que (creyendo|creamos|crean|tengamos|tengan)", "tengamos vida", "reflexivo"] },
              ],
              modelo: "Que se pueden ver juntos: cuentan muchos de los mismos hechos y en un orden parecido. Juan es distinto: cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy.",
            },
          },
          {
            apoyo: "Juan es distinto: cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy",
            ref: "Juan 20:30-31",
            clave: {
              id: "pr-n3-evangelios-hechos-1-a7-2",
              tipo: "corta",
              pregunta: "¿Con qué propósito escribe Juan su evangelio, y qué cuenta que lo hace distinto de los otros tres?",
              ideas: [
                { id: "vida", peso: 50, texto: "Juan escribe para que creyendo tengamos vida en su nombre.", formas: ["para que (creyendo|creamos|crean|creyeran|tengamos|tengan|tuvieramos)", "tengamos vida", "tener vida", "tengan vida", "vida en su nombre", "vida eterna", "crea* y (tengamos|tengan)"] },
                { id: "senales", peso: 50, texto: "Cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy.", formas: ["siete senales", "senales", "discursos", "yo soy", "declaraciones"] },
              ],
              modelo: "Juan escribe para que creyendo tengamos vida en su nombre. A diferencia de los sinópticos, cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La persona de Jesús
    "n3-evangelios-hechos-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde preguntó Jesús a sus discípulos quién decían que era él?", reverso: "En Cesarea de Filipo.", apoyo: "En Cesarea de Filipo, Jesús hizo la pregunta más importante que una persona puede responder" },
              { frente: "¿Quién le reveló a Pedro que Jesús es el Cristo?", reverso: "El Padre: no se lo reveló carne ni sangre.", apoyo: "Jesús le dijo que no se lo había revelado carne ni sangre, sino el Padre" },
              { frente: "¿Desde cuándo empieza Juan su evangelio?", reverso: "Desde antes de Belén: en el principio, con el Verbo.", apoyo: "Juan empieza antes de Belén" },
              { frente: "¿Qué tomó el Verbo eterno al hacerse hombre?", reverso: "Una naturaleza humana completa, sin dejar de ser Dios.", apoyo: "No dejó de ser Dios al hacerse hombre: tomó una naturaleza humana completa" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por quién fue concebido Jesús en el vientre de María?", reverso: "Por el Espíritu Santo.", apoyo: "Mateo y Lucas cuentan que Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen" },
              { frente: "¿Qué significa el nombre Emanuel?", reverso: "Dios con nosotros.", apoyo: "su nombre sería Emanuel, «que traducido es: Dios con nosotros»" },
              { frente: "¿Qué entendieron los escribas cuando Jesús perdonó al paralítico?", reverso: "Que perdonar pecados solo lo hace Dios.", apoyo: "los escribas entendieron que eso solo lo hace Dios" },
              { frente: "¿Por qué Jesús puede compadecerse de nuestras debilidades?", reverso: "Porque fue tentado en todo como nosotros, pero sin pecado.", apoyo: "Fue tentado en todo como nosotros, pero sin pecado" },
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
            consigna: "Juan 1:14 dice que el Verbo tomó una naturaleza humana. ¿Qué palabras lo dicen? Tócalas.",
            texto: "[[fue hecho carne]], y habitó entre nosotros",
            apoyo: "Ese Verbo eterno «fue hecho carne, y habitó entre nosotros»",
            ref: "Juan 1:14",
            explica: "El Verbo eterno «fue hecho carne, y habitó entre nosotros»: no dejó de ser Dios al hacerse hombre, sino que tomó una naturaleza humana completa.",
          },
          {
            consigna: "¿Cómo será llamado el que nacerá de María, según Lucas 1:35? Toca las palabras que lo dicen.",
            texto: "el Santo Ser que nacerá, será llamado [[Hijo de Dios]]",
            apoyo: "Mateo y Lucas cuentan que Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen",
            ref: "Lucas 1:35",
            explica: "Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen: «el Santo Ser que nacerá, será llamado Hijo de Dios».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que cuentan Mateo y Lucas del nacimiento de Jesús.",
            texto: "Mateo y Lucas cuentan que Jesús fue concebido por el [[Espíritu]] Santo en el vientre de [[María]], una [[virgen]].",
            distractores: ["profeta", "Isabel", "viuda"],
            errores: {
              profeta: "Jesús fue concebido por el Espíritu Santo.",
              Isabel: "Jesús fue concebido en el vientre de María.",
              viuda: "María era una virgen: así lo cuentan Mateo y Lucas.",
            },
            apoyo: "Mateo y Lucas cuentan que Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen",
            ref: "Lucas 1:35",
            explica: "Mateo y Lucas cuentan que Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen, y Mateo ve allí el cumplimiento de Isaías: su nombre sería Emanuel, Dios con nosotros.",
          },
          {
            consigna: "Completa lo que enseña Juan sobre el Verbo.",
            texto: "Juan empieza antes de [[Belén]]: el Verbo [[eterno]] se hizo carne y tomó una naturaleza [[humana]] completa.",
            distractores: ["Nazaret", "nuevo", "angélica"],
            errores: {
              Nazaret: "Juan empieza antes de Belén: «En el principio era el Verbo».",
              nuevo: "El Verbo es eterno: en el principio ya era, y era Dios.",
              "angélica": "Al hacerse hombre, el Verbo tomó una naturaleza humana completa.",
            },
            apoyo: "No dejó de ser Dios al hacerse hombre: tomó una naturaleza humana completa",
            ref: "Juan 1:1",
            explica: "Juan empieza antes de Belén: el Verbo eterno era Dios, y al hacerse hombre tomó una naturaleza humana completa, sin dejar de ser Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Muestra que Jesús es verdadero hombre o verdadero Dios? Lleva cada frase a su grupo.",
            grupos: ["Verdadero hombre", "Verdadero Dios"],
            frases: [
              { texto: "Tuvo hambre y sed", grupo: 0 },
              { texto: "Se cansó del camino", grupo: 0 },
              { texto: "Lloró ante la tumba de su amigo", grupo: 0 },
              { texto: "Estuvo angustiado en Getsemaní", grupo: 0 },
              { texto: "Perdonó los pecados del paralítico", grupo: 1 },
              { texto: "Calmó el mar con una palabra", grupo: 1 },
              { texto: "Recibió adoración", grupo: 1 },
              { texto: "Usó el nombre con que Dios se reveló a Moisés", grupo: 1, explica: "Al decir «Antes que Abraham fuese, yo soy», usó el nombre con que Dios se reveló a Moisés." },
            ],
            apoyo: "Al mismo tiempo, Jesús hizo lo que solo Dios puede hacer",
            ref: "Marcos 2:5-7",
            explica: "Los evangelios muestran a Jesús con hambre y sed, cansado, llorando y angustiado: verdadero hombre. Y hizo lo que solo Dios puede hacer: perdonó pecados, calmó el mar y recibió adoración.",
          },
          {
            consigna: "¿Lo muestra como verdadero hombre o como verdadero Dios? Lleva cada frase a su grupo.",
            grupos: ["Muestra que es verdadero hombre", "Muestra que es verdadero Dios"],
            frases: [
              { texto: "Fue tentado en todo como nosotros, pero sin pecado", grupo: 0 },
              { texto: "Puede compadecerse de nuestras debilidades", grupo: 0 },
              { texto: "Tomó una naturaleza humana completa", grupo: 0 },
              { texto: "Hizo lo que solo Dios puede hacer", grupo: 1 },
              { texto: "Le dijo al paralítico que sus pecados le eran perdonados", grupo: 1 },
              { texto: "Ya existía en el principio, antes de Belén", grupo: 1, explica: "Juan empieza antes de Belén: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios»." },
              { texto: "Usó para sí el nombre Yo soy", grupo: 1 },
            ],
            apoyo: "Fue tentado en todo como nosotros, pero sin pecado",
            ref: "Hebreos 4:15",
            explica: "Fue tentado en todo como nosotros, pero sin pecado, y por eso puede compadecerse de nuestras debilidades: es verdadero hombre. Y perdonó pecados y dijo Yo soy: es verdadero Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada título de Jesús con lo que significa.",
            pares: [
              ["Cristo", "El Ungido, el Rey prometido de la descendencia de David"],
              ["Hijo de Dios", "Así lo llamó el Padre en el bautismo"],
              ["Hijo del Hombre", "El título que Jesús más usó para sí mismo"],
              ["Señor", "El que tiene autoridad sobre todo"],
            ],
            apoyo: "Cristo: en griego, como Mesías en hebreo, significa el Ungido, el Rey prometido de la descendencia de David",
            explica: "Cristo es el Ungido, el Rey prometido; Hijo de Dios, como lo llamó el Padre en el bautismo; Hijo del Hombre, el título que Jesús más usó; y Señor, el que tiene autoridad sobre todo.",
          },
          {
            consigna: "Une cada nombre o momento con lo que la lección dice de él.",
            pares: [
              ["Mesías", "En hebreo, el Ungido, como Cristo en griego"],
              ["La visión de Daniel 7", "Uno como un hijo de hombre recibe un reino eterno"],
              ["El bautismo de Jesús", "El Padre dice: Este es mi Hijo amado"],
              ["Cesarea de Filipo", "Pedro confiesa que Jesús es el Cristo"],
            ],
            apoyo: "Hijo de Dios: en el bautismo, el Padre dijo: Este es mi Hijo amado, en quien tengo complacencia",
            explica: "Mesías, en hebreo, significa el Ungido, como Cristo en griego. Hijo del Hombre recuerda la visión de Daniel 7; en el bautismo el Padre lo llamó su Hijo amado, y en Cesarea de Filipo Pedro confesó que es el Cristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la confesión de Pedro tiene un error. Tócala.",
            frases: [
              "Jesús hizo la pregunta en Cesarea de Filipo.",
              "Pedro respondió que Jesús es el Cristo, el Hijo del Dios viviente.",
              "Pedro lo supo porque se lo reveló carne y sangre.",
              "Es la confesión central de la fe.",
            ],
            malo: 2,
            correccion: "Jesús le dijo que no se lo había revelado carne ni sangre, sino el Padre.",
            apoyo: "Jesús le dijo que no se lo había revelado carne ni sangre, sino el Padre",
            ref: "Mateo 16:16-17",
            explica: "Pedro confesó que Jesús es el Cristo, el Hijo del Dios viviente, y Jesús le dijo que eso se lo había revelado el Padre. Es la confesión central de la fe.",
          },
          {
            consigna: "Una de estas frases sobre los títulos de Jesús tiene un error. Tócala.",
            frases: [
              "Cristo, en griego, significa el Ungido, como Mesías en hebreo.",
              "Hijo del Hombre es el título que Jesús más usó para sí mismo.",
              "Hijo del Hombre recuerda una visión del profeta Isaías.",
              "Señor es el que tiene autoridad sobre todo.",
            ],
            malo: 2,
            correccion: "Hijo del Hombre recuerda la visión de Daniel 7:13-14, en la que uno como un hijo de hombre recibe un reino eterno.",
            apoyo: "recuerda la visión de Daniel 7:13-14, en la que uno como un hijo de hombre recibe un reino eterno",
            ref: "Marcos 14:61-62",
            explica: "Cristo y Mesías significan el Ungido; Hijo del Hombre es el título que Jesús más usó y recuerda la visión de Daniel 7:13-14; Señor es el que tiene autoridad sobre todo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Si no fuera Dios, no podría salvarnos; si no fuera hombre, no podría tomar nuestro lugar",
            ref: "Hebreos 4:15",
            clave: {
              id: "pr-n3-evangelios-hechos-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué es importante que Jesús sea a la vez verdadero Dios y verdadero hombre?",
              ideas: [
                { id: "salvar", peso: 50, negativa: true, texto: "Si no fuera Dios, no podría salvarnos.", formas: ["salvar*", "salvacion", "nos salva", "salvador", "salvo*"] },
                { id: "lugar", peso: 50, negativa: true, texto: "Si no fuera hombre, no podría tomar nuestro lugar.", formas: ["nuestro lugar", "(tomar|ocupar|tomo|ocupo|toma|ocupa|tome|ocupe) (el|nuestro|su) lugar", "en lugar de", "en vez de nosotros", "por nosotros"] },
              ],
              modelo: "Porque si no fuera Dios, no podría salvarnos, y si no fuera hombre, no podría tomar nuestro lugar. La iglesia confiesa las dos verdades juntas: verdadero Dios y verdadero hombre en una sola persona.",
            },
          },
          {
            apoyo: "Los evangelios muestran a Jesús con hambre y sed, cansado del camino",
            ref: "Juan 11:35; Marcos 2:5-7",
            clave: {
              id: "pr-n3-evangelios-hechos-2-a7-2",
              tipo: "corta",
              pregunta: "Da un ejemplo de los evangelios que muestre que Jesús es verdadero hombre, y otro que muestre que es verdadero Dios.",
              ideas: [
                { id: "hombre", peso: 50, texto: "Verdadero hombre: tuvo hambre y sed, se cansó del camino, lloró ante la tumba de su amigo y se angustió en Getsemaní.", formas: ["hamb*", "sed", "cans*", "llor*", "angusti*", "getsemani", "tentado", "naturaleza humana", "debilidades", "naci*"] },
                { id: "dios", peso: 50, texto: "Verdadero Dios: perdonó pecados, calmó el mar con una palabra, recibió adoración y dijo Yo soy.", formas: ["(perdono|perdonaba|perdonar|perdonando|perdon)", "calm*", "el mar", "ador*", "yo soy", "antes que abraham", "solo dios puede", "lo que solo dios"] },
              ],
              modelo: "Fue verdadero hombre: tuvo hambre y sed, se cansó del camino y lloró ante la tumba de su amigo. Y fue verdadero Dios: perdonó los pecados del paralítico y calmó el mar con una palabra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El reino de Dios en palabras y obras
    "n3-evangelios-hechos-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué comenzó Jesús su ministerio?", reverso: "Con una noticia: el reino de Dios se había acercado.", apoyo: "Jesús no comenzó su ministerio con una lista de reglas, sino con una noticia" },
              { frente: "¿Qué es el reino de Dios?", reverso: "El reinado de Dios: su gobierno que llega para salvar, sanar y restaurar.", apoyo: "El reino de Dios es el reinado de Dios" },
              { frente: "¿En quién llega el reino de Dios?", reverso: "En la persona de Jesús.", apoyo: "Llega en la persona de Jesús" },
              { frente: "¿Qué eran los milagros de Jesús?", reverso: "Señales del reino.", apoyo: "Los milagros de Jesús eran señales del reino" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pedía Jesús al anunciar que el reino se había acercado?", reverso: "Que se arrepintieran y creyeran en el evangelio.", apoyo: "arrepentíos, y creed en el evangelio" },
              { frente: "¿Qué viene a restaurar el gobierno de Dios?", reverso: "Lo que el pecado había roto.", apoyo: "su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto" },
              { frente: "¿Cómo resumen los estudiosos la llegada del reino?", reverso: "El reino ya está aquí, y todavía no del todo.", apoyo: "Los estudiosos lo resumen así: el reino ya está aquí, y todavía no del todo" },
              { frente: "¿Qué es el discipulado, según la lección?", reverso: "No un curso, sino una vida con Jesús.", apoyo: "El discipulado no es un curso, sino una vida con Jesús" },
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
            consigna: "Completa qué es el reino de Dios que anunció Jesús.",
            texto: "El reino de Dios es el reinado de Dios: su [[gobierno]] que llega para salvar, [[sanar]] y restaurar lo que el [[pecado]] había roto.",
            distractores: ["templo", "destruir", "tiempo"],
            errores: {
              templo: "El reino de Dios es su reinado, su gobierno, que llega en la persona de Jesús.",
              destruir: "El gobierno de Dios llega para salvar, sanar y restaurar.",
              tiempo: "El reino restaura lo que el pecado había roto.",
            },
            apoyo: "El reino de Dios es el reinado de Dios: su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto",
            ref: "Marcos 1:14-15",
            explica: "El reino de Dios es el reinado de Dios: su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto. Llega en la persona de Jesús.",
          },
          {
            consigna: "Completa cómo comenzó Jesús su ministerio.",
            texto: "Jesús comenzó su ministerio con una [[noticia]]: el [[reino]] de Dios se había [[acercado]], y llamó a arrepentirse y a creer en el evangelio.",
            distractores: ["lista", "templo", "alejado"],
            errores: {
              lista: "Jesús no comenzó con una lista de reglas, sino con una noticia.",
              templo: "La noticia era que el reino de Dios se había acercado.",
              alejado: "Jesús anunció que el reino de Dios se había acercado.",
            },
            apoyo: "Jesús no comenzó su ministerio con una lista de reglas, sino con una noticia: el reino de Dios se había acercado",
            ref: "Marcos 1:14-15",
            explica: "Jesús predicaba: «El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio». Todo lo que dijo e hizo después explica esa noticia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "El reino en obras y en palabras: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jesus", texto: "Jesús", x: 20, y: 10 },
              { id: "venga", texto: "«Venga tu reino»", x: 80, y: 10 },
              { id: "reino", texto: "El reino de Dios", x: 50, y: 48 },
              { id: "milagros", texto: "Los milagros: el reino en obras", x: 20, y: 88 },
              { id: "parabolas", texto: "Las parábolas: el reino en palabras", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "reino", a: "jesus", relacion: "llega en la persona de" },
              { de: "milagros", a: "reino", relacion: "son señales del" },
              { de: "parabolas", a: "reino", relacion: "enseñan cómo es" },
              { de: "venga", a: "reino", relacion: "pide la plenitud del" },
            ],
            distractores: ["reemplazan al", "se oponen al"],
            apoyo: "Los milagros de Jesús eran señales del reino",
            ref: "Lucas 11:20; Mateo 6:10",
            explica: "El reino de Dios llega en la persona de Jesús: sus milagros son señales del reino y sus parábolas enseñan cómo es. Como todavía no llegó en su plenitud, oramos «Venga tu reino».",
          },
          {
            consigna: "Las parábolas del reino: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "reino", texto: "El reino de Dios", x: 50, y: 12 },
              { id: "mostaza", texto: "La semilla de mostaza", x: 15, y: 80 },
              { id: "levadura", texto: "La levadura", x: 50, y: 88 },
              { id: "tesoro", texto: "El tesoro escondido", x: 85, y: 80 },
            ],
            enlaces: [
              { de: "reino", a: "mostaza", relacion: "crece desde lo pequeño como" },
              { de: "reino", a: "levadura", relacion: "transforma desde dentro como" },
              { de: "reino", a: "tesoro", relacion: "vale más que todo, como" },
            ],
            distractores: ["se queda pequeño como", "vale poco, como"],
            apoyo: "Las parábolas del reino enseñan cómo es",
            ref: "Mateo 13:31-33",
            explica: "Las parábolas del reino enseñan cómo es: crece desde algo pequeño, como la semilla de mostaza; transforma desde dentro, como la levadura; y vale más que todo, como el tesoro escondido.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el reino que ya llegó y que todavía vendrá: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El reino de Dios ya llegó con Jesús, pero todavía no en su plenitud.", verdad: true, explica: "Los estudiosos lo resumen así: el reino ya está aquí, y todavía no del todo.", apoyo: "El reino ya llegó con Jesús, pero todavía no en su plenitud", ref: "Mateo 6:10" },
              { texto: "Si el reino ya llegó, orar «Venga tu reino» es inútil.", verdad: false, explica: "Como el reino todavía no llegó en su plenitud, oramos «Venga tu reino».", apoyo: "por eso oramos «Venga tu reino»", ref: "Mateo 6:10" },
              { texto: "Los milagros de Jesús eran señales del reino.", verdad: true, explica: "Cuando echaba fuera demonios, Jesús decía que el reino de Dios había llegado.", apoyo: "Los milagros de Jesús eran señales del reino", ref: "Lucas 11:20" },
            ],
          },
          {
            consigna: "Sobre los milagros y las parábolas del reino: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando Jesús echaba fuera demonios, mostraba que el reino había llegado.", verdad: true, explica: "Jesús decía: «ciertamente el reino de Dios ha llegado a vosotros».", apoyo: "Cuando echaba fuera demonios, decía: «ciertamente el reino de Dios ha llegado a vosotros»", ref: "Lucas 11:20" },
              { texto: "La semilla de mostaza enseña que el reino empieza grande y se achica.", verdad: false, explica: "Es al revés: el reino crece desde algo pequeño, como la semilla de mostaza.", apoyo: "crece desde algo pequeño, como la semilla de mostaza", ref: "Mateo 13:31-32" },
              { texto: "Como la levadura, el reino transforma desde dentro.", verdad: true, explica: "La parábola de la levadura enseña que el reino transforma desde dentro.", apoyo: "transforma desde dentro, como la levadura", ref: "Mateo 13:33" },
              { texto: "Con Jesús, el reino de Dios llegó ya en toda su plenitud.", verdad: false, explica: "El reino ya llegó con Jesús, pero todavía no en su plenitud: por eso oramos «Venga tu reino».", apoyo: "El reino ya llegó con Jesús, pero todavía no en su plenitud", ref: "Mateo 6:10" },
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
            consigna: "¿Es una de las siete señales o uno de los siete Yo soy de Juan? Lleva cada frase a su grupo.",
            grupos: ["Una de las siete señales", "Uno de los siete Yo soy"],
            frases: [
              { texto: "El agua convertida en vino", grupo: 0 },
              { texto: "La sanidad del hijo del oficial", grupo: 0 },
              { texto: "El paralítico de Betesda", grupo: 0 },
              { texto: "El ciego de nacimiento", grupo: 0 },
              { texto: "El pan de vida", grupo: 1 },
              { texto: "La luz del mundo", grupo: 1 },
              { texto: "La puerta", grupo: 1 },
              { texto: "El buen pastor", grupo: 1 },
            ],
            apoyo: "Siete señales: el agua convertida en vino, la sanidad del hijo del oficial, el paralítico de Betesda",
            ref: "Juan 20:30-31",
            explica: "Juan cuenta siete señales, como el agua convertida en vino y el ciego de nacimiento, y siete Yo soy, como el pan de vida y el buen pastor.",
          },
          {
            consigna: "¿Es una señal que Jesús hizo o un Yo soy que Jesús dijo? Lleva cada frase a su grupo.",
            grupos: ["Una señal que hizo", "Un Yo soy que dijo"],
            frases: [
              { texto: "La multiplicación de los panes", grupo: 0 },
              { texto: "Jesús andando sobre el mar", grupo: 0 },
              { texto: "La resurrección de Lázaro", grupo: 0 },
              { texto: "La resurrección y la vida", grupo: 1 },
              { texto: "El camino, la verdad y la vida", grupo: 1 },
              { texto: "La vid verdadera", grupo: 1 },
            ],
            apoyo: "la resurrección y la vida (11:25), el camino, la verdad y la vida (14:6) y la vid verdadera (15:1)",
            ref: "Juan 14:6",
            explica: "La multiplicación de los panes, Jesús andando sobre el mar y la resurrección de Lázaro son señales; la resurrección y la vida, el camino, la verdad y la vida, y la vid verdadera son Yo soy.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un nuevo creyente de tu célula te dice: Ya terminé el curso de discipulado; ya soy discípulo y no necesito más.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el discipulado no es un curso, sino una vida con Jesús.", bien: true, explica: "El discipulado no es un curso, sino una vida con Jesús: negarse a sí mismo, tomar su cruz y seguirlo." },
              { texto: "Que tiene razón: con el curso aprobado ya cumplió con todo.", explica: "Entrar al reino es seguir al Rey: el discipulado es una vida con Jesús, no un curso aprobado." },
              { texto: "Que ahora le falta otro curso, y con ese ya será discípulo.", explica: "El discipulado no se completa con cursos: es una vida con Jesús." },
              { texto: "Que seguir a Jesús era solo para los doce que él llamó a estar con él.", explica: "Jesús dijo: «Si alguno quiere venir en pos de mí, niéguese a sí mismo, y tome su cruz, y sígame»: el llamado es para todos." },
            ],
            apoyo: "El discipulado no es un curso, sino una vida con Jesús",
            ref: "Marcos 8:34",
            explica: "Jesús llamó a doce para que estuvieran con él y para enviarlos a predicar. Entrar al reino es seguir al Rey: el discipulado no es un curso, sino una vida con Jesús.",
          },
          {
            caso: "Una joven que acompañas en la fe te dice: Quiero seguir a Jesús, pero sin dejar nada de lo que hago ahora.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que seguir a Jesús es negarse a sí misma, tomar su cruz y seguirlo.", bien: true, explica: "Entrar al reino es seguir al Rey: «Si alguno quiere venir en pos de mí, niéguese a sí mismo, y tome su cruz, y sígame»." },
              { texto: "Que está bien, porque seguir a Jesús no le va a pedir ningún cambio.", explica: "Jesús llama a negarse a sí mismo y a tomar su cruz: seguirlo cambia la vida." },
              { texto: "Que basta con aprobar un curso, y así ya será discípula de Jesús.", explica: "El discipulado no es un curso, sino una vida con Jesús." },
              { texto: "Que la cruz era solo para Jesús, y que a ella solo le toca creer.", explica: "Jesús dijo «Si alguno quiere venir en pos de mí»: tomar su cruz es para cada uno que lo sigue." },
            ],
            apoyo: "Entrar al reino es seguir al Rey",
            ref: "Marcos 8:34",
            explica: "Entrar al reino es seguir al Rey: negarse a sí mismo, tomar su cruz y seguirlo. El discipulado no es un curso, sino una vida con Jesús.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El reino de Dios es el reinado de Dios: su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto",
            ref: "Marcos 1:14-15",
            clave: {
              id: "pr-n3-evangelios-hechos-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el reino de Dios que anunció Jesús, y en quién llega?",
              ideas: [
                { id: "gobierno", peso: 50, texto: "Es el reinado de Dios: su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto.", formas: ["reinado", "gobierno", "gobierna", "salvar", "sanar", "restaur*", "lo que el pecado"] },
                { id: "jesus", peso: 50, texto: "Llega en la persona de Jesús.", formas: ["persona de (jesus|cristo)", "su persona", "(llega|llego|vino|viene) (en|con) (jesus|cristo)", "en (jesus|cristo) (mismo|llega|llego)", "(jesus|cristo) (mismo|trae)"] },
              ],
              modelo: "Es el reinado de Dios: su gobierno, que llega para salvar, sanar y restaurar lo que el pecado había roto. Ese reino llega en la persona de Jesús.",
            },
          },
          {
            apoyo: "Jesús no comenzó su ministerio con una lista de reglas, sino con una noticia",
            ref: "Marcos 1:14-15",
            clave: {
              id: "pr-n3-evangelios-hechos-3-a7-2",
              tipo: "corta",
              pregunta: "¿Con qué noticia comenzó Jesús su ministerio, y qué pedía a los que la oían?",
              ideas: [
                { id: "acercado", peso: 50, texto: "Que el reino de Dios se había acercado: el tiempo se había cumplido.", formas: ["se (ha|habia) acercado", "acercado", "reino de dios (se|esta|estaba|ha|habia) (acerc*|cerca|llegado)", "reino (ha|habia) llegado", "llego el reino", "tiempo se (ha|habia) cumplido", "reino (esta|estaba) cerca", "cerca el reino"] },
                { id: "arrepentirse", peso: 50, texto: "Pedía que se arrepintieran y creyeran en el evangelio.", formas: ["arrepent*", "arrepient*", "arrepint*", "(creer|crean|creyeran|creyera|crea|creyendo) en el evangelio"] },
              ],
              modelo: "Comenzó con la noticia de que el tiempo se había cumplido y el reino de Dios se había acercado. A los que lo oían les pedía que se arrepintieran y creyeran en el evangelio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La cruz y la resurrección
    "n3-evangelios-hechos-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuánto de su relato dedican los evangelios a la última semana de Jesús?", reverso: "Casi un tercio.", apoyo: "Los evangelios dedican a la última semana de Jesús casi un tercio de su relato" },
              { frente: "¿Qué anunció Jesús varias veces sobre su muerte?", reverso: "Que le era necesario padecer, ser muerto y resucitar al tercer día.", apoyo: "Jesús anunció varias veces que le era necesario padecer, ser muerto y resucitar al tercer día" },
              { frente: "¿Cuándo dio Jesús un sentido nuevo al pan y a la copa?", reverso: "En la última cena, durante la Pascua.", apoyo: "En la última cena, durante la Pascua, Jesús tomó el pan y la copa y les dio un sentido nuevo" },
              { frente: "¿Qué dijo Jesús antes de entregar el espíritu?", reverso: "«Consumado es»: la obra de salvación estaba completa.", apoyo: "Antes de entregar el espíritu dijo: «Consumado es»" },
            ],
          },
          {
            tarjetas: [
              { frente: "Si la muerte de Jesús no fue un accidente ni una derrota, ¿qué fue?", reverso: "El propósito de su venida.", apoyo: "Su muerte no fue un accidente ni una derrota: fue el propósito de su venida" },
              { frente: "¿Qué inauguraba la muerte de Jesús, según lo anunciado por los profetas?", reverso: "El nuevo pacto.", apoyo: "Su muerte inauguraba el nuevo pacto que habían anunciado los profetas" },
              { frente: "¿Qué encontraron las mujeres el primer día de la semana?", reverso: "La tumba vacía.", apoyo: "El primer día de la semana, las mujeres encontraron la tumba vacía" },
              { frente: "¿Qué anunciaron los ángeles cuando Jesús ascendió al cielo?", reverso: "Que volverá de la misma manera.", apoyo: "Después ascendió al cielo, y los ángeles anunciaron que volverá de la misma manera" },
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
            consigna: "Sobre la última semana de Jesús: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los evangelios dedican a la última semana de Jesús casi un tercio de su relato.", verdad: true, explica: "Una biografía común dedica a la muerte unas pocas páginas; los evangelios, casi un tercio: allí está el centro del evangelio.", apoyo: "Los evangelios dedican a la última semana de Jesús casi un tercio de su relato" },
              { texto: "La muerte de Jesús fue un accidente que nadie esperaba.", verdad: false, explica: "Jesús anunció varias veces que le era necesario padecer y ser muerto: su muerte fue el propósito de su venida.", apoyo: "Su muerte no fue un accidente ni una derrota: fue el propósito de su venida", ref: "Marcos 8:31" },
              { texto: "En la última semana de Jesús está el centro del evangelio.", verdad: true, explica: "Por eso los evangelios le dedican casi un tercio de su relato.", apoyo: "Allí está el centro del evangelio" },
            ],
          },
          {
            consigna: "Sobre la muerte de Jesús: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La muerte de Jesús fue el propósito de su venida.", verdad: true, explica: "Él mismo lo explicó: vino para servir y para dar su vida en rescate por muchos.", apoyo: "fue el propósito de su venida", ref: "Marcos 10:45" },
              { texto: "La cruz fue una derrota de la que Jesús no habló antes.", verdad: false, explica: "Jesús anunció varias veces que le era necesario padecer; su muerte no fue una derrota.", apoyo: "Jesús anunció varias veces que le era necesario padecer, ser muerto y resucitar al tercer día", ref: "Marcos 8:31" },
              { texto: "Los evangelios dedican a la muerte de Jesús unas pocas páginas, como una biografía común.", verdad: false, explica: "Una biografía común dedica unas pocas páginas; los evangelios dedican casi un tercio de su relato a la última semana.", apoyo: "Una biografía común dedica a la muerte de su personaje unas pocas páginas" },
              { texto: "Toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía.", verdad: true, explica: "De primera importancia es que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", apoyo: "Toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía", ref: "1 Corintios 15:3-4" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "El sentido de la muerte de Jesús: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jesus", texto: "Jesús", x: 50, y: 10 },
              { id: "rescate", texto: "Su vida en rescate por muchos", x: 18, y: 50 },
              { id: "pacto", texto: "El nuevo pacto en su sangre", x: 82, y: 50 },
              { id: "obra", texto: "La obra de salvación", x: 25, y: 90 },
              { id: "pecado", texto: "El pecado de muchos", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "jesus", a: "rescate", relacion: "vino a dar" },
              { de: "jesus", a: "pacto", relacion: "inauguró con su muerte" },
              { de: "jesus", a: "obra", relacion: "consumó" },
              { de: "jesus", a: "pecado", relacion: "llevó" },
            ],
            distractores: ["anuló", "dejó a medias"],
            apoyo: "La obra de salvación estaba completa",
            ref: "Marcos 10:45; Juan 19:30",
            explica: "Jesús vino a dar su vida en rescate por muchos; con su muerte inauguró el nuevo pacto, consumó la obra de salvación y llevó el pecado de muchos, como dice Isaías 53.",
          },
          {
            consigna: "La cena y el nuevo pacto: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jesus", texto: "Jesús, en la última cena", x: 50, y: 8 },
              { id: "copa", texto: "La copa", x: 20, y: 45 },
              { id: "profetas", texto: "Los profetas", x: 85, y: 45 },
              { id: "muerte", texto: "La muerte de Jesús", x: 20, y: 90 },
              { id: "pacto", texto: "El nuevo pacto en su sangre", x: 65, y: 90 },
            ],
            enlaces: [
              { de: "jesus", a: "copa", relacion: "dio un sentido nuevo a" },
              { de: "copa", a: "pacto", relacion: "es" },
              { de: "profetas", a: "pacto", relacion: "habían anunciado" },
              { de: "muerte", a: "pacto", relacion: "inauguró" },
            ],
            distractores: ["anuló", "nunca anunciaron"],
            apoyo: "Su muerte inauguraba el nuevo pacto que habían anunciado los profetas",
            ref: "Lucas 22:19-20",
            explica: "En la última cena, Jesús dio un sentido nuevo a la copa: «Esta copa es el nuevo pacto en mi sangre». Su muerte inauguró el nuevo pacto que habían anunciado los profetas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué vino a hacer el Hijo del Hombre, además de servir? Toca las palabras que lo dicen.",
            texto: "el Hijo del Hombre no vino para ser servido, sino para servir, y para [[dar su vida en rescate por muchos]]",
            apoyo: "Su muerte no fue un accidente ni una derrota: fue el propósito de su venida",
            ref: "Marcos 10:45",
            explica: "Jesús mismo lo explicó: vino a servir «y para dar su vida en rescate por muchos». Su muerte fue el propósito de su venida.",
          },
          {
            consigna: "Marcos 15:38 cuenta que el velo del templo se partió. ¿Qué palabras lo dicen? Tócalas.",
            texto: "el velo del templo [[se rasgó en dos]], de arriba abajo",
            apoyo: "el camino a la presencia de Dios quedaba abierto",
            ref: "Marcos 15:38",
            explica: "Marcos cuenta que «el velo del templo se rasgó en dos, de arriba abajo»: el camino a la presencia de Dios quedaba abierto.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que cuentan los evangelios después de la cruz, del primer hecho al último.",
            pasos: [
              "Las mujeres encuentran la tumba vacía el primer día de la semana",
              "El Señor resucitado se aparece a las mujeres y a los discípulos",
              "El Resucitado envía a hacer discípulos de todas las naciones",
              "Jesús asciende al cielo",
              "Los ángeles anuncian que Jesús volverá de la misma manera",
            ],
            apoyo: "El primer día de la semana, las mujeres encontraron la tumba vacía, y el Señor resucitado se apareció a ellas y a los discípulos",
            ref: "Mateo 28:18-20",
            explica: "El primer día de la semana, las mujeres encontraron la tumba vacía y el Resucitado se apareció; envió a hacer discípulos de todas las naciones, ascendió al cielo y los ángeles anunciaron que volverá.",
          },
          {
            consigna: "Ordena lo que Pablo transmite sobre Cristo en 1 Corintios 15, del primer hecho al último.",
            pasos: [
              "Cristo murió por nuestros pecados",
              "Fue sepultado",
              "Resucitó al tercer día",
              "Se apareció a Cefas",
              "Se apareció a los doce",
              "Se apareció a «más de quinientos hermanos a la vez»",
            ],
            apoyo: "Pablo transmite una lista antigua de testigos: Cefas, los doce y después «más de quinientos hermanos a la vez»",
            ref: "1 Corintios 15:3-6",
            explica: "De primera importancia es que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día; y Pablo transmite los testigos: Cefas, los doce y después más de quinientos hermanos a la vez.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Los discípulos, que habían huido con miedo, se convirtieron en testigos valientes que dieron su vida por anunciarlo",
            ref: "1 Corintios 15:3-6",
            situacion: "Un compañero de trabajo sabe que sirves en tu iglesia y, a la hora del almuerzo, te pregunta qué es lo más importante de tu fe.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes unos minutos para responderle.",
                pregunta: "¿Qué le cuentas primero?",
                opciones: [
                  { texto: "Que Cristo murió por nuestros pecados, fue sepultado y resucitó.", valor: 2, explica: "Es lo de primera importancia: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día." },
                  { texto: "Que Jesús fue un gran maestro que nos enseñó a amar a los demás.", valor: 1, explica: "Jesús enseñó mucho, pero toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía." },
                  { texto: "Que lo más importante es no faltar nunca a las reuniones del grupo.", valor: 0, explica: "El centro del mensaje no es una costumbre: es que Cristo murió por nuestros pecados y resucitó." },
                ],
              },
              {
                id: "e2",
                narra: "Tu compañero te dice: ¿Y cómo sabes que resucitó? Eso es difícil de creer.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le hablas de la tumba vacía y de los testigos que lo vieron vivo.", valor: 2, explica: "La tumba estaba vacía y el Resucitado se apareció a muchos: Cefas, los doce y más de quinientos hermanos a la vez." },
                  { texto: "Le dices que la resurrección es solo un símbolo, y no un hecho real.", valor: 0, explica: "Los evangelios cuentan un hecho con testigos: la tumba vacía y las apariciones del Resucitado." },
                  { texto: "Le dices que lo crees de corazón, sin darle ninguna otra razón más.", valor: 1, explica: "Tu fe vale, pero también puedes contarle de los testigos: Cefas, los doce y más de quinientos hermanos." },
                ],
              },
              {
                id: "e3",
                narra: "Unas semanas después, tu compañero cree en Jesús y quiere seguirlo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lo acompañas a crecer como discípulo: bautismo y enseñanza.", valor: 2, explica: "Jesús envió a hacer discípulos de todas las naciones, bautizándolos y enseñándoles, con la promesa de estar con ellos todos los días." },
                  { texto: "Lo felicitas y le dices que ya no necesita nada más.", valor: 0, explica: "La gran comisión no termina cuando alguien cree: es hacer discípulos, bautizándolos y enseñándoles." },
                  { texto: "Lo invitas a un culto y dejas que la iglesia haga todo lo demás.", valor: 1, explica: "Invitarlo es bueno, pero la gran comisión te envía a ti a hacer discípulos: bautizándolos y enseñándoles." },
                ],
              },
            ],
          },
          {
            apoyo: "y envió a sus discípulos a hacer discípulos de todas las naciones, bautizándolos y enseñándoles",
            ref: "Mateo 28:18-20",
            situacion: "Eres líder de una célula. El grupo está contento: cada semana se reúnen, cantan y oran juntos, pero hace meses que no llega nadie nuevo.",
            escenas: [
              {
                id: "e1",
                narra: "Quieres que el grupo entienda lo que Jesús envió a hacer a sus discípulos.",
                pregunta: "¿Qué pasaje abren juntos?",
                opciones: [
                  { texto: "La gran comisión: hacer discípulos de todas las naciones.", valor: 2, explica: "El Resucitado envió a sus discípulos a hacer discípulos de todas las naciones, bautizándolos y enseñándoles." },
                  { texto: "La lista de testigos de la resurrección, en 1 Corintios 15.", valor: 1, explica: "Es un buen pasaje sobre la resurrección, pero el envío a hacer discípulos está en la gran comisión." },
                  { texto: "Ninguno: les dices que crecer en número no es asunto de ellos.", valor: 0, explica: "Jesús envió a sus discípulos a hacer discípulos de todas las naciones: es tarea de toda la iglesia." },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano dice: Yo no sé predicar; eso es para los pastores.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Jesús prometió estar con los que envía, todos los días.", valor: 2, explica: "Jesús envió a sus discípulos a hacer discípulos, con la promesa de estar con ellos todos los días." },
                  { texto: "Que tiene razón: hacer discípulos es tarea solo de los pastores.", valor: 0, explica: "Jesús envió a sus discípulos a hacer discípulos de todas las naciones." },
                  { texto: "Que no se preocupe y que, por ahora, solo ore por los demás.", valor: 1, explica: "Orar es bueno, pero Jesús lo envía a hacer discípulos, y promete estar con él todos los días." },
                ],
              },
              {
                id: "e3",
                narra: "El grupo decide invitar a sus vecinos a la próxima reunión.",
                pregunta: "¿Qué mensaje quieres que oigan?",
                opciones: [
                  { texto: "Que Cristo murió por nuestros pecados y resucitó al tercer día.", valor: 2, explica: "Es el centro del mensaje: de primera importancia es que Cristo murió por nuestros pecados, fue sepultado y resucitó." },
                  { texto: "Que el grupo es muy alegre y que en él siempre se come muy bien.", valor: 0, explica: "La alegría del grupo es buena, pero el centro del mensaje es la cruz y la tumba vacía." },
                  { texto: "Que Jesús hizo muchos milagros cuando estaba en la tierra.", valor: 1, explica: "Sus milagros son parte del relato, pero toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía." },
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
            apoyo: "Los evangelios dedican a la última semana de Jesús casi un tercio de su relato",
            ref: "Marcos 8:31; Marcos 10:45",
            clave: {
              id: "pr-n3-evangelios-hechos-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué los evangelios dedican tanto espacio a la última semana de Jesús?",
              ideas: [
                { id: "proposito", peso: 50, texto: "Porque su muerte no fue un accidente ni una derrota: fue el propósito de su venida.", formas: ["proposito", "para eso vino", "a eso vino", "vino (a|para) (morir|dar)", "razon de su venida", "no fue un accidente", "no fue una derrota", "plan de dios", "le era necesario"] },
                { id: "centro", peso: 50, texto: "Porque allí está el centro del evangelio: dar su vida en rescate e inaugurar el nuevo pacto.", formas: ["centro", "rescate", "nuevo pacto", "lo mas importante", "primera importancia", "corazon del evangelio"] },
              ],
              modelo: "Porque su muerte no fue un accidente ni una derrota: fue el propósito de su venida. Allí está el centro del evangelio: Jesús dio su vida en rescate e inauguró el nuevo pacto.",
            },
          },
          {
            apoyo: "Su muerte no fue un accidente ni una derrota: fue el propósito de su venida",
            ref: "Marcos 8:31; 1 Corintios 15:3-4",
            clave: {
              id: "pr-n3-evangelios-hechos-4-a7-2",
              tipo: "corta",
              pregunta: "Una biografía común dedica a la muerte de su personaje unas pocas páginas. ¿Por qué los evangelios no hacen lo mismo con Jesús?",
              ideas: [
                { id: "anuncio", peso: 50, texto: "Jesús anunció varias veces que le era necesario padecer, ser muerto y resucitar: su muerte fue el propósito de su venida.", formas: ["anunci* varias", "anunci* muchas", "lo anunci*", "le era necesario", "necesario (padecer|morir)", "proposito", "para eso vino", "a eso vino", "vino (a|para) (morir|dar)", "no fue un accidente", "no fue una derrota"] },
                { id: "centro", peso: 50, texto: "Allí está el centro del evangelio: toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía.", formas: ["centro", "conduce a la cruz", "tumba vacia", "primera importancia", "lo mas importante", "corazon del evangelio"] },
              ],
              modelo: "Porque su muerte no fue un accidente: Jesús anunció varias veces que le era necesario padecer, ser muerto y resucitar. Allí está el centro del evangelio: toda enseñanza conduce a la cruz y a la tumba vacía.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Hechos 1 al 12: de Jerusalén a Antioquía
    "n3-evangelios-hechos-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es Hechos en la obra de Lucas?", reverso: "La segunda parte: lo que Jesús siguió haciendo por medio de su Espíritu y de su iglesia.", apoyo: "Hechos es la segunda parte de la obra de Lucas" },
              { frente: "¿Qué prometió Jesús antes de ascender?", reverso: "El poder del Espíritu Santo para ser sus testigos.", apoyo: "Antes de ascender, Jesús prometió el poder del Espíritu Santo para ser sus testigos" },
              { frente: "¿Qué capítulos de Hechos cuentan el testimonio en Jerusalén?", reverso: "Los capítulos 1 al 7.", apoyo: "Ese versículo es el plan del libro: Jerusalén (capítulos 1 al 7)" },
              { frente: "¿Cómo dicen muchos maestros que podría llamarse Hechos?", reverso: "Hechos del Espíritu Santo.", apoyo: "muchos maestros dicen que podría llamarse Hechos del Espíritu Santo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo fue la fiesta de Pentecostés?", reverso: "Cincuenta días después de la Pascua.", apoyo: "En la fiesta de Pentecostés, cincuenta días después de la Pascua" },
              { frente: "¿Qué profecía explicó Pedro que se cumplía en Pentecostés?", reverso: "La de Joel: «Derramaré de mi Espíritu sobre toda carne».", apoyo: "Pedro explicó que se cumplía la profecía de Joel" },
              { frente: "¿Cuántas personas se añadieron el día de Pentecostés?", reverso: "Como tres mil personas.", apoyo: "Ese día se añadieron como tres mil personas" },
              { frente: "¿Dónde se llamó cristianos a los discípulos por primera vez?", reverso: "En Antioquía de Siria.", apoyo: "allí «a los discípulos se les llamó cristianos por primera vez»" },
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
            consigna: "Une cada parte de Hechos 1:8 con los capítulos de Hechos que la cuentan.",
            pares: [
              ["Jerusalén", "Capítulos 1 al 7"],
              ["Judea y Samaria", "Capítulos 8 al 12"],
              ["Hasta lo último de la tierra", "Capítulos 13 al 28"],
            ],
            apoyo: "Ese versículo es el plan del libro: Jerusalén (capítulos 1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28)",
            ref: "Hechos 1:8",
            explica: "Hechos 1:8 es el plan del libro: Jerusalén (capítulos 1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28).",
          },
          {
            consigna: "Une cada pregunta sobre Hechos 1:8 con su respuesta.",
            pares: [
              ["¿Quién da el poder?", "El Espíritu Santo"],
              ["¿Para qué es el poder?", "Para ser testigos de Jesús"],
              ["¿Dónde empieza el testimonio?", "En Jerusalén"],
              ["¿Hasta dónde llega?", "Hasta lo último de la tierra"],
            ],
            apoyo: "Antes de ascender, Jesús prometió el poder del Espíritu Santo para ser sus testigos",
            ref: "Hechos 1:8",
            explica: "Antes de ascender, Jesús prometió el poder del Espíritu Santo para ser sus testigos en Jerusalén, en toda Judea, en Samaria y hasta lo último de la tierra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa las marcas de la primera iglesia.",
            texto: "En Pentecostés nació la iglesia, que perseveraba en la [[doctrina]], la [[comunión]], el partimiento del pan y la [[oración]].",
            distractores: ["fama", "división", "queja"],
            errores: {
              fama: "La iglesia perseveraba en la doctrina de los apóstoles.",
              "división": "Los creyentes perseveraban en la comunión unos con otros.",
              queja: "La primera iglesia perseveraba en las oraciones.",
            },
            apoyo: "nació la iglesia, que perseveraba en la doctrina, la comunión, el partimiento del pan y la oración",
            ref: "Hechos 2:42",
            explica: "Los creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».",
          },
          {
            consigna: "Completa lo que pasó el día de Pentecostés.",
            texto: "En la fiesta de Pentecostés, cincuenta días después de la [[Pascua]], vino el [[Espíritu]], [[Pedro]] predicó y se añadieron como tres mil personas.",
            distractores: ["Navidad", "ángel", "Pablo"],
            errores: {
              Navidad: "Pentecostés fue cincuenta días después de la Pascua.",
              "ángel": "En Pentecostés vino el Espíritu, con un estruendo como de viento y lenguas como de fuego.",
              Pablo: "Ese día predicó Pedro: anunció a Cristo crucificado y resucitado.",
            },
            apoyo: "En la fiesta de Pentecostés, cincuenta días después de la Pascua",
            ref: "Hechos 2:1-4",
            explica: "En Pentecostés, cincuenta días después de la Pascua, el Espíritu vino con un estruendo como de viento; Pedro predicó a Cristo crucificado y resucitado, y se añadieron como tres mil personas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Pentecostés tiene un error. Tócala.",
            frases: [
              "Pentecostés fue cincuenta días después de la Pascua.",
              "El Espíritu vino con un estruendo como de viento y lenguas como de fuego.",
              "Pedro explicó que se cumplía la profecía de Jeremías.",
              "Pedro predicó a Cristo crucificado y resucitado.",
            ],
            malo: 2,
            correccion: "Pedro explicó que se cumplía la profecía de Joel: «Derramaré de mi Espíritu sobre toda carne».",
            apoyo: "Pedro explicó que se cumplía la profecía de Joel",
            ref: "Hechos 2:16-17",
            explica: "En Pentecostés, cincuenta días después de la Pascua, Pedro explicó que se cumplía la profecía de Joel y predicó a Cristo crucificado y resucitado.",
          },
          {
            consigna: "Una de estas frases sobre la primera iglesia tiene un error. Tócala.",
            frases: [
              "Los creyentes perseveraban en la doctrina de los apóstoles.",
              "Los creyentes compartían sus bienes con los necesitados.",
              "Ante las amenazas, Pedro y Juan decidieron callar.",
              "El Señor añadía cada día a los que habían de ser salvos.",
            ],
            malo: 2,
            correccion: "Ante las amenazas, Pedro y Juan dijeron: «no podemos dejar de decir lo que hemos visto y oído».",
            apoyo: "Ante las amenazas, Pedro y Juan dijeron: «no podemos dejar de decir lo que hemos visto y oído»",
            ref: "Hechos 4:20",
            explica: "La primera iglesia perseveraba en la doctrina, compartía sus bienes con los necesitados y, ante las amenazas, no dejó de anunciar lo que había visto y oído.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Esos vecinos nuevos son de otra cultura; mejor invitamos solo a los nuestros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios no hace acepción de personas: el evangelio es para ellos también.", bien: true, explica: "En casa de Cornelio, un centurión romano, Pedro entendió que «Dios no hace acepción de personas»." },
              { texto: "Que tiene razón: el evangelio llega primero a los de nuestra cultura.", explica: "Dios no hace acepción de personas: el evangelio llegó a Samaria y a los gentiles." },
              { texto: "Que los invite, pero solo si antes dejan sus costumbres y toman las nuestras.", explica: "En casa de Cornelio, el Espíritu Santo cayó sobre los gentiles que oían: Dios no hace acepción de personas." },
              { texto: "Que no invite a nadie de fuera: la célula es solo para los de la iglesia.", explica: "Los creyentes iban por todas partes anunciando el evangelio, y en Antioquía nació una iglesia de judíos y gentiles." },
            ],
            apoyo: "En casa de Cornelio, un centurión romano, Pedro entendió que «Dios no hace acepción de personas»",
            ref: "Hechos 10:34-35",
            explica: "En casa de Cornelio, Pedro entendió que Dios no hace acepción de personas, y el Espíritu Santo cayó sobre los gentiles que oían. El evangelio es para todos.",
          },
          {
            caso: "Un hermano de tu célula tuvo que mudarse a otra ciudad y te escribe: Aquí no conozco a nadie de la iglesia; ¿qué hago con mi fe?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que haga como los creyentes esparcidos: anunciar el evangelio donde vaya.", bien: true, explica: "Los creyentes esparcidos por la persecución «iban por todas partes anunciando el evangelio»: así llegó a Samaria." },
              { texto: "Que guarde su fe para cuando vuelva, porque allá no tiene una iglesia.", explica: "Los creyentes que tuvieron que salir no guardaron su fe: iban por todas partes anunciando el evangelio." },
              { texto: "Que primero espere a que llegue un pastor a esa ciudad, antes de hablar de Jesús.", explica: "Los creyentes esparcidos anunciaban el evangelio por todas partes, y Felipe predicó en Samaria." },
              { texto: "Que no hable de Jesús con nadie de allá, para no tener problemas.", explica: "Ante las amenazas, Pedro y Juan dijeron: «no podemos dejar de decir lo que hemos visto y oído»." },
            ],
            apoyo: "La persecución que siguió a la muerte de Esteban esparció a los creyentes, que «iban por todas partes anunciando el evangelio»",
            ref: "Hechos 8:4",
            explica: "La persecución esparció a los creyentes, y ellos iban por todas partes anunciando el evangelio: así llegó a Samaria y a los gentiles.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo avanzó el evangelio desde Pentecostés, del primer hecho al último.",
            eventos: [
              { texto: "Como tres mil personas se añaden a la iglesia", fecha: "Pentecostés (Hechos 2:41)" },
              { texto: "La persecución tras la muerte de Esteban esparce a los creyentes", fecha: "Hechos 8:4" },
              { texto: "Saulo, el perseguidor, se encuentra con Jesús camino a Damasco", fecha: "Hechos 9" },
              { texto: "Pedro entiende en casa de Cornelio que Dios no hace acepción de personas", fecha: "Hechos 10:34" },
              { texto: "Bernabé y Saulo enseñan un año entero a la iglesia de Antioquía", fecha: "Hechos 11:26" },
            ],
            apoyo: "la persecución la esparció, y el evangelio llegó a Samaria, a los gentiles y a Antioquía",
            ref: "Hechos 8:4",
            explica: "Después de Pentecostés, la persecución esparció a los creyentes; Saulo se encontró con Jesús, Pedro entendió en casa de Cornelio que Dios no hace acepción de personas, y en Antioquía nació una iglesia de judíos y gentiles.",
          },
          {
            consigna: "Ordena en el tiempo cómo llegó el evangelio a Samaria y a los gentiles, del primer hecho al último.",
            eventos: [
              { texto: "Ante las amenazas, Pedro y Juan siguen anunciando lo que vieron y oyeron", fecha: "Hechos 4:20" },
              { texto: "Felipe predica en Samaria y al etíope", fecha: "Tras la muerte de Esteban" },
              { texto: "El perseguidor Saulo se encuentra con Jesús en el camino a Damasco", fecha: "Hechos 9" },
              { texto: "El Espíritu Santo cae sobre los gentiles en casa de Cornelio", fecha: "Hechos 10:34" },
              { texto: "En Antioquía, a los discípulos se les llama cristianos por primera vez", fecha: "Hechos 11:26" },
            ],
            apoyo: "Felipe predicó en Samaria y al etíope",
            ref: "Hechos 10:34-35",
            explica: "Pedro y Juan siguieron anunciando ante las amenazas; tras la muerte de Esteban, Felipe predicó en Samaria; Saulo se encontró con Jesús; el Espíritu cayó sobre los gentiles en casa de Cornelio, y en Antioquía los llamaron cristianos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Hechos 1:8 es el plan del libro: testigos en Jerusalén, Judea, Samaria y hasta lo último de la tierra, con el poder del Espíritu",
            ref: "Hechos 1:8",
            clave: {
              id: "pr-n3-evangelios-hechos-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué prometió Jesús en Hechos 1:8, y cómo sigue el libro de Hechos ese plan?",
              ideas: [
                { id: "poder", peso: 50, texto: "Jesús prometió el poder del Espíritu Santo para ser sus testigos.", formas: ["poder del espiritu", "espiritu santo", "testigos", "testimonio"] },
                { id: "plan", peso: 50, texto: "El libro sigue el plan: Jerusalén (capítulos 1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28).", formas: ["jerusalen judea", "judea y samaria", "primero (en|de) jerusalen", "(empieza|comienza|empezo|comenzo|parte|sale|salio) (en|de|desde) jerusalen", "desde jerusalen", "lo ultimo de la tierra", "fin de la tierra"] },
              ],
              modelo: "Jesús prometió el poder del Espíritu Santo para ser sus testigos. El libro sigue ese plan: primero en Jerusalén, después en Judea y Samaria, y al final hasta lo último de la tierra.",
            },
          },
          {
            apoyo: "Ese versículo es el plan del libro: Jerusalén (capítulos 1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28)",
            ref: "Hechos 1:8",
            clave: {
              id: "pr-n3-evangelios-hechos-5-a7-2",
              tipo: "corta",
              pregunta: "¿En qué orden avanza el testimonio en el libro de Hechos, y qué capítulos cuentan cada etapa?",
              ideas: [
                { id: "orden", peso: 50, texto: "Primero en Jerusalén, después en Judea y Samaria, y al final hasta lo último de la tierra.", formas: ["jerusalen judea", "judea y samaria", "primero (en|de) jerusalen", "(empieza|comienza|empezo|comenzo|parte|sale|salio) (en|de|desde) jerusalen", "desde jerusalen"] },
                { id: "capitulos", peso: 50, texto: "Jerusalén en los capítulos 1 al 7; Judea y Samaria, del 8 al 12; y lo último de la tierra, del 13 al 28.", formas: ["1 al 7", "8 al 12", "13 al 28", "1 a 7", "8 a 12", "13 a 28", "uno al siete", "ocho al doce", "trece al veintiocho"] },
              ],
              modelo: "Avanza primero en Jerusalén, en los capítulos 1 al 7; después en Judea y Samaria, del 8 al 12; y al final hasta lo último de la tierra, del 13 al 28.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Hechos 13 al 28: hasta lo último de la tierra
    "n3-evangelios-hechos-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con quién hizo Pablo su primer viaje?", reverso: "Con Bernabé.", apoyo: "Primer viaje (Hechos 13 y 14): con Bernabé" },
              { frente: "¿A qué continente cruzaron en el segundo viaje?", reverso: "A Europa: Filipos, Tesalónica, Berea, Atenas y Corinto.", apoyo: "cruzan a Europa: Filipos, Tesalónica, Berea, Atenas y Corinto" },
              { frente: "¿Cuánto tiempo pasó Pablo en Éfeso en el tercer viaje?", reverso: "Casi tres años.", apoyo: "Tercer viaje (Hechos 18:23 a 21:16): casi tres años en Éfeso" },
              { frente: "¿Dónde naufragó Pablo en el viaje a Roma?", reverso: "En Malta.", apoyo: "con un naufragio en Malta" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le rogaba a Pablo el varón macedonio de la visión?", reverso: "Que pasara a Macedonia a ayudarlos.", apoyo: "Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos»" },
              { frente: "¿Qué preguntó el carcelero de Filipos?", reverso: "Qué debía hacer para ser salvo.", apoyo: "En Filipos, el carcelero preguntó qué debía hacer para ser salvo" },
              { frente: "¿De qué partió Pablo en Atenas para anunciar al Dios creador?", reverso: "De un altar dedicado al dios no conocido.", apoyo: "En Atenas, Pablo partió de un altar dedicado al dios no conocido para anunciar al Dios creador y a Cristo resucitado" },
              { frente: "¿Por qué Pablo pudo apelar al César?", reverso: "Porque era ciudadano romano.", apoyo: "como ciudadano romano, apeló al César" },
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
            consigna: "Sigue a Pablo por las puertas que Dios le abrió. Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Con Bernabé, va a Chipre y a las ciudades de Galacia", fecha: "Hechos 13 y 14" },
              { texto: "Un varón macedonio le pide en visión que pase a ayudarlos", fecha: "Hechos 16:9" },
              { texto: "En Filipos, el carcelero le pregunta qué debe hacer para ser salvo", fecha: "Hechos 16:31" },
              { texto: "En Atenas, parte de un altar dedicado al dios no conocido", fecha: "Hechos 17:22-31" },
              { texto: "Se despide de los ancianos de Éfeso", fecha: "Hechos 20:24" },
              { texto: "Predica en Roma, abiertamente y sin impedimento", fecha: "Hechos 28:30-31" },
            ],
            apoyo: "En el segundo viaje, Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos»",
            ref: "Hechos 16:9",
            explica: "Pablo fue con Bernabé a Chipre y a Galacia (Hechos 13 y 14); una visión lo llamó a Macedonia (16:9); en Filipos respondió al carcelero (16:31) y en Atenas anunció al Dios creador (17); se despidió de los ancianos de Éfeso (20) y terminó en Roma, predicando sin impedimento (28).",
          },
          {
            consigna: "Sigue a Pablo por sus viajes. Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Visita Iconio, Listra y Derbe, ciudades de Galacia", fecha: "Primer viaje" },
              { texto: "Ve en visión a un varón macedonio que le pide ayuda", fecha: "Segundo viaje" },
              { texto: "Pasa casi tres años en Éfeso", fecha: "Tercer viaje" },
              { texto: "Es arrestado en Jerusalén y apela al César", fecha: "Tras la despedida en Mileto" },
              { texto: "Naufraga en Malta camino a Roma", fecha: "Hechos 27 y 28" },
              { texto: "Predica en Roma, en una casa alquilada, sin impedimento", fecha: "Al final de Hechos" },
            ],
            apoyo: "Tercer viaje (Hechos 18:23 a 21:16): casi tres años en Éfeso y la despedida de los ancianos en Mileto",
            ref: "Hechos 16:9",
            explica: "En el primer viaje, Pablo fue a las ciudades de Galacia; en el segundo, una visión lo llamó a Macedonia; en el tercero pasó casi tres años en Éfeso. Después fue arrestado en Jerusalén, naufragó en Malta y llegó a Roma.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿En qué viaje de Pablo estuvo cada ciudad? Lleva cada frase a su grupo.",
            grupos: ["Primer viaje", "Segundo viaje", "Tercer viaje"],
            frases: [
              { texto: "Iconio", grupo: 0 },
              { texto: "Listra", grupo: 0 },
              { texto: "Derbe", grupo: 0 },
              { texto: "Filipos", grupo: 1 },
              { texto: "Atenas", grupo: 1 },
              { texto: "Corinto", grupo: 1 },
              { texto: "Éfeso", grupo: 2 },
              { texto: "Mileto", grupo: 2 },
            ],
            apoyo: "Segundo viaje (Hechos 15:36 a 18:22): con Silas, y después Timoteo y Lucas; cruzan a Europa: Filipos, Tesalónica, Berea, Atenas y Corinto",
            explica: "En el primer viaje, Pablo fue a las ciudades de Galacia: Iconio, Listra y Derbe. En el segundo cruzó a Europa: Filipos, Atenas y Corinto. En el tercero estuvo casi tres años en Éfeso y se despidió en Mileto.",
          },
          {
            consigna: "¿Pasó en el primer viaje de Pablo o en el segundo? Lleva cada frase a su grupo.",
            grupos: ["Primer viaje", "Segundo viaje"],
            frases: [
              { texto: "Pablo viaja con Bernabé", grupo: 0 },
              { texto: "Van de Antioquía a Chipre", grupo: 0 },
              { texto: "Recorren las ciudades de Galacia", grupo: 0 },
              { texto: "Llegan a Antioquía de Pisidia", grupo: 0 },
              { texto: "Pablo viaja con Silas", grupo: 1 },
              { texto: "Timoteo y Lucas se suman al grupo", grupo: 1 },
              { texto: "Cruzan a Europa", grupo: 1 },
              { texto: "Un varón macedonio le pide ayuda en visión", grupo: 1 },
            ],
            apoyo: "Primer viaje (Hechos 13 y 14): con Bernabé, desde Antioquía a Chipre y a las ciudades de Galacia, como Antioquía de Pisidia, Iconio, Listra y Derbe",
            ref: "Hechos 16:9",
            explica: "En el primer viaje, Pablo fue con Bernabé a Chipre y a las ciudades de Galacia. En el segundo fue con Silas, después se sumaron Timoteo y Lucas, y una visión los llevó a Europa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que decidió el concilio de Jerusalén.",
            texto: "La salvación es por [[gracia]], para judíos y gentiles por [[igual]], y la iglesia lo resolvió escuchando la [[Escritura]] y al Espíritu.",
            distractores: ["obras", "separado", "costumbre"],
            errores: {
              obras: "La salvación es por gracia: así concluyó Pedro en el concilio.",
              separado: "Judíos y gentiles se salvan de igual modo: por la gracia del Señor Jesús.",
              costumbre: "La iglesia lo resolvió escuchando la Escritura y al Espíritu.",
            },
            apoyo: "La salvación es por gracia, para judíos y gentiles por igual, y la iglesia lo resolvió escuchando la Escritura y al Espíritu",
            ref: "Hechos 15:11",
            explica: "Pedro concluyó: «Antes creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos». La salvación es por gracia, para judíos y gentiles por igual.",
          },
          {
            consigna: "Completa lo que enseñaban algunos y lo que concluyó Pedro en el concilio.",
            texto: "Algunos enseñaban que los gentiles debían guardar la [[ley]] de [[Moisés]] para ser salvos, pero Pedro concluyó que judíos y gentiles se salvan por la [[gracia]] del Señor Jesús.",
            distractores: ["fiesta", "David", "suerte"],
            errores: {
              fiesta: "Algunos enseñaban que los gentiles debían circuncidarse y guardar la ley de Moisés.",
              David: "Lo que algunos querían imponer a los gentiles era la ley de Moisés.",
              suerte: "Pedro concluyó: «Antes creemos que por la gracia del Señor Jesús seremos salvos».",
            },
            apoyo: "Hacia el año 49, algunos enseñaban que los gentiles debían circuncidarse y guardar la ley de Moisés para ser salvos",
            ref: "Hechos 15:11",
            explica: "Hacia el año 49, algunos enseñaban que los gentiles debían circuncidarse y guardar la ley de Moisés para ser salvos. Pedro concluyó que judíos y gentiles se salvan por la gracia del Señor Jesús.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Hechos describe una iglesia que ora, obedece al Espíritu, cruza fronteras, sufre con gozo y resuelve sus conflictos con la Palabra",
            ref: "Hechos 15:11",
            situacion: "Eres líder de una célula. Llega una familia nueva, de otro país, y un hermano del grupo dice que no son salvos si primero no cumplen las costumbres de la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Otros hermanos empiezan a discutir con él delante de la familia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Calmas la discusión y propones buscar juntos lo que dice la Palabra.", valor: 2, explica: "Hechos describe una iglesia que resuelve sus conflictos con la Palabra, como en el concilio de Jerusalén." },
                  { texto: "Dejas que sigan discutiendo hasta que uno de los dos lados gane la pelea.", valor: 0, explica: "Un conflicto así no se gana discutiendo: la iglesia lo resolvió escuchando la Escritura y al Espíritu." },
                  { texto: "Cambias de tema para que la familia nueva no se sienta incómoda.", valor: 1, explica: "Cuidar a la familia está bien, pero el conflicto sigue: la iglesia lo resuelve con la Palabra." },
                ],
              },
              {
                id: "e2",
                narra: "Abren juntos Hechos 15, el concilio de Jerusalén.",
                pregunta: "¿Qué les muestras?",
                opciones: [
                  { texto: "Que, según Pedro, judíos y gentiles se salvan por gracia.", valor: 2, explica: "Pedro concluyó: «Antes creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos»." },
                  { texto: "Que los gentiles debían guardar la ley de Moisés para ser salvos.", valor: 0, explica: "Eso enseñaban algunos, pero el concilio concluyó que la salvación es por gracia, para judíos y gentiles por igual." },
                  { texto: "Que los apóstoles se reunieron, sin decir lo que concluyeron.", valor: 1, explica: "La reunión es parte de la historia, pero lo importante es lo que concluyeron: la salvación es por gracia." },
                ],
              },
              {
                id: "e3",
                narra: "El hermano todavía tiene dudas y se queda callado al final.",
                pregunta: "¿Qué haces después de la reunión?",
                opciones: [
                  { texto: "Lo buscas para hablar y, si hace falta, lo ven con el pastor.", valor: 2, explica: "En el concilio, los apóstoles y los ancianos se reunieron para resolverlo: los conflictos se resuelven juntos, con la Palabra." },
                  { texto: "Lo dejas solo con sus dudas, porque ya se le explicó una vez.", valor: 0, explica: "Una explicación no siempre basta: el conflicto se resuelve con paciencia y con la Palabra." },
                  { texto: "Le pides que no vuelva al grupo hasta que piense igual que todos.", valor: 0, explica: "La iglesia de Hechos resolvió su conflicto reuniéndose y escuchando la Escritura y al Espíritu." },
                ],
              },
            ],
          },
          {
            apoyo: "La salvación es por gracia, para judíos y gentiles por igual",
            ref: "Hechos 15:11; Hechos 16:31",
            situacion: "Eres maestro de una clase de nuevos creyentes. Un alumno que viene de otra religión te pregunta qué tiene que hacer para ser salvo.",
            escenas: [
              {
                id: "e1",
                narra: "El alumno te dice: En mi religión había que ganarse el favor de Dios. ¿Qué tengo que hacer yo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que crea en el Señor Jesucristo: la salvación es por gracia.", valor: 2, explica: "Al carcelero de Filipos le respondieron: «Cree en el Señor Jesucristo, y serás salvo»; y el concilio afirmó que la salvación es por gracia." },
                  { texto: "Que primero cumpla todas las reglas de la iglesia, y después crea.", valor: 0, explica: "Eso se parece a lo que enseñaban algunos en Hechos 15, pero el concilio concluyó que la salvación es por gracia." },
                  { texto: "Que se esfuerce mucho, y así Dios quizá lo acepte algún día.", valor: 0, explica: "La salvación es por gracia: «Cree en el Señor Jesucristo, y serás salvo»." },
                ],
              },
              {
                id: "e2",
                narra: "Otro alumno dice: Primero tiene que cumplir con todas nuestras costumbres; si no, no es salvo.",
                pregunta: "¿Qué les enseñas a los dos?",
                opciones: [
                  { texto: "Que el concilio afirmó que judíos y gentiles se salvan por gracia.", valor: 2, explica: "La salvación es por gracia, para judíos y gentiles por igual: así lo concluyó la iglesia en Jerusalén." },
                  { texto: "Que tiene razón: las costumbres de la iglesia son las que nos salvan.", valor: 0, explica: "En el concilio de Jerusalén, Pedro concluyó que la salvación es por la gracia del Señor Jesús." },
                  { texto: "Que eso lo verán en la próxima clase, con más calma y tiempo.", valor: 1, explica: "Es una pregunta importante: conviene responderla ya con la Palabra, como hizo el concilio." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, los dos alumnos te piden un pasaje para estudiar en casa.",
                pregunta: "¿Qué pasaje les das?",
                opciones: [
                  { texto: "Hechos 15, donde la iglesia resolvió esto con la Escritura.", valor: 2, explica: "En Hechos 15, la iglesia resolvió el conflicto escuchando la Escritura y al Espíritu: la salvación es por gracia." },
                  { texto: "Ninguno: les dices que con lo que hablaron en clase ya basta.", valor: 0, explica: "Estudiar el pasaje en casa ayuda: así lo resolvió la iglesia, escuchando la Escritura." },
                  { texto: "Hechos 16:31, donde el carcelero pregunta qué debe hacer.", valor: 1, explica: "Es un buen pasaje sobre la salvación, pero Hechos 15 muestra cómo la iglesia resolvió esta misma pregunta." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el final del libro de Hechos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Hechos termina con Pablo preso en una casa alquilada en Roma.", verdad: true, explica: "Allí recibía a todos y predicaba el reino de Dios, abiertamente y sin impedimento.", apoyo: "Hechos termina con Pablo preso en una casa alquilada en Roma", ref: "Hechos 28:30-31" },
              { texto: "Hechos cuenta con detalle cómo terminó la vida de Pablo.", verdad: false, explica: "No lo cuenta: el libro queda abierto, porque la misión sigue.", apoyo: "No cuenta cómo terminó la vida de Pablo" },
              { texto: "En Roma, Pablo predicaba abiertamente y sin impedimento.", verdad: true, explica: "Predicaba el reino de Dios y enseñaba acerca del Señor Jesucristo, abiertamente y sin impedimento.", apoyo: "predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento", ref: "Hechos 28:31" },
            ],
          },
          {
            consigna: "Sobre el final abierto de Hechos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El libro queda abierto porque la misión sigue.", verdad: true, explica: "Cada generación de la iglesia escribe el capítulo siguiente.", apoyo: "el libro queda abierto, porque la misión sigue" },
              { texto: "Con la llegada de Pablo a Roma, la misión de la iglesia terminó.", verdad: false, explica: "La misión sigue: cada generación de la iglesia escribe el capítulo siguiente.", apoyo: "Cada generación de la iglesia escribe el capítulo siguiente" },
              { texto: "Pablo llegó a Roma libre, después de ganar sus juicios.", verdad: false, explica: "Llegó preso, después de los juicios ante Félix, Festo y Agripa, y con un naufragio en Malta.", apoyo: "preso, después de los juicios ante Félix, Festo y Agripa" },
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
            apoyo: "No cuenta cómo terminó la vida de Pablo: el libro queda abierto, porque la misión sigue",
            ref: "Hechos 28:30-31",
            clave: {
              id: "pr-n3-evangelios-hechos-6-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué Hechos termina con un final abierto, sin contar cómo terminó la vida de Pablo?",
              ideas: [
                { id: "mision", peso: 50, texto: "Porque la misión sigue: el libro queda abierto.", formas: ["mision sigue", "mision continua", "mision no termina", "mision no ha terminado", "sigue la mision", "continua la mision", "obra (sigue|continua)", "sigue abiert*", "queda abierto"] },
                { id: "generacion", peso: 50, texto: "Cada generación de la iglesia escribe el capítulo siguiente.", formas: ["cada generacion", "generacion*", "capitulo siguiente", "siguiente capitulo", "nos toca", "la iglesia (sigue|continua|escribe)", "nosotros (seguimos|continuamos|escribimos)"] },
              ],
              errores: [
                { id: "termino", texto: "La misión no terminó con Pablo: el libro queda abierto, porque la misión sigue.", formas: ["mision (termino|acabo)", "se (termino|acabo) la mision"], anula: "mision" },
              ],
              modelo: "Porque la misión sigue: el libro queda abierto, y cada generación de la iglesia escribe el capítulo siguiente. Hoy nos toca a nosotros anunciar el reino de Dios sin impedimento.",
            },
          },
          {
            apoyo: "Hechos termina con Pablo preso en una casa alquilada en Roma, recibiendo a todos",
            ref: "Hechos 28:30-31",
            clave: {
              id: "pr-n3-evangelios-hechos-6-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo termina el libro de Hechos, y qué tiene que ver ese final con la iglesia de hoy?",
              ideas: [
                { id: "roma", peso: 50, texto: "Termina con Pablo preso en una casa alquilada en Roma, predicando el reino de Dios abiertamente y sin impedimento.", formas: ["roma", "preso", "casa alquilada", "sin impedimento", "abiertamente"] },
                { id: "sigue", peso: 50, texto: "El libro queda abierto: la misión sigue y cada generación de la iglesia escribe el capítulo siguiente.", formas: ["mision sigue", "mision continua", "sigue la mision", "continua la mision", "obra (sigue|continua)", "cada generacion", "generacion*", "capitulo siguiente", "siguiente capitulo", "queda abierto", "sigue abiert*", "nos toca"] },
              ],
              errores: [
                { id: "termino", texto: "La misión no terminó con Pablo: cada generación de la iglesia escribe el capítulo siguiente.", formas: ["mision (termino|acabo)", "se (termino|acabo) la mision"], anula: "sigue" },
              ],
              modelo: "Termina con Pablo preso en una casa alquilada en Roma, predicando el reino de Dios sin impedimento. El libro queda abierto porque la misión sigue: cada generación de la iglesia escribe el capítulo siguiente.",
            },
          },
        ],
      },
    ],
  },
};
