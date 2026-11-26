/**
 * Las prácticas de «Pentateuco y libros históricos» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-pentateuco-historicos.ts), con la guía de docs/academia-practicas.md.
 * Cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección; su
 * consigna dice qué hacer y con qué criterio, para que se entienda en todas sus formas de jugar. Usa la pieza que
 * estrena el Nivel 3, el escenario ministerial (enseñar Génesis, la queja en la célula y el liderazgo de Nehemías), y la
 * línea del tiempo del reino y del regreso del exilio, con las fechas como las da la lección.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_PENTATEUCO_HISTORICOS: PracticasMateria = {
  materia: "n3-pentateuco-historicos",
  mision: {
    titulo: "Ninguna promesa faltó",
    intro: "Tu pastor te pidió que des un curso en la iglesia sobre los libros de Génesis a Ester. Antes de enseñarlo, tienes que mostrar que conoces cada libro: cómo está hecho, qué mensaje tiene y cómo apunta a Cristo. Repasa las seis lecciones para preparar el curso completo.",
    cierre: "Ya puedes enseñar de Génesis a Ester: cómo Dios cumple su promesa a Abraham en la redención, el pacto, la santidad, la tierra, el reino y el regreso, hasta Jesús, el hijo de David y el descendiente de Abraham.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Génesis: los comienzos y la promesa
    "n3-pentateuco-historicos-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo llaman los judíos a los cinco primeros libros de la Biblia?", reverso: "La Torá, que quiere decir la instrucción.", apoyo: "que los judíos llaman la Torá: la instrucción" },
              { frente: "¿Qué cuentan los capítulos 1 al 11 de Génesis?", reverso: "Los comienzos de toda la humanidad: la creación, la caída, el diluvio y Babel.", apoyo: "Los capítulos 1 al 11 cuentan los comienzos de toda la humanidad" },
              { frente: "¿Qué cuentan los capítulos 12 al 50 de Génesis?", reverso: "La historia de una familia: Abraham, Isaac, Jacob y José.", apoyo: "Los capítulos 12 al 50 cuentan la historia de una familia: Abraham, Isaac, Jacob y José." },
              { frente: "¿Con qué fórmula hebrea se abren las secciones de Génesis?", reverso: "Toledot, que la RV1960 traduce como generaciones, descendientes o historia de la familia.", apoyo: "Las secciones del libro se abren con una fórmula que en hebreo es toledot" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quién atribuyó Jesús los cinco primeros libros de la Biblia?", reverso: "A Moisés, y dijo que Moisés escribió de él.", apoyo: "Jesús los atribuyó a Moisés y dijo que Moisés escribió de él" },
              { frente: "¿Qué capítulo es la bisagra de Génesis?", reverso: "El capítulo 12, con las promesas de Dios a Abraham.", apoyo: "Génesis 12 es la bisagra del libro." },
              { frente: "¿Con quién termina el libro de Génesis?", reverso: "Con José, que perdonó a sus hermanos.", apoyo: "El libro termina con José, que perdonó a sus hermanos" },
              { frente: "¿Por qué se dice que Génesis es el libro de los comienzos?", reverso: "Porque en él empieza todo: la creación, el ser humano, el pecado y la gracia.", apoyo: "Génesis es el libro de los comienzos" },
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
            consigna: "¿En qué parte de Génesis se cuenta? Lleva cada hecho a su grupo.",
            grupos: ["Capítulos 1 al 11: la humanidad", "Capítulos 12 al 50: una familia"],
            frases: [
              { texto: "Dios crea todo por su palabra", grupo: 0 },
              { texto: "La caída en el pecado", grupo: 0 },
              { texto: "El diluvio", grupo: 0 },
              { texto: "La torre de Babel", grupo: 0 },
              { texto: "Dios promete a Abraham una tierra", grupo: 1 },
              { texto: "Jacob engaña a su padre", grupo: 1 },
              { texto: "José perdona a sus hermanos", grupo: 1, explica: "El libro termina con José, que perdonó a sus hermanos." },
            ],
            apoyo: "Los capítulos 1 al 11 cuentan los comienzos de toda la humanidad: la creación, la caída, el primer homicidio, el diluvio y la torre de Babel.",
            ref: "Génesis 1:1",
            explica: "Los capítulos 1 al 11 cuentan los comienzos de toda la humanidad; del 12 al 50, la historia de la familia de Abraham, Isaac, Jacob y José.",
          },
          {
            consigna: "¿Es de los comienzos de la humanidad o de la historia de una familia? Lleva cada hecho a su grupo.",
            grupos: ["Los comienzos de la humanidad", "La historia de una familia"],
            frases: [
              { texto: "Dios crea al ser humano a su imagen", grupo: 0 },
              { texto: "El primer homicidio", grupo: 0 },
              { texto: "Dios viste a la pareja después de la caída", grupo: 0 },
              { texto: "Abraham miente sobre su esposa", grupo: 1 },
              { texto: "Abraham le cree a Jehová", grupo: 1, explica: "Abraham «creyó a Jehová, y le fue contado por justicia» (Génesis 15:6)." },
              { texto: "Los hermanos de José lo venden", grupo: 1 },
            ],
            apoyo: "Los capítulos 12 al 50 cuentan la historia de una familia: Abraham, Isaac, Jacob y José.",
            ref: "Génesis 12:1-3",
            explica: "La creación, la caída y el primer homicidio están en los comienzos de la humanidad (capítulos 1 al 11); Abraham, Jacob y José, en la historia de una familia (12 al 50).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña Génesis sobre el ser humano.",
            texto: "El ser humano, varón y hembra, fue creado a [[imagen]] de Dios: de ahí viene la [[dignidad]] de toda persona y su tarea de [[cuidar]] la creación.",
            distractores: ["distancia", "culpa", "explotar"],
            errores: {
              distancia: "Fue creado a imagen de Dios, con capacidad de relacionarse con él.",
              culpa: "Por haber sido creada a imagen de Dios, toda persona tiene dignidad.",
              explotar: "Su tarea es cuidar y administrar la creación.",
            },
            apoyo: "El ser humano, varón y hembra, fue creado a imagen de Dios: de ahí viene la dignidad de toda persona",
            ref: "Génesis 1:27",
            explica: "Por haber sido creado a imagen de Dios, el ser humano tiene dignidad, puede relacionarse con Dios y tiene la tarea de cuidar y administrar la creación.",
          },
          {
            consigna: "Completa lo que enseña Génesis sobre la caída y la gracia.",
            texto: "La caída rompió la [[relación]] con Dios, con el prójimo y con la creación. Pero la [[gracia]] aparece desde el principio: Dios [[buscó]] a Adán y vistió a la pareja.",
            distractores: ["promesa", "ley", "olvidó"],
            errores: {
              promesa: "La caída rompió la relación con Dios; la promesa vino después, como parte de la gracia.",
              ley: "Lo que aparece desde el principio es la gracia: Dios buscó a Adán y vistió a la pareja.",
              olvidó: "Después de la caída, Dios buscó a Adán.",
            },
            apoyo: "Pero la gracia aparece desde el principio",
            ref: "Génesis 3:15",
            explica: "La caída lo rompió todo, pero la gracia aparece desde el principio: Dios buscó a Adán, vistió a la pareja y anunció la promesa que se cumple en Cristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre lo que enseña Génesis tiene un error. Tócala.",
            frases: [
              "Génesis enseña que hay un solo Dios, distinto de su creación.",
              "Dios crea por su palabra, y todo lo que hizo era bueno.",
              "Solo algunas personas fueron creadas a imagen de Dios.",
              "El ser humano tiene la tarea de cuidar y administrar la creación.",
            ],
            malo: 2,
            correccion: "El ser humano, varón y hembra, fue creado a imagen de Dios: de ahí viene la dignidad de toda persona.",
            apoyo: "de ahí viene la dignidad de toda persona",
            ref: "Génesis 1:27",
            explica: "Toda persona fue creada a imagen de Dios: de ahí vienen su dignidad, su capacidad de relacionarse con Dios y su tarea de cuidar la creación.",
          },
          {
            consigna: "Una de estas frases sobre el pecado y la primera promesa tiene un error. Tócala.",
            frases: [
              "La caída rompió la relación con Dios, con el prójimo y con la creación.",
              "Según Génesis 4 a 11, el pecado fue desapareciendo de generación en generación.",
              "Dios le anunció a la serpiente que pondría enemistad entre ella y la mujer.",
              "Los creyentes han visto en Génesis 3:15 el primer anuncio del evangelio.",
            ],
            malo: 1,
            correccion: "Fue al revés: el pecado se extendió de generación en generación (Génesis 4 a 11).",
            apoyo: "el pecado se extendió de generación en generación",
            ref: "Génesis 3:15",
            explica: "La caída rompió la relación con Dios, con el prójimo y con la creación, y el pecado se extendió; pero Dios anunció una promesa que se cumple en Cristo, descendiente de la mujer.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Enséñalo con esas preguntas en el centro.",
            situacion: "Eres maestro de la escuela dominical de jóvenes y empiezas una serie de clases sobre Génesis.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera clase, un joven levanta la mano: Si Génesis no responde las preguntas de la ciencia ni da todas las fechas, ¿para qué lo estudiamos?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Génesis responde quién creó, por qué el mundo está roto y qué hizo Dios para restaurarlo.", valor: 2, explica: "Así se enseña Génesis: con esas preguntas en el centro, que son las que el libro responde.", siguiente: "e2" },
                  { texto: "Que es una buena pregunta, que la verán otro día, y sigues con la clase tal como la tenías preparada.", valor: 1, explica: "No hace daño, pero pierdes la ocasión: Génesis sí responde quién creó, por qué el mundo está roto y qué hizo Dios para restaurarlo." },
                  { texto: "Que en la iglesia no se hacen esas preguntas, porque la fe no se discute.", valor: 0, explica: "Callar la pregunta cierra la conversación, y Génesis sí tiene respuestas para él: quién creó, por qué el mundo está roto y qué hizo Dios.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "A la semana siguiente, el joven vuelve con la misma pregunta, y ahora otros dos lo apoyan.",
                pregunta: "¿Qué haces esta vez?",
                opciones: [
                  { texto: "Les muestras lo que Génesis sí responde: quién creó, por qué el mundo está roto y qué hizo Dios.", valor: 2, explica: "Así pones en el centro lo que el libro enseña, y la pregunta se vuelve una puerta para la clase." },
                  { texto: "Les dices que no hay tiempo para esas preguntas y que mejor se concentren en memorizar los nombres de los patriarcas.", valor: 0, explica: "Esquivar otra vez la pregunta los aleja: Génesis no da todas las fechas, pero responde las preguntas más importantes.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Llega la clase sobre la caída. Una joven comenta que, después del pecado, Dios ya no quiso saber nada del ser humano.",
                pregunta: "¿Qué le muestras en Génesis 3?",
                opciones: [
                  { texto: "Que la caída lo rompió todo, y que en esta clase solo verán el castigo que vino después.", valor: 1, explica: "Es verdad que la caída lo rompió todo, pero falta lo más importante: la gracia aparece desde el principio." },
                  { texto: "Que la gracia aparece desde el principio: Dios buscó a Adán y vistió a la pareja.", valor: 2, explica: "Dios buscó a Adán, vistió a la pareja y anunció a la serpiente su derrota: los creyentes han visto allí el primer anuncio del evangelio." },
                  { texto: "Que tiene razón: desde la caída, Dios se alejó del ser humano y lo dejó solo para siempre.", valor: 0, explica: "Génesis muestra lo contrario: Dios buscó a Adán y vistió a la pareja; la gracia aparece desde el principio." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, una muchacha te cuenta que se compara con sus amigas y siente que vale menos que ellas.",
                pregunta: "¿Qué verdad de Génesis le recuerdas?",
                opciones: [
                  { texto: "Que su dignidad viene de haber sido creada a imagen de Dios, como la de toda persona.", valor: 2, explica: "La dignidad de toda persona viene de haber sido creada a imagen de Dios, no de compararse con otros." },
                  { texto: "Que no se compare con nadie, y que la semana que viene lo hablan con más calma.", valor: 1, explica: "Es un buen consejo, pero le falta la verdad que la sostiene: su dignidad viene de haber sido creada a imagen de Dios." },
                  { texto: "Que vale según lo que logre: si se esfuerza más, llegará a valer tanto como sus amigas.", valor: 0, explica: "Génesis enseña que la dignidad de toda persona viene de haber sido creada a imagen de Dios, no de lo que logra." },
                ],
              },
            ],
          },
          {
            apoyo: "La caída rompió la relación con Dios, con el prójimo y con la creación",
            situacion: "Acompañas a una hermana nueva en la fe que empezó a leer la Biblia por Génesis y te escribe sus dudas.",
            escenas: [
              {
                id: "e1",
                narra: "Te escribe: Leí que todo lo que Dios hizo era «bueno en gran manera». Entonces, ¿por qué el mundo está tan roto?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la caída rompió la relación con Dios, con el prójimo y con la creación.", valor: 2, explica: "Génesis responde por qué el mundo está roto: la caída lo rompió todo, y el pecado se extendió de generación en generación." },
                  { texto: "Que es un tema difícil, y que mejor se lo pregunte al pastor el domingo.", valor: 1, explica: "El pastor puede ayudarla, pero tú también puedes responderle: la caída rompió la relación con Dios, con el prójimo y con la creación." },
                  { texto: "Que Dios hizo el mundo así, con el mal incluido desde el principio de la creación.", valor: 0, explica: "Todo lo que Dios hizo era «bueno en gran manera»: el mundo está roto por la caída." },
                ],
              },
              {
                id: "e2",
                narra: "Días después te dice: Después de lo que hizo Adán, Dios debió de abandonarlo para siempre.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que Dios es bueno, y que ya lo verá más adelante, cuando llegue a leer los Evangelios.", valor: 1, explica: "Lo verá en los Evangelios, pero ya en Génesis la gracia aparece desde el principio." },
                  { texto: "Que sí: en todo Génesis solo hay juicio y castigo, y la gracia aparece recién con Jesús.", valor: 0, explica: "En Génesis la gracia aparece desde el principio: Dios buscó a Adán, vistió a la pareja y anunció la promesa.", siguiente: "fin" },
                  { texto: "Que Dios buscó a Adán, vistió a la pareja y anunció la promesa que se cumple en Cristo.", valor: 2, explica: "Los creyentes han visto en esa promesa el primer anuncio del evangelio: se cumple en Cristo, descendiente de la mujer, que vence al maligno." },
                ],
              },
              {
                id: "e3",
                narra: "Al final te cuenta que en su trabajo la tratan como si valiera menos que los demás.",
                pregunta: "¿Qué verdad de Génesis le recuerdas?",
                opciones: [
                  { texto: "Que ore por sus compañeros y que siga trabajando con paciencia, sin decirle nada a nadie.", valor: 1, explica: "Orar es bueno, pero le falta la verdad que la sostiene: su dignidad viene de haber sido creada a imagen de Dios." },
                  { texto: "Que su valor depende de cómo rinda: si trabaja mejor que los demás, valdrá más ante todos.", valor: 0, explica: "Génesis enseña que la dignidad de toda persona viene de haber sido creada a imagen de Dios, no de cómo rinde." },
                  { texto: "Que fue creada a imagen de Dios: de ahí viene su dignidad, igual que la de los demás.", valor: 2, explica: "Tu dignidad y la de cada persona vienen de haber sido creados a imagen de Dios." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "La promesa a Abraham: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "promesa", texto: "La promesa a Abraham", x: 50, y: 10 },
              { id: "contenido", texto: "Descendencia, tierra y bendición", x: 22, y: 50 },
              { id: "at", texto: "Todo el Antiguo Testamento", x: 78, y: 50 },
              { id: "cristo", texto: "Cristo", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "promesa", a: "contenido", relacion: "incluye" },
              { de: "promesa", a: "at", relacion: "avanza por" },
              { de: "promesa", a: "cristo", relacion: "se cumple en" },
            ],
            distractores: ["se anula en", "queda fuera de"],
            apoyo: "Esas promesas avanzan por todo el Antiguo Testamento.",
            ref: "Génesis 12:1-3",
            explica: "Dios prometió a Abraham descendencia, tierra y bendición; esas promesas avanzan por todo el Antiguo Testamento y se cumplen en Cristo.",
          },
          {
            consigna: "La promesa avanza por la fidelidad de Dios: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 10 },
              { id: "promesa", texto: "La promesa", x: 50, y: 45 },
              { id: "patriarcas", texto: "Los patriarcas imperfectos", x: 22, y: 85 },
              { id: "naciones", texto: "Todas las naciones", x: 78, y: 85 },
            ],
            enlaces: [
              { de: "dios", a: "promesa", relacion: "es fiel a" },
              { de: "promesa", a: "patriarcas", relacion: "avanza a pesar de" },
              { de: "promesa", a: "naciones", relacion: "llega en Cristo a" },
            ],
            distractores: ["depende de la bondad de", "se rompe por"],
            apoyo: "Génesis muestra que la promesa avanza por la fidelidad de Dios, no por la de ellos.",
            ref: "Gálatas 3:8",
            explica: "Abraham mintió y Jacob engañó, pero la promesa avanzó por la fidelidad de Dios; en Cristo, la bendición llega a todas las naciones.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Esas promesas avanzan por todo el Antiguo Testamento.",
            ref: "Génesis 12:1-3; Gálatas 3:8",
            clave: {
              id: "pr-n3-pentateuco-historicos-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le prometió Dios a Abraham y por qué esa promesa es el hilo de toda la Biblia?",
              ideas: [
                { id: "promesa", peso: 50, texto: "Dios le prometió una descendencia, una tierra y una bendición para todas las familias de la tierra.", formas: ["descendencia", "una tierra", "bendicion", "todas las familias"] },
                { id: "cristo", peso: 50, texto: "Esas promesas avanzan por todo el Antiguo Testamento y se cumplen en Cristo, en quien la bendición llega a todas las naciones.", formas: ["se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "en (cristo|jesus|jesucristo) la bendicion", "hasta (cristo|jesus|jesucristo)", "(cristo|jesus|jesucristo) la cumpl*", "avanz* por todo", "recorre* (toda|todo)", "todo el antiguo testamento", "todas las naciones"] },
              ],
              modelo: "Dios le prometió a Abraham una descendencia, una tierra y una bendición para todas las familias de la tierra. Es el hilo de la Biblia porque esas promesas avanzan por todo el Antiguo Testamento y se cumplen en Cristo, en quien la bendición llega a todas las naciones.",
            },
          },
          {
            apoyo: "Génesis muestra que la promesa avanza por la fidelidad de Dios, no por la de ellos.",
            ref: "Génesis 15:6; Gálatas 3:8",
            clave: {
              id: "pr-n3-pentateuco-historicos-1-a7-2",
              tipo: "corta",
              pregunta: "Si los patriarcas no eran perfectos, ¿cómo avanzó la promesa a Abraham y en quién se cumple?",
              ideas: [
                { id: "fiel", peso: 50, texto: "La promesa avanzó por la fidelidad de Dios, no por la de los patriarcas.", formas: ["fidelidad de dios", "dios (es|fue|siempre) fiel", "por la fidelidad", "por su fidelidad", "no por la de ellos"] },
                { id: "cristo", peso: 50, texto: "Se cumple en Cristo: en él la bendición llega a todas las naciones.", formas: ["se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "todas las naciones", "todas las familias"] },
              ],
              errores: [
                { id: "merito", texto: "La promesa no avanzó porque los patriarcas fueran buenos: Abraham mintió y Jacob engañó a su padre.", formas: ["porque (eran|fueron) (buenos|perfectos|fieles)", "por (sus|su) (obras|bondad|meritos)"], anula: "fiel" },
              ],
              modelo: "Los patriarcas no eran perfectos: Abraham mintió sobre su esposa y Jacob engañó a su padre. La promesa avanzó por la fidelidad de Dios, no por la de ellos, y se cumple en Cristo, en quien la bendición llega a todas las naciones.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Éxodo y Levítico: redención, pacto y santidad
    "n3-pentateuco-historicos-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo empieza el libro de Éxodo?", reverso: "Con los descendientes de Jacob esclavizados en Egipto, siglos después de Génesis.", apoyo: "Éxodo empieza siglos después, con sus descendientes esclavizados." },
              { frente: "¿Qué cuentan los capítulos 1 al 18 de Éxodo?", reverso: "La liberación: el llamado de Moisés, las plagas, la Pascua y el paso por el mar.", apoyo: "Capítulos 1 al 18: Dios llama a Moisés, envía las plagas, instituye la Pascua y libera a su pueblo por el mar." },
              { frente: "¿Qué pasa en los capítulos 19 al 24 de Éxodo?", reverso: "En el Sinaí, Dios hace pacto con Israel y le da los diez mandamientos.", apoyo: "Capítulos 19 al 24: en el Sinaí, Dios hace pacto con Israel y le da los diez mandamientos." },
              { frente: "¿Qué respondió Dios cuando Moisés le preguntó su nombre?", reverso: "«YO SOY EL QUE SOY»: el Dios que existe por sí mismo y es fiel a sus promesas.", apoyo: "Es el Dios que existe por sí mismo, fiel a sus promesas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué tratan los capítulos 25 al 40 de Éxodo?", reverso: "Del tabernáculo: sus instrucciones, el becerro de oro y la gloria de Dios que lo llena.", apoyo: "Capítulos 25 al 40: las instrucciones del tabernáculo, el pecado del becerro de oro y la gloria de Dios que llena el tabernáculo." },
              { frente: "¿Por qué casi un tercio de Éxodo trata del tabernáculo?", reverso: "Porque la meta es que Dios viva con su pueblo.", apoyo: "Casi un tercio del libro trata del tabernáculo, porque su meta es que Dios viva con su pueblo" },
              { frente: "¿Qué protegió a los primogénitos en la Pascua?", reverso: "La sangre del cordero en las puertas.", apoyo: "En la Pascua, la sangre del cordero en las puertas protegió a los primogénitos" },
              { frente: "¿Qué pregunta responde el libro de Levítico?", reverso: "Cómo puede un pueblo pecador vivir cerca de un Dios santo.", apoyo: "Levítico responde una pregunta: ¿cómo puede un pueblo pecador vivir cerca de un Dios santo?" },
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
            consigna: "Ordena lo que cuenta Éxodo, del principio al final del libro.",
            pasos: [
              "Dios llama a Moisés",
              "Dios envía las plagas",
              "Dios instituye la Pascua",
              "Dios libera a su pueblo por el mar",
              "En el Sinaí, Dios da los diez mandamientos",
              "La gloria de Dios llena el tabernáculo",
            ],
            apoyo: "Capítulos 1 al 18: Dios llama a Moisés, envía las plagas, instituye la Pascua y libera a su pueblo por el mar.",
            ref: "Éxodo 12:13",
            explica: "Los capítulos 1 al 18 cuentan la liberación; del 19 al 24, el pacto del Sinaí, y del 25 al 40, el tabernáculo, que al final se llena de la gloria de Dios.",
          },
          {
            consigna: "Ordena estos hechos de Éxodo según el orden del libro.",
            pasos: [
              "La sangre del cordero protege a los primogénitos",
              "Dios saca a su pueblo de Egipto por el mar",
              "Dios hace pacto con Israel en el Sinaí",
              "Dios da las instrucciones del tabernáculo",
              "El pueblo peca con el becerro de oro",
              "La gloria de Dios llena el tabernáculo",
            ],
            apoyo: "Capítulos 25 al 40: las instrucciones del tabernáculo, el pecado del becerro de oro y la gloria de Dios que llena el tabernáculo.",
            ref: "Éxodo 25:8",
            explica: "Primero la liberación, con la Pascua y el mar; después el pacto del Sinaí, y al final el tabernáculo: sus instrucciones, el becerro de oro y la gloria de Dios que lo llena.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "La Pascua y su cumplimiento: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "liberacion", texto: "La liberación de Egipto", x: 50, y: 10 },
              { id: "sangre", texto: "La sangre del cordero", x: 50, y: 45 },
              { id: "primogenitos", texto: "Los primogénitos", x: 22, y: 88 },
              { id: "cristo", texto: "Cristo, nuestra pascua", x: 78, y: 88 },
            ],
            enlaces: [
              { de: "liberacion", a: "sangre", relacion: "fue por medio de" },
              { de: "sangre", a: "primogenitos", relacion: "protegió a" },
              { de: "sangre", a: "cristo", relacion: "se cumple en" },
            ],
            distractores: ["condenó a", "nada tiene que ver con"],
            apoyo: "La liberación de Egipto es el modelo de la salvación: Dios libra de la esclavitud por medio de la sangre del cordero.",
            ref: "Éxodo 12:13; 1 Corintios 5:7",
            explica: "La liberación de Egipto fue por medio de la sangre del cordero, que protegió a los primogénitos; el Nuevo Testamento ve allí a Cristo, nuestra pascua.",
          },
          {
            consigna: "El pacto del Sinaí: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 10 },
              { id: "pueblo", texto: "Un pueblo ya rescatado", x: 22, y: 50 },
              { id: "liberacion", texto: "La liberación de Egipto", x: 78, y: 50 },
              { id: "mandamientos", texto: "Los diez mandamientos", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "dios", a: "pueblo", relacion: "hace pacto con" },
              { de: "mandamientos", a: "liberacion", relacion: "se dan como respuesta a" },
            ],
            distractores: ["son el precio de", "exige pagar su rescate a"],
            apoyo: "En el Sinaí, Dios ofrece un pacto a un pueblo ya rescatado",
            ref: "Éxodo 19:5-6",
            explica: "Dios hizo pacto con un pueblo ya rescatado: los mandamientos no se dan para ganar la liberación, sino como respuesta a ella.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: Tengo que cumplir todos los mandamientos para que Dios me rescate.",
            pregunta: "¿Qué le respondes como líder?",
            opciones: [
              { texto: "Que sí: los mandamientos se dieron para que el pueblo pudiera ganar su liberación.", explica: "En el Sinaí, Dios ofreció su pacto a un pueblo ya rescatado: los mandamientos no se dan para ganar la liberación, sino como respuesta a ella." },
              { texto: "Que Dios dio el pacto a un pueblo ya rescatado: no obedecemos para ser rescatados.", bien: true, explica: "Así fue en el Sinaí: Dios no te pide obedecer para ser rescatado; te rescató para que vivas con él y le obedezcas." },
              { texto: "Que obedecer ya no importa, porque los mandamientos eran solo para el antiguo Israel.", explica: "Dios nos rescató para que vivamos con él y le obedezcamos, y Pedro aplica a la iglesia las palabras que Dios dijo a Israel en el Sinaí." },
              { texto: "Que se esfuerce, porque cuando cumpla todo, Dios lo va a recibir en su pueblo.", explica: "Dios no espera a que cumplamos todo para rescatarnos: primero rescata, y la obediencia es la respuesta." },
            ],
            apoyo: "los mandamientos no se dan para ganar la liberación, sino como respuesta a ella",
            ref: "Éxodo 19:5-6",
            explica: "Dios no te pide obedecer para ser rescatado: te rescató para que vivas con él y le obedezcas.",
          },
          {
            caso: "Una hermana que acompañas te escribe: Siento que Dios está lejos y que no quiere vivir cerca de gente como yo.",
            pregunta: "¿Qué le muestras de Éxodo?",
            opciones: [
              { texto: "Que el tabernáculo servía para que Dios se mantuviera bien lejos de su pueblo pecador.", explica: "Fue al revés: la meta del tabernáculo es que Dios viva con su pueblo: «harán un santuario para mí, y habitaré en medio de ellos»." },
              { texto: "Que la presencia de Dios en el desierto era solo para Moisés, y no para todo el pueblo.", explica: "Dios dijo que habitaría en medio de ellos: en medio de todo su pueblo." },
              { texto: "Que la meta del tabernáculo es que Dios viva con su pueblo, y en Jesús vino a hacerlo.", bien: true, explica: "Casi un tercio de Éxodo trata del tabernáculo porque su meta es que Dios viva con su pueblo; en Jesús, Dios vino a vivir en medio de su pueblo." },
              { texto: "Que Dios solo vive cerca de los que ya no tienen ni un solo pecado en toda su vida.", explica: "Dios quiso habitar en medio de un pueblo pecador; Levítico enseña cómo ese pueblo podía vivir cerca de un Dios santo." },
            ],
            apoyo: "en Jesús, Dios vino a vivir en medio de su pueblo",
            ref: "Juan 1:14",
            explica: "La meta del tabernáculo es que Dios viva con su pueblo: en Jesús, el Verbo que habitó entre nosotros, Dios vino a vivir en medio de los suyos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la pregunta que responde Levítico y de qué trata el libro.",
            texto: "Levítico responde cómo puede un pueblo [[pecador]] vivir cerca de un Dios [[santo]]. Trata de los sacrificios, del sacerdocio y del Día de la [[Expiación]].",
            distractores: ["perfecto", "lejano", "Pascua"],
            errores: {
              perfecto: "La pregunta de Levítico es cómo puede vivir cerca de Dios un pueblo pecador.",
              lejano: "Levítico trata de un Dios santo en medio de su pueblo.",
              Pascua: "La Pascua está en Éxodo; Levítico 16 trata del Día de la Expiación.",
            },
            apoyo: "Levítico responde una pregunta: ¿cómo puede un pueblo pecador vivir cerca de un Dios santo?",
            ref: "Levítico 19:2",
            explica: "Levítico enseña cómo un pueblo pecador puede vivir cerca de un Dios santo: trata de los sacrificios, del sacerdocio, del Día de la Expiación y de la santidad en la vida diaria.",
          },
          {
            consigna: "Completa lo que enseñaban los sacrificios y el Día de la Expiación.",
            texto: "Los sacrificios enseñaban que el pecado trae [[muerte]] y que Dios provee un [[sustituto]]. En el Día de la Expiación, el sumo sacerdote entraba en el Lugar Santísimo con la [[sangre]] del sacrificio.",
            distractores: ["vida", "premio", "carne"],
            errores: {
              vida: "El pecado trae muerte: por eso Dios provee un sustituto.",
              premio: "Dios provee un sustituto, porque el pecado trae muerte.",
              carne: "El sumo sacerdote entraba en el Lugar Santísimo con la sangre del sacrificio.",
            },
            apoyo: "Los sacrificios enseñaban que el pecado trae muerte y que Dios provee un sustituto",
            ref: "Levítico 17:11",
            explica: "Los sacrificios enseñaban que el pecado trae muerte y que Dios provee un sustituto; Cristo entró una vez para siempre, no con sangre de animales, sino con su propia sangre.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Levítico y el Día de la Expiación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El lema de Levítico es que el pueblo sea santo, porque Dios es santo.", verdad: true, explica: "Su lema es «Santos seréis, porque santo soy yo Jehová vuestro Dios», también en la vida diaria.", apoyo: "Su lema es: «Santos seréis, porque santo soy yo Jehová vuestro Dios»", ref: "Levítico 19:2" },
              { texto: "El sumo sacerdote entraba en el Lugar Santísimo todos los días del año.", verdad: false, explica: "Entraba una vez al año, en el Día de la Expiación, con la sangre del sacrificio.", apoyo: "Una vez al año, en el Día de la Expiación, el sumo sacerdote entraba en el Lugar Santísimo" },
              { texto: "Cristo entró una vez para siempre, no con sangre de animales, sino con su propia sangre.", verdad: true, explica: "Así lo explica la carta a los Hebreos: Cristo es nuestro sumo sacerdote.", apoyo: "Cristo entró una vez para siempre, no con sangre de animales, sino con su propia sangre", ref: "Hebreos 9:11-12" },
            ],
          },
          {
            consigna: "Sobre los sacrificios y las leyes del culto: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los sacrificios de animales se siguen practicando hoy en la iglesia.", verdad: false, explica: "Los sacrificios y las leyes del culto se cumplieron en Cristo y no se practican hoy.", apoyo: "Los sacrificios y las leyes del culto se cumplieron en Cristo y no se practican hoy", ref: "Hebreos 10:1-14" },
              { texto: "Las leyes del culto siguen enseñando la santidad de Dios y la gravedad del pecado.", verdad: true, explica: "Muestran la santidad de Dios, la gravedad del pecado y el valor de la sangre de Cristo.", apoyo: "muestran la santidad de Dios, la gravedad del pecado y el valor de la sangre de Cristo" },
              { texto: "Los sacrificios enseñaban que el pecado es algo pequeño para Dios.", verdad: false, explica: "Enseñaban que el pecado trae muerte y que Dios provee un sustituto.", apoyo: "Los sacrificios enseñaban que el pecado trae muerte", ref: "Levítico 17:11" },
              { texto: "En Levítico está el mandamiento de amar al prójimo como a uno mismo.", verdad: true, explica: "Está en la parte de la santidad en la vida diaria (Levítico 19:18).", apoyo: "donde está también el mandamiento: «amarás a tu prójimo como a ti mismo»", ref: "Levítico 19:18" },
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
            apoyo: "La liberación de Egipto es el modelo de la salvación",
            ref: "Éxodo 12:13; 1 Corintios 5:7",
            clave: {
              id: "pr-n3-pentateuco-historicos-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué pasó en la Pascua y cómo se cumple en Cristo?",
              ideas: [
                { id: "sangre", peso: 50, texto: "La sangre del cordero en las puertas protegió a los primogénitos.", formas: ["sangre del cordero", "protegi* a los primogenitos", "los primogenitos", "en las puertas", "pas* de (largo|vosotros|ellos)"] },
                { id: "cristo", peso: 50, texto: "Cristo es nuestra pascua: fue sacrificado por nosotros, y por su sangre Dios libra de la esclavitud.", formas: ["nuestra pascua", "(cristo|jesus|jesucristo) es (el|nuestro) cordero", "sacrificad* por nosotros", "se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)"] },
              ],
              modelo: "En la Pascua, la sangre del cordero en las puertas protegió a los primogénitos, y Dios libró a su pueblo de la esclavitud. Se cumple en Cristo: él es nuestra pascua, sacrificada por nosotros.",
            },
          },
          {
            apoyo: "En el Sinaí, Dios ofrece un pacto a un pueblo ya rescatado",
            ref: "Éxodo 19:5-6; Éxodo 25:8",
            clave: {
              id: "pr-n3-pentateuco-historicos-2-a7-2",
              tipo: "corta",
              pregunta: "¿Con qué pueblo hizo Dios el pacto del Sinaí, y qué meta tenía el tabernáculo?",
              ideas: [
                { id: "rescatado", peso: 50, texto: "Con un pueblo ya rescatado: los mandamientos son la respuesta a la liberación, no el precio para ganarla.", formas: ["ya rescatado", "pueblo rescatado", "respuesta a (la|su) (liberacion|rescate)", "como respuesta", "despues de (rescatar*|liberar*)", "ya (liberado|libre)"] },
                { id: "habitar", peso: 50, texto: "La meta del tabernáculo es que Dios viva con su pueblo; en Jesús, Dios vino a vivir en medio de él.", formas: ["viva con su pueblo", "vivir con su pueblo", "habit* en medio", "en medio de su pueblo", "en medio de ellos", "vino a vivir", "habito entre nosotros"] },
              ],
              modelo: "Dios hizo el pacto del Sinaí con un pueblo ya rescatado: los mandamientos no se dan para ganar la liberación, sino como respuesta a ella. La meta del tabernáculo es que Dios viva con su pueblo, y en Jesús vino a vivir en medio de él.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Números y Deuteronomio: el desierto y el pacto renovado
    "n3-pentateuco-historicos-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué el libro de Números se llama así?", reverso: "Por los dos censos del pueblo, en los capítulos 1 y 26.", apoyo: "El libro debe su nombre a los dos censos del pueblo (Números 1 y 26)." },
              { frente: "¿Cuánto tardó Israel en llegar de Egipto a la tierra prometida?", reverso: "Cuarenta años, aunque había apenas unas semanas de camino.", apoyo: "Entre Egipto y la tierra prometida había apenas unas semanas de camino, pero Israel tardó cuarenta años." },
              { frente: "¿Qué dijeron diez de los doce espías en Cades?", reverso: "Que no podrían conquistar la tierra, y el pueblo les creyó a ellos y no a Dios.", apoyo: "En Cades, diez de los doce espías dijeron que no podrían conquistar la tierra" },
              { frente: "¿Qué significa el nombre Deuteronomio?", reverso: "Segunda ley, aunque no es una ley nueva.", apoyo: "Deuteronomio significa segunda ley, pero no es una ley nueva" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quiénes de aquella generación entraron en la tierra?", reverso: "Solo Josué y Caleb, que confiaron en Dios.", apoyo: "Solo Josué y Caleb confiaron, y solo ellos de esa generación entraron." },
              { frente: "¿Qué hizo Moisés cuando el pueblo fue mordido por serpientes?", reverso: "Levantó una serpiente de bronce, y el que la miraba vivía.", apoyo: "Moisés levantó una serpiente de bronce y el que la miraba vivía" },
              { frente: "¿Qué significa en hebreo la palabra Shema?", reverso: "Oye, como en «Oye, Israel: Jehová nuestro Dios, Jehová uno es».", apoyo: "En el centro está el Shema, que en hebreo significa oye" },
              { frente: "¿Con qué libro respondió Jesús las tres veces que el diablo lo tentó?", reverso: "Con palabras de Deuteronomio.", apoyo: "Jesús respondió las tres veces con palabras de Deuteronomio" },
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
            ref: "Juan 3:14-15",
            consigna: "Jesús usó la imagen de la serpiente de bronce. ¿Quién es necesario que sea levantado? Toca las tres palabras.",
            texto: "como Moisés levantó la serpiente en el desierto, así es necesario que el [[Hijo]] [[del]] [[Hombre]] sea levantado",
            apoyo: "Aun en medio de la rebeldía, Dios proveyó salvación.",
            explica: "Aun en medio de la rebeldía, Dios proveyó salvación: el que miraba la serpiente de bronce vivía. Jesús usó esa imagen para hablar de él mismo, el Hijo del Hombre.",
          },
          {
            ref: "1 Corintios 10:11",
            consigna: "Pablo habla de lo que le pasó a la generación del desierto. ¿Cómo les acontecieron esas cosas? Toca la palabra.",
            texto: "estas cosas les acontecieron como [[ejemplo]], y están escritas para amonestarnos a nosotros",
            apoyo: "La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios.",
            explica: "Lo que le pasó a la generación del desierto está escrito para amonestarnos: la incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el libro de Números tiene un error. Tócala.",
            frases: [
              "Números debe su nombre a los dos censos del pueblo.",
              "En Cades, diez de los doce espías dijeron que no podrían conquistar la tierra.",
              "El pueblo les creyó a Josué y a Caleb, y entró enseguida en la tierra.",
              "Cuando el pueblo fue mordido por serpientes, Dios proveyó salvación.",
            ],
            malo: 2,
            correccion: "El pueblo les creyó a los diez espías y no a Dios; solo Josué y Caleb confiaron, y solo ellos de esa generación entraron.",
            apoyo: "y el pueblo les creyó a ellos y no a Dios",
            ref: "Números 14:8-9",
            explica: "Por su incredulidad, la generación que salió de Egipto murió en el desierto; solo Josué y Caleb, que confiaron, entraron en la tierra.",
          },
          {
            consigna: "Una de estas frases sobre el camino por el desierto tiene un error. Tócala.",
            frases: [
              "Entre Egipto y la tierra prometida había apenas unas semanas de camino.",
              "Por la rebeldía del pueblo, Dios dejó de proveerle salvación.",
              "El que miraba la serpiente de bronce vivía.",
              "La generación que salió de Egipto murió en el desierto.",
            ],
            malo: 1,
            correccion: "Aun en medio de la rebeldía, Dios proveyó salvación: el que miraba la serpiente de bronce vivía.",
            apoyo: "Aun en medio de la rebeldía, Dios proveyó salvación.",
            ref: "Juan 3:14-15",
            explica: "Números muestra la incredulidad del pueblo, pero también la fidelidad de Dios, que seguía proveyendo salvación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace Moisés en Deuteronomio.",
            texto: "En Deuteronomio, Moisés [[recuerda]] lo que Dios hizo, repite y [[explica]] la ley, y llama al pueblo a elegir la [[vida]]: amar a Dios y obedecerle.",
            distractores: ["olvida", "cambia", "tierra"],
            errores: {
              olvida: "Moisés recuerda lo que Dios hizo: acordarse es una palabra que se repite en Deuteronomio.",
              cambia: "Deuteronomio no es una ley nueva: Moisés repite y explica la misma ley.",
              tierra: "Moisés llama a elegir la vida: amar a Dios y obedecerle.",
            },
            apoyo: "Moisés recuerda lo que Dios hizo, repite y explica la ley, y llama al pueblo a elegir la vida",
            ref: "Deuteronomio 6:4-9",
            explica: "Deuteronomio renueva el pacto con la nueva generación: Moisés recuerda lo que Dios hizo, repite y explica la ley, y llama a elegir la vida amando a Dios y obedeciéndole.",
          },
          {
            consigna: "Completa a quiénes habló Moisés en Deuteronomio, dónde y cuándo.",
            texto: "Deuteronomio no es una ley nueva: son los [[discursos]] de Moisés a la nueva generación en las llanuras de [[Moab]], antes de entrar en la [[tierra]].",
            distractores: ["milagros", "Egipto", "ciudad"],
            errores: {
              milagros: "Deuteronomio son los discursos de Moisés a la nueva generación.",
              Egipto: "Moisés habló en las llanuras de Moab, antes de entrar en la tierra.",
              ciudad: "Moisés les habló antes de entrar en la tierra prometida.",
            },
            apoyo: "son los discursos de Moisés a la nueva generación en las llanuras de Moab, antes de entrar en la tierra",
            explica: "Deuteronomio significa segunda ley, pero no es una ley nueva: Moisés renueva el pacto con la nueva generación antes de entrar en la tierra.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra de Deuteronomio con su sentido.",
            pares: [
              ["Deuteronomio", "Segunda ley, aunque no es una ley nueva"],
              ["Shema", "Oye: el llamado a amar a Dios con todo el ser"],
              ["Las llanuras de Moab", "Donde Moisés habló a la nueva generación"],
              ["Acordarse", "La palabra que se repite, contraria a olvidar"],
            ],
            apoyo: "Una palabra que se repite en Deuteronomio es acordarse, y su contrario, olvidar.",
            explica: "Deuteronomio son los discursos de Moisés a la nueva generación en las llanuras de Moab; en su centro está el Shema, y una palabra que se repite es acordarse.",
          },
          {
            consigna: "¿Qué pasa en cada momento? Une cada uno con lo que le corresponde.",
            pares: [
              ["Los discursos de Moisés en Moab", "Moisés llama a elegir la vida: amar a Dios y obedecerle"],
              ["El final de Deuteronomio", "Moisés muere: vio la tierra desde el monte, pero no entró"],
              ["Las tentaciones de Jesús en el desierto", "Jesús responde con palabras de Deuteronomio"],
              ["La predicación de Pedro", "Enseña que el profeta como Moisés es Jesús"],
            ],
            apoyo: "llama al pueblo a elegir la vida: amar a Dios y obedecerle",
            explica: "Antes de entrar en la tierra, Moisés llamó a elegir la vida, y murió sin entrar. Jesús respondió al diablo con Deuteronomio, y Pedro enseñó que Jesús es el profeta como Moisés.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Recordar sus obras, en familia y en la iglesia, protege la fe.",
            situacion: "Eres líder de una célula. En las últimas semanas, varios del grupo pasan dificultades y las reuniones se han llenado de quejas.",
            escenas: [
              {
                id: "e1",
                narra: "Al empezar la reunión, uno dice: Dios nos trajo hasta aquí para dejarnos solos; ya no sé si vale la pena seguir.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo escuchas, y después invitas a cada uno a recordar una obra que Dios ya hizo en su vida.", valor: 2, explica: "El pueblo que se olvida de lo que Dios hizo termina olvidándose de Dios; recordar sus obras en la iglesia protege la fe.", siguiente: "e2" },
                  { texto: "Oras enseguida por todos y, para no alargar el tema, pasas al estudio que tenías preparado.", valor: 1, explica: "Orar es bueno, pero la queja sigue ahí: recordar juntos lo que Dios hizo protege la fe contra la murmuración.", siguiente: "e2" },
                  { texto: "Le das la razón: con tantos problemas, es normal pensar que Dios los dejó solos.", valor: 0, explica: "La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios: darles la razón las alimenta." },
                ],
              },
              {
                id: "e1b",
                narra: "La queja se contagia: otros se suman, y la reunión termina sin estudio y con el grupo desanimado.",
                pregunta: "¿Qué haces la semana siguiente?",
                opciones: [
                  { texto: "Abres la reunión recordando juntos lo que Dios hizo, antes de hablar de los problemas.", valor: 2, explica: "Recordar las obras de Dios en la iglesia protege la fe: así se corta la murmuración." },
                  { texto: "Suspendes la célula hasta que las cosas mejoren para todos y ya no haya más quejas en el grupo.", valor: 0, explica: "Dejar de reunirse no cura la queja: el pueblo que se olvida de lo que Dios hizo termina olvidándose de Dios.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Una hermana cuenta que sus hijos ya no quieren saber nada de Dios y que ella dejó de hablarles de él.",
                pregunta: "¿Qué le aconsejas a partir del Shema?",
                opciones: [
                  { texto: "Que los deje tranquilos por ahora y que solo ore por ellos en silencio, sin decirles nada.", valor: 1, explica: "Orar por ellos es bueno, pero el Shema pide también enseñar las palabras de Dios a los hijos en la vida diaria." },
                  { texto: "Que siga enseñándoles las palabras de Dios en la vida diaria: en casa y en el camino.", valor: 2, explica: "El Shema pide amar a Dios con todo el ser y enseñar sus palabras a los hijos en la vida diaria." },
                  { texto: "Que la fe de sus hijos ya no depende de ella, porque cumplió con llevarlos de niños.", valor: 0, explica: "El Shema pide enseñar las palabras de Dios a los hijos en la vida diaria: en casa, en el camino, al acostarse y al levantarse." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de terminar, un joven dice que dejó de orar por un trabajo porque todos le dicen que es imposible.",
                pregunta: "¿Qué le recuerdas?",
                opciones: [
                  { texto: "Que sea realista: si todos dicen que es imposible, lo mejor es no intentarlo más.", valor: 0, explica: "Así hablaron los diez espías, y el pueblo les creyó a ellos y no a Dios: la incredulidad dejó a una generación en el desierto." },
                  { texto: "Que en Cades el pueblo creyó a los que veían todo imposible y no a Dios: que confíe en él.", valor: 2, explica: "Solo Josué y Caleb confiaron, y solo ellos entraron: la incredulidad sigue siendo un peligro para el pueblo de Dios." },
                  { texto: "Que lo intente una vez más, y que si no sale, es porque no era para él, y que no piense más en eso.", valor: 1, explica: "Intentarlo no está mal, pero la lección del desierto es otra: confiar en Dios y no en los que lo ven todo imposible." },
                ],
              },
            ],
          },
          {
            apoyo: "Lo que Dios te dio a conocer, enséñalo en casa, en el camino, al acostarte y al levantarte.",
            situacion: "Acompañas como mentor a un matrimonio joven de la iglesia que acaba de tener su primer hijo.",
            escenas: [
              {
                id: "e1",
                narra: "Te cuentan que quieren criar a su hijo en la fe, pero creen que eso es tarea de la escuela dominical.",
                pregunta: "¿Qué les dices desde el Shema?",
                opciones: [
                  { texto: "Que la fe es algo muy personal, y que mejor dejen que el niño decida solo cuando sea grande.", valor: 0, explica: "El Shema pide enseñar las palabras de Dios a los hijos en la vida diaria: la fe no se deja para después." },
                  { texto: "Que la escuela dominical ayuda mucho, y que lo lleven sin falta cada domingo.", valor: 1, explica: "La escuela dominical ayuda, pero el Shema les pide a ellos enseñar las palabras de Dios a su hijo en la vida diaria." },
                  { texto: "Que el Shema pide enseñar las palabras de Dios a los hijos en la vida diaria, en casa.", valor: 2, explica: "El Shema pide amar a Dios con todo el ser y enseñar sus palabras a los hijos: en casa, en el camino, al acostarse y al levantarse." },
                ],
              },
              {
                id: "e2",
                narra: "Meses después, el padre pierde el trabajo, y en la casa solo se escuchan quejas contra Dios.",
                pregunta: "¿Qué les aconsejas?",
                opciones: [
                  { texto: "Que recuerden en familia lo que Dios ya hizo por ellos, para no caer en la murmuración.", valor: 2, explica: "Recordar las obras de Dios, en familia y en la iglesia, protege la fe; la murmuración sigue siendo un peligro." },
                  { texto: "Que es normal quejarse contra Dios cuando todo sale mal, y que no pasa nada por hacerlo.", valor: 0, explica: "La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios: lo del desierto está escrito para amonestarnos.", siguiente: "fin" },
                  { texto: "Que oren por un trabajo nuevo y que, mientras tanto, no hablen del tema delante del niño.", valor: 1, explica: "Orar es bueno, pero callar no cura la queja: recordar juntos lo que Dios hizo protege la fe." },
                ],
              },
              {
                id: "e3",
                narra: "Una tarde, el padre te confiesa que ve imposible salir adelante y que ya dejó de orar.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que se distraiga un poco y que vuelva a orar cuando se sienta mejor y con más ánimo para hacerlo.", valor: 1, explica: "Descansar no está mal, pero la lección del desierto es confiar en Dios y no dejarse llevar por la incredulidad." },
                  { texto: "Que el pueblo creyó a los diez espías y no a Dios; que vuelva a confiar en él y a orar.", valor: 2, explica: "Josué y Caleb confiaron, y solo ellos de esa generación entraron: la incredulidad dejó a los demás en el desierto." },
                  { texto: "Que tiene razón: hay momentos en que lo mejor es dejar de esperar algo de Dios.", valor: 0, explica: "Aun en medio de la rebeldía, Dios proveyó salvación: siguió siendo fiel en el desierto." },
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
            apoyo: "La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios.",
            ref: "1 Corintios 10:11",
            clave: {
              id: "pr-n3-pentateuco-historicos-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué peligro muestra la generación del desierto, y qué protege la fe según Deuteronomio?",
              ideas: [
                { id: "peligro", peso: 50, texto: "La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios.", formas: ["incredulidad", "murmur*", "no creyeron", "no confiaron", "creyeron a los (espias|diez)"] },
                { id: "recordar", peso: 50, texto: "Recordar lo que Dios hizo, en familia y en la iglesia, protege la fe.", formas: ["record* lo que", "record* sus obras", "record* las obras", "acordarse", "acord* de lo que", "acord* de sus obras", "acord* de dios", "no olvid*", "protege la fe"] },
              ],
              modelo: "La generación del desierto muestra que la incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios. Según Deuteronomio, recordar lo que Dios hizo, en familia y en la iglesia, protege la fe.",
            },
          },
          {
            apoyo: "Pide amar a Dios con todo el ser y enseñar sus palabras a los hijos en la vida diaria.",
            ref: "Deuteronomio 6:4-9",
            clave: {
              id: "pr-n3-pentateuco-historicos-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que enseñar la fe a sus hijos es tarea de la iglesia. ¿Qué le enseña el Shema?",
              ideas: [
                { id: "amar", peso: 40, texto: "El Shema pide amar a Dios con todo el ser.", formas: ["amar a dios", "ama* a (dios|jehova)", "con todo el (ser|corazon)", "jehova uno es", "un solo dios"] },
                { id: "ensenar", peso: 60, texto: "Pide enseñar sus palabras a los hijos en la vida diaria: en casa, en el camino, al acostarse y al levantarse.", formas: ["ensen* sus palabras", "ensen* su palabra", "ensen* a (los|sus) hijos", "a (los|sus) hijos en la vida diaria", "vida diaria", "en (la|su) casa", "en el camino", "al acostar*", "al levantar*"] },
              ],
              modelo: "El Shema pide amar a Dios con todo el ser y enseñar sus palabras a los hijos en la vida diaria: en casa, en el camino, al acostarse y al levantarse. No es solo tarea de la iglesia: le toca también a él.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Josué, Jueces y Rut: la tierra, el olvido y la fidelidad
    "n3-pentateuco-historicos-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué cuenta el libro de Josué?", reverso: "La entrada en la tierra prometida a Abraham.", apoyo: "Josué cuenta la entrada en la tierra prometida a Abraham." },
              { frente: "¿Cómo cayeron los muros de Jericó?", reverso: "Sin máquinas de guerra: la victoria dependía de Dios.", apoyo: "los muros de Jericó cayeron sin máquinas de guerra" },
              { frente: "¿Por qué fue derrotado Israel en Hai?", reverso: "Por el pecado de Acán.", apoyo: "la derrota de Hai vino por el pecado de Acán" },
              { frente: "¿Quién fue Rahab?", reverso: "Una mujer cananea que creyó y fue salvada.", apoyo: "Rahab, una mujer cananea, creyó y fue salvada" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué decidió Josué al final del libro?", reverso: "Que él y su casa servirían a Jehová.", apoyo: "la decisión de Josué: «yo y mi casa serviremos a Jehová»" },
              { frente: "¿Con qué retrato del pueblo termina el libro de Jueces?", reverso: "«cada uno hacía lo que bien le parecía».", apoyo: "el libro termina con un retrato duro del pueblo" },
              { frente: "¿Qué decidió Rut, la moabita viuda?", reverso: "Quedarse con su suegra Noemí y hacer suyo al Dios de Israel.", apoyo: "una moabita viuda decidió quedarse con su suegra Noemí" },
              { frente: "¿Quién fue Obed?", reverso: "El hijo de Rut y Booz, abuelo del rey David.", apoyo: "el hijo de Rut y Booz fue Obed, abuelo del rey David" },
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
            ref: "Josué 21:45",
            consigna: "Al final de Josué, ¿qué no faltó de todas las buenas promesas de Jehová? Toca la palabra.",
            texto: "No faltó [[palabra]] de todas las buenas promesas que Jehová había hecho",
            apoyo: "Josué muestra que Dios cumple sus promesas y llama a servirle",
            explica: "Josué muestra que Dios cumple sus promesas: ninguna de sus buenas promesas faltó, y su pueblo entró en la tierra prometida a Abraham.",
          },
          {
            ref: "Josué 24:15",
            consigna: "¿Qué decidió Josué que harían él y su casa con Jehová? Toca la palabra.",
            texto: "yo y mi casa [[serviremos]] a Jehová",
            apoyo: "Como Josué, cada familia necesita decidir a quién va a servir.",
            explica: "Josué llamó al pueblo a servir a Dios y dio el ejemplo con su casa: cada familia necesita decidir a quién va a servir.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el libro de Josué y la conquista: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Josué, la victoria dependía de Dios: los muros de Jericó cayeron sin máquinas de guerra.", verdad: true, explica: "La victoria dependía de Dios, y la derrota de Hai vino por el pecado de Acán.", apoyo: "La victoria depende de Dios: los muros de Jericó cayeron sin máquinas de guerra" },
              { texto: "La conquista de Canaán es un modelo para que la iglesia luche con armas.", verdad: false, explica: "Fue un hecho único de aquella historia, no un modelo para la iglesia, cuyas armas no son carnales.", apoyo: "Fue un hecho único de aquella historia, no un modelo para la iglesia", ref: "2 Corintios 10:4" },
              { texto: "Aun en la conquista hubo gracia: Rahab, una mujer cananea, creyó y fue salvada.", verdad: true, explica: "Rahab creyó y fue salvada, y Mateo la nombra en la genealogía de Jesús.", apoyo: "Y aun allí hubo gracia: Rahab, una mujer cananea, creyó y fue salvada", ref: "Hebreos 11:31" },
            ],
          },
          {
            consigna: "Sobre la conquista de la tierra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La conquista fue un juicio de Dios sobre pueblos que habían llenado la medida de su maldad.", verdad: true, explica: "A Abraham se le dijo que su descendencia volvería, «porque aún no ha llegado a su colmo la maldad del amorreo».", apoyo: "La conquista fue un juicio de Dios sobre pueblos que habían llenado la medida de su maldad", ref: "Génesis 15:16" },
              { texto: "Israel conquistó la tierra porque era más fuerte que los pueblos de Canaán.", verdad: false, explica: "La victoria dependía de Dios: los muros de Jericó cayeron sin máquinas de guerra.", apoyo: "La victoria depende de Dios" },
              { texto: "Al final de Josué, Dios todavía no había cumplido sus buenas promesas.", verdad: false, explica: "El libro termina declarando: «No faltó palabra de todas las buenas promesas que Jehová había hecho».", apoyo: "«No faltó palabra de todas las buenas promesas que Jehová había hecho»", ref: "Josué 21:45" },
              { texto: "La derrota de Hai vino por el pecado de Acán.", verdad: true, explica: "La victoria dependía de Dios, y el pecado de Acán trajo la derrota.", apoyo: "la derrota de Hai vino por el pecado de Acán" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el ciclo que se repite en Jueces, empezando por el pecado del pueblo.",
            pasos: [
              "El pueblo peca",
              "Dios permite que lo opriman otros pueblos",
              "El pueblo clama",
              "Dios levanta un libertador, un juez",
              "Hay paz por un tiempo",
            ],
            apoyo: "el pueblo peca, Dios permite que lo opriman otros pueblos, el pueblo clama, Dios levanta un libertador (un juez) y hay paz por un tiempo",
            ref: "Jueces 2:11-19",
            explica: "Ese ciclo se repite en Jueces: el pueblo peca, es oprimido, clama, Dios levanta un juez y hay paz por un tiempo; luego todo vuelve a empezar.",
          },
          {
            consigna: "Ordena una vuelta del ciclo de los jueces, desde el olvido de Dios hasta que todo vuelve a empezar.",
            pasos: [
              "Una nueva generación se olvida de Dios",
              "Otros pueblos oprimen a Israel",
              "Israel clama a Dios",
              "Dios levanta un juez como Gedeón",
              "El pueblo vive en paz por un tiempo",
              "Todo vuelve a empezar, cada vez peor",
            ],
            apoyo: "Con cada vuelta, el ciclo empeora",
            ref: "Jueces 2:11-19",
            explica: "Después de Josué, una nueva generación se olvidó de Dios: el pueblo pecaba, era oprimido, clamaba, y Dios levantaba un juez; luego todo volvía a empezar, cada vez peor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un padre de tu célula te dice: Mis hijos crecieron en la iglesia; ya no hace falta enseñarles nada de Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que tiene razón: quien creció dentro de la iglesia ya conoce a Dios para toda la vida.", explica: "Después de Josué, una nueva generación se olvidó de Dios: crecer cerca no basta, cada generación necesita ser enseñada." },
              { texto: "Que la fe no se hereda sola: cada generación necesita ser enseñada y discipulada.", bien: true, explica: "Jueces comienza diciendo que se levantó otra generación que no conocía a Jehová: la fe no se hereda sola." },
              { texto: "Que eso es tarea del pastor y de los maestros, y que los padres no necesitan ocuparse.", explica: "Cada generación necesita ser enseñada y discipulada, también en la familia: como Josué, cada familia necesita decidir a quién va a servir." },
              { texto: "Que no se preocupe: la fe de los padres pasa sola a los hijos, sin hacer nada más.", explica: "La fe no se hereda sola: por eso cada generación necesita ser enseñada y discipulada." },
            ],
            apoyo: "La fe no se hereda sola: cada generación necesita ser enseñada y discipulada.",
            ref: "Jueces 2:10",
            explica: "Jueces muestra lo que pasa cuando una generación no conoce a Dios: el pueblo cae en un ciclo de pecado. Cada generación necesita ser enseñada y discipulada.",
          },
          {
            caso: "Una joven que acompañas te escribe: Volví a caer en lo mismo; seguro que Dios ya se cansó de levantarme.",
            pregunta: "¿Qué le muestras del libro de Jueces?",
            opciones: [
              { texto: "Que sí: después de tantas caídas, Dios deja de escuchar a los que vuelven a clamar.", explica: "Una y otra vez, cuando el pueblo clamaba, Dios levantaba un libertador: los jueces fueron instrumentos de su misericordia." },
              { texto: "Que no se preocupe por caer, porque el pecado ya no trae ninguna consecuencia.", explica: "El pecado sí trae consecuencias: en Jueces, Dios permitía que otros pueblos oprimieran a Israel, y el ciclo empeoraba." },
              { texto: "Que primero deje de caer por su propia cuenta, y que solo después vuelva a buscar a Dios.", explica: "En Jueces, el pueblo no salía solo del ciclo: clamaba, y Dios levantaba un libertador." },
              { texto: "Que clame a Dios como el pueblo en Jueces: solo su misericordia lo sacaba del ciclo.", bien: true, explica: "En Jueces, cuando el pueblo clamaba, Dios levantaba un libertador: solo su misericordia lo sacaba del ciclo de pecado." },
            ],
            apoyo: "el pueblo que se olvida de Dios cae en un ciclo de pecado del que solo su misericordia lo saca",
            ref: "Jueces 2:11-19",
            explica: "Jueces muestra que el pecado trae consecuencias y que el ciclo empeora, pero también que, cuando el pueblo clamaba, Dios en su misericordia levantaba un libertador.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada persona con lo que la lección dice de ella.",
            pares: [
              ["Rut", "Moabita viuda que eligió el pueblo y el Dios de Noemí"],
              ["Booz", "Pariente que protegió a Rut y la redimió conforme a la ley"],
              ["Obed", "Hijo de Rut y Booz, abuelo del rey David"],
              ["Rahab", "Cananea que creyó y está en la genealogía de Jesús"],
            ],
            apoyo: "Booz, pariente de la familia, la protegió y la redimió conforme a la ley, como pariente redentor",
            ref: "Rut 4:17",
            explica: "Rut eligió al Dios de Israel; Booz la redimió como pariente redentor; su hijo Obed fue abuelo de David, y Mateo nombra a Rahab y a Rut en la genealogía de Jesús.",
          },
          {
            consigna: "Une cada palabra o idea del libro de Rut con su sentido.",
            pares: [
              ["Jésed", "El amor fiel, que la RV1960 traduce como benevolencia"],
              ["Pariente redentor", "Booz, que redimió a Rut conforme a la ley"],
              ["La genealogía de Jesús en Mateo", "Nombra a Rahab y a Rut, dos mujeres extranjeras"],
              ["El final del libro de Rut", "Obed, el hijo de Rut, es abuelo del rey David"],
            ],
            apoyo: "La palabra hebrea jésed, el amor fiel, atraviesa el libro",
            ref: "Mateo 1:5",
            explica: "El amor fiel atraviesa el libro de Rut: Booz la redime, su hijo Obed es abuelo de David y Mateo la nombra en la genealogía de Jesús. La bendición de Dios era para todas las naciones.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios ya estaba mostrando que su bendición era para todas las naciones.",
            ref: "Rut 4:17; Mateo 1:5",
            clave: {
              id: "pr-n3-pentateuco-historicos-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo prepara el libro de Rut la llegada de David y de Cristo?",
              ideas: [
                { id: "david", peso: 50, texto: "El hijo de Rut y Booz fue Obed, abuelo del rey David.", formas: ["obed", "abuelo del rey david", "abuelo de david", "familia de david", "linaje de david"] },
                { id: "naciones", peso: 50, texto: "Mateo nombra a Rut, una extranjera, en la genealogía de Jesús: la bendición de Dios era para todas las naciones.", formas: ["genealogia de (jesus|cristo)", "mateo", "extranjer*", "todas las naciones", "moabita"] },
              ],
              modelo: "El hijo de Rut y Booz fue Obed, abuelo del rey David. Además, Mateo nombra a Rut, una mujer extranjera, en la genealogía de Jesús: Dios ya mostraba que su bendición era para todas las naciones.",
            },
          },
          {
            apoyo: "en tiempos oscuros Dios obra por medio de la fidelidad sencilla",
            ref: "Rut 1:16",
            clave: {
              id: "pr-n3-pentateuco-historicos-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué muestra el libro de Rut sobre la fidelidad en los días de los jueces?",
              ideas: [
                { id: "fiel", peso: 50, texto: "En tiempos oscuros Dios obra por medio de la fidelidad sencilla: Rut se quedó con Noemí y eligió a su Dios.", formas: ["fidelidad sencilla", "fidelidad", "fiel", "se quedo con (noemi|su)", "amor fiel", "jesed", "benevolencia"] },
                { id: "prepara", peso: 50, texto: "Así Dios preparaba la llegada de David y de Cristo: Obed, hijo de Rut, fue abuelo de David.", formas: ["obed", "abuelo del rey david", "abuelo de david", "llegada de (david|cristo|jesus)", "prepar*", "genealogia de (jesus|cristo)"] },
              ],
              modelo: "Muestra que en tiempos oscuros Dios obra por medio de la fidelidad sencilla: Rut se quedó con Noemí y eligió a su Dios. Así preparaba la llegada de David y de Cristo, porque Obed, hijo de Rut, fue abuelo de David.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Samuel, Reyes y Crónicas: el reino y el pacto con David
    "n3-pentateuco-historicos-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién fue el último de los jueces?", reverso: "Samuel, que también fue un gran profeta.", apoyo: "Samuel fue el último de los jueces y un gran profeta." },
              { frente: "Cuando el pueblo pidió un rey, ¿a quién desechó, según Dios?", reverso: "A Dios mismo, para que no reinara sobre ellos.", apoyo: "Cuando el pueblo pidió un rey, Dios le dijo" },
              { frente: "¿Qué le dijo Samuel a Saúl cuando desobedeció?", reverso: "«el obedecer es mejor que los sacrificios».", apoyo: "Saúl empezó bien, pero desobedeció" },
              { frente: "¿Por qué escogió Dios a David, un joven pastor?", reverso: "Porque Dios no mira lo que mira el hombre: mira el corazón.", apoyo: "Dios no mira lo que mira el hombre: mira el corazón." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo venció David a Goliat?", reverso: "Confiando en Dios.", apoyo: "David venció a Goliat confiando en Dios" },
              { frente: "¿Qué hizo David mientras esperaba el trono?", reverso: "Esperó con paciencia a que Dios se lo diera.", apoyo: "esperó con paciencia a que Dios le diera el trono" },
              { frente: "¿Adónde llevó David el arca?", reverso: "A Jerusalén.", apoyo: "llevó el arca a Jerusalén" },
              { frente: "¿Qué lección deja la historia del reino?", reverso: "Que el pueblo de Dios necesita un rey, pero ningún rey humano es suficiente.", apoyo: "el pueblo de Dios necesita un rey, pero ningún rey humano es suficiente" },
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
            consigna: "¿Se dice de Saúl o de David? Lleva cada frase a su grupo.",
            grupos: ["Saúl", "David"],
            frases: [
              { texto: "Fue el primer rey de Israel", grupo: 0 },
              { texto: "Empezó bien, pero desobedeció", grupo: 0 },
              { texto: "Samuel le dijo: «el obedecer es mejor que los sacrificios»", grupo: 0 },
              { texto: "Dios lo escogió cuando era un joven pastor", grupo: 1 },
              { texto: "Venció a Goliat confiando en Dios", grupo: 1 },
              { texto: "Esperó con paciencia a que Dios le diera el trono", grupo: 1 },
              { texto: "Llevó el arca a Jerusalén", grupo: 1 },
            ],
            apoyo: "Dios escogió a David, un joven pastor",
            ref: "1 Samuel 16:7",
            explica: "Saúl empezó bien, pero desobedeció; Dios escogió a David, un joven pastor que venció a Goliat confiando en Dios, esperó con paciencia el trono y llevó el arca a Jerusalén.",
          },
          {
            consigna: "¿De quién se habla: de Samuel, de Saúl o de David? Lleva cada frase a su grupo.",
            grupos: ["Samuel", "Saúl", "David"],
            frases: [
              { texto: "Fue el último de los jueces", grupo: 0 },
              { texto: "Fue un gran profeta", grupo: 0 },
              { texto: "Fue el rey que el pueblo pidió, como tenían las naciones", grupo: 1 },
              { texto: "Desobedeció después de empezar bien", grupo: 1 },
              { texto: "El profeta Natán lo confrontó por su pecado", grupo: 2 },
              { texto: "Se arrepintió, pero las consecuencias marcaron a su familia", grupo: 2 },
              { texto: "Dios le prometió una casa y un reino para siempre", grupo: 2 },
            ],
            apoyo: "Samuel fue el último de los jueces y un gran profeta.",
            ref: "1 Samuel 8:7",
            explica: "Samuel fue el último juez y un gran profeta; Saúl, el rey que el pueblo pidió, desobedeció; David pecó y se arrepintió, y Dios le prometió una casa y un reino para siempre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "El coordinador de jóvenes te dice: Para líder del grupo pongamos al que mejor habla y más seguro se ve.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que tiene razón: un buen líder se reconoce por cómo se ve y por lo bien que habla.", explica: "Dios no mira lo que mira el hombre: al escoger a David, miró el corazón." },
              { texto: "Que Dios no mira lo que mira el hombre: mira el corazón, como cuando escogió a David.", bien: true, explica: "Dios escogió a David, un joven pastor, porque «Jehová no mira lo que mira el hombre»." },
              { texto: "Que mejor elijan al de más edad, porque a alguien tan joven no se le puede confiar nada.", explica: "Dios escogió a David cuando era un joven pastor: no mira lo que mira el hombre, sino el corazón." },
              { texto: "Que lo decidan por votos y que gane el que tenga más amigos dentro del grupo de jóvenes.", explica: "Al escoger a David, Dios miró el corazón, no la fama ni la cantidad de amigos." },
            ],
            apoyo: "Dios no mira lo que mira el hombre: mira el corazón.",
            ref: "1 Samuel 16:7",
            explica: "Al escoger a David, un joven pastor, Dios mostró que no mira lo que mira el hombre: mira el corazón.",
          },
          {
            caso: "Un servidor del equipo de alabanza te dice: Sé que Dios me pide dejar algo que hago mal, pero lo compenso sirviendo más.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que, como Samuel le dijo a Saúl, «el obedecer es mejor que los sacrificios».", bien: true, explica: "Saúl empezó bien, pero desobedeció, y Samuel le dijo: «el obedecer es mejor que los sacrificios». Servir más no reemplaza obedecer." },
              { texto: "Que está bien: si sirve más horas, a Dios le da igual que desobedezca en lo otro.", explica: "Samuel le dijo a Saúl: «el obedecer es mejor que los sacrificios». Servir más no reemplaza la obediencia." },
              { texto: "Que siga igual, porque lo que importa es lo que se ve en el culto del domingo.", explica: "Dios no mira lo que mira el hombre: mira el corazón. Y servir no reemplaza obedecer, como Samuel le dijo a Saúl." },
              { texto: "Que no le cuente a nadie y que siga sirviendo más horas para compensar lo que hace.", explica: "Servir más no compensa desobedecer: «el obedecer es mejor que los sacrificios»." },
            ],
            apoyo: "Saúl empezó bien, pero desobedeció",
            ref: "1 Samuel 15:22",
            explica: "Saúl empezó bien, pero desobedeció, y Samuel le dijo: «el obedecer es mejor que los sacrificios».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "El pacto con David: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "david", texto: "David", x: 22, y: 12 },
              { id: "dios", texto: "Dios", x: 78, y: 12 },
              { id: "dinastia", texto: "Una casa: una dinastía para siempre", x: 50, y: 52 },
              { id: "jesus", texto: "Jesús", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "david", a: "dios", relacion: "quiso edificarle casa a" },
              { de: "dios", a: "dinastia", relacion: "prometió a David" },
              { de: "dinastia", a: "jesus", relacion: "se cumple en" },
            ],
            distractores: ["le negó el trono a", "se acaba en"],
            apoyo: "David quiso edificar una casa para Dios, y Dios le prometió edificarle a él una casa, una dinastía",
            ref: "2 Samuel 7:12-13",
            explica: "David quiso edificarle una casa a Dios, y Dios le prometió a él una casa, una dinastía para siempre: es el pacto con David, que se cumple en Jesús.",
          },
          {
            consigna: "El trono de David: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 12 },
              { id: "jesus", texto: "Jesús", x: 50, y: 50 },
              { id: "reino", texto: "Un reino que no tendrá fin", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "dios", a: "jesus", relacion: "da el trono de David a" },
              { de: "jesus", a: "reino", relacion: "tiene" },
            ],
            distractores: ["quita el trono a", "pierde"],
            apoyo: "El ángel se lo anunció a María",
            ref: "Lucas 1:32-33",
            explica: "El ángel anunció a María que el Señor daría a Jesús «el trono de David su padre», y que su reino no tendría fin: el pacto con David se cumple en Jesucristo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué cayeron el reino del norte y Judá.",
            texto: "Reyes explica que el reino del norte cayó ante [[Asiria]] en el 722 antes de Cristo por su infidelidad. Judá también cayó: [[Babilonia]] destruyó Jerusalén y el [[templo]], en el 586 antes de Cristo.",
            distractores: ["Egipto", "Persia", "palacio"],
            errores: {
              Egipto: "El reino del norte cayó ante Asiria en el 722 a. C.",
              Persia: "Fue Babilonia la que destruyó Jerusalén y el templo en el 586 a. C.",
              palacio: "Babilonia destruyó Jerusalén y el templo.",
            },
            apoyo: "El reino del norte cayó ante Asiria en el 722 a. C., y el libro explica por qué",
            ref: "2 Reyes 17:7",
            explica: "Reyes explica que el norte cayó ante Asiria porque «los hijos de Israel pecaron contra Jehová su Dios»; Judá tuvo reformas, como la de Josías, pero también cayó ante Babilonia en el 586 a. C.",
          },
          {
            consigna: "Completa para quiénes se escribió Crónicas y a qué los llama.",
            texto: "Crónicas se escribió después del [[exilio]] para los que habían vuelto. Se concentra en [[David]], en el templo y en la adoración, y llama a [[buscar]] a Dios.",
            distractores: ["diluvio", "Saúl", "olvidar"],
            errores: {
              diluvio: "Crónicas se escribió después del exilio, para los que habían vuelto.",
              Saúl: "Crónicas se concentra en David, en el templo y en la adoración.",
              olvidar: "Crónicas llama a buscar a Dios.",
            },
            apoyo: "Crónicas se escribió después del exilio para los que habían vuelto.",
            ref: "2 Crónicas 7:14",
            explica: "Crónicas vuelve a contar la historia para los que regresaron del exilio: se concentra en David, en el templo y en la adoración, y los llama a buscar a Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo la historia del reino, desde Salomón hasta Crónicas.",
            eventos: [
              { texto: "Salomón construye el templo", fecha: "En los días de Salomón" },
              { texto: "El reino se divide: Israel al norte y Judá al sur", fecha: "Hacia el 930 a. C." },
              { texto: "El reino del norte cae ante Asiria", fecha: "722 a. C." },
              { texto: "Babilonia destruye Jerusalén y el templo", fecha: "586 a. C." },
              { texto: "Crónicas cuenta la historia otra vez para los que volvieron", fecha: "Después del exilio" },
            ],
            apoyo: "Hacia el año 930 a. C. el reino se dividió: Israel al norte y Judá al sur.",
            ref: "2 Reyes 17:7",
            explica: "Salomón construyó el templo; hacia el 930 a. C. el reino se dividió; el norte cayó ante Asiria en el 722 y Babilonia destruyó Jerusalén en el 586. Crónicas se escribió después del exilio.",
          },
          {
            consigna: "Ordena estos hechos del reino en el tiempo, del primero al último.",
            eventos: [
              { texto: "El corazón de Salomón se aparta de Dios", fecha: "Al final de la vida de Salomón" },
              { texto: "Israel queda al norte y Judá al sur", fecha: "Hacia el 930 a. C." },
              { texto: "Asiria vence al reino del norte", fecha: "722 a. C." },
              { texto: "Judá cae, aunque tuvo reformas como la de Josías", fecha: "586 a. C." },
              { texto: "Joaquín, descendiente de David, sale de la cárcel en Babilonia", fecha: "Al final del libro de Reyes" },
              { texto: "Crónicas llama a buscar a Dios a los que volvieron", fecha: "Después del exilio" },
            ],
            apoyo: "Judá tuvo reformas, como la de Josías, pero también cayó",
            ref: "2 Reyes 17:7",
            explica: "Al final de su vida, Salomón se apartó de Dios; el reino se dividió hacia el 930 a. C., el norte cayó en el 722 y Judá en el 586. Reyes termina con Joaquín fuera de la cárcel, y Crónicas se escribió después del exilio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Es el pacto con David.",
            ref: "2 Samuel 7:16; Lucas 1:32-33",
            clave: {
              id: "pr-n3-pentateuco-historicos-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le prometió Dios a David y cómo se cumple esa promesa en Jesucristo?",
              ideas: [
                { id: "casa", peso: 50, texto: "Dios le prometió edificarle una casa, una dinastía: su casa y su reino serían afirmados para siempre.", formas: ["una casa", "dinastia", "para siempre", "trono eterno", "reino eterno", "afirmad*"] },
                { id: "jesus", peso: 50, texto: "Se cumple en Jesús: el Señor le dio «el trono de David su padre», y su reino no tiene fin.", formas: ["trono de david", "no (tendra|tiene|tendria) fin", "sin fin", "se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)"] },
              ],
              modelo: "Dios le prometió a David edificarle una casa, una dinastía, y afirmar su reino para siempre. La promesa se cumple en Jesucristo: el Señor le dio «el trono de David su padre», y su reino no tendrá fin.",
            },
          },
          {
            apoyo: "Ni siquiera el mejor rey de Israel podía ser el rey definitivo.",
            ref: "2 Samuel 12:7; Lucas 1:32-33",
            clave: {
              id: "pr-n3-pentateuco-historicos-5-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué el pecado de David muestra que el pueblo necesitaba un rey mejor que él?",
              ideas: [
                { id: "pecado", peso: 50, texto: "David pecó con Betsabé y fue culpable del asesinato de Urías; se arrepintió, pero las consecuencias marcaron a su familia.", formas: ["betsabe", "urias", "se arrepinti*", "consecuencias", "natan"] },
                { id: "definitivo", peso: 50, texto: "Ni el mejor rey de Israel podía ser el rey definitivo: el pacto con David se cumple en Jesucristo.", formas: ["rey definitivo", "ningun rey humano", "se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "(jesus|cristo|jesucristo) es el rey"] },
              ],
              modelo: "Porque David pecó con Betsabé y fue culpable del asesinato de Urías. Se arrepintió, pero las consecuencias marcaron a su familia. Ni siquiera el mejor rey de Israel podía ser el rey definitivo: el pacto con David se cumple en Jesucristo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Esdras, Nehemías y Ester: el regreso y la providencia
    "n3-pentateuco-historicos-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué rey permitió a los judíos volver y reconstruir el templo?", reverso: "Ciro, rey de Persia, en el 538 a. C.", apoyo: "En el 538 a. C., Ciro, rey de Persia, permitió a los judíos volver y reconstruir el templo" },
              { frente: "¿Con quién volvió el primer grupo de judíos?", reverso: "Con Zorobabel.", apoyo: "Bajo Zorobabel volvió un primer grupo." },
              { frente: "¿Qué profetas animaron al pueblo cuando la obra se detuvo?", reverso: "Hageo y Zacarías.", apoyo: "los profetas Hageo y Zacarías animaron al pueblo" },
              { frente: "¿Cuándo se terminó de reconstruir el templo?", reverso: "Hacia el 516 a. C.", apoyo: "el templo se terminó hacia el 516 a. C." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién era Esdras?", reverso: "Un sacerdote y escriba que llegó unos sesenta años después del templo.", apoyo: "Unos sesenta años después llegó Esdras, sacerdote y escriba" },
              { frente: "¿Qué hacía Nehemías en la corte de Persia?", reverso: "Era copero del rey.", apoyo: "Nehemías era copero del rey de Persia." },
              { frente: "¿En cuántos días se terminó el muro de Jerusalén?", reverso: "En cincuenta y dos días.", apoyo: "El muro se terminó en cincuenta y dos días." },
              { frente: "¿De dónde viene la fiesta de Purim?", reverso: "De cuando el pueblo fue librado, después de que Ester arriesgó su vida.", apoyo: "Ester arriesgó su vida, y el pueblo fue librado; de allí viene la fiesta de Purim" },
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
            consigna: "Ordena en el tiempo el regreso del exilio, del decreto de Ciro a la llegada de Esdras.",
            eventos: [
              { texto: "Ciro permite a los judíos volver y reconstruir el templo", fecha: "538 a. C." },
              { texto: "Hageo y Zacarías animan al pueblo a seguir la obra", fecha: "Cuando la obra se detuvo" },
              { texto: "Se termina de reconstruir el templo", fecha: "Hacia el 516 a. C." },
              { texto: "Ester arriesga su vida en la corte de Persia", fecha: "Entre el templo y Esdras" },
              { texto: "Llega Esdras, sacerdote y escriba", fecha: "Unos sesenta años después" },
            ],
            apoyo: "el templo se terminó hacia el 516 a. C.",
            ref: "Esdras 1:1",
            explica: "En el 538 a. C. Ciro permitió el regreso; la obra se detuvo, pero Hageo y Zacarías animaron al pueblo y el templo se terminó hacia el 516. Ester vivió entre la terminación del templo y la llegada de Esdras.",
          },
          {
            consigna: "Ordena estos hechos del regreso en el tiempo, del primero al último.",
            eventos: [
              { texto: "Bajo Zorobabel vuelve un primer grupo", fecha: "Tras el decreto de Ciro" },
              { texto: "El templo queda terminado", fecha: "Hacia el 516 a. C." },
              { texto: "Mardoqueo le habla a la reina Ester", fecha: "En tiempos del rey Asuero" },
              { texto: "Esdras llega para enseñar la ley", fecha: "Unos sesenta años después" },
              { texto: "Esdras lee la ley delante del pueblo", fecha: "Al terminarse el muro" },
            ],
            apoyo: "Bajo Zorobabel volvió un primer grupo.",
            ref: "Esdras 7:10",
            explica: "Tras el decreto de Ciro volvió un primer grupo con Zorobabel, y el templo se terminó hacia el 516 a. C. Ester vivió en tiempos del rey Asuero, antes de que llegara Esdras, que leyó la ley al terminarse el muro.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Esdras 7:10",
            consigna: "¿Para qué tres cosas había preparado Esdras su corazón con la ley de Jehová? Toca las tres palabras.",
            texto: "había preparado su corazón para [[inquirir]] la ley de Jehová y para [[cumplirla]], y para [[enseñar]]",
            apoyo: "Con él, el pueblo volvió a ordenar su vida según la Palabra.",
            explica: "Esdras preparó su corazón para inquirir la ley, cumplirla y enseñarla; con él, el pueblo volvió a ordenar su vida según la Palabra.",
          },
          {
            ref: "Esdras 1:1",
            consigna: "Ciro dio su decreto para que se cumpliera la palabra de Jehová. ¿Por boca de quién la había dicho? Toca su nombre.",
            texto: "para que se cumpliese la palabra de Jehová por boca de [[Jeremías]]",
            apoyo: "un decreto de su rey abrió el camino de regreso, tal como Dios lo había anunciado",
            explica: "El decreto de Ciro en el 538 a. C. abrió el camino de regreso, tal como Dios lo había anunciado por boca de Jeremías.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Frente a la burla y las amenazas, unió la oración con el trabajo",
            situacion: "Te encargan dirigir al equipo de servidores que va a reparar el salón de la iglesia, que quedó en muy mal estado.",
            escenas: [
              {
                id: "e1",
                narra: "Al ver el salón destruido, el equipo se desanima y alguien propone dejarlo como está.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Reúnes al equipo para orar por la obra, como Nehemías, y después organizan el trabajo.", valor: 2, explica: "Nehemías, al saber que los muros seguían en ruinas, lloró, ayunó y oró, y después pidió permiso para ir a reconstruirlos." },
                  { texto: "Organizas el trabajo enseguida y dejas la oración para cuando hayan terminado toda la obra.", valor: 1, explica: "Organizar está bien, pero Nehemías empezó orando y unió la oración con el trabajo." },
                  { texto: "Le dices al pastor que es imposible y que mejor dejen el salón como está.", valor: 0, explica: "Nehemías no se rindió ante las ruinas: oró, pidió permiso y fue a reconstruir.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "A la semana, unos vecinos se burlan del trabajo, y algunos servidores ya no quieren seguir.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Solo oran juntos por los vecinos, y dejan la obra hasta que dejen de burlarse.", valor: 1, explica: "Orar es lo primero, pero Nehemías no detuvo la obra: unió la oración con el trabajo." },
                  { texto: "Respondes a las burlas con más burlas, para que los vecinos aprendan a respetar a la iglesia.", valor: 0, explica: "Frente a la burla y las amenazas, Nehemías no respondió con burlas: unió la oración con el trabajo." },
                  { texto: "Oran juntos por la oposición y siguen con la obra: unes la oración con el trabajo.", valor: 2, explica: "Así lo hizo Nehemías: frente a la burla y las amenazas, unió la oración con el trabajo, y el muro se terminó en cincuenta y dos días." },
                ],
              },
              {
                id: "e3",
                narra: "La obra se termina, y para la inauguración alguien propone hacer solo una fiesta.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Leer juntos la Palabra y explicarla para que todos la entiendan, y celebrar con gozo.", valor: 2, explica: "Al terminar el muro, Esdras leyó la ley y los levitas ponían el sentido: la reconstrucción fue una renovación por la Palabra, y el gozo de Jehová es la fuerza de su pueblo." },
                  { texto: "Hacer la fiesta con una oración corta al comienzo, sin detenerse a leer ni explicar la Palabra.", valor: 1, explica: "Celebrar está bien, pero la reconstrucción no fue solo de piedras: fue una renovación por la Palabra." },
                  { texto: "Celebrar lo que lograron con sus propias fuerzas, sin mencionar a Dios para nada.", valor: 0, explica: "La obra se hizo con oración y trabajo, y el gozo de Jehová es la fuerza de su pueblo." },
                ],
              },
            ],
          },
          {
            apoyo: "La reconstrucción no fue solo de piedras: fue una renovación por la Palabra.",
            situacion: "Eres líder de una célula que se fue apagando: varios dejaron de venir y el estudio de la Biblia se volvió pura costumbre.",
            escenas: [
              {
                id: "e1",
                narra: "Una noche te das cuenta de que la célula está casi en ruinas, y te duele mucho.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Preparas enseguida un plan nuevo para la célula y lo pones en marcha esa misma semana.", valor: 1, explica: "Un plan ayuda, pero Nehemías primero lloró, ayunó y oró, y después pidió permiso al rey." },
                  { texto: "Como Nehemías, oras y ayunas por la célula, y después hablas con tu pastor del plan.", valor: 2, explica: "Nehemías lloró, ayunó y oró por los muros en ruinas, y después pidió permiso al rey para ir a reconstruirlos." },
                  { texto: "Decides cerrar la célula, porque si se apagó es que ya no vale la pena seguir con ella.", valor: 0, explica: "Nehemías no se rindió ante las ruinas: oró, pidió permiso y fue a reconstruir.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Al retomar, algunos se burlan: dicen que la célula no va a durar ni un mes.",
                pregunta: "¿Cómo sigues?",
                opciones: [
                  { texto: "Oras con los que quedan y sigues trabajando: visitas, llamas e invitas de nuevo.", valor: 2, explica: "Frente a la burla y las amenazas, Nehemías unió la oración con el trabajo." },
                  { texto: "Sigues trabajando solo, sin pedir oración a nadie ni contarle a nadie lo que pasa.", valor: 1, explica: "Trabajar está bien, pero Nehemías unió la oración con el trabajo." },
                  { texto: "Les respondes con enojo en el chat del grupo para que dejen de burlarse de ti.", valor: 0, explica: "Nehemías no respondió a la burla con enojo: oró y siguió trabajando." },
                ],
              },
              {
                id: "e3",
                narra: "En la reunión, al leer la Palabra, una hermana llora porque ve cuánto se había alejado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Explicas el texto para que lo entiendan y le recuerdas que el gozo de Jehová es su fuerza.", valor: 2, explica: "Los levitas ponían el sentido para que el pueblo entendiera la ley; el pueblo lloró al oírla, pero se les dijo: «el gozo de Jehová es vuestra fuerza»." },
                  { texto: "Oras por ella en ese momento y después sigues leyendo, sin detenerte a explicar nada del texto.", valor: 1, explica: "Orar por ella es bueno, pero la renovación vino cuando el pueblo entendió la Palabra: los levitas ponían el sentido." },
                  { texto: "Le dices que, si llora, es porque Dios ya se cansó de ella y de sus caídas.", valor: 0, explica: "El pueblo también lloró al oír la ley, y se le dijo que el gozo de Jehová era su fuerza." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el libro de Ester: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En todo el libro de Ester no aparece ni una vez el nombre de Dios.", verdad: true, explica: "Y sin embargo su mano se ve en cada detalle: Dios gobierna la historia aun cuando parece ausente.", apoyo: "En todo el libro de Ester no aparece ni una vez el nombre de Dios" },
              { texto: "Como no se nombra a Dios, el libro de Ester muestra que Dios estuvo ausente de aquella historia.", verdad: false, explica: "Su mano se ve en cada detalle: una reina en el lugar justo, una noche sin sueño del rey y un decreto que se vuelve en contra de quien lo pensó.", apoyo: "y sin embargo su mano se ve en cada detalle", ref: "Ester 4:14" },
              { texto: "Amán planeó destruir a todos los judíos.", verdad: true, explica: "Y Mardoqueo le dijo a la reina Ester: «¿Y quién sabe si para esta hora has llegado al reino?».", apoyo: "Amán planeó destruir a todos los judíos", ref: "Ester 4:14" },
            ],
          },
          {
            consigna: "Sobre Ester y la providencia de Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Ester se quedó callada para cuidar su vida, y el pueblo se salvó de todos modos.", verdad: false, explica: "Ester arriesgó su vida, y el pueblo fue librado; de allí viene la fiesta de Purim.", apoyo: "Ester arriesgó su vida, y el pueblo fue librado" },
              { texto: "La fiesta de Purim viene de cuando el pueblo fue librado en tiempos de Ester.", verdad: true, explica: "Ester arriesgó su vida, y el pueblo fue librado.", apoyo: "de allí viene la fiesta de Purim" },
              { texto: "Dios gobierna la historia aun cuando parece ausente.", verdad: true, explica: "Así lo muestra Ester: una reina en el lugar justo, una noche sin sueño del rey y un decreto que se vuelve en contra de quien lo pensó.", apoyo: "Dios gobierna la historia aun cuando parece ausente." },
              { texto: "La historia de Ester ocurre en Jerusalén, después de la llegada de Esdras.", verdad: false, explica: "Ocurre en la corte de Persia, en tiempos del rey Asuero, entre la terminación del templo y la llegada de Esdras.", apoyo: "Ester ocurre en la corte de Persia, en tiempos del rey Asuero" },
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
            caso: "Una joven de tu grupo te escribe: Soy la única creyente en mi trabajo y no sé qué hago allí.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que renuncie cuanto antes, porque una creyente no tiene nada que hacer en un lugar así.", explica: "Ester estaba en la corte de Persia, y allí Dios la usó para librar a su pueblo." },
              { texto: "Que, como Ester, se pregunte para qué la puso Dios en ese lugar donde está hoy.", bien: true, explica: "Mardoqueo le dijo a Ester: «¿Y quién sabe si para esta hora has llegado al reino?». Dios gobierna la historia aun cuando parece ausente." },
              { texto: "Que está en ese trabajo por pura casualidad, y que Dios no tiene nada que ver con eso.", explica: "En Ester, la mano de Dios se ve en cada detalle, como una reina en el lugar justo." },
              { texto: "Que esconda su fe para no tener problemas, y que espere a que las cosas cambien solas.", explica: "Ester arriesgó su vida por su pueblo, y el pueblo fue librado." },
            ],
            apoyo: "como Ester, pregúntate para qué te puso Dios donde estás",
            ref: "Ester 4:14",
            explica: "Como Ester, cada creyente puede preguntarse para qué lo puso Dios donde está: Dios gobierna la historia aun cuando parece ausente.",
          },
          {
            caso: "Un hermano que discipulas te dice: Dios nunca se muestra en mi vida; todo me parece pura casualidad.",
            pregunta: "¿Qué le muestras del libro de Ester?",
            opciones: [
              { texto: "Que si Dios no se muestra con milagros grandes, es señal de que lo abandonó por algo.", explica: "En Ester no aparece el nombre de Dios, y aun así su mano guardó a su pueblo." },
              { texto: "Que Dios solo actúa en las historias de la Biblia donde aparece nombrado una y otra vez.", explica: "En Ester no aparece ni una vez el nombre de Dios, y sin embargo su mano se ve en cada detalle." },
              { texto: "Que en Ester no se nombra a Dios, pero su mano se ve en cada detalle de la historia.", bien: true, explica: "Una reina en el lugar justo, una noche sin sueño del rey, un decreto que se vuelve en contra de quien lo pensó: Dios gobierna aun cuando parece ausente." },
              { texto: "Que la casualidad gobierna la vida, y que no pierda el tiempo buscando a Dios en los detalles.", explica: "En Ester, lo que parece casualidad muestra la mano de Dios: una noche sin sueño del rey, una reina en el lugar justo." },
            ],
            apoyo: "Dios gobierna la historia aun cuando parece ausente.",
            ref: "Ester 4:14",
            explica: "En Ester no se nombra a Dios, pero su mano se ve en cada detalle: él gobierna la historia aun cuando parece ausente.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Frente a la burla y las amenazas, unió la oración con el trabajo",
            ref: "Nehemías 4:9; Nehemías 6:15",
            clave: {
              id: "pr-n3-pentateuco-historicos-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo dirigió Nehemías la reconstrucción de los muros de Jerusalén?",
              ideas: [
                { id: "oro", peso: 50, texto: "Cuando supo que los muros seguían en ruinas, lloró, ayunó y oró, y pidió permiso al rey para reconstruirlos.", formas: ["lloro", "ayun*", "oro", "pidio permiso", "permiso al rey"] },
                { id: "trabajo", peso: 50, texto: "Frente a la burla y las amenazas, unió la oración con el trabajo, y el muro se terminó en cincuenta y dos días.", formas: ["unio la oracion con el trabajo", "oracion con el trabajo", "orar y trabajar", "oro y trabajo", "oraba y trabajaba", "cincuenta y dos dias", "52 dias"] },
              ],
              modelo: "Cuando supo que los muros seguían en ruinas, Nehemías lloró, ayunó y oró, y después pidió permiso al rey para ir a reconstruirlos. Frente a la burla y las amenazas, unió la oración con el trabajo, y el muro se terminó en cincuenta y dos días.",
            },
          },
          {
            apoyo: "La reconstrucción no fue solo de piedras: fue una renovación por la Palabra.",
            ref: "Nehemías 8:10",
            clave: {
              id: "pr-n3-pentateuco-historicos-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué decimos que la reconstrucción de Jerusalén no fue solo de piedras?",
              ideas: [
                { id: "ley", peso: 50, texto: "Al terminar el muro, Esdras leyó la ley delante del pueblo y los levitas ponían el sentido para que la entendieran.", formas: ["leyo la ley", "lectura de la ley", "ponian el sentido", "explica* la ley", "explica* la palabra", "para que la entendieran", "los levitas"] },
                { id: "gozo", peso: 50, texto: "Fue una renovación por la Palabra: el pueblo lloró al oírla, y se les dijo que el gozo de Jehová era su fuerza.", formas: ["renovacion", "renov*", "gozo de jehova", "el gozo", "su fuerza", "vuestra fuerza"] },
              ],
              modelo: "Porque, al terminar el muro, Esdras leyó la ley delante del pueblo y los levitas ponían el sentido para que la entendieran. El pueblo lloró al oírla, pero se le dijo que el gozo de Jehová era su fuerza: fue una renovación por la Palabra.",
            },
          },
        ],
      },
    ],
  },
};
