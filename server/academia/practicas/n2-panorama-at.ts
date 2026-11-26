/**
 * Las prácticas de «Panorama del Antiguo Testamento» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-panorama-at.ts), con la guía de docs/academia-practicas.md.
 * Cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección; su
 * consigna dice qué hacer y con qué criterio, para que se entienda en todas sus formas de jugar. Estrena las piezas
 * del Nivel 2: la línea del tiempo (el reino y el regreso del exilio) y el mapa de ideas (el pacto del Sinaí, la misión
 * de los profetas y el final del Antiguo Testamento).
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_PANORAMA_AT: PracticasMateria = {
  materia: "n2-panorama-at",
  mision: {
    titulo: "El hilo rojo de la promesa",
    intro: "Un amigo nuevo en la fe te dice que el Antiguo Testamento le parece un libro viejo y difícil. Te pide que le cuentes su historia de principio a fin: cómo se organiza, qué pasó desde la creación hasta el regreso del exilio y cómo cada parte prepara la venida de Jesús. Repasa las seis lecciones para contársela completa.",
    cierre: "Ya puedes contar la historia del Antiguo Testamento, de Génesis a Malaquías, y mostrar el hilo de la promesa de Dios que se cumple en Jesús.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Cómo se organiza el Antiguo Testamento
    "n2-panorama-at-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántos libros tiene el Antiguo Testamento?", reverso: "Treinta y nueve, repartidos en cinco secciones.", apoyo: "El Antiguo Testamento tiene 39 libros en cinco secciones" },
              { frente: "¿Qué libros forman la Ley o Pentateuco?", reverso: "Génesis, Éxodo, Levítico, Números y Deuteronomio.", apoyo: "La Ley o Pentateuco (5 libros): Génesis, Éxodo, Levítico, Números y Deuteronomio." },
              { frente: "¿Por qué unos profetas se llaman mayores y otros menores?", reverso: "Por lo largo de sus libros, no por su importancia.", apoyo: "Los profetas se llaman mayores o menores por lo largo de sus libros, no por su importancia." },
              { frente: "¿Qué hizo Jesús resucitado con los dos discípulos que iban a Emaús?", reverso: "Les explicó quién era Él usando las Escrituras del Antiguo Testamento.", apoyo: "les explicó quién era Él usando solo una Biblia: la que hoy llamamos Antiguo Testamento" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué cuentan los libros históricos, de Josué a Ester?", reverso: "La vida de Israel en su tierra, el reino, la caída y el regreso del exilio.", apoyo: "La vida de Israel en su tierra, el reino, la caída y el regreso del exilio." },
              { frente: "¿Qué libros son los profetas mayores?", reverso: "Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel.", apoyo: "Los profetas mayores (5): Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel." },
              { frente: "¿En qué tres grupos ordenan los judíos los mismos libros?", reverso: "La Ley, los Profetas y los Escritos.", apoyo: "Los judíos ordenan los mismos libros en tres grupos: la Ley, los Profetas y los Escritos" },
              { frente: "¿Qué prometió Dios apenas el ser humano cayó en el pecado?", reverso: "Que un descendiente de la mujer heriría la cabeza de la serpiente.", apoyo: "Dios prometió que un descendiente de la mujer heriría la cabeza de la serpiente" },
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
            consigna: "Une cada sección del Antiguo Testamento con sus libros.",
            pares: [
              ["La Ley o Pentateuco", "5 libros: de Génesis a Deuteronomio"],
              ["Los libros históricos", "12 libros: de Josué a Ester"],
              ["Los libros poéticos", "5 libros: de Job a Cantares"],
              ["Los profetas mayores", "5 libros: de Isaías a Daniel"],
              ["Los profetas menores", "12 libros: de Oseas a Malaquías"],
            ],
            apoyo: "Los libros históricos (12): de Josué a Ester.",
            explica: "Son cinco secciones y 39 libros: la Ley (5), los históricos (12), los poéticos (5), los profetas mayores (5) y los profetas menores (12).",
          },
          {
            consigna: "Une cada descripción con su sección del Antiguo Testamento.",
            pares: [
              ["5 libros: los comienzos y el pacto de Dios con Israel", "La Ley o Pentateuco"],
              ["12 libros: Israel en su tierra, el reino y el exilio", "Los libros históricos"],
              ["5 libros de oración, adoración y sabiduría", "Los libros poéticos"],
              ["5 libros, entre ellos Lamentaciones y Ezequiel", "Los profetas mayores"],
              ["12 libros: el primero es Oseas y el último, Malaquías", "Los profetas menores"],
            ],
            apoyo: "Los libros poéticos (5): Job, Salmos, Proverbios, Eclesiastés y Cantares.",
            explica: "La Ley cuenta los comienzos y el pacto; los históricos, la vida de Israel en su tierra; los poéticos son oración y sabiduría, y después vienen los profetas mayores y los menores.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿En qué sección está cada libro? Lleva cada libro a su grupo.",
            grupos: ["La Ley o Pentateuco", "Los libros históricos", "Los profetas menores"],
            frases: [
              { texto: "Génesis", grupo: 0 },
              { texto: "Levítico", grupo: 0 },
              { texto: "Deuteronomio", grupo: 0 },
              { texto: "Josué", grupo: 1, explica: "Los libros históricos van de Josué a Ester." },
              { texto: "Ester", grupo: 1, explica: "Los libros históricos van de Josué a Ester." },
              { texto: "Oseas", grupo: 2, explica: "Los profetas menores van de Oseas a Malaquías." },
              { texto: "Malaquías", grupo: 2, explica: "Los profetas menores van de Oseas a Malaquías." },
            ],
            apoyo: "La Ley o Pentateuco (5 libros): Génesis, Éxodo, Levítico, Números y Deuteronomio.",
            explica: "La Ley son los cinco primeros libros; los históricos van de Josué a Ester, y los profetas menores, de Oseas a Malaquías.",
          },
          {
            consigna: "¿Es un libro poético o un profeta mayor? Lleva cada libro a su grupo.",
            grupos: ["Los libros poéticos", "Los profetas mayores"],
            frases: [
              { texto: "Job", grupo: 0 },
              { texto: "Salmos", grupo: 0 },
              { texto: "Proverbios", grupo: 0 },
              { texto: "Eclesiastés", grupo: 0 },
              { texto: "Jeremías", grupo: 1 },
              { texto: "Lamentaciones", grupo: 1, explica: "Lamentaciones está entre los profetas mayores, después de Jeremías." },
              { texto: "Ezequiel", grupo: 1 },
              { texto: "Daniel", grupo: 1, explica: "Daniel está entre los profetas mayores, después de Ezequiel." },
            ],
            apoyo: "Los profetas mayores (5): Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel.",
            explica: "Los poéticos son Job, Salmos, Proverbios, Eclesiastés y Cantares; los profetas mayores, Isaías, Jeremías, Lamentaciones, Ezequiel y Daniel.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el Antiguo Testamento en la Biblia del cristiano: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Antiguo Testamento es una parte vieja de la Biblia que ya no sirve.", verdad: false, explica: "No es una parte vieja que ya no sirve: es el primer tomo de una sola historia, que llega a su punto más alto en Jesucristo.", apoyo: "El Antiguo Testamento no es una parte vieja que ya no sirve", ref: "Lucas 24:27" },
              { texto: "Jesús resucitado explicó quién era Él usando las Escrituras que hoy llamamos Antiguo Testamento.", verdad: true, explica: "Camino a Emaús, Jesús mostró lo que las Escrituras decían de Él.", apoyo: "les explicó quién era Él usando solo una Biblia: la que hoy llamamos Antiguo Testamento", ref: "Lucas 24:27" },
              { texto: "Lo que se escribió antes en las Escrituras se escribió para nuestra enseñanza.", verdad: true, explica: "Así lo enseña Pablo: esas historias nos dan paciencia, consuelo y esperanza.", apoyo: "Pablo enseña que lo que se escribió antes se escribió para nuestra enseñanza.", ref: "Romanos 15:4" },
            ],
          },
          {
            consigna: "Sobre el Antiguo Testamento en la Biblia del cristiano: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Antiguo Testamento es el primer tomo de una sola historia: la de Dios rescatando a la humanidad.", verdad: true, explica: "Es la misma historia que llega a su punto más alto en Jesucristo.", apoyo: "es el primer tomo de una sola historia, la de Dios rescatando a la humanidad", ref: "Lucas 24:27" },
              { texto: "Las historias de Abraham, de Moisés y de David solo le servían al pueblo de aquel tiempo.", verdad: false, explica: "Se escribieron para nuestra enseñanza: nos enseñan quién es Dios y cómo cumple lo que promete.", apoyo: "Por eso nos dan paciencia, consuelo y esperanza.", ref: "Romanos 15:4" },
              { texto: "Se puede entender bien a Cristo sin conocer las Escrituras que Él mismo leyó.", verdad: false, explica: "Para entender a Cristo hay que conocer las Escrituras que Él leyó, porque hablan de Él.", apoyo: "Para entender a Cristo, hay que conocer las Escrituras que Él mismo leyó." },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo te dice: Yo solo leo el Nuevo Testamento; el Antiguo ya no sirve para los cristianos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: el Antiguo era para Israel, y a nosotros solo nos toca el Nuevo.", explica: "El Antiguo Testamento es el primer tomo de la misma historia, y se escribió también para nuestra enseñanza." },
              { texto: "Jesús lo usó para explicar quién era Él: leerlo te ayuda a conocerlo mejor.", bien: true, explica: "Así lo hizo Jesús camino a Emaús: mostró lo que las Escrituras decían de Él." },
              { texto: "Léelo solo como historia antigua, porque no tiene nada que ver con Jesús.", explica: "Las Escrituras del Antiguo Testamento hablan de Jesús: Él mismo lo mostró a sus discípulos." },
              { texto: "Lee solo los Salmos y los Proverbios, que es lo único que todavía sirve.", explica: "Todo lo que se escribió antes se escribió para nuestra enseñanza, no solo algunos libros." },
            ],
            apoyo: "Leer el Antiguo Testamento es conocer mejor a Jesús.",
            ref: "Lucas 24:27",
            explica: "El Antiguo Testamento no es una parte vieja que ya no sirve: Jesús lo usó para mostrar lo que decía de Él.",
          },
          {
            caso: "Tu hermana menor te pregunta: ¿Para qué leo las historias de Abraham y de Moisés, si pasaron hace tanto tiempo?",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "No hace falta: con saber que Dios existe y portarse bien ya es suficiente.", explica: "Esas historias nos enseñan quién es Dios, cómo es el corazón humano y cómo Dios cumple lo que promete." },
              { texto: "Léelas como cuentos para niños, aunque no tengan que ver con tu vida.", explica: "No son cuentos: se escribieron para nuestra enseñanza y nos dan paciencia, consuelo y esperanza." },
              { texto: "Se escribieron para enseñarnos: muestran cómo Dios cumple lo que promete.", bien: true, explica: "Así lo enseña Romanos 15:4: lo que se escribió antes se escribió para nuestra enseñanza." },
              { texto: "Solo sirven para saber de historia antigua; para la fe no aportan nada.", explica: "Nos enseñan quién es Dios y nos dan paciencia, consuelo y esperanza para hoy." },
            ],
            apoyo: "Las historias de Abraham, de Moisés, de David o de los profetas nos enseñan quién es Dios",
            ref: "Romanos 15:4",
            explica: "Lo que se escribió antes se escribió para nuestra enseñanza: esas historias nos dan paciencia, consuelo y esperanza.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se fue aclarando la promesa de Génesis 3:15, de lo primero a lo último.",
            pasos: [
              "Dios promete un descendiente de la mujer",
              "La promesa se hace más clara con Abraham",
              "La promesa se hace más clara con Moisés",
              "La promesa se hace más clara con David",
              "La promesa se cumple en Jesús, en la cruz",
            ],
            apoyo: "se hace más clara con Abraham, con Moisés, con David y con los profetas, hasta cumplirse en Jesús",
            ref: "Génesis 3:15",
            explica: "La promesa de Génesis 3:15 es como un hilo rojo: atraviesa todo el Antiguo Testamento hasta cumplirse en Jesús.",
          },
          {
            consigna: "Ordena el hilo de la promesa, desde la caída hasta la cruz.",
            pasos: [
              "El ser humano cae en el pecado",
              "Dios promete que un descendiente de la mujer herirá a la serpiente",
              "La promesa sigue con Abraham y con Moisés",
              "La promesa sigue con David y con los profetas",
              "Jesús vence al diablo en la cruz",
            ],
            apoyo: "Apenas el ser humano cayó en el pecado, Dios prometió que un descendiente de la mujer heriría la cabeza de la serpiente.",
            ref: "Génesis 3:15",
            explica: "Apenas cayó el ser humano, Dios prometió al descendiente de la mujer; esa promesa se cumple en Jesús, que venció al diablo en la cruz.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Esa promesa es como un hilo rojo que atraviesa todo el Antiguo Testamento",
            ref: "Génesis 3:15",
            clave: {
              id: "pr-n2-panorama-at-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que la promesa de Génesis 3:15 es como un hilo rojo?",
              ideas: [
                { id: "promesa", peso: 50, texto: "Dios prometió que un descendiente de la mujer heriría la cabeza de la serpiente.", formas: ["descendiente de la mujer", "cabeza de la serpiente", "herir* (la|a) (cabeza|serpiente)", "prometi* un salvador", "promesa de un salvador", "venc* a la serpiente"] },
                { id: "atraviesa", peso: 50, texto: "Esa promesa atraviesa todo el Antiguo Testamento hasta cumplirse en Jesús.", formas: ["atravies*", "todo el antiguo testamento", "toda la historia", "une toda", "se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "mas clara", "hasta (jesus|cristo|jesucristo)"] },
              ],
              modelo: "Porque, apenas el ser humano cayó, Dios prometió que un descendiente de la mujer heriría la cabeza de la serpiente, y esa promesa atraviesa todo el Antiguo Testamento hasta cumplirse en Jesús.",
            },
          },
          {
            apoyo: "hasta cumplirse en Jesús, que venció al diablo en la cruz",
            ref: "Génesis 3:15",
            clave: {
              id: "pr-n2-panorama-at-1-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo se fue aclarando y cumpliendo la promesa que Dios hizo apenas el ser humano cayó en el pecado?",
              ideas: [
                { id: "clara", peso: 50, texto: "Se hizo más clara con Abraham, con Moisés, con David y con los profetas.", formas: ["mas clara", "abraham", "moises", "david", "los profetas"] },
                { id: "cruz", peso: 50, texto: "Se cumplió en Jesús, que venció al diablo en la cruz.", formas: ["venc* al diablo", "venc* (satanas|serpiente|diablo)", "derrot* (al|a) (diablo|satanas|serpiente)", "en la cruz", "se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)"] },
              ],
              modelo: "La promesa se hizo más clara con Abraham, con Moisés, con David y con los profetas, y se cumplió en Jesús, que venció al diablo en la cruz.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Los comienzos: Génesis
    "n2-panorama-at-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué quiere decir Génesis?", reverso: "Origen: en sus capítulos están los comienzos de casi todo.", apoyo: "Génesis quiere decir origen." },
              { frente: "¿Para qué hizo Dios al ser humano a su imagen?", reverso: "Para tener comunión con Él y cuidar la creación.", apoyo: "para tener comunión con Él y cuidar la creación" },
              { frente: "¿Qué hizo Dios después de que Adán y Eva desobedecieron?", reverso: "No los abandonó: los buscó, los vistió y les dio la promesa de un Salvador.", apoyo: "Aun así, Dios no los abandonó: los buscó, los vistió y les dio la promesa de un Salvador" },
              { frente: "¿Qué pasó en Babel?", reverso: "Los hombres quisieron hacerse un nombre sin Dios, y Él confundió su lengua.", apoyo: "en Babel, los hombres quisieron hacerse un nombre sin Dios, y Él confundió su lengua y los esparció por la tierra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál fue la señal del pacto de Dios con Noé?", reverso: "El arco iris.", apoyo: "hizo pacto con él con la señal del arco iris" },
              { frente: "¿Qué tres promesas le hizo Dios a Abram?", reverso: "Una tierra, una gran nación y una bendición para todas las familias de la tierra.", apoyo: "una tierra, una descendencia que sería una gran nación y una bendición para todas las familias de la tierra" },
              { frente: "¿A quién le cambió Dios el nombre por Israel?", reverso: "A Jacob, cuyos doce hijos dieron origen a las doce tribus.", apoyo: "después a Jacob, a quien cambió el nombre por Israel" },
              { frente: "¿Cómo terminó Israel viviendo en Egipto?", reverso: "José llegó a gobernar Egipto y salvó a su familia del hambre.", apoyo: "José, vendido por sus hermanos, llegó a gobernar Egipto y salvó a su familia del hambre." },
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
            consigna: "Ordena los grandes momentos de Génesis, del primero al último.",
            pasos: [
              "Dios crea todo con su palabra y ve que es bueno",
              "Adán y Eva desobedecen y entra el pecado",
              "Dios juzga al mundo con el diluvio y salva a Noé",
              "En Babel, Dios confunde la lengua de los hombres",
              "Dios llama a Abram a dejar Ur de los caldeos",
              "José llega a gobernar Egipto",
            ],
            apoyo: "Génesis cuenta el origen de todo y del pecado, y el comienzo del plan de salvación",
            ref: "Génesis 1:1",
            explica: "Génesis 1 a 11 cuenta la creación, la caída, el diluvio y Babel; desde el capítulo 12, la historia de Abraham, Isaac, Jacob y José.",
          },
          {
            consigna: "Ordena estos hechos de Génesis según pasaron.",
            pasos: [
              "Dios hace al ser humano a su imagen, varón y hembra",
              "Caín mata a su hermano",
              "Noé y su familia se salvan en el arca",
              "Dios hace pacto con Noé con la señal del arco iris",
              "Dios llama a Abram y le hace tres promesas",
              "Dios cambia el nombre de Jacob por Israel",
            ],
            apoyo: "El pecado se extendió: Caín mató a su hermano y la maldad llegó a llenar la tierra.",
            ref: "Génesis 9:13",
            explica: "Después de la caída, el pecado se extendió; Dios juzgó con el diluvio, hizo pacto con Noé y luego llamó a Abram. Después confirmó su promesa a Isaac y a Jacob.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa las tres promesas que Dios le hizo a Abram.",
            texto: "Dios llamó a Abram y le prometió una [[tierra]], una [[descendencia]] que sería una gran nación y una [[bendición]] para todas las familias de la tierra.",
            distractores: ["riqueza", "corona", "ley"],
            errores: {
              riqueza: "Dios no le prometió riquezas: le prometió una tierra, una descendencia y una bendición para todas las familias.",
              ley: "La ley vino mucho después. A Abram, Dios le prometió una bendición para todas las familias de la tierra.",
            },
            apoyo: "le hizo tres promesas: una tierra, una descendencia que sería una gran nación y una bendición para todas las familias de la tierra",
            ref: "Génesis 12:1-3",
            explica: "Dios le prometió a Abram una tierra, una descendencia que sería una gran nación y una bendición para todas las familias de la tierra.",
          },
          {
            consigna: "Completa cuál de las promesas a Abraham se cumple y en quién.",
            texto: "La promesa de una [[bendición]] para todas las familias de la tierra se cumple en [[Jesús]], descendiente de Abraham: por Él llega a todos los [[pueblos]].",
            distractores: ["tierra", "Moisés", "judíos"],
            errores: {
              tierra: "La promesa que se cumple en Jesús es la última: la bendición para todas las familias de la tierra.",
              Moisés: "La promesa se cumple en Jesús, descendiente de Abraham.",
              judíos: "La bendición no es para un solo pueblo: por Jesús llega a todos los pueblos.",
            },
            apoyo: "Esa última promesa se cumple en Jesús, descendiente de Abraham, por quien la bendición llega a todos los pueblos",
            ref: "Gálatas 3:8",
            explica: "La última de las tres promesas, la bendición para todas las familias de la tierra, se cumple en Jesús: por Él llega a todos los pueblos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Abraham y su fe: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Abraham creyó a Dios y le fue contado por justicia.", verdad: true, explica: "Así lo dice Génesis 15:6, y Pablo lo usa para enseñar que somos salvos por la fe.", apoyo: "Abraham creyó a Dios y le fue contado por justicia.", ref: "Génesis 15:6" },
              { texto: "Dios declaró justo a Abraham porque cumplió la ley de Moisés.", verdad: false, explica: "Abraham vivió mucho antes de la ley: Dios lo declaró justo porque creyó.", apoyo: "Mucho antes de la ley, la Biblia muestra que Dios declara justo al que cree en Él.", ref: "Romanos 4:3" },
              { texto: "Abraham creyó cuando todavía no veía la promesa cumplida.", verdad: true, explica: "Su fe no esperó a ver: confió en lo que Dios le había prometido.", apoyo: "Abraham creyó cuando todavía no veía la promesa cumplida." },
            ],
          },
          {
            consigna: "Sobre la promesa a Abraham: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo usa la fe de Abraham para enseñar que somos salvos por la fe.", verdad: true, explica: "Pablo usa Génesis 15:6 en Romanos 4:3.", apoyo: "Pablo usa este versículo para enseñar que somos salvos por la fe", ref: "Romanos 4:3" },
              { texto: "La promesa de bendición a Abraham era solo para el pueblo de Israel.", verdad: false, explica: "Era una bendición para todas las familias de la tierra: por Jesús llega a todos los pueblos.", apoyo: "una bendición para todas las familias de la tierra", ref: "Gálatas 3:8" },
              { texto: "Para que Dios declare justo a alguien, primero tiene que cumplir toda la ley.", verdad: false, explica: "Abraham creyó a Dios y le fue contado por justicia mucho antes de la ley: Dios declara justo al que cree en Él.", apoyo: "Mucho antes de la ley, la Biblia muestra que Dios declara justo al que cree en Él.", ref: "Génesis 15:6" },
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
            consigna: "Una de estas frases sobre José tiene un error. Tócala.",
            frases: [
              "José fue vendido por sus hermanos.",
              "José llegó a gobernar Egipto.",
              "José salvó a su familia del hambre.",
              "Cuando llegó a gobernar, José se vengó de sus hermanos.",
            ],
            malo: 3,
            correccion: "José les dijo que lo que ellos pensaron para mal, Dios lo encaminó a bien.",
            apoyo: "José pudo decir a sus hermanos que lo que ellos pensaron para mal, Dios lo encaminó a bien.",
            ref: "Génesis 50:20",
            explica: "José salvó a su familia del hambre y pudo decirles a sus hermanos que lo que ellos pensaron para mal, Dios lo encaminó a bien.",
          },
          {
            consigna: "Una de estas frases sobre la historia de José tiene un error. Tócala.",
            frases: [
              "Los doce hijos de Jacob dieron origen a las doce tribus.",
              "José, vendido por sus hermanos, llegó a gobernar Egipto.",
              "El dolor de José quedó fuera de los planes de Dios.",
              "Por medio de José, Israel terminó viviendo en Egipto.",
            ],
            malo: 2,
            correccion: "Ningún dolor queda fuera del alcance de los planes de Dios.",
            apoyo: "Ningún dolor queda fuera del alcance de los planes de Dios",
            ref: "Romanos 8:28",
            explica: "Lo que los hermanos de José pensaron para mal, Dios lo encaminó a bien: ningún dolor queda fuera de sus planes.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga del trabajo te dice: Mis propios hermanos me hicieron mucho daño; siento que Dios se olvidó de mí.",
            pregunta: "¿Qué le respondes con amor?",
            opciones: [
              { texto: "Acuérdate de José: lo que pensaron para mal, Dios lo encaminó a bien.", bien: true, explica: "Es lo que José pudo decir a sus hermanos: ningún dolor queda fuera del alcance de los planes de Dios." },
              { texto: "Si te hicieron daño, es que Dios te está castigando por algo que hiciste.", explica: "José sufrió por lo que le hicieron sus hermanos, y Dios lo encaminó a bien." },
              { texto: "Lo mejor es que te alejes de ellos y no vuelvas a pensar en lo que pasó.", explica: "José volvió a ver a sus hermanos, salvó a su familia del hambre y vio la mano de Dios en lo que pasó." },
              { texto: "Dios no tiene nada que ver con eso: las cosas malas pasan y ya está.", explica: "José vio que Dios había encaminado a bien lo que sus hermanos pensaron para mal." },
            ],
            apoyo: "Ningún dolor queda fuera del alcance de los planes de Dios",
            ref: "Génesis 50:20",
            explica: "José pudo decir que lo que sus hermanos pensaron para mal, Dios lo encaminó a bien. Ningún dolor queda fuera de los planes de Dios.",
          },
          {
            caso: "Un compañero de la iglesia te escribe: Perdí mi trabajo por la mentira de otro; no veo cómo Dios puede sacar algo bueno de esto.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "No esperes nada bueno de esto: lo que empieza mal siempre termina mal.", explica: "La historia de José muestra otra cosa: lo que sus hermanos pensaron para mal, Dios lo encaminó a bien." },
              { texto: "Piensa en José: vendido por sus hermanos, terminó salvando a su familia.", bien: true, explica: "José llegó a gobernar Egipto y salvó a su familia del hambre: Dios encaminó a bien lo que otros pensaron para mal." },
              { texto: "Busca la manera de vengarte, para que esa persona pague todo lo que te hizo.", explica: "José, con poder en Egipto, salvó a su familia: vio que Dios había encaminado a bien lo que pasó." },
              { texto: "Eso te pasó por tener poca fe; si oraras más, nada de esto te habría pasado.", explica: "José sufrió por lo que le hicieron sus hermanos, y Dios lo encaminó a bien." },
            ],
            apoyo: "José pudo decir a sus hermanos que lo que ellos pensaron para mal, Dios lo encaminó a bien.",
            ref: "Génesis 50:20",
            explica: "José, vendido por sus hermanos, llegó a gobernar Egipto y salvó a su familia del hambre. Dios sigue obrando.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Esa última promesa se cumple en Jesús, descendiente de Abraham, por quien la bendición llega a todos los pueblos",
            ref: "Génesis 12:1-3; Gálatas 3:8",
            clave: {
              id: "pr-n2-panorama-at-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le prometió Dios a Abraham y por qué esa promesa es importante para nosotros?",
              ideas: [
                { id: "promesas", peso: 50, texto: "Le prometió una tierra, una gran nación y una bendición para todas las familias de la tierra.", formas: ["tierra", "descendencia", "gran nacion", "bendicion para todas", "todas las familias", "tres promesas"] },
                { id: "jesus", peso: 50, texto: "Esa bendición se cumple en Jesús y llega a todos los pueblos, también a nosotros.", formas: ["se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "por (jesus|cristo|jesucristo)", "todos los pueblos", "llega a (todos|nosotros)", "(jesus|cristo|jesucristo) descendiente"] },
              ],
              modelo: "Dios le prometió una tierra, una descendencia que sería una gran nación y una bendición para todas las familias de la tierra. Es importante porque esa bendición se cumple en Jesús y llega a todos los pueblos, también a nosotros.",
            },
          },
          {
            apoyo: "Mucho antes de la ley, la Biblia muestra que Dios declara justo al que cree en Él.",
            ref: "Génesis 15:6; Romanos 4:3",
            clave: {
              id: "pr-n2-panorama-at-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña Génesis 15:6 sobre Abraham, y qué aprendemos nosotros de eso?",
              ideas: [
                { id: "creyo", peso: 50, texto: "Abraham creyó a Dios y le fue contado por justicia.", formas: ["creyo a dios", "creyo", "contado por justicia", "le fue contado", "justicia", "por su fe"] },
                { id: "fe", peso: 50, texto: "Dios declara justo al que cree en Él: somos salvos por la fe.", formas: ["salv* por (la|su) fe", "salv* por creer", "por la fe", "por creer", "creyendo", "al que cree", "el que cree", "los que creen", "declara justo", "mucho antes de la ley", "no por (cumplir|obras|ley)"] },
              ],
              errores: [
                { id: "ley", texto: "Abraham no fue declarado justo por cumplir la ley: creyó a Dios mucho antes de la ley.", formas: ["cumpli* la ley", "por cumplir la ley", "por (sus|las) obras"], anula: "fe" },
              ],
              modelo: "Enseña que Abraham creyó a Dios y le fue contado por justicia, mucho antes de la ley. De eso aprendemos que Dios declara justo al que cree en Él: somos salvos por la fe.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Éxodo y pacto: de Egipto al Sinaí
    "n2-panorama-at-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo estaban los descendientes de Jacob cuatrocientos años después de José?", reverso: "Eran un pueblo numeroso y esclavo en Egipto.", apoyo: "eran un pueblo numeroso y esclavo en Egipto" },
              { frente: "¿Qué nombre le reveló Dios a Moisés desde la zarza?", reverso: "«YO SOY EL QUE SOY»: el Dios que existe por sí mismo y que no cambia.", apoyo: "Es el Dios que existe por sí mismo, que no cambia y que está presente con su pueblo." },
              { frente: "¿Qué hacía el Señor al ver la sangre en los postes de la puerta?", reverso: "Pasaba de largo: esa fue la primera Pascua.", apoyo: "al ver la sangre, el Señor pasaba de largo" },
              { frente: "¿Qué mandó construir Dios después del pacto del Sinaí?", reverso: "El tabernáculo, la tienda donde Él habitaría en medio de su pueblo.", apoyo: "También mandó construir el tabernáculo, la tienda donde Él habitaría en medio de ellos." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Desde dónde llamó Dios a Moisés?", reverso: "Desde una zarza que ardía sin consumirse.", apoyo: "Desde una zarza que ardía sin consumirse, Dios llamó a Moisés" },
              { frente: "¿Cuál fue la última de las diez plagas?", reverso: "La muerte de los primogénitos.", apoyo: "En la última, la muerte de los primogénitos" },
              { frente: "¿A quién señalaba el cordero de la Pascua?", reverso: "A Jesús, nuestra pascua, que fue sacrificado por nosotros.", apoyo: "El cordero de la Pascua señalaba a Jesús." },
              { frente: "¿Qué hizo Dios en el mar Rojo?", reverso: "Lo abrió: su pueblo pasó en seco y el ejército de Faraón quedó bajo las aguas.", apoyo: "Después Dios abrió el mar Rojo, su pueblo pasó en seco y el ejército de Faraón quedó bajo las aguas." },
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
            consigna: "Ordena cómo Dios libró a Israel de Egipto, del primer paso al último.",
            pasos: [
              "Dios llama a Moisés desde una zarza que arde",
              "Faraón endurece su corazón y Dios envía las plagas",
              "Cada familia pone la sangre del cordero en la puerta",
              "Dios abre el mar Rojo y su pueblo pasa en seco",
              "En el monte Sinaí, Dios hace pacto con Israel",
            ],
            apoyo: "El libro de Éxodo cuenta cómo Dios escuchó su clamor y los sacó con mano poderosa para hacerlos su pueblo.",
            ref: "Éxodo 12:13",
            explica: "Dios llamó a Moisés, envió las plagas, libró a su pueblo con la sangre del cordero, abrió el mar Rojo y, en el Sinaí, hizo pacto con Israel.",
          },
          {
            consigna: "Ordena lo que pasó antes, durante y después de la primera Pascua.",
            pasos: [
              "Faraón endurece su corazón ante Dios",
              "Cada familia israelita sacrifica un cordero",
              "Cada familia pone la sangre en los postes de la puerta",
              "Al ver la sangre, el Señor pasa de largo",
              "Israel pasa en seco por el mar Rojo",
            ],
            apoyo: "Esa fue la primera Pascua.",
            ref: "Éxodo 12:13",
            explica: "En la última plaga, la sangre del cordero en la puerta libró a cada familia: al verla, el Señor pasaba de largo. Después, Dios abrió el mar Rojo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hizo cada familia israelita en la primera Pascua.",
            texto: "Cada familia sacrificó un [[cordero]] y puso su [[sangre]] en los postes de la [[puerta]]. Así fue la primera Pascua.",
            distractores: ["becerro", "aceite", "mesa"],
            errores: {
              becerro: "Cada familia sacrificó un cordero: el cordero de la Pascua señalaba a Jesús.",
              aceite: "En los postes pusieron la sangre del cordero: al ver la sangre, el Señor pasaba de largo.",
            },
            apoyo: "cada familia israelita sacrificó un cordero y puso su sangre en los postes de la puerta",
            ref: "Éxodo 12:13",
            explica: "En la última plaga, la sangre del cordero en la puerta libraba a cada familia: al ver la sangre, el Señor pasaba de largo.",
          },
          {
            consigna: "Completa a quién señalaba el cordero de la Pascua.",
            texto: "El cordero de la Pascua señalaba a [[Jesús]]. Pablo escribe que Cristo, nuestra [[pascua]], ya fue sacrificado por nosotros: su sangre nos libra del [[juicio]].",
            distractores: ["Moisés", "ley", "hambre"],
            errores: {
              Moisés: "Moisés guió al pueblo, pero el cordero de la Pascua señalaba a Jesús.",
              ley: "Pablo llama a Cristo nuestra pascua: el cordero sacrificado por nosotros.",
            },
            apoyo: "Pablo escribe que Cristo, nuestra pascua, ya fue sacrificado por nosotros",
            ref: "1 Corintios 5:7",
            explica: "Como la sangre del cordero libró a Israel en Egipto, la sangre de Cristo nos libra del juicio.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "El pacto del Sinaí: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "tabernaculo", texto: "El tabernáculo", x: 25, y: 10 },
              { id: "dios", texto: "Dios", x: 75, y: 37 },
              { id: "israel", texto: "Israel, el pueblo rescatado", x: 25, y: 63 },
              { id: "ley", texto: "La ley del Sinaí", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "tabernaculo", a: "dios", relacion: "es la tienda donde habita" },
              { de: "dios", a: "israel", relacion: "sacó de la esclavitud a" },
              { de: "ley", a: "israel", relacion: "es la manera de vivir de" },
            ],
            distractores: ["es el precio para salvar a", "abandonó en Egipto a"],
            apoyo: "la ley no era el precio para ser salvos, sino la manera de vivir del pueblo que Dios ya había rescatado",
            ref: "Éxodo 20:2-3",
            explica: "Dios primero sacó a Israel de la esclavitud; la ley era la manera de vivir del pueblo rescatado, y el tabernáculo, la tienda donde Dios habitaría en medio de ellos.",
          },
          {
            consigna: "Dios primero salva y después enseña a vivir: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 25, y: 10 },
              { id: "tabernaculo", texto: "El tabernáculo", x: 75, y: 37 },
              { id: "pueblo", texto: "Israel, ya rescatado", x: 25, y: 63 },
              { id: "mandamientos", texto: "Los Diez Mandamientos", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "dios", a: "tabernaculo", relacion: "mandó construir" },
              { de: "tabernaculo", a: "pueblo", relacion: "pone a Dios en medio de" },
              { de: "mandamientos", a: "pueblo", relacion: "son la manera de vivir de" },
            ],
            distractores: ["son el precio para salvar a", "aleja a Dios de"],
            apoyo: "También mandó construir el tabernáculo, la tienda donde Él habitaría en medio de ellos.",
            ref: "Éxodo 19:5-6",
            explica: "Dios mandó construir el tabernáculo para habitar en medio de su pueblo, y los mandamientos eran la manera de vivir del pueblo ya rescatado, no el precio para ser salvos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga de la iglesia te dice: Si no cumplo todo lo que Dios manda, Él no me va a amar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Así es: Dios te va a amar solo en la medida en que cumplas todo lo que manda.", explica: "En el Sinaí, Dios primero recordó que ya había rescatado a Israel y después le dio la ley: la ley no era el precio." },
              { texto: "Dios primero salva y después enseña a vivir: obedecemos porque ya nos amó.", bien: true, explica: "Así fue en el Sinaí: la ley no era el precio para ser salvos, sino la manera de vivir del pueblo rescatado." },
              { texto: "No te preocupes por obedecer: si Dios ya te ama, da igual cómo vivas cada día.", explica: "Dios rescató a su pueblo y también le enseñó a vivir: la ley era la manera de vivir del pueblo rescatado." },
              { texto: "Dios dio sus mandamientos para que nadie del pueblo pudiera acercarse a Él.", explica: "Dios dio su ley al pueblo que ya había rescatado, y mandó el tabernáculo para habitar en medio de ellos." },
            ],
            apoyo: "Dios primero salva y después enseña a vivir.",
            ref: "Éxodo 20:2-3",
            explica: "En el Sinaí, Dios primero recordó que había sacado a Israel de la esclavitud y después le dio la ley: la ley no era el precio para ser salvos.",
          },
          {
            caso: "Un compañero de estudio te pregunta: ¿Para qué mandó Dios construir el tabernáculo en el desierto?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Para que los israelitas guardaran allí sus cosas durante todo el viaje.", explica: "El tabernáculo era la tienda donde Dios habitaría en medio de su pueblo." },
              { texto: "Para que Dios hablara solo con Moisés, lejos del resto del pueblo.", explica: "El tabernáculo era la tienda donde Dios habitaría en medio de su pueblo, no lejos de él." },
              { texto: "Para que el pueblo ganara allí la salvación con su propio esfuerzo.", explica: "Dios ya había rescatado a su pueblo; el tabernáculo era la tienda donde Él habitaría en medio de ellos." },
              { texto: "Para estar en medio de su pueblo: era la tienda donde Él habitaría.", bien: true, explica: "Así lo dice la lección: el tabernáculo era la tienda donde Dios habitaría en medio de ellos." },
            ],
            apoyo: "También mandó construir el tabernáculo, la tienda donde Él habitaría en medio de ellos.",
            ref: "Éxodo 19:5-6",
            explica: "El pueblo rescatado aprende a vivir en santidad con Dios en medio: el tabernáculo era la tienda donde Él habitaría con ellos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada libro con su mensaje.",
            pares: [
              ["Éxodo", "Dios libra a Israel de Egipto y hace pacto con él en el Sinaí"],
              ["Levítico", "Enseña a acercarse a un Dios santo"],
              ["Números", "Cuenta los cuarenta años en el desierto"],
              ["Deuteronomio", "Recoge los últimos discursos de Moisés antes de entrar a Canaán"],
            ],
            apoyo: "Levítico enseña a acercarse a un Dios santo: los sacrificios, el sacerdocio y el día de la expiación.",
            explica: "Levítico enseña a acercarse a un Dios santo; Números cuenta los cuarenta años en el desierto, y Deuteronomio recoge los últimos discursos de Moisés.",
          },
          {
            consigna: "¿De qué libro se habla? Une cada idea con su libro.",
            pares: [
              ["La zarza, las plagas, la Pascua y el mar Rojo", "Éxodo"],
              ["Los sacrificios, el sacerdocio y el día de la expiación", "Levítico"],
              ["Por su incredulidad, aquella generación no entró en la tierra", "Números"],
              ["El llamado a amar a Dios con todo el corazón", "Deuteronomio"],
            ],
            apoyo: "Deuteronomio recoge los últimos discursos de Moisés antes de entrar a Canaán: el llamado a amar a Dios con todo el corazón y a obedecer su palabra.",
            explica: "Levítico trata de los sacrificios y el sacerdocio; Números, de la incredulidad en el desierto, y Deuteronomio llama a amar a Dios con todo el corazón.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Levítico enseña a acercarse a un Dios santo: los sacrificios, el sacerdocio y el día de la expiación.",
            ref: "Levítico 19:2; Deuteronomio 6:4-5",
            clave: {
              id: "pr-n2-panorama-at-3-a7-1",
              tipo: "corta",
              pregunta: "Resume con tus palabras el mensaje de Levítico, Números y Deuteronomio.",
              ideas: [
                { id: "levitico", peso: 34, texto: "Levítico enseña a acercarse a un Dios santo: los sacrificios, el sacerdocio y el día de la expiación.", formas: ["dios santo", "acercarse", "sacrificio*", "sacerdo*", "expiacion", "santidad"] },
                { id: "numeros", peso: 33, texto: "Números cuenta los cuarenta años en el desierto, por la incredulidad.", formas: ["cuarenta anos", "40 anos", "desierto", "incredulidad", "no (entraron|entro)"] },
                { id: "deuteronomio", peso: 33, texto: "Deuteronomio llama a amar a Dios con todo el corazón y a obedecer su palabra.", formas: ["amar a dios", "todo el corazon", "obedecer", "ultimos discursos", "discursos de moises"] },
              ],
              modelo: "Levítico enseña a acercarse a un Dios santo con los sacrificios y el sacerdocio. Números cuenta los cuarenta años en el desierto por la incredulidad. Deuteronomio llama a amar a Dios con todo el corazón y a obedecer su palabra.",
            },
          },
          {
            apoyo: "por su incredulidad, aquella generación no entró en la tierra prometida, pero Dios siguió guiando y sustentando a su pueblo",
            ref: "Números 14:33-34; Deuteronomio 6:4-5",
            clave: {
              id: "pr-n2-panorama-at-3-a7-2",
              tipo: "corta",
              pregunta: "¿Qué pasó con aquella generación en el desierto, y a qué llama Deuteronomio antes de entrar a Canaán?",
              ideas: [
                { id: "incredulidad", peso: 50, texto: "Por su incredulidad, aquella generación no entró en la tierra prometida, pero Dios siguió guiando a su pueblo.", formas: ["incredulidad", "no (creyeron|confiaron|entraron|entro)", "cuarenta anos", "40 anos", "siguio guiando", "sustent*"] },
                { id: "amar", peso: 50, texto: "Deuteronomio llama a amar a Dios con todo el corazón y a obedecer su palabra.", formas: ["amar a dios", "todo el corazon", "obedecer", "su palabra"] },
              ],
              modelo: "Por su incredulidad, aquella generación no entró en la tierra prometida, aunque Dios siguió guiando y sustentando a su pueblo. Deuteronomio llama a amar a Dios con todo el corazón y a obedecer su palabra.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. La tierra y el reino
    "n2-panorama-at-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién guió al pueblo a la tierra prometida después de Moisés?", reverso: "Josué, a quien Dios le pidió meditar en su ley de día y de noche.", apoyo: "Después de Moisés, Josué guió al pueblo a la tierra prometida." },
              { frente: "¿Qué hacía Dios cuando Israel clamaba en tiempo de los jueces?", reverso: "Levantaba jueces que lo libraban, como Débora, Gedeón o Sansón.", apoyo: "cuando clamaba, Dios levantaba jueces que lo libraban, como Débora, Gedeón o Sansón" },
              { frente: "¿Por qué eligió Dios a David, un joven pastor?", reverso: "Porque Dios mira el corazón.", apoyo: "Entonces Dios eligió a David, un joven pastor, porque Él mira el corazón" },
              { frente: "¿Qué hizo Salomón, hijo de David?", reverso: "Construyó el templo de Jerusalén, pero al final de su vida se apartó de Dios.", apoyo: "Salomón, hijo de David, construyó el templo de Jerusalén, pero al final de su vida se apartó de Dios." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién fue Rut?", reverso: "Una mujer moabita que eligió al Dios de Israel y fue bisabuela del rey David.", apoyo: "el libro de Rut cuenta la fidelidad de una mujer moabita que eligió al Dios de Israel" },
              { frente: "¿Quién fue el primer rey de Israel?", reverso: "Saúl, que desobedeció a Dios.", apoyo: "El pueblo pidió un rey, y Saúl fue el primero, pero desobedeció a Dios." },
              { frente: "¿En qué dos reinos se dividió el reino después de Salomón?", reverso: "Israel al norte, con diez tribus, y Judá al sur, con Jerusalén.", apoyo: "el reino se dividió en dos: Israel al norte, con diez tribus, y Judá al sur, con Jerusalén" },
              { frente: "¿Para quiénes se escribió Crónicas?", reverso: "Para los que regresaron del exilio, para recordarles la promesa a David.", apoyo: "escrita para los que regresaron del exilio, para recordarles que Dios no había olvidado su promesa a David" },
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
            consigna: "Ordena estos hechos en el tiempo, de la conquista a la caída de Jerusalén.",
            eventos: [
              { texto: "Josué guía al pueblo a la tierra prometida", fecha: "Después de Moisés" },
              { texto: "Dios levanta jueces como Débora, Gedeón y Sansón", fecha: "En tiempo de los jueces" },
              { texto: "David hace de Jerusalén su capital", fecha: "Hacia el 1000 antes de Cristo" },
              { texto: "El reino se divide en Israel y Judá", fecha: "Hacia el 930 antes de Cristo" },
              { texto: "El reino del norte cae ante Asiria", fecha: "722 antes de Cristo" },
              { texto: "Babilonia destruye Jerusalén y su templo", fecha: "586 antes de Cristo" },
            ],
            apoyo: "Israel vive en su tierra, tiene reyes y se aparta de Dios hasta caer ante Asiria y Babilonia",
            ref: "2 Reyes 25:9",
            explica: "Primero vinieron la conquista y los jueces; después, el reino con David. Hacia el 930 el reino se dividió; el norte cayó en el 722 y Jerusalén en el 586.",
          },
          {
            consigna: "Ordena la historia del reino en el tiempo, del primer hecho al último.",
            eventos: [
              { texto: "Rut, la moabita, elige al Dios de Israel", fecha: "En los días de los jueces" },
              { texto: "Saúl es el primer rey de Israel", fecha: "Después del juez Samuel" },
              { texto: "Salomón construye el templo de Jerusalén", fecha: "Después de David" },
              { texto: "Después de Salomón, el reino se divide en dos", fecha: "Hacia el 930 antes de Cristo" },
              { texto: "Asiria lleva cautivo al pueblo del norte", fecha: "722 antes de Cristo" },
              { texto: "Babilonia destruye el templo de Jerusalén", fecha: "586 antes de Cristo" },
            ],
            apoyo: "Hacia el año 930 antes de Cristo, después de Salomón, el reino se dividió en dos",
            ref: "2 Reyes 17:6",
            explica: "Rut vivió en los días de los jueces; después vinieron los reyes Saúl, David y Salomón. Luego el reino se dividió, y cayeron el norte (722) y Jerusalén (586).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la historia de Israel tiene un error. Tócala.",
            frases: [
              "Después de Moisés, Josué guió al pueblo a la tierra prometida.",
              "El último juez fue Samuel.",
              "El primer rey de Israel fue David.",
              "Salomón construyó el templo de Jerusalén.",
            ],
            malo: 2,
            correccion: "El primer rey fue Saúl; después Dios eligió a David.",
            apoyo: "El pueblo pidió un rey, y Saúl fue el primero, pero desobedeció a Dios.",
            ref: "1 Samuel 16:7",
            explica: "Saúl fue el primer rey, pero desobedeció a Dios. Entonces Dios eligió a David, un joven pastor.",
          },
          {
            consigna: "Una de estas frases sobre el reino dividido tiene un error. Tócala.",
            frases: [
              "Después de Salomón, el reino se dividió en dos.",
              "Israel quedó al norte, con diez tribus.",
              "Judá quedó al sur, con Jerusalén.",
              "El reino del norte cayó ante Babilonia en el 586 antes de Cristo.",
            ],
            malo: 3,
            correccion: "El reino del norte cayó ante Asiria en el 722 antes de Cristo; Babilonia destruyó Jerusalén en el 586.",
            apoyo: "En el 722 antes de Cristo cayó ante Asiria y su pueblo fue llevado cautivo",
            ref: "2 Reyes 17:6",
            explica: "El norte cayó ante Asiria en el 722; Judá cayó después, cuando Babilonia destruyó Jerusalén y su templo en el 586.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa la promesa de Dios a David y en quién se cumple.",
            texto: "Dios prometió a David que su [[trono]] sería estable eternamente. Ningún rey humano cumplió del todo esa promesa: se cumple en [[Jesús]], el Hijo de David, cuyo [[reino]] no tendrá fin.",
            distractores: ["templo", "Salomón", "pueblo"],
            errores: {
              templo: "Salomón construyó el templo, pero la promesa a David fue que su trono sería estable eternamente.",
              Salomón: "Salomón fue hijo de David, pero ningún rey humano cumplió del todo la promesa: se cumple en Jesús.",
            },
            apoyo: "Dios prometió a David que su trono sería estable eternamente.",
            ref: "2 Samuel 7:16; Lucas 1:32-33",
            explica: "La promesa a David se cumple en Jesús, el Hijo de David, el Rey eterno cuyo reino no tendrá fin.",
          },
          {
            consigna: "Completa a quién eligió Dios, qué le prometió y en quién se cumple la promesa.",
            texto: "Dios eligió a [[David]], un joven [[pastor]], y le prometió que su trono sería estable eternamente. Esa promesa se cumple en Jesús, el Rey [[eterno]].",
            distractores: ["Saúl", "guerrero", "pasajero"],
            errores: {
              Saúl: "Saúl fue el primer rey, pero desobedeció; Dios eligió a David y le prometió un trono estable.",
              guerrero: "Dios eligió a David cuando era un joven pastor, porque Él mira el corazón.",
              pasajero: "El reino de Jesús no es pasajero: Él es el Rey eterno.",
            },
            apoyo: "pero Dios mantiene su promesa a David, que se cumple en Jesús, el Rey eterno",
            ref: "2 Samuel 7:16",
            explica: "Dios prometió a David un trono estable para siempre; esa promesa se cumple en Jesús, el Hijo de David, el Rey eterno.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "¿Qué vino después de cada hecho? Une cada uno con su consecuencia.",
            pares: [
              ["Israel se aparta de Dios en tiempo de los jueces", "Viene la opresión, hasta que clama y Dios levanta un juez"],
              ["Saúl, el primer rey, desobedece a Dios", "Dios elige a David, un joven pastor"],
              ["El reino del norte se aparta de Dios desde el principio", "Cae ante Asiria en el 722 antes de Cristo"],
              ["Judá sigue a los ídolos", "Babilonia destruye Jerusalén en el 586 antes de Cristo"],
            ],
            apoyo: "Israel vive en su tierra, tiene reyes y se aparta de Dios hasta caer ante Asiria y Babilonia",
            explica: "Apartarse de Dios trajo consecuencias: la opresión en tiempo de los jueces, la caída del norte ante Asiria y la de Jerusalén ante Babilonia.",
          },
          {
            consigna: "¿Qué pasó en cada caso? Une cada hecho con lo que vino después.",
            pares: [
              ["En tiempo de los jueces, Israel clama a Dios", "Dios levanta jueces como Débora, Gedeón o Sansón"],
              ["Saúl desobedece a Dios", "Dios mira el corazón y elige a David"],
              ["Ninguno de los reyes del norte sigue a Dios de corazón", "Asiria lleva cautivo a su pueblo"],
              ["Judá sigue a los ídolos, aunque tuvo reyes como Ezequías", "Babilonia destruye el templo de Jerusalén"],
            ],
            apoyo: "Cuando Israel se apartaba de Dios, venía la opresión; cuando clamaba, Dios levantaba jueces que lo libraban",
            explica: "Cuando el pueblo se apartaba de Dios, venían las consecuencias; cuando clamaba, Dios lo libraba. Dios es fiel aunque su pueblo no lo sea.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven del grupo te dice: Lo que le pasó a Israel por seguir a los ídolos ya no tiene nada que ver conmigo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: eso pasó hace mucho tiempo y ya no nos enseña nada hoy.", explica: "La historia de Israel muestra que apartarse de Dios trae consecuencias: el norte cayó ante Asiria y Jerusalén ante Babilonia." },
              { texto: "A Dios no le importa el corazón, con tal de que vayamos a la iglesia.", explica: "Dios mira el corazón: por eso eligió a David, un joven pastor." },
              { texto: "Nos enseña que apartarse de Dios trae consecuencias: Él mira el corazón.", bien: true, explica: "Israel se apartó de Dios y cayó; hoy también importa qué ocupa el trono de nuestro corazón." },
              { texto: "Los ídolos eran solo estatuas; hoy ya nada puede ocupar el lugar de Dios.", explica: "Hoy también algo puede ponerse en el lugar de Dios: vale preguntarse qué ocupa el trono del corazón." },
            ],
            apoyo: "Dios mira el corazón.",
            ref: "1 Samuel 16:7",
            explica: "Israel se apartó de Dios y cayó ante Asiria y Babilonia. Hoy también importa qué ocupa el trono de nuestro corazón.",
          },
          {
            caso: "Una amiga te dice: Le fallé a Dios muchas veces; seguro que ya se cansó de mí.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Es verdad: después de tantas veces, Dios ya no te va a escuchar nunca más.", explica: "Cuando Israel clamaba, Dios levantaba jueces que lo libraban: Dios es fiel aunque su pueblo no lo sea." },
              { texto: "Dios es fiel aunque su pueblo no lo sea: cuando Israel clamaba, lo libraba.", bien: true, explica: "Fallar trae consecuencias, pero Dios es fiel: cuando su pueblo clamaba, levantaba jueces que lo libraban." },
              { texto: "No te preocupes: a Dios no le importa si lo obedeces o si no lo obedeces.", explica: "La desobediencia trae consecuencias: Israel se apartó de Dios y cayó ante Asiria y Babilonia." },
              { texto: "Primero arregla tu vida tú sola, y después ya podrás volver a buscar a Dios.", explica: "En tiempo de los jueces, Israel clamaba a Dios en la opresión, y Dios levantaba jueces que lo libraban." },
            ],
            apoyo: "Dios es fiel aunque su pueblo no lo sea",
            ref: "Jueces 21:25",
            explica: "Apartarse de Dios trae consecuencias, pero Dios es fiel: cuando su pueblo clamaba, levantaba jueces que lo libraban.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Ningún rey humano cumplió del todo esa promesa: se cumple en Jesús, el Hijo de David, cuyo reino no tendrá fin",
            ref: "2 Samuel 7:16; Lucas 1:32-33",
            clave: {
              id: "pr-n2-panorama-at-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le prometió Dios a David y cómo se relaciona esa promesa con el Mesías?",
              ideas: [
                { id: "trono", peso: 50, texto: "Dios prometió a David que su trono sería estable eternamente.", formas: ["trono", "estable", "eternamente", "para siempre", "reino eterno"] },
                { id: "jesus", peso: 50, texto: "Ningún rey humano la cumplió del todo: se cumple en Jesús, el Hijo de David, cuyo reino no tendrá fin.", formas: ["se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "(jesus|cristo|jesucristo) hijo", "no tendra fin", "rey eterno", "en (jesus|cristo|jesucristo)"] },
              ],
              modelo: "Dios le prometió a David que su trono sería estable eternamente. Ningún rey humano la cumplió del todo: esa promesa se cumple en Jesús, el Hijo de David, cuyo reino no tendrá fin.",
            },
          },
          {
            apoyo: "para recordarles que Dios no había olvidado su promesa a David",
            ref: "2 Samuel 7:16",
            clave: {
              id: "pr-n2-panorama-at-4-a7-2",
              tipo: "corta",
              pregunta: "Si los reyes de Israel y de Judá fallaron, ¿por qué la promesa a David seguía en pie?",
              ideas: [
                { id: "fiel", peso: 50, texto: "Dios es fiel aunque su pueblo no lo sea: no había olvidado su promesa a David.", formas: ["dios es fiel", "fiel", "fidelidad", "no olvid*", "nunca olvid*", "mantiene (su|la) promesa", "cumple (su|sus|la) promesa*", "cumple lo que promete", "siempre cumple"] },
                { id: "jesus", peso: 50, texto: "La promesa se cumple en Jesús, el Hijo de David, el Rey eterno.", formas: ["se cumpl* en (jesus|cristo|jesucristo)", "cumpli* en (jesus|cristo|jesucristo)", "(jesus|cristo|jesucristo) hijo", "rey eterno", "no tendra fin", "en (jesus|cristo|jesucristo)"] },
              ],
              modelo: "Porque Dios es fiel aunque su pueblo no lo sea: no había olvidado su promesa a David. Esa promesa se cumple en Jesús, el Hijo de David, el Rey eterno.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Los poetas y los profetas
    "n2-panorama-at-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pregunta enfrenta el libro de Job?", reverso: "La del sufrimiento del justo; termina adorando a un Dios más grande que su dolor.", apoyo: "Job enfrenta la pregunta del sufrimiento del justo y termina adorando a un Dios más grande que su dolor." },
              { frente: "¿Qué clase de libro es Salmos?", reverso: "El libro de oración y alabanza del pueblo de Dios.", apoyo: "Salmos es el libro de oración y alabanza del pueblo de Dios" },
              { frente: "¿Qué enseña Proverbios?", reverso: "La sabiduría para la vida diaria: el trabajo, las palabras, el dinero, la familia y las amistades.", apoyo: "Proverbios enseña la sabiduría para la vida diaria: el trabajo, las palabras, el dinero, la familia y las amistades." },
              { frente: "¿Quiénes eran los profetas?", reverso: "Mensajeros que Dios levantó: no eran adivinos, hablaban de parte de Dios.", apoyo: "No eran adivinos: hablaban de parte de Dios." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué muestra Eclesiastés?", reverso: "Que todo es vanidad sin Dios; llama a temerle y guardar sus mandamientos.", apoyo: "Eclesiastés muestra que todo es vanidad sin Dios y concluye con el llamado a temerle y guardar sus mandamientos" },
              { frente: "¿Qué celebra Cantares?", reverso: "El amor entre el esposo y la esposa como un regalo de Dios.", apoyo: "Cantares celebra el amor entre el esposo y la esposa como un regalo de Dios." },
              { frente: "¿Qué anunció Jeremías sobre el nuevo pacto?", reverso: "Que Dios escribiría su ley en el corazón de su pueblo.", apoyo: "Jeremías anunció un nuevo pacto, en el que Dios escribiría su ley en el corazón de su pueblo." },
              { frente: "¿Dónde nacería el Mesías, según Miqueas?", reverso: "En Belén, y se cumplió en Mateo 2:1-6.", apoyo: "Nacería en Belén (Miqueas 5:2), y se cumplió en Mateo 2:1-6." },
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
            consigna: "Une cada libro poético con lo que enseña.",
            pares: [
              ["Job", "El sufrimiento del justo y un Dios más grande que su dolor"],
              ["Salmos", "Oración y alabanza del pueblo de Dios, en el gozo y en el lamento"],
              ["Proverbios", "Sabiduría para la vida diaria: el trabajo, el dinero, la familia"],
              ["Eclesiastés", "Todo es vanidad sin Dios"],
              ["Cantares", "El amor entre el esposo y la esposa, un regalo de Dios"],
            ],
            apoyo: "Los libros poéticos enseñan a orar y a vivir con sabiduría",
            explica: "Job habla del sufrimiento; Salmos, de la oración; Proverbios, de la sabiduría diaria; Eclesiastés, de la vida sin Dios, y Cantares, del amor entre el esposo y la esposa.",
          },
          {
            consigna: "¿Qué libro es? Une cada enseñanza con su libro poético.",
            pares: [
              ["Termina adorando a un Dios más grande que su dolor", "Job"],
              ["Da palabras para hablar con Dios en todo momento", "Salmos"],
              ["Habla de las palabras, el dinero y las amistades", "Proverbios"],
              ["Llama a temer a Dios y guardar sus mandamientos", "Eclesiastés"],
              ["Celebra el amor como un regalo de Dios", "Cantares"],
            ],
            apoyo: "Son libros que hablan al corazón: enseñan a orar en el dolor, a vivir con sabiduría y a esperar en las promesas de Dios.",
            explica: "Job enseña a adorar en el dolor; Salmos, a orar; Proverbios, a vivir con sabiduría; Eclesiastés, a temer a Dios, y Cantares celebra el amor entre el esposo y la esposa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga de la iglesia te dice: Estoy pasando por un dolor muy grande y no sé ni qué decirle a Dios.",
            pregunta: "¿Qué le recomiendas?",
            opciones: [
              { texto: "Espera a sentirte mejor; cuando ya estés bien, vuelves a orar con alegría.", explica: "Los salmos enseñan a orar también en el dolor: hay salmos de lamento y de confianza." },
              { texto: "Lee Proverbios: ahí está todo lo que necesitas saber para no sufrir más.", explica: "Proverbios enseña sabiduría para la vida diaria; para orar en el dolor, los salmos te dan palabras." },
              { texto: "Ora con los salmos: los hay de lamento y de confianza, y te dan palabras.", bien: true, explica: "Los salmos dan palabras para hablar con Dios en todo momento, también en el dolor." },
              { texto: "No le hables a Dios de tu dolor: a Él solo se le habla con gozo y alabanza.", explica: "Salmos tiene salmos de gozo y también de lamento: a Dios se le habla en todo momento." },
            ],
            apoyo: "Los salmos te dan palabras para hablar con Dios en todo momento.",
            explica: "Los libros poéticos enseñan a orar en el dolor: los salmos tienen lamento y confianza, y dan palabras para hablar con Dios.",
          },
          {
            caso: "Un compañero de trabajo te pregunta: ¿Hay algo en la Biblia que me ayude a manejar mi dinero y mis palabras?",
            pregunta: "¿Qué libro le recomiendas?",
            opciones: [
              { texto: "Cantares, que celebra el amor como un regalo de Dios.", explica: "Cantares celebra el amor entre el esposo y la esposa; la sabiduría para el dinero y las palabras está en Proverbios." },
              { texto: "Job, que enfrenta la pregunta del sufrimiento del justo.", explica: "Job trata el sufrimiento del justo; la sabiduría para la vida diaria está en Proverbios." },
              { texto: "Proverbios, que enseña sabiduría para la vida diaria.", bien: true, explica: "Proverbios enseña sabiduría para el trabajo, las palabras, el dinero, la familia y las amistades." },
              { texto: "Eclesiastés, que muestra que todo es vanidad sin Dios.", explica: "Eclesiastés llama a temer a Dios; los consejos para el dinero y las palabras están en Proverbios." },
            ],
            apoyo: "Proverbios enseña la sabiduría para la vida diaria: el trabajo, las palabras, el dinero, la familia y las amistades.",
            explica: "Proverbios enseña la sabiduría para la vida diaria: el trabajo, las palabras, el dinero, la familia y las amistades.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué hacían los profetas? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 12 },
              { id: "profetas", texto: "Los profetas", x: 50, y: 50 },
              { id: "idolatria", texto: "La idolatría y la injusticia", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "profetas", a: "dios", relacion: "hablaban de parte de" },
              { de: "profetas", a: "idolatria", relacion: "denunciaban" },
            ],
            distractores: ["adivinaban lo que quería", "aprobaban"],
            apoyo: "No eran adivinos: hablaban de parte de Dios.",
            explica: "Los profetas no eran adivinos: hablaban de parte de Dios y denunciaban la idolatría y la injusticia.",
          },
          {
            consigna: "¿Cuál era la misión de los profetas? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "mesias", texto: "El Mesías", x: 50, y: 12 },
              { id: "profetas", texto: "Los profetas", x: 50, y: 50 },
              { id: "pueblo", texto: "El pueblo de Dios", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "profetas", a: "mesias", relacion: "anunciaban la venida de" },
              { de: "profetas", a: "pueblo", relacion: "llamaban a arrepentirse a" },
            ],
            distractores: ["adivinaban la llegada de", "aplaudían la idolatría de"],
            apoyo: "los profetas llamaron al pueblo a volver a Dios y anunciaron al Mesías",
            explica: "Los profetas llamaban al pueblo al arrepentimiento y daban esperanza con las promesas del Mesías. No adivinaban: hablaban de parte de Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre las promesas del Mesías tiene un error. Tócala.",
            frases: [
              "Isaías anunció que el Mesías nacería de una virgen.",
              "Miqueas anunció que el Mesías nacería en Nazaret.",
              "Zacarías anunció que entraría a Jerusalén montado en un asno.",
              "Las promesas de los profetas sobre el Mesías se cumplieron en Jesús.",
            ],
            malo: 1,
            correccion: "Miqueas anunció que nacería en Belén, y se cumplió en Mateo 2:1-6.",
            apoyo: "Nacería en Belén (Miqueas 5:2), y se cumplió en Mateo 2:1-6.",
            ref: "Miqueas 5:2",
            explica: "Miqueas anunció que el Mesías nacería en Belén, y así se cumplió en Jesús.",
          },
          {
            consigna: "Una de estas frases sobre lo que anunciaron los profetas tiene un error. Tócala.",
            frases: [
              "Miqueas anunció que el Mesías nacería en Belén.",
              "Que el Mesías nacería de una virgen lo anunció Isaías.",
              "Zacarías anunció que el Mesías entraría a Jerusalén en un carro de guerra.",
              "El Evangelio de Mateo muestra cómo se cumplieron varias promesas del Mesías.",
            ],
            malo: 2,
            correccion: "Zacarías anunció que entraría humilde, montado en un asno, y se cumplió en Mateo 21:4-5.",
            apoyo: "Entraría a Jerusalén humilde, montado en un asno (Zacarías 9:9), y se cumplió en Mateo 21:4-5.",
            ref: "Zacarías 9:9",
            explica: "Zacarías anunció que el Mesías entraría a Jerusalén humilde, montado en un asno, y así se cumplió en Jesús.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que anunció Jeremías.",
            texto: "Jeremías anunció un nuevo [[pacto]]: Dios escribiría su [[ley]] en el [[corazón]] de su pueblo.",
            distractores: ["templo", "historia", "muro"],
            errores: {
              templo: "Jeremías no anunció un templo nuevo: anunció un nuevo pacto, con la ley escrita en el corazón.",
              muro: "Dios escribiría su ley en el corazón de su pueblo, no en un muro.",
            },
            apoyo: "Jeremías anunció un nuevo pacto, en el que Dios escribiría su ley en el corazón de su pueblo.",
            ref: "Jeremías 31:31-33",
            explica: "En el nuevo pacto, Dios escribiría su ley en el corazón. Jesús dijo en la última cena que su sangre era la del nuevo pacto.",
          },
          {
            consigna: "Completa lo que anunció Isaías y dónde se cumplió.",
            texto: "Isaías anunció que el Mesías llevaría nuestros [[pecados]] y que por sus [[llagas]] seríamos curados. Se cumplió en la [[cruz]].",
            distractores: ["sueños", "palabras", "cena"],
            errores: {
              palabras: "Isaías anunció que por sus llagas seríamos curados: se cumplió en la cruz.",
              cena: "En la última cena Jesús habló del nuevo pacto; la promesa de llevar nuestros pecados se cumplió en la cruz.",
            },
            apoyo: "Llevaría nuestros pecados y por sus llagas seríamos curados (Isaías 53:5-6), y se cumplió en la cruz (1 Pedro 2:24).",
            ref: "Isaías 53:5-6; 1 Pedro 2:24",
            explica: "Isaías anunció que el Mesías llevaría nuestros pecados y que por sus llagas seríamos curados: se cumplió en la cruz.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Denunciaban la idolatría y la injusticia, llamaban al pueblo al arrepentimiento, anunciaban el juicio si no se volvían a Dios y daban esperanza con las promesas de restauración y del Mesías.",
            ref: "Jeremías 31:31-33",
            clave: {
              id: "pr-n2-panorama-at-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál era la misión de los profetas?",
              ideas: [
                { id: "parte", peso: 30, texto: "Eran mensajeros que hablaban de parte de Dios: no eran adivinos.", formas: ["de parte de dios", "mensajeros", "hablaban (por|de) dios", "no adivin*", "voz de dios", "mensaje de dios"] },
                { id: "volver", peso: 40, texto: "Denunciaban la idolatría y la injusticia y llamaban al pueblo al arrepentimiento.", formas: ["denunci*", "idolatria", "injusticia", "arrepenti*", "volver a dios", "volverse a dios", "a volver", "volvier*", "convert*"] },
                { id: "esperanza", peso: 30, texto: "Daban esperanza con las promesas de restauración y del Mesías.", formas: ["esperanza", "restauracion", "mesias", "promesas"] },
              ],
              modelo: "Los profetas eran mensajeros que hablaban de parte de Dios. Denunciaban la idolatría y la injusticia, llamaban al pueblo al arrepentimiento y daban esperanza con las promesas de restauración y del Mesías.",
            },
          },
          {
            apoyo: "Los profetas fueron mensajeros que Dios levantó, sobre todo en los años del reino dividido, del exilio y del regreso.",
            ref: "Jeremías 31:31-33",
            clave: {
              id: "pr-n2-panorama-at-5-a7-2",
              tipo: "corta",
              pregunta: "Un amigo cree que los profetas eran adivinos del futuro. ¿Qué le explicas sobre lo que hacían?",
              ideas: [
                { id: "parte", peso: 40, texto: "No eran adivinos: eran mensajeros que hablaban de parte de Dios.", formas: ["de parte de dios", "mensajeros", "hablaban (por|de) dios", "no adivin*", "dios los levanto", "mensaje de dios"] },
                { id: "volver", peso: 30, texto: "Llamaban al pueblo a volver a Dios y denunciaban la idolatría.", formas: ["arrepenti*", "volver a dios", "volverse a dios", "a volver", "volvier*", "convert*", "denunci*", "idolatria", "injusticia", "juicio"] },
                { id: "mesias", peso: 30, texto: "Daban esperanza y anunciaban al Mesías.", formas: ["mesias", "esperanza", "restauracion"] },
              ],
              modelo: "No eran adivinos: eran mensajeros que hablaban de parte de Dios. Llamaban al pueblo al arrepentimiento, denunciaban la idolatría y daban esperanza anunciando al Mesías.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Exilio, regreso y la espera del Mesías
    "n2-panorama-at-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuánto duraría el exilio, según Jeremías?", reverso: "Setenta años; después Dios traería a su pueblo de vuelta.", apoyo: "Dios había dicho por Jeremías que el exilio duraría setenta años y que después traería a su pueblo de vuelta" },
              { frente: "¿Qué propuso Daniel en su corazón cuando lo llevaron a Babilonia?", reverso: "No contaminarse, y se mantuvo fiel a Dios.", apoyo: "Daniel fue llevado joven a Babilonia con otros jóvenes de Judá, y propuso en su corazón no contaminarse." },
              { frente: "¿Qué rey permitió a los judíos volver a Jerusalén?", reverso: "Ciro, rey de Persia, en el 538 antes de Cristo.", apoyo: "En el 538 antes de Cristo, Ciro, rey de Persia, permitió a los judíos volver a Jerusalén para reconstruir el templo." },
              { frente: "¿Qué anunció Malaquías, el último de los profetas?", reverso: "Que Dios enviaría su mensajero delante de Él.", apoyo: "anunció que Dios enviaría su mensajero delante de Él" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué anunció Ezequiel, profeta entre los cautivos?", reverso: "Que Dios daría a su pueblo un corazón nuevo y su Espíritu.", apoyo: "Ezequiel, profeta entre los cautivos, anunció que Dios daría a su pueblo un corazón nuevo y su Espíritu" },
              { frente: "¿Qué profetas animaron al pueblo a terminar el templo?", reverso: "Hageo y Zacarías; lo terminaron hacia el 516 antes de Cristo.", apoyo: "Con ánimo de los profetas Hageo y Zacarías, lo terminaron hacia el 516 antes de Cristo." },
              { frente: "¿Qué dirigió Nehemías, copero del rey de Persia?", reverso: "La reconstrucción de los muros de Jerusalén, terminados en cincuenta y dos días.", apoyo: "Nehemías, copero del rey de Persia, volvió a Jerusalén y dirigió la reconstrucción de los muros, que se terminaron en cincuenta y dos días" },
              { frente: "¿Cuántos años pasaron sin que se escribiera otro libro de la Escritura?", reverso: "Unos cuatrocientos, hasta que Juan el Bautista preparó el camino del Señor.", apoyo: "Después vinieron unos cuatrocientos años en que no se escribió otro libro de la Escritura" },
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
            consigna: "Ordena estos hechos en el tiempo, del exilio a la espera del Mesías.",
            eventos: [
              { texto: "Daniel y sus amigos se mantienen fieles en Babilonia", fecha: "Durante el exilio" },
              { texto: "Ciro, rey de Persia, permite volver a Jerusalén", fecha: "538 antes de Cristo" },
              { texto: "Se termina de reconstruir el templo", fecha: "Hacia el 516 antes de Cristo" },
              { texto: "Malaquías, el último de los profetas, escribe", fecha: "Unos 400 años antes de Cristo" },
              { texto: "Juan el Bautista prepara el camino del Señor", fecha: "Tras unos 400 años" },
            ],
            apoyo: "Después del exilio, Dios trajo a su pueblo de vuelta: reconstruyeron el templo y los muros",
            ref: "Esdras 1:1-3",
            explica: "Durante el exilio, Daniel se mantuvo fiel; en el 538 Ciro permitió el regreso y hacia el 516 terminaron el templo. Malaquías escribió unos 400 años antes de Cristo.",
          },
          {
            consigna: "Ordena en el tiempo cómo Dios cumplió su palabra después de la caída de Jerusalén.",
            eventos: [
              { texto: "Jerusalén cae y el templo queda en ruinas", fecha: "Al comenzar el exilio" },
              { texto: "Ezequiel anuncia a los cautivos un corazón nuevo", fecha: "Durante el exilio" },
              { texto: "Ciro permite a los judíos reconstruir el templo", fecha: "538 antes de Cristo" },
              { texto: "Con ánimo de Hageo y Zacarías, terminan el templo", fecha: "Hacia el 516 antes de Cristo" },
              { texto: "Malaquías anuncia que Dios enviará su mensajero", fecha: "Unos 400 años antes de Cristo" },
            ],
            apoyo: "Pero Dios había dicho por Jeremías que el exilio duraría setenta años y que después traería a su pueblo de vuelta",
            ref: "Jeremías 29:10",
            explica: "Jerusalén cayó, pero Dios cumplió su palabra: en el exilio habló por Ezequiel, en el 538 Ciro permitió el regreso y hacia el 516 terminaron el templo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el exilio y el regreso: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios había dicho por Jeremías que el exilio duraría setenta años.", verdad: true, explica: "Y que después traería a su pueblo de vuelta: Dios cumple su palabra, aun en tierra extraña.", apoyo: "Dios había dicho por Jeremías que el exilio duraría setenta años", ref: "Jeremías 29:10" },
              { texto: "En Babilonia, Daniel y sus amigos dejaron de ser fieles a Dios para salvar su vida.", verdad: false, explica: "Se mantuvieron fieles en el palacio, en el horno de fuego y en el foso de los leones.", apoyo: "Él y sus amigos se mantuvieron fieles a Dios en el palacio, en el horno de fuego y en el foso de los leones", ref: "Daniel 1:8" },
              { texto: "Ciro, rey de Persia, permitió a los judíos volver a Jerusalén para reconstruir el templo.", verdad: true, explica: "Fue en el 538 antes de Cristo.", apoyo: "Ciro, rey de Persia, permitió a los judíos volver a Jerusalén para reconstruir el templo", ref: "Esdras 1:1-3" },
            ],
          },
          {
            consigna: "Sobre el exilio y el regreso: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando cayó Jerusalén, Dios se olvidó de su promesa de traer a su pueblo de vuelta.", verdad: false, explica: "Dios había anunciado por Jeremías el regreso después de setenta años, y lo cumplió.", apoyo: "Dios cumple su palabra, aun en tierra extraña.", ref: "Jeremías 29:10" },
              { texto: "Ezequiel anunció entre los cautivos que Dios daría a su pueblo un corazón nuevo y su Espíritu.", verdad: true, explica: "Así lo anunció a los que estaban en el exilio.", apoyo: "anunció que Dios daría a su pueblo un corazón nuevo y su Espíritu", ref: "Ezequiel 36:26-27" },
              { texto: "Los que volvieron del exilio abandonaron la reconstrucción del templo.", verdad: false, explica: "Con ánimo de los profetas Hageo y Zacarías, lo terminaron hacia el 516 antes de Cristo.", apoyo: "Con ánimo de los profetas Hageo y Zacarías, lo terminaron hacia el 516 antes de Cristo." },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo hizo Esdras o lo hizo Nehemías? Lleva cada frase a su grupo.",
            grupos: ["Esdras", "Nehemías"],
            frases: [
              { texto: "Era escriba y sacerdote", grupo: 0 },
              { texto: "Enseñó la ley de Dios al pueblo", grupo: 0 },
              { texto: "Llamó al pueblo a volver a Dios", grupo: 0 },
              { texto: "Era copero del rey de Persia", grupo: 1 },
              { texto: "Dirigió la reconstrucción de los muros", grupo: 1 },
              { texto: "Terminó los muros en cincuenta y dos días", grupo: 1, explica: "Nehemías dirigió la reconstrucción, y los muros se terminaron en cincuenta y dos días, a pesar de la oposición." },
            ],
            apoyo: "Esdras, escriba y sacerdote, enseñó la ley de Dios al pueblo y lo llamó a volver a Él",
            ref: "Esdras 7:10; Nehemías 6:15",
            explica: "Esdras, escriba y sacerdote, enseñó la ley; Nehemías, copero del rey de Persia, dirigió la reconstrucción de los muros.",
          },
          {
            consigna: "¿De quién se habla: de Esdras, de Nehemías o de Ester? Lleva cada frase a su grupo.",
            grupos: ["Esdras", "Nehemías", "Ester"],
            frases: [
              { texto: "Escriba y sacerdote que enseñó la ley", grupo: 0 },
              { texto: "Copero que volvió a reconstruir los muros", grupo: 1 },
              { texto: "Terminó los muros a pesar de la oposición", grupo: 1 },
              { texto: "Joven judía que llegó a ser reina de Persia", grupo: 2 },
              { texto: "Arriesgó su vida para salvar a su pueblo", grupo: 2 },
              { texto: "Su libro no menciona el nombre de Dios", grupo: 2, explica: "Aun así, toda la historia muestra la mano de Dios guiando cada detalle." },
            ],
            apoyo: "Ester, una joven judía que llegó a ser reina de Persia, arriesgó su vida para salvar a su pueblo de un decreto de muerte.",
            ref: "Ester 4:14",
            explica: "Esdras enseñó la ley, Nehemías reconstruyó los muros y Ester arriesgó su vida por su pueblo: en toda la historia se ve la mano de Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de la iglesia te dice: Empecé a arreglar las cosas con mi familia, pero hay tanta oposición que ya me quiero rendir.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Ríndete ya: si hay oposición, es señal de que Dios no quiere que sigas.", explica: "Nehemías tuvo oposición, y aun así los muros se terminaron en cincuenta y dos días." },
              { texto: "Acuérdate de Nehemías: siguió reconstruyendo a pesar de la oposición.", bien: true, explica: "Nehemías dirigió la reconstrucción de los muros, que se terminaron a pesar de la oposición." },
              { texto: "Deja todo como está, porque lo que se rompe ya no se puede reconstruir.", explica: "Después del exilio, Dios trajo a su pueblo de vuelta y reconstruyeron el templo y los muros." },
              { texto: "Espera a que la oposición se acabe sola antes de volver a hacer algo.", explica: "Los muros se terminaron a pesar de la oposición, no después de que se acabara." },
            ],
            apoyo: "dirigió la reconstrucción de los muros, que se terminaron en cincuenta y dos días a pesar de la oposición",
            ref: "Nehemías 6:15",
            explica: "Nehemías dirigió la reconstrucción de los muros, que se terminaron en cincuenta y dos días a pesar de la oposición.",
          },
          {
            caso: "Una amiga te escribe: No siento que Dios esté haciendo nada en mi vida; no veo su mano por ningún lado.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Si no lo ves, es porque Dios se olvidó de ti por algo malo que hiciste.", explica: "Dios cumple sus promesas a su tiempo, aun cuando no se ve su mano." },
              { texto: "Dios solo obra cuando se ven milagros grandes, como cuando abrió el mar Rojo.", explica: "En Ester no se menciona a Dios, pero toda la historia muestra su mano guiando cada detalle." },
              { texto: "Piensa en Ester: no se nombra a Dios, pero su mano guía cada detalle.", bien: true, explica: "El libro de Ester no menciona el nombre de Dios, pero toda la historia muestra su mano." },
              { texto: "No te preocupes: a Dios no le interesan los detalles de tu vida diaria.", explica: "La historia de Ester muestra la mano de Dios guiando cada detalle." },
            ],
            apoyo: "El libro no menciona el nombre de Dios, pero toda la historia muestra su mano guiando cada detalle.",
            ref: "Ester 4:14",
            explica: "Aunque el libro de Ester no menciona el nombre de Dios, toda la historia muestra su mano guiando cada detalle.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo prepara Malaquías la venida del Señor? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "malaquias", texto: "Malaquías, el último profeta", x: 50, y: 12 },
              { id: "mensajero", texto: "El mensajero de Dios", x: 50, y: 50 },
              { id: "camino", texto: "El camino del Señor", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "malaquias", a: "mensajero", relacion: "anunció que vendría" },
              { de: "mensajero", a: "camino", relacion: "prepararía" },
            ],
            distractores: ["negó que vendría", "cerraría"],
            apoyo: "Malaquías cerró el Antiguo Testamento anunciando al mensajero que prepararía la venida del Señor",
            ref: "Malaquías 3:1",
            explica: "Malaquías anunció que Dios enviaría su mensajero delante de Él; ese mensajero prepararía la venida del Señor.",
          },
          {
            consigna: "¿Cómo termina el Antiguo Testamento? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "malaquias", texto: "Malaquías, el último profeta", x: 50, y: 12 },
              { id: "at", texto: "El Antiguo Testamento", x: 50, y: 50 },
              { id: "nt", texto: "El Nuevo Testamento", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "malaquias", a: "at", relacion: "cerró" },
              { de: "nt", a: "at", relacion: "cumple lo que esperaba" },
            ],
            distractores: ["abrió", "reemplaza y anula"],
            apoyo: "El Antiguo Testamento termina esperando. El Nuevo Testamento empieza con el cumplimiento",
            ref: "Gálatas 4:4",
            explica: "Malaquías cerró el Antiguo Testamento, que termina esperando; el Nuevo Testamento empieza con el cumplimiento: Jesucristo, hijo de David, hijo de Abraham.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Malaquías cerró el Antiguo Testamento anunciando al mensajero que prepararía la venida del Señor",
            ref: "Malaquías 3:1; Mateo 11:10",
            clave: {
              id: "pr-n2-panorama-at-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo termina el Antiguo Testamento y cómo prepara la venida de Cristo?",
              ideas: [
                { id: "malaquias", peso: 50, texto: "Malaquías, el último de los profetas, anunció que Dios enviaría su mensajero delante de Él.", formas: ["malaquias", "mensajero", "ultimo profeta", "ultimo de los profetas"] },
                { id: "espera", peso: 50, texto: "Termina esperando: después de unos cuatrocientos años, Juan el Bautista preparó el camino del Señor.", formas: ["termina esperando", "esperando", "queda* esperando", "juan el bautista", "bautista", "preparo el camino", "preparar el camino", "sin libros", "sin (otro|otros|nuevos|mas) libro*", "silencio"] },
              ],
              modelo: "Termina con Malaquías, el último de los profetas, que anunció que Dios enviaría su mensajero delante de Él. El Antiguo Testamento queda esperando, hasta que Juan el Bautista preparó el camino del Señor.",
            },
          },
          {
            apoyo: "El Antiguo Testamento termina esperando. El Nuevo Testamento empieza con el cumplimiento",
            ref: "Gálatas 4:4; Mateo 1:1",
            clave: {
              id: "pr-n2-panorama-at-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué decimos que el Antiguo Testamento termina esperando?",
              ideas: [
                { id: "mensajero", peso: 50, texto: "Malaquías anunció que Dios enviaría su mensajero, y Juan el Bautista preparó el camino del Señor.", formas: ["mensajero", "malaquias", "juan el bautista", "bautista", "preparo el camino", "preparar el camino"] },
                { id: "cumple", peso: 50, texto: "El Nuevo Testamento empieza con el cumplimiento: Jesucristo, hijo de David, hijo de Abraham.", formas: ["cumplimiento", "se cumpl*", "jesucristo", "jesus", "cristo", "hijo de david", "hijo de abraham"] },
              ],
              errores: [
                { id: "anula", texto: "El Nuevo Testamento no anula al Antiguo: empieza con el cumplimiento de lo que el Antiguo esperaba.", formas: ["reemplaza", "anula", "ya no sirve"], anula: "cumple" },
              ],
              modelo: "Porque Malaquías anunció que Dios enviaría su mensajero, y el pueblo quedó esperando al Mesías. El Nuevo Testamento empieza con el cumplimiento: Jesucristo, hijo de David, hijo de Abraham.",
            },
          },
        ],
      },
    ],
  },
};
