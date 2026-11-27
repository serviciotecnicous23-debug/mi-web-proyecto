/**
 * Las prácticas de «Exégesis de un libro: Romanos» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-exegesis.ts), con la guía de docs/academia-practicas.md.
 *
 * Donde los evangélicos leen distinto (Romanos 7, la elección en Romanos 9, el futuro de Israel en Romanos 11, la
 * traducción de Romanos 5:12), se pregunta solo lo que la lección dice de cada lectura, con esa misma atribución, y en
 * qué coinciden, nunca cuál tiene razón. El ministerio de la mujer es un punto de la declaración de fe por confirmar:
 * ninguna actividad pregunta por ese punto ni por la pregunta de exégesis sobre Junias (Romanos 16:7). El objetivo 3
 * de la lección 6 (el equipo de Romanos 16) se practica solo con lo que la lección afirma sin reservas: la misión de
 * Pablo, los saludos del capítulo 16 y el propósito que cierra la carta.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_EXEGESIS: PracticasMateria = {
  materia: "n5-exegesis",
  mision: {
    titulo: "Romanos, sección por sección",
    intro: "Tu pastor te encargó preparar a los maestros de la academia para enseñar la carta a los Romanos. Antes de predicar un solo versículo quieren aprender a hacer exégesis: sacar del texto lo que Pablo quiso decir. Te van a preguntar por los pasos del método, por el argumento de la carta desde el pecado de todos hasta la justificación por la fe, por la vida nueva en el Espíritu, por la pregunta de Israel y por la vida práctica de la iglesia. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes guiar a otros por Romanos con el método exegético: el contexto, las palabras, la teología y la aplicación. Sabes seguir el argumento de Pablo, presentar con respeto las lecturas donde los evangélicos difieren y enseñar con firmeza lo que todos comparten. Es el lema de la academia: «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El método exegético y la introducción a Romanos
    "n5-exegesis-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa la palabra griega de la que viene exégesis?", reverso: "Sacar o conducir hacia afuera.", apoyo: "Exégesis viene de una palabra griega que significa sacar o conducir hacia afuera" },
              { frente: "¿Qué se llama eiségesis?", reverso: "Meter en el texto lo que uno ya piensa.", apoyo: "Lo contrario, meter en el texto lo que uno ya piensa, se llama eiségesis" },
              { frente: "¿Por dónde empieza usar bien la Palabra?", reverso: "Por entender lo que significó para sus primeros lectores.", apoyo: "Usar bien la Palabra empieza por entender lo que significó para sus primeros lectores" },
              { frente: "Si el líder no sabe griego, ¿con qué puede empezar a escuchar el texto?", reverso: "Con buenas traducciones, una concordancia y paciencia.", apoyo: "con buenas traducciones, una concordancia y paciencia, el líder puede escuchar el texto antes de predicarlo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué saca la exégesis del texto?", reverso: "Lo que el autor quiso decir.", apoyo: "sacar del texto lo que el autor quiso decir" },
              { frente: "¿Quién enseñó este camino en su manual de exégesis?", reverso: "Gordon Fee, pastor de las Asambleas de Dios y profesor de Nuevo Testamento.", apoyo: "Gordon Fee, pastor ordenado de las Asambleas de Dios y profesor de Nuevo Testamento, enseñó este camino en su manual de exégesis" },
              { frente: "¿Desde dónde y cuándo escribió Pablo la carta a los Romanos?", reverso: "Desde Corinto, hacia el año 57.", apoyo: "Pablo escribió desde Corinto, hacia el año 57, a una iglesia que no había fundado" },
              { frente: "¿En qué versículos está la tesis de la carta?", reverso: "En Romanos 1:16-17.", apoyo: "La tesis de la carta está en Romanos 1:16-17" },
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
            consigna: "¿Saca del texto lo que el autor quiso decir o le mete lo que uno ya piensa? Lleva cada frase a su grupo.",
            grupos: ["Exégesis: saca del texto", "Eiségesis: mete en el texto"],
            frases: [
              { texto: "Buscar lo que el autor quiso decir", grupo: 0 },
              { texto: "Entender qué significó el texto para sus primeros lectores", grupo: 0 },
              { texto: "Ir al texto del Antiguo Testamento que Pablo cita", grupo: 0 },
              { texto: "Escuchar el texto antes de predicarlo", grupo: 0 },
              { texto: "Meter en el texto lo que uno ya piensa", grupo: 1 },
              { texto: "Hacer que el pasaje diga lo que uno ya pensaba", grupo: 1 },
              { texto: "Ponerle al texto una idea que el autor no quiso decir", grupo: 1 },
            ],
            apoyo: "Exégesis viene de una palabra griega que significa sacar o conducir hacia afuera: sacar del texto lo que el autor quiso decir",
            explica: "La exégesis saca del texto lo que el autor quiso decir y lo que significó para sus primeros lectores; la eiségesis le mete lo que uno ya piensa.",
          },
          {
            consigna: "¿Es exégesis o es eiségesis? Lleva cada frase a su grupo.",
            grupos: ["Es exégesis", "Es eiségesis"],
            frases: [
              { texto: "Preguntar quién escribe, a quién, cuándo y por qué", grupo: 0 },
              { texto: "Ver el lugar del pasaje en el argumento del libro", grupo: 0 },
              { texto: "Preguntar qué quiso decir antes de preguntar qué me dice", grupo: 0 },
              { texto: "Decidir el mensaje y después hacer que el texto lo diga", grupo: 1 },
              { texto: "Poner en el pasaje una idea propia", grupo: 1 },
              { texto: "Leer el texto solo para confirmar lo que uno ya piensa", grupo: 1 },
            ],
            apoyo: "La exégesis saca del texto lo que el autor quiso decir; la eiségesis le mete lo que uno ya piensa",
            explica: "La exégesis sigue el método para sacar del texto lo que el autor quiso decir; la eiségesis le mete al texto lo que uno ya piensa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los cinco pasos del método exegético, del primero al último.",
            pasos: ["El contexto histórico", "El contexto literario", "Las palabras y la gramática", "La teología", "La aplicación"],
            apoyo: "El método sigue cinco pasos: el contexto histórico, el contexto literario, las palabras y la gramática, la teología y la aplicación",
            ref: "2 Timoteo 2:15",
            explica: "Primero el contexto histórico y el literario; después las palabras y la gramática; luego la teología, y al final la aplicación: qué le pide hoy el pasaje a la iglesia y a cada creyente.",
          },
          {
            consigna: "Cada paso del método hace una pregunta. Ordénalas como van en el método, de la primera a la última.",
            pasos: [
              "¿Quién escribe, a quién, cuándo y por qué?",
              "¿Qué género es y qué lugar tiene el pasaje en el argumento?",
              "¿Qué significan los términos clave y cómo se unen las frases?",
              "¿Qué enseña el pasaje en el conjunto de la Escritura?",
              "¿Qué le pide hoy a la iglesia y a cada creyente?",
            ],
            apoyo: "El contexto histórico: quién escribe, a quién, cuándo y por qué",
            ref: "2 Timoteo 2:15",
            explica: "El contexto histórico pregunta quién escribe, a quién, cuándo y por qué; el literario, el género y el lugar del pasaje en el argumento; después vienen las palabras y la gramática, la teología y la aplicación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué mira cada paso del método.",
            texto: "El contexto [[histórico]] pregunta quién escribe, a quién, cuándo y por qué; el [[literario]] mira el género y la estructura, y la [[teología]], qué enseña en toda la Escritura.",
            distractores: ["moderno", "musical", "economía"],
            errores: {
              moderno: "El contexto histórico pregunta quién escribe, a quién, cuándo y por qué: mira el tiempo del autor, no el de hoy.",
              musical: "El contexto literario mira el género, la estructura del libro y el lugar del pasaje en el argumento.",
              "economía": "La teología pregunta qué enseña el pasaje en el conjunto de la Escritura.",
            },
            apoyo: "El contexto literario: el género, la estructura del libro y el lugar del pasaje en el argumento",
            ref: "2 Timoteo 2:15",
            explica: "El contexto histórico mira quién escribe, a quién, cuándo y por qué; el literario, el género, la estructura del libro y el lugar del pasaje; y la teología, qué enseña el pasaje en el conjunto de la Escritura.",
          },
          {
            consigna: "Completa qué se pregunta en el paso de las palabras.",
            texto: "En el paso de las palabras y la [[gramática]] se pregunta qué significan los términos [[clave]] y cómo se unen las [[frases]].",
            distractores: ["geografía", "raros", "iglesias"],
            errores: {
              "geografía": "El tercer paso es el de las palabras y la gramática.",
              raros: "Se pregunta qué significan los términos clave del pasaje.",
              iglesias: "Se pregunta cómo se unen las frases, como el porque que se repite en Romanos 1:16-17.",
            },
            apoyo: "Las palabras y la gramática: qué significan los términos clave y cómo se unen las frases",
            ref: "Romanos 1:16-17",
            explica: "En el paso de las palabras y la gramática se pregunta qué significan los términos clave y cómo se unen las frases: en Romanos 1:16-17, tres veces la palabra porque une las frases en una cadena de razones.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "En el ejemplo resuelto de Romanos 1:16-17, une cada paso del método con lo que encuentra.",
            pares: [
              ["El contexto histórico", "Pablo escribe desde Corinto a una iglesia que no fundó"],
              ["El contexto literario", "Es la tesis: todo lo que sigue en la carta la desarrolla"],
              ["Las palabras y la gramática", "Tres veces la palabra porque une una cadena de razones"],
              ["La teología", "Habacuc 2:4 muestra que la fe siempre fue el camino de Dios"],
              ["La aplicación", "Anunciar el evangelio a todo el que cree, sin diferencia de personas"],
            ],
            apoyo: "El contexto literario: es la tesis de la carta, justo después del saludo y de la acción de gracias; todo lo que sigue la desarrolla",
            ref: "Romanos 1:16-17",
            explica: "Pablo escribe desde Corinto (contexto histórico); 1:16-17 es la tesis de la carta (contexto literario); el porque une las frases (palabras y gramática); Habacuc 2:4 muestra que la fe siempre fue el camino de Dios (teología); y el evangelio se anuncia a todo aquel que cree (aplicación).",
          },
          {
            consigna: "Une cada pregunta sobre la introducción de Romanos con su respuesta.",
            pares: [
              ["¿Desde dónde escribe Pablo?", "Desde Corinto, hacia el año 57"],
              ["¿A qué iglesia escribe?", "A una de judíos y gentiles que él no había fundado"],
              ["¿Qué plan de viaje tenía?", "Visitar Roma de camino a España"],
              ["¿Qué marco abre y cierra la carta?", "La obediencia a la fe en todas las naciones"],
              ["¿Dónde está la tesis de la carta?", "En Romanos 1:16-17, que cita Habacuc 2:4"],
            ],
            apoyo: "Romanos se escribió desde Corinto a una iglesia de judíos y gentiles, su marco es la obediencia a la fe en todas las naciones, y su tesis es Romanos 1:16-17, que cita Habacuc 2:4",
            ref: "Romanos 15:22-24",
            explica: "Pablo escribió desde Corinto, hacia el año 57, a una iglesia de judíos y gentiles que no había fundado y que quería visitar de camino a España. El marco de la carta es la obediencia a la fe en todas las naciones, y su tesis es Romanos 1:16-17.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Antes de preguntar qué me dice el texto, pregunto qué quiso decir",
            ref: "Romanos 1:16-17",
            titulo: "Una clase sobre la tesis de Romanos",
            relato: [
              "Enseñas en la academia del ministerio, y la próxima semana te toca abrir el estudio de Romanos con su tesis: Romanos 1:16-17.",
              "Un alumno te cuenta que ya predicó ese texto: habló de no tener vergüenza en el trabajo, sin leer nada de la carta ni el texto que Pablo cita.",
              "Decides preparar la clase con los pasos del método, para enseñarle el camino.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te dice el contexto histórico de la carta?",
                opciones: [
                  { texto: "Que Pablo escribe desde Corinto, hacia el año 57, a una iglesia que no fundó.", bien: true, explica: "El contexto histórico responde quién escribe, a quién, cuándo y por qué." },
                  { texto: "Que Pablo escribe desde Roma a una iglesia que él mismo había fundado años antes.", explica: "Pablo escribió desde Corinto, a una iglesia que no había fundado y que quería visitar." },
                  { texto: "Que Pablo escribe a una iglesia de solo gentiles, en la que no había creyentes judíos.", explica: "La iglesia tenía creyentes judíos y gentiles, y en la carta se ven las tensiones entre ellos." },
                  { texto: "Que ese paso no importa: el texto de Romanos 1:16-17 se entiende solo, sin contexto.", explica: "Usar bien la Palabra empieza por entender lo que significó para sus primeros lectores." },
                ],
                apoyo: "Pablo escribió desde Corinto, hacia el año 57, a una iglesia que no había fundado",
                explica: "Pablo escribió desde Corinto, hacia el año 57, a una iglesia de judíos y gentiles que no había fundado y que quería visitar de camino a España.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué lugar tienen estos versículos en la carta?",
                opciones: [
                  { texto: "Son la tesis: todo lo que sigue en la carta la desarrolla.", bien: true, explica: "Es el contexto literario: la tesis de la carta, justo después del saludo y de la acción de gracias." },
                  { texto: "Son un saludo personal que no tiene que ver con el resto de la carta.", explica: "Vienen justo después del saludo y de la acción de gracias: son la tesis de la carta." },
                  { texto: "Son una nota suelta del final, después de los saludos del capítulo 16.", explica: "Están en el capítulo 1: son la tesis, y todo lo que sigue la desarrolla." },
                  { texto: "Son un versículo aislado que se puede predicar sin mirar el argumento.", explica: "El contexto literario mira el lugar del pasaje en el argumento: aquí es la tesis de la carta." },
                ],
                apoyo: "El contexto literario: es la tesis de la carta, justo después del saludo y de la acción de gracias; todo lo que sigue la desarrolla",
                explica: "La tesis de la carta está en Romanos 1:16-17, justo después del saludo y de la acción de gracias; todo lo que sigue la desarrolla.",
              },
              {
                tipo: "situacion",
                pregunta: "Pablo cita: «el justo por su fe vivirá». ¿Qué hace con eso un buen exegeta?",
                opciones: [
                  { texto: "Va a Habacuc 2:4, donde Dios responde al profeta ante la amenaza de Babilonia.", bien: true, explica: "Un buen exegeta va al texto que Pablo cita." },
                  { texto: "Lo deja de lado, porque el Antiguo Testamento no ayuda a entender lo que dice Pablo.", explica: "Un buen exegeta va al texto que Pablo cita: Habacuc 2:4." },
                  { texto: "Le da el sentido que mejor le sirva para su sermón, sin mirar el texto de Habacuc.", explica: "Eso es meter en el texto lo que uno ya piensa: la eiségesis." },
                  { texto: "Lo explica solo con lo que siente al leerlo, sin estudiar el texto que se cita.", explica: "La exégesis saca del texto lo que el autor quiso decir: por eso se estudia el texto citado." },
                ],
                apoyo: "Un buen exegeta va al texto que Pablo cita: Habacuc 2:4, donde Dios responde al profeta ante la amenaza de Babilonia",
                ref: "Habacuc 2:4",
                explica: "En Habacuc 2:4, Dios responde al profeta ante la amenaza de Babilonia: «el justo por su fe vivirá». Pablo lo usa para mostrar que la justicia que Dios da se recibe por la fe.",
              },
              {
                tipo: "explica",
                apoyo: "Pablo lo usa para mostrar que la justicia que Dios da se recibe por la fe",
                ref: "Romanos 1:16-17",
                clave: {
                  id: "pr-n5-exegesis-1-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a tu alumno sobre cómo predicar Romanos 1:16-17.",
                  ideas: [
                    { id: "primero", peso: 50, texto: "Que primero hay que entender lo que el texto significó para sus primeros lectores, con su contexto, antes de preguntar qué significa hoy.", formas: ["primeros lectores", "significo para", "lo que significo", "quiso decir", "su contexto", "el contexto", "contexto (historico|literario)", "antes de (preguntar|aplicar|predicar*)", "(lea|leer|estudi*) (carta|habacuc)"] },
                    { id: "fe", peso: 50, texto: "Que el texto enseña que la justicia que Dios da se recibe por la fe, como dice Habacuc 2:4, para todo aquel que cree.", formas: ["por (la|su) fe", "por fe", "justo por su fe", "se recibe por", "justicia de dios", "justicia que dios da", "habacuc", "todo aquel que cree", "todo el que cree"] },
                  ],
                  modelo: "Le diría que primero estudie el contexto y entienda lo que el texto significó para sus primeros lectores. Y que el texto enseña que la justicia que Dios da se recibe por la fe, como dice Habacuc 2:4.",
                },
              },
            ],
          },
          {
            apoyo: "El saludo ya es teología",
            ref: "Romanos 1:1-5",
            titulo: "El saludo que nadie quería estudiar",
            relato: [
              "Eres líder de líderes, y vas a preparar a los maestros de célula para una serie sobre Romanos.",
              "Una maestra te dice: El saludo de Romanos 1:1-5 me lo salto; es solo una presentación de Pablo antes de lo importante.",
              "Le propones mirar juntas la introducción de la carta con el método.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A qué iglesia escribía Pablo, según el contexto histórico?",
                opciones: [
                  { texto: "A una iglesia de judíos y gentiles que no había fundado y quería visitar.", bien: true, explica: "Así lo presenta la lección: una iglesia de judíos y gentiles que Pablo no había fundado y que quería visitar de camino a España." },
                  { texto: "A una iglesia fundada por él mismo, donde ya había vivido y enseñado muchos años.", explica: "Pablo escribió a una iglesia que no había fundado." },
                  { texto: "A una iglesia de creyentes judíos solamente, sin tensiones entre sus miembros.", explica: "La iglesia tenía creyentes judíos y gentiles, y en la carta se ven las tensiones entre ellos." },
                  { texto: "A una persona sola, para contarle sus planes de viaje, sin enseñarle doctrina.", explica: "Pablo escribe a una iglesia, y su saludo ya es teología." },
                ],
                apoyo: "La iglesia tenía creyentes judíos y gentiles, y en la carta se ven las tensiones entre ellos (Romanos 14 y 15)",
                explica: "Pablo escribió desde Corinto a una iglesia de judíos y gentiles que no había fundado; en la carta se ven las tensiones entre ellos (Romanos 14 y 15).",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes sobre el saludo de la carta?",
                opciones: [
                  { texto: "Que el saludo ya es teología: el evangelio es acerca del Hijo de Dios.", bien: true, explica: "El evangelio fue prometido por los profetas y es «acerca de su Hijo», declarado Hijo de Dios con poder por la resurrección." },
                  { texto: "Que tiene razón: el saludo no enseña nada y se puede saltar siempre que se predique.", explica: "El saludo ya es teología: habla del evangelio, del Hijo y de la misión." },
                  { texto: "Que el saludo solo sirve para saber el nombre de quien escribe la carta.", explica: "El saludo ya es teología: el evangelio es acerca del Hijo de Dios." },
                  { texto: "Que el saludo importa solo porque dice desde qué ciudad se escribió la carta.", explica: "El saludo ya es teología: anuncia el evangelio prometido por los profetas." },
                ],
                apoyo: "El saludo ya es teología",
                ref: "Romanos 1:1-4",
                explica: "El saludo ya es teología: el evangelio fue «prometido antes por sus profetas en las santas Escrituras» y es «acerca de su Hijo», «declarado Hijo de Dios con poder» «por la resurrección de entre los muertos».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué idea abre la carta en el saludo y vuelve al final, en Romanos 16:26?",
                opciones: [
                  { texto: "La obediencia a la fe en todas las naciones.", bien: true, explica: "Ese marco al principio y al final muestra el propósito de toda la carta." },
                  { texto: "Los planes de viaje de Pablo a España y a Jerusalén.", explica: "El marco que abre y cierra la carta es la obediencia a la fe en todas las naciones." },
                  { texto: "La ley de Moisés, que Pablo pide cumplir para ser justo.", explica: "La misión es «la obediencia a la fe en todas las naciones»." },
                  { texto: "Las tensiones entre los creyentes judíos y los gentiles.", explica: "Las tensiones se ven en Romanos 14 y 15; el marco de la carta es la obediencia a la fe en todas las naciones." },
                ],
                apoyo: "Al final de la carta vuelve la misma idea (Romanos 16:26): ese marco al principio y al final muestra el propósito de toda la carta",
                ref: "Romanos 1:5",
                explica: "La misión es «la obediencia a la fe en todas las naciones», y al final de la carta vuelve la misma idea (Romanos 16:26): ese marco muestra el propósito de toda la carta.",
              },
              {
                tipo: "explica",
                apoyo: "Y la misión es «la obediencia a la fe en todas las naciones»",
                ref: "Romanos 1:1-5",
                clave: {
                  id: "pr-n5-exegesis-1-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a la maestra sobre lo que enseña el saludo de Romanos.",
                  ideas: [
                    { id: "hijo", peso: 50, texto: "Que el evangelio fue prometido por los profetas y es acerca del Hijo, declarado Hijo de Dios con poder por la resurrección.", formas: ["prometid*", "profetas", "acerca de su hijo", "acerca del hijo", "hijo de dios", "su hijo", "resurrec*", "declarado hijo", "con poder"] },
                    { id: "naciones", peso: 50, texto: "Que la misión es la obediencia a la fe en todas las naciones, el marco que muestra el propósito de toda la carta.", formas: ["obediencia a la fe", "obedezcan a la fe", "todas las naciones", "las naciones", "todas las gentes", "proposito de la carta", "proposito", "el marco"] },
                  ],
                  modelo: "Le diría que el saludo ya es teología: el evangelio fue prometido por los profetas y es acerca del Hijo, declarado Hijo de Dios con poder por la resurrección. Y la misión es la obediencia a la fe en todas las naciones.",
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
            apoyo: "La exégesis saca del texto lo que el autor quiso decir; la eiségesis le mete lo que uno ya piensa",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n5-exegesis-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre la exégesis y la eiségesis?",
              ideas: [
                { id: "sacar", peso: 50, texto: "La exégesis saca del texto lo que el autor quiso decir.", formas: ["saca* del texto", "saca* lo que", "lo que el autor quiso", "(pablo|escritor) quiso", "quiso decir", "hacia afuera"] },
                { id: "meter", peso: 50, texto: "La eiségesis le mete al texto lo que uno ya piensa.", formas: ["mete* (en|al) texto", "mete* lo que", "meti* lo que", "pone* (en|al) texto", "pone* lo que", "lo que uno ya", "lo que (uno|yo|tu|el|ella) (piensa|pienso|piensas|cree|creo|crees|quiere|quiero)", "ya (piensa|pienso|pensaba|pensamos|cree|creo|creia)", "idea* propia*", "(su|sus|mi|mis) propia* idea*"] },
              ],
              errores: [
                { id: "al-reves", texto: "La exégesis saca del texto lo que el autor quiso decir; la que le mete lo que uno ya piensa es la eiségesis.", formas: ["exegesis mete*", "exegesis pone*"], anula: "sacar" },
                { id: "al-reves-2", texto: "La exégesis saca del texto lo que el autor quiso decir; la que le mete lo que uno ya piensa es la eiségesis.", formas: ["exegesis mete*", "exegesis pone*"], anula: "meter" },
              ],
              modelo: "La exégesis saca del texto lo que el autor quiso decir, lo que significó para sus primeros lectores. La eiségesis hace lo contrario: le mete al texto lo que uno ya piensa.",
            },
          },
          {
            apoyo: "Usar bien la Palabra empieza por entender lo que significó para sus primeros lectores, antes de preguntar qué significa hoy",
            ref: "2 Timoteo 2:15",
            clave: {
              id: "pr-n5-exegesis-1-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué un buen maestro pregunta qué quiso decir el texto antes de preguntar qué le dice hoy?",
              ideas: [
                { id: "lectores", peso: 50, texto: "Porque usar bien la Palabra empieza por entender lo que significó para sus primeros lectores.", formas: ["primeros lectores", "sus lectores", "significo para", "lo que significo", "(autor|pablo|escritor) quiso", "quiso decir", "saca* del texto", "usar bien la palabra", "usa bien la palabra"] },
                { id: "meter", peso: 50, negativa: true, texto: "Así no le mete al texto lo que uno ya piensa: eso sería eiségesis.", formas: ["no mete*", "no meti*", "sin mete*", "no pone*", "no pon*", "sin pone*", "no (agrega|agregue|agregar|agregarle)", "no (inventa|invente|inventar)", "no (cambia|cambie|cambiar) (el|su) sentido"] },
              ],
              errores: [
                { id: "hoy", texto: "Usar bien la Palabra empieza por entender lo que significó para sus primeros lectores, antes de preguntar qué significa hoy.", formas: ["(es|son) secundari*", "mas importante es lo que (me|nos|te) dice", "importa mas lo que (me|nos|te) dice", "solo importa lo que (me|nos|te) dice"], anula: "lectores" },
                { id: "meter-si", texto: "La eiségesis le mete al texto lo que uno ya piensa: el buen maestro primero pregunta qué quiso decir.", formas: ["(puede|pueda|podemos|debe|deben|debemos) mete*", "para mete*", "(puede|pueda|podemos|debe|deben|debemos) pone*", "para pone*"], anula: "meter" },
              ],
              modelo: "Porque usar bien la Palabra empieza por entender lo que significó para sus primeros lectores. Así no le mete al texto lo que uno ya piensa, sino que saca de él lo que el autor quiso decir.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Todos bajo pecado (Romanos 1:18 a 3:20)
    "n5-exegesis-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dos revelaciones pone Pablo una al lado de la otra?", reverso: "La justicia de Dios en el evangelio y la ira de Dios desde el cielo.", apoyo: "Pablo pone dos revelaciones una al lado de la otra" },
              { frente: "¿Cuántas veces dice Pablo que Dios los entregó?", reverso: "Tres veces: en 1:24, 26 y 28.", apoyo: "Tres veces dice Pablo que Dios «los entregó» (1:24, 26 y 28)" },
              { frente: "¿Cuál es el pecado de fondo en Romanos 1?", reverso: "La idolatría: dar culto a las criaturas antes que al Creador.", apoyo: "El pecado de fondo es la idolatría" },
              { frente: "¿Qué es lo que vale delante de Dios, según Romanos 2:28-29?", reverso: "El corazón: la circuncisión es la del corazón.", apoyo: "Lo que vale delante de Dios es el corazón" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué nadie puede alegar ignorancia de Dios?", reverso: "Porque lo que se conoce de Dios en la creación hace que no tengan excusa.", apoyo: "Y nadie puede alegar ignorancia" },
              { frente: "¿Cuándo empieza el juicio, según Romanos 1?", reverso: "Cuando Dios deja que el ser humano siga el camino que eligió.", apoyo: "El juicio empieza cuando Dios deja que el ser humano siga el camino que eligió" },
              { frente: "¿A quién se vuelve Pablo en el capítulo 2?", reverso: "Al moralista que juzga a los demás, y en especial al judío que confiaba en tener la ley.", apoyo: "En el capítulo 2 Pablo se vuelve al moralista que juzga a los demás, y en especial al judío que confiaba en tener la ley" },
              { frente: "¿Qué muestran las palabras que se repiten y los conectores?", reverso: "El hilo del argumento.", apoyo: "muestran el hilo del argumento" },
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
            consigna: "Sigue el argumento de Romanos 1:18 a 3:20. Ordena sus pasos, del primero al último.",
            pasos: [
              "La ira de Dios se revela contra toda impiedad de los hombres",
              "Los gentiles conocían a Dios por la creación y no tienen excusa",
              "Cambiaron la verdad por la mentira, y Dios los entregó",
              "Pablo se vuelve al moralista que juzga a los demás",
              "Toda boca se cierra: la ley muestra el pecado",
            ],
            apoyo: "En Romanos 1:18 a 3:20, Pablo muestra que todos están bajo pecado",
            ref: "Romanos 1:18 a 3:20",
            explica: "Pablo empieza con la ira de Dios (1:18); muestra que los gentiles no tienen excusa y que Dios los entregó (1:20-28); se vuelve al moralista y al judío (capítulo 2), y concluye que toda boca se cierra (3:19-20).",
          },
          {
            consigna: "Pablo no da versículos sueltos, sino un razonamiento. Ordena sus pasos, del primero al último.",
            pasos: [
              "Se revela desde el cielo la ira de Dios",
              "Nadie puede alegar ignorancia: Dios se conoce en la creación",
              "El judío confiaba en tener la ley, pero no la cumplía",
              "Pablo junta una cadena de citas de los Salmos y de Isaías",
              "Todo el mundo queda bajo el juicio de Dios",
            ],
            apoyo: "Pablo no da versículos sueltos, sino un razonamiento",
            ref: "Romanos 1:18 a 3:20",
            explica: "Primero se revela la ira de Dios y nadie tiene excusa (capítulo 1); después el judío que confiaba en la ley (capítulo 2); al final, una cadena de citas (3:10-18) y la conclusión: todo el mundo queda bajo el juicio de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra clave del pasaje con lo que significa.",
            pares: [
              ["La ira de Dios", "Su justo rechazo del mal, no un enojo caprichoso"],
              ["Los entregó", "Dios deja que el ser humano siga el camino que eligió"],
              ["No tienen excusa", "Nadie puede alegar ignorancia: Dios se conoce en la creación"],
              ["La idolatría", "Dar culto a las criaturas antes que al Creador"],
            ],
            apoyo: "La ira de Dios no es un enojo caprichoso, sino su justo rechazo del mal",
            ref: "Romanos 1:18-25",
            explica: "La ira de Dios es su justo rechazo del mal; los entregó dice que Dios deja que el ser humano siga el camino que eligió; no tienen excusa, que nadie puede alegar ignorancia; y la idolatría es el pecado de fondo.",
          },
          {
            consigna: "¿A quién se refiere cada palabra clave? Une cada una con su respuesta.",
            pares: [
              ["No tienen excusa", "Los gentiles, que conocían a Dios por la creación"],
              ["Inexcusable", "El moralista que juzga a los demás"],
              ["Los entregó", "Los que cambiaron la verdad de Dios por la mentira"],
              ["La ira de Dios", "Se revela contra toda impiedad e injusticia"],
            ],
            apoyo: "Fíjate en las palabras que se repiten, como «los entregó», «no tienen excusa» e «inexcusable»",
            ref: "Romanos 1:18 a 2:1",
            explica: "Los gentiles conocían a Dios por la creación y no tienen excusa; Dios entregó a los que cambiaron la verdad por la mentira; y el que juzga a los demás es inexcusable. La ira de Dios se revela contra toda impiedad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es la ira de Dios y desde dónde se revela.",
            texto: "La ira de Dios es su justo [[rechazo]] del [[mal]], y se revela desde el [[cielo]] contra toda impiedad.",
            distractores: ["deseo", "bien", "infierno"],
            errores: {
              deseo: "La ira de Dios es su justo rechazo del mal, no un enojo caprichoso.",
              bien: "Lo que Dios rechaza con justicia es el mal.",
              infierno: "La ira de Dios se revela desde el cielo.",
            },
            apoyo: "La ira de Dios no es un enojo caprichoso, sino su justo rechazo del mal",
            ref: "Romanos 1:18",
            explica: "«La ira de Dios se revela desde el cielo contra toda impiedad e injusticia de los hombres»: no es un enojo caprichoso, sino su justo rechazo del mal.",
          },
          {
            consigna: "Completa lo que dice Pablo en Romanos 1:24-25.",
            texto: "Tres veces dice Pablo que Dios los [[entregó]], porque [[cambiaron]] la verdad de Dios por la [[mentira]].",
            distractores: ["perdonó", "guardaron", "ley"],
            errores: {
              "perdonó": "Pablo dice tres veces que Dios «los entregó»: el juicio empieza cuando Dios deja que sigan el camino que eligieron.",
              guardaron: "No la guardaron: «cambiaron la verdad de Dios por la mentira».",
              ley: "Cambiaron la verdad de Dios por la mentira.",
            },
            apoyo: "El juicio empieza cuando Dios deja que el ser humano siga el camino que eligió, porque «cambiaron la verdad de Dios por la mentira»",
            ref: "Romanos 1:24-25",
            explica: "Tres veces dice Pablo que Dios «los entregó» (1:24, 26 y 28): el juicio empieza cuando Dios deja que el ser humano siga el camino que eligió, porque «cambiaron la verdad de Dios por la mentira».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Romanos 3:20, ¿por medio de qué ningún ser humano será justificado? Toca las palabras que lo dicen.",
            texto: "por las [[obras de la ley]] ningún ser humano será justificado delante de él",
            apoyo: "La ley no salva: muestra el pecado",
            ref: "Romanos 3:20",
            explica: "La conclusión es clara: «por las obras de la ley ningún ser humano será justificado delante de él». La ley no salva: muestra el pecado.",
          },
          {
            consigna: "Según Romanos 3:19, ¿qué pasa con toda boca cuando habla la ley, y bajo qué queda todo el mundo? Toca las palabras que lo dicen.",
            texto: "para que toda boca [[se cierre]] y todo el mundo quede bajo el [[juicio de Dios]]",
            apoyo: "La conclusión es que toda boca se cierra",
            ref: "Romanos 3:19",
            explica: "La ley habla «para que toda boca se cierre y todo el mundo quede bajo el juicio de Dios»: nadie puede presentarse justo delante de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Conocer la ley no salva si no se cumple",
            ref: "Romanos 2:1",
            situacion: "Eres maestro de la clase de adultos. Estudian Romanos 2 y 3, y un hermano que lleva muchos años en la iglesia dice en voz alta: Yo no soy como esos pecadores de Romanos 1; yo cumplo con todo.",
            escenas: [
              {
                id: "e1",
                narra: "Algunos asienten, y otros se quedan callados mirando el suelo.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lees con la clase Romanos 2:1: el que juzga a otros es inexcusable.", valor: 2, explica: "En el capítulo 2 Pablo se vuelve al moralista que juzga a los demás: «eres inexcusable, oh hombre, quienquiera que seas tú que juzgas».", siguiente: "e2" },
                  { texto: "Le das la razón a medias y sigues con la lección para no incomodar a nadie.", valor: 1, explica: "Evitar el choque no es malo, pero pierdes la ocasión de mostrar lo que Pablo le dice al que juzga a los demás.", siguiente: "e2" },
                  { texto: "Le dices que sí: los que cumplen la ley quedan fuera del juicio de Dios.", valor: 0, explica: "Por las obras de la ley nadie será justificado: todo el mundo queda bajo el juicio de Dios.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El hermano sonríe satisfecho, y una joven nueva baja la cabeza.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Corriges lo que dijiste: por las obras de la ley nadie será justificado.", valor: 2, explica: "Es la conclusión de Romanos 3:20: «por las obras de la ley ningún ser humano será justificado delante de él».", siguiente: "e2" },
                  { texto: "Lo dejas así: en la iglesia hay buenos y malos, y cada uno sabe dónde está.", valor: 0, explica: "Pablo muestra que todos están bajo pecado, también el que juzga a los demás.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El hermano insiste: Pero yo conozco la ley desde niño.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que conocer la ley no salva si no se cumple: lo que vale es el corazón.", valor: 2, explica: "Lo que vale delante de Dios es el corazón: «la circuncisión es la del corazón, en espíritu, no en letra»." },
                  { texto: "Que conocer la ley es bueno, y que siga estudiándola cada día con mucha fe.", valor: 1, explica: "Estudiar es bueno, pero conocer la ley no salva si no se cumple: lo que vale es el corazón." },
                  { texto: "Que conocer la ley desde niño ya lo hace justo delante de Dios para siempre.", valor: 0, explica: "Conocer la ley no salva si no se cumple, y por las obras de la ley nadie será justificado." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, la joven nueva te pregunta: ¿Entonces nadie puede presentarse justo delante de Dios?",
                pregunta: "¿Cómo cierras la clase?",
                opciones: [
                  { texto: "Le explicas que la mala noticia prepara el corazón para la buena noticia.", valor: 2, explica: "La ley no salva: muestra el pecado. Y la mala noticia prepara el corazón para la buena, la justicia de Dios por la fe." },
                  { texto: "Le dices que la respuesta llegará en otra clase, sin decirle nada más por hoy.", valor: 1, explica: "La respuesta sí llega en Romanos 3:21, pero conviene decirle ya que la mala noticia prepara el corazón para la buena." },
                  { texto: "Le dices que se esfuerce más en cumplir la ley para ganarse el favor de Dios.", valor: 0, explica: "Por las obras de la ley nadie será justificado: la ley no salva, muestra el pecado." },
                ],
              },
            ],
          },
          {
            apoyo: "La mala noticia prepara el corazón para la buena",
            ref: "Romanos 3:19-20",
            situacion: "Eres pastor de una iglesia pequeña. Vas a predicar una serie sobre Romanos, y un diácono te pide que te saltes Romanos 1:18 a 3:20 porque habla mucho del pecado.",
            escenas: [
              {
                id: "e1",
                narra: "El diácono te dice: La gente quiere oír cosas buenas, pastor.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la mala noticia prepara el corazón para la buena noticia.", valor: 2, explica: "Antes de la buena noticia, Pablo da la mala: nadie puede presentarse justo delante de Dios." },
                  { texto: "Que lo vas a predicar, pero en un solo domingo y muy de prisa.", valor: 1, explica: "Predicarlo está bien, pero Pablo no da versículos sueltos, sino un razonamiento que vale la pena seguir paso a paso." },
                  { texto: "Que tiene razón: es mejor ir directo a la gracia y saltar esa parte.", valor: 0, explica: "Antes de la buena noticia, Pablo da la mala: saltarla deja sin preparar el corazón para la buena." },
                ],
              },
              {
                id: "e2",
                narra: "Preparas el primer sermón, sobre Romanos 1:18-32.",
                pregunta: "¿Cómo explicas la ira de Dios?",
                opciones: [
                  { texto: "Como su justo rechazo del mal, no como un enojo caprichoso.", valor: 2, explica: "La ira de Dios no es un enojo caprichoso, sino su justo rechazo del mal." },
                  { texto: "Como un tema que es mejor tocar poco, para no asustar a nadie.", valor: 1, explica: "Hay que tratarlo con cuidado, pero Pablo lo dice claro: la ira de Dios es su justo rechazo del mal." },
                  { texto: "Como un enojo de Dios que cambia según su humor de cada día.", valor: 0, explica: "La ira de Dios no es un enojo caprichoso, sino su justo rechazo del mal." },
                ],
              },
              {
                id: "e3",
                narra: "En el último sermón de esa parte llegas a Romanos 3:19-20.",
                pregunta: "¿Qué conclusión predicas?",
                opciones: [
                  { texto: "Que toda boca se cierra: por las obras de la ley nadie será justificado.", valor: 2, explica: "La ley habla «para que toda boca se cierre y todo el mundo quede bajo el juicio de Dios»." },
                  { texto: "Que todos tenemos fallas, aunque algunos somos bastante mejores que otros.", valor: 1, explica: "Es cierto que todos fallamos, pero Pablo concluye más: todo el mundo queda bajo el juicio de Dios." },
                  { texto: "Que el que cumple bien la ley ya está justificado delante de Dios por eso.", valor: 0, explica: "«Por las obras de la ley ningún ser humano será justificado delante de él»: la ley muestra el pecado." },
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
            apoyo: "Los gentiles conocían a Dios por la creación y no tienen excusa, pero cambiaron la verdad por la mentira, y Dios los entregó a su propio camino",
            ref: "Romanos 1:18 a 3:20",
            clave: {
              id: "pr-n5-exegesis-2-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo muestra Pablo, en Romanos 1 y 2, que gentiles y judíos están bajo pecado?",
              ideas: [
                { id: "gentiles", peso: 50, texto: "Los gentiles conocían a Dios por la creación y no tienen excusa, pero cambiaron la verdad por la mentira, y Dios los entregó.", formas: ["por la creacion", "en la creacion", "no tienen excusa", "sin excusa", "cambiaron la verdad", "por la mentira", "idolatr*", "a las criaturas", "los entrego", "(los|les) entrego"] },
                { id: "judios", peso: 50, texto: "Los judíos tenían la ley, pero juzgaban a otros sin cumplirla.", formas: ["tenian la ley", "tienen la ley", "conocian la ley", "conocen la ley", "juzga* a (otros|los)", "sin cumplir*", "no (la|lo) cumpl*", "inexcusable*", "moralista*"] },
              ],
              errores: [
                { id: "gentiles-ley", texto: "Los que tenían la ley eran los judíos; los gentiles conocían a Dios por la creación.", formas: ["gentiles (tenian|tienen|tuvieron) la ley"], anula: "judios" },
                { id: "judios-creacion", texto: "Los que conocían a Dios por la creación y no tienen excusa eran los gentiles; los judíos tenían la ley.", formas: ["judios conoc* dios creacion"], anula: "gentiles" },
              ],
              modelo: "Los gentiles conocían a Dios por la creación y no tienen excusa, pero cambiaron la verdad por la mentira, y Dios los entregó. Los judíos tenían la ley, pero juzgaban a otros sin cumplirla.",
            },
          },
          {
            apoyo: "Antes de la buena noticia, Pablo da la mala: nadie puede presentarse justo delante de Dios",
            ref: "Romanos 3:19-20",
            clave: {
              id: "pr-n5-exegesis-2-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué Pablo da la mala noticia antes de la buena en Romanos 1:18 a 3:20?",
              ideas: [
                { id: "todos", peso: 50, texto: "Para mostrar que todos están bajo pecado: nadie puede presentarse justo delante de Dios, y toda boca se cierra.", formas: ["todos bajo pecado", "todos (pecaron|pecamos)", "todos (somos|son|estamos|estan) pecadores", "nadie (puede|es) justo", "nadie (puede|podria) presentarse", "toda boca", "boca se (cierra|cierre)", "bajo el juicio", "ninguno (es|sera) justo*"] },
                { id: "prepara", peso: 50, texto: "Porque la mala noticia prepara el corazón para la buena: el evangelio.", formas: ["prepara*", "necesit* (la|el|a|de) (gracia|evangelio|cristo|salvacion|buena)", "busca* (la|el|a) (gracia|evangelio|cristo)", "entiend* (la|el) (gracia|evangelio)", "valor* (la|el) (gracia|evangelio)"] },
              ],
              modelo: "Para mostrar que todos están bajo pecado y que nadie puede presentarse justo delante de Dios: toda boca se cierra. Esa mala noticia prepara el corazón para la buena, el evangelio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La justicia de Dios por la fe (Romanos 3:21 a 5:21)
    "n5-exegesis-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué dos palabras lo cambia todo Pablo en Romanos 3:21?", reverso: "Con «Pero ahora».", apoyo: "Después de cerrar toda boca, Pablo escribe dos palabras que lo cambian todo: pero ahora" },
              { frente: "¿Qué concentran los versículos de Romanos 3:21-26?", reverso: "La teología de la cruz.", apoyo: "Estos versículos concentran la teología de la cruz" },
              { frente: "¿Qué significa justificar?", reverso: "Declarar justo, como un juez.", apoyo: "Justificar: declarar justo, como un juez" },
              { frente: "¿Con quién prueba Pablo su enseñanza en el capítulo 4?", reverso: "Con Abraham.", apoyo: "En el capítulo 4, Pablo prueba su enseñanza con Abraham" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es la redención?", reverso: "La libertad comprada con un precio.", apoyo: "Redención: la libertad comprada con un precio" },
              { frente: "¿Qué es la propiciación?", reverso: "El sacrificio que satisface la justicia de Dios y quita su ira.", apoyo: "Propiciación: el sacrificio que satisface la justicia de Dios y quita su ira" },
              { frente: "¿Cuál es la base de los frutos de Romanos 5?", reverso: "El amor de Dios: siendo aún pecadores, Cristo murió por nosotros.", apoyo: "La base es el amor de Dios" },
              { frente: "¿Qué conectores marcan los grandes giros del argumento?", reverso: "«Pero ahora» (3:21), «Justificados, pues» (5:1) y «Por tanto» (5:12).", apoyo: "Los grandes giros de un libro suelen estar marcados por conectores" },
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
            consigna: "Une cada palabra clave de Romanos 3:21-26 con lo que significa.",
            pares: [
              ["Justificar", "Declarar justo, como un juez"],
              ["Redención", "La libertad comprada con un precio"],
              ["Propiciación", "El sacrificio que satisface la justicia de Dios y quita su ira"],
              ["Pero ahora", "El giro de Romanos 3:21, después de cerrar toda boca"],
            ],
            apoyo: "Justificar: declarar justo, como un juez",
            ref: "Romanos 3:21-26",
            explica: "Justificar es declarar justo, como un juez; la redención es la libertad comprada con un precio; la propiciación, el sacrificio que satisface la justicia de Dios y quita su ira. Y pero ahora es el giro de 3:21.",
          },
          {
            consigna: "Une cada parte de Romanos 3:21-26 con lo que dice.",
            pares: [
              ["Dios justifica", "Gratuitamente por su gracia, mediante la redención"],
              ["A Cristo, Dios lo puso", "Como propiciación por medio de la fe en su sangre"],
              ["Dios es a la vez", "El justo, y el que justifica"],
              ["La justicia de Dios", "Se ha manifestado aparte de la ley"],
            ],
            apoyo: "Dios justifica «gratuitamente por su gracia», mediante «la redención», y puso a Cristo «como propiciación por medio de la fe en su sangre»",
            ref: "Romanos 3:21-26",
            explica: "«Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios»: Dios justifica gratuitamente por su gracia, mediante la redención, y puso a Cristo como propiciación. Así es a la vez «el justo, y el que justifica».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el giro de Romanos 3:21.",
            texto: "Después de cerrar toda [[boca]], Pablo escribe dos [[palabras]] que lo cambian todo: pero [[ahora]].",
            distractores: ["puerta", "promesas", "nunca"],
            errores: {
              puerta: "Pablo acaba de cerrar toda boca: nadie puede presentarse justo delante de Dios.",
              promesas: "Son dos palabras: pero ahora.",
              nunca: "Las dos palabras son pero ahora: «Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios».",
            },
            apoyo: "Después de cerrar toda boca, Pablo escribe dos palabras que lo cambian todo: pero ahora",
            ref: "Romanos 3:21",
            explica: "Después de mostrar que toda boca se cierra, Pablo escribe: «Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios». Es el gran giro del argumento.",
          },
          {
            consigna: "Completa lo que enseña Romanos 3:21-26 sobre Dios y el pecado.",
            texto: "Dios es a la vez el [[justo]] y el que justifica, porque [[castiga]] el pecado en [[Cristo]].",
            distractores: ["débil", "olvida", "Moisés"],
            errores: {
              "débil": "Dios es «el justo, y el que justifica».",
              olvida: "Dios no pasa por alto el pecado: lo castiga en Cristo.",
              "Moisés": "Dios castiga el pecado en Cristo, a quien puso como propiciación.",
            },
            apoyo: "no pasa por alto el pecado, sino que lo castiga en Cristo",
            ref: "Romanos 3:26",
            explica: "Dios es a la vez «el justo, y el que justifica»: no pasa por alto el pecado, sino que lo castiga en Cristo, a quien puso como propiciación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un maestro de la escuela dominical te dice: Abraham fue declarado justo porque se circuncidó; por eso la circuncisión fue tan importante.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios lo declaró justo antes de su circuncisión: la circuncisión fue un sello.", bien: true, explica: "Es lo que enseña Romanos 4: la circuncisión fue «como sello de la justicia de la fe que tuvo estando aún incircunciso»." },
              { texto: "Que tiene razón: Abraham fue justo por circuncidarse, y así deben hacerlo los creyentes.", explica: "Dios lo declaró justo antes de que fuera circuncidado: fue justificado por la fe." },
              { texto: "Que Abraham nunca fue declarado justo, porque vivió antes de que se escribiera la ley.", explica: "Abraham fue declarado justo por la fe, y Pablo prueba su enseñanza con él." },
              { texto: "Que la circuncisión fue la manera en que Abraham se ganó la justicia delante de Dios.", explica: "La circuncisión fue un sello de la justicia de la fe que Abraham ya tenía." },
            ],
            apoyo: "Dios lo declaró justo antes de que fuera circuncidado",
            ref: "Romanos 4:11",
            explica: "En el capítulo 4, Pablo prueba su enseñanza con Abraham: Dios lo declaró justo antes de que fuera circuncidado, y la circuncisión fue el sello de la justicia de la fe.",
          },
          {
            caso: "Una hermana de tu célula, que no es de origen judío, te dice: Abraham es el padre de los judíos; yo no tengo nada que ver con él.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Abraham es padre de todos los creyentes, judíos y gentiles: también suyo.", bien: true, explica: "Por eso Abraham es «padre de todos los creyentes», judíos y gentiles: fue declarado justo por la fe." },
              { texto: "Que tiene razón: Abraham solo es padre de los que nacieron judíos y se circuncidaron.", explica: "Abraham es padre de todos los creyentes, judíos y gentiles." },
              { texto: "Que podrá ser hija de Abraham cuando cumpla toda la ley de Moisés en su vida diaria.", explica: "Abraham fue declarado justo por la fe, y es padre de todos los creyentes." },
              { texto: "Que Abraham no tiene que ver con la fe, sino solo con la historia del pueblo de Israel.", explica: "Pablo prueba con Abraham la justificación por la fe: es padre de todos los creyentes." },
            ],
            apoyo: "Por eso Abraham es «padre de todos los creyentes», judíos y gentiles",
            ref: "Romanos 4:11",
            explica: "Dios declaró justo a Abraham por la fe, antes de que fuera circuncidado. Por eso Abraham es «padre de todos los creyentes», judíos y gentiles.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Adán y Cristo en Romanos 5: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Desde Romanos 5:12, Pablo compara a Adán y a Cristo.", verdad: true, explica: "Desde 5:12 Pablo compara a Adán y a Cristo: por un hombre entraron el pecado y la muerte, y por otro vienen la justicia y la vida.", apoyo: "Desde 5:12 Pablo compara a Adán y a Cristo" },
              { texto: "Por Cristo entraron el pecado y la muerte.", verdad: false, explica: "Por un hombre, Adán, entraron el pecado y la muerte; por Cristo vienen la justicia y la vida.", apoyo: "por un hombre entraron el pecado y la muerte, y por otro vienen la justicia y la vida" },
              { texto: "Las dos lecturas de Romanos 5:12 enseñan que el pecado de Adán afectó a todos.", verdad: true, explica: "Las dos lecturas enseñan que el pecado de Adán afectó a todos, aunque lo explican de maneras algo distintas.", apoyo: "Las dos lecturas enseñan que el pecado de Adán afectó a todos" },
            ],
          },
          {
            consigna: "Sobre los frutos de la justificación y Romanos 5:12: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los justificados por la fe tienen paz para con Dios.", verdad: true, explica: "El capítulo 5 muestra los frutos: «tenemos paz para con Dios».", apoyo: "El capítulo 5 muestra los frutos: «tenemos paz para con Dios»", ref: "Romanos 5:1" },
              { texto: "Según Romanos 5, la tribulación le quita la paciencia al creyente.", verdad: false, explica: "Aun en las pruebas sabemos que «la tribulación produce paciencia».", apoyo: "y aun en las pruebas sabemos que «la tribulación produce paciencia»", ref: "Romanos 5:3" },
              { texto: "Agustín leía en la traducción latina de su tiempo que todos pecaron en Adán.", verdad: true, explica: "Así lo cuenta la lección; hoy la mayoría traduce, como la RV1960, «por cuanto todos pecaron».", apoyo: "Agustín leía en la traducción latina de su tiempo una frase que decía que todos pecaron en Adán" },
              { texto: "Romanos 5:12 muestra que a la exégesis no le hace falta cuidar las palabras.", verdad: false, explica: "Aquí se ve por qué la exégesis cuida las palabras: una traducción puede cambiar cómo se explica un texto.", apoyo: "Aquí se ve por qué la exégesis cuida las palabras" },
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
            consigna: "¿Qué frutos trae la justificación en Romanos 5? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "just", texto: "Los justificados por la fe", x: 50, y: 10 },
              { id: "paz", texto: "Paz para con Dios", x: 18, y: 45 },
              { id: "trib", texto: "La tribulación", x: 82, y: 45 },
              { id: "pac", texto: "La paciencia", x: 82, y: 88 },
              { id: "amor", texto: "El amor de Dios", x: 18, y: 88 },
            ],
            enlaces: [
              { de: "just", a: "paz", relacion: "tienen" },
              { de: "trib", a: "pac", relacion: "produce" },
              { de: "amor", a: "just", relacion: "es la base de" },
            ],
            distractores: ["quita", "reemplaza a"],
            apoyo: "La justificación trae paz, esperanza y el amor de Dios",
            ref: "Romanos 5:1-5",
            explica: "Los justificados tienen «paz para con Dios»; aun en las pruebas, «la tribulación produce paciencia»; y la base de todo es el amor de Dios: «siendo aún pecadores, Cristo murió por nosotros».",
          },
          {
            consigna: "¿Qué trae la justificación, y cuál es su base? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "just", texto: "La justificación por la fe", x: 50, y: 12 },
              { id: "paz", texto: "La paz para con Dios", x: 15, y: 50 },
              { id: "gracia", texto: "La entrada a la gracia", x: 50, y: 55 },
              { id: "esp", texto: "La esperanza", x: 85, y: 50 },
              { id: "amor", texto: "El amor de Dios", x: 50, y: 92 },
            ],
            enlaces: [
              { de: "just", a: "paz", relacion: "trae" },
              { de: "just", a: "gracia", relacion: "trae" },
              { de: "just", a: "esp", relacion: "trae" },
              { de: "amor", a: "just", relacion: "es la base de" },
            ],
            distractores: ["impide", "quita"],
            apoyo: "La base es el amor de Dios",
            ref: "Romanos 5:1-8",
            explica: "El capítulo 5 muestra los frutos: paz para con Dios, entrada a la gracia y esperanza. La base es el amor de Dios: «siendo aún pecadores, Cristo murió por nosotros».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "¿Cómo explicarías la palabra propiciación a un nuevo creyente, con tus propias palabras?",
            ref: "Romanos 3:25",
            clave: {
              id: "pr-n5-exegesis-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo explicarías la palabra propiciación a un nuevo creyente, con tus propias palabras?",
              ideas: [
                { id: "sacrificio", peso: 50, texto: "La propiciación es el sacrificio que satisface la justicia de Dios y quita su ira.", formas: ["sacrificio", "satisf* justicia", "satisf* (a|al) dios", "quita* (su|la) ira", "quit* la ira", "calma* (su|la) ira", "ira de dios"] },
                { id: "cristo", peso: 50, texto: "Dios puso a Cristo como propiciación: no pasó por alto el pecado, sino que lo castigó en Cristo.", formas: ["castig* en (cristo|el|jesus)", "castig* (a|en) (cristo|jesus)", "pago en (cristo|el|jesus)", "pago en la cruz", "(cristo|jesus) (pago|murio|cargo|sufrio)", "en su sangre", "la cruz", "no paso por alto", "puso a (cristo|jesus)"] },
              ],
              errores: [
                { id: "paso-por-alto", texto: "Dios no pasó por alto el pecado: lo castigó en Cristo.", formas: ["dios (paso|pasa) por alto", "(paso|pasa) por alto (el|nuestro|tu|mi|los|nuestros) pecado*"], anula: "cristo" },
              ],
              modelo: "Le diría que la propiciación es el sacrificio que satisface la justicia de Dios y quita su ira. Dios no pasó por alto nuestro pecado: puso a Cristo como propiciación y lo castigó en él, en la cruz.",
            },
          },
          {
            apoyo: "Así Dios es a la vez «el justo, y el que justifica»: no pasa por alto el pecado, sino que lo castiga en Cristo",
            ref: "Romanos 3:21-26",
            clave: {
              id: "pr-n5-exegesis-3-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo puede Dios ser a la vez el justo y el que justifica, según Romanos 3:21-26?",
              ideas: [
                { id: "castiga", peso: 50, texto: "Porque no pasa por alto el pecado, sino que lo castiga en Cristo, a quien puso como propiciación.", formas: ["castig* en (cristo|el|jesus)", "castig* (el|nuestro|su) pecado", "castig* (a|en) (cristo|jesus)", "no pasa por alto", "no paso por alto", "propiciacion", "(cristo|jesus) (pago|murio|cargo|sufrio)", "pago en (cristo|el|jesus)", "pago en la cruz", "su sangre", "la cruz"] },
                { id: "gracia", peso: 50, texto: "Y así justifica gratuitamente por su gracia, mediante la redención, al que tiene fe.", formas: ["gratuitamente", "gratis", "por su gracia", "por gracia", "redencion", "por medio de la fe", "por la fe", "por fe", "al que cree", "a los que creen"] },
              ],
              errores: [
                { id: "paso-por-alto", texto: "Dios no pasa por alto el pecado: lo castiga en Cristo.", formas: ["dios (paso|pasa) por alto", "(paso|pasa) por alto (el|nuestro|tu|mi|los|nuestros) pecado*"], anula: "castiga" },
              ],
              modelo: "Porque Dios no pasa por alto el pecado, sino que lo castiga en Cristo, a quien puso como propiciación. Así justifica gratuitamente por su gracia, mediante la redención, al que cree.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La vida nueva (Romanos 6 a 8)
    // (Romanos 7: se pregunta qué ve cada lectura, quiénes la siguen y en qué coinciden, nunca cuál tiene razón)
    "n5-exegesis-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pregunta se hace Pablo, y responde con tres capítulos?", reverso: "Si la gracia es gratis, ¿puedo seguir pecando?", apoyo: "Si la gracia es gratis, ¿puedo seguir pecando?" },
              { frente: "¿Qué muestra el bautismo, según Romanos 6?", reverso: "Que el creyente está unido a Cristo en su muerte y en su resurrección.", apoyo: "El bautismo muestra que el creyente está unido a Cristo en su muerte y en su resurrección" },
              { frente: "¿En qué persona habla Pablo en Romanos 7?", reverso: "En primera persona: «no hago el bien que quiero».", apoyo: "En Romanos 7 Pablo habla en primera persona" },
              { frente: "¿Con qué empieza Romanos 8?", reverso: "Con «ninguna condenación».", apoyo: "Empieza con «ninguna condenación»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo resume Pablo los dos caminos en Romanos 6:23?", reverso: "«la paga del pecado es muerte, mas la dádiva de Dios es vida eterna»", apoyo: "Y resume los dos caminos: «la paga del pecado es muerte, mas la dádiva de Dios es vida eterna»" },
              { frente: "¿De cuántas maneras leen los evangélicos Romanos 7?", reverso: "De dos maneras.", apoyo: "Los evangélicos lo leen de dos maneras" },
              { frente: "¿Qué capítulo de la carta nombra más al Espíritu?", reverso: "Romanos 8.", apoyo: "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta" },
              { frente: "¿Qué nos hace clamar el Espíritu?", reverso: "«¡Abba, Padre!»", apoyo: "nos hace clamar «¡Abba, Padre!»" },
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
            consigna: "Completa lo que enseña Romanos 6:1-4 sobre la unión con Cristo.",
            texto: "El [[bautismo]] muestra que el creyente está [[unido]] a Cristo en su muerte y en su resurrección, para que ande en vida [[nueva]].",
            distractores: ["ayuno", "ajeno", "vieja"],
            errores: {
              ayuno: "Lo que muestra la unión con Cristo en su muerte y en su resurrección es el bautismo.",
              ajeno: "El creyente está unido a Cristo en su muerte y en su resurrección.",
              vieja: "Es para que «andemos en vida nueva».",
            },
            apoyo: "El bautismo muestra que el creyente está unido a Cristo en su muerte y en su resurrección, para que «andemos en vida nueva»",
            ref: "Romanos 6:1-4",
            explica: "«¿Perseveraremos en el pecado para que la gracia abunde? En ninguna manera». El bautismo muestra que el creyente está unido a Cristo en su muerte y en su resurrección, para que «andemos en vida nueva».",
          },
          {
            consigna: "Completa lo que enseña Romanos 6:11 al creyente.",
            texto: "En Romanos 6, la gracia no da permiso para pecar: el creyente se considera [[muerto]] al pecado y [[vivo]] para Dios.",
            distractores: ["atado", "ajeno", "esclavo"],
            errores: {
              atado: "El creyente se considera muerto al pecado: está unido a Cristo en su muerte.",
              ajeno: "El creyente se considera vivo para Dios en Cristo Jesús.",
              esclavo: "El creyente se considera muerto al pecado, pero vivo para Dios.",
            },
            apoyo: "En Romanos 6, la gracia no da permiso para pecar: el creyente está unido a Cristo en su muerte y su resurrección, y se considera muerto al pecado y vivo para Dios",
            ref: "Romanos 6:11",
            explica: "Pablo manda: «consideraos muertos al pecado, pero vivos para Dios en Cristo Jesús». La gracia no es permiso para pecar, sino poder para vivir.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué lectura de Romanos 7 es, o es algo en que coinciden las dos? Lleva cada frase a su grupo.",
            grupos: ["La lucha del creyente", "La persona bajo la ley", "En eso coinciden las dos"],
            frases: [
              { texto: "Así lo vieron Agustín, en sus últimos años, Lutero y Calvino", grupo: 0 },
              { texto: "Ve al creyente que todavía lucha con la carne", grupo: 0 },
              { texto: "Así lo leen muchos padres griegos de la iglesia y Juan Wesley", grupo: 1 },
              { texto: "Así lo lee buena parte de los intérpretes pentecostales", grupo: 1 },
              { texto: "Ve a quien clama sin la fuerza del Espíritu", grupo: 1 },
              { texto: "Con la sola ley, la carne no puede vencer al pecado", grupo: 2 },
              { texto: "La victoria viene por Cristo y por el Espíritu", grupo: 2 },
            ],
            apoyo: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu",
            ref: "Romanos 7:24-25",
            explica: "Agustín, en sus últimos años, Lutero y Calvino vieron al creyente que todavía lucha con la carne; muchos padres griegos, Juan Wesley y buena parte de los pentecostales ven a la persona bajo la ley. Las dos coinciden en que la victoria viene por Cristo y por el Espíritu.",
          },
          {
            consigna: "¿Cómo lee Romanos 7 cada uno, según la lección? Lleva cada uno a su grupo.",
            grupos: ["Como la lucha del creyente", "Como la persona bajo la ley"],
            frases: [
              { texto: "Agustín, en sus últimos años", grupo: 0 },
              { texto: "Lutero", grupo: 0 },
              { texto: "Calvino", grupo: 0 },
              { texto: "Muchos padres griegos de la iglesia", grupo: 1 },
              { texto: "Juan Wesley", grupo: 1 },
              { texto: "Buena parte de los intérpretes pentecostales", grupo: 1 },
            ],
            apoyo: "Agustín, en sus últimos años, Lutero y Calvino vieron aquí al creyente que todavía lucha con la carne",
            ref: "Romanos 7:18-19",
            explica: "Agustín, en sus últimos años, Lutero y Calvino vieron en Romanos 7 al creyente que todavía lucha con la carne; muchos padres griegos de la iglesia, Juan Wesley y buena parte de los intérpretes pentecostales ven a la persona bajo la ley, sin la fuerza del Espíritu.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Las dos lecturas coinciden en lo principal",
            ref: "Romanos 7:18-25",
            titulo: "Dos líderes y un mismo capítulo",
            relato: [
              "Diriges la reunión de los líderes de célula. Hoy leen Romanos 7, donde Pablo dice: «no hago el bien que quiero, sino el mal que no quiero».",
              "Marta dice que ahí Pablo habla del creyente que todavía lucha con la carne. Raúl responde que habla de la persona bajo la ley, sin la fuerza del Espíritu.",
              "Los dos te miran para que digas quién tiene la razón.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Quiénes leyeron Romanos 7 como lo lee Marta?",
                opciones: [
                  { texto: "Agustín, en sus últimos años, Lutero y Calvino.", bien: true, explica: "Vieron aquí al creyente que todavía lucha con la carne." },
                  { texto: "Muchos padres griegos de la iglesia y Juan Wesley.", explica: "Ellos ven más bien a la persona bajo la ley, sin la fuerza del Espíritu." },
                  { texto: "Nadie en toda la historia de la iglesia lo leyó así.", explica: "Así lo vieron Agustín, en sus últimos años, Lutero y Calvino." },
                  { texto: "Solo los intérpretes pentecostales de nuestros días.", explica: "Buena parte de los intérpretes pentecostales ve más bien a la persona bajo la ley." },
                ],
                apoyo: "Agustín, en sus últimos años, Lutero y Calvino vieron aquí al creyente que todavía lucha con la carne",
                explica: "Agustín, en sus últimos años, Lutero y Calvino vieron en Romanos 7 al creyente que todavía lucha con la carne.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y quiénes lo leen como Raúl?",
                opciones: [
                  { texto: "Muchos padres griegos, Juan Wesley y buena parte de los pentecostales.", bien: true, explica: "Ven más bien a la persona bajo la ley, sin la fuerza del Espíritu, que encuentra la respuesta en Cristo." },
                  { texto: "Lutero y Calvino, que vieron al creyente que todavía lucha con la carne.", explica: "Lutero y Calvino vieron al creyente que todavía lucha: lo leen como Marta." },
                  { texto: "Ninguna tradición evangélica: es una lectura que nadie sostiene hoy.", explica: "Los evangélicos lo leen de dos maneras, y esta es una de ellas." },
                  { texto: "Los mismos que lo leen como Marta: Agustín, Lutero y también Calvino.", explica: "Agustín, en sus últimos años, Lutero y Calvino vieron al creyente que todavía lucha con la carne." },
                ],
                apoyo: "Muchos padres griegos de la iglesia, Juan Wesley y buena parte de los intérpretes pentecostales ven más bien a la persona bajo la ley, sin la fuerza del Espíritu",
                explica: "Muchos padres griegos de la iglesia, Juan Wesley y buena parte de los intérpretes pentecostales ven a la persona bajo la ley, que clama «¿quién me librará de este cuerpo de muerte?» y encuentra la respuesta en Cristo.",
              },
              {
                tipo: "situacion",
                pregunta: "Te piden que digas quién tiene la razón. ¿Qué les respondes?",
                opciones: [
                  { texto: "Que las dos lecturas coinciden en lo principal: la victoria viene por Cristo.", bien: true, explica: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu." },
                  { texto: "Que Marta tiene la razón, porque así lo vieron Agustín, Lutero y también Calvino.", explica: "Los evangélicos lo leen de dos maneras, y la lección presenta las dos con respeto." },
                  { texto: "Que Raúl tiene la razón, porque así lo lee buena parte de los pentecostales de hoy.", explica: "La lección presenta las dos lecturas con respeto y muestra en qué coinciden." },
                  { texto: "Que ninguno de los dos, porque Romanos 7 no se puede entender de ninguna manera.", explica: "Las dos lecturas coinciden en lo principal: la victoria viene por Cristo y por el Espíritu." },
                ],
                apoyo: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu",
                explica: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu: «Gracias doy a Dios, por Jesucristo Señor nuestro».",
              },
              {
                tipo: "explica",
                apoyo: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu",
                ref: "Romanos 7:24-25",
                clave: {
                  id: "pr-n5-exegesis-4-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras en qué coinciden las dos lecturas, para cerrar la conversación con Marta y Raúl.",
                  ideas: [
                    { id: "ley", peso: 50, texto: "Con la sola ley, la carne no puede vencer al pecado.", formas: ["sola ley", "solo la ley", "la ley sola", "solo con la ley", "carne no puede", "no puede* vencer", "ley no (puede|basta|alcanza|salva)", "sin el espiritu", "sin la fuerza"] },
                    { id: "victoria", peso: 50, texto: "La victoria viene por Cristo y por el Espíritu.", formas: ["victoria", "vence* (cristo|espiritu|jesus)", "por (cristo|jesucristo|jesus)", "por el espiritu", "gracias doy a dios", "nos libr*", "(cristo|jesus) libr*"] },
                  ],
                  errores: [
                    { id: "lado", texto: "La lección presenta las dos lecturas con respeto: el líder muestra en qué coinciden.", formas: ["(marta|raul) tiene* razon", "(marta|raul) (esta|estan) en lo cierto", "(marta|raul) (esta|estan) equivocad*"], anula: "victoria" },
                  ],
                  modelo: "Les diría que las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu.",
                },
              },
            ],
          },
          {
            apoyo: "Los evangélicos lo leen de dos maneras",
            ref: "Romanos 7:18-25",
            titulo: "Un sermón sobre Romanos 7",
            relato: [
              "Eres pastor asistente. Un joven predicador de la iglesia va a predicar Romanos 7 el domingo y te pide ayuda.",
              "Te dice: Voy a decir que el que lee este capítulo de otra manera no entiende la Biblia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le explicas primero sobre Romanos 7?",
                opciones: [
                  { texto: "Que los evangélicos lo leen de dos maneras, y que se presentan con respeto.", bien: true, explica: "Los evangélicos lo leen de dos maneras: como la lucha del creyente o como la persona bajo la ley." },
                  { texto: "Que solo hay una lectura posible del capítulo, y que la otra no es evangélica.", explica: "Los evangélicos lo leen de dos maneras: las dos son lecturas evangélicas." },
                  { texto: "Que Romanos 7 no se debe predicar, porque nadie puede saber de quién habla Pablo.", explica: "Se puede predicar: las dos lecturas coinciden en lo principal." },
                  { texto: "Que el capítulo no habla de ninguna persona: Pablo escribe solo de la ley de Moisés.", explica: "En Romanos 7 Pablo habla en primera persona: «no hago el bien que quiero, sino el mal que no quiero»." },
                ],
                apoyo: "Los evangélicos lo leen de dos maneras",
                explica: "En Romanos 7 Pablo habla en primera persona, y los evangélicos lo leen de dos maneras: como el creyente que todavía lucha con la carne o como la persona bajo la ley.",
              },
              {
                tipo: "situacion",
                pregunta: "El joven pregunta: ¿Qué ven en Romanos 7 los que lo leen como la persona bajo la ley?",
                opciones: [
                  { texto: "A quien, sin la fuerza del Espíritu, clama y encuentra la respuesta en Cristo.", bien: true, explica: "Ven a la persona bajo la ley, sin la fuerza del Espíritu, que clama «¿quién me librará de este cuerpo de muerte?» y encuentra la respuesta en Cristo y en Romanos 8." },
                  { texto: "Al creyente maduro que ya no tiene ninguna lucha con la carne ni con el pecado.", explica: "Ven a la persona bajo la ley, sin la fuerza del Espíritu." },
                  { texto: "A una persona que encontró la victoria cumpliendo la ley con su propio esfuerzo.", explica: "Con la sola ley, la carne no puede vencer al pecado: la victoria viene por Cristo." },
                  { texto: "A alguien que no tiene salida y que nunca encuentra respuesta en ninguna parte.", explica: "La persona que clama encuentra la respuesta en Cristo y en Romanos 8." },
                ],
                apoyo: "Muchos padres griegos de la iglesia, Juan Wesley y buena parte de los intérpretes pentecostales ven más bien a la persona bajo la ley, sin la fuerza del Espíritu",
                explica: "Ven a la persona bajo la ley, sin la fuerza del Espíritu, que clama «¿quién me librará de este cuerpo de muerte?» y encuentra la respuesta en Cristo y en Romanos 8.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué mensaje central puede predicar, sea cual sea la lectura que siga?",
                opciones: [
                  { texto: "Que la victoria sobre el pecado viene por Cristo y por el Espíritu.", bien: true, explica: "Es lo que las dos lecturas tienen en común: la victoria viene por Cristo y por el Espíritu." },
                  { texto: "Que con la sola ley, si se esfuerza, la carne puede vencer al pecado.", explica: "Las dos lecturas coinciden en que, con la sola ley, la carne no puede vencer al pecado." },
                  { texto: "Que el creyente debe resignarse a perder siempre la lucha contra el pecado.", explica: "La victoria viene por Cristo y por el Espíritu: «Gracias doy a Dios, por Jesucristo Señor nuestro»." },
                  { texto: "Que lo único importante es saber cuál de las dos lecturas tiene la razón.", explica: "Lo principal es lo que las dos comparten: la victoria viene por Cristo y por el Espíritu." },
                ],
                apoyo: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu",
                explica: "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu.",
              },
              {
                tipo: "explica",
                apoyo: "Romanos 7 se lee de dos maneras, como la lucha del creyente o como la persona bajo la ley, y las dos coinciden en que la victoria viene por Cristo",
                ref: "Romanos 7:24-25",
                clave: {
                  id: "pr-n5-exegesis-4-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras qué le aconsejarías al joven predicador sobre cómo presentar Romanos 7.",
                  ideas: [
                    { id: "dos", peso: 50, texto: "Que presente con respeto las dos lecturas: la del creyente que todavía lucha con la carne y la de la persona bajo la ley.", formas: ["dos (lecturas|maneras|formas|interpretaciones)", "las dos", "ambas", "con respeto", "respet*", "lucha con la carne", "lucha del creyente", "bajo la ley"] },
                    { id: "cristo", peso: 50, texto: "Que predique lo que las dos comparten: la victoria viene por Cristo y por el Espíritu.", formas: ["victoria", "vence* (cristo|espiritu|jesus)", "por (cristo|jesucristo|jesus)", "por el espiritu", "gracias doy a dios", "nos libr*", "(cristo|jesus) libr*"] },
                  ],
                  modelo: "Le aconsejaría que presente con respeto las dos lecturas: la del creyente que todavía lucha con la carne y la de la persona bajo la ley. Y que predique lo que comparten: la victoria viene por Cristo y por el Espíritu.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Romanos 8:2, ¿de qué ley nos ha librado la ley del Espíritu de vida? Toca las palabras que lo dicen.",
            texto: "la ley del Espíritu de vida en Cristo Jesús me ha librado de la [[ley del pecado y de la muerte]]",
            apoyo: "Empieza con «ninguna condenación», porque «la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte»",
            ref: "Romanos 8:1-2",
            explica: "Romanos 8 empieza con «ninguna condenación», porque «la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte».",
          },
          {
            consigna: "Según Romanos 8:26, ¿cómo intercede el Espíritu por nosotros? Toca las palabras que lo dicen.",
            texto: "intercede por nosotros [[con gemidos indecibles]]",
            apoyo: "El Espíritu nos guía como hijos, nos hace clamar «¡Abba, Padre!», nos ayuda «en nuestra debilidad» e «intercede por nosotros con gemidos indecibles»",
            ref: "Romanos 8:26",
            explica: "El Espíritu nos ayuda «en nuestra debilidad» e «intercede por nosotros con gemidos indecibles».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Romanos 8 tiene un error. Tócala.",
            frases: [
              "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta.",
              "Romanos 8 empieza con ninguna condenación.",
              "El Espíritu nos guía como esclavos que trabajan por miedo.",
              "El Espíritu nos ayuda en nuestra debilidad.",
            ],
            malo: 2,
            correccion: "El Espíritu nos guía como hijos y nos hace clamar: ¡Abba, Padre!",
            apoyo: "El Espíritu nos guía como hijos",
            ref: "Romanos 8:14-16",
            explica: "Romanos 8 presenta la vida en el Espíritu: ninguna condenación, la adopción y la ayuda del Espíritu en la debilidad. El Espíritu nos guía como hijos y nos hace clamar «¡Abba, Padre!».",
          },
          {
            consigna: "Una de estas frases sobre la vida en el Espíritu tiene un error. Tócala.",
            frases: [
              "El Espíritu intercede por nosotros con gemidos indecibles.",
              "Romanos 8 casi no menciona al Espíritu Santo.",
              "El Espíritu nos hace clamar: ¡Abba, Padre!",
              "Romanos 8 presenta la vida en el Espíritu.",
            ],
            malo: 1,
            correccion: "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta.",
            apoyo: "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta",
            ref: "Romanos 8:26-28",
            explica: "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta: nos guía como hijos, nos ayuda en nuestra debilidad e intercede por nosotros.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En Romanos 6, la gracia no da permiso para pecar",
            ref: "Romanos 6:1-4",
            clave: {
              id: "pr-n5-exegesis-4-a7-1",
              tipo: "corta",
              pregunta: "Si la gracia es gratis, ¿podemos seguir pecando? ¿Qué responde Pablo en Romanos 6?",
              ideas: [
                { id: "unido", peso: 50, texto: "Que en ninguna manera: el creyente está unido a Cristo en su muerte y en su resurrección, como muestra el bautismo.", formas: ["unid* (a|con) (cristo|jesus|el)", "bautismo", "bautiz*", "muri* con (cristo|jesus|el)", "mori* con (cristo|jesus|el)", "resucit* con (cristo|jesus|el)", "muerte (y|en) su resurreccion", "su resurreccion"] },
                { id: "vivo", peso: 50, texto: "Por eso se considera muerto al pecado y vivo para Dios, y anda en vida nueva: la gracia es poder para vivir.", formas: ["muerto* al pecado", "vivo* para dios", "vida nueva", "nueva vida", "poder para vivir", "no es permiso", "no (da|es) (permiso|licencia)"] },
              ],
              errores: [
                { id: "permiso", texto: "La gracia no es permiso para pecar, sino poder para vivir.", formas: ["(es|da) (permiso|licencia) para pecar", "(si|claro) podemos seguir pecando"], anula: "vivo" },
              ],
              modelo: "Responde que en ninguna manera: el creyente está unido a Cristo en su muerte y en su resurrección, como muestra el bautismo. Por eso se considera muerto al pecado y vivo para Dios, y anda en vida nueva.",
            },
          },
          {
            apoyo: "La gracia no es permiso para pecar, sino poder para vivir",
            ref: "Romanos 6:23",
            clave: {
              id: "pr-n5-exegesis-4-a7-2",
              tipo: "corta",
              pregunta: "¿Cuáles son los dos caminos de Romanos 6:23, y qué le da la gracia al creyente según Romanos 6?",
              ideas: [
                { id: "caminos", peso: 50, texto: "La paga del pecado es muerte, mas la dádiva de Dios es vida eterna.", formas: ["paga del pecado", "pecado (es|trae|da) muerte", "dadiva", "regalo de dios", "vida eterna"] },
                { id: "poder", peso: 50, texto: "La gracia no es permiso para pecar, sino poder para vivir: el creyente está unido a Cristo y anda en vida nueva.", formas: ["poder para vivir", "poder (para|de) (vivir|obedecer|vencer)", "unid* (a|con) (cristo|jesus|el)", "vida nueva", "nueva vida", "muerto* al pecado", "vivo* para dios"] },
              ],
              errores: [
                { id: "permiso", texto: "La gracia no es permiso para pecar, sino poder para vivir.", formas: ["(es|da) (permiso|licencia) para pecar"], anula: "poder" },
              ],
              modelo: "Los dos caminos son estos: la paga del pecado es muerte, mas la dádiva de Dios es vida eterna. Y la gracia no es permiso para pecar, sino poder para vivir: el creyente está unido a Cristo y anda en vida nueva.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Israel y el plan de Dios (Romanos 9 a 11)
    // (la elección y el futuro de Israel: se pregunta qué dice cada lectura, con su atribución, y lo que todos comparten)
    "n5-exegesis-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pregunta responden Romanos 9 a 11?", reverso: "Si falló la palabra de Dios, ya que Israel rechazó a su Mesías.", apoyo: "Si Israel, el pueblo de las promesas, rechazó a su Mesías, ¿falló la palabra de Dios?" },
              { frente: "¿Entre qué dos Israel distingue Pablo?", reverso: "Entre el Israel según la carne y el Israel de la promesa.", apoyo: "Pablo distingue entre el Israel según la carne y el Israel de la promesa" },
              { frente: "¿Qué subraya Romanos 10?", reverso: "La fe y la misión.", apoyo: "Romanos 10 subraya la fe y la misión" },
              { frente: "¿Con qué termina Pablo Romanos 9 a 11?", reverso: "Con adoración, y no con una fórmula.", apoyo: "Pablo no termina con una fórmula, sino con adoración" },
            ],
          },
          {
            tarjetas: [
              { frente: "En la lectura de muchos arminianos, ¿qué representan Jacob y Esaú?", reverso: "Dos pueblos.", apoyo: "como Jacob y Esaú, que representan dos pueblos" },
              { frente: "¿Qué afirman las dos lecturas de Romanos 9?", reverso: "Que Dios es justo: en ninguna manera hay injusticia en él.", apoyo: "Las dos lecturas afirman que Dios es justo" },
              { frente: "¿Por qué hacen falta mensajeros, según Romanos 10?", reverso: "«¿Y cómo oirán sin haber quien les predique?»", apoyo: "Por eso hacen falta mensajeros: «¿Y cómo oirán sin haber quien les predique?»" },
              { frente: "¿Hasta cuándo dura el endurecimiento en parte de Israel?", reverso: "Hasta que haya entrado la plenitud de los gentiles.", apoyo: "hasta que haya entrado la plenitud de los gentiles" },
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
            consigna: "Completa cómo responde Pablo la pregunta de Romanos 9 a 11.",
            texto: "Para responder si [[falló]] la palabra de Dios, Pablo distingue entre el Israel según la carne y el Israel de la [[promesa]].",
            distractores: ["existe", "muerte", "venganza"],
            errores: {
              existe: "La pregunta es si falló la palabra de Dios, porque Israel rechazó a su Mesías.",
              muerte: "Pablo distingue entre el Israel según la carne y el Israel de la promesa.",
              venganza: "El otro Israel es el de la promesa: no todos los que descienden de Israel son israelitas.",
            },
            apoyo: "Pablo distingue entre el Israel según la carne y el Israel de la promesa",
            ref: "Romanos 9:6",
            explica: "La tesis de la sección es clara: «No que la palabra de Dios haya fallado». Pablo distingue entre el Israel según la carne y el Israel de la promesa.",
          },
          {
            consigna: "Completa la pregunta que responden Romanos 9 a 11.",
            texto: "Si Israel, el pueblo de las promesas, [[rechazó]] a su [[Mesías]], ¿falló la palabra de Dios?",
            distractores: ["recibió", "templo"],
            errores: {
              "recibió": "Israel, el pueblo de las promesas, rechazó a su Mesías: de ahí nace la pregunta.",
              templo: "Lo que Israel rechazó fue a su Mesías.",
            },
            apoyo: "Si Israel, el pueblo de las promesas, rechazó a su Mesías, ¿falló la palabra de Dios?",
            ref: "Romanos 9:6",
            explica: "Si Israel, el pueblo de las promesas, rechazó a su Mesías, ¿falló la palabra de Dios? Romanos 9 a 11 responde que no.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "La tesis de Romanos 9 a 11 dice qué no le pasó a la palabra de Dios. Toca las palabras que lo dicen.",
            texto: "No que la palabra de Dios [[haya fallado]]",
            apoyo: "La tesis de la sección es clara: «No que la palabra de Dios haya fallado»",
            ref: "Romanos 9:6",
            explica: "La tesis de la sección es clara: «No que la palabra de Dios haya fallado». Romanos 9 a 11 responde esa pregunta.",
          },
          {
            consigna: "Según Romanos 9:6, ¿de quiénes dice Pablo que no todos son israelitas? Toca las palabras que lo dicen.",
            texto: "no todos [[los que descienden de Israel]] son israelitas",
            apoyo: "Pablo distingue entre el Israel según la carne y el Israel de la promesa: «no todos los que descienden de Israel son israelitas»",
            ref: "Romanos 9:6",
            explica: "Pablo distingue entre el Israel según la carne y el Israel de la promesa: «no todos los que descienden de Israel son israelitas».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Quién lee así Romanos 9, según la lección: los calvinistas, muchos arminianos o los dos? Lleva cada frase a su grupo.",
            grupos: ["Los calvinistas", "Muchos arminianos", "Los dos"],
            frases: [
              { texto: "La elección de personas para salvación", grupo: 0 },
              { texto: "Dios elige a personas para que sean salvas", grupo: 0 },
              { texto: "La elección de pueblos y de personas para un papel en la historia", grupo: 1 },
              { texto: "Jacob y Esaú representan dos pueblos", grupo: 1 },
              { texto: "Se apoyan en Génesis 25:23 y Malaquías 1:2-3", grupo: 1 },
              { texto: "Afirman que Dios es justo", grupo: 2 },
              { texto: "Han estudiado Romanos 9 con seriedad durante siglos", grupo: 2 },
            ],
            apoyo: "Los calvinistas lo leen como la elección de personas para salvación",
            ref: "Romanos 9:14-16",
            explica: "Los calvinistas leen Romanos 9 como la elección de personas para salvación; muchos arminianos, como la elección de pueblos y de personas para un papel en la historia de la salvación. Los dos han estudiado el texto con seriedad y afirman que Dios es justo.",
          },
          {
            consigna: "¿Es algo en que las lecturas de Romanos 9 difieren, o lo comparten todos? Lleva cada frase a su grupo.",
            grupos: ["Lo dice solo una lectura", "Lo comparten todos"],
            frases: [
              { texto: "Romanos 9 habla de la elección de personas para salvación", grupo: 0 },
              { texto: "Romanos 9 habla de pueblos con un papel en la historia de la salvación", grupo: 0 },
              { texto: "Jacob y Esaú representan dos pueblos", grupo: 0 },
              { texto: "La salvación es por gracia", grupo: 1 },
              { texto: "El que invoca al Señor será salvo", grupo: 1 },
              { texto: "La iglesia tiene que predicar", grupo: 1 },
              { texto: "Dios es justo", grupo: 1 },
            ],
            apoyo: "El líder enseña con firmeza lo que todos comparten: la salvación es por gracia, el que invoca al Señor será salvo y la iglesia tiene que predicar",
            ref: "Romanos 10:13",
            explica: "Las lecturas difieren en cómo entienden la elección en Romanos 9. Todos comparten que la salvación es por gracia, que el que invoca al Señor será salvo, que la iglesia tiene que predicar y que Dios es justo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos",
            ref: "Romanos 9:14-16",
            situacion: "Eres maestro de la clase de Romanos en la academia. Al leer Romanos 9:14-16, un alumno dice con fuerza: Aquí está claro que Dios eligió a unas personas para salvación, y el que no lo ve así no cree la Biblia.",
            escenas: [
              {
                id: "e1",
                narra: "Una alumna se molesta y responde que Jacob y Esaú representan dos pueblos.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Explicas que Romanos 9 se lee de dos maneras, y presentas las dos.", valor: 2, explica: "Los calvinistas lo leen como la elección de personas para salvación; muchos arminianos, como la elección de pueblos y de personas para un papel en la historia de la salvación.", siguiente: "e2" },
                  { texto: "Pides calma y pasas enseguida a Romanos 10, sin hablar de las dos lecturas.", valor: 1, explica: "Calmar es bueno, pero conviene presentar con respeto las dos lecturas, que se han estudiado con seriedad durante siglos.", siguiente: "e2" },
                  { texto: "Le das la razón al alumno: la otra manera de leer el texto no cree la Biblia.", valor: 0, explica: "Calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "La alumna se queda callada y no vuelve a participar en la clase.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Corriges lo que dijiste: las dos lecturas estudian el texto con seriedad.", valor: 2, explica: "Así lo dice la lección: calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos.", siguiente: "e2" },
                  { texto: "Sigues la clase como si nada: ella sabrá si quiere volver la semana que viene.", valor: 0, explica: "El líder trata con respeto a quienes leen Romanos 9 de otra manera.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Otro alumno pregunta: ¿Y en qué coinciden las dos lecturas?",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Que las dos afirman que Dios es justo: en ninguna manera hay injusticia en él.", valor: 2, explica: "Las dos lecturas afirman que Dios es justo: «¿Que hay injusticia en Dios? En ninguna manera»." },
                  { texto: "Que las dos ven que Romanos 9 es un texto central del debate sobre la elección.", valor: 1, explica: "Es cierto, pero lo principal en que coinciden es que Dios es justo." },
                  { texto: "Que no coinciden en nada, porque cada una lee el texto con su propia Biblia.", valor: 0, explica: "Las dos lecturas afirman que Dios es justo, y todos comparten que la salvación es por gracia." },
                ],
              },
              {
                id: "e3",
                narra: "Al final te preguntan qué enseña el ministerio sobre esa pregunta.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que la declaración de fe no entra en esa pregunta, y les enseñas lo que todos comparten.", valor: 2, explica: "La declaración de fe del ministerio no entra en esa pregunta, y el líder enseña con firmeza lo que todos comparten." },
                  { texto: "Que se lo pregunten al pastor, y que mientras tanto sigan leyendo con cuidado el texto.", valor: 1, explica: "Consultar al pastor no está mal, pero la lección responde: la declaración de fe del ministerio no entra en esa pregunta." },
                  { texto: "Que el ministerio enseña la lectura calvinista y rechaza a los que leen el texto de otra forma.", valor: 0, explica: "La declaración de fe del ministerio no entra en esa pregunta." },
                ],
              },
            ],
          },
          {
            apoyo: "El líder enseña con firmeza lo que todos comparten",
            ref: "Romanos 10:13-15",
            situacion: "Eres pastor. Un hermano nuevo, que viene de una iglesia de línea calvinista, quiere servir en el equipo de maestros, y otro maestro te pide que no lo aceptes por su manera de leer Romanos 9.",
            escenas: [
              {
                id: "e1",
                narra: "El maestro insiste: Si no lee Romanos 9 como nosotros, no puede enseñar.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que calvinistas y arminianos han estudiado Romanos 9 con seriedad.", valor: 2, explica: "Calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos, y la declaración de fe del ministerio no entra en esa pregunta." },
                  { texto: "Que lo pensarás con calma y que le darás una respuesta más adelante.", valor: 1, explica: "Pensarlo con calma no está mal, pero la lección ya da una pauta: la declaración de fe no entra en esa pregunta." },
                  { texto: "Que tiene razón: quien lee así Romanos 9 no puede servir en la iglesia.", valor: 0, explica: "Calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos." },
                ],
              },
              {
                id: "e2",
                narra: "Hablas con el hermano nuevo sobre lo que va a enseñar en su clase.",
                pregunta: "¿Qué le pides que enseñe con firmeza?",
                opciones: [
                  { texto: "Lo que todos comparten: la salvación es por gracia, y hay que predicar.", valor: 2, explica: "El líder enseña con firmeza lo que todos comparten: la salvación es por gracia, el que invoca al Señor será salvo y la iglesia tiene que predicar." },
                  { texto: "Que enseñe solo historias del Antiguo Testamento, para evitar cualquier debate.", valor: 1, explica: "Evitar el debate no es malo, pero el líder enseña con firmeza lo que todos comparten." },
                  { texto: "Que enseñe su lectura de la elección como la única que de verdad es bíblica.", valor: 0, explica: "La declaración de fe del ministerio no entra en esa pregunta: se enseña con firmeza lo que todos comparten." },
                ],
              },
              {
                id: "e3",
                narra: "Un alumno le pregunta al hermano qué enseña el ministerio sobre la elección en Romanos 9.",
                pregunta: "¿Qué conviene que responda?",
                opciones: [
                  { texto: "Que la declaración de fe del ministerio no entra en esa pregunta.", valor: 2, explica: "Así lo dice la lección: la declaración de fe del ministerio no entra en esa pregunta." },
                  { texto: "Que eso es mejor preguntárselo al pastor de la iglesia en otro momento.", valor: 1, explica: "No está mal, pero la respuesta es sencilla: la declaración de fe del ministerio no entra en esa pregunta." },
                  { texto: "Que el ministerio ya decidió que la lectura calvinista es la correcta.", valor: 0, explica: "La declaración de fe del ministerio no entra en esa pregunta." },
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
            consigna: "Sobre Romanos 11 y el futuro de Israel: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "En Romanos 11 Pablo anuncia un misterio sobre Israel.", verdad: true, explica: "Pablo anuncia un misterio: Israel tiene un endurecimiento en parte, y luego todo Israel será salvo.", apoyo: "En Romanos 11 Pablo anuncia un misterio" },
              { texto: "Según Romanos 11, el endurecimiento de Israel es total y para siempre.", verdad: false, explica: "Israel tiene un endurecimiento «en parte, hasta que haya entrado la plenitud de los gentiles».", apoyo: "Israel tiene un endurecimiento «en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo»", ref: "Romanos 11:25-26" },
              { texto: "Muchos intérpretes, también entre los pentecostales, esperan una conversión futura del pueblo judío.", verdad: true, explica: "Es una de las dos interpretaciones que presenta la lección; otros entienden todo Israel como el conjunto de los redimidos.", apoyo: "Muchos intérpretes, también entre los pentecostales, esperan una conversión futura del pueblo judío" },
            ],
          },
          {
            consigna: "Sobre las lecturas de «todo Israel» en Romanos 11: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "Algunos intérpretes entienden todo Israel como el conjunto de los redimidos, judíos y gentiles.", verdad: true, explica: "Es la otra interpretación que presenta la lección, junto a la de una conversión futura del pueblo judío.", apoyo: "otros entienden «todo Israel» como el conjunto de los redimidos, judíos y gentiles" },
              { texto: "Según la lección, ningún intérprete espera hoy una conversión futura del pueblo judío.", verdad: false, explica: "Muchos intérpretes, también entre los pentecostales, esperan una conversión futura del pueblo judío.", apoyo: "Muchos intérpretes, también entre los pentecostales, esperan una conversión futura del pueblo judío" },
              { texto: "Pablo cierra Romanos 9 a 11 con una fórmula, y no con adoración.", verdad: false, explica: "Pablo no termina con una fórmula, sino con adoración: «¡Oh profundidad de las riquezas de la sabiduría y de la ciencia de Dios!».", apoyo: "Pablo no termina con una fórmula, sino con adoración", ref: "Romanos 11:33" },
              { texto: "Pablo dice que el endurecimiento de Israel es en parte.", verdad: true, explica: "Israel tiene un endurecimiento «en parte, hasta que haya entrado la plenitud de los gentiles».", apoyo: "Israel tiene un endurecimiento «en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo»", ref: "Romanos 11:25" },
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
            apoyo: "El líder enseña con firmeza lo que todos comparten: la salvación es por gracia, el que invoca al Señor será salvo y la iglesia tiene que predicar",
            ref: "Romanos 10:13-15",
            clave: {
              id: "pr-n5-exegesis-5-a7-1",
              tipo: "corta",
              pregunta: "En Romanos 9 calvinistas y arminianos leen distinto la elección. ¿Qué enseña el líder con firmeza?",
              ideas: [
                { id: "comparten", peso: 50, texto: "Lo que todos comparten: la salvación es por gracia y el que invoca al Señor será salvo.", formas: ["por gracia", "por (la|su) gracia", "invoca*", "sera salvo", "todo aquel que", "todos comparten", "lo que (todos|ambos) (comparten|creen|creemos)"] },
                { id: "predicar", peso: 50, texto: "Y que la iglesia tiene que predicar.", formas: ["tiene que predicar", "(debe|deben|debemos) predicar", "predic*", "anunci* el evangelio", "mensajero*", "la mision"] },
              ],
              errores: [
                { id: "lado", texto: "La declaración de fe del ministerio no entra en esa pregunta: el líder enseña con firmeza lo que todos comparten.", formas: ["(calvinistas|arminianos) tienen* razon", "(calvinista|arminiana|calvinismo|arminianismo) es (la|el) (correcta|correcto|verdadera|verdadero)", "lectura (correcta|verdadera) es"], anula: "comparten" },
              ],
              modelo: "Enseña con firmeza lo que todos comparten: la salvación es por gracia, el que invoca al Señor será salvo y la iglesia tiene que predicar.",
            },
          },
          {
            apoyo: "Romanos 9 se lee de dos maneras sobre la elección, y las dos afirman la justicia de Dios",
            ref: "Romanos 9:14-16",
            clave: {
              id: "pr-n5-exegesis-5-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo leen Romanos 9 los calvinistas y muchos arminianos, y qué afirman las dos lecturas?",
              ideas: [
                { id: "calvinistas", peso: 35, texto: "Los calvinistas lo leen como la elección de personas para salvación.", formas: ["personas para salvacion", "eleccion de personas", "elig* (a|unos|algunos) (personas|para)"] },
                { id: "arminianos", peso: 35, texto: "Muchos arminianos lo leen como la elección de pueblos y de personas para un papel en la historia de la salvación, como Jacob y Esaú.", formas: ["pueblos", "un papel", "jacob", "esau", "historia de la salvacion"] },
                { id: "justo", peso: 30, texto: "Las dos lecturas afirman que Dios es justo.", formas: ["dios es justo", "justicia de dios", "no hay injusticia", "es justo", "son justos"] },
              ],
              errores: [
                { id: "calv-pueblos", texto: "Los calvinistas lo leen como la elección de personas para salvación; la lectura de pueblos es la de muchos arminianos.", formas: ["calvinistas (leen|ven|entienden) eleccion pueblos"], anula: "arminianos" },
                { id: "injusto", texto: "Las dos lecturas afirman que Dios es justo.", formas: ["dios es injusto", "hay injusticia en dios"], anula: "justo" },
              ],
              modelo: "Los calvinistas lo leen como la elección de personas para salvación. Muchos arminianos, como la elección de pueblos y de personas para un papel en la historia de la salvación, como Jacob y Esaú. Las dos afirman que Dios es justo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La doctrina se vuelve vida (Romanos 12 a 16)
    // (el ministerio de la mujer está por confirmar: nada sobre ese punto ni sobre la pregunta de exégesis de Junias)
    "n5-exegesis-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empieza Pablo la parte práctica de la carta?", reverso: "Con un así que, después de once capítulos sobre la misericordia de Dios.", apoyo: "Después de once capítulos sobre la misericordia de Dios, empieza la parte práctica con un así que" },
              { frente: "¿Dónde se vive la vida transformada, según Romanos 12?", reverso: "En el cuerpo de Cristo.", apoyo: "La vida transformada se vive en el cuerpo de Cristo" },
              { frente: "¿Qué enseña Romanos 13?", reverso: "A respetar a las autoridades.", apoyo: "Romanos 13 enseña a respetar a las autoridades" },
              { frente: "¿Cómo termina la carta?", reverso: "Con la misión y con un equipo.", apoyo: "La carta termina con la misión y con un equipo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo piensa de sí cada miembro del cuerpo?", reverso: "«con cordura»", apoyo: "cada uno piensa de sí «con cordura»" },
              { frente: "¿Qué vale cuando una autoridad manda desobedecer a Dios?", reverso: "«Es necesario obedecer a Dios antes que a los hombres»", apoyo: "vale lo que dijeron los apóstoles: «Es necesario obedecer a Dios antes que a los hombres»" },
              { frente: "¿En qué no pensaban igual los creyentes de Roma, según Romanos 14?", reverso: "Unos comían de todo y otros no; unos guardaban ciertos días y otros no.", apoyo: "En Roma había creyentes que comían de todo y otros que no, y unos guardaban ciertos días y otros no" },
              { frente: "¿Dónde se nota la buena doctrina?", reverso: "En cómo tratamos a los hermanos.", apoyo: "La buena doctrina se nota en cómo tratamos a los hermanos" },
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
            consigna: "Desde el así que de Romanos 12, la doctrina se vuelve vida. Ordena los temas como van en la carta, del primero al último.",
            pasos: [
              "Once capítulos sobre la misericordia de Dios",
              "Un cuerpo con dones y amor práctico",
              "El respeto a las autoridades",
              "Recibir al débil en la fe sin juzgarlo",
              "Los saludos a más de veinte personas",
              "El evangelio dado a conocer a todas las gentes",
            ],
            apoyo: "Desde Romanos 12, la doctrina se vuelve vida",
            ref: "Romanos 12 a 16",
            explica: "Después de once capítulos sobre la misericordia de Dios vienen el cuerpo con sus dones (capítulo 12), las autoridades (13), el débil en la fe (14 y 15), los saludos (16) y, al final, el propósito: la obediencia a la fe en todas las naciones (16:25-26).",
          },
          {
            consigna: "Pablo dedica cinco capítulos a mostrar cómo se vive la doctrina. Ordena estas enseñanzas como van en la carta, de la primera a la última.",
            pasos: [
              "Cada uno piensa de sí con cordura, como miembro de un cuerpo",
              "Toda persona se somete a las autoridades superiores",
              "Los hermanos se reciben unos a otros sin contender sobre opiniones",
              "Pablo quiere predicar donde Cristo no ha sido nombrado",
              "El evangelio llama a todas las gentes a obedecer a la fe",
            ],
            apoyo: "Pablo dedica cinco capítulos a mostrar cómo se vive la doctrina en una iglesia real, con diferencias, autoridades y misión",
            ref: "Romanos 12 a 16",
            explica: "Romanos 12 habla del cuerpo; Romanos 13, de las autoridades; Romanos 14 y 15, del débil en la fe y de la misión (15:20); y la carta cierra con el evangelio dado a conocer a todas las gentes para que obedezcan a la fe (16:26).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La buena doctrina se nota en cómo tratamos a los hermanos",
            ref: "Romanos 14:1",
            titulo: "Una iglesia con diferencias",
            relato: [
              "Eres pastor de una iglesia con creyentes de muchos lugares. Unos comen de todo y otros no; unos guardan ciertos días y otros no.",
              "En la reunión de líderes, varios quieren apartar a los que piensan distinto, y algunos se creen más importantes que los demás.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué les recuerdas primero, según Romanos 12?",
                opciones: [
                  { texto: "Que somos un cuerpo en Cristo, y todos miembros los unos de los otros.", bien: true, explica: "La vida transformada se vive en el cuerpo de Cristo: cada uno piensa de sí con cordura." },
                  { texto: "Que cada grupo de la iglesia es un cuerpo aparte, con sus propios miembros.", explica: "«siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros»." },
                  { texto: "Que los líderes más importantes pueden pensar de sí más que de los demás.", explica: "Cada uno piensa de sí «con cordura»: todos somos miembros los unos de los otros." },
                  { texto: "Que los dones son solo para los que piensan igual que el pastor de la iglesia.", explica: "En el cuerpo de Cristo siguen los dones y el amor práctico para todos los miembros." },
                ],
                apoyo: "La vida transformada se vive en el cuerpo de Cristo",
                ref: "Romanos 12:3-5",
                explica: "La vida transformada se vive en el cuerpo de Cristo: cada uno piensa de sí «con cordura», porque «siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pide Pablo sobre los que comen o guardan los días de otra manera?",
                opciones: [
                  { texto: "Recibir al débil en la fe, pero no para contender sobre opiniones.", bien: true, explica: "Pablo pide no juzgarse: «Recibid al débil en la fe, pero no para contender sobre opiniones»." },
                  { texto: "Corregirlos en público hasta que todos coman y guarden los mismos días.", explica: "Pablo pide no juzgarse: recibir al débil en la fe sin contender sobre opiniones." },
                  { texto: "Apartarlos en otra reunión, para que no molesten a los más maduros.", explica: "Pablo pide recibir al débil en la fe, no apartarlo." },
                  { texto: "Discutir con ellos cada domingo hasta que cambien por fin de opinión.", explica: "Se recibe al débil en la fe, «pero no para contender sobre opiniones»." },
                ],
                apoyo: "Pablo pide no juzgarse: «Recibid al débil en la fe, pero no para contender sobre opiniones»",
                ref: "Romanos 14:1",
                explica: "En Roma unos comían de todo y otros no, y unos guardaban ciertos días y otros no. Pablo pide no juzgarse: «Recibid al débil en la fe, pero no para contender sobre opiniones».",
              },
              {
                tipo: "situacion",
                pregunta: "Un líder pregunta: ¿Y por qué tenemos que recibirlos? ¿Qué le respondes?",
                opciones: [
                  { texto: "Porque Cristo también nos recibió: recibámonos unos a otros.", bien: true, explica: "Pablo lo dice así: «recibíos los unos a los otros, como también Cristo nos recibió»." },
                  { texto: "Porque así la iglesia crece en número y hay más ofrendas cada mes.", explica: "La razón que da Pablo es otra: como también Cristo nos recibió." },
                  { texto: "Porque el pastor lo ordena, aunque la Biblia no diga nada de eso.", explica: "Lo dice la Escritura: «recibíos los unos a los otros, como también Cristo nos recibió»." },
                  { texto: "Porque los débiles en la fe pronto se van a ir solos de la iglesia.", explica: "Se recibe al débil como Cristo nos recibió, no esperando que se vaya." },
                ],
                apoyo: "«recibíos los unos a los otros, como también Cristo nos recibió»",
                ref: "Romanos 15:7",
                explica: "Pablo pide: «recibíos los unos a los otros, como también Cristo nos recibió». La buena doctrina se nota en cómo tratamos a los hermanos.",
              },
              {
                tipo: "explica",
                apoyo: "y una iglesia que recibe al débil sin juzgarlo",
                ref: "Romanos 15:7",
                clave: {
                  id: "pr-n5-exegesis-6-a3-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que les dirías a los líderes para cerrar la reunión.",
                  ideas: [
                    { id: "cuerpo", peso: 50, texto: "Que somos un cuerpo en Cristo: cada uno piensa de sí con cordura y todos somos miembros los unos de los otros.", formas: ["un cuerpo", "un solo cuerpo", "cuerpo de cristo", "miembros", "con cordura", "unos de otros", "unos de los otros"] },
                    { id: "recibir", peso: 50, texto: "Que recibamos al débil en la fe sin juzgarlo ni contender sobre opiniones, como Cristo nos recibió.", formas: ["recib*", "sin juzgar*", "no juzg*", "sin contender", "no contend*", "acept*", "como cristo nos"] },
                  ],
                  errores: [
                    { id: "apartar", texto: "Pablo pide recibir al débil en la fe sin juzgarlo.", formas: ["apart* los", "separ* los", "que se vayan", "expuls*"], anula: "recibir" },
                  ],
                  modelo: "Les diría que somos un cuerpo en Cristo: cada uno piensa de sí con cordura y todos somos miembros los unos de los otros. Y que recibamos al débil en la fe sin juzgarlo, como Cristo nos recibió.",
                },
              },
            ],
          },
          {
            apoyo: "No es una obediencia sin límites",
            ref: "Romanos 13:1",
            titulo: "Las normas de la ciudad",
            relato: [
              "Eres líder de líderes en tu ministerio. Las autoridades de la ciudad piden a las iglesias registrar sus reuniones y cumplir unas normas de seguridad.",
              "Un líder dice que el creyente no tiene que someterse a nadie. Otro responde que hay que obedecer a las autoridades en todo, aunque un día manden desobedecer a Dios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué enseña Romanos 13 sobre las autoridades?",
                opciones: [
                  { texto: "Que toda persona se someta a las autoridades superiores.", bien: true, explica: "Romanos 13 enseña a respetar a las autoridades: «Sométase toda persona a las autoridades superiores»." },
                  { texto: "Que el creyente no tiene que someterse a ninguna autoridad del mundo.", explica: "Romanos 13 enseña a respetar a las autoridades." },
                  { texto: "Que solo hay que obedecer a las autoridades que también son creyentes.", explica: "«Sométase toda persona a las autoridades superiores»." },
                  { texto: "Que las autoridades no tienen nada que ver con la vida de la iglesia.", explica: "Romanos 13 es parte de cómo se vive la doctrina en una iglesia real, con autoridades." },
                ],
                apoyo: "Romanos 13 enseña a respetar a las autoridades: «Sométase toda persona a las autoridades superiores»",
                ref: "Romanos 13:1",
                explica: "Romanos 13 enseña a respetar a las autoridades: «Sométase toda persona a las autoridades superiores».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al líder que dice que hay que obedecer en todo?",
                opciones: [
                  { texto: "Que no es sin límites: se obedece a Dios antes que a los hombres.", bien: true, explica: "Cuando una autoridad manda desobedecer a Dios, vale lo que dijeron los apóstoles: «Es necesario obedecer a Dios antes que a los hombres»." },
                  { texto: "Que tiene razón: la autoridad siempre manda, aunque pida desobedecer a Dios.", explica: "No es una obediencia sin límites: «Es necesario obedecer a Dios antes que a los hombres»." },
                  { texto: "Que se obedece a Dios solo cuando la autoridad está de acuerdo con eso.", explica: "Cuando una autoridad manda desobedecer a Dios, se obedece a Dios antes que a los hombres." },
                  { texto: "Que cada creyente decide en secreto qué leyes le conviene obedecer.", explica: "Romanos 13 enseña a respetar a las autoridades; el límite es cuando mandan desobedecer a Dios." },
                ],
                apoyo: "No es una obediencia sin límites: cuando una autoridad manda desobedecer a Dios, vale lo que dijeron los apóstoles",
                ref: "Hechos 5:29",
                explica: "No es una obediencia sin límites: cuando una autoridad manda desobedecer a Dios, vale lo que dijeron los apóstoles: «Es necesario obedecer a Dios antes que a los hombres».",
              },
              {
                tipo: "situacion",
                pregunta: "Registrar las reuniones y cumplir normas de seguridad no manda desobedecer a Dios. ¿Qué conviene hacer?",
                opciones: [
                  { texto: "Cumplirlas con respeto, como enseña Romanos 13.", bien: true, explica: "Romanos 13 enseña a respetar a las autoridades, y estas normas no mandan desobedecer a Dios." },
                  { texto: "Rechazarlas todas, porque el creyente solo obedece a Dios.", explica: "Romanos 13 enseña a respetar a las autoridades; el límite es cuando mandan desobedecer a Dios." },
                  { texto: "Esconder las reuniones para no tratar con las autoridades.", explica: "«Sométase toda persona a las autoridades superiores»." },
                  { texto: "Cumplirlas solo si todos los líderes votan a favor de eso.", explica: "Respetar a las autoridades no depende de una votación: lo enseña Romanos 13." },
                ],
                apoyo: "Romanos 13 enseña a respetar a las autoridades",
                ref: "Romanos 13:1",
                explica: "Romanos 13 enseña a respetar a las autoridades. Solo cuando una autoridad manda desobedecer a Dios vale lo que dijeron los apóstoles: «Es necesario obedecer a Dios antes que a los hombres».",
              },
              {
                tipo: "explica",
                apoyo: "respeto a las autoridades sin dejar de obedecer a Dios antes que a los hombres",
                ref: "Hechos 5:29",
                clave: {
                  id: "pr-n5-exegesis-6-a3-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras qué enseña Romanos 13 sobre las autoridades y cuál es su límite.",
                  ideas: [
                    { id: "respetar", peso: 50, texto: "Que toda persona se someta a las autoridades superiores y las respete.", formas: ["somet*", "respet*", "obedec* autoridades", "autoridades superiores", "cumpl* (las|sus) (leyes|normas)"] },
                    { id: "limite", peso: 50, texto: "Que no es una obediencia sin límites: si una autoridad manda desobedecer a Dios, es necesario obedecer a Dios antes que a los hombres.", formas: ["antes que a los hombres", "obedecer a dios antes", "dios antes que", "desobedecer a dios", "sin limite*", "limite*", "contra dios", "contra la palabra"] },
                  ],
                  errores: [
                    { id: "en-todo", texto: "No es una obediencia sin límites: se obedece a Dios antes que a los hombres.", formas: ["obedec* en todo", "aunque (manden|pidan) desobedecer"], anula: "limite" },
                    { id: "en-todo-2", texto: "Romanos 13 enseña a respetar a las autoridades, pero no con una obediencia sin límites.", formas: ["obedec* en todo", "aunque (manden|pidan) desobedecer"], anula: "respetar" },
                    { id: "a-nadie", texto: "Romanos 13 enseña a respetar a las autoridades.", formas: ["somet* a nadie"], anula: "respetar" },
                  ],
                  modelo: "Enseña que toda persona se someta a las autoridades superiores y las respete. Pero no es una obediencia sin límites: si una autoridad manda desobedecer a Dios, es necesario obedecer a Dios antes que a los hombres.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una líder de jóvenes te dice: Un muchacho nuevo no come de todo y guarda ciertos días; voy a corregirlo delante del grupo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que lo reciba sin juzgarlo: Pablo pide no contender sobre opiniones.", bien: true, explica: "«Recibid al débil en la fe, pero no para contender sobre opiniones»." },
              { texto: "Que lo corrija en público, para que los demás aprendan a no ser débiles.", explica: "Pablo pide no juzgarse: se recibe al débil en la fe." },
              { texto: "Que lo aparte del grupo hasta que coma de todo y deje de guardar días.", explica: "Pablo pide recibir al débil en la fe, como Cristo nos recibió." },
              { texto: "Que discuta con él cada semana hasta convencerlo de que está equivocado.", explica: "Se recibe al débil en la fe, «pero no para contender sobre opiniones»." },
            ],
            apoyo: "Pablo pide no juzgarse",
            ref: "Romanos 14:1",
            explica: "En Roma unos comían de todo y otros no, y unos guardaban ciertos días y otros no. Pablo pide no juzgarse: «Recibid al débil en la fe, pero no para contender sobre opiniones».",
          },
          {
            caso: "Un servidor del equipo de sonido te dice: Mi ministerio es el más importante de la iglesia; los demás deberían estar a mi servicio.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que piense de sí con cordura: todos somos miembros los unos de los otros.", bien: true, explica: "Cada uno piensa de sí «con cordura», porque «siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros»." },
              { texto: "Que tiene razón: en el cuerpo, unos miembros valen más y otros valen menos.", explica: "«siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros»." },
              { texto: "Que se busque otra iglesia donde valoren más su ministerio y sus dones.", explica: "La vida transformada se vive en el cuerpo de Cristo, con dones y amor práctico." },
              { texto: "Que los dones son solo para los líderes, y que el sonido no es un don.", explica: "En el cuerpo de Cristo siguen los dones y el amor práctico (Romanos 12:6-21)." },
            ],
            apoyo: "cada uno piensa de sí «con cordura», porque «siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros»",
            ref: "Romanos 12:3-5",
            explica: "La vida transformada se vive en el cuerpo de Cristo: cada uno piensa de sí con cordura, y por eso siguen los dones y el amor práctico.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte del final de Romanos con lo que dice la lección.",
            pares: [
              ["Romanos 15:20", "Pablo quería predicar donde Cristo no había sido nombrado"],
              ["Romanos 16", "Pablo saluda a más de veinte personas"],
              ["Romanos 16:25-26", "El evangelio se da a conocer a todas las gentes"],
              ["Romanos 12 a 16", "Cómo se vive la doctrina en una iglesia real"],
            ],
            apoyo: "La carta termina con la misión y con un equipo",
            ref: "Romanos 15:20; 16:25-26",
            explica: "Pablo quería predicar donde Cristo no había sido nombrado (15:20), saluda a más de veinte personas (capítulo 16) y cierra con el evangelio dado a conocer a todas las gentes (16:25-26). Los capítulos 12 a 16 muestran cómo se vive la doctrina.",
          },
          {
            consigna: "Une cada pregunta sobre el final de la carta con su respuesta.",
            pares: [
              ["¿Cómo termina la carta?", "Con la misión y con un equipo"],
              ["¿Dónde quería predicar Pablo?", "Donde Cristo no había sido nombrado"],
              ["¿A quiénes saluda en el capítulo 16?", "A más de veinte personas, como Febe, Priscila y Aquila"],
              ["¿Qué idea abre y cierra la carta?", "La obediencia a la fe en todas las naciones"],
            ],
            apoyo: "La obediencia a la fe en todas las naciones abre y cierra la carta: ese es su propósito",
            ref: "Romanos 16:25-26",
            explica: "La carta termina con la misión y con un equipo: Pablo quería predicar donde Cristo no había sido nombrado y saluda a más de veinte personas. La obediencia a la fe en todas las naciones abre y cierra la carta.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo termina la carta a los Romanos.",
            texto: "La carta termina con la [[misión]] y con un [[equipo]], y vuelve a su propósito: la obediencia a la fe en todas las [[naciones]].",
            distractores: ["ley", "castigo", "sinagogas"],
            errores: {
              ley: "La carta termina con la misión: Pablo quería predicar donde Cristo no había sido nombrado.",
              castigo: "La carta termina con un equipo: Pablo saluda a más de veinte personas.",
              sinagogas: "El propósito de la carta es la obediencia a la fe en todas las naciones.",
            },
            apoyo: "La carta termina con la misión y con un equipo",
            ref: "Romanos 16:25-26",
            explica: "La carta termina con la misión y con un equipo, y vuelve a su principio: el evangelio se ha dado a conocer «a todas las gentes para que obedezcan a la fe».",
          },
          {
            consigna: "Completa lo que muestra el final de la carta sobre la misión de Pablo.",
            texto: "Pablo quería [[predicar]] donde Cristo no había sido nombrado, y en el capítulo 16 [[saluda]] a más de veinte [[personas]].",
            distractores: ["descansar", "reprende", "ciudades"],
            errores: {
              descansar: "Pablo quería predicar «no donde Cristo ya hubiese sido nombrado».",
              reprende: "En el capítulo 16 Pablo saluda a las personas de su equipo.",
              ciudades: "En el capítulo 16 Pablo saluda a más de veinte personas.",
            },
            apoyo: "en el capítulo 16 saluda a más de veinte personas",
            ref: "Romanos 15:20",
            explica: "La carta termina con la misión y con un equipo: Pablo quería predicar «no donde Cristo ya hubiese sido nombrado», y en el capítulo 16 saluda a más de veinte personas.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pablo nunca separa la doctrina de la vida",
            ref: "Romanos 12:3-5",
            clave: {
              id: "pr-n5-exegesis-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo lleva la doctrina de Romanos 1 a 11 a la vida práctica de los capítulos 12 a 16?",
              ideas: [
                { id: "asi", peso: 50, texto: "Pablo nunca separa la doctrina de la vida: después de once capítulos sobre la misericordia de Dios, empieza la parte práctica con un así que.", formas: ["asi que", "misericordia de dios", "once capitulos", "nunca separa", "no separa", "doctrina vida", "doctrina se vuelve", "parte practica"] },
                { id: "iglesia", peso: 50, texto: "Muestra cómo se vive la doctrina en una iglesia real: un cuerpo con dones y amor, respeto a las autoridades y recibir al débil sin juzgarlo.", formas: ["iglesia real", "un cuerpo", "dones", "amor practico", "autoridades", "debil*", "recib*", "como se vive"] },
              ],
              modelo: "Pablo nunca separa la doctrina de la vida: después de once capítulos sobre la misericordia de Dios, empieza la parte práctica con un así que. Y muestra cómo se vive en una iglesia real: un cuerpo con dones, respeto a las autoridades y recibir al débil.",
            },
          },
          {
            apoyo: "Al preparar una enseñanza de Romanos, no saltes de los capítulos 1 a 8 directamente a la aplicación",
            ref: "Romanos 12 a 16",
            clave: {
              id: "pr-n5-exegesis-6-a7-2",
              tipo: "corta",
              pregunta: "Al preparar una enseñanza de Romanos, ¿por qué el líder no debe saltar de los capítulos 1 a 8 directamente a la aplicación?",
              ideas: [
                { id: "cinco", peso: 50, texto: "Porque Pablo dedica cinco capítulos a mostrar cómo se vive la doctrina en una iglesia real, con diferencias, autoridades y misión.", formas: ["cinco capitulos", "iglesia real", "como se vive", "diferencias", "autoridades", "mision", "12 a 16", "capitulos 12"] },
                { id: "vida", peso: 50, texto: "Porque Pablo nunca separa la doctrina de la vida: la buena doctrina se nota en cómo tratamos a los hermanos.", formas: ["nunca separa", "no separa", "doctrina vida", "doctrina se vuelve", "trat* a los hermanos", "como tratamos", "se nota en"] },
              ],
              modelo: "Porque Pablo nunca separa la doctrina de la vida: dedica cinco capítulos a mostrar cómo se vive en una iglesia real, con diferencias, autoridades y misión. La buena doctrina se nota en cómo tratamos a los hermanos.",
            },
          },
        ],
      },
    ],
  },
};
